declare module 'malte0811.ferritecore.ducks' {
  import { VoxelShape } from 'net.minecraft.world.phys.shapes';
  import { FastMap } from 'malte0811.ferritecore.fastmap';
  import { Reference2ObjectMap } from 'it.unimi.dsi.fastutil.objects';
  import { Property } from 'net.minecraft.world.level.block.state.properties';
  import { Comparable } from 'java.lang';
  import { Table } from 'com.google.common.collect';

  class BlockStateCacheAccess {
    get collisionShape(): VoxelShape;
    get faceSturdy(): boolean[];
    get occlusionShapes(): VoxelShape[];
    set collisionShape(var1: VoxelShape);
    set faceSturdy(var1: boolean[]);
    set occlusionShapes(var1: VoxelShape[]);
  }


  class FastMapStateHolder<S = any> {
    get neighborTable(): Table<Property<any>, Comparable<any>, S>;
    get stateIndex(): number;
    get stateMap(): FastMap<S>;
    get vanillaPropertyMap(): Reference2ObjectMap<Property<any>, Comparable<any>>;
    replacePropertyMap(var1: Reference2ObjectMap<Property<any>, Comparable<any>>): void;
    set neighborTable(var1: Table<Property<any>, Comparable<any>, S>);
    set stateIndex(var1: number);
    set stateMap(var1: FastMap<S>);
  }


  class SmallThreadDetectable {
    static readonly UNLOCKED: number;
    static readonly LOCKED: number;
    static readonly CRASHING: number;
    ferritecore$getState(): number;
    ferritecore$setState(var1: number): void;
  }

}

declare module 'malte0811.ferritecore.fastmap' {
  import { Property } from 'net.minecraft.world.level.block.state.properties';
  import { Comparable } from 'java.lang';
  import { Collection, Map } from 'java.util';
  import { Entry } from 'Map';
  import { ReferenceSet } from 'it.unimi.dsi.fastutil.objects';

  interface BinaryFastMapKey<T extends Comparable<T> = any> extends FastMapKey<T> {}
  class BinaryFastMapKey<T extends Comparable<T> = any> extends FastMapKey<T> {
    constructor(property: Property<T>, mapFactor: number);
    get factorToNext(): number;
    getValue(mapIndex: number): T;
    replaceIn(mapIndex: number, newValue: Comparable<any>): number;
    toPartialMapIndex(value: Comparable<any>): number;
  }


  interface CompactFastMapKey<T extends Comparable<T> = any> extends FastMapKey<T> {}
  class CompactFastMapKey<T extends Comparable<T> = any> extends FastMapKey<T> {
    get factorToNext(): number;
    getValue(mapIndex: number): T;
    replaceIn(mapIndex: number, newValue: Comparable<any>): number;
    toPartialMapIndex(value: Comparable<any>): number;
  }


  class FastMap<Value = any> {
    constructor(properties: Collection<Property<any>>, valuesMap: Map<Map<Property<any>, Comparable<any>>, Value>, compact: boolean);
    get propertySet(): ReferenceSet<Property<any>>;
    getEntry(propertyIndex: number, stateIndex: number): Entry<Property<any>, Comparable<any>>;
    getIndexOf(state: Map<Property<any>, Comparable<any>>): number;
    getKey(keyIndex: number): FastMapKey<any>;
    getValue<T extends Comparable<T>>(stateIndex: number, property: Property<T>): T;
    getValue(stateIndex: number, key: any): Comparable<any>;
    isSingleState(): boolean;
    numProperties(): number;
    with(oldIndex: number, prop: Property<any>, value: any): Value;
  }


  class FastMapKey<T extends Comparable<T> = any> {
    get property(): Property<T>;
    getValue(var1: number): T;
    numValues(): number;
  }


  class PropertyIndexer<T extends Comparable<T> = any> {
    byIndex(index: number): T;
    get property(): Property<T>;
    static makeIndexer<T extends Comparable<T>>(prop: Property<T>): PropertyIndexer<T>;
    numValues(): number;
    toIndex(var1: Comparable<any>): number;
  }

}

