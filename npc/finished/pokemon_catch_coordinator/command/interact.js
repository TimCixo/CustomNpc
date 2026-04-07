var PM_NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var PM_ArrayList = Java.type("java.util.ArrayList");
var PM_CommandSource = Java.type("net.minecraft.commands.CommandSource");
var PM_BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var PM_ResourceLocation = Java.type("net.minecraft.resources.ResourceLocation");
var PM_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var PM_CustomData = Java.type("net.minecraft.world.item.component.CustomData");
var PM_ItemLore = Java.type("net.minecraft.world.item.component.ItemLore");
var PM_Component = Java.type("net.minecraft.network.chat.Component");
var PM_CompoundTag = Java.type("net.minecraft.nbt.CompoundTag");
var PM_MCItemStack = Java.type("net.minecraft.world.item.ItemStack");

var LINKER_TYPE = "pokemon_catch_linker";
var LOCAL_MAIN_UUID_KEY = "pokemon_catch_local_main_uuid";
var LINKED_CONFIG_UUID_KEY = "pokemon_catch_linked_config_uuid";

var CONFIG_TIMER_KEY = "pokemon_multiplier_config_timer";
var CONFIG_INTERVAL_KEY = "pokemon_multiplier_config_interval";
var CONFIG_CHAT_MODE_KEY = "pokemon_multiplier_config_chat_mode";
var CONFIG_DEBUG_KEY = "pokemon_multiplier_config_debug";
var CONFIG_WHITELIST_KEY = "pokemon_multiplier_config_whitelist";
var CONFIG_DEFAULT_MANAGER = "HunterTim";

var CONTROL_TIMER_ID = 1;
var DISPLAY_BASE_TITLE_KEY = "pokemon_multiplier_display_base_title";

var CYCLE_RUNNING_KEY = "pokemon_multiplier_cycle_running";
var CYCLE_PAUSED_KEY = "pokemon_multiplier_cycle_paused";
var CYCLE_END_MS_KEY = "pokemon_multiplier_cycle_end_ms";
var CYCLE_INTERVAL_MS_KEY = "pokemon_multiplier_cycle_interval_ms";
var CYCLE_NEXT_NOTICE_MS_KEY = "pokemon_multiplier_cycle_next_notice_ms";
var CYCLE_STARTED_MS_KEY = "pokemon_multiplier_cycle_started_ms";
var CYCLE_REMAINING_MS_KEY = "pokemon_multiplier_cycle_remaining_ms";
var CYCLE_ENTRY_COUNT_KEY = "pokemon_multiplier_cycle_entry_count";
var CYCLE_PLAYER_PREFIX = "pokemon_multiplier_cycle_player_";
var CYCLE_SCORE_PREFIX = "pokemon_multiplier_cycle_score_";
var CYCLE_PCOUNT_PREFIX = "pokemon_multiplier_cycle_pcount_";
var COUNTING_MODE_KEY = "pokemon_multiplier_counting_mode";
var REGISTRATION_MODE_KEY = "pokemon_multiplier_registration_mode";

var GUI_ID = 9211;
var ACTION_SCROLL_ID = 9212;
var STATUS_AREA_ID = 9213;
var DANGER_SCROLL_ID = 9214;
var FEEDBACK_AREA_ID = 9215;

var ACTIONS = ["Start/Pause", "Counting", "Register", "Teleport", "Leaders"];
var DANGER_ACTIONS = ["Finish", "Reset", "Clear", "Linker"];

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

    var mainNpc = resolveMainNpc(npc);
    if (mainNpc == null) {
        player.message("Main NPC is not linked.");
        event.setCanceled(true);
        return;
    }

    if (!canManageSystem(mainNpc, player)) {
        player.message("No access to commands.");
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
        var commandNpc = event.npc != null ? event.npc : ACTIVE_NPC;
        if (gui == null || gui.getID() != GUI_ID) return;
        if (commandNpc == null) return;

        var mainNpc = resolveMainNpc(commandNpc);
        if (mainNpc == null) {
            setCommandFeedback(gui, "Main NPC is missing.");
            safeUpdate(gui);
            return;
        }

        if (!canManageSystem(mainNpc, event.player)) return;

        if (scroll != null && scroll.getID() == ACTION_SCROLL_ID) {
            handleActionScroll(mainNpc, gui, scroll);
        } else if (scroll != null && scroll.getID() == DANGER_SCROLL_ID) {
            handleDangerScroll(mainNpc, event.player, gui, scroll);
        }
    } catch (e) {}
}

