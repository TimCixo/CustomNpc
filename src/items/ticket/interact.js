var Ticket_DataComponents = Java.type("net.minecraft.core.component.DataComponents");

var TICKET_ITEM_TYPE = "pokemon_catch_ticket";
var RULES_DIALOG_ID = 54;
var COUNTING_MODE_KEY = "pokemon_multiplier_counting_mode";
var REGISTRATION_MODE_KEY = "pokemon_multiplier_registration_mode";

function interact(event) {
    var item = event.item;
    var player = event.player;
    var target = event.target;

    if (item == null || item.isEmpty() || player == null) return;
    if (!isTicketItem(item)) return;

    var mainNpc = resolveMainNpcFromTicket(item, player, target);
    if (!canOpenRulesDialog(mainNpc)) return;

    showRulesDialog(player, target != null ? target : mainNpc);
}

function isTicketItem(item) {
    var tag = getCustomTag(item);
    return tag != null && readTag(tag, "item_type") == TICKET_ITEM_TYPE;
}

function resolveMainNpcFromTicket(item, player, target) {
    var tag = getCustomTag(item);
    if (tag == null) return target;

    var mainUuid = readTag(tag, "main_uuid");
    if (!hasStoredValue(mainUuid)) return target;

    try {
        if (player != null) {
            var fromPlayerWorld = player.getWorld().getEntity(mainUuid);
            if (fromPlayerWorld != null) return fromPlayerWorld;
        }
    } catch (e1) {}

    try {
        if (target != null) {
            var fromTargetWorld = target.getWorld().getEntity(mainUuid);
            if (fromTargetWorld != null) return fromTargetWorld;
        }
    } catch (e2) {}

    return target;
}

function canOpenRulesDialog(mainNpc) {
    if (mainNpc == null) return true;

    try {
        var data = mainNpc.getStoreddata();
        if (data == null) return true;

        if (trimString(data.get(REGISTRATION_MODE_KEY)) == "1") return false;
        if (trimString(data.get(COUNTING_MODE_KEY)) == "1") return false;
    } catch (e) {}

    return true;
}

function showRulesDialog(player, target) {
    try {
        if (target != null && target.getName != null) {
            player.showDialog(RULES_DIALOG_ID, target.getName());
            return;
        }
    } catch (e1) {}

    try {
        player.showDialog(RULES_DIALOG_ID, "");
    } catch (e2) {}
}

function getCustomTag(item) {
    if (item == null || item.isEmpty()) return null;

    try {
        var customData = item.getMCItemStack().get(Ticket_DataComponents.CUSTOM_DATA);
        if (customData == null) return null;
        return customData.copyTag();
    } catch (e) {
        return null;
    }
}

function readTag(tag, key) {
    try {
        return "" + tag.getString(key);
    } catch (e) {
        return "";
    }
}

function hasStoredValue(value) {
    var text = trimString(value);
    return text.length > 0 && text != "null" && text != "undefined";
}

function trimString(value) {
    return ("" + value).replace(/^\s+|\s+$/g, "");
}
