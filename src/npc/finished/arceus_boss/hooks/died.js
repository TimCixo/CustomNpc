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

function died(event) {
    var npc = event.npc;
    var shared = requireShared(event);
    var lifecycle = shared.utils.parseJsonSafe(npc.getStoreddata().get(shared.lifecycle.ARCEUS_LIFECYCLE_KEY));
    if (lifecycle == null || lifecycle.deathCommitted !== true) return;

    shared.clock.notifyClockDead(npc);

    try {
        npc.getTempdata().remove(shared.runtime.ARCEUS_RUNTIME_KEY);
    } catch (e) {}
}
