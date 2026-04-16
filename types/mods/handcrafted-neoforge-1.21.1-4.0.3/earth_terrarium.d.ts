declare module 'earth.terrarium.handcrafted.client' {
  import { LayerDefinitionRegistry, BlockRendererRegistry } from 'ClientPlatformUtils';

  class HandcraftedClient {
    static init(): void;
    static onRegisterBlockRenderers(consumer: BlockRendererRegistry): void;
    static onRegisterEntityLayers(consumer: LayerDefinitionRegistry): void;
  }

}

declare module 'earth.terrarium.handcrafted.client.neoforge' {
  import { FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';
  import { RegisterRenderers, RegisterLayerDefinitions } from 'EntityRenderersEvent';
  import { RegistryEntry } from 'com.teamresourceful.resourcefullib.common.registry';
  import { BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockEntityRendererProvider } from 'net.minecraft.client.renderer.blockentity';

  class HandcraftedClientNeoForge {
    static init(): void;
    static onClientSetup(event: FMLClientSetupEvent): void;
    static onRegisterLayerDefinitions(event: RegisterLayerDefinitions): void;
    static onRegisterRenderers(event: RegisterRenderers): void;
    register<T extends BlockEntity>(type: RegistryEntry<BlockEntityType<T>>, factory: BlockEntityRendererProvider<T>): void;
  }

}

declare module 'earth.terrarium.handcrafted.client.renderer' {
  import { BlockEntityRenderer } from 'net.minecraft.client.renderer.blockentity';
  import { CrockeryBlockEntity } from 'earth.terrarium.handcrafted.common.blocks.crockery';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';

  interface CrockeryRenderer extends BlockEntityRenderer<CrockeryBlockEntity> {}
  class CrockeryRenderer extends BlockEntityRenderer<CrockeryBlockEntity> {
    render(entity: CrockeryBlockEntity, partialTick: number, poseStack: PoseStack, bufferSource: MultiBufferSource, packedLight: number, packedOverlay: number): void;
  }

}

declare module 'earth.terrarium.handcrafted.client.renderer.fancypainting' {
  import { ModelLayerLocation } from 'net.minecraft.client.model.geom';
  import { LayerDefinition } from 'net.minecraft.client.model.geom.builders';
  import { LayerDefinitionRegistry } from 'ClientPlatformUtils';
  import { EntityRenderer } from 'net.minecraft.client.renderer.entity';
  import { FancyPainting } from 'earth.terrarium.handcrafted.common.entities';
  import { Context } from 'EntityRendererProvider';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { ResourceLocation } from 'net.minecraft.resources';

  class FancyPaintingModel {
    static readonly LAYER_LOCATION_SMALL: ModelLayerLocation;
    static readonly LAYER_LOCATION_MEDIUM: ModelLayerLocation;
    static readonly LAYER_LOCATION_LARGE: ModelLayerLocation;
    static readonly LAYER_LOCATION_TALL: ModelLayerLocation;
    static readonly LAYER_LOCATION_WIDE: ModelLayerLocation;
    static paintingLargeLayer(): LayerDefinition;
    static paintingMediumLayer(): LayerDefinition;
    static paintingSmallLayer(): LayerDefinition;
    static paintingTallLayer(): LayerDefinition;
    static paintingWideLayer(): LayerDefinition;
    static register(registry: LayerDefinitionRegistry): void;
  }


  interface FancyPaintingRenderer extends EntityRenderer<FancyPainting> {}
  class FancyPaintingRenderer extends EntityRenderer<FancyPainting> {
    constructor(context: Context);
    getTextureLocation(entity: FancyPainting): ResourceLocation;
    render(entity: FancyPainting, entityYaw: number, partialTick: number, poseStack: PoseStack, buffer: MultiBufferSource, packedLight: number): void;
  }

}

declare module 'earth.terrarium.handcrafted.common.blockentities' {
  import { RandomizableContainerBlockEntity, AbstractFurnaceBlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { Player } from 'net.minecraft.world.entity.player';

  interface ContainerBlockEntity extends RandomizableContainerBlockEntity {}
  class ContainerBlockEntity extends RandomizableContainerBlockEntity {
    constructor(pos: BlockPos, state: BlockState);
    get containerSize(): number;
    loadAdditional(tag: CompoundTag, registries: Provider): void;
    startOpen(player: Player): void;
    stopOpen(player: Player): void;
  }


  interface OvenBlockEntity extends AbstractFurnaceBlockEntity {}
  class OvenBlockEntity extends AbstractFurnaceBlockEntity {
    constructor(pos: BlockPos, blockState: BlockState);
  }

}

declare module 'earth.terrarium.handcrafted.common.blocks.base' {
  import { Level, LevelAccessor, BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Vec3, AABB } from 'net.minecraft.world.phys';
  import { HorizontalDirectionalBlock, SimpleWaterloggedBlock, Mirror } from 'net.minecraft.world.level.block';
  import { EnumProperty, BooleanProperty } from 'net.minecraft.world.level.block.state.properties';
  import { Properties } from 'BlockBehaviour';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { ModularSeatProperty } from 'earth.terrarium.handcrafted.common.blocks.base.properties';
  import { FluidState } from 'net.minecraft.world.level.material';

  class Hammerable {
    onHammer(var1: Level, var2: BlockPos, var3: BlockState, var4: Direction, var5: Player, var6: Vec3): void;
  }


  interface ModularSeatBlock extends SittableBlock, SimpleWaterloggedBlock, HorizontalDirectionalBlock {}
  class ModularSeatBlock extends SittableBlock {
    static readonly SHAPE: EnumProperty;
    static readonly WATERLOGGED: BooleanProperty;
    constructor(properties: Properties);
    canTakeShape(state: BlockState, level: BlockGetter, pos: BlockPos, face: Direction): boolean;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos): ModularSeatProperty;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface SimpleBlock extends SimpleWaterloggedBlock, HorizontalDirectionalBlock {}
  class SimpleBlock extends SimpleWaterloggedBlock {
    static readonly WATERLOGGED: BooleanProperty;
    constructor(properties: Properties);
    getFluidState(state: BlockState): FluidState;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, pos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  class SittableBlock {
    getSeatSize(var1: BlockState): AABB;
    sitOn(level: Level, pos: BlockPos, player: Player, dir: Direction): boolean;
  }

}

declare module 'earth.terrarium.handcrafted.common.blocks.base.properties' {
  import { Enum } from 'java.lang';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { List } from 'java.util';

  interface ColorProperty extends Enum<ColorProperty> {}
  class ColorProperty extends Enum<ColorProperty> {
    static readonly WHITE: ColorProperty;
    static readonly ORANGE: ColorProperty;
    static readonly MAGENTA: ColorProperty;
    static readonly LIGHT_BLUE: ColorProperty;
    static readonly YELLOW: ColorProperty;
    static readonly LIME: ColorProperty;
    static readonly PINK: ColorProperty;
    static readonly GRAY: ColorProperty;
    static readonly LIGHT_GRAY: ColorProperty;
    static readonly CYAN: ColorProperty;
    static readonly PURPLE: ColorProperty;
    static readonly BLUE: ColorProperty;
    static readonly BROWN: ColorProperty;
    static readonly GREEN: ColorProperty;
    static readonly RED: ColorProperty;
    static readonly BLACK: ColorProperty;
    static fromCushion(cushion: Item): ColorProperty;
    static fromSheet(sheet: Item): ColorProperty;
    get serializedName(): string;
    toCushion(): ItemStack;
    toSheet(): ItemStack;
    toString(): string;
    static valueOf(name: string): ColorProperty;
    static values(): ColorProperty[];
  }


  interface CounterProperty extends Enum<CounterProperty> {}
  class CounterProperty extends Enum<CounterProperty> {
    static readonly ACACIA_PLANKS: CounterProperty;
    static readonly ANDESITE: CounterProperty;
    static readonly BAMBOO_PLANKS: CounterProperty;
    static readonly BIRCH_PLANKS: CounterProperty;
    static readonly BLACKSTONE: CounterProperty;
    static readonly BRICKS: CounterProperty;
    static readonly CALCITE: CounterProperty;
    static readonly CHERRY_PLANKS: CounterProperty;
    static readonly CRIMSON_PLANKS: CounterProperty;
    static readonly DARK_OAK_PLANKS: CounterProperty;
    static readonly DEEPSLATE: CounterProperty;
    static readonly DIORITE: CounterProperty;
    static readonly DRIPSTONE_BLOCK: CounterProperty;
    static readonly GRANITE: CounterProperty;
    static readonly JUNGLE_PLANKS: CounterProperty;
    static readonly MANGROVE_PLANKS: CounterProperty;
    static readonly OAK_PLANKS: CounterProperty;
    static readonly QUARTZ_BLOCK: CounterProperty;
    static readonly SMOOTH_STONE: CounterProperty;
    static readonly SPRUCE_PLANKS: CounterProperty;
    static readonly WARPED_PLANKS: CounterProperty;
    static fromBlock(block: Item): CounterProperty;
    get serializedName(): string;
    toBlock(): ItemStack;
    toString(): string;
    static valueOf(name: string): CounterProperty;
    static values(): CounterProperty[];
  }


  interface DirectionalBlockProperty extends Enum<DirectionalBlockProperty> {}
  class DirectionalBlockProperty extends Enum<DirectionalBlockProperty> {
    static readonly SINGLE: DirectionalBlockProperty;
    static readonly LEFT: DirectionalBlockProperty;
    static readonly MIDDLE: DirectionalBlockProperty;
    static readonly RIGHT: DirectionalBlockProperty;
    get serializedName(): string;
    toString(): string;
    static valueOf(name: string): DirectionalBlockProperty;
    static values(): DirectionalBlockProperty[];
  }


  interface ModularSeatProperty extends Enum<ModularSeatProperty> {}
  class ModularSeatProperty extends Enum<ModularSeatProperty> {
    static readonly SINGLE: ModularSeatProperty;
    static readonly LEFT: ModularSeatProperty;
    static readonly MIDDLE: ModularSeatProperty;
    static readonly RIGHT: ModularSeatProperty;
    static readonly INNER_LEFT: ModularSeatProperty;
    static readonly INNER_RIGHT: ModularSeatProperty;
    static readonly OUTER_LEFT: ModularSeatProperty;
    static readonly OUTER_RIGHT: ModularSeatProperty;
    get location(): string;
    get serializedName(): string;
    toString(): string;
    static valueOf(name: string): ModularSeatProperty;
    static values(): ModularSeatProperty[];
  }


