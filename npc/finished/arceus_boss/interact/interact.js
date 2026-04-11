var ArceusClock_DataComponents = Java.type("net.minecraft.core.component.DataComponents");

var ARCEUS_CLOCK_LINKER_TYPE = "respawn_clock_linker";
var ARCEUS_CLOCK_MAIN_UUID_KEY = "respawn_clock_main_uuid";
var ARCEUS_CLOCK_RESPAWN_SECONDS_KEY = "respawn_clock_respawn_seconds";
var ARCEUS_TIMER_ID = 1;
var ARCEUS_DEATH_TIMER_ID = 2;
var ARCEUS_RUNTIME_KEY = "arceus_runtime";
var ARCEUS_CONFIG_KEY = "arceus_config_json";
var ARCEUS_LIFECYCLE_KEY = "arceus_lifecycle_json";
var ARCEUS_CONFIG_VERSION = 12;

function interact(event) {
    var npc = event.npc;
    var player = event.player;
    var runtime = ensureArceusRuntime(npc);
    var item = player.getMainhandItem();

    if (isRespawnClockLinker(item)) {
        bindClockLinker(npc, player, item, runtime);
        event.setCanceled(true);
        return;
    }

    if (player.isSneaking()) {
        resetBoss(npc, runtime);
        player.message("\u00A7a\u0410\u0440\u043A\u0435\u0443\u0441 \u0441\u0431\u0440\u043E\u0448\u0435\u043D \u0432 runtime-\u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435.");
        event.setCanceled(true);
        return;
    }

    var state = runtime.state;
    player.message(
        "\u00A77Arceus \u00A7f| mode: \u00A7e" + state.mode
        + "\u00A7f | phase: \u00A7e" + state.phase
        + "\u00A7f | transition: \u00A7e" + state.transitionTicksLeft
        + "\u00A7f | death: \u00A7e" + state.customDeathTicksLeft
    );
    player.message(
        "\u00A77Damage \u00A7f| live: \u00A7e" + state.liveSnapshot.length
        + "\u00A7f | frozen: \u00A7e" + state.frozenSnapshot.length
        + "\u00A7f | rewards: \u00A7e" + (state.rewardsGiven ? "1" : "0")
        + "\u00A7f | cursor: \u00A7e" + state.rewardCursor
    );
    player.message(
        "\u00A77Commit \u00A7f| announced: \u00A7e" + (state.leaderboardAnnounced ? "1" : "0")
        + "\u00A7f | committed: \u00A7e" + (state.deathCommitted ? "1" : "0")
        + "\u00A7f | err: \u00A7e" + state.debug.lastErrorHook
        + "\u00A7f | msg: \u00A7e" + state.debug.lastErrorMessage
    );
    event.setCanceled(true);
}

function resetBoss(npc, runtime) {
    var config = runtime.config;
    var state = createDefaultLifecycle();
    state.respawnVisualResetTicks = config.respawnVisualResetTicks;

    npc.getStoreddata().put(ARCEUS_LIFECYCLE_KEY, JSON.stringify(state));
    npc.getTempdata().remove(ARCEUS_RUNTIME_KEY);

    try {
        npc.setHealth(npc.getMaxHealth());
    } catch (e) {}

    applyPhaseMeleeDelay(npc, config, 1);
    resetLiveVisualState(npc, config);
    notifyClockAlive(npc);

    try {
        npc.timers.forceStart(ARCEUS_TIMER_ID, clampPositiveInt(config.timerTicks, 5), true);
    } catch (e2) {}

    try {
        npc.timers.stop(ARCEUS_DEATH_TIMER_ID);
    } catch (e3) {}
}

function bindClockLinker(npc, player, item, runtime) {
    var tag = getCustomTag(item);
    if (tag == null || !hasText(readTag(tag, "main_uuid"))) {
        player.message("\u00A7c[\u0427\u0430\u0441\u044B] \u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u043B\u0438\u043D\u043A\u0435\u0440.");
        return;
    }

    tag.putString("target_uuid", getNpcUuid(npc));
    tag.putString("target_name", getNpcDisplayName(npc));

    if (!writeHeldTag(player, item, tag)) {
        player.message("\u00A7c[\u0427\u0430\u0441\u044B] \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0410\u0440\u043A\u0435\u0443\u0441\u0430 \u0432 \u043B\u0438\u043D\u043A\u0435\u0440.");
        return;
    }

    runtime.config.clockMainUuid = readTag(tag, "main_uuid");
    runtime.config.clockRespawnSeconds = readRespawnDelaySeconds(npc);
    writeConfig(npc, runtime.config);
    notifyClockAlive(npc);
    player.message("\u00A7a[\u0427\u0430\u0441\u044B] \u0410\u0440\u043A\u0435\u0443\u0441 \u043F\u0440\u0438\u0432\u044F\u0437\u0430\u043D \u043A \u0447\u0430\u0441\u0430\u043C.");
}

function isRespawnClockLinker(item) {
    var tag = getCustomTag(item);
    return tag != null && readTag(tag, "linker_type") == ARCEUS_CLOCK_LINKER_TYPE;
}

function getCustomTag(item) {
    if (item == null || item.isEmpty()) return null;
    try {
        var customData = item.getMCItemStack().get(ArceusClock_DataComponents.CUSTOM_DATA);
        if (customData == null) return null;
        return customData.copyTag();
    } catch (e) {
        return null;
    }
}

function readTag(tag, key) {
    try {
        return trimString(tag.getString(key));
    } catch (e) {
        return "";
    }
}

function writeHeldTag(player, item, tag) {
    try {
        item.getMCItemStack().set(ArceusClock_DataComponents.CUSTOM_DATA, Java.type("net.minecraft.world.item.component.CustomData").of(tag));
        player.setMainhandItem(item);
        return true;
    } catch (e) {
        return false;
    }
}

function notifyClockAlive(npc) {
    var mainNpc = resolveClockMain(npc);
    if (mainNpc == null) return;

    var data = mainNpc.getStoreddata();
    data.put("respawn_clock_target_uuid", getNpcUuid(npc));
    data.put("respawn_clock_target_name", getNpcDisplayName(npc));
    data.put("respawn_clock_target_dead_until_ms", "0");
    data.put("respawn_clock_target_alive", "1");

    try {
        mainNpc.getDisplay().setTitle("\u00A7aREADY");
        mainNpc.updateClient();
    } catch (e) {}
}

function resolveClockMain(npc) {
    var mainUuid = trimString(npc.getStoreddata().get(ARCEUS_CLOCK_MAIN_UUID_KEY));
    if (!hasText(mainUuid)) return null;
    try {
        return npc.getWorld().getEntity(mainUuid);
    } catch (e) {
        return null;
    }
}

function readRespawnDelaySeconds(npc) {
    try {
        var stats = npc.getStats();
        if (stats != null && stats.getRespawnTime) {
            var value = parseInt("" + stats.getRespawnTime(), 10);
            if (!isNaN(value) && value > 0) return value;
        }
    } catch (e) {}
    return parseIntSafe(npc.getStoreddata().get(ARCEUS_CLOCK_RESPAWN_SECONDS_KEY), 300);
}

function resetLiveVisualState(npc, config) {
    try {
        npc.getStats().setHideDeadBody(true);
    } catch (e) {}
    try {
        npc.getMCEntity().setNoAi(false);
    } catch (e2) {}
    try {
        npc.getMCEntity().setInvulnerable(false);
    } catch (e3) {}
    clearEntityDamageVisuals(npc);
    ensureBossBarEnabled(npc);
    applyBossBarColor(npc, "white");
    restoreNameplate(npc, config.baseTitle);
    restoreVisibleBody(npc);
    updateNpcClient(npc);
}

function applyPhaseMeleeDelay(npc, config, phase) {
    try {
        var melee = npc.getStats().getMelee();
        var currentDelay = melee.getDelay();
        var baseDelay = currentDelay >= 1 ? currentDelay : 12;
        var multiplier = config.phase1MeleeDelayMult;
        if (phase == 2) multiplier = config.phase2MeleeDelayMult;
        if (phase >= 3) multiplier = config.phase3MeleeDelayMult;
        melee.setDelay(Math.max(1, Math.round(baseDelay * multiplier)));
    } catch (e) {}
}

function ensureBossBarEnabled(npc) {
    try {
        if (npc.getDisplay && npc.getDisplay() && npc.getDisplay().setBossbar) {
            npc.getDisplay().setBossbar(1);
        }
    } catch (e) {}
}

function applyBossBarColor(npc, colorName) {
    var colorId = 0;
    if (colorName == "yellow") colorId = 4;
    if (colorName == "red") colorId = 2;
    try {
        if (npc.getDisplay && npc.getDisplay() && npc.getDisplay().setBossColor) {
            npc.getDisplay().setBossColor(colorId);
        }
    } catch (e) {}
}

function restoreNameplate(npc, baseTitle) {
    try {
        if (npc.getDisplay && npc.getDisplay() && npc.getDisplay().setTitle) {
            npc.getDisplay().setTitle(hasText(baseTitle) ? baseTitle : "\u0410\u0440\u043A\u0435\u0443\u0441");
        }
    } catch (e) {}
}

function restoreVisibleBody(npc) {
    try {
        if (npc.getDisplay && npc.getDisplay() && npc.getDisplay().setVisible) {
            npc.getDisplay().setVisible(0);
        }
    } catch (e) {}
}

function clearEntityDamageVisuals(npc) {
    try {
        npc.getMCEntity().invulnerableTime = 0;
    } catch (e) {}
    try {
        npc.getMCEntity().hurtTime = 0;
    } catch (e2) {}
    try {
        npc.getMCEntity().hurtDuration = 0;
    } catch (e3) {}
    try {
        npc.getMCEntity().deathTime = 0;
    } catch (e4) {}
}

function updateNpcClient(npc) {
    try {
        npc.updateClient();
    } catch (e) {}
}

function ensureArceusRuntime(npc) {
    var temp = npc.getTempdata();
    var runtime = null;

    try {
        runtime = temp.get(ARCEUS_RUNTIME_KEY);
    } catch (e) {
        runtime = null;
    }

    var config = mergeConfig(parseJsonSafe(npc.getStoreddata().get(ARCEUS_CONFIG_KEY)));
    var state = mergeLifecycle(parseJsonSafe(npc.getStoreddata().get(ARCEUS_LIFECYCLE_KEY)));

    if (runtime == null || runtime.version != ARCEUS_CONFIG_VERSION) {
        runtime = {
            version: ARCEUS_CONFIG_VERSION,
            npc: npc,
            config: config,
            state: state,
            combat: {},
            phases: {},
            deathFlow: {},
            rewards: {},
            leaderboard: {},
            visuals: {},
            clockLink: {},
            debug: {}
        };
        temp.put(ARCEUS_RUNTIME_KEY, runtime);
        return runtime;
    }

    runtime.npc = npc;
    runtime.config = config;
    runtime.state = state;
    return runtime;
}

function writeConfig(npc, config) {
    npc.getStoreddata().put(ARCEUS_CONFIG_KEY, JSON.stringify(config));
    npc.getStoreddata().put(ARCEUS_CLOCK_MAIN_UUID_KEY, hasText(config.clockMainUuid) ? config.clockMainUuid : "");
    npc.getStoreddata().put(ARCEUS_CLOCK_RESPAWN_SECONDS_KEY, "" + clampPositiveInt(config.clockRespawnSeconds, 300));
}

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
        debug: {
            lastErrorHook: "-",
            lastErrorMessage: "-"
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
    if (base.debug == null) base.debug = { lastErrorHook: "-", lastErrorMessage: "-" };
    return base;
}

function createDefaultConfig() {
    return {
        version: ARCEUS_CONFIG_VERSION,
        timerTicks: 5,
        respawnVisualResetTicks: 20,
        phase1MeleeDelayMult: 1.0,
        phase2MeleeDelayMult: 0.7,
        phase3MeleeDelayMult: 0.5,
        baseTitle: "\u0410\u0440\u043A\u0435\u0443\u0441",
        clockMainUuid: "",
        clockRespawnSeconds: 300
    };
}

function mergeConfig(raw) {
    var base = createDefaultConfig();
    if (raw == null) return base;
    for (var key in base) {
        if (!base.hasOwnProperty(key)) continue;
        if (raw[key] === undefined || raw[key] === null) continue;
        base[key] = raw[key];
    }
    return base;
}

function parseJsonSafe(raw) {
    if (raw == null || raw == "" || raw == "null") return null;
    try {
        return JSON.parse("" + raw);
    } catch (e) {
        return null;
    }
}

function getNpcUuid(npc) {
    try {
        return "" + npc.getUUID();
    } catch (e) {
        return "";
    }
}

function getNpcDisplayName(npc) {
    try {
        if (npc.getDisplay && npc.getDisplay() && npc.getDisplay().getTitle) {
            var title = "" + npc.getDisplay().getTitle();
            if (hasText(title) && title != "null") return title;
        }
    } catch (e) {}
    try {
        var name = "" + npc.getName();
        if (hasText(name) && name != "null") return name;
    } catch (e2) {}
    return "\u0410\u0440\u043A\u0435\u0443\u0441";
}

function clampPositiveInt(value, def) {
    var parsed = parseIntSafe(value, def);
    return parsed < 1 ? def : parsed;
}

function parseIntSafe(value, def) {
    try {
        var parsed = parseInt("" + value, 10);
        return isNaN(parsed) ? def : parsed;
    } catch (e) {
        return def;
    }
}

function hasText(value) {
    return value != null && trimString(value).length > 0;
}

function trimString(value) {
    return ("" + value).replace(/^\s+|\s+$/g, "");
}
