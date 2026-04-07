var Ticket_DataComponents = Java.type("net.minecraft.core.component.DataComponents");

var TICKET_ITEM_TYPE = "pokemon_catch_ticket";
var RULES_DIALOG_ID = 54;
var MAIN_ENTRY_COUNT_KEY = "pokemon_multiplier_cycle_entry_count";
var CONFIG_COUNT_KEY = "pokemon_multiplier_config_count";
var CONFIG_WHITELIST_KEY = "pokemon_multiplier_config_whitelist";
var LOCAL_MAIN_UUID_KEY = "pokemon_catch_local_main_uuid";
var COUNTING_MODE_KEY = "pokemon_multiplier_counting_mode";
var REGISTRATION_MODE_KEY = "pokemon_multiplier_registration_mode";
var DEFAULT_MANAGER = "HunterTim";

function interact(event) {
    var item = event.item;
    var player = event.player;
    var target = event.target;

    if (item == null || item.isEmpty() || player == null) return;
    if (!isTicketItem(item)) return;
    if (isConfiguratorOperatorUse(target, player)) return;

    var mainNpc = resolveMainNpcFromTicket(item, player, target);
    if (!canOpenRulesDialog(mainNpc)) return;

    showRulesDialog(player, target != null ? target : mainNpc);
}

function isTicketItem(item) {
    var tag = getCustomTag(item);
    return tag != null && readTag(tag, "item_type") == TICKET_ITEM_TYPE;
}

function isCoordinatorMain(target) {
    if (target == null) return false;

    try {
        var data = target.getStoreddata();
        if (data == null) return false;
        return hasStoredValue(data.get(MAIN_ENTRY_COUNT_KEY));
    } catch (e) {
        return false;
    }
}

function resolveMainNpcFromTicket(item, player, target) {
    var tag = getCustomTag(item);
    if (tag == null) return isCoordinatorMain(target) ? target : null;

    var mainUuid = readTag(tag, "main_uuid");
    if (!hasStoredValue(mainUuid)) return isCoordinatorMain(target) ? target : null;

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

    return isCoordinatorMain(target) ? target : null;
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

function isConfiguratorOperatorUse(target, player) {
    if (!isConfiguratorNpc(target)) return false;
    return canManageConfigurator(target, player);
}

function isConfiguratorNpc(target) {
    if (target == null) return false;

    try {
        var data = target.getStoreddata();
        if (data == null) return false;
        return hasStoredValue(data.get(LOCAL_MAIN_UUID_KEY)) || hasStoredValue(data.get(CONFIG_COUNT_KEY));
    } catch (e) {
        return false;
    }
}

function canManageConfigurator(configNpc, player) {
    var whitelist = readConfiguratorWhitelist(configNpc);
    var names = normalizeWhitelistText(whitelist).split(/\s+/);
    var playerName = getPlayerName(player);

    for (var i = 0; i < names.length; i++) {
        if (names[i] == playerName) return true;
    }

    return false;
}

function readConfiguratorWhitelist(configNpc) {
    try {
        var configData = configNpc.getStoreddata();
        var ownWhitelist = trimString(configData.get(CONFIG_WHITELIST_KEY));
        if (hasStoredValue(ownWhitelist)) return ownWhitelist;

        var mainUuid = trimString(configData.get(LOCAL_MAIN_UUID_KEY));
        if (!hasStoredValue(mainUuid)) return DEFAULT_MANAGER;

        var mainNpc = configNpc.getWorld().getEntity(mainUuid);
        if (mainNpc == null) return DEFAULT_MANAGER;

        return trimString(mainNpc.getStoreddata().get(CONFIG_WHITELIST_KEY));
    } catch (e) {
        return DEFAULT_MANAGER;
    }
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

function getPlayerName(player) {
    try {
        return "" + player.getName();
    } catch (e) {
        return "" + player.getDisplayName();
    }
}

function normalizeWhitelistText(text) {
    var split = trimString(text).split(/\s+/);
    var out = [];
    var seen = {};

    for (var i = 0; i < split.length; i++) {
        var name = trimString(split[i]);
        if (!hasStoredValue(name)) continue;
        if (seen[name]) continue;
        seen[name] = true;
        out.push(name);
    }

    if (out.length == 0) out.push(DEFAULT_MANAGER);
    return out.join(" ");
}

function hasStoredValue(value) {
    var text = trimString(value);
    return text.length > 0 && text != "null" && text != "undefined";
}

function trimString(value) {
    return ("" + value).replace(/^\s+|\s+$/g, "");
}