function createGui(player, mainNpc) {
    var gui = PM_NpcAPI.Instance().createCustomGui(GUI_ID, 360, 260, false, player);

    gui.addLabel(1, "Command", 10, 10, 220, 18, 0xFFFFFF);
    gui.addColoredLine(2, 10, 46, 348, 46, 0x7F9C65, 1.5);

    gui.addLabel(10, "Actions", 10, 56, 80, 14, 0xE0E0E0);
    gui.addScroll(ACTION_SCROLL_ID, 10, 72, 120, 146, ACTIONS);

    gui.addLabel(11, "State", 140, 56, 80, 14, 0xE0E0E0);
    gui.addTextArea(STATUS_AREA_ID, 140, 72, 130, 146);

    gui.addLabel(12, "Reset", 280, 56, 70, 14, 0xE0E0E0);
    gui.addScroll(DANGER_SCROLL_ID, 280, 72, 70, 90, DANGER_ACTIONS);

    gui.addTextArea(FEEDBACK_AREA_ID, 10, 236, 340, 12);

    refreshCommandGuiState(gui, mainNpc);
    setCommandFeedback(gui, "Ready.");
    return gui;
}

function handleActionScroll(mainNpc, gui, scroll) {
    var selected = getSelectedIndex(scroll);
    if (selected < 0 || selected >= ACTIONS.length) return;

    if (selected == 0) {
        setCommandFeedback(gui, runCycleToggleCommand(mainNpc));
    } else if (selected == 1) {
        var countingEnabled = !isCountingModeEnabled(mainNpc);
        setCountingMode(mainNpc, countingEnabled);
        setCommandFeedback(gui, "Count mode: " + (countingEnabled ? "enabled" : "disabled") + ".");
    } else if (selected == 2) {
        var registrationEnabled = !isRegistrationModeEnabled(mainNpc);
        setRegistrationMode(mainNpc, registrationEnabled);
        setCommandFeedback(gui, "Registration mode: " + (registrationEnabled ? "enabled" : "disabled") + ".");
    } else if (selected == 3) {
        var teleported = teleportParticipantsToNpc(mainNpc);
        setCommandFeedback(gui, "Teleported: " + teleported + ".");
    } else if (selected == 4) {
        setCommandFeedback(gui, buildLeaderboardSummaryText(mainNpc));
    }

    refreshCommandGuiState(gui, mainNpc);
    safeUpdate(gui);
}

function handleDangerScroll(mainNpc, player, gui, scroll) {
    var selected = getSelectedIndex(scroll);
    if (selected < 0 || selected >= DANGER_ACTIONS.length) return;

    if (selected == 0) {
        finishCycle(mainNpc);
        setCommandFeedback(gui, "Cycle finished.");
    } else if (selected == 1) {
        resetCycleState(mainNpc);
        setCommandFeedback(gui, "Cycle reset.");
    } else if (selected == 2) {
        clearParticipantEntries(mainNpc);
        setCommandFeedback(gui, "Participants cleared.");
    } else if (selected == 3) {
        if (issueLinkerFromCommand(mainNpc, player)) {
            setCommandFeedback(gui, "Linker issued.");
        } else {
            setCommandFeedback(gui, "Failed to issue linker.");
        }
    }

    refreshCommandGuiState(gui, mainNpc);
    safeUpdate(gui);
}

