// @ts-check

var rewards = require("rewards.js");
var utils = require("utils.js");
var visuals = require("visuals.js");

/**
 * @typedef {import("./config.js").ArceusConfig} ArceusConfig
 * @typedef {import("./state.js").ArceusState} ArceusState
 * @typedef {import("./state.js").DamageEntry} DamageEntry
 */

/**
 * @param {any} npc
 * @param {ArceusState} state
 * @param {ArceusConfig} config
 */
function tickDeath(npc, state, config) {
    if (state.mode == "custom_death_start") {
        tickCustomDeathStart(npc, state, config);
    }

    if (state.mode == "death_commit_pending") {
        commitDeath(npc, state, config);
    }
}

/**
 * @param {any} npc
 * @param {ArceusState} state
 * @param {ArceusConfig} config
 */
function tickCustomDeathStart(npc, state, config) {
    state.customDeathTicksLeft -= readTimerTicks(config);
    spinNpc(npc, readDeathNumber(config, "spinStep", 12));
    spawnDeathPulse(npc, config);

    if (state.customDeathTicksLeft <= 0) {
        state.customDeathTicksLeft = 0;
        state.mode = "death_commit_pending";
    }
}

/**
 * @param {any} npc
 * @param {ArceusState} state
 * @param {ArceusConfig} config
 */
function commitDeath(npc, state, config) {
    if (state.rewardsGiven !== true) {
        distributeFinalRewards(npc, state);
        state.rewardsGiven = true;
    }

    playSoundForAllPlayers(npc, readMediaString(config, "deathSound", "cobblemon:pokemon.arceus.cry"));
    moveNpcBelowMap(npc);
    killNpcSafely(npc);
    state.mode = "death_committed";
}

/**
 * @param {any} npc
 * @param {ArceusState} state
 */
function distributeFinalRewards(npc, state) {
    var snapshot = cloneSnapshot(state.liveSnapshot);
    var players = getOnlinePlayers(npc);
    var i;
    var player;

    rewards.warmUpPools();
    if (snapshot.length > 0) {
        visuals.broadcast(npc, "§6Топ по урону по Аркеусу:");
    }
    for (i = 0; i < snapshot.length; i++) {
        visuals.broadcast(npc, "§e#" + (i + 1) + " §f" + snapshot[i].name + " §7- §c" + formatDamage(snapshot[i].damage));
        player = resolveRewardPlayer(npc, snapshot[i], players);
        if (player != null) rewards.giveRankReward(player, i);
    }
}

/**
 * @param {DamageEntry[]} snapshot
 * @returns {DamageEntry[]}
 */
function cloneSnapshot(snapshot) {
    var out = [];
    var i;
    if (snapshot == null) return out;
    for (i = 0; i < snapshot.length; i++) {
        out.push({
            uuid: snapshot[i].uuid,
            name: snapshot[i].name,
            damage: snapshot[i].damage
        });
    }
    out.sort(function(a, b) {
        return b.damage - a.damage;
    });
    return out;
}

function formatDamage(value) {
    var rounded = Math.floor(Number(value) * 10 + 0.5) / 10;
    if (isNaN(rounded)) rounded = 0;
    if (rounded == Math.floor(rounded)) return "" + Math.floor(rounded);
    return "" + rounded;
}

function spinNpc(npc, step) {
    var rotation;
    try {
        rotation = npc.getRotation() + step;
        while (rotation >= 360) rotation -= 360;
        while (rotation < 0) rotation += 360;
        npc.setRotation(rotation);
    } catch (e) {}
}

function spawnDeathPulse(npc, config) {
    try {
        npc.getWorld().spawnParticle("minecraft:explosion", npc.getX(), npc.getY() + 1.0, npc.getZ(), 0.6, 0.6, 0.6, 0.01, 6);
        return;
    } catch (e) {}
    try {
        npc.getWorld().explode(
            npc.getX(),
            npc.getY() + 1.0,
            npc.getZ(),
            readDeathNumber(config, "explosionPower", 3.5),
            false,
            false
        );
    } catch (e2) {}
}

function playSoundForAllPlayers(npc, soundId) {
    var players;
    var i;
    if (!utils.hasText(soundId)) return;
    try {
        players = npc.getWorld().getAllPlayers();
        if (players == null) return;
        for (i = 0; i < players.length; i++) {
            players[i].playSound(soundId, 1.2, 1.0);
        }
    } catch (e) {}
}

function moveNpcBelowMap(npc) {
    var x = 0;
    var y = 0;
    var z = 0;
    try {
        x = npc.getX();
        y = npc.getY() - 10;
        z = npc.getZ();
    } catch (readError) {
        return;
    }
    try {
        npc.setPosition(x, y, z);
        return;
    } catch (e) {}
    try {
        npc.getMCEntity().setPos(x, y, z);
    } catch (e2) {}
}

function killNpcSafely(npc) {
    try {
        npc.getMCEntity().setInvulnerable(false);
    } catch (e) {}
    try {
        npc.setHealth(0);
    } catch (e2) {}
    try {
        npc.kill();
    } catch (e3) {}
    try {
        if (npc.getMCEntity().kill != null) npc.getMCEntity().kill();
    } catch (e4) {}
}

function getOnlinePlayers(npc) {
    try {
        return npc.getWorld().getAllPlayers();
    } catch (e) {
        return null;
    }
}

function resolveRewardPlayer(npc, entry, players) {
    var i;
    if (entry == null) return null;

    if (players != null) {
        for (i = 0; i < players.length; i++) {
            if (samePlayerUuid(players[i], entry.uuid)) return players[i];
        }
        for (i = 0; i < players.length; i++) {
            if (samePlayerName(players[i], entry.name)) return players[i];
        }
    }

    try {
        return npc.getWorld().getPlayer(entry.name);
    } catch (e) {
        return null;
    }
}

function samePlayerUuid(player, uuid) {
    if (player == null || !utils.hasText(uuid)) return false;
    try {
        return ("" + player.getUUID()) == ("" + uuid);
    } catch (e) {}
    try {
        return ("" + player.getMCEntity().getUUID()) == ("" + uuid);
    } catch (e2) {}
    return false;
}

function samePlayerName(player, name) {
    if (player == null || !utils.hasText(name)) return false;
    try {
        if (("" + player.getName()) == ("" + name)) return true;
    } catch (e) {}
    try {
        if (("" + player.getDisplayName()) == ("" + name)) return true;
    } catch (e2) {}
    return false;
}

function readTimerTicks(config) {
    try {
        return Math.max(1, utils.parseIntSafe(config.general.timerTicks, 5));
    } catch (e) {
        return 5;
    }
}

function readDeathNumber(config, key, fallback) {
    try {
        return utils.parseFloatSafe(config.death[key], fallback);
    } catch (e) {
        return fallback;
    }
}

function readMediaString(config, key, fallback) {
    try {
        return utils.hasText(config.media[key]) ? "" + config.media[key] : fallback;
    } catch (e) {
        return fallback;
    }
}

module.exports = {
    tickDeath: tickDeath
};
