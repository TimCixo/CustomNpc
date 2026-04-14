var EnchantmentHelper = Java.type("net.minecraft.world.item.enchantment.EnchantmentHelper");
var ItemEnchantments = Java.type("net.minecraft.world.item.enchantment.ItemEnchantments");
var Items = Java.type("net.minecraft.world.item.Items");
var BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var ResourceLocation = Java.type("net.minecraft.resources.ResourceLocation");
var NpcAPI = Java.type("noppes.npcs.api.NpcAPI");

var ANVIL_FIRST_ENCHANTS_KEY = "anvil_first_enchants";

function interact(event) {
    var player = event.player;
    var block = event.block;
    var item = player.getMainhandItem();

    if (!isEnchantedBook(item)) {
        player.message("§cYou must hold an enchanted book in your main hand.");
        return;
    }

    var blockData = block.getTempdata();
    var firstEnchants = blockData.get(ANVIL_FIRST_ENCHANTS_KEY);

    if (firstEnchants == null) {
        // First step: store first book's enchantments
        var enchants = extractEnchantments(item);
        blockData.put(ANVIL_FIRST_ENCHANTS_KEY, JSON.stringify(enchants));
        player.message("§aFirst enchanted book added.");
        return;
    }

    // Second step: merge with second book
    var firstEnchantMap = parseEnchantments(firstEnchants);
    var secondEnchantMap = extractEnchantments(item);
    var mergedEnchants = mergeEnchantments(firstEnchantMap, secondEnchantMap);

    if (mergedEnchants == null || Object.keys(mergedEnchants).length === 0) {
        player.message("§cCould not merge enchantments.");
        blockData.remove(ANVIL_FIRST_ENCHANTS_KEY);
        return;
    }

    var resultBook = createEnchantedBook(mergedEnchants);
    if (resultBook == null) {
        player.message("§cCould not create merged book.");
        blockData.remove(ANVIL_FIRST_ENCHANTS_KEY);
        return;
    }

    var playerInv = player.getInventory();
    if (playerInv.firstEmpty() >= 0) {
        playerInv.add(resultBook);
        player.message("§aBooks merged successfully!");
    } else {
        player.message("§cNot enough inventory space.");
    }

    blockData.remove(ANVIL_FIRST_ENCHANTS_KEY);
}

function isEnchantedBook(item) {
    if (item == null || item.isEmpty()) return false;
    var mcStack = item.getMCItemStack();
    if (mcStack == null) return false;
    return mcStack.getItem() == Items.ENCHANTED_BOOK && !EnchantmentHelper.getEnchantments(mcStack).isEmpty();
}

function extractEnchantments(item) {
    var enchants = {};
    if (item == null || item.isEmpty()) return enchants;

    var mcStack = item.getMCItemStack();
    var itemEnchants = EnchantmentHelper.getEnchantments(mcStack);
    if (itemEnchants == null || itemEnchants.isEmpty()) return enchants;

    try {
        var iterator = itemEnchants.entrySet().iterator();
        while (iterator.hasNext()) {
            var entry = iterator.next();
            var ench = entry.getKey();
            var level = entry.getValue();
            var key = BuiltInRegistries.ENCHANTMENT.getKey(ench).toString();
            enchants[key] = level;
        }
    } catch (e) {}

    return enchants;
}

function parseEnchantments(jsonStr) {
    if (jsonStr == null || jsonStr === "") return {};
    try {
        return JSON.parse(jsonStr);
    } catch (e) {
        return {};
    }
}

function mergeEnchantments(firstEnchants, secondEnchants) {
    var merged = {};

    for (var key in firstEnchants) {
        if (firstEnchants.hasOwnProperty(key)) {
            merged[key] = firstEnchants[key];
        }
    }

    for (var key in secondEnchants) {
        if (!secondEnchants.hasOwnProperty(key)) continue;

        if (merged.hasOwnProperty(key)) {
            // Same enchantment: max + 1 (capped at 10)
            var level1 = parseInt("" + merged[key], 10);
            var level2 = parseInt("" + secondEnchants[key], 10);
            var newLevel = Math.max(level1, level2) + 1;
            merged[key] = Math.min(newLevel, 10);
        } else {
            // Different enchantment: just add it
            merged[key] = secondEnchants[key];
        }
    }

    return merged;
}

function createEnchantedBook(enchants) {
    try {
        var MCItemStack = Java.type("net.minecraft.world.item.ItemStack");
        var bookStack = new MCItemStack(Items.ENCHANTED_BOOK);
        
        var builder = ItemEnchantments.builder();
        for (var enchantName in enchants) {
            if (!enchants.hasOwnProperty(enchantName)) continue;
            
            var ench = BuiltInRegistries.ENCHANTMENT.get(ResourceLocation.parse(enchantName));
            if (ench != null) {
                var level = enchants[enchantName];
                builder.with(ench, level);
            }
        }

        var newEnchants = builder.build();
        EnchantmentHelper.setEnchantments(bookStack, newEnchants);

        return NpcAPI.Item(bookStack);
    } catch (e) {
        return null;
    }
}