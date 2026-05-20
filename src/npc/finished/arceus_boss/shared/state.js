// @ts-check

var STATE_KEY = "arceus_state";

/**
 * @typedef {import("./config.js").ArceusConfig} ArceusConfig
 */

/**
 * @typedef {Object} DamageEntry
 * @property {string} uuid
 * @property {string} name
 * @property {number} damage
 */

/**
 * @typedef {"live"|"phase_transition"|"custom_death_start"|"death_commit_pending"|"death_committed"} ArceusMode
 */

/**
 * @typedef {Object} ArceusState
 * @property {string} lastHook
 * @property {ArceusConfig|null} configCache
 * @property {ArceusMode} mode
 * @property {number} phase
 * @property {Object.<string, DamageEntry>} damageMap
 * @property {DamageEntry[]} liveSnapshot
 */

/**
 * @returns {ArceusState}
 */
function createState() {
    return {
        lastHook: "",
        configCache: null,
        mode: "live",
        phase: 1,
        damageMap: {},
        liveSnapshot: []
    };
}

/**
 * @param {any} npc
 * @returns {ArceusState}
 */
function get(npc) {
    var temp = npc.getTempdata();
    var state = temp.get(STATE_KEY);

    if (state == null) {
        state = createState();
        temp.put(STATE_KEY, state);
    }

    return /** @type {ArceusState} */ (state);
}

/**
 * @param {any} npc
 * @returns {ArceusState}
 */
function reset(npc) {
    var state = createState();
    npc.getTempdata().put(STATE_KEY, state);
    return state;
}

/**
 * @param {any} npc
 */
function dispose(npc) {
    npc.getTempdata().remove(STATE_KEY);
}

module.exports = {
    STATE_KEY: STATE_KEY,
    createState: createState,
    get: get,
    reset: reset,
    dispose: dispose
};
