// @ts-check

var CONFIG_KEY = "tournament_coordinator_config_json";

var DEFAULT_CONFIG = {
    arena: {
        first: { x: 0, y: 80, z: 0 },
        second: { x: 10, y: 80, z: 0 }
    },
    balcony: {
        first: { x: 0, y: 90, z: 10 },
        second: { x: 10, y: 90, z: 10 }
    },
    stands: {
        common: { x: 5, y: 85, z: 25 }
    },
    messages: {
        winner: "§6Переможець дуелі: §e{player}§6!",
        duel: "§bДуель: §e{first} §fvs §e{second}§b!"
    }
};

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @returns {any}
 */
function get(npc) {
    var raw = npc.getStoreddata().get(CONFIG_KEY);
    var parsed = parseJson(raw, null);

    if (parsed == null) {
        parsed = cloneDefaultConfig();
        set(npc, parsed);
    }

    return mergeConfig(parsed);
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @param {any} value
 * @returns {any}
 */
function set(npc, value) {
    npc.getStoreddata().put(CONFIG_KEY, stringify(value, "{}"));
    return value;
}

/**
 * @returns {any}
 */
function cloneDefaultConfig() {
    return parseJson(stringify(DEFAULT_CONFIG, "{}"), DEFAULT_CONFIG);
}

/**
 * @param {any} value
 * @returns {any}
 */
function mergeConfig(value) {
    var cfg = cloneDefaultConfig();

    if (value == null) return cfg;

    copyPoint(cfg.arena.first, value, ["arena", "first"]);
    copyPoint(cfg.arena.second, value, ["arena", "second"]);
    copyPoint(cfg.balcony.first, value, ["balcony", "first"]);
    copyPoint(cfg.balcony.second, value, ["balcony", "second"]);
    copyPoint(cfg.stands.common, value, ["stands", "common"]);

    try {
        if (hasText(value.messages.winner)) cfg.messages.winner = "" + value.messages.winner;
    } catch (e1) {}

    try {
        if (hasText(value.messages.duel)) cfg.messages.duel = "" + value.messages.duel;
    } catch (e2) {}

    return cfg;
}

/**
 * @param {any} target
 * @param {any} source
 * @param {string[]} path
 */
function copyPoint(target, source, path) {
    try {
        var point = source[path[0]][path[1]];
        target.x = parseNumber(point.x, target.x);
        target.y = parseNumber(point.y, target.y);
        target.z = parseNumber(point.z, target.z);
    } catch (e) {}
}

/**
 * @param {any} value
 * @param {number} fallback
 * @returns {number}
 */
function parseNumber(value, fallback) {
    var parsed = parseFloat("" + value);
    return isNaN(parsed) ? fallback : parsed;
}

/**
 * @param {any} raw
 * @param {any} fallback
 * @returns {any}
 */
function parseJson(raw, fallback) {
    if (!hasText(raw) || raw == "null" || raw == "undefined") return fallback;

    try {
        return JSON.parse("" + raw);
    } catch (e) {
        return fallback;
    }
}

/**
 * @param {any} value
 * @param {string} fallback
 * @returns {string}
 */
function stringify(value, fallback) {
    try {
        return JSON.stringify(value, null, 2);
    } catch (e) {
        return fallback;
    }
}

/**
 * @param {any} value
 * @returns {boolean}
 */
function hasText(value) {
    return value != null && ("" + value).replace(/^\s+|\s+$/g, "").length > 0;
}

module.exports = {
    CONFIG_KEY: CONFIG_KEY,
    DEFAULT_CONFIG: DEFAULT_CONFIG,
    get: get,
    set: set,
    stringify: stringify
};
