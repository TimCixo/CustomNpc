var Economy_ArrayList = Java.type("java.util.ArrayList");
var Economy_NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var Economy_CommandSource = Java.type("net.minecraft.commands.CommandSource");

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
