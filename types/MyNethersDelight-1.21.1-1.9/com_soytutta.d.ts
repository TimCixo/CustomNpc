declare module 'com.soytutta.mynethersdelight.client.event' {
  import { RegisterRenderers } from 'EntityRenderersEvent';
  import { FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';

  class ClientSetupEvents {
    static init(event: FMLClientSetupEvent): void;
    static onRegisterRenderers(event: RegisterRenderers): void;
  }

}

declare module 'com.soytutta.mynethersdelight.client.renderer' {
  import { BlockEntityRenderer } from 'net.minecraft.client.renderer.blockentity';
  import { NetherStoveBlockEntity } from 'com.soytutta.mynethersdelight.common.block.entity';
  import { Context } from 'BlockEntityRendererProvider';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';

  interface NetherStoveRenderer extends BlockEntityRenderer<NetherStoveBlockEntity> {}
  class NetherStoveRenderer extends BlockEntityRenderer<NetherStoveBlockEntity> {
    constructor(context: Context);
    render(stoveEntity: NetherStoveBlockEntity, partialTicks: number, poseStack: PoseStack, buffer: MultiBufferSource, combinedLightIn: number, combinedOverlayIn: number): void;
  }

}

declare module 'com.soytutta.mynethersdelight.common.block.crops' {
  import { BushBlock, BonemealableBlock, Block } from 'net.minecraft.world.level.block';
  import { MapCodec } from 'com.mojang.serialization';
  import { BooleanProperty, IntegerProperty, EnumProperty } from 'net.minecraft.world.level.block.state.properties';
  import { Properties } from 'BlockBehaviour';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockGetter, LevelReader, LevelAccessor, Level, Explosion } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { RandomSource } from 'net.minecraft.util';
  import { Entity, Mob } from 'net.minecraft.world.entity';
  import { Player } from 'net.minecraft.world.entity.player';
  import { PathType } from 'net.minecraft.world.level.pathfinder';
  import { ItemStack } from 'net.minecraft.world.item';
  import { HitResult } from 'net.minecraft.world.phys';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';

  interface PowderyCaneBlock extends BonemealableBlock, BushBlock {}
  class PowderyCaneBlock extends BonemealableBlock {
    static readonly CODEC: MapCodec;
    static readonly LIT: BooleanProperty;
    static readonly BASE: BooleanProperty;
    static readonly LEAVE: BooleanProperty;
    static readonly AGE: IntegerProperty;
    static readonly PRESSURE: IntegerProperty;
    constructor(properties: Properties);
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    entityInside(state: BlockState, level: Level, pos: BlockPos, entity: Entity): void;
    getBlockPathType(state: BlockState, world: BlockGetter, pos: BlockPos, entity: Mob): PathType;
    getShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    isBonemealSuccess(level: Level, random: RandomSource, pos: BlockPos, state: BlockState): boolean;
    isFlammable(state: BlockState, level: BlockGetter, pos: BlockPos, direction: Direction): boolean;
    isValidBonemealTarget(level: LevelReader, pos: BlockPos, state: BlockState): boolean;
    performBonemeal(level: ServerLevel, random: RandomSource, pos: BlockPos, state: BlockState): void;
    playerWillDestroy(level: Level, pos: BlockPos, state: BlockState, player: Player): BlockState;
    randomTick(state: BlockState, world: ServerLevel, pos: BlockPos, random: RandomSource): void;
    tick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
    updateShape(state: BlockState, direction: Direction, offsetState: BlockState, level: LevelAccessor, pos: BlockPos, offsetPos: BlockPos): BlockState;
    wasExploded(level: Level, pos: BlockPos, explosion: Explosion): void;
  }


  interface PowderyCannonBlock extends BonemealableBlock, Block {}
  class PowderyCannonBlock extends BonemealableBlock {
    static readonly CODEC: MapCodec;
    static readonly AGE: IntegerProperty;
    static readonly LEAVES: EnumProperty;
    static readonly STAGE: IntegerProperty;
    static readonly LIT: BooleanProperty;
    static readonly PRESSURE: IntegerProperty;
    constructor(properties: Properties);
    codec(): MapCodec<PowderyCannonBlock>;
    entityInside(state: BlockState, level: Level, pos: BlockPos, entity: Entity): void;
    getCloneItemStack(state: BlockState, target: HitResult, level: LevelReader, pos: BlockPos, player: Player): ItemStack;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    isBonemealSuccess(level: Level, random: RandomSource, pos: BlockPos, state: BlockState): boolean;
    isFlammable(state: BlockState, level: BlockGetter, pos: BlockPos, direction: Direction): boolean;
    isValidBonemealTarget(level: LevelReader, pos: BlockPos, state: BlockState): boolean;
    performBonemeal(level: ServerLevel, random: RandomSource, pos: BlockPos, state: BlockState): void;
    playerWillDestroy(level: Level, pos: BlockPos, state: BlockState, player: Player): BlockState;
    randomTick(state: BlockState, world: ServerLevel, pos: BlockPos, random: RandomSource): void;
    stepOn(level: Level, pos: BlockPos, state: BlockState, entity: Entity): void;
    tick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
    updateShape(state: BlockState, direction: Direction, offsetState: BlockState, level: LevelAccessor, pos: BlockPos, offsetPos: BlockPos): BlockState;
  }


  interface PowderyCannonSaplingBlock extends BonemealableBlock, Block {}
  class PowderyCannonSaplingBlock extends BonemealableBlock {
    static readonly CODEC: MapCodec;
    constructor(properties: Properties);
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    codec(): MapCodec<PowderyCannonSaplingBlock>;
    getCloneItemStack(state: BlockState, target: HitResult, level: LevelReader, pos: BlockPos, player: Player): ItemStack;
    isBonemealSuccess(level: Level, random: RandomSource, pos: BlockPos, state: BlockState): boolean;
    isFlammable(state: BlockState, level: BlockGetter, pos: BlockPos, direction: Direction): boolean;
    isValidBonemealTarget(level: LevelReader, pos: BlockPos, state: BlockState): boolean;
    performBonemeal(level: ServerLevel, random: RandomSource, pos: BlockPos, state: BlockState): void;
    updateShape(state: BlockState, direction: Direction, offsetState: BlockState, level: LevelAccessor, pos: BlockPos, offsetPos: BlockPos): BlockState;
  }


  interface PowderyFlowerBlock extends BonemealableBlock, Block {}
  class PowderyFlowerBlock extends BonemealableBlock {
    static readonly CODEC: MapCodec;
    static readonly LIT: BooleanProperty;
    static readonly PRESSURE: IntegerProperty;
    static readonly AGE: IntegerProperty;
    constructor(properties: Properties);
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    codec(): MapCodec<PowderyFlowerBlock>;
    entityInside(state: BlockState, level: Level, pos: BlockPos, entity: Entity): void;
    getCloneItemStack(state: BlockState, target: HitResult, level: LevelReader, pos: BlockPos, player: Player): ItemStack;
    isBonemealSuccess(level: Level, random: RandomSource, pos: BlockPos, state: BlockState): boolean;
    isFlammable(state: BlockState, level: BlockGetter, pos: BlockPos, direction: Direction): boolean;
    isValidBonemealTarget(level: LevelReader, pos: BlockPos, state: BlockState): boolean;
    performBonemeal(level: ServerLevel, random: RandomSource, pos: BlockPos, state: BlockState): void;
    playerWillDestroy(level: Level, pos: BlockPos, state: BlockState, player: Player): BlockState;
    randomTick(state: BlockState, world: ServerLevel, pos: BlockPos, random: RandomSource): void;
    tick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
    updateShape(state: BlockState, direction: Direction, offsetState: BlockState, level: LevelAccessor, pos: BlockPos, offsetPos: BlockPos): BlockState;
    wasExploded(level: Level, pos: BlockPos, explosion: Explosion): void;
  }

}

