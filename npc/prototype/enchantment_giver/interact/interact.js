var BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var EnchantmentHelper = Java.type("net.minecraft.world.item.enchantment.EnchantmentHelper");
var Registries = Java.type("net.minecraft.core.registries.Registries");

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
        var registry = npc.getWorld().registryAccess().registry(Registries.ENCHANTMENT).get();
        var iterator = registry.entrySet().iterator();
        var enchanted = false;

        while (iterator.hasNext()) {
            var entry = iterator.next();
            var ench = entry.getValue();
            if (ench.canEnchant(mcStack)) {
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