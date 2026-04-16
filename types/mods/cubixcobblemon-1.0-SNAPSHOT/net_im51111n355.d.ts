declare module 'net.im51111n355.cubixcobblemon.common' {
  import { DataComponents } from 'DeferredRegister';
  import { DeferredHolder, DeferredRegister } from 'net.neoforged.neoforge.registries';
  import { DataComponentType } from 'net.minecraft.core.component';
  import { PokemonComponent } from 'net.im51111n355.cubixcobblemon.common.item.component';
  import { Item, CreativeModeTab } from 'net.minecraft.world.item';
  import { List } from 'java.util';
  import { PokemonItem, IvItem, EvItem, GenderItem, ShinyItem, SizeItem } from 'net.im51111n355.cubixcobblemon.common.item';

  class CubixCobblemonDataComponents {
    static readonly INSTANCE: CubixCobblemonDataComponents;
    get pOKEMON(): DeferredHolder<DataComponentType<any>, DataComponentType<PokemonComponent>>;
    get rEGISTER(): DataComponents;
  }


  class CubixCobblemonItems {
    static readonly INSTANCE: CubixCobblemonItems;
    get aLL_ITEMS(): DeferredHolder<Item, any>[];
    get aNTI_CONCENTRATE_ATTACK(): DeferredHolder<Item, EvItem>;
    get aNTI_CONCENTRATE_DEFENCE(): DeferredHolder<Item, EvItem>;
    get aNTI_CONCENTRATE_HP(): DeferredHolder<Item, EvItem>;
    get aNTI_CONCENTRATE_SPECIAL_ATTACK(): DeferredHolder<Item, EvItem>;
    get aNTI_CONCENTRATE_SPECIAL_DEFENCE(): DeferredHolder<Item, EvItem>;
    get aNTI_CONCENTRATE_SPEED(): DeferredHolder<Item, EvItem>;
    get aNTI_GENETIC_RUNE_ATTACK(): DeferredHolder<Item, IvItem>;
    get aNTI_GENETIC_RUNE_DEFENCE(): DeferredHolder<Item, IvItem>;
    get aNTI_GENETIC_RUNE_HP(): DeferredHolder<Item, IvItem>;
    get aNTI_GENETIC_RUNE_SPECIAL_ATTACK(): DeferredHolder<Item, IvItem>;
    get aNTI_GENETIC_RUNE_SPECIAL_DEFENCE(): DeferredHolder<Item, IvItem>;
    get aNTI_GENETIC_RUNE_SPEED(): DeferredHolder<Item, IvItem>;
    get cCM_TAB(): DeferredHolder<CreativeModeTab, CreativeModeTab>;
    get cONCENTRATE_ATTACK(): DeferredHolder<Item, EvItem>;
    get cONCENTRATE_DEFENCE(): DeferredHolder<Item, EvItem>;
    get cONCENTRATE_HP(): DeferredHolder<Item, EvItem>;
    get cONCENTRATE_SPECIAL_ATTACK(): DeferredHolder<Item, EvItem>;
    get cONCENTRATE_SPECIAL_DEFENCE(): DeferredHolder<Item, EvItem>;
    get cONCENTRATE_SPEED(): DeferredHolder<Item, EvItem>;
    get cREATIVE_TAB_REGISTER(): DeferredRegister<CreativeModeTab>;
    get gENETIC_RUNE_ATTACK(): DeferredHolder<Item, IvItem>;
    get gENETIC_RUNE_DEFENCE(): DeferredHolder<Item, IvItem>;
    get gENETIC_RUNE_HP(): DeferredHolder<Item, IvItem>;
    get gENETIC_RUNE_SPECIAL_ATTACK(): DeferredHolder<Item, IvItem>;
    get gENETIC_RUNE_SPECIAL_DEFENCE(): DeferredHolder<Item, IvItem>;
    get gENETIC_RUNE_SPEED(): DeferredHolder<Item, IvItem>;
    get gROWTH_MUTAGEN_RUNT(): DeferredHolder<Item, SizeItem>;
    get gROWTH_MUTAGEN_SMALL(): DeferredHolder<Item, SizeItem>;
    get iTEM_REGISTER(): DeferredRegister<Item>;
    get pOKEMON(): DeferredHolder<Item, PokemonItem>;
    get sHINYFICATOR_NORMAL(): DeferredHolder<Item, ShinyItem>;
    get sHINYFICATOR_SHINY(): DeferredHolder<Item, ShinyItem>;
    get tRANSMUTATION_STONE_FEMALE(): DeferredHolder<Item, GenderItem>;
    get tRANSMUTATION_STONE_MALE(): DeferredHolder<Item, GenderItem>;
  }

}

