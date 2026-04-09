var ArceusBoss_ArrayList = Java.type("java.util.ArrayList");
var ArceusBoss_CommandSource = Java.type("net.minecraft.commands.CommandSource");
var ArceusBoss_System = Java.type("java.lang.System");
var ARCEUS_WHOIS_CACHE_MS = 1200;

function meleeAttack(event) {
    var npc = event.npc;
    var data = npc.getStoreddata();

    if (data.get("arceus_enabled") != "1") return;
    if (data.get("arceus_dying") == "1") return;

    var phase = parseIntSafe(data.get("arceus_phase"), 1);
    var damage = readDamage(event);

    if (phase == 2) {
        damage = damage * getCfgFloat(npc, "arceus_phase2_damage_mult", 1.20);
        writeDamage(event, damage);
        return;
    }

    if (phase >= 3) {
        if (!isPlayerTarget(event.target)) {
            oneShotNonPlayerTarget(npc, event.target);
            return;
        }

        disableGodModeBeforeHit(npc, event.target);
        damage = damage * getCfgFloat(npc, "arceus_phase3_damage_mult", 1.45)
            + getCfgFloat(npc, "arceus_phase3_flat_bonus", 4.0);
        writeDamage(event, damage);
        applyHalfArmorBypassHit(npc, event.target, damage);
    }
}

function oneShotNonPlayerTarget(npc, target) {
    if (target == null) return;

    try {
        target.damage(1000000, npc);
    } catch (e) {}

    try {
        target.setHealth(0);
        return;
    } catch (e2) {}

    try {
        var mcTarget = unwrapMcEntity(target);
        if (mcTarget != null && mcTarget.kill) {
            mcTarget.kill();
        }
    } catch (e3) {}
}

function isPlayerTarget(target) {
    if (target == null) return false;

    try {
        if (target.getType && target.getType() == 1) return true;
    } catch (e) {}

    try {
        var className = "" + target.getClass().getName();
        if (className.indexOf("PlayerWrapper") >= 0) return true;
    } catch (e2) {}

    try {
        var mcTarget = unwrapMcEntity(target);
        if (mcTarget != null) {
            var mcClassName = "" + mcTarget.getClass().getName();
            if (mcClassName.indexOf("player") >= 0 || mcClassName.indexOf("Player") >= 0) return true;
        }
    } catch (e3) {}

    return false;
}

function disableGodModeBeforeHit(npc, target) {
    var playerName = getTargetPlayerName(target);
    if (playerName == "") return;
    if (!isGodModeEnabledForTarget(npc, target, playerName)) return;

    var command = "godmode " + playerName + " disable";
    tryServerCommand(npc, command);
}

function getTargetPlayerName(target) {
    if (target == null) return "";

    try {
        var name = "" + target.getName();
        if (name != null && name != "" && name != "null") return name;
    } catch (e) {}

    try {
        var name2 = "" + target.getDisplayName();
        if (name2 != null && name2 != "" && name2 != "null") return name2;
    } catch (e2) {}

    return "";
}

function isGodModeEnabledForTarget(npc, target, playerName) {
    var info = readWhoisInfo(npc, target, playerName);
    if (info == null || !info.ok) return false;
    return info.godModeEnabled;
}

function readWhoisInfo(npc, target, playerName) {
    var temp = npc.getTempdata();
    var cacheKey = "arceus_whois_cache_" + getTargetIdentity(target, playerName);
    var now = ArceusBoss_System.currentTimeMillis();

    if (temp != null) {
        try {
            var cachedRaw = temp.get(cacheKey);
            if (cachedRaw != null) {
                var cached = parseWhoisCacheEntry("" + cachedRaw);
                if (cached != null && now - cached.time <= ARCEUS_WHOIS_CACHE_MS) {
                    return { ok: true, godModeEnabled: cached.enabled };
                }
            }
        } catch (e) {}
    }

    var output = tryServerCommand(npc, "whois " + playerName);
    var enabled = parseGodModeFromWhois(output);
    if (enabled == null) {
        return { ok: false, godModeEnabled: false };
    }

    if (temp != null) {
        try {
            temp.put(cacheKey, now + "|" + (enabled ? "1" : "0"));
        } catch (e2) {}
    }

    return { ok: true, godModeEnabled: enabled };
}

