var utils = require("utils.js");
var runtimeModule = require("runtime.js");
var visuals = require("visuals.js");
var phases = require("phases.js");
var rewards = require("rewards.js");
var damage = require("damage.js");
var leaderboard = require("leaderboard.js");

var Reward_PokemonProperties = Java.type("com.cobblemon.mod.common.api.pokemon.PokemonProperties");
var Reward_IVs = Java.type("com.cobblemon.mod.common.pokemon.IVs");
var Reward_Stats = Java.type("com.cobblemon.mod.common.api.pokemon.stats.Stats");
var Reward_ZipFile = Java.type("java.util.zip.ZipFile");
var Reward_File = Java.type("java.io.File");
var Reward_Scanner = Java.type("java.util.Scanner");
var Reward_URLDecoder = Java.type("java.net.URLDecoder");
var Reward_Cobblemon = Java.type("com.cobblemon.mod.common.Cobblemon");
var Reward_PlayerExtensionsKt = Java.type("com.cobblemon.mod.common.util.PlayerExtensionsKt");
var DeathFlow_MobEffects = Java.type("net.minecraft.world.effect.MobEffects");
var DeathFlow_BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");

var REWARD_STAT_ORDER = [
    Reward_Stats.HP,
    Reward_Stats.ATTACK,
    Reward_Stats.DEFENCE,
    Reward_Stats.SPECIAL_ATTACK,
    Reward_Stats.SPECIAL_DEFENCE,
    Reward_Stats.SPEED
];

var LEGENDARY_REWARD_POOL = null;
var MYTHICAL_REWARD_POOL = null;
var SUPER_RARE_REWARD_POOL = null;
var NORMAL_REWARD_POOL = null;
var REWARD_POOLS_ATTEMPTED = false;

function ensureDebug(runtime) {
    return leaderboard.ensureDebug ? leaderboard.ensureDebug(runtime) : null;
}

function setRewardDebug(runtime, message) {
    var debug = ensureDebug(runtime);
    if (debug == null) return;
    debug.lastRewardError = utils.hasText(message) ? "" + message : "-";
}

function requestStart(runtime) {
    if (runtime.state.mode != "live") return;
    runtime.state.mode = "custom_death_start";
    runtime.state.customDeathTicksLeft = utils.parseIntSafe(runtime.config.customDeathTicks, 80);
    runtime.state.leaderboardAnnounced = false;
    runtime.state.rewardsGiven = false;
    runtime.state.rewardCursor = 0;
    runtime.state.deathCommitted = false;
    runtime.state.deathLineStage = 0;
    runtime.state.deathAnimStarted = false;
    runtime.state.deathFinalizeDone = false;
    setRewardDebug(runtime, "-");
    if (leaderboard.setLeaderboardDebug) leaderboard.setLeaderboardDebug(runtime, "-");
    runtimeModule.persistRuntimeState(runtime);
}

function tickDeathPath(runtime) {
    if (runtime.state.mode == "custom_death_start") {
        tickCustomDeath(runtime);
        return;
    }
    if (runtime.state.mode == "death_commit_pending") {
        commitCustomDeath(runtime);
        return;
    }
    stopDeathTimer(runtime);
}

function tickCustomDeath(runtime) {
    var npc = runtime.npc;
    var state = runtime.state;

    forceDeathSafeHealthFloorLive(runtime);
    visuals.setEntityInvulnerable(npc, true);
    phases.stopCombatForDeath(npc);
    restartDeathTimer(runtime);

    if (state.deathLineStage <= 0) {
        state.deathLineStage = 1;
        visuals.playSoundForAllPlayers(npc, runtime.config.deathSound, 1.2, 1.0);
        visuals.safeSay(npc, "\u00A75\u0410\u0440\u043A\u0435\u0443\u0441 \u043D\u0435 \u043F\u0430\u0434\u0430\u0435\u0442. \u041E\u043D \u043D\u0430\u0447\u0438\u043D\u0430\u0435\u0442 \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u0443\u044E \u0441\u043C\u0435\u0440\u0442\u044C.");
    }

    tickDeathSpin(runtime);

    if (state.deathLineStage < 2 && state.customDeathTicksLeft <= Math.floor(utils.parseIntSafe(runtime.config.customDeathTicks, 80) / 2)) {
        visuals.safeSay(npc, "\u00A75\u041C\u0438\u0440 \u0434\u0440\u043E\u0436\u0438\u0442. \u0410\u0440\u043A\u0435\u0443\u0441 \u0438\u0441\u0447\u0435\u0437\u0430\u0435\u0442 \u043F\u043E \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0439 \u0432\u043E\u043B\u0435.");
        state.deathLineStage = 2;
    }

    state.customDeathTicksLeft -= utils.parseIntSafe(runtime.config.deathTimerTicks, 1);
    if (state.customDeathTicksLeft > 0) return;

    state.customDeathTicksLeft = 0;
    if (!state.deathFinalizeDone) {
        state.deathFinalizeDone = true;
        startDeathAnimationOnce(runtime);
        spawnDeathExplosion(runtime);
        moveNpcBelowArena(npc);
        visuals.safeSay(npc, "\u00A78\u0410\u0440\u043A\u0435\u0443\u0441 \u043F\u0430\u043B.");
    }
    state.mode = "death_commit_pending";
}

