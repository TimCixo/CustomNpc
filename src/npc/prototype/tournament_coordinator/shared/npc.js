// @ts-check

var config = require("config.js");
var gui = require("gui.js");

var NOT_OPERATOR_MESSAGE = "§cЦей NPC доступний тільки операторам.";

/**
 * @param {any} event
 */
function init(event) {
    config.get(event.npc);
}

/**
 * @param {any} event
 */
function onInteract(event) {
    var npc = event.npc;
    var player = event.player;

    if (!isOperator(player)) {
        message(player, NOT_OPERATOR_MESSAGE);
        cancelEvent(event);
        return;
    }

    gui.openAdminGui(npc, player);
    cancelEvent(event);
}

/**
 * @param {any} event
 */
function onGuiScroll(event) {
    gui.onGuiScroll(event);
}

/**
 * @param {any} event
 */
function onGuiClosed(event) {
    gui.onGuiClosed(event);
}

/**
 * @param {any} player
 * @returns {boolean}
 */
function isOperator(player) {
    try {
        if (player.getMCEntity().hasPermissions(2)) return true;
    } catch (e1) {}

    try {
        var server = player.getMCEntity().level().getServer();
        if (server != null && server.getPlayerList().isOp(player.getMCEntity().getGameProfile())) return true;
    } catch (e2) {}

    try {
        if (player.hasPermission && player.hasPermission("minecraft.command.op")) return true;
    } catch (e3) {}

    return false;
}

/**
 * @param {any} player
 * @param {string} text
 */
function message(player, text) {
    try {
        player.message(text);
    } catch (e) {}
}

/**
 * @param {any} event
 */
function cancelEvent(event) {
    try {
        event.setCanceled(true);
    } catch (e) {}
}

module.exports = {
    init: init,
    onInteract: onInteract,
    onGuiScroll: onGuiScroll,
    onGuiClosed: onGuiClosed
};
