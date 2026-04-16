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

function interact(event) {
    var npc = event.npc;
    var player = event.player;
    var shared = requireShared(event);
    var demoShared = shared.demo;

    demoShared.ensureState(npc);

    var playerName = "";
    try {
        playerName = "" + player.getName();
    } catch (e) {}

    var count = demoShared.increment(npc, playerName);
    player.message("Shared demo click=" + count);
    player.message(demoShared.buildStatus(npc));
}
