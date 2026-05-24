// @ts-check

var utils = require("utils.js");

/**
 * @param {string} colorName
 * @returns {number}
 */
function getBossBarColorId(colorName) {
    if (colorName == "yellow") return 4;
    if (colorName == "red") return 2;
    return 0;
}

/**
 * @param {any} npc
 * @param {string} colorName
 */
function setBossBarColor(npc, colorName) {
    var colorId = getBossBarColorId(colorName);

    try {
        if (npc.getDisplay && npc.getDisplay() && npc.getDisplay().setBossbar) {
            npc.getDisplay().setBossbar(1);
        }
    } catch (e) {}
    try {
        if (npc.display && npc.display.setBossbar) npc.display.setBossbar(1);
    } catch (e1) {}

    try {
        if (npc.getDisplay && npc.getDisplay() && npc.getDisplay().setBossColor) {
            npc.getDisplay().setBossColor(colorId);
            return;
        }
    } catch (e2) {}
    try {
        if (npc.display && npc.display.setBossColor) npc.display.setBossColor(colorId);
    } catch (e3) {}
}

/**
 * @param {any} npc
 * @param {string} title
 */
function setTitle(npc, title) {
    if (!utils.hasText(title)) return;
    try {
        if (npc.getDisplay && npc.getDisplay() && npc.getDisplay().setTitle) {
            npc.getDisplay().setTitle(title);
        }
    } catch (e) {}
}

/**
 * @param {any} npc
 * @param {string} message
 */
function say(npc, message) {
    if (!utils.hasText(message)) return;
    try {
        npc.say(message);
    } catch (e) {
        broadcast(npc, message);
    }
}

/**
 * @param {any} npc
 * @param {string} message
 */
function broadcast(npc, message) {
    var players;
    var i;

    if (!utils.hasText(message)) return;
    try {
        players = npc.getWorld().getAllPlayers();
        if (players == null) return;
        for (i = 0; i < getCollectionSize(players); i++) {
            if (getCollectionValue(players, i) != null) getCollectionValue(players, i).message(message);
        }
    } catch (e) {}
}

/**
 * @param {any} npc
 * @param {string} soundId
 */
function playSound(npc, soundId) {
    var players;
    var i;

    if (!utils.hasText(soundId)) return;
    try {
        players = npc.getWorld().getAllPlayers();
        if (players == null) return;
        for (i = 0; i < getCollectionSize(players); i++) {
            if (getCollectionValue(players, i) != null) getCollectionValue(players, i).playSound(soundId, 1.2, 1.0);
        }
    } catch (e) {}
}

/**
 * @param {any} npc
 */
function spawnPhaseBurst(npc) {
    var world;
    var x;
    var y;
    var z;

    try {
        world = npc.getWorld();
    } catch (e) {
        world = null;
    }
    if (world == null) return;

    x = npc.getX();
    y = npc.getY() + 1.2;
    z = npc.getZ();

    try {
        world.spawnParticle("minecraft:gust", x, y, z, 1.2, 0.7, 1.2, 0.02, 36);
    } catch (e1) {}
    try {
        world.spawnParticle("minecraft:cloud", x, y, z, 1.4, 0.5, 1.4, 0.03, 48);
    } catch (e2) {}
    try {
        world.spawnParticle("minecraft:poof", x, y, z, 1.0, 0.5, 1.0, 0.02, 24);
    } catch (e3) {}

    playSound(npc, "minecraft:entity.wind_charge.wind_burst");
}

/**
 * @param {any} npc
 * @param {number} radius
 * @param {number} push
 * @param {number} vertical
 */
function launchNearbyPlayers(npc, radius, push, vertical) {
    var players;
    var radiusSq;
    var i;
    var player;
    var dx;
    var dz;

    if (radius <= 0 || push <= 0) return;
    try {
        players = npc.getWorld().getAllPlayers();
    } catch (e) {
        players = null;
    }
    if (players == null) return;

    radiusSq = radius * radius;
    for (i = 0; i < getCollectionSize(players); i++) {
        player = getCollectionValue(players, i);
        if (player == null) continue;
        dx = player.getX() - npc.getX();
        dz = player.getZ() - npc.getZ();
        if (dx * dx + dz * dz > radiusSq) continue;
        launchPlayerFromNpc(npc, player, push, vertical);
    }
}

/**
 * @param {any} collection
 * @returns {number}
 */
function getCollectionSize(collection) {
    if (collection == null) return 0;
    try {
        if (typeof collection.length == "number") return collection.length;
    } catch (e) {}
    try {
        if (collection.size != null) return Number(collection.size());
    } catch (e2) {}
    return 0;
}

/**
 * @param {any} collection
 * @param {number} index
 * @returns {any}
 */
function getCollectionValue(collection, index) {
    try {
        if (typeof collection.length == "number") return collection[index];
    } catch (e) {}
    try {
        if (collection.get != null) return collection.get(index);
    } catch (e2) {}
    return null;
}

/**
 * @param {any} npc
 * @param {any} player
 * @param {number} push
 * @param {number} vertical
 */
function launchPlayerFromNpc(npc, player, push, vertical) {
    var dx = player.getX() - npc.getX();
    var dz = player.getZ() - npc.getZ();
    var dist = Math.sqrt(dx * dx + dz * dz);
    var mx;
    var my;
    var mz;
    var mcPlayer;

    if (dist < 0.001) {
        dx = 0;
        dz = 1;
        dist = 1;
    }

    mx = dx / dist * push;
    my = vertical <= 0 ? 0.6 : vertical;
    mz = dz / dist * push;

    try {
        mcPlayer = player.getMCEntity();
        mcPlayer.push(mx, my, mz);
        try {
            mcPlayer.hurtMarked = true;
        } catch (markError) {}
        return;
    } catch (e) {}
    try {
        player.setMotionX(mx);
        player.setMotionY(my);
        player.setMotionZ(mz);
        return;
    } catch (e2) {}
    try {
        player.knockback(push, -dx / dist, -dz / dist);
    } catch (e3) {}
}

module.exports = {
    setBossBarColor: setBossBarColor,
    setTitle: setTitle,
    say: say,
    broadcast: broadcast,
    playSound: playSound,
    spawnPhaseBurst: spawnPhaseBurst,
    launchNearbyPlayers: launchNearbyPlayers
};