declare module 'com.soytutta.mynethersdelight.common.block.entity' {
  import { HangingSignBlockEntity, BlockEntityType, SignBlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { SyncedBlockEntity } from 'vectorwing.farmersdelight.common.block.entity';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { Level } from 'net.minecraft.world.level';
  import { ItemStack } from 'net.minecraft.world.item';
  import { RecipeHolder, CampfireCookingRecipe } from 'net.minecraft.world.item.crafting';
  import { Optional } from 'java.util';
  import { ItemStackHandler } from 'net.neoforged.neoforge.items';
  import { Vec2 } from 'net.minecraft.world.phys';

  interface MNDHangingSignBlockEntity extends HangingSignBlockEntity {}
  class MNDHangingSignBlockEntity extends HangingSignBlockEntity {
    constructor(pWorldPosition: BlockPos, pBlockState: BlockState);
    get type(): BlockEntityType<any>;
  }


  interface MNDSignBlockEntity extends SignBlockEntity {}
  class MNDSignBlockEntity extends SignBlockEntity {
    constructor(pWorldPosition: BlockPos, pBlockState: BlockState);
    get type(): BlockEntityType<any>;
  }


  interface NetherStoveBlockEntity extends SyncedBlockEntity {}
  class NetherStoveBlockEntity extends SyncedBlockEntity {
    constructor(pos: BlockPos, state: BlockState);
    addItem(itemStackIn: ItemStack, recipe: RecipeHolder<CampfireCookingRecipe>, slot: number): boolean;
    static animationTick(level: Level, pos: BlockPos, state: BlockState, stove: NetherStoveBlockEntity): void;
    static cookingTick(level: Level, pos: BlockPos, state: BlockState, stove: NetherStoveBlockEntity): void;
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

}

declare module 'com.soytutta.mynethersdelight.common.block.feasts' {
  import { Block, HorizontalDirectionalBlock, RenderShape } from 'net.minecraft.world.level.block';
  import { DirectionProperty, IntegerProperty, BooleanProperty, EnumProperty } from 'net.minecraft.world.level.block.state.properties';
  import { Supplier } from 'java.util.function';
  import { Properties } from 'BlockBehaviour';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockGetter, Level, LevelAccessor, LevelReader } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { ItemInteractionResult, InteractionHand } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BlockHitResult } from 'net.minecraft.world.phys';
  import { PathComputationType, PathType } from 'net.minecraft.world.level.pathfinder';
  import { FeastBlock } from 'vectorwing.farmersdelight.common.block';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { RandomSource } from 'net.minecraft.util';
  import { Entity, Mob, LivingEntity } from 'net.minecraft.world.entity';
  import { MapCodec } from 'com.mojang.serialization';
  import { List } from 'java.util';
  import { Builder } from 'LootParams';
  import { PushReaction } from 'net.minecraft.world.level.material';
  import { BlockType } from 'DoubleBlockCombiner';

  interface BreadLoafBlock extends Block {}
  class BreadLoafBlock extends Block {
    static readonly FACING: DirectionProperty;
    static readonly BITES: IntegerProperty;
    readonly breadSlice: Supplier;
    constructor(properties: Properties, breadSlice: Supplier<Item>);
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    get breadSliceItem(): ItemStack;
    get maxBites(): number;
    getAnalogOutputSignal(blockState: BlockState, level: Level, pos: BlockPos): number;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    hasAnalogOutputSignal(state: BlockState): boolean;
    isPathfindable(state: BlockState, type: PathComputationType): boolean;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, level: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useItemOn(heldStack: ItemStack, state: BlockState, level: Level, pos: BlockPos, player: Player, hand: InteractionHand, hit: BlockHitResult): ItemInteractionResult;
  }


  interface GhastaWithCreamBlock extends FeastBlock {}
  class GhastaWithCreamBlock extends FeastBlock {
    constructor(properties: Properties, servingItem: Supplier<Item>, hasLeftovers: boolean);
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    isRandomlyTicking(state: BlockState): boolean;
    randomTick(state: BlockState, worldIn: ServerLevel, pos: BlockPos, random: RandomSource): void;
  }


  interface MagmaCakeBlock extends Block {}
  class MagmaCakeBlock extends Block {
    static readonly SECOND_CAKE: BooleanProperty;
    static readonly SECOND_CAKE_FACING: DirectionProperty;
    static readonly FACING: DirectionProperty;
    static readonly BITES: IntegerProperty;
    readonly pieSlice: Supplier;
    constructor(properties: Properties, pieSlice: Supplier<Item>);
    animateTick(state: BlockState, level: Level, pos: BlockPos, rand: RandomSource): void;
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    get maxBites(): number;
    get pieSliceItem(): ItemStack;
    getAnalogOutputSignal(blockState: BlockState, level: Level, pos: BlockPos): number;
    getBlockPathType(state: BlockState, world: BlockGetter, pos: BlockPos, entity: Mob): PathType;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    hasAnalogOutputSignal(state: BlockState): boolean;
    stepOn(level: Level, pos: BlockPos, state: BlockState, entity: Entity): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, level: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useItemOn(heldStack: ItemStack, state: BlockState, level: Level, pos: BlockPos, player: Player, hand: InteractionHand, hit: BlockHitResult): ItemInteractionResult;
  }


  interface StriderloafBlock extends FeastBlock {}
  class StriderloafBlock extends FeastBlock {
    constructor(properties: Properties, servingItem: Supplier<Item>, hasLeftovers: boolean);
    getAnalogOutputSignal(blockState: BlockState, level: Level, pos: BlockPos): number;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    isRandomlyTicking(state: BlockState): boolean;
    neighborChanged(state: BlockState, worldIn: Level, pos: BlockPos, blockIn: Block, fromPos: BlockPos, isMoving: boolean): void;
    randomTick(state: BlockState, worldIn: ServerLevel, pos: BlockPos, random: RandomSource): void;
  }


  interface StuffedHoglinBlock extends HorizontalDirectionalBlock {}
  class StuffedHoglinBlock extends HorizontalDirectionalBlock {
    static readonly CODEC: MapCodec;
    static readonly PART: EnumProperty;
    static readonly SERVINGS: IntegerProperty;
    constructor(properties: Properties);
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    get servingsProperty(): IntegerProperty;
    getAnalogOutputSignal(blockState: BlockState, level: Level, pos: BlockPos): number;
    static getBlockType(state: BlockState): BlockType;
    getDrops(state: BlockState, lootParams: Builder): ItemStack[];
    getPistonPushReaction(state: BlockState): PushReaction;
    getRenderShape(state: BlockState): RenderShape;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    hasAnalogOutputSignal(state: BlockState): boolean;
    isFlammable(state: BlockState, level: BlockGetter, pos: BlockPos, direction: Direction): boolean;
    playerWillDestroy(level: Level, pos: BlockPos, state: BlockState, player: Player): BlockState;
    setPlacedBy(worldIn: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useItemOn(heldStack: ItemStack, state: BlockState, level: Level, pos: BlockPos, player: Player, hand: InteractionHand, hit: BlockHitResult): ItemInteractionResult;
  }

}

declare module 'com.soytutta.mynethersdelight.common.block' {
  import { Block, CeilingHangingSignBlock, StandingSignBlock, WallHangingSignBlock, WallSignBlock, BaseEntityBlock, RenderShape, Rotation, Mirror, FarmBlock, RotatedPillarBlock } from 'net.minecraft.world.level.block';
  import { IntegerProperty, WoodType, BooleanProperty, DirectionProperty } from 'net.minecraft.world.level.block.state.properties';
  import { Properties } from 'BlockBehaviour';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';
  import { BlockGetter, Level, LevelReader } from 'net.minecraft.world.level';
  import { TriState } from 'net.neoforged.neoforge.common.util';
  import { BlockEntity, BlockEntityTicker, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { MapCodec } from 'com.mojang.serialization';
  import { ItemStack } from 'net.minecraft.world.item';
  import { HitResult } from 'net.minecraft.world.phys';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BlockPlaceContext, UseOnContext } from 'net.minecraft.world.item.context';
  import { Entity, Mob } from 'net.minecraft.world.entity';
  import { PathType } from 'net.minecraft.world.level.pathfinder';
  import { ItemAbility } from 'net.neoforged.neoforge.common';

