var utils = require("utils.js");
var runtimeModule = require("runtime.js");
var visuals = require("visuals.js");
var phases = require("phases.js");
var damage = require("damage.js");
var deathFlow = require("death_flow.js");
var leaderboard = require("leaderboard.js");

var Timer_System = Java.type("java.lang.System");
var Timer_MobEffectInstance = Java.type("net.minecraft.world.effect.MobEffectInstance");
var Timer_MobEffects = Java.type("net.minecraft.world.effect.MobEffects");

function onTimer(event) {
    var runtime = runtimeModule.ensureArceusRuntime(event.npc);
    try {
        tickTimerCore(runtime, event.id);
    } catch (e) {
        runtimeModule.markRuntimeError(runtime, "timer:" + event.id, e);
    }
}

function tickTimerCore(runtime, timerId) {
    var npc = runtime.npc;
    if (!runtime.config.enabled) return;
    if (timerId != runtimeModule.ARCEUS_TIMER_ID && timerId != runtimeModule.ARCEUS_DEATH_TIMER_ID) return;

    if (timerId == runtimeModule.ARCEUS_TIMER_ID) processRespawnVisualReset(runtime);
    if (deathFlow.isNpcActuallyDead(npc)) return;

    if (timerId == runtimeModule.ARCEUS_DEATH_TIMER_ID) {
        deathFlow.tickDeathPath(runtime);
        return;
    }

    if (runtime.state.mode == "live" && runtime.state.phase >= 3) {
        var deathThreshold = phases.getArceusDeathThresholdHp(damage.readNpcMaxHealth(npc), runtime.config);
        if (damage.readNpcHealth(npc) <= deathThreshold) deathFlow.requestStart(runtime);
    }

    if (runtime.state.mode == "phase_transition") {
        tickTransition(runtime);
    } else if (runtime.state.mode == "live") {
        runtimeModule.ensureCombatReady(npc, runtime);
        tickTargetAcquisition(runtime);
        tickRecentAggro(runtime);
        tickPhaseRegen(runtime);
    } else if (runtime.state.mode == "custom_death_start" || runtime.state.mode == "death_commit_pending") {
        deathFlow.restartDeathTimer(runtime);
    } else if (runtime.state.mode == "death_committed") {
        deathFlow.stopBossTimer(runtime);
        deathFlow.stopDeathTimer(runtime);
    }

}

function tickTransition(runtime) {
    var state = runtime.state;
    var npc = runtime.npc;

    visuals.setEntityInvulnerable(npc, true);
    phases.forcePhaseTransitionHealthFloor(npc, runtime.config, state.phase);
    visuals.clearEntityDamageVisuals(npc);

    state.transitionTicksLeft -= utils.parseIntSafe(runtime.config.timerTicks, 5);
    if (state.transitionTicksLeft > 0) return;

    state.transitionTicksLeft = 0;
    state.mode = "live";
    runtimeModule.ensureCombatReady(npc, runtime);
    visuals.setEntityInvulnerable(npc, false);
    visuals.clearEntityDamageVisuals(npc);
    var followupLine = phases.getTransitionCompleteLine(state.phase);
    if (utils.hasText(followupLine)) visuals.safeSay(npc, followupLine);
    runtimeModule.persistRuntimeState(runtime);
}

function tickTargetAcquisition(runtime) {
    if (runtime == null || runtime.state == null) return;
    if (runtime.state.mode != "live") return;
    if (hasLivePlayerTarget(runtime.npc)) return;

    var radius = utils.parseFloatSafe(runtime.config.aggroRadius, 32);
    var target = findNearestPlayerTarget(runtime.npc, radius);
    if (target == null) return;
    setAttackTargetSafe(runtime.npc, target);
}

function tickPhaseRegen(runtime) {
    var phase = runtime.state.phase;
    if (phase <= 1) return;

    if (runtime.state.pulseTicks == null) runtime.state.pulseTicks = 0;
    runtime.state.pulseTicks += utils.parseIntSafe(runtime.config.timerTicks, 5);

    var interval = phase == 2
        ? utils.parseIntSafe(runtime.config.phase2RegenInterval, 40)
        : utils.parseIntSafe(runtime.config.phase3RegenInterval, 20);
    if (runtime.state.pulseTicks < interval) return;
    runtime.state.pulseTicks = 0;

    var duration = phase == 2
        ? utils.parseIntSafe(runtime.config.phase2RegenEffectDuration, 50)
        : utils.parseIntSafe(runtime.config.phase3RegenEffectDuration, 60);
    var amplifier = phase == 2
        ? utils.parseIntSafe(runtime.config.phase2RegenEffectAmplifier, 2)
        : utils.parseIntSafe(runtime.config.phase3RegenEffectAmplifier, 4);
    if (duration <= 0) return;

    try {
        runtime.npc.getMCEntity().addEffect(new Timer_MobEffectInstance(
            Timer_MobEffects.REGENERATION,
            duration,
            amplifier,
            false,
            true,
            true
        ));
        return;
    } catch (e) {}

    try {
        runtime.npc.getMCEntity().addEffect(new Timer_MobEffectInstance(
            Timer_MobEffects.REGENERATION,
            duration,
            amplifier
        ));
    } catch (e2) {}
}

