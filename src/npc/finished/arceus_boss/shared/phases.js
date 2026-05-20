// @ts-check

/**
 * @typedef {import("./config.js").ArceusConfig} ArceusConfig
 * @typedef {import("./state.js").ArceusState} ArceusState
 */

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
 * @param {any} npc
 * @param {boolean} value
 */
function setInvulnerableSafe(npc, value) {
    try {
        npc.getMCEntity().setInvulnerable(value);
    } catch (e) {}
}

/**
 * @param {any} npc
 * @param {ArceusState} state
 * @param {ArceusConfig} config
 * @param {number} targetPhase
 */
function enterPhase(npc, state, config, targetPhase) {
    var maxHealth = readMaxHealth(npc);
    var healKey = "phase" + targetPhase + "HealTo";
    var healFraction = Number(config.phases[healKey]);
    var targetHealth;

    if (isNaN(healFraction) || healFraction <= 0) healFraction = 1;

    state.phase = targetPhase;
    state.mode = "phase_transition";
    state.transitionTicksLeft = config.combat.transitionTicks;

    targetHealth = Math.max(1, maxHealth * healFraction);
    setHealthSafe(npc, targetHealth);
    setInvulnerableSafe(npc, true);
}

module.exports = {
    enterPhase: enterPhase,
    setInvulnerableSafe: setInvulnerableSafe
};
