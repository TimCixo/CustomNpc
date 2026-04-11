var ARCEUS_TIMER_ID = 1;
var ARCEUS_DEATH_TIMER_ID = 2;
var ARCEUS_CONFIG_VERSION = 11;
var ArceusBoss_ArrayList = Java.type("java.util.ArrayList");
var ArceusBoss_CommandSource = Java.type("net.minecraft.commands.CommandSource");
var ARCEUS_CLOCK_MAIN_UUID_KEY = "respawn_clock_main_uuid";
var ARCEUS_CLOCK_RESPAWN_SECONDS_KEY = "respawn_clock_respawn_seconds";

function init(event) {
    var npc = event.npc;

    captureBaseTitle(npc);
    migrateConfig(npc);
    ensurePhaseAttackDelayDefaults(npc);

    putDefault(npc, "arceus_enabled", "1");
    putDefault(npc, "arceus_timer_ticks", "5");
    putDefault(npc, "arceus_phase2_threshold", "0.10");
    putDefault(npc, "arceus_phase3_threshold", "0.10");
    putDefault(npc, "arceus_phase2_heal_to", "0.72");
    putDefault(npc, "arceus_phase3_heal_to", "0.45");
    putDefault(npc, "arceus_transition_ticks", "40");
    putDefault(npc, "arceus_aggro_refresh_ms", "500");
    putDefault(npc, "arceus_phase2_regen_interval", "40");
    putDefault(npc, "arceus_phase3_regen_interval", "20");
    putDefault(npc, "arceus_phase2_regen_percent", "0.015");
    putDefault(npc, "arceus_phase3_regen_percent", "0.03");
    putDefault(npc, "arceus_phase2_damage_mult", "1.20");
    putDefault(npc, "arceus_phase3_damage_mult", "1.45");
    putDefault(npc, "arceus_phase3_flat_bonus", "4");
    putDefault(npc, "arceus_phase3_armor_bypass_bonus", "8.0");
    putDefault(npc, "arceus_phase1_melee_delay_mult", "1.0");
    putDefault(npc, "arceus_phase2_melee_delay_mult", "0.7");
    putDefault(npc, "arceus_phase3_melee_delay_mult", "0.5");
    putDefault(npc, "arceus_reflect_arrow_speed", "2.2");
    putDefault(npc, "arceus_reflect_arrow_inaccuracy", "0.2");
    putDefault(npc, "arceus_custom_death_ticks", "80");
    putDefault(npc, "arceus_custom_death_threshold_percent", "0.02");
    putDefault(npc, "arceus_custom_death_threshold_min_hp", "20");
    putDefault(npc, "arceus_death_timer_ticks", "1");
    putDefault(npc, "arceus_reward_batch_size", "1");
    putDefault(npc, "arceus_reward_interval_ticks", "20");
    putDefault(npc, "arceus_respawn_visual_reset_ticks", "20");
    putDefault(npc, "arceus_death_spin_step", "12");
    putDefault(npc, "arceus_death_explosion_power", "3.5");
    putDefault(npc, "arceus_death_animation_id", "5");
    putDefault(npc, "arceus_pinata_speed_min", "0.20");
    putDefault(npc, "arceus_pinata_speed_max", "0.55");
    putDefault(npc, "arceus_pinata_vertical_boost", "0.28");
    putDefault(npc, "arceus_phase2_pinata_item", "cobblemon:rare_candy");
    putDefault(npc, "arceus_phase2_total_drops_base", "8");
    putDefault(npc, "arceus_phase2_total_drops_per_extra_player", "4");
    putDefault(npc, "arceus_phase2_total_drops_max", "24");
    putDefault(npc, "arceus_phase3_total_drops_base", "3");
    putDefault(npc, "arceus_phase3_total_drops_per_extra_player", "2");
    putDefault(npc, "arceus_phase3_total_drops_max", "12");
    putDefault(npc, "arceus_stage2_sound", "cobblemon:pokemon.arceus.cry");
    putDefault(npc, "arceus_stage3_sound", "cobblemon:pokemon.arceus.cry");
    putDefault(npc, "arceus_death_sound", "cobblemon:pokemon.arceus.cry");
    putDefault(npc, "arceus_debug_runtime", "0");
    putDefault(npc, "arceus_debug_interval_ticks", "20");
    putDefault(npc, ARCEUS_CLOCK_MAIN_UUID_KEY, "");
    putDefault(npc, ARCEUS_CLOCK_RESPAWN_SECONDS_KEY, "" + readRespawnDelaySeconds(npc));

    resetBossState(npc);
    npc.timers.forceStart(ARCEUS_TIMER_ID, getCfgInt(npc, "arceus_timer_ticks", 5), true);
    try {
        npc.timers.stop(ARCEUS_DEATH_TIMER_ID);
    } catch (e0) {}
    announceArceusRespawn(npc);
    notifyClockAlive(npc);
}

function migrateConfig(npc) {
    var data = npc.getStoreddata();
    var version = parseIntSafe(data.get("arceus_config_version"), 0);

    if (version < 3) {
        data.put("arceus_phase2_threshold", "0.10");
        data.put("arceus_phase3_threshold", "0.10");
        data.put("arceus_debug_runtime", "0");
    }

    if (version < 4) {
        data.put("arceus_phase2_pinata_item", "cobblemon:rare_candy");
        data.put("arceus_stage2_sound", "cobblemon:pokemon.arceus.cry");
        data.put("arceus_stage3_sound", "cobblemon:pokemon.arceus.cry");
        data.put("arceus_death_sound", "cobblemon:pokemon.arceus.cry");
    }

    if (version < 5) {
        data.put("arceus_stage2_sound", "cobblemon:pokemon.arceus.cry");
        data.put("arceus_stage3_sound", "cobblemon:pokemon.arceus.cry");
        data.put("arceus_death_sound", "cobblemon:pokemon.arceus.cry");
    }

    if (version < 8) {
        migrateLegacyPhaseAttackDelays(npc);
    }

    if (version < 9) {
        data.put("arceus_phase2_total_drops_base", "8");
        data.put("arceus_phase2_total_drops_per_extra_player", "4");
        data.put("arceus_phase2_total_drops_max", "24");
        data.put("arceus_phase3_total_drops_base", "3");
        data.put("arceus_phase3_total_drops_per_extra_player", "2");
        data.put("arceus_phase3_total_drops_max", "12");
    }

    if (version < 10) {
        data.put("arceus_reward_interval_ticks", "10");
    }

    if (version < 11) {
        data.put("arceus_reward_interval_ticks", "20");
        data.put("arceus_state", "live");
        data.put("arceus_top_announce_index", "0");
        data.put("arceus_top_announce_done", "0");
        data.put("arceus_unexpected_died_state", "-");
    }

    data.put("arceus_config_version", "" + ARCEUS_CONFIG_VERSION);
}

function resetBossState(npc) {
    var data = npc.getStoreddata();
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

    applyPhaseMeleeDelay(npc, 1);
    armRespawnVisualReset(npc);
    resetLiveVisualState(npc);
}

function putDefault(npc, key, value) {
    if (!npc.getStoreddata().has(key)) {
        npc.getStoreddata().put(key, value);
    }
}

function captureBaseTitle(npc) {
    var data = npc.getStoreddata();
    if (data.has("arceus_base_title")) return;

    var title = "";
    try {
        if (npc.getDisplay && npc.getDisplay() && npc.getDisplay().getTitle) {
            title = "" + npc.getDisplay().getTitle();
        }
    } catch (e) {}

    if ((title == null || title == "" || title == "null")) {
        try {
            if (npc.display && npc.display.getTitle) {
                title = "" + npc.display.getTitle();
            }
        } catch (e2) {}
    }

    if (title == null || title == "null") title = "";
    data.put("arceus_base_title", title);
}

function getCfgInt(npc, key, def) {
    return parseIntSafe(npc.getStoreddata().get(key), def);
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

function armRespawnVisualReset(npc) {
    var data = npc.getStoreddata();
    var ticks = getCfgInt(npc, "arceus_respawn_visual_reset_ticks", 20);
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

function ensureHideDeadBody(npc) {
    try {
        npc.getStats().setHideDeadBody(true);
        return;
    } catch (e) {}
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

function ensurePhaseAttackDelayDefaults(npc) {
    var data = npc.getStoreddata();
    putDelayMultiplierDefault(data, "arceus_phase1_melee_delay_mult", "1.0");
    putDelayMultiplierDefault(data, "arceus_phase2_melee_delay_mult", "0.7");
    putDelayMultiplierDefault(data, "arceus_phase3_melee_delay_mult", "0.5");
}

function applyPhaseMeleeDelay(npc, phase) {
    try {
        var data = npc.getStoreddata();
        var baseDelay = getBaseMeleeDelay(npc, data);
        var delay = Math.max(1, Math.round(baseDelay * getPhaseMeleeDelayMultiplier(npc, phase)));
        npc.getStats().getMelee().setDelay(delay);
        data.put("arceus_applied_melee_phase", "" + phase);
    } catch (e) {}
}

function migrateLegacyPhaseAttackDelays(npc) {
    var data = npc.getStoreddata();
    if (data.has("arceus_phase1_melee_delay_mult")
        && data.has("arceus_phase2_melee_delay_mult")
        && data.has("arceus_phase3_melee_delay_mult")) {
        return;
    }

    var baseDelay = getBaseMeleeDelay(npc, data);
    if (baseDelay < 1) baseDelay = 12;

    var phase1Delay = parseIntSafe(data.get("arceus_phase1_melee_delay"), Math.max(1, Math.round(baseDelay * 1.0)));
    var phase2Delay = parseIntSafe(data.get("arceus_phase2_melee_delay"), Math.max(1, Math.round(baseDelay * 0.7)));
    var phase3Delay = parseIntSafe(data.get("arceus_phase3_melee_delay"), Math.max(1, Math.round(baseDelay * 0.5)));

    data.put("arceus_phase1_melee_delay_mult", formatDelayMultiplier(phase1Delay / baseDelay, 1.0));
    data.put("arceus_phase2_melee_delay_mult", formatDelayMultiplier(phase2Delay / baseDelay, 0.7));
    data.put("arceus_phase3_melee_delay_mult", formatDelayMultiplier(phase3Delay / baseDelay, 0.5));
}

function putDelayMultiplierDefault(data, key, value) {
    if (!data.has(key)) {
        data.put(key, value);
    }
}

function getBaseMeleeDelay(npc, data) {
    try {
        var value = npc.getStats().getMelee().getDelay();
        if (value >= 1) {
            var appliedPhase = parseIntSafe(data.get("arceus_applied_melee_phase"), 0);
            if (appliedPhase > 0) {
                var appliedMultiplier = getPhaseMeleeDelayMultiplier(npc, appliedPhase);
                if (appliedMultiplier > 0) {
                    return Math.max(1, Math.round(value / appliedMultiplier));
                }
            }
            return value;
        }
    } catch (e) {}
    return 12;
}

function getPhaseMeleeDelayMultiplier(npc, phase) {
    var key = "arceus_phase1_melee_delay_mult";
    var def = 1.0;
    if (phase == 2) {
        key = "arceus_phase2_melee_delay_mult";
        def = 0.7;
    } else if (phase >= 3) {
        key = "arceus_phase3_melee_delay_mult";
        def = 0.5;
    }

    var mult = parseFloatSafe(npc.getStoreddata().get(key), def);
    if (mult <= 0) return def;
    return mult;
}

function formatDelayMultiplier(value, def) {
    if (!(value > 0)) value = def;
    var rounded = Math.round(value * 1000) / 1000;
    return "" + rounded;
}

function announceArceusRespawn(npc) {
    var players;
    try {
        players = npc.getWorld().getAllPlayers();
    } catch (e) {
        players = null;
    }
    if (players == null || players.length <= 0) return;

    for (var i = 0; i < players.length; i++) {
        sendRespawnTeleportMessage(npc, players[i]);
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

function sendRespawnTeleportMessage(npc, player) {
    if (player == null) return;

    var playerName = getPlayerNameSafe(player);
    if (playerName == "") return;

    var json = '[{"text":"Аркеус возродился ","color":"green"},{"text":"[Телепортироваться]","color":"green","bold":true,"clickEvent":{"action":"run_command","value":"/warp arceus_coliseum"},"hoverEvent":{"action":"show_text","contents":{"text":"Телепортироваться к Аркеусу","color":"green"}}}]';
    runServerCommand(npc, 'tellraw ' + playerName + ' ' + json);
}

function getPlayerNameSafe(player) {
    try {
        var name = "" + player.getName();
        if (name != null && name != "" && name != "null") return name;
    } catch (e) {}
    return "";
}

function runServerCommand(npc, command) {
    try {
        var outputs = new ArceusBoss_ArrayList();
        var CapturingSource = Java.extend(ArceusBoss_CommandSource, {
            sendSystemMessage: function(component) {
                try {
                    outputs.add(component.getString());
                } catch (e1) {
                    outputs.add("" + component);
                }
            },
            acceptsSuccess: function() {
                return true;
            },
            acceptsFailure: function() {
                return true;
            },
            shouldInformAdmins: function() {
                return false;
            }
        });

        var server = npc.getMCEntity().level().getServer();
        var source = server.createCommandSourceStack()
            .withSource(new CapturingSource())
            .withPermission(4);

        server.getCommands().performPrefixedCommand(source, stripLeadingSlash(command));
    } catch (e) {}
}

function stripLeadingSlash(command) {
    var text = trimString(command);
    if (text.indexOf("/") === 0) {
        return text.substring(1);
    }
    return text;
}

function hasText(value) {
    return value != null && trimString(value).length > 0;
}

function trimString(s) {
    return ("" + s).replace(/^\s+|\s+$/g, "");
}
