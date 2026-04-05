var CONTROL_TIMER_ID = 1;
var PM_ArrayList = Java.type("java.util.ArrayList");
var PM_CommandSource = Java.type("net.minecraft.commands.CommandSource");
var CONFIG_CHAT_MODE_KEY = "pokemon_multiplier_config_chat_mode";
var CYCLE_RUNNING_KEY = "pokemon_multiplier_cycle_running";
var CYCLE_END_MS_KEY = "pokemon_multiplier_cycle_end_ms";
var CYCLE_INTERVAL_MS_KEY = "pokemon_multiplier_cycle_interval_ms";
var CYCLE_NEXT_NOTICE_MS_KEY = "pokemon_multiplier_cycle_next_notice_ms";
var CYCLE_STARTED_MS_KEY = "pokemon_multiplier_cycle_started_ms";
var DISPLAY_BASE_TITLE_KEY = "pokemon_multiplier_display_base_title";

function timer(event) {
    if (event.id != CONTROL_TIMER_ID) return;

    var npc = event.npc;
    var data = npc.getStoreddata();
    if (trimString(data.get(CYCLE_RUNNING_KEY)) != "1") return;

    var now = getNowMs();
    var endMs = parseIntSafe(data.get(CYCLE_END_MS_KEY), 0);
    var nextNoticeMs = parseIntSafe(data.get(CYCLE_NEXT_NOTICE_MS_KEY), 0);
    var intervalMs = parseIntSafe(data.get(CYCLE_INTERVAL_MS_KEY), 0);

    if (endMs <= 0) {
        stopCycle(npc);
        return;
    }

    if (now >= endMs) {
        announceByMode(npc, "Время вышло.");
        stopCycle(npc);
        return;
    }

    setTimerDisplay(npc, formatDurationMs(endMs - now));

    if (intervalMs > 0 && nextNoticeMs > 0 && now >= nextNoticeMs) {
        announceByMode(npc, "Осталось времени: " + formatDurationMs(endMs - now));
        data.put(CYCLE_NEXT_NOTICE_MS_KEY, "" + (now + intervalMs));
    }
}

function stopCycle(npc) {
    var data = npc.getStoreddata();
    data.put(CYCLE_RUNNING_KEY, "0");
    data.put(CYCLE_END_MS_KEY, "0");
    data.put(CYCLE_INTERVAL_MS_KEY, "0");
    data.put(CYCLE_NEXT_NOTICE_MS_KEY, "0");
    data.put(CYCLE_STARTED_MS_KEY, "0");
    restoreBaseTitle(npc);

    try {
        npc.timers.stop(CONTROL_TIMER_ID);
    } catch (e) {}
}

function announceByMode(npc, message) {
    var mode = readStoredOrDefault(npc.getStoreddata(), CONFIG_CHAT_MODE_KEY, "global");
    if (mode == "local") {
        sayLocal(npc, message);
        return;
    }

    if (!runBroadcastCommand(npc, message)) {
        try {
            npc.say(message);
        } catch (e) {}
    }
}

function runBroadcastCommand(npc, message) {
    var command = "bc " + sanitizeBroadcastText(message);
    var serverOutput = tryServerCommand(npc, command);
    if (serverOutput != null) {
        return true;
    }

    return false;
}

function tryServerCommand(npc, command) {
    try {
        var outputs = new PM_ArrayList();
        var CapturingSource = Java.extend(PM_CommandSource, {
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

        var server = npc.getMCEntity().level().getServer();
        var source = server.createCommandSourceStack()
            .withSource(new CapturingSource())
            .withPermission(4);

        server.getCommands().performPrefixedCommand(source, stripLeadingSlash(command));
        return outputs.isEmpty() ? "" : "" + outputs.get(0);
    } catch (e) {
        return null;
    }
}

function sayLocal(npc, message) {
    try {
        var players = npc.getWorld().getAllPlayers();
        if (players == null) return;

        for (var i = 0; i < players.length; i++) {
            var player = players[i];
            if (player == null) continue;
            if (!isWithinLocalRange(npc, player, 20)) continue;
            try {
                npc.sayTo(player, message);
            } catch (e1) {}
        }
    } catch (e) {}
}

function isWithinLocalRange(npc, player, range) {
    try {
        var dx = npc.getX() - player.getX();
        var dy = npc.getY() - player.getY();
        var dz = npc.getZ() - player.getZ();
        return (dx * dx + dy * dy + dz * dz) <= (range * range);
    } catch (e) {
        return false;
    }
}

function sanitizeBroadcastText(text) {
    return trimString(("" + text).replace(/[\r\n]+/g, " "));
}

function stripLeadingSlash(command) {
    var cmd = trimString(command);
    if (cmd.indexOf("/") === 0) {
        return cmd.substring(1);
    }
    return cmd;
}

function formatDurationMs(ms) {
    var totalSeconds = Math.max(0, Math.floor(ms / 1000));
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;
    return pad2(hours) + ":" + pad2(minutes) + ":" + pad2(seconds);
}

function pad2(value) {
    return value < 10 ? "0" + value : "" + value;
}

function getNowMs() {
    return new Date().getTime();
}

function setTimerDisplay(npc, text) {
    try {
        ensureBaseTitle(npc);
        npc.getDisplay().setTitle(trimString(text));
        npc.updateClient();
    } catch (e) {}
}

function restoreBaseTitle(npc) {
    try {
        var baseTitle = "" + npc.getStoreddata().get(DISPLAY_BASE_TITLE_KEY);
        npc.getDisplay().setTitle(baseTitle);
        npc.updateClient();
    } catch (e) {}
}

function ensureBaseTitle(npc) {
    try {
        var data = npc.getStoreddata();
        if (hasText(data.get(DISPLAY_BASE_TITLE_KEY))) return;
        data.put(DISPLAY_BASE_TITLE_KEY, "" + npc.getDisplay().getTitle());
    } catch (e) {}
}

function readStoredOrDefault(data, key, def) {
    var value = trimString(data.get(key));
    return hasText(value) ? value : def;
}

function parseIntSafe(value, def) {
    try {
        var parsed = parseInt("" + value, 10);
        return isNaN(parsed) ? def : parsed;
    } catch (e) {
        return def;
    }
}

function trimString(value) {
    return ("" + value).replace(/^\s+|\s+$/g, "");
}

function hasText(value) {
    return value != null && trimString(value).length > 0;
}
