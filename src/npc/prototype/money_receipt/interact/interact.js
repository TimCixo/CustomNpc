var DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var CustomData = Java.type("net.minecraft.world.item.component.CustomData");
var ItemLore = Java.type("net.minecraft.world.item.component.ItemLore");
var ArrayList = Java.type("java.util.ArrayList");

var NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var Items = Java.type("net.minecraft.world.item.Items");
var MCItemStack = Java.type("net.minecraft.world.item.ItemStack");
var InteractionHand = Java.type("net.minecraft.world.InteractionHand");
var CommandSource = Java.type("net.minecraft.commands.CommandSource");
var Component = Java.type("net.minecraft.network.chat.Component");
var BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var CompoundTag = Java.type("net.minecraft.nbt.CompoundTag");

var RECEIPT_ID = "money_receipt";
var RECEIPT_NAME = "Расписка";
var RECEIPT_AMOUNT = 20;

function interact(event) {
    var npc = event.npc;
    var player = event.player;
    var held = player.getMainhandItem();

    if (isMoneyReceipt(held)) {
        refundByReceipt(npc, player, held);
        return;
    }

    issueReceipt(npc, player);
}

function issueReceipt(npc, player) {
    var nickname = getPlayerName(player);
    var balance = getPlayerBalance(npc, player);

    if (balance == null) {
        player.message("§cНе удалось проверить баланс.");
        return;
    }

    if (balance < RECEIPT_AMOUNT) {
        player.message("§cНедостаточно денег. Нужно: " + RECEIPT_AMOUNT);
        player.message("§7Текущий баланс: §f" + balance);
        return;
    }

    var takeOutput = runEconomyCommand(npc, player, "economy take " + nickname + " " + RECEIPT_AMOUNT);
    if (takeOutput == null) {
        player.message("§cНе удалось списать деньги.");
        return;
    }

    var receipt = createMoneyReceipt(player, RECEIPT_AMOUNT);
    if (receipt == null || receipt.isEmpty()) {
        player.message("§cНе удалось создать расписку.");
        return;
    }

    if (!giveItemToPlayer(player, receipt)) {
        player.message("§cНе удалось выдать расписку. Освободи место в инвентаре.");
        return;
    }

    player.message("§aВыдана расписка на " + RECEIPT_AMOUNT + ".");
}

function refundByReceipt(npc, player, held) {
    var amount = getReceiptAmount(held);
    if (amount <= 0) {
        player.message("§cРасписка повреждена: сумма не найдена.");
        return;
    }

    var nickname = getPlayerName(player);
    var giveOutput = runEconomyCommand(npc, player, "economy give " + nickname + " " + amount);
    if (giveOutput == null) {
        player.message("§cНе удалось вернуть деньги по расписке.");
        return;
    }

    if (!consumeHeldItem(player, held, 1)) {
        player.message("§eДеньги возвращены, но расписку не удалось удалить автоматически.");
        return;
    }

    player.message("§aВозвращено " + amount + " денег по расписке.");
}

function getPlayerBalance(npc, player) {
    var nickname = getPlayerName(player);
    var outputs = runCommandVariants(npc, player, "money " + nickname);

    for (var i = 0; i < outputs.length; i++) {
        var parsed = parseBalanceFromOutput(outputs[i]);
        if (parsed != null) {
            return parsed;
        }
    }

    return null;
}

function parseBalanceFromOutput(output) {
    var text = "" + output;
    if (trimString(text).length == 0) return null;

    var matches = text.match(/-?\d[\d\s,._]*/g);
    if (matches == null || matches.length == 0) return null;

    for (var i = matches.length - 1; i >= 0; i--) {
        var raw = trimString(matches[i]);
        if (raw.length == 0) continue;

        var normalized = raw.replace(/[^\d-]/g, "");
        if (normalized.length == 0 || normalized == "-") continue;

        var value = parseInt(normalized, 10);
        if (!isNaN(value)) {
            return value;
        }
    }

    return null;
}