  interface LetiosCompostBlock extends Block {}
  class LetiosCompostBlock extends Block {
    static FORGOTING: IntegerProperty;
    constructor(properties: Properties);
    animateTick(state: BlockState, level: Level, pos: BlockPos, random: RandomSource): void;
    canSustainPlant(state: BlockState, world: BlockGetter, pos: BlockPos, facing: Direction, plantState: BlockState): TriState;
    get maxForgotingStage(): number;
    getAnalogOutputSignal(blockState: BlockState, worldIn: Level, pos: BlockPos): number;
    hasAnalogOutputSignal(state: BlockState): boolean;
    isFlammable(state: BlockState, level: BlockGetter, pos: BlockPos, direction: Direction): boolean;
    isRandomlyTicking(state: BlockState): boolean;
    randomTick(state: BlockState, worldIn: ServerLevel, pos: BlockPos, random: RandomSource): void;
  }


  interface MNDHangingSignBlock extends CeilingHangingSignBlock {}
  class MNDHangingSignBlock extends CeilingHangingSignBlock {
    constructor(properties: Properties, woodType: WoodType);
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
  }


  interface MNDStandingSignBlock extends StandingSignBlock {}
  class MNDStandingSignBlock extends StandingSignBlock {
    constructor(properties: Properties, woodType: WoodType);
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
  }


  interface MNDWallHangingSignBlock extends WallHangingSignBlock {}
  class MNDWallHangingSignBlock extends WallHangingSignBlock {
    constructor(properties: Properties, woodType: WoodType);
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
  }


  interface MNDWallSignBlock extends WallSignBlock {}
  class MNDWallSignBlock extends WallSignBlock {
    constructor(properties: Properties, woodType: WoodType);
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
  }


  interface NetherStoveBlock extends BaseEntityBlock {}
  class NetherStoveBlock extends BaseEntityBlock {
    static readonly CODEC: MapCodec;
    static readonly LIT: BooleanProperty;
    static readonly SOUL: BooleanProperty;
    static readonly FACING: DirectionProperty;
    constructor(properties: Properties);
    animateTick(stateIn: BlockState, level: Level, pos: BlockPos, rand: RandomSource): void;
    extinguish(state: BlockState, level: Level, pos: BlockPos): void;
    getBlockPathType(state: BlockState, world: BlockGetter, pos: BlockPos, entity: Mob): PathType;
    getCloneItemStack(state: BlockState, target: HitResult, level: LevelReader, pos: BlockPos, player: Player): ItemStack;
    getRenderShape(pState: BlockState): RenderShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    getTicker<T extends BlockEntity>(level: Level, state: BlockState, blockEntityType: BlockEntityType<T>): BlockEntityTicker<T>;
    mirror(pState: BlockState, pMirror: Mirror): BlockState;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onRemove(state: BlockState, worldIn: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    rotate(pState: BlockState, pRot: Rotation): BlockState;
    stepOn(level: Level, pos: BlockPos, state: BlockState, entity: Entity): void;
  }


  interface PepperCrateBlock extends Block {}
  class PepperCrateBlock extends Block {
    constructor(properties: Properties);
    getBlockPathType(state: BlockState, world: BlockGetter, pos: BlockPos, entity: Mob): PathType;
    isFlammable(state: BlockState, level: BlockGetter, pos: BlockPos, direction: Direction): boolean;
    stepOn(level: Level, pos: BlockPos, state: BlockState, entity: Entity): void;
  }


  interface ResurgentSoilBlock extends Block {}
  class ResurgentSoilBlock extends Block {
    constructor(properties: Properties);
    canSustainPlant(state: BlockState, world: BlockGetter, pos: BlockPos, facing: Direction, plantState: BlockState): TriState;
    getToolModifiedState(state: BlockState, context: UseOnContext, toolAction: ItemAbility, simulate: boolean): BlockState;
    static growIfPossible(aboveBlock: BlockState, abovePos: BlockPos, level: ServerLevel, targetBlock: Block, maxHeight: number): void;
    randomTick(state: BlockState, level: ServerLevel, pos: BlockPos, rand: RandomSource): void;
  }


  interface ResurgentSoilFarmlandBlock extends FarmBlock {}
  class ResurgentSoilFarmlandBlock extends FarmBlock {
    constructor(properties: Properties);
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    canSustainPlant(state: BlockState, world: BlockGetter, pos: BlockPos, facing: Direction, plantState: BlockState): TriState;
    fallOn(level: Level, state: BlockState, pos: BlockPos, entity: Entity, fallDistance: number): void;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    isFertile(state: BlockState, world: BlockGetter, pos: BlockPos): boolean;
    isFlammable(state: BlockState, level: BlockGetter, pos: BlockPos, direction: Direction): boolean;
    randomTick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
    tick(state: BlockState, level: ServerLevel, pos: BlockPos, rand: RandomSource): void;
    static turnToRichSoil(state: BlockState, level: Level, pos: BlockPos): void;
  }


  interface StrippableBlock extends RotatedPillarBlock {}
  class StrippableBlock extends RotatedPillarBlock {
    constructor(properties: Properties);
    getToolModifiedState(state: BlockState, context: UseOnContext, itemAbility: ItemAbility, simulate: boolean): BlockState;
    isFlammable(state: BlockState, level: BlockGetter, pos: BlockPos, direction: Direction): boolean;
  }

}

declare module 'com.soytutta.mynethersdelight.common.block.trophies' {
  import { Block, SimpleWaterloggedBlock, Rotation, Mirror } from 'net.minecraft.world.level.block';
  import { DirectionProperty, BooleanProperty, IntegerProperty } from 'net.minecraft.world.level.block.state.properties';
  import { Properties } from 'BlockBehaviour';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { LevelReader, Level, BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { Entity, Mob } from 'net.minecraft.world.entity';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { RandomSource } from 'net.minecraft.util';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { PathType } from 'net.minecraft.world.level.pathfinder';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { ItemInteractionResult, InteractionHand } from 'net.minecraft.world';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BlockHitResult } from 'net.minecraft.world.phys';

  interface AbstractTrophyBlock extends SimpleWaterloggedBlock, Block {}
  class AbstractTrophyBlock extends SimpleWaterloggedBlock {
    static readonly FACING: DirectionProperty;
    static readonly WATERLOGGED: BooleanProperty;
    static readonly HIT: BooleanProperty;
    constructor(properties: Properties, pushStrength: number, pushVerticalStrength: number);
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    entityInside(state: BlockState, level: Level, pos: BlockPos, entity: Entity): void;
    getBlockPathType(state: BlockState, world: BlockGetter, pos: BlockPos, entity: Mob): PathType;
    getFluidState(state: BlockState): FluidState;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    isFlammable(state: BlockState, level: BlockGetter, pos: BlockPos, direction: Direction): boolean;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    neighborChanged(state: BlockState, level: Level, pos: BlockPos, block: Block, fromPos: BlockPos, isMoving: boolean): void;
    onPlace(state: BlockState, level: Level, pos: BlockPos, oldState: BlockState, movedByPiston: boolean): void;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    tick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
  }


