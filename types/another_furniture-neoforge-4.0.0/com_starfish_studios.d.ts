declare module 'com.starfish_studios.another_furniture' {
  import { Logger } from 'org.slf4j';
  import { ResourceLocation } from 'net.minecraft.resources';

  class AnotherFurniture {
    static readonly MOD_ID: string;
    static readonly LOGGER: Logger;
    static init(): void;
    static res(name: string): ResourceLocation;
  }

}

declare module 'com.starfish_studios.another_furniture.block' {
  import { SimpleWaterloggedBlock, Rotation, Mirror, Block, BaseEntityBlock, RenderShape } from 'net.minecraft.world.level.block';
  import { HammerableBlock, TuckableBlock } from 'com.starfish_studios.another_furniture.util.block';
  import { DirectionProperty, EnumProperty, BooleanProperty, IntegerProperty } from 'net.minecraft.world.level.block.state.properties';
  import { Properties } from 'BlockBehaviour';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { Level, BlockGetter, LevelAccessor, LevelReader } from 'net.minecraft.world.level';
  import { Entity, LivingEntity } from 'net.minecraft.world.entity';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { ItemStack, DyeColor } from 'net.minecraft.world.item';
  import { MapCodec } from 'com.mojang.serialization';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { RandomSource } from 'net.minecraft.util';
  import { BlockEntity, BlockEntityTicker, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { Optional } from 'java.util';
  import { Player } from 'net.minecraft.world.entity.player';
  import { SeatEntity } from 'com.starfish_studios.another_furniture.entity';
  import { InteractionResult } from 'net.minecraft.world';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { VerticalConnectionType, SofaType } from 'com.starfish_studios.another_furniture.block.properties';

  interface BenchBlock extends SimpleWaterloggedBlock, HammerableBlock, SeatBlock {}
  class BenchBlock extends SimpleWaterloggedBlock {
    static readonly FACING: DirectionProperty;
    static readonly CONNECTION_TYPE: EnumProperty;
    static readonly BACK_TYPE: EnumProperty;
    static readonly BACK: BooleanProperty;
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


  interface ChairBlock extends SimpleWaterloggedBlock, HammerableBlock, TuckableBlock, SeatBlock {}
  class ChairBlock extends SimpleWaterloggedBlock {
    static readonly FACING: DirectionProperty;
    static readonly WATERLOGGED: BooleanProperty;
    static readonly VARIANT: IntegerProperty;
    constructor(defaultBackVariant: number, properties: Properties);
    getFluidState(state: BlockState): FluidState;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    isSittable(state: BlockState): boolean;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    primaryDismountLocation(level: Level, state: BlockState, pos: BlockPos): BlockPos;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    seatHeight(state: BlockState): number;
    setRiderRotation(state: BlockState, entity: Entity): number;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface CurtainBlock extends SimpleWaterloggedBlock, Block {}
  class CurtainBlock extends SimpleWaterloggedBlock {
    static readonly FACING: DirectionProperty;
    static readonly HORIZONTAL_CONNECTION_TYPE: EnumProperty;
    static readonly OPEN: BooleanProperty;
    static readonly POWERED: BooleanProperty;
    static readonly VERTICAL_CONNECTION_TYPE: DirectionProperty;
    static readonly WATERLOGGED: BooleanProperty;
    constructor(properties: Properties);
    getCollisionShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getFluidState(state: BlockState): FluidState;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    setPlacedBy(level: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
    toggleFromTop(state: BlockState, level: Level, pos: BlockPos): void;
    toggleHorizontal(state: BlockState, level: Level, pos: BlockPos, open: boolean, facing: Direction, dir: Direction): void;
    toggleVertical(state: BlockState, level: Level, pos: BlockPos, open: boolean): void;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface DrawerBlock extends BaseEntityBlock {}
  class DrawerBlock extends BaseEntityBlock {
    static readonly CODEC: MapCodec;
    static readonly FACING: DirectionProperty;
    static readonly OPEN: BooleanProperty;
    constructor(properties: Properties);
    codec(): MapCodec<DrawerBlock>;
    getAnalogOutputSignal(state: BlockState, level: Level, pos: BlockPos): number;
    getRenderShape(state: BlockState): RenderShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    hasAnalogOutputSignal(state: BlockState): boolean;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    tick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
  }


  interface FlowerBoxBlock extends BaseEntityBlock {}
  class FlowerBoxBlock extends BaseEntityBlock {
    static readonly CODEC: MapCodec;
    static readonly FACING: DirectionProperty;
    static readonly TYPE: EnumProperty;
    static readonly ATTACHED: BooleanProperty;
    constructor(properties: Properties);
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    codec(): MapCodec<FlowerBoxBlock>;
    getRenderShape(state: BlockState): RenderShape;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface LampBlock extends SimpleWaterloggedBlock, Block {}
  class LampBlock extends SimpleWaterloggedBlock {
    static readonly WATERLOGGED: BooleanProperty;
    static readonly LIT: BooleanProperty;
    static readonly POWERED: BooleanProperty;
    static readonly FACING: DirectionProperty;
    static readonly LEVEL: IntegerProperty;
    static readonly BASE: BooleanProperty;
    constructor(color: DyeColor, properties: Properties);
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    get color(): DyeColor;
    getFluidState(state: BlockState): FluidState;
    static getLampConnectorByColor(color: DyeColor): Block;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    neighborChanged(state: BlockState, level: Level, pos: BlockPos, block: Block, fromPos: BlockPos, isMoving: boolean): void;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface LampConnectorBlock extends SimpleWaterloggedBlock, Block {}
  class LampConnectorBlock extends SimpleWaterloggedBlock {
    static readonly WATERLOGGED: BooleanProperty;
    static readonly POWERED: BooleanProperty;
    static readonly BASE: BooleanProperty;
    constructor(color: DyeColor, properties: Properties);
    get color(): DyeColor;
    getFluidState(state: BlockState): FluidState;
    static getLampByColor(color: DyeColor): Block;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    neighborChanged(state: BlockState, level: Level, pos: BlockPos, block: Block, fromPos: BlockPos, isMoving: boolean): void;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
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


  interface ServiceBellBlock extends SimpleWaterloggedBlock, BaseEntityBlock {}
  class ServiceBellBlock extends SimpleWaterloggedBlock {
    static readonly CODEC: MapCodec;
    static readonly WATERLOGGED: BooleanProperty;
    static readonly POWERED: BooleanProperty;
    constructor(properties: Properties);
    codec(): MapCodec<ServiceBellBlock>;
    getDirectSignal(state: BlockState, level: BlockGetter, pos: BlockPos, direction: Direction): number;
    getFluidState(state: BlockState): FluidState;
    getRenderShape(state: BlockState): RenderShape;
    getShape(state: BlockState, blockGetter: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getSignal(state: BlockState, level: BlockGetter, pos: BlockPos, direction: Direction): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    getTicker<T extends BlockEntity>(level: Level, state: BlockState, blockEntityType: BlockEntityType<T>): BlockEntityTicker<T>;
    isSignalSource(state: BlockState): boolean;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    press(state: BlockState, level: Level, pos: BlockPos): void;
    tick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
  }


  interface ShelfBlock extends SimpleWaterloggedBlock, BaseEntityBlock {}
  class ShelfBlock extends SimpleWaterloggedBlock {
    static readonly CODEC: MapCodec;
    static readonly TYPE: EnumProperty;
    static readonly FACING: DirectionProperty;
    static readonly WATERLOGGED: BooleanProperty;
    constructor(properties: Properties);
    codec(): MapCodec<ShelfBlock>;
    getFluidState(state: BlockState): FluidState;
    getRenderShape(state: BlockState): RenderShape;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
    useShapeForLightOcclusion(state: BlockState): boolean;
  }


  interface ShutterBlock extends SimpleWaterloggedBlock, HammerableBlock, Block {}
  class ShutterBlock extends SimpleWaterloggedBlock {
    static readonly FACING: DirectionProperty;
    static readonly VERTICAL: EnumProperty;
    static readonly OPEN: BooleanProperty;
    static readonly HINGE: EnumProperty;
    static readonly POWERED: BooleanProperty;
    static readonly WATERLOGGED: BooleanProperty;
    static readonly VARIANT: IntegerProperty;
    constructor(defaultVariant: number, properties: Properties);
    getFluidState(state: BlockState): FluidState;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    getType(state: BlockState, above: BlockState, below: BlockState): VerticalConnectionType;
    isConnected(state: BlockState, other: BlockState): boolean;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    neighborChanged(state: BlockState, level: Level, pos: BlockPos, block: Block, fromPos: BlockPos, isMoving: boolean): void;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    static shutterSound(open: boolean): SoundEvent;
    toggleShutters(state: BlockState, level: Level, pos: BlockPos, player: Player): InteractionResult;
    toggleShutters(state: BlockState, level: Level, pos: BlockPos, open: boolean): void;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface SmallShelfBlock extends SimpleWaterloggedBlock, BaseEntityBlock {}
  class SmallShelfBlock extends SimpleWaterloggedBlock {
    static readonly CODEC: MapCodec;
    static readonly TYPE: EnumProperty;
    static readonly HALF: EnumProperty;
    static readonly FACING: DirectionProperty;
    static readonly WATERLOGGED: BooleanProperty;
    constructor(properties: Properties);
    canBeReplaced(state: BlockState, useContext: BlockPlaceContext): boolean;
    codec(): MapCodec<SmallShelfBlock>;
    getRenderShape(state: BlockState): RenderShape;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface SofaBlock extends SimpleWaterloggedBlock, SeatBlock {}
  class SofaBlock extends SimpleWaterloggedBlock {
    static readonly FACING: DirectionProperty;
    static readonly WATERLOGGED: BooleanProperty;
    static readonly TYPE: EnumProperty;
    static readonly SEAT_BASE: VoxelShape;
    static readonly SEAT_BACK_SINGLE: VoxelShape;
    static readonly SEAT_BACK_MIDDLE: VoxelShape;
    static readonly SEAT_BACK_LEFT: VoxelShape;
    static readonly SEAT_BACK_RIGHT: VoxelShape;
    static readonly LEG_BL: VoxelShape;
    static readonly LEG_BR: VoxelShape;
    static readonly LEG_FR: VoxelShape;
    static readonly LEG_FL: VoxelShape;
    static readonly ARM_L: VoxelShape;
    static readonly ARM_R: VoxelShape;
    static readonly SINGLE: VoxelShape;
    static readonly SINGLE_EAST: VoxelShape;
    static readonly SINGLE_SOUTH: VoxelShape;
    static readonly SINGLE_WEST: VoxelShape;
    static readonly MIDDLE: VoxelShape;
    static readonly MIDDLE_EAST: VoxelShape;
    static readonly MIDDLE_SOUTH: VoxelShape;
    static readonly MIDDLE_WEST: VoxelShape;
    static readonly OUTER: VoxelShape;
    static readonly OUTER_EAST: VoxelShape;
    static readonly OUTER_SOUTH: VoxelShape;
    static readonly OUTER_WEST: VoxelShape;
    static readonly INNER: VoxelShape;
    static readonly INNER_EAST: VoxelShape;
    static readonly INNER_SOUTH: VoxelShape;
    static readonly INNER_WEST: VoxelShape;
    static readonly RIGHT: VoxelShape;
    static readonly RIGHT_EAST: VoxelShape;
    static readonly RIGHT_SOUTH: VoxelShape;
    static readonly RIGHT_WEST: VoxelShape;
    static readonly LEFT: VoxelShape;
    static readonly LEFT_EAST: VoxelShape;
    static readonly LEFT_SOUTH: VoxelShape;
    static readonly LEFT_WEST: VoxelShape;
    constructor(properties: Properties);
    static canConnect(level: Level, pos: BlockPos, direction: Direction): boolean;
    static getConnection(state: BlockState, level: Level, pos: BlockPos): SofaType;
    getFluidState(state: BlockState): FluidState;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    static isDifferentOrientation(state: BlockState, level: Level, pos: BlockPos, dir: Direction): boolean;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    primaryDismountLocation(level: Level, state: BlockState, pos: BlockPos): BlockPos;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    seatHeight(state: BlockState): number;
    setRiderRotation(state: BlockState, entity: Entity): number;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface StoolBlock extends SimpleWaterloggedBlock, HammerableBlock, SeatBlock {}
  class StoolBlock extends SimpleWaterloggedBlock {
    static readonly LOW: BooleanProperty;
    static readonly WATERLOGGED: BooleanProperty;
    constructor(properties: Properties);
    fallOn(level: Level, state: BlockState, pos: BlockPos, entity: Entity, dmg: number): void;
    getFluidState(state: BlockState): FluidState;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    seatHeight(state: BlockState): number;
    updateEntityAfterFallOn(reader: BlockGetter, entity: Entity): void;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface TableBlock extends SimpleWaterloggedBlock, Block {}
  class TableBlock extends SimpleWaterloggedBlock {
    static readonly FACING: DirectionProperty;
    static readonly LEG1: BooleanProperty;
    static readonly LEG2: BooleanProperty;
    static readonly LEG3: BooleanProperty;
    static readonly LEG4: BooleanProperty;
    static readonly WATERLOGGED: BooleanProperty;
    static readonly UPDATE: BooleanProperty;
    constructor(properties: Properties);
    getConnections(state: BlockState, level: LevelAccessor, pos: BlockPos): BlockState;
    getFluidState(state: BlockState): FluidState;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
    validConnection(state: BlockState): boolean;
  }


  interface TallStoolBlock extends SimpleWaterloggedBlock, SeatBlock {}
  class TallStoolBlock extends SimpleWaterloggedBlock {
    static readonly WATERLOGGED: BooleanProperty;
    constructor(properties: Properties);
    fallOn(level: Level, state: BlockState, pos: BlockPos, entity: Entity, dmg: number): void;
    getFluidState(state: BlockState): FluidState;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    seatHeight(state: BlockState): number;
    updateEntityAfterFallOn(reader: BlockGetter, entity: Entity): void;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
  }

}

declare module 'com.starfish_studios.another_furniture.block.entity' {
  import { RandomizableContainerBlockEntity, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockPos, NonNullList } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Clearable } from 'net.minecraft.world';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { Provider } from 'HolderLookup';
  import { ClientboundBlockEntityDataPacket } from 'net.minecraft.network.protocol.game';
  import { Level } from 'net.minecraft.world.level';

  interface DrawerBlockEntity extends RandomizableContainerBlockEntity {}
  class DrawerBlockEntity extends RandomizableContainerBlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
    get containerSize(): number;
    load(tag: CompoundTag): void;
    recheckOpen(): void;
    startOpen(player: Player): void;
    stopOpen(player: Player): void;
  }


  interface FlowerBoxBlockEntity extends Clearable, BlockEntity {}
  class FlowerBoxBlockEntity extends Clearable {
    constructor(blockPos: BlockPos, blockState: BlockState);
    clearContent(): void;
    get items(): NonNullList<ItemStack>;
    get updatePacket(): ClientboundBlockEntityDataPacket;
    getItemFromSlot(slot: number): Item;
    getUpdateTag(registries: Provider): CompoundTag;
    loadAdditional(tag: CompoundTag, registries: Provider): void;
    placeFlower(stack: ItemStack, slot: number): boolean;
    removeAllItems(): void;
  }


  interface ServiceBellBlockEntity extends BlockEntity {}
  class ServiceBellBlockEntity extends BlockEntity {
    ticks: number;
    pressed: boolean;
    constructor(blockPos: BlockPos, blockState: BlockState);
    static clientTick(level: Level, pos: BlockPos, state: BlockState, blockEntity: ServiceBellBlockEntity): void;
    onHit(): void;
  }


  interface ShelfBlockEntity extends Clearable, BlockEntity {}
  class ShelfBlockEntity extends Clearable {
    constructor(blockPos: BlockPos, blockState: BlockState);
    clearContent(): void;
    get items(): NonNullList<ItemStack>;
    get updatePacket(): ClientboundBlockEntityDataPacket;
    getUpdateTag(registries: Provider): CompoundTag;
    loadAdditional(tag: CompoundTag, registries: Provider): void;
    placeItem(stack: ItemStack, position: number): boolean;
    removeAllItems(): void;
    removeItem(index: number, player: Player, level: Level): boolean;
  }

}

declare module 'com.starfish_studios.another_furniture.block.properties' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { EnumProperty, DirectionProperty, IntegerProperty, BooleanProperty } from 'net.minecraft.world.level.block.state.properties';

  interface HorizontalConnectionType extends Enum<HorizontalConnectionType> {}
  class HorizontalConnectionType extends Enum<HorizontalConnectionType> {
    static readonly SINGLE: HorizontalConnectionType;
    static readonly LEFT: HorizontalConnectionType;
    static readonly MIDDLE: HorizontalConnectionType;
    static readonly RIGHT: HorizontalConnectionType;
    get serializedName(): string;
    toString(): string;
    static valueOf(name: string): HorizontalConnectionType;
    static values(): HorizontalConnectionType[];
  }


  class ModBlockStateProperties {
    static readonly HORIZONTAL_CONNECTION_TYPE: EnumProperty;
    static readonly HORIZONTAL_CONNECTION_TYPE_1: EnumProperty;
    static readonly HORIZONTAL_CONNECTION_TYPE_2: EnumProperty;
    static readonly VERTICAL_CONNECTION_TYPE: EnumProperty;
    static readonly SOFA_TYPE: EnumProperty;
    static readonly VERTICAL_CONNECTION_NO_SINGLE_TYPE: EnumProperty;
    static readonly HALF: EnumProperty;
    static readonly FACING_EXCEPT_DOWN: DirectionProperty;
    static readonly VERTICAL_CONNECTION_TYPE_UP_DOWN: DirectionProperty;
    static readonly LEVEL_1_3: IntegerProperty;
    static readonly VARIANT: IntegerProperty;
    static readonly BACK: BooleanProperty;
    static readonly BASE: BooleanProperty;
    static readonly LOW: BooleanProperty;
    static readonly TUCKED: BooleanProperty;
    static readonly LEG_1: BooleanProperty;
    static readonly LEG_2: BooleanProperty;
    static readonly LEG_3: BooleanProperty;
    static readonly LEG_4: BooleanProperty;
    static readonly UPDATE: BooleanProperty;
    static readonly ON: BooleanProperty;
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


  interface VerticalConnectionType extends Enum<VerticalConnectionType> {}
  class VerticalConnectionType extends Enum<VerticalConnectionType> {
    static readonly SINGLE: VerticalConnectionType;
    static readonly BOTTOM: VerticalConnectionType;
    static readonly MIDDLE: VerticalConnectionType;
    static readonly TOP: VerticalConnectionType;
    get serializedName(): string;
    isConnectedDown(): boolean;
    isConnectedUp(): boolean;
    toString(): string;
    static valueOf(name: string): VerticalConnectionType;
    static values(): VerticalConnectionType[];
  }

}

declare module 'com.starfish_studios.another_furniture.client' {
  class AnotherFurnitureClient {
    static init(): void;
  }

}

declare module 'com.starfish_studios.another_furniture.client.renderer.blockentity' {
  import { BlockEntityRenderer } from 'net.minecraft.client.renderer.blockentity';
  import { FlowerBoxBlockEntity, ServiceBellBlockEntity, ShelfBlockEntity } from 'com.starfish_studios.another_furniture.block.entity';
  import { Context } from 'BlockEntityRendererProvider';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { Material } from 'net.minecraft.client.resources.model';
  import { ModelLayerLocation } from 'net.minecraft.client.model.geom';
  import { LayerDefinition } from 'net.minecraft.client.model.geom.builders';

  interface FlowerBoxRenderer extends BlockEntityRenderer<FlowerBoxBlockEntity> {}
  class FlowerBoxRenderer extends BlockEntityRenderer<FlowerBoxBlockEntity> {
    constructor(context: Context);
    render(blockEntity: FlowerBoxBlockEntity, partialTick: number, poseStack: PoseStack, bufferSource: MultiBufferSource, packedLight: number, packedOverlay: number): void;
  }


  interface ServiceBellButtonRenderer extends BlockEntityRenderer<ServiceBellBlockEntity> {}
  class ServiceBellButtonRenderer extends BlockEntityRenderer<ServiceBellBlockEntity> {
    static readonly BELL_TEXTURE: Material;
    static SERVICE_BELL_MODEL: ModelLayerLocation;
    constructor(context: Context);
    static createBodyLayer(): LayerDefinition;
    render(blockEntity: ServiceBellBlockEntity, partialTick: number, poseStack: PoseStack, bufferSource: MultiBufferSource, packedLight: number, packedOverlay: number): void;
  }


  interface ShelfRenderer extends BlockEntityRenderer<ShelfBlockEntity> {}
  class ShelfRenderer extends BlockEntityRenderer<ShelfBlockEntity> {
    constructor(context: Context);
    getAmount(count: number): number;
    render(blockEntity: ShelfBlockEntity, partialTick: number, poseStack: PoseStack, bufferSource: MultiBufferSource, packedLight: number, packedOverlay: number): void;
  }


  interface SmallShelfRenderer extends BlockEntityRenderer<ShelfBlockEntity> {}
  class SmallShelfRenderer extends BlockEntityRenderer<ShelfBlockEntity> {
    constructor(context: Context);
    getAmount(count: number): number;
    render(blockEntity: ShelfBlockEntity, partialTick: number, poseStack: PoseStack, bufferSource: MultiBufferSource, packedLight: number, packedOverlay: number): void;
  }

}

declare module 'com.starfish_studios.another_furniture.client.renderer.entity' {
  import { EntityRenderer } from 'net.minecraft.client.renderer.entity';
  import { SeatEntity } from 'com.starfish_studios.another_furniture.entity';
  import { Context } from 'EntityRendererProvider';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface SeatRenderer extends EntityRenderer<SeatEntity> {}
  class SeatRenderer extends EntityRenderer<SeatEntity> {
    constructor(context: Context);
    getTextureLocation(seatEntity: SeatEntity): ResourceLocation;
  }

}

declare module 'com.starfish_studios.another_furniture.entity' {
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

declare module 'com.starfish_studios.another_furniture.event' {
  import { InteractionResult, InteractionHand } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Level } from 'net.minecraft.world.level';
  import { BlockHitResult } from 'net.minecraft.world.phys';

  class BlockInteractionEvent {
    static tryUseShutter(player: Player, level: Level, hand: InteractionHand, hit: BlockHitResult): InteractionResult;
    static use(player: Player, level: Level, hand: InteractionHand, hit: BlockHitResult): InteractionResult;
  }

}

declare module 'com.starfish_studios.another_furniture.integration.common.create' {
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Direction } from 'net.minecraft.core';

  class CreateCommon {
    static canStickToContraption(state: BlockState, direction: Direction): boolean;
  }

}

declare module 'com.starfish_studios.another_furniture.integration' {
  class IntegrationHandler {
    static init(): void;
  }

}

declare module 'com.starfish_studios.another_furniture.integration.neoforge.create' {
  class CreateCompat {
    static setup(): void;
  }

}

declare module 'com.starfish_studios.another_furniture.item' {
  import { Item } from 'net.minecraft.world.item';
  import { Properties } from 'Item';

  interface HammerItem extends Item {}
  class HammerItem extends Item {
    constructor(properties: Properties);
  }

}

declare module 'com.starfish_studios.another_furniture.mixin' {
  class BlockMixin {
  }

}

declare module 'com.starfish_studios.another_furniture.mixin.neoforge' {
  import { Map, Set, List } from 'java.util';
  import { Item } from 'net.minecraft.world.item';
  import { Integer } from 'java.lang';
  import { TagKey } from 'net.minecraft.tags';
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { ClassNode } from 'org.objectweb.asm.tree';
  import { Block } from 'net.minecraft.world.level.block';

  class AbstractFurnaceBlockEntityAccessor {
    static invokeAdd(map: Map<Item, number>, itemTag: TagKey<Item>, burnTime: number): void;
    static invokeNotFurnaceFuel(item: Item): boolean;
  }


  interface ConditionalMixinPlugin extends IMixinConfigPlugin {}
  class ConditionalMixinPlugin extends IMixinConfigPlugin {
    acceptTargets(myTargets: Set<string>, otherTargets: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    onLoad(mixinPackage: string): void;
    postApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    preApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    shouldApplyMixin(targetClassName: string, mixinClassName: string): boolean;
  }


  class FireBlockAccessor {
    invokeSetFlammable(var1: Block, var2: number, var3: number): void;
  }

}

declare module 'com.starfish_studios.another_furniture.neoforge' {
  import { IEventBus } from 'net.neoforged.bus.api';
  import { FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';
  import { RegisterLayerDefinitions } from 'EntityRenderersEvent';

  class AnotherFurnitureNeoForge {
    constructor(bus: IEventBus);
  }


  class AnotherFurnitureNeoForgeClient {
    static init(event: FMLClientSetupEvent): void;
    static registerLayerDefinitions(event: RegisterLayerDefinitions): void;
  }

}

declare module 'com.starfish_studios.another_furniture.registry' {
  import { Supplier } from 'java.util.function';
  import { Block } from 'net.minecraft.world.level.block';
  import { TagKey } from 'net.minecraft.tags';
  import { SoundEvent } from 'net.minecraft.sounds';

  class AFBlockEntityTypes {
    static readonly SHELF: Supplier;
    static readonly SERVICE_BELL: Supplier;
    static readonly FLOWER_BOX: Supplier;
    static readonly DRAWER: Supplier;
    static init(): void;
  }


  class AFBlocks {
    static readonly OAK_CHAIR: Supplier;
    static readonly SPRUCE_CHAIR: Supplier;
    static readonly BIRCH_CHAIR: Supplier;
    static readonly JUNGLE_CHAIR: Supplier;
    static readonly ACACIA_CHAIR: Supplier;
    static readonly DARK_OAK_CHAIR: Supplier;
    static readonly MANGROVE_CHAIR: Supplier;
    static readonly CHERRY_CHAIR: Supplier;
    static readonly BAMBOO_CHAIR: Supplier;
    static readonly CRIMSON_CHAIR: Supplier;
    static readonly WARPED_CHAIR: Supplier;
    static readonly OAK_SHELF: Supplier;
    static readonly SPRUCE_SHELF: Supplier;
    static readonly BIRCH_SHELF: Supplier;
    static readonly JUNGLE_SHELF: Supplier;
    static readonly ACACIA_SHELF: Supplier;
    static readonly DARK_OAK_SHELF: Supplier;
    static readonly MANGROVE_SHELF: Supplier;
    static readonly CHERRY_SHELF: Supplier;
    static readonly BAMBOO_SHELF: Supplier;
    static readonly CRIMSON_SHELF: Supplier;
    static readonly WARPED_SHELF: Supplier;
    static readonly OAK_TABLE: Supplier;
    static readonly SPRUCE_TABLE: Supplier;
    static readonly BIRCH_TABLE: Supplier;
    static readonly JUNGLE_TABLE: Supplier;
    static readonly ACACIA_TABLE: Supplier;
    static readonly DARK_OAK_TABLE: Supplier;
    static readonly MANGROVE_TABLE: Supplier;
    static readonly CHERRY_TABLE: Supplier;
    static readonly BAMBOO_TABLE: Supplier;
    static readonly CRIMSON_TABLE: Supplier;
    static readonly WARPED_TABLE: Supplier;
    static readonly WHITE_STOOL: Supplier;
    static readonly ORANGE_STOOL: Supplier;
    static readonly MAGENTA_STOOL: Supplier;
    static readonly LIGHT_BLUE_STOOL: Supplier;
    static readonly YELLOW_STOOL: Supplier;
    static readonly LIME_STOOL: Supplier;
    static readonly PINK_STOOL: Supplier;
    static readonly GRAY_STOOL: Supplier;
    static readonly LIGHT_GRAY_STOOL: Supplier;
    static readonly CYAN_STOOL: Supplier;
    static readonly PURPLE_STOOL: Supplier;
    static readonly BLUE_STOOL: Supplier;
    static readonly BROWN_STOOL: Supplier;
    static readonly GREEN_STOOL: Supplier;
    static readonly RED_STOOL: Supplier;
    static readonly BLACK_STOOL: Supplier;
    static readonly OAK_SHUTTER: Supplier;
    static readonly SPRUCE_SHUTTER: Supplier;
    static readonly BIRCH_SHUTTER: Supplier;
    static readonly JUNGLE_SHUTTER: Supplier;
    static readonly ACACIA_SHUTTER: Supplier;
    static readonly DARK_OAK_SHUTTER: Supplier;
    static readonly MANGROVE_SHUTTER: Supplier;
    static readonly CHERRY_SHUTTER: Supplier;
    static readonly BAMBOO_SHUTTER: Supplier;
    static readonly CRIMSON_SHUTTER: Supplier;
    static readonly WARPED_SHUTTER: Supplier;
    static readonly OAK_FLOWER_BOX: Supplier;
    static readonly SPRUCE_FLOWER_BOX: Supplier;
    static readonly BIRCH_FLOWER_BOX: Supplier;
    static readonly JUNGLE_FLOWER_BOX: Supplier;
    static readonly ACACIA_FLOWER_BOX: Supplier;
    static readonly DARK_OAK_FLOWER_BOX: Supplier;
    static readonly MANGROVE_FLOWER_BOX: Supplier;
    static readonly CHERRY_FLOWER_BOX: Supplier;
    static readonly BAMBOO_FLOWER_BOX: Supplier;
    static readonly CRIMSON_FLOWER_BOX: Supplier;
    static readonly WARPED_FLOWER_BOX: Supplier;
    static readonly WHITE_CURTAIN: Supplier;
    static readonly ORANGE_CURTAIN: Supplier;
    static readonly MAGENTA_CURTAIN: Supplier;
    static readonly LIGHT_BLUE_CURTAIN: Supplier;
    static readonly YELLOW_CURTAIN: Supplier;
    static readonly LIME_CURTAIN: Supplier;
    static readonly PINK_CURTAIN: Supplier;
    static readonly GRAY_CURTAIN: Supplier;
    static readonly LIGHT_GRAY_CURTAIN: Supplier;
    static readonly CYAN_CURTAIN: Supplier;
    static readonly PURPLE_CURTAIN: Supplier;
    static readonly BLUE_CURTAIN: Supplier;
    static readonly BROWN_CURTAIN: Supplier;
    static readonly GREEN_CURTAIN: Supplier;
    static readonly RED_CURTAIN: Supplier;
    static readonly BLACK_CURTAIN: Supplier;
    static readonly SERVICE_BELL: Supplier;
    static readonly OAK_BENCH: Supplier;
    static readonly SPRUCE_BENCH: Supplier;
    static readonly BIRCH_BENCH: Supplier;
    static readonly JUNGLE_BENCH: Supplier;
    static readonly ACACIA_BENCH: Supplier;
    static readonly DARK_OAK_BENCH: Supplier;
    static readonly MANGROVE_BENCH: Supplier;
    static readonly CHERRY_BENCH: Supplier;
    static readonly BAMBOO_BENCH: Supplier;
    static readonly CRIMSON_BENCH: Supplier;
    static readonly WARPED_BENCH: Supplier;
    static readonly OAK_DRAWER: Supplier;
    static readonly SPRUCE_DRAWER: Supplier;
    static readonly BIRCH_DRAWER: Supplier;
    static readonly JUNGLE_DRAWER: Supplier;
    static readonly ACACIA_DRAWER: Supplier;
    static readonly DARK_OAK_DRAWER: Supplier;
    static readonly MANGROVE_DRAWER: Supplier;
    static readonly CHERRY_DRAWER: Supplier;
    static readonly BAMBOO_DRAWER: Supplier;
    static readonly CRIMSON_DRAWER: Supplier;
    static readonly WARPED_DRAWER: Supplier;
    static readonly WHITE_LAMP: Supplier;
    static readonly ORANGE_LAMP: Supplier;
    static readonly MAGENTA_LAMP: Supplier;
    static readonly LIGHT_BLUE_LAMP: Supplier;
    static readonly YELLOW_LAMP: Supplier;
    static readonly LIME_LAMP: Supplier;
    static readonly PINK_LAMP: Supplier;
    static readonly GRAY_LAMP: Supplier;
    static readonly LIGHT_GRAY_LAMP: Supplier;
    static readonly CYAN_LAMP: Supplier;
    static readonly PURPLE_LAMP: Supplier;
    static readonly BLUE_LAMP: Supplier;
    static readonly BROWN_LAMP: Supplier;
    static readonly GREEN_LAMP: Supplier;
    static readonly RED_LAMP: Supplier;
    static readonly BLACK_LAMP: Supplier;
    static readonly WHITE_LAMP_CONNECTOR: Supplier;
    static readonly ORANGE_LAMP_CONNECTOR: Supplier;
    static readonly MAGENTA_LAMP_CONNECTOR: Supplier;
    static readonly LIGHT_BLUE_LAMP_CONNECTOR: Supplier;
    static readonly YELLOW_LAMP_CONNECTOR: Supplier;
    static readonly LIME_LAMP_CONNECTOR: Supplier;
    static readonly PINK_LAMP_CONNECTOR: Supplier;
    static readonly GRAY_LAMP_CONNECTOR: Supplier;
    static readonly LIGHT_GRAY_LAMP_CONNECTOR: Supplier;
    static readonly CYAN_LAMP_CONNECTOR: Supplier;
    static readonly PURPLE_LAMP_CONNECTOR: Supplier;
    static readonly BLUE_LAMP_CONNECTOR: Supplier;
    static readonly BROWN_LAMP_CONNECTOR: Supplier;
    static readonly GREEN_LAMP_CONNECTOR: Supplier;
    static readonly RED_LAMP_CONNECTOR: Supplier;
    static readonly BLACK_LAMP_CONNECTOR: Supplier;
    static readonly WHITE_SOFA: Supplier;
    static readonly ORANGE_SOFA: Supplier;
    static readonly MAGENTA_SOFA: Supplier;
    static readonly LIGHT_BLUE_SOFA: Supplier;
    static readonly YELLOW_SOFA: Supplier;
    static readonly LIME_SOFA: Supplier;
    static readonly PINK_SOFA: Supplier;
    static readonly GRAY_SOFA: Supplier;
    static readonly LIGHT_GRAY_SOFA: Supplier;
    static readonly CYAN_SOFA: Supplier;
    static readonly PURPLE_SOFA: Supplier;
    static readonly BLUE_SOFA: Supplier;
    static readonly BROWN_SOFA: Supplier;
    static readonly GREEN_SOFA: Supplier;
    static readonly RED_SOFA: Supplier;
    static readonly BLACK_SOFA: Supplier;
    static readonly WHITE_TALL_STOOL: Supplier;
    static readonly ORANGE_TALL_STOOL: Supplier;
    static readonly MAGENTA_TALL_STOOL: Supplier;
    static readonly LIGHT_BLUE_TALL_STOOL: Supplier;
    static readonly YELLOW_TALL_STOOL: Supplier;
    static readonly LIME_TALL_STOOL: Supplier;
    static readonly PINK_TALL_STOOL: Supplier;
    static readonly GRAY_TALL_STOOL: Supplier;
    static readonly LIGHT_GRAY_TALL_STOOL: Supplier;
    static readonly CYAN_TALL_STOOL: Supplier;
    static readonly PURPLE_TALL_STOOL: Supplier;
    static readonly BLUE_TALL_STOOL: Supplier;
    static readonly BROWN_TALL_STOOL: Supplier;
    static readonly GREEN_TALL_STOOL: Supplier;
    static readonly RED_TALL_STOOL: Supplier;
    static readonly BLACK_TALL_STOOL: Supplier;
    static init(): void;
    static registerBlock<T extends Block>(name: string, block: Supplier<T>): Supplier<T>;
    static registerBlockHidden<T extends Block>(name: string, block: Supplier<T>): Supplier<T>;
    static registerBlockOnly<T extends Block>(name: string, block: Supplier<T>): Supplier<T>;
    static registerFlammables(): void;
  }


  class AFBlockTags {
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
    static readonly TALL_STOOLS: TagKey;
    static readonly CHAIRS_TUCKABLE_UNDER: TagKey;
    static readonly ABOVE_BYPASSES_SEAT_CHECK: TagKey;
    static readonly TABLES_CONNECTABLE: TagKey;
    static readonly DONT_CONNECT_TO_PANES: TagKey;
    static readonly CAN_USE_SHUTTERS_THROUGH: TagKey;
    static init(): void;
  }


  class AFEntityTypes {
    static readonly SEAT: Supplier;
    static init(): void;
  }


  class AFEntityTypeTags {
    static readonly CAN_SIT_IN_SEATS: TagKey;
    static init(): void;
  }


  class AFItems {
    static readonly FURNITURE_HAMMER: Supplier;
    static init(): void;
  }


  class AFItemTags {
    static readonly BENCHES: TagKey;
    static readonly CHAIRS: TagKey;
    static readonly CURTAINS: TagKey;
    static readonly DRAWERS: TagKey;
    static readonly GRANDFATHER_CLOCKS: TagKey;
    static readonly LAMPS: TagKey;
    static readonly PLANTER_BOXES: TagKey;
    static readonly SHELVES: TagKey;
    static readonly SHUTTERS: TagKey;
    static readonly SOFAS: TagKey;
    static readonly STOOLS: TagKey;
    static readonly TABLES: TagKey;
    static readonly TALL_STOOLS: TagKey;
    static readonly FLOWER_BOX_PLACEABLES: TagKey;
    static readonly FLOWER_BOX_BANNED: TagKey;
    static readonly FURNITURE_HAMMER: TagKey;
    static init(): void;
  }


  class AFSoundEvents {
    static readonly SERVICE_BELL: Supplier;
    static readonly CHAIR_TUCK: Supplier;
    static readonly CHAIR_UNTUCK: Supplier;
    static readonly CURTAIN: Supplier;
    static readonly HAMMER_USE: Supplier;
    static init(): void;
    static register(name: string): Supplier<SoundEvent>;
  }

}

declare module 'com.starfish_studios.another_furniture.registry.AFBlocks' {
  import { Properties as blockbehaviour_Properties } from 'BlockBehaviour';

  class Properties {
    static wood: blockbehaviour_Properties;
    static nether_wood: blockbehaviour_Properties;
    static bamboo_wood: blockbehaviour_Properties;
    static cherry_wood: blockbehaviour_Properties;
    static weak_wood: blockbehaviour_Properties;
    static curtain: blockbehaviour_Properties;
    static service_bell: blockbehaviour_Properties;
    static lamp: blockbehaviour_Properties;
    static tombstone: blockbehaviour_Properties;
    static awning: blockbehaviour_Properties;
  }

}

declare module 'com.starfish_studios.another_furniture.util.block' {
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Property, BooleanProperty } from 'net.minecraft.world.level.block.state.properties';
  import { ItemStack } from 'net.minecraft.world.item';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { LevelAccessor, Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { VoxelShape } from 'net.minecraft.world.phys.shapes';

  class BlockPart {
    static get1D(blockPos: BlockPos, clickedPos: Vec3, axisDir: Direction, parts: number): number;
    static get2D(blockPos: BlockPos, clickedPos: Vec3, axisDir: Direction, axisDir2: Direction, partsX: number, partsY: number): number;
  }


  class HammerableBlock {
    get useSound(): SoundEvent;
    tryHammerBlock(property: Property<any>, stack: ItemStack, state: BlockState, level: LevelAccessor, pos: BlockPos, player: Player): boolean;
    updateAfterCycle(state: BlockState, level: LevelAccessor, pos: BlockPos): BlockState;
  }


  class ShapeUtil {
    static rotateShape(source: VoxelShape, direction: Direction): VoxelShape;
    static rotateVec3(vec: Vec3, dir: Direction): Vec3;
  }


  class TuckableBlock {
    static readonly TUCKED: BooleanProperty;
    static canTuckUnderBlockInfront(state: BlockState, level: Level, pos: BlockPos): boolean;
    static isBlockedFromTucking(state: BlockState, level: Level, pos: BlockPos): boolean;
    static tryTuck(state: BlockState, level: Level, pos: BlockPos, player: Player): boolean;
  }

}