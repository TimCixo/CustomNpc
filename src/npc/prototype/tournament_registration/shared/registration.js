// @ts-check

var Cobblemon = Java.type("com.cobblemon.mod.common.Cobblemon");
var PlayerExtensionsKt = Java.type("com.cobblemon.mod.common.util.PlayerExtensionsKt");
var BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var Stats = Java.type("com.cobblemon.mod.common.api.pokemon.stats.Stats");

var OPEN_KEY = "tournament_registration_open";
var PLAYERS_KEY = "tournament_registration_players_json";

var STAT_FIELDS = [
    { key: "hp", stat: Stats.HP },
    { key: "attack", stat: Stats.ATTACK },
    { key: "defence", stat: Stats.DEFENCE },
    { key: "special_attack", stat: Stats.SPECIAL_ATTACK },
    { key: "special_defence", stat: Stats.SPECIAL_DEFENCE },
    { key: "speed", stat: Stats.SPEED }
];

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @returns {boolean}
 */
function isOpen(npc) {
    return "" + npc.getStoreddata().get(OPEN_KEY) == "1";
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @param {boolean} value
 */
function setOpen(npc, value) {
    npc.getStoreddata().put(OPEN_KEY, value ? "1" : "0");
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @returns {any[]}
 */
function getRegistrations(npc) {
    var raw = npc.getStoreddata().get(PLAYERS_KEY);
    if (raw == null || raw == "" || raw == "null" || raw == "undefined") return [];

    try {
        var parsed = JSON.parse("" + raw);
        if (parsed != null && parsed.length != null) return parsed;
    } catch (e) {}

    return [];
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @param {any[]} list
 * @returns {any[]}
 */
function setRegistrations(npc, list) {
    npc.getStoreddata().put(PLAYERS_KEY, stringify(list, "[]"));
    return list;
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 */
function clearRegistrations(npc) {
    setRegistrations(npc, []);
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @param {import("noppes.npcs.api.entity").IPlayer} player
 * @returns {any}
 */
function registerPlayer(npc, player) {
    var list = getRegistrations(npc);
    var snapshot = createPlayerSnapshot(player);
    var existingIndex = findRegistrationIndex(list, snapshot.uuid, snapshot.name);

    if (existingIndex >= 0) {
        list[existingIndex] = snapshot;
    } else {
        list.push(snapshot);
    }

    setRegistrations(npc, list);
    return snapshot;
}

/**
 * @param {any[]} list
 * @param {string} uuid
 * @param {string} name
 * @returns {number}
 */
function findRegistrationIndex(list, uuid, name) {
    for (var i = 0; i < list.length; i++) {
        var entry = list[i];
        if (entry == null) continue;
        if (uuid != "" && entry.uuid == uuid) return i;
        if (entry.name == name) return i;
    }
    return -1;
}

/**
 * @param {import("noppes.npcs.api.entity").IPlayer} player
 * @returns {any}
 */
function createPlayerSnapshot(player) {
    return {
        name: getPlayerName(player),
        uuid: getPlayerUuid(player),
        pokemon: createPartySnapshot(player)
    };
}

/**
 * @param {import("noppes.npcs.api.entity").IPlayer} player
 * @returns {any[]}
 */
function createPartySnapshot(player) {
    var result = [];

    for (var i = 0; i < 6; i++) {
        var pokemon = getPartyPokemon(player, i);
        if (pokemon != null) {
            result.push(serializePokemon(pokemon, i + 1));
        }
    }

    return result;
}

/**
 * @param {any} pokemon
 * @param {number} slot
 * @returns {any}
 */
function serializePokemon(pokemon, slot) {
    return {
        slot: slot,
        pokemon: getPokemonDisplayName(pokemon),
        species: getPokemonSpeciesId(pokemon),
        iv: serializeStats(pokemon, "getIvs"),
        ev: serializeStats(pokemon, "getEvs"),
        attacks: serializeMoves(pokemon),
        ability: getPokemonAbilityName(pokemon),
        heldItem: getPokemonHeldItemId(pokemon)
    };
}

/**
 * @param {any} pokemon
 * @param {string} getterName
 * @returns {any}
 */
function serializeStats(pokemon, getterName) {
    var output = {};

    try {
        var stats = pokemon[getterName]();
        for (var i = 0; i < STAT_FIELDS.length; i++) {
            output[STAT_FIELDS[i].key] = parseIntSafe(stats.get(STAT_FIELDS[i].stat), 0);
        }
    } catch (e) {
        for (var j = 0; j < STAT_FIELDS.length; j++) {
            output[STAT_FIELDS[j].key] = 0;
        }
    }

    return output;
}

/**
 * @param {any} pokemon
 * @returns {string[]}
 */
function serializeMoves(pokemon) {
    var names = [];

    try {
        var moveSet = pokemon.getMoveSet();
        for (var i = 0; i < 4; i++) {
            var move = moveSet.get(i);
            if (move != null) names.push("" + move.getName());
        }
    } catch (e) {}

    return names;
}

/**
 * @param {import("noppes.npcs.api.entity").IPlayer} player
 * @returns {any}
 */
function getPlayerParty(player) {
    try {
        return PlayerExtensionsKt.party(player.getMCEntity());
    } catch (e1) {
        try {
            return Cobblemon.INSTANCE.getStorage().getParty(player.getMCEntity());
        } catch (e2) {
            return null;
        }
    }
}

/**
 * @param {import("noppes.npcs.api.entity").IPlayer} player
 * @param {number} index
 * @returns {any}
 */
function getPartyPokemon(player, index) {
    var party = getPlayerParty(player);
    if (party == null) return null;

    try {
        if (index < 0 || index >= party.size()) return null;
        return party.get(index);
    } catch (e) {
        return null;
    }
}

/**
 * @param {any} pokemon
 * @returns {string}
 */
function getPokemonDisplayName(pokemon) {
    try {
        var display = pokemon.getDisplayName(false);
        if (display != null) {
            var text = "" + display.getString();
            if (hasText(text)) return text;
        }
    } catch (e1) {}

    try {
        var translated = pokemon.getSpecies().getTranslatedName();
        if (translated != null) {
            var translatedText = "" + translated.getString();
            if (hasText(translatedText)) return translatedText;
        }
    } catch (e2) {}

    return "unknown";
}

/**
 * @param {any} pokemon
 * @returns {string}
 */
function getPokemonSpeciesId(pokemon) {
    try {
        return "" + pokemon.getSpecies().getResourceIdentifier();
    } catch (e) {
        return "";
    }
}

/**
 * @param {any} pokemon
 * @returns {string}
 */
function getPokemonAbilityName(pokemon) {
    try {
        return "" + pokemon.getAbility().getName();
    } catch (e) {
        return "";
    }
}

/**
 * @param {any} pokemon
 * @returns {string}
 */
function getPokemonHeldItemId(pokemon) {
    try {
        var heldItem = pokemon.heldItem();
        if (heldItem != null && !heldItem.isEmpty()) {
            return "" + BuiltInRegistries.ITEM.getKey(heldItem.getItem());
        }
    } catch (e) {}

    return "";
}

/**
 * @param {import("noppes.npcs.api.entity").IPlayer} player
 * @returns {string}
 */
function getPlayerName(player) {
    try {
        return "" + player.getName();
    } catch (e1) {
        try {
            return "" + player.name;
        } catch (e2) {
            return "unknown";
        }
    }
}

/**
 * @param {import("noppes.npcs.api.entity").IPlayer} player
 * @returns {string}
 */
function getPlayerUuid(player) {
    try {
        return "" + player.getMCEntity().getUUID();
    } catch (e1) {
        try {
            return "" + player.getUUID();
        } catch (e2) {
            return "";
        }
    }
}

/**
 * @param {any} value
 * @param {number} fallback
 * @returns {number}
 */
function parseIntSafe(value, fallback) {
    try {
        var parsed = parseInt("" + value, 10);
        return isNaN(parsed) ? fallback : parsed;
    } catch (e) {
        return fallback;
    }
}

/**
 * @param {any} value
 * @returns {boolean}
 */
function hasText(value) {
    return value != null && ("" + value).replace(/^\s+|\s+$/g, "").length > 0;
}

/**
 * @param {any} value
 * @param {string} fallback
 * @returns {string}
 */
function stringify(value, fallback) {
    try {
        return JSON.stringify(value);
    } catch (e) {
        return fallback;
    }
}

/**
 * @param {import("noppes.npcs.api.entity").ICustomNpc} npc
 * @returns {string}
 */
function formatRegistrationsJson(npc) {
    try {
        return JSON.stringify(getRegistrations(npc), null, 2);
    } catch (e) {
        return "[]";
    }
}

module.exports = {
    OPEN_KEY: OPEN_KEY,
    PLAYERS_KEY: PLAYERS_KEY,
    isOpen: isOpen,
    setOpen: setOpen,
    getRegistrations: getRegistrations,
    setRegistrations: setRegistrations,
    clearRegistrations: clearRegistrations,
    registerPlayer: registerPlayer,
    formatRegistrationsJson: formatRegistrationsJson
};
