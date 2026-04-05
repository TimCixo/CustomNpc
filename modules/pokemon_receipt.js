var PokemonReceipt_Optional = Java.type("java.util.Optional");
var PokemonReceipt_Base64 = Java.type("java.util.Base64");
var PokemonReceipt_StandardCharsets = Java.type("java.nio.charset.StandardCharsets");
var PokemonReceipt_Instant = Java.type("java.time.Instant");
var PokemonReceipt_ZoneId = Java.type("java.time.ZoneId");
var PokemonReceipt_DateTimeFormatter = Java.type("java.time.format.DateTimeFormatter");

var PokemonReceipt_NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var PokemonReceipt_MCItemStack = Java.type("net.minecraft.world.item.ItemStack");
var PokemonReceipt_InteractionHand = Java.type("net.minecraft.world.InteractionHand");
var PokemonReceipt_BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var PokemonReceipt_CompoundTag = Java.type("net.minecraft.nbt.CompoundTag");
var PokemonReceipt_TagParser = Java.type("net.minecraft.nbt.TagParser");

var PokemonReceipt_Stats = Java.type("com.cobblemon.mod.common.api.pokemon.stats.Stats");
var PokemonReceipt_Pokemon = Java.type("com.cobblemon.mod.common.pokemon.Pokemon");

var PokemonReceipt_CubixCobblemonItems = Java.type("net.im51111n355.cubixcobblemon.common.CubixCobblemonItems");
var PokemonReceipt_CubixCobblemonDataComponents = Java.type("net.im51111n355.cubixcobblemon.common.CubixCobblemonDataComponents");
var PokemonReceipt_PokemonComponent = Java.type("net.im51111n355.cubixcobblemon.common.item.component.PokemonComponent");

