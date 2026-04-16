var PokeBattleStarter_PokemonProperties = Java.type("com.cobblemon.mod.common.api.pokemon.PokemonProperties");
var PokeBattleStarter_BattleBuilder = Java.type("com.cobblemon.mod.common.battles.BattleBuilder");
var PokeBattleStarter_BattleFormat = Java.type("com.cobblemon.mod.common.battles.BattleFormat");
var PokeBattleStarter_ErroredBattleStart = Java.type("com.cobblemon.mod.common.battles.ErroredBattleStart");
var PokeBattleStarter_BattleRegistry = Java.type("com.cobblemon.mod.common.battles.BattleRegistry");
var PokeBattleStarter_UncatchableProperty = Java.type("com.cobblemon.mod.common.pokemon.properties.UncatchableProperty");
var PokeBattleStarter_System = Java.type("java.lang.System");

function interact(event) {
    var npc = event.npc;
    var player = event.player;
    var data = npc.getStoreddata();

    event.setCanceled(true);

    if (data.get("pokebattle_enabled") != "1") {
        player.message("§7This trainer is not ready to battle.");
        return;
    }

    var now = PokeBattleStarter_System.currentTimeMillis();
    var lastStart = parseLongSafe(data.get("pokebattle_last_start_ms"), 0);
    var cooldownMs = parseIntSafe(data.get("pokebattle_cooldown_ms"), 3000);
    if (cooldownMs > 0 && now - lastStart < cooldownMs) {
        player.message("§7Wait a moment before starting another battle.");
        return;
    }

    var serverPlayer = player.getMCEntity();
    if (serverPlayer == null) {
        player.message("§cCould not resolve the Minecraft player entity.");
        return;
    }

    if (isPlayerInBattle(serverPlayer)) {
        player.message("§eYou are already in a Cobblemon battle.");
        return;
    }

    var pokemonEntity = createOpponentPokemon(npc, serverPlayer);
    if (pokemonEntity == null) {
        player.message("§cCould not create the battle Pokemon. Check pokebattle_species and level.");
        return;
    }

    if (!prepareOpponentPokemon(npc, pokemonEntity)) {
        player.message("§cCould not prepare the battle Pokemon.");
        return;
    }

    data.put("pokebattle_last_start_ms", "" + now);

    var result;
    try {
        result = PokeBattleStarter_BattleBuilder.INSTANCE.pve(
            serverPlayer,
            pokemonEntity,
            null,
            PokeBattleStarter_BattleFormat.Companion.getGEN_9_SINGLES(),
            readBool(data.get("pokebattle_clone_player_party")),
            readBool(data.get("pokebattle_heal_player_first")),
            parseFloatSafe(data.get("pokebattle_flee_distance"), 16.0)
        );
    } catch (e) {
        player.message("§cCobblemon battle start failed: " + shortError(e));
        tryRemove(pokemonEntity);
        return;
    }

    if (isErroredBattleStart(result)) {
        sendBattleErrors(result, serverPlayer, player);
        tryRemove(pokemonEntity);
        return;
    }

    data.put("pokebattle_anchor_uuid", getEntityUuid(pokemonEntity));
    data.put("pokebattle_player_uuid", getEntityUuid(serverPlayer));
    data.put("pokebattle_capture_active_seen", "0");
    if (!readBool(data.get("pokebattle_spawn_visible"))) {
        hideBattleAnchor(pokemonEntity);
    }
    player.message("§aBattle started!");
}

function createOpponentPokemon(npc, serverPlayer) {
    var data = npc.getStoreddata();
    var species = trimString(data.get("pokebattle_species"));
    if (species.length == 0) return null;

    try {
        var props = PokeBattleStarter_PokemonProperties.Companion.parse(species);
        if (props == null || !hasText(props.getSpecies())) return null;

        props.setLevel(clamp(parseIntSafe(data.get("pokebattle_level"), 15), 1, 100));
        props.setShiny(readBool(data.get("pokebattle_shiny")));

        var level = npc.getMCEntity().level();
        var pokemonEntity = props.createEntity(level, serverPlayer);
        markUncatchable(pokemonEntity);
        return pokemonEntity;
    } catch (e) {
        return null;
    }
}

