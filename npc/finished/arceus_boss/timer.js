var ARCEUS_TIMER_ID = 1;
var ARCEUS_DEATH_TIMER_ID = 2;

var Reward_PokemonProperties = Java.type("com.cobblemon.mod.common.api.pokemon.PokemonProperties");
var Reward_IVs = Java.type("com.cobblemon.mod.common.pokemon.IVs");
var Reward_Stats = Java.type("com.cobblemon.mod.common.api.pokemon.stats.Stats");
var Reward_ZipFile = Java.type("java.util.zip.ZipFile");
var Reward_File = Java.type("java.io.File");
var Reward_Scanner = Java.type("java.util.Scanner");
var Reward_URLDecoder = Java.type("java.net.URLDecoder");
var Reward_System = Java.type("java.lang.System");
var ArceusBoss_MobEffectInstance = Java.type("net.minecraft.world.effect.MobEffectInstance");
var ArceusBoss_MobEffects = Java.type("net.minecraft.world.effect.MobEffects");
var Reward_Cobblemon = Java.type("com.cobblemon.mod.common.Cobblemon");
var Reward_PlayerExtensionsKt = Java.type("com.cobblemon.mod.common.util.PlayerExtensionsKt");
var ArceusBoss_BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");

var ARCEUS_RUNTIME_KEY = "arceus_runtime";
var ARCEUS_CONFIG_KEY = "arceus_config_json";
var ARCEUS_LIFECYCLE_KEY = "arceus_lifecycle_json";
var ARCEUS_CONFIG_VERSION = 12;

var REWARD_STAT_ORDER = [
    Reward_Stats.HP,
    Reward_Stats.ATTACK,
    Reward_Stats.DEFENCE,
    Reward_Stats.SPECIAL_ATTACK,
    Reward_Stats.SPECIAL_DEFENCE,
    Reward_Stats.SPEED
];

var LEGENDARY_REWARD_POOL = null;
var MYTHICAL_REWARD_POOL = null;
var SUPER_RARE_REWARD_POOL = null;
var NORMAL_REWARD_POOL = null;
var REWARD_POOLS_ATTEMPTED = false;

function timer(event) {
    var runtime = ensureArceusRuntime(event.npc);
    attachRuntimeControllers(runtime);

    try {
        runtime.tickTimer(event.id);
    } catch (e) {
        markRuntimeError(runtime, "timer:" + event.id, e);
    }
}

function attachRuntimeControllers(runtime) {
    if (runtime.ready) return;

    runtime.tickTimer = function(timerId) {
        tickTimerCore(runtime, timerId);
    };

    runtime.leaderboard = {
        recordDamage: function(player, amount) {
            recordDamageToRuntime(runtime, player, amount);
        },
        buildLiveSnapshot: function() {
            runtime.state.liveSnapshot = buildSortedSnapshot(runtime.state.damageMap);
            return runtime.state.liveSnapshot;
        },
        freezeSnapshot: function() {
            runtime.state.frozenSnapshot = cloneSnapshot(
                runtime.state.liveSnapshot != null && runtime.state.liveSnapshot.length > 0
                    ? runtime.state.liveSnapshot
                    : buildSortedSnapshot(runtime.state.damageMap)
            );
            return runtime.state.frozenSnapshot;
        },
        sortSnapshot: function(snapshot) {
            return sortSnapshot(snapshot);
        },
        announceFrozenSnapshot: function() {
            announceFrozenSnapshot(runtime);
        },
        resolveEligiblePlayers: function() {
            return getOnlinePlayers(runtime.npc);
        }
    };

    runtime.rewards = {
        beginFromFrozenSnapshot: function() {
            runtime.state.rewardCursor = 0;
        },
        tickDistribution: function() {
            distributeFrozenSnapshotRewards(runtime);
        },
        grantRankReward: function(entry, rank, playerOrNull) {
            grantRankReward(runtime, entry, rank, playerOrNull);
        },
        isFinished: function() {
            return runtime.state.rewardsGiven === true;
        }
    };

    runtime.deathFlow = {
        requestStart: function() {
            if (runtime.state.mode != "live") return;
            runtime.state.mode = "custom_death_start";
            runtime.state.customDeathTicksLeft = configInt(runtime.config.customDeathTicks, 80);
            runtime.state.leaderboardAnnounced = false;
            runtime.state.rewardsGiven = false;
            runtime.state.rewardCursor = 0;
            runtime.state.deathCommitted = false;
            runtime.state.deathLineStage = 0;
            runtime.state.deathAnimStarted = false;
            runtime.state.deathFinalizeDone = false;
        }
    };

    runtime.ready = true;
}

function tickTimerCore(runtime, timerId) {
    var npc = runtime.npc;
    if (!runtime.config.enabled) return;
    if (timerId != ARCEUS_TIMER_ID && timerId != ARCEUS_DEATH_TIMER_ID) return;

    if (timerId == ARCEUS_TIMER_ID) {
        processRespawnVisualReset(runtime);
    }

    if (isNpcActuallyDead(npc)) {
        return;
    }

    if (timerId == ARCEUS_DEATH_TIMER_ID) {
        tickDeathPath(runtime);
        persistRuntimeState(runtime);
        return;
    }

    if (runtime.state.mode == "live" && runtime.state.phase >= 3) {
        var deathThreshold = getArceusDeathThresholdHp(readNpcMaxHealth(npc), runtime.config);
        if (readNpcHealth(npc) <= deathThreshold) {
            runtime.deathFlow.requestStart();
        }
    }

    if (runtime.state.mode == "phase_transition") {
        tickTransition(runtime);
    } else if (runtime.state.mode == "live") {
        tickRecentAggro(runtime);
        tickPhaseRegen(runtime);
    } else if (runtime.state.mode == "custom_death_start" || runtime.state.mode == "death_commit_pending") {
        restartDeathTimer(runtime);
    } else if (runtime.state.mode == "death_committed") {
        stopBossTimer(runtime);
        stopDeathTimer(runtime);
    }

    persistRuntimeState(runtime);
}

