var ArceusBossDied_System = Java.type("java.lang.System");
var ARCEUS_CLOCK_MAIN_UUID_KEY = "respawn_clock_main_uuid";
var ARCEUS_CLOCK_RESPAWN_SECONDS_KEY = "respawn_clock_respawn_seconds";

function died(event) {
    var npc = event.npc;
    notifyClockDead(npc);
}

function notifyClockDead(npc) {
    var mainNpc = resolveClockMain(npc);
    if (mainNpc == null) return;

    var respawnSeconds = readRespawnDelaySeconds(npc);
    var deadUntilMs = ArceusBossDied_System.currentTimeMillis() + (respawnSeconds * 1000);
    var data = mainNpc.getStoreddata();

    data.put("respawn_clock_target_uuid", getNpcUuid(npc));
    data.put("respawn_clock_target_name", getNpcDisplayName(npc));
    data.put("respawn_clock_target_dead_until_ms", "" + deadUntilMs);
    data.put("respawn_clock_target_alive", "0");

    try {
        mainNpc.getDisplay().setTitle("§c" + formatDurationMs(respawnSeconds * 1000));
        mainNpc.updateClient();
    } catch (e) {}
}

function resolveClockMain(npc) {
    var mainUuid = trimString(npc.getStoreddata().get(ARCEUS_CLOCK_MAIN_UUID_KEY));
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

    return parseIntSafe(npc.getStoreddata().get(ARCEUS_CLOCK_RESPAWN_SECONDS_KEY), 300);
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
        if (npc.getDisplay && npc.getDisplay() && npc.getDisplay().getTitle) {
            var title = "" + npc.getDisplay().getTitle();
            if (hasText(title) && title != "null") return title;
        }
    } catch (e) {}

    try {
        var name = "" + npc.getName();
        if (hasText(name) && name != "null") return name;
    } catch (e2) {}

    return "Аркеус";
}

function formatDurationMs(ms) {
    var totalSeconds = Math.max(0, Math.floor(ms / 1000));
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;
    return pad2(hours) + ":" + pad2(minutes) + ":" + pad2(seconds);
}

function pad2(value) {
    return value < 10 ? "0" + value : "" + value;
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
