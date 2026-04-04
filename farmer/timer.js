var TIMER_ID = 1;

var BlockPos = Java.type("net.minecraft.core.BlockPos");
var AABB = Java.type("net.minecraft.world.phys.AABB");
var ItemEntity = Java.type("net.minecraft.world.entity.item.ItemEntity");
var CropBlock = Java.type("net.minecraft.world.level.block.CropBlock");
var Container = Java.type("net.minecraft.world.Container");
var IntegerProperty = Java.type("net.minecraft.world.level.block.state.properties.IntegerProperty");
var BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var ResourceLocation = Java.type("net.minecraft.resources.ResourceLocation");
var TagKey = Java.type("net.minecraft.tags.TagKey");
var Registries = Java.type("net.minecraft.core.registries.Registries");
var MCItemStack = Java.type("net.minecraft.world.item.ItemStack");
var ArrayList = Java.type("java.util.ArrayList");

var CROPS_TAG = TagKey.create(Registries.BLOCK, ResourceLocation.parse("c:crops"));
var COBBLEMON_BERRIES_TAG = TagKey.create(Registries.BLOCK, ResourceLocation.parse("cobblemon:berries"));
var COBBLEMON_APRICORNS_TAG = TagKey.create(Registries.BLOCK, ResourceLocation.parse("cobblemon:apricorns"));

var FARMER_RUNTIME = {};

function timer(event) {
    if (event.id != TIMER_ID) return;

    var npc = event.npc;
    if (npc.getStoreddata().get("farm_enabled") != "1") return;

    ensureRuntime(npc);

    var state = String(npc.getStoreddata().get("farm_state"));
    if (state == "search_crop") {
        doSearchCrop(npc);
        return;
    }

    if (state == "move_to_crop") {
        doMoveToCrop(npc);
        return;
    }

    if (state == "harvest_crop") {
        doHarvestCrop(npc);
        return;
    }

    if (state == "move_to_chest") {
        doMoveToChest(npc);
        return;
    }

    if (state == "deposit") {
        doDeposit(npc);
        return;
    }

    npc.getStoreddata().put("farm_state", "search_crop");
}

function doSearchCrop(npc) {
    var level = npc.getMCEntity().level();
    var cropPos = findNearestMatureCrop(level, npc);
    var moveSpeed = getCfgFloat(npc, "farm_cfg_move_speed", 0.5);

    if (cropPos == null) {
        stopNavigation(npc);
        return;
    }

    setTargetPos(npc, cropPos);
    npc.getStoreddata().put("farm_state", "move_to_crop");
    moveNpcToPos(npc, cropPos, moveSpeed);
}

function doMoveToCrop(npc) {
    var pos = getTargetPos(npc);
    var cropReachSq = getCfgFloat(npc, "farm_cfg_crop_reach_sq", 3.0);
    var moveSpeed = getCfgFloat(npc, "farm_cfg_move_speed", 0.5);

    if (pos == null) {
        npc.getStoreddata().put("farm_state", "search_crop");
        return;
    }

    if (distanceSqToPos(npc, pos) <= cropReachSq) {
        stopNavigation(npc);
        npc.getStoreddata().put("farm_state", "harvest_crop");
        return;
    }

    moveNpcToPos(npc, pos, moveSpeed);
}

function doHarvestCrop(npc) {
    var level = npc.getMCEntity().level();
    var pos = getTargetPos(npc);
    var harvestBatch = getCfgInt(npc, "farm_cfg_harvest_batch", 8);

    if (pos == null) {
        npc.getStoreddata().put("farm_state", "search_crop");
        return;
    }

    var state = level.getBlockState(pos);
    if (!isTargetCrop(state) || !isMatureCrop(state)) {
        npc.getStoreddata().put("farm_state", "search_crop");
        return;
    }

    var ok = false;

    if (isCobblemonPlant(state)) {
        ok = harvestCobblemonPlant(level, pos, state, npc);
    } else {
        ok = harvestAndReplant(level, pos, state, npc);
        if (ok) {
            collectDropsIntoCargo(level, pos, npc);
        }
    }

    if (ok) {
        var batch = parseIntSafe(npc.getStoreddata().get("farm_batch_count"), 0) + 1;
        npc.getStoreddata().put("farm_batch_count", "" + batch);

        if (batch >= harvestBatch) {
            npc.getStoreddata().put("farm_state", "move_to_chest");
            moveNpcToChest(npc);
        } else {
            npc.getStoreddata().put("farm_state", "search_crop");
        }
    } else {
        npc.getStoreddata().put("farm_state", "search_crop");
    }
}

