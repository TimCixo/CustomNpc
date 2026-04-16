var CommandItem_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var CommandItem_CustomData = Java.type("net.minecraft.world.item.component.CustomData");
var CommandItem_ItemLore = Java.type("net.minecraft.world.item.component.ItemLore");
var CommandItem_Component = Java.type("net.minecraft.network.chat.Component");
var CommandItem_CompoundTag = Java.type("net.minecraft.nbt.CompoundTag");
var CommandItem_ArrayList = Java.type("java.util.ArrayList");
var CommandItem_BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var CommandItem_ResourceLocation = Java.type("net.minecraft.resources.ResourceLocation");
var CommandItem_MCItemStack = Java.type("net.minecraft.world.item.ItemStack");

var COMMAND_ITEM_TYPE = "pokemon_catch_command_tool";
var COMMAND_ITEM_NAME = "Pokemon Catch Command";
var COMMAND_ITEM_BASE_ID = "minecraft:redstone_torch";

function init(event) {
    var item = event.item;
    if (item == null || item.isEmpty()) return;

    var mcStack = ensureBaseStack(item, COMMAND_ITEM_BASE_ID);
    if (mcStack == null || mcStack.isEmpty()) return;

    var tag = readOrCreateTag(mcStack);
    tag.putString("item_type", COMMAND_ITEM_TYPE);
    if (!hasText(readTag(tag, "main_uuid"))) tag.putString("main_uuid", "");

    mcStack.set(CommandItem_DataComponents.CUSTOM_DATA, CommandItem_CustomData.of(tag));
    mcStack.set(CommandItem_DataComponents.MAX_STACK_SIZE, java.lang.Integer.valueOf(1));
    mcStack.set(CommandItem_DataComponents.CUSTOM_NAME, CommandItem_Component.literal(COMMAND_ITEM_NAME));
    mcStack.set(CommandItem_DataComponents.LORE, new CommandItem_ItemLore(buildLore([
        "Right click Main NPC to bind this item.",
        "Then right click in air to open control GUI."
    ])));

    try {
        if (item.setCustomName != null) item.setCustomName(COMMAND_ITEM_NAME);
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
        var currentId = String(CommandItem_BuiltInRegistries.ITEM.getKey(current.getItem()));
        if (currentId == itemId) return current;

        var itemType = CommandItem_BuiltInRegistries.ITEM.get(CommandItem_ResourceLocation.parse(itemId));
        if (itemType == null) return current;

        var replacement = new CommandItem_MCItemStack(itemType);
        var oldTag = readOrCreateTag(current);
        replacement.set(CommandItem_DataComponents.CUSTOM_DATA, CommandItem_CustomData.of(oldTag));
        replacement.set(CommandItem_DataComponents.MAX_STACK_SIZE, java.lang.Integer.valueOf(1));
        item.setMCItemStack(replacement);
        return item.getMCItemStack();
    } catch (e) {
        return item.getMCItemStack();
    }
}

function readOrCreateTag(mcStack) {
    try {
        var customData = mcStack.get(CommandItem_DataComponents.CUSTOM_DATA);
        if (customData != null) return customData.copyTag();
    } catch (e) {}
    return new CommandItem_CompoundTag();
}

function buildLore(lines) {
    var lore = new CommandItem_ArrayList();
    for (var i = 0; i < lines.length; i++) {
        lore.add(CommandItem_Component.literal(lines[i]));
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
