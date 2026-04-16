declare module 'com.lunazstudios.cobblefurnies.block' {
  import { SimpleWaterloggedBlock, Rotation, Mirror, Block, BaseEntityBlock, RenderShape, HorizontalDirectionalBlock } from 'net.minecraft.world.level.block';
  import { DirectionProperty, BooleanProperty, EnumProperty, IntegerProperty } from 'net.minecraft.world.level.block.state.properties';
  import { Properties } from 'BlockBehaviour';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { Level, BlockGetter, LevelAccessor, LevelReader } from 'net.minecraft.world.level';
  import { Entity, LivingEntity } from 'net.minecraft.world.entity';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BlockEntity, BlockEntityTicker, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { MapCodec } from 'com.mojang.serialization';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { RandomSource } from 'net.minecraft.util';
  import { Optional } from 'java.util';
  import { SeatEntity } from 'com.lunazstudios.cobblefurnies.entity';
  import { SofaType } from 'com.lunazstudios.cobblefurnies.block.properties';

  interface ArmchairBlock extends SimpleWaterloggedBlock, SeatBlock {}
  class ArmchairBlock extends SimpleWaterloggedBlock {
    static readonly FACING: DirectionProperty;
    static readonly WATERLOGGED: BooleanProperty;
    constructor(properties: Properties);
    getFluidState(state: BlockState): FluidState;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    primaryDismountLocation(level: Level, state: BlockState, pos: BlockPos): BlockPos;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    seatHeight(state: BlockState): number;
    setRiderRotation(state: BlockState, entity: Entity): number;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface BonsaiPlantBlock extends Block {}
  class BonsaiPlantBlock extends Block {
    static readonly HALF: EnumProperty;
    constructor(properties: Properties);
    getShape(state: BlockState, world: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    playerDestroy(level: Level, player: Player, blockPos: BlockPos, blockState: BlockState, blockEntity: BlockEntity, itemStack: ItemStack): void;
    setPlacedBy(level: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, pos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface CabinetBlock extends BaseEntityBlock {}
  class CabinetBlock extends BaseEntityBlock {
    static readonly CODEC: MapCodec;
    static readonly FACING: DirectionProperty;
    static readonly WATERLOGGED: BooleanProperty;
    static readonly OPEN: BooleanProperty;
    static readonly HINGE: EnumProperty;
    constructor(properties: Properties);
    codec(): MapCodec<CabinetBlock>;
    getFluidState(state: BlockState): FluidState;
    getRenderShape(state: BlockState): RenderShape;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    tick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface CabinetryBlock extends SimpleWaterloggedBlock, Block {}
  class CabinetryBlock extends SimpleWaterloggedBlock {
    static readonly FACING: DirectionProperty;
    static readonly WATERLOGGED: BooleanProperty;
    static readonly SHAPE: EnumProperty;
    constructor(properties: Properties);
    getFluidState(state: BlockState): FluidState;
    getShape(state: BlockState, world: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, pos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface CESBlock extends FurnitureHorizontalBlock {}
  class CESBlock extends FurnitureHorizontalBlock {
    constructor(properties: Properties);
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
  }


  interface ChairBlock extends SimpleWaterloggedBlock, SeatBlock {}
  class ChairBlock extends SimpleWaterloggedBlock {
    static readonly FACING: DirectionProperty;
    static readonly WATERLOGGED: BooleanProperty;
    constructor(properties: Properties);
    getFluidState(state: BlockState): FluidState;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    primaryDismountLocation(level: Level, state: BlockState, pos: BlockPos): BlockPos;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    seatHeight(state: BlockState): number;
    setRiderRotation(state: BlockState, entity: Entity): number;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface CurtainBlock extends HorizontalDirectionalBlock {}
  class CurtainBlock extends HorizontalDirectionalBlock {
    static readonly VERTICAL: EnumProperty;
    static readonly HORIZONTAL: EnumProperty;
    static readonly OPEN: BooleanProperty;
    static readonly HINGE: EnumProperty;
    constructor(settings: Properties);
    getCollisionShape(state: BlockState, world: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getShape(state: BlockState, world: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(ctx: BlockPlaceContext): BlockState;
    playerWillDestroy(level: Level, pos: BlockPos, state: BlockState, player: Player): BlockState;
    setPlacedBy(level: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
    updateShape(state: BlockState, dir: Direction, neighbor: BlockState, level: LevelAccessor, pos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface DrawerBlock extends BaseEntityBlock {}
  class DrawerBlock extends BaseEntityBlock {
    static readonly CODEC: MapCodec;
    static readonly FACING: DirectionProperty;
    static readonly WATERLOGGED: BooleanProperty;
    static readonly OPEN: BooleanProperty;
    constructor(properties: Properties);
    codec(): MapCodec<DrawerBlock>;
    getFluidState(state: BlockState): FluidState;
    getRenderShape(state: BlockState): RenderShape;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    tick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface FreezerBlock extends BaseEntityBlock {}
  class FreezerBlock extends BaseEntityBlock {
    static readonly CODEC: MapCodec;
    static readonly FACING: DirectionProperty;
    static readonly OPEN: BooleanProperty;
    constructor(properties: Properties);
    codec(): MapCodec<FreezerBlock>;
    getRenderShape(state: BlockState): RenderShape;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    tick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
  }


  interface FridgeBlock extends BaseEntityBlock {}
  class FridgeBlock extends BaseEntityBlock {
    static readonly FACING: DirectionProperty;
    static readonly OPEN: BooleanProperty;
    constructor(properties: Properties, freezerBlock: Block);
    getRenderShape(state: BlockState): RenderShape;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onPlace(state: BlockState, level: Level, pos: BlockPos, oldState: BlockState, isMoving: boolean): void;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    tick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
  }


  interface FurniCrafterBlock extends BaseEntityBlock {}
  class FurniCrafterBlock extends BaseEntityBlock {
    static readonly CODEC: MapCodec;
    constructor(properties: Properties);
    getRenderShape(state: BlockState): RenderShape;
    newBlockEntity(blockPos: BlockPos, blockState: BlockState): BlockEntity;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
  }


  interface FurnitureHorizontalBlock extends Block {}
  class FurnitureHorizontalBlock extends Block {
    static readonly FACING: DirectionProperty;
    constructor(properties: Properties);
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    rotate(state: BlockState, rotation: Rotation): BlockState;
  }


  interface LampBlock extends FurnitureHorizontalBlock {}
  class LampBlock extends FurnitureHorizontalBlock {
    static readonly LIT: BooleanProperty;
    static readonly POWERED: BooleanProperty;
    static readonly MOUNT_TYPE: EnumProperty;
    constructor(properties: Properties);
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    neighborChanged(state: BlockState, level: Level, pos: BlockPos, block: Block, fromPos: BlockPos, isMoving: boolean): void;
    rotate(state: BlockState, rotation: Rotation): BlockState;
  }


  interface MiniTopiaryBlock extends Block {}
  class MiniTopiaryBlock extends Block {
    static readonly HALF: EnumProperty;
    constructor(properties: Properties);
    getShape(state: BlockState, world: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    playerDestroy(level: Level, player: Player, blockPos: BlockPos, blockState: BlockState, blockEntity: BlockEntity, itemStack: ItemStack): void;
    setPlacedBy(level: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, pos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface NightStandBlock extends BaseEntityBlock {}
  class NightStandBlock extends BaseEntityBlock {
    static readonly CODEC: MapCodec;
    static readonly FACING: DirectionProperty;
    static readonly WATERLOGGED: BooleanProperty;
    static readonly OPEN: BooleanProperty;
    static readonly HAS_CONCRETE: BooleanProperty;
    static readonly CONCRETE_COLOR: EnumProperty;
    constructor(properties: Properties);
    codec(): MapCodec<NightStandBlock>;
    getFluidState(state: BlockState): FluidState;
    getRenderShape(state: BlockState): RenderShape;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    tick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface PokeChairBlock extends SimpleWaterloggedBlock, SeatBlock {}
  class PokeChairBlock extends SimpleWaterloggedBlock {
    static readonly FACING: DirectionProperty;
    static readonly WATERLOGGED: BooleanProperty;
    constructor(properties: Properties);
    getFluidState(state: BlockState): FluidState;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    primaryDismountLocation(level: Level, state: BlockState, pos: BlockPos): BlockPos;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    seatHeight(state: BlockState): number;
    setRiderRotation(state: BlockState, entity: Entity): number;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface PokeDeskBlock extends FurnitureHorizontalBlock {}
  class PokeDeskBlock extends FurnitureHorizontalBlock {
    constructor(properties: Properties);
    getShape(state: BlockState, world: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
  }


  interface PottedPothosBlock extends FurnitureHorizontalBlock {}
  class PottedPothosBlock extends FurnitureHorizontalBlock {
    constructor(properties: Properties);
    getShape(state: BlockState, world: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
  }


  interface SeatBlock extends Block {}
  class SeatBlock extends Block {
    constructor(properties: Properties);
    static canBePickedUp(passenger: Entity): boolean;
    static ejectSeatedExceptPlayer(level: Level, seatEntity: SeatEntity): boolean;
    getAnalogOutputSignal(state: BlockState, level: Level, pos: BlockPos): number;
    static getLeashed(player: Player): Optional<Entity>;
    hasAnalogOutputSignal(state: BlockState): boolean;
    static isSeatBlocked(level: Level, pos: BlockPos): boolean;
    static isSeatOccupied(level: Level, pos: BlockPos): boolean;
    isSittable(state: BlockState): boolean;
    primaryDismountLocation(level: Level, state: BlockState, pos: BlockPos): BlockPos;
    seatHeight(state: BlockState): number;
    setRiderRotation(state: BlockState, entity: Entity): number;
    static sitDown(level: Level, pos: BlockPos, entity: Entity): void;
  }


  interface SinkBlock extends SimpleWaterloggedBlock, Block {}
  class SinkBlock extends SimpleWaterloggedBlock {
    static readonly FACING: DirectionProperty;
    static readonly CONNECTED_LEFT: BooleanProperty;
    static readonly CONNECTED_RIGHT: BooleanProperty;
    static readonly WATERLOGGED: BooleanProperty;
    constructor(properties: Properties);
    getFluidState(state: BlockState): FluidState;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface SofaBlock extends SimpleWaterloggedBlock, SeatBlock {}
  class SofaBlock extends SimpleWaterloggedBlock {
    static readonly FACING: DirectionProperty;
    static readonly WATERLOGGED: BooleanProperty;
    static readonly TYPE: EnumProperty;
    constructor(properties: Properties);
    static canConnect(level: Level, pos: BlockPos, direction: Direction): boolean;
    static getConnection(state: BlockState, level: Level, pos: BlockPos): SofaType;
    getFluidState(state: BlockState): FluidState;
    getShape(state: BlockState, world: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    static isDifferentOrientation(state: BlockState, level: Level, pos: BlockPos, dir: Direction): boolean;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    primaryDismountLocation(level: Level, state: BlockState, pos: BlockPos): BlockPos;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    seatHeight(state: BlockState): number;
    setRiderRotation(state: BlockState, entity: Entity): number;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface StatueBlock extends BaseEntityBlock {}
  class StatueBlock extends BaseEntityBlock {
    static readonly CODEC: MapCodec;
    static readonly HALF: EnumProperty;
    static readonly FACING: DirectionProperty;
    constructor(properties: Properties);
    canSurvive(state: BlockState, world: LevelReader, pos: BlockPos): boolean;
    codec(): MapCodec<StatueBlock>;
    getShape(state: BlockState, world: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    newBlockEntity(blockPos: BlockPos, blockState: BlockState): BlockEntity;
    onRemove(state: BlockState, world: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    setPlacedBy(world: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
    updateShape(state: BlockState, facing: Direction, neighborState: BlockState, world: LevelAccessor, pos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface StoolBlock extends SimpleWaterloggedBlock, SeatBlock {}
  class StoolBlock extends SimpleWaterloggedBlock {
    static readonly FACING: DirectionProperty;
    static readonly WATERLOGGED: BooleanProperty;
    constructor(properties: Properties);
    getFluidState(state: BlockState): FluidState;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    primaryDismountLocation(level: Level, state: BlockState, pos: BlockPos): BlockPos;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    seatHeight(state: BlockState): number;
    setRiderRotation(state: BlockState, entity: Entity): number;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface StoveBlock extends BaseEntityBlock {}
  class StoveBlock extends BaseEntityBlock {
    static readonly CODEC: MapCodec;
    static readonly FACING: DirectionProperty;
    static readonly CONNECTED_LEFT: BooleanProperty;
    static readonly CONNECTED_RIGHT: BooleanProperty;
    static readonly WATERLOGGED: BooleanProperty;
    static readonly LID: BooleanProperty;
    constructor(properties: Properties);
    codec(): MapCodec<StoveBlock>;
    getFluidState(state: BlockState): FluidState;
    getRenderShape(state: BlockState): RenderShape;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    getTicker<T extends BlockEntity>(level: Level, state: BlockState, type: BlockEntityType<T>): BlockEntityTicker<T>;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    playerDestroy(level: Level, player: Player, pos: BlockPos, state: BlockState, blockEntity: BlockEntity, tool: ItemStack): void;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface TableBlock extends SimpleWaterloggedBlock, Block {}
  class TableBlock extends SimpleWaterloggedBlock {
    static readonly NORTH: BooleanProperty;
    static readonly SOUTH: BooleanProperty;
    static readonly EAST: BooleanProperty;
    static readonly WEST: BooleanProperty;
    static readonly WATERLOGGED: BooleanProperty;
    constructor(properties: Properties);
    getConnections(state: BlockState, level: LevelAccessor, pos: BlockPos): BlockState;
    getFluidState(state: BlockState): FluidState;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
    validConnection(state: BlockState): boolean;
  }


  interface ToiletBlock extends SimpleWaterloggedBlock, SeatBlock {}
  class ToiletBlock extends SimpleWaterloggedBlock {
    static readonly FACING: DirectionProperty;
    static readonly WATERLOGGED: BooleanProperty;
    static readonly OPEN: BooleanProperty;
    constructor(properties: Properties);
    getFluidState(state: BlockState): FluidState;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    primaryDismountLocation(level: Level, state: BlockState, pos: BlockPos): BlockPos;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    seatHeight(state: BlockState): number;
    setRiderRotation(state: BlockState, entity: Entity): number;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface TVBlock extends FurnitureHorizontalBlock {}
  class TVBlock extends FurnitureHorizontalBlock {
    static readonly CHANNEL: IntegerProperty;
    constructor(properties: Properties);
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
  }


  interface UpperCabinetBlock extends BaseEntityBlock {}
  class UpperCabinetBlock extends BaseEntityBlock {
    static readonly CODEC: MapCodec;
    static readonly FACING: DirectionProperty;
    static readonly WATERLOGGED: BooleanProperty;
    static readonly OPEN: BooleanProperty;
    static readonly HAS_GLASS: BooleanProperty;
    static readonly HINGE: EnumProperty;
    constructor(properties: Properties);
    codec(): MapCodec<UpperCabinetBlock>;
    getFluidState(state: BlockState): FluidState;
    getRenderShape(state: BlockState): RenderShape;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    tick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface WallSupportBlock extends FurnitureHorizontalBlock {}
  class WallSupportBlock extends FurnitureHorizontalBlock {
    constructor(properties: Properties);
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    validConnection(state: BlockState): boolean;
  }


  interface WoodChairBlock extends SimpleWaterloggedBlock, SeatBlock {}
  class WoodChairBlock extends SimpleWaterloggedBlock {
    static readonly FACING: DirectionProperty;
    static readonly WATERLOGGED: BooleanProperty;
    constructor(properties: Properties);
    getFluidState(state: BlockState): FluidState;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    primaryDismountLocation(level: Level, state: BlockState, pos: BlockPos): BlockPos;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    seatHeight(state: BlockState): number;
    setRiderRotation(state: BlockState, entity: Entity): number;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
  }

}

declare module 'com.lunazstudios.cobblefurnies.block.entity' {
  import { RandomizableContainerBlockEntity, BlockEntity, BaseContainerBlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockPos, NonNullList } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Player, Inventory, StackedContents } from 'net.minecraft.world.entity.player';
  import { MenuProvider, SimpleContainer } from 'net.minecraft.world';
  import { Component } from 'net.minecraft.network.chat';
  import { AbstractContainerMenu, CraftingContainer, RecipeCraftingHolder, StackedContentsCompatible } from 'net.minecraft.world.inventory';
  import { Packet } from 'net.minecraft.network.protocol';
  import { ClientGamePacketListener } from 'net.minecraft.network.protocol.game';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { ItemStack } from 'net.minecraft.world.item';
  import { RecipeHolder } from 'net.minecraft.world.item.crafting';
  import { Level } from 'net.minecraft.world.level';
  import { List } from 'java.util';

  interface CabinetBlockEntity extends RandomizableContainerBlockEntity {}
  class CabinetBlockEntity extends RandomizableContainerBlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
    get containerSize(): number;
    recheckOpen(): void;
    startOpen(player: Player): void;
    stopOpen(player: Player): void;
  }


  interface DrawerBlockEntity extends RandomizableContainerBlockEntity {}
  class DrawerBlockEntity extends RandomizableContainerBlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
    get containerSize(): number;
    recheckOpen(): void;
    startOpen(player: Player): void;
    stopOpen(player: Player): void;
  }


  interface FreezerBlockEntity extends RandomizableContainerBlockEntity {}
  class FreezerBlockEntity extends RandomizableContainerBlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
    get containerSize(): number;
    recheckOpen(): void;
    startOpen(player: Player): void;
    stopOpen(player: Player): void;
  }


  interface FridgeBlockEntity extends RandomizableContainerBlockEntity {}
  class FridgeBlockEntity extends RandomizableContainerBlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
    get containerSize(): number;
    recheckOpen(): void;
    startOpen(player: Player): void;
    stopOpen(player: Player): void;
  }


  interface FurniCrafterBlockEntity extends MenuProvider, BlockEntity {}
  class FurniCrafterBlockEntity extends MenuProvider {
    constructor(blockPos: BlockPos, blockState: BlockState);
    createMenu(id: number, inventory: Inventory, player: Player): AbstractContainerMenu;
    get displayName(): Component;
    get outputContainer(): SimpleContainer;
    get updatePacket(): Packet<ClientGamePacketListener>;
    getUpdateTag(registries: Provider): CompoundTag;
  }


  interface NightStandBlockEntity extends RandomizableContainerBlockEntity {}
  class NightStandBlockEntity extends RandomizableContainerBlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
    get containerSize(): number;
    recheckOpen(): void;
    startOpen(player: Player): void;
    stopOpen(player: Player): void;
  }


  interface StatueBlockEntity extends BlockEntity {}
  class StatueBlockEntity extends BlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
  }


  interface StoveBlockEntity extends CraftingContainer, RecipeCraftingHolder, StackedContentsCompatible, BaseContainerBlockEntity {}
  class StoveBlockEntity extends CraftingContainer {
    static readonly RESULT_SLOT: number;
    static readonly CRAFTING_SLOTS: number[];
    static readonly SEASONING_SLOTS: number[];
    static readonly PREVIEW_SLOT: number;
    static readonly TOTAL_SLOTS: number;
    constructor(pos: BlockPos, state: BlockState);
    fillStackedContents(stackedContents: StackedContents): void;
    get containerSize(): number;
    get defaultName(): Component;
    get displayName(): Component;
    get height(): number;
    get items(): NonNullList<ItemStack>;
    get potItem(): ItemStack;
    get recipeUsed(): RecipeHolder<any>;
    get seasonings(): ItemStack[];
    get width(): number;
    handleSafeDrop(): void;
    static serverTick(level: Level, pos: BlockPos, state: BlockState, stove: StoveBlockEntity): void;
    set potItem(stack: ItemStack);
    set recipeUsed(recipe: RecipeHolder<any>);
    toggleLid(isOpen: boolean): void;
  }


  interface UpperCabinetBlockEntity extends RandomizableContainerBlockEntity {}
  class UpperCabinetBlockEntity extends RandomizableContainerBlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
    get containerSize(): number;
    get items(): NonNullList<ItemStack>;
    recheckOpen(): void;
    startOpen(player: Player): void;
    stopOpen(player: Player): void;
  }

}

declare module 'com.lunazstudios.cobblefurnies.block.item' {
  import { BlockItem, ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { Block } from 'net.minecraft.world.level.block';
  import { Properties, TooltipContext } from 'Item';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  interface TooltipBlockItem extends BlockItem {}
  class TooltipBlockItem extends BlockItem {
    constructor(block: Block, properties: Properties, tooltipKey: string);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flag: TooltipFlag): void;
  }

}

declare module 'com.lunazstudios.cobblefurnies.block.properties' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { IntegerProperty, BooleanProperty, EnumProperty } from 'net.minecraft.world.level.block.state.properties';

  interface CabinetryShape extends Enum<CabinetryShape> {}
  class CabinetryShape extends Enum<CabinetryShape> {
    static readonly OUTER_CORNER_RIGHT: CabinetryShape;
    static readonly OUTER_CORNER_LEFT: CabinetryShape;
    static readonly INNER_CORNER_RIGHT: CabinetryShape;
    static readonly INNER_CORNER_LEFT: CabinetryShape;
    static readonly DEFAULT: CabinetryShape;
    get serializedName(): string;
    toString(): string;
    static valueOf(name: string): CabinetryShape;
    static values(): CabinetryShape[];
  }


  class CFBlockStateProperties {
    static readonly LEVEL_1_3: IntegerProperty;
    static readonly CHANNEL_1_3: IntegerProperty;
    static readonly CONNECTED_RIGHT: BooleanProperty;
    static readonly CONNECTED_LEFT: BooleanProperty;
    static readonly CABINETRY_SHAPE: EnumProperty;
    static readonly SOFA_TYPE: EnumProperty;
    static readonly CURTAIN_VERTICAL: EnumProperty;
    static readonly CURTAIN_HORIZONTAL: EnumProperty;
    static readonly OPEN: BooleanProperty;
    static readonly WALL_SUPPORT_SHAPE: EnumProperty;
    static readonly HAS_POT: BooleanProperty;
    static readonly POT_COLOR: EnumProperty;
    static readonly MOUNT_TYPE: EnumProperty;
    static readonly HAS_CONCRETE: BooleanProperty;
    static readonly CONCRETE_COLOR: EnumProperty;
    static readonly HAS_GLASS: BooleanProperty;
    static readonly LID: BooleanProperty;
  }


  interface CurtainHorizontalPart extends Enum<CurtainHorizontalPart> {}
  class CurtainHorizontalPart extends Enum<CurtainHorizontalPart> {
    static readonly LEFT: CurtainHorizontalPart;
    static readonly MIDDLE: CurtainHorizontalPart;
    static readonly RIGHT: CurtainHorizontalPart;
    static readonly SINGLE: CurtainHorizontalPart;
    get serializedName(): string;
    static valueOf(name: string): CurtainHorizontalPart;
    static values(): CurtainHorizontalPart[];
  }


  interface CurtainVerticalPart extends Enum<CurtainVerticalPart> {}
  class CurtainVerticalPart extends Enum<CurtainVerticalPart> {
    static readonly TOP: CurtainVerticalPart;
    static readonly BOTTOM: CurtainVerticalPart;
    get serializedName(): string;
    static valueOf(name: string): CurtainVerticalPart;
    static values(): CurtainVerticalPart[];
  }


  interface MountType extends Enum<MountType> {}
  class MountType extends Enum<MountType> {
    static readonly FLOOR: MountType;
    static readonly WALL: MountType;
    get serializedName(): string;
    static valueOf(name: string): MountType;
    static values(): MountType[];
  }


  interface SofaType extends Enum<SofaType> {}
  class SofaType extends Enum<SofaType> {
    static readonly SINGLE: SofaType;
    static readonly LEFT: SofaType;
    static readonly MIDDLE: SofaType;
    static readonly RIGHT: SofaType;
    static readonly INNER_LEFT: SofaType;
    static readonly INNER_RIGHT: SofaType;
    static readonly OUTER_LEFT: SofaType;
    static readonly OUTER_RIGHT: SofaType;
    get serializedName(): string;
    toString(): string;
    static valueOf(name: string): SofaType;
    static values(): SofaType[];
  }


  interface WallSupportShape extends Enum<WallSupportShape> {}
  class WallSupportShape extends Enum<WallSupportShape> {
    static readonly SINGLE: WallSupportShape;
    static readonly LEFT: WallSupportShape;
    static readonly MIDDLE: WallSupportShape;
    static readonly RIGHT: WallSupportShape;
    get serializedName(): string;
    static valueOf(name: string): WallSupportShape;
    static values(): WallSupportShape[];
  }

}

declare module 'com.lunazstudios.cobblefurnies.client.animation' {
  import { BBModel } from 'com.lunazstudios.cobblefurnies.client.bbmodel';
  import { Playback } from 'com.lunazstudios.cobblefurnies.client.animation.AnimationMachine';

  class AnimationMachine {
    constructor(model: BBModel);
    get activeClip(): string;
    get clipStartGT(): number;
    get currentState(): string;
    initAtState(state: string, nowGT: number): void;
    requestState(state: string, nowGT: number): void;
    sample(nowGT: number, partialTicks: number): Playback;
    state(state: string, loopingClip: string): AnimationMachine;
    transition(from: string, to: string, onceClip: string): AnimationMachine;
  }

}

declare module 'com.lunazstudios.cobblefurnies.client.animation.AnimationMachine' {
  class Transition {
    readonly fromState: string;
    readonly toState: string;
    readonly clipOnce: string;
    constructor(fromState: string, toState: string, clipOnce: string);
  }


  class Playback {
    readonly clip: string;
    readonly loop: boolean;
    readonly timeSec: number;
    constructor(clip: string, loop: boolean, timeSec: number);
  }

}

declare module 'com.lunazstudios.cobblefurnies.client.bbmodel' {
  import { Vector3f } from 'org.joml';
  import { List, Map } from 'java.util';
  import { TranslateKey, RotateKey } from 'com.lunazstudios.cobblefurnies.client.bbmodel.BBModel';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { Opts } from 'com.lunazstudios.cobblefurnies.client.bbmodel.BBRenderer';

  class BBAnimSampler {
    static sampleRotate(keys: RotateKey[], t: number): Vector3f;
    static sampleTranslate(keys: TranslateKey[], tSec: number): Vector3f;
  }


  class BBModel {
    texW: number;
    texH: number;
    groups: Map;
    roots: List;
    clips: Map;
    static load(rl: ResourceLocation): BBModel;
  }


  class BBRenderer {
    static render(model: BBModel, be: BlockEntity, texture: ResourceLocation, ps: PoseStack, buffers: MultiBufferSource, partialTicks: number, packedOverlay: number, opts: Opts): void;
  }

}

declare module 'com.lunazstudios.cobblefurnies.client.bbmodel.BBModel' {
  import { Vector3f } from 'org.joml';
  import { List, Map } from 'java.util';

  class Group {
    name: string;
    parent: string;
    origin: Vector3f;
    cubes: List;
    children: List;
    rotateDeg: Vector3f;
  }


  class Cube {
    from: Vector3f;
    size: Vector3f;
    faceUV: Map;
    origin: Vector3f;
    offset: number;
    rotateDeg: Vector3f;
  }


  class UVRect {
    u1: number;
    v1: number;
    u2: number;
    v2: number;
  }


  class AnimationClip {
    name: string;
    durationSec: number;
    tracks: Map;
  }


  class AnimTrack {
    group: string;
    translate: List;
    rotate: List;
  }


  class TranslateKey {
    time: number;
    interp: string;
    value: Vector3f;
  }


  class RotateKey {
    time: number;
    interp: string;
    value: Vector3f;
  }

}

declare module 'com.lunazstudios.cobblefurnies.client.bbmodel.BBRenderer' {
  class Opts {
    clip: string;
    loop: boolean;
    centerOnBlock: boolean;
    autoLight: boolean;
    fixedTimeSec: number;
    lightOverride: number;
    autoLight(v: boolean): Opts;
    center(v: boolean): Opts;
    clip(c: string): Opts;
    static defaults(): Opts;
    light(packed: number): Opts;
    loop(v: boolean): Opts;
    time(sec: number): Opts;
  }

}

declare module 'com.lunazstudios.cobblefurnies.client' {
  class CobbleFurniesClient {
    static init(): void;
  }

}

declare module 'com.lunazstudios.cobblefurnies.client.renderer.block' {
  import { BlockEntityRenderer } from 'net.minecraft.client.renderer.blockentity';
  import { StatueBlockEntity, UpperCabinetBlockEntity } from 'com.lunazstudios.cobblefurnies.block.entity';
  import { Context } from 'BlockEntityRendererProvider';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';

  interface StatueBlockRenderer extends BlockEntityRenderer<StatueBlockEntity> {}
  class StatueBlockRenderer extends BlockEntityRenderer<StatueBlockEntity> {
    constructor(ctx: Context);
    render(be: StatueBlockEntity, partialTicks: number, ps: PoseStack, buffers: MultiBufferSource, packedLight: number, packedOverlay: number): void;
  }


  interface UpperCabinetBlockRenderer extends BlockEntityRenderer<UpperCabinetBlockEntity> {}
  class UpperCabinetBlockRenderer extends BlockEntityRenderer<UpperCabinetBlockEntity> {
    constructor(context: Context);
    render(blockEntity: UpperCabinetBlockEntity, partialTick: number, poseStack: PoseStack, bufferSource: MultiBufferSource, packedLight: number, packedOverlay: number): void;
  }

}

declare module 'com.lunazstudios.cobblefurnies.client.renderer.entity' {
  import { EntityRenderer } from 'net.minecraft.client.renderer.entity';
  import { SeatEntity } from 'com.lunazstudios.cobblefurnies.entity';
  import { Context } from 'EntityRendererProvider';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface SeatRenderer extends EntityRenderer<SeatEntity> {}
  class SeatRenderer extends EntityRenderer<SeatEntity> {
    constructor(context: Context);
    getTextureLocation(seatEntity: SeatEntity): ResourceLocation;
  }

}

declare module 'com.lunazstudios.cobblefurnies.client.screen' {
  import { ClientTooltipComponent } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { FurniCrafterMenu, StoveMenu } from 'com.lunazstudios.cobblefurnies.menu';
  import { CountedIngredient, FurniCraftingRecipe } from 'com.lunazstudios.cobblefurnies.recipe';
  import { Map } from 'java.util';
  import { Integer } from 'java.lang';
  import { Font, GuiGraphics } from 'net.minecraft.client.gui';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { RecipeUpdateListener, RecipeBookComponent } from 'net.minecraft.client.gui.screens.recipebook';

  interface ClientFurnicrafterRecipeIngredientTooltip extends ClientTooltipComponent {}
  class ClientFurnicrafterRecipeIngredientTooltip extends ClientTooltipComponent {
    constructor(menu: FurniCrafterMenu, material: CountedIngredient, counted: Map<number, number>);
    get height(): number;
    getWidth(font: Font): number;
    renderImage(font: Font, start: number, top: number, graphics: GuiGraphics): void;
  }


  interface ClientFurnicrafterRecipeTooltip extends ClientTooltipComponent {}
  class ClientFurnicrafterRecipeTooltip extends ClientTooltipComponent {
    constructor(menu: FurniCrafterMenu, recipe: FurniCraftingRecipe);
    get height(): number;
    getWidth(font: Font): number;
    renderImage(font: Font, start: number, top: number, graphics: GuiGraphics): void;
  }


  interface FurniCrafterScreen extends AbstractContainerScreen<FurniCrafterMenu> {}
  class FurniCrafterScreen extends AbstractContainerScreen<FurniCrafterMenu> {
    static readonly TEXTURE: ResourceLocation;
    constructor(menu: FurniCrafterMenu, inventory: Inventory, title: Component);
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, deltaX: number, deltaY: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    updateRecipeButtons(): void;
  }


  interface StoveScreen extends RecipeUpdateListener, AbstractContainerScreen<StoveMenu> {}
  class StoveScreen extends RecipeUpdateListener {
    static readonly COOK_PROGRESS_HEIGHT: number;
    static readonly COOK_PROGRESS_WIDTH: number;
    static readonly COOK_PROGRESS_SPRITE: ResourceLocation;
    constructor(menu: StoveMenu, playerInventory: Inventory, title: Component);
    containerTick(): void;
    get recipeBookComponent(): RecipeBookComponent;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    recipesUpdated(): void;
    render(context: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }

}

declare module 'com.lunazstudios.cobblefurnies' {
  import { ResourceLocation } from 'net.minecraft.resources';

  class CobbleFurnies {
    static readonly MOD_ID: string;
    static id(name: string): ResourceLocation;
    static init(): void;
  }

}

declare module 'com.lunazstudios.cobblefurnies.compat' {
  import { IRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { FurniCraftingRecipe } from 'com.lunazstudios.cobblefurnies.recipe';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RecipeType, IFocusGroup } from 'mezz.jei.api.recipe';
  import { IGuiHelper } from 'mezz.jei.api.helpers';
  import { Component } from 'net.minecraft.network.chat';
  import { IDrawable } from 'mezz.jei.api.gui.drawable';
  import { IRecipeLayoutBuilder } from 'mezz.jei.api.gui.builder';
  import { IModPlugin } from 'mezz.jei.api';
  import { IRecipeCategoryRegistration, IRecipeRegistration } from 'mezz.jei.api.registration';

  interface FurniCrafterRecipeCategory extends IRecipeCategory<FurniCraftingRecipe> {}
  class FurniCrafterRecipeCategory extends IRecipeCategory<FurniCraftingRecipe> {
    static readonly UID: ResourceLocation;
    static readonly TEXTURE: ResourceLocation;
    static readonly RECIPE_TYPE: RecipeType;
    constructor(helper: IGuiHelper);
    get background(): IDrawable;
    get icon(): IDrawable;
    get recipeType(): RecipeType<FurniCraftingRecipe>;
    get title(): Component;
    setRecipe(builder: IRecipeLayoutBuilder, recipe: FurniCraftingRecipe, focuses: IFocusGroup): void;
  }


  interface JEICobbleFurniesPlugin extends IModPlugin {}
  class JEICobbleFurniesPlugin extends IModPlugin {
    get pluginUid(): ResourceLocation;
    registerCategories(registration: IRecipeCategoryRegistration): void;
    registerRecipes(registration: IRecipeRegistration): void;
  }

}

declare module 'com.lunazstudios.cobblefurnies.entity' {
  import { Entity, LivingEntity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Packet } from 'net.minecraft.network.protocol';
  import { ClientGamePacketListener } from 'net.minecraft.network.protocol.game';
  import { ServerEntity } from 'net.minecraft.server.level';

  interface SeatEntity extends Entity {}
  class SeatEntity extends Entity {
    constructor(level: Level);

    constructor(level: Level, pos: BlockPos);
    get passengersRidingOffset(): number;
    getAddEntityPacket(entity: ServerEntity): Packet<ClientGamePacketListener>;
    getDismountLocationForPassenger(entity: LivingEntity): Vec3;
    static getEntitySeatOffset(entity: Entity): number;
    getPassengerRidingPosition(entity: Entity): Vec3;
    tick(): void;
  }

}

declare module 'com.lunazstudios.cobblefurnies.menu.container' {
  import { TransientCraftingContainer } from 'net.minecraft.world.inventory';
  import { StoveMenu } from 'com.lunazstudios.cobblefurnies.menu';
  import { NonNullList } from 'net.minecraft.core';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player, StackedContents } from 'net.minecraft.world.entity.player';
  import { List } from 'java.util';

  interface StoveContainer extends TransientCraftingContainer {}
  class StoveContainer extends TransientCraftingContainer {
    readonly menu: StoveMenu;
    readonly items: NonNullList;
    constructor(menu: StoveMenu, width: number, height: number);
    clearContent(): void;
    fillStackedContents(helper: StackedContents): void;
    get containerSize(): number;
    get height(): number;
    get items(): ItemStack[];
    get width(): number;
    getItem(index: number): ItemStack;
    isEmpty(): boolean;
    removeItem(index: number, count: number): ItemStack;
    removeItemNoUpdate(index: number): ItemStack;
    setChanged(): void;
    setItem(index: number, stack: ItemStack): void;
    stillValid(player: Player): boolean;
  }

}

declare module 'com.lunazstudios.cobblefurnies.menu' {
  import { AbstractContainerMenu, RecipeBookMenu, ContainerListener, CraftingContainer, ContainerData, RecipeBookType } from 'net.minecraft.world.inventory';
  import { Inventory, Player, StackedContents } from 'net.minecraft.world.entity.player';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { SimpleContainer } from 'net.minecraft.world';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { List, Map } from 'java.util';
  import { RecipeHolder, CraftingInput } from 'net.minecraft.world.item.crafting';
  import { FurniCraftingRecipe, CountedIngredient } from 'com.lunazstudios.cobblefurnies.recipe';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Integer } from 'java.lang';
  import { CookingPotRecipeBase } from 'com.cobblemon.mod.common.item.crafting';
  import { ServerPlayer } from 'net.minecraft.server.level';

  interface FurniCrafterMenu extends AbstractContainerMenu {}
  class FurniCrafterMenu extends AbstractContainerMenu {
    constructor(id: number, inventory: Inventory, level: Level, pos: BlockPos, outputContainer: SimpleContainer);

    constructor(id: number, inventory: Inventory, level: Level, pos: BlockPos);

    constructor(id: number, inventory: Inventory, buf: FriendlyByteBuf);

    constructor(id: number, inventory: Inventory);
    broadcastChanges(): void;
    canCraft(recipe: FurniCraftingRecipe): boolean;
    craftSelectedRecipe(recipeIndex: number): void;
    get availableRecipes(): RecipeHolder<FurniCraftingRecipe>[];
    hasMaterials(material: CountedIngredient, counted: Map<number, number>): boolean;
    mayPlace(stack: ItemStack): boolean;
    quickMoveStack(player: Player, i: number): ItemStack;
    setCraftableRecipes(canCraft: boolean[]): void;
    stillValid(player: Player): boolean;
    updateCraftableRecipes(): void;
  }


  interface StoveMenu extends ContainerListener, RecipeBookMenu<CraftingInput, CookingPotRecipeBase> {}
  class StoveMenu extends ContainerListener {
    readonly container: CraftingContainer;
    readonly containerData: ContainerData;
    currentActiveRecipe: RecipeHolder;
    previewItem: ItemStack;
    static readonly RESULT_SLOT: number;
    static readonly CRAFTING_GRID_WIDTH: number;
    static readonly ITEMS_SIZE: number;
    static readonly CRAFTING_GRID_START: number;
    static readonly CRAFTING_GRID_END: number;
    static readonly SEASONING_START: number;
    static readonly SEASONING_END: number;
    static readonly PLAYER_INV_START: number;
    static readonly PLAYER_INV_END: number;
    static readonly PLAYER_HOTBAR_START: number;
    static readonly PLAYER_HOTBAR_END: number;
    constructor(containerId: number, playerInventory: Inventory);

    constructor(containerId: number, playerInventory: Inventory, container: CraftingContainer, containerData: ContainerData);
    broadcastChanges(): void;
    clearCraftingContent(): void;
    dataChanged(containerMenu: AbstractContainerMenu, dataSlotIndex: number, value: number): void;
    fillCraftSlotsStackedContents(itemHelper: StackedContents): void;
    get burnProgress(): number;
    get gridHeight(): number;
    get gridWidth(): number;
    get recipeBookType(): RecipeBookType;
    get resultSlotIndex(): number;
    get size(): number;
    handlePlacement(placeAll: boolean, recipe: RecipeHolder<any>, player: ServerPlayer): void;
    quickMoveStack(player: Player, index: number): ItemStack;
    recipeMatches(recipe: RecipeHolder<CookingPotRecipeBase>): boolean;
    removed(player: Player): void;
    shouldMoveToInventory(slotIndex: number): boolean;
    slotChanged(containerToSend: AbstractContainerMenu, dataSlotIndex: number, stack: ItemStack): void;
    stillValid(player: Player): boolean;
  }

}

declare module 'com.lunazstudios.cobblefurnies.menu.slot' {
  import { Slot, CraftingContainer } from 'net.minecraft.world.inventory';
  import { StoveMenu } from 'com.lunazstudios.cobblefurnies.menu';
  import { Container } from 'net.minecraft.world';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';

  interface SeasoningSlot extends Slot {}
  class SeasoningSlot extends Slot {
    constructor(menu: StoveMenu, container: Container, slot: number, x: number, y: number);
    mayPlace(stack: ItemStack): boolean;
  }


  interface StoveResultSlot extends Slot {}
  class StoveResultSlot extends Slot {
    constructor(container: CraftingContainer, index: number, x: number, y: number);
    mayPlace(stack: ItemStack): boolean;
    onTake(player: Player, stack: ItemStack): void;
  }

}

declare module 'com.lunazstudios.cobblefurnies.mixin.client' {
  import { Font } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { ClientTooltipComponent, ClientTooltipPositioner } from 'net.minecraft.client.gui.screens.inventory.tooltip';

  class GuiGraphicsInvoker {
    invokeRenderTooltipInternal(var1: Font, var2: ClientTooltipComponent[], var3: number, var4: number, var5: ClientTooltipPositioner): void;
  }

}

declare module 'com.lunazstudios.cobblefurnies.neoforge' {
  import { IEventBus } from 'net.neoforged.bus.api';
  import { FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';

  class CobbleFurniesNeoForge {
    constructor(bus: IEventBus);
  }


  class CobbleFurniesNeoForgeClient {
    static init(event: FMLClientSetupEvent): void;
  }

}

declare module 'com.lunazstudios.cobblefurnies.neoforge.CobbleFurniesNeoForge' {
  import { RegisterMenuScreensEvent } from 'net.neoforged.neoforge.client.event';

  class ClientModEvents {
    static registerScreens(event: RegisterMenuScreensEvent): void;
  }

}

declare module 'com.lunazstudios.cobblefurnies.network' {
  import { Type } from 'CustomPacketPayload';

  class CFNetwork {
    static readonly CRAFT_RECIPE_TYPE: Type;
    static readonly CRAFTABLE_RECIPES_SYNC_TYPE: Type;
    static readonly TOGGLE_STOVE_LID_TYPE: Type;
    static registerPackets(): void;
  }

}

declare module 'com.lunazstudios.cobblefurnies.recipe' {
  import { Recipe, SingleRecipeInput, RecipeSerializer, RecipeType } from 'net.minecraft.world.item.crafting';
  import { NonNullList } from 'net.minecraft.core';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Level } from 'net.minecraft.world.level';
  import { Provider } from 'HolderLookup';

  interface FurniCraftingRecipe extends Recipe<SingleRecipeInput> {}
  class FurniCraftingRecipe extends Recipe<SingleRecipeInput> {
    constructor(materials: NonNullList<CountedIngredient>, result: ItemStack, notification: boolean);
    assemble(input: SingleRecipeInput, provider: Provider): ItemStack;
    canCraftInDimensions(width: number, height: number): boolean;
    get materialStacks(): ItemStack[];
    get materials(): NonNullList<CountedIngredient>;
    get result(): ItemStack;
    get serializer(): RecipeSerializer<any>;
    get type(): RecipeType<any>;
    getResultItem(provider: Provider): ItemStack;
    matches(input: SingleRecipeInput, level: Level): boolean;
  }

}

declare module 'com.lunazstudios.cobblefurnies.recipe.FurniCraftingRecipe' {
  import { RecipeType, RecipeSerializer } from 'net.minecraft.world.item.crafting';
  import { FurniCraftingRecipe } from 'com.lunazstudios.cobblefurnies.recipe';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  interface Type extends RecipeType<FurniCraftingRecipe> {}
  class Type extends RecipeType<FurniCraftingRecipe> {
    static readonly INSTANCE: Type;
  }


  interface Serializer extends RecipeSerializer<FurniCraftingRecipe> {}
  class Serializer extends RecipeSerializer<FurniCraftingRecipe> {
    static readonly INSTANCE: Serializer;
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    codec(): MapCodec<FurniCraftingRecipe>;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, FurniCraftingRecipe>;
  }

}

declare module 'com.lunazstudios.cobblefurnies.registry' {
  import { Supplier } from 'java.util.function';
  import { Block } from 'net.minecraft.world.level.block';
  import { TagKey } from 'net.minecraft.tags';
  import { RecipeType, RecipeSerializer } from 'net.minecraft.world.item.crafting';
  import { SoundEvent } from 'net.minecraft.sounds';

  class CFBlockEntityTypes {
    static readonly STOVE: Supplier;
    static readonly DRAWER: Supplier;
    static readonly UPPER_CABINET: Supplier;
    static readonly NIGHT_STAND: Supplier;
    static readonly CABINET: Supplier;
    static readonly STATUE: Supplier;
    static readonly FRIDGE: Supplier;
    static readonly FREEZER: Supplier;
    static readonly FURNI_CRAFTER: Supplier;
    static init(): void;
  }


  class CFBlocks {
    static readonly POKE_BALL_DESK: Supplier;
    static readonly POKE_BALL_CHAIR: Supplier;
    static readonly LIGHT_TOILET: Supplier;
    static readonly DARK_TOILET: Supplier;
    static readonly LIGHT_FREEZER: Supplier;
    static readonly LIGHT_FRIDGE: Supplier;
    static readonly DARK_FREEZER: Supplier;
    static readonly DARK_FRIDGE: Supplier;
    static readonly FURNI_CRAFTER: Supplier;
    static readonly TV: Supplier;
    static readonly CES: Supplier;
    static readonly KITCHEN_FLOOR: Supplier;
    static readonly BAMBOO_FLOOR: Supplier;
    static readonly BAMBOO_PLANKS: Supplier;
    static readonly AZURE_MOSAIC: Supplier;
    static readonly BUTTER_MOSAIC: Supplier;
    static readonly VANILLA_MOSAIC: Supplier;
    static readonly GOLDENROD_MOSAIC: Supplier;
    static readonly ICED_PORCELAIN: Supplier;
    static readonly MINTED_PORCELAIN: Supplier;
    static readonly IRONLACE_CERAMIC: Supplier;
    static readonly PALE_CERAMIC: Supplier;
    static readonly POOL_CERAMIC: Supplier;
    static readonly LAB_FLOOR: Supplier;
    static readonly STATUE_ANCIENT: Supplier;
    static readonly STATUE_PIKACHU: Supplier;
    static readonly STATUE_CHARMANDER: Supplier;
    static readonly STATUE_SQUIRTLE: Supplier;
    static readonly STATUE_BULBASAUR: Supplier;
    static readonly BONSAI_PLANT: Supplier;
    static readonly MINI_TOPIARY: Supplier;
    static readonly POTTED_POTHOS: Supplier;
    static readonly RED_POKE_WOOL: Supplier;
    static readonly RED_POKE_WOOL_CARPET: Supplier;
    static readonly ORANGE_POKE_WOOL: Supplier;
    static readonly ORANGE_POKE_WOOL_CARPET: Supplier;
    static readonly YELLOW_POKE_WOOL: Supplier;
    static readonly YELLOW_POKE_WOOL_CARPET: Supplier;
    static readonly BROWN_POKE_WOOL: Supplier;
    static readonly BROWN_POKE_WOOL_CARPET: Supplier;
    static readonly LIME_POKE_WOOL: Supplier;
    static readonly LIME_POKE_WOOL_CARPET: Supplier;
    static readonly GREEN_POKE_WOOL: Supplier;
    static readonly GREEN_POKE_WOOL_CARPET: Supplier;
    static readonly CYAN_POKE_WOOL: Supplier;
    static readonly CYAN_POKE_WOOL_CARPET: Supplier;
    static readonly LIGHT_BLUE_POKE_WOOL: Supplier;
    static readonly LIGHT_BLUE_POKE_WOOL_CARPET: Supplier;
    static readonly BLUE_POKE_WOOL: Supplier;
    static readonly BLUE_POKE_WOOL_CARPET: Supplier;
    static readonly MAGENTA_POKE_WOOL: Supplier;
    static readonly MAGENTA_POKE_WOOL_CARPET: Supplier;
    static readonly PURPLE_POKE_WOOL: Supplier;
    static readonly PURPLE_POKE_WOOL_CARPET: Supplier;
    static readonly PINK_POKE_WOOL: Supplier;
    static readonly PINK_POKE_WOOL_CARPET: Supplier;
    static readonly WHITE_POKE_WOOL: Supplier;
    static readonly WHITE_POKE_WOOL_CARPET: Supplier;
    static readonly LIGHT_GRAY_POKE_WOOL: Supplier;
    static readonly LIGHT_GRAY_POKE_WOOL_CARPET: Supplier;
    static readonly GRAY_POKE_WOOL: Supplier;
    static readonly GRAY_POKE_WOOL_CARPET: Supplier;
    static readonly BLACK_POKE_WOOL: Supplier;
    static readonly BLACK_POKE_WOOL_CARPET: Supplier;
    static readonly RED_CURTAIN: Supplier;
    static readonly ORANGE_CURTAIN: Supplier;
    static readonly YELLOW_CURTAIN: Supplier;
    static readonly BROWN_CURTAIN: Supplier;
    static readonly LIME_CURTAIN: Supplier;
    static readonly GREEN_CURTAIN: Supplier;
    static readonly CYAN_CURTAIN: Supplier;
    static readonly LIGHT_BLUE_CURTAIN: Supplier;
    static readonly BLUE_CURTAIN: Supplier;
    static readonly MAGENTA_CURTAIN: Supplier;
    static readonly PURPLE_CURTAIN: Supplier;
    static readonly PINK_CURTAIN: Supplier;
    static readonly WHITE_CURTAIN: Supplier;
    static readonly LIGHT_GRAY_CURTAIN: Supplier;
    static readonly GRAY_CURTAIN: Supplier;
    static readonly BLACK_CURTAIN: Supplier;
    static readonly RED_LAMP: Supplier;
    static readonly ORANGE_LAMP: Supplier;
    static readonly YELLOW_LAMP: Supplier;
    static readonly BROWN_LAMP: Supplier;
    static readonly LIME_LAMP: Supplier;
    static readonly GREEN_LAMP: Supplier;
    static readonly CYAN_LAMP: Supplier;
    static readonly LIGHT_BLUE_LAMP: Supplier;
    static readonly BLUE_LAMP: Supplier;
    static readonly MAGENTA_LAMP: Supplier;
    static readonly PURPLE_LAMP: Supplier;
    static readonly PINK_LAMP: Supplier;
    static readonly WHITE_LAMP: Supplier;
    static readonly LIGHT_GRAY_LAMP: Supplier;
    static readonly GRAY_LAMP: Supplier;
    static readonly BLACK_LAMP: Supplier;
    static readonly RED_CHAIR: Supplier;
    static readonly RED_DARK_CHAIR: Supplier;
    static readonly ORANGE_CHAIR: Supplier;
    static readonly ORANGE_DARK_CHAIR: Supplier;
    static readonly YELLOW_CHAIR: Supplier;
    static readonly YELLOW_DARK_CHAIR: Supplier;
    static readonly BROWN_CHAIR: Supplier;
    static readonly BROWN_DARK_CHAIR: Supplier;
    static readonly LIME_CHAIR: Supplier;
    static readonly LIME_DARK_CHAIR: Supplier;
    static readonly GREEN_CHAIR: Supplier;
    static readonly GREEN_DARK_CHAIR: Supplier;
    static readonly CYAN_CHAIR: Supplier;
    static readonly CYAN_DARK_CHAIR: Supplier;
    static readonly LIGHT_BLUE_CHAIR: Supplier;
    static readonly LIGHT_BLUE_DARK_CHAIR: Supplier;
    static readonly BLUE_CHAIR: Supplier;
    static readonly BLUE_DARK_CHAIR: Supplier;
    static readonly MAGENTA_CHAIR: Supplier;
    static readonly MAGENTA_DARK_CHAIR: Supplier;
    static readonly PURPLE_CHAIR: Supplier;
    static readonly PURPLE_DARK_CHAIR: Supplier;
    static readonly PINK_CHAIR: Supplier;
    static readonly PINK_DARK_CHAIR: Supplier;
    static readonly WHITE_CHAIR: Supplier;
    static readonly WHITE_DARK_CHAIR: Supplier;
    static readonly LIGHT_GRAY_CHAIR: Supplier;
    static readonly LIGHT_GRAY_DARK_CHAIR: Supplier;
    static readonly GRAY_CHAIR: Supplier;
    static readonly GRAY_DARK_CHAIR: Supplier;
    static readonly BLACK_CHAIR: Supplier;
    static readonly BLACK_DARK_CHAIR: Supplier;
    static readonly OAK_CHAIR: Supplier;
    static readonly SPRUCE_CHAIR: Supplier;
    static readonly BIRCH_CHAIR: Supplier;
    static readonly DARK_OAK_CHAIR: Supplier;
    static readonly JUNGLE_CHAIR: Supplier;
    static readonly ACACIA_CHAIR: Supplier;
    static readonly MANGROVE_CHAIR: Supplier;
    static readonly BAMBOO_CHAIR: Supplier;
    static readonly CHERRY_CHAIR: Supplier;
    static readonly CRIMSON_CHAIR: Supplier;
    static readonly WARPED_CHAIR: Supplier;
    static readonly APRICORN_CHAIR: Supplier;
    static readonly SACCHARINE_CHAIR: Supplier;
    static readonly OAK_NIGHTSTAND: Supplier;
    static readonly SPRUCE_NIGHTSTAND: Supplier;
    static readonly BIRCH_NIGHTSTAND: Supplier;
    static readonly DARK_OAK_NIGHTSTAND: Supplier;
    static readonly JUNGLE_NIGHTSTAND: Supplier;
    static readonly ACACIA_NIGHTSTAND: Supplier;
    static readonly MANGROVE_NIGHTSTAND: Supplier;
    static readonly BAMBOO_NIGHTSTAND: Supplier;
    static readonly CHERRY_NIGHTSTAND: Supplier;
    static readonly CRIMSON_NIGHTSTAND: Supplier;
    static readonly WARPED_NIGHTSTAND: Supplier;
    static readonly APRICORN_NIGHTSTAND: Supplier;
    static readonly SACCHARINE_NIGHTSTAND: Supplier;
    static readonly OAK_WALL_SUPPORT: Supplier;
    static readonly SPRUCE_WALL_SUPPORT: Supplier;
    static readonly BIRCH_WALL_SUPPORT: Supplier;
    static readonly DARK_OAK_WALL_SUPPORT: Supplier;
    static readonly JUNGLE_WALL_SUPPORT: Supplier;
    static readonly ACACIA_WALL_SUPPORT: Supplier;
    static readonly MANGROVE_WALL_SUPPORT: Supplier;
    static readonly BAMBOO_WALL_SUPPORT: Supplier;
    static readonly CHERRY_WALL_SUPPORT: Supplier;
    static readonly CRIMSON_WALL_SUPPORT: Supplier;
    static readonly WARPED_WALL_SUPPORT: Supplier;
    static readonly APRICORN_WALL_SUPPORT: Supplier;
    static readonly SACCHARINE_WALL_SUPPORT: Supplier;
    static readonly RED_STOOL: Supplier;
    static readonly RED_DARK_STOOL: Supplier;
    static readonly ORANGE_STOOL: Supplier;
    static readonly ORANGE_DARK_STOOL: Supplier;
    static readonly YELLOW_STOOL: Supplier;
    static readonly YELLOW_DARK_STOOL: Supplier;
    static readonly BROWN_STOOL: Supplier;
    static readonly BROWN_DARK_STOOL: Supplier;
    static readonly LIME_STOOL: Supplier;
    static readonly LIME_DARK_STOOL: Supplier;
    static readonly GREEN_STOOL: Supplier;
    static readonly GREEN_DARK_STOOL: Supplier;
    static readonly CYAN_STOOL: Supplier;
    static readonly CYAN_DARK_STOOL: Supplier;
    static readonly LIGHT_BLUE_STOOL: Supplier;
    static readonly LIGHT_BLUE_DARK_STOOL: Supplier;
    static readonly BLUE_STOOL: Supplier;
    static readonly BLUE_DARK_STOOL: Supplier;
    static readonly MAGENTA_STOOL: Supplier;
    static readonly MAGENTA_DARK_STOOL: Supplier;
    static readonly PURPLE_STOOL: Supplier;
    static readonly PURPLE_DARK_STOOL: Supplier;
    static readonly PINK_STOOL: Supplier;
    static readonly PINK_DARK_STOOL: Supplier;
    static readonly WHITE_STOOL: Supplier;
    static readonly WHITE_DARK_STOOL: Supplier;
    static readonly LIGHT_GRAY_STOOL: Supplier;
    static readonly LIGHT_GRAY_DARK_STOOL: Supplier;
    static readonly GRAY_STOOL: Supplier;
    static readonly GRAY_DARK_STOOL: Supplier;
    static readonly BLACK_STOOL: Supplier;
    static readonly BLACK_DARK_STOOL: Supplier;
    static readonly RED_SOFA: Supplier;
    static readonly ORANGE_SOFA: Supplier;
    static readonly YELLOW_SOFA: Supplier;
    static readonly BROWN_SOFA: Supplier;
    static readonly LIME_SOFA: Supplier;
    static readonly GREEN_SOFA: Supplier;
    static readonly CYAN_SOFA: Supplier;
    static readonly LIGHT_BLUE_SOFA: Supplier;
    static readonly BLUE_SOFA: Supplier;
    static readonly MAGENTA_SOFA: Supplier;
    static readonly PURPLE_SOFA: Supplier;
    static readonly PINK_SOFA: Supplier;
    static readonly WHITE_SOFA: Supplier;
    static readonly LIGHT_GRAY_SOFA: Supplier;
    static readonly GRAY_SOFA: Supplier;
    static readonly BLACK_SOFA: Supplier;
    static readonly RED_ARMCHAIR: Supplier;
    static readonly ORANGE_ARMCHAIR: Supplier;
    static readonly YELLOW_ARMCHAIR: Supplier;
    static readonly BROWN_ARMCHAIR: Supplier;
    static readonly LIME_ARMCHAIR: Supplier;
    static readonly GREEN_ARMCHAIR: Supplier;
    static readonly CYAN_ARMCHAIR: Supplier;
    static readonly LIGHT_BLUE_ARMCHAIR: Supplier;
    static readonly BLUE_ARMCHAIR: Supplier;
    static readonly MAGENTA_ARMCHAIR: Supplier;
    static readonly PURPLE_ARMCHAIR: Supplier;
    static readonly PINK_ARMCHAIR: Supplier;
    static readonly WHITE_ARMCHAIR: Supplier;
    static readonly LIGHT_GRAY_ARMCHAIR: Supplier;
    static readonly GRAY_ARMCHAIR: Supplier;
    static readonly BLACK_ARMCHAIR: Supplier;
    static readonly RED_TABLE: Supplier;
    static readonly RED_DARK_TABLE: Supplier;
    static readonly ORANGE_TABLE: Supplier;
    static readonly ORANGE_DARK_TABLE: Supplier;
    static readonly YELLOW_TABLE: Supplier;
    static readonly YELLOW_DARK_TABLE: Supplier;
    static readonly BROWN_TABLE: Supplier;
    static readonly BROWN_DARK_TABLE: Supplier;
    static readonly LIME_TABLE: Supplier;
    static readonly LIME_DARK_TABLE: Supplier;
    static readonly GREEN_TABLE: Supplier;
    static readonly GREEN_DARK_TABLE: Supplier;
    static readonly CYAN_TABLE: Supplier;
    static readonly CYAN_DARK_TABLE: Supplier;
    static readonly LIGHT_BLUE_TABLE: Supplier;
    static readonly LIGHT_BLUE_DARK_TABLE: Supplier;
    static readonly BLUE_TABLE: Supplier;
    static readonly BLUE_DARK_TABLE: Supplier;
    static readonly MAGENTA_TABLE: Supplier;
    static readonly MAGENTA_DARK_TABLE: Supplier;
    static readonly PURPLE_TABLE: Supplier;
    static readonly PURPLE_DARK_TABLE: Supplier;
    static readonly PINK_TABLE: Supplier;
    static readonly PINK_DARK_TABLE: Supplier;
    static readonly WHITE_TABLE: Supplier;
    static readonly WHITE_DARK_TABLE: Supplier;
    static readonly LIGHT_GRAY_TABLE: Supplier;
    static readonly LIGHT_GRAY_DARK_TABLE: Supplier;
    static readonly GRAY_TABLE: Supplier;
    static readonly GRAY_DARK_TABLE: Supplier;
    static readonly BLACK_TABLE: Supplier;
    static readonly BLACK_DARK_TABLE: Supplier;
    static readonly OAK_TABLE: Supplier;
    static readonly SPRUCE_TABLE: Supplier;
    static readonly BIRCH_TABLE: Supplier;
    static readonly DARK_OAK_TABLE: Supplier;
    static readonly JUNGLE_TABLE: Supplier;
    static readonly ACACIA_TABLE: Supplier;
    static readonly MANGROVE_TABLE: Supplier;
    static readonly BAMBOO_TABLE: Supplier;
    static readonly CHERRY_TABLE: Supplier;
    static readonly CRIMSON_TABLE: Supplier;
    static readonly WARPED_TABLE: Supplier;
    static readonly APRICORN_TABLE: Supplier;
    static readonly SACCHARINE_TABLE: Supplier;
    static readonly RED_SINK: Supplier;
    static readonly ORANGE_SINK: Supplier;
    static readonly YELLOW_SINK: Supplier;
    static readonly BROWN_SINK: Supplier;
    static readonly LIME_SINK: Supplier;
    static readonly GREEN_SINK: Supplier;
    static readonly CYAN_SINK: Supplier;
    static readonly LIGHT_BLUE_SINK: Supplier;
    static readonly BLUE_SINK: Supplier;
    static readonly MAGENTA_SINK: Supplier;
    static readonly PURPLE_SINK: Supplier;
    static readonly PINK_SINK: Supplier;
    static readonly WHITE_SINK: Supplier;
    static readonly LIGHT_GRAY_SINK: Supplier;
    static readonly GRAY_SINK: Supplier;
    static readonly BLACK_SINK: Supplier;
    static readonly RED_STOVE: Supplier;
    static readonly ORANGE_STOVE: Supplier;
    static readonly YELLOW_STOVE: Supplier;
    static readonly BROWN_STOVE: Supplier;
    static readonly LIME_STOVE: Supplier;
    static readonly GREEN_STOVE: Supplier;
    static readonly CYAN_STOVE: Supplier;
    static readonly LIGHT_BLUE_STOVE: Supplier;
    static readonly BLUE_STOVE: Supplier;
    static readonly MAGENTA_STOVE: Supplier;
    static readonly PURPLE_STOVE: Supplier;
    static readonly PINK_STOVE: Supplier;
    static readonly WHITE_STOVE: Supplier;
    static readonly LIGHT_GRAY_STOVE: Supplier;
    static readonly GRAY_STOVE: Supplier;
    static readonly BLACK_STOVE: Supplier;
    static readonly RED_CABINETRY: Supplier;
    static readonly ORANGE_CABINETRY: Supplier;
    static readonly YELLOW_CABINETRY: Supplier;
    static readonly BROWN_CABINETRY: Supplier;
    static readonly LIME_CABINETRY: Supplier;
    static readonly GREEN_CABINETRY: Supplier;
    static readonly CYAN_CABINETRY: Supplier;
    static readonly LIGHT_BLUE_CABINETRY: Supplier;
    static readonly BLUE_CABINETRY: Supplier;
    static readonly MAGENTA_CABINETRY: Supplier;
    static readonly PURPLE_CABINETRY: Supplier;
    static readonly PINK_CABINETRY: Supplier;
    static readonly WHITE_CABINETRY: Supplier;
    static readonly LIGHT_GRAY_CABINETRY: Supplier;
    static readonly GRAY_CABINETRY: Supplier;
    static readonly BLACK_CABINETRY: Supplier;
    static readonly RED_DRAWER: Supplier;
    static readonly ORANGE_DRAWER: Supplier;
    static readonly YELLOW_DRAWER: Supplier;
    static readonly BROWN_DRAWER: Supplier;
    static readonly LIME_DRAWER: Supplier;
    static readonly GREEN_DRAWER: Supplier;
    static readonly CYAN_DRAWER: Supplier;
    static readonly LIGHT_BLUE_DRAWER: Supplier;
    static readonly BLUE_DRAWER: Supplier;
    static readonly MAGENTA_DRAWER: Supplier;
    static readonly PURPLE_DRAWER: Supplier;
    static readonly PINK_DRAWER: Supplier;
    static readonly WHITE_DRAWER: Supplier;
    static readonly LIGHT_GRAY_DRAWER: Supplier;
    static readonly GRAY_DRAWER: Supplier;
    static readonly BLACK_DRAWER: Supplier;
    static readonly RED_UPPER_CABINET: Supplier;
    static readonly ORANGE_UPPER_CABINET: Supplier;
    static readonly YELLOW_UPPER_CABINET: Supplier;
    static readonly BROWN_UPPER_CABINET: Supplier;
    static readonly LIME_UPPER_CABINET: Supplier;
    static readonly GREEN_UPPER_CABINET: Supplier;
    static readonly CYAN_UPPER_CABINET: Supplier;
    static readonly LIGHT_BLUE_UPPER_CABINET: Supplier;
    static readonly BLUE_UPPER_CABINET: Supplier;
    static readonly MAGENTA_UPPER_CABINET: Supplier;
    static readonly PURPLE_UPPER_CABINET: Supplier;
    static readonly PINK_UPPER_CABINET: Supplier;
    static readonly WHITE_UPPER_CABINET: Supplier;
    static readonly LIGHT_GRAY_UPPER_CABINET: Supplier;
    static readonly GRAY_UPPER_CABINET: Supplier;
    static readonly BLACK_UPPER_CABINET: Supplier;
    static readonly OAK_CABINET: Supplier;
    static readonly SPRUCE_CABINET: Supplier;
    static readonly BIRCH_CABINET: Supplier;
    static readonly DARK_OAK_CABINET: Supplier;
    static readonly JUNGLE_CABINET: Supplier;
    static readonly ACACIA_CABINET: Supplier;
    static readonly MANGROVE_CABINET: Supplier;
    static readonly BAMBOO_CABINET: Supplier;
    static readonly CHERRY_CABINET: Supplier;
    static readonly CRIMSON_CABINET: Supplier;
    static readonly WARPED_CABINET: Supplier;
    static readonly APRICORN_CABINET: Supplier;
    static readonly SACCHARINE_CABINET: Supplier;
    static init(): void;
    static registerBlock<T extends Block>(name: string, block: Supplier<T>): Supplier<T>;
    static registerBlockHidden<T extends Block>(name: string, block: Supplier<T>): Supplier<T>;
    static registerBlockOnly<T extends Block>(name: string, block: Supplier<T>): Supplier<T>;
    static registerBlockWithTooltip<T extends Block>(name: string, block: Supplier<T>): Supplier<T>;
  }


  class CFBlockTags {
    static readonly BENCHES: TagKey;
    static readonly CHAIRS: TagKey;
    static readonly CURTAINS: TagKey;
    static readonly DRAWERS: TagKey;
    static readonly LAMPS: TagKey;
    static readonly PLANTER_BOXES: TagKey;
    static readonly SHELVES: TagKey;
    static readonly SHUTTERS: TagKey;
    static readonly SOFAS: TagKey;
    static readonly STOOLS: TagKey;
    static readonly TABLES: TagKey;
    static readonly NIGHT_STANDS: TagKey;
    static readonly TALL_STOOLS: TagKey;
    static readonly CHAIRS_TUCKABLE_UNDER: TagKey;
    static readonly ABOVE_BYPASSES_SEAT_CHECK: TagKey;
    static readonly TABLES_CONNECTABLE: TagKey;
    static readonly WALL_SUPPORT_CONNECTABLE: TagKey;
    static readonly DONT_CONNECT_TO_PANES: TagKey;
    static readonly CAN_USE_SHUTTERS_THROUGH: TagKey;
    static readonly SINKS_CONNECTABLE: TagKey;
    static init(): void;
  }


  class CFEntityTypes {
    static readonly SEAT: Supplier;
    static init(): void;
  }


  class CFEntityTypeTags {
    static readonly CAN_SIT_IN_SEATS: TagKey;
    static init(): void;
  }


  class CFMenus {
    static readonly FURNI_CRAFTER_MENU: Supplier;
    static readonly STOVE_MENU: Supplier;
    static register(): void;
  }


  class CFRecipes {
    static readonly FURNI_CRAFTING_RECIPE_TYPE: RecipeType;
    static readonly FURNI_CRAFTING_SERIALIZER: RecipeSerializer;
    static register(): void;
  }


  class CFSoundEvents {
    static readonly FRIDGE_OPEN: Supplier;
    static readonly FRIDGE_CLOSE: Supplier;
    static init(): void;
    static register(name: string): Supplier<SoundEvent>;
  }

}

declare module 'com.lunazstudios.cobblefurnies.registry.CFBlocks' {
  import { Properties as blockbehaviour_Properties } from 'BlockBehaviour';

  class Properties {
    static GRASS: blockbehaviour_Properties;
    static WOOD: blockbehaviour_Properties;
    static NETHER_WOOD: blockbehaviour_Properties;
    static BAMBOO_WOOD: blockbehaviour_Properties;
    static CHERRY_WOOD: blockbehaviour_Properties;
    static WOOL: blockbehaviour_Properties;
    static MARBLE: blockbehaviour_Properties;
    static CONCRETE: blockbehaviour_Properties;
    static readonly LAMP: blockbehaviour_Properties;
  }

}

declare module 'com.lunazstudios.cobblefurnies.util.block' {
  import { VoxelShape } from 'net.minecraft.world.phys.shapes';
  import { Direction } from 'net.minecraft.core';
  import { Vec3 } from 'net.minecraft.world.phys';

  class ShapeUtil {
    static rotateShape(source: VoxelShape, direction: Direction): VoxelShape;
    static rotateVec3(vec: Vec3, dir: Direction): Vec3;
  }

}

declare module 'com.lunazstudios.cobblefurnies.util.item' {
  import { Enum } from 'java.lang';
  import { Item } from 'net.minecraft.world.item';
  import { List } from 'java.util';

  interface PotColor extends Enum<PotColor> {}
  class PotColor extends Enum<PotColor> {
    static readonly RED: PotColor;
    static readonly YELLOW: PotColor;
    static readonly WHITE: PotColor;
    static readonly PINK: PotColor;
    static readonly GREEN: PotColor;
    static readonly BLUE: PotColor;
    static readonly BLACK: PotColor;
    static fromItem(item: Item): PotColor;
    get item(): Item;
    get serializedName(): string;
    static valueOf(name: string): PotColor;
    static values(): PotColor[];
  }

}