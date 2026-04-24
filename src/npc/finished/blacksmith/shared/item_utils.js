var ItemUtils_NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var ItemUtils_InteractionHand = Java.type("net.minecraft.world.InteractionHand");
var ItemUtils_MCItemStack = Java.type("net.minecraft.world.item.ItemStack");
var ItemUtils_Items = Java.type("net.minecraft.world.item.Items");

function trimString(value) {
    return ("" + value).replace(/^\s+|\s+$/g, "");
}

function hasText(value) {
    return value != null && trimString(value).length > 0;
}

function getPlayerKey(player) {
    try {
        var uuid = trimString(player.getUUID());
        if (hasText(uuid)) return uuid;
    } catch (e1) {}

    try {
        var name = trimString(player.getName());
        if (hasText(name)) return name;
    } catch (e2) {}

    return "unknown_player";
}

function getMainhandItem(player) {
    try {
        return player.getMainhandItem();
    } catch (e) {
        try {
            return player.inventoryHeldItem;
        } catch (e2) {
            return null;
        }
    }
}

function getMcStack(item) {
    if (item == null || item.isEmpty()) return null;
    try {
        return item.getMCItemStack();
    } catch (e) {
        try {
            return item.mCItemStack;
        } catch (e2) {
            return null;
        }
    }
}

function wrapMcStack(mcStack) {
    if (mcStack == null || mcStack.isEmpty()) return null;
    try {
        return ItemUtils_NpcAPI.Instance().getIItemStack(mcStack);
    } catch (e1) {
        try {
            return ItemUtils_NpcAPI.Item(mcStack);
        } catch (e2) {
            return null;
        }
    }
}

function isEmptyItem(item) {
    if (item == null) return true;
    try {
        return item.isEmpty();
    } catch (e) {
        return true;
    }
}

function cloneItem(item) {
    var mcStack = getMcStack(item);
    if (mcStack == null || mcStack.isEmpty()) return null;
    try {
        return wrapMcStack(mcStack.copy());
    } catch (e) {
        return null;
    }
}

function cloneSingleItem(item) {
    var copy = cloneItem(item);
    var mcStack = getMcStack(copy);
    if (mcStack == null || mcStack.isEmpty()) return null;
    try {
        mcStack.setCount(1);
    } catch (e1) {
        try {
            copy.setStackSize(1);
        } catch (e2) {}
    }
    return copy;
}

function updateInventory(player) {
    try {
        player.updatePlayerInventory();
    } catch (e) {}
}

function decrementHeldItem(player, count) {
    var amount = count == null ? 1 : count;
    if (amount <= 0) amount = 1;

    try {
        var mcPlayer = player.getMCEntity();
        var handStack = mcPlayer.getItemInHand(ItemUtils_InteractionHand.MAIN_HAND);
        if (handStack == null || handStack.isEmpty()) return false;

        if (handStack.getCount() > amount) {
            handStack.shrink(amount);
        } else {
            mcPlayer.setItemInHand(
                ItemUtils_InteractionHand.MAIN_HAND,
                new ItemUtils_MCItemStack(ItemUtils_Items.AIR)
            );
        }
        updateInventory(player);
        return true;
    } catch (e) {
        return false;
    }
}

function replaceHeldItem(player, item) {
    try {
        var mcPlayer = player.getMCEntity();
        var mcStack = item == null ? null : getMcStack(item);
        if (mcStack == null || mcStack.isEmpty()) {
            mcPlayer.setItemInHand(
                ItemUtils_InteractionHand.MAIN_HAND,
                new ItemUtils_MCItemStack(ItemUtils_Items.AIR)
            );
        } else {
            mcPlayer.setItemInHand(ItemUtils_InteractionHand.MAIN_HAND, mcStack.copy());
        }
        updateInventory(player);
        return true;
    } catch (e) {
        return false;
    }
}

function giveItemOrDrop(player, item) {
    if (isEmptyItem(item)) return false;

    try {
        if (player.giveItem(item)) return true;
    } catch (e1) {}

    try {
        var inv = player.getInventory();
        var size = inv == null ? 0 : inv.getSize();
        for (var i = 0; i < size; i++) {
            var slot = inv.getSlot(i);
            if (slot == null || slot.isEmpty()) {
                inv.setSlot(i, item);
                updateInventory(player);
                return true;
            }
        }
    } catch (e2) {}

    try {
        player.dropItem(item);
        return true;
    } catch (e3) {}

    try {
        var mcStack = getMcStack(item);
        if (mcStack != null && !mcStack.isEmpty()) {
            player.getMCEntity().drop(mcStack.copy(), false);
            return true;
        }
    } catch (e4) {}

    return false;
}

module.exports = {
    trimString: trimString,
    hasText: hasText,
    getPlayerKey: getPlayerKey,
    getMainhandItem: getMainhandItem,
    getMcStack: getMcStack,
    wrapMcStack: wrapMcStack,
    isEmptyItem: isEmptyItem,
    cloneItem: cloneItem,
    cloneSingleItem: cloneSingleItem,
    updateInventory: updateInventory,
    decrementHeldItem: decrementHeldItem,
    replaceHeldItem: replaceHeldItem,
    giveItemOrDrop: giveItemOrDrop
};
