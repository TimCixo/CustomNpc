declare module 'com.progwml6.ironchest.client' {
  import { ModelLayerLocation } from 'net.minecraft.client.model.geom';
  import { RegisterLayerDefinitions, RegisterRenderers } from 'EntityRenderersEvent';
  import { RegisterMenuScreensEvent } from 'net.neoforged.neoforge.client.event';

  class IronChestsClientRegistration {
    static readonly IRON_CHEST: ModelLayerLocation;
    static registerEntityRenderers(event: RegisterRenderers): void;
    static registerLayer(event: RegisterLayerDefinitions): void;
    static registerScreens(event: RegisterMenuScreensEvent): void;
  }

}

declare module 'com.progwml6.ironchest.client.model.inventory' {
  import { BlockEntityWithoutLevelRenderer, MultiBufferSource } from 'net.minecraft.client.renderer';
  import { BlockEntityRenderDispatcher } from 'net.minecraft.client.renderer.blockentity';
  import { EntityModelSet } from 'net.minecraft.client.model.geom';
  import { Supplier } from 'java.util.function';
  import { ItemStack, ItemDisplayContext } from 'net.minecraft.world.item';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { Vector3f } from 'org.joml';

  interface IronChestItemStackRenderer<T extends BlockEntity = any> extends BlockEntityWithoutLevelRenderer {}
  class IronChestItemStackRenderer<T extends BlockEntity = any> extends BlockEntityWithoutLevelRenderer {
    constructor(renderDispatcher: BlockEntityRenderDispatcher, modelSet: EntityModelSet, te: Supplier<T>);
    renderByItem(itemStackIn: ItemStack, transformType: ItemDisplayContext, matrixStackIn: PoseStack, bufferIn: MultiBufferSource, combinedLightIn: number, combinedOverlayIn: number): void;
  }


  class ModelItem {
    constructor(center: Vector3f, size: number);
    get center(): Vector3f;
    get centerScaled(): Vector3f;
    get size(): number;
    get sizeScaled(): number;
  }

}

declare module 'com.progwml6.ironchest.client.model' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IronChestsTypes } from 'com.progwml6.ironchest.common.block';

  class IronChestsModels {
    static readonly IRON_CHEST_LOCATION: ResourceLocation;
    static readonly GOLD_CHEST_LOCATION: ResourceLocation;
    static readonly DIAMOND_CHEST_LOCATION: ResourceLocation;
    static readonly COPPER_CHEST_LOCATION: ResourceLocation;
    static readonly CRYSTAL_CHEST_LOCATION: ResourceLocation;
    static readonly OBSIDIAN_CHEST_LOCATION: ResourceLocation;
    static readonly DIRT_CHEST_LOCATION: ResourceLocation;
    static readonly VANILLA_CHEST_LOCATION: ResourceLocation;
    static readonly TRAPPED_IRON_CHEST_LOCATION: ResourceLocation;
    static readonly TRAPPED_GOLD_CHEST_LOCATION: ResourceLocation;
    static readonly TRAPPED_DIAMOND_CHEST_LOCATION: ResourceLocation;
    static readonly TRAPPED_COPPER_CHEST_LOCATION: ResourceLocation;
    static readonly TRAPPED_CRYSTAL_CHEST_LOCATION: ResourceLocation;
    static readonly TRAPPED_OBSIDIAN_CHEST_LOCATION: ResourceLocation;
    static readonly TRAPPED_DIRT_CHEST_LOCATION: ResourceLocation;
    static readonly TRAPPED_VANILLA_CHEST_LOCATION: ResourceLocation;
    static chooseChestTexture(type: IronChestsTypes, trapped: boolean): ResourceLocation;
  }

}

declare module 'com.progwml6.ironchest.client.render' {
  import { BlockEntityRenderer } from 'net.minecraft.client.renderer.blockentity';
  import { Context } from 'BlockEntityRendererProvider';
  import { LayerDefinition } from 'net.minecraft.client.model.geom.builders';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ModelItem } from 'com.progwml6.ironchest.client.model.inventory';
  import { AABB } from 'net.minecraft.world.phys';

  interface IronChestRenderer<T extends BlockEntity = any> extends BlockEntityRenderer<T> {}
  class IronChestRenderer<T extends BlockEntity = any> extends BlockEntityRenderer<T> {
    constructor(context: Context);
    static createLayerDefinition(): LayerDefinition;
    getRenderBoundingBox(blockEntity: T): AABB;
    render(tileEntityIn: T, partialTicks: number, poseStack: PoseStack, bufferSource: MultiBufferSource, combinedLightIn: number, combinedOverlayIn: number): void;
    static renderItem(matrices: PoseStack, buffer: MultiBufferSource, item: ItemStack, modelItem: ModelItem, rotation: number, light: number): void;
  }

}