function doMoveToChest(npc) {
    var chestReachSq = getCfgFloat(npc, "farm_cfg_chest_reach_sq", 4.0);
    var moveSpeed = getCfgFloat(npc, "farm_cfg_move_speed", 0.5);

    if (!hasBoundChest(npc)) {
        npc.getStoreddata().put("farm_state", "search_crop");
        return;
    }

    var chestPos = getBoundChestPos(npc);
    if (distanceSqToPos(npc, chestPos) <= chestReachSq) {
        stopNavigation(npc);
        npc.getStoreddata().put("farm_state", "deposit");
        return;
    }

    moveNpcToPos(npc, chestPos, moveSpeed);
}

function doDeposit(npc) {
    var level = npc.getMCEntity().level();
    var chest = getBoundChestContainer(level, npc);

    if (chest == null) {
        npc.getStoreddata().put("farm_state", "search_crop");
        npc.getStoreddata().put("farm_batch_count", "0");
        clearCargo(npc);
        return;
    }

    var left = depositCargoToContainer(npc, chest);

    npc.getStoreddata().put("farm_batch_count", "0");

    if (left > 0) {
        npc.getStoreddata().put("farm_state", "move_to_chest");
        return;
    }

    npc.getStoreddata().put("farm_state", "search_crop");
}

function hasBoundChest(npc) {
    return npc.getStoreddata().has("farm_chest_x")
        && npc.getStoreddata().has("farm_chest_y")
        && npc.getStoreddata().has("farm_chest_z");
}

function getBoundChestPos(npc) {
    return BlockPos.containing(
        parseIntSafe(npc.getStoreddata().get("farm_chest_x"), 0),
        parseIntSafe(npc.getStoreddata().get("farm_chest_y"), 0),
        parseIntSafe(npc.getStoreddata().get("farm_chest_z"), 0)
    );
}

function getBoundChestContainer(level, npc) {
    if (!hasBoundChest(npc)) return null;
    var pos = getBoundChestPos(npc);
    var be = level.getBlockEntity(pos);
    if (be == null) return null;
    if (!(be instanceof Container)) return null;
    return be;
}

function findNearestMatureCrop(level, npc) {
    var cx = Math.floor(npc.getX());
    var cy = Math.floor(npc.getY());
    var cz = Math.floor(npc.getZ());
    var hRadius = getCfgInt(npc, "farm_cfg_h_radius", 15);
    var vRadius = getCfgInt(npc, "farm_cfg_v_radius", 15);

    var bestPos = null;
    var bestDist = 999999999;

    for (var y = cy - vRadius; y <= cy + vRadius; y++) {
        for (var x = cx - hRadius; x <= cx + hRadius; x++) {
            for (var z = cz - hRadius; z <= cz + hRadius; z++) {
                var pos = BlockPos.containing(x, y, z);
                var state = level.getBlockState(pos);

                if (!isTargetCrop(state)) continue;
                if (!isMatureCrop(state)) continue;

                var dx = x + 0.5 - npc.getX();
                var dy = y - npc.getY();
                var dz = z + 0.5 - npc.getZ();
                var d = dx * dx + dy * dy + dz * dz;

                if (d < bestDist) {
                    bestDist = d;
                    bestPos = pos;
                }
            }
        }
    }

    return bestPos;
}

function isTargetCrop(state) {
    if (state == null || state.isAir()) return false;

    var block = state.getBlock();

    try {
        if (block instanceof CropBlock) return true;
    } catch (e) {}

    try {
        if (state.is(CROPS_TAG)) return true;
    } catch (e2) {}

    if (isCobblemonPlant(state)) return true;

    return false;
}

