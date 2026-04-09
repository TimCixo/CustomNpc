var ARCEUS_TIMER_ID = 1;
var Reward_Optional = Java.type("java.util.Optional");
var Reward_NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var Reward_MCItemStack = Java.type("net.minecraft.world.item.ItemStack");
var Reward_PokemonProperties = Java.type("com.cobblemon.mod.common.api.pokemon.PokemonProperties");
var Reward_IVs = Java.type("com.cobblemon.mod.common.pokemon.IVs");
var Reward_Stats = Java.type("com.cobblemon.mod.common.api.pokemon.stats.Stats");
var Reward_CubixCobblemonItems = Java.type("net.im51111n355.cubixcobblemon.common.CubixCobblemonItems");
var Reward_CubixCobblemonDataComponents = Java.type("net.im51111n355.cubixcobblemon.common.CubixCobblemonDataComponents");
var Reward_PokemonComponent = Java.type("net.im51111n355.cubixcobblemon.common.item.component.PokemonComponent");

var REWARD_STAT_ORDER = [
    Reward_Stats.HP,
    Reward_Stats.ATTACK,
    Reward_Stats.DEFENCE,
    Reward_Stats.SPECIAL_ATTACK,
    Reward_Stats.SPECIAL_DEFENCE,
    Reward_Stats.SPEED
];

var LEGENDARY_REWARD_POOL = [
    "cobblemon:articuno",
    "cobblemon:zapdos",
    "cobblemon:moltres",
    "cobblemon:mewtwo",
    "cobblemon:mew",
    "cobblemon:raikou",
    "cobblemon:entei",
    "cobblemon:suicune",
    "cobblemon:lugia",
    "cobblemon:ho_oh",
    "cobblemon:celebi",
    "cobblemon:regirock",
    "cobblemon:regice",
    "cobblemon:registeel",
    "cobblemon:latias",
    "cobblemon:latios",
    "cobblemon:kyogre",
    "cobblemon:groudon",
    "cobblemon:rayquaza",
    "cobblemon:jirachi",
    "cobblemon:deoxys",
    "cobblemon:uxie",
    "cobblemon:mesprit",
    "cobblemon:azelf",
    "cobblemon:dialga",
    "cobblemon:palkia",
    "cobblemon:giratina",
    "cobblemon:heatran",
    "cobblemon:regigigas",
    "cobblemon:cresselia",
    "cobblemon:darkrai",
    "cobblemon:shaymin",
    "cobblemon:arceus",
    "cobblemon:victini",
    "cobblemon:reshiram",
    "cobblemon:zekrom",
    "cobblemon:kyurem",
    "cobblemon:xerneas",
    "cobblemon:yveltal",
    "cobblemon:zygarde",
    "cobblemon:solgaleo",
    "cobblemon:lunala",
    "cobblemon:necrozma",
    "cobblemon:zacian",
    "cobblemon:zamazenta",
    "cobblemon:eternatus",
    "cobblemon:koraidon",
    "cobblemon:miraidon"
];

var STANDARD_REWARD_POOL = [
    "cobblemon:venusaur",
    "cobblemon:charizard",
    "cobblemon:blastoise",
    "cobblemon:raichu",
    "cobblemon:ninetales",
    "cobblemon:arcanine",
    "cobblemon:alakazam",
    "cobblemon:gengar",
    "cobblemon:lapras",
    "cobblemon:snorlax",
    "cobblemon:vaporeon",
    "cobblemon:jolteon",
    "cobblemon:flareon",
    "cobblemon:espeon",
    "cobblemon:umbreon",
    "cobblemon:scizor",
    "cobblemon:heracross",
    "cobblemon:kingdra",
    "cobblemon:blaziken",
    "cobblemon:gardevoir",
    "cobblemon:aggron",
    "cobblemon:flygon",
    "cobblemon:milotic",
    "cobblemon:absol",
    "cobblemon:staraptor",
    "cobblemon:luxray",
    "cobblemon:roserade",
    "cobblemon:lucario",
    "cobblemon:weavile",
    "cobblemon:togekiss",
    "cobblemon:electivire",
    "cobblemon:magmortar",
    "cobblemon:gliscor",
    "cobblemon:serperior",
    "cobblemon:emboar",
    "cobblemon:samurott",
    "cobblemon:excadrill",
    "cobblemon:chandelure",
    "cobblemon:volcarona",
    "cobblemon:greninja",
    "cobblemon:talonflame",
    "cobblemon:aegislash",
    "cobblemon:sylveon",
    "cobblemon:noivern",
    "cobblemon:decidueye",
    "cobblemon:incineroar",
    "cobblemon:primarina",
    "cobblemon:lycanroc",
    "cobblemon:mimikyu",
    "cobblemon:toxtricity",
    "cobblemon:corviknight",
    "cobblemon:grimmsnarl",
    "cobblemon:ceruledge",
    "cobblemon:armarouge",
    "cobblemon:meowscarada",
    "cobblemon:skeledirge",
    "cobblemon:quaquaval"
];

