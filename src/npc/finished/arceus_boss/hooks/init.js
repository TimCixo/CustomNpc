var ARCEUS_TIMER_ID = 1;
var ARCEUS_DEATH_TIMER_ID = 2;
var ARCEUS_RUNTIME_KEY = "arceus_runtime";
var ARCEUS_CONFIG_KEY = "arceus_config_json";
var ARCEUS_LIFECYCLE_KEY = "arceus_lifecycle_json";
var ARCEUS_CONFIG_VERSION = 12;
var ARCEUS_CLOCK_MAIN_UUID_KEY = "respawn_clock_main_uuid";
var ARCEUS_CLOCK_RESPAWN_SECONDS_KEY = "respawn_clock_respawn_seconds";

function init(event) {
    var npc = event.npc;
    var config = ensureArceusConfig(npc);
    var lifecycle = createDefaultLifecycle();

    lifecycle.phase = 1;
    lifecycle.mode = "live";
    lifecycle.respawnVisualResetTicks = config.respawnVisualResetTicks;

    writeLifecycle(npc, lifecycle);
    clearLegacyArceusKeys(npc.getStoreddata());
    npc.getTempdata().put(ARCEUS_RUNTIME_KEY, createBootstrapRuntime(npc, config, lifecycle));

    applyPhaseMeleeDelay(npc, config, 1);
    resetLiveVisualState(npc, config);

    try {
        npc.setHealth(npc.getMaxHealth());
    } catch (e) {}

    try {
        npc.timers.forceStart(ARCEUS_TIMER_ID, clampPositiveInt(config.timerTicks, 5), true);
    } catch (e2) {}

    try {
        npc.timers.stop(ARCEUS_DEATH_TIMER_ID);
    } catch (e3) {}

    announceArceusRespawn(npc, config);
    notifyClockAlive(npc);
}

function createBootstrapRuntime(npc, config, lifecycle) {
    return {
        version: ARCEUS_CONFIG_VERSION,
        npc: npc,
        config: config,
        state: cloneLifecycle(lifecycle),
        combat: {},
        phases: {},
        deathFlow: {},
        rewards: {},
        leaderboard: {},
        visuals: {},
        clockLink: {},
        debug: {}
    };
}

function ensureArceusConfig(npc) {
    var data = npc.getStoreddata();
    var current = parseJsonSafe(data.get(ARCEUS_CONFIG_KEY));
    var merged = mergeConfig(current);

    if (merged.baseTitle == "") {
        merged.baseTitle = readNpcTitle(npc);
    }

    if (!hasText(trimString(data.get(ARCEUS_CLOCK_RESPAWN_SECONDS_KEY)))) {
        data.put(ARCEUS_CLOCK_RESPAWN_SECONDS_KEY, "" + readRespawnDelaySeconds(npc));
    }

    merged.clockRespawnSeconds = parseIntSafe(data.get(ARCEUS_CLOCK_RESPAWN_SECONDS_KEY), merged.clockRespawnSeconds);
    merged.clockMainUuid = trimString(data.get(ARCEUS_CLOCK_MAIN_UUID_KEY));

    if (current == null || parseIntSafe(current.version, 0) != ARCEUS_CONFIG_VERSION) {
        merged = migrateLegacyConfig(npc, merged);
    }

    writeConfig(npc, merged);
    return merged;
}

