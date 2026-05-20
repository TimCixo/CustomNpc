// @ts-check

var phases = require("phases.js");

/**
 * @typedef {import("./config.js").ArceusConfig} ArceusConfig
 * @typedef {import("./state.js").ArceusState} ArceusState
 * @typedef {import("./state.js").DamageEntry} DamageEntry
 */

/**
 * @param {any} event
 */
function cancelEvent(event) {
    try {
        event.setCanceled(true);
    } catch (e) {}
}

/**
 * @param {any} event
 * @returns {number}
 */
function readDamage(event) {
    try {
        return Number(event.getDamage());
    } catch (e) {}
    try {
        return Number(event.damage);
    } catch (e2) {}
    return 0;
}

/**
 * @param {any} npc
 * @returns {number}
 */
function readHealth(npc) {
    try {
        return Number(npc.getHealth());
    } catch (e) {}
    try {
        return Number(npc.getMCEntity().getHealth());
    } catch (e2) {}
    return 0;
}

/**
 * @param {any} npc
 * @returns {number}
 */
function readMaxHealth(npc) {
    try {
        return Number(npc.getMaxHealth());
    } catch (e) {}
    try {
        return Number(npc.getMCEntity().getMaxHealth());
    } catch (e2) {}
    return 1;
}

/**
 * @param {any} event
 * @returns {any}
 */
function resolveAttacker(event) {
    var attacker = null;

    try {
        if (event.source != null) attacker = event.source;
    } catch (e) {}

    if (attacker == null) {
        try {
            if (event.damageSource != null && event.damageSource.getEntity != null) {
                attacker = event.damageSource.getEntity();
            }
        } catch (e2) {}
    }

    if (attacker == null) {
        try {
            if (event.damageSource != null && event.damageSource.getDirectEntity != null) {
                attacker = event.damageSource.getDirectEntity();
            }
        } catch (e3) {}
    }

    return unwrapProjectileOwner(attacker);
}

/**
 * @param {any} attacker
 * @returns {any}
 */
function unwrapProjectileOwner(attacker) {
    var owner = null;
    if (attacker == null) return null;

    try {
        if (attacker.getOwner != null) owner = attacker.getOwner();
    } catch (e) {}
    if (owner != null) return owner;

    try {
        if (attacker.owner != null) owner = attacker.owner;
    } catch (e2) {}
    if (owner != null) return owner;

    try {
        if (attacker.getMCEntity != null) {
            var mcEntity = attacker.getMCEntity();
            if (mcEntity != null && mcEntity.getOwner != null) owner = mcEntity.getOwner();
        }
    } catch (e3) {}

    return owner == null ? attacker : owner;
}

/**
 * @param {any} entity
 * @returns {string}
 */
function readUuid(entity) {
    if (entity == null) return "";
    try {
        return "" + entity.getUUID();
    } catch (e) {}
    try {
        return "" + entity.getUniqueID();
    } catch (e2) {}
    try {
        return "" + entity.getMCEntity().getUUID();
    } catch (e3) {}
    return "";
}

/**
 * @param {any} entity
 * @returns {string}
 */
function readName(entity) {
    if (entity == null) return "";
    try {
        return "" + entity.getName();
    } catch (e) {}
    try {
        return "" + entity.getDisplayName();
    } catch (e2) {}
    try {
        return "" + entity.getMCEntity().getName().getString();
    } catch (e3) {}
    return readUuid(entity);
}

/**
 * @param {Object.<string, DamageEntry>} damageMap
 * @returns {DamageEntry[]}
 */
function buildLiveSnapshot(damageMap) {
    var snapshot = [];
    var key;
    var entry;

    for (key in damageMap) {
        if (!Object.prototype.hasOwnProperty.call(damageMap, key)) continue;
        entry = damageMap[key];
        if (entry == null || entry.damage <= 0) continue;
        snapshot.push({
            uuid: entry.uuid,
            name: entry.name,
            damage: entry.damage
        });
    }

    snapshot.sort(function(a, b) {
        return b.damage - a.damage;
    });

    return snapshot;
}

/**
 * @param {ArceusState} state
 * @param {any} attacker
 * @param {number} damage
 */
function recordDamage(state, attacker, damage) {
    var uuid = readUuid(attacker);
    var name;
    var entry;

    if (uuid == "" || damage <= 0) return;

    name = readName(attacker);
    entry = state.damageMap[uuid];
    if (entry == null) {
        entry = {
            uuid: uuid,
            name: name,
            damage: 0
        };
        state.damageMap[uuid] = entry;
    }

    entry.name = name;
    entry.damage += damage;
    state.liveSnapshot = buildLiveSnapshot(state.damageMap);
}

/**
 * @param {any} event
 * @param {ArceusState} state
 * @param {ArceusConfig} config
 */
function handleDamaged(event, state, config) {
    var currentHealth;
    var maxHealth;
    var damage;
    var nextHealth;
    var phase2Threshold;
    var phase3Threshold;
    var attacker;

    if (state.mode != "live") {
        cancelEvent(event);
        return;
    }

    currentHealth = readHealth(event.npc);
    maxHealth = readMaxHealth(event.npc);
    damage = readDamage(event);
    nextHealth = currentHealth - damage;
    phase2Threshold = maxHealth * config.phases.phase2Threshold;
    phase3Threshold = maxHealth * config.phases.phase3Threshold;

    if (state.phase == 1 && nextHealth <= phase2Threshold) {
        cancelEvent(event);
        phases.enterPhase(event.npc, state, config, 2);
    } else if (state.phase == 2 && nextHealth <= phase3Threshold) {
        cancelEvent(event);
        phases.enterPhase(event.npc, state, config, 3);
    }

    attacker = resolveAttacker(event);
    recordDamage(state, attacker, damage);
}

module.exports = {
    handleDamaged: handleDamaged,
    readDamage: readDamage
};
