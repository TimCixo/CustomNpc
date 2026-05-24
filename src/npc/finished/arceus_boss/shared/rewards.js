// @ts-check

var utils = require("utils.js");

var Reward_ItemEntity = Java.type("net.minecraft.world.entity.item.ItemEntity");
var Reward_MCItemStack = Java.type("net.minecraft.world.item.ItemStack");
var Reward_BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var Reward_ResourceLocation = Java.type("net.minecraft.resources.ResourceLocation");
var Reward_PokemonProperties = Java.type("com.cobblemon.mod.common.api.pokemon.PokemonProperties");
var Reward_IVs = Java.type("com.cobblemon.mod.common.pokemon.IVs");
var Reward_Stats = Java.type("com.cobblemon.mod.common.api.pokemon.stats.Stats");
var Reward_ZipFile = Java.type("java.util.zip.ZipFile");
var Reward_File = Java.type("java.io.File");
var Reward_Scanner = Java.type("java.util.Scanner");
var Reward_URLDecoder = Java.type("java.net.URLDecoder");
var Reward_Cobblemon = Java.type("com.cobblemon.mod.common.Cobblemon");
var Reward_PlayerExtensionsKt = Java.type("com.cobblemon.mod.common.util.PlayerExtensionsKt");

/**
 * @typedef {import("./config.js").ArceusConfig} ArceusConfig
 * @typedef {import("./state.js").ArceusState} ArceusState
 */

var ITEM_TYPE_CACHE = {};
var REWARD_POOLS_ATTEMPTED = false;
var LEGENDARY_REWARD_POOL = null;
var MYTHICAL_REWARD_POOL = null;
var SUPER_RARE_REWARD_POOL = null;
var NORMAL_REWARD_POOL = null;

var REWARD_STAT_ORDER = [
    Reward_Stats.HP,
    Reward_Stats.ATTACK,
    Reward_Stats.DEFENCE,
    Reward_Stats.SPECIAL_ATTACK,
    Reward_Stats.SPECIAL_DEFENCE,
    Reward_Stats.SPEED
];

