declare module 'earth.terrarium.athena.api.client.models' {
  import { List, Map } from 'java.util';
  import { AppearanceAndTintGetter } from 'earth.terrarium.athena.api.client.utils';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { Int2ObjectMap } from 'it.unimi.dsi.fastutil.ints';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { Function, Supplier } from 'java.util.function';
  import { Material, UnbakedModel, BakedModel, ModelBaker, ModelState } from 'net.minecraft.client.resources.model';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { JsonObject } from 'com.google.gson';

  class AthenaBlockModel {
    get renderType(): RenderType;
    getDefaultQuads(direction: Direction): Map<Direction, AthenaQuad[]>;
    getQuads(var1: AppearanceAndTintGetter, var2: BlockState, var3: BlockPos, var4: Direction): AthenaQuad[];
    getTextures(var1: Function<Material, TextureAtlasSprite>): Int2ObjectMap<TextureAtlasSprite>;
  }


  class AthenaModelFactory {
    create(var1: JsonObject): Supplier<AthenaBlockModel>;
  }


  interface NotNullUnbakedModel extends UnbakedModel {}
  class NotNullUnbakedModel extends UnbakedModel {
    bake(var1: ModelBaker, var2: Function<Material, TextureAtlasSprite>, var3: ModelState): BakedModel;
  }

}

declare module 'earth.terrarium.athena.api.client.neoforge' {
  import { IDynamicBakedModel } from 'net.neoforged.neoforge.client.model';
  import { ModelProperty, ModelData } from 'net.neoforged.neoforge.client.model.data';
  import { AthenaBlockModel, AthenaQuad, NotNullUnbakedModel } from 'earth.terrarium.athena.api.client.models';
  import { Function, Supplier } from 'java.util.function';
  import { Material, UnbakedModel, BakedModel, ModelBaker, ModelState } from 'net.minecraft.client.resources.model';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { List, Collection } from 'java.util';
  import { BakedQuad, ItemOverrides, BlockElementFace } from 'net.minecraft.client.renderer.block.model';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Direction, BlockPos } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { BlockAndTintGetter } from 'net.minecraft.world.level';
  import { ChunkRenderTypeSet } from 'net.neoforged.neoforge.client';
  import { Vector3f } from 'org.joml';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface AthenaBakedModel extends IDynamicBakedModel {}
  class AthenaBakedModel extends IDynamicBakedModel {
    static readonly DATA: ModelProperty;
    constructor(model: AthenaBlockModel, functionParameter: Function<Material, TextureAtlasSprite>);
    get overrides(): ItemOverrides;
    get particleIcon(): TextureAtlasSprite;
    getModelData(level: BlockAndTintGetter, pos: BlockPos, state: BlockState, data: ModelData): ModelData;
    getQuads(state: BlockState, direction: Direction, random: RandomSource, data: ModelData, type: RenderType): BakedQuad[];
    getRenderTypes(state: BlockState, rand: RandomSource, data: ModelData): ChunkRenderTypeSet;
    isCustomRenderer(): boolean;
    isGui3d(): boolean;
    useAmbientOcclusion(): boolean;
    usesBlockLight(): boolean;
  }


  class AthenaBlockElementFace {
    static of(quad: AthenaQuad, direction: Direction, start: Vector3f, end: Vector3f): BlockElementFace;
  }


  interface AthenaUnbakedModel extends NotNullUnbakedModel {}
  class AthenaUnbakedModel extends NotNullUnbakedModel {
    constructor(model: Supplier<AthenaBlockModel>);
    bake(modelBaker: ModelBaker, functionParameter: Function<Material, TextureAtlasSprite>, modelState: ModelState): BakedModel;
    get dependencies(): Collection<ResourceLocation>;
    resolveParents(functionParameter: Function<ResourceLocation, UnbakedModel>): void;
  }


  class ForgeAthenaUtils {
    static bakeQuad(quad: AthenaQuad, direction: Direction, sprite: TextureAtlasSprite): BakedQuad[];
  }

}

