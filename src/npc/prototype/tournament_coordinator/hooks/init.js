// @ts-check

/** @typedef {import("noppes.npcs.api.event.NpcEvent").InitEvent} NpcInitEvent */

var SHARED_COMPILED_KEY = "__shared_compiled";

var TOURNAMENT_COORDINATOR_CONFIG = {
    arena: {
        first: { x: 0, y: 80, z: 0 },
        second: { x: 10, y: 80, z: 0 }
    },
    balcony: {
        first: { x: 0, y: 90, z: 10 },
        second: { x: 10, y: 90, z: 10 }
    },
    stands: {
        common: { x: 5, y: 85, z: 25 }
    },
    messages: {
        winner: "§6Победитель: §e{player}§6!",
        duel: "§bДуэль: §e{first} §fvs §e{second}§b!"
    }
};

/**
 * @param {NpcInitEvent} event
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

/** @param {NpcInitEvent} event */
function init(event) {
    var shared = requireShared(event);
    var config = shared.config.get(event.npc);

    if (config == null) {
        shared.config.set(event.npc, TOURNAMENT_COORDINATOR_CONFIG);
    }

    shared.npc.init(event);
}