declare module 'malte0811.ferritecore.fastmap.table' {
  import { Map, Set, Collection } from 'java.util';
  import { Comparable } from 'java.lang';
  import { Property } from 'net.minecraft.world.level.block.state.properties';
  import { Cell } from 'Table';
  import { FastMapStateHolder } from 'malte0811.ferritecore.ducks';
  import { Table } from 'com.google.common.collect';

  interface CrashNeighborTable<S = any> extends NeighborTableBase<S> {}
  class CrashNeighborTable<S = any> extends NeighborTableBase<S> {
    cellSet(): Set<Cell<Property<any>, Comparable<any>, S>>;
    column(columnKey: Comparable<any>): Map<Property<any>, S>;
    columnKeySet(): Set<Comparable<any>>;
    columnMap(): Map<Comparable<any>, Map<Property<any>, S>>;
    contains(rowKey: any, columnKey: any): boolean;
    containsColumn(columnKey: any): boolean;
    containsRow(rowKey: any): boolean;
    containsValue(value: any): boolean;
    get(rowKey: any, columnKey: any): S;
    static get instance<S>(): CrashNeighborTable<S>;
    isEmpty(): boolean;
    row(rowKey: Property<any>): Map<Comparable<any>, S>;
    rowKeySet(): Set<Property<any>>;
    rowMap(): Map<Property<any>, Map<Comparable<any>, S>>;
    size(): number;
    values(): Collection<S>;
  }


  interface FastmapNeighborTable<S = any> extends NeighborTableBase<S> {}
  class FastmapNeighborTable<S = any> extends NeighborTableBase<S> {
    constructor(owner: FastMapStateHolder<S>);
    cellSet(): Set<Cell<Property<any>, Comparable<any>, S>>;
    column(columnKey: Comparable<any>): Map<Property<any>, S>;
    columnKeySet(): Set<Comparable<any>>;
    columnMap(): Map<Comparable<any>, Map<Property<any>, S>>;
    contains(rowKey: any, columnKey: any): boolean;
    containsColumn(columnKey: any): boolean;
    containsRow(rowKey: any): boolean;
    containsValue(value: any): boolean;
    get(rowKey: any, columnKey: any): S;
    isEmpty(): boolean;
    row(rowKey: Property<any>): Map<Comparable<any>, S>;
    rowKeySet(): Set<Property<any>>;
    rowMap(): Map<Property<any>, Map<Comparable<any>, S>>;
    size(): number;
    values(): Collection<S>;
  }


  interface NeighborTableBase<S = any> extends Table<Property, Comparable, S> {}
  class NeighborTableBase<S = any> extends Table<Property, Comparable, S> {
    clear(): void;
    put(rowKey: Property<any>, columnKey: Comparable<any>, value: S): S;
    putAll(table: Table<Property<any>, Comparable<any>, S>): void;
    remove(rowKey: any, columnKey: any): S;
  }

}

declare module 'malte0811.ferritecore.hash' {
  import { Strategy } from 'Hash';
  import { ArrayVSAccess, DiscreteVSAccess, SliceShapeAccess, VoxelShapeAccess } from 'malte0811.ferritecore.mixin.accessors';
  import { DiscreteVoxelShape, VoxelShape } from 'net.minecraft.world.phys.shapes';
  import { ToIntFunction, BiPredicate } from 'java.util.function';

  interface ArrayVoxelShapeHash extends Strategy<ArrayVSAccess> {}
  class ArrayVoxelShapeHash extends Strategy<ArrayVSAccess> {
    static readonly INSTANCE: ArrayVoxelShapeHash;
    equals(a: ArrayVSAccess, b: ArrayVSAccess): boolean;
    hashCode(o: ArrayVSAccess): number;
  }


  interface DiscreteVSHash extends Strategy<DiscreteVoxelShape> {}
  class DiscreteVSHash extends Strategy<DiscreteVoxelShape> {
    static readonly INSTANCE: DiscreteVSHash;
    equals(a: DiscreteVoxelShape, b: DiscreteVoxelShape): boolean;
    equals(a: DiscreteVSAccess, b: DiscreteVSAccess): boolean;
    hashCode(shape: DiscreteVoxelShape): number;
    hashCode(o: DiscreteVSAccess): number;
  }


