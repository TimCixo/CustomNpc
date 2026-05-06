// @ts-check

var configShared = require("config.js");
var stateShared = require("state.js");
var utils = require("utils.js");

var DEFAULT_CONFIG = {
    initialization: {
        timerId: 1,
        timerTicks: 40,
        timerRepeat: false
    },
    interact: {
        message: ""
    },
    death: {
        goodbyeText: ""
    }
};

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @param {any} config
 */
function startTimer(npc, config) {
    if (config == null || config.initialization == null) return;

    try {
        npc.getTimers().forceStart(
            config.initialization.timerId,
            config.initialization.timerTicks,
            config.initialization.timerRepeat
        );
    } catch (e) {
        try {
            npc.getTimers().start(
                config.initialization.timerId,
                config.initialization.timerTicks,
                config.initialization.timerRepeat
            );
        } catch (e2) {}
    }
}

/**
 * @param {any} event
 */
function init(event) {
    var npc = event.npc;
    var config = configShared.get(npc);
    var state = null;

    if (config == null) {
        config = configShared.set(npc, DEFAULT_CONFIG);
    }

    state = stateShared.reset(npc);
    state.configCache = config;

    state.lastHook = "init";
    startTimer(npc, state.configCache);
}

/**
 * @param {any} event
 */
function onInteract(event) {
    var npc = event.npc;
    var state = stateShared.get(npc);
    var config = state.configCache;

    state.lastHook = "interact";

    if (config != null && config.interact != null && utils.hasText(config.interact.message)) {
        try {
            event.player.message(config.interact.message);
        } catch (e) {}
    }
}

/**
 * @param {any} event
 */
function onTimer(event) {
    var state = stateShared.get(event.npc);
    var config = state.configCache;

    if (config == null || config.initialization == null) return;
    if (String(event.id) != String(config.initialization.timerId)) return;

    state.lastHook = "timer";
}

/**
 * @param {any} event
 */
function onDialog(event) {
    void event;
}

/**
 * @param {any} event
 */
function onDamaged(event) {
    void event;
}

/**
 * @param {any} event
 */
function onDied(event) {
    var npc = event.npc;
    var state = stateShared.get(npc);
    var config = state.configCache;

    state.lastHook = "died";

    if (config != null && config.death != null && utils.hasText(config.death.goodbyeText)) {
        try {
            npc.say(config.death.goodbyeText);
        } catch (e) {}
    }

    stateShared.dispose(npc);
}

module.exports = {
    init: init,
    onInteract: onInteract,
    onTimer: onTimer,
    onDialog: onDialog,
    onDamaged: onDamaged,
    onDied: onDied
};
