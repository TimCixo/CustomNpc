var OP_PERMISSION_LEVEL = 2;

function trimString(value) {
    return ("" + value).replace(/^\s+|\s+$/g, "");
}

function hasText(value) {
    return value != null && trimString(value).length > 0;
}

function parseJsonSafe(raw) {
    if (raw == null || raw == "" || raw == "null") return null;
    try {
        return JSON.parse("" + raw);
    } catch (e) {
        return null;
    }
}

function parseIntSafe(value, fallback) {
    try {
        var parsed = parseInt("" + value, 10);
        return isNaN(parsed) ? fallback : parsed;
    } catch (e) {
        return fallback;
    }
}

function parseFloatSafe(value, fallback) {
    try {
        var parsed = parseFloat("" + value);
        return isNaN(parsed) ? fallback : parsed;
    } catch (e) {
        return fallback;
    }
}

function clampPositiveInt(value, fallback) {
    var parsed = parseIntSafe(value, fallback);
    return parsed < 1 ? fallback : parsed;
}

function positiveFloat(value, fallback) {
    var parsed = parseFloatSafe(value, fallback);
    return parsed > 0 ? parsed : fallback;
}

function escapeJsonString(value) {
    var text = value == null ? "" : "" + value;
    return text
        .replace(/\\/g, "\\\\")
        .replace(/"/g, "\\\"")
        .replace(/\r/g, "\\r")
        .replace(/\n/g, "\\n")
        .replace(/\t/g, "\\t");
}

function isOperator(player) {
    if (player == null) return false;

    try {
        var mcPlayer = player.getMCEntity();
        if (mcPlayer != null && mcPlayer.hasPermissions && mcPlayer.hasPermissions(OP_PERMISSION_LEVEL)) return true;
    } catch (e) {}

    try {
        var server = player.getMCEntity().level().getServer();
        var profile = player.getMCEntity().getGameProfile();
        if (server != null && server.getPlayerList && profile != null) {
            if (server.getPlayerList().isOp(profile)) return true;
        }
    } catch (e2) {}

    try {
        if (player.hasPermission && player.hasPermission(OP_PERMISSION_LEVEL)) return true;
    } catch (e3) {}

    return false;
}

module.exports = {
    OP_PERMISSION_LEVEL: OP_PERMISSION_LEVEL,
    trimString: trimString,
    hasText: hasText,
    parseJsonSafe: parseJsonSafe,
    parseIntSafe: parseIntSafe,
    parseFloatSafe: parseFloatSafe,
    clampPositiveInt: clampPositiveInt,
    positiveFloat: positiveFloat,
    escapeJsonString: escapeJsonString,
    isOperator: isOperator
};
