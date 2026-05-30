// @ts-check

var JSON_KEY = "tournament_coordinator_registration_json";

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @returns {string}
 */
function getRaw(npc) {
    var raw = npc.getStoreddata().get(JSON_KEY);
    if (!hasText(raw) || raw == "null" || raw == "undefined") return "[]";
    return "" + raw;
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @param {string} raw
 * @returns {any}
 */
function saveRaw(npc, raw) {
    var parsed = parseList(raw);
    npc.getStoreddata().put(JSON_KEY, stringify(parsed, "[]"));
    return parsed;
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @returns {any[]}
 */
function getList(npc) {
    try {
        return parseList(getRaw(npc));
    } catch (e) {
        return [];
    }
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @returns {string[]}
 */
function getPlayerNames(npc) {
    var list = getList(npc);
    var names = [];

    for (var i = 0; i < list.length; i++) {
        if (list[i] != null && hasText(list[i].name)) names.push("" + list[i].name);
    }

    if (names.length < 1) names.push("<no players>");
    return names;
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @param {number} index
 * @returns {any}
 */
function getEntryByIndex(npc, index) {
    var list = getList(npc);
    if (index < 0 || index >= list.length) return null;
    return list[index];
}

/**
 * @param {any} raw
 * @returns {any[]}
 */
function parseList(raw) {
    var parsed = null;

    if (!hasText(raw)) return [];

    try {
        parsed = JSON.parse("" + raw);
    } catch (e) {
        throw "Invalid JSON: " + e;
    }

    if (parsed == null || parsed.length == null) throw "JSON must be an array from tournament_registration.";
    return parsed;
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
    JSON_KEY: JSON_KEY,
    getRaw: getRaw,
    saveRaw: saveRaw,
    getList: getList,
    getPlayerNames: getPlayerNames,
    getEntryByIndex: getEntryByIndex,
    stringify: stringify
};
