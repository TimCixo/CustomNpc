// @ts-check

var visuals = require("visuals.js");

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

    visuals.setBossBarColor(npc, targetPhase === 2 ? "yellow" : "red");
    visuals.spawnPhaseBurst(npc);
    visuals.launchNearbyPlayers(
        npc,
        readCombatNumber(config, "transitionLaunchRadius", 18),
        readCombatNumber(config, "transitionLaunchPush", 1.85),
        readCombatNumber(config, "transitionLaunchVertical", 1.15)
    );
    visuals.playSound(npc, readPhaseSound(config, targetPhase));
    visuals.broadcast(npc, getPhaseMessage(targetPhase));
}

/**
 * @param {ArceusConfig} config
 * @param {string} key
 * @param {number} fallback
 * @returns {number}
 */
function readCombatNumber(config, key, fallback) {
    var value;
    try {
        value = Number(config.combat[key]);
        return isNaN(value) || value <= 0 ? fallback : value;
    } catch (e) {
        return fallback;
    }
}

/**
 * @param {ArceusConfig} config
 * @param {number} phase
 * @returns {string}
 */
function readPhaseSound(config, phase) {
    try {
        if (phase == 2 && config.media.stage2Sound != null && config.media.stage2Sound != "") return "" + config.media.stage2Sound;
        if (phase >= 3 && config.media.stage3Sound != null && config.media.stage3Sound != "") return "" + config.media.stage3Sound;
    } catch (e) {}
    return "cobblemon:pokemon.arceus.cry";
}

/**
 * @param {number} phase
 * @returns {string}
 */
function getPhaseMessage(phase) {
    if (phase == 2) return "§6Аркеус меняет аспект и входит во вторую стадию!";
    if (phase >= 3) return "§4Аркеус высвобождает истинную силу. Третья стадия!";
    return "";
}

module.exports = {
    enterPhase: enterPhase,
    setInvulnerableSafe: setInvulnerableSafe
};
