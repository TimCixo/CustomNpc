var GitLoaderInit_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var GitLoaderInit_CustomData = Java.type("net.minecraft.world.item.component.CustomData");
var GitLoaderInit_ItemLore = Java.type("net.minecraft.world.item.component.ItemLore");
var GitLoaderInit_Component = Java.type("net.minecraft.network.chat.Component");
var GitLoaderInit_CompoundTag = Java.type("net.minecraft.nbt.CompoundTag");
var GitLoaderInit_ArrayList = Java.type("java.util.ArrayList");

var ITEM_TYPE = "github_npc_loader_tool";
var ITEM_LAST_URL_KEY = "github_loader_last_url";
var ITEM_DOWNLOADED_PACKAGE_KEY = "github_loader_downloaded_package";

function init(event) {
    var item = event.item;
    if (item == null || item.isEmpty()) return;

    var tag = getTag(item);
    tag.putString("item_type", ITEM_TYPE);
    tag.putString("github_loader_stage", "ready");
    if (!hasText(readTag(tag, ITEM_LAST_URL_KEY))) tag.putString(ITEM_LAST_URL_KEY, "");
    if (!hasText(readTag(tag, ITEM_DOWNLOADED_PACKAGE_KEY))) tag.putString(ITEM_DOWNLOADED_PACKAGE_KEY, "");

    writeTag(item, tag);
    applyReadyPresentation(item);
}

function applyReadyPresentation(item) {
    var mcStack = item.getMCItemStack();
    mcStack.set(GitLoaderInit_DataComponents.MAX_STACK_SIZE, java.lang.Integer.valueOf(1));
    mcStack.set(GitLoaderInit_DataComponents.CUSTOM_NAME, GitLoaderInit_Component.literal("GitHub NPC Loader"));
    mcStack.set(GitLoaderInit_DataComponents.LORE, new GitLoaderInit_ItemLore(buildLore([
        "Ready loader stage.",
        "Right click air to download and preview NPC packages.",
        "Right click an NPC to apply the downloaded package."
    ])));
    try {
        item.setCustomName("GitHub NPC Loader");
        item.setTexture(1, "minecraft:oak_sapling");
        item.setMaxStackSize(1);
        item.setDurabilityShow(false);
    } catch (e) {}
}

function getTag(item) {
    try {
        var customData = item.getMCItemStack().get(GitLoaderInit_DataComponents.CUSTOM_DATA);
        if (customData != null) return customData.copyTag();
    } catch (e) {}
    return new GitLoaderInit_CompoundTag();
}

function writeTag(item, tag) {
    item.getMCItemStack().set(GitLoaderInit_DataComponents.CUSTOM_DATA, GitLoaderInit_CustomData.of(tag));
}

function buildLore(lines) {
    var lore = new GitLoaderInit_ArrayList();
    for (var i = 0; i < lines.length; i++) lore.add(GitLoaderInit_Component.literal(lines[i]));
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
