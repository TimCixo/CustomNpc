// @ts-check

var phases = require("phases.js");
var rewards = require("rewards.js");

var Combat_System = Java.type("java.lang.System");
var Combat_MobEffectInstance = Java.type("net.minecraft.world.effect.MobEffectInstance");
var Combat_MobEffects = Java.type("net.minecraft.world.effect.MobEffects");

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
    var value;
    try {
        value = Number(event.getDamage());
        return isNaN(value) ? 0 : value;
    } catch (e) {}
    try {
        value = Number(event.damage);
        return isNaN(value) ? 0 : value;
    } catch (e2) {}
    return 0;
}

/**
 * @param {any} npc
 * @returns {number}
 */
function readHealth(npc) {
    var value;
    try {
        value = Number(npc.getHealth());
        return isNaN(value) ? 0 : value;
    } catch (e) {}
    try {
        value = Number(npc.getMCEntity().getHealth());
        return isNaN(value) ? 0 : value;
    } catch (e2) {}
    return 0;
}

/**
 * @param {any} npc
 * @returns {number}
 */
function readMaxHealth(npc) {
    var value;
    try {
        value = Number(npc.getMaxHealth());
        return isNaN(value) || value <= 0 ? 1 : value;
    } catch (e) {}
    try {
        value = Number(npc.getMCEntity().getMaxHealth());
        return isNaN(value) || value <= 0 ? 1 : value;
    } catch (e2) {}
    return 1;
}

/**
 * @param {any} npc
 * @param {number} health
 */
function setHealthSafe(npc, health) {
    var value = Math.max(1, health);
    try {
        npc.setHealth(value);
        return;
    } catch (e) {}
    try {
        npc.getMCEntity().setHealth(value);
    } catch (e2) {}
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
    var value;
    var mcEntity;

    if (entity == null) return "";
    try {
        value = entity.getUUID();
        if (value != null && ("" + value) != "") return "" + value;
    } catch (e) {}
    try {
        value = entity.getUniqueID();
        if (value != null && ("" + value) != "") return "" + value;
    } catch (e2) {}
    try {
        mcEntity = entity.getMCEntity();
        if (mcEntity != null) {
            value = mcEntity.getUUID();
            if (value != null && ("" + value) != "") return "" + value;
        }
    } catch (e3) {}
    return "";
}

/**
 * @param {any} entity
 * @returns {string}
 */
