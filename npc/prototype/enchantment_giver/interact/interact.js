var EnchantmentHelper = Java.type("net.minecraft.world.item.enchantment.EnchantmentHelper");
var Enchantments = Java.type("net.minecraft.world.item.enchantment.Enchantments");

var ALL_ENCHANTMENTS = [
    Enchantments.PROTECTION,
    Enchantments.FIRE_PROTECTION,
    Enchantments.FEATHER_FALLING,
    Enchantments.BLAST_PROTECTION,
    Enchantments.PROJECTILE_PROTECTION,
    Enchantments.THORNS,
    Enchantments.DEPTH_STRIDER,
    Enchantments.FROST_WALKER,
    Enchantments.BINDING_CURSE,
    Enchantments.SOUL_SPEED,
    Enchantments.SWIFT_SNEAK,
    Enchantments.SHARPNESS,
    Enchantments.SMITE,
    Enchantments.BANE_OF_ARTHROPODS,
    Enchantments.KNOCKBACK,
    Enchantments.FIRE_ASPECT,
    Enchantments.LOOTING,
    Enchantments.SWEEPING_EDGE,
    Enchantments.EFFICIENCY,
    Enchantments.SILK_TOUCH,
    Enchantments.UNBREAKING,
    Enchantments.FORTUNE,
    Enchantments.POWER,
    Enchantments.PUNCH,
    Enchantments.FLAME,
    Enchantments.INFINITY,
    Enchantments.LUCK_OF_THE_SEA,
    Enchantments.LURE,
    Enchantments.LOYALTY,
    Enchantments.IMPALING,
    Enchantments.RIPTIDE,
    Enchantments.CHANNELING,
    Enchantments.MULTISHOT,
    Enchantments.PIERCING,
    Enchantments.QUICK_CHARGE,
    Enchantments.WIND_BURST,
    Enchantments.DENSITY,
    Enchantments.BREACH,
    Enchantments.MENDING,
    Enchantments.VANISHING_CURSE
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

        for (var i = 0; i < ALL_ENCHANTMENTS.length; i++) {
            var ench = ALL_ENCHANTMENTS[i].value();
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