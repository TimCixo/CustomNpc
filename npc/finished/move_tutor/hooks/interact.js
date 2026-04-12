var TeamPicker_Moves = Java.type("com.cobblemon.mod.common.api.moves.Moves");
var TeamPicker_NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var TeamPicker_Cobblemon = Java.type("com.cobblemon.mod.common.Cobblemon");
var TeamPicker_PlayerExtensionsKt = Java.type("com.cobblemon.mod.common.util.PlayerExtensionsKt");
var TeamPicker_LearnsetQuery = Java.type("com.cobblemon.mod.common.api.pokemon.moves.LearnsetQuery");
var TeamPicker_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var TeamPicker_InteractionHand = Java.type("net.minecraft.world.InteractionHand");

var PICKER_GUI_ID = 9410;
var PICKER_SCROLL_ID = 9411;

var MOVE_GUI_ID = 9420;
var MOVE_SCROLL_ID = 9421;
var MOVE_TITLE_ID = 9422;

var SELECTED_SLOT_KEY = "team_picker_selected_slot";
var COUPON_ITEM_TYPE = "move_teach_coupon";
var EMPTY_SLOT_TEXT = "<empty>";

function interact(event) {
    var player = event.player;
    var item = player.getMainhandItem();

    if (!isMoveTeachCoupon(item)) {
        player.message("§eНужен купон на изучение движения в основной руке.");
        event.setCanceled(true);
        return;
    }

    try {
        player.showCustomGui(createPickerGui(player));
    } catch (e) {
        player.message("§cCould not open team picker: " + e);
    }

    event.setCanceled(true);
}

function customGuiScroll(event) {
    try {
        if (event.gui == null || event.scroll == null) return;

        if (event.gui.getID() == PICKER_GUI_ID && event.scroll.getID() == PICKER_SCROLL_ID) {
            handlePartyPick(event);
            return;
        }

        if (event.gui.getID() == MOVE_GUI_ID && event.scroll.getID() == MOVE_SCROLL_ID) {
            handleMovePick(event);
            return;
        }
    } catch (e) {
        try {
            event.player.message("§cTeam picker error: " + e);
        } catch (ignored) {}
    }
}

function handlePartyPick(event) {
    var index = getSelectedIndex(event.scroll);
    if (index < 0 || index > 5) return;

    var pokemon = getPartyPokemon(event.player, index);
    if (pokemon == null) return;

    event.player.getStoreddata().put(SELECTED_SLOT_KEY, "" + (index + 1));
    event.player.showCustomGui(createMoveGui(event.player, pokemon));
}

function handleMovePick(event) {
    var player = event.player;
    var index = getSelectedIndex(event.scroll);
    if (index < 0) return;

    var slotText = trimString(player.getStoreddata().get(SELECTED_SLOT_KEY));
    if (!hasText(slotText)) {
        player.message("§cNo selected party slot.");
        return;
    }

    var slotIndex = parseInt(slotText, 10) - 1;
    if (isNaN(slotIndex) || slotIndex < 0 || slotIndex > 5) {
        player.message("§cInvalid selected slot.");
        return;
    }

    var pokemon = getPartyPokemon(player, slotIndex);
    if (pokemon == null) {
        player.message("§cSelected Pokemon is no longer in that slot.");
        return;
    }

    var learnableMoves = getLearnableMoves(pokemon);
    if (learnableMoves == null || index >= learnableMoves.length) return;

    var move = learnableMoves[index];
    if (move == null) return;

    var moveName = getMoveCommandName(move);
    if (!hasText(moveName)) return;

    try {
        player.closeGui();
    } catch (eClose1) {}

    var command = "teach " + getPlayerName(player) + " " + slotText + " " + moveName;
    var output = runServerCommand(player, command);

    if (output == null) {
        player.message("§cCould not run /teach.");
        return;
    }

    consumeOneCoupon(player);

    if (hasText(output)) player.message(output);
}

function createPickerGui(player) {
    var gui = TeamPicker_NpcAPI.Instance().createCustomGui(PICKER_GUI_ID, 292, 190, false, player);
    gui.addLabel(1, "Choose Pokemon", 10, 10, 180, 18, 0xFFFFFF);
    gui.addColoredLine(2, 10, 34, 272, 34, 0x4A8F80, 1.5);
    gui.addScroll(PICKER_SCROLL_ID, 10, 46, 272, 130, buildPartyEntries(player));
    return gui;
}

function createMoveGui(player, pokemon) {
    var gui = TeamPicker_NpcAPI.Instance().createCustomGui(MOVE_GUI_ID, 292, 220, false, player);
    gui.addLabel(MOVE_TITLE_ID, getPokemonDisplayName(pokemon) + " /teach moves", 10, 10, 272, 18, 0xFFFFFF);
    gui.addColoredLine(3, 10, 34, 272, 34, 0x4A8F80, 1.5);
    gui.addScroll(MOVE_SCROLL_ID, 10, 46, 272, 160, getLearnableMoveDisplayNames(pokemon));
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

function getLearnableMoves(pokemon) {
    var learnset = getPokemonLearnset(pokemon);
    if (learnset == null) {
        return [];
    }

    var query;
    try {
        query = TeamPicker_LearnsetQuery.Companion.getANY();
    } catch (e) {
        return [];
    }

    var allMoves;
    try {
        allMoves = TeamPicker_Moves.all();
    } catch (e2) {
        return [];
    }

    if (allMoves == null || allMoves.isEmpty()) {
        return [];
    }

    var moves = [];
    var seen = {};
    for (var i = 0; i < allMoves.size(); i++) {
        var move = allMoves.get(i);
        if (move == null) continue;

        var name = trimString(getMoveCommandName(move));
        if (!hasText(name)) continue;
        if (pokemonAlreadyKnowsMove(pokemon, name)) continue;

        var canLearn = false;
        try {
            canLearn = query.canLearn(move, learnset);
        } catch (e3) {
            canLearn = false;
        }
        if (!canLearn) continue;

        var key = name.toLowerCase();
        if (seen[key]) continue;
        seen[key] = true;
        moves.push(move);
    }

    moves.sort(function(a, b) {
        var left = getMoveDisplayName(a).toLowerCase();
        var right = getMoveDisplayName(b).toLowerCase();
        if (left < right) return -1;
        if (left > right) return 1;
        return 0;
    });

    return moves;
}

function getLearnableMoveDisplayNames(pokemon) {
    var moves = getLearnableMoves(pokemon);
    if (moves == null || moves.length <= 0) {
        return ["No learnable moves"];
    }

    var names = [];
    for (var i = 0; i < moves.length; i++) {
        names.push(getMoveDisplayName(moves[i]));
    }
    return names;
}

function runServerCommand(player, command) {
    try {
        var mcPlayer = player.getMCEntity();
        var server = mcPlayer.level().getServer();
        var source = server.createCommandSourceStack()
            .withPermission(4)
            .withSuppressedOutput();
        server.getCommands().performPrefixedCommand(source, stripLeadingSlash(command));
        return "";
    } catch (e) {
        return null;
    }
}

function isMoveTeachCoupon(item) {
    var tag = getCustomTag(item);
    if (tag == null) return false;
    return readTag(tag, "coupon_type") == COUPON_ITEM_TYPE;
}

function getCustomTag(item) {
    if (item == null || item.isEmpty()) return null;

    try {
        var customData = item.getMCItemStack().get(TeamPicker_DataComponents.CUSTOM_DATA);
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

function consumeOneCoupon(player) {
    try {
        var mcPlayer = player.getMCEntity();
        var handStack = mcPlayer.getItemInHand(TeamPicker_InteractionHand.MAIN_HAND);
        if (handStack == null || handStack.isEmpty()) return false;

        var wrapped = TeamPicker_NpcAPI.Instance().getIItemStack(handStack);
        if (!isMoveTeachCoupon(wrapped)) return false;

        handStack.shrink(1);
        player.updatePlayerInventory();
        return true;
    } catch (e) {
        return false;
    }
}

function getPokemonLearnset(pokemon) {
    try {
        var form = pokemon.getForm();
        if (form != null && form.getMoves() != null) return form.getMoves();
    } catch (e1) {}

    try {
        var species = pokemon.getSpecies();
        if (species != null && species.getMoves() != null) return species.getMoves();
    } catch (e2) {}

    return null;
}

function pokemonAlreadyKnowsMove(pokemon, moveName) {
    var target = trimString(moveName).toLowerCase();
    if (!hasText(target)) return false;

    try {
        var moves = pokemon.getMoveSet().getMoves();
        for (var i = 0; i < moves.size(); i++) {
            var move = moves.get(i);
            if (move == null || move.getTemplate() == null) continue;
            if (trimString("" + move.getTemplate().getName()).toLowerCase() == target) return true;
        }
    } catch (e1) {}

    try {
        var benched = pokemon.getBenchedMoves();
        for (var j = 0; j < benched.size(); j++) {
            var benchedMove = benched.get(j);
            if (benchedMove == null || benchedMove.getMoveTemplate() == null) continue;
            if (trimString("" + benchedMove.getMoveTemplate().getName()).toLowerCase() == target) return true;
        }
    } catch (e2) {}

    return false;
}

function getMoveCommandName(move) {
    try {
        return "" + move.getName();
    } catch (e) {
        return "";
    }
}

function getMoveDisplayName(move) {
    try {
        var display = move.getDisplayName();
        if (display != null) {
            var text = "" + display.getString();
            if (hasText(text)) return text;
        }
    } catch (e1) {}

    return getMoveCommandName(move);
}

function getPlayerParty(player) {
    try {
        return TeamPicker_PlayerExtensionsKt.party(player.getMCEntity());
    } catch (e1) {
        try {
            return TeamPicker_Cobblemon.INSTANCE.getStorage().getParty(player.getMCEntity());
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

function getPokemonLevel(pokemon) {
    try {
        return "" + pokemon.getLevel();
    } catch (e) {
        return "?";
    }
}

function getPlayerName(player) {
    try {
        return "" + player.getName();
    } catch (e) {
        return "" + player.getDisplayName();
    }
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

function stripLeadingSlash(command) {
    var cmd = trimString(command);
    if (cmd.indexOf("/") === 0) return cmd.substring(1);
    return cmd;
}

function hasText(value) {
    return value != null && trimString(value).length > 0;
}

function trimString(value) {
    return ("" + value).replace(/^\s+|\s+$/g, "");
}
