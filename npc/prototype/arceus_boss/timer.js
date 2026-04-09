var ARCEUS_TIMER_ID = 1;
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
    if (event.id != ARCEUS_TIMER_ID) return;

    var npc = event.npc;
    var data = npc.getStoreddata();

    if (data.get("arceus_enabled") != "1") return;
    if (data.get("arceus_dead") == "1") {
        tickPostDeath(npc);
        return;
    }

    warmRewardPools();
    processPendingPhaseStart(npc);
    processDeferredPhaseEffects(npc);

    if (data.get("arceus_dying") == "1") {
        tickCustomDeath(npc);
        return;
    }

    if (tickTransition(npc)) return;
    if (tickForcedDeathStart(npc)) return;

    tickRecentAggro(npc);
    tickPhaseRegen(npc);
}

function tickTransition(npc) {
    var data = npc.getStoreddata();
    var left = parseIntSafe(data.get("arceus_transition_ticks_left"), 0);

    if (left <= 0) return false;
    stopTransitionCombat(npc);

    left -= getCfgInt(npc, "arceus_timer_ticks", 5);
    if (left < 0) left = 0;
    data.put("arceus_transition_ticks_left", "" + left);

    if (left == 0) {
        var phase = parseIntSafe(data.get("arceus_phase"), 1);
        if (phase == 2) {
            safeSay(npc, "§eВторая стадия началась. Аркеус восстанавливает силы в бою.");
        } else if (phase >= 3) {
            safeSay(npc, "§cТретья стадия началась. Самоцветы теперь выбиваются из него ударами.");
        }
    }

    return true;
}

function processPendingPhaseStart(npc) {
    var data = npc.getStoreddata();
    if (data.get("arceus_phase_start_pending") != "1") return;
    data.put("arceus_phase_start_pending", "0");

    var targetHp = parseIntSafe(data.get("arceus_pending_phase_hp"), 0);
    var phase = parseIntSafe(data.get("arceus_pending_phase_id"), 1);

    if (targetHp > 0) {
        try {
            npc.setHealth(targetHp);
        } catch (e) {}
    }

    applyPhaseMeleeDelay(npc, phase);
}

function processDeferredPhaseEffects(npc) {
    var data = npc.getStoreddata();
    if (data.get("arceus_phase_effects_pending") != "1") return;
    data.put("arceus_phase_effects_pending", "0");

    var phase = parseIntSafe(data.get("arceus_phase"), 1);
    var bossBarColor = "" + data.get("arceus_pending_phase_color");
    var soundId = "" + data.get("arceus_pending_phase_sound");
    var line = "" + data.get("arceus_pending_phase_line");

    if (hasText(bossBarColor) && bossBarColor != "null") {
        applyBossBarColor(npc, bossBarColor);
    }

    if (phase >= 2) {
        spawnPhaseWindChargeBurst(npc);
        launchNearbyPlayersOnPhaseStart(npc);
    }

    if (hasText(soundId) && soundId != "null") {
        playSoundForAllPlayers(npc, soundId, 1.2, 1.0);
    }

    updateNpcClient(npc);

    if (hasText(line) && line != "null") {
        safeSay(npc, line);
    }
}

function launchNearbyPlayersOnPhaseStart(npc) {
    var world;
    try {
        world = npc.getWorld();
    } catch (e) {
        world = null;
    }
    if (world == null) return;

    var players;
    try {
        players = world.getAllPlayers();
    } catch (e2) {
        players = null;
    }
    if (players == null || players.length <= 0) return;

    var radius = getCfgFloat(npc, "arceus_phase_transition_launch_radius", 18.0);
    var horizontal = getCfgFloat(npc, "arceus_phase_transition_launch_push", 1.85);
    var vertical = getCfgFloat(npc, "arceus_phase_transition_launch_vertical", 1.15);
    var radiusSq = radius * radius;

    for (var i = 0; i < players.length; i++) {
        launchPlayerFromNpc(npc, players[i], radiusSq, horizontal, vertical);
    }
}

