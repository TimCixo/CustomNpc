// @ts-check

var STATE_KEY = "basic_npc_example_state";

function createState() {
    return {
        sequence: 0,
        initCount: 0,
        interactCount: 0,
        timerCount: 0,
        deathCount: 0,
        lastPlayerName: "",
        lastHook: ""
    };
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @returns {any}
 */
function get(npc) {
    var tempdata = npc.getTempdata();
    var state = tempdata.get(STATE_KEY);

    if (state == null || typeof state != "object") {
        state = createState();
        tempdata.put(STATE_KEY, state);
    }

    return state;
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @returns {any}
 */
function reset(npc) {
    var state = createState();
    npc.getTempdata().put(STATE_KEY, state);
    return state;
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 */
function dispose(npc) {
    npc.getTempdata().remove(STATE_KEY);
}

module.exports = {
    get: get,
    reset: reset,
    dispose: dispose,
    STATE_KEY: STATE_KEY
};
