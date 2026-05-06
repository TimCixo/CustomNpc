// @ts-check

var STATE_KEY = "template_state";

function createState() {
    return {
        lastHook: "",
        configCache: null
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
