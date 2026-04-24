var utils = require("utils.js");

var ARCEUS_LIFECYCLE_KEY = "arceus_lifecycle_json";

function createDefaultLifecycle() {
    return {
        mode: "live",
        phase: 1,
        transitionTicksLeft: 0,
        customDeathTicksLeft: 0,
        damageMap: {},
        liveSnapshot: [],
        frozenSnapshot: [],
        rewardCursor: 0,
        leaderboardAnnounced: false,
        rewardsGiven: false,
        deathCommitted: false,
        pendingPhaseEffect: null,
        respawnVisualResetTicks: 0,
        nextAggroRefreshAt: 0,
        stageDrops: { "2": 0, "3": 0 },
        recentHits: {},
        deathLineStage: 0,
        deathAnimStarted: false,
        deathFinalizeDone: false,
        deathFinalKillAttempted: false,
        deathMovedBelowArena: false,
        deathMoveTargetY: null,
        physicalDeathAttempts: 0,
        physicalDeathLastMethod: "-",
        physicalDeathLastError: "-",
        pulseTicks: 0,
        whoisCache: {},
        debug: {
            lastErrorHook: "-",
            lastErrorMessage: "-",
            lastRewardError: "-",
            lastLeaderboardError: "-"
        }
    };
}

function mergeLifecycle(raw) {
    var base = createDefaultLifecycle();
    if (raw == null) return base;
    for (var key in base) {
        if (!base.hasOwnProperty(key)) continue;
        if (raw[key] === undefined || raw[key] === null) continue;
        base[key] = raw[key];
    }
    if (base.stageDrops == null) base.stageDrops = { "2": 0, "3": 0 };
    if (base.recentHits == null) base.recentHits = {};
    if (base.damageMap == null) base.damageMap = {};
    if (base.liveSnapshot == null) base.liveSnapshot = [];
    if (base.frozenSnapshot == null) base.frozenSnapshot = [];
    if (base.whoisCache == null) base.whoisCache = {};
    if (base.deathFinalKillAttempted == null) base.deathFinalKillAttempted = false;
    if (base.deathMovedBelowArena == null) base.deathMovedBelowArena = false;
    if (base.deathMoveTargetY === undefined) base.deathMoveTargetY = null;
    if (base.physicalDeathAttempts == null) base.physicalDeathAttempts = 0;
    if (base.physicalDeathLastMethod == null) base.physicalDeathLastMethod = "-";
    if (base.physicalDeathLastError == null) base.physicalDeathLastError = "-";
    if (base.debug == null) base.debug = { lastErrorHook: "-", lastErrorMessage: "-", lastRewardError: "-", lastLeaderboardError: "-" };
    if (base.debug.lastRewardError == null) base.debug.lastRewardError = "-";
    if (base.debug.lastLeaderboardError == null) base.debug.lastLeaderboardError = "-";
    return base;
}

function cloneLifecycle(raw) {
    return mergeLifecycle(raw);
}

function writeLifecycle(npc, lifecycle) {
    npc.getStoreddata().put(ARCEUS_LIFECYCLE_KEY, JSON.stringify(lifecycle));
}

function persistRuntimeState(runtime) {
    if (runtime == null || runtime.npc == null) return;
    runtime.npc.getStoreddata().put(ARCEUS_LIFECYCLE_KEY, JSON.stringify(runtime.state));
}

function sanitizeErrorMessage(error) {
    try {
        var text = utils.trimString("" + error);
        return text.length > 200 ? text.substring(0, 200) : text;
    } catch (e) {
        return "unknown";
    }
}

function markRuntimeError(runtime, hook, error) {
    if (runtime == null || runtime.state == null) return;
    if (runtime.state.debug == null) {
        runtime.state.debug = { lastErrorHook: "-", lastErrorMessage: "-" };
    }
    runtime.state.debug.lastErrorHook = hook == null ? "-" : "" + hook;
    runtime.state.debug.lastErrorMessage = sanitizeErrorMessage(error);
    persistRuntimeState(runtime);
}

module.exports = {
    ARCEUS_LIFECYCLE_KEY: ARCEUS_LIFECYCLE_KEY,
    createDefaultLifecycle: createDefaultLifecycle,
    mergeLifecycle: mergeLifecycle,
    cloneLifecycle: cloneLifecycle,
    writeLifecycle: writeLifecycle,
    persistRuntimeState: persistRuntimeState,
    sanitizeErrorMessage: sanitizeErrorMessage,
    markRuntimeError: markRuntimeError
};
