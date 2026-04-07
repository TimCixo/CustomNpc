var PM_NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var PM_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var PM_CustomData = Java.type("net.minecraft.world.item.component.CustomData");

var LINKER_TYPE = "npc_linker_bind_test";
var LOCAL_STATE_KEY = "linker_local_state";
var LOCAL_STAGE_KEY = "linker_local_stage";
var LOCAL_NOTE_KEY = "linker_local_note";

var GUI_ID = 9401;
var SCROLL_ID = 9402;
var STATE_FIELD_ID = 9403;
var STAGE_FIELD_ID = 9404;
var NOTE_FIELD_ID = 9405;
var STATUS_ID = 9406;
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
    gui.addLabel(1, "Coordinator", 10, 10, 180, 18, 0xFFFFFF);
    gui.addColoredLine(2, 10, 36, 280, 36, 0x8A6AA8, 1.5);
    gui.addLabel(10, "State", 10, 50, 80, 14, 0xE0E0E0);
    gui.addTextField(STATE_FIELD_ID, 10, 66, 100, 20);
    gui.addLabel(11, "Stage", 120, 50, 80, 14, 0xE0E0E0);
    gui.addTextField(STAGE_FIELD_ID, 120, 66, 100, 20);
    gui.addLabel(12, "Note", 10, 96, 80, 14, 0xE0E0E0);
    gui.addTextField(NOTE_FIELD_ID, 10, 112, 100, 20);
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

    tag.putString("coord_uuid", getNpcUuid(npc));
    if (!writeHeldTag(player, item, tag)) {
        player.message("Bind write failed.");
        return;
    }

    player.message("Coordinator linked.");
}

function saveLocalState(npc, gui) {
    npc.getStoreddata().put(LOCAL_STATE_KEY, getGuiText(gui, STATE_FIELD_ID));
    npc.getStoreddata().put(LOCAL_STAGE_KEY, getGuiText(gui, STAGE_FIELD_ID));
    npc.getStoreddata().put(LOCAL_NOTE_KEY, getGuiText(gui, NOTE_FIELD_ID));
}

function hydrateLocal(gui, npc) {
    setGuiText(gui, STATE_FIELD_ID, readStoredOr(npc, LOCAL_STATE_KEY, "idle"));
    setGuiText(gui, STAGE_FIELD_ID, readStoredOr(npc, LOCAL_STAGE_KEY, "alpha"));
    setGuiText(gui, NOTE_FIELD_ID, readStoredOr(npc, LOCAL_NOTE_KEY, "ok"));
}

function loadDefaults(gui) {
    setGuiText(gui, STATE_FIELD_ID, "idle");
    setGuiText(gui, STAGE_FIELD_ID, "alpha");
    setGuiText(gui, NOTE_FIELD_ID, "ok");
}

function buildSummary(gui) {
    return "S=" + getGuiText(gui, STATE_FIELD_ID)
        + " G=" + getGuiText(gui, STAGE_FIELD_ID)
        + " N=" + getGuiText(gui, NOTE_FIELD_ID);
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
