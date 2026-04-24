var BLACKSMITH_GUI_NPC_KEY = "blacksmith_gui_npc";

function resolveBlacksmithNpc(event) {
    try {
        var npc = event.player.getTempdata().get(BLACKSMITH_GUI_NPC_KEY);
        if (npc != null) return npc;
    } catch (e1) {}

    return event.npc;
}

function requireShared(event) {
    var npc = resolveBlacksmithNpc(event);
    var data = npc.getStoreddata();
    var factorySource = "" + data.get("__shared");
    var factory = null;

    if (factorySource == null || factorySource == "" || factorySource == "null" || factorySource == "undefined") {
        throw "Shared coordinator `__shared` is missing in npc storeddata. Reapply the package with the loader item.";
    }

    factory = (1, eval)(factorySource);
    if (typeof factory != "function") {
        throw "Shared coordinator `__shared` is invalid. Reapply the package with the loader item.";
    }

    return factory(event);
}

function customGuiScroll(event) {
    var shared = requireShared(event);
    shared.blacksmith.onGuiScroll(event);
}
