function init(event) {
    var shared = gitLoaderRequireShared(event, "__shared");
    var demoShared = shared.use(event, "demo_shared");
    demoShared.ensureState(event.npc);
}
