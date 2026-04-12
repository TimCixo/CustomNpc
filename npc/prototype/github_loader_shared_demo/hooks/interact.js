function interact(event) {
    var npc = event.npc;
    var player = event.player;

    sharedDemoEnsureState(npc);

    var playerName = "";
    try {
        playerName = "" + player.getName();
    } catch (e) {}

    var count = sharedDemoIncrement(npc, playerName);
    player.message("Shared demo click=" + count);
    player.message(sharedDemoBuildStatus(npc));
}
