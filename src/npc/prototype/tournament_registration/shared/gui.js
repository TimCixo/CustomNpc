// @ts-check

var NpcAPI = Java.type("noppes.npcs.api.NpcAPI");

var registration = require("registration.js");

var GUI_ID = 9820;
var ACTION_SCROLL_ID = 9821;
var JSON_TEXT_ID = 9822;
var STATUS_TEXT_ID = 9823;
var GUI_NPC_KEY = "tournament_registration_gui_npc";

var ACTIONS = [
    "Start: Відкрити реєстрацію",
    "Stop: Закрити реєстрацію",
    "Clear: Очистити список"
];

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @param {import("noppes.npcs.api.entity").IPlayer} player
 */
function openAdminGui(npc, player) {
    try {
        player.getTempdata().put(GUI_NPC_KEY, npc);
    } catch (e) {}

    player.showCustomGui(createAdminGui(npc, player, "Вибери дію."));
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @param {import("noppes.npcs.api.entity").IPlayer} player
 * @param {string} status
 * @returns {any}
 */
function createAdminGui(npc, player, status) {
    var gui = NpcAPI.Instance().createCustomGui(GUI_ID, 430, 280, false, player);

    gui.addLabel(1, "Tournament Registration", 10, 10, 220, 18, 0xFFFFFF);
    gui.addLabel(2, getOpenStatusText(npc), 260, 10, 160, 18, registration.isOpen(npc) ? 0x55FF55 : 0xFFAA00);
    gui.addColoredLine(3, 10, 34, 410, 34, 0x4A8F80, 1.5);
    gui.addScroll(ACTION_SCROLL_ID, 10, 46, 160, 72, ACTIONS);
    gui.addTextArea(JSON_TEXT_ID, 180, 46, 240, 190);
    gui.addTextArea(STATUS_TEXT_ID, 10, 246, 410, 18);

    setGuiText(gui, JSON_TEXT_ID, registration.formatRegistrationsJson(npc));
    setGuiText(gui, STATUS_TEXT_ID, status);

    return gui;
}

/**
 * @param {any} event
 */
function onGuiScroll(event) {
    if (event.gui == null || event.scroll == null) return;
    if (event.gui.getID() != GUI_ID || event.scroll.getID() != ACTION_SCROLL_ID) return;

    var npc = resolveNpc(event);
    if (npc == null) return;

    var index = getSelectedIndex(event.scroll);
    var status = "";

    if (index == 0) {
        registration.setOpen(npc, true);
        status = "Реєстрацію відкрито.";
    } else if (index == 1) {
        registration.setOpen(npc, false);
        status = "Реєстрацію закрито.";
    } else if (index == 2) {
        registration.clearRegistrations(npc);
        status = "Список зареєстрованих очищено.";
    } else {
        return;
    }

    refreshGui(event.gui, npc, status);
}

/**
 * @param {any} event
 */
function onGuiClosed(event) {
    if (event.gui == null || event.gui.getID() != GUI_ID) return;

    try {
        event.player.getTempdata().remove(GUI_NPC_KEY);
    } catch (e) {}
}

/**
 * @param {any} gui
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @param {string} status
 */
function refreshGui(gui, npc, status) {
    setGuiText(gui, JSON_TEXT_ID, registration.formatRegistrationsJson(npc));
    setGuiText(gui, STATUS_TEXT_ID, status);
    setGuiText(gui, 2, getOpenStatusText(npc));

    try {
        gui.update();
    } catch (e) {}
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @returns {string}
 */
function getOpenStatusText(npc) {
    return registration.isOpen(npc) ? "Status: OPEN" : "Status: CLOSED";
}

/**
 * @param {any} event
 * @returns {import("noppes.npcs.api.entity").ICustomNpc|null}
 */
function resolveNpc(event) {
    try {
        var npc = event.player.getTempdata().get(GUI_NPC_KEY);
        if (npc != null) return npc;
    } catch (e1) {}

    try {
        if (event.npc != null) return event.npc;
    } catch (e2) {}

    return null;
}

/**
 * @param {any} scroll
 * @returns {number}
 */
function getSelectedIndex(scroll) {
    try {
        var selection = scroll.getSelection();
        if (selection != null && selection.length > 0) return selection[0];
    } catch (e1) {}

    try {
        if (scroll.selection != null && scroll.selection.length > 0) return scroll.selection[0];
    } catch (e2) {}

    return -1;
}

/**
 * @param {any} gui
 * @param {number} id
 * @param {string} text
 */
function setGuiText(gui, id, text) {
    try {
        var comp = gui.getComponent(id);
        if (comp != null && comp.setText != null) comp.setText(text == null ? "" : ("" + text));
    } catch (e) {}
}

module.exports = {
    GUI_ID: GUI_ID,
    ACTION_SCROLL_ID: ACTION_SCROLL_ID,
    GUI_NPC_KEY: GUI_NPC_KEY,
    openAdminGui: openAdminGui,
    onGuiScroll: onGuiScroll,
    onGuiClosed: onGuiClosed
};