var PokemonReceiptModule = {
    TIME_FORMATTER: PokemonReceipt_DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"),
    STAT_ORDER: [
        PokemonReceipt_Stats.HP,
        PokemonReceipt_Stats.ATTACK,
        PokemonReceipt_Stats.DEFENCE,
        PokemonReceipt_Stats.SPECIAL_ATTACK,
        PokemonReceipt_Stats.SPECIAL_DEFENCE,
        PokemonReceipt_Stats.SPEED
    ],

    isCubixPokemonItem: function(item) {
        if (item == null || item.isEmpty()) return false;

        try {
            var mcStack = item.getMCItemStack();
            var itemId = String(PokemonReceipt_BuiltInRegistries.ITEM.getKey(mcStack.getItem()));
            return itemId == "cubixcobblemon:pokemon";
        } catch (e) {
            return false;
        }
    },

    extractPokemonFromItem: function(item) {
        try {
            var mcStack = item.getMCItemStack();
            var component = mcStack.get(PokemonReceipt_CubixCobblemonDataComponents.INSTANCE.getPOKEMON().get());
            if (component == null) return null;

            var optionalPokemon = component.getPokemon();
            if (optionalPokemon == null || !optionalPokemon.isPresent()) return null;

            return optionalPokemon.get();
        } catch (e) {
            return null;
        }
    },

    wrapCubixPokemonItem: function(pokemon) {
        var mcStack;
        try {
            mcStack = new PokemonReceipt_MCItemStack(PokemonReceipt_CubixCobblemonItems.INSTANCE.getPOKEMON().get());
            mcStack.set(
                PokemonReceipt_CubixCobblemonDataComponents.INSTANCE.getPOKEMON().get(),
                new PokemonReceipt_PokemonComponent(PokemonReceipt_Optional.of(pokemon))
            );
        } catch (e) {
            return { ok: false, error: "Could not create cubixcobblemon:pokemon." };
        }

        if (mcStack == null || mcStack.isEmpty()) {
            return { ok: false, error: "Cubix returned an empty pokemon item." };
        }

        var item = PokemonReceipt_NpcAPI.Instance().getIItemStack(mcStack);
        if (item == null || item.isEmpty()) {
            return { ok: false, error: "Could not wrap the created Pokemon item." };
        }

        item.setStackSize(1);
        return {
            ok: true,
            item: item,
            speciesId: String(pokemon.getSpecies().getResourceIdentifier())
        };
    },

    encodePokemonPayload: function(npc, pokemon) {
        try {
            var level = npc.getMCEntity().level();
            var tag = pokemon.saveToNBT(level.registryAccess(), new PokemonReceipt_CompoundTag());
            var raw = "" + tag;
            return PokemonReceipt_Base64.getEncoder().encodeToString(
                new java.lang.String(raw).getBytes(PokemonReceipt_StandardCharsets.UTF_8)
            );
        } catch (e) {
            return null;
        }
    },

    loadPokemonFromPayload: function(player, payload) {
        try {
            var decoded = new java.lang.String(
                PokemonReceipt_Base64.getDecoder().decode(payload),
                PokemonReceipt_StandardCharsets.UTF_8
            );
            var tag = PokemonReceipt_TagParser.parseTag("" + decoded);
            return new PokemonReceipt_Pokemon().loadFromNBT(
                player.getMCEntity().level().registryAccess(),
                tag
            );
        } catch (e) {
            return null;
        }
    },

    serializePokemon: function(pokemon) {
        var heldItemId = "";
        var displayName = "";

        try {
            var heldItem = pokemon.heldItem();
            if (heldItem != null && !heldItem.isEmpty()) {
                heldItemId = String(PokemonReceipt_BuiltInRegistries.ITEM.getKey(heldItem.getItem()));
            }
        } catch (e) {}

        try {
            displayName = pokemon.getSpecies().getTranslatedName().getString();
        } catch (e2) {
            displayName = String(pokemon.getSpecies().getResourceIdentifier());
        }

        return {
            displayName: displayName,
            species: String(pokemon.getSpecies().getResourceIdentifier()),
            level: "" + pokemon.getLevel(),
            shiny: pokemon.getShiny() ? "yes" : "no",
            ball: String(pokemon.getCaughtBall().getName()),
            ability: "" + pokemon.getAbility().getName(),
            nature: String(pokemon.getNature().getName()),
            gender: "" + pokemon.getGender().name(),
            form: "" + pokemon.getForm().getName(),
            iv: this.joinStats(pokemon.getIvs()),
            ev: this.joinStats(pokemon.getEvs()),
            friendship: "" + pokemon.getFriendship(),
            tradeable: pokemon.getTradeable() ? "yes" : "no",
            tera: String(pokemon.getTeraType().getId()),
            heldItem: heldItemId,
            moves: this.joinMoves(pokemon.getMoveSet())
        };
    },

    joinStats: function(statsObject) {
        var values = [];
        for (var i = 0; i < this.STAT_ORDER.length; i++) {
            values.push("" + statsObject.get(this.STAT_ORDER[i]));
        }
        return values.join("/");
    },

    joinMoves: function(moveSet) {
        var moves = [];
        for (var i = 0; i < 4; i++) {
            var move = moveSet.get(i);
            if (move != null) {
                moves.push("" + move.getName());
            }
        }
        return moves.join("/");
    },

    replaceHeldItem: function(player, replacementItem) {
        try {
            player.getMCEntity().setItemInHand(
                PokemonReceipt_InteractionHand.MAIN_HAND,
                replacementItem.getMCItemStack()
            );
            player.updatePlayerInventory();
            return true;
        } catch (e) {
            return false;
        }
    },

    formatIssuedAt: function(timestampMs) {
        try {
            return this.TIME_FORMATTER.format(
                PokemonReceipt_Instant.ofEpochMilli(timestampMs).atZone(PokemonReceipt_ZoneId.systemDefault())
            );
        } catch (e) {
            return "" + timestampMs;
        }
    },

    calculateExperienceGain: function(issuedAtMs, nowMs, expPerMinute) {
        var elapsed = nowMs - issuedAtMs;
        if (elapsed <= 0) return 0;

        return Math.floor((elapsed / 60000) * expPerMinute);
    },

    applyExperienceGain: function(pokemon, expGain) {
        if (expGain <= 0) return;

        try {
            pokemon.setExperienceAndUpdateLevel(pokemon.getExperience() + expGain);
        } catch (e) {}
    },

    hasText: function(value) {
        return value != null && this.trimString(value).length > 0;
    },

    trimString: function(s) {
        return ("" + s).replace(/^\s+|\s+$/g, "");
    }
};
