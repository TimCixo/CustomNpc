var Daycare_NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var Daycare_Cobblemon = Java.type("com.cobblemon.mod.common.Cobblemon");
var Daycare_PlayerExtensionsKt = Java.type("com.cobblemon.mod.common.util.PlayerExtensionsKt");

var Daycare_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var Daycare_CustomData = Java.type("net.minecraft.world.item.component.CustomData");
var Daycare_ItemLore = Java.type("net.minecraft.world.item.component.ItemLore");
var Daycare_InteractionHand = Java.type("net.minecraft.world.InteractionHand");
var Daycare_Component = Java.type("net.minecraft.network.chat.Component");
var Daycare_BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var Daycare_ResourceLocation = Java.type("net.minecraft.resources.ResourceLocation");
var Daycare_MCItemStack = Java.type("net.minecraft.world.item.ItemStack");
var Daycare_CompoundTag = Java.type("net.minecraft.nbt.CompoundTag");
var Daycare_Items = Java.type("net.minecraft.world.item.Items");
var Daycare_Base64 = Java.type("java.util.Base64");
var Daycare_StandardCharsets = Java.type("java.nio.charset.StandardCharsets");
var Daycare_TagParser = Java.type("net.minecraft.nbt.TagParser");
var Daycare_ArrayList = Java.type("java.util.ArrayList");
var Daycare_System = Java.type("java.lang.System");
var Daycare_Instant = Java.type("java.time.Instant");
var Daycare_ZoneId = Java.type("java.time.ZoneId");
var Daycare_DateTimeFormatter = Java.type("java.time.format.DateTimeFormatter");
var Daycare_Stats = Java.type("com.cobblemon.mod.common.api.pokemon.stats.Stats");
var Daycare_Pokemon = Java.type("com.cobblemon.mod.common.pokemon.Pokemon");

var PICKER_GUI_ID = 9610;
var PICKER_SCROLL_ID = 9611;

var COUPON_ITEM_TYPE = "pokemon_daycare_coupon";
var RECEIPT_ID = "pokemon_daycare_receipt";
var RECEIPT_ITEM_ID = "minecraft:paper";
var RECEIPT_NAME = "§eРасписка";
var EMPTY_SLOT_TEXT = "<empty>";
var TIME_FORMATTER = Daycare_DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
var EXP_PER_MINUTE = 1000;
var STAT_ORDER = [
    Daycare_Stats.HP,
    Daycare_Stats.ATTACK,
    Daycare_Stats.DEFENCE,
    Daycare_Stats.SPECIAL_ATTACK,
    Daycare_Stats.SPECIAL_DEFENCE,
    Daycare_Stats.SPEED
];

function interact(event) {
    var player = event.player;
    var item = player.getMainhandItem();

    if (isDaycareReceipt(item)) {
        redeemReceipt(player, item);
        event.setCanceled(true);
        return;
    }

    if (!isDaycareCoupon(item)) {
        player.message("§eНужен купон на детский сад в основной руке.");
        event.setCanceled(true);
        return;
    }

    try {
        player.showCustomGui(createPickerGui(player));
    } catch (e) {
        player.message("§cНе удалось открыть меню детского сада.");
    }

    event.setCanceled(true);
}

function customGuiScroll(event) {
    try {
        if (event.gui == null || event.gui.getID() != PICKER_GUI_ID) return;
        if (event.scroll == null || event.scroll.getID() != PICKER_SCROLL_ID) return;

        handlePartyPick(event);
    } catch (e) {
        try {
            event.player.message("§cОшибка детского сада: " + e);
        } catch (ignored) {}
    }
}

function handlePartyPick(event) {
    var player = event.player;
    var index = getSelectedIndex(event.scroll);
    if (index < 0 || index > 5) return;

    var pokemon = getPartyPokemon(player, index);
    if (pokemon == null) {
        player.message("§cВ этом слоте нет покемона.");
        return;
    }

    var issuedAtMs = Daycare_System.currentTimeMillis();
    var receipt = createReceiptPaper(player, pokemon, issuedAtMs);
    if (receipt == null || receipt.isEmpty()) {
        player.message("§cНе удалось создать расписку.");
        return;
    }

    var removed = removePokemonFromParty(player, pokemon);
    if (!removed) {
        player.message("§cНе удалось забрать покемона из команды.");
        return;
    }

    if (!replaceCouponWithReceipt(player, receipt)) {
        restorePokemonToParty(player, pokemon);
        player.message("§cНе удалось выдать расписку.");
        return;
    }

    try {
        player.closeGui();
    } catch (ignoredClose) {}

    player.message("§aПокемон размещен в детском саду.");
}

