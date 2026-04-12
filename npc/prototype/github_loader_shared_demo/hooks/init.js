function init(event) {
    var shared = gitLoaderRequireShared(event, "__shared");
    shared.demo.ensureState(event.npc);
}