declare module 'com.progwml6.ironchest.client.screen' {
  import { AbstractContainerScreen, MenuAccess } from 'net.minecraft.client.gui.screens.inventory';
  import { IronChestMenu } from 'com.progwml6.ironchest.common.inventory';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface IronChestScreen extends MenuAccess<IronChestMenu>, AbstractContainerScreen<IronChestMenu> {}
  class IronChestScreen extends MenuAccess<IronChestMenu> {
    constructor(ironChestMenu: IronChestMenu, playerInventory: Inventory, title: Component);
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }

}

declare module 'com.progwml6.ironchest.common.ai' {
  import { CatSitOnBlockGoal } from 'net.minecraft.world.entity.ai.goal';
  import { Cat } from 'net.minecraft.world.entity.animal';

  class CatsSitOnChestsHandler {
  }


  interface IronChestCatSitOnBlockGoal extends CatSitOnBlockGoal {}
  class IronChestCatSitOnBlockGoal extends CatSitOnBlockGoal {
    constructor(cat: Cat, speedModifier: number);
  }

}

declare module 'com.progwml6.ironchest.common.block.entity' {
  import { NonNullList, BlockPos } from 'net.minecraft.core';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IronChestsTypes } from 'com.progwml6.ironchest.common.block';
  import { Level } from 'net.minecraft.world.level';
  import { DeferredRegister, DeferredHolder } from 'net.neoforged.neoforge.registries';

  class ICrystalChest {
    buildItemStackDataList(): NonNullList<ItemStack>;
    get chestLevel(): Level;
    get chestType(): IronChestsTypes;
    get chestWorldPosition(): BlockPos;
    get currentItems(): NonNullList<ItemStack>;
    get hadStuff(): boolean;
    get topItems(): NonNullList<ItemStack>;
    receiveMessageFromServer(var1: NonNullList<ItemStack>): void;
    sendTopStacksPacket(): void;
    set hadStuff(var1: boolean);
    sortTopStacks(): void;
  }


  class IronChestsBlockEntityTypes {
    static readonly BLOCK_ENTITIES: DeferredRegister;
    static readonly IRON_CHEST: DeferredHolder;
    static readonly GOLD_CHEST: DeferredHolder;
    static readonly DIAMOND_CHEST: DeferredHolder;
    static readonly COPPER_CHEST: DeferredHolder;
    static readonly CRYSTAL_CHEST: DeferredHolder;
    static readonly OBSIDIAN_CHEST: DeferredHolder;
    static readonly DIRT_CHEST: DeferredHolder;
    static readonly TRAPPED_IRON_CHEST: DeferredHolder;
    static readonly TRAPPED_GOLD_CHEST: DeferredHolder;
    static readonly TRAPPED_DIAMOND_CHEST: DeferredHolder;
    static readonly TRAPPED_COPPER_CHEST: DeferredHolder;
    static readonly TRAPPED_CRYSTAL_CHEST: DeferredHolder;
    static readonly TRAPPED_OBSIDIAN_CHEST: DeferredHolder;
    static readonly TRAPPED_DIRT_CHEST: DeferredHolder;
  }

}

declare module 'com.progwml6.ironchest.common.block' {
  import { Blocks, Items } from 'DeferredRegister';
  import { DeferredBlock } from 'net.neoforged.neoforge.registries';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { Block } from 'net.minecraft.world.level.block';
  import { AbstractIronChestBlockEntity } from 'com.progwml6.ironchest.common.block.regular.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  class IronChestsBlocks {
    static readonly BLOCKS: Blocks;
    static readonly ITEMS: Items;
    static readonly IRON_CHEST: DeferredBlock;
    static readonly GOLD_CHEST: DeferredBlock;
    static readonly DIAMOND_CHEST: DeferredBlock;
    static readonly COPPER_CHEST: DeferredBlock;
    static readonly CRYSTAL_CHEST: DeferredBlock;
    static readonly OBSIDIAN_CHEST: DeferredBlock;
    static readonly DIRT_CHEST: DeferredBlock;
    static readonly TRAPPED_IRON_CHEST: DeferredBlock;
    static readonly TRAPPED_GOLD_CHEST: DeferredBlock;
    static readonly TRAPPED_DIAMOND_CHEST: DeferredBlock;
    static readonly TRAPPED_COPPER_CHEST: DeferredBlock;
    static readonly TRAPPED_CRYSTAL_CHEST: DeferredBlock;
    static readonly TRAPPED_OBSIDIAN_CHEST: DeferredBlock;
    static readonly TRAPPED_DIRT_CHEST: DeferredBlock;
  }


  interface IronChestsTypes extends Enum<IronChestsTypes> {}
  class IronChestsTypes extends Enum<IronChestsTypes> {
    static readonly IRON: IronChestsTypes;
    static readonly GOLD: IronChestsTypes;
    static readonly DIAMOND: IronChestsTypes;
    static readonly COPPER: IronChestsTypes;
    static readonly CRYSTAL: IronChestsTypes;
    static readonly OBSIDIAN: IronChestsTypes;
    static readonly DIRT: IronChestsTypes;
    static readonly WOOD: IronChestsTypes;
    static get(type: IronChestsTypes): Block[];
    get englishName(): string;
    get id(): string;
    get rowCount(): number;
    get serializedName(): string;
    isTransparent(): boolean;
    makeEntity(blockPos: BlockPos, blockState: BlockState, trapped: boolean): AbstractIronChestBlockEntity;
    static valueOf(name: string): IronChestsTypes;
    static values(): IronChestsTypes[];
  }

}

