var Ticket_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var Ticket_CustomData = Java.type("net.minecraft.world.item.component.CustomData");
var Ticket_ItemLore = Java.type("net.minecraft.world.item.component.ItemLore");
var Ticket_Component = Java.type("net.minecraft.network.chat.Component");
var Ticket_ArrayList = Java.type("java.util.ArrayList");

var TICKET_ITEM_TYPE = "pokemon_catch_ticket";
var TICKET_MAX_DAMAGE = 100;
var TICKET_DURABILITY_COLOR_LINKED = 5635925;
var CYCLE_RUNNING_KEY = "pokemon_multiplier_cycle_running";
var CYCLE_END_MS_KEY = "pokemon_multiplier_cycle_end_ms";
var CYCLE_STARTED_MS_KEY = "pokemon_multiplier_cycle_started_ms";
var LINKED_CONFIG_UUID_KEY = "pokemon_catch_linked_config_uuid";
var CONFIG_TIMER_KEY = "pokemon_multiplier_config_timer";
var CONFIG_COUNT_KEY = "pokemon_multiplier_config_count";
var CONFIG_SPECIES_KEY_PREFIX = "pokemon_multiplier_config_species_";
var CONFIG_MULTIPLIER_KEY_PREFIX = "pokemon_multiplier_config_multiplier_";
var CYCLE_ENTRY_COUNT_KEY = "pokemon_multiplier_cycle_entry_count";
var CYCLE_PLAYER_PREFIX = "pokemon_multiplier_cycle_player_";
var CYCLE_SCORE_PREFIX = "pokemon_multiplier_cycle_score_";
var CYCLE_PCOUNT_PREFIX = "pokemon_multiplier_cycle_pcount_";

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
    applyTicketState(item, mcStack, tag, damage, mainNpc);
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

function applyTicketState(item, mcStack, tag, damage, mainNpc) {
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

    try {
        mcStack.set(Ticket_DataComponents.LORE, new Ticket_ItemLore(buildLore(buildTicketLore(mainNpc, tag))));
    } catch (e4) {}
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

function buildTicketLore(mainNpc, tag) {
    var stats = buildParticipantStats(mainNpc, tag);
    var lore = [
        "ПКМ: правила и статус события.",
        "Ваш результат: " + formatScore(stats.score) + " / " + stats.pcount,
        "Целевые покемоны и множитель очков:"
    ];

    var entries = buildCurrentConfigEntries(mainNpc);
    if (entries.length <= 0) {
        lore.push(" - список пока пуст");
        return lore;
    }

    for (var i = 0; i < entries.length; i++) {
        lore.push(" - " + normalizeConfiguredSpecies(entries[i].species) + " x" + entries[i].multiplier);
    }

    return lore;
}

function buildParticipantStats(mainNpc, tag) {
    if (mainNpc == null) {
        return {
            score: 0,
            pcount: 0
        };
    }

    var playerName = trimString(readTag(tag, "owner_name"));
    if (!hasText(playerName)) {
        return {
            score: 0,
            pcount: 0
        };
    }

    var data = mainNpc.getStoreddata();
    var count = parseIntSafe(data.get(CYCLE_ENTRY_COUNT_KEY), 0);
    for (var i = 0; i < count; i++) {
        if (trimString(data.get(CYCLE_PLAYER_PREFIX + i)) != playerName) continue;
        return {
            score: parseFloatSafe(data.get(CYCLE_SCORE_PREFIX + i), 0),
            pcount: parseIntSafe(data.get(CYCLE_PCOUNT_PREFIX + i), 0)
        };
    }

    return {
        score: 0,
        pcount: 0
    };
}

function buildCurrentConfigEntries(mainNpc) {
    if (mainNpc == null) return [];

    var sourceNpc = mainNpc;
    try {
        var configUuid = trimString(mainNpc.getStoreddata().get(LINKED_CONFIG_UUID_KEY));
        if (hasText(configUuid)) {
            var configNpc = mainNpc.getWorld().getEntity(configUuid);
            if (configNpc != null) sourceNpc = configNpc;
        }
    } catch (e1) {}

    var data = sourceNpc.getStoreddata();
    var count = parseIntSafe(data.get(CONFIG_COUNT_KEY), 0);
    var entries = [];

    for (var i = 0; i < count; i++) {
        var species = trimString(data.get(CONFIG_SPECIES_KEY_PREFIX + i));
        var multiplier = trimString(data.get(CONFIG_MULTIPLIER_KEY_PREFIX + i));
        if (!hasText(species) || !hasText(multiplier)) continue;

        entries.push({
            species: species,
            multiplier: multiplier
        });
    }

    return entries;
}

function buildLore(lines) {
    var lore = new Ticket_ArrayList();
    for (var i = 0; i < lines.length; i++) {
        lore.add(Ticket_Component.literal(lines[i]));
    }
    return lore;
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

function formatScore(value) {
    return normalizeMultiplier(parseFloatSafe(value, 0));
}

function normalizeMultiplier(value) {
    var text = ("" + value).replace(",", ".");
    if (text.indexOf(".") == -1) return text;
    text = text.replace(/0+$/, "");
    text = text.replace(/\.$/, "");
    return text;
}

function clampDamage(damage) {
    var parsed = parseIntSafe(damage, 0);
    if (parsed < 0) parsed = 0;
    if (parsed > TICKET_MAX_DAMAGE) parsed = TICKET_MAX_DAMAGE;
    return parsed;
}

function parseFloatSafe(value, def) {
    try {
        var parsed = parseFloat(("" + value).replace(",", "."));
        return isNaN(parsed) ? def : parsed;
    } catch (e) {
        return def;
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

function trimString(value) {
    return ("" + value).replace(/^\s+|\s+$/g, "");
}

function hasText(value) {
    return value != null && trimString(value).length > 0;
}

function normalizeConfiguredSpecies(value) {
    var species = trimString(value).toLowerCase();
    if (!hasText(species)) return "";

    var colonIndex = species.indexOf(":");
    if (colonIndex >= 0) {
        species = trimString(species.substring(colonIndex + 1));
    }

    return species;
}
