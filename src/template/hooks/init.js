// @ts-check

/** @typedef {import("noppes.npcs.api.event.NpcEvent").InitEvent} NpcInitEvent */

/** @param {NpcInitEvent} event */
function init(event) {
    var factory = eval(String(event.npc.storeddata.get("__shared")));
    var shared = factory(event);
    shared.core.ensureState(event.npc);
}