function tickDeathSpin(runtime) {
    var npc = runtime.npc;
    startDeathAnimationOnce(runtime);
    try {
        var rot = npc.getRotation();
        rot += utils.parseFloatSafe(runtime.config.deathSpinStep, 12);
        while (rot >= 360) rot -= 360;
        npc.setRotation(rot);
    } catch (e) {}
}

function startDeathAnimationOnce(runtime) {
    if (runtime.state.deathAnimStarted) return;
    runtime.state.deathAnimStarted = true;
    try {
        runtime.npc.playAnimation(utils.parseIntSafe(runtime.config.deathAnimationId, 5));
        return;
    } catch (e) {}
    try {
        runtime.npc.getAi().setAnimation(utils.parseIntSafe(runtime.config.deathAnimationId, 5));
    } catch (e2) {}
}

function commitCustomDeath(runtime) {
    var npc = runtime.npc;
    prepareNpcForDeathCommit(npc);
    restartDeathTimer(runtime);
    runtime.state.deathCommitted = true;
    runtimeModule.persistRuntimeState(runtime);
    leaderboard.freezeSnapshot(runtime);
    if (!damageNpcWithCommand(npc)) {
        runtime.state.deathCommitted = false;
        if (leaderboard.setLeaderboardDebug) leaderboard.setLeaderboardDebug(runtime, "death commit damage command failed");
        runtimeModule.persistRuntimeState(runtime);
        return;
    }

    leaderboard.announceFrozenSnapshot(runtime, visuals);
    runtime.state.rewardCursor = 0;
    distributeFrozenSnapshotRewards(runtime);
    handleCommittedDeath(runtime);
}

function distributeFrozenSnapshotRewards(runtime) {
    if (runtime.state.rewardsGiven) return;
    warmRewardPools();
    if (!areRewardPoolsLoaded()) {
        setRewardDebug(runtime, "reward pools failed to load");
        runtime.state.rewardsGiven = true;
        runtimeModule.persistRuntimeState(runtime);
        return;
    }

    var entries = runtime.state.frozenSnapshot;
    if (entries == null || entries.length <= 0) {
        setRewardDebug(runtime, "frozen snapshot empty");
        runtime.state.rewardsGiven = true;
        runtimeModule.persistRuntimeState(runtime);
        return;
    }

    var players = leaderboard.getOnlinePlayers(runtime.npc);
    var hadRewardFailure = false;
    for (var i = runtime.state.rewardCursor; i < entries.length; i++) {
        var entry = entries[i];
        var player = leaderboard.resolveRewardPlayer(runtime.npc, entry, players);
        var result = grantRankReward(runtime, entry, i, player);
        if (result != null && result.ok === false) hadRewardFailure = true;
        runtime.state.rewardCursor = i + 1;
    }
    runtime.state.rewardsGiven = true;
    if (hadRewardFailure) {
        visuals.safeSay(runtime.npc, "§7Награды выданы не полностью. Причина сохранена в debug.");
    } else {
        setRewardDebug(runtime, "-");
    }
    runtimeModule.persistRuntimeState(runtime);
}