function tickDeathPath(runtime) {
    if (runtime.state.mode == "custom_death_start") {
        tickCustomDeath(runtime);
        return;
    }

    if (runtime.state.mode == "death_commit_pending") {
        commitCustomDeath(runtime);
        return;
    }

    stopDeathTimer(runtime);
}

function tickTransition(runtime) {
    var state = runtime.state;
    var npc = runtime.npc;

    setEntityInvulnerable(npc, true);
    forcePhaseTransitionHealthFloor(runtime);
    clearEntityDamageVisuals(npc);

    state.transitionTicksLeft -= configInt(runtime.config.timerTicks, 5);
    if (state.transitionTicksLeft > 0) return;

    state.transitionTicksLeft = 0;
    state.mode = "live";
    setEntityInvulnerable(npc, false);
    clearEntityDamageVisuals(npc);
}

function tickPhaseRegen(runtime) {
    var phase = runtime.state.phase;
    if (phase <= 1) return;

    if (runtime.state.pulseTicks == null) runtime.state.pulseTicks = 0;
    runtime.state.pulseTicks += configInt(runtime.config.timerTicks, 5);

    var interval = phase == 2
        ? configInt(runtime.config.phase2RegenInterval, 40)
        : configInt(runtime.config.phase3RegenInterval, 20);

    if (runtime.state.pulseTicks < interval) return;
    runtime.state.pulseTicks = 0;

    var duration = phase == 2
        ? configInt(runtime.config.phase2RegenEffectDuration, 50)
        : configInt(runtime.config.phase3RegenEffectDuration, 60);
    var amplifier = phase == 2
        ? configInt(runtime.config.phase2RegenEffectAmplifier, 2)
        : configInt(runtime.config.phase3RegenEffectAmplifier, 4);

    if (duration <= 0) return;

    try {
        runtime.npc.getMCEntity().addEffect(new ArceusBoss_MobEffectInstance(
            ArceusBoss_MobEffects.REGENERATION,
            duration,
            amplifier,
            false,
            true,
            true
        ));
        return;
    } catch (e) {}

    try {
        runtime.npc.getMCEntity().addEffect(new ArceusBoss_MobEffectInstance(
            ArceusBoss_MobEffects.REGENERATION,
            duration,
            amplifier
        ));
    } catch (e2) {}
}

function tickRecentAggro(runtime) {
    var now = Reward_System.currentTimeMillis();
    if (parseIntSafe(runtime.state.nextAggroRefreshAt, 0) > now) return;

    var refreshMs = configInt(runtime.config.aggroRefreshMs, 500);
    if (refreshMs < 50) refreshMs = 50;
    runtime.state.nextAggroRefreshAt = now + refreshMs;

    var players = getOnlinePlayers(runtime.npc);
    if (players == null || players.length <= 0) return;

    var best = null;
    for (var uuid in runtime.state.recentHits) {
        if (!runtime.state.recentHits.hasOwnProperty(uuid)) continue;

        var hits = runtime.state.recentHits[uuid];
        if (hits == null || hits.length <= 0) continue;

        var total = 0;
        var kept = [];
        for (var i = 0; i < hits.length; i++) {
            if (now - parseIntSafe(hits[i].time, 0) > 5000) continue;
            kept.push(hits[i]);
            total += parseFloatSafe(hits[i].damage, 0);
        }
        runtime.state.recentHits[uuid] = kept;
        if (total <= 0) continue;

        var player = resolvePlayerByUuidOrName(runtime.npc, uuid, kept.length > 0 ? kept[kept.length - 1].name : "", players);
        if (player == null) continue;

        if (best == null || total > best.damage) {
            best = { player: player, damage: total, uuid: uuid };
        }
    }

    if (best == null) return;

    try {
        var current = runtime.npc.getAttackTarget();
        if (current != null && samePlayerUuid(current, best.uuid)) return;
    } catch (e) {}

    try {
        runtime.npc.setAttackTarget(best.player);
        return;
    } catch (e2) {}

    try {
        runtime.npc.getMCEntity().setTarget(best.player.getMCEntity());
    } catch (e3) {}
}

function tickCustomDeath(runtime) {
    var npc = runtime.npc;
    var state = runtime.state;

    forceDeathSafeHealthFloorLive(runtime);
    setEntityInvulnerable(npc, true);
    stopCombatForDeath(npc);
    restartDeathTimer(runtime);

    if (state.deathLineStage <= 0) {
        state.deathLineStage = 1;
        playSoundForAllPlayers(npc, runtime.config.deathSound, 1.2, 1.0);
        safeSay(npc, "\u00A75\u0410\u0440\u043A\u0435\u0443\u0441 \u043D\u0435 \u043F\u0430\u0434\u0430\u0435\u0442. \u041E\u043D \u043D\u0430\u0447\u0438\u043D\u0430\u0435\u0442 \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u0443\u044E \u0441\u043C\u0435\u0440\u0442\u044C.");
    }

    tickDeathSpin(runtime);

    if (state.deathLineStage < 2 && state.customDeathTicksLeft <= Math.floor(configInt(runtime.config.customDeathTicks, 80) / 2)) {
        safeSay(npc, "\u00A75\u041C\u0438\u0440 \u0434\u0440\u043E\u0436\u0438\u0442. \u0410\u0440\u043A\u0435\u0443\u0441 \u0438\u0441\u0447\u0435\u0437\u0430\u0435\u0442 \u043F\u043E \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0439 \u0432\u043E\u043B\u0435.");
        state.deathLineStage = 2;
    }

    state.customDeathTicksLeft -= configInt(runtime.config.deathTimerTicks, 1);
    if (state.customDeathTicksLeft > 0) return;

    state.customDeathTicksLeft = 0;

    if (!state.deathFinalizeDone) {
        state.deathFinalizeDone = true;
        startDeathAnimationOnce(runtime);
        spawnDeathExplosion(runtime);
        moveNpcBelowArena(npc);
        safeSay(npc, "\u00A78\u0410\u0440\u043A\u0435\u0443\u0441 \u043F\u0430\u043B.");
    }

    state.mode = "death_commit_pending";
}