declare module 'com.progwml6.ironchest.common.block.regular' {
  import { BaseEntityBlock, SimpleWaterloggedBlock, RenderShape, Rotation, Mirror, Block } from 'net.minecraft.world.level.block';
  import { DirectionProperty, BooleanProperty } from 'net.minecraft.world.level.block.state.properties';
  import { Properties } from 'BlockBehaviour';
  import { Supplier } from 'java.util.function';
  import { BlockEntityType, LidBlockEntity, BlockEntityTicker, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { AbstractIronChestBlockEntity } from 'com.progwml6.ironchest.common.block.regular.entity';
  import { IronChestsTypes } from 'com.progwml6.ironchest.common.block';
  import { BlockType, NeighborCombineResult, Combiner } from 'DoubleBlockCombiner';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Direction, BlockPos } from 'net.minecraft.core';
  import { LevelAccessor, BlockGetter, Level } from 'net.minecraft.world.level';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { InteractionResult, Container, MenuProvider } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BlockHitResult } from 'net.minecraft.world.phys';
  import { Float2FloatFunction } from 'it.unimi.dsi.fastutil.floats';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { RandomSource } from 'net.minecraft.util';
  import { Item } from 'net.minecraft.world.item';
  import { MapCodec } from 'com.mojang.serialization';

  interface AbstractIronChestBlock extends SimpleWaterloggedBlock, BaseEntityBlock {}
  class AbstractIronChestBlock extends SimpleWaterloggedBlock {
    static readonly FACING: DirectionProperty;
    static readonly WATERLOGGED: BooleanProperty;
    constructor(properties: Properties, blockEntityType: Supplier<BlockEntityType<AbstractIronChestBlockEntity>>, type: IronChestsTypes);
    acceptDouble(blockEntityOne: AbstractIronChestBlockEntity, blockEntityTwo: AbstractIronChestBlockEntity): Float2FloatFunction;
    acceptNone(): Float2FloatFunction;
    acceptSingle(blockEntity: AbstractIronChestBlockEntity): Float2FloatFunction;
    blockEntityType(): BlockEntityType<AbstractIronChestBlockEntity>;
    combine(blockState: BlockState, level: Level, blockPos: BlockPos, ignoreBlockedChest: boolean): NeighborCombineResult<AbstractIronChestBlockEntity>;
    get type(): IronChestsTypes;
    getAnalogOutputSignal(blockState: BlockState, level: Level, blockPos: BlockPos): number;
    static getBlockType(blockState: BlockState): BlockType;
    static getConnectedDirection(blockState: BlockState): Direction;
    static getContainer(chestBlock: AbstractIronChestBlock, blockState: BlockState, level: Level, blockPos: BlockPos, ignoreBlockedChest: boolean): Container;
    getFluidState(blockState: BlockState): FluidState;
    getMenuProvider(blockState: BlockState, level: Level, blockPos: BlockPos): MenuProvider;
    getRenderShape(state: BlockState): RenderShape;
    getShape(blockState: BlockState, blockGetter: BlockGetter, blockPos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    getTicker<T extends BlockEntity>(level: Level, blockState: BlockState, blockEntityType: BlockEntityType<T>): BlockEntityTicker<T>;
    static getTypeFromBlock(block: Block): IronChestsTypes;
    static getTypeFromItem(itemIn: Item): IronChestsTypes;
    hasAnalogOutputSignal(blockState: BlockState): boolean;
    static isChestBlockedAt(levelAccessor: LevelAccessor, blockPos: BlockPos): boolean;
    mirror(blockState: BlockState, mirror: Mirror): BlockState;
    onRemove(blockState: BlockState, level: Level, blockPos: BlockPos, newState: BlockState, isMoving: boolean): void;
    static opennessCombiner(lidBlockEntity: LidBlockEntity): Combiner<AbstractIronChestBlockEntity, Float2FloatFunction>;
    rotate(blockState: BlockState, rotation: Rotation): BlockState;
    tick(blockState: BlockState, serverLevel: ServerLevel, blockPos: BlockPos, random: RandomSource): void;
    updateShape(blockState: BlockState, direction: Direction, facingState: BlockState, levelAccessor: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useWithoutItem(pState: BlockState, pLevel: Level, pPos: BlockPos, pPlayer: Player, pHitResult: BlockHitResult): InteractionResult;
  }


  interface CopperChestBlock extends AbstractIronChestBlock {}
  class CopperChestBlock extends AbstractIronChestBlock {
    static readonly CODEC: MapCodec;
    constructor(properties: Properties);
    newBlockEntity(blockPos: BlockPos, blockState: BlockState): BlockEntity;
  }


  interface CrystalChestBlock extends AbstractIronChestBlock {}
  class CrystalChestBlock extends AbstractIronChestBlock {
    static readonly CODEC: MapCodec;
    constructor(properties: Properties);
    getTicker<T extends BlockEntity>(level: Level, blockState: BlockState, blockEntityType: BlockEntityType<T>): BlockEntityTicker<T>;
    newBlockEntity(blockPos: BlockPos, blockState: BlockState): BlockEntity;
  }


  interface DiamondChestBlock extends AbstractIronChestBlock {}
  class DiamondChestBlock extends AbstractIronChestBlock {
    static readonly CODEC: MapCodec;
    constructor(properties: Properties);
    newBlockEntity(blockPos: BlockPos, blockState: BlockState): BlockEntity;
  }


  interface DirtChestBlock extends AbstractIronChestBlock {}
  class DirtChestBlock extends AbstractIronChestBlock {
    static readonly CODEC: MapCodec;
    constructor(properties: Properties);
    newBlockEntity(blockPos: BlockPos, blockState: BlockState): BlockEntity;
  }


  interface GoldChestBlock extends AbstractIronChestBlock {}
  class GoldChestBlock extends AbstractIronChestBlock {
    static readonly CODEC: MapCodec;
    constructor(properties: Properties);
    newBlockEntity(blockPos: BlockPos, blockState: BlockState): BlockEntity;
  }


  interface IronChestBlock extends AbstractIronChestBlock {}
  class IronChestBlock extends AbstractIronChestBlock {
    static readonly CODEC: MapCodec;
    constructor(properties: Properties);
    newBlockEntity(blockPos: BlockPos, blockState: BlockState): BlockEntity;
  }


  interface ObsidianChestBlock extends AbstractIronChestBlock {}
  class ObsidianChestBlock extends AbstractIronChestBlock {
    static readonly CODEC: MapCodec;
    constructor(properties: Properties);
    newBlockEntity(blockPos: BlockPos, blockState: BlockState): BlockEntity;
  }

}

declare module 'com.progwml6.ironchest.common.block.regular.entity' {
  import { RandomizableContainerBlockEntity, LidBlockEntity } from 'net.minecraft.world.level.block.entity';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { Level, BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos, NonNullList } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IronChestsTypes } from 'com.progwml6.ironchest.common.block';
  import { Block } from 'net.minecraft.world.level.block';
  import { ICrystalChest } from 'com.progwml6.ironchest.common.block.entity';

  interface AbstractIronChestBlockEntity extends LidBlockEntity, RandomizableContainerBlockEntity {}
  class AbstractIronChestBlockEntity extends LidBlockEntity {
    get blockToUse(): Block;
    get chestType(): IronChestsTypes;
    get containerSize(): number;
    get items(): NonNullList<ItemStack>;
    static getOpenCount(blockGetter: BlockGetter, blockPos: BlockPos): number;
    getOpenNess(partialTicks: number): number;
    static lidAnimateTick(level: Level, blockPos: BlockPos, blockState: BlockState, chestBlockEntity: AbstractIronChestBlockEntity): void;
    loadAdditional(pTag: CompoundTag, pRegistries: Provider): void;
    recheckOpen(): void;
    removeAdornments(): void;
    saveAdditional(pTag: CompoundTag, pRegistries: Provider): void;
    set items(itemsIn: NonNullList<ItemStack>);
    startOpen(player: Player): void;
    stopOpen(player: Player): void;
    triggerEvent(id: number, type: number): boolean;
  }


  interface CopperChestBlockEntity extends AbstractIronChestBlockEntity {}
  class CopperChestBlockEntity extends AbstractIronChestBlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
  }


  interface CrystalChestBlockEntity extends ICrystalChest, AbstractIronChestBlockEntity {}
  class CrystalChestBlockEntity extends ICrystalChest {
    constructor(blockPos: BlockPos, blockState: BlockState);
    get chestLevel(): Level;
    get chestWorldPosition(): BlockPos;
    get currentItems(): NonNullList<ItemStack>;
    get hadStuff(): boolean;
    get topItems(): NonNullList<ItemStack>;
    getItem(index: number): ItemStack;
    receiveMessageFromServer(topStacks: NonNullList<ItemStack>): void;
    set hadStuff(hadStuff: boolean);
    setItems(contents: NonNullList<ItemStack>): void;
    static tick(level: Level, blockPos: BlockPos, blockState: BlockState, chestBlockEntity: AbstractIronChestBlockEntity): void;
  }


  interface DiamondChestBlockEntity extends AbstractIronChestBlockEntity {}
  class DiamondChestBlockEntity extends AbstractIronChestBlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
  }


  interface DirtChestBlockEntity extends AbstractIronChestBlockEntity {}
  class DirtChestBlockEntity extends AbstractIronChestBlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
    removeAdornments(): void;
    removeComponentsFromTag(pTag: CompoundTag): void;
    saveAdditional(pTag: CompoundTag, pRegistries: Provider): void;
  }


  interface GoldChestBlockEntity extends AbstractIronChestBlockEntity {}
  class GoldChestBlockEntity extends AbstractIronChestBlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
  }


  interface IronChestBlockEntity extends AbstractIronChestBlockEntity {}
  class IronChestBlockEntity extends AbstractIronChestBlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
  }


  interface ObsidianChestBlockEntity extends AbstractIronChestBlockEntity {}
  class ObsidianChestBlockEntity extends AbstractIronChestBlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
  }

}