function timer(event) {
    if (event.id != ARCEUS_TIMER_ID) return;

    var npc = event.npc;
    var data = npc.getStoreddata();

    if (data.get("arceus_enabled") != "1") return;
    if (data.get("arceus_dead") == "1") return;

    if (data.get("arceus_dying") == "1") {
        tickCustomDeath(npc);
        return;
    }

    if (tickTransition(npc)) return;

    tickPhaseRegen(npc);
}

function tickTransition(npc) {
    var data = npc.getStoreddata();
    var left = parseIntSafe(data.get("arceus_transition_ticks_left"), 0);

    if (left <= 0) return false;

    left -= getCfgInt(npc, "arceus_timer_ticks", 5);
    if (left < 0) left = 0;
    data.put("arceus_transition_ticks_left", "" + left);

    if (left == 0) {
        var phase = parseIntSafe(data.get("arceus_phase"), 1);
        if (phase == 2) {
            safeSay(npc, "§eВторая стадия началась. Аркеус восстанавливает силы в бою.");
        } else if (phase >= 3) {
            safeSay(npc, "§cТретья стадия началась. Самоцветы теперь выбиваются из него ударами.");
        }
    }

    return true;
}

function tickPhaseRegen(npc) {
    var data = npc.getStoreddata();
    var phase = parseIntSafe(data.get("arceus_phase"), 1);
    if (phase <= 1) return;

    var timerTicks = getCfgInt(npc, "arceus_timer_ticks", 5);
    var pulseTicks = parseIntSafe(data.get("arceus_pulse_ticks"), 0) + timerTicks;
    var interval = phase == 2
        ? getCfgInt(npc, "arceus_phase2_regen_interval", 40)
        : getCfgInt(npc, "arceus_phase3_regen_interval", 20);

    if (pulseTicks < interval) {
        data.put("arceus_pulse_ticks", "" + pulseTicks);
        return;
    }

    data.put("arceus_pulse_ticks", "0");

    var regenPercent = phase == 2
        ? getCfgFloat(npc, "arceus_phase2_regen_percent", 0.015)
        : getCfgFloat(npc, "arceus_phase3_regen_percent", 0.03);

    var maxHp = readNpcMaxHealth(npc);
    var currentHp = readNpcHealth(npc);
    var heal = Math.max(1, Math.floor(maxHp * regenPercent));
    var nextHp = Math.min(maxHp, currentHp + heal);

    if (nextHp > currentHp) {
        try {
            npc.setHealth(nextHp);
        } catch (e) {}
    }
}

function tickCustomDeath(npc) {
    var data = npc.getStoreddata();
    var timerTicks = getCfgInt(npc, "arceus_timer_ticks", 5);
    var left = parseIntSafe(data.get("arceus_death_ticks_left"), 0);
    var total = getCfgInt(npc, "arceus_custom_death_ticks", 80);
    var lineStage = parseIntSafe(data.get("arceus_death_line_stage"), 0);

    forceHealthFloor(npc);
    tickDeathSpin(npc);

    if (lineStage < 1) {
        announceDamageTop(npc);
        data.put("arceus_death_line_stage", "1");
    } else if (lineStage < 2 && left <= Math.floor(total / 2)) {
        safeSay(npc, "§5Мир дрожит. Аркеус исчезает по собственной воле.");
        data.put("arceus_death_line_stage", "2");
    }

    left -= timerTicks;
    if (left > 0) {
        data.put("arceus_death_ticks_left", "" + left);
        return;
    }

    data.put("arceus_dead", "1");
    data.put("arceus_death_ticks_left", "0");
    spawnDeathExplosion(npc);
    safeSay(npc, "§8Аркеус пал.");
    awardDamageTop(npc);
    ensureHideDeadBody(npc);
    hideBodyNow(npc);
    updateNpcClient(npc);

    try {
        npc.kill();
        return;
    } catch (e) {}

    try {
        npc.setHealth(0);
    } catch (e2) {}
}

