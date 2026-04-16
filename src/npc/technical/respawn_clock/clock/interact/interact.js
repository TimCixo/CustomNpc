var RC_NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var RC_BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var RC_ResourceLocation = Java.type("net.minecraft.resources.ResourceLocation");
var RC_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var RC_CustomData = Java.type("net.minecraft.world.item.component.CustomData");
var RC_ItemLore = Java.type("net.minecraft.world.item.component.ItemLore");
var RC_Component = Java.type("net.minecraft.network.chat.Component");
var RC_MCItemStack = Java.type("net.minecraft.world.item.ItemStack");
var RC_CompoundTag = Java.type("net.minecraft.nbt.CompoundTag");
var RC_ArrayList = Java.type("java.util.ArrayList");
var RC_Items = Java.type("net.minecraft.world.item.Items");
var RC_InteractionHand = Java.type("net.minecraft.world.InteractionHand");

var RC_LINKER_TYPE = "respawn_clock_linker";
var RC_LINKED_TARGET_UUID_KEY = "respawn_clock_target_uuid";
var RC_LINKED_TARGET_NAME_KEY = "respawn_clock_target_name";
var RC_TARGET_DEAD_UNTIL_MS_KEY = "respawn_clock_target_dead_until_ms";
var RC_TARGET_ALIVE_KEY = "respawn_clock_target_alive";

function interact(event) {
    var npc = event.npc;
    var player = event.player;
    var item = player.getMainhandItem();

    if (isLinkerForClock(item, npc)) {
        bindTargetFromLinker(npc, player, item);
        event.setCanceled(true);
        return;
    }

    if (player.isSneaking() && isPlayerOperator(player)) {
        if (giveLinkerToPlayer(npc, player)) {
            player.message("§a[Часы] Линкер выдан.");
        } else {
            player.message("§c[Часы] Не удалось выдать линкер.");
        }
        event.setCanceled(true);
        return;
    }

    showClockStatus(npc, player);
    event.setCanceled(true);
}

function bindTargetFromLinker(npc, player, item) {
    var tag = getCustomTag(item);
    if (tag == null) {
        player.message("§c[Часы] Некорректный линкер.");
        return;
    }

    var targetUuid = safeTag(tag, "target_uuid");
    var targetName = safeTag(tag, "target_name");
    if (!hasText(targetUuid)) {
        player.message("§e[Часы] В линкере нет привязанной цели.");
        return;
    }

    var data = npc.getStoreddata();
    data.put(RC_LINKED_TARGET_UUID_KEY, targetUuid);
    data.put(RC_LINKED_TARGET_NAME_KEY, hasText(targetName) ? targetName : "NPC");
    data.put(RC_TARGET_DEAD_UNTIL_MS_KEY, "0");
    data.put(RC_TARGET_ALIVE_KEY, "1");

    consumeMainhandItem(player, item);
    updateClockDisplay(npc);

    player.message("§a[Часы] Цель привязана: §f" + (hasText(targetName) ? targetName : targetUuid));
}

function showClockStatus(npc, player) {
    var data = npc.getStoreddata();
    var targetName = trimString(data.get(RC_LINKED_TARGET_NAME_KEY));
    var targetUuid = trimString(data.get(RC_LINKED_TARGET_UUID_KEY));
    var alive = trimString(data.get(RC_TARGET_ALIVE_KEY)) == "1";
    var deadUntilMs = parseLongSafe(data.get(RC_TARGET_DEAD_UNTIL_MS_KEY), 0);
    var now = getNowMs();

    if (!hasText(targetUuid)) {
        player.message("§7[Часы] Цель не привязана.");
        return;
    }

    player.message("§7[Часы] Цель: §f" + (hasText(targetName) ? targetName : targetUuid));
    if (alive && deadUntilMs <= now) {
        player.message("§7[Часы] Статус: §aЖив");
        return;
    }

    player.message("§7[Часы] До возрождения: §c" + formatDurationMs(deadUntilMs - now));
}

function giveLinkerToPlayer(npc, player) {
    var item = createLinkerItem(npc);
    if (item == null || item.isEmpty()) return false;
    return giveItemToPlayer(player, item);
}