declare module 'com.progwml6.ironchest.common.block.trapped' {
  import { AbstractIronChestBlock } from 'com.progwml6.ironchest.common.block.regular';
  import { Properties } from 'BlockBehaviour';
  import { Supplier } from 'java.util.function';
  import { BlockEntityType, BlockEntity, BlockEntityTicker } from 'net.minecraft.world.level.block.entity';
  import { AbstractIronChestBlockEntity } from 'com.progwml6.ironchest.common.block.regular.entity';
  import { IronChestsTypes } from 'com.progwml6.ironchest.common.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockGetter, Level } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { MapCodec } from 'com.mojang.serialization';

  interface AbstractTrappedIronChestBlock extends AbstractIronChestBlock {}
  class AbstractTrappedIronChestBlock extends AbstractIronChestBlock {
    constructor(properties: Properties, blockEntityType: Supplier<BlockEntityType<AbstractIronChestBlockEntity>>, type: IronChestsTypes);
    getDirectSignal(blockState: BlockState, blockGetter: BlockGetter, blockPos: BlockPos, direction: Direction): number;
    getSignal(blockState: BlockState, blockGetter: BlockGetter, blockPos: BlockPos, direction: Direction): number;
    isSignalSource(blockState: BlockState): boolean;
  }


  interface TrappedCopperChestBlock extends AbstractTrappedIronChestBlock {}
  class TrappedCopperChestBlock extends AbstractTrappedIronChestBlock {
    static readonly CODEC: MapCodec;
    constructor(properties: Properties);
    newBlockEntity(blockPos: BlockPos, blockState: BlockState): BlockEntity;
  }


