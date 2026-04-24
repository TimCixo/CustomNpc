var itemUtils = require("item_utils.js");

var EnchantUtils_Enchantment = Java.type("net.minecraft.world.item.enchantment.Enchantment");
var EnchantUtils_EnchantmentHelper = Java.type("net.minecraft.world.item.enchantment.EnchantmentHelper");
var EnchantUtils_ItemEnchantments = Java.type("net.minecraft.world.item.enchantment.ItemEnchantments");
var EnchantUtils_ItemEnchantmentsMutable = Java.type("net.minecraft.world.item.enchantment.ItemEnchantments$Mutable");
var EnchantUtils_BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var EnchantUtils_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var EnchantUtils_ResourceLocation = Java.type("net.minecraft.resources.ResourceLocation");
var EnchantUtils_ResourceKey = Java.type("net.minecraft.resources.ResourceKey");
var EnchantUtils_Registries = Java.type("net.minecraft.core.registries.Registries");
var EnchantUtils_Items = Java.type("net.minecraft.world.item.Items");
var EnchantUtils_MCItemStack = Java.type("net.minecraft.world.item.ItemStack");

var MAX_ENCHANT_LEVEL = 10;

function parseLevel(value) {
    var level = parseInt("" + value, 10);
    if (isNaN(level) || level <= 0) return 0;
    return level;
}

function clampLevel(value) {
    var level = parseLevel(value);
    if (level <= 0) return 0;
    return level > MAX_ENCHANT_LEVEL ? MAX_ENCHANT_LEVEL : level;
}

function resolveResourceLocation(id) {
    try {
        return EnchantUtils_ResourceLocation.parse(id);
    } catch (e1) {
        try {
            return EnchantUtils_ResourceLocation.tryParse(id);
        } catch (e2) {
            return null;
        }
    }
}

function resolveEnchantment(id) {
    var location = resolveResourceLocation(id);
    if (location == null) return null;

    try {
        return EnchantUtils_BuiltInRegistries.ENCHANTMENT.get(location);
    } catch (e) {
        return null;
    }
}

function resolveHolder(id) {
    var enchantment = resolveEnchantment(id);
    if (enchantment == null) return null;

    try {
        if (enchantment.builtInRegistryHolder != null) {
            return enchantment.builtInRegistryHolder();
        }
    } catch (e1) {}

    try {
        var key = EnchantUtils_ResourceKey.create(
            EnchantUtils_Registries.ENCHANTMENT,
            resolveResourceLocation(id)
        );
        return EnchantUtils_BuiltInRegistries.ENCHANTMENT.getHolderOrThrow(key);
    } catch (e2) {}

    try {
        return EnchantUtils_BuiltInRegistries.ENCHANTMENT.wrapAsHolder(enchantment);
    } catch (e3) {
        return null;
    }
}

function getEnchantmentId(enchantment) {
    try {
        return "" + EnchantUtils_BuiltInRegistries.ENCHANTMENT.getKey(enchantment);
    } catch (e) {
        return "";
    }
}

function getEnchantmentIdFromEntryKey(value) {
    if (value == null) return "";

    try {
        return "" + value.unwrapKey().get().location().toString();
    } catch (e1) {}

    try {
        return "" + EnchantUtils_BuiltInRegistries.ENCHANTMENT.getKey(value.value());
    } catch (e2) {}

    try {
        return "" + EnchantUtils_BuiltInRegistries.ENCHANTMENT.getKey(value);
    } catch (e3) {}

    return "";
}

function isStoredEnchantedBookStack(mcStack) {
    return mcStack != null && !mcStack.isEmpty() && mcStack.getItem() == EnchantUtils_Items.ENCHANTED_BOOK;
}

function getPrimaryEnchantmentComponent(mcStack) {
    return isStoredEnchantedBookStack(mcStack)
        ? EnchantUtils_DataComponents.STORED_ENCHANTMENTS
        : EnchantUtils_DataComponents.ENCHANTMENTS;
}

function getSecondaryEnchantmentComponent(mcStack) {
    return isStoredEnchantedBookStack(mcStack)
        ? EnchantUtils_DataComponents.ENCHANTMENTS
        : EnchantUtils_DataComponents.STORED_ENCHANTMENTS;
}