function grantRankReward(runtime, entry, rank, playerOrNull) {
    if (entry == null) {
        setRewardDebug(runtime, "reward entry missing at rank=" + rank);
        return { ok: false, reason: "entry missing" };
    }
    if (playerOrNull == null) {
        setRewardDebug(runtime, "reward player unresolved for " + (utils.hasText(entry.name) ? entry.name : entry.uuid));
        return { ok: false, reason: "player unresolved" };
    }
    var species = pickRewardSpeciesForPlace(rank);
    var ivs = getRewardIvStringForPlace(rank);
    if (!utils.hasText(species)) {
        setRewardDebug(runtime, "reward species missing for " + playerOrNull.getName() + " rank=" + rank);
        return { ok: false, reason: "species missing" };
    }
    var result = giveRewardPokemon(playerOrNull, species, ivs);
    if (!result.ok) {
        setRewardDebug(runtime, result.reason + " for " + playerOrNull.getName() + " species=" + species);
    }
    return result;
}

function handleCommittedDeath(runtime) {
    runtime.state.mode = "death_committed";
    runtime.state.deathCommitted = true;
    runtime.state.customDeathTicksLeft = 0;
    runtime.state.transitionTicksLeft = 0;
    runtime.state.recentHits = {};
    runtime.state.damageMap = {};
    runtime.state.liveSnapshot = [];
    runtime.state.nextAggroRefreshAt = 0;
    runtime.state.respawnVisualResetTicks = utils.parseIntSafe(runtime.config.respawnVisualResetTicks, 20);

    stopDeathTimer(runtime);
    stopBossTimer(runtime);
    runtimeModule.persistRuntimeState(runtime);
}

function restartDeathTimer(runtime) {
    try {
        runtime.npc.timers.forceStart(runtimeModule.ARCEUS_DEATH_TIMER_ID, utils.parseIntSafe(runtime.config.deathTimerTicks, 1), true);
    } catch (e) {}
}

function stopBossTimer(runtime) {
    try {
        runtime.npc.timers.stop(runtimeModule.ARCEUS_TIMER_ID);
    } catch (e) {}
}

function stopDeathTimer(runtime) {
    try {
        runtime.npc.timers.stop(runtimeModule.ARCEUS_DEATH_TIMER_ID);
    } catch (e) {}
}

function prepareNpcForDeathCommit(npc) {
    try {
        npc.getMCEntity().removeEffect(DeathFlow_MobEffects.REGENERATION);
    } catch (e) {}
    try {
        npc.getMCEntity().setInvulnerable(false);
    } catch (e2) {}
    visuals.clearEntityDamageVisuals(npc);
}

function forceDeathSafeHealthFloorLive(runtime) {
    var floor = phases.getArceusDeathThresholdHp(damage.readNpcMaxHealth(runtime.npc), runtime.config);
    if (damage.readNpcHealth(runtime.npc) < floor) {
        damage.setNpcHealthSafe(runtime.npc, floor);
    }
}

function spawnDeathExplosion(runtime) {
    try {
        runtime.npc.getWorld().explode(
            runtime.npc.getX(),
            runtime.npc.getY() + 1.0,
            runtime.npc.getZ(),
            utils.parseFloatSafe(runtime.config.deathExplosionPower, 3.5),
            false,
            false
        );
        return;
    } catch (e) {}
    try {
        runtime.npc.getWorld().spawnParticle("minecraft:explosion", runtime.npc.getX(), runtime.npc.getY() + 1.0, runtime.npc.getZ(), 0.6, 0.6, 0.6, 0.01, 20);
    } catch (e2) {}
}

function moveNpcBelowArena(npc) {
    var x = npc.getX();
    var y = npc.getY() - 10;
    var z = npc.getZ();
    try {
        npc.setPosition(x, y, z);
        return;
    } catch (e) {}
    try {
        npc.setPos(x, y, z);
        return;
    } catch (e2) {}
    try {
        npc.getMCEntity().setPos(x, y, z);
    } catch (e3) {}
}

function damageNpcWithCommand(npc) {
    var typeId = getNpcEntityTypeId(npc);
    if (!utils.hasText(typeId)) return false;

    var selector = "@e[type=" + typeId + ",distance=..0.25,limit=1,sort=nearest]";
    var command = "execute positioned " + formatCoord(npc.getX()) + " " + formatCoord(npc.getY()) + " " + formatCoord(npc.getZ())
        + " run damage " + selector + " 1000000 minecraft:generic_kill";

    if (!runServerCommand(npc, command)) return false;
    return isNpcActuallyDead(npc);
}

function getNpcEntityTypeId(npc) {
    try {
        return "" + DeathFlow_BuiltInRegistries.ENTITY_TYPE.getKey(npc.getMCEntity().getType());
    } catch (e) {
        return "";
    }
}

