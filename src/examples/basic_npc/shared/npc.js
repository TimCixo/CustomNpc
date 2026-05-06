// @ts-check

var configShared = require("config.js");
var stateShared = require("state.js");
var utils = require("utils.js");

var DEFAULT_CONFIG = {
    initialization: {
        timerId: 1,
        timerTicks: 40,
        timerRepeat: true,
        announceInit: true
    },
    interact: {
        message: "This template uses stored config and live tempdata state."
    },
    death: {
        goodbyeText: "Final state was printed, then tempdata state was disposed."
    }
};

/**
 * @param {any} player
 * @returns {string}
 */
function getPlayerName(player) {
    if (player == null) return "";

    try {
        return utils.text(player.getName());
    } catch (e) {}

    try {
        return utils.text(player.name);
    } catch (e2) {}

    return "";
}

/**
 * @param {any} state
 * @returns {string}
 */
function getStateLine(state) {
    var lastPlayerName = utils.hasText(state.lastPlayerName) ? state.lastPlayerName : "<none>";
    return "seq=" + state.sequence
        + " init=" + state.initCount
        + " interact=" + state.interactCount
        + " timer=" + state.timerCount
        + " death=" + state.deathCount
        + " lastHook=" + state.lastHook
        + " lastPlayer=" + lastPlayerName;
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @param {string} message
 */
function say(npc, message) {
    if (!utils.hasText(message)) return;

    try {
        npc.say(message);
    } catch (e) {}
}

/**
 * @param {any} player
 * @param {string} message
 */
function tell(player, message) {
    if (player == null || !utils.hasText(message)) return;

    try {
        player.message(message);
    } catch (e) {}
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @param {any} config
 */
function ensureTimer(npc, config) {
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

    state.sequence++;
    state.initCount++;
    state.lastHook = "init";
    state.lastPlayerName = "";

    ensureTimer(npc, state.configCache);

    if (config != null && config.initialization != null && config.initialization.announceInit) {
        say(npc, "[basic_npc:init] " + getStateLine(state));
    }
}

/**
 * @param {any} event
 */
function onInteract(event) {
    var state = stateShared.get(event.npc);
    var config = state.configCache;

    state.sequence++;
    state.interactCount++;
    state.lastHook = "interact";
    state.lastPlayerName = getPlayerName(event.player);

    if (config != null && config.interact != null && utils.hasText(config.interact.message)) {
        tell(event.player, "[basic_npc:interact] " + config.interact.message);
    }

    tell(event.player, "[basic_npc:interact] " + getStateLine(state));
}

/**
 * @param {any} event
 */
function onTimer(event) {
    var state = stateShared.get(event.npc);
    var config = state.configCache;

    if (config == null || config.initialization == null) return;
    if (String(event.id) != String(config.initialization.timerId)) return;

    state.sequence++;
    state.timerCount++;
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

    state.sequence++;
    state.deathCount++;
    state.lastHook = "died";
    state.lastPlayerName = getPlayerName(event.source);

    say(npc, "[basic_npc:died] " + getStateLine(state));

    if (config != null && config.death != null && utils.hasText(config.death.goodbyeText)) {
        say(npc, "[basic_npc:died] " + config.death.goodbyeText);
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
