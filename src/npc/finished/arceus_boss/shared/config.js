// @ts-check

var utils = require("utils.js");

var CONFIG_KEY = "arceus_config_json";

/**
 * @typedef {Object} ConfigGeneral
 * @property {boolean} enabled
 * @property {number} timerTicks
 * @property {boolean} debugRuntime
 * @property {string} baseTitle
 */

/**
 * @typedef {Object} ConfigCombat
 * @property {number} aggroRefreshMs
 * @property {number} aggroRadius
 * @property {number} transitionTicks
 * @property {number=} transitionLaunchRadius
 * @property {number=} transitionLaunchPush
 * @property {number=} transitionLaunchVertical
 * @property {number=} phase2DamageMult
 * @property {number=} phase3DamageMult
 * @property {number=} aggroRecentMs
 */

/**
 * @typedef {Object} ConfigPhases
 * @property {number} phase2Threshold
 * @property {number} phase3Threshold
 * @property {number} phase2HealTo
 * @property {number} phase3HealTo
 * @property {number=} regenInterval
 * @property {number=} regenDuration
 * @property {number=} regenAmplifier
 */

/**
 * @typedef {Object} ConfigDeath
 * @property {number} customTicks
 * @property {number} thresholdMinHp
 * @property {number=} thresholdPercent
 * @property {number=} spinStep
 * @property {number=} explosionPower
 */

/**
 * @typedef {Object} ConfigRewards
 * @property {string} phase2Item
 * @property {number} phase2TotalDropsBase
 * @property {number} phase2TotalDropsPerExtraPlayer
 * @property {number} phase2TotalDropsMax
 * @property {number} phase3TotalDropsBase
 * @property {number} phase3TotalDropsPerExtraPlayer
 * @property {number} phase3TotalDropsMax
 * @property {number} pinataSpeedMin
 * @property {number} pinataSpeedMax
 * @property {number} pinataVerticalBoost
 */

/**
 * @typedef {Object} ConfigMedia
 * @property {string} deathSound
 * @property {string=} stage2Sound
 * @property {string=} stage3Sound
 */

/**
 * @typedef {Object} ArceusConfig
 * @property {ConfigGeneral} general
 * @property {ConfigCombat} combat
 * @property {ConfigPhases} phases
 * @property {ConfigDeath} death
 * @property {ConfigRewards} rewards
 * @property {ConfigMedia} media
 */

/** @type {ArceusConfig} */
var DEFAULT_CONFIG = {
    general: {
        enabled: true,
        timerTicks: 5,
        debugRuntime: false,
        baseTitle: "Arceus"
    },
    combat: {
        aggroRefreshMs: 500,
        aggroRadius: 32,
        transitionTicks: 40,
        transitionLaunchRadius: 18,
        transitionLaunchPush: 1.85,
        transitionLaunchVertical: 1.15,
        phase2DamageMult: 1.2,
        phase3DamageMult: 1.45,
        aggroRecentMs: 3500
    },
    phases: {
        phase2Threshold: 0.10,
        phase3Threshold: 0.10,
        phase2HealTo: 0.72,
        phase3HealTo: 0.45,
        regenInterval: 40,
        regenDuration: 60,
        regenAmplifier: 2
    },
    death: {
        customTicks: 80,
        thresholdMinHp: 20,
        thresholdPercent: 0.02,
        spinStep: 12,
        explosionPower: 3.5
    },
    rewards: {
        phase2Item: "cobblemon:rare_candy",
        phase2TotalDropsBase: 8,
        phase2TotalDropsPerExtraPlayer: 4,
        phase2TotalDropsMax: 24,
        phase3TotalDropsBase: 3,
        phase3TotalDropsPerExtraPlayer: 2,
        phase3TotalDropsMax: 12,
        pinataSpeedMin: 0.20,
        pinataSpeedMax: 0.55,
        pinataVerticalBoost: 0.28
    },
    media: {
        deathSound: "cobblemon:pokemon.arceus.cry",
        stage2Sound: "cobblemon:pokemon.arceus.cry",
        stage3Sound: "cobblemon:pokemon.arceus.cry"
    }
};

/**
 * @param {any} value
 * @returns {boolean}
 */
function isPlainObject(value) {
    return value != null
        && typeof value == "object"
        && Object.prototype.toString.call(value) == "[object Object]";
}

/**
 * @template T
 * @param {T} value
 * @returns {T}
 */
function cloneValue(value) {
    var output;
    var key;

    if (!isPlainObject(value)) {
        if (Object.prototype.toString.call(value) == "[object Array]") {
            return /** @type {T} */ (value.slice(0));
        }
        return value;
    }

    output = {};
    for (key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
            output[key] = cloneValue(value[key]);
        }
    }
    return /** @type {T} */ (output);
}

/**
 * Deep-merges custom config onto defaults without replacing complete nested blocks.
 *
 * @template T
 * @param {T} defaults
 * @param {any} custom
 * @returns {T}
 */
function mergeConfig(defaults, custom) {
    var merged = cloneValue(defaults);
    var key;

    if (!isPlainObject(custom)) return merged;

    for (key in custom) {
        if (!Object.prototype.hasOwnProperty.call(custom, key)) continue;
        if (custom[key] === undefined || custom[key] === null) continue;

        if (isPlainObject(merged[key]) && isPlainObject(custom[key])) {
            merged[key] = mergeConfig(merged[key], custom[key]);
        } else {
            merged[key] = cloneValue(custom[key]);
        }
    }

    return merged;
}

/**
 * @param {any} npc
 * @param {any} data
 * @returns {ArceusConfig}
 */
function set(npc, data) {
    var config = /** @type {ArceusConfig} */ (mergeConfig(DEFAULT_CONFIG, data || {}));
    npc.getStoreddata().put(CONFIG_KEY, JSON.stringify(config));
    return config;
}

/**
 * @param {any} npc
 * @returns {ArceusConfig|null}
 */
function get(npc) {
    var stored = npc.getStoreddata();
    var raw = stored.get(CONFIG_KEY);
    var parsed;

    if (raw == null || raw == "" || raw == "null" || raw == "undefined") return null;

    parsed = utils.parseJsonSafe(raw);
    return /** @type {ArceusConfig} */ (mergeConfig(DEFAULT_CONFIG, parsed || {}));
}

module.exports = {
    CONFIG_KEY: CONFIG_KEY,
    DEFAULT_CONFIG: DEFAULT_CONFIG,
    mergeConfig: mergeConfig,
    set: set,
    get: get
};
