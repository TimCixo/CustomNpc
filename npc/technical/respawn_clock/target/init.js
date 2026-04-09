var RCT_MAIN_UUID_KEY = "respawn_clock_main_uuid";
var RCT_RESPAWN_SECONDS_KEY = "respawn_clock_respawn_seconds";
var RCT_BOUND_NAME_KEY = "respawn_clock_target_name";

function init(event) {
    var npc = event.npc;
    var data = npc.getStoreddata();

    putDefault(data, RCT_MAIN_UUID_KEY, "");
    putDefault(data, RCT_RESPAWN_SECONDS_KEY, "" + readRespawnDelaySeconds(npc));
    putDefault(data, RCT_BOUND_NAME_KEY, getNpcDisplayName(npc));

    notifyClockAlive(npc);
}

function notifyClockAlive(npc) {
    var mainNpc = resolveClockMain(npc);
    if (mainNpc == null) return;

    var data = mainNpc.getStoreddata();
    data.put("respawn_clock_target_uuid", getNpcUuid(npc));
    data.put("respawn_clock_target_name", getNpcDisplayName(npc));
    data.put("respawn_clock_target_dead_until_ms", "0");
    data.put("respawn_clock_target_alive", "1");

    try {
        mainNpc.getDisplay().setTitle("§aЖив");
        mainNpc.updateClient();
    } catch (e) {}
}

function resolveClockMain(npc) {
    var mainUuid = trimString(npc.getStoreddata().get(RCT_MAIN_UUID_KEY));
    if (!hasText(mainUuid)) return null;

    try {
        return npc.getWorld().getEntity(mainUuid);
    } catch (e) {
        return null;
    }
}

function readRespawnDelaySeconds(npc) {
    try {
        var stats = npc.getStats();
        if (stats != null && stats.getRespawnTime) {
            var value = parseInt("" + stats.getRespawnTime(), 10);
            if (!isNaN(value) && value > 0) return value;
        }
    } catch (e) {}

    return parseIntSafe(npc.getStoreddata().get(RCT_RESPAWN_SECONDS_KEY), 300);
}

function putDefault(data, key, value) {
    if (!data.has(key)) data.put(key, value);
}

function getNpcUuid(npc) {
    try {
        return "" + npc.getUUID();
    } catch (e) {
        return "";
    }
}

function getNpcDisplayName(npc) {
    try {
        if (npc.getDisplay() != null && npc.getDisplay().getTitle) {
            var title = "" + npc.getDisplay().getTitle();
            if (hasText(title) && title != "null") return title;
        }
    } catch (e) {}

    try {
        var name = "" + npc.getName();
        if (hasText(name) && name != "null") return name;
    } catch (e2) {}

    return "NPC";
}

function parseIntSafe(value, def) {
    try {
        var parsed = parseInt("" + value, 10);
        return isNaN(parsed) ? def : parsed;
    } catch (e) {
        return def;
    }
}

function hasText(value) {
    return value != null && trimString(value).length > 0;
}

function trimString(value) {
    return ("" + value).replace(/^\s+|\s+$/g, "");
}
