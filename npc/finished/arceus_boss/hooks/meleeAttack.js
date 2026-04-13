var ArceusBoss_ArrayList = Java.type("java.util.ArrayList");
var ArceusBoss_CommandSource = Java.type("net.minecraft.commands.CommandSource");
var ArceusBoss_System = Java.type("java.lang.System");

var ARCEUS_RUNTIME_KEY = "arceus_runtime";
var ARCEUS_CONFIG_KEY = "arceus_config_json";
var ARCEUS_LIFECYCLE_KEY = "arceus_lifecycle_json";
var ARCEUS_CONFIG_VERSION = 12;
var ARCEUS_WHOIS_CACHE_MS = 1200;

function meleeAttack(event) {
    var runtime = ensureArceusRuntime(event.npc);
    attachCombatSubsystem(runtime);

    try {
        runtime.combat.onMeleeAttack(event);
    } catch (e) {
        markRuntimeError(runtime, "meleeAttack", e);
    }
}

function attachCombatSubsystem(runtime) {
    if (runtime.combat != null && runtime.combat.ready) return;

    runtime.combat = {
        ready: true,
        onMeleeAttack: function(event) {
            meleeAttackCore(event, runtime);
        }
    };
}

function meleeAttackCore(event, runtime) {
    var phase = runtime.state.phase;
    var mode = runtime.state.mode;
    if (!runtime.config.enabled) return;
    if (mode != "live") return;

    var damage = readDamage(event);
    if (phase == 2) {
        writeDamage(event, damage * configFloat(runtime.config.phase2DamageMult, 1.20));
        return;
    }

    if (phase < 3) return;

    if (!isPlayerTarget(event.target)) {
        oneShotNonPlayerTarget(event.npc, event.target);
        return;
    }

    disableGodModeBeforeHit(event.npc, event.target, runtime);
    damage = damage * configFloat(runtime.config.phase3DamageMult, 1.45)
        + configFloat(runtime.config.phase3FlatBonus, 4.0);
    writeDamage(event, damage);
    applyHalfArmorBypassHit(event.npc, event.target, damage, runtime.config);
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
        var mcTarget = unwrapMcEntity(target);
        if (mcTarget != null) {
            var mcClassName = "" + mcTarget.getClass().getName();
            if (mcClassName.indexOf("Player") >= 0 || mcClassName.indexOf("player") >= 0) return true;
        }
    } catch (e3) {}
    return false;
}

function disableGodModeBeforeHit(npc, target, runtime) {
    var playerName = getTargetPlayerName(target);
    if (!hasText(playerName)) return;
    if (!isGodModeEnabledForTarget(npc, target, playerName, runtime)) return;
    tryServerCommand(npc, "godmode " + playerName + " disable");
}

function getTargetPlayerName(target) {
    if (target == null) return "";
    try {
        var name = "" + target.getName();
        if (hasText(name) && name != "null") return name;
    } catch (e) {}
    try {
        var name2 = "" + target.getDisplayName();
        if (hasText(name2) && name2 != "null") return name2;
    } catch (e2) {}
    return "";
}

function isGodModeEnabledForTarget(npc, target, playerName, runtime) {
    var info = readWhoisInfo(npc, target, playerName, runtime);
    return info != null && info.ok && info.godModeEnabled;
}

function readWhoisInfo(npc, target, playerName, runtime) {
    var cacheKey = getTargetIdentity(target, playerName);
    var now = ArceusBoss_System.currentTimeMillis();
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
    if (!hasText(text)) return null;

    var exact = /-\s*god mode\s*:\s*(true|false)\b/.exec(text);
    if (exact != null && exact.length >= 2) {
        return exact[1] == "true";
    }

    var lines = text.split(/\r?\n/);
    for (var i = 0; i < lines.length; i++) {
        var line = trimString(lines[i]);
        if (line.indexOf("god") < 0) continue;
        if (line.indexOf("true") >= 0 || line.indexOf("enabled") >= 0 || line.indexOf("on") >= 0 || line.indexOf("yes") >= 0) return true;
        if (line.indexOf("false") >= 0 || line.indexOf("disabled") >= 0 || line.indexOf("off") >= 0 || line.indexOf("no") >= 0) return false;
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
            acceptsSuccess: function() { return true; },
            acceptsFailure: function() { return true; },
            shouldInformAdmins: function() { return false; }
        });

        var server = npc.getMCEntity().level().getServer();
        var source = server.createCommandSourceStack().withSource(new CapturingSource()).withPermission(4);
        server.getCommands().performPrefixedCommand(source, stripLeadingSlash(command));
        if (outputs.isEmpty()) return "";

        var parts = [];
        for (var i = 0; i < outputs.size(); i++) {
            parts.push("" + outputs.get(i));
        }
        return parts.join("\n");
    } catch (e) {
        return "";
    }
}