  interface OptionalColorProperty extends Enum<OptionalColorProperty> {}
  class OptionalColorProperty extends Enum<OptionalColorProperty> {
    static readonly NONE: OptionalColorProperty;
    static readonly WHITE: OptionalColorProperty;
    static readonly ORANGE: OptionalColorProperty;
    static readonly MAGENTA: OptionalColorProperty;
    static readonly LIGHT_BLUE: OptionalColorProperty;
    static readonly YELLOW: OptionalColorProperty;
    static readonly LIME: OptionalColorProperty;
    static readonly PINK: OptionalColorProperty;
    static readonly GRAY: OptionalColorProperty;
    static readonly LIGHT_GRAY: OptionalColorProperty;
    static readonly CYAN: OptionalColorProperty;
    static readonly PURPLE: OptionalColorProperty;
    static readonly BLUE: OptionalColorProperty;
    static readonly BROWN: OptionalColorProperty;
    static readonly GREEN: OptionalColorProperty;
    static readonly RED: OptionalColorProperty;
    static readonly BLACK: OptionalColorProperty;
    static fromCushion(cushion: Item): OptionalColorProperty;
    static fromSheet(sheet: Item): OptionalColorProperty;
    get serializedName(): string;
    toCushion(): ItemStack;
    toSheet(): ItemStack;
    toString(): string;
    static valueOf(name: string): OptionalColorProperty;
    static values(): OptionalColorProperty[];
  }


  interface TableProperty extends Enum<TableProperty> {}
  class TableProperty extends Enum<TableProperty> {
    static readonly SINGLE: TableProperty;
    static readonly CENTER: TableProperty;
    static readonly NORTH_CENTER: TableProperty;
    static readonly EAST_CENTER: TableProperty;
    static readonly SOUTH_CENTER: TableProperty;
    static readonly WEST_CENTER: TableProperty;
    static readonly NORTH_SOUTH_CENTER: TableProperty;
    static readonly EAST_WEST_CENTER: TableProperty;
    static readonly NORTH_EAST_CORNER: TableProperty;
    static readonly NORTH_WEST_CORNER: TableProperty;
    static readonly SOUTH_EAST_CORNER: TableProperty;
    static readonly SOUTH_WEST_CORNER: TableProperty;
    static readonly NORTH_SIDE: TableProperty;
    static readonly EAST_SIDE: TableProperty;
    static readonly SOUTH_SIDE: TableProperty;
    static readonly WEST_SIDE: TableProperty;
    get serializedName(): string;
    toString(): string;
    static valueOf(name: string): TableProperty;
    static values(): TableProperty[];
  }


  interface TrimProperty extends Enum<TrimProperty> {}
  class TrimProperty extends Enum<TrimProperty> {
    static readonly NORMAL: TrimProperty;
    static readonly THICC: TrimProperty;
    static readonly THIN: TrimProperty;
    get serializedName(): string;
    toString(): string;
    static valueOf(name: string): TrimProperty;
    static values(): TrimProperty[];
  }

}

declare module 'earth.terrarium.handcrafted.common.blocks' {
  import { ModularSeatBlock, SittableBlock, Hammerable } from 'earth.terrarium.handcrafted.common.blocks.base';
  import { MapCodec } from 'com.mojang.serialization';
  import { EnumProperty, BooleanProperty, IntegerProperty } from 'net.minecraft.world.level.block.state.properties';
  import { AABB, Vec3 } from 'net.minecraft.world.phys';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { Properties } from 'BlockBehaviour';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockGetter, Level, LevelAccessor } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { TooltipContext } from 'Item';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { ModularSeatProperty, DirectionalBlockProperty, TableProperty } from 'earth.terrarium.handcrafted.common.blocks.base.properties';
  import { HorizontalDirectionalBlock, SimpleWaterloggedBlock, EntityBlock, Block, BedBlock, RenderShape } from 'net.minecraft.world.level.block';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';

  interface BenchBlock extends ModularSeatBlock {}
  class BenchBlock extends ModularSeatBlock {
    static readonly CODEC: MapCodec;
    static readonly COLOR: EnumProperty;
    static readonly SEAT: AABB;
    static readonly VOXEL_SHAPE: VoxelShape;
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltipComponents: Component[], tooltipFlag: TooltipFlag): void;
    getSeatSize(state: BlockState): AABB;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos): ModularSeatProperty;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, moved: boolean): void;
  }


  interface ChairBlock extends SittableBlock, SimpleWaterloggedBlock, HorizontalDirectionalBlock {}
  class ChairBlock extends SittableBlock {
    static readonly CODEC: MapCodec;
    static readonly WATERLOGGED: BooleanProperty;
    static readonly COLOR: EnumProperty;
    static readonly SEAT: AABB;
    static readonly VOXEL_SHAPE: VoxelShape;
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltipComponents: Component[], tooltipFlag: TooltipFlag): void;
    getFluidState(state: BlockState): FluidState;
    getSeatSize(state: BlockState): AABB;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(ctx: BlockPlaceContext): BlockState;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, moved: boolean): void;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, pos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface CouchBlock extends ModularSeatBlock {}
  class CouchBlock extends ModularSeatBlock {
    static readonly CODEC: MapCodec;
    static readonly COLOR: EnumProperty;
    static readonly SEAT: AABB;
    static readonly VOXEL_SHAPE: VoxelShape;
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltipComponents: Component[], tooltipFlag: TooltipFlag): void;
    getSeatSize(state: BlockState): AABB;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos): ModularSeatProperty;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, moved: boolean): void;
  }


  interface CounterBlock extends Hammerable, EntityBlock, HorizontalDirectionalBlock {}
  class CounterBlock extends Hammerable {
    static readonly CODEC: MapCodec;
    static readonly TYPE: IntegerProperty;
    static readonly COUNTER: EnumProperty;
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltipComponents: Component[], tooltipFlag: TooltipFlag): void;
    getStateForPlacement(ctx: BlockPlaceContext): BlockState;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onHammer(level: Level, pos: BlockPos, state: BlockState, side: Direction, user: Player, hitPos: Vec3): void;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, moved: boolean): void;
  }


  interface CupboardBlock extends Hammerable, EntityBlock, HorizontalDirectionalBlock {}
  class CupboardBlock extends Hammerable {
    static readonly CODEC: MapCodec;
    static readonly TYPE: IntegerProperty;
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltipComponents: Component[], tooltipFlag: TooltipFlag): void;
    getStateForPlacement(ctx: BlockPlaceContext): BlockState;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onHammer(level: Level, pos: BlockPos, state: BlockState, side: Direction, user: Player, hitPos: Vec3): void;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, moved: boolean): void;
  }


  interface CushionBlock extends SittableBlock, Block {}
  class CushionBlock extends SittableBlock {
    static readonly SHAPE: VoxelShape;
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltipComponents: Component[], tooltipFlag: TooltipFlag): void;
    getSeatSize(state: BlockState): AABB;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
  }


  interface DeskBlock extends EntityBlock, SimpleTableBlock {}
  class DeskBlock extends EntityBlock {
    static readonly SHAPE: VoxelShape;
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltipComponents: Component[], tooltipFlag: TooltipFlag): void;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
  }


  interface DiningBenchBlock extends SittableBlock, SimpleWaterloggedBlock, HorizontalDirectionalBlock {}
  class DiningBenchBlock extends SittableBlock {
    static readonly CODEC: MapCodec;
    static readonly SHAPE: EnumProperty;
    static readonly WATERLOGGED: BooleanProperty;
    static readonly X_AXIS_SHAPE: VoxelShape;
    static readonly Z_AXIS_SHAPE: VoxelShape;
    static readonly SEAT: AABB;
    constructor(properties: Properties);
    getSeatSize(state: BlockState): AABB;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    static getShape(block: Block, direction: Direction, level: BlockGetter, pos: BlockPos): DirectionalBlockProperty;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface DrawerBlock extends Hammerable, EntityBlock, HorizontalDirectionalBlock {}
  class DrawerBlock extends Hammerable {
    static readonly CODEC: MapCodec;
    static readonly TYPE: IntegerProperty;
    static readonly SHAPE: EnumProperty;
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltipComponents: Component[], tooltipFlag: TooltipFlag): void;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onHammer(level: Level, pos: BlockPos, state: BlockState, side: Direction, user: Player, hitPos: Vec3): void;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, moved: boolean): void;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface FancyBedBlock extends BedBlock {}
  class FancyBedBlock extends BedBlock {
    static readonly PART: EnumProperty;
    static readonly OCCUPIED: BooleanProperty;
    static readonly SHAPE: EnumProperty;
    static readonly COLOR: EnumProperty;
    static readonly VOXEL_SHAPE: VoxelShape;
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltipComponents: Component[], tooltipFlag: TooltipFlag): void;
    getRenderShape(state: BlockState): RenderShape;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    static getShape(block: Block, direction: Direction, level: BlockGetter, pos: BlockPos): DirectionalBlockProperty;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, moved: boolean): void;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, pos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface MetalBenchBlock extends ModularSeatBlock {}
  class MetalBenchBlock extends ModularSeatBlock {
    static readonly CODEC: MapCodec;
    static readonly SEAT: AABB;
    static readonly VOXEL_SHAPE: VoxelShape;
    constructor(properties: Properties);
    getSeatSize(state: BlockState): AABB;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos): ModularSeatProperty;
  }


  interface NightstandBlock extends EntityBlock, SimpleTableBlock {}
  class NightstandBlock extends EntityBlock {
    static readonly SHAPE: VoxelShape;
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltipComponents: Component[], tooltipFlag: TooltipFlag): void;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
  }


  interface ShelfBlock extends Hammerable, EntityBlock, HorizontalDirectionalBlock {}
  class ShelfBlock extends Hammerable {
    static readonly CODEC: MapCodec;
    static readonly TYPE: IntegerProperty;
    static readonly SHAPE: EnumProperty;
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltipComponents: Component[], tooltipFlag: TooltipFlag): void;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onHammer(level: Level, pos: BlockPos, state: BlockState, side: Direction, user: Player, hitPos: Vec3): void;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, moved: boolean): void;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface SideTableBlock extends EntityBlock, SimpleTableBlock {}
  class SideTableBlock extends EntityBlock {
    static readonly SHAPE: VoxelShape;
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltipComponents: Component[], tooltipFlag: TooltipFlag): void;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
  }


  interface SimpleTableBlock extends SimpleWaterloggedBlock, HorizontalDirectionalBlock {}
  class SimpleTableBlock extends SimpleWaterloggedBlock {
    static readonly CODEC: MapCodec;
    static readonly WATERLOGGED: BooleanProperty;
    static readonly COLOR: EnumProperty;
    constructor(properties: Properties);
    getFluidState(state: BlockState): FluidState;
    getStateForPlacement(ctx: BlockPlaceContext): BlockState;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, moved: boolean): void;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, pos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface StackableBookBlock extends HorizontalDirectionalBlock {}
  class StackableBookBlock extends HorizontalDirectionalBlock {
    static readonly CODEC: MapCodec;
    static readonly BOOKS: IntegerProperty;
    static readonly SEED: IntegerProperty;
    static readonly SHAPE_1: VoxelShape;
    static readonly SHAPE_2: VoxelShape;
    static readonly SHAPE_3: VoxelShape;
    static readonly SHAPE_4: VoxelShape;
    constructor(properties: Properties);
    static bookName(state: BlockState): string;
    canBeReplaced(state: BlockState, useContext: BlockPlaceContext): boolean;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
  }


  interface TableBlock extends SimpleWaterloggedBlock, Block {}
  class TableBlock extends SimpleWaterloggedBlock {
    static readonly SHAPE: EnumProperty;
    static readonly WATERLOGGED: BooleanProperty;
    static readonly COLOR: EnumProperty;
    static readonly SINGLE_SHAPE: VoxelShape;
    static readonly CENTER_SHAPE: VoxelShape;
    static readonly NORTH_EAST_CORNER_SHAPE: VoxelShape;
    static readonly NORTH_WEST_CORNER_SHAPE: VoxelShape;
    static readonly SOUTH_EAST_CORNER_SHAPE: VoxelShape;
    static readonly SOUTH_WEST_CORNER_SHAPE: VoxelShape;
    static readonly NORTH_SIDE_SHAPE: VoxelShape;
    static readonly EAST_SIDE_SHAPE: VoxelShape;
    static readonly SOUTH_SIDE_SHAPE: VoxelShape;
    static readonly WEST_SIDE_SHAPE: VoxelShape;
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltipComponents: Component[], tooltipFlag: TooltipFlag): void;
    getFluidState(state: BlockState): FluidState;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getShape(level: BlockGetter, pos: BlockPos): TableProperty;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, moved: boolean): void;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
  }

}

