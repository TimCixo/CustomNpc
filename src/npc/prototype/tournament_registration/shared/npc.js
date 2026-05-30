var registration = require("registration.js");
var gui = require("gui.js");

var REGISTRATION_CLOSED_MESSAGE = "§eРегистрация на турнир сейчас закрыта.";
var REGISTRATION_SUCCESS_MESSAGE = "§aТы зарегистрирован на турнир.";

/**
 * @param {any} event
 */
function init(event) {
    void event;
}

/**
 * @param {any} event
 */
function onInteract(event) {
    var npc = event.npc;
    var player = event.player;

    if (isShiftOperator(player)) {
        gui.openAdminGui(npc, player);
        cancelEvent(event);
        return;
    }

    if (!registration.isOpen(npc)) {
        message(player, REGISTRATION_CLOSED_MESSAGE);
        cancelEvent(event);
        return;
    }

    registration.registerPlayer(npc, player);
    message(player, REGISTRATION_SUCCESS_MESSAGE);
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
function isShiftOperator(player) {
    if (player == null) return false;
    if (!isSneaking(player)) return false;
    return isOperator(player);
}

/**
 * @param {any} player
 * @returns {boolean}
 */
function isSneaking(player) {
    try {
        if (player.isSneaking()) return true;
    } catch (e1) {}

    try {
        if (player.getMCEntity().isCrouching()) return true;
    } catch (e2) {}

    return false;
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
    if (!hasText(text)) return;

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

/**
 * @param {any} value
 * @returns {boolean}
 */
function hasText(value) {
    return value != null && ("" + value).replace(/^\s+|\s+$/g, "").length > 0;
}

module.exports = {
    init: init,
    onInteract: onInteract,
    onGuiScroll: onGuiScroll,
    onGuiClosed: onGuiClosed
};