var PHASE3_GEMS = [
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

function warmUpPools() {
    ensureRewardPoolsLoaded();
}

function ensureRewardPoolsLoaded() {
    if (areRewardPoolsLoaded()) return;
    if (REWARD_POOLS_ATTEMPTED) return;

    REWARD_POOLS_ATTEMPTED = true;
    if (loadRewardPoolsFromCobblemonJar()) return;

    LEGENDARY_REWARD_POOL = [];
    MYTHICAL_REWARD_POOL = [];
    SUPER_RARE_REWARD_POOL = [];
    NORMAL_REWARD_POOL = [];
}

function areRewardPoolsLoaded() {
    return LEGENDARY_REWARD_POOL != null && LEGENDARY_REWARD_POOL.length > 0
        && MYTHICAL_REWARD_POOL != null && MYTHICAL_REWARD_POOL.length > 0
        && SUPER_RARE_REWARD_POOL != null && SUPER_RARE_REWARD_POOL.length > 0
        && NORMAL_REWARD_POOL != null && NORMAL_REWARD_POOL.length > 0;
}

function loadRewardPoolsFromCobblemonJar() {
    var zip = null;
    try {
        var jarFile = resolveCobblemonJarFile();
        var entries;
        var legendarySet = {};
        var mythicalSet = {};
        var superRareSet = {};
        var normalSet = {};

        if (jarFile == null || !jarFile.exists() || !jarFile.isFile()) return false;

        zip = new Reward_ZipFile(jarFile);
        entries = zip.entries();
        while (entries.hasMoreElements()) {
            var entry = entries.nextElement();
            var name = "" + entry.getName();
            var text = readZipEntryText(zip, entry);

            if (text == null || text.length <= 0) continue;
            if (name.indexOf("data/cobblemon/spawn_pool_world/") === 0 && name.lastIndexOf(".json") === name.length - 5) {
                collectBucketSpecies(text, superRareSet, normalSet);
                continue;
            }
            if (name.indexOf("data/cobblemon/species/") === 0 && name.lastIndexOf(".json") === name.length - 5) {
                collectSpecialSpecies(text, legendarySet, mythicalSet);
            }
        }

        LEGENDARY_REWARD_POOL = setKeysToPrefixedArray(legendarySet);
        MYTHICAL_REWARD_POOL = setKeysToPrefixedArray(mythicalSet, legendarySet);
        SUPER_RARE_REWARD_POOL = setKeysToPrefixedArray(superRareSet, legendarySet, mythicalSet);
        NORMAL_REWARD_POOL = setKeysToPrefixedArray(normalSet, legendarySet, mythicalSet, superRareSet);
        return areRewardPoolsLoaded();
    } catch (e) {
        return false;
    } finally {
        try {
            if (zip != null) zip.close();
        } catch (closeError) {}
    }
}

function resolveCobblemonJarFile() {
    try {
        var url = Reward_PokemonProperties.class.getProtectionDomain().getCodeSource().getLocation();
        if (url == null) return null;
        return new Reward_File(url.toURI());
    } catch (e) {}
    try {
        var path = "" + Reward_PokemonProperties.class.getProtectionDomain().getCodeSource().getLocation().getPath();
        var normalizedPath = normalizeJarLocationToPath(path);
        if (utils.hasText(normalizedPath)) return new Reward_File(normalizedPath);
    } catch (e2) {}
    try {
        var external = "" + Reward_PokemonProperties.class.getProtectionDomain().getCodeSource().getLocation().toExternalForm();
        var normalized = normalizeJarLocationToPath(external);
        if (utils.hasText(normalized)) return new Reward_File(normalized);
    } catch (e3) {}
    return null;
}

function normalizeJarLocationToPath(location) {
    var text = utils.trimString(location);
    var bang;
    var idx;
    var hashSuffix;

    if (text.length <= 0) return null;
    bang = text.indexOf("!/");
    if (bang >= 0) text = text.substring(0, bang);
    if (text.charAt(text.length - 1) == "!") text = text.substring(0, text.length - 1);

    while (startsWithIgnoreCase(text, "jar:") || startsWithIgnoreCase(text, "union:")) {
        idx = text.indexOf(":");
        if (idx < 0) break;
        text = text.substring(idx + 1);
    }

    if (startsWithIgnoreCase(text, "file:/")) {
        text = text.substring(5);
        while (text.length > 0 && text.charAt(0) == "/") text = text.substring(1);
    }

    try {
        text = "" + Reward_URLDecoder.decode(text.replace("+", "%2B"), "UTF-8");
    } catch (e) {}

    hashSuffix = text.lastIndexOf("#");
    if (hashSuffix > 0 && text.toLowerCase().lastIndexOf(".jar") < hashSuffix) text = text.substring(0, hashSuffix);
    if (startsWithIgnoreCase(text, "/home/") || startsWithIgnoreCase(text, "/srv/") || startsWithIgnoreCase(text, "/opt/")) return text;
    if (text.length >= 2 && text.charAt(1) == ":") return text;
    return null;
}

function startsWithIgnoreCase(text, prefix) {
    if (text == null || prefix == null) return false;
    if (text.length < prefix.length) return false;
    return text.substring(0, prefix.length).toLowerCase() == prefix.toLowerCase();
}

function readZipEntryText(zip, entry) {
    var stream = null;
    var scanner = null;
    try {
        stream = zip.getInputStream(entry);
        scanner = new Reward_Scanner(stream, "UTF-8").useDelimiter("\\A");
        return scanner.hasNext() ? "" + scanner.next() : "";
    } catch (e) {
        return null;
    } finally {
        try {
            if (scanner != null) scanner.close();
        } catch (closeScannerError) {}
        try {
            if (stream != null) stream.close();
        } catch (closeStreamError) {}
    }
}

function collectBucketSpecies(text, superRareSet, normalSet) {
    var regex = /"pokemon"\s*:\s*"([^"]+)"[\s\S]*?"bucket"\s*:\s*"([^"]+)"/g;
    var match;
    while ((match = regex.exec(text)) != null) {
        var species = extractBucketSpeciesId(match[1]);
        var bucket = utils.trimString(match[2]);
        if (!utils.hasText(species) || !utils.hasText(bucket)) continue;
        if (bucket == "ultra-rare") superRareSet[species] = true;
        else if (bucket == "common" || bucket == "uncommon" || bucket == "rare") normalSet[species] = true;
    }
}

function collectSpecialSpecies(text, legendarySet, mythicalSet) {
    var nameMatch = /"name"\s*:\s*"([^"]+)"/.exec(text);
    var labelsMatch = /"labels"\s*:\s*\[([\s\S]*?)\]/.exec(text);
    var labelsText;
    var species;

    if (nameMatch == null || nameMatch.length < 2) return;
    if (labelsMatch == null || labelsMatch.length < 2) return;

    labelsText = labelsMatch[1];
    species = utils.trimString(nameMatch[1]).toLowerCase();
    if (!utils.hasText(species)) return;
    if (labelsText.indexOf("\"mythical\"") >= 0) mythicalSet[species] = true;
    else if (labelsText.indexOf("\"legendary\"") >= 0) legendarySet[species] = true;
}

