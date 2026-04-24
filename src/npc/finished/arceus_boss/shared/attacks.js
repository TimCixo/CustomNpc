var utils = require("utils.js");
var runtimeModule = require("runtime.js");
var damage = require("damage.js");

var Attacks_ArrayList = Java.type("java.util.ArrayList");
var Attacks_CommandSource = Java.type("net.minecraft.commands.CommandSource");
var Attacks_System = Java.type("java.lang.System");

var ARCEUS_WHOIS_CACHE_MS = 1200;

function onMeleeAttack(event) {
    var runtime = runtimeModule.ensureArceusRuntime(event.npc);
    try {
        meleeAttackCore(event, runtime);
    } catch (e) {
        runtimeModule.markRuntimeError(runtime, "meleeAttack", e);
    }
}

function onAttack(event) {
    return;
}

function meleeAttackCore(event, runtime) {
    var phase = runtime.state.phase;
    var mode = runtime.state.mode;
    if (!runtime.config.enabled) return;
    if (mode != "live") return;

    var damageValue = damage.readDamage(event);
    if (phase == 2) {
        damage.writeDamage(event, damageValue * utils.parseFloatSafe(runtime.config.phase2DamageMult, 1.20));
        return;
    }

    if (phase < 3) return;

    if (!isPlayerTarget(event.target)) {
        oneShotNonPlayerTarget(event.npc, event.target);
        return;
    }

    disableGodModeBeforeHit(event.npc, event.target, runtime);
    damageValue = damageValue * utils.parseFloatSafe(runtime.config.phase3DamageMult, 1.45)
        + utils.parseFloatSafe(runtime.config.phase3FlatBonus, 4.0);
    damage.writeDamage(event, damageValue);
    applyHalfArmorBypassHit(event.npc, event.target, damageValue, runtime.config);
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
        var mcTarget = damage.unwrapMcEntity(target);
        if (mcTarget != null && mcTarget.kill) mcTarget.kill();
    } catch (e3) {}
}

function isPlayerTarget(target) {
    if (target == null) return false;
    try {
        if (target.getType && target.getType() == 1) return true;
    } catch (e) {}
    try {
        var className = "" + target.getClass().getName();
        if (className.indexOf("Player") >= 0) return true;
    } catch (e2) {}
    try {
        var mcTarget = damage.unwrapMcEntity(target);
        if (mcTarget != null) {
            var mcClassName = "" + mcTarget.getClass().getName();
            if (mcClassName.indexOf("Player") >= 0 || mcClassName.indexOf("player") >= 0) return true;
        }
    } catch (e3) {}
    return false;
}

function disableGodModeBeforeHit(npc, target, runtime) {
    var playerName = getTargetPlayerName(target);
    if (!utils.hasText(playerName)) return;
    if (!isGodModeEnabledForTarget(npc, target, playerName, runtime)) return;
    tryServerCommand(npc, "godmode " + playerName + " disable");
}

function getTargetPlayerName(target) {
    if (target == null) return "";
    try {
        var name = "" + target.getName();
        if (utils.hasText(name) && name != "null") return name;
    } catch (e) {}
    try {
        var name2 = "" + target.getDisplayName();
        if (utils.hasText(name2) && name2 != "null") return name2;
    } catch (e2) {}
    return "";
}

function isGodModeEnabledForTarget(npc, target, playerName, runtime) {
    var info = readWhoisInfo(npc, target, playerName, runtime);
    return info != null && info.ok && info.godModeEnabled;
}

function readWhoisInfo(npc, target, playerName, runtime) {
    if (runtime.state.whoisCache == null) runtime.state.whoisCache = {};

    var cacheKey = getTargetIdentity(target, playerName);
    var now = Attacks_System.currentTimeMillis();
    var cache = runtime.state.whoisCache;
    var cached = cache[cacheKey];

    if (cached != null && now - cached.time <= ARCEUS_WHOIS_CACHE_MS) {
        return { ok: true, godModeEnabled: cached.enabled };
    }

    var output = tryServerCommand(npc, "whois " + playerName);
    var enabled = parseGodModeFromWhois(output);
    if (enabled == null) {
        return { ok: false, godModeEnabled: false };
    }

    cache[cacheKey] = { time: now, enabled: enabled };
    return { ok: true, godModeEnabled: enabled };
}