function tickRecentAggro(runtime) {
    var now = Timer_System.currentTimeMillis();
    if (utils.parseIntSafe(runtime.state.nextAggroRefreshAt, 0) > now) return;

    var refreshMs = utils.parseIntSafe(runtime.config.aggroRefreshMs, 500);
    if (refreshMs < 50) refreshMs = 50;
    runtime.state.nextAggroRefreshAt = now + refreshMs;

    var players = leaderboard.getOnlinePlayers(runtime.npc);
    if (players == null || players.length <= 0) return;

    var best = null;
    for (var uuid in runtime.state.recentHits) {
        if (!runtime.state.recentHits.hasOwnProperty(uuid)) continue;

        var hits = runtime.state.recentHits[uuid];
        if (hits == null || hits.length <= 0) continue;

        var total = 0;
        var kept = [];
        for (var i = 0; i < hits.length; i++) {
            if (now - utils.parseIntSafe(hits[i].time, 0) > 5000) continue;
            kept.push(hits[i]);
            total += utils.parseFloatSafe(hits[i].damage, 0);
        }
        runtime.state.recentHits[uuid] = kept;
        if (total <= 0) continue;

        var player = leaderboard.resolvePlayerByUuidOrName(runtime.npc, uuid, kept.length > 0 ? kept[kept.length - 1].name : "", players);
        if (player == null) continue;
        if (best == null || total > best.damage) best = { player: player, damage: total, uuid: uuid };
    }

    if (best == null) return;

    try {
        var current = runtime.npc.getAttackTarget();
        if (current != null && leaderboard.samePlayerUuid(current, best.uuid)) return;
    } catch (e) {}

    setAttackTargetSafe(runtime.npc, best.player);
}

function hasLivePlayerTarget(npc) {
    var current = null;
    try {
        current = npc.getAttackTarget();
    } catch (e) {
        current = null;
    }
    if (current != null) {
        if (!isPlayerTarget(current)) return false;
        try {
            if (current.getHealth && current.getHealth() <= 0) return false;
        } catch (e2) {}
        return true;
    }
    try {
        var mcTarget = npc.getMCEntity().getTarget();
        return isPlayerTarget(mcTarget);
    } catch (e3) {
        return false;
    }
}

function isPlayerTarget(target) {
    if (target == null) return false;
    try {
        if (target.getType && target.getType() == 1) return true;
    } catch (e) {}
    try {
        var className = "" + target.getClass().getName();
        if (className.indexOf("Player") >= 0 || className.indexOf("player") >= 0) return true;
    } catch (e2) {}
    try {
        if (target.getUUID && target.getGameProfile) return true;
    } catch (e3) {}
    return false;
}

function findNearestPlayerTarget(npc, radius) {
    var players = leaderboard.getOnlinePlayers(npc);
    if (players == null || players.length <= 0) return null;
    var maxDistanceSq = radius <= 0 ? 32 * 32 : radius * radius;
    var best = null;
    var bestDistanceSq = maxDistanceSq + 1;

    for (var i = 0; i < players.length; i++) {
        var player = players[i];
        if (player == null) continue;
        var distanceSq = getDistanceSq(npc, player);
        if (distanceSq > maxDistanceSq) continue;
        if (distanceSq >= bestDistanceSq) continue;
        best = player;
        bestDistanceSq = distanceSq;
    }
    return best;
}

function getDistanceSq(npc, player) {
    var dx = player.getX() - npc.getX();
    var dy = player.getY() - npc.getY();
    var dz = player.getZ() - npc.getZ();
    return dx * dx + dy * dy + dz * dz;
}

function setAttackTargetSafe(npc, player) {
    if (npc == null || player == null) return false;
    try {
        npc.setAttackTarget(player);
        return true;
    } catch (e) {}
    try {
        npc.getMCEntity().setTarget(player.getMCEntity());
        return true;
    } catch (e2) {}
    return false;
}

function processRespawnVisualReset(runtime) {
    if (utils.parseIntSafe(runtime.state.respawnVisualResetTicks, 0) <= 0) return;
    if (runtime.state.mode != "live") return;
    if (runtime.state.phase != 1) {
        runtime.state.respawnVisualResetTicks = 0;
        return;
    }

    visuals.resetLiveVisualState(runtime.npc, runtime.config);
    runtime.state.respawnVisualResetTicks -= utils.parseIntSafe(runtime.config.timerTicks, 5);
    if (runtime.state.respawnVisualResetTicks < 0) runtime.state.respawnVisualResetTicks = 0;
}

module.exports = {
    onTimer: onTimer,
    tickTimerCore: tickTimerCore,
    tickTransition: tickTransition,
    tickTargetAcquisition: tickTargetAcquisition,
    tickPhaseRegen: tickPhaseRegen,
    tickRecentAggro: tickRecentAggro,
    processRespawnVisualReset: processRespawnVisualReset,
    getDistanceSq: getDistanceSq,
    findNearestPlayerTarget: findNearestPlayerTarget,
    setAttackTargetSafe: setAttackTargetSafe
};