function extractBucketSpeciesId(raw) {
    var token = utils.trimString(raw).split(" ")[0];
    return utils.trimString(token);
}

function setKeysToPrefixedArray(setMap, excludeMap1, excludeMap2, excludeMap3) {
    var out = [];
    var key;
    for (key in setMap) {
        if (!Object.prototype.hasOwnProperty.call(setMap, key)) continue;
        if (excludeMap1 != null && excludeMap1[key]) continue;
        if (excludeMap2 != null && excludeMap2[key]) continue;
        if (excludeMap3 != null && excludeMap3[key]) continue;
        out.push("cobblemon:" + key);
    }
    out.sort();
    return out;
}

/**
 * @param {any} player
 * @param {string} speciesId
 * @param {string} ivString
 * @returns {any}
 */
function giveRewardPokemon(player, speciesId, ivString) {
    var reward;
    if (player == null) return { ok: false, reason: "reward player missing" };
    if (!utils.hasText(speciesId)) return { ok: false, reason: "reward species missing" };

    reward = createRewardPokemonEntity(speciesId, ivString);
    if (!reward.ok) return reward;
    return addRewardPokemonToParty(player, reward.pokemon, speciesId);
}

/**
 * @param {string} speciesId
 * @param {string} ivString
 * @returns {any}
 */
function createRewardPokemonEntity(speciesId, ivString) {
    var props = parsePokemonProperties(speciesId);
    var pokemon;

    if (props == null) return { ok: false, reason: "pokemon creation failed: parse properties", species: speciesId };

    try {
        props.setLevel(randomIntInclusive(10, 20));
        props.setShiny(Math.random() < 0.10);
        props.setIvs(buildStatsBlock(new Reward_IVs(), ivString, 0, 31));
        pokemon = props.create();
    } catch (e) {
        return { ok: false, reason: "pokemon creation failed", species: speciesId };
    }

    if (pokemon == null) return { ok: false, reason: "pokemon creation failed: null pokemon", species: speciesId };
    return { ok: true, pokemon: pokemon, species: speciesId };
}

/**
 * @param {any} player
 * @param {any} pokemon
 * @param {string} speciesId
 * @returns {any}
 */
function addRewardPokemonToParty(player, pokemon, speciesId) {
    var party = getRewardPlayerParty(player);
    if (party == null || pokemon == null) return { ok: false, reason: "party add failed", species: speciesId };
    try {
        if (party.add(pokemon)) return { ok: true, species: speciesId };
    } catch (e) {}
    return { ok: false, reason: "party add failed", species: speciesId };
}

