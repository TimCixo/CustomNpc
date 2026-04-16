var Economy_ArrayList = Java.type("java.util.ArrayList");
var Economy_NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var Economy_CommandSource = Java.type("net.minecraft.commands.CommandSource");
var DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var CustomData = Java.type("net.minecraft.world.item.component.CustomData");
var ItemLore = Java.type("net.minecraft.world.item.component.ItemLore");
var ResourceLocation = Java.type("net.minecraft.resources.ResourceLocation");
var BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var MCItemStack = Java.type("net.minecraft.world.item.ItemStack");
var Component = Java.type("net.minecraft.network.chat.Component");
var CompoundTag = Java.type("net.minecraft.nbt.CompoundTag");

function dialogOption(event) {
    var npc = event.npc;
    var player = event.player;
    var optionName = getOptionName(event);

    if (matchesOption(optionName, [
        "выбор валюты",
        "валюта",
        "select currency"
    ])) {
        return;
    }

    if (matchesOption(optionName, [
        "выбор количества",
        "количество",
        "select count"
    ])) {
        return;
    }

    var currencyPrice = parseCurrencyPriceFromOptionName(optionName);
    if (currencyPrice == 5) {
        setCurrencySelection(npc, player, "minecraft:iron_nugget", 5, "Iron Nugget");
        tryPurchase(npc, player);
        return;
    }

    if (currencyPrice == 20) {
        setCurrencySelection(npc, player, "silentgems:silver_nugget", 20, "Silver Nugget");
        tryPurchase(npc, player);
        return;
    }

    if (currencyPrice == 100) {
        setCurrencySelection(npc, player, "minecraft:gold_nugget", 100, "Gold Nugget");
        tryPurchase(npc, player);
        return;
    }

    var count = parseCountFromOptionName(optionName);
    if (count > 0) {
        setCountSelection(npc, player, count);
        tryPurchase(npc, player);
        return;
    }
}

function getOptionName(event) {
    try {
        if (event.option != null) {
            return "" + event.option.getName();
        }
    } catch (e) {}

    try {
        if (event.option != null) {
            return "" + event.option.name;
        }
    } catch (e2) {}

    return "";
}

function matchesOption(optionName, patterns) {
    var name = normalizeName(optionName);
    if (name.length == 0) return false;

    for (var i = 0; i < patterns.length; i++) {
        if (name.indexOf(normalizeName(patterns[i])) !== -1) {
            return true;
        }
    }

    return false;
}

function parseCountFromOptionName(optionName) {
    var name = normalizeName(optionName);
    if (name.indexOf("$") !== -1) return 0;

    var match = name.match(/\d+/);
    if (match == null) return 0;

    return parseIntSafe(match[0], 0);
}

function parseCurrencyPriceFromOptionName(optionName) {
    var name = normalizeName(optionName);
    if (name.indexOf("$") === -1) return 0;

    var match = name.match(/\d+/);
    if (match == null) return 0;

    return parseIntSafe(match[0], 0);
}

function normalizeName(s) {
    return trimString("" + s).toLowerCase();
}

function setCurrencySelection(npc, player, itemId, price, label) {
    var state = getSelectionState(npc, player);
    state.itemId = itemId;
    state.itemPrice = "" + price;
    state.itemLabel = label;
    state.count = "";
    saveSelectionState(npc, player, state);
}

function setCountSelection(npc, player, count) {
    var state = getSelectionState(npc, player);
    state.count = "" + count;
    saveSelectionState(npc, player, state);
}

function tryPurchase(npc, player) {
    var state = getSelectionState(npc, player);
    if (!hasText(state.itemId) || !hasText(state.count)) {
        return;
    }

    var itemId = state.itemId;
    var label = state.itemLabel;
    var unitPrice = parseIntSafe(state.itemPrice, 0);
    var count = parseIntSafe(state.count, 0);

    if (unitPrice <= 0 || count <= 0) {
        closeDialog(player);
        player.message("§cВыбор повреждён. Открой диалог заново.");
        clearSelection(npc, player);
        return;
    }

    var totalPrice = unitPrice * count;
    var balance = Economy.getPlayerBalance(npc, player);
    if (balance == null) {
        closeDialog(player);
        player.message("§cНе удалось проверить баланс.");
        clearSelection(npc, player);
        return;
    }

    if (balance < totalPrice) {
        closeDialog(player);
        player.message("§cНедостаточно денег.");
        clearSelection(npc, player);
        return;
    }

    var takeResult = Economy.takeMoney(npc, player, totalPrice);
    if (takeResult == null) {
        closeDialog(player);
        player.message("§cНе удалось списать деньги.");
        clearSelection(npc, player);
        return;
    }

    var item = createCurrencyItem(player, itemId, count, unitPrice, label);
    if (item == null || item.isEmpty()) {
        Economy.giveMoney(npc, player, totalPrice);
        closeDialog(player);
        player.message("§cНе удалось создать валюту. Деньги возвращены.");
        clearSelection(npc, player);
        return;
    }

    var given = giveItemToPlayer(player, item);
    if (!given) {
        Economy.giveMoney(npc, player, totalPrice);
        closeDialog(player);
        player.message("§cНе удалось выдать валюту. Освободи место в инвентаре. Деньги возвращены.");
        clearSelection(npc, player);
        return;
    }

    closeDialog(player);
    player.message("§aВыдано: §f" + label + " x" + count);
    clearSelection(npc, player);
}

function createCurrencyItem(player, itemId, count, unitPrice, label) {
    try {
        var itemType = BuiltInRegistries.ITEM.get(ResourceLocation.parse(itemId));
        if (itemType == null) return null;

        var mcStack = new MCItemStack(itemType);
        if (mcStack == null || mcStack.isEmpty()) return null;

        applyCurrencyPresentation(mcStack, itemId, unitPrice, label);

        var item = Economy_NpcAPI.Instance().getIItemStack(mcStack);
        if (item == null || item.isEmpty()) return null;

        item.setStackSize(count);
        return item;
    } catch (e) {
        return null;
    }
}

function applyCurrencyPresentation(mcStack, itemId, unitPrice, label) {
    var tag = new CompoundTag();
    tag.putString("currency_exchange_item_id", itemId);
    tag.putString("currency_exchange_label", label);
    tag.putInt("currency_exchange_unit_price", unitPrice);

    mcStack.set(DataComponents.CUSTOM_NAME, Component.literal("§6" + unitPrice + "$"));
    mcStack.set(DataComponents.CUSTOM_DATA, CustomData.of(tag));
    mcStack.set(DataComponents.LORE, new ItemLore(buildCurrencyLore()));
}

function buildCurrencyLore() {
    var lines = new Economy_ArrayList();
    lines.add(Component.literal("Выдано обменником"));
    return lines;
}

function giveItemToPlayer(player, item) {
    var given = false;

    try {
        given = player.giveItem(item);
    } catch (e) {}

    if (!given) {
        given = putInFirstEmptySlot(player, item);
    }

    return given;
}

function putInFirstEmptySlot(player, item) {
    var inv = player.getInventory();
    if (inv == null) return false;

    var size = inv.getSize();
    for (var i = 0; i < size; i++) {
        var slot = inv.getSlot(i);
        if (slot == null || slot.isEmpty()) {
            inv.setSlot(i, item);
            return true;
        }
    }

    return false;
}

function closeDialog(player) {
    try {
        player.closeGui();
    } catch (e) {}
}

function clearSelection(npc, player) {
    var state = getSelectionState(npc, player);
    state.itemId = "";
    state.itemPrice = "";
    state.itemLabel = "";
    state.count = "";
    saveSelectionState(npc, player, state);
}

function parseIntSafe(s, def) {
    try {
        var value = parseInt("" + s, 10);
        return isNaN(value) ? def : value;
    } catch (e) {
        return def;
    }
}

function trimString(s) {
    return ("" + s).replace(/^\s+|\s+$/g, "");
}

function hasText(value) {
    return value != null && trimString(value).length > 0;
}

function getSelectionState(npc, player) {
    return {
        itemId: readSelectionValue(npc, player, "_item_id"),
        itemPrice: readSelectionValue(npc, player, "_item_price"),
        itemLabel: readSelectionValue(npc, player, "_item_label"),
        count: readSelectionValue(npc, player, "_count")
    };
}

function readSelectionValue(npc, player, suffix) {
    try {
        if (npc == null) return "";

        var data = npc.getStoreddata();
        return "" + data.get(getPlayerKey(player) + suffix);
    } catch (e) {
        return "";
    }
}

function saveSelectionState(npc, player, state) {
    try {
        if (npc == null) return;

        var data = npc.getStoreddata();
        var prefix = getPlayerKey(player);
        data.put(prefix + "_item_id", state.itemId);
        data.put(prefix + "_item_price", state.itemPrice);
        data.put(prefix + "_item_label", state.itemLabel);
        data.put(prefix + "_count", state.count);
    } catch (e) {}
}

function getPlayerKey(player) {
    try {
        return "currency_exchange_" + player.getName();
    } catch (e) {
        return "currency_exchange_player";
    }
}

var Economy = {
    getPlayerBalance: function(npc, player) {
        var nickname = this.getPlayerName(player);
        var outputs = this.runCommandVariants(npc, player, "money " + nickname);

        for (var i = 0; i < outputs.length; i++) {
            var parsed = this.parseBalanceFromOutput(outputs[i]);
            if (parsed != null) {
                return parsed;
            }
        }

        return null;
    },

    takeMoney: function(npc, player, amount) {
        var nickname = this.getPlayerName(player);
        return this.runEconomyCommand(npc, player, "economy take " + nickname + " " + amount);
    },

    giveMoney: function(npc, player, amount) {
        var nickname = this.getPlayerName(player);
        return this.runEconomyCommand(npc, player, "economy give " + nickname + " " + amount);
    },

    parseBalanceFromOutput: function(output) {
        var text = "" + output;
        if (this.trimString(text).length == 0) return null;

        var matches = text.match(/-?\d[\d\s,._]*/g);
        if (matches == null || matches.length == 0) return null;

        for (var i = matches.length - 1; i >= 0; i--) {
            var raw = this.trimString(matches[i]);
            if (raw.length == 0) continue;

            var normalized = raw.replace(/[^\d-]/g, "");
            if (normalized.length == 0 || normalized == "-") continue;

            var value = parseInt(normalized, 10);
            if (!isNaN(value)) {
                return value;
            }
        }

        return null;
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

    runCommandVariants: function(npc, player, command) {
        var plain = this.stripLeadingSlash(command);
        var outputs = [];

        var serverOutput = this.tryServerCommand(player, plain);
        if (serverOutput != null) {
            this.pushOutput(outputs, serverOutput);
            return outputs;
        }

        var apiOutput = this.tryApiWorldCommand(player, plain);
        if (apiOutput != null) {
            this.pushOutput(outputs, apiOutput);
            return outputs;
        }

        this.pushOutput(outputs, this.tryNpcCommand(npc, plain));
        this.pushOutput(outputs, this.tryNpcCommand(npc, "/" + plain));
        return outputs;
    },

    pushOutput: function(outputs, value) {
        if (value == null) return;

        var text = "" + value;
        if (this.trimString(text).length == 0) return;

        outputs.push(text);
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
        var cmd = this.trimString(command);
        if (cmd.indexOf("/") === 0) {
            return cmd.substring(1);
        }
        return cmd;
    },

    trimString: function(s) {
        return ("" + s).replace(/^\s+|\s+$/g, "");
    }
};
