// @ts-check

/**
 * @param {any} value
 * @returns {string}
 */
function text(value) {
    if (value == null) return "";
    return String(value).replace(/^\s+|\s+$/g, "");
}

/**
 * @param {any} value
 * @returns {boolean}
 */
function hasText(value) {
    return text(value).length > 0;
}

/**
 * @param {any} value
 * @param {number} fallback
 * @returns {number}
 */
function toInt(value, fallback) {
    var parsed = parseInt(text(value), 10);
    return isNaN(parsed) ? fallback : parsed;
}

/**
 * @param {any} raw
 * @param {any} fallback
 * @returns {any}
 */
function safeParseJson(raw, fallback) {
    var source = text(raw);
    if (!hasText(source) || source == "null" || source == "undefined") return fallback;

    try {
        return JSON.parse(source);
    } catch (e) {
        return fallback;
    }
}

/**
 * @param {any} value
 * @param {string} fallback
 * @returns {string}
 */
function safeStringifyJson(value, fallback) {
    try {
        return JSON.stringify(value);
    } catch (e) {
        return fallback;
    }
}

/**
 * @param {any} value
 * @returns {boolean}
 */
function isObject(value) {
    return value != null && typeof value == "object";
}

module.exports = {
    text: text,
    hasText: hasText,
    toInt: toInt,
    safeParseJson: safeParseJson,
    safeStringifyJson: safeStringifyJson,
    isObject: isObject
};
