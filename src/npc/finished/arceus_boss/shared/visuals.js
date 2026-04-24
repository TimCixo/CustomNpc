var utils = require("utils.js");

function ensureHideDeadBody(npc) {
    try {
        npc.getStats().setHideDeadBody(true);
    } catch (e) {}
}

function setNoAiState(npc, enabled) {
    try {
        npc.getMCEntity().setNoAi(enabled ? true : false);
    } catch (e) {}
}

function setEntityInvulnerable(npc, enabled) {
    try {
        npc.getMCEntity().setInvulnerable(enabled ? true : false);
    } catch (e) {}
}

function clearEntityDamageVisuals(npc) {
    try {
        npc.getMCEntity().invulnerableTime = 0;
    } catch (e) {}
    try {
        npc.getMCEntity().hurtTime = 0;
    } catch (e1) {}
    try {
        npc.getMCEntity().hurtDuration = 0;
    } catch (e2) {}
    try {
        npc.getMCEntity().deathTime = 0;
    } catch (e3) {}
}

function ensureBossBarEnabled(npc) {
    try {
        if (npc.getDisplay && npc.getDisplay() && npc.getDisplay().setBossbar) {
            npc.getDisplay().setBossbar(1);
            return;
        }
    } catch (e) {}
    try {
        if (npc.display && npc.display.setBossbar) {
            npc.display.setBossbar(1);
        }
    } catch (e1) {}
}

function applyBossBarColor(npc, colorName) {
    var colorId = 0;
    if (colorName == "yellow") colorId = 4;
    if (colorName == "red") colorId = 2;
    try {
        if (npc.getDisplay && npc.getDisplay() && npc.getDisplay().setBossColor) {
            npc.getDisplay().setBossColor(colorId);
            return;
        }
    } catch (e) {}
    try {
        if (npc.display && npc.display.setBossColor) {
            npc.display.setBossColor(colorId);
        }
    } catch (e1) {}
}

function restoreNameplate(npc, baseTitle) {
    try {
        if (npc.getDisplay && npc.getDisplay() && npc.getDisplay().setTitle) {
            npc.getDisplay().setTitle(utils.hasText(baseTitle) ? baseTitle : "Аркеус");
        }
    } catch (e) {}
}

function restoreVisibleBody(npc) {
    try {
        if (npc.getDisplay && npc.getDisplay() && npc.getDisplay().setVisible) {
            npc.getDisplay().setVisible(0);
        }
    } catch (e) {}
}

function updateNpcClient(npc) {
    try {
        npc.updateClient();
    } catch (e) {}
}

function playSoundForAllPlayers(npc, soundId, volume, pitch) {
    if (!utils.hasText(soundId)) return;
    try {
        var players = npc.getWorld().getAllPlayers();
        if (players == null) return;
        for (var i = 0; i < players.length; i++) {
            players[i].playSound(soundId, volume, pitch);
        }
    } catch (e) {}
}

function spawnPhaseWindChargeBurst(npc, config) {
    var world = null;
    try {
        world = npc.getWorld();
    } catch (e) {}
    if (world == null) return;

    var x = npc.getX();
    var y = npc.getY() + 1.2;
    var z = npc.getZ();
    try {
        world.spawnParticle("minecraft:gust", x, y, z, 1.2, 0.7, 1.2, 0.02, 36);
    } catch (e1) {}
    try {
        world.spawnParticle("minecraft:cloud", x, y, z, 1.4, 0.5, 1.4, 0.03, 48);
    } catch (e2) {}
    try {
        world.spawnParticle("minecraft:poof", x, y, z, 1.0, 0.5, 1.0, 0.02, 24);
    } catch (e3) {}
    playSoundForAllPlayers(npc, "minecraft:entity.wind_charge.wind_burst", 1.15, 1.0);
}

function launchNearbyPlayersOnPhaseStart(npc, config) {
    var players = null;
    var radius = config == null ? 18.0 : utils.parseFloatSafe(config.phaseTransitionLaunchRadius, 18.0);
    var push = config == null ? 1.85 : utils.parseFloatSafe(config.phaseTransitionLaunchPush, 1.85);
    var vertical = config == null ? 1.15 : utils.parseFloatSafe(config.phaseTransitionLaunchVertical, 1.15);
    if (radius <= 0 || push <= 0) return;

    try {
        players = npc.getWorld().getAllPlayers();
    } catch (e) {
        players = null;
    }
    if (players == null) return;

    var radiusSq = radius * radius;
    for (var i = 0; i < players.length; i++) {
        var player = players[i];
        if (player == null) continue;
        var dx = player.getX() - npc.getX();
        var dz = player.getZ() - npc.getZ();
        if (dx * dx + dz * dz > radiusSq) continue;
        launchPlayerFromNpc(npc, player, push, vertical);
    }
}