function tickDeathSpin(runtime) {
    var npc = runtime.npc;
    startDeathAnimationOnce(runtime);

    try {
        var rot = npc.getRotation();
        rot += configFloat(runtime.config.deathSpinStep, 12);
        while (rot >= 360) rot -= 360;
        npc.setRotation(rot);
    } catch (e) {}
}

function startDeathAnimationOnce(runtime) {
    if (runtime.state.deathAnimStarted) return;
    runtime.state.deathAnimStarted = true;

    try {
        runtime.npc.playAnimation(configInt(runtime.config.deathAnimationId, 5));
        return;
    } catch (e) {}

    try {
        runtime.npc.getAi().setAnimation(configInt(runtime.config.deathAnimationId, 5));
    } catch (e2) {}
}

function commitCustomDeath(runtime) {
    var npc = runtime.npc;

    prepareNpcForDeathCommit(npc);
    restartDeathTimer(runtime);

    if (!damageNpcWithCommand(npc)) {
        return;
    }

    runtime.leaderboard.freezeSnapshot();
    runtime.leaderboard.announceFrozenSnapshot();
    runtime.rewards.beginFromFrozenSnapshot();
    runtime.rewards.tickDistribution();
    handleCommittedDeath(runtime);
}

function announceFrozenSnapshot(runtime) {
    if (runtime.state.leaderboardAnnounced) return;

    var snapshot = runtime.state.frozenSnapshot;
    if (snapshot == null || snapshot.length <= 0) {
        runtime.state.leaderboardAnnounced = true;
        return;
    }

    broadcastBossMessage(runtime.npc, "\u00A76\u0422\u043E\u043F \u043F\u043E \u0443\u0440\u043E\u043D\u0443 \u043F\u043E \u0410\u0440\u043A\u0435\u0443\u0441\u0443:");
    for (var i = 0; i < snapshot.length; i++) {
        var entry = snapshot[i];
        broadcastBossMessage(
            runtime.npc,
            "\u00A7e#" + (i + 1) + " \u00A7f" + entry.name + " \u00A77- \u00A7c" + formatDamage(entry.damage)
        );
    }

    runtime.state.leaderboardAnnounced = true;
}

function distributeFrozenSnapshotRewards(runtime) {
    if (runtime.state.rewardsGiven) return;

    warmRewardPools();
    if (!areRewardPoolsLoaded()) {
        runtime.state.rewardsGiven = true;
        return;
    }

    var entries = runtime.state.frozenSnapshot;
    var players = getOnlinePlayers(runtime.npc);

    for (var i = runtime.state.rewardCursor; i < entries.length; i++) {
        var entry = entries[i];
        var player = resolveRewardPlayer(runtime.npc, entry, players);
        grantRankReward(runtime, entry, i, player);
        runtime.state.rewardCursor = i + 1;
    }

    runtime.state.rewardsGiven = true;
}

function grantRankReward(runtime, entry, rank, playerOrNull) {
    if (playerOrNull == null) return;
    var species = pickRewardSpeciesForPlace(rank);
    var ivs = getRewardIvStringForPlace(rank);
    giveRewardPokemon(playerOrNull, species, ivs);
}

function handleCommittedDeath(runtime) {
    runtime.state.mode = "death_committed";
    runtime.state.deathCommitted = true;
    runtime.state.customDeathTicksLeft = 0;
    runtime.state.transitionTicksLeft = 0;
    runtime.state.recentHits = {};
    runtime.state.damageMap = {};
    runtime.state.liveSnapshot = [];
    runtime.state.nextAggroRefreshAt = 0;
    runtime.state.respawnVisualResetTicks = configInt(runtime.config.respawnVisualResetTicks, 20);

    stopDeathTimer(runtime);
    stopBossTimer(runtime);
}

function processRespawnVisualReset(runtime) {
    if (parseIntSafe(runtime.state.respawnVisualResetTicks, 0) <= 0) return;
    if (runtime.state.mode != "live") return;
    if (runtime.state.phase != 1) {
        runtime.state.respawnVisualResetTicks = 0;
        return;
    }

    resetLiveVisualState(runtime.npc, runtime.config);
    runtime.state.respawnVisualResetTicks -= configInt(runtime.config.timerTicks, 5);
    if (runtime.state.respawnVisualResetTicks < 0) {
        runtime.state.respawnVisualResetTicks = 0;
    }
}

function restartDeathTimer(runtime) {
    try {
        runtime.npc.timers.forceStart(ARCEUS_DEATH_TIMER_ID, configInt(runtime.config.deathTimerTicks, 1), true);
    } catch (e) {}
}

function stopBossTimer(runtime) {
    try {
        runtime.npc.timers.stop(ARCEUS_TIMER_ID);
    } catch (e) {}
}

function stopDeathTimer(runtime) {
    try {
        runtime.npc.timers.stop(ARCEUS_DEATH_TIMER_ID);
    } catch (e) {}
}

function prepareNpcForDeathCommit(npc) {
    try {
        npc.getMCEntity().removeEffect(ArceusBoss_MobEffects.REGENERATION);
    } catch (e) {}
    try {
        npc.getMCEntity().setInvulnerable(false);
    } catch (e2) {}
    clearEntityDamageVisuals(npc);
}

function forcePhaseTransitionHealthFloor(runtime) {
    var maxHp = readNpcMaxHealth(runtime.npc);
    var fraction = runtime.state.phase >= 3 ? configFloat(runtime.config.phase3HealTo, 0.45) : configFloat(runtime.config.phase2HealTo, 0.72);
    setNpcHealthSafe(runtime.npc, Math.max(1, Math.floor(maxHp * fraction)));
}

