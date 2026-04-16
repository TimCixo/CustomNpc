declare module 'com.axedgaming.endersdelight.blocks.custom' {
  import { Properties } from 'BlockBehaviour';
  import { IntegerProperty, BooleanProperty } from 'net.minecraft.world.level.block.state.properties';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { BlockGetter, Level } from 'net.minecraft.world.level';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { ItemStack } from 'net.minecraft.world.item';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface AmberveilMushroom extends CustomBushBlock {}
  class AmberveilMushroom extends CustomBushBlock {
    constructor(properties: Properties);
  }


  interface ChorusFlameBlock extends CustomBushBlock {}
  class ChorusFlameBlock extends CustomBushBlock {
    static readonly MAX_AGE: number;
    static readonly AGE: IntegerProperty;
    constructor(properties: Properties);
    getShape(state: BlockState, world: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    isRandomlyTicking(pState: BlockState): boolean;
    randomTick(pState: BlockState, pLevel: ServerLevel, pPos: BlockPos, pRandom: RandomSource): void;
  }


  interface CustomBushBlock extends Block {}
  class CustomBushBlock extends Block {
    constructor(p_49795_: Properties);
  }


  interface EtherealSaffronBush extends CustomBushBlock {}
  class EtherealSaffronBush extends CustomBushBlock {
    constructor(properties: Properties);
  }


  interface VoidpepperBush extends Block {}
  class VoidpepperBush extends Block {
    static readonly SPREADING: BooleanProperty;
    static readonly EAST: BooleanProperty;
    static readonly WEST: BooleanProperty;
    static readonly NORTH: BooleanProperty;
    static readonly SOUTH: BooleanProperty;
    static readonly UP: BooleanProperty;
    static readonly DOWN: BooleanProperty;
    static readonly PEPPER: BooleanProperty;
    constructor(properties: Properties);
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    isRandomlyTicking(pState: BlockState): boolean;
    newBlockEntity(pPos: BlockPos, pState: BlockState): BlockEntity;
    randomTick(pState: BlockState, pLevel: ServerLevel, pPos: BlockPos, pRandom: RandomSource): void;
    setPlacedBy(level: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
  }


  interface VoidpepperBushBE extends BlockEntity {}
  class VoidpepperBushBE extends BlockEntity {
    constructor(pPos: BlockPos, pState: BlockState, origin: BlockPos);
    deserialize(tag: CompoundTag): void;
    get origin(): BlockPos;
    serialize(): CompoundTag;
  }

}

declare module 'com.axedgaming.endersdelight.blocks' {
  import { BaseEntityBlock, RenderShape, Rotation, Mirror, Block } from 'net.minecraft.world.level.block';
  import { MapCodec } from 'com.mojang.serialization';
  import { BooleanProperty, DirectionProperty, IntegerProperty } from 'net.minecraft.world.level.block.state.properties';
  import { Properties } from 'BlockBehaviour';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level, BlockGetter, LevelAccessor, LevelReader } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { Entity, Mob } from 'net.minecraft.world.entity';
  import { RandomSource } from 'net.minecraft.util';
  import { BlockEntity, BlockEntityTicker, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { PathType, PathComputationType } from 'net.minecraft.world.level.pathfinder';
  import { Supplier } from 'java.util.function';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { ItemInteractionResult, InteractionHand } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BlockHitResult } from 'net.minecraft.world.phys';
  import { DeferredRegister } from 'net.neoforged.neoforge.registries';

  interface EndstoneStoveBlock extends BaseEntityBlock {}
  class EndstoneStoveBlock extends BaseEntityBlock {
    static readonly CODEC: MapCodec;
    static readonly LIT: BooleanProperty;
    static readonly FACING: DirectionProperty;
    constructor(properties: Properties);
    animateTick(stateIn: BlockState, level: Level, pos: BlockPos, rand: RandomSource): void;
    extinguish(state: BlockState, level: Level, pos: BlockPos): void;
    getBlockPathType(state: BlockState, world: BlockGetter, pos: BlockPos, entity: Mob): PathType;
    getRenderShape(pState: BlockState): RenderShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    getTicker<T extends BlockEntity>(level: Level, state: BlockState, blockEntityType: BlockEntityType<T>): BlockEntityTicker<T>;
    mirror(pState: BlockState, pMirror: Mirror): BlockState;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    rotate(pState: BlockState, pRot: Rotation): BlockState;
    stepOn(level: Level, pos: BlockPos, state: BlockState, entity: Entity): void;
  }


  interface FeastBlock extends Block {}
  class FeastBlock extends Block {
    static readonly FACING: DirectionProperty;
    static readonly SERVINGS: IntegerProperty;
    readonly servingItem: Supplier;
    readonly hasLeftovers: boolean;
    constructor(properties: Properties, servingItem: Supplier<Item>, hasLeftovers: boolean);
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    get maxServings(): number;
    get servingsProperty(): IntegerProperty;
    getAnalogOutputSignal(blockState: BlockState, level: Level, pos: BlockPos): number;
    getServingItem(state: BlockState): ItemStack;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    hasAnalogOutputSignal(state: BlockState): boolean;
    isPathfindable(state: BlockState, type: PathComputationType): boolean;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, level: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useItemOn(heldStack: ItemStack, state: BlockState, level: Level, pos: BlockPos, player: Player, hand: InteractionHand, hit: BlockHitResult): ItemInteractionResult;
  }


  class ModBlocks {
    static readonly BLOCKS: DeferredRegister;
    static readonly CHORUS_PIE: Supplier;
    static readonly STUFFED_SHULKER_BLOCK: Supplier;
    static readonly CHORUS_CRATE: Supplier;
    static readonly ENDSTONE_STOVE: Supplier;
    static readonly ETHEREAL_SAFFRON_BUSH: Supplier;
    static readonly AMBERVEIL_MUSHROOM: Supplier;
    static readonly CHORUSFLAME_BUSH: Supplier;
    static readonly VOIDPEPPER_BUSH: Supplier;
  }


  interface PieBlock extends Block {}
  class PieBlock extends Block {
    static readonly FACING: DirectionProperty;
    static readonly BITES: IntegerProperty;
    readonly pieSlice: Supplier;
    constructor(properties: Properties, pieSlice: Supplier<Item>);
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    get maxBites(): number;
    get pieSliceItem(): ItemStack;
    getAnalogOutputSignal(blockState: BlockState, level: Level, pos: BlockPos): number;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    hasAnalogOutputSignal(state: BlockState): boolean;
    isPathfindable(state: BlockState, type: PathComputationType): boolean;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, level: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useItemOn(heldStack: ItemStack, state: BlockState, level: Level, pos: BlockPos, player: Player, hand: InteractionHand, hit: BlockHitResult): ItemInteractionResult;
  }

}

declare module 'com.axedgaming.endersdelight.blocks.entity' {
  import { SyncedBlockEntity } from 'com.axedgaming.endersdelight.utils';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { Level } from 'net.minecraft.world.level';
  import { ItemStack } from 'net.minecraft.world.item';
  import { RecipeHolder, CampfireCookingRecipe } from 'net.minecraft.world.item.crafting';
  import { Optional } from 'java.util';
  import { ItemStackHandler } from 'net.neoforged.neoforge.items';
  import { Vec2 } from 'net.minecraft.world.phys';
  import { DeferredRegister } from 'net.neoforged.neoforge.registries';
  import { Supplier } from 'java.util.function';

  interface EndstoneStoveBlockEntity extends SyncedBlockEntity {}
  class EndstoneStoveBlockEntity extends SyncedBlockEntity {
    constructor(pos: BlockPos, state: BlockState);
    addItem(itemStackIn: ItemStack, recipe: RecipeHolder<CampfireCookingRecipe>, slot: number): boolean;
    static animationTick(level: Level, pos: BlockPos, state: BlockState, stove: EndstoneStoveBlockEntity): void;
    static cookingTick(level: Level, pos: BlockPos, state: BlockState, stove: EndstoneStoveBlockEntity): void;
    get inventory(): ItemStackHandler;
    get nextEmptySlot(): number;
    getMatchingRecipe(stack: ItemStack): Optional<RecipeHolder<CampfireCookingRecipe>>;
    getSlotLimit(slot: number): number;
    getStoveItemOffset(index: number): Vec2;
    getUpdateTag(registries: Provider): CompoundTag;
    isStoveBlockedAbove(): boolean;
    loadAdditional(tag: CompoundTag, registries: Provider): void;
    saveAdditional(compound: CompoundTag, registries: Provider): void;
  }


  class ModBlockEntityTypes {
    static readonly TILES: DeferredRegister;
    static readonly ENDSTONE_STOVE: Supplier;
    static readonly VOIDPEPPER_BUSH_BE: Supplier;
  }

}

declare module 'com.axedgaming.endersdelight.client' {
  import { RegisterRenderers } from 'EntityRenderersEvent';

  class ClientSetupEvents {
    static onRegisterRenderers(event: RegisterRenderers): void;
  }

}

declare module 'com.axedgaming.endersdelight.client.particle' {
  import { TextureSheetParticle, SpriteSet, ParticleRenderType } from 'net.minecraft.client.particle';
  import { EndFireParticleProvider } from 'com.axedgaming.endersdelight.client.particle.EndFireParticle';

  interface EndFireParticle extends TextureSheetParticle {}
  class EndFireParticle extends TextureSheetParticle {
    get renderType(): ParticleRenderType;
    static provider(spriteSet: SpriteSet): EndFireParticleProvider;
    tick(): void;
  }

}

declare module 'com.axedgaming.endersdelight.client.particle.EndFireParticle' {
  import { ParticleProvider, SpriteSet, Particle } from 'net.minecraft.client.particle';
  import { SimpleParticleType } from 'net.minecraft.core.particles';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';

  interface EndFireParticleProvider extends ParticleProvider<SimpleParticleType> {}
  class EndFireParticleProvider extends ParticleProvider<SimpleParticleType> {
    constructor(spriteSet: SpriteSet);
    createParticle(typeIn: SimpleParticleType, worldIn: ClientLevel, x: number, y: number, z: number, xSpeed: number, ySpeed: number, zSpeed: number): Particle;
  }

}

declare module 'com.axedgaming.endersdelight.client.renderer' {
  import { BlockEntityRenderer } from 'net.minecraft.client.renderer.blockentity';
  import { EndstoneStoveBlockEntity } from 'com.axedgaming.endersdelight.blocks.entity';
  import { Context } from 'BlockEntityRendererProvider';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';

  interface EndstoneStoveRenderer extends BlockEntityRenderer<EndstoneStoveBlockEntity> {}
  class EndstoneStoveRenderer extends BlockEntityRenderer<EndstoneStoveBlockEntity> {
    constructor(context: Context);
    render(stoveEntity: EndstoneStoveBlockEntity, partialTicks: number, poseStack: PoseStack, buffer: MultiBufferSource, combinedLightIn: number, combinedOverlayIn: number): void;
  }

}

declare module 'com.axedgaming.endersdelight' {
  import { ConfigValue } from 'ModConfigSpec';
  import { Set } from 'java.util';
  import { DeferredRegister } from 'net.neoforged.neoforge.registries';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';
  import { ServerStartingEvent } from 'net.neoforged.neoforge.event.server';
  import { Supplier } from 'java.util.function';

  class Config {
    static readonly MAGIC_NUMBER_INTRODUCTION: ConfigValue;
    static logDirtBlock: boolean;
    static magicNumber: number;
    static magicNumberIntroduction: string;
    static items: Set;
  }


  class EndersDelight {
    static readonly MODID: string;
    static readonly CREATIVE_MODE_TABS: DeferredRegister;
    constructor(modEventBus: IEventBus, modContainer: ModContainer);
    onServerStarting(event: ServerStartingEvent): void;
  }


  class ModCreativeTab {
    static readonly CREATIVE_TABS: DeferredRegister;
    static readonly TAB_ENDERS_DELIGHT: Supplier;
  }

}

declare module 'com.axedgaming.endersdelight.damageSource' {
  import { ResourceKey } from 'net.minecraft.resources';
  import { DamageSource, DamageType } from 'net.minecraft.world.damagesource';
  import { Level } from 'net.minecraft.world.level';

  class ModDamageSource {
    static readonly WATERED: ResourceKey;
    static getSimpleDamageSource(level: Level, type: ResourceKey<DamageType>): DamageSource;
  }

}

declare module 'com.axedgaming.endersdelight.effect' {
  import { MobEffect } from 'net.minecraft.world.effect';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { DeferredRegister } from 'net.neoforged.neoforge.registries';
  import { Holder } from 'net.minecraft.core';

  interface EnderPhasingEffect extends MobEffect {}
  class EnderPhasingEffect extends MobEffect {
    constructor();
    applyEffectTick(pLivingEntity: LivingEntity, pAmplifier: number): boolean;
    shouldApplyEffectTickThisTick(duration: number, amplifier: number): boolean;
  }


  class ModEffects {
    static readonly EFFECTS: DeferredRegister;
    static readonly PHASING: Holder;
  }

}

declare module 'com.axedgaming.endersdelight.EndersDelight' {
  import { FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';

  class ClientModEvents {
    static onClientSetup(event: FMLClientSetupEvent): void;
  }

}

declare module 'com.axedgaming.endersdelight.features' {
  import { ResourceKey } from 'net.minecraft.resources';
  import { BootstrapContext } from 'net.minecraft.data.worldgen';
  import { ConfiguredFeature } from 'net.minecraft.world.level.levelgen.feature';
  import { PlacedFeature } from 'net.minecraft.world.level.levelgen.placement';

  class EDConfiguredFeatures {
    static readonly AMBERVEIL_KEY: ResourceKey;
    static bootstrap(pContext: BootstrapContext<ConfiguredFeature<any, any>>): void;
    static registerKey(name: string): ResourceKey<ConfiguredFeature<any, any>>;
  }


  class EDPlacedFeatures {
    static readonly AMBERVEIL_PLACED_KEY: ResourceKey;
    static bootstrap(context: BootstrapContext<PlacedFeature>): void;
  }

}

declare module 'com.axedgaming.endersdelight.items' {
  import { FoodProperties } from 'net.minecraft.world.food';
  import { DeferredRegister } from 'net.neoforged.neoforge.registries';
  import { LinkedHashSet } from 'java.util';
  import { Supplier } from 'java.util.function';
  import { Item } from 'net.minecraft.world.item';
  import { Properties } from 'Item';

  class FoodValues {
    static readonly FINGER: FoodProperties;
    static readonly MEAL: FoodProperties;
    static readonly FEAST: FoodProperties;
    static readonly DIET: FoodProperties;
    static readonly PEARL_PASTA: FoodProperties;
    static readonly ENDER_PAELLA: FoodProperties;
    static readonly ENDERMITE_STEW: FoodProperties;
    static readonly CRAWLING_SANDWICH: FoodProperties;
    static readonly TWISTED_CEREAL: FoodProperties;
    static readonly CHORUS_STEW: FoodProperties;
    static readonly STRANGE_ECLAIR: FoodProperties;
    static readonly UNCANNY_COOKIES: FoodProperties;
    static readonly STUFFED_SHULKER: FoodProperties;
    static readonly AMBERVEIL_STEW: FoodProperties;
    static readonly AMBERVEILED_CURRY: FoodProperties;
    static readonly RISOTTO: FoodProperties;
    static readonly CHICKEN: FoodProperties;
    static readonly STEAK_FRIES: FoodProperties;
  }


  class ModItems {
    static readonly ITEMS: DeferredRegister;
    static CREATIVE_TAB_ITEMS: LinkedHashSet;
    static readonly CHORUS_CRATE: Supplier;
    static readonly ENDSTONE_STOVE: Supplier;
    static readonly SHULKER_BOWL: Supplier;
    static readonly MITE_CRUST: Supplier;
    static readonly ENDER_SHARD: Supplier;
    static readonly ENDERMAN_SIGHT: Supplier;
    static readonly SIGHT_FRAGMENTS: Supplier;
    static readonly SHULKER_MOLLUSK: Supplier;
    static readonly SHULKER_FILET: Supplier;
    static readonly UNCANNY_COOKIES: Supplier;
    static readonly CHORUS_JUICE: Supplier;
    static readonly STRANGE_ECLAIR: Supplier;
    static readonly CHORUS_PIE: Supplier;
    static readonly CHORUS_PIE_SLICE: Supplier;
    static readonly CHORUS_STEW: Supplier;
    static readonly CRISPY_SKEWER: Supplier;
    static readonly CRAWLING_SANDWICH: Supplier;
    static readonly TWISTED_CEREAL: Supplier;
    static readonly ENDERMITE_STEW: Supplier;
    static readonly PEARL_PASTA: Supplier;
    static readonly ENDER_PAELLA: Supplier;
    static readonly STUFFED_SHULKER_BOWL: Supplier;
    static readonly STUFFED_SHULKER: Supplier;
    static readonly ETHEREAL_SAFFRON: Supplier;
    static readonly AMBERVEIL: Supplier;
    static readonly CHORUSFLAME: Supplier;
    static readonly VOIDPEPPER: Supplier;
    static readonly AMBERVEIL_STEW: Supplier;
    static readonly AMBERVEILED_CURRY: Supplier;
    static readonly CHICKEN_CURRY: Supplier;
    static readonly STEAK_FRIES: Supplier;
    static readonly VEIL_OF_FLAMES_RISOTTO: Supplier;
    static basicItem(): Properties;
    static bowlFoodItem(food: FoodProperties): Properties;
    static drinkItem(): Properties;
    static foodItem(food: FoodProperties): Properties;
    static registerWithTab(name: string, supplier: Supplier<Item>): Supplier<Item>;
    static shulkerBowlFoodItem(food: FoodProperties): Properties;
  }

}

declare module 'com.axedgaming.endersdelight.player' {
  import { LivingIncomingDamageEvent } from 'net.neoforged.neoforge.event.entity.living';
  import { LevelAccessor } from 'net.minecraft.world.level';
  import { Entity } from 'net.minecraft.world.entity';

  class PlayerHasEnderPhasingProcedure {
    static execute(world: LevelAccessor, entity: Entity): void;
    static onEntityAttacked(event: LivingIncomingDamageEvent): void;
  }

}

declare module 'com.axedgaming.endersdelight.plugin.JEI' {
  import { IModPlugin } from 'mezz.jei.api';
  import { IRecipeCatalystRegistration, IRecipeRegistration } from 'mezz.jei.api.registration';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface JEIPlugin extends IModPlugin {}
  class JEIPlugin extends IModPlugin {
    get pluginUid(): ResourceLocation;
    registerRecipeCatalysts(registration: IRecipeCatalystRegistration): void;
    registerRecipes(registration: IRecipeRegistration): void;
  }

}

declare module 'com.axedgaming.endersdelight.utils' {
  import { RegisterParticleProvidersEvent } from 'net.neoforged.neoforge.client.event';
  import { DeferredRegister, DeferredHolder } from 'net.neoforged.neoforge.registries';
  import { RightClickBlock } from 'PlayerInteractEvent';
  import { LevelAccessor, Level } from 'net.minecraft.world.level';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Entity } from 'net.minecraft.world.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { IItemHandler } from 'net.neoforged.neoforge.items';
  import { ItemStack } from 'net.minecraft.world.item';
  import { BlockEntity, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { ClientboundBlockEntityDataPacket } from 'net.minecraft.network.protocol.game';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';

  class EDParticles {
    static registerParticles(event: RegisterParticleProvidersEvent): void;
  }


  class EDParticleTypes {
    static readonly REGISTRY: DeferredRegister;
    static readonly END_FIRE: DeferredHolder;
  }


  class IfVoidPepperBushClicked {
    static execute(world: LevelAccessor, x: number, y: number, z: number, blockstate: BlockState, entity: Entity): void;
    static onRightClickBlock(event: RightClickBlock): void;
  }


  class ItemUtils {
    static dropItems(level: Level, pos: BlockPos, inventory: IItemHandler): void;
    static isInventoryEmpty(inventory: IItemHandler): boolean;
    static spawnItemEntity(level: Level, stack: ItemStack, x: number, y: number, z: number, xMotion: number, yMotion: number, zMotion: number): void;
  }


  interface SyncedBlockEntity extends BlockEntity {}
  class SyncedBlockEntity extends BlockEntity {
    constructor(tileEntityTypeIn: BlockEntityType<any>, pos: BlockPos, state: BlockState);
    get updatePacket(): ClientboundBlockEntityDataPacket;
    getUpdateTag(registries: Provider): CompoundTag;
  }

}