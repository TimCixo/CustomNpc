function interact(event) {
    var npc = event.npc;
    var player = event.player;
    var data = npc.getStoreddata();

    if (player.isSneaking()) {
        resetBoss(npc);
        player.message("§aАркеус сброшен: стадия 1, полное здоровье, кастомная смерть очищена.");
        event.setCanceled(true);
        return;
    }

    player.message(
        "§7Аркеус §f| стадия: §e" + data.get("arceus_phase")
        + "§f | переход: §e" + data.get("arceus_transition_ticks_left")
        + "§f | смерть: §e" + data.get("arceus_dying")
        + "§f | dead: §e" + data.get("arceus_dead")
    );
    event.setCanceled(true);
}

function resetBoss(npc) {
    var data = npc.getStoreddata();
    data.put("arceus_enabled", "1");
    data.put("arceus_phase", "1");
    data.put("arceus_transition_ticks_left", "0");
    data.put("arceus_dying", "0");
    data.put("arceus_death_ticks_left", "0");
    data.put("arceus_death_line_stage", "0");
    data.put("arceus_death_anim_started", "0");
    data.put("arceus_damage_top_shown", "0");
    data.put("arceus_rewards_given", "0");
    data.put("arceus_pulse_ticks", "0");
    data.put("arceus_dead", "0");
    data.put("arceus_dead_finalized", "0");
    data.put("arceus_dead_buried", "0");
    data.put("arceus_post_death_stage", "0");
    data.put("arceus_phase2_drops_given", "0");
    data.put("arceus_phase3_drops_given", "0");
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
    clearDamageContributors(data);

    try {
        npc.setHealth(npc.getMaxHealth());
    } catch (e) {}

    ensureHideDeadBody(npc);
    setNoAiState(npc, false);
    restartNormalTimer(npc);
    applyPhaseMeleeDelay(npc, 1);
    applyBossBarColor(npc, "white");
    restoreNameplate(npc);
    restoreVisibleBody(npc);
    updateNpcClient(npc);
}

function clearDamageContributors(data) {
    var keys = data.getKeys();
    if (keys == null) return;

    for (var i = 0; i < keys.length; i++) {
        var key = "" + keys[i];
        if (key.indexOf("arceus_dmg_") === 0
            || key.indexOf("arceus_dmg_name_") === 0
            || key.indexOf("arceus_recent_hits_") === 0
            || key.indexOf("arceus_recent_name_") === 0
            || key.indexOf("arceus_godmode_disabled_") === 0) {
            data.remove(key);
        }
    }
}

function applyPhaseMeleeDelay(npc, phase) {
    var key = "arceus_phase1_melee_delay";
    if (phase == 2) key = "arceus_phase2_melee_delay";
    if (phase >= 3) key = "arceus_phase3_melee_delay";

    try {
        var data = npc.getStoreddata();
        var value = parseIntSafe(data.get(key), phase >= 3 ? 12 : (phase == 2 ? 18 : 24));
        npc.getStats().getMelee().setDelay(value);
    } catch (e) {}
}

function parseIntSafe(s, def) {
    try {
        var value = parseInt("" + s, 10);
        return isNaN(value) ? def : value;
    } catch (e) {
        return def;
    }
}

function trimString(s) {
    return ("" + s).replace(/^\s+|\s+$/g, "");
}

function restartNormalTimer(npc) {
    try {
        var timerTicks = parseIntSafe(npc.getStoreddata().get("arceus_timer_ticks"), 5);
        npc.timers.forceStart(1, timerTicks, true);
    } catch (e) {}
}

function ensureHideDeadBody(npc) {
    try {
        npc.getStats().setHideDeadBody(true);
        return;
    } catch (e) {}
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
