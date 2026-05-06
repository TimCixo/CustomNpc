// @ts-check

var SHARED_COMPILED_KEY = "__shared_compiled";

/**
 * @param {any} event
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

/**
 * Supports both the plain dialog hook and option-style dialog events.
 * @param {any} event
 */
function dialog(event) {
    var shared = requireShared(event);
    shared.npc.onDialog(event);
}

/**
 * Optional compatibility entrypoint when the environment uses dialogOption.
 * @param {any} event
 */
function dialogOption(event) {
    var shared = requireShared(event);
    shared.npc.onDialog(event);
}
