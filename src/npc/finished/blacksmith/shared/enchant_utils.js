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

function getMissingEnchantments(expected, actual) {
    var missing = [];
    var left = sanitizeEnchantMap(expected);
    var right = sanitizeEnchantMap(actual);
    var key;

    for (key in left) {
        if (!left.hasOwnProperty(key)) continue;
        if (!right.hasOwnProperty(key) || clampLevel(right[key]) != clampLevel(left[key])) {
            missing.push(key);
        }
    }

    for (key in right) {
        if (!right.hasOwnProperty(key)) continue;
        if (!left.hasOwnProperty(key)) {
            missing.push("unexpected:" + key);
        }
    }

    return missing;
}

function areEnchantMapsEqual(left, right) {
    return getMissingEnchantments(left, right).length <= 0;
}

function buildEnchantmentsResult(expectedMap, actualMap, phase, reason) {
    var expected = sanitizeEnchantMap(expectedMap);
    var actual = sanitizeEnchantMap(actualMap);
    var missing = getMissingEnchantments(expected, actual);
    var ok = missing.length <= 0;

    return {
        ok: ok,
        reason: ok ? "" : (itemUtils.hasText(reason) ? reason : "readback_mismatch"),
        expected: expected,
        actual: actual,
        missing: missing,
        phase: itemUtils.hasText(phase) ? phase : ""
    };
}

function buildFailureResult(reason, phase, expectedMap, actualMap) {
    return buildEnchantmentsResult(expectedMap, actualMap, phase, reason);
}

function buildMutableEnchantments(enchantMap, allowEmpty, phase) {
    var expected = sanitizeEnchantMap(enchantMap);
    var mutable = new EnchantUtils_ItemEnchantmentsMutable(EnchantUtils_ItemEnchantments.EMPTY);
    var missing = [];

    if (!allowEmpty && !hasEnchantments(expected)) {
        return {
            ok: false,
            reason: "no_enchantments",
            expected: expected,
            actual: {},
            missing: [],
            phase: phase,
            immutable: EnchantUtils_ItemEnchantments.EMPTY
        };
    }

    for (var enchantId in expected) {
        if (!expected.hasOwnProperty(enchantId)) continue;

        var holder = resolveHolder(enchantId);
        if (holder == null) {
            missing.push(enchantId);
            continue;
        }

        try {
            mutable.set(holder, expected[enchantId]);
        } catch (e) {
            missing.push(enchantId);
        }
    }

    return {
        ok: missing.length <= 0,
        reason: missing.length <= 0 ? "" : "unsupported",
        expected: expected,
        actual: {},
        missing: missing,
        phase: phase,
        immutable: mutable.toImmutable()
    };
}

function getEnchantmentsFromMcStack(mcStack) {
    var map = {};
    if (mcStack == null || mcStack.isEmpty()) return map;

    if (isStoredEnchantedBookStack(mcStack)) {
        map = getEnchantmentsFromComponent(mcStack, EnchantUtils_DataComponents.STORED_ENCHANTMENTS);
        if (hasEnchantments(map)) return map;
        map = getEnchantmentsFromHelper(mcStack);
        if (hasEnchantments(map)) return map;
        return getEnchantmentsFromComponent(mcStack, EnchantUtils_DataComponents.ENCHANTMENTS);
    }

    map = getEnchantmentsFromHelper(mcStack);
    if (hasEnchantments(map)) return map;

    map = getEnchantmentsFromComponent(mcStack, EnchantUtils_DataComponents.ENCHANTMENTS);
    if (hasEnchantments(map)) return map;

    return getEnchantmentsFromComponent(mcStack, EnchantUtils_DataComponents.STORED_ENCHANTMENTS);
}

function clearSecondaryComponent(mcStack) {
    try {
        mcStack.remove(getSecondaryEnchantmentComponent(mcStack));
    } catch (e) {}
}

function setBookEnchantmentsOnMcStack(mcStack, enchantMap) {
    if (mcStack == null || mcStack.isEmpty() || !isStoredEnchantedBookStack(mcStack)) {
        return buildFailureResult("invalid_book", "book_precheck", enchantMap, {});
    }

    var built = buildMutableEnchantments(enchantMap, false, "book_build");
    if (!built.ok) return built;

    try {
        mcStack.set(EnchantUtils_DataComponents.STORED_ENCHANTMENTS, built.immutable);
        clearSecondaryComponent(mcStack);
    } catch (e) {
        return buildFailureResult("write_failed", "book_write", built.expected, getEnchantmentsFromMcStack(mcStack));
    }

    return buildEnchantmentsResult(built.expected, getEnchantmentsFromMcStack(mcStack), "book_readback");
}

