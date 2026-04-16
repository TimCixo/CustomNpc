var RCT_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var RCT_CustomData = Java.type("net.minecraft.world.item.component.CustomData");

var RCT_LINKER_TYPE = "respawn_clock_linker";
var RCT_MAIN_UUID_KEY = "respawn_clock_main_uuid";
var RCT_RESPAWN_SECONDS_KEY = "respawn_clock_respawn_seconds";

function interact(event) {
    var npc = event.npc;
    var player = event.player;
    var item = player.getMainhandItem();

    if (!isLinker(item)) return;

    var tag = getCustomTag(item);
    if (tag == null || !hasText(readTag(tag, "main_uuid"))) {
        player.message("§c[Часы] Некорректный линкер.");
        event.setCanceled(true);
        return;
    }

    tag.putString("target_uuid", getNpcUuid(npc));
    tag.putString("target_name", getNpcDisplayName(npc));

    if (!writeHeldTag(player, item, tag)) {
        player.message("§c[Часы] Не удалось записать цель в линкер.");
        event.setCanceled(true);
        return;
    }

    npc.getStoreddata().put(RCT_MAIN_UUID_KEY, readTag(tag, "main_uuid"));
    npc.getStoreddata().put(RCT_RESPAWN_SECONDS_KEY, "" + readRespawnDelaySeconds(npc));

    notifyClockAlive(npc);
    player.message("§a[Часы] Цель привязана к линкеру.");
    event.setCanceled(true);
}

function notifyClockAlive(npc) {
    var mainNpc = resolveClockMain(npc);
    if (mainNpc == null) return;

    var data = mainNpc.getStoreddata();
    data.put("respawn_clock_target_uuid", getNpcUuid(npc));
    data.put("respawn_clock_target_name", getNpcDisplayName(npc));
    data.put("respawn_clock_target_dead_until_ms", "0");
    data.put("respawn_clock_target_alive", "1");
}

function resolveClockMain(npc) {
    var mainUuid = trimString(npc.getStoreddata().get(RCT_MAIN_UUID_KEY));
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

    return parseIntSafe(npc.getStoreddata().get(RCT_RESPAWN_SECONDS_KEY), 300);
}

function isLinker(item) {
    var tag = getCustomTag(item);
    return tag != null && readTag(tag, "linker_type") == RCT_LINKER_TYPE;
}

function getCustomTag(item) {
    if (item == null || item.isEmpty()) return null;
    try {
        var customData = item.getMCItemStack().get(RCT_DataComponents.CUSTOM_DATA);
        if (customData == null) return null;
        return customData.copyTag();
    } catch (e) {
        return null;
    }
}

function writeHeldTag(player, item, tag) {
    try {
        item.getMCItemStack().set(RCT_DataComponents.CUSTOM_DATA, RCT_CustomData.of(tag));
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

function getNpcUuid(npc) {
    try {
        return "" + npc.getUUID();
    } catch (e) {
        return "";
    }
}

function getNpcDisplayName(npc) {
    try {
        if (npc.getDisplay() != null && npc.getDisplay().getTitle) {
            var title = "" + npc.getDisplay().getTitle();
            if (hasText(title) && title != "null") return title;
        }
    } catch (e) {}

    try {
        var name = "" + npc.getName();
        if (hasText(name) && name != "null") return name;
    } catch (e2) {}

    return "NPC";
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