function redeemReceipt(player, item) {
    var data = readReceiptData(item);
    if (data == null) {
        player.message("§cНе удалось прочитать расписку.");
        return;
    }

    var pokemon = loadPokemonFromPayload(player, data.payload);
    if (pokemon == null) {
        player.message("§cНе удалось восстановить покемона из расписки.");
        return;
    }

    var expGain = calculateExperienceGain(data.issuedAtMs, Daycare_System.currentTimeMillis());
    applyExperienceGain(pokemon, expGain);

    if (!addPokemonToParty(player, pokemon)) {
        player.message("§cНе удалось вернуть покемона в команду. Освободи место.");
        return;
    }

    if (!consumeReceipt(player)) {
        removePokemonFromParty(player, pokemon);
        player.message("§cНе удалось забрать расписку.");
        return;
    }

    player.message("§aПокемон возвращен из детского сада.");
    player.message("§7Получено опыта: §f" + expGain);
}

function createPickerGui(player) {
    var gui = Daycare_NpcAPI.Instance().createCustomGui(PICKER_GUI_ID, 292, 190, false, player);
    gui.addLabel(1, "Выбор покемона", 10, 10, 180, 18, 0xFFFFFF);
    gui.addColoredLine(2, 10, 34, 272, 34, 0x4A8F80, 1.5);
    gui.addScroll(PICKER_SCROLL_ID, 10, 46, 272, 130, buildPartyEntries(player));
    return gui;
}

function buildPartyEntries(player) {
    var entries = [];

    for (var i = 0; i < 6; i++) {
        var pokemon = getPartyPokemon(player, i);
        if (pokemon == null) {
            entries.push((i + 1) + ". " + EMPTY_SLOT_TEXT);
        } else {
            entries.push((i + 1) + ". " + getPokemonDisplayName(pokemon) + " Lv." + getPokemonLevel(pokemon));
        }
    }

    return entries;
}

function createReceiptPaper(player, pokemon, issuedAtMs) {
    try {
        var itemType = Daycare_BuiltInRegistries.ITEM.get(Daycare_ResourceLocation.parse(RECEIPT_ITEM_ID));
        if (itemType == null) return null;

        var mcStack = new Daycare_MCItemStack(itemType);
        if (mcStack == null || mcStack.isEmpty()) return null;

        var payload = encodePokemonPayload(player, pokemon);
        if (!hasText(payload)) return null;

        var summary = serializePokemon(pokemon);
        var tag = new Daycare_CompoundTag();
        tag.putString("receipt_id", RECEIPT_ID);
        tag.putLong("issued_at_ms", issuedAtMs);
        tag.putString("pokemon_payload_b64", payload);
        tag.putString("display_name", summary.displayName);
        tag.putString("species", summary.species);
        tag.putString("level", summary.level);
        tag.putString("shiny", summary.shiny);
        tag.putString("ball", summary.ball);
        tag.putString("ability", summary.ability);
        tag.putString("nature", summary.nature);
        tag.putString("gender", summary.gender);
        tag.putString("form", summary.form);
        tag.putString("friendship", summary.friendship);
        tag.putString("held_item", summary.heldItem);
        tag.putString("moves", summary.moves);
        tag.putString("iv", summary.iv);
        tag.putString("ev", summary.ev);

        mcStack.set(Daycare_DataComponents.CUSTOM_NAME, Daycare_Component.literal(RECEIPT_NAME));
        mcStack.set(Daycare_DataComponents.CUSTOM_DATA, Daycare_CustomData.of(tag));
        mcStack.set(Daycare_DataComponents.LORE, new Daycare_ItemLore(buildReceiptLore(summary, issuedAtMs)));

        var item = Daycare_NpcAPI.Instance().getIItemStack(mcStack);
        if (item == null || item.isEmpty()) return null;

        item.setStackSize(1);
        return item;
    } catch (e) {
        return null;
    }
}

function buildReceiptLore(summary, issuedAtMs) {
    var lines = new Daycare_ArrayList();
    lines.add(Daycare_Component.literal("Подтверждает сдачу покемона в детский сад."));
    lines.add(Daycare_Component.literal("Покемон: " + summary.displayName + " Lv." + summary.level));
    lines.add(Daycare_Component.literal("Время сдачи: " + formatIssuedAt(issuedAtMs)));
    lines.add(Daycare_Component.literal("Опыт: " + EXP_PER_MINUTE + " в минуту"));
    lines.add(Daycare_Component.literal("§7Одноразовый предмет."));
    return lines;
}

