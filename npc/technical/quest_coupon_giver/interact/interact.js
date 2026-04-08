var CouponArrayList = Java.type("java.util.ArrayList");
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
var COUPON_TYPE = "quest_refresh_coupon";

function interact(event) {
    var player = event.player;
    var item = createCouponItem();
    if (item == null || item.isEmpty()) {
        player.message("§cНе удалось создать купон.");
        return;
    }

    if (!giveItemToPlayer(player, item)) {
        player.message("§cНе удалось выдать купон. Освободи место в инвентаре.");
        return;
    }

    player.message("§aПолучен купон на обновление заданий.");
}

function createCouponItem() {
    try {
        var itemType = BuiltInRegistries.ITEM.get(ResourceLocation.parse(COUPON_ITEM_ID));
        if (itemType == null) return null;

        var mcStack = new MCItemStack(itemType);
        if (mcStack == null || mcStack.isEmpty()) return null;

        applyCouponPresentation(mcStack);

        var item = NpcAPI.Instance().getIItemStack(mcStack);
        if (item == null || item.isEmpty()) return null;

        item.setStackSize(1);
        return item;
    } catch (e) {
        return null;
    }
}

function applyCouponPresentation(mcStack) {
    var tag = new CompoundTag();
    tag.putString("coupon_type", COUPON_TYPE);

    mcStack.set(DataComponents.CUSTOM_NAME, Component.literal("§eКупон на обновление заданий"));
    mcStack.set(DataComponents.CUSTOM_DATA, CustomData.of(tag));
    mcStack.set(DataComponents.LORE, new ItemLore(buildCouponLore()));
}

function buildCouponLore() {
    var lines = new CouponArrayList();
    lines.add(Component.literal("Обновляет все задания выбранного NPC."));
    lines.add(Component.literal("Чтобы применить, нажми ПКМ по нужному NPC."));
    lines.add(Component.literal("§7Одноразовый предмет."));
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
