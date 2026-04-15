declare module 'org.dawnoftimebuilder.block.french' {
  import { WaterloggedBlock, ConnectedVerticalBlock } from 'org.dawnoftimebuilder.block.templates';
  import { DirectionProperty, BooleanProperty, EnumProperty } from 'net.minecraft.world.level.block.state.properties';
  import { Properties } from 'BlockBehaviour';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockGetter, Level, LevelAccessor } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { Rotation, Mirror } from 'net.minecraft.world.level.block';
  import { InteractionResult } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BlockHitResult } from 'net.minecraft.world.phys';
  import { RandomSource } from 'net.minecraft.util';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { TooltipContext } from 'Item';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  interface LimestoneGargoyleBlock extends WaterloggedBlock {}
  class LimestoneGargoyleBlock extends WaterloggedBlock {
    static readonly FACING: DirectionProperty;
    static readonly PERSISTENT: BooleanProperty;
    constructor(properties: Properties);
    animateTick(state: BlockState, world: Level, pos: BlockPos, rand: RandomSource): void;
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirrorIn: Mirror): BlockState;
    placeLiquid(world: LevelAccessor, pos: BlockPos, state: BlockState, fluid: FluidState): boolean;
    randomTick(state: BlockState, world: ServerLevel, pos: BlockPos, rand: RandomSource): void;
    rotate(state: BlockState, rot: Rotation): BlockState;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface ReinforcedIronFenceBlock extends ConnectedVerticalBlock {}
  class ReinforcedIronFenceBlock extends ConnectedVerticalBlock {
    static readonly FACING: DirectionProperty;
    static readonly SHAPE: EnumProperty;
    constructor(properties: Properties);
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirrorIn: Mirror): BlockState;
    rotate(state: BlockState, rot: Rotation): BlockState;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }

}