function forceDeathSafeHealthFloorLive(runtime) {
    var floor = getArceusDeathThresholdHp(readNpcMaxHealth(runtime.npc), runtime.config);
    if (readNpcHealth(runtime.npc) < floor) {
        setNpcHealthSafe(runtime.npc, floor);
    }
}

function setNpcHealthSafe(npc, value) {
    var target = Math.max(1, Math.floor(value));
    try {
        npc.setHealth(target);
        return;
    } catch (e) {}
    try {
        npc.getMCEntity().setHealth(target);
    } catch (e2) {}
}

function readNpcHealth(npc) {
    try {
        return npc.getHealth();
    } catch (e) {
        return 1;
    }
}

function readNpcMaxHealth(npc) {
    try {
        return npc.getMaxHealth();
    } catch (e) {
        return 1;
    }
}

function getArceusDeathThresholdHp(maxHp, config) {
    var threshold = maxHp * configFloat(config.customDeathThresholdPercent, 0.02);
    var minHp = configFloat(config.customDeathThresholdMinHp, 20);
    if (threshold < minHp) threshold = minHp;
    return threshold < 1 ? 1 : threshold;
}

function stopCombatForDeath(npc) {
    try {
        npc.setAttackTarget(null);
    } catch (e) {}
    try {
        npc.getMCEntity().setTarget(null);
    } catch (e2) {}
    try {
        npc.setMoveForward(0);
        npc.setMoveStrafing(0);
        npc.setMoveVertical(0);
    } catch (e3) {}
}

function spawnDeathExplosion(runtime) {
    try {
        runtime.npc.getWorld().explode(
            runtime.npc.getX(),
            runtime.npc.getY() + 1.0,
            runtime.npc.getZ(),
            configFloat(runtime.config.deathExplosionPower, 3.5),
            false,
            false
        );
        return;
    } catch (e) {}

    try {
        runtime.npc.getWorld().spawnParticle("minecraft:explosion", runtime.npc.getX(), runtime.npc.getY() + 1.0, runtime.npc.getZ(), 0.6, 0.6, 0.6, 0.01, 20);
    } catch (e2) {}
}

function moveNpcBelowArena(npc) {
    var x = npc.getX();
    var y = npc.getY() - 10;
    var z = npc.getZ();
    try {
        npc.setPosition(x, y, z);
        return;
    } catch (e) {}
    try {
        npc.setPos(x, y, z);
        return;
    } catch (e2) {}
    try {
        npc.getMCEntity().setPos(x, y, z);
    } catch (e3) {}
}

function damageNpcWithCommand(npc) {
    var typeId = getNpcEntityTypeId(npc);
    if (!hasText(typeId)) return false;

    var selector = "@e[type=" + typeId + ",distance=..0.25,limit=1,sort=nearest]";
    var command = "execute positioned " + formatCoord(npc.getX()) + " " + formatCoord(npc.getY()) + " " + formatCoord(npc.getZ())
        + " run damage " + selector + " 1000000 minecraft:generic_kill";

    if (!runServerCommand(npc, command)) return false;
    return isNpcActuallyDead(npc);
}

function getNpcEntityTypeId(npc) {
    try {
        return "" + ArceusBoss_BuiltInRegistries.ENTITY_TYPE.getKey(npc.getMCEntity().getType());
    } catch (e) {
        return "";
    }
}

function formatCoord(value) {
    return "" + (Math.round(value * 1000) / 1000);
}

function runServerCommand(npc, command) {
    try {
        var server = npc.getMCEntity().level().getServer();
        var source = server.createCommandSourceStack().withPermission(4);
        server.getCommands().performPrefixedCommand(source, stripLeadingSlash(command));
        return true;
    } catch (e) {
        return false;
    }
}

function stripLeadingSlash(command) {
    var text = trimString(command);
    return text.indexOf("/") === 0 ? text.substring(1) : text;
}

function isNpcActuallyDead(npc) {
    try {
        if (!npc.getMCEntity().isAlive()) return true;
    } catch (e) {}
    try {
        if (npc.getHealth() <= 0) return true;
    } catch (e2) {}
    return false;
}

function resetLiveVisualState(npc, config) {
    try {
        npc.getStats().setHideDeadBody(true);
    } catch (e) {}
    try {
        npc.getMCEntity().setNoAi(false);
    } catch (e2) {}
    setEntityInvulnerable(npc, false);
    clearEntityDamageVisuals(npc);
    ensureBossBarEnabled(npc);
    applyBossBarColor(npc, "white");
    restoreNameplate(npc, config.baseTitle);
    restoreVisibleBody(npc);
    updateNpcClient(npc);
}

function ensureBossBarEnabled(npc) {
    try {
        if (npc.getDisplay && npc.getDisplay() && npc.getDisplay().setBossbar) {
            npc.getDisplay().setBossbar(1);
        }
    } catch (e) {}
}

function applyBossBarColor(npc, colorName) {
    var colorId = 0;
    if (colorName == "yellow") colorId = 4;
    if (colorName == "red") colorId = 2;
    try {
        if (npc.getDisplay && npc.getDisplay() && npc.getDisplay().setBossColor) {
            npc.getDisplay().setBossColor(colorId);
        }
    } catch (e) {}
}

function restoreNameplate(npc, baseTitle) {
    try {
        if (npc.getDisplay && npc.getDisplay() && npc.getDisplay().setTitle) {
            npc.getDisplay().setTitle(hasText(baseTitle) ? baseTitle : "\u0410\u0440\u043A\u0435\u0443\u0441");
        }
    } catch (e) {}
}

function restoreVisibleBody(npc) {
    try {
        if (npc.getDisplay && npc.getDisplay() && npc.getDisplay().setVisible) {
            npc.getDisplay().setVisible(0);
        }
    } catch (e) {}
}

function updateNpcClient(npc) {
    try {
        npc.updateClient();
    } catch (e) {}
}

