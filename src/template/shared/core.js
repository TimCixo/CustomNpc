// @ts-check

var COUNT_KEY = "template_count";
var LAST_PLAYER_KEY = "template_last_player";

/**
 * @param {any} value
 * @returns {string}
 */
function text(value) {
    return String(value == null ? "" : value).replace(/^\s+|\s+$/g, "");
}

/**
 * @param {any} value
 * @returns {boolean}
 */
function has(value) {
    return text(value).length > 0;
}

/**
 * @param {any} value
 * @param {number} fallback
 * @returns {number}
 */
function num(value, fallback) {
    var parsed = parseInt(text(value), 10);
    return isNaN(parsed) ? fallback : parsed;
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @returns {any}
 */
function store(npc) {
    return npc == null ? null : npc.storeddata;
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 */
function ensureState(npc) {
    var data = store(npc);
    if (data == null) return;

    if (!has(data.get(COUNT_KEY))) data.put(COUNT_KEY, "0");
    if (!has(data.get(LAST_PLAYER_KEY))) data.put(LAST_PLAYER_KEY, "");
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @param {string} playerName
 * @returns {number}
 */
function increment(npc, playerName) {
    ensureState(npc);

    var data = store(npc);
    if (data == null) return 0;

    var nextCount = num(data.get(COUNT_KEY), 0) + 1;
    data.put(COUNT_KEY, String(nextCount));
    data.put(LAST_PLAYER_KEY, has(playerName) ? playerName : "");
    return nextCount;
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @returns {string}
 */
function buildStatus(npc) {
    ensureState(npc);

    var data = store(npc);
    if (data == null) return "Template data is unavailable";

    var count = num(data.get(COUNT_KEY), 0);
    var lastPlayer = text(data.get(LAST_PLAYER_KEY));
    if (!has(lastPlayer)) lastPlayer = "<none>";

    return "Template count=" + count + ", last_player=" + lastPlayer;
}

module.exports = {
    ensureState: ensureState,
    increment: increment,
    buildStatus: buildStatus
};
