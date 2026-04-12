var COUNT_KEY = "shared_demo_count";
var LAST_PLAYER_KEY = "shared_demo_last_player";

function trim(value) {
    return ("" + value).replace(/^\s+|\s+$/g, "");
}

function hasText(value) {
    return value != null && trim(value).length > 0;
}

function parseIntSafe(value, fallback) {
    var parsed = parseInt(trim(value), 10);
    return isNaN(parsed) ? fallback : parsed;
}

module.exports = {
    ensureState: function(npc) {
        if (npc == null) return;

        var data = npc.getStoreddata();
        if (data == null) return;

        if (!hasText(data.get(COUNT_KEY))) {
            data.put(COUNT_KEY, "0");
        }

        if (!hasText(data.get(LAST_PLAYER_KEY))) {
            data.put(LAST_PLAYER_KEY, "");
        }
    },

    increment: function(npc, playerName) {
        this.ensureState(npc);

        var data = npc.getStoreddata();
        var nextCount = parseIntSafe(data.get(COUNT_KEY), 0) + 1;

        data.put(COUNT_KEY, "" + nextCount);
        data.put(LAST_PLAYER_KEY, hasText(playerName) ? playerName : "");
        return nextCount;
    },

    buildStatus: function(npc) {
        this.ensureState(npc);

        var data = npc.getStoreddata();
        var count = parseIntSafe(data.get(COUNT_KEY), 0);
        var lastPlayer = trim(data.get(LAST_PLAYER_KEY));

        if (!hasText(lastPlayer)) lastPlayer = "<none>";
        return "Shared demo count=" + count + ", last_player=" + lastPlayer;
    }
};