declare module 'earth.terrarium.handcrafted.common.blocks.crockery' {
  import { SimpleBlock } from 'earth.terrarium.handcrafted.common.blocks.base';
  import { MapCodec } from 'com.mojang.serialization';
  import { IntegerProperty } from 'net.minecraft.world.level.block.state.properties';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { Properties } from 'BlockBehaviour';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { BlockGetter, Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { Packet } from 'net.minecraft.network.protocol';
  import { ClientGamePacketListener } from 'net.minecraft.network.protocol.game';
  import { EntityBlock, RenderShape } from 'net.minecraft.world.level.block';
  import { TooltipContext } from 'Item';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  interface CrockeryBlock extends SimpleBlock {}
  class CrockeryBlock extends SimpleBlock {
    static readonly CODEC: MapCodec;
    static readonly PIECES: IntegerProperty;
    static readonly SHAPE_1: VoxelShape;
    static readonly SHAPE_2: VoxelShape;
    static readonly SHAPE_3: VoxelShape;
    static readonly SHAPE_4: VoxelShape;
    static readonly SHAPE_5: VoxelShape;
    static readonly SHAPE_6: VoxelShape;
    constructor(properties: Properties);
    canBeReplaced(state: BlockState, useContext: BlockPlaceContext): boolean;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    static piecesName(state: BlockState): string;
  }


  interface CrockeryBlockEntity extends BlockEntity {}
  class CrockeryBlockEntity extends BlockEntity {
    constructor(pos: BlockPos, state: BlockState);
    get stack(): ItemStack;
    get updatePacket(): Packet<ClientGamePacketListener>;
    getUpdateTag(registries: Provider): CompoundTag;
    set stack(item: ItemStack);
    update(): void;
  }


  interface CrockeryComboBlock extends EntityBlock, SimpleBlock {}
  class CrockeryComboBlock extends EntityBlock {
    static readonly CODEC: MapCodec;
    static readonly SHAPE: VoxelShape;
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltipComponents: Component[], tooltipFlag: TooltipFlag): void;
    getRenderShape(state: BlockState): RenderShape;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, moved: boolean): void;
  }

}

declare module 'earth.terrarium.handcrafted.common.blocks.misc' {
  import { SimpleBlock, Hammerable } from 'earth.terrarium.handcrafted.common.blocks.base';
  import { MapCodec } from 'com.mojang.serialization';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { Properties } from 'BlockBehaviour';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockGetter, Level } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { BooleanProperty, IntegerProperty } from 'net.minecraft.world.level.block.state.properties';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { SmokerBlock, Block } from 'net.minecraft.world.level.block';
  import { BlockEntity, BlockEntityTicker, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { PotSize } from 'earth.terrarium.handcrafted.common.blocks.misc.PotBlock';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';

  interface KitchenHoodBlock extends SimpleBlock {}
  class KitchenHoodBlock extends SimpleBlock {
    static readonly CODEC: MapCodec;
    static readonly SHAPE: VoxelShape;
    constructor(properties: Properties);
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
  }


  interface KitchenHoodPipeBlock extends Hammerable, SimpleBlock {}
  class KitchenHoodPipeBlock extends Hammerable {
    static readonly CODEC: MapCodec;
    static readonly CORNER: BooleanProperty;
    static readonly SHAPE: VoxelShape;
    static readonly NORTH_SHAPE: VoxelShape;
    static readonly EAST_SHAPE: VoxelShape;
    static readonly SOUTH_SHAPE: VoxelShape;
    static readonly WEST_SHAPE: VoxelShape;
    constructor(properties: Properties);
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    onHammer(level: Level, pos: BlockPos, state: BlockState, side: Direction, user: Player, hitPos: Vec3): void;
  }


  interface OvenBlock extends SmokerBlock {}
  class OvenBlock extends SmokerBlock {
    constructor(properties: Properties);
    getTicker<T extends BlockEntity>(level: Level, state: BlockState, blockEntityType: BlockEntityType<T>): BlockEntityTicker<T>;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
  }


  interface PotBlock extends Block {}
  class PotBlock extends Block {
    static readonly THIN_SHAPE: VoxelShape;
    static readonly MEDIUM_SHAPE: VoxelShape;
    static readonly WIDE_SHAPE: VoxelShape;
    static readonly THICK_SHAPE: VoxelShape;
    constructor(size: PotSize, properties: Properties);
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    size(): PotSize;
  }


  interface StackableJarBlock extends SimpleBlock {}
  class StackableJarBlock extends SimpleBlock {
    static readonly CODEC: MapCodec;
    static readonly JARS: IntegerProperty;
    static readonly SHAPE_1: VoxelShape;
    static readonly SHAPE_2: VoxelShape;
    static readonly SHAPE_3: VoxelShape;
    constructor(properties: Properties);
    canBeReplaced(state: BlockState, useContext: BlockPlaceContext): boolean;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
  }

}

declare module 'earth.terrarium.handcrafted.common.blocks.misc.PotBlock' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface PotSize extends Enum<PotSize> {}
  class PotSize extends Enum<PotSize> {
    static readonly THIN: PotSize;
    static readonly MEDIUM: PotSize;
    static readonly WIDE: PotSize;
    static readonly THICK: PotSize;
    static valueOf(name: string): PotSize;
    static values(): PotSize[];
  }

}

declare module 'earth.terrarium.handcrafted.common.blocks.trims' {
  import { SimpleBlock, Hammerable } from 'earth.terrarium.handcrafted.common.blocks.base';
  import { MapCodec } from 'com.mojang.serialization';
  import { EnumProperty, BooleanProperty, IntegerProperty } from 'net.minecraft.world.level.block.state.properties';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { Properties } from 'BlockBehaviour';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Direction, BlockPos } from 'net.minecraft.core';
  import { LevelAccessor, Level, BlockGetter, LevelReader } from 'net.minecraft.world.level';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { TooltipContext } from 'Item';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { FaceAttachedHorizontalDirectionalBlock, SimpleWaterloggedBlock } from 'net.minecraft.world.level.block';
  import { FluidState } from 'net.minecraft.world.level.material';

  interface CornerTrimBlock extends Hammerable, SimpleBlock {}
  class CornerTrimBlock extends Hammerable {
    static readonly CODEC: MapCodec;
    static readonly SHAPE: EnumProperty;
    static readonly HALF: EnumProperty;
    static readonly NORMAL_TOP_NORTH: VoxelShape;
    static readonly NORMAL_TOP_EAST: VoxelShape;
    static readonly NORMAL_TOP_SOUTH: VoxelShape;
    static readonly NORMAL_TOP_WEST: VoxelShape;
    static readonly NORMAL_BOTTOM_NORTH: VoxelShape;
    static readonly NORMAL_BOTTOM_EAST: VoxelShape;
    static readonly NORMAL_BOTTOM_SOUTH: VoxelShape;
    static readonly NORMAL_BOTTOM_WEST: VoxelShape;
    static readonly THICC_TOP_NORTH: VoxelShape;
    static readonly THICC_TOP_EAST: VoxelShape;
    static readonly THICC_TOP_SOUTH: VoxelShape;
    static readonly THICC_TOP_WEST: VoxelShape;
    static readonly THICC_BOTTOM_NORTH: VoxelShape;
    static readonly THICC_BOTTOM_EAST: VoxelShape;
    static readonly THICC_BOTTOM_SOUTH: VoxelShape;
    static readonly THICC_BOTTOM_WEST: VoxelShape;
    static readonly THIN_TOP_NORTH: VoxelShape;
    static readonly THIN_TOP_EAST: VoxelShape;
    static readonly THIN_TOP_SOUTH: VoxelShape;
    static readonly THIN_TOP_WEST: VoxelShape;
    static readonly THIN_BOTTOM_NORTH: VoxelShape;
    static readonly THIN_BOTTOM_EAST: VoxelShape;
    static readonly THIN_BOTTOM_SOUTH: VoxelShape;
    static readonly THIN_BOTTOM_WEST: VoxelShape;
    constructor(wood: boolean, properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltipComponents: Component[], tooltipFlag: TooltipFlag): void;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    isWood(): boolean;
    onHammer(level: Level, pos: BlockPos, state: BlockState, side: Direction, user: Player, hitPos: Vec3): void;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, currentPos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface PillarTrimBlock extends Hammerable, SimpleWaterloggedBlock, FaceAttachedHorizontalDirectionalBlock {}
  class PillarTrimBlock extends Hammerable {
    static readonly CODEC: MapCodec;
    static readonly WATERLOGGED: BooleanProperty;
    static readonly TYPE: IntegerProperty;
    static readonly SHAPE: EnumProperty;
    static readonly NORMAL_NORTH_SHAPE: VoxelShape;
    static readonly NORMAL_EAST_SHAPE: VoxelShape;
    static readonly NORMAL_SOUTH_SHAPE: VoxelShape;
    static readonly NORMAL_WEST_SHAPE: VoxelShape;
    static readonly NORMAL_UP_X_AXIS_SHAPE: VoxelShape;
    static readonly NORMAL_UP_Z_AXIS_SHAPE: VoxelShape;
    static readonly NORMAL_DOWN_X_AXIS_SHAPE: VoxelShape;
    static readonly NORMAL_DOWN_Z_AXIS_SHAPE: VoxelShape;
    static readonly THICC_NORTH_SHAPE: VoxelShape;
    static readonly THICC_EAST_SHAPE: VoxelShape;
    static readonly THICC_SOUTH_SHAPE: VoxelShape;
    static readonly THICC_WEST_SHAPE: VoxelShape;
    static readonly THICC_UP_SHAPE: VoxelShape;
    static readonly THICC_DOWN_SHAPE: VoxelShape;
    static readonly THIN_NORTH_SHAPE: VoxelShape;
    static readonly THIN_EAST_SHAPE: VoxelShape;
    static readonly THIN_SOUTH_SHAPE: VoxelShape;
    static readonly THIN_WEST_SHAPE: VoxelShape;
    static readonly THIN_UP_X_AXIS_SHAPE: VoxelShape;
    static readonly THIN_UP_Z_AXIS_SHAPE: VoxelShape;
    static readonly THIN_DOWN_X_AXIS_SHAPE: VoxelShape;
    static readonly THIN_DOWN_Z_AXIS_SHAPE: VoxelShape;
    constructor(wood: boolean, properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltipComponents: Component[], tooltipFlag: TooltipFlag): void;
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    getFluidState(state: BlockState): FluidState;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(ctx: BlockPlaceContext): BlockState;
    isWood(): boolean;
    onHammer(level: Level, pos: BlockPos, state: BlockState, side: Direction, user: Player, hitPos: Vec3): void;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, pos: BlockPos, neighborPos: BlockPos): BlockState;
  }

}