function setEntityInvulnerable(npc, enabled) {
    try {
        npc.getMCEntity().setInvulnerable(enabled ? true : false);
    } catch (e) {}
}

function clearEntityDamageVisuals(npc) {
    try {
        npc.getMCEntity().invulnerableTime = 0;
    } catch (e) {}
    try {
        npc.getMCEntity().hurtTime = 0;
    } catch (e2) {}
    try {
        npc.getMCEntity().hurtDuration = 0;
    } catch (e3) {}
    try {
        npc.getMCEntity().deathTime = 0;
    } catch (e4) {}
}

function recordDamageToRuntime(runtime, player, amount) {
    if (player == null || amount <= 0) return;
    var uuid = "" + player.getUUID();
    var name = "" + player.getName();
    var current = runtime.state.damageMap[uuid];
    if (current == null) {
        current = { uuid: uuid, name: name, damage: 0 };
        runtime.state.damageMap[uuid] = current;
    }
    current.damage += amount;
    current.name = name;
    runtime.state.liveSnapshot = buildSortedSnapshot(runtime.state.damageMap);
}

function buildSortedSnapshot(map) {
    var out = [];
    for (var key in map) {
        if (!map.hasOwnProperty(key)) continue;
        var entry = map[key];
        if (entry == null || entry.damage <= 0) continue;
        out.push({
            uuid: entry.uuid,
            name: hasText(entry.name) ? entry.name : entry.uuid,
            damage: entry.damage
        });
    }
    out.sort(function(a, b) {
        return b.damage - a.damage;
    });
    return out;
}

function cloneSnapshot(snapshot) {
    var out = [];
    if (snapshot == null) return out;
    for (var i = 0; i < snapshot.length; i++) {
        out.push({
            uuid: snapshot[i].uuid,
            name: snapshot[i].name,
            damage: snapshot[i].damage
        });
    }
    return sortSnapshot(out);
}

function sortSnapshot(snapshot) {
    if (snapshot == null) return [];
    snapshot.sort(function(a, b) {
        return b.damage - a.damage;
    });
    return snapshot;
}

function safeSay(npc, text) {
    try {
        npc.say(text);
    } catch (e) {}
}

function broadcastBossMessage(npc, text) {
    var players = getOnlinePlayers(npc);
    if (players == null || players.length <= 0) {
        safeSay(npc, text);
        return;
    }
    for (var i = 0; i < players.length; i++) {
        try {
            players[i].message(text);
        } catch (e) {}
    }
}

function playSoundForAllPlayers(npc, soundId, volume, pitch) {
    if (!hasText(soundId)) return;
    try {
        var players = npc.getWorld().getAllPlayers();
        if (players == null) return;
        for (var i = 0; i < players.length; i++) {
            players[i].playSound(soundId, volume, pitch);
        }
    } catch (e) {}
}

function ensureArceusRuntime(npc) {
    var temp = npc.getTempdata();
    var runtime = null;

    try {
        runtime = temp.get(ARCEUS_RUNTIME_KEY);
    } catch (e) {
        runtime = null;
    }

    var config = mergeConfig(parseJsonSafe(npc.getStoreddata().get(ARCEUS_CONFIG_KEY)));
    var state = mergeLifecycle(parseJsonSafe(npc.getStoreddata().get(ARCEUS_LIFECYCLE_KEY)));

    if (runtime == null || runtime.version != ARCEUS_CONFIG_VERSION) {
        runtime = {
            version: ARCEUS_CONFIG_VERSION,
            npc: npc,
            config: config,
            state: state,
            combat: {},
            phases: {},
            deathFlow: {},
            rewards: {},
            leaderboard: {},
            visuals: {},
            clockLink: {},
            debug: {}
        };
        temp.put(ARCEUS_RUNTIME_KEY, runtime);
        return runtime;
    }

    runtime.npc = npc;
    runtime.config = config;
    runtime.state = state;
    if (runtime.state.recentHits == null) runtime.state.recentHits = {};
    if (runtime.state.damageMap == null) runtime.state.damageMap = {};
    if (runtime.state.liveSnapshot == null) runtime.state.liveSnapshot = [];
    if (runtime.state.frozenSnapshot == null) runtime.state.frozenSnapshot = [];
    return runtime;
}

function persistRuntimeState(runtime) {
    runtime.npc.getStoreddata().put(ARCEUS_LIFECYCLE_KEY, JSON.stringify(runtime.state));
}

function markRuntimeError(runtime, hook, error) {
    if (runtime.state.debug == null) {
        runtime.state.debug = { lastErrorHook: "-", lastErrorMessage: "-" };
    }
    runtime.state.debug.lastErrorHook = hook == null ? "-" : ("" + hook);
    runtime.state.debug.lastErrorMessage = sanitizeErrorMessage(error);
    persistRuntimeState(runtime);
}

function sanitizeErrorMessage(error) {
    var text = "";
    try {
        text = "" + error;
    } catch (e) {
        text = "unknown";
    }
    text = text.replace(/\r/g, " ").replace(/\n/g, " ").replace(/\t/g, " ");
    if (text.length > 180) text = text.substring(0, 180);
    return text;
}

function createDefaultConfig() {
    return {
        version: ARCEUS_CONFIG_VERSION,
        enabled: true,
        timerTicks: 5,
        phase2Threshold: 0.10,
        phase3Threshold: 0.10,
        phase2HealTo: 0.72,
        phase3HealTo: 0.45,
        transitionTicks: 40,
        aggroRefreshMs: 500,
        phase2RegenInterval: 40,
        phase3RegenInterval: 20,
        phase2RegenEffectDuration: 50,
        phase3RegenEffectDuration: 60,
        phase2RegenEffectAmplifier: 2,
        phase3RegenEffectAmplifier: 4,
        customDeathTicks: 80,
        customDeathThresholdPercent: 0.02,
        customDeathThresholdMinHp: 20,
        deathTimerTicks: 1,
        rewardIntervalTicks: 20,
        respawnVisualResetTicks: 20,
        deathSpinStep: 12,
        deathExplosionPower: 3.5,
        deathAnimationId: 5,
        deathSound: "cobblemon:pokemon.arceus.cry",
        baseTitle: "\u0410\u0440\u043A\u0435\u0443\u0441"
    };
}

