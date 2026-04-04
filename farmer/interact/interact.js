var H_RADIUS = 15;
var V_RADIUS = 15;
var CHEST_SEARCH_RADIUS = 16;
var TIMER_ID = 1;
var TIMER_TICKS = 10;
var MOVE_SPEED = 0.5;
var HARVEST_BATCH = 8;

var BlockPos = Java.type("net.minecraft.core.BlockPos");
var Container = Java.type("net.minecraft.world.Container");
var BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");

function interact(event) {
    var npc = event.npc;
    var p = event.player;

    var enabled = npc.getStoreddata().get("farm_enabled") == "1";
    if (enabled) {
        npc.getStoreddata().put("farm_enabled", "0");
        npc.getStoreddata().put("farm_state", "idle");
        stopNavigation(npc);
        p.message("§e[Фермер] Вимкнено.");
        return;
    }

    bindChestOnce(npc);

    p.message("§7--- Конфіг фермера ---");
    p.message("§7Радіус пошуку культур: §f" + H_RADIUS + "x" + H_RADIUS);
    p.message("§7Вертикаль: §f±" + V_RADIUS);
    p.message("§7Швидкість: §f" + MOVE_SPEED);
    p.message("§7Пачка збору: §f" + HARVEST_BATCH);
    p.message("§7Таймер: §f" + TIMER_TICKS + " тік");

    if (!hasBoundChest(npc)) {
        p.message("§cКонтейнер не прив'язаний. Постав сундук або бочку ближче і переспавнь NPC.");
        return;
    }

    p.message("§aКонтейнер прив'язаний: §f"
        + npc.getStoreddata().get("farm_chest_x") + ", "
        + npc.getStoreddata().get("farm_chest_y") + ", "
        + npc.getStoreddata().get("farm_chest_z"));

    npc.getStoreddata().put("farm_enabled", "1");
    npc.getStoreddata().put("farm_state", "search_crop");
    p.message("§a[Фермер] Увімкнено.");
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

    var best = null;
    var bestDist = 999999999;

    for (var y = cy - V_RADIUS; y <= cy + V_RADIUS; y++) {
        for (var x = cx - CHEST_SEARCH_RADIUS; x <= cx + CHEST_SEARCH_RADIUS; x++) {
            for (var z = cz - CHEST_SEARCH_RADIUS; z <= cz + CHEST_SEARCH_RADIUS; z++) {
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

function stopNavigation(npc) {
    try {
        npc.getMCEntity().getNavigation().stop();
    } catch (e) {}
}
