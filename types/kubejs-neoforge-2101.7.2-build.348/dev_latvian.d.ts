declare module 'dev.latvian.mods.kubejs.block' {
  import { KubePlayerEvent } from 'dev.latvian.mods.kubejs.player';
  import { BreakEvent, EntityPlaceEvent, FarmlandTrampleEvent } from 'BlockEvent';
  import { Player } from 'net.minecraft.world.entity.player';
  import { LevelBlock, KubeLevelEvent } from 'dev.latvian.mods.kubejs.level';
  import { ModelledBuilderBase, AdditionalObjectRegistry, BuilderBase } from 'dev.latvian.mods.kubejs.registry';
  import { Block, SoundType } from 'net.minecraft.world.level.block';
  import { Function, Consumer, Predicate } from 'java.util.function';
  import { ItemBuilder, ItemPredicate } from 'dev.latvian.mods.kubejs.item';
  import { List, Set, Map } from 'java.util';
  import { BlockDropSupplier } from 'dev.latvian.mods.kubejs.block.drop';
  import { NoteBlockInstrument, Property } from 'net.minecraft.world.level.block.state.properties';
  import { BlockEntityInfo } from 'dev.latvian.mods.kubejs.block.entity';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Component } from 'net.minecraft.network.chat';
  import { KubeDataGenerator, KubeAssetGenerator } from 'dev.latvian.mods.kubejs.generator';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';
  import { MapColor } from 'net.minecraft.world.level.material';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { VoxelShape } from 'net.minecraft.world.phys.shapes';
  import { AABB, HitResult, BlockHitResult } from 'net.minecraft.world.phys';
  import { RandomTickCallback, BlockStateModifyCallback, BlockStateModifyPlacementCallback, CanBeReplacedCallback, EntitySteppedOnBlockCallback, EntityFallenOnBlockCallback, AfterEntityFallenOnBlockCallback, BlockExplodedCallback, BlockStateRotateCallback, BlockStateMirrorCallback } from 'dev.latvian.mods.kubejs.block.callback';
  import { Properties } from 'BlockBehaviour';
  import { KubeEntityEvent, KubeRayTraceResult } from 'dev.latvian.mods.kubejs.entity';
  import { BlockDropsEvent } from 'net.neoforged.neoforge.event.level';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { Entity } from 'net.minecraft.world.entity';
  import { ItemEntity, FallingBlockEntity } from 'net.minecraft.world.entity.item';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { LeftClickBlock, RightClickBlock } from 'PlayerInteractEvent';
  import { Direction, BlockPos } from 'net.minecraft.core';
  import { KubeEvent } from 'dev.latvian.mods.kubejs.event';
  import { BlockStatePredicate } from 'dev.latvian.mods.kubejs.block.state';
  import { BlockModifications } from 'dev.latvian.mods.kubejs.block.BlockModificationKubeEvent';
  import { Level, LevelReader } from 'net.minecraft.world.level';
  import { Enum } from 'java.lang';
  import { InteractionHand } from 'net.minecraft.world';
  import { VariantBlockStateGenerator } from 'dev.latvian.mods.kubejs.client';
  import { Builder } from 'dev.latvian.mods.kubejs.block.DetectorBlock';
  import { RandomSource } from 'net.minecraft.util';
  import { TypeWrapperFactory } from 'dev.latvian.mods.rhino.util.wrap';
  import { Context } from 'dev.latvian.mods.rhino';
  import { TypeInfo } from 'dev.latvian.mods.rhino.type';

  interface BlockBrokenKubeEvent extends KubePlayerEvent {}
  class BlockBrokenKubeEvent extends KubePlayerEvent {
    constructor(event: BreakEvent);
    get block(): LevelBlock;
    get entity(): Player;
  }


  interface BlockBuilder extends ModelledBuilderBase<Block> {}
  class BlockBuilder extends ModelledBuilderBase<Block> {
    copyPropertiesFrom: Block;
    soundType: SoundType;
    mapColorFn: Function;
    hardness: number;
    resistance: number;
    lightLevel: number;
    opaque: boolean;
    fullBlock: boolean;
    requiresTool: boolean;
    renderType: BlockRenderType;
    tint: BlockTintFunction;
    itemBuilder: ItemBuilder;
    customShape: List;
    noCollision: boolean;
    notSolid: boolean;
    slipperiness: number;
    speedFactor: number;
    jumpFactor: number;
    randomTickCallback: Consumer;
    drops: BlockDropSupplier;
    noValidSpawns: boolean;
    suffocating: boolean;
    viewBlocking: boolean;
    redstoneConductor: boolean;
    transparent: boolean;
    instrument: NoteBlockInstrument;
    blockStateProperties: Set;
    defaultStateModification: Consumer;
    placementStateModification: Consumer;
    canBeReplacedFunction: Predicate;
    stepOnCallback: Consumer;
    fallOnCallback: Consumer;
    afterFallenOnCallback: Consumer;
    explodedCallback: Consumer;
    rotateStateModification: Consumer;
    mirrorStateModification: Consumer;
    rightClick: Consumer;
    blockEntityInfo: BlockEntityInfo;
    constructor(id: ResourceLocation);
    afterFallenOn(callbackJS: Consumer<AfterEntityFallenOnBlockCallback>): BlockBuilder;
    blockEntity(callback: Consumer<BlockEntityInfo>): BlockBuilder;
    bounciness(bounciness: number): BlockBuilder;
    box(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, scale16: boolean): BlockBuilder;
    box(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number): BlockBuilder;
    canBeReplaced(callbackJS: Predicate<CanBeReplacedCallback>): BlockBuilder;
    canBeWaterlogged(): boolean;
    color(index: number, color: BlockTintFunction): BlockBuilder;
    color(color: BlockTintFunction): BlockBuilder;
    copyPropertiesFrom(block: Block): BlockBuilder;
    createAdditionalObjects(registry: AdditionalObjectRegistry): void;
    createProperties(): Properties;
    static createShape(boxes: AABB[]): VoxelShape;
    cropSoundType(): BlockBuilder;
    defaultCutout(): BlockBuilder;
    defaultState(callbackJS: Consumer<BlockStateModifyCallback>): BlockBuilder;
    defaultTranslucent(): BlockBuilder;
    displayName(name: Component): BuilderBase<Block>;
    drops(drops: BlockDropSupplier): BlockBuilder;
    dynamicMapColor(m: Function<BlockState, any>): BlockBuilder;
    exploded(callbackJS: Consumer<BlockExplodedCallback>): BlockBuilder;
    fallenOn(callbackJS: Consumer<EntityFallenOnBlockCallback>): BlockBuilder;
    fullBlock(f: boolean): BlockBuilder;
    generateAssets(generator: KubeAssetGenerator): void;
    generateData(generator: KubeDataGenerator): void;
    generateLootTable(): LootTable;
    generateLootTable(generator: KubeDataGenerator): LootTable;
    getWaterlogged(): boolean;
    glassSoundType(): BlockBuilder;
    grassSoundType(): BlockBuilder;
    gravelSoundType(): BlockBuilder;
    hardness(h: number): BlockBuilder;
    instrument(i: NoteBlockInstrument): BlockBuilder;
    item(i: Consumer<ItemBuilder>): BlockBuilder;
    jumpFactor(f: number): BlockBuilder;
    lightLevel(light: number): BlockBuilder;
    mapColor(m: MapColor): BlockBuilder;
    mirrorState(callbackJS: Consumer<BlockStateMirrorCallback>): BlockBuilder;
    noCollision(): BlockBuilder;
    noDrops(): BlockBuilder;
    noItem(): BlockBuilder;
    noSoundType(): BlockBuilder;
    noValidSpawns(b: boolean): BlockBuilder;
    notSolid(): BlockBuilder;
    opaque(o: boolean): BlockBuilder;
    placementState(callbackJS: Consumer<BlockStateModifyPlacementCallback>): BlockBuilder;
    property(property: Property<any>): BlockBuilder;
    randomTick(randomTickCallback: Consumer<RandomTickCallback>): BlockBuilder;
    redstoneConductor(b: boolean): BlockBuilder;
    renderType(l: BlockRenderType): BlockBuilder;
    requiresTool(f: boolean): BlockBuilder;
    requiresTool(): BlockBuilder;
    resistance(r: number): BlockBuilder;
    rightClick(callbackJS: Consumer<BlockRightClickedKubeEvent>): BlockBuilder;
    rotateState(callbackJS: Consumer<BlockStateRotateCallback>): BlockBuilder;
    sandSoundType(): BlockBuilder;
    setWaterlogged(waterlogged: boolean): BlockBuilder;
    slipperiness(f: number): BlockBuilder;
    soundType(m: SoundType): BlockBuilder;
    speedFactor(f: number): BlockBuilder;
    steppedOn(callbackJS: Consumer<EntitySteppedOnBlockCallback>): BlockBuilder;
    stoneSoundType(): BlockBuilder;
    suffocating(b: boolean): BlockBuilder;
    tag(tag: ResourceLocation[]): BlockBuilder;
    tagBlock(tag: ResourceLocation[]): BlockBuilder;
    tagBoth(tag: ResourceLocation[]): BlockBuilder;
    tagItem(tag: ResourceLocation[]): BlockBuilder;
    transformObject(obj: Block): Block;
    transparent(b: boolean): BlockBuilder;
    unbreakable(): BlockBuilder;
    viewBlocking(b: boolean): BlockBuilder;
    waterlogged(): BlockBuilder;
    woodSoundType(): BlockBuilder;
  }


  interface BlockDropsKubeEvent extends KubeEntityEvent {}
  class BlockDropsKubeEvent extends KubeEntityEvent {
    constructor(event: BlockDropsEvent);
    addItem(item: ItemStack): ItemEntity;
    containsItem(item: ItemPredicate): boolean;
    get block(): LevelBlock;
    get entity(): Entity;
    get itemEntities(): ItemEntity[];
    get items(): ItemStack[];
    get level(): ServerLevel;
    get tool(): ItemStack;
    get xp(): number;
    removeItem(item: ItemPredicate): void;
    set xp(xp: number);
  }


  interface BlockItemBuilder extends ItemBuilder {}
  class BlockItemBuilder extends ItemBuilder {
    blockBuilder: BlockBuilder;
    constructor(i: ResourceLocation);
    createObject(): Item;
    generateAssets(generator: KubeAssetGenerator): void;
    get translationKeyGroup(): string;
  }


  interface BlockLeftClickedKubeEvent extends KubePlayerEvent {}
  class BlockLeftClickedKubeEvent extends KubePlayerEvent {
    constructor(event: LeftClickBlock);
    get block(): LevelBlock;
    get entity(): Player;
    get facing(): Direction;
    get item(): ItemStack;
  }


  interface BlockModificationKubeEvent extends KubeEvent {}
  class BlockModificationKubeEvent extends KubeEvent {
    modify(predicate: BlockStatePredicate, c: Consumer<BlockModifications>): void;
  }


  interface BlockPickedKubeEvent extends KubePlayerEvent {}
  class BlockPickedKubeEvent extends KubePlayerEvent {
    readonly level: Level;
    readonly block: LevelBlock;
    readonly player: Player;
    constructor(level: Level, pos: BlockPos, state: BlockState, player: Player, hitResult: HitResult);
    get entity(): Player;
    get level(): Level;
    get target(): KubeRayTraceResult;
    static handle(state: BlockState, target: HitResult, levelReader: LevelReader, pos: BlockPos, player: Player): ItemStack;
  }


  interface BlockPlacedKubeEvent extends KubeEntityEvent {}
  class BlockPlacedKubeEvent extends KubeEntityEvent {
    constructor(event: EntityPlaceEvent);
    get block(): LevelBlock;
    get entity(): Entity;
    get level(): Level;
  }


  interface BlockRenderType extends Enum<BlockRenderType> {}
  class BlockRenderType extends Enum<BlockRenderType> {
    static readonly SOLID: BlockRenderType;
    static readonly CUTOUT: BlockRenderType;
    static readonly CUTOUT_MIPPED: BlockRenderType;
    static readonly TRANSLUCENT: BlockRenderType;
    static valueOf(name: string): BlockRenderType;
    static values(): BlockRenderType[];
  }


  interface BlockRightClickedKubeEvent extends KubePlayerEvent {}
  class BlockRightClickedKubeEvent extends KubePlayerEvent {
    constructor(item: ItemStack, player: Player, hand: InteractionHand, pos: BlockPos, direction: Direction, hitResult: BlockHitResult);
    get block(): LevelBlock;
    get entity(): Player;
    get facing(): Direction;
    get hand(): InteractionHand;
    get hitResult(): BlockHitResult;
    get item(): ItemStack;
  }


  interface BlockRotationType extends Enum<BlockRotationType> {}
  class BlockRotationType extends Enum<BlockRotationType> {
    static readonly NONE: BlockRotationType;
    static readonly HORIZONTAL: BlockRotationType;
    static readonly VERTICAL: BlockRotationType;
    static readonly FACING: BlockRotationType;
    static readonly WALL_ATTACHED: BlockRotationType;
    generateBlockModelJsons(gen: KubeAssetGenerator): void;
    generateBlockStateJson(bs: VariantBlockStateGenerator, block: BlockBuilder): void;
    get serializedName(): string;
    static valueOf(name: string): BlockRotationType;
    static values(): BlockRotationType[];
  }


  interface BlockStartedFallingKubeEvent extends KubeEntityEvent {}
  class BlockStartedFallingKubeEvent extends KubeEntityEvent {
    constructor(level: Level, pos: BlockPos, state: BlockState, entity: FallingBlockEntity);
    get block(): LevelBlock;
    get entity(): Entity;
    get level(): Level;
  }


  interface BlockStoppedFallingKubeEvent extends KubeEntityEvent {}
  class BlockStoppedFallingKubeEvent extends KubeEntityEvent {
    readonly block: LevelBlock;
    readonly fallSpeed: number;
    readonly replacedBlock: LevelBlock;
    constructor(level: Level, pos: BlockPos, state: BlockState, entity: FallingBlockEntity, fallSpeed: number, replacedState: BlockState);
    get entity(): Entity;
    get level(): Level;
  }


  interface DetectorBlock extends Block {}
  class DetectorBlock extends Block {
    constructor(b: Builder);
    neighborChanged(blockState: BlockState, level: Level, blockPos: BlockPos, block: Block, blockPos2: BlockPos, bl: boolean): void;
  }


  interface DetectorBlockKubeEvent extends KubeLevelEvent {}
  class DetectorBlockKubeEvent extends KubeLevelEvent {
    constructor(i: string, l: Level, p: BlockPos, pow: boolean);
    get block(): LevelBlock;
    get detectorId(): string;
    get level(): Level;
    isPowered(): boolean;
  }


  interface FarmlandTrampledKubeEvent extends KubeEntityEvent {}
  class FarmlandTrampledKubeEvent extends KubeEntityEvent {
    constructor(event: FarmlandTrampleEvent);
    get block(): LevelBlock;
    get distance(): number;
    get entity(): Entity;
    get level(): Level;
  }


  class KubeJSBlockEventHandler {
    static blockBreak(event: BreakEvent): void;
    static blockPlace(event: EntityPlaceEvent): void;
    static drops(event: BlockDropsEvent): void;
    static farmlandTrample(event: FarmlandTrampleEvent): void;
    static leftClick(event: LeftClickBlock): void;
    static rightClick(event: RightClickBlock): void;
  }


  interface KubeJSBlockProperties extends Properties {}
  class KubeJSBlockProperties extends Properties {
    readonly blockBuilder: BlockBuilder;
    constructor(blockBuilder: BlockBuilder, copyPropertiesFrom: Block);
  }


  interface RandomTickKubeEvent extends KubeLevelEvent {}
  class RandomTickKubeEvent extends KubeLevelEvent {
    readonly random: RandomSource;
    constructor(level: ServerLevel, pos: BlockPos, state: BlockState, random: RandomSource);
    get block(): LevelBlock;
    get level(): ServerLevel;
  }


  interface SeedItemBuilder extends BlockItemBuilder {}
  class SeedItemBuilder extends BlockItemBuilder {
    constructor(i: ResourceLocation);
    createObject(): Item;
    get translationKeyGroup(): string;
  }


  interface SoundTypeWrapper extends TypeWrapperFactory<SoundType> {}
  class SoundTypeWrapper extends TypeWrapperFactory<SoundType> {
    static readonly INSTANCE: SoundTypeWrapper;
    get map(): Map<string, SoundType>;
    wrap(cx: Context, o: any, target: TypeInfo): SoundType;
  }

}

declare module 'dev.latvian.mods.kubejs.block.callback' {
  import { BlockGetter, Level, Explosion, LevelAccessor } from 'net.minecraft.world.level';
  import { Entity, LivingEntity } from 'net.minecraft.world.entity';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { LevelBlock } from 'dev.latvian.mods.kubejs.level';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { List, Collection, Optional, Map } from 'java.util';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Mirror, Rotation, Block } from 'net.minecraft.world.level.block';
  import { Property, BooleanProperty, IntegerProperty, EnumProperty } from 'net.minecraft.world.level.block.state.properties';
  import { Comparable, Integer, Enum } from 'java.lang';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { ItemStack } from 'net.minecraft.world.item';
  import { InteractionHand } from 'net.minecraft.world';
  import { FluidState, Fluid } from 'net.minecraft.world.level.material';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { RandomSource } from 'net.minecraft.util';
  import { MinecraftServer } from 'net.minecraft.server';

  interface AfterEntityFallenOnBlockCallback extends EntitySteppedOnBlockCallback {}
  class AfterEntityFallenOnBlockCallback extends EntitySteppedOnBlockCallback {
    constructor(blockGetter: BlockGetter, entity: Entity);
    bounce(bounciness: number): void;
    get velocity(): Vec3;
    hasChangedVelocity(): boolean;
    set velocity(vec: Vec3);
    setVelocity(x: number, y: number, z: number): void;
  }


  class BlockExplodedCallback {
    constructor(level: Level, pos: BlockPos, explosion: Explosion);
    get affectedPlayers(): Player[];
    get block(): LevelBlock;
    get blockState(): BlockState;
    get cause(): Entity;
    get explosion(): Explosion;
    get igniter(): LivingEntity;
    get level(): Level;
    get radius(): number;
  }


  interface BlockStateMirrorCallback extends BlockStateModifyCallback {}
  class BlockStateMirrorCallback extends BlockStateModifyCallback {
    constructor(state: BlockState, mirror: Mirror);
    getMirror(): Mirror;
    getRotation(dir: Direction): Rotation;
    mirror(dir: Direction): Direction;
    mirror(mirror: Mirror): BlockStateModifyCallback;
  }


  class BlockStateModifyCallback {
    constructor(state: BlockState);
    cycle<T extends Comparable<T>>(property: Property<T>): BlockStateModifyCallback;
    get<T extends Comparable<T>>(property: Property<T>): T;
    get properties(): Collection<Property<any>>;
    get state(): BlockState;
    get values(): Map<Property<any>, Comparable<any>>;
    getOptionalValue<T extends Comparable<T>>(property: Property<T>): Optional<T>;
    getValue<T extends Comparable<T>>(property: Property<T>): T;
    hasProperty<T extends Comparable<T>>(property: Property<T>): boolean;
    mirror(mirror: Mirror): BlockStateModifyCallback;
    populateNeighbours(map: Map<Map<Property<any>, Comparable<any>>, BlockState>): BlockStateModifyCallback;
    rotate(rotation: Rotation): BlockStateModifyCallback;
    set(property: BooleanProperty, value: boolean): BlockStateModifyCallback;
    set(property: IntegerProperty, value: number): BlockStateModifyCallback;
    set<T extends Enum<T>>(property: EnumProperty<T>, value: string): BlockStateModifyCallback;
    setValue<T extends Comparable<T>, V extends T>(property: Property<T>, comparable: V): BlockStateModifyCallback;
    toString(): string;
    updateShape(direction: Direction, blockState: BlockState, levelAccessor: LevelAccessor, blockPos: BlockPos, blockPos2: BlockPos): BlockStateModifyCallback;
  }


  interface BlockStateModifyPlacementCallback extends BlockStateModifyCallback {}
  class BlockStateModifyPlacementCallback extends BlockStateModifyCallback {
    readonly context: BlockPlaceContext;
    readonly minecraftBlock: Block;
    block: LevelBlock;
    constructor(context: BlockPlaceContext, block: Block);
    canPlace(): boolean;
    get clickLocation(): Vec3;
    get clickedBlock(): LevelBlock;
    get clickedFace(): Direction;
    get clickedPos(): BlockPos;
    get fluidStateAtClickedPos(): FluidState;
    get hand(): InteractionHand;
    get horizontalDirection(): Direction;
    get item(): ItemStack;
    get level(): Level;
    get nearestLookingDirection(): Direction;
    get nearestLookingDirections(): Direction[];
    get nearestLookingVerticalDirection(): Direction;
    get player(): Player;
    get rotation(): number;
    isClickedPosIn(fluid: Fluid): boolean;
    isInWater(): boolean;
    isInside(): boolean;
    isReplacingSelf(): boolean;
    isSecondaryUseActive(): boolean;
    replacingClickedOnBlock(): boolean;
    waterlogged(waterlogged: boolean): BlockStateModifyPlacementCallback;
    waterlogged(): BlockStateModifyPlacementCallback;
  }


  interface BlockStateRotateCallback extends BlockStateModifyCallback {}
  class BlockStateRotateCallback extends BlockStateModifyCallback {
    constructor(state: BlockState, rotation: Rotation);
    get rotation(): Rotation;
    rotate(dir: Direction): Direction;
    rotate(rotation: Rotation): BlockStateModifyCallback;
  }


  class CanBeReplacedCallback {
    constructor(blockPlaceContext: BlockPlaceContext, state: BlockState);
    canBeReplaced(): boolean;
    get clickLocation(): Vec3;
    get clickedBlock(): LevelBlock;
    get clickedFace(): Direction;
    get clickedPos(): BlockPos;
    get fluidStateAtClickedPos(): FluidState;
    get hand(): InteractionHand;
    get horizontalDirection(): Direction;
    get item(): ItemStack;
    get level(): Level;
    get nearestLookingDirection(): Direction;
    get nearestLookingDirections(): Direction[];
    get nearestLookingVerticalDirection(): Direction;
    get player(): Player;
    get rotation(): number;
    isClickedPosIn(fluid: Fluid): boolean;
    isInside(): boolean;
    isSecondaryUseActive(): boolean;
  }


  interface EntityFallenOnBlockCallback extends EntitySteppedOnBlockCallback {}
  class EntityFallenOnBlockCallback extends EntitySteppedOnBlockCallback {
    constructor(level: Level, entity: Entity, pos: BlockPos, state: BlockState, fallHeight: number);
    applyFallDamage(): boolean;
    applyFallDamage(multiplier: number): boolean;
    applyFallDamage(fallHeight: number, multiplier: number): boolean;
    applyFallDamage(fallHeight: number, multiplier: number, damageSource: DamageSource): boolean;
    get fallHeight(): number;
  }


  class EntitySteppedOnBlockCallback {
    constructor(level: Level, entity: Entity, pos: BlockPos, state: BlockState);
    get block(): LevelBlock;
    get entity(): Entity;
    get level(): Level;
    get pos(): BlockPos;
    get state(): BlockState;
    isSuppressingBounce(): boolean;
  }


  class RandomTickCallback {
    readonly block: LevelBlock;
    readonly random: RandomSource;
    constructor(block: LevelBlock, random: RandomSource);
    get level(): Level;
    get server(): MinecraftServer;
  }

}

declare module 'dev.latvian.mods.kubejs.block.custom' {
  import { CropBlock, Block, SimpleWaterloggedBlock, Rotation, Mirror } from 'net.minecraft.world.level.block';
  import { IntegerProperty, BlockSetType, WoodType } from 'net.minecraft.world.level.block.state.properties';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockGetter, Level, LevelReader, LevelAccessor, Explosion } from 'net.minecraft.world.level';
  import { BlockPos, Direction, Holder } from 'net.minecraft.core';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { RandomSource } from 'net.minecraft.util';
  import { BlockBuilder } from 'dev.latvian.mods.kubejs.block';
  import { FluidState, Fluid } from 'net.minecraft.world.level.material';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { Optional, List } from 'java.util';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { Entity, LivingEntity } from 'net.minecraft.world.entity';
  import { ItemInteractionResult, InteractionHand } from 'net.minecraft.world';
  import { BlockHitResult } from 'net.minecraft.world.phys';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { TickDuration } from 'dev.latvian.mods.kubejs.util';
  import { ToDoubleFunction, ToIntFunction, Consumer } from 'java.util.function';
  import { SurviveCallback, ShapeBuilder } from 'dev.latvian.mods.kubejs.block.custom.CropBlockBuilder';
  import { NumberProvider } from 'net.minecraft.world.level.storage.loot.providers.number';
  import { RandomTickCallback } from 'dev.latvian.mods.kubejs.block.callback';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';
  import { KubeDataGenerator } from 'dev.latvian.mods.kubejs.generator';
  import { KubeColor } from 'dev.latvian.mods.kubejs.color';

  interface BasicCropBlockJS extends CropBlock {}
  class BasicCropBlockJS extends CropBlock {
    constructor(builder: CropBlockBuilder);
    canSurvive(blockState: BlockState, levelReader: LevelReader, blockPos: BlockPos): boolean;
    get ageProperty(): IntegerProperty;
    get maxAge(): number;
    getShape(blockState: BlockState, blockGetter: BlockGetter, blockPos: BlockPos, collisionContext: CollisionContext): VoxelShape;
    growCrops(level: Level, blockPos: BlockPos, blockState: BlockState): void;
    randomTick(blockState: BlockState, serverLevel: ServerLevel, blockPos: BlockPos, random: RandomSource): void;
  }


  interface BasicKubeBlock extends SimpleWaterloggedBlock, Block {}
  class BasicKubeBlock extends SimpleWaterloggedBlock {
    readonly blockBuilder: BlockBuilder;
    readonly shape: VoxelShape;
    constructor(p: BlockBuilder);
    canBeReplaced(blockState: BlockState, context: BlockPlaceContext): boolean;
    canPlaceLiquid(player: Player, blockGetter: BlockGetter, blockPos: BlockPos, blockState: BlockState, fluid: Fluid): boolean;
    fallOn(level: Level, blockState: BlockState, blockPos: BlockPos, entity: Entity, f: number): void;
    get pickupSound(): Optional<SoundEvent>;
    getFluidState(state: BlockState): FluidState;
    getShadeBrightness(state: BlockState, level: BlockGetter, pos: BlockPos): number;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    getVisualShape(state: BlockState, level: BlockGetter, pos: BlockPos, ctx: CollisionContext): VoxelShape;
    isRandomlyTicking(state: BlockState): boolean;
    kjs$getBlockBuilder(): BlockBuilder;
    mirror(blockState: BlockState, mirror: Mirror): BlockState;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, bl: boolean): void;
    pickupBlock(player: Player, levelAccessor: LevelAccessor, blockPos: BlockPos, blockState: BlockState): ItemStack;
    placeLiquid(levelAccessor: LevelAccessor, blockPos: BlockPos, blockState: BlockState, fluidState: FluidState): boolean;
    propagatesSkylightDown(state: BlockState, level: BlockGetter, pos: BlockPos): boolean;
    randomTick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
    rotate(blockState: BlockState, rotation: Rotation): BlockState;
    setPlacedBy(level: Level, blockPos: BlockPos, blockState: BlockState, livingEntity: LivingEntity, itemStack: ItemStack): void;
    skipRendering(state: BlockState, state2: BlockState, direction: Direction): boolean;
    stepOn(level: Level, blockPos: BlockPos, blockState: BlockState, entity: Entity): void;
    updateEntityAfterFallOn(blockGetter: BlockGetter, entity: Entity): void;
    updateShape(state: BlockState, facing: Direction, facingState: BlockState, world: LevelAccessor, pos: BlockPos, facingPos: BlockPos): BlockState;
    useItemOn(stack: ItemStack, state: BlockState, level: Level, pos: BlockPos, player: Player, hand: InteractionHand, hit: BlockHitResult): ItemInteractionResult;
    wasExploded(level: Level, blockPos: BlockPos, explosion: Explosion): void;
  }


  interface ButtonBlockBuilder extends ButtonOrPressurePlateBuilder, ShapedBlockBuilder {}
  class ButtonBlockBuilder extends ButtonOrPressurePlateBuilder {
    static readonly BUTTON_TAGS: ResourceLocation[];
    behaviour: BlockSetType;
    ticksToStayPressed: number;
    constructor(i: ResourceLocation);
    behaviour(behaviour: BlockSetType): ButtonBlockBuilder;
    createObject(): Block;
    ticksToStayPressed(ticks: TickDuration): ButtonBlockBuilder;
  }


  class ButtonOrPressurePlateBuilder {
    behaviour(var1: BlockSetType): BlockBuilder;
    ticksToStayPressed(var1: TickDuration): BlockBuilder;
  }


  interface CardinalBlockBuilder extends BlockBuilder {}
  class CardinalBlockBuilder extends BlockBuilder {
    constructor(i: ResourceLocation);
    createObject(): Block;
  }


  interface CarpetBlockBuilder extends ShapedBlockBuilder {}
  class CarpetBlockBuilder extends ShapedBlockBuilder {
    static readonly CARPET_TAGS: ResourceLocation[];
    constructor(i: ResourceLocation);
    createObject(): Block;
  }


  interface CropBlockBuilder extends BlockBuilder {}
  class CropBlockBuilder extends BlockBuilder {
    static readonly CROP_BLOCK_TAGS: ResourceLocation[];
    static readonly CROP_ITEM_TAGS: ResourceLocation[];
    age: number;
    growSpeedCallback: ToDoubleFunction;
    fertilizerCallback: ToIntFunction;
    surviveCallback: SurviveCallback;
    outputs: List;
    noSeeds: boolean;
    constructor(id: ResourceLocation);
    age(age: number): CropBlockBuilder;
    age(age: number, builder: Consumer<ShapeBuilder>): CropBlockBuilder;
    bonemeal(bonemealCallback: ToIntFunction<RandomTickCallback>): CropBlockBuilder;
    createObject(): Block;
    crop(output: Holder<Item>): CropBlockBuilder;
    crop(output: Holder<Item>, chance: NumberProvider): CropBlockBuilder;
    farmersCanPlant(): CropBlockBuilder;
    generateLootTable(generator: KubeDataGenerator): LootTable;
    generateLootTable(): LootTable;
    growTick(growSpeedCallback: ToDoubleFunction<RandomTickCallback>): CropBlockBuilder;
    noItem(): BlockBuilder;
    noSeeds(): CropBlockBuilder;
    randomTick(randomTickCallback: Consumer<RandomTickCallback>): BlockBuilder;
    survive(surviveCallback: SurviveCallback): CropBlockBuilder;
  }


  interface DoorBlockBuilder extends ShapedBlockBuilder {}
  class DoorBlockBuilder extends ShapedBlockBuilder {
    static readonly DOOR_TAGS: ResourceLocation[];
    static readonly WOODEN_DOOR_TAGS: ResourceLocation[];
    behaviour: BlockSetType;
    constructor(i: ResourceLocation);
    behaviour(wt: BlockSetType): DoorBlockBuilder;
    createObject(): Block;
    generateLootTable(generator: KubeDataGenerator): LootTable;
    generateLootTable(): LootTable;
    wooden(): DoorBlockBuilder;
  }


  interface FallingBlockBuilder extends BlockBuilder {}
  class FallingBlockBuilder extends BlockBuilder {
    constructor(i: ResourceLocation);
    createObject(): Block;
    dustColor(color: KubeColor): FallingBlockBuilder;
  }


  interface FenceBlockBuilder extends ShapedBlockBuilder {}
  class FenceBlockBuilder extends ShapedBlockBuilder {
    static readonly FENCE_TAGS: ResourceLocation[];
    constructor(i: ResourceLocation);
    createObject(): Block;
  }


  interface FenceGateBlockBuilder extends ShapedBlockBuilder {}
  class FenceGateBlockBuilder extends ShapedBlockBuilder {
    static readonly FENCE_GATE_TAGS: ResourceLocation[];
    behaviour: WoodType;
    constructor(i: ResourceLocation);
    behaviour(wt: WoodType): FenceGateBlockBuilder;
    behaviour(wt: string): FenceGateBlockBuilder;
    createObject(): Block;
  }


  interface PressurePlateBlockBuilder extends ButtonOrPressurePlateBuilder, ShapedBlockBuilder {}
  class PressurePlateBlockBuilder extends ButtonOrPressurePlateBuilder {
    static readonly PRESSURE_PLATE_TAGS: ResourceLocation[];
    behaviour: BlockSetType;
    ticksToStayPressed: number;
    constructor(i: ResourceLocation);
    behaviour(behaviour: BlockSetType): PressurePlateBlockBuilder;
    createObject(): Block;
    ticksToStayPressed(ticks: TickDuration): PressurePlateBlockBuilder;
  }


  interface ShapedBlockBuilder extends BlockBuilder {}
  class ShapedBlockBuilder extends BlockBuilder {
    constructor(i: ResourceLocation, ...suffixes: string[]);
  }


  interface SlabBlockBuilder extends ShapedBlockBuilder {}
  class SlabBlockBuilder extends ShapedBlockBuilder {
    static readonly SLAB_TAGS: ResourceLocation[];
    constructor(i: ResourceLocation);
    createObject(): Block;
  }


  interface StairBlockBuilder extends ShapedBlockBuilder {}
  class StairBlockBuilder extends ShapedBlockBuilder {
    static readonly STAIR_TAGS: ResourceLocation[];
    constructor(i: ResourceLocation);
    createObject(): Block;
  }


  interface TrapdoorBlockBuilder extends ShapedBlockBuilder {}
  class TrapdoorBlockBuilder extends ShapedBlockBuilder {
    static readonly TRAPDOOR_TAGS: ResourceLocation[];
    behaviour: BlockSetType;
    constructor(i: ResourceLocation);
    behaviour(wt: BlockSetType): TrapdoorBlockBuilder;
    createObject(): Block;
  }


  interface WallBlockBuilder extends ShapedBlockBuilder {}
  class WallBlockBuilder extends ShapedBlockBuilder {
    static readonly WALL_TAGS: ResourceLocation[];
    constructor(i: ResourceLocation);
    createObject(): Block;
  }

}

declare module 'dev.latvian.mods.kubejs.block.custom.BasicKubeBlock' {
  import { BasicKubeBlock } from 'dev.latvian.mods.kubejs.block.custom';
  import { EntityBlock, Block } from 'net.minecraft.world.level.block';
  import { BlockBuilder } from 'dev.latvian.mods.kubejs.block';
  import { BlockEntity, BlockEntityTicker, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level } from 'net.minecraft.world.level';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface WithEntity extends EntityBlock, BasicKubeBlock {}
  class WithEntity extends EntityBlock {
    constructor(p: BlockBuilder);
    getTicker<T extends BlockEntity>(level: Level, state: BlockState, blockEntityType: BlockEntityType<T>): BlockEntityTicker<T>;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
  }


  interface Builder extends BlockBuilder {}
  class Builder extends BlockBuilder {
    constructor(i: ResourceLocation);
    createObject(): Block;
  }

}

declare module 'dev.latvian.mods.kubejs.block.custom.CardinalBlockBuilder' {
  import { EntityBlock } from 'net.minecraft.world.level.block';
  import { BlockBuilder } from 'dev.latvian.mods.kubejs.block';
  import { BlockEntity, BlockEntityTicker, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level, BlockGetter } from 'net.minecraft.world.level';
  import { BasicKubeBlock } from 'dev.latvian.mods.kubejs.block.custom';
  import { DirectionProperty } from 'net.minecraft.world.level.block.state.properties';
  import { Map } from 'java.util';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';

  interface WithEntity extends EntityBlock, CardinalKubeBlock {}
  class WithEntity extends EntityBlock {
    constructor(p: BlockBuilder);
    getTicker<T extends BlockEntity>(level: Level, state: BlockState, blockEntityType: BlockEntityType<T>): BlockEntityTicker<T>;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
  }


  interface CardinalKubeBlock extends BasicKubeBlock {}
  class CardinalKubeBlock extends BasicKubeBlock {
    static readonly FACING: DirectionProperty;
    readonly shapes: Map;
    constructor(p: BlockBuilder);
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
  }

}

declare module 'dev.latvian.mods.kubejs.block.custom.CropBlockBuilder' {
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { LevelReader } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { List } from 'java.util';
  import { VoxelShape } from 'net.minecraft.world.phys.shapes';

  class SurviveCallback {
    survive(var1: BlockState, var2: LevelReader, var3: BlockPos): boolean;
  }


  class ShapeBuilder {
    constructor(age: number);
    beetroot(): ShapeBuilder;
    carrot(): ShapeBuilder;
    get shapes(): VoxelShape[];
    potato(): ShapeBuilder;
    shape(age: number, minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): ShapeBuilder;
    wheat(): ShapeBuilder;
  }

}

declare module 'dev.latvian.mods.kubejs.block.custom.FallingBlockBuilder' {
  import { FallingBlock } from 'net.minecraft.world.level.block';
  import { Properties } from 'BlockBehaviour';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';

  interface KubeJSFallingBlock extends FallingBlock {}
  class KubeJSFallingBlock extends FallingBlock {
    constructor(p: Properties);
    getDustColor(state: BlockState, level: BlockGetter, pos: BlockPos): number;
  }

}

declare module 'dev.latvian.mods.kubejs.block.DetectorBlock' {
  import { BlockBuilder } from 'dev.latvian.mods.kubejs.block';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Block } from 'net.minecraft.world.level.block';

  interface Builder extends BlockBuilder {}
  class Builder extends BlockBuilder {
    detectorId: string;
    constructor(i: ResourceLocation);
    createObject(): Block;
    detectorId(id: string): Builder;
  }

}

declare module 'dev.latvian.mods.kubejs.block.drop' {
  class BlockDropSupplier {
    static readonly NO_DROPS: BlockDropSupplier;
    get (): BlockDrops;
  }

}

declare module 'dev.latvian.mods.kubejs.block.entity' {
  import { BlockCapability } from 'net.neoforged.neoforge.capabilities';
  import { Tag, CompoundTag, ListTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { List, Set, Map, UUID } from 'java.util';
  import { Direction, BlockPos } from 'net.minecraft.core';
  import { Context } from 'dev.latvian.mods.rhino';
  import { KubeResourceLocation } from 'dev.latvian.mods.kubejs.util';
  import { Supplier, Predicate } from 'java.util.function';
  import { ItemPredicate } from 'dev.latvian.mods.kubejs.item';
  import { FluidIngredient } from 'net.neoforged.neoforge.fluids.crafting';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Class } from 'java.lang';
  import { BuilderBase } from 'dev.latvian.mods.kubejs.registry';
  import { BlockEntityType, BlockEntity, BlockEntityTicker } from 'net.minecraft.world.level.block.entity';
  import { BlockBuilder } from 'dev.latvian.mods.kubejs.block';
  import { Int2ObjectMap } from 'it.unimi.dsi.fastutil.ints';
  import { Level } from 'net.minecraft.world.level';
  import { KubeLevelEvent, LevelBlock } from 'dev.latvian.mods.kubejs.level';
  import { Wrapped } from 'dev.latvian.mods.kubejs.block.entity.EnergyStorageAttachment';
  import { Wrapped as dev_latvian_mods_kubejs_block_entity_fluidtankattachment_Wrapped } from 'dev.latvian.mods.kubejs.block.entity.FluidTankAttachment';
  import { FluidStack } from 'net.neoforged.neoforge.fluids';
  import { Wrapped as dev_latvian_mods_kubejs_block_entity_inventoryattachment_Wrapped } from 'dev.latvian.mods.kubejs.block.entity.InventoryAttachment';
  import { Packet } from 'net.minecraft.network.protocol';
  import { ClientGamePacketListener } from 'net.minecraft.network.protocol.game';
  import { Entity } from 'net.minecraft.world.entity';

  class BlockEntityAttachment {
    deserialize(registries: Provider, tag: Tag): void;
    get wrappedObject(): any;
    getCapability<CAP, SRC>(capability: BlockCapability<CAP, SRC>): CAP;
    onRemove(level: ServerLevel, blockEntity: KubeBlockEntity, newState: BlockState): void;
    serialize(registries: Provider): Tag;
    serverTick(): void;
  }


  class BlockEntityAttachmentFactory {
    create(var1: BlockEntityAttachmentInfo, var2: KubeBlockEntity): BlockEntityAttachment;
    get capabilities(): BlockCapability<any, any>[];
    isTicking(): boolean;
  }


  class BlockEntityAttachmentHandler {
    attach(var1: string, var2: BlockEntityAttachmentType, var3: Set<Direction>, var4: BlockEntityAttachmentFactory): void;
    attach(cx: Context, id: string, type: KubeResourceLocation, directions: Set<Direction>, args: any): void;
    attachCustomCapability(id: string, directions: Set<Direction>, capability: BlockCapability<any, any>, dataFactory: Supplier<any>): void;
    energyStorage(id: string, directions: Set<Direction>, capacity: number, maxReceive: number, maxExtract: number, autoOutput: number): void;
    fluidTank(id: string, directions: Set<Direction>, capacity: number, inputFilter: FluidIngredient): void;
    fluidTank(id: string, directions: Set<Direction>, capacity: number): void;
    inventory(id: string, directions: Set<Direction>, width: number, height: number, inputFilter: ItemPredicate): void;
    inventory(id: string, directions: Set<Direction>, width: number, height: number): void;
  }


  class BlockEntityAttachmentRegistry {
    register(id: ResourceLocation, factory: Class<BlockEntityAttachmentFactory>): void;
    register(var1: BlockEntityAttachmentType): void;
  }


  interface BlockEntityBuilder extends BuilderBase<BlockEntityType> {}
  class BlockEntityBuilder extends BuilderBase<BlockEntityType> {
    info: BlockEntityInfo;
    constructor(i: ResourceLocation, info: BlockEntityInfo);
    createObject(): BlockEntityType<any>;
  }


  class BlockEntityEventCallback {
    accept(var1: KubeBlockEntity, var2: number): void;
  }


  interface BlockEntityInfo extends BlockEntityAttachmentHandler {}
  class BlockEntityInfo extends BlockEntityAttachmentHandler {
    readonly blockBuilder: BlockBuilder;
    entityType: BlockEntityType;
    initialData: CompoundTag;
    serverTicking: boolean;
    clientTicking: boolean;
    attachmentsTicking: boolean;
    tickFrequency: number;
    tickOffset: number;
    sync: boolean;
    attachments: Map;
    eventHandlers: Int2ObjectMap;
    constructor(blockBuilder: BlockBuilder);
    attach(id: string, type: BlockEntityAttachmentType, directions: Set<Direction>, factory: BlockEntityAttachmentFactory): void;
    attach(cx: Context, id: string, type: KubeResourceLocation, directions: Set<Direction>, args: any): void;
    clientTicking(): void;
    createBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    enableSync(): void;
    eventHandler(eventId: number, callback: BlockEntityEventCallback): void;
    getTicker<T extends BlockEntity>(level: Level): BlockEntityTicker<T>;
    initialData(data: CompoundTag): void;
    rightClickFillsTank(id: string): void;
    rightClickOpensInventory(id: string): void;
    serverTicking(): void;
    tickFrequency(frequency: number): void;
    tickOffset(offset: number): void;
    ticking(): void;
    toString(): string;
  }


  interface BlockEntityTickKubeEvent extends KubeLevelEvent {}
  class BlockEntityTickKubeEvent extends KubeLevelEvent {
    constructor(entity: KubeBlockEntity);
    get block(): LevelBlock;
    get cycle(): number;
    get level(): Level;
    get tick(): number;
  }


  interface EnergyStorageAttachment extends BlockEntityAttachment {}
  class EnergyStorageAttachment extends BlockEntityAttachment {
    static readonly TYPE: BlockEntityAttachmentType;
    readonly energyStorage: Wrapped;
    readonly autoOutput: number;
    readonly autoOutputDirections: Direction[];
    constructor(entity: KubeBlockEntity, capacity: number, maxReceive: number, maxExtract: number, autoOutput: number, autoOutputDirections: Direction[]);
    get wrappedObject(): any;
    getCapability<CAP, SRC>(capability: BlockCapability<CAP, SRC>): CAP;
    serverTick(): void;
  }


  interface FluidTankAttachment extends BlockEntityAttachment {}
  class FluidTankAttachment extends BlockEntityAttachment {
    static readonly TYPE: BlockEntityAttachmentType;
    readonly entity: KubeBlockEntity;
    readonly fluidTank: dev_latvian_mods_kubejs_block_entity_fluidtankattachment_Wrapped;
    constructor(entity: KubeBlockEntity, capacity: number, filter: Predicate<FluidStack>);
    deserialize(registries: Provider, tag: Tag): void;
    get wrappedObject(): any;
    getCapability<CAP, SRC>(capability: BlockCapability<CAP, SRC>): CAP;
    serialize(registries: Provider): Tag;
  }


  interface InventoryAttachment extends BlockEntityAttachment {}
  class InventoryAttachment extends BlockEntityAttachment {
    static readonly TYPE: BlockEntityAttachmentType;
    readonly width: number;
    readonly height: number;
    readonly blockEntity: KubeBlockEntity;
    readonly inputFilter: ItemPredicate;
    readonly inventory: dev_latvian_mods_kubejs_block_entity_inventoryattachment_Wrapped;
    constructor(blockEntity: KubeBlockEntity, width: number, height: number, inputFilter: ItemPredicate);
    deserialize(registries: Provider, tag: Tag): void;
    get wrappedObject(): any;
    getCapability<CAP, SRC>(capability: BlockCapability<CAP, SRC>): CAP;
    onRemove(level: ServerLevel, blockEntity: KubeBlockEntity, newState: BlockState): void;
    serialize(registries: Provider): ListTag;
  }


  interface KubeBlockEntity extends BlockEntity {}
  class KubeBlockEntity extends BlockEntity {
    static readonly TICKER: BlockEntityTicker;
    readonly info: BlockEntityInfo;
    readonly blockKey: ResourceKey;
    readonly x: number;
    readonly y: number;
    readonly z: number;
    tick: number;
    cycle: number;
    data: CompoundTag;
    readonly attachments: Map;
    readonly attachmentArray: BlockEntityAttachmentHolder[];
    placerId: UUID;
    constructor(blockPos: BlockPos, blockState: BlockState, entityInfo: BlockEntityInfo);
    get block(): LevelBlock;
    get placer(): Entity;
    get updatePacket(): Packet<ClientGamePacketListener>;
    getUpdateTag(provider: Provider): CompoundTag;
    loadAdditional(tag: CompoundTag, registries: Provider): void;
    save(): void;
    sendEvent(eventId: number, data: number): void;
    setLevel(level: Level): void;
    sync(): void;
    triggerEvent(eventId: number, data: number): boolean;
  }

}

declare module 'dev.latvian.mods.kubejs.block.entity.EnergyStorageAttachment' {
  import { EnergyStorage } from 'net.neoforged.neoforge.energy';
  import { EnergyStorageAttachment } from 'dev.latvian.mods.kubejs.block.entity';

  interface Wrapped extends EnergyStorage {}
  class Wrapped extends EnergyStorage {
    constructor(attachment: EnergyStorageAttachment, capacity: number, maxReceive: number, maxExtract: number);
    addEnergy(add: number, simulate: boolean): number;
    extractEnergy(toExtract: number, simulate: boolean): number;
    receiveEnergy(toReceive: number, simulate: boolean): number;
    removeEnergy(remove: number, simulate: boolean): number;
    setEnergyStored(energy: number): void;
    useEnergy(use: number, simulate: boolean): boolean;
  }

}

declare module 'dev.latvian.mods.kubejs.block.entity.FluidTankAttachment' {
  import { FluidTank } from 'net.neoforged.neoforge.fluids.capability.templates';
  import { FluidTankAttachment } from 'dev.latvian.mods.kubejs.block.entity';
  import { Predicate } from 'java.util.function';
  import { FluidStack } from 'net.neoforged.neoforge.fluids';

  interface Wrapped extends FluidTank {}
  class Wrapped extends FluidTank {
    constructor(attachment: FluidTankAttachment, capacity: number, inputFilter: Predicate<FluidStack>);
  }

}

declare module 'dev.latvian.mods.kubejs.block.entity.InventoryAttachment' {
  import { ItemStackHandler } from 'net.neoforged.neoforge.items';
  import { InventoryKJS } from 'dev.latvian.mods.kubejs.core';
  import { InventoryAttachment } from 'dev.latvian.mods.kubejs.block.entity';
  import { NonNullList } from 'net.minecraft.core';
  import { ItemStack } from 'net.minecraft.world.item';

  interface Wrapped extends InventoryKJS, ItemStackHandler {}
  class Wrapped extends InventoryKJS {
    constructor(attachment: InventoryAttachment);
    isItemValid(slot: number, stack: ItemStack): boolean;
    kjs$getHeight(): number;
    kjs$getWidth(): number;
    stacks(): NonNullList<ItemStack>;
  }

}

declare module 'dev.latvian.mods.kubejs.block.predicate' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { LevelBlock } from 'dev.latvian.mods.kubejs.level';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { List } from 'java.util';
  import { PropertyObject } from 'dev.latvian.mods.kubejs.block.predicate.BlockIDPredicate';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  interface BlockEntityPredicate extends BlockPredicate {}
  class BlockEntityPredicate extends BlockPredicate {
    constructor(i: ResourceLocation);
    check(block: LevelBlock): boolean;
    data(cd: BlockEntityPredicateDataCheck): BlockEntityPredicate;
    toString(): string;
  }


  class BlockEntityPredicateDataCheck {
    checkData(var1: CompoundTag): boolean;
  }


  interface BlockIDPredicate extends BlockPredicate {}
  class BlockIDPredicate extends BlockPredicate {
    constructor(i: ResourceLocation);
    check(b: LevelBlock): boolean;
    checkState(state: BlockState): boolean;
    get blockProperties(): PropertyObject[];
    get blockState(): BlockState;
    toString(): string;
    with(key: string, value: string): BlockIDPredicate;
  }


  class BlockPredicate {
    check(var1: LevelBlock): boolean;
  }

}

declare module 'dev.latvian.mods.kubejs.block.SeedItemBuilder' {
  import { ItemNameBlockItem, ItemStack } from 'net.minecraft.world.item';
  import { SpecialPlantable } from 'net.neoforged.neoforge.common';
  import { SeedItemBuilder } from 'dev.latvian.mods.kubejs.block';
  import { LevelReader, LevelAccessor } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { Villager } from 'net.minecraft.world.entity.npc';

  interface SeedKubeItem extends SpecialPlantable, ItemNameBlockItem {}
  class SeedKubeItem extends SpecialPlantable {
    constructor(b: SeedItemBuilder);
    canPlacePlantAtPosition(stack: ItemStack, level: LevelReader, pos: BlockPos, direction: Direction): boolean;
    spawnPlantAtPosition(stack: ItemStack, level: LevelAccessor, pos: BlockPos, direction: Direction): void;
    villagerCanPlantItem(villager: Villager): boolean;
  }

}

declare module 'dev.latvian.mods.kubejs.client' {
  import { KubeEvent, EventTargetType } from 'dev.latvian.mods.kubejs.event';
  import { Consumer } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RegisterRenderers } from 'EntityRenderersEvent';
  import { BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { BlockEntityRendererProvider } from 'net.minecraft.client.renderer.blockentity';
  import { VirtualAssetPack, ExportablePackResources } from 'dev.latvian.mods.kubejs.script.data';
  import { Map, List } from 'java.util';
  import { PackResources } from 'net.minecraft.server.packs';
  import { Minecraft } from 'net.minecraft.client';
  import { KubePlayerEvent } from 'dev.latvian.mods.kubejs.player';
  import { LocalPlayer } from 'net.minecraft.client.player';
  import { BaseProperties, NotificationToastData, ScheduledEvents } from 'dev.latvian.mods.kubejs.util';
  import { JsonElement, JsonObject } from 'com.google.gson';
  import { ScriptManager, ScriptType, ConsoleLine, ConsoleJS } from 'dev.latvian.mods.kubejs.script';
  import { Path } from 'java.nio.file';
  import { EntityType } from 'net.minecraft.world.entity';
  import { EntityRendererProvider } from 'net.minecraft.client.renderer.entity';
  import { Builder } from 'dev.latvian.mods.kubejs.client.KeybindRegistryKubeEvent';
  import { KubeKey } from 'dev.latvian.mods.kubejs.client.KubeJSKeybinds';
  import { SimpleAnimatedParticle, SpriteSet, ParticleProvider } from 'net.minecraft.client.particle';
  import { ClientLevel, ClientPacketListener } from 'net.minecraft.client.multiplayer';
  import { KubeColor } from 'dev.latvian.mods.kubejs.color';
  import { Float2IntFunction } from 'it.unimi.dsi.fastutil.floats';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { RandomSource } from 'net.minecraft.util';
  import { KubeJSCommon } from 'dev.latvian.mods.kubejs';
  import { File } from 'java.io';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { Runnable } from 'java.lang';
  import { KubeServerData } from 'dev.latvian.mods.kubejs.net';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { Pattern } from 'java.util.regex';
  import { FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';
  import { AddPackFindersEvent, TagsUpdatedEvent } from 'net.neoforged.neoforge.event';
  import { Block, Item } from 'RegisterColorHandlersEvent';
  import { RegisterMenuScreensEvent, RegisterKeyMappingsEvent, RegisterShadersEvent, RegisterParticleProvidersEvent, RegisterClientCommandsEvent, RenderLevelStageEvent } from 'net.neoforged.neoforge.client.event';
  import { RegisterClientExtensionsEvent } from 'net.neoforged.neoforge.client.extensions.common';
  import { DebugText } from 'CustomizeGuiOverlayEvent';
  import { DynamicItemTooltipsKubeEvent } from 'dev.latvian.mods.kubejs.item';
  import { TooltipRequirements } from 'dev.latvian.mods.kubejs.text.tooltip';
  import { ItemTooltipEvent } from 'net.neoforged.neoforge.event.entity.player';
  import { LoggingIn, LoggingOut } from 'ClientPlayerNetworkEvent';
  import { Post } from 'RenderGuiEvent';
  import { Post as screenevent_render_Post } from 'ScreenEvent.Render';
  import { Pre } from 'ClientTickEvent';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Post as screenevent_init_Post } from 'ScreenEvent.Init';
  import { Opening } from 'ScreenEvent';
  import { Component } from 'net.minecraft.network.chat';
  import { RepositorySource, Pack } from 'net.minecraft.server.packs.repository';
  import { RecipeViewerData } from 'dev.latvian.mods.kubejs.recipe.viewer.server';
  import { BufferedImage } from 'java.awt.image';
  import { MenuType } from 'net.minecraft.world.inventory';
  import { ScreenConstructor } from 'MenuScreens';
  import { Element, Override } from 'dev.latvian.mods.kubejs.client.ModelGenerator';
  import { Part } from 'dev.latvian.mods.kubejs.client.MultipartBlockStateGenerator';
  import { Toast, ToastComponent } from 'net.minecraft.client.gui.components.toasts';
  import { Visibility } from 'Toast';
  import { ParticleType, ParticleOptions } from 'net.minecraft.core.particles';
  import { SpriteSetParticleProvider } from 'dev.latvian.mods.kubejs.client.ParticleProviderRegistryKubeEvent';
  import { ScheduledEvent } from 'dev.latvian.mods.kubejs.util.ScheduledEvents';
  import { SoundGen } from 'dev.latvian.mods.kubejs.client.SoundsGenerator';
  import { Variant } from 'dev.latvian.mods.kubejs.client.VariantBlockStateGenerator';

  interface AtlasSpriteRegistryKubeEvent extends KubeEvent {}
  class AtlasSpriteRegistryKubeEvent extends KubeEvent {
    constructor(registry: Consumer<ResourceLocation>);
    register(id: ResourceLocation): void;
  }


  interface BlockEntityRendererRegistryKubeEvent extends ClientKubeEvent {}
  class BlockEntityRendererRegistryKubeEvent extends ClientKubeEvent {
    constructor(event: RegisterRenderers);
    register(type: BlockEntityType<any>, renderer: BlockEntityRendererProvider): void;
  }


  class ClientAssetPacks {
    static readonly INSTANCE: ClientAssetPacks;
    readonly internalAssetPack: VirtualAssetPack;
    readonly virtualPacks: Map;
    inject(original: PackResources[]): PackResources[];
  }


  interface ClientKubeEvent extends KubeEvent {}
  class ClientKubeEvent extends KubeEvent {
    get client(): Minecraft;
  }


  interface ClientPlayerKubeEvent extends KubePlayerEvent, ClientKubeEvent {}
  class ClientPlayerKubeEvent extends KubePlayerEvent {
    constructor(player: LocalPlayer);
    get entity(): LocalPlayer;
    get player(): LocalPlayer;
  }


  interface ClientProperties extends BaseProperties {}
  class ClientProperties extends BaseProperties {
    windowTitle: string;
    showTagNames: boolean;
    showComponents: boolean;
    showFuelValue: boolean;
    disableRecipeBook: boolean;
    disableComponentCountTooltip: boolean;
    disableTabNameTooltip: boolean;
    exportAtlases: boolean;
    blurScaledPackIcon: boolean;
    customStackSizeText: boolean;
    shrinkStackSizeText: boolean;
    get(key: string): JsonElement;
    get(key: string, def: string): string;
    get(key: string, def: JsonElement): JsonElement;
    get(key: string, def: boolean): boolean;
    get(key: string, def: number): number;
    get(key: string, def: number): number;
    static get (): ClientProperties;
    static reload(): void;
  }


  interface ClientScriptManager extends ScriptManager {}
  class ClientScriptManager extends ScriptManager {
    constructor();
  }


  interface DebugInfoKubeEvent extends ClientPlayerKubeEvent {}
  class DebugInfoKubeEvent extends ClientPlayerKubeEvent {
    constructor(player: LocalPlayer, l: string[]);
    get lines(): string[];
    get showDebug(): boolean;
  }


  class EditorExt {
    static readonly VSCODE: string;
    static readonly VSCODIUM: string;
    static readonly VSCODE_OSS: string;
    static isKnownVSCode(): boolean;
    static openFile(path: Path, line: number, column: number): void;
  }


  interface EntityRendererRegistryKubeEvent extends ClientKubeEvent {}
  class EntityRendererRegistryKubeEvent extends ClientKubeEvent {
    constructor(event: RegisterRenderers);
    register(type: EntityType<any>, renderer: EntityRendererProvider): void;
  }


  interface KeybindRegistryKubeEvent extends ClientKubeEvent {}
  class KeybindRegistryKubeEvent extends ClientKubeEvent {
    build(): KubeKey[];
    register(id: string): Builder;
    register(id: string, defaultKey: string): Builder;
  }


  interface KubeAnimatedParticle extends SimpleAnimatedParticle {}
  class KubeAnimatedParticle extends SimpleAnimatedParticle {
    constructor(level: ClientLevel, x: number, y: number, z: number, sprites: SpriteSet);
    get level(): ClientLevel;
    get random(): RandomSource;
    get spriteSet(): SpriteSet;
    get x(): number;
    get xSpeed(): number;
    get y(): number;
    get ySpeed(): number;
    get z(): number;
    get zSpeed(): number;
    getLightColor(partialTick: number): number;
    onTick(tick: Consumer<KubeAnimatedParticle>): void;
    setColor(color: KubeColor, alpha: boolean): void;
    setColor(color: KubeColor): void;
    setFasterWhenYMotionBlocked(b: boolean): void;
    setFriction(f: number): void;
    setGravity(g: number): void;
    setLightColor(functionParameter: Float2IntFunction): void;
    setPhysicality(hasPhysics: boolean): void;
    setSpeed(speed: Vec3): void;
    tick(): void;
  }


  interface KubeJSClient extends KubeJSCommon {}
  class KubeJSClient extends KubeJSCommon {
    static readonly WHITE_TEXTURE: ResourceLocation;
    static readonly RECIPE_BUTTON_TEXTURE: ResourceLocation;
    static readonly CLIENT_PACKS: Map;
    static clientItemTooltips: List;
    static copyDefaultOptionsFile(optionsFile: File): void;
    static drawStackSize(graphics: GuiGraphics, font: Font, size: number, x: number, y: number, color: number, dropShadow: boolean): number;
    export(packs: ExportablePackResources[]): void;
    static formatNumber(count: number): string;
    generateTypings(source: CommandSourceStack): void;
    get clientPlayer(): Player;
    get webServerWindowTitle(): string;
    handleDataFromServerPacket(channel: string, data: CompoundTag): void;
    static loadPostChains(mc: Minecraft): void;
    openErrors(type: ScriptType): void;
    openErrors(type: ScriptType, errors: ConsoleLine[], warnings: ConsoleLine[]): void;
    static reloadClientScripts(): void;
    reloadConfig(): void;
    reloadStartupScripts(dedicated: boolean): void;
    static resizePostChains(width: number, height: number): void;
    runInMainThread(runnable: Runnable): void;
    updateServerData(data: KubeServerData): void;
  }


  class KubeJSClientEventHandler {
    static readonly COMPONENT_ERROR: Pattern;
    static addClientPacks(event: AddPackFindersEvent): void;
    static blockColors(event: Block): void;
    static clientTick(event: Pre): void;
    static debugInfo(event: DebugText): void;
    get flowingTexture(): ResourceLocation;
    get overlayTexture(): ResourceLocation;
    get stillTexture(): ResourceLocation;
    getRenderOverlayTexture(mc: Minecraft): ResourceLocation;
    static guiPostInit(event: screenevent_init_Post): void;
    static hudPostDraw(event: Post): void;
    static itemColors(event: Item): void;
    static loggingIn(event: LoggingIn): void;
    static loggingOut(event: LoggingOut): void;
    static onItemTooltip(event: ItemTooltipEvent): void;
    static onRegisterClientCommands(event: RegisterClientCommandsEvent): void;
    static openScreenEvent(event: Opening): void;
    static registerClientExtensions(event: RegisterClientExtensionsEvent): void;
    static registerCoreShaders(event: RegisterShadersEvent): void;
    static registerKeyMappings(event: RegisterKeyMappingsEvent): void;
    static registerMenuScreens(event: RegisterMenuScreensEvent): void;
    static registerParticleProviders(event: RegisterParticleProvidersEvent): void;
    static registerRenderers(event: RegisterRenderers): void;
    static screenPostDraw(event: screenevent_render_Post): void;
    static setScreen(screen: Screen): Screen;
    static setupClient(event: FMLClientSetupEvent): void;
    static tagsUpdated(event: TagsUpdatedEvent): void;
    static testRequirements(mc: Minecraft, event: DynamicItemTooltipsKubeEvent, r: TooltipRequirements): boolean;
    static worldRender(event: RenderLevelStageEvent): void;
  }


  interface KubeJSErrorScreen extends Screen {}
  class KubeJSErrorScreen extends Screen {
    readonly lastScreen: Screen;
    readonly scriptType: ScriptType;
    readonly logFile: Path;
    readonly errors: List;
    readonly warnings: List;
    readonly canClose: boolean;
    viewing: List;
    constructor(lastScreen: Screen, scriptType: ScriptType, logFile: Path, errors: ConsoleLine[], warnings: ConsoleLine[], canClose: boolean);

    constructor(lastScreen: Screen, console: ConsoleJS, canClose: boolean);
    get narrationMessage(): Component;
    onClose(): void;
    render(guiGraphics: GuiGraphics, mx: number, my: number, delta: number): void;
    shouldCloseOnEsc(): boolean;
  }


  class KubeJSKeybinds {
    static readonly TARGET: EventTargetType;
    static generateLang(event: LangKubeEvent): void;
    static get(id: string): KubeKey;
    static getOrCreate(id: string): KubeKey;
    static triggerKeyEvents(client: Minecraft): void;
    static triggerReload(): void;
  }


  interface KubeJSResourcePackFinder extends RepositorySource {}
  class KubeJSResourcePackFinder extends RepositorySource {
    loadPacks(nameToPackMap: Consumer<Pack>): void;
  }


  class KubeSessionData {
    activePostShader: ResourceLocation;
    recipeViewerData: RecipeViewerData;
    itemTooltips: List;
    static of(listener: ClientPacketListener): KubeSessionData;
    static of(mc: Minecraft): KubeSessionData;
    sync(data: KubeServerData): void;
  }


  class LoadedTexture {
    static readonly EMPTY: LoadedTexture;
    readonly width: number;
    readonly height: number;
    readonly pixels: number[];
    readonly mcmeta: number[];
    constructor(width: number, height: number, pixels: number[], mcmeta: number[]);

    constructor(img: BufferedImage, mcmeta: number[]);
    copy(): LoadedTexture;
    static load(id: ResourceLocation): LoadedTexture;
    remap(remap: Map<KubeColor, KubeColor>): LoadedTexture;
    resize(newWidth: number, newHeight: number): LoadedTexture;
    tint(tint: KubeColor): LoadedTexture;
    toBytes(): number[];
  }


  interface MenuScreenRegistryKubeEvent extends ClientKubeEvent {}
  class MenuScreenRegistryKubeEvent extends ClientKubeEvent {
    constructor(event: RegisterMenuScreensEvent);
    register(type: MenuType<any>, constructor: ScreenConstructor): void;
  }


  class ModelGenerator {
    custom(json: Consumer<JsonObject>): void;
    element(consumer: Consumer<Element>): void;
    override(model: ResourceLocation, override: Consumer<Override>): void;
    parent(s: ResourceLocation): void;
    texture(name: string, texture: string): void;
    texture(name: string[], texture: string): void;
    textures(map: Map<string, string>): void;
    toJson(): JsonObject;
  }


  class MultipartBlockStateGenerator {
    part(when: string, consumer: Consumer<Part>): void;
    part(when: string, model: ResourceLocation, v: Part): void;
    toJson(): JsonObject;
  }


  interface NotificationToast extends Toast {}
  class NotificationToast extends Toast {
    constructor(mc: Minecraft, notification: NotificationToastData);
    height(): number;
    render(graphics: GuiGraphics, toastComponent: ToastComponent, l: number): Visibility;
    width(): number;
  }


  class ParticleGenerator {
    textures: List;
    texture(texture: string): ParticleGenerator;
    textures(textures: string[]): ParticleGenerator;
    toJson(): JsonObject;
  }


  interface ParticleProviderRegistryKubeEvent extends ClientKubeEvent {}
  class ParticleProviderRegistryKubeEvent extends ClientKubeEvent {
    constructor(event: RegisterParticleProvidersEvent);
    register<T extends ParticleOptions>(type: ParticleType<T>, spriteProvider: SpriteSetParticleProvider<T>): void;
    register<T extends ParticleOptions>(type: ParticleType<T>, particle: Consumer<KubeAnimatedParticle>): void;
    register<T extends ParticleOptions>(type: ParticleType<T>, p: KubeAnimatedParticle): void;
    registerSpecial<T extends ParticleOptions>(type: ParticleType<T>, provider: ParticleProvider<T>): void;
  }


  interface ScheduledClientEvent extends ScheduledEvent {}
  class ScheduledClientEvent extends ScheduledEvent {
    static readonly EVENTS: ScheduledEvents;
    get client(): Minecraft;
  }


  class SoundsGenerator {
    addSound(path: string, consumer: Consumer<SoundGen>, overlayExisting: boolean): void;
    addSound(path: string, consumer: Consumer<SoundGen>): void;
    toJson(): JsonObject;
  }


  class VariantBlockStateGenerator {
    simpleVariant(key: string, model: ResourceLocation, v: Variant): void;
    toJson(): JsonObject;
    variant(key: string, consumer: Consumer<Variant>): void;
    variant(key: string, model: ResourceLocation): void;
  }

}

declare module 'dev.latvian.mods.kubejs.client.editor' {
  import { Screen } from 'net.minecraft.client.gui.screens';

  class EditorCallback<T = any> {
    callback(var1: T, var2: boolean): void;
  }


  interface SelectItemStackScreen extends Screen {}
  class SelectItemStackScreen extends Screen {
    readonly callback: EditorCallback;
  }

}

declare module 'dev.latvian.mods.kubejs.client.highlight' {
  import { ClientPlayerKubeEvent } from 'dev.latvian.mods.kubejs.client';
  import { Minecraft, KeyMapping } from 'net.minecraft.client';
  import { BlockPos } from 'net.minecraft.core';
  import { KubeColor } from 'dev.latvian.mods.kubejs.color';
  import { Entity, EntityType } from 'net.minecraft.world.entity';
  import { EntitySelector } from 'net.minecraft.commands.arguments.selector';
  import { LevelBlock } from 'dev.latvian.mods.kubejs.level';
  import { Mode, ShaderChain } from 'dev.latvian.mods.kubejs.client.highlight.HighlightRenderer';
  import { ShaderInstance } from 'net.minecraft.client.renderer';
  import { Set, List, Collection } from 'java.util';
  import { Reference2IntMap } from 'it.unimi.dsi.fastutil.objects';
  import { Long2IntMap } from 'it.unimi.dsi.fastutil.longs';
  import { IntOpenHashSet } from 'it.unimi.dsi.fastutil.ints';
  import { RenderLevelStageEvent } from 'net.neoforged.neoforge.client.event';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Integer } from 'java.lang';
  import { ItemStack } from 'net.minecraft.world.item';
  import { SlotItem } from 'dev.latvian.mods.kubejs.client.highlight.KubedexPayloadHandler';

  interface HighlightKubeEvent extends ClientPlayerKubeEvent {}
  class HighlightKubeEvent extends ClientPlayerKubeEvent {
    constructor(mc: Minecraft, renderer: HighlightRenderer);
    addBlock(pos: BlockPos, color: KubeColor): void;
    addBlocks(from: BlockPos, to: BlockPos, color: KubeColor): void;
    addEntities(selector: EntitySelector, color: KubeColor): void;
    addEntitiesByType(type: EntityType<any>, color: KubeColor): void;
    addEntity(entity: Entity, color: KubeColor): void;
    addTarget(color: KubeColor): void;
    addTargetBlock(color: KubeColor): void;
    addTargetEntity(color: KubeColor): void;
    get client(): Minecraft;
    get targetBlock(): LevelBlock;
    get targetEntity(): Entity;
  }


  class HighlightRenderer {
    static INSTANCE: HighlightRenderer;
    static keyMapping: KeyMapping;
    color: KubeColor;
    mode: Mode;
    actualKey: boolean;
    worldChain: ShaderChain;
    guiChain: ShaderChain;
    highlightShader: ShaderInstance;
    readonly hoveredSlots: Set;
    readonly highlightedEntities: Reference2IntMap;
    readonly highlightedBlocks: Long2IntMap;
    readonly uniqueColors: IntOpenHashSet;
    cancelBlockHighlight: boolean;
    clearBuffers(mc: Minecraft): void;
    hudPostDraw(mc: Minecraft, graphics: GuiGraphics, delta: number): void;
    loadPostChains(mc: Minecraft): void;
    renderAfterEntities(mc: Minecraft, event: RenderLevelStageEvent): void;
    renderAfterLevel(mc: Minecraft, event: RenderLevelStageEvent): void;
    resizePostChains(width: number, height: number): void;
    screen(mc: Minecraft, graphics: GuiGraphics, screen: AbstractContainerScreen<any>, mx: number, my: number, delta: number): void;
    tickPre(mc: Minecraft): void;
    updateDepth(mc: Minecraft): void;
  }


  class KubedexPayloadHandler {
    static block(player: ServerPlayer, pos: BlockPos, flags: number): void;
    static entity(player: ServerPlayer, entityId: number, flags: number): void;
    static inventory(player: ServerPlayer, slots: number[], stacks: ItemStack[], flags: number): void;
    static itemStacks(player: ServerPlayer, stacks: Collection<SlotItem>, flags: number): void;
  }

}

declare module 'dev.latvian.mods.kubejs.client.highlight.HighlightRenderer' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Mode extends Enum<Mode> {}
  class Mode extends Enum<Mode> {
    static readonly NONE: Mode;
    static readonly SCREEN: Mode;
    static readonly WORLD: Mode;
    static valueOf(name: string): Mode;
    static values(): Mode[];
  }

}

declare module 'dev.latvian.mods.kubejs.client.icon' {
  import { Codec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Lazy } from 'dev.latvian.mods.kubejs.util';
  import { Minecraft } from 'net.minecraft.client';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class KubeIcon {
    static readonly CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    static readonly OPTIONAL_STREAM_CODEC: StreamCodec;
    get type(): KubeIconType<any>;
  }


  class KubeIconRenderer {
    static readonly RENDERERS: Lazy;
    draw(var1: Minecraft, var2: GuiGraphics, var3: number, var4: number, var5: number): void;
    static from(icon: KubeIcon): KubeIconRenderer;
  }


  class KubeIconTypeRegistry {
    register(var1: KubeIconType<any>): void;
  }

}

declare module 'dev.latvian.mods.kubejs.client.icon.KubeIconRenderer' {
  import { KubeIconType, KubeIconRenderer, KubeIcon } from 'dev.latvian.mods.kubejs.client.icon';
  import { Function } from 'java.util.function';

  class Registry {
    register<T extends KubeIcon>(var1: KubeIconType<T>, var2: Function<T, KubeIconRenderer>): void;
  }

}

declare module 'dev.latvian.mods.kubejs.client.KeybindRegistryKubeEvent' {
  import { KeyConflictContext, KeyModifier } from 'net.neoforged.neoforge.client.settings';
  import { Type } from 'InputConstants';
  import { KubeKey } from 'dev.latvian.mods.kubejs.client.KubeJSKeybinds';

  class Builder {
    category(category: string): Builder;
    conflictContext(keyConflictContext: KeyConflictContext): Builder;
    create(): KubeKey;
    defaultKey(keyName: string): Builder;
    gui(): Builder;
    inGame(): Builder;
    inputType(inputType: Type): Builder;
    modifier(modifier: KeyModifier): Builder;
    mouseInputType(): Builder;
    scanCodeInputType(): Builder;
  }

}

declare module 'dev.latvian.mods.kubejs.client.KubeJSErrorScreen' {
  import { ObjectSelectionList } from 'net.minecraft.client.gui.components';
  import { KubeJSErrorScreen } from 'dev.latvian.mods.kubejs.client';
  import { List, Calendar } from 'java.util';
  import { Minecraft } from 'net.minecraft.client';
  import { ConsoleLine } from 'dev.latvian.mods.kubejs.script';
  import { Entry as objectselectionlist_Entry } from 'ObjectSelectionList';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface ErrorList extends ObjectSelectionList<Entry> {}
  class ErrorList extends ObjectSelectionList<Entry> {
    readonly screen: KubeJSErrorScreen;
    readonly lines: List;
    constructor(screen: KubeJSErrorScreen, minecraft: Minecraft, width: number, height: number, top: number, bottom: number, lines: ConsoleLine[]);
    get rowWidth(): number;
    keyPressed(i: number, j: number, k: number): boolean;
  }


  interface Entry extends objectselectionlist_Entry<Entry> {}
  class Entry extends objectselectionlist_Entry<Entry> {
    constructor(errorList: ErrorList, minecraft: Minecraft, index: number, line: ConsoleLine, calendar: Calendar);
    get narration(): Component;
    mouseClicked(d: number, e: number, i: number): boolean;
    open(): void;
    render(g: GuiGraphics, idx: number, y: number, x: number, w: number, h: number, mx: number, my: number, hovered: boolean, delta: number): void;
  }

}

declare module 'dev.latvian.mods.kubejs.client.KubeJSKeybinds' {
  import { KeyMapping } from 'net.minecraft.client';
  import { ClientPlayerKubeEvent } from 'dev.latvian.mods.kubejs.client';
  import { LocalPlayer } from 'net.minecraft.client.player';

  class KubeKey {
    readonly id: string;
    mapping: KeyMapping;
    down: boolean;
    ticksPressed: number;
    constructor(id: string);
    equals(obj: any): boolean;
    hashCode(): number;
  }


  interface KeyEvent extends ClientPlayerKubeEvent {}
  class KeyEvent extends ClientPlayerKubeEvent {
    constructor(player: LocalPlayer, key: KubeKey);
  }


  interface TickingKeyEvent extends KeyEvent {}
  class TickingKeyEvent extends KeyEvent {
    constructor(player: LocalPlayer, key: KubeKey);
    get ticks(): number;
  }

}

declare module 'dev.latvian.mods.kubejs.client.ModelGenerator' {
  import { JsonObject } from 'com.google.gson';
  import { AABB } from 'net.minecraft.world.phys';
  import { Consumer } from 'java.util.function';
  import { Direction } from 'net.minecraft.core';
  import { ResourceLocation } from 'net.minecraft.resources';

  class Element {
    allFaces(face: Consumer<Face>): void;
    faces(sides: Direction[], face: Consumer<Face>): void;
    size(b: AABB): Element;
    toJson(): JsonObject;
  }


  class Override {
    constructor(model: ResourceLocation);
    predicate(property: ResourceLocation, value: number): void;
    toJson(): JsonObject;
  }


  class Face {
    readonly side: Direction;
    constructor(side: Direction);
    cull(d: Direction): Face;
    cull(): Face;
    tex(t: string): Face;
    tintindex(i: number): Face;
    toJson(): JsonObject;
    uv(u0: number, v0: number, u1: number, v1: number): Face;
  }

}

declare module 'dev.latvian.mods.kubejs.client.MultipartBlockStateGenerator' {
  import { Model } from 'dev.latvian.mods.kubejs.client.VariantBlockStateGenerator';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { JsonObject } from 'com.google.gson';

  class Part {
    model(s: ResourceLocation): Model;
    toJson(): JsonObject;
  }

}

declare module 'dev.latvian.mods.kubejs.client.ParticleProviderRegistryKubeEvent' {
  import { SpriteParticleRegistration } from 'ParticleEngine';
  import { Particle, SpriteSet, ParticleProvider } from 'net.minecraft.client.particle';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';

  interface SpriteSetParticleProvider<T extends ParticleOptions = any> extends SpriteParticleRegistration<T> {}
  class SpriteSetParticleProvider<T extends ParticleOptions = any> extends SpriteParticleRegistration<T> {
    create(var1: T, var2: ClientLevel, var3: number, var5: number, var7: number, var9: SpriteSet, var10: number, var12: number, var14: number): Particle;
    create(sprites: SpriteSet): ParticleProvider<T>;
  }

}

declare module 'dev.latvian.mods.kubejs.client.SoundsGenerator' {
  import { Consumer } from 'java.util.function';
  import { JsonObject, JsonElement } from 'com.google.gson';

  class SoundGen {
    replace(b: boolean): SoundGen;
    replace(): SoundGen;
    sound(file: string): SoundGen;
    sound(file: string, consumer: Consumer<SoundInstance>): SoundGen;
    sounds(...sounds: string[]): SoundGen;
    subtitle(subtitle: string): SoundGen;
    toJson(): JsonObject;
  }


  class SoundInstance {
    constructor(fileLocation: string);
    asReferenceToEvent(): SoundInstance;
    attenuationDistance(i: number): SoundInstance;
    pitch(f: number): SoundInstance;
    preload(b: boolean): SoundInstance;
    preload(): SoundInstance;
    stream(b: boolean): SoundInstance;
    stream(): SoundInstance;
    toJson(): JsonElement;
    volume(f: number): SoundInstance;
    weight(i: number): SoundInstance;
  }

}

declare module 'dev.latvian.mods.kubejs.client.VariantBlockStateGenerator' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { JsonElement, JsonObject } from 'com.google.gson';

  class Variant {
    model(s: ResourceLocation): Model;
    toJson(): JsonElement;
  }


  class Model {
    model(s: ResourceLocation): Model;
    toJson(): JsonObject;
    uvlock(): Model;
    x(x: number): Model;
    y(y: number): Model;
  }

}

declare module 'dev.latvian.mods.kubejs.codec' {
  import { Codec, MapCodec, DataResult } from 'com.mojang.serialization';
  import { Function, Predicate } from 'java.util.function';
  import { Enum, Throwable, Long } from 'java.lang';
  import { JsonElement } from 'com.google.gson';
  import { NumberProvider } from 'net.minecraft.world.level.storage.loot.providers.number';
  import { List } from 'java.util';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Function8, Function9 } from 'com.mojang.datafixers.util';

  class KubeJSCodecs {
    static readonly CHARACTER: Codec;
    static readonly KUBEJS_ID: Codec;
    static readonly ENUM_CLASS: Codec;
    static readonly ENUM_TYPE_INFO: Codec;
    static readonly REGISTRY_KEY: Codec;
    static readonly ENTITY_TYPE_FIELD: MapCodec;
    static readonly DURATION: Codec;
    static readonly REGISTRY_KEY_CODEC: Codec;
    static readonly JSON_MAP: Codec;
    static readonly NON_NEGATIVE_INT: Codec;
    static readonly POSITIVE_INT: Codec;
    static readonly NON_NEGATIVE_LONG: Codec;
    static readonly POSITIVE_LONG: Codec;
    static readonly NON_NEGATIVE_FLOAT: Codec;
    static readonly POSITIVE_FLOAT: Codec;
    static readonly NON_NEGATIVE_DOUBLE: Codec;
    static readonly POSITIVE_DOUBLE: Codec;
    static byName<E extends Enum<E>>(codec: Codec<E>, s: string): E;
    static filter<T>(result: DataResult<T>, ifSuccess: Predicate<T>): boolean;
    static filter<T>(result: DataResult<T>, ifSuccess: Predicate<T>, orElse: boolean): boolean;
    static fromJsonOrThrow<E>(json: JsonElement, codec: Codec<E>): E;
    static fromJsonOrThrow<E, X extends Throwable>(json: JsonElement, codec: Codec<E>, onError: Function<string, X>): E;
    static getUniqueId<T>(input: T, codec: Codec<T>, o: T): string;
    static listOfOrSelf<T>(codec: Codec<T>): Codec<T[]>;
    static listOfOrSelf<T>(listCodec: Codec<T[]>, codec: Codec<T>): Codec<T[]>;
    static longRangeWithMessage(min: number, max: number, errorMessage: Function<Long, string>): Codec<Long>;
    static numberProviderJson(gen: NumberProvider): JsonElement;
    static or<V>(codecs: Codec<V>[]): Codec<V>;
    static or<V>(first: Codec<V>, second: Codec<V>): Codec<V>;
    static stringResolverCodec<E>(toStringFunction: Function<E, string>, fromStringFunction: Function<string, E>): Codec<E>;
    static toJsonOrThrow<E>(value: E, codec: Codec<E>): JsonElement;
    static toJsonOrThrow<E, X extends Throwable>(value: E, codec: Codec<E>, onError: Function<string, X>): JsonElement;
  }


  class KubeJSStreamCodecs {
    static readonly INT_PROVIDER: StreamCodec;
    static readonly KUBEJS_ID: StreamCodec;
    static readonly JSON_ELEMENT: StreamCodec;
    static readonly DURATION: StreamCodec;
    static composite<B, C, T1, T2, T3, T4, T5, T6, T7, T8>(codec1: StreamCodec<B, T1>, getter1: Function<C, T1>, codec2: StreamCodec<B, T2>, getter2: Function<C, T2>, codec3: StreamCodec<B, T3>, getter3: Function<C, T3>, codec4: StreamCodec<B, T4>, getter4: Function<C, T4>, codec5: StreamCodec<B, T5>, getter5: Function<C, T5>, codec6: StreamCodec<B, T6>, getter6: Function<C, T6>, codec7: StreamCodec<B, T7>, getter7: Function<C, T7>, codec8: StreamCodec<B, T8>, getter8: Function<C, T8>, func: Function8<T1, T2, T3, T4, T5, T6, T7, T8, C>, buf: B, buf: B, value: C): StreamCodec<B, C>;
    static composite<B, C, T1, T2, T3, T4, T5, T6, T7, T8, T9>(codec1: StreamCodec<B, T1>, getter1: Function<C, T1>, codec2: StreamCodec<B, T2>, getter2: Function<C, T2>, codec3: StreamCodec<B, T3>, getter3: Function<C, T3>, codec4: StreamCodec<B, T4>, getter4: Function<C, T4>, codec5: StreamCodec<B, T5>, getter5: Function<C, T5>, codec6: StreamCodec<B, T6>, getter6: Function<C, T6>, codec7: StreamCodec<B, T7>, getter7: Function<C, T7>, codec8: StreamCodec<B, T8>, getter8: Function<C, T8>, codec9: StreamCodec<B, T9>, getter9: Function<C, T9>, func: Function9<T1, T2, T3, T4, T5, T6, T7, T8, T9, C>, buf: B, buf: B, value: C): StreamCodec<B, C>;
  }

}

declare module 'dev.latvian.mods.kubejs.color' {
  import { SpecialEquality } from 'dev.latvian.mods.rhino.util';
  import { Codec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { TextColor } from 'net.minecraft.network.chat';
  import { Context } from 'dev.latvian.mods.rhino';

  interface KubeColor extends SpecialEquality {}
  class KubeColor extends SpecialEquality {
    static readonly CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    static readonly OPTIONAL_STREAM_CODEC: StreamCodec;
    kjs$createTextColor(): TextColor;
    kjs$getARGB(): number;
    kjs$getFireworkRGB(): number;
    kjs$getRGB(): number;
    kjs$serialize(): string;
    kjs$toHexString(): string;
    specialEquals(cx: Context, o: any, shallow: boolean): boolean;
  }


  interface NoColor extends KubeColor {}
  class NoColor extends KubeColor {
    kjs$createTextColor(): TextColor;
    kjs$getARGB(): number;
    kjs$getRGB(): number;
    kjs$serialize(): string;
    kjs$toHexString(): string;
  }


  interface SimpleColor extends KubeColor {}
  class SimpleColor extends KubeColor {
    static readonly BLACK: SimpleColor;
    static readonly WHITE: SimpleColor;
    constructor(v: number);
    kjs$createTextColor(): TextColor;
    kjs$getARGB(): number;
    kjs$toHexString(): string;
    toString(): string;
  }


  interface SimpleColorWithAlpha extends KubeColor {}
  class SimpleColorWithAlpha extends KubeColor {
    constructor(v: number);
    kjs$createTextColor(): TextColor;
    kjs$getARGB(): number;
    toString(): string;
  }

}

declare module 'dev.latvian.mods.kubejs.command' {
  import { CommandContext } from 'com.mojang.brigadier.context';
  import { CommandSourceStack, CommandBuildContext, Commands, SharedSuggestionProvider } from 'net.minecraft.commands';
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { Enum } from 'java.lang';
  import { ClassWrapper } from 'dev.latvian.mods.kubejs.util';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { List, Collection } from 'java.util';
  import { KubeEvent } from 'dev.latvian.mods.kubejs.event';
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSelection } from 'Commands';
  import { LiteralCommandNode } from 'com.mojang.brigadier.tree';
  import { LiteralArgumentBuilder, ArgumentBuilder } from 'com.mojang.brigadier.builder';
  import { Registry } from 'net.minecraft.core';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { InteractionHand } from 'net.minecraft.world';
  import { ItemStack } from 'net.minecraft.world.item';
  import { PersistentDataFactory } from 'dev.latvian.mods.kubejs.command.PersistentDataCommands';

  class ArgumentFunction<U = any> {
    getResult(var1: CommandContext<CommandSourceStack>, var2: string): U;
  }


  class ArgumentTypeWrapper {
    create(var1: CommandRegistryKubeEvent): ArgumentType<any>;
    getResult(var1: CommandContext<CommandSourceStack>, var2: string): any;
  }


  interface ArgumentTypeWrappers extends Enum<ArgumentTypeWrappers> {}
  class ArgumentTypeWrappers extends Enum<ArgumentTypeWrappers> {
    static readonly BOOLEAN: ArgumentTypeWrappers;
    static readonly FLOAT: ArgumentTypeWrappers;
    static readonly DOUBLE: ArgumentTypeWrappers;
    static readonly INTEGER: ArgumentTypeWrappers;
    static readonly LONG: ArgumentTypeWrappers;
    static readonly STRING: ArgumentTypeWrappers;
    static readonly GREEDY_STRING: ArgumentTypeWrappers;
    static readonly WORD: ArgumentTypeWrappers;
    static readonly ENTITY: ArgumentTypeWrappers;
    static readonly ENTITIES: ArgumentTypeWrappers;
    static readonly PLAYER: ArgumentTypeWrappers;
    static readonly PLAYERS: ArgumentTypeWrappers;
    static readonly GAME_PROFILE: ArgumentTypeWrappers;
    static readonly BLOCK_POS: ArgumentTypeWrappers;
    static readonly BLOCK_POS_LOADED: ArgumentTypeWrappers;
    static readonly COLUMN_POS: ArgumentTypeWrappers;
    static readonly VEC3: ArgumentTypeWrappers;
    static readonly VEC2: ArgumentTypeWrappers;
    static readonly VEC3_CENTERED: ArgumentTypeWrappers;
    static readonly VEC2_CENTERED: ArgumentTypeWrappers;
    static readonly BLOCK_STATE: ArgumentTypeWrappers;
    static readonly BLOCK_PREDICATE: ArgumentTypeWrappers;
    static readonly ITEM_STACK: ArgumentTypeWrappers;
    static readonly ITEM_PREDICATE: ArgumentTypeWrappers;
    static readonly COLOR: ArgumentTypeWrappers;
    static readonly COMPONENT: ArgumentTypeWrappers;
    static readonly MESSAGE: ArgumentTypeWrappers;
    static readonly NBT_COMPOUND: ArgumentTypeWrappers;
    static readonly NBT_TAG: ArgumentTypeWrappers;
    static readonly NBT_PATH: ArgumentTypeWrappers;
    static readonly PARTICLE: ArgumentTypeWrappers;
    static readonly ANGLE: ArgumentTypeWrappers;
    static readonly ROTATION: ArgumentTypeWrappers;
    static readonly SWIZZLE: ArgumentTypeWrappers;
    static readonly ITEM_SLOT: ArgumentTypeWrappers;
    static readonly RESOURCE_LOCATION: ArgumentTypeWrappers;
    static readonly ENTITY_ANCHOR: ArgumentTypeWrappers;
    static readonly INT_RANGE: ArgumentTypeWrappers;
    static readonly FLOAT_RANGE: ArgumentTypeWrappers;
    static readonly DIMENSION: ArgumentTypeWrappers;
    static readonly TIME: ArgumentTypeWrappers;
    static readonly UUID: ArgumentTypeWrappers;
    static readonly OBJECTIVE: ArgumentTypeWrappers;
    static byName(name: ResourceLocation): ClassWrapper<any>;
    create(event: CommandRegistryKubeEvent): ArgumentType<any>;
    create(event: CommandRegistryKubeEvent): ArgumentType<any>;
    getResult(context: CommandContext<CommandSourceStack>, input: string): any;
    getResult(context: CommandContext<CommandSourceStack>, input: string): any;
    static printAll(): void;
    static registry(event: CommandRegistryKubeEvent, reg: ResourceLocation, event: CommandRegistryKubeEvent, context: CommandContext<CommandSourceStack>, input: string): ArgumentTypeWrapper;
    time(minRequired: number): ArgumentTypeWrapper;
    static valueOf(name: string): ArgumentTypeWrappers;
    static values(): ArgumentTypeWrappers[];
  }


  interface CommandRegistryKubeEvent extends KubeEvent {}
  class CommandRegistryKubeEvent extends KubeEvent {
    readonly dispatcher: CommandDispatcher;
    readonly context: CommandBuildContext;
    readonly selection: CommandSelection;
    constructor(dispatcher: CommandDispatcher<CommandSourceStack>, context: CommandBuildContext, selection: CommandSelection);
    get arguments(): ClassWrapper<ArgumentTypeWrappers>;
    get builtinSuggestions(): ClassWrapper<SharedSuggestionProvider>;
    get commands(): ClassWrapper<Commands>;
    get registry(): CommandBuildContext;
    isForMultiPlayer(): boolean;
    isForSinglePlayer(): boolean;
    register(command: LiteralArgumentBuilder<CommandSourceStack>): LiteralCommandNode<CommandSourceStack>;
  }


  class DumpCommands {
    static events(source: CommandSourceStack): number;
    static registry<T>(source: CommandSourceStack, registry: ResourceKey<Registry<T>>): number;
  }


  class InformationCommands {
    static dump(stacks: ItemStack[], player: ServerPlayer, name: string): number;
    static hand(player: ServerPlayer, hand: InteractionHand): number;
    static hotbar(player: ServerPlayer): number;
    static inventory(player: ServerPlayer): number;
  }


  class KubeJSClientCommands {
    static register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }


  class KubeJSCommands {
    static register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }


  class PersistentDataCommands {
    static addPersistentDataCommands(cmd: ArgumentBuilder<CommandSourceStack, any>, factory: PersistentDataFactory): ArgumentBuilder<CommandSourceStack, any>;
  }


  class StageCommands {
    static addStage(source: CommandSourceStack, players: Collection<ServerPlayer>, stage: string): number;
    static clearStages(source: CommandSourceStack, players: Collection<ServerPlayer>): number;
    static listStages(source: CommandSourceStack, players: Collection<ServerPlayer>): number;
    static removeStage(source: CommandSourceStack, players: Collection<ServerPlayer>, stage: string): number;
  }

}

declare module 'dev.latvian.mods.kubejs.command.PersistentDataCommands' {
  import { SimpleCommandExceptionType } from 'com.mojang.brigadier.exceptions';
  import { Collection } from 'java.util';
  import { WithPersistentData } from 'dev.latvian.mods.kubejs.core';
  import { CommandContext } from 'com.mojang.brigadier.context';
  import { CommandSourceStack } from 'net.minecraft.commands';

  class PersistentDataFactory {
    static readonly EMPTY_LIST: SimpleCommandExceptionType;
    apply(var1: CommandContext<CommandSourceStack>): Collection<WithPersistentData>;
    getAll(ctx: CommandContext<CommandSourceStack>): Collection<WithPersistentData>;
    getOne(ctx: CommandContext<CommandSourceStack>): WithPersistentData;
  }

}

declare module 'dev.latvian.mods.kubejs' {
  import { BaseProperties } from 'dev.latvian.mods.kubejs.util';
  import { JsonElement } from 'com.google.gson';
  import { Component } from 'net.minecraft.network.chat';
  import { Logger } from 'org.slf4j';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';
  import { Dist } from 'net.neoforged.api.distmarker';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ScriptManager, ScriptType, ConsoleLine } from 'dev.latvian.mods.kubejs.script';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { List, Set } from 'java.util';
  import { ExportablePackResources } from 'dev.latvian.mods.kubejs.script.data';
  import { Runnable } from 'java.lang';
  import { KubeServerData } from 'dev.latvian.mods.kubejs.net';
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { ClassNode } from 'org.objectweb.asm.tree';
  import { BuildCreativeModeTabContentsEvent } from 'net.neoforged.neoforge.event';
  import { FMLLoadCompleteEvent } from 'net.neoforged.fml.event.lifecycle';
  import { RegisterCapabilitiesEvent } from 'net.neoforged.neoforge.capabilities';
  import { MutableBoolean } from 'org.apache.commons.lang3.mutable';
  import { Path } from 'java.nio.file';
  import { PackType } from 'net.minecraft.server.packs';

  interface CommonProperties extends BaseProperties {}
  class CommonProperties extends BaseProperties {
    hideServerScriptErrors: boolean;
    serverOnly: boolean;
    announceReload: boolean;
    packMode: string;
    saveDevPropertiesInConfig: boolean;
    allowAsyncStreams: boolean;
    matchJsonRecipes: boolean;
    ignoreCustomUniqueRecipeIds: boolean;
    startupErrorGUI: boolean;
    startupErrorReportUrl: string;
    removeSlotLimit: boolean;
    defaultMaxStackSize: number;
    creativeModeTabIcon: JsonElement;
    creativeModeTabName: JsonElement;
    get(key: string): JsonElement;
    get(key: string, def: string): string;
    get(key: string, def: JsonElement): JsonElement;
    get(key: string, def: boolean): boolean;
    get(key: string, def: number): number;
    get(key: string, def: number): number;
    static get (): CommonProperties;
    get creativeModeTabName(): Component;
    getMaxSlotSize(original: number): number;
    getMaxStackSize(original: number): number;
    static reload(): void;
    setPackMode(s: string): void;
  }


  interface DevProperties extends BaseProperties {}
  class DevProperties extends BaseProperties {
    virtualPackOutput: boolean;
    logRegistryTypes: boolean;
    logRegistryEventObjects: boolean;
    logAddedRecipes: boolean;
    logRemovedRecipes: boolean;
    logModifiedRecipes: boolean;
    logSkippedRecipes: boolean;
    logRecipeDebug: boolean;
    logSkippedTags: boolean;
    logErroringRecipes: boolean;
    logErroringParsedRecipes: boolean;
    logInvalidRecipeHandlers: boolean;
    logSkippedPlugins: boolean;
    logGeneratedData: boolean;
    logEventErrorStackTrace: boolean;
    logChangesInChat: boolean;
    strictTags: boolean;
    alwaysCaptureErrors: boolean;
    reloadOnFileSave: boolean;
    openUriFormat: string;
    kubedexSound: string;
    get(key: string): JsonElement;
    get(key: string, def: string): string;
    get(key: string, def: JsonElement): JsonElement;
    get(key: string, def: boolean): boolean;
    get(key: string, def: number): number;
    get(key: string, def: number): number;
    static get (): DevProperties;
    static reload(): void;
  }


  class KubeJS {
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static readonly LOGGER: Logger;
    static readonly MC_VERSION_NUMBER: number;
    static readonly MC_VERSION_STRING: string;
    static QUERY: string;
    static VERSION: string;
    static DISPLAY_NAME: string;
    static modEventBus: IEventBus;
    static thisMod: ModContainer;
    static PROXY: KubeJSCommon;
    constructor(bus: IEventBus, dist: Dist, mod: ModContainer);
    static get clientScriptManager(): ScriptManager;
    static get startupScriptManager(): ScriptManager;
    static id(path: string): ResourceLocation;
  }


  class KubeJSCommon {
    export(packs: ExportablePackResources[]): void;
    generateTypings(source: CommandSourceStack): void;
    get clientPlayer(): Player;
    get webServerWindowTitle(): string;
    handleDataFromServerPacket(channel: string, data: CompoundTag): void;
    openErrors(type: ScriptType): void;
    openErrors(type: ScriptType, errors: ConsoleLine[], warnings: ConsoleLine[]): void;
    reloadConfig(): void;
    reloadStartupScripts(dedicated: boolean): void;
    runInMainThread(runnable: Runnable): void;
    updateServerData(data: KubeServerData): void;
  }


  class KubeJSComponents {
  }


  interface KubeJSMixinPlugin extends IMixinConfigPlugin {}
  class KubeJSMixinPlugin extends IMixinConfigPlugin {
    acceptTargets(myTargets: Set<string>, otherTargets: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    onLoad(mixinPackage: string): void;
    postApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    preApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    shouldApplyMixin(targetClassName: string, mixinClassName: string): boolean;
  }


  class KubeJSModEventHandler {
    static creativeTab(event: BuildCreativeModeTabContentsEvent): void;
    static loadComplete(event: FMLLoadCompleteEvent): void;
    static registerCapabilities(event: RegisterCapabilitiesEvent): void;
  }


  class KubeJSPaths {
    static readonly FIRST_RUN: MutableBoolean;
    static readonly GAMEDIR: Path;
    static readonly DIRECTORY: Path;
    static readonly DATA: Path;
    static readonly ASSETS: Path;
    static readonly STARTUP_SCRIPTS: Path;
    static readonly SERVER_SCRIPTS: Path;
    static readonly CLIENT_SCRIPTS: Path;
    static readonly CONFIG: Path;
    static readonly COMMON_PROPERTIES: Path;
    static readonly CLIENT_PROPERTIES: Path;
    static readonly WEB_SERVER_PROPERTIES: Path;
    static readonly CONFIG_DEV_PROPERTIES: Path;
    static readonly PACKICON: Path;
    static readonly README: Path;
    static readonly LOCAL: Path;
    static readonly LOCAL_DEV_PROPERTIES: Path;
    static readonly EXPORT: Path;
    static readonly EXPORTED_PACKS: Path;
    static readonly LOCAL_STARTUP_SCRIPTS: Path;
    static readonly LOCAL_SERVER_SCRIPTS: Path;
    static dir(dir: Path, markFirstRun: boolean): Path;
    static dir(dir: Path): Path;
    static get(type: PackType): Path;
    static getLocalDevProperties(): Path;
    static verifyFilePath(path: Path): Path;
  }


  interface StartupScriptManager extends ScriptManager {}
  class StartupScriptManager extends ScriptManager {
    constructor();
    loadFromDirectory(): void;
  }

}

declare module 'dev.latvian.mods.kubejs.component' {
  import { ItemAttributeModifiers, Tool, FireworkExplosion, Fireworks } from 'net.minecraft.world.item.component';
  import { Holder } from 'net.minecraft.core';
  import { Attribute, AttributeModifier } from 'net.minecraft.world.entity.ai.attributes';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { EquipmentSlotGroup } from 'net.minecraft.world.entity';
  import { List, UUID, Map, Optional } from 'java.util';
  import { Entry } from 'ItemAttributeModifiers';
  import { DataComponentMap, DataComponentType, DataComponentPatch, DataComponentPredicate } from 'net.minecraft.core.component';
  import { Context } from 'dev.latvian.mods.rhino';
  import { Unit } from 'net.minecraft.util';
  import { CompoundTag, Tag } from 'net.minecraft.nbt';
  import { Rarity, DyeColor, ItemStack, Instrument } from 'net.minecraft.world.item';
  import { Component } from 'net.minecraft.network.chat';
  import { KubeColor } from 'dev.latvian.mods.kubejs.color';
  import { PotionContents, Potion } from 'net.minecraft.world.item.alchemy';
  import { GameProfile } from 'com.mojang.authlib';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';
  import { DynamicCommandExceptionType, Dynamic2CommandExceptionType, SimpleCommandExceptionType } from 'com.mojang.brigadier.exceptions';
  import { TypeInfo } from 'dev.latvian.mods.rhino.type';
  import { Lazy } from 'dev.latvian.mods.kubejs.util';
  import { DynamicOps, DataResult } from 'com.mojang.serialization';
  import { StringReader } from 'com.mojang.brigadier';
  import { StringBuilder } from 'java.lang';
  import { FoodProperties } from 'net.minecraft.world.food';
  import { MutableDataComponentHolder } from 'net.neoforged.neoforge.common';

  class AttributeModifierFunctions {
    kjs$addAttributeModifier(attribute: Holder<Attribute>, mod: AttributeModifier, slot: EquipmentSlotGroup): void;
    kjs$getAttackDamage(): number;
    kjs$getAttackSpeed(): number;
    kjs$getAttributeModifier(attribute: Holder<Attribute>, id: ResourceLocation): AttributeModifier;
    kjs$getAttributeModifiers(): ItemAttributeModifiers;
    kjs$getBaseAttackDamage(): number;
    kjs$getBaseAttackSpeed(): number;
    kjs$hasAttributeModifier(attribute: Holder<Attribute>, id: ResourceLocation): boolean;
    kjs$setAttackDamage(dmg: number): void;
    kjs$setAttackSpeed(speed: number): void;
    kjs$setAttributeModifiers(var1: ItemAttributeModifiers): void;
    kjs$setAttributeModifiers(modifiers: Entry[]): void;
    kjs$setAttributeModifiersWithTooltip(modifiers: Entry[]): void;
    kjs$setBaseAttackDamage(dmg: number): void;
    kjs$setBaseAttackSpeed(speed: number): void;
  }


  class ComponentFunctions {
    kjs$get<T>(type: DataComponentType<T>): T;
    kjs$getComponentMap(): DataComponentMap;
    kjs$getComponentString(cx: Context): string;
    kjs$getCustomData(): CompoundTag;
    kjs$getCustomName(): Component;
    kjs$override<T>(var1: DataComponentType<T>, var2: T): ComponentFunctions;
    kjs$patch(cx: Context, components: DataComponentPatch): ComponentFunctions;
    kjs$remove(type: DataComponentType<any>): ComponentFunctions;
    kjs$resetComponents(cx: Context): ComponentFunctions;
    kjs$set(cx: Context, component: DataComponentType<any>, value: any): ComponentFunctions;
    kjs$set(cx: Context, components: DataComponentMap): ComponentFunctions;
    kjs$setAdditionalTooltipHidden(): void;
    kjs$setBaseColor(color: DyeColor): void;
    kjs$setBlockStateProperties(properties: Map<string, string>): void;
    kjs$setContainerLootTable(lootTable: ResourceKey<LootTable>): void;
    kjs$setContainerLootTable(lootTable: ResourceKey<LootTable>, seed: number): void;
    kjs$setCustomData(tag: CompoundTag): void;
    kjs$setCustomModelData(data: number): void;
    kjs$setCustomName(name: Component): void;
    kjs$setDyedColor(color: KubeColor): void;
    kjs$setDyedColorWithTooltip(color: KubeColor): void;
    kjs$setEntityData(tag: CompoundTag): void;
    kjs$setGlintOverride(override: boolean): void;
    kjs$setLockCode(lock: string): void;
    kjs$setLore(lines: Component[]): void;
    kjs$setLore(lines: Component[], styledLines: Component[]): void;
    kjs$setPotionContents(contents: PotionContents): void;
    kjs$setPotionId(potion: Holder<Potion>): void;
    kjs$setProfile(profile: GameProfile): void;
    kjs$setProfile(name: string, uuid: UUID): void;
    kjs$setRarity(rarity: Rarity): void;
    kjs$setTooltipHidden(): void;
    kjs$setUnit(component: DataComponentType<Unit>): ComponentFunctions;
  }


  class DataComponentWrapper {
    static readonly ERROR_UNKNOWN_COMPONENT: DynamicCommandExceptionType;
    static readonly ERROR_MALFORMED_COMPONENT: Dynamic2CommandExceptionType;
    static readonly ERROR_EXPECTED_COMPONENT: SimpleCommandExceptionType;
    static readonly COMPONENT_TYPE: TypeInfo;
    static readonly TYPE_INFOS: Lazy;
    static readonly VISUAL_DIFFERENCE: Lazy;
    static filter(from: any, target: TypeInfo): boolean;
    static getTypeInfo(type: DataComponentType<any>): TypeInfo;
    static mapOf(ops: DynamicOps<Tag>, o: any): DataComponentMap;
    static mapOf(cx: Context, from: any): DataComponentMap;
    static mapOrEmptyOf(ops: DynamicOps<Tag>, o: any): DataComponentMap;
    static mapOrEmptyOf(cx: Context, from: any): DataComponentMap;
    static mapToString(builder: StringBuilder, ops: DynamicOps<Tag>, map: DataComponentMap): StringBuilder;
    static patchOf(ops: DynamicOps<Tag>, o: any): DataComponentPatch;
    static patchOf(cx: Context, from: any): DataComponentPatch;
    static patchOrEmptyOf(ops: DynamicOps<Tag>, o: any): DataComponentPatch;
    static patchOrEmptyOf(cx: Context, from: any): DataComponentPatch;
    static patchToString(builder: StringBuilder, ops: DynamicOps<Tag>, patch: DataComponentPatch): StringBuilder;
    static readComponentType(stringReader: StringReader): DataComponentType<any>;
    static readMap(registryOps: DynamicOps<Tag>, reader: StringReader): DataComponentMap;
    static readPatch(registryOps: DynamicOps<Tag>, reader: StringReader): DataComponentPatch;
    static readPredicate(registryOps: DynamicOps<Tag>, reader: StringReader): DataComponentPredicate;
    static tryMapOf(cx: Context, o: any): DataResult<DataComponentMap>;
    static tryPatchOf(cx: Context, o: any): DataResult<DataComponentPatch>;
    static tryWrapComponent<T>(cx: Context, type: DataComponentType<T>, value: any): DataResult<Optional<T>>;
    static visualPatch(patch: DataComponentPatch): DataComponentPatch;
    static wrapType(object: any): DataComponentType<any>;
  }


  interface ItemComponentFunctions extends ComponentFunctions, AttributeModifierFunctions {}
  class ItemComponentFunctions extends ComponentFunctions {
    kjs$getAttributeModifiers(): ItemAttributeModifiers;
    kjs$setAttributeModifiers(modifiers: ItemAttributeModifiers): void;
    kjs$setAttributeModifiers(modifiers: Entry[]): void;
    kjs$setBlockEntityData(tag: CompoundTag): void;
    kjs$setBucketEntityData(tag: CompoundTag): void;
    kjs$setBundleContents(items: ItemStack[]): void;
    kjs$setChargedProjectiles(items: ItemStack[]): void;
    kjs$setDamage(damage: number): void;
    kjs$setFireResistant(): void;
    kjs$setFireworkExplosion(explosion: FireworkExplosion): void;
    kjs$setFireworks(fireworks: Fireworks): void;
    kjs$setFood(foodProperties: FoodProperties): void;
    kjs$setFood(nutrition: number, saturation: number): void;
    kjs$setInstrument(instrument: Holder<Instrument>): void;
    kjs$setItemName(component: Component): void;
    kjs$setMapItemColor(color: KubeColor): void;
    kjs$setMaxDamage(maxDamage: number): void;
    kjs$setMaxStackSize(size: number): void;
    kjs$setNoteBlockSound(id: ResourceLocation): void;
    kjs$setRepairCost(repairCost: number): void;
    kjs$setTool(tool: Tool): void;
    kjs$setUnbreakable(): void;
    kjs$setUnbreakableWithTooltip(): void;
  }


  interface MutableDataComponentHolderFunctions extends ComponentFunctions {}
  class MutableDataComponentHolderFunctions extends ComponentFunctions {
    kjs$getComponentHolder(): MutableDataComponentHolder;
    kjs$getComponentMap(): DataComponentMap;
    kjs$override<T>(type: DataComponentType<T>, value: T): MutableDataComponentHolderFunctions;
    kjs$patch(cx: Context, components: DataComponentPatch): MutableDataComponentHolderFunctions;
    kjs$set(cx: Context, components: DataComponentMap): MutableDataComponentHolderFunctions;
  }

}

declare module 'dev.latvian.mods.kubejs.component.DataComponentWrapper' {
  import { Consumer } from 'java.util.function';
  import { Builder } from 'dev.latvian.mods.kubejs.component';
  import { Builder as datacomponentmap_Builder } from 'DataComponentMap';
  import { Builder as datacomponentpatch_Builder } from 'DataComponentPatch';

  interface MapBuilder extends Consumer<Builder> {}
  class MapBuilder extends Consumer<Builder> {
    accept(var1: datacomponentmap_Builder): void;
  }


  interface PatchBuilder extends Consumer<Builder> {}
  class PatchBuilder extends Consumer<Builder> {
    accept(var1: datacomponentpatch_Builder): void;
  }

}

declare module 'dev.latvian.mods.kubejs.core' {
  import { AdvancementNode, DisplayInfo } from 'net.minecraft.advancements';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Set, List, Map, UUID } from 'java.util';
  import { Component, MutableComponent, ClickEvent } from 'net.minecraft.network.chat';
  import { Consumer, Predicate, Supplier, Function } from 'java.util.function';
  import { RandomTickCallback } from 'dev.latvian.mods.kubejs.block.callback';
  import { SoundType, Block } from 'net.minecraft.world.level.block';
  import { BlockBuilder } from 'dev.latvian.mods.kubejs.block';
  import { Replaceable, FluidMatch, ItemMatch, ReplacementMatchInfo } from 'dev.latvian.mods.kubejs.recipe.match';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { RecipeScriptContext } from 'dev.latvian.mods.kubejs.recipe';
  import { Registry, Holder, BlockPos, Direction } from 'net.minecraft.core';
  import { ServerLevel, ServerPlayer } from 'net.minecraft.server.level';
  import { RandomSource } from 'net.minecraft.util';
  import { RelativeURL } from 'dev.latvian.mods.kubejs.web';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { KubeAnimatedParticle, KubeSessionData } from 'dev.latvian.mods.kubejs.client';
  import { SpriteSet } from 'net.minecraft.client.particle';
  import { AbstractClientPlayer, LocalPlayer } from 'net.minecraft.client.player';
  import { CompoundTag, Tag } from 'net.minecraft.nbt';
  import { PlayerStatsJS, EntityArrayList, KubeJSInventoryListener } from 'dev.latvian.mods.kubejs.player';
  import { NotificationToastData, WithCodec, WrappedJS, ScheduledEvents, TickDuration, SlotFilter, AttachedData } from 'dev.latvian.mods.kubejs.util';
  import { Iterable, Boolean, Integer, IllegalStateException } from 'java.lang';
  import { Codec, DynamicOps } from 'com.mojang.serialization';
  import { Context } from 'dev.latvian.mods.rhino';
  import { KubeColor } from 'dev.latvian.mods.kubejs.color';
  import { Container, InteractionHand } from 'net.minecraft.world';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { LevelBlock, ExplosionProperties } from 'dev.latvian.mods.kubejs.level';
  import { Level, EntityGetter, ItemLike, Explosion } from 'net.minecraft.world.level';
  import { ItemPredicate, ItemStackSet, ItemBuilder, ItemStackKey } from 'dev.latvian.mods.kubejs.item';
  import { Stream } from 'java.util.stream';
  import { Ingredient, RecipeHolder, Recipe, RecipeSerializer, RecipeInput } from 'net.minecraft.world.item.crafting';
  import { TagKey, TagManager } from 'net.minecraft.tags';
  import { Entity, EntityType, LivingEntity, EquipmentSlot } from 'net.minecraft.world.entity';
  import { Player } from 'net.minecraft.world.entity.player';
  import { AABB } from 'net.minecraft.world.phys';
  import { ScriptTypeHolder, ScriptType } from 'dev.latvian.mods.kubejs.script';
  import { MinecraftServer } from 'net.minecraft.server';
  import { GameProfile } from 'com.mojang.authlib';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { KubeRayTraceResult, EntityPotionEffectsJS } from 'dev.latvian.mods.kubejs.entity';
  import { FluidIngredient, SizedFluidIngredient } from 'net.neoforged.neoforge.fluids.crafting';
  import { RecipeMatchContext } from 'dev.latvian.mods.kubejs.recipe.filter';
  import { FluidStack } from 'net.neoforged.neoforge.fluids';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { FluidLike } from 'dev.latvian.mods.kubejs.fluid';
  import { Value } from 'GameRules';
  import { SizedIngredient } from 'net.neoforged.neoforge.common.crafting';
  import { ItemEntity } from 'net.minecraft.world.entity.item';
  import { ItemFrame } from 'net.minecraft.world.entity.decoration';
  import { DataComponentType } from 'net.minecraft.core.component';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { Fireworks } from 'net.minecraft.world.item.component';
  import { ParticleOptions } from 'net.minecraft.core.particles';
  import { FoodProperties } from 'net.minecraft.world.food';
  import { Attribute } from 'net.minecraft.world.entity.ai.attributes';
  import { Operation } from 'AttributeModifier';
  import { Minecraft, KeyMapping } from 'net.minecraft.client';
  import { MenuType, AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { ScheduledEvent, Callback } from 'dev.latvian.mods.kubejs.util.ScheduledEvents';
  import { TemporalAmount } from 'java.time.temporal';
  import { Stages } from 'dev.latvian.mods.kubejs.stages';
  import { RecipeSchema } from 'dev.latvian.mods.kubejs.recipe.schema';
  import { ServerScriptManager } from 'dev.latvian.mods.kubejs.server';
  import { KubeJSGUI } from 'dev.latvian.mods.kubejs.gui';
  import { ChestMenuData } from 'dev.latvian.mods.kubejs.gui.chest';
  import { JsonElement } from 'com.google.gson';
  import { EntryWithSource } from 'TagLoader';
  import { IoSupplier } from 'net.minecraft.server.packs.resources';
  import { InputStream } from 'java.io';

  class AdvancementNodeKJS {
    kjs$addChild(a: AdvancementNode): void;
    kjs$getChildren(): Set<AdvancementNode>;
    kjs$getDescription(): Component;
    kjs$getDisplay(): DisplayInfo;
    kjs$getDisplayText(): Component;
    kjs$getId(): ResourceLocation;
    kjs$getParent(): AdvancementNode;
    kjs$getTitle(): Component;
    kjs$hasDisplay(): boolean;
    kjs$self(): AdvancementNode;
  }


  interface BlockBehaviourKJS extends BlockProviderKJS {}
  class BlockBehaviourKJS extends BlockProviderKJS {
    kjs$setExplosionResistance(v: number): void;
    kjs$setFriction(v: number): void;
    kjs$setHasCollision(v: boolean): void;
    kjs$setIsRandomlyTicking(v: boolean): void;
    kjs$setJumpFactor(v: number): void;
    kjs$setRandomTickCallback(callback: Consumer<RandomTickCallback>): void;
    kjs$setSoundType(v: SoundType): void;
    kjs$setSpeedFactor(v: number): void;
  }


  class BlockBuilderProvider {
    kjs$getBlockBuilder(): BlockBuilder;
  }


  interface BlockKJS extends BlockBuilderProvider, BlockBehaviourKJS, Replaceable {}
  class BlockKJS extends BlockBuilderProvider {
    kjs$getBlock(): Block;
    kjs$getBlockStates(): BlockState[];
    kjs$setBlockBuilder(b: BlockBuilder): void;
    kjs$setDestroySpeed(v: number): void;
    kjs$setLightEmission(v: number): void;
    kjs$setNameKey(key: string): void;
    kjs$setRequiresTool(v: boolean): void;
    replaceThisWith(cx: RecipeScriptContext, withParameter: any): any;
  }


  interface BlockProviderKJS extends RegistryObjectKJS<Block> {}
  class BlockProviderKJS extends RegistryObjectKJS<Block> {
    kjs$asHolder(): Holder<Block>;
    kjs$getBlock(): Block;
    kjs$getId(): string;
    kjs$getKey(): ResourceKey<Block>;
    kjs$getRegistry(): Registry<Block>;
    kjs$getRegistryId(): ResourceKey<Registry<Block>>;
    kjs$getTypeData(): Map<string, any>;
  }


  interface BlockStateKJS extends RegistryObjectKJS<Block>, Replaceable {}
  class BlockStateKJS extends RegistryObjectKJS<Block> {
    kjs$asHolder(): Holder<Block>;
    kjs$getId(): string;
    kjs$getKey(): ResourceKey<Block>;
    kjs$getRegistry(): Registry<Block>;
    kjs$getRegistryId(): ResourceKey<Registry<Block>>;
    kjs$getWebIconURL(size: number): RelativeURL;
    kjs$randomTickOverride(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): boolean;
    kjs$setDestroySpeed(v: number): void;
    kjs$setLightEmission(v: number): void;
    kjs$setRequiresTool(v: boolean): void;
    kjs$toString(): string;
    replaceThisWith(cx: RecipeScriptContext, withParameter: any): any;
  }


  interface ClientLevelKJS extends LevelKJS {}
  class ClientLevelKJS extends LevelKJS {
    kjs$self(): ClientLevel;
    kubeParticle(x: number, y: number, z: number, spriteSet: SpriteSet): KubeAnimatedParticle;
  }


  class ClientPacketListenerKJS {
    kjs$sessionData(): KubeSessionData;
  }


  interface ClientPlayerKJS extends PlayerKJS {}
  class ClientPlayerKJS extends PlayerKJS {
    isSelf(): boolean;
    kjs$getStats(): PlayerStatsJS;
    kjs$isMiningBlock(): boolean;
    kjs$notify(notification: NotificationToastData): void;
    kjs$notify(title: Component, text: Component): void;
    kjs$self(): AbstractClientPlayer;
    kjs$sendData(channel: string, data: CompoundTag): void;
    kjs$sendData(channel: string): void;
  }


  interface ComponentKJS extends Component, WithCodec, WrappedJS {}
  class ComponentKJS extends Component {
    forEach(action: Consumer<Component>): void;
    getCodec(cx: Context): Codec<any>;
    kjs$aqua(): MutableComponent;
    kjs$asIterable(): Iterable<Component>;
    kjs$black(): MutableComponent;
    kjs$blue(): MutableComponent;
    kjs$bold(value: boolean): MutableComponent;
    kjs$bold(): MutableComponent;
    kjs$click(s: ClickEvent): MutableComponent;
    kjs$clickChangePage(page: string): MutableComponent;
    kjs$clickCopy(text: string): MutableComponent;
    kjs$clickOpenFile(path: string): MutableComponent;
    kjs$clickOpenUrl(url: string): MutableComponent;
    kjs$clickRunCommand(command: string): MutableComponent;
    kjs$clickSuggestCommand(command: string): MutableComponent;
    kjs$color(c: KubeColor): MutableComponent;
    kjs$component(): Component;
    kjs$darkAqua(): MutableComponent;
    kjs$darkBlue(): MutableComponent;
    kjs$darkGray(): MutableComponent;
    kjs$darkGreen(): MutableComponent;
    kjs$darkPurple(): MutableComponent;
    kjs$darkRed(): MutableComponent;
    kjs$font(s: ResourceLocation): MutableComponent;
    kjs$gold(): MutableComponent;
    kjs$gray(): MutableComponent;
    kjs$green(): MutableComponent;
    kjs$hasSiblings(): boolean;
    kjs$hasStyle(): boolean;
    kjs$hover(s: Component): MutableComponent;
    kjs$insertion(s: string): MutableComponent;
    kjs$isEmpty(): boolean;
    kjs$italic(value: boolean): MutableComponent;
    kjs$italic(): MutableComponent;
    kjs$lightPurple(): MutableComponent;
    kjs$noColor(): MutableComponent;
    kjs$obfuscated(value: boolean): MutableComponent;
    kjs$obfuscated(): MutableComponent;
    kjs$rawComponent(): MutableComponent;
    kjs$rawCopy(): MutableComponent;
    kjs$red(): MutableComponent;
    kjs$self(): MutableComponent;
    kjs$strikethrough(value: boolean): MutableComponent;
    kjs$strikethrough(): MutableComponent;
    kjs$underlined(value: boolean): MutableComponent;
    kjs$underlined(): MutableComponent;
    kjs$white(): MutableComponent;
    kjs$yellow(): MutableComponent;
  }


  interface ContainerKJS extends InventoryKJS {}
  class ContainerKJS extends InventoryKJS {
    kjs$asContainer(): Container;
    kjs$clear(): void;
    kjs$clear(match: ItemPredicate): void;
    kjs$extractItem(slot: number, amount: number, simulate: boolean): ItemStack;
    kjs$getBlock(level: Level): LevelBlock;
    kjs$getHeight(): number;
    kjs$getSlotLimit(slot: number): number;
    kjs$getSlots(): number;
    kjs$getStackInSlot(slot: number): ItemStack;
    kjs$getWidth(): number;
    kjs$insertItem(slot: number, stack: ItemStack, simulate: boolean): ItemStack;
    kjs$insertItem(stack: ItemStack, simulate: boolean): ItemStack;
    kjs$isItemValid(slot: number, stack: ItemStack): boolean;
    kjs$isMutable(): boolean;
    kjs$self(): Container;
    kjs$setChanged(): void;
    kjs$setStackInSlot(slot: number, stack: ItemStack): void;
  }


  class CreativeModeTabKJS {
    kjs$setDisplayName(var1: Component): void;
    kjs$setIcon(var1: ItemStack): void;
  }


  interface CustomIngredientKJS extends ItemPredicate {}
  class CustomIngredientKJS extends ItemPredicate {
    get items(): Stream<ItemStack>;
    kjs$asIngredient(): Ingredient;
    kjs$canBeUsedForMatching(): boolean;
    kjs$getDisplayStacks(): ItemStackSet;
    kjs$getStackArray(): ItemStack[];
  }


  class DataSenderKJS {
    kjs$sendData(channel: string, data: CompoundTag): void;
    kjs$sendData(channel: string): void;
  }


  class DiggerItemKJS {
    kjs$getMineableTag(): TagKey<Block>;
  }


  class EntityCollectionKJS {
    kjs$getEntities(): EntityArrayList;
    kjs$getEntitiesWithin(aabb: AABB): EntityArrayList;
    kjs$getEntityByNetworkID(id: number): Entity;
    kjs$getEntityByUUID(id: UUID): Entity;
    kjs$getMcEntities(): Iterable<Entity>;
    kjs$getMcPlayers(): Player[];
    kjs$getPlayers(): EntityArrayList;
  }


  interface EntityGetterKJS extends EntityCollectionKJS {}
  class EntityGetterKJS extends EntityCollectionKJS {
    kjs$getEntitiesWithin(aabb: AABB): EntityArrayList;
    kjs$getMcEntities(): Iterable<Entity>;
    kjs$getMcPlayers(): Player[];
    kjs$getPlayers(): EntityArrayList;
    kjs$self(): EntityGetter;
  }


  interface EntityKJS extends WithPersistentData, MessageSenderKJS, ScriptTypeHolder {}
  class EntityKJS extends WithPersistentData {
    kjs$attack(hp: number): void;
    kjs$getBlock(): LevelBlock;
    kjs$getDisplayName(): Component;
    kjs$getDistance(x: number, y: number, z: number): number;
    kjs$getDistance(pos: BlockPos): number;
    kjs$getDistanceSq(pos: BlockPos): number;
    kjs$getFacing(): Direction;
    kjs$getItem(): ItemStack;
    kjs$getLevel(): Level;
    kjs$getMotionX(): number;
    kjs$getMotionY(): number;
    kjs$getMotionZ(): number;
    kjs$getName(): Component;
    kjs$getNbt(): CompoundTag;
    kjs$getPassengers(): EntityArrayList;
    kjs$getProfile(): GameProfile;
    kjs$getRawPersistentData(): CompoundTag;
    kjs$getScriptType(): ScriptType;
    kjs$getServer(): MinecraftServer;
    kjs$getTeamId(): string;
    kjs$getType(): string;
    kjs$isAmbientCreature(): boolean;
    kjs$isAnimal(): boolean;
    kjs$isFrame(): boolean;
    kjs$isLiving(): boolean;
    kjs$isMonster(): boolean;
    kjs$isOnScoreboardTeam(teamId: string): boolean;
    kjs$isPeacefulCreature(): boolean;
    kjs$isPlayer(): boolean;
    kjs$isWaterCreature(): boolean;
    kjs$mergeNbt(tag: CompoundTag): Entity;
    kjs$playSound(id: SoundEvent, volume: number, pitch: number): void;
    kjs$playSound(id: SoundEvent): void;
    kjs$rayTrace(distance: number, fluids: boolean): KubeRayTraceResult;
    kjs$rayTrace(distance: number): KubeRayTraceResult;
    kjs$rayTraceEntity(distance: number, filter: Predicate<Entity>): Entity;
    kjs$runCommand(command: string): void;
    kjs$runCommandSilent(command: string): void;
    kjs$self(): Entity;
    kjs$setMotionX(x: number): void;
    kjs$setMotionY(y: number): void;
    kjs$setMotionZ(z: number): void;
    kjs$setNbt(nbt: CompoundTag): void;
    kjs$setPosition(block: LevelBlock): void;
    kjs$setPosition(x: number, y: number, z: number): void;
    kjs$setPositionAndRotation(x: number, y: number, z: number, yaw: number, pitch: number): void;
    kjs$setRawPersistentData(tag: CompoundTag): void;
    kjs$setRotation(yaw: number, pitch: number): void;
    kjs$setX(x: number): void;
    kjs$setY(y: number): void;
    kjs$setZ(z: number): void;
    kjs$spawn(): void;
    kjs$teleportTo(dimension: ResourceLocation, x: number, y: number, z: number, yaw: number, pitch: number): void;
    kjs$tell(message: Component): void;
  }


  interface EntityTypeKJS extends RegistryObjectKJS<EntityType> {}
  class EntityTypeKJS extends RegistryObjectKJS<EntityType> {
    kjs$getRegistry(): Registry<EntityType<any>>;
    kjs$getRegistryId(): ResourceKey<Registry<EntityType<any>>>;
  }


  class FireworkRocketEntityKJS {
    setLifetimeKJS(var1: number): void;
  }


  interface FluidIngredientKJS extends WithCodec, FluidMatch {}
  class FluidIngredientKJS extends WithCodec {
    getCodec(cx: Context): Codec<any>;
    kjs$self(): FluidIngredient;
    kjs$withAmount(amount: number): SizedFluidIngredient;
    matches(cx: RecipeMatchContext, s: FluidStack, exact: boolean): boolean;
    matches(cx: RecipeMatchContext, inParameter: FluidIngredient, exact: boolean): boolean;
  }


  interface FluidKJS extends RegistryObjectKJS<Fluid>, FluidLike {}
  class FluidKJS extends RegistryObjectKJS<Fluid> {
    kjs$getAmount(): number;
    kjs$getFluid(): Fluid;
    kjs$getRegistry(): Registry<Fluid>;
    kjs$getRegistryId(): ResourceKey<Registry<Fluid>>;
    kjs$isEmpty(): boolean;
  }


  class GameRulesKJS {
    kjs$get(var1: string): Value<any>;
    kjs$getBoolean(rule: string): boolean;
    kjs$getInt(rule: string): number;
    kjs$getString(rule: string): string;
    kjs$set(var1: string, var2: string): void;
  }


  interface IngredientKJS extends ItemPredicate, Replaceable, WithCodec, ItemMatch {}
  class IngredientKJS extends ItemPredicate {
    getCodec(cx: Context): Codec<any>;
    kjs$and(ingredient: Ingredient): Ingredient;
    kjs$asIngredient(): Ingredient;
    kjs$asStack(): SizedIngredient;
    kjs$containsAnyTag(): boolean;
    kjs$except(subtracted: Ingredient): Ingredient;
    kjs$getStackArray(): ItemStack[];
    kjs$getTagKey(): TagKey<Item>;
    kjs$isWildcard(): boolean;
    kjs$or(ingredient: Ingredient): Ingredient;
    kjs$self(): Ingredient;
    kjs$toIngredientString(ops: DynamicOps<Tag>): string;
    kjs$withCount(count: number): SizedIngredient;
    matches(cx: RecipeMatchContext, item: ItemStack, exact: boolean): boolean;
    matches(cx: RecipeMatchContext, inParameter: Ingredient, exact: boolean): boolean;
    matches(cx: RecipeMatchContext, itemLike: ItemLike, exact: boolean): boolean;
    replaceThisWith(cx: RecipeScriptContext, withParameter: any): any;
  }


  class IngredientSupplierKJS {
    kjs$asIngredient(): Ingredient;
  }


  class InventoryKJS {
    kjs$asContainer(): Container;
    kjs$clear(): void;
    kjs$clear(match: ItemPredicate): void;
    kjs$count(): number;
    kjs$count(match: ItemPredicate): number;
    kjs$countNonEmpty(): number;
    kjs$countNonEmpty(match: ItemPredicate): number;
    kjs$extractItem(slot: number, amount: number, simulate: boolean): ItemStack;
    kjs$find(): number;
    kjs$find(match: ItemPredicate): number;
    kjs$getAllItems(): ItemStack[];
    kjs$getBlock(level: Level): LevelBlock;
    kjs$getHeight(): number;
    kjs$getSlotLimit(slot: number): number;
    kjs$getSlots(): number;
    kjs$getStackInSlot(slot: number): ItemStack;
    kjs$getWidth(): number;
    kjs$insertItem(slot: number, stack: ItemStack, simulate: boolean): ItemStack;
    kjs$insertItem(stack: ItemStack, simulate: boolean): ItemStack;
    kjs$isEmpty(): boolean;
    kjs$isItemValid(slot: number, stack: ItemStack): boolean;
    kjs$isMutable(): boolean;
    kjs$setChanged(): void;
    kjs$setStackInSlot(slot: number, stack: ItemStack): void;
  }


  interface ItemEntityKJS extends EntityKJS {}
  class ItemEntityKJS extends EntityKJS {
    kjs$getItem(): ItemStack;
    kjs$getLifespan(): number;
    kjs$getTicksUntilDespawn(): number;
    kjs$self(): ItemEntity;
    kjs$setDefaultPickUpDelay(): void;
    kjs$setInfinitePickUpDelay(): void;
    kjs$setLifespan(lifespan: number): void;
    kjs$setNoDespawn(): void;
    kjs$setNoPickUpDelay(): void;
    kjs$setTicksUntilDespawn(ticks: number): void;
  }


  interface ItemFrameEntityKJS extends EntityKJS {}
  class ItemFrameEntityKJS extends EntityKJS {
    kjs$getItem(): ItemStack;
    kjs$isFrame(): boolean;
    kjs$self(): ItemFrame;
  }


  interface ItemKJS extends IngredientSupplierKJS, RegistryObjectKJS<Item> {}
  class ItemKJS extends IngredientSupplierKJS {
    kjs$getItemBuilder(): ItemBuilder;
    kjs$getRegistry(): Registry<Item>;
    kjs$getRegistryId(): ResourceKey<Registry<Item>>;
    kjs$getTypeData(): Map<string, any>;
    kjs$getTypeItemStackKey(): ItemStackKey;
    kjs$overrideComponent<T>(type: DataComponentType<T>, value: T): void;
    kjs$self(): Item;
    kjs$setCanRepair(repairable: boolean): void;
    kjs$setCraftingRemainder(i: Item): void;
    kjs$setItemBuilder(b: ItemBuilder): void;
    kjs$setNameKey(key: string): void;
  }


  interface LazyComponentKJS extends Supplier<Component> {}
  class LazyComponentKJS extends Supplier<Component> {
    get (): Component;
  }


  interface LevelKJS extends WithAttachedData<Level>, ScriptTypeHolder, EntityGetterKJS {}
  class LevelKJS extends WithAttachedData<Level> {
    kjs$createEntity(type: EntityType<any>): Entity;
    kjs$explode(x: number, y: number, z: number, properties: ExplosionProperties): Explosion;
    kjs$getBlock(x: number, y: number, z: number): LevelBlock;
    kjs$getBlock(pos: BlockPos): LevelBlock;
    kjs$getBlock(entity: BlockEntity): LevelBlock;
    kjs$getDimension(): ResourceLocation;
    kjs$getName(): Component;
    kjs$getScriptType(): ScriptType;
    kjs$isOverworld(): boolean;
    kjs$runCommand(command: string): void;
    kjs$runCommandSilent(command: string): void;
    kjs$self(): Level;
    kjs$setActivePostShader(id: ResourceLocation): void;
    kjs$setStatusMessage(message: Component): void;
    kjs$setTime(time: number): void;
    kjs$spawnFireworks(x: number, y: number, z: number, fireworks: Fireworks, lifetime: number): void;
    kjs$spawnLightning(x: number, y: number, z: number, visualOnly: boolean, cause: ServerPlayer): void;
    kjs$spawnLightning(x: number, y: number, z: number, visualOnly: boolean): void;
    kjs$spawnParticles(options: ParticleOptions, overrideLimiter: boolean, x: number, y: number, z: number, vx: number, vy: number, vz: number, count: number, speed: number): void;
    kjs$tell(message: Component): void;
    spawnEntity(type: EntityType<any>, callback: Consumer<Entity>): void;
  }


  interface LivingEntityKJS extends EntityKJS {}
  class LivingEntityKJS extends EntityKJS {
    static readonly KJS_PLAYER_CUSTOM_SPEED: ResourceLocation;
    kjs$canEntityBeSeen(entity: LivingEntity): boolean;
    kjs$damageEquipment(slot: EquipmentSlot, amount: number, onBroken: Consumer<ItemStack>): void;
    kjs$damageEquipment(slot: EquipmentSlot, amount: number): void;
    kjs$damageEquipment(slot: EquipmentSlot): void;
    kjs$damageHeldItem(hand: InteractionHand, amount: number, onBroken: Consumer<ItemStack>): void;
    kjs$damageHeldItem(hand: InteractionHand, amount: number): void;
    kjs$damageHeldItem(): void;
    kjs$foodEaten(is: ItemStack, food: FoodProperties): void;
    kjs$getAttributeBaseValue(attribute: Holder<Attribute>): number;
    kjs$getAttributeTotalValue(attribute: Holder<Attribute>): number;
    kjs$getChestArmorItem(): ItemStack;
    kjs$getDefaultMovementSpeed(): number;
    kjs$getEquipment(slot: EquipmentSlot): ItemStack;
    kjs$getFeetArmorItem(): ItemStack;
    kjs$getHeadArmorItem(): ItemStack;
    kjs$getHeldItem(hand: InteractionHand): ItemStack;
    kjs$getLegsArmorItem(): ItemStack;
    kjs$getMainHandItem(): ItemStack;
    kjs$getOffHandItem(): ItemStack;
    kjs$getPotionEffects(): EntityPotionEffectsJS;
    kjs$getReachDistance(): number;
    kjs$getTotalMovementSpeed(): number;
    kjs$isHoldingInAnyHand(i: ItemPredicate): boolean;
    kjs$isLiving(): boolean;
    kjs$isUndead(): boolean;
    kjs$modifyAttribute(attribute: Holder<Attribute>, id: ResourceLocation, amount: number, operation: Operation): void;
    kjs$rayTrace(): KubeRayTraceResult;
    kjs$rayTrace(distance: number, fluids: boolean): KubeRayTraceResult;
    kjs$rayTrace(distance: number): KubeRayTraceResult;
    kjs$rayTraceEntity(filter: Predicate<Entity>): Entity;
    kjs$rayTraceEntity(distance: number, filter: Predicate<Entity>): Entity;
    kjs$removeAttribute(attribute: Holder<Attribute>, id: ResourceLocation): void;
    kjs$self(): LivingEntity;
    kjs$setAttributeBaseValue(attribute: Holder<Attribute>, value: number): void;
    kjs$setChestArmorItem(item: ItemStack): void;
    kjs$setDefaultMovementSpeed(speed: number): void;
    kjs$setDefaultMovementSpeedMultiplier(speed: number): void;
    kjs$setEquipment(slot: EquipmentSlot, item: ItemStack): void;
    kjs$setFeetArmorItem(item: ItemStack): void;
    kjs$setHeadArmorItem(item: ItemStack): void;
    kjs$setHeldItem(hand: InteractionHand, item: ItemStack): void;
    kjs$setLegsArmorItem(item: ItemStack): void;
    kjs$setMainHandItem(item: ItemStack): void;
    kjs$setMaxHealth(hp: number): void;
    kjs$setMovementSpeedAddition(speed: number): void;
    kjs$setOffHandItem(item: ItemStack): void;
    kjs$setTotalMovementSpeedMultiplier(speed: number): void;
    kjs$swing(hand: InteractionHand): void;
    kjs$swing(): void;
  }


  interface LocalClientPlayerKJS extends ClientPlayerKJS {}
  class LocalClientPlayerKJS extends ClientPlayerKJS {
    isSelf(): boolean;
    kjs$getMinecraft(): Minecraft;
    kjs$getStats(): PlayerStatsJS;
    kjs$isMiningBlock(): boolean;
    kjs$notify(notification: NotificationToastData): void;
    kjs$notify(title: Component, text: Component): void;
    kjs$runCommand(command: string): void;
    kjs$runCommandSilent(command: string): void;
    kjs$self(): LocalPlayer;
    kjs$sendData(channel: string, data: CompoundTag): void;
    kjs$sendData(channel: string): void;
    kjs$setActivePostShader(id: ResourceLocation): void;
  }


  interface MenuTypeKJS extends RegistryObjectKJS<MenuType> {}
  class MenuTypeKJS extends RegistryObjectKJS<MenuType> {
    kjs$getRegistry(): Registry<MenuType<any>>;
    kjs$getRegistryId(): ResourceKey<Registry<MenuType<any>>>;
  }


  class MessageSenderKJS {
    kjs$getDisplayName(): Component;
    kjs$getName(): Component;
    kjs$runCommand(command: string): void;
    kjs$runCommandSilent(command: string): void;
    kjs$setActivePostShader(id: ResourceLocation): void;
    kjs$setStatusMessage(message: Component): void;
    kjs$tell(message: Component): void;
  }


  interface MinecraftClientKJS extends MinecraftEnvironmentKJS {}
  class MinecraftClientKJS extends MinecraftEnvironmentKJS {
    kjs$afterResourcesLoaded(reload: boolean): void;
    kjs$getBlockTextureAtlas(): Function<ResourceLocation, TextureAtlasSprite>;
    kjs$getCurrentScreen(): Screen;
    kjs$getCurrentWorldName(): string;
    kjs$getKeyBindPressedTicks(id: string): number;
    kjs$getName(): Component;
    kjs$getParticleTextureAtlas(): Function<ResourceLocation, TextureAtlasSprite>;
    kjs$getTitle(): string;
    kjs$isAltDown(): boolean;
    kjs$isCtrlDown(): boolean;
    kjs$isKeyBindDown(id: string): boolean;
    kjs$isKeyDown(key: number): boolean;
    kjs$isKeyDown(keyName: string): boolean;
    kjs$isKeyMappingDown(key: KeyMapping): boolean;
    kjs$isShiftDown(): boolean;
    kjs$runCommand(command: string): void;
    kjs$runCommandSilent(command: string): void;
    kjs$self(): Minecraft;
    kjs$setActivePostShader(id: ResourceLocation): void;
    kjs$setCurrentScreen(gui: Screen): void;
    kjs$setStatusMessage(message: Component): void;
    kjs$setTitle(t: string): void;
    kjs$startAttack0(): void;
    kjs$startUseItem0(): void;
    kjs$tell(message: Component): void;
  }


  interface MinecraftEnvironmentKJS extends MessageSenderKJS {}
  class MinecraftEnvironmentKJS extends MessageSenderKJS {
    kjs$getScheduledEvents(): ScheduledEvents;
    kjs$schedule(timer: TemporalAmount, callback: Callback): ScheduledEvent;
    kjs$scheduleInTicks(ticks: TickDuration, callback: Callback): ScheduledEvent;
    kjs$scheduleRepeating(timer: TemporalAmount, callback: Callback): ScheduledEvent;
    kjs$scheduleRepeatingInTicks(ticks: TickDuration, callback: Callback): ScheduledEvent;
  }


  interface MinecraftServerKJS extends WithAttachedData<MinecraftServer>, WithPersistentData, DataSenderKJS, MinecraftEnvironmentKJS, EntityCollectionKJS {}
  class MinecraftServerKJS extends WithAttachedData<MinecraftServer> {
    kjs$afterResourcesLoaded(reload: boolean): void;
    kjs$getAdvancement(id: ResourceLocation): AdvancementNode;
    kjs$getEntityByNetworkID(id: number): Entity;
    kjs$getEntityByUUID(id: UUID): Entity;
    kjs$getLevel(dimension: ResourceLocation): ServerLevel;
    kjs$getMcEntities(): Iterable<Entity>;
    kjs$getMcPlayers(): Player[];
    kjs$getName(): Component;
    kjs$getOverworld(): ServerLevel;
    kjs$getPlayer(selector: PlayerSelector): ServerPlayer;
    kjs$getPlayers(): EntityArrayList;
    kjs$restoreInventories(): Map<UUID, Map<number, ItemStack>>;
    kjs$runCommand(command: string): void;
    kjs$runCommandSilent(command: string): void;
    kjs$self(): MinecraftServer;
    kjs$sendData(channel: string, data: CompoundTag): void;
    kjs$sendData(channel: string): void;
    kjs$setActivePostShader(id: ResourceLocation): void;
    kjs$setStatusMessage(message: Component): void;
    kjs$tell(message: Component): void;
  }


  interface NoMixinException extends IllegalStateException {}
  class NoMixinException extends IllegalStateException {
    constructor();
  }


  interface PlayerKJS extends LivingEntityKJS, DataSenderKJS, WithAttachedData<Player> {}
  class PlayerKJS extends LivingEntityKJS {
    kjs$addExhaustion(exhaustion: number): void;
    kjs$addFood(f: number, m: number): void;
    kjs$addItemCooldown(item: Item, ticks: number): void;
    kjs$addXP(xp: number): void;
    kjs$addXPLevels(l: number): void;
    kjs$boostElytraFlight(): void;
    kjs$getCraftingGrid(): InventoryKJS;
    kjs$getFoodLevel(): number;
    kjs$getInventory(): InventoryKJS;
    kjs$getInventoryChangeListener(): KubeJSInventoryListener;
    kjs$getMouseItem(): ItemStack;
    kjs$getOpenInventory(): AbstractContainerMenu;
    kjs$getProfile(): GameProfile;
    kjs$getSaturation(): number;
    kjs$getSelectedSlot(): number;
    kjs$getStages(): Stages;
    kjs$getStats(): PlayerStatsJS;
    kjs$getXp(): number;
    kjs$getXpLevel(): number;
    kjs$give(item: ItemStack): void;
    kjs$giveInHand(item: ItemStack): void;
    kjs$isFake(): boolean;
    kjs$isMiningBlock(): boolean;
    kjs$isPlayer(): boolean;
    kjs$notify(builder: NotificationToastData): void;
    kjs$notify(title: Component, text: Component): void;
    kjs$self(): Player;
    kjs$sendInventoryUpdate(): void;
    kjs$setFoodLevel(foodLevel: number): void;
    kjs$setMouseItem(item: ItemStack): void;
    kjs$setSaturation(saturation: number): void;
    kjs$setSelectedSlot(index: number): void;
    kjs$setStatusMessage(message: Component): void;
    kjs$setXp(xp: number): void;
    kjs$setXpLevel(l: number): void;
    kjs$spawn(): void;
  }


  class PlayerSelector {
    static fuzzyName(name: string): PlayerSelector;
    getPlayer(var1: MinecraftServer): ServerPlayer;
    static identity(player: ServerPlayer): PlayerSelector;
    static name(name: string): PlayerSelector;
    or(fallback: PlayerSelector): PlayerSelector;
    static uuid(uuid: UUID): PlayerSelector;
    static wrap(o: any): PlayerSelector;
  }


  interface RecipeHolderKJS extends RecipeLikeKJS {}
  class RecipeHolderKJS extends RecipeLikeKJS {
    hasInput(cx: RecipeMatchContext, match: ReplacementMatchInfo): boolean;
    hasOutput(cx: RecipeMatchContext, match: ReplacementMatchInfo): boolean;
    kjs$getGroup(): string;
    kjs$getOrCreateId(): ResourceLocation;
    kjs$getRecipe(): Recipe<any>;
    kjs$getSchema(cx: Context): RecipeSchema;
    kjs$getSerializer(): RecipeSerializer<any>;
    kjs$getTypeKey(): ResourceKey<RecipeSerializer<any>>;
    kjs$self(): RecipeHolder<any>;
    kjs$setGroup(group: string): void;
    replaceInput(cx: RecipeScriptContext, match: ReplacementMatchInfo, withParameter: any): boolean;
    replaceOutput(cx: RecipeScriptContext, match: ReplacementMatchInfo, withParameter: any): boolean;
  }


  class RecipeInputKJS {
    find(filter: SlotFilter, skip: number): ItemStack;
    find(filter: SlotFilter): ItemStack;
    kjs$findAll(filter: SlotFilter): ItemStack[];
    kjs$findAll(): ItemStack[];
    kjs$self(): RecipeInput;
  }


  class RecipeLikeKJS {
    hasInput(cx: RecipeMatchContext, match: ReplacementMatchInfo): boolean;
    hasOutput(cx: RecipeMatchContext, match: ReplacementMatchInfo): boolean;
    kjs$getGroup(): string;
    kjs$getMod(): string;
    kjs$getOrCreateId(): ResourceLocation;
    kjs$getSchema(var1: Context): RecipeSchema;
    kjs$getSerializer(): RecipeSerializer<any>;
    kjs$getType(): ResourceLocation;
    kjs$getTypeKey(): ResourceKey<RecipeSerializer<any>>;
    kjs$setGroup(var1: string): void;
    replaceInput(cx: RecipeScriptContext, match: ReplacementMatchInfo, withParameter: any): boolean;
    replaceOutput(cx: RecipeScriptContext, match: ReplacementMatchInfo, withParameter: any): boolean;
  }


  interface RecipeManagerKJS extends ReloadableServerResourceHolderKJS {}
  class RecipeManagerKJS extends ReloadableServerResourceHolderKJS {
    kjs$getRecipeIdMap(): Map<ResourceLocation, RecipeHolder<any>>;
    kjs$replaceRecipes(byName: Map<ResourceLocation, RecipeHolder<any>>): void;
  }


  class ReloadableServerResourceHolderKJS {
    kjs$getResources(): ReloadableServerResourcesKJS;
    kjs$setResources(resources: ReloadableServerResourcesKJS): void;
  }


  class ReloadableServerResourcesKJS {
    kjs$getServerScriptManager(): ServerScriptManager;
    kjs$getTagManager(): TagManager;
  }


  interface ServerLevelKJS extends LevelKJS, WithPersistentData {}
  class ServerLevelKJS extends LevelKJS {
    kjs$self(): ServerLevel;
    kjs$spawnParticles(options: ParticleOptions, overrideLimiter: boolean, x: number, y: number, z: number, vx: number, vy: number, vz: number, count: number, speed: number): void;
  }


  interface ServerPlayerKJS extends PlayerKJS {}
  class ServerPlayerKJS extends PlayerKJS {
    kjs$ban(banner: string, reason: string, expiresInMillis: number): void;
    kjs$captureInventory(autoRestore: boolean): Container;
    kjs$getSpawnLocation(): LevelBlock;
    kjs$getStats(): PlayerStatsJS;
    kjs$heal(): void;
    kjs$isAdvancementDone(id: ResourceLocation): boolean;
    kjs$isMiningBlock(): boolean;
    kjs$isOp(): boolean;
    kjs$kick(reason: Component): void;
    kjs$kick(): void;
    kjs$notify(builder: NotificationToastData): void;
    kjs$notify(title: Component, text: Component): void;
    kjs$openChestGUI(gui: Consumer<KubeJSGUI>): void;
    kjs$openChestGUI(title: Component, rows: number, gui: Consumer<ChestMenuData>): void;
    kjs$openInventoryGUI(inventory: InventoryKJS, title: Component): void;
    kjs$openInventoryGUI(inventory: InventoryKJS, title: Component, columns: number): void;
    kjs$openInventoryGUI(inventory: InventoryKJS, title: Component, columns: number, rows: number): void;
    kjs$revokeAdvancement(id: ResourceLocation): void;
    kjs$self(): ServerPlayer;
    kjs$sendData(channel: string, data: CompoundTag): void;
    kjs$sendData(channel: string): void;
    kjs$setActivePostShader(id: ResourceLocation): void;
    kjs$setCreativeMode(mode: boolean): void;
    kjs$setMouseItem(item: ItemStack): void;
    kjs$setPositionAndRotation(x: number, y: number, z: number, yaw: number, pitch: number): void;
    kjs$setSelectedSlot(index: number): void;
    kjs$setSpawnLocation(c: LevelBlock): void;
    kjs$unlockAdvancement(id: ResourceLocation): void;
  }


  interface SizedFluidIngredientKJS extends Replaceable, FluidMatch {}
  class SizedFluidIngredientKJS extends Replaceable {
    kjs$self(): SizedFluidIngredient;
    kjs$toFlatJson(): JsonElement;
    kjs$toNestedJson(): JsonElement;
    matches(cx: RecipeMatchContext, s: FluidStack, exact: boolean): boolean;
    matches(cx: RecipeMatchContext, inParameter: FluidIngredient, exact: boolean): boolean;
    replaceThisWith(cx: RecipeScriptContext, withParameter: any): any;
  }


  interface SizedIngredientKJS extends Replaceable, IngredientSupplierKJS, ItemMatch {}
  class SizedIngredientKJS extends Replaceable {
    kjs$asIngredient(): Ingredient;
    kjs$self(): SizedIngredient;
    kjs$toFlatJson(): JsonElement;
    kjs$toNestedJson(): JsonElement;
    matches(cx: RecipeMatchContext, item: ItemStack, exact: boolean): boolean;
    matches(cx: RecipeMatchContext, inParameter: Ingredient, exact: boolean): boolean;
    matches(cx: RecipeMatchContext, itemLike: ItemLike, exact: boolean): boolean;
    replaceThisWith(cx: RecipeScriptContext, withParameter: any): any;
  }


  class TagLoaderKJS<T = any> {
    kjs$customTags(kjs$resources: ReloadableServerResourcesKJS, map: Map<ResourceLocation, EntryWithSource[]>): void;
    kjs$getRegistry(): Registry<T>;
    kjs$getResources(): ReloadableServerResourcesKJS;
    kjs$init(var1: ReloadableServerResourcesKJS, var2: Registry<T>): void;
  }


  interface TagManagerKJS extends ReloadableServerResourceHolderKJS {}
  class TagManagerKJS extends ReloadableServerResourceHolderKJS {
  }


  class WindowKJS {
    kjs$loadIcons(original: IoSupplier<InputStream>[]): IoSupplier<InputStream>[];
  }


  interface WithAttachedData<T = any> extends MessageSenderKJS {}
  class WithAttachedData<T = any> extends MessageSenderKJS {
    kjs$getData(): AttachedData<T>;
  }


  interface WithPersistentData extends MessageSenderKJS {}
  class WithPersistentData extends MessageSenderKJS {
    kjs$getPersistentData(): CompoundTag;
  }

}

declare module 'dev.latvian.mods.kubejs.core.mixin' {
  import { Player } from 'net.minecraft.world.entity.player';
  import { ClientPlayerKJS, AdvancementNodeKJS, BlockBehaviourKJS, BlockKJS, BlockStateKJS, ClientLevelKJS, ClientPacketListenerKJS, LazyComponentKJS, CustomIngredientKJS, ContainerKJS, CreativeModeTabKJS, DiggerItemKJS, EntityGetterKJS, EntityKJS, EntityTypeKJS, FireworkRocketEntityKJS, FluidIngredientKJS, FluidKJS, FluidStackKJS, GameRulesKJS, InventoryKJS, IngredientKJS, ItemEntityKJS, ItemFrameEntityKJS, ItemKJS, ItemStackKJS, LevelKJS, LivingEntityKJS, LocalClientPlayerKJS, MenuTypeKJS, MinecraftClientKJS, MinecraftServerKJS, ComponentKJS, PlayerKJS, RecipeHolderKJS, RecipeInputKJS, RecipeManagerKJS, ReloadableServerResourcesKJS, ServerLevelKJS, ServerPlayerKJS, SizedFluidIngredientKJS, SizedIngredientKJS, TagLoaderKJS, TagManagerKJS, WindowKJS } from 'dev.latvian.mods.kubejs.core';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos, Direction, Holder, Registry } from 'net.minecraft.core';
  import { GameProfile } from 'com.mojang.authlib';
  import { Consumer, Supplier, Predicate } from 'java.util.function';
  import { RandomTickCallback } from 'dev.latvian.mods.kubejs.block.callback';
  import { SoundType, Block } from 'net.minecraft.world.level.block';
  import { BlockBuilder } from 'dev.latvian.mods.kubejs.block';
  import { Map, List, UUID, Optional } from 'java.util';
  import { KubeColor } from 'dev.latvian.mods.kubejs.color';
  import { WithCodec, AttachedData, ScheduledEvents } from 'dev.latvian.mods.kubejs.util';
  import { Codec } from 'com.mojang.serialization';
  import { Context, Scriptable } from 'dev.latvian.mods.rhino';
  import { AbstractClientPlayer, LocalPlayer } from 'net.minecraft.client.player';
  import { KubeSessionData } from 'dev.latvian.mods.kubejs.client';
  import { CustomJavaToJsWrapper, SpecialEquality, RemappedEnumConstant } from 'dev.latvian.mods.rhino.util';
  import { TypeInfo } from 'dev.latvian.mods.rhino.type';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { Entity, EntityType } from 'net.minecraft.world.entity';
  import { ComponentFunctions, MutableDataComponentHolderFunctions } from 'dev.latvian.mods.kubejs.component';
  import { DataComponentMap, DataComponentType, DataComponentPatch } from 'net.minecraft.core.component';
  import { Builder } from 'DataComponentMap';
  import { Builder as datacomponentpatch_Builder } from 'DataComponentPatch';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { TagKey, TagManager } from 'net.minecraft.tags';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { FluidIngredient } from 'net.neoforged.neoforge.fluids.crafting';
  import { Reference } from 'Holder';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { Key, Value, Type } from 'GameRules';
  import { Stream } from 'java.util.stream';
  import { IItemHandler } from 'net.neoforged.neoforge.items';
  import { LevelBlock } from 'dev.latvian.mods.kubejs.level';
  import { Ingredient, RecipeSerializer, RecipeHolder } from 'net.minecraft.world.item.crafting';
  import { ICustomIngredient } from 'net.neoforged.neoforge.common.crafting';
  import { ItemBuilder, ItemStackKey } from 'dev.latvian.mods.kubejs.item';
  import { Enchantment, ItemEnchantments } from 'net.minecraft.world.item.enchantment';
  import { Iterable, Integer } from 'java.lang';
  import { ClientPacketListener } from 'net.minecraft.client.multiplayer';
  import { StatsCounter, ServerStatsCounter } from 'net.minecraft.stats';
  import { Minecraft } from 'net.minecraft.client';
  import { MenuType } from 'net.minecraft.world.inventory';
  import { Frozen } from 'RegistryAccess';
  import { MinecraftServer } from 'net.minecraft.server';
  import { ServerLevel, ServerPlayer } from 'net.minecraft.server.level';
  import { Stages } from 'dev.latvian.mods.kubejs.stages';
  import { KubeJSInventoryListener } from 'dev.latvian.mods.kubejs.player';
  import { ServerScriptManager } from 'dev.latvian.mods.kubejs.server';
  import { LevelEntityGetter } from 'net.minecraft.world.level.entity';

  interface AbstractClientPlayerMixin extends ClientPlayerKJS, Player {}
  class AbstractClientPlayerMixin extends ClientPlayerKJS {
    constructor(level: Level, blockPos: BlockPos, f: number, gameProfile: GameProfile);
  }


  class AbstractSelectionListMixin<E extends Entry<E> = any> {
  }


  interface AdvancementNodeMixin extends AdvancementNodeKJS {}
  class AdvancementNodeMixin extends AdvancementNodeKJS {
  }


  interface BlockBehaviourMixin extends BlockBehaviourKJS {}
  class BlockBehaviourMixin extends BlockBehaviourKJS {
    kjs$setExplosionResistance(var1: number): void;
    kjs$setFriction(var1: number): void;
    kjs$setHasCollision(var1: boolean): void;
    kjs$setIsRandomlyTicking(var1: boolean): void;
    kjs$setJumpFactor(var1: number): void;
    kjs$setRandomTickCallback(callback: Consumer<RandomTickCallback>): void;
    kjs$setSoundType(var1: SoundType): void;
    kjs$setSpeedFactor(var1: number): void;
  }


  interface BlockMixin extends BlockKJS {}
  class BlockMixin extends BlockKJS {
    kjs$getBlockBuilder(): BlockBuilder;
    kjs$getId(): string;
    kjs$getTypeData(): Map<string, any>;
    kjs$setBlockBuilder(b: BlockBuilder): void;
    kjs$setNameKey(var1: string): void;
  }


  interface BlockStateBaseMixin extends BlockStateKJS {}
  class BlockStateBaseMixin extends BlockStateKJS {
    kjs$setDestroySpeed(var1: number): void;
    kjs$setLightEmission(var1: number): void;
    kjs$setRequiresTool(var1: boolean): void;
  }


  interface ChatFormattingMixin extends KubeColor {}
  class ChatFormattingMixin extends KubeColor {
    kjs$getARGB(): number;
    kjs$getRGB(): number;
  }


  interface ClickEventMixin extends WithCodec {}
  class ClickEventMixin extends WithCodec {
    get value(): string;
    getCodec(cx: Context): Codec<any>;
  }


  interface ClientLevelMixin extends ClientLevelKJS {}
  class ClientLevelMixin extends ClientLevelKJS {
    players(): AbstractClientPlayer[];
  }


  interface ClientPacketListenerMixin extends ClientPacketListenerKJS {}
  class ClientPacketListenerMixin extends ClientPacketListenerKJS {
    kjs$sessionData(): KubeSessionData;
  }


  interface CollectionTagMixin extends CustomJavaToJsWrapper {}
  class CollectionTagMixin extends CustomJavaToJsWrapper {
    convertJavaToJs(cx: Context, scope: Scriptable, target: TypeInfo): Scriptable;
  }


  class CommandSourceStackMixin {
    kjs$sendSuccess(component: Component, broadcastToAdmins: boolean): void;
    kjs$sendSuccessLazy(component: LazyComponentKJS, broadcastToAdmins: boolean): void;
    sendSuccess(var1: Supplier<Component>, var2: boolean): void;
  }


  interface CompoundIngredientMixin extends CustomIngredientKJS {}
  class CompoundIngredientMixin extends CustomIngredientKJS {
    kjs$canBeUsedForMatching(): boolean;
  }


  interface CompoundTagMixin extends CustomJavaToJsWrapper {}
  class CompoundTagMixin extends CustomJavaToJsWrapper {
    tags: Map;
    convertJavaToJs(cx: Context, scope: Scriptable, target: TypeInfo): Scriptable;
  }


  interface ContainerMixin extends ContainerKJS {}
  class ContainerMixin extends ContainerKJS {
  }


  class CreativeModeInventoryScreenMixin {
  }


  interface CreativeModeTabMixin extends CreativeModeTabKJS {}
  class CreativeModeTabMixin extends CreativeModeTabKJS {
    kjs$setDisplayName(component: Component): void;
    kjs$setIcon(icon: ItemStack): void;
  }


  class DamageSourceMixin {
    get directEntity(): Entity;
    get entity(): Entity;
    get msgId(): string;
    kjs$getPlayer(): Player;
  }


  interface DataComponentMapBuilderMixin extends ComponentFunctions {}
  class DataComponentMapBuilderMixin extends ComponentFunctions {
    build(): DataComponentMap;
    kjs$get<T>(type: DataComponentType<T>): T;
    kjs$getComponentMap(): DataComponentMap;
    kjs$override<T>(type: DataComponentType<T>, value: T): ComponentFunctions;
    kjs$remove(type: DataComponentType<any>): ComponentFunctions;
    set<T>(var1: DataComponentType<T>, var2: T): Builder;
  }


  interface DataComponentPatchBuilderMixin extends ComponentFunctions {}
  class DataComponentPatchBuilderMixin extends ComponentFunctions {
    build(): DataComponentPatch;
    kjs$get<T>(type: DataComponentType<T>): T;
    kjs$override<T>(type: DataComponentType<T>, value: T): ComponentFunctions;
    kjs$remove(type: DataComponentType<any>): ComponentFunctions;
    set<T>(var1: DataComponentType<T>, var2: T): datacomponentpatch_Builder;
  }


  class DataComponentsMixin {
  }


  interface DifferenceIngredientMixin extends CustomIngredientKJS {}
  class DifferenceIngredientMixin extends CustomIngredientKJS {
    kjs$canBeUsedForMatching(): boolean;
  }


  interface DiggerItemMixin extends DiggerItemKJS {}
  class DiggerItemMixin extends DiggerItemKJS {
    init(ci: CallbackInfo, blocks: TagKey<Block>): void;
    kjs$getMineableTag(): TagKey<Block>;
  }


  class DirectionMixin {
    get 2DDataValue(): number;
    get 3DDataValue(): number;
    get stepX(): number;
    get stepY(): number;
    get stepZ(): number;
    kjs$getPitch(): number;
    toYRot(): number;
  }


  interface DyeColorMixin extends KubeColor {}
  class DyeColorMixin extends KubeColor {
    kjs$getARGB(): number;
    kjs$getFireworkRGB(): number;
    kjs$getRGB(): number;
  }


  interface EntityGetterMixin extends EntityGetterKJS {}
  class EntityGetterMixin extends EntityGetterKJS {
    players(): Player[];
  }


  interface EntityMixin extends EntityKJS {}
  class EntityMixin extends EntityKJS {
    tickCount: number;
    clearFire(): void;
    distanceTo(var1: Entity): number;
    distanceToSqr(var1: number, var3: number, var5: number): number;
    distanceToSqr(var1: Entity): number;
    get direction(): Direction;
    get passengers(): Entity[];
    get persistentData(): CompoundTag;
    get scoreboardName(): string;
    get stringUUID(): string;
    get type(): EntityType<any>;
    get uUID(): UUID;
    get xRot(): number;
    get yRot(): number;
    hurt(var1: DamageSource, var2: number): boolean;
    isAlliedTo(var1: Entity): boolean;
    isCurrentlyGlowing(): boolean;
    kjs$getPersistentData(): CompoundTag;
    kjs$getRawPersistentData(): CompoundTag;
    kjs$setRawPersistentData(tag: CompoundTag): void;
    level(): Level;
    moveTo(var1: number, var3: number, var5: number, var7: number, var8: number): void;
    playerTouch(var1: Player): void;
    push(var1: number, var3: number, var5: number): void;
    set xRot(var1: number);
    set yRot(var1: number);
    setDeltaMovement(var1: number, var3: number, var5: number): void;
    setGlowingTag(var1: boolean): void;
  }


  interface EntityTypeMixin extends EntityTypeKJS {}
  class EntityTypeMixin extends EntityTypeKJS {
    kjs$asHolder(): Holder<EntityType<any>>;
    kjs$getId(): string;
    kjs$getKey(): ResourceKey<EntityType<any>>;
  }


  class FallingBlockEntityMixin {
    kjs$setBlockState(state: BlockState): void;
  }


  interface FireworkRocketEntityMixin extends FireworkRocketEntityKJS {}
  class FireworkRocketEntityMixin extends FireworkRocketEntityKJS {
    setLifetimeKJS(var1: number): void;
  }


  interface FluidIngredientMixin extends FluidIngredientKJS {}
  class FluidIngredientMixin extends FluidIngredientKJS {
    kjs$self(): FluidIngredient;
  }


  interface FluidMixin extends FluidKJS {}
  class FluidMixin extends FluidKJS {
    kjs$asHolder(): Reference<Fluid>;
    kjs$getId(): string;
    kjs$getKey(): ResourceKey<Fluid>;
  }


  interface FluidStackMixin extends FluidStackKJS {}
  class FluidStackMixin extends FluidStackKJS {
  }


  class GameRendererMixin {
    loadEffect(var1: ResourceLocation): void;
  }


  interface GameRulesMixin extends GameRulesKJS {}
  class GameRulesMixin extends GameRulesKJS {
    getRule<T extends Value<T>>(var1: Key<T>): T;
    kjs$get(rule: string): Value<any>;
    kjs$set(rule: string, value: string): void;
    visit<T extends Value<T>>(key: Key<T>, type: Type<T>): void;
  }


  class GuiGraphicsMixin {
  }


  class HolderMixin<T = any> {
    is(var1: TagKey<T>): boolean;
    is(var1: ResourceKey<T>): boolean;
    is(var1: Holder<T>): boolean;
    is(var1: Predicate<ResourceKey<T>>): boolean;
    is(var1: ResourceLocation): boolean;
    kjs$isTag(tagKey: ResourceLocation): boolean;
    unwrapKey(): Optional<ResourceKey<T>>;
  }


  class IBlockStateExtensionMixin {
  }


  interface ICustomIngredientMixin extends CustomIngredientKJS {}
  class ICustomIngredientMixin extends CustomIngredientKJS {
    get items(): Stream<ItemStack>;
  }


  interface IItemHandlerMixin extends InventoryKJS {}
  class IItemHandlerMixin extends InventoryKJS {
    kjs$extractItem(var1: number, var2: number, var3: boolean): ItemStack;
    kjs$getBlock(level: Level): LevelBlock;
    kjs$getSlotLimit(var1: number): number;
    kjs$getSlots(): number;
    kjs$getStackInSlot(var1: number): ItemStack;
    kjs$insertItem(var1: number, var2: ItemStack, var3: boolean): ItemStack;
    kjs$insertItem(stack: ItemStack, simulate: boolean): ItemStack;
    kjs$isItemValid(var1: number, var2: ItemStack): boolean;
    kjs$isMutable(): boolean;
    kjs$self(): IItemHandler;
    kjs$setStackInSlot(slot: number, stack: ItemStack): void;
  }


  interface IngredientMixin extends IngredientKJS {}
  class IngredientMixin extends IngredientKJS {
    get customIngredient(): ICustomIngredient;
    get items(): ItemStack[];
    isCustom(): boolean;
    kjs$canBeUsedForMatching(): boolean;
    kjs$self(): Ingredient;
  }


  interface IntersectionIngredientMixin extends CustomIngredientKJS {}
  class IntersectionIngredientMixin extends CustomIngredientKJS {
    kjs$canBeUsedForMatching(): boolean;
  }


  interface ItemEntityMixin extends ItemEntityKJS {}
  class ItemEntityMixin extends ItemEntityKJS {
  }


  interface ItemFrameEntityMixin extends ItemFrameEntityKJS {}
  class ItemFrameEntityMixin extends ItemFrameEntityKJS {
  }


  interface ItemMixin extends ItemKJS {}
  class ItemMixin extends ItemKJS {
    kjs$asHolder(): Reference<Item>;
    kjs$asIngredient(): Ingredient;
    kjs$getId(): string;
    kjs$getItemBuilder(): ItemBuilder;
    kjs$getKey(): ResourceKey<Item>;
    kjs$getTypeData(): Map<string, any>;
    kjs$getTypeItemStackKey(): ItemStackKey;
    kjs$overrideComponent<T>(type: DataComponentType<T>, value: T): void;
    kjs$setCanRepair(var1: boolean): void;
    kjs$setCraftingRemainder(var1: Item): void;
    kjs$setItemBuilder(b: ItemBuilder): void;
    kjs$setNameKey(var1: string): void;
  }


  class ItemStackClientMixin {
  }


  class ItemStackHandlerMixin {
  }


  interface ItemStackMixin extends ItemStackKJS {}
  class ItemStackMixin extends ItemStackKJS {
    enchant(var1: Holder<Enchantment>, var2: number): void;
    get enchantments(): ItemEnchantments;
    get tags(): Stream<TagKey<Item>>;
    kjs$resetComponents(cx: Context): ItemStackKJS;
  }


  class KeyboardHandlerMixin {
  }


  interface LevelMixin extends LevelKJS {}
  class LevelMixin extends LevelKJS {
    dimension(): ResourceKey<Level>;
    get gameTime(): number;
    kjs$getData(): AttachedData<Level>;
    kjs$getEntityByNetworkID(id: number): Entity;
    kjs$getEntityByUUID(id: UUID): Entity;
    kjs$getMcEntities(): Iterable<Entity>;
  }


  class LevelRendererMixin {
  }


  interface LivingEntityMixin extends LivingEntityKJS {}
  class LivingEntityMixin extends LivingEntityKJS {
  }


  class LoadingOverlayMixin {
  }


  interface LocalPlayerMixin extends LocalClientPlayerKJS, AbstractClientPlayerMixin {}
  class LocalPlayerMixin extends LocalClientPlayerKJS {
    connection: ClientPacketListener;
    constructor(level: Level, blockPos: BlockPos, f: number, gameProfile: GameProfile);
    get stats(): StatsCounter;
    kjs$getMinecraft(): Minecraft;
  }


  class LootDataTypeMixin<T = any> {
  }


  interface MenuTypeMixin extends MenuTypeKJS {}
  class MenuTypeMixin extends MenuTypeKJS {
    kjs$getId(): string;
    kjs$getKey(): ResourceKey<MenuType<any>>;
  }


  interface MinecraftClientMixin extends MinecraftClientKJS {}
  class MinecraftClientMixin extends MinecraftClientKJS {
    player: LocalPlayer;
    kjs$getScheduledEvents(): ScheduledEvents;
    kjs$getTitle(): string;
  }


  interface MinecraftServerMixin extends MinecraftServerKJS {}
  class MinecraftServerMixin extends MinecraftServerKJS {
    invalidateStatus(): void;
    isDedicatedServer(): boolean;
    kjs$getData(): AttachedData<MinecraftServer>;
    kjs$getOverworld(): ServerLevel;
    kjs$getPersistentData(): CompoundTag;
    kjs$getScheduledEvents(): ScheduledEvents;
    kjs$restoreInventories(): Map<UUID, Map<number, ItemStack>>;
    registryAccess(): Frozen;
    stopServer(): void;
  }


  interface MutableComponentMixin extends ComponentKJS {}
  class MutableComponentMixin extends ComponentKJS {
    append(var1: string): MutableComponent;
  }


  interface MutableDataComponentHolderMixin extends MutableDataComponentHolderFunctions {}
  class MutableDataComponentHolderMixin extends MutableDataComponentHolderFunctions {
    applyComponents(var1: DataComponentPatch): void;
    applyComponents(var1: DataComponentMap): void;
    remove<T>(var1: DataComponentType<T>): T;
    remove<T>(var1: Supplier<DataComponentType<T>>): T;
    set<T>(var1: DataComponentType<T>, var2: T): T;
    set<T>(var1: Supplier<DataComponentType<T>>, var2: T): T;
  }


  class OptionsMixin {
  }


  class PlayerListMixin {
  }


  interface PlayerMixin extends PlayerKJS {}
  class PlayerMixin extends PlayerKJS {
    closeContainer(): void;
    kjs$getCraftingGrid(): InventoryKJS;
    kjs$getData(): AttachedData<Player>;
    kjs$getInventory(): InventoryKJS;
    kjs$getInventoryChangeListener(): KubeJSInventoryListener;
    kjs$getStages(): Stages;
  }


  interface RecipeHolderMixin extends RecipeHolderKJS {}
  class RecipeHolderMixin extends RecipeHolderKJS {
    kjs$getTypeKey(): ResourceKey<RecipeSerializer<any>>;
  }


  interface RecipeInputMixin extends RecipeInputKJS {}
  class RecipeInputMixin extends RecipeInputKJS {
  }


  interface RecipeManagerMixin extends RecipeManagerKJS {}
  class RecipeManagerMixin extends RecipeManagerKJS {
    kjs$getRecipeIdMap(): Map<ResourceLocation, RecipeHolder<any>>;
    kjs$getResources(): ReloadableServerResourcesKJS;
    kjs$replaceRecipes(map: Map<ResourceLocation, RecipeHolder<any>>): void;
    kjs$setResources(resources: ReloadableServerResourcesKJS): void;
  }


  interface ReloadableServerResourcesMixin extends ReloadableServerResourcesKJS {}
  class ReloadableServerResourcesMixin extends ReloadableServerResourcesKJS {
    kjs$getServerScriptManager(): ServerScriptManager;
    kjs$getTagManager(): TagManager;
  }


  interface ResourceKeyMixin extends SpecialEquality {}
  class ResourceKeyMixin extends SpecialEquality {
    kjs$getNamespace(): string;
    kjs$getPath(): string;
    specialEquals(cx: Context, o: any, shallow: boolean): boolean;
  }


  class ScreenMixin {
  }


  interface ServerLevelMixin extends ServerLevelKJS {}
  class ServerLevelMixin extends ServerLevelKJS {
    get entities(): LevelEntityGetter<Entity>;
    getEntity(var1: UUID): Entity;
    kjs$getPersistentData(): CompoundTag;
    players(): ServerPlayer[];
  }


  interface ServerPlayerMixin extends ServerPlayerKJS, Player {}
  class ServerPlayerMixin extends ServerPlayerKJS {
    constructor(level: Level, blockPos: BlockPos, f: number, gameProfile: GameProfile);
    get stats(): ServerStatsCounter;
  }


  interface SizedFluidIngredientMixin extends SizedFluidIngredientKJS {}
  class SizedFluidIngredientMixin extends SizedFluidIngredientKJS {
  }


  interface SizedIngredientMixin extends SizedIngredientKJS {}
  class SizedIngredientMixin extends SizedIngredientKJS {
  }


  interface StringRepresentableMixin extends RemappedEnumConstant {}
  class StringRepresentableMixin extends RemappedEnumConstant {
    get remappedEnumConstantName(): string;
  }


  class TagEmptyConditionMixin {
  }


  interface TagLoaderMixin<T = any> extends TagLoaderKJS<T> {}
  class TagLoaderMixin<T = any> extends TagLoaderKJS<T> {
    kjs$getRegistry(): Registry<T>;
    kjs$getResources(): ReloadableServerResourcesKJS;
    kjs$init(resources: ReloadableServerResourcesKJS, registry: Registry<T>): void;
  }


  interface TagManagerMixin extends TagManagerKJS {}
  class TagManagerMixin extends TagManagerKJS {
    kjs$getResources(): ReloadableServerResourcesKJS;
    kjs$setResources(resources: ReloadableServerResourcesKJS): void;
  }


  interface TextColorMixin extends KubeColor {}
  class TextColorMixin extends KubeColor {
    kjs$getARGB(): number;
    kjs$getRGB(): number;
    kjs$serialize(): string;
  }


  class UtilMixin {
  }


  interface WindowMixin extends WindowKJS {}
  class WindowMixin extends WindowKJS {
  }


  class WorldLoaderMixin {
  }


  class WorldLoaderPackConfigMixin {
  }


  class WorldOpenFlowsMixin {
  }

}

declare module 'dev.latvian.mods.kubejs.core.mixin.mod' {
  class ModNameTooltipMixin {
  }


  class REITooltipMixin {
  }

}

declare module 'dev.latvian.mods.kubejs.entity' {
  import { Post, Pre } from 'LivingDamageEvent';
  import { LivingEntity, EntityType, MobCategory, MobSpawnType, Entity } from 'net.minecraft.world.entity';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { BuilderBase } from 'dev.latvian.mods.kubejs.registry';
  import { Attribute } from 'net.minecraft.world.entity.ai.attributes';
  import { List, Collection, Map } from 'java.util';
  import { Either } from 'com.mojang.datafixers.util';
  import { Sentiment } from 'Attribute';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Predicate } from 'java.util.function';
  import { WrappedSpawner, LevelBlock, KubeLevelEvent } from 'dev.latvian.mods.kubejs.level';
  import { Level } from 'net.minecraft.world.level';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { MobEffectInstance, MobEffect } from 'net.minecraft.world.effect';
  import { Holder, Direction } from 'net.minecraft.core';
  import { Player } from 'net.minecraft.world.entity.player';
  import { FinalizeSpawnEvent, LivingDeathEvent, LivingDropsEvent } from 'net.neoforged.neoforge.event.entity.living';
  import { EntityJoinLevelEvent } from 'net.neoforged.neoforge.event.entity';
  import { Type } from 'HitResult';
  import { Vec3, HitResult } from 'net.minecraft.world.phys';
  import { ItemEntity } from 'net.minecraft.world.entity.item';
  import { ItemStack } from 'net.minecraft.world.item';

  interface AfterLivingEntityHurtKubeEvent extends KubeLivingEntityEvent {}
  class AfterLivingEntityHurtKubeEvent extends KubeLivingEntityEvent {
    constructor(event: Post);
    get damage(): number;
    get entity(): LivingEntity;
    get source(): DamageSource;
  }


  interface AttributeBuilder extends BuilderBase<Attribute> {}
  class AttributeBuilder extends BuilderBase<Attribute> {
    readonly predicateList: List;
    defaultValue: Either;
    syncable: boolean;
    sentiment: Sentiment;
    constructor(id: ResourceLocation);
    attachTo(entityType: Predicate<EntityType<any>>): AttributeBuilder;
    attachToCategory(category: MobCategory): AttributeBuilder;
    attachToMonsters(): AttributeBuilder;
    attachToPlayers(): AttributeBuilder;
    bool(defaultValue: boolean): AttributeBuilder;
    createObject(): Attribute;
    get predicateList(): Predicate<EntityType<any>>[];
    negativeSentiment(): AttributeBuilder;
    neutralSentiment(): AttributeBuilder;
    range(defaultValue: number, min: number, max: number): AttributeBuilder;
    sentiment(sentiment: Sentiment): AttributeBuilder;
    syncable(watch: boolean): AttributeBuilder;
    transformObject(attribute: Attribute): Attribute;
  }


  interface BeforeLivingEntityHurtKubeEvent extends KubeLivingEntityEvent {}
  class BeforeLivingEntityHurtKubeEvent extends KubeLivingEntityEvent {
    constructor(event: Pre);
    get damage(): number;
    get entity(): LivingEntity;
    get source(): DamageSource;
    set damage(damage: number);
  }


  interface CheckLivingEntitySpawnKubeEvent extends KubeLivingEntityEvent {}
  class CheckLivingEntitySpawnKubeEvent extends KubeLivingEntityEvent {
    readonly x: number;
    readonly y: number;
    readonly z: number;
    readonly type: MobSpawnType;
    spawner: WrappedSpawner;
    constructor(entity: LivingEntity, level: Level, x: number, y: number, z: number, type: MobSpawnType, spawnerEither: Either<BlockEntity, Entity>);
    get block(): LevelBlock;
    get entity(): LivingEntity;
    get level(): Level;
    get spawner(): WrappedSpawner;
    get type(): MobSpawnType;
  }


  class EntityPotionEffectsJS {
    constructor(e: LivingEntity);
    add(mobEffect: Holder<MobEffect>): void;
    add(mobEffect: Holder<MobEffect>, duration: number): void;
    add(mobEffect: Holder<MobEffect>, duration: number, amplifier: number): void;
    add(mobEffect: Holder<MobEffect>, duration: number, amplifier: number, ambient: boolean, showParticles: boolean): void;
    clear(): void;
    get active(): Collection<MobEffectInstance>;
    get map(): Map<Holder<MobEffect>, MobEffectInstance>;
    getActive(mobEffect: Holder<MobEffect>): MobEffectInstance;
    getDuration(mobEffect: Holder<MobEffect>): number;
    isActive(mobEffect: Holder<MobEffect>): boolean;
    isApplicable(effect: MobEffectInstance): boolean;
  }


  interface EntitySpawnedKubeEvent extends KubeEntityEvent {}
  class EntitySpawnedKubeEvent extends KubeEntityEvent {
    constructor(entity: Entity, level: Level);
    get entity(): Entity;
    get level(): Level;
  }


  interface KubeEntityEvent extends KubeLevelEvent {}
  class KubeEntityEvent extends KubeLevelEvent {
    get entity(): Entity;
    get level(): Level;
    get player(): Player;
  }


  class KubeJSEntityEventHandler {
    static afterLivingHurt(event: Post): void;
    static beforeLivingHurt(event: Pre): void;
    static checkSpawn(event: FinalizeSpawnEvent): void;
    static entitySpawned(event: EntityJoinLevelEvent): void;
    static livingDeath(event: LivingDeathEvent): void;
    static livingDrops(event: LivingDropsEvent): void;
  }


  interface KubeLivingEntityEvent extends KubeEntityEvent {}
  class KubeLivingEntityEvent extends KubeEntityEvent {
    get entity(): LivingEntity;
  }


  class KubeRayTraceResult {
    readonly fromEntity: Entity;
    readonly type: Type;
    readonly distance: number;
    readonly hit: Vec3;
    readonly block: LevelBlock;
    readonly facing: Direction;
    readonly entity: Entity;
    constructor(from: Entity, result: HitResult, d: number);

    constructor(from: Entity, result: HitResult);
    get hitX(): number;
    get hitY(): number;
    get hitZ(): number;
  }


  interface LivingEntityDeathKubeEvent extends KubeLivingEntityEvent {}
  class LivingEntityDeathKubeEvent extends KubeLivingEntityEvent {
    constructor(entity: LivingEntity, source: DamageSource);
    get entity(): LivingEntity;
    get source(): DamageSource;
  }


  interface LivingEntityDropsKubeEvent extends KubeLivingEntityEvent {}
  class LivingEntityDropsKubeEvent extends KubeLivingEntityEvent {
    eventDrops: List;
    constructor(e: LivingDropsEvent);
    addDrop(stack: ItemStack): ItemEntity;
    addDrop(stack: ItemStack, chance: number): ItemEntity;
    get drops(): ItemEntity[];
    get entity(): LivingEntity;
    get source(): DamageSource;
    isRecentlyHit(): boolean;
  }

}

declare module 'dev.latvian.mods.kubejs.error' {
  import { RecipeComponent, RecipeComponentValue } from 'dev.latvian.mods.kubejs.recipe.component';
  import { Throwable, RuntimeException } from 'java.lang';
  import { MutedError } from 'dev.latvian.mods.kubejs.util';
  import { SourceLine, ConsoleLine } from 'dev.latvian.mods.kubejs.script';
  import { RecipeKey } from 'dev.latvian.mods.kubejs.recipe';
  import { Collection } from 'java.util';

  interface EmptyRecipeComponentException extends InvalidRecipeComponentValueException {}
  class EmptyRecipeComponentException extends InvalidRecipeComponentValueException {
    constructor(component: RecipeComponent<any>, value: any);
  }


  interface EmptyTagTargetException extends KubeRuntimeException {}
  class EmptyTagTargetException extends KubeRuntimeException {
    constructor(message: string);
  }


  interface InvalidRecipeComponentException extends RecipeComponentException {}
  class InvalidRecipeComponentException extends RecipeComponentException {
    readonly componentValueHolder: RecipeComponentValue;
    constructor(h: RecipeComponentValue<any>, cause: Throwable);
  }


  interface InvalidRecipeComponentValueException extends RecipeComponentException {}
  class InvalidRecipeComponentValueException extends RecipeComponentException {
    readonly component: RecipeComponent;
    readonly value: any;
    constructor(message: string, component: RecipeComponent<any>, value: any);

    constructor(component: RecipeComponent<any>, value: any);
  }


  interface KubeRuntimeException extends MutedError, RuntimeException {}
  class KubeRuntimeException extends MutedError {
    constructor(m: string);

    constructor(m: string, cause: Throwable);

    constructor(cause: Throwable);
    apply(line: ConsoleLine): void;
    customData(key: string, data: any): KubeRuntimeException;
    source(sourceLine: SourceLine): KubeRuntimeException;
    toString(): string;
  }


  interface LegacyError extends KubeRuntimeException {}
  class LegacyError extends KubeRuntimeException {
    constructor(message: string);
    toString(): string;
  }


  interface MissingComponentException extends KubeRuntimeException {}
  class MissingComponentException extends KubeRuntimeException {
    readonly key: RecipeKey;
    readonly valid: Collection;
    constructor(keyName: string, key: RecipeKey<any>, valid: Collection<RecipeKey<any>>);
  }


  interface MissingRequiredValueException extends KubeRuntimeException {}
  class MissingRequiredValueException extends KubeRuntimeException {
    constructor();
  }


  interface RecipeComponentException extends KubeRuntimeException {}
  class RecipeComponentException extends KubeRuntimeException {
    readonly component: RecipeComponent;
    readonly key: RecipeKey;
    readonly value: any;
    constructor(msg: string, cause: Throwable, value: RecipeComponentValue<any>);

    constructor(msg: string, cause: Throwable, component: RecipeComponent<any>, key: RecipeKey<any>, value: any);
  }


  interface RecipeComponentTooLargeException extends InvalidRecipeComponentValueException {}
  class RecipeComponentTooLargeException extends InvalidRecipeComponentValueException {
    readonly max: number;
    constructor(component: RecipeComponent<any>, value: any, size: number, max: number);
  }

}

declare module 'dev.latvian.mods.kubejs.event' {
  import { Throwable, Exception, Class, Enum } from 'java.lang';
  import { ScriptTypePredicate, ScriptType, ScriptTypeHolder, ConsoleJS } from 'dev.latvian.mods.kubejs.script';
  import { Supplier, Consumer, Predicate } from 'java.util.function';
  import { Map, HashMap, Set } from 'java.util';
  import { BaseFunction, Context, Scriptable } from 'dev.latvian.mods.rhino';
  import { TypeInfo } from 'dev.latvian.mods.rhino.type';
  import { Type } from 'dev.latvian.mods.kubejs.event.EventResult';
  import { ICancellableEvent } from 'net.neoforged.bus.api';
  import { TriState } from 'net.neoforged.neoforge.common.util';
  import { Transformer } from 'dev.latvian.mods.kubejs.event.EventTargetType';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Registry } from 'net.minecraft.core';

  class EventExceptionHandler {
    handle(var1: KubeEvent, var2: EventHandlerContainer, var3: Throwable): Throwable;
  }


  interface EventExit extends Exception {}
  class EventExit extends Exception {
    readonly result: EventResult;
    constructor(result: EventResult);
  }


  class EventGroup {
    readonly name: string;
    add(name: string, scriptType: ScriptTypePredicate, eventType: Supplier<Class<KubeEvent>>): EventHandler;
    client(name: string, eventType: Supplier<Class<KubeEvent>>): EventHandler;
    common(name: string, eventType: Supplier<Class<KubeEvent>>): EventHandler;
    equals(obj: any): boolean;
    get handlers(): Map<string, EventHandler>;
    hashCode(): number;
    static of(name: string): EventGroup;
    server(name: string, eventType: Supplier<Class<KubeEvent>>): EventHandler;
    startup(name: string, eventType: Supplier<Class<KubeEvent>>): EventHandler;
    toString(): string;
  }


  class EventGroupRegistry {
    register(var1: EventGroup): void;
  }


  interface EventGroupWrapper extends HashMap<string, BaseFunction> {}
  class EventGroupWrapper extends HashMap<string, BaseFunction> {
    constructor(scriptType: ScriptType, group: EventGroup);
    containsKey(key: any): boolean;
    get(key: any): BaseFunction;
    keySet(): Set<string>;
  }


  interface EventHandler extends BaseFunction {}
  class EventHandler extends BaseFunction {
    readonly group: EventGroup;
    readonly name: string;
    readonly scriptTypePredicate: ScriptTypePredicate;
    readonly eventType: Supplier;
    target: EventTargetType;
    targetRequired: boolean;
    exceptionHandler: EventExceptionHandler;
    call(cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    clear(type: ScriptType): void;
    exceptionHandler(handler: EventExceptionHandler): EventHandler;
    forEachListener(type: ScriptType, callback: Consumer<EventHandlerContainer>): void;
    get result(): TypeInfo;
    hasListeners(): boolean;
    hasResult(result: TypeInfo): EventHandler;
    hasResult(): EventHandler;
    listen(cx: Context, type: ScriptType, extraId: any, handler: IEventHandler): void;
    listenJava(type: ScriptType, extraId: any, handler: IEventHandler): void;
    post(event: KubeEvent): EventResult;
    post(scriptType: ScriptTypeHolder, event: KubeEvent): EventResult;
    requiredTarget<E>(type: EventTargetType<E>): TargetedEventHandler<E>;
    supportsTarget<E>(type: EventTargetType<E>): TargetedEventHandler<E>;
    toString(): string;
  }


  class EventHandlerContainer {
    readonly target: any;
    readonly handler: IEventHandler;
    readonly source: string;
    readonly line: number;
    constructor(target: any, handler: IEventHandler, source: string, line: number);
    add(extraId: any, handler: IEventHandler, source: string, line: number): void;
    handle(console: ConsoleJS, handler: EventHandler, event: KubeEvent): EventResult;
    static isEmpty(array: EventHandlerContainer[]): boolean;
    toString(): string;
  }


  class EventResult {
    static readonly PASS: EventResult;
    applyCancel(event: ICancellableEvent): boolean;
    applyTristate(consumer: Consumer<TriState>): void;
    cx(): Context;
    interruptDefault(): boolean;
    interruptFalse(): boolean;
    interruptTrue(): boolean;
    override(): boolean;
    pass(): boolean;
    type(): Type;
    value(): any;
  }


  class EventTargetType<T = any> {
    static readonly STRING: EventTargetType;
    static readonly ID: EventTargetType;
    static readonly REGISTRY: EventTargetType;
    readonly type: Class;
    transformer: Transformer;
    identity: boolean;
    validator: Predicate;
    toString: Transformer;
    describeType: TypeInfo;
    static create<T>(type: Class<T>): EventTargetType<T>;
    describeType(describeType: TypeInfo): EventTargetType<T>;
    static fromEnum<T extends Enum<T>>(type: Class<T>): EventTargetType<T>;
    identity(): EventTargetType<T>;
    static registryKey<T>(registry: ResourceKey<Registry<T>>, type: Class<any>): EventTargetType<ResourceKey<T>>;
    toString(factory: Transformer): EventTargetType<T>;
    transformer(factory: Transformer): EventTargetType<T>;
    validator(validator: Predicate<any>): EventTargetType<T>;
  }


  class IEventHandler {
    onEvent(var1: KubeEvent): any;
  }


  class KubeEvent {
    afterPosted(result: EventResult): void;
    cancel(cx: Context): any;
    cancel(cx: Context, value: any): any;
    defaultExitValue(cx: Context): any;
    exit(cx: Context): any;
    exit(cx: Context, value: any): any;
    get exitValueType(): TypeInfo;
    mapExitValue(cx: Context, value: any): any;
    success(cx: Context): any;
    success(cx: Context, value: any): any;
  }


  interface KubeStartupEvent extends KubeEvent {}
  class KubeStartupEvent extends KubeEvent {
    static readonly BASIC: KubeStartupEvent;
  }


  interface TargetedEventHandler<E = any> extends EventHandler {}
  class TargetedEventHandler<E = any> extends EventHandler {
    clear(type: ScriptType): void;
    exceptionHandler(handler: EventExceptionHandler): TargetedEventHandler<E>;
    findUniqueExtraIds(type: ScriptType): Set<E>;
    forEachListener(type: ScriptType, callback: Consumer<EventHandlerContainer>): void;
    hasListeners(): boolean;
    hasListeners(extraId: E): boolean;
    hasResult(result: TypeInfo): TargetedEventHandler<E>;
    hasResult(): TargetedEventHandler<E>;
    post(event: KubeEvent, extraId: E): EventResult;
    post(type: ScriptTypeHolder, extraId: E, event: KubeEvent): EventResult;
    post(event: KubeEvent): EventResult;
    post(scriptType: ScriptTypeHolder, event: KubeEvent): EventResult;
  }

}

declare module 'dev.latvian.mods.kubejs.event.EventResult' {
  import { Enum } from 'java.lang';
  import { EventExit } from 'dev.latvian.mods.kubejs.event';
  import { Context } from 'dev.latvian.mods.rhino';
  import { List } from 'java.util';

  interface Type extends Enum<Type> {}
  class Type extends Enum<Type> {
    static readonly ERROR: Type;
    static readonly PASS: Type;
    static readonly INTERRUPT_DEFAULT: Type;
    static readonly INTERRUPT_FALSE: Type;
    static readonly INTERRUPT_TRUE: Type;
    exit(cx: Context, value: any): EventExit;
    static valueOf(name: string): Type;
    static values(): Type[];
  }

}

declare module 'dev.latvian.mods.kubejs.event.EventTargetType' {
  class Transformer {
    static readonly IDENTITY: Transformer;
    transform(var1: any): any;
  }

}

declare module 'dev.latvian.mods.kubejs.fluid' {
  import { BuilderBase, AdditionalObjectRegistry } from 'dev.latvian.mods.kubejs.registry';
  import { FlowingFluid, Fluid } from 'net.minecraft.world.level.material';
  import { BlockBuilder, BlockRenderType } from 'dev.latvian.mods.kubejs.block';
  import { Block } from 'net.minecraft.world.level.block';
  import { Consumer, Supplier } from 'java.util.function';
  import { ItemBuilder } from 'dev.latvian.mods.kubejs.item';
  import { BucketItem, Rarity } from 'net.minecraft.world.item';
  import { KubeAssetGenerator } from 'dev.latvian.mods.kubejs.generator';
  import { KubeColor } from 'dev.latvian.mods.kubejs.color';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Component } from 'net.minecraft.network.chat';
  import { Properties } from 'BaseFlowingFluid';
  import { ReplacementMatch } from 'dev.latvian.mods.kubejs.recipe.match';
  import { FluidType, FluidStack } from 'net.neoforged.neoforge.fluids';
  import { Properties as fluidtype_Properties } from 'FluidType';
  import { PathType } from 'net.minecraft.world.level.pathfinder';
  import { SoundAction } from 'net.neoforged.neoforge.common';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { ParticleOptions } from 'net.minecraft.core.particles';
  import { DeferredRegister } from 'net.neoforged.neoforge.registries';
  import { FluidIngredient, FluidIngredientType } from 'net.neoforged.neoforge.fluids.crafting';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Pattern } from 'java.util.regex';

  interface FlowingFluidBuilder extends BuilderBase<FlowingFluid> {}
  class FlowingFluidBuilder extends BuilderBase<FlowingFluid> {
    readonly fluidBuilder: FluidBuilder;
    constructor(b: FluidBuilder);
    createObject(): FlowingFluid;
  }


  interface FluidBlockBuilder extends BlockBuilder {}
  class FluidBlockBuilder extends BlockBuilder {
    readonly fluidBuilder: FluidBuilder;
    constructor(b: FluidBuilder);
    createObject(): Block;
    item(i: Consumer<ItemBuilder>): BlockBuilder;
  }


  interface FluidBucketItemBuilder extends ItemBuilder {}
  class FluidBucketItemBuilder extends ItemBuilder {
    readonly fluidBuilder: FluidBuilder;
    constructor(b: FluidBuilder);
    createObject(): BucketItem;
    generateAssets(generator: KubeAssetGenerator): void;
  }


  interface FluidBuilder extends BuilderBase<FlowingFluid> {}
  class FluidBuilder extends BuilderBase<FlowingFluid> {
    static readonly WATER_COLOR: KubeColor;
    slopeFindDistance: number;
    levelDecreasePerBlock: number;
    explosionResistance: number;
    tickRate: number;
    fluidType: FluidTypeBuilder;
    flowingFluid: FlowingFluidBuilder;
    block: FluidBlockBuilder;
    bucketItem: FluidBucketItemBuilder;
    constructor(i: ResourceLocation);
    createAdditionalObjects(registry: AdditionalObjectRegistry): void;
    createObject(): FlowingFluid;
    createProperties(): Properties;
    displayName(name: Component): BuilderBase<FlowingFluid>;
    explosionResistance(explosionResistance: number): FluidBuilder;
    flowingTexture(id: ResourceLocation): FluidBuilder;
    generateAssets(generator: KubeAssetGenerator): void;
    levelDecreasePerBlock(levelDecreasePerBlock: number): FluidBuilder;
    noBlock(): FluidBuilder;
    noBucket(): FluidBuilder;
    renderType(l: BlockRenderType): FluidBuilder;
    slopeFindDistance(slopeFindDistance: number): FluidBuilder;
    stillTexture(id: ResourceLocation): FluidBuilder;
    tag(tag: ResourceLocation[]): BuilderBase<FlowingFluid>;
    tickRate(tickRate: number): FluidBuilder;
    tint(c: KubeColor): FluidBuilder;
    translucent(): FluidBuilder;
    type(builder: Consumer<FluidTypeBuilder>): FluidBuilder;
  }


  interface FluidLike extends ReplacementMatch {}
  class FluidLike extends ReplacementMatch {
    kjs$copy(amount: number): FluidLike;
    kjs$getAmount(): number;
    kjs$getFluid(): Fluid;
    kjs$isEmpty(): boolean;
  }


  interface FluidTypeBuilder extends BuilderBase<FluidType> {}
  class FluidTypeBuilder extends BuilderBase<FluidType> {
    properties: fluidtype_Properties;
    stillTexture: ResourceLocation;
    flowingTexture: ResourceLocation;
    actualStillTexture: ResourceLocation;
    actualFlowingTexture: ResourceLocation;
    screenOverlayTexture: ResourceLocation;
    blockOverlayTexture: ResourceLocation;
    tint: KubeColor;
    renderType: BlockRenderType;
    constructor(id: ResourceLocation);
    addDripstoneDripping(chance: number, dripParticle: ParticleOptions, cauldron: Block, fillSound: SoundEvent): FluidTypeBuilder;
    adjacentPathType(adjacentPathType: PathType): FluidTypeBuilder;
    blockOverlayTexture(blockOverlayTexture: ResourceLocation): FluidTypeBuilder;
    canConvertToSource(canConvertToSource: boolean): FluidTypeBuilder;
    canDrown(canDrown: boolean): FluidTypeBuilder;
    canExtinguish(canExtinguish: boolean): FluidTypeBuilder;
    canHydrate(canHydrate: boolean): FluidTypeBuilder;
    canPushEntity(canPushEntity: boolean): FluidTypeBuilder;
    canSwim(canSwim: boolean): FluidTypeBuilder;
    createObject(): FluidType;
    density(density: number): FluidTypeBuilder;
    descriptionId(descriptionId: string): FluidTypeBuilder;
    fallDistanceModifier(fallDistanceModifier: number): FluidTypeBuilder;
    flowingTexture(flowingTexture: ResourceLocation): FluidTypeBuilder;
    lightLevel(lightLevel: number): FluidTypeBuilder;
    motionScale(motionScale: number): FluidTypeBuilder;
    pathType(pathType: PathType): FluidTypeBuilder;
    rarity(rarity: Rarity): FluidTypeBuilder;
    renderType(renderType: BlockRenderType): FluidTypeBuilder;
    screenOverlayTexture(screenOverlayTexture: ResourceLocation): FluidTypeBuilder;
    sound(action: SoundAction, sound: SoundEvent): FluidTypeBuilder;
    stillTexture(stillTexture: ResourceLocation): FluidTypeBuilder;
    supportsBoating(supportsBoating: boolean): FluidTypeBuilder;
    temperature(temperature: number): FluidTypeBuilder;
    tint(tint: KubeColor): FluidTypeBuilder;
    viscosity(viscosity: number): FluidTypeBuilder;
  }


  class KubeJSFluidIngredients {
    static readonly REGISTRY: DeferredRegister;
    static readonly REGEX: Supplier;
    static readonly NAMESPACE: Supplier;
  }


  interface NamespaceFluidIngredient extends FluidIngredient {}
  class NamespaceFluidIngredient extends FluidIngredient {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    readonly namespace: string;
    constructor(namespace: string);
    equals(o: any): boolean;
    get type(): FluidIngredientType<any>;
    hashCode(): number;
    isSimple(): boolean;
    test(fs: FluidStack): boolean;
  }


  interface RegExFluidIngredient extends FluidIngredient {}
  class RegExFluidIngredient extends FluidIngredient {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    readonly pattern: Pattern;
    readonly patternString: string;
    constructor(pattern: Pattern);
    equals(o: any): boolean;
    get type(): FluidIngredientType<any>;
    hashCode(): number;
    isSimple(): boolean;
    test(fs: FluidStack): boolean;
  }


  interface ThickFluidBuilder extends FluidBuilder {}
  class ThickFluidBuilder extends FluidBuilder {
    constructor(i: ResourceLocation);
  }


  interface ThinFluidBuilder extends FluidBuilder {}
  class ThinFluidBuilder extends FluidBuilder {
    constructor(i: ResourceLocation);
  }

}

declare module 'dev.latvian.mods.kubejs.fluid.FluidTypeBuilder' {
  import { FluidType } from 'net.neoforged.neoforge.fluids';
  import { FluidTypeBuilder } from 'dev.latvian.mods.kubejs.fluid';

  interface KubeFluidType extends FluidType {}
  class KubeFluidType extends FluidType {
    readonly builder: FluidTypeBuilder;
    constructor(builder: FluidTypeBuilder);
  }

}

declare module 'dev.latvian.mods.kubejs.generator' {
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { LoadedTexture, VariantBlockStateGenerator, MultipartBlockStateGenerator, ModelGenerator, ParticleGenerator, SoundsGenerator } from 'dev.latvian.mods.kubejs.client';
  import { Consumer } from 'java.util.function';
  import { Map } from 'java.util';
  import { KubeColor } from 'dev.latvian.mods.kubejs.color';
  import { DataMapType } from 'net.neoforged.neoforge.registries.datamaps';
  import { VirtualDataMapFile, GeneratedData } from 'dev.latvian.mods.kubejs.script.data';
  import { ItemPredicate } from 'dev.latvian.mods.kubejs.item';
  import { TickDuration, RegistryAccessContainer } from 'dev.latvian.mods.kubejs.util';
  import { EntityType } from 'net.minecraft.world.entity';
  import { Block } from 'net.minecraft.world.level.block';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { VillagerProfession, VillagerType } from 'net.minecraft.world.entity.npc';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';
  import { GameEvent } from 'net.minecraft.world.level.gameevent';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { KubeEvent } from 'dev.latvian.mods.kubejs.event';
  import { JsonElement } from 'com.google.gson';

  interface KubeAssetGenerator extends KubeResourceGenerator {}
  class KubeAssetGenerator extends KubeResourceGenerator {
    static readonly GENERATED_ITEM_MODEL: ResourceLocation;
    static readonly HANDHELD_ITEM_MODEL: ResourceLocation;
    static readonly CUBE_BLOCK_MODEL: ResourceLocation;
    static readonly CUBE_ALL_BLOCK_MODEL: ResourceLocation;
    blockModel(id: ResourceLocation, consumer: Consumer<ModelGenerator>): void;
    blockState(id: ResourceLocation, consumer: Consumer<VariantBlockStateGenerator>): void;
    defaultHandheldItemModel(id: ResourceLocation): void;
    defaultItemModel(id: ResourceLocation): void;
    itemModel(id: ResourceLocation, consumer: Consumer<ModelGenerator>): void;
    loadTexture(id: ResourceLocation): LoadedTexture;
    mask(target: ResourceLocation, mask: ResourceLocation, input: ResourceLocation): boolean;
    multipartState(id: ResourceLocation, consumer: Consumer<MultipartBlockStateGenerator>): void;
    particle(id: ResourceLocation, consumer: Consumer<ParticleGenerator>): void;
    sounds(namespace: string, consumer: Consumer<SoundsGenerator>): void;
    stencil(target: ResourceLocation, stencil: ResourceLocation, colors: Map<KubeColor, KubeColor>): void;
    texture(target: ResourceLocation, texture: LoadedTexture): void;
  }


  interface KubeDataGenerator extends KubeResourceGenerator {}
  class KubeDataGenerator extends KubeResourceGenerator {
    dataMap<R, T>(var1: DataMapType<R, T>, var2: Consumer<VirtualDataMapFile<R, T>>): void;
    removeCompostable(items: ItemPredicate): void;
    removeFurnaceFuel(items: ItemPredicate): void;
    setCompostable(items: ItemPredicate, chance: number, canVillagerCompost: boolean): void;
    setFurnaceFuel(items: ItemPredicate, ticks: TickDuration): void;
    setMonsterRoomMobs(entityType: EntityType<any>, weight: number): void;
    setOxidizable(from: Block, to: Block): void;
    setParrotImitation(type: EntityType<any>, sound: SoundEvent): void;
    setRaidHeroGifts(profession: VillagerProfession, lootTable: ResourceKey<LootTable>): void;
    setVibrationFrequency(gameEvent: GameEvent, frequency: number): void;
    setVillagerType(biome: ResourceKey<Biome>, villagerType: VillagerType): void;
    setWaxable(from: Block, to: Block): void;
  }


  interface KubeResourceGenerator extends KubeEvent {}
  class KubeResourceGenerator extends KubeEvent {
    add(var1: GeneratedData): void;
    flush(): void;
    get registries(): RegistryAccessContainer;
    getGenerated(var1: ResourceLocation): GeneratedData;
    json(id: ResourceLocation, json: JsonElement): void;
    text(id: ResourceLocation, content: string): void;
  }

}

declare module 'dev.latvian.mods.kubejs.gui.chest' {
  import { ClickType, Slot, AbstractContainerMenu, MenuType } from 'net.minecraft.world.inventory';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Component } from 'net.minecraft.network.chat';
  import { Callback } from 'dev.latvian.mods.kubejs.gui.chest.ChestMenuClickEvent';
  import { Callback as dev_latvian_mods_kubejs_gui_chest_chestmenuinventoryclickevent_Callback } from 'dev.latvian.mods.kubejs.gui.chest.ChestMenuInventoryClickEvent';
  import { Runnable } from 'java.lang';
  import { Container } from 'net.minecraft.world';
  import { Consumer } from 'java.util.function';
  import { Map, List } from 'java.util';
  import { InventoryKJS } from 'dev.latvian.mods.kubejs.core';

  class ChestMenuClickEvent {
    readonly slot: ChestMenuSlot;
    readonly type: ClickType;
    readonly button: number;
    handled: boolean;
    constructor(slot: ChestMenuSlot, type: ClickType, button: number);
    setHandled(): void;
  }


  interface ChestMenuContainerSlot extends Slot {}
  class ChestMenuContainerSlot extends Slot {
    readonly menu: CustomChestMenu;
    readonly _index: number;
    constructor(menu: CustomChestMenu, index: number, xPosition: number, yPosition: number);
    get item(): ItemStack;
    get maxStackSize(): number;
    getMaxStackSize(stack: ItemStack): number;
    mayPickup(playerIn: Player): boolean;
    mayPlace(stack: ItemStack): boolean;
    onQuickCraft(oldStackIn: ItemStack, newStackIn: ItemStack): void;
    remove(amount: number): ItemStack;
    set(stack: ItemStack): void;
  }


  class ChestMenuData {
    readonly player: ServerPlayer;
    title: Component;
    readonly rows: number;
    readonly slots: ChestMenuSlot[];
    anyClicked: Callback;
    inventoryClicked: dev_latvian_mods_kubejs_gui_chest_chestmenuinventoryclickevent_Callback;
    playerSlots: boolean;
    closed: Runnable;
    mouseItem: ItemStack;
    capturedInventory: Container;
    constructor(player: ServerPlayer, title: Component, rows: number);
    button(x: number, y: number, stack: ItemStack, displayName: Component, leftClicked: Callback): void;
    getSlot(x: number, y: number): ChestMenuSlot;
    handleClick(index: number, type: ClickType, button: number): void;
    slot(x: number, y: number, slot: Consumer<ChestMenuSlot>): void;
    slot(x0: number, y0: number, x1: number, y1: number, slot: Consumer<ChestMenuSlot>): void;
    sync(): void;
  }


  class ChestMenuInventoryClickEvent {
    readonly type: ClickType;
    readonly button: number;
    constructor(slot: Slot, type: ClickType, button: number);
    get index(): number;
    get item(): ItemStack;
    set item(item: ItemStack);
  }


  class ChestMenuSlot {
    readonly gui: ChestMenuData;
    readonly index: number;
    readonly x: number;
    readonly y: number;
    clicked: number;
    data: Map;
    readonly clickHandlers: List;
    inventory: InventoryKJS;
    inventorySlot: number;
    constructor(gui: ChestMenuData, index: number);
    clicked(type: ClickType, button: number, callback: Callback, autoHandle: boolean): void;
    get item(): ItemStack;
    resetClickHandlers(): void;
    set item(stack: ItemStack);
    setDoubleClicked(callback: Callback): void;
    setLeftClicked(callback: Callback): void;
    setMiddleClicked(callback: Callback): void;
    setRightClicked(callback: Callback): void;
    setShiftLeftClicked(callback: Callback): void;
    setShiftRightClicked(callback: Callback): void;
    setSwapped(callback: Callback): void;
    setThrown(callback: Callback): void;
    toString(): string;
  }


  interface CustomChestMenu extends AbstractContainerMenu {}
  class CustomChestMenu extends AbstractContainerMenu {
    static readonly TYPES: MenuType[];
    data: ChestMenuData;
    constructor(containerId: number, data: ChestMenuData);
    clicked(slot: number, button: number, clickType: ClickType, player: Player): void;
    get carried(): ItemStack;
    initializeContents(stateId: number, list: ItemStack[], carried: ItemStack): void;
    quickMoveStack(player: Player, slot: number): ItemStack;
    removed(player: Player): void;
    set carried(stack: ItemStack);
    stillValid(player: Player): boolean;
  }

}

declare module 'dev.latvian.mods.kubejs.gui.chest.ChestMenuClickEvent' {
  import { ChestMenuClickEvent } from 'dev.latvian.mods.kubejs.gui.chest';

  class Callback {
    onClick(var1: ChestMenuClickEvent): void;
  }

}

declare module 'dev.latvian.mods.kubejs.gui.chest.ChestMenuInventoryClickEvent' {
  import { ChestMenuInventoryClickEvent } from 'dev.latvian.mods.kubejs.gui.chest';

  class Callback {
    onClick(var1: ChestMenuInventoryClickEvent): void;
  }

}

declare module 'dev.latvian.mods.kubejs.gui' {
  import { Slot, AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { InventoryKJS } from 'dev.latvian.mods.kubejs.core';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player, Inventory } from 'net.minecraft.world.entity.player';
  import { SimpleContainer } from 'net.minecraft.world';
  import { Component } from 'net.minecraft.network.chat';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { IContainerFactory } from 'net.neoforged.neoforge.network';
  import { DeferredRegister } from 'net.neoforged.neoforge.registries';
  import { Supplier } from 'java.util.function';
  import { AbstractContainerScreen, MenuAccess } from 'net.minecraft.client.gui.screens.inventory';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface InventoryKJSSlot extends Slot {}
  class InventoryKJSSlot extends Slot {
    readonly inventory: InventoryKJS;
    readonly invIndex: number;
    constructor(inventory: InventoryKJS, invIndex: number, xPosition: number, yPosition: number);
    get item(): ItemStack;
    get maxStackSize(): number;
    getMaxStackSize(stack: ItemStack): number;
    mayPickup(playerIn: Player): boolean;
    mayPlace(stack: ItemStack): boolean;
    onQuickCraft(oldStackIn: ItemStack, newStackIn: ItemStack): void;
    remove(amount: number): ItemStack;
    set(stack: ItemStack): void;
    setChanged(): void;
  }


  class KubeJSGUI {
    static readonly EMPTY_CONTAINER: SimpleContainer;
    width: number;
    height: number;
    title: Component;
    inventoryLabelX: number;
    inventoryLabelY: number;
    inventory: InventoryKJS;
    inventoryWidth: number;
    inventoryHeight: number;
    playerSlotsX: number;
    playerSlotsY: number;
    constructor();

    constructor(buf: FriendlyByteBuf);
    setInventory(inv: InventoryKJS): void;
    write(buf: FriendlyByteBuf): void;
  }


  interface KubeJSMenu extends AbstractContainerMenu {}
  class KubeJSMenu extends AbstractContainerMenu {
    static readonly FACTORY: IContainerFactory;
    readonly player: Player;
    readonly guiData: KubeJSGUI;
    constructor(id: number, inventory: Inventory, guiData: KubeJSGUI);

    constructor(id: number, inventory: Inventory, buf: FriendlyByteBuf);
    quickMoveStack(player: Player, i: number): ItemStack;
    stillValid(player: Player): boolean;
  }


  class KubeJSMenus {
    static readonly REGISTRY: DeferredRegister;
    static readonly MENU: Supplier;
  }


  interface KubeJSScreen extends MenuAccess<KubeJSMenu>, AbstractContainerScreen<KubeJSMenu> {}
  class KubeJSScreen extends MenuAccess<KubeJSMenu> {
    readonly containerRows: number;
    readonly containerColumns: number;
    constructor(menu: KubeJSMenu, inventory: Inventory, component: Component);
    render(guiGraphics: GuiGraphics, i: number, j: number, f: number): void;
  }

}

declare module 'dev.latvian.mods.kubejs.holder' {
  import { TypeInfo } from 'dev.latvian.mods.rhino.type';
  import { Holder, HolderSet, Registry } from 'net.minecraft.core';
  import { KubeJSContext } from 'dev.latvian.mods.kubejs.script';
  import { DeferredRegister } from 'net.neoforged.neoforge.registries';
  import { ListBacked } from 'HolderSet';
  import { ICustomHolderSet, HolderSetType } from 'net.neoforged.neoforge.registries.holdersets';
  import { RegistryLookup } from 'HolderLookup';
  import { MapCodec } from 'com.mojang.serialization';
  import { ResourceKey } from 'net.minecraft.resources';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { Either } from 'com.mojang.datafixers.util';
  import { TagKey } from 'net.minecraft.tags';
  import { List, Optional } from 'java.util';
  import { Pattern } from 'java.util.regex';

  class HolderWrapper {
    static readonly HOLDER: TypeInfo;
    static readonly HOLDER_SET: TypeInfo;
    static wrap(cx: KubeJSContext, from: any, param: TypeInfo): Holder<any>;
    static wrapSet(cx: KubeJSContext, from: any, param: TypeInfo): HolderSet<any>;
    static wrapSimpleSet<T>(registry: Registry<T>, from: any): HolderSet<T>;
  }


  class KubeJSHolderSets {
    static readonly REGISTRY: DeferredRegister;
    static readonly REGEX: Holder;
    static readonly NAMESPACE: Holder;
  }


  interface NamespaceHolderSet<T = any> extends ICustomHolderSet<T>, ListBacked<T> {}
  class NamespaceHolderSet<T = any> extends ICustomHolderSet<T> {
    readonly registryLookup: RegistryLookup;
    readonly namespace: string;
    static codec<T>(registryKey: ResourceKey<Registry<T>>): MapCodec<NamespaceHolderSet<T>>;
    contains(holder: Holder<T>): boolean;
    static of<T>(registryLookup: RegistryLookup<T>, namespace: string): HolderSet<T>;
    static streamCodec<T>(registryKey: ResourceKey<Registry<T>>): StreamCodec<RegistryFriendlyByteBuf, NamespaceHolderSet<T>>;
    toString(): string;
    type(): HolderSetType;
    unwrap(): Either<TagKey<T>, Holder<T>[]>;
    unwrapKey(): Optional<TagKey<T>>;
  }


  interface RegExHolderSet<T = any> extends ICustomHolderSet<T>, ListBacked<T> {}
  class RegExHolderSet<T = any> extends ICustomHolderSet<T> {
    readonly registryLookup: RegistryLookup;
    readonly pattern: Pattern;
    static codec<T>(registryKey: ResourceKey<Registry<T>>): MapCodec<RegExHolderSet<T>>;
    contains(holder: Holder<T>): boolean;
    static of<T>(registryLookup: RegistryLookup<T>, pattern: Pattern): HolderSet<T>;
    static streamCodec<T>(registryKey: ResourceKey<Registry<T>>): StreamCodec<RegistryFriendlyByteBuf, RegExHolderSet<T>>;
    toString(): string;
    type(): HolderSetType;
    unwrap(): Either<TagKey<T>, Holder<T>[]>;
    unwrapKey(): Optional<TagKey<T>>;
  }

}

declare module 'dev.latvian.mods.kubejs.ingredient' {
  import { ICustomIngredient, IngredientType } from 'net.neoforged.neoforge.common.crafting';
  import { ItemPredicate } from 'dev.latvian.mods.kubejs.item';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Stream } from 'java.util.stream';
  import { DeferredRegister } from 'net.neoforged.neoforge.registries';
  import { Supplier } from 'java.util.function';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';

  interface KubeJSIngredient extends ICustomIngredient, ItemPredicate {}
  class KubeJSIngredient extends ICustomIngredient {
    get items(): Stream<ItemStack>;
    isSimple(): boolean;
    kjs$canBeUsedForMatching(): boolean;
    test(var1: ItemStack): boolean;
  }


  class KubeJSIngredients {
    static readonly REGISTRY: DeferredRegister;
    static readonly WILDCARD: Supplier;
    static readonly NAMESPACE: Supplier;
    static readonly REGEX: Supplier;
    static readonly CREATIVE_TAB: Supplier;
  }


  interface WildcardIngredient extends KubeJSIngredient {}
  class WildcardIngredient extends KubeJSIngredient {
    static INSTANCE: WildcardIngredient;
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    get type(): IngredientType<any>;
    test(stack: ItemStack): boolean;
  }

}

declare module 'dev.latvian.mods.kubejs.integration.architectury' {
  import { KubeJSPlugin } from 'dev.latvian.mods.kubejs.plugin';
  import { FluidStack } from 'dev.architectury.fluid';
  import { Context } from 'dev.latvian.mods.rhino';
  import { TypeWrapperRegistry } from 'dev.latvian.mods.kubejs.script';

  interface ArchitecturyIntegration extends KubeJSPlugin {}
  class ArchitecturyIntegration extends KubeJSPlugin {
    registerTypeWrappers(registry: TypeWrapperRegistry): void;
    static wrapArchFluid(cx: Context, o: any): FluidStack;
  }

}

declare module 'dev.latvian.mods.kubejs.integration.emi' {
  import { AddEntriesKubeEvent, RecipeViewerEntryType, AddInformationKubeEvent, RemoveEntriesKubeEvent } from 'dev.latvian.mods.kubejs.recipe.viewer';
  import { EmiRegistry, EmiPlugin } from 'dev.emi.emi.api';
  import { Context } from 'dev.latvian.mods.rhino';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { EmiStack, EmiIngredient } from 'dev.emi.emi.api.stack';
  import { FluidStack } from 'net.neoforged.neoforge.fluids';
  import { FluidIngredient } from 'net.neoforged.neoforge.fluids.crafting';
  import { Predicate } from 'java.util.function';
  import { ItemPredicate } from 'dev.latvian.mods.kubejs.item';

  interface EMIAddEntriesKubeEvent extends AddEntriesKubeEvent {}
  class EMIAddEntriesKubeEvent extends AddEntriesKubeEvent {
    constructor(type: RecipeViewerEntryType, registry: EmiRegistry);
    add(cx: Context, items: any[]): void;
  }


  interface EMIAddInformationKubeEvent extends AddInformationKubeEvent {}
  class EMIAddInformationKubeEvent extends AddInformationKubeEvent {
    constructor(type: RecipeViewerEntryType, registry: EmiRegistry);
    add(cx: Context, filter: any, info: Component[]): void;
  }


  class EMIIntegration {
    static fluid(stack: FluidStack): EmiStack;
    static fluidIngredient(ingredient: FluidIngredient): EmiIngredient;
    static predicate(ingredient: ItemPredicate): Predicate<EmiStack>;
    static predicate(ingredient: FluidIngredient): Predicate<EmiStack>;
  }


  interface EMIRemoveEntriesKubeEvent extends RemoveEntriesKubeEvent {}
  class EMIRemoveEntriesKubeEvent extends RemoveEntriesKubeEvent {
    constructor(type: RecipeViewerEntryType, registry: EmiRegistry);
    remove(cx: Context, filter: any): void;
  }


  interface KubeJSEMIPlugin extends EmiPlugin {}
  class KubeJSEMIPlugin extends EmiPlugin {
    register(registry: EmiRegistry): void;
  }

}

declare module 'dev.latvian.mods.kubejs.integration.gamestages' {
  import { StageCreationEvent } from 'dev.latvian.mods.kubejs.stages';

  class GameStageClientHelper {
  }


  class GameStagesIntegration {
    static override(event: StageCreationEvent): void;
  }

}

declare module 'dev.latvian.mods.kubejs.integration.jei' {
  import { AddEntriesKubeEvent, RecipeViewerEntryType, AddInformationKubeEvent, RegisterSubtypesKubeEvent, SubtypeInterpreter, RemoveCategoriesKubeEvent, RemoveEntriesKubeEvent, RemoveRecipesKubeEvent } from 'dev.latvian.mods.kubejs.recipe.viewer';
  import { IJeiRuntime } from 'mezz.jei.api.runtime';
  import { IIngredientType, IIngredientTypeWithSubtypes } from 'mezz.jei.api.ingredients';
  import { Context } from 'dev.latvian.mods.rhino';
  import { EventResult } from 'dev.latvian.mods.kubejs.event';
  import { IRecipeRegistration, ISubtypeRegistration } from 'mezz.jei.api.registration';
  import { List, Map } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { DataComponentType } from 'net.minecraft.core.component';
  import { IRecipeManager } from 'mezz.jei.api.recipe';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { IModPlugin } from 'mezz.jei.api';
  import { RemoteRecipeViewerDataUpdatedEvent } from 'dev.latvian.mods.kubejs.recipe.viewer.server';
  import { IPlatformFluidHelper } from 'mezz.jei.api.helpers';

  interface JEIAddEntriesKubeEvent extends AddEntriesKubeEvent {}
  class JEIAddEntriesKubeEvent extends AddEntriesKubeEvent {
    constructor(r: IJeiRuntime, type: RecipeViewerEntryType, t: IIngredientType<any>);
    add(cx: Context, items: any[]): void;
    afterPosted(result: EventResult): void;
  }


  interface JEIAddInformationKubeEvent extends AddInformationKubeEvent {}
  class JEIAddInformationKubeEvent extends AddInformationKubeEvent {
    constructor(type: RecipeViewerEntryType, ingredientType: IIngredientType<any>, registration: IRecipeRegistration);
    add(cx: Context, filter: any, info: Component[]): void;
  }


  class JEIIntegration {
    static getEntries(type: RecipeViewerEntryType, cx: Context, filter: any): any[];
    static typeOf(type: RecipeViewerEntryType): IIngredientType<any>;
  }


  interface JEIRegisterSubtypesKubeEvent extends RegisterSubtypesKubeEvent {}
  class JEIRegisterSubtypesKubeEvent extends RegisterSubtypesKubeEvent {
    constructor(type: RecipeViewerEntryType, ingredientType: IIngredientTypeWithSubtypes<any, any>, registration: ISubtypeRegistration);
    register(cx: Context, filter: any, interpreter: SubtypeInterpreter): void;
    useComponents(cx: Context, filter: any, components: DataComponentType<any>[]): void;
    useComponents(cx: Context, filter: any): void;
  }


  interface JEIRemoveCategoriesKubeEvent extends RemoveCategoriesKubeEvent {}
  class JEIRemoveCategoriesKubeEvent extends RemoveCategoriesKubeEvent {
    constructor(recipeManager: IRecipeManager, categories: Map<ResourceLocation, IRecipeCategory<any>>);
    remove(cx: Context, ids: ResourceLocation[]): void;
  }


  interface JEIRemoveEntriesKubeEvent extends RemoveEntriesKubeEvent {}
  class JEIRemoveEntriesKubeEvent extends RemoveEntriesKubeEvent {
    constructor(r: IJeiRuntime, type: RecipeViewerEntryType, t: IIngredientType<any>);
    afterPosted(result: EventResult): void;
    remove(cx: Context, filter: any): void;
  }


  interface JEIRemoveRecipesKubeEvent extends RemoveRecipesKubeEvent {}
  class JEIRemoveRecipesKubeEvent extends RemoveRecipesKubeEvent {
    constructor(recipeManager: IRecipeManager, categories: Map<ResourceLocation, IRecipeCategory<any>>);
    afterPosted(result: EventResult): void;
    remove(cx: Context, recipesToRemove: ResourceLocation[]): void;
    removeFromCategory(cx: Context, category: ResourceLocation, recipesToRemove: ResourceLocation[]): void;
  }


  interface KubeJSJEIPlugin extends IModPlugin {}
  class KubeJSJEIPlugin extends IModPlugin {
    static readonly ID: ResourceLocation;
    static readonly DISABLED: boolean;
    constructor();
    get pluginUid(): ResourceLocation;
    loadRemote(event: RemoteRecipeViewerDataUpdatedEvent): void;
    onRuntimeAvailable(runtime: IJeiRuntime): void;
    registerFluidSubtypes<T>(registration: ISubtypeRegistration, platformFluidHelper: IPlatformFluidHelper<T>): void;
    registerItemSubtypes(registration: ISubtypeRegistration): void;
    registerRecipes(registration: IRecipeRegistration): void;
  }

}

declare module 'dev.latvian.mods.kubejs.integration.rei' {
  import { REIClientPlugin } from 'me.shedaniel.rei.api.client.plugins';
  import { RemoteRecipeViewerDataUpdatedEvent } from 'dev.latvian.mods.kubejs.recipe.viewer.server';
  import { EntryRegistry, CollapsibleEntryRegistry } from 'me.shedaniel.rei.api.client.registry.entry';
  import { BasicFilteringRule } from 'me.shedaniel.rei.api.client.entry.filtering.base';
  import { DisplayRegistry } from 'me.shedaniel.rei.api.client.registry.display';
  import { CategoryRegistry } from 'me.shedaniel.rei.api.client.registry.category';
  import { PluginManager } from 'me.shedaniel.rei.api.common.plugins';
  import { ReloadStage } from 'me.shedaniel.rei.api.common.registry';
  import { ItemComparatorRegistry, FluidComparatorRegistry } from 'me.shedaniel.rei.api.common.entry.comparison';
  import { AddEntriesKubeEvent, RecipeViewerEntryType, AddInformationKubeEvent, GroupEntriesKubeEvent, RegisterSubtypesKubeEvent, SubtypeInterpreter, RemoveCategoriesKubeEvent, RemoveEntriesKubeEvent, RemoveRecipesKubeEvent } from 'dev.latvian.mods.kubejs.recipe.viewer';
  import { EntryType } from 'me.shedaniel.rei.api.common.entry.type';
  import { Context } from 'dev.latvian.mods.rhino';
  import { List, Set, Map, Collection } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { EntryStack, EntryIngredient } from 'me.shedaniel.rei.api.common.entry';
  import { FluidIngredient } from 'net.neoforged.neoforge.fluids.crafting';
  import { DataComponentType } from 'net.minecraft.core.component';
  import { CategoryIdentifier } from 'me.shedaniel.rei.api.common.category';

  interface KubeJSREIPlugin extends REIClientPlugin {}
  class KubeJSREIPlugin extends REIClientPlugin {
    constructor();
    get priority(): number;
    loadRemote(event: RemoteRecipeViewerDataUpdatedEvent): void;
    postStage(manager: PluginManager<REIClientPlugin>, stage: ReloadStage): void;
    registerBasicEntryFiltering(rule: BasicFilteringRule<any>): void;
    registerCategories(registry: CategoryRegistry): void;
    registerCollapsibleEntries(registry: CollapsibleEntryRegistry): void;
    registerDisplays(registry: DisplayRegistry): void;
    registerEntries(registry: EntryRegistry): void;
    registerFluidComparators(registry: FluidComparatorRegistry): void;
    registerItemComparators(registry: ItemComparatorRegistry): void;
  }


  interface REIAddEntriesKubeEvent extends AddEntriesKubeEvent {}
  class REIAddEntriesKubeEvent extends AddEntriesKubeEvent {
    constructor(type: RecipeViewerEntryType, entryType: EntryType<any>, registry: EntryRegistry);
    add(cx: Context, items: any[]): void;
  }


  interface REIAddInformationKubeEvent extends AddInformationKubeEvent {}
  class REIAddInformationKubeEvent extends AddInformationKubeEvent {
    constructor(type: RecipeViewerEntryType);
    add(cx: Context, filter: any, info: Component[]): void;
  }


  interface REIGroupEntriesKubeEvent extends GroupEntriesKubeEvent {}
  class REIGroupEntriesKubeEvent extends GroupEntriesKubeEvent {
    constructor(type: RecipeViewerEntryType, entryType: EntryType<any>, registry: CollapsibleEntryRegistry);
    group(cx: Context, filter: any, groupId: ResourceLocation, description: Component): void;
  }


  class REIIntegration {
    static fluidIngredient(ingredient: FluidIngredient): EntryIngredient;
    static ingredientOf(cx: Context, type: RecipeViewerEntryType, from: any): EntryIngredient;
    static stackOf(cx: Context, type: RecipeViewerEntryType, from: any): EntryStack<any>;
    static typeOf(type: RecipeViewerEntryType): EntryType<any>;
  }


  interface REIRegisterFluidSubtypesKubeEvent extends RegisterSubtypesKubeEvent {}
  class REIRegisterFluidSubtypesKubeEvent extends RegisterSubtypesKubeEvent {
    constructor(registry: FluidComparatorRegistry);
    register(cx: Context, filter: any, interpreter: SubtypeInterpreter): void;
    useComponents(cx: Context, filter: any, components: DataComponentType<any>[]): void;
    useComponents(cx: Context, filter: any): void;
  }


  interface REIRegisterItemSubtypesKubeEvent extends RegisterSubtypesKubeEvent {}
  class REIRegisterItemSubtypesKubeEvent extends RegisterSubtypesKubeEvent {
    constructor(registry: ItemComparatorRegistry);
    register(cx: Context, filter: any, interpreter: SubtypeInterpreter): void;
    useComponents(cx: Context, filter: any, components: DataComponentType<any>[]): void;
    useComponents(cx: Context, filter: any): void;
  }


  interface REIRemoveCategoriesKubeEvent extends RemoveCategoriesKubeEvent {}
  class REIRemoveCategoriesKubeEvent extends RemoveCategoriesKubeEvent {
    constructor(categoriesRemoved: Set<CategoryIdentifier<any>>);
    remove(cx: Context, categories: ResourceLocation[]): void;
  }


  interface REIRemoveEntriesCompletelyKubeEvent extends RemoveEntriesKubeEvent {}
  class REIRemoveEntriesCompletelyKubeEvent extends RemoveEntriesKubeEvent {
    constructor(type: RecipeViewerEntryType, allEntries: EntryStack<any>[], rule: BasicFilteringRule<any>);
    remove(cx: Context, filter: any): void;
  }


  interface REIRemoveEntriesKubeEvent extends RemoveEntriesKubeEvent {}
  class REIRemoveEntriesKubeEvent extends RemoveEntriesKubeEvent {
    constructor(type: RecipeViewerEntryType, registry: EntryRegistry, allEntries: EntryStack<any>[]);
    remove(cx: Context, filter: any): void;
  }


  interface REIRemoveRecipeKubeEvent extends RemoveRecipesKubeEvent {}
  class REIRemoveRecipeKubeEvent extends RemoveRecipesKubeEvent {
    constructor(recipesRemoved: Map<CategoryIdentifier<any>, Collection<ResourceLocation>>);
    remove(cx: Context, recipesToRemove: ResourceLocation[]): void;
    removeFromCategory(cx: Context, category: ResourceLocation, recipesToRemove: ResourceLocation[]): void;
  }

}

declare module 'dev.latvian.mods.kubejs.item' {
  import { BuilderBase, ModelledBuilderBase } from 'dev.latvian.mods.kubejs.registry';
  import { ArmorMaterial, ItemStack, TooltipFlag, Item, Rarity, UseAnim, JukeboxPlayable, JukeboxSong, Tier } from 'net.minecraft.world.item';
  import { Map, List, Collection, Set, Iterator } from 'java.util';
  import { Holder } from 'net.minecraft.core';
  import { Supplier, Consumer, Function, ToIntFunction, ToIntBiFunction, Predicate } from 'java.util.function';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Type } from 'ArmorItem';
  import { Integer, Iterable } from 'java.lang';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { Layer } from 'ArmorMaterial';
  import { KubeEvent, KubeStartupEvent } from 'dev.latvian.mods.kubejs.event';
  import { Component } from 'net.minecraft.network.chat';
  import { FoodProperties } from 'net.minecraft.world.food';
  import { MobEffect } from 'net.minecraft.world.effect';
  import { KubeEntityEvent, KubeRayTraceResult } from 'dev.latvian.mods.kubejs.entity';
  import { LivingEntity, Entity } from 'net.minecraft.world.entity';
  import { NameCallback, UseCallback, FinishUsingCallback, ReleaseUsingCallback, HurtEnemyContext } from 'dev.latvian.mods.kubejs.item.ItemBuilder';
  import { Tool, ItemAttributeModifiers } from 'net.minecraft.world.item.component';
  import { KubeAssetGenerator } from 'dev.latvian.mods.kubejs.generator';
  import { DataComponentType, DataComponentPatch } from 'net.minecraft.core.component';
  import { TickDuration, KubeResourceLocation, Lazy } from 'dev.latvian.mods.kubejs.util';
  import { KubeColor } from 'dev.latvian.mods.kubejs.color';
  import { Properties } from 'Item';
  import { KubePlayerEvent } from 'dev.latvian.mods.kubejs.player';
  import { Player, Inventory } from 'net.minecraft.world.entity.player';
  import { InteractionHand, Container } from 'net.minecraft.world';
  import { Context } from 'dev.latvian.mods.rhino';
  import { TypeInfo } from 'dev.latvian.mods.rhino.type';
  import { InventoryKJS, IngredientSupplierKJS } from 'dev.latvian.mods.kubejs.core';
  import { PlayerDestroyItemEvent } from 'net.neoforged.neoforge.event.entity.player';
  import { ItemEntity } from 'net.minecraft.world.entity.item';
  import { ItemEnchantments } from 'net.minecraft.world.item.enchantment';
  import { ClampedItemPropertyFunction } from 'net.minecraft.client.renderer.item';
  import { ItemModifications } from 'dev.latvian.mods.kubejs.item.ItemModificationKubeEvent';
  import { Stream } from 'java.util.stream';
  import { RightClickItem, LeftClickEmpty, EntityInteract } from 'PlayerInteractEvent';
  import { Pre, Post } from 'ItemEntityPickupEvent';
  import { ItemTossEvent } from 'net.neoforged.neoforge.event.entity.item';
  import { ItemCraftedEvent, ItemSmeltedEvent } from 'PlayerEvent';
  import { ItemTooltipData, TooltipRequirements } from 'dev.latvian.mods.kubejs.text.tooltip';
  import { TextActionBuilder } from 'dev.latvian.mods.kubejs.text.action';
  import { TagKey } from 'net.minecraft.tags';
  import { Block } from 'net.minecraft.world.level.block';

  interface ArmorMaterialBuilder extends BuilderBase<ArmorMaterial> {}
  class ArmorMaterialBuilder extends BuilderBase<ArmorMaterial> {
    defense: Map;
    enchantmentValue: number;
    equipSound: Holder;
    repairIngredient: Supplier;
    layers: List;
    toughness: number;
    knockbackResistance: number;
    constructor(i: ResourceLocation);
    createObject(): ArmorMaterial;
    defense(v: Map<Type, number>): ArmorMaterialBuilder;
    enchantmentValue(v: number): ArmorMaterialBuilder;
    equipSound(sound: Holder<SoundEvent>): ArmorMaterialBuilder;
    knockbackResistance(v: number): ArmorMaterialBuilder;
    layers(v: Layer[]): ArmorMaterialBuilder;
    repairIngredient(v: Supplier<Ingredient>): ArmorMaterialBuilder;
    toughness(v: number): ArmorMaterialBuilder;
  }


  interface DynamicItemTooltipsKubeEvent extends KubeEvent {}
  class DynamicItemTooltipsKubeEvent extends KubeEvent {
    readonly item: ItemStack;
    readonly lines: List;
    readonly startup: boolean;
    readonly advanced: boolean;
    readonly creative: boolean;
    readonly shift: boolean;
    readonly ctrl: boolean;
    readonly alt: boolean;
    constructor(item: ItemStack, flags: TooltipFlag, lines: Component[], startup: boolean);
    add(text: Component[]): void;
  }


  class FoodBuilder {
    eaten: Consumer;
    constructor();

    constructor(properties: FoodProperties);
    alwaysEdible(flag: boolean): FoodBuilder;
    alwaysEdible(): FoodBuilder;
    build(): FoodProperties;
    eatSeconds(seconds: number): FoodBuilder;
    eaten(e: Consumer<FoodEatenKubeEvent>): FoodBuilder;
    effect(mobEffectId: ResourceLocation, duration: number, amplifier: number, probability: number): FoodBuilder;
    fastToEat(): FoodBuilder;
    nutrition(h: number): FoodBuilder;
    removeEffect(mobEffect: MobEffect): FoodBuilder;
    saturation(s: number): FoodBuilder;
    usingConvertsTo(stack: ItemStack): FoodBuilder;
  }


  interface FoodEatenKubeEvent extends KubeEntityEvent {}
  class FoodEatenKubeEvent extends KubeEntityEvent {
    constructor(e: LivingEntity, is: ItemStack);
    get entity(): Entity;
    get item(): ItemStack;
  }


  interface ItemBuilder extends ModelledBuilderBase<Item> {}
  class ItemBuilder extends ModelledBuilderBase<Item> {
    components: Map;
    maxStackSize: number;
    maxDamage: number;
    burnTime: number;
    subtypes: Function;
    rarity: Rarity;
    fireResistant: boolean;
    glow: boolean;
    readonly tooltip: List;
    tint: ItemTintFunction;
    foodBuilder: FoodBuilder;
    barColor: Function;
    barWidth: ToIntFunction;
    nameGetter: NameCallback;
    anim: UseAnim;
    useDuration: ToIntBiFunction;
    use: UseCallback;
    finishUsing: FinishUsingCallback;
    releaseUsing: ReleaseUsingCallback;
    hurtEnemy: Predicate;
    jukeboxPlayable: JukeboxPlayable;
    tool: Tool;
    itemAttributeModifiers: ItemAttributeModifiers;
    canRepair: boolean;
    constructor(id: ResourceLocation);
    barColor(barColor: Function<ItemStack, KubeColor>): ItemBuilder;
    barWidth(barWidth: ToIntFunction<ItemStack>): ItemBuilder;
    burnTime(v: TickDuration): ItemBuilder;
    color(index: number, color: ItemTintFunction): ItemBuilder;
    color(callback: ItemTintFunction): ItemBuilder;
    component<T>(type: DataComponentType<T>, value: T): ItemBuilder;
    containerItem(id: ResourceLocation): ItemBuilder;
    createItemProperties(): Properties;
    createObject(): Item;
    disableRepair(): ItemBuilder;
    finishUsing(finishUsing: FinishUsingCallback): ItemBuilder;
    fireResistant(isFireResistant: boolean): ItemBuilder;
    fireResistant(): ItemBuilder;
    food(b: Consumer<FoodBuilder>): ItemBuilder;
    food(nutrition: number, saturation: number): ItemBuilder;
    generateAssets(generator: KubeAssetGenerator): void;
    glow(v: boolean): ItemBuilder;
    group(g: string): ItemBuilder;
    hurtEnemy(context: Predicate<HurtEnemyContext>): ItemBuilder;
    jukeboxPlayable(song: ResourceKey<JukeboxSong>, showInTooltip: boolean): ItemBuilder;
    jukeboxPlayable(song: ResourceKey<JukeboxSong>): ItemBuilder;
    maxDamage(v: number): ItemBuilder;
    maxStackSize(v: number): ItemBuilder;
    name(name: NameCallback): ItemBuilder;
    rarity(v: Rarity): ItemBuilder;
    releaseUsing(releaseUsing: ReleaseUsingCallback): ItemBuilder;
    subtypes(fn: Function<ItemStack, Collection<ItemStack>>): ItemBuilder;
    tooltip(text: Component): ItemBuilder;
    transformObject(obj: Item): Item;
    unstackable(): ItemBuilder;
    use(use: UseCallback): ItemBuilder;
    useAnimation(animation: UseAnim): ItemBuilder;
    useDuration(useDuration: ToIntBiFunction<ItemStack, LivingEntity>): ItemBuilder;
  }


  interface ItemClickedKubeEvent extends KubePlayerEvent {}
  class ItemClickedKubeEvent extends KubePlayerEvent {
    constructor(player: Player, hand: InteractionHand, item: ItemStack);
    defaultExitValue(cx: Context): ItemStack;
    get entity(): Player;
    get exitValueType(): TypeInfo;
    get hand(): InteractionHand;
    get item(): ItemStack;
    get target(): KubeRayTraceResult;
  }


  interface ItemCraftedKubeEvent extends KubePlayerEvent {}
  class ItemCraftedKubeEvent extends KubePlayerEvent {
    constructor(player: Player, crafted: ItemStack, container: Container);
    get entity(): Player;
    get inventory(): InventoryKJS;
    get item(): ItemStack;
  }


  interface ItemDestroyedKubeEvent extends KubePlayerEvent {}
  class ItemDestroyedKubeEvent extends KubePlayerEvent {
    constructor(e: PlayerDestroyItemEvent);
    get entity(): Player;
    get hand(): InteractionHand;
    get item(): ItemStack;
  }


  interface ItemDroppedKubeEvent extends KubePlayerEvent {}
  class ItemDroppedKubeEvent extends KubePlayerEvent {
    constructor(player: Player, entity: ItemEntity);
    get entity(): Player;
    get item(): ItemStack;
    get itemEntity(): ItemEntity;
  }


  class ItemEnchantmentsWrapper {
    static readonly MAP_TYPE: TypeInfo;
    static wrap(cx: Context, from: any): ItemEnchantments;
  }


  interface ItemEntityInteractedKubeEvent extends KubePlayerEvent {}
  class ItemEntityInteractedKubeEvent extends KubePlayerEvent {
    constructor(player: Player, entity: Entity, hand: InteractionHand, item: ItemStack);
    get entity(): Player;
    get hand(): InteractionHand;
    get item(): ItemStack;
    get target(): Entity;
  }


  class ItemHandlerUtils {
    static giveItemToPlayer(player: Player, stack: ItemStack, preferredSlot: number): void;
    static insertItem(dest: InventoryKJS, stack: ItemStack, simulate: boolean): ItemStack;
    static insertItemStacked(inventory: InventoryKJS, stack: ItemStack, simulate: boolean): ItemStack;
  }


  interface ItemModelPropertiesKubeEvent extends KubeStartupEvent {}
  class ItemModelPropertiesKubeEvent extends KubeStartupEvent {
    register(ingredient: Ingredient, overwriteId: KubeResourceLocation, callback: ClampedItemPropertyFunction): void;
    registerAll(overwriteId: KubeResourceLocation, callback: ClampedItemPropertyFunction): void;
  }


  interface ItemModificationKubeEvent extends KubeEvent {}
  class ItemModificationKubeEvent extends KubeEvent {
    modify(inParameter: ItemPredicate, c: Consumer<ItemModifications>): void;
  }


  interface ItemPickedUpKubeEvent extends KubePlayerEvent {}
  class ItemPickedUpKubeEvent extends KubePlayerEvent {
    constructor(player: Player, entity: ItemEntity, stack: ItemStack);
    get entity(): Player;
    get item(): ItemStack;
    get itemEntity(): ItemEntity;
  }


  interface ItemPredicate extends Predicate<ItemStack>, IngredientSupplierKJS {}
  class ItemPredicate extends Predicate<ItemStack> {
    static readonly TYPE_INFO: TypeInfo;
    static readonly NONE: ItemPredicate;
    static readonly ALL: ItemPredicate;
    kjs$asIngredient(): Ingredient;
    kjs$canBeUsedForMatching(): boolean;
    kjs$getDisplayStacks(): ItemStackSet;
    kjs$getFirst(): ItemStack;
    kjs$getItemIds(): Set<string>;
    kjs$getItemStream(): Stream<Item>;
    kjs$getItemTypes(): Set<Item>;
    kjs$getStackArray(): ItemStack[];
    kjs$getStacks(): ItemStackSet;
    kjs$isWildcard(): boolean;
    kjs$testItem(item: Item): boolean;
    test(var1: ItemStack): boolean;
    static wrap(cx: Context, from: any): ItemPredicate;
  }


  interface ItemSmeltedKubeEvent extends KubePlayerEvent {}
  class ItemSmeltedKubeEvent extends KubePlayerEvent {
    constructor(player: Player, smelted: ItemStack);
    get entity(): Player;
    get item(): ItemStack;
  }


  class ItemStackKey {
    static EMPTY: ItemStackKey;
    readonly item: Item;
    readonly patch: DataComponentPatch;
    constructor(item: Item, patch: DataComponentPatch);
    equals(obj: any): boolean;
    hashCode(): number;
    static of(stack: ItemStack): ItemStackKey;
  }


  interface ItemStackSet extends Iterable<ItemStack> {}
  class ItemStackSet extends Iterable<ItemStack> {
    constructor(initialSize: number);

    constructor();

    constructor(...items: ItemStack[]);
    add(stack: ItemStack): void;
    addAll(other: ItemStackSet): void;
    addItem(item: Item): void;
    contains(stack: ItemStack): boolean;
    forEach(action: Consumer<ItemStack>): void;
    get first(): ItemStack;
    isEmpty(): boolean;
    iterator(): Iterator<ItemStack>;
    static merge(first: ItemStackSet, second: ItemStackSet): ItemStackSet;
    remove(stack: ItemStack): void;
    size(): number;
    stream(): Stream<ItemStack>;
    toArray(): ItemStack[];
    toList(): ItemStack[];
  }


  class ItemToolTiers {
    static readonly ALL: Lazy;
    static wrap(o: any): Tier;
  }


  interface JukeboxSongBuilder extends BuilderBase<JukeboxSong> {}
  class JukeboxSongBuilder extends BuilderBase<JukeboxSong> {
    sound: Holder;
    lengthInSeconds: number;
    description: Component;
    comparatorOutput: number;
    constructor(id: ResourceLocation);
    comparatorOutput(comparatorOutput: number): JukeboxSongBuilder;
    createObject(): JukeboxSong;
    description(description: Component): JukeboxSongBuilder;
    song(sound: Holder<SoundEvent>, length: number): JukeboxSongBuilder;
  }


  class KubeJSItemEventHandler {
    static crafted(event: ItemCraftedEvent): void;
    static entityInteract(event: EntityInteract): void;
    static itemDestroyed(event: PlayerDestroyItemEvent): void;
    static itemDrop(event: ItemTossEvent): void;
    static itemPickupPost(event: Post): void;
    static itemPickupPre(event: Pre): void;
    static leftClickEmpty(event: LeftClickEmpty): void;
    static rightClick(event: RightClickItem): void;
    static smelted(event: ItemSmeltedEvent): void;
  }


  interface KubeJSItemProperties extends Properties {}
  class KubeJSItemProperties extends Properties {
    readonly itemBuilder: ItemBuilder;
    constructor(itemBuilder: ItemBuilder);
  }


  class KubeJSItemStackData {
    chance: number;
  }


  interface ModifyItemTooltipsKubeEvent extends KubeEvent {}
  class ModifyItemTooltipsKubeEvent extends KubeEvent {
    constructor(callback: Consumer<ItemTooltipData>);
    add(filter: Ingredient, text: Component[]): void;
    add(filter: Ingredient, requirements: TooltipRequirements, text: Component[], builder: TextActionBuilder): void;
    modify(filter: Ingredient, requirements: TooltipRequirements, consumer: Consumer<TextActionBuilder>): void;
    modify(filter: Ingredient, consumer: Consumer<TextActionBuilder>): void;
    modifyAll(requirements: TooltipRequirements, consumer: Consumer<TextActionBuilder>): void;
    modifyAll(consumer: Consumer<TextActionBuilder>): void;
  }


  interface MutableToolTier extends Tier {}
  class MutableToolTier extends Tier {
    readonly parent: Tier;
    constructor(p: Tier);
    get attackDamageBonus(): number;
    get enchantmentValue(): number;
    get incorrectBlocksForDrops(): TagKey<Block>;
    get incorrectBlocksForDropsTag(): ResourceLocation;
    get repairIngredient(): Ingredient;
    get speed(): number;
    get uses(): number;
    set attackDamageBonus(f: number);
    set enchantmentValue(i: number);
    set incorrectBlocksForDropsTag(tag: ResourceLocation);
    set repairIngredient(inParameter: Ingredient);
    set speed(f: number);
    set uses(i: number);
  }


  interface PlayerMainInvWrapper extends RangedWrapper {}
  class PlayerMainInvWrapper extends RangedWrapper {
    constructor(inv: Inventory);
    get inventoryPlayer(): Inventory;
    kjs$insertItem(slot: number, stack: ItemStack, simulate: boolean): ItemStack;
    kjs$insertItem(stack: ItemStack, simulate: boolean): ItemStack;
  }


  interface RangedWrapper extends InventoryKJS {}
  class RangedWrapper extends InventoryKJS {
    constructor(compose: InventoryKJS, minSlot: number, maxSlotExclusive: number);
    kjs$extractItem(slot: number, amount: number, simulate: boolean): ItemStack;
    kjs$getSlotLimit(slot: number): number;
    kjs$getSlots(): number;
    kjs$getStackInSlot(slot: number): ItemStack;
    kjs$insertItem(slot: number, stack: ItemStack, simulate: boolean): ItemStack;
    kjs$insertItem(stack: ItemStack, simulate: boolean): ItemStack;
    kjs$isItemValid(slot: number, stack: ItemStack): boolean;
    kjs$isMutable(): boolean;
    kjs$setStackInSlot(slot: number, stack: ItemStack): void;
  }

}

declare module 'dev.latvian.mods.kubejs.item.creativetab' {
  import { BuilderBase } from 'dev.latvian.mods.kubejs.registry';
  import { CreativeModeTab, ItemStack } from 'net.minecraft.world.item';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { TabVisibility } from 'CreativeModeTab';
  import { ItemPredicate } from 'dev.latvian.mods.kubejs.item';
  import { KubeEvent } from 'dev.latvian.mods.kubejs.event';
  import { Component } from 'net.minecraft.network.chat';
  import { DeferredRegister } from 'net.neoforged.neoforge.registries';
  import { Supplier } from 'java.util.function';

  interface CreativeTabBuilder extends BuilderBase<CreativeModeTab> {}
  class CreativeTabBuilder extends BuilderBase<CreativeModeTab> {
    icon: CreativeTabIconSupplier;
    content: CreativeTabContentSupplier;
    constructor(i: ResourceLocation);
    content(content: CreativeTabContentSupplier): CreativeTabBuilder;
    createObject(): CreativeModeTab;
    icon(icon: CreativeTabIconSupplier): CreativeTabBuilder;
  }


  class CreativeTabCallback {
    addAfter(var1: ItemStack, var2: ItemStack[], var3: TabVisibility): void;
    addBefore(var1: ItemStack, var2: ItemStack[], var3: TabVisibility): void;
    remove(var1: ItemPredicate, var2: boolean, var3: boolean): void;
  }


  class CreativeTabContentSupplier {
    static readonly DEFAULT: CreativeTabContentSupplier;
    getContent(var1: boolean): ItemPredicate;
  }


  class CreativeTabIconSupplier {
    static readonly DEFAULT: CreativeTabIconSupplier;
    get icon(): ItemStack;
  }


  interface CreativeTabKubeEvent extends KubeEvent {}
  class CreativeTabKubeEvent extends KubeEvent {
    readonly tab: CreativeModeTab;
    readonly showRestrictedItems: boolean;
    constructor(tab: CreativeModeTab, showRestrictedItems: boolean, callback: CreativeTabCallback);
    add(items: ItemStack[], visibility: TabVisibility): void;
    add(items: ItemStack[]): void;
    addAfter(order: ItemStack, items: ItemStack[], visibility: TabVisibility): void;
    addAfter(order: ItemStack, items: ItemStack[]): void;
    addBefore(order: ItemStack, items: ItemStack[], visibility: TabVisibility): void;
    addBefore(order: ItemStack, items: ItemStack[]): void;
    remove(filter: ItemPredicate): void;
    removeFromParent(filter: ItemPredicate): void;
    removeFromSearch(filter: ItemPredicate): void;
    setDisplayName(component: Component): void;
    setIcon(icon: ItemStack): void;
  }


  class KubeJSCreativeTabs {
    static readonly REGISTRY: DeferredRegister;
    static readonly TAB: Supplier;
  }

}

declare module 'dev.latvian.mods.kubejs.item.custom' {
  import { ItemBuilder, MutableToolTier } from 'dev.latvian.mods.kubejs.item';
  import { Type } from 'ArmorItem';
  import { Holder } from 'net.minecraft.core';
  import { Item, ArmorMaterial, Tier, DiggerItem, ItemStack, SmithingTemplateItem } from 'net.minecraft.world.item';
  import { BiFunction, Consumer } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Properties } from 'Item';
  import { Component } from 'net.minecraft.network.chat';
  import { List } from 'java.util';
  import { LangKubeEvent } from 'dev.latvian.mods.kubejs.client';

  interface ArmorItemBuilder extends ItemBuilder {}
  class ArmorItemBuilder extends ItemBuilder {
    readonly armorType: Type;
    material: Holder;
    createObject(): Item;
    material(material: Holder<ArmorMaterial>): ArmorItemBuilder;
  }


  interface DiggerItemBuilder extends HandheldItemBuilder {}
  class DiggerItemBuilder extends HandheldItemBuilder {
    readonly function: BiFunction;
    constructor(i: ResourceLocation, d: number, s: number, f: BiFunction<Tier, Properties, DiggerItem>);
    createObject(): Item;
  }


  interface HandheldItemBuilder extends ItemBuilder {}
  class HandheldItemBuilder extends ItemBuilder {
    toolTier: MutableToolTier;
    attackDamageBaseline: number;
    speedBaseline: number;
    constructor(i: ResourceLocation, d: number, s: number);
    attackDamageBaseline(f: number): HandheldItemBuilder;
    attackDamageBonus(f: number): HandheldItemBuilder;
    modifyTier(callback: Consumer<MutableToolTier>): HandheldItemBuilder;
    speed(f: number): HandheldItemBuilder;
    speedBaseline(f: number): HandheldItemBuilder;
    tier(t: Tier): HandheldItemBuilder;
  }


  interface ShearsItemBuilder extends ItemBuilder {}
  class ShearsItemBuilder extends ItemBuilder {
    static readonly SHEAR_TAGS: ResourceLocation[];
    speedBaseline: number;
    constructor(i: ResourceLocation);
    createObject(): Item;
    static isCustomShears(stack: ItemStack): boolean;
    speedBaseline(f: number): ShearsItemBuilder;
  }


  interface SmithingTemplateItemBuilder extends ItemBuilder {}
  class SmithingTemplateItemBuilder extends ItemBuilder {
    appliesToText: Component;
    ingredientsText: Component;
    appliesToSlotDescriptionText: Component;
    ingredientSlotDescriptionText: Component;
    readonly appliesToEmptyIcons: List;
    readonly ingredientsSlotEmptyIcons: List;
    constructor(i: ResourceLocation);
    addAppliesToSlotIcon(location: ResourceLocation): SmithingTemplateItemBuilder;
    addIngredientsSlotIcon(location: ResourceLocation): SmithingTemplateItemBuilder;
    appliesTo(text: string): SmithingTemplateItemBuilder;
    appliesToSlotDescription(text: string): SmithingTemplateItemBuilder;
    armorIcons(): SmithingTemplateItemBuilder;
    axeIcon(): SmithingTemplateItemBuilder;
    bootsIcon(): SmithingTemplateItemBuilder;
    chestplateIcon(): SmithingTemplateItemBuilder;
    createObject(): SmithingTemplateItem;
    crystalIcons(): SmithingTemplateItemBuilder;
    diamondIcon(): SmithingTemplateItemBuilder;
    displayName(name: Component): SmithingTemplateItemBuilder;
    dustIcon(): SmithingTemplateItemBuilder;
    emeraldIcon(): SmithingTemplateItemBuilder;
    equipmentIcons(): SmithingTemplateItemBuilder;
    generateLang(lang: LangKubeEvent): void;
    helmetIcon(): SmithingTemplateItemBuilder;
    hoeIcon(): SmithingTemplateItemBuilder;
    ingotAndCrystalIcons(): SmithingTemplateItemBuilder;
    ingotIcon(): SmithingTemplateItemBuilder;
    ingredients(text: string): SmithingTemplateItemBuilder;
    ingredientsSlotDescription(text: string): SmithingTemplateItemBuilder;
    lapisIcon(): SmithingTemplateItemBuilder;
    leggingsIcon(): SmithingTemplateItemBuilder;
    pickaxeIcon(): SmithingTemplateItemBuilder;
    quartzIcon(): SmithingTemplateItemBuilder;
    shardIcon(): SmithingTemplateItemBuilder;
    shovelIcon(): SmithingTemplateItemBuilder;
    swordIcon(): SmithingTemplateItemBuilder;
    toolIcons(): SmithingTemplateItemBuilder;
  }


  interface SwordItemBuilder extends HandheldItemBuilder {}
  class SwordItemBuilder extends HandheldItemBuilder {
    static readonly SWORD_TAGS: ResourceLocation[];
    static readonly SWORD_MODEL: ResourceLocation;
    constructor(i: ResourceLocation);
    createObject(): Item;
  }

}

declare module 'dev.latvian.mods.kubejs.item.custom.ArmorItemBuilder' {
  import { ArmorItemBuilder } from 'dev.latvian.mods.kubejs.item.custom';
  import { BodyType } from 'AnimalArmorItem';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Item } from 'net.minecraft.world.item';

  interface AnimalArmor extends ArmorItemBuilder {}
  class AnimalArmor extends ArmorItemBuilder {
    bodyType: BodyType;
    overlay: boolean;
    constructor(id: ResourceLocation);
    bodyType(type: BodyType): AnimalArmor;
    createObject(): Item;
    overlay(o: boolean): AnimalArmor;
  }


  interface Boots extends ArmorItemBuilder {}
  class Boots extends ArmorItemBuilder {
    static readonly BOOT_TAGS: ResourceLocation[];
    constructor(id: ResourceLocation);
  }


  interface Leggings extends ArmorItemBuilder {}
  class Leggings extends ArmorItemBuilder {
    static readonly LEGGING_TAGS: ResourceLocation[];
    constructor(id: ResourceLocation);
  }


  interface Chestplate extends ArmorItemBuilder {}
  class Chestplate extends ArmorItemBuilder {
    static readonly CHESTPLATE_TAGS: ResourceLocation[];
    constructor(id: ResourceLocation);
  }


  interface Helmet extends ArmorItemBuilder {}
  class Helmet extends ArmorItemBuilder {
    static readonly HELMET_TAGS: ResourceLocation[];
    constructor(id: ResourceLocation);
  }

}

declare module 'dev.latvian.mods.kubejs.item.custom.DiggerItemBuilder' {
  import { DiggerItemBuilder } from 'dev.latvian.mods.kubejs.item.custom';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface Hoe extends DiggerItemBuilder {}
  class Hoe extends DiggerItemBuilder {
    static readonly HOE_TAGS: ResourceLocation[];
    static readonly HOE_MODEL: ResourceLocation;
    constructor(i: ResourceLocation);
  }


  interface Axe extends DiggerItemBuilder {}
  class Axe extends DiggerItemBuilder {
    static readonly AXE_TAGS: ResourceLocation[];
    static readonly AXE_MODEL: ResourceLocation;
    constructor(i: ResourceLocation);
  }


  interface Shovel extends DiggerItemBuilder {}
  class Shovel extends DiggerItemBuilder {
    static readonly SHOVEL_TAGS: ResourceLocation[];
    static readonly SHOVEL_MODEL: ResourceLocation;
    constructor(i: ResourceLocation);
  }


  interface Pickaxe extends DiggerItemBuilder {}
  class Pickaxe extends DiggerItemBuilder {
    static readonly PICKAXE_TAGS: ResourceLocation[];
    static readonly PICKAXE_MODEL: ResourceLocation;
    constructor(i: ResourceLocation);
  }

}

declare module 'dev.latvian.mods.kubejs.item.custom.ShearsItemBuilder' {
  import { ShearsItem, ItemStack } from 'net.minecraft.world.item';
  import { ShearsItemBuilder } from 'dev.latvian.mods.kubejs.item.custom';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  interface ShearsItemKJS extends ShearsItem {}
  class ShearsItemKJS extends ShearsItem {
    readonly builder: ShearsItemBuilder;
    constructor(builder: ShearsItemBuilder);
    getDestroySpeed(itemStack: ItemStack, blockState: BlockState): number;
  }

}

declare module 'dev.latvian.mods.kubejs.item.ItemBuilder' {
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { InteractionHand } from 'net.minecraft.world';
  import { ItemStack } from 'net.minecraft.world.item';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { Component } from 'net.minecraft.network.chat';

  class UseCallback {
    use(var1: Level, var2: Player, var3: InteractionHand): boolean;
  }


  class FinishUsingCallback {
    finishUsingItem(var1: ItemStack, var2: Level, var3: LivingEntity): ItemStack;
  }


  class ReleaseUsingCallback {
    releaseUsing(var1: ItemStack, var2: Level, var3: LivingEntity, var4: number): void;
  }


  class NameCallback {
    apply(var1: ItemStack): Component;
  }

}

declare module 'dev.latvian.mods.kubejs.level' {
  import { Level, Explosion } from 'net.minecraft.world.level';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockPos, RegistryAccess, Direction } from 'net.minecraft.core';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { LivingEntity, Entity, EntityType } from 'net.minecraft.world.entity';
  import { Load, Unload } from 'LevelEvent';
  import { Post } from 'LevelTickEvent';
  import { Start, Detonate } from 'ExplosionEvent';
  import { KubeEvent } from 'dev.latvian.mods.kubejs.event';
  import { MinecraftServer } from 'net.minecraft.server';
  import { BlockProviderKJS, InventoryKJS } from 'dev.latvian.mods.kubejs.core';
  import { Block } from 'net.minecraft.world.level.block';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { Map, List } from 'java.util';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Fireworks } from 'net.minecraft.world.item.component';
  import { ItemStack } from 'net.minecraft.world.item';
  import { EntityArrayList } from 'dev.latvian.mods.kubejs.player';

  interface CachedLevelBlock extends LevelBlock {}
  class CachedLevelBlock extends LevelBlock {
    readonly minecraftLevel: Level;
    cachedState: BlockState;
    cachedEntity: BlockEntity;
    constructor(w: Level, p: BlockPos);
    cache(state: BlockState): LevelBlock;
    cache(entity: BlockEntity): LevelBlock;
    clearCache(): void;
    equals(obj: any): boolean;
    get blockState(): BlockState;
    get entity(): BlockEntity;
    get level(): Level;
    get pos(): BlockPos;
    set blockState(state: BlockState);
    setBlockState(state: BlockState, flags: number): void;
    toString(): string;
  }


  interface ExplosionKubeEvent extends KubeLevelEvent {}
  class ExplosionKubeEvent extends KubeLevelEvent {
    constructor(level: Level, explosion: Explosion);
    get block(): LevelBlock;
    get exploder(): LivingEntity;
    get level(): Level;
    get position(): Vec3;
    get x(): number;
    get y(): number;
    get z(): number;
  }


  class KubeJSWorldEventHandler {
    static detonateExplosion(event: Detonate): void;
    static preExplosion(event: Start): void;
    static serverLevelLoad(event: Load): void;
    static serverLevelUnload(event: Unload): void;
    static serverTickEvent(event: Post): void;
  }


  interface KubeLevelEvent extends KubeEvent {}
  class KubeLevelEvent extends KubeEvent {
    get level(): Level;
    get registries(): RegistryAccess;
    get server(): MinecraftServer;
  }


  interface LevelBlock extends BlockProviderKJS {}
  class LevelBlock extends BlockProviderKJS {
    cache(state: BlockState): LevelBlock;
    cache(entity: BlockEntity): LevelBlock;
    canSeeSkyFromBelowWater(): boolean;
    createEntity(type: EntityType<any>): Entity;
    explode(properties: ExplosionProperties): Explosion;
    get biomeId(): ResourceLocation;
    get blockLight(): number;
    get blockState(): BlockState;
    get canSeeSky(): boolean;
    get centerX(): number;
    get centerY(): number;
    get centerZ(): number;
    get dimension(): ResourceLocation;
    get dimensionKey(): ResourceKey<Level>;
    get down(): LevelBlock;
    get drops(): ItemStack[];
    get east(): LevelBlock;
    get entity(): BlockEntity;
    get entityData(): CompoundTag;
    get entityId(): string;
    get inventory(): InventoryKJS;
    get item(): ItemStack;
    get level(): Level;
    get light(): number;
    get north(): LevelBlock;
    get playersInRadius(): EntityArrayList;
    get pos(): BlockPos;
    get properties(): Map<string, string>;
    get skyLight(): number;
    get south(): LevelBlock;
    get up(): LevelBlock;
    get west(): LevelBlock;
    get x(): number;
    get y(): number;
    get z(): number;
    getDrops(entity: Entity, heldItem: ItemStack): ItemStack[];
    getInventory(facing: Direction): InventoryKJS;
    getPlayersInRadius(radius: number): EntityArrayList;
    kjs$getBlock(): Block;
    mergeEntityData(tag: CompoundTag): void;
    offset(f: Direction, d: number): LevelBlock;
    offset(f: Direction): LevelBlock;
    offset(x: number, y: number, z: number): LevelBlock;
    popItem(item: ItemStack): void;
    popItemFromFace(item: ItemStack, dir: Direction): void;
    set(block: Block, properties: Map<any, any>, flags: number): void;
    set(block: Block, properties: Map<any, any>): void;
    set(block: Block): void;
    set blockState(state: BlockState);
    set entityData(tag: CompoundTag);
    setBlockState(state: BlockState, flags: number): void;
    spawnFireworks(fireworks: Fireworks, lifetime: number): void;
    spawnLightning(effectOnly: boolean, player: ServerPlayer): void;
    spawnLightning(effectOnly: boolean): void;
    spawnLightning(): void;
    toBlockStateString(): string;
  }


  interface SimpleLevelKubeEvent extends KubeLevelEvent {}
  class SimpleLevelKubeEvent extends KubeLevelEvent {
    constructor(l: Level);
    get level(): Level;
  }

}

declare module 'dev.latvian.mods.kubejs.level.ExplosionKubeEvent' {
  import { ExplosionKubeEvent, LevelBlock } from 'dev.latvian.mods.kubejs.level';
  import { Level, Explosion } from 'net.minecraft.world.level';
  import { List } from 'java.util';
  import { Entity } from 'net.minecraft.world.entity';
  import { EntityArrayList } from 'dev.latvian.mods.kubejs.player';

  interface After extends ExplosionKubeEvent {}
  class After extends ExplosionKubeEvent {
    constructor(level: Level, explosion: Explosion, affectedEntities: Entity[]);
    get affectedBlocks(): LevelBlock[];
    get affectedEntities(): EntityArrayList;
    removeAffectedBlock(block: LevelBlock): void;
    removeAffectedEntity(entity: Entity): void;
    removeAllAffectedBlocks(): void;
    removeAllAffectedEntities(): void;
    removeKnockback(): void;
  }


  interface Before extends ExplosionKubeEvent {}
  class Before extends ExplosionKubeEvent {
    constructor(level: Level, explosion: Explosion);
    get size(): number;
    set size(s: number);
  }

}

declare module 'dev.latvian.mods.kubejs.level.ruletest' {
  import { RuleTest, RuleTestType } from 'net.minecraft.world.level.levelgen.structure.templatesystem';
  import { MapCodec } from 'com.mojang.serialization';
  import { List } from 'java.util';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { RandomSource } from 'net.minecraft.util';
  import { DeferredRegister } from 'net.neoforged.neoforge.registries';
  import { Supplier } from 'java.util.function';

  interface AllMatchRuleTest extends RuleTest {}
  class AllMatchRuleTest extends RuleTest {
    static readonly CODEC: MapCodec;
    readonly rules: List;
    constructor();

    constructor(rules: RuleTest[]);
    test(blockState: BlockState, random: RandomSource): boolean;
  }


  interface AlwaysFalseRuleTest extends RuleTest {}
  class AlwaysFalseRuleTest extends RuleTest {
    static readonly INSTANCE: AlwaysFalseRuleTest;
    static readonly CODEC: MapCodec;
    test(blockState: BlockState, random: RandomSource): boolean;
  }


  interface AnyMatchRuleTest extends RuleTest {}
  class AnyMatchRuleTest extends RuleTest {
    static readonly CODEC: MapCodec;
    readonly rules: List;
    constructor();

    constructor(rules: RuleTest[]);
    test(blockState: BlockState, random: RandomSource): boolean;
  }


  interface InvertRuleTest extends RuleTest {}
  class InvertRuleTest extends RuleTest {
    static readonly CODEC: MapCodec;
    readonly original: RuleTest;
    constructor(t: RuleTest);
    test(blockState: BlockState, random: RandomSource): boolean;
  }


  class KubeJSRuleTests {
    static readonly REGISTRY: DeferredRegister;
    static readonly INVERT: Supplier;
    static readonly ALWAYS_FALSE: Supplier;
    static readonly ALL_MATCH: Supplier;
    static readonly ANY_MATCH: Supplier;
    static register<P extends RuleTest>(id: string, codec: MapCodec<P>): Supplier<RuleTestType<P>>;
  }

}

declare module 'dev.latvian.mods.kubejs.misc' {
  import { MobEffect, MobEffectCategory, MobEffectInstance } from 'net.minecraft.world.effect';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { RemovalReason } from 'Entity';
  import { AttributeMap, Attribute } from 'net.minecraft.world.entity.ai.attributes';
  import { Holder } from 'net.minecraft.core';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Operation } from 'AttributeModifier';
  import { SimpleParticleType, ParticleType, ParticleOptions } from 'net.minecraft.core.particles';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { BuilderBase } from 'dev.latvian.mods.kubejs.registry';
  import { EffectEntityCallback } from 'dev.latvian.mods.kubejs.misc.MobEffectBuilder';
  import { Map, List, Set } from 'java.util';
  import { KubeColor } from 'dev.latvian.mods.kubejs.color';
  import { PaintingVariant } from 'net.minecraft.world.entity.decoration';
  import { KubeResourceLocation } from 'dev.latvian.mods.kubejs.util';
  import { Consumer } from 'java.util.function';
  import { KubeAssetGenerator } from 'dev.latvian.mods.kubejs.generator';
  import { PoiType } from 'net.minecraft.world.entity.ai.village.poi';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Block } from 'net.minecraft.world.level.block';
  import { Potion } from 'net.minecraft.world.item.alchemy';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { SoundGen } from 'dev.latvian.mods.kubejs.client.SoundsGenerator';
  import { VillagerProfession, VillagerType } from 'net.minecraft.world.entity.npc';
  import { Either } from 'com.mojang.datafixers.util';
  import { ImmutableSet } from 'com.google.common.collect';
  import { Item } from 'net.minecraft.world.item';

  interface BasicMobEffect extends MobEffect {}
  class BasicMobEffect extends MobEffect {
    readonly builder: MobEffectBuilder;
    constructor(builder: MobEffectBuilder);
    addAttributeModifier(attribute: Holder<Attribute>, id: ResourceLocation, d: number, operation: Operation): MobEffect;
    applyEffectTick(entity: LivingEntity, i: number): boolean;
    isInstantenous(): boolean;
    onEffectStarted(livingEntity: LivingEntity, amplifier: number): void;
    onMobRemoved(livingEntity: LivingEntity, amplifier: number, reason: RemovalReason): void;
    removeAttributeModifiers(attributeMap: AttributeMap): void;
    shouldApplyEffectTickThisTick(i: number, j: number): boolean;
  }


  interface BasicParticleType extends SimpleParticleType {}
  class BasicParticleType extends SimpleParticleType {
    constructor(bl: boolean);
  }


  interface ComplexParticleType extends ParticleType<ParticleOptions> {}
  class ComplexParticleType extends ParticleType<ParticleOptions> {
    readonly builder: ParticleTypeBuilder;
    constructor(builder: ParticleTypeBuilder);
    codec(): MapCodec<ParticleOptions>;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, ParticleOptions>;
  }


  interface CustomStatBuilder extends BuilderBase<ResourceLocation> {}
  class CustomStatBuilder extends BuilderBase<ResourceLocation> {
    constructor(i: ResourceLocation);
    createObject(): ResourceLocation;
  }


  interface MobEffectBuilder extends BuilderBase<MobEffect> {}
  class MobEffectBuilder extends BuilderBase<MobEffect> {
    category: MobEffectCategory;
    effectTick: EffectEntityCallback;
    attributeModifiers: Map;
    color: number;
    instant: boolean;
    constructor(i: ResourceLocation);
    beneficial(): MobEffectBuilder;
    category(c: MobEffectCategory): MobEffectBuilder;
    color(col: KubeColor): MobEffectBuilder;
    createObject(): MobEffect;
    effectTick(effectTick: EffectEntityCallback): MobEffectBuilder;
    get translationKeyGroup(): string;
    harmful(): MobEffectBuilder;
    instant(): MobEffectBuilder;
    instant(instant: boolean): MobEffectBuilder;
    modifyAttribute(attribute: ResourceLocation, id: ResourceLocation, amount: number, operation: Operation): MobEffectBuilder;
  }


  interface PaintingVariantBuilder extends BuilderBase<PaintingVariant> {}
  class PaintingVariantBuilder extends BuilderBase<PaintingVariant> {
    width: number;
    height: number;
    assetId: ResourceLocation;
    constructor(id: ResourceLocation);
    assetId(assetId: KubeResourceLocation): PaintingVariantBuilder;
    createObject(): PaintingVariant;
    size(width: number, height: number): PaintingVariantBuilder;
  }


  interface ParticleTypeBuilder extends BuilderBase<ParticleType> {}
  class ParticleTypeBuilder extends BuilderBase<ParticleType> {
    overrideLimiter: boolean;
    codec: MapCodec;
    streamCodec: StreamCodec;
    assetGen: Consumer;
    constructor(i: ResourceLocation);
    codec(c: MapCodec<ParticleOptions>): ParticleTypeBuilder;
    createObject(): ParticleType<any>;
    generateAssets(generator: KubeAssetGenerator): void;
    overrideLimiter(o: boolean): ParticleTypeBuilder;
    streamCodec(s: StreamCodec<RegistryFriendlyByteBuf, ParticleOptions>): ParticleTypeBuilder;
    texture(texture: string): ParticleTypeBuilder;
    textures(textures: string[]): ParticleTypeBuilder;
  }


  interface PoiTypeBuilder extends BuilderBase<PoiType> {}
  class PoiTypeBuilder extends BuilderBase<PoiType> {
    blockStates: Set;
    maxTickets: number;
    validRange: number;
    constructor(i: ResourceLocation);
    block(r: Block): PoiTypeBuilder;
    blocks(r: BlockState[]): PoiTypeBuilder;
    createObject(): PoiType;
    maxTickets(i: number): PoiTypeBuilder;
    validRange(i: number): PoiTypeBuilder;
  }


  interface PotionBuilder extends BuilderBase<Potion> {}
  class PotionBuilder extends BuilderBase<Potion> {
    mobEffects: List;
    constructor(i: ResourceLocation);
    addEffect(effect: MobEffectInstance): PotionBuilder;
    createObject(): Potion;
    effect(effect: Holder<MobEffect>): PotionBuilder;
    effect(effect: Holder<MobEffect>, duration: number): PotionBuilder;
    effect(effect: Holder<MobEffect>, duration: number, amplifier: number): PotionBuilder;
    effect(effect: Holder<MobEffect>, duration: number, amplifier: number, ambient: boolean, visible: boolean): PotionBuilder;
    effect(effect: Holder<MobEffect>, duration: number, amplifier: number, ambient: boolean, visible: boolean, showIcon: boolean): PotionBuilder;
    effect(effect: Holder<MobEffect>, duration: number, amplifier: number, ambient: boolean, visible: boolean, showIcon: boolean, hiddenEffect: MobEffectInstance): PotionBuilder;
  }


  interface SoundEventBuilder extends BuilderBase<SoundEvent> {}
  class SoundEventBuilder extends BuilderBase<SoundEvent> {
    assetGen: Consumer;
    constructor(i: ResourceLocation);
    createObject(): SoundEvent;
    generateAssets(generator: KubeAssetGenerator): void;
    sounds(gen: Consumer<SoundGen>): SoundEventBuilder;
  }


  interface VillagerProfessionBuilder extends BuilderBase<VillagerProfession> {}
  class VillagerProfessionBuilder extends BuilderBase<VillagerProfession> {
    poiType: Either;
    requestedItems: ImmutableSet;
    secondaryPoi: ImmutableSet;
    workSound: SoundEvent;
    constructor(i: ResourceLocation);
    createObject(): VillagerProfession;
    poiType(t: ResourceLocation): VillagerProfessionBuilder;
    poiTypeTag(t: ResourceLocation): VillagerProfessionBuilder;
    requestedItems(t: Item[]): VillagerProfessionBuilder;
    secondaryPoi(t: Block[]): VillagerProfessionBuilder;
    workSound(t: SoundEvent): VillagerProfessionBuilder;
  }


  interface VillagerTypeBuilder extends BuilderBase<VillagerType> {}
  class VillagerTypeBuilder extends BuilderBase<VillagerType> {
    constructor(i: ResourceLocation);
    createObject(): VillagerType;
  }

}

declare module 'dev.latvian.mods.kubejs.misc.MobEffectBuilder' {
  import { LivingEntity } from 'net.minecraft.world.entity';

  class EffectEntityCallback {
    applyEffectTick(var1: LivingEntity, var2: number): void;
  }

}

declare module 'dev.latvian.mods.kubejs.net' {
  import { Type } from 'CustomPacketPayload';
  import { RegisterPayloadHandlersEvent } from 'net.neoforged.neoforge.network.event';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { KubePlayerEvent } from 'dev.latvian.mods.kubejs.player';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CompoundTag } from 'net.minecraft.nbt';

  class KubeJSNet {
    static readonly WEB_SERVER_JSON_UPDATE: Type;
    static readonly WEB_SERVER_NBT_UPDATE: Type;
    static readonly SEND_DATA_FROM_CLIENT: Type;
    static readonly SEND_DATA_FROM_SERVER: Type;
    static readonly ADD_STAGE: Type;
    static readonly REMOVE_STAGE: Type;
    static readonly SYNC_STAGES: Type;
    static readonly FIRST_CLICK: Type;
    static readonly NOTIFICATION: Type;
    static readonly RELOAD_STARTUP_SCRIPTS: Type;
    static readonly DISPLAY_SERVER_ERRORS: Type;
    static readonly DISPLAY_CLIENT_ERRORS: Type;
    static readonly SYNC_SERVER_DATA: Type;
    static readonly SET_ACTIVE_POST_SHADER: Type;
    static register(event: RegisterPayloadHandlersEvent): void;
    static safeSendToPlayer(player: ServerPlayer, payload: CustomPacketPayload, ...payloads: CustomPacketPayload[]): void;
    static sendToAllPlayers(payload: CustomPacketPayload, ...payloads: CustomPacketPayload[]): void;
  }


  interface NetworkKubeEvent extends KubePlayerEvent {}
  class NetworkKubeEvent extends KubePlayerEvent {
    constructor(p: Player, c: string, d: CompoundTag);
    get channel(): string;
    get data(): CompoundTag;
    get entity(): Player;
  }

}

declare module 'dev.latvian.mods.kubejs.net.KubeJSNet' {
  import { Type } from 'CustomPacketPayload';

  class Kubedex {
    static readonly REQUEST_INVENTORY: Type;
    static readonly REQUEST_BLOCK: Type;
    static readonly REQUEST_ENTITY: Type;
  }

}

declare module 'dev.latvian.mods.kubejs.player' {
  import { Player } from 'net.minecraft.world.entity.player';
  import { AbstractContainerMenu, ContainerListener } from 'net.minecraft.world.inventory';
  import { Container } from 'net.minecraft.world';
  import { LevelBlock } from 'dev.latvian.mods.kubejs.level';
  import { ArrayList, List } from 'java.util';
  import { Entity, EntityType } from 'net.minecraft.world.entity';
  import { MessageSenderKJS, DataSenderKJS } from 'dev.latvian.mods.kubejs.core';
  import { Predicate } from 'java.util.function';
  import { Iterable } from 'java.lang';
  import { Level } from 'net.minecraft.world.level';
  import { Component } from 'net.minecraft.network.chat';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { EntitySelector } from 'net.minecraft.commands.arguments.selector';
  import { BlockPos } from 'net.minecraft.core';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { OnDatapackSyncEvent, ServerChatEvent } from 'net.neoforged.neoforge.event';
  import { PlayerLoggedInEvent, Clone, PlayerRespawnEvent, PlayerLoggedOutEvent, PlayerChangedDimensionEvent } from 'PlayerEvent';
  import { Post } from 'PlayerTickEvent';
  import { AdvancementEarnEvent } from 'AdvancementEvent';
  import { Open, Close } from 'PlayerContainerEvent';
  import { KubeLivingEntityEvent } from 'dev.latvian.mods.kubejs.entity';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { AdvancementNode } from 'net.minecraft.advancements';
  import { StatsCounter, Stat } from 'net.minecraft.stats';
  import { Block } from 'net.minecraft.world.level.block';
  import { Stages } from 'dev.latvian.mods.kubejs.stages';

  interface ChestKubeEvent extends InventoryKubeEvent {}
  class ChestKubeEvent extends InventoryKubeEvent {
    constructor(player: Player, menu: AbstractContainerMenu);
    get block(): LevelBlock;
    get inventory(): Container;
  }


  interface EntityArrayList extends MessageSenderKJS, DataSenderKJS, ArrayList<Entity> {}
  class EntityArrayList extends MessageSenderKJS {
    static readonly ALWAYS_TRUE_PREDICATE: Predicate;
    constructor(size: number);

    constructor(entities: Iterable<Entity>);

    constructor(level: Level, entities: Iterable<Entity>);
    addAllIterable(entities: Iterable<Entity>): void;
    filter(filterList: Predicate<Entity>[]): EntityArrayList;
    filterDistance(x: number, y: number, z: number, distance: number): EntityArrayList;
    filterDistance(pos: BlockPos, distance: number): EntityArrayList;
    filterItems(): EntityArrayList;
    filterPlayers(): EntityArrayList;
    filterSelector(selector: EntitySelector): EntityArrayList;
    filterType(type: EntityType<any>): EntityArrayList;
    get first(): Entity;
    kill(): void;
    kjs$getDisplayName(): Component;
    kjs$getName(): Component;
    kjs$runCommand(command: string): void;
    kjs$runCommandSilent(command: string): void;
    kjs$sendData(channel: string, data: CompoundTag): void;
    kjs$sendData(channel: string): void;
    kjs$setActivePostShader(id: ResourceLocation): void;
    kjs$setStatusMessage(message: Component): void;
    kjs$tell(message: Component): void;
    oneFilter(filter: Predicate<Entity>): EntityArrayList;
    playSound(id: SoundEvent, volume: number, pitch: number): void;
    playSound(id: SoundEvent): void;
  }


  interface InventoryChangedKubeEvent extends KubePlayerEvent {}
  class InventoryChangedKubeEvent extends KubePlayerEvent {
    constructor(p: Player, is: ItemStack, s: number);
    get entity(): Player;
    get item(): ItemStack;
    get slot(): number;
  }


  interface InventoryKubeEvent extends KubePlayerEvent {}
  class InventoryKubeEvent extends KubePlayerEvent {
    constructor(player: Player, menu: AbstractContainerMenu);
    get entity(): Player;
    get inventoryContainer(): AbstractContainerMenu;
  }


  interface KubeJSInventoryListener extends ContainerListener {}
  class KubeJSInventoryListener extends ContainerListener {
    readonly player: Player;
    constructor(p: Player);
    dataChanged(container: AbstractContainerMenu, id: number, value: number): void;
    slotChanged(container: AbstractContainerMenu, index: number, stack: ItemStack): void;
  }


  class KubeJSPlayerEventHandler {
    static advancement(event: AdvancementEarnEvent): void;
    static chatDecorate(event: ServerChatEvent): void;
    static chatReceived(event: ServerChatEvent): void;
    static cloned(event: Clone): void;
    static datapackSync(event: OnDatapackSyncEvent): void;
    static dimensionChanged(event: PlayerChangedDimensionEvent): void;
    static inventoryClosed(event: Close): void;
    static inventoryOpened(event: Open): void;
    static loggedIn(event: PlayerLoggedInEvent): void;
    static loggedOut(event: PlayerLoggedOutEvent): void;
    static respawn(event: PlayerRespawnEvent): void;
    static tick(event: Post): void;
  }


  interface KubePlayerEvent extends KubeLivingEntityEvent {}
  class KubePlayerEvent extends KubeLivingEntityEvent {
    get entity(): Player;
    get player(): Player;
  }


  interface PlayerAdvancementKubeEvent extends KubePlayerEvent {}
  class PlayerAdvancementKubeEvent extends KubePlayerEvent {
    constructor(player: ServerPlayer, advancementNode: AdvancementNode);
    get advancement(): AdvancementNode;
    get entity(): ServerPlayer;
  }


  interface PlayerChatReceivedKubeEvent extends KubePlayerEvent {}
  class PlayerChatReceivedKubeEvent extends KubePlayerEvent {
    constructor(event: ServerChatEvent);
    get component(): Component;
    get entity(): ServerPlayer;
    get message(): string;
    get username(): string;
    set component(component: Component);
  }


  interface PlayerClonedKubeEvent extends KubePlayerEvent {}
  class PlayerClonedKubeEvent extends KubePlayerEvent {
    constructor(player: ServerPlayer, oldPlayer: ServerPlayer, keepData: boolean);
    get entity(): ServerPlayer;
    get keepData(): boolean;
    get oldPlayer(): ServerPlayer;
  }


  interface PlayerRespawnedKubeEvent extends KubePlayerEvent {}
  class PlayerRespawnedKubeEvent extends KubePlayerEvent {
    constructor(player: ServerPlayer, endConquered: boolean);
    get entity(): ServerPlayer;
    isEndConquered(): boolean;
  }


  class PlayerStatsJS {
    readonly player: Player;
    constructor(p: Player, s: StatsCounter);
    add(stat: Stat<any>, value: number): void;
    get(stat: Stat<any>): number;
    get(rl: ResourceLocation): number;
    get animalsBred(): number;
    get crouchDistance(): number;
    get damageAbsorbed(): number;
    get damageBlocked_by_shield(): number;
    get damageDealt(): number;
    get damageDealt_absorbed(): number;
    get damageDealt_resisted(): number;
    get damageResisted(): number;
    get damageTaken(): number;
    get deaths(): number;
    get fishCaught(): number;
    get jumps(): number;
    get mobKills(): number;
    get playTime(): number;
    get playerKills(): number;
    get sprintDistance(): number;
    get swimDistance(): number;
    get timeCrouchTime(): number;
    get timeSinceDeath(): number;
    get timeSinceRest(): number;
    get walkDistance(): number;
    getBlocksMined(block: Block): number;
    getItemsBroken(item: Item): number;
    getItemsCrafted(item: Item): number;
    getItemsDropped(item: Item): number;
    getItemsPickedUp(item: Item): number;
    getItemsUsed(item: Item): number;
    getKilled(entity: EntityType<any>): number;
    getKilledBy(entity: EntityType<any>): number;
    set(stat: Stat<any>, value: number): void;
    static wrapStat(o: any): Stat<any>;
  }


  interface SimplePlayerKubeEvent extends KubePlayerEvent {}
  class SimplePlayerKubeEvent extends KubePlayerEvent {
    constructor(p: Player);
    get entity(): Player;
  }


  interface StageChangedEvent extends KubePlayerEvent {}
  class StageChangedEvent extends KubePlayerEvent {
    constructor(player: Player, stages: Stages, stage: string);
    get entity(): Player;
    get player(): Player;
    get playerStages(): Stages;
    get stage(): string;
  }

}

declare module 'dev.latvian.mods.kubejs.plugin.builtin' {
  import { KubeJSPlugin } from 'dev.latvian.mods.kubejs.plugin';
  import { EventGroupRegistry } from 'dev.latvian.mods.kubejs.event';
  import { BindingRegistry, ScriptManager, TypeWrapperRegistry, RecordDefaultsRegistry, TypeDescriptionRegistry, DataComponentTypeInfoRegistry } from 'dev.latvian.mods.kubejs.script';
  import { LocalWebServerAPIRegistry, LocalWebServerRegistry, LocalWebServer } from 'dev.latvian.mods.kubejs.web';
  import { LangKubeEvent } from 'dev.latvian.mods.kubejs.client';
  import { HashMap } from 'java.util';
  import { BuilderTypeRegistry, ServerRegistryRegistry } from 'dev.latvian.mods.kubejs.registry';
  import { RecipeFactoryRegistry } from 'dev.latvian.mods.kubejs.recipe.schema';
  import { RecipeComponentTypeRegistry } from 'dev.latvian.mods.kubejs.recipe.component';
  import { RecipeSchemaFunctionRegistry } from 'dev.latvian.mods.kubejs.recipe.schema.function';
  import { RecipePostProcessorTypeRegistry } from 'dev.latvian.mods.kubejs.recipe.schema.postprocessing';
  import { BlockEntityAttachmentRegistry } from 'dev.latvian.mods.kubejs.block.entity';
  import { IngredientActionTypeRegistry } from 'dev.latvian.mods.kubejs.recipe.ingredientaction';
  import { Registry } from 'dev.latvian.mods.kubejs.util.NameProvider';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { KubeIconTypeRegistry } from 'dev.latvian.mods.kubejs.client.icon';
  import { KubeDataGenerator } from 'dev.latvian.mods.kubejs.generator';

  interface BuiltinKubeJSClientPlugin extends KubeJSPlugin {}
  class BuiltinKubeJSClientPlugin extends KubeJSPlugin {
    afterScriptsLoaded(manager: ScriptManager): void;
    generateLang(event: LangKubeEvent): void;
    registerBindings(bindings: BindingRegistry): void;
    registerEvents(registry: EventGroupRegistry): void;
    registerLocalWebServer(registry: LocalWebServerRegistry): void;
    registerLocalWebServerAPIs(registry: LocalWebServerAPIRegistry): void;
    registerLocalWebServerWithAuth(registry: LocalWebServerRegistry): void;
  }


  interface BuiltinKubeJSPlugin extends KubeJSPlugin {}
  class BuiltinKubeJSPlugin extends KubeJSPlugin {
    static readonly GLOBAL: HashMap;
    clearCaches(): void;
    generateData(generator: KubeDataGenerator): void;
    localWebServerStarted(server: LocalWebServer): void;
    registerBindings(bindings: BindingRegistry): void;
    registerBlockEntityAttachments(registry: BlockEntityAttachmentRegistry): void;
    registerBuilderTypes(registry: BuilderTypeRegistry): void;
    registerDataComponentTypeDescriptions(registry: DataComponentTypeInfoRegistry): void;
    registerEvents(registry: EventGroupRegistry): void;
    registerIconTypes(registry: KubeIconTypeRegistry): void;
    registerIngredientActionTypes(registry: IngredientActionTypeRegistry): void;
    registerItemNameProviders(registry: Registry<Item, ItemStack>): void;
    registerLocalWebServer(registry: LocalWebServerRegistry): void;
    registerLocalWebServerWithAuth(registry: LocalWebServerRegistry): void;
    registerRecipeComponents(registry: RecipeComponentTypeRegistry): void;
    registerRecipeFactories(registry: RecipeFactoryRegistry): void;
    registerRecipePostProcessors(registry: RecipePostProcessorTypeRegistry): void;
    registerRecipeSchemaFunctionTypes(registry: RecipeSchemaFunctionRegistry): void;
    registerRecordDefaults(registry: RecordDefaultsRegistry): void;
    registerServerRegistries(registry: ServerRegistryRegistry): void;
    registerTypeDescriptions(registry: TypeDescriptionRegistry): void;
    registerTypeWrappers(registry: TypeWrapperRegistry): void;
  }

}

declare module 'dev.latvian.mods.kubejs.plugin.builtin.event' {
  import { EventGroup, EventTargetType, EventHandler, TargetedEventHandler } from 'dev.latvian.mods.kubejs.event';

  class BlockEvents {
    static readonly GROUP: EventGroup;
    static readonly TARGET: EventTargetType;
    static readonly MODIFICATION: EventHandler;
    static readonly RIGHT_CLICKED: TargetedEventHandler;
    static readonly LEFT_CLICKED: TargetedEventHandler;
    static readonly PLACED: TargetedEventHandler;
    static readonly BROKEN: TargetedEventHandler;
    static readonly DROPS: TargetedEventHandler;
    static readonly DETECTOR_CHANGED: TargetedEventHandler;
    static readonly DETECTOR_POWERED: TargetedEventHandler;
    static readonly DETECTOR_UNPOWERED: TargetedEventHandler;
    static readonly FARMLAND_TRAMPLED: TargetedEventHandler;
    static readonly RANDOM_TICK: TargetedEventHandler;
    static readonly BLOCK_ENTITY_TICK: TargetedEventHandler;
    static readonly STARTED_FALLING: TargetedEventHandler;
    static readonly STOPPED_FALLING: TargetedEventHandler;
    static readonly PICKED: TargetedEventHandler;
  }


  class ClientEvents {
    static readonly GROUP: EventGroup;
    static readonly GENERATE_ASSETS: TargetedEventHandler;
    static readonly BLOCK_ENTITY_RENDERER_REGISTRY: EventHandler;
    static readonly ENTITY_RENDERER_REGISTRY: EventHandler;
    static readonly MENU_SCREEN_REGISTRY: EventHandler;
    static readonly LOGGED_IN: EventHandler;
    static readonly LOGGED_OUT: EventHandler;
    static readonly TICK: EventHandler;
    static readonly DEBUG_LEFT: EventHandler;
    static readonly DEBUG_RIGHT: EventHandler;
    static readonly ATLAS_SPRITE_REGISTRY: TargetedEventHandler;
    static readonly LANG: TargetedEventHandler;
    static readonly PARTICLE_PROVIDER_REGISTRY: EventHandler;
    static readonly HIGHLIGHT: EventHandler;
  }


  class EntityEvents {
    static readonly GROUP: EventGroup;
    static readonly TARGET: EventTargetType;
    static readonly DEATH: TargetedEventHandler;
    static readonly BEFORE_HURT: TargetedEventHandler;
    static readonly AFTER_HURT: TargetedEventHandler;
    static readonly CHECK_SPAWN: TargetedEventHandler;
    static readonly SPAWNED: TargetedEventHandler;
    static readonly ENTITY_DROPS: TargetedEventHandler;
  }


  class ItemEvents {
    static readonly GROUP: EventGroup;
    static readonly TARGET: EventTargetType;
    static readonly MODIFICATION: EventHandler;
    static readonly TOOL_TIER_REGISTRY: EventHandler;
    static readonly RIGHT_CLICKED: TargetedEventHandler;
    static readonly CAN_PICK_UP: TargetedEventHandler;
    static readonly PICKED_UP: TargetedEventHandler;
    static readonly DROPPED: TargetedEventHandler;
    static readonly ENTITY_INTERACTED: TargetedEventHandler;
    static readonly CRAFTED: TargetedEventHandler;
    static readonly SMELTED: TargetedEventHandler;
    static readonly FOOD_EATEN: TargetedEventHandler;
    static readonly MODIFY_TOOLTIPS: EventHandler;
    static readonly DYNAMIC_TOOLTIPS: TargetedEventHandler;
    static readonly MODEL_PROPERTIES: EventHandler;
    static readonly FIRST_RIGHT_CLICKED: TargetedEventHandler;
    static readonly FIRST_LEFT_CLICKED: TargetedEventHandler;
    static readonly ITEM_DESTROYED: TargetedEventHandler;
  }


  class KeyBindEvents {
    static readonly GROUP: EventGroup;
    static readonly REGISTRY: EventHandler;
    static readonly PRESSED: TargetedEventHandler;
    static readonly RELEASED: TargetedEventHandler;
    static readonly TICK: TargetedEventHandler;
  }


  class LevelEvents {
    static readonly GROUP: EventGroup;
    static readonly TARGET: EventTargetType;
    static readonly LOADED: TargetedEventHandler;
    static readonly SAVED: TargetedEventHandler;
    static readonly UNLOADED: TargetedEventHandler;
    static readonly TICK: TargetedEventHandler;
    static readonly BEFORE_EXPLOSION: TargetedEventHandler;
    static readonly AFTER_EXPLOSION: TargetedEventHandler;
  }


  class NetworkEvents {
    static readonly GROUP: EventGroup;
    static readonly DATA_RECEIVED: TargetedEventHandler;
  }


  class PlayerEvents {
    static readonly MENU_TARGET: EventTargetType;
    static readonly GROUP: EventGroup;
    static readonly LOGGED_IN: EventHandler;
    static readonly LOGGED_OUT: EventHandler;
    static readonly CLONED: EventHandler;
    static readonly RESPAWNED: EventHandler;
    static readonly TICK: EventHandler;
    static readonly DECORATE_CHAT: EventHandler;
    static readonly CHAT: EventHandler;
    static readonly ADVANCEMENT: TargetedEventHandler;
    static readonly INVENTORY_OPENED: TargetedEventHandler;
    static readonly INVENTORY_CLOSED: TargetedEventHandler;
    static readonly INVENTORY_CHANGED: TargetedEventHandler;
    static readonly CHEST_OPENED: TargetedEventHandler;
    static readonly CHEST_CLOSED: TargetedEventHandler;
    static readonly STAGE_ADDED: TargetedEventHandler;
    static readonly STAGE_REMOVED: TargetedEventHandler;
  }


  class RecipeViewerEvents {
    static readonly GROUP: EventGroup;
    static readonly TARGET: EventTargetType;
    static readonly ADD_ENTRIES: TargetedEventHandler;
    static readonly REMOVE_ENTRIES: TargetedEventHandler;
    static readonly REMOVE_ENTRIES_COMPLETELY: TargetedEventHandler;
    static readonly GROUP_ENTRIES: TargetedEventHandler;
    static readonly ADD_INFORMATION: TargetedEventHandler;
    static readonly REGISTER_SUBTYPES: TargetedEventHandler;
    static readonly REMOVE_CATEGORIES: EventHandler;
    static readonly REMOVE_RECIPES: EventHandler;
  }


  class ServerEvents {
    static readonly GROUP: EventGroup;
    static readonly REGISTRY: TargetedEventHandler;
    static readonly GENERATE_DATA: TargetedEventHandler;
    static readonly LOADED: EventHandler;
    static readonly UNLOADED: EventHandler;
    static readonly TICK: EventHandler;
    static readonly TAGS: TargetedEventHandler;
    static readonly COMMAND_REGISTRY: EventHandler;
    static readonly COMMAND: TargetedEventHandler;
    static readonly BASIC_COMMAND: TargetedEventHandler;
    static readonly BASIC_PUBLIC_COMMAND: TargetedEventHandler;
    static readonly RECIPE_MAPPING_REGISTRY: EventHandler;
    static readonly RECIPE_SCHEMA_REGISTRY: EventHandler;
    static readonly RECIPES: EventHandler;
    static readonly RECIPES_AFTER_LOADED: EventHandler;
    static readonly SPECIAL_RECIPES: EventHandler;
    static readonly COMPOSTABLE_RECIPES: EventHandler;
    static readonly MODIFY_RECIPE_RESULT: TargetedEventHandler;
    static readonly MODIFY_RECIPE_INGREDIENT: TargetedEventHandler;
  }


  class StartupEvents {
    static readonly GROUP: EventGroup;
    static readonly INIT: EventHandler;
    static readonly POST_INIT: EventHandler;
    static readonly REGISTRY: TargetedEventHandler;
    static readonly MODIFY_CREATIVE_TAB: TargetedEventHandler;
  }

}

declare module 'dev.latvian.mods.kubejs.plugin.builtin.wrapper' {
  import { AABB, Vec3 } from 'net.minecraft.world.phys';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { TypeInfo } from 'dev.latvian.mods.rhino.type';
  import { BlockIDPredicate, BlockEntityPredicate, BlockPredicate } from 'dev.latvian.mods.kubejs.block.predicate';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Map, List, Collection, EnumSet, Set, Random, UUID } from 'java.util';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { RegistryAccessContainer, KubeResourceLocation, Lazy, OrderedCompoundTag, CountingMap } from 'dev.latvian.mods.kubejs.util';
  import { BlockSetType } from 'net.minecraft.world.level.block.state.properties';
  import { Context, BaseFunction } from 'dev.latvian.mods.rhino';
  import { RegistryKubeEvent } from 'dev.latvian.mods.kubejs.registry';
  import { KubeColor } from 'dev.latvian.mods.kubejs.color';
  import { TextColor, Style, Component, MutableComponent, ClickEvent } from 'net.minecraft.network.chat';
  import { ColorRGBA, RandomSource } from 'net.minecraft.util';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { EntitySelector } from 'net.minecraft.commands.arguments.selector';
  import { KubeJSContext, ConsoleJS } from 'dev.latvian.mods.kubejs.script';
  import { Class, Iterable, Void, Runnable, StringBuilder } from 'java.lang';
  import { Vector3d, Vector3f, Vector4f, Matrix3f, Matrix4f, Quaternionf } from 'org.joml';
  import { IntProvider, FloatProvider } from 'net.minecraft.util.valueproviders';
  import { NumberProvider } from 'net.minecraft.world.level.storage.loot.providers.number';
  import { Path } from 'java.nio.file';
  import { File } from 'java.io';
  import { Consumer, Function, Supplier } from 'java.util.function';
  import { Event, EventPriority } from 'net.neoforged.bus.api';
  import { Tag, CompoundTag, CollectionTag, ListTag } from 'net.minecraft.nbt';
  import { JsonElement } from 'com.google.gson';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { DustParticleOptions, ParticleOptions } from 'net.minecraft.core.particles';
  import { SizedIngredient } from 'net.neoforged.neoforge.common.crafting';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { TagKey } from 'net.minecraft.tags';
  import { Item, CreativeModeTab } from 'net.minecraft.world.item';
  import { DataResult } from 'com.mojang.serialization';
  import { StringReader } from 'com.mojang.brigadier';
  import { Pattern } from 'java.util.regex';
  import { ItemLore } from 'net.minecraft.world.item.component';
  import { Stat } from 'net.minecraft.stats';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { Duration } from 'java.time';
  import { CompletableFuture } from 'java.util.concurrent';

  class AABBWrapper {
    static readonly EMPTY: AABB;
    static readonly CUBE: AABB;
    static of(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number): AABB;
    static ofBlock(pos: BlockPos): AABB;
    static ofBlocks(pos1: BlockPos, pos2: BlockPos): AABB;
    static ofSize(x: number, y: number, z: number): AABB;
    static ofSize(vec3: Vec3, x: number, y: number, z: number): AABB;
    static wrap(o: any): AABB;
  }


  class BlockWrapper {
    static readonly TYPE_INFO: TypeInfo;
    static readonly STATE_TYPE_INFO: TypeInfo;
    static custom(predicate: BlockPredicate): BlockPredicate;
    static entity(id: ResourceLocation): BlockEntityPredicate;
    static get allBlockStates(): Collection<BlockState>;
    static get facing(): Map<string, Direction>;
    static get typeList(): string[];
    static getBlock(id: ResourceLocation): Block;
    static getId(block: Block): ResourceLocation;
    static getTaggedIds(tag: ResourceLocation): ResourceLocation[];
    static id(id: ResourceLocation): BlockIDPredicate;
    static id(id: ResourceLocation, properties: Map<string, any>): BlockIDPredicate;
    static parseBlockState(registries: RegistryAccessContainer, string: string): BlockState;
    static registerBuildingMaterial(cx: Context, event: RegistryKubeEvent<Block>, id: KubeResourceLocation, properties: BuildingMaterialProperties): void;
    static registerBuildingMaterial(cx: Context, event: RegistryKubeEvent<Block>, id: KubeResourceLocation): void;
    static withProperties(state: BlockState, properties: Map<any, any>): BlockState;
    static wrapBlockState(registries: RegistryAccessContainer, o: any): BlockState;
    static wrapSetType(cx: Context, from: any, target: TypeInfo): BlockSetType;
  }


  class ColorWrapper {
    static readonly MAP: Map;
    static readonly TEXT: Map;
    static readonly DYE: Map;
    static readonly NONE: KubeColor;
    static readonly BLACK: KubeColor;
    static readonly DARK_BLUE: KubeColor;
    static readonly DARK_GREEN: KubeColor;
    static readonly DARK_AQUA: KubeColor;
    static readonly DARK_RED: KubeColor;
    static readonly DARK_PURPLE: KubeColor;
    static readonly GOLD: KubeColor;
    static readonly GRAY: KubeColor;
    static readonly DARK_GRAY: KubeColor;
    static readonly BLUE: KubeColor;
    static readonly GREEN: KubeColor;
    static readonly AQUA: KubeColor;
    static readonly RED: KubeColor;
    static readonly LIGHT_PURPLE: KubeColor;
    static readonly YELLOW: KubeColor;
    static readonly WHITE: KubeColor;
    static readonly WHITE_DYE: KubeColor;
    static readonly ORANGE_DYE: KubeColor;
    static readonly MAGENTA_DYE: KubeColor;
    static readonly LIGHT_BLUE_DYE: KubeColor;
    static readonly YELLOW_DYE: KubeColor;
    static readonly LIME_DYE: KubeColor;
    static readonly PINK_DYE: KubeColor;
    static readonly GRAY_DYE: KubeColor;
    static readonly LIGHT_GRAY_DYE: KubeColor;
    static readonly CYAN_DYE: KubeColor;
    static readonly PURPLE_DYE: KubeColor;
    static readonly BLUE_DYE: KubeColor;
    static readonly BROWN_DYE: KubeColor;
    static readonly GREEN_DYE: KubeColor;
    static readonly RED_DYE: KubeColor;
    static readonly BLACK_DYE: KubeColor;
    static createMapped(o: any, ...names: string[]): KubeColor;
    static rgba(r: number, g: number, b: number, a: number): KubeColor;
    static wrap(o: any): KubeColor;
    static wrapColorRGBA(o: any): ColorRGBA;
    static wrapTextColor(o: any): TextColor;
  }


  class DamageSourceWrapper {
    static wrap(registries: RegistryAccessContainer, from: any): DamageSource;
  }


  class DirectionWrapper {
    static readonly down: Direction;
    static readonly up: Direction;
    static readonly north: Direction;
    static readonly south: Direction;
    static readonly west: Direction;
    static readonly east: Direction;
    static readonly DOWN: Direction;
    static readonly UP: Direction;
    static readonly NORTH: Direction;
    static readonly SOUTH: Direction;
    static readonly WEST: Direction;
    static readonly EAST: Direction;
    static readonly VALUES: Direction[];
    static readonly NONE: Direction[];
    static readonly ALL: Map;
    static readonly ALL_SET: EnumSet;
    static readonly EMPTY_SET: EnumSet;
  }


  class EntitySelectorWrapper {
    static of(selector: EntitySelector): EntitySelector;
    static wrap(cx: Context, o: any): EntitySelector;
  }


  class GLFWInputWrapper {
    static readonly MAP: Lazy;
    static get(name: string): number;
  }


  class JavaWrapper {
    static cast<T>(cx: Context, targetClass: Class<T>, object: any): T;
    static createConsole(cx: KubeJSContext, name: string): ConsoleJS;
    static loadClass(cx: KubeJSContext, className: string): any;
    static makeFunctionProxy<T>(cx: Context, targetClass: TypeInfo, functionParameter: BaseFunction): T;
    static mergeRecord<R extends Record>(cx: Context, original: R, merge: Map<string, any>): R;
    static tryLoadClass(cx: KubeJSContext, className: string): any;
    static tryLoadClass(className: string): Class<any>;
  }


  class KMath {
    static readonly E: number;
    static readonly PI: number;
    static readonly DEGREES_TO_RADIANS: number;
    static readonly RADIANS_TO_DEGREES: number;
    static approach(current: number, target: number, speed: number): number;
    static approachDegrees(current: number, target: number, speed: number): number;
    static block(x: number, y: number, z: number): BlockPos;
    static ceil(value: number): number;
    static clamp(value: number, min: number, max: number): number;
    static clampedLerp(value: number, min: number, max: number): number;
    static deg(value: number): number;
    static degreesDifference(current: number, target: number): number;
    static floor(value: number): number;
    static isPowerOfTwo(value: number): boolean;
    static lerp(value: number, min: number, max: number): number;
    static m3f(): Matrix3f;
    static m4f(): Matrix4f;
    static map(value: number, min0: number, max0: number, min1: number, max1: number): number;
    static quaternion(x: number, y: number, z: number, w: number): Quaternionf;
    static rad(value: number): number;
    static rotateIfNecessary(current: number, target: number, max: number): number;
    static v3(x: number, y: number, z: number): Vec3;
    static v3d(x: number, y: number, z: number): Vector3d;
    static v3f(x: number, y: number, z: number): Vector3f;
    static v4f(x: number, y: number, z: number, w: number): Vector4f;
    static wrapDegrees(d: number): number;
  }


  class MiscWrappers {
    static wrapBlockPos(o: any): BlockPos;
    static wrapFile(o: any): File;
    static wrapFloatProvider(cx: Context, o: any): FloatProvider;
    static wrapIntProvider(cx: Context, o: any): IntProvider;
    static wrapNumberProvider(o: any): NumberProvider;
    static wrapPath(o: any): Path;
    static wrapVec3(o: any): Vec3;
  }


  class NativeEventWrapper {
    static onEvent(cx: Context, eventClass: Class<any>, consumer: Consumer<Event>): void;
    static onEvent(cx: Context, priority: EventPriority, eventClass: Class<any>, consumer: Consumer<Event>): void;
  }


  class NBTWrapper {
    static b(v: number): Tag;
    static ba(v: number[]): Tag;
    static byteArrayTag(v: number[]): Tag;
    static byteTag(v: number): Tag;
    static compoundTag(): Tag;
    static compoundTag(cx: Context, map: Map<any, any>): Tag;
    static d(v: number): Tag;
    static doubleTag(v: number): Tag;
    static f(v: number): Tag;
    static floatTag(v: number): Tag;
    static fromTag(t: Tag): any;
    static i(v: number): Tag;
    static ia(v: number[]): Tag;
    static intArrayTag(v: number[]): Tag;
    static intTag(v: number): Tag;
    static isTagCollection(o: any): boolean;
    static isTagCompound(o: any): boolean;
    static l(v: number): Tag;
    static la(v: number[]): Tag;
    static listTag(): Tag;
    static listTag(cx: Context, list: any[]): Tag;
    static longArrayTag(v: number[]): Tag;
    static longTag(v: number): Tag;
    static read(buf: FriendlyByteBuf): OrderedCompoundTag;
    static s(v: number): Tag;
    static shortTag(v: number): Tag;
    static stringTag(v: string): Tag;
    static toJson(t: Tag): JsonElement;
    static toTag(tag: Tag): Tag;
    static wrap(cx: Context, v: any): Tag;
    static wrapCollection(cx: Context, v: any): CollectionTag<any>;
    static wrapCompound(cx: Context, v: any): CompoundTag;
    static wrapListTag(cx: Context, list: any): ListTag;
  }


  class ParticleOptionsWrapper {
    static readonly ERROR: DustParticleOptions;
    static create(options: ParticleOptions): ParticleOptions;
    static wrap(registries: RegistryAccessContainer, o: any): ParticleOptions;
  }


  class SizedIngredientWrapper {
    static readonly TYPE_INFO: TypeInfo;
    static readonly empty: SizedIngredient;
    static readonly all: SizedIngredient;
    static of(ingredient: SizedIngredient): SizedIngredient;
    static of(ingredient: Ingredient, count: number): SizedIngredient;
    static ofTag(tag: TagKey<Item>, count: number): SizedIngredient;
    static read(cx: Context, reader: StringReader): DataResult<SizedIngredient>;
    static wrap(cx: Context, from: any): SizedIngredient;
    static wrapResult(cx: Context, from: any): DataResult<SizedIngredient>;
  }


  class StringUtilsWrapper {
    static readonly SNAKE_CASE_SPLIT: Pattern;
    static readonly ALWAYS_LOWER_CASE: Set;
    static readonly EMPTY_STRING_ARRAY: string[];
    static getUniqueId(json: JsonElement): string;
    static getUniqueId<T>(input: T, toJson: Function<T, JsonElement>): string;
    static parseDouble(object: any, def: number): number;
    static parseInt(object: any, def: number): number;
    static parseLong(object: any, def: number): number;
    static snakeCaseToCamelCase(string: string): string;
    static snakeCaseToTitleCase(string: string): string;
    static stripEventName(s: string): string;
    static stripIdForEvent(id: ResourceLocation): string;
    static toTitleCase(s: string): string;
    static toTitleCase(s: string, ignoreSpecial: boolean): string;
  }


  class TextIcons {
    static readonly FONT: ResourceLocation;
    static readonly STYLE: Style;
    static readonly NAME: Component;
    static readonly ALL_ICONS: string;
    static blockTagIcon(): MutableComponent;
    static camera(): MutableComponent;
    static copy(): MutableComponent;
    static crafting(): MutableComponent;
    static entityTypeTag(): MutableComponent;
    static error(): MutableComponent;
    static fire(): MutableComponent;
    static fluidTag(): MutableComponent;
    static icon(character: MutableComponent): MutableComponent;
    static icons(characters: string): MutableComponent;
    static id(): MutableComponent;
    static info(): MutableComponent;
    static itemTag(): MutableComponent;
    static logo(): MutableComponent;
    static minus(): MutableComponent;
    static no(): MutableComponent;
    static patchedComponent(): MutableComponent;
    static plus(): MutableComponent;
    static prototypeComponent(): MutableComponent;
    static smallSpace(): MutableComponent;
    static tag(): MutableComponent;
    static tilde(): MutableComponent;
    static vscode(): MutableComponent;
    static warn(): MutableComponent;
    static yes(): MutableComponent;
    static yes(yes: boolean): MutableComponent;
  }


  class TextWrapper {
    static readonly TYPE_INFO: TypeInfo;
    static aqua(text: MutableComponent): MutableComponent;
    static black(text: MutableComponent): MutableComponent;
    static blue(text: MutableComponent): MutableComponent;
    static clickEventOf(event: ClickEvent): ClickEvent;
    static darkAqua(text: MutableComponent): MutableComponent;
    static darkBlue(text: MutableComponent): MutableComponent;
    static darkGray(text: MutableComponent): MutableComponent;
    static darkGreen(text: MutableComponent): MutableComponent;
    static darkPurple(text: MutableComponent): MutableComponent;
    static darkRed(text: MutableComponent): MutableComponent;
    static empty(): MutableComponent;
    static gold(text: MutableComponent): MutableComponent;
    static gray(text: MutableComponent): MutableComponent;
    static green(text: MutableComponent): MutableComponent;
    static info(text: Component): MutableComponent;
    static isEmpty(component: Component): boolean;
    static join(separator: MutableComponent, texts: Iterable<Component>): MutableComponent;
    static join(...texts: Component[]): MutableComponent;
    static keybind(keybind: string): MutableComponent;
    static lightPurple(text: MutableComponent): MutableComponent;
    static literal(text: string): MutableComponent;
    static lore(lore: Component[]): ItemLore;
    static of(component: MutableComponent): MutableComponent;
    static ofString(s: string): MutableComponent;
    static ofTag(tag: Tag): Component;
    static prettyPrintNbt(tag: Tag): Component;
    static red(text: MutableComponent): MutableComponent;
    static score(selector: string, objective: string): MutableComponent;
    static selector(selector: string): MutableComponent;
    static selector(selector: string, separator: Component): MutableComponent;
    static string(text: string): MutableComponent;
    static translatable(key: string): MutableComponent;
    static translatable(key: string, ...objects: any[]): MutableComponent;
    static translatableWithFallback(key: string, fallback: string): MutableComponent;
    static translatableWithFallback(key: string, fallback: string, ...objects: any[]): MutableComponent;
    static translate(key: string): MutableComponent;
    static translate(key: string, ...objects: any[]): MutableComponent;
    static translateWithFallback(key: string, fallback: string): MutableComponent;
    static translateWithFallback(key: string, fallback: string, ...objects: any[]): MutableComponent;
    static warn(text: Component): MutableComponent;
    static white(text: MutableComponent): MutableComponent;
    static wrap(cx: Context, o: any): MutableComponent;
    static wrapClickEvent(cx: Context, o: any): ClickEvent;
    static yellow(text: MutableComponent): MutableComponent;
  }


  class UtilsWrapper {
    static emptyList<T>(): T[];
    static emptyMap<K, V>(): Map<K, V>;
    static expiringLazy<T>(supplier: Supplier<T>, expires: Duration): Lazy<T>;
    static findCreativeTab(id: ResourceLocation): CreativeModeTab;
    static getRandom(): RandomSource;
    static getSound(id: ResourceLocation): SoundEvent;
    static getStat(id: ResourceLocation): Stat<ResourceLocation>;
    static getSystemTime(): number;
    static isWrapped(o: any): boolean;
    static lazy<T>(supplier: Supplier<T>): Lazy<T>;
    static newCountingMap(): CountingMap;
    static newList(): any[];
    static newMap(): Map<any, any>;
    static newRandom(seed: number): RandomSource;
    static randomOf(random: Random, objects: Collection<any>): any;
    static regex(s: any): Pattern;
    static regex(pattern: string, flags: number): Pattern;
    static runAsync(task: Runnable): CompletableFuture<Void>;
    static supplyAsync(task: Supplier<any>): CompletableFuture<any>;
  }


  class UUIDWrapper {
    static digits(sb: StringBuilder, val: number, digits: number): void;
    static fromString(o: any): UUID;
    static toString(id: UUID): string;
  }

}

declare module 'dev.latvian.mods.kubejs.plugin' {
  import { ScriptType, BindingRegistry, TypeWrapperRegistry, RecordDefaultsRegistry, TypeDescriptionRegistry, DataComponentTypeInfoRegistry, ScriptManager } from 'dev.latvian.mods.kubejs.script';
  import { Class } from 'java.lang';
  import { BuilderTypeRegistry, ServerRegistryRegistry } from 'dev.latvian.mods.kubejs.registry';
  import { EventGroupRegistry } from 'dev.latvian.mods.kubejs.event';
  import { RecipeFactoryRegistry, RecipeMappingRegistry, RecipeSchemaRegistry } from 'dev.latvian.mods.kubejs.recipe.schema';
  import { RecipeComponentTypeRegistry } from 'dev.latvian.mods.kubejs.recipe.component';
  import { RecipeSchemaFunctionRegistry, CustomRecipeSchemaFunctionRegistry } from 'dev.latvian.mods.kubejs.recipe.schema.function';
  import { RecipePostProcessorTypeRegistry } from 'dev.latvian.mods.kubejs.recipe.schema.postprocessing';
  import { BlockEntityAttachmentRegistry } from 'dev.latvian.mods.kubejs.block.entity';
  import { IngredientActionTypeRegistry } from 'dev.latvian.mods.kubejs.recipe.ingredientaction';
  import { Consumer, BiConsumer } from 'java.util.function';
  import { RecipeViewerEntryType } from 'dev.latvian.mods.kubejs.recipe.viewer';
  import { LocalWebServerAPIRegistry, LocalWebServerRegistry, LocalWebServer } from 'dev.latvian.mods.kubejs.web';
  import { Registry } from 'dev.latvian.mods.kubejs.util.NameProvider';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { KubeIconTypeRegistry } from 'dev.latvian.mods.kubejs.client.icon';
  import { AttachedData } from 'dev.latvian.mods.kubejs.util';
  import { MinecraftServer } from 'net.minecraft.server';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { KubeDataGenerator, KubeAssetGenerator } from 'dev.latvian.mods.kubejs.generator';
  import { LangKubeEvent } from 'dev.latvian.mods.kubejs.client';
  import { DataExport } from 'dev.latvian.mods.kubejs.server';
  import { RecipesKubeEvent } from 'dev.latvian.mods.kubejs.recipe';
  import { RecipeManagerKJS } from 'dev.latvian.mods.kubejs.core';
  import { Map, List } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { JsonElement } from 'com.google.gson';
  import { Context } from 'dev.latvian.mods.rhino';
  import { Event } from 'net.neoforged.bus.api';
  import { IModFile } from 'net.neoforged.neoforgespi.locating';

  class ClassFilter {
    readonly scriptType: ScriptType;
    constructor(scriptType: ScriptType);
    allow(s: string): void;
    allow(c: Class<any>): void;
    deny(s: string): void;
    deny(c: Class<any>): void;
    isAllowed(s: string): boolean;
  }


  class KubeJSPlugin {
    afterInit(): void;
    afterScriptsLoaded(manager: ScriptManager): void;
    attachLevelData(event: AttachedData<Level>): void;
    attachPlayerData(event: AttachedData<Player>): void;
    attachServerData(event: AttachedData<MinecraftServer>): void;
    beforeRecipeLoading(event: RecipesKubeEvent, manager: RecipeManagerKJS, recipeJsons: Map<ResourceLocation, JsonElement>): void;
    beforeScriptsLoaded(manager: ScriptManager): void;
    breakpoint(cx: Context, args: any[]): void;
    clearCaches(): void;
    exportServerData(exportParameter: DataExport): void;
    generateAssets(generator: KubeAssetGenerator): void;
    generateData(generator: KubeDataGenerator): void;
    generateLang(event: LangKubeEvent): void;
    init(): void;
    initStartup(): void;
    localWebServerStarted(server: LocalWebServer): void;
    registerBindings(bindings: BindingRegistry): void;
    registerBlockEntityAttachments(registry: BlockEntityAttachmentRegistry): void;
    registerBuilderTypes(registry: BuilderTypeRegistry): void;
    registerClasses(filter: ClassFilter): void;
    registerCustomRecipeSchemaFunctions(registry: CustomRecipeSchemaFunctionRegistry): void;
    registerDataComponentTypeDescriptions(registry: DataComponentTypeInfoRegistry): void;
    registerEvents(registry: EventGroupRegistry): void;
    registerIconTypes(registry: KubeIconTypeRegistry): void;
    registerIngredientActionTypes(registry: IngredientActionTypeRegistry): void;
    registerItemNameProviders(registry: Registry<Item, ItemStack>): void;
    registerLocalWebServer(registry: LocalWebServerRegistry): void;
    registerLocalWebServerAPIs(registry: LocalWebServerAPIRegistry): void;
    registerLocalWebServerWithAuth(registry: LocalWebServerRegistry): void;
    registerRecipeComponents(registry: RecipeComponentTypeRegistry): void;
    registerRecipeFactories(registry: RecipeFactoryRegistry): void;
    registerRecipeMappings(registry: RecipeMappingRegistry): void;
    registerRecipePostProcessors(registry: RecipePostProcessorTypeRegistry): void;
    registerRecipeSchemaFunctionTypes(registry: RecipeSchemaFunctionRegistry): void;
    registerRecipeSchemas(registry: RecipeSchemaRegistry): void;
    registerRecipeViewerEntryTypes(registry: Consumer<RecipeViewerEntryType>): void;
    registerRecordDefaults(registry: RecordDefaultsRegistry): void;
    registerServerRegistries(registry: ServerRegistryRegistry): void;
    registerTypeDescriptions(registry: TypeDescriptionRegistry): void;
    registerTypeWrappers(registry: TypeWrapperRegistry): void;
  }


  interface KubeJSPluginEvent extends Event {}
  class KubeJSPluginEvent extends Event {
  }


  class KubeJSPlugins {
    static addSidedBindings(event: BindingRegistry): void;
    static createClassFilter(type: ScriptType): ClassFilter;
    static forEachPlugin(callback: Consumer<KubeJSPlugin>): void;
    static forEachPlugin<T>(instance: T, callback: BiConsumer<KubeJSPlugin, T>): void;
    static get all(): KubeJSPlugin[];
    static load(modFiles: IModFile[], loadClientPlugins: boolean): void;
  }

}

declare module 'dev.latvian.mods.kubejs.recipe' {
  import { KubeEvent, EventResult } from 'dev.latvian.mods.kubejs.event';
  import { ReloadableServerResources } from 'net.minecraft.server';
  import { Context, Scriptable, BaseFunction, NativeJavaObject } from 'dev.latvian.mods.rhino';
  import { RecipeFilter, RecipeMatchContext } from 'dev.latvian.mods.kubejs.recipe.filter';
  import { Consumer, Supplier, Function } from 'java.util.function';
  import { RecipeLikeKJS, RecipeManagerKJS } from 'dev.latvian.mods.kubejs.core';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { Registry } from 'net.minecraft.core';
  import { Map, List, SequencedSet, Collection } from 'java.util';
  import { ResourceLocation, ResourceKey, RegistryOps } from 'net.minecraft.resources';
  import { EntryWithSource } from 'TagLoader';
  import { TagKey } from 'net.minecraft.tags';
  import { DeferredRegister } from 'net.neoforged.neoforge.registries';
  import { CustomJavaToJsWrapper } from 'dev.latvian.mods.rhino.util';
  import { TypeInfo } from 'dev.latvian.mods.rhino.type';
  import { SourceLine, WithScriptContext } from 'dev.latvian.mods.kubejs.script';
  import { JsonObject, JsonElement } from 'com.google.gson';
  import { RecipeComponentValue, RecipeValidationContext, RecipeComponent, ComponentRole } from 'dev.latvian.mods.kubejs.recipe.component';
  import { ErrorStack, KubeResourceLocation, SlotFilter, RegistryAccessContainer, RegistryOpsContainer, WrappedJS } from 'dev.latvian.mods.kubejs.util';
  import { RecipeSerializer, Recipe, Ingredient, RecipeInput, CraftingInput } from 'net.minecraft.world.item.crafting';
  import { RecipeSchema, RecipeNamespace, RecipeOptional, RecipeSchemaStorage, RecipeSchemaType, RecipeSchemaData } from 'dev.latvian.mods.kubejs.recipe.schema';
  import { ReplacementMatchInfo } from 'dev.latvian.mods.kubejs.recipe.match';
  import { IngredientAction } from 'dev.latvian.mods.kubejs.recipe.ingredientaction';
  import { ConditionalOps } from 'net.neoforged.neoforge.common.conditions';
  import { Codec, DynamicOps, DataResult } from 'com.mojang.serialization';
  import { DataProvider, CachedOutput } from 'net.minecraft.data';
  import { GatherDataEvent } from 'net.neoforged.neoforge.data.event';
  import { ServerScriptManager } from 'dev.latvian.mods.kubejs.server';
  import { Provider } from 'HolderLookup';
  import { SchemaDataBuilder } from 'dev.latvian.mods.kubejs.recipe.RecipeSchemaProvider';
  import { RecipeKeyData } from 'dev.latvian.mods.kubejs.recipe.schema.RecipeSchemaData';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Pattern } from 'java.util.regex';
  import { ResourceManager } from 'net.minecraft.server.packs.resources';
  import { Throwable } from 'java.lang';
  import { Stream } from 'java.util.stream';

  interface AfterRecipesLoadedKubeEvent extends KubeEvent {}
  class AfterRecipesLoadedKubeEvent extends KubeEvent {
    constructor(resources: ReloadableServerResources);
    afterPosted(result: EventResult): void;
    countRecipes(cx: Context, filter: RecipeFilter): number;
    forEachRecipe(cx: Context, filter: RecipeFilter, consumer: Consumer<RecipeLikeKJS>): void;
    remove(cx: Context, filter: RecipeFilter): number;
  }


  interface CachedItemTagLookup extends CachedTagLookup<Item> {}
  class CachedItemTagLookup extends CachedTagLookup<Item> {
    constructor(registry: Registry<Item>, originalMap: Map<ResourceLocation, EntryWithSource[]>);
    isEmpty(key: TagKey<Item>): boolean;
  }


  class KubeJSRecipeSerializers {
    static readonly REGISTRY: DeferredRegister;
    static readonly SHAPED: Supplier;
    static readonly SHAPELESS: Supplier;
  }


  interface KubeRecipe extends RecipeLikeKJS, CustomJavaToJsWrapper {}
  class KubeRecipe extends RecipeLikeKJS {
    static readonly CHANGED_MARKER: string;
    static readonly TYPE_INFO: TypeInfo;
    id: ResourceLocation;
    type: RecipeTypeFunction;
    newRecipe: boolean;
    removed: boolean;
    sourceLine: SourceLine;
    modifyResult: string;
    originalJson: JsonObject;
    json: JsonObject;
    changed: boolean;
    creationError: boolean;
    afterLoaded(stack: ErrorStack): void;
    afterLoaded(cx: RecipeValidationContext): void;
    consumeIngredient(filter: SlotFilter): KubeRecipe;
    convertJavaToJs(cx: Context, scope: Scriptable, staticType: TypeInfo): Scriptable;
    customIngredientAction(filter: SlotFilter, id: string): KubeRecipe;
    damageIngredient(filter: SlotFilter, damage: number): KubeRecipe;
    damageIngredient(filter: SlotFilter): KubeRecipe;
    deserialize(merge: boolean): void;
    get(key: string): any;
    get fromToString(): string;
    get orCreateId(): ResourceLocation;
    get originalRecipe(): Recipe<any>;
    get originalRecipeIngredients(): Ingredient[];
    get originalRecipeResult(): ItemStack;
    get path(): string;
    get recipeComponentValues(): RecipeComponentValue<any>;
    get serializationTypeFunction(): RecipeTypeFunction;
    getId(): string;
    getValue<T>(key: RecipeKey<T>): T;
    group(g: string): KubeRecipe;
    hasChanged(): boolean;
    hasInput(cx: RecipeMatchContext, match: ReplacementMatchInfo): boolean;
    hasOutput(cx: RecipeMatchContext, match: ReplacementMatchInfo): boolean;
    id(id: KubeResourceLocation): KubeRecipe;
    ingredientAction(filter: SlotFilter, action: IngredientAction): KubeRecipe;
    initValues(save: boolean): void;
    inputValues(): RecipeComponentValue<any>;
    keepIngredient(filter: SlotFilter): KubeRecipe;
    kjs$getGroup(): string;
    kjs$getOrCreateId(): ResourceLocation;
    kjs$getSchema(cx: Context): RecipeSchema;
    kjs$getSerializer(): RecipeSerializer<any>;
    kjs$getTypeKey(): ResourceKey<RecipeSerializer<any>>;
    kjs$setGroup(group: string): void;
    merge(j: JsonObject): KubeRecipe;
    modifyResult(id: string): KubeRecipe;
    outputValues(): RecipeComponentValue<any>;
    remove(): void;
    replaceIngredient(filter: SlotFilter, item: ItemStack): KubeRecipe;
    replaceInput(cx: RecipeScriptContext, match: ReplacementMatchInfo, withParameter: any): boolean;
    replaceOutput(cx: RecipeScriptContext, match: ReplacementMatchInfo, withParameter: any): boolean;
    save(): void;
    serialize(): void;
    serializeChanges(): KubeRecipe;
    set(cx: Context, key: string, value: any): KubeRecipe;
    setValue<T>(key: RecipeKey<T>, value: T): KubeRecipe;
    stage(s: string): KubeRecipe;
    toString(): string;
    validate(cx: RecipeValidationContext): void;
  }


  interface KubeRecipeContext extends RecipeLikeContext {}
  class KubeRecipeContext extends RecipeLikeContext {
    ops(): RegistryOpsContainer;
    recipe(): KubeRecipe;
    registries(): RegistryAccessContainer;
  }


  interface KubeRecipeEventOps<T = any> extends ConditionalOps<T> {}
  class KubeRecipeEventOps<T = any> extends ConditionalOps<T> {
    static readonly KUBE_RECIPE_CODEC: Codec;
    static readonly MARK_SYNTHETIC: Function;
    static readonly SYNTHETIC_CODEC: Codec;
    constructor(event: RecipesKubeEvent, ops: RegistryOps<T>);
  }


  interface ModifyCraftingItemKubeEvent extends KubeEvent {}
  class ModifyCraftingItemKubeEvent extends KubeEvent {
    readonly grid: RecipeInput;
    readonly width: number;
    readonly height: number;
    item: ItemStack;
    readonly index: number;
    constructor(grid: RecipeInput, width: number, height: number, item: ItemStack, index: number);

    constructor(grid: CraftingInput, item: ItemStack, index: number);
    defaultExitValue(cx: Context): ItemStack;
    get exitValueType(): TypeInfo;
  }


  interface NamespaceFunction extends WrappedJS, BaseFunction {}
  class NamespaceFunction extends WrappedJS {
    constructor(namespace: RecipeNamespace, map: Map<string, RecipeTypeFunction>);
    call(cx: Context, scope: Scriptable, thisObj: Scriptable, args0: any[]): any;
    equals(obj: any): boolean;
    get(cx: Context, name: string, start: Scriptable): any;
    get mod(): string;
    hashCode(): number;
    toString(): string;
  }


  interface RecipeFunction extends NativeJavaObject {}
  class RecipeFunction extends NativeJavaObject {
    readonly recipe: KubeRecipe;
    readonly builderFunctions: Map;
    constructor(cx: Context, scope: Scriptable, staticType: TypeInfo, recipe: KubeRecipe);
    get(cx: Context, name: string, start: Scriptable): any;
    static isValidIdentifier(name: string[]): boolean;
  }


  class RecipeKey<T = any> {
    readonly component: RecipeComponent;
    readonly typeInfo: TypeInfo;
    readonly codec: Codec;
    readonly name: string;
    readonly role: ComponentRole;
    readonly names: SequencedSet;
    optional: RecipeOptional;
    excluded: boolean;
    functionNames: List;
    alwaysWrite: boolean;
    constructor(component: RecipeComponent<T>, name: string, role: ComponentRole);
    alt(name: string): RecipeKey<T>;
    alt(...names: string[]): RecipeKey<T>;
    alwaysWrite(): RecipeKey<T>;
    defaultOptional(): RecipeKey<T>;
    exclude(): RecipeKey<T>;
    functionNames(names: string[]): RecipeKey<T>;
    functionNames(...names: string[]): RecipeKey<T>;
    get primaryFunctionName(): string;
    get validFunctionNames(): string[];
    hashCode(): number;
    noFunctions(): RecipeKey<T>;
    optional(value: T): RecipeKey<T>;
    optional(value: RecipeOptional<T>): RecipeKey<T>;
    optional(): boolean;
    toJson(storage: RecipeSchemaStorage, type: RecipeSchemaType, ops: DynamicOps<JsonElement>): JsonObject;
    toString(): string;
  }


  class RecipeLikeContext {
    ops(): RegistryOpsContainer;
    recipe(): RecipeLikeKJS;
    registries(): RegistryAccessContainer;
  }


  interface RecipeSchemaProvider extends DataProvider {}
  class RecipeSchemaProvider extends DataProvider {
    constructor(name: string, event: GatherDataEvent);

    constructor(name: string, event: GatherDataEvent, registryAccessContainer: RegistryAccessContainer);
    add(var1: Provider): void;
    add(id: ResourceLocation, schema: RecipeSchemaData): void;
    add(id: ResourceLocation, builder: Consumer<SchemaDataBuilder>): void;
    get name(): string;
    keyData(key: RecipeKey<any>): RecipeKeyData;
    onlyKeys(id: ResourceLocation, ...keys: RecipeKey<any>[], b: SchemaDataBuilder): void;
    recipeTypeRegistryContext(): RecipeTypeRegistryContext;
    registryAccessContainer(): RegistryAccessContainer;
    run(output: CachedOutput): CompletableFuture<any>;
    serverScriptManager(): ServerScriptManager;
  }


  interface RecipeScriptContext extends WithScriptContext, RecipeValidationContext, KubeRecipeContext, RecipeMatchContext {}
  class RecipeScriptContext extends WithScriptContext {
  }


  interface RecipesKubeEvent extends KubeEvent {}
  class RecipesKubeEvent extends KubeEvent {
    static readonly POST_SKIP_ERROR: Pattern;
    static readonly CREATE_RECIPE_SKIP_ERROR: Pattern;
    readonly recipeSchemaStorage: RecipeSchemaStorage;
    readonly registries: RegistryAccessContainer;
    readonly resourceManager: ResourceManager;
    readonly ops: RegistryOpsContainer;
    readonly originalRecipes: Map;
    readonly addedRecipes: Collection;
    readonly removedRecipes: Collection;
    readonly vanillaShaped: RecipeTypeFunction;
    readonly vanillaShapeless: RecipeTypeFunction;
    readonly shaped: RecipeTypeFunction;
    readonly shapeless: RecipeTypeFunction;
    readonly smelting: RecipeTypeFunction;
    readonly blasting: RecipeTypeFunction;
    readonly smoking: RecipeTypeFunction;
    readonly campfireCooking: RecipeTypeFunction;
    readonly stonecutting: RecipeTypeFunction;
    readonly smithing: RecipeTypeFunction;
    readonly smithingTrim: RecipeTypeFunction;
    constructor(manager: ServerScriptManager, resourceManager: ResourceManager);
    addRecipe(r: KubeRecipe, json: boolean): KubeRecipe;
    applyChanges(map: Map<ResourceLocation, JsonElement>): void;
    containsRecipe(cx: Context, filter: RecipeFilter): boolean;
    countRecipes(cx: Context, filter: RecipeFilter): number;
    custom(cx: Context, json: JsonObject): KubeRecipe;
    discoverRecipes(recipeManager: RecipeManagerKJS, datapackRecipeMap: Map<ResourceLocation, JsonElement>): void;
    findRecipeIds(cx: Context, filter: RecipeFilter): Collection<ResourceLocation>;
    findRecipes(cx: Context, filter: RecipeFilter): Collection<KubeRecipe>;
    finishEvent(): void;
    forEachRecipe(cx: Context, filter: RecipeFilter, consumer: Consumer<KubeRecipe>): void;
    get recipes(): Map<string, any>;
    getRecipeFunction(id: string): RecipeTypeFunction;
    handleFailedRecipe(id: ResourceLocation, json: JsonElement, ex: Throwable): void;
    parseJson(json: JsonObject, sourceLine: SourceLine): DataResult<KubeRecipe>;
    post(recipeManager: RecipeManagerKJS, datapackRecipeMap: Map<ResourceLocation, JsonElement>): void;
    postEvent(): void;
    printAllTypes(): void;
    printExamples(type: string): void;
    printTypes(cx: Context): void;
    recipeStream(cx: Context, filter: RecipeFilter): Stream<KubeRecipe>;
    remove(cx: Context, filter: RecipeFilter): void;
    replaceInput(cx: Context, filter: RecipeFilter, match: ReplacementMatchInfo, withParameter: any): void;
    replaceOutput(cx: Context, filter: RecipeFilter, match: ReplacementMatchInfo, withParameter: any): void;
    stage(cx: Context, filter: RecipeFilter, stage: string): void;
    takeId(recipe: KubeRecipe, prefix: string, ids: string): ResourceLocation;
  }


  interface RecipeTypeFunction extends WrappedJS, BaseFunction {}
  class RecipeTypeFunction extends WrappedJS {
    static readonly SKIP_ERROR: Pattern;
    readonly event: RecipesKubeEvent;
    readonly serializerKey: ResourceKey;
    readonly id: ResourceLocation;
    readonly idString: string;
    readonly schemaType: RecipeSchemaType;
    constructor(event: RecipesKubeEvent, schemaType: RecipeSchemaType);
    call(cx: Context, scope: Scriptable, thisObj: Scriptable, args0: any[]): KubeRecipe;
    createRecipe(cx: Context, sourceLine: SourceLine, stack: ErrorStack, args: any[]): KubeRecipe;
    equals(obj: any): boolean;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'dev.latvian.mods.kubejs.recipe.component' {
  import { Boolean, Character, Enum, Class } from 'java.lang';
  import { Codec, MapCodec, DynamicOps, DataResult, MapLike, RecordBuilder } from 'com.mojang.serialization';
  import { TypeInfo, EnumTypeInfo } from 'dev.latvian.mods.rhino.type';
  import { RecipeScriptContext, RecipeKey, KubeRecipe, RecipeTypeRegistryContext, KubeRecipeContext } from 'dev.latvian.mods.kubejs.recipe';
  import { RecipeMatchContext } from 'dev.latvian.mods.kubejs.recipe.filter';
  import { OpsContainer, TinyMap, WrappedJS, ErrorStack } from 'dev.latvian.mods.kubejs.util';
  import { List, Set, AbstractMap } from 'java.util';
  import { Reference2ObjectOpenHashMap } from 'it.unimi.dsi.fastutil.objects';
  import { Predicate, Function } from 'java.util.function';
  import { Key, Value } from 'dev.latvian.mods.kubejs.recipe.component.CustomObjectRecipeComponent';
  import { Stream } from 'java.util.stream';
  import { ReplacementMatchInfo } from 'dev.latvian.mods.kubejs.recipe.match';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IntRange, LongRange, FloatRange, DoubleRange } from 'dev.latvian.mods.kubejs.recipe.component.NumberComponent';
  import { JsonObject } from 'com.google.gson';
  import { Unit } from 'dev.latvian.mods.kubejs.recipe.component.RecipeComponentType';
  import { Entry } from 'Map';
  import { SourceLine } from 'dev.latvian.mods.kubejs.script';
  import { BaseFunction, Context, Scriptable } from 'dev.latvian.mods.rhino';

  class BookCategoryComponent {
    static readonly CRAFTING_BOOK_CATEGORY: RecipeComponentType;
    static readonly COOKING_BOOK_CATEGORY: RecipeComponentType;
  }


  interface BooleanComponent extends RecipeComponent<boolean> {}
  class BooleanComponent extends RecipeComponent<boolean> {
    static readonly BOOLEAN: RecipeComponentType;
    codec(): Codec<boolean>;
    hasPriority(cx: RecipeMatchContext, from: any): boolean;
    toString(): string;
    type(): RecipeComponentType<any>;
    typeInfo(): TypeInfo;
    wrap(cx: RecipeScriptContext, from: any): boolean;
  }


  interface CharacterComponent extends SimpleRecipeComponent<string> {}
  class CharacterComponent extends SimpleRecipeComponent<string> {
    static readonly CHARACTER: RecipeComponentType;
    constructor(type: RecipeComponentType<any>);
    hasPriority(cx: RecipeMatchContext, from: any): boolean;
    isEmpty(value: string): boolean;
    toString(ops: OpsContainer, value: string): string;
    toString(): string;
  }


  interface ComponentRole extends Enum<ComponentRole> {}
  class ComponentRole extends Enum<ComponentRole> {
    static readonly INPUT: ComponentRole;
    static readonly OUTPUT: ComponentRole;
    static readonly OTHER: ComponentRole;
    get serializedName(): string;
    isInput(): boolean;
    isOther(): boolean;
    isOutput(): boolean;
    static valueOf(name: string): ComponentRole;
    static values(): ComponentRole[];
  }


  interface ComponentValueMap extends Reference2ObjectOpenHashMap<RecipeKey, any> {}
  class ComponentValueMap extends Reference2ObjectOpenHashMap<RecipeKey, any> {
    constructor(init: number);
    getValue<T>(cx: RecipeScriptContext, key: RecipeKey<T>): T;
  }


  interface CustomObjectRecipeComponent extends RecipeComponent<List> {}
  class CustomObjectRecipeComponent extends RecipeComponent<List> {
    static readonly TYPE: RecipeComponentType;
    hasPriority: Predicate;
    constructor(keys: Key[]);
    buildUniqueId(builder: UniqueIdBuilder, list: Value[]): void;
    codec(): Codec<Value[]>;
    createCopy(): CustomObjectRecipeComponent;
    decode<T>(ops: DynamicOps<T>, input: MapLike<T>): DataResult<Value[]>;
    encode<T>(input: Value[], ops: DynamicOps<T>, prefix: RecordBuilder<T>): RecordBuilder<T>;
    hasPriority(hasPriority: Predicate<Set<string>>): CustomObjectRecipeComponent;
    hasPriority(cx: RecipeMatchContext, from: any): boolean;
    isEmpty(value: Value[]): boolean;
    keys(): Key[];
    keys<T>(ops: DynamicOps<T>): Stream<T>;
    mapCodec(): MapCodec<Value[]>;
    matches(cx: RecipeMatchContext, value: Value[], match: ReplacementMatchInfo): boolean;
    replace(cx: RecipeScriptContext, original: Value[], match: ReplacementMatchInfo, withParameter: any): Value[];
    toString(): string;
    type(): RecipeComponentType<any>;
    typeInfo(): TypeInfo;
    validate(ctx: RecipeValidationContext, value: Value[]): void;
    wrap(rcx: RecipeScriptContext, from: any): Value[];
  }


  interface EnumComponent<T extends Enum<T> = any> extends RecipeComponent<T>, Record {}
  class EnumComponent<T extends Enum<T> = any> extends RecipeComponent<T> {
    static readonly TYPE: RecipeComponentType;
    constructor(typeOverride: RecipeComponentType<any>, typeInfo: EnumTypeInfo, codec: Codec<T>);
    buildUniqueId(builder: UniqueIdBuilder, value: T): void;
    codec(): Codec<T>;
    equals(o: any): boolean;
    hashCode(): number;
    static of<T extends Enum<T>>(id: ResourceLocation, enumClass: Class<T>, codec: Codec<T>): RecipeComponentType<T>;
    static of<T extends Enum<T>>(id: ResourceLocation, enumClass: Class<T>): RecipeComponentType<T>;
    toString(): string;
    toString(ops: OpsContainer, value: T): string;
    type(): RecipeComponentType<any>;
    typeInfo(): EnumTypeInfo;
    typeOverride(): RecipeComponentType<any>;
  }


  interface IgnoreComponent extends Enum<IgnoreComponent> {}
  class IgnoreComponent extends Enum<IgnoreComponent> {
    static readonly INSTANCE: IgnoreComponent;
    allowEmpty(): boolean;
    buildUniqueId(builder: UniqueIdBuilder, value: any): void;
    codec(): Codec<any>;
    isEmpty(value: any): boolean;
    isIgnored(): boolean;
    toString(): string;
    type(): RecipeComponentType<any>;
    typeInfo(): TypeInfo;
    validate(ctx: RecipeValidationContext, value: any): void;
    static valueOf(name: string): IgnoreComponent;
    static values(): IgnoreComponent[];
    wrap(cx: RecipeScriptContext, from: any): any;
  }


  interface NestedRecipeComponent extends RecipeComponent<KubeRecipe> {}
  class NestedRecipeComponent extends RecipeComponent<KubeRecipe> {
    static readonly RECIPE: RecipeComponentType;
    codec(): Codec<KubeRecipe>;
    hasPriority(cx: RecipeMatchContext, from: any): boolean;
    toString(): string;
    type(): RecipeComponentType<any>;
    typeInfo(): TypeInfo;
    wrap(cx: RecipeScriptContext, from: any): KubeRecipe;
  }


  interface NumberComponent<S = any, T extends Number = any> extends RecipeComponent<T> {}
  class NumberComponent<S = any, T extends Number = any> extends RecipeComponent<T> {
    static readonly INT: IntRange;
    static readonly LONG: LongRange;
    static readonly FLOAT: FloatRange;
    static readonly DOUBLE: DoubleRange;
    static readonly INT_TYPE: RecipeComponentType;
    static readonly LONG_TYPE: RecipeComponentType;
    static readonly FLOAT_TYPE: RecipeComponentType;
    static readonly DOUBLE_TYPE: RecipeComponentType;
    static readonly NON_NEGATIVE_INT: RecipeComponentType;
    static readonly POSITIVE_INT: RecipeComponentType;
    static readonly NON_NEGATIVE_LONG: RecipeComponentType;
    static readonly POSITIVE_LONG: RecipeComponentType;
    static readonly NON_NEGATIVE_FLOAT: RecipeComponentType;
    static readonly POSITIVE_FLOAT: RecipeComponentType;
    static readonly NON_NEGATIVE_DOUBLE: RecipeComponentType;
    static readonly POSITIVE_DOUBLE: RecipeComponentType;
    static doubleRange(min: number, max: number): DoubleRange;
    static floatRange(min: number, max: number): FloatRange;
    hasPriority(cx: RecipeMatchContext, from: any): boolean;
    static intRange(min: number, max: number): IntRange;
    static longRange(min: number, max: number): LongRange;
    max(): T;
    max(max: T): NumberComponent<S, T>;
    min(): T;
    min(min: T): NumberComponent<S, T>;
    range(var1: T, var2: T): NumberComponent<S, T>;
    toString(typeOverride: RecipeComponentType<any>, name: string, min: T, max: T): string;
    typeInfo(): TypeInfo;
  }


  class RecipeComponent<T = any> {
    allowEmpty(): boolean;
    asConditionalList(): ListRecipeComponent<T>;
    asConditionalListOrSelf(): ListRecipeComponent<T>;
    asList(): ListRecipeComponent<T>;
    asListOrSelf(): ListRecipeComponent<T>;
    asMap<K>(key: RecipeComponent<K>): RecipeComponent<TinyMap<K, T>>;
    asPatternKey(): RecipeComponent<TinyMap<string, T>>;
    buildUniqueId(builder: UniqueIdBuilder, value: T): void;
    static builder(keys: Key[]): CustomObjectRecipeComponent;
    static builder(...keys: Key[]): CustomObjectRecipeComponent;
    codec(): Codec<T>;
    createBuilder(): RecipeComponentBuilder;
    hasPriority(cx: RecipeMatchContext, from: any): boolean;
    inputKey(name: string): RecipeKey<T>;
    isEmpty(value: T): boolean;
    isIgnored(): boolean;
    key(name: string, role: ComponentRole): RecipeKey<T>;
    matches(cx: RecipeMatchContext, value: T, match: ReplacementMatchInfo): boolean;
    or<O>(other: RecipeComponent<O>): EitherRecipeComponent<T, O>;
    orSelf(): RecipeComponent<T>;
    otherKey(name: string): RecipeKey<T>;
    outputKey(name: string): RecipeKey<T>;
    readFromJson(recipe: KubeRecipe, cv: RecipeComponentValue<T>, json: JsonObject): void;
    replace(cx: RecipeScriptContext, original: T, match: ReplacementMatchInfo, withParameter: any): T;
    spread(value: T): any[];
    toString(ops: OpsContainer, value: T): string;
    type(): RecipeComponentType<any>;
    typeInfo(): TypeInfo;
    validate(ctx: RecipeValidationContext, value: T): void;
    withCodec(codec: Codec<T>): RecipeComponent<T>;
    wrap(cx: RecipeScriptContext, from: any): T;
    writeToJson(recipe: KubeRecipe, cv: RecipeComponentValue<T>, json: JsonObject): void;
  }


  class RecipeComponentBuilder {
  }


  class RecipeComponentCodecFactory<CT extends RecipeComponent<any> = any> {
    create(var1: RecipeComponentType<any>, var2: RecipeTypeRegistryContext): MapCodec<CT>;
  }


  class RecipeComponentType<T = any> {
    constructor(id: ResourceLocation);
    static dynamic<CT extends RecipeComponent<any>>(id: ResourceLocation, codecFactory: RecipeComponentCodecFactory<CT>): RecipeComponentType<any>;
    static dynamic<CT extends RecipeComponent<any>>(id: ResourceLocation, mapCodec: MapCodec<CT>): RecipeComponentType<any>;
    equals(obj: any): boolean;
    hashCode(): number;
    id(): ResourceLocation;
    inputKey(name: string): RecipeKey<T>;
    instance(): RecipeComponent<T>;
    isUnit(): boolean;
    key(name: string, role: ComponentRole): RecipeKey<T>;
    mapCodec(var1: RecipeTypeRegistryContext): MapCodec<RecipeComponent<any>>;
    otherKey(name: string): RecipeKey<T>;
    outputKey(name: string): RecipeKey<T>;
    toString(): string;
    static unit<T>(id: ResourceLocation, instanceGetter: Function<RecipeComponentType<T>, RecipeComponent<T>>): Unit<T>;
    static unit<T>(id: ResourceLocation, instance: RecipeComponent<T>): Unit<T>;
  }


  class RecipeComponentTypeRegistry {
    register(var1: RecipeComponentType<any>): void;
  }


  interface RecipeComponentValue<T = any> extends WrappedJS, Entry<RecipeKey, T> {}
  class RecipeComponentValue<T = any> extends WrappedJS {
    static readonly EMPTY_ARRAY: RecipeComponentValue[];
    readonly key: RecipeKey;
    readonly index: number;
    value: T;
    write: boolean;
    constructor(key: RecipeKey<T>, index: number);
    copy(): RecipeComponentValue<T>;
    equals(obj: any): boolean;
    get index(): number;
    get key(): RecipeKey<T>;
    get value(): T;
    hashCode(): number;
    matches(cx: RecipeMatchContext, match: ReplacementMatchInfo): boolean;
    replace(cx: RecipeScriptContext, match: ReplacementMatchInfo, withParameter: any): boolean;
    set value(newValue: T);
    shouldWrite(): boolean;
    toString(): string;
    validate(ctx: RecipeValidationContext, sourceLine: SourceLine): void;
    write(): void;
  }


  interface RecipeComponentValueFunction extends BaseFunction {}
  class RecipeComponentValueFunction extends BaseFunction {
    readonly recipe: KubeRecipe;
    readonly componentValue: RecipeComponentValue;
    constructor(recipe: KubeRecipe, componentValue: RecipeComponentValue<any>);
    call(cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): KubeRecipe;
  }


  interface RecipeComponentValueMap extends AbstractMap<RecipeKey, any> {}
  class RecipeComponentValueMap extends AbstractMap<RecipeKey, any> {
    static readonly EMPTY: RecipeComponentValueMap;
    readonly holders: RecipeComponentValue[];
    constructor(holders: RecipeComponentValue<any>);

    constructor(keys: RecipeKey<any>[]);
    entrySet(): Set<Entry<RecipeKey<any>, Object>>;
    equals(o: any): boolean;
    get(key: any): any;
    getHolder(key: any): RecipeComponentValue<any>;
    getOrDefault(key: any, defaultValue: any): any;
    hashCode(): number;
    put(key: RecipeKey<any>, value: any): any;
  }


  interface RecipeComponentWithParent<T = any> extends RecipeComponent<T> {}
  class RecipeComponentWithParent<T = any> extends RecipeComponent<T> {
    allowEmpty(): boolean;
    buildUniqueId(builder: UniqueIdBuilder, value: T): void;
    codec(): Codec<T>;
    createBuilder(): RecipeComponentBuilder;
    hasPriority(cx: RecipeMatchContext, from: any): boolean;
    isEmpty(value: T): boolean;
    matches(cx: RecipeMatchContext, value: T, match: ReplacementMatchInfo): boolean;
    parentComponent(): RecipeComponent<T>;
    replace(cx: RecipeScriptContext, original: T, match: ReplacementMatchInfo, withParameter: any): T;
    spread(value: T): any[];
    typeInfo(): TypeInfo;
    validate(ctx: RecipeValidationContext, value: T): void;
    wrap(cx: RecipeScriptContext, from: any): T;
  }


  interface RecipeValidationContext extends KubeRecipeContext, RecipeMatchContext {}
  class RecipeValidationContext extends KubeRecipeContext {
    errors(): ErrorStack;
  }


  interface SimpleRecipeComponent<T = any> extends RecipeComponent<T> {}
  class SimpleRecipeComponent<T = any> extends RecipeComponent<T> {
    readonly type: RecipeComponentType;
    readonly codec: Codec;
    readonly typeInfo: TypeInfo;
    constructor(type: RecipeComponentType<any>, codec: Codec<T>, typeInfo: TypeInfo);
    codec(): Codec<T>;
    toString(): string;
    type(): RecipeComponentType<any>;
    typeInfo(): TypeInfo;
  }

}

declare module 'dev.latvian.mods.kubejs.recipe.component.NumberComponent' {
  import { Record, NumberComponent, RecipeComponentType } from 'dev.latvian.mods.kubejs.recipe.component';
  import { Integer, Long, Float, Double } from 'java.lang';
  import { Codec } from 'com.mojang.serialization';
  import { TypeInfo } from 'dev.latvian.mods.rhino.type';
  import { RecipeScriptContext } from 'dev.latvian.mods.kubejs.recipe';

  interface IntRange extends NumberComponent<IntRange, number>, Record {}
  class IntRange extends NumberComponent<IntRange, number> {
    constructor(typeOverride: RecipeComponentType<any>, min: number, max: number, codec: Codec<number>);
    codec(): Codec<number>;
    equals(o: any): boolean;
    hashCode(): number;
    max(): number;
    min(): number;
    static of(typeOverride: RecipeComponentType<any>, min: number, max: number): IntRange;
    range(min: number, max: number): IntRange;
    toString(): string;
    type(): RecipeComponentType<any>;
    typeInfo(): TypeInfo;
    typeOverride(): RecipeComponentType<any>;
    wrap(cx: RecipeScriptContext, from: any): number;
  }


  interface LongRange extends NumberComponent<LongRange, Long>, Record {}
  class LongRange extends NumberComponent<LongRange, Long> {
    constructor(typeOverride: RecipeComponentType<any>, min: Long, max: Long, codec: Codec<Long>);
    codec(): Codec<Long>;
    equals(o: any): boolean;
    hashCode(): number;
    max(): Long;
    min(): Long;
    static of(typeOverride: RecipeComponentType<any>, min: Long, max: Long): LongRange;
    range(min: Long, max: Long): LongRange;
    toString(): string;
    type(): RecipeComponentType<any>;
    typeInfo(): TypeInfo;
    typeOverride(): RecipeComponentType<any>;
    wrap(cx: RecipeScriptContext, from: any): Long;
  }


  interface FloatRange extends NumberComponent<FloatRange, number>, Record {}
  class FloatRange extends NumberComponent<FloatRange, number> {
    constructor(typeOverride: RecipeComponentType<any>, min: number, max: number, codec: Codec<number>);
    codec(): Codec<number>;
    equals(o: any): boolean;
    hashCode(): number;
    max(): number;
    min(): number;
    static of(typeOverride: RecipeComponentType<any>, min: number, max: number): FloatRange;
    range(min: number, max: number): FloatRange;
    toString(): string;
    type(): RecipeComponentType<any>;
    typeInfo(): TypeInfo;
    typeOverride(): RecipeComponentType<any>;
    wrap(cx: RecipeScriptContext, from: any): number;
  }


  interface DoubleRange extends NumberComponent<DoubleRange, number>, Record {}
  class DoubleRange extends NumberComponent<DoubleRange, number> {
    constructor(typeOverride: RecipeComponentType<any>, min: number, max: number, codec: Codec<number>);
    codec(): Codec<number>;
    equals(o: any): boolean;
    hashCode(): number;
    max(): number;
    min(): number;
    static of(typeOverride: RecipeComponentType<any>, min: number, max: number): DoubleRange;
    range(min: number, max: number): DoubleRange;
    toString(): string;
    type(): RecipeComponentType<any>;
    typeInfo(): TypeInfo;
    typeOverride(): RecipeComponentType<any>;
    wrap(cx: RecipeScriptContext, from: any): number;
  }

}

declare module 'dev.latvian.mods.kubejs.recipe.component.RecipeComponentType' {
  import { RecipeComponentType, RecipeComponent } from 'dev.latvian.mods.kubejs.recipe.component';
  import { MapCodec } from 'com.mojang.serialization';
  import { RecipeTypeRegistryContext } from 'dev.latvian.mods.kubejs.recipe';

  interface Unit<T = any> extends RecipeComponentType<T> {}
  class Unit<T = any> extends RecipeComponentType<T> {
    instance(): RecipeComponent<T>;
    isUnit(): boolean;
    mapCodec(ctx: RecipeTypeRegistryContext): MapCodec<RecipeComponent<any>>;
  }


  interface Dynamic<T = any> extends RecipeComponentType<T> {}
  class Dynamic<T = any> extends RecipeComponentType<T> {
    mapCodec(ctx: RecipeTypeRegistryContext): MapCodec<RecipeComponent<any>>;
  }

}

declare module 'dev.latvian.mods.kubejs.recipe.filter' {
  import { List, Map } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ReplacementMatchInfo } from 'dev.latvian.mods.kubejs.recipe.match';
  import { Predicate } from 'java.util.function';
  import { Context } from 'dev.latvian.mods.rhino';
  import { Event } from 'net.neoforged.bus.api';
  import { RecipeLikeContext } from 'dev.latvian.mods.kubejs.recipe';
  import { Pattern } from 'java.util.regex';

  interface AndFilter extends RecipeFilter {}
  class AndFilter extends RecipeFilter {
    readonly list: List;
    test(cx: RecipeMatchContext): boolean;
    toString(): string;
  }


  interface GroupFilter extends RecipeFilter {}
  class GroupFilter extends RecipeFilter {
    constructor(g: string);
    test(cx: RecipeMatchContext): boolean;
    toString(): string;
  }


  interface IDFilter extends RecipeFilter {}
  class IDFilter extends RecipeFilter {
    readonly id: ResourceLocation;
    constructor(i: ResourceLocation);
    test(cx: RecipeMatchContext): boolean;
    toString(): string;
  }


  interface ModFilter extends RecipeFilter {}
  class ModFilter extends RecipeFilter {
    constructor(m: string);
    test(cx: RecipeMatchContext): boolean;
    toString(): string;
  }


  interface OrFilter extends RecipeFilter {}
  class OrFilter extends RecipeFilter {
    readonly list: List;
    test(cx: RecipeMatchContext): boolean;
    toString(): string;
  }


  interface OutputFilter extends RecipeFilter {}
  class OutputFilter extends RecipeFilter {
    constructor(match: ReplacementMatchInfo);
    test(cx: RecipeMatchContext): boolean;
    toString(): string;
  }


  interface RecipeFilter extends Predicate<RecipeMatchContext> {}
  class RecipeFilter extends Predicate<RecipeMatchContext> {
    test(var1: RecipeMatchContext): boolean;
    static wrap(cx: Context, o: any): RecipeFilter;
  }


  interface RecipeFilterParseEvent extends Event {}
  class RecipeFilterParseEvent extends Event {
    readonly cx: Context;
    readonly filters: List;
    readonly map: Map;
    constructor(cx: Context, filters: RecipeFilter[], map: Map<any, any>);
  }


  interface RecipeMatchContext extends RecipeLikeContext {}
  class RecipeMatchContext extends RecipeLikeContext {
  }


  interface RegexIDFilter extends RecipeFilter {}
  class RegexIDFilter extends RecipeFilter {
    static clearInternCache(): void;
    equals(o: any): boolean;
    hashCode(): number;
    static of(i: Pattern): RegexIDFilter;
    test(cx: RecipeMatchContext): boolean;
    toString(): string;
  }


  interface TypeFilter extends RecipeFilter {}
  class TypeFilter extends RecipeFilter {
    constructor(t: ResourceLocation);
    test(cx: RecipeMatchContext): boolean;
    toString(): string;
  }

}

declare module 'dev.latvian.mods.kubejs.recipe.ingredientaction' {
  import { ItemStack } from 'net.minecraft.world.item';
  import { CraftingInput } from 'net.minecraft.world.item.crafting';
  import { Codec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { List } from 'java.util';

  interface ConsumeAction extends IngredientAction {}
  class ConsumeAction extends IngredientAction {
    static readonly INSTANCE: ConsumeAction;
    static readonly TYPE: IngredientActionType;
    get type(): IngredientActionType<any>;
    transform(old: ItemStack, index: number, input: CraftingInput): ItemStack;
  }


  class IngredientAction {
    static readonly CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    get type(): IngredientActionType<any>;
    static getRemaining(input: CraftingInput, index: number, ingredientActions: IngredientActionHolder[]): ItemStack;
    transform(var1: ItemStack, var2: number, var3: CraftingInput): ItemStack;
  }


  class IngredientActionTypeRegistry {
    register(var1: IngredientActionType<any>): void;
  }


  interface KeepAction extends IngredientAction {}
  class KeepAction extends IngredientAction {
    static readonly INSTANCE: KeepAction;
    static readonly TYPE: IngredientActionType;
    get type(): IngredientActionType<any>;
    transform(old: ItemStack, index: number, input: CraftingInput): ItemStack;
  }

}

declare module 'dev.latvian.mods.kubejs.recipe.match' {
  import { RecipeMatchContext } from 'dev.latvian.mods.kubejs.recipe.filter';
  import { FluidStack } from 'net.neoforged.neoforge.fluids';
  import { FluidIngredient } from 'net.neoforged.neoforge.fluids.crafting';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { ItemLike } from 'net.minecraft.world.level';
  import { Iterable } from 'java.lang';
  import { RecipeScriptContext } from 'dev.latvian.mods.kubejs.recipe';
  import { Context } from 'dev.latvian.mods.rhino';

  interface FluidMatch extends ReplacementMatch {}
  class FluidMatch extends ReplacementMatch {
    matches(var1: RecipeMatchContext, var2: FluidStack, var3: boolean): boolean;
    matches(var1: RecipeMatchContext, var2: FluidIngredient, var3: boolean): boolean;
  }


  interface ItemMatch extends ReplacementMatch {}
  class ItemMatch extends ReplacementMatch {
    matches(var1: RecipeMatchContext, var2: ItemStack, var3: boolean): boolean;
    matches(var1: RecipeMatchContext, var2: Ingredient, var3: boolean): boolean;
    matches(cx: RecipeMatchContext, itemLike: ItemLike, exact: boolean): boolean;
    matchesAny(cx: RecipeMatchContext, itemLikes: Iterable<ItemLike>, exact: boolean): boolean;
  }


  class Replaceable {
    replaceThisWith(cx: RecipeScriptContext, withParameter: any): any;
  }


  class ReplacementMatch {
    static readonly NONE: ReplacementMatch;
    static wrap(cx: Context, o: any): ReplacementMatch;
  }

}

declare module 'dev.latvian.mods.kubejs.recipe.RecipeSchemaProvider' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RecipeKey } from 'dev.latvian.mods.kubejs.recipe';
  import { List, Map } from 'java.util';
  import { RecipeKeyData, ConstructorData } from 'dev.latvian.mods.kubejs.recipe.schema.RecipeSchemaData';
  import { RecipeSchemaFunction } from 'dev.latvian.mods.kubejs.recipe.schema.function';
  import { RecipePostProcessor } from 'dev.latvian.mods.kubejs.recipe.schema.postprocessing';

  class SchemaDataBuilder {
    constructors(...constructors: ConstructorData[]): SchemaDataBuilder;
    constructors(constructors: ConstructorData[]): SchemaDataBuilder;
    function(name: string, functionParameter: RecipeSchemaFunction): SchemaDataBuilder;
    functions(functions: Map<string, RecipeSchemaFunction>): SchemaDataBuilder;
    hidden(): SchemaDataBuilder;
    hidden(hidden: boolean): SchemaDataBuilder;
    keyDatas(...keys: RecipeKeyData[]): SchemaDataBuilder;
    keyDatas(keys: RecipeKeyData[]): SchemaDataBuilder;
    keys(...keys: RecipeKey<any>[]): SchemaDataBuilder;
    keys(keys: RecipeKey<any>[]): SchemaDataBuilder;
    keysForUniqueId(...keys: string[]): SchemaDataBuilder;
    keysForUniqueId(keys: string[]): SchemaDataBuilder;
    mappings(...mappings: string[]): SchemaDataBuilder;
    mappings(mappings: string[]): SchemaDataBuilder;
    mergeData(keys: boolean, constructors: boolean, unique: boolean, postProcessors: boolean): SchemaDataBuilder;
    overrideKey<T>(key: RecipeKey<T>, optionalValue: T): SchemaDataBuilder;
    overrideType(type: ResourceLocation): SchemaDataBuilder;
    parent(parent: ResourceLocation): SchemaDataBuilder;
    postProcessors(...processors: RecipePostProcessor[]): SchemaDataBuilder;
    postProcessors(processors: RecipePostProcessor[]): SchemaDataBuilder;
    recipeFactory(factory: ResourceLocation): SchemaDataBuilder;
  }

}

declare module 'dev.latvian.mods.kubejs.recipe.schema.function' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Codec, DataResult, DynamicOps } from 'com.mojang.serialization';
  import { JsonElement } from 'com.google.gson';
  import { RecipeSchema } from 'dev.latvian.mods.kubejs.recipe.schema';
  import { BaseFunction, Context, Scriptable } from 'dev.latvian.mods.rhino';
  import { KubeRecipe, RecipeScriptContext } from 'dev.latvian.mods.kubejs.recipe';
  import { TypeInfo } from 'dev.latvian.mods.rhino.type';
  import { List } from 'java.util';
  import { RecipeComponent } from 'dev.latvian.mods.kubejs.recipe.component';

  class CustomRecipeSchemaFunctionRegistry {
    register(var1: ResourceLocation, var2: ResolvedRecipeSchemaFunction): void;
  }


  class RecipeSchemaFunction {
    static readonly DIRECT_CODEC: Codec;
    static readonly LIST_CODEC: Codec;
    static readonly CODEC: Codec;
    resolve(var1: DynamicOps<JsonElement>, var2: RecipeSchema): DataResult<ResolvedRecipeSchemaFunction>;
    type(): RecipeSchemaFunctionType<any>;
  }


  class RecipeSchemaFunctionRegistry {
    register(var1: RecipeSchemaFunctionType<any>): void;
  }


  interface RecipeSchemaJSFunction extends BaseFunction {}
  class RecipeSchemaJSFunction extends BaseFunction {
    readonly recipe: KubeRecipe;
    readonly argTypes: TypeInfo[];
    readonly func: ResolvedRecipeSchemaFunction;
    constructor(recipe: KubeRecipe, argTypes: TypeInfo[], func: ResolvedRecipeSchemaFunction);
    call(cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): KubeRecipe;
  }


  class ResolvedRecipeSchemaFunction {
    arguments(): RecipeComponent<any>[];
    execute(var1: RecipeScriptContext, var2: any[]): void;
  }

}

declare module 'dev.latvian.mods.kubejs.recipe.schema' {
  import { RecipeTypeRegistryContext, RecipeKey, KubeRecipe, RecipeTypeFunction, RecipeScriptContext } from 'dev.latvian.mods.kubejs.recipe';
  import { DynamicOps, Codec } from 'com.mojang.serialization';
  import { JsonElement, JsonObject } from 'com.google.gson';
  import { ResourceManager } from 'net.minecraft.server.packs.resources';
  import { List, Map, LinkedHashMap, SequencedCollection } from 'java.util';
  import { OpsContainer, RegistryAccessContainer } from 'dev.latvian.mods.kubejs.util';
  import { Context } from 'dev.latvian.mods.rhino';
  import { SourceLine } from 'dev.latvian.mods.kubejs.script';
  import { ComponentValueMap } from 'dev.latvian.mods.kubejs.recipe.component';
  import { ResourceLocation, RegistryOps, ResourceKey } from 'net.minecraft.resources';
  import { Class } from 'java.lang';
  import { Supplier } from 'java.util.function';
  import { KubeEvent } from 'dev.latvian.mods.kubejs.event';
  import { Int2ObjectMap } from 'it.unimi.dsi.fastutil.ints';
  import { RecipeFunctionInstance } from 'dev.latvian.mods.kubejs.recipe.schema.function';
  import { RecipePostProcessor } from 'dev.latvian.mods.kubejs.recipe.schema.postprocessing';
  import { ServerScriptManager } from 'dev.latvian.mods.kubejs.server';
  import { RecipeSerializer } from 'net.minecraft.world.item.crafting';
  import { RecipeMatchContext } from 'dev.latvian.mods.kubejs.recipe.filter';
  import { ReplacementMatchInfo } from 'dev.latvian.mods.kubejs.recipe.match';

  class JsonRecipeSchemaLoader {
    static load(ctx: RecipeTypeRegistryContext, jsonOps: DynamicOps<JsonElement>, event: RecipeSchemaRegistry, resourceManager: ResourceManager): void;
  }


  class RecipeConstructor {
    readonly keys: List;
    overrides: Map;
    defaultValues: Map;
    constructor(keys: RecipeKey<any>[]);

    constructor(...keys: RecipeKey<any>[]);
    create(cx: Context, sourceLine: SourceLine, type: RecipeTypeFunction, schemaType: RecipeSchemaType, from: ComponentValueMap): KubeRecipe;
    defaultValue<T>(key: RecipeKey<T>, value: RecipeOptional<T>): RecipeConstructor;
    override<T>(key: RecipeKey<T>, value: RecipeOptional<T>): RecipeConstructor;
    overrideValue<T>(key: RecipeKey<T>, value: T): RecipeConstructor;
    setValues(cx: RecipeScriptContext, schemaType: RecipeSchemaType, from: ComponentValueMap): void;
    toJson(type: RecipeSchemaType, ops: DynamicOps<JsonElement>): JsonObject;
    toString(): string;
    toString(ops: OpsContainer): string;
  }


  class RecipeFactoryRegistry {
    constructor(storage: RecipeSchemaStorage);
    register(type: KubeRecipeFactory): void;
    register(id: ResourceLocation, typeClass: Class<any>, factory: Supplier<KubeRecipe>): void;
  }


  interface RecipeMappingRegistry extends KubeEvent {}
  class RecipeMappingRegistry extends KubeEvent {
    constructor(storage: RecipeSchemaStorage);
    register(name: string, type: ResourceLocation): void;
    register(name: string, type: string): void;
  }


  interface RecipeNamespace extends LinkedHashMap<string, RecipeSchemaType> {}
  class RecipeNamespace extends LinkedHashMap<string, RecipeSchemaType> {
    readonly storage: RecipeSchemaStorage;
    readonly name: string;
    constructor(storage: RecipeSchemaStorage, name: string);
    getRegisteredOrThrow(id: string): RecipeSchemaType;
    register(id: string, type: RecipeSchema): RecipeNamespace;
    register(id: string, type: RegistryAwareSchema): RecipeNamespace;
    registerBasic(id: string, ...keys: RecipeKey<any>[]): RecipeNamespace;
    shaped(id: string): RecipeNamespace;
    shapeless(id: string): RecipeNamespace;
    special(id: string): RecipeNamespace;
    toString(): string;
    withExistingParent(id: string, parent: ResourceLocation): RecipeNamespace;
  }


  class RecipeOptional<T = any> {
    static readonly DEFAULT: RecipeOptional;
    get informativeValue(): T;
    getDefaultValue(var1: RecipeSchemaType): T;
    isDefault(): boolean;
    static unit<T>(value: T): RecipeOptional<T>;
  }


  class RecipeSchema {
    recipeFactory: KubeRecipeFactory;
    typeOverride: ResourceLocation;
    readonly keys: List;
    readonly includedKeys: List;
    readonly keyOverrides: Map;
    readonly functions: Map;
    constructor(keyOverrides: Map<RecipeKey<any>, RecipeOptional<any>>, keys: RecipeKey<any>[]);

    constructor(...keys: RecipeKey<any>[]);
    addToListOpFunction<T>(name: string, key: RecipeKey<T[]>): RecipeSchema;
    buildUniqueId(r: KubeRecipe): string;
    constructor(constructor: RecipeConstructor): RecipeSchema;
    constructor(...keys: RecipeKey<any>[]): RecipeSchema;
    constructors(): Int2ObjectMap<RecipeConstructor>;
    constructorsGenerated(): boolean;
    deserialize(sourceLine: SourceLine, type: RecipeTypeFunction, id: ResourceLocation, json: JsonObject): KubeRecipe;
    factory(factory: KubeRecipeFactory): RecipeSchema;
    function(functionParameter: RecipeFunctionInstance): RecipeSchema;
    getKey<T>(id: string): RecipeKey<T>;
    getOptionalKey<T>(id: string): RecipeKey<T>;
    inputCount(): number;
    isHidden(): boolean;
    minRequiredArguments(): number;
    outputCount(): number;
    postProcessor(processor: RecipePostProcessor): RecipeSchema;
    postProcessors(): RecipePostProcessor[];
    setOpFunction<T>(name: string, key: RecipeKey<T>, value: T): RecipeSchema;
    toJson(storage: RecipeSchemaStorage, schemaType: RecipeSchemaType, ops: RegistryOps<JsonElement>): JsonObject;
    typeOverride(id: ResourceLocation): RecipeSchema;
    uniqueId(key: RecipeKey<any>): RecipeSchema;
    uniqueIds(keys: SequencedCollection<RecipeKey<any>>): RecipeSchema;
    uniqueIds(): RecipeKey<any>[];
  }


  interface RecipeSchemaRegistry extends KubeEvent {}
  class RecipeSchemaRegistry extends KubeEvent {
    constructor(storage: RecipeSchemaStorage);
    namespace(namespace: string): RecipeNamespace;
    register(id: ResourceLocation, schema: RecipeSchema): void;
    register(id: ResourceLocation, schema: RegistryAwareSchema): void;
  }


  class RecipeSchemaStorage {
    readonly recipeTypes: Map;
    readonly namespaces: Map;
    readonly mappings: Map;
    readonly schemaTypes: Map;
    recipeComponentCodec: Codec;
    recipePostProcessorCodec: Codec;
    constructor(manager: ServerScriptManager);
    fireEvents(registries: RegistryAccessContainer, resourceManager: ResourceManager): void;
    namespace(namespace: string): RecipeNamespace;
  }


  class RecipeSchemaType {
    readonly namespace: RecipeNamespace;
    readonly id: ResourceLocation;
    readonly schema: RecipeSchema;
    readonly serializerKey: ResourceKey;
    readonly serializerType: string;
    parent: RecipeSchemaType;
    constructor(namespace: RecipeNamespace, id: ResourceLocation, schema: RecipeSchema);
    get serializer(): RecipeSerializer<any>;
    toString(): string;
  }


  class RegistryAwareSchema {
    create(var1: RegistryAccessContainer): RecipeSchema;
  }


  interface UnknownKubeRecipe extends KubeRecipe {}
  class UnknownKubeRecipe extends KubeRecipe {
    static readonly RECIPE_FACTORY: KubeRecipeFactory;
    deserialize(merge: boolean): void;
    hasInput(cx: RecipeMatchContext, match: ReplacementMatchInfo): boolean;
    hasOutput(cx: RecipeMatchContext, match: ReplacementMatchInfo): boolean;
    replaceInput(cx: RecipeScriptContext, match: ReplacementMatchInfo, withParameter: any): boolean;
    replaceOutput(cx: RecipeScriptContext, match: ReplacementMatchInfo, withParameter: any): boolean;
    serialize(): void;
  }


  interface UnknownRecipeSchema extends RecipeSchema {}
  class UnknownRecipeSchema extends RecipeSchema {
    static readonly SCHEMA: RecipeSchema;
  }


  interface UnknownRecipeSchemaType extends RecipeSchemaType {}
  class UnknownRecipeSchemaType extends RecipeSchemaType {
    constructor(namespace: RecipeNamespace, id: ResourceLocation, serializer: RecipeSerializer<any>);
  }

}

declare module 'dev.latvian.mods.kubejs.recipe.schema.minecraft' {
  import { KubeRecipe, RecipeTypeFunction } from 'dev.latvian.mods.kubejs.recipe';
  import { KubeRecipeFactory } from 'dev.latvian.mods.kubejs.recipe.schema';

  interface ShapedKubeRecipe extends KubeRecipe {}
  class ShapedKubeRecipe extends KubeRecipe {
    static readonly RECIPE_FACTORY: KubeRecipeFactory;
    get serializationTypeFunction(): RecipeTypeFunction;
  }


  interface ShapelessKubeRecipe extends KubeRecipe {}
  class ShapelessKubeRecipe extends KubeRecipe {
    static readonly RECIPE_FACTORY: KubeRecipeFactory;
    get serializationTypeFunction(): RecipeTypeFunction;
  }

}

declare module 'dev.latvian.mods.kubejs.recipe.schema.postprocessing' {
  import { RecipeValidationContext } from 'dev.latvian.mods.kubejs.recipe.component';
  import { KubeRecipe } from 'dev.latvian.mods.kubejs.recipe';

  class RecipePostProcessor {
    process(var1: RecipeValidationContext, var2: KubeRecipe): void;
    type(): RecipePostProcessorType<any>;
  }


  class RecipePostProcessorTypeRegistry {
    register(var1: RecipePostProcessorType<any>): void;
  }

}

declare module 'dev.latvian.mods.kubejs.recipe.schema.RecipeOptional' {
  import { RecipeOptional, RecipeSchemaType } from 'dev.latvian.mods.kubejs.recipe.schema';

  interface Unit<T = any> extends RecipeOptional<T> {}
  class Unit<T = any> extends RecipeOptional<T> {
    get informativeValue(): T;
    getDefaultValue(type: RecipeSchemaType): T;
    value(): T;
  }

}

declare module 'dev.latvian.mods.kubejs.recipe.schema.RecipeSchemaStorage' {
  import { RecipeComponentType } from 'dev.latvian.mods.kubejs.recipe.component';
  import { RecipeTypeRegistryContext } from 'dev.latvian.mods.kubejs.recipe';

  class StoredRecipeComponentType {
    constructor(type: RecipeComponentType<any>);
    init(ctx: RecipeTypeRegistryContext): void;
    toString(): string;
  }

}

declare module 'dev.latvian.mods.kubejs.recipe.special' {
  import { CraftingRecipe, CraftingInput, ShapedRecipe, CraftingBookCategory, ShapedRecipePattern, RecipeSerializer, ShapelessRecipe, Recipe } from 'net.minecraft.world.item.crafting';
  import { List } from 'java.util';
  import { IngredientActionHolder } from 'dev.latvian.mods.kubejs.recipe.ingredientaction';
  import { NonNullList } from 'net.minecraft.core';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Provider } from 'HolderLookup';
  import { KubeEvent, EventResult } from 'dev.latvian.mods.kubejs.event';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface KubeJSCraftingRecipe extends CraftingRecipe {}
  class KubeJSCraftingRecipe extends CraftingRecipe {
    static readonly STAGE_KEY: string;
    static readonly MIRROR_KEY: string;
    static readonly INGREDIENT_ACTIONS_KEY: string;
    static readonly MODIFY_RESULT_KEY: string;
    kjs$assemble(input: CraftingInput, registryAccess: Provider): ItemStack;
    kjs$getIngredientActions(): IngredientActionHolder[];
    kjs$getModifyResult(): string;
    kjs$getRemainingItems(input: CraftingInput): NonNullList<ItemStack>;
    kjs$getStage(): string;
  }


  class RecipeFlags {
    static readonly INGREDIENT_ACTIONS: number;
    static readonly STAGE: number;
    static readonly MIRROR: number;
  }


  interface ShapedKubeJSRecipe extends KubeJSCraftingRecipe, ShapedRecipe {}
  class ShapedKubeJSRecipe extends KubeJSCraftingRecipe {
    constructor(group: string, category: CraftingBookCategory, pattern: ShapedRecipePattern, result: ItemStack, showNotification: boolean, mirror: boolean, ingredientActions: IngredientActionHolder[], modifyResult: string, stage: string);
    assemble(input: CraftingInput, registryAccess: Provider): ItemStack;
    get serializer(): RecipeSerializer<any>;
    getRemainingItems(input: CraftingInput): NonNullList<ItemStack>;
    kjs$getIngredientActions(): IngredientActionHolder[];
    kjs$getMirror(): boolean;
    kjs$getModifyResult(): string;
    kjs$getStage(): string;
  }


  interface ShapelessKubeJSRecipe extends KubeJSCraftingRecipe, ShapelessRecipe {}
  class ShapelessKubeJSRecipe extends KubeJSCraftingRecipe {
    constructor(original: ShapelessRecipe, ingredientActions: IngredientActionHolder[], modifyResult: string, stage: string);
    assemble(input: CraftingInput, registryAccess: Provider): ItemStack;
    get serializer(): RecipeSerializer<any>;
    getRemainingItems(input: CraftingInput): NonNullList<ItemStack>;
    kjs$getIngredientActions(): IngredientActionHolder[];
    kjs$getModifyResult(): string;
    kjs$getStage(): string;
  }


  interface SpecialRecipeSerializerManager extends KubeEvent {}
  class SpecialRecipeSerializerManager extends KubeEvent {
    static readonly INSTANCE: SpecialRecipeSerializerManager;
    addSpecialFlag(id: ResourceLocation): void;
    addSpecialMod(modid: string): void;
    afterPosted(result: EventResult): void;
    ignoreSpecialFlag(id: ResourceLocation): void;
    ignoreSpecialMod(modid: string): void;
    isSpecial(recipe: Recipe<any>): boolean;
    reset(): void;
  }

}

declare module 'dev.latvian.mods.kubejs.recipe.special.ShapedKubeJSRecipe' {
  import { RecipeSerializer } from 'net.minecraft.world.item.crafting';
  import { ShapedKubeJSRecipe } from 'dev.latvian.mods.kubejs.recipe.special';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  interface SerializerKJS extends RecipeSerializer<ShapedKubeJSRecipe> {}
  class SerializerKJS extends RecipeSerializer<ShapedKubeJSRecipe> {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    codec(): MapCodec<ShapedKubeJSRecipe>;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, ShapedKubeJSRecipe>;
  }

}

declare module 'dev.latvian.mods.kubejs.recipe.special.ShapelessKubeJSRecipe' {
  import { RecipeSerializer } from 'net.minecraft.world.item.crafting';
  import { ShapelessKubeJSRecipe } from 'dev.latvian.mods.kubejs.recipe.special';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  interface SerializerKJS extends RecipeSerializer<ShapelessKubeJSRecipe> {}
  class SerializerKJS extends RecipeSerializer<ShapelessKubeJSRecipe> {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    codec(): MapCodec<ShapelessKubeJSRecipe>;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, ShapelessKubeJSRecipe>;
  }

}

declare module 'dev.latvian.mods.kubejs.recipe.special.SpecialRecipeSerializerManager' {
  import { Event } from 'net.neoforged.bus.api';

  interface AfterPost extends Event {}
  class AfterPost extends Event {
  }

}

declare module 'dev.latvian.mods.kubejs.recipe.viewer' {
  import { KubeEvent } from 'dev.latvian.mods.kubejs.event';
  import { Context } from 'dev.latvian.mods.rhino';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Lazy } from 'dev.latvian.mods.kubejs.util';
  import { Component as dev_latvian_mods_kubejs_recipe_viewer_recipeviewerentrytype_Component } from 'dev.latvian.mods.kubejs.recipe.viewer.RecipeViewerEntryType';
  import { DataComponentType } from 'net.minecraft.core.component';

  interface AddEntriesKubeEvent extends KubeEvent {}
  class AddEntriesKubeEvent extends KubeEvent {
    add(var1: Context, var2: any[]): void;
  }


  interface AddInformationKubeEvent extends KubeEvent {}
  class AddInformationKubeEvent extends KubeEvent {
    add(var1: Context, var2: any, var3: Component[]): void;
  }


  interface GroupEntriesKubeEvent extends KubeEvent {}
  class GroupEntriesKubeEvent extends KubeEvent {
    group(var1: Context, var2: any, var3: ResourceLocation, var4: Component): void;
  }


  class RecipeViewerEntryType {
    static readonly ITEM: RecipeViewerEntryType;
    static readonly FLUID: RecipeViewerEntryType;
    static CUSTOM_TYPES: Lazy;
    static readonly ALL_TYPES: Lazy;
    readonly id: string;
    readonly entryType: dev_latvian_mods_kubejs_recipe_viewer_recipeviewerentrytype_Component;
    readonly predicateType: dev_latvian_mods_kubejs_recipe_viewer_recipeviewerentrytype_Component;
    readonly baseClass: dev_latvian_mods_kubejs_recipe_viewer_recipeviewerentrytype_Component;
    constructor(id: string, entryType: dev_latvian_mods_kubejs_recipe_viewer_recipeviewerentrytype_Component<any>, predicateType: dev_latvian_mods_kubejs_recipe_viewer_recipeviewerentrytype_Component<any>, baseClass: dev_latvian_mods_kubejs_recipe_viewer_recipeviewerentrytype_Component<any>);
    static fromString(id: any): RecipeViewerEntryType;
    getBase(from: any): any;
    wrapEntry(cx: Context, from: any): any;
    wrapPredicate(cx: Context, from: any): any;
  }


  interface RegisterSubtypesKubeEvent extends KubeEvent {}
  class RegisterSubtypesKubeEvent extends KubeEvent {
    register(var1: Context, var2: any, var3: SubtypeInterpreter): void;
    useComponents(cx: Context, filter: any): void;
    useComponents(var1: Context, var2: any, var3: DataComponentType<any>[]): void;
  }


  interface RemoveCategoriesKubeEvent extends KubeEvent {}
  class RemoveCategoriesKubeEvent extends KubeEvent {
    remove(var1: Context, var2: ResourceLocation[]): void;
  }


  interface RemoveEntriesKubeEvent extends KubeEvent {}
  class RemoveEntriesKubeEvent extends KubeEvent {
    remove(var1: Context, var2: any): void;
  }


  interface RemoveRecipesKubeEvent extends KubeEvent {}
  class RemoveRecipesKubeEvent extends KubeEvent {
    remove(cx: Context, recipesToRemove: ResourceLocation[]): void;
    removeFromCategory(var1: Context, var2: ResourceLocation, var3: ResourceLocation[]): void;
  }


  class SubtypeInterpreter {
    apply(var1: any): any;
  }

}

declare module 'dev.latvian.mods.kubejs.recipe.viewer.server' {
  import { Event } from 'net.neoforged.bus.api';
  import { AddEntriesKubeEvent, AddInformationKubeEvent, GroupEntriesKubeEvent, RegisterSubtypesKubeEvent, SubtypeInterpreter, RemoveCategoriesKubeEvent, RemoveEntriesKubeEvent, RemoveRecipesKubeEvent } from 'dev.latvian.mods.kubejs.recipe.viewer';
  import { List, Set, Map } from 'java.util';
  import { FluidStack } from 'net.neoforged.neoforge.fluids';
  import { Context } from 'dev.latvian.mods.rhino';
  import { Info, Group, DataComponentSubtypes } from 'dev.latvian.mods.kubejs.recipe.viewer.server.FluidData';
  import { Component } from 'net.minecraft.network.chat';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Info as dev_latvian_mods_kubejs_recipe_viewer_server_itemdata_Info, Group as dev_latvian_mods_kubejs_recipe_viewer_server_itemdata_Group, DataComponentSubtypes as dev_latvian_mods_kubejs_recipe_viewer_server_itemdata_DataComponentSubtypes } from 'dev.latvian.mods.kubejs.recipe.viewer.server.ItemData';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { DataComponentType } from 'net.minecraft.core.component';
  import { FluidIngredient } from 'net.neoforged.neoforge.fluids.crafting';
  import { Ingredient } from 'net.minecraft.world.item.crafting';

  interface RemoteRecipeViewerDataUpdatedEvent extends Event {}
  class RemoteRecipeViewerDataUpdatedEvent extends Event {
    readonly data: RecipeViewerData;
    constructor(data: RecipeViewerData);
  }


  interface ServerAddFluidEntriesKubeEvent extends AddEntriesKubeEvent {}
  class ServerAddFluidEntriesKubeEvent extends AddEntriesKubeEvent {
    constructor(list: FluidStack[]);
    add(cx: Context, items: any[]): void;
  }


  interface ServerAddFluidInformationKubeEvent extends AddInformationKubeEvent {}
  class ServerAddFluidInformationKubeEvent extends AddInformationKubeEvent {
    constructor(list: Info[]);
    add(cx: Context, filter: any, info: Component[]): void;
  }


  interface ServerAddItemEntriesKubeEvent extends AddEntriesKubeEvent {}
  class ServerAddItemEntriesKubeEvent extends AddEntriesKubeEvent {
    constructor(list: ItemStack[]);
    add(cx: Context, items: any[]): void;
  }


  interface ServerAddItemInformationKubeEvent extends AddInformationKubeEvent {}
  class ServerAddItemInformationKubeEvent extends AddInformationKubeEvent {
    constructor(list: dev_latvian_mods_kubejs_recipe_viewer_server_itemdata_Info[]);
    add(cx: Context, filter: any, info: Component[]): void;
  }


  interface ServerGroupFluidEntriesKubeEvent extends GroupEntriesKubeEvent {}
  class ServerGroupFluidEntriesKubeEvent extends GroupEntriesKubeEvent {
    constructor(list: Group[]);
    group(cx: Context, filter: any, groupId: ResourceLocation, description: Component): void;
  }


  interface ServerGroupItemEntriesKubeEvent extends GroupEntriesKubeEvent {}
  class ServerGroupItemEntriesKubeEvent extends GroupEntriesKubeEvent {
    constructor(list: dev_latvian_mods_kubejs_recipe_viewer_server_itemdata_Group[]);
    group(cx: Context, filter: any, groupId: ResourceLocation, description: Component): void;
  }


  interface ServerRegisterFluidSubtypesKubeEvent extends RegisterSubtypesKubeEvent {}
  class ServerRegisterFluidSubtypesKubeEvent extends RegisterSubtypesKubeEvent {
    constructor(list: DataComponentSubtypes[]);
    register(cx: Context, filter: any, interpreter: SubtypeInterpreter): void;
    useComponents(cx: Context, filter: any, components: DataComponentType<any>[]): void;
    useComponents(cx: Context, filter: any): void;
  }


  interface ServerRegisterItemSubtypesKubeEvent extends RegisterSubtypesKubeEvent {}
  class ServerRegisterItemSubtypesKubeEvent extends RegisterSubtypesKubeEvent {
    constructor(list: dev_latvian_mods_kubejs_recipe_viewer_server_itemdata_DataComponentSubtypes[]);
    register(cx: Context, filter: any, interpreter: SubtypeInterpreter): void;
    useComponents(cx: Context, filter: any, components: DataComponentType<any>[]): void;
    useComponents(cx: Context, filter: any): void;
  }


  interface ServerRemoveCategoriesKubeEvent extends RemoveCategoriesKubeEvent {}
  class ServerRemoveCategoriesKubeEvent extends RemoveCategoriesKubeEvent {
    constructor(categories: Set<ResourceLocation>);
    remove(cx: Context, categories: ResourceLocation[]): void;
  }


  interface ServerRemoveFluidEntriesKubeEvent extends RemoveEntriesKubeEvent {}
  class ServerRemoveFluidEntriesKubeEvent extends RemoveEntriesKubeEvent {
    constructor(removedEntries: FluidIngredient[]);
    remove(cx: Context, filter: any): void;
  }


  interface ServerRemoveItemEntriesKubeEvent extends RemoveEntriesKubeEvent {}
  class ServerRemoveItemEntriesKubeEvent extends RemoveEntriesKubeEvent {
    constructor(removedEntries: Ingredient[]);
    remove(cx: Context, filter: any): void;
  }


  interface ServerRemoveRecipesKubeEvent extends RemoveRecipesKubeEvent {}
  class ServerRemoveRecipesKubeEvent extends RemoveRecipesKubeEvent {
    constructor(global: Set<ResourceLocation>, categoryData: Map<ResourceLocation, CategoryData>);
    remove(cx: Context, recipesToRemove: ResourceLocation[]): void;
    removeFromCategory(cx: Context, category: ResourceLocation, recipesToRemove: ResourceLocation[]): void;
  }

}

declare module 'dev.latvian.mods.kubejs.registry' {
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { Registry } from 'net.minecraft.core';
  import { Supplier, Consumer } from 'java.util.function';
  import { SourceLine } from 'dev.latvian.mods.kubejs.script';
  import { Component } from 'net.minecraft.network.chat';
  import { Set, Map, List, Iterator } from 'java.util';
  import { KubeDataGenerator, KubeAssetGenerator } from 'dev.latvian.mods.kubejs.generator';
  import { LangKubeEvent, ModelGenerator } from 'dev.latvian.mods.kubejs.client';
  import { Callback } from 'dev.latvian.mods.kubejs.registry.BuilderTypeRegistry';
  import { Class, Iterable } from 'java.lang';
  import { RegisterEvent } from 'net.neoforged.neoforge.registries';
  import { EntityAttributeModificationEvent } from 'net.neoforged.neoforge.event.entity';
  import { KubeStartupEvent, EventResult, KubeEvent } from 'dev.latvian.mods.kubejs.event';
  import { Context } from 'dev.latvian.mods.rhino';
  import { KubeResourceLocation } from 'dev.latvian.mods.kubejs.util';
  import { Codec, DynamicOps } from 'com.mojang.serialization';
  import { JsonElement } from 'com.google.gson';
  import { TypeInfo } from 'dev.latvian.mods.rhino.type';

  class AdditionalObjectRegistry {
    add<T>(var1: ResourceKey<Registry<T>>, var2: BuilderBase<T>): void;
  }


  interface BuilderBase<T = any> extends Supplier<T> {}
  class BuilderBase<T = any> extends Supplier<T> {
    readonly id: ResourceLocation;
    sourceLine: SourceLine;
    registryKey: ResourceKey;
    translationKey: string;
    displayName: Component;
    formattedDisplayName: boolean;
    dummyBuilder: boolean;
    defaultTags: Set;
    constructor(id: ResourceLocation);
    createAdditionalObjects(registry: AdditionalObjectRegistry): void;
    createObject(): T;
    createTransformedObject(): T;
    displayName(name: Component): BuilderBase<T>;
    formattedDisplayName(): BuilderBase<T>;
    formattedDisplayName(name: Component): BuilderBase<T>;
    generateAssets(generator: KubeAssetGenerator): void;
    generateData(generator: KubeDataGenerator): void;
    generateLang(lang: LangKubeEvent): void;
    get (): T;
    get builderTranslationKey(): string;
    get translationKeyGroup(): string;
    newID(pre: string, post: string): ResourceLocation;
    tag(tag: ResourceLocation[]): BuilderBase<T>;
    toString(): string;
    transformObject(obj: T): T;
    translationKey(key: string): BuilderBase<T>;
  }


  class BuilderFactory {
    createBuilder(var1: ResourceLocation): BuilderBase;
  }


  class BuilderTypeRegistry {
    addDefault<T>(registry: ResourceKey<Registry<T>>, builderType: Class<BuilderBase<T>>, factory: BuilderFactory): void;
    of<T>(var1: ResourceKey<Registry<T>>, var2: Consumer<Callback<T>>): void;
  }


  interface CustomBuilderObject extends BuilderBase {}
  class CustomBuilderObject extends BuilderBase {
    constructor(i: ResourceLocation, object: Supplier<any>);
    createObject(): any;
  }


  interface ModelledBuilderBase<T = any> extends BuilderBase<T> {}
  class ModelledBuilderBase<T = any> extends BuilderBase<T> {
    parentModel: ResourceLocation;
    textures: Map;
    baseTexture: string;
    modelGenerator: Consumer;
    constructor(id: ResourceLocation);
    modelGenerator(generator: Consumer<ModelGenerator>): ModelledBuilderBase<T>;
    parentModel(id: ResourceLocation): ModelledBuilderBase<T>;
    texture(tex: string): ModelledBuilderBase<T>;
    texture(key: string[], tex: string): ModelledBuilderBase<T>;
    textures(map: Map<string, string>): ModelledBuilderBase<T>;
  }


  class RegistryCallback<T = any> {
    accept(var1: ResourceLocation, var2: Supplier<T>): void;
  }


  class RegistryEventHandler {
    static registerAll(event: RegisterEvent): void;
    static registerEntityAttributes(event: EntityAttributeModificationEvent): void;
  }


  interface RegistryKubeEvent<T = any> extends KubeStartupEvent, AdditionalObjectRegistry {}
  class RegistryKubeEvent<T = any> extends KubeStartupEvent {
    readonly created: List;
    constructor(registryKey: ResourceKey<Registry<T>>);
    add<R>(registry: ResourceKey<Registry<R>>, builder: BuilderBase<R>): void;
    add<T>(var1: ResourceKey<Registry<T>>, var2: BuilderBase<T>): void;
    afterPosted(result: EventResult): void;
    create(cx: Context, id: KubeResourceLocation, type: KubeResourceLocation): BuilderBase<T>;
    create(cx: Context, id: KubeResourceLocation): BuilderBase<T>;
    createCustom(cx: Context, id: KubeResourceLocation, object: Supplier<any>): CustomBuilderObject;
  }


  interface RegistryObjectStorage<T = any> extends Iterable<BuilderBase> {}
  class RegistryObjectStorage<T = any> extends Iterable<BuilderBase> {
    static readonly ALL_BUILDERS: List;
    static readonly CODEC: Codec;
    static readonly FLUID: RegistryObjectStorage;
    static readonly BLOCK: RegistryObjectStorage;
    static readonly ITEM: RegistryObjectStorage;
    static readonly BLOCK_ENTITY: RegistryObjectStorage;
    static readonly FLUID_TYPE: RegistryObjectStorage;
    readonly key: ResourceKey;
    readonly objects: Map;
    iterator(): Iterator<BuilderBase<T>>;
    static of<T>(key: ResourceKey<Registry<T>>): RegistryObjectStorage<T>;
    toString(): string;
  }


  interface ServerRegistryKubeEvent<T = any> extends KubeEvent {}
  class ServerRegistryKubeEvent<T = any> extends KubeEvent {
    readonly registryKey: ResourceKey;
    readonly jsonOps: DynamicOps;
    readonly codec: Codec;
    constructor(registryKey: ResourceKey<Registry<T>>, jsonOps: DynamicOps<JsonElement>, codec: Codec<T>, builders: BuilderBase<any>[]);
    create(cx: Context, id: KubeResourceLocation, type: KubeResourceLocation): BuilderBase<T>;
    create(cx: Context, id: KubeResourceLocation): BuilderBase<T>;
    createCustom(cx: Context, id: KubeResourceLocation, object: Supplier<any>): CustomBuilderObject;
    createFromJson(cx: Context, id: KubeResourceLocation, json: JsonElement): CustomBuilderObject;
  }


  class ServerRegistryRegistry {
    register<T>(var1: ResourceKey<Registry<T>>, var2: Codec<T>, var3: TypeInfo): void;
    register<T>(registry: ResourceKey<Registry<T>>, directCodec: Codec<T>, type: Class<T>): void;
  }

}

declare module 'dev.latvian.mods.kubejs.registry.BuilderTypeRegistry' {
  import { Class } from 'java.lang';
  import { BuilderBase, BuilderFactory } from 'dev.latvian.mods.kubejs.registry';
  import { ResourceLocation } from 'net.minecraft.resources';

  class Callback<T = any> {
    add(var1: ResourceLocation, var2: Class<BuilderBase<T>>, var3: BuilderFactory): void;
    add(type: string, builderType: Class<BuilderBase<T>>, factory: BuilderFactory): void;
    addDefault(var1: Class<BuilderBase<T>>, var2: BuilderFactory): void;
  }

}

declare module 'dev.latvian.mods.kubejs.registry.BuilderTypeRegistryHandler' {
  import { BuilderType } from 'dev.latvian.mods.kubejs.registry';
  import { List } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Codec } from 'com.mojang.serialization';
  import { TypeInfo } from 'dev.latvian.mods.rhino.type';

  class Info<T = any> {
    defaultType(): BuilderType<T>;
    directCodec(): Codec<T>;
    namedType(name: ResourceLocation): BuilderType<T>;
    typeInfo(): TypeInfo;
    types(): BuilderType<T>[];
  }

}

declare module 'dev.latvian.mods.kubejs.registry.RegistryType' {
  import { ResourceLocation } from 'net.minecraft.resources';

  class Scanner {
    static init(): void;
    static scan(registryName: ResourceLocation, location: ResourceLocation): void;
  }

}

declare module 'dev.latvian.mods.kubejs.script' {
  import { Function, Supplier, Predicate } from 'java.util.function';
  import { Collection, List, Map, Set } from 'java.util';
  import { Logger } from 'org.slf4j';
  import { WeakReference } from 'java.lang.ref';
  import { WSHandler } from 'dev.latvian.apps.tinyserver.ws';
  import { Context, Scriptable, NativeJavaClass, ContextFactory } from 'dev.latvian.mods.rhino';
  import { Pattern } from 'java.util.regex';
  import { Class, Throwable, Thread, Boolean, Runnable, Comparable, Enum } from 'java.lang';
  import { LogType, RegistryAccessContainer } from 'dev.latvian.mods.kubejs.util';
  import { Component } from 'net.minecraft.network.chat';
  import { HTTPResponse } from 'dev.latvian.apps.tinyserver.http.response';
  import { KJSHTTPRequest } from 'dev.latvian.mods.kubejs.web';
  import { JsonElement, JsonObject } from 'com.google.gson';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Path } from 'java.nio.file';
  import { DataComponentType } from 'net.minecraft.core.component';
  import { TypeInfo } from 'dev.latvian.mods.rhino.type';
  import { ClassVisibilityContext } from 'dev.latvian.mods.rhino.util';
  import { RegistryType } from 'dev.latvian.mods.kubejs.registry';
  import { Registry } from 'net.minecraft.core';
  import { Either } from 'com.mojang.datafixers.util';
  import { ModInfo } from 'dev.latvian.mods.kubejs.script.PlatformWrapper';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Event } from 'net.neoforged.bus.api';
  import { TypeWrappers, TypeWrapperValidator, TypeWrapperFactory, DirectTypeWrapperFactory } from 'dev.latvian.mods.rhino.util.wrap';
  import { ContextFromFunction, RegistriesFromFunction } from 'dev.latvian.mods.kubejs.script.TypeWrapperRegistry';
  import { Codec, MapCodec } from 'com.mojang.serialization';

  class ConsoleJS {
    static STARTUP: ConsoleJS;
    static SERVER: ConsoleJS;
    static CLIENT: ConsoleJS;
    static readonly ERROR_REDUCE: Function;
    readonly scriptType: ScriptType;
    readonly errors: Collection;
    readonly warnings: Collection;
    readonly logger: Logger;
    contextFactory: WeakReference;
    wsBroadcaster: WSHandler;
    constructor(m: ScriptType, log: Logger);
    debug(message: any): ConsoleLine;
    debugf(message: string, ...args: any[]): ConsoleLine;
    error(message: any): ConsoleLine;
    error(message: string, error: Throwable, exitPattern: Pattern): ConsoleLine;
    error(message: string, sourceLine: SourceLine, error: Throwable, exitPattern: Pattern): ConsoleLine;
    error(message: string, throwable: Throwable): ConsoleLine;
    errorf(message: string, ...args: any[]): ConsoleLine;
    errorsComponent(command: string): Component;
    flush(sync: boolean): void;
    get debugEnabled(): boolean;
    get logger(): Logger;
    get muted(): boolean;
    get scriptLine(): number;
    static getCurrent(cx: Context): ConsoleJS;
    getErrorsResponse(ctx: KJSHTTPRequest): HTTPResponse;
    getWarningsResponse(ctx: KJSHTTPRequest): HTTPResponse;
    getWriteToFile(): boolean;
    group(): void;
    groupEnd(): void;
    handleError(line: ConsoleLine, error: Throwable, exitPattern: Pattern, print: boolean): void;
    info(message: any): ConsoleLine;
    infof(message: string, ...args: any[]): ConsoleLine;
    log(...message: any[]): void;
    static methodPattern(c: Class<any>, method: string): Pattern;
    printClass(className: string, tree: boolean): void;
    printClass(className: string): void;
    printObject(o: any, tree: boolean): void;
    printObject(o: any): void;
    resetFile(): void;
    set debugEnabled(m: boolean);
    set muted(m: boolean);
    setWriteToFile(m: boolean): void;
    shouldPrintDebug(): boolean;
    startCapturingErrors(): void;
    stopCapturingErrors(): void;
    trace(): void;
    warn(message: any): ConsoleLine;
    warn(message: string, error: Throwable, exitPattern: Pattern): ConsoleLine;
    warn(message: string, sourceLine: SourceLine, error: Throwable, exitPattern: Pattern): ConsoleLine;
    warn(message: string, error: Throwable): ConsoleLine;
    warnf(message: string, ...args: any[]): ConsoleLine;
    writeToFile(type: LogType, line: string): void;
    writeToFile(type: LogType, timestamp: number, line: string): void;
  }


  interface ConsoleLine extends Supplier<JsonElement> {}
  class ConsoleLine extends Supplier<JsonElement> {
    static readonly EMPTY_ARRAY: ConsoleLine[];
    static readonly STREAM_CODEC: StreamCodec;
    readonly console: ConsoleJS;
    readonly timestamp: number;
    message: string;
    type: LogType;
    group: string;
    sourceLines: Collection;
    externalFile: Path;
    stackTrace: List;
    constructor(console: ConsoleJS, timestamp: number, message: string);
    customData(key: string, data: JsonElement, override: boolean): ConsoleLine;
    get (): JsonElement;
    get text(): string;
    toJson(): JsonObject;
    toString(): string;
    withExternalFile(path: Path): ConsoleLine;
    withSourceLine(source: string, line: number): ConsoleLine;
    withSourceLine(sourceLine: SourceLine): ConsoleLine;
  }


  class DataComponentTypeInfoRegistry {
    register(var1: DataComponentType<any>, var2: TypeInfo): void;
    scanClass(clz: Class<any>): void;
  }


  interface KubeJSBackgroundThread extends Thread {}
  class KubeJSBackgroundThread extends Thread {
    static running: boolean;
    constructor();
    run(): void;
    static shutdown(): void;
  }


  interface KubeJSContext extends Context {}
  class KubeJSContext extends Context {
    readonly kjsFactory: KubeJSContextFactory;
    readonly topLevelScope: Scriptable;
    constructor(factory: KubeJSContextFactory);
    classOf(from: any): any;
    get console(): ConsoleJS;
    get javaClassCache(): Map<string, Either<NativeJavaClass, boolean>>;
    get registries(): RegistryAccessContainer;
    get type(): ScriptType;
    internalConversionWeightLast(fromObj: any, target: TypeInfo): number;
    isMapLike(from: any): boolean;
    loadJavaClass(name: string, error: boolean): NativeJavaClass;
    lookupRegistry(type: TypeInfo, from: any): Registry<any>;
    lookupRegistryType(type: TypeInfo, from: any): RegistryType<any>;
    mapOf(from: any, kTarget: TypeInfo, vTarget: TypeInfo): any;
    visibleToScripts(fullClassName: string, type: ClassVisibilityContext): boolean;
    wrapAsJavaObject(scope: Scriptable, javaObject: any, target: TypeInfo): Scriptable;
  }


  interface KubeJSContextFactory extends ContextFactory {}
  class KubeJSContextFactory extends ContextFactory {
    readonly manager: ScriptManager;
    constructor(manager: ScriptManager);
  }


  interface KubeJSFileWatcherThread extends Thread {}
  class KubeJSFileWatcherThread extends Thread {
    readonly scriptType: ScriptType;
    readonly files: ScriptFile[];
    readonly reload: Runnable;
    constructor(scriptType: ScriptType, files: ScriptFile[], reload: Runnable);
    run(): void;
  }


  interface KubeJSServerContext extends KubeJSContext {}
  class KubeJSServerContext extends KubeJSContext {
    constructor(factory: KubeJSContextFactory);
  }


  class PlatformWrapper {
    static breakpoint(cx: Context, ...args: any[]): void;
    static get currentThreadName(): string;
    static get list(): Set<string>;
    static get mcVersion(): string;
    static get minecraftVersion(): number;
    static get minecraftVersionString(): string;
    static get modVersion(): string;
    static get mods(): Map<string, ModInfo>;
    static get name(): string;
    static get packMode(): string;
    static getInfo(modID: string): ModInfo;
    static isClientEnvironment(): boolean;
    static isDevelopmentEnvironment(): boolean;
    static isFabric(): boolean;
    static isForge(): boolean;
    static isGeneratingData(): boolean;
    static isLoaded(modId: string): boolean;
    static setModName(modId: string, name: string): void;
  }


  class RecordDefaultsRegistry {
    register(var1: Record): void;
  }


  interface ScriptFile extends Comparable<ScriptFile> {}
  class ScriptFile extends Comparable<ScriptFile> {
    readonly pack: ScriptPack;
    readonly info: ScriptFileInfo;
    lines: string[];
    lastModified: number;
    constructor(pack: ScriptPack, info: ScriptFileInfo);
    compareTo(o: ScriptFile): number;
    get priority(): number;
    getProperties(s: string): string[];
    getProperty(s: string, def: string): string;
    load(cx: KubeJSContext): void;
    skipLoading(): string;
  }


  class ScriptFileInfo {
    readonly pack: ScriptPackInfo;
    readonly path: Path;
    readonly file: string;
    readonly id: ResourceLocation;
    readonly locationPath: string;
    readonly location: string;
    constructor(p: ScriptPackInfo, ph: Path, f: string);
  }


  class ScriptManager {
    readonly scriptType: ScriptType;
    readonly packs: Map;
    contextFactory: KubeJSContextFactory;
    canListenEvents: boolean;
    constructor(t: ScriptType);
    collectScripts(pack: ScriptPack, dir: Path, path: string): void;
    get registries(): RegistryAccessContainer;
    isClassAllowed(name: string): boolean;
    loadAdditional(): void;
    loadFromDirectory(): void;
    loadPackFromDirectory(path: Path, name: string, exampleFile: boolean): void;
    reload(): void;
    unload(): void;
  }


  class ScriptPack {
    readonly manager: ScriptManager;
    readonly info: ScriptPackInfo;
    readonly scripts: List;
    constructor(m: ScriptManager, i: ScriptPackInfo);
  }


  class ScriptPackInfo {
    readonly namespace: string;
    readonly displayName: Component;
    readonly scripts: List;
    readonly pathStart: string;
    constructor(n: string, p: string);
  }


  interface ScriptsLoadedEvent extends Event {}
  class ScriptsLoadedEvent extends Event {
  }


  interface ScriptType extends Enum<ScriptType> {}
  class ScriptType extends Enum<ScriptType> {
    static readonly STARTUP: ScriptType;
    static readonly SERVER: ScriptType;
    static readonly CLIENT: ScriptType;
    get logFile(): Path;
    get validTypes(): ScriptType[];
    isClient(): boolean;
    isServer(): boolean;
    isStartup(): boolean;
    kjs$getScriptType(): ScriptType;
    negate(): ScriptTypePredicate;
    test(type: ScriptType): boolean;
    unload(): void;
    static valueOf(name: string): ScriptType;
    static values(): ScriptType[];
  }


  class ScriptTypeHolder {
    kjs$getScriptType(): ScriptType;
  }


  interface ScriptTypePredicate extends Predicate<ScriptType> {}
  class ScriptTypePredicate extends Predicate<ScriptType> {
    static readonly ALL: ScriptTypePredicate;
    static readonly COMMON: ScriptTypePredicate;
    static readonly STARTUP_OR_CLIENT: ScriptTypePredicate;
    static readonly STARTUP_OR_SERVER: ScriptTypePredicate;
    get validTypes(): ScriptType[];
    test(var1: ScriptType): boolean;
  }


  class TypeDescriptionRegistry {
    register(var1: Class<any>, var2: TypeInfo): void;
    scriptType(): ScriptType;
  }


  class TypeWrapperRegistry {
    constructor(type: ScriptType, typeWrappers: TypeWrappers);
    hasTypeWrapper<T>(target: Class<T>): boolean;
    register<T>(target: Class<T>, validator: TypeWrapperValidator, factory: TypeWrapperFactory<T>): void;
    register<T>(target: Class<T>, factory: TypeWrapperFactory<T>): void;
    register<T>(target: Class<T>, validator: TypeWrapperValidator, factory: ContextFromFunction<T>): void;
    register<T>(target: Class<T>, factory: ContextFromFunction<T>): void;
    register<T>(target: Class<T>, factory: RegistriesFromFunction<T>): void;
    register<T>(target: Class<T>, validator: TypeWrapperValidator, factory: DirectTypeWrapperFactory<T>): void;
    register<T>(target: Class<T>, factory: DirectTypeWrapperFactory<T>): void;
    registerAlias<F, T>(target: Class<T>, from: Class<F>, converter: Function<F, T>): void;
    registerAlias<F, T>(target: Class<T>, from: TypeInfo, converter: Function<F, T>): void;
    registerCodec<T>(target: Class<T>, codec: Codec<T>, defaultValue: T): void;
    registerCodec<T>(target: Class<T>, codec: Codec<T>): void;
    registerEnumFromStringCodec<T extends Enum<T>>(target: Class<T>, codec: Codec<T>, defaultValue: T, forceLowerCase: boolean): void;
    registerEnumFromStringCodec<T extends Enum<T>>(target: Class<T>, codec: Codec<T>): void;
    registerMapCodec<T>(target: Class<T>, codec: MapCodec<T>, defaultValue: T): void;
    registerMapCodec<T>(target: Class<T>, codec: MapCodec<T>): void;
    scriptType(): ScriptType;
  }


  class WithScriptContext {
    cx(): Context;
  }

}

declare module 'dev.latvian.mods.kubejs.script.data' {
  import { PackResources, PackLocationInfo, PackType, AbstractPackResources } from 'net.minecraft.server.packs';
  import { Path } from 'java.nio.file';
  import { Enum } from 'java.lang';
  import { Map, List, Set } from 'java.util';
  import { Function, Supplier, Consumer, BiConsumer } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IoSupplier } from 'net.minecraft.server.packs.resources';
  import { InputStream } from 'java.io';
  import { ResourceOutput } from 'PackResources';
  import { MetadataSectionSerializer } from 'net.minecraft.server.packs.metadata';
  import { KubeAssetGenerator, KubeDataGenerator, KubeResourceGenerator } from 'dev.latvian.mods.kubejs.generator';
  import { RegistryAccessContainer } from 'dev.latvian.mods.kubejs.util';
  import { LoadedTexture, SoundsGenerator } from 'dev.latvian.mods.kubejs.client';
  import { Registry, HolderSet, Holder } from 'net.minecraft.core';
  import { DataMapType } from 'net.neoforged.neoforge.registries.datamaps';
  import { TagKey } from 'net.minecraft.tags';
  import { ScriptType } from 'dev.latvian.mods.kubejs.script';
  import { Component } from 'net.minecraft.network.chat';

  interface ExportablePackResources extends PackResources {}
  class ExportablePackResources extends PackResources {
    export(var1: Path): void;
    exportPath(): string;
  }


  interface GeneratedDataStage extends Enum<GeneratedDataStage> {}
  class GeneratedDataStage extends Enum<GeneratedDataStage> {
    static readonly INTERNAL: GeneratedDataStage;
    static readonly REGISTRIES: GeneratedDataStage;
    static readonly BEFORE_MODS: GeneratedDataStage;
    static readonly AFTER_MODS: GeneratedDataStage;
    static readonly LAST: GeneratedDataStage;
    static forScripts(factory: Function<GeneratedDataStage, T>): Map<GeneratedDataStage, T>;
    get serializedName(): string;
    static valueOf(name: string): GeneratedDataStage;
    static values(): GeneratedDataStage[];
  }


  interface KubeFileResourcePack extends PackResources {}
  class KubeFileResourcePack extends PackResources {
    static readonly PACK_LOCATION_INFO: PackLocationInfo;
    constructor(t: PackType);
    close(): void;
    static findAfterModsIndex(packs: PackResources[]): number;
    static findBeforeModsIndex(packs: PackResources[]): number;
    generate(map: Map<ResourceLocation, GeneratedData>): void;
    get generated(): Map<ResourceLocation, GeneratedData>;
    getMetadataSection<T>(serializer: MetadataSectionSerializer<T>): T;
    getNamespaces(type: PackType): Set<string>;
    getResource(type: PackType, location: ResourceLocation): IoSupplier<InputStream>;
    getRootResource(...path: string[]): GeneratedData;
    listResources(type: PackType, namespace: string, path: string, visitor: ResourceOutput): void;
    location(): PackLocationInfo;
    packId(): string;
    static scanAndLoad(path: Path, packs: PackResources[]): void;
    static scanForInvalidFiles(pathName: string, path: Path): void;
    toString(): string;
  }


  interface VirtualAssetPack extends KubeAssetGenerator, VirtualResourcePack {}
  class VirtualAssetPack extends KubeAssetGenerator {
    constructor(stage: GeneratedDataStage, registries: Supplier<RegistryAccessContainer>);
    close(): void;
    flush(): void;
    loadTexture(id: ResourceLocation): LoadedTexture;
    sounds(namespace: string, consumer: Consumer<SoundsGenerator>): void;
    texture(target: ResourceLocation, texture: LoadedTexture): void;
  }


  interface VirtualDataMapFile<RT = any, DT = any> extends BiConsumer<ResourceLocation, DT> {}
  class VirtualDataMapFile<RT = any, DT = any> extends BiConsumer<ResourceLocation, DT> {
    readonly pack: KubeDataGenerator;
    readonly registryAccess: RegistryAccessContainer;
    readonly registry: Registry;
    constructor(type: DataMapType<RT, DT>, pack: VirtualDataPack);
    accept(id: ResourceLocation, data: DT): void;
    add(holders: HolderSet<RT>, value: DT): void;
    add(holders: HolderSet<RT>, value: DT, replace: boolean): void;
    add(holder: Holder<RT>, value: DT): void;
    add(holder: Holder<RT>, value: DT, replace: boolean): void;
    add(holder: RT, value: DT): void;
    add(holder: RT, value: DT, replace: boolean): void;
    addTag(tag: TagKey<RT>, value: DT): void;
    addTag(tag: TagKey<RT>, value: DT, replace: boolean): void;
    clear(): void;
    remove(holders: HolderSet<RT>): void;
    remove(holder: Holder<RT>): void;
    remove(holder: RT): void;
    removeTag(tag: TagKey<RT>): void;
    replaceAll(): void;
  }


  interface VirtualDataPack extends KubeDataGenerator, VirtualResourcePack {}
  class VirtualDataPack extends KubeDataGenerator {
    constructor(stage: GeneratedDataStage, registries: Supplier<RegistryAccessContainer>);
    dataMap<R, T>(type: DataMapType<R, T>, consumer: Consumer<VirtualDataMapFile<R, T>>): void;
    flush(): void;
    reset(): void;
  }


  interface VirtualResourcePack extends KubeResourceGenerator, ExportablePackResources, AbstractPackResources {}
  class VirtualResourcePack extends KubeResourceGenerator {
    readonly scriptType: ScriptType;
    readonly packType: PackType;
    readonly stage: GeneratedDataStage;
    readonly registries: Supplier;
    readonly info: string;
    readonly component: Component;
    constructor(scriptType: ScriptType, packType: PackType, stage: GeneratedDataStage, registries: Supplier<RegistryAccessContainer>);
    add(data: GeneratedData): void;
    close(): void;
    export(root: Path): void;
    exportPath(): string;
    get registries(): RegistryAccessContainer;
    getGenerated(id: ResourceLocation): GeneratedData;
    getMetadataSection<T>(serializer: MetadataSectionSerializer<T>): T;
    getNamespaces(type: PackType): Set<string>;
    getResource(type: PackType, location: ResourceLocation): IoSupplier<InputStream>;
    getRootResource(...path: string[]): IoSupplier<InputStream>;
    listResources(packType: PackType, namespace: string, path: string, visitor: ResourceOutput): void;
    packId(): string;
    reset(): void;
    toString(): string;
  }

}

declare module 'dev.latvian.mods.kubejs.script.PlatformWrapper' {
  class ModInfo {
    constructor(i: string);
    get customName(): string;
    get id(): string;
    get name(): string;
    get version(): string;
    set name(n: string);
  }

}

declare module 'dev.latvian.mods.kubejs.script.TypeWrapperRegistry' {
  import { BiFunction } from 'java.util.function';
  import { Context } from 'dev.latvian.mods.rhino';
  import { RegistryAccessContainer } from 'dev.latvian.mods.kubejs.util';

  interface ContextFromFunction<T = any> extends BiFunction<Context, any, T> {}
  class ContextFromFunction<T = any> extends BiFunction<Context, any, T> {
  }


  interface RegistriesFromFunction<T = any> extends BiFunction<RegistryAccessContainer, any, T> {}
  class RegistriesFromFunction<T = any> extends BiFunction<RegistryAccessContainer, any, T> {
  }

}

declare module 'dev.latvian.mods.kubejs.server' {
  import { KubeEntityEvent } from 'dev.latvian.mods.kubejs.entity';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { Level } from 'net.minecraft.world.level';
  import { Entity } from 'net.minecraft.world.entity';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { LevelBlock } from 'dev.latvian.mods.kubejs.level';
  import { Supplier, Consumer } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';
  import { CommandEvent, RegisterCommandsEvent, AddReloadListenerEvent } from 'net.neoforged.neoforge.event';
  import { ParseResults } from 'com.mojang.brigadier';
  import { Throwable } from 'java.lang';
  import { Callable } from 'java.util.concurrent';
  import { JsonElement } from 'com.google.gson';
  import { ServerAboutToStartEvent, ServerStartingEvent, ServerStoppingEvent, ServerStoppedEvent } from 'net.neoforged.neoforge.event.server';
  import { Load, Save } from 'LevelEvent';
  import { Pre } from 'ItemEntityPickupEvent';
  import { ScheduledEvent } from 'dev.latvian.mods.kubejs.util.ScheduledEvents';
  import { ScheduledEvents } from 'dev.latvian.mods.kubejs.util';
  import { MinecraftServer } from 'net.minecraft.server';
  import { KubeEvent } from 'dev.latvian.mods.kubejs.event';
  import { ScriptManager } from 'dev.latvian.mods.kubejs.script';
  import { Map, List } from 'java.util';
  import { RecipeSchemaStorage } from 'dev.latvian.mods.kubejs.recipe.schema';
  import { SyncServerDataPayload } from 'dev.latvian.mods.kubejs.net';
  import { VirtualDataPack } from 'dev.latvian.mods.kubejs.script.data';
  import { PackResources } from 'net.minecraft.server.packs';

  interface BasicCommandKubeEvent extends KubeEntityEvent {}
  class BasicCommandKubeEvent extends KubeEntityEvent {
    readonly id: string;
    readonly input: string;
    constructor(source: CommandSourceStack, id: string, input: string);
    get block(): LevelBlock;
    get entity(): Entity;
    get id(): string;
    get level(): Level;
    get player(): ServerPlayer;
    respond(text: Component): void;
    respondLazily(text: Supplier<Component>, informAdmins: boolean): void;
  }


  class ChangesForChat {
    static recipesAdded: number;
    static recipesRemoved: number;
    static recipesModified: number;
    static recipesMs: number;
    static print(out: Consumer<Component>): void;
  }


  interface CommandKubeEvent extends ServerKubeEvent {}
  class CommandKubeEvent extends ServerKubeEvent {
    constructor(event: CommandEvent);
    get commandName(): string;
    get exception(): Throwable;
    get input(): string;
    get parseResults(): ParseResults<CommandSourceStack>;
    set exception(exception: Throwable);
    set parseResults(parse: ParseResults<CommandSourceStack>);
  }


  class DataExport {
    static export: DataExport;
    source: CommandSourceStack;
    add(path: string, data: Callable<number[]>): void;
    addJson(path: string, json: JsonElement): void;
    addString(path: string, data: string): void;
    static exportData(): void;
  }


  class KubeJSServerEventHandler {
    static addReloadListeners(event: AddReloadListenerEvent): void;
    static command(event: CommandEvent): void;
    static preventPickupDuringChestGUI(event: Pre): void;
    static registerCommands(event: RegisterCommandsEvent): void;
    static serverBeforeStart(event: ServerAboutToStartEvent): void;
    static serverLevelLoaded(event: Load): void;
    static serverLevelSaved(event: Save): void;
    static serverStarting(event: ServerStartingEvent): void;
    static serverStopped(event: ServerStoppedEvent): void;
    static serverStopping(event: ServerStoppingEvent): void;
  }


  interface ScheduledServerEvent extends ScheduledEvent {}
  class ScheduledServerEvent extends ScheduledEvent {
    static readonly EVENTS: ScheduledEvents;
    get server(): MinecraftServer;
  }


  interface ServerKubeEvent extends KubeEvent {}
  class ServerKubeEvent extends KubeEvent {
    readonly server: MinecraftServer;
    constructor(s: MinecraftServer);
    get server(): MinecraftServer;
  }


  interface ServerScriptManager extends ScriptManager {}
  class ServerScriptManager extends ScriptManager {
    readonly preTagEvents: Map;
    readonly recipeSchemaStorage: RecipeSchemaStorage;
    serverData: SyncServerDataPayload;
    readonly internalDataPack: VirtualDataPack;
    readonly registriesDataPack: VirtualDataPack;
    readonly virtualPacks: Map;
    firstLoad: boolean;
    static createForDataGen(): ServerScriptManager;
    static createPackResources(original: PackResources[]): PackResources[];
    loadAdditional(): void;
    loadFromDirectory(): void;
    static release(): ServerScriptManager;
    reload(): void;
    reloadAndCapture(): void;
  }

}

declare module 'dev.latvian.mods.kubejs.server.tag' {
  import { Map, List, Set } from 'java.util';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { TagOrElementLocation } from 'ExtraCodecs';
  import { Stream } from 'java.util.stream';
  import { KubeEvent, EventExceptionHandler } from 'dev.latvian.mods.kubejs.event';
  import { Registry } from 'net.minecraft.core';
  import { EntryWithSource } from 'TagLoader';

  interface PreTagKubeEvent extends TagKubeEvent {}
  class PreTagKubeEvent extends TagKubeEvent {
    readonly tags: Map;
    readonly actions: List;
    invalid: boolean;
    constructor(registryKey: ResourceKey<any>);
    get elementIds(): Set<ResourceLocation>;
    static handle(tagEventHolders: Map<ResourceKey<any>, PreTagKubeEvent>): void;
    removeAllTagsFrom(...ignored: any[]): void;
  }


  interface PreTagWrapper extends TagWrapper {}
  class PreTagWrapper extends TagWrapper {
    readonly preEvent: PreTagKubeEvent;
    readonly id: ResourceLocation;
    constructor(e: PreTagKubeEvent, i: ResourceLocation);
    add(...filters: any[]): TagWrapper;
    get objectIds(): ResourceLocation[];
    remove(...filters: any[]): TagWrapper;
    removeAll(): TagWrapper;
  }


  class TagEventFilter {
    add(wrapper: TagWrapper): number;
    static of(event: TagKubeEvent, o: any): TagEventFilter;
    remove(wrapper: TagWrapper): number;
    testElementId(var1: ResourceLocation): boolean;
    testTagOrElementLocation(element: TagOrElementLocation): boolean;
    static unwrap(event: TagKubeEvent, array: any[]): TagEventFilter;
    unwrap(): Stream<TagEventFilter>;
  }


  interface TagKubeEvent extends KubeEvent {}
  class TagKubeEvent extends KubeEvent {
    static readonly TAG_EVENT_HANDLER: EventExceptionHandler;
    static readonly SOURCE: string;
    readonly registryKey: ResourceKey;
    readonly vanillaRegistry: Registry;
    readonly tags: Map;
    totalAdded: number;
    totalRemoved: number;
    constructor(registryKey: ResourceKey<any>, vr: Registry<any>);
    add(tag: ResourceLocation, ...filters: any[]): TagWrapper;
    get(id: ResourceLocation): TagWrapper;
    get elementIds(): Set<ResourceLocation>;
    get type(): ResourceLocation;
    remove(tag: ResourceLocation, ...filters: any[]): TagWrapper;
    removeAll(tag: ResourceLocation): TagWrapper;
    removeAllTagsFrom(...ids: any[]): void;
  }


  class TagWrapper {
    readonly event: TagKubeEvent;
    readonly id: ResourceLocation;
    readonly entries: List;
    constructor(e: TagKubeEvent, i: ResourceLocation, t: EntryWithSource[]);
    add(...filters: any[]): TagWrapper;
    get objectIds(): ResourceLocation[];
    remove(...filters: any[]): TagWrapper;
    removeAll(): TagWrapper;
    toString(): string;
  }

}

declare module 'dev.latvian.mods.kubejs.server.tag.TagEventFilter' {
  import { TagEventFilter, TagWrapper } from 'dev.latvian.mods.kubejs.server.tag';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { TagOrElementLocation } from 'ExtraCodecs';

  interface Empty extends TagEventFilter {}
  class Empty extends TagEventFilter {
    static readonly INSTANCE: Empty;
    add(wrapper: TagWrapper): number;
    remove(wrapper: TagWrapper): number;
    testElementId(resourceLocation: ResourceLocation): boolean;
    testTagOrElementLocation(element: TagOrElementLocation): boolean;
  }

}

declare module 'dev.latvian.mods.kubejs.stages' {
  import { PlayerEvent } from 'net.neoforged.neoforge.event.entity.player';
  import { ICancellableEvent } from 'net.neoforged.bus.api';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Collection } from 'java.util';

  interface StageCreationEvent extends ICancellableEvent, PlayerEvent {}
  class StageCreationEvent extends ICancellableEvent {
    get playerStages(): Stages;
    set playerStages(s: Stages);
  }


  class StageEvents {
    static create(player: Player): Stages;
    static get(player: Player): Stages;
  }


  class Stages {
    add(stage: string): boolean;
    addNoUpdate(var1: string): boolean;
    clear(): boolean;
    get all(): Collection<string>;
    get player(): Player;
    has(stage: string): boolean;
    remove(stage: string): boolean;
    removeNoUpdate(var1: string): boolean;
    replace(stages: Collection<string>): void;
    set(stage: string, enabled: boolean): boolean;
    sync(): void;
    toggle(stage: string): boolean;
  }

}

declare module 'dev.latvian.mods.kubejs.text.action' {
  import { Map, List } from 'java.util';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Component } from 'net.minecraft.network.chat';

  class TextAction {
    static readonly MAP: Map;
    static readonly STREAM_CODEC: StreamCodec;
    apply(var1: Component[]): void;
    type(): TooltipActionType<any>;
  }


  class TextActionBuilder {
    actions: List;
    add(text: Component[]): void;
    clear(): void;
    dynamic(id: string): void;
    insert(line: number, text: Component[]): void;
    removeExactText(match: Component): void;
    removeLine(line: number): void;
    removeText(match: Component): void;
  }

}

declare module 'dev.latvian.mods.kubejs.util' {
  import { HashMap, List, Set, Collection, Map, LinkedList, Calendar } from 'java.util';
  import { Path } from 'java.nio.file';
  import { JsonElement, JsonArray } from 'com.google.gson';
  import { Consumer, UnaryOperator, Supplier, Function, BooleanSupplier, Predicate } from 'java.util.function';
  import { Long, Enum, Class, Byte, Short, Integer, Float, Double, Character, Comparable, StringBuilder } from 'java.lang';
  import { ResourceLocation, ResourceKey, RegistryOps } from 'net.minecraft.resources';
  import { DataResult, DynamicOps, Codec, MapCodec } from 'com.mojang.serialization';
  import { StringReader } from 'com.mojang.brigadier';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { Context, BaseFunction, Scriptable, Symbol } from 'dev.latvian.mods.rhino';
  import { DataOutputStream, DataOutput, PrintStream } from 'java.io';
  import { Duration } from 'java.time';
  import { LegacyError } from 'dev.latvian.mods.kubejs.error';
  import { MobEffectInstance, MobEffect } from 'net.minecraft.world.effect';
  import { Holder, RegistryAccess, Registry as net_minecraft_core_Registry } from 'net.minecraft.core';
  import { BindingRegistry } from 'dev.latvian.mods.kubejs.script';
  import { IModFile } from 'net.neoforged.neoforgespi.locating';
  import { Registry } from 'dev.latvian.mods.kubejs.util.NameProvider';
  import { Component } from 'net.minecraft.network.chat';
  import { CompoundTag, Tag } from 'net.minecraft.nbt';
  import { Entry } from 'Object2LongMap';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Pattern } from 'java.util.regex';
  import { IContext } from 'ICondition';
  import { CachedItemTagLookup, CachedTagLookup } from 'dev.latvian.mods.kubejs.recipe';
  import { Frozen } from 'RegistryAccess';
  import { DamageSources } from 'net.minecraft.world.damagesource';
  import { ItemStack, Item, CreativeModeTab } from 'net.minecraft.world.item';
  import { EntryWithSource } from 'TagLoader';
  import { RegistryWrapper } from 'dev.latvian.mods.kubejs.plugin.builtin.wrapper';
  import { Quaternionf } from 'org.joml';
  import { AtomicInteger } from 'java.util.concurrent.atomic';
  import { ScheduledEvent, Callback } from 'dev.latvian.mods.kubejs.util.ScheduledEvents';
  import { TemporalAmount, TemporalUnit, Temporal } from 'java.time.temporal';
  import { TagKey } from 'net.minecraft.tags';
  import { Block } from 'net.minecraft.world.level.block';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { EntityType, Entity } from 'net.minecraft.world.entity';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { Stream } from 'java.util.stream';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { RandomSource } from 'net.minecraft.util';
  import { Type } from 'java.lang.reflect';

  interface AttachedData<T = any> extends HashMap<string, any> {}
  class AttachedData<T = any> extends HashMap<string, any> {
    constructor(p: T);
    add(key: string, data: any): void;
    get parent(): T;
  }


  class BaseProperties {
    constructor(path: Path, name: string);
    get(key: string): JsonElement;
    get(key: string, def: string): string;
    get(key: string, def: JsonElement): JsonElement;
    get(key: string, def: boolean): boolean;
    get(key: string, def: number): number;
    get(key: string, def: number): number;
    remove(key: string): void;
    save(): void;
    set(key: string, json: JsonElement): void;
    toString(): string;
  }


  class Cast {
    static to<T>(o: any): T;
  }


  class CountingMap {
    constructor();
    add(key: any, value: number): number;
    clear(): void;
    forEach(forEach: Consumer<Object2LongEntry>): void;
    get(key: any): number;
    get entries(): Object2LongEntry[];
    get keys(): Set<any>;
    get size(): number;
    get totalCount(): number;
    get values(): Collection<Long>;
    set(key: any, value: number): number;
  }


  class ErrorStack {
    static readonly NONE: ErrorStack;
    atString(): string;
    pop(): void;
    push(parent: any): void;
    setKey(key: any): void;
    setKey(index: number): void;
    stringAt(): string;
    toString(): string;
  }


  class FluidAmounts {
    static readonly BUCKET: number;
    static readonly MILLIBUCKET: number;
    static readonly B: number;
    static readonly MB: number;
    static readonly INGOT: number;
    static readonly NUGGET: number;
    static readonly METAL_BLOCK: number;
    static readonly BOTTLE: number;
  }


  class ID {
    static readonly UNKNOWN: ResourceLocation;
    static readonly AIR: ResourceLocation;
    static readonly BLOCKSTATE: UnaryOperator;
    static readonly BLOCK: UnaryOperator;
    static readonly ITEM: UnaryOperator;
    static readonly MODEL: UnaryOperator;
    static readonly BLOCK_MODEL: UnaryOperator;
    static readonly ITEM_MODEL: UnaryOperator;
    static readonly BLOCK_LOOT_TABLE: UnaryOperator;
    static readonly PNG_TEXTURE: UnaryOperator;
    static readonly PNG_TEXTURE_MCMETA: UnaryOperator;
    static readonly PARTICLE: UnaryOperator;
    static isKey(from: any): boolean;
    static kjs(o: any): ResourceLocation;
    static kjsString(id: string): string;
    static mc(o: any): ResourceLocation;
    static namespace(s: string): string;
    static of(o: any, preferKJS: boolean): ResourceLocation;
    static path(s: string): string;
    static read(reader: StringReader): DataResult<ResourceLocation>;
    static reduce(id: ResourceLocation): string;
    static reduceKjs(id: ResourceLocation): string;
    static resourcePath(id: ResourceLocation): string;
    static string(id: string): string;
    static url(id: ResourceLocation): string;
  }


  interface IngredientSupplier extends Supplier<Ingredient> {}
  class IngredientSupplier extends Supplier<Ingredient> {
    get (): Ingredient;
  }


  interface JSObjectType extends Enum<JSObjectType> {}
  class JSObjectType extends Enum<JSObjectType> {
    static readonly ANY: JSObjectType;
    static readonly MAP: JSObjectType;
    static readonly LIST: JSObjectType;
    checkList(): boolean;
    checkMap(): boolean;
    static valueOf(name: string): JSObjectType;
    static values(): JSObjectType[];
  }


  class JsonIO {
    static getJsonHashBytes(json: JsonElement): number[];
    static getJsonHashString(json: JsonElement): string;
    static parse(string: string): any;
    static parseRaw(string: string): JsonElement;
    static read(cx: Context, path: Path): Map<any, any>;
    static readJson(path: Path): JsonElement;
    static readString(path: Path): string;
    static toArray(element: JsonElement): JsonArray;
    static toObject(json: JsonElement): any;
    static toPrettyString(json: JsonElement): string;
    static toPrimitive(element: JsonElement): any;
    static toString(json: JsonElement): string;
    static write(path: Path, json: JsonElement): void;
    static writeJsonHash(stream: DataOutputStream, element: JsonElement): void;
  }


  class JsonSerializable {
    toJson(var1: Context): JsonElement;
  }


  interface Lazy<T = any> extends Supplier<T> {}
  class Lazy<T = any> extends Supplier<T> {
    forget(): void;
    get (): T;
    static identityMap<K, V>(supplier: Consumer<Map<K, V>>): Lazy<Map<K, V>>;
    static map<K, V>(supplier: Consumer<Map<K, V>>): Lazy<Map<K, V>>;
    static of<T>(supplier: Supplier<T>): Lazy<T>;
    static of<T>(supplier: Supplier<T>, expires: Duration): Lazy<T>;
    static serviceLoader<T>(type: Class<T>): Lazy<T>;
  }


  interface LegacyCodeHandler extends BaseFunction {}
  class LegacyCodeHandler extends BaseFunction {
    readonly code: string;
    constructor(code: string);
    call(cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    construct(cx: Context, scope: Scriptable, args: any[]): Scriptable;
    get(cx: Context, name: string, start: Scriptable): any;
    get(cx: Context, index: number, start: Scriptable): any;
    get(cx: Context, key: Symbol, start: Scriptable): any;
    makeError(cx: Context): LegacyError;
    put(cx: Context, name: string, start: Scriptable, value: any): void;
    put(cx: Context, index: number, start: Scriptable, value: any): void;
    put(cx: Context, key: Symbol, start: Scriptable, value: any): void;
  }


  class ListJS {
    static of(o: any): any[];
    static of(array: number[]): number[];
    static of(array: number[]): number[];
    static of(array: number[]): number[];
    static of(array: number[]): Long[];
    static of(array: number[]): number[];
    static of(array: number[]): number[];
    static of(array: string[]): string[];
    static ofArray(array: any): any[];
    static ofSet(o: any): Set<any>;
    static orSelf(o: any): any[];
  }


  interface LogType extends Enum<LogType> {}
  class LogType extends Enum<LogType> {
    static readonly INIT: LogType;
    static readonly DEBUG: LogType;
    static readonly INFO: LogType;
    static readonly WARN: LogType;
    static readonly ERROR: LogType;
    static valueOf(name: string): LogType;
    static values(): LogType[];
  }


  class MobEffectUtil {
    static of(oldInstance: MobEffectInstance): MobEffectInstance;
    static of(effect: Holder<MobEffect>): MobEffectInstance;
    static of(effect: Holder<MobEffect>, duration: TickDuration): MobEffectInstance;
    static of(effect: Holder<MobEffect>, duration: TickDuration, amplifier: number): MobEffectInstance;
    static of(effect: Holder<MobEffect>, duration: TickDuration, amplifier: number, ambient: boolean, visible: boolean): MobEffectInstance;
    static of(effect: Holder<MobEffect>, duration: TickDuration, amplifier: number, ambient: boolean, visible: boolean, showIcon: boolean): MobEffectInstance;
  }


  class ModResourceBindings {
    addBindings(event: BindingRegistry): void;
    readBindings(modId: string, mod: IModFile): void;
  }


  class MutedError {
    isMuted(): boolean;
  }


  class NameProvider<T = any> {
    static create<K, T>(registry: Consumer<Registry<K, T>>): Map<K, NameProvider<T>>;
    getName(var1: RegistryAccess, var2: T): Component;
  }


  class NBTIOWrapper {
    static read(path: Path): CompoundTag;
    static write(path: Path, nbt: CompoundTag): void;
  }


  class NBTSerializable {
    toNBT(var1: Context): Tag;
  }


  interface Object2LongEntry extends Comparable<Object2LongEntry> {}
  class Object2LongEntry extends Comparable<Object2LongEntry> {
    readonly key: any;
    readonly value: number;
    constructor(k: any, v: number);

    constructor(entry: Entry<any>);
    compareTo(o: Object2LongEntry): number;
  }


  class OpsContainer {
    static readonly DEFAULT: OpsContainer;
    constructor(nbt: DynamicOps<Tag>, json: DynamicOps<JsonElement>, java: DynamicOps<any>);
    decode<T>(cx: Context, codec: Codec<T>, o: any): T;
    decodeMap<T>(cx: Context, codec: MapCodec<T>, o: any): T;
    java(): DynamicOps<any>;
    json(): DynamicOps<JsonElement>;
    nbt(): DynamicOps<Tag>;
  }


  interface OrderedCompoundTag extends CompoundTag {}
  class OrderedCompoundTag extends CompoundTag {
    readonly tagMap: Map;
    constructor(map: Map<string, Tag>);

    constructor();
    write(dataOutput: DataOutput): void;
  }


  class RecordDefaults {
    static init(): void;
  }


  class RegExpKJS {
    static readonly CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    static getFlags(f: string): number;
    static isValidFlag(c: string): boolean;
    static ofString(string: string): Pattern;
    static read(reader: StringReader): Pattern;
    static toRegExpString(pattern: Pattern): string;
    static tryRead(reader: StringReader): DataResult<Pattern>;
    static wrap(o: any): Pattern;
  }


  interface RegistryAccessContainer extends IContext, RegistryOpsContainer {}
  class RegistryAccessContainer extends IContext {
    static readonly BUILTIN: RegistryAccessContainer;
    static current: RegistryAccessContainer;
    readonly cachedRegistryTags: Map;
    cachedItemTags: CachedItemTagLookup;
    cachedBlockTags: CachedTagLookup;
    cachedFluidTags: CachedTagLookup;
    constructor(access: Frozen);
    access(): Frozen;
    cacheTags<T>(registry: net_minecraft_core_Registry<T>, map: Map<ResourceLocation, EntryWithSource[]>): void;
    damageSources(): DamageSources;
    getAllTags<T>(key: ResourceKey<net_minecraft_core_Registry<T>>): Map<ResourceLocation, Collection<Holder<T>>>;
    itemStackParseCache(): Map<string, ItemStack>;
    static of(cx: Context): RegistryAccessContainer;
    wrapRegistry(id: ResourceLocation): RegistryWrapper<any>;
  }


  interface RegistryOpsContainer extends OpsContainer {}
  class RegistryOpsContainer extends OpsContainer {
    constructor(nbt: RegistryOps<Tag>, json: RegistryOps<JsonElement>, java: RegistryOps<any>);
    java(): RegistryOps<any>;
    json(): RegistryOps<JsonElement>;
    nbt(): RegistryOps<Tag>;
  }


  interface RotationAxis extends Enum<RotationAxis> {}
  class RotationAxis extends Enum<RotationAxis> {
    static readonly XN: RotationAxis;
    static readonly XP: RotationAxis;
    static readonly YN: RotationAxis;
    static readonly YP: RotationAxis;
    static readonly ZN: RotationAxis;
    static readonly ZP: RotationAxis;
    deg(f: number): Quaternionf;
    rad(f: number): Quaternionf;
    static valueOf(name: string): RotationAxis;
    static values(): RotationAxis[];
  }


  class ScheduledEvents {
    readonly factory: Supplier;
    readonly events: LinkedList;
    readonly futureEvents: LinkedList;
    readonly nextId: AtomicInteger;
    currentMillis: number;
    currentTick: number;
    constructor(factory: Supplier<ScheduledEvent>);
    clear(id: number): void;
    schedule(timer: TemporalAmount, repeating: boolean, callback: Callback): ScheduledEvent;
    schedule(timer: number, ofTicks: boolean, repeating: boolean, callback: Callback): ScheduledEvent;
    tickAll(nowTicks: number): void;
  }


  interface StackTraceCollector extends PrintStream {}
  class StackTraceCollector extends PrintStream {
    constructor(stackTrace: Collection<string>, exitPattern: Pattern, reduce: Function<string, string>);
    print(s: string): void;
    println(x: any): void;
    println(x: string): void;
  }


  class StringBuilderAppendable {
    appendString(var1: StringBuilder): void;
  }


  class StringReaderFunction<T = any> {
    read(var1: StringReader): T;
  }


  class Tags {
    static biome(id: ResourceLocation): TagKey<Biome>;
    static block(id: ResourceLocation): TagKey<Block>;
    static byBlock(block: Block): Stream<TagKey<Block>>;
    static byBlockState(state: BlockState): Stream<TagKey<Block>>;
    static byEntity(entity: Entity): Stream<TagKey<EntityType<any>>>;
    static byEntityType(entityType: EntityType<any>): Stream<TagKey<EntityType<any>>>;
    static byFluid(fluid: Fluid): Stream<TagKey<Fluid>>;
    static byItem(item: Item): Stream<TagKey<Item>>;
    static byItemStack(stack: ItemStack): Stream<TagKey<Item>>;
    static entityType(id: ResourceLocation): TagKey<EntityType<any>>;
    static fluid(id: ResourceLocation): TagKey<Fluid>;
    static forType<T>(cx: Context, object: T, registry: net_minecraft_core_Registry<T>): Stream<TagKey<T>>;
    static item(id: ResourceLocation): TagKey<Item>;
  }


  interface TickTemporalUnit extends TemporalUnit {}
  class TickTemporalUnit extends TemporalUnit {
    static readonly INSTANCE: TickTemporalUnit;
    static readonly DURATION: Duration;
    addTo<R extends Temporal>(temporal: R, amount: number): R;
    between(temporal1Inclusive: Temporal, temporal2Exclusive: Temporal): number;
    get duration(): Duration;
    isDateBased(): boolean;
    isDurationEstimated(): boolean;
    isTimeBased(): boolean;
    toString(): string;
  }


  class TimeJS {
    static readonly TEMPORAL_AMOUNT_PATTERN: Pattern;
    static appendTimestamp(builder: StringBuilder, calendar: Calendar): void;
    static msToString(ms: number): string;
    static wrapDuration(o: any): Duration;
    static wrapTemporalAmount(o: any): TemporalAmount;
  }


  interface Tristate extends Enum<Tristate> {}
  class Tristate extends Enum<Tristate> {
    static readonly FALSE: Tristate;
    static readonly TRUE: Tristate;
    static readonly DEFAULT: Tristate;
    get serializedName(): string;
    test(enabled: boolean): boolean;
    test(enabled: BooleanSupplier): boolean;
    static valueOf(name: string): Tristate;
    static values(): Tristate[];
    static wrap(from: any): Tristate;
  }


  class UtilsJS {
    static readonly RANDOM: RandomSource;
    static readonly EMPTY_OBJECT_ARRAY: any[];
    static readonly ALWAYS_TRUE: Predicate;
    static findCreativeTab(id: ResourceLocation): CreativeModeTab;
    static onMatchDo<T>(predicate: Predicate<T>, onMatch: Consumer<T>): Predicate<T>;
    static postModificationEvents(): void;
    static toMappedTypeString(type: Type): string;
    static wrap(o: any, type: JSObjectType): any;
  }


  interface WithCodec extends NBTSerializable, JsonSerializable {}
  class WithCodec extends NBTSerializable {
    getCodec(var1: Context): Codec<any>;
    toJson(cx: Context): JsonElement;
    toNBT(cx: Context): Tag;
  }


  class WrappedJS {
  }


  class WrappedJSObjectChangeListener<T = any> {
    onChanged(var1: T): void;
  }

}

declare module 'dev.latvian.mods.kubejs.util.ModResourceBindings' {
  class BindingProvider {
    generate(): any;
  }

}

declare module 'dev.latvian.mods.kubejs.util.NameProvider' {
  import { NameProvider } from 'dev.latvian.mods.kubejs.util';
  import { List } from 'java.util';

  class Registry<K = any, T = any> {
    register(var1: K, var2: NameProvider<T>): void;
    register(keys: K[], provider: NameProvider<T>): void;
  }

}

declare module 'dev.latvian.mods.kubejs.util.ScheduledEvents' {
  import { TypeInfo } from 'dev.latvian.mods.rhino.type';
  import { ScheduledEvents } from 'dev.latvian.mods.kubejs.util';
  import { BaseFunction, Context, Scriptable } from 'dev.latvian.mods.rhino';

  class Callback {
    static readonly TYPE_INFO: TypeInfo;
    onCallback(var1: ScheduledEvent): void;
  }


  class ScheduledEvent {
    scheduledEvents: ScheduledEvents;
    id: number;
    ofTicks: boolean;
    repeating: boolean;
    timer: number;
    endTime: number;
    callback: Callback;
    clear(): void;
    reschedule(): ScheduledEvent;
    reschedule(timer: number): ScheduledEvent;
  }


  interface TimeoutJSFunction extends BaseFunction {}
  class TimeoutJSFunction extends BaseFunction {
    readonly scheduledEvents: ScheduledEvents;
    readonly clear: boolean;
    readonly interval: boolean;
    constructor(scheduledEvents: ScheduledEvents, clear: boolean, interval: boolean);
    call(cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
  }

}

declare module 'dev.latvian.mods.kubejs.web' {
  import { HTTPRequest, HTTPMethod, HTTPHandler } from 'dev.latvian.apps.tinyserver.http';
  import { BlockableEventLoop } from 'net.minecraft.util.thread';
  import { RegistryAccessContainer, BaseProperties } from 'dev.latvian.mods.kubejs.util';
  import { Runnable, Throwable } from 'java.lang';
  import { Supplier } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { DataComponentPatch } from 'net.minecraft.core.component';
  import { DynamicOps } from 'com.mojang.serialization';
  import { Tag } from 'net.minecraft.nbt';
  import { HTTPResponse, HTTPPayload } from 'dev.latvian.apps.tinyserver.http.response';
  import { HTTPServer, ServerRegistry } from 'dev.latvian.apps.tinyserver';
  import { WSSession, WSHandler, WSSessionFactory } from 'dev.latvian.apps.tinyserver.ws';
  import { JsonElement } from 'com.google.gson';

  interface KJSHTTPRequest extends HTTPRequest {}
  class KJSHTTPRequest extends HTTPRequest {
    readonly eventLoop: BlockableEventLoop;
    constructor(eventLoop: BlockableEventLoop<any>);
    components(ops: DynamicOps<Tag>): DataComponentPatch;
    handleResponse(payload: HTTPPayload, response: HTTPResponse, error: Throwable): HTTPResponse;
    id(ns: string, path: string): ResourceLocation;
    id(): ResourceLocation;
    registries(): RegistryAccessContainer;
    runInMainThread(task: Runnable): void;
    supplyInMainThread<T>(task: Supplier<T>): T;
  }


  interface KJSHTTPServer extends HTTPServer<KJSHTTPRequest> {}
  class KJSHTTPServer extends HTTPServer<KJSHTTPRequest> {
    readonly auth: string;
    readonly encodedAuth: string;
  }


  interface KJSWSSession extends WSSession<KJSHTTPRequest> {}
  class KJSWSSession extends WSSession<KJSHTTPRequest> {
    info: SessionInfo;
    onEvent(type: string, payload: JsonElement): void;
    onTextMessage(message: string): void;
  }


  class LocalWebServerAPIRegistry {
    register(var1: ResourceLocation, var2: number): void;
  }


  interface LocalWebServerRegistry extends ServerRegistry<KJSHTTPRequest> {}
  class LocalWebServerRegistry extends ServerRegistry<KJSHTTPRequest> {
    http(method: HTTPMethod, path: string, handler: HTTPHandler<KJSHTTPRequest>): void;
    ws<WSS extends WSSession<KJSHTTPRequest>>(path: string, factory: WSSessionFactory<KJSHTTPRequest, WSS>): WSHandler<KJSHTTPRequest, WSS>;
  }


  interface WebServerProperties extends BaseProperties {}
  class WebServerProperties extends BaseProperties {
    enabled: boolean;
    port: number;
    publicAddress: string;
    auth: string;
    get(key: string): JsonElement;
    get(key: string, def: string): string;
    get(key: string, def: JsonElement): JsonElement;
    get(key: string, def: boolean): boolean;
    get(key: string, def: number): number;
    get(key: string, def: number): number;
    static get (): WebServerProperties;
    static reload(): void;
  }

}

declare module 'dev.latvian.mods.kubejs.web.local.client' {
  import { BlockAndTintGetter, LevelReader, ColorResolver } from 'net.minecraft.world.level';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { Direction, BlockPos } from 'net.minecraft.core';
  import { LevelLightEngine } from 'net.minecraft.world.level.lighting';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { ItemTransform } from 'net.minecraft.client.renderer.block.model';
  import { Int2ObjectMap } from 'it.unimi.dsi.fastutil.ints';
  import { TextureTarget } from 'com.mojang.blaze3d.pipeline';
  import { HTTPResponse } from 'dev.latvian.apps.tinyserver.http.response';
  import { KJSHTTPRequest, LocalWebServerAPIRegistry, LocalWebServerRegistry } from 'dev.latvian.mods.kubejs.web';
  import { CachedImage } from 'dev.latvian.mods.kubejs.web.local.client.ImageGenerator';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { FluidStack } from 'net.neoforged.neoforge.fluids';
  import { Map, UUID } from 'java.util';
  import { CachedComponentObject } from 'dev.latvian.mods.kubejs.util';

  interface FakeClientWorld extends BlockAndTintGetter {}
  class FakeClientWorld extends BlockAndTintGetter {
    readonly parent: LevelReader;
    readonly blockState: BlockState;
    readonly biome: Biome;
    constructor(parent: LevelReader, blockState: BlockState, biome: ResourceKey<Biome>);
    get height(): number;
    get lightEngine(): LevelLightEngine;
    get minBuildHeight(): number;
    getBlockEntity(pos: BlockPos): BlockEntity;
    getBlockState(pos: BlockPos): BlockState;
    getBlockTint(pos: BlockPos, colorResolver: ColorResolver): number;
    getFluidState(pos: BlockPos): FluidState;
    getShade(direction: Direction, shade: boolean): number;
  }


  class ImageGenerator {
    static readonly ROTATED_BLOCK_TRANSFORM: ItemTransform;
    static readonly WILDCARD_TEXTURE: ResourceLocation;
    static readonly FB_CACHE: Int2ObjectMap;
    static block(req: KJSHTTPRequest): HTTPResponse;
    static blockTag(req: KJSHTTPRequest): HTTPResponse;
    static fluid(req: KJSHTTPRequest): HTTPResponse;
    static fluidTag(req: KJSHTTPRequest): HTTPResponse;
    static getCanvas(size: number): TextureTarget;
    static item(req: KJSHTTPRequest): HTTPResponse;
    static itemTag(req: KJSHTTPRequest): HTTPResponse;
    static renderAllItems(req: KJSHTTPRequest): HTTPResponse;
    static renderBlock(req: KJSHTTPRequest, state: BlockState, wildcard: boolean): CachedImage;
    static renderFluid(req: KJSHTTPRequest, stack: FluidStack, wildcard: boolean): CachedImage;
    static renderItem(req: KJSHTTPRequest, imageSize: number, stack: ItemStack, wildcard: boolean): CachedImage;
  }


  class KubeJSClientWeb {
    static createItemSearch(useSearchTab: boolean): Map<UUID, CachedComponentObject<Item, ItemStack>>;
    static createReverseItemSearch(original: Map<UUID, CachedComponentObject<Item, ItemStack>>): Map<CachedComponentObject<Item, ItemStack>, UUID>;
    static register(registry: LocalWebServerRegistry): void;
    static registerAPIs(registry: LocalWebServerAPIRegistry): void;
    static registerWithAuth(registry: LocalWebServerRegistry): void;
  }

}

declare module 'dev.latvian.mods.kubejs.web.local' {
  import { KJSWSSession, KJSHTTPRequest, LocalWebServerRegistry, LocalWebServer } from 'dev.latvian.mods.kubejs.web';
  import { ConsoleJS, ScriptType } from 'dev.latvian.mods.kubejs.script';
  import { JsonElement } from 'com.google.gson';
  import { WSHandler } from 'dev.latvian.apps.tinyserver.ws';
  import { Supplier } from 'java.util.function';
  import { ServerRegistry } from 'dev.latvian.apps.tinyserver';
  import { Runnable } from 'java.lang';

  interface ConsoleWSSession extends KJSWSSession {}
  class ConsoleWSSession extends KJSWSSession {
    readonly console: ConsoleJS;
    constructor(console: ConsoleJS);
    onEvent(type: string, payload: JsonElement): void;
  }


  class KubeJSWeb {
    static UPDATES: WSHandler;
    static addScriptTypeEndpoints(registry: ServerRegistry<KJSHTTPRequest>, s: ScriptType, reload: Runnable): void;
    static broadcastEvent(handler: WSHandler<any, any>, event: string, requiredTag: string, payload: Supplier<JsonElement>): number;
    static broadcastUpdate(type: string, requiredTag: string, payload: Supplier<JsonElement>): number;
    static register(registry: LocalWebServerRegistry): void;
    static registerWithAuth(registry: LocalWebServerRegistry): void;
    static serverStarted(instance: LocalWebServer): void;
  }

}