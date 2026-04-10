function init(event) {
    var data = event.npc.getStoreddata();

    putDefault(data, "pokebattle_enabled", "1");
    putDefault(data, "pokebattle_species", "cobblemon:pikachu");
    putDefault(data, "pokebattle_level", "15");
    putDefault(data, "pokebattle_shiny", "0");
    putDefault(data, "pokebattle_spawn_visible", "0");
    putDefault(data, "pokebattle_heal_player_first", "0");
    putDefault(data, "pokebattle_clone_player_party", "0");
    putDefault(data, "pokebattle_flee_distance", "16");
    putDefault(data, "pokebattle_cooldown_ms", "3000");
    putDefault(data, "pokebattle_capture_message", "\u00a7c\u041d\u0435 \u0442\u0440\u0430\u0442\u044c \u043f\u043e\u043a\u0435\u0431\u043e\u043b. \u042d\u0442\u043e\u0433\u043e \u043f\u043e\u043a\u0435\u043c\u043e\u043d\u0430 \u043d\u0435\u043b\u044c\u0437\u044f \u043f\u043e\u0439\u043c\u0430\u0442\u044c.");

    migrateConfig(data);

    event.npc.timers.forceStart(31, 1, true);
}

function putDefault(data, key, value) {
    if (data.get(key) == null || ("" + data.get(key)).length == 0) {
        data.put(key, value);
    }
}

function migrateConfig(data) {
    var version = parseIntSafe(data.get("pokebattle_config_version"), 0);

    if (version < 2) {
        putDefault(data, "pokebattle_spawn_visible", "0");
    }

    if (version < 3) {
        if (data.get("pokebattle_flee_distance") == "-1") {
            data.put("pokebattle_flee_distance", "16");
        }
    }

    data.put("pokebattle_config_version", "3");
}

function parseIntSafe(value, def) {
    try {
        var parsed = parseInt("" + value, 10);
        return isNaN(parsed) ? def : parsed;
    } catch (e) {
        return def;
    }
}

function trimString(value) {
    return ("" + value).replace(/^\s+|\s+$/g, "");
}
