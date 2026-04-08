var MoveTicket_ArrayList = Java.type("java.util.ArrayList");

var MoveTicket_NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var MoveTicket_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var MoveTicket_CustomData = Java.type("net.minecraft.world.item.component.CustomData");
var MoveTicket_ItemLore = Java.type("net.minecraft.world.item.component.ItemLore");
var MoveTicket_ResourceLocation = Java.type("net.minecraft.resources.ResourceLocation");
var MoveTicket_BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var MoveTicket_MCItemStack = Java.type("net.minecraft.world.item.ItemStack");
var MoveTicket_Component = Java.type("net.minecraft.network.chat.Component");
var MoveTicket_CompoundTag = Java.type("net.minecraft.nbt.CompoundTag");

var TICKET_ITEM_ID = "minecraft:paper";
var TICKET_ITEM_TYPE = "move_teach_coupon";
var TICKET_NAME = "§eКупон на изучение движения";

function interact(event) {
    var player = event.player;

    var item = createMoveTeachTicket();
    if (item == null || item.isEmpty()) {
        player.message("§cНе удалось создать купон на изучение движения.");
        return;
    }

    if (!giveItemToPlayer(player, item)) {
        player.message("§cНе удалось выдать купон. Освободи одно место в инвентаре.");
        return;
    }

    player.message("§aКупон на изучение движения получен.");
}

function createMoveTeachTicket() {
    try {
        var itemType = MoveTicket_BuiltInRegistries.ITEM.get(MoveTicket_ResourceLocation.parse(TICKET_ITEM_ID));
        if (itemType == null) return null;

        var mcStack = new MoveTicket_MCItemStack(itemType);
        if (mcStack == null || mcStack.isEmpty()) return null;

        var tag = new MoveTicket_CompoundTag();
        tag.putString("coupon_type", TICKET_ITEM_TYPE);

        mcStack.set(MoveTicket_DataComponents.CUSTOM_DATA, MoveTicket_CustomData.of(tag));
        mcStack.set(MoveTicket_DataComponents.CUSTOM_NAME, MoveTicket_Component.literal(TICKET_NAME));
        mcStack.set(MoveTicket_DataComponents.LORE, new MoveTicket_ItemLore(buildLore([
            "Позволяет изучить одно движение.",
            "Чтобы применить, нажми ПКМ по нужному NPC.",
            "§7Одноразовый предмет."
        ])));

        var item = MoveTicket_NpcAPI.Instance().getIItemStack(mcStack);
        if (item == null || item.isEmpty()) return null;

        item.setStackSize(1);
        return item;
    } catch (e) {
        return null;
    }
}

function buildLore(lines) {
    var lore = new MoveTicket_ArrayList();
    for (var i = 0; i < lines.length; i++) {
        lore.add(MoveTicket_Component.literal("" + lines[i]));
    }
    return lore;
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
