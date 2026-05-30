// @ts-check

var NpcAPI = Java.type("noppes.npcs.api.NpcAPI");

var config = require("config.js");
var registrations = require("registrations.js");

var GUI_ID = 9840;
var NAV_SCROLL_ID = 9841;
var STATUS_TEXT_ID = 9842;
var JSON_TEXT_ID = 9843;
var SAVE_SCROLL_ID = 9844;
var FIRST_PLAYER_SCROLL_ID = 9850;
var FIRST_ACTION_SCROLL_ID = 9851;
var SHARED_ACTION_SCROLL_ID = 9861;
var SECOND_PLAYER_SCROLL_ID = 9870;
var SECOND_ACTION_SCROLL_ID = 9871;

var GUI_NPC_KEY = "tournament_coordinator_gui_npc";
var FIRST_INDEX_KEY = "tournament_coordinator_first_index";
var SECOND_INDEX_KEY = "tournament_coordinator_second_index";

var NAV_ACTIONS = [
    "Manage",
    "JSON"
];

var PLAYER_ACTIONS = [
    "Check",
    "Teleport to arena",
    "Teleport to balcony",
    "Teleport to stands",
    "Announce winner"
];

var SHARED_ACTIONS = [
    "Check",
    "Teleport to arena",
    "Teleport to balcony",
    "Teleport to stands",
    "Announce duel"
];

var SAVE_ACTIONS = [
    "Save"
];

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @param {import("noppes.npcs.api.entity").IPlayer} player
 */
function openAdminGui(npc, player) {
    try {
        player.getTempdata().put(GUI_NPC_KEY, npc);
    } catch (e) {}

    player.showCustomGui(createManageGui(npc, player, "Choose players and an action."));
}

/**
 * @param {any} event
 */
function onGuiScroll(event) {
    if (event.gui == null || event.scroll == null) return;
    if (event.gui.getID() != GUI_ID) return;

    var npc = resolveNpc(event);
    if (npc == null) return;

    if (event.scroll.getID() == NAV_SCROLL_ID) {
        handleNav(event, npc);
        return;
    }

    if (event.scroll.getID() == SAVE_SCROLL_ID) {
        handleSaveJson(event, npc);
        return;
    }

    if (event.scroll.getID() == FIRST_PLAYER_SCROLL_ID) {
        setSelection(event.player, FIRST_INDEX_KEY, getSelectedIndex(event.scroll));
        reopenManage(event.player, npc, "First player selected.");
        return;
    }

    if (event.scroll.getID() == SECOND_PLAYER_SCROLL_ID) {
        setSelection(event.player, SECOND_INDEX_KEY, getSelectedIndex(event.scroll));
        reopenManage(event.player, npc, "Second player selected.");
        return;
    }

    if (event.scroll.getID() == FIRST_ACTION_SCROLL_ID) {
        handlePlayerAction(event, npc, "first", getSelectedIndex(event.scroll));
        return;
    }

    if (event.scroll.getID() == SECOND_ACTION_SCROLL_ID) {
        handlePlayerAction(event, npc, "second", getSelectedIndex(event.scroll));
        return;
    }

    if (event.scroll.getID() == SHARED_ACTION_SCROLL_ID) {
        handleSharedAction(event, npc, getSelectedIndex(event.scroll));
    }
}

/**
 * @param {any} event
 */
