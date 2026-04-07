var PM_NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var PM_BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var PM_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var PM_CustomData = Java.type("net.minecraft.world.item.component.CustomData");
var PM_ItemContainerContents = Java.type("net.minecraft.world.item.component.ItemContainerContents");
var LINKER_TYPE = "pokemon_catch_linker";
var LOCAL_MAIN_UUID_KEY = "pokemon_catch_local_main_uuid";

var CONFIG_OWNER_KEY = "pokemon_multiplier_config_owner";
var CONFIG_COUNT_KEY = "pokemon_multiplier_config_count";
var CONFIG_SPECIES_KEY_PREFIX = "pokemon_multiplier_config_species_";
var CONFIG_MULTIPLIER_KEY_PREFIX = "pokemon_multiplier_config_multiplier_";
var CONFIG_TIMER_KEY = "pokemon_multiplier_config_timer";
var CONFIG_INTERVAL_KEY = "pokemon_multiplier_config_interval";
var CONFIG_CHAT_MODE_KEY = "pokemon_multiplier_config_chat_mode";
var CONFIG_DEBUG_KEY = "pokemon_multiplier_config_debug";
var CONFIG_WHITELIST_KEY = "pokemon_multiplier_config_whitelist";
var CONFIG_DEFAULT_MANAGER = "HunterTim";

var GUI_ID = 9201;
var ACTION_SCROLL_ID = 9202;
var TIMER_FIELD_ID = 9203;
var INTERVAL_FIELD_ID = 9204;
var CHAT_FIELD_ID = 9205;
var DEBUG_FIELD_ID = 9206;
var WHITELIST_FIELD_ID = 9207;
var ENTRIES_AREA_ID = 9208;
var STATUS_ID = 9209;
var ACTIONS = ["Save", "Default", "Summary"];

var ACTIVE_NPC = null;

function interact(event) {
    var npc = event.npc;
    var player = event.player;
    var item = player.getMainhandItem();

    ACTIVE_NPC = npc;

    if (isLinker(item)) {
        bindToLinker(npc, player, item);
        event.setCanceled(true);
        return;
    }

    if (!canManageConfig(npc, player)) {
        player.message("No access to config.");
        event.setCanceled(true);
        return;
    }

    if (isShulkerBoxItem(item)) {
        handleShulkerImport(event, npc, player, item);
        return;
    }

    try {
        player.showCustomGui(createGui(player, npc));
    } catch (e) {
        player.message("GUI error: " + e);
    }
    event.setCanceled(true);
}

function customGuiScroll(event) {
    try {
        var gui = event.gui;
        var scroll = event.scroll;
        var npc = event.npc != null ? event.npc : ACTIVE_NPC;
        if (gui == null || gui.getID() != GUI_ID) return;
        if (scroll == null || scroll.getID() != ACTION_SCROLL_ID) return;
        if (npc == null) return;
        if (!canManageConfig(npc, event.player)) return;

        var selected = getSelectedIndex(scroll);
        if (selected == 0) {
            applyConfigFromGui(npc, event.player, gui);
        } else if (selected == 1) {
            loadDefaults(gui);
            setStatus(gui, "Defaults loaded.");
        } else if (selected == 2) {
            setStatus(gui, buildSummary(gui));
        }

        safeUpdate(gui);
    } catch (e) {}
}

function createGui(player, npc) {
    var gui = PM_NpcAPI.Instance().createCustomGui(GUI_ID, 360, 260, false, player);
    gui.addLabel(1, "Configurator", 10, 10, 220, 18, 0xFFFFFF);
    gui.addColoredLine(2, 10, 40, 340, 40, 0x4A8F80, 1.5);

    gui.addLabel(10, "Timer", 10, 50, 80, 14, 0xE0E0E0);
    gui.addTextField(TIMER_FIELD_ID, 10, 66, 100, 20);

    gui.addLabel(11, "Interval", 120, 50, 80, 14, 0xE0E0E0);
    gui.addTextField(INTERVAL_FIELD_ID, 120, 66, 100, 20);

    gui.addLabel(12, "Chat", 10, 94, 80, 14, 0xE0E0E0);
    gui.addTextField(CHAT_FIELD_ID, 10, 110, 100, 20);

    gui.addLabel(13, "Debug", 120, 94, 80, 14, 0xE0E0E0);
    gui.addTextField(DEBUG_FIELD_ID, 120, 110, 100, 20);

    gui.addLabel(14, "Whitelist", 10, 138, 100, 14, 0xE0E0E0);
    gui.addTextField(WHITELIST_FIELD_ID, 10, 154, 210, 20);

    gui.addLabel(15, "Actions", 250, 50, 80, 14, 0xE0E0E0);
    gui.addScroll(ACTION_SCROLL_ID, 250, 66, 100, 70, ACTIONS);

    gui.addLabel(16, "Pokemon", 10, 184, 100, 14, 0xE0E0E0);
    gui.addTextArea(ENTRIES_AREA_ID, 10, 200, 340, 44);
    gui.addTextArea(STATUS_ID, 10, 246, 340, 12);

    hydrateGui(gui, npc);
    setStatus(gui, "Ready.");
    return gui;
}