  interface TrappedCrystalChestBlock extends AbstractTrappedIronChestBlock {}
  class TrappedCrystalChestBlock extends AbstractTrappedIronChestBlock {
    static readonly CODEC: MapCodec;
    constructor(properties: Properties);
    getTicker<T extends BlockEntity>(level: Level, blockState: BlockState, blockEntityType: BlockEntityType<T>): BlockEntityTicker<T>;
    newBlockEntity(blockPos: BlockPos, blockState: BlockState): BlockEntity;
  }


  interface TrappedDiamondChestBlock extends AbstractTrappedIronChestBlock {}
  class TrappedDiamondChestBlock extends AbstractTrappedIronChestBlock {
    static readonly CODEC: MapCodec;
    constructor(properties: Properties);
    newBlockEntity(blockPos: BlockPos, blockState: BlockState): BlockEntity;
  }


  interface TrappedDirtChestBlock extends AbstractTrappedIronChestBlock {}
  class TrappedDirtChestBlock extends AbstractTrappedIronChestBlock {
    static readonly CODEC: MapCodec;
    constructor(properties: Properties);
    newBlockEntity(blockPos: BlockPos, blockState: BlockState): BlockEntity;
  }


  interface TrappedGoldChestBlock extends AbstractTrappedIronChestBlock {}
  class TrappedGoldChestBlock extends AbstractTrappedIronChestBlock {
    static readonly CODEC: MapCodec;
    constructor(properties: Properties);
    newBlockEntity(blockPos: BlockPos, blockState: BlockState): BlockEntity;
  }