  interface LambdaBasedHash<T = any> extends Strategy<T> {}
  class LambdaBasedHash<T = any> extends Strategy<T> {
    constructor(hash: ToIntFunction<T>, equal: BiPredicate<T, T>);
    equals(a: T, b: T): boolean;
    hashCode(o: T): number;
  }


  interface SliceShapeHash extends Strategy<SliceShapeAccess> {}
  class SliceShapeHash extends Strategy<SliceShapeAccess> {
    static readonly INSTANCE: SliceShapeHash;
    equals(a: SliceShapeAccess, b: SliceShapeAccess): boolean;
    hashCode(o: SliceShapeAccess): number;
  }


  interface VoxelShapeHash extends Strategy<VoxelShape> {}
  class VoxelShapeHash extends Strategy<VoxelShape> {
    static readonly INSTANCE: VoxelShapeHash;
    equals(a: VoxelShape, b: VoxelShape): boolean;
    equals(a: VoxelShapeAccess, b: VoxelShapeAccess): boolean;
    hashCode(o: VoxelShape): number;
    hashCode(o: VoxelShapeAccess): number;
  }

}

declare module 'malte0811.ferritecore.impl' {
  import { MultiPartBakedModel } from 'net.minecraft.client.resources.model';
  import { List, Map } from 'java.util';
  import { Pair } from 'org.apache.commons.lang3.tuple';
  import { Predicate } from 'java.util.function';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BakedQuad } from 'net.minecraft.client.renderer.block.model';
  import { Reference2ObjectMap, ReferenceSet, ObjectCollection, ObjectSet } from 'it.unimi.dsi.fastutil.objects';
  import { Property } from 'net.minecraft.world.level.block.state.properties';
  import { Comparable } from 'java.lang';
  import { FastMapStateHolder } from 'malte0811.ferritecore.ducks';
  import { Entry } from 'Reference2ObjectMap';

  class Deduplicator {
    static and(list: Predicate<BlockState>[]): Predicate<BlockState>;
    static deduplicate(bq: BakedQuad): void;
    static deduplicateVariant(variant: string): string;
    static makeMultipartModel(selectors: Pair<Predicate<BlockState>[]): MultiPartBakedModel;
    static or(list: Predicate<BlockState>[]): Predicate<BlockState>;
    static registerReloadListener(): void;
  }


  interface FastMapEntryMap extends Reference2ObjectMap<Property, Comparable> {}
  class FastMapEntryMap extends Reference2ObjectMap<Property, Comparable> {
    constructor(viewedState: FastMapStateHolder<any>);
    containsKey(key: any): boolean;
    containsValue(value: any): boolean;
    defaultReturnValue(comparable: Comparable<any>): void;
    defaultReturnValue(): Comparable<any>;
    get(key: any): Comparable<any>;
    isEmpty(): boolean;
    keySet(): ReferenceSet<Property<any>>;
    putAll(m: Map<Property<any>, Comparable<any>>): void;
    reference2ObjectEntrySet(): ObjectSet<Entry<Property<any>, Comparable<any>>>;
    size(): number;
    values(): ObjectCollection<Comparable<any>>;
  }

}

declare module 'malte0811.ferritecore' {
  import { RegisterStageEvent } from 'RenderLevelStageEvent';

  class IPlatformHooks {
    computeBlockstateCacheFieldName(): string;
    computeStateHolderValuesName(): string;
  }


  class ModClientForge {
    static registerReloadListener(ev: RegisterStageEvent): void;
  }


  class ModMainForge {
  }


  interface PlatformHooks extends IPlatformHooks {}
  class PlatformHooks extends IPlatformHooks {
    computeBlockstateCacheFieldName(): string;
    computeStateHolderValuesName(): string;
  }

}

declare module 'malte0811.ferritecore.mixin.accessors' {
  import { DoubleList } from 'it.unimi.dsi.fastutil.doubles';
  import { BitSet } from 'java.util';
  import { VoxelShape, DiscreteVoxelShape } from 'net.minecraft.world.phys.shapes';
  import { Axis } from 'Direction';

