var GitLoaderInit_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var GitLoaderInit_CustomData = Java.type("net.minecraft.world.item.component.CustomData");
var GitLoaderInit_ItemLore = Java.type("net.minecraft.world.item.component.ItemLore");
var GitLoaderInit_Component = Java.type("net.minecraft.network.chat.Component");
var GitLoaderInit_CompoundTag = Java.type("net.minecraft.nbt.CompoundTag");
var GitLoaderInit_ArrayList = Java.type("java.util.ArrayList");
var GitLoaderInit_UUID = Java.type("java.util.UUID");

var GIT_LOADER_ITEM_TYPE = "github_npc_loader_tool";
var GIT_LOADER_ITEM_NAME = "GitHub Loader Installer";
var GIT_LOADER_TEXTURE_SLOT = 1;
var GIT_LOADER_TEXTURE_ID = "minecraft:oak_sapling";
var GIT_LOADER_SESSION_KEY = "github_npc_loader_session_id";
var GIT_LOADER_LAST_URL_KEY = "github_npc_loader_last_url";
var GIT_LOADER_BUNDLE_KEY = "github_npc_loader_bundle";
var GIT_LOADER_HOOKS_KEY = "github_npc_loader_hooks";
var GIT_LOADER_SUMMARY_KEY = "github_npc_loader_summary";
var GIT_LOADER_SELF_RUNTIME_URL_KEY = "github_npc_loader_self_runtime_url";
var GIT_LOADER_SELF_RUNTIME_VERSION_KEY = "github_npc_loader_self_runtime_version";
var GIT_LOADER_INSTALLED_PACKAGE_KEY = "github_loader_installed_package";
var GIT_LOADER_INSTALLED_RUNTIME_SOURCE_KEY = "github_loader_installed_runtime_source";
var GIT_LOADER_INSTALLED_RUNTIME_SIGNATURE_KEY = "github_loader_installed_runtime_signature";
var GIT_LOADER_DEFAULT_RUNTIME_URL = "https://raw.githubusercontent.com/TimCixo/CustomNpc/main/github_loader/installer.js";
var GIT_LOADER_DEFAULT_RUNTIME_VERSION = "main";

function init(event) {
    var item = event.item;
    if (item == null || item.isEmpty()) return;

    var mcStack = item.getMCItemStack();
    if (mcStack == null || mcStack.isEmpty()) return;

    var tag = readOrCreateTag(mcStack);
    tag.putString("item_type", GIT_LOADER_ITEM_TYPE);
    ensureString(tag, GIT_LOADER_SESSION_KEY, "" + GitLoaderInit_UUID.randomUUID());
    ensureString(tag, GIT_LOADER_LAST_URL_KEY, "");
    ensureString(tag, GIT_LOADER_BUNDLE_KEY, "");
    ensureString(tag, GIT_LOADER_HOOKS_KEY, "");
    ensureString(tag, GIT_LOADER_SUMMARY_KEY, "");
    ensureString(tag, GIT_LOADER_SELF_RUNTIME_URL_KEY, GIT_LOADER_DEFAULT_RUNTIME_URL);
    ensureString(tag, GIT_LOADER_SELF_RUNTIME_VERSION_KEY, GIT_LOADER_DEFAULT_RUNTIME_VERSION);
    ensureString(tag, GIT_LOADER_INSTALLED_PACKAGE_KEY, "");
    ensureString(tag, GIT_LOADER_INSTALLED_RUNTIME_SOURCE_KEY, "");
    ensureString(tag, GIT_LOADER_INSTALLED_RUNTIME_SIGNATURE_KEY, "");

    mcStack.set(GitLoaderInit_DataComponents.CUSTOM_DATA, GitLoaderInit_CustomData.of(tag));
    mcStack.set(GitLoaderInit_DataComponents.MAX_STACK_SIZE, java.lang.Integer.valueOf(1));
    mcStack.set(GitLoaderInit_DataComponents.CUSTOM_NAME, GitLoaderInit_Component.literal(GIT_LOADER_ITEM_NAME));
    mcStack.set(GitLoaderInit_DataComponents.LORE, new GitLoaderInit_ItemLore(buildLore([
        "Minimal GitHub Loader installer.",
        "Bootstrap opens installer.js until the item is installed.",
        "Apply downloads github_loader/hooks and shared into the item.",
        "Next reopen runs the installed runtime from item data."
    ])));
    applyLegacyItemPresentation(item, GIT_LOADER_ITEM_NAME);

    try {
        if (item.setDurabilityShow != null) item.setDurabilityShow(false);
    } catch (e) {}
}

function applyLegacyItemPresentation(item, itemName) {
    try {
        if (item.setCustomName != null) item.setCustomName(itemName);
    } catch (e1) {}

    try {
        if (item.setTexture != null) item.setTexture(GIT_LOADER_TEXTURE_SLOT, GIT_LOADER_TEXTURE_ID);
    } catch (e2) {}

    try {
        if (item.setMaxStackSize != null) item.setMaxStackSize(1);
    } catch (e3) {}
}

function readOrCreateTag(mcStack) {
    try {
        var customData = mcStack.get(GitLoaderInit_DataComponents.CUSTOM_DATA);
        if (customData != null) return customData.copyTag();
    } catch (e) {}
    return new GitLoaderInit_CompoundTag();
}

function ensureString(tag, key, fallbackValue) {
    if (!hasText(readTag(tag, key))) {
        tag.putString(key, fallbackValue == null ? "" : ("" + fallbackValue));
    }
}

function buildLore(lines) {
    var lore = new GitLoaderInit_ArrayList();
    for (var i = 0; i < lines.length; i++) {
        lore.add(GitLoaderInit_Component.literal(lines[i]));
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