function runCommand(npc, command) {
    return tryNpcCommand(npc, stripLeadingSlash(command));
}

function runEconomyCommand(npc, player, command) {
    var plain = stripLeadingSlash(command);

    var serverOutput = tryServerCommand(player, plain);
    if (serverOutput != null) {
        return serverOutput;
    }

    var apiOutput = tryApiWorldCommand(player, plain);
    if (apiOutput != null) {
        return apiOutput;
    }

    return tryNpcCommand(npc, plain);
}

function runCommandVariants(npc, player, command) {
    var plain = stripLeadingSlash(command);
    var outputs = [];

    var serverOutput = tryServerCommand(player, plain);
    if (serverOutput != null) {
        pushOutput(outputs, serverOutput);
        return outputs;
    }

    var apiOutput = tryApiWorldCommand(player, plain);
    if (apiOutput != null) {
        pushOutput(outputs, apiOutput);
        return outputs;
    }

    pushOutput(outputs, tryNpcCommand(npc, plain));
    pushOutput(outputs, tryNpcCommand(npc, "/" + plain));
    return outputs;
}

function pushOutput(outputs, value) {
    if (value == null) return;

    var text = "" + value;
    if (trimString(text).length == 0) return;

    outputs.push(text);
}

function tryNpcCommand(npc, command) {
    try {
        return "" + npc.executeCommand(command);
    } catch (e) {
        return null;
    }
}

function tryApiWorldCommand(player, command) {
    try {
        return "" + NpcAPI.Instance().executeCommand(player.getWorld(), command);
    } catch (e) {
        return null;
    }
}

function tryServerCommand(player, command) {
    try {
        var outputs = new ArrayList();
        var CapturingSource = Java.extend(CommandSource, {
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

        server.getCommands().performPrefixedCommand(source, stripLeadingSlash(command));

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
}

function stripLeadingSlash(command) {
    var cmd = trimString(command);
    if (cmd.indexOf("/") === 0) {
        return cmd.substring(1);
    }
    return cmd;
}

function createMoneyReceipt(player, amount) {
    try {
        var mcStack = new MCItemStack(Items.PAPER);
        var tag = new CompoundTag();
        tag.putString("receipt_id", RECEIPT_ID);
        tag.putInt("amount", amount);
        tag.putString("owner", getPlayerName(player));

        mcStack.set(DataComponents.CUSTOM_NAME, Component.literal(RECEIPT_NAME));
        mcStack.set(DataComponents.CUSTOM_DATA, CustomData.of(tag));
        mcStack.set(DataComponents.LORE, new ItemLore(buildReceiptLore(amount)));

        return NpcAPI.Instance().getIItemStack(mcStack);
    } catch (e) {
        return null;
    }
}

function buildReceiptLore(amount) {
    var lines = new ArrayList();
    lines.add(Component.literal("Сумма: " + amount));
    lines.add(Component.literal("ПКМ для возврата денег"));
    return lines;
}

function isMoneyReceipt(item) {
    if (item == null || item.isEmpty()) return false;

    try {
        var mcStack = item.getMCItemStack();
        var itemId = String(BuiltInRegistries.ITEM.getKey(mcStack.getItem()));
        if (itemId != "minecraft:paper") return false;

        var customData = mcStack.get(DataComponents.CUSTOM_DATA);
        if (customData == null) return false;

        var tag = customData.copyTag();
        return tag.getString("receipt_id") == RECEIPT_ID;
    } catch (e) {
        return false;
    }
}

function getReceiptAmount(item) {
    try {
        var customData = item.getMCItemStack().get(DataComponents.CUSTOM_DATA);
        if (customData == null) return 0;

        return customData.copyTag().getInt("amount");
    } catch (e) {
        return 0;
    }
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

function getPlayerName(player) {
    try {
        return "" + player.getName();
    } catch (e) {
        return "" + player.getDisplayName();
    }
}

function trimString(s) {
    return ("" + s).replace(/^\s+|\s+$/g, "");
}
