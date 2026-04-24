var utils = require("utils.js");
var visuals = require("visuals.js");
var ArceusClock_System = Java.type("java.lang.System");

var ARCEUS_CLOCK_MAIN_UUID_KEY = "respawn_clock_main_uuid";
var ARCEUS_CLOCK_RESPAWN_SECONDS_KEY = "respawn_clock_respawn_seconds";

function resolveClockMain(npc) {
    var mainUuid = utils.trimString(npc.getStoreddata().get(ARCEUS_CLOCK_MAIN_UUID_KEY));
    if (!utils.hasText(mainUuid)) return null;
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
    return utils.parseIntSafe(npc.getStoreddata().get(ARCEUS_CLOCK_RESPAWN_SECONDS_KEY), 300);
}

function notifyClockAlive(npc) {
    var mainNpc = resolveClockMain(npc);
    if (mainNpc == null) return;
    var data = mainNpc.getStoreddata();
    data.put("respawn_clock_target_uuid", visuals.getNpcUuid(npc));
    data.put("respawn_clock_target_name", visuals.getNpcDisplayName(npc));
    data.put("respawn_clock_target_dead_until_ms", "0");
    data.put("respawn_clock_target_alive", "1");
    try {
        mainNpc.getDisplay().setTitle("§aREADY");
        mainNpc.updateClient();
    } catch (e) {}
}

function notifyClockDead(npc) {
    var mainNpc = resolveClockMain(npc);
    if (mainNpc == null) return;

    var respawnSeconds = readRespawnDelaySeconds(npc);
    var deadUntilMs = ArceusClock_System.currentTimeMillis() + (respawnSeconds * 1000);
    var data = mainNpc.getStoreddata();

    data.put("respawn_clock_target_uuid", visuals.getNpcUuid(npc));
    data.put("respawn_clock_target_name", visuals.getNpcDisplayName(npc));
    data.put("respawn_clock_target_dead_until_ms", "" + deadUntilMs);
    data.put("respawn_clock_target_alive", "0");

    try {
        mainNpc.getDisplay().setTitle("§c" + formatDurationMs(respawnSeconds * 1000));
        mainNpc.updateClient();
    } catch (e) {}
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

module.exports = {
    ARCEUS_CLOCK_MAIN_UUID_KEY: ARCEUS_CLOCK_MAIN_UUID_KEY,
    ARCEUS_CLOCK_RESPAWN_SECONDS_KEY: ARCEUS_CLOCK_RESPAWN_SECONDS_KEY,
    notifyClockAlive: notifyClockAlive,
    notifyClockDead: notifyClockDead,
    resolveClockMain: resolveClockMain,
    readRespawnDelaySeconds: readRespawnDelaySeconds,
    formatDurationMs: formatDurationMs
};
