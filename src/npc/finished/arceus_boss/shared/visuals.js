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
    readNpcTitle: readNpcTitle,
    getNpcDisplayName: getNpcDisplayName,
    getNpcUuid: getNpcUuid,
    setNpcHealthSafe: setNpcHealthSafe,
    readNpcHealth: readNpcHealth,
    readNpcMaxHealth: readNpcMaxHealth,
    resetLiveVisualState: resetLiveVisualState,
    announceArceusRespawn: announceArceusRespawn
};
