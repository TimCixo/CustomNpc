var TIMER_ID = 1;

var BlockPos = Java.type("net.minecraft.core.BlockPos");
var Container = Java.type("net.minecraft.world.Container");
var BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");

function init(event) {
    var npc = event.npc;

    ensureConfigDefaults(npc);
    bindChestOnce(npc);

    npc.getStoreddata().put("farm_enabled", "0");
    npc.getStoreddata().put("farm_state", "idle");
    npc.getStoreddata().put("farm_batch_count", "0");

    npc.timers.forceStart(TIMER_ID, getCfgInt(npc, "farm_cfg_timer_ticks", 10), true);
}

function ensureConfigDefaults(npc) {
    putDefault(npc, "farm_cfg_h_radius", "15");
    putDefault(npc, "farm_cfg_v_radius", "15");
    putDefault(npc, "farm_cfg_chest_search_radius", "16");
    putDefault(npc, "farm_cfg_timer_ticks", "10");
    putDefault(npc, "farm_cfg_move_speed", "0.5");
    putDefault(npc, "farm_cfg_harvest_batch", "8");
    putDefault(npc, "farm_cfg_crop_reach_sq", "3.0");
    putDefault(npc, "farm_cfg_chest_reach_sq", "4.0");
    putDefault(npc, "farm_cfg_pickup_radius", "1.8");
    putDefault(npc, "farm_cfg_cobblemon_berry_drop_count", "3");
}

function putDefault(npc, key, value) {
    if (!npc.getStoreddata().has(key)) {
        npc.getStoreddata().put(key, value);
    }
}

function bindChestOnce(npc) {
    if (hasBoundChest(npc)) return;

    var level = npc.getMCEntity().level();
    var chestPos = findNearestChestPos(level, npc);
    if (chestPos == null) return;

    npc.getStoreddata().put("farm_chest_x", "" + chestPos.getX());
    npc.getStoreddata().put("farm_chest_y", "" + chestPos.getY());
    npc.getStoreddata().put("farm_chest_z", "" + chestPos.getZ());
}

function hasBoundChest(npc) {
    return npc.getStoreddata().has("farm_chest_x")
        && npc.getStoreddata().has("farm_chest_y")
        && npc.getStoreddata().has("farm_chest_z");
}

function findNearestChestPos(level, npc) {
    var cx = Math.floor(npc.getX());
    var cy = Math.floor(npc.getY());
    var cz = Math.floor(npc.getZ());
    var vRadius = getCfgInt(npc, "farm_cfg_v_radius", 15);
    var chestRadius = getCfgInt(npc, "farm_cfg_chest_search_radius", 16);

    var best = null;
    var bestDist = 999999999;

    for (var y = cy - vRadius; y <= cy + vRadius; y++) {
        for (var x = cx - chestRadius; x <= cx + chestRadius; x++) {
            for (var z = cz - chestRadius; z <= cz + chestRadius; z++) {
                var pos = BlockPos.containing(x, y, z);
                var state = level.getBlockState(pos);
                if (state == null || state.isAir()) continue;

                var blockId = String(BuiltInRegistries.BLOCK.getKey(state.getBlock()));
                if (blockId.indexOf("chest") === -1 && blockId.indexOf("barrel") === -1) continue;

                var be = level.getBlockEntity(pos);
                if (be == null) continue;
                if (!(be instanceof Container)) continue;

                var dx = x - cx;
                var dy = y - cy;
                var dz = z - cz;
                var distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < bestDist) {
                    bestDist = distSq;
                    best = pos;
                }
            }
        }
    }

    return best;
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
