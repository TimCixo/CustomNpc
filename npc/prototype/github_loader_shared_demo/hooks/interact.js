function interact(event) {
    var npc = event.npc;
    var player = event.player;
    var data = npc.getStoreddata();
    var shared = (1, eval)("" + data.get("__shared"))(event);
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