  interface GoldenTrophyBlock extends AbstractTrophyBlock {}
  class GoldenTrophyBlock extends AbstractTrophyBlock {
    constructor(properties: Properties, pushStrength: number, pushVerticalStrength: number);
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
  }


  interface TrophyBlock extends AbstractTrophyBlock {}
  class TrophyBlock extends AbstractTrophyBlock {
    static readonly ROTTING: IntegerProperty;
    constructor(properties: Properties, pushStrength: number, pushVerticalStrength: number);
    animateTick(state: BlockState, level: Level, pos: BlockPos, random: RandomSource): void;
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    get maxRottingStage(): number;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    isRandomlyTicking(state: BlockState): boolean;
    randomTick(state: BlockState, worldIn: ServerLevel, pos: BlockPos, random: RandomSource): void;
    useItemOn(heldStack: ItemStack, state: BlockState, level: Level, pos: BlockPos, player: Player, hand: InteractionHand, hit: BlockHitResult): ItemInteractionResult;
  }

}

declare module 'com.soytutta.mynethersdelight.common.block.utility' {
  import { WoodType } from 'net.minecraft.world.level.block.state.properties';

  class MNDWoodTypes {
    static readonly POWDERY: WoodType;
  }

}

declare module 'com.soytutta.mynethersdelight.common.effect' {
  import { MobEffect, MobEffectCategory } from 'net.minecraft.world.effect';
  import { LivingEntity } from 'net.minecraft.world.entity';

  interface AbstractPungentEffect extends MobEffect {}
  class AbstractPungentEffect extends MobEffect {
    constructor(category: MobEffectCategory, color: number);
  }


  interface GoodPungentEffect extends AbstractPungentEffect {}
  class GoodPungentEffect extends AbstractPungentEffect {
    constructor();
    applyEffectTick(entity: LivingEntity, amplifier: number): boolean;
    shouldApplyEffectTickThisTick(duration: number, amplifier: number): boolean;
  }


  interface PungentEffect extends AbstractPungentEffect {}
  class PungentEffect extends AbstractPungentEffect {
    constructor();
    applyEffectTick(entity: LivingEntity, amplifier: number): boolean;
    shouldApplyEffectTickThisTick(duration: number, amplifier: number): boolean;
  }

}

declare module 'com.soytutta.mynethersdelight.common.enchantment' {
  import { EntityType, Mob } from 'net.minecraft.world.entity';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { BiPredicate, BiConsumer } from 'java.util.function';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Optional } from 'java.util';

  class PoachingFailureCase {
    constructor(sourceType: EntityType<Mob>, targetType: EntityType<Mob>, transformSound: SoundEvent, condition: BiPredicate<Mob, ItemStack>, setupAction: BiConsumer<Mob, Mob>);
    get setupAction(): BiConsumer<Mob, Mob>;
    get targetType(): EntityType<Mob>;
    get transformSound(): SoundEvent;
    matches(mob: Mob, weapon: ItemStack): boolean;
  }


  class PoachingFailureRegistry {
    static findCaseFor(mob: Mob, weapon: ItemStack): Optional<PoachingFailureCase>;
    static register(failureCase: PoachingFailureCase): void;
    static registerAll(): void;
  }

}

declare module 'com.soytutta.mynethersdelight.common.entity.ia' {
  import { Goal } from 'net.minecraft.world.entity.ai.goal';
  import { Frog } from 'net.minecraft.world.entity.animal.frog';

  interface EatMagmaCakeGoal extends Goal {}
  class EatMagmaCakeGoal extends Goal {
    constructor(frog: Frog);
    canContinueToUse(): boolean;
    canUse(): boolean;
    start(): void;
    stop(): void;
    tick(): void;
  }

}

declare module 'com.soytutta.mynethersdelight.common.entity' {
  import { ThrowableItemProjectile } from 'net.minecraft.world.entity.projectile';
  import { EntityType, LivingEntity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';

  interface StriderRockEntity extends ThrowableItemProjectile {}
  class StriderRockEntity extends ThrowableItemProjectile {
    constructor(StriderRockEntityType: EntityType<StriderRockEntity>, level: Level);

    constructor(level: Level, livingEntity: LivingEntity);

    constructor(level: Level, d: number, e: number, f: number);
    handleEntityEvent(id: number): void;
  }

}

declare module 'com.soytutta.mynethersdelight.common.events' {
  import { LivingDeathEvent, LivingDropsEvent } from 'net.neoforged.neoforge.event.entity.living';
  import { Mob, LivingEntity } from 'net.minecraft.world.entity';
  import { AbstractHorse } from 'net.minecraft.world.entity.animal.horse';

  class CommonEvent {
    static livingDie(event: LivingDeathEvent): void;
    static makeHostile(mobToAnger: Mob, target: LivingEntity): void;
    static onMobDrop(event: LivingDropsEvent): void;
    static transferBasicMobData(original: Mob, newMob: Mob): void;
    static transferDataAndMakeHostile(original: Mob, newMob: Mob): void;
    static transferFullHorseData(original: AbstractHorse, newHorse: AbstractHorse): void;
  }

}

declare module 'com.soytutta.mynethersdelight.common.item' {
  import { ConsumableItem, DrinkableItem } from 'vectorwing.farmersdelight.common.item';
  import { Properties, TooltipContext } from 'Item';
  import { ItemStack, TooltipFlag, Item, ProjectileItem, BlockItem } from 'net.minecraft.world.item';
  import { Level } from 'net.minecraft.world.level';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { List } from 'java.util';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { Component } from 'net.minecraft.network.chat';
  import { InteractionResult, InteractionHand, InteractionResultHolder } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Projectile } from 'net.minecraft.world.entity.projectile';
  import { Position, Direction } from 'net.minecraft.core';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';

  interface GoldenEggItem extends ConsumableItem {}
  class GoldenEggItem extends ConsumableItem {
    constructor(properties: Properties);
    affectConsumer(stack: ItemStack, level: Level, consumer: LivingEntity): void;
  }