function formatCoord(value) {
    return "" + (Math.round(value * 1000) / 1000);
}

function runServerCommand(npc, command) {
    try {
        var server = npc.getMCEntity().level().getServer();
        var source = server.createCommandSourceStack().withPermission(4);
        server.getCommands().performPrefixedCommand(source, stripLeadingSlash(command));
        return true;
    } catch (e) {
        return false;
    }
}

function stripLeadingSlash(command) {
    var text = utils.trimString(command);
    return text.indexOf("/") === 0 ? text.substring(1) : text;
}

function isNpcActuallyDead(npc) {
    try {
        if (!npc.getMCEntity().isAlive()) return true;
    } catch (e) {}
    try {
        if (npc.getHealth() <= 0) return true;
    } catch (e2) {}
    return false;
}

function pickRewardSpeciesForPlace(placeIndex) {
    var roll = Math.random() * 100;
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
    for (var i = 0; i < 6; i++) values.push("" + randomIntInclusive(min, max));
    return values.join("/");
}

function randomIntInclusive(min, max) {
    var low = Math.floor(Math.min(min, max));
    var high = Math.floor(Math.max(min, max));
    return low + Math.floor(Math.random() * (high - low + 1));
}

function giveRewardPokemon(player, speciesId, ivString) {
    if (player == null) return { ok: false, reason: "reward player missing" };
    if (speciesId == null || speciesId == "") return { ok: false, reason: "reward species missing" };
    var reward = createRewardPokemonEntity(speciesId, ivString);
    if (!reward.ok) return reward;
    return addRewardPokemonToParty(player, reward.pokemon, speciesId);
}

function createRewardPokemonEntity(speciesId, ivString) {
    var props = parsePokemonProperties(speciesId);
    if (props == null || !utils.hasText("" + props.getSpecies())) return { ok: false, reason: "pokemon creation failed: parse properties", species: speciesId };
    try {
        props.setLevel(randomIntInclusive(10, 20));
        props.setShiny(Math.random() < 0.10);
    } catch (e0) {
        return { ok: false, reason: "pokemon creation failed: set level/shiny", species: speciesId };
    }
    try {
        props.setIvs(buildStatsBlock(new Reward_IVs(), ivString, 0, 31));
    } catch (e) {
        return { ok: false, reason: "pokemon creation failed: set ivs", species: speciesId };
    }
    var pokemon;
    try {
        pokemon = props.create();
    } catch (e2) {
        return { ok: false, reason: "pokemon creation failed: create()", species: speciesId };
    }
    if (pokemon == null) return { ok: false, reason: "pokemon creation failed: null pokemon", species: speciesId };
    return { ok: true, pokemon: pokemon, species: speciesId };
}

function buildStatsBlock(statsObject, rawValue, min, max) {
    var parts = ("" + rawValue).split("/");
    for (var i = 0; i < REWARD_STAT_ORDER.length; i++) {
        if (i >= parts.length) break;
        var token = utils.trimString(parts[i]);
        if (token.length == 0) continue;
        var value = clamp(utils.parseIntSafe(token, min), min, max);
        statsObject.set(REWARD_STAT_ORDER[i], value);
    }
    return statsObject;
}

function clamp(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}

function parsePokemonProperties(speciesId) {
    try {
        return Reward_PokemonProperties.Companion.parse(speciesId);
    } catch (e) {
        return null;
    }
}

