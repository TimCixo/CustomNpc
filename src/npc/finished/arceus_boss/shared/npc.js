// @ts-check

var configShared = require("config.js");
var stateShared = require("state.js");
var utils = require("utils.js");

var TIMER_ID = 1;

/**
 * @typedef {import("./config.js").ArceusConfig} ArceusConfig
 * @typedef {import("./state.js").ArceusState} ArceusState
 */

/**
 * @param {any} npc
 * @param {ArceusConfig} config
 */
function forceMainTimer(npc, config) {
    var ticks = utils.clampPositiveInt(config.general.timerTicks, 5);

    try {
        npc.timers.forceStart(TIMER_ID, ticks, true);
    } catch (e) {
        try {
            npc.getTimers().forceStart(TIMER_ID, ticks, true);
        } catch (e2) {}
    }
}

/**
 * @param {any} event
 */
function init(event) {
    var config = configShared.get(event.npc);
    var state;

    if (config == null) {
        config = configShared.set(event.npc, {});
    }

    state = stateShared.reset(event.npc);
    state.configCache = config;
    state.lastHook = "init";

    forceMainTimer(event.npc, config);
}

/**
 * @param {any} event
 */
function onTimer(event) {
    var state = stateShared.get(event.npc);
    var config = state.configCache;

    if (config == null || config.general == null) return;

    state.lastHook = "timer";
    // TODO: Route to logic module.
}

/**
 * @param {any} event
 */
function onInteract(event) {
    var state = stateShared.get(event.npc);
    var config = state.configCache;

    if (config == null || config.general == null) return;

    state.lastHook = "interact";
    // TODO: Route to logic module.
}

/**
 * @param {any} event
 */
function onDamaged(event) {
    var state = stateShared.get(event.npc);
    var config = state.configCache;

    if (config == null || config.general == null) return;

    state.lastHook = "damaged";
    // TODO: Route to logic module.
}

/**
 * @param {any} event
 */
function onDied(event) {
    var state = stateShared.get(event.npc);
    var config = state.configCache;

    if (config == null || config.general == null) return;

    state.lastHook = "died";
    // TODO: Route to logic module.
}

module.exports = {
    TIMER_ID: TIMER_ID,
    init: init,
    onTimer: onTimer,
    onInteract: onInteract,
    onDamaged: onDamaged,
    onDied: onDied
};