declare module 'net.im51111n355.cubixcobblemon.common.item' {
  import { Item, ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { PokemonSelectingItem } from 'com.cobblemon.mod.common.api.item';
  import { Stat } from 'com.cobblemon.mod.common.api.pokemon.stats';
  import { BagItem } from 'com.cobblemon.mod.common.item.battle';
  import { InteractionResultHolder, InteractionHand } from 'net.minecraft.world';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Pokemon, Gender } from 'com.cobblemon.mod.common.pokemon';
  import { BattlePokemon } from 'com.cobblemon.mod.common.battles.pokemon';
  import { BattleActor } from 'com.cobblemon.mod.common.api.battles.model.actor';
  import { Component } from 'net.minecraft.network.chat';
  import { TooltipContext } from 'Item';
  import { List } from 'java.util';

  interface EvItem extends PokemonSelectingItem, Item {}
  class EvItem extends PokemonSelectingItem {
    constructor(type: Stat, by: number);
    applyToBattlePokemon(player: ServerPlayer, stack: ItemStack, battlePokemon: BattlePokemon): void;
    applyToPokemon(player: ServerPlayer, stack: ItemStack, pokemon: Pokemon): InteractionResultHolder<ItemStack>;
    canUseOnBattlePokemon(stack: ItemStack, battlePokemon: BattlePokemon): boolean;
    canUseOnPokemon(stack: ItemStack, pokemon: Pokemon): boolean;
    get bagItem(): BagItem;
    get by(): number;
    get type(): Stat;
    interactGeneral(player: ServerPlayer, stack: ItemStack): InteractionResultHolder<ItemStack>;
    interactGeneralBattle(player: ServerPlayer, stack: ItemStack, actor: BattleActor): InteractionResultHolder<ItemStack>;
    interactWithSpecificBattle(player: ServerPlayer, stack: ItemStack, battlePokemon: BattlePokemon): InteractionResultHolder<ItemStack>;
    use(world: Level, user: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
    use(player: ServerPlayer, stack: ItemStack): InteractionResultHolder<ItemStack>;
  }


  interface GenderItem extends PokemonSelectingItem, Item {}
  class GenderItem extends PokemonSelectingItem {
    constructor(gender: Gender);
    applyToBattlePokemon(player: ServerPlayer, stack: ItemStack, battlePokemon: BattlePokemon): void;
    applyToPokemon(player: ServerPlayer, stack: ItemStack, pokemon: Pokemon): InteractionResultHolder<ItemStack>;
    canUseOnBattlePokemon(stack: ItemStack, battlePokemon: BattlePokemon): boolean;
    canUseOnPokemon(stack: ItemStack, pokemon: Pokemon): boolean;
    get bagItem(): BagItem;
    get gender(): Gender;
    interactGeneral(player: ServerPlayer, stack: ItemStack): InteractionResultHolder<ItemStack>;
    interactGeneralBattle(player: ServerPlayer, stack: ItemStack, actor: BattleActor): InteractionResultHolder<ItemStack>;
    interactWithSpecificBattle(player: ServerPlayer, stack: ItemStack, battlePokemon: BattlePokemon): InteractionResultHolder<ItemStack>;
    use(world: Level, user: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
    use(player: ServerPlayer, stack: ItemStack): InteractionResultHolder<ItemStack>;
  }


  interface IvItem extends PokemonSelectingItem, Item {}
  class IvItem extends PokemonSelectingItem {
    constructor(type: Stat, by: number);
    applyToBattlePokemon(player: ServerPlayer, stack: ItemStack, battlePokemon: BattlePokemon): void;
    applyToPokemon(player: ServerPlayer, stack: ItemStack, pokemon: Pokemon): InteractionResultHolder<ItemStack>;
    canUseOnBattlePokemon(stack: ItemStack, battlePokemon: BattlePokemon): boolean;
    canUseOnPokemon(stack: ItemStack, pokemon: Pokemon): boolean;
    get bagItem(): BagItem;
    get by(): number;
    get type(): Stat;
    interactGeneral(player: ServerPlayer, stack: ItemStack): InteractionResultHolder<ItemStack>;
    interactGeneralBattle(player: ServerPlayer, stack: ItemStack, actor: BattleActor): InteractionResultHolder<ItemStack>;
    interactWithSpecificBattle(player: ServerPlayer, stack: ItemStack, battlePokemon: BattlePokemon): InteractionResultHolder<ItemStack>;
    use(world: Level, user: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
    use(player: ServerPlayer, stack: ItemStack): InteractionResultHolder<ItemStack>;
  }


