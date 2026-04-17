// @ts-check

/** @typedef {import("noppes.npcs.api.event.NpcEvent").InteractEvent} NpcInteractEvent */

/** @param {NpcInteractEvent} event */
function interact(event) {
    var factory = eval(String(event.npc.storeddata.get("__shared")));
    var shared = factory(event);
    var player = event.player;

    var count = shared.core.increment(event.npc, String(player.name || ""));
    player.message("Template click=" + count);
    player.message(shared.core.buildStatus(event.npc));
}
