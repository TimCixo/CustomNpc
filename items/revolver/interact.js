var Revolver_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var Revolver_CustomData = Java.type("net.minecraft.world.item.component.CustomData");
var Revolver_CompoundTag = Java.type("net.minecraft.nbt.CompoundTag");

var REVOLVER_ITEM_TYPE = "russian_roulette_revolver";
var REVOLVER_NAME = "Револьвер";
var REVOLVER_MAX_SHOTS = 6;
var REVOLVER_BLANK_SOUND = "minecraft:entity.firework_rocket.launch";
var REVOLVER_LIVE_SOUND = "minecraft:entity.firework_rocket.large_blast";
var REVOLVER_RELOAD_SOUND = "minecraft:item.crossbow.loading_end";

function interact(event) {
    var item = event.item;
    var player = event.player;

    if (item == null || item.isEmpty() || player == null) return;
    if (!isRevolverItem(item)) return;

    var mcStack = item.getMCItemStack();
    if (mcStack == null || mcStack.isEmpty()) return;

    var tag = readOrCreateTag(mcStack);
    normalizeRevolverTag(tag);

    var shotsFired = readTagInt(tag, "shots_fired", 0) + 1;
    var liveChamber = readTagInt(tag, "live_chamber", 1);
    var lethalShot = shotsFired == liveChamber;

    tag.putString("shots_fired", "" + shotsFired);
    mcStack.set(Revolver_DataComponents.CUSTOM_DATA, Revolver_CustomData.of(tag));

    if (lethalShot) {
        playSound(player, REVOLVER_LIVE_SOUND, 1.2, 1.0);
        killHolder(player);
    } else {
        playSound(player, REVOLVER_BLANK_SOUND, 1.0, 1.0);
    }

    if (shotsFired >= REVOLVER_MAX_SHOTS) {
        reloadRevolver(tag, mcStack);
        playSound(player, REVOLVER_RELOAD_SOUND, 0.8, 1.0);
    }

    tag = readOrCreateTag(mcStack);
    tag.putString("rendered_shots_left", "" + getShotsLeft(tag));
    mcStack.set(Revolver_DataComponents.CUSTOM_DATA, Revolver_CustomData.of(tag));

    applyLegacyPresentation(item);
    applyDurabilityVisual(item, getShotsLeft(tag));
}

function reloadRevolver(tag, mcStack) {
    tag.putString("shots_fired", "0");
    tag.putString("live_chamber", "" + rollLiveChamber());
    mcStack.set(Revolver_DataComponents.CUSTOM_DATA, Revolver_CustomData.of(tag));
}

function killHolder(player) {
    try {
        player.getMCEntity().hurt(player.getMCEntity().damageSources().genericKill(), 1000000);
        return;
    } catch (e1) {}

    try {
        player.setHealth(0);
        return;
    } catch (e2) {}

    try {
        player.getMCEntity().setHealth(0);
        return;
    } catch (e3) {}

    try {
        player.kill();
    } catch (e4) {}
}

function playSound(player, soundId, volume, pitch) {
    try {
        player.playSound(soundId, volume, pitch);
        return;
    } catch (e1) {}

    try {
        player.getWorld().playSoundAt(player.getX(), player.getY(), player.getZ(), soundId, volume, pitch);
    } catch (e2) {}
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

function getShotsLeft(tag) {
    return REVOLVER_MAX_SHOTS - clampInt(readTagInt(tag, "shots_fired", 0), 0, REVOLVER_MAX_SHOTS);
}

function rollLiveChamber() {
    return 1 + Math.floor(Math.random() * REVOLVER_MAX_SHOTS);
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
