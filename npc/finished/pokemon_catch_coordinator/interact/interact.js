var PM_UUID = Java.type("java.util.UUID");
var PM_ArrayList = Java.type("java.util.ArrayList");
var PM_NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var PM_CommandSource = Java.type("net.minecraft.commands.CommandSource");
var PM_Items = Java.type("net.minecraft.world.item.Items");
var PM_MCItemStack = Java.type("net.minecraft.world.item.ItemStack");
var PM_InteractionHand = Java.type("net.minecraft.world.InteractionHand");
var PM_BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var PM_ResourceLocation = Java.type("net.minecraft.resources.ResourceLocation");
var PM_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var PM_CustomData = Java.type("net.minecraft.world.item.component.CustomData");
var PM_ItemLore = Java.type("net.minecraft.world.item.component.ItemLore");
var PM_Component = Java.type("net.minecraft.network.chat.Component");
var PM_CompoundTag = Java.type("net.minecraft.nbt.CompoundTag");
var PM_Stats = Java.type("com.cobblemon.mod.common.api.pokemon.stats.Stats");
var PM_CubixCobblemonDataComponents = Java.type("net.im51111n355.cubixcobblemon.common.CubixCobblemonDataComponents");

var CONTROL_TIMER_ID = 1;

var CONFIG_KEY_MARKER = "pokemon_multiplier_config_key";
var COMMAND_KEY_MARKER = "pokemon_multiplier_command_key";
var CONFIG_PARTICIPANT_LEAF_MARKER = "pokemon_multiplier_config_participant_leaf";

var CONFIG_NPC_ID_KEY = "pokemon_multiplier_config_npc_id";
var CONFIG_OWNER_KEY = "pokemon_multiplier_config_owner";
var CONFIG_COUNT_KEY = "pokemon_multiplier_config_count";
var CONFIG_SPECIES_KEY_PREFIX = "pokemon_multiplier_config_species_";
var CONFIG_MULTIPLIER_KEY_PREFIX = "pokemon_multiplier_config_multiplier_";
var CONFIG_TIMER_KEY = "pokemon_multiplier_config_timer";
var CONFIG_INTERVAL_KEY = "pokemon_multiplier_config_interval";
var CONFIG_CHAT_MODE_KEY = "pokemon_multiplier_config_chat_mode";
var CONFIG_DEBUG_KEY = "pokemon_multiplier_config_debug";
var CONFIG_WHITELIST_KEY = "pokemon_multiplier_config_whitelist";
var DISPLAY_BASE_TITLE_KEY = "pokemon_multiplier_display_base_title";
var CONFIG_DEFAULT_MANAGER = "HunterTim";

var CONFIG_GUI_ID = 9201;
var CONFIG_SCROLL_ID = 9202;
var CONFIG_TIMER_FIELD_ID = 9203;
var CONFIG_INTERVAL_FIELD_ID = 9204;
var CONFIG_CHAT_FIELD_ID = 9205;
var CONFIG_DEBUG_FIELD_ID = 9206;
var CONFIG_WHITELIST_FIELD_ID = 9207;
var CONFIG_SPECIES_FIELD_ID = 9208;
var CONFIG_MULTIPLIER_FIELD_ID = 9209;
var CONFIG_STATUS_AREA_ID = 9210;

var COMMAND_GUI_ID = 9211;
var COMMAND_SCROLL_ID = 9212;
var COMMAND_STATUS_AREA_ID = 9213;
var COMMAND_DANGER_SCROLL_ID = 9214;
var COMMAND_FEEDBACK_AREA_ID = 9215;

var CONFIG_ACTIONS = [
    "Save",
    "Default",
    "Summary"
];

var COMMAND_ACTIONS = [
    "Start/Pause",
    "Counting",
    "Register",
    "Teleport",
    "Leaders"
];

var COMMAND_DANGER_ACTIONS = [
    "Finish",
    "Reset",
    "Clear"
];

var GUI_DRAFT_PREFIX = "pokemon_multiplier_gui_draft_";
var ACTIVE_GUI_NPC_ID_KEY = "pokemon_multiplier_active_gui_npc_id";
var ACTIVE_GUI_NPC_REF_KEY = "pokemon_multiplier_active_gui_npc_ref";
var ACTIVE_GUI_NPC_CACHE = null;
var GUI_DRAFT_TIMER_SUFFIX = "timer";
var GUI_DRAFT_INTERVAL_SUFFIX = "interval";
var GUI_DRAFT_CHAT_SUFFIX = "chat";
var GUI_DRAFT_DEBUG_SUFFIX = "debug";
var GUI_DRAFT_WHITELIST_SUFFIX = "whitelist";
var GUI_DRAFT_POKEMON_SUFFIX = "pokemon";
var GUI_DRAFT_ENTRY_INDEX_SUFFIX = "entry_index";

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
var IV_STAT_ORDER = [
    PM_Stats.HP,
    PM_Stats.ATTACK,
    PM_Stats.DEFENCE,
    PM_Stats.SPECIAL_ATTACK,
    PM_Stats.SPECIAL_DEFENCE,
    PM_Stats.SPEED
];

function interact(event) {
    var npc = event.npc;
    var player = event.player;
    var item = player.getMainhandItem();

    rememberActiveNpc(npc);
    ensureNpcConfigId(npc);
    ensureCycleDefaults(npc);
    ensureManagerDefaults(npc);

    if (isParticipantLeafForNpc(item, npc)) {
        handleParticipantLeafUse(event, npc, player, item);
        return;
    }

    if (isConfigKeyForNpc(item, npc)) {
        openConfigGuiFromKey(event, npc, player);
        return;
    }

    if (isCommandKeyForNpc(item, npc)) {
        openCommandGuiFromKey(event, npc, player);
        return;
    }

    if (canManageNpc(npc, player)) {
        handleManagerInteract(event, npc, player);
        return;
    }

    if (isRegistrationModeEnabled(npc)) {
        handleRegistrationJoin(event, npc, player);
        return;
    }

    cancelInteractionOnly(event);
}

function customGuiScroll(event) {
    try {
        var gui = event.gui;
        if (gui == null) return;

        if (gui.getID() == CONFIG_GUI_ID) {
            handleConfigGuiScroll(event);
            return;
        }

        if (gui.getID() == COMMAND_GUI_ID) {
            handleCommandGuiScroll(event);
            handleCommandDangerScroll(event);
        }
    } catch (e) {}
}

function customGuiClosed(event) {
    try {
        var gui = event.gui;
        if (gui == null) return;

        if (gui.getID() == CONFIG_GUI_ID) {
            saveConfigGuiDraft(event.player, resolveGuiNpc(event.player, event.npc), gui);
        }
    } catch (e) {}
}

function handleManagerInteract(event, npc, player) {
    var issued = ensureManagerKeys(player, npc);
    if (issued.length > 0) {
        player.message("Issued: " + issued.join(", "));
    } else {
        player.message("Keys already present.");
    }

    cancelInteractionOnly(event);
}

function openConfigGuiFromKey(event, npc, player) {
    if (!canManageNpc(npc, player)) {
        player.message("No access to this NPC.");
        cancelInteractionOnly(event);
        return;
    }

    try {
        rememberActiveNpc(npc);
        player.getStoreddata().put(ACTIVE_GUI_NPC_ID_KEY, "" + npc.getStoreddata().get(CONFIG_NPC_ID_KEY));
        player.getTempdata().put(ACTIVE_GUI_NPC_REF_KEY, npc);
        player.showCustomGui(createConfigGui(player, npc));
    } catch (e) {
        player.message("GUI error: " + e);
    }

    cancelInteractionOnly(event);
}

function openCommandGuiFromKey(event, npc, player) {
    if (!canManageNpc(npc, player)) {
        player.message("No access to this NPC.");
        cancelInteractionOnly(event);
        return;
    }

    try {
        rememberActiveNpc(npc);
        player.getStoreddata().put(ACTIVE_GUI_NPC_ID_KEY, "" + npc.getStoreddata().get(CONFIG_NPC_ID_KEY));
        player.getTempdata().put(ACTIVE_GUI_NPC_REF_KEY, npc);
        player.showCustomGui(createCommandGui(player, npc));
    } catch (e) {
        player.message("GUI error: " + e);
    }

    cancelInteractionOnly(event);
}

function handleConfigGuiScroll(event) {
    var npc = resolveGuiNpc(event.player, event.npc);
    var player = event.player;
    var gui = event.gui;
    var scroll = event.scroll;

    if (gui == null || gui.getID() != CONFIG_GUI_ID) return;
    if (scroll == null || scroll.getID() != CONFIG_SCROLL_ID) return;
    if (npc == null) {
        player.message("GUI lost NPC context.");
        return;
    }
    if (!canManageNpc(npc, player)) return;

    var selected = getGuiScrollSelectedIndex(scroll);
    if (selected < 0 || selected >= CONFIG_ACTIONS.length) return;

    if (selected == 0) {
        applyConfigFromGui(npc, player, gui);
    } else if (selected == 1) {
        applyConfigDefaultsToGui(gui);
        setConfigStatus(gui, "Defaults loaded.");
    } else if (selected == 2) {
        setConfigStatus(gui, buildConfigSummaryText(player, npc, gui));
    }

    safeUpdateGui(gui);
}

function handleCommandGuiScroll(event) {
    var npc = resolveGuiNpc(event.player, event.npc);
    var player = event.player;
    var gui = event.gui;
    var scroll = event.scroll;

    if (gui == null || gui.getID() != COMMAND_GUI_ID) return;
    if (scroll == null || scroll.getID() != COMMAND_SCROLL_ID) return;
    if (npc == null) {
        player.message("GUI lost NPC context.");
        return;
    }
    if (!canManageNpc(npc, player)) return;

    var selected = getGuiScrollSelectedIndex(scroll);
    if (selected < 0 || selected >= COMMAND_ACTIONS.length) return;

    if (selected == 0) {
        refreshCommandGuiState(gui, npc);
        setCommandFeedback(gui, runCycleToggleCommand(npc));
    } else if (selected == 1) {
        var countingEnabled = !isCountingModeEnabled(npc);
        setCountingMode(npc, countingEnabled);
        refreshCommandGuiState(gui, npc);
        setCommandFeedback(gui, "Count mode: " + (countingEnabled ? "enabled" : "disabled") + ".");
    } else if (selected == 2) {
        var registrationEnabled = !isRegistrationModeEnabled(npc);
        setRegistrationMode(npc, registrationEnabled);
        refreshCommandGuiState(gui, npc);
        setCommandFeedback(gui, "Registration mode: " + (registrationEnabled ? "enabled" : "disabled") + ".");
    } else if (selected == 3) {
        var teleported = teleportParticipantsToNpc(npc);
        refreshCommandGuiState(gui, npc);
        setCommandFeedback(gui, "Teleported: " + teleported + ".");
    } else if (selected == 4) {
        refreshCommandGuiState(gui, npc);
        setCommandFeedback(gui, buildLeaderboardSummaryText(npc));
    }

    safeUpdateGui(gui);
}

function handleCommandDangerScroll(event) {
    var npc = resolveGuiNpc(event.player, event.npc);
    var player = event.player;
    var gui = event.gui;
    var scroll = event.scroll;

    if (gui == null || gui.getID() != COMMAND_GUI_ID) return;
    if (scroll == null || scroll.getID() != COMMAND_DANGER_SCROLL_ID) return;
    if (npc == null) {
        player.message("GUI lost NPC context.");
        return;
    }
    if (!canManageNpc(npc, player)) return;

    var selected = getGuiScrollSelectedIndex(scroll);
    if (selected < 0 || selected >= COMMAND_DANGER_ACTIONS.length) return;

    if (selected == 0) {
        finishCycle(npc);
        refreshCommandGuiState(gui, npc);
        setCommandFeedback(gui, "Cycle finished.");
    } else if (selected == 1) {
        resetCycleState(npc);
        refreshCommandGuiState(gui, npc);
        setCommandFeedback(gui, "Cycle reset.");
    } else if (selected == 2) {
        clearParticipantEntries(npc);
        refreshCommandGuiState(gui, npc);
        setCommandFeedback(gui, "Participants cleared.");
    }
    safeUpdateGui(gui);
}

function createConfigGui(player, npc) {
    var gui = PM_NpcAPI.Instance().createCustomGui(CONFIG_GUI_ID, 360, 260, false, player);

    gui.addLabel(1, "Config", 10, 10, 220, 18, 0xFFFFFF);
    gui.addColoredLine(3, 10, 46, 348, 46, 0x7F9C65, 1.5);

    gui.addLabel(10, "Timer", 10, 56, 80, 14, 0xE0E0E0);
    gui.addTextField(CONFIG_TIMER_FIELD_ID, 10, 72, 110, 20);

    gui.addLabel(11, "Interval", 130, 56, 80, 14, 0xE0E0E0);
    gui.addTextField(CONFIG_INTERVAL_FIELD_ID, 130, 72, 110, 20);

    gui.addLabel(12, "Chat", 10, 100, 80, 14, 0xE0E0E0);
    gui.addTextField(CONFIG_CHAT_FIELD_ID, 10, 116, 110, 20);

    gui.addLabel(13, "Debug", 130, 100, 80, 14, 0xE0E0E0);
    gui.addTextField(CONFIG_DEBUG_FIELD_ID, 130, 116, 110, 20);

    gui.addLabel(14, "Whitelist", 10, 144, 80, 14, 0xE0E0E0);
    gui.addTextField(CONFIG_WHITELIST_FIELD_ID, 10, 160, 230, 20);

    gui.addLabel(15, "Actions", 252, 56, 80, 14, 0xE0E0E0);
    gui.addScroll(CONFIG_SCROLL_ID, 252, 72, 98, 72, CONFIG_ACTIONS);

    gui.addLabel(16, "Species", 10, 188, 90, 14, 0xE0E0E0);
    gui.addTextField(CONFIG_SPECIES_FIELD_ID, 10, 204, 150, 20);

    gui.addLabel(17, "Multiplier", 168, 188, 72, 14, 0xE0E0E0);
    gui.addTextField(CONFIG_MULTIPLIER_FIELD_ID, 168, 204, 72, 20);

    gui.addTextArea(CONFIG_STATUS_AREA_ID, 10, 236, 340, 12);

    hydrateConfigGuiFromDraft(player, npc, gui);
    if (!hasAnyTextInConfigGui(gui)) {
        hydrateConfigGuiFromNpc(player, npc, gui);
    }
    setConfigStatus(gui, "Ready.");
    return gui;
}

function createCommandGui(player, npc) {
    var gui = PM_NpcAPI.Instance().createCustomGui(COMMAND_GUI_ID, 360, 260, false, player);

    gui.addLabel(1, "Command", 10, 10, 220, 18, 0xFFFFFF);
    gui.addColoredLine(3, 10, 46, 348, 46, 0x7F9C65, 1.5);

    gui.addLabel(10, "Actions", 10, 56, 80, 14, 0xE0E0E0);
    gui.addScroll(COMMAND_SCROLL_ID, 10, 72, 120, 146, COMMAND_ACTIONS);

    gui.addLabel(12, "State", 140, 56, 80, 14, 0xE0E0E0);
    gui.addTextArea(COMMAND_STATUS_AREA_ID, 140, 72, 130, 146);

    gui.addLabel(13, "Reset", 280, 56, 70, 14, 0xE0E0E0);
    gui.addScroll(COMMAND_DANGER_SCROLL_ID, 280, 72, 70, 90, COMMAND_DANGER_ACTIONS);

    gui.addTextArea(COMMAND_FEEDBACK_AREA_ID, 10, 236, 340, 12);

    refreshCommandGuiState(gui, npc);
    setCommandFeedback(gui, "Ready.");
    return gui;
}

function applyConfigFromGui(npc, player, gui) {
    var timer = trimString(getGuiText(gui, CONFIG_TIMER_FIELD_ID));
    var interval = trimString(getGuiText(gui, CONFIG_INTERVAL_FIELD_ID));
    var chatMode = normalizeChatMode(getGuiText(gui, CONFIG_CHAT_FIELD_ID));
    var debug = normalizeTrueFalse(getGuiText(gui, CONFIG_DEBUG_FIELD_ID));
    var whitelist = normalizeWhitelistText(getGuiText(gui, CONFIG_WHITELIST_FIELD_ID));
    var entries = getConfigDraftEntries(player, npc);

    if (!upsertDraftEntryFromGui(player, npc, gui)) {
        setConfigStatus(gui, "Species and multiplier must both be set.");
        return false;
    }
    entries = getConfigDraftEntries(player, npc);

    if (parseDurationToMs(timer) <= 0) {
        setConfigStatus(gui, "Timer must be HH:MM:SS.");
        return false;
    }

    if (parseDurationToMs(interval) <= 0) {
        setConfigStatus(gui, "Interval must be HH:MM:SS.");
        return false;
    }

    var settings = {
        timer: timer,
        interval: interval,
        chatMode: chatMode,
        debug: debug
    };

    applySettings(npc, settings);
    applyConfigEntries(npc, entries, player);
    npc.getStoreddata().put(CONFIG_WHITELIST_KEY, whitelist);
    saveConfigGuiDraft(player, npc, gui);

    setGuiText(gui, CONFIG_CHAT_FIELD_ID, chatMode);
    setGuiText(gui, CONFIG_DEBUG_FIELD_ID, debug);
    setGuiText(gui, CONFIG_WHITELIST_FIELD_ID, whitelist);
    setConfigStatus(gui, "Saved. Entries: " + entries.length + ".");
    return true;
}

function hydrateConfigGuiFromNpc(player, npc, gui) {
    var settings = buildCurrentSettings(npc);
    setGuiText(gui, CONFIG_TIMER_FIELD_ID, settings.timer);
    setGuiText(gui, CONFIG_INTERVAL_FIELD_ID, settings.interval);
    setGuiText(gui, CONFIG_CHAT_FIELD_ID, settings.chatMode);
    setGuiText(gui, CONFIG_DEBUG_FIELD_ID, settings.debug);
    setGuiText(gui, CONFIG_WHITELIST_FIELD_ID, getManagerWhitelistText(npc));
    setConfigDraftEntries(player, npc, buildCurrentConfigEntries(npc));
    setConfigDraftIndex(player, npc, 0);
    loadDraftEntryIntoGui(player, npc, gui);
}

function applyConfigDefaultsToGui(gui) {
    setGuiText(gui, CONFIG_TIMER_FIELD_ID, "00:00:00");
    setGuiText(gui, CONFIG_INTERVAL_FIELD_ID, "00:00:00");
    setGuiText(gui, CONFIG_CHAT_FIELD_ID, "local");
    setGuiText(gui, CONFIG_DEBUG_FIELD_ID, "false");
    setGuiText(gui, CONFIG_WHITELIST_FIELD_ID, CONFIG_DEFAULT_MANAGER);
    setGuiText(gui, CONFIG_SPECIES_FIELD_ID, "");
    setGuiText(gui, CONFIG_MULTIPLIER_FIELD_ID, "");
}

function hydrateConfigGuiFromDraft(player, npc, gui) {
    setGuiText(gui, CONFIG_TIMER_FIELD_ID, getGuiDraftValue(player, npc, GUI_DRAFT_TIMER_SUFFIX, buildCurrentSettings(npc).timer));
    setGuiText(gui, CONFIG_INTERVAL_FIELD_ID, getGuiDraftValue(player, npc, GUI_DRAFT_INTERVAL_SUFFIX, buildCurrentSettings(npc).interval));
    setGuiText(gui, CONFIG_CHAT_FIELD_ID, getGuiDraftValue(player, npc, GUI_DRAFT_CHAT_SUFFIX, buildCurrentSettings(npc).chatMode));
    setGuiText(gui, CONFIG_DEBUG_FIELD_ID, getGuiDraftValue(player, npc, GUI_DRAFT_DEBUG_SUFFIX, buildCurrentSettings(npc).debug));
    setGuiText(gui, CONFIG_WHITELIST_FIELD_ID, getGuiDraftValue(player, npc, GUI_DRAFT_WHITELIST_SUFFIX, getManagerWhitelistText(npc)));
    loadDraftEntryIntoGui(player, npc, gui);
}

function saveConfigGuiDraft(player, npc, gui) {
    var npcId = resolveDraftNpcId(player, npc);
    upsertDraftEntryFromGui(player, npc, gui);
    putGuiDraftValueByNpcId(player, npcId, GUI_DRAFT_TIMER_SUFFIX, getGuiText(gui, CONFIG_TIMER_FIELD_ID));
    putGuiDraftValueByNpcId(player, npcId, GUI_DRAFT_INTERVAL_SUFFIX, getGuiText(gui, CONFIG_INTERVAL_FIELD_ID));
    putGuiDraftValueByNpcId(player, npcId, GUI_DRAFT_CHAT_SUFFIX, getGuiText(gui, CONFIG_CHAT_FIELD_ID));
    putGuiDraftValueByNpcId(player, npcId, GUI_DRAFT_DEBUG_SUFFIX, getGuiText(gui, CONFIG_DEBUG_FIELD_ID));
    putGuiDraftValueByNpcId(player, npcId, GUI_DRAFT_WHITELIST_SUFFIX, getGuiText(gui, CONFIG_WHITELIST_FIELD_ID));
}

function refreshCommandGuiState(gui, npc) {
    setGuiText(gui, COMMAND_STATUS_AREA_ID, buildCommandStatusText(npc));
}

function setCommandFeedback(gui, text) {
    setGuiText(gui, COMMAND_FEEDBACK_AREA_ID, text);
}

function runCycleToggleCommand(npc) {
    if (isCycleRunning(npc)) {
        pauseCycle(npc);
        return "Cycle paused.";
    }

    if (isCyclePaused(npc)) {
        if (!resumeCycle(npc)) {
            return "Resume failed. Check timer and interval.";
        }
        return "Cycle resumed.";
    }

    if (!startCycle(npc)) {
        return "Start failed. Check timer and interval.";
    }

    return "Cycle started.";
}

function ensureManagerDefaults(npc) {
    var data = npc.getStoreddata();
    if (!hasText(data.get(CONFIG_WHITELIST_KEY))) {
        data.put(CONFIG_WHITELIST_KEY, CONFIG_DEFAULT_MANAGER);
    }
}

function canManageNpc(npc, player) {
    var names = parseWhitelistNames(npc.getStoreddata().get(CONFIG_WHITELIST_KEY));
    var playerName = getPlayerName(player);
    for (var i = 0; i < names.length; i++) {
        if (names[i] == playerName) return true;
    }
    return false;
}

function getManagerWhitelistText(npc) {
    return normalizeWhitelistText(npc.getStoreddata().get(CONFIG_WHITELIST_KEY));
}

function parseWhitelistNames(text) {
    var clean = normalizeWhitelistText(text);
    return hasText(clean) ? clean.split(/\s+/) : [];
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

function ensureManagerKeys(player, npc) {
    var issued = [];
    if (!hasItemWithMarkerInInventory(player, npc, CONFIG_KEY_MARKER)) {
        if (giveReusableConfigKeyToPlayer(npc, player)) issued.push("config-key");
    }
    if (!hasItemWithMarkerInInventory(player, npc, COMMAND_KEY_MARKER)) {
        if (giveCommandKeyToPlayer(npc, player)) issued.push("command-key");
    }
    return issued;
}

function giveReusableConfigKeyToPlayer(npc, player) {
    var item = createSingleItemWithMetadata(
        "minecraft:tripwire_hook",
        CONFIG_KEY_MARKER,
        npc,
        "",
        "eConfig Key",
        [
            "Open config GUI.",
            "Whitelist only."
        ]
    );
    if (item == null || item.isEmpty()) return false;
    return giveItemToPlayer(player, item);
}

function giveCommandKeyToPlayer(npc, player) {
    var item = createSingleItemWithMetadata(
        "minecraft:iron_nugget",
        COMMAND_KEY_MARKER,
        npc,
        "",
        "6Command Key",
        [
            "Open command GUI.",
            "Shows logs."
        ]
    );
    if (item == null || item.isEmpty()) return false;
    return giveItemToPlayer(player, item);
}

function createSingleItemWithMetadata(itemId, marker, npc, token, name, loreLines) {
    try {
        var itemType = PM_BuiltInRegistries.ITEM.get(PM_ResourceLocation.parse(itemId));
        if (itemType == null) return null;

        var mcStack = new PM_MCItemStack(itemType);
        if (mcStack == null || mcStack.isEmpty()) return null;

        var tag = new PM_CompoundTag();
        tag.putString("config_type", marker);
        tag.putString("config_npc_id", "" + npc.getStoreddata().get(CONFIG_NPC_ID_KEY));
        if (hasText(token)) tag.putString("config_token", token);

        mcStack.set(PM_DataComponents.CUSTOM_DATA, PM_CustomData.of(tag));
        mcStack.set(PM_DataComponents.CUSTOM_NAME, PM_Component.literal(name));
        mcStack.set(PM_DataComponents.LORE, new PM_ItemLore(buildLore(loreLines)));

        var item = PM_NpcAPI.Instance().getIItemStack(mcStack);
        if (item == null || item.isEmpty()) return null;

        item.setStackSize(1);
        return item;
    } catch (e) {
        return null;
    }
}

function buildLore(lines) {
    var lore = new PM_ArrayList();
    for (var i = 0; i < lines.length; i++) {
        lore.add(PM_Component.literal(lines[i]));
    }
    return lore;
}

function isCommandKeyForNpc(item, npc) {
    return hasMatchingConfigMetadata(item, npc, COMMAND_KEY_MARKER);
}

function hasItemWithMarkerInInventory(player, npc, marker) {
    try {
        var held = player.getMainhandItem();
        if (hasMatchingConfigMetadata(held, npc, marker)) return true;

        var inv = player.getInventory();
        if (inv == null) return false;

        var size = inv.getSize();
        for (var i = 0; i < size; i++) {
            if (hasMatchingConfigMetadata(inv.getSlot(i), npc, marker)) return true;
        }
    } catch (e) {}

    return false;
}

function buildPokemonEntriesText(npc) {
    var entries = buildCurrentConfigEntries(npc);
    var lines = [];

    for (var i = 0; i < entries.length; i++) {
        lines.push(normalizeConfiguredSpecies(entries[i].species) + ": " + entries[i].multiplier);
    }

    return lines.join("\n");
}

function buildConfigSummaryText(player, npc, gui) {
    var entries = getConfigDraftEntries(player, npc);
    return "T=" + trimString(getGuiText(gui, CONFIG_TIMER_FIELD_ID))
        + " I=" + trimString(getGuiText(gui, CONFIG_INTERVAL_FIELD_ID))
        + " C=" + trimString(getGuiText(gui, CONFIG_CHAT_FIELD_ID))
        + " D=" + trimString(getGuiText(gui, CONFIG_DEBUG_FIELD_ID))
        + " W=" + normalizeWhitelistText(getGuiText(gui, CONFIG_WHITELIST_FIELD_ID))
        + " E=" + entries.length;
}

function setConfigStatus(gui, text) {
    setGuiText(gui, CONFIG_STATUS_AREA_ID, text);
}

function buildCommandStatusText(npc) {
    return [
        "Cycle state: " + (isCycleRunning(npc) ? "running" : (isCyclePaused(npc) ? "paused" : "stopped")),
        "Count mode: " + (isCountingModeEnabled(npc) ? "enabled" : "disabled"),
        "Registration mode: " + (isRegistrationModeEnabled(npc) ? "enabled" : "disabled"),
        "Participants: " + parseIntSafe(npc.getStoreddata().get(CYCLE_ENTRY_COUNT_KEY), 0)
    ].join("\n");
}

function buildLeaderboardSummaryText(npc) {
    var entries = buildLeaderboardEntries(npc);
    if (entries.length <= 0) return "Leaderboard is empty.";

    var lines = ["Leaderboard:"];
    var limit = Math.min(entries.length, 5);
    for (var i = 0; i < limit; i++) {
        lines.push((i + 1) + ". " + entries[i].player + " " + formatScore(entries[i].score));
    }
    return [
        lines.join("\n")
    ][0];
}

function buildGuiDraftKey(npc, suffix) {
    return GUI_DRAFT_PREFIX + npc.getStoreddata().get(CONFIG_NPC_ID_KEY) + "_" + suffix;
}

function buildGuiDraftKeyByNpcId(npcId, suffix) {
    return GUI_DRAFT_PREFIX + trimString(npcId) + "_" + suffix;
}

function getGuiDraftValue(player, npc, suffix, fallback) {
    try {
        var value = player.getStoreddata().get(buildGuiDraftKey(npc, suffix));
        if (!hasText(value)) return fallback;
        if (("" + value) == "null" || ("" + value) == "undefined") return fallback;
        return "" + value;
    } catch (e) {
        return fallback;
    }
}

function putGuiDraftValue(player, npc, suffix, value) {
    try {
        player.getStoreddata().put(buildGuiDraftKey(npc, suffix), value == null ? "" : ("" + value));
    } catch (e) {}
}

function putGuiDraftValueByNpcId(player, npcId, suffix, value) {
    if (!hasText(npcId)) return;
    try {
        player.getStoreddata().put(buildGuiDraftKeyByNpcId(npcId, suffix), value == null ? "" : ("" + value));
    } catch (e) {}
}

function getConfigDraftEntries(player, npc) {
    var text = getGuiDraftValue(player, npc, GUI_DRAFT_POKEMON_SUFFIX, buildPokemonEntriesText(npc));
    return parsePokemonPages([text], 0);
}

function setConfigDraftEntries(player, npc, entries) {
    var lines = [];
    for (var i = 0; i < entries.length; i++) {
        lines.push(normalizeConfiguredSpecies(entries[i].species) + ": " + normalizeMultiplier(entries[i].multiplier));
    }
    putGuiDraftValue(player, npc, GUI_DRAFT_POKEMON_SUFFIX, lines.join("\n"));
}

function getConfigDraftIndex(player, npc, entries) {
    var max = entries.length <= 0 ? 0 : (entries.length - 1);
    var index = parseIntSafe(getGuiDraftValue(player, npc, GUI_DRAFT_ENTRY_INDEX_SUFFIX, "0"), 0);
    if (index < 0) index = 0;
    if (index > max) index = max;
    return index;
}

function setConfigDraftIndex(player, npc, index) {
    putGuiDraftValue(player, npc, GUI_DRAFT_ENTRY_INDEX_SUFFIX, "" + Math.max(0, index));
}

function loadDraftEntryIntoGui(player, npc, gui) {
    var entries = getConfigDraftEntries(player, npc);
    var index = getConfigDraftIndex(player, npc, entries);

    if (entries.length <= 0) {
        setGuiText(gui, CONFIG_SPECIES_FIELD_ID, "");
        setGuiText(gui, CONFIG_MULTIPLIER_FIELD_ID, "");
        setGuiText(gui, CONFIG_STATUS_AREA_ID, "Entry 0 / 0");
        return;
    }

    setGuiText(gui, CONFIG_SPECIES_FIELD_ID, entries[index].species);
    setGuiText(gui, CONFIG_MULTIPLIER_FIELD_ID, entries[index].multiplier);
    setGuiText(gui, CONFIG_STATUS_AREA_ID, "Entry " + (index + 1) + " / " + entries.length);
}

function upsertDraftEntryFromGui(player, npc, gui) {
    var species = normalizeConfiguredSpecies(getGuiText(gui, CONFIG_SPECIES_FIELD_ID));
    var multiplier = trimString(getGuiText(gui, CONFIG_MULTIPLIER_FIELD_ID));
    var entries = getConfigDraftEntries(player, npc);
    var index = getConfigDraftIndex(player, npc, entries);

    if (!hasText(species) && !hasText(multiplier)) {
        setGuiText(gui, CONFIG_STATUS_AREA_ID, entries.length <= 0 ? "Entry 0 / 0" : ("Entry " + (index + 1) + " / " + entries.length));
        return true;
    }

    if (!hasText(species) || !hasText(multiplier)) return false;
    if (parseFloatSafe(multiplier, 0) <= 0) return false;

    if (entries.length <= 0 || index >= entries.length) {
        entries.push({
            species: species,
            multiplier: normalizeMultiplier(multiplier)
        });
        index = entries.length - 1;
    } else {
        entries[index] = {
            species: species,
            multiplier: normalizeMultiplier(multiplier)
        };
    }

    setConfigDraftEntries(player, npc, entries);
    setConfigDraftIndex(player, npc, index);
    loadDraftEntryIntoGui(player, npc, gui);
    return true;
}

function deleteDraftEntryFromGui(player, npc, gui) {
    var entries = getConfigDraftEntries(player, npc);
    if (entries.length <= 0) {
        setConfigStatus(gui, "Entry list is empty.");
        return;
    }

    var index = getConfigDraftIndex(player, npc, entries);
    entries.splice(index, 1);
    if (index >= entries.length) index = Math.max(0, entries.length - 1);

    setConfigDraftEntries(player, npc, entries);
    setConfigDraftIndex(player, npc, index);
    loadDraftEntryIntoGui(player, npc, gui);
    setConfigStatus(gui, "Entry deleted.");
}

function createNewDraftEntry(player, npc, gui) {
    var entries = getConfigDraftEntries(player, npc);
    var index = entries.length;
    setConfigDraftIndex(player, npc, index);
    setGuiText(gui, CONFIG_SPECIES_FIELD_ID, "");
    setGuiText(gui, CONFIG_MULTIPLIER_FIELD_ID, "");
    setConfigStatus(gui, "Entry " + (index + 1) + " / " + entries.length + " (new)");
}

function moveDraftEntryCursor(player, npc, gui, delta) {
    if (!upsertDraftEntryFromGui(player, npc, gui)) {
        setConfigStatus(gui, "Fix current entry before switching.");
        return;
    }

    var entries = getConfigDraftEntries(player, npc);
    if (entries.length <= 0) {
        setConfigStatus(gui, "Entry list is empty.");
        return;
    }

    var index = getConfigDraftIndex(player, npc, entries) + delta;
    if (index < 0) index = 0;
    if (index >= entries.length) index = entries.length - 1;
    setConfigDraftIndex(player, npc, index);
    loadDraftEntryIntoGui(player, npc, gui);
    setConfigStatus(gui, "Viewing entry " + (index + 1) + " / " + entries.length + ".");
}

function resolveDraftNpcId(player, npc) {
    try {
        if (npc != null) {
            var npcId = "" + npc.getStoreddata().get(CONFIG_NPC_ID_KEY);
            if (hasText(npcId)) return npcId;
        }
    } catch (e1) {}

    try {
        return "" + player.getStoreddata().get(ACTIVE_GUI_NPC_ID_KEY);
    } catch (e2) {
        return "";
    }
}

function resolveGuiNpc(player, npc) {
    if (npc != null) return npc;

    if (ACTIVE_GUI_NPC_CACHE != null) return ACTIVE_GUI_NPC_CACHE;

    try {
        var tempNpc = player.getTempdata().get(ACTIVE_GUI_NPC_REF_KEY);
        if (tempNpc != null) return tempNpc;
    } catch (e) {}

    return null;
}

function rememberActiveNpc(npc) {
    if (npc == null) return;
    ACTIVE_GUI_NPC_CACHE = npc;
}

function hasAnyTextInConfigGui(gui) {
    return hasText(getGuiText(gui, CONFIG_TIMER_FIELD_ID))
        || hasText(getGuiText(gui, CONFIG_INTERVAL_FIELD_ID))
        || hasText(getGuiText(gui, CONFIG_CHAT_FIELD_ID))
        || hasText(getGuiText(gui, CONFIG_DEBUG_FIELD_ID))
        || hasText(getGuiText(gui, CONFIG_WHITELIST_FIELD_ID))
        || hasText(getGuiText(gui, CONFIG_SPECIES_FIELD_ID))
        || hasText(getGuiText(gui, CONFIG_MULTIPLIER_FIELD_ID));
}

function getGuiScrollSelectedIndex(scroll) {
    try {
        var selection = scroll.getSelection();
        if (selection != null && selection.length != null && selection.length > 0) {
            return selection[0];
        }
    } catch (e) {}

    try {
        var selection2 = scroll.selection;
        if (selection2 != null && selection2.length != null && selection2.length > 0) {
            return selection2[0];
        }
    } catch (e2) {}

    return -1;
}

function getGuiText(gui, componentId) {
    try {
        var comp = gui.getComponent(componentId);
        if (comp == null) return "";
        if (comp.getText != null) return "" + comp.getText();
    } catch (e1) {}

    try {
        var comp2 = gui.getComponent(componentId);
        if (comp2 != null && comp2.text != null) return "" + comp2.text;
    } catch (e2) {}

    return "";
}

function setGuiText(gui, componentId, text) {
    try {
        var comp = gui.getComponent(componentId);
        if (comp != null && comp.setText != null) {
            comp.setText(text == null ? "" : ("" + text));
            return true;
        }
    } catch (e) {}

    return false;
}

function safeUpdateGui(gui) {
    try {
        gui.update();
        return true;
    } catch (e) {
        return false;
    }
}

function handleRegistrationJoin(event, npc, player) {
    var playerName = getPlayerName(player);
    if (findParticipantIndex(npc, playerName) !== -1) {
        player.message("e    .");
        cancelInteraction(event, player);
        return;
    }

    addParticipantEntry(npc, playerName);

    if (!giveParticipantLeafToPlayer(npc, player)) {
        removeParticipantEntry(npc, playerName);
        player.message("c    .");
        cancelInteraction(event, player);
        return;
    }

    announceByMode(npc, " " + playerName + "   .");
    player.message("a   .");
    cancelInteraction(event, player);
}

function handleParticipantLeafUse(event, npc, player, item) {
    if (!isParticipantLeafOwnedByPlayer(item, player)) {
        player.message("c     .");
        cancelInteraction(event, player);
        return;
    }

    if (isCountingModeEnabled(npc)) {
        handleParticipantScoring(event, npc, player);
        return;
    }

    if (isRegistrationModeEnabled(npc)) {
        handleParticipantRemoval(event, npc, player, item);
        return;
    }

    player.message("e    .");
    cancelInteraction(event, player);
}

function handleParticipantRemoval(event, npc, player, item) {
    var playerName = getPlayerName(player);
    if (findParticipantIndex(npc, playerName) === -1) {
        player.message("You are not registered.");
        cancelInteraction(event, player);
        return;
    }

    removeParticipantEntry(npc, playerName);
    consumeMainhandItem(player, item);
    announceByMode(npc, playerName + " left the event.");
    player.message("You left the event.");
    cancelInteraction(event, player);
}

function handleParticipantScoring(event, npc, player) {
    var playerName = getPlayerName(player);
    if (findParticipantIndex(npc, playerName) === -1) {
        player.message("You are not registered.");
        cancelInteraction(event, player);
        return;
    }

    var result = collectConfiguredPokemonScore(player, npc);
    if (result.pcount <= 0) {
        player.message("No configured Pokemon found.");
        cancelInteraction(event, player);
        return;
    }

    addParticipantScore(npc, playerName, result.score, result.pcount);
    announceByMode(npc, playerName + " scored " + formatScore(result.score) + ".");
    player.message("Pokemon counted: " + result.pcount);
    player.message("Score added: " + formatScore(result.score));
    cancelInteraction(event, player);
}

function ensureNpcConfigId(npc) {
    var data = npc.getStoreddata();
    if (!hasText(data.get(CONFIG_NPC_ID_KEY))) {
        data.put(CONFIG_NPC_ID_KEY, createToken());
    }
    ensureBaseTitle(npc);
}

function ensureCycleDefaults(npc) {
    var data = npc.getStoreddata();
    if (!hasText(data.get(CYCLE_RUNNING_KEY))) data.put(CYCLE_RUNNING_KEY, "0");
    if (!hasText(data.get(CYCLE_PAUSED_KEY))) data.put(CYCLE_PAUSED_KEY, "0");
    if (!hasText(data.get(CYCLE_END_MS_KEY))) data.put(CYCLE_END_MS_KEY, "0");
    if (!hasText(data.get(CYCLE_INTERVAL_MS_KEY))) data.put(CYCLE_INTERVAL_MS_KEY, "0");
    if (!hasText(data.get(CYCLE_NEXT_NOTICE_MS_KEY))) data.put(CYCLE_NEXT_NOTICE_MS_KEY, "0");
    if (!hasText(data.get(CYCLE_STARTED_MS_KEY))) data.put(CYCLE_STARTED_MS_KEY, "0");
    if (!hasText(data.get(CYCLE_REMAINING_MS_KEY))) data.put(CYCLE_REMAINING_MS_KEY, "0");
    if (!hasText(data.get(CYCLE_ENTRY_COUNT_KEY))) data.put(CYCLE_ENTRY_COUNT_KEY, "0");
    if (!hasText(data.get(COUNTING_MODE_KEY))) data.put(COUNTING_MODE_KEY, "0");
    if (!hasText(data.get(REGISTRATION_MODE_KEY))) data.put(REGISTRATION_MODE_KEY, "0");
}

function parsePokemonPages(pages, startIndex) {
    var entries = [];
    var seen = {};

    for (var p = startIndex; p < pages.length; p++) {
        var lines = splitPageLines(pages[p]);
        for (var i = 0; i < lines.length; i++) {
            var line = trimString(lines[i]);
            if (!hasText(line)) continue;

            var match = line.match(/^([a-z0-9_\-.:]+)\s*(?:=|:|x|\*)\s*(\d+(?:[.,]\d+)?)$/i);
            if (match == null) continue;

            var species = normalizeConfiguredSpecies(match[1]);
            var multiplier = parseFloatSafe(match[2], 0);
            if (species == "pokemon" || species == "modid:pokemon") continue;
            if (!hasText(species) || multiplier <= 0) continue;
            if (seen[species]) continue;

            seen[species] = true;
            entries.push({
                species: species,
                multiplier: normalizeMultiplier(multiplier)
            });
        }
    }

    return entries;
}

function applyParsedConfig(npc, parsedConfig, player) {
    applySettings(npc, parsedConfig.settings);
    applyConfigEntries(npc, parsedConfig.pokemonEntries, player);
}

function applySettings(npc, settings) {
    var data = npc.getStoreddata();
    data.put(CONFIG_TIMER_KEY, settings.timer);
    data.put(CONFIG_INTERVAL_KEY, settings.interval);
    data.put(CONFIG_CHAT_MODE_KEY, settings.chatMode);
    data.put(CONFIG_DEBUG_KEY, settings.debug);
}

function applyConfigEntries(npc, entries, player) {
    var data = npc.getStoreddata();
    var oldCount = parseIntSafe(data.get(CONFIG_COUNT_KEY), 0);

    for (var i = 0; i < oldCount; i++) {
        data.remove(CONFIG_SPECIES_KEY_PREFIX + i);
        data.remove(CONFIG_MULTIPLIER_KEY_PREFIX + i);
    }

    for (var j = 0; j < entries.length; j++) {
        data.put(CONFIG_SPECIES_KEY_PREFIX + j, normalizeConfiguredSpecies(entries[j].species));
        data.put(CONFIG_MULTIPLIER_KEY_PREFIX + j, "" + entries[j].multiplier);
    }

    data.put(CONFIG_COUNT_KEY, "" + entries.length);
    data.put(CONFIG_OWNER_KEY, getPlayerName(player));
}

function buildCurrentConfigEntries(npc) {
    var data = npc == null ? null : npc.getStoreddata();
    var count = data == null ? 0 : parseIntSafe(data.get(CONFIG_COUNT_KEY), 0);
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

function isConfigKeyForNpc(item, npc) {
    return hasMatchingConfigMetadata(item, npc, CONFIG_KEY_MARKER);
}

function hasMatchingConfigMetadata(item, npc, expectedType) {
    if (item == null || item.isEmpty()) return false;

    try {
        var mcStack = item.getMCItemStack();
        var customData = mcStack.get(PM_DataComponents.CUSTOM_DATA);
        if (customData == null) return false;

        var tag = customData.copyTag();
        var configType = "" + tag.getString("config_type");
        var npcId = "" + tag.getString("config_npc_id");
        return configType == expectedType && npcId == ("" + npc.getStoreddata().get(CONFIG_NPC_ID_KEY));
    } catch (e) {
        return false;
    }
}

function readCustomString(item, key) {
    try {
        var customData = item.getMCItemStack().get(PM_DataComponents.CUSTOM_DATA);
        if (customData == null) return "";
        return "" + customData.copyTag().getString(key);
    } catch (e) {
        return "";
    }
}

function splitPageLines(pageText) {
    var out = [];
    var split = ("" + pageText).split(/\r?\n/);
    for (var i = 0; i < split.length; i++) {
        var line = trimString(split[i]);
        if (hasText(line)) out.push(line);
    }
    return out;
}

function startCycle(npc) {
    var settings = buildCurrentSettings(npc);
    var timerMs = parseDurationToMs(settings.timer);
    var intervalMs = parseDurationToMs(settings.interval);
    if (timerMs <= 0 || intervalMs <= 0) return false;

    var now = getNowMs();
    var data = npc.getStoreddata();
    data.put(CYCLE_RUNNING_KEY, "1");
    data.put(CYCLE_PAUSED_KEY, "0");
    data.put(CYCLE_STARTED_MS_KEY, "" + now);
    data.put(CYCLE_END_MS_KEY, "" + (now + timerMs));
    data.put(CYCLE_INTERVAL_MS_KEY, "" + intervalMs);
    data.put(CYCLE_NEXT_NOTICE_MS_KEY, "" + (now + intervalMs));
    data.put(CYCLE_REMAINING_MS_KEY, "" + timerMs);
    setTimerDisplay(npc, formatDurationMs(timerMs));
    announceByMode(npc, "Cycle started: " + formatDurationMs(timerMs));

    try {
        npc.timers.forceStart(CONTROL_TIMER_ID, 20, true);
    } catch (e) {}
    return true;
}

function stopCycle(npc) {
    var data = npc.getStoreddata();
    data.put(CYCLE_RUNNING_KEY, "0");
    data.put(CYCLE_PAUSED_KEY, "0");
    data.put(CYCLE_END_MS_KEY, "0");
    data.put(CYCLE_INTERVAL_MS_KEY, "0");
    data.put(CYCLE_NEXT_NOTICE_MS_KEY, "0");
    data.put(CYCLE_STARTED_MS_KEY, "0");
    data.put(CYCLE_REMAINING_MS_KEY, "0");
    restoreBaseTitle(npc);

    try {
        npc.timers.stop(CONTROL_TIMER_ID);
    } catch (e) {}
}

function finishCycle(npc) {
    announceByMode(npc, "Cycle finished.");
    stopCycle(npc);
}

function resetCycleState(npc) {
    stopCycle(npc);
    clearCycleEntries(npc);
}

function clearCycleEntries(npc) {
    var data = npc.getStoreddata();
    var count = parseIntSafe(data.get(CYCLE_ENTRY_COUNT_KEY), 0);
    for (var i = 0; i < count; i++) {
        data.remove(CYCLE_PLAYER_PREFIX + i);
        data.remove(CYCLE_SCORE_PREFIX + i);
        data.remove(CYCLE_PCOUNT_PREFIX + i);
    }
    data.put(CYCLE_ENTRY_COUNT_KEY, "0");
}

function clearParticipantEntries(npc) {
    clearCycleEntries(npc);
}

function isCycleRunning(npc) {
    return trimString(npc.getStoreddata().get(CYCLE_RUNNING_KEY)) == "1";
}

function isCyclePaused(npc) {
    return trimString(npc.getStoreddata().get(CYCLE_PAUSED_KEY)) == "1";
}

function isCountingModeEnabled(npc) {
    return trimString(npc.getStoreddata().get(COUNTING_MODE_KEY)) == "1";
}

function setCountingMode(npc, enabled) {
    npc.getStoreddata().put(COUNTING_MODE_KEY, enabled ? "1" : "0");
}

function isRegistrationModeEnabled(npc) {
    return trimString(npc.getStoreddata().get(REGISTRATION_MODE_KEY)) == "1";
}

function setRegistrationMode(npc, enabled) {
    npc.getStoreddata().put(REGISTRATION_MODE_KEY, enabled ? "1" : "0");
}

function pauseCycle(npc) {
    var data = npc.getStoreddata();
    var now = getNowMs();
    var endMs = parseIntSafe(data.get(CYCLE_END_MS_KEY), 0);
    var remainingMs = Math.max(0, endMs - now);

    data.put(CYCLE_RUNNING_KEY, "0");
    data.put(CYCLE_PAUSED_KEY, "1");
    data.put(CYCLE_REMAINING_MS_KEY, "" + remainingMs);
    data.put(CYCLE_END_MS_KEY, "0");
    data.put(CYCLE_NEXT_NOTICE_MS_KEY, "0");
    setTimerDisplay(npc, formatDurationMs(remainingMs));

    try {
        npc.timers.stop(CONTROL_TIMER_ID);
    } catch (e) {}
}

function resumeCycle(npc) {
    var data = npc.getStoreddata();
    var remainingMs = parseIntSafe(data.get(CYCLE_REMAINING_MS_KEY), 0);
    var intervalMs = parseIntSafe(data.get(CYCLE_INTERVAL_MS_KEY), 0);
    if (remainingMs <= 0 || intervalMs <= 0) return false;

    var now = getNowMs();
    data.put(CYCLE_RUNNING_KEY, "1");
    data.put(CYCLE_PAUSED_KEY, "0");
    data.put(CYCLE_STARTED_MS_KEY, "" + now);
    data.put(CYCLE_END_MS_KEY, "" + (now + remainingMs));
    data.put(CYCLE_NEXT_NOTICE_MS_KEY, "" + (now + intervalMs));
    setTimerDisplay(npc, formatDurationMs(remainingMs));
    announceByMode(npc, "Cycle resumed: " + formatDurationMs(remainingMs));

    try {
        npc.timers.forceStart(CONTROL_TIMER_ID, 20, true);
    } catch (e) {}
    return true;
}

function buildLeaderboardEntries(npc) {
    var data = npc.getStoreddata();
    var count = parseIntSafe(data.get(CYCLE_ENTRY_COUNT_KEY), 0);
    var entries = [];

    for (var i = 0; i < count; i++) {
        var playerName = trimString(data.get(CYCLE_PLAYER_PREFIX + i));
        if (!hasText(playerName)) continue;

        entries.push({
            player: playerName,
            score: parseIntSafe(data.get(CYCLE_SCORE_PREFIX + i), 0),
            pcount: parseIntSafe(data.get(CYCLE_PCOUNT_PREFIX + i), 0)
        });
    }

    entries.sort(function(a, b) {
        if (b.score != a.score) return b.score - a.score;
        return b.pcount - a.pcount;
    });

    return entries;
}

function teleportParticipantsToNpc(npc) {
    var entries = buildLeaderboardEntries(npc);
    var world = npc.getWorld();
    if (world == null) return 0;

    var teleported = 0;
    for (var i = 0; i < entries.length; i++) {
        try {
            var participant = world.getPlayer(entries[i].player);
            if (participant == null) continue;

            participant.setPosition(npc.getX(), npc.getY(), npc.getZ());
            teleported++;
        } catch (e) {}
    }

    return teleported;
}

function announceByMode(npc, message) {
    var settings = buildCurrentSettings(npc);
    if (settings.chatMode == "local") {
        sayLocal(npc, message);
        return;
    }

    if (!runBroadcastCommand(npc, message)) {
        try {
            npc.say(message);
        } catch (e) {}
    }
}

function runBroadcastCommand(npc, message) {
    var command = "bc " + sanitizeBroadcastText(message);
    var serverOutput = tryServerCommand(npc, command);
    if (serverOutput != null) {
        return true;
    }

    return false;
}

function tryServerCommand(npc, command) {
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

        var server = npc.getMCEntity().level().getServer();
        var source = server.createCommandSourceStack()
            .withSource(new CapturingSource())
            .withPermission(4);

        server.getCommands().performPrefixedCommand(source, stripLeadingSlash(command));
        return outputs.isEmpty() ? "" : "" + outputs.get(0);
    } catch (e) {
        return null;
    }
}

function sayLocal(npc, message) {
    try {
        var players = npc.getWorld().getAllPlayers();
        if (players == null) return;

        for (var i = 0; i < players.length; i++) {
            var player = players[i];
            if (player == null) continue;
            if (!isWithinLocalRange(npc, player, 20)) continue;
            try {
                npc.sayTo(player, message);
            } catch (e1) {}
        }
    } catch (e) {}
}

function isWithinLocalRange(npc, player, range) {
    try {
        var dx = npc.getX() - player.getX();
        var dy = npc.getY() - player.getY();
        var dz = npc.getZ() - player.getZ();
        return (dx * dx + dy * dy + dz * dz) <= (range * range);
    } catch (e) {
        return false;
    }
}

function sanitizeBroadcastText(text) {
    return trimString(("" + text).replace(/[\r\n]+/g, " "));
}

function stripLeadingSlash(command) {
    var cmd = trimString(command);
    if (cmd.indexOf("/") === 0) {
        return cmd.substring(1);
    }
    return cmd;
}

function giveItemToPlayer(player, item) {
    var given = false;

    try {
        given = player.giveItem(item);
    } catch (e) {}

    if (!given) {
        given = putInFirstEmptySlot(player, item);
    }

    return given;
}

function putInFirstEmptySlot(player, item) {
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
    } catch (e) {}

    return false;
}

function consumeMainhandItem(player, item) {
    try {
        var size = item.getStackSize();
        if (size > 1) {
            item.setStackSize(size - 1);
        } else {
            player.getMCEntity().setItemInHand(
                PM_InteractionHand.MAIN_HAND,
                new PM_MCItemStack(PM_Items.AIR)
            );
        }
        player.updatePlayerInventory();
    } catch (e) {}
}

function cancelInteraction(event, player) {
    try {
        event.setCanceled(true);
    } catch (e) {}

    try {
        player.closeGui();
    } catch (e2) {}
}

function cancelInteractionOnly(event) {
    try {
        event.setCanceled(true);
    } catch (e) {}
}

function createToken() {
    try {
        return "" + PM_UUID.randomUUID();
    } catch (e) {
        return "token_" + new Date().getTime();
    }
}

function getPlayerName(player) {
    try {
        return "" + player.getName();
    } catch (e) {
        return "" + player.getDisplayName();
    }
}

function buildCurrentSettings(npc) {
    if (npc == null) {
        return {
            timer: "00:00:00",
            interval: "00:00:00",
            chatMode: "local",
            debug: "false"
        };
    }

    var data = npc.getStoreddata();
    return {
        timer: readStoredOrDefault(data, CONFIG_TIMER_KEY, "00:00:00"),
        interval: readStoredOrDefault(data, CONFIG_INTERVAL_KEY, "00:00:00"),
        chatMode: readStoredOrDefault(data, CONFIG_CHAT_MODE_KEY, "local"),
        debug: readStoredOrDefault(data, CONFIG_DEBUG_KEY, "false")
    };
}

function extractNamedValue(line, names) {
    var lower = line.toLowerCase();
    for (var i = 0; i < names.length; i++) {
        var name = names[i].toLowerCase();
        if (lower.indexOf(name) !== 0) continue;

        var value = trimString(line.substring(names[i].length));
        value = value.replace(/^[:=-]\s*/, "");
        return trimString(value);
    }
    return "";
}

function normalizeChatMode(value) {
    var lower = trimString(value).toLowerCase();
    if (lower == "local") return "local";
    return "global";
}

function normalizeTrueFalse(value) {
    var lower = trimString(value).toLowerCase();
    if (lower == "true" || lower == "yes" || lower == "1") return "true";
    return "false";
}

function isDebugEnabled(npc) {
    return buildCurrentSettings(npc).debug == "true";
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

function getNowMs() {
    return new Date().getTime();
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

function ensureBaseTitle(npc) {
    try {
        var data = npc.getStoreddata();
        if (hasText(data.get(DISPLAY_BASE_TITLE_KEY))) return;

        var title = "" + npc.getDisplay().getTitle();
        data.put(DISPLAY_BASE_TITLE_KEY, title);
    } catch (e) {}
}

function setTimerDisplay(npc, text) {
    try {
        ensureBaseTitle(npc);
        npc.getDisplay().setTitle(trimString(text));
        npc.updateClient();
    } catch (e) {}
}

function restoreBaseTitle(npc) {
    try {
        var baseTitle = "" + npc.getStoreddata().get(DISPLAY_BASE_TITLE_KEY);
        npc.getDisplay().setTitle(baseTitle);
        npc.updateClient();
    } catch (e) {}
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

function normalizeConfiguredSpecies(value) {
    var species = trimString(value).toLowerCase();
    if (!hasText(species)) return "";

    var colonIndex = species.indexOf(":");
    if (colonIndex >= 0) {
        species = trimString(species.substring(colonIndex + 1));
    }

    return species;
}

function handleRegistrationJoin(event, npc, player) {
    var playerName = getPlayerName(player);
    if (findParticipantIndex(npc, playerName) !== -1) {
        if (hasParticipantLeaf(player, npc, playerName)) {
            player.message("You are already registered.");
        } else if (giveParticipantLeafToPlayer(npc, player)) {
            player.message("You are registered. Leaf restored.");
        } else {
            player.message("You are registered, but leaf restore failed.");
        }
        cancelInteraction(event, player);
        return;
    }

    addParticipantEntry(npc, playerName);
    if (!giveParticipantLeafToPlayer(npc, player)) {
        removeParticipantEntry(npc, playerName);
        player.message("Registration failed.");
        cancelInteraction(event, player);
        return;
    }

    announceByMode(npc, playerName + " joined the event.");
    player.message("Registration complete.");
    cancelInteraction(event, player);
}

function giveParticipantLeafToPlayer(npc, player) {
    var item = createParticipantLeafItem(npc, player);
    if (item == null || item.isEmpty()) return false;
    return giveItemToPlayer(player, item);
}

function createParticipantLeafItem(npc, player) {
    try {
        var item = createSingleItemWithMetadata(
            "minecraft:paper",
            CONFIG_PARTICIPANT_LEAF_MARKER,
            npc,
            "",
            "a ",
            buildParticipantLeafLore(npc)
        );
        if (item == null || item.isEmpty()) return null;

        var mcStack = item.getMCItemStack();
        var customData = mcStack.get(PM_DataComponents.CUSTOM_DATA);
        if (customData == null) return item;

        var tag = customData.copyTag();
        tag.putString("participant_name", getPlayerName(player));
        mcStack.set(PM_DataComponents.CUSTOM_DATA, PM_CustomData.of(tag));
        return PM_NpcAPI.Instance().getIItemStack(mcStack);
    } catch (e) {
        return null;
    }
}

function buildParticipantLeafLore(npc) {
    var lore = [
        "   .",
        "  NPC   : .",
        "  NPC   :  .",
        " :"
    ];
    var entries = buildCurrentConfigEntries(npc);

    if (entries.length == 0) {
        lore.push(" -   ");
        return lore;
    }

    for (var i = 0; i < entries.length; i++) {
        lore.push(" - " + normalizeConfiguredSpecies(entries[i].species) + ": x" + entries[i].multiplier);
    }

    return lore;
}

function isParticipantLeafForNpc(item, npc) {
    return hasMatchingConfigMetadata(item, npc, CONFIG_PARTICIPANT_LEAF_MARKER);
}

function isParticipantLeafOwnedByPlayer(item, player) {
    return readCustomString(item, "participant_name") == getPlayerName(player);
}

function hasParticipantLeaf(player, npc, playerName) {
    try {
        var held = player.getMainhandItem();
        if (isParticipantLeafForNpc(held, npc) && readCustomString(held, "participant_name") == playerName) {
            return true;
        }

        var inv = player.getInventory();
        if (inv == null) return false;

        var size = inv.getSize();
        for (var i = 0; i < size; i++) {
            var item = inv.getSlot(i);
            if (!isParticipantLeafForNpc(item, npc)) continue;
            if (readCustomString(item, "participant_name") == playerName) return true;
        }
    } catch (e) {}

    return false;
}

function findParticipantIndex(npc, playerName) {
    var data = npc.getStoreddata();
    var count = parseIntSafe(data.get(CYCLE_ENTRY_COUNT_KEY), 0);

    for (var i = 0; i < count; i++) {
        if (trimString(data.get(CYCLE_PLAYER_PREFIX + i)) == playerName) return i;
    }

    return -1;
}

function addParticipantEntry(npc, playerName) {
    var data = npc.getStoreddata();
    var index = parseIntSafe(data.get(CYCLE_ENTRY_COUNT_KEY), 0);
    data.put(CYCLE_PLAYER_PREFIX + index, playerName);
    data.put(CYCLE_SCORE_PREFIX + index, "0");
    data.put(CYCLE_PCOUNT_PREFIX + index, "0");
    data.put(CYCLE_ENTRY_COUNT_KEY, "" + (index + 1));
}

function removeParticipantEntry(npc, playerName) {
    var data = npc.getStoreddata();
    var count = parseIntSafe(data.get(CYCLE_ENTRY_COUNT_KEY), 0);
    var index = findParticipantIndex(npc, playerName);
    if (index < 0) return false;

    for (var i = index; i < count - 1; i++) {
        data.put(CYCLE_PLAYER_PREFIX + i, "" + data.get(CYCLE_PLAYER_PREFIX + (i + 1)));
        data.put(CYCLE_SCORE_PREFIX + i, "" + data.get(CYCLE_SCORE_PREFIX + (i + 1)));
        data.put(CYCLE_PCOUNT_PREFIX + i, "" + data.get(CYCLE_PCOUNT_PREFIX + (i + 1)));
    }

    if (count > 0) {
        data.remove(CYCLE_PLAYER_PREFIX + (count - 1));
        data.remove(CYCLE_SCORE_PREFIX + (count - 1));
        data.remove(CYCLE_PCOUNT_PREFIX + (count - 1));
        data.put(CYCLE_ENTRY_COUNT_KEY, "" + (count - 1));
    }

    return true;
}

function addParticipantScore(npc, playerName, scoreToAdd, pcountToAdd) {
    var data = npc.getStoreddata();
    var index = findParticipantIndex(npc, playerName);
    if (index < 0) return false;

    var currentScore = parseFloatSafe(data.get(CYCLE_SCORE_PREFIX + index), 0);
    var currentPcount = parseIntSafe(data.get(CYCLE_PCOUNT_PREFIX + index), 0);
    data.put(CYCLE_SCORE_PREFIX + index, normalizeMultiplier(currentScore + scoreToAdd));
    data.put(CYCLE_PCOUNT_PREFIX + index, "" + (currentPcount + pcountToAdd));
    return true;
}

function collectConfiguredPokemonScore(player, npc) {
    var multipliers = buildConfigMultiplierMap(npc);
    var result = {
        score: 0,
        pcount: 0
    };

    try {
        var inv = player.getInventory();
        if (inv == null) return result;

        var size = inv.getSize();
        for (var i = 0; i < size; i++) {
            var item = inv.getSlot(i);
            var pokemon = extractPokemonFromItem(item);
            if (pokemon == null) continue;

            var species = normalizeConfiguredSpecies(pokemon.getSpecies().getResourceIdentifier());
            if (!multipliers.hasOwnProperty(species)) continue;

            result.score += sumPokemonIvs(pokemon) * multipliers[species];
            result.pcount += Math.max(1, item.getStackSize());
            clearInventorySlot(player, i);
        }

        player.updatePlayerInventory();
    } catch (e) {}

    result.score = parseFloatSafe(normalizeMultiplier(result.score), 0);
    return result;
}

function buildConfigMultiplierMap(npc) {
    var entries = buildCurrentConfigEntries(npc);
    var out = {};

    for (var i = 0; i < entries.length; i++) {
        out[normalizeConfiguredSpecies(entries[i].species)] = parseFloatSafe(entries[i].multiplier, 0);
    }

    return out;
}

function extractPokemonFromItem(item) {
    if (item == null || item.isEmpty()) return null;

    try {
        var mcStack = item.getMCItemStack();
        var itemId = String(PM_BuiltInRegistries.ITEM.getKey(mcStack.getItem()));
        if (itemId != "cubixcobblemon:pokemon") return null;

        var component = mcStack.get(PM_CubixCobblemonDataComponents.INSTANCE.getPOKEMON().get());
        if (component == null) return null;

        var optionalPokemon = component.getPokemon();
        if (optionalPokemon == null || !optionalPokemon.isPresent()) return null;
        return optionalPokemon.get();
    } catch (e) {
        return null;
    }
}

function sumPokemonIvs(pokemon) {
    try {
        var ivs = pokemon.getIvs();
        if (ivs == null) return 0;

        var sum = 0;
        for (var i = 0; i < IV_STAT_ORDER.length; i++) {
            sum += parseIntSafe(ivs.get(IV_STAT_ORDER[i]), 0);
        }
        return sum;
    } catch (e) {
        return 0;
    }
}

function clearInventorySlot(player, slotIndex) {
    try {
        player.getInventory().setSlot(
            slotIndex,
            PM_NpcAPI.Instance().getIItemStack(new PM_MCItemStack(PM_Items.AIR))
        );
    } catch (e) {}
}

function buildLeaderboardEntries(npc) {
    var data = npc.getStoreddata();
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

function formatScore(value) {
    return normalizeMultiplier(parseFloatSafe(value, 0));
}
