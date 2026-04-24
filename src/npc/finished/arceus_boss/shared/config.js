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
        aggroRadius: 32,
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
        clockRespawnSeconds: 86400
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

    writeConfig(npc, merged);
    return merged;
}

function writeConfig(npc, config) {
    npc.getStoreddata().put(ARCEUS_CONFIG_KEY, JSON.stringify(config));
    npc.getStoreddata().put(ARCEUS_CLOCK_MAIN_UUID_KEY, utils.hasText(config.clockMainUuid) ? config.clockMainUuid : "");
    npc.getStoreddata().put(ARCEUS_CLOCK_RESPAWN_SECONDS_KEY, "" + utils.clampPositiveInt(config.clockRespawnSeconds, 300));
}

module.exports = {
    ARCEUS_CONFIG_KEY: ARCEUS_CONFIG_KEY,
    ARCEUS_CONFIG_VERSION: ARCEUS_CONFIG_VERSION,
    ARCEUS_CLOCK_MAIN_UUID_KEY: ARCEUS_CLOCK_MAIN_UUID_KEY,
    ARCEUS_CLOCK_RESPAWN_SECONDS_KEY: ARCEUS_CLOCK_RESPAWN_SECONDS_KEY,
    createDefaultConfig: createDefaultConfig,
    ensureArceusConfig: ensureArceusConfig,
    mergeConfig: mergeConfig,
    writeConfig: writeConfig
};
