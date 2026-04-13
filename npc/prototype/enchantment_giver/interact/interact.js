var BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var EnchantmentHelper = Java.type("net.minecraft.world.item.enchantment.EnchantmentHelper");
var ResourceLocation = Java.type("net.minecraft.resources.ResourceLocation");

var ENCHANTMENT_IDS = [
    "minecraft:protection",
    "minecraft:fire_protection",
    "minecraft:feather_falling",
    "minecraft:blast_protection",
    "minecraft:projectile_protection",
    "minecraft:thorns",
    "minecraft:depth_strider",
    "minecraft:frost_walker",
    "minecraft:binding_curse",
    "minecraft:soul_speed",
    "minecraft:swift_sneak",
    "minecraft:sharpness",
    "minecraft:smite",
    "minecraft:bane_of_arthropods",
    "minecraft:knockback",
    "minecraft:fire_aspect",
    "minecraft:looting",
    "minecraft:sweeping_edge",
    "minecraft:efficiency",
    "minecraft:silk_touch",
    "minecraft:unbreaking",
    "minecraft:fortune",
    "minecraft:power",
    "minecraft:punch",
    "minecraft:flame",
    "minecraft:infinity",
    "minecraft:luck_of_the_sea",
    "minecraft:lure",
    "minecraft:loyalty",
    "minecraft:impaling",
    "minecraft:riptide",
    "minecraft:channeling",
    "minecraft:multishot",
    "minecraft:piercing",
    "minecraft:quick_charge",
    "minecraft:wind_burst",
    "minecraft:density",
    "minecraft:breach",
    "minecraft:mending",
    "minecraft:vanishing_curse"
];

function interact(event) {
    var npc = event.npc;
    var player = event.player;

    var item = player.getMainhandItem();
    if (item == null || item.getItemName() == "minecraft:air") {
        player.message("§cHold an item in your main hand to enchant it.");
        return;
    }

    var mcStack = item.getMCItemStack();
    if (mcStack == null) {
        player.message("§cInvalid item.");
        return;
    }

    try {
        var enchanted = false;

        for (var i = 0; i < ENCHANTMENT_IDS.length; i++) {
            var ench = BuiltInRegistries.ENCHANTMENT.get(ResourceLocation.parse(ENCHANTMENT_IDS[i]));
            if (ench != null && ench.canEnchant(mcStack)) {
                var maxLevel = ench.getMaxLevel();
                EnchantmentHelper.setEnchantmentLevel(mcStack, ench, maxLevel);
                enchanted = true;
            }
        }

        if (enchanted) {
            item.setMCItemStack(mcStack);
            player.updateClient();
            player.message("§aItem enchanted with all possible enchantments at max level!");
        } else {
            player.message("§cNo enchantments could be applied to this item.");
        }
    } catch (e) {
        player.message("§cError enchanting item: " + e.message);
    }
}