  interface ArrayVSAccess extends VoxelShapeAccess {}
  class ArrayVSAccess extends VoxelShapeAccess {
    get xPoints(): DoubleList;
    get yPoints(): DoubleList;
    get zPoints(): DoubleList;
    set xPoints(var1: DoubleList);
    set yPoints(var1: DoubleList);
    set zPoints(var1: DoubleList);
  }


  class BakedQuadAccess {
    setVertices(var1: number[]): void;
  }


  interface BitSetDVSAccess extends DiscreteVSAccess {}
  class BitSetDVSAccess extends DiscreteVSAccess {
    get storage(): BitSet;
    get xMax(): number;
    get xMin(): number;
    get yMax(): number;
    get yMin(): number;
    get zMax(): number;
    get zMin(): number;
  }


  class DiscreteVSAccess {
    get xSize(): number;
    get ySize(): number;
    get zSize(): number;
  }


  interface SliceShapeAccess extends VoxelShapeAccess {}
  class SliceShapeAccess extends VoxelShapeAccess {
    get axis(): Axis;
    get delegate(): VoxelShape;
  }


  interface SubShapeAccess extends DiscreteVSAccess {}
  class SubShapeAccess extends DiscreteVSAccess {
    get endX(): number;
    get endY(): number;
    get endZ(): number;
    get parent(): DiscreteVoxelShape;
    get startX(): number;
    get startY(): number;
    get startZ(): number;
  }


  class VoxelShapeAccess {
    get faces(): VoxelShape[];
    get shape(): DiscreteVoxelShape;
    set faces(var1: VoxelShape[]);
    set shape(var1: DiscreteVoxelShape);
  }

}

declare module 'malte0811.ferritecore.mixin.blockstatecache' {
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { BlockStateCacheAccess } from 'malte0811.ferritecore.ducks';
  import { VoxelShape } from 'net.minecraft.world.phys.shapes';
  import { FerriteMixinConfig } from 'malte0811.ferritecore.mixin.config';

  class BlockStateBaseMixin {
    cacheStateHead(ci: CallbackInfo): void;
    cacheStateTail(ci: CallbackInfo): void;
  }


  interface BlockStateCacheMixin extends BlockStateCacheAccess {}
  class BlockStateCacheMixin extends BlockStateCacheAccess {
    get collisionShape(): VoxelShape;
    get faceSturdy(): boolean[];
    get occlusionShapes(): VoxelShape[];
    set collisionShape(newShape: VoxelShape);
    set faceSturdy(newFaceSturdyArray: boolean[]);
    set occlusionShapes(newShapes: VoxelShape[]);
  }


  interface Config extends FerriteMixinConfig {}
  class Config extends FerriteMixinConfig {
    constructor();
  }

}

declare module 'malte0811.ferritecore.mixin.config' {
  import { Option } from 'malte0811.ferritecore.mixin.config.FerriteConfig';
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { Set, List } from 'java.util';
  import { ClassNode } from 'org.objectweb.asm.tree';
  import { OverrideCallback } from 'malte0811.ferritecore.mixin.config.IPlatformConfigHooks';

  class FerriteConfig {
    static readonly NEIGHBOR_LOOKUP: Option;
    static readonly PROPERTY_MAP: Option;
    static readonly PREDICATES: Option;
    static readonly MRL_CACHE: Option;
    static readonly DEDUP_MULTIPART: Option;
    static readonly DEDUP_BLOCKSTATE_CACHE: Option;
    static readonly DEDUP_QUADS: Option;
    static readonly COMPACT_FAST_MAP: Option;
    static readonly POPULATE_NEIGHBOR_TABLE: Option;
    static readonly THREADING_DETECTOR: Option;
    static readonly MODEL_SIDES: Option;
    static readonly DATACOMPONENTS: Option;
  }


  interface FerriteMixinConfig extends IMixinConfigPlugin {}
  class FerriteMixinConfig extends IMixinConfigPlugin {
    acceptTargets(myTargets: Set<string>, otherTargets: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    onLoad(mixinPackage: string): void;
    postApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    preApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    shouldApplyMixin(targetClassName: string, mixinClassName: string): boolean;
  }