  interface TrappedIronChestBlock extends AbstractTrappedIronChestBlock {}
  class TrappedIronChestBlock extends AbstractTrappedIronChestBlock {
    static readonly CODEC: MapCodec;
    constructor(properties: Properties);
    newBlockEntity(blockPos: BlockPos, blockState: BlockState): BlockEntity;
  }


  interface TrappedObsidianChestBlock extends AbstractTrappedIronChestBlock {}
  class TrappedObsidianChestBlock extends AbstractTrappedIronChestBlock {
    static readonly CODEC: MapCodec;
    constructor(properties: Properties);
    newBlockEntity(blockPos: BlockPos, blockState: BlockState): BlockEntity;
  }

}

declare module 'com.progwml6.ironchest.common.block.trapped.entity' {
  import { AbstractIronChestBlockEntity } from 'com.progwml6.ironchest.common.block.regular.entity';
  import { BlockPos, NonNullList } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { ICrystalChest } from 'com.progwml6.ironchest.common.block.entity';
  import { Level } from 'net.minecraft.world.level';
  import { ItemStack } from 'net.minecraft.world.item';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';

  interface AbstractTrappedIronChestBlockEntity extends AbstractIronChestBlockEntity {}
  class AbstractTrappedIronChestBlockEntity extends AbstractIronChestBlockEntity {
  }


  interface TrappedCopperChestBlockEntity extends AbstractTrappedIronChestBlockEntity {}
  class TrappedCopperChestBlockEntity extends AbstractTrappedIronChestBlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
  }


  interface TrappedCrystalChestBlockEntity extends ICrystalChest, AbstractTrappedIronChestBlockEntity {}
  class TrappedCrystalChestBlockEntity extends ICrystalChest {
    constructor(blockPos: BlockPos, blockState: BlockState);
    get chestLevel(): Level;
    get chestWorldPosition(): BlockPos;
    get currentItems(): NonNullList<ItemStack>;
    get hadStuff(): boolean;
    get topItems(): NonNullList<ItemStack>;
    getItem(index: number): ItemStack;
    receiveMessageFromServer(topStacks: NonNullList<ItemStack>): void;
    set hadStuff(hadStuff: boolean);
    setItems(contents: NonNullList<ItemStack>): void;
    static tick(level: Level, blockPos: BlockPos, blockState: BlockState, chestBlockEntity: AbstractIronChestBlockEntity): void;
  }


  interface TrappedDiamondChestBlockEntity extends AbstractTrappedIronChestBlockEntity {}
  class TrappedDiamondChestBlockEntity extends AbstractTrappedIronChestBlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
  }


  interface TrappedDirtChestBlockEntity extends AbstractTrappedIronChestBlockEntity {}
  class TrappedDirtChestBlockEntity extends AbstractTrappedIronChestBlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
    removeAdornments(): void;
    removeComponentsFromTag(pTag: CompoundTag): void;
    saveAdditional(pTag: CompoundTag, pRegistries: Provider): void;
  }


  interface TrappedGoldChestBlockEntity extends AbstractTrappedIronChestBlockEntity {}
  class TrappedGoldChestBlockEntity extends AbstractTrappedIronChestBlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
  }


  interface TrappedIronChestBlockEntity extends AbstractTrappedIronChestBlockEntity {}
  class TrappedIronChestBlockEntity extends AbstractTrappedIronChestBlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
  }


  interface TrappedObsidianChestBlockEntity extends AbstractTrappedIronChestBlockEntity {}
  class TrappedObsidianChestBlockEntity extends AbstractTrappedIronChestBlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
  }

}

declare module 'com.progwml6.ironchest.common.creativetabs' {
  import { DeferredRegister, DeferredHolder } from 'net.neoforged.neoforge.registries';

  class IronChestsCreativeTabs {
    static readonly CREATIVE_MODE_TABS: DeferredRegister;
    static readonly IRON_CHEST_TAP: DeferredHolder;
  }

}

declare module 'com.progwml6.ironchest.common.data' {
  import { BlockTagsProvider, ExistingFileHelper, LanguageProvider, SpriteSourceProvider } from 'net.neoforged.neoforge.common.data';
  import { PackOutput } from 'net.minecraft.data';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';
  import { RecipeProvider } from 'net.minecraft.data.recipes';
  import { IConditionBuilder } from 'net.neoforged.neoforge.common.conditions';