function getRewardPlayerParty(player) {
    if (player == null) return null;
    try {
        return Reward_PlayerExtensionsKt.party(player.getMCEntity());
    } catch (e1) {
        try {
            return Reward_Cobblemon.INSTANCE.getStorage().getParty(player.getMCEntity());
        } catch (e2) {
            return null;
        }
    }
}

function parsePokemonProperties(speciesId) {
    try {
        return Reward_PokemonProperties.Companion.parse(speciesId);
    } catch (e) {
        return null;
    }
}

function buildStatsBlock(statsObject, rawValue, min, max) {
    var parts = ("" + rawValue).split("/");
    var i;
    var token;
    var value;

    for (i = 0; i < REWARD_STAT_ORDER.length; i++) {
        if (i >= parts.length) break;
        token = utils.trimString(parts[i]);
        if (token.length == 0) continue;
        value = clamp(utils.parseIntSafe(token, min), min, max);
        statsObject.set(REWARD_STAT_ORDER[i], value);
    }
    return statsObject;
}

function giveRankReward(player, rank) {
    var species;
    warmUpPools();
    species = pickRewardSpeciesForPlace(rank);
    return giveRewardPokemon(player, species, getRewardIvStringForPlace(rank));
}

function pickRewardSpeciesForPlace(placeIndex) {
    var roll = Math.random() * 100;
    if (!areRewardPoolsLoaded()) return null;

    if (placeIndex == 0) {
        if (roll < 50) return pickRandomSpecies(SUPER_RARE_REWARD_POOL);
        if (roll < 85) return pickRandomSpecies(MYTHICAL_REWARD_POOL);
        return pickRandomSpecies(LEGENDARY_REWARD_POOL);
    }
    if (placeIndex == 1) {
        if (roll < 70) return pickRandomSpecies(SUPER_RARE_REWARD_POOL);
        if (roll < 95) return pickRandomSpecies(MYTHICAL_REWARD_POOL);
        return pickRandomSpecies(LEGENDARY_REWARD_POOL);
    }
    if (placeIndex == 2) {
        if (roll < 70) return pickRandomSpecies(NORMAL_REWARD_POOL);
        if (roll < 95) return pickRandomSpecies(SUPER_RARE_REWARD_POOL);
        return pickRandomSpecies(MYTHICAL_REWARD_POOL);
    }
    if (roll < 85) return pickRandomSpecies(NORMAL_REWARD_POOL);
    if (roll < 99) return pickRandomSpecies(SUPER_RARE_REWARD_POOL);
    return pickRandomSpecies(MYTHICAL_REWARD_POOL);
}

function getRewardIvStringForPlace(placeIndex) {
    if (placeIndex == 0) return rollIvRangeString(25, 31);
    if (placeIndex == 1) return rollIvRangeString(20, 28);
    if (placeIndex == 2) return rollIvRangeString(15, 24);
    return rollIvRangeString(10, 22);
}

function rollIvRangeString(min, max) {
    var values = [];
    var i;
    for (i = 0; i < 6; i++) values.push("" + randomIntInclusive(min, max));
    return values.join("/");
}

function randomIntInclusive(min, max) {
    var low = Math.floor(Math.min(min, max));
    var high = Math.floor(Math.max(min, max));
    return low + Math.floor(Math.random() * (high - low + 1));
}

function pickRandomSpecies(pool) {
    var index;
    if (pool == null || pool.length <= 0) return null;
    index = Math.floor(Math.random() * pool.length);
    if (index < 0) index = 0;
    if (index >= pool.length) index = pool.length - 1;
    return pool[index];
}

function clamp(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}

/**
 * @param {any} npc
 * @param {string} itemId
 * @param {number} amount
 * @param {ArceusConfig} config
 */
