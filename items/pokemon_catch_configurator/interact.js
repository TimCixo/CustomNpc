var PM_NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var PM_BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var PM_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var PM_CustomData = Java.type("net.minecraft.world.item.component.CustomData");
var PM_ItemContainerContents = Java.type("net.minecraft.world.item.component.ItemContainerContents");

var CONFIG_ITEM_TYPE = "pokemon_catch_configurator_tool";
var TICKET_ITEM_TYPE = "pokemon_catch_ticket";
var TICKET_TEMPLATE_TEMP_KEY = "pokemon_catch_ticket_template_stack";
var ACTIVE_MAIN_TEMP_KEY = "pokemon_catch_configurator_active_main_uuid";

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
var DISPLAY_BASE_TITLE_KEY = "pokemon_multiplier_display_base_title";

var GUI_ID = 9201;
var ACTION_SCROLL_ID = 9202;
var TIMER_FIELD_ID = 9203;
var INTERVAL_FIELD_ID = 9204;
var CHAT_FIELD_ID = 9205;
var DEBUG_FIELD_ID = 9206;
var WHITELIST_FIELD_ID = 9207;
var ENTRIES_AREA_ID = 9208;
var STATUS_ID = 9209;
var ACTIONS = ["Save", "Default", "Summary", "Ticket", "Import"];

function interact(event) {
    var item = event.item;
    var player = event.player;
    var target = event.target;

    if (tryBindToMain(item, player, target)) {
        event.setCanceled(true);
        return;
    }

    var mainNpc = resolveMainNpc(item, player, target);
    if (mainNpc == null) {
        player.message("Configurator is not linked. Right click Main NPC first.");
        event.setCanceled(true);
        return;
    }

    rememberActiveMain(player, mainNpc);

    if (!canManageConfig(mainNpc, player)) {
        player.message("No access to config.");
        event.setCanceled(true);
        return;
    }

    try {
        player.showCustomGui(createGui(player, mainNpc));
    } catch (e) {
        player.message("GUI error: " + e);
    }
    event.setCanceled(true);
}

function customGuiScroll(event) {
    try {
        var gui = event.gui;
        var scroll = event.scroll;
        var player = event.player;
        if (gui == null || gui.getID() != GUI_ID) return;
        if (scroll == null || scroll.getID() != ACTION_SCROLL_ID) return;

        var mainNpc = resolveActiveMain(player);
        if (mainNpc == null) {
            setStatus(gui, "Main NPC is missing.");
            safeUpdate(gui);
            return;
        }

        if (!canManageConfig(mainNpc, player)) return;

        var selected = getSelectedIndex(scroll);
        if (selected == 0) {
            applyConfigFromGui(mainNpc, player, gui);
        } else if (selected == 1) {
            loadDefaults(gui);
            setStatus(gui, "Defaults loaded.");
        } else if (selected == 2) {
            setStatus(gui, buildSummary(gui));
        } else if (selected == 3) {
            if (captureTicketTemplateFromOffhand(mainNpc, player)) {
                setStatus(gui, "Ticket template loaded from offhand.");
            } else {
                setStatus(gui, "Put template ticket in offhand.");
            }
        } else if (selected == 4) {
            var importResult = importPokemonFromOffhandShulker(mainNpc, player);
            setStatus(gui, importResult.message);
        }

        safeUpdate(gui);
    } catch (e) {}
}

function createGui(player, mainNpc) {
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
    gui.addScroll(ACTION_SCROLL_ID, 250, 66, 100, 86, ACTIONS);

    gui.addLabel(16, "Pokemon", 10, 184, 100, 14, 0xE0E0E0);
    gui.addTextArea(ENTRIES_AREA_ID, 10, 200, 340, 44);
    gui.addTextArea(STATUS_ID, 10, 246, 340, 12);

    hydrateGui(gui, mainNpc);
    setStatus(gui, "Ready.");
    return gui;
}

function tryBindToMain(item, player, target) {
    if (!isBindableNpcTarget(target)) return false;

    var tag = getCustomTag(item);
    if (tag == null || readTag(tag, "item_type") != CONFIG_ITEM_TYPE) return false;

    tag.putString("main_uuid", getNpcUuid(target));
    if (!writeHeldTag(player, item, tag)) {
        player.message("Bind write failed.");
        return true;
    }

    rememberActiveMain(player, target);
    player.message("Configurator linked.");
    return true;
}

function resolveMainNpc(item, player, target) {
    var tag = getCustomTag(item);
    if (tag == null) return isBindableNpcTarget(target) ? target : null;

    var mainUuid = readTag(tag, "main_uuid");
    if (!hasText(mainUuid)) return isBindableNpcTarget(target) ? target : null;

    try {
        if (player != null) {
            var fromPlayerWorld = player.getWorld().getEntity(mainUuid);
            if (fromPlayerWorld != null) return fromPlayerWorld;
        }
    } catch (e1) {}

    try {
        if (target != null) {
            var fromTargetWorld = target.getWorld().getEntity(mainUuid);
            if (fromTargetWorld != null) return fromTargetWorld;
        }
    } catch (e2) {}

    return isBindableNpcTarget(target) ? target : null;
}

function rememberActiveMain(player, mainNpc) {
    try {
        player.getTempdata().put(ACTIVE_MAIN_TEMP_KEY, getNpcUuid(mainNpc));
    } catch (e) {}
}

function resolveActiveMain(player) {
    try {
        var mainUuid = trimString(player.getTempdata().get(ACTIVE_MAIN_TEMP_KEY));
        if (!hasText(mainUuid)) return null;
        return player.getWorld().getEntity(mainUuid);
    } catch (e) {
        return null;
    }
}

