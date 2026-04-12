function interact(event) {
    var npc = event.npc;
    var player = event.player;
    var demoShared = gitLoaderRequireShared(event, "demo_shared");

    demoShared.ensureState(npc);

    var playerName = "";
    try {
        playerName = "" + player.getName();
    } catch (e) {}

    var count = demoShared.increment(npc, playerName);
    player.message("Shared demo click=" + count);
    player.message(demoShared.buildStatus(npc));
}
