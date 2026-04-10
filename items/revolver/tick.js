var Revolver_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var Revolver_CustomData = Java.type("net.minecraft.world.item.component.CustomData");
var Revolver_ItemLore = Java.type("net.minecraft.world.item.component.ItemLore");
var Revolver_Component = Java.type("net.minecraft.network.chat.Component");
var Revolver_CompoundTag = Java.type("net.minecraft.nbt.CompoundTag");
var Revolver_ArrayList = Java.type("java.util.ArrayList");

var REVOLVER_ITEM_TYPE = "russian_roulette_revolver";
var REVOLVER_NAME = "Револьвер";
var REVOLVER_MAX_SHOTS = 6;

function tick(event) {
    var item = event.item;
    if (item == null || item.isEmpty()) return;
    if (!isRevolverItem(item)) return;

    var mcStack = item.getMCItemStack();
    if (mcStack == null || mcStack.isEmpty()) return;

    var tag = readOrCreateTag(mcStack);
    normalizeRevolverTag(tag);
    var shotsLeft = getShotsLeft(tag);
    var renderedShotsLeft = readTagInt(tag, "rendered_shots_left", -1);

    if (renderedShotsLeft == shotsLeft) return;

    tag.putString("rendered_shots_left", "" + shotsLeft);
    mcStack.set(Revolver_DataComponents.CUSTOM_DATA, Revolver_CustomData.of(tag));
    mcStack.set(Revolver_DataComponents.CUSTOM_NAME, Revolver_Component.literal(REVOLVER_NAME));
    mcStack.set(Revolver_DataComponents.LORE, new Revolver_ItemLore(buildLore([
        "Игра в русскую рулетку.",
        "Имеет в барабане 6 патронов - 5 из которых холостые.",
        "На ПКМ производит выстрел в держащего.",
        "Патронов в барабане: " + shotsLeft + "/" + REVOLVER_MAX_SHOTS
    ])));

    applyLegacyPresentation(item);
    applyDurabilityVisual(item, shotsLeft);
}

function isRevolverItem(item) {
    var tag = getCustomTag(item);
    return tag != null && readTag(tag, "item_type") == REVOLVER_ITEM_TYPE;
}

function getCustomTag(item) {
    if (item == null || item.isEmpty()) return null;

    try {
        var customData = item.getMCItemStack().get(Revolver_DataComponents.CUSTOM_DATA);
        if (customData == null) return null;
        return customData.copyTag();
    } catch (e) {
        return null;
    }
}

function readOrCreateTag(mcStack) {
    try {
        var customData = mcStack.get(Revolver_DataComponents.CUSTOM_DATA);
        if (customData != null) return customData.copyTag();
    } catch (e) {}
    return new Revolver_CompoundTag();
}

function normalizeRevolverTag(tag) {
    if (!hasText(readTag(tag, "item_type"))) {
        tag.putString("item_type", REVOLVER_ITEM_TYPE);
    }

    var liveChamber = readTagInt(tag, "live_chamber", 0);
    if (liveChamber < 1 || liveChamber > REVOLVER_MAX_SHOTS) {
        tag.putString("live_chamber", "" + rollLiveChamber());
    }

    var shotsFired = clampInt(readTagInt(tag, "shots_fired", 0), 0, REVOLVER_MAX_SHOTS);
    tag.putString("shots_fired", "" + shotsFired);
}

function applyLegacyPresentation(item) {
    try {
        if (item.setCustomName != null) item.setCustomName(REVOLVER_NAME);
    } catch (e1) {}

    try {
        if (item.setMaxStackSize != null) item.setMaxStackSize(1);
    } catch (e2) {}
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
