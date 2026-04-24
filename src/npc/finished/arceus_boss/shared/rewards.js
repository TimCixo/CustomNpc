var utils = require("utils.js");
var phases = require("phases.js");

var Reward_ItemEntity = Java.type("net.minecraft.world.entity.item.ItemEntity");
var Reward_MCItemStack = Java.type("net.minecraft.world.item.ItemStack");
var Reward_BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var Reward_ResourceLocation = Java.type("net.minecraft.resources.ResourceLocation");

var ARCEUS_ITEM_TYPE_CACHE = {};
var ARCEUS_PHASE3_GEMS = [
    "cobblemon:flying_gem",
    "cobblemon:psychic_gem",
    "cobblemon:bug_gem",
    "cobblemon:rock_gem",
    "cobblemon:ghost_gem",
    "cobblemon:dragon_gem",
    "cobblemon:dark_gem",
    "cobblemon:steel_gem",
    "cobblemon:fairy_gem",
    "cobblemon:normal_gem",
    "cobblemon:fire_gem",
    "cobblemon:water_gem",
    "cobblemon:grass_gem",
    "cobblemon:electric_gem",
    "cobblemon:ice_gem",
    "cobblemon:fighting_gem",
    "cobblemon:poison_gem",
    "cobblemon:ground_gem"
];

function dropConfiguredItem(npc, itemId, count, config) {
    if (!utils.hasText(itemId) || count <= 0) return;

    var left = Math.floor(count);
    while (left > 0) {
        var stackSize = left > 64 ? 64 : left;
        spawnScatterItem(npc, itemId, stackSize, config);
        left -= stackSize;
    }
}

function dropRandomGems(npc, count, config) {
    for (var i = 0; i < count; i++) {
        spawnScatterItem(npc, pickRandomGemId(), 1, config);
    }
}

function spawnScatterItem(npc, itemId, amount, config) {
    if (!utils.hasText(itemId)) return;

    try {
        var itemType = getCachedItemType(itemId);
        if (itemType == null) return;

        var stack = new Reward_MCItemStack(itemType, Math.max(1, Math.floor(amount)));
        if (stack == null || stack.isEmpty()) return;

        var level = npc.getMCEntity().level();
        var drop = new Reward_ItemEntity(level, npc.getX(), npc.getY() + 1.2, npc.getZ(), stack);
        drop.setDeltaMovement(
            randomSigned(config.pinataSpeedMin, config.pinataSpeedMax),
            config.pinataVerticalBoost + Math.random() * 0.18,
            randomSigned(config.pinataSpeedMin, config.pinataSpeedMax)
        );
        level.addFreshEntity(drop);
    } catch (e) {}
}

function getStageDropCountForHit(runtime, phase, hpBefore, hpAfter, maxHp) {
    var config = runtime.config;
    var stageStartHp = getStageStartHp(config, phase, maxHp);
    var stageEndHp = getStageEndHp(config, phase, maxHp);
    var totalDrops = getStageTotalDrops(runtime, phase);
    if (totalDrops <= 0) return 0;

    var before = clampHpToStage(hpBefore, stageStartHp, stageEndHp);
    var after = clampHpToStage(hpAfter, stageStartHp, stageEndHp);
    var shouldHaveDropped = getDropsEarnedByHp(stageStartHp, stageEndHp, after, totalDrops);
    var alreadyDropped = getStageDropsGiven(runtime, phase);
    var toDrop = shouldHaveDropped - alreadyDropped;

    if (toDrop <= 0) return 0;
    setStageDropsGiven(runtime, phase, alreadyDropped + toDrop);
    return toDrop;
}

function getStageDropCountToThreshold(runtime, phase, hpBefore, thresholdHp, maxHp) {
    return getStageDropCountForHit(runtime, phase, hpBefore, thresholdHp, maxHp);
}

function getStageTotalDrops(runtime, phase) {
    var participants = Math.max(1, runtime.state.liveSnapshot.length);
    var base = phase == 2 ? utils.parseIntSafe(runtime.config.phase2TotalDropsBase, 8) : utils.parseIntSafe(runtime.config.phase3TotalDropsBase, 3);
    var perExtra = phase == 2 ? utils.parseIntSafe(runtime.config.phase2TotalDropsPerExtraPlayer, 4) : utils.parseIntSafe(runtime.config.phase3TotalDropsPerExtraPlayer, 2);
    var max = phase == 2 ? utils.parseIntSafe(runtime.config.phase2TotalDropsMax, 24) : utils.parseIntSafe(runtime.config.phase3TotalDropsMax, 12);
    var total = base + Math.max(0, participants - 1) * perExtra;
    if (max > 0 && total > max) total = max;
    return total < 0 ? 0 : total;
}

function getStageDropsGiven(runtime, phase) {
    return utils.parseIntSafe(runtime.state.stageDrops["" + phase], 0);
}

function setStageDropsGiven(runtime, phase, value) {
    runtime.state.stageDrops["" + phase] = Math.max(0, utils.parseIntSafe(value, 0));
}

function getStageStartHp(config, phase, maxHp) {
    if (phase == 2) return maxHp * config.phase2HealTo;
    return maxHp * config.phase3HealTo;
}

function getStageEndHp(config, phase, maxHp) {
    if (phase == 2) return maxHp * config.phase3Threshold;
    return phases.getArceusDeathThresholdHp(maxHp, config);
}

function clampHpToStage(hp, stageStartHp, stageEndHp) {
    if (hp > stageStartHp) return stageStartHp;
    if (hp < stageEndHp) return stageEndHp;
    return hp;
}

function getDropsEarnedByHp(stageStartHp, stageEndHp, hpNow, totalDrops) {
    var span = stageStartHp - stageEndHp;
    if (span <= 0) return totalDrops;

    var progress = (stageStartHp - hpNow) / span;
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;
    return Math.floor(progress * totalDrops);
}

function getCachedItemType(itemId) {
    var cached = ARCEUS_ITEM_TYPE_CACHE[itemId];
    if (cached !== undefined) return cached;

    var item = null;
    try {
        item = Reward_BuiltInRegistries.ITEM.get(Reward_ResourceLocation.parse(itemId));
    } catch (e) {
        item = null;
    }

    ARCEUS_ITEM_TYPE_CACHE[itemId] = item;
    return item;
}

function pickRandomGemId() {
    var index = Math.floor(Math.random() * ARCEUS_PHASE3_GEMS.length);
    if (index < 0) index = 0;
    if (index >= ARCEUS_PHASE3_GEMS.length) index = ARCEUS_PHASE3_GEMS.length - 1;
    return ARCEUS_PHASE3_GEMS[index];
}

function randomSigned(min, max) {
    var low = Math.min(min, max);
    var high = Math.max(min, max);
    var speed = low + Math.random() * (high - low);
    return Math.random() < 0.5 ? -speed : speed;
}

module.exports = {
    ARCEUS_PHASE3_GEMS: ARCEUS_PHASE3_GEMS,
    dropConfiguredItem: dropConfiguredItem,
    dropRandomGems: dropRandomGems,
    spawnScatterItem: spawnScatterItem,
    getStageDropCountForHit: getStageDropCountForHit,
    getStageDropCountToThreshold: getStageDropCountToThreshold,
    getStageTotalDrops: getStageTotalDrops,
    getStageDropsGiven: getStageDropsGiven,
    setStageDropsGiven: setStageDropsGiven,
    getStageStartHp: getStageStartHp,
    getStageEndHp: getStageEndHp,
    clampHpToStage: clampHpToStage,
    getDropsEarnedByHp: getDropsEarnedByHp
};
