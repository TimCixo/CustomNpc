var DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var WrittenBookContent = Java.type("net.minecraft.world.item.component.WrittenBookContent");
var Filterable = Java.type("net.minecraft.server.network.Filterable");
var ArrayList = Java.type("java.util.ArrayList");
var Optional = Java.type("java.util.Optional");
var Base64 = Java.type("java.util.Base64");
var StandardCharsets = Java.type("java.nio.charset.StandardCharsets");
var System = Java.type("java.lang.System");

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

var RECEIPT_TITLE = "Расписка";
var RECEIPT_MARKER = "receipt_type: kindergarten_pokemon";
var PAYLOAD_MARKER = "payload_b64:";
var ISSUED_AT_MARKER = "issued_at_ms:";
var EXP_PER_MINUTE = 1000;
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
        exchangePokemonToReceipt(player, npc, held);
        return;
    }

    if (isKindergartenReceiptBook(held)) {
        exchangeReceiptToPokemon(player, held);
        return;
    }

    player.message("§7Hold cubixcobblemon:pokemon to leave it in the kindergarten.");
    player.message("§7Hold the signed receipt to take the Pokemon back with gained experience.");
}

function exchangePokemonToReceipt(player, npc, held) {
    var pokemon = extractPokemonFromItem(held);
    if (pokemon == null) {
        player.message("§cCould not read Pokemon data from the held item.");
        return;
    }

    var issuedAt = System.currentTimeMillis();
    var receipt = createReceiptBook(npc, pokemon, issuedAt);
    if (receipt == null || receipt.isEmpty()) {
        player.message("§cCould not create the kindergarten receipt.");
        return;
    }

    if (!replaceHeldItem(player, receipt)) {
        player.message("§cCould not replace the held Pokemon with the receipt.");
        return;
    }

    player.message("§aPokemon was left in the kindergarten.");
}

function exchangeReceiptToPokemon(player, held) {
    var lines = readBookLines(held);
    if (lines == null || lines.length == 0) {
        player.message("§cCould not read the receipt.");
        return;
    }

    var payload = extractPayload(lines);
    if (!hasText(payload)) {
        player.message("§cReceipt does not contain Pokemon payload.");
        return;
    }

    var issuedAtMs = extractIssuedAt(lines);
    if (issuedAtMs <= 0) {
        player.message("§cReceipt does not contain kindergarten time data.");
        return;
    }

    var pokemon = loadPokemonFromPayload(player, payload);
    if (pokemon == null) {
        player.message("§cCould not restore Pokemon data from the receipt.");
        return;
    }

    var expGain = calculateExperienceGain(issuedAtMs, System.currentTimeMillis());
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

function isKindergartenReceiptBook(item) {
    if (item == null || item.isEmpty()) return false;

    var title = readWrittenBookTitle(item);
    if (title != RECEIPT_TITLE) {
        return false;
    }

    var lines = readBookLines(item);
    if (lines == null || lines.length == 0) return false;

    for (var i = 0; i < lines.length; i++) {
        if (normalizeLine(lines[i]) == normalizeLine(RECEIPT_MARKER)) {
            return true;
        }
    }

    return false;
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

function createReceiptBook(npc, pokemon, issuedAtMs) {
    try {
        var mcStack = new MCItemStack(Items.WRITTEN_BOOK);
        var pages = new ArrayList();
        var data = serializePokemon(pokemon);
        var payload = encodePokemonPayload(npc, pokemon);

        pages.add(Filterable.passThrough(Component.literal(buildReceiptPage1(data, issuedAtMs))));
        pages.add(Filterable.passThrough(Component.literal(buildReceiptPage2(data))));
        pages.add(Filterable.passThrough(Component.literal(buildReceiptPage3(data))));
        appendPayloadPages(pages, payload);

        mcStack.set(
            DataComponents.WRITTEN_BOOK_CONTENT,
            new WrittenBookContent(
                Filterable.passThrough(RECEIPT_TITLE),
                "" + npc.getName(),
                0,
                pages,
                true
            )
        );

        return NpcAPI.Instance().getIItemStack(mcStack);
    } catch (e) {
        return null;
    }
}

function serializePokemon(pokemon) {
    var heldItemId = "";
    try {
        var heldItem = pokemon.heldItem();
        if (heldItem != null && !heldItem.isEmpty()) {
            heldItemId = String(BuiltInRegistries.ITEM.getKey(heldItem.getItem()));
        }
    } catch (e) {}

    return {
        species: String(pokemon.getSpecies().getResourceIdentifier()),
        level: "" + pokemon.getLevel(),
        shiny: pokemon.getShiny() ? "yes" : "no",
        ball: String(pokemon.getCaughtBall().getName()),
        ability: "" + pokemon.getAbility().getName(),
        nature: String(pokemon.getNature().getName()),
        gender: "" + pokemon.getGender().name(),
        form: "" + pokemon.getForm().getName(),
        iv: joinStats(pokemon.getIvs()),
        ev: joinStats(pokemon.getEvs()),
        friendship: "" + pokemon.getFriendship(),
        heldItem: heldItemId,
        moves: joinMoves(pokemon.getMoveSet())
    };
}

function buildReceiptPage1(data, issuedAtMs) {
    return RECEIPT_MARKER + "\n"
        + ISSUED_AT_MARKER + " " + issuedAtMs + "\n"
        + "Species: " + data.species + "\n"
        + "Level: " + data.level + "\n"
        + "Shiny: " + data.shiny + "\n"
        + "Ball: " + data.ball;
}

function buildReceiptPage2(data) {
    return "Ability: " + data.ability + "\n"
        + "Nature: " + data.nature + "\n"
        + "Gender: " + data.gender + "\n"
        + "Form: " + data.form + "\n"
        + "IV: " + data.iv + "\n"
        + "EV: " + data.ev;
}

function buildReceiptPage3(data) {
    return "Friendship: " + data.friendship + "\n"
        + "Held Item: " + data.heldItem + "\n"
        + "Moves: " + data.moves + "\n"
        + "Exp Rate: " + EXP_PER_MINUTE + " per minute";
}

function appendPayloadPages(pages, payload) {
    if (!hasText(payload)) return;

    var chunks = splitFixed(payload, 180);
    for (var i = 0; i < chunks.length; i++) {
        pages.add(
            Filterable.passThrough(
                Component.literal(PAYLOAD_MARKER + " " + chunks[i])
            )
        );
    }
}

function joinStats(statsObject) {
    var values = [];
    for (var i = 0; i < STAT_ORDER.length; i++) {
        values.push("" + statsObject.get(STAT_ORDER[i]));
    }
    return values.join("/");
}

function joinMoves(moveSet) {
    var moves = [];
    for (var i = 0; i < 4; i++) {
        var move = moveSet.get(i);
        if (move != null) {
            moves.push("" + move.getName());
        }
    }
    return moves.join("/");
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

function extractPayload(lines) {
    var payload = "";

    for (var i = 0; i < lines.length; i++) {
        var raw = "" + lines[i];
        var normalized = normalizeLine(raw);
        if (normalized.indexOf(PAYLOAD_MARKER) === 0) {
            payload += trimString(raw.substring(raw.indexOf(":") + 1));
        }
    }

    return payload;
}

function extractIssuedAt(lines) {
    for (var i = 0; i < lines.length; i++) {
        var raw = "" + lines[i];
        var normalized = normalizeLine(raw);
        if (normalized.indexOf(ISSUED_AT_MARKER) === 0) {
            return parseLongSafe(trimString(raw.substring(raw.indexOf(":") + 1)), 0);
        }
    }

    return 0;
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
    return {
        ok: true,
        item: item,
        speciesId: String(pokemon.getSpecies().getResourceIdentifier())
    };
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

function readWrittenBookTitle(item) {
    try {
        var mcStack = item.getMCItemStack();
        var written = mcStack.get(DataComponents.WRITTEN_BOOK_CONTENT);
        if (written == null) return null;
        return trimString(String(written.title().raw()));
    } catch (e) {
        return null;
    }
}

function readBookLines(item) {
    var mcStack = item.getMCItemStack();
    if (mcStack == null || mcStack.isEmpty()) return null;

    var lines = new ArrayList();
    var written = mcStack.get(DataComponents.WRITTEN_BOOK_CONTENT);
    if (written == null) return null;

    var pages = written.getPages(false);
    if (pages == null) return null;

    var it = pages.iterator();
    while (it.hasNext()) {
        var page = it.next();
        if (page == null) continue;
        pushPageLines(lines, String(page.getString()));
    }

    if (lines.isEmpty()) return null;
    return lines.toArray();
}

function pushPageLines(out, pageText) {
    var split = ("" + pageText).split(/\r?\n/);
    for (var i = 0; i < split.length; i++) {
        var line = trimString(split[i]);
        if (line.length > 0) {
            out.add(line);
        }
    }
}

function normalizeLine(s) {
    return trimString("" + s).toLowerCase();
}

function trimString(s) {
    return ("" + s).replace(/^\s+|\s+$/g, "");
}

function parseLongSafe(s, def) {
    try {
        var value = java.lang.Long.parseLong("" + s);
        return value;
    } catch (e) {
        return def;
    }
}

function hasText(value) {
    return value != null && trimString(value).length > 0;
}

function splitFixed(s, chunkSize) {
    var result = [];
    var text = "" + s;

    for (var i = 0; i < text.length; i += chunkSize) {
        result.push(text.substring(i, i + chunkSize));
    }

    return result;
}