function launchPlayerFromNpc(npc, player, radiusSq, horizontal, vertical) {
    if (player == null) return;

    var dx = 0;
    var dz = 0;
    try {
        dx = player.getX() - npc.getX();
        dz = player.getZ() - npc.getZ();
    } catch (e) {
        return;
    }

    var distSq = dx * dx + dz * dz;
    if (distSq > radiusSq) return;

    if (distSq < 0.0001) {
        dx = Math.random() - 0.5;
        dz = Math.random() - 0.5;
        distSq = dx * dx + dz * dz;
    }

    var dist = Math.sqrt(distSq);
    if (dist <= 0) return;

    var vx = (dx / dist) * horizontal;
    var vz = (dz / dist) * horizontal;

    try {
        player.setMotionX(vx);
        player.setMotionY(vertical);
        player.setMotionZ(vz);
        return;
    } catch (e2) {}

    try {
        player.getMCEntity().setDeltaMovement(vx, vertical, vz);
        player.getMCEntity().hurtMarked = true;
        return;
    } catch (e3) {}

    try {
        player.getMCEntity().push(vx, vertical, vz);
        player.getMCEntity().hurtMarked = true;
    } catch (e4) {}
}

function spawnPhaseWindChargeBurst(npc) {
    var world;
    try {
        world = npc.getWorld();
    } catch (e) {
        world = null;
    }
    if (world == null) return;

    var x = npc.getX();
    var y = npc.getY() + 1.0;
    var z = npc.getZ();

    try {
        world.spawnParticle("minecraft:gust", x, y, z, 1.2, 0.5, 1.2, 0.01, 36);
    } catch (e2) {}

    try {
        world.spawnParticle("minecraft:gust_emitter_small", x, y, z, 0.2, 0.2, 0.2, 0.01, 4);
    } catch (e3) {}

    try {
        world.playSoundAt(x, y, z, "minecraft:entity.wind_charge.wind_burst", 2.0, 0.95);
        return;
    } catch (e4) {}

    try {
        playSoundForAllPlayers(npc, "minecraft:entity.wind_charge.wind_burst", 2.0, 0.95);
    } catch (e5) {}
}

function tickPhaseRegen(npc) {
    var data = npc.getStoreddata();
    var phase = parseIntSafe(data.get("arceus_phase"), 1);
    if (phase <= 1) return;

    var timerTicks = getCfgInt(npc, "arceus_timer_ticks", 5);
    var pulseTicks = parseIntSafe(data.get("arceus_pulse_ticks"), 0) + timerTicks;
    var interval = phase == 2
        ? getCfgInt(npc, "arceus_phase2_regen_interval", 40)
        : getCfgInt(npc, "arceus_phase3_regen_interval", 20);

    if (pulseTicks < interval) {
        data.put("arceus_pulse_ticks", "" + pulseTicks);
        return;
    }

    data.put("arceus_pulse_ticks", "0");
    applyPhaseRegenEffect(npc, phase);
}

function applyPhaseRegenEffect(npc, phase) {
    var duration = phase == 2
        ? getCfgInt(npc, "arceus_phase2_regen_effect_duration", 50)
        : getCfgInt(npc, "arceus_phase3_regen_effect_duration", 60);
    var amplifier = phase == 2
        ? getCfgInt(npc, "arceus_phase2_regen_effect_amplifier", 2)
        : getCfgInt(npc, "arceus_phase3_regen_effect_amplifier", 4);

    if (duration <= 0) return;
    if (amplifier < 0) amplifier = 0;

    try {
        npc.getMCEntity().addEffect(new ArceusBoss_MobEffectInstance(
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
        npc.getMCEntity().addEffect(new ArceusBoss_MobEffectInstance(
            ArceusBoss_MobEffects.REGENERATION,
            duration,
            amplifier
        ));
    } catch (e2) {}
}

function tickForcedDeathStart(npc) {
    var data = npc.getStoreddata();
    if (data.get("arceus_dead") == "1") return false;
    if (data.get("arceus_dying") == "1") return false;
    if (parseIntSafe(data.get("arceus_transition_ticks_left"), 0) > 0) return false;

    var phase = parseIntSafe(data.get("arceus_phase"), 1);
    if (phase < 3) return false;

    var currentHp = readNpcHealth(npc);
    var deathThreshold = getArceusDeathThresholdHp(npc);
    if (currentHp > deathThreshold) return false;

    startCustomDeathFromTimer(npc);
    return true;
}

function getArceusDeathThresholdHp(npc) {
    var maxHp = readNpcMaxHealth(npc);
    if (maxHp <= 0) return 0.5;
    return 0.5;
}

function startCustomDeathFromTimer(npc) {
    var data = npc.getStoreddata();
    if (data.get("arceus_dying") == "1") return;

    data.put("arceus_dying", "1");
    data.put("arceus_death_ticks_left", "" + getCfgInt(npc, "arceus_custom_death_ticks", 80));
    data.put("arceus_death_line_stage", "0");
    data.put("arceus_death_anim_started", "0");

    forceHealthFloor(npc);
    stopCombatForDeath(npc);
    restartDeathTimer(npc);
    playConfiguredDeathSound(npc);
    safeSay(npc, "§5Аркеус не падает. Он начинает собственную смерть.");
}

function tickRecentAggro(npc) {
    if (!shouldRefreshAggroTarget(npc)) return;

    var players = getOnlinePlayers(npc);
    var targetEntry = pickHighestRecentDamager(npc, players);
    if (targetEntry == null || targetEntry.player == null) return;

    try {
        var current = npc.getAttackTarget();
        if (current != null && samePlayerUuid(current, targetEntry.uuid)) return;
    } catch (e) {}

    try {
        npc.setAttackTarget(targetEntry.player);
        return;
    } catch (e2) {}

    try {
        npc.getMCEntity().setTarget(targetEntry.player.getMCEntity());
    } catch (e3) {}
}

function pickHighestRecentDamager(npc, players) {
    var data = npc.getStoreddata();
    var keys = data.getKeys();
    if (keys == null || keys.length <= 0) return null;

    var now = Reward_System.currentTimeMillis();
    var cutoff = now - 5000;
    var best = null;

    for (var i = 0; i < keys.length; i++) {
        var key = "" + keys[i];
        if (key.indexOf("arceus_recent_hits_") !== 0) continue;

        var uuid = key.substring("arceus_recent_hits_".length);
        if (!hasText(uuid)) continue;

        var parsed = parseRecentDamageWindow("" + data.get(key), cutoff);
        if (parsed.cleaned.length > 0) {
            data.put(key, parsed.cleaned);
        } else {
            data.remove(key);
            data.remove("arceus_recent_name_" + uuid);
        }

        if (parsed.total <= 0) continue;

        var name = "" + data.get("arceus_recent_name_" + uuid);
        var player = resolveAggroPlayer(npc, uuid, name, players);
        if (player == null) continue;

        if (best == null || parsed.total > best.damage) {
            best = { uuid: uuid, name: name, damage: parsed.total, player: player };
        }
    }

    return best;
}

function parseRecentDamageWindow(raw, cutoff) {
    var text = raw == null || raw == "null" ? "" : ("" + raw);
    if (text.length <= 0) return { total: 0, cleaned: "" };

    var parts = text.split("|");
    var kept = [];
    var total = 0;

    for (var i = 0; i < parts.length; i++) {
        var token = trimString(parts[i]);
        if (token.length <= 0) continue;

        var colon = token.indexOf(":");
        if (colon <= 0) continue;

        var ts = parseIntSafe(token.substring(0, colon), 0);
        if (ts < cutoff) continue;

        var damage = parseFloatSafe(token.substring(colon + 1), 0);
        if (damage <= 0) continue;

        kept.push(token);
        total += damage;
    }

    return { total: total, cleaned: kept.join("|") };
}

function resolveAggroPlayer(npc, uuid, name, players) {
    if (players != null) {
        for (var i = 0; i < players.length; i++) {
            if (samePlayerUuid(players[i], uuid)) return players[i];
        }

        for (var j = 0; j < players.length; j++) {
            if (samePlayerName(players[j], name)) return players[j];
        }
    }

    try {
        return npc.getWorld().getPlayer(name);
    } catch (e2) {
        return null;
    }
}

function tickCustomDeath(npc) {
    var data = npc.getStoreddata();
    var timerTicks = getCfgInt(npc, "arceus_timer_ticks", 5);
    var left = parseIntSafe(data.get("arceus_death_ticks_left"), 0);
    var total = getCfgInt(npc, "arceus_custom_death_ticks", 80);
    var lineStage = parseIntSafe(data.get("arceus_death_line_stage"), 0);

    forceHealthFloor(npc);
    tickDeathSpin(npc);

    if (lineStage < 1) {
        announceDamageTop(npc);
        data.put("arceus_death_line_stage", "1");
    } else if (lineStage < 2 && left <= Math.floor(total / 2)) {
        safeSay(npc, "§5Мир дрожит. Аркеус исчезает по собственной воле.");
        data.put("arceus_death_line_stage", "2");
    }

    left -= timerTicks;
    if (left > 0) {
        data.put("arceus_death_ticks_left", "" + left);
        return;
    }

    data.put("arceus_dead", "1");
    data.put("arceus_death_ticks_left", "0");
    data.put("arceus_post_death_stage", "0");
    data.put("arceus_dead_buried", "0");
    spawnDeathExplosion(npc);
    safeSay(npc, "§8Аркеус пал.");
    ensureHideDeadBody(npc);
    updateNpcClient(npc);
}

function tickPostDeath(npc) {
    var data = npc.getStoreddata();
    var stage = parseIntSafe(data.get("arceus_post_death_stage"), 0);

    if (stage <= 0) {
        awardDamageTop(npc);
        data.put("arceus_post_death_stage", "1");
        return;
    }

    maintainDeadNpc(npc);
    data.put("arceus_post_death_stage", "2");
    stopBossTimer(npc);
}

function tickDeathSpin(npc) {
    stopCombatForDeath(npc);
    startDeathAnimationOnce(npc);

    try {
        var rot = npc.getRotation();
        rot += getCfgFloat(npc, "arceus_death_spin_step", 35.0);
        while (rot >= 360) rot -= 360;
        npc.setRotation(rot);
    } catch (e) {}
}

function startDeathAnimationOnce(npc) {
    var data = npc.getStoreddata();
    if (data.get("arceus_death_anim_started") == "1") return;
    data.put("arceus_death_anim_started", "1");

    var animId = getCfgInt(npc, "arceus_death_animation_id", 5);

    try {
        npc.playAnimation(animId);
        return;
    } catch (e) {}

    try {
        npc.getAi().setAnimation(animId);
    } catch (e2) {}
}

function stopCombatForDeath(npc) {
    try {
        npc.setAttackTarget(null);
    } catch (e) {}

    try {
        npc.getMCEntity().setTarget(null);
    } catch (e2) {}

    stopMotion(npc);
}

function stopTransitionCombat(npc) {
    try {
        npc.setAttackTarget(null);
    } catch (e) {}

    try {
        npc.getMCEntity().setTarget(null);
    } catch (e2) {}

    stopMotion(npc);
}

function stopMotion(npc) {
    try {
        npc.setMoveForward(0);
        npc.setMoveStrafing(0);
        npc.setMoveVertical(0);
    } catch (e) {}
}

function spawnDeathExplosion(npc) {
    try {
        npc.getWorld().explode(
            npc.getX(),
            npc.getY() + 1.0,
            npc.getZ(),
            getCfgFloat(npc, "arceus_death_explosion_power", 3.5),
            false,
            false
        );
        return;
    } catch (e) {}

    try {
        npc.getWorld().spawnParticle("minecraft:explosion", npc.getX(), npc.getY() + 1.0, npc.getZ(), 0.6, 0.6, 0.6, 0.01, 20);
    } catch (e2) {}
}

function ensureHideDeadBody(npc) {
    try {
        npc.getStats().setHideDeadBody(true);
        return;
    } catch (e) {}
}

function disableBossBar(npc) {
    try {
        if (npc.getDisplay && npc.getDisplay() && npc.getDisplay().setBossbar) {
            npc.getDisplay().setBossbar(0);
            return;
        }
    } catch (e) {}

    try {
        if (npc.display && npc.display.setBossbar) {
            npc.display.setBossbar(0);
            return;
        }
    } catch (e2) {}
}

function applyBossBarColor(npc, colorName) {
    if (colorName == null || colorName == "") return;

    var colorId = mapBossBarColorId(colorName);

    try {
        if (npc.getDisplay && npc.getDisplay() && npc.getDisplay().setBossColor) {
            npc.getDisplay().setBossColor(colorId);
            return;
        }
    } catch (e) {}

    try {
        if (npc.display && npc.display.setBossColor) {
            npc.display.setBossColor(colorId);
            return;
        }
    } catch (e2) {}
}

function mapBossBarColorId(colorName) {
    var key = ("" + colorName).toLowerCase();
    if (key == "pink") return 0;
    if (key == "blue") return 1;
    if (key == "red") return 2;
    if (key == "green") return 3;
    if (key == "yellow") return 4;
    if (key == "purple") return 5;
    if (key == "white") return 6;
    return 6;
}

function hideBodyNow(npc) {
    try {
        if (npc.getDisplay && npc.getDisplay()) {
            npc.getDisplay().setVisible(1);
            return;
        }
    } catch (e) {}

    try {
        if (npc.display) {
            npc.display.setVisible(1);
            return;
        }
    } catch (e2) {}
}

function updateNpcClient(npc) {
    try {
        npc.updateClient();
    } catch (e) {}
}

function playSoundForAllPlayers(npc, soundId, volume, pitch) {
    if (!hasText(soundId) || soundId == "null") return;

    try {
        var players = npc.getWorld().getAllPlayers();
        if (players == null) return;

        for (var i = 0; i < players.length; i++) {
            players[i].playSound(soundId, volume, pitch);
        }
    } catch (e) {}
}

function playConfiguredDeathSound(npc) {
    var soundId = "" + npc.getStoreddata().get("arceus_death_sound");
    if (!hasText(soundId) || soundId == "null") return;
    playSoundForAllPlayers(npc, soundId, 1.2, 1.0);
}

function collectDamageEntries(npc) {
    var data = npc.getStoreddata();
    var keys = data.getKeys();
    if (keys == null || keys.length <= 0) return [];

    var entries = [];
    for (var i = 0; i < keys.length; i++) {
        var key = "" + keys[i];
        if (key.indexOf("arceus_dmg_") !== 0) continue;
        if (key.indexOf("arceus_dmg_name_") === 0) continue;

        var uuid = key.substring("arceus_dmg_".length);
        var damage = parseFloatSafe(data.get(key), 0);
        if (damage <= 0) continue;

        var name = "" + data.get("arceus_dmg_name_" + uuid);
        if (name == null || name == "" || name == "null") {
            name = uuid;
        }

        entries.push({ uuid: uuid, name: name, damage: damage });
    }

    entries.sort(function(a, b) {
        return b.damage - a.damage;
    });

    return entries;
}

function announceDamageTop(npc) {
    var data = npc.getStoreddata();
    if (data.get("arceus_damage_top_shown") == "1") return;
    data.put("arceus_damage_top_shown", "1");

    var entries = collectDamageEntries(npc);
    if (entries.length <= 0) return;

    safeSay(npc, "§6Топ по урону по Аркеусу:");

    var limit = entries.length < 5 ? entries.length : 5;
    for (var j = 0; j < limit; j++) {
        var entry = entries[j];
        safeSay(npc, "§e#" + (j + 1) + " §f" + entry.name + " §7- §c" + formatDamage(entry.damage));
    }
}

function awardDamageTop(npc) {
    var data = npc.getStoreddata();
    if (data.get("arceus_rewards_given") == "1") return;
    data.put("arceus_rewards_given", "1");

    var entries = collectDamageEntries(npc);
    if (entries.length <= 0) return;
    ensureRewardPoolsLoaded(npc);
    var players = getOnlinePlayers(npc);

    for (var i = 0; i < entries.length; i++) {
        var player = resolveRewardPlayer(npc, entries[i], players);
        if (player == null) continue;

        var ivs = getRewardIvStringForPlace(i);
        var species = pickRewardSpeciesForPlace(i);
        giveRewardPokemon(player, species, ivs);
    }
}

function maintainDeadNpc(npc) {
    var data = npc.getStoreddata();
    var firstFinalize = data.get("arceus_dead_finalized") != "1";
    if (firstFinalize) {
        data.put("arceus_dead_finalized", "1");
    }

    buryDeadNpcOnce(npc);
    stopCombatForDeath(npc);
    setNoAiState(npc, true);
    disableBossBar(npc);
    hideNameplate(npc);
    ensureHideDeadBody(npc);
    forceHealthFloor(npc);

    if (firstFinalize) {
        updateNpcClient(npc);
    }
}

function buryDeadNpcOnce(npc) {
    var data = npc.getStoreddata();
    if (data.get("arceus_dead_buried") == "1") return;
    data.put("arceus_dead_buried", "1");

    try {
        npc.setPosition(npc.getX(), npc.getY() - 10, npc.getZ());
        return;
    } catch (e) {}

    try {
        npc.setPos(npc.getX(), npc.getY() - 10, npc.getZ());
    } catch (e2) {}
}

function applyPhaseMeleeDelay(npc, phase) {
    try {
        var data = npc.getStoreddata();
        var baseDelay = getBaseMeleeDelay(npc, data);
        var delay = Math.max(1, Math.round(baseDelay * getPhaseMeleeDelayMultiplier(npc, phase)));
        npc.getStats().getMelee().setDelay(delay);
        data.put("arceus_applied_melee_phase", "" + phase);
    } catch (e) {}
}

function getBaseMeleeDelay(npc, data) {
    try {
        var value = npc.getStats().getMelee().getDelay();
        if (value >= 1) {
            var appliedPhase = parseIntSafe(data.get("arceus_applied_melee_phase"), 0);
            if (appliedPhase > 0) {
                var appliedMultiplier = getPhaseMeleeDelayMultiplier(npc, appliedPhase);
                if (appliedMultiplier > 0) {
                    return Math.max(1, Math.round(value / appliedMultiplier));
                }
            }
            return value;
        }
    } catch (e) {}
    return 12;
}

function getPhaseMeleeDelayMultiplier(npc, phase) {
    var key = "arceus_phase1_melee_delay_mult";
    var def = 1.0;
    if (phase == 2) {
        key = "arceus_phase2_melee_delay_mult";
        def = 0.7;
    } else if (phase >= 3) {
        key = "arceus_phase3_melee_delay_mult";
        def = 0.5;
    }

    var value = getCfgFloat(npc, key, def);
    if (value <= 0) return def;
    return value;
}

function setNoAiState(npc, enabled) {
    try {
        npc.getMCEntity().setNoAi(enabled ? true : false);
    } catch (e) {}
}

function hideNameplate(npc) {
    try {
        if (npc.getDisplay && npc.getDisplay()) {
            var display = npc.getDisplay();
            if (display.setTitle) display.setTitle("");
            if (display.setShowName) display.setShowName(1);
            if (display.setNameVisible) display.setNameVisible(false);
            if (display.setShowNameplate) display.setShowNameplate(false);
            return;
        }
    } catch (e) {}

    try {
        if (npc.display) {
            if (npc.display.setTitle) npc.display.setTitle("");
            if (npc.display.setShowName) npc.display.setShowName(1);
            if (npc.display.setNameVisible) npc.display.setNameVisible(false);
            if (npc.display.setShowNameplate) npc.display.setShowNameplate(false);
            return;
        }
    } catch (e2) {}
}

function restartDeathTimer(npc) {
    try {
        npc.timers.forceStart(ARCEUS_TIMER_ID, getCfgInt(npc, "arceus_death_timer_ticks", 1), true);
    } catch (e) {}
}

function stopBossTimer(npc) {
    try {
        npc.timers.stop(ARCEUS_TIMER_ID);
    } catch (e) {}
}

function ensureRewardPoolsLoaded(npc) {
    if (LEGENDARY_REWARD_POOL != null && LEGENDARY_REWARD_POOL.length > 0
        && MYTHICAL_REWARD_POOL != null && MYTHICAL_REWARD_POOL.length > 0
        && SUPER_RARE_REWARD_POOL != null && SUPER_RARE_REWARD_POOL.length > 0
        && NORMAL_REWARD_POOL != null && NORMAL_REWARD_POOL.length > 0) {
        return;
    }

    if (REWARD_POOLS_ATTEMPTED) return;
    REWARD_POOLS_ATTEMPTED = true;

    if (loadRewardPoolsFromCobblemonJar(npc)) return;

    LEGENDARY_REWARD_POOL = [];
    MYTHICAL_REWARD_POOL = [];
    SUPER_RARE_REWARD_POOL = [];
    NORMAL_REWARD_POOL = [];
}

function warmRewardPools() {
    if (REWARD_POOLS_ATTEMPTED) return;
    ensureRewardPoolsLoaded(null);
}

function loadRewardPoolsFromCobblemonJar(npc) {
    var zip = null;

    try {
        var jarFile = resolveCobblemonJarFile();
        if (jarFile == null) return false;
        if (!jarFile.exists()) return false;
        if (!jarFile.isFile()) return false;

        zip = new Reward_ZipFile(jarFile);
        var entries = zip.entries();
        var legendarySet = {};
        var mythicalSet = {};
        var superRareSet = {};
        var normalSet = {};
        var jsonCount = 0;
        var speciesJsonCount = 0;

        while (entries.hasMoreElements()) {
            var entry = entries.nextElement();
            var name = "" + entry.getName();
            var text = readZipEntryText(zip, entry);
            if (text == null || text.length <= 0) continue;

            if (name.indexOf("data/cobblemon/spawn_pool_world/") === 0 && name.lastIndexOf(".json") === name.length - 5) {
                jsonCount++;
                collectBucketSpecies(text, superRareSet, normalSet);
                continue;
            }

            if (name.indexOf("data/cobblemon/species/") === 0 && name.lastIndexOf(".json") === name.length - 5) {
                speciesJsonCount++;
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
        if (normalizedPath != null && normalizedPath != "") {
            return new Reward_File(normalizedPath);
        }
    } catch (e2) {}

    try {
        var external = "" + Reward_PokemonProperties.class.getProtectionDomain().getCodeSource().getLocation().toExternalForm();
        var normalized = normalizeJarLocationToPath(external);
        if (normalized != null && normalized != "") {
            return new Reward_File(normalized);
        }
    } catch (e3) {}

    return null;
}

function normalizeJarLocationToPath(location) {
    var text = trimString(location);
    if (text.length <= 0) return null;

    var bang = text.indexOf("!/");
    if (bang >= 0) text = text.substring(0, bang);
    if (text.charAt(text.length - 1) == "!") {
        text = text.substring(0, text.length - 1);
    }

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
        if (roll < 80) return pickRandomSpecies(LEGENDARY_REWARD_POOL);
        return pickRandomSpecies(MYTHICAL_REWARD_POOL);
    }

    if (placeIndex == 1) {
        if (roll < 80) return pickRandomSpecies(MYTHICAL_REWARD_POOL);
        return pickRandomSpecies(LEGENDARY_REWARD_POOL);
    }

    if (placeIndex == 2) {
        if (roll < 60) return pickRandomSpecies(SUPER_RARE_REWARD_POOL);
        if (roll < 85) return pickRandomSpecies(MYTHICAL_REWARD_POOL);
        return pickRandomSpecies(LEGENDARY_REWARD_POOL);
    }

    if (roll < 80) return pickRandomSpecies(NORMAL_REWARD_POOL);
    if (roll < 95) return pickRandomSpecies(SUPER_RARE_REWARD_POOL);
    if (roll < 98) return pickRandomSpecies(MYTHICAL_REWARD_POOL);
    return pickRandomSpecies(LEGENDARY_REWARD_POOL);
}

function getRewardIvStringForPlace(placeIndex) {
    if (placeIndex == 0) return "31/31/31/31/31/31";
    if (placeIndex == 1) return rollIvRangeString(24, 31);
    if (placeIndex == 2) return rollIvRangeString(15, 24);
    return rollIvRangeString(15, 24);
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
            var player = players[i];
            if (samePlayerUuid(player, entry.uuid)) return player;
        }

        for (var j = 0; j < players.length; j++) {
            var playerByName = players[j];
            if (samePlayerName(playerByName, entry.name)) return playerByName;
        }
    }

    try {
        return npc.getWorld().getPlayer(entry.name);
    } catch (e2) {
        return null;
    }
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

function forceHealthFloor(npc) {
    try {
        if (npc.getHealth() < 1) {
            npc.setHealth(1);
        }
    } catch (e) {}
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

function safeSay(npc, text) {
    try {
        npc.say(text);
    } catch (e) {}
}

function getCfgInt(npc, key, def) {
    return parseIntSafe(npc.getStoreddata().get(key), def);
}

function getCfgFloat(npc, key, def) {
    return parseFloatSafe(npc.getStoreddata().get(key), def);
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

function startsWithIgnoreCase(text, prefix) {
    if (text == null || prefix == null) return false;
    if (text.length < prefix.length) return false;
    return text.substring(0, prefix.length).toLowerCase() == prefix.toLowerCase();
}

function shouldRefreshAggroTarget(npc) {
    var temp;
    try {
        temp = npc.getTempdata();
    } catch (e) {
        temp = null;
    }
    if (temp == null) return true;

    var now = Reward_System.currentTimeMillis();
    var nextAt = parseIntSafe(temp.get("arceus_next_aggro_refresh_at"), 0);
    if (nextAt > now) return false;

    var refreshMs = getCfgInt(npc, "arceus_aggro_refresh_ms", 500);
    if (refreshMs < 50) refreshMs = 50;
    temp.put("arceus_next_aggro_refresh_at", "" + (now + refreshMs));
    return true;
}

function getOnlinePlayers(npc) {
    try {
        return npc.getWorld().getAllPlayers();
    } catch (e) {
        return null;
    }
}