  class IPlatformConfigHooks {
    collectDisabledOverrides(var1: OverrideCallback): void;
    static loadHooks(): IPlatformConfigHooks;
    readAndUpdateConfig(var1: Option[]): void;
  }

}

declare module 'malte0811.ferritecore.mixin.config.FerriteConfig' {
  import { Predicate } from 'java.util.function';

  class ConfigBuilder {
    createOptInOption(name: string, comment: string, ...dependencies: Option[]): Option;
    createOption(name: string, comment: string, ...dependencies: Option[]): Option;
  }


  class Option {
    constructor(name: string, comment: string, defaultValue: boolean, ...dependencies: Option[]);
    get comment(): string;
    get defaultValue(): boolean;
    get name(): string;
    isEnabled(): boolean;
    set(isEnabled: Predicate<string>): void;
  }

}

declare module 'malte0811.ferritecore.mixin.config.IPlatformConfigHooks' {
  class OverrideCallback {
    addOverride(var1: string, var2: string): void;
  }

}

declare module 'malte0811.ferritecore.mixin.datacomponents' {
  import { FerriteMixinConfig } from 'malte0811.ferritecore.mixin.config';

  interface Config extends FerriteMixinConfig {}
  class Config extends FerriteMixinConfig {
    constructor();
  }


  class PatchedDataComponentMapMixin {
  }

}

declare module 'malte0811.ferritecore.mixin.dedupbakedquad' {
  import { FerriteMixinConfig } from 'malte0811.ferritecore.mixin.config';
  import { BakedQuad } from 'net.minecraft.client.renderer.block.model';
  import { CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Builder } from 'SimpleBakedModel';
  import { Direction } from 'net.minecraft.core';

  interface Config extends FerriteMixinConfig {}
  class Config extends FerriteMixinConfig {
    constructor();
  }


  class SimpleModelBuilderMixin {
    deduplicate(quad: BakedQuad, cir: CallbackInfoReturnable<Builder>): void;
    deduplicate(direction: Direction, quad: BakedQuad, cir: CallbackInfoReturnable<Builder>): void;
  }

}

declare module 'malte0811.ferritecore.mixin.dedupmultipart' {
  import { FerriteMixinConfig } from 'malte0811.ferritecore.mixin.config';
  import { MultiPartBakedModel } from 'net.minecraft.client.resources.model';
  import { List, Map } from 'java.util';
  import { Pair } from 'org.apache.commons.lang3.tuple';

  interface Config extends FerriteMixinConfig {}
  class Config extends FerriteMixinConfig {
    constructor();
  }


  class MixinMultipartBuilder {
    build(selectors: Pair<Predicate<BlockState>[]): MultiPartBakedModel;
  }


  class MixinMultipartModel {
    redirectCacheGet<K, V>(map: Map<K, V>, key: K): V;
    redirectCachePut<K, V>(map: Map<K, V>, key: K, value: V): V;
  }

}

declare module 'malte0811.ferritecore.mixin.fastmap' {
  import { FerriteMixinConfig } from 'malte0811.ferritecore.mixin.config';
  import { FastMapStateHolder } from 'malte0811.ferritecore.ducks';
  import { Table } from 'com.google.common.collect';
  import { Map } from 'java.util';
  import { Comparable } from 'java.lang';
  import { FastMap } from 'malte0811.ferritecore.fastmap';
  import { Reference2ObjectMap } from 'it.unimi.dsi.fastutil.objects';
  import { Property } from 'net.minecraft.world.level.block.state.properties';

  interface Config extends FerriteMixinConfig {}
  class Config extends FerriteMixinConfig {
    constructor();
  }


