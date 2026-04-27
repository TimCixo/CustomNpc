// @ts-check

var utils = require("utils.js");

var DIALOGS_KEY = "basic_npc_example_dialogs_json";

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @param {any} data
 * @returns {any}
 */
function set(npc, data) {
    npc.getStoreddata().put(DIALOGS_KEY, utils.safeStringifyJson(data, "null"));
    return data;
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @returns {any}
 */
function get(npc) {
    return utils.safeParseJson(npc.getStoreddata().get(DIALOGS_KEY), null);
}

/**
 * @param {any} dialogId
 * @param {any} dialogRef
 * @returns {boolean}
 */
function isDialog(dialogId, dialogRef) {
    return String(dialogId) == String(dialogRef);
}

/**
 * @param {any} optionId
 * @param {any} optionRef
 * @returns {boolean}
 */
function isOption(optionId, optionRef) {
    return String(optionId) == String(optionRef);
}

module.exports = {
    set: set,
    get: get,
    isDialog: isDialog,
    isOption: isOption,
    DIALOGS_KEY: DIALOGS_KEY
};
