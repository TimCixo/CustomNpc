var PM_NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var PM_BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var PM_ResourceLocation = Java.type("net.minecraft.resources.ResourceLocation");
var PM_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var PM_CustomData = Java.type("net.minecraft.world.item.component.CustomData");
var PM_ItemLore = Java.type("net.minecraft.world.item.component.ItemLore");
var PM_Component = Java.type("net.minecraft.network.chat.Component");
var PM_MCItemStack = Java.type("net.minecraft.world.item.ItemStack");
var PM_CompoundTag = Java.type("net.minecraft.nbt.CompoundTag");
var PM_ArrayList = Java.type("java.util.ArrayList");
var PM_Items = Java.type("net.minecraft.world.item.Items");
var PM_InteractionHand = Java.type("net.minecraft.world.InteractionHand");

var LINKER_TYPE = "npc_linker_bind_test";
var LINKED_CONFIG_UUID_KEY = "linker_bind_config_uuid";
var LINKED_COORD_UUID_KEY = "linker_bind_coord_uuid";
var CONFIG_TIMER_KEY = "linker_local_timer";
var CONFIG_INTERVAL_KEY = "linker_local_interval";
var CONFIG_MODE_KEY = "linker_local_mode";

var COORD_STATE_KEY = "linker_local_state";
var COORD_STAGE_KEY = "linker_local_stage";
var COORD_NOTE_KEY = "linker_local_note";

function interact(event) {
    var npc = event.npc;
    var player = event.player;
    var item = player.getMainhandItem();

    if (isLinkerForMain(item, npc)) {
        bindFromLinker(npc, player, item);
        event.setCanceled(true);
        return;
    }

    if (!giveLinkerToPlayer(npc, player)) {
        player.message("Failed to issue linker.");
    }
    showMainSummary(npc, player);
    event.setCanceled(true);
}

function giveLinkerToPlayer(npc, player) {
    var item = createLinkerItem(npc);
    if (item == null || item.isEmpty()) return false;
    return giveItemToPlayer(player, item);
}

function createLinkerItem(npc) {
    try {
        var itemType = PM_BuiltInRegistries.ITEM.get(PM_ResourceLocation.parse("minecraft:tripwire_hook"));
        if (itemType == null) return null;

        var mcStack = new PM_MCItemStack(itemType);
        var tag = new PM_CompoundTag();
        tag.putString("linker_type", LINKER_TYPE);
        tag.putString("main_uuid", getNpcUuid(npc));
        tag.putString("config_uuid", "");
        tag.putString("coord_uuid", "");

        mcStack.set(PM_DataComponents.CUSTOM_DATA, PM_CustomData.of(tag));
        mcStack.set(PM_DataComponents.CUSTOM_NAME, PM_Component.literal("Linker"));
        mcStack.set(PM_DataComponents.LORE, new PM_ItemLore(buildLore([
            "Use this to bind Configurator and Coordinator.",
            "Return it to Main to finalize linking."
        ])));

        var item = PM_NpcAPI.Instance().getIItemStack(mcStack);
        if (item == null || item.isEmpty()) return null;
        item.setStackSize(1);
        return item;
    } catch (e) {
        return null;
    }
}

function bindFromLinker(npc, player, item) {
    var tag = getCustomTag(item);
    if (tag == null) {
        player.message("Invalid linker.");
        return;
    }

    var configId = safeTag(tag, "config_uuid");
    var coordId = safeTag(tag, "coord_uuid");
    var data = npc.getStoreddata();

    if (hasText(configId)) data.put(LINKED_CONFIG_UUID_KEY, configId);
    if (hasText(coordId)) data.put(LINKED_COORD_UUID_KEY, coordId);

    consumeMainhandItem(player, item);
    showMainSummary(npc, player);
}

function showMainSummary(npc, player) {
    var data = npc.getStoreddata();
    var configNpc = resolveLinkedNpc(npc, LINKED_CONFIG_UUID_KEY);
    var coordNpc = resolveLinkedNpc(npc, LINKED_COORD_UUID_KEY);

    player.message("Config state: " + buildConfigSummary(configNpc));
    player.message("Coord state: " + buildCoordSummary(coordNpc));
}

function resolveLinkedNpc(mainNpc, linkKey) {
    var linkedUuid = "" + mainNpc.getStoreddata().get(linkKey);
    if (!hasText(linkedUuid)) return null;

    try {
        return mainNpc.getWorld().getEntity(linkedUuid);
    } catch (e) {
        return null;
    }
}

function buildConfigSummary(npc) {
    if (npc == null) return "not found";
    var data = npc.getStoreddata();
    return "timer=" + orDash(data.get(CONFIG_TIMER_KEY))
        + " interval=" + orDash(data.get(CONFIG_INTERVAL_KEY))
        + " mode=" + orDash(data.get(CONFIG_MODE_KEY));
}

function buildCoordSummary(npc) {
    if (npc == null) return "not found";
    var data = npc.getStoreddata();
    return "state=" + orDash(data.get(COORD_STATE_KEY))
        + " stage=" + orDash(data.get(COORD_STAGE_KEY))
        + " note=" + orDash(data.get(COORD_NOTE_KEY));
}

function isLinkerForMain(item, npc) {
    var tag = getCustomTag(item);
    if (tag == null) return false;
    return safeTag(tag, "linker_type") == LINKER_TYPE
        && safeTag(tag, "main_uuid") == getNpcUuid(npc);
}

function getCustomTag(item) {
    if (item == null || item.isEmpty()) return null;
    try {
        var customData = item.getMCItemStack().get(PM_DataComponents.CUSTOM_DATA);
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

function getNpcUuid(entity) {
    try {
        return "" + entity.getUUID();
    } catch (e) {
        return "";
    }
}

function buildLore(lines) {
    var lore = new PM_ArrayList();
    for (var i = 0; i < lines.length; i++) {
        lore.add(PM_Component.literal(lines[i]));
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
                PM_InteractionHand.MAIN_HAND,
                new PM_MCItemStack(PM_Items.AIR)
            );
        }
        player.updatePlayerInventory();
    } catch (e) {}
}

function hasText(value) {
    return value != null && ("" + value).replace(/^\s+|\s+$/g, "").length > 0;
}

function orDash(value) {
    return hasText(value) ? ("" + value) : "-";
}
