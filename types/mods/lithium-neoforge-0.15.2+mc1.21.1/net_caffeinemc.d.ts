declare module 'net.caffeinemc.mods.lithium.api.inventory' {
  import { Container } from 'net.minecraft.world';
  import { NonNullList } from 'net.minecraft.core';
  import { ItemStack } from 'net.minecraft.world.item';

  class LithiumCooldownReceivingInventory {
    canReceiveTransferCooldown(): boolean;
    setTransferCooldown(currentTime: number): void;
  }


  class LithiumDefaultedList {
    changedInteractionConditions(): void;
  }


  interface LithiumInventory extends Container {}
  class LithiumInventory extends Container {
    generateLootLithium(): void;
    get inventoryLithium(): NonNullList<ItemStack>;
    set inventoryLithium(var1: NonNullList<ItemStack>);
  }


  class LithiumTransferConditionInventory {
    lithium$itemInsertionTestRequiresStackSize1(): boolean;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.ai.brain' {
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { SensorType, Sensor } from 'net.minecraft.world.entity.ai.sensing';

  class SensorHelper {
    static disableSensor(brainedEntity: LivingEntity, sensorType: SensorType<any>): void;
    static enableSensor<T extends LivingEntity, U extends Sensor<T>>(brainedEntity: T, sensorType: SensorType<U>): void;
    static enableSensor<T extends LivingEntity, U extends Sensor<T>>(brainedEntity: T, sensorType: SensorType<U>, extraTick: boolean): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.ai' {
  import { Iterable } from 'java.lang';
  import { Iterator } from 'java.util';
  import { ShufflingList } from 'net.minecraft.world.entity.ai.behavior';

  class MemoryModificationCounter {
    lithium$getModCount(): number;
  }


  interface WeightedListIterable<U = any> extends Iterable<U> {}
  class WeightedListIterable<U = any> extends Iterable<U> {
    static cast<T>(list: ShufflingList<T>): Iterable<T>;
    iterator(): Iterator<U>;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.ai.non_poi_block_search' {
  import { Predicate, Consumer, BiPredicate } from 'java.util.function';
  import { BlockPos } from 'net.minecraft.core';
  import { LevelReader } from 'net.minecraft.world.level';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Long } from 'java.lang';
  import { ChunkAccess } from 'net.minecraft.world.level.chunk';
  import { Optional } from 'java.util';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { MutableBlockPos } from 'BlockPos';

  class CheckAndCacheBlockChecker {
    readonly shouldChunkLoad: boolean;
    readonly blockStatePredicate: Predicate;
    readonly minSectionY: number;
    constructor(origin: BlockPos, horizontalRangeInclusive: number, verticalRangeInclusive: number, levelReader: LevelReader, blockStatePredicate: Predicate<BlockState>, shouldChunkLoad: boolean);
    checkCachedSection(chunkX: number, chunkY: number, chunkZ: number): boolean;
    checkPosition(blockPos: BlockPos): boolean;
    get chunkSize(): number;
    getCachedChunkAccess(chunkPos: number): ChunkAccess;
    getCachedChunkAccess(blockPos: BlockPos): ChunkAccess;
    hasUnloadedPossibleChunks(): boolean;
    initializeChunks(): void;
    initializeChunks(chunkCollector: Consumer<Long>): void;
    shouldStop(): boolean;
  }


  class CommonBlockSearchesCheckAndCache {
    static blockPosFindClosestMatch(levelReader: LevelReader, livingEntity: LivingEntity, horizontalRange: number, verticalRange: number, blockStatePredicate: Predicate<BlockState>, shouldChunkLoad: boolean): Optional<BlockPos>;
  }


  class LithiumMoveToBlockGoal {
    lithium$findNearestBlock(var1: Predicate<BlockState>, var2: BiPredicate<ChunkAccess, MutableBlockPos>, var3: boolean): boolean;
  }


  class NonPOISearchDistances {
  }

}

declare module 'net.caffeinemc.mods.lithium.common.ai.non_poi_block_search.NonPOISearchDistances' {
  import { BlockPos } from 'net.minecraft.core';

  class MoveToBlockGoalDistances {
    static getMinimumSortOrderOfChunk(center: BlockPos, chunkPos: number): number;
    static getMinimumSortOrderOfChunk(center: BlockPos, chunkX: number, chunkZ: number): number;
    static getRing(dX: number, dZ: number): number;
    static getVanillaSortOrderInt(ring: number, dX: number, dZ: number): number;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.ai.pathing' {
  import { PathType, PathfindingContext } from 'net.minecraft.world.level.pathfinder';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockStateBase } from 'BlockBehaviour';
  import { LevelChunkSection } from 'net.minecraft.world.level.chunk';

  class BlockStatePathingCache {
    lithium$getNeighborPathNodeType(): PathType;
    lithium$getPathNodeType(): PathType;
    lithium$initializePathNodeTypeCache(): void;
  }


  class PathNodeCache {
    static getNeighborPathNodeType(state: BlockStateBase): PathType;
    static getNodeTypeFromNeighbors(context: PathfindingContext, x: number, y: number, z: number, fallback: PathType): PathType;
    static getPathNodeType(state: BlockState): PathType;
    static isSectionSafeAsNeighbor(section: LevelChunkSection): boolean;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.ai.WeightedListIterable' {
  import { Iterator } from 'java.util';
  import { WeightedEntry } from 'ShufflingList';

  interface ListIterator<U = any> extends Iterator<U> {}
  class ListIterator<U = any> extends Iterator<U> {
    constructor(inner: Iterator<WeightedEntry<U>>);
    hasNext(): boolean;
    next(): U;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.block' {
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { SectionedBlockChangeTracker } from 'net.caffeinemc.mods.lithium.common.tracking.block';
  import { Level } from 'net.minecraft.world.level';
  import { Predicate } from 'java.util.function';
  import { AtomicBoolean } from 'java.util.concurrent.atomic';

  class BlockCountingSection {
    lithium$mayContainAny(var1: TrackedBlockStatePredicate): boolean;
    lithium$trackBlockStateChange(var1: BlockState, var2: BlockState): void;
  }


  class BlockListeningSection {
    lithium$addToCallback(var1: ListeningBlockStatePredicate, var2: SectionedBlockChangeTracker, var3: number, var5: Level): void;
    lithium$removeFromCallback(var1: ListeningBlockStatePredicate, var2: SectionedBlockChangeTracker): void;
  }


  class BlockStateFlagHolder {
    lithium$getAllFlags(): number;
    lithium$initializeFlags(): void;
  }


  class BlockStateFlags {
    static readonly ENABLED: boolean;
    static readonly NUM_LISTENING_FLAGS: number;
    static readonly LISTENING_FLAGS: ListeningBlockStatePredicate[];
    static readonly LISTENING_MASK_OR: number;
    static readonly ANY: ListeningBlockStatePredicate;
    static readonly NUM_TRACKED_FLAGS: number;
    static readonly TRACKED_FLAGS: TrackedBlockStatePredicate[];
    static readonly OVERSIZED_SHAPE: TrackedBlockStatePredicate;
    static readonly PATH_NOT_OPEN: TrackedBlockStatePredicate;
    static readonly WATER: TrackedBlockStatePredicate;
    static readonly LAVA: TrackedBlockStatePredicate;
    static readonly FLAGS: TrackedBlockStatePredicate[];
    static readonly ENTITY_TOUCHABLE: TrackedBlockStatePredicate;
    test(operand: BlockState): boolean;
    test(operand: BlockState): boolean;
    test(operand: BlockState): boolean;
    test(operand: BlockState): boolean;
    test(operand: BlockState): boolean;
    test(operand: BlockState): boolean;
  }


  interface ListeningBlockStatePredicate extends TrackedBlockStatePredicate {}
  class ListeningBlockStatePredicate extends TrackedBlockStatePredicate {
    static LISTENING_MASK: number;
  }


  interface TrackedBlockStatePredicate extends Predicate<BlockState> {}
  class TrackedBlockStatePredicate extends Predicate<BlockState> {
    static readonly FULLY_INITIALIZED: AtomicBoolean;
    constructor(index: number);
    get index(): number;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.block.entity.inventory_change_tracking' {
  import { LithiumStackList } from 'net.caffeinemc.mods.lithium.common.hopper';
  import { Container } from 'net.minecraft.world';

  class InventoryChangeEmitter {
    emitCallbackReplaced(): void;
    lithium$emitContentModified(): void;
    lithium$emitFirstComparatorAdded(): void;
    lithium$emitRemoved(): void;
    lithium$emitStackListReplaced(): void;
    lithium$forwardContentChangeOnce(var1: InventoryChangeListener, var2: LithiumStackList): void;
    lithium$forwardMajorInventoryChanges(var1: InventoryChangeListener): void;
    lithium$stopForwardingMajorInventoryChanges(var1: InventoryChangeListener): void;
  }


  class InventoryChangeListener {
    handleStackListReplaced(inventory: Container): void;
    lithium$handleComparatorAdded(var1: Container): boolean;
    lithium$handleInventoryContentModified(var1: Container): void;
    lithium$handleInventoryRemoved(var1: Container): void;
  }


  interface InventoryChangeTracker extends InventoryChangeEmitter {}
  class InventoryChangeTracker extends InventoryChangeEmitter {
    listenForContentChangesOnce(stackList: LithiumStackList, inventoryChangeListener: InventoryChangeListener): void;
    listenForMajorInventoryChanges(inventoryChangeListener: InventoryChangeListener): void;
    stopListenForMajorInventoryChanges(inventoryChangeListener: InventoryChangeListener): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.block.entity.inventory_comparator_tracking' {
  import { Direction, BlockPos } from 'net.minecraft.core';
  import { Level } from 'net.minecraft.world.level';

  class ComparatorTracker {
    lithium$hasAnyComparatorNearby(): boolean;
    lithium$onComparatorAdded(var1: Direction, var2: number): void;
  }


  class ComparatorTracking {
    static findNearbyComparators(world: Level, pos: BlockPos): boolean;
    static notifyNearbyBlockEntitiesAboutNewComparator(world: Level, pos: BlockPos): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.block.entity' {
  import { LevelReader } from 'net.minecraft.world.level';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockPos } from 'net.minecraft.core';
  import { TickingBlockEntity } from 'net.minecraft.world.level.block.entity';
  import { WrappedBlockEntityTickInvokerAccessor } from 'net.caffeinemc.mods.lithium.mixin.world.block_entity_ticking.sleeping';

  class SetBlockStateHandlingBlockEntity {
    lithium$handleSetBlockState(): void;
  }


  class SetChangedHandlingBlockEntity {
    lithium$handleSetChanged(): void;
  }


  class ShapeUpdateHandlingBlockBehaviour {
    lithium$handleShapeUpdate(world: LevelReader, myBlockState: BlockState, myPos: BlockPos, posFrom: BlockPos, newState: BlockState): void;
  }


  class SleepingBlockEntity {
    static readonly SLEEPING_BLOCK_ENTITY_TICKER: TickingBlockEntity;
    isSleeping(): boolean;
    lithium$getSleepingTicker(): TickingBlockEntity;
    lithium$getTickWrapper(): WrappedBlockEntityTickInvokerAccessor;
    lithium$setSleepingTicker(var1: TickingBlockEntity): void;
    lithium$setTickWrapper(var1: WrappedBlockEntityTickInvokerAccessor): void;
    lithium$startSleeping(): boolean;
    setTicker(delegate: TickingBlockEntity): void;
    sleepOnlyCurrentTick(): void;
    wakeUpNow(): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.client' {
  import { TransientEntitySectionManager } from 'net.minecraft.world.level.entity';
  import { Entity } from 'net.minecraft.world.entity';

  class ClientWorldAccessor {
    lithium$getEntityManager(): TransientEntitySectionManager<Entity>;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.config' {
  import { File } from 'java.io';
  import { Collection } from 'java.util';
  import { Logger } from 'org.apache.logging.log4j';

  class LithiumConfig {
    get optionCount(): number;
    get optionOverrideCount(): number;
    getEffectiveOptionForMixin(mixinClassName: string): Option;
    getParent(option: Option): Option;
    static load(file: File): LithiumConfig;
  }


  class Option {
    constructor(name: string, enabled: boolean, userDefined: boolean);
    addDependency(dependencyOption: Option, requiredValue: boolean): void;
    addModOverride(enabled: boolean, modId: string): void;
    clearModsDefiningValue(): void;
    disableIfDependenciesNotMet(logger: Logger, config: LithiumConfig): boolean;
    get definingMods(): Collection<string>;
    get name(): string;
    isEnabled(): boolean;
    isEnabledRecursive(config: LithiumConfig): boolean;
    isModDefined(): boolean;
    isOverridden(): boolean;
    isUserDefined(): boolean;
    setEnabled(enabled: boolean, userDefined: boolean): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.entity' {
  import { BiPredicate, Supplier, Function } from 'java.util.function';
  import { Class, Iterable } from 'java.lang';
  import { EntityType, Entity } from 'net.minecraft.world.entity';
  import { ItemStack } from 'net.minecraft.world.item';
  import { List, ArrayList, Iterator } from 'java.util';
  import { VoxelShape } from 'net.minecraft.world.phys.shapes';
  import { Level, EntityGetter, CollisionGetter } from 'net.minecraft.world.level';
  import { AABB, Vec3 } from 'net.minecraft.world.phys';
  import { WorldBorder } from 'net.minecraft.world.level.border';
  import { ChunkAwareBlockCollisionSweeper } from 'net.caffeinemc.mods.lithium.common.entity.movement';
  import { PathNavigation } from 'net.minecraft.world.entity.ai.navigation';

  class EntityClassGroup {
    static readonly CUSTOM_COLLIDE_LIKE_MINECART_BOAT_WINDCHARGE: EntityClassGroup;
    constructor(classAndTypeFitEvaluator: BiPredicate<Class<any>, Supplier<EntityType<any>>>);
    clear(): void;
    contains(entity: Entity): boolean;
    contains(entityClass: Class<any>, entityType: EntityType<any>): boolean;
  }


  class EquipmentEntity {
    lithium$onEquipmentReplaced(var1: ItemStack, var2: ItemStack): void;
  }


  class FluidCachingEntity {
  }


  class LithiumEntityCollisions {
    static readonly EPSILON: number;
    static addEntityCollisionsIfRequired(getEntityCollisions: boolean, entity: Entity, world: Level, entityCollisions: VoxelShape[], movementSpace: AABB): boolean;
    static addLastBlockCollisionIfRequired(addLastBlockCollision: boolean, blockCollisionSweeper: ChunkAwareBlockCollisionSweeper, list: VoxelShape[]): boolean;
    static addWorldBorderCollisionIfRequired(getWorldBorderCollision: boolean, entity: Entity, worldBorderCollisions: ArrayList<VoxelShape>, movementSpace: AABB): boolean;
    static appendEntityCollisions(entityCollisions: VoxelShape[], world: Level, entity: Entity, box: AABB): void;
    static appendWorldBorderCollision(worldBorderCollisions: ArrayList<VoxelShape>, entity: Entity, box: AABB): void;
    static doesBoxCollideWithBlocks(world: Level, entity: Entity, box: AABB): boolean;
    static doesBoxCollideWithHardEntities(view: EntityGetter, entity: Entity, box: AABB): boolean;
    static doesBoxCollideWithWorldBorder(collisionView: CollisionGetter, entity: Entity, box: AABB): boolean;
    static getBlockCollisions(world: Level, entity: Entity, box: AABB): VoxelShape[];
    static getEntityWorldBorderCollisionIterable(view: EntityGetter, entity: Entity, box: AABB, includeWorldBorder: boolean): Iterable<VoxelShape>;
    static getSmallerBoxForSingleAxisMovement(movement: Vec3, entityBoundingBox: AABB, velY: number, velX: number, velZ: number): AABB;
    static getSupportingCollisionForEntity(world: Level, entity: Entity, entityBoundingBox: AABB): VoxelShape;
    static getWorldBorderCollision(collisionView: CollisionGetter, entity: Entity, box: AABB): VoxelShape;
    static isWithinWorldBorder(border: WorldBorder, box: AABB): boolean;
    iterator(): Iterator<VoxelShape>;
  }


  class NavigatingEntity {
    lithium$getRegisteredNavigation(): PathNavigation;
    lithium$isRegisteredToWorld(): boolean;
    lithium$setRegisteredToWorld(var1: PathNavigation): void;
    lithium$updateNavigationRegistration(): void;
  }


  class PositionedEntityTrackingSection {
    lithium$getPos(): number;
    lithium$setPos(var1: number): void;
  }


  class TypeFilterableListInternalAccess<T = any> {
    lithium$getOrCreateAllOfTypeRaw<S extends T>(var1: Class<S>): S[];
    lithium$replaceCollectionAndGet<S extends T>(var1: Class<S>, var2: Function<ArrayList<S>, S[]>): S[];
    lithium$replaceCollectionAndGet<S extends T>(var1: Class<S>, var2: ArrayList<S>): S[];
  }

}

declare module 'net.caffeinemc.mods.lithium.common.entity.EntityClassGroup' {
  import { EntityClassGroup } from 'net.caffeinemc.mods.lithium.common.entity';
  import { BiPredicate, Supplier } from 'java.util.function';
  import { Class } from 'java.lang';
  import { EntityType } from 'net.minecraft.world.entity';

  interface NoDragonClassGroup extends EntityClassGroup {}
  class NoDragonClassGroup extends EntityClassGroup {
    static readonly BOAT_SHULKER_LIKE_COLLISION: NoDragonClassGroup;
    constructor(classAndTypeFitEvaluator: BiPredicate<Class<any>, Supplier<EntityType<any>>>);
  }

}

declare module 'net.caffeinemc.mods.lithium.common.entity.EquipmentEntity' {
  import { EnchantmentSubscriber } from 'net.caffeinemc.mods.lithium.common.util.change_tracking.ChangeSubscriber';
  import { ItemStack } from 'net.minecraft.world.item';

  interface TickableEnchantmentTrackingEntity extends EnchantmentSubscriber<ItemStack> {}
  class TickableEnchantmentTrackingEntity extends EnchantmentSubscriber<ItemStack> {
    lithium$updateHasTickableEnchantments(var1: ItemStack, var2: ItemStack): void;
  }


  class EquipmentTrackingEntity {
    lithium$onEquipmentChanged(): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.entity.item' {
  import { AbortableIterationConsumer } from 'net.minecraft.util';
  import { ItemEntity } from 'net.minecraft.world.entity.item';
  import { AABB } from 'net.minecraft.world.phys';
  import { Predicate, IntFunction, Consumer } from 'java.util.function';
  import { ArrayList, AbstractList, Collection } from 'java.util';
  import { Continuation } from 'AbortableIterationConsumer';
  import { CountChangeSubscriber } from 'net.caffeinemc.mods.lithium.common.util.change_tracking.ChangeSubscriber';
  import { Stream } from 'java.util.stream';

  interface ItemEntityLazyIterationConsumer extends AbortableIterationConsumer<ItemEntity> {}
  class ItemEntityLazyIterationConsumer extends AbortableIterationConsumer<ItemEntity> {
    constructor(searchingEntity: ItemEntity, box: AABB, predicate: Predicate<ItemEntity>);
    accept(otherItemEntity: ItemEntity): Continuation;
    get mergeEntities(): ArrayList<ItemEntity>;
  }


  interface ItemEntityList extends CountChangeSubscriber<ItemEntity>, AbstractList<ItemEntity> {}
  class ItemEntityList extends CountChangeSubscriber<ItemEntity> {
    static readonly UPGRADE_THRESHOLD: number;
    constructor(delegate: ArrayList<ItemEntity>);
    add(element: ItemEntity): boolean;
    clear(): void;
    consumeForEntityStacking(searchingEntity: ItemEntity, itemEntityConsumer: AbortableIterationConsumer<ItemEntity>): Continuation;
    contains(o: any): boolean;
    containsAll(c: Collection<any>): boolean;
    equals(o: any): boolean;
    forEach(action: Consumer<ItemEntity>): void;
    get(index: number): ItemEntity;
    hashCode(): number;
    indexOf(o: any): number;
    isEmpty(): boolean;
    lastIndexOf(o: any): number;
    lithium$forceUnsubscribe(publisher: ItemEntity, subscriberData: number): void;
    lithium$notify(publisher: ItemEntity, subscriberData: number): void;
    lithium$notifyCount(element: ItemEntity, index: number, newCount: number): void;
    parallelStream(): Stream<ItemEntity>;
    remove(o: any): boolean;
    remove(index: number): ItemEntity;
    set(i: number, newElement: ItemEntity): ItemEntity;
    size(): number;
    stream(): Stream<ItemEntity>;
    toArray(): any[];
    toArray<U>(a: U[]): U[];
    toArray<U>(generator: IntFunction<U[]>): U[];
  }

}

declare module 'net.caffeinemc.mods.lithium.common.entity.LithiumEntityCollisions' {
  import { VoxelShape } from 'net.minecraft.world.phys.shapes';

  class SupportingBlockCollisionShapeProvider {
    lithium$getCollisionShapeBelow(): VoxelShape;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.entity.movement' {
  import { AbstractIterator } from 'com.google.common.collect';
  import { VoxelShape } from 'net.minecraft.world.phys.shapes';
  import { Level } from 'net.minecraft.world.level';
  import { Entity } from 'net.minecraft.world.entity';
  import { AABB } from 'net.minecraft.world.phys';
  import { Iterator, List } from 'java.util';

  interface ChunkAwareBlockCollisionSweeper extends AbstractIterator<VoxelShape> {}
  class ChunkAwareBlockCollisionSweeper extends AbstractIterator<VoxelShape> {
    constructor(world: Level, entity: Entity, box: AABB);

    constructor(world: Level, entity: Entity, box: AABB, hideLastCollision: boolean);
    collectAll(): VoxelShape[];
    computeNext(): VoxelShape;
    get lastCollision(): VoxelShape;
    get lastCollisionIterator(): Iterator<VoxelShape>;
    hasNext(): boolean;
    next(): VoxelShape;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.entity.projectile' {
  import { EntityClassGroup } from 'net.caffeinemc.mods.lithium.common.entity';

  class ProjectileEntityClassGroup {
    static readonly OPTIMIZED_PROJECTILES: EntityClassGroup;
    static readonly CAN_MAYBE_BE_HIT_BY_OPTIMIZED_PROJECTILE: EntityClassGroup;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.entity.pushable' {
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Predicate } from 'java.util.function';
  import { EntityClassGroup } from 'net.caffeinemc.mods.lithium.common.entity';

  class BlockCachingEntity {
    lithium$OnBlockCacheDeleted(): void;
    lithium$OnBlockCacheSet(newState: BlockState): void;
    lithium$SetClimbingMobCachingSectionUpdateBehavior(listening: boolean): void;
    lithium$getCachedFeetBlockState(): BlockState;
  }


  interface EntityPushablePredicate<S = any> extends Predicate<S> {}
  class EntityPushablePredicate<S = any> extends Predicate<S> {
    static and<T>(first: Predicate<T>, second: Predicate<T>, t: T): Predicate<T>;
  }


  class PushableEntityClassGroup {
    static readonly CACHABLE_UNPUSHABILITY: EntityClassGroup;
    static readonly MAYBE_PUSHABLE: EntityClassGroup;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.hopper' {
  import { Enum } from 'java.lang';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { List } from 'java.util';
  import { Container, WorldlyContainer, CompoundContainer } from 'net.minecraft.world';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Direction, BlockPos, NonNullList } from 'net.minecraft.core';
  import { Level } from 'net.minecraft.world.level';
  import { LevelChunk } from 'net.minecraft.world.level.chunk';
  import { LithiumInventory, LithiumDefaultedList } from 'net.caffeinemc.mods.lithium.api.inventory';
  import { InventoryChangeTracker, InventoryChangeEmitter, InventoryChangeListener } from 'net.caffeinemc.mods.lithium.common.block.entity.inventory_change_tracking';
  import { ComparatorTracker } from 'net.caffeinemc.mods.lithium.common.block.entity.inventory_comparator_tracking';
  import { CountChangeSubscriber } from 'net.caffeinemc.mods.lithium.common.util.change_tracking.ChangeSubscriber';

  class BlockStateOnlyInventory {
  }


  interface ComparatorUpdatePattern extends Enum<ComparatorUpdatePattern> {}
  class ComparatorUpdatePattern extends Enum<ComparatorUpdatePattern> {
    static readonly NO_UPDATE: ComparatorUpdatePattern;
    static readonly UPDATE: ComparatorUpdatePattern;
    static readonly DECREMENT_UPDATE_INCREMENT_UPDATE: ComparatorUpdatePattern;
    static readonly UPDATE_DECREMENT_UPDATE_INCREMENT_UPDATE: ComparatorUpdatePattern;
    apply(blockEntity: BlockEntity, stackList: LithiumStackList): void;
    isChainable(): boolean;
    thenDecrementUpdateIncrementUpdate(): ComparatorUpdatePattern;
    thenUpdate(): ComparatorUpdatePattern;
    static valueOf(name: string): ComparatorUpdatePattern;
    static values(): ComparatorUpdatePattern[];
  }


  class HopperCachingState {
  }


  class HopperHelper {
    static determineComparatorUpdatePattern(from: Container, fromStackList: LithiumStackList): ComparatorUpdatePattern;
    static replaceDoubleInventory(blockInventory: Container): Container;
    static tryMoveSingleItem(to: Container, stack: ItemStack, fromDirection: Direction): boolean;
    static tryMoveSingleItem(to: Container, toSided: WorldlyContainer, transferStack: ItemStack, transferChecker: ItemStack, targetSlot: number, fromDirection: Direction): boolean;
    static updateHopperOnUpdateSuppression(level: Level, pos: BlockPos, flags: number, worldChunk: LevelChunk, stateChange: boolean): void;
  }


  class InventoryHelper {
    static getLithiumStackList(inventory: LithiumInventory): LithiumStackList;
    static getLithiumStackListOrNull(inventory: LithiumInventory): LithiumStackList;
  }


  interface LithiumDoubleInventory extends LithiumInventory, InventoryChangeTracker, InventoryChangeEmitter, InventoryChangeListener, ComparatorTracker, CompoundContainer {}
  class LithiumDoubleInventory extends LithiumInventory {
    get inventoryLithium(): NonNullList<ItemStack>;
    static getLithiumInventory(doubleInventory: CompoundContainer): LithiumDoubleInventory;
    lithium$emitContentModified(): void;
    lithium$emitFirstComparatorAdded(): void;
    lithium$emitRemoved(): void;
    lithium$emitStackListReplaced(): void;
    lithium$forwardContentChangeOnce(inventoryChangeListener: InventoryChangeListener, stackList: LithiumStackList): void;
    lithium$forwardMajorInventoryChanges(inventoryChangeListener: InventoryChangeListener): void;
    lithium$handleComparatorAdded(inventory: Container): boolean;
    lithium$handleInventoryContentModified(inventory: Container): void;
    lithium$handleInventoryRemoved(inventory: Container): void;
    lithium$hasAnyComparatorNearby(): boolean;
    lithium$onComparatorAdded(direction: Direction, offset: number): void;
    lithium$stopForwardingMajorInventoryChanges(inventoryChangeListener: InventoryChangeListener): void;
    set inventoryLithium(inventory: NonNullList<ItemStack>);
  }


  interface LithiumDoubleStackList extends LithiumStackList {}
  class LithiumDoubleStackList extends LithiumStackList {
    constructor(doubleInventory: LithiumDoubleInventory, first: LithiumStackList, second: LithiumStackList, maxCountPerStack: number);
    add(slot: number, element: ItemStack): void;
    changed(): void;
    changedALot(): void;
    changedInteractionConditions(): void;
    clear(): void;
    clearSignalStrengthOverride(): void;
    get(index: number): ItemStack;
    get fullSlots(): number;
    get modCount(): number;
    get occupiedSlots(): number;
    static getOrCreate(doubleInventory: LithiumDoubleInventory, first: LithiumStackList, second: LithiumStackList, maxCountPerStack: number): LithiumDoubleStackList;
    getSignalStrength(inventory: Container): number;
    hasSignalStrengthOverride(): boolean;
    lithium$forceUnsubscribe(publisher: ItemStack, subscriberData: number): void;
    lithium$notify(publisher: ItemStack, subscriberData: number): void;
    lithium$notifyCount(stack: ItemStack, index: number, newCount: number): void;
    maybeSendsComparatorUpdatesOnFailedExtract(): boolean;
    remove(index: number): ItemStack;
    removeInventoryModificationCallback(inventoryModificationCallback: InventoryChangeTracker): void;
    runComparatorUpdatePatternOnFailedExtract(masterStackList: LithiumStackList, inventory: Container): void;
    set(index: number, element: ItemStack): ItemStack;
    setNextInventoryModificationCallback(nextInventoryModificationCallback: InventoryChangeTracker): void;
    setReducedSignalStrengthOverride(): void;
    size(): number;
  }


  interface LithiumStackList extends LithiumDefaultedList, CountChangeSubscriber<ItemStack>, NonNullList<ItemStack> {}
  class LithiumStackList extends LithiumDefaultedList {
    constructor(original: NonNullList<ItemStack>, maxCountPerStack: number);

    constructor(maxCountPerStack: number);
    add(slot: number, element: ItemStack): void;
    changed(): void;
    changedALot(): void;
    changedInteractionConditions(): void;
    clear(): void;
    clearSignalStrengthOverride(): void;
    get fullSlots(): number;
    get modCount(): number;
    get occupiedSlots(): number;
    getSignalStrength(inventory: Container): number;
    hasSignalStrengthOverride(): boolean;
    lithium$forceUnsubscribe(publisher: ItemStack, subscriberData: number): void;
    lithium$notify(publisher: ItemStack, subscriberData: number): void;
    lithium$notifyCount(stack: ItemStack, index: number, newCount: number): void;
    maybeSendsComparatorUpdatesOnFailedExtract(): boolean;
    remove(index: number): ItemStack;
    removeInventoryModificationCallback(inventoryModificationCallback: InventoryChangeTracker): void;
    runComparatorUpdatePatternOnFailedExtract(masterStackList: LithiumStackList, inventory: Container): void;
    set(index: number, element: ItemStack): ItemStack;
    setNextInventoryModificationCallback(nextInventoryModificationCallback: InventoryChangeTracker): void;
    setReducedSignalStrengthOverride(): void;
  }


  class UpdateReceiver {
    lithium$invalidateCacheOnNeighborUpdate(var1: boolean): void;
    lithium$invalidateCacheOnNeighborUpdate(var1: Direction): void;
    lithium$invalidateCacheOnUndirectedNeighborUpdate(): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.hopper.HopperCachingState' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface BlockInventory extends Enum<BlockInventory> {}
  class BlockInventory extends Enum<BlockInventory> {
    static readonly UNKNOWN: BlockInventory;
    static readonly BLOCK_STATE: BlockInventory;
    static readonly BLOCK_ENTITY: BlockInventory;
    static readonly REMOVAL_TRACKING_BLOCK_ENTITY: BlockInventory;
    static readonly NO_BLOCK_INVENTORY: BlockInventory;
    static valueOf(name: string): BlockInventory;
    static values(): BlockInventory[];
  }

}

declare module 'net.caffeinemc.mods.lithium.common' {
  import { Logger } from 'org.slf4j';

  class LithiumMod {
    static get version(): string;
    static logger(): Logger;
    static onInitialization(version: string): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.reflection' {
  import { Class } from 'java.lang';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  class ReflectionUtil {
    static hasMethodOverride(clazz: Class<any>, superclass: Class<any>, fallbackResult: boolean, methodName: string, ...methodArgs: Class<any>[]): boolean;
    static isBlockStateEntityTouchable(operand: BlockState): boolean;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.services' {
  import { Map, List } from 'java.util';
  import { Option } from 'net.caffeinemc.mods.lithium.common.config';
  import { MixinOverride } from 'net.caffeinemc.mods.lithium.common.services.PlatformMixinOverrides';
  import { HopperBlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Path } from 'java.nio.file';
  import { Class } from 'java.lang';

  class PlatformMappingInformation {
    static readonly INSTANCE: PlatformMappingInformation;
    mapMethodName(var1: string, var2: string, var3: string, var4: string, var5: string): string;
  }


  class PlatformMixinOverrides {
    static readonly INSTANCE: PlatformMixinOverrides;
    applyLithiumCompat(var1: Map<string, Option>): void;
    applyModOverrides(): MixinOverride[];
    static getInstance(): PlatformMixinOverrides;
  }


  class PlatformModCompat {
    static readonly INSTANCE: PlatformModCompat;
    canHopperInteractWithApiBlockInventory(var1: HopperBlockEntity, var2: BlockState, var3: boolean): boolean;
  }


  class PlatformRuntimeInformation {
    static readonly INSTANCE: PlatformRuntimeInformation;
    get configDirectory(): Path;
    get gameDirectory(): Path;
    static getInstance(): PlatformRuntimeInformation;
    isDevelopmentEnvironment(): boolean;
    isModInLoadingList(var1: string): boolean;
    platformHasEarlyLoadingScreen(): boolean;
    platformUsesRefmap(): boolean;
    usesAlphaMultiplication(): boolean;
  }


  class Services {
    static load<T>(clazz: Class<T>): T;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.shapes' {
  import { DiscreteVoxelShape, VoxelShape, BooleanOp } from 'net.minecraft.world.phys.shapes';
  import { Axis } from 'Direction';
  import { Direction, AxisCycle } from 'net.minecraft.core';
  import { AABB, Vec3 } from 'net.minecraft.world.phys';
  import { DoubleList } from 'it.unimi.dsi.fastutil.doubles';
  import { Optional, List } from 'java.util';
  import { CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Boolean } from 'java.lang';
  import { DoubleLineConsumer } from 'Shapes';

  interface CuboidVoxelSet extends DiscreteVoxelShape {}
  class CuboidVoxelSet extends DiscreteVoxelShape {
    fill(x: number, y: number, z: number): void;
    firstFull(axis: Axis): number;
    isEmpty(): boolean;
    isFull(x: number, y: number, z: number): boolean;
    lastFull(axis: Axis): number;
  }


  class OffsetVoxelShapeCache {
    lithium$getOffsetSimplifiedShape(var1: number, var2: Direction): VoxelShape;
    lithium$setShape(var1: number, var2: Direction, var3: VoxelShape): void;
  }


  interface VoxelShapeAlignedCuboid extends VoxelShapeSimpleCube {}
  class VoxelShapeAlignedCuboid extends VoxelShapeSimpleCube {
    constructor(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number, xRes: number, yRes: number, zRes: number);

    constructor(voxels: DiscreteVoxelShape, minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number, xyzResolution: number);
    collideX(cycleDirection: AxisCycle, box: AABB, maxDist: number): number;
    getCoords(axis: Axis): DoubleList;
    move(x: number, y: number, z: number): VoxelShape;
  }


  interface VoxelShapeAlignedCuboidOffset extends VoxelShapeAlignedCuboid {}
  class VoxelShapeAlignedCuboidOffset extends VoxelShapeAlignedCuboid {
    constructor(originalShape: VoxelShapeAlignedCuboid, voxels: DiscreteVoxelShape, xOffset: number, yOffset: number, zOffset: number);
    collideX(cycleDirection: AxisCycle, box: AABB, maxDist: number): number;
    getCoords(axis: Axis): DoubleList;
    move(x: number, y: number, z: number): VoxelShape;
  }


  class VoxelShapeCaster {
    intersects(var1: AABB, var2: number, var4: number, var6: number): boolean;
  }


  interface VoxelShapeEmpty extends VoxelShapeCaster, VoxelShape {}
  class VoxelShapeEmpty extends VoxelShapeCaster {
    constructor(voxels: DiscreteVoxelShape);
    getCoords(axis: Axis): DoubleList;
    intersects(box: AABB, blockX: number, blockY: number, blockZ: number): boolean;
    isEmpty(): boolean;
    max(axis: Axis): number;
    min(axis: Axis): number;
  }


  class VoxelShapeHelper {
    static getClosestPointTo(target: Vec3, collidingShape: VoxelShape, boxes: AABB[]): Optional<Vec3>;
  }


  class VoxelShapeMatchesAnywhere {
    static cuboidMatchesAnywhere(shapeA: VoxelShape, shapeB: VoxelShape, predicate: BooleanOp, cir: CallbackInfoReturnable<boolean>): void;
  }


  interface VoxelShapeSimpleCube extends VoxelShapeCaster, VoxelShape {}
  class VoxelShapeSimpleCube extends VoxelShapeCaster {
    readonly isTiny: boolean;
    constructor(voxels: DiscreteVoxelShape, minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number);
    bounds(): AABB;
    collideX(cycleDirection: AxisCycle, box: AABB, maxDist: number): number;
    forAllBoxes(boxConsumer: DoubleLineConsumer): void;
    getCoords(axis: Axis): DoubleList;
    intersects(box: AABB, blockX: number, blockY: number, blockZ: number): boolean;
    isEmpty(): boolean;
    max(axis: Axis): number;
    min(axis: Axis): number;
    move(x: number, y: number, z: number): VoxelShape;
    toAabbs(): AABB[];
  }

}

declare module 'net.caffeinemc.mods.lithium.common.shapes.lists' {
  import { AbstractDoubleList } from 'it.unimi.dsi.fastutil.doubles';

  interface OffsetFractionalDoubleList extends AbstractDoubleList {}
  class OffsetFractionalDoubleList extends AbstractDoubleList {
    constructor(numSections: number, offset: number);
    getDouble(position: number): number;
    size(): number;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.shapes.pairs' {
  import { IndexMerger } from 'net.minecraft.world.phys.shapes';
  import { DoubleList } from 'it.unimi.dsi.fastutil.doubles';
  import { IndexConsumer } from 'IndexMerger';

  interface LithiumDoublePairList extends IndexMerger {}
  class LithiumDoublePairList extends IndexMerger {
    constructor(aPoints: DoubleList, bPoints: DoubleList, flag1: boolean, flag2: boolean);
    forMergedIndexes(predicate: IndexConsumer): boolean;
    get list(): DoubleList;
    size(): number;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.tracking.block' {
  import { Entity } from 'net.minecraft.world.entity';
  import { AABB } from 'net.minecraft.world.phys';
  import { TagKey } from 'net.minecraft.tags';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level } from 'net.minecraft.world.level';
  import { BlockListeningSection, ListeningBlockStatePredicate } from 'net.caffeinemc.mods.lithium.common.block';
  import { SectionPos } from 'net.minecraft.core';
  import { WorldSectionBox } from 'net.caffeinemc.mods.lithium.common.util.tuples';

  class BlockCache {
    cacheSupportingBlock(blockState: BlockState): void;
    canSkipBlockTouching(): boolean;
    canSkipSupportingBlockSearch(): boolean;
    get cachedSupportingBlock(): BlockState;
    get isSuffocating(): number;
    get isTouchingFireLava(): number;
    getStationaryFluidHeightOrDefault(fluid: TagKey<Fluid>, defaultValue: number): number;
    initTracking(entity: Entity): void;
    isTracking(): boolean;
    remove(): void;
    resetCachedInfo(): void;
    resetTrackedPos(boundingBox: AABB): void;
    setCachedFluidHeight(fluid: TagKey<Fluid>, fluidHeight: number): void;
    setCachedIsSuffocating(b: boolean): void;
    setCachedTouchingFireLava(b: boolean): void;
    setCanSkipBlockTouching(value: boolean): void;
    setCanSkipSupportingBlockSearch(canSkip: boolean): void;
    updateCache(entity: Entity): void;
  }


  class BlockCacheProvider {
    getUpdatedBlockCache(entity: Entity): BlockCache;
    lithium$getBlockCache(): BlockCache;
  }


  class ChunkSectionChangeCallback {
    addTracker(tracker: SectionedBlockChangeTracker, blockGroup: ListeningBlockStatePredicate): number;
    static create(sectionPos: number, world: Level): ChunkSectionChangeCallback;
    static init(): void;
    onBlockChange(blockGroupIndex: number, section: BlockListeningSection): number;
    onChunkSectionInvalidated(sectionPos: SectionPos): void;
    removeTracker(tracker: SectionedBlockChangeTracker, blockGroup: ListeningBlockStatePredicate): number;
  }


  class SectionedBlockChangeTracker {
    readonly trackedWorldSections: WorldSectionBox;
    readonly blockGroup: ListeningBlockStatePredicate;
    constructor(trackedWorldSections: WorldSectionBox, blockGroup: ListeningBlockStatePredicate);
    equals(obj: any): boolean;
    hashCode(): number;
    isUnchangedSince(lastCheckedTime: number): boolean;
    listenToAllSections(): void;
    matchesMovedBox(box: AABB): boolean;
    onChunkSectionInvalidated(sectionPos: SectionPos): void;
    register(): void;
    static registerAt(world: Level, entityBoundingBox: AABB, blockGroup: ListeningBlockStatePredicate): SectionedBlockChangeTracker;
    setChanged(section: BlockListeningSection): void;
    setChanged(atTime: number): void;
    unregister(): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.tracking.entity' {
  import { EntitySectionStorage, EntityAccess } from 'net.minecraft.world.level.entity';
  import { List } from 'java.util';
  import { Reference2IntOpenHashMap } from 'it.unimi.dsi.fastutil.objects';
  import { Entity } from 'net.minecraft.world.entity';
  import { Class } from 'java.lang';
  import { WorldSectionBox } from 'net.caffeinemc.mods.lithium.common.util.tuples';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { AABB } from 'net.minecraft.world.phys';

  class EntityMovementTrackerSection {
    lithium$addListener(var1: SectionedEntityMovementTracker<any, any>): void;
    lithium$getChangeTime(var1: number): number;
    lithium$listenToMovementOnce<S, E extends EntityAccess>(var1: SectionedEntityMovementTracker<E, S>, var2: number): void;
    lithium$removeListenToMovementOnce<S, E extends EntityAccess>(var1: SectionedEntityMovementTracker<E, S>, var2: number): void;
    lithium$removeListener(var1: EntitySectionStorage<any>, var2: SectionedEntityMovementTracker<any, any>): void;
    lithium$trackEntityMovement(var1: number, var2: number): void;
  }


  class MovementTrackerHelper {
    static readonly MOVEMENT_NOTIFYING_ENTITY_CLASSES: List;
    static CLASS_2_NOTIFY_MASK: Reference2IntOpenHashMap;
    static readonly NUM_MOVEMENT_NOTIFYING_CLASSES: number;
    static getNotificationMask(entity: Entity): number;
  }


  class SectionedEntityMovementListener {
    lithium$handleEntityMovement(var1: Class<any>): void;
  }


  class SectionedEntityMovementTracker<E extends EntityAccess = any, S = any> {
    constructor(interactionChunks: WorldSectionBox, clazz: Class<S>);
    emitEntityMovement(classMask: number, section: EntityMovementTrackerSection): void;
    equals(obj: any): boolean;
    hashCode(): number;
    isUnchangedSince(lastCheckedTime: number): boolean;
    listenToEntityMovementOnce(listener: SectionedEntityMovementListener): void;
    onSectionEnteredRange(section: EntityMovementTrackerSection): void;
    onSectionLeftRange(section: EntityMovementTrackerSection): void;
    register(world: ServerLevel): void;
    unRegister(world: ServerLevel): void;
  }


  interface SectionedInventoryEntityMovementTracker<S = any> extends SectionedEntityMovementTracker<Entity, S> {}
  class SectionedInventoryEntityMovementTracker<S = any> extends SectionedEntityMovementTracker<Entity, S> {
    constructor(entityAccessBox: WorldSectionBox, clazz: Class<S>);
    getEntities(box: AABB): S[];
    static registerAt<S>(world: ServerLevel, interactionArea: AABB, clazz: Class<S>): SectionedInventoryEntityMovementTracker<S>;
  }


  interface SectionedItemEntityMovementTracker<S extends Entity = any> extends SectionedEntityMovementTracker<Entity, S> {}
  class SectionedItemEntityMovementTracker<S extends Entity = any> extends SectionedEntityMovementTracker<Entity, S> {
    constructor(worldSectionBox: WorldSectionBox, clazz: Class<S>);
    getEntities(interactionArea: AABB): S[];
    static registerAt<S extends Entity>(world: ServerLevel, interactionArea: AABB, clazz: Class<S>): SectionedItemEntityMovementTracker<S>;
  }


  class ToggleableMovementTracker {
    lithium$setNotificationMask(var1: number): number;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.util' {
  import { LevelChunk } from 'net.minecraft.world.level.chunk';
  import { Direction, BlockPos, Holder } from 'net.minecraft.core';

  class ArrayConstants {
    static readonly EMPTY: number[];
    static readonly ZERO: number[];
  }


  class ChunkConstants {
    static readonly DUMMY_CHUNK: LevelChunk;
  }


  class DirectionConstants {
    static readonly ALL: Direction[];
    static readonly VERTICAL: Direction[];
    static readonly HORIZONTAL: Direction[];
    static readonly HORIZONTAL_OPPOSITE_INDICES: number[];
  }


  class Distances {
    static getClosestAlongSectionAxis(originAxis: number, chunkAxis: number): number;
    static getClosestPositionWithinChunk(origin: BlockPos, chunkX: number, chunkZ: number): number;
    static getMinChunkToBlockDistanceL2Sq(origin: BlockPos, chunkX: number, chunkZ: number): number;
    static isWithinCircleRadius(origin: BlockPos, radiusSq: number, pos: BlockPos): boolean;
    static isWithinSquareRadius(origin: BlockPos, radius: number, pos: BlockPos): boolean;
  }


  class POIRegistryEntries {
    static readonly NETHER_PORTAL_ENTRY: Holder;
    static readonly HOME_ENTRY: Holder;
  }


  class Pos {
  }

}

declare module 'net.caffeinemc.mods.lithium.common.util.change_tracking' {
  import { ItemStack } from 'net.minecraft.world.item';

  class ChangePublisher<T = any> {
    lithium$isSubscribedWithData(subscriber: ChangeSubscriber<ItemStack>, subscriberData: number): boolean;
    lithium$subscribe(var1: ChangeSubscriber<T>, var2: number): void;
    lithium$unsubscribe(var1: ChangeSubscriber<T>): number;
    lithium$unsubscribeWithData(subscriber: ChangeSubscriber<T>, index: number): void;
  }


  class ChangeSubscriber<T = any> {
    static combine<T>(prevSubscriber: ChangeSubscriber<T>, prevSData: number, newSubscriber: ChangeSubscriber<T>, newSData: number): ChangeSubscriber<T>;
    static containsSubscriber(subscriber: ChangeSubscriber<ItemStack>, subscriberData: number, subscriber1: ChangeSubscriber<ItemStack>, subscriberData1: number): boolean;
    static dataOf(subscribers: ChangeSubscriber<any>, subscriber: ChangeSubscriber<any>, subscriberData: number): number;
    static dataWithout<T>(prevSubscriber: ChangeSubscriber<T>, removedSubscriber: ChangeSubscriber<T>, subscriberData: number): number;
    static dataWithout<T>(prevSubscriber: ChangeSubscriber<T>, removedSubscriber: ChangeSubscriber<T>, subscriberData: number, removedSubscriberData: number, matchData: boolean): number;
    lithium$forceUnsubscribe(var1: T, var2: number): void;
    lithium$notify(var1: T, var2: number): void;
    static without<T>(prevSubscriber: ChangeSubscriber<T>, removedSubscriber: ChangeSubscriber<T>): ChangeSubscriber<T>;
    static without<T>(prevSubscriber: ChangeSubscriber<T>, removedSubscriber: ChangeSubscriber<T>, removedSubscriberData: number, matchData: boolean): ChangeSubscriber<T>;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.util.change_tracking.ChangeSubscriber' {
  import { ArrayList } from 'java.util';
  import { ChangeSubscriber } from 'net.caffeinemc.mods.lithium.common.util.change_tracking';
  import { IntArrayList } from 'it.unimi.dsi.fastutil.ints';

  interface Multi<T = any> extends CountChangeSubscriber<T>, EnchantmentSubscriber<T> {}
  class Multi<T = any> extends CountChangeSubscriber<T> {
    constructor(subscribers: ArrayList<ChangeSubscriber<T>>, subscriberDatas: IntArrayList);
    lithium$forceUnsubscribe(publisher: T, subscriberData: number): void;
    lithium$notify(publisher: T, subscriberData: number): void;
    lithium$notifyAfterEnchantmentChange(publisher: T, subscriberData: number): void;
    lithium$notifyCount(publisher: T, subscriberData: number, newCount: number): void;
  }


  interface EnchantmentSubscriber<T = any> extends ChangeSubscriber<T> {}
  class EnchantmentSubscriber<T = any> extends ChangeSubscriber<T> {
    lithium$notifyAfterEnchantmentChange(var1: T, var2: number): void;
  }


  interface CountChangeSubscriber<T = any> extends ChangeSubscriber<T> {}
  class CountChangeSubscriber<T = any> extends ChangeSubscriber<T> {
    lithium$notifyCount(var1: T, var2: number, var3: number): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.util.collections' {
  import { AbstractList, Iterator, BitSet, ArrayList, List, Collection, ListIterator, Comparator, Spliterator } from 'java.util';
  import { SortedArraySet, RandomSource } from 'net.minecraft.util';
  import { Ticket } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { ChunkAccess } from 'net.minecraft.world.level.chunk';
  import { LongIterable, LongIterator, Long2ObjectOpenHashMap } from 'it.unimi.dsi.fastutil.longs';
  import { IntIterable, IntIterator, IntArrayList } from 'it.unimi.dsi.fastutil.ints';
  import { Runnable } from 'java.lang';
  import { Consumer, Predicate, UnaryOperator } from 'java.util.function';
  import { Stream } from 'java.util.stream';
  import { Callback } from 'net.caffeinemc.mods.lithium.common.util.collections.ListeningLong2ObjectOpenHashMap';
  import { PossibleJump } from 'LongJumpToRandomPos';
  import { ObjectArrayList, ReferenceArrayList } from 'it.unimi.dsi.fastutil.objects';
  import { PredicateFilteredList } from 'net.caffeinemc.mods.lithium.common.util.collections.PredicateFilterableList';

  interface BucketedList<T = any> extends AbstractList<T> {}
  class BucketedList<T = any> extends AbstractList<T> {
    constructor(numBuckets: number);
    addToBucket(bucket: number, element: T): void;
    get(index: number): T;
    hasNext(): boolean;
    iterator(): Iterator<T>;
    next(): T;
    size(): number;
  }


  interface ChunkTicketSortedArraySet<T = any> extends SortedArraySet<Ticket> {}
  class ChunkTicketSortedArraySet<T = any> extends SortedArraySet<Ticket> {
    constructor(initialCapacity: number);
    addExpireTime(time: number): void;
    get minExpireTime(): number;
    invalidateExpireTime(): void;
    recalculateExpireTime(): void;
    remove(object: any): boolean;
  }


  class FixedChunkAccessSectionBitBuffer {
    readonly xMin: number;
    readonly yMin: number;
    readonly zMin: number;
    readonly xLength: number;
    readonly yLength: number;
    readonly zLength: number;
    readonly numChunks: number;
    readonly numSections: number;
    readonly chunkSectionBits: BitSet;
    readonly chunkAccesses: ArrayList;
    constructor(x0: number, x1: number, y0: number, y1: number, z0: number, z1: number);

    constructor(center: BlockPos, horizontalRangeInclusive: number, verticalRangeInclusive: number);
    get chunkPosInRange(): LongIterable;
    get chunkPosInRangeIterator(): LongIterator;
    get sectionYInRange(): IntIterable;
    get sectionYInRangeIterator(): IntIterator;
    getChunkAccess(chunkPos: number): ChunkAccess;
    getChunkAccess(blockPos: BlockPos): ChunkAccess;
    getChunkIndex(x: number, z: number): number;
    getChunkIndex(chunkPos: number): number;
    getChunkSectionBit(blockPos: BlockPos): boolean;
    getChunkSectionBit(chunkX: number, chunkY: number, chunkZ: number): boolean;
    getSectionIndex(x: number, y: number, z: number): number;
    getSectionIndex(sectionPos: number): number;
    hasNext(): boolean;
    hasNext(): boolean;
    hasNoTrueChunkSections(): boolean;
    iterator(): LongIterator;
    iterator(): IntIterator;
    nextInt(): number;
    nextLong(): number;
    setChunkAccess(chunkPos: number, chunkAccess: ChunkAccess): void;
    setChunkAccess(blockPos: BlockPos, chunkAccess: ChunkAccess): void;
    setChunkSectionStatus(sectionPos: number, value: boolean): void;
  }


  interface HashedReferenceList<T = any> extends List<T> {}
  class HashedReferenceList<T = any> extends List<T> {
    constructor(list: T[]);
    add(t: T): boolean;
    add(index: number, element: T): void;
    add(t: T): void;
    addAll(c: Collection<T>): boolean;
    addAll(index: number, c: Collection<T>): boolean;
    clear(): void;
    contains(o: any): boolean;
    containsAll(c: Collection<any>): boolean;
    get(index: number): T;
    hasNext(): boolean;
    hasPrevious(): boolean;
    indexOf(o: any): number;
    isEmpty(): boolean;
    iterator(): Iterator<T>;
    lastIndexOf(o: any): number;
    listIterator(): ListIterator<T>;
    listIterator(index: number): ListIterator<T>;
    next(): T;
    nextIndex(): number;
    previous(): T;
    previousIndex(): number;
    remove(o: any): boolean;
    remove(index: number): T;
    remove(): void;
    removeAll(c: Collection<any>): boolean;
    retainAll(c: Collection<any>): boolean;
    set(index: number, element: T): T;
    set(t: T): void;
    size(): number;
    subList(fromIndex: number, toIndex: number): T[];
    toArray(): any[];
    toArray<T1>(a: T1[]): T1[];
  }


  interface LazyList<T = any> extends AbstractList<T> {}
  class LazyList<T = any> extends AbstractList<T> {
    constructor(delegate: ArrayList<T>, iterator: Iterator<T>);
    add(index: number, element: T): void;
    add(t: T): boolean;
    addAll(index: number, c: Collection<T>): boolean;
    clear(): void;
    get(index: number): T;
    hasNext(): boolean;
    isEmpty(): boolean;
    iterator(): Iterator<T>;
    next(): T;
    remove(index: number): T;
    set(index: number, element: T): T;
    size(): number;
  }


  interface ListeningList<T = any> extends List<T> {}
  class ListeningList<T = any> extends List<T> {
    constructor(delegate: T[], changeCallback: Runnable);
    add(t: T): boolean;
    add(i: number, t: T): void;
    add(t: T): void;
    addAll(collection: Collection<T>): boolean;
    addAll(i: number, collection: Collection<T>): boolean;
    clear(): void;
    contains(o: any): boolean;
    containsAll(collection: Collection<any>): boolean;
    forEach(consumer: Consumer<T>): void;
    get(i: number): T;
    hasNext(): boolean;
    hasPrevious(): boolean;
    indexOf(o: any): number;
    isEmpty(): boolean;
    iterator(): Iterator<T>;
    lastIndexOf(o: any): number;
    listIterator(): ListIterator<T>;
    listIterator(i: number): ListIterator<T>;
    next(): T;
    nextIndex(): number;
    parallelStream(): Stream<T>;
    previous(): T;
    previousIndex(): number;
    remove(o: any): boolean;
    remove(i: number): T;
    remove(): void;
    removeAll(collection: Collection<any>): boolean;
    removeIf(predicate: Predicate<T>): boolean;
    replaceAll(unaryOperator: UnaryOperator<T>): void;
    retainAll(collection: Collection<any>): boolean;
    set(i: number, t: T): T;
    set(t: T): void;
    size(): number;
    sort(comparator: Comparator<T>): void;
    spliterator(): Spliterator<T>;
    stream(): Stream<T>;
    subList(i: number, i1: number): T[];
    toArray(): any[];
    toArray<T1>(t1s: T1[]): T1[];
  }


  interface ListeningLong2ObjectOpenHashMap<V = any> extends Long2ObjectOpenHashMap<V> {}
  class ListeningLong2ObjectOpenHashMap<V = any> extends Long2ObjectOpenHashMap<V> {
    constructor(addCallback: Callback<V>, removeCallback: Callback<V>);
    put(k: number, v: V): V;
    remove(k: number): V;
  }


  interface LongJumpChoiceList extends AbstractList<PossibleJump> {}
  class LongJumpChoiceList extends AbstractList<PossibleJump> {
    constructor(horizontalRange: number, verticalRange: number);

    constructor(origin: BlockPos, packedOffsetsByDistanceSq: IntArrayList[], weightByDistanceSq: number[], totalWeight: number);
    static forCenter(centerPos: BlockPos, horizontalRange: number, verticalRange: number): LongJumpChoiceList;
    get(index: number): PossibleJump;
    isEmpty(): boolean;
    remove(index: number): PossibleJump;
    removeRandomWeightedByDistanceSq(random: RandomSource): PossibleJump;
    size(): number;
  }


  interface MaskedList<E = any> extends AbstractList<E> {}
  class MaskedList<E = any> extends AbstractList<E> {
    constructor(allElements: ObjectArrayList<E>, defaultVisibility: boolean);

    constructor();
    add(e: E): boolean;
    addOrSet(element: E, visible: boolean): void;
    get(index: number): E;
    hasNext(): boolean;
    iterator(): Iterator<E>;
    next(): E;
    remove(o: any): boolean;
    setVisible(element: E, visible: boolean): void;
    size(): number;
    spliterator(): Spliterator<E>;
    totalSize(): number;
    tryAdvance(action: Consumer<E>): boolean;
  }


  class Object2BooleanCacheTable<T = any> {
    constructor(capacity: number, operator: Predicate<T>);
    get(key: T): boolean;
  }


  interface PredicateFilterableList<T = any> extends ListeningList<T> {}
  class PredicateFilterableList<T = any> extends ListeningList<T> {
    constructor();
    getFiltered(predicate: Predicate<T>): PredicateFilteredList;
  }


  interface ReferenceMaskedList<E = any> extends AbstractList<E> {}
  class ReferenceMaskedList<E = any> extends AbstractList<E> {
    constructor(allElements: ReferenceArrayList<E>, defaultVisibility: boolean);

    constructor();
    add(e: E): boolean;
    addOrSet(element: E, visible: boolean): void;
    get(index: number): E;
    hasNext(): boolean;
    iterator(): Iterator<E>;
    next(): E;
    remove(o: any): boolean;
    setVisible(element: E, visible: boolean): void;
    size(): number;
    spliterator(): Spliterator<E>;
    totalSize(): number;
    tryAdvance(action: Consumer<E>): boolean;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.util.collections.ListeningLong2ObjectOpenHashMap' {
  class Callback<V = any> {
    apply(var1: number, var3: V): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.util.collections.Object2BooleanCacheTable' {
  class Node<T = any> {
  }

}

declare module 'net.caffeinemc.mods.lithium.common.util.collections.PredicateFilterableList' {
  import { AbstractList } from 'java.util';

  interface PredicateFilteredList extends AbstractList<T> {}
  class PredicateFilteredList extends AbstractList<T> {
    get(index: number): T;
    size(): number;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.util.deduplication' {
  class LithiumInterner<T = any> {
    deleteCanonical(value: T): void;
    getCanonical<S extends T>(value: S): S;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.util.lock' {
  import { Lock, Condition, ReadWriteLock } from 'java.util.concurrent.locks';
  import { TimeUnit } from 'java.util.concurrent';

  interface NullLock extends Lock {}
  class NullLock extends Lock {
    lock(): void;
    lockInterruptibly(): void;
    newCondition(): Condition;
    tryLock(): boolean;
    tryLock(time: number, unit: TimeUnit): boolean;
    unlock(): void;
  }


  interface NullReadWriteLock extends ReadWriteLock {}
  class NullReadWriteLock extends ReadWriteLock {
    readLock(): Lock;
    writeLock(): Lock;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.util.math' {
  import { Vec3 } from 'net.minecraft.world.phys';

  class CompactSineLUT {
    static cos(f: number): number;
    static init(): void;
    static sin(f: number): number;
  }


  class MutableVec3d {
    add(vec: Vec3): void;
    get x(): number;
    get y(): number;
    get z(): number;
    toImmutable(): Vec3;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.util.Pos' {
  import { LevelHeightAccessor } from 'net.minecraft.world.level';

  class SectionYIndex {
    static fromBlockCoord(view: LevelHeightAccessor, blockCoord: number): number;
    static fromSectionCoord(view: LevelHeightAccessor, sectionCoord: number): number;
    static getMaxYSectionIndexExclusive(view: LevelHeightAccessor): number;
    static getMaxYSectionIndexInclusive(view: LevelHeightAccessor): number;
    static getMinYSectionIndex(view: LevelHeightAccessor): number;
    static getNumYSections(view: LevelHeightAccessor): number;
  }


  class SectionYCoord {
    static fromBlockCoord(blockCoord: number): number;
    static fromSectionIndex(view: LevelHeightAccessor, sectionCoord: number): number;
    static getMaxYSectionExclusive(view: LevelHeightAccessor): number;
    static getMaxYSectionInclusive(view: LevelHeightAccessor): number;
    static getMinYSection(view: LevelHeightAccessor): number;
    static getNumYSections(view: LevelHeightAccessor): number;
  }


  class ChunkCoord {
    static fromBlockCoord(blockCoord: number): number;
    static fromBlockSize(i: number): number;
  }


  class BlockCoord {
    static getMaxInSectionCoord(sectionCoord: number): number;
    static getMaxYExclusive(view: LevelHeightAccessor): number;
    static getMaxYInSectionIndex(view: LevelHeightAccessor, sectionIndex: number): number;
    static getMaxYInclusive(view: LevelHeightAccessor): number;
    static getMinInSectionCoord(sectionCoord: number): number;
    static getMinY(view: LevelHeightAccessor): number;
    static getMinYInSectionIndex(view: LevelHeightAccessor, sectionIndex: number): number;
    static getYSize(view: LevelHeightAccessor): number;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.world.blockentity' {
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockPos } from 'net.minecraft.core';

  class BlockEntityGetter {
    lithium$getLoadedExistingBlockEntity(var1: BlockPos): BlockEntity;
  }


  class SupportCache {
    lithium$isSupported(): boolean;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.world.blockview.SingleBlockBlockView' {
  import { RuntimeException, Throwable } from 'java.lang';

  interface SingleBlockViewException extends RuntimeException {}
  class SingleBlockViewException extends RuntimeException {
    static readonly INSTANCE: SingleBlockViewException;
    fillInStackTrace(): Throwable;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.world.block_pattern_matching' {
  import { Block } from 'net.minecraft.world.level.block';
  import { LevelReader } from 'net.minecraft.world.level';
  import { BlockBox } from 'net.minecraft.core';
  import { LevelChunkSection } from 'net.minecraft.world.level.chunk';

  class BlockPatternExtended {
    lithium$setRequiredBlock(var1: Block, var2: number): void;
  }


  class BlockSearch {
    static countBlocksInBoxInSection(section: LevelChunkSection, minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number, requiredBlock: Block, findMax: number): number;
    static hasAtLeast(levelReader: LevelReader, searchBox: BlockBox, requiredBlock: Block, requiredBlockCount: number): boolean;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.world.chunk' {
  import { BiConsumer, Predicate } from 'java.util.function';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { LevelChunk, Palette, PaletteResize } from 'net.minecraft.world.level.chunk';
  import { ChunkPos } from 'net.minecraft.world.level';
  import { Collection, List } from 'java.util';
  import { EntityClassGroup } from 'net.caffeinemc.mods.lithium.common.entity';
  import { IdMap } from 'net.minecraft.core';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  class ChunkHolderExtended {
    lithium$updateLastAccessTime(var1: number): boolean;
  }


  class ChunkStatusTracker {
    static onChunkAccessible(serverLevel: ServerLevel, levelChunk: LevelChunk): void;
    static onChunkInaccessible(serverLevel: ServerLevel, pos: ChunkPos): void;
    static registerLoadCallback(callback: BiConsumer<ServerLevel, LevelChunk>): void;
    static registerUnloadCallback(callback: BiConsumer<ServerLevel, ChunkPos>): void;
  }


  class ClassGroupFilterableList<T = any> {
    lithium$getAllOfGroupType(var1: EntityClassGroup): Collection<T>;
  }


  class CompactingPackedIntegerArray {
    lithium$compact<T>(var1: Palette<T>, var2: Palette<T>, var3: number[]): void;
  }


  interface LithiumHashPalette<T = any> extends Palette<T> {}
  class LithiumHashPalette<T = any> extends Palette<T> {
    constructor(idList: IdMap<T>, bits: number, resizeHandler: PaletteResize<T>, list: T[]);

    constructor(idList: IdMap<T>, bits: number, resizeHandler: PaletteResize<T>);
    copy(): Palette<T>;
    static create<A>(bits: number, idList: IdMap<A>, listener: PaletteResize<A>, list: A[]): Palette<A>;
    get elements(): T[];
    get serializedSize(): number;
    get size(): number;
    idFor(obj: T): number;
    maybeHas(predicate: Predicate<T>): boolean;
    read(buf: FriendlyByteBuf): void;
    valueFor(id: number): T;
    write(buf: FriendlyByteBuf): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.world.chunk.heightmap' {
  import { Heightmap } from 'net.minecraft.world.level.levelgen';
  import { LevelChunk } from 'net.minecraft.world.level.chunk';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  class CombinedHeightmapUpdate {
    static updateHeightmaps(heightmap0: Heightmap, heightmap1: Heightmap, heightmap2: Heightmap, heightmap3: Heightmap, worldChunk: LevelChunk, x: number, y: number, z: number, state: BlockState): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.world' {
  import { Iterable } from 'java.lang';
  import { ChunkAccess } from 'net.minecraft.world.level.chunk';
  import { ChunkHolder } from 'net.minecraft.server.level';
  import { MutableBlockPos } from 'BlockPos';
  import { Continuation } from 'AbortableIterationConsumer';
  import { Level, EntityGetter } from 'net.minecraft.world.level';
  import { Entity, Mob } from 'net.minecraft.world.entity';
  import { AABB } from 'net.minecraft.world.phys';
  import { EntityPushablePredicate, BlockCachingEntity } from 'net.caffeinemc.mods.lithium.common.entity.pushable';
  import { ArrayList, List } from 'java.util';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Data } from 'net.caffeinemc.mods.lithium.common.world.LithiumData';
  import { Predicate } from 'java.util.function';
  import { EntitySectionStorage } from 'net.minecraft.world.level.entity';
  import { NoDragonClassGroup } from 'net.caffeinemc.mods.lithium.common.entity.EntityClassGroup';
  import { BlockPos } from 'net.minecraft.core';

  class ChunkAwareEntityIterable<T extends EntityAccess = any> {
    lithium$IterateEntitiesInTrackedSections(): Iterable<T>;
  }


  class ChunkLoadTricks {
    static tryRetrieveCurrentlyLoading(holder: ChunkHolder): ChunkAccess;
  }


  class ChunkRandomSource {
    lithium$getRandomPosInChunk(var1: number, var2: number, var3: number, var4: number, var5: MutableBlockPos): void;
  }


  class ChunkView {
    lithium$getLoadedChunk(var1: number, var2: number): ChunkAccess;
  }


  class ClimbingMobCachingSection {
    lithium$collectPushableEntities(var1: Level, var2: Entity, var3: AABB, var4: EntityPushablePredicate<Entity>, var5: ArrayList<Entity>): Continuation;
    lithium$onEntityModifiedCachedBlock(var1: BlockCachingEntity, var2: BlockState): void;
  }


  class ExplosionCache {
    lithium_fabric$cacheExposure(var1: Entity, var2: number): void;
  }


  class LithiumData {
    lithium$getData(): Data;
  }


  class ServerWorldExtended {
    lithium$setNavigationActive(var1: Mob): void;
    lithium$setNavigationInactive(var1: Mob): void;
  }


  class WorldHelper {
    static readonly CUSTOM_TYPE_FILTERABLE_LIST_DISABLED: boolean;
    static areNeighborsWithinSameChunk(pos: BlockPos): boolean;
    static areNeighborsWithinSameChunkSection(x: number, y: number, z: number): boolean;
    static arePosWithinSameChunk(pos1: BlockPos, pos2: BlockPos): boolean;
    static getEntitiesForCollision(entityView: EntityGetter, box: AABB, collidingEntity: Entity): Entity[];
    static getEntitiesOfEntityGroup(cache: EntitySectionStorage<Entity>, collidingEntity: Entity, entityClassGroup: NoDragonClassGroup, box: AABB, entityFilter: Predicate<Entity>): Entity[];
    static getEntityCacheOrNull(world: Level): EntitySectionStorage<Entity>;
    static getOtherEntitiesForCollision(entityView: EntityGetter, box: AABB, collidingEntity: Entity, entityFilter: Predicate<Entity>): Entity[];
    static getPushableEntities(world: Level, cache: EntitySectionStorage<Entity>, except: Entity, box: AABB, entityPushablePredicate: EntityPushablePredicate<Entity>): Entity[];
  }

}

declare module 'net.caffeinemc.mods.lithium.common.world.interests.iterator' {
  import { AbstractSpliterator } from 'Spliterators';
  import { PoiRecord, PoiType, PoiSection } from 'net.minecraft.world.entity.ai.village.poi';
  import { Predicate, Consumer } from 'java.util.function';
  import { Holder, BlockPos } from 'net.minecraft.core';
  import { Occupancy } from 'PoiManager';
  import { RegionBasedStorageSectionExtended } from 'net.caffeinemc.mods.lithium.common.world.interests';
  import { Stream } from 'java.util.stream';

  interface NearbyPointOfInterestStream extends AbstractSpliterator<PoiRecord> {}
  class NearbyPointOfInterestStream extends AbstractSpliterator<PoiRecord> {
    constructor(typeSelector: Predicate<Holder<PoiType>>, status: Occupancy, useSquareDistanceLimit: boolean, preferNegativeY: boolean, afterSortingPredicate: Predicate<PoiRecord>, origin: BlockPos, radius: number, storage: RegionBasedStorageSectionExtended<PoiSection>);
    tryAdvance(action: Consumer<PoiRecord>): boolean;
  }


  interface SphereChunkOrderedPoiSetSpliterator extends AbstractSpliterator<Stream> {}
  class SphereChunkOrderedPoiSetSpliterator extends AbstractSpliterator<Stream> {
    constructor(radius: number, origin: BlockPos, storage: RegionBasedStorageSectionExtended<PoiSection>);
    tryAdvance(action: Consumer<Stream<PoiSection>>): boolean;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.world.interests' {
  import { Predicate, Consumer } from 'java.util.function';
  import { Holder, BlockPos } from 'net.minecraft.core';
  import { PoiType, PoiRecord } from 'net.minecraft.world.entity.ai.village.poi';
  import { Occupancy } from 'PoiManager';
  import { Optional } from 'java.util';
  import { WorldBorder } from 'net.minecraft.world.level.border';
  import { Stream } from 'java.util.stream';
  import { Iterable } from 'java.lang';

  class PointOfInterestSetExtended {
    lithium$collectMatchingPoints(var1: Predicate<Holder<PoiType>>, var2: Occupancy, var3: Consumer<PoiRecord>): void;
  }


  class PointOfInterestStorageExtended {
    lithium$findNearestForPortalLogic(var1: BlockPos, var2: number, var3: Holder<PoiType>, var4: Occupancy, var5: Predicate<PoiRecord>, var6: WorldBorder): Optional<PoiRecord>;
  }


  class RegionBasedStorageSectionExtended<R = any> {
    lithium$getInChunkColumn(var1: number, var2: number): Iterable<R>;
    lithium$getWithinChunkColumn(var1: number, var2: number): Stream<R>;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.world.listeners' {
  import { BorderChangeListener, WorldBorder } from 'net.minecraft.world.level.border';

  interface WorldBorderListenerOnce extends BorderChangeListener {}
  class WorldBorderListenerOnce extends BorderChangeListener {
    lithium$onWorldBorderShapeChange(var1: WorldBorder): void;
    onAreaReplaced(border: WorldBorder): void;
    onBorderCenterSet(border: WorldBorder, centerX: number, centerZ: number): void;
    onBorderSetDamagePerBlock(border: WorldBorder, damagePerBlock: number): void;
    onBorderSetDamageSafeZOne(border: WorldBorder, safeZoneRadius: number): void;
    onBorderSetWarningBlocks(border: WorldBorder, warningBlockDistance: number): void;
    onBorderSetWarningTime(border: WorldBorder, warningTime: number): void;
    onBorderSizeLerping(border: WorldBorder, fromSize: number, toSize: number, time: number): void;
    onBorderSizeSet(border: WorldBorder, size: number): void;
  }


  interface WorldBorderPositionListenerMulti extends BorderChangeListener {}
  class WorldBorderPositionListenerMulti extends BorderChangeListener {
    add(listener: WorldBorderListenerOnce): void;
    onAreaReplaced(border: WorldBorder): void;
    onBorderCenterSet(border: WorldBorder, centerX: number, centerZ: number): void;
    onBorderSetDamagePerBlock(border: WorldBorder, damagePerBlock: number): void;
    onBorderSetDamageSafeZOne(border: WorldBorder, safeZoneRadius: number): void;
    onBorderSetWarningBlocks(border: WorldBorder, warningBlockDistance: number): void;
    onBorderSetWarningTime(border: WorldBorder, warningTime: number): void;
    onBorderSizeLerping(border: WorldBorder, fromSize: number, toSize: number, time: number): void;
    onBorderSizeSet(border: WorldBorder, size: number): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.common.world.scheduler' {
  import { AbstractQueue, Iterator } from 'java.util';
  import { ScheduledTick } from 'net.minecraft.world.ticks';

  interface OrderedTickQueue<T = any> extends AbstractQueue<ScheduledTick> {}
  class OrderedTickQueue<T = any> extends AbstractQueue<ScheduledTick> {
    constructor(capacity: number);

    constructor();
    clear(): void;
    getTickAtIndex(index: number): ScheduledTick<T>;
    hasNext(): boolean;
    isEmpty(): boolean;
    iterator(): Iterator<ScheduledTick<T>>;
    next(): ScheduledTick<T>;
    offer(tick: ScheduledTick<T>): boolean;
    peek(): ScheduledTick<T>;
    poll(): ScheduledTick<T>;
    removeNullsAndConsumed(): void;
    setTickAtIndex(index: number, tick: ScheduledTick<T>): void;
    size(): number;
    sort(): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.ai.non_poi_block_search' {
  import { Optional } from 'java.util';
  import { BlockPos } from 'net.minecraft.core';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { LivingEntity, PathfinderMob } from 'net.minecraft.world.entity';
  import { MoveToBlockGoal } from 'net.minecraft.world.entity.ai.goal';
  import { LithiumMoveToBlockGoal } from 'net.caffeinemc.mods.lithium.common.ai.non_poi_block_search';

  class HoglinSpecificSensorMixin {
  }


  class PiglinSpecificSensorMixin {
    redirectFindNearestRepellent(serverLevel: ServerLevel, livingEntity: LivingEntity): Optional<BlockPos>;
  }


  interface RemoveBlockGoalMixin extends LithiumMoveToBlockGoal, MoveToBlockGoal {}
  class RemoveBlockGoalMixin extends LithiumMoveToBlockGoal {
    constructor(pathfinderMob: PathfinderMob, d: number, i: number);
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.ai.pathing' {
  import { BlockStatePathingCache } from 'net.caffeinemc.mods.lithium.common.ai.pathing';
  import { PathType } from 'net.minecraft.world.level.pathfinder';
  import { Block } from 'net.minecraft.world.level.block';
  import { MutableBlockPos } from 'BlockPos';
  import { BlockGetter } from 'net.minecraft.world.level';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockPos } from 'net.minecraft.core';
  import { FluidState } from 'net.minecraft.world.level.material';

  interface BlockStateBaseMixin extends BlockStatePathingCache {}
  class BlockStateBaseMixin extends BlockStatePathingCache {
    get block(): Block;
    lithium$getNeighborPathNodeType(): PathType;
    lithium$getPathNodeType(): PathType;
    lithium$initializePathNodeTypeCache(): void;
  }


  class BootstrapMixin {
  }


  class FlyNodeEvaluatorMixin {
  }


  class PathfindingContextAccessor {
    get lastNodePos(): MutableBlockPos;
  }


  class PathfindingContextMixin {
  }


  interface PathNavigationRegionMixin extends BlockGetter {}
  class PathNavigationRegionMixin extends BlockGetter {
    getBlockState(pos: BlockPos): BlockState;
    getFluidState(pos: BlockPos): FluidState;
  }


  class WalkNodeEvaluatorMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.ai.poi.fast_portals' {
  import { SectionStorage, SimpleRegionStorage, ChunkIOErrorReporter } from 'net.minecraft.world.level.chunk.storage';
  import { PoiSection } from 'net.minecraft.world.entity.ai.village.poi';
  import { Function } from 'java.util.function';
  import { Runnable } from 'java.lang';
  import { Codec } from 'com.mojang.serialization';
  import { RegistryAccess, BlockPos } from 'net.minecraft.core';
  import { LevelHeightAccessor, LevelReader } from 'net.minecraft.world.level';
  import { Optional } from 'java.util';
  import { WorldBorder } from 'net.minecraft.world.level.border';

  interface PoiManagerMixin extends SectionStorage<PoiSection> {}
  class PoiManagerMixin extends SectionStorage<PoiSection> {
    constructor(storageAccess: SimpleRegionStorage, codecFactory: Function<Runnable, Codec<PoiSection>>, factory: Function<Runnable, PoiSection>, registryManager: RegistryAccess, errorHandler: ChunkIOErrorReporter, world: LevelHeightAccessor);
    ensureLoadedAndValid(worldView: LevelReader, pos: BlockPos, radius: number): void;
  }


  class PortalForcerMixin {
    findClosestPortalPosition(centerPos: BlockPos, dstIsNether: boolean, worldBorder: WorldBorder): Optional<BlockPos>;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.ai.poi' {
  import { SectionStorage, SimpleRegionStorage, ChunkIOErrorReporter } from 'net.minecraft.world.level.chunk.storage';
  import { PoiSection, PoiRecord, PoiType } from 'net.minecraft.world.entity.ai.village.poi';
  import { PointOfInterestStorageExtended, PointOfInterestSetExtended, RegionBasedStorageSectionExtended } from 'net.caffeinemc.mods.lithium.common.world.interests';
  import { Function, Predicate, Consumer } from 'java.util.function';
  import { Runnable, Iterable } from 'java.lang';
  import { Codec } from 'com.mojang.serialization';
  import { RegistryAccess, Holder, BlockPos } from 'net.minecraft.core';
  import { LevelHeightAccessor, ChunkPos } from 'net.minecraft.world.level';
  import { Stream } from 'java.util.stream';
  import { Occupancy } from 'PoiManager';
  import { Optional } from 'java.util';
  import { RandomSource } from 'net.minecraft.util';
  import { WorldBorder } from 'net.minecraft.world.level.border';

  interface PoiManagerMixin extends PointOfInterestStorageExtended, SectionStorage<PoiSection> {}
  class PoiManagerMixin extends PointOfInterestStorageExtended {
    constructor(storageAccess: SimpleRegionStorage, codecFactory: Function<Runnable, Codec<PoiSection>>, factory: Function<Runnable, PoiSection>, registryManager: RegistryAccess, errorHandler: ChunkIOErrorReporter, world: LevelHeightAccessor);
    findClosest(predicate: Predicate<Holder<PoiType>>, pos: BlockPos, radius: number, status: Occupancy): Optional<BlockPos>;
    findClosest(predicate: Predicate<Holder<PoiType>>, posPredicate: Predicate<BlockPos>, pos: BlockPos, radius: number, status: Occupancy): Optional<BlockPos>;
    getCountInRange(predicate: Predicate<Holder<PoiType>>, pos: BlockPos, radius: number, status: Occupancy): number;
    getInChunk(predicate: Predicate<Holder<PoiType>>, pos: ChunkPos, status: Occupancy): Stream<PoiRecord>;
    getInRange(predicate: Predicate<Holder<PoiType>>, sphereOrigin: BlockPos, radius: number, status: Occupancy): Stream<PoiRecord>;
    getRandom(typePredicate: Predicate<Holder<PoiType>>, posPredicate: Predicate<BlockPos>, status: Occupancy, pos: BlockPos, radius: number, rand: RandomSource): Optional<BlockPos>;
    lithium$findNearestForPortalLogic(origin: BlockPos, radius: number, type: Holder<PoiType>, status: Occupancy, afterSortPredicate: Predicate<PoiRecord>, worldBorder: WorldBorder): Optional<PoiRecord>;
  }


  interface PoiSectionMixin extends PointOfInterestSetExtended {}
  class PoiSectionMixin extends PointOfInterestSetExtended {
    lithium$collectMatchingPoints(type: Predicate<Holder<PoiType>>, status: Occupancy, consumer: Consumer<PoiRecord>): void;
  }


  interface SectionStorageMixin<R = any> extends RegionBasedStorageSectionExtended<R> {}
  class SectionStorageMixin<R = any> extends RegionBasedStorageSectionExtended<R> {
    lithium$getInChunkColumn(chunkX: number, chunkZ: number): Iterable<R>;
    lithium$getWithinChunkColumn(chunkX: number, chunkZ: number): Stream<R>;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.ai.poi.tasks' {
  class LocateHidingPlaceMixin {
  }


  class RaiderEntityAttackHomeGoalMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.ai.raid' {
  import { Entity, EntityType } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';

  class Raider$ObtainRaidLeaderBannerGoalMixin<T extends Raider = any> {
  }


  interface RaiderMixin extends Entity {}
  class RaiderMixin extends Entity {
    constructor(type: EntityType<any>, world: Level);
  }


  class RaidMixin {
    get healthOfLivingRaiders(): number;
    updateBossbar(): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.ai.sensor.secondary_poi' {
  class SecondaryPoiSensorMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.ai.task.launch' {
  import { List } from 'java.util';
  import { BehaviorControl } from 'net.minecraft.world.entity.ai.behavior';

  class BrainMixin<E extends LivingEntity = any> {
    get runningBehaviors(): BehaviorControl<E>[];
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.ai.task.memory_change_counting' {
  import { MemoryModificationCounter } from 'net.caffeinemc.mods.lithium.common.ai';

  class BehaviorMixin<E extends LivingEntity = any> {
    hasRequiredMemories(entity: E): boolean;
  }


  interface BrainMixin extends MemoryModificationCounter {}
  class BrainMixin extends MemoryModificationCounter {
    lithium$getModCount(): number;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.ai.task.replace_streams' {
  import { BehaviorControl } from 'net.minecraft.world.entity.ai.behavior';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { WeightedListIterable } from 'net.caffeinemc.mods.lithium.common.ai';
  import { Iterator } from 'java.util';

  interface GateBehaviorMixin<E extends LivingEntity = any> extends BehaviorControl<E> {}
  class GateBehaviorMixin<E extends LivingEntity = any> extends BehaviorControl<E> {
    doStop(world: ServerLevel, entity: E, time: number): void;
    tickOrStop(world: ServerLevel, entity: E, time: number): void;
  }


  interface ShufflingListMixin<U = any> extends WeightedListIterable<U> {}
  class ShufflingListMixin<U = any> extends WeightedListIterable<U> {
    iterator(): Iterator<U>;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.ai.task.run.long_jump_weighted_choice' {
  class LongJumpToRandomPosMixin<E extends Mob = any> {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.ai.useless_sensors' {
  import { Map } from 'java.util';
  import { SensorType, Sensor } from 'net.minecraft.world.entity.ai.sensing';

  class BrainAccessor<E extends LivingEntity = any> {
    get sensors(): Map<SensorType<Sensor<E>>, Sensor<E>>;
  }


  class SensorAccessor {
    get lastSenseTime(): number;
    get senseInterval(): number;
    set lastSenseTime(var1: number);
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.ai.useless_sensors.goat_item_sensor' {
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { Brain } from 'net.minecraft.world.entity.ai';
  import { Goat } from 'net.minecraft.world.entity.animal.goat';

  interface GoatMixin extends LivingEntity {}
  class GoatMixin extends LivingEntity {
    get brain(): Brain<Goat>;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.ai.useless_sensors.parent_animal_sensor' {
  import { LivingEntity } from 'net.minecraft.world.entity';

  interface AgeableMobMixin extends LivingEntity {}
  class AgeableMobMixin extends LivingEntity {
    isBaby(): boolean;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.alloc.chunk_random' {
  import { ChunkRandomSource } from 'net.caffeinemc.mods.lithium.common.world';
  import { MutableBlockPos } from 'BlockPos';

  interface LevelMixin extends ChunkRandomSource {}
  class LevelMixin extends ChunkRandomSource {
    lithium$getRandomPosInChunk(x: number, y: number, z: number, mask: number, out: MutableBlockPos): void;
  }


  class ServerLevelMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.alloc.chunk_ticking' {
  class ServerChunkCacheMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.alloc.composter' {
  class ComposterMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.alloc.composter.ComposterMixin' {
  import { WorldlyContainer } from 'net.minecraft.world';
  import { Direction } from 'net.minecraft.core';

  interface ComposterBlockFullComposterInventoryMixin extends WorldlyContainer {}
  class ComposterBlockFullComposterInventoryMixin extends WorldlyContainer {
    getSlotsForFace(side: Direction): number[];
  }


  interface ComposterBlockDummyInventoryMixin extends WorldlyContainer {}
  class ComposterBlockDummyInventoryMixin extends WorldlyContainer {
    getSlotsForFace(side: Direction): number[];
  }


  interface ComposterBlockComposterInventoryMixin extends WorldlyContainer {}
  class ComposterBlockComposterInventoryMixin extends WorldlyContainer {
    getSlotsForFace(side: Direction): number[];
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.alloc.deep_passengers' {
  import { Iterable } from 'java.lang';
  import { Entity } from 'net.minecraft.world.entity';
  import { Stream } from 'java.util.stream';

  class EntityMixin {
    get indirectPassengers(): Iterable<Entity>;
    get passengersAndSelf(): Stream<Entity>;
    get selfAndPassengers(): Stream<Entity>;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.alloc.entity_iteration' {
  import { List } from 'java.util';

  class ClassInstanceMultiMapAccessor<T = any> {
    get allInstances(): T[];
  }


  class EntitySectionMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.alloc.entity_tracker' {
  class ChunkMap$TrackedEntityMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.alloc.enum_values.piston_block' {
  class PistonBaseBlockMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.alloc.enum_values.piston_handler' {
  class PistonStructureResolverMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.alloc.enum_values.redstone_wire' {
  class RedStoneWireBlockMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.alloc.explosion_behavior' {
  import { ExplosionDamageCalculator, Explosion, BlockGetter } from 'net.minecraft.world.level';
  import { Optional } from 'java.util';
  import { Float } from 'java.lang';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { FluidState } from 'net.minecraft.world.level.material';

  interface EntityBasedExplosionDamageCalculatorMixin extends ExplosionDamageCalculator {}
  class EntityBasedExplosionDamageCalculatorMixin extends ExplosionDamageCalculator {
    getBlockExplosionResistance(explosion: Explosion, world: BlockGetter, pos: BlockPos, blockState: BlockState, fluidState: FluidState): Optional<number>;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.alloc.nbt' {
  import { CompoundTag } from 'net.minecraft.nbt';

  class CompoundTagMixin {
    copy(): CompoundTag;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.alloc.nbt.CompoundTagMixin' {
  class Type {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.block.flatten_states' {
  import { Fluid } from 'net.minecraft.world.level.material';

  class FluidStateMixin {
    get type(): Fluid;
    isEmpty(): boolean;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.block.fluid.flow' {
  import { Fluid, FluidState } from 'net.minecraft.world.level.material';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Map } from 'java.util';

  class FlowingFluidMixin {
    get flowing(): Fluid;
    get source(): Fluid;
    getSpread(world: Level, pos: BlockPos, state: BlockState, cir: CallbackInfoReturnable<Map<Direction, FluidState>>): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.block.hopper' {
  import { Entity, EntityType } from 'net.minecraft.world.entity';
  import { Level, LevelReader } from 'net.minecraft.world.level';
  import { ShapeUpdateHandlingBlockBehaviour } from 'net.caffeinemc.mods.lithium.common.block.entity';
  import { LithiumTransferConditionInventory, LithiumCooldownReceivingInventory, LithiumInventory } from 'net.caffeinemc.mods.lithium.api.inventory';
  import { Container } from 'net.minecraft.world';
  import { EntityInLevelCallback } from 'net.minecraft.world.level.entity';
  import { ClassInstanceMultiMap } from 'net.minecraft.util';
  import { BlockEntity, Hopper, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { UpdateReceiver } from 'net.caffeinemc.mods.lithium.common.hopper';
  import { InventoryChangeListener } from 'net.caffeinemc.mods.lithium.common.block.entity.inventory_change_tracking';
  import { SectionedEntityMovementListener } from 'net.caffeinemc.mods.lithium.common.tracking.entity';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Class } from 'java.lang';
  import { BaseEntityBlock } from 'net.minecraft.world.level.block';
  import { List } from 'java.util';

  class AbstractContainerMenuMixin {
  }


  interface AbstractMinecartMixin extends Entity {}
  class AbstractMinecartMixin extends Entity {
    constructor(type: EntityType<any>, world: Level);
  }


  interface BlockBehaviourMixin extends ShapeUpdateHandlingBlockBehaviour {}
  class BlockBehaviourMixin extends ShapeUpdateHandlingBlockBehaviour {
  }


  interface ChestBoatMixin extends Entity {}
  class ChestBoatMixin extends Entity {
    constructor(type: EntityType<any>, world: Level);
    rideTick(): void;
  }


  interface ChiseledBookShelfBlockEntityMixin extends LithiumTransferConditionInventory {}
  class ChiseledBookShelfBlockEntityMixin extends LithiumTransferConditionInventory {
    lithium$itemInsertionTestRequiresStackSize1(): boolean;
  }


  class ClassInstanceMultiMapMixin<T = any> {
  }


  class ComposterMixin {
  }


  class CompoundContainerAccessor {
    get first(): Container;
    get second(): Container;
  }


  interface ContainerMixin extends LithiumCooldownReceivingInventory, LithiumTransferConditionInventory {}
  class ContainerMixin extends LithiumCooldownReceivingInventory {
  }


  class EntityAccessor {
    get changeListener(): EntityInLevelCallback;
  }


  class EntityDataAccessorMixin {
  }


  class EntitySectionAccessor<T = any> {
    get collection(): ClassInstanceMultiMap<T>;
  }


  interface HopperBlockEntityMixin extends Hopper, UpdateReceiver, LithiumInventory, InventoryChangeListener, SectionedEntityMovementListener, BlockEntity {}
  class HopperBlockEntityMixin extends Hopper {
    constructor(type: BlockEntityType<any>, pos: BlockPos, state: BlockState);
    getExtractBlockInventory(world: Level, extractBlockPos: BlockPos, extractBlockState: BlockState): Container;
    getInsertBlockInventory(world: Level): Container;
    getInsertInventory(world: Level): Container;
    lithium$handleComparatorAdded(inventory: Container): boolean;
    lithium$handleEntityMovement(category: Class<any>): void;
    lithium$handleInventoryContentModified(inventory: Container): void;
    lithium$handleInventoryRemoved(inventory: Container): void;
    lithium$invalidateCacheOnNeighborUpdate(fromAbove: boolean): void;
    lithium$invalidateCacheOnNeighborUpdate(fromDirection: Direction): void;
    lithium$invalidateCacheOnUndirectedNeighborUpdate(): void;
  }


  interface HopperBlockMixin extends ShapeUpdateHandlingBlockBehaviour, BaseEntityBlock {}
  class HopperBlockMixin extends ShapeUpdateHandlingBlockBehaviour {
    lithium$handleShapeUpdate(levelReader: LevelReader, myBlockState: BlockState, myPos: BlockPos, posFrom: BlockPos, newState: BlockState): void;
  }


  class InventoryAccessors {
  }


  class NonNullListAccessor<T = any> {
    get delegate(): T[];
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.block.hopper.ComposterMixin' {
  import { BlockStateOnlyInventory } from 'net.caffeinemc.mods.lithium.common.hopper';

  interface ComposterBlockFullComposterInventoryMixin extends BlockStateOnlyInventory {}
  class ComposterBlockFullComposterInventoryMixin extends BlockStateOnlyInventory {
  }


  interface ComposterBlockDummyInventoryMixin extends BlockStateOnlyInventory {}
  class ComposterBlockDummyInventoryMixin extends BlockStateOnlyInventory {
  }


  interface ComposterBlockComposterInventoryMixin extends BlockStateOnlyInventory {}
  class ComposterBlockComposterInventoryMixin extends BlockStateOnlyInventory {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.block.hopper.InventoryAccessors' {
  import { LithiumInventory } from 'net.caffeinemc.mods.lithium.api.inventory';
  import { NonNullList } from 'net.minecraft.core';
  import { ItemStack } from 'net.minecraft.world.item';

  interface AbstractMinecartContainerMixin extends LithiumInventory {}
  class AbstractMinecartContainerMixin extends LithiumInventory {
    get inventoryLithium(): NonNullList<ItemStack>;
    set inventoryLithium(var1: NonNullList<ItemStack>);
  }


  interface ShulkerBoxBlockEntityMixin extends LithiumInventory {}
  class ShulkerBoxBlockEntityMixin extends LithiumInventory {
    get inventoryLithium(): NonNullList<ItemStack>;
    set inventoryLithium(var1: NonNullList<ItemStack>);
  }


  interface HopperBlockEntityMixin extends LithiumInventory {}
  class HopperBlockEntityMixin extends LithiumInventory {
    get inventoryLithium(): NonNullList<ItemStack>;
    set inventoryLithium(var1: NonNullList<ItemStack>);
  }


  interface DispenserBlockEntityMixin extends LithiumInventory {}
  class DispenserBlockEntityMixin extends LithiumInventory {
    get inventoryLithium(): NonNullList<ItemStack>;
    set inventoryLithium(var1: NonNullList<ItemStack>);
  }


  interface ChestBlockEntityMixin extends LithiumInventory {}
  class ChestBlockEntityMixin extends LithiumInventory {
    get inventoryLithium(): NonNullList<ItemStack>;
    set inventoryLithium(var1: NonNullList<ItemStack>);
  }


  interface BrewingStandBlockEntityMixin extends LithiumInventory {}
  class BrewingStandBlockEntityMixin extends LithiumInventory {
    get inventoryLithium(): NonNullList<ItemStack>;
    set inventoryLithium(var1: NonNullList<ItemStack>);
  }


  interface BarrelBlockEntityMixin extends LithiumInventory {}
  class BarrelBlockEntityMixin extends LithiumInventory {
    get inventoryLithium(): NonNullList<ItemStack>;
    set inventoryLithium(var1: NonNullList<ItemStack>);
  }


  interface AbstractFurnaceBlockEntityMixin extends LithiumInventory {}
  class AbstractFurnaceBlockEntityMixin extends LithiumInventory {
    get inventoryLithium(): NonNullList<ItemStack>;
    set inventoryLithium(var1: NonNullList<ItemStack>);
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.block.moving_block_shapes' {
  import { OffsetVoxelShapeCache } from 'net.caffeinemc.mods.lithium.common.shapes';
  import { Direction } from 'net.minecraft.core';
  import { VoxelShape } from 'net.minecraft.world.phys.shapes';

  class PistonMovingBlockEntityMixin {
  }


  interface VoxelShapeMixin extends OffsetVoxelShapeCache {}
  class VoxelShapeMixin extends OffsetVoxelShapeCache {
    lithium$getOffsetSimplifiedShape(offset: number, direction: Direction): VoxelShape;
    lithium$setShape(offset: number, direction: Direction, offsetShape: VoxelShape): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.block.redstone_wire' {
  import { Block } from 'net.minecraft.world.level.block';
  import { Properties } from 'BlockBehaviour';

  interface RedStoneWireBlockMixin extends Block {}
  class RedStoneWireBlockMixin extends Block {
    constructor(settings: Properties);
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.block_pattern_matching' {
  import { BlockPatternExtended } from 'net.caffeinemc.mods.lithium.common.world.block_pattern_matching';
  import { Block } from 'net.minecraft.world.level.block';

  interface BlockPatternMixin extends BlockPatternExtended {}
  class BlockPatternMixin extends BlockPatternExtended {
    lithium$setRequiredBlock(block: Block, count: number): void;
  }


  class EndDragonFightMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.cached_hashcode' {
  class Block$BlockStatePairKeyMixin {
    hashCode(): number;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.chunk.entity_class_groups' {
  import { ClassGroupFilterableList } from 'net.caffeinemc.mods.lithium.common.world.chunk';
  import { Collection } from 'java.util';
  import { EntityClassGroup } from 'net.caffeinemc.mods.lithium.common.entity';
  import { ClientWorldAccessor } from 'net.caffeinemc.mods.lithium.common.client';
  import { TransientEntitySectionManager } from 'net.minecraft.world.level.entity';
  import { Entity } from 'net.minecraft.world.entity';

  interface ClassInstanceMultiMapMixin<T = any> extends ClassGroupFilterableList<T> {}
  class ClassInstanceMultiMapMixin<T = any> extends ClassGroupFilterableList<T> {
    add(entity: T): T;
    lithium$getAllOfGroupType(type: EntityClassGroup): Collection<T>;
    remove(o: any): any;
  }


  interface ClientLevelMixin extends ClientWorldAccessor {}
  class ClientLevelMixin extends ClientWorldAccessor {
    lithium$getEntityManager(): TransientEntitySectionManager<Entity>;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.chunk.no_locking' {
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  class LevelChunkSectionMixin {
    setBlockState(var1: number, var2: number, var3: number, var4: BlockState, var5: boolean): BlockState;
  }


  class PalettedContainerMixin {
    acquire(): void;
    release(): void;
    removeLockHelper(ci: CallbackInfo): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.chunk.no_validation' {
  class SimpleBitStorageMixin {
    skipValidation(start: number, end: number, value: number): void;
  }


  class ZeroBitStorageMixin {
    skipValidation(start: number, end: number, value: number): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.chunk.palette' {
  import { Strategy, Configuration } from 'PalettedContainer';
  import { IdMap } from 'net.minecraft.core';

  class PalettedContainer$StrategyMixin {
    static SECTION_STATES: Strategy;
    static SECTION_BIOMES: Strategy;
    getConfiguration<A>(idList: IdMap<A>, bits: number): Configuration<A>;
    getConfiguration<A>(idList: IdMap<A>, bits: number): Configuration<A>;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.chunk.serialization' {
  import { PackedData } from 'PalettedContainerRO';
  import { IdMap } from 'net.minecraft.core';
  import { Strategy, CountConsumer } from 'PalettedContainer';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { CompactingPackedIntegerArray } from 'net.caffeinemc.mods.lithium.common.world.chunk';
  import { Palette } from 'net.minecraft.world.level.chunk';

  class PalettedContainerMixin<T = any> {
    acquire(): void;
    count(consumer: CountConsumer<T>, ci: CallbackInfo): void;
    pack(idList: IdMap<T>, provider: Strategy): PackedData<T>;
    release(): void;
  }


  interface SimpleBitStorageMixin extends CompactingPackedIntegerArray {}
  class SimpleBitStorageMixin extends CompactingPackedIntegerArray {
    lithium$compact<T>(srcPalette: Palette<T>, dstPalette: Palette<T>, out: number[]): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.collections.attributes' {
  class AttributeMapMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.collections.block_entity_tickers' {
  class LevelChunkMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.collections.brain' {
  class BrainMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.collections.chunk_tickets' {
  import { Collection } from 'java.util';
  import { Predicate } from 'java.util.function';

  interface SortedArraySetMixin<T = any> extends Collection<T> {}
  class SortedArraySetMixin<T = any> extends Collection<T> {
    removeIf(filter: Predicate<T>): boolean;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.collections.entity_by_type' {
  class ClassInstanceMultiMapMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.collections.entity_filtering' {
  import { Collection } from 'java.util';
  import { Class } from 'java.lang';

  class ClassInstanceMultiMapMixin<T = any> {
    find<S>(type: Class<S>): Collection<S>;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.collections.entity_ticking' {
  class EntityTickListMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.collections.fluid_submersion' {
  class EntityMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.collections.gamerules' {
  class GameRulesMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.collections.goals' {
  class GoalSelectorMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.collections.mob_spawning' {
  import { List } from 'java.util';

  class MobSpawnSettingsMixin {
  }


  class WeightedRandomListMixin<E extends WeightedEntry = any> {
    unwrap(): E[];
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.debug.palette' {
  class ClientBoundLevelChunkPacketDataAccessor {
    get buffer(): number[];
  }


  class ClientPacketListenerMixin {
  }


  class PalettedContainerMixin<T = any> {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.entity.collisions.intersection' {
  import { LevelAccessor } from 'net.minecraft.world.level';
  import { Entity } from 'net.minecraft.world.entity';
  import { AABB } from 'net.minecraft.world.phys';

  class EntityGetterMixin {
  }


  interface LevelMixin extends LevelAccessor {}
  class LevelMixin extends LevelAccessor {
    noCollision(entity: Entity, box: AABB): boolean;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.entity.collisions.movement' {
  import { Level } from 'net.minecraft.world.level';
  import { AABB, Vec3 } from 'net.minecraft.world.phys';
  import { Entity } from 'net.minecraft.world.entity';
  import { List } from 'java.util';
  import { VoxelShape } from 'net.minecraft.world.phys.shapes';

  class EntityMixin {
    static collideBoundingBox(entity: Entity, movement: Vec3, entityBoundingBox: AABB, world: Level, entityCollisions: VoxelShape[]): Vec3;
    get boundingBox(): AABB;
    level(): Level;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.entity.collisions.unpushable_cramming' {
  import { BlockCachingEntity, EntityPushablePredicate } from 'net.caffeinemc.mods.lithium.common.entity.pushable';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { ClimbingMobCachingSection } from 'net.caffeinemc.mods.lithium.common.world';
  import { Continuation } from 'AbortableIterationConsumer';
  import { Level } from 'net.minecraft.world.level';
  import { Entity, EntityType } from 'net.minecraft.world.entity';
  import { AABB } from 'net.minecraft.world.phys';
  import { ArrayList } from 'java.util';

  class AbstractMinecartMixin {
  }


  class BoatMixin {
  }


  interface EntityMixin extends BlockCachingEntity {}
  class EntityMixin extends BlockCachingEntity {
    lithium$getCachedFeetBlockState(): BlockState;
  }


  interface EntitySectionMixin<T extends EntityAccess = any> extends ClimbingMobCachingSection {}
  class EntitySectionMixin<T extends EntityAccess = any> extends ClimbingMobCachingSection {
    lithium$collectPushableEntities(world: Level, except: Entity, box: AABB, entityPushablePredicate: EntityPushablePredicate<Entity>, entities: ArrayList<Entity>): Continuation;
    lithium$onEntityModifiedCachedBlock(entity: BlockCachingEntity, newBlockState: BlockState): void;
  }


  class EntitySelectorMixin {
  }


  interface LivingEntityMixin extends BlockCachingEntity, Entity {}
  class LivingEntityMixin extends BlockCachingEntity {
    constructor(type: EntityType<any>, world: Level);
    lithium$OnBlockCacheDeleted(): void;
    lithium$OnBlockCacheSet(newState: BlockState): void;
    lithium$SetClimbingMobCachingSectionUpdateBehavior(listenForCachedBlockChanges: boolean): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.entity.equipment_tracking' {
  import { Entity, EntityType } from 'net.minecraft.world.entity';
  import { EquipmentEntity } from 'net.caffeinemc.mods.lithium.common.entity';
  import { Level } from 'net.minecraft.world.level';
  import { CountChangeSubscriber } from 'net.caffeinemc.mods.lithium.common.util.change_tracking.ChangeSubscriber';
  import { ItemStack } from 'net.minecraft.world.item';

  interface ArmorStandMixin extends EquipmentEntity, Entity {}
  class ArmorStandMixin extends EquipmentEntity {
    constructor(type: EntityType<any>, world: Level);
  }


  interface LivingEntityMixin extends CountChangeSubscriber<ItemStack>, EquipmentEntity, Entity {}
  class LivingEntityMixin extends CountChangeSubscriber<ItemStack> {
    constructor(type: EntityType<any>, world: Level);
    lithium$forceUnsubscribe(publisher: ItemStack, zero: number): void;
    lithium$notify(publisher: ItemStack, zero: number): void;
    lithium$notifyCount(publisher: ItemStack, zero: number, newCount: number): void;
    lithium$onEquipmentReplaced(oldStack: ItemStack, newStack: ItemStack): void;
  }


  interface MobMixin extends EquipmentEntity, Entity {}
  class MobMixin extends EquipmentEntity {
    constructor(type: EntityType<any>, world: Level);
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.entity.equipment_tracking.enchantment_ticking' {
  import { TickableEnchantmentTrackingEntity } from 'net.caffeinemc.mods.lithium.common.entity.EquipmentEntity';
  import { ItemStack } from 'net.minecraft.world.item';

  interface LivingEntityMixin extends TickableEnchantmentTrackingEntity {}
  class LivingEntityMixin extends TickableEnchantmentTrackingEntity {
    lithium$notifyAfterEnchantmentChange(publisher: ItemStack, subscriberData: number): void;
    lithium$updateHasTickableEnchantments(oldStack: ItemStack, newStack: ItemStack): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.entity.equipment_tracking.equipment_changes' {
  import { Entity, EntityType } from 'net.minecraft.world.entity';
  import { EquipmentTrackingEntity } from 'net.caffeinemc.mods.lithium.common.entity.EquipmentEntity';
  import { Level } from 'net.minecraft.world.level';

  interface LivingEntityMixin extends EquipmentTrackingEntity, Entity {}
  class LivingEntityMixin extends EquipmentTrackingEntity {
    constructor(type: EntityType<any>, world: Level);
    lithium$onEquipmentChanged(): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.entity.fast_elytra_check' {
  import { Entity, EntityType } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';

  interface LivingEntityMixin extends Entity {}
  class LivingEntityMixin extends Entity {
    constructor(type: EntityType<any>, world: Level);
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.entity.fast_hand_swing' {
  class LivingEntityMixin {
    swinging: boolean;
    swingTime: number;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.entity.fast_powder_snow_check' {
  import { Entity, EntityType } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { AttributeInstance, Attribute } from 'net.minecraft.world.entity.ai.attributes';
  import { Holder } from 'net.minecraft.core';

  interface LivingEntityMixin extends Entity {}
  class LivingEntityMixin extends Entity {
    constructor(type: EntityType<any>, world: Level);
    getAttribute(var1: Holder<Attribute>): AttributeInstance;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.entity.fast_retrieval' {
  import { EntitySection } from 'net.minecraft.world.level.entity';
  import { AABB } from 'net.minecraft.world.phys';
  import { AbortableIterationConsumer } from 'net.minecraft.util';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  class EntitySectionStorageMixin<T extends EntityAccess = any> {
    forEachInBox(box: AABB, action: AbortableIterationConsumer<EntitySection<T>>, ci: CallbackInfo, i: number, minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): void;
    getSection(var1: number): EntitySection<T>;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.entity.inactive_navigations' {
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { LivingEntity, Mob } from 'net.minecraft.world.entity';
  import { NavigatingEntity } from 'net.caffeinemc.mods.lithium.common.entity';
  import { PathNavigation } from 'net.minecraft.world.entity.ai.navigation';
  import { Level } from 'net.minecraft.world.level';
  import { ServerWorldExtended } from 'net.caffeinemc.mods.lithium.common.world';

  class DrownedEntityLeaveWaterGoalMixin {
  }


  class DrownedMixin {
  }


  class LivingEntityMixin {
    handleStopRiding(ci: CallbackInfo): void;
  }


  interface MobMixin extends NavigatingEntity, LivingEntity {}
  class MobMixin extends NavigatingEntity {
    get navigation(): PathNavigation;
    lithium$getRegisteredNavigation(): PathNavigation;
    lithium$isRegisteredToWorld(): boolean;
    lithium$setRegisteredToWorld(navigation: PathNavigation): void;
    lithium$updateNavigationRegistration(): void;
  }


  class PathNavigationMixin {
  }


  class ServerLevel$EntityCallbacksMixin {
  }


  interface ServerLevelMixin extends ServerWorldExtended, Level {}
  class ServerLevelMixin extends ServerWorldExtended {
    areEntityNavigationsConsistent(): boolean;
    lithium$setNavigationActive(mobEntity: Mob): void;
    lithium$setNavigationInactive(mobEntity: Mob): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.entity.replace_entitytype_predicates' {
  import { RandomStrollGoal } from 'net.minecraft.world.entity.ai.goal';
  import { PathfinderMob, Entity, EntityType } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { HangingEntity } from 'net.minecraft.world.entity.decoration';

  class AbstractMinecartMixin {
  }


  class ArmorStandMixin {
  }


  interface GolemRandomStrollInVillageGoalMixin extends RandomStrollGoal {}
  class GolemRandomStrollInVillageGoalMixin extends RandomStrollGoal {
    constructor(mob: PathfinderMob, speed: number);
  }


  interface HangingEntityMixin extends Entity {}
  class HangingEntityMixin extends Entity {
    constructor(type: EntityType<any>, world: Level);
  }


  interface ItemFrameMixin extends HangingEntity {}
  class ItemFrameMixin extends HangingEntity {
  }


  class LlamaFollowCaravanGoalMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.entity.sprinting_particles' {
  class EntityMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.experimental.entity.block_caching.block_support' {
  import { BlockCacheProvider } from 'net.caffeinemc.mods.lithium.common.tracking.block';
  import { SupportingBlockCollisionShapeProvider } from 'net.caffeinemc.mods.lithium.common.entity.LithiumEntityCollisions';
  import { Optional } from 'java.util';
  import { Level } from 'net.minecraft.world.level';
  import { VoxelShape } from 'net.minecraft.world.phys.shapes';

  interface EntityMixin extends BlockCacheProvider, SupportingBlockCollisionShapeProvider {}
  class EntityMixin extends BlockCacheProvider {
    mainSupportingBlockPos: Optional;
    level(): Level;
    lithium$getCollisionShapeBelow(): VoxelShape;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.experimental.entity.block_caching.block_touching' {
  import { BlockCacheProvider } from 'net.caffeinemc.mods.lithium.common.tracking.block';

  interface EntityMixin extends BlockCacheProvider {}
  class EntityMixin extends BlockCacheProvider {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.experimental.entity.block_caching' {
  import { BlockCacheProvider, BlockCache } from 'net.caffeinemc.mods.lithium.common.tracking.block';

  interface EntityMixin extends BlockCacheProvider {}
  class EntityMixin extends BlockCacheProvider {
    lithium$getBlockCache(): BlockCache;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.experimental.entity.block_caching.fire_lava_touching' {
  import { BlockCacheProvider } from 'net.caffeinemc.mods.lithium.common.tracking.block';

  interface EntityMixin extends BlockCacheProvider {}
  class EntityMixin extends BlockCacheProvider {
    wasOnFire: boolean;
    isInPowderSnow: boolean;
    isInWaterRainOrBubble(): boolean;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.experimental.entity.block_caching.suffocation' {
  import { BlockCacheProvider } from 'net.caffeinemc.mods.lithium.common.tracking.block';
  import { Level } from 'net.minecraft.world.level';
  import { CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Boolean } from 'java.lang';
  import { AABB } from 'net.minecraft.world.phys';

  interface EntityMixin extends BlockCacheProvider {}
  class EntityMixin extends BlockCacheProvider {
    level: Level;
    isInsideWall(cir: CallbackInfoReturnable<boolean>, f: number, box: AABB): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.experimental.entity.item_entity_merging' {
  import { Entity, EntityType } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';

  interface ItemEntityMixin extends Entity {}
  class ItemEntityMixin extends Entity {
    constructor(type: EntityType<any>, world: Level);
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.gen.cached_generator_settings' {
  class NoiseBasedChunkGeneratorMixin {
    get seaLevel(): number;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin' {
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { Set, List } from 'java.util';
  import { ClassNode } from 'org.objectweb.asm.tree';

  interface LithiumMixinPlugin extends IMixinConfigPlugin {}
  class LithiumMixinPlugin extends IMixinConfigPlugin {
    acceptTargets(myTargets: Set<string>, otherTargets: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    onLoad(mixinPackage: string): void;
    postApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    preApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    shouldApplyMixin(targetClassName: string, mixinClassName: string): boolean;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.math.fast_blockpos' {
  import { Vec3i, BlockPos } from 'net.minecraft.core';

  interface BlockPosMixin extends Vec3i {}
  class BlockPosMixin extends Vec3i {
    constructor(x: number, y: number, z: number);
    above(): BlockPos;
    above(distance: number): BlockPos;
    below(): BlockPos;
    below(distance: number): BlockPos;
    east(): BlockPos;
    east(distance: number): BlockPos;
    north(): BlockPos;
    north(distance: number): BlockPos;
    south(): BlockPos;
    south(distance: number): BlockPos;
    west(): BlockPos;
    west(distance: number): BlockPos;
  }


  class DirectionMixin {
    get stepX(): number;
    get stepY(): number;
    get stepZ(): number;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.math.fast_util' {
  import { Axis } from 'Direction';
  import { Direction } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';

  class AABBMixin {
    minX: number;
    minY: number;
    minZ: number;
    maxX: number;
    maxY: number;
    maxZ: number;
    max(axis: Axis): number;
    min(axis: Axis): number;
  }


  class AxisCycleDirectionMixin {
  }


  class DirectionMixin {
    get opposite(): Direction;
    static getRandom(rand: RandomSource): Direction;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.math.fast_util.AxisCycleDirectionMixin' {
  import { Axis } from 'Direction';

  class BackwardMixin {
    cycle(axis: Axis): Axis;
  }


  class ForwardMixin {
    cycle(axis: Axis): Axis;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.math.sine_lut' {
  class MthMixin {
    static SIN: number[];
    static cos(f: number): number;
    static sin(f: number): number;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.minimal_nonvanilla.ai.sensor.frog_attackables' {
  class FrogAttackablesSensorMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.minimal_nonvanilla.collisions.empty_space' {
  import { ArrayVoxelShape, DiscreteVoxelShape, VoxelShape } from 'net.minecraft.world.phys.shapes';
  import { DoubleList } from 'it.unimi.dsi.fastutil.doubles';
  import { BitSet, Optional } from 'java.util';
  import { LevelAccessor } from 'net.minecraft.world.level';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Entity } from 'net.minecraft.world.entity';

  class ArrayVoxelShapeInvoker {
    static init(shape: DiscreteVoxelShape, xPoints: DoubleList, yPoints: DoubleList, zPoints: DoubleList): ArrayVoxelShape;
  }


  class BitSetDiscreteVoxelShapeAccessor {
    get storage(): BitSet;
  }


  interface LevelMixin extends LevelAccessor {}
  class LevelMixin extends LevelAccessor {
    findFreePosition(collidingEntity: Entity, collidingShape: VoxelShape, originalPosition: Vec3, maxXOffset: number, maxYOffset: number, maxZOffset: number): Optional<Vec3>;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.minimal_nonvanilla.spawning' {
  import { ClassInstanceMultiMap } from 'net.minecraft.util';
  import { ChunkAwareEntityIterable } from 'net.caffeinemc.mods.lithium.common.world';
  import { Iterable } from 'java.lang';
  import { EntitySectionStorage, PersistentEntitySectionManager } from 'net.minecraft.world.level.entity';
  import { Entity } from 'net.minecraft.world.entity';

  class EntitySectionAccessor<T = any> {
    get collection(): ClassInstanceMultiMap<T>;
  }


  interface EntitySectionStorageMixin<T extends EntityAccess = any> extends ChunkAwareEntityIterable<T> {}
  class EntitySectionStorageMixin<T extends EntityAccess = any> extends ChunkAwareEntityIterable<T> {
    lithium$IterateEntitiesInTrackedSections(): Iterable<T>;
  }


  class PersistentEntitySectionManagerAccessor<T extends EntityAccess = any> {
    get cache(): EntitySectionStorage<T>;
  }


  class ServerChunkCacheMixin {
  }


  class ServerLevelAccessor {
    get entityManager(): PersistentEntitySectionManager<Entity>;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.minimal_nonvanilla.world.block_entity_ticking.support_cache' {
  import { SupportCache } from 'net.caffeinemc.mods.lithium.common.world.blockentity';
  import { BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockPos } from 'net.minecraft.core';

  interface BlockEntityMixin extends SupportCache {}
  class BlockEntityMixin extends SupportCache {
    get type(): BlockEntityType<any>;
    lithium$isSupported(): boolean;
  }


  class DirectBlockEntityTickInvokerMixin<T extends BlockEntity = any> {
  }


  class LevelChunkMixin {
    getBlockState(var1: BlockPos): BlockState;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.minimal_nonvanilla.world.expiring_chunk_tickets' {
  class DistanceManagerMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.profiler' {
  import { Level } from 'net.minecraft.world.level';
  import { MinecraftServer } from 'net.minecraft.server';
  import { ProfilerFiller } from 'net.minecraft.util.profiling';

  interface ServerLevelMixin extends Level {}
  class ServerLevelMixin extends Level {
    get profiler(): ProfilerFiller;
    get server(): MinecraftServer;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.shapes.blockstate_cache' {
  import { VoxelShape } from 'net.minecraft.world.phys.shapes';

  class BlockMixin {
    static isShapeFullBlock(shape: VoxelShape): boolean;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.shapes.lazy_shape_context' {
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Boolean } from 'java.lang';
  import { FluidState } from 'net.minecraft.world.level.material';

  class EntityCollisionContextMixin {
    canWalkOnFluid(state: FluidState, fluidState: FluidState, cir: CallbackInfoReturnable<boolean>): void;
    get heldItem(): ItemStack;
    isHolding(item: Item, cir: CallbackInfoReturnable<boolean>): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.shapes.optimized_matching' {
  class ShapesMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.shapes.precompute_shape_arrays' {
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { DoubleList } from 'it.unimi.dsi.fastutil.doubles';
  import { Axis } from 'Direction';

  class CubePointRangeMixin {
    getDouble(position: number): number;
    initScale(sectionCount: number, ci: CallbackInfo): void;
  }


  class CubeVoxelShapeMixin {
    getCoords(axis: Axis): DoubleList;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.shapes.shape_merging' {
  class ShapesMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.shapes.specialized_shapes' {
  import { VoxelShape, DiscreteVoxelShape } from 'net.minecraft.world.phys.shapes';
  import { DoubleList } from 'it.unimi.dsi.fastutil.doubles';
  import { Axis } from 'Direction';
  import { AxisCycle } from 'net.minecraft.core';
  import { AABB } from 'net.minecraft.world.phys';

  class ShapesMixin {
    static readonly INFINITY: VoxelShape;
    static create(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): VoxelShape;
  }


  class VoxelShapeMixin {
    shape: DiscreteVoxelShape;
    collideX(cycleDirection: AxisCycle, box: AABB, maxDist: number): number;
    findIndex(axis: Axis, coord: number): number;
    getCoords(var1: Axis): DoubleList;
    isEmpty(): boolean;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.util.accessors' {
  import { ClassInstanceMultiMap } from 'net.minecraft.util';
  import { UUID } from 'java.util';
  import { Item } from 'net.minecraft.world.item';
  import { Thread } from 'java.lang';
  import { EntitySectionStorage, PersistentEntitySectionManager } from 'net.minecraft.world.level.entity';
  import { Entity } from 'net.minecraft.world.entity';

  class EntitySectionAccessor<T = any> {
    get collection(): ClassInstanceMultiMap<T>;
  }


  class ItemEntityAccessor {
    lithium$getOwner(): UUID;
  }


  class ItemStackAccessor {
    lithium$getItem(): Item;
  }


  class LevelAccessor {
    get thread(): Thread;
  }


  class PersistentEntitySectionManagerAccessor<T extends EntityAccess = any> {
    get cache(): EntitySectionStorage<T>;
  }


  class ServerLevelAccessor {
    get entityManager(): PersistentEntitySectionManager<Entity>;
  }


  class TransientEntitySectionManagerAccessor<T extends EntityAccess = any> {
    get cache(): EntitySectionStorage<T>;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.util.block_entity_retrieval' {
  import { BlockEntityGetter } from 'net.caffeinemc.mods.lithium.common.world.blockentity';
  import { LevelAccessor } from 'net.minecraft.world.level';
  import { LevelChunk, ChunkAccess } from 'net.minecraft.world.level.chunk';
  import { ChunkStatus } from 'net.minecraft.world.level.chunk.status';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockPos } from 'net.minecraft.core';

  interface LevelMixin extends BlockEntityGetter, LevelAccessor {}
  class LevelMixin extends BlockEntityGetter {
    isClientSide: boolean;
    getChunk(var1: number, var2: number): LevelChunk;
    getChunk(var1: number, var2: number, var3: ChunkStatus, var4: boolean): ChunkAccess;
    lithium$getLoadedExistingBlockEntity(pos: BlockPos): BlockEntity;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.util.block_tracking' {
  import { BlockStateFlagHolder, BlockCountingSection, BlockListeningSection, TrackedBlockStatePredicate, ListeningBlockStatePredicate } from 'net.caffeinemc.mods.lithium.common.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { SectionedBlockChangeTracker } from 'net.caffeinemc.mods.lithium.common.tracking.block';
  import { Level } from 'net.minecraft.world.level';

  interface BlockStateBaseMixin extends BlockStateFlagHolder {}
  class BlockStateBaseMixin extends BlockStateFlagHolder {
    lithium$getAllFlags(): number;
    lithium$initializeFlags(): void;
  }


  class BootstrapMixin {
  }


  interface LevelChunkSectionMixin extends BlockCountingSection, BlockListeningSection {}
  class LevelChunkSectionMixin extends BlockCountingSection {
    lithium$addToCallback(blockGroup: ListeningBlockStatePredicate, tracker: SectionedBlockChangeTracker, sectionPos: number, world: Level): void;
    lithium$mayContainAny(trackedBlockStatePredicate: TrackedBlockStatePredicate): boolean;
    lithium$removeFromCallback(blockGroup: ListeningBlockStatePredicate, tracker: SectionedBlockChangeTracker): void;
    lithium$trackBlockStateChange(newState: BlockState, oldState: BlockState): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.util.chunk_access' {
  import { ChunkView } from 'net.caffeinemc.mods.lithium.common.world';
  import { ChunkAccess } from 'net.minecraft.world.level.chunk';
  import { ChunkStatus } from 'net.minecraft.world.level.chunk.status';

  interface LevelReaderMixin extends ChunkView {}
  class LevelReaderMixin extends ChunkView {
    getChunk(var1: number, var2: number, var3: ChunkStatus, var4: boolean): ChunkAccess;
    lithium$getLoadedChunk(chunkX: number, chunkZ: number): ChunkAccess;
  }


  interface PathNavigationRegionMixin extends ChunkView {}
  class PathNavigationRegionMixin extends ChunkView {
    lithium$getLoadedChunk(chunkX: number, chunkZ: number): ChunkAccess;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.util.chunk_status_tracking' {
  import { GenerationChunkHolder } from 'net.minecraft.server.level';
  import { ChunkPos, LevelHeightAccessor, Level } from 'net.minecraft.world.level';
  import { ChunkAccess, UpgradeData, LevelChunkSection } from 'net.minecraft.world.level.chunk';
  import { Registry } from 'net.minecraft.core';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { BlendingData } from 'net.minecraft.world.level.levelgen.blending';

  interface ChunkHolderMixin extends GenerationChunkHolder {}
  class ChunkHolderMixin extends GenerationChunkHolder {
    constructor(chunkPos: ChunkPos);
  }


  interface LevelChunkMixin extends ChunkAccess {}
  class LevelChunkMixin extends ChunkAccess {
    constructor(chunkPos: ChunkPos, upgradeData: UpgradeData, levelHeightAccessor: LevelHeightAccessor, registry: Registry<Biome>, l: number, levelChunkSections: LevelChunkSection[], blendingData: BlendingData);
    get level(): Level;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.util.data_storage' {
  import { LithiumData } from 'net.caffeinemc.mods.lithium.common.world';
  import { Data } from 'net.caffeinemc.mods.lithium.common.world.LithiumData';

  interface LevelMixin extends LithiumData {}
  class LevelMixin extends LithiumData {
    lithium$getData(): Data;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.util.entity_collection_replacement' {
  import { AbstractCollection, Collection, List, ArrayList } from 'java.util';
  import { TypeFilterableListInternalAccess } from 'net.caffeinemc.mods.lithium.common.entity';
  import { Class } from 'java.lang';
  import { Function } from 'java.util.function';

  interface ClassInstanceMultiMapMixin<T = any> extends TypeFilterableListInternalAccess<T>, AbstractCollection<T> {}
  class ClassInstanceMultiMapMixin<T = any> extends TypeFilterableListInternalAccess<T> {
    find<S>(var1: Class<S>): Collection<S>;
    lithium$getOrCreateAllOfTypeRaw<S extends T>(type: Class<S>): S[];
    lithium$replaceCollectionAndGet<S extends T>(type: Class<S>, listCtor: Function<ArrayList<S>, S[]>): S[];
    lithium$replaceCollectionAndGet<S extends T>(type: Class<S>, list: ArrayList<S>): S[];
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.util.entity_movement_tracking' {
  import { EntityMovementTrackerSection, SectionedEntityMovementTracker, ToggleableMovementTracker } from 'net.caffeinemc.mods.lithium.common.tracking.entity';
  import { PositionedEntityTrackingSection } from 'net.caffeinemc.mods.lithium.common.entity';
  import { EntitySectionStorage, Visibility, EntityAccess, PersistentEntitySectionManager } from 'net.minecraft.world.level.entity';
  import { Entity } from 'net.minecraft.world.entity';

  interface EntitySectionMixin extends EntityMovementTrackerSection, PositionedEntityTrackingSection {}
  class EntitySectionMixin extends EntityMovementTrackerSection {
    isEmpty(): boolean;
    lithium$addListener(listener: SectionedEntityMovementTracker<any, any>): void;
    lithium$getChangeTime(trackedClass: number): number;
    lithium$listenToMovementOnce<S, E extends EntityAccess>(listener: SectionedEntityMovementTracker<E, S>, trackedClass: number): void;
    lithium$removeListenToMovementOnce<S, E extends EntityAccess>(listener: SectionedEntityMovementTracker<E, S>, trackedClass: number): void;
    lithium$removeListener(sectionedEntityCache: EntitySectionStorage<any>, listener: SectionedEntityMovementTracker<any, any>): void;
    lithium$trackEntityMovement(notificationMask: number, time: number): void;
    modifyIsEmpty(previousIsEmpty: boolean): boolean;
    swapStatus(newStatus: Visibility): Visibility;
  }


  class PersistentEntitySectionManagerAccessor<T extends EntityAccess = any> {
    get cache(): EntitySectionStorage<T>;
  }


  interface ServerEntityManagerListenerMixin<T extends EntityAccess = any> extends ToggleableMovementTracker {}
  class ServerEntityManagerListenerMixin<T extends EntityAccess = any> extends ToggleableMovementTracker {
    lithium$setNotificationMask(notificationMask: number): number;
  }


  class ServerLevelAccessor {
    get entityManager(): PersistentEntitySectionManager<Entity>;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.util.entity_section_position' {
  import { PositionedEntityTrackingSection } from 'net.caffeinemc.mods.lithium.common.entity';

  interface EntitySectionMixin extends PositionedEntityTrackingSection {}
  class EntitySectionMixin extends PositionedEntityTrackingSection {
    lithium$getPos(): number;
    lithium$setPos(chunkSectionPos: number): void;
  }


  class EntitySectionStorageMixin<T extends EntityAccess = any> {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.util.inventory_change_listening' {
  import { InventoryChangeEmitter, InventoryChangeListener } from 'net.caffeinemc.mods.lithium.common.block.entity.inventory_change_tracking';
  import { Container } from 'net.minecraft.world';
  import { LithiumStackList } from 'net.caffeinemc.mods.lithium.common.hopper';

  interface BaseContainerBlockEntityMixin extends InventoryChangeEmitter, Container {}
  class BaseContainerBlockEntityMixin extends InventoryChangeEmitter {
    lithium$emitContentModified(): void;
    lithium$emitFirstComparatorAdded(): void;
    lithium$emitRemoved(): void;
    lithium$emitStackListReplaced(): void;
    lithium$forwardContentChangeOnce(inventoryChangeListener: InventoryChangeListener, stackList: LithiumStackList): void;
    lithium$forwardMajorInventoryChanges(inventoryChangeListener: InventoryChangeListener): void;
    lithium$stopForwardingMajorInventoryChanges(inventoryChangeListener: InventoryChangeListener): void;
  }


  class BlockEntityMixin {
  }


  class StackListReplacementTracking {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.util.inventory_change_listening.StackListReplacementTracking' {
  import { InventoryChangeTracker } from 'net.caffeinemc.mods.lithium.common.block.entity.inventory_change_tracking';
  import { NonNullList } from 'net.minecraft.core';
  import { ItemStack } from 'net.minecraft.world.item';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';

  interface ShulkerBoxBlockEntityMixin extends InventoryChangeTracker {}
  class ShulkerBoxBlockEntityMixin extends InventoryChangeTracker {
    setInventoryStackListReplacement(list: NonNullList<ItemStack>, ci: CallbackInfo): void;
  }


  interface HopperBlockEntityMixin extends InventoryChangeTracker {}
  class HopperBlockEntityMixin extends InventoryChangeTracker {
    setInventoryStackListReplacement(list: NonNullList<ItemStack>, ci: CallbackInfo): void;
  }


  interface DispenserBlockEntityMixin extends InventoryChangeTracker {}
  class DispenserBlockEntityMixin extends InventoryChangeTracker {
    setInventoryStackListReplacement(list: NonNullList<ItemStack>, ci: CallbackInfo): void;
  }


  interface ChestBlockEntityMixin extends InventoryChangeTracker {}
  class ChestBlockEntityMixin extends InventoryChangeTracker {
    setInventoryStackListReplacement(list: NonNullList<ItemStack>, ci: CallbackInfo): void;
  }


  interface BarrelBlockEntityMixin extends InventoryChangeTracker {}
  class BarrelBlockEntityMixin extends InventoryChangeTracker {
    setInventoryStackListReplacement(list: NonNullList<ItemStack>, ci: CallbackInfo): void;
  }


  class BaseContainerBlockEntityMixin {
    readNbtStackListReplacement(nbt: CompoundTag, registryLookup: Provider, ci: CallbackInfo): void;
  }


  interface BrewingStandBlockEntityMixin extends InventoryChangeTracker {}
  class BrewingStandBlockEntityMixin extends InventoryChangeTracker {
  }


  interface AbstractFurnaceBlockEntityMixin extends InventoryChangeTracker {}
  class AbstractFurnaceBlockEntityMixin extends InventoryChangeTracker {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.util.inventory_comparator_tracking' {
  import { ComparatorTracker } from 'net.caffeinemc.mods.lithium.common.block.entity.inventory_comparator_tracking';
  import { Direction } from 'net.minecraft.core';

  interface BlockEntityMixin extends ComparatorTracker {}
  class BlockEntityMixin extends ComparatorTracker {
    lithium$hasAnyComparatorNearby(): boolean;
    lithium$onComparatorAdded(direction: Direction, offset: number): void;
  }


  class DiodeBlockMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.util.item_component_and_count_tracking' {
  import { ChangePublisher, ChangeSubscriber } from 'net.caffeinemc.mods.lithium.common.util.change_tracking';
  import { ItemEntity } from 'net.minecraft.world.entity.item';
  import { CountChangeSubscriber } from 'net.caffeinemc.mods.lithium.common.util.change_tracking.ChangeSubscriber';
  import { ItemStack } from 'net.minecraft.world.item';
  import { PatchedDataComponentMap } from 'net.minecraft.core.component';

  interface ItemEntityMixin extends ChangePublisher<ItemEntity>, CountChangeSubscriber<ItemStack> {}
  class ItemEntityMixin extends ChangePublisher<ItemEntity> {
    get item(): ItemStack;
    lithium$forceUnsubscribe(publisher: ItemStack, subscriberData: number): void;
    lithium$notify(publisher: ItemStack, subscriberData: number): void;
    lithium$notifyCount(publisher: ItemStack, subscriberData: number, newCount: number): void;
    lithium$subscribe(subscriber: ChangeSubscriber<ItemEntity>, subscriberData: number): void;
    lithium$unsubscribe(subscriber: ChangeSubscriber<ItemEntity>): number;
  }


  interface ItemStackMixin extends ChangePublisher<ItemStack>, ChangeSubscriber<PatchedDataComponentMap> {}
  class ItemStackMixin extends ChangePublisher<ItemStack> {
    isEmpty(): boolean;
    lithium$forceUnsubscribe(publisher: PatchedDataComponentMap, subscriberData: number): void;
    lithium$isSubscribedWithData(subscriber: ChangeSubscriber<ItemStack>, subscriberData: number): boolean;
    lithium$notify(publisher: PatchedDataComponentMap, subscriberData: number): void;
    lithium$subscribe(subscriber: ChangeSubscriber<ItemStack>, subscriberData: number): void;
    lithium$unsubscribe(subscriber: ChangeSubscriber<ItemStack>): number;
    lithium$unsubscribeWithData(subscriber: ChangeSubscriber<ItemStack>, subscriberData: number): void;
  }


  interface PatchedDataComponentMapMixin extends ChangePublisher<PatchedDataComponentMap> {}
  class PatchedDataComponentMapMixin extends ChangePublisher<PatchedDataComponentMap> {
    lithium$subscribe(subscriber: ChangeSubscriber<PatchedDataComponentMap>, subscriberData: number): void;
    lithium$unsubscribe(subscriber: ChangeSubscriber<PatchedDataComponentMap>): number;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.util.world_border_listener' {
  import { BorderChangeListener } from 'net.minecraft.world.level.border';
  import { BorderExtent } from 'WorldBorder';
  import { Operation } from 'com.llamalad7.mixinextras.injector.wrapoperation';

  class WorldBorderMixin {
    addListener(var1: BorderChangeListener): void;
    getUpdatedArea(instance: BorderExtent, original: Operation<BorderExtent>): BorderExtent;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.world.block_entity_ticking.chunk_tickable' {
  class LevelMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.world.block_entity_ticking.sleeping' {
  import { SetChangedHandlingBlockEntity } from 'net.caffeinemc.mods.lithium.common.block.entity';
  import { TickingBlockEntity } from 'net.minecraft.world.level.block.entity';

  interface BlockEntityMixin extends SetChangedHandlingBlockEntity {}
  class BlockEntityMixin extends SetChangedHandlingBlockEntity {
  }


  class LevelChunkMixin {
  }


  class LevelMixin {
  }


  class ServerLevelMixin {
  }


  class WrappedBlockEntityTickInvokerAccessor {
    callSetWrapped(var1: TickingBlockEntity): void;
    get wrapped(): TickingBlockEntity;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.world.block_entity_ticking.sleeping.brewing_stand' {
  import { BlockEntity, BlockEntityType, TickingBlockEntity } from 'net.minecraft.world.level.block.entity';
  import { SleepingBlockEntity, SetChangedHandlingBlockEntity } from 'net.caffeinemc.mods.lithium.common.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { WrappedBlockEntityTickInvokerAccessor } from 'net.caffeinemc.mods.lithium.mixin.world.block_entity_ticking.sleeping';

  interface BrewingStandBlockEntityMixin extends SleepingBlockEntity, SetChangedHandlingBlockEntity, BlockEntity {}
  class BrewingStandBlockEntityMixin extends SleepingBlockEntity {
    constructor(type: BlockEntityType<any>, pos: BlockPos, state: BlockState);
    lithium$getSleepingTicker(): TickingBlockEntity;
    lithium$getTickWrapper(): WrappedBlockEntityTickInvokerAccessor;
    lithium$handleSetChanged(): void;
    lithium$setSleepingTicker(sleepingTicker: TickingBlockEntity): void;
    lithium$setTickWrapper(tickWrapper: WrappedBlockEntityTickInvokerAccessor): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.world.block_entity_ticking.sleeping.campfire' {
  import { BlockEntity, BlockEntityType, TickingBlockEntity } from 'net.minecraft.world.level.block.entity';
  import { SleepingBlockEntity } from 'net.caffeinemc.mods.lithium.common.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { WrappedBlockEntityTickInvokerAccessor } from 'net.caffeinemc.mods.lithium.mixin.world.block_entity_ticking.sleeping';

  interface CampfireBlockEntityMixin extends SleepingBlockEntity, BlockEntity {}
  class CampfireBlockEntityMixin extends SleepingBlockEntity {
    constructor(type: BlockEntityType<any>, pos: BlockPos, state: BlockState);
    lithium$getSleepingTicker(): TickingBlockEntity;
    lithium$getTickWrapper(): WrappedBlockEntityTickInvokerAccessor;
    lithium$setSleepingTicker(sleepingTicker: TickingBlockEntity): void;
    lithium$setTickWrapper(tickWrapper: WrappedBlockEntityTickInvokerAccessor): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.world.block_entity_ticking.sleeping.campfire.lit' {
  import { BlockEntity, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { SleepingBlockEntity } from 'net.caffeinemc.mods.lithium.common.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  interface CampfireBlockEntityMixin extends SleepingBlockEntity, BlockEntity {}
  class CampfireBlockEntityMixin extends SleepingBlockEntity {
    constructor(type: BlockEntityType<any>, pos: BlockPos, state: BlockState);
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.world.block_entity_ticking.sleeping.campfire.unlit' {
  import { BlockEntity, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { SleepingBlockEntity } from 'net.caffeinemc.mods.lithium.common.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  interface CampfireBlockEntityMixin extends SleepingBlockEntity, BlockEntity {}
  class CampfireBlockEntityMixin extends SleepingBlockEntity {
    constructor(type: BlockEntityType<any>, pos: BlockPos, state: BlockState);
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.world.block_entity_ticking.sleeping.crafter' {
  import { BlockEntity, BlockEntityType, TickingBlockEntity } from 'net.minecraft.world.level.block.entity';
  import { SleepingBlockEntity, SetChangedHandlingBlockEntity } from 'net.caffeinemc.mods.lithium.common.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { WrappedBlockEntityTickInvokerAccessor } from 'net.caffeinemc.mods.lithium.mixin.world.block_entity_ticking.sleeping';

  interface CrafterBlockEntityMixin extends SleepingBlockEntity, SetChangedHandlingBlockEntity, BlockEntity {}
  class CrafterBlockEntityMixin extends SleepingBlockEntity {
    constructor(blockEntityType: BlockEntityType<any>, blockPos: BlockPos, blockState: BlockState);
    lithium$getSleepingTicker(): TickingBlockEntity;
    lithium$getTickWrapper(): WrappedBlockEntityTickInvokerAccessor;
    lithium$handleSetChanged(): void;
    lithium$setSleepingTicker(sleepingTicker: TickingBlockEntity): void;
    lithium$setTickWrapper(tickWrapper: WrappedBlockEntityTickInvokerAccessor): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.world.block_entity_ticking.sleeping.furnace' {
  import { BlockEntity, BlockEntityType, TickingBlockEntity } from 'net.minecraft.world.level.block.entity';
  import { SleepingBlockEntity, SetChangedHandlingBlockEntity } from 'net.caffeinemc.mods.lithium.common.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { WrappedBlockEntityTickInvokerAccessor } from 'net.caffeinemc.mods.lithium.mixin.world.block_entity_ticking.sleeping';

  interface AbstractFurnaceBlockEntityMixin extends SleepingBlockEntity, SetChangedHandlingBlockEntity, BlockEntity {}
  class AbstractFurnaceBlockEntityMixin extends SleepingBlockEntity {
    constructor(type: BlockEntityType<any>, pos: BlockPos, state: BlockState);
    lithium$getSleepingTicker(): TickingBlockEntity;
    lithium$getTickWrapper(): WrappedBlockEntityTickInvokerAccessor;
    lithium$handleSetChanged(): void;
    lithium$setSleepingTicker(sleepingTicker: TickingBlockEntity): void;
    lithium$setTickWrapper(tickWrapper: WrappedBlockEntityTickInvokerAccessor): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.world.block_entity_ticking.sleeping.hopper' {
  import { BlockEntity, BlockEntityType, TickingBlockEntity } from 'net.minecraft.world.level.block.entity';
  import { SleepingBlockEntity } from 'net.caffeinemc.mods.lithium.common.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { WrappedBlockEntityTickInvokerAccessor } from 'net.caffeinemc.mods.lithium.mixin.world.block_entity_ticking.sleeping';

  interface HopperBlockEntityMixin extends SleepingBlockEntity, BlockEntity {}
  class HopperBlockEntityMixin extends SleepingBlockEntity {
    constructor(type: BlockEntityType<any>, pos: BlockPos, state: BlockState);
    lithium$getSleepingTicker(): TickingBlockEntity;
    lithium$getTickWrapper(): WrappedBlockEntityTickInvokerAccessor;
    lithium$setSleepingTicker(sleepingTicker: TickingBlockEntity): void;
    lithium$setTickWrapper(tickWrapper: WrappedBlockEntityTickInvokerAccessor): void;
    lithium$startSleeping(): boolean;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.world.block_entity_ticking.sleeping.shulker_box' {
  import { SleepingBlockEntity } from 'net.caffeinemc.mods.lithium.common.block.entity';
  import { WrappedBlockEntityTickInvokerAccessor } from 'net.caffeinemc.mods.lithium.mixin.world.block_entity_ticking.sleeping';
  import { TickingBlockEntity } from 'net.minecraft.world.level.block.entity';

  interface ShulkerBoxBlockEntityMixin extends SleepingBlockEntity {}
  class ShulkerBoxBlockEntityMixin extends SleepingBlockEntity {
    lithium$getSleepingTicker(): TickingBlockEntity;
    lithium$getTickWrapper(): WrappedBlockEntityTickInvokerAccessor;
    lithium$setSleepingTicker(sleepingTicker: TickingBlockEntity): void;
    lithium$setTickWrapper(tickWrapper: WrappedBlockEntityTickInvokerAccessor): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.world.block_entity_ticking.world_border' {
  import { WorldBorderListenerOnce } from 'net.caffeinemc.mods.lithium.common.world.listeners';
  import { BlockPos } from 'net.minecraft.core';
  import { WorldBorder } from 'net.minecraft.world.level.border';

  interface DirectBlockEntityTickInvokerMixin extends WorldBorderListenerOnce {}
  class DirectBlockEntityTickInvokerMixin extends WorldBorderListenerOnce {
    get pos(): BlockPos;
    lithium$onWorldBorderShapeChange(worldBorder: WorldBorder): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.world.chunk_access' {
  import { ChunkHolderExtended } from 'net.caffeinemc.mods.lithium.common.world.chunk';
  import { AtomicReferenceArray } from 'java.util.concurrent.atomic';
  import { CompletableFuture } from 'java.util.concurrent';
  import { ChunkResult, ChunkMap } from 'net.minecraft.server.level';
  import { ChunkAccess, LevelChunk } from 'net.minecraft.world.level.chunk';
  import { ChunkStatus } from 'net.minecraft.world.level.chunk.status';
  import { LevelAccessor, BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { BooleanSupplier } from 'java.util.function';

  interface ChunkHolderMixin extends ChunkHolderExtended {}
  class ChunkHolderMixin extends ChunkHolderExtended {
    lithium$updateLastAccessTime(time: number): boolean;
  }


  class GenerationChunkHolderAccessor {
    invokeCannotBeLoaded(var1: ChunkStatus): boolean;
    lithium$getChunkFuturesByStatus(): AtomicReferenceArray<CompletableFuture<ChunkResult<ChunkAccess>>>;
  }


  interface LevelMixin extends LevelAccessor {}
  class LevelMixin extends LevelAccessor {
    getChunk(pos: BlockPos): ChunkAccess;
    getChunk(chunkX: number, chunkZ: number): LevelChunk;
    getChunk(chunkX: number, chunkZ: number, status: ChunkStatus): ChunkAccess;
    getChunkAt(pos: BlockPos): LevelChunk;
    getChunkForCollisions(chunkX: number, chunkZ: number): BlockGetter;
  }


  class ServerChunkCacheMixin {
    chunkMap: ChunkMap;
    getChunk(x: number, z: number, status: ChunkStatus, create: boolean): ChunkAccess;
    tick(var1: BooleanSupplier, var2: boolean): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.world.chunk_ticking.spread_ice' {
  class BiomeMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.world.combined_heightmap_update' {
  import { Predicate } from 'java.util.function';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { ChunkAccess, UpgradeData, LevelChunkSection } from 'net.minecraft.world.level.chunk';
  import { ChunkPos, LevelHeightAccessor } from 'net.minecraft.world.level';
  import { Registry } from 'net.minecraft.core';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { BlendingData } from 'net.minecraft.world.level.levelgen.blending';

  class HeightmapAccessor {
    callSet(var1: number, var2: number, var3: number): void;
    get blockPredicate(): Predicate<BlockState>;
  }


  interface LevelChunkMixin extends ChunkAccess {}
  class LevelChunkMixin extends ChunkAccess {
    constructor(pos: ChunkPos, upgradeData: UpgradeData, heightLimitView: LevelHeightAccessor, biome: Registry<Biome>, inhabitedTime: number, sectionArrayInitializer: LevelChunkSection[], blendingData: BlendingData);
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.world.explosions.block_raycast' {
  import { HashSet, Collection } from 'java.util';
  import { BlockPos } from 'net.minecraft.core';
  import { ObjectArrayList } from 'it.unimi.dsi.fastutil.objects';

  class ExplosionMixin {
    collectBlocks(affectedBlocks: ObjectArrayList<BlockPos>, collection: Collection<BlockPos>): boolean;
    skipLoop(prevValue: number): number;
    skipNewHashSet(): HashSet<BlockPos>;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.world.explosions.cache_exposure' {
  import { ExplosionCache } from 'net.caffeinemc.mods.lithium.common.world';
  import { Entity } from 'net.minecraft.world.entity';

  class ExplosionDamageCalculatorMixin {
  }


  interface ExplosionMixin extends ExplosionCache {}
  class ExplosionMixin extends ExplosionCache {
    lithium_fabric$cacheExposure(entity: Entity, exposure: number): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.world.game_events.dispatch' {
  import { ChunkAccess, UpgradeData, LevelChunkSection } from 'net.minecraft.world.level.chunk';
  import { ChunkPos, LevelHeightAccessor, Level } from 'net.minecraft.world.level';
  import { Registry } from 'net.minecraft.core';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { BlendingData } from 'net.minecraft.world.level.levelgen.blending';
  import { Int2ObjectMap } from 'it.unimi.dsi.fastutil.ints';
  import { GameEventListenerRegistry } from 'net.minecraft.world.level.gameevent';

  class GameEventDispatcherMixin {
  }


  interface LevelChunkMixin extends ChunkAccess {}
  class LevelChunkMixin extends ChunkAccess {
    constructor(pos: ChunkPos, upgradeData: UpgradeData, heightLimitView: LevelHeightAccessor, biomeRegistry: Registry<Biome>, inhabitedTime: number, sectionArray: LevelChunkSection[], blendingData: BlendingData);
    get level(): Level;
    setGameEventListenerRegistrySections(gameEventListenerRegistrySections: Int2ObjectMap<GameEventListenerRegistry>): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.world.inline_block_access' {
  import { ChunkAccess, UpgradeData, LevelChunkSection, LevelChunk } from 'net.minecraft.world.level.chunk';
  import { ChunkPos, LevelHeightAccessor } from 'net.minecraft.world.level';
  import { Registry, BlockPos } from 'net.minecraft.core';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { BlendingData } from 'net.minecraft.world.level.levelgen.blending';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { FluidState } from 'net.minecraft.world.level.material';

  interface LevelChunkMixin extends ChunkAccess {}
  class LevelChunkMixin extends ChunkAccess {
    constructor(pos: ChunkPos, upgradeData: UpgradeData, heightLimitView: LevelHeightAccessor, biome: Registry<Biome>, inhabitedTime: number, sectionArrayInitializer: LevelChunkSection[], blendingData: BlendingData);
    getBlockState(pos: BlockPos): BlockState;
    getFluidState(x: number, y: number, z: number): FluidState;
  }


  interface LevelMixin extends LevelHeightAccessor {}
  class LevelMixin extends LevelHeightAccessor {
    getBlockState(pos: BlockPos): BlockState;
    getChunk(var1: number, var2: number): LevelChunk;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.world.inline_height' {
  import { LevelHeightAccessor } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';

  interface LevelChunkMixin extends LevelHeightAccessor {}
  class LevelChunkMixin extends LevelHeightAccessor {
    get maxBuildHeight(): number;
    get maxSection(): number;
    get minSection(): number;
    get sectionsCount(): number;
    getSectionIndex(y: number): number;
    getSectionIndexFromSectionY(coord: number): number;
    getSectionYFromSectionIndex(index: number): number;
    isOutsideBuildHeight(pos: BlockPos): boolean;
    isOutsideBuildHeight(y: number): boolean;
  }


  interface LevelMixin extends LevelHeightAccessor {}
  class LevelMixin extends LevelHeightAccessor {
    get height(): number;
    get maxBuildHeight(): number;
    get maxSection(): number;
    get minBuildHeight(): number;
    get minSection(): number;
    get sectionsCount(): number;
    getSectionIndex(y: number): number;
    getSectionIndexFromSectionY(coord: number): number;
    getSectionYFromSectionIndex(index: number): number;
    isOutsideBuildHeight(pos: BlockPos): boolean;
    isOutsideBuildHeight(y: number): boolean;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.world.raycast' {
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockHitResult, Vec3 } from 'net.minecraft.world.phys';
  import { VoxelShape } from 'net.minecraft.world.phys.shapes';
  import { BiFunction, Function } from 'java.util.function';
  import { ClipContext } from 'net.minecraft.world.level';
  import { Fluid } from 'ClipContext';

  class BlockGetterMixin {
    clip(context: ClipContext): BlockHitResult;
    clipWithInteractionOverride(var1: Vec3, var2: Vec3, var3: BlockPos, var4: VoxelShape, var5: BlockState): BlockHitResult;
    getBlockState(var1: BlockPos): BlockState;
    method_17743(var1: ClipContext, var2: BlockPos): BlockHitResult;
    static method_17746(par1: ClipContext): BlockHitResult;
    static traverseBlocks<T, C>(start: Vec3, end: Vec3, context: C, blockHitFactory: BiFunction<C, BlockPos, T>, missFactory: Function<C, T>): T;
  }


  class ClipContextAccessor {
    get fluidHandling(): Fluid;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.world.temperature_cache' {
  import { BlockPos } from 'net.minecraft.core';

  class BiomeMixin {
    getTemperature(blockPos: BlockPos): number;
  }

}

declare module 'net.caffeinemc.mods.lithium.mixin.world.tick_scheduler' {
  import { ScheduledTick } from 'net.minecraft.world.ticks';
  import { BlockPos } from 'net.minecraft.core';
  import { Predicate, Function } from 'java.util.function';
  import { Stream } from 'java.util.stream';
  import { ListTag } from 'net.minecraft.nbt';

  class LevelChunkTicksMixin<T = any> {
    count(): number;
    get all(): Stream<ScheduledTick<T>>;
    hasScheduledTick(pos: BlockPos, type: T): boolean;
    peek(): ScheduledTick<T>;
    poll(): ScheduledTick<T>;
    removeIf(predicate: Predicate<ScheduledTick<T>>): void;
    save(l: number, functionParameter: Function<T, string>): ListTag;
    schedule(orderedTick: ScheduledTick<T>): void;
    unpack(time: number): void;
  }

}

declare module 'net.caffeinemc.mods.lithium.neoforge' {
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';
  import { PlatformMappingInformation, PlatformMixinOverrides, PlatformModCompat, PlatformRuntimeInformation } from 'net.caffeinemc.mods.lithium.common.services';
  import { Map, List } from 'java.util';
  import { Option } from 'net.caffeinemc.mods.lithium.common.config';
  import { MixinOverride } from 'net.caffeinemc.mods.lithium.common.services.PlatformMixinOverrides';
  import { HopperBlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Path } from 'java.nio.file';

  class LithiumNeoForgeMod {
    constructor(bus: IEventBus, modContainer: ModContainer);
  }


  interface NeoForgeMappingInformation extends PlatformMappingInformation {}
  class NeoForgeMappingInformation extends PlatformMappingInformation {
    mapMethodName(fromMappings: string, clazz: string, method: string, argsDescriptor: string, mojmap: string): string;
  }


  interface NeoForgeMixinOverrides extends PlatformMixinOverrides {}
  class NeoForgeMixinOverrides extends PlatformMixinOverrides {
    applyLithiumCompat(options: Map<string, Option>): void;
    applyModOverrides(): MixinOverride[];
  }


  interface NeoForgeModCompat extends PlatformModCompat {}
  class NeoForgeModCompat extends PlatformModCompat {
    canHopperInteractWithApiBlockInventory(hopperBlockEntity: HopperBlockEntity, hopperState: BlockState, extracting: boolean): boolean;
  }


  interface NeoForgeRuntimeInformation extends PlatformRuntimeInformation {}
  class NeoForgeRuntimeInformation extends PlatformRuntimeInformation {
    get configDirectory(): Path;
    get gameDirectory(): Path;
    isDevelopmentEnvironment(): boolean;
    isModInLoadingList(modId: string): boolean;
    platformHasEarlyLoadingScreen(): boolean;
    platformUsesRefmap(): boolean;
    usesAlphaMultiplication(): boolean;
  }

}

declare module 'net.caffeinemc.mods.lithium.neoforge.mixin.block.hopper' {
  class LevelMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.neoforge.mixin.chunk_load_tricks' {
  import { ChunkAccess } from 'net.minecraft.world.level.chunk';
  import { ChunkHolder } from 'net.minecraft.server.level';

  class ChunkLoadTricksMixin {
    static tryRetrieveCurrentlyLoading(holder: ChunkHolder): ChunkAccess;
  }

}

declare module 'net.caffeinemc.mods.lithium.neoforge.mixin.startup' {
  class MinecraftMixin {
  }

}

declare module 'net.caffeinemc.mods.lithium.neoforge.mixin.util.inventory_change_listening' {
  import { RandomizableContainerBlockEntity } from 'net.minecraft.world.level.block.entity';
  import { InventoryChangeEmitter } from 'net.caffeinemc.mods.lithium.common.block.entity.inventory_change_tracking';

  interface ChestBlockEntityMixin extends InventoryChangeEmitter, RandomizableContainerBlockEntity {}
  class ChestBlockEntityMixin extends InventoryChangeEmitter {
  }

}