function markUncatchable(pokemonEntity) {
    try {
        PokeBattleStarter_UncatchableProperty.INSTANCE.uncatchable().apply(pokemonEntity.getPokemon());
        return true;
    } catch (e0) {}

    try {
        PokeBattleStarter_UncatchableProperty.uncatchable().apply(pokemonEntity.getPokemon());
        return true;
    } catch (e1) {}

    try {
        PokeBattleStarter_UncatchableProperty.INSTANCE.uncatchable().apply(pokemonEntity.pokemon);
        return true;
    } catch (e2) {}

    return false;
}

function prepareOpponentPokemon(npc, pokemonEntity) {
    try {
        var level = npc.getMCEntity().level();
        var x = npc.getX() + 1.5;
        var y = npc.getY();
        var z = npc.getZ() + 1.5;

        pokemonEntity.moveTo(x, y, z, npc.getRotation(), 0);

        var visible = readBool(npc.getStoreddata().get("pokebattle_spawn_visible"));
        if (!visible) {
            hideBattleAnchor(pokemonEntity);
        }

        level.addFreshEntity(pokemonEntity);

        return true;
    } catch (e) {
        return false;
    }
}

function hideBattleAnchor(pokemonEntity) {
    try {
        pokemonEntity.setInvisible(true);
    } catch (e0) {}

    try {
        pokemonEntity.setSilent(true);
    } catch (e1) {}

    try {
        pokemonEntity.setNoGravity(true);
    } catch (e2) {}

    try {
        pokemonEntity.setInvulnerable(true);
    } catch (e3) {}

    try {
        pokemonEntity.setNoAi(true);
    } catch (e4) {}

    try {
        pokemonEntity.noPhysics = true;
    } catch (e5) {}
}

function isErroredBattleStart(result) {
    try {
        return result instanceof PokeBattleStarter_ErroredBattleStart;
    } catch (e) {
        try {
            return ("" + result.getClass().getName()) == "com.cobblemon.mod.common.battles.ErroredBattleStart";
        } catch (e2) {
            return false;
        }
    }
}

function sendBattleErrors(result, serverPlayer, player) {
    try {
        result.sendTo(serverPlayer);
        return;
    } catch (e) {}

    player.message("§cCould not start the battle. The player may already be in battle or have no usable Pokemon.");
}

function isPlayerInBattle(serverPlayer) {
    try {
        return PokeBattleStarter_BattleRegistry.INSTANCE.getBattleByParticipatingPlayer(serverPlayer) != null;
    } catch (e0) {}

    try {
        return PokeBattleStarter_BattleRegistry.getBattleByParticipatingPlayer(serverPlayer) != null;
    } catch (e1) {}

    return false;
}

function tryRemove(entity) {
    try {
        entity.discard();
    } catch (e) {}
}

function getEntityUuid(entity) {
    try {
        return "" + entity.getUUID();
    } catch (e) {
        return "";
    }
}

function readBool(value) {
    var s = trimString(value).toLowerCase();
    return s == "1" || s == "true" || s == "yes" || s == "on";
}

function hasText(value) {
    return value != null && trimString(value).length > 0;
}

function trimString(value) {
    return ("" + value).replace(/^\s+|\s+$/g, "");
}

function parseIntSafe(value, def) {
    try {
        var parsed = parseInt("" + value, 10);
        return isNaN(parsed) ? def : parsed;
    } catch (e) {
        return def;
    }
}

function parseLongSafe(value, def) {
    return parseIntSafe(value, def);
}

function parseFloatSafe(value, def) {
    try {
        var parsed = parseFloat("" + value);
        return isNaN(parsed) ? def : parsed;
    } catch (e) {
        return def;
    }
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function shortError(e) {
    try {
        return ("" + e).substring(0, 160);
    } catch (ignored) {
        return "unknown error";
    }
}