function migrateLegacyConfig(npc, config) {
    var data = npc.getStoreddata();

    config.enabled = legacyBool(data, "arceus_enabled", config.enabled);
    config.timerTicks = legacyInt(data, "arceus_timer_ticks", config.timerTicks);
    config.phase2Threshold = legacyFloat(data, "arceus_phase2_threshold", config.phase2Threshold);
    config.phase3Threshold = legacyFloat(data, "arceus_phase3_threshold", config.phase3Threshold);
    config.phase2HealTo = legacyFloat(data, "arceus_phase2_heal_to", config.phase2HealTo);
    config.phase3HealTo = legacyFloat(data, "arceus_phase3_heal_to", config.phase3HealTo);
    config.transitionTicks = legacyInt(data, "arceus_transition_ticks", config.transitionTicks);
    config.aggroRefreshMs = legacyInt(data, "arceus_aggro_refresh_ms", config.aggroRefreshMs);
    config.phase2RegenInterval = legacyInt(data, "arceus_phase2_regen_interval", config.phase2RegenInterval);
    config.phase3RegenInterval = legacyInt(data, "arceus_phase3_regen_interval", config.phase3RegenInterval);
    config.phase2RegenEffectDuration = legacyInt(data, "arceus_phase2_regen_effect_duration", config.phase2RegenEffectDuration);
    config.phase3RegenEffectDuration = legacyInt(data, "arceus_phase3_regen_effect_duration", config.phase3RegenEffectDuration);
    config.phase2RegenEffectAmplifier = legacyInt(data, "arceus_phase2_regen_effect_amplifier", config.phase2RegenEffectAmplifier);
    config.phase3RegenEffectAmplifier = legacyInt(data, "arceus_phase3_regen_effect_amplifier", config.phase3RegenEffectAmplifier);
    config.phase2DamageMult = legacyFloat(data, "arceus_phase2_damage_mult", config.phase2DamageMult);
    config.phase3DamageMult = legacyFloat(data, "arceus_phase3_damage_mult", config.phase3DamageMult);
    config.phase3FlatBonus = legacyFloat(data, "arceus_phase3_flat_bonus", config.phase3FlatBonus);
    config.phase3ArmorBypassBonus = legacyFloat(data, "arceus_phase3_armor_bypass_bonus", config.phase3ArmorBypassBonus);
    config.phase1MeleeDelayMult = legacyFloat(data, "arceus_phase1_melee_delay_mult", config.phase1MeleeDelayMult);
    config.phase2MeleeDelayMult = legacyFloat(data, "arceus_phase2_melee_delay_mult", config.phase2MeleeDelayMult);
    config.phase3MeleeDelayMult = legacyFloat(data, "arceus_phase3_melee_delay_mult", config.phase3MeleeDelayMult);
    config.reflectArrowSpeed = legacyFloat(data, "arceus_reflect_arrow_speed", config.reflectArrowSpeed);
    config.reflectArrowInaccuracy = legacyFloat(data, "arceus_reflect_arrow_inaccuracy", config.reflectArrowInaccuracy);
    config.customDeathTicks = legacyInt(data, "arceus_custom_death_ticks", config.customDeathTicks);
    config.customDeathThresholdPercent = legacyFloat(data, "arceus_custom_death_threshold_percent", config.customDeathThresholdPercent);
    config.customDeathThresholdMinHp = legacyFloat(data, "arceus_custom_death_threshold_min_hp", config.customDeathThresholdMinHp);
    config.deathTimerTicks = legacyInt(data, "arceus_death_timer_ticks", config.deathTimerTicks);
    config.rewardIntervalTicks = legacyInt(data, "arceus_reward_interval_ticks", config.rewardIntervalTicks);
    config.respawnVisualResetTicks = legacyInt(data, "arceus_respawn_visual_reset_ticks", config.respawnVisualResetTicks);
    config.deathSpinStep = legacyFloat(data, "arceus_death_spin_step", config.deathSpinStep);
    config.deathExplosionPower = legacyFloat(data, "arceus_death_explosion_power", config.deathExplosionPower);
    config.deathAnimationId = legacyInt(data, "arceus_death_animation_id", config.deathAnimationId);
    config.pinataSpeedMin = legacyFloat(data, "arceus_pinata_speed_min", config.pinataSpeedMin);
    config.pinataSpeedMax = legacyFloat(data, "arceus_pinata_speed_max", config.pinataSpeedMax);
    config.pinataVerticalBoost = legacyFloat(data, "arceus_pinata_vertical_boost", config.pinataVerticalBoost);
    config.phase2PinataItem = legacyText(data, "arceus_phase2_pinata_item", config.phase2PinataItem);
    config.phase2TotalDropsBase = legacyInt(data, "arceus_phase2_total_drops_base", config.phase2TotalDropsBase);
    config.phase2TotalDropsPerExtraPlayer = legacyInt(data, "arceus_phase2_total_drops_per_extra_player", config.phase2TotalDropsPerExtraPlayer);
    config.phase2TotalDropsMax = legacyInt(data, "arceus_phase2_total_drops_max", config.phase2TotalDropsMax);
    config.phase3TotalDropsBase = legacyInt(data, "arceus_phase3_total_drops_base", config.phase3TotalDropsBase);
    config.phase3TotalDropsPerExtraPlayer = legacyInt(data, "arceus_phase3_total_drops_per_extra_player", config.phase3TotalDropsPerExtraPlayer);
    config.phase3TotalDropsMax = legacyInt(data, "arceus_phase3_total_drops_max", config.phase3TotalDropsMax);
    config.stage2Sound = legacyText(data, "arceus_stage2_sound", config.stage2Sound);
    config.stage3Sound = legacyText(data, "arceus_stage3_sound", config.stage3Sound);
    config.deathSound = legacyText(data, "arceus_death_sound", config.deathSound);
    config.debugRuntime = legacyBool(data, "arceus_debug_runtime", config.debugRuntime);
    config.debugIntervalTicks = legacyInt(data, "arceus_debug_interval_ticks", config.debugIntervalTicks);

    var oldBaseTitle = legacyText(data, "arceus_base_title", "");
    if (oldBaseTitle != "") {
        config.baseTitle = oldBaseTitle;
    }

    if (trimString(data.get(ARCEUS_CLOCK_MAIN_UUID_KEY)) != "") {
        config.clockMainUuid = trimString(data.get(ARCEUS_CLOCK_MAIN_UUID_KEY));
    }

    config.clockRespawnSeconds = parseIntSafe(data.get(ARCEUS_CLOCK_RESPAWN_SECONDS_KEY), config.clockRespawnSeconds);
    config.version = ARCEUS_CONFIG_VERSION;
    return config;
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
        phase2DamageMult: 1.20,
        phase3DamageMult: 1.45,
        phase3FlatBonus: 4,
        phase3ArmorBypassBonus: 8.0,
        phase1MeleeDelayMult: 1.0,
        phase2MeleeDelayMult: 0.7,
        phase3MeleeDelayMult: 0.5,
        reflectArrowSpeed: 2.2,
        reflectArrowInaccuracy: 0.2,
        customDeathTicks: 80,
        customDeathThresholdPercent: 0.02,
        customDeathThresholdMinHp: 20,
        deathTimerTicks: 1,
        rewardIntervalTicks: 20,
        respawnVisualResetTicks: 20,
        deathSpinStep: 12,
        deathExplosionPower: 3.5,
        deathAnimationId: 5,
        pinataSpeedMin: 0.20,
        pinataSpeedMax: 0.55,
        pinataVerticalBoost: 0.28,
        phase2PinataItem: "cobblemon:rare_candy",
        phase2TotalDropsBase: 8,
        phase2TotalDropsPerExtraPlayer: 4,
        phase2TotalDropsMax: 24,
        phase3TotalDropsBase: 3,
        phase3TotalDropsPerExtraPlayer: 2,
        phase3TotalDropsMax: 12,
        stage2Sound: "cobblemon:pokemon.arceus.cry",
        stage3Sound: "cobblemon:pokemon.arceus.cry",
        deathSound: "cobblemon:pokemon.arceus.cry",
        debugRuntime: false,
        debugIntervalTicks: 20,
        baseTitle: "",
        clockMainUuid: "",
        clockRespawnSeconds: 300
    };
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
        debug: {
            lastErrorHook: "-",
            lastErrorMessage: "-"
        }
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
    base.version = ARCEUS_CONFIG_VERSION;
    return base;
}

