var Ticket_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var Ticket_CustomData = Java.type("net.minecraft.world.item.component.CustomData");

var TICKET_ITEM_TYPE = "pokemon_catch_ticket";
var TICKET_MAX_DAMAGE = 100;
var TICKET_DURABILITY_COLOR_LINKED = 5635925;
var CYCLE_RUNNING_KEY = "pokemon_multiplier_cycle_running";
var CYCLE_END_MS_KEY = "pokemon_multiplier_cycle_end_ms";
var CYCLE_STARTED_MS_KEY = "pokemon_multiplier_cycle_started_ms";
var LINKED_CONFIG_UUID_KEY = "pokemon_catch_linked_config_uuid";
var CONFIG_TIMER_KEY = "pokemon_multiplier_config_timer";

function tick(event) {
    var item = event.item;
    if (item == null || item.isEmpty()) return;
    if (!isTicketPaper(item)) return;

    var mcStack = item.getMCItemStack();
    if (mcStack == null || mcStack.isEmpty()) return;

    var tag = readOrCreateTag(mcStack);
    if (readTag(tag, "item_type") != TICKET_ITEM_TYPE) return;

    var mainNpc = resolveMainNpc(event, tag);
    var damage = computeTicketDamage(mainNpc);
    applyTicketDamage(item, mcStack, tag, damage);
}

function resolveMainNpc(event, tag) {
    var mainUuid = readTag(tag, "main_uuid");
    if (!hasText(mainUuid)) return null;

    try {
        if (event.player != null) return event.player.getWorld().getEntity(mainUuid);
    } catch (e1) {}

    try {
        if (event.entity != null) return event.entity.getWorld().getEntity(mainUuid);
    } catch (e2) {}

    try {
        var world = event.item.getWorld();
        if (world == null) return null;
        return world.getEntity(mainUuid);
    } catch (e3) {
        return null;
    }
}

function computeTicketDamage(mainNpc) {
    if (mainNpc == null) return 0;

    try {
        var data = mainNpc.getStoreddata();
        if (data == null) return 0;
        if (trimString(data.get(CYCLE_RUNNING_KEY)) != "1") return 0;

        var startMs = parseIntSafe(data.get(CYCLE_STARTED_MS_KEY), 0);
        var totalMs = resolveConfiguredTimerMs(mainNpc);
        if (startMs <= 0 || totalMs <= 0) return 0;

        var elapsedMs = new Date().getTime() - startMs;
        if (elapsedMs <= 0) return 0;

        var elapsedRatio = elapsedMs / totalMs;
        if (elapsedRatio < 0) elapsedRatio = 0;
        if (elapsedRatio > 1) elapsedRatio = 1;

        return Math.max(0, Math.min(TICKET_MAX_DAMAGE, Math.round(elapsedRatio * TICKET_MAX_DAMAGE)));
    } catch (e) {
        return 0;
    }
}

function resolveConfiguredTimerMs(mainNpc) {
    var sourceNpc = mainNpc;

    try {
        var configUuid = trimString(mainNpc.getStoreddata().get(LINKED_CONFIG_UUID_KEY));
        if (hasText(configUuid)) {
            var configNpc = mainNpc.getWorld().getEntity(configUuid);
            if (configNpc != null) sourceNpc = configNpc;
        }
    } catch (e1) {}

    try {
        return parseDurationToMs(trimString(sourceNpc.getStoreddata().get(CONFIG_TIMER_KEY)));
    } catch (e2) {
        return 0;
    }
}

function applyTicketDamage(item, mcStack, tag, damage) {
    var clamped = clampDamage(damage);

    try {
        if (item.setDurabilityShow != null) item.setDurabilityShow(true);
    } catch (e1) {}

    try {
        if (item.setDurabilityColor != null) item.setDurabilityColor(TICKET_DURABILITY_COLOR_LINKED);
    } catch (e2) {}

    try {
        if (item.setDurabilityValue != null) item.setDurabilityValue(computeDurabilityValue(clamped));
    } catch (e3) {}
}

function isTicketPaper(item) {
    try {
        var mcStack = item.getMCItemStack();
        if (mcStack == null || mcStack.isEmpty()) return false;
        var tag = readOrCreateTag(mcStack);
        return readTag(tag, "item_type") == TICKET_ITEM_TYPE;
    } catch (e) {
        return false;
    }
}

function readOrCreateTag(mcStack) {
    try {
        var customData = mcStack.get(Ticket_DataComponents.CUSTOM_DATA);
        if (customData != null) return customData.copyTag();
    } catch (e) {}
    return new (Java.type("net.minecraft.nbt.CompoundTag"))();
}

function readTag(tag, key) {
    try {
        return "" + tag.getString(key);
    } catch (e) {
        return "";
    }
}

function parseDurationToMs(value) {
    var text = trimString(value);
    var match = text.match(/^(\d{1,2}):(\d{2}):(\d{2})$/);
    if (match == null) return 0;

    var hours = parseIntSafe(match[1], -1);
    var minutes = parseIntSafe(match[2], -1);
    var seconds = parseIntSafe(match[3], -1);
    if (hours < 0 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) return 0;

    return ((hours * 60 * 60) + (minutes * 60) + seconds) * 1000;
}

function computeDurabilityValue(damage) {
    var clamped = clampDamage(damage);
    return clamped / TICKET_MAX_DAMAGE;
}

function clampDamage(damage) {
    var parsed = parseIntSafe(damage, 0);
    if (parsed < 0) parsed = 0;
    if (parsed > TICKET_MAX_DAMAGE) parsed = TICKET_MAX_DAMAGE;
    return parsed;
}

function parseIntSafe(value, def) {
    try {
        var parsed = parseInt("" + value, 10);
        return isNaN(parsed) ? def : parsed;
    } catch (e) {
        return def;
    }
}

function trimString(value) {
    return ("" + value).replace(/^\s+|\s+$/g, "");
}

function hasText(value) {
    return value != null && trimString(value).length > 0;
}
