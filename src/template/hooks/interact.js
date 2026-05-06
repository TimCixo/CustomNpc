// @ts-check

/** @typedef {import("noppes.npcs.api.event.NpcEvent").InteractEvent} NpcInteractEvent */

var SHARED_COMPILED_KEY = "__shared_compiled";

/**
 * @param {NpcInteractEvent} event
 * @returns {any}
 */
function requireShared(event) {
    var npc = event.npc;
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

/** @param {NpcInteractEvent} event */
function interact(event) {
    var shared = requireShared(event);
    shared.npc.onInteract(event);
}