function readName(entity) {
    var value;
    var mcEntity;

    if (entity == null) return "";
    try {
        value = entity.getName();
        if (value != null && ("" + value) != "") return "" + value;
    } catch (e) {}
    try {
        value = entity.getDisplayName();
        if (value != null && ("" + value) != "") return "" + value;
    } catch (e2) {}
    try {
        mcEntity = entity.getMCEntity();
        if (mcEntity != null && mcEntity.getName != null) {
            value = mcEntity.getName();
            if (value != null && value.getString != null) value = value.getString();
            if (value != null && ("" + value) != "") return "" + value;
        }
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
    appendRecentHit(state, uuid, name, damage);
}

/**
 * @param {ArceusState} state
 * @param {string} uuid
 * @param {string} name
 * @param {number} damage
 */
function appendRecentHit(state, uuid, name, damage) {
    var list;

    if (state.recentHits == null) state.recentHits = {};
    if (state.recentHits[uuid] == null) state.recentHits[uuid] = [];

    list = state.recentHits[uuid];
    list.push({
        time: Combat_System.currentTimeMillis(),
        damage: damage,
        name: name
    });

    if (list.length > 20) list.splice(0, list.length - 20);
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
    var deathThreshold;
    var drops;
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
    deathThreshold = getDeathThreshold(config, maxHealth);

    attacker = resolveAttacker(event);
    recordDamage(state, attacker, damage);

    if (state.phase >= 3 && nextHealth <= deathThreshold) {
        cancelEvent(event);
        state.mode = "custom_death_start";
        state.customDeathTicksLeft = readDeathInt(config, "customTicks", 80);
        setHealthSafe(event.npc, deathThreshold);
        phases.setInvulnerableSafe(event.npc, true);
        drops = rewards.getStageDropCountForHit(state, config, 3, currentHealth, deathThreshold, maxHealth);
        if (drops > 0) {
            rewards.dropRandomGems(event.npc, drops, config);
        }
        return;
    }

    if (state.phase == 1 && nextHealth <= phase2Threshold) {
        cancelEvent(event);
        phases.enterPhase(event.npc, state, config, 2);
        return;
    } else if (state.phase == 2 && nextHealth <= phase3Threshold) {
        cancelEvent(event);
        drops = rewards.getStageDropCountForHit(state, config, 2, currentHealth, nextHealth, maxHealth);
        if (drops > 0) {
            rewards.dropConfiguredItem(event.npc, readRewardString(config, "phase2Item", "cobblemon:rare_candy"), drops, config);
        }
        phases.enterPhase(event.npc, state, config, 3);
        return;
    }

    drops = rewards.getStageDropCountForHit(state, config, state.phase, currentHealth, nextHealth, maxHealth);
    if (drops > 0 && state.phase == 2) {
        rewards.dropConfiguredItem(event.npc, readRewardString(config, "phase2Item", "cobblemon:rare_candy"), drops, config);
    } else if (drops > 0 && state.phase >= 3) {
        rewards.dropRandomGems(event.npc, drops, config);
    }
}

/**
 * @param {ArceusConfig} config
 * @param {number} maxHealth
 * @returns {number}
 */
function getDeathThreshold(config, maxHealth) {
    var percent = readDeathNumber(config, "thresholdPercent", 0.02);
    var minHp = readDeathNumber(config, "thresholdMinHp", 20);
    var threshold = maxHealth * percent;
    if (threshold < minHp) threshold = minHp;
    return threshold < 1 ? 1 : threshold;
}

function readDeathNumber(config, key, fallback) {
    try {
        return Number(config.death[key]) || fallback;
    } catch (e) {
        return fallback;
    }
}

function readDeathInt(config, key, fallback) {
    return Math.max(1, Math.floor(readDeathNumber(config, key, fallback)));
}

function readRewardString(config, key, fallback) {
    try {
        return config.rewards[key] == null || config.rewards[key] == "" ? fallback : "" + config.rewards[key];
    } catch (e) {
        return fallback;
    }
}

/**
 * @param {any} npc
 * @param {ArceusState} state
 * @param {ArceusConfig} config
 */
function tickCombat(npc, state, config) {
    if (state.mode != "live") return;

    tickRegen(npc, state, config);
    tickRecentAggro(npc, state, config);
}

/**
 * @param {any} npc
 * @param {ArceusState} state
 * @param {ArceusConfig} config
 */
function tickRegen(npc, state, config) {
    var interval;
    var duration;
    var amplifier;

    if (state.phase < 2) return;

    interval = readPhaseInt(config, "regenInterval", 40);
    state.pulseTicks += readGeneralInt(config, "timerTicks", 5);
    if (state.pulseTicks < interval) return;

    state.pulseTicks = 0;
    duration = readPhaseInt(config, "regenDuration", 60);
    amplifier = readPhaseInt(config, "regenAmplifier", 2);
    applyRegeneration(npc, duration, amplifier);
}

/**
 * @param {any} npc
 * @param {number} duration
 * @param {number} amplifier
 */
function applyRegeneration(npc, duration, amplifier) {
    try {
        npc.getMCEntity().addEffect(new Combat_MobEffectInstance(Combat_MobEffects.REGENERATION, duration, amplifier));
    } catch (e) {}
}

/**
 * @param {any} npc
 * @param {ArceusState} state
 * @param {ArceusConfig} config
 */
function tickRecentAggro(npc, state, config) {
    var winner = findRecentAggroWinner(state, readCombatInt(config, "aggroRecentMs", 3500));
    var player;

    if (winner == null) return;
    player = resolvePlayer(npc, winner.uuid, winner.name);
    if (player == null) return;
    setAttackTargetSafe(npc, player);
}

/**
 * @param {ArceusState} state
 * @param {number} windowMs
 * @returns {any}
 */
function findRecentAggroWinner(state, windowMs) {
    var now = Combat_System.currentTimeMillis();
    var best = null;
    var key;
    var list;
    var total;
    var name;
    var i;
    var hit;

    if (state.recentHits == null) return null;

    for (key in state.recentHits) {
        if (!Object.prototype.hasOwnProperty.call(state.recentHits, key)) continue;
        list = state.recentHits[key];
        if (list == null || list.length <= 0) continue;

        total = 0;
        name = key;
        for (i = list.length - 1; i >= 0; i--) {
            hit = list[i];
            if (hit == null || now - hit.time > windowMs) {
                list.splice(i, 1);
                continue;
            }
            total += hit.damage;
            if (hit.name != null && hit.name != "") name = hit.name;
        }

        if (total <= 0) continue;
        if (best == null || total > best.damage) {
            best = { uuid: key, name: name, damage: total };
        }
    }

    return best;
}

/**
 * @param {any} npc
 * @param {string} uuid
 * @param {string} name
 * @returns {any}
 */
function resolvePlayer(npc, uuid, name) {
    var players = getOnlinePlayers(npc);
    var i;
    var player;

    if (players != null) {
        for (i = 0; i < players.length; i++) {
            player = players[i];
            if (samePlayerUuid(player, uuid)) return player;
        }
        for (i = 0; i < players.length; i++) {
            player = players[i];
            if (samePlayerName(player, name)) return player;
        }
    }

    try {
        return npc.getWorld().getPlayer(name);
    } catch (e) {
        return null;
    }
}

function getOnlinePlayers(npc) {
    try {
        return npc.getWorld().getAllPlayers();
    } catch (e) {
        return null;
    }
}

function samePlayerUuid(player, uuid) {
    if (player == null || uuid == null || uuid == "") return false;
    try {
        if (("" + player.getUUID()) == ("" + uuid)) return true;
    } catch (e) {}
    try {
        if (("" + player.getMCEntity().getUUID()) == ("" + uuid)) return true;
    } catch (e2) {}
    return false;
}

function samePlayerName(player, name) {
    if (player == null || name == null || name == "") return false;
    try {
        if (("" + player.getName()) == ("" + name)) return true;
    } catch (e) {}
    try {
        if (("" + player.getDisplayName()) == ("" + name)) return true;
    } catch (e2) {}
    return false;
}

function setAttackTargetSafe(npc, player) {
    try {
        npc.setAttackTarget(player);
        return;
    } catch (e) {}
    try {
        npc.setAttackTarget(player.getMCEntity());
        return;
    } catch (e2) {}
    try {
        npc.getMCEntity().setTarget(player.getMCEntity());
    } catch (e3) {}
}

function readGeneralInt(config, key, fallback) {
    try {
        return Math.max(1, Math.floor(Number(config.general[key]) || fallback));
    } catch (e) {
        return fallback;
    }
}

function readCombatInt(config, key, fallback) {
    try {
        return Math.max(1, Math.floor(Number(config.combat[key]) || fallback));
    } catch (e) {
        return fallback;
    }
}

function readPhaseInt(config, key, fallback) {
    try {
        return Math.max(1, Math.floor(Number(config.phases[key]) || fallback));
    } catch (e) {
        return fallback;
    }
}

module.exports = {
    handleDamaged: handleDamaged,
    tickCombat: tickCombat,
    readDamage: readDamage,
    getDeathThreshold: getDeathThreshold
};