function applyConfigFromGui(npc, player, gui) {
    var timer = trimString(getGuiText(gui, TIMER_FIELD_ID));
    var interval = trimString(getGuiText(gui, INTERVAL_FIELD_ID));
    var chatMode = normalizeChatMode(getGuiText(gui, CHAT_FIELD_ID));
    var debug = normalizeTrueFalse(getGuiText(gui, DEBUG_FIELD_ID));
    var whitelist = normalizeWhitelistText(getGuiText(gui, WHITELIST_FIELD_ID));
    var entries = parsePokemonEntries(getGuiText(gui, ENTRIES_AREA_ID));

    if (parseDurationToMs(timer) <= 0) {
        setStatus(gui, "Timer must be HH:MM:SS.");
        return false;
    }

    if (parseDurationToMs(interval) <= 0) {
        setStatus(gui, "Interval must be HH:MM:SS.");
        return false;
    }

    writeEntriesToStored(npc, entries);
    var data = npc.getStoreddata();
    data.put(CONFIG_TIMER_KEY, timer);
    data.put(CONFIG_INTERVAL_KEY, interval);
    data.put(CONFIG_CHAT_MODE_KEY, chatMode);
    data.put(CONFIG_DEBUG_KEY, debug);
    data.put(CONFIG_WHITELIST_KEY, whitelist);
    data.put(CONFIG_OWNER_KEY, getPlayerName(player));

    setGuiText(gui, CHAT_FIELD_ID, chatMode);
    setGuiText(gui, DEBUG_FIELD_ID, debug);
    setGuiText(gui, WHITELIST_FIELD_ID, whitelist);
    setGuiText(gui, ENTRIES_AREA_ID, buildEntriesText(entries));
    setStatus(gui, "Saved. Entries: " + entries.length + ".");
    return true;
}

function hydrateGui(gui, npc) {
    var mainNpc = resolveMainNpc(npc);
    setGuiText(gui, TIMER_FIELD_ID, readStoredOrFallback(npc, mainNpc, CONFIG_TIMER_KEY, "00:00:00"));
    setGuiText(gui, INTERVAL_FIELD_ID, readStoredOrFallback(npc, mainNpc, CONFIG_INTERVAL_KEY, "00:00:00"));
    setGuiText(gui, CHAT_FIELD_ID, readStoredOrFallback(npc, mainNpc, CONFIG_CHAT_MODE_KEY, "local"));
    setGuiText(gui, DEBUG_FIELD_ID, readStoredOrFallback(npc, mainNpc, CONFIG_DEBUG_KEY, "false"));
    setGuiText(gui, WHITELIST_FIELD_ID, normalizeWhitelistText(readStoredOrFallback(npc, mainNpc, CONFIG_WHITELIST_KEY, CONFIG_DEFAULT_MANAGER)));
    setGuiText(gui, ENTRIES_AREA_ID, buildEntriesText(buildCurrentEntries(npc, mainNpc)));
}

function loadDefaults(gui) {
    setGuiText(gui, TIMER_FIELD_ID, "00:00:00");
    setGuiText(gui, INTERVAL_FIELD_ID, "00:00:00");
    setGuiText(gui, CHAT_FIELD_ID, "local");
    setGuiText(gui, DEBUG_FIELD_ID, "false");
    setGuiText(gui, WHITELIST_FIELD_ID, CONFIG_DEFAULT_MANAGER);
    setGuiText(gui, ENTRIES_AREA_ID, "");
}