function tickDeathSpin(npc) {
    stopCombatForDeath(npc);
    startDeathAnimationOnce(npc);

    try {
        var rot = npc.getRotation();
        rot += getCfgFloat(npc, "arceus_death_spin_step", 35.0);
        while (rot >= 360) rot -= 360;
        npc.setRotation(rot);
    } catch (e) {}
}

function startDeathAnimationOnce(npc) {
    var data = npc.getStoreddata();
    if (data.get("arceus_death_anim_started") == "1") return;
    data.put("arceus_death_anim_started", "1");

    var animId = getCfgInt(npc, "arceus_death_animation_id", 5);

    try {
        npc.playAnimation(animId);
        return;
    } catch (e) {}

    try {
        npc.getAi().setAnimation(animId);
    } catch (e2) {}
}

function stopCombatForDeath(npc) {
    try {
        npc.setAttackTarget(null);
    } catch (e) {}

    try {
        npc.getMCEntity().setTarget(null);
    } catch (e2) {}

    try {
        npc.setMoveForward(0);
        npc.setMoveStrafing(0);
        npc.setMoveVertical(0);
    } catch (e3) {}
}

function spawnDeathExplosion(npc) {
    try {
        npc.getWorld().explode(
            npc.getX(),
            npc.getY() + 1.0,
            npc.getZ(),
            getCfgFloat(npc, "arceus_death_explosion_power", 3.5),
            false,
            false
        );
        return;
    } catch (e) {}

    try {
        npc.getWorld().spawnParticle("minecraft:explosion", npc.getX(), npc.getY() + 1.0, npc.getZ(), 0.6, 0.6, 0.6, 0.01, 20);
    } catch (e2) {}
}

function ensureHideDeadBody(npc) {
    try {
        npc.getStats().setHideDeadBody(true);
        return;
    } catch (e) {}
}

function hideBodyNow(npc) {
    try {
        if (npc.getDisplay && npc.getDisplay()) {
            npc.getDisplay().setVisible(1);
            return;
        }
    } catch (e) {}

    try {
        if (npc.display) {
            npc.display.setVisible(1);
            return;
        }
    } catch (e2) {}
}

function updateNpcClient(npc) {
    try {
        npc.updateClient();
    } catch (e) {}
}

function collectDamageEntries(npc) {
    var data = npc.getStoreddata();
    var keys = data.getKeys();
    if (keys == null || keys.length <= 0) return [];

    var entries = [];
    for (var i = 0; i < keys.length; i++) {
        var key = "" + keys[i];
        if (key.indexOf("arceus_dmg_") !== 0) continue;
        if (key.indexOf("arceus_dmg_name_") === 0) continue;

        var uuid = key.substring("arceus_dmg_".length);
        var damage = parseFloatSafe(data.get(key), 0);
        if (damage <= 0) continue;

        var name = "" + data.get("arceus_dmg_name_" + uuid);
        if (name == null || name == "" || name == "null") {
            name = uuid;
        }

        entries.push({ name: name, damage: damage });
    }

    entries.sort(function(a, b) {
        return b.damage - a.damage;
    });

    return entries;
}

function announceDamageTop(npc) {
    var data = npc.getStoreddata();
    if (data.get("arceus_damage_top_shown") == "1") return;
    data.put("arceus_damage_top_shown", "1");

    var entries = collectDamageEntries(npc);
    if (entries.length <= 0) return;

    safeSay(npc, "§6Топ по урону по Аркеусу:");

    var limit = entries.length < 5 ? entries.length : 5;
    for (var j = 0; j < limit; j++) {
        var entry = entries[j];
        safeSay(npc, "§e#" + (j + 1) + " §f" + entry.name + " §7- §c" + formatDamage(entry.damage));
    }
}

