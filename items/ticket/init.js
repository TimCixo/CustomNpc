var Ticket_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var Ticket_CustomData = Java.type("net.minecraft.world.item.component.CustomData");
var Ticket_Component = Java.type("net.minecraft.network.chat.Component");
var Ticket_CompoundTag = Java.type("net.minecraft.nbt.CompoundTag");

var TICKET_ITEM_TYPE = "pokemon_catch_ticket";
var TICKET_MAX_DAMAGE = 100;
var TICKET_NAME = "Билет события";
var TICKET_TEXTURE_SLOT = 1;
var TICKET_TEXTURE_ID = "minecraft:paper";
var TICKET_DURABILITY_COLOR_LINKED = 5635925;

function init(event) {
    var item = event.item;
    if (item == null || item.isEmpty()) return;

    var mcStack = item.getMCItemStack();
    if (mcStack == null || mcStack.isEmpty()) return;

    var tag = readOrCreateTag(mcStack);
    tag.putString("item_type", TICKET_ITEM_TYPE);
    if (!hasText(readTag(tag, "main_uuid"))) tag.putString("main_uuid", "");
    if (!hasText(readTag(tag, "owner_uuid"))) tag.putString("owner_uuid", "");
    if (!hasText(readTag(tag, "owner_name"))) tag.putString("owner_name", "");

    var linked = hasText(readTag(tag, "main_uuid"));
    applyLegacyItemPresentation(item, linked);

    mcStack.set(Ticket_DataComponents.CUSTOM_DATA, Ticket_CustomData.of(tag));
    mcStack.set(Ticket_DataComponents.MAX_STACK_SIZE, java.lang.Integer.valueOf(1));
    mcStack.set(Ticket_DataComponents.CUSTOM_NAME, Ticket_Component.literal(TICKET_NAME));
}

function applyLegacyItemPresentation(item, linked) {
    try {
        if (item.setCustomName != null) item.setCustomName(TICKET_NAME);
    } catch (e1) {}

    try {
        if (item.setTexture != null) item.setTexture(TICKET_TEXTURE_SLOT, TICKET_TEXTURE_ID);
    } catch (e2) {}

    try {
        if (item.setMaxStackSize != null) item.setMaxStackSize(1);
    } catch (e3) {}

    if (!linked) {
        return;
    }
}
function readOrCreateTag(mcStack) {
    try {
        var customData = mcStack.get(Ticket_DataComponents.CUSTOM_DATA);
        if (customData != null) return customData.copyTag();
    } catch (e) {}
    return new Ticket_CompoundTag();
}

function readTag(tag, key) {
    try {
        return "" + tag.getString(key);
    } catch (e) {
        return "";
    }
}

function hasText(value) {
    return value != null && ("" + value).replace(/^\s+|\s+$/g, "").length > 0;
}
