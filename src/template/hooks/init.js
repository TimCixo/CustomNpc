// @ts-check

/** @typedef {import("noppes.npcs.api.event.NpcEvent").InitEvent} NpcInitEvent */

var SHARED_COMPILED_KEY = "__shared_compiled";

var TEMPLATE_CONFIG = {
    initialization: {
        timerId: 1,
        timerTicks: 40,
        timerRepeat: false
    },
    interact: {
        message: ""
    },
    death: {
        goodbyeText: ""
    }
};

var TEMPLATE_DIALOGS = {
    main: {
        id: 1,
        options: {
            hello: 1,
            bye: 2
        }
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
        shared.config.set(event.npc, TEMPLATE_CONFIG);
    }
    shared.dialogs.set(event.npc, TEMPLATE_DIALOGS);
    shared.npc.init(event);
}
