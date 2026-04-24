var ArceusClock_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var ArceusClock_CustomData = Java.type("net.minecraft.world.item.component.CustomData");

var ARCEUS_CLOCK_LINKER_TYPE = "respawn_clock_linker";

function requireShared(event) {
    var npc = event.npc;
    var data = npc.getStoreddata();
    var factorySource = "" + data.get("__shared");
    var factory = null;

    if (factorySource == null || factorySource == "" || factorySource == "null" || factorySource == "undefined") {
        throw "Shared coordinator `__shared` is missing in npc storeddata. Reapply the package with the loader item.";
    }

    factory = (1, eval)(factorySource);
    if (typeof factory != "function") {
        throw "Shared coordinator `__shared` is invalid. Reapply the package with the loader item.";
    }

    return factory(event);
}

function interact(event) {
    var npc = event.npc;
    var player = event.player;
    var item = player.getMainhandItem();
    var shared = requireShared(event);
    var runtime = shared.runtime.ensureArceusRuntime(npc);

    if (isRespawnClockLinker(item)) {
        bindClockLinker(npc, player, item, runtime, shared);
        event.setCanceled(true);
        return;
    }

    if (player.isSneaking()) {
        shared.runtime.resetBoss(npc, runtime);
        player.message("§aАркеус сброшен в runtime-состояние.");
        event.setCanceled(true);
        return;
    }

    var state = runtime.state;
    player.message(
        "§7Arceus §f| mode: §e" + state.mode
        + "§f | phase: §e" + state.phase
        + "§f | transition: §e" + state.transitionTicksLeft
        + "§f | death: §e" + state.customDeathTicksLeft
    );
    player.message(
        "§7Damage §f| live: §e" + state.liveSnapshot.length
        + "§f | frozen: §e" + state.frozenSnapshot.length
        + "§f | rewards: §e" + (state.rewardsGiven ? "1" : "0")
        + "§f | cursor: §e" + state.rewardCursor
    );
    player.message(
        "§7Commit §f| announced: §e" + (state.leaderboardAnnounced ? "1" : "0")
        + "§f | committed: §e" + (state.deathCommitted ? "1" : "0")
        + "§f | err: §e" + state.debug.lastErrorHook
        + "§f | msg: §e" + state.debug.lastErrorMessage
    );
    player.message(
        "В§7RewardDbg В§f| reward: В§e" + state.debug.lastRewardError
        + "В§f | leaderboard: В§e" + state.debug.lastLeaderboardError
    );
    event.setCanceled(true);
}

function bindClockLinker(npc, player, item, runtime, shared) {
    var tag = getCustomTag(item);
    if (tag == null || !shared.utils.hasText(readTag(tag, "main_uuid"))) {
        player.message("§c[Часы] Некорректный линкер.");
        return;
    }

    tag.putString("target_uuid", shared.visuals.getNpcUuid(npc));
    tag.putString("target_name", shared.visuals.getNpcDisplayName(npc));

    if (!writeHeldTag(player, item, tag)) {
        player.message("§c[Часы] Не удалось записать Аркеуса в линкер.");
        return;
    }

    runtime.config.clockMainUuid = readTag(tag, "main_uuid");
    runtime.config.clockRespawnSeconds = shared.clock.readRespawnDelaySeconds(npc);
    shared.config.writeConfig(npc, runtime.config);
    shared.clock.notifyClockAlive(npc);
    player.message("§a[Часы] Аркеус привязан к часам.");
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
        return ("" + tag.getString(key)).replace(/^\s+|\s+$/g, "");
    } catch (e) {
        return "";
    }
}

function writeHeldTag(player, item, tag) {
    try {
        item.getMCItemStack().set(ArceusClock_DataComponents.CUSTOM_DATA, ArceusClock_CustomData.of(tag));
        player.setMainhandItem(item);
        return true;
    } catch (e) {
        return false;
    }
}