declare module 'earth.terrarium.athena.api.client.utils' {
  import { BlockAndTintGetter } from 'net.minecraft.world.level';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { Query } from 'earth.terrarium.athena.api.client.utils.AppearanceAndTintGetter';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { AthenaModelFactory, AthenaBlockModel, NotNullUnbakedModel } from 'earth.terrarium.athena.api.client.models';
  import { Function, Supplier, BiPredicate } from 'java.util.function';
  import { ModelResourceLocation, Material } from 'net.minecraft.client.resources.model';
  import { JsonObject } from 'com.google.gson';
  import { Logger } from 'org.slf4j';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { AxisDirection, Axis } from 'Direction';
  import { Pair } from 'com.mojang.datafixers.util';
  import { UrMom } from 'earth.terrarium.athena.api.client.utils.AthenaUtils';
  import { Int2ObjectMap } from 'it.unimi.dsi.fastutil.ints';
  import { Rotation } from 'net.minecraft.world.level.block';
  import { ConnectionCheck } from 'earth.terrarium.athena.api.client.utils.CtmState';
  import { Map, Set, Collection } from 'java.util';
  import { Class } from 'java.lang';
  import { Entry } from 'Map';

  interface AppearanceAndTintGetter extends BlockAndTintGetter {}
  class AppearanceAndTintGetter extends BlockAndTintGetter {
    getAppearance(var1: BlockState, var2: BlockPos, var3: Direction, var4: BlockState, var5: BlockPos): BlockState;
    getAppearance(var1: BlockPos, var2: Direction): BlockState;
    getAppearance(var1: BlockPos, var2: Direction, var3: BlockState, var4: BlockPos): BlockState;
    query(var1: BlockPos, var2: Direction, var3: BlockState, var4: BlockPos): Query;
  }


  class AthenaUnbakedModelLoader {
    constructor(id: ResourceLocation, factory: AthenaModelFactory, loader: Function<Supplier<AthenaBlockModel>, NotNullUnbakedModel>);
    loadModel(modelId: ModelResourceLocation): NotNullUnbakedModel;
    loadModel(json: JsonObject): NotNullUnbakedModel;
  }


  class AthenaUtils {
    static readonly LOGGER: Logger;
    static asBool(axisDir: AxisDirection): boolean;
    static getFacingPos(pos: BlockPos, facing: Direction, urMom: UrMom): BlockPos;
    static getFromDir(state: BlockState, direction: Direction): boolean;
    static getMinMax(axis: Axis): Pair<Direction, Direction>;
    static renderTypeFromJson(object: JsonObject): RenderType;
    static ternary<T>(axisDir: AxisDirection, first: T, second: T): T;
  }


  class CtmUtils {
    static blockMat(id: string): Material;
    static check(level: AppearanceAndTintGetter, state: BlockState, pos: BlockPos, direction: Direction, predicate: BiPredicate<BlockState, BlockState>): ConnectionCheck;
    static checkRelative(level: AppearanceAndTintGetter, state: BlockState, pos: BlockPos, direction: Direction): boolean;
    static getPillarRotation(axis: Axis, direction: Direction): Rotation;
    static getTexture(first: boolean, second: boolean, firstSecond: boolean): number;
    static parseCondition(json: JsonObject): BiPredicate<BlockState, BlockState>;
    static parseCtmMaterials(json: JsonObject): Int2ObjectMap<Material>;
    static tryParse<I, O>(input: I, parser: Function<I, O>): O;
  }


  interface NullableEnumMap<K extends Enum<K> = any, V = any> extends Map<K, V> {}
  class NullableEnumMap<K extends Enum<K> = any, V = any> extends Map<K, V> {
    constructor(enumClass: Class<K>);
    clear(): void;
    containsKey(key: any): boolean;
    containsValue(value: any): boolean;
    entrySet(): Set<Entry<K, V>>;
    equals(o: any): boolean;
    get(key: any): V;
    hashCode(): number;
    isEmpty(): boolean;
    keySet(): Set<K>;
    put(key: K, value: V): V;
    putAll(m: Map<K, V>): void;
    remove(key: any): V;
    size(): number;
    values(): Collection<V>;
  }

}

declare module 'earth.terrarium.athena.api.client.utils.AthenaUtils' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface UrMom extends Enum<UrMom> {}
  class UrMom extends Enum<UrMom> {
    static readonly UP: UrMom;
    static readonly DOWN: UrMom;
    static readonly LEFT: UrMom;
    static readonly RIGHT: UrMom;
    static valueOf(name: string): UrMom;
    static values(): UrMom[];
  }

}