function cloneLifecycle(raw) {
    return mergeLifecycle(raw);
}

function mergeLifecycle(raw) {
    var base = createDefaultLifecycle();
    if (raw == null) return base;

    for (var key in base) {
        if (!base.hasOwnProperty(key)) continue;
        if (raw[key] === undefined || raw[key] === null) continue;
        base[key] = raw[key];
    }

    if (base.stageDrops == null) base.stageDrops = { "2": 0, "3": 0 };
    if (base.recentHits == null) base.recentHits = {};
    if (base.damageMap == null) base.damageMap = {};
    if (base.liveSnapshot == null) base.liveSnapshot = [];
    if (base.frozenSnapshot == null) base.frozenSnapshot = [];
    if (base.debug == null) {
        base.debug = { lastErrorHook: "-", lastErrorMessage: "-" };
    }

    return base;
}

function writeConfig(npc, config) {
    npc.getStoreddata().put(ARCEUS_CONFIG_KEY, JSON.stringify(config));
    npc.getStoreddata().put(ARCEUS_CLOCK_MAIN_UUID_KEY, hasText(config.clockMainUuid) ? config.clockMainUuid : "");
    npc.getStoreddata().put(ARCEUS_CLOCK_RESPAWN_SECONDS_KEY, "" + clampPositiveInt(config.clockRespawnSeconds, 300));
}