function buildSummary(gui) {
    var entries = parsePokemonEntries(getGuiText(gui, ENTRIES_AREA_ID));
    return "T=" + trimString(getGuiText(gui, TIMER_FIELD_ID))
        + " I=" + trimString(getGuiText(gui, INTERVAL_FIELD_ID))
        + " C=" + normalizeChatMode(getGuiText(gui, CHAT_FIELD_ID))
        + " D=" + normalizeTrueFalse(getGuiText(gui, DEBUG_FIELD_ID))
        + " W=" + normalizeWhitelistText(getGuiText(gui, WHITELIST_FIELD_ID))
        + " E=" + entries.length;
}

function bindToLinker(npc, player, item) {
    var tag = getCustomTag(item);
    if (tag == null || readTag(tag, "linker_type") != LINKER_TYPE || !hasText(readTag(tag, "main_uuid"))) {
        player.message("Invalid linker.");
        return;
    }

    tag.putString("config_uuid", getNpcUuid(npc));
    npc.getStoreddata().put(LOCAL_MAIN_UUID_KEY, readTag(tag, "main_uuid"));
    if (!writeHeldTag(player, item, tag)) {
        player.message("Bind write failed.");
        return;
    }

    player.message("Configurator linked.");
}

function handleShulkerImport(event, npc, player, item) {
    var importResult = importPokemonFromShulker(npc, player, item);
    player.message(importResult.message);
    event.setCanceled(true);
}

function canManageConfig(npc, player) {
    var names = normalizeWhitelistText(readStoredOrFallback(npc, resolveMainNpc(npc), CONFIG_WHITELIST_KEY, CONFIG_DEFAULT_MANAGER)).split(/\s+/);
    var playerName = getPlayerName(player);

    for (var i = 0; i < names.length; i++) {
        if (names[i] == playerName) return true;
    }

    return false;
}

function buildCurrentEntries(npc, fallbackNpc) {
    var entries = readEntriesFromNpc(npc);
    if (entries.length > 0) return entries;
    return fallbackNpc == null ? [] : readEntriesFromNpc(fallbackNpc);
}

function importPokemonFromShulker(npc, player, item) {
    var entries = buildCurrentEntries(npc, resolveMainNpc(npc));
    var seen = {};
    var added = 0;
    var foundPokemon = 0;

    for (var i = 0; i < entries.length; i++) {
        seen[normalizeConfiguredSpecies(entries[i].species)] = true;
    }

    var shulkerItems = getShulkerContainedStacks(item);
    for (var j = 0; j < shulkerItems.length; j++) {
        var species = extractPokemonSpeciesFromItem(shulkerItems[j]);
        if (!hasText(species)) continue;

        foundPokemon++;
        if (seen[species]) continue;

        seen[species] = true;
        entries.push({
            species: species,
            multiplier: "1"
        });
        added++;
    }

    if (added > 0) {
        writeEntriesToStored(npc, entries);
        npc.getStoreddata().put(CONFIG_OWNER_KEY, getPlayerName(player));
    }

    if (foundPokemon <= 0) {
        return {
            added: 0,
            found: 0,
            message: "No Pokemon found in shulker."
        };
    }

    return {
        added: added,
        found: foundPokemon,
        message: "Imported " + added + " new Pokemon from shulker. Found: " + foundPokemon + "."
    };
}

function getShulkerContainedStacks(item) {
    var out = [];
    if (item == null || item.isEmpty()) return out;

    try {
        var mcStack = item.getMCItemStack();
        var container = mcStack.get(PM_DataComponents.CONTAINER);
        if (container == null || container == PM_ItemContainerContents.EMPTY) return out;

        try {
            var iterable = container.nonEmptyItemsCopy();
            var iterator = iterable.iterator();
            while (iterator.hasNext()) {
                var inner = iterator.next();
                if (inner != null && !inner.isEmpty()) out.push(inner);
            }
            return out;
        } catch (e1) {}

        try {
            var iterable2 = container.nonEmptyItems();
            var iterator2 = iterable2.iterator();
            while (iterator2.hasNext()) {
                var inner2 = iterator2.next();
                if (inner2 != null && !inner2.isEmpty()) out.push(inner2.copy());
            }
            return out;
        } catch (e2) {}

        try {
            var slots = container.asSlots();
            var iterator3 = slots.iterator();
            while (iterator3.hasNext()) {
                var slot = iterator3.next();
                if (slot == null) continue;
                var inner3 = slot.item();
                if (inner3 != null && !inner3.isEmpty()) out.push(inner3);
            }
        } catch (e3) {}
    } catch (e) {}

    return out;
}