function mergeConfig(raw) {
    var base = createDefaultConfig();
    if (raw == null) return base;
    for (var key in base) {
        if (!base.hasOwnProperty(key)) continue;
        if (raw[key] === undefined || raw[key] === null) continue;
        base[key] = raw[key];
    }
    return base;
}

function createDefaultLifecycle() {
    return {
        mode: "live",
        phase: 1,
        transitionTicksLeft: 0,
        customDeathTicksLeft: 0,
        damageMap: {},
        liveSnapshot: [],
        frozenSnapshot: [],
        rewardCursor: 0,
        leaderboardAnnounced: false,
        rewardsGiven: false,
        deathCommitted: false,
        pendingPhaseEffect: null,
        respawnVisualResetTicks: 0,
        nextAggroRefreshAt: 0,
        stageDrops: { "2": 0, "3": 0 },
        recentHits: {},
        deathLineStage: 0,
        deathAnimStarted: false,
        deathFinalizeDone: false,
        pulseTicks: 0,
        debug: {
            lastErrorHook: "-",
            lastErrorMessage: "-"
        }
    };
}

function mergeLifecycle(raw) {
    var base = createDefaultLifecycle();
    if (raw == null) return base;
    for (var key in base) {
        if (!base.hasOwnProperty(key)) continue;
        if (raw[key] === undefined || raw[key] === null) continue;
        base[key] = raw[key];
    }
    if (base.damageMap == null) base.damageMap = {};
    if (base.liveSnapshot == null) base.liveSnapshot = [];
    if (base.frozenSnapshot == null) base.frozenSnapshot = [];
    if (base.stageDrops == null) base.stageDrops = { "2": 0, "3": 0 };
    if (base.recentHits == null) base.recentHits = {};
    if (base.debug == null) base.debug = { lastErrorHook: "-", lastErrorMessage: "-" };
    return base;
}

function parseJsonSafe(raw) {
    if (raw == null || raw == "" || raw == "null") return null;
    try {
        return JSON.parse("" + raw);
    } catch (e) {
        return null;
    }
}

function configInt(value, def) {
    return parseIntSafe(value, def);
}

function configFloat(value, def) {
    return parseFloatSafe(value, def);
}

function parseIntSafe(s, def) {
    try {
        var value = parseInt("" + s, 10);
        return isNaN(value) ? def : value;
    } catch (e) {
        return def;
    }
}

function parseFloatSafe(s, def) {
    try {
        var value = parseFloat("" + s);
        return isNaN(value) ? def : value;
    } catch (e) {
        return def;
    }
}

function formatDamage(value) {
    var rounded = Math.floor(value * 10 + 0.5) / 10;
    if (rounded == Math.floor(rounded)) {
        return "" + Math.floor(rounded);
    }
    return "" + rounded;
}

function hasText(value) {
    return value != null && trimString(value).length > 0;
}

function trimString(s) {
    return ("" + s).replace(/^\s+|\s+$/g, "");
}

function clamp(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}

function readZipEntryText(zip, entry) {
    var stream = null;
    var scanner = null;
    try {
        stream = zip.getInputStream(entry);
        scanner = new Reward_Scanner(stream, "UTF-8").useDelimiter("\\A");
        return scanner.hasNext() ? "" + scanner.next() : "";
    } catch (e) {
        return null;
    } finally {
        try {
            if (scanner != null) scanner.close();
        } catch (closeScannerError) {}
        try {
            if (stream != null) stream.close();
        } catch (closeStreamError) {}
    }
}

function collectBucketSpecies(text, superRareSet, normalSet) {
    var regex = /"pokemon"\s*:\s*"([^"]+)"[\s\S]*?"bucket"\s*:\s*"([^"]+)"/g;
    var match;
    while ((match = regex.exec(text)) != null) {
        var species = extractBucketSpeciesId(match[1]);
        var bucket = trimString(match[2]);
        if (species.length <= 0 || bucket.length <= 0) continue;
        if (bucket == "ultra-rare") {
            superRareSet[species] = true;
        } else if (bucket == "common" || bucket == "uncommon" || bucket == "rare") {
            normalSet[species] = true;
        }
    }
}

function collectSpecialSpecies(text, legendarySet, mythicalSet) {
    var nameMatch = /"name"\s*:\s*"([^"]+)"/.exec(text);
    if (nameMatch == null || nameMatch.length < 2) return;
    var labelsMatch = /"labels"\s*:\s*\[([\s\S]*?)\]/.exec(text);
    if (labelsMatch == null || labelsMatch.length < 2) return;
    var labelsText = labelsMatch[1];
    var species = trimString(nameMatch[1]).toLowerCase();
    if (species.length <= 0) return;
    if (labelsText.indexOf("\"mythical\"") >= 0) {
        mythicalSet[species] = true;
    } else if (labelsText.indexOf("\"legendary\"") >= 0) {
        legendarySet[species] = true;
    }
}

function extractBucketSpeciesId(raw) {
    var token = trimString(raw).split(" ")[0];
    token = trimString(token);
    if (token.length <= 0) return "";
    return token;
}

function setKeysToPrefixedArray(setMap, excludeMap1, excludeMap2, excludeMap3) {
    var out = [];
    for (var key in setMap) {
        if (!setMap.hasOwnProperty(key)) continue;
        if (excludeMap1 != null && excludeMap1[key]) continue;
        if (excludeMap2 != null && excludeMap2[key]) continue;
        if (excludeMap3 != null && excludeMap3[key]) continue;
        out.push("cobblemon:" + key);
    }
    out.sort();
    return out;
}

