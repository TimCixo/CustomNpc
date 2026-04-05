var CouponArrayList = Java.type("java.util.ArrayList");
var UUID = Java.type("java.util.UUID");
var NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var CustomData = Java.type("net.minecraft.world.item.component.CustomData");
var ItemLore = Java.type("net.minecraft.world.item.component.ItemLore");
var ResourceLocation = Java.type("net.minecraft.resources.ResourceLocation");
var BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var MCItemStack = Java.type("net.minecraft.world.item.ItemStack");
var Component = Java.type("net.minecraft.network.chat.Component");
var CompoundTag = Java.type("net.minecraft.nbt.CompoundTag");

var COUPON_ITEM_ID = "minecraft:paper";
var COUPON_TYPE = "beekeeper_refresh";

function interact(event) {
    var player = event.player;
    var couponId = createCouponId();
    var item = createCouponItem(player, couponId);
    if (item == null || item.isEmpty()) {
        player.message("§cНе удалось создать купон.");
        return;
    }

    registerCoupon(player, couponId);

    if (!giveItemToPlayer(player, item)) {
        unregisterCoupon(player, couponId);
        player.message("§cНе удалось выдать купон. Освободи место в инвентаре.");
        return;
    }

    player.message("§aПолучен купон на обновление заданий.");
}

function createCouponId() {
    try {
        return "" + UUID.randomUUID();
    } catch (e) {
        return "coupon_" + new Date().getTime();
    }
}

function registerCoupon(player, couponId) {
    player.getStoreddata().put(getCouponKey(couponId), "issued");
}

function unregisterCoupon(player, couponId) {
    player.getStoreddata().remove(getCouponKey(couponId));
}

function getCouponKey(couponId) {
    return "quest_coupon_" + couponId;
}

function createCouponItem(player, couponId) {
    try {
        var itemType = BuiltInRegistries.ITEM.get(ResourceLocation.parse(COUPON_ITEM_ID));
        if (itemType == null) return null;

        var mcStack = new MCItemStack(itemType);
        if (mcStack == null || mcStack.isEmpty()) return null;

        applyCouponPresentation(mcStack, player, couponId);

        var item = NpcAPI.Instance().getIItemStack(mcStack);
        if (item == null || item.isEmpty()) return null;

        item.setStackSize(1);
        return item;
    } catch (e) {
        return null;
    }
}

function applyCouponPresentation(mcStack, player, couponId) {
    var tag = new CompoundTag();
    tag.putString("quest_coupon_type", COUPON_TYPE);
    tag.putString("quest_coupon_id", couponId);
    tag.putString("quest_coupon_owner", getPlayerName(player));

    mcStack.set(DataComponents.CUSTOM_NAME, Component.literal("§eКупон на обновление заданий"));
    mcStack.set(DataComponents.CUSTOM_DATA, CustomData.of(tag));
    mcStack.set(DataComponents.LORE, new ItemLore(buildCouponLore()));
}

function buildCouponLore() {
    var lines = new CouponArrayList();
    lines.add(Component.literal("Обновляет все задания выбранного NPC."));
    lines.add(Component.literal("Чтобы применить, нажми ПКМ по NPC."));
    lines.add(Component.literal("§8Одноразовый персональный купон."));
    return lines;
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

function getPlayerName(player) {
    try {
        return "" + player.getName();
    } catch (e) {
        return "" + player.getDisplayName();
    }
}
