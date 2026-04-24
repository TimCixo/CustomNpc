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
    visuals.setEntityInvulnerable(npc, false);
    visuals.clearEntityDamageVisuals(npc);
    runtimeModule.persistRuntimeState(runtime);
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

    try {
        runtime.npc.setAttackTarget(best.player);
        return;
    } catch (e2) {}

    try {
        runtime.npc.getMCEntity().setTarget(best.player.getMCEntity());
    } catch (e3) {}
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
    tickPhaseRegen: tickPhaseRegen,
    tickRecentAggro: tickRecentAggro,
    processRespawnVisualReset: processRespawnVisualReset
};