declare module 'earth.terrarium.handcrafted.common.blocks.trophies' {
  import { SimpleBlock } from 'earth.terrarium.handcrafted.common.blocks.base';
  import { MapCodec } from 'com.mojang.serialization';
  import { Properties } from 'BlockBehaviour';
  import { EnumProperty } from 'net.minecraft.world.level.block.state.properties';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { LevelReader, Level, LevelAccessor, BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { Player } from 'net.minecraft.world.entity.player';
  import { RenderShape } from 'net.minecraft.world.level.block';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { ItemStack } from 'net.minecraft.world.item';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';

  interface HangingTrophyBlock extends SimpleBlock {}
  class HangingTrophyBlock extends SimpleBlock {
    static readonly CODEC: MapCodec;
    constructor(properties: Properties);
  }


  interface StatueTrophyBlock extends SimpleBlock {}
  class StatueTrophyBlock extends SimpleBlock {
    static readonly CODEC: MapCodec;
    static readonly HALF: EnumProperty;
    constructor(properties: Properties);
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    getRenderShape(state: BlockState): RenderShape;
    getSeed(state: BlockState, pos: BlockPos): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    playerWillDestroy(level: Level, pos: BlockPos, state: BlockState, player: Player): BlockState;
    static preventCreativeDropFromBottomPart(level: Level, pos: BlockPos, state: BlockState, player: Player): void;
    setPlacedBy(level: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, pos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface WallTrophyBlock extends SimpleBlock {}
  class WallTrophyBlock extends SimpleBlock {
    static readonly CODEC: MapCodec;
    constructor(properties: Properties);
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
  }

}

declare module 'earth.terrarium.handcrafted.common.constants' {
  import { Component } from 'net.minecraft.network.chat';

  class ConstantComponents {
    static readonly SHIFT_DESCRIPTION: Component;
    static readonly HAMMER: Component;
    static readonly HAMMER_USE_LOOK: Component;
    static readonly HAMMER_USE_SHAPE: Component;
    static readonly HAMMER_USE_LOOK_SHIFT: Component;
    static readonly COUNTER: Component;
    static readonly CROCKERY_COMBO: Component;
    static readonly PLACE_ON_FURNITURE: Component;
    static readonly CUSHION: Component;
    static readonly SHEET: Component;
    static readonly BED_PILLOW: Component;
    static readonly BED_SHEET: Component;
  }

}

declare module 'earth.terrarium.handcrafted.common.entities' {
  import { Painting } from 'net.minecraft.world.entity.decoration';
  import { EntityType, Entity, LivingEntity } from 'net.minecraft.world.entity';
  import { Level, ItemLike } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { ItemEntity } from 'net.minecraft.world.entity.item';
  import { ItemStack } from 'net.minecraft.world.item';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Multimap } from 'com.google.common.collect';
  import { AABB, Vec3 } from 'net.minecraft.world.phys';
  import { Packet } from 'net.minecraft.network.protocol';
  import { ClientGamePacketListener, ClientboundAddEntityPacket } from 'net.minecraft.network.protocol.game';
  import { ServerEntity } from 'net.minecraft.server.level';
  import { EntityInLevelCallback } from 'net.minecraft.world.level.entity';

  interface FancyPainting extends Painting {}
  class FancyPainting extends Painting {
    constructor(type: EntityType<Painting>, level: Level);

    constructor(level: Level, pos: BlockPos);
    addAdditionalSaveData(compound: CompoundTag): void;
    get pickResult(): ItemStack;
    readAdditionalSaveData(compound: CompoundTag): void;
    setDirection(direction: Direction): void;
    spawnAtLocation(item: ItemLike): ItemEntity;
  }


  interface Seat extends Entity {}
  class Seat extends Entity {
    static readonly SITTING_POSITIONS: Multimap;
    constructor(entityType: EntityType<Entity>, level: Level);

    constructor(level: Level, shape: AABB);
    getAddEntityPacket(serverEntity: ServerEntity): Packet<ClientGamePacketListener>;
    getDismountLocationForPassenger(passenger: LivingEntity): Vec3;
    isInvulnerable(): boolean;
    isVehicle(): boolean;
    static of(level: Level, pos: BlockPos, dir: Direction): Seat;
    onPassengerTurned(entityToUpdate: Entity): void;
    recreateFromPacket(packet: ClientboundAddEntityPacket): void;
    removeSeat(): void;
    setLevelCallback(levelCallback: EntityInLevelCallback): void;
    shouldRender(x: number, y: number, z: number): boolean;
    tick(): void;
  }

}

declare module 'earth.terrarium.handcrafted.common.items' {
  import { HangingEntityItem, Item, ItemStack, TooltipFlag, BlockItem } from 'net.minecraft.world.item';
  import { Properties, TooltipContext } from 'Item';
  import { TagKey } from 'net.minecraft.tags';
  import { PaintingVariant } from 'net.minecraft.world.entity.decoration';
  import { InteractionResult } from 'net.minecraft.world';
  import { UseOnContext } from 'net.minecraft.world.item.context';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { Block } from 'net.minecraft.world.level.block';

  interface CustomPaintingItem extends HangingEntityItem {}
  class CustomPaintingItem extends HangingEntityItem {
    constructor(settings: Properties, variants: TagKey<PaintingVariant>);
    useOn(context: UseOnContext): InteractionResult;
  }


  interface HammerItem extends Item {}
  class HammerItem extends Item {
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltipComponents: Component[], tooltipFlag: TooltipFlag): void;
    useOn(context: UseOnContext): InteractionResult;
  }


  interface TooltipBlockItem extends BlockItem {}
  class TooltipBlockItem extends BlockItem {
    constructor(block: Block, tooltip: Component, properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltipComponents: Component[], tooltipFlag: TooltipFlag): void;
  }


  interface TooltipItem extends Item {}
  class TooltipItem extends Item {
    constructor(tooltip: Component, properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltipComponents: Component[], tooltipFlag: TooltipFlag): void;
  }

}

declare module 'earth.terrarium.handcrafted.common.registry' {
  import { ResourcefulRegistry, RegistryEntry } from 'com.teamresourceful.resourcefullib.common.registry';
  import { BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockEntitySupplier } from 'BlockEntityType';
  import { Block } from 'net.minecraft.world.level.block';

  class ModBlockEntityTypes {
    static readonly BLOCK_ENTITY_TYPES: ResourcefulRegistry;
    static readonly OVEN: RegistryEntry;
    static readonly CROCKERY: RegistryEntry;
    static readonly CONTAINER: RegistryEntry;
    static createBlockEntityType<E extends BlockEntity>(factory: BlockEntitySupplier<E>, ...blocks: Block[]): BlockEntityType<E>;
    static createBlockEntityType<E extends BlockEntity>(factory: BlockEntitySupplier<E>, registry: ResourcefulRegistry<Block>): BlockEntityType<E>;
  }