declare module 'earth.terrarium.athena.api.client.utils.CtmState' {
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { AppearanceAndTintGetter } from 'earth.terrarium.athena.api.client.utils';

  class ConnectionCheck {
    test(var1: BlockPos, var2: BlockState, var3: BlockState): boolean;
    static test(check: ConnectionCheck, level: AppearanceAndTintGetter, fromState: BlockState, fromPos: BlockPos, pos: BlockPos, direction: Direction): boolean;
  }

}

declare module 'earth.terrarium.athena.impl.client' {
  class DefaultModels {
    static readonly MODID: string;
    static init(): void;
  }

}

declare module 'earth.terrarium.athena.impl.client.models' {
  import { AthenaBlockModel, AthenaModelFactory, AthenaQuad } from 'earth.terrarium.athena.api.client.models';
  import { ConnectedTextureMap } from 'earth.terrarium.athena.impl.client.models.ctm';
  import { BiPredicate, Function } from 'java.util.function';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { List, Map } from 'java.util';
  import { AppearanceAndTintGetter } from 'earth.terrarium.athena.api.client.utils';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { Int2ObjectMap } from 'it.unimi.dsi.fastutil.ints';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { Material } from 'net.minecraft.client.resources.model';

  interface ConnectedBlockModel extends AthenaBlockModel {}
  class ConnectedBlockModel extends AthenaBlockModel {
    static readonly FACTORY: AthenaModelFactory;
    constructor(materials: ConnectedTextureMap, connectTo: BiPredicate<BlockState, BlockState>);

    constructor(materials: ConnectedTextureMap, connectTo: BiPredicate<BlockState, BlockState>, renderType: RenderType);
    get renderType(): RenderType;
    getDefaultQuads(direction: Direction): Map<Direction, AthenaQuad[]>;
    getQuads(level: AppearanceAndTintGetter, state: BlockState, pos: BlockPos, direction: Direction): AthenaQuad[];
    getTextures(getter: Function<Material, TextureAtlasSprite>): Int2ObjectMap<TextureAtlasSprite>;
  }


  interface ConnectedCarpetBlockModel extends AthenaBlockModel {}
  class ConnectedCarpetBlockModel extends AthenaBlockModel {
    static readonly FACTORY: AthenaModelFactory;
    constructor(materials: Int2ObjectMap<Material>, connectTo: BiPredicate<BlockState, BlockState>);
    getDefaultQuads(direction: Direction): Map<Direction, AthenaQuad[]>;
    getQuads(level: AppearanceAndTintGetter, blockState: BlockState, pos: BlockPos, direction: Direction): AthenaQuad[];
    getTextures(getter: Function<Material, TextureAtlasSprite>): Int2ObjectMap<TextureAtlasSprite>;
  }


  interface GiantBlockModel extends AthenaBlockModel {}
  class GiantBlockModel extends AthenaBlockModel {
    static readonly FACTORY: AthenaModelFactory;
    constructor(materials: Int2ObjectMap<Material>, width: number, height: number);
    getDefaultQuads(direction: Direction): Map<Direction, AthenaQuad[]>;
    getQuads(level: AppearanceAndTintGetter, blockState: BlockState, pos: BlockPos, direction: Direction): AthenaQuad[];
    getTextures(getter: Function<Material, TextureAtlasSprite>): Int2ObjectMap<TextureAtlasSprite>;
  }


  interface LimitedPillarBlockModel extends AthenaBlockModel {}
  class LimitedPillarBlockModel extends AthenaBlockModel {
    static readonly FACTORY: AthenaModelFactory;
    constructor(materials: Int2ObjectMap<Material>);
    getDefaultQuads(direction: Direction): Map<Direction, AthenaQuad[]>;
    getQuads(level: AppearanceAndTintGetter, state: BlockState, pos: BlockPos, direction: Direction): AthenaQuad[];
    getTextures(getter: Function<Material, TextureAtlasSprite>): Int2ObjectMap<TextureAtlasSprite>;
  }


