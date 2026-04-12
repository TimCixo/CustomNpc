function init(event) {
    var npc = event.npc;
    var data = npc.getStoreddata();
    var shared = (1, eval)("" + data.get("__shared"))(event);
    shared.demo.ensureState(event.npc);
}
