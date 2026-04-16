var DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var CustomData = Java.type("net.minecraft.world.item.component.CustomData");
var ItemLore = Java.type("net.minecraft.world.item.component.ItemLore");
var ArrayList = Java.type("java.util.ArrayList");
var Optional = Java.type("java.util.Optional");
var Base64 = Java.type("java.util.Base64");
var StandardCharsets = Java.type("java.nio.charset.StandardCharsets");
var System = Java.type("java.lang.System");
var Instant = Java.type("java.time.Instant");
var ZoneId = Java.type("java.time.ZoneId");
var DateTimeFormatter = Java.type("java.time.format.DateTimeFormatter");

var NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var Items = Java.type("net.minecraft.world.item.Items");
var MCItemStack = Java.type("net.minecraft.world.item.ItemStack");
var InteractionHand = Java.type("net.minecraft.world.InteractionHand");
var Component = Java.type("net.minecraft.network.chat.Component");
var BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var CompoundTag = Java.type("net.minecraft.nbt.CompoundTag");
var TagParser = Java.type("net.minecraft.nbt.TagParser");

var Stats = Java.type("com.cobblemon.mod.common.api.pokemon.stats.Stats");
var Pokemon = Java.type("com.cobblemon.mod.common.pokemon.Pokemon");

var CubixCobblemonItems = Java.type("net.im51111n355.cubixcobblemon.common.CubixCobblemonItems");
var CubixCobblemonDataComponents = Java.type("net.im51111n355.cubixcobblemon.common.CubixCobblemonDataComponents");
var PokemonComponent = Java.type("net.im51111n355.cubixcobblemon.common.item.component.PokemonComponent");

var PAPER_NAME = "Расписка";
var RECEIPT_ID = "kindergarten_pokemon_paper";
var EXP_PER_MINUTE = 1000;
var TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
var STAT_ORDER = [
    Stats.HP,
    Stats.ATTACK,
    Stats.DEFENCE,
    Stats.SPECIAL_ATTACK,
    Stats.SPECIAL_DEFENCE,
    Stats.SPEED
];

function interact(event) {
    var player = event.player;
    var npc = event.npc;
    var held = player.getMainhandItem();

    if (isCubixPokemonItem(held)) {
        exchangePokemonToPaper(player, npc, held);
        return;
    }

    if (isKindergartenPaper(held)) {
        exchangePaperToPokemon(player, held);
        return;
    }

    player.message("§7Hold cubixcobblemon:pokemon to leave it in the kindergarten.");
    player.message("§7Hold the receipt paper to take the Pokemon back with gained experience.");
}

function exchangePokemonToPaper(player, npc, held) {
    var pokemon = extractPokemonFromItem(held);
    if (pokemon == null) {
        player.message("§cCould not read Pokemon data from the held item.");
        return;
    }

    var issuedAt = System.currentTimeMillis();
    var receipt = createReceiptPaper(npc, pokemon, issuedAt);
    if (receipt == null || receipt.isEmpty()) {
        player.message("§cCould not create the receipt paper.");
        return;
    }

    if (!replaceHeldItem(player, receipt)) {
        player.message("§cCould not replace the held Pokemon with the receipt.");
        return;
    }

    player.message("§aPokemon was left in the kindergarten.");
}

function exchangePaperToPokemon(player, held) {
    var data = readReceiptData(held);
    if (data == null) {
        player.message("§cCould not read the receipt paper data.");
        return;
    }

    var pokemon = loadPokemonFromPayload(player, data.payload);
    if (pokemon == null) {
        player.message("§cCould not restore Pokemon data from the receipt.");
        return;
    }

    var expGain = calculateExperienceGain(data.issuedAtMs, System.currentTimeMillis());
    applyExperienceGain(pokemon, expGain);

    var result = wrapCubixPokemonItem(pokemon);
    if (!result.ok) {
        player.message("§c" + result.error);
        return;
    }

    if (!replaceHeldItem(player, result.item)) {
        player.message("§cCould not replace the receipt with the Pokemon item.");
        return;
    }

    player.message("§aPokemon returned from kindergarten.");
    player.message("§7Experience gained: §f" + expGain);
}

function isCubixPokemonItem(item) {
    if (item == null || item.isEmpty()) return false;

    try {
        var mcStack = item.getMCItemStack();
        var itemId = String(BuiltInRegistries.ITEM.getKey(mcStack.getItem()));
        return itemId == "cubixcobblemon:pokemon";
    } catch (e) {
        return false;
    }
}

function isKindergartenPaper(item) {
    if (item == null || item.isEmpty()) return false;

    try {
        var mcStack = item.getMCItemStack();
        var itemId = String(BuiltInRegistries.ITEM.getKey(mcStack.getItem()));
        if (itemId != "minecraft:paper") return false;

        var customData = mcStack.get(DataComponents.CUSTOM_DATA);
        if (customData == null) return false;

        var tag = customData.copyTag();
        return tag.getString("receipt_id") == RECEIPT_ID;
    } catch (e) {
        return false;
    }
}

function extractPokemonFromItem(item) {
    try {
        var mcStack = item.getMCItemStack();
        var component = mcStack.get(CubixCobblemonDataComponents.INSTANCE.getPOKEMON().get());
        if (component == null) return null;

        var optionalPokemon = component.getPokemon();
        if (optionalPokemon == null || !optionalPokemon.isPresent()) return null;

        return optionalPokemon.get();
    } catch (e) {
        return null;
    }
}