declare module 'org.dawnoftimebuilder.block.general' {
  import { WaterloggedBlock, ConnectedVerticalBlock, PlateBlock, BlockAA } from 'org.dawnoftimebuilder.block.templates';
  import { EnumProperty, BooleanProperty } from 'net.minecraft.world.level.block.state.properties';
  import { Properties } from 'BlockBehaviour';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockGetter, LevelAccessor, LevelReader, Level } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { InteractionResult } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BlockHitResult } from 'net.minecraft.world.phys';
  import { Projectile } from 'net.minecraft.world.entity.projectile';
  import { Entity, LivingEntity } from 'net.minecraft.world.entity';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { RandomSource } from 'net.minecraft.util';
  import { Rotation, Block, TransparentBlock as net_minecraft_world_level_block_TransparentBlock } from 'net.minecraft.world.level.block';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { TooltipContext } from 'Item';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { Builder } from 'StateDefinition';
  import { ServerLevel } from 'net.minecraft.server.level';

  interface FireplaceBlock extends WaterloggedBlock {}
  class FireplaceBlock extends WaterloggedBlock {
    static readonly HORIZONTAL_AXIS: EnumProperty;
    static readonly LIT: BooleanProperty;
    static readonly HORIZONTAL_CONNECTION: EnumProperty;
    constructor(properties: Properties);
    animateTick(stateIn: BlockState, worldIn: Level, pos: BlockPos, rand: RandomSource): void;
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    canSurvive(state: BlockState, worldIn: LevelReader, pos: BlockPos): boolean;
    entityInside(state: BlockState, world: Level, pos: BlockPos, entityIn: Entity): void;
    getCollisionShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    onProjectileHit(worldIn: Level, state: BlockState, hit: BlockHitResult, projectile: Projectile): void;
    placeLiquid(world: LevelAccessor, pos: BlockPos, state: BlockState, fluid: FluidState): boolean;
    rotate(state: BlockState, rot: Rotation): BlockState;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface IronColumnBlock extends ConnectedVerticalBlock {}
  class IronColumnBlock extends ConnectedVerticalBlock {
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    canBeReplaced(state: BlockState, useContext: BlockPlaceContext): boolean;
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    isConnectible(stateIn: BlockState, worldIn: LevelAccessor, pos: BlockPos, faceToConnect: Direction): boolean;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useWithoutItem(pState: BlockState, pLevel: Level, pPos: BlockPos, pPlayer: Player, pHit: BlockHitResult): InteractionResult;
  }


  interface IronFenceBlock extends PlateBlock {}
  class IronFenceBlock extends PlateBlock {
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    createBlockStateDefinition(builder: Builder<Block, BlockState>): void;
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface TransparentBlock extends net_minecraft_world_level_block_TransparentBlock {}
  class TransparentBlock extends net_minecraft_world_level_block_TransparentBlock {
    constructor(p_309186_: Properties);
  }


  interface WaterFlowingTrickleBlock extends WaterTrickleBlock {}
  class WaterFlowingTrickleBlock extends WaterTrickleBlock {
    constructor(propertiesIn: Properties);
    canBeReplaced(p_196253_1_: BlockState, p_196253_2_: BlockPlaceContext): boolean;
    updateShape(stateIn: BlockState, directionIn: Direction, facingStateIn: BlockState, worldIn: LevelAccessor, currentPosIn: BlockPos, facingPosIn: BlockPos): BlockState;
    updateWaterTrickle(world: Level, currentState: BlockState, bottomPos: BlockPos, bottomState: BlockState, aboveState: BlockState): BlockState;
  }


  interface WaterSourceTrickleBlock extends WaterTrickleBlock {}
  class WaterSourceTrickleBlock extends WaterTrickleBlock {
    constructor(propertiesIn: Properties);
    canBeReplaced(state: BlockState, context: BlockPlaceContext): boolean;
    getStateForPlacement(contextIn: BlockPlaceContext): BlockState;
    getWaterTrickleOutPut(currentState: BlockState): boolean[];
  }


  interface WaterTrickleBlock extends BlockAA {}
  class WaterTrickleBlock extends BlockAA {
    constructor(propertiesIn: Properties);
    animateTick(state: BlockState, worldIn: Level, pos: BlockPos, rand: RandomSource): void;
    createFlowingTrickle(currentState: BlockState, trickles: boolean[], world: Level, waterTricklePos: BlockPos): BlockState;
    getLightBlock(p_200011_1_In: BlockState, p_200011_2_In: BlockGetter, p_200011_3_In: BlockPos): number;
    getOcclusionShape(p_196247_1_In: BlockState, p_196247_2_In: BlockGetter, p_196247_3_In: BlockPos): VoxelShape;
    getShadeBrightness(p_220080_1_: BlockState, p_220080_2_: BlockGetter, p_220080_3_: BlockPos): number;
    getWaterTrickleOutPut(currentState: BlockState): boolean[];
    inheritWaterTrickles(currentState: BlockState, aboveState: BlockState): BlockState;
    propagatesSkylightDown(p_200123_1_In: BlockState, p_200123_2_In: BlockGetter, p_200123_3_In: BlockPos): boolean;
    setPlacedBy(pLevel: Level, pPos: BlockPos, pState: BlockState, pPlacer: LivingEntity, pStack: ItemStack): void;
    tick(state: BlockState, world: ServerLevel, pos: BlockPos, rand: RandomSource): void;
    updateShape(stateIn: BlockState, directionIn: Direction, facingStateIn: BlockState, worldIn: LevelAccessor, currentPosIn: BlockPos, facingPosIn: BlockPos): BlockState;
    updateWaterTrickle(world: Level, currentState: BlockState, bottomPos: BlockPos, bottomState: BlockState, aboveState: BlockState): BlockState;
    useShapeForLightOcclusion(p_220074_1_In: BlockState): boolean;
  }

}

declare module 'org.dawnoftimebuilder.block.german' {
  import { BlockAA, SidedWindowBlock, HorizontalBlockAA, CandleLampBlock } from 'org.dawnoftimebuilder.block.templates';
  import { Properties } from 'BlockBehaviour';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { LevelReader, BlockGetter, LevelAccessor, Level, WorldGenLevel } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { IBlockGeneration, IBlockChain } from 'org.dawnoftimebuilder.block';
  import { BooleanProperty, IntegerProperty } from 'net.minecraft.world.level.block.state.properties';
  import { CollisionContext, VoxelShape } from 'net.minecraft.world.phys.shapes';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { RandomSource } from 'net.minecraft.util';
  import { InteractionResult } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BlockHitResult } from 'net.minecraft.world.phys';
  import { ItemStack, TooltipFlag, DyeColor } from 'net.minecraft.world.item';
  import { TooltipContext } from 'Item';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { BedBlock } from 'net.minecraft.world.level.block';
  import { LivingEntity } from 'net.minecraft.world.entity';

  interface GeraniumBlock extends BlockAA {}
  class GeraniumBlock extends BlockAA {
    constructor(properties: Properties);
    canSurvive(state: BlockState, worldIn: LevelReader, pos: BlockPos): boolean;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
  }


  interface IvyBlock extends IBlockGeneration, BlockAA {}
  class IvyBlock extends IBlockGeneration {
    static readonly NORTH: BooleanProperty;
    static readonly EAST: BooleanProperty;
    static readonly SOUTH: BooleanProperty;
    static readonly WEST: BooleanProperty;
    static readonly PERSISTENT: BooleanProperty;
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    canBeReplaced(state: BlockState, useContext: BlockPlaceContext): boolean;
    generateOnPos(world: WorldGenLevel, pos: BlockPos, state: BlockState, random: RandomSource): boolean;
    getShapeIndex(state: BlockState, levelIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    isRandomlyTicking(state: BlockState): boolean;
    tick(state: BlockState, levelIn: ServerLevel, pos: BlockPos, random: RandomSource): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, levelIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useWithoutItem(state: BlockState, levelIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface LatticeStoneBricksWindowBlock extends SidedWindowBlock {}
  class LatticeStoneBricksWindowBlock extends SidedWindowBlock {
    constructor(properties: Properties);
    getShape(state: BlockState, world: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getShape(index: number): VoxelShape;
  }


  interface WaxedOakCanopyBedBlock extends BedBlock {}
  class WaxedOakCanopyBedBlock extends BedBlock {
    constructor(pColor: DyeColor, pProperties: Properties);
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    setPlacedBy(level: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
  }


  interface WaxedOakCanopyBedWoodBlock extends HorizontalBlockAA {}
  class WaxedOakCanopyBedWoodBlock extends HorizontalBlockAA {
    static readonly MULTIBLOCK_X: IntegerProperty;
    static readonly MULTIBLOCK_Y: IntegerProperty;
    static readonly MULTIBLOCK_Z: IntegerProperty;
    constructor(properties: Properties);
    static getMultiblockState(defaultState: BlockState, x: number, y: number, z: number): BlockState;
    onRemove(pState: BlockState, pLevel: Level, pPos: BlockPos, pNewState: BlockState, pMovedByPiston: boolean): void;
    playerWillDestroy(worldIn: Level, blockPosIn: BlockPos, blockStateIn: BlockState, playerEntityIn: Player): BlockState;
    updateShape(pState: BlockState, pDirection: Direction, pNeighborState: BlockState, pLevel: LevelAccessor, pPos: BlockPos, pNeighborPos: BlockPos): BlockState;
  }


  interface WaxedOakChandelierBlock extends IBlockChain, CandleLampBlock {}
  class WaxedOakChandelierBlock extends IBlockChain {
    constructor(properties: Properties);
    animateTick(stateIn: BlockState, worldIn: Level, pos: BlockPos, rand: RandomSource): void;
    canConnectToChainUnder(state: BlockState): boolean;
  }

}

declare module 'org.dawnoftimebuilder.block' {
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { PillarConnection } from 'org.dawnoftimebuilder.util.BlockStatePropertiesAA';
  import { Level, LevelAccessor, WorldGenLevel, BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';
  import { Player } from 'net.minecraft.world.entity.player';
  import { InteractionHand, InteractionResult } from 'net.minecraft.world';
  import { ItemStack } from 'net.minecraft.world.item';

  interface IBlockChain extends IBlockPillar {}
  class IBlockChain extends IBlockPillar {
    static canBeChained(state: BlockState, tryConnectUnder: boolean): boolean;
    canConnectToChainAbove(state: BlockState): boolean;
    canConnectToChainUnder(state: BlockState): boolean;
    getBlockPillarConnectionAbove(state: BlockState): PillarConnection;
    getBlockPillarConnectionUnder(state: BlockState): PillarConnection;
  }


  class IBlockClimbingPlant {
    canHavePlant(state: BlockState): boolean;
    canSustainClimbingPlant(stateUnder: BlockState): boolean;
    dropPlant(stateIn: BlockState, worldIn: LevelAccessor, pos: BlockPos, heldItemStack: ItemStack, bool: boolean): boolean;
    harvestPlant(stateIn: BlockState, worldIn: Level, pos: BlockPos, player: Player, handIn: InteractionHand): InteractionResult;
    placePlant(state: BlockState, world: Level, pos: BlockPos, option: number): void;
    removePlant(stateIn: BlockState, worldIn: LevelAccessor, pos: BlockPos, heldItemStack: ItemStack): BlockState;
    tickPlant(stateIn: BlockState, worldIn: Level, pos: BlockPos, random: RandomSource): void;
    tryPlacingPlant(stateIn: BlockState, worldIn: Level, pos: BlockPos, player: Player, handIn: InteractionHand): boolean;
    tryRemovingPlant(stateIn: BlockState, worldIn: Level, pos: BlockPos, heldItemStack: ItemStack): InteractionResult;
  }


  class IBlockGeneration {
    generateOnPos(var1: WorldGenLevel, var2: BlockPos, var3: BlockState, var4: RandomSource): boolean;
  }


  class IBlockPillar {
    getBlockPillarConnectionAbove(var1: BlockState): PillarConnection;
    getBlockPillarConnectionUnder(state: BlockState): PillarConnection;
    static getPillarConnectionAbove(worldIn: LevelAccessor, pos: BlockPos): PillarConnection;
    static getPillarConnectionUnder(worldIn: LevelAccessor, pos: BlockPos): PillarConnection;
  }


  class IBlockSpecialDisplay {
    emitsLight(): boolean;
    get displayScale(): number;
  }


  class IFlammable {
    getFireSpreadSpeed(var1: BlockState, var2: BlockGetter, var3: BlockPos, var4: Direction): number;
    getFlammability(var1: BlockState, var2: BlockGetter, var3: BlockPos, var4: Direction): number;
  }

}

declare module 'org.dawnoftimebuilder.block.japanese' {
  import { PaneBlockAA, WaterloggedBlock, CandleLampBlock, BlockAA, BushBlockDoT, DoubleGrowingBushBlock, ConnectedVerticalBlock, SpecialDisplayBlock, DisplayerBlock } from 'org.dawnoftimebuilder.block.templates';
  import { Properties } from 'BlockBehaviour';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockGetter, Level, LevelAccessor, LevelReader, WorldGenLevel } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { Builder } from 'StateDefinition';
  import { Block, FenceBlock, Rotation, Mirror, BedBlock, RenderShape, BonemealableBlock } from 'net.minecraft.world.level.block';
  import { InteractionResult } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BlockHitResult } from 'net.minecraft.world.phys';
  import { ItemStack, TooltipFlag, DyeColor } from 'net.minecraft.world.item';
  import { TooltipContext } from 'Item';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { DirectionProperty, BooleanProperty, EnumProperty, IntegerProperty } from 'net.minecraft.world.level.block.state.properties';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { RandomSource } from 'net.minecraft.util';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { PlantType } from 'org.dawnoftimebuilder.block.templates.SoilCropsBlock';
  import { IBlockSpecialDisplay, IBlockChain } from 'org.dawnoftimebuilder.block';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';

  interface CharredSpruceFancyRailingBlock extends PaneBlockAA {}
  class CharredSpruceFancyRailingBlock extends PaneBlockAA {
    constructor(properties: Properties);
    createBlockStateDefinition(builder: Builder<Block, BlockState>): void;
    getCollisionShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
  }


  interface CharredSpruceRailingBlock extends FenceBlock {}
  class CharredSpruceRailingBlock extends FenceBlock {
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    canBeReplaced(state: BlockState, useContext: BlockPlaceContext): boolean;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface CharredSpruceShuttersBlock extends WaterloggedBlock {}
  class CharredSpruceShuttersBlock extends WaterloggedBlock {
    static readonly FACING: DirectionProperty;
    static readonly POWERED: BooleanProperty;
    static readonly OPEN: BooleanProperty;
    constructor(properties: Properties, shapes: VoxelShape[]);
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirrorIn: Mirror): BlockState;
    neighborChanged(state: BlockState, worldIn: Level, pos: BlockPos, blockIn: Block, fromPos: BlockPos, isMoving: boolean): void;
    propagatesSkylightDown(state: BlockState, reader: BlockGetter, pos: BlockPos): boolean;
    rotate(state: BlockState, rot: Rotation): BlockState;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface CharredSpruceTallShuttersBlock extends CharredSpruceShuttersBlock {}
  class CharredSpruceTallShuttersBlock extends CharredSpruceShuttersBlock {
    static readonly CORNER: EnumProperty;
    constructor(properties: Properties);
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    playerWillDestroy(level: Level, pos: BlockPos, state: BlockState, player: Player): BlockState;
    setPlacedBy(worldIn: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }


  interface FutonBlock extends BedBlock {}
  class FutonBlock extends BedBlock {
    constructor(colorIn: DyeColor, properties: Properties);
    getRenderShape(p_149645_1_: BlockState): RenderShape;
    getShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
  }


  interface IroriFireplaceBlock extends CandleLampBlock {}
  class IroriFireplaceBlock extends CandleLampBlock {
    constructor(properties: Properties);
    animateTick(stateIn: BlockState, worldIn: Level, pos: BlockPos, rand: RandomSource): void;
    emitsLight(): boolean;
    get displayScale(): number;
  }


  interface LittleFlagBlock extends PaneBlockAA {}
  class LittleFlagBlock extends PaneBlockAA {
    static readonly AXIS_Y: BooleanProperty;
    constructor(properties: Properties);
    getCollisionShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }


  interface MapleLeavesBlock extends BlockAA {}
  class MapleLeavesBlock extends BlockAA {
    static readonly MULTIBLOCK_X: IntegerProperty;
    static readonly MULTIBLOCK_Y: IntegerProperty;
    static readonly MULTIBLOCK_Z: IntegerProperty;
    constructor(properties: Properties);
    getBlockSupportShape(p_230335_1_: BlockState, p_230335_2_: BlockGetter, p_230335_3_: BlockPos): VoxelShape;
    getShadeBrightness(p_220080_1_: BlockState, p_220080_2_: BlockGetter, p_220080_3_: BlockPos): number;
    getShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getShape(index: number): VoxelShape;
    playerWillDestroy(worldIn: Level, blockPosIn: BlockPos, blockStateIn: BlockState, playerEntityIn: Player): BlockState;
    propagatesSkylightDown(p_200123_1_: BlockState, p_200123_2_: BlockGetter, p_200123_3_: BlockPos): boolean;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useShapeForLightOcclusion(p_220074_1_In: BlockState): boolean;
  }


  interface MapleSaplingBlock extends BonemealableBlock, BushBlockDoT {}
  class MapleSaplingBlock extends BonemealableBlock {
    static readonly STAGE: IntegerProperty;
    constructor(properties: Properties);
    advanceTree(level: ServerLevel, pos: BlockPos, state: BlockState): void;
    generateOnPos(world: WorldGenLevel, pos: BlockPos, state: BlockState, random: RandomSource): boolean;
    getShadeBrightness(p_220080_1_: BlockState, p_220080_2_: BlockGetter, p_220080_3_: BlockPos): number;
    isBonemealSuccess(p_180670_1_: Level, p_180670_2_: RandomSource, p_180670_3_: BlockPos, p_180670_4_: BlockState): boolean;
    isRandomlyTicking(blockstateIn: BlockState): boolean;
    isValidBonemealTarget(levelReader: LevelReader, blockPos: BlockPos, blockState: BlockState): boolean;
    static isValidForPlacement(worldIn: LevelAccessor, bottomCenterIn: BlockPos): boolean;
    performBonemeal(level: ServerLevel, source: RandomSource, pos: BlockPos, state: BlockState): void;
    static placeFinalTreeIfPossible(worldIn: LevelAccessor, centerPosIn: BlockPos): boolean;
    propagatesSkylightDown(p_200123_1_: BlockState, p_200123_2_: BlockGetter, p_200123_3_: BlockPos): boolean;
    tick(state: BlockState, level: ServerLevel, pos: BlockPos, source: RandomSource): void;
    useShapeForLightOcclusion(p_220074_1_In: BlockState): boolean;
    useWithoutItem(p_225533_1_In: BlockState, p_225533_2_In: Level, p_225533_3_In: BlockPos, p_225533_4_In: Player, p_225533_6_In: BlockHitResult): InteractionResult;
  }


  interface MapleTrunkBlock extends BlockAA {}
  class MapleTrunkBlock extends BlockAA {
    static readonly FACING: DirectionProperty;
    constructor(properties: Properties);
    getBlockSupportShape(p_230335_1_: BlockState, p_230335_2_: BlockGetter, p_230335_3_: BlockPos): VoxelShape;
    getShadeBrightness(p_220080_1_: BlockState, p_220080_2_: BlockGetter, p_220080_3_: BlockPos): number;
    getShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getShape(index: number): VoxelShape;
    playerWillDestroy(worldIn: Level, blockPosIn: BlockPos, blockStateIn: BlockState, playerEntityIn: Player): BlockState;
    propagatesSkylightDown(p_200123_1_: BlockState, p_200123_2_: BlockGetter, p_200123_3_: BlockPos): boolean;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useShapeForLightOcclusion(p_220074_1_In: BlockState): boolean;
  }


  interface MulberryBlock extends DoubleGrowingBushBlock {}
  class MulberryBlock extends DoubleGrowingBushBlock {
    constructor(plantType: PlantType, cutAge: number, growingAge: number);
    isRandomlyTicking(blockState: BlockState): boolean;
    randomTick(state: BlockState, worldIn: ServerLevel, pos: BlockPos, random: RandomSource): void;
  }


  interface PaperLampBlock extends IBlockSpecialDisplay, ConnectedVerticalBlock {}
  class PaperLampBlock extends IBlockSpecialDisplay {
    constructor(properties: Properties);
    emitsLight(): boolean;
    get displayScale(): number;
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
  }


  interface PaperLanternBlock extends SpecialDisplayBlock {}
  class PaperLanternBlock extends SpecialDisplayBlock {
    constructor(properties: Properties);
    emitsLight(): boolean;
  }


  interface PausedMapleSaplingBlock extends BushBlockDoT {}
  class PausedMapleSaplingBlock extends BushBlockDoT {
    constructor(properties: Properties);
    getShadeBrightness(p_220080_1_: BlockState, p_220080_2_: BlockGetter, p_220080_3_: BlockPos): number;
    propagatesSkylightDown(p_200123_1_: BlockState, p_200123_2_: BlockGetter, p_200123_3_: BlockPos): boolean;
    useShapeForLightOcclusion(p_220074_1_In: BlockState): boolean;
    useWithoutItem(p_225533_1_In: BlockState, p_225533_2_In: Level, p_225533_3_In: BlockPos, p_225533_4_In: Player, p_225533_6_In: BlockHitResult): InteractionResult;
  }


  interface SmallTatamiFloorBlock extends BlockAA {}
  class SmallTatamiFloorBlock extends BlockAA {
    static readonly HORIZONTAL_AXIS: EnumProperty;
    constructor(properties: Properties);
    playerDestroy(worldIn: Level, player: Player, pos: BlockPos, state: BlockState, te: BlockEntity, stack: ItemStack): void;
    rotate(state: BlockState, rot: Rotation): BlockState;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface SmallTatamiMatBlock extends IBlockChain, WaterloggedBlock {}
  class SmallTatamiMatBlock extends IBlockChain {
    static readonly HORIZONTAL_AXIS: EnumProperty;
    static readonly ATTACHED: BooleanProperty;
    static readonly ROLLED: BooleanProperty;
    static readonly STACK: IntegerProperty;
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    canBeReplaced(state: BlockState, useContext: BlockPlaceContext): boolean;
    canConnectToChainAbove(state: BlockState): boolean;
    canConnectToChainUnder(state: BlockState): boolean;
    canSurvive(state: BlockState, worldIn: LevelReader, pos: BlockPos): boolean;
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    rotate(state: BlockState, rot: Rotation): BlockState;
    setPlacedBy(worldIn: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface SpruceLowTableBlock extends DisplayerBlock {}
  class SpruceLowTableBlock extends DisplayerBlock {
    static readonly HORIZONTAL_AXIS: EnumProperty;
    constructor(properties: Properties);
    getDisplayerX(state: BlockState): number;
    getDisplayerY(state: BlockState): number;
    getDisplayerZ(state: BlockState): number;
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    rotate(state: BlockState, rot: Rotation): BlockState;
  }


  interface StickBundleBlock extends IBlockChain, BlockAA {}
  class StickBundleBlock extends IBlockChain {
    static readonly HALF: EnumProperty;
    constructor(properties: Properties);
    canConnectToChainUnder(state: BlockState): boolean;
    canSurvive(state: BlockState, worldIn: LevelReader, pos: BlockPos): boolean;
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    isRandomlyTicking(state: BlockState): boolean;
    playerWillDestroy(level: Level, pos: BlockPos, state: BlockState, player: Player): BlockState;
    setPlacedBy(worldIn: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface TatamiFloorBlock extends BlockAA {}
  class TatamiFloorBlock extends BlockAA {
    static readonly FACING: DirectionProperty;
    static readonly HALF: EnumProperty;
    constructor(properties: Properties);
    mirror(state: BlockState, mirrorIn: Mirror): BlockState;
    playerWillDestroy(worldIn: Level, pos: BlockPos, state: BlockState, player: Player): BlockState;
    rotate(state: BlockState, rot: Rotation): BlockState;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface TatamiMatBlock extends WaterloggedBlock {}
  class TatamiMatBlock extends WaterloggedBlock {
    static readonly HALF: EnumProperty;
    static readonly FACING: DirectionProperty;
    static readonly ROLLED: BooleanProperty;
    static readonly STACK: IntegerProperty;
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    canBeReplaced(state: BlockState, useContext: BlockPlaceContext): boolean;
    canSurvive(state: BlockState, worldIn: LevelReader, pos: BlockPos): boolean;
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirrorIn: Mirror): BlockState;
    rotate(state: BlockState, rot: Rotation): BlockState;
    setPlacedBy(worldIn: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }

}

declare module 'org.dawnoftimebuilder.block.persian' {
  import { ConnectedVerticalBlock } from 'org.dawnoftimebuilder.block.templates';
  import { Properties } from 'BlockBehaviour';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { InteractionResult } from 'net.minecraft.world';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BlockHitResult } from 'net.minecraft.world.phys';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { TooltipContext } from 'Item';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  interface MoraqMosaicColumnBlock extends ConnectedVerticalBlock {}
  class MoraqMosaicColumnBlock extends ConnectedVerticalBlock {
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }

}

declare module 'org.dawnoftimebuilder.block.precolumbian' {
  import { WaterloggedBlock, WildPlantBlock } from 'org.dawnoftimebuilder.block.templates';
  import { Properties } from 'BlockBehaviour';
  import { InteractionResult } from 'net.minecraft.world';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level, LevelAccessor, BlockGetter, LevelReader, WorldGenLevel } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BlockHitResult } from 'net.minecraft.world.phys';
  import { Projectile } from 'net.minecraft.world.entity.projectile';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { RandomSource } from 'net.minecraft.util';
  import { IBlockGeneration } from 'org.dawnoftimebuilder.block';
  import { EnumProperty } from 'net.minecraft.world.level.block.state.properties';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { ItemStack } from 'net.minecraft.world.item';

  interface PlasteredStoneCressetBlock extends WaterloggedBlock {}
  class PlasteredStoneCressetBlock extends WaterloggedBlock {
    constructor(properties: Properties);
    animateTick(stateIn: BlockState, worldIn: Level, pos: BlockPos, rand: RandomSource): void;
    isRandomlyTicking(state: BlockState): boolean;
    onProjectileHit(worldIn: Level, state: BlockState, hit: BlockHitResult, projectile: Projectile): void;
    placeLiquid(world: LevelAccessor, pos: BlockPos, state: BlockState, fluid: FluidState): boolean;
    tick(state: BlockState, worldIn: ServerLevel, pos: BlockPos, rand: RandomSource): void;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface WildMaizeBlock extends IBlockGeneration, WildPlantBlock {}
  class WildMaizeBlock extends IBlockGeneration {
    static readonly HALF: EnumProperty;
    constructor(properties: Properties);
    canSurvive(state: BlockState, worldIn: LevelReader, pos: BlockPos): boolean;
    generateOnPos(world: WorldGenLevel, pos: BlockPos, state: BlockState, random: RandomSource): boolean;
    getShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getShape(index: number): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    playerWillDestroy(level: Level, pos: BlockPos, state: BlockState, player: Player): BlockState;
    setPlacedBy(worldIn: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }

}

declare module 'org.dawnoftimebuilder.block.roman' {
  import { ChairBlock, BlockAA, ConnectedVerticalBlock, WaterloggedBlock } from 'org.dawnoftimebuilder.block.templates';
  import { Properties } from 'BlockBehaviour';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { InteractionResult } from 'net.minecraft.world';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level, LevelAccessor, BlockGetter, LevelReader, WorldGenLevel } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BlockHitResult } from 'net.minecraft.world.phys';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { IBlockGeneration, IBlockPillar } from 'org.dawnoftimebuilder.block';
  import { IntegerProperty, BooleanProperty, DirectionProperty } from 'net.minecraft.world.level.block.state.properties';
  import { RandomSource } from 'net.minecraft.util';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { TooltipContext } from 'Item';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { PillarConnection } from 'org.dawnoftimebuilder.util.BlockStatePropertiesAA';

  interface BirchCouchBlock extends ChairBlock {}
  class BirchCouchBlock extends ChairBlock {
    constructor(properties: Properties, pixelsYOffset: number, shapes: VoxelShape[]);
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    playerWillDestroy(level: Level, pos: BlockPos, state: BlockState, player: Player): BlockState;
    setPlacedBy(worldIn: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface BirchFootstoolBlock extends ChairBlock {}
  class BirchFootstoolBlock extends ChairBlock {
    constructor(properties: Properties, pixelsYOffset: number);
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
  }


  interface CypressBlock extends IBlockGeneration, BlockAA {}
  class CypressBlock extends IBlockGeneration {
    static readonly SIZE: IntegerProperty;
    constructor(properties: Properties);
    animateTick(stateIn: BlockState, worldIn: Level, pos: BlockPos, rand: RandomSource): void;
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    canSurvive(state: BlockState, worldIn: LevelReader, pos: BlockPos): boolean;
    generateOnPos(world: WorldGenLevel, pos: BlockPos, state: BlockState, random: RandomSource): boolean;
    getBlockSupportShape(p_230335_1_: BlockState, p_230335_2_: BlockGetter, p_230335_3_: BlockPos): VoxelShape;
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    randomTick(state: BlockState, level: ServerLevel, pos: BlockPos, source: RandomSource): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface MarbleColumnBlock extends IBlockPillar, ConnectedVerticalBlock {}
  class MarbleColumnBlock extends IBlockPillar {
    static readonly AXIS_X: BooleanProperty;
    constructor(properties: Properties);
    getBlockPillarConnectionAbove(state: BlockState): PillarConnection;
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    isConnectible(stateIn: BlockState, worldIn: LevelAccessor, pos: BlockPos, faceToConnect: Direction): boolean;
  }


  interface MarbleStatueBlock extends WaterloggedBlock {}
  class MarbleStatueBlock extends WaterloggedBlock {
    static readonly FACING: DirectionProperty;
    static readonly MULTIBLOCK: IntegerProperty;
    constructor(properties: Properties);
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    playerWillDestroy(worldIn: Level, blockPosIn: BlockPos, blockStateIn: BlockState, playerEntityIn: Player): BlockState;
    setPlacedBy(worldIn: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }


  interface SandstoneColumnBlock extends IBlockPillar, ConnectedVerticalBlock {}
  class SandstoneColumnBlock extends IBlockPillar {
    constructor(properties: Properties);
    getBlockPillarConnectionAbove(state: BlockState): PillarConnection;
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    isConnectible(stateIn: BlockState, worldIn: LevelAccessor, pos: BlockPos, faceToConnect: Direction): boolean;
  }

}

declare module 'org.dawnoftimebuilder.block.templates' {
  import { EnumProperty, BooleanProperty, DirectionProperty, BlockSetType, IntegerProperty, WoodType } from 'net.minecraft.world.level.block.state.properties';
  import { Properties } from 'BlockBehaviour';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockGetter, Level, LevelAccessor, WorldGenLevel, LevelReader } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { IBlockPillar, IBlockClimbingPlant, IFlammable, IBlockGeneration, IBlockSpecialDisplay, IBlockChain } from 'org.dawnoftimebuilder.block';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { ItemStack, TooltipFlag, Item } from 'net.minecraft.world.item';
  import { RandomSource } from 'net.minecraft.util';
  import { InteractionResult } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BlockHitResult } from 'net.minecraft.world.phys';
  import { PillarConnection, VerticalConnection, HorizontalConnection } from 'org.dawnoftimebuilder.util.BlockStatePropertiesAA';
  import { TooltipContext } from 'Item';
  import { List, Map } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { Block, BushBlock, Rotation, Mirror, SimpleWaterloggedBlock, StairBlock, TrapDoorBlock, EntityBlock, DoorBlock, HorizontalDirectionalBlock, IronBarsBlock, RotatedPillarBlock, SlabBlock, CropBlock, FenceGateBlock } from 'net.minecraft.world.level.block';
  import { MapCodec } from 'com.mojang.serialization';
  import { Projectile } from 'net.minecraft.world.entity.projectile';
  import { FluidState, Fluid } from 'net.minecraft.world.level.material';
  import { PathComputationType } from 'net.minecraft.world.level.pathfinder';
  import { BlockEntity, BlockEntityTicker, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { PlantType } from 'org.dawnoftimebuilder.block.templates.SoilCropsBlock';
  import { WaterSourceTrickleBlock } from 'org.dawnoftimebuilder.block.general';
  import { Supplier } from 'java.util.function';
  import { EnumActivatorState } from 'org.dawnoftimebuilder.block.templates.PoolBlock';

  interface AxisChimneyBlock extends ChimneyBlockAA {}
  class AxisChimneyBlock extends ChimneyBlockAA {
    static readonly HORIZONTAL_AXIS: EnumProperty;
    constructor(properties: Properties, shapes: VoxelShape[]);
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
  }


  interface BeamBlock extends IBlockPillar, IBlockClimbingPlant, WaterloggedBlock {}
  class BeamBlock extends IBlockPillar {
    static readonly BOTTOM: BooleanProperty;
    static readonly AXIS_X: BooleanProperty;
    static readonly AXIS_Y: BooleanProperty;
    static readonly AXIS_Z: BooleanProperty;
    static readonly CLIMBING_PLANT: EnumProperty;
    static readonly PERSISTENT: BooleanProperty;
    constructor(properties: Properties, shapes: VoxelShape[]);

    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    canBeReplaced(state: BlockState, useContext: BlockPlaceContext): boolean;
    canHavePlant(state: BlockState): boolean;
    getBlockPillarConnectionAbove(state: BlockState): PillarConnection;
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    isBeamBottom(state: BlockState, stateUnder: BlockState): boolean;
    isRandomlyTicking(state: BlockState): boolean;
    randomTick(state: BlockState, worldIn: ServerLevel, pos: BlockPos, random: RandomSource): void;
    spawnAfterBreak(state: BlockState, worldIn: ServerLevel, pos: BlockPos, stack: ItemStack, p_222953_: boolean): void;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface BlockAA extends IFlammable, Block {}
  class BlockAA extends IFlammable {
    constructor(properties: Properties, shapes: VoxelShape[]);

    constructor(properties: Properties);
    getFireSpreadSpeed(state: BlockState, level: BlockGetter, pos: BlockPos, direction: Direction): number;
    getFlammability(state: BlockState, level: BlockGetter, pos: BlockPos, direction: Direction): number;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getShape(index: number): VoxelShape;
    getShapeIndex(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    setBurnable(): Block;
    setBurnable(fireSpreadSpeed: number, fireDestructionSpeed: number): Block;
  }


  interface BottomPaneBlock extends PillarPaneBlock {}
  class BottomPaneBlock extends PillarPaneBlock {
    constructor(propertiesIn: Properties);
    getStateForPlacement(contextIn: BlockPlaceContext): BlockState;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }


  interface BushBlockDoT extends IBlockGeneration, IFlammable, BushBlock {}
  class BushBlockDoT extends IBlockGeneration {
    static readonly CODEC: MapCodec;
    constructor(properties: Properties);

    constructor(properties: Properties, shapes: VoxelShape[]);
    generateOnPos(world: WorldGenLevel, pos: BlockPos, state: BlockState, random: RandomSource): boolean;
    getFireSpreadSpeed(state: BlockState, world: BlockGetter, pos: BlockPos, face: Direction): number;
    getFlammability(state: BlockState, world: BlockGetter, pos: BlockPos, face: Direction): number;
    getShape(pState: BlockState, pLevel: BlockGetter, pPos: BlockPos, pContext: CollisionContext): VoxelShape;
    setBurnable(): Block;
    setBurnable(fireSpreadSpeed: number, fireDestructionSpeed: number): Block;
  }


  interface CandleLampBlock extends IBlockSpecialDisplay, WaterloggedBlock {}
  class CandleLampBlock extends IBlockSpecialDisplay {
    static readonly LIT: BooleanProperty;
    constructor(properties: Properties, shapes: VoxelShape[]);
    animateLitCandle(stateIn: BlockState, worldIn: Level, pos: BlockPos, x: number, y: number, z: number): void;
    emitsLight(): boolean;
    onProjectileHit(worldIn: Level, state: BlockState, hit: BlockHitResult, projectile: Projectile): void;
    placeLiquid(world: LevelAccessor, pos: BlockPos, state: BlockState, fluid: FluidState): boolean;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface CandlestickBlock extends IBlockSpecialDisplay, CandleLampBlock {}
  class CandlestickBlock extends IBlockSpecialDisplay {
    static readonly FACING: DirectionProperty;
    constructor(properties: Properties, shapes: VoxelShape[]);
    animateTick(stateIn: BlockState, worldIn: Level, pos: BlockPos, rand: RandomSource): void;
    get displayScale(): number;
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirrorIn: Mirror): BlockState;
    rotate(state: BlockState, rot: Rotation): BlockState;
  }


  interface CappedWallBlock extends SimpleWaterloggedBlock, Block {}
  class CappedWallBlock extends SimpleWaterloggedBlock {
    static readonly PILLAR: EnumProperty;
    static readonly EAST_WALL: EnumProperty;
    static readonly NORTH_WALL: EnumProperty;
    static readonly SOUTH_WALL: EnumProperty;
    static readonly WEST_WALL: EnumProperty;
    static readonly WATERLOGGED: BooleanProperty;
    constructor(properties: Properties);
    getCollisionShape(state: BlockState, world: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getFluidState(state: BlockState): FluidState;
    getShape(state: BlockState, world: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    isPathfindable(state: BlockState, world: BlockGetter, pos: BlockPos, pathType: PathComputationType): boolean;
    mirror(p_185471_1_: BlockState, p_185471_2_: Mirror): BlockState;
    propagatesSkylightDown(state: BlockState, world: BlockGetter, pos: BlockPos): boolean;
    rotate(p_185499_1_: BlockState, p_185499_2_: Rotation): BlockState;
    updateShape(state: BlockState, direction: Direction, p_196271_3_: BlockState, world: LevelAccessor, pos: BlockPos, p_196271_6_: BlockPos): BlockState;
  }


  interface CenteredDoorBlock extends DoorBlockAA {}
  class CenteredDoorBlock extends DoorBlockAA {
    constructor(properties: Properties, blockSetType: BlockSetType);
    getShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
  }


  interface ChairBlock extends WaterloggedHorizontalBlock {}
  class ChairBlock extends WaterloggedHorizontalBlock {
    readonly pixelsYOffset: number;
    constructor(properties: Properties, pixelsYOffset: number, shapes: VoxelShape[]);
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface ChimneyBlockAA extends ConnectedVerticalBlock {}
  class ChimneyBlockAA extends ConnectedVerticalBlock {
    static readonly LIT: BooleanProperty;
    constructor(properties: Properties, shapes: VoxelShape[]);
    animateTick(stateIn: BlockState, worldIn: Level, pos: BlockPos, rand: RandomSource): void;
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    onProjectileHit(worldIn: Level, state: BlockState, hit: BlockHitResult, projectile: Projectile): void;
    static updateAllChimneyConductParts(isActivatedIn: boolean, stateIn: BlockState, blockPosIn: BlockPos, worldIn: Level): void;
    static updateFireplace(isActivatedIn: boolean, blockPosIn: BlockPos, worldIn: Level): void;
    static updateIsActivatedInAllPartsOfBottom(isActivatedIn: boolean, stateIn: BlockState, blockPosIn: BlockPos, worldIn: Level): void;
    static updateIsActivatedInAllPartsOfTop(isActivatedIn: boolean, stateIn: BlockState, blockPosIn: BlockPos, worldIn: Level): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useWithoutItem(blockStateIn: BlockState, worldIn: Level, blockPosIn: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface ConnectedHorizontalBlock extends WaterloggedHorizontalBlock {}
  class ConnectedHorizontalBlock extends WaterloggedHorizontalBlock {
    static readonly HORIZONTAL_CONNECTION: EnumProperty;
    constructor(properties: Properties, shapes: VoxelShape[]);
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }


  interface ConnectedHorizontalPlanDoubleTableBlock extends DisplayerBlock {}
  class ConnectedHorizontalPlanDoubleTableBlock extends DisplayerBlock {
    static readonly NORTH: BooleanProperty;
    static readonly EAST: BooleanProperty;
    static readonly SOUTH: BooleanProperty;
    static readonly WEST: BooleanProperty;
    static readonly HALF: EnumProperty;
    constructor(properties: Properties, shapes: VoxelShape[]);
    canSurvive(state: BlockState, worldIn: LevelReader, pos: BlockPos): boolean;
    getDisplayerX(state: BlockState): number;
    getDisplayerY(state: BlockState): number;
    getDisplayerZ(state: BlockState): number;
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    newBlockEntity(pPos: BlockPos, pState: BlockState): BlockEntity;
    playerWillDestroy(level: Level, pos: BlockPos, state: BlockState, player: Player): BlockState;
    setPlacedBy(worldIn: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useWithoutItem(blockState: BlockState, world: Level, pos: BlockPos, playerEntity: Player, rayTraceResult: BlockHitResult): InteractionResult;
  }


  interface ConnectedVerticalBlock extends WaterloggedBlock {}
  class ConnectedVerticalBlock extends WaterloggedBlock {
    static readonly VERTICAL_CONNECTION: EnumProperty;
    constructor(properties: Properties, shapes: VoxelShape[]);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    getColumnState(worldIn: LevelAccessor, pos: BlockPos, stateIn: BlockState): VerticalConnection;
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    isConnectible(stateIn: BlockState, worldIn: LevelAccessor, pos: BlockPos, faceToConnect: Direction): boolean;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface ConnectedVerticalSidedBlock extends ConnectedVerticalBlock {}
  class ConnectedVerticalSidedBlock extends ConnectedVerticalBlock {
    static readonly FACING: DirectionProperty;
    constructor(properties: Properties, shapes: VoxelShape[]);
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    isConnectible(stateIn: BlockState, worldIn: LevelAccessor, pos: BlockPos, faceToConnect: Direction): boolean;
    mirror(state: BlockState, mirrorIn: Mirror): BlockState;
    rotate(state: BlockState, rot: Rotation): BlockState;
  }


  interface ConnectedVerticalSidedPlanBlock extends ConnectedVerticalSidedBlock {}
  class ConnectedVerticalSidedPlanBlock extends ConnectedVerticalSidedBlock {
    static readonly HORIZONTAL_CONNECTION: EnumProperty;
    constructor(properties: Properties, shapes: VoxelShape[]);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    getLineState(worldIn: LevelAccessor, pos: BlockPos, stateIn: BlockState): HorizontalConnection;
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface ConnectedVerticalSidedPlanFireplaceBlock extends ConnectedVerticalSidedPlanBlock {}
  class ConnectedVerticalSidedPlanFireplaceBlock extends ConnectedVerticalSidedPlanBlock {
    static readonly LIT: BooleanProperty;
    constructor(properties: Properties);
    animateTick(stateIn: BlockState, worldIn: Level, pos: BlockPos, rand: RandomSource): void;
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    neighborChanged(state: BlockState, worldIn: Level, pos: BlockPos, blockIn: Block, fromPos: BlockPos, isMoving: boolean): void;
    onProjectileHit(worldIn: Level, state: BlockState, hit: BlockHitResult, projectile: Projectile): void;
    placeLiquid(world: LevelAccessor, pos: BlockPos, state: BlockState, fluid: FluidState): boolean;
    static updateChimneyConductsAtSide(isActivatedIn: boolean, blockPosIn: BlockPos, worldIn: Level): void;
    static updateChimneys(isActivatedIn: boolean, blockStateIn: BlockState, posIn: BlockPos, worldIn: Level): void;
    static updateLeftChimneys(isActivatedIn: boolean, blockStateIn: BlockState, posIn: BlockPos, worldIn: Level): void;
    static updateRightChimneys(isActivatedIn: boolean, blockStateIn: BlockState, posIn: BlockPos, worldIn: Level): void;
    useWithoutItem(stateIn: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface CustomStairBlock extends StairBlock {}
  class CustomStairBlock extends StairBlock {
    constructor($$0: BlockState, $$1: Properties);
  }


  interface CustomTrapDoorBlock extends TrapDoorBlock {}
  class CustomTrapDoorBlock extends TrapDoorBlock {
    constructor($$0: Properties, $$1: BlockSetType);
  }


  interface DisplayerBlock extends EntityBlock, WaterloggedBlock {}
  class DisplayerBlock extends EntityBlock {
    static readonly LIT: BooleanProperty;
    getDisplayerX(var1: BlockState): number;
    getDisplayerY(var1: BlockState): number;
    getDisplayerZ(var1: BlockState): number;
    newBlockEntity(pPos: BlockPos, pState: BlockState): BlockEntity;
    onRemove(oldState: BlockState, worldIn: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    useWithoutItem(blockState: BlockState, world: Level, pos: BlockPos, playerEntity: Player, rayTraceResult: BlockHitResult): InteractionResult;
  }


  interface DoorBlockAA extends SimpleWaterloggedBlock, DoorBlock {}
  class DoorBlockAA extends SimpleWaterloggedBlock {
    static readonly WATERLOGGED: BooleanProperty;
    constructor(properties: Properties, blockSetType: BlockSetType);
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }


  interface DoubleChairBlock extends ChairBlock {}
  class DoubleChairBlock extends ChairBlock {
    static readonly HALF: EnumProperty;
    constructor(properties: Properties, offsetY: number, shapes: VoxelShape[]);
    canSurvive(state: BlockState, worldIn: LevelReader, pos: BlockPos): boolean;
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    playerWillDestroy(level: Level, pos: BlockPos, state: BlockState, player: Player): BlockState;
    setPlacedBy(worldIn: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface DoubleCropsBlock extends SoilCropsBlock {}
  class DoubleCropsBlock extends SoilCropsBlock {
    readonly SHAPES: VoxelShape[];
    static readonly HALF: EnumProperty;
    constructor(plantType: PlantType, growingAge: number);
    canSurvive(state: BlockState, worldIn: LevelReader, pos: BlockPos): boolean;
    get ageReachingTopBlock(): number;
    getRemovedState(state: BlockState): BlockState;
    getShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getTopState(bottomState: BlockState): BlockState;
    growCrops(worldIn: Level, pos: BlockPos, state: BlockState): void;
    isBottomCrop(state: BlockState): boolean;
    makeShapes(): VoxelShape[];
    playerDestroy(worldIn: Level, player: Player, pos: BlockPos, state: BlockState, te: BlockEntity, stack: ItemStack): void;
    playerWillDestroy(worldIn: Level, pos: BlockPos, state: BlockState, player: Player): BlockState;
    setPlantWithAge(currentState: BlockState, worldIn: LevelAccessor, pos: BlockPos, newAge: number): void;
    tick(state: BlockState, worldIn: ServerLevel, pos: BlockPos, random: RandomSource): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }


  interface DoubleGrowingBushBlock extends GrowingBushBlock {}
  class DoubleGrowingBushBlock extends GrowingBushBlock {
    readonly growingAge: number;
    readonly TOP_SHAPES: VoxelShape[];
    static readonly HALF: EnumProperty;
    constructor(plantType: PlantType, cutAge: number, growingAge: number);
    canSurvive(state: BlockState, worldIn: LevelReader, pos: BlockPos): boolean;
    get ageReachingTopBlock(): number;
    getShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getTopState(bottomState: BlockState): BlockState;
    growCrops(worldIn: Level, pos: BlockPos, state: BlockState): void;
    harvestWithoutBreaking(state: BlockState, worldIn: Level, pos: BlockPos, itemStackHand: ItemStack, blockName: string, dropMultiplier: number): void;
    isBottomCrop(state: BlockState): boolean;
    makeShapes(): VoxelShape[];
    makeTopShapes(): VoxelShape[];
    playerDestroy(worldIn: Level, player: Player, pos: BlockPos, state: BlockState, te: BlockEntity, stack: ItemStack): void;
    playerWillDestroy(worldIn: Level, pos: BlockPos, state: BlockState, player: Player): BlockState;
    randomTick(state: BlockState, worldIn: ServerLevel, pos: BlockPos, random: RandomSource): void;
    setPlantWithAge(currentState: BlockState, worldIn: LevelAccessor, pos: BlockPos, newAge: number): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }


  interface DryerBlock extends EntityBlock, WaterloggedBlock {}
  class DryerBlock extends EntityBlock {
    static readonly SIZE: IntegerProperty;
    constructor(properties: Properties, shapes: VoxelShape[]);
    canBeReplaced(state: BlockState, useContext: BlockPlaceContext): boolean;
    canSurvive(state: BlockState, worldIn: LevelReader, pos: BlockPos): boolean;
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    getTicker<T extends BlockEntity>(pLevel: Level, pState: BlockState, entityType: BlockEntityType<T>): BlockEntityTicker<T>;
    newBlockEntity(pPos: BlockPos, pState: BlockState): BlockEntity;
    onRemove(oldState: BlockState, worldIn: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface EdgeBlock extends WaterloggedBlock {}
  class EdgeBlock extends WaterloggedBlock {
    static readonly FACING: DirectionProperty;
    static readonly HALF: EnumProperty;
    static readonly SHAPE: EnumProperty;
    constructor(properties: Properties, shapes: VoxelShape[]);

    constructor(properties: Properties);
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    static isBlockEdge(state: BlockState): boolean;
    mirror(state: BlockState, mirrorIn: Mirror): BlockState;
    rotate(state: BlockState, rot: Rotation): BlockState;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }


  interface FaucetBlock extends WaterSourceTrickleBlock {}
  class FaucetBlock extends WaterSourceTrickleBlock {
    constructor(propertiesIn: Properties);
    getStateForPlacement(contextIn: BlockPlaceContext): BlockState;
    getWaterTrickleOutPut(currentState: BlockState): boolean[];
    updateShape(stateIn: BlockState, directionIn: Direction, facingStateIn: BlockState, worldIn: LevelAccessor, currentPosIn: BlockPos, facingPosIn: BlockPos): BlockState;
    useWithoutItem(blockStateIn: BlockState, worldIn: Level, blockPosIn: BlockPos, playerEntityIn: Player, blockRaytraceResultIn: BlockHitResult): InteractionResult;
  }


  interface FlowerPotBlockAA extends IBlockSpecialDisplay, BlockAA {}
  class FlowerPotBlockAA extends IBlockSpecialDisplay {
    constructor(itemInPot: Item);
    get displayScale(): number;
    get randomState(): BlockState;
    setItemInPot(itemInPot: Item): void;
    useWithoutItem(state: BlockState, world: Level, pos: BlockPos, entity: Player, ray: BlockHitResult): InteractionResult;
  }


  interface FoldingScreenBlock extends ConnectedVerticalBlock {}
  class FoldingScreenBlock extends ConnectedVerticalBlock {
    static readonly INVERTED: BooleanProperty;
    constructor(properties: Properties, shapes: VoxelShape[]);
    getShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getShape(index: number): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
  }


  interface GrowingBushBlock extends SoilCropsBlock {}
  class GrowingBushBlock extends SoilCropsBlock {
    readonly SHAPES: VoxelShape[];
    readonly cutAge: number;
    static readonly AGE: IntegerProperty;
    constructor(plantType: PlantType, cutAge: number);
    get ageProperty(): IntegerProperty;
    get cutProperty(): BooleanProperty;
    get maxAge(): number;
    getCollisionShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    harvestWithoutBreaking(state: BlockState, worldIn: Level, pos: BlockPos, itemStackHand: ItemStack, blockName: string, dropMultiplier: number): void;
    makeShapes(): VoxelShape[];
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, playerIn: Player, ray: BlockHitResult): InteractionResult;
  }


  interface HorizontalAxisBlock extends BlockAA {}
  class HorizontalAxisBlock extends BlockAA {
    constructor(properties: Properties, shapes: VoxelShape[]);

    constructor(properties: Properties);
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    rotate(state: BlockState, rot: Rotation): BlockState;
  }


  interface HorizontalBlockAA extends HorizontalDirectionalBlock {}
  class HorizontalBlockAA extends HorizontalDirectionalBlock {
    static readonly CODEC: MapCodec;
    constructor(properties: Properties);
    getStateForPlacement(context: BlockPlaceContext): BlockState;
  }


  interface InvertedBlock extends BlockAA {}
  class InvertedBlock extends BlockAA {
    static readonly INVERTED: BooleanProperty;
    constructor(properties: Properties);
    getStateForPlacement(context: BlockPlaceContext): BlockState;
  }


  interface LanternBlock extends IBlockChain, SpecialDisplayBlock {}
  class LanternBlock extends IBlockChain {
    static readonly FACING: DirectionProperty;
    constructor(properties: Properties, shapes: VoxelShape[]);
    canConnectToChainUnder(state: BlockState): boolean;
    emitsLight(): boolean;
    get displayScale(): number;
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirrorIn: Mirror): BlockState;
    rotate(state: BlockState, rot: Rotation): BlockState;
  }


  interface LatticeBlock extends IBlockClimbingPlant, WaterloggedBlock {}
  class LatticeBlock extends IBlockClimbingPlant {
    static readonly NORTH: BooleanProperty;
    static readonly EAST: BooleanProperty;
    static readonly SOUTH: BooleanProperty;
    static readonly WEST: BooleanProperty;
    static readonly CLIMBING_PLANT: EnumProperty;
    static readonly PERSISTENT: BooleanProperty;
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    canBeReplaced(state: BlockState, useContext: BlockPlaceContext): boolean;
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    isRandomlyTicking(state: BlockState): boolean;
    randomTick(state: BlockState, worldIn: ServerLevel, pos: BlockPos, random: RandomSource): void;
    spawnAfterBreak(state: BlockState, worldIn: ServerLevel, pos: BlockPos, stack: ItemStack, p_222953_: boolean): void;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface MixedRoofSupportBlock extends SlabBlockAA {}
  class MixedRoofSupportBlock extends SlabBlockAA {
    static readonly FACING: DirectionProperty;
    static readonly SHAPE: EnumProperty;
    constructor(roofSlabBlockSupplier: Supplier<Block>, properties: Properties);
    canBeReplaced(state: BlockState, context: BlockPlaceContext): boolean;
    canPlaceLiquid(player: Player, level: BlockGetter, pos: BlockPos, state: BlockState, fluid: Fluid): boolean;
    static getBlockItem(block: MixedRoofSupportBlock): Item;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    isSameBlock(state: BlockState): boolean;
    mirror(state: BlockState, mirrorIn: Mirror): BlockState;
    place(context: BlockPlaceContext): InteractionResult;
    placeLiquid(world: LevelAccessor, pos: BlockPos, state: BlockState, fluid: FluidState): boolean;
    rotate(state: BlockState, rot: Rotation): BlockState;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface MixedSlabBlock extends SlabBlockAA {}
  class MixedSlabBlock extends SlabBlockAA {
    constructor(properties: Properties);
    addMixedBlockRecipe(secondSlab: Block, mixedBlock: Supplier<Block>, thisSlabIsBottom: boolean): MixedSlabBlock;
    static getBlockItem(block: MixedSlabBlock): Item;
    place(context: BlockPlaceContext): InteractionResult;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface PaneBlockAA extends IronBarsBlock {}
  class PaneBlockAA extends IronBarsBlock {
    constructor(properties: Properties);
    canAttachPane(level: LevelReader, pos: BlockPos, dir: Direction, adjacentState: BlockState): boolean;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }


  interface PergolaBlock extends BeamBlock {}
  class PergolaBlock extends BeamBlock {
    constructor(properties: Properties, shapes: VoxelShape[]);

    constructor(properties: Properties);
    canHavePlant(state: BlockState): boolean;
    getBlockPillarConnectionAbove(state: BlockState): PillarConnection;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    placePlant(state: BlockState, world: Level, pos: BlockPos, option: number): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }


  interface PillarPaneBlock extends PaneBlockAA {}
  class PillarPaneBlock extends PaneBlockAA {
    constructor(properties: Properties);
    getCollisionShape(state: BlockState, world: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getShape(state: BlockState, world: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
  }


  interface PlanterBlock extends BlockAA {}
  class PlanterBlock extends BlockAA {
    static readonly FACING: DirectionProperty;
    static readonly HALF: EnumProperty;
    constructor(properties: Properties);
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirrorIn: Mirror): BlockState;
    rotate(state: BlockState, rot: Rotation): BlockState;
  }


  interface PlateBlock extends WaterloggedBlock {}
  class PlateBlock extends WaterloggedBlock {
    static readonly FACING: DirectionProperty;
    static readonly SHAPE: EnumProperty;
    constructor(properties: Properties, shapes: VoxelShape[]);

    constructor(properties: Properties);
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    static isBlockPlate(state: BlockState): boolean;
    mirror(state: BlockState, mirrorIn: Mirror): BlockState;
    rotate(state: BlockState, rot: Rotation): BlockState;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }


  interface PoolBlock extends BlockAA {}
  class PoolBlock extends BlockAA {
    readonly maxLevel: number;
    readonly faucetLevel: number;
    constructor(propertiesIn: Properties, maxLevelIn: number, faucetLevelIn: number, shapes: VoxelShape[]);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    getLightBlock(p_200011_1_In: BlockState, p_200011_2_In: BlockGetter, p_200011_3_In: BlockPos): number;
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(contextIn: BlockPlaceContext): BlockState;
    static hasOnePoolActivatorAround(blockPosIn: BlockPos, worldIn: LevelAccessor): EnumActivatorState;
    static hasOnePoolActivatorAroundOffset(testedPositionsIn: Map<BlockPos, BlockState>, worldIn: LevelAccessor, baseBlockPosIn: BlockPos, xOffsetIn: number, zOffsetIn: number): EnumActivatorState;
    propagatesSkylightDown(p_200123_1_In: BlockState, p_200123_2_In: BlockGetter, p_200123_3_In: BlockPos): boolean;
    static removeWaterAround(blockStateIn: BlockState, blockPosIn: BlockPos, worldIn: Level): boolean;
    setPlacedBy(worldIn: Level, blockPosIn: BlockPos, blockStateIn: BlockState, entityIn: LivingEntity, itemStackIn: ItemStack): void;
    tick(blockStateIn: BlockState, serverWorldIn: ServerLevel, blockPosIn: BlockPos, randomIn: RandomSource): void;
    updateShape(stateIn: BlockState, directionIn: Direction, facingStateIn: BlockState, worldIn: LevelAccessor, currentPosIn: BlockPos, facingPosIn: BlockPos): BlockState;
    useShapeForLightOcclusion(p_220074_1_In: BlockState): boolean;
    useWithoutItem(blockStateIn: BlockState, worldIn: Level, blockPosIn: BlockPos, playerEntityIn: Player, blockRayTraceResultIn: BlockHitResult): InteractionResult;
  }


  interface PortcullisBlock extends WaterloggedBlock {}
  class PortcullisBlock extends WaterloggedBlock {
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    neighborChanged(state: BlockState, worldIn: Level, pos: BlockPos, blockIn: Block, fromPos: BlockPos, isMoving: boolean): void;
    rotate(state: BlockState, rot: Rotation): BlockState;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }


  interface RotatedPillarBlockAA extends IFlammable, RotatedPillarBlock {}
  class RotatedPillarBlockAA extends IFlammable {
    constructor(properties: Properties);
    getFireSpreadSpeed(state: BlockState, world: BlockGetter, pos: BlockPos, face: Direction): number;
    getFlammability(state: BlockState, world: BlockGetter, pos: BlockPos, face: Direction): number;
    setBurnable(): Block;
    setBurnable(fireSpreadSpeed: number, fireDestructionSpeed: number): Block;
  }


  interface ShutterBlock extends SmallShutterBlock {}
  class ShutterBlock extends SmallShutterBlock {
    static readonly HALF: EnumProperty;
    constructor(properties: Properties);
    canSurvive(state: BlockState, worldIn: LevelReader, pos: BlockPos): boolean;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    playerWillDestroy(level: Level, pos: BlockPos, state: BlockState, player: Player): BlockState;
    setPlacedBy(worldIn: Level, pos: BlockPos, state: BlockState, entity: LivingEntity, itemStack: ItemStack): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }


  interface SidedFlowerPotBlock extends FlowerPotBlockAA {}
  class SidedFlowerPotBlock extends FlowerPotBlockAA {
    static readonly FACING: DirectionProperty;
    constructor(itemInPot: Item);
    get displayScale(): number;
    get randomState(): BlockState;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
  }


  interface SidedWindowBlock extends BlockAA {}
  class SidedWindowBlock extends BlockAA {
    static readonly SIDED_WINDOW: EnumProperty;
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    getShape(state: BlockState, world: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getShape(index: number): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirrorIn: Mirror): BlockState;
    neighborChanged(state: BlockState, worldIn: Level, pos: BlockPos, blockIn: Block, fromPos: BlockPos, isMoving: boolean): void;
    rotate(state: BlockState, rot: Rotation): BlockState;
  }


  interface SlabBlockAA extends IFlammable, SlabBlock {}
  class SlabBlockAA extends IFlammable {
    constructor(properties: Properties);
    getFireSpreadSpeed(state: BlockState, world: BlockGetter, pos: BlockPos, face: Direction): number;
    getFlammability(state: BlockState, world: BlockGetter, pos: BlockPos, face: Direction): number;
    setBurnable(): Block;
    setBurnable(fireSpreadSpeed: number, fireDestructionSpeed: number): Block;
  }


  interface SmallPoolBlock extends PoolBlock {}
  class SmallPoolBlock extends PoolBlock {
    constructor(propertiesIn: Properties);
    getCollisionShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    updateShape(stateIn: BlockState, directionIn: Direction, facingStateIn: BlockState, worldIn: LevelAccessor, currentPosIn: BlockPos, facingPosIn: BlockPos): BlockState;
  }


  interface SmallShutterBlock extends WaterloggedBlock {}
  class SmallShutterBlock extends WaterloggedBlock {
    static readonly FACING: DirectionProperty;
    static readonly POWERED: BooleanProperty;
    static readonly OPEN_POSITION: EnumProperty;
    static readonly HINGE: EnumProperty;
    constructor(properties: Properties);
    getLightBlock(p_200011_1_In: BlockState, p_200011_2_In: BlockGetter, p_200011_3_In: BlockPos): number;
    getOcclusionShape(p_196247_1_In: BlockState, p_196247_2_In: BlockGetter, p_196247_3_In: BlockPos): VoxelShape;
    getShadeBrightness(p_220080_1_: BlockState, p_220080_2_: BlockGetter, p_220080_3_: BlockPos): number;
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirrorIn: Mirror): BlockState;
    neighborChanged(state: BlockState, worldIn: Level, pos: BlockPos, blockIn: Block, fromPos: BlockPos, isMoving: boolean): void;
    propagatesSkylightDown(p_200123_1_In: BlockState, p_200123_2_In: BlockGetter, p_200123_3_In: BlockPos): boolean;
    rotate(state: BlockState, rot: Rotation): BlockState;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useShapeForLightOcclusion(p_220074_1_In: BlockState): boolean;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface SoilCropsBlock extends IBlockGeneration, CropBlock {}
  class SoilCropsBlock extends IBlockGeneration {
    static readonly PERSISTENT: BooleanProperty;
    constructor(type: PlantType);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    canSurvive(state: BlockState, world: LevelReader, pos: BlockPos): boolean;
    generateOnPos(world: WorldGenLevel, pos: BlockPos, state: BlockState, random: RandomSource): boolean;
    mayGenerateOn(worldIn: BlockGetter, pos: BlockPos, plantType: PlantType): boolean;
    randomTick(state: BlockState, worldIn: ServerLevel, pos: BlockPos, random: RandomSource): void;
    setPlantWithAge(currentState: BlockState, worldIn: LevelAccessor, pos: BlockPos, newAge: number): void;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface SpecialDisplayBlock extends IBlockSpecialDisplay, WaterloggedBlock {}
  class SpecialDisplayBlock extends IBlockSpecialDisplay {
    constructor(properties: Properties, shapes: VoxelShape[]);
  }


  interface StairsBlockAA extends IFlammable, StairBlock {}
  class StairsBlockAA extends IFlammable {
    constructor(regBlock: Supplier<Block>, properties: Properties);
    getFireSpreadSpeed(state: BlockState, world: BlockGetter, pos: BlockPos, face: Direction): number;
    getFlammability(state: BlockState, world: BlockGetter, pos: BlockPos, face: Direction): number;
    setBurnable(): Block;
    setBurnable(fireSpreadSpeed: number, fireDestructionSpeed: number): Block;
  }


  interface SupportBeamBlock extends WaterloggedBlock {}
  class SupportBeamBlock extends WaterloggedBlock {
    static readonly HORIZONTAL_AXIS: EnumProperty;
    constructor(properties: Properties);
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    rotate(state: BlockState, rot: Rotation): BlockState;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }


  interface SupportSlabBlock extends WaterloggedBlock {}
  class SupportSlabBlock extends WaterloggedBlock {
    constructor(properties: Properties);
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }


  interface WaterDoubleCropsBlock extends SimpleWaterloggedBlock, DoubleCropsBlock {}
  class WaterDoubleCropsBlock extends SimpleWaterloggedBlock {
    constructor(growingAge: number);
    getFluidState(state: BlockState): FluidState;
    getRemovedState(state: BlockState): BlockState;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    getTopState(bottomState: BlockState): BlockState;
    makeShapes(): VoxelShape[];
    setPlantWithAge(currentState: BlockState, worldIn: LevelAccessor, pos: BlockPos, newAge: number): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }


  interface WaterJetBlock extends BlockAA {}
  class WaterJetBlock extends BlockAA {
    constructor(propertiesIn: Properties);
    canBeReplaced(state: BlockState, useContext: BlockPlaceContext): boolean;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    updateShape(stateIn: BlockState, directionIn: Direction, facingStateIn: BlockState, worldIn: LevelAccessor, currentPosIn: BlockPos, facingPosIn: BlockPos): BlockState;
    useWithoutItem(blockStateIn: BlockState, worldIn: Level, blockPosIn: BlockPos, playerEntityIn: Player, blockRaytraceResultIn: BlockHitResult): InteractionResult;
  }


  interface WaterloggedBlock extends SimpleWaterloggedBlock, BlockAA {}
  class WaterloggedBlock extends SimpleWaterloggedBlock {
    static readonly WATERLOGGED: BooleanProperty;
    constructor(properties: Properties, shapes: VoxelShape[]);
    getFluidState(state: BlockState): FluidState;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }


  interface WaterloggedFenceGateBlock extends FenceGateBlock {}
  class WaterloggedFenceGateBlock extends FenceGateBlock {
    static readonly WATERLOGGED: BooleanProperty;
    constructor(properties: Properties, woodType: WoodType);
    getFluidState(state: BlockState): FluidState;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }


  interface WaterloggedHorizontalAxisBlock extends WaterloggedBlock {}
  class WaterloggedHorizontalAxisBlock extends WaterloggedBlock {
    static readonly HORIZONTAL_AXIS: EnumProperty;
    constructor(properties: Properties, shapes: VoxelShape[]);
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    rotate(state: BlockState, rot: Rotation): BlockState;
  }


  interface WaterloggedHorizontalBlock extends WaterloggedBlock {}
  class WaterloggedHorizontalBlock extends WaterloggedBlock {
    static readonly FACING: DirectionProperty;
    constructor(properties: Properties, shapes: VoxelShape[]);
    getShapeIndex(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirrorIn: Mirror): BlockState;
    rotate(state: BlockState, rot: Rotation): BlockState;
  }


  interface WildPlantBlock extends BlockAA {}
  class WildPlantBlock extends BlockAA {
    constructor(properties: Properties, shapes: VoxelShape[]);

    constructor(properties: Properties);
    canSurvive(state: BlockState, worldIn: LevelReader, pos: BlockPos): boolean;
    getCollisionShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getShape(index: number): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
  }

}

declare module 'org.dawnoftimebuilder.block.templates.MixedSlabBlock' {
  class MixedBlockRecipe {
  }

}

declare module 'org.dawnoftimebuilder.block.templates.PoolBlock' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class PoolLevelAndSides {
    left: boolean;
    right: boolean;
    north: boolean;
    south: boolean;
    level: number;
  }


  interface EnumActivatorState extends Enum<EnumActivatorState> {}
  class EnumActivatorState extends Enum<EnumActivatorState> {
    static readonly NO: EnumActivatorState;
    static readonly DISABLED: EnumActivatorState;
    static readonly ENABLED: EnumActivatorState;
    static valueOf(name: string): EnumActivatorState;
    static values(): EnumActivatorState[];
  }

}

declare module 'org.dawnoftimebuilder.block.templates.SoilCropsBlock' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface PlantType extends Enum<PlantType> {}
  class PlantType extends Enum<PlantType> {
    static readonly DESERT: PlantType;
    static readonly NETHER: PlantType;
    static readonly CROP: PlantType;
    static readonly CAVE: PlantType;
    static readonly PLAINS: PlantType;
    static readonly WATER: PlantType;
    static readonly BEACH: PlantType;
    static valueOf(name: string): PlantType;
    static values(): PlantType[];
  }

}

declare module 'org.dawnoftimebuilder.blockentity' {
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { MenuProvider, SimpleContainer, InteractionResult } from 'net.minecraft.world';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { Component } from 'net.minecraft.network.chat';
  import { AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { Inventory, Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Level } from 'net.minecraft.world.level';
  import { Packet } from 'net.minecraft.network.protocol';
  import { ClientGamePacketListener } from 'net.minecraft.network.protocol.game';

  interface DisplayerBlockEntity extends MenuProvider, BlockEntity {}
  class DisplayerBlockEntity extends MenuProvider {
    readonly itemHandler: SimpleContainer;
    constructor(pPos: BlockPos, pBlockState: BlockState);
    createMenu(pContainerId: number, pPlayerInventory: Inventory, pPlayer: Player): AbstractContainerMenu;
    get displayName(): Component;
    getUpdateTag(registries: Provider): CompoundTag;
    saveAdditional(tag: CompoundTag, registries: Provider): void;
  }


  interface DryerBlockEntity extends BlockEntity {}
  class DryerBlockEntity extends BlockEntity {
    readonly itemHandler: SimpleContainer;
    constructor(pPos: BlockPos, pBlockState: BlockState);
    dropOneDriedItem(worldIn: Level, pos: BlockPos): number;
    dropOneItem(worldIn: Level, pos: BlockPos): InteractionResult;
    get updatePacket(): Packet<ClientGamePacketListener>;
    getUpdateTag(registries: Provider): CompoundTag;
    saveAdditional(tag: CompoundTag, registries: Provider): void;
    tick(): void;
    tryInsertItemStack(itemStack: ItemStack, simple: boolean, worldIn: Level, pos: BlockPos, player: Player): InteractionResult;
  }

}

declare module 'org.dawnoftimebuilder.client.gui.creative' {
  import { Enum } from 'java.lang';
  import { Component } from 'net.minecraft.network.chat';
  import { List } from 'java.util';
  import { Item } from 'net.minecraft.world.item';

  interface CreativeInventoryCategories extends Enum<CreativeInventoryCategories> {}
  class CreativeInventoryCategories extends Enum<CreativeInventoryCategories> {
    static readonly GENERAL: CreativeInventoryCategories;
    static readonly FRENCH: CreativeInventoryCategories;
    static readonly GERMAN: CreativeInventoryCategories;
    static readonly JAPANESE: CreativeInventoryCategories;
    static readonly PERSIAN: CreativeInventoryCategories;
    static readonly PRE_COLOMBIAN: CreativeInventoryCategories;
    static readonly ROMAN: CreativeInventoryCategories;
    get items(): Item[];
    get name(): string;
    get translation(): Component;
    static valueOf(name: string): CreativeInventoryCategories;
    static values(): CreativeInventoryCategories[];
  }

}

declare module 'org.dawnoftimebuilder.client.gui.elements.buttons' {
  import { Button } from 'net.minecraft.client.gui.components';
  import { OnPress } from 'Button';
  import { CreativeScreen } from 'org.dawnoftimebuilder.mixin.api';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface CategoryButton extends Button {}
  class CategoryButton extends Button {
    constructor(x: number, y: number, index: number, pressable: OnPress, parent: CreativeScreen);
    get categoryID(): number;
    isSelected(): boolean;
    renderWidget(pGuiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
    setSelected(selected: boolean): void;
  }


  interface GroupButton extends Button {}
  class GroupButton extends Button {
    constructor(x: number, y: number, message: Component, pressable: OnPress, iconResource: ResourceLocation, iconU: number, iconV: number);
    renderWidget(pGuiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
  }


  interface SocialsButton extends Button {}
  class SocialsButton extends Button {
    constructor(x: number, y: number, buttonName: string, pressable: OnPress);
    renderWidget(pGuiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
  }

}

declare module 'org.dawnoftimebuilder.client.gui.screen' {
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { DisplayerMenu } from 'org.dawnoftimebuilder.container';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';

  interface DisplayerScreen extends AbstractContainerScreen<DisplayerMenu> {}
  class DisplayerScreen extends AbstractContainerScreen<DisplayerMenu> {
    constructor(menu: DisplayerMenu, playerInventory: Inventory, title: Component);
  }

}

declare module 'org.dawnoftimebuilder.client.model.entity' {
  import { EntityModel } from 'net.minecraft.client.model';
  import { ModelLayerLocation, ModelPart } from 'net.minecraft.client.model.geom';
  import { LayerDefinition } from 'net.minecraft.client.model.geom.builders';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';

  interface SilkmothModel<T extends SilkmothEntity = any> extends EntityModel<T> {}
  class SilkmothModel<T extends SilkmothEntity = any> extends EntityModel<T> {
    static readonly LAYER_LOCATION: ModelLayerLocation;
    constructor(root: ModelPart);
    static createBodyLayer(): LayerDefinition;
    renderToBuffer(poseStack: PoseStack, vertexConsumer: VertexConsumer, packedLight: number, packedOverlay: number, color: number): void;
    setupAnim(entity: T, limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }

}

declare module 'org.dawnoftimebuilder.client.renderer.blockentity' {
  import { BlockEntityRenderer } from 'net.minecraft.client.renderer.blockentity';
  import { DisplayerBlockEntity, DryerBlockEntity } from 'org.dawnoftimebuilder.blockentity';
  import { Context } from 'BlockEntityRendererProvider';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { ItemStack } from 'net.minecraft.world.item';

  interface DisplayerBERenderer extends BlockEntityRenderer<DisplayerBlockEntity> {}
  class DisplayerBERenderer extends BlockEntityRenderer<DisplayerBlockEntity> {
    constructor(context: Context);
    render(pBlockEntity: DisplayerBlockEntity, pPartialTick: number, pPoseStack: PoseStack, pBuffer: MultiBufferSource, pPackedLight: number, pPackedOverlay: number): void;
  }


  interface DryerBERenderer extends BlockEntityRenderer<DryerBlockEntity> {}
  class DryerBERenderer extends BlockEntityRenderer<DryerBlockEntity> {
    constructor(context: Context);
    render(pBlockEntity: DryerBlockEntity, pPartialTick: number, pPoseStack: PoseStack, pBuffer: MultiBufferSource, pPackedLight: number, pPackedOverlay: number): void;
    renderItemModel(dryerBlockEntity: DryerBlockEntity, poseStack: PoseStack, itemStack: ItemStack, buffer: MultiBufferSource, pPackedLight: number, pPackedOverlay: number): void;
  }

}

declare module 'org.dawnoftimebuilder.client.renderer.entity' {
  import { EntityRenderer, MobRenderer } from 'net.minecraft.client.renderer.entity';
  import { ChairEntity, SilkmothEntity } from 'org.dawnoftimebuilder.entity';
  import { Context } from 'EntityRendererProvider';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { SilkmothModel } from 'org.dawnoftimebuilder.client.model.entity';

  interface ChairRenderer extends EntityRenderer<ChairEntity> {}
  class ChairRenderer extends EntityRenderer<ChairEntity> {
    constructor(p_174008_: Context);
    getTextureLocation(p_114482_: ChairEntity): ResourceLocation;
  }


  interface SilkmothRenderer extends MobRenderer<SilkmothEntity, SilkmothModel> {}
  class SilkmothRenderer extends MobRenderer<SilkmothEntity, SilkmothModel> {
    constructor(ctx: Context);
    getTextureLocation(entity: SilkmothEntity): ResourceLocation;
  }

}

declare module 'org.dawnoftimebuilder.container' {
  import { AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { Inventory, Player } from 'net.minecraft.world.entity.player';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { ItemStack } from 'net.minecraft.world.item';

  interface DisplayerMenu extends AbstractContainerMenu {}
  class DisplayerMenu extends AbstractContainerMenu {
    constructor(windowId: number, playerInventory: Inventory, additionalData: D, buf: RegistryFriendlyByteBuf);

    constructor(windowId: number, playerInventory: Inventory, blockEntity: BlockEntity);
    broadcastChanges(): void;
    quickMoveStack(playerIn: Player, index: number): ItemStack;
    stillValid(playerIn: Player): boolean;
  }

}

declare module 'org.dawnoftimebuilder' {
  import { Logger } from 'org.slf4j';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ConfigClassHandler } from 'dev.isxander.yacl3.config.v2.api';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { Block, Item } from 'RegisterColorHandlersEvent';
  import { FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';
  import { RegisterMenuScreensEvent } from 'net.neoforged.neoforge.client.event';
  import { RegisterLayerDefinitions, RegisterRenderers } from 'EntityRenderersEvent';

  class DoTBCommon {
    static readonly MOD_ID: string;
    static readonly LOG: Logger;
    static readonly CREATIVE_ICONS: ResourceLocation;
    static init(): void;
  }


  class DoTBConfig {
    silkmothSpawnChance: number;
    silkmothRotationMaxRange: number;
    silkmothMustDie: boolean;
    silkmothRotationChange: number;
    silkmothMute: boolean;
    dryingTimeVariation: number;
    climbingPlantGrowthChance: number;
    climbingPlantSpreadChance: number;
    stickBundleGrowthChance: number;
  }


  class DoTBNeoForge {
    static readonly HANDLER: ConfigClassHandler;
    constructor(modEventBus: IEventBus);
  }


  class DoTBNeoForgeClient {
    static clientSetup(event: FMLClientSetupEvent): void;
    static registerLayerDefinitions(event: RegisterLayerDefinitions): void;
    static registerRenderers(event: RegisterRenderers): void;
    static registerScreens(event: RegisterMenuScreensEvent): void;
    static setupBlockColors(event: Block): void;
    static setupItemColors(event: Item): void;
  }


  class RegistryImpls {
    static init(bus: IEventBus): void;
  }

}

declare module 'org.dawnoftimebuilder.entity' {
  import { Entity, LivingEntity, SpawnGroupData, MobSpawnType } from 'net.minecraft.world.entity';
  import { Level, ServerLevelAccessor } from 'net.minecraft.world.level';
  import { InteractionResult, DifficultyInstance } from 'net.minecraft.world';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Packet } from 'net.minecraft.network.protocol';
  import { ClientGamePacketListener } from 'net.minecraft.network.protocol.game';
  import { ServerEntity } from 'net.minecraft.server.level';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { AmbientCreature } from 'net.minecraft.world.entity.ambient';
  import { Builder } from 'AttributeSupplier';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface ChairEntity extends Entity {}
  class ChairEntity extends Entity {
    constructor(level: Level);
    static createEntity(level: Level, pos: BlockPos, player: Player, direction: Direction, pixelsXOffset: number, pixelsYOffset: number, pixelsZOffset: number): InteractionResult;
    static createEntity(level: Level, pos: BlockPos, player: Player, direction: Direction, pixelsYOffset: number): InteractionResult;
    getAddEntityPacket(entity: ServerEntity): Packet<ClientGamePacketListener>;
    getDismountLocationForPassenger(passenger: LivingEntity): Vec3;
    onPassengerTurned(pEntityToUpdate: Entity): void;
    tick(): void;
  }


  interface SilkmothEntity extends AmbientCreature {}
  class SilkmothEntity extends AmbientCreature {
    constructor(worldIn: Level);
    addAdditionalSaveData(compound: CompoundTag): void;
    causeFallDamage(p_225503_1_: number, p_225503_2_: number, damageSource: DamageSource): boolean;
    static createAttributes(): Builder;
    finalizeSpawn(world: ServerLevelAccessor, difficultyInstance: DifficultyInstance, spawnReason: MobSpawnType, data: SpawnGroupData): SpawnGroupData;
    get ambientSound(): SoundEvent;
    get voicePitch(): number;
    isIgnoringBlockTriggers(): boolean;
    isPushable(): boolean;
    readAdditionalSaveData(compound: CompoundTag): void;
    tick(): void;
  }

}

declare module 'org.dawnoftimebuilder.item' {
  import { ItemDoTB } from 'org.dawnoftimebuilder.item.templates';
  import { FlowerPotBlockAA } from 'org.dawnoftimebuilder.block.templates';

  interface IconItem extends ItemDoTB {}
  class IconItem extends ItemDoTB {
  }


  class IHasFlowerPot {
    get potBlock(): FlowerPotBlockAA;
    set potBlock(var1: FlowerPotBlockAA);
  }

}

declare module 'org.dawnoftimebuilder.item.templates' {
  import { Item, ItemStack, TooltipFlag, BlockItem } from 'net.minecraft.world.item';
  import { Properties, TooltipContext } from 'Item';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { IHasFlowerPot } from 'org.dawnoftimebuilder.item';
  import { Block } from 'net.minecraft.world.level.block';
  import { InteractionResult } from 'net.minecraft.world';
  import { UseOnContext, BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { FlowerPotBlockAA } from 'org.dawnoftimebuilder.block.templates';
  import { FoodProperties } from 'net.minecraft.world.food';

  interface ItemDoTB extends Item {}
  class ItemDoTB extends Item {
    constructor();

    constructor(hasTooltip: boolean);

    constructor(properties: Properties);

    constructor(properties: Properties, hasTooltip: boolean);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltips: Component[], flagsIn: TooltipFlag): void;
  }


  interface PotAndBlockItem extends IHasFlowerPot, BlockItem {}
  class PotAndBlockItem extends IHasFlowerPot {
    constructor(block: Block, properties: Properties);
    get potBlock(): FlowerPotBlockAA;
    set potBlock(pot: FlowerPotBlockAA);
    useOn(context: UseOnContext): InteractionResult;
  }


  interface PotItem extends IHasFlowerPot, ItemDoTB {}
  class PotItem extends IHasFlowerPot {
    get potBlock(): FlowerPotBlockAA;
    set potBlock(pot: FlowerPotBlockAA);
    useOn(context: UseOnContext): InteractionResult;
  }


  interface SoilSeedsItem extends IHasFlowerPot, BlockItem {}
  class SoilSeedsItem extends IHasFlowerPot {
    constructor(crops: T, food: FoodProperties);
    get potBlock(): FlowerPotBlockAA;
    place(context: BlockPlaceContext): InteractionResult;
    set potBlock(pot: FlowerPotBlockAA);
    useOn(context: UseOnContext): InteractionResult;
  }

}

declare module 'org.dawnoftimebuilder.mixin.api' {
  class CreativeScreen {
    dOTBuilder$getPage(): number;
  }

}

declare module 'org.dawnoftimebuilder.mixin.impl' {
  import { WidgetSprites } from 'net.minecraft.client.gui.components';
  import { BlockEntity, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Fluid } from 'net.minecraft.world.level.material';

  class AbstractButtonAccessor {
    get sprites(): WidgetSprites;
  }


  interface BedBlockEntityMixin extends BlockEntity {}
  class BedBlockEntityMixin extends BlockEntity {
    constructor(type: BlockEntityType<any>, pos: BlockPos, blockState: BlockState);
    isValidBlockState(state: BlockState): boolean;
  }


  class BucketItemAccessor {
    get content(): Fluid;
  }


  class MixinStateDefinitionBuilder<O = any, S extends StateHolder<O, S> = any> {
  }

}

declare module 'org.dawnoftimebuilder.mixin.impl.client' {
  import { EffectRenderingInventoryScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { CreativeScreen } from 'org.dawnoftimebuilder.mixin.api';
  import { CallbackInfo, CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { CreativeModeTab } from 'net.minecraft.world.item';
  import { Boolean } from 'java.lang';

  interface CreativeInventoryMixin extends CreativeScreen, EffectRenderingInventoryScreen<ItemPickerMenu> {}
  class CreativeInventoryMixin extends CreativeScreen {
    dOTBuilder$getPage(): number;
    dawnoftimebuilder$init(ci: CallbackInfo): void;
    dawnoftimebuilder$mouseScrolled(mouseX: number, mouseY: number, scrollX: number, scrollY: number, cir: CallbackInfoReturnable<boolean>): void;
    dawnoftimebuilder$render($$0: GuiGraphics, $$1: number, $$2: number, $$3: number, ci: CallbackInfo): void;
    dawnoftimebuilder$selectTab($$0: CreativeModeTab, ci: CallbackInfo): void;
    mouseScrolled(var1: number, var3: number, var5: number, var7: number): boolean;
  }

}

declare module 'org.dawnoftimebuilder.mixin.neoforge' {
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';

  class CropBlockAccessor {
    static getGrowthSpeed(state: BlockState, level: BlockGetter, pos: BlockPos): number;
  }

}

declare module 'org.dawnoftimebuilder.platform' {
  import { IPlatformHelper } from 'org.dawnoftimebuilder.platform.services';
  import { DoTBConfig } from 'org.dawnoftimebuilder';
  import { Player } from 'net.minecraft.world.entity.player';
  import { MenuProvider } from 'net.minecraft.world';
  import { Function } from 'java.util.function';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { Class } from 'java.lang';

  interface NeoForgePlatformHelper extends IPlatformHelper {}
  class NeoForgePlatformHelper extends IPlatformHelper {
    get config(): DoTBConfig;
    get platformName(): string;
    getGrowthSpeed(block: Block, level: BlockGetter, pos: BlockPos): number;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(modId: string): boolean;
    openScreenHandler<D>(playerEntity: Player, provider: MenuProvider, dataWriter: Function<ServerPlayer, D>): void;
  }


  class Services {
    static readonly PLATFORM: IPlatformHelper;
    static load<T>(clazz: Class<T>): T;
  }

}

declare module 'org.dawnoftimebuilder.platform.services' {
  import { DoTBConfig } from 'org.dawnoftimebuilder';
  import { Player } from 'net.minecraft.world.entity.player';
  import { MenuProvider } from 'net.minecraft.world';
  import { Function } from 'java.util.function';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';

  class IPlatformHelper {
    get config(): DoTBConfig;
    get environmentName(): string;
    get platformName(): string;
    getGrowthSpeed(var1: Block, var2: BlockGetter, var3: BlockPos): number;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(var1: string): boolean;
    openScreenHandler<D>(var1: Player, var2: MenuProvider, var3: Function<ServerPlayer, D>): void;
  }

}

declare module 'org.dawnoftimebuilder.recipe' {
  import { Recipe, SingleRecipeInput, Ingredient, RecipeSerializer, RecipeType } from 'net.minecraft.world.item.crafting';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Level } from 'net.minecraft.world.level';
  import { Provider } from 'HolderLookup';
  import { NonNullList } from 'net.minecraft.core';
  import { Factory } from 'org.dawnoftimebuilder.recipe.DryerRecipeSerializer';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';

  interface DryerRecipe extends Recipe<SingleRecipeInput> {}
  class DryerRecipe extends Recipe<SingleRecipeInput> {
    constructor(group: string, ingredient: Ingredient, result: ItemStack, experience: number, dryingTime: number);
    assemble(input: SingleRecipeInput, registries: Provider): ItemStack;
    canCraftInDimensions(width: number, height: number): boolean;
    get dryingTime(): number;
    get group(): string;
    get ingredients(): NonNullList<Ingredient>;
    get serializer(): RecipeSerializer<any>;
    get toastSymbol(): ItemStack;
    get type(): RecipeType<any>;
    getResultItem(registries: Provider): ItemStack;
    isSpecial(): boolean;
    matches(input: SingleRecipeInput, level: Level): boolean;
  }


  interface DryerRecipeSerializer extends RecipeSerializer<DryerRecipe> {}
  class DryerRecipeSerializer extends RecipeSerializer<DryerRecipe> {
    constructor(factory: Factory<DryerRecipe>);
    codec(): MapCodec<DryerRecipe>;
    fromNetwork(buffer: RegistryFriendlyByteBuf): DryerRecipe;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, DryerRecipe>;
    toNetwork(buffer: RegistryFriendlyByteBuf, recipe: DryerRecipe): void;
  }

}

declare module 'org.dawnoftimebuilder.recipe.DryerRecipeSerializer' {
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { ItemStack } from 'net.minecraft.world.item';

  class Factory<T extends DryerRecipe = any> {
    create(var1: string, var2: Ingredient, var3: ItemStack, var4: number, var5: number): T;
  }

}

declare module 'org.dawnoftimebuilder.registry' {
  import { Supplier, BiFunction, Function } from 'java.util.function';
  import { BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Block } from 'net.minecraft.world.level.block';
  import { Map, HashMap, List } from 'java.util';
  import { TagKey } from 'net.minecraft.tags';
  import { Item, CreativeModeTab, ItemStack } from 'net.minecraft.world.item';
  import { BlockColor } from 'net.minecraft.client.color.block';
  import { ItemColor } from 'net.minecraft.client.color.item';
  import { Component } from 'net.minecraft.network.chat';
  import { EntityType, Entity } from 'net.minecraft.world.entity';
  import { Builder } from 'EntityType';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { PlacedFeature } from 'net.minecraft.world.level.levelgen.placement';
  import { FeatureConfiguration } from 'net.minecraft.world.level.levelgen.feature.configurations';
  import { Feature } from 'net.minecraft.world.level.levelgen.feature';
  import { MenuType, AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { MenuTypeFactory } from 'org.dawnoftimebuilder.registry.DoTBMenuTypesRegistry';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { RecipeSerializer, Recipe, RecipeType } from 'net.minecraft.world.item.crafting';

  class DoTBBlockEntitiesRegistry {
    static INSTANCE: DoTBBlockEntitiesRegistry;
    readonly DRYER: Supplier;
    readonly DISPLAYER: Supplier;
    register<T extends BlockEntity>(var1: string, var2: BiFunction<BlockPos, BlockState, T>, var3: Supplier<Block[]>): Supplier<BlockEntityType<T>>;
  }


  class DoTBBlocksRegistry {
    static INSTANCE: DoTBBlocksRegistry;
    static blockTagsMap: Map;
    static readonly POT_BLOCKS: HashMap;
    readonly ACACIA_PLANKS_EDGE: Supplier;
    readonly ACACIA_PLANKS_PLATE: Supplier;
    readonly ACACIA_PERGOLA: Supplier;
    readonly ACACIA_LATTICE: Supplier;
    readonly ACACIA_BEAM: Supplier;
    readonly ACACIA_WALL: Supplier;
    readonly ACACIA_SUPPORT_BEAM: Supplier;
    readonly ACACIA_SUPPORT_SLAB: Supplier;
    readonly BAMBOO_PLANKS_EDGE: Supplier;
    readonly BAMBOO_PLANKS_PLATE: Supplier;
    readonly BAMBOO_PERGOLA: Supplier;
    readonly BAMBOO_LATTICE: Supplier;
    readonly BAMBOO_BEAM: Supplier;
    readonly BAMBOO_WALL: Supplier;
    readonly BAMBOO_SUPPORT_BEAM: Supplier;
    readonly BAMBOO_SUPPORT_SLAB: Supplier;
    readonly BIRCH_PLANKS_EDGE: Supplier;
    readonly BIRCH_PLANKS_PLATE: Supplier;
    readonly BIRCH_PERGOLA: Supplier;
    readonly BIRCH_LATTICE: Supplier;
    readonly BIRCH_BEAM: Supplier;
    readonly BIRCH_WALL: Supplier;
    readonly BIRCH_SUPPORT_BEAM: Supplier;
    readonly BIRCH_SUPPORT_SLAB: Supplier;
    readonly CANDLESTICK: Supplier;
    readonly CHERRY_PLANKS_EDGE: Supplier;
    readonly CHERRY_PLANKS_PLATE: Supplier;
    readonly CHERRY_PERGOLA: Supplier;
    readonly CHERRY_LATTICE: Supplier;
    readonly CHERRY_BEAM: Supplier;
    readonly CHERRY_WALL: Supplier;
    readonly CHERRY_SUPPORT_BEAM: Supplier;
    readonly CHERRY_SUPPORT_SLAB: Supplier;
    readonly CRIMSON_PLANKS_EDGE: Supplier;
    readonly CRIMSON_PLANKS_PLATE: Supplier;
    readonly CRIMSON_PERGOLA: Supplier;
    readonly CRIMSON_SUPPORT_SLAB: Supplier;
    readonly CRIMSON_LATTICE: Supplier;
    readonly CRIMSON_BEAM: Supplier;
    readonly CRIMSON_SUPPORT_BEAM: Supplier;
    readonly CRIMSON_WALL: Supplier;
    readonly DARK_OAK_PLANKS_EDGE: Supplier;
    readonly DARK_OAK_PLANKS_PLATE: Supplier;
    readonly DARK_OAK_PERGOLA: Supplier;
    readonly DARK_OAK_LATTICE: Supplier;
    readonly DARK_OAK_BEAM: Supplier;
    readonly DARK_OAK_WALL: Supplier;
    readonly DARK_OAK_SUPPORT_BEAM: Supplier;
    readonly DARK_OAK_SUPPORT_SLAB: Supplier;
    readonly JUNGLE_PLANKS_EDGE: Supplier;
    readonly JUNGLE_PLANKS_PLATE: Supplier;
    readonly JUNGLE_PERGOLA: Supplier;
    readonly JUNGLE_LATTICE: Supplier;
    readonly JUNGLE_BEAM: Supplier;
    readonly JUNGLE_WALL: Supplier;
    readonly JUNGLE_SUPPORT_BEAM: Supplier;
    readonly JUNGLE_SUPPORT_SLAB: Supplier;
    readonly MANGROVE_PLANKS_EDGE: Supplier;
    readonly MANGROVE_PLANKS_PLATE: Supplier;
    readonly MANGROVE_PERGOLA: Supplier;
    readonly MANGROVE_LATTICE: Supplier;
    readonly MANGROVE_BEAM: Supplier;
    readonly MANGROVE_WALL: Supplier;
    readonly MANGROVE_SUPPORT_BEAM: Supplier;
    readonly MANGROVE_SUPPORT_SLAB: Supplier;
    readonly OAK_PLANKS_PLATE: Supplier;
    readonly OAK_PLANKS_EDGE: Supplier;
    readonly OAK_PERGOLA: Supplier;
    readonly OAK_LATTICE: Supplier;
    readonly OAK_BEAM: Supplier;
    readonly OAK_WALL: Supplier;
    readonly OAK_SUPPORT_BEAM: Supplier;
    readonly OAK_SUPPORT_SLAB: Supplier;
    readonly RAMMED_DIRT: Supplier;
    readonly SPRUCE_PLANKS_EDGE: Supplier;
    readonly SPRUCE_PLANKS_PLATE: Supplier;
    readonly SPRUCE_PERGOLA: Supplier;
    readonly SPRUCE_LATTICE: Supplier;
    readonly SPRUCE_BEAM: Supplier;
    readonly SPRUCE_WALL: Supplier;
    readonly SPRUCE_SUPPORT_BEAM: Supplier;
    readonly SPRUCE_SUPPORT_SLAB: Supplier;
    readonly THATCH_WHEAT: Supplier;
    readonly THATCH_WHEAT_EDGE: Supplier;
    readonly THATCH_WHEAT_PLATE: Supplier;
    readonly THATCH_WHEAT_SLAB: Supplier;
    THATCH_WHEAT_STAIRS: Supplier;
    readonly THATCH_BAMBOO: Supplier;
    readonly THATCH_BAMBOO_EDGE: Supplier;
    readonly THATCH_BAMBOO_PLATE: Supplier;
    readonly THATCH_BAMBOO_SLAB: Supplier;
    THATCH_BAMBOO_STAIRS: Supplier;
    readonly WARPED_PLANKS_EDGE: Supplier;
    readonly WARPED_PLANKS_PLATE: Supplier;
    readonly WARPED_SUPPORT_SLAB: Supplier;
    readonly WARPED_PERGOLA: Supplier;
    readonly WARPED_LATTICE: Supplier;
    readonly WARPED_BEAM: Supplier;
    readonly WARPED_SUPPORT_BEAM: Supplier;
    readonly WARPED_WALL: Supplier;
    readonly GOLD_PLATED_SMOOTH_BLOCK: Supplier;
    GOLD_PLATED_SMOOTH_STAIRS: Supplier;
    readonly GOLD_PLATED_SMOOTH_PLATE: Supplier;
    readonly GOLD_PLATED_SMOOTH_SLAB: Supplier;
    readonly GOLD_PLATED_SMOOTH_EDGE: Supplier;
    readonly GOLD_PLATED_SMOOTH_WALL: Supplier;
    readonly FIREPLACE: Supplier;
    readonly IRON_PORTCULLIS: Supplier;
    readonly IRON_FANCY_LANTERN: Supplier;
    readonly IRON_COLUMN: Supplier;
    readonly WROUGHT_IRON_FENCE: Supplier;
    readonly WATER_FLOWING_TRICKLE: Supplier;
    readonly WATER_SOURCE_TRICKLE: Supplier;
    readonly COBBLED_LIMESTONE: Supplier;
    readonly LIMESTONE_BRICKS: Supplier;
    readonly LIMESTONE_BRICKS_EDGE: Supplier;
    readonly LIMESTONE_BRICKS_PLATE: Supplier;
    readonly LIMESTONE_BRICKS_SLAB: Supplier;
    LIMESTONE_BRICKS_STAIRS: Supplier;
    readonly LIMESTONE_BRICKS_WALL: Supplier;
    readonly LIMESTONE_BALUSTER: Supplier;
    readonly LIMESTONE_SIDED_COLUMN: Supplier;
    readonly LIMESTONE_GARGOYLE: Supplier;
    readonly LIMESTONE_CHIMNEY: Supplier;
    readonly LIMESTONE_FIREPLACE: Supplier;
    readonly ROOFING_SLATES: Supplier;
    ROOFING_SLATES_STAIRS: Supplier;
    readonly ROOFING_SLATES_PLATE: Supplier;
    readonly ROOFING_SLATES_SLAB: Supplier;
    readonly ROOFING_SLATES_EDGE: Supplier;
    readonly ROOFING_SLATES_WALL: Supplier;
    readonly BLACK_WROUGHT_IRON_BALUSTER: Supplier;
    readonly BLACK_WROUGHT_IRON_FENCE: Supplier;
    readonly REINFORCED_BLACK_WROUGHT_IRON_FENCE: Supplier;
    readonly REINFORCED_GOLDEN_WROUGHT_IRON_FENCE: Supplier;
    readonly BOXWOOD_BUSH: Supplier;
    readonly BOXWOOD_TALL_HEDGE: Supplier;
    readonly BOXWOOD_SMALL_HEDGE: Supplier;
    readonly FLAT_ROOF_TILES: Supplier;
    FLAT_ROOF_TILES_STAIRS: Supplier;
    readonly FLAT_ROOF_TILES_PLATE: Supplier;
    readonly FLAT_ROOF_TILES_SLAB: Supplier;
    readonly FLAT_ROOF_TILES_EDGE: Supplier;
    readonly FLAT_ROOF_TILES_WALL: Supplier;
    readonly LATTICE_GLASS: Supplier;
    readonly LATTICE_GLASS_PANE: Supplier;
    readonly LATTICE_WAXED_OAK_WINDOW: Supplier;
    readonly LATTICE_STONE_BRICKS_WINDOW: Supplier;
    readonly STONE_BRICKS_ARROWSLIT: Supplier;
    readonly STONE_BRICKS_CHIMNEY: Supplier;
    readonly STONE_BRICKS_EDGE: Supplier;
    readonly STONE_BRICKS_FIREPLACE: Supplier;
    readonly STONE_BRICKS_MACHICOLATION: Supplier;
    readonly STONE_BRICKS_PLATE: Supplier;
    readonly STONE_BRICKS_MASONRY: Supplier;
    STONE_BRICKS_MASONRY_STAIRS: Supplier;
    readonly STONE_BRICKS_MASONRY_PLATE: Supplier;
    readonly STONE_BRICKS_MASONRY_SLAB: Supplier;
    readonly STONE_BRICKS_MASONRY_EDGE: Supplier;
    readonly STONE_BRICKS_MASONRY_WALL: Supplier;
    readonly WAXED_OAK_FRAMED_RAMMED_DIRT: Supplier;
    readonly WAXED_OAK_FRAMED_RAMMED_DIRT_PILLAR: Supplier;
    readonly WAXED_OAK_PLANKS: Supplier;
    readonly WAXED_OAK_DOOR: Supplier;
    readonly WAXED_OAK_TRAPDOOR: Supplier;
    readonly WAXED_OAK_SHUTTER: Supplier;
    readonly WAXED_OAK_LOG_STRIPPED: Supplier;
    readonly WAXED_OAK_BALUSTER: Supplier;
    readonly WAXED_OAK_BEAM: Supplier;
    readonly WAXED_OAK_SUPPORT_BEAM: Supplier;
    readonly WAXED_OAK_SUPPORT_SLAB: Supplier;
    readonly WAXED_OAK_SMALL_SHUTTER: Supplier;
    readonly WAXED_OAK_TIMBER_FRAME: Supplier;
    readonly WAXED_OAK_TIMBER_FRAME_CORNER: Supplier;
    readonly WAXED_OAK_TIMBER_FRAME_CROSSED: Supplier;
    readonly WAXED_OAK_TIMBER_FRAME_PILLAR: Supplier;
    readonly WAXED_OAK_TIMBER_FRAME_SQUARED: Supplier;
    readonly WAXED_OAK_FENCE: Supplier;
    readonly WAXED_OAK_FENCE_GATE: Supplier;
    readonly WAXED_OAK_WALL: Supplier;
    readonly WAXED_OAK_PERGOLA: Supplier;
    readonly WAXED_OAK_LATTICE: Supplier;
    readonly WAXED_OAK_PLANKS_EDGE: Supplier;
    readonly WAXED_OAK_PLANKS_PLATE: Supplier;
    readonly WAXED_OAK_PLANKS_SLAB: Supplier;
    WAXED_OAK_PLANKS_STAIRS: Supplier;
    readonly WAXED_OAK_CHANDELIER: Supplier;
    readonly WAXED_OAK_CHAIR: Supplier;
    readonly WAXED_OAK_TABLE: Supplier;
    IVY: Supplier;
    GERANIUM_PINK: Supplier;
    readonly PLANTER_GERANIUM_PINK: Supplier;
    readonly STONE_BRICKS_POOL: Supplier;
    readonly STONE_BRICKS_SMALL_POOL: Supplier;
    readonly STONE_BRICKS_FAUCET: Supplier;
    readonly STONE_BRICKS_WATER_JET: Supplier;
    readonly CHARRED_SPRUCE_PLANKS: Supplier;
    readonly CHARRED_SPRUCE_LOG_STRIPPED: Supplier;
    readonly CHARRED_SPRUCE_PLANKS_EDGE: Supplier;
    readonly CHARRED_SPRUCE_PLANKS_PLATE: Supplier;
    readonly CHARRED_SPRUCE_PLANKS_SLAB: Supplier;
    CHARRED_SPRUCE_PLANKS_STAIRS: Supplier;
    readonly CHARRED_SPRUCE_BOARDS: Supplier;
    readonly CHARRED_SPRUCE_DOOR: Supplier;
    readonly CHARRED_SPRUCE_TRAPDOOR: Supplier;
    readonly CHARRED_SPRUCE_SHUTTERS: Supplier;
    readonly CHARRED_SPRUCE_TALL_SHUTTERS: Supplier;
    readonly CHARRED_SPRUCE_FOUNDATION: Supplier;
    readonly CHARRED_SPRUCE_FOUNDATION_SLAB: Supplier;
    readonly CHARRED_SPRUCE_WALL: Supplier;
    readonly CHARRED_SPRUCE_FENCE: Supplier;
    readonly CHARRED_SPRUCE_FENCE_GATE: Supplier;
    readonly CHARRED_SPRUCE_RAILING: Supplier;
    readonly CHARRED_SPRUCE_FANCY_RAILING: Supplier;
    readonly CHARRED_SPRUCE_PERGOLA: Supplier;
    readonly CHARRED_SPRUCE_LATTICE: Supplier;
    readonly CHARRED_SPRUCE_SUPPORT_SLAB: Supplier;
    readonly CHARRED_SPRUCE_SUPPORT_BEAM: Supplier;
    readonly CHARRED_SPRUCE_BEAM: Supplier;
    readonly CHARRED_SPRUCE_TIMBER_FRAME: Supplier;
    readonly CHARRED_SPRUCE_TIMBER_FRAME_PILLAR: Supplier;
    readonly RED_PAINTED_BEAM: Supplier;
    readonly GRAY_ROOF_TILES: Supplier;
    GRAY_ROOF_TILES_STAIRS: Supplier;
    readonly GRAY_ROOF_TILES_PLATE: Supplier;
    readonly GRAY_ROOF_TILES_SLAB: Supplier;
    readonly GRAY_ROOF_TILES_EDGE: Supplier;
    readonly GRAY_ROOF_TILES_WALL: Supplier;
    CHARRED_SPRUCE_ROOF_SUPPORT: Supplier;
    readonly STEPPING_STONES: Supplier;
    readonly STEPPING_STONES_SLAB: Supplier;
    readonly CURVED_RAKED_GRAVEL: Supplier;
    readonly STRAIGHT_RAKED_GRAVEL: Supplier;
    readonly CAST_IRON_TEAPOT_GRAY: Supplier;
    readonly CAST_IRON_TEAPOT_GREEN: Supplier;
    readonly CAST_IRON_TEAPOT_DECORATED: Supplier;
    readonly CAST_IRON_TEACUP_GRAY: Supplier;
    readonly CAST_IRON_TEACUP_GREEN: Supplier;
    readonly CAST_IRON_TEACUP_DECORATED: Supplier;
    readonly BAMBOO_DRYING_TRAY: Supplier;
    CAMELLIA: Supplier;
    MULBERRY: Supplier;
    readonly IKEBANA_FLOWER_POT: Supplier;
    readonly SPRUCE_LOW_TABLE: Supplier;
    readonly SPRUCE_LEGLESS_CHAIR: Supplier;
    readonly WHITE_LITTLE_FLAG: Supplier;
    readonly PAPER_DOOR: Supplier;
    readonly PAPER_WALL: Supplier;
    readonly PAPER_WALL_FLAT: Supplier;
    readonly PAPER_WALL_WINDOWS: Supplier;
    readonly PAPER_WALL_FLOWERY: Supplier;
    readonly PAPER_FOLDING_SCREEN: Supplier;
    readonly RED_PAPER_LANTERN: Supplier;
    readonly PAPER_LAMP: Supplier;
    readonly STONE_LANTERN: Supplier;
    readonly RICE: Supplier;
    readonly SMALL_TATAMI_MAT: Supplier;
    readonly SMALL_TATAMI_FLOOR: Supplier;
    readonly TATAMI_MAT: Supplier;
    readonly TATAMI_FLOOR: Supplier;
    readonly LIGHT_GRAY_FUTON: Supplier;
    readonly IRORI_FIREPLACE: Supplier;
    readonly SAKE_BOTTLE: Supplier;
    readonly SAKE_CUP: Supplier;
    readonly STICK_BUNDLE: Supplier;
    readonly MAPLE_RED_TRUNK: Supplier;
    readonly MAPLE_RED_LEAVES: Supplier;
    MAPLE_RED_SAPLING: Supplier;
    readonly PAUSED_MAPLE_RED_SAPLING: Supplier;
    readonly PERSIAN_CARPET_RED: Supplier;
    readonly PERSIAN_CARPET_DELICATE_RED: Supplier;
    MORAQ_MOSAIC_RECESS: Supplier;
    readonly MORAQ_MOSAIC_RELIEF: Supplier;
    readonly MORAQ_MOSAIC_TRADITIONAL: Supplier;
    readonly MORAQ_MOSAIC_DELICATE: Supplier;
    readonly MORAQ_MOSAIC_BORDER: Supplier;
    readonly MORAQ_MOSAIC_GEOMETRIC: Supplier;
    readonly MORAQ_MOSAIC_PATTERN: Supplier;
    readonly MORAQ_MOSAIC_COLUMN: Supplier;
    readonly SANDSTONE_BRICKS: Supplier;
    SANDSTONE_BRICKS_STAIRS: Supplier;
    readonly SANDSTONE_BRICKS_PLATE: Supplier;
    readonly SANDSTONE_BRICKS_SLAB: Supplier;
    readonly SANDSTONE_BRICKS_EDGE: Supplier;
    readonly SANDSTONE_BRICKS_WALL: Supplier;
    readonly SANDSTONE_BRICKS_TURQUOISE_PATTERN: Supplier;
    SANDSTONE_BRICKS_TURQUOISE_PATTERN_STAIRS: Supplier;
    readonly SANDSTONE_BRICKS_TURQUOISE_PATTERN_PLATE: Supplier;
    readonly SANDSTONE_BRICKS_TURQUOISE_PATTERN_SLAB: Supplier;
    readonly SANDSTONE_BRICKS_TURQUOISE_PATTERN_EDGE: Supplier;
    readonly SANDSTONE_BRICKS_TURQUOISE_PATTERN_WALL: Supplier;
    readonly SANDSTONE_SCULPTED_RELIEF: Supplier;
    readonly SANDSTONE_CRENELATION: Supplier;
    COMMELINA: Supplier;
    readonly PLASTERED_STONE: Supplier;
    readonly PLASTERED_STONE_EDGE: Supplier;
    readonly PLASTERED_STONE_PLATE: Supplier;
    readonly PLASTERED_STONE_SLAB: Supplier;
    PLASTERED_STONE_STAIRS: Supplier;
    readonly PLASTERED_STONE_WINDOW: Supplier;
    readonly CHISELED_PLASTERED_STONE: Supplier;
    readonly CHISELED_PLASTERED_STONE_FRIEZE: Supplier;
    readonly ORNAMENTED_CHISELED_PLASTERED_STONE: Supplier;
    readonly RED_PLASTERED_STONE: Supplier;
    readonly RED_CHISELED_PLASTERED_STONE: Supplier;
    readonly RED_ORNAMENTED_CHISELED_PLASTERED_STONE: Supplier;
    readonly RED_PLASTERED_STONE_EDGE: Supplier;
    readonly RED_PLASTERED_STONE_FRIEZE: Supplier;
    readonly RED_PLASTERED_STONE_PLATE: Supplier;
    readonly RED_PLASTERED_STONE_SLAB: Supplier;
    RED_PLASTERED_STONE_STAIRS: Supplier;
    readonly RED_SMALL_PLASTERED_STONE_FRIEZE: Supplier;
    readonly RED_ORNAMENTED_PLASTERED_STONE_FRIEZE: Supplier;
    readonly RED_SCULPTED_PLASTERED_STONE_FRIEZE: Supplier;
    readonly GREEN_CHISELED_PLASTERED_STONE: Supplier;
    readonly GREEN_ORNAMENTED_CHISELED_PLASTERED_STONE: Supplier;
    readonly GREEN_ORNAMENTED_PLASTERED_STONE_FRIEZE: Supplier;
    readonly GREEN_PLASTERED_STONE_FRIEZE: Supplier;
    readonly GREEN_SCULPTED_PLASTERED_STONE_FRIEZE: Supplier;
    readonly GREEN_SMALL_PLASTERED_STONE_FRIEZE: Supplier;
    readonly WILD_MAIZE: Supplier;
    MAIZE: Supplier;
    readonly RED_ORNAMENTED_PLASTERED_STONE: Supplier;
    readonly PLASTERED_STONE_COLUMN: Supplier;
    readonly PLASTERED_STONE_CRESSET: Supplier;
    readonly FEATHERED_SERPENT_SCULPTURE: Supplier;
    readonly SERPENT_SCULPTED_COLUMN: Supplier;
    readonly SANDSTONE_PLATE: Supplier;
    readonly SANDSTONE_EDGE: Supplier;
    readonly CUT_SANDSTONE_STAIRS: Supplier;
    readonly CUT_SANDSTONE_PLATE: Supplier;
    readonly CUT_SANDSTONE_EDGE: Supplier;
    readonly SMOOTH_SANDSTONE_PLATE: Supplier;
    readonly SMOOTH_SANDSTONE_EDGE: Supplier;
    readonly OCHRE_ROOF_TILES: Supplier;
    readonly OCHRE_ROOF_TILES_EDGE: Supplier;
    readonly OCHRE_ROOF_TILES_PLATE: Supplier;
    OCHRE_ROOF_TILES_STAIRS: Supplier;
    readonly OCHRE_ROOF_TILES_WALL: Supplier;
    readonly SANDSTONE_BOT_OCHRE_ROOF_TILES_TOP: Supplier;
    readonly CUT_SANDSTONE_BOT_OCHRE_ROOF_TILES_TOP: Supplier;
    readonly SMOOTH_SANDSTONE_BOT_OCHRE_ROOF_TILES_TOP: Supplier;
    OCHRE_ROOF_TILES_SLAB: Supplier;
    readonly SANDSTONE_COLUMN: Supplier;
    readonly SANDSTONE_SIDED_COLUMN: Supplier;
    readonly COVERED_SANDSTONE_WALL: Supplier;
    readonly TERRACOTTA_WALL: Supplier;
    readonly ROMAN_FRESCO_BLACK: Supplier;
    readonly ROMAN_FRESCO_RED: Supplier;
    readonly MOSAIC_FLOOR: Supplier;
    readonly MOSAIC_FLOOR_DELICATE: Supplier;
    readonly MOSAIC_FLOOR_ROSETTE: Supplier;
    readonly BIRCH_FANCY_FENCE: Supplier;
    readonly BIRCH_FOOTSTOOL: Supplier;
    readonly BIRCH_COUCH: Supplier;
    readonly MARBLE_STATUE_MARS: Supplier;
    readonly WILD_GRAPE: Supplier;
    CYPRESS: Supplier;
    readonly BIG_FLOWER_POT: Supplier;
    readonly MARBLE_BIG_FLOWER_POT: Supplier;
    readonly MARBLE_FANCY_FENCE: Supplier;
    readonly MARBLE_COLUMN: Supplier;
    readonly MARBLE_SIDED_COLUMN: Supplier;
    readonly MARBLE_COFFER: Supplier;
    readonly MARBLE_COFFER_SLAB: Supplier;
    addBlockTag<T extends Block>(block: Supplier<T>, tag: TagKey<Block>): void;
    postRegister(): void;
    register<T extends Block>(id: string, block: Supplier<T>): Supplier<T>;
    register<T extends Block>(id: string, block: Supplier<T>, ...tagKeys: TagKey<Block>[]): Supplier<T>;
    registerWithFlowerPotItem<T extends Block, Y extends Item>(var1: string, var2: Supplier<T>, var3: string, var4: Function<T, Y>): Supplier<T>;
    registerWithFlowerPotItem<T extends Block, Y extends Item>(id: string, block: Supplier<T>, item: Function<T, Y>): Supplier<T>;
    registerWithItem<T extends Block, Y extends Item>(var1: string, var2: Supplier<T>, var3: Function<T, Y>, ...var4: TagKey<Block>[]): Supplier<T>;
  }


  class DoTBColorsRegistry {
    static readonly WATER_BLOCK_COLOR: BlockColor;
    static readonly WATER_ITEM_COLOR: ItemColor;
    static get blocksColorRegistry(): Map<BlockColor, Supplier<Block>[]>;
    static get itemsColorRegistry(): Map<ItemColor, Supplier<Item>[]>;
    static initialize(): void;
  }


  class DoTBCreativeModeTabsRegistry {
    static INSTANCE: DoTBCreativeModeTabsRegistry;
    DOT_TAB: Supplier;
    register<T extends CreativeModeTab>(var1: string, var2: Supplier<ItemStack>, var3: Component): Supplier<CreativeModeTab>;
  }


  class DoTBEntitiesRegistry {
    static INSTANCE: DoTBEntitiesRegistry;
    readonly CHAIR_ENTITY: Supplier;
    readonly SILKMOTH_ENTITY: Supplier;
    register<T extends Entity>(var1: string, var2: Supplier<Builder<T>>): Supplier<EntityType<T>>;
  }


  class DoTBFeaturesRegistry {
    static readonly CAMELLIA_PLACED_KEY: ResourceKey;
    static readonly COMMELINA_PLACED_KEY: ResourceKey;
    static readonly CYPRESS_PLACED_KEY: ResourceKey;
    static readonly RED_MAPLE_PLACED_KEY: ResourceKey;
    static readonly BOXWOOD_BUSH_PLACED_KEY: ResourceKey;
    static readonly MULBERRY_PLACED_KEY: ResourceKey;
    static readonly RICE_PLACED_KEY: ResourceKey;
    static readonly WILD_GRAPE_PLACED_KEY: ResourceKey;
    static readonly WILD_MAIZE_PLACED_KEY: ResourceKey;
    static readonly GERANIUM_PINK_PLACED_KEY: ResourceKey;
    static readonly IVY_PLACED_KEY: ResourceKey;
    static INSTANCE: DoTBFeaturesRegistry;
    readonly DOT_FEATURE: Supplier;
    readonly DEFAULT_CROPS: Supplier;
    register<Y extends FeatureConfiguration, T extends Feature<Y>>(var1: string, var2: Supplier<T>): Supplier<T>;
    static registerKey(name: string): ResourceKey<PlacedFeature>;
  }


  class DoTBItemsRegistry {
    static INSTANCE: DoTBItemsRegistry;
    readonly ANCIENTARCHI: Supplier;
    readonly SILK_WORMS: Supplier;
    readonly SILK_WORMS_HATCHERY: Supplier;
    readonly SILK_WORM_EGGS: Supplier;
    readonly SILK_COCOONS: Supplier;
    readonly SILK: Supplier;
    readonly TEA_LEAVES: Supplier;
    readonly CAMELLIA_LEAVES: Supplier;
    readonly UNFIRED_CLAY_TILE: Supplier;
    readonly CLAY_TILE: Supplier;
    readonly CLAY_TILE_WHITE: Supplier;
    readonly CLAY_TILE_ORANGE: Supplier;
    readonly CLAY_TILE_BLACK: Supplier;
    readonly CLAY_TILE_BLUE: Supplier;
    readonly CLAY_TILE_CYAN: Supplier;
    readonly UNFIRED_CLAY_ROOF_TILE: Supplier;
    readonly GRAY_CLAY_ROOF_TILE: Supplier;
    readonly MULBERRY_LEAVES: Supplier;
    readonly GRAPE: Supplier;
    GRAPE_SEEDS: Supplier;
    postRegister(): void;
    register<T extends Item>(var1: string, var2: Supplier<T>): Supplier<Item>;
    registerWithFlowerPot<T extends Item>(var1: string, var2: Supplier<T>): Supplier<Item>;
    registerWithFlowerPot<T extends Item>(var1: string, var2: string, var3: Supplier<T>): Supplier<Item>;
  }


  class DoTBMenuTypesRegistry {
    static INSTANCE: DoTBMenuTypesRegistry;
    readonly DISPLAYER: Supplier;
    register<T extends AbstractContainerMenu, D>(var1: string, var2: MenuTypeFactory<T, D>, var3: StreamCodec<RegistryFriendlyByteBuf, D>): Supplier<MenuType<T>>;
  }


  class DoTBRecipeSerializersRegistry {
    static INSTANCE: DoTBRecipeSerializersRegistry;
    readonly DRYER: Supplier;
    register<T extends RecipeSerializer<Recipe<any>>>(var1: string, var2: Supplier<T>): Supplier<T>;
  }


  class DoTBRecipeTypesRegistry {
    static INSTANCE: DoTBRecipeTypesRegistry;
    readonly DRYING: Supplier;
    register<T extends Recipe<any>>(var1: string): Supplier<RecipeType<T>>;
  }


  class DoTBTags {
    static INSTANCE: DoTBTags;
    readonly LIGHTERS: TagKey;
    readonly COVERED_BLOCKS: TagKey;
    readonly GRAVEL: TagKey;
    registerBlock(var1: ResourceLocation): TagKey<Block>;
    registerItem(var1: ResourceLocation): TagKey<Item>;
  }

}

declare module 'org.dawnoftimebuilder.registry.DoTBMenuTypesRegistry' {
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class MenuTypeFactory<T extends AbstractContainerMenu = any, D = any> {
    create(var1: number, var2: Inventory, var3: D, var4: RegistryFriendlyByteBuf): T;
  }

}

declare module 'org.dawnoftimebuilder.RegistryImpls' {
  import { DoTBEntitiesRegistry, DoTBBlocksRegistry, DoTBItemsRegistry, DoTBBlockEntitiesRegistry, DoTBFeaturesRegistry, DoTBMenuTypesRegistry, DoTBRecipeSerializersRegistry, DoTBRecipeTypesRegistry, DoTBTags, DoTBCreativeModeTabsRegistry } from 'org.dawnoftimebuilder.registry';
  import { DeferredRegister } from 'net.neoforged.neoforge.registries';
  import { Supplier, Function, BiFunction } from 'java.util.function';
  import { EntityType, Entity } from 'net.minecraft.world.entity';
  import { Builder } from 'EntityType';
  import { TagKey } from 'net.minecraft.tags';
  import { Block } from 'net.minecraft.world.level.block';
  import { Item, CreativeModeTab, ItemStack } from 'net.minecraft.world.item';
  import { BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { FeatureConfiguration } from 'net.minecraft.world.level.levelgen.feature.configurations';
  import { Feature } from 'net.minecraft.world.level.levelgen.feature';
  import { MenuType, AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { MenuTypeFactory } from 'org.dawnoftimebuilder.registry.DoTBMenuTypesRegistry';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { RecipeSerializer, Recipe, RecipeType } from 'net.minecraft.world.item.crafting';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Component } from 'net.minecraft.network.chat';

  interface ForgeEntitiesRegistry extends DoTBEntitiesRegistry {}
  class ForgeEntitiesRegistry extends DoTBEntitiesRegistry {
    static readonly ENTITY_TYPES_REGISTRY: DeferredRegister;
    register<T extends Entity>(name: string, builder: Supplier<Builder<T>>): Supplier<EntityType<T>>;
  }


  interface ForgeBlocksRegistry extends DoTBBlocksRegistry {}
  class ForgeBlocksRegistry extends DoTBBlocksRegistry {
    static readonly BLOCKS_REGISTRY: DeferredRegister;
    static readonly BLOCK_ITEMS_REGISTRY: DeferredRegister;
    constructor();
    registerWithFlowerPotItem<T extends Block, Y extends Item>(blockID: string, block: Supplier<T>, itemID: string, item: Function<T, Y>): Supplier<T>;
    registerWithFlowerPotItem<T extends Block, Y extends Item>(id: string, block: Supplier<T>, item: Function<T, Y>): Supplier<T>;
    registerWithItem<T extends Block, Y extends Item>(id: string, block: Supplier<T>, item: Function<T, Y>, ...tags: TagKey<Block>[]): Supplier<T>;
  }


  interface ForgeItemsRegistry extends DoTBItemsRegistry {}
  class ForgeItemsRegistry extends DoTBItemsRegistry {
    static readonly ITEMS_REGISTRY: DeferredRegister;
    readonly SILKMOTH_SPAWN_EGG: Supplier;
    constructor();
    register<T extends Item>(name: string, itemSupplier: Supplier<T>): Supplier<Item>;
    registerWithFlowerPot<T extends Item>(name: string, itemSupplier: Supplier<T>): Supplier<Item>;
    registerWithFlowerPot<T extends Item>(plantName: string, seedName: string, itemSupplier: Supplier<T>): Supplier<Item>;
  }


  interface ForgeBlockEntitiesRegistry extends DoTBBlockEntitiesRegistry {}
  class ForgeBlockEntitiesRegistry extends DoTBBlockEntitiesRegistry {
    static readonly BLOCK_ENTITY_TYPES_REGISTRY: DeferredRegister;
    register<T extends BlockEntity>(name: string, factoryIn: BiFunction<BlockPos, BlockState, T>, validBlocksSupplier: Supplier<Block[]>): Supplier<BlockEntityType<T>>;
  }


  interface ForgeFeaturesRegistry extends DoTBFeaturesRegistry {}
  class ForgeFeaturesRegistry extends DoTBFeaturesRegistry {
    static readonly FEATURES_REGISTRY: DeferredRegister;
    register<Y extends FeatureConfiguration, T extends Feature<Y>>(name: string, featureSupplier: Supplier<T>): Supplier<T>;
  }


  interface ForgeMenuTypesRegistry extends DoTBMenuTypesRegistry {}
  class ForgeMenuTypesRegistry extends DoTBMenuTypesRegistry {
    static readonly MENU_TYPES_REGISTRY: DeferredRegister;
    register<T extends AbstractContainerMenu, D>(name: string, factory: MenuTypeFactory<T, D>, packetCodec: StreamCodec<RegistryFriendlyByteBuf, D>): Supplier<MenuType<T>>;
  }


  interface ForgeRecipeSerializersRegistry extends DoTBRecipeSerializersRegistry {}
  class ForgeRecipeSerializersRegistry extends DoTBRecipeSerializersRegistry {
    static readonly RECIPE_SERIALIZERS_REGISTRY: DeferredRegister;
    register<T extends RecipeSerializer<Recipe<any>>>(name: string, recipeSerializer: Supplier<T>): Supplier<T>;
  }


  interface ForgeRecipeTypesRegistry extends DoTBRecipeTypesRegistry {}
  class ForgeRecipeTypesRegistry extends DoTBRecipeTypesRegistry {
    static readonly RECIPE_TYPES_REGISTRY: DeferredRegister;
    register<T extends Recipe<any>>(name: string): Supplier<RecipeType<T>>;
  }


  interface ForgeTagsRegistry extends DoTBTags {}
  class ForgeTagsRegistry extends DoTBTags {
    registerBlock(id: ResourceLocation): TagKey<Block>;
    registerItem(id: ResourceLocation): TagKey<Item>;
  }


  interface ForgeCreativeModeTabsRegistry extends DoTBCreativeModeTabsRegistry {}
  class ForgeCreativeModeTabsRegistry extends DoTBCreativeModeTabsRegistry {
    static readonly CREATIVE_MODE_TABS_REGISTRY: DeferredRegister;
    register<T extends CreativeModeTab>(name: string, iconSupplier: Supplier<ItemStack>, title: Component): Supplier<CreativeModeTab>;
  }

}

declare module 'org.dawnoftimebuilder.util' {
  import { BooleanProperty, IntegerProperty, EnumProperty } from 'net.minecraft.world.level.block.state.properties';
  import { BlockPlaceContext, UseOnContext } from 'net.minecraft.world.item.context';
  import { Player } from 'net.minecraft.world.entity.player';
  import { InteractionHand } from 'net.minecraft.world';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { BlockHitResult, Vec3 } from 'net.minecraft.world.phys';
  import { Level, LevelAccessor } from 'net.minecraft.world.level';
  import { FoodProperties } from 'net.minecraft.world.food';
  import { Component } from 'net.minecraft.network.chat';
  import { VoxelShape } from 'net.minecraft.world.phys.shapes';
  import { List } from 'java.util';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { Potion } from 'net.minecraft.world.item.alchemy';
  import { Block } from 'net.minecraft.world.level.block';
  import { ChunkAccess } from 'net.minecraft.world.level.chunk';

  class BlockStatePropertiesAA {
    static readonly CUT: BooleanProperty;
    static readonly ROLLED: BooleanProperty;
    static readonly AXIS_X: BooleanProperty;
    static readonly AXIS_Y: BooleanProperty;
    static readonly AXIS_Z: BooleanProperty;
    static readonly SUBAXIS: BooleanProperty;
    static readonly HAS_PILLAR: BooleanProperty;
    static readonly CENTER: BooleanProperty;
    static readonly NORTH_TRICKLE: BooleanProperty;
    static readonly EAST_TRICKLE: BooleanProperty;
    static readonly SOUTH_TRICKLE: BooleanProperty;
    static readonly WEST_TRICKLE: BooleanProperty;
    static readonly CENTER_TRICKLE: BooleanProperty;
    static readonly ACTIVATED: BooleanProperty;
    static readonly SMALL_TOP: BooleanProperty;
    static readonly MULTIBLOCK_0_2: IntegerProperty;
    static readonly MULTIBLOCK_3X: IntegerProperty;
    static readonly MULTIBLOCK_2Y: IntegerProperty;
    static readonly MULTIBLOCK_3Z: IntegerProperty;
    static readonly HUMIDITY_0_8: IntegerProperty;
    static readonly AGE_0_6: IntegerProperty;
    static readonly HEAT_0_4: IntegerProperty;
    static readonly SIZE_0_2: IntegerProperty;
    static readonly SIZE_0_5: IntegerProperty;
    static readonly STACK: IntegerProperty;
    static readonly LEVEL: IntegerProperty;
    static readonly CLIMBING_PLANT: EnumProperty;
    static readonly FENCE_PILLAR: EnumProperty;
    static readonly HORIZONTAL_CONNECTION: EnumProperty;
    static readonly OPEN_POSITION: EnumProperty;
    static readonly PILLAR_CONNECTION: EnumProperty;
    static readonly SIDED_WINDOW: EnumProperty;
    static readonly VERTICAL_CONNECTION: EnumProperty;
    static readonly CORNER: EnumProperty;
    static readonly PILLAR_WALL: EnumProperty;
    static readonly NORTH_STATE: EnumProperty;
    static readonly EAST_STATE: EnumProperty;
    static readonly SOUTH_STATE: EnumProperty;
    static readonly WEST_STATE: EnumProperty;
    static readonly WATER_TRICKLE_END: EnumProperty;
  }


  interface CustomBlockPlaceContext extends BlockPlaceContext {}
  class CustomBlockPlaceContext extends BlockPlaceContext {
    constructor($$0: Player, $$1: InteractionHand, $$2: ItemStack, $$3: BlockHitResult);

    constructor($$0: UseOnContext);

    constructor($$0: Level, $$1: Player, $$2: InteractionHand, $$3: ItemStack, $$4: BlockHitResult);
  }


  class Foods {
    static readonly GRAPE: FoodProperties;
    static readonly MAIZE: FoodProperties;
    static readonly MULBERRY: FoodProperties;
  }


  class Pair<S1 = any, S2 = any> {
    constructor();

    constructor(s1In: S1);

    constructor(s1In: S1, s2In: S2);
    equals(obj: any): boolean;
    get s1(): S1;
    get s2(): S2;
    hashCode(): number;
    set s1(s1In: S1);
    set s2(s2In: S2);
  }


  class Utils {
    static readonly HIGHEST_Y: number;
    static readonly TOOLTIP_HOLD_SHIFT: Component;
    static readonly TOOLTIP_COLUMN: string;
    static readonly TOOLTIP_CLIMBING_PLANT: string;
    static readonly TOOLTIP_BEAM: string;
    static readonly TOOLTIP_CROP: string;
    static readonly TOOLTIP_SIDED_WINDOW: string;
    static readonly TOOLTIP_FIREPLACE: string;
    static readonly TOOLTIP_ADD_COLUMN: string;
    static addTooltip(tooltip: Component[], item: Item, ...tooltipNames: string[]): void;
    static addTooltip(tooltip: Component[], block: Block, ...tooltipNames: string[]): void;
    static addTooltip(tooltip: Component[], ...tooltipNames: string[]): void;
    static changeBlockLitStateWithItemOrCreativePlayer(stateIn: BlockState, worldIn: Level, pos: BlockPos, player: Player, handIn: InteractionHand): number;
    static clickedOnLeftHalf(clickedPos: BlockPos, dir: Direction, clickLocation: Vec3): boolean;
    static dropLootFromList(worldIn: LevelAccessor, pos: BlockPos, drops: ItemStack[], multiplier: number): boolean;
    static generateHorizontalShapes(shapes: VoxelShape[], ...nonRotatedShapes: VoxelShape[]): VoxelShape[];
    static getHighestSectionPosition(chunkAccess: ChunkAccess): number;
    static getItemKeyAsString(item: Item): string;
    static getLootList(serverWorld: ServerLevel, stateIn: BlockState, itemStackHand: ItemStack, name: string): ItemStack[];
    static getPotionByName(name: string): Potion;
    static isShapeIncludedInShape(testedShape: VoxelShape, faceShape: VoxelShape, inShape: VoxelShape): boolean;
    static useFireActivatorOnBlockIfPossible(blockstateIn: BlockState, worldIn: Level, pos: BlockPos, player: Player, handIn: InteractionHand): boolean;
    static useFireStopperIfPossible(blockstateIn: BlockState, worldIn: Level, pos: BlockPos, player: Player, handIn: InteractionHand): boolean;
    static useLighter(worldIn: Level, pos: BlockPos, player: Player, handIn: InteractionHand): boolean;
  }


  class VoxelShapes {
    static readonly SHAPE_DOWN_16x16: VoxelShape;
    static readonly SHAPE_DOWN_4x4: VoxelShape;
    static readonly FULL_SHAPE: VoxelShape[];
    static readonly BEAM_SHAPES: VoxelShape[];
    static readonly BIG_FLOWER_POT_SHAPES: VoxelShape[];
    static readonly BIRCH_FOOTSTOOL_SHAPES: VoxelShape[];
    static readonly BUSH_SHAPES: VoxelShape[];
    static readonly CANDLESTICK_SHAPES: VoxelShape[];
    static readonly CARPET_SHAPES: VoxelShape[];
    static readonly CAST_IRON_TEAPOT_SHAPES: VoxelShape[];
    static readonly CAST_IRON_TEACUP_SHAPES: VoxelShape[];
    static readonly CHARRED_SPRUCE_FANCY_RAILING_SHAPES: VoxelShape[];
    static readonly CHARRED_SPRUCE_SHUTTERS_SHAPES: VoxelShape[];
    static readonly CHARRED_SPRUCE_TALL_SHUTTERS_SHAPES: VoxelShape[];
    static readonly CYPRESS_SHAPES: VoxelShape[];
    static readonly DRYER_SHAPES: VoxelShape[];
    static readonly EDGE_SHAPES: VoxelShape[];
    static readonly FEATHERED_SERPENT_SCULPTURE_SHAPES: VoxelShape[];
    static readonly FIREPLACE_SHAPES: VoxelShape[];
    static readonly FLOWER_POT_SHAPE: VoxelShape[];
    static readonly GREEN_SCULPTED_PLASTERED_STONE_FRIEZE_SHAPES: VoxelShape[];
    static readonly GERANIUM_SHAPE: VoxelShape[];
    static readonly IRON_COLUMN_SHAPES: VoxelShape[];
    static readonly IRON_FANCY_LANTERN_SHAPES: VoxelShape[];
    static readonly IRON_FENCE_SHAPES: VoxelShape[];
    static readonly IVY_SHAPES: VoxelShape[];
    static readonly LATTICE_SHAPES: VoxelShape[];
    static readonly LIMESTONE_CHIMNEY_SHAPES: VoxelShape[];
    static readonly LIMESTONE_GARGOYLE_SHAPES: VoxelShape[];
    static readonly LIMESTONE_SIDED_COLUMN_SHAPES: VoxelShape[];
    static readonly MARBLE_BIG_FLOWER_POT_SHAPES: VoxelShape[];
    static readonly MARBLE_COLUMN_SHAPES: VoxelShape[];
    static readonly MARBLE_SIDED_COLUMN_SHAPES: VoxelShape[];
    static readonly MARBLE_STATUE_SHAPES: VoxelShape[];
    static readonly MORAQ_MOSAIC_COLUMN_SHAPES: VoxelShape[];
    static readonly MULTIBLOCK_FIREPLACE_SHAPES: VoxelShape[];
    static readonly PAPER_LAMP_SHAPES: VoxelShape[];
    static readonly PAPER_LANTERN_SHAPES: VoxelShape[];
    static readonly PERGOLA_SHAPES: VoxelShape[];
    static readonly PLASTERED_STONE_COLUMN_SHAPES: VoxelShape[];
    static readonly PLASTERED_STONE_CRESSET_SHAPES: VoxelShape[];
    static readonly PLANTER_SHAPES: VoxelShape[];
    static readonly PLASTERED_STONE_WINDOW_SHAPES: VoxelShape[];
    static readonly PLATE_SHAPES: VoxelShape[];
    static readonly POOL_SHAPES: VoxelShape[];
    static readonly PORTCULLIS_SHAPES: VoxelShape[];
    static readonly RED_SCULPTED_PLASTERED_STONE_FRIEZE_SHAPES: VoxelShape[];
    static readonly REINFORCED_IRON_FENCE_SHAPES: VoxelShape[];
    static readonly RELIEF_SHAPES: VoxelShape[];
    static readonly ROMAN_COUCH_SHAPES: VoxelShape[];
    static readonly SAKE_BOTTLE_SHAPES: VoxelShape[];
    static readonly SAKE_CUP_SHAPES: VoxelShape[];
    static readonly SANDSTONE_COLUMN_SHAPES: VoxelShape[];
    static readonly SANDSTONE_CRENELATION_SHAPES: VoxelShape[];
    static readonly SANDSTONE_SIDED_COLUMN_SHAPES: VoxelShape[];
    static readonly SAPLING_SHAPES: VoxelShape[];
    static readonly SERPENT_SCULPTED_COLUMN_SHAPES: VoxelShape[];
    static readonly SMALL_POOL_COLLISION_SHAPES: VoxelShape[];
    static readonly SMALL_POOL_SHAPES: VoxelShape[];
    static readonly SMALL_TATAMI_FLOOR_SHAPES: VoxelShape[];
    static readonly SMALL_SHUTTER_SHAPES: VoxelShape[];
    static readonly SMALL_TATAMI_MAT_SHAPES: VoxelShape[];
    static readonly SPRUCE_LEGLESS_CHAIR_SHAPES: VoxelShape[];
    static readonly SPRUCE_LOW_TABLE_SHAPES: VoxelShape[];
    static readonly STICK_BUNDLE_SHAPES: VoxelShape[];
    static readonly STONE_BRICKS_ARROWSLIT_SHAPES: VoxelShape[];
    static readonly STONE_BRICKS_CHIMNEY_SHAPES: VoxelShape[];
    static readonly STONE_BRICKS_MACHICOLATION_SHAPES: VoxelShape[];
    static readonly STONE_LANTERN_SHAPES: VoxelShape[];
    static readonly SUPPORT_BEAM_SHAPES: VoxelShape[];
    static readonly SUPPORT_SLAB_SHAPES: VoxelShape[];
    static readonly TATAMI_FLOOR_SHAPES: VoxelShape[];
    static readonly TATAMI_MAT_SHAPES: VoxelShape[];
    static readonly THIN_PLATE_SHAPES: VoxelShape[];
    static readonly WAXED_OAK_BALUSTER_SHAPES: VoxelShape[];
    static readonly WAXED_OAK_CHAIR_SHAPES: VoxelShape[];
    static readonly WAXED_OAK_CHANDELIER_SHAPES: VoxelShape[];
    static readonly WAXED_OAK_TABLE_SHAPES: VoxelShape[];
    static readonly WILD_PLANT_SHAPES: VoxelShape[];
  }


  class VoxelShapesBuilder {
  }

}

declare module 'org.dawnoftimebuilder.util.BlockStatePropertiesAA' {
  import { Enum } from 'java.lang';
  import { Item } from 'net.minecraft.world.item';
  import { Level } from 'net.minecraft.world.level';
  import { List } from 'java.util';
  import { Direction } from 'net.minecraft.core';

  interface ClimbingPlant extends Enum<ClimbingPlant> {}
  class ClimbingPlant extends Enum<ClimbingPlant> {
    static readonly NONE: ClimbingPlant;
    static readonly VINE: ClimbingPlant;
    static readonly IVY: ClimbingPlant;
    static readonly GRAPE: ClimbingPlant;
    canGrow(worldIn: Level, currentAge: number): boolean;
    get serializedName(): string;
    static getFromItem(item: Item): ClimbingPlant;
    hasNoPlant(): boolean;
    maxAge(): number;
    toString(): string;
    static valueOf(name: string): ClimbingPlant;
    static values(): ClimbingPlant[];
  }


  interface FencePillar extends Enum<FencePillar> {}
  class FencePillar extends Enum<FencePillar> {
    static readonly NONE: FencePillar;
    static readonly PILLAR_BIG: FencePillar;
    static readonly PILLAR_SMALL: FencePillar;
    static readonly CAP_PILLAR_BIG: FencePillar;
    get serializedName(): string;
    toString(): string;
    static valueOf(name: string): FencePillar;
    static values(): FencePillar[];
  }


  interface HorizontalConnection extends Enum<HorizontalConnection> {}
  class HorizontalConnection extends Enum<HorizontalConnection> {
    static readonly NONE: HorizontalConnection;
    static readonly LEFT: HorizontalConnection;
    static readonly RIGHT: HorizontalConnection;
    static readonly BOTH: HorizontalConnection;
    get index(): number;
    get serializedName(): string;
    toString(): string;
    static valueOf(name: string): HorizontalConnection;
    static values(): HorizontalConnection[];
  }


  interface OpenPosition extends Enum<OpenPosition> {}
  class OpenPosition extends Enum<OpenPosition> {
    static readonly CLOSED: OpenPosition;
    static readonly HALF: OpenPosition;
    static readonly FULL: OpenPosition;
    get serializedName(): string;
    isOpen(): boolean;
    toString(): string;
    static valueOf(name: string): OpenPosition;
    static values(): OpenPosition[];
  }


  interface PillarConnection extends Enum<PillarConnection> {}
  class PillarConnection extends Enum<PillarConnection> {
    static readonly NOTHING: PillarConnection;
    static readonly FOUR_PX: PillarConnection;
    static readonly SIX_PX: PillarConnection;
    static readonly EIGHT_PX: PillarConnection;
    static readonly TEN_PX: PillarConnection;
    get serializedName(): string;
    toString(): string;
    static valueOf(name: string): PillarConnection;
    static values(): PillarConnection[];
  }


  interface SidedWindow extends Enum<SidedWindow> {}
  class SidedWindow extends Enum<SidedWindow> {
    static readonly NORTH: SidedWindow;
    static readonly EAST: SidedWindow;
    static readonly SOUTH: SidedWindow;
    static readonly WEST: SidedWindow;
    static readonly AXIS_X: SidedWindow;
    static readonly AXIS_Z: SidedWindow;
    get direction(): Direction;
    get offset(): Direction;
    get serializedName(): string;
    static getSide(facing: Direction, isSneaking: boolean): SidedWindow;
    rotate(clockWise: boolean): SidedWindow;
    toString(): string;
    static valueOf(name: string): SidedWindow;
    static values(): SidedWindow[];
  }


  interface VerticalConnection extends Enum<VerticalConnection> {}
  class VerticalConnection extends Enum<VerticalConnection> {
    static readonly NONE: VerticalConnection;
    static readonly UNDER: VerticalConnection;
    static readonly ABOVE: VerticalConnection;
    static readonly BOTH: VerticalConnection;
    get index(): number;
    get serializedName(): string;
    toString(): string;
    static valueOf(name: string): VerticalConnection;
    static values(): VerticalConnection[];
  }


  interface SquareCorners extends Enum<SquareCorners> {}
  class SquareCorners extends Enum<SquareCorners> {
    static readonly TOP_LEFT: SquareCorners;
    static readonly TOP_RIGHT: SquareCorners;
    static readonly BOTTOM_RIGHT: SquareCorners;
    static readonly BOTTOM_LEFT: SquareCorners;
    get serializedName(): string;
    getAdjacentCorner(vertically: boolean): SquareCorners;
    getHorizontalOffset(referenceCorner: SquareCorners): number;
    getVerticalOffset(referenceCorner: SquareCorners): number;
    isTopCorner(): boolean;
    toString(): string;
    static valueOf(name: string): SquareCorners;
    static values(): SquareCorners[];
  }


  interface VerticalLimitedConnection extends Enum<VerticalLimitedConnection> {}
  class VerticalLimitedConnection extends Enum<VerticalLimitedConnection> {
    static readonly NONE: VerticalLimitedConnection;
    static readonly BOTTOM: VerticalLimitedConnection;
    static readonly TOP: VerticalLimitedConnection;
    get index(): number;
    get serializedName(): string;
    toString(): string;
    static valueOf(name: string): VerticalLimitedConnection;
    static values(): VerticalLimitedConnection[];
  }


  interface WaterTrickleEnd extends Enum<WaterTrickleEnd> {}
  class WaterTrickleEnd extends Enum<WaterTrickleEnd> {
    static readonly STRAIGHT: WaterTrickleEnd;
    static readonly FADE: WaterTrickleEnd;
    static readonly SPLASH: WaterTrickleEnd;
    get serializedName(): string;
    toString(): string;
    static valueOf(name: string): WaterTrickleEnd;
    static values(): WaterTrickleEnd[];
  }

}

declare module 'org.dawnoftimebuilder.worldgen.feature' {
  import { Feature, FeaturePlaceContext } from 'net.minecraft.world.level.levelgen.feature';
  import { RandomPatchConfiguration, SimpleBlockConfiguration } from 'net.minecraft.world.level.levelgen.feature.configurations';
  import { Codec } from 'com.mojang.serialization';
  import { BlockPos } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';

  interface DefaultCropsFeature extends Feature<RandomPatchConfiguration> {}
  class DefaultCropsFeature extends Feature<RandomPatchConfiguration> {
    constructor(pCodec: Codec<RandomPatchConfiguration>);
    getPos(random: RandomSource, pos: BlockPos, config: RandomPatchConfiguration): BlockPos;
    place(pContext: FeaturePlaceContext<RandomPatchConfiguration>): boolean;
  }


  interface DoTFeature extends Feature<SimpleBlockConfiguration> {}
  class DoTFeature extends Feature<SimpleBlockConfiguration> {
    constructor(pCodec: Codec<SimpleBlockConfiguration>);
    place(pContext: FeaturePlaceContext<SimpleBlockConfiguration>): boolean;
  }

}