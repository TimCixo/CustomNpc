var SHARED_DEMO_COUNT_KEY = "shared_demo_count";
var SHARED_DEMO_LAST_PLAYER_KEY = "shared_demo_last_player";

function sharedDemoTrim(value) {
    return ("" + value).replace(/^\s+|\s+$/g, "");
}

function sharedDemoHasText(value) {
    return value != null && sharedDemoTrim(value).length > 0;
}

function sharedDemoParseInt(value, fallback) {
    var parsed = parseInt(sharedDemoTrim(value), 10);
    return isNaN(parsed) ? fallback : parsed;
}

function sharedDemoEnsureState(npc) {
    if (npc == null) return;

    var data = npc.getStoreddata();
    if (data == null) return;

    if (!sharedDemoHasText(data.get(SHARED_DEMO_COUNT_KEY))) {
        data.put(SHARED_DEMO_COUNT_KEY, "0");
    }

    if (!sharedDemoHasText(data.get(SHARED_DEMO_LAST_PLAYER_KEY))) {
        data.put(SHARED_DEMO_LAST_PLAYER_KEY, "");
    }
}

function sharedDemoIncrement(npc, playerName) {
    sharedDemoEnsureState(npc);

    var data = npc.getStoreddata();
    var nextCount = sharedDemoParseInt(data.get(SHARED_DEMO_COUNT_KEY), 0) + 1;

    data.put(SHARED_DEMO_COUNT_KEY, "" + nextCount);
    data.put(SHARED_DEMO_LAST_PLAYER_KEY, sharedDemoHasText(playerName) ? playerName : "");
    return nextCount;
}

function sharedDemoBuildStatus(npc) {
    sharedDemoEnsureState(npc);

    var data = npc.getStoreddata();
    var count = sharedDemoParseInt(data.get(SHARED_DEMO_COUNT_KEY), 0);
    var lastPlayer = sharedDemoTrim(data.get(SHARED_DEMO_LAST_PLAYER_KEY));

    if (!sharedDemoHasText(lastPlayer)) lastPlayer = "<none>";
    return "Shared demo count=" + count + ", last_player=" + lastPlayer;
}