function createLinkerItem(npc) {
    try {
        var itemType = RC_BuiltInRegistries.ITEM.get(RC_ResourceLocation.parse("minecraft:clock"));
        if (itemType == null) return null;

        var mcStack = new RC_MCItemStack(itemType);
        var tag = new RC_CompoundTag();
        tag.putString("item_type", RC_LINKER_TYPE);
        tag.putString("linker_type", RC_LINKER_TYPE);
        tag.putString("main_uuid", getNpcUuid(npc));
        tag.putString("target_uuid", "");
        tag.putString("target_name", "");

        mcStack.set(RC_DataComponents.CUSTOM_DATA, RC_CustomData.of(tag));
        mcStack.set(RC_DataComponents.CUSTOM_NAME, RC_Component.literal("Линкер часов"));
        mcStack.set(RC_DataComponents.LORE, new RC_ItemLore(buildLore([
            "ПКМ по целевому NPC.",
            "Потом верни предмет обратно часам."
        ])));

        var item = RC_NpcAPI.Instance().getIItemStack(mcStack);
        if (item == null || item.isEmpty()) return null;
        item.setStackSize(1);
        return item;
    } catch (e) {
        return null;
    }
}

function isLinkerForClock(item, npc) {
    var tag = getCustomTag(item);
    if (tag == null) return false;
    return safeTag(tag, "linker_type") == RC_LINKER_TYPE
        && safeTag(tag, "main_uuid") == getNpcUuid(npc);
}

function getCustomTag(item) {
    if (item == null || item.isEmpty()) return null;
    try {
        var customData = item.getMCItemStack().get(RC_DataComponents.CUSTOM_DATA);
        if (customData == null) return null;
        return customData.copyTag();
    } catch (e) {
        return null;
    }
}

function safeTag(tag, key) {
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

function buildLore(lines) {
    var lore = new RC_ArrayList();
    for (var i = 0; i < lines.length; i++) {
        lore.add(RC_Component.literal(lines[i]));
    }
    return lore;
}

function giveItemToPlayer(player, item) {
    var given = false;
    try {
        given = player.giveItem(item);
    } catch (e) {}
    if (given) return true;

    try {
        var inv = player.getInventory();
        var size = inv == null ? 0 : inv.getSize();
        for (var i = 0; i < size; i++) {
            var slot = inv.getSlot(i);
            if (slot == null || slot.isEmpty()) {
                inv.setSlot(i, item);
                return true;
            }
        }
    } catch (e2) {}

    return false;
}

function consumeMainhandItem(player, item) {
    try {
        var size = item.getStackSize();
        if (size > 1) {
            item.setStackSize(size - 1);
        } else {
            player.getMCEntity().setItemInHand(
                RC_InteractionHand.MAIN_HAND,
                new RC_MCItemStack(RC_Items.AIR)
            );
        }
        player.updatePlayerInventory();
    } catch (e) {}
}

function isPlayerOperator(player) {
    if (player == null) return false;

    try {
        if (player.getMCEntity().hasPermissions(2)) return true;
    } catch (e) {}

    try {
        var server = player.getMCEntity().level().getServer();
        if (server != null && server.getPlayerList().isOp(player.getMCEntity().getGameProfile())) {
            return true;
        }
    } catch (e2) {}

    return false;
}

function updateClockDisplay(npc) {
    var data = npc.getStoreddata();
    var targetUuid = trimString(data.get(RC_LINKED_TARGET_UUID_KEY));
    if (!hasText(targetUuid)) {
        setClockTitle(npc, "§7Не привязан");
        return;
    }

    var deadUntilMs = parseLongSafe(data.get(RC_TARGET_DEAD_UNTIL_MS_KEY), 0);
    var alive = trimString(data.get(RC_TARGET_ALIVE_KEY)) == "1";
    var now = getNowMs();

    if (!alive || deadUntilMs > now) {
        setClockTitle(npc, "§c" + formatDurationMs(deadUntilMs - now));
        return;
    }

    setClockTitle(npc, "§aЖив");
}

function setClockTitle(npc, text) {
    try {
        npc.getDisplay().setTitle(text);
        npc.updateClient();
    } catch (e) {}
}

function formatDurationMs(ms) {
    var totalSeconds = Math.max(0, Math.floor(ms / 1000));
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;
    return pad2(hours) + ":" + pad2(minutes) + ":" + pad2(seconds);
}

function pad2(value) {
    return value < 10 ? "0" + value : "" + value;
}

function getNowMs() {
    return new Date().getTime();
}

function parseLongSafe(value, def) {
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
