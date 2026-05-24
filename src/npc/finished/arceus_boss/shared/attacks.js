// @ts-check

/**
 * @typedef {import("./config.js").ArceusConfig} ArceusConfig
 * @typedef {import("./state.js").ArceusState} ArceusState
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
 * @param {any} event
 * @param {number} damage
 */
function writeDamage(event, damage) {
    try {
        event.setDamage(damage);
        return;
    } catch (e) {}
    try {
        event.damage = damage;
    } catch (e2) {}
}

/**
 * @param {any} event
 * @returns {any}
 */
function readTargetMcEntity(event) {
    try {
        return event.target ? event.target.getMCEntity() : null;
    } catch (e) {}
    return null;
}

/**
 * @param {any} mcTarget
 * @returns {boolean}
 */
function disableInvulnerableAbility(mcTarget) {
    var abilities;
    if (mcTarget == null || mcTarget.getAbilities == null) return false;

    try {
        abilities = mcTarget.getAbilities();
        if (abilities == null || abilities.invulnerable !== true) return false;
        abilities.invulnerable = false;
        if (mcTarget.onUpdateAbilities != null) mcTarget.onUpdateAbilities();
        return true;
    } catch (e) {}

    return false;
}

/**
 * @param {any} config
 * @param {number} phase
 * @returns {number}
 */
function getPhaseMultiplier(config, phase) {
    var value = 1;

    if (phase == 2) {
        try {
            value = Number(config.combat.phase2DamageMult);
        } catch (e) {}
        return isNaN(value) || value <= 0 ? 1.2 : value;
    }

    if (phase >= 3) {
        try {
            value = Number(config.combat.phase3DamageMult);
        } catch (e2) {}
        return isNaN(value) || value <= 0 ? 1.45 : value;
    }

    return 1;
}

/**
 * @param {any} event
 * @param {ArceusState} state
 * @param {ArceusConfig} config
 */
function handleMelee(event, state, config) {
    var mcTarget;
    var multiplier;

    if (state.mode != "live") return;

    mcTarget = readTargetMcEntity(event);
    if (disableInvulnerableAbility(mcTarget)) {
        cancelEvent(event);
        return;
    }

    multiplier = getPhaseMultiplier(config, state.phase);
    if (multiplier != 1) {
        writeDamage(event, readDamage(event) * multiplier);
    }
}

module.exports = {
    handleMelee: handleMelee
};