  interface HotCreamConeItem extends ConsumableItem {}
  class HotCreamConeItem extends ConsumableItem {
    static readonly EFFECTS: List;
    constructor(properties: Properties);
    affectConsumer(stack: ItemStack, level: Level, consumer: LivingEntity): void;
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], isAdvanced: TooltipFlag): void;
    get eatingSound(): SoundEvent;
    interactLivingEntity(stack: ItemStack, playerIn: Player, target: LivingEntity, hand: InteractionHand): InteractionResult;
  }


  interface HotCreamItem extends DrinkableItem {}
  class HotCreamItem extends DrinkableItem {
    constructor(properties: Properties);
    affectConsumer(stack: ItemStack, level: Level, consumer: LivingEntity): void;
    get drinkingSound(): SoundEvent;
    getUseDuration(stack: ItemStack, entity: LivingEntity): number;
  }


  interface StriderEggItem extends DrinkableItem {}
  class StriderEggItem extends DrinkableItem {
    constructor(properties: Properties);
    affectConsumer(stack: ItemStack, level: Level, consumer: LivingEntity): void;
    get drinkingSound(): SoundEvent;
    getUseDuration(stack: ItemStack, entity: LivingEntity): number;
  }


  interface StriderRockItem extends ProjectileItem, Item {}
  class StriderRockItem extends ProjectileItem {
    constructor(properties: Properties);
    asProjectile(level: Level, pos: Position, stack: ItemStack, direction: Direction): Projectile;
    use(level: Level, player: Player, usedHand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface StuffedHoglinBlockItem extends BlockItem {}
  class StuffedHoglinBlockItem extends BlockItem {
    constructor(block: Block, properties: Properties);
    place(context: BlockPlaceContext): InteractionResult;
  }

}

declare module 'com.soytutta.mynethersdelight.common.item.HotCreamConeItem' {
  import { EntityInteract } from 'PlayerInteractEvent';

  class StriderFoodEvent {
    static onStriderFoodApplied(event: EntityInteract): void;
  }

}

declare module 'com.soytutta.mynethersdelight.common.loot' {
  import { LootModifier, IGlobalLootModifier } from 'net.neoforged.neoforge.common.loot';
  import { Supplier } from 'java.util.function';
  import { MapCodec } from 'com.mojang.serialization';
  import { LootItemCondition } from 'net.minecraft.world.level.storage.loot.predicates';
  import { Item } from 'net.minecraft.world.item';
  import { EntityType } from 'net.minecraft.world.entity';

  interface MNDEspecialLootModifier extends LootModifier {}
  class MNDEspecialLootModifier extends LootModifier {
    static readonly CODEC: Supplier;
    codec(): MapCodec<IGlobalLootModifier>;
  }


  interface RemplaceLootModifier extends LootModifier {}
  class RemplaceLootModifier extends LootModifier {
    static readonly CODEC: Supplier;
    constructor(conditionsIn: LootItemCondition[], replacedItem: Item, newItem: Item, entity: EntityType<any>);
    codec(): MapCodec<IGlobalLootModifier>;
    get entity(): EntityType<any>;
    get newItem(): Item;
    get replacedItem(): Item;
  }

}

declare module 'com.soytutta.mynethersdelight.common' {
  import { FMLCommonSetupEvent } from 'net.neoforged.fml.event.lifecycle';

  class MNDCommonSetup {
    static init(event: FMLCommonSetupEvent): void;
    static registerDispenserBehaviors(): void;
  }

}

declare module 'com.soytutta.mynethersdelight.common.registry' {
  import { DeferredRegister, DeferredHolder } from 'net.neoforged.neoforge.registries';
  import { Supplier } from 'java.util.function';
  import { BlockEntityTypeAddBlocksEvent } from 'net.neoforged.neoforge.event';
  import { Holder } from 'net.minecraft.core';
  import { Properties } from 'Item';
  import { FoodProperties } from 'net.minecraft.world.food';

  class MNDBiomeFeatures {
    static readonly FEATURES: DeferredRegister;
    static readonly POWDERYCANE: Supplier;
  }


  class MNDBlockEntityTypes {
    static readonly TILES: DeferredRegister;
    static readonly NETHER_STOVE: Supplier;
    static readonly MND_SIGN: Supplier;
    static readonly MND_HSIGN: Supplier;
    static addCabinetsBlockEntities(event: BlockEntityTypeAddBlocksEvent): void;
  }


  class MNDBlocks {
    static readonly BLOCKS: DeferredRegister;
    static readonly NETHER_BRICKS_CABINET: Supplier;
    static readonly RED_NETHER_BRICKS_CABINET: Supplier;
    static readonly BLACKSTONE_BRICKS_CABINET: Supplier;
    static readonly NETHER_STOVE: Supplier;
    static readonly BULLET_PEPPER_CRATE: Supplier;
    static readonly LETIOS_COMPOST: Supplier;
    static readonly RESURGENT_SOIL: Supplier;
    static readonly RESURGENT_SOIL_FARMLAND: Supplier;
    static readonly WARPED_FUNGUS_COLONY: Supplier;
    static readonly CRIMSON_FUNGUS_COLONY: Supplier;
    static readonly POWDERY_CHUBBY_SAPLING: Supplier;
    static readonly POWDERY_CANNON: Supplier;
    static readonly POWDERY_CANE: Supplier;
    static readonly BULLET_PEPPER: Supplier;
    static readonly POWDERY_TORCH: Supplier;
    static readonly WALL_POWDERY_TORCH: Supplier;
    static readonly POTTED_POWDERY_CANNON: Supplier;
    static readonly POTTED_BULLET_PEPPER: Supplier;
    static readonly POWDERY_CABINET: Supplier;
    static readonly BLOCK_OF_POWDERY_CANNON: Supplier;
    static readonly BLOCK_OF_STRIPPED_POWDERY_CANNON: Supplier;
    static readonly POWDERY_PLANKS: Supplier;
    static readonly POWDERY_PLANKS_STAIRS: Supplier;
    static readonly POWDERY_PLANKS_SLAB: Supplier;
    static readonly POWDERY_MOSAIC: Supplier;
    static readonly POWDERY_MOSAIC_STAIRS: Supplier;
    static readonly POWDERY_MOSAIC_SLAB: Supplier;
    static readonly POWDERY_FENCE: Supplier;
    static readonly POWDERY_FENCE_GATE: Supplier;
    static readonly POWDERY_DOOR: Supplier;
    static readonly POWDERY_TRAPDOOR: Supplier;
    static readonly POWDERY_BUTTON: Supplier;
    static readonly POWDERY_PRESSURE_PLATE: Supplier;
    static readonly POWDERY_SIGN: Supplier;
    static readonly POWDERY_WALL_SIGN: Supplier;
    static readonly POWDERY_HANGING_SIGN: Supplier;
    static readonly POWDERY_WALL_HANGING_SIGN: Supplier;
    static readonly STRIDERLOAF_BLOCK: Supplier;
    static readonly COLD_STRIDERLOAF_BLOCK: Supplier;
    static readonly GHASTA_WITH_CREAM_BLOCK: Supplier;
    static readonly BREAD_LOAF_BLOCK: Supplier;
    static readonly MAGMA_CAKE_BLOCK: Supplier;
    static readonly STUFFED_HOGLIN: Supplier;
    static readonly GOLDEN_TROPHY: Supplier;
    static readonly HOGLIN_TROPHY: Supplier;
    static readonly WAXED_HOGLIN_TROPHY: Supplier;
    static readonly ZOGLIN_TROPHY: Supplier;
    static readonly SKOGLIN_TROPHY: Supplier;
  }


  class MNDCreativeTab {
    static readonly TABS: DeferredRegister;
    static readonly MY_NETHERS_DELIGHT_TAB: DeferredHolder;
  }


  class MNDEffects {
    static readonly EFFECTS: DeferredRegister;
    static readonly GPUNGENT: Holder;
    static readonly BPUNGENT: Holder;
  }


  class MNDEnchantmentComponents {
    static readonly ENCHANTMENT_EFFECT_COMPONENTS: DeferredRegister;
    static readonly POACHING: Supplier;
  }


  class MNDEntityTypes {
    static readonly ENTITIES: DeferredRegister;
    static readonly STRIDER_ROCK: Supplier;
  }


  class MNDItems {
    static readonly ITEMS: DeferredRegister;
    static readonly NETHER_BRICKS_CABINET: Supplier;
    static readonly RED_NETHER_BRICKS_CABINET: Supplier;
    static readonly BLACKSTONE_BRICKS_CABINET: Supplier;
    static readonly NETHER_STOVE: Supplier;
    static readonly SOUL_NETHER_STOVE: Supplier;
    static readonly LETIOS_COMPOST: Supplier;
    static readonly RESURGENT_SOIL: Supplier;
    static readonly RESURGENT_SOIL_FARMLAND: Supplier;
    static readonly BULLET_PEPPER_CRATE: Supplier;
    static readonly POWDER_CANNON: Supplier;
    static readonly POWDERY_TORCH: Supplier;
    static readonly POWDERY_CABINET: Supplier;
    static readonly BLOCK_OF_POWDERY_CANNON: Supplier;
    static readonly BLOCK_OF_STRIPPED_POWDERY_CANNON: Supplier;
    static readonly POWDERY_PLANKS: Supplier;
    static readonly POWDERY_PLANKS_STAIRS: Supplier;
    static readonly POWDERY_PLANKS_SLAB: Supplier;
    static readonly POWDERY_MOSAIC: Supplier;
    static readonly POWDERY_MOSAIC_STAIRS: Supplier;
    static readonly POWDERY_MOSAIC_SLAB: Supplier;
    static readonly POWDERY_FENCE: Supplier;
    static readonly POWDERY_FENCE_GATE: Supplier;
    static readonly POWDERY_DOOR: Supplier;
    static readonly POWDERY_TRAPDOOR: Supplier;
    static readonly POWDERY_BUTTON: Supplier;
    static readonly POWDERY_PRESSURE_PLATE: Supplier;
    static readonly POWDERY_SIGN: Supplier;
    static readonly POWDERY_HANGING_SIGN: Supplier;
    static readonly WARPED_FUNGUS_COLONY: Supplier;
    static readonly CRIMSON_FUNGUS_COLONY: Supplier;
    static readonly STRIDER_ROCK: Supplier;
    static readonly STRIDER_EGG: Supplier;
    static readonly ENCHANTED_GOLDEN_EGG: Supplier;
    static readonly GOLDEN_EGG: Supplier;
    static readonly BOILED_EGG: Supplier;
    static readonly DEVILED_EGG: Supplier;
    static readonly SCOTCH_EGGS: Supplier;
    static readonly EGG_SOUP: Supplier;
    static readonly STRIDER_SLICE: Supplier;
    static readonly MINCED_STRIDER: Supplier;
    static readonly BLEEDING_TARTAR: Supplier;
    static readonly STRIDER_WITH_GRILLED_FUNGUS: Supplier;
    static readonly STRIDER_STEW: Supplier;
    static readonly CRIMSON_STROGANOFF: Supplier;
    static readonly STRIDERLOAF_BLOCK: Supplier;
    static readonly STRIDERLOAF: Supplier;
    static readonly COLD_STRIDERLOAF_BLOCK: Supplier;
    static readonly COLD_STRIDERLOAF: Supplier;
    static readonly HOGLIN_LOIN: Supplier;
    static readonly HOGLIN_SAUSAGE: Supplier;
    static readonly ROASTED_SAUSAGE: Supplier;
    static readonly HOTDOG: Supplier;
    static readonly HOTDOG_WITH_MIXED_SALAD: Supplier;
    static readonly HOTDOG_WITH_NETHER_SALAD: Supplier;
    static readonly SAUSAGE_AND_POTATOES: Supplier;
    static readonly BREAKFAST_SAMPLER: Supplier;
    static readonly COOKED_LOIN: Supplier;
    static readonly NETHER_BURGER: Supplier;
    static readonly BLUE_TENDERLOIN_STEAK: Supplier;
    static readonly RED_LOIN_STICK: Supplier;
    static readonly BACON_WRAPPED_SAUSAGE_STICK: Supplier;
    static readonly FRIED_HOGLIN_CHOP: Supplier;
    static readonly GHASTA: Supplier;
    static readonly TWISTED_GHASTA: Supplier;
    static readonly GIANT_TAKOYAKI: Supplier;
    static readonly FRIES_GHASTA: Supplier;
    static readonly SPICY_NOODLE_SOUP: Supplier;
    static readonly SPICY_COTTON: Supplier;
    static readonly GHASMATI: Supplier;
    static readonly GHAST_SALAD: Supplier;
    static readonly DRIED_GHAST_WITH_MILK: Supplier;
    static readonly SIZZLING_PUDDING: Supplier;
    static readonly TEAR_POPSICLE: Supplier;
    static readonly GHASTA_WITH_CREAM_BLOCK: Supplier;
    static readonly GHASTA_WITH_CREAM: Supplier;
    static readonly GHAST_DOUGH: Supplier;
    static readonly GHAST_SOURDOUGH: Supplier;
    static readonly SLICES_OF_BREAD: Supplier;
    static readonly TOASTS: Supplier;
    static readonly BREAD_LOAF_BLOCK: Supplier;
    static readonly BULLET_PEPPER: Supplier;
    static readonly PEPPER_POWDER: Supplier;
    static readonly STUFFED_PEPPER: Supplier;
    static readonly SPICY_SKEWER: Supplier;
    static readonly CHILIDOG: Supplier;
    static readonly SPICY_HOGLIN_STEW: Supplier;
    static readonly HOT_WINGS: Supplier;
    static readonly HOT_WINGS_BUCKET: Supplier;
    static readonly SPICY_CURRY: Supplier;
    static readonly ROCK_SOUP: Supplier;
    static readonly BURNT_ROLL: Supplier;
    static readonly MAGMA_CAKE: Supplier;
    static readonly MAGMA_CAKE_SLICE: Supplier;
    static readonly HOT_CREAM: Supplier;
    static readonly HOT_CREAM_CONE: Supplier;
    static readonly GOLDEN_TROPHY: Supplier;
    static readonly HOGLIN_TROPHY: Supplier;
    static readonly WAXED_HOGLIN_TROPHY: Supplier;
    static readonly ZOGLIN_TROPHY: Supplier;
    static readonly SKOGLIN_TROPHY: Supplier;
    static readonly HOGLIN_HIDE: Supplier;
    static readonly RAW_STUFFED_HOGLIN: Supplier;
    static readonly ROAST_STUFFED_HOGLIN: Supplier;
    static readonly ROAST_EAR: Supplier;
    static readonly PLATE_OF_STUFFED_HOGLIN_SNOUT: Supplier;
    static readonly PLATE_OF_STUFFED_HOGLIN_HAM: Supplier;
    static readonly PLATE_OF_STUFFED_HOGLIN: Supplier;
    static basicItem(): Properties;
    static bowlFoodItem(food: FoodProperties): Properties;
    static bucketFoodItem(food: FoodProperties): Properties;
    static foodItem(food: FoodProperties): Properties;
  }


  class MNDLootModifiers {
    static readonly LOOT_MODIFIERS: DeferredRegister;
    static readonly ESPECIAL_DROP: Supplier;
    static readonly REMPLACE_LOOT: Supplier;
  }

}

declare module 'com.soytutta.mynethersdelight.common.tag' {
  import { TagKey } from 'net.minecraft.tags';

  class CompatibilityTags {
    static readonly HORROR_LASAGNA_MEATS: TagKey;
    static readonly RAW_MEATS: TagKey;
  }


  class MNDTags {
    static readonly BLOCK_OF_POWDERY: TagKey;
    static readonly RESURGENT_SOIL_PLANT: TagKey;
    static readonly NOT_PROPAGATE_PLANT: TagKey;
    static readonly ABOVE_PROPAGATE_PLANT: TagKey;
    static readonly BELOW_PROPAGATE_PLANT: TagKey;
    static readonly LETIOS_ACTIVATORS: TagKey;
    static readonly LETIOS_FLAMES: TagKey;
    static readonly SHOWCASE_ACTIVATORS: TagKey;
    static readonly SHOWCASE_FLAMES: TagKey;
    static readonly STOVE_SOUL_FUEL: TagKey;
    static readonly STOVE_FIRE_FUEL: TagKey;
    static readonly HOGLIN_CURE: TagKey;
    static readonly HOGLIN_WAXED: TagKey;
    static readonly POWDERY_CANNON_PLANTABLE_ON: TagKey;
    static readonly POWDERY_CANE: TagKey;
    static readonly STUFFED_HOGLIN_ITEMS: TagKey;
    static readonly BOILED_EGG_CANDIDATE: TagKey;
    static readonly HOT_SPICE: TagKey;
    static readonly SPECIAL_HUNT: TagKey;
    static readonly POACHING_ENCHANTMENT: TagKey;
    static readonly LETEOS_BOOSTER: TagKey;
  }


  class MyCommonTags {
    static readonly FOODS_RICE_PASTA: TagKey;
    static readonly FOODS_RAW_GHAST: TagKey;
    static readonly FOODS_RAW_HOGLIN: TagKey;
    static readonly FOODS_COOKED_HOGLIN: TagKey;
    static readonly FOODS_COOKED_SAUSAGE: TagKey;
    static readonly FOODS_RAW_SAUSAGE: TagKey;
    static readonly FOODS_MAGMA_CUBE: TagKey;
    static readonly FOODS_BOILED_EGG: TagKey;
    static readonly FOODS_GIANT_TENTACLES: TagKey;
    static readonly FOODS_RAW_STRIDER: TagKey;
  }

}

declare module 'com.soytutta.mynethersdelight.common.utility' {
  import { EquipmentSlot } from 'net.minecraft.world.entity';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { List } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { FoodProperties } from 'net.minecraft.world.food';
  import { MutableComponent } from 'net.minecraft.network.chat';

  class EntityDropChanceAccessor {
    callDropCustomDeathLoot(var1: ServerLevel, var2: DamageSource, var3: boolean): void;
    callGenerateLoot(var1: DamageSource): ItemStack[];
    callGetEquipmentDropChance(var1: EquipmentSlot): number;
    callSetDropChance(var1: EquipmentSlot, var2: number): void;
  }


  class MNDFoodValues {
    static readonly STRIDER_EGG: FoodProperties;
    static readonly ENCHANTED_GOLDEN_EGG: FoodProperties;
    static readonly GOLDEN_EGG: FoodProperties;
    static readonly BOILED_EGG: FoodProperties;
    static readonly DEVILED_EGG: FoodProperties;
    static readonly SCOTCH_EGGS: FoodProperties;
    static readonly EGG_SOUP: FoodProperties;
    static readonly STRIDER_SLICE: FoodProperties;
    static readonly MINCED_STRIDER: FoodProperties;
    static readonly BLEEDING_TARTAR: FoodProperties;
    static readonly STRIDER_AND_GRILLED_FUNGUS: FoodProperties;
    static readonly STRIDER_STEW: FoodProperties;
    static readonly CRIMSON_STROGANOFF: FoodProperties;
    static readonly STRIDERLOAF: FoodProperties;
    static readonly COLD_STRIDERLOAF: FoodProperties;
    static readonly HOGLIN_LOIN: FoodProperties;
    static readonly HOGLIN_SAUSAGE: FoodProperties;
    static readonly ROASTED_SAUSAGE: FoodProperties;
    static readonly HOTDOG: FoodProperties;
    static readonly HOTDOG_WITH_MIXED_SALAD: FoodProperties;
    static readonly HOTDOG_WITH_NETHER_SALAD: FoodProperties;
    static readonly CHILIDOG: FoodProperties;
    static readonly SAUSAGE_AND_POTATOES: FoodProperties;
    static readonly BREAKFAST_SAMPLER: FoodProperties;
    static readonly COOKED_LOIN: FoodProperties;
    static readonly NETHER_BURGER: FoodProperties;
    static readonly BLUE_TENDERLOIN_STEAK: FoodProperties;
    static readonly RED_LOIN_STICK: FoodProperties;
    static readonly BACON_WRAPPED_SAUSAGE_STICK: FoodProperties;
    static readonly FRIED_HOGLIN_CHOP: FoodProperties;
    static readonly GHASTA: FoodProperties;
    static readonly TWISTED_GHASTA: FoodProperties;
    static readonly GIANT_TAKOYAKI: FoodProperties;
    static readonly FRIES_GHASTA: FoodProperties;
    static readonly GHAST_SALAD: FoodProperties;
    static readonly DRIED_GHAST_WITH_MILK: FoodProperties;
    static readonly SIZZLING_PUDDING: FoodProperties;
    static readonly TEAR_POPSICLE: FoodProperties;
    static readonly SPICY_NOODLE_SOUP: FoodProperties;
    static readonly SPICY_COTTON: FoodProperties;
    static readonly GHASTA_WITH_CREAM: FoodProperties;
    static readonly SLICES_OF_BREAD: FoodProperties;
    static readonly TOASTS: FoodProperties;
    static readonly BULLET_PEPPER: FoodProperties;
    static readonly STUFFED_PEPPER: FoodProperties;
    static readonly SPICY_SKEWER: FoodProperties;
    static readonly SPICY_HOGLIN_STEW: FoodProperties;
    static readonly HOT_WINGS: FoodProperties;
    static readonly HOT_WINGS_BUCKET: FoodProperties;
    static readonly SPICY_CURRY: FoodProperties;
    static readonly ROCK_SOUP: FoodProperties;
    static readonly BURNT_ROLL: FoodProperties;
    static readonly MAGMA_CAKE_SLICE: FoodProperties;
    static readonly ROAST_EAR: FoodProperties;
    static readonly PLATE_OF_STUFFED_HOGLIN_SNOUT: FoodProperties;
    static readonly PLATE_OF_STUFFED_HOGLIN_HAM: FoodProperties;
    static readonly PLATE_OF_STUFFED_HOGLIN: FoodProperties;
    static readonly HOT_CREAM_CONE: FoodProperties;
    static readonly HOT_CREAM: FoodProperties;
  }


  class MNDTextUtils {
    static getTranslation(key: string, ...args: any[]): MutableComponent;
  }

}

declare module 'com.soytutta.mynethersdelight.common.world.feature' {
  import { Feature, FeaturePlaceContext } from 'net.minecraft.world.level.levelgen.feature';
  import { NoneFeatureConfiguration } from 'net.minecraft.world.level.levelgen.feature.configurations';
  import { Codec } from 'com.mojang.serialization';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  interface PowderyCaneFeature extends Feature<NoneFeatureConfiguration> {}
  class PowderyCaneFeature extends Feature<NoneFeatureConfiguration> {
    constructor(config: Codec<NoneFeatureConfiguration>);
    static canGrowPowderyCane(state: BlockState): boolean;
    place(context: FeaturePlaceContext<NoneFeatureConfiguration>): boolean;
  }

}

declare module 'com.soytutta.mynethersdelight.core.data' {
  import { BlockStateProvider, ModelFile, ConfiguredModel } from 'net.neoforged.neoforge.client.model.generators';
  import { PackOutput } from 'net.minecraft.data';
  import { ExistingFileHelper, BlockTagsProvider, DataMapProvider, LanguageProvider } from 'net.neoforged.neoforge.common.data';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { FeastBlock } from 'vectorwing.farmersdelight.common.block';
  import { Block } from 'net.minecraft.world.level.block';
  import { IntegerProperty, Property } from 'net.minecraft.world.level.block.state.properties';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';
  import { GatherDataEvent } from 'net.neoforged.neoforge.data.event';
  import { ItemTagsProvider } from 'net.minecraft.data.tags';
  import { TagLookup } from 'TagsProvider';
  import { RecipeProvider } from 'net.minecraft.data.recipes';

  interface MNDBlockStates extends BlockStateProvider {}
  class MNDBlockStates extends BlockStateProvider {
    constructor(output: PackOutput, existingFileHelper: ExistingFileHelper);
    cabinetBlock(block: Block, woodType: string): void;
    crateBlock(block: Block, cropName: string): void;
    cubeRandomRotation(block: Block, suffix: string): ConfiguredModel[];
    existingModel(path: string): ModelFile;
    feastBlock(block: FeastBlock): void;
    hangingSignBlock(signBlock: Block, wallSignBlock: Block, texture: ResourceLocation): void;
    hangingSignBlock(signBlock: Block, wallSignBlock: Block, sign: ModelFile): void;
    resourceBlock(path: string): ResourceLocation;
    stageBlock(block: Block, ageProperty: IntegerProperty, ...ignored: Property<any>[]): void;
  }


  interface MNDBlockTags extends BlockTagsProvider {}
  class MNDBlockTags extends BlockTagsProvider {
    constructor(output: PackOutput, lookupProvider: CompletableFuture<Provider>, existingFileHelper: ExistingFileHelper);
  }


  class MNDDataGenerators {
    static gatherData(event: GatherDataEvent): void;
  }


  interface MNDDataMaps extends DataMapProvider {}
  class MNDDataMaps extends DataMapProvider {
  }


  interface MNDItemTags extends ItemTagsProvider {}
  class MNDItemTags extends ItemTagsProvider {
    constructor(output: PackOutput, provider: CompletableFuture<Provider>, blockTagProvider: CompletableFuture<TagLookup<Block>>, existingFileHelper: ExistingFileHelper);
    registerCompatibilityTags(): void;
  }


  interface MNDLang extends LanguageProvider {}
  class MNDLang extends LanguageProvider {
    constructor(output: PackOutput);
    correctBlockItemName(name: string): string;
    get name(): string;
    static toTitleCase(givenString: string, regex: string): string;
  }


  interface MNDRecipes extends RecipeProvider {}
  class MNDRecipes extends RecipeProvider {
    constructor(output: PackOutput, registries: CompletableFuture<Provider>);
  }

}

declare module 'com.soytutta.mynethersdelight.core.data.recipes' {
  import { RecipeOutput } from 'net.minecraft.data.recipes';

  class MNDCookingRecipes {
    static register(output: RecipeOutput): void;
  }


  class MNDCraftingRecipes {
    static register(output: RecipeOutput): void;
  }


  class MNDCuttingRecipes {
    static register(output: RecipeOutput): void;
  }


  class MNDSmeltingRecipes {
    static register(output: RecipeOutput): void;
  }

}

declare module 'com.soytutta.mynethersdelight.core.mixin' {
  import { EntityDropChanceAccessor } from 'com.soytutta.mynethersdelight.common.utility';
  import { List } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { LivingEntity, EntityType, EquipmentSlot } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { ServerLevel } from 'net.minecraft.server.level';

  class FrogEntityMixin {
  }


  class KeepResurgentSoilGiantTreeMixin {
  }


  class KeepResurgentSoilTreeMixin {
  }


  interface LivingEntityMixin extends EntityDropChanceAccessor {}
  class LivingEntityMixin extends EntityDropChanceAccessor {
    callGenerateLoot(damageSource: DamageSource): ItemStack[];
  }


  interface MobMixin extends EntityDropChanceAccessor, LivingEntity {}
  class MobMixin extends EntityDropChanceAccessor {
    constructor(entityType: EntityType<LivingEntity>, level: Level);
    callDropCustomDeathLoot(level: ServerLevel, damageSource: DamageSource, recentlyHit: boolean): void;
    callGetEquipmentDropChance(equipmentSlot: EquipmentSlot): number;
    callSetDropChance(equipmentSlot: EquipmentSlot, chance: number): void;
    setDropChance(var1: EquipmentSlot, var2: number): void;
  }


  class StriderEntityDataMixin {
  }


  interface StriderLogicMixin extends LivingEntity {}
  class StriderLogicMixin extends LivingEntity {
  }


  interface StriderVisualMixin extends LivingEntity {}
  class StriderVisualMixin extends LivingEntity {
  }

}

declare module 'com.soytutta.mynethersdelight.integration.jei.category' {
  import { IRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { ForgotingDummy } from 'com.soytutta.mynethersdelight.integration.jei.resource';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IGuiHelper } from 'mezz.jei.api.helpers';
  import { RecipeType, IFocusGroup } from 'mezz.jei.api.recipe';
  import { Component } from 'net.minecraft.network.chat';
  import { IDrawable } from 'mezz.jei.api.gui.drawable';
  import { IRecipeLayoutBuilder } from 'mezz.jei.api.gui.builder';
  import { IRecipeSlotsView } from 'mezz.jei.api.gui.ingredient';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { List } from 'java.util';

  interface ForgotingRecipeCategory extends IRecipeCategory<ForgotingDummy> {}
  class ForgotingRecipeCategory extends IRecipeCategory<ForgotingDummy> {
    static readonly UID: ResourceLocation;
    constructor(helper: IGuiHelper);
    draw(recipe: ForgotingDummy, recipeSlotsView: IRecipeSlotsView, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get background(): IDrawable;
    get icon(): IDrawable;
    get recipeType(): RecipeType<ForgotingDummy>;
    get title(): Component;
    getTooltipStrings(recipe: ForgotingDummy, recipeSlotsView: IRecipeSlotsView, mouseX: number, mouseY: number): Component[];
    setRecipe(builder: IRecipeLayoutBuilder, recipe: ForgotingDummy, focusGroup: IFocusGroup): void;
  }

}

declare module 'com.soytutta.mynethersdelight.integration.jei' {
  import { IModPlugin } from 'mezz.jei.api';
  import { IRecipeCategoryRegistration, IRecipeRegistration, IRecipeCatalystRegistration } from 'mezz.jei.api.registration';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RecipeType } from 'mezz.jei.api.recipe';

  interface JEIPlugin extends IModPlugin {}
  class JEIPlugin extends IModPlugin {
    get pluginUid(): ResourceLocation;
    registerCategories(registry: IRecipeCategoryRegistration): void;
    registerRecipeCatalysts(registration: IRecipeCatalystRegistration): void;
    registerRecipes(registration: IRecipeRegistration): void;
  }


  class MNDRecipeTypes {
    static readonly FORGOTING: RecipeType;
  }

}

declare module 'com.soytutta.mynethersdelight.integration.jei.resource' {
  class ForgotingDummy {
  }

}

declare module 'com.soytutta.mynethersdelight.integration.MinerDelight' {
  import { DeferredRegister, DeferredHolder } from 'net.neoforged.neoforge.registries';

  class MDItems {
    static readonly ITEMS: DeferredRegister;
    static readonly ROCK_SOUP_CUP: DeferredHolder;
    static readonly SPICY_HOGLIN_STEW_CUP: DeferredHolder;
    static readonly SPICY_NOODLE_SOUP_CUP: DeferredHolder;
    static readonly STRIDER_STEW_CUP: DeferredHolder;
    static readonly EGG_SOUP_CUP: DeferredHolder;
  }

}

declare module 'com.soytutta.mynethersdelight' {
  import { Logger } from 'org.apache.logging.log4j';
  import { IEventBus } from 'net.neoforged.bus.api';

  class MyNethersDelight {
    static readonly MODID: string;
    static readonly LOGGER: Logger;
    constructor(modEventBus: IEventBus);
  }

}