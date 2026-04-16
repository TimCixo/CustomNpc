var RC_TIMER_ID = 1;
var RC_BASE_TITLE_KEY = "respawn_clock_base_title";
var RC_LINKED_TARGET_UUID_KEY = "respawn_clock_target_uuid";
var RC_LINKED_TARGET_NAME_KEY = "respawn_clock_target_name";
var RC_TARGET_DEAD_UNTIL_MS_KEY = "respawn_clock_target_dead_until_ms";
var RC_TARGET_ALIVE_KEY = "respawn_clock_target_alive";

function init(event) {
    var npc = event.npc;
    var data = npc.getStoreddata();

    putDefault(data, RC_LINKED_TARGET_UUID_KEY, "");
    putDefault(data, RC_LINKED_TARGET_NAME_KEY, "");
    putDefault(data, RC_TARGET_DEAD_UNTIL_MS_KEY, "0");
    putDefault(data, RC_TARGET_ALIVE_KEY, "0");

    captureBaseTitle(npc);
    updateClockDisplay(npc);

    try {
        npc.timers.forceStart(RC_TIMER_ID, 20, true);
    } catch (e) {}
}

function putDefault(data, key, value) {
    if (!data.has(key)) {
        data.put(key, value);
    }
}

function captureBaseTitle(npc) {
    var data = npc.getStoreddata();
    if (hasText(data.get(RC_BASE_TITLE_KEY))) return;

    var title = "";
    try {
        title = "" + npc.getDisplay().getTitle();
    } catch (e) {}

    if (!hasText(title)) title = "Часы";
    data.put(RC_BASE_TITLE_KEY, title);
}

function updateClockDisplay(npc) {
    var text = buildClockDisplayText(npc);
    try {
        npc.getDisplay().setTitle(text);
        npc.updateClient();
    } catch (e) {}
}

function buildClockDisplayText(npc) {
    var data = npc.getStoreddata();
    var targetUuid = trimString(data.get(RC_LINKED_TARGET_UUID_KEY));
    if (!hasText(targetUuid)) return "§7Не привязан";

    var deadUntilMs = parseLongSafe(data.get(RC_TARGET_DEAD_UNTIL_MS_KEY), 0);
    var alive = trimString(data.get(RC_TARGET_ALIVE_KEY)) == "1";
    var now = getNowMs();

    if (!alive || deadUntilMs > now) {
        return "§c" + formatDurationMs(deadUntilMs - now);
    }

    return "§aЖив";
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

function getNowMs() {
    return new Date().getTime();
}

function parseLongSafe(value, def) {
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
