var utils = require("utils.js");
var runtimeModule = require("runtime.js");
var phases = require("phases.js");
var rewards = require("rewards.js");
var damage = require("damage.js");
var visuals = require("visuals.js");
var deathFlow = require("death_flow.js");

var Combat_System = Java.type("java.lang.System");

function onDamaged(event) {
    var runtime = runtimeModule.ensureArceusRuntime(event.npc);
    try {
        damagedCore(event, runtime);
    } catch (e) {
        runtimeModule.markRuntimeError(runtime, "damaged", e);
        try {
            damage.cancelDamage(event);
        } catch (e2) {}
    }
}

function damagedCore(event, runtime) {
    var npc = event.npc;
    var state = runtime.state;
    var config = runtime.config;

    if (!config.enabled) return;

    if (state.mode == "phase_transition") {
        damage.cancelDamage(event);
        visuals.setEntityInvulnerable(npc, true);
        phases.forcePhaseTransitionHealthFloor(npc, config, state.phase);
        visuals.clearEntityDamageVisuals(npc);
        return;
    }

    if (state.mode != "live") {
        damage.cancelDamage(event);
        visuals.setEntityInvulnerable(npc, true);
        phases.forceDeathSafeHealthFloor(npc, config);
        visuals.clearEntityDamageVisuals(npc);
        return;
    }

    var currentHp = damage.readNpcHealth(npc);
    var maxHp = damage.readNpcMaxHealth(npc);
    var incomingDamage = damage.readDamage(event);
    var phase = state.phase;
    var attacker = resolveDamageDealer(event, npc);

    if (incomingDamage <= 0 || maxHp <= 0) return;

    incomingDamage = damage.applyPhaseDamageMitigation(event, npc, phase, incomingDamage, config, attacker);
    var hpAfterHit = currentHp - incomingDamage;
    var phase2Threshold = maxHp * config.phase2Threshold;
    var phase3Threshold = maxHp * config.phase3Threshold;
    var deathThreshold = phases.getArceusDeathThresholdHp(maxHp, config);

    recordDamageContribution(attacker, incomingDamage, runtime);

    if (phase <= 1 && hpAfterHit <= phase2Threshold) {
        damage.cancelDamage(event);
        phases.enterPhase(
            npc,
            runtime,
            2,
            config.phase2HealTo,
            "\u00A76\u0410\u0440\u043A\u0435\u0443\u0441 \u043C\u0435\u043D\u044F\u0435\u0442 \u0430\u0441\u043F\u0435\u043A\u0442 \u0438 \u0432\u0445\u043E\u0434\u0438\u0442 \u0432\u043E \u0432\u0442\u043E\u0440\u0443\u044E \u0441\u0442\u0430\u0434\u0438\u044E!",
            "yellow",
            config.stage2Sound
        );
        return;
    }

    if (phase == 2 && hpAfterHit <= phase3Threshold) {
        damage.cancelDamage(event);
        var phase2DropCount = rewards.getStageDropCountToThreshold(runtime, 2, currentHp, phase3Threshold, maxHp);
        phases.enterPhase(
            npc,
            runtime,
            3,
            config.phase3HealTo,
            "\u00A74\u0410\u0440\u043A\u0435\u0443\u0441 \u0432\u044B\u0441\u0432\u043E\u0431\u043E\u0436\u0434\u0430\u0435\u0442 \u0438\u0441\u0442\u0438\u043D\u043D\u0443\u044E \u0441\u0438\u043B\u0443. \u0422\u0440\u0435\u0442\u044C\u044F \u0441\u0442\u0430\u0434\u0438\u044F!",
            "red",
            config.stage3Sound
        );
        rewards.dropConfiguredItem(npc, config.phase2PinataItem, phase2DropCount, config);
        return;
    }

    if (phase >= 3 && hpAfterHit <= deathThreshold) {
        damage.cancelDamage(event);
        visuals.setEntityInvulnerable(npc, true);
        deathFlow.requestStart(runtime);
        damage.setNpcHealthSafe(npc, deathThreshold);
        phases.forceDeathSafeHealthFloor(npc, config);
        phases.stopCombatForDeath(npc);
        rewards.dropRandomGems(npc, rewards.getStageDropCountToThreshold(runtime, 3, currentHp, deathThreshold, maxHp), config);
        return;
    }

    if (phase == 2) {
        rewards.dropConfiguredItem(
            npc,
            config.phase2PinataItem,
            rewards.getStageDropCountForHit(runtime, 2, currentHp, hpAfterHit, maxHp),
            config
        );
    } else if (phase >= 3) {
        rewards.dropRandomGems(npc, rewards.getStageDropCountForHit(runtime, 3, currentHp, hpAfterHit, maxHp), config);
    }

}