function writeLifecycle(npc, lifecycle) {
    npc.getStoreddata().put(ARCEUS_LIFECYCLE_KEY, JSON.stringify(lifecycle));
}

function clearLegacyArceusKeys(data) {
    var keys = data.getKeys();
    if (keys == null) return;

    for (var i = 0; i < keys.length; i++) {
        var key = "" + keys[i];
        if (key.indexOf("arceus_") !== 0) continue;
        if (key == ARCEUS_CONFIG_KEY || key == ARCEUS_LIFECYCLE_KEY) continue;
        data.remove(key);
    }
}

function applyPhaseMeleeDelay(npc, config, phase) {
    try {
        var stats = npc.getStats();
        if (stats == null || stats.getMelee == null) return;
        var melee = stats.getMelee();
        var currentDelay = melee.getDelay();
        var baseDelay = currentDelay >= 1 ? currentDelay : 12;
        var multiplier = getPhaseMeleeDelayMultiplier(config, phase);
        melee.setDelay(Math.max(1, Math.round(baseDelay * multiplier)));
    } catch (e) {}
}

function getPhaseMeleeDelayMultiplier(config, phase) {
    if (phase == 2) return positiveFloat(config.phase2MeleeDelayMult, 0.7);
    if (phase >= 3) return positiveFloat(config.phase3MeleeDelayMult, 0.5);
    return positiveFloat(config.phase1MeleeDelayMult, 1.0);
}

function resetLiveVisualState(npc, config) {
    ensureHideDeadBody(npc);
    setNoAiState(npc, false);
    setEntityInvulnerable(npc, false);
    clearEntityDamageVisuals(npc);
    ensureBossBarEnabled(npc);
    applyBossBarColor(npc, "white");
    restoreNameplate(npc, config.baseTitle);
    restoreVisibleBody(npc);
    updateNpcClient(npc);
}

function announceArceusRespawn(npc, config) {
    var title = hasText(config.baseTitle) ? config.baseTitle : "\u0410\u0440\u043A\u0435\u0443\u0441";
    broadcastBossMessage(npc, "\u00A7f" + title + " \u00A7a\u0432\u043E\u0437\u0440\u043E\u0434\u0438\u043B\u0441\u044F.");
}

function notifyClockAlive(npc) {
    var mainNpc = resolveClockMain(npc);
    if (mainNpc == null) return;

    var data = mainNpc.getStoreddata();
    data.put("respawn_clock_target_uuid", getNpcUuid(npc));
    data.put("respawn_clock_target_name", getNpcDisplayName(npc));
    data.put("respawn_clock_target_dead_until_ms", "0");
    data.put("respawn_clock_target_alive", "1");

    try {
        mainNpc.getDisplay().setTitle("\u00A7aREADY");
        mainNpc.updateClient();
    } catch (e) {}
}

function resolveClockMain(npc) {
    var mainUuid = trimString(npc.getStoreddata().get(ARCEUS_CLOCK_MAIN_UUID_KEY));
    if (!hasText(mainUuid)) return null;

    try {
        return npc.getWorld().getEntity(mainUuid);
    } catch (e) {
        return null;
    }
}

