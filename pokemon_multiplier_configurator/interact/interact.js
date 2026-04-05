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
var PM_WritableBookContent = Java.type("net.minecraft.world.item.component.WritableBookContent");
var PM_Filterable = Java.type("net.minecraft.server.network.Filterable");
var PM_Component = Java.type("net.minecraft.network.chat.Component");
var PM_CompoundTag = Java.type("net.minecraft.nbt.CompoundTag");
var PM_Stats = Java.type("com.cobblemon.mod.common.api.pokemon.stats.Stats");
var PM_CubixCobblemonDataComponents = Java.type("net.im51111n355.cubixcobblemon.common.CubixCobblemonDataComponents");

var CONTROL_TIMER_ID = 1;

var CONFIG_BOOK_MARKER = "pokemon_multiplier_config_book";
var CONFIG_KEY_MARKER = "pokemon_multiplier_config_key";
var CONFIG_WATCH_MARKER = "pokemon_multiplier_config_watch";
var CONFIG_RESET_MARKER = "pokemon_multiplier_config_reset";
var CONFIG_FINISH_MARKER = "pokemon_multiplier_config_finish";
var CONFIG_LEADERBOARD_MARKER = "pokemon_multiplier_config_leaderboard";
var CONFIG_COUNTING_OFF_MARKER = "pokemon_multiplier_config_counting_off";
var CONFIG_COUNTING_ON_MARKER = "pokemon_multiplier_config_counting_on";
var CONFIG_REGISTRATION_OFF_MARKER = "pokemon_multiplier_config_registration_off";
var CONFIG_REGISTRATION_ON_MARKER = "pokemon_multiplier_config_registration_on";
var CONFIG_TELEPORT_MARKER = "pokemon_multiplier_config_teleport";
var CONFIG_CLEAR_PARTICIPANTS_MARKER = "pokemon_multiplier_config_clear_participants";
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
var CONFIG_BOOK_TOKEN_PREFIX = "pokemon_multiplier_config_book_token_";
var CONFIG_KEY_TOKEN_PREFIX = "pokemon_multiplier_config_key_token_";
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

    ensureNpcConfigId(npc);
    ensureCycleDefaults(npc);

    if (isConfigBookForNpc(item, npc)) {
        handleReturnedConfigBook(event, npc, player, item);
        return;
    }

    if (isConfigKeyForNpc(item, npc)) {
        handleConfigKey(event, npc, player, item);
        return;
    }

    if (isParticipantLeafForNpc(item, npc)) {
        handleParticipantLeafUse(event, npc, player, item);
        return;
    }

    if (isControlItemForNpc(item, npc, CONFIG_WATCH_MARKER)) {
        handleWatchControl(event, npc, player);
        return;
    }

    if (isControlItemForNpc(item, npc, CONFIG_RESET_MARKER)) {
        handleResetControl(event, npc, player);
        return;
    }

    if (isControlItemForNpc(item, npc, CONFIG_FINISH_MARKER)) {
        handleFinishControl(event, npc, player);
        return;
    }

    if (isControlItemForNpc(item, npc, CONFIG_LEADERBOARD_MARKER)) {
        handleLeaderboardControl(event, npc, player);
        return;
    }

    if (isControlItemForNpc(item, npc, CONFIG_TELEPORT_MARKER)) {
        handleTeleportParticipantsControl(event, npc, player);
        return;
    }

    if (isControlItemForNpc(item, npc, CONFIG_CLEAR_PARTICIPANTS_MARKER)) {
        handleClearParticipantsControl(event, npc, player);
        return;
    }

    if (isControlItemForNpc(item, npc, CONFIG_COUNTING_OFF_MARKER)
        || isControlItemForNpc(item, npc, CONFIG_COUNTING_ON_MARKER)) {
        handleCountingModeControl(event, npc, player);
        return;
    }

    if (isControlItemForNpc(item, npc, CONFIG_REGISTRATION_OFF_MARKER)
        || isControlItemForNpc(item, npc, CONFIG_REGISTRATION_ON_MARKER)) {
        handleRegistrationModeControl(event, npc, player);
        return;
    }

    if (isRegistrationModeEnabled(npc)) {
        handleRegistrationJoin(event, npc, player);
        return;
    }

    handleInitialRequest(event, npc, player);
}

