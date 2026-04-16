// @ts-check

/** @typedef {import("noppes.npcs.api.event.NpcEvent").InteractEvent} NpcInteractEvent */
/** @typedef {import("noppes.npcs.api.entity").IPlayer} IPlayer */
/** @typedef {import("noppes.npcs.api.item").IItemStack} IItemStack */
/** @typedef {import("net.minecraft.world.item").ItemStack} MCItemStack */

var Registries = Java.type("net.minecraft.core.registries.Registries");
var BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var ItemEnchantments = Java.type("net.minecraft.world.item.enchantment.ItemEnchantments");
var ItemEnchantmentsMutable = Java.type("net.minecraft.world.item.enchantment.ItemEnchantments$Mutable");
var TagKey = Java.type("net.minecraft.tags.TagKey");
var ResourceLocation = Java.type("net.minecraft.resources.ResourceLocation");

/** @param {string} id */
function rl(id) {
    try {
        return ResourceLocation.parse(id);
    } catch (e) {
        return ResourceLocation.tryParse(id);
    }
}

/** @param {string} id */
function itemTag(id) {
    return TagKey.create(Registries.ITEM, rl(id));
}

var TOOLS_TAG = itemTag("minecraft:tools/tools");

/**
 * The declarations in `types` expose wrapper classes, while runtime still uses
 * Java-style getter names. These bridge helpers let the IDE understand both.
 * @param {IPlayer} player
 * @returns {IItemStack}
 */
function getMainhandItem(player) {
    var runtimePlayer = /** @type {any} */ (player);
    return /** @type {IItemStack} */ (
        runtimePlayer.getMainhandItem ? runtimePlayer.getMainhandItem() : runtimePlayer.inventoryHeldItem
    );
}

/**
 * @param {IItemStack} item
 * @returns {MCItemStack}
 */
function getMcItemStack(item) {
    var runtimeItem = /** @type {any} */ (item);
    return /** @type {MCItemStack} */ (
        runtimeItem.getMCItemStack ? runtimeItem.getMCItemStack() : runtimeItem.mCItemStack
    );
}

/**
 * @param {IItemStack} item
 * @returns {string}
 */
function getItemName(item) {
    var runtimeItem = /** @type {any} */ (item);
    return String(runtimeItem.getItemName ? runtimeItem.getItemName() : runtimeItem.itemName);
}

/**
 * @param {IPlayer} player
 * @returns {any}
 */
function getMcPlayer(player) {
    var runtimePlayer = /** @type {any} */ (player);
    return runtimePlayer.getMCEntity ? runtimePlayer.getMCEntity() : runtimePlayer.mCEntity;
}

/**
 * @param {MCItemStack} stack
 * @returns {string}
 */
function getItemId(stack) {
    try {
        return String(BuiltInRegistries.ITEM.getKey(stack.getItem()));
    } catch (e) {
        return "minecraft:air";
    }
}

/**
 * @param {MCItemStack} stack
 * @param {any} tag
 * @returns {boolean}
 */
function isInTag(stack, tag) {
    try {
        return stack.is(tag);
    } catch (e) {}

    try {
        return stack.getItemHolder().is(tag);
    } catch (e) {}

    try {
        return stack.getItem().builtInRegistryHolder().is(tag);
    } catch (e) {}

    return false;
}

/** @param {string} id */
function isCurse(id) {
    return id == "minecraft:binding_curse" || id == "minecraft:vanishing_curse";
}

/**
 * @param {any} holder
 * @returns {string}
 */
function getHolderId(holder) {
    try {
        return String(holder.getRegisteredName());
    } catch (e) {}

    try {
        return String(holder.unwrapKey().get().location().toString());
    } catch (e) {}

    try {
        return String(holder.value().descriptionId());
    } catch (e) {}

    return "";
}

/** @param {NpcInteractEvent} event */
function interact(event) {
    /** @type {IPlayer} */
    var player = event.player;
    /** @type {IItemStack} */
    var item = getMainhandItem(player);

    if (item == null || item.isEmpty()) {
        player.message("\u00A7c\u0412\u043E\u0437\u044C\u043C\u0438 \u043F\u0440\u0435\u0434\u043C\u0435\u0442 \u0432 \u0440\u0443\u043A\u0443.");
        return;
    }

    /** @type {MCItemStack} */
    var stack = getMcItemStack(item);
    if (stack == null || getItemId(stack) == "minecraft:air") {
        player.message("\u00A7c\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C ItemStack.");
        return;
    }

    try {
        var isTool = isInTag(stack, TOOLS_TAG);

        var level = getMcPlayer(player).level();
        var lookup = level.registryAccess().lookupOrThrow(Registries.ENCHANTMENT);
        var holders = lookup.listElements().iterator();

        var mutable = new ItemEnchantmentsMutable(ItemEnchantments.EMPTY);
        var applied = 0;

        while (holders.hasNext()) {
            var holder = holders.next();

            try {
                var ench = holder.value();
                var id = getHolderId(holder);

                if (isCurse(id)) continue;
                if (isTool && id == "minecraft:silk_touch") continue;

                try {
                    if (!ench.isSupportedItem(stack)) continue;
                } catch (e0) {
                    try {
                        if (!stack.getItem().isPrimaryItemFor(stack, holder)) continue;
                    } catch (e1) {
                        continue;
                    }
                }

                mutable.set(holder, ench.getMaxLevel());
                applied++;
            } catch (e2) {}
        }

        stack.set(DataComponents.ENCHANTMENTS, mutable.toImmutable());
        player.message("\u00A7a\u0413\u043E\u0442\u043E\u0432\u043E. \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E \u0437\u0430\u0447\u0430\u0440\u043E\u0432\u0430\u043D\u0438\u0439: " + applied);
    } catch (e) {
        player.message("\u00A7c\u041E\u0448\u0438\u0431\u043A\u0430: " + e);
    }
}
