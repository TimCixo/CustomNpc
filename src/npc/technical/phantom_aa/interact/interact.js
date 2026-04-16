function interact(event) {
    var npc = event.npc;
    var player = event.player;

    if (npc.getStoreddata().get("aa_enabled") == "1") {
        npc.getStoreddata().put("aa_enabled", "0");
        player.message("§e[ПВО] Выключено.");
    } else {
        npc.getStoreddata().put("aa_enabled", "1");
        player.message("§a[ПВО] Включено.");
    }

    player.message("§7Радиус: §f" + getCfgRaw(npc, "aa_range"));
    player.message("§7Задержка выстрела: §f" + getCfgRaw(npc, "aa_fire_delay_ticks") + " тиков");
    player.message("§7Урон стрелы: §f" + getCfgRaw(npc, "aa_arrow_damage"));
}

function getCfgRaw(npc, key) {
    return "" + npc.getStoreddata().get(key);
}