function recordDamageContribution(attacker, damageAmount, runtime) {
    if (attacker == null) return;

    var uuid = safeAttackerUuid(attacker);
    if (!utils.hasText(uuid)) return;

    var name = getAttackerName(attacker);
    var current = runtime.state.damageMap[uuid];
    if (current == null) {
        current = { uuid: uuid, name: name, damage: 0 };
        runtime.state.damageMap[uuid] = current;
    }

    current.name = name;
    current.damage += damageAmount;
    runtime.state.liveSnapshot = buildSortedSnapshot(runtime.state.damageMap);
    appendRecentDamageContribution(runtime.state, uuid, name, damageAmount);
}

function appendRecentDamageContribution(state, uuid, name, damageAmount) {
    if (state.recentHits[uuid] == null) state.recentHits[uuid] = [];

    var list = state.recentHits[uuid];
    list.push({
        time: Combat_System.currentTimeMillis(),
        damage: damageAmount,
        name: name
    });

    if (list.length > 20) list.splice(0, list.length - 20);
}

function buildSortedSnapshot(map) {
    var out = [];
    for (var key in map) {
        if (!map.hasOwnProperty(key)) continue;
        var entry = map[key];
        if (entry == null || entry.damage <= 0) continue;
        out.push({
            uuid: entry.uuid,
            name: utils.hasText(entry.name) ? entry.name : entry.uuid,
            damage: entry.damage
        });
    }
    out.sort(function(a, b) {
        return b.damage - a.damage;
    });
    return out;
}

function resolveDamageDealer(event, npc) {
    var attacker = null;

    try {
        if (event.damageSource != null && event.damageSource.getTrueSource() != null) {
            attacker = event.damageSource.getTrueSource();
        }
    } catch (e) {}

    if (attacker == null) {
        try {
            if (event.source != null) attacker = event.source;
        } catch (e2) {}
    }

    return resolveDamageOwner(npc, attacker);
}

function resolveDamageOwner(npc, attacker) {
    if (attacker == null) return null;
    if (damage.isPlayerAttacker(attacker)) return attacker;

    var directOwner = resolveOwnerEntity(attacker);
    if (directOwner != null) {
        if (damage.isPlayerAttacker(directOwner)) return directOwner;
        attacker = directOwner;
    }

    var ownerUuid = readOwnerUuid(attacker);
    if (utils.hasText(ownerUuid)) {
        var ownerPlayer = findPlayerByUuid(npc, ownerUuid);
        if (ownerPlayer != null) return ownerPlayer;
    }

    var mcEntity = damage.unwrapMcEntity(attacker);
    if (mcEntity != null) {
        var mcOwner = resolveOwnerEntity(mcEntity);
        if (mcOwner != null && damage.isPlayerAttacker(mcOwner)) return mcOwner;
    }

    return attacker;
}

function resolveOwnerEntity(target) {
    if (target == null) return null;
    return callZeroArg(target, "getOwner")
        || callZeroArg(target, "owner")
        || callZeroArg(target, "getOwnerEntity")
        || callZeroArg(target, "getPlayerOwner")
        || callZeroArg(target, "getOwnerPlayer");
}

function readOwnerUuid(target) {
    if (target == null) return "";
    return normalizeUuidValue(callZeroArg(target, "getOwnerUUID"))
        || normalizeUuidValue(callZeroArg(target, "getOwnerUuid"))
        || normalizeUuidValue(callZeroArg(target, "getOwnerId"));
}

function normalizeUuidValue(value) {
    if (value == null) return "";
    try {
        if (value.isPresent && value.isPresent()) value = value.get();
    } catch (e) {}
    try {
        return utils.trimString("" + value);
    } catch (e2) {
        return "";
    }
}

function callZeroArg(target, methodName) {
    if (target == null || !methodName) return null;
    try {
        if (target[methodName]) return target[methodName]();
    } catch (e) {}
    return null;
}

function findPlayerByUuid(npc, uuid) {
    try {
        var players = npc.getWorld().getAllPlayers();
        if (players == null) return null;
        for (var i = 0; i < players.length; i++) {
            if (("" + players[i].getUUID()) == ("" + uuid)) return players[i];
        }
    } catch (e) {}
    return null;
}

function safeAttackerUuid(attacker) {
    try {
        return "" + attacker.getUUID();
    } catch (e) {
        return "";
    }
}

function getAttackerName(attacker) {
    try {
        var name = "" + attacker.getDisplayName();
        if (utils.hasText(name) && name != "null") return name;
    } catch (e) {}
    try {
        var name2 = "" + attacker.getName();
        if (utils.hasText(name2) && name2 != "null") return name2;
    } catch (e2) {}
    return "Unknown";
}

module.exports = {
    onDamaged: onDamaged,
    damagedCore: damagedCore,
    recordDamageContribution: recordDamageContribution,
    appendRecentDamageContribution: appendRecentDamageContribution,
    buildSortedSnapshot: buildSortedSnapshot,
    resolveDamageDealer: resolveDamageDealer,
    resolveDamageOwner: resolveDamageOwner,
    resolveOwnerEntity: resolveOwnerEntity,
    readOwnerUuid: readOwnerUuid,
    safeAttackerUuid: safeAttackerUuid,
    getAttackerName: getAttackerName,
    findPlayerByUuid: findPlayerByUuid
};