function setItemEnchantmentsOnMcStack(mcStack, enchantMap) {
    if (mcStack == null || mcStack.isEmpty() || isStoredEnchantedBookStack(mcStack)) {
        return buildFailureResult("invalid_target", "item_precheck", enchantMap, {});
    }

    var built = buildMutableEnchantments(enchantMap, true, "item_build");
    if (!built.ok) return built;

    try {
        EnchantUtils_EnchantmentHelper.setEnchantments(mcStack, built.immutable);
        clearSecondaryComponent(mcStack);
    } catch (e1) {
        try {
            mcStack.set(EnchantUtils_DataComponents.ENCHANTMENTS, built.immutable);
            clearSecondaryComponent(mcStack);
        } catch (e2) {
            return buildFailureResult("write_failed", "item_write", built.expected, getEnchantmentsFromMcStack(mcStack));
        }
    }

    return buildEnchantmentsResult(built.expected, getEnchantmentsFromMcStack(mcStack), "item_readback");
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
    if (itemUtils.isEmptyItem(item)) {
        return buildFailureResult("invalid_target", "item_wrapper_precheck", enchantMap, {});
    }
    return setEnchantmentsOnMcStack(itemUtils.getMcStack(item), enchantMap);
}

function setEnchantmentsOnMcStack(mcStack, enchantMap) {
    if (mcStack == null || mcStack.isEmpty()) {
        return buildFailureResult("invalid_target", "stack_precheck", enchantMap, {});
    }
    if (isStoredEnchantedBookStack(mcStack)) return setBookEnchantmentsOnMcStack(mcStack, enchantMap);
    return setItemEnchantmentsOnMcStack(mcStack, enchantMap);
}

function removeEnchantment(item, enchantId) {
    var map = getEnchantments(item);
    if (!map.hasOwnProperty(enchantId)) {
        return buildFailureResult("invalid_target", "remove_precheck", map, map);
    }
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
    if (!hasEnchantments(expected)) {
        return buildFailureResult("no_enchantments", "book_create_precheck", expected, {});
    }

    try {
        var bookStack = new EnchantUtils_MCItemStack(EnchantUtils_Items.ENCHANTED_BOOK);
        if (bookStack == null || bookStack.isEmpty()) {
            return buildFailureResult("write_failed", "book_create_stack", expected, {});
        }

        var writeResult = setBookEnchantmentsOnMcStack(bookStack, expected);
        if (!writeResult.ok) return writeResult;

        var wrapped = itemUtils.wrapMcStack(bookStack);
        if (itemUtils.isEmptyItem(wrapped)) {
            return buildFailureResult("write_failed", "book_wrap", expected, getEnchantmentsFromMcStack(bookStack));
        }

        var wrappedResult = buildEnchantmentsResult(expected, getEnchantments(wrapped), "book_wrap_readback");
        if (!wrappedResult.ok) return wrappedResult;

        wrappedResult.item = wrapped;
        wrappedResult.mcStack = bookStack;
        return wrappedResult;
    } catch (e) {
        return buildFailureResult("write_failed", "book_create_exception", expected, {});
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

function canApplyEnchantmentToMcStack(enchantId, level, mcStack, baseMap) {
    var enchantment = resolveEnchantment(enchantId);
    var currentMap = copyEnchantMap(baseMap == null ? getEnchantmentsFromMcStack(mcStack) : baseMap);
    var incomingLevel = clampLevel(level);

    if (mcStack == null || mcStack.isEmpty() || isStoredEnchantedBookStack(mcStack)) {
        return buildFailureResult("invalid_target", "apply_precheck", currentMap, currentMap);
    }

    if (enchantment == null || incomingLevel <= 0) {
        return buildFailureResult("unsupported", "apply_precheck", currentMap, currentMap);
    }

    if (!supportsEnchantmentOnItem(enchantment, mcStack)) {
        return buildFailureResult("unsupported", "apply_support", currentMap, currentMap);
    }

    if (!canCoexistWithMap(enchantId, currentMap)) {
        return buildFailureResult("conflict", "apply_conflict", currentMap, currentMap);
    }

    var oldLevel = currentMap.hasOwnProperty(enchantId) ? clampLevel(currentMap[enchantId]) : 0;
    var newLevel = computeMergedLevel(oldLevel, incomingLevel);
    if (newLevel <= oldLevel) {
        return buildFailureResult("no_upgrade", "apply_upgrade", currentMap, currentMap);
    }

    var verifyMap = copyEnchantMap(currentMap);
    verifyMap[enchantId] = newLevel;
    var verifyCopy = mcStack.copy();
    var verifyResult = setItemEnchantmentsOnMcStack(verifyCopy, verifyMap);
    verifyResult.newLevel = newLevel;
    return verifyResult;
}

function canApplyEnchantmentToItem(enchantId, level, targetItem) {
    var mcStack = itemUtils.getMcStack(targetItem);
    return canApplyEnchantmentToMcStack(enchantId, level, mcStack, getEnchantments(targetItem));
}

function applyBookToLiveMainhand(player, bookItem) {
    if (!isEnchantedBook(bookItem)) {
        return {
            ok: false,
            reason: "invalid_book",
            applied: [],
            skipped: [],
            expected: {},
            actual: {},
            missing: [],
            phase: "apply_book_precheck"
        };
    }

    var workingCopy = itemUtils.cloneLiveMainhandMcStack(player);
    if (workingCopy == null || workingCopy.isEmpty() || isStoredEnchantedBookStack(workingCopy)) {
        return {
            ok: false,
            reason: "invalid_target",
            applied: [],
            skipped: [],
            expected: {},
            actual: {},
            missing: [],
            phase: "apply_target_precheck"
        };
    }

    var bookMap = getEnchantments(bookItem);
    var resultMap = copyEnchantMap(getEnchantmentsFromMcStack(workingCopy));
    var applied = [];
    var skipped = [];
    var firstFailure = null;

    for (var enchantId in bookMap) {
        if (!bookMap.hasOwnProperty(enchantId)) continue;

        var applyCheck = canApplyEnchantmentToMcStack(enchantId, bookMap[enchantId], workingCopy, resultMap);
        if (!applyCheck.ok) {
            skipped.push(enchantId);
            if (firstFailure == null) firstFailure = applyCheck;
            continue;
        }

        resultMap[enchantId] = applyCheck.newLevel;
        applied.push({ id: enchantId, level: applyCheck.newLevel });
    }

    if (applied.length <= 0) {
        if (firstFailure == null) firstFailure = buildFailureResult("no_upgrade", "apply_no_change", resultMap, resultMap);
        firstFailure.applied = [];
        firstFailure.skipped = skipped;
        return firstFailure;
    }

    var writeResult = setItemEnchantmentsOnMcStack(workingCopy, resultMap);
    if (!writeResult.ok) {
        writeResult.applied = applied;
        writeResult.skipped = skipped;
        return writeResult;
    }

    var commitResult = itemUtils.commitHeldMcStack(player, workingCopy, function(readBackMcStack) {
        return buildEnchantmentsResult(resultMap, getEnchantmentsFromMcStack(readBackMcStack), "apply_commit_readback");
    });
    commitResult.applied = applied;
    commitResult.skipped = skipped;
    return commitResult;
}

function setLiveMainhandEnchantments(player, enchantMap) {
    var workingCopy = itemUtils.cloneLiveMainhandMcStack(player);
    if (workingCopy == null || workingCopy.isEmpty() || isStoredEnchantedBookStack(workingCopy)) {
        return buildFailureResult("invalid_target", "live_set_precheck", enchantMap, {});
    }

    var writeResult = setItemEnchantmentsOnMcStack(workingCopy, enchantMap);
    if (!writeResult.ok) return writeResult;

    return itemUtils.commitHeldMcStack(player, workingCopy, function(readBackMcStack) {
        return buildEnchantmentsResult(enchantMap, getEnchantmentsFromMcStack(readBackMcStack), "live_set_commit_readback");
    });
}

function removeEnchantmentFromLiveMainhand(player, enchantId) {
    var workingCopy = itemUtils.cloneLiveMainhandMcStack(player);
    if (workingCopy == null || workingCopy.isEmpty() || isStoredEnchantedBookStack(workingCopy)) {
        return buildFailureResult("invalid_target", "live_remove_precheck", {}, {});
    }

    var originalMap = copyEnchantMap(getEnchantmentsFromMcStack(workingCopy));
    if (!originalMap.hasOwnProperty(enchantId)) {
        return buildFailureResult("invalid_target", "live_remove_missing", originalMap, originalMap);
    }

    var nextMap = copyEnchantMap(originalMap);
    delete nextMap[enchantId];

    var writeResult = setItemEnchantmentsOnMcStack(workingCopy, nextMap);
    if (!writeResult.ok) {
        writeResult.original = originalMap;
        return writeResult;
    }

    var commitResult = itemUtils.commitHeldMcStack(player, workingCopy, function(readBackMcStack) {
        return buildEnchantmentsResult(nextMap, getEnchantmentsFromMcStack(readBackMcStack), "live_remove_commit_readback");
    });
    commitResult.original = originalMap;
    commitResult.removed = {
        id: enchantId,
        level: clampLevel(originalMap[enchantId])
    };
    return commitResult;
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
    buildEnchantmentsResult: buildEnchantmentsResult,
    setBookEnchantmentsOnMcStack: setBookEnchantmentsOnMcStack,
    setItemEnchantmentsOnMcStack: setItemEnchantmentsOnMcStack,
    setEnchantments: setEnchantments,
    removeEnchantment: removeEnchantment,
    createEnchantedBook: createEnchantedBook,
    createEnchantedBookFromMap: createEnchantedBookFromMap,
    canApplyEnchantmentToItem: canApplyEnchantmentToItem,
    canEnchantmentsCoexist: canEnchantmentsCoexist,
    applyBookToLiveMainhand: applyBookToLiveMainhand,
    setLiveMainhandEnchantments: setLiveMainhandEnchantments,
    removeEnchantmentFromLiveMainhand: removeEnchantmentFromLiveMainhand,
    mergeBookEnchantments: mergeBookEnchantments,
    getDisplayName: getDisplayName,
    copyEnchantMap: copyEnchantMap,
    clampLevel: clampLevel
};