function onGuiClosed(event) {
    if (event.gui == null || event.gui.getID() != GUI_ID) return;
    void event;
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @param {import("noppes.npcs.api.entity").IPlayer} player
 * @param {string} status
 * @returns {any}
 */
function createManageGui(npc, player, status) {
    var gui = NpcAPI.Instance().createCustomGui(GUI_ID, 560, 310, false, player);
    var names = registrations.getPlayerNames(npc);

    gui.addLabel(1, "Tournament Coordinator", 10, 10, 220, 18, 0xFFFFFF);
    gui.addScroll(NAV_SCROLL_ID, 390, 8, 160, 30, NAV_ACTIONS);
    gui.addColoredLine(2, 10, 38, 540, 38, 0x4A8F80, 1.5);

    addPlayerColumn(gui, "First Player", 10, FIRST_PLAYER_SCROLL_ID, FIRST_ACTION_SCROLL_ID, names);
    addSharedColumn(gui, "Shared", 198);
    addPlayerColumn(gui, "Second Player", 386, SECOND_PLAYER_SCROLL_ID, SECOND_ACTION_SCROLL_ID, names);

    gui.addTextArea(STATUS_TEXT_ID, 10, 284, 540, 16);
    setGuiText(gui, STATUS_TEXT_ID, status);

    return gui;
}

/**
 * @param {any} gui
 * @param {string} title
 * @param {number} x
 * @param {number} playerScrollId
 * @param {number} actionScrollId
 * @param {string[]} names
 */
function addPlayerColumn(gui, title, x, playerScrollId, actionScrollId, names) {
    gui.addLabel(playerScrollId + 100, title, x, 54, 160, 18, 0xFFFFFF);
    gui.addScroll(playerScrollId, x, 76, 164, 56, names);
    gui.addScroll(actionScrollId, x, 140, 164, 132, PLAYER_ACTIONS);
}

/**
 * @param {any} gui
 * @param {string} title
 * @param {number} x
 */
function addSharedColumn(gui, title, x) {
    gui.addLabel(SHARED_ACTION_SCROLL_ID + 100, title, x, 54, 160, 18, 0xFFFFFF);
    gui.addScroll(SHARED_ACTION_SCROLL_ID, x, 76, 164, 196, SHARED_ACTIONS);
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @param {import("noppes.npcs.api.entity").IPlayer} player
 * @param {string} status
 * @returns {any}
 */
function createJsonGui(npc, player, status) {
    var gui = NpcAPI.Instance().createCustomGui(GUI_ID, 560, 310, false, player);

    gui.addLabel(1, "Tournament Coordinator / JSON", 10, 10, 260, 18, 0xFFFFFF);
    gui.addScroll(NAV_SCROLL_ID, 390, 8, 160, 30, NAV_ACTIONS);
    gui.addColoredLine(2, 10, 38, 540, 38, 0x4A8F80, 1.5);
    gui.addTextArea(JSON_TEXT_ID, 10, 52, 540, 202);
    gui.addScroll(SAVE_SCROLL_ID, 10, 262, 120, 30, SAVE_ACTIONS);
    gui.addTextArea(STATUS_TEXT_ID, 140, 262, 410, 30);

    setGuiText(gui, JSON_TEXT_ID, registrations.getRaw(npc));
    setGuiText(gui, STATUS_TEXT_ID, status);

    return gui;
}

/**
 * @param {any} event
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 */
function handleNav(event, npc) {
    var index = getSelectedIndex(event.scroll);

    if (index == 0) {
        event.player.showCustomGui(createManageGui(npc, event.player, "Management page."));
    } else if (index == 1) {
        event.player.showCustomGui(createJsonGui(npc, event.player, "Paste JSON from tournament_registration and press Save."));
    }
}

/**
 * @param {any} event
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 */
function handleSaveJson(event, npc) {
    var raw = getGuiText(event.gui, JSON_TEXT_ID);

    try {
        registrations.saveRaw(npc, raw);
        event.player.showCustomGui(createJsonGui(npc, event.player, "JSON saved."));
    } catch (e) {
        setGuiText(event.gui, STATUS_TEXT_ID, "" + e);
        safeUpdate(event.gui);
    }
}

/**
 * @param {any} event
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @param {string} side
 * @param {number} actionIndex
 */
function handlePlayerAction(event, npc, side, actionIndex) {
    var entry = getSelectedEntry(event.player, npc, side);
    var target = entry == null ? null : findOnlinePlayer(npc, entry.name);
    var cfg = config.get(npc);
    var status = "";

    if (entry == null) {
        reopenManage(event.player, npc, "No player selected.");
        return;
    }

    if (actionIndex == 0) {
        status = buildEntrySummary(entry, target);
    } else if (actionIndex == 1) {
        status = teleportEntry(npc, entry, target, getSidePoint(cfg.arena, side));
    } else if (actionIndex == 2) {
        status = teleportEntry(npc, entry, target, getSidePoint(cfg.balcony, side));
    } else if (actionIndex == 3) {
        status = teleportEntry(npc, entry, target, cfg.stands.common);
    } else if (actionIndex == 4) {
        status = announceWinner(npc, cfg, entry);
    } else {
        return;
    }

    reopenManage(event.player, npc, status);
}

/**
 * @param {any} event
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @param {number} actionIndex
 */
function handleSharedAction(event, npc, actionIndex) {
    var first = getSelectedEntry(event.player, npc, "first");
    var second = getSelectedEntry(event.player, npc, "second");
    var firstTarget = first == null ? null : findOnlinePlayer(npc, first.name);
    var secondTarget = second == null ? null : findOnlinePlayer(npc, second.name);
    var cfg = config.get(npc);
    var status = "";

    if (first == null || second == null) {
        reopenManage(event.player, npc, "Select two players.");
        return;
    }

    if (actionIndex == 0) {
        status = buildEntrySummary(first, firstTarget) + " | " + buildEntrySummary(second, secondTarget);
    } else if (actionIndex == 1) {
        status = teleportEntry(npc, first, firstTarget, cfg.arena.first) + " / " + teleportEntry(npc, second, secondTarget, cfg.arena.second);
    } else if (actionIndex == 2) {
        status = teleportEntry(npc, first, firstTarget, cfg.balcony.first) + " / " + teleportEntry(npc, second, secondTarget, cfg.balcony.second);
    } else if (actionIndex == 3) {
        status = teleportEntry(npc, first, firstTarget, cfg.stands.common) + " / " + teleportEntry(npc, second, secondTarget, cfg.stands.common);
    } else if (actionIndex == 4) {
        status = announceDuel(npc, cfg, first, second);
    } else {
        return;
    }

    reopenManage(event.player, npc, status);
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @param {any} entry
 * @param {any} target
 * @param {any} point
 * @returns {string}
 */
function teleportEntry(npc, entry, target, point) {
    void npc;

    if (target == null) return "§c" + entry.name + " is offline.";

    try {
        target.setPosition(point.x, point.y, point.z);
        return "§a" + entry.name + " teleported.";
    } catch (e) {
        return "§cCould not teleport " + entry.name + ": " + e;
    }
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @param {any} cfg
 * @param {any} entry
 * @returns {string}
 */
function announceWinner(npc, cfg, entry) {
    var text = replaceAll(cfg.messages.winner, "{player}", entry.name);
    broadcast(npc, text);
    return "Winner announced: " + entry.name;
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @param {any} cfg
 * @param {any} first
 * @param {any} second
 * @returns {string}
 */
function announceDuel(npc, cfg, first, second) {
    var text = replaceAll(cfg.messages.duel, "{first}", first.name);
    text = replaceAll(text, "{second}", second.name);
    broadcast(npc, text);
    return "Duel announced: " + first.name + " vs " + second.name;
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @param {string} text
 */
function broadcast(npc, text) {
    try {
        npc.getWorld().broadcast(text);
    } catch (e1) {
        try {
            npc.world.broadcast(text);
        } catch (e2) {}
    }
}

/**
 * @param {any} entry
 * @param {any} target
 * @returns {string}
 */
function buildEntrySummary(entry, target) {
    var count = 0;
    try {
        count = entry.pokemon.length;
    } catch (e) {}

    return entry.name + ": " + count + " Pokemon, " + (target == null ? "offline" : "online");
}

/**
 * @param {any} player
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @param {string} side
 * @returns {any}
 */
function getSelectedEntry(player, npc, side) {
    var key = side == "second" ? SECOND_INDEX_KEY : FIRST_INDEX_KEY;
    var index = getSelection(player, key);
    return registrations.getEntryByIndex(npc, index);
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @param {string} name
 * @returns {any}
 */
function findOnlinePlayer(npc, name) {
    try {
        return npc.getWorld().getPlayer(name);
    } catch (e1) {
        try {
            return npc.world.getPlayer(name);
        } catch (e2) {
            return null;
        }
    }
}

/**
 * @param {any} group
 * @param {string} side
 * @returns {any}
 */
function getSidePoint(group, side) {
    if (side == "second") return group.second;
    return group.first;
}

/**
 * @param {any} player
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @param {string} status
 */
function reopenManage(player, npc, status) {
    player.showCustomGui(createManageGui(npc, player, status));
}

/**
 * @param {any} player
 * @param {string} key
 * @param {number} index
 */
function setSelection(player, key, index) {
    try {
        player.getTempdata().put(key, "" + index);
    } catch (e) {}
}

/**
 * @param {any} player
 * @param {string} key
 * @returns {number}
 */
function getSelection(player, key) {
    try {
        var raw = player.getTempdata().get(key);
        var parsed = parseInt("" + raw, 10);
        if (!isNaN(parsed)) return parsed;
    } catch (e) {}

    return 0;
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
 * @returns {string}
 */
function getGuiText(gui, id) {
    try {
        var comp = gui.getComponent(id);
        if (comp != null && comp.getText != null) return "" + comp.getText();
    } catch (e1) {}

    try {
        var comp2 = gui.getComponent(id);
        if (comp2 != null && comp2.text != null) return "" + comp2.text;
    } catch (e2) {}

    return "";
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

/**
 * @param {any} gui
 */
function safeUpdate(gui) {
    try {
        gui.update();
    } catch (e) {}
}

/**
 * @param {string} text
 * @param {string} token
 * @param {string} value
 * @returns {string}
 */
function replaceAll(text, token, value) {
    return ("" + text).split(token).join(value);
}

module.exports = {
    GUI_ID: GUI_ID,
    GUI_NPC_KEY: GUI_NPC_KEY,
    openAdminGui: openAdminGui,
    onGuiScroll: onGuiScroll,
    onGuiClosed: onGuiClosed
};
