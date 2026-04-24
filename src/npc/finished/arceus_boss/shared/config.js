var utils = require("utils.js");
var visuals = require("visuals.js");
var clock = require("clock_link.js");

var ARCEUS_CONFIG_KEY = "arceus_config_json";
var ARCEUS_CONFIG_VERSION = 12;
var ARCEUS_CLOCK_MAIN_UUID_KEY = "respawn_clock_main_uuid";
var ARCEUS_CLOCK_RESPAWN_SECONDS_KEY = "respawn_clock_respawn_seconds";

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
        phaseTransitionLaunchRadius: 18.0,
        phaseTransitionLaunchPush: 1.85,
        phaseTransitionLaunchVertical: 1.15,
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

function ensureArceusConfig(npc) {
    var data = npc.getStoreddata();
    var current = utils.parseJsonSafe(data.get(ARCEUS_CONFIG_KEY));
    var merged = mergeConfig(current);

    if (merged.baseTitle == "") {
        merged.baseTitle = visuals.readNpcTitle(npc);
    }

    if (!utils.hasText(utils.trimString(data.get(ARCEUS_CLOCK_RESPAWN_SECONDS_KEY)))) {
        data.put(ARCEUS_CLOCK_RESPAWN_SECONDS_KEY, "" + clock.readRespawnDelaySeconds(npc));
    }

    merged.clockRespawnSeconds = utils.parseIntSafe(data.get(ARCEUS_CLOCK_RESPAWN_SECONDS_KEY), merged.clockRespawnSeconds);
    merged.clockMainUuid = utils.trimString(data.get(ARCEUS_CLOCK_MAIN_UUID_KEY));

    if (current == null || utils.parseIntSafe(current.version, 0) != ARCEUS_CONFIG_VERSION) {
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
    config.phaseTransitionLaunchRadius = legacyFloat(data, "arceus_phase_transition_launch_radius", config.phaseTransitionLaunchRadius);
    config.phaseTransitionLaunchPush = legacyFloat(data, "arceus_phase_transition_launch_push", config.phaseTransitionLaunchPush);
    config.phaseTransitionLaunchVertical = legacyFloat(data, "arceus_phase_transition_launch_vertical", config.phaseTransitionLaunchVertical);
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
    if (oldBaseTitle != "") config.baseTitle = oldBaseTitle;
    if (utils.trimString(data.get(ARCEUS_CLOCK_MAIN_UUID_KEY)) != "") {
        config.clockMainUuid = utils.trimString(data.get(ARCEUS_CLOCK_MAIN_UUID_KEY));
    }
    config.clockRespawnSeconds = utils.parseIntSafe(data.get(ARCEUS_CLOCK_RESPAWN_SECONDS_KEY), config.clockRespawnSeconds);
    config.version = ARCEUS_CONFIG_VERSION;
    return config;
}

function writeConfig(npc, config) {
    npc.getStoreddata().put(ARCEUS_CONFIG_KEY, JSON.stringify(config));
    npc.getStoreddata().put(ARCEUS_CLOCK_MAIN_UUID_KEY, utils.hasText(config.clockMainUuid) ? config.clockMainUuid : "");
    npc.getStoreddata().put(ARCEUS_CLOCK_RESPAWN_SECONDS_KEY, "" + utils.clampPositiveInt(config.clockRespawnSeconds, 300));
}

function legacyText(data, key, fallback) {
    var value = utils.trimString(data.get(key));
    return value == "" ? fallback : value;
}

function legacyInt(data, key, fallback) {
    return utils.parseIntSafe(data.get(key), fallback);
}

function legacyFloat(data, key, fallback) {
    return utils.parseFloatSafe(data.get(key), fallback);
}

function legacyBool(data, key, fallback) {
    var value = utils.trimString(data.get(key));
    if (value == "") return fallback;
    return value == "1" || value == "true";
}

module.exports = {
    ARCEUS_CONFIG_KEY: ARCEUS_CONFIG_KEY,
    ARCEUS_CONFIG_VERSION: ARCEUS_CONFIG_VERSION,
    ARCEUS_CLOCK_MAIN_UUID_KEY: ARCEUS_CLOCK_MAIN_UUID_KEY,
    ARCEUS_CLOCK_RESPAWN_SECONDS_KEY: ARCEUS_CLOCK_RESPAWN_SECONDS_KEY,
    createDefaultConfig: createDefaultConfig,
    ensureArceusConfig: ensureArceusConfig,
    mergeConfig: mergeConfig,
    migrateLegacyConfig: migrateLegacyConfig,
    writeConfig: writeConfig,
    legacyText: legacyText,
    legacyInt: legacyInt,
    legacyFloat: legacyFloat,
    legacyBool: legacyBool
};