function pickRewardSpeciesForPlace(placeIndex) {
    var roll = Math.random() * 100;
    if (placeIndex == 0) {
        if (roll < 50) return pickRandomSpecies(SUPER_RARE_REWARD_POOL);
        if (roll < 85) return pickRandomSpecies(MYTHICAL_REWARD_POOL);
        return pickRandomSpecies(LEGENDARY_REWARD_POOL);
    }
    if (placeIndex == 1) {
        if (roll < 70) return pickRandomSpecies(SUPER_RARE_REWARD_POOL);
        if (roll < 95) return pickRandomSpecies(MYTHICAL_REWARD_POOL);
        return pickRandomSpecies(LEGENDARY_REWARD_POOL);
    }
    if (placeIndex == 2) {
        if (roll < 70) return pickRandomSpecies(NORMAL_REWARD_POOL);
        if (roll < 95) return pickRandomSpecies(SUPER_RARE_REWARD_POOL);
        return pickRandomSpecies(MYTHICAL_REWARD_POOL);
    }
    if (roll < 85) return pickRandomSpecies(NORMAL_REWARD_POOL);
    if (roll < 99) return pickRandomSpecies(SUPER_RARE_REWARD_POOL);
    return pickRandomSpecies(MYTHICAL_REWARD_POOL);
}

function getRewardIvStringForPlace(placeIndex) {
    if (placeIndex == 0) return rollIvRangeString(25, 31);
    if (placeIndex == 1) return rollIvRangeString(20, 28);
    if (placeIndex == 2) return rollIvRangeString(15, 24);
    return rollIvRangeString(10, 22);
}

function rollIvRangeString(min, max) {
    var values = [];
    for (var i = 0; i < 6; i++) {
        values.push("" + randomIntInclusive(min, max));
    }
    return values.join("/");
}

function randomIntInclusive(min, max) {
    var low = Math.floor(Math.min(min, max));
    var high = Math.floor(Math.max(min, max));
    return low + Math.floor(Math.random() * (high - low + 1));
}

function giveRewardPokemon(player, speciesId, ivString) {
    if (player == null || speciesId == null || speciesId == "") return false;
    var reward = createRewardPokemonEntity(speciesId, ivString);
    if (!reward.ok) return false;
    return addRewardPokemonToParty(player, reward.pokemon);
}

function createRewardPokemonEntity(speciesId, ivString) {
    var props = parsePokemonProperties(speciesId);
    if (props == null || !hasText("" + props.getSpecies())) {
        return { ok: false, reason: "parse properties" };
    }
    try {
        props.setLevel(randomIntInclusive(10, 20));
        props.setShiny(Math.random() < 0.10);
    } catch (e0) {
        return { ok: false, reason: "set level/shiny" };
    }
    try {
        props.setIvs(buildStatsBlock(new Reward_IVs(), ivString, 0, 31));
    } catch (e) {
        return { ok: false, reason: "set ivs" };
    }
    var pokemon;
    try {
        pokemon = props.create();
    } catch (e2) {
        return { ok: false, reason: "create pokemon" };
    }
    if (pokemon == null) return { ok: false, reason: "pokemon null" };
    return { ok: true, pokemon: pokemon };
}

function buildStatsBlock(statsObject, rawValue, min, max) {
    var parts = ("" + rawValue).split("/");
    for (var i = 0; i < REWARD_STAT_ORDER.length; i++) {
        if (i >= parts.length) break;
        var token = trimString(parts[i]);
        if (token.length == 0) continue;
        var value = clamp(parseIntSafe(token, min), min, max);
        statsObject.set(REWARD_STAT_ORDER[i], value);
    }
    return statsObject;
}

function parsePokemonProperties(speciesId) {
    try {
        return Reward_PokemonProperties.Companion.parse(speciesId);
    } catch (e) {
        return null;
    }
}

function addRewardPokemonToParty(player, pokemon) {
    var party = getRewardPlayerParty(player);
    if (party == null || pokemon == null) return false;
    try {
        return party.add(pokemon);
    } catch (e) {
        return false;
    }
}

function getRewardPlayerParty(player) {
    if (player == null) return null;
    try {
        return Reward_PlayerExtensionsKt.party(player.getMCEntity());
    } catch (e1) {
        try {
            return Reward_Cobblemon.INSTANCE.getStorage().getParty(player.getMCEntity());
        } catch (e2) {
            return null;
        }
    }
}

function resolveRewardPlayer(npc, entry, players) {
    if (entry == null) return null;
    if (players != null) {
        for (var i = 0; i < players.length; i++) {
            if (samePlayerUuid(players[i], entry.uuid)) return players[i];
        }
        for (var j = 0; j < players.length; j++) {
            if (samePlayerName(players[j], entry.name)) return players[j];
        }
    }
    try {
        return npc.getWorld().getPlayer(entry.name);
    } catch (e2) {
        return null;
    }
}

function resolvePlayerByUuidOrName(npc, uuid, name, players) {
    if (players != null) {
        for (var i = 0; i < players.length; i++) {
            if (samePlayerUuid(players[i], uuid)) return players[i];
        }
        for (var j = 0; j < players.length; j++) {
            if (samePlayerName(players[j], name)) return players[j];
        }
    }
    return null;
}

function samePlayerUuid(player, uuid) {
    if (player == null || uuid == null || uuid == "") return false;
    try {
        return ("" + player.getUUID()) == ("" + uuid);
    } catch (e) {
        return false;
    }
}

function samePlayerName(player, name) {
    if (player == null || name == null || name == "") return false;
    try {
        if (("" + player.getName()) == ("" + name)) return true;
    } catch (e) {}
    try {
        if (("" + player.getDisplayName()) == ("" + name)) return true;
    } catch (e2) {}
    return false;
}

function pickRandomSpecies(pool) {
    if (pool == null || pool.length <= 0) return null;
    var index = Math.floor(Math.random() * pool.length);
    if (index < 0) index = 0;
    if (index >= pool.length) index = pool.length - 1;
    return pool[index];
}