function addRewardPokemonToParty(player, pokemon, speciesId) {
    var party = getRewardPlayerParty(player);
    if (party == null || pokemon == null) return { ok: false, reason: "party add failed", species: speciesId };
    try {
        if (party.add(pokemon)) return { ok: true, species: speciesId };
        return { ok: false, reason: "party add failed", species: speciesId };
    } catch (e) {
        return { ok: false, reason: "party add failed", species: speciesId };
    }
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

function pickRandomSpecies(pool) {
    if (pool == null || pool.length <= 0) return null;
    var index = Math.floor(Math.random() * pool.length);
    if (index < 0) index = 0;
    if (index >= pool.length) index = pool.length - 1;
    return pool[index];
}

function ensureRewardPoolsLoaded() {
    if (LEGENDARY_REWARD_POOL != null && LEGENDARY_REWARD_POOL.length > 0
        && MYTHICAL_REWARD_POOL != null && MYTHICAL_REWARD_POOL.length > 0
        && SUPER_RARE_REWARD_POOL != null && SUPER_RARE_REWARD_POOL.length > 0
        && NORMAL_REWARD_POOL != null && NORMAL_REWARD_POOL.length > 0) {
        return;
    }
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

function warmRewardPools() {
    if (REWARD_POOLS_ATTEMPTED) return;
    ensureRewardPoolsLoaded();
}

function loadRewardPoolsFromCobblemonJar() {
    var zip = null;
    try {
        var jarFile = resolveCobblemonJarFile();
        if (jarFile == null || !jarFile.exists() || !jarFile.isFile()) return false;
        zip = new Reward_ZipFile(jarFile);
        var entries = zip.entries();
        var legendarySet = {};
        var mythicalSet = {};
        var superRareSet = {};
        var normalSet = {};
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
        return LEGENDARY_REWARD_POOL.length > 0
            && MYTHICAL_REWARD_POOL.length > 0
            && SUPER_RARE_REWARD_POOL.length > 0
            && NORMAL_REWARD_POOL.length > 0;
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
        if (normalizedPath != null && normalizedPath != "") return new Reward_File(normalizedPath);
    } catch (e2) {}
    try {
        var external = "" + Reward_PokemonProperties.class.getProtectionDomain().getCodeSource().getLocation().toExternalForm();
        var normalized = normalizeJarLocationToPath(external);
        if (normalized != null && normalized != "") return new Reward_File(normalized);
    } catch (e3) {}
    return null;
}

function normalizeJarLocationToPath(location) {
    var text = utils.trimString(location);
    if (text.length <= 0) return null;
    var bang = text.indexOf("!/");
    if (bang >= 0) text = text.substring(0, bang);
    if (text.charAt(text.length - 1) == "!") text = text.substring(0, text.length - 1);
    while (startsWithIgnoreCase(text, "jar:") || startsWithIgnoreCase(text, "union:")) {
        var idx = text.indexOf(":");
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
    var hashSuffix = text.lastIndexOf("#");
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
        if (species.length <= 0 || bucket.length <= 0) continue;
        if (bucket == "ultra-rare") {
            superRareSet[species] = true;
        } else if (bucket == "common" || bucket == "uncommon" || bucket == "rare") {
            normalSet[species] = true;
        }
    }
}

function collectSpecialSpecies(text, legendarySet, mythicalSet) {
    var nameMatch = /"name"\s*:\s*"([^"]+)"/.exec(text);
    if (nameMatch == null || nameMatch.length < 2) return;
    var labelsMatch = /"labels"\s*:\s*\[([\s\S]*?)\]/.exec(text);
    if (labelsMatch == null || labelsMatch.length < 2) return;
    var labelsText = labelsMatch[1];
    var species = utils.trimString(nameMatch[1]).toLowerCase();
    if (species.length <= 0) return;
    if (labelsText.indexOf("\"mythical\"") >= 0) mythicalSet[species] = true;
    else if (labelsText.indexOf("\"legendary\"") >= 0) legendarySet[species] = true;
}

function extractBucketSpeciesId(raw) {
    var token = utils.trimString(raw).split(" ")[0];
    token = utils.trimString(token);
    if (token.length <= 0) return "";
    return token;
}

function setKeysToPrefixedArray(setMap, excludeMap1, excludeMap2, excludeMap3) {
    var out = [];
    for (var key in setMap) {
        if (!setMap.hasOwnProperty(key)) continue;
        if (excludeMap1 != null && excludeMap1[key]) continue;
        if (excludeMap2 != null && excludeMap2[key]) continue;
        if (excludeMap3 != null && excludeMap3[key]) continue;
        out.push("cobblemon:" + key);
    }
    out.sort();
    return out;
}

module.exports = {
    requestStart: requestStart,
    tickDeathPath: tickDeathPath,
    distributeFrozenSnapshotRewards: distributeFrozenSnapshotRewards,
    grantRankReward: grantRankReward,
    restartDeathTimer: restartDeathTimer,
    stopBossTimer: stopBossTimer,
    stopDeathTimer: stopDeathTimer,
    handleCommittedDeath: handleCommittedDeath,
    isNpcActuallyDead: isNpcActuallyDead,
    giveRewardPokemon: giveRewardPokemon,
    createRewardPokemonEntity: createRewardPokemonEntity,
    addRewardPokemonToParty: addRewardPokemonToParty
};