  class ModBlocks {
    static readonly BLOCKS: ResourcefulRegistry;
    static readonly CUSHIONS: ResourcefulRegistry;
    static readonly BENCHES: ResourcefulRegistry;
    static readonly WOODEN_BENCHES: ResourcefulRegistry;
    static readonly METAL_BENCHES: ResourcefulRegistry;
    static readonly COUCHES: ResourcefulRegistry;
    static readonly CHAIRS: ResourcefulRegistry;
    static readonly DINING_BENCHES: ResourcefulRegistry;
    static readonly SIDE_TABLES: ResourcefulRegistry;
    static readonly DESKS: ResourcefulRegistry;
    static readonly NIGHTSTANDS: ResourcefulRegistry;
    static readonly TABLES: ResourcefulRegistry;
    static readonly FANCY_BEDS: ResourcefulRegistry;
    static readonly COUNTERS: ResourcefulRegistry;
    static readonly CUPBOARDS: ResourcefulRegistry;
    static readonly DRAWERS: ResourcefulRegistry;
    static readonly SHELVES: ResourcefulRegistry;
    static readonly POTS: ResourcefulRegistry;
    static readonly TRIMS: ResourcefulRegistry;
    static readonly PILLAR_TRIMS: ResourcefulRegistry;
    static readonly CORNER_TRIMS: ResourcefulRegistry;
    static readonly TROPHIES: ResourcefulRegistry;
    static readonly WALL_TROPHIES: ResourcefulRegistry;
    static readonly HANGING_TROPHIES: ResourcefulRegistry;
    static readonly STATUE_TROPHIES: ResourcefulRegistry;
    static readonly CROCKERY: ResourcefulRegistry;
    static readonly CUPS: ResourcefulRegistry;
    static readonly PLATES: ResourcefulRegistry;
    static readonly BOWLS: ResourcefulRegistry;
    static readonly CROCKERY_COMBOS: ResourcefulRegistry;
    static readonly OVEN: RegistryEntry;
    static readonly KITCHEN_HOOD: RegistryEntry;
    static readonly KITCHEN_HOOD_PIPE: RegistryEntry;
    static readonly BERRY_JAM_JAR: RegistryEntry;
    static readonly STACKABLE_BOOK: RegistryEntry;
    static readonly BLACK_CUSHION: RegistryEntry;
    static readonly BLUE_CUSHION: RegistryEntry;
    static readonly BROWN_CUSHION: RegistryEntry;
    static readonly CYAN_CUSHION: RegistryEntry;
    static readonly GRAY_CUSHION: RegistryEntry;
    static readonly GREEN_CUSHION: RegistryEntry;
    static readonly LIGHT_BLUE_CUSHION: RegistryEntry;
    static readonly LIGHT_GRAY_CUSHION: RegistryEntry;
    static readonly LIME_CUSHION: RegistryEntry;
    static readonly MAGENTA_CUSHION: RegistryEntry;
    static readonly ORANGE_CUSHION: RegistryEntry;
    static readonly PINK_CUSHION: RegistryEntry;
    static readonly PURPLE_CUSHION: RegistryEntry;
    static readonly RED_CUSHION: RegistryEntry;
    static readonly WHITE_CUSHION: RegistryEntry;
    static readonly YELLOW_CUSHION: RegistryEntry;
    static readonly ACACIA_BENCH: RegistryEntry;
    static readonly BAMBOO_BENCH: RegistryEntry;
    static readonly BIRCH_BENCH: RegistryEntry;
    static readonly CHERRY_BENCH: RegistryEntry;
    static readonly CRIMSON_BENCH: RegistryEntry;
    static readonly DARK_OAK_BENCH: RegistryEntry;
    static readonly JUNGLE_BENCH: RegistryEntry;
    static readonly MANGROVE_BENCH: RegistryEntry;
    static readonly OAK_BENCH: RegistryEntry;
    static readonly SPRUCE_BENCH: RegistryEntry;
    static readonly WARPED_BENCH: RegistryEntry;
    static readonly BENCH: RegistryEntry;
    static readonly FROZEN_BENCH: RegistryEntry;
    static readonly ACACIA_COUCH: RegistryEntry;
    static readonly BAMBOO_COUCH: RegistryEntry;
    static readonly BIRCH_COUCH: RegistryEntry;
    static readonly CHERRY_COUCH: RegistryEntry;
    static readonly CRIMSON_COUCH: RegistryEntry;
    static readonly DARK_OAK_COUCH: RegistryEntry;
    static readonly JUNGLE_COUCH: RegistryEntry;
    static readonly MANGROVE_COUCH: RegistryEntry;
    static readonly OAK_COUCH: RegistryEntry;
    static readonly SPRUCE_COUCH: RegistryEntry;
    static readonly WARPED_COUCH: RegistryEntry;
    static readonly ACACIA_CHAIR: RegistryEntry;
    static readonly BAMBOO_CHAIR: RegistryEntry;
    static readonly BIRCH_CHAIR: RegistryEntry;
    static readonly CHERRY_CHAIR: RegistryEntry;
    static readonly CRIMSON_CHAIR: RegistryEntry;
    static readonly DARK_OAK_CHAIR: RegistryEntry;
    static readonly JUNGLE_CHAIR: RegistryEntry;
    static readonly MANGROVE_CHAIR: RegistryEntry;
    static readonly OAK_CHAIR: RegistryEntry;
    static readonly SPRUCE_CHAIR: RegistryEntry;
    static readonly WARPED_CHAIR: RegistryEntry;
    static readonly ACACIA_DINING_BENCH: RegistryEntry;
    static readonly BAMBOO_DINING_BENCH: RegistryEntry;
    static readonly BIRCH_DINING_BENCH: RegistryEntry;
    static readonly CHERRY_DINING_BENCH: RegistryEntry;
    static readonly CRIMSON_DINING_BENCH: RegistryEntry;
    static readonly DARK_OAK_DINING_BENCH: RegistryEntry;
    static readonly JUNGLE_DINING_BENCH: RegistryEntry;
    static readonly MANGROVE_DINING_BENCH: RegistryEntry;
    static readonly OAK_DINING_BENCH: RegistryEntry;
    static readonly SPRUCE_DINING_BENCH: RegistryEntry;
    static readonly WARPED_DINING_BENCH: RegistryEntry;
    static readonly ACACIA_SIDE_TABLE: RegistryEntry;
    static readonly BAMBOO_SIDE_TABLE: RegistryEntry;
    static readonly BIRCH_SIDE_TABLE: RegistryEntry;
    static readonly CHERRY_SIDE_TABLE: RegistryEntry;
    static readonly CRIMSON_SIDE_TABLE: RegistryEntry;
    static readonly DARK_OAK_SIDE_TABLE: RegistryEntry;
    static readonly JUNGLE_SIDE_TABLE: RegistryEntry;
    static readonly MANGROVE_SIDE_TABLE: RegistryEntry;
    static readonly OAK_SIDE_TABLE: RegistryEntry;
    static readonly SPRUCE_SIDE_TABLE: RegistryEntry;
    static readonly WARPED_SIDE_TABLE: RegistryEntry;
    static readonly ACACIA_DESK: RegistryEntry;
    static readonly BAMBOO_DESK: RegistryEntry;
    static readonly BIRCH_DESK: RegistryEntry;
    static readonly CHERRY_DESK: RegistryEntry;
    static readonly CRIMSON_DESK: RegistryEntry;
    static readonly DARK_OAK_DESK: RegistryEntry;
    static readonly JUNGLE_DESK: RegistryEntry;
    static readonly MANGROVE_DESK: RegistryEntry;
    static readonly OAK_DESK: RegistryEntry;
    static readonly SPRUCE_DESK: RegistryEntry;
    static readonly WARPED_DESK: RegistryEntry;
    static readonly ACACIA_NIGHTSTAND: RegistryEntry;
    static readonly BAMBOO_NIGHTSTAND: RegistryEntry;
    static readonly BIRCH_NIGHTSTAND: RegistryEntry;
    static readonly CHERRY_NIGHTSTAND: RegistryEntry;
    static readonly CRIMSON_NIGHTSTAND: RegistryEntry;
    static readonly DARK_OAK_NIGHTSTAND: RegistryEntry;
    static readonly JUNGLE_NIGHTSTAND: RegistryEntry;
    static readonly MANGROVE_NIGHTSTAND: RegistryEntry;
    static readonly OAK_NIGHTSTAND: RegistryEntry;
    static readonly SPRUCE_NIGHTSTAND: RegistryEntry;
    static readonly WARPED_NIGHTSTAND: RegistryEntry;
    static readonly ACACIA_TABLE: RegistryEntry;
    static readonly BAMBOO_TABLE: RegistryEntry;
    static readonly BIRCH_TABLE: RegistryEntry;
    static readonly CHERRY_TABLE: RegistryEntry;
    static readonly CRIMSON_TABLE: RegistryEntry;
    static readonly DARK_OAK_TABLE: RegistryEntry;
    static readonly JUNGLE_TABLE: RegistryEntry;
    static readonly MANGROVE_TABLE: RegistryEntry;
    static readonly OAK_TABLE: RegistryEntry;
    static readonly SPRUCE_TABLE: RegistryEntry;
    static readonly WARPED_TABLE: RegistryEntry;
    static readonly ACACIA_FANCY_BED: RegistryEntry;
    static readonly BAMBOO_FANCY_BED: RegistryEntry;
    static readonly BIRCH_FANCY_BED: RegistryEntry;
    static readonly CHERRY_FANCY_BED: RegistryEntry;
    static readonly DARK_OAK_FANCY_BED: RegistryEntry;
    static readonly CRIMSON_FANCY_BED: RegistryEntry;
    static readonly JUNGLE_FANCY_BED: RegistryEntry;
    static readonly MANGROVE_FANCY_BED: RegistryEntry;
    static readonly OAK_FANCY_BED: RegistryEntry;
    static readonly SPRUCE_FANCY_BED: RegistryEntry;
    static readonly WARPED_FANCY_BED: RegistryEntry;
    static readonly ACACIA_COUNTER: RegistryEntry;
    static readonly BAMBOO_COUNTER: RegistryEntry;
    static readonly BIRCH_COUNTER: RegistryEntry;
    static readonly CHERRY_COUNTER: RegistryEntry;
    static readonly CRIMSON_COUNTER: RegistryEntry;
    static readonly DARK_OAK_COUNTER: RegistryEntry;
    static readonly JUNGLE_COUNTER: RegistryEntry;
    static readonly MANGROVE_COUNTER: RegistryEntry;
    static readonly OAK_COUNTER: RegistryEntry;
    static readonly SPRUCE_COUNTER: RegistryEntry;
    static readonly WARPED_COUNTER: RegistryEntry;
    static readonly ACACIA_CUPBOARD: RegistryEntry;
    static readonly BAMBOO_CUPBOARD: RegistryEntry;
    static readonly BIRCH_CUPBOARD: RegistryEntry;
    static readonly CHERRY_CUPBOARD: RegistryEntry;
    static readonly CRIMSON_CUPBOARD: RegistryEntry;
    static readonly DARK_OAK_CUPBOARD: RegistryEntry;
    static readonly JUNGLE_CUPBOARD: RegistryEntry;
    static readonly MANGROVE_CUPBOARD: RegistryEntry;
    static readonly OAK_CUPBOARD: RegistryEntry;
    static readonly SPRUCE_CUPBOARD: RegistryEntry;
    static readonly WARPED_CUPBOARD: RegistryEntry;
    static readonly ACACIA_DRAWER: RegistryEntry;
    static readonly BAMBOO_DRAWER: RegistryEntry;
    static readonly BIRCH_DRAWER: RegistryEntry;
    static readonly CHERRY_DRAWER: RegistryEntry;
    static readonly CRIMSON_DRAWER: RegistryEntry;
    static readonly DARK_OAK_DRAWER: RegistryEntry;
    static readonly JUNGLE_DRAWER: RegistryEntry;
    static readonly MANGROVE_DRAWER: RegistryEntry;
    static readonly OAK_DRAWER: RegistryEntry;
    static readonly SPRUCE_DRAWER: RegistryEntry;
    static readonly WARPED_DRAWER: RegistryEntry;
    static readonly ACACIA_SHELF: RegistryEntry;
    static readonly BAMBOO_SHELF: RegistryEntry;
    static readonly BIRCH_SHELF: RegistryEntry;
    static readonly CHERRY_SHELF: RegistryEntry;
    static readonly CRIMSON_SHELF: RegistryEntry;
    static readonly DARK_OAK_SHELF: RegistryEntry;
    static readonly JUNGLE_SHELF: RegistryEntry;
    static readonly MANGROVE_SHELF: RegistryEntry;
    static readonly OAK_SHELF: RegistryEntry;
    static readonly SPRUCE_SHELF: RegistryEntry;
    static readonly WARPED_SHELF: RegistryEntry;
    static readonly ACACIA_PILLAR_TRIM: RegistryEntry;
    static readonly ACACIA_CORNER_TRIM: RegistryEntry;
    static readonly BAMBOO_PILLAR_TRIM: RegistryEntry;
    static readonly BAMBOO_CORNER_TRIM: RegistryEntry;
    static readonly BIRCH_PILLAR_TRIM: RegistryEntry;
    static readonly BIRCH_CORNER_TRIM: RegistryEntry;
    static readonly CHERRY_PILLAR_TRIM: RegistryEntry;
    static readonly CHERRY_CORNER_TRIM: RegistryEntry;
    static readonly CRIMSON_PILLAR_TRIM: RegistryEntry;
    static readonly CRIMSON_CORNER_TRIM: RegistryEntry;
    static readonly DARK_OAK_PILLAR_TRIM: RegistryEntry;
    static readonly DARK_OAK_CORNER_TRIM: RegistryEntry;
    static readonly JUNGLE_PILLAR_TRIM: RegistryEntry;
    static readonly JUNGLE_CORNER_TRIM: RegistryEntry;
    static readonly MANGROVE_PILLAR_TRIM: RegistryEntry;
    static readonly MANGROVE_CORNER_TRIM: RegistryEntry;
    static readonly OAK_PILLAR_TRIM: RegistryEntry;
    static readonly OAK_CORNER_TRIM: RegistryEntry;
    static readonly SPRUCE_PILLAR_TRIM: RegistryEntry;
    static readonly SPRUCE_CORNER_TRIM: RegistryEntry;
    static readonly WARPED_PILLAR_TRIM: RegistryEntry;
    static readonly WARPED_CORNER_TRIM: RegistryEntry;
    static readonly ANDESITE_PILLAR_TRIM: RegistryEntry;
    static readonly ANDESITE_CORNER_TRIM: RegistryEntry;
    static readonly BLACKSTONE_PILLAR_TRIM: RegistryEntry;
    static readonly BLACKSTONE_CORNER_TRIM: RegistryEntry;
    static readonly BRICKS_PILLAR_TRIM: RegistryEntry;
    static readonly BRICKS_CORNER_TRIM: RegistryEntry;
    static readonly CALCITE_PILLAR_TRIM: RegistryEntry;
    static readonly CALCITE_CORNER_TRIM: RegistryEntry;
    static readonly DEEPSLATE_PILLAR_TRIM: RegistryEntry;
    static readonly DEEPSLATE_CORNER_TRIM: RegistryEntry;
    static readonly DIORITE_PILLAR_TRIM: RegistryEntry;
    static readonly DIORITE_CORNER_TRIM: RegistryEntry;
    static readonly DRIPSTONE_PILLAR_TRIM: RegistryEntry;
    static readonly DRIPSTONE_CORNER_TRIM: RegistryEntry;
    static readonly GRANITE_PILLAR_TRIM: RegistryEntry;
    static readonly GRANITE_CORNER_TRIM: RegistryEntry;
    static readonly QUARTZ_PILLAR_TRIM: RegistryEntry;
    static readonly QUARTZ_CORNER_TRIM: RegistryEntry;
    static readonly STONE_PILLAR_TRIM: RegistryEntry;
    static readonly STONE_CORNER_TRIM: RegistryEntry;
    static readonly SANDSTONE_PILLAR_TRIM: RegistryEntry;
    static readonly SANDSTONE_CORNER_TRIM: RegistryEntry;
    static readonly RED_SANDSTONE_PILLAR_TRIM: RegistryEntry;
    static readonly RED_SANDSTONE_CORNER_TRIM: RegistryEntry;
    static readonly TERRACOTTA_THIN_POT: RegistryEntry;
    static readonly TERRACOTTA_MEDIUM_POT: RegistryEntry;
    static readonly TERRACOTTA_WIDE_POT: RegistryEntry;
    static readonly TERRACOTTA_THICK_POT: RegistryEntry;
    static readonly WHITE_GLAZED_THIN_POT: RegistryEntry;
    static readonly WHITE_GLAZED_MEDIUM_POT: RegistryEntry;
    static readonly WHITE_GLAZED_WIDE_POT: RegistryEntry;
    static readonly WHITE_GLAZED_THICK_POT: RegistryEntry;
    static readonly BLUE_GLAZED_THIN_POT: RegistryEntry;
    static readonly BLUE_GLAZED_MEDIUM_POT: RegistryEntry;
    static readonly BLUE_GLAZED_WIDE_POT: RegistryEntry;
    static readonly BLUE_GLAZED_THICK_POT: RegistryEntry;
    static readonly GOLDEN_THIN_POT: RegistryEntry;
    static readonly GOLDEN_MEDIUM_POT: RegistryEntry;
    static readonly GOLDEN_WIDE_POT: RegistryEntry;
    static readonly GOLDEN_THICK_POT: RegistryEntry;
    static readonly BEAR_TROPHY: RegistryEntry;
    static readonly BLAZE_TROPHY: RegistryEntry;
    static readonly FOX_TROPHY: RegistryEntry;
    static readonly GOAT_TROPHY: RegistryEntry;
    static readonly PUFFERFISH_TROPHY: RegistryEntry;
    static readonly SALMON_TROPHY: RegistryEntry;
    static readonly SILVERFISH_TROPHY: RegistryEntry;
    static readonly SKELETON_HORSE_TROPHY: RegistryEntry;
    static readonly SPIDER_TROPHY: RegistryEntry;
    static readonly TROPICAL_FISH_TROPHY: RegistryEntry;
    static readonly WITHER_SKELETON_TROPHY: RegistryEntry;
    static readonly WOLF_TROPHY: RegistryEntry;
    static readonly PHANTOM_TROPHY: RegistryEntry;
    static readonly CREEPER_TROPHY: RegistryEntry;
    static readonly SKELETON_TROPHY: RegistryEntry;
    static readonly EVOKER_TROPHY: RegistryEntry;
    static readonly PILLAGER_TROPHY: RegistryEntry;
    static readonly VINDICATOR_TROPHY: RegistryEntry;
    static readonly WITCH_TROPHY: RegistryEntry;
    static readonly WHITE_CUP: RegistryEntry;
    static readonly YELLOW_CUP: RegistryEntry;
    static readonly BLUE_CUP: RegistryEntry;
    static readonly WOOD_CUP: RegistryEntry;
    static readonly TERRACOTTA_CUP: RegistryEntry;
    static readonly WHITE_PLATE: RegistryEntry;
    static readonly YELLOW_PLATE: RegistryEntry;
    static readonly BLUE_PLATE: RegistryEntry;
    static readonly WOOD_PLATE: RegistryEntry;
    static readonly TERRACOTTA_PLATE: RegistryEntry;
    static readonly WHITE_BOWL: RegistryEntry;
    static readonly YELLOW_BOWL: RegistryEntry;
    static readonly BLUE_BOWL: RegistryEntry;
    static readonly WOOD_BOWL: RegistryEntry;
    static readonly TERRACOTTA_BOWL: RegistryEntry;
    static readonly WHITE_CROCKERY_COMBO: RegistryEntry;
    static readonly YELLOW_CROCKERY_COMBO: RegistryEntry;
    static readonly BLUE_CROCKERY_COMBO: RegistryEntry;
    static readonly WOOD_CROCKERY_COMBO: RegistryEntry;
    static readonly TERRACOTTA_CROCKERY_COMBO: RegistryEntry;
  }