function bindToLinker(npc, player, item) {
    var tag = getCustomTag(item);
    if (tag == null || readTag(tag, "linker_type") != LINKER_TYPE || !hasText(readTag(tag, "main_uuid"))) {
        player.message("Invalid linker.");
        return;
    }

    tag.putString("command_uuid", getNpcUuid(npc));
    npc.getStoreddata().put(LOCAL_MAIN_UUID_KEY, readTag(tag, "main_uuid"));
    if (!writeHeldTag(player, item, tag)) {
        player.message("Bind write failed.");
        return;
    }

    player.message("Command NPC linked.");
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

function canManageSystem(mainNpc, player) {
    var whitelist = normalizeWhitelistText(readManagerWhitelist(mainNpc));
    var names = whitelist.split(/\s+/);
    var playerName = getPlayerName(player);

    for (var i = 0; i < names.length; i++) {
        if (names[i] == playerName) return true;
    }

    return false;
}

function readManagerWhitelist(mainNpc) {
    var configNpc = resolveConfigNpc(mainNpc);
    if (configNpc != null) {
        return trimString(configNpc.getStoreddata().get(CONFIG_WHITELIST_KEY));
    }

    return trimString(mainNpc.getStoreddata().get(CONFIG_WHITELIST_KEY));
}

function resolveConfigNpc(mainNpc) {
    var linkedUuid = trimString(mainNpc.getStoreddata().get(LINKED_CONFIG_UUID_KEY));
    if (!hasText(linkedUuid)) return null;

    try {
        return mainNpc.getWorld().getEntity(linkedUuid);
    } catch (e) {
        return null;
    }
}

function buildCurrentSettings(mainNpc) {
    var configNpc = resolveConfigNpc(mainNpc);
    var sourceNpc = configNpc == null ? mainNpc : configNpc;
    var data = sourceNpc.getStoreddata();

    return {
        timer: readStoredOrDefault(data, CONFIG_TIMER_KEY, "00:00:00"),
        interval: readStoredOrDefault(data, CONFIG_INTERVAL_KEY, "00:00:00"),
        chatMode: readStoredOrDefault(data, CONFIG_CHAT_MODE_KEY, "local"),
        debug: readStoredOrDefault(data, CONFIG_DEBUG_KEY, "false")
    };
}

function issueLinkerFromCommand(mainNpc, player) {
    var linker = createLinkerItem(mainNpc);
    if (linker == null || linker.isEmpty()) return false;
    return giveItemToPlayer(player, linker);
}

function createLinkerItem(mainNpc) {
    try {
        var itemType = PM_BuiltInRegistries.ITEM.get(PM_ResourceLocation.parse("minecraft:tripwire_hook"));
        if (itemType == null) return null;

        var mcStack = new PM_MCItemStack(itemType);
        var tag = new PM_CompoundTag();
        tag.putString("linker_type", LINKER_TYPE);
        tag.putString("main_uuid", getNpcUuid(mainNpc));
        tag.putString("config_uuid", "");
        tag.putString("command_uuid", "");

        mcStack.set(PM_DataComponents.CUSTOM_DATA, PM_CustomData.of(tag));
        mcStack.set(PM_DataComponents.CUSTOM_NAME, PM_Component.literal("Pokemon Catch Linker"));
        mcStack.set(PM_DataComponents.LORE, new PM_ItemLore(buildLore([
            "1. Bind Configurator NPC.",
            "2. Bind Command NPC.",
            "3. Return linker to Main NPC."
        ])));

        var item = PM_NpcAPI.Instance().getIItemStack(mcStack);
        if (item == null || item.isEmpty()) return null;
        item.setStackSize(1);
        return item;
    } catch (e) {
        return null;
    }
}

function refreshCommandGuiState(gui, mainNpc) {
    setGuiText(gui, STATUS_AREA_ID, buildCommandStatusText(mainNpc));
}

function setCommandFeedback(gui, text) {
    setGuiText(gui, FEEDBACK_AREA_ID, text);
}

function buildCommandStatusText(mainNpc) {
    return [
        "Cycle state: " + (isCycleRunning(mainNpc) ? "running" : (isCyclePaused(mainNpc) ? "paused" : "stopped")),
        "Count mode: " + (isCountingModeEnabled(mainNpc) ? "enabled" : "disabled"),
        "Registration mode: " + (isRegistrationModeEnabled(mainNpc) ? "enabled" : "disabled"),
        "Participants: " + parseIntSafe(mainNpc.getStoreddata().get(CYCLE_ENTRY_COUNT_KEY), 0)
    ].join("\n");
}

function runCycleToggleCommand(mainNpc) {
    if (isCycleRunning(mainNpc)) {
        pauseCycle(mainNpc);
        return "Cycle paused.";
    }

    if (isCyclePaused(mainNpc)) {
        if (!resumeCycle(mainNpc)) return "Resume failed. Check timer and interval.";
        return "Cycle resumed.";
    }

    if (!startCycle(mainNpc)) return "Start failed. Check timer and interval.";
    return "Cycle started.";
}

function startCycle(mainNpc) {
    var settings = buildCurrentSettings(mainNpc);
    var timerMs = parseDurationToMs(settings.timer);
    var intervalMs = parseDurationToMs(settings.interval);
    if (timerMs <= 0 || intervalMs <= 0) return false;

    var now = getNowMs();
    var data = mainNpc.getStoreddata();
    data.put(CYCLE_RUNNING_KEY, "1");
    data.put(CYCLE_PAUSED_KEY, "0");
    data.put(CYCLE_STARTED_MS_KEY, "" + now);
    data.put(CYCLE_END_MS_KEY, "" + (now + timerMs));
    data.put(CYCLE_INTERVAL_MS_KEY, "" + intervalMs);
    data.put(CYCLE_NEXT_NOTICE_MS_KEY, "" + (now + intervalMs));
    data.put(CYCLE_REMAINING_MS_KEY, "" + timerMs);
    setTimerDisplay(mainNpc, formatDurationMs(timerMs));
    announceByMode(mainNpc, "Cycle started: " + formatDurationMs(timerMs));

    try {
        mainNpc.timers.forceStart(CONTROL_TIMER_ID, 20, true);
    } catch (e) {}
    return true;
}

function pauseCycle(mainNpc) {
    var data = mainNpc.getStoreddata();
    var now = getNowMs();
    var endMs = parseIntSafe(data.get(CYCLE_END_MS_KEY), 0);
    var remainingMs = Math.max(0, endMs - now);

    data.put(CYCLE_RUNNING_KEY, "0");
    data.put(CYCLE_PAUSED_KEY, "1");
    data.put(CYCLE_REMAINING_MS_KEY, "" + remainingMs);
    data.put(CYCLE_END_MS_KEY, "0");
    data.put(CYCLE_NEXT_NOTICE_MS_KEY, "0");
    setTimerDisplay(mainNpc, formatDurationMs(remainingMs));

    try {
        mainNpc.timers.stop(CONTROL_TIMER_ID);
    } catch (e) {}
}

function resumeCycle(mainNpc) {
    var data = mainNpc.getStoreddata();
    var remainingMs = parseIntSafe(data.get(CYCLE_REMAINING_MS_KEY), 0);
    var intervalMs = parseIntSafe(data.get(CYCLE_INTERVAL_MS_KEY), 0);
    if (remainingMs <= 0 || intervalMs <= 0) return false;

    var now = getNowMs();
    data.put(CYCLE_RUNNING_KEY, "1");
    data.put(CYCLE_PAUSED_KEY, "0");
    data.put(CYCLE_STARTED_MS_KEY, "" + now);
    data.put(CYCLE_END_MS_KEY, "" + (now + remainingMs));
    data.put(CYCLE_NEXT_NOTICE_MS_KEY, "" + (now + intervalMs));
    setTimerDisplay(mainNpc, formatDurationMs(remainingMs));
    announceByMode(mainNpc, "Cycle resumed: " + formatDurationMs(remainingMs));

    try {
        mainNpc.timers.forceStart(CONTROL_TIMER_ID, 20, true);
    } catch (e) {}
    return true;
}

function finishCycle(mainNpc) {
    announceByMode(mainNpc, "Cycle finished.");
    stopCycle(mainNpc);
}

function stopCycle(mainNpc) {
    var data = mainNpc.getStoreddata();
    data.put(CYCLE_RUNNING_KEY, "0");
    data.put(CYCLE_PAUSED_KEY, "0");
    data.put(CYCLE_END_MS_KEY, "0");
    data.put(CYCLE_INTERVAL_MS_KEY, "0");
    data.put(CYCLE_NEXT_NOTICE_MS_KEY, "0");
    data.put(CYCLE_STARTED_MS_KEY, "0");
    data.put(CYCLE_REMAINING_MS_KEY, "0");
    restoreBaseTitle(mainNpc);

    try {
        mainNpc.timers.stop(CONTROL_TIMER_ID);
    } catch (e) {}
}

function resetCycleState(mainNpc) {
    stopCycle(mainNpc);
    clearCycleEntries(mainNpc);
}

function clearParticipantEntries(mainNpc) {
    clearCycleEntries(mainNpc);
}

function clearCycleEntries(mainNpc) {
    var data = mainNpc.getStoreddata();
    var count = parseIntSafe(data.get(CYCLE_ENTRY_COUNT_KEY), 0);
    for (var i = 0; i < count; i++) {
        data.remove(CYCLE_PLAYER_PREFIX + i);
        data.remove(CYCLE_SCORE_PREFIX + i);
        data.remove(CYCLE_PCOUNT_PREFIX + i);
    }
    data.put(CYCLE_ENTRY_COUNT_KEY, "0");
}

function setCountingMode(mainNpc, enabled) {
    mainNpc.getStoreddata().put(COUNTING_MODE_KEY, enabled ? "1" : "0");
}

function setRegistrationMode(mainNpc, enabled) {
    mainNpc.getStoreddata().put(REGISTRATION_MODE_KEY, enabled ? "1" : "0");
}

function isCycleRunning(mainNpc) {
    return trimString(mainNpc.getStoreddata().get(CYCLE_RUNNING_KEY)) == "1";
}

function isCyclePaused(mainNpc) {
    return trimString(mainNpc.getStoreddata().get(CYCLE_PAUSED_KEY)) == "1";
}

function isCountingModeEnabled(mainNpc) {
    return trimString(mainNpc.getStoreddata().get(COUNTING_MODE_KEY)) == "1";
}

function isRegistrationModeEnabled(mainNpc) {
    return trimString(mainNpc.getStoreddata().get(REGISTRATION_MODE_KEY)) == "1";
}

function teleportParticipantsToNpc(mainNpc) {
    var entries = buildLeaderboardEntries(mainNpc);
    var world = mainNpc.getWorld();
    if (world == null) return 0;

    var teleported = 0;
    for (var i = 0; i < entries.length; i++) {
        try {
            var participant = world.getPlayer(entries[i].player);
            if (participant == null) continue;
            participant.setPosition(mainNpc.getX(), mainNpc.getY(), mainNpc.getZ());
            teleported++;
        } catch (e) {}
    }

    return teleported;
}

function buildLeaderboardSummaryText(mainNpc) {
    var entries = buildLeaderboardEntries(mainNpc);
    if (entries.length <= 0) return "Leaderboard is empty.";

    var lines = ["Leaderboard:"];
    var limit = Math.min(entries.length, 5);
    for (var i = 0; i < limit; i++) {
        lines.push((i + 1) + ". " + entries[i].player + " " + formatScore(entries[i].score));
    }
    return lines.join("\n");
}

function buildLeaderboardEntries(mainNpc) {
    var data = mainNpc.getStoreddata();
    var count = parseIntSafe(data.get(CYCLE_ENTRY_COUNT_KEY), 0);
    var entries = [];

    for (var i = 0; i < count; i++) {
        var playerName = trimString(data.get(CYCLE_PLAYER_PREFIX + i));
        if (!hasText(playerName)) continue;

        entries.push({
            player: playerName,
            score: parseFloatSafe(data.get(CYCLE_SCORE_PREFIX + i), 0),
            pcount: parseIntSafe(data.get(CYCLE_PCOUNT_PREFIX + i), 0)
        });
    }

    entries.sort(function(a, b) {
        if (b.score != a.score) return b.score - a.score;
        return b.pcount - a.pcount;
    });

    return entries;
}

function announceByMode(mainNpc, message) {
    var settings = buildCurrentSettings(mainNpc);
    if (settings.chatMode == "local") {
        sayLocal(mainNpc, message);
        return;
    }

    if (!runBroadcastCommand(mainNpc, message)) {
        try {
            mainNpc.say(message);
        } catch (e) {}
    }
}

function runBroadcastCommand(mainNpc, message) {
    var command = "bc " + sanitizeBroadcastText(message);
    var serverOutput = tryServerCommand(mainNpc, command);
    return serverOutput != null;
}

function tryServerCommand(mainNpc, command) {
    try {
        var outputs = new PM_ArrayList();
        var CapturingSource = Java.extend(PM_CommandSource, {
            sendSystemMessage: function(component) {
                try {
                    outputs.add(component.getString());
                } catch (e1) {
                    outputs.add("" + component);
                }
            },
            acceptsSuccess: function() {
                return true;
            },
            acceptsFailure: function() {
                return true;
            },
            shouldInformAdmins: function() {
                return false;
            }
        });

        var server = mainNpc.getMCEntity().level().getServer();
        var source = server.createCommandSourceStack()
            .withSource(new CapturingSource())
            .withPermission(4);

        server.getCommands().performPrefixedCommand(source, stripLeadingSlash(command));
        return outputs.isEmpty() ? "" : "" + outputs.get(0);
    } catch (e) {
        return null;
    }
}

function sayLocal(mainNpc, message) {
    try {
        var players = mainNpc.getWorld().getAllPlayers();
        if (players == null) return;

        for (var i = 0; i < players.length; i++) {
            var player = players[i];
            if (player == null) continue;
            if (!isWithinLocalRange(mainNpc, player, 20)) continue;
            try {
                mainNpc.sayTo(player, message);
            } catch (e1) {}
        }
    } catch (e) {}
}

function isWithinLocalRange(mainNpc, player, range) {
    try {
        var dx = mainNpc.getX() - player.getX();
        var dy = mainNpc.getY() - player.getY();
        var dz = mainNpc.getZ() - player.getZ();
        return (dx * dx + dy * dy + dz * dz) <= (range * range);
    } catch (e) {
        return false;
    }
}

function setTimerDisplay(mainNpc, text) {
    try {
        ensureBaseTitle(mainNpc);
        mainNpc.getDisplay().setTitle(trimString(text));
        mainNpc.updateClient();
    } catch (e) {}
}

function restoreBaseTitle(mainNpc) {
    try {
        var baseTitle = "" + mainNpc.getStoreddata().get(DISPLAY_BASE_TITLE_KEY);
        mainNpc.getDisplay().setTitle(baseTitle);
        mainNpc.updateClient();
    } catch (e) {}
}

function ensureBaseTitle(mainNpc) {
    try {
        var data = mainNpc.getStoreddata();
        if (hasText(data.get(DISPLAY_BASE_TITLE_KEY))) return;
        data.put(DISPLAY_BASE_TITLE_KEY, "" + mainNpc.getDisplay().getTitle());
    } catch (e) {}
}

function isLinker(item) {
    var tag = getCustomTag(item);
    return tag != null && readTag(tag, "linker_type") == LINKER_TYPE;
}

function giveItemToPlayer(player, item) {
    var given = false;

    try {
        given = player.giveItem(item);
    } catch (e) {}
    if (given) return true;

    try {
        var inv = player.getInventory();
        if (inv == null) return false;

        var size = inv.getSize();
        for (var i = 0; i < size; i++) {
            var slot = inv.getSlot(i);
            if (slot == null || slot.isEmpty()) {
                inv.setSlot(i, item);
                return true;
            }
        }
    } catch (e2) {}

    return false;
}

function buildLore(lines) {
    var lore = new PM_ArrayList();
    for (var i = 0; i < lines.length; i++) {
        lore.add(PM_Component.literal(lines[i]));
    }
    return lore;
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

function setGuiText(gui, id, text) {
    try {
        var comp = gui.getComponent(id);
        if (comp != null && comp.setText != null) comp.setText(text == null ? "" : ("" + text));
    } catch (e) {}
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

function sanitizeBroadcastText(text) {
    return trimString(("" + text).replace(/[\r\n]+/g, " "));
}

function stripLeadingSlash(command) {
    var cmd = trimString(command);
    if (cmd.indexOf("/") === 0) return cmd.substring(1);
    return cmd;
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