function applyConfigFromGui(mainNpc, player, gui) {
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

    writeEntriesToStored(mainNpc, entries);
    var data = mainNpc.getStoreddata();
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

function hydrateGui(gui, mainNpc) {
    setGuiText(gui, TIMER_FIELD_ID, readStoredOrDefault(mainNpc.getStoreddata(), CONFIG_TIMER_KEY, "00:00:00"));
    setGuiText(gui, INTERVAL_FIELD_ID, readStoredOrDefault(mainNpc.getStoreddata(), CONFIG_INTERVAL_KEY, "00:00:00"));
    setGuiText(gui, CHAT_FIELD_ID, readStoredOrDefault(mainNpc.getStoreddata(), CONFIG_CHAT_MODE_KEY, "local"));
    setGuiText(gui, DEBUG_FIELD_ID, readStoredOrDefault(mainNpc.getStoreddata(), CONFIG_DEBUG_KEY, "false"));
    setGuiText(gui, WHITELIST_FIELD_ID, normalizeWhitelistText(readStoredOrDefault(mainNpc.getStoreddata(), CONFIG_WHITELIST_KEY, CONFIG_DEFAULT_MANAGER)));
    setGuiText(gui, ENTRIES_AREA_ID, buildEntriesText(readEntriesFromMain(mainNpc)));
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

function captureTicketTemplateFromOffhand(mainNpc, player) {
    var offhand = getOffhandMcStack(player);
    if (offhand == null || offhand.isEmpty()) return false;

    var tag = getCustomTagFromMcStack(offhand);
    if (tag == null || readTag(tag, "item_type") != TICKET_ITEM_TYPE) return false;

    try {
        var templateStack = offhand.copy();
        templateStack.remove(PM_DataComponents.CUSTOM_DATA);
        mainNpc.getTempdata().put(TICKET_TEMPLATE_TEMP_KEY, templateStack);
        mainNpc.getStoreddata().put(CONFIG_OWNER_KEY, getPlayerName(player));
        return true;
    } catch (e) {
        return false;
    }
}

function importPokemonFromOffhandShulker(mainNpc, player) {
    var offhand = getOffhandMcStack(player);
    if (offhand == null || offhand.isEmpty() || !isShulkerBoxMcStack(offhand)) {
        return {
            added: 0,
            found: 0,
            message: "Put shulker box with Pokemon in offhand."
        };
    }

    var entries = readEntriesFromMain(mainNpc);
    var seen = {};
    var added = 0;
    var foundPokemon = 0;

    for (var i = 0; i < entries.length; i++) {
        seen[normalizeConfiguredSpecies(entries[i].species)] = true;
    }

    var shulkerItems = getShulkerContainedStacks(offhand);
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
        writeEntriesToStored(mainNpc, entries);
        mainNpc.getStoreddata().put(CONFIG_OWNER_KEY, getPlayerName(player));
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
        message: "Imported " + added + " new Pokemon. Found: " + foundPokemon + "."
    };
}

function canManageConfig(mainNpc, player) {
    var names = normalizeWhitelistText(readStoredOrDefault(mainNpc.getStoreddata(), CONFIG_WHITELIST_KEY, CONFIG_DEFAULT_MANAGER)).split(/\s+/);
    var playerName = getPlayerName(player);

    for (var i = 0; i < names.length; i++) {
        if (names[i] == playerName) return true;
    }

    return false;
}

function readEntriesFromMain(mainNpc) {
    var data = mainNpc.getStoreddata();
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

function writeEntriesToStored(mainNpc, entries) {
    var data = mainNpc.getStoreddata();
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

function getOffhandMcStack(player) {
    try {
        return player.getMCEntity().getOffhandItem();
    } catch (e) {
        return null;
    }
}

function getShulkerContainedStacks(mcStack) {
    var out = [];
    if (mcStack == null || mcStack.isEmpty()) return out;

    try {
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

function isBindableNpcTarget(target) {
    if (target == null) return false;

    try {
        var data = target.getStoreddata();
        if (data == null) return false;
        return hasText(getNpcUuid(target));
    } catch (e) {
        return false;
    }
}

function isShulkerBoxMcStack(mcStack) {
    if (mcStack == null || mcStack.isEmpty()) return false;

    try {
        var itemId = String(PM_BuiltInRegistries.ITEM.getKey(mcStack.getItem()));
        return /(^minecraft:|:)\w*shulker_box$/.test(itemId);
    } catch (e) {
        return false;
    }
}

function getCustomTag(item) {
    if (item == null || item.isEmpty()) return null;
    try {
        return getCustomTagFromMcStack(item.getMCItemStack());
    } catch (e) {
        return null;
    }
}

function getCustomTagFromMcStack(mcStack) {
    if (mcStack == null || mcStack.isEmpty()) return null;
    try {
        var customData = mcStack.get(PM_DataComponents.CUSTOM_DATA);
        if (customData == null) return null;
        return customData.copyTag();
    } catch (e) {
        return null;
    }
}

function writeHeldTag(player, item, tag) {
    try {
        var mcStack = item.getMCItemStack();
        if (mcStack == null || mcStack.isEmpty()) return false;
        mcStack.set(PM_DataComponents.CUSTOM_DATA, PM_CustomData.of(tag));
        try {
            if (item.setDurabilityShow != null) item.setDurabilityShow(false);
        } catch (e1) {}
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

function readStoredOrDefault(data, key, def) {
    var value = trimString(data.get(key));
    if (value == "null" || value == "undefined") return def;
    return hasText(value) ? value : def;
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

function hasStoredValue(value) {
    var text = trimString(value);
    return text.length > 0 && text != "null" && text != "undefined";
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
