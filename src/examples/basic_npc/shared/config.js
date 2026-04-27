// @ts-check

var utils = require("utils.js");

var CONFIG_KEY = "basic_npc_example_config_json";

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @param {any} data
 * @returns {any}
 */
function set(npc, data) {
    npc.getStoreddata().put(CONFIG_KEY, utils.safeStringifyJson(data, "null"));
    return data;
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @returns {any}
 */
function get(npc) {
    return utils.safeParseJson(npc.getStoreddata().get(CONFIG_KEY), null);
}

module.exports = {
    set: set,
    get: get,
    CONFIG_KEY: CONFIG_KEY
};