function serializePokemon(pokemon) {
    return {
        displayName: getPokemonDisplayName(pokemon),
        species: getPokemonSpeciesId(pokemon),
        level: "" + getPokemonLevel(pokemon),
        shiny: isPokemonShiny(pokemon) ? "yes" : "no",
        ball: getPokemonBallName(pokemon),
        ability: getPokemonAbilityName(pokemon),
        nature: getPokemonNatureName(pokemon),
        gender: getPokemonGenderName(pokemon),
        form: getPokemonFormName(pokemon),
        friendship: getPokemonFriendship(pokemon),
        heldItem: getPokemonHeldItemId(pokemon),
        moves: joinMoves(pokemon),
        iv: joinStats(pokemon.getIvs()),
        ev: joinStats(pokemon.getEvs())
    };
}

function encodePokemonPayload(player, pokemon) {
    try {
        var level = player.getMCEntity().level();
        var tag = pokemon.saveToNBT(level.registryAccess(), new Daycare_CompoundTag());
        var raw = "" + tag;
        return Daycare_Base64.getEncoder().encodeToString(
            new java.lang.String(raw).getBytes(Daycare_StandardCharsets.UTF_8)
        );
    } catch (e) {
        return null;
    }
}

function readReceiptData(item) {
    var tag = getCustomTag(item);
    if (tag == null) return null;

    try {
        if (readTag(tag, "receipt_id") != RECEIPT_ID) return null;

        return {
            issuedAtMs: tag.getLong("issued_at_ms"),
            payload: readTag(tag, "pokemon_payload_b64")
        };
    } catch (e) {
        return null;
    }
}

function loadPokemonFromPayload(player, payload) {
    try {
        var decoded = new java.lang.String(
            Daycare_Base64.getDecoder().decode(payload),
            Daycare_StandardCharsets.UTF_8
        );
        var tag = Daycare_TagParser.parseTag("" + decoded);
        return new Daycare_Pokemon().loadFromNBT(
            player.getMCEntity().level().registryAccess(),
            tag
        );
    } catch (e) {
        return null;
    }
}

function calculateExperienceGain(issuedAtMs, nowMs) {
    var elapsed = nowMs - issuedAtMs;
    if (elapsed <= 0) return 0;

    return Math.floor((elapsed / 60000) * EXP_PER_MINUTE);
}

function applyExperienceGain(pokemon, expGain) {
    if (pokemon == null || expGain <= 0) return;

    try {
        pokemon.setExperienceAndUpdateLevel(pokemon.getExperience() + expGain);
    } catch (e) {}
}

function removePokemonFromParty(player, pokemon) {
    var party = getPlayerParty(player);
    if (party == null || pokemon == null) return false;

    try {
        return party.remove(pokemon);
    } catch (e) {
        return false;
    }
}

function addPokemonToParty(player, pokemon) {
    var party = getPlayerParty(player);
    if (party == null || pokemon == null) return false;

    try {
        return party.add(pokemon);
    } catch (e) {
        return false;
    }
}

function restorePokemonToParty(player, pokemon) {
    var party = getPlayerParty(player);
    if (party == null || pokemon == null) return false;

    try {
        return party.add(pokemon);
    } catch (e) {
        return false;
    }
}

function consumeReceipt(player) {
    try {
        var mcPlayer = player.getMCEntity();
        var handStack = mcPlayer.getItemInHand(Daycare_InteractionHand.MAIN_HAND);
        if (handStack == null || handStack.isEmpty()) return false;

        var wrapped = Daycare_NpcAPI.Instance().getIItemStack(handStack);
        if (!isDaycareReceipt(wrapped)) return false;

        handStack.shrink(1);
        player.updatePlayerInventory();
        return true;
    } catch (e) {
        return false;
    }
}

