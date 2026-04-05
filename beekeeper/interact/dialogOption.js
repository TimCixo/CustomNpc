var NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var PlayerData = Java.type("noppes.npcs.controllers.data.PlayerData");
var BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var CubixCobblemonDataComponents = Java.type("net.im51111n355.cubixcobblemon.common.CubixCobblemonDataComponents");

var BEEKEEPER_QUESTS = [
    {
        questId: 11,
        confirmDialogId: 45,
        successDialogId: 48,
        failDialogId: 53,
        requiredSpecies: "cobblemon:combee",
        consumePokemon: true
    },
    {
        questId: 12,
        confirmDialogId: 51,
        successDialogId: 52,
        failDialogId: 53,
        requiredSpecies: "cobblemon:vespiquen",
        consumePokemon: true
    }
];

function dialogOption(event) {
    var player = event.player;
    var npc = event.npc;
    var dialogId = getDialogId(event);
    var questDef = findQuestByDialog(dialogId);

    if (questDef == null) return;

    if (player.hasFinishedQuest(questDef.questId)) {
        showDialog(player, questDef.successDialogId, npc);
        return;
    }

    var pokemonEntry = findPokemonInInventory(player, questDef.requiredSpecies);
    if (pokemonEntry == null) {
        showDialog(player, questDef.failDialogId, npc);
        return;
    }

    if (questDef.consumePokemon) {
        removeInventoryPokemon(player, pokemonEntry);
    }

    completeQuest(player, questDef.questId);
}

function findQuestByDialog(dialogId) {
    for (var i = 0; i < BEEKEEPER_QUESTS.length; i++) {
        var quest = BEEKEEPER_QUESTS[i];
        if (quest.confirmDialogId == dialogId) {
            return quest;
        }
    }
    return null;
}

function getDialogId(event) {
    try {
        if (event.dialog != null) {
            return event.dialog.getId();
        }
    } catch (e) {}

    try {
        if (event.dialog != null) {
            return event.dialog.id;
        }
    } catch (e2) {}

    return -1;
}

function getPokemonSpeciesId(item) {
    if (item == null || item.isEmpty()) return null;

    try {
        var mcStack = item.getMCItemStack();
        var itemId = String(BuiltInRegistries.ITEM.getKey(mcStack.getItem()));
        if (itemId != "cubixcobblemon:pokemon") return null;

        var component = mcStack.get(CubixCobblemonDataComponents.INSTANCE.getPOKEMON().get());
        if (component == null) return null;

        var optionalPokemon = component.getPokemon();
        if (optionalPokemon == null || !optionalPokemon.isPresent()) return null;

        var pokemon = optionalPokemon.get();
        return String(pokemon.getSpecies().getResourceIdentifier());
    } catch (e) {
        return null;
    }
}

function findPokemonInInventory(player, requiredSpecies) {
    try {
        var inv = player.getInventory();
        if (inv == null) return null;

        var size = inv.getSize();
        for (var i = 0; i < size; i++) {
            var item = inv.getSlot(i);
            var species = getPokemonSpeciesId(item);
            if (species != null && species == requiredSpecies) {
                return {
                    slot: i,
                    item: item
                };
            }
        }
    } catch (e) {}

    return null;
}

function removeInventoryPokemon(player, pokemonEntry) {
    try {
        var item = pokemonEntry.item;
        if (item == null || item.isEmpty()) return;

        var size = item.getStackSize();
        if (size > 1) {
            item.setStackSize(size - 1);
        } else {
            player.getInventory().setSlot(pokemonEntry.slot, null);
        }

        player.updatePlayerInventory();
    } catch (e) {}
}

function completeQuest(player, questId) {
    try {
        if (!player.hasActiveQuest(questId) && player.canQuestBeAccepted(questId)) {
            player.startQuest(questId);
        }
    } catch (e) {}

    setQuestObjectivesCompleted(player, questId);
    triggerQuestCompletionCheck(player);
}

function setQuestObjectivesCompleted(player, questId) {
    try {
        var quest = NpcAPI.Instance().getQuests().get(questId);
        if (quest == null) return;

        var objectives = quest.getObjectives(player);
        if (objectives == null) return;

        for (var i = 0; i < objectives.length; i++) {
            var objective = objectives[i];
            if (objective == null) continue;

            var maxProgress = objective.getMaxProgress();
            if (maxProgress > 0) {
                objective.setProgress(maxProgress);
            }
        }
    } catch (e) {}
}

function triggerQuestCompletionCheck(player) {
    try {
        var playerData = PlayerData.get(player.getMCEntity());
        if (playerData == null || playerData.questData == null) return;

        playerData.questData.checkQuestCompletion(player.getMCEntity(), -1);
    } catch (e) {}
}

function showDialog(player, dialogId, npc) {
    try {
        player.showDialog(dialogId, npc.getName());
    } catch (e) {}
}
