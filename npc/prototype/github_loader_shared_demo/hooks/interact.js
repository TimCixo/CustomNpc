function interact(event) {
    var npc = event.npc;
    var player = event.player;
    var shared = gitLoaderRequireShared(event, "__shared");
    var demoShared = shared.use(event, "demo_shared");

    demoShared.ensureState(npc);

    var playerName = "";
    try {
        playerName = "" + player.getName();
    } catch (e) {}

    var count = demoShared.increment(npc, playerName);
    player.message("Shared demo click=" + count);
    player.message(demoShared.buildStatus(npc));
}
