// @ts-check

/** @typedef {import("noppes.npcs.api.event.NpcEvent").InitEvent} NpcInitEvent */

var TEMPLATE_CONFIG = {
    initialization: {
        timerId: 1,
        timerTicks: 40,
        timerRepeat: true,
        announceInit: true
    },
    interact: {
        message: "This template uses stored config and live tempdata state."
    },
    death: {
        goodbyeText: "Final state was printed, then tempdata state was disposed."
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
    var data = npc.getStoreddata();
    var factorySource = "" + data.get("__shared");
    var factory = null;

    if (factorySource == null || factorySource == "" || factorySource == "null" || factorySource == "undefined") {
        throw "Shared coordinator `__shared` is missing in npc storeddata. Reapply the package with the loader item.";
    }

    factory = (1, eval)(factorySource);
    if (typeof factory != "function") {
        throw "Shared coordinator `__shared` is invalid. Reapply the package with the loader item.";
    }

    return factory(event);
}

/** @param {NpcInitEvent} event */
function init(event) {
    var shared = requireShared(event);

    shared.config.set(event.npc, TEMPLATE_CONFIG);
    shared.dialogs.set(event.npc, TEMPLATE_DIALOGS);
    shared.state.reset(event.npc);
    shared.npc.init(event);
}