  interface PaneConnectedBlockModel extends AthenaBlockModel {}
  class PaneConnectedBlockModel extends AthenaBlockModel {
    static readonly FACTORY: AthenaModelFactory;
    constructor(materials: Int2ObjectMap<Material>);
    getQuads(level: AppearanceAndTintGetter, state: BlockState, pos: BlockPos, direction: Direction): AthenaQuad[];
    getTextures(getter: Function<Material, TextureAtlasSprite>): Int2ObjectMap<TextureAtlasSprite>;
  }


  interface PanePillarBlockModel extends AthenaBlockModel {}
  class PanePillarBlockModel extends AthenaBlockModel {
    static readonly FACTORY: AthenaModelFactory;
    constructor(materials: Int2ObjectMap<Material>);
    getQuads(level: AppearanceAndTintGetter, state: BlockState, pos: BlockPos, direction: Direction): AthenaQuad[];
    getTextures(getter: Function<Material, TextureAtlasSprite>): Int2ObjectMap<TextureAtlasSprite>;
  }


  interface PillarBlockModel extends AthenaBlockModel {}
  class PillarBlockModel extends AthenaBlockModel {
    static readonly FACTORY: AthenaModelFactory;
    constructor(materials: Int2ObjectMap<Material>);
    getDefaultQuads(direction: Direction): Map<Direction, AthenaQuad[]>;
    getQuads(level: AppearanceAndTintGetter, state: BlockState, pos: BlockPos, direction: Direction): AthenaQuad[];
    getTextures(getter: Function<Material, TextureAtlasSprite>): Int2ObjectMap<TextureAtlasSprite>;
  }

}

declare module 'earth.terrarium.athena.impl.client.models.ctm' {
  import { Direction } from 'net.minecraft.core';
  import { Int2ObjectMap } from 'it.unimi.dsi.fastutil.ints';
  import { Material } from 'net.minecraft.client.resources.model';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { Function } from 'java.util.function';

  class ConnectedTextureMap {
    getTexture(direction: Direction, index: number): number;
    getTextures(getter: Function<Material, TextureAtlasSprite>): Int2ObjectMap<TextureAtlasSprite>;
    put(direction: Direction, map: Int2ObjectMap<Material>): void;
    put(direction: Direction, material: Material): void;
  }

}

declare module 'earth.terrarium.athena.impl.loading' {
  import { SimpleJsonResourceReloadListener } from 'net.minecraft.server.packs.resources';
  import { Function } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List } from 'java.util';
  import { LoadedJson } from 'BlockStateModelLoader';
  import { JsonObject } from 'com.google.gson';

  interface AthenaResourceLoader extends SimpleJsonResourceReloadListener {}
  class AthenaResourceLoader extends SimpleJsonResourceReloadListener {
    static readonly INSTANCE: AthenaResourceLoader;
    constructor();
    static getData(modelType: ResourceLocation, modelId: ResourceLocation): JsonObject;
    setGetter(getter: Function<ResourceLocation, LoadedJson[]>): void;
  }

}

declare module 'earth.terrarium.athena.mixins' {
  class ModelBakeryMixin {
  }

}

declare module 'earth.terrarium.athena.mixins.neoforge' {
  class ModelBakeryMixin {
  }

}

declare module 'earth.terrarium.athena.neoforge' {
  import { IEventBus } from 'net.neoforged.bus.api';

  class AthenaNeoForge {
    constructor(modEventBus: IEventBus);
  }

}

declare module 'earth.terrarium.athena.neoforge.client' {
  import { IGeometryLoader } from 'net.neoforged.neoforge.client.model.geometry';
  import { Unbaked } from 'earth.terrarium.athena.neoforge.client.AthenaGeometryLoader';
  import { JsonObject, JsonDeserializationContext } from 'com.google.gson';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { RegisterGeometryLoaders } from 'ModelEvent';
  import { RegisterClientReloadListenersEvent } from 'net.neoforged.neoforge.client.event';

  interface AthenaGeometryLoader extends IGeometryLoader<Unbaked> {}
  class AthenaGeometryLoader extends IGeometryLoader<Unbaked> {
    read(json: JsonObject, context: JsonDeserializationContext): Unbaked;
  }


  class AthenaNeoForgeClient {
    static init(mobEventBus: IEventBus): void;
    static onRegisterGeometryLoaders(event: RegisterGeometryLoaders): void;
    static registerReloadListener(event: RegisterClientReloadListenersEvent): void;
  }

}