var ArceusClock_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var ArceusClock_CustomData = Java.type("net.minecraft.world.item.component.CustomData");

var ARCEUS_CLOCK_LINKER_TYPE = "respawn_clock_linker";
var ARCEUS_CLOCK_MAIN_UUID_KEY = "respawn_clock_main_uuid";
var ARCEUS_CLOCK_RESPAWN_SECONDS_KEY = "respawn_clock_respawn_seconds";
var ARCEUS_DEATH_TIMER_ID = 2;

function interact(event) {
    var npc = event.npc;
    var player = event.player;
    var data = npc.getStoreddata();
    var item = player.getMainhandItem();

    if (isRespawnClockLinker(item)) {
        bindClockLinker(npc, player, item);
        event.setCanceled(true);
        return;
    }

    if (player.isSneaking()) {
        resetBoss(npc);
        player.message("§aАркеус сброшен: стадия 1, полное здоровье, кастомная смерть очищена.");
        event.setCanceled(true);
        return;
    }

    player.message(
        "§7Аркеус §f| state: §e" + data.get("arceus_state")
        + "§f | стадия: §e" + data.get("arceus_phase")
        + "§f | переход: §e" + data.get("arceus_transition_ticks_left")
        + "§f | смерть: §e" + data.get("arceus_dying")
    );
    player.message(
        "§7Death dbg §f| req: §e" + data.get("arceus_death_request")
        + "§f | reqSrc: §e" + data.get("arceus_death_request_source")
        + "§f | src: §e" + data.get("arceus_dbg_death_start_source")
        + "§f | hp: §e" + data.get("arceus_dbg_death_start_hp")
        + "§f/§e" + data.get("arceus_dbg_death_threshold_hp")
    );
    player.message(
        "§7Death state §f| lock: §e" + data.get("arceus_death_lock")
        + "§f | line: §e" + data.get("arceus_death_line_stage")
        + "§f | fin: §e" + data.get("arceus_death_finalized")
        + "§f | rewards: §e" + data.get("arceus_rewards_given")
        + "§f | queue: §e" + data.get("arceus_reward_queue_index")
        + "§f/§e" + data.get("arceus_reward_queue_size")
        + "§f | top: §e" + data.get("arceus_top_announce_index")
        + "§f/§e" + data.get("arceus_top_announce_done")
    );
    player.message(
        "§7Last error §f| hook: §e" + data.get("arceus_dbg_last_error_hook")
        + "§f | msg: §e" + data.get("arceus_dbg_last_error_message")
        + "§f | died: §e" + data.get("arceus_unexpected_died_state")
    );
    player.message(
        "§7Postkill §f| top: §e" + data.get("arceus_dbg_postkill_top_sent")
        + "§f | snap: §e" + data.get("arceus_dbg_snapshot_size")
        + "§f | reward: §e" + data.get("arceus_dbg_reward_cursor")
        + "§f | try: §e" + data.get("arceus_dbg_death_commit_attempted")
        + "§f | ok: §e" + data.get("arceus_dbg_death_commit_confirmed")
    );
    event.setCanceled(true);
}

function resetBoss(npc) {
    var data = npc.getStoreddata();
    data.put("arceus_enabled", "1");
    data.put("arceus_state", "live");
    data.put("arceus_phase", "1");
    data.put("arceus_transition_ticks_left", "0");
    data.put("arceus_dying", "0");
    data.put("arceus_death_ticks_left", "0");
    data.put("arceus_death_line_stage", "0");
    data.put("arceus_death_anim_started", "0");
    data.put("arceus_death_finalized", "0");
    data.put("arceus_death_committing", "0");
    data.put("arceus_death_lock", "0");
    data.put("arceus_death_request", "0");
    data.put("arceus_death_request_source", "-");
    data.put("arceus_death_request_hp", "0");
    data.put("arceus_death_request_threshold_hp", "0");
    data.put("arceus_damage_top_shown", "0");
    data.put("arceus_rewards_given", "0");
    data.put("arceus_reward_snapshot_raw", "");
    data.put("arceus_reward_queue_index", "0");
    data.put("arceus_reward_queue_size", "0");
    data.put("arceus_reward_finalize_ticks", "0");
    data.put("arceus_reward_wait_ticks", "0");
    data.put("arceus_top_announce_index", "0");
    data.put("arceus_top_announce_done", "0");
    data.put("arceus_live_snapshot_size", "0");
    data.put("arceus_unexpected_died_state", "-");
    data.put("arceus_pulse_ticks", "0");
    data.put("arceus_phase2_drops_given", "0");
    data.put("arceus_phase3_drops_given", "0");
    data.put("arceus_damage_participant_count", "0");
    data.put("arceus_phase_effects_pending", "0");
    data.put("arceus_phase_start_pending", "0");
    data.put("arceus_pending_phase_hp", "0");
    data.put("arceus_pending_phase_id", "1");
    data.put("arceus_pending_phase_line", "");
    data.put("arceus_pending_phase_color", "");
    data.put("arceus_pending_phase_sound", "");
    data.put("arceus_dbg_attack_calls", "0");
    data.put("arceus_dbg_phase3_blast_calls", "0");
    data.put("arceus_dbg_last_phase", "0");
    data.put("arceus_dbg_last_attack_damage", "0");
    data.put("arceus_dbg_last_target_id", "-");
    data.put("arceus_dbg_last_target_class", "-");
    data.put("arceus_dbg_last_blast_target_count", "0");
    data.put("arceus_dbg_last_non_player_hits", "0");
    data.put("arceus_dbg_runtime_ticks", "0");
    data.put("arceus_dbg_last_live_target_id", "-");
    data.put("arceus_dbg_last_live_target_class", "-");
    data.put("arceus_dbg_damage_entry_count", "0");
    data.put("arceus_dbg_resolved_entry_count", "0");
    data.put("arceus_dbg_unresolved_entry_count", "0");
    data.put("arceus_dbg_death_start_source", "-");
    data.put("arceus_dbg_death_start_hp", "0");
    data.put("arceus_dbg_death_threshold_hp", "0");
    data.put("arceus_dbg_last_error_hook", "-");
    data.put("arceus_dbg_last_error_message", "-");
    data.put("arceus_dbg_postkill_top_sent", "0");
    data.put("arceus_dbg_snapshot_size", "0");
    data.put("arceus_dbg_reward_cursor", "0");
    data.put("arceus_dbg_death_commit_attempted", "0");
    data.put("arceus_dbg_death_commit_confirmed", "0");
    data.put("arceus_applied_melee_phase", "0");
    clearDamageContributors(data);

    try {
        npc.setHealth(npc.getMaxHealth());
    } catch (e) {}

    restartNormalTimer(npc);
    stopDeathTimer(npc);
    applyPhaseMeleeDelay(npc, 1);
    armRespawnVisualReset(npc);
    resetLiveVisualState(npc);
    notifyClockAlive(npc);
}

function bindClockLinker(npc, player, item) {
    var tag = getCustomTag(item);
    if (tag == null || !hasText(readTag(tag, "main_uuid"))) {
        player.message("§c[Часы] Некорректный линкер.");
        return;
    }

    tag.putString("target_uuid", getNpcUuid(npc));
    tag.putString("target_name", getNpcDisplayName(npc));

    if (!writeHeldTag(player, item, tag)) {
        player.message("§c[Часы] Не удалось записать Аркеуса в линкер.");
        return;
    }

    npc.getStoreddata().put(ARCEUS_CLOCK_MAIN_UUID_KEY, readTag(tag, "main_uuid"));
    npc.getStoreddata().put(ARCEUS_CLOCK_RESPAWN_SECONDS_KEY, "" + readRespawnDelaySeconds(npc));
    notifyClockAlive(npc);
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

function writeHeldTag(player, item, tag) {
    try {
        item.getMCItemStack().set(ArceusClock_DataComponents.CUSTOM_DATA, ArceusClock_CustomData.of(tag));
        player.updatePlayerInventory();
        return true;
    } catch (e) {
        return false;
    }
}

function readTag(tag, key) {
    try {
        return "" + tag.getString(key);
    } catch (e) {
        return "";
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
        mainNpc.getDisplay().setTitle("§aЖив");
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

    return "Аркеус";
}

function clearDamageContributors(data) {
    data.put("arceus_damage_participant_count", "0");

    var keys = data.getKeys();
    if (keys == null) return;

    for (var i = 0; i < keys.length; i++) {
        var key = "" + keys[i];
        if (key.indexOf("arceus_dmg_") === 0
            || key.indexOf("arceus_dmg_name_") === 0
            || key.indexOf("arceus_recent_hits_") === 0
            || key.indexOf("arceus_recent_name_") === 0
            || key.indexOf("arceus_live_entry_") === 0
            || key.indexOf("arceus_godmode_disabled_") === 0
            || key.indexOf("arceus_reward_entry_") === 0) {
            data.remove(key);
        }
    }

    data.put("arceus_live_snapshot_size", "0");
    data.put("arceus_dbg_postkill_top_sent", "0");
    data.put("arceus_dbg_snapshot_size", "0");
    data.put("arceus_dbg_reward_cursor", "0");
    data.put("arceus_dbg_death_commit_attempted", "0");
    data.put("arceus_dbg_death_commit_confirmed", "0");
}

function applyPhaseMeleeDelay(npc, phase) {
    try {
        var data = npc.getStoreddata();
        var baseDelay = getBaseMeleeDelay(npc, data);
        var value = Math.max(1, Math.round(baseDelay * getPhaseMeleeDelayMultiplier(data, phase)));
        npc.getStats().getMelee().setDelay(value);
        data.put("arceus_applied_melee_phase", "" + phase);
    } catch (e) {}
}

function getBaseMeleeDelay(npc, data) {
    try {
        var value = npc.getStats().getMelee().getDelay();
        if (value >= 1) {
            var appliedPhase = parseIntSafe(data.get("arceus_applied_melee_phase"), 0);
            if (appliedPhase > 0) {
                var appliedMultiplier = getPhaseMeleeDelayMultiplier(data, appliedPhase);
                if (appliedMultiplier > 0) {
                    return Math.max(1, Math.round(value / appliedMultiplier));
                }
            }
            return value;
        }
    } catch (e) {}
    return 12;
}

function getPhaseMeleeDelayMultiplier(data, phase) {
    var key = "arceus_phase1_melee_delay_mult";
    var def = 1.0;
    if (phase == 2) {
        key = "arceus_phase2_melee_delay_mult";
        def = 0.7;
    } else if (phase >= 3) {
        key = "arceus_phase3_melee_delay_mult";
        def = 0.5;
    }

    var value = parseFloatSafe(data.get(key), def);
    if (value <= 0) return def;
    return value;
}

function parseIntSafe(s, def) {
    try {
        var value = parseInt("" + s, 10);
        return isNaN(value) ? def : value;
    } catch (e) {
        return def;
    }
}

function parseFloatSafe(s, def) {
    try {
        var value = parseFloat("" + s);
        return isNaN(value) ? def : value;
    } catch (e) {
        return def;
    }
}

function trimString(s) {
    return ("" + s).replace(/^\s+|\s+$/g, "");
}

function hasText(value) {
    return value != null && trimString(value).length > 0;
}

function restartNormalTimer(npc) {
    try {
        var timerTicks = parseIntSafe(npc.getStoreddata().get("arceus_timer_ticks"), 5);
        npc.timers.forceStart(1, timerTicks, true);
    } catch (e) {}
}

function stopDeathTimer(npc) {
    try {
        npc.timers.stop(ARCEUS_DEATH_TIMER_ID);
    } catch (e) {}
}

function ensureHideDeadBody(npc) {
    try {
        npc.getStats().setHideDeadBody(true);
        return;
    } catch (e) {}
}

function armRespawnVisualReset(npc) {
    var data = npc.getStoreddata();
    var ticks = parseIntSafe(data.get("arceus_respawn_visual_reset_ticks"), 20);
    if (ticks < 1) ticks = 1;

    data.put("arceus_respawn_visual_reset_pending", "1");
    data.put("arceus_respawn_visual_reset_ticks_left", "" + ticks);
}

function resetLiveVisualState(npc) {
    ensureHideDeadBody(npc);
    setNoAiState(npc, false);
    setEntityInvulnerable(npc, false);
    clearEntityDamageVisuals(npc);
    ensureBossBarEnabled(npc);
    applyBossBarColor(npc, "white");
    restoreNameplate(npc);
    restoreVisibleBody(npc);
    updateNpcClient(npc);
}

function setEntityInvulnerable(npc, enabled) {
    try {
        npc.getMCEntity().setInvulnerable(enabled ? true : false);
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

function ensureBossBarEnabled(npc) {
    try {
        if (npc.getDisplay && npc.getDisplay() && npc.getDisplay().setBossbar) {
            if (npc.getDisplay().getBossbar && npc.getDisplay().getBossbar() == 1) return;
            npc.getDisplay().setBossbar(1);
            return;
        }
    } catch (e) {}

    try {
        if (npc.display && npc.display.setBossbar) {
            npc.display.setBossbar(1);
            return;
        }
    } catch (e2) {}
}

function restoreVisibleBody(npc) {
    try {
        if (npc.getDisplay && npc.getDisplay()) {
            npc.getDisplay().setVisible(0);
            return;
        }
    } catch (e) {}

    try {
        if (npc.display) {
            npc.display.setVisible(0);
            return;
        }
    } catch (e2) {}
}

function restoreNameplate(npc) {
    var title = "" + npc.getStoreddata().get("arceus_base_title");
    if (title == null || title == "null") title = "";

    try {
        if (npc.getDisplay && npc.getDisplay()) {
            var display = npc.getDisplay();
            if (display.setTitle) display.setTitle(title);
            if (display.setShowName) display.setShowName(0);
            if (display.setNameVisible) display.setNameVisible(true);
            if (display.setShowNameplate) display.setShowNameplate(true);
            return;
        }
    } catch (e) {}

    try {
        if (npc.display) {
            if (npc.display.setTitle) npc.display.setTitle(title);
            if (npc.display.setShowName) npc.display.setShowName(0);
            if (npc.display.setNameVisible) npc.display.setNameVisible(true);
            if (npc.display.setShowNameplate) npc.display.setShowNameplate(true);
            return;
        }
    } catch (e2) {}
}

function applyBossBarColor(npc, colorName) {
    if (colorName == null || colorName == "") return;

    var colorId = mapBossBarColorId(colorName);

    try {
        if (npc.getDisplay && npc.getDisplay() && npc.getDisplay().setBossColor) {
            npc.getDisplay().setBossColor(colorId);
            return;
        }
    } catch (e) {}

    try {
        if (npc.display && npc.display.setBossColor) {
            npc.display.setBossColor(colorId);
            return;
        }
    } catch (e2) {}
}

function mapBossBarColorId(colorName) {
    var key = ("" + colorName).toLowerCase();
    if (key == "pink") return 0;
    if (key == "blue") return 1;
    if (key == "red") return 2;
    if (key == "green") return 3;
    if (key == "yellow") return 4;
    if (key == "purple") return 5;
    if (key == "white") return 6;
    return 6;
}

function updateNpcClient(npc) {
    try {
        npc.updateClient();
    } catch (e) {}
}

function setNoAiState(npc, enabled) {
    try {
        npc.getMCEntity().setNoAi(enabled ? true : false);
    } catch (e) {}
}
