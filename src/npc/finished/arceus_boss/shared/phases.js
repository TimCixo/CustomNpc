var utils = require("utils.js");
var runtimeModule = require("runtime.js");
var visuals = require("visuals.js");
var damage = require("damage.js");

function enterPhase(npc, runtime, phase, healFraction, line, bossBarColor, soundId) {
    var state = runtime.state;
    var config = runtime.config;
    var maxHp = damage.readNpcMaxHealth(npc);
    var targetHp = Math.max(1, Math.floor(maxHp * healFraction));

    state.phase = phase;
    state.mode = "phase_transition";
    state.transitionTicksLeft = config.transitionTicks;
    state.pendingPhaseEffect = {
        phase: phase,
        line: line,
        bossBarColor: bossBarColor,
        soundId: soundId == null ? "" : "" + soundId
    };
    state.deathCommitted = false;
    state.customDeathTicksLeft = 0;
    state.deathLineStage = 0;
    state.deathAnimStarted = false;
    state.deathFinalizeDone = false;
    state.respawnVisualResetTicks = 0;
    state.stageDrops["" + phase] = 0;

    visuals.setEntityInvulnerable(npc, true);
    damage.setNpcHealthSafe(npc, targetHp);
    forcePhaseTransitionHealthFloor(npc, config, phase);
    visuals.clearEntityDamageVisuals(npc);
    stopCombatForDeath(npc);

    applyPhaseVisuals(npc, runtime);
    runtimeModule.persistRuntimeState(runtime);
}

function applyPhaseVisuals(npc, runtime) {
    var effect = runtime.state.pendingPhaseEffect;
    if (effect == null) return;

    if (utils.hasText(effect.line)) visuals.safeSay(npc, effect.line);
    visuals.applyBossBarColor(npc, effect.bossBarColor);
    visuals.playSoundForAllPlayers(npc, effect.soundId, 1.2, 1.0);
    runtimeModule.applyPhaseMeleeDelay(npc, runtime.config, effect.phase);
    runtime.state.pendingPhaseEffect = null;
}

function forcePhaseTransitionHealthFloor(npc, config, phase) {
    var maxHp = damage.readNpcMaxHealth(npc);
    var healFraction = phase >= 3 ? config.phase3HealTo : config.phase2HealTo;
    damage.setNpcHealthSafe(npc, Math.max(1, Math.floor(maxHp * healFraction)));
}

function forceDeathSafeHealthFloor(npc, config) {
    var maxHp = damage.readNpcMaxHealth(npc);
    damage.setNpcHealthSafe(npc, getArceusDeathThresholdHp(maxHp, config));
}

function getArceusDeathThresholdHp(maxHp, config) {
    var threshold = maxHp * config.customDeathThresholdPercent;
    if (threshold < config.customDeathThresholdMinHp) threshold = config.customDeathThresholdMinHp;
    return threshold < 1 ? 1 : threshold;
}

function stopCombatForDeath(npc) {
    try {
        npc.setAttackTarget(null);
    } catch (e) {}
    try {
        npc.getMCEntity().setTarget(null);
    } catch (e2) {}
    try {
        npc.setMoveForward(0);
        npc.setMoveStrafing(0);
        npc.setMoveVertical(0);
    } catch (e3) {}
}

module.exports = {
    enterPhase: enterPhase,
    applyPhaseVisuals: applyPhaseVisuals,
    forcePhaseTransitionHealthFloor: forcePhaseTransitionHealthFloor,
    forceDeathSafeHealthFloor: forceDeathSafeHealthFloor,
    getArceusDeathThresholdHp: getArceusDeathThresholdHp,
    stopCombatForDeath: stopCombatForDeath
};
