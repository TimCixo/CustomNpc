// @ts-check

var CONFIG_KEY = "tournament_coordinator_config_json";

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @returns {any}
 */
function get(npc) {
    var raw = npc.getStoreddata().get(CONFIG_KEY);
    return parseJson(raw, null);
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
    get: get,
    set: set,
    stringify: stringify
};
