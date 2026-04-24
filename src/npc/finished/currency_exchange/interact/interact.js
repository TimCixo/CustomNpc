var Economy_ArrayList = Java.type("java.util.ArrayList");
var Economy_NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var Economy_CommandSource = Java.type("net.minecraft.commands.CommandSource");
var DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var Items = Java.type("net.minecraft.world.item.Items");
var MCItemStack = Java.type("net.minecraft.world.item.ItemStack");
var InteractionHand = Java.type("net.minecraft.world.InteractionHand");
var BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");

function interact(event) {
    var npc = event.npc;
    var player = event.player;
    var item = player.getMainhandItem();

    if (!isExchangeCurrency(item)) {
        return;
    }

    var unitPrice = getCurrencyUnitPrice(item);
    var count = item.getStackSize();
    if (unitPrice <= 0 || count <= 0) {
        player.message("§cНе удалось определить номинал валюты.");
        cancelInteraction(event, player);
        return;
    }

    var total = unitPrice * count;
    if (Economy.giveMoney(npc, player, total) == null) {
        player.message("§cНе удалось обменять валюту на деньги.");
        cancelInteraction(event, player);
        return;
    }

    consumeHeldItem(player, item, count);
    cancelInteraction(event, player);
}

function isExchangeCurrency(item) {
    if (item == null || item.isEmpty()) return false;

    return getCurrencyMetadata(item) != null;
}

function getCurrencyUnitPrice(item) {
    var metadata = getCurrencyMetadata(item);
    return metadata == null ? 0 : metadata.unitPrice;
}

function getCurrencyMetadata(item) {
    if (item == null || item.isEmpty()) return null;

    try {
        var itemId = getItemId(item);
        var customData = item.getMCItemStack().get(DataComponents.CUSTOM_DATA);
        if (customData == null) return null;

        var tag = customData.copyTag();
        if (tag == null) return null;

        var storedItemId = readTagString(tag, "currency_exchange_item_id");
        var unitPrice = tag.getInt("currency_exchange_unit_price");
        if (!hasText(storedItemId) || unitPrice <= 0) return null;
        if (storedItemId != itemId) return null;
        if (getExpectedCurrencyUnitPrice(itemId) != unitPrice) return null;

        return {
            itemId: itemId,
            unitPrice: unitPrice,
            label: readTagString(tag, "currency_exchange_label")
        };
    } catch (e) {
        return null;
    }
}

function getExpectedCurrencyUnitPrice(itemId) {
    if (itemId == "minecraft:iron_nugget") return 5;
    if (itemId == "silentgems:silver_nugget") return 20;
    if (itemId == "minecraft:gold_nugget") return 100;
    return 0;
}

function readTagString(tag, key) {
    try {
        return "" + tag.getString(key);
    } catch (e) {
        return "";
    }
}

function hasText(value) {
    return value != null && ("" + value).replace(/^\s+|\s+$/g, "").length > 0;
}

function getItemId(item) {
    try {
        return String(BuiltInRegistries.ITEM.getKey(item.getMCItemStack().getItem()));
    } catch (e) {
        return "";
    }
}

function consumeHeldItem(player, item, count) {
    try {
        var current = item.getStackSize();
        if (current > count) {
            item.setStackSize(current - count);
            player.updatePlayerInventory();
            return true;
        }

        player.getMCEntity().setItemInHand(
            InteractionHand.MAIN_HAND,
            new MCItemStack(Items.AIR)
        );
        player.updatePlayerInventory();
        return true;
    } catch (e) {
        return false;
    }
}

function cancelInteraction(event, player) {
    try {
        event.setCanceled(true);
    } catch (e) {}

    try {
        player.closeGui();
    } catch (e2) {}
}

var Economy = {
    giveMoney: function(npc, player, amount) {
        var nickname = this.getPlayerName(player);
        return this.runEconomyCommand(npc, player, "economy give " + nickname + " " + amount);
    },

    runEconomyCommand: function(npc, player, command) {
        var plain = this.stripLeadingSlash(command);

        var serverOutput = this.tryServerCommand(player, plain);
        if (serverOutput != null) {
            return serverOutput;
        }

        var apiOutput = this.tryApiWorldCommand(player, plain);
        if (apiOutput != null) {
            return apiOutput;
        }

        return this.tryNpcCommand(npc, plain);
    },

    tryNpcCommand: function(npc, command) {
        try {
            return "" + npc.executeCommand(command);
        } catch (e) {
            return null;
        }
    },

    tryApiWorldCommand: function(player, command) {
        try {
            return "" + Economy_NpcAPI.Instance().executeCommand(player.getWorld(), command);
        } catch (e) {
            return null;
        }
    },

    tryServerCommand: function(player, command) {
        try {
            var outputs = new Economy_ArrayList();
            var CapturingSource = Java.extend(Economy_CommandSource, {
                sendSystemMessage: function(component) {
                    try {
                        outputs.add(component.getString());
                    } catch (e1) {
                        outputs.add("" + component);
                    }
                },
                acceptsSuccess: function() {
                    return true;
                },
                acceptsFailure: function() {
                    return true;
                },
                shouldInformAdmins: function() {
                    return false;
                }
            });

            var server = player.getMCEntity().level().getServer();
            var source = server.createCommandSourceStack()
                .withSource(new CapturingSource())
                .withPermission(4);

            server.getCommands().performPrefixedCommand(source, this.stripLeadingSlash(command));

            if (outputs.isEmpty()) {
                return "";
            }

            var parts = [];
            for (var i = 0; i < outputs.size(); i++) {
                parts.push("" + outputs.get(i));
            }
            return parts.join("\n");
        } catch (e) {
            return null;
        }
    },

    getPlayerName: function(player) {
        try {
            return "" + player.getName();
        } catch (e) {
            return "" + player.getDisplayName();
        }
    },

    stripLeadingSlash: function(command) {
        var cmd = ("" + command).replace(/^\s+|\s+$/g, "");
        if (cmd.indexOf("/") === 0) {
            return cmd.substring(1);
        }
        return cmd;
    }
};