  interface FastMapStateHolderMixin<O = any, S = any> extends FastMapStateHolder<S> {}
  class FastMapStateHolderMixin<O = any, S = any> extends FastMapStateHolder<S> {
    get neighborTable(): Table<Property<any>, Comparable<any>, S>;
    get stateIndex(): number;
    get stateMap(): FastMap<S>;
    get vanillaPropertyMap(): Reference2ObjectMap<Property<any>, Comparable<any>>;
    getNeighborFromFastMap(ignore: Table<any, any, any>, rowKey: any, columnKey: any): any;
    populateNeighbours(states: Map<Map<Property<any>, Comparable<any>>, S>): void;
    replacePropertyMap(newMap: Reference2ObjectMap<Property<any>, Comparable<any>>): void;
    set neighborTable(table: Table<Property<any>, Comparable<any>, S>);
    set stateIndex(newValue: number);
    set stateMap(newValue: FastMap<S>);
  }

}

declare module 'malte0811.ferritecore.mixin.modelsides' {
  import { FerriteMixinConfig } from 'malte0811.ferritecore.mixin.config';

  interface Config extends FerriteMixinConfig {}
  class Config extends FerriteMixinConfig {
    constructor();
  }


  class SimpleBakedModelMixin {
  }

}

declare module 'malte0811.ferritecore.mixin.mrl' {
  import { FerriteMixinConfig } from 'malte0811.ferritecore.mixin.config';

  interface Config extends FerriteMixinConfig {}
  class Config extends FerriteMixinConfig {
    constructor();
  }


  class ModelResourceLocationMixin {
  }

}

declare module 'malte0811.ferritecore.mixin.platform' {
  import { IPlatformConfigHooks } from 'malte0811.ferritecore.mixin.config';
  import { List } from 'java.util';
  import { Option } from 'malte0811.ferritecore.mixin.config.FerriteConfig';
  import { OverrideCallback } from 'malte0811.ferritecore.mixin.config.IPlatformConfigHooks';

  interface ConfigFileHandler extends IPlatformConfigHooks {}
  class ConfigFileHandler extends IPlatformConfigHooks {
    collectDisabledOverrides(disableOption: OverrideCallback): void;
    readAndUpdateConfig(options: Option[]): void;
  }

}

declare module 'malte0811.ferritecore.mixin.predicates' {
  import { Predicate } from 'java.util.function';
  import { BlockState, StateDefinition } from 'net.minecraft.world.level.block.state';
  import { Block } from 'net.minecraft.world.level.block';
  import { FerriteMixinConfig } from 'malte0811.ferritecore.mixin.config';

  class AndConditionMixin {
    getPredicate(stateContainer: StateDefinition<Block, BlockState>): Predicate<BlockState>;
  }


  interface Config extends FerriteMixinConfig {}
  class Config extends FerriteMixinConfig {
    constructor();
  }


  class KeyValueConditionMixin {
    getPredicate(stateContainer: StateDefinition<Block, BlockState>): Predicate<BlockState>;
  }


  class OrConditionMixin {
    getPredicate(stateContainer: StateDefinition<Block, BlockState>): Predicate<BlockState>;
  }

}

declare module 'malte0811.ferritecore.mixin.threaddetec' {
  import { FerriteMixinConfig } from 'malte0811.ferritecore.mixin.config';
  import { SmallThreadDetectable } from 'malte0811.ferritecore.ducks';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  interface Config extends FerriteMixinConfig {}
  class Config extends FerriteMixinConfig {
    constructor();
  }


  interface PalettedContainerMixin extends SmallThreadDetectable {}
  class PalettedContainerMixin extends SmallThreadDetectable {
    acquire(): void;
    ferritecore$getState(): number;
    ferritecore$setState(newState: number): void;
    redirectBuildThreadingDetector(ci: CallbackInfo): void;
    release(): void;
  }

}

declare module 'malte0811.ferritecore.util' {
  import { IPlatformHooks } from 'malte0811.ferritecore';
  import { SmallThreadDetectable } from 'malte0811.ferritecore.ducks';

  class Constants {
    static readonly MODID: string;
    static readonly PLATFORM_HOOKS: IPlatformHooks;
    static readonly DISABLED_OVERRIDES_KEY: string;
  }


  class SmallThreadingDetector {
    static acquire(obj: SmallThreadDetectable, name: string): void;
    static release(obj: SmallThreadDetectable): void;
  }

}