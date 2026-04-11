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
    try {
        timerCore(event);
    } catch (e) {
        var timerId = "-";
        try {
            timerId = "" + event.id;
        } catch (e0) {}

        recordScriptErrorFromEvent(event, "timer:" + timerId, e);

        try {
            var npc = event.npc;
            var data = npc.getStoreddata();
            if (data.get("arceus_dying") == "1" || data.get("arceus_death_request") == "1") {
                restartDeathTimer(npc);
            }
        } catch (e1) {}
    }
}

function timerCore(event) {
    var npc = event.npc;
    var data = npc.getStoreddata();
    var isMainTimer = event.id == ARCEUS_TIMER_ID;
    var isDeathTimer = event.id == ARCEUS_DEATH_TIMER_ID;

    if (!isMainTimer && !isDeathTimer) return;

    if (data.get("arceus_enabled") != "1") return;

    var state = getArceusState(npc);

    if (state == "phase_transition") {
        forcePhaseTransitionHealthFloor(npc);
        setEntityInvulnerable(npc, true);
    } else if (state == "custom_death_start") {
        forceDeathSafeHealthFloor(npc);
        setEntityInvulnerable(npc, true);
    }

    if (isNpcActuallyDead(npc)) {
        handleUnexpectedDeathDuringCustomFlow(npc);
        return;
    }

    if (data.get("arceus_death_request") == "1" && state == "live") {
        beginCustomDeathFromRequest(npc);
        return;
    }

    if (isDeathTimer) {
        if (isDeathState(state)) {
            tickCustomDeath(npc);
            return;
        }

        stopDeathTimer(npc);
        return;
    }

    normalizeLiveDeathState(npc);
    processRespawnVisualReset(npc);

    warmRewardPools();
    processPendingPhaseStart(npc);
    processDeferredPhaseEffects(npc);

    state = getArceusState(npc);
    if (isDeathState(state)) {
        restartDeathTimer(npc);
        return;
    }

    if (state == "phase_transition") {
        if (!tickTransition(npc)) setArceusState(npc, "live");
        return;
    }

    if (tickTransition(npc)) return;
    if (tickForcedDeathStart(npc)) return;

    tickRecentAggro(npc);
    tickPhaseRegen(npc);
}

function getArceusState(npc) {
    var data = npc.getStoreddata();
    var state = "" + data.get("arceus_state");

    if (state == "live"
        || state == "phase_transition"
        || state == "custom_death_start"
        || state == "death_announce_top"
        || state == "death_reward_pokemon"
        || state == "death_commit") {
        return state;
    }

    if (data.get("arceus_death_committing") == "1") return "death_commit";
    if (data.get("arceus_dying") == "1" || data.get("arceus_death_request") == "1" || data.get("arceus_death_lock") == "1") {
        return "custom_death_start";
    }
    if (parseIntSafe(data.get("arceus_transition_ticks_left"), 0) > 0) return "phase_transition";

    data.put("arceus_state", "live");
    return "live";
}

function setArceusState(npc, state) {
    try {
        npc.getStoreddata().put("arceus_state", state);
    } catch (e) {}
}

function isDeathState(state) {
    return state == "custom_death_start"
        || state == "death_announce_top"
        || state == "death_reward_pokemon"
        || state == "death_commit";
}

function tickTransition(npc) {
    var data = npc.getStoreddata();
    var left = parseIntSafe(data.get("arceus_transition_ticks_left"), 0);

    if (left <= 0) return false;
    setArceusState(npc, "phase_transition");
    setEntityInvulnerable(npc, true);
    stopCombatForDeath(npc);

    left -= getCfgInt(npc, "arceus_timer_ticks", 5);
    if (left < 0) left = 0;
    data.put("arceus_transition_ticks_left", "" + left);

    if (left == 0) {
        data.put("arceus_state", "live");
        setEntityInvulnerable(npc, false);
        clearEntityDamageVisuals(npc);
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
    if (parseIntSafe(data.get("arceus_transition_ticks_left"), 0) > 0) {
        setEntityInvulnerable(npc, true);
    }
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
    if (getArceusState(npc) != "live") return false;
    if (data.get("arceus_dying") == "1") return false;
    if (data.get("arceus_death_committing") == "1") return false;
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
    var percent = getCfgFloat(npc, "arceus_custom_death_threshold_percent", 0.02);
    var minHp = getCfgFloat(npc, "arceus_custom_death_threshold_min_hp", 20);

    if (percent < 0) percent = 0;
    if (minHp < 1) minHp = 1;
    if (maxHp <= 0) return minHp;

    var threshold = maxHp * percent;
    if (threshold < minHp) threshold = minHp;
    if (threshold < 1) threshold = 1;
    return threshold;
}

function getCustomDeathTicks(npc) {
    var value = getCfgInt(npc, "arceus_custom_death_ticks", 40);
    if (value < 40) return 40;
    return value;
}

function startCustomDeathFromTimer(npc) {
    armCustomDeathRequest(npc, "timer");
    beginCustomDeathFromRequest(npc);
}

function armCustomDeathRequest(npc, source) {
    var data = npc.getStoreddata();
    if (data.get("arceus_death_committing") == "1") return;

    var threshold = getArceusDeathThresholdHp(npc);
    data.put("arceus_death_lock", "1");
    data.put("arceus_state", "custom_death_start");
    data.put("arceus_death_request", "1");
    data.put("arceus_death_request_source", source == null ? "timer" : ("" + source));
    data.put("arceus_death_request_hp", formatDamage(readNpcHealth(npc)));
    data.put("arceus_death_request_threshold_hp", formatDamage(threshold));
    data.put("arceus_death_committing", "0");
    data.put("arceus_transition_ticks_left", "0");
    data.put("arceus_phase_start_pending", "0");
    data.put("arceus_phase_effects_pending", "0");

    forceDeathSafeHealthFloor(npc);
    setEntityInvulnerable(npc, true);
    stopCombatForDeath(npc);
    restartDeathTimer(npc);
}

function beginCustomDeathFromRequest(npc) {
    var data = npc.getStoreddata();
    if (data.get("arceus_death_committing") == "1") return;

    if (data.get("arceus_dying") == "1") {
        data.put("arceus_death_request", "0");
        restartDeathTimer(npc);
        return;
    }

    var source = "" + data.get("arceus_death_request_source");
    if (!hasText(source) || source == "null") source = "timer";

    data.put("arceus_state", "custom_death_start");
    data.put("arceus_death_lock", "1");
    markCustomDeathStart(npc, source);
    applyDeathRequestDebugSnapshot(npc);
    data.put("arceus_death_request", "0");
    data.put("arceus_dying", "1");
    data.put("arceus_death_ticks_left", "" + getCustomDeathTicks(npc));
    data.put("arceus_death_line_stage", "0");
    data.put("arceus_death_anim_started", "0");
    data.put("arceus_death_finalized", "0");
    data.put("arceus_death_committing", "0");
    data.put("arceus_transition_ticks_left", "0");
    data.put("arceus_phase_start_pending", "0");
    data.put("arceus_phase_effects_pending", "0");
    data.put("arceus_damage_top_shown", "0");
    data.put("arceus_rewards_given", "0");
    resetRewardQueueState(data);
    if (!hasText(data.get("arceus_reward_snapshot_raw"))) {
        freezeRewardSnapshot(npc);
    }

    forceDeathSafeHealthFloor(npc);
    setEntityInvulnerable(npc, true);
    stopCombatForDeath(npc);
    restartDeathTimer(npc);
    playConfiguredDeathSound(npc);
    safeSay(npc, "§5Аркеус не падает. Он начинает собственную смерть.");
}

function applyDeathRequestDebugSnapshot(npc) {
    var data = npc.getStoreddata();
    var hp = "" + data.get("arceus_death_request_hp");
    var threshold = "" + data.get("arceus_death_request_threshold_hp");

    if (hasText(hp) && hp != "null") {
        data.put("arceus_dbg_death_start_hp", hp);
    }

    if (hasText(threshold) && threshold != "null") {
        data.put("arceus_dbg_death_threshold_hp", threshold);
    }
}

function clearDeathRequestState(data) {
    data.put("arceus_death_request", "0");
    data.put("arceus_death_request_source", "-");
    data.put("arceus_death_request_hp", "0");
    data.put("arceus_death_request_threshold_hp", "0");
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
    var state = getArceusState(npc);

    if (state == "death_announce_top" || state == "death_reward_pokemon") {
        data.put("arceus_state", "death_commit");
        state = "death_commit";
    }

    if (state == "death_commit") {
        prepareNpcForDeathCommit(npc);
        data.put("arceus_death_committing", "1");
        killNpcForRespawn(npc);
        return;
    }

    if (state != "custom_death_start") return;

    initializeCustomDeathStart(npc);

    var timerTicks = getCfgInt(npc, "arceus_death_timer_ticks", 1);
    if (timerTicks < 1) timerTicks = 1;
    var left = parseIntSafe(data.get("arceus_death_ticks_left"), 0);
    var total = getCustomDeathTicks(npc);
    var lineStage = parseIntSafe(data.get("arceus_death_line_stage"), 0);
    var finalized = data.get("arceus_death_finalized") == "1";

    if (!finalized || data.get("arceus_rewards_given") != "1") {
        forceDeathSafeHealthFloor(npc);
        setEntityInvulnerable(npc, true);
    }
    tickDeathSpin(npc);

    if (!finalized && lineStage < 1) {
        data.put("arceus_death_line_stage", "1");
    } else if (!finalized && lineStage < 2 && left <= Math.floor(total / 2)) {
        safeSay(npc, "§5Мир дрожит. Аркеус исчезает по собственной воле.");
        data.put("arceus_death_line_stage", "2");
    }

    if (!finalized) {
        left -= timerTicks;
    }

    if (!finalized && left > 0) {
        data.put("arceus_death_ticks_left", "" + left);
        return;
    }

    if (!finalized) {
        data.put("arceus_death_ticks_left", "0");
        data.put("arceus_death_line_stage", "2");
        data.put("arceus_death_anim_started", "1");
        data.put("arceus_death_finalized", "1");
        prepareNpcForDeathCommit(npc);
        try {
            spawnDeathExplosion(npc);
        } catch (e2) {}
        try {
            moveNpcBelowArena(npc);
        } catch (e3) {}
        safeSay(npc, "§8Аркеус пал.");
    }

    data.put("arceus_state", "death_commit");
}

function initializeCustomDeathStart(npc) {
    var data = npc.getStoreddata();
    if (data.get("arceus_dying") == "1") return;

    var source = "" + data.get("arceus_death_request_source");
    if (!hasText(source) || source == "null") source = "timer";

    data.put("arceus_death_lock", "1");
    markCustomDeathStart(npc, source);
    applyDeathRequestDebugSnapshot(npc);
    data.put("arceus_death_request", "0");
    data.put("arceus_dying", "1");
    data.put("arceus_death_ticks_left", "" + getCustomDeathTicks(npc));
    data.put("arceus_death_line_stage", "0");
    data.put("arceus_death_anim_started", "0");
    data.put("arceus_death_finalized", "0");
    data.put("arceus_death_committing", "0");
    data.put("arceus_transition_ticks_left", "0");
    data.put("arceus_phase_start_pending", "0");
    data.put("arceus_phase_effects_pending", "0");
    data.put("arceus_damage_top_shown", "0");
    data.put("arceus_rewards_given", "0");
    resetRewardQueueState(data);
    freezeRewardSnapshot(npc);

    forceDeathSafeHealthFloor(npc);
    setEntityInvulnerable(npc, true);
    stopCombatForDeath(npc);
    restartDeathTimer(npc);
    playConfiguredDeathSound(npc);
    safeSay(npc, "§5Аркеус не падает. Он начинает собственную смерть.");
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

function ensureBossBarEnabled(npc) {
    try {
        if (npc.getDisplay && npc.getDisplay() && npc.getDisplay().setBossbar) {
            if (npc.getDisplay().getBossbar && npc.getDisplay().getBossbar() == 1) return;
            npc.getDisplay().setBossbar(1);
            return;
        }
    } catch (e) {}

    try {
        if (npc.display && npc.display.setBossbar) {
            npc.display.setBossbar(1);
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

function restoreVisibleBody(npc) {
    try {
        if (npc.getDisplay && npc.getDisplay()) {
            npc.getDisplay().setVisible(0);
            return;
        }
    } catch (e) {}

    try {
        if (npc.display) {
            npc.display.setVisible(0);
            return;
        }
    } catch (e2) {}
}

function restoreNameplate(npc) {
    var title = "" + npc.getStoreddata().get("arceus_base_title");
    if (title == null || title == "null") title = "";

    try {
        if (npc.getDisplay && npc.getDisplay()) {
            var display = npc.getDisplay();
            if (display.setTitle) display.setTitle(title);
            if (display.setShowName) display.setShowName(0);
            if (display.setNameVisible) display.setNameVisible(true);
            if (display.setShowNameplate) display.setShowNameplate(true);
            return;
        }
    } catch (e) {}

    try {
        if (npc.display) {
            if (npc.display.setTitle) npc.display.setTitle(title);
            if (npc.display.setShowName) npc.display.setShowName(0);
            if (npc.display.setNameVisible) npc.display.setNameVisible(true);
            if (npc.display.setShowNameplate) npc.display.setShowNameplate(true);
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

function ensureRewardSnapshot(npc) {
    var data = npc.getStoreddata();
    if (hasText(data.get("arceus_reward_snapshot_raw"))) return;
    freezeRewardSnapshot(npc);
}

function freezeRewardSnapshot(npc) {
    var data = npc.getStoreddata();

    clearRewardSnapshotEntries(data);

    var snapshotSize = parseIntSafe(data.get("arceus_live_snapshot_size"), 0);
    var players = getOnlinePlayers(npc);
    var unresolvedCount = 0;

    for (var i = 0; i < snapshotSize; i++) {
        var entry = parseRewardEntry(data.get("arceus_live_entry_" + i));
        if (entry == null) continue;
        if (resolveRewardPlayer(npc, entry, players) == null) {
            unresolvedCount++;
        }
        data.put("arceus_reward_entry_" + i, serializeRewardEntry(entry));
    }

    data.put("arceus_reward_snapshot_raw", "1");
    data.put("arceus_reward_queue_index", "0");
    data.put("arceus_reward_queue_size", "" + snapshotSize);
    data.put("arceus_reward_finalize_ticks", "0");
    data.put("arceus_reward_wait_ticks", "0");
    data.put("arceus_top_announce_index", "0");
    data.put("arceus_top_announce_done", "0");
    data.put("arceus_dbg_damage_entry_count", "" + snapshotSize);
    data.put("arceus_dbg_resolved_entry_count", "" + Math.max(0, snapshotSize - unresolvedCount));
    data.put("arceus_dbg_unresolved_entry_count", "" + unresolvedCount);
    data.put("arceus_dbg_snapshot_size", "" + snapshotSize);
}

function getRewardSnapshotEntryAt(npc, index) {
    ensureRewardSnapshot(npc);
    return parseRewardEntry(npc.getStoreddata().get("arceus_reward_entry_" + index));
}

function getRewardIntervalTicks(npc) {
    var value = getCfgInt(npc, "arceus_reward_interval_ticks", 20);
    if (value < 1) return 1;
    if (value > 100) return 100;
    return value;
}

function getRewardTimerStepTicks(npc) {
    var value = getCfgInt(npc, "arceus_death_timer_ticks", 1);
    if (value < 1) return 1;
    return value;
}

function serializeRewardEntry(entry) {
    if (entry == null) return "";
    return sanitizeRewardToken(entry.uuid) + "\t"
        + sanitizeRewardToken(entry.name) + "\t"
        + formatDamage(entry.damage);
}

function parseRewardEntry(raw) {
    var text = raw == null || raw == "null" ? "" : ("" + raw);
    if (text.length <= 0) return null;

    var parts = text.split("\t");
    if (parts.length < 3) return null;

    return {
        uuid: parts[0],
        name: parts[1],
        damage: parseFloatSafe(parts[2], 0)
    };
}

function sanitizeRewardToken(value) {
    var text = value == null || value == "null" ? "" : ("" + value);
    return text.replace(/\t/g, " ").replace(/\r/g, " ").replace(/\n/g, " ");
}

function resetRewardQueueState(data) {
    data.put("arceus_reward_snapshot_raw", "");
    data.put("arceus_reward_queue_index", "0");
    data.put("arceus_reward_queue_size", "0");
    data.put("arceus_reward_finalize_ticks", "0");
    data.put("arceus_reward_wait_ticks", "0");
    data.put("arceus_top_announce_index", "0");
    data.put("arceus_top_announce_done", "0");
    data.put("arceus_dbg_damage_entry_count", "0");
    data.put("arceus_dbg_resolved_entry_count", "0");
    data.put("arceus_dbg_unresolved_entry_count", "0");
    data.put("arceus_dbg_reward_cursor", "0");
    clearRewardSnapshotEntries(data);
}

function clearRewardSnapshotEntries(data) {
    var keys = data.getKeys();
    if (keys == null) return;

    for (var i = 0; i < keys.length; i++) {
        var key = "" + keys[i];
        if (key.indexOf("arceus_reward_entry_") === 0) {
            data.remove(key);
        }
    }
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

function restartDeathTimer(npc) {
    try {
        var ticks = getCfgInt(npc, "arceus_death_timer_ticks", 1);
        if (ticks < 1) ticks = 1;
        npc.timers.forceStart(ARCEUS_DEATH_TIMER_ID, ticks, true);
    } catch (e) {}
}

function stopBossTimer(npc) {
    try {
        npc.timers.stop(ARCEUS_TIMER_ID);
    } catch (e) {}
}

function stopDeathTimer(npc) {
    try {
        npc.timers.stop(ARCEUS_DEATH_TIMER_ID);
    } catch (e) {}
}

function killNpcForRespawn(npc) {
    var data = npc.getStoreddata();
    try {
        data.put("arceus_state", "death_commit");
        data.put("arceus_death_committing", "1");
        data.put("arceus_dbg_death_commit_attempted", "1");
    } catch (e00) {}

    armRespawnVisualReset(npc);

    if (damageNpcWithCommand(npc)) {
        data.put("arceus_dbg_death_commit_confirmed", "1");
        announceTopAfterKill(npc);
        giveRewardsAfterKill(npc);
        handleCommittedDeath(npc);
        return;
    }

    try {
        data.put("arceus_dbg_last_error_hook", "death_commit");
        data.put("arceus_dbg_last_error_message", "damage command failed");
    } catch (e0) {}
}

function announceTopAfterKill_Legacy(npc) {
    var data = npc.getStoreddata();
    if (data.get("arceus_dbg_postkill_top_sent") == "1") return;

    ensureRewardSnapshot(npc);
    var size = parseIntSafe(data.get("arceus_reward_queue_size"), 0);
    data.put("arceus_damage_top_shown", "1");
    data.put("arceus_top_announce_index", "" + size);
    data.put("arceus_top_announce_done", "1");
    data.put("arceus_dbg_postkill_top_sent", "1");

    if (size <= 0) return;

    safeSay(npc, "В§6РўРѕРї РїРѕ СѓСЂРѕРЅСѓ РїРѕ РђСЂРєРµСѓСЃСѓ:");
    for (var i = 0; i < size; i++) {
        var entry = getRewardSnapshotEntryAt(npc, i);
        if (entry == null) continue;
        safeSay(npc, "В§e#" + (i + 1) + " В§f" + entry.name + " В§7- В§c" + formatDamage(entry.damage));
    }
}

function giveRewardsAfterKill(npc) {
    var data = npc.getStoreddata();
    if (data.get("arceus_rewards_given") == "1") return;

    ensureRewardSnapshot(npc);
    warmRewardPools();
    if (!areRewardPoolsLoaded()) {
        data.put("arceus_rewards_given", "1");
        return;
    }

    var size = parseIntSafe(data.get("arceus_reward_queue_size"), 0);
    var players = getOnlinePlayers(npc);
    for (var i = 0; i < size; i++) {
        var entry = getRewardSnapshotEntryAt(npc, i);
        if (entry == null) continue;

        var player = resolveRewardPlayer(npc, entry, players);
        if (player != null) {
            var ivs = getRewardIvStringForPlace(i);
            var species = pickRewardSpeciesForPlace(i);
            giveRewardPokemon(player, species, ivs);
        }

        data.put("arceus_dbg_reward_cursor", "" + (i + 1));
    }

    data.put("arceus_reward_queue_index", "" + size);
    data.put("arceus_rewards_given", "1");
}

function announceTopAfterKill(npc) {
    var data = npc.getStoreddata();
    if (data.get("arceus_dbg_postkill_top_sent") == "1") return;

    ensureRewardSnapshot(npc);
    var size = parseIntSafe(data.get("arceus_reward_queue_size"), 0);
    data.put("arceus_damage_top_shown", "1");
    data.put("arceus_top_announce_index", "" + size);
    data.put("arceus_top_announce_done", "1");
    data.put("arceus_dbg_postkill_top_sent", "1");

    if (size <= 0) return;

    safeSay(npc, "\u00A76\u0422\u043E\u043F \u043F\u043E \u0443\u0440\u043E\u043D\u0443 \u043F\u043E \u0410\u0440\u043A\u0435\u0443\u0441\u0443:");
    for (var i = 0; i < size; i++) {
        var entry = getRewardSnapshotEntryAt(npc, i);
        if (entry == null) continue;
        safeSay(npc, "\u00A7e#" + (i + 1) + " \u00A7f" + entry.name + " \u00A77- \u00A7c" + formatDamage(entry.damage));
    }
}

function prepareNpcForDeathCommit(npc) {
    try {
        npc.getMCEntity().removeEffect(ArceusBoss_MobEffects.REGENERATION);
    } catch (e) {}

    try {
        npc.getMCEntity().setInvulnerable(false);
    } catch (e2) {}

    try {
        npc.getMCEntity().invulnerableTime = 0;
    } catch (e3) {}

    try {
        npc.getMCEntity().hurtTime = 0;
    } catch (e4) {}

    try {
        npc.getMCEntity().hurtDuration = 0;
    } catch (e5) {}

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

function setNoAiState(npc, enabled) {
    try {
        npc.getMCEntity().setNoAi(enabled ? true : false);
    } catch (e) {}
}

function resetLiveVisualState(npc) {
    ensureHideDeadBody(npc);
    setNoAiState(npc, false);
    setEntityInvulnerable(npc, false);
    clearEntityDamageVisuals(npc);
    ensureBossBarEnabled(npc);
    applyBossBarColor(npc, "white");
    restoreNameplate(npc);
    restoreVisibleBody(npc);
    updateNpcClient(npc);
}

function markCustomDeathStart(npc, source) {
    var data = npc.getStoreddata();
    var threshold = getArceusDeathThresholdHp(npc);

    data.put("arceus_dbg_death_start_source", source == null ? "-" : ("" + source));
    data.put("arceus_dbg_death_start_hp", formatDamage(readNpcHealth(npc)));
    data.put("arceus_dbg_death_threshold_hp", formatDamage(threshold));
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

    var x = formatCoord(npc.getX());
    var y = formatCoord(npc.getY());
    var z = formatCoord(npc.getZ());
    var selector = "@e[type=" + typeId + ",distance=..0.25,limit=1,sort=nearest]";
    var command = "execute positioned " + x + " " + y + " " + z
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
    var rounded = Math.round(value * 1000) / 1000;
    return "" + rounded;
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
    if (text.indexOf("/") === 0) {
        return text.substring(1);
    }
    return text;
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

function handleCommittedDeath(npc) {
    var data = npc.getStoreddata();
    if (data.get("arceus_death_committing") != "1") return;

    armRespawnVisualReset(npc);
    data.put("arceus_state", "death_commit");
    data.put("arceus_dying", "0");
    data.put("arceus_death_committing", "0");
    data.put("arceus_death_lock", "0");
    clearDeathRequestState(data);
    clearDamageContributors(data);
    stopDeathTimer(npc);
    stopBossTimer(npc);
}

function handleUnexpectedDeathDuringCustomFlow(npc) {
    var data = npc.getStoreddata();
    var rewardsGiven = data.get("arceus_rewards_given") == "1";
    var state = getArceusState(npc);

    if (data.get("arceus_dbg_death_commit_confirmed") == "1") {
        handleCommittedDeath(npc);
        return;
    }

    data.put("arceus_unexpected_died_state", state);

    if (state == "phase_transition") {
        recoverUnexpectedPhaseTransitionDeath(npc);
        return;
    }

    if (state == "custom_death_start" && data.get("arceus_death_finalized") != "1") {
        recoverUnexpectedCustomDeathStart(npc);
        return;
    }

    var phase = parseIntSafe(data.get("arceus_phase"), 1);
    var shouldRecover = data.get("arceus_dying") == "1"
        || data.get("arceus_death_lock") == "1"
        || data.get("arceus_death_request") == "1"
        || data.get("arceus_death_committing") == "1"
        || (phase >= 3 && !rewardsGiven);

    if (!shouldRecover) {
        handleCommittedDeath(npc);
        return;
    }

    data.put("arceus_state", "custom_death_start");
    data.put("arceus_dying", "1");
    data.put("arceus_death_lock", "1");
    if (parseIntSafe(data.get("arceus_death_ticks_left"), 0) <= 0) {
        data.put("arceus_death_ticks_left", "" + getCustomDeathTicks(npc));
    }
    data.put("arceus_death_finalized", "0");
    data.put("arceus_death_anim_started", "0");
    markCustomDeathStart(npc, "recovery");
    setEntityInvulnerable(npc, true);
    clearEntityDamageVisuals(npc);
    stopCombatForDeath(npc);
    restartDeathTimer(npc);
}

function recoverUnexpectedPhaseTransitionDeath(npc) {
    var data = npc.getStoreddata();
    data.put("arceus_state", "phase_transition");
    data.put("arceus_dying", "0");
    data.put("arceus_death_lock", "0");
    data.put("arceus_death_request", "0");
    data.put("arceus_death_committing", "0");
    if (parseIntSafe(data.get("arceus_transition_ticks_left"), 0) <= 0) {
        data.put("arceus_transition_ticks_left", "" + getCfgInt(npc, "arceus_transition_ticks", 40));
    }

    forcePhaseTransitionHealthFloor(npc);
    setEntityInvulnerable(npc, true);
    clearEntityDamageVisuals(npc);
    stopCombatForDeath(npc);
    stopDeathTimer(npc);
}

function recoverUnexpectedCustomDeathStart(npc) {
    var data = npc.getStoreddata();
    data.put("arceus_state", "custom_death_start");
    data.put("arceus_death_lock", "1");
    data.put("arceus_death_request", "0");
    data.put("arceus_death_committing", "0");
    if (parseIntSafe(data.get("arceus_death_ticks_left"), 0) <= 0) {
        data.put("arceus_death_ticks_left", "" + getCustomDeathTicks(npc));
    }
    data.put("arceus_death_finalized", "0");

    forceDeathSafeHealthFloor(npc);
    setEntityInvulnerable(npc, true);
    clearEntityDamageVisuals(npc);
    stopCombatForDeath(npc);
    restartDeathTimer(npc);
}

function normalizeLiveDeathState(npc) {
    var data = npc.getStoreddata();
    if (getArceusState(npc) != "live") return;
    if (data.get("arceus_dying") == "1") return;
    if (data.get("arceus_death_committing") == "1") return;
    if (data.get("arceus_death_request") == "1") return;

    if (data.get("arceus_death_lock") == "1") {
        data.put("arceus_death_lock", "0");
    }

    if (parseIntSafe(data.get("arceus_transition_ticks_left"), 0) <= 0) {
        setEntityInvulnerable(npc, false);
    }
}

function armRespawnVisualReset(npc) {
    var data = npc.getStoreddata();
    var ticks = getCfgInt(npc, "arceus_respawn_visual_reset_ticks", 20);
    if (ticks < 1) ticks = 1;

    data.put("arceus_respawn_visual_reset_pending", "1");
    data.put("arceus_respawn_visual_reset_ticks_left", "" + ticks);
}

function processRespawnVisualReset(npc) {
    var data = npc.getStoreddata();
    if (data.get("arceus_respawn_visual_reset_pending") != "1") return;
    if (data.get("arceus_dying") == "1") return;
    if (data.get("arceus_death_committing") == "1") return;

    if (parseIntSafe(data.get("arceus_phase"), 1) != 1
        || parseIntSafe(data.get("arceus_transition_ticks_left"), 0) > 0) {
        data.put("arceus_respawn_visual_reset_pending", "0");
        data.put("arceus_respawn_visual_reset_ticks_left", "0");
        return;
    }

    resetLiveVisualState(npc);

    var left = parseIntSafe(
        data.get("arceus_respawn_visual_reset_ticks_left"),
        getCfgInt(npc, "arceus_respawn_visual_reset_ticks", 20)
    );
    left -= getCfgInt(npc, "arceus_timer_ticks", 5);

    if (left <= 0) {
        data.put("arceus_respawn_visual_reset_pending", "0");
        data.put("arceus_respawn_visual_reset_ticks_left", "0");
        return;
    }

    data.put("arceus_respawn_visual_reset_ticks_left", "" + left);
}

function clearDamageContributors(data) {
    data.put("arceus_damage_participant_count", "0");

    var keys = data.getKeys();
    if (keys == null) return;

    for (var i = 0; i < keys.length; i++) {
        var key = "" + keys[i];
        if (key.indexOf("arceus_dmg_") === 0
            || key.indexOf("arceus_dmg_name_") === 0
            || key.indexOf("arceus_recent_hits_") === 0
            || key.indexOf("arceus_recent_name_") === 0
            || key.indexOf("arceus_live_entry_") === 0
            || key.indexOf("arceus_godmode_disabled_") === 0
            || key.indexOf("arceus_reward_entry_") === 0) {
            data.remove(key);
        }
    }

    data.put("arceus_live_snapshot_size", "0");
    resetRewardQueueState(data);
    data.put("arceus_state", "live");
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

function areRewardPoolsLoaded() {
    return LEGENDARY_REWARD_POOL != null && LEGENDARY_REWARD_POOL.length > 0
        && MYTHICAL_REWARD_POOL != null && MYTHICAL_REWARD_POOL.length > 0
        && SUPER_RARE_REWARD_POOL != null && SUPER_RARE_REWARD_POOL.length > 0
        && NORMAL_REWARD_POOL != null && NORMAL_REWARD_POOL.length > 0;
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

function forcePhaseTransitionHealthFloor(npc) {
    var data = npc.getStoreddata();
    var floor = parseFloatSafe(data.get("arceus_pending_phase_hp"), 0);

    if (floor <= 0) {
        var maxHp = readNpcMaxHealth(npc);
        var phase = parseIntSafe(data.get("arceus_phase"), 1);
        if (phase == 2) {
            floor = Math.max(1, Math.floor(maxHp * getCfgFloat(npc, "arceus_phase2_heal_to", 0.72)));
        } else if (phase >= 3) {
            floor = Math.max(1, Math.floor(maxHp * getCfgFloat(npc, "arceus_phase3_heal_to", 0.45)));
        }
    }

    if (floor <= 0) floor = 1;
    setNpcHealthSafe(npc, floor);
}

function forceDeathSafeHealthFloor(npc) {
    var floor = getArceusDeathThresholdHp(npc);
    if (floor < 1) floor = 1;

    try {
        if (npc.getHealth() < floor) {
            setNpcHealthSafe(npc, floor);
        }
    } catch (e) {}
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

function safeSay(npc, text) {
    try {
        npc.say(text);
    } catch (e) {}
}

function recordScriptErrorFromEvent(event, hook, error) {
    try {
        if (event != null && event.npc != null) {
            recordScriptError(event.npc, hook, error);
        }
    } catch (e) {}
}

function recordScriptError(npc, hook, error) {
    try {
        var data = npc.getStoreddata();
        data.put("arceus_dbg_last_error_hook", hook == null ? "-" : ("" + hook));
        data.put("arceus_dbg_last_error_message", sanitizeErrorMessage(error));
    } catch (e) {}
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