  interface PokemonItem extends Item {}
  class PokemonItem extends Item {
    constructor();
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltipComponents: Component[], tooltipFlag: TooltipFlag): void;
    getName(stack: ItemStack): Component;
    use(level: Level, player: Player, usedHand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface ShinyItem extends PokemonSelectingItem, Item {}
  class ShinyItem extends PokemonSelectingItem {
    constructor(shiny: boolean);
    applyToBattlePokemon(player: ServerPlayer, stack: ItemStack, battlePokemon: BattlePokemon): void;
    applyToPokemon(player: ServerPlayer, stack: ItemStack, pokemon: Pokemon): InteractionResultHolder<ItemStack>;
    canUseOnBattlePokemon(stack: ItemStack, battlePokemon: BattlePokemon): boolean;
    canUseOnPokemon(stack: ItemStack, pokemon: Pokemon): boolean;
    get bagItem(): BagItem;
    get shiny(): boolean;
    interactGeneral(player: ServerPlayer, stack: ItemStack): InteractionResultHolder<ItemStack>;
    interactGeneralBattle(player: ServerPlayer, stack: ItemStack, actor: BattleActor): InteractionResultHolder<ItemStack>;
    interactWithSpecificBattle(player: ServerPlayer, stack: ItemStack, battlePokemon: BattlePokemon): InteractionResultHolder<ItemStack>;
    use(world: Level, user: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
    use(player: ServerPlayer, stack: ItemStack): InteractionResultHolder<ItemStack>;
  }


  interface SizeItem extends PokemonSelectingItem, Item {}
  class SizeItem extends PokemonSelectingItem {
    constructor(size: number);
    applyToBattlePokemon(player: ServerPlayer, stack: ItemStack, battlePokemon: BattlePokemon): void;
    applyToPokemon(player: ServerPlayer, stack: ItemStack, pokemon: Pokemon): InteractionResultHolder<ItemStack>;
    canUseOnBattlePokemon(stack: ItemStack, battlePokemon: BattlePokemon): boolean;
    canUseOnPokemon(stack: ItemStack, pokemon: Pokemon): boolean;
    get bagItem(): BagItem;
    get size(): number;
    interactGeneral(player: ServerPlayer, stack: ItemStack): InteractionResultHolder<ItemStack>;
    interactGeneralBattle(player: ServerPlayer, stack: ItemStack, actor: BattleActor): InteractionResultHolder<ItemStack>;
    interactWithSpecificBattle(player: ServerPlayer, stack: ItemStack, battlePokemon: BattlePokemon): InteractionResultHolder<ItemStack>;
    use(world: Level, user: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
    use(player: ServerPlayer, stack: ItemStack): InteractionResultHolder<ItemStack>;
  }

}

declare module 'net.im51111n355.cubixcobblemon.common.item.render' {
  import { CobblemonBuiltinItemRenderer } from 'com.cobblemon.mod.common.client.render.item';
  import { RenderContext } from 'com.cobblemon.mod.common.client.render.models.blockbench.repository';
  import { ItemStack, ItemDisplayContext } from 'net.minecraft.world.item';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { Map } from 'java.util';
  import { Transformations } from 'net.im51111n355.cubixcobblemon.common.item.render.ItemPokemonRender';

  interface ItemPokemonRender extends CobblemonBuiltinItemRenderer {}
  class ItemPokemonRender extends CobblemonBuiltinItemRenderer {
    static readonly INSTANCE: ItemPokemonRender;
    get context(): RenderContext;
    get positions(): Map<ItemDisplayContext, Transformations>;
    render(stack: ItemStack, mode: ItemDisplayContext, matrices: PoseStack, vertexConsumers: MultiBufferSource, light: number, overlay: number): void;
  }

}

declare module 'net.im51111n355.cubixcobblemon.common.item.render.ItemPokemonRender' {
  import { Double, Float } from 'java.lang';

  class Transformation<T = any> {
    constructor(x: T, y: T, z: T);
    get x(): T;
    get y(): T;
    get z(): T;
  }


  class Transformations {
    constructor(translation: Transformation<number>, scale: Transformation<number>, rotation: Transformation<number>);
    get rotation(): Transformation<number>;
    get scale(): Transformation<number>;
    get translation(): Transformation<number>;
  }

}

declare module 'net.im51111n355.cubixcobblemon' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Function0 } from 'kotlin.jvm.functions';
  import { Unit } from 'kotlin';

  class CubixCobblemonMod {
    static readonly INSTANCE: CubixCobblemonMod;
    static readonly MOD_ID: string;
  }


  class CubixCobblemonModKt {
    static readonly INCLUDE_SERVER: boolean;
    static ccmResource(path: string): ResourceLocation;
    static ifClient(func: Function0<Unit>): void;
    static ifServer(func: Function0<Unit>): void;
    static ifServer<T>(func: Function0<T>): T;
    static mcResource(path: string): ResourceLocation;
  }

}

declare module 'net.im51111n355.cubixcobblemon.server.command' {
  import { LiteralArgumentBuilder } from 'com.mojang.brigadier.builder';
  import { CommandSourceStack } from 'net.minecraft.commands';

  class CommandRegistration {
    static readonly INSTANCE: CommandRegistration;
  }


  class PokeItemCommand {
    static readonly INSTANCE: PokeItemCommand;
    create(): LiteralArgumentBuilder<CommandSourceStack>;
  }

}