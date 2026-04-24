var utils = require("utils.js");
var configModule = require("config.js");
var lifecycle = require("lifecycle.js");
var visuals = require("visuals.js");
var clock = require("clock_link.js");

var ARCEUS_TIMER_ID = 1;
var ARCEUS_DEATH_TIMER_ID = 2;
var ARCEUS_RUNTIME_KEY = "arceus_runtime";
var ARCEUS_BASE_MELEE_DELAY_KEY = "arceus_base_melee_delay";

function createBootstrapRuntime(npc, config, state) {
    return {
        version: configModule.ARCEUS_CONFIG_VERSION,
        npc: npc,
        config: config,
        state: lifecycle.cloneLifecycle(state),
        combat: {},
        phases: {},
        deathFlow: {},
        rewards: {},
        leaderboard: {},
        visuals: {},
        clockLink: {},
        debug: {}
    };
}

function ensureArceusRuntime(npc) {
    var temp = npc.getTempdata();
    var runtime = null;
    try {
        runtime = temp.get(ARCEUS_RUNTIME_KEY);
    } catch (e) {
        runtime = null;
    }

    var config = configModule.mergeConfig(utils.parseJsonSafe(npc.getStoreddata().get(configModule.ARCEUS_CONFIG_KEY)));

    if (runtime == null || runtime.version != configModule.ARCEUS_CONFIG_VERSION) {
        runtime = createBootstrapRuntime(
            npc,
            config,
            lifecycle.mergeLifecycle(utils.parseJsonSafe(npc.getStoreddata().get(lifecycle.ARCEUS_LIFECYCLE_KEY)))
        );
        temp.put(ARCEUS_RUNTIME_KEY, runtime);
        return runtime;
    }

    runtime.npc = npc;
    runtime.config = config;
    if (runtime.state == null) {
        runtime.state = lifecycle.mergeLifecycle(utils.parseJsonSafe(npc.getStoreddata().get(lifecycle.ARCEUS_LIFECYCLE_KEY)));
    }
    return runtime;
}

function initBoss(npc) {
    var config = configModule.ensureArceusConfig(npc);
    var state = lifecycle.createDefaultLifecycle();

    state.phase = 1;
    state.mode = "live";
    state.respawnVisualResetTicks = config.respawnVisualResetTicks;

    lifecycle.writeLifecycle(npc, state);
    clearLegacyArceusKeys(npc.getStoreddata());
    npc.getTempdata().put(ARCEUS_RUNTIME_KEY, createBootstrapRuntime(npc, config, state));

    applyPhaseMeleeDelay(npc, config, 1);
    visuals.resetLiveVisualState(npc, config);

    try {
        npc.setHealth(npc.getMaxHealth());
    } catch (e) {}
    try {
        npc.timers.forceStart(ARCEUS_TIMER_ID, utils.clampPositiveInt(config.timerTicks, 5), true);
    } catch (e1) {}
    try {
        npc.timers.stop(ARCEUS_DEATH_TIMER_ID);
    } catch (e2) {}

    visuals.announceArceusRespawn(npc, config);
    clock.notifyClockAlive(npc);
}

function resetBoss(npc, runtime) {
    var current = runtime == null ? ensureArceusRuntime(npc) : runtime;
    var config = current.config;
    var state = lifecycle.createDefaultLifecycle();
    state.respawnVisualResetTicks = config.respawnVisualResetTicks;

    lifecycle.writeLifecycle(npc, state);
    npc.getTempdata().remove(ARCEUS_RUNTIME_KEY);

    try {
        npc.setHealth(npc.getMaxHealth());
    } catch (e) {}

    applyPhaseMeleeDelay(npc, config, 1);
    visuals.resetLiveVisualState(npc, config);
    clock.notifyClockAlive(npc);

    try {
        npc.timers.forceStart(ARCEUS_TIMER_ID, utils.clampPositiveInt(config.timerTicks, 5), true);
    } catch (e1) {}
    try {
        npc.timers.stop(ARCEUS_DEATH_TIMER_ID);
    } catch (e2) {}
}

function applyPhaseMeleeDelay(npc, config, phase) {
    try {
        var stats = npc.getStats();
        if (stats == null || stats.getMelee == null) return;
        var melee = stats.getMelee();
        var baseDelay = captureBaseMeleeDelay(npc);
        var multiplier = getPhaseMeleeDelayMultiplier(config, phase);
        melee.setDelay(Math.max(1, Math.round(baseDelay * multiplier)));
    } catch (e) {}
}

function getBaseMeleeDelay(npc) {
    try {
        var value = npc.getTempdata().get(ARCEUS_BASE_MELEE_DELAY_KEY);
        var parsed = utils.parseIntSafe(value, 0);
        return parsed > 0 ? parsed : 0;
    } catch (e) {
        return 0;
    }
}

function captureBaseMeleeDelay(npc) {
    var stored = getBaseMeleeDelay(npc);
    if (stored > 0) return stored;

    var baseDelay = 12;
    try {
        var stats = npc.getStats();
        if (stats != null && stats.getMelee != null) {
            var melee = stats.getMelee();
            baseDelay = utils.parseIntSafe(melee.getDelay(), 12);
        }
    } catch (e) {}

    if (baseDelay <= 0) baseDelay = 12;
    try {
        npc.getTempdata().put(ARCEUS_BASE_MELEE_DELAY_KEY, baseDelay);
    } catch (e2) {}
    return baseDelay;
}

function getPhaseMeleeDelayMultiplier(config, phase) {
    if (phase == 2) return utils.positiveFloat(config.phase2MeleeDelayMult, 0.7);
    if (phase >= 3) return utils.positiveFloat(config.phase3MeleeDelayMult, 0.5);
    return utils.positiveFloat(config.phase1MeleeDelayMult, 1.0);
}

function persistRuntimeState(runtime) {
    lifecycle.persistRuntimeState(runtime);
}

function markRuntimeError(runtime, hook, error) {
    lifecycle.markRuntimeError(runtime, hook, error);
}

function clearLegacyArceusKeys(data) {
    var keys = data.getKeys();
    if (keys == null) return;
    for (var i = 0; i < keys.length; i++) {
        var key = "" + keys[i];
        if (key.indexOf("arceus_") !== 0) continue;
        if (key == configModule.ARCEUS_CONFIG_KEY || key == lifecycle.ARCEUS_LIFECYCLE_KEY) continue;
        data.remove(key);
    }
}

module.exports = {
    ARCEUS_TIMER_ID: ARCEUS_TIMER_ID,
    ARCEUS_DEATH_TIMER_ID: ARCEUS_DEATH_TIMER_ID,
    ARCEUS_RUNTIME_KEY: ARCEUS_RUNTIME_KEY,
    ARCEUS_BASE_MELEE_DELAY_KEY: ARCEUS_BASE_MELEE_DELAY_KEY,
    createBootstrapRuntime: createBootstrapRuntime,
    ensureArceusRuntime: ensureArceusRuntime,
    initBoss: initBoss,
    resetBoss: resetBoss,
    getBaseMeleeDelay: getBaseMeleeDelay,
    captureBaseMeleeDelay: captureBaseMeleeDelay,
    applyPhaseMeleeDelay: applyPhaseMeleeDelay,
    persistRuntimeState: persistRuntimeState,
    markRuntimeError: markRuntimeError
};
