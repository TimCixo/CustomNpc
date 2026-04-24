var GitLoaderInit_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var GitLoaderInit_CustomData = Java.type("net.minecraft.world.item.component.CustomData");
var GitLoaderInit_ItemLore = Java.type("net.minecraft.world.item.component.ItemLore");
var GitLoaderInit_Component = Java.type("net.minecraft.network.chat.Component");
var GitLoaderInit_CompoundTag = Java.type("net.minecraft.nbt.CompoundTag");
var GitLoaderInit_ArrayList = Java.type("java.util.ArrayList");
var GitLoaderInit_UUID = Java.type("java.util.UUID");

var ITEM_TYPE = "github_npc_loader_tool";
var SESSION_ID_KEY = "github_npc_loader_session_id";
var LAST_URL_KEY = "github_loader_last_url";
var DOWNLOADED_PACKAGE_KEY = "github_loader_downloaded_package";
var INSTALLED_INIT_KEY = "github_loader_installed_init";
var INSTALLED_INTERACT_KEY = "github_loader_installed_interact";
var INSTALLED_SHARED_KEY = "github_loader_installed_shared";

function init(event) {
    var item = event.item;
    if (item == null || item.isEmpty()) return;

    var tag = getTag(item);
    tag.putString("item_type", ITEM_TYPE);
    if (!hasText(readTag(tag, SESSION_ID_KEY))) tag.putString(SESSION_ID_KEY, "" + GitLoaderInit_UUID.randomUUID());
    if (!hasText(readTag(tag, LAST_URL_KEY))) tag.putString(LAST_URL_KEY, "");
    if (!hasText(readTag(tag, DOWNLOADED_PACKAGE_KEY))) tag.putString(DOWNLOADED_PACKAGE_KEY, "");
    if (!hasText(readTag(tag, INSTALLED_INIT_KEY))) tag.putString(INSTALLED_INIT_KEY, "");
    if (!hasText(readTag(tag, INSTALLED_INTERACT_KEY))) tag.putString(INSTALLED_INTERACT_KEY, "");
    if (!hasText(readTag(tag, INSTALLED_SHARED_KEY))) tag.putString(INSTALLED_SHARED_KEY, "");
    writeTag(item, tag);
    applyReadyPresentation(item);
}

function applyReadyPresentation(item) {
    var mcStack = item.getMCItemStack();
    mcStack.set(GitLoaderInit_DataComponents.MAX_STACK_SIZE, java.lang.Integer.valueOf(1));
    mcStack.set(GitLoaderInit_DataComponents.CUSTOM_NAME, GitLoaderInit_Component.literal("GitHub NPC Loader"));
    mcStack.set(GitLoaderInit_DataComponents.LORE, new GitLoaderInit_ItemLore(buildLore([
        "Ready GitHub NPC loader.",
        "Right click air to update and preview NPC packages.",
        "Right click an NPC to apply the updated package."
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
