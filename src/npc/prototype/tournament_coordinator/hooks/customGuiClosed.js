// @ts-check

/** @typedef {import("noppes.npcs.api.event.CustomGuiEvent").CloseEvent} CustomGuiClosedEvent */

var SHARED_COMPILED_KEY = "__shared_compiled";
var GUI_NPC_KEY = "tournament_coordinator_gui_npc";

/**
 * @param {CustomGuiClosedEvent} event
 * @returns {any}
 */
function requireShared(event) {
    var npc = resolveNpc(event);
    var tempdata = npc.getTempdata();
    var factory = null;

    if (tempdata.has(SHARED_COMPILED_KEY)) {
        factory = tempdata.get(SHARED_COMPILED_KEY);
    } else {
        var data = npc.getStoreddata();
        var factorySource = "" + data.get("__shared");

        if (factorySource == null || factorySource == "" || factorySource == "null" || factorySource == "undefined") {
            throw "Shared coordinator `__shared` is missing in npc storeddata. Reapply the package with the loader item.";
        }

        factory = (1, eval)(factorySource);
        tempdata.put(SHARED_COMPILED_KEY, factory);
    }

    if (typeof factory != "function") {
        throw "Shared coordinator `__shared` is invalid. Reapply the package with the loader item.";
    }

    return factory(event);
}

/**
 * @param {any} event
 * @returns {any}
 */
function resolveNpc(event) {
    try {
        var npc = event.player.getTempdata().get(GUI_NPC_KEY);
        if (npc != null) return npc;
    } catch (e1) {}

    return event.npc;
}

/** @param {CustomGuiClosedEvent} event */
function customGuiClosed(event) {
    var shared = requireShared(event);
    shared.npc.onGuiClosed(event);
}