  interface IronChestsBlockTags extends BlockTagsProvider {}
  class IronChestsBlockTags extends BlockTagsProvider {
    constructor(output: PackOutput, lookup: CompletableFuture<Provider>, existingFileHelper: ExistingFileHelper);
  }


  interface IronChestsLanguageProvider extends LanguageProvider {}
  class IronChestsLanguageProvider extends LanguageProvider {
    constructor(output: PackOutput, locale: string);
    addBookAndContents(bookKey: string, bookTitle: string, ...pages: string[]): void;
  }


  interface IronChestsRecipeProvider extends IConditionBuilder, RecipeProvider {}
  class IronChestsRecipeProvider extends IConditionBuilder {
    constructor(output: PackOutput, provider: CompletableFuture<Provider>);
  }


  interface IronChestsSpriteSourceProvider extends SpriteSourceProvider {}
  class IronChestsSpriteSourceProvider extends SpriteSourceProvider {
    constructor(output: PackOutput, fileHelper: ExistingFileHelper, lookupProvider: CompletableFuture<Provider>);
  }

}

declare module 'com.progwml6.ironchest.common.data.loot' {
  import { BlockLootSubProvider, LootTableProvider } from 'net.minecraft.data.loot';
  import { Provider } from 'HolderLookup';
  import { PackOutput } from 'net.minecraft.data';
  import { CompletableFuture } from 'java.util.concurrent';

  interface IronChestsBlockLoot extends BlockLootSubProvider {}
  class IronChestsBlockLoot extends BlockLootSubProvider {
    constructor(provider: Provider);
  }


  interface IronChestsLootTableProvider extends LootTableProvider {}
  class IronChestsLootTableProvider extends LootTableProvider {
    constructor(pOutput: PackOutput, provider: CompletableFuture<Provider>);
  }

}

declare module 'com.progwml6.ironchest.common.datacomponents' {
  import { DeferredRegister, DeferredHolder } from 'net.neoforged.neoforge.registries';

  class IronChestsDataComponents {
    static readonly COMPONENTS: DeferredRegister;
    static readonly CHEST_PLACED_ALREADY: DeferredHolder;
  }

}

declare module 'com.progwml6.ironchest.common.inventory' {
  import { Slot, AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { Container } from 'net.minecraft.world';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Inventory, Player } from 'net.minecraft.world.entity.player';
  import { IronChestsTypes } from 'com.progwml6.ironchest.common.block';
  import { DeferredRegister, DeferredHolder } from 'net.neoforged.neoforge.registries';

  interface DirtChestSlot extends Slot {}
  class DirtChestSlot extends Slot {
    constructor(inventoryIn: Container, slotIndex: number, xPosition: number, yPosition: number);
    mayPlace(stack: ItemStack): boolean;
  }


  interface IronChestMenu extends AbstractContainerMenu {}
  class IronChestMenu extends AbstractContainerMenu {
    static createCopperContainer(containerId: number, playerInventory: Inventory): IronChestMenu;
    static createCopperContainer(containerId: number, playerInventory: Inventory, inventory: Container): IronChestMenu;
    static createCrystalContainer(containerId: number, playerInventory: Inventory): IronChestMenu;
    static createCrystalContainer(containerId: number, playerInventory: Inventory, inventory: Container): IronChestMenu;
    static createDiamondContainer(containerId: number, playerInventory: Inventory): IronChestMenu;
    static createDiamondContainer(containerId: number, playerInventory: Inventory, inventory: Container): IronChestMenu;
    static createDirtContainer(containerId: number, playerInventory: Inventory): IronChestMenu;
    static createDirtContainer(containerId: number, playerInventory: Inventory, inventory: Container): IronChestMenu;
    static createGoldContainer(containerId: number, playerInventory: Inventory): IronChestMenu;
    static createGoldContainer(containerId: number, playerInventory: Inventory, inventory: Container): IronChestMenu;
    static createIronContainer(containerId: number, playerInventory: Inventory): IronChestMenu;
    static createIronContainer(containerId: number, playerInventory: Inventory, inventory: Container): IronChestMenu;
    static createObsidianContainer(containerId: number, playerInventory: Inventory): IronChestMenu;
    static createObsidianContainer(containerId: number, playerInventory: Inventory, inventory: Container): IronChestMenu;
    get chestType(): IronChestsTypes;
    get container(): Container;
    quickMoveStack(player: Player, index: number): ItemStack;
    removed(playerIn: Player): void;
    stillValid(player: Player): boolean;
  }