function isCobblemonBerry(state) {
    if (state == null || state.isAir()) return false;

    try {
        if (state.is(COBBLEMON_BERRIES_TAG)) return true;
    } catch (e) {}

    var blockId = String(BuiltInRegistries.BLOCK.getKey(state.getBlock())).toLowerCase();
    return blockId.indexOf("cobblemon:") === 0 && blockId.indexOf("berry") !== -1;
}

function isCobblemonApricorn(state) {
    if (state == null || state.isAir()) return false;

    try {
        if (state.is(COBBLEMON_APRICORNS_TAG)) return true;
    } catch (e) {}

    var blockId = String(BuiltInRegistries.BLOCK.getKey(state.getBlock())).toLowerCase();
    return blockId.indexOf("cobblemon:") === 0 && blockId.indexOf("apricorn") !== -1;
}

function isCobblemonPlant(state) {
    return isCobblemonBerry(state) || isCobblemonApricorn(state);
}

function getAgeProperty(state) {
    try {
        var props = state.getProperties().iterator();
        while (props.hasNext()) {
            var prop = props.next();
            if (prop instanceof IntegerProperty && String(prop.getName()) == "age") {
                return prop;
            }
        }
    } catch (e) {}

    return null;
}

function getCurrentAge(state) {
    var ageProp = getAgeProperty(state);
    if (ageProp == null) return -1;

    try {
        return state.getValue(ageProp);
    } catch (e) {
        return -1;
    }
}

function isMatureCrop(state) {
    var block = state.getBlock();

    if (isCobblemonBerry(state)) {
        return getCurrentAge(state) >= 5;
    }

    if (isCobblemonApricorn(state)) {
        return getCurrentAge(state) >= 3;
    }

    try {
        if (block instanceof CropBlock) {
            return block.isMaxAge(state);
        }
    } catch (e2) {}

    try {
        var props = state.getProperties().iterator();
        while (props.hasNext()) {
            var prop = props.next();
            if (prop instanceof IntegerProperty && String(prop.getName()) == "age") {
                var currentAge = state.getValue(prop);
                var vals = prop.getPossibleValues().iterator();
                var maxAge = -999999;

                while (vals.hasNext()) {
                    var v = vals.next();
                    if (v > maxAge) maxAge = v;
                }

                return currentAge == maxAge;
            }
        }
    } catch (e3) {}

    return false;
}

function harvestAndReplant(level, pos, state, npc) {
    var block = state.getBlock();
    var broken = level.destroyBlock(pos, true, npc.getMCEntity());
    if (!broken) return false;

    try {
        level.setBlock(pos, block.defaultBlockState(), 3);
    } catch (e) {}

    return true;
}

function harvestCobblemonPlant(level, pos, state, npc) {
    var block = state.getBlock();
    var cargo = getCargo(npc);

    try {
        var replanted = state;
        var ageProp = getAgeProperty(state);

        if (ageProp != null) {
            if (isCobblemonBerry(state)) {
                replanted = state.setValue(ageProp, 3);
            } else if (isCobblemonApricorn(state)) {
                replanted = state.setValue(ageProp, 1);
            }
        }

        level.setBlock(pos, replanted, 3);

        if (isCobblemonBerry(state)) {
            var berryItemId = String(BuiltInRegistries.BLOCK.getKey(block));
            var berryDropCount = getCfgInt(npc, "farm_cfg_cobblemon_berry_drop_count", 3);
            var berryStack = npc.getWorld().createItem(berryItemId, 0, berryDropCount);
            if (berryStack != null && !berryStack.isEmpty()) {
                cargo.add(berryStack.getMCItemStack().copy());
            }
        } else if (isCobblemonApricorn(state)) {
            collectDropsIntoCargo(level, pos, npc);
        }

        return true;
    } catch (e) {
        return false;
    }
}

function collectDropsIntoCargo(level, pos, npc) {
    var pickupRadius = getCfgFloat(npc, "farm_cfg_pickup_radius", 1.8);
    var box = new AABB(
        pos.getX() + 0.5 - pickupRadius, pos.getY() - 0.5, pos.getZ() + 0.5 - pickupRadius,
        pos.getX() + 0.5 + pickupRadius, pos.getY() + 1.5, pos.getZ() + 0.5 + pickupRadius
    );

    var list = level.getEntitiesOfClass(ItemEntity.class, box);
    if (list == null || list.isEmpty()) return;

    var cargo = getCargo(npc);
    var it = list.iterator();

    while (it.hasNext()) {
        var ent = it.next();
        var stack = ent.getItem();
        if (stack != null && !stack.isEmpty()) {
            cargo.add(stack.copy());
        }
        ent.discard();
    }
}

function depositCargoToContainer(npc, container) {
    var cargo = getCargo(npc);
    if (cargo.isEmpty()) return 0;

    var i = 0;
    while (i < cargo.size()) {
        var stack = cargo.get(i);
        insertStackIntoContainer(container, stack);

        if (stack.isEmpty()) {
            cargo.remove(i);
        } else {
            i++;
        }
    }

    try {
        container.setChanged();
    } catch (e) {}

    return cargo.size();
}

function insertStackIntoContainer(container, stack) {
    if (stack == null || stack.isEmpty()) return;

    var size = container.getContainerSize();

    for (var i = 0; i < size; i++) {
        if (stack.isEmpty()) return;

        var slot = container.getItem(i);
        if (slot == null || slot.isEmpty()) continue;
        if (!MCItemStack.isSameItemSameComponents(slot, stack)) continue;

        var max = Math.min(slot.getMaxStackSize(), container.getMaxStackSize());
        var room = max - slot.getCount();
        if (room <= 0) continue;

        var move = Math.min(room, stack.getCount());
        if (move > 0) {
            slot.grow(move);
            stack.shrink(move);
            container.setItem(i, slot);
        }
    }

    for (var j = 0; j < size; j++) {
        if (stack.isEmpty()) return;

        var slot2 = container.getItem(j);
        if (slot2 != null && !slot2.isEmpty()) continue;

        var copy = stack.copy();
        var max2 = Math.min(copy.getMaxStackSize(), container.getMaxStackSize());
        if (copy.getCount() > max2) {
            copy.setCount(max2);
            stack.shrink(max2);
        } else {
            stack.setCount(0);
        }

        container.setItem(j, copy);
    }
}

function moveNpcToPos(npc, pos, speed) {
    npc.getMCEntity().getNavigation().moveTo(pos.getX() + 0.5, pos.getY(), pos.getZ() + 0.5, speed);
}

function moveNpcToChest(npc) {
    if (!hasBoundChest(npc)) return;
    moveNpcToPos(npc, getBoundChestPos(npc), getCfgFloat(npc, "farm_cfg_move_speed", 0.5));
}

function stopNavigation(npc) {
    try {
        npc.getMCEntity().getNavigation().stop();
    } catch (e) {}
}

function distanceSqToPos(npc, pos) {
    var dx = (pos.getX() + 0.5) - npc.getX();
    var dy = pos.getY() - npc.getY();
    var dz = (pos.getZ() + 0.5) - npc.getZ();
    return dx * dx + dy * dy + dz * dz;
}

function ensureRuntime(npc) {
    var id = String(npc.getMCEntity().getStringUUID());
    if (FARMER_RUNTIME[id] == null) {
        FARMER_RUNTIME[id] = {
            cargo: new ArrayList(),
            targetPos: null
        };
    }
}

function getRuntime(npc) {
    ensureRuntime(npc);
    return FARMER_RUNTIME[String(npc.getMCEntity().getStringUUID())];
}

function getCargo(npc) {
    return getRuntime(npc).cargo;
}

function clearCargo(npc) {
    getRuntime(npc).cargo.clear();
}

function setTargetPos(npc, pos) {
    getRuntime(npc).targetPos = pos;
}

function getTargetPos(npc) {
    return getRuntime(npc).targetPos;
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

function getCfgInt(npc, key, def) {
    return parseIntSafe(npc.getStoreddata().get(key), def);
}

function getCfgFloat(npc, key, def) {
    return parseFloatSafe(npc.getStoreddata().get(key), def);
}