function readRespawnDelaySeconds(npc) {
    try {
        var stats = npc.getStats();
        if (stats != null && stats.getRespawnTime) {
            var value = parseInt("" + stats.getRespawnTime(), 10);
            if (!isNaN(value) && value > 0) return value;
        }
    } catch (e) {}

    return 300;
}

function readNpcTitle(npc) {
    try {
        if (npc.getDisplay && npc.getDisplay() && npc.getDisplay().getTitle) {
            var title = "" + npc.getDisplay().getTitle();
            if (hasText(title) && title != "null") return title;
        }
    } catch (e) {}

    try {
        var name = "" + npc.getName();
        if (hasText(name) && name != "null") return name;
    } catch (e2) {}

    return "\u0410\u0440\u043A\u0435\u0443\u0441";
}

function broadcastBossMessage(npc, message) {
    if (!hasText(message)) return;

    try {
        var players = npc.getWorld().getAllPlayers();
        if (players == null) return;
        for (var i = 0; i < players.length; i++) {
            players[i].message(message);
        }
    } catch (e) {}
}

function ensureHideDeadBody(npc) {
    try {
        npc.getStats().setHideDeadBody(true);
    } catch (e) {}
}

function setNoAiState(npc, enabled) {
    try {
        npc.getMCEntity().setNoAi(enabled ? true : false);
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

function ensureBossBarEnabled(npc) {
    try {
        if (npc.getDisplay && npc.getDisplay() && npc.getDisplay().setBossbar) {
            npc.getDisplay().setBossbar(1);
            return;
        }
    } catch (e) {}
    try {
        if (npc.display && npc.display.setBossbar) {
            npc.display.setBossbar(1);
        }
    } catch (e2) {}
}

function applyBossBarColor(npc, colorName) {
    var colorId = 0;
    if (colorName == "yellow") colorId = 4;
    if (colorName == "red") colorId = 2;

    try {
        if (npc.getDisplay && npc.getDisplay() && npc.getDisplay().setBossColor) {
            npc.getDisplay().setBossColor(colorId);
            return;
        }
    } catch (e) {}
    try {
        if (npc.display && npc.display.setBossColor) {
            npc.display.setBossColor(colorId);
        }
    } catch (e2) {}
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

function getNpcUuid(npc) {
    try {
        return "" + npc.getUUID();
    } catch (e) {
        return "";
    }
}

function getNpcDisplayName(npc) {
    return readNpcTitle(npc);
}

function parseJsonSafe(raw) {
    if (raw == null || raw == "" || raw == "null") return null;
    try {
        return JSON.parse("" + raw);
    } catch (e) {
        return null;
    }
}

function legacyText(data, key, def) {
    var value = trimString(data.get(key));
    return value == "" ? def : value;
}

function legacyInt(data, key, def) {
    return parseIntSafe(data.get(key), def);
}

function legacyFloat(data, key, def) {
    return parseFloatSafe(data.get(key), def);
}

function legacyBool(data, key, def) {
    var value = trimString(data.get(key));
    if (value == "") return def;
    return value == "1" || value == "true";
}

function clampPositiveInt(value, def) {
    var parsed = parseIntSafe(value, def);
    return parsed < 1 ? def : parsed;
}

function positiveFloat(value, def) {
    var parsed = parseFloatSafe(value, def);
    return parsed > 0 ? parsed : def;
}

function parseIntSafe(value, def) {
    try {
        var parsed = parseInt("" + value, 10);
        return isNaN(parsed) ? def : parsed;
    } catch (e) {
        return def;
    }
}

function parseFloatSafe(value, def) {
    try {
        var parsed = parseFloat("" + value);
        return isNaN(parsed) ? def : parsed;
    } catch (e) {
        return def;
    }
}

function hasText(value) {
    return value != null && trimString(value).length > 0;
}

function trimString(value) {
    return ("" + value).replace(/^\s+|\s+$/g, "");
}