  class IronChestsMenuTypes {
    static readonly CONTAINERS: DeferredRegister;
    static readonly IRON_CHEST: DeferredHolder;
    static readonly GOLD_CHEST: DeferredHolder;
    static readonly DIAMOND_CHEST: DeferredHolder;
    static readonly CRYSTAL_CHEST: DeferredHolder;
    static readonly COPPER_CHEST: DeferredHolder;
    static readonly OBSIDIAN_CHEST: DeferredHolder;
    static readonly DIRT_CHEST: DeferredHolder;
  }

}

declare module 'com.progwml6.ironchest.common.item' {
  import { Item, ItemStack, BlockItem } from 'net.minecraft.world.item';
  import { Properties } from 'Item';
  import { InteractionResult } from 'net.minecraft.world';
  import { UseOnContext } from 'net.minecraft.world.item.context';
  import { Block } from 'net.minecraft.world.level.block';
  import { IronChestsTypes } from 'com.progwml6.ironchest.common.block';
  import { Boolean, Enum } from 'java.lang';
  import { Consumer } from 'java.util.function';
  import { IClientItemExtensions } from 'net.neoforged.neoforge.client.extensions.common';
  import { BlockEntityWithoutLevelRenderer } from 'net.minecraft.client.renderer';
  import { Items } from 'DeferredRegister';
  import { ImmutableMap } from 'com.google.common.collect';
  import { List } from 'java.util';

  interface ChestUpgradeItem extends Item {}
  class ChestUpgradeItem extends Item {
    constructor(type: IronChestsUpgradeType, properties: Properties);
    onItemUseFirst(stack: ItemStack, context: UseOnContext): InteractionResult;
  }


  interface IronChestBlockItem extends BlockItem {}
  class IronChestBlockItem extends BlockItem {
    constructor(block: Block, properties: Properties, type: IronChestsTypes, trapped: boolean);
    get customRenderer(): BlockEntityWithoutLevelRenderer;
    initializeClient(consumer: Consumer<IClientItemExtensions>): void;
  }


  class IronChestsItems {
    static readonly ITEMS: Items;
    static readonly UPGRADES: ImmutableMap;
  }


  interface IronChestsUpgradeType extends Enum<IronChestsUpgradeType> {}
  class IronChestsUpgradeType extends Enum<IronChestsUpgradeType> {
    static readonly IRON_TO_GOLD: IronChestsUpgradeType;
    static readonly GOLD_TO_DIAMOND: IronChestsUpgradeType;
    static readonly COPPER_TO_IRON: IronChestsUpgradeType;
    static readonly DIAMOND_TO_CRYSTAL: IronChestsUpgradeType;
    static readonly WOOD_TO_IRON: IronChestsUpgradeType;
    static readonly WOOD_TO_COPPER: IronChestsUpgradeType;
    static readonly DIAMOND_TO_OBSIDIAN: IronChestsUpgradeType;
    canUpgrade(from: IronChestsTypes): boolean;
    static valueOf(name: string): IronChestsUpgradeType;
    static values(): IronChestsUpgradeType[];
  }

}

declare module 'com.progwml6.ironchest.common.network' {
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { BlockPos, NonNullList } from 'net.minecraft.core';
  import { ItemStack } from 'net.minecraft.world.item';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { IPayloadContext } from 'net.neoforged.neoforge.network.handling';

  interface TopStacksSyncPacket extends CustomPacketPayload {}
  class TopStacksSyncPacket extends CustomPacketPayload {
    static readonly TYPE: Type;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(blockPos: BlockPos, topItemStacks: NonNullList<ItemStack>);

    constructor(buf: RegistryFriendlyByteBuf);
    static handle(msg: TopStacksSyncPacket, ctx: IPayloadContext): void;
    type(): Type<CustomPacketPayload>;
    write(buf: RegistryFriendlyByteBuf): void;
  }

}

declare module 'com.progwml6.ironchest.common' {
  import { ItemStack } from 'net.minecraft.world.item';
  import { ListTag } from 'net.minecraft.nbt';

  class Util {
    static addBookInformationStatic(book: ItemStack, bookPages: ListTag, name: string, pageCount: number): void;
    static createDirtGuideBook(): ItemStack;
    static toEnglishName(internalName: string): string;
  }

}

declare module 'com.progwml6.ironchest' {
  import { IEventBus } from 'net.neoforged.bus.api';
  import { GatherDataEvent } from 'net.neoforged.neoforge.data.event';
  import { RegisterPayloadHandlersEvent } from 'net.neoforged.neoforge.network.event';
  import { RegisterCapabilitiesEvent } from 'net.neoforged.neoforge.capabilities';

  class IronChests {
    static readonly MODID: string;
    constructor(modEventBus: IEventBus);
    gatherData(event: GatherDataEvent): void;
    registerCapabilities(event: RegisterCapabilitiesEvent): void;
    setupPackets(event: RegisterPayloadHandlersEvent): void;
  }

}