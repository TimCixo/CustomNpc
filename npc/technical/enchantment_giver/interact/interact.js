var Registries = Java.type("net.minecraft.core.registries.Registries");
var DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var ItemEnchantments = Java.type("net.minecraft.world.item.enchantment.ItemEnchantments");
var TagKey = Java.type("net.minecraft.tags.TagKey");
var ResourceLocation = Java.type("net.minecraft.resources.ResourceLocation");

function rl(id) {
    try {
        return ResourceLocation.parse(id);
    } catch (e) {
        return ResourceLocation.tryParse(id);
    }
}

function itemTag(id) {
    return TagKey.create(Registries.ITEM, rl(id));
}

var TOOLS_TAG = itemTag("minecraft:tools/tools");

function isInTag(stack, tag) {
    try {
        return stack.is(tag);
    } catch (e) {}

    try {
        return stack.getItemHolder().is(tag);
    } catch (e) {}

    try {
        return stack.getItem().builtInRegistryHolder().is(tag);
    } catch (e) {}

    return false;
}

function isCurse(id) {
    return id == "minecraft:binding_curse" || id == "minecraft:vanishing_curse";
}

function getHolderId(holder) {
    try {
        return String(holder.getRegisteredName());
    } catch (e) {}

    try {
        return String(holder.unwrapKey().get().location().toString());
    } catch (e) {}

    try {
        return String(holder.value().descriptionId());
    } catch (e) {}

    return "";
}

function interact(event) {
    var player = event.player;
    var item = player.getMainhandItem();

    if (item == null || item.getItemName() == "minecraft:air") {
        player.message("§cВозьми предмет в руку.");
        return;
    }

    var stack = item.getMCItemStack();
    if (stack == null) {
        player.message("§cНе удалось получить ItemStack.");
        return;
    }

    try {
        var isTool = isInTag(stack, TOOLS_TAG);

        var level = player.getMCEntity().level();
        var lookup = level.registryAccess().lookupOrThrow(Registries.ENCHANTMENT);
        var holders = lookup.listElements().iterator();

        var mutable = new ItemEnchantments.Mutable(ItemEnchantments.EMPTY);
        var applied = 0;

        while (holders.hasNext()) {
            var holder = holders.next();

            try {
                var ench = holder.value();
                var id = getHolderId(holder);

                if (isCurse(id)) continue;
                if (isTool && id == "minecraft:silk_touch") continue;

                try {
                    if (!ench.isSupportedItem(stack)) continue;
                } catch (e0) {
                    try {
                        if (!stack.getItem().isPrimaryItemFor(stack, holder)) continue;
                    } catch (e1) {
                        continue;
                    }
                }

                mutable.set(holder, ench.getMaxLevel());
                applied++;
            } catch (e2) {}
        }

        stack.set(DataComponents.ENCHANTMENTS, mutable.toImmutable());
        player.message("§aГотово. Добавлено зачарований: " + applied);
    } catch (e) {
        player.message("§cОшибка: " + e);
    }
}