function handleInitialRequest(event, npc, player) {
    if (hasConfigOwner(npc)) {
        if (isConfigOwner(npc, player)) {
            debugPrintCurrentConfigToPlayer(npc, player);
            player.message("§eИспользуй ключ, чтобы получить новую книгу конфигурации.");
        } else {
            player.message("§eКонфиг уже задан другим игроком.");
        }
        cancelInteraction(event, player);
        return;
    }

    removeBehaviorControlItems(player, npc);

    if (!giveConfigBookToPlayer(npc, player, buildCurrentConfigEntries(npc))) {
        player.message("§cНе удалось выдать книгу конфигурации.");
        cancelInteraction(event, player);
        return;
    }

    player.message("§aПолучена книга конфигурации.");
    player.message("§7Заполни конфиг и верни книгу NPC.");
    cancelInteraction(event, player);
}

function handleReturnedConfigBook(event, npc, player, item) {
    var token = readCustomString(item, "config_token");
    if (!isValidTokenOwner(npc, CONFIG_BOOK_TOKEN_PREFIX, token, player)) {
        player.message("§cЭта книга конфигурации больше не действительна.");
        cancelInteraction(event, player);
        return;
    }

    var parsedConfig = parseBookConfig(item);
    if (parsedConfig.pokemonEntries.length == 0) {
        player.message("§cНе найдено ни одной строки вида pokemon: multiplier");
        cancelInteraction(event, player);
        return;
    }

    applyParsedConfig(npc, parsedConfig, player);
    resetCycleState(npc);
    consumeMainhandItem(player, item);
    invalidateToken(npc, CONFIG_BOOK_TOKEN_PREFIX, token);

    if (!giveAllControlItems(npc, player)) {
        player.message("§cКонфиг сохранён, но выдать предметы управления не удалось.");
        cancelInteraction(event, player);
        return;
    }

    player.message("§aКонфиг сохранён.");
    debugPrintCurrentConfigToPlayer(npc, player);
    cancelInteraction(event, player);
}

function handleConfigKey(event, npc, player, item) {
    var token = readCustomString(item, "config_token");
    if (!isValidTokenOwner(npc, CONFIG_KEY_TOKEN_PREFIX, token, player)) {
        player.message("§cЭтот ключ конфигурации больше не действителен.");
        cancelInteraction(event, player);
        return;
    }

    var entries = buildCurrentConfigEntries(npc);
    invalidateToken(npc, CONFIG_KEY_TOKEN_PREFIX, token);
    consumeMainhandItem(player, item);
    removeBehaviorControlItems(player, npc);

    if (!giveConfigBookToPlayer(npc, player, entries)) {
        player.message("§cНе удалось обменять ключ на книгу конфигурации.");
        cancelInteraction(event, player);
        return;
    }

    debugPrintCurrentConfigToPlayer(npc, player);
    player.message("§aКнига конфигурации выдана заново.");
    cancelInteraction(event, player);
}

function handleWatchControl(event, npc, player) {
    if (!isConfigOwner(npc, player)) {
        player.message("§cТолько владелец конфига может управлять циклом.");
        cancelInteraction(event, player);
        return;
    }

    if (isCycleRunning(npc)) {
        pauseCycle(npc);
        player.message("§eТаймер поставлен на паузу.");
    } else if (isCyclePaused(npc)) {
        if (!resumeCycle(npc)) {
            player.message("§cНе удалось возобновить таймер.");
            cancelInteraction(event, player);
            return;
        }
        player.message("§aТаймер возобновлён.");
    } else {
        if (!startCycle(npc)) {
            player.message("§cНе удалось запустить таймер. Проверь Timer и Interval.");
            cancelInteraction(event, player);
            return;
        }
        player.message("§aТаймер запущен.");
    }

    cancelInteraction(event, player);
}

function handleResetControl(event, npc, player) {
    if (!isConfigOwner(npc, player)) {
        player.message("§cТолько владелец конфига может сбросить прогресс.");
        cancelInteraction(event, player);
        return;
    }

    stopCycle(npc);
    clearCycleEntries(npc);
    player.message("§eПрогресс цикла сброшен.");
    cancelInteraction(event, player);
}

