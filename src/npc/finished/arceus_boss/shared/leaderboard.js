var utils = require("utils.js");

function recordDamageToRuntime(runtime, player, amount) {
    if (player == null || amount <= 0) return;
    var uuid = "" + player.getUUID();
    var name = "" + player.getName();
    var current = runtime.state.damageMap[uuid];
    if (current == null) {
        current = { uuid: uuid, name: name, damage: 0 };
        runtime.state.damageMap[uuid] = current;
    }
    current.damage += amount;
    current.name = name;
    runtime.state.liveSnapshot = buildSortedSnapshot(runtime.state.damageMap);
}

function buildLiveSnapshot(runtime) {
    runtime.state.liveSnapshot = buildSortedSnapshot(runtime.state.damageMap);
    return runtime.state.liveSnapshot;
}

function freezeSnapshot(runtime) {
    runtime.state.frozenSnapshot = cloneSnapshot(
        runtime.state.liveSnapshot != null && runtime.state.liveSnapshot.length > 0
            ? runtime.state.liveSnapshot
            : buildSortedSnapshot(runtime.state.damageMap)
    );
    return runtime.state.frozenSnapshot;
}

function buildSortedSnapshot(map) {
    var out = [];
    for (var key in map) {
        if (!map.hasOwnProperty(key)) continue;
        var entry = map[key];
        if (entry == null || entry.damage <= 0) continue;
        out.push({
            uuid: entry.uuid,
            name: utils.hasText(entry.name) ? entry.name : entry.uuid,
            damage: entry.damage
        });
    }
    out.sort(function(a, b) {
        return b.damage - a.damage;
    });
    return out;
}

function cloneSnapshot(snapshot) {
    var out = [];
    if (snapshot == null) return out;
    for (var i = 0; i < snapshot.length; i++) {
        out.push({
            uuid: snapshot[i].uuid,
            name: snapshot[i].name,
            damage: snapshot[i].damage
        });
    }
    return sortSnapshot(out);
}

function sortSnapshot(snapshot) {
    if (snapshot == null) return [];
    snapshot.sort(function(a, b) {
        return b.damage - a.damage;
    });
    return snapshot;
}

function announceFrozenSnapshot(runtime, visuals) {
    if (runtime.state.leaderboardAnnounced) return;

    var snapshot = runtime.state.frozenSnapshot;
    if (snapshot == null || snapshot.length <= 0) {
        runtime.state.leaderboardAnnounced = true;
        return;
    }

    visuals.broadcastBossMessage(runtime.npc, "\u00A76\u0422\u043E\u043F \u043F\u043E \u0443\u0440\u043E\u043D\u0443 \u043F\u043E \u0410\u0440\u043A\u0435\u0443\u0441\u0443:");
    for (var i = 0; i < snapshot.length; i++) {
        var entry = snapshot[i];
        visuals.broadcastBossMessage(
            runtime.npc,
            "\u00A7e#" + (i + 1) + " \u00A7f" + entry.name + " \u00A77- \u00A7c" + formatDamage(entry.damage)
        );
    }

    runtime.state.leaderboardAnnounced = true;
}

function resolveRewardPlayer(npc, entry, players) {
    if (entry == null) return null;
    if (players != null) {
        for (var i = 0; i < players.length; i++) {
            if (samePlayerUuid(players[i], entry.uuid)) return players[i];
        }
        for (var j = 0; j < players.length; j++) {
            if (samePlayerName(players[j], entry.name)) return players[j];
        }
    }
    try {
        return npc.getWorld().getPlayer(entry.name);
    } catch (e) {
        return null;
    }
}

function resolvePlayerByUuidOrName(npc, uuid, name, players) {
    if (players != null) {
        for (var i = 0; i < players.length; i++) {
            if (samePlayerUuid(players[i], uuid)) return players[i];
        }
        for (var j = 0; j < players.length; j++) {
            if (samePlayerName(players[j], name)) return players[j];
        }
    }
    return null;
}

function samePlayerUuid(player, uuid) {
    if (player == null || uuid == null || uuid == "") return false;
    try {
        return ("" + player.getUUID()) == ("" + uuid);
    } catch (e) {
        return false;
    }
}

function samePlayerName(player, name) {
    if (player == null || name == null || name == "") return false;
    try {
        if (("" + player.getName()) == ("" + name)) return true;
    } catch (e) {}
    try {
        if (("" + player.getDisplayName()) == ("" + name)) return true;
    } catch (e2) {}
    return false;
}

function getOnlinePlayers(npc) {
    try {
        return npc.getWorld().getAllPlayers();
    } catch (e) {
        return null;
    }
}

function formatDamage(value) {
    var rounded = Math.floor(value * 10 + 0.5) / 10;
    if (rounded == Math.floor(rounded)) return "" + Math.floor(rounded);
    return "" + rounded;
}

module.exports = {
    recordDamageToRuntime: recordDamageToRuntime,
    buildLiveSnapshot: buildLiveSnapshot,
    freezeSnapshot: freezeSnapshot,
    buildSortedSnapshot: buildSortedSnapshot,
    cloneSnapshot: cloneSnapshot,
    sortSnapshot: sortSnapshot,
    announceFrozenSnapshot: announceFrozenSnapshot,
    resolveRewardPlayer: resolveRewardPlayer,
    resolvePlayerByUuidOrName: resolvePlayerByUuidOrName,
    samePlayerUuid: samePlayerUuid,
    samePlayerName: samePlayerName,
    getOnlinePlayers: getOnlinePlayers,
    formatDamage: formatDamage
};
