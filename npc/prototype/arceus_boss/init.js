var ARCEUS_TIMER_ID = 1;
var ARCEUS_CONFIG_VERSION = 7;
var ArceusBoss_ArrayList = Java.type("java.util.ArrayList");
var ArceusBoss_CommandSource = Java.type("net.minecraft.commands.CommandSource");

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
    putDefault(npc, "arceus_phase2_regen_interval", "40");
    putDefault(npc, "arceus_phase3_regen_interval", "20");
    putDefault(npc, "arceus_phase2_regen_percent", "0.015");
    putDefault(npc, "arceus_phase3_regen_percent", "0.03");
    putDefault(npc, "arceus_phase2_damage_mult", "1.20");
    putDefault(npc, "arceus_phase3_damage_mult", "1.45");
    putDefault(npc, "arceus_phase3_flat_bonus", "4");
    putDefault(npc, "arceus_phase3_armor_bypass_bonus", "8.0");
    putDefault(npc, "arceus_phase1_melee_delay", "24");
    putDefault(npc, "arceus_phase2_melee_delay", "18");
    putDefault(npc, "arceus_phase3_melee_delay", "12");
    putDefault(npc, "arceus_reflect_arrow_speed", "2.2");
    putDefault(npc, "arceus_reflect_arrow_inaccuracy", "0.2");
    putDefault(npc, "arceus_custom_death_ticks", "80");
    putDefault(npc, "arceus_death_timer_ticks", "1");
    putDefault(npc, "arceus_death_spin_step", "12");
    putDefault(npc, "arceus_death_explosion_power", "3.5");
    putDefault(npc, "arceus_death_animation_id", "5");
    putDefault(npc, "arceus_pinata_speed_min", "0.20");
    putDefault(npc, "arceus_pinata_speed_max", "0.55");
    putDefault(npc, "arceus_pinata_vertical_boost", "0.28");
    putDefault(npc, "arceus_phase2_pinata_item", "cobblemon:rare_candy");
    putDefault(npc, "arceus_phase2_total_drops", "32");
    putDefault(npc, "arceus_phase3_total_drops", "12");
    putDefault(npc, "arceus_stage2_sound", "cobblemon:pokemon.arceus.cry");
    putDefault(npc, "arceus_stage3_sound", "cobblemon:pokemon.arceus.cry");
    putDefault(npc, "arceus_death_sound", "cobblemon:pokemon.arceus.cry");
    putDefault(npc, "arceus_debug_runtime", "0");
    putDefault(npc, "arceus_debug_interval_ticks", "20");

    resetBossState(npc);
    npc.timers.forceStart(ARCEUS_TIMER_ID, getCfgInt(npc, "arceus_timer_ticks", 5), true);
    announceArceusRespawn(npc);
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

    data.put("arceus_config_version", "" + ARCEUS_CONFIG_VERSION);
}

function resetBossState(npc) {
    var data = npc.getStoreddata();
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
    applyPhaseMeleeDelay(npc, 1);
    ensureBossBarEnabled(npc);
    applyBossBarColor(npc, "white");
    restoreNameplate(npc);
    restoreVisibleBody(npc);
    updateNpcClient(npc);
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
    if (data.has("arceus_phase3_melee_delay")) return;

    var baseDelay = 12;
    try {
        baseDelay = npc.getStats().getMelee().getDelay();
    } catch (e) {}

    if (baseDelay < 1) baseDelay = 12;

    data.put("arceus_phase3_melee_delay", "" + baseDelay);
    data.put("arceus_phase2_melee_delay", "" + Math.max(1, Math.floor(baseDelay * 1.5)));
    data.put("arceus_phase1_melee_delay", "" + Math.max(1, Math.floor(baseDelay * 2.0)));
}

function applyPhaseMeleeDelay(npc, phase) {
    var key = "arceus_phase1_melee_delay";
    if (phase == 2) key = "arceus_phase2_melee_delay";
    if (phase >= 3) key = "arceus_phase3_melee_delay";

    try {
        npc.getStats().getMelee().setDelay(getCfgInt(npc, key, phase >= 3 ? 12 : (phase == 2 ? 18 : 24)));
    } catch (e) {}
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

function trimString(s) {
    return ("" + s).replace(/^\s+|\s+$/g, "");
}