function awardDamageTop(npc) {
    var data = npc.getStoreddata();
    if (data.get("arceus_rewards_given") == "1") return;
    data.put("arceus_rewards_given", "1");

    var entries = collectDamageEntries(npc);
    if (entries.length <= 0) return;

    for (var i = 0; i < entries.length; i++) {
        var player = npc.getWorld().getPlayer(entries[i].name);
        if (player == null) continue;

        if (i == 0) {
            giveRewardPokemon(player, pickRandomSpecies(LEGENDARY_REWARD_POOL), "31/31/31/31/31/31");
        } else if (i == 1) {
            giveRewardPokemon(player, pickRandomSpecies(LEGENDARY_REWARD_POOL), "24/24/24/24/24/24");
        } else if (i == 2) {
            giveRewardPokemon(player, pickRandomSpecies(LEGENDARY_REWARD_POOL), "15/15/15/15/15/15");
        } else {
            giveRewardPokemon(player, pickRandomSpecies(STANDARD_REWARD_POOL), "24/24/24/24/24/24");
        }
    }
}

function giveRewardPokemon(player, speciesId, ivString) {
    if (player == null || speciesId == null || speciesId == "") return false;

    var reward = createRewardPokemonItem(speciesId, ivString);
    if (!reward.ok) return false;

    return giveItemToPlayer(player, reward.item);
}

function createRewardPokemonItem(speciesId, ivString) {
    var props = parsePokemonProperties(speciesId);
    if (props == null || !hasText("" + props.getSpecies())) {
        return { ok: false };
    }

    try {
        props.setIvs(buildStatsBlock(new Reward_IVs(), ivString, 0, 31));
    } catch (e) {
        return { ok: false };
    }

    var pokemon;
    try {
        pokemon = props.create();
    } catch (e2) {
        return { ok: false };
    }

    if (pokemon == null) return { ok: false };

    try {
        var mcStack = new Reward_MCItemStack(Reward_CubixCobblemonItems.INSTANCE.getPOKEMON().get());
        mcStack.set(
            Reward_CubixCobblemonDataComponents.INSTANCE.getPOKEMON().get(),
            new Reward_PokemonComponent(Reward_Optional.of(pokemon))
        );

        if (mcStack == null || mcStack.isEmpty()) return { ok: false };

        var item = Reward_NpcAPI.Instance().getIItemStack(mcStack);
        if (item == null || item.isEmpty()) return { ok: false };

        item.setStackSize(1);
        return { ok: true, item: item };
    } catch (e3) {
        return { ok: false };
    }
}

function buildStatsBlock(statsObject, rawValue, min, max) {
    var parts = ("" + rawValue).split("/");

    for (var i = 0; i < REWARD_STAT_ORDER.length; i++) {
        if (i >= parts.length) break;

        var token = trimString(parts[i]);
        if (token.length == 0) continue;

        var value = clamp(parseIntSafe(token, min), min, max);
        statsObject.set(REWARD_STAT_ORDER[i], value);
    }

    return statsObject;
}

function parsePokemonProperties(speciesId) {
    try {
        return Reward_PokemonProperties.Companion.parse(speciesId);
    } catch (e) {
        return null;
    }
}

function giveItemToPlayer(player, item) {
    var given = false;

    try {
        given = player.giveItem(item);
    } catch (e) {}

    if (!given) {
        given = putInFirstEmptySlot(player, item);
    }

    return given;
}

function putInFirstEmptySlot(player, item) {
    var inv = player.getInventory();
    if (inv == null) return false;

    var size = inv.getSize();
    for (var i = 0; i < size; i++) {
        var slot = inv.getSlot(i);
        if (slot == null || slot.isEmpty()) {
            inv.setSlot(i, item);
            return true;
        }
    }

    return false;
}

function pickRandomSpecies(pool) {
    if (pool == null || pool.length <= 0) return null;
    var index = Math.floor(Math.random() * pool.length);
    if (index < 0) index = 0;
    if (index >= pool.length) index = pool.length - 1;
    return pool[index];
}

function forceHealthFloor(npc) {
    try {
        if (npc.getHealth() < 1) {
            npc.setHealth(1);
        }
    } catch (e) {}
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

function safeSay(npc, text) {
    try {
        npc.say(text);
    } catch (e) {}
}

function getCfgInt(npc, key, def) {
    return parseIntSafe(npc.getStoreddata().get(key), def);
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

function formatDamage(value) {
    var rounded = Math.floor(value * 10 + 0.5) / 10;
    if (rounded == Math.floor(rounded)) {
        return "" + Math.floor(rounded);
    }
    return "" + rounded;
}

function hasText(value) {
    return value != null && trimString(value).length > 0;
}

function trimString(s) {
    return ("" + s).replace(/^\s+|\s+$/g, "");
}

function clamp(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}