function getTargetIdentity(target, playerName) {
    try {
        return "" + target.getUUID();
    } catch (e) {
        return playerName;
    }
}

function parseGodModeFromWhois(output) {
    if (output == null) return null;

    var text = ("" + output).toLowerCase();
    if (!utils.hasText(text)) return null;

    var exact = /-\s*god mode\s*:\s*(true|false)\b/.exec(text);
    if (exact != null && exact.length >= 2) {
        return exact[1] == "true";
    }

    var lines = text.split(/\r?\n/);
    for (var i = 0; i < lines.length; i++) {
        var line = utils.trimString(lines[i]);
        if (line.indexOf("god") < 0) continue;
        if (line.indexOf("true") >= 0 || line.indexOf("enabled") >= 0 || line.indexOf("on") >= 0 || line.indexOf("yes") >= 0) return true;
        if (line.indexOf("false") >= 0 || line.indexOf("disabled") >= 0 || line.indexOf("off") >= 0 || line.indexOf("no") >= 0) return false;
    }

    return null;
}

function tryServerCommand(npc, command) {
    try {
        var outputs = new Attacks_ArrayList();
        var CapturingSource = Java.extend(Attacks_CommandSource, {
            sendSystemMessage: function(component) {
                try {
                    outputs.add(component.getString());
                } catch (e1) {
                    outputs.add("" + component);
                }
            },
            acceptsSuccess: function() { return true; },
            acceptsFailure: function() { return true; },
            shouldInformAdmins: function() { return false; }
        });

        var server = npc.getMCEntity().level().getServer();
        var source = server.createCommandSourceStack().withSource(new CapturingSource()).withPermission(4);
        server.getCommands().performPrefixedCommand(source, stripLeadingSlash(command));
        if (outputs.isEmpty()) return "";

        var parts = [];
        for (var i = 0; i < outputs.size(); i++) parts.push("" + outputs.get(i));
        return parts.join("\n");
    } catch (e) {
        return "";
    }
}

function stripLeadingSlash(command) {
    var text = utils.trimString(command);
    return text.indexOf("/") === 0 ? text.substring(1) : text;
}

function applyHalfArmorBypassHit(npc, target, damageValue, config) {
    var bypassBonus = utils.parseFloatSafe(config.phase3ArmorBypassBonus, 8.0);
    if (bypassBonus <= 0) return;

    var mcTarget = damage.unwrapMcEntity(target);
    if (mcTarget == null) return;

    try {
        mcTarget.hurt(npc.getMCEntity().damageSources().mobAttack(npc.getMCEntity()), bypassBonus);
        return;
    } catch (e) {}

    try {
        target.damage(bypassBonus, npc);
    } catch (e2) {}
}

module.exports = {
    onMeleeAttack: onMeleeAttack,
    onAttack: onAttack,
    meleeAttackCore: meleeAttackCore,
    oneShotNonPlayerTarget: oneShotNonPlayerTarget,
    isPlayerTarget: isPlayerTarget,
    disableGodModeBeforeHit: disableGodModeBeforeHit,
    getTargetPlayerName: getTargetPlayerName,
    isGodModeEnabledForTarget: isGodModeEnabledForTarget,
    readWhoisInfo: readWhoisInfo,
    getTargetIdentity: getTargetIdentity,
    parseGodModeFromWhois: parseGodModeFromWhois,
    tryServerCommand: tryServerCommand,
    stripLeadingSlash: stripLeadingSlash,
    applyHalfArmorBypassHit: applyHalfArmorBypassHit
};
