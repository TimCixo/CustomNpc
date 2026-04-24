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

module.exports = {
    trimString: trimString,
    hasText: hasText,
    parseJsonSafe: parseJsonSafe,
    parseIntSafe: parseIntSafe,
    parseFloatSafe: parseFloatSafe,
    clampPositiveInt: clampPositiveInt,
    positiveFloat: positiveFloat
};