function getEnchantmentsFromComponent(mcStack, componentType) {
    var map = {};
    if (mcStack == null || mcStack.isEmpty() || componentType == null) return map;

    try {
        var itemEnchants = mcStack.get(componentType);
        if (itemEnchants == null || itemEnchants.isEmpty()) return map;

        var iterator = itemEnchants.entrySet().iterator();
        while (iterator.hasNext()) {
            var entry = iterator.next();
            var id = getEnchantmentIdFromEntryKey(entry.getKey());
            var level = clampLevel(entry.getValue());
            if (!itemUtils.hasText(id) || level <= 0) continue;
            map[id] = level;
        }
    } catch (e) {}

    return map;
}

function getEnchantmentsFromHelper(mcStack) {
    var map = {};
    if (mcStack == null || mcStack.isEmpty()) return map;

    try {
        var itemEnchants = EnchantUtils_EnchantmentHelper.getEnchantments(mcStack);
        if (itemEnchants == null || itemEnchants.isEmpty()) return map;

        var iterator = itemEnchants.entrySet().iterator();
        while (iterator.hasNext()) {
            var entry = iterator.next();
            var id = getEnchantmentIdFromEntryKey(entry.getKey());
            var level = clampLevel(entry.getValue());
            if (!itemUtils.hasText(id) || level <= 0) continue;
            map[id] = level;
        }
    } catch (e) {}

    return map;
}

function hasEnchantments(map) {
    for (var key in map) {
        if (!map.hasOwnProperty(key)) continue;
        if (clampLevel(map[key]) > 0) return true;
    }
    return false;
}

function countEnchantments(map) {
    var count = 0;
    for (var key in map) {
        if (!map.hasOwnProperty(key)) continue;
        if (clampLevel(map[key]) <= 0) continue;
        count++;
    }
    return count;
}

function sanitizeEnchantMap(source) {
    var out = {};
    if (source == null) return out;

    for (var key in source) {
        if (!source.hasOwnProperty(key)) continue;
        var id = itemUtils.trimString(key);
        var level = clampLevel(source[key]);
        if (!itemUtils.hasText(id) || level <= 0) continue;
        out[id] = level;
    }

    return out;
}

function copyEnchantMap(source) {
    return sanitizeEnchantMap(source);
}

function areEnchantMapsEqual(left, right) {
    var leftMap = sanitizeEnchantMap(left);
    var rightMap = sanitizeEnchantMap(right);

    if (countEnchantments(leftMap) != countEnchantments(rightMap)) return false;

    for (var key in leftMap) {
        if (!leftMap.hasOwnProperty(key)) continue;
        if (!rightMap.hasOwnProperty(key)) return false;
        if (clampLevel(leftMap[key]) != clampLevel(rightMap[key])) return false;
    }

    return true;
}

function getEnchantmentsFromMcStack(mcStack) {
    var map = {};
    if (mcStack == null || mcStack.isEmpty()) return map;

    map = getEnchantmentsFromHelper(mcStack);
    if (hasEnchantments(map)) return map;

    map = getEnchantmentsFromComponent(mcStack, getPrimaryEnchantmentComponent(mcStack));
    if (hasEnchantments(map)) return map;

    return getEnchantmentsFromComponent(mcStack, getSecondaryEnchantmentComponent(mcStack));
}

function buildEnchantmentsResult(enchantMap) {
    var expected = sanitizeEnchantMap(enchantMap);
    var mutable = new EnchantUtils_ItemEnchantmentsMutable(EnchantUtils_ItemEnchantments.EMPTY);
    var missing = [];

    for (var enchantId in expected) {
        if (!expected.hasOwnProperty(enchantId)) continue;

        var holder = resolveHolder(enchantId);
        var level = expected[enchantId];
        if (holder == null || level <= 0) {
            missing.push(enchantId);
            continue;
        }

        try {
            mutable.set(holder, level);
        } catch (e) {
            missing.push(enchantId);
        }
    }

    return {
        ok: missing.length <= 0,
        expected: expected,
        immutable: mutable.toImmutable(),
        missing: missing
    };
}

function clearSecondaryComponent(mcStack) {
    try {
        mcStack.remove(getSecondaryEnchantmentComponent(mcStack));
    } catch (e) {}
}