function ensureRewardPoolsLoaded() {
    if (LEGENDARY_REWARD_POOL != null && LEGENDARY_REWARD_POOL.length > 0
        && MYTHICAL_REWARD_POOL != null && MYTHICAL_REWARD_POOL.length > 0
        && SUPER_RARE_REWARD_POOL != null && SUPER_RARE_REWARD_POOL.length > 0
        && NORMAL_REWARD_POOL != null && NORMAL_REWARD_POOL.length > 0) {
        return;
    }
    if (REWARD_POOLS_ATTEMPTED) return;
    REWARD_POOLS_ATTEMPTED = true;
    if (loadRewardPoolsFromCobblemonJar()) return;
    LEGENDARY_REWARD_POOL = [];
    MYTHICAL_REWARD_POOL = [];
    SUPER_RARE_REWARD_POOL = [];
    NORMAL_REWARD_POOL = [];
}

function areRewardPoolsLoaded() {
    return LEGENDARY_REWARD_POOL != null && LEGENDARY_REWARD_POOL.length > 0
        && MYTHICAL_REWARD_POOL != null && MYTHICAL_REWARD_POOL.length > 0
        && SUPER_RARE_REWARD_POOL != null && SUPER_RARE_REWARD_POOL.length > 0
        && NORMAL_REWARD_POOL != null && NORMAL_REWARD_POOL.length > 0;
}

function warmRewardPools() {
    if (REWARD_POOLS_ATTEMPTED) return;
    ensureRewardPoolsLoaded();
}

function loadRewardPoolsFromCobblemonJar() {
    var zip = null;
    try {
        var jarFile = resolveCobblemonJarFile();
        if (jarFile == null || !jarFile.exists() || !jarFile.isFile()) return false;
        zip = new Reward_ZipFile(jarFile);
        var entries = zip.entries();
        var legendarySet = {};
        var mythicalSet = {};
        var superRareSet = {};
        var normalSet = {};
        while (entries.hasMoreElements()) {
            var entry = entries.nextElement();
            var name = "" + entry.getName();
            var text = readZipEntryText(zip, entry);
            if (text == null || text.length <= 0) continue;
            if (name.indexOf("data/cobblemon/spawn_pool_world/") === 0 && name.lastIndexOf(".json") === name.length - 5) {
                collectBucketSpecies(text, superRareSet, normalSet);
                continue;
            }
            if (name.indexOf("data/cobblemon/species/") === 0 && name.lastIndexOf(".json") === name.length - 5) {
                collectSpecialSpecies(text, legendarySet, mythicalSet);
            }
        }
        LEGENDARY_REWARD_POOL = setKeysToPrefixedArray(legendarySet);
        MYTHICAL_REWARD_POOL = setKeysToPrefixedArray(mythicalSet, legendarySet);
        SUPER_RARE_REWARD_POOL = setKeysToPrefixedArray(superRareSet, legendarySet, mythicalSet);
        NORMAL_REWARD_POOL = setKeysToPrefixedArray(normalSet, legendarySet, mythicalSet, superRareSet);
        return LEGENDARY_REWARD_POOL.length > 0
            && MYTHICAL_REWARD_POOL.length > 0
            && SUPER_RARE_REWARD_POOL.length > 0
            && NORMAL_REWARD_POOL.length > 0;
    } catch (e) {
        return false;
    } finally {
        try {
            if (zip != null) zip.close();
        } catch (closeError) {}
    }
}

function resolveCobblemonJarFile() {
    try {
        var url = Reward_PokemonProperties.class.getProtectionDomain().getCodeSource().getLocation();
        if (url == null) return null;
        return new Reward_File(url.toURI());
    } catch (e) {}
    try {
        var path = "" + Reward_PokemonProperties.class.getProtectionDomain().getCodeSource().getLocation().getPath();
        var normalizedPath = normalizeJarLocationToPath(path);
        if (normalizedPath != null && normalizedPath != "") return new Reward_File(normalizedPath);
    } catch (e2) {}
    try {
        var external = "" + Reward_PokemonProperties.class.getProtectionDomain().getCodeSource().getLocation().toExternalForm();
        var normalized = normalizeJarLocationToPath(external);
        if (normalized != null && normalized != "") return new Reward_File(normalized);
    } catch (e3) {}
    return null;
}

function normalizeJarLocationToPath(location) {
    var text = trimString(location);
    if (text.length <= 0) return null;
    var bang = text.indexOf("!/");
    if (bang >= 0) text = text.substring(0, bang);
    if (text.charAt(text.length - 1) == "!") text = text.substring(0, text.length - 1);
    while (startsWithIgnoreCase(text, "jar:") || startsWithIgnoreCase(text, "union:")) {
        var idx = text.indexOf(":");
        if (idx < 0) break;
        text = text.substring(idx + 1);
    }
    if (startsWithIgnoreCase(text, "file:/")) {
        text = text.substring(5);
        while (text.length > 0 && text.charAt(0) == "/") {
            text = text.substring(1);
        }
    }
    try {
        text = "" + Reward_URLDecoder.decode(text.replace("+", "%2B"), "UTF-8");
    } catch (e) {}
    var hashSuffix = text.lastIndexOf("#");
    if (hashSuffix > 0 && text.toLowerCase().lastIndexOf(".jar") < hashSuffix) {
        text = text.substring(0, hashSuffix);
    }
    if (startsWithIgnoreCase(text, "/home/") || startsWithIgnoreCase(text, "/srv/") || startsWithIgnoreCase(text, "/opt/")) {
        return text;
    }
    if (text.length >= 2 && text.charAt(1) == ":") return text;
    return null;
}

function startsWithIgnoreCase(text, prefix) {
    if (text == null || prefix == null) return false;
    if (text.length < prefix.length) return false;
    return text.substring(0, prefix.length).toLowerCase() == prefix.toLowerCase();
}

function getOnlinePlayers(npc) {
    try {
        return npc.getWorld().getAllPlayers();
    } catch (e) {
        return null;
    }
}