  class ModEntityTypes {
    static readonly ENTITY_TYPES: ResourcefulRegistry;
    static readonly SEAT: RegistryEntry;
    static readonly FANCY_PAINTING: RegistryEntry;
  }


  class ModItems {
    static readonly ITEMS: ResourcefulRegistry;
    static readonly TABS: ResourcefulRegistry;
    static readonly TAB: RegistryEntry;
    static readonly CUSHIONS: ResourcefulRegistry;
    static readonly SHEETS: ResourcefulRegistry;
    static readonly BENCHES: ResourcefulRegistry;
    static readonly WOODEN_BENCHES: ResourcefulRegistry;
    static readonly METAL_BENCHES: ResourcefulRegistry;
    static readonly COUCHES: ResourcefulRegistry;
    static readonly CHAIRS: ResourcefulRegistry;
    static readonly DINING_BENCHES: ResourcefulRegistry;
    static readonly SIDE_TABLES: ResourcefulRegistry;
    static readonly DESKS: ResourcefulRegistry;
    static readonly NIGHTSTANDS: ResourcefulRegistry;
    static readonly TABLES: ResourcefulRegistry;
    static readonly FANCY_BEDS: ResourcefulRegistry;
    static readonly COUNTERS: ResourcefulRegistry;
    static readonly CUPBOARDS: ResourcefulRegistry;
    static readonly DRAWERS: ResourcefulRegistry;
    static readonly SHELVES: ResourcefulRegistry;
    static readonly TRIMS: ResourcefulRegistry;
    static readonly PILLAR_TRIMS: ResourcefulRegistry;
    static readonly CORNER_TRIMS: ResourcefulRegistry;
    static readonly POTS: ResourcefulRegistry;
    static readonly TROPHIES: ResourcefulRegistry;
    static readonly CROCKERY: ResourcefulRegistry;
    static readonly CUPS: ResourcefulRegistry;
    static readonly PLATES: ResourcefulRegistry;
    static readonly BOWLS: ResourcefulRegistry;
    static readonly CROCKERY_COMBOS: ResourcefulRegistry;
    static readonly HAMMER: RegistryEntry;
    static readonly FANCY_PAINTING: RegistryEntry;
    static readonly OVEN: RegistryEntry;
    static readonly KITCHEN_HOOD: RegistryEntry;
    static readonly KITCHEN_HOOD_PIPE: RegistryEntry;
    static readonly BERRY_JAM_JAR: RegistryEntry;
    static readonly STACKABLE_BOOK: RegistryEntry;
    static readonly BLACK_CUSHION: RegistryEntry;
    static readonly BLUE_CUSHION: RegistryEntry;
    static readonly BROWN_CUSHION: RegistryEntry;
    static readonly CYAN_CUSHION: RegistryEntry;
    static readonly GRAY_CUSHION: RegistryEntry;
    static readonly GREEN_CUSHION: RegistryEntry;
    static readonly LIGHT_BLUE_CUSHION: RegistryEntry;
    static readonly LIGHT_GRAY_CUSHION: RegistryEntry;
    static readonly LIME_CUSHION: RegistryEntry;
    static readonly MAGENTA_CUSHION: RegistryEntry;
    static readonly ORANGE_CUSHION: RegistryEntry;
    static readonly PINK_CUSHION: RegistryEntry;
    static readonly PURPLE_CUSHION: RegistryEntry;
    static readonly RED_CUSHION: RegistryEntry;
    static readonly WHITE_CUSHION: RegistryEntry;
    static readonly YELLOW_CUSHION: RegistryEntry;
    static readonly BLACK_SHEET: RegistryEntry;
    static readonly BLUE_SHEET: RegistryEntry;
    static readonly BROWN_SHEET: RegistryEntry;
    static readonly CYAN_SHEET: RegistryEntry;
    static readonly GRAY_SHEET: RegistryEntry;
    static readonly GREEN_SHEET: RegistryEntry;
    static readonly LIGHT_BLUE_SHEET: RegistryEntry;
    static readonly LIGHT_GRAY_SHEET: RegistryEntry;
    static readonly LIME_SHEET: RegistryEntry;
    static readonly MAGENTA_SHEET: RegistryEntry;
    static readonly ORANGE_SHEET: RegistryEntry;
    static readonly PINK_SHEET: RegistryEntry;
    static readonly PURPLE_SHEET: RegistryEntry;
    static readonly RED_SHEET: RegistryEntry;
    static readonly WHITE_SHEET: RegistryEntry;
    static readonly YELLOW_SHEET: RegistryEntry;
    static readonly ACACIA_BENCH: RegistryEntry;
    static readonly BAMBOO_BENCH: RegistryEntry;
    static readonly BIRCH_BENCH: RegistryEntry;
    static readonly CHERRY_BENCH: RegistryEntry;
    static readonly CRIMSON_BENCH: RegistryEntry;
    static readonly DARK_OAK_BENCH: RegistryEntry;
    static readonly JUNGLE_BENCH: RegistryEntry;
    static readonly MANGROVE_BENCH: RegistryEntry;
    static readonly OAK_BENCH: RegistryEntry;
    static readonly SPRUCE_BENCH: RegistryEntry;
    static readonly WARPED_BENCH: RegistryEntry;
    static readonly BENCH: RegistryEntry;
    static readonly FROZEN_BENCH: RegistryEntry;
    static readonly ACACIA_COUCH: RegistryEntry;
    static readonly BAMBOO_COUCH: RegistryEntry;
    static readonly BIRCH_COUCH: RegistryEntry;
    static readonly CHERRY_COUCH: RegistryEntry;
    static readonly CRIMSON_COUCH: RegistryEntry;
    static readonly DARK_OAK_COUCH: RegistryEntry;
    static readonly JUNGLE_COUCH: RegistryEntry;
    static readonly MANGROVE_COUCH: RegistryEntry;
    static readonly OAK_COUCH: RegistryEntry;
    static readonly SPRUCE_COUCH: RegistryEntry;
    static readonly WARPED_COUCH: RegistryEntry;
    static readonly ACACIA_CHAIR: RegistryEntry;
    static readonly BAMBOO_CHAIR: RegistryEntry;
    static readonly BIRCH_CHAIR: RegistryEntry;
    static readonly CHERRY_CHAIR: RegistryEntry;
    static readonly CRIMSON_CHAIR: RegistryEntry;
    static readonly DARK_OAK_CHAIR: RegistryEntry;
    static readonly JUNGLE_CHAIR: RegistryEntry;
    static readonly MANGROVE_CHAIR: RegistryEntry;
    static readonly OAK_CHAIR: RegistryEntry;
    static readonly SPRUCE_CHAIR: RegistryEntry;
    static readonly WARPED_CHAIR: RegistryEntry;
    static readonly ACACIA_DINING_BENCH: RegistryEntry;
    static readonly BAMBOO_DINING_BENCH: RegistryEntry;
    static readonly BIRCH_DINING_BENCH: RegistryEntry;
    static readonly CHERRY_DINING_BENCH: RegistryEntry;
    static readonly CRIMSON_DINING_BENCH: RegistryEntry;
    static readonly DARK_OAK_DINING_BENCH: RegistryEntry;
    static readonly JUNGLE_DINING_BENCH: RegistryEntry;
    static readonly MANGROVE_DINING_BENCH: RegistryEntry;
    static readonly OAK_DINING_BENCH: RegistryEntry;
    static readonly SPRUCE_DINING_BENCH: RegistryEntry;
    static readonly WARPED_DINING_BENCH: RegistryEntry;
    static readonly ACACIA_SIDE_TABLE: RegistryEntry;
    static readonly BIRCH_SIDE_TABLE: RegistryEntry;
    static readonly DARK_OAK_SIDE_TABLE: RegistryEntry;
    static readonly JUNGLE_SIDE_TABLE: RegistryEntry;
    static readonly MANGROVE_SIDE_TABLE: RegistryEntry;
    static readonly OAK_SIDE_TABLE: RegistryEntry;
    static readonly SPRUCE_SIDE_TABLE: RegistryEntry;
    static readonly CRIMSON_SIDE_TABLE: RegistryEntry;
    static readonly WARPED_SIDE_TABLE: RegistryEntry;
    static readonly CHERRY_SIDE_TABLE: RegistryEntry;
    static readonly BAMBOO_SIDE_TABLE: RegistryEntry;
    static readonly ACACIA_DESK: RegistryEntry;
    static readonly BAMBOO_DESK: RegistryEntry;
    static readonly BIRCH_DESK: RegistryEntry;
    static readonly CHERRY_DESK: RegistryEntry;
    static readonly CRIMSON_DESK: RegistryEntry;
    static readonly DARK_OAK_DESK: RegistryEntry;
    static readonly JUNGLE_DESK: RegistryEntry;
    static readonly MANGROVE_DESK: RegistryEntry;
    static readonly OAK_DESK: RegistryEntry;
    static readonly SPRUCE_DESK: RegistryEntry;
    static readonly WARPED_DESK: RegistryEntry;
    static readonly ACACIA_NIGHTSTAND: RegistryEntry;
    static readonly BAMBOO_NIGHTSTAND: RegistryEntry;
    static readonly BIRCH_NIGHTSTAND: RegistryEntry;
    static readonly CHERRY_NIGHTSTAND: RegistryEntry;
    static readonly CRIMSON_NIGHTSTAND: RegistryEntry;
    static readonly DARK_OAK_NIGHTSTAND: RegistryEntry;
    static readonly JUNGLE_NIGHTSTAND: RegistryEntry;
    static readonly MANGROVE_NIGHTSTAND: RegistryEntry;
    static readonly OAK_NIGHTSTAND: RegistryEntry;
    static readonly SPRUCE_NIGHTSTAND: RegistryEntry;
    static readonly WARPED_NIGHTSTAND: RegistryEntry;
    static readonly ACACIA_TABLE: RegistryEntry;
    static readonly BAMBOO_TABLE: RegistryEntry;
    static readonly BIRCH_TABLE: RegistryEntry;
    static readonly CHERRY_TABLE: RegistryEntry;
    static readonly CRIMSON_TABLE: RegistryEntry;
    static readonly DARK_OAK_TABLE: RegistryEntry;
    static readonly JUNGLE_TABLE: RegistryEntry;
    static readonly MANGROVE_TABLE: RegistryEntry;
    static readonly OAK_TABLE: RegistryEntry;
    static readonly SPRUCE_TABLE: RegistryEntry;
    static readonly WARPED_TABLE: RegistryEntry;
    static readonly ACACIA_FANCY_BED: RegistryEntry;
    static readonly BAMBOO_FANCY_BED: RegistryEntry;
    static readonly BIRCH_FANCY_BED: RegistryEntry;
    static readonly CHERRY_FANCY_BED: RegistryEntry;
    static readonly CRIMSON_FANCY_BED: RegistryEntry;
    static readonly DARK_OAK_FANCY_BED: RegistryEntry;
    static readonly JUNGLE_FANCY_BED: RegistryEntry;
    static readonly MANGROVE_FANCY_BED: RegistryEntry;
    static readonly OAK_FANCY_BED: RegistryEntry;
    static readonly SPRUCE_FANCY_BED: RegistryEntry;
    static readonly WARPED_FANCY_BED: RegistryEntry;
    static readonly ACACIA_COUNTER: RegistryEntry;
    static readonly BAMBOO_COUNTER: RegistryEntry;
    static readonly BIRCH_COUNTER: RegistryEntry;
    static readonly CHERRY_COUNTER: RegistryEntry;
    static readonly CRIMSON_COUNTER: RegistryEntry;
    static readonly DARK_OAK_COUNTER: RegistryEntry;
    static readonly JUNGLE_COUNTER: RegistryEntry;
    static readonly MANGROVE_COUNTER: RegistryEntry;
    static readonly OAK_COUNTER: RegistryEntry;
    static readonly SPRUCE_COUNTER: RegistryEntry;
    static readonly WARPED_COUNTER: RegistryEntry;
    static readonly ACACIA_CUPBOARD: RegistryEntry;
    static readonly BAMBOO_CUPBOARD: RegistryEntry;
    static readonly BIRCH_CUPBOARD: RegistryEntry;
    static readonly CHERRY_CUPBOARD: RegistryEntry;
    static readonly CRIMSON_CUPBOARD: RegistryEntry;
    static readonly DARK_OAK_CUPBOARD: RegistryEntry;
    static readonly JUNGLE_CUPBOARD: RegistryEntry;
    static readonly MANGROVE_CUPBOARD: RegistryEntry;
    static readonly OAK_CUPBOARD: RegistryEntry;
    static readonly SPRUCE_CUPBOARD: RegistryEntry;
    static readonly WARPED_CUPBOARD: RegistryEntry;
    static readonly ACACIA_DRAWER: RegistryEntry;
    static readonly BAMBOO_DRAWER: RegistryEntry;
    static readonly BIRCH_DRAWER: RegistryEntry;
    static readonly CHERRY_DRAWER: RegistryEntry;
    static readonly CRIMSON_DRAWER: RegistryEntry;
    static readonly DARK_OAK_DRAWER: RegistryEntry;
    static readonly JUNGLE_DRAWER: RegistryEntry;
    static readonly MANGROVE_DRAWER: RegistryEntry;
    static readonly OAK_DRAWER: RegistryEntry;
    static readonly SPRUCE_DRAWER: RegistryEntry;
    static readonly WARPED_DRAWER: RegistryEntry;
    static readonly ACACIA_SHELF: RegistryEntry;
    static readonly BAMBOO_SHELF: RegistryEntry;
    static readonly BIRCH_SHELF: RegistryEntry;
    static readonly CHERRY_SHELF: RegistryEntry;
    static readonly CRIMSON_SHELF: RegistryEntry;
    static readonly DARK_OAK_SHELF: RegistryEntry;
    static readonly JUNGLE_SHELF: RegistryEntry;
    static readonly MANGROVE_SHELF: RegistryEntry;
    static readonly OAK_SHELF: RegistryEntry;
    static readonly SPRUCE_SHELF: RegistryEntry;
    static readonly WARPED_SHELF: RegistryEntry;
    static readonly ACACIA_PILLAR_TRIM: RegistryEntry;
    static readonly ACACIA_CORNER_TRIM: RegistryEntry;
    static readonly BAMBOO_PILLAR_TRIM: RegistryEntry;
    static readonly BAMBOO_CORNER_TRIM: RegistryEntry;
    static readonly BIRCH_PILLAR_TRIM: RegistryEntry;
    static readonly BIRCH_CORNER_TRIM: RegistryEntry;
    static readonly CHERRY_PILLAR_TRIM: RegistryEntry;
    static readonly CHERRY_CORNER_TRIM: RegistryEntry;
    static readonly CRIMSON_PILLAR_TRIM: RegistryEntry;
    static readonly CRIMSON_CORNER_TRIM: RegistryEntry;
    static readonly DARK_OAK_PILLAR_TRIM: RegistryEntry;
    static readonly DARK_OAK_CORNER_TRIM: RegistryEntry;
    static readonly JUNGLE_PILLAR_TRIM: RegistryEntry;
    static readonly JUNGLE_CORNER_TRIM: RegistryEntry;
    static readonly MANGROVE_PILLAR_TRIM: RegistryEntry;
    static readonly MANGROVE_CORNER_TRIM: RegistryEntry;
    static readonly OAK_PILLAR_TRIM: RegistryEntry;
    static readonly OAK_CORNER_TRIM: RegistryEntry;
    static readonly SPRUCE_PILLAR_TRIM: RegistryEntry;
    static readonly SPRUCE_CORNER_TRIM: RegistryEntry;
    static readonly WARPED_PILLAR_TRIM: RegistryEntry;
    static readonly WARPED_CORNER_TRIM: RegistryEntry;
    static readonly ANDESITE_PILLAR_TRIM: RegistryEntry;
    static readonly ANDESITE_CORNER_TRIM: RegistryEntry;
    static readonly BLACKSTONE_PILLAR_TRIM: RegistryEntry;
    static readonly BLACKSTONE_CORNER_TRIM: RegistryEntry;
    static readonly BRICKS_PILLAR_TRIM: RegistryEntry;
    static readonly BRICKS_CORNER_TRIM: RegistryEntry;
    static readonly CALCITE_PILLAR_TRIM: RegistryEntry;
    static readonly CALCITE_CORNER_TRIM: RegistryEntry;
    static readonly DEEPSLATE_PILLAR_TRIM: RegistryEntry;
    static readonly DEEPSLATE_CORNER_TRIM: RegistryEntry;
    static readonly DIORITE_PILLAR_TRIM: RegistryEntry;
    static readonly DIORITE_CORNER_TRIM: RegistryEntry;
    static readonly DRIPSTONE_PILLAR_TRIM: RegistryEntry;
    static readonly DRIPSTONE_CORNER_TRIM: RegistryEntry;
    static readonly GRANITE_PILLAR_TRIM: RegistryEntry;
    static readonly GRANITE_CORNER_TRIM: RegistryEntry;
    static readonly QUARTZ_PILLAR_TRIM: RegistryEntry;
    static readonly QUARTZ_CORNER_TRIM: RegistryEntry;
    static readonly STONE_PILLAR_TRIM: RegistryEntry;
    static readonly STONE_CORNER_TRIM: RegistryEntry;
    static readonly SANDSTONE_PILLAR_TRIM: RegistryEntry;
    static readonly SANDSTONE_CORNER_TRIM: RegistryEntry;
    static readonly RED_SANDSTONE_PILLAR_TRIM: RegistryEntry;
    static readonly RED_SANDSTONE_CORNER_TRIM: RegistryEntry;
    static readonly TERRACOTTA_THIN_POT: RegistryEntry;
    static readonly TERRACOTTA_MEDIUM_POT: RegistryEntry;
    static readonly TERRACOTTA_WIDE_POT: RegistryEntry;
    static readonly TERRACOTTA_THICK_POT: RegistryEntry;
    static readonly WHITE_GLAZED_THIN_POT: RegistryEntry;
    static readonly WHITE_GLAZED_MEDIUM_POT: RegistryEntry;
    static readonly WHITE_GLAZED_WIDE_POT: RegistryEntry;
    static readonly WHITE_GLAZED_THICK_POT: RegistryEntry;
    static readonly BLUE_GLAZED_THIN_POT: RegistryEntry;
    static readonly BLUE_GLAZED_MEDIUM_POT: RegistryEntry;
    static readonly BLUE_GLAZED_WIDE_POT: RegistryEntry;
    static readonly BLUE_GLAZED_THICK_POT: RegistryEntry;
    static readonly GOLDEN_THIN_POT: RegistryEntry;
    static readonly GOLDEN_MEDIUM_POT: RegistryEntry;
    static readonly GOLDEN_WIDE_POT: RegistryEntry;
    static readonly GOLDEN_THICK_POT: RegistryEntry;
    static readonly BEAR_TROPHY: RegistryEntry;
    static readonly BLAZE_TROPHY: RegistryEntry;
    static readonly FOX_TROPHY: RegistryEntry;
    static readonly GOAT_TROPHY: RegistryEntry;
    static readonly PUFFERFISH_TROPHY: RegistryEntry;
    static readonly SALMON_TROPHY: RegistryEntry;
    static readonly SILVERFISH_TROPHY: RegistryEntry;
    static readonly SKELETON_HORSE_TROPHY: RegistryEntry;
    static readonly SPIDER_TROPHY: RegistryEntry;
    static readonly TROPICAL_FISH_TROPHY: RegistryEntry;
    static readonly WITHER_SKELETON_TROPHY: RegistryEntry;
    static readonly WOLF_TROPHY: RegistryEntry;
    static readonly PHANTOM_TROPHY: RegistryEntry;
    static readonly CREEPER_TROPHY: RegistryEntry;
    static readonly SKELETON_TROPHY: RegistryEntry;
    static readonly EVOKER_TROPHY: RegistryEntry;
    static readonly PILLAGER_TROPHY: RegistryEntry;
    static readonly VINDICATOR_TROPHY: RegistryEntry;
    static readonly WITCH_TROPHY: RegistryEntry;
    static readonly WHITE_CUP: RegistryEntry;
    static readonly YELLOW_CUP: RegistryEntry;
    static readonly BLUE_CUP: RegistryEntry;
    static readonly WOOD_CUP: RegistryEntry;
    static readonly TERRACOTTA_CUP: RegistryEntry;
    static readonly WHITE_PLATE: RegistryEntry;
    static readonly YELLOW_PLATE: RegistryEntry;
    static readonly BLUE_PLATE: RegistryEntry;
    static readonly WOOD_PLATE: RegistryEntry;
    static readonly TERRACOTTA_PLATE: RegistryEntry;
    static readonly WHITE_BOWL: RegistryEntry;
    static readonly YELLOW_BOWL: RegistryEntry;
    static readonly BLUE_BOWL: RegistryEntry;
    static readonly WOOD_BOWL: RegistryEntry;
    static readonly TERRACOTTA_BOWL: RegistryEntry;
    static readonly WHITE_CROCKERY_COMBO: RegistryEntry;
    static readonly YELLOW_CROCKERY_COMBO: RegistryEntry;
    static readonly BLUE_CROCKERY_COMBO: RegistryEntry;
    static readonly WOOD_CROCKERY_COMBO: RegistryEntry;
    static readonly TERRACOTTA_CROCKERY_COMBO: RegistryEntry;
  }