function setBookEnchantmentsOnMcStack(mcStack, enchantMap) {
    if (mcStack == null || mcStack.isEmpty() || !isStoredEnchantedBookStack(mcStack)) return false;

    var built = buildEnchantmentsResult(enchantMap);
    if (!built.ok) return false;
    if (!hasEnchantments(built.expected)) return false;

    try {
        EnchantUtils_EnchantmentHelper.setEnchantments(mcStack, built.immutable);
        clearSecondaryComponent(mcStack);
        return areEnchantMapsEqual(getEnchantmentsFromMcStack(mcStack), built.expected);
    } catch (e) {
        return false;
    }
}

function setItemEnchantmentsOnMcStack(mcStack, enchantMap) {
    if (mcStack == null || mcStack.isEmpty() || isStoredEnchantedBookStack(mcStack)) return false;

    var built = buildEnchantmentsResult(enchantMap);
    if (!built.ok) return false;

    try {
        EnchantUtils_EnchantmentHelper.setEnchantments(mcStack, built.immutable);
        clearSecondaryComponent(mcStack);
        return areEnchantMapsEqual(getEnchantmentsFromMcStack(mcStack), built.expected);
    } catch (e1) {}

    try {
        mcStack.set(EnchantUtils_DataComponents.ENCHANTMENTS, built.immutable);
        clearSecondaryComponent(mcStack);
        return areEnchantMapsEqual(getEnchantmentsFromMcStack(mcStack), built.expected);
    } catch (e2) {
        return false;
    }
}

function isEnchantedBook(item) {
    if (itemUtils.isEmptyItem(item)) return false;
    var mcStack = itemUtils.getMcStack(item);
    if (mcStack == null || mcStack.isEmpty()) return false;

    return isStoredEnchantedBookStack(mcStack) && hasEnchantments(getEnchantmentsFromMcStack(mcStack));
}

function getEnchantments(item) {
    if (itemUtils.isEmptyItem(item)) return {};
    return getEnchantmentsFromMcStack(itemUtils.getMcStack(item));
}

function getEnchantmentEntries(item) {
    var map = getEnchantments(item);
    var out = [];

    for (var id in map) {
        if (!map.hasOwnProperty(id)) continue;
        out.push({
            id: id,
            level: map[id],
            label: getDisplayName(id, map[id])
        });
    }

    out.sort(function(a, b) {
        var left = itemUtils.trimString(a.label).toLowerCase();
        var right = itemUtils.trimString(b.label).toLowerCase();
        if (left < right) return -1;
        if (left > right) return 1;
        return 0;
    });
    return out;
}

function setEnchantments(item, enchantMap) {
    if (itemUtils.isEmptyItem(item)) return false;
    return setEnchantmentsOnMcStack(itemUtils.getMcStack(item), enchantMap);
}

function setEnchantmentsOnMcStack(mcStack, enchantMap) {
    if (mcStack == null || mcStack.isEmpty()) return false;
    if (isStoredEnchantedBookStack(mcStack)) return setBookEnchantmentsOnMcStack(mcStack, enchantMap);
    return setItemEnchantmentsOnMcStack(mcStack, enchantMap);
}

function removeEnchantment(item, enchantId) {
    var map = getEnchantments(item);
    if (!map.hasOwnProperty(enchantId)) return false;
    delete map[enchantId];
    return setEnchantments(item, map);
}

function createEnchantedBook(enchantId, level) {
    var map = {};
    map[enchantId] = clampLevel(level);
    return createEnchantedBookFromMap(map);
}

function createEnchantedBookFromMap(enchantMap) {
    var expected = sanitizeEnchantMap(enchantMap);
    if (!hasEnchantments(expected)) return null;

    try {
        var bookStack = new EnchantUtils_MCItemStack(EnchantUtils_Items.ENCHANTED_BOOK);
        if (bookStack == null || bookStack.isEmpty()) return null;
        if (!setBookEnchantmentsOnMcStack(bookStack, expected)) return null;

        var wrapped = itemUtils.wrapMcStack(bookStack);
        if (itemUtils.isEmptyItem(wrapped)) return null;
        if (!isEnchantedBook(wrapped)) return null;
        if (!areEnchantMapsEqual(getEnchantments(wrapped), expected)) return null;
        return wrapped;
    } catch (e) {
        return null;
    }
}

function supportsEnchantmentOnItem(enchantment, mcStack) {
    if (enchantment == null || mcStack == null || mcStack.isEmpty()) return false;

    try {
        if (!EnchantUtils_EnchantmentHelper.canHaveEnchantments(mcStack)) return false;
    } catch (e1) {}

    try {
        if (enchantment.isSupportedItem(mcStack)) return true;
    } catch (e2) {}

    try {
        if (enchantment.isPrimaryItem(mcStack)) return true;
    } catch (e3) {}

    try {
        if (enchantment.canEnchant(mcStack)) return true;
    } catch (e4) {}

    return false;
}

function canApplyEnchantmentToItem(enchantId, level, targetItem) {
    var enchantment = resolveEnchantment(enchantId);
    var mcStack = itemUtils.getMcStack(targetItem);
    if (enchantment == null || mcStack == null || mcStack.isEmpty()) return false;
    if (isStoredEnchantedBookStack(mcStack)) return false;

    var incomingLevel = clampLevel(level);
    if (incomingLevel <= 0) return false;
    if (!supportsEnchantmentOnItem(enchantment, mcStack)) return false;

    var currentMap = getEnchantments(targetItem);
    if (!canCoexistWithMap(enchantId, currentMap)) return false;

    var oldLevel = currentMap.hasOwnProperty(enchantId) ? clampLevel(currentMap[enchantId]) : 0;
    var newLevel = computeMergedLevel(oldLevel, incomingLevel);
    if (newLevel <= oldLevel) return false;

    var verifyCopy = mcStack.copy();
    var verifyMap = copyEnchantMap(currentMap);
    verifyMap[enchantId] = newLevel;
    return setItemEnchantmentsOnMcStack(verifyCopy, verifyMap);
}

function canEnchantmentsCoexist(enchantA, enchantB) {
    if (!itemUtils.hasText(enchantA) || !itemUtils.hasText(enchantB)) return false;
    if (enchantA == enchantB) return true;

    var holderA = resolveHolder(enchantA);
    var holderB = resolveHolder(enchantB);
    if (holderA == null || holderB == null) return false;

    try {
        return EnchantUtils_Enchantment.areCompatible(holderA, holderB);
    } catch (e) {
        return false;
    }
}

function canCoexistWithMap(enchantId, enchantMap) {
    for (var currentId in enchantMap) {
        if (!enchantMap.hasOwnProperty(currentId)) continue;
        if (currentId == enchantId) continue;
        if (!canEnchantmentsCoexist(enchantId, currentId)) return false;
    }
    return true;
}

function computeMergedLevel(existingLevel, incomingLevel) {
    var left = clampLevel(existingLevel);
    var right = clampLevel(incomingLevel);
    if (left <= 0) return right;
    if (right <= 0) return left;
    if (left == right) return clampLevel(left + 1);
    return clampLevel(Math.max(left, right));
}

function applyBookToTarget(bookItem, targetItem) {
    if (!isEnchantedBook(bookItem)) {
        return { ok: false, reason: "invalid_book", applied: [], skipped: [] };
    }

    if (itemUtils.isEmptyItem(targetItem)) {
        return { ok: false, reason: "invalid_target", applied: [], skipped: [] };
    }

    var targetMcStack = itemUtils.getMcStack(targetItem);
    if (targetMcStack == null || targetMcStack.isEmpty() || isStoredEnchantedBookStack(targetMcStack)) {
        return { ok: false, reason: "invalid_target", applied: [], skipped: [] };
    }

    var bookMap = getEnchantments(bookItem);
    var targetMap = getEnchantments(targetItem);
    var resultMap = copyEnchantMap(targetMap);
    var applied = [];
    var skipped = [];

    for (var enchantId in bookMap) {
        if (!bookMap.hasOwnProperty(enchantId)) continue;

        var incomingLevel = clampLevel(bookMap[enchantId]);
        var oldLevel = resultMap.hasOwnProperty(enchantId) ? clampLevel(resultMap[enchantId]) : 0;
        if (!canApplyEnchantmentToItem(enchantId, incomingLevel, targetItem)) {
            skipped.push(enchantId);
            continue;
        }

        if (!canCoexistWithMap(enchantId, resultMap)) {
            skipped.push(enchantId);
            continue;
        }

        var newLevel = computeMergedLevel(oldLevel, incomingLevel);
        if (newLevel <= oldLevel) {
            skipped.push(enchantId);
            continue;
        }

        resultMap[enchantId] = newLevel;
        applied.push({ id: enchantId, level: newLevel });
    }

    if (applied.length <= 0) {
        return { ok: false, reason: "incompatible", applied: [], skipped: skipped };
    }

    if (!setItemEnchantmentsOnMcStack(targetMcStack, resultMap)) {
        return { ok: false, reason: "write_failed", applied: [], skipped: skipped };
    }

    if (!areEnchantMapsEqual(getEnchantments(targetItem), resultMap)) {
        return { ok: false, reason: "write_failed", applied: [], skipped: skipped };
    }

    return { ok: true, reason: "", applied: applied, skipped: skipped };
}

function mergeBookEnchantments(firstMap, secondMap) {
    var resultMap = copyEnchantMap(firstMap);
    var incomingMap = copyEnchantMap(secondMap);
    var changed = [];
    var hadConflict = false;
    var maxLevelBlocked = false;

    if (!hasEnchantments(resultMap) || !hasEnchantments(incomingMap)) {
        return { ok: false, reason: "no_change", map: resultMap };
    }

    for (var enchantId in incomingMap) {
        if (!incomingMap.hasOwnProperty(enchantId)) continue;
        var incomingLevel = clampLevel(incomingMap[enchantId]);
        var oldLevel = resultMap.hasOwnProperty(enchantId) ? clampLevel(resultMap[enchantId]) : 0;

        if (oldLevel > 0) {
            if (oldLevel >= MAX_ENCHANT_LEVEL && incomingLevel >= MAX_ENCHANT_LEVEL) {
                maxLevelBlocked = true;
                continue;
            }

            var mergedLevel = computeMergedLevel(oldLevel, incomingLevel);
            if (mergedLevel > oldLevel) {
                resultMap[enchantId] = mergedLevel;
                changed.push(enchantId);
            }
            continue;
        }

        if (!canCoexistWithMap(enchantId, resultMap)) {
            hadConflict = true;
            continue;
        }

        resultMap[enchantId] = incomingLevel;
        changed.push(enchantId);
    }

    if (changed.length <= 0) {
        if (maxLevelBlocked) return { ok: false, reason: "max_level", map: copyEnchantMap(firstMap) };
        if (hadConflict) return { ok: false, reason: "incompatible", map: copyEnchantMap(firstMap) };
        return { ok: false, reason: "no_change", map: copyEnchantMap(firstMap) };
    }

    return {
        ok: true,
        reason: "",
        map: resultMap,
        changed: changed,
        hadConflict: hadConflict,
        maxLevelBlocked: maxLevelBlocked
    };
}

function toRoman(value) {
    var number = parseLevel(value);
    if (number <= 0) return "";

    var table = [
        [10, "X"],
        [9, "IX"],
        [5, "V"],
        [4, "IV"],
        [1, "I"]
    ];
    var out = "";
    for (var i = 0; i < table.length; i++) {
        while (number >= table[i][0]) {
            out += table[i][1];
            number -= table[i][0];
        }
    }
    return out;
}

function getDisplayName(enchantId, level) {
    var holder = resolveHolder(enchantId);
    if (holder != null) {
        try {
            return "" + EnchantUtils_Enchantment.getFullname(holder, clampLevel(level)).getString();
        } catch (e1) {}
    }

    var clean = itemUtils.trimString(enchantId);
    if (!itemUtils.hasText(clean)) clean = "unknown";
    return clean + " " + toRoman(level);
}

module.exports = {
    MAX_ENCHANT_LEVEL: MAX_ENCHANT_LEVEL,
    isEnchantedBook: isEnchantedBook,
    getEnchantments: getEnchantments,
    getEnchantmentEntries: getEnchantmentEntries,
    setEnchantments: setEnchantments,
    removeEnchantment: removeEnchantment,
    createEnchantedBook: createEnchantedBook,
    createEnchantedBookFromMap: createEnchantedBookFromMap,
    canApplyEnchantmentToItem: canApplyEnchantmentToItem,
    canEnchantmentsCoexist: canEnchantmentsCoexist,
    applyBookToTarget: applyBookToTarget,
    mergeBookEnchantments: mergeBookEnchantments,
    getDisplayName: getDisplayName,
    copyEnchantMap: copyEnchantMap,
    clampLevel: clampLevel
};