function handleFinishControl(event, npc, player) {
    if (!isConfigOwner(npc, player)) {
        player.message("§cТолько владелец конфига может завершить цикл.");
        cancelInteraction(event, player);
        return;
    }

    finishCycle(npc);
    player.message("§aЦикл завершён.");
    cancelInteraction(event, player);
}

function handleLeaderboardControl(event, npc, player) {
    if (!isConfigOwner(npc, player)) {
        player.message("§cТолько владелец конфига может смотреть таблицу лидеров.");
        cancelInteraction(event, player);
        return;
    }

    printLeaderboardToPlayer(npc, player);
    cancelInteraction(event, player);
}

function handleTeleportParticipantsControl(event, npc, player) {
    if (!isConfigOwner(npc, player)) {
        player.message("§cТолько владелец конфига может телепортировать участников.");
        cancelInteraction(event, player);
        return;
    }

    var teleported = teleportParticipantsToNpc(npc);
    player.message("§aТелепортировано участников: §f" + teleported);
    cancelInteraction(event, player);
}

function handleClearParticipantsControl(event, npc, player) {
    if (!isConfigOwner(npc, player)) {
        player.message("§cТолько владелец конфига может очищать список участников.");
        cancelInteraction(event, player);
        return;
    }

    clearParticipantEntries(npc);
    player.message("§eСписок участников очищен.");
    cancelInteraction(event, player);
}

function handleCountingModeControl(event, npc, player) {
    if (!isConfigOwner(npc, player)) {
        player.message("§cТолько владелец конфига может переключать режим подсчёта.");
        cancelInteraction(event, player);
        return;
    }

    var countingEnabled = isCountingModeEnabled(npc);
    setCountingMode(npc, !countingEnabled);
    replaceCountingModeItem(player, npc, !countingEnabled);

    if (!countingEnabled) {
        announceByMode(npc, "Режим подсчёта включён.");
        player.message("§aРежим подсчёта включён.");
    } else {
        announceByMode(npc, "Режим подсчёта выключен.");
        player.message("§eРежим подсчёта выключен.");
    }

    cancelInteraction(event, player);
}

function handleRegistrationModeControl(event, npc, player) {
    if (!isConfigOwner(npc, player)) {
        player.message("§cТолько владелец конфига может переключать режим регистрации.");
        cancelInteraction(event, player);
        return;
    }

    var enabled = isRegistrationModeEnabled(npc);
    setRegistrationMode(npc, !enabled);
    replaceRegistrationModeItem(player, npc, !enabled);

    if (!enabled) {
        announceByMode(npc, "Режим регистрации включён.");
        player.message("§aРежим регистрации включён.");
    } else {
        announceByMode(npc, "Режим регистрации выключен.");
        player.message("§eРежим регистрации выключен.");
    }

    cancelInteraction(event, player);
}

function handleRegistrationJoin(event, npc, player) {
    var playerName = getPlayerName(player);
    if (findParticipantIndex(npc, playerName) !== -1) {
        player.message("§eТы уже зарегистрирован как участник.");
        cancelInteraction(event, player);
        return;
    }

    addParticipantEntry(npc, playerName);

    if (!giveParticipantLeafToPlayer(npc, player)) {
        removeParticipantEntry(npc, playerName);
        player.message("§cНе удалось выдать лист участника.");
        cancelInteraction(event, player);
        return;
    }

    announceByMode(npc, "Игрок " + playerName + " зарегистрирован как участник.");
    player.message("§aТы зарегистрирован как участник.");
    cancelInteraction(event, player);
}

function handleParticipantLeafUse(event, npc, player, item) {
    if (!isParticipantLeafOwnedByPlayer(item, player)) {
        player.message("§cЭтот лист участника принадлежит другому игроку.");
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

    player.message("§eЛист участника сейчас не используется.");
    cancelInteraction(event, player);
}

function handleParticipantRemoval(event, npc, player, item) {
    var playerName = getPlayerName(player);
    if (findParticipantIndex(npc, playerName) === -1) {
        player.message("§eТы не состоишь в списке участников.");
        cancelInteraction(event, player);
        return;
    }

    removeParticipantEntry(npc, playerName);
    consumeMainhandItem(player, item);
    announceByMode(npc, "Игрок " + playerName + " исключён из участников.");
    player.message("§eТы исключён из участников.");
    cancelInteraction(event, player);
}

function handleParticipantScoring(event, npc, player) {
    var playerName = getPlayerName(player);
    if (findParticipantIndex(npc, playerName) === -1) {
        player.message("§cТы не зарегистрирован как участник.");
        cancelInteraction(event, player);
        return;
    }

    var result = collectConfiguredPokemonScore(player, npc);
    if (result.pcount <= 0) {
        player.message("§eУ тебя нет подходящих покемонов из конфига.");
        cancelInteraction(event, player);
        return;
    }

    addParticipantScore(npc, playerName, result.score, result.pcount);
    announceByMode(npc, "Игрок " + playerName + " сдал покемонов. Очки: " + formatScore(result.score));
    player.message("§aСдано покемонов: §f" + result.pcount);
    player.message("§aПолучено очков: §f" + formatScore(result.score));
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

function hasConfigOwner(npc) {
    return hasText(npc.getStoreddata().get(CONFIG_OWNER_KEY));
}

function isConfigOwner(npc, player) {
    return ("" + npc.getStoreddata().get(CONFIG_OWNER_KEY)) == getPlayerName(player);
}

function giveAllControlItems(npc, player) {
    if (!giveConfigKeyToPlayer(npc, player)) return false;
    if (!giveControlItemToPlayer(player, createControlItem(npc, CONFIG_WATCH_MARKER))) return false;
    if (!giveControlItemToPlayer(player, createControlItem(npc, CONFIG_RESET_MARKER))) return false;
    if (!giveControlItemToPlayer(player, createControlItem(npc, CONFIG_FINISH_MARKER))) return false;
    if (!giveControlItemToPlayer(player, createControlItem(npc, CONFIG_LEADERBOARD_MARKER))) return false;
    if (!giveControlItemToPlayer(player, createControlItem(npc, CONFIG_TELEPORT_MARKER))) return false;
    if (!giveControlItemToPlayer(player, createControlItem(npc, CONFIG_CLEAR_PARTICIPANTS_MARKER))) return false;
    if (!giveControlItemToPlayer(player, createControlItem(npc, getCountingModeMarker(npc)))) return false;
    if (!giveControlItemToPlayer(player, createControlItem(npc, getRegistrationModeMarker(npc)))) return false;
    return true;
}

function giveControlItemToPlayer(player, item) {
    if (item == null || item.isEmpty()) return false;
    return putInFirstEmptySlot(player, item);
}

function giveConfigBookToPlayer(npc, player, entries) {
    var token = createToken();
    var item = createConfigBookItem(npc, token, entries);
    if (item == null || item.isEmpty()) return false;

    npc.getStoreddata().put(CONFIG_BOOK_TOKEN_PREFIX + token, getPlayerName(player));
    return giveItemToPlayer(player, item);
}

function giveConfigKeyToPlayer(npc, player) {
    var token = createToken();
    var item = createConfigKeyItem(npc, token);
    if (item == null || item.isEmpty()) return false;

    npc.getStoreddata().put(CONFIG_KEY_TOKEN_PREFIX + token, getPlayerName(player));
    return giveItemToPlayer(player, item);
}

function createConfigBookItem(npc, token, entries) {
    try {
        var mcStack = new PM_MCItemStack(PM_Items.WRITABLE_BOOK);
        if (mcStack == null || mcStack.isEmpty()) return null;

        applyBookMetadata(mcStack, npc, token);
        fillWritableBookPages(mcStack, buildBookPages(npc, entries));

        var item = PM_NpcAPI.Instance().getIItemStack(mcStack);
        if (item == null || item.isEmpty()) return null;

        item.setStackSize(1);
        return item;
    } catch (e) {
        return null;
    }
}

function createConfigKeyItem(npc, token) {
    return createSingleItemWithMetadata(
        "minecraft:tripwire_hook",
        CONFIG_KEY_MARKER,
        npc,
        token,
        "§eКлюч конфигурации",
        [
            "Обменивается на новую книгу конфигурации.",
            "Чтобы применить, нажми ПКМ по NPC."
        ]
    );
}

function createControlItem(npc, marker) {
    if (marker == CONFIG_WATCH_MARKER) {
        return createSingleItemWithMetadata(
            "minecraft:clock",
            marker,
            npc,
            "",
            "§6Часы цикла",
            ["ПКМ по NPC: запустить или остановить таймер."]
        );
    }

    if (marker == CONFIG_RESET_MARKER) {
        return createSingleItemWithMetadata(
            "minecraft:red_stained_glass",
            marker,
            npc,
            "",
            "§cСброс цикла",
            ["ПКМ по NPC: сбросить весь прогресс цикла."]
        );
    }

    if (marker == CONFIG_FINISH_MARKER) {
        return createSingleItemWithMetadata(
            "minecraft:green_stained_glass",
            marker,
            npc,
            "",
            "§aЗавершение цикла",
            ["ПКМ по NPC: завершить текущий цикл."]
        );
    }

    if (marker == CONFIG_LEADERBOARD_MARKER) {
        return createSingleItemWithMetadata(
            "minecraft:diamond",
            marker,
            npc,
            "",
            "§bТаблица лидеров",
            ["ПКМ по NPC: вывести таблицу лидеров в чат."]
        );
    }

    if (marker == CONFIG_TELEPORT_MARKER) {
        return createSingleItemWithMetadata(
            "minecraft:blaze_rod",
            marker,
            npc,
            "",
            "§6Телепорт участников",
            ["ПКМ по NPC: телепортировать всех участников к NPC."]
        );
    }

    if (marker == CONFIG_CLEAR_PARTICIPANTS_MARKER) {
        return createSingleItemWithMetadata(
            "minecraft:bucket",
            marker,
            npc,
            "",
            "§7Очистка участников",
            ["ПКМ по NPC: очистить список участников."]
        );
    }

    if (marker == CONFIG_COUNTING_OFF_MARKER) {
        return createSingleItemWithMetadata(
            "minecraft:slime_ball",
            marker,
            npc,
            "",
            "§aРежим подсчёта: выкл",
            ["ПКМ по NPC: включить режим подсчёта."]
        );
    }

    if (marker == CONFIG_COUNTING_ON_MARKER) {
        return createSingleItemWithMetadata(
            "minecraft:magma_cream",
            marker,
            npc,
            "",
            "§6Режим подсчёта: вкл",
            ["ПКМ по NPC: выключить режим подсчёта."]
        );
    }

    if (marker == CONFIG_REGISTRATION_OFF_MARKER) {
        return createSingleItemWithMetadata(
            "minecraft:gunpowder",
            marker,
            npc,
            "",
            "§7Режим регистрации: выкл",
            ["ПКМ по NPC: включить режим регистрации."]
        );
    }

    if (marker == CONFIG_REGISTRATION_ON_MARKER) {
        return createSingleItemWithMetadata(
            "minecraft:glowstone_dust",
            marker,
            npc,
            "",
            "§eРежим регистрации: вкл",
            ["ПКМ по NPC: выключить режим регистрации."]
        );
    }

    return null;
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

function applyBookMetadata(mcStack, npc, token) {
    var tag = new PM_CompoundTag();
    tag.putString("config_type", CONFIG_BOOK_MARKER);
    tag.putString("config_npc_id", "" + npc.getStoreddata().get(CONFIG_NPC_ID_KEY));
    tag.putString("config_token", token);

    mcStack.set(PM_DataComponents.CUSTOM_DATA, PM_CustomData.of(tag));
    mcStack.set(PM_DataComponents.CUSTOM_NAME, PM_Component.literal("§6Книга конфигурации"));
    mcStack.set(PM_DataComponents.LORE, new PM_ItemLore(buildLore([
        "Первая страница: Timer, Interval, Chat, Debug.",
        "Вторая: max и шаблон.",
        "Третья и далее: покемоны с коэффициентами."
    ])));
}

function buildLore(lines) {
    var lore = new PM_ArrayList();
    for (var i = 0; i < lines.length; i++) {
        lore.add(PM_Component.literal(lines[i]));
    }
    return lore;
}

function fillWritableBookPages(mcStack, pagesText) {
    var pages = new PM_ArrayList();
    for (var i = 0; i < pagesText.length; i++) {
        pages.add(PM_Filterable.passThrough("" + pagesText[i]));
    }
    mcStack.set(PM_DataComponents.WRITABLE_BOOK_CONTENT, new PM_WritableBookContent(pages));
}

function buildBookPages(npc, entries) {
    var settings = buildCurrentSettings(npc);
    var pages = [];

    pages.push([
        "Timer: " + settings.timer,
        "Interval: " + settings.interval,
        "Chat: " + settings.chatMode,
        "Debug: " + settings.debug
    ].join("\n"));

    var pokemonLines = [];
    if (entries.length == 0) {
        pokemonLines.push("combee: 1.0");
    } else {
        for (var j = 0; j < entries.length; j++) {
            pokemonLines.push(normalizeConfiguredSpecies(entries[j].species) + ": " + entries[j].multiplier);
        }
    }

    var perPage = 10;
    for (var start = 0; start < pokemonLines.length; start += perPage) {
        pages.push(pokemonLines.slice(start, start + perPage).join("\n"));
    }

    return pages;
}

function parseBookConfig(item) {
    var pages = readBookPages(item);
    var settings = buildCurrentSettings(null);
    var pokemonEntries = [];

    if (pages.length > 0) settings = parseSettingsPage(pages[0], settings);
    if (pages.length > 1) pokemonEntries = parsePokemonPages(pages, 1);

    return {
        settings: settings,
        pokemonEntries: pokemonEntries
    };
}

function parseSettingsPage(pageText, currentSettings) {
    var settings = {
        timer: currentSettings.timer,
        interval: currentSettings.interval,
        chatMode: currentSettings.chatMode,
        debug: currentSettings.debug
    };
    var lines = splitPageLines(pageText);

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var value = extractNamedValue(line, ["timer"]);
        if (hasText(value)) {
            settings.timer = value;
            continue;
        }

        value = extractNamedValue(line, ["interval"]);
        if (hasText(value)) {
            settings.interval = value;
            continue;
        }

        value = extractNamedValue(line, ["chat"]);
        if (hasText(value)) {
            settings.chatMode = normalizeChatMode(value);
            continue;
        }

        value = extractNamedValue(line, ["debug"]);
        if (hasText(value)) {
            settings.debug = normalizeTrueFalse(value);
        }
    }

    return settings;
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

function printCurrentConfigToPlayer(npc, player) {
    var settings = buildCurrentSettings(npc);
    var entries = buildCurrentConfigEntries(npc);

    player.message("§6Current NPC config:");
    player.message("§7Timer: §f" + settings.timer);
    player.message("§7Interval: §f" + settings.interval);
    player.message("§7Chat: §f" + settings.chatMode);
    player.message("§7Debug: §f" + settings.debug);

    if (entries.length == 0) {
        player.message("§7Pokemon multipliers: §fnone");
        return;
    }

    player.message("§7Pokemon multipliers:");
    for (var j = 0; j < entries.length; j++) {
        player.message("§7- §f" + entries[j].species + " §7x §f" + entries[j].multiplier);
    }
}

function debugPrintCurrentConfigToPlayer(npc, player) {
    if (!isDebugEnabled(npc)) return;
    printCurrentConfigToPlayer(npc, player);
}

function isConfigBookForNpc(item, npc) {
    return hasMatchingConfigMetadata(item, npc, CONFIG_BOOK_MARKER);
}

function isConfigKeyForNpc(item, npc) {
    return hasMatchingConfigMetadata(item, npc, CONFIG_KEY_MARKER);
}

function isControlItemForNpc(item, npc, marker) {
    return hasMatchingConfigMetadata(item, npc, marker);
}

function isBehaviorControlItemForNpc(item, npc) {
    return isControlItemForNpc(item, npc, CONFIG_KEY_MARKER)
        || isControlItemForNpc(item, npc, CONFIG_WATCH_MARKER)
        || isControlItemForNpc(item, npc, CONFIG_RESET_MARKER)
        || isControlItemForNpc(item, npc, CONFIG_FINISH_MARKER)
        || isControlItemForNpc(item, npc, CONFIG_LEADERBOARD_MARKER)
        || isControlItemForNpc(item, npc, CONFIG_TELEPORT_MARKER)
        || isControlItemForNpc(item, npc, CONFIG_CLEAR_PARTICIPANTS_MARKER)
        || isControlItemForNpc(item, npc, CONFIG_COUNTING_OFF_MARKER)
        || isControlItemForNpc(item, npc, CONFIG_COUNTING_ON_MARKER)
        || isControlItemForNpc(item, npc, CONFIG_REGISTRATION_OFF_MARKER)
        || isControlItemForNpc(item, npc, CONFIG_REGISTRATION_ON_MARKER);
}

function removeBehaviorControlItems(player, npc) {
    try {
        var inv = player.getInventory();
        if (inv == null) return;

        var size = inv.getSize();
        for (var i = 0; i < size; i++) {
            var item = inv.getSlot(i);
            if (!isBehaviorControlItemForNpc(item, npc)) continue;
            inv.setSlot(i, PM_NpcAPI.Instance().getIItemStack(new PM_MCItemStack(PM_Items.AIR)));
        }

        player.updatePlayerInventory();
    } catch (e) {}
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

function isValidTokenOwner(npc, prefix, token, player) {
    if (!hasText(token)) return false;
    var owner = "" + npc.getStoreddata().get(prefix + token);
    return owner == getPlayerName(player);
}

function invalidateToken(npc, prefix, token) {
    if (!hasText(token)) return;
    npc.getStoreddata().remove(prefix + token);
}

function readBookPages(item) {
    try {
        var mcStack = item.getMCItemStack();
        if (mcStack == null || mcStack.isEmpty()) return [];

        var pages = new PM_ArrayList();
        var writable = mcStack.get(PM_DataComponents.WRITABLE_BOOK_CONTENT);
        if (writable != null) collectWritableBookPages(pages, writable);

        var written = mcStack.get(PM_DataComponents.WRITTEN_BOOK_CONTENT);
        if (written != null) collectWrittenBookPages(pages, written);

        return pages.toArray();
    } catch (e) {
        return [];
    }
}

function collectWritableBookPages(out, content) {
    var pages = content.pages();
    if (pages == null) return;

    var it = pages.iterator();
    while (it.hasNext()) {
        var filterable = it.next();
        if (filterable == null) continue;
        out.add("" + filterable.raw());
    }
}

function collectWrittenBookPages(out, content) {
    var pages = content.getPages(false);
    if (pages == null) return;

    var it = pages.iterator();
    while (it.hasNext()) {
        var page = it.next();
        if (page == null) continue;
        out.add("" + page.getString());
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
    announceByMode(npc, "Цикл запущен. Осталось времени: " + formatDurationMs(timerMs));

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
    announceByMode(npc, "Цикл завершён.");
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
    announceByMode(npc, "Цикл возобновлён. Осталось времени: " + formatDurationMs(remainingMs));

    try {
        npc.timers.forceStart(CONTROL_TIMER_ID, 20, true);
    } catch (e) {}
    return true;
}

function getCountingModeMarker(npc) {
    return isCountingModeEnabled(npc) ? CONFIG_COUNTING_ON_MARKER : CONFIG_COUNTING_OFF_MARKER;
}

function isCountingModeEnabled(npc) {
    return trimString(npc.getStoreddata().get(COUNTING_MODE_KEY)) == "1";
}

function setCountingMode(npc, enabled) {
    npc.getStoreddata().put(COUNTING_MODE_KEY, enabled ? "1" : "0");
}

function getRegistrationModeMarker(npc) {
    return isRegistrationModeEnabled(npc) ? CONFIG_REGISTRATION_ON_MARKER : CONFIG_REGISTRATION_OFF_MARKER;
}

function isRegistrationModeEnabled(npc) {
    return trimString(npc.getStoreddata().get(REGISTRATION_MODE_KEY)) == "1";
}

function setRegistrationMode(npc, enabled) {
    npc.getStoreddata().put(REGISTRATION_MODE_KEY, enabled ? "1" : "0");
}

function replaceCountingModeItem(player, npc, enabled) {
    try {
        var replacement = createControlItem(npc, enabled ? CONFIG_COUNTING_ON_MARKER : CONFIG_COUNTING_OFF_MARKER);
        if (replacement == null || replacement.isEmpty()) return;

        var held = player.getMainhandItem();
        if (held != null && !held.isEmpty()
            && (isControlItemForNpc(held, npc, CONFIG_COUNTING_OFF_MARKER)
                || isControlItemForNpc(held, npc, CONFIG_COUNTING_ON_MARKER))) {
            player.getMCEntity().setItemInHand(
                PM_InteractionHand.MAIN_HAND,
                replacement.getMCItemStack()
            );
            player.updatePlayerInventory();
            return;
        }

        var inv = player.getInventory();
        if (inv == null) return;

        var size = inv.getSize();
        for (var i = 0; i < size; i++) {
            var item = inv.getSlot(i);
            if (item == null || item.isEmpty()) continue;
            if (!isControlItemForNpc(item, npc, CONFIG_COUNTING_OFF_MARKER)
                && !isControlItemForNpc(item, npc, CONFIG_COUNTING_ON_MARKER)) continue;
            inv.setSlot(i, replacement);
            player.updatePlayerInventory();
            return;
        }
    } catch (e) {}
}

function replaceRegistrationModeItem(player, npc, enabled) {
    try {
        var replacement = createControlItem(npc, enabled ? CONFIG_REGISTRATION_ON_MARKER : CONFIG_REGISTRATION_OFF_MARKER);
        if (replacement == null || replacement.isEmpty()) return;

        var held = player.getMainhandItem();
        if (held != null && !held.isEmpty()
            && (isControlItemForNpc(held, npc, CONFIG_REGISTRATION_OFF_MARKER)
                || isControlItemForNpc(held, npc, CONFIG_REGISTRATION_ON_MARKER))) {
            player.getMCEntity().setItemInHand(
                PM_InteractionHand.MAIN_HAND,
                replacement.getMCItemStack()
            );
            player.updatePlayerInventory();
            return;
        }

        var inv = player.getInventory();
        if (inv == null) return;

        var size = inv.getSize();
        for (var i = 0; i < size; i++) {
            var item = inv.getSlot(i);
            if (item == null || item.isEmpty()) continue;
            if (!isControlItemForNpc(item, npc, CONFIG_REGISTRATION_OFF_MARKER)
                && !isControlItemForNpc(item, npc, CONFIG_REGISTRATION_ON_MARKER)) continue;
            inv.setSlot(i, replacement);
            player.updatePlayerInventory();
            return;
        }
    } catch (e) {}
}

function printLeaderboardToPlayer(npc, player) {
    var entries = buildLeaderboardEntries(npc);
    if (entries.length == 0) {
        player.message("§7Таблица лидеров пуста.");
        return;
    }

    player.message("§6Таблица лидеров:");
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        player.message("§7" + (i + 1) + ". §f" + entry.player + " §7- score: §f" + entry.score + " §7| caught: §f" + entry.pcount);
    }
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
            timer: "00:05:00",
            interval: "00:01:00",
            chatMode: "global",
            debug: "false"
        };
    }

    var data = npc.getStoreddata();
    return {
        timer: readStoredOrDefault(data, CONFIG_TIMER_KEY, "00:05:00"),
        interval: readStoredOrDefault(data, CONFIG_INTERVAL_KEY, "00:01:00"),
        chatMode: readStoredOrDefault(data, CONFIG_CHAT_MODE_KEY, "global"),
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
            player.message("§eТы уже зарегистрирован как участник.");
        } else if (giveParticipantLeafToPlayer(npc, player)) {
            player.message("§aТы уже в списке участников. Лист выдан заново.");
        } else {
            player.message("§cТы уже в списке участников, но лист выдать не удалось.");
        }
        cancelInteraction(event, player);
        return;
    }

    addParticipantEntry(npc, playerName);
    if (!giveParticipantLeafToPlayer(npc, player)) {
        removeParticipantEntry(npc, playerName);
        player.message("§cНе удалось выдать лист участника.");
        cancelInteraction(event, player);
        return;
    }

    announceByMode(npc, "Игрок " + playerName + " зарегистрирован как участник.");
    player.message("§aТы зарегистрирован как участник.");
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
            "§aЛист участника",
            [
                "Подтверждает участие в событии.",
                "ПКМ по NPC в режиме регистрации: выйти.",
                "ПКМ по NPC в режиме подсчёта: сдать покемонов."
            ]
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

function printLeaderboardToPlayer(npc, player) {
    var entries = buildLeaderboardEntries(npc);
    if (entries.length == 0) {
        player.message("§7Таблица лидеров пуста.");
        return;
    }

    player.message("§6Таблица лидеров:");
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        player.message("§7" + (i + 1) + ". §f" + entry.player + " §7- score: §f" + formatScore(entry.score) + " §7| caught: §f" + entry.pcount);
    }
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
