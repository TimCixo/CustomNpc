var CouponGiver_ArrayList = Java.type("java.util.ArrayList");

var CouponGiver_NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var CouponGiver_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var CouponGiver_CustomData = Java.type("net.minecraft.world.item.component.CustomData");
var CouponGiver_ItemLore = Java.type("net.minecraft.world.item.component.ItemLore");
var CouponGiver_ResourceLocation = Java.type("net.minecraft.resources.ResourceLocation");
var CouponGiver_BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var CouponGiver_MCItemStack = Java.type("net.minecraft.world.item.ItemStack");
var CouponGiver_Component = Java.type("net.minecraft.network.chat.Component");
var CouponGiver_CompoundTag = Java.type("net.minecraft.nbt.CompoundTag");

var GUI_ID = 9510;
var SCROLL_ID = 9511;
var STATUS_ID = 9512;
var ACTIONS = [
    "Выдать купон обновления заданий",
    "Выдать купон на изучение движения"
];

var COUPON_ITEM_ID = "minecraft:paper";

function interact(event) {
    var player = event.player;

    try {
        player.showCustomGui(createGui(player));
    } catch (e) {
        player.message("§cНе удалось открыть меню купонов.");
    }

    event.setCanceled(true);
}

function customGuiScroll(event) {
    try {
        if (event.gui == null || event.gui.getID() != GUI_ID) return;
        if (event.scroll == null || event.scroll.getID() != SCROLL_ID) return;

        var player = event.player;
        var index = getSelectedIndex(event.scroll);
        var item = null;

        if (index == 0) {
            item = createQuestRefreshCoupon();
        } else if (index == 1) {
            item = createMoveTeachCoupon();
        } else {
            setStatus(event.gui, "Неизвестное действие.");
            safeUpdate(event.gui);
            return;
        }

        if (item == null || item.isEmpty()) {
            setStatus(event.gui, "Не удалось создать купон.");
            safeUpdate(event.gui);
            return;
        }

        if (!giveItemToPlayer(player, item)) {
            setStatus(event.gui, "Освободи место в инвентаре.");
            safeUpdate(event.gui);
            return;
        }

        if (index == 0) {
            setStatus(event.gui, "Выдан купон обновления заданий.");
        } else {
            setStatus(event.gui, "Выдан купон на изучение движения.");
        }
        safeUpdate(event.gui);
    } catch (e) {
        try {
            event.player.message("§cОшибка меню купонов: " + e);
        } catch (ignored) {}
    }
}

function createGui(player) {
    var gui = CouponGiver_NpcAPI.Instance().createCustomGui(GUI_ID, 300, 180, false, player);
    gui.addLabel(1, "Выдача купонов", 10, 10, 180, 18, 0xFFFFFF);
    gui.addColoredLine(2, 10, 34, 280, 34, 0x4A8F80, 1.5);
    gui.addScroll(SCROLL_ID, 10, 46, 280, 90, ACTIONS);
    gui.addTextArea(STATUS_ID, 10, 148, 280, 18);
    setStatus(gui, "Выбери купон для выдачи.");
    return gui;
}

function createQuestRefreshCoupon() {
    return createCouponItem(
        "quest_refresh_coupon",
        "§eКупон на обновление заданий",
        [
            "Обновляет все задания выбранного NPC.",
            "Чтобы применить, нажми ПКМ по нужному NPC.",
            "§7Одноразовый предмет."
        ]
    );
}

function createMoveTeachCoupon() {
    return createCouponItem(
        "move_teach_coupon",
        "§eКупон на изучение движения",
        [
            "Позволяет изучить одно движение.",
            "Чтобы применить, нажми ПКМ по нужному NPC.",
            "§7Одноразовый предмет."
        ]
    );
}

function createCouponItem(couponType, displayName, loreLines) {
    try {
        var itemType = CouponGiver_BuiltInRegistries.ITEM.get(CouponGiver_ResourceLocation.parse(COUPON_ITEM_ID));
        if (itemType == null) return null;

        var mcStack = new CouponGiver_MCItemStack(itemType);
        if (mcStack == null || mcStack.isEmpty()) return null;

        var tag = new CouponGiver_CompoundTag();
        tag.putString("coupon_type", couponType);

        mcStack.set(CouponGiver_DataComponents.CUSTOM_NAME, CouponGiver_Component.literal(displayName));
        mcStack.set(CouponGiver_DataComponents.CUSTOM_DATA, CouponGiver_CustomData.of(tag));
        mcStack.set(CouponGiver_DataComponents.LORE, new CouponGiver_ItemLore(buildLore(loreLines)));

        var item = CouponGiver_NpcAPI.Instance().getIItemStack(mcStack);
        if (item == null || item.isEmpty()) return null;

        item.setStackSize(1);
        return item;
    } catch (e) {
        return null;
    }
}

function buildLore(lines) {
    var lore = new CouponGiver_ArrayList();
    for (var i = 0; i < lines.length; i++) {
        lore.add(CouponGiver_Component.literal("" + lines[i]));
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

function setStatus(gui, text) {
    try {
        var comp = gui.getComponent(STATUS_ID);
        if (comp != null && comp.setText != null) comp.setText(text == null ? "" : ("" + text));
    } catch (e) {}
}

function safeUpdate(gui) {
    try {
        gui.update();
    } catch (e) {}
}