function spawnScatterItem(npc, itemId, amount, config) {
    var itemType;
    var stack;
    var level;
    var drop;

    if (!utils.hasText(itemId)) return;

    try {
        itemType = getCachedItemType(itemId);
        if (itemType == null) return;

        stack = new Reward_MCItemStack(itemType, Math.max(1, Math.floor(amount)));
        if (stack == null || stack.isEmpty()) return;

        level = npc.getMCEntity().level();
        drop = new Reward_ItemEntity(level, npc.getX(), npc.getY() + 1.2, npc.getZ(), stack);
        drop.setDeltaMovement(
            randomSigned(readRewardNumber(config, "pinataSpeedMin", 0.20), readRewardNumber(config, "pinataSpeedMax", 0.55)),
            readRewardNumber(config, "pinataVerticalBoost", 0.28) + Math.random() * 0.18,
            randomSigned(readRewardNumber(config, "pinataSpeedMin", 0.20), readRewardNumber(config, "pinataSpeedMax", 0.55))
        );
        level.addFreshEntity(drop);
    } catch (e) {}
}

/**
 * @param {any} npc
 * @param {string} itemId
 * @param {number} count
 * @param {ArceusConfig} config
 */
function dropConfiguredItem(npc, itemId, count, config) {
    var left = Math.floor(count);
    var stackSize;

    if (!utils.hasText(itemId) || left <= 0) return;
    while (left > 0) {
        stackSize = left > 64 ? 64 : left;
        spawnScatterItem(npc, itemId, stackSize, config);
        left -= stackSize;
    }
}

/**
 * @param {any} npc
 * @param {number} count
 * @param {ArceusConfig} config
 */
function dropRandomGems(npc, count, config) {
    var i;
    for (i = 0; i < count; i++) {
        spawnScatterItem(npc, pickRandomGemId(), 1, config);
    }
}

function getCachedItemType(itemId) {
    var item;
    if (ITEM_TYPE_CACHE[itemId] !== undefined) return ITEM_TYPE_CACHE[itemId];
    try {
        item = Reward_BuiltInRegistries.ITEM.get(Reward_ResourceLocation.parse(itemId));
    } catch (e) {
        item = null;
    }
    ITEM_TYPE_CACHE[itemId] = item;
    return item;
}

function pickRandomGemId() {
    var index = Math.floor(Math.random() * PHASE3_GEMS.length);
    if (index < 0) index = 0;
    if (index >= PHASE3_GEMS.length) index = PHASE3_GEMS.length - 1;
    return PHASE3_GEMS[index];
}

function randomSigned(min, max) {
    var low = Math.min(min, max);
    var high = Math.max(min, max);
    var speed = low + Math.random() * (high - low);
    return Math.random() < 0.5 ? -speed : speed;
}

/**
 * @param {ArceusState} state
 * @param {ArceusConfig} config
 * @param {number} phase
 * @param {number} hpBefore
 * @param {number} hpAfter
 * @param {number} maxHp
 * @returns {number}
 */
function getStageDropCountForHit(state, config, phase, hpBefore, hpAfter, maxHp) {
    var stageStartHp = getStageStartHp(config, phase, maxHp);
    var stageEndHp = getStageEndHp(config, phase, maxHp);
    var totalDrops = getStageTotalDrops(state, config, phase);
    var before;
    var after;
    var shouldHaveDropped;
    var alreadyDropped;
    var toDrop;

    if (totalDrops <= 0) return 0;

    before = clampHpToStage(hpBefore, stageStartHp, stageEndHp);
    after = clampHpToStage(hpAfter, stageStartHp, stageEndHp);
    if (after >= before) return 0;

    shouldHaveDropped = getDropsEarnedByHp(stageStartHp, stageEndHp, after, totalDrops);
    alreadyDropped = getStageDropsGiven(state, phase);
    toDrop = shouldHaveDropped - alreadyDropped;

    if (toDrop <= 0) return 0;
    setStageDropsGiven(state, phase, alreadyDropped + toDrop);
    return toDrop;
}