function createReceiptPaper(npc, pokemon, issuedAtMs) {
    try {
        var mcStack = new MCItemStack(Items.PAPER);
        var payload = encodePokemonPayload(npc, pokemon);
        if (!hasText(payload)) return null;

        var summary = serializePokemon(pokemon);
        var tag = new CompoundTag();
        tag.putString("receipt_id", RECEIPT_ID);
        tag.putLong("issued_at_ms", issuedAtMs);
        tag.putString("pokemon_payload_b64", payload);
        tag.putString("species", summary.species);
        tag.putString("level", summary.level);
        tag.putString("shiny", summary.shiny);

        mcStack.set(DataComponents.CUSTOM_NAME, Component.literal(PAPER_NAME));
        mcStack.set(DataComponents.CUSTOM_DATA, CustomData.of(tag));
        mcStack.set(DataComponents.LORE, new ItemLore(buildLore(summary, issuedAtMs)));

        return NpcAPI.Instance().getIItemStack(mcStack);
    } catch (e) {
        return null;
    }
}

function buildLore(summary, issuedAtMs) {
    var lines = new ArrayList();
    lines.add(Component.literal("Kindergarten receipt"));
    lines.add(Component.literal("Pokemon: " + summary.displayName));
    lines.add(Component.literal("Issued at: " + formatIssuedAt(issuedAtMs)));
    lines.add(Component.literal("Exp rate: " + EXP_PER_MINUTE + " per minute"));
    return lines;
}

function readReceiptData(item) {
    try {
        var mcStack = item.getMCItemStack();
        var customData = mcStack.get(DataComponents.CUSTOM_DATA);
        if (customData == null) return null;

        var tag = customData.copyTag();
        if (tag.getString("receipt_id") != RECEIPT_ID) return null;

        return {
            issuedAtMs: tag.getLong("issued_at_ms"),
            payload: tag.getString("pokemon_payload_b64")
        };
    } catch (e) {
        return null;
    }
}

function serializePokemon(pokemon) {
    var displayName = "";
    try {
        displayName = pokemon.getSpecies().getTranslatedName().getString();
    } catch (e) {
        displayName = String(pokemon.getSpecies().getResourceIdentifier());
    }

    return {
        displayName: displayName,
        species: String(pokemon.getSpecies().getResourceIdentifier()),
        level: "" + pokemon.getLevel(),
        shiny: pokemon.getShiny() ? "yes" : "no",
        ball: String(pokemon.getCaughtBall().getName()),
        ability: "" + pokemon.getAbility().getName(),
        iv: joinStats(pokemon.getIvs()),
        ev: joinStats(pokemon.getEvs())
    };
}

function joinStats(statsObject) {
    var values = [];
    for (var i = 0; i < STAT_ORDER.length; i++) {
        values.push("" + statsObject.get(STAT_ORDER[i]));
    }
    return values.join("/");
}

function encodePokemonPayload(npc, pokemon) {
    try {
        var level = npc.getMCEntity().level();
        var tag = pokemon.saveToNBT(level.registryAccess(), new CompoundTag());
        var raw = "" + tag;
        return Base64.getEncoder().encodeToString(
            new java.lang.String(raw).getBytes(StandardCharsets.UTF_8)
        );
    } catch (e) {
        return null;
    }
}

function loadPokemonFromPayload(player, payload) {
    try {
        var decoded = new java.lang.String(
            Base64.getDecoder().decode(payload),
            StandardCharsets.UTF_8
        );
        var tag = TagParser.parseTag("" + decoded);
        return new Pokemon().loadFromNBT(
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
    if (expGain <= 0) return;

    try {
        pokemon.setExperienceAndUpdateLevel(pokemon.getExperience() + expGain);
    } catch (e) {}
}

function wrapCubixPokemonItem(pokemon) {
    var mcStack;
    try {
        mcStack = new MCItemStack(CubixCobblemonItems.INSTANCE.getPOKEMON().get());
        mcStack.set(
            CubixCobblemonDataComponents.INSTANCE.getPOKEMON().get(),
            new PokemonComponent(Optional.of(pokemon))
        );
    } catch (e) {
        return { ok: false, error: "Could not create cubixcobblemon:pokemon." };
    }

    if (mcStack == null || mcStack.isEmpty()) {
        return { ok: false, error: "Cubix returned an empty pokemon item." };
    }

    var item = NpcAPI.Instance().getIItemStack(mcStack);
    if (item == null || item.isEmpty()) {
        return { ok: false, error: "Could not wrap the created Pokemon item." };
    }

    item.setStackSize(1);
    return { ok: true, item: item };
}

function replaceHeldItem(player, replacementItem) {
    try {
        player.getMCEntity().setItemInHand(
            InteractionHand.MAIN_HAND,
            replacementItem.getMCItemStack()
        );
        player.updatePlayerInventory();
        return true;
    } catch (e) {
        return false;
    }
}

function hasText(value) {
    return value != null && trimString(value).length > 0;
}

function trimString(s) {
    return ("" + s).replace(/^\s+|\s+$/g, "");
}

function formatIssuedAt(timestampMs) {
    try {
        return TIME_FORMATTER.format(
            Instant.ofEpochMilli(timestampMs).atZone(ZoneId.systemDefault())
        );
    } catch (e) {
        return "" + timestampMs;
    }
}
