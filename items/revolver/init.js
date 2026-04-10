var Revolver_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var Revolver_CustomData = Java.type("net.minecraft.world.item.component.CustomData");
var Revolver_ItemLore = Java.type("net.minecraft.world.item.component.ItemLore");
var Revolver_Component = Java.type("net.minecraft.network.chat.Component");
var Revolver_CompoundTag = Java.type("net.minecraft.nbt.CompoundTag");
var Revolver_ArrayList = Java.type("java.util.ArrayList");
var Revolver_BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var Revolver_ResourceLocation = Java.type("net.minecraft.resources.ResourceLocation");
var Revolver_MCItemStack = Java.type("net.minecraft.world.item.ItemStack");

var REVOLVER_ITEM_TYPE = "russian_roulette_revolver";
var REVOLVER_NAME = "Револьвер";
var REVOLVER_BASE_ID = "minecraft:netherite_hoe";
var REVOLVER_TEXTURE_SLOT = 1;
var REVOLVER_TEXTURE_ID = "minecraft:netherite_hoe";
var REVOLVER_MAX_SHOTS = 6;

function init(event) {
    var item = event.item;
    if (item == null || item.isEmpty()) return;

    var mcStack = ensureBaseStack(item, REVOLVER_BASE_ID);
    if (mcStack == null || mcStack.isEmpty()) return;

    var tag = readOrCreateTag(mcStack);
    tag.putString("item_type", REVOLVER_ITEM_TYPE);
    normalizeRevolverTag(tag);

    mcStack.set(Revolver_DataComponents.CUSTOM_DATA, Revolver_CustomData.of(tag));
    mcStack.set(Revolver_DataComponents.MAX_STACK_SIZE, java.lang.Integer.valueOf(1));
    mcStack.set(Revolver_DataComponents.CUSTOM_NAME, Revolver_Component.literal(REVOLVER_NAME));
    mcStack.set(Revolver_DataComponents.LORE, new Revolver_ItemLore(buildLore(buildBaseLore(tag))));
    tag.putString("rendered_shots_left", "" + getShotsLeft(tag));
    mcStack.set(Revolver_DataComponents.CUSTOM_DATA, Revolver_CustomData.of(tag));

    applyLegacyPresentation(item);
    applyDurabilityVisual(item, getShotsLeft(tag));
}

function ensureBaseStack(item, itemId) {
    try {
        var current = item.getMCItemStack();
        var currentId = String(Revolver_BuiltInRegistries.ITEM.getKey(current.getItem()));
        if (currentId == itemId) return current;

        var itemType = Revolver_BuiltInRegistries.ITEM.get(Revolver_ResourceLocation.parse(itemId));
        if (itemType == null) return current;

        var replacement = new Revolver_MCItemStack(itemType);
        var oldTag = readOrCreateTag(current);
        replacement.set(Revolver_DataComponents.CUSTOM_DATA, Revolver_CustomData.of(oldTag));
        replacement.set(Revolver_DataComponents.MAX_STACK_SIZE, java.lang.Integer.valueOf(1));
        item.setMCItemStack(replacement);
        return item.getMCItemStack();
    } catch (e) {
        return item.getMCItemStack();
    }
}

function normalizeRevolverTag(tag) {
    if (!hasText(readTag(tag, "live_chamber"))) {
        tag.putString("live_chamber", "" + rollLiveChamber());
    }

    if (!hasText(readTag(tag, "shots_fired"))) {
        tag.putString("shots_fired", "0");
    }

    var liveChamber = readTagInt(tag, "live_chamber", 1);
    if (liveChamber < 1 || liveChamber > REVOLVER_MAX_SHOTS) {
        tag.putString("live_chamber", "" + rollLiveChamber());
    }

    var shotsFired = clampInt(readTagInt(tag, "shots_fired", 0), 0, REVOLVER_MAX_SHOTS);
    tag.putString("shots_fired", "" + shotsFired);
}

function buildBaseLore(tag) {
    return [
        "Игра в русскую рулетку.",
        "Имеет в барабане 6 патронов - 5 из которых холостые.",
        "На ПКМ производит выстрел в держащего.",
        "Патронов в барабане: " + getShotsLeft(tag) + "/" + REVOLVER_MAX_SHOTS
    ];
}

function applyLegacyPresentation(item) {
    try {
        if (item.setCustomName != null) item.setCustomName(REVOLVER_NAME);
    } catch (e1) {}

    try {
        if (item.setTexture != null) item.setTexture(REVOLVER_TEXTURE_SLOT, REVOLVER_TEXTURE_ID);
    } catch (e2) {}

    try {
        if (item.setMaxStackSize != null) item.setMaxStackSize(1);
    } catch (e3) {}
}

function applyDurabilityVisual(item, shotsLeft) {
    var shotsUsed = REVOLVER_MAX_SHOTS - clampInt(shotsLeft, 0, REVOLVER_MAX_SHOTS);

    try {
        if (item.setDurabilityShow != null) item.setDurabilityShow(true);
    } catch (e1) {}

    try {
        if (item.setDurabilityColor != null) item.setDurabilityColor(computeDurabilityColor(shotsLeft));
    } catch (e2) {}

    try {
        if (item.setDurabilityValue != null) item.setDurabilityValue(shotsUsed / REVOLVER_MAX_SHOTS);
    } catch (e3) {}
}

function computeDurabilityColor(shotsLeft) {
    var clamped = clampInt(shotsLeft, 0, REVOLVER_MAX_SHOTS);
    var ratio = clamped / REVOLVER_MAX_SHOTS;
    var red = Math.round((1 - ratio) * 255);
    var green = Math.round(ratio * 255);
    return (red << 16) | (green << 8);
}

function getShotsLeft(tag) {
    return REVOLVER_MAX_SHOTS - clampInt(readTagInt(tag, "shots_fired", 0), 0, REVOLVER_MAX_SHOTS);
}

function rollLiveChamber() {
    return 1 + Math.floor(Math.random() * REVOLVER_MAX_SHOTS);
}

function buildLore(lines) {
    var lore = new Revolver_ArrayList();
    for (var i = 0; i < lines.length; i++) {
        lore.add(Revolver_Component.literal(lines[i]));
    }
    return lore;
}

function readOrCreateTag(mcStack) {
    try {
        var customData = mcStack.get(Revolver_DataComponents.CUSTOM_DATA);
        if (customData != null) return customData.copyTag();
    } catch (e) {}
    return new Revolver_CompoundTag();
}

function readTag(tag, key) {
    try {
        return "" + tag.getString(key);
    } catch (e) {
        return "";
    }
}

function readTagInt(tag, key, def) {
    try {
        var value = parseInt("" + tag.getString(key), 10);
        return isNaN(value) ? def : value;
    } catch (e) {
        return def;
    }
}

function clampInt(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}

function hasText(value) {
    return value != null && ("" + value).replace(/^\s+|\s+$/g, "").length > 0;
}
