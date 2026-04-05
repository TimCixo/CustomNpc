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
    var couponData = readRefreshCoupon(player, item);
    if (couponData == null) {
        return;
    }

    refreshBeekeeperQuests(player);
    consumeMainhandItem(player, item);
    markCouponUsed(player, couponData.couponId);
    player.message("§aЗадания пасечника обновлены.");
    cancelInteraction(event, player);
}

function readRefreshCoupon(player, item) {
    if (item == null || item.isEmpty()) return null;

    try {
        var mcStack = item.getMCItemStack();
        var itemId = String(BuiltInRegistries.ITEM.getKey(mcStack.getItem()));
        if (itemId != "minecraft:paper") return null;

        var customData = mcStack.get(DataComponents.CUSTOM_DATA);
        if (customData == null) return null;

        var tag = customData.copyTag();
        var couponType = "" + tag.getString("quest_coupon_type");
        var couponId = "" + tag.getString("quest_coupon_id");
        var couponOwner = "" + tag.getString("quest_coupon_owner");
        if (couponType != "beekeeper_refresh" || couponId.length == 0) return null;
        if (couponOwner != getPlayerName(player)) return null;

        var couponKey = getCouponKey(couponId);
        var state = "" + player.getStoreddata().get(couponKey);
        if (state != "issued") return null;

        return {
            couponId: couponId
        };
    } catch (e) {
        return null;
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

function markCouponUsed(player, couponId) {
    player.getStoreddata().put(getCouponKey(couponId), "used");
}

function getCouponKey(couponId) {
    return "quest_coupon_" + couponId;
}

function getPlayerName(player) {
    try {
        return "" + player.getName();
    } catch (e) {
        return "" + player.getDisplayName();
    }
}

function cancelInteraction(event, player) {
    try {
        event.setCanceled(true);
    } catch (e) {}

    try {
        player.closeGui();
    } catch (e2) {}
}
