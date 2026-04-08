var ConfigItem_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var ConfigItem_CustomData = Java.type("net.minecraft.world.item.component.CustomData");
var ConfigItem_ItemLore = Java.type("net.minecraft.world.item.component.ItemLore");
var ConfigItem_Component = Java.type("net.minecraft.network.chat.Component");
var ConfigItem_CompoundTag = Java.type("net.minecraft.nbt.CompoundTag");
var ConfigItem_ArrayList = Java.type("java.util.ArrayList");
var ConfigItem_BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var ConfigItem_ResourceLocation = Java.type("net.minecraft.resources.ResourceLocation");
var ConfigItem_MCItemStack = Java.type("net.minecraft.world.item.ItemStack");

var CONFIG_ITEM_TYPE = "pokemon_catch_configurator_tool";
var CONFIG_ITEM_NAME = "Pokemon Catch Configurator";
var CONFIG_ITEM_BASE_ID = "minecraft:book";

function init(event) {
    var item = event.item;
    if (item == null || item.isEmpty()) return;

    var mcStack = ensureBaseStack(item, CONFIG_ITEM_BASE_ID);
    if (mcStack == null || mcStack.isEmpty()) return;

    var tag = readOrCreateTag(mcStack);
    tag.putString("item_type", CONFIG_ITEM_TYPE);
    if (!hasText(readTag(tag, "main_uuid"))) tag.putString("main_uuid", "");

    mcStack.set(ConfigItem_DataComponents.CUSTOM_DATA, ConfigItem_CustomData.of(tag));
    mcStack.set(ConfigItem_DataComponents.MAX_STACK_SIZE, java.lang.Integer.valueOf(1));
    mcStack.set(ConfigItem_DataComponents.CUSTOM_NAME, ConfigItem_Component.literal(CONFIG_ITEM_NAME));
    mcStack.set(ConfigItem_DataComponents.LORE, new ConfigItem_ItemLore(buildLore([
        "Right click Main NPC to bind this item.",
        "Then right click in air to open config GUI.",
        "Use Ticket/Import actions with offhand item."
    ])));

    try {
        if (item.setCustomName != null) item.setCustomName(CONFIG_ITEM_NAME);
    } catch (e1) {}

    try {
        if (item.setDurabilityShow != null) item.setDurabilityShow(false);
    } catch (e2) {}

    try {
        if (item.setMaxStackSize != null) item.setMaxStackSize(1);
    } catch (e3) {}
}

function ensureBaseStack(item, itemId) {
    try {
        var current = item.getMCItemStack();
        var currentId = String(ConfigItem_BuiltInRegistries.ITEM.getKey(current.getItem()));
        if (currentId == itemId) return current;

        var itemType = ConfigItem_BuiltInRegistries.ITEM.get(ConfigItem_ResourceLocation.parse(itemId));
        if (itemType == null) return current;

        var replacement = new ConfigItem_MCItemStack(itemType);
        var oldTag = readOrCreateTag(current);
        replacement.set(ConfigItem_DataComponents.CUSTOM_DATA, ConfigItem_CustomData.of(oldTag));
        replacement.set(ConfigItem_DataComponents.MAX_STACK_SIZE, java.lang.Integer.valueOf(1));
        item.setMCItemStack(replacement);
        return item.getMCItemStack();
    } catch (e) {
        return item.getMCItemStack();
    }
}

function readOrCreateTag(mcStack) {
    try {
        var customData = mcStack.get(ConfigItem_DataComponents.CUSTOM_DATA);
        if (customData != null) return customData.copyTag();
    } catch (e) {}
    return new ConfigItem_CompoundTag();
}

function buildLore(lines) {
    var lore = new ConfigItem_ArrayList();
    for (var i = 0; i < lines.length; i++) {
        lore.add(ConfigItem_Component.literal(lines[i]));
    }
    return lore;
}

function readTag(tag, key) {
    try {
        return "" + tag.getString(key);
    } catch (e) {
        return "";
    }
}

function hasText(value) {
    return value != null && ("" + value).replace(/^\s+|\s+$/g, "").length > 0;
}