function getStageTotalDrops(state, config, phase) {
    var participants = Math.max(1, state.liveSnapshot == null ? 0 : state.liveSnapshot.length);
    var base = phase == 2 ? readRewardInt(config, "phase2TotalDropsBase", 8) : readRewardInt(config, "phase3TotalDropsBase", 3);
    var perExtra = phase == 2 ? readRewardInt(config, "phase2TotalDropsPerExtraPlayer", 4) : readRewardInt(config, "phase3TotalDropsPerExtraPlayer", 2);
    var max = phase == 2 ? readRewardInt(config, "phase2TotalDropsMax", 24) : readRewardInt(config, "phase3TotalDropsMax", 12);
    var total = base + Math.max(0, participants - 1) * perExtra;
    if (max > 0 && total > max) total = max;
    return total < 0 ? 0 : total;
}

function getStageDropsGiven(state, phase) {
    if (state.stageDrops == null) state.stageDrops = { "2": 0, "3": 0 };
    return utils.parseIntSafe(state.stageDrops["" + phase], 0);
}

function setStageDropsGiven(state, phase, value) {
    if (state.stageDrops == null) state.stageDrops = { "2": 0, "3": 0 };
    state.stageDrops["" + phase] = Math.max(0, utils.parseIntSafe(value, 0));
}

function getStageStartHp(config, phase, maxHp) {
    if (phase == 2) return maxHp * readPhaseNumber(config, "phase2HealTo", 0.72);
    return maxHp * readPhaseNumber(config, "phase3HealTo", 0.45);
}

function getStageEndHp(config, phase, maxHp) {
    if (phase == 2) return maxHp * readPhaseNumber(config, "phase3Threshold", 0.10);
    return getDeathThresholdHp(config, maxHp);
}

function getDeathThresholdHp(config, maxHp) {
    var threshold = maxHp * readDeathNumber(config, "thresholdPercent", 0.02);
    var min = readDeathNumber(config, "thresholdMinHp", 20);
    return Math.max(1, threshold < min ? min : threshold);
}

function clampHpToStage(hp, stageStartHp, stageEndHp) {
    if (hp > stageStartHp) return stageStartHp;
    if (hp < stageEndHp) return stageEndHp;
    return hp;
}

function getDropsEarnedByHp(stageStartHp, stageEndHp, hpNow, totalDrops) {
    var span = stageStartHp - stageEndHp;
    var progress;
    if (span <= 0) return totalDrops;
    progress = (stageStartHp - hpNow) / span;
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;
    return Math.floor(progress * totalDrops);
}

function readRewardInt(config, key, fallback) {
    try {
        return utils.parseIntSafe(config.rewards[key], fallback);
    } catch (e) {
        return fallback;
    }
}

function readRewardNumber(config, key, fallback) {
    try {
        return utils.parseFloatSafe(config.rewards[key], fallback);
    } catch (e) {
        return fallback;
    }
}

function readDeathNumber(config, key, fallback) {
    try {
        return utils.parseFloatSafe(config.death[key], fallback);
    } catch (e) {
        return fallback;
    }
}

function readPhaseNumber(config, key, fallback) {
    try {
        return utils.parseFloatSafe(config.phases[key], fallback);
    } catch (e) {
        return fallback;
    }
}

module.exports = {
    PHASE3_GEMS: PHASE3_GEMS,
    warmUpPools: warmUpPools,
    loadRewardPoolsFromCobblemonJar: loadRewardPoolsFromCobblemonJar,
    giveRewardPokemon: giveRewardPokemon,
    createRewardPokemonEntity: createRewardPokemonEntity,
    addRewardPokemonToParty: addRewardPokemonToParty,
    giveRankReward: giveRankReward,
    pickRewardSpeciesForPlace: pickRewardSpeciesForPlace,
    getRewardIvStringForPlace: getRewardIvStringForPlace,
    spawnScatterItem: spawnScatterItem,
    dropConfiguredItem: dropConfiguredItem,
    dropRandomGems: dropRandomGems,
    getStageDropCountForHit: getStageDropCountForHit,
    getStageTotalDrops: getStageTotalDrops,
    getStageDropsGiven: getStageDropsGiven,
    setStageDropsGiven: setStageDropsGiven,
    getDeathThresholdHp: getDeathThresholdHp
};