function stripLeadingSlash(command) {
    var text = trimString(command);
    return text.indexOf("/") === 0 ? text.substring(1) : text;
}

function applyHalfArmorBypassHit(npc, target, damage, config) {
    var bypassBonus = configFloat(config.phase3ArmorBypassBonus, 8.0);
    if (bypassBonus <= 0) return;

    var mcTarget = unwrapMcEntity(target);
    if (mcTarget == null) return;

    try {
        mcTarget.hurt(npc.getMCEntity().damageSources().mobAttack(npc.getMCEntity()), bypassBonus);
        return;
    } catch (e) {}

    try {
        target.damage(bypassBonus, npc);
    } catch (e2) {}
}

function unwrapMcEntity(entity) {
    if (entity == null) return null;
    try {
        if (entity.getMCEntity) return entity.getMCEntity();
    } catch (e) {}
    return null;
}

function readDamage(event) {
    try {
        return event.getDamage();
    } catch (e) {}
    try {
        return event.damage;
    } catch (e2) {}
    return 0;
}

function writeDamage(event, value) {
    try {
        event.setDamage(value);
        return;
    } catch (e) {}
    try {
        event.damage = value;
    } catch (e2) {}
}

function ensureArceusRuntime(npc) {
    var temp = npc.getTempdata();
    var runtime = null;

    try {
        runtime = temp.get(ARCEUS_RUNTIME_KEY);
    } catch (e) {
        runtime = null;
    }

    var config = mergeConfig(parseJsonSafe(npc.getStoreddata().get(ARCEUS_CONFIG_KEY)));
    var state = mergeLifecycle(parseJsonSafe(npc.getStoreddata().get(ARCEUS_LIFECYCLE_KEY)));

    if (runtime == null || runtime.version != ARCEUS_CONFIG_VERSION) {
        runtime = {
            version: ARCEUS_CONFIG_VERSION,
            npc: npc,
            config: config,
            state: state,
            combat: {},
            phases: {},
            deathFlow: {},
            rewards: {},
            leaderboard: {},
            visuals: {},
            clockLink: {},
            debug: {}
        };
        temp.put(ARCEUS_RUNTIME_KEY, runtime);
        return runtime;
    }

    runtime.npc = npc;
    runtime.config = config;
    runtime.state = state;
    if (runtime.state.whoisCache == null) runtime.state.whoisCache = {};
    return runtime;
}

function markRuntimeError(runtime, hook, error) {
    if (runtime == null || runtime.state == null) return;
    if (runtime.state.debug == null) {
        runtime.state.debug = { lastErrorHook: "-", lastErrorMessage: "-" };
    }
    runtime.state.debug.lastErrorHook = hook == null ? "-" : ("" + hook);
    runtime.state.debug.lastErrorMessage = sanitizeErrorMessage(error);
    runtime.npc.getStoreddata().put(ARCEUS_LIFECYCLE_KEY, JSON.stringify(runtime.state));
}

function sanitizeErrorMessage(error) {
    try {
        var text = trimString("" + error);
        return text.length > 200 ? text.substring(0, 200) : text;
    } catch (e) {
        return "unknown";
    }
}

function parseJsonSafe(raw) {
    if (raw == null || raw == "" || raw == "null") return null;
    try {
        return JSON.parse("" + raw);
    } catch (e) {
        return null;
    }
}

function createDefaultConfig() {
    return {
        version: ARCEUS_CONFIG_VERSION,
        enabled: true,
        phase2DamageMult: 1.20,
        phase3DamageMult: 1.45,
        phase3FlatBonus: 4,
        phase3ArmorBypassBonus: 8.0
    };
}

function mergeConfig(raw) {
    var base = createDefaultConfig();
    if (raw == null) return base;
    for (var key in base) {
        if (!base.hasOwnProperty(key)) continue;
        if (raw[key] === undefined || raw[key] === null) continue;
        base[key] = raw[key];
    }
    return base;
}

function createDefaultLifecycle() {
    return {
        mode: "live",
        phase: 1,
        whoisCache: {},
        debug: {
            lastErrorHook: "-",
            lastErrorMessage: "-"
        }
    };
}

function mergeLifecycle(raw) {
    var base = createDefaultLifecycle();
    if (raw == null) return base;
    for (var key in base) {
        if (!base.hasOwnProperty(key)) continue;
        if (raw[key] === undefined || raw[key] === null) continue;
        base[key] = raw[key];
    }
    if (base.whoisCache == null) base.whoisCache = {};
    if (base.debug == null) base.debug = { lastErrorHook: "-", lastErrorMessage: "-" };
    return base;
}

function configFloat(value, def) {
    try {
        var parsed = parseFloat("" + value);
        return isNaN(parsed) ? def : parsed;
    } catch (e) {
        return def;
    }
}

function hasText(value) {
    return value != null && trimString(value).length > 0;
}

function trimString(value) {
    return ("" + value).replace(/^\s+|\s+$/g, "");
}