function extractPokemonSpeciesFromItem(mcStack) {
    if (mcStack == null || mcStack.isEmpty()) return "";

    try {
        var itemId = String(PM_BuiltInRegistries.ITEM.getKey(mcStack.getItem()));
        if (itemId != "cubixcobblemon:pokemon") return "";

        var component = mcStack.get(Java.type("net.im51111n355.cubixcobblemon.common.CubixCobblemonDataComponents").INSTANCE.getPOKEMON().get());
        if (component == null) return "";

        var optionalPokemon = component.getPokemon();
        if (optionalPokemon == null || !optionalPokemon.isPresent()) return "";
        return normalizeConfiguredSpecies(optionalPokemon.get().getSpecies().getResourceIdentifier());
    } catch (e) {
        return "";
    }
}

function readEntriesFromNpc(npc) {
    if (npc == null) return [];

    var data = npc.getStoreddata();
    var count = parseIntSafe(data.get(CONFIG_COUNT_KEY), 0);
    var entries = [];

    for (var i = 0; i < count; i++) {
        var species = trimString(data.get(CONFIG_SPECIES_KEY_PREFIX + i));
        var multiplier = trimString(data.get(CONFIG_MULTIPLIER_KEY_PREFIX + i));
        if (!hasText(species) || !hasText(multiplier)) continue;
        entries.push({
            species: species,
            multiplier: normalizeMultiplier(multiplier)
        });
    }

    return entries;
}

function writeEntriesToStored(npc, entries) {
    var data = npc.getStoreddata();
    var oldCount = parseIntSafe(data.get(CONFIG_COUNT_KEY), 0);

    for (var i = 0; i < oldCount; i++) {
        data.remove(CONFIG_SPECIES_KEY_PREFIX + i);
        data.remove(CONFIG_MULTIPLIER_KEY_PREFIX + i);
    }

    for (var j = 0; j < entries.length; j++) {
        data.put(CONFIG_SPECIES_KEY_PREFIX + j, entries[j].species);
        data.put(CONFIG_MULTIPLIER_KEY_PREFIX + j, entries[j].multiplier);
    }

    data.put(CONFIG_COUNT_KEY, "" + entries.length);
}

function buildEntriesText(entries) {
    var lines = [];
    for (var i = 0; i < entries.length; i++) {
        lines.push(entries[i].species + ": " + entries[i].multiplier);
    }
    return lines.join("\n");
}

function parsePokemonEntries(text) {
    var lines = ("" + text).split(/\r?\n/);
    var entries = [];
    var seen = {};

    for (var i = 0; i < lines.length; i++) {
        var line = trimString(lines[i]);
        if (!hasText(line)) continue;

        var match = line.match(/^([a-z0-9_\-.:]+)\s*(?:=|:|x|\*)\s*(\d+(?:[.,]\d+)?)$/i);
        if (match == null) continue;

        var species = normalizeConfiguredSpecies(match[1]);
        var multiplier = parseFloatSafe(match[2], 0);
        if (!hasText(species) || multiplier <= 0) continue;
        if (seen[species]) continue;

        seen[species] = true;
        entries.push({
            species: species,
            multiplier: normalizeMultiplier(multiplier)
        });
    }

    return entries;
}

function resolveMainNpc(npc) {
    var mainUuid = trimString(npc.getStoreddata().get(LOCAL_MAIN_UUID_KEY));
    if (!hasText(mainUuid)) return null;

    try {
        return npc.getWorld().getEntity(mainUuid);
    } catch (e) {
        return null;
    }
}

function readStoredOrFallback(npc, fallbackNpc, key, def) {
    var ownValue = trimString(npc.getStoreddata().get(key));
    if (hasText(ownValue) && ownValue != "null" && ownValue != "undefined") return ownValue;

    if (fallbackNpc != null) {
        var fallbackValue = trimString(fallbackNpc.getStoreddata().get(key));
        if (hasText(fallbackValue) && fallbackValue != "null" && fallbackValue != "undefined") return fallbackValue;
    }

    return def;
}

function isLinker(item) {
    var tag = getCustomTag(item);
    return tag != null && readTag(tag, "linker_type") == LINKER_TYPE;
}

function isShulkerBoxItem(item) {
    if (item == null || item.isEmpty()) return false;

    try {
        var itemId = String(PM_BuiltInRegistries.ITEM.getKey(item.getMCItemStack().getItem()));
        return /(^minecraft:|:)\w*shulker_box$/.test(itemId);
    } catch (e) {
        return false;
    }
}

function getCustomTag(item) {
    if (item == null || item.isEmpty()) return null;
    try {
        var customData = item.getMCItemStack().get(PM_DataComponents.CUSTOM_DATA);
        if (customData == null) return null;
        return customData.copyTag();
    } catch (e) {
        return null;
    }
}

function writeHeldTag(player, item, tag) {
    try {
        item.getMCItemStack().set(PM_DataComponents.CUSTOM_DATA, PM_CustomData.of(tag));
        player.updatePlayerInventory();
        return true;
    } catch (e) {
        return false;
    }
}

function readTag(tag, key) {
    try {
        return "" + tag.getString(key);
    } catch (e) {
        return "";
    }
}

function getSelectedIndex(scroll) {
    try {
        var selection = scroll.getSelection();
        if (selection != null && selection.length > 0) return selection[0];
    } catch (e) {}
    try {
        if (scroll.selection != null && scroll.selection.length > 0) return scroll.selection[0];
    } catch (e2) {}
    return -1;
}

function getGuiText(gui, id) {
    try {
        var comp = gui.getComponent(id);
        if (comp != null && comp.getText != null) return "" + comp.getText();
    } catch (e1) {}
    try {
        var comp2 = gui.getComponent(id);
        if (comp2 != null && comp2.text != null) return "" + comp2.text;
    } catch (e2) {}
    return "";
}

function setGuiText(gui, id, text) {
    try {
        var comp = gui.getComponent(id);
        if (comp != null && comp.setText != null) comp.setText(text == null ? "" : ("" + text));
    } catch (e) {}
}

function setStatus(gui, text) {
    setGuiText(gui, STATUS_ID, text);
}

function safeUpdate(gui) {
    try {
        gui.update();
    } catch (e) {}
}

function normalizeChatMode(value) {
    return trimString(value).toLowerCase() == "local" ? "local" : "global";
}

function normalizeTrueFalse(value) {
    var lower = trimString(value).toLowerCase();
    return (lower == "true" || lower == "yes" || lower == "1") ? "true" : "false";
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

function normalizeWhitelistText(text) {
    var split = trimString(text).split(/\s+/);
    var out = [];
    var seen = {};

    for (var i = 0; i < split.length; i++) {
        var name = trimString(split[i]);
        if (!hasText(name)) continue;
        if (seen[name]) continue;
        seen[name] = true;
        out.push(name);
    }

    if (out.length == 0) out.push(CONFIG_DEFAULT_MANAGER);
    return out.join(" ");
}

function normalizeConfiguredSpecies(value) {
    var species = trimString(value).toLowerCase();
    if (!hasText(species)) return "";
    var colonIndex = species.indexOf(":");
    if (colonIndex >= 0) species = trimString(species.substring(colonIndex + 1));
    return species;
}

function normalizeMultiplier(value) {
    var text = ("" + value).replace(",", ".");
    if (text.indexOf(".") == -1) return text;
    text = text.replace(/0+$/, "");
    text = text.replace(/\.$/, "");
    return text;
}

function parseIntSafe(value, def) {
    try {
        var parsed = parseInt("" + value, 10);
        return isNaN(parsed) ? def : parsed;
    } catch (e) {
        return def;
    }
}

function parseFloatSafe(value, def) {
    try {
        var parsed = parseFloat(("" + value).replace(",", "."));
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

function getPlayerName(player) {
    try {
        return "" + player.getName();
    } catch (e) {
        return "" + player.getDisplayName();
    }
}

function getNpcUuid(npc) {
    try {
        return "" + npc.getUUID();
    } catch (e) {
        return "";
    }
}
