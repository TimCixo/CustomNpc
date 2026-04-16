var PokemonFactory_Optional = Java.type("java.util.Optional");
var PokemonFactory_NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var PokemonFactory_MCItemStack = Java.type("net.minecraft.world.item.ItemStack");

var PokemonFactory_PokemonProperties = Java.type("com.cobblemon.mod.common.api.pokemon.PokemonProperties");
var PokemonFactory_IVs = Java.type("com.cobblemon.mod.common.pokemon.IVs");
var PokemonFactory_EVs = Java.type("com.cobblemon.mod.common.pokemon.EVs");
var PokemonFactory_Stats = Java.type("com.cobblemon.mod.common.api.pokemon.stats.Stats");

var PokemonFactory_CubixCobblemonItems = Java.type("net.im51111n355.cubixcobblemon.common.CubixCobblemonItems");
var PokemonFactory_CubixCobblemonDataComponents = Java.type("net.im51111n355.cubixcobblemon.common.CubixCobblemonDataComponents");
var PokemonFactory_PokemonComponent = Java.type("net.im51111n355.cubixcobblemon.common.item.component.PokemonComponent");

var PokemonFactory = {
    STAT_ORDER: [
        PokemonFactory_Stats.HP,
        PokemonFactory_Stats.ATTACK,
        PokemonFactory_Stats.DEFENCE,
        PokemonFactory_Stats.SPECIAL_ATTACK,
        PokemonFactory_Stats.SPECIAL_DEFENCE,
        PokemonFactory_Stats.SPEED
    ],

    createCubixPokemonItem: function(config) {
        var speciesValue = this.trimString(config.species);
        if (speciesValue.length == 0) {
            return { ok: false, error: "Species is required." };
        }

        var props = this.parsePokemonProperties(this.normalizeSpeciesId(speciesValue));
        if (props == null || !this.hasText(props.getSpecies())) {
            return { ok: false, error: "Unknown species: " + speciesValue };
        }

        if (this.hasText(config.level)) {
            props.setLevel(this.clamp(this.parseIntSafe(config.level, 1), 1, 100));
        }

        if (this.hasText(config.shiny)) {
            var parsedShiny = this.parseBooleanOrNull(config.shiny);
            if (parsedShiny == null) {
                return { ok: false, error: "Shiny must be yes/no, true/false or да/нет." };
            }
            props.setShiny(parsedShiny);
        }

        if (this.hasText(config.ball)) {
            props.setPokeball(this.normalizeBallId(config.ball));
        }

        if (this.hasText(config.ability)) {
            props.setAbility(this.normalizeAbility(config.ability));
        }

        if (this.hasText(config.iv)) {
            props.setIvs(this.buildStatsBlock(new PokemonFactory_IVs(), config.iv, 0, 31));
        }

        if (this.hasText(config.ev)) {
            props.setEvs(this.buildStatsBlock(new PokemonFactory_EVs(), config.ev, 0, 252));
        }

        var pokemon;
        try {
            pokemon = props.create();
        } catch (e) {
            return { ok: false, error: "Could not build Pokemon data from this config." };
        }

        if (pokemon == null) {
            return { ok: false, error: "Cobblemon returned an empty Pokemon object." };
        }

        var mcStack;
        try {
            mcStack = new PokemonFactory_MCItemStack(PokemonFactory_CubixCobblemonItems.INSTANCE.getPOKEMON().get());
            mcStack.set(
                PokemonFactory_CubixCobblemonDataComponents.INSTANCE.getPOKEMON().get(),
                new PokemonFactory_PokemonComponent(PokemonFactory_Optional.of(pokemon))
            );
        } catch (e2) {
            return { ok: false, error: "Could not create cubixcobblemon:pokemon." };
        }

        if (mcStack == null || mcStack.isEmpty()) {
            return { ok: false, error: "Cubix returned an empty pokemon item." };
        }

        var item = PokemonFactory_NpcAPI.Instance().getIItemStack(mcStack);
        if (item == null || item.isEmpty()) {
            return { ok: false, error: "Could not wrap the created Pokemon item." };
        }

        item.setStackSize(1);
        return {
            ok: true,
            item: item,
            speciesId: "" + props.getSpecies()
        };
    },

    buildStatsBlock: function(statsObject, rawValue, min, max) {
        var parts = ("" + rawValue).split("/");

        for (var i = 0; i < this.STAT_ORDER.length; i++) {
            if (i >= parts.length) break;

            var token = this.trimString(parts[i]);
            if (token.length == 0) continue;

            var value = this.clamp(this.parseIntSafe(token, min), min, max);
            statsObject.set(this.STAT_ORDER[i], value);
        }

        return statsObject;
    },

    normalizeSpeciesId: function(value) {
        var s = this.normalizeId(value);
        if (s.indexOf(":") === -1) {
            return "cobblemon:" + s;
        }
        return s;
    },

    normalizeBallId: function(value) {
        var s = this.normalizeId(value);
        if (s.indexOf(":") === -1) {
            return "cobblemon:" + s;
        }
        return s;
    },

    normalizeAbility: function(value) {
        return this.normalizeId(value);
    },

    normalizeId: function(value) {
        return this.trimString("" + value).toLowerCase().replace(/\s+/g, "_");
    },

    parsePokemonProperties: function(speciesId) {
        try {
            return PokemonFactory_PokemonProperties.Companion.parse(speciesId);
        } catch (e) {
            return null;
        }
    },

    hasText: function(value) {
        return value != null && this.trimString(value).length > 0;
    },

    trimString: function(s) {
        return ("" + s).replace(/^\s+|\s+$/g, "");
    },

    normalizeLine: function(s) {
        return this.trimString("" + s).toLowerCase();
    },

    parseIntSafe: function(s, def) {
        try {
            var value = parseInt("" + s, 10);
            return isNaN(value) ? def : value;
        } catch (e) {
            return def;
        }
    },

    parseBooleanOrNull: function(value) {
        var s = this.normalizeLine(value);

        if (s == "yes" || s == "true" || s == "1" || s == "да") return true;
        if (s == "no" || s == "false" || s == "0" || s == "нет") return false;

        return null;
    },

    clamp: function(value, min, max) {
        if (value < min) return min;
        if (value > max) return max;
        return value;
    }
};