function replaceCouponWithReceipt(player, receipt) {
    try {
        var mcPlayer = player.getMCEntity();
        var handStack = mcPlayer.getItemInHand(Daycare_InteractionHand.MAIN_HAND);
        if (handStack == null || handStack.isEmpty()) return false;

        var wrapped = Daycare_NpcAPI.Instance().getIItemStack(handStack);
        if (!isDaycareCoupon(wrapped)) return false;

        if (handStack.getCount() <= 1) {
            mcPlayer.setItemInHand(Daycare_InteractionHand.MAIN_HAND, receipt.getMCItemStack());
            player.updatePlayerInventory();
            return true;
        }

        if (!giveItemToPlayer(player, receipt)) {
            return false;
        }

        handStack.shrink(1);
        player.updatePlayerInventory();
        return true;
    } catch (e) {
        return false;
    }
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

function isDaycareCoupon(item) {
    var tag = getCustomTag(item);
    if (tag == null) return false;
    return readTag(tag, "coupon_type") == COUPON_ITEM_TYPE;
}

function isDaycareReceipt(item) {
    var tag = getCustomTag(item);
    if (tag == null) return false;
    return readTag(tag, "receipt_id") == RECEIPT_ID;
}

function getCustomTag(item) {
    if (item == null || item.isEmpty()) return null;

    try {
        var customData = item.getMCItemStack().get(Daycare_DataComponents.CUSTOM_DATA);
        if (customData == null) return null;
        return customData.copyTag();
    } catch (e) {
        return null;
    }
}

function readTag(tag, key) {
    try {
        return "" + tag.getString(key);
    } catch (e) {
        return "";
    }
}

function getPlayerParty(player) {
    try {
        return Daycare_PlayerExtensionsKt.party(player.getMCEntity());
    } catch (e1) {
        try {
            return Daycare_Cobblemon.INSTANCE.getStorage().getParty(player.getMCEntity());
        } catch (e2) {
            return null;
        }
    }
}

function getPartyPokemon(player, index) {
    var party = getPlayerParty(player);
    if (party == null) return null;

    try {
        if (index < 0 || index >= party.size()) return null;
        return party.get(index);
    } catch (e) {
        return null;
    }
}

function joinStats(statsObject) {
    var values = [];
    for (var i = 0; i < STAT_ORDER.length; i++) {
        values.push("" + statsObject.get(STAT_ORDER[i]));
    }
    return values.join("/");
}

function joinMoves(pokemon) {
    var names = [];

    try {
        var moveSet = pokemon.getMoveSet();
        for (var i = 0; i < 4; i++) {
            var move = moveSet.get(i);
            if (move != null) names.push("" + move.getName());
        }
    } catch (e) {}

    return names.join("/");
}

function getPokemonDisplayName(pokemon) {
    try {
        var display = pokemon.getDisplayName(false);
        if (display != null) {
            var text = "" + display.getString();
            if (hasText(text)) return text;
        }
    } catch (e1) {}

    try {
        var translated = pokemon.getSpecies().getTranslatedName();
        if (translated != null) {
            var translatedText = "" + translated.getString();
            if (hasText(translatedText)) return translatedText;
        }
    } catch (e2) {}

    return "unknown";
}

function getPokemonSpeciesId(pokemon) {
    try {
        return "" + pokemon.getSpecies().getResourceIdentifier();
    } catch (e) {
        return "";
    }
}

function getPokemonLevel(pokemon) {
    try {
        return "" + pokemon.getLevel();
    } catch (e) {
        return "?";
    }
}

function isPokemonShiny(pokemon) {
    try {
        return pokemon.getShiny();
    } catch (e) {
        return false;
    }
}

function getPokemonBallName(pokemon) {
    try {
        return "" + pokemon.getCaughtBall().getName();
    } catch (e) {
        return "";
    }
}

function getPokemonAbilityName(pokemon) {
    try {
        return "" + pokemon.getAbility().getName();
    } catch (e) {
        return "";
    }
}

function getPokemonNatureName(pokemon) {
    try {
        return "" + pokemon.getNature().getName();
    } catch (e) {
        return "";
    }
}

function getPokemonGenderName(pokemon) {
    try {
        return "" + pokemon.getGender().name();
    } catch (e) {
        return "";
    }
}

function getPokemonFormName(pokemon) {
    try {
        return "" + pokemon.getForm().getName();
    } catch (e) {
        return "";
    }
}

function getPokemonFriendship(pokemon) {
    try {
        return "" + pokemon.getFriendship();
    } catch (e) {
        return "";
    }
}

function getPokemonHeldItemId(pokemon) {
    try {
        var heldItem = pokemon.heldItem();
        if (heldItem != null && !heldItem.isEmpty()) {
            return "" + Daycare_BuiltInRegistries.ITEM.getKey(heldItem.getItem());
        }
    } catch (e) {}

    return "";
}

function getSelectedIndex(scroll) {
    try {
        var selection = scroll.getSelection();
        if (selection != null && selection.length > 0) return selection[0];
    } catch (e1) {}

    try {
        if (scroll.selection != null && scroll.selection.length > 0) return scroll.selection[0];
    } catch (e2) {}

    return -1;
}

function hasText(value) {
    return value != null && trimString(value).length > 0;
}

function trimString(value) {
    return ("" + value).replace(/^\s+|\s+$/g, "");
}

function formatIssuedAt(timestampMs) {
    try {
        return TIME_FORMATTER.format(
            Daycare_Instant.ofEpochMilli(timestampMs).atZone(Daycare_ZoneId.systemDefault())
        );
    } catch (e) {
        return "" + timestampMs;
    }
}
