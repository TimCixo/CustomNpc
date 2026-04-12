function init(event) {
    var demoShared = gitLoaderRequireShared(event, "demo_shared");
    demoShared.ensureState(event.npc);
}