function parseWhoisCacheEntry(raw) {
    if (raw == null || raw == "" || raw == "null") return null;

    var text = "" + raw;
    var sep = text.indexOf("|");
    if (sep <= 0) return null;

    var time = parseIntSafe(text.substring(0, sep), 0);
    var enabled = text.substring(sep + 1) == "1";
    if (time <= 0) return null;

    return { time: time, enabled: enabled };
}

function parseGodModeFromWhois(output) {
    if (output == null) return null;

    var text = ("" + output).toLowerCase();
    if (trimString(text).length <= 0) return null;

    var exact = /-\s*god mode\s*:\s*(true|false)\b/.exec(text);
    if (exact != null && exact.length >= 2) {
        return exact[1] == "true";
    }

    var lines = text.split(/\r?\n/);
    for (var i = 0; i < lines.length; i++) {
        var line = trimString(lines[i]);
        if (line.indexOf("god") < 0) continue;

        if (line.indexOf("true") >= 0 || line.indexOf("enabled") >= 0 || line.indexOf("on") >= 0 || line.indexOf("yes") >= 0) {
            return true;
        }

        if (line.indexOf("false") >= 0 || line.indexOf("disabled") >= 0 || line.indexOf("off") >= 0 || line.indexOf("no") >= 0) {
            return false;
        }
    }

    return null;
}

function tryServerCommand(npc, command) {
    try {
        var outputs = new ArceusBoss_ArrayList();
        var CapturingSource = Java.extend(ArceusBoss_CommandSource, {
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

function getTargetIdentity(target, fallbackName) {
    if (target == null) return fallbackName == null ? "" : ("" + fallbackName);

    try {
        var uuid = "" + target.getUUID();
        if (uuid != null && uuid != "" && uuid != "null") return uuid;
    } catch (e) {}

    return fallbackName == null ? "" : ("" + fallbackName);
}

function stripLeadingSlash(command) {
    var text = trimString(command);
    if (text.indexOf("/") === 0) {
        return text.substring(1);
    }
    return text;
}

function applyHalfArmorBypassHit(npc, target, baseDamage) {
    if (target == null || baseDamage <= 0) return;

    var mcTarget = unwrapMcEntity(target);
    if (mcTarget == null) return;

    var armor = getArmorValue(mcTarget);
    var fullMultiplier = getArmorTakenMultiplier(armor);
    var halfMultiplier = getArmorTakenMultiplier(armor * 0.5);
    var bonusDamage = baseDamage * (halfMultiplier - fullMultiplier);
    if (bonusDamage <= 0) return;

    try {
        target.damage(bonusDamage, npc);
    } catch (e) {}
}

function unwrapMcEntity(entity) {
    if (entity == null) return null;

    try {
        if (entity.getMCEntity) return entity.getMCEntity();
    } catch (e) {}

    return null;
}

function getArmorValue(mcEntity) {
    try {
        return mcEntity.getArmorValue();
    } catch (e) {
        return 0;
    }
}

function getArmorTakenMultiplier(armorValue) {
    var reduction = armorValue * 0.04;
    if (reduction < 0) reduction = 0;
    if (reduction > 0.8) reduction = 0.8;
    return 1.0 - reduction;
}

function readDamage(event) {
    try {
        return event.damage;
    } catch (e) {
        return 0;
    }
}

function writeDamage(event, value) {
    try {
        event.damage = value;
    } catch (e) {}
}

function getCfgFloat(npc, key, def) {
    return parseFloatSafe(npc.getStoreddata().get(key), def);
}

function parseIntSafe(s, def) {
    try {
        var value = parseInt("" + s, 10);
        return isNaN(value) ? def : value;
    } catch (e) {
        return def;
    }
}

function parseFloatSafe(s, def) {
    try {
        var value = parseFloat("" + s);
        return isNaN(value) ? def : value;
    } catch (e) {
        return def;
    }
}

function trimString(s) {
    return ("" + s).replace(/^\s+|\s+$/g, "");
}
