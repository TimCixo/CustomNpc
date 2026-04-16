var Items = Java.type("net.minecraft.world.item.Items");
var MCItemStack = Java.type("net.minecraft.world.item.ItemStack");
var InteractionHand = Java.type("net.minecraft.world.InteractionHand");
var PlayerData = Java.type("noppes.npcs.controllers.data.PlayerData");
var BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var DataComponents = Java.type("net.minecraft.core.component.DataComponents");

var BEEKEEPER_REFRESH_QUESTS = [11, 12];

function interact(event) {
    var player = event.player;
    var item = player.getMainhandItem();
    if (!isRefreshCoupon(item)) {
        return;
    }

    refreshBeekeeperQuests(player);
    consumeMainhandItem(player, item);
    player.message("§aЗадания пасечника обновлены.");
    cancelInteraction(event, player);
}

function isRefreshCoupon(item) {
    if (item == null || item.isEmpty()) return false;

    try {
        var mcStack = item.getMCItemStack();
        var itemId = String(BuiltInRegistries.ITEM.getKey(mcStack.getItem()));
        if (itemId != "minecraft:paper") return false;

        var customData = mcStack.get(DataComponents.CUSTOM_DATA);
        if (customData == null) return false;

        var tag = customData.copyTag();
        return ("" + tag.getString("coupon_type")) == "quest_refresh_coupon";
    } catch (e) {
        return false;
    }
}

function refreshBeekeeperQuests(player) {
    try {
        var playerData = PlayerData.get(player.getMCEntity());
        if (playerData == null || playerData.questData == null) return;

        for (var i = 0; i < BEEKEEPER_REFRESH_QUESTS.length; i++) {
            var questId = BEEKEEPER_REFRESH_QUESTS[i];
            var key = java.lang.Integer.valueOf(questId);

            try {
                player.stopQuest(questId);
            } catch (e1) {}

            try {
                player.removeQuest(questId);
            } catch (e2) {}

            try {
                playerData.questData.activeQuests.remove(key);
            } catch (e3) {}

            try {
                playerData.questData.finishedQuests.remove(key);
            } catch (e4) {}
        }

        try {
            playerData.save(false);
        } catch (e5) {}
    } catch (e) {}
}

function consumeMainhandItem(player, item) {
    try {
        var size = item.getStackSize();
        if (size > 1) {
            item.setStackSize(size - 1);
        } else {
            player.getMCEntity().setItemInHand(
                InteractionHand.MAIN_HAND,
                new MCItemStack(Items.AIR)
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