  class ModSoundEvents {
    static readonly SOUND_EVENTS: ResourcefulRegistry;
    static readonly HAMMER_WOOD: RegistryEntry;
    static readonly HAMMER_STONE: RegistryEntry;
  }

}

declare module 'earth.terrarium.handcrafted.common.tags' {
  import { TagKey } from 'net.minecraft.tags';

  class ModBlockTags {
    static readonly TABLE_CONNECTABLE: TagKey;
  }


  class ModItemTags {
    static readonly CUSHIONS: TagKey;
    static readonly SHEETS: TagKey;
    static readonly COUNTER_MATERIALS: TagKey;
    static readonly TRIM_MATERIALS: TagKey;
    static readonly CHESTS: TagKey;
  }


  class ModPaintingVariantTags {
    static readonly PAINTINGS: TagKey;
  }

}

declare module 'earth.terrarium.handcrafted.common.utils' {
  import { ItemInteractionResult } from 'net.minecraft.world';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { EnumProperty } from 'net.minecraft.world.level.block.state.properties';
  import { OptionalColorProperty, ColorProperty, CounterProperty } from 'earth.terrarium.handcrafted.common.blocks.base.properties';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  class InteractionUtils {
    static interactCounter(state: BlockState, level: Level, pos: BlockPos, player: Player, stack: ItemStack, counterProperty: EnumProperty<CounterProperty>): ItemInteractionResult;
    static interactCushion(state: BlockState, level: Level, pos: BlockPos, player: Player, stack: ItemStack, colorProperty: EnumProperty<ColorProperty>): ItemInteractionResult;
    static interactOptionalCushion(state: BlockState, level: Level, pos: BlockPos, player: Player, stack: ItemStack, colorProperty: EnumProperty<OptionalColorProperty>): ItemInteractionResult;
    static interactOptionalSheet(state: BlockState, level: Level, pos: BlockPos, player: Player, stack: ItemStack, colorProperty: EnumProperty<OptionalColorProperty>): ItemInteractionResult;
    static interactSheet(state: BlockState, level: Level, pos: BlockPos, player: Player, stack: ItemStack, colorProperty: EnumProperty<ColorProperty>): ItemInteractionResult;
  }


  class TooltipUtils {
    static addDescriptionComponent(tooltipComponents: Component[], ...description: Component[]): void;
  }

}

declare module 'earth.terrarium.handcrafted' {
  class Handcrafted {
    static readonly MOD_ID: string;
    static init(): void;
  }

}

declare module 'earth.terrarium.handcrafted.mixins.common' {
  class BlockElementMixin {
  }

}

declare module 'earth.terrarium.handcrafted.neoforge' {
  class HandcraftedNeoForge {
    constructor();
  }

}