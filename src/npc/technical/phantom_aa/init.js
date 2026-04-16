var TIMER_ID = 1;

function init(event) {
    var npc = event.npc;

    putDefault(npc, "aa_enabled", "1");
    putDefault(npc, "aa_arrow_inaccuracy", "0.5");
    putDefault(npc, "aa_arrow_damage", "6.0");
    putDefault(npc, "aa_target_y_offset", "0.3");
    npc.getStoreddata().put("aa_range", "64");
    npc.getStoreddata().put("aa_fire_delay_ticks", "8");
    npc.getStoreddata().put("aa_arrow_speed", "4.2");

    npc.timers.forceStart(TIMER_ID, 5, true);
}

function putDefault(npc, key, value) {
    if (!npc.getStoreddata().has(key)) {
        npc.getStoreddata().put(key, value);
    }
}
