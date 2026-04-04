var DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var WritableBookContent = Java.type("net.minecraft.world.item.component.WritableBookContent");
var Filterable = Java.type("net.minecraft.server.network.Filterable");
var ArrayList = Java.type("java.util.ArrayList");
var NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var Items = Java.type("net.minecraft.world.item.Items");
var MCItemStack = Java.type("net.minecraft.world.item.ItemStack");
var PokemonFactory = loadPokemonFactory();

var CONFIG_MARKER = "config_id: pokemon_request";

function interact(event) {
    var npc = event.npc;
    var player = event.player;

    ensureDefaults(npc);

    var held = player.getMainhandItem();
    if (isPokemonConfigBook(held)) {
        createPokemonFromBook(npc, player, held);
        return;
    }

    if (!giveTemplateBook(player, npc)) {
        player.message("§cCould not give the config book. Free one inventory slot.");
        return;
    }

    player.message("§aPokemon config book was given.");
    player.message("§7Edit the book, hold it in main hand and right click the NPC again.");
    player.message("§7Fields left empty will be skipped.");
    sendCurrentTemplate(player, npc);
}

function createPokemonFromBook(npc, player, item) {
    var lines = readBookLines(item);
    if (lines == null || lines.length == 0) {
        player.message("§cCould not read the config book.");
        return;
    }

    var speciesValue = findFieldValue(lines, [
        "name",
        "species",
        "pokemon",
        "название"
    ]);
    if (speciesValue == null || trimString(speciesValue).length == 0) {
        player.message("§cName/Species is required to create a Pokemon.");
        return;
    }

    var result = PokemonFactory.createCubixPokemonItem({
        species: speciesValue,
        level: findFieldValue(lines, ["level", "уровень"]),
        shiny: findFieldValue(lines, ["shiny", "шайни"]),
        ball: findFieldValue(lines, ["ball", "шара", "шар"]),
        ability: findFieldValue(lines, ["ability", "способность"]),
        iv: findFieldValue(lines, ["iv", "ivs"]),
        ev: findFieldValue(lines, ["ev", "evs"])
    });

    if (!result.ok) {
        player.message("§c" + result.error);
        player.message("§7Check species, ball and ability names.");
        return;
    }

    if (!giveItemToPlayer(player, result.item)) {
        player.message("§cCould not give the Pokemon item. Free one inventory slot.");
        return;
    }

    updateTemplateDefaultsFromBook(npc, lines);
    player.message("§aPokemon item created: " + result.speciesId);
}

function ensureDefaults(npc) {
    putDefault(npc, "pokemon_book_species", "mewtwo");
    putDefault(npc, "pokemon_book_level", "1");
    putDefault(npc, "pokemon_book_shiny", "no");
    putDefault(npc, "pokemon_book_ball", "cobblemon:poke_ball");
    putDefault(npc, "pokemon_book_ability", "pressure");
    putDefault(npc, "pokemon_book_iv", "2/31/28/15/23/3");
    putDefault(npc, "pokemon_book_ev", "0/0/0/0/0/0");
}

function putDefault(npc, key, value) {
    if (!npc.getStoreddata().has(key)) {
        npc.getStoreddata().put(key, value);
    }
}

function updateTemplateDefaultsFromBook(npc, lines) {
    storeFieldIfPresent(npc, lines, "pokemon_book_species", ["name", "species", "pokemon", "название"]);
    storeFieldIfPresent(npc, lines, "pokemon_book_level", ["level", "уровень"]);
    storeFieldIfPresent(npc, lines, "pokemon_book_shiny", ["shiny", "шайни"]);
    storeFieldIfPresent(npc, lines, "pokemon_book_ball", ["ball", "шара", "шар"]);
    storeFieldIfPresent(npc, lines, "pokemon_book_ability", ["ability", "способность"]);
    storeFieldIfPresent(npc, lines, "pokemon_book_iv", ["iv", "ivs"]);
    storeFieldIfPresent(npc, lines, "pokemon_book_ev", ["ev", "evs"]);
}

function storeFieldIfPresent(npc, lines, key, aliases) {
    var value = findFieldValue(lines, aliases);
    if (value == null) return;
    npc.getStoreddata().put(key, "" + value);
}

function sendCurrentTemplate(player, npc) {
    player.message("§7--- Pokemon Book Template ---");
    player.message("§7Name: §f" + npc.getStoreddata().get("pokemon_book_species"));
    player.message("§7Level: §f" + npc.getStoreddata().get("pokemon_book_level"));
    player.message("§7Shiny: §f" + npc.getStoreddata().get("pokemon_book_shiny"));
    player.message("§7Ball: §f" + npc.getStoreddata().get("pokemon_book_ball"));
    player.message("§7Ability: §f" + npc.getStoreddata().get("pokemon_book_ability"));
    player.message("§7IV: §f" + npc.getStoreddata().get("pokemon_book_iv"));
    player.message("§7EV: §f" + npc.getStoreddata().get("pokemon_book_ev"));
}

function giveTemplateBook(player, npc) {
    var book = createWritableBook();
    if (book == null || book.isEmpty()) {
        return false;
    }

    book.setStackSize(1);

    var page = CONFIG_MARKER + "\n"
        + "Name: " + npc.getStoreddata().get("pokemon_book_species") + "\n"
        + "Level: " + npc.getStoreddata().get("pokemon_book_level") + "\n"
        + "Shiny: " + npc.getStoreddata().get("pokemon_book_shiny") + "\n"
        + "Ball: " + npc.getStoreddata().get("pokemon_book_ball") + "\n"
        + "Ability: " + npc.getStoreddata().get("pokemon_book_ability") + "\n"
        + "IV: " + npc.getStoreddata().get("pokemon_book_iv") + "\n"
        + "EV: " + npc.getStoreddata().get("pokemon_book_ev");

    tryFillBook(book, [page]);
    return giveItemToPlayer(player, book);
}

function createWritableBook() {
    try {
        var mcStack = new MCItemStack(Items.WRITABLE_BOOK);
        return NpcAPI.Instance().getIItemStack(mcStack);
    } catch (e) {
        return null;
    }
}

function tryFillBook(item, pagesText) {
    if (item == null || item.isEmpty()) return false;

    try {
        var mcStack = item.getMCItemStack();
        var pages = new ArrayList();

        for (var i = 0; i < pagesText.length; i++) {
            pages.add(Filterable.passThrough("" + pagesText[i]));
        }

        mcStack.set(DataComponents.WRITABLE_BOOK_CONTENT, new WritableBookContent(pages));
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

    return false;
}

function isPokemonConfigBook(item) {
    if (item == null || item.isEmpty()) return false;

    var lines = readBookLines(item);
    if (lines == null || lines.length == 0) return false;

    for (var i = 0; i < lines.length; i++) {
        if (normalizeLine(lines[i]) == CONFIG_MARKER) {
            return true;
        }
    }

    return false;
}

function readBookLines(item) {
    var mcStack = item.getMCItemStack();
    if (mcStack == null || mcStack.isEmpty()) return null;

    var lines = new ArrayList();

    var writable = mcStack.get(DataComponents.WRITABLE_BOOK_CONTENT);
    if (writable != null) {
        collectWritableBookLines(lines, writable);
    }

    var written = mcStack.get(DataComponents.WRITTEN_BOOK_CONTENT);
    if (written != null) {
        collectWrittenBookLines(lines, written);
    }

    if (lines.isEmpty()) return null;
    return lines.toArray();
}

function collectWritableBookLines(out, content) {
    var pages = content.pages();
    if (pages == null) return;

    var it = pages.iterator();
    while (it.hasNext()) {
        var filterable = it.next();
        if (filterable == null) continue;
        pushPageLines(out, String(filterable.raw()));
    }
}

function collectWrittenBookLines(out, content) {
    var pages = content.getPages(false);
    if (pages == null) return;

    var it = pages.iterator();
    while (it.hasNext()) {
        var page = it.next();
        if (page == null) continue;
        pushPageLines(out, String(page.getString()));
    }
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

function findFieldValue(lines, aliases) {
    for (var i = 0; i < lines.length; i++) {
        var raw = "" + lines[i];
        var normalized = normalizeLine(raw);

        for (var j = 0; j < aliases.length; j++) {
            var alias = normalizeLine(aliases[j]);
            if (normalized.indexOf(alias + ":") === 0) {
                return trimString(raw.substring(raw.indexOf(":") + 1));
            }
        }
    }

    return null;
}

function normalizeLine(s) {
    return trimString("" + s).toLowerCase();
}

function trimString(s) {
    return ("" + s).replace(/^\s+|\s+$/g, "");
}

function parseIntSafe(s, def) {
    try {
        var value = parseInt("" + s, 10);
        return isNaN(value) ? def : value;
    } catch (e) {
        return def;
    }
}

function hasText(value) {
    return value != null && trimString(value).length > 0;
}

function loadPokemonFactory() {
    return {
        createCubixPokemonItem: function(config) {
            var PokemonFactory_Optional = Java.type("java.util.Optional");
            var PokemonFactory_NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
            var PokemonFactory_MCItemStack = Java.type("net.minecraft.world.item.ItemStack");

            var PokemonFactory_PokemonProperties = Java.type("com.cobblemon.mod.common.api.pokemon.PokemonProperties");
            var PokemonFactory_IVs = Java.type("com.cobblemon.mod.common.pokemon.IVs");
            var PokemonFactory_EVs = Java.type("com.cobblemon.mod.common.pokemon.EVs");
            var PokemonFactory_Stats = Java.type("com.cobblemon.mod.common.api.pokemon.stats.Stats");

            var PokemonFactory_CubixCobblemonItems = Java.type("net.im51111n355.cubixcobblemon.common.CubixCobblemonItems");
            var PokemonFactory_CubixCobblemonDataComponents = Java.type("net.im51111n355.cubixcobblemon.common.CubixCobblemonDataComponents");
            var PokemonFactory_PokemonComponent = Java.type("net.im51111n355.cubixcobblemon.common.item.component.PokemonComponent");

            var statOrder = [
                PokemonFactory_Stats.HP,
                PokemonFactory_Stats.ATTACK,
                PokemonFactory_Stats.DEFENCE,
                PokemonFactory_Stats.SPECIAL_ATTACK,
                PokemonFactory_Stats.SPECIAL_DEFENCE,
                PokemonFactory_Stats.SPEED
            ];

            function trimLocal(s) {
                return ("" + s).replace(/^\s+|\s+$/g, "");
            }

            function hasTextLocal(value) {
                return value != null && trimLocal(value).length > 0;
            }

            function normalizeLineLocal(s) {
                return trimLocal("" + s).toLowerCase();
            }

            function normalizeIdLocal(value) {
                return trimLocal("" + value).toLowerCase().replace(/\s+/g, "_");
            }

            function parseIntLocal(s, def) {
                try {
                    var value = parseInt("" + s, 10);
                    return isNaN(value) ? def : value;
                } catch (e) {
                    return def;
                }
            }

            function clampLocal(value, min, max) {
                if (value < min) return min;
                if (value > max) return max;
                return value;
            }

            function parseBooleanLocal(value) {
                var s = normalizeLineLocal(value);
                if (s == "yes" || s == "true" || s == "1" || s == "да") return true;
                if (s == "no" || s == "false" || s == "0" || s == "нет") return false;
                return null;
            }

            function buildStatsLocal(statsObject, rawValue, min, max) {
                var parts = ("" + rawValue).split("/");

                for (var i = 0; i < statOrder.length; i++) {
                    if (i >= parts.length) break;

                    var token = trimLocal(parts[i]);
                    if (token.length == 0) continue;

                    var value = clampLocal(parseIntLocal(token, min), min, max);
                    statsObject.set(statOrder[i], value);
                }

                return statsObject;
            }

            function parsePropsLocal(speciesId) {
                try {
                    return PokemonFactory_PokemonProperties.Companion.parse(speciesId);
                } catch (e) {
                    return null;
                }
            }

            var speciesValue = trimLocal(config.species);
            if (speciesValue.length == 0) {
                return { ok: false, error: "Species is required." };
            }

            var normalizedSpecies = normalizeIdLocal(speciesValue);
            if (normalizedSpecies.indexOf(":") === -1) {
                normalizedSpecies = "cobblemon:" + normalizedSpecies;
            }

            var props = parsePropsLocal(normalizedSpecies);
            if (props == null || !hasTextLocal(props.getSpecies())) {
                return { ok: false, error: "Unknown species: " + speciesValue };
            }

            if (hasTextLocal(config.level)) {
                props.setLevel(clampLocal(parseIntLocal(config.level, 1), 1, 100));
            }

            if (hasTextLocal(config.shiny)) {
                var parsedShiny = parseBooleanLocal(config.shiny);
                if (parsedShiny == null) {
                    return { ok: false, error: "Shiny must be yes/no, true/false or да/нет." };
                }
                props.setShiny(parsedShiny);
            }

            if (hasTextLocal(config.ball)) {
                var normalizedBall = normalizeIdLocal(config.ball);
                if (normalizedBall.indexOf(":") === -1) {
                    normalizedBall = "cobblemon:" + normalizedBall;
                }
                props.setPokeball(normalizedBall);
            }

            if (hasTextLocal(config.ability)) {
                props.setAbility(normalizeIdLocal(config.ability));
            }

            if (hasTextLocal(config.iv)) {
                props.setIvs(buildStatsLocal(new PokemonFactory_IVs(), config.iv, 0, 31));
            }

            if (hasTextLocal(config.ev)) {
                props.setEvs(buildStatsLocal(new PokemonFactory_EVs(), config.ev, 0, 252));
            }

            var pokemon;
            try {
                pokemon = props.create();
            } catch (e2) {
                return { ok: false, error: "Could not build Pokemon data from this config." };
            }

            if (pokemon == null) {
                return { ok: false, error: "Cobblemon returned an empty Pokemon object." };
            }

            var mcStack;
            try {
                mcStack = new PokemonFactory_MCItemStack(PokemonFactory_CubixCobblemonItems.INSTANCE.getPOKEMON().get());
                mcStack.set(
                    PokemonFactory_CubixCobblemonDataComponents.INSTANCE.getPOKEMON().get(),
                    new PokemonFactory_PokemonComponent(PokemonFactory_Optional.of(pokemon))
                );
            } catch (e3) {
                return { ok: false, error: "Could not create cubixcobblemon:pokemon." };
            }

            if (mcStack == null || mcStack.isEmpty()) {
                return { ok: false, error: "Cubix returned an empty pokemon item." };
            }

            var item = PokemonFactory_NpcAPI.Instance().getIItemStack(mcStack);
            if (item == null || item.isEmpty()) {
                return { ok: false, error: "Could not wrap the created Pokemon item." };
            }

            item.setStackSize(1);
            return {
                ok: true,
                item: item,
                speciesId: "" + props.getSpecies()
            };
        }
    };
}