function launchPlayerFromNpc(npc, player, push, vertical) {
    if (player == null) return;

    var dx = player.getX() - npc.getX();
    var dz = player.getZ() - npc.getZ();
    var dist = Math.sqrt(dx * dx + dz * dz);
    if (dist < 0.001) {
        dx = 0;
        dz = 1;
        dist = 1;
    }

    var mx = dx / dist * push;
    var mz = dz / dist * push;
    var my = vertical <= 0 ? 0.6 : vertical;

    try {
        var mcPlayer = player.getMCEntity();
        mcPlayer.push(mx, my, mz);
        try {
            mcPlayer.hurtMarked = true;
        } catch (e0) {}
        return;
    } catch (e1) {}
    try {
        player.setMotionX(mx);
        player.setMotionY(my);
        player.setMotionZ(mz);
        return;
    } catch (e2) {}
    try {
        player.knockback(push, -dx / dist, -dz / dist);
    } catch (e3) {}
}

function safeSay(npc, line) {
    if (!utils.hasText(line)) return;
    try {
        npc.say(line);
    } catch (e) {
        broadcastBossMessage(npc, line);
    }
}

function broadcastBossMessage(npc, message) {
    if (!utils.hasText(message)) return;
    try {
        var players = npc.getWorld().getAllPlayers();
        if (players == null) return;
        for (var i = 0; i < players.length; i++) {
            players[i].message(message);
        }
    } catch (e) {}
}

function readNpcTitle(npc) {
    try {
        if (npc.getDisplay && npc.getDisplay() && npc.getDisplay().getTitle) {
            var title = "" + npc.getDisplay().getTitle();
            if (utils.hasText(title) && title != "null") return title;
        }
    } catch (e) {}
    try {
        var name = "" + npc.getName();
        if (utils.hasText(name) && name != "null") return name;
    } catch (e1) {}
    return "Аркеус";
}

function getNpcDisplayName(npc) {
    return readNpcTitle(npc);
}

function getNpcUuid(npc) {
    try {
        return "" + npc.getUUID();
    } catch (e) {
        return "";
    }
}

function setNpcHealthSafe(npc, value) {
    var target = Math.max(1, Math.floor(value));
    try {
        npc.setHealth(target);
        return;
    } catch (e) {}
    try {
        npc.getMCEntity().setHealth(target);
    } catch (e1) {}
}

function readNpcHealth(npc) {
    try {
        return npc.getHealth();
    } catch (e) {
        return 1;
    }
}

function readNpcMaxHealth(npc) {
    try {
        return npc.getMaxHealth();
    } catch (e) {
        return 1;
    }
}

function resetLiveVisualState(npc, config) {
    ensureHideDeadBody(npc);
    setNoAiState(npc, false);
    setEntityInvulnerable(npc, false);
    clearEntityDamageVisuals(npc);
    ensureBossBarEnabled(npc);
    applyBossBarColor(npc, "white");
    restoreNameplate(npc, config == null ? "" : config.baseTitle);
    restoreVisibleBody(npc);
    updateNpcClient(npc);
}

function announceArceusRespawn(npc, config) {
    var title = config != null && utils.hasText(config.baseTitle) ? config.baseTitle : "Аркеус";
    broadcastBossMessage(npc, "§f" + title + " §aвозродился.");
}

function announceArceusRespawn(npc, config) {
    broadcastBossMessage(npc, "\u00A7e\u0410\u0440\u043A\u0435\u0443\u0441 \u0432\u043E\u0437\u0440\u043E\u0434\u0438\u043B\u0441\u044F [\u0422\u0435\u043B\u0435\u043F\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F]");
}

module.exports = {
    ensureHideDeadBody: ensureHideDeadBody,
    setNoAiState: setNoAiState,
    setEntityInvulnerable: setEntityInvulnerable,
    clearEntityDamageVisuals: clearEntityDamageVisuals,
    ensureBossBarEnabled: ensureBossBarEnabled,
    applyBossBarColor: applyBossBarColor,
    restoreNameplate: restoreNameplate,
    restoreVisibleBody: restoreVisibleBody,
    updateNpcClient: updateNpcClient,
    playSoundForAllPlayers: playSoundForAllPlayers,
    safeSay: safeSay,
    broadcastBossMessage: broadcastBossMessage,
    spawnPhaseWindChargeBurst: spawnPhaseWindChargeBurst,
    launchNearbyPlayersOnPhaseStart: launchNearbyPlayersOnPhaseStart,
    launchPlayerFromNpc: launchPlayerFromNpc,
    readNpcTitle: readNpcTitle,
    getNpcDisplayName: getNpcDisplayName,
    getNpcUuid: getNpcUuid,
    setNpcHealthSafe: setNpcHealthSafe,
    readNpcHealth: readNpcHealth,
    readNpcMaxHealth: readNpcMaxHealth,
    resetLiveVisualState: resetLiveVisualState,
    announceArceusRespawn: announceArceusRespawn
};
