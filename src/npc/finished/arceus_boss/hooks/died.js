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
    if (lifecycle == null || lifecycle.deathCommitted !== true) {
        try {
            var runtime = npc.getTempdata().get(shared.runtime.ARCEUS_RUNTIME_KEY);
            if (runtime != null && runtime.state != null) {
                if (runtime.state.debug == null) runtime.state.debug = { lastErrorHook: "-", lastErrorMessage: "-", lastRewardError: "-", lastLeaderboardError: "-" };
                runtime.state.debug.lastErrorHook = "died_unexpected";
                runtime.state.debug.lastErrorMessage = "unexpected died hook";
                shared.lifecycle.persistRuntimeState(runtime);
            }
        } catch (e) {}
        return;
    }

    if (lifecycle.deathFinalLineSaid !== true) {
        lifecycle.deathFinalLineSaid = true;
        shared.visuals.safeSay(npc, "\u00A78\u0410\u0440\u043A\u0435\u0443\u0441 \u043F\u0430\u043B.");
        try {
            npc.getStoreddata().put(shared.lifecycle.ARCEUS_LIFECYCLE_KEY, JSON.stringify(lifecycle));
        } catch (persistError) {}
    }

    shared.clock.notifyClockDead(npc);

    try {
        npc.getTempdata().remove(shared.runtime.ARCEUS_RUNTIME_KEY);
    } catch (e) {}
}
