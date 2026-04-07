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

var LINKER_TYPE = "pokemon_catch_linker";
var LINKED_CONFIG_UUID_KEY = "pokemon_catch_linked_config_uuid";
var LINKED_COMMAND_UUID_KEY = "pokemon_catch_linked_command_uuid";
var SUB_MAIN_UUID_KEY = "pokemon_catch_local_main_uuid";
var TICKET_ITEM_TYPE = "pokemon_catch_ticket";
var TICKET_TEMPLATE_TEMP_KEY = "pokemon_catch_ticket_template_stack";
var TICKET_NAME = "Event Ticket";
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
var DISPLAY_BASE_TITLE_KEY = "pokemon_multiplier_display_base_title";

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

    ensureCycleDefaults(npc);
    ensureBaseTitle(npc);
    ensureManagerDefaults(npc);

    if (isParticipantTicketForNpc(item, npc)) {
        handleParticipantTicketUse(event, npc, player, item);
        return;
    }

    if (isLinkerForMain(item, npc)) {
        handleReturnedLinker(event, npc, player, item);
        return;
    }

    if (isRegistrationModeEnabled(npc)) {
        handleRegistrationJoin(event, npc, player);
        return;
    }

    cancelInteractionOnly(event);
    cancelInteractionOnly(event);
}

function handleReturnedLinker(event, npc, player, item) {
    if (!bindFromLinker(npc, item)) {
        player.message("Invalid linker.");
        cancelInteractionOnly(event);
        return;
    }

    consumeMainhandItem(player, item);
    showMainSummary(npc, player);
    cancelInteractionOnly(event);
}

function showMainSummary(npc, player) {
    var configNpc = resolveConfigNpc(npc);
    var commandNpc = resolveCommandNpc(npc);
    if (configNpc != null) player.message("Configurator joined.");
    if (commandNpc != null) player.message("Command NPC joined.");
    if (configNpc == null && commandNpc == null) player.message("No child NPC linked.");
}

function handleRegistrationJoin(event, npc, player) {
    var playerName = getPlayerName(player);
    if (findParticipantIndex(npc, playerName) !== -1) {
        if (hasParticipantTicket(player, npc, playerName)) {
            player.message("You are already registered.");
        } else if (giveParticipantTicketToPlayer(npc, player)) {
            player.message("You are registered. Ticket restored.");
        } else {
            player.message("You are registered, but ticket restore failed.");
        }
        cancelInteraction(event, player);
        return;
    }

    addParticipantEntry(npc, playerName);
    if (!giveParticipantTicketToPlayer(npc, player)) {
        removeParticipantEntry(npc, playerName);
        player.message("Registration failed.");
        cancelInteraction(event, player);
        return;
    }

    announceByMode(npc, playerName + " joined the event.");
    player.message("Registration complete.");
    cancelInteraction(event, player);
}

function handleParticipantTicketUse(event, npc, player, item) {
    if (!isParticipantTicketOwnedByPlayer(item, player)) {
        player.message("This ticket belongs to another player.");
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

    player.message("This ticket is inactive right now.");
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

function createLinkerItem(npc) {
    try {
        var itemType = PM_BuiltInRegistries.ITEM.get(PM_ResourceLocation.parse("minecraft:tripwire_hook"));
        if (itemType == null) return null;

        var mcStack = new PM_MCItemStack(itemType);
        var tag = new PM_CompoundTag();
        tag.putString("linker_type", LINKER_TYPE);
        tag.putString("main_uuid", getNpcUuid(npc));
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

function isLinkerForMain(item, npc) {
    var tag = getCustomTag(item);
    if (tag == null) return false;
    return safeTag(tag, "linker_type") == LINKER_TYPE
        && safeTag(tag, "main_uuid") == getNpcUuid(npc);
}

function bindFromLinker(npc, item) {
    var tag = getCustomTag(item);
    if (tag == null) return false;
    if (safeTag(tag, "linker_type") != LINKER_TYPE) return false;
    if (safeTag(tag, "main_uuid") != getNpcUuid(npc)) return false;

    var data = npc.getStoreddata();
    var configUuid = safeTag(tag, "config_uuid");
    var commandUuid = safeTag(tag, "command_uuid");
    if (!hasText(configUuid)) return false;
    if (!hasText(commandUuid)) return false;

    if (hasText(configUuid)) data.put(LINKED_CONFIG_UUID_KEY, configUuid);
    if (hasText(commandUuid)) data.put(LINKED_COMMAND_UUID_KEY, commandUuid);
    syncMainUuidToLinkedNpc(npc, configUuid);
    syncMainUuidToLinkedNpc(npc, commandUuid);
    syncWhitelistFromConfigurator(npc, configUuid);
    return true;
}

function syncMainUuidToLinkedNpc(mainNpc, linkedUuid) {
    if (!hasText(linkedUuid)) return;

    try {
        var linkedNpc = mainNpc.getWorld().getEntity(linkedUuid);
        if (linkedNpc == null) return;
        linkedNpc.getStoreddata().put(SUB_MAIN_UUID_KEY, getNpcUuid(mainNpc));
    } catch (e) {}
}

function resolveConfigNpc(mainNpc) {
    return resolveLinkedNpc(mainNpc, LINKED_CONFIG_UUID_KEY);
}

function resolveCommandNpc(mainNpc) {
    return resolveLinkedNpc(mainNpc, LINKED_COMMAND_UUID_KEY);
}

function resolveLinkedNpc(mainNpc, linkKey) {
    var linkedUuid = "" + mainNpc.getStoreddata().get(linkKey);
    if (!hasText(linkedUuid)) return null;

    try {
        return mainNpc.getWorld().getEntity(linkedUuid);
    } catch (e) {
        return null;
    }
}

function canManageNpc(mainNpc, player) {
    var names = parseWhitelistNames(getManagerWhitelistText(mainNpc));
    var playerName = getPlayerName(player);

    for (var i = 0; i < names.length; i++) {
        if (names[i] == playerName) return true;
    }

    return false;
}

function ensureManagerDefaults(mainNpc) {
    var data = mainNpc.getStoreddata();
    var whitelist = trimString(data.get(CONFIG_WHITELIST_KEY));
    if (!hasText(whitelist) || whitelist == "null" || whitelist == "undefined") {
        data.put(CONFIG_WHITELIST_KEY, CONFIG_DEFAULT_MANAGER);
    }
}

function getManagerWhitelistText(mainNpc) {
    var configNpc = resolveConfigNpc(mainNpc);
    if (configNpc != null) {
        return normalizeWhitelistText(configNpc.getStoreddata().get(CONFIG_WHITELIST_KEY));
    }

    return normalizeWhitelistText(mainNpc.getStoreddata().get(CONFIG_WHITELIST_KEY));
}

function syncWhitelistFromConfigurator(mainNpc, configUuid) {
    if (!hasText(configUuid)) return;

    try {
        var configNpc = mainNpc.getWorld().getEntity(configUuid);
        if (configNpc == null) return;

        var whitelist = normalizeWhitelistText(configNpc.getStoreddata().get(CONFIG_WHITELIST_KEY));
        mainNpc.getStoreddata().put(CONFIG_WHITELIST_KEY, whitelist);
    } catch (e) {}
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

function buildCurrentSettings(mainNpc) {
    var sourceNpc = resolveConfigNpc(mainNpc);
    if (sourceNpc == null) sourceNpc = mainNpc;

    var data = sourceNpc.getStoreddata();
    return {
        timer: readStoredOrDefault(data, CONFIG_TIMER_KEY, "00:00:00"),
        interval: readStoredOrDefault(data, CONFIG_INTERVAL_KEY, "00:00:00"),
        chatMode: readStoredOrDefault(data, CONFIG_CHAT_MODE_KEY, "local"),
        debug: readStoredOrDefault(data, CONFIG_DEBUG_KEY, "false")
    };
}

function buildCurrentConfigEntries(mainNpc) {
    var sourceNpc = resolveConfigNpc(mainNpc);
    if (sourceNpc == null) sourceNpc = mainNpc;

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

function buildParticipantTicketLore(npc) {
    var lore = [
        "Issued by Main during registration.",
        "Use on Main to leave or score while active.",
        "Configured species:"
    ];

    var entries = buildCurrentConfigEntries(npc);
    if (entries.length <= 0) {
        lore.push(" - no configured Pokemon");
        return lore;
    }

    for (var i = 0; i < entries.length; i++) {
        lore.push(" - " + normalizeConfiguredSpecies(entries[i].species) + ": x" + entries[i].multiplier);
    }

    return lore;
}

function giveParticipantTicketToPlayer(npc, player) {
    var item = createParticipantTicketItem(npc, player);
    if (item == null || item.isEmpty()) return false;
    return giveItemToPlayer(player, item);
}

function createParticipantTicketItem(npc, player) {
    var templateItem = createTicketFromConfiguratorTemplate(npc);
    if (templateItem != null && !templateItem.isEmpty()) {
        if (!applyParticipantTicketData(templateItem, npc, player)) return null;
        return templateItem;
    }

    try {
        var itemType = PM_BuiltInRegistries.ITEM.get(PM_ResourceLocation.parse("minecraft:paper"));
        if (itemType == null) return null;

        var mcStack = new PM_MCItemStack(itemType);
        mcStack.set(PM_DataComponents.CUSTOM_NAME, PM_Component.literal(TICKET_NAME));
        mcStack.set(PM_DataComponents.LORE, new PM_ItemLore(buildLore(buildParticipantTicketLore(npc))));

        var item = PM_NpcAPI.Instance().getIItemStack(mcStack);
        if (item == null || item.isEmpty()) return null;
        item.setStackSize(1);
        if (!applyParticipantTicketData(item, npc, player)) return null;
        return item;
    } catch (e) {
        return null;
    }
}

function createTicketFromConfiguratorTemplate(mainNpc) {
    var configNpc = resolveConfigNpc(mainNpc);
    if (configNpc == null) return null;

    try {
        var templateStack = configNpc.getTempdata().get(TICKET_TEMPLATE_TEMP_KEY);
        if (templateStack == null || templateStack.isEmpty()) return null;

        var copiedStack = templateStack.copy();
        var item = PM_NpcAPI.Instance().getIItemStack(copiedStack);
        if (item == null || item.isEmpty()) return null;
        item.setStackSize(1);
        return item;
    } catch (e) {
        return null;
    }
}

function applyParticipantTicketData(item, mainNpc, player) {
    try {
        var mcStack = item.getMCItemStack();
        if (mcStack == null || mcStack.isEmpty()) return false;

        var tag = getCustomTag(item);
        if (tag == null) tag = new PM_CompoundTag();

        tag.putString("item_type", TICKET_ITEM_TYPE);
        tag.putString("main_uuid", getNpcUuid(mainNpc));
        tag.putString("owner_uuid", getNpcUuid(player));
        tag.putString("owner_name", getPlayerName(player));

        mcStack.set(PM_DataComponents.CUSTOM_DATA, PM_CustomData.of(tag));
        mcStack.set(PM_DataComponents.MAX_STACK_SIZE, java.lang.Integer.valueOf(1));
        item.setStackSize(1);

        try {
            if (item.setDurabilityShow != null) item.setDurabilityShow(true);
        } catch (e1) {}

        try {
            if (item.setDurabilityColor != null) item.setDurabilityColor(5635925);
        } catch (e2) {}

        return true;
    } catch (e) {
        return false;
    }
}

function isParticipantTicketForNpc(item, npc) {
    if (item == null || item.isEmpty()) return false;

    var tag = getCustomTag(item);
    if (tag == null) return false;
    return safeTag(tag, "item_type") == TICKET_ITEM_TYPE
        && safeTag(tag, "main_uuid") == getNpcUuid(npc);
}

function isParticipantTicketOwnedByPlayer(item, player) {
    var ownerUuid = readCustomString(item, "owner_uuid");
    if (hasText(ownerUuid) && ownerUuid == getNpcUuid(player)) return true;
    return readCustomString(item, "owner_name") == getPlayerName(player);
}

function hasParticipantTicket(player, npc, playerName) {
    try {
        var held = player.getMainhandItem();
        if (isParticipantTicketForNpc(held, npc) && isParticipantTicketOwnedByPlayer(held, player)) {
            return true;
        }

        var inv = player.getInventory();
        if (inv == null) return false;

        var size = inv.getSize();
        for (var i = 0; i < size; i++) {
            var item = inv.getSlot(i);
            if (!isParticipantTicketForNpc(item, npc)) continue;
            if (readCustomString(item, "owner_name") == playerName) return true;
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
    return serverOutput != null;
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

function consumeMainhandItem(player, item) {
    try {
        player.getMCEntity().setItemInHand(
            PM_InteractionHand.MAIN_HAND,
            new PM_MCItemStack(PM_Items.AIR)
        );
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

function isCycleRunning(npc) {
    return trimString(npc.getStoreddata().get(CYCLE_RUNNING_KEY)) == "1";
}

function isCyclePaused(npc) {
    return trimString(npc.getStoreddata().get(CYCLE_PAUSED_KEY)) == "1";
}

function isCountingModeEnabled(npc) {
    return trimString(npc.getStoreddata().get(COUNTING_MODE_KEY)) == "1";
}

function isRegistrationModeEnabled(npc) {
    return trimString(npc.getStoreddata().get(REGISTRATION_MODE_KEY)) == "1";
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

function readCustomString(item, key) {
    var tag = getCustomTag(item);
    return tag == null ? "" : safeTag(tag, key);
}

function safeTag(tag, key) {
    try {
        return "" + tag.getString(key);
    } catch (e) {
        return "";
    }
}

function getNpcUuid(entity) {
    try {
        return "" + entity.getUUID();
    } catch (e) {
        return "";
    }
}

function buildLore(lines) {
    var lore = new PM_ArrayList();
    for (var i = 0; i < lines.length; i++) {
        lore.add(PM_Component.literal(lines[i]));
    }
    return lore;
}

function getPlayerName(player) {
    try {
        return "" + player.getName();
    } catch (e) {
        return "" + player.getDisplayName();
    }
}

function readStoredOrDefault(data, key, def) {
    var value = trimString(data.get(key));
    if (value == "null" || value == "undefined") return def;
    return hasText(value) ? value : def;
}

function ensureBaseTitle(npc) {
    try {
        var data = npc.getStoreddata();
        if (hasText(data.get(DISPLAY_BASE_TITLE_KEY))) return;
        data.put(DISPLAY_BASE_TITLE_KEY, "" + npc.getDisplay().getTitle());
    } catch (e) {}
}

function sanitizeBroadcastText(text) {
    return trimString(("" + text).replace(/[\r\n]+/g, " "));
}

function stripLeadingSlash(command) {
    var cmd = trimString(command);
    if (cmd.indexOf("/") === 0) return cmd.substring(1);
    return cmd;
}

function normalizeMultiplier(value) {
    var text = ("" + value).replace(",", ".");
    if (text.indexOf(".") == -1) return text;
    text = text.replace(/0+$/, "");
    text = text.replace(/\.$/, "");
    return text;
}

function formatScore(value) {
    return normalizeMultiplier(parseFloatSafe(value, 0));
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
