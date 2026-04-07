var PM_NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var PM_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var PM_CustomData = Java.type("net.minecraft.world.item.component.CustomData");

var LINKER_TYPE = "npc_linker_bind_test";
var LOCAL_TIMER_KEY = "linker_local_timer";
var LOCAL_INTERVAL_KEY = "linker_local_interval";
var LOCAL_MODE_KEY = "linker_local_mode";

var GUI_ID = 9301;
var SCROLL_ID = 9302;
var TIMER_FIELD_ID = 9303;
var INTERVAL_FIELD_ID = 9304;
var MODE_FIELD_ID = 9305;
var STATUS_ID = 9306;
var ACTIONS = ["Save", "Default", "Summary"];
var ACTIVE_NPC = null;

function interact(event) {
    var npc = event.npc;
    var player = event.player;
    var item = player.getMainhandItem();

    ACTIVE_NPC = npc;

    if (isLinker(item)) {
        bindToLinker(npc, player, item);
        event.setCanceled(true);
        return;
    }

    try {
        player.showCustomGui(createGui(player, npc));
    } catch (e) {
        player.message("GUI error: " + e);
    }
    event.setCanceled(true);
}

function customGuiScroll(event) {
    try {
        var gui = event.gui;
        var scroll = event.scroll;
        var npc = event.npc != null ? event.npc : ACTIVE_NPC;
        if (gui == null || gui.getID() != GUI_ID) return;
        if (scroll == null || scroll.getID() != SCROLL_ID) return;
        if (npc == null) return;

        var selected = getSelectedIndex(scroll);
        if (selected == 0) {
            saveLocalState(npc, gui);
            setStatus(gui, "Saved locally.");
        } else if (selected == 1) {
            loadDefaults(gui);
            setStatus(gui, "Defaults loaded.");
        } else if (selected == 2) {
            setStatus(gui, buildSummary(gui));
        }
        safeUpdate(gui);
    } catch (e) {}
}

function createGui(player, npc) {
    var gui = PM_NpcAPI.Instance().createCustomGui(GUI_ID, 300, 210, false, player);
    gui.addLabel(1, "Configurator", 10, 10, 180, 18, 0xFFFFFF);
    gui.addColoredLine(2, 10, 36, 280, 36, 0x4A8F80, 1.5);
    gui.addLabel(10, "Timer", 10, 50, 80, 14, 0xE0E0E0);
    gui.addTextField(TIMER_FIELD_ID, 10, 66, 100, 20);
    gui.addLabel(11, "Interval", 120, 50, 80, 14, 0xE0E0E0);
    gui.addTextField(INTERVAL_FIELD_ID, 120, 66, 100, 20);
    gui.addLabel(12, "Mode", 10, 96, 80, 14, 0xE0E0E0);
    gui.addTextField(MODE_FIELD_ID, 10, 112, 100, 20);
    gui.addLabel(13, "Actions", 230, 50, 60, 14, 0xE0E0E0);
    gui.addScroll(SCROLL_ID, 230, 66, 60, 70, ACTIONS);
    gui.addTextArea(STATUS_ID, 10, 184, 280, 12);

    hydrateLocal(gui, npc);
    setStatus(gui, "Ready.");
    return gui;
}

function bindToLinker(npc, player, item) {
    var tag = getCustomTag(item);
    if (tag == null || readTag(tag, "linker_type") != LINKER_TYPE || !hasText(readTag(tag, "main_uuid"))) {
        player.message("Invalid linker.");
        return;
    }

    tag.putString("config_uuid", getNpcUuid(npc));
    if (!writeHeldTag(player, item, tag)) {
        player.message("Bind write failed.");
        return;
    }

    player.message("Configurator linked.");
}

function saveLocalState(npc, gui) {
    npc.getStoreddata().put(LOCAL_TIMER_KEY, getGuiText(gui, TIMER_FIELD_ID));
    npc.getStoreddata().put(LOCAL_INTERVAL_KEY, getGuiText(gui, INTERVAL_FIELD_ID));
    npc.getStoreddata().put(LOCAL_MODE_KEY, getGuiText(gui, MODE_FIELD_ID));
}

function hydrateLocal(gui, npc) {
    setGuiText(gui, TIMER_FIELD_ID, readStoredOr(npc, LOCAL_TIMER_KEY, "00:05:00"));
    setGuiText(gui, INTERVAL_FIELD_ID, readStoredOr(npc, LOCAL_INTERVAL_KEY, "00:01:00"));
    setGuiText(gui, MODE_FIELD_ID, readStoredOr(npc, LOCAL_MODE_KEY, "default"));
}

function loadDefaults(gui) {
    setGuiText(gui, TIMER_FIELD_ID, "00:05:00");
    setGuiText(gui, INTERVAL_FIELD_ID, "00:01:00");
    setGuiText(gui, MODE_FIELD_ID, "default");
}

function buildSummary(gui) {
    return "T=" + getGuiText(gui, TIMER_FIELD_ID)
        + " I=" + getGuiText(gui, INTERVAL_FIELD_ID)
        + " M=" + getGuiText(gui, MODE_FIELD_ID);
}

function isLinker(item) {
    var tag = getCustomTag(item);
    return tag != null && readTag(tag, "linker_type") == LINKER_TYPE;
}

function getCustomTag(item) {
    if (item == null || item.isEmpty()) return null;
    try {
        var customData = item.getMCItemStack().get(PM_DataComponents.CUSTOM_DATA);
        if (customData == null) return null;
        return customData.copyTag();
    } catch (e) {
        return null;
    }
}

function writeHeldTag(player, item, tag) {
    try {
        item.getMCItemStack().set(PM_DataComponents.CUSTOM_DATA, PM_CustomData.of(tag));
        player.updatePlayerInventory();
        return true;
    } catch (e) {
        return false;
    }
}

function readTag(tag, key) {
    try {
        return "" + tag.getString(key);
    } catch (e) {
        return "";
    }
}

function getSelectedIndex(scroll) {
    try {
        var selection = scroll.getSelection();
        if (selection != null && selection.length > 0) return selection[0];
    } catch (e) {}
    try {
        if (scroll.selection != null && scroll.selection.length > 0) return scroll.selection[0];
    } catch (e2) {}
    return -1;
}

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

function setGuiText(gui, id, text) {
    try {
        var comp = gui.getComponent(id);
        if (comp != null && comp.setText != null) comp.setText(text == null ? "" : ("" + text));
    } catch (e) {}
}

function setStatus(gui, text) {
    setGuiText(gui, STATUS_ID, text);
}

function safeUpdate(gui) {
    try {
        gui.update();
    } catch (e) {}
}

function readStoredOr(npc, key, fallback) {
    var value = "" + npc.getStoreddata().get(key);
    return hasText(value) ? value : fallback;
}

function trimString(value) {
    return ("" + value).replace(/^\s+|\s+$/g, "");
}

function hasText(value) {
    return value != null && trimString(value).length > 0;
}

function getNpcUuid(npc) {
    try {
        return "" + npc.getUUID();
    } catch (e) {
        return "";
    }
}
