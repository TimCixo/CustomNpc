var Ticket_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var Ticket_CustomData = Java.type("net.minecraft.world.item.component.CustomData");
var Ticket_ItemLore = Java.type("net.minecraft.world.item.component.ItemLore");
var Ticket_Component = Java.type("net.minecraft.network.chat.Component");
var Ticket_CompoundTag = Java.type("net.minecraft.nbt.CompoundTag");
var Ticket_ArrayList = Java.type("java.util.ArrayList");

var TICKET_ITEM_TYPE = "pokemon_catch_ticket";
var TICKET_MAX_DAMAGE = 100;
var MAIN_ENTRY_COUNT_KEY = "pokemon_multiplier_cycle_entry_count";
var TICKET_DURABILITY_COLOR_LINKED = 5635925;
var CYCLE_RUNNING_KEY = "pokemon_multiplier_cycle_running";
var CYCLE_STARTED_MS_KEY = "pokemon_multiplier_cycle_started_ms";
var LINKED_CONFIG_UUID_KEY = "pokemon_catch_linked_config_uuid";
var CONFIG_TIMER_KEY = "pokemon_multiplier_config_timer";

function interact(event) {
    var item = event.item;
    var player = event.player;
    var target = event.target;

    if (item == null || item.isEmpty() || player == null || target == null) return;
    if (!isTicketPaper(item)) return;
    if (!isCoordinatorMainNpc(target)) return;

    var result = bindTicketToMain(item, target, player);
    if (hasText(result)) player.message(result);

    try {
        event.setCanceled(true);
    } catch (e) {}
}

function bindTicketToMain(item, mainNpc, player) {
    var mcStack = item.getMCItemStack();
    if (mcStack == null || mcStack.isEmpty()) return "Invalid ticket.";

    var tag = readOrCreateTag(mcStack);
    if (readTag(tag, "item_type") != TICKET_ITEM_TYPE) return "Invalid ticket.";

    var currentMainUuid = readTag(tag, "main_uuid");
    var targetMainUuid = getEntityUuid(mainNpc);
    if (hasText(currentMainUuid) && currentMainUuid != targetMainUuid) {
        return "This ticket is linked to another coordinator.";
    }

    tag.putString("item_type", TICKET_ITEM_TYPE);
    tag.putString("main_uuid", targetMainUuid);
    tag.putString("owner_uuid", getEntityUuid(player));
    tag.putString("owner_name", getPlayerName(player));

    applyTicketPresentation(item, mcStack, tag, computeTicketDamage(mainNpc));

    try {
        player.updatePlayerInventory();
    } catch (e) {}

    return "Ticket linked to this coordinator.";
}

function applyTicketPresentation(item, mcStack, tag, damage) {
    try {
        if (item.setCustomName != null) item.setCustomName("Event Ticket");
    } catch (e1) {}

    try {
        if (item.setTexture != null) item.setTexture(1, "minecraft:paper");
    } catch (e2) {}

    try {
        if (item.setMaxStackSize != null) item.setMaxStackSize(1);
    } catch (e3) {}

    try {
        if (item.setDurabilityShow != null) item.setDurabilityShow(true);
    } catch (e4) {}

    try {
        if (item.setDurabilityColor != null) item.setDurabilityColor(TICKET_DURABILITY_COLOR_LINKED);
    } catch (e5) {}

    try {
        if (item.setDurabilityValue != null) item.setDurabilityValue(computeDurabilityValue(damage));
    } catch (e6) {}

    mcStack.set(Ticket_DataComponents.CUSTOM_DATA, Ticket_CustomData.of(tag));
    mcStack.set(Ticket_DataComponents.MAX_STACK_SIZE, java.lang.Integer.valueOf(1));
    mcStack.set(Ticket_DataComponents.CUSTOM_NAME, Ticket_Component.literal("Event Ticket"));
    mcStack.set(Ticket_DataComponents.LORE, new Ticket_ItemLore(buildLore([
        "Entry ticket for the timed event.",
        "Right-click Main to bind it.",
        "Durability shows remaining time."
    ])));
}

function isCoordinatorMainNpc(target) {
    try {
        if (target.getType == null) return false;
    } catch (e1) {}

    try {
        var stored = target.getStoreddata();
        if (stored == null) return false;
        return hasText(stored.get(MAIN_ENTRY_COUNT_KEY));
    } catch (e2) {
        return false;
    }
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

function buildLore(lines) {
    var lore = new Ticket_ArrayList();
    for (var i = 0; i < lines.length; i++) {
        lore.add(Ticket_Component.literal(lines[i]));
    }
    return lore;
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

function readOrCreateTag(mcStack) {
    try {
        var customData = mcStack.get(Ticket_DataComponents.CUSTOM_DATA);
        if (customData != null) return customData.copyTag();
    } catch (e) {}
    return new Ticket_CompoundTag();
}

function readTag(tag, key) {
    try {
        return "" + tag.getString(key);
    } catch (e) {
        return "";
    }
}

function getPlayerName(player) {
    try {
        return "" + player.getName();
    } catch (e) {
        return "" + player.getDisplayName();
    }
}

function getEntityUuid(entity) {
    try {
        return "" + entity.getUUID();
    } catch (e) {
        return "";
    }
}

function parseIntSafe(value, def) {
    try {
        var parsed = parseInt("" + value, 10);
        return isNaN(parsed) ? def : parsed;
    } catch (e) {
        return def;
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

function trimString(value) {
    return ("" + value).replace(/^\s+|\s+$/g, "");
}

function hasText(value) {
    return value != null && trimString(value).length > 0;
}
