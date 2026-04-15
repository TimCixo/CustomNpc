declare module 'com.github.yajatkaul.mega_showdown.advancement' {
  import { ServerPlayer } from 'net.minecraft.server.level';

  class AdvancementHelper {
    static grantAdvancement(player: ServerPlayer, advancementId: string): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.api.codec.BattleEffect' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface BattleEffectType extends Enum<BattleEffectType> {}
  class BattleEffectType extends Enum<BattleEffectType> {
    static readonly HAZARD: BattleEffectType;
    static readonly WEATHER: BattleEffectType;
    get serializedName(): string;
    static valueOf(name: string): BattleEffectType;
    static values(): BattleEffectType[];
  }

}

declare module 'com.github.yajatkaul.mega_showdown.api.event' {
  import { Event } from 'dev.architectury.event';
  import { PokemonBattle } from 'com.cobblemon.mod.common.api.battles.model';
  import { BattlePokemon } from 'com.cobblemon.mod.common.battles.pokemon';
  import { Boolean } from 'java.lang';

  class DynamaxEndCallback {
    static readonly EVENT: Event;
    onDynamaxEnd(var1: PokemonBattle, var2: BattlePokemon): void;
  }


  class DynamaxStartCallback {
    static readonly EVENT: Event;
    onDynamaxStart(var1: PokemonBattle, var2: BattlePokemon, var3: boolean): void;
  }


  class UltraBurstCallback {
    static readonly EVENT: Event;
    onUltraBurst(var1: PokemonBattle, var2: BattlePokemon): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.battle.effect' {
  import { PokemonBattle } from 'com.cobblemon.mod.common.api.battles.model';
  import { BattleSide } from 'com.cobblemon.mod.common.battles';

  class AbstractFieldHandler {
  }


  class AbstractSideHandler {
  }


  interface RoomEffect extends AbstractFieldHandler {}
  class RoomEffect extends AbstractFieldHandler {
    static handleRoom(battle: PokemonBattle, roomName: string): void;
  }


  class ScreenEffect {
    static handleScreen(side: BattleSide, screenName: string, ticks: number): void;
  }


  class TailwindEffect {
    static handleTailwind(side: BattleSide, tailwindName: string): void;
  }


  interface TerrainEffect extends AbstractFieldHandler {}
  class TerrainEffect extends AbstractFieldHandler {
    static handleTerrain(battle: PokemonBattle, terrainName: string, ticks: number): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.block.block_entity' {
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { MegaStoneStandState } from 'com.github.yajatkaul.mega_showdown.block.block_entity.renderer.state';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { SimpleContainer } from 'net.minecraft.world';
  import { Packet } from 'net.minecraft.network.protocol';
  import { ClientGamePacketListener } from 'net.minecraft.network.protocol.game';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { Level } from 'net.minecraft.world.level';
  import { ReassembleStage } from 'com.github.yajatkaul.mega_showdown.block.block_entity.ReassemblyUnitBlockEntity';

  interface MegaStoneStandEntity extends BlockEntity {}
  class MegaStoneStandEntity extends BlockEntity {
    readonly state: MegaStoneStandState;
    constructor(blockPos: BlockPos, blockState: BlockState);
  }


  interface PedestalBlockEntity extends BlockEntity {}
  class PedestalBlockEntity extends BlockEntity {
    readonly inventory: SimpleContainer;
    constructor(pos: BlockPos, blockState: BlockState);
    clearContents(): void;
    drops(): void;
    get updatePacket(): Packet<ClientGamePacketListener>;
    getUpdateTag(pRegistries: Provider): CompoundTag;
    sync(): void;
  }


  interface ReassemblyUnitBlockEntity extends BlockEntity {}
  class ReassemblyUnitBlockEntity extends BlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
    get stage(): ReassembleStage;
    isCooking(): boolean;
    isFinished(): boolean;
    isIdle(): boolean;
    set stage(stage: ReassembleStage);
    startProcess(stage: ReassembleStage, durationTicks: number): void;
    static tick(level: Level, pos: BlockPos, state: BlockState, be: ReassemblyUnitBlockEntity): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.block.block_entity.ReassemblyUnitBlockEntity' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ReassembleStage extends Enum<ReassembleStage> {}
  class ReassembleStage extends Enum<ReassembleStage> {
    static readonly IDLE: ReassembleStage;
    static readonly COOKING_10: ReassembleStage;
    static readonly COOKING_50: ReassembleStage;
    static readonly COOKING_100: ReassembleStage;
    static readonly FINISHED_10: ReassembleStage;
    static readonly FINISHED_50: ReassembleStage;
    static readonly FINISHED_100: ReassembleStage;
    get serializedName(): string;
    static valueOf(name: string): ReassembleStage;
    static values(): ReassembleStage[];
  }

}

declare module 'com.github.yajatkaul.mega_showdown.block.block_entity.renderer' {
  import { BlockEntityRenderer } from 'net.minecraft.client.renderer.blockentity';
  import { MegaStoneStandEntity, PedestalBlockEntity } from 'com.github.yajatkaul.mega_showdown.block.block_entity';
  import { Context } from 'BlockEntityRendererProvider';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';

  interface MegaStoneStandRenderer extends BlockEntityRenderer<MegaStoneStandEntity> {}
  class MegaStoneStandRenderer extends BlockEntityRenderer<MegaStoneStandEntity> {
    constructor(context: Context);
    render(blockEntity: MegaStoneStandEntity, tickDelta: number, poseStack: PoseStack, multiBufferSource: MultiBufferSource, packedLight: number, overlay: number): void;
  }


  interface PedestalBlockEntityRenderer extends BlockEntityRenderer<PedestalBlockEntity> {}
  class PedestalBlockEntityRenderer extends BlockEntityRenderer<PedestalBlockEntity> {
    constructor(context: Context);
    render(blockEntity: PedestalBlockEntity, partialTick: number, poseStack: PoseStack, bufferSource: MultiBufferSource, packedLight: number, packedOverlay: number): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.block.block_entity.renderer.state' {
  import { PosableState } from 'com.cobblemon.mod.common.client.render.models.blockbench';
  import { Entity } from 'net.minecraft.world.entity';
  import { SchedulingTracker } from 'com.cobblemon.mod.common.api.scheduling';

  interface MegaStoneStandState extends PosableState {}
  class MegaStoneStandState extends PosableState {
    constructor();
    get entity(): Entity;
    get schedulingTracker(): SchedulingTracker;
    updatePartialTicks(partialTicks: number): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.block.custom' {
  import { AmethystClusterBlock, Block, SweetBerryBushBlock, BonemealableBlock, BaseEntityBlock, Rotation, Mirror } from 'net.minecraft.world.level.block';
  import { Properties } from 'BlockBehaviour';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { DirectionProperty, IntegerProperty, EnumProperty } from 'net.minecraft.world.level.block.state.properties';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level, BlockGetter, LevelReader } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { Entity, LivingEntity } from 'net.minecraft.world.entity';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { RandomSource } from 'net.minecraft.util';
  import { ItemInteractionResult, InteractionHand } from 'net.minecraft.world';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BlockHitResult } from 'net.minecraft.world.phys';
  import { MapCodec } from 'com.mojang.serialization';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { BlockEntity, BlockEntityTicker, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { ParticleOptions } from 'net.minecraft.core.particles';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface CrystalBlock extends AmethystClusterBlock {}
  class CrystalBlock extends AmethystClusterBlock {
    constructor(f: number, g: number, arg: Properties, dropExp: boolean);
  }


  interface CustomHitBoxBlock extends Block {}
  class CustomHitBoxBlock extends Block {
    readonly SHAPE: VoxelShape;
    constructor(properties: Properties, shape: VoxelShape);
  }


  interface DormantCrystal extends CrystalBlock {}
  class DormantCrystal extends CrystalBlock {
    constructor(f: number, g: number, properties: Properties, dropExp: boolean);
  }


  interface HorizontalDirectionalBlock extends Block {}
  class HorizontalDirectionalBlock extends Block {
    static readonly FACING: DirectionProperty;
    constructor(properties: Properties);
  }


  interface MaxMushroomBlock extends BonemealableBlock, SweetBerryBushBlock {}
  class MaxMushroomBlock extends BonemealableBlock {
    static readonly AGE: IntegerProperty;
    constructor(properties: Properties);
    entityInside(state: BlockState, level: Level, pos: BlockPos, entity: Entity): void;
    getCloneItemStack(levelReader: LevelReader, blockPos: BlockPos, blockState: BlockState): ItemStack;
    getShape(state: BlockState, getter: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    isBonemealSuccess(level: Level, random: RandomSource, pos: BlockPos, state: BlockState): boolean;
    isRandomlyTicking(state: BlockState): boolean;
    isValidBonemealTarget(level: LevelReader, pos: BlockPos, state: BlockState): boolean;
    performBonemeal(level: ServerLevel, random: RandomSource, pos: BlockPos, state: BlockState): void;
    randomTick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
    useItemOn(stack: ItemStack, state: BlockState, level: Level, pos: BlockPos, player: Player, hand: InteractionHand, hit: BlockHitResult): ItemInteractionResult;
  }


  interface MegaStoneStand extends BaseEntityBlock {}
  class MegaStoneStand extends BaseEntityBlock {
    static readonly FACING: DirectionProperty;
    static readonly CODEC: MapCodec;
    constructor(properties: Properties);
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    newBlockEntity(blockPos: BlockPos, blockState: BlockState): BlockEntity;
  }


  interface ParticleBlock extends CrystalBlock {}
  class ParticleBlock extends CrystalBlock {
    readonly SHAPE: VoxelShape;
    readonly particleType: ParticleOptions;
    constructor(f: number, g: number, arg: Properties, dropExp: boolean, shape: VoxelShape, particleType: ParticleOptions);
    animateTick(blockState: BlockState, level: Level, blockPos: BlockPos, randomSource: RandomSource): void;
  }


  interface PedestalBlock extends BaseEntityBlock {}
  class PedestalBlock extends BaseEntityBlock {
    static readonly SHAPE: VoxelShape;
    static readonly FACING: DirectionProperty;
    static readonly CODEC: MapCodec;
    constructor(properties: Properties);
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    newBlockEntity(blockPos: BlockPos, blockState: BlockState): BlockEntity;
    rotate(state: BlockState, rotation: Rotation): BlockState;
  }


  interface PokemonSelectingBlock extends Block {}
  class PokemonSelectingBlock extends Block {
    constructor(properties: Properties, id: ResourceLocation, canUseInBattle: boolean);
  }


  interface ReassemblyUnitBlock extends BaseEntityBlock {}
  class ReassemblyUnitBlock extends BaseEntityBlock {
    static readonly REASSEMBLE_STAGE: EnumProperty;
    static readonly HALF: EnumProperty;
    static readonly FACING: DirectionProperty;
    static readonly CODEC: MapCodec;
    constructor(properties: Properties);
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    getTicker<T extends BlockEntity>(level: Level, blockState: BlockState, blockEntityType: BlockEntityType<T>): BlockEntityTicker<T>;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    playerWillDestroy(level: Level, blockPos: BlockPos, blockState: BlockState, player: Player): BlockState;
    setPlacedBy(level: Level, pos: BlockPos, state: BlockState, livingEntity: LivingEntity, itemStack: ItemStack): void;
  }


  interface RotomUnitBlock extends Block {}
  class RotomUnitBlock extends Block {
    static readonly FACING: DirectionProperty;
    static readonly SHAPE: VoxelShape;
    constructor(arg: Properties, form: string);
    getCollisionShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(arg: BlockPlaceContext): BlockState;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.block' {
  import { RegistrySupplier, DeferredRegister } from 'dev.architectury.registry.registries';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { TooltipContext } from 'Item';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  class MegaShowdownBlockEntities {
    static readonly REASSEMBLY_UNIT_ENTITY: RegistrySupplier;
    static readonly PEDESTAL_BLOCK_ENTITY: RegistrySupplier;
    static readonly MEGA_STONE_STAND_BLOCK_ENTITY: RegistrySupplier;
    static register(): void;
  }


  class MegaShowdownBlocks {
    static readonly BLOCKS: DeferredRegister;
    static readonly POWER_SPOT: RegistrySupplier;
    static readonly MAX_MUSHROOM: RegistrySupplier;
    static readonly GRACIDEA_FLOWER: RegistrySupplier;
    static readonly POTTED_GRACIDEA: RegistrySupplier;
    static readonly REASSEMBLY_UNIT: RegistrySupplier;
    static readonly PEDESTAL: RegistrySupplier;
    static readonly MEGA_METEOROID_BLOCK: RegistrySupplier;
    static readonly MEGA_METEOROID_RADIATED_BLOCK: RegistrySupplier;
    static readonly MEGA_METEOROID_BRICK: RegistrySupplier;
    static readonly CHISELED_MEGA_METEOROID_BLOCK: RegistrySupplier;
    static readonly CHISELED_MEGA_METEOROID_BRICK: RegistrySupplier;
    static readonly POLISHED_MEGA_METEOROID_BLOCK: RegistrySupplier;
    static readonly KEYSTONE_ORE: RegistrySupplier;
    static readonly KEYSTONE_BLOCK: RegistrySupplier;
    static readonly MEGA_METEORID_WATER_ORE: RegistrySupplier;
    static readonly MEGA_METEORID_DAWN_ORE: RegistrySupplier;
    static readonly MEGA_METEORID_DUSK_ORE: RegistrySupplier;
    static readonly MEGA_METEORID_FIRE_ORE: RegistrySupplier;
    static readonly MEGA_METEORID_ICE_ORE: RegistrySupplier;
    static readonly MEGA_METEORID_LEAF_ORE: RegistrySupplier;
    static readonly MEGA_METEORID_MOON_ORE: RegistrySupplier;
    static readonly MEGA_METEORID_SHINY_ORE: RegistrySupplier;
    static readonly MEGA_METEORID_SUN_ORE: RegistrySupplier;
    static readonly MEGA_METEORID_THUNDER_ORE: RegistrySupplier;
    static readonly MEGA_STONE_CRYSTAL: RegistrySupplier;
    static readonly WISHING_STAR_CRYSTAL: RegistrySupplier;
    static readonly DORMANT_CRYSTAL: RegistrySupplier;
    static readonly DEOXYS_METEORITE: RegistrySupplier;
    static readonly ROTOM_WASHING_MACHINE: RegistrySupplier;
    static readonly ROTOM_FAN: RegistrySupplier;
    static readonly ROTOM_MOW: RegistrySupplier;
    static readonly ROTOM_FRIDGE: RegistrySupplier;
    static readonly ROTOM_OVEN: RegistrySupplier;
    appendHoverText(arg: ItemStack, arg2: TooltipContext, list: Component[], arg3: TooltipFlag): void;
    static register(): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.client' {
  class ClientEventRegister {
    static register(): void;
  }


  class ClientMinecraftRegister {
    static register(): void;
  }


  class CobbleClientEvents {
    static register(): void;
  }


  class WheelDataClient {
    static shouldMega: boolean;
    static shouldUltra: boolean;
    static canMega: boolean;
    static canUltra: boolean;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.cobblemon.battle.button' {
  import { Companion } from 'com.github.yajatkaul.mega_showdown.cobblemon.battle.button.BattleShiftButton';
  import { SingleActionRequest } from 'com.cobblemon.mod.common.client.battle';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class BattleShiftButton {
    static readonly Companion: Companion;
    static readonly WIDTH: number;
    static readonly HEIGHT: number;
    static readonly SCALE: number;
    constructor(x: number, y: number, request: SingleActionRequest);
    get enabled(): boolean;
    get request(): SingleActionRequest;
    get x(): number;
    get y(): number;
    isHovered(mouseX: number, mouseY: number): boolean;
    render(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.cobblemon.battle.button.BattleShiftButton' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get baseTexture(): ResourceLocation;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.cobblemon.features' {
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';

  class DynamaxLevelHandler {
    static register(): void;
    static update(pokemon: Pokemon): void;
  }


  class GlobalFeatureManager {
    static registerEarly(): void;
    static update(pokemon: Pokemon): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.cobblemon.status' {
  import { PersistentStatus } from 'com.cobblemon.mod.common.pokemon.status';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IntRange } from 'kotlin.ranges';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';
  import { Random } from 'kotlin.random';

  interface DamageStatus extends PersistentStatus {}
  class DamageStatus extends PersistentStatus {
    constructor(name: ResourceLocation, showdownName: string, applyMessage: string, removeMessage: string, defaultDuration: IntRange, chance: number, damagePercent: number, healingAbility: string);
    onSecondPassed(player: ServerPlayer, pokemon: Pokemon, random: Random): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.command' {
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack, CommandBuildContext } from 'net.minecraft.commands';
  import { CommandSelection } from 'Commands';

  class MegaShowdownCommands {
    static registerCommands(dispatcher: CommandDispatcher<CommandSourceStack>, context: CommandBuildContext, environment: CommandSelection): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.components' {
  import { Supplier } from 'java.util.function';

  class MegaShowdownDataComponents {
    static readonly POKEMON_STORAGE: Supplier;
    static readonly TERA_TYPE: Supplier;
    static readonly INVENTORY: Supplier;
    static readonly LIKO_PENDANT_TICK_COMPONENT: Supplier;
    static readonly REGISTRY_TYPE_COMPONENT: Supplier;
    static readonly RESOURCE_LOCATION_COMPONENT: Supplier;
    static register(): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.config' {
  class MegaShowdownConfig {
    static loaded: boolean;
    static teraShardRequired: number;
    static outSideMega: boolean;
    static outSideUltraBurst: boolean;
    static multipleMegas: boolean;
    static showdownFilesLoading: boolean;
    static mega: boolean;
    static zMoves: boolean;
    static teralization: boolean;
    static dynamax: boolean;
    static powerSpotRange: number;
    static dynamaxAnywhere: boolean;
    static dynamaxScaleFactor: number;
    static teraShardDropRate: number;
    static stellarShardDropRate: number;
    static teraHats: boolean;
    static legacyTeraEffect: boolean;
    static likoPendentDuration: number;
    static minBondingRequired: number;
    static debugMode: boolean;
    static load(): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.creative' {
  import { DeferredRegister, RegistrySupplier } from 'dev.architectury.registry.registries';

  class MegaShowdownTabs {
    static readonly CREATIVE_TABS: DeferredRegister;
    static readonly MEGA_TAB: RegistrySupplier;
    static readonly COMPI_TAB: RegistrySupplier;
    static readonly TERA_TAB: RegistrySupplier;
    static readonly KEY_TAB: RegistrySupplier;
    static readonly Z_TAB: RegistrySupplier;
    static readonly DYNAMAX_TAB: RegistrySupplier;
    static readonly FORM_TAB: RegistrySupplier;
    static register(): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.datapack' {
  import { HashMap, Map } from 'java.util';
  import { JsonDataRegistry } from 'com.cobblemon.mod.common.api.data';
  import { CustomStatusData } from 'com.github.yajatkaul.mega_showdown.datapack.CustomTypeStatusRegistry';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { PackType } from 'net.minecraft.server.packs';
  import { Gson } from 'com.google.gson';
  import { TypeToken } from 'com.google.gson.reflect';
  import { SimpleObservable } from 'com.cobblemon.mod.common.api.reactive';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Registry } from 'net.minecraft.core';
  import { MinecraftServer } from 'net.minecraft.server';

  class CustomTypeRegistry {
    static customTypes: HashMap;
  }


  interface CustomTypeStatusRegistry extends JsonDataRegistry<CustomStatusData> {}
  class CustomTypeStatusRegistry extends JsonDataRegistry<CustomStatusData> {
    static readonly INSTANCE: CustomTypeStatusRegistry;
    get gson(): Gson;
    get id(): ResourceLocation;
    get observable(): SimpleObservable<CustomTypeStatusRegistry>;
    get resourcePath(): string;
    get type(): PackType;
    get typeToken(): TypeToken<CustomStatusData>;
    reload(data: Map<ResourceLocation, CustomStatusData>): void;
    sync(player: ServerPlayer): void;
  }


  class MegaShowdownDatapackRegister {
    static readonly EFFECT_REGISTRY_KEY: ResourceKey;
    static readonly FORM_CHANGE_TOGGLE_INTERACT_REGISTRY_KEY: ResourceKey;
    static readonly FORM_CHANGE_INTERACT_REGISTRY_KEY: ResourceKey;
    static readonly SOLO_FUSION_REGISTRY_KEY: ResourceKey;
    static readonly DU_FUSION_REGISTRY_KEY: ResourceKey;
    static readonly GMAX_REGISTRY_KEY: ResourceKey;
    static readonly HELD_ITEM_FORM_CHANGE_REGISTRY_KEY: ResourceKey;
    static readonly MEGA_REGISTRY_KEY: ResourceKey;
    static readonly SHOWDOWN_ITEM_REGISTRY_KEY: ResourceKey;
    static readonly Z_CRYSTAL_ITEM_REGISTRY_KEY: ResourceKey;
    static readonly BATTLE_FORM_CHANGE_REGISTRY_KEY: ResourceKey;
    static readonly BATTLE_EFFECT_REGISTRY_KEY: ResourceKey;
    static MEGA_REGISTRY: Registry;
    static SHOWDOWN_ITEM_REGISTRY: Registry;
    static GMAX_REGISTRY: Registry;
    static SOLO_FUSION_REGISTRY: Registry;
    static DU_FUSION_REGISTRY: Registry;
    static HELD_ITEM_FORM_CHANGE_REGISTRY: Registry;
    static FORM_CHANGE_TOGGLE_INTERACT_REGISTRY: Registry;
    static BATTLE_FORM_CHANGE_REGISTRY: Registry;
    static EFFECT_REGISTRY: Registry;
    static FORM_CHANGE_INTERACT_REGISTRY: Registry;
    static Z_CRYSTAL_ITEM_REGISTRY: Registry;
    static BATTLE_EFFECT_REGISTRY: Registry;
    static registerShowdownDatapackItems(server: MinecraftServer): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.event' {
  class AccessoriesEvent {
    static register(): void;
  }


  class CobbleEvents {
    static register(): void;
  }


  class EventRegister {
    static register(): void;
  }


  class MinecraftEvents {
    static register(): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.gimmick' {
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Gimmick } from 'ShowdownMoveset';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';
  import { BattlePokemon } from 'com.cobblemon.mod.common.battles.pokemon';

  class GimmickTurnCheck {
    static check(player: ServerPlayer): void;
    static hasGimmick(gimmick: Gimmick, user: LivingEntity): boolean;
  }


  class UltraGimmick {
    static canUltraBurst(pokemon: Pokemon): boolean;
    static isUltra(pokemon: Pokemon): boolean;
    static ultraBurstInBattle(pokemon: Pokemon, battlePokemon: BattlePokemon): void;
    static ultraBurstToggle(pokemon: Pokemon): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.item.custom' {
  import { Item, ItemStack, TooltipFlag, BlockItem } from 'net.minecraft.world.item';
  import { Properties, TooltipContext } from 'Item';
  import { InteractionResult, InteractionHand, InteractionResultHolder } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { PokemonSelectingItem as com_cobblemon_mod_common_api_item_PokemonSelectingItem } from 'com.cobblemon.mod.common.api.item';
  import { Block } from 'net.minecraft.world.level.block';
  import { BagItem } from 'com.cobblemon.mod.common.item.battle';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Level } from 'net.minecraft.world.level';
  import { BattlePokemon } from 'com.cobblemon.mod.common.battles.pokemon';
  import { BattleActor } from 'com.cobblemon.mod.common.api.battles.model.actor';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  interface DebugStick extends Item {}
  class DebugStick extends Item {
    constructor(properties: Properties);
    interactLivingEntity(itemStack: ItemStack, player: Player, livingEntity: LivingEntity, interactionHand: InteractionHand): InteractionResult;
  }


  interface PokemonSelectingBlockItem extends com_cobblemon_mod_common_api_item_PokemonSelectingItem, ToolTipBlockItem {}
  class PokemonSelectingBlockItem extends com_cobblemon_mod_common_api_item_PokemonSelectingItem {
    constructor(block: Block, properties: Properties);
    canUseOnBattlePokemon(stack: ItemStack, battlePokemon: BattlePokemon): boolean;
    get bagItem(): BagItem;
    interactGeneralBattle(player: ServerPlayer, itemStack: ItemStack, battleActor: BattleActor): InteractionResultHolder<ItemStack>;
    interactWithSpecificBattle(player: ServerPlayer, itemStack: ItemStack, battlePokemon: BattlePokemon): InteractionResultHolder<ItemStack>;
    use(player: ServerPlayer, itemStack: ItemStack): InteractionResultHolder<ItemStack>;
    use(world: Level, user: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface PokemonSelectingItem extends com_cobblemon_mod_common_api_item_PokemonSelectingItem, ToolTipItem {}
  class PokemonSelectingItem extends com_cobblemon_mod_common_api_item_PokemonSelectingItem {
    constructor(settings: Properties);
    canUseOnBattlePokemon(stack: ItemStack, battlePokemon: BattlePokemon): boolean;
    get bagItem(): BagItem;
    interactGeneralBattle(player: ServerPlayer, itemStack: ItemStack, battleActor: BattleActor): InteractionResultHolder<ItemStack>;
    interactWithSpecificBattle(player: ServerPlayer, itemStack: ItemStack, battlePokemon: BattlePokemon): InteractionResultHolder<ItemStack>;
    use(player: ServerPlayer, itemStack: ItemStack): InteractionResultHolder<ItemStack>;
    use(world: Level, user: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface PokemonSelectingItemNoToolTip extends com_cobblemon_mod_common_api_item_PokemonSelectingItem, Item {}
  class PokemonSelectingItemNoToolTip extends com_cobblemon_mod_common_api_item_PokemonSelectingItem {
    constructor(settings: Properties);
    canUseOnBattlePokemon(stack: ItemStack, battlePokemon: BattlePokemon): boolean;
    get bagItem(): BagItem;
    interactGeneralBattle(player: ServerPlayer, itemStack: ItemStack, battleActor: BattleActor): InteractionResultHolder<ItemStack>;
    interactWithSpecificBattle(player: ServerPlayer, itemStack: ItemStack, battlePokemon: BattlePokemon): InteractionResultHolder<ItemStack>;
    use(player: ServerPlayer, itemStack: ItemStack): InteractionResultHolder<ItemStack>;
    use(world: Level, user: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface TeraPouch extends Item {}
  class TeraPouch extends Item {
    constructor(properties: Properties);
    appendHoverText(itemStack: ItemStack, tooltipContext: TooltipContext, list: Component[], tooltipFlag: TooltipFlag): void;
    use(level: Level, player: Player, interactionHand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface ToolTipBlockItem extends BlockItem {}
  class ToolTipBlockItem extends BlockItem {
    constructor(block: Block, properties: Properties);
    appendHoverText(itemStack: ItemStack, tooltipContext: TooltipContext, tooltipComponents: Component[], tooltipFlag: TooltipFlag): void;
  }


  interface ToolTipItem extends Item {}
  class ToolTipItem extends Item {
    constructor(properties: Properties);
    appendHoverText(itemStack: ItemStack, tooltipContext: TooltipContext, tooltipComponents: Component[], tooltipFlag: TooltipFlag): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.item.custom.dynamax' {
  import { PokemonSelectingItem } from 'com.github.yajatkaul.mega_showdown.item.custom';
  import { Properties } from 'Item';
  import { InteractionResultHolder } from 'net.minecraft.world';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';

  interface DynamaxCandy extends PokemonSelectingItem {}
  class DynamaxCandy extends PokemonSelectingItem {
    constructor(arg: Properties);
    applyToPokemon(player: ServerPlayer, itemStack: ItemStack, pokemon: Pokemon): InteractionResultHolder<ItemStack>;
    canUseOnPokemon(stack: ItemStack, pokemon: Pokemon): boolean;
  }


  interface MaxSoup extends PokemonSelectingItem {}
  class MaxSoup extends PokemonSelectingItem {
    constructor(arg: Properties);
    applyToPokemon(player: ServerPlayer, itemStack: ItemStack, pokemon: Pokemon): InteractionResultHolder<ItemStack>;
    canUseOnPokemon(stack: ItemStack, pokemon: Pokemon): boolean;
  }


  interface SweetMaxSoup extends PokemonSelectingItem {}
  class SweetMaxSoup extends PokemonSelectingItem {
    constructor(arg: Properties);
    applyToPokemon(serverPlayer: ServerPlayer, itemStack: ItemStack, pokemon: Pokemon): InteractionResultHolder<ItemStack>;
    canUseOnPokemon(stack: ItemStack, pokemon: Pokemon): boolean;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.item.custom.form_change' {
  import { PokemonSelectingItem, PokemonSelectingBlockItem, ToolTipItem } from 'com.github.yajatkaul.mega_showdown.item.custom';
  import { Properties } from 'Item';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';
  import { InteractionResultHolder, InteractionHand } from 'net.minecraft.world';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Block } from 'net.minecraft.world.level.block';
  import { List } from 'java.util';
  import { Consumer } from 'java.util.function';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';

  interface AshCap extends PokemonSelectingItem {}
  class AshCap extends PokemonSelectingItem {
    constructor(arg: Properties);
    applyToPokemon(serverPlayer: ServerPlayer, itemStack: ItemStack, pokemon: Pokemon): InteractionResultHolder<ItemStack>;
    canUseOnPokemon(stack: ItemStack, pokemon: Pokemon): boolean;
  }


  interface DeoxysMeteoridItem extends PokemonSelectingBlockItem {}
  class DeoxysMeteoridItem extends PokemonSelectingBlockItem {
    constructor(block: Block, properties: Properties);
    applyToPokemon(serverPlayer: ServerPlayer, itemStack: ItemStack, pokemon: Pokemon): InteractionResultHolder<ItemStack>;
    canUseOnPokemon(stack: ItemStack, pokemon: Pokemon): boolean;
  }


  interface FormChangeHeldItem extends ToolTipItem {}
  class FormChangeHeldItem extends ToolTipItem {
    constructor(properties: Properties, revertAspect: string, applyAspect: string, pokemons: string[], effectId: string, tradable: boolean, onApplyCallback: Consumer<Pokemon>, onRevertCallback: Consumer<Pokemon>);
    apply(pokemon: Pokemon): void;
    revert(pokemon: Pokemon): void;
  }


  interface FormChangeInteractItem extends PokemonSelectingItem {}
  class FormChangeInteractItem extends PokemonSelectingItem {
    constructor(properties: Properties, form_aspect_name: string, form_aspect_apply: string, pokemons: string[], effectId: string, consume: number, revertable: boolean, form_aspect_revert: string);
    applyToPokemon(serverPlayer: ServerPlayer, itemStack: ItemStack, pokemon: Pokemon): InteractionResultHolder<ItemStack>;
    canUseOnPokemon(stack: ItemStack, pokemon: Pokemon): boolean;
  }


  interface FormChangeInteractToggleItem extends PokemonSelectingItem {}
  class FormChangeInteractToggleItem extends PokemonSelectingItem {
    constructor(properties: Properties, form_apply_order: string[], form_aspect_apply_order: string[], pokemons: string[], effectIds: string[], consume: number);
    applyToPokemon(serverPlayer: ServerPlayer, itemStack: ItemStack, pokemon: Pokemon): InteractionResultHolder<ItemStack>;
    canUseOnPokemon(stack: ItemStack, pokemon: Pokemon): boolean;
  }


  interface Gracedia extends PokemonSelectingBlockItem {}
  class Gracedia extends PokemonSelectingBlockItem {
    constructor(block: Block, properties: Properties);
    applyToPokemon(serverPlayer: ServerPlayer, itemStack: ItemStack, pokemon: Pokemon): InteractionResultHolder<ItemStack>;
    canUseOnPokemon(stack: ItemStack, pokemon: Pokemon): boolean;
  }


  interface RotomCatalogue extends PokemonSelectingItem {}
  class RotomCatalogue extends PokemonSelectingItem {
    constructor(properties: Properties);
    applyToPokemon(serverPlayer: ServerPlayer, itemStack: ItemStack, pokemon: Pokemon): InteractionResultHolder<ItemStack>;
    canUseOnPokemon(stack: ItemStack, pokemon: Pokemon): boolean;
  }


  interface RotomUnitItem extends PokemonSelectingBlockItem {}
  class RotomUnitItem extends PokemonSelectingBlockItem {
    constructor(block: Block, properties: Properties, form: string);
    applyToPokemon(serverPlayer: ServerPlayer, itemStack: ItemStack, pokemon: Pokemon): InteractionResultHolder<ItemStack>;
    canUseOnPokemon(stack: ItemStack, pokemon: Pokemon): boolean;
  }


  interface ZygardeCube extends ToolTipItem {}
  class ZygardeCube extends ToolTipItem {
    constructor(properties: Properties);
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.item.custom.fusion' {
  import { ToolTipItem } from 'com.github.yajatkaul.mega_showdown.item.custom';
  import { Properties } from 'Item';
  import { List } from 'java.util';
  import { InteractionResultHolder, InteractionHand } from 'net.minecraft.world';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemEntity } from 'net.minecraft.world.entity.item';

  interface DuFusion extends ToolTipItem {}
  class DuFusion extends ToolTipItem {
    constructor(properties: Properties, fusions1: string[], fusions2: string[], pokemons1: string[], pokemons2: string[], mainPokemons: string[], applyAspect1: string[], applyAspect2: string[], revertAspect1: string[], revertAspect2: string[], effectId1: string, effectId2: string, namespace: string);
    onDestroyed(itemEntity: ItemEntity): void;
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface SoloFusion extends ToolTipItem {}
  class SoloFusion extends ToolTipItem {
    constructor(properties: Properties, fusions: string[], pokemons: string[], mainPokemons: string[], effectId: string, applyAspect: string[], revertAspect: string[], namespace: string);
    onDestroyed(itemEntity: ItemEntity): void;
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.item.custom.gimmick' {
  import { ToolTipItem } from 'com.github.yajatkaul.mega_showdown.item.custom';
  import { Properties } from 'Item';
  import { InteractionResultHolder, InteractionHand } from 'net.minecraft.world';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';

  interface DynamaxBand extends ToolTipItem {}
  class DynamaxBand extends ToolTipItem {
    constructor(properties: Properties);
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface MegaBracelet extends ToolTipItem {}
  class MegaBracelet extends ToolTipItem {
    constructor(properties: Properties);
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface OmniRing extends ToolTipItem {}
  class OmniRing extends ToolTipItem {
    constructor(properties: Properties);
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface TeraOrb extends ToolTipItem {}
  class TeraOrb extends ToolTipItem {
    constructor(properties: Properties);
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface ZRing extends ToolTipItem {}
  class ZRing extends ToolTipItem {
    constructor(properties: Properties);
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.item.custom.mega' {
  import { ToolTipItem } from 'com.github.yajatkaul.mega_showdown.item.custom';
  import { Properties } from 'Item';

  interface MegaStone extends ToolTipItem {}
  class MegaStone extends ToolTipItem {
    constructor(properties: Properties);
  }

}

declare module 'com.github.yajatkaul.mega_showdown.item.custom.tera' {
  import { PokemonSelectingItemNoToolTip, ToolTipItem, PokemonSelectingItem } from 'com.github.yajatkaul.mega_showdown.item.custom';
  import { Properties, TooltipContext } from 'Item';
  import { InteractionResultHolder, InteractionHand } from 'net.minecraft.world';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Entity } from 'net.minecraft.world.entity';
  import { TeraType } from 'com.cobblemon.mod.common.api.types.tera';

  interface CustomTeraShard extends PokemonSelectingItemNoToolTip {}
  class CustomTeraShard extends PokemonSelectingItemNoToolTip {
    constructor(arg: Properties);
    appendHoverText(itemStack: ItemStack, tooltipContext: TooltipContext, tooltipComponents: Component[], tooltipFlag: TooltipFlag): void;
    applyToPokemon(player: ServerPlayer, itemStack: ItemStack, pokemon: Pokemon): InteractionResultHolder<ItemStack>;
    canUseOnPokemon(stack: ItemStack, pokemon: Pokemon): boolean;
  }


  interface LikosPendant extends ToolTipItem {}
  class LikosPendant extends ToolTipItem {
    constructor(properties: Properties);
    inventoryTick(stack: ItemStack, level: Level, entity: Entity, slot: number, selected: boolean): void;
    static ticksToTime(ticks: number): string;
    use(level: Level, player: Player, interactionHand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface TeraShard extends PokemonSelectingItem {}
  class TeraShard extends PokemonSelectingItem {
    constructor(arg: Properties, teraType: TeraType);
    applyToPokemon(player: ServerPlayer, itemStack: ItemStack, pokemon: Pokemon): InteractionResultHolder<ItemStack>;
    canUseOnPokemon(stack: ItemStack, pokemon: Pokemon): boolean;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.item.custom.z' {
  import { FormChangeHeldItem } from 'com.github.yajatkaul.mega_showdown.item.custom.form_change';
  import { Properties } from 'Item';
  import { List } from 'java.util';
  import { ElementalType } from 'com.cobblemon.mod.common.api.types';
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';
  import { ToolTipItem } from 'com.github.yajatkaul.mega_showdown.item.custom';

  interface ElementalZCrystal extends FormChangeHeldItem {}
  class ElementalZCrystal extends FormChangeHeldItem {
    constructor(properties: Properties, pokemons: string[], tradable: boolean, element: ElementalType);
    apply(pokemon: Pokemon): void;
    get element(): ElementalType;
    revert(pokemon: Pokemon): void;
  }


  interface SpecialZCrystal extends ToolTipItem {}
  class SpecialZCrystal extends ToolTipItem {
    constructor(properties: Properties, element: ElementalType);
    get element(): ElementalType;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.item' {
  import { DeferredRegister, RegistrySupplier } from 'dev.architectury.registry.registries';

  class MegaShowdownItems {
    static readonly ITEMS: DeferredRegister;
    static readonly KEYSTONE: RegistrySupplier;
    static readonly MEGA_STONE: RegistrySupplier;
    static readonly ABOMASITE: RegistrySupplier;
    static readonly ABSOLITE: RegistrySupplier;
    static readonly AERODACTYLITE: RegistrySupplier;
    static readonly AGGRONITE: RegistrySupplier;
    static readonly ALAKAZITE: RegistrySupplier;
    static readonly ALTARIANITE: RegistrySupplier;
    static readonly AMPHAROSITE: RegistrySupplier;
    static readonly AUDINITE: RegistrySupplier;
    static readonly BANETTITE: RegistrySupplier;
    static readonly BEEDRILLITE: RegistrySupplier;
    static readonly BLASTOISINITE: RegistrySupplier;
    static readonly BLAZIKENITE: RegistrySupplier;
    static readonly CAMERUPTITE: RegistrySupplier;
    static readonly CHARIZARDITE_X: RegistrySupplier;
    static readonly CHARIZARDITE_Y: RegistrySupplier;
    static readonly DIANCITE: RegistrySupplier;
    static readonly GALLADITE: RegistrySupplier;
    static readonly GLALITITE: RegistrySupplier;
    static readonly GARCHOMPITE: RegistrySupplier;
    static readonly GARDEVOIRITE: RegistrySupplier;
    static readonly GENGARITE: RegistrySupplier;
    static readonly GYARADOSITE: RegistrySupplier;
    static readonly HERACRONITE: RegistrySupplier;
    static readonly HOUNDOOMINITE: RegistrySupplier;
    static readonly KANGASKHANITE: RegistrySupplier;
    static readonly LATIASITE: RegistrySupplier;
    static readonly LATIOSITE: RegistrySupplier;
    static readonly LOPUNNITE: RegistrySupplier;
    static readonly LUCARIONITE: RegistrySupplier;
    static readonly MANECTITE: RegistrySupplier;
    static readonly MAWILITE: RegistrySupplier;
    static readonly MEDICHAMITE: RegistrySupplier;
    static readonly METAGROSSITE: RegistrySupplier;
    static readonly MEWTWONITE_X: RegistrySupplier;
    static readonly MEWTWONITE_Y: RegistrySupplier;
    static readonly PIDGEOTITE: RegistrySupplier;
    static readonly PINSIRITE: RegistrySupplier;
    static readonly SABLENITE: RegistrySupplier;
    static readonly SALAMENCITE: RegistrySupplier;
    static readonly SCEPTILITE: RegistrySupplier;
    static readonly SCIZORITE: RegistrySupplier;
    static readonly SHARPEDONITE: RegistrySupplier;
    static readonly SLOWBRONITE: RegistrySupplier;
    static readonly STEELIXITE: RegistrySupplier;
    static readonly SWAMPERTITE: RegistrySupplier;
    static readonly TYRANITARITE: RegistrySupplier;
    static readonly VENUSAURITE: RegistrySupplier;
    static readonly RED_ORB: RegistrySupplier;
    static readonly BLUE_ORB: RegistrySupplier;
    static readonly STAR_CORE: RegistrySupplier;
    static readonly NORMAL_TERA_SHARD: RegistrySupplier;
    static readonly FIRE_TERA_SHARD: RegistrySupplier;
    static readonly WATER_TERA_SHARD: RegistrySupplier;
    static readonly ELECTRIC_TERA_SHARD: RegistrySupplier;
    static readonly GRASS_TERA_SHARD: RegistrySupplier;
    static readonly ICE_TERA_SHARD: RegistrySupplier;
    static readonly FIGHTING_TERA_SHARD: RegistrySupplier;
    static readonly POISON_TERA_SHARD: RegistrySupplier;
    static readonly GROUND_TERA_SHARD: RegistrySupplier;
    static readonly FLYING_TERA_SHARD: RegistrySupplier;
    static readonly PSYCHIC_TERA_SHARD: RegistrySupplier;
    static readonly BUG_TERA_SHARD: RegistrySupplier;
    static readonly ROCK_TERA_SHARD: RegistrySupplier;
    static readonly GHOST_TERA_SHARD: RegistrySupplier;
    static readonly DRAGON_TERA_SHARD: RegistrySupplier;
    static readonly DARK_TERA_SHARD: RegistrySupplier;
    static readonly STEEL_TERA_SHARD: RegistrySupplier;
    static readonly FAIRY_TERA_SHARD: RegistrySupplier;
    static readonly STELLAR_TERA_SHARD: RegistrySupplier;
    static readonly CUSTOM_TERA_SHARD: RegistrySupplier;
    static readonly SPARKLING_STONE_LIGHT: RegistrySupplier;
    static readonly SPARKLING_STONE_DARK: RegistrySupplier;
    static readonly BLANK_Z: RegistrySupplier;
    static readonly NORMALIUM_Z: RegistrySupplier;
    static readonly BUGINIUM_Z: RegistrySupplier;
    static readonly DARKINIUM_Z: RegistrySupplier;
    static readonly DRAGONIUM_Z: RegistrySupplier;
    static readonly ELECTRIUM_Z: RegistrySupplier;
    static readonly FAIRIUM_Z: RegistrySupplier;
    static readonly FIGHTINIUM_Z: RegistrySupplier;
    static readonly FIRIUM_Z: RegistrySupplier;
    static readonly FLYINIUM_Z: RegistrySupplier;
    static readonly GHOSTIUM_Z: RegistrySupplier;
    static readonly GRASSIUM_Z: RegistrySupplier;
    static readonly GROUNDIUM_Z: RegistrySupplier;
    static readonly ICIUM_Z: RegistrySupplier;
    static readonly POISONIUM_Z: RegistrySupplier;
    static readonly PSYCHIUM_Z: RegistrySupplier;
    static readonly ROCKIUM_Z: RegistrySupplier;
    static readonly STEELIUM_Z: RegistrySupplier;
    static readonly WATERIUM_Z: RegistrySupplier;
    static readonly ALORAICHIUM_Z: RegistrySupplier;
    static readonly DECIDIUM_Z: RegistrySupplier;
    static readonly EEVIUM_Z: RegistrySupplier;
    static readonly INCINIUM_Z: RegistrySupplier;
    static readonly KOMMONIUM_Z: RegistrySupplier;
    static readonly LUNALIUM_Z: RegistrySupplier;
    static readonly LYCANIUM_Z: RegistrySupplier;
    static readonly MARSHADIUM_Z: RegistrySupplier;
    static readonly MEWNIUM_Z: RegistrySupplier;
    static readonly MIMIKIUM_Z: RegistrySupplier;
    static readonly PIKANIUM_Z: RegistrySupplier;
    static readonly PIKASHUNIUM_Z: RegistrySupplier;
    static readonly PRIMARIUM_Z: RegistrySupplier;
    static readonly SNORLIUM_Z: RegistrySupplier;
    static readonly SOLGANIUM_Z: RegistrySupplier;
    static readonly TAPUNIUM_Z: RegistrySupplier;
    static readonly ULTRANECROZIUM_Z: RegistrySupplier;
    static readonly DNA_SPLICER: RegistrySupplier;
    static readonly REINS_OF_UNITY: RegistrySupplier;
    static readonly N_LUNARIZER: RegistrySupplier;
    static readonly N_SOLARIZER: RegistrySupplier;
    static readonly DEBUG_STICK: RegistrySupplier;
    static readonly MEGA_BRACELET: RegistrySupplier;
    static readonly MEGA_RED_BRACELET: RegistrySupplier;
    static readonly MEGA_YELLOW_BRACELET: RegistrySupplier;
    static readonly MEGA_PINK_BRACELET: RegistrySupplier;
    static readonly MEGA_GREEN_BRACELET: RegistrySupplier;
    static readonly MEGA_BLUE_BRACELET: RegistrySupplier;
    static readonly MEGA_BLACK_BRACELET: RegistrySupplier;
    static readonly MAY_BRACELET: RegistrySupplier;
    static readonly MEGA_RING: RegistrySupplier;
    static readonly LYSANDRE_RING: RegistrySupplier;
    static readonly BRENDAN_MEGA_CUFF: RegistrySupplier;
    static readonly KORRINA_GLOVE: RegistrySupplier;
    static readonly MAXIE_GLASSES: RegistrySupplier;
    static readonly ARCHIE_ANCHOR: RegistrySupplier;
    static readonly LISIA_MEGA_TIARA: RegistrySupplier;
    static readonly TERA_ORB: RegistrySupplier;
    static readonly DYNAMAX_BAND: RegistrySupplier;
    static readonly Z_RING: RegistrySupplier;
    static readonly Z_RING_BLACK: RegistrySupplier;
    static readonly Z_RING_YELLOW: RegistrySupplier;
    static readonly Z_RING_GREEN: RegistrySupplier;
    static readonly Z_RING_BLUE: RegistrySupplier;
    static readonly Z_RING_PINK: RegistrySupplier;
    static readonly Z_RING_RED: RegistrySupplier;
    static readonly OLIVIAS_Z_RING: RegistrySupplier;
    static readonly HAPUS_Z_RING: RegistrySupplier;
    static readonly Z_RING_POWER: RegistrySupplier;
    static readonly OLIVIA_Z_POWER_RING: RegistrySupplier;
    static readonly HAPU_Z_POWER_RING: RegistrySupplier;
    static readonly ROCKET_Z_POWER_RING: RegistrySupplier;
    static readonly GLADION_Z_POWER_RING: RegistrySupplier;
    static readonly NANU_Z_POWER_RING: RegistrySupplier;
    static readonly OMNI_RING: RegistrySupplier;
    static readonly DYNAMAX_CANDY: RegistrySupplier;
    static readonly MAX_HONEY: RegistrySupplier;
    static readonly MAX_SOUP: RegistrySupplier;
    static readonly SWEET_MAX_SOUP: RegistrySupplier;
    static readonly WISHING_STAR: RegistrySupplier;
    static readonly ZYGARDE_CUBE: RegistrySupplier;
    static readonly ZYGARDE_CELL: RegistrySupplier;
    static readonly ZYGARDE_CORE: RegistrySupplier;
    static readonly LIKOS_PENDANT: RegistrySupplier;
    static readonly PINK_NECTAR: RegistrySupplier;
    static readonly PURPLE_NECTAR: RegistrySupplier;
    static readonly RED_NECTAR: RegistrySupplier;
    static readonly YELLOW_NECTAR: RegistrySupplier;
    static readonly CORNERSTONE_MASK: RegistrySupplier;
    static readonly WELLSPRING_MASK: RegistrySupplier;
    static readonly HEARTHFLAME_MASK: RegistrySupplier;
    static readonly GRISEOUS_CORE: RegistrySupplier;
    static readonly ASH_CAP: RegistrySupplier;
    static readonly ADAMANT_CRYSTAL: RegistrySupplier;
    static readonly LUSTROUS_GLOBE: RegistrySupplier;
    static readonly FLAME_PLATE: RegistrySupplier;
    static readonly SPLASH_PLATE: RegistrySupplier;
    static readonly ZAP_PLATE: RegistrySupplier;
    static readonly MEADOW_PLATE: RegistrySupplier;
    static readonly ICICLE_PLATE: RegistrySupplier;
    static readonly FIST_PLATE: RegistrySupplier;
    static readonly TOXIC_PLATE: RegistrySupplier;
    static readonly EARTH_PLATE: RegistrySupplier;
    static readonly SKY_PLATE: RegistrySupplier;
    static readonly MIND_PLATE: RegistrySupplier;
    static readonly INSECT_PLATE: RegistrySupplier;
    static readonly STONE_PLATE: RegistrySupplier;
    static readonly SPOOKY_PLATE: RegistrySupplier;
    static readonly DRACO_PLATE: RegistrySupplier;
    static readonly DREAD_PLATE: RegistrySupplier;
    static readonly IRON_PLATE: RegistrySupplier;
    static readonly PIXIE_PLATE: RegistrySupplier;
    static readonly BUG_MEMORY: RegistrySupplier;
    static readonly DARK_MEMORY: RegistrySupplier;
    static readonly DRAGON_MEMORY: RegistrySupplier;
    static readonly ELECTRIC_MEMORY: RegistrySupplier;
    static readonly FAIRY_MEMORY: RegistrySupplier;
    static readonly FIGHTING_MEMORY: RegistrySupplier;
    static readonly FIRE_MEMORY: RegistrySupplier;
    static readonly FLYING_MEMORY: RegistrySupplier;
    static readonly GHOST_MEMORY: RegistrySupplier;
    static readonly GRASS_MEMORY: RegistrySupplier;
    static readonly GROUND_MEMORY: RegistrySupplier;
    static readonly ICE_MEMORY: RegistrySupplier;
    static readonly POISON_MEMORY: RegistrySupplier;
    static readonly PSYCHIC_MEMORY: RegistrySupplier;
    static readonly ROCK_MEMORY: RegistrySupplier;
    static readonly STEEL_MEMORY: RegistrySupplier;
    static readonly WATER_MEMORY: RegistrySupplier;
    static readonly BURN_DRIVE: RegistrySupplier;
    static readonly CHILL_DRIVE: RegistrySupplier;
    static readonly DOUSE_DRIVE: RegistrySupplier;
    static readonly SHOCK_DRIVE: RegistrySupplier;
    static readonly RUSTED_SWORD: RegistrySupplier;
    static readonly RUSTED_SHIELD: RegistrySupplier;
    static readonly PRISON_BOTTLE: RegistrySupplier;
    static readonly PIKA_CASE: RegistrySupplier;
    static readonly ROTOM_CATALOGUE: RegistrySupplier;
    static readonly REVEAL_GLASS: RegistrySupplier;
    static readonly BOOSTER_ENERGY: RegistrySupplier;
    static readonly LEGEND_PLATE: RegistrySupplier;
    static readonly ADAMANT_ORB: RegistrySupplier;
    static readonly GRISEOUS_ORB: RegistrySupplier;
    static readonly LUSTROUS_ORB: RegistrySupplier;
    static readonly ADRENALINE_ORB: RegistrySupplier;
    static readonly SOUL_DEW: RegistrySupplier;
    static readonly TERA_POUCH_WHITE: RegistrySupplier;
    static readonly TERA_POUCH_ORANGE: RegistrySupplier;
    static readonly TERA_POUCH_MAGENTA: RegistrySupplier;
    static readonly TERA_POUCH_LIGHT_BLUE: RegistrySupplier;
    static readonly TERA_POUCH_YELLOW: RegistrySupplier;
    static readonly TERA_POUCH_LIME: RegistrySupplier;
    static readonly TERA_POUCH_PINK: RegistrySupplier;
    static readonly TERA_POUCH_GRAY: RegistrySupplier;
    static readonly TERA_POUCH_LIGHT_GRAY: RegistrySupplier;
    static readonly TERA_POUCH_CYAN: RegistrySupplier;
    static readonly TERA_POUCH_PURPLE: RegistrySupplier;
    static readonly TERA_POUCH_BLUE: RegistrySupplier;
    static readonly TERA_POUCH_BROWN: RegistrySupplier;
    static readonly TERA_POUCH_GREEN: RegistrySupplier;
    static readonly TERA_POUCH_RED: RegistrySupplier;
    static readonly TERA_POUCH_BLACK: RegistrySupplier;
    static register(): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown' {
  import { Logger } from 'org.slf4j';

  class MegaShowdown {
    static readonly MOD_ID: string;
    static readonly LOGGER: Logger;
    static init(): void;
  }


  class MegaShowdownClient {
    static init(): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.mixin.battle' {
  import { List } from 'java.util';
  import { MoveTile } from 'BattleMoveSelection';
  import { ActiveBattlePokemon, ShowdownMoveset, BattleSide } from 'com.cobblemon.mod.common.battles';
  import { ContextManager } from 'com.cobblemon.mod.common.battles.interpreter';
  import { Iterable } from 'java.lang';

  class BattleGimmickButtonCompanionMixin {
    get tiles(): MoveTile[];
  }


  class BattleMoveSelectionMixin {
    mousePrimaryClicked(mouseX: number, mouseY: number): boolean;
  }


  class BattleRegistryMixin {
  }


  class BattleTargetSelectionMixin {
  }


  class EndInstructionMixin {
  }


  class GimmickTileMixin {
  }


  class MoveActionResponseMixin {
    isValid(activeBattlePokemon: ActiveBattlePokemon, showdownMoveSet: ShowdownMoveset, forceSwitch: boolean): boolean;
  }


  class PokemonBattleMixin {
    get contextManager(): ContextManager;
    get sides(): Iterable<BattleSide>;
  }


  class ShowdownActionRequestMixin {
  }


  class ShowdownInterpreterMixin {
  }


  class ShowdownSpeciesMixin {
  }


  class StartInstructionMixin {
  }

}

declare module 'com.github.yajatkaul.mega_showdown.mixin.client' {
  import { ItemModelShaper, MultiBufferSource } from 'net.minecraft.client.renderer';
  import { BakedModel } from 'net.minecraft.client.resources.model';
  import { ItemStack, ItemDisplayContext } from 'net.minecraft.world.item';
  import { Context } from 'EntityRendererProvider';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { PokemonEntity } from 'com.cobblemon.mod.common.entity.pokemon';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';

  class ItemRendererMixin {
    get itemModelShaper(): ItemModelShaper;
    getHeldItemModelMixin(bakedModel: BakedModel, stack: ItemStack): BakedModel;
    modifyModel(bakedModel: BakedModel, stack: ItemStack, renderMode: ItemDisplayContext): BakedModel;
  }


  class LivingEntityRendererMixin<T extends LivingEntity = any, M extends EntityModel<T> = any> {
  }


  class ModeBakeryMixin {
  }


  class PokemonRendererMixin {
    init(context: Context, ci: CallbackInfo): void;
    render(entity: PokemonEntity, entityYaw: number, partialTicks: number, poseStack: PoseStack, buffer: MultiBufferSource, packedLight: number, ci: CallbackInfo): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.mixin.client.ui' {
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ElementalType } from 'com.cobblemon.mod.common.api.types';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';

  class PCGUIMixin {
  }


  class SummaryCompanionMixin {
  }


  class SummaryMixin {
  }


  class TypeIconMixin {
    render(context: GuiGraphics): void;
  }


  class TypeWidgetMixin {
    renderType(type: ElementalType, poseStack: PoseStack, pX: number, pY: number): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.mixin' {
  import { Map, HashMap } from 'java.util';
  import { MoveTemplate } from 'com.cobblemon.mod.common.api.moves';
  import { Integer } from 'java.lang';
  import { PokemonEntity } from 'com.cobblemon.mod.common.entity.pokemon';
  import { EntityDataAccessor } from 'net.minecraft.network.syncher';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { PokemonEntityDuck } from 'com.github.yajatkaul.mega_showdown.utils.duck.cobblemon.interfaces';
  import { TeraCrystalState } from 'com.github.yajatkaul.mega_showdown.render.layerEntities.states';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { TeraType } from 'com.cobblemon.mod.common.api.types.tera';

  class GraalShowdownUnbundlerMixin {
  }


  class MovesAccessor {
    static getAllMoves(): Map<string, MoveTemplate>;
    static getIdMapping(): Map<number, MoveTemplate>;
  }


  class MoveSlotWidgetMixin {
  }


  class PlayerPartyStoreMixin {
  }


  class PokemonClientDelegateMixin {
    currentEntity: PokemonEntity;
    inject(data: EntityDataAccessor<any>, ci: CallbackInfo): void;
  }


  interface PokemonEntityMixin extends PokemonEntityDuck {}
  class PokemonEntityMixin extends PokemonEntityDuck {
    mega_showdown$getAnimCrystalSeconds(): number;
    mega_showdown$getLastCrystalTimeNs(): number;
    mega_showdown$getTeraCrystalState(): TeraCrystalState;
    mega_showdown$isTeraCrystalPass(): boolean;
    mega_showdown$isTeraCrystalPlayed(): boolean;
    mega_showdown$setAnimCrystalSeconds(value: number): void;
    mega_showdown$setLastCrystalTimeNs(value: number): void;
    mega_showdown$setTeraCrystalPass(value: boolean): void;
    mega_showdown$setTeraCrystalPlayed(value: boolean): void;
  }


  class PokemonSpeciesMixin {
  }


  class TeraTypesAccessor {
    static getTypes(): HashMap<ResourceLocation, TeraType>;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.mixin.minecraft' {
  class ItemInHandRendererMixin {
  }


  class ItemStackMixin {
  }

}

declare module 'com.github.yajatkaul.mega_showdown.mixin.packet' {
  class MovePartyPokemonToPCHandlerMixin {
  }

}

declare module 'com.github.yajatkaul.mega_showdown.neoforge.datagen' {
  import { GatherDataEvent } from 'net.neoforged.neoforge.data.event';
  import { BlockLootSubProvider } from 'net.minecraft.data.loot';
  import { BlockStateProvider, ItemModelProvider } from 'net.neoforged.neoforge.client.model.generators';
  import { PackOutput } from 'net.minecraft.data';
  import { ExistingFileHelper, BlockTagsProvider, DatapackBuiltinEntriesProvider } from 'net.neoforged.neoforge.common.data';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';
  import { RegistrySetBuilder } from 'net.minecraft.core';
  import { ItemTagsProvider } from 'net.minecraft.data.tags';
  import { TagLookup } from 'TagsProvider';
  import { Block } from 'net.minecraft.world.level.block';
  import { RecipeProvider } from 'net.minecraft.data.recipes';

  class DataGenerators {
    static gatherData(event: GatherDataEvent): void;
  }


  interface ModBlockLootTableProvider extends BlockLootSubProvider {}
  class ModBlockLootTableProvider extends BlockLootSubProvider {
  }


  interface ModBlockStateProvider extends BlockStateProvider {}
  class ModBlockStateProvider extends BlockStateProvider {
    constructor(output: PackOutput, existingFileHelper: ExistingFileHelper);
  }


  interface ModBlockTagProvider extends BlockTagsProvider {}
  class ModBlockTagProvider extends BlockTagsProvider {
    constructor(output: PackOutput, lookupProvider: CompletableFuture<Provider>, existingFileHelper: ExistingFileHelper);
  }


  interface ModDatapackProvider extends DatapackBuiltinEntriesProvider {}
  class ModDatapackProvider extends DatapackBuiltinEntriesProvider {
    static readonly BUILDER: RegistrySetBuilder;
    constructor(output: PackOutput, registries: CompletableFuture<Provider>);
  }


  interface ModItemModelProvider extends ItemModelProvider {}
  class ModItemModelProvider extends ItemModelProvider {
    constructor(output: PackOutput, existingFileHelper: ExistingFileHelper);
  }


  interface ModItemTagProvider extends ItemTagsProvider {}
  class ModItemTagProvider extends ItemTagsProvider {
    constructor(output: PackOutput, lookupProvider: CompletableFuture<Provider>, blockTags: CompletableFuture<TagLookup<Block>>, existingFileHelper: ExistingFileHelper);
  }


  interface ModRecipeProvider extends RecipeProvider {}
  class ModRecipeProvider extends RecipeProvider {
    constructor(arg: PackOutput, completableFuture: CompletableFuture<Provider>);
  }

}

declare module 'com.github.yajatkaul.mega_showdown.neoforge.datagen.worldgen' {
  import { ResourceKey } from 'net.minecraft.resources';
  import { BootstrapContext } from 'net.minecraft.data.worldgen';
  import { BiomeModifier } from 'net.neoforged.neoforge.common.world';
  import { ConfiguredFeature } from 'net.minecraft.world.level.levelgen.feature';
  import { List } from 'java.util';
  import { PlacementModifier, PlacedFeature } from 'net.minecraft.world.level.levelgen.placement';

  class ModBiomeModifiers {
    static readonly ADD_MAX_MUSHROOM: ResourceKey;
    static bootstrap(context: BootstrapContext<BiomeModifier>): void;
  }


  class ModConfiguredFeatures {
    static readonly MAX_MUSHROOM_KEY: ResourceKey;
    static bootstrap(context: BootstrapContext<ConfiguredFeature<any, any>>): void;
    static registerKey(name: string): ResourceKey<ConfiguredFeature<any, any>>;
  }


  class ModOrePlacement {
    static commonOrePlacement(pCount: number, pHeightRange: PlacementModifier): PlacementModifier[];
    static orePlacement(pCountPlacement: PlacementModifier, pHeightRange: PlacementModifier): PlacementModifier[];
    static rareOrePlacement(pChance: number, pHeightRange: PlacementModifier): PlacementModifier[];
  }


  class ModPlacedFeatures {
    static readonly MAX_MUSHROOM_PLACED_KEY: ResourceKey;
    static bootstrap(context: BootstrapContext<PlacedFeature>): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.neoforge.datapack' {
  import { JsonDataRegistry } from 'com.cobblemon.mod.common.api.data';
  import { CustomTypeData } from 'com.github.yajatkaul.mega_showdown.neoforge.datapack.CustomTypeRegistryNeo';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { PackType } from 'net.minecraft.server.packs';
  import { Gson } from 'com.google.gson';
  import { TypeToken } from 'com.google.gson.reflect';
  import { SimpleObservable } from 'com.cobblemon.mod.common.api.reactive';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Map } from 'java.util';
  import { NewRegistry } from 'DataPackRegistryEvent';

  interface CustomTypeRegistryNeo extends JsonDataRegistry<CustomTypeData> {}
  class CustomTypeRegistryNeo extends JsonDataRegistry<CustomTypeData> {
    static readonly INSTANCE: CustomTypeRegistryNeo;
    get gson(): Gson;
    get id(): ResourceLocation;
    get observable(): SimpleObservable<CustomTypeRegistryNeo>;
    get resourcePath(): string;
    get type(): PackType;
    get typeToken(): TypeToken<CustomTypeData>;
    reload(data: Map<ResourceLocation, CustomTypeData>): void;
    sync(player: ServerPlayer): void;
  }


  class DatapackRegistry {
    static register(event: NewRegistry): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.neoforge.datapack.CustomTypeRegistryNeo' {
  class CustomTypeData {
    name: string;
    id: string;
    hue: number;
    lang: string;
    zTypeMove: string;
    maxTypeMove: string;
    constructor(name: string, id: string, hue: number, text: string, zTypeMove: string, maxTypeMove: string);
  }

}

declare module 'com.github.yajatkaul.mega_showdown.neoforge.datapack.showdown' {
  import { DataRegistry } from 'com.cobblemon.mod.common.api.data';
  import { Map } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { PackType } from 'net.minecraft.server.packs';
  import { SimpleObservable } from 'com.cobblemon.mod.common.api.reactive';
  import { ResourceManager } from 'net.minecraft.server.packs.resources';
  import { ServerPlayer } from 'net.minecraft.server.level';

  interface Abilities extends DataRegistry {}
  class Abilities extends DataRegistry {
    static readonly INSTANCE: Abilities;
    get abilityScripts(): Map<string, string>;
    get id(): ResourceLocation;
    get observable(): SimpleObservable<DataRegistry>;
    get type(): PackType;
    registerAbilities(ability: Abilities): void;
    reload(resourceManager: ResourceManager): void;
    sync(serverPlayer: ServerPlayer): void;
  }


  interface Conditions extends DataRegistry {}
  class Conditions extends DataRegistry {
    static readonly INSTANCE: Conditions;
    get conditionScripts(): Map<string, string>;
    get id(): ResourceLocation;
    get observable(): SimpleObservable<DataRegistry>;
    get type(): PackType;
    reload(resourceManager: ResourceManager): void;
    sync(serverPlayer: ServerPlayer): void;
  }


  interface HeldItems extends DataRegistry {}
  class HeldItems extends DataRegistry {
    static readonly INSTANCE: HeldItems;
    get heldItemsScripts(): Map<string, string>;
    get id(): ResourceLocation;
    get observable(): SimpleObservable<DataRegistry>;
    get type(): PackType;
    heldItemsLoad(heldItem: HeldItems): void;
    reload(resourceManager: ResourceManager): void;
    sync(serverPlayer: ServerPlayer): void;
  }


  interface Moves extends DataRegistry {}
  class Moves extends DataRegistry {
    static readonly INSTANCE: Moves;
    get id(): ResourceLocation;
    get moveScripts(): Map<string, string>;
    get observable(): SimpleObservable<DataRegistry>;
    get type(): PackType;
    movesLoad(move: Moves): void;
    reload(resourceManager: ResourceManager): void;
    sync(serverPlayer: ServerPlayer): void;
  }


  interface Scripts extends DataRegistry {}
  class Scripts extends DataRegistry {
    static readonly INSTANCE: Scripts;
    get id(): ResourceLocation;
    get observable(): SimpleObservable<DataRegistry>;
    get scripts(): Map<string, string>;
    get type(): PackType;
    reload(resourceManager: ResourceManager): void;
    scriptsLoad(scripts: Scripts): void;
    sync(serverPlayer: ServerPlayer): void;
  }


  interface TypeCharts extends DataRegistry {}
  class TypeCharts extends DataRegistry {
    static readonly INSTANCE: TypeCharts;
    get id(): ResourceLocation;
    get observable(): SimpleObservable<DataRegistry>;
    get type(): PackType;
    get typeChartScripts(): Map<string, string>;
    reload(resourceManager: ResourceManager): void;
    sync(serverPlayer: ServerPlayer): void;
    typeChartsLoad(typeChart: TypeCharts): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.neoforge' {
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ServerStartedEvent } from 'net.neoforged.neoforge.event.server';
  import { FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';
  import { RegisterMenuScreensEvent, RegisterShadersEvent } from 'net.neoforged.neoforge.client.event';
  import { RegisterRenderers } from 'EntityRenderersEvent';
  import { AddPackFindersEvent } from 'net.neoforged.neoforge.event';

  class MegaShowdownNeoForge {
    constructor(modEventBus: IEventBus);
    onServerStarting(event: ServerStartedEvent): void;
  }


  class MegaShowdownNeoForgeClient {
    static onAddPackFinders(event: AddPackFindersEvent): void;
    static onClientSetup(event: FMLClientSetupEvent): void;
    static registerBER(event: RegisterRenderers): void;
    static registerScreens(event: RegisterMenuScreensEvent): void;
    static shaderRegistry(event: RegisterShadersEvent): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.neoforge.mixin' {
  import { PokemonEntity } from 'com.cobblemon.mod.common.entity.pokemon';

  class CobblemonDataProviderMixin {
  }


  class PokemonClientDelegateMixin {
    currentEntity: PokemonEntity;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.neoforge.shader' {
  import { Factory } from 'com.github.yajatkaul.mega_showdown.render.ShaderRegister';
  import { Consumer } from 'java.util.function';
  import { ShaderRegister } from 'com.github.yajatkaul.mega_showdown.render';
  import { ShaderInstance } from 'net.minecraft.client.renderer';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { VertexFormat } from 'com.mojang.blaze3d.vertex';

  interface ShaderRegisterFactory extends Factory {}
  class ShaderRegisterFactory extends Factory {
    create(location: ResourceLocation, format: VertexFormat, irisIgnore: boolean): ShaderInstance;
    register(modid: string, consumer: Consumer<ShaderRegister>): void;
    register(shaderInstance: ShaderInstance, loadCallback: Consumer<ShaderInstance>): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.neoforge.utils' {
  import { MoLangRuntime } from 'com.bedrockk.molang.runtime';

  class KotlinHelperNeo {
    static readonly INSTANCE: KotlinHelperNeo;
    playParticleEffect(particleId: string, locator: string, runtime: MoLangRuntime): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.networking.client.handler' {
  import { ConfigSyncPacket, InteractionWheelPacket } from 'com.github.yajatkaul.mega_showdown.networking.client.packet';
  import { PacketContext } from 'NetworkManager';

  class ConfigSyncHandler {
    static handle(packet: ConfigSyncPacket, context: PacketContext): void;
  }


  class InteractionWheelHandler {
    static handle(packet: InteractionWheelPacket, context: PacketContext): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.networking.client' {
  class MegaShowdownNetworkHandlerClient {
    static register(): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.networking.server.handler' {
  import { MegaEvoPacket, SecretSwordMoveSwapPacket, UltraBurstPacket } from 'com.github.yajatkaul.mega_showdown.networking.server.packet';
  import { PacketContext } from 'NetworkManager';

  class MegaEvoHandler {
    static handle(packet: MegaEvoPacket, context: PacketContext): void;
  }


  class SecretSwordMoveSwapHandler {
    static handle(packet: SecretSwordMoveSwapPacket, context: PacketContext): void;
  }


  class UltraBurstHandler {
    static handle(packet: UltraBurstPacket, context: PacketContext): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.networking.server' {
  class MegaShowdownNetworkHandlerServer {
    static register(): void;
    static registerCommon(): void;
    static registerServerOnly(): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.render.accessories' {
  import { AccessoryRenderer } from 'io.wispforest.accessories.api.client';
  import { ItemStack } from 'net.minecraft.world.item';
  import { SlotReference } from 'io.wispforest.accessories.api.slot';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { EntityModel } from 'net.minecraft.client.model';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { LivingEntity } from 'net.minecraft.world.entity';

  class AccessoriesRegisterRenderer {
    static register(): void;
  }


  interface BeltRenderer extends AccessoryRenderer {}
  class BeltRenderer extends AccessoryRenderer {
    render<M extends LivingEntity>(stack: ItemStack, reference: SlotReference, poseStack: PoseStack, model: EntityModel<M>, multiBufferSource: MultiBufferSource, light: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface ChestRenderer extends AccessoryRenderer {}
  class ChestRenderer extends AccessoryRenderer {
    render<M extends LivingEntity>(stack: ItemStack, reference: SlotReference, poseStack: PoseStack, model: EntityModel<M>, multiBufferSource: MultiBufferSource, light: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface HandRenderer extends AccessoryRenderer {}
  class HandRenderer extends AccessoryRenderer {
    render<M extends LivingEntity>(stack: ItemStack, reference: SlotReference, poseStack: PoseStack, model: EntityModel<M>, multiBufferSource: MultiBufferSource, light: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface HeadRenderer extends AccessoryRenderer {}
  class HeadRenderer extends AccessoryRenderer {
    render<M extends LivingEntity>(stack: ItemStack, reference: SlotReference, poseStack: PoseStack, model: EntityModel<M>, multiBufferSource: MultiBufferSource, light: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface HighOffHandRenderer extends AccessoryRenderer {}
  class HighOffHandRenderer extends AccessoryRenderer {
    render<M extends LivingEntity>(stack: ItemStack, reference: SlotReference, poseStack: PoseStack, model: EntityModel<M>, multiBufferSource: MultiBufferSource, light: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface LowOffHandRenderer extends AccessoryRenderer {}
  class LowOffHandRenderer extends AccessoryRenderer {
    render<M extends LivingEntity>(stack: ItemStack, reference: SlotReference, poseStack: PoseStack, model: EntityModel<M>, multiBufferSource: MultiBufferSource, light: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.render' {
  import { ResourceManagerReloadListener, ResourceManager } from 'net.minecraft.server.packs.resources';
  import { HashMap } from 'java.util';
  import { CompletableFuture, Executor } from 'java.util.concurrent';
  import { Void, Class } from 'java.lang';
  import { PreparationBarrier } from 'PreparableReloadListener';
  import { ProfilerFiller } from 'net.minecraft.util.profiling';
  import { Settings } from 'com.github.yajatkaul.mega_showdown.api.codec.sizer.LayerCodec';
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';
  import { Event } from 'dev.architectury.event';
  import { Factory } from 'com.github.yajatkaul.mega_showdown.render.ShaderRegister';
  import { ShaderInstance } from 'net.minecraft.client.renderer';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { VertexFormat } from 'com.mojang.blaze3d.vertex';
  import { Consumer } from 'java.util.function';

  interface ItemRenderingLoader extends ResourceManagerReloadListener {}
  class ItemRenderingLoader extends ResourceManagerReloadListener {
    static readonly REGISTRY: HashMap;
    get name(): string;
    static load(): void;
    onResourceManagerReload(resourceManager: ResourceManager): void;
    reload(preparationBarrier: PreparationBarrier, resourceManager: ResourceManager, profilerFiller: ProfilerFiller, profilerFiller2: ProfilerFiller, executor: Executor, executor2: Executor): CompletableFuture<Void>;
  }


  interface LayerDataLoader extends ResourceManagerReloadListener {}
  class LayerDataLoader extends ResourceManagerReloadListener {
    static readonly LAYER_REGISTRY: HashMap;
    get name(): string;
    static getSettings(pokemon: Pokemon, aspect: string): Settings;
    static load(): void;
    onResourceManagerReload(resourceManager: ResourceManager): void;
    reload(preparationBarrier: PreparationBarrier, resourceManager: ResourceManager, profilerFiller: ProfilerFiller, profilerFiller2: ProfilerFiller, executor: Executor, executor2: Executor): CompletableFuture<Void>;
  }


  class LoaderInitializer {
    static getImplInstance<T>(abstractClss: Class<T>, ...impls: string[]): T;
  }


  class RegisterShaderEvent {
    static readonly EVENT: Event;
    registerShaders(var1: ShaderRegister): void;
  }


  class ShaderRegister {
    static readonly INSTANCE: Factory;
    create(location: ResourceLocation, format: VertexFormat): ShaderInstance;
    create(var1: ResourceLocation, var2: VertexFormat, var3: boolean): ShaderInstance;
    register(location: ResourceLocation, format: VertexFormat, loadCallback: Consumer<ShaderInstance>): void;
    register(var1: ShaderInstance, var2: Consumer<ShaderInstance>): void;
  }


  interface TeraMapLoader extends ResourceManagerReloadListener {}
  class TeraMapLoader extends ResourceManagerReloadListener {
    static readonly REGISTRY: HashMap;
    get name(): string;
    static getColorShaderMap(color: string): ShaderInstance;
    static load(): void;
    onResourceManagerReload(resourceManager: ResourceManager): void;
    reload(preparationBarrier: PreparationBarrier, resourceManager: ResourceManager, profilerFiller: ProfilerFiller, profilerFiller2: ProfilerFiller, executor: Executor, executor2: Executor): CompletableFuture<Void>;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.render.LayerDataLoader' {
  import { Settings } from 'com.github.yajatkaul.mega_showdown.api.codec.sizer.LayerCodec';

  class SizerRegStruct {
    addForm(formName: string, aspect: string, settings: Settings): void;
    getSettings(formName: string, aspect: string): Settings;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.render.layerEntities' {
  import { RenderContext } from 'com.cobblemon.mod.common.client.render.models.blockbench.repository';
  import { PokemonClientDelegate } from 'com.cobblemon.mod.common.client.entity';
  import { PokemonEntity } from 'com.cobblemon.mod.common.entity.pokemon';
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { PosableState } from 'com.cobblemon.mod.common.client.render.models.blockbench';

  interface DynamaxCloudsLayer extends LayerEntity {}
  class DynamaxCloudsLayer extends LayerEntity {
    constructor();
    render(context: RenderContext, clientDelegate: PokemonClientDelegate, entity: PokemonEntity, pokemon: Pokemon, entityYaw: number, poseStack: PoseStack, buffer: MultiBufferSource, packedLight: number): void;
    render(aspect: string, context: RenderContext, clientDelegate: PokemonClientDelegate, entity: PokemonEntity, pokemon: Pokemon, entityYaw: number, partialTicks: number, poseStack: PoseStack, buffer: MultiBufferSource, packedLight: number): void;
  }


  class LayerEntity {
    readonly state: PosableState;
    ticks: number;
    constructor(state: PosableState);
    render(context: RenderContext, clientDelegate: PokemonClientDelegate, entity: PokemonEntity, pokemon: Pokemon, entityYaw: number, poseStack: PoseStack, buffer: MultiBufferSource, packedLight: number): void;
    render(aspect: string, context: RenderContext, clientDelegate: PokemonClientDelegate, entity: PokemonEntity, pokemon: Pokemon, entityYaw: number, partialTicks: number, poseStack: PoseStack, buffer: MultiBufferSource, packedLight: number): void;
  }


  interface TeraHatsLayer extends LayerEntity {}
  class TeraHatsLayer extends LayerEntity {
    constructor();
    render(aspect: string, context: RenderContext, clientDelegate: PokemonClientDelegate, entity: PokemonEntity, pokemon: Pokemon, entityYaw: number, partialTicks: number, poseStack: PoseStack, buffer: MultiBufferSource, packedLight: number): void;
    render(context: RenderContext, clientDelegate: PokemonClientDelegate, entity: PokemonEntity, pokemon: Pokemon, entityYaw: number, poseStack: PoseStack, buffer: MultiBufferSource, packedLight: number): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.render.layerEntities.states' {
  import { PosableState } from 'com.cobblemon.mod.common.client.render.models.blockbench';
  import { Entity } from 'net.minecraft.world.entity';
  import { SchedulingTracker } from 'com.cobblemon.mod.common.api.scheduling';

  interface DmaxHatState extends PosableState {}
  class DmaxHatState extends PosableState {
    constructor();
    get entity(): Entity;
    get schedulingTracker(): SchedulingTracker;
    updatePartialTicks(partialTicks: number): void;
  }


  interface TeraCrystalState extends PosableState {}
  class TeraCrystalState extends PosableState {
    constructor();
    get entity(): Entity;
    get schedulingTracker(): SchedulingTracker;
    resetAnimation(): void;
    updatePartialTicks(partialTicks: number): void;
  }


  interface TeraHatState extends PosableState {}
  class TeraHatState extends PosableState {
    constructor();
    get entity(): Entity;
    get schedulingTracker(): SchedulingTracker;
    updatePartialTicks(partialTicks: number): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.render.renderTypes' {
  import { ShaderInstance, RenderType } from 'net.minecraft.client.renderer';
  import { ResourceProvider } from 'net.minecraft.server.packs.resources';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { VertexFormat } from 'com.mojang.blaze3d.vertex';

  interface IrisIgnoreShader extends ShaderInstance {}
  class IrisIgnoreShader extends ShaderInstance {
    constructor(provider: ResourceProvider, location: ResourceLocation, format: VertexFormat);
    iris$shouldSkipThis(): boolean;
  }


  class MSDRenderTypes {
    static teraFire: ShaderInstance;
    static teraWater: ShaderInstance;
    static teraGrass: ShaderInstance;
    static teraElectric: ShaderInstance;
    static teraIce: ShaderInstance;
    static teraFighting: ShaderInstance;
    static teraPoison: ShaderInstance;
    static teraGround: ShaderInstance;
    static teraFlying: ShaderInstance;
    static teraPsychic: ShaderInstance;
    static teraBug: ShaderInstance;
    static teraRock: ShaderInstance;
    static teraGhost: ShaderInstance;
    static teraDragon: ShaderInstance;
    static teraDark: ShaderInstance;
    static teraSteel: ShaderInstance;
    static teraFairy: ShaderInstance;
    static teraNormal: ShaderInstance;
    static teraStellar: ShaderInstance;
    static pokemonShader(texture: ResourceLocation, tera_aspect: string): RenderType;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.render.ShaderRegister' {
  import { Consumer } from 'java.util.function';
  import { ShaderRegister } from 'com.github.yajatkaul.mega_showdown.render';

  class Factory {
    register(var1: string, var2: Consumer<ShaderRegister>): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.screen.custom.handler' {
  import { AbstractContainerMenu, ClickType } from 'net.minecraft.world.inventory';
  import { Inventory, Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Level } from 'net.minecraft.world.level';

  interface TeraPouchScreenHandler extends AbstractContainerMenu {}
  class TeraPouchScreenHandler extends AbstractContainerMenu {
    constructor(id: number, inv: Inventory);

    constructor(id: number, inv: Inventory, pouch: ItemStack, level: Level);
    clicked(slotId: number, dragType: number, clickType: ClickType, player: Player): void;
    quickMoveStack(playerIn: Player, invSlot: number): ItemStack;
    removed(player: Player): void;
    stillValid(player: Player): boolean;
  }


  interface ZygardeCubesScreenHandler extends AbstractContainerMenu {}
  class ZygardeCubesScreenHandler extends AbstractContainerMenu {
    constructor(id: number, inv: Inventory);

    constructor(id: number, inv: Inventory, cube: ItemStack, level: Level);
    clicked(slotId: number, dragType: number, clickType: ClickType, player: Player): void;
    quickMoveStack(playerIn: Player, invSlot: number): ItemStack;
    removed(player: Player): void;
    stillValid(player: Player): boolean;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.screen.custom.screen' {
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { TeraPouchScreenHandler, ZygardeCubesScreenHandler } from 'com.github.yajatkaul.mega_showdown.screen.custom.handler';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface TeraPouchScreen extends AbstractContainerScreen<TeraPouchScreenHandler> {}
  class TeraPouchScreen extends AbstractContainerScreen<TeraPouchScreenHandler> {
    constructor(menu: TeraPouchScreenHandler, playerInventory: Inventory, title: Component);
    render(pGuiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
  }


  interface ZygardeCubeScreen extends AbstractContainerScreen<ZygardeCubesScreenHandler> {}
  class ZygardeCubeScreen extends AbstractContainerScreen<ZygardeCubesScreenHandler> {
    constructor(menu: ZygardeCubesScreenHandler, playerInventory: Inventory, title: Component);
    render(pGuiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.screen.custom.slot' {
  import { Slot } from 'net.minecraft.world.inventory';
  import { Container } from 'net.minecraft.world';
  import { ItemStack } from 'net.minecraft.world.item';

  interface TeraShardSlots extends Slot {}
  class TeraShardSlots extends Slot {
    constructor(inventory: Container, index: number, x: number, y: number);
    mayPlace(stack: ItemStack): boolean;
  }


  interface ZygardeSlots extends Slot {}
  class ZygardeSlots extends Slot {
    constructor(inventory: Container, index: number, x: number, y: number);
    get maxStackSize(): number;
    mayPlace(stack: ItemStack): boolean;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.screen' {
  import { DeferredRegister, RegistrySupplier } from 'dev.architectury.registry.registries';

  class MegaShowdownMenuTypes {
    static readonly MENUS: DeferredRegister;
    static readonly ZYGARDE_CUBE_MENU: RegistrySupplier;
    static readonly TERA_POUCH_MENU: RegistrySupplier;
    static register(): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.sound' {
  import { DeferredRegister, RegistrySupplier } from 'dev.architectury.registry.registries';

  class MegaShowdownSounds {
    static readonly SOUND_EVENTS: DeferredRegister;
    static readonly DYNAMAX: RegistrySupplier;
    static readonly TERASTALLIZATION: RegistrySupplier;
    static readonly MEGA: RegistrySupplier;
    static readonly Z_MOVE: RegistrySupplier;
    static readonly FORM_CHANGE_BASIC: RegistrySupplier;
    static readonly POWER_CONSTRUCT: RegistrySupplier;
    static readonly ORIGIN_FORM: RegistrySupplier;
    static readonly ARCEUS_MULTITYPE: RegistrySupplier;
    static readonly KYUREM_FUSION: RegistrySupplier;
    static readonly GIRATINIA_FORM: RegistrySupplier;
    static readonly TERAPAGOS_SPAWN: RegistrySupplier;
    static register(): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.tag' {
  class MegaShowdownTags {
  }

}

declare module 'com.github.yajatkaul.mega_showdown.tag.MegaShowdownTags' {
  import { TagKey } from 'net.minecraft.tags';

  class Biomes {
    static readonly sandyKey: TagKey;
    static readonly trashKey: TagKey;
    static readonly forestKey: TagKey;
  }


  class Items {
    static readonly MEGA_BRACELET: TagKey;
    static readonly MEGA_STONE: TagKey;
    static readonly Z_CRYSTAL: TagKey;
    static readonly Z_RING: TagKey;
    static readonly TERA_ORB: TagKey;
    static readonly TERA_SHARD: TagKey;
    static readonly DYNAMAX_BAND: TagKey;
    static readonly OMNI_RING: TagKey;
    static readonly ROTOM_APPLIANCES: TagKey;
  }


  class Blocks {
    static readonly POWER_SPOT: TagKey;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.utils' {
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { TagKey } from 'net.minecraft.tags';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { Set, List, Optional, UUID } from 'java.util';
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';
  import { Effect, ZCrystal } from 'com.github.yajatkaul.mega_showdown.api.codec';
  import { EffectPair } from 'com.github.yajatkaul.mega_showdown.utils.AspectUtils';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { PlayerPartyStore } from 'com.cobblemon.mod.common.api.storage.party';
  import { BattlePokemon } from 'com.cobblemon.mod.common.battles.pokemon';
  import { PokemonEntity } from 'com.cobblemon.mod.common.entity.pokemon';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Number, Class } from 'java.lang';
  import { MinecraftParticle, SoundCodec } from 'com.github.yajatkaul.mega_showdown.api.codec.particles';
  import { EntityHitResult, BlockHitResult } from 'net.minecraft.world.phys';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Block } from 'net.minecraft.world.level.block';
  import { Companion } from 'com.github.yajatkaul.mega_showdown.utils.PokemonBehaviourHelper';
  import { ElementalType } from 'com.cobblemon.mod.common.api.types';

  class AccessoriesUtils {
    static checkTagInAccessories(player: LivingEntity, tag: TagKey<Item>): boolean;
    static findFirstItemWithTag(player: LivingEntity, tag: TagKey<Item>): ItemStack;
  }


  class AspectUtils {
    static readonly battleDisconnecter: Set;
    static appendRevertDataPokemon(effect: Effect, aspects: string[], properties: Optional<string>, pokemon: Pokemon, tagName: string): void;
    static applyAspects(pokemon: Pokemon, aspects: string[]): void;
    static applyProperties(pokemon: Pokemon, propertyString: Optional<string>): void;
    static getRevertDataPokemon(pokemon: Pokemon, tagName: string): EffectPair[];
    static revertPokemonsIfRequired(playerPartyStore: PlayerPartyStore): void;
    static revertPokemonsIfRequired(pokemon: Pokemon, battleStart: boolean): void;
    static revertPokemonsIfRequiredBattleEnd(player: ServerPlayer): void;
    static revertPokemonsIfRequiredBattleStart(playerPartyStore: PlayerPartyStore): void;
    static updatePackets(battlePokemon: BattlePokemon): void;
  }


  class GlowHandler {
    static applyDynamaxGlow(pokemonEntity: PokemonEntity): void;
    static applyTeraGlow(pokemon: PokemonEntity, aspect: string): void;
    static applyZGlow(pokemon: PokemonEntity, zCrystal: ZCrystal): void;
    static getTeraColor(teraId: string): number[];
  }


  class KotlinHelper {
    static readonly INSTANCE: KotlinHelper;
    gimmikInfo(matrices: PoseStack, texture: ResourceLocation, x: Number, y: Number, width: Number, height: Number, scale: number): void;
  }


  class LoadShowdown {
    load(): void;
  }


  class ParticlesList {
    static calyrexDynamaxLevelUpParticles: MinecraftParticle;
    static otherDynamaxLevelUpParticles: MinecraftParticle;
    static glowParticles: MinecraftParticle;
    static simpleMinecraftParticlesApply(id_apply: string, sound_apply: SoundCodec, scale: number): MinecraftParticle;
  }


  class PlayerUtils {
    static getBlockLookingAt(player: Player, distance: number): BlockHitResult;
    static getEntityLookingAt(player: Player, distance: number): EntityHitResult;
    static getPCPokemonFromUUID(player: ServerPlayer, uuid: UUID): Pokemon;
    static getPartyPokemonFromUUID(player: ServerPlayer, uuid: UUID): Pokemon;
    static hasPokemon(player: ServerPlayer, pokemon: string): boolean;
    static isBlockNearby(player: ServerPlayer, blockTag: TagKey<Block>, radius: number): boolean;
  }


  class PokemonBehaviourHelper {
    static readonly Companion: Companion;
  }


  class RegistryLocator {
    static readonly DU_FUSION: string;
    static readonly SOLO_FUSION: string;
    static readonly FORM_CHANGE_TOGGLE_INTERACT: string;
    static readonly FORM_CHANGE_INTERACT: string;
    static readonly HELD_FORM_CHANGE: string;
    static readonly MEGA: string;
    static readonly SHOWDOWN_ITEM: string;
    static readonly Z_CRYSTAL_ITEM: string;
    static getComponent<T>(type: Class<T>, stack: ItemStack): T;
  }


  class ShowdownItemsLoad {
    static load(): void;
  }


  class TeraHelper {
    static getTeraAnimationFromAspect(aspect: string): string;
    static getTeraShardForType(type: ElementalType): Item;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.utils.datapack' {
  import { AbilityTemplate } from 'com.cobblemon.mod.common.api.abilities';
  import { MoveTemplate } from 'com.cobblemon.mod.common.api.moves';
  import { JsonObject } from 'com.google.gson';

  class NewAbility {
    static readonly INSTANCE: NewAbility;
    getAbility(name: string): AbilityTemplate;
  }


  class NewMove {
    static readonly INSTANCE: NewMove;
    createMoveTemplate(moveData: JsonObject, id: string): MoveTemplate;
    register(move: MoveTemplate): void;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.utils.duck.cobblemon.interfaces' {
  import { Gimmick } from 'ShowdownMoveset';
  import { TeraCrystalState } from 'com.github.yajatkaul.mega_showdown.render.layerEntities.states';

  class ClientBattleDuck {
    mega_showdown$pendingGimmick(var1: Gimmick): boolean;
  }


  class PokemonEntityDuck {
    mega_showdown$getAnimCrystalSeconds(): number;
    mega_showdown$getLastCrystalTimeNs(): number;
    mega_showdown$getTeraCrystalState(): TeraCrystalState;
    mega_showdown$isTeraCrystalPass(): boolean;
    mega_showdown$isTeraCrystalPlayed(): boolean;
    mega_showdown$setAnimCrystalSeconds(var1: number): void;
    mega_showdown$setLastCrystalTimeNs(var1: number): void;
    mega_showdown$setTeraCrystalPass(var1: boolean): void;
    mega_showdown$setTeraCrystalPlayed(var1: boolean): void;
  }


  class SelectableDuck {
    mega_showdown$isSelectable(): boolean;
  }

}

declare module 'com.github.yajatkaul.mega_showdown.utils.PokemonBehaviourHelper' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Entity } from 'net.minecraft.world.entity';
  import { Set, List } from 'java.util';
  import { PokemonEntity } from 'com.cobblemon.mod.common.entity.pokemon';
  import { ResourceLocation } from 'net.minecraft.resources';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    playAnimation(pokemon: Entity, animations: Set<string>, expressions: string[]): void;
    static playAnimation$default(companion: Companion, entity: Entity, set: Set, list: List, n: number, object: any): void;
    snowStormPartileSpawner(entity: PokemonEntity, particleId: ResourceLocation, source: string[], targetEntity: PokemonEntity, target: string[]): void;
  }

}