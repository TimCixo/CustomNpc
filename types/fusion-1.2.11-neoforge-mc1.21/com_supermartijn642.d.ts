declare module 'com.supermartijn642.fusion.api.model.data' {
  import { BlockModel } from 'net.minecraft.client.renderer.block.model';
  import { List, Map } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ConnectionPredicate } from 'com.supermartijn642.fusion.api.predicate';

  class BaseModelData {
    static builder(): BaseModelDataBuilder<any, BaseModelData>;
    get parents(): ResourceLocation[];
    get vanillaModel(): BlockModel;
  }


  interface BaseModelDataBuilder<T extends BaseModelDataBuilder<T, S> = any, S = any> extends VanillaModelDataBuilder<T, S> {}
  class BaseModelDataBuilder<T extends BaseModelDataBuilder<T, S> = any, S = any> extends VanillaModelDataBuilder<T, S> {
    static builder(): BaseModelDataBuilder<any, BaseModelData>;
    parent(var1: ResourceLocation): T;
    parents(...var1: ResourceLocation[]): T;
  }


  interface ConnectingModelData extends BaseModelData {}
  class ConnectingModelData extends BaseModelData {
    static builder(): ConnectingModelDataBuilder;
    get allConnectionPredicates(): Map<string, ConnectionPredicate>;
    get defaultConnectionPredicate(): ConnectionPredicate;
    getConnectionPredicate(var1: string): ConnectionPredicate;
  }


  interface ConnectingModelDataBuilder extends BaseModelDataBuilder<ConnectingModelDataBuilder, ConnectingModelData> {}
  class ConnectingModelDataBuilder extends BaseModelDataBuilder<ConnectingModelDataBuilder, ConnectingModelData> {
    static builder(): ConnectingModelDataBuilder;
    connection(var1: ConnectionPredicate): ConnectingModelDataBuilder;
    connection(var1: string, var2: ConnectionPredicate): ConnectingModelDataBuilder;
  }


  class VanillaModelDataBuilder<T extends VanillaModelDataBuilder<T, S> = any, S = any> {
    build(): S;
    static builder(): VanillaModelDataBuilder<any, BlockModel>;
    parent(var1: ResourceLocation): T;
    texture(var1: string, var2: string): T;
    texture(var1: string, var2: ResourceLocation): T;
  }

}

declare module 'com.supermartijn642.fusion.api.model' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { JsonObject } from 'com.google.gson';
  import { ModelBaker, ModelState, BakedModel, Material } from 'net.minecraft.client.resources.model';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { Collection, List } from 'java.util';
  import { BlockModel } from 'net.minecraft.client.renderer.block.model';
  import { Serializer } from 'com.supermartijn642.fusion.api.util';

  class DefaultModelTypes {
    static readonly VANILLA: ModelType;
    static readonly UNKNOWN: ModelType;
    static readonly BASE: ModelType;
    static readonly CONNECTING: ModelType;
  }


  class FusionModelTypeRegistry {
    static registerModelType(identifier: ResourceLocation, modelType: ModelType<any>): void;
    static serializeModelData(model: ModelInstance<any>): JsonObject;
  }


  class GatherTexturesContext {
    getModel(var1: ResourceLocation): ModelInstance<any>;
  }


  class ModelBakingContext {
    get modelBaker(): ModelBaker;
    get modelIdentifier(): ResourceLocation;
    get transformation(): ModelState;
    getBlockTexture(texture: ResourceLocation): TextureAtlasSprite;
    getModel(var1: ResourceLocation): ModelInstance<any>;
    getTexture(var1: SpriteIdentifier): TextureAtlasSprite;
    getTexture(atlas: ResourceLocation, texture: ResourceLocation): TextureAtlasSprite;
  }


  class ModelInstance<T = any> {
    bake(var1: ModelBakingContext): BakedModel;
    get asVanillaModel(): BlockModel;
    get modelData(): T;
    get modelDependencies(): Collection<ResourceLocation>;
    get modelType(): ModelType<T>;
    get parentModels(): ResourceLocation[];
    static of<T>(modelType: ModelType<T>, modelData: T): ModelInstance<T>;
  }


  interface ModelType<T = any> extends Serializer<T> {}
  class ModelType<T = any> extends Serializer<T> {
    bake(var1: ModelBakingContext, var2: T): BakedModel;
    getAsVanillaModel(data: T): BlockModel;
    getModelDependencies(var1: T): Collection<ResourceLocation>;
    getParentModels(data: T): ResourceLocation[];
  }


  class SpriteIdentifier {
    get atlas(): ResourceLocation;
    get texture(): ResourceLocation;
    static missing(): SpriteIdentifier;
    static of(atlas: ResourceLocation, texture: ResourceLocation): SpriteIdentifier;
    static of(material: Material): SpriteIdentifier;
    toMaterial(): Material;
  }

}

declare module 'com.supermartijn642.fusion.api.model.modifier.item' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Potion } from 'net.minecraft.world.item.alchemy';
  import { Holder } from 'net.minecraft.core';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Serializer } from 'com.supermartijn642.fusion.api.util';

  class DefaultItemPredicates {
    static and(...predicates: ItemPredicate[]): ItemPredicate;
    static count(count: number): ItemPredicate;
    static count(min: number, max: number): ItemPredicate;
    static count(min: number, maxPercentage: number): ItemPredicate;
    static count(minPercentage: number, max: number): ItemPredicate;
    static count(minPercentage: number, maxPercentage: number): ItemPredicate;
    static durability(min: number, max: number): ItemPredicate;
    static durability(min: number, maxPercentage: number): ItemPredicate;
    static durability(minPercentage: number, max: number): ItemPredicate;
    static durability(minPercentage: number, maxPercentage: number): ItemPredicate;
    static enchantment(enchantment: ResourceLocation): ItemPredicate;
    static enchantment(enchantment: ResourceLocation, level: number): ItemPredicate;
    static enchantment(enchantment: ResourceLocation, minLevel: number, maxLevel: number): ItemPredicate;
    static not(predicate: ItemPredicate): ItemPredicate;
    static or(...predicates: ItemPredicate[]): ItemPredicate;
    static potion(potion: Potion): ItemPredicate;
    static potion(potion: Holder<Potion>): ItemPredicate;
  }


  class ItemPredicate {
    and(...predicates: ItemPredicate[]): ItemPredicate;
    get serializer(): Serializer<ItemPredicate>;
    negate(): ItemPredicate;
    or(...predicates: ItemPredicate[]): ItemPredicate;
    test(var1: ItemStack): boolean;
  }

}

declare module 'com.supermartijn642.fusion.api.predicate' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { Direction, BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockGetter } from 'net.minecraft.world.level';
  import { Serializer, Pair } from 'com.supermartijn642.fusion.api.util';
  import { Block } from 'net.minecraft.world.level.block';
  import { Property } from 'net.minecraft.world.level.block.state.properties';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { JsonObject } from 'com.google.gson';

  interface ConnectionDirection extends Enum<ConnectionDirection> {}
  class ConnectionDirection extends Enum<ConnectionDirection> {
    static readonly TOP: ConnectionDirection;
    static readonly TOP_RIGHT: ConnectionDirection;
    static readonly RIGHT: ConnectionDirection;
    static readonly BOTTOM_RIGHT: ConnectionDirection;
    static readonly BOTTOM: ConnectionDirection;
    static readonly BOTTOM_LEFT: ConnectionDirection;
    static readonly LEFT: ConnectionDirection;
    static readonly TOP_LEFT: ConnectionDirection;
    static valueOf(name: string): ConnectionDirection;
    static values(): ConnectionDirection[];
  }


  class ConnectionPredicate {
    and(...predicates: ConnectionPredicate[]): ConnectionPredicate;
    get serializer(): Serializer<ConnectionPredicate>;
    isSensitive(): boolean;
    negate(): ConnectionPredicate;
    or(...predicates: ConnectionPredicate[]): ConnectionPredicate;
    shouldConnect(var1: Direction, var2: BlockState, var3: BlockState, var4: BlockState, var5: ConnectionDirection): boolean;
    shouldConnect(level: BlockGetter, pos: BlockPos, side: Direction, ownState: BlockState, otherState: BlockState, blockInFront: BlockState, direction: ConnectionDirection): boolean;
  }


  class DefaultConnectionPredicates {
    static and(...predicates: ConnectionPredicate[]): ConnectionPredicate;
    static isDirection(...directions: ConnectionDirection[]): ConnectionPredicate;
    static isFaceVisible(): ConnectionPredicate;
    static isSameBlock(): ConnectionPredicate;
    static isSameState(): ConnectionPredicate;
    static matchBlock(block: Block): ConnectionPredicate;
    static matchBlockInFront(block: Block): ConnectionPredicate;
    static matchState(block: Block, ...properties: Pair<Property<any>, any>[]): ConnectionPredicate;
    static matchState(state: BlockState): ConnectionPredicate;
    static matchStateInFront(block: Block, ...properties: Pair<Property<any>, any>[]): ConnectionPredicate;
    static matchStateInFront(state: BlockState): ConnectionPredicate;
    static not(predicate: ConnectionPredicate): ConnectionPredicate;
    static or(...predicates: ConnectionPredicate[]): ConnectionPredicate;
  }


  class FusionPredicateRegistry {
    static deserializeConnectionPredicate(json: JsonObject): ConnectionPredicate;
    static registerConnectionPredicate(identifier: ResourceLocation, serializer: Serializer<ConnectionPredicate>): void;
    static serializeConnectionPredicate(predicate: ConnectionPredicate): JsonObject;
  }


  interface SensitiveConnectionPredicate extends ConnectionPredicate {}
  class SensitiveConnectionPredicate extends ConnectionPredicate {
    isSensitive(): boolean;
    shouldConnect(side: Direction, ownState: BlockState, otherState: BlockState, blockInFront: BlockState, direction: ConnectionDirection): boolean;
    shouldConnect(var1: BlockGetter, var2: BlockPos, var3: Direction, var4: BlockState, var5: BlockState, var6: BlockState, var7: ConnectionDirection): boolean;
  }

}

declare module 'com.supermartijn642.fusion.api.provider' {
  import { DataProvider, PackOutput, CachedOutput } from 'net.minecraft.data';
  import { CompletableFuture } from 'java.util.concurrent';
  import { ModifierBuilder } from 'com.supermartijn642.fusion.api.provider.FusionBlockModelModifierProvider';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ModifierBuilder as com_supermartijn642_fusion_api_provider_fusionitemmodelmodifierprovider_ModifierBuilder } from 'com.supermartijn642.fusion.api.provider.FusionItemModelModifierProvider';
  import { ExistingFileHelper } from 'net.neoforged.neoforge.common.data';
  import { ModelInstance } from 'com.supermartijn642.fusion.api.model';
  import { TextureType } from 'com.supermartijn642.fusion.api.texture';

  interface FusionBlockModelModifierProvider extends DataProvider {}
  class FusionBlockModelModifierProvider extends DataProvider {
    constructor(modid: string, output: PackOutput);
    get name(): string;
    modifier(location: ResourceLocation): ModifierBuilder;
    run(cache: CachedOutput): CompletableFuture<any>;
  }


  interface FusionItemModelModifierProvider extends DataProvider {}
  class FusionItemModelModifierProvider extends DataProvider {
    constructor(modid: string, output: PackOutput);
    get name(): string;
    modifier(location: ResourceLocation): com_supermartijn642_fusion_api_provider_fusionitemmodelmodifierprovider_ModifierBuilder;
    run(cache: CachedOutput): CompletableFuture<any>;
  }


  interface FusionModelProvider extends DataProvider {}
  class FusionModelProvider extends DataProvider {
    constructor(modid: string, output: PackOutput, existingFileHelper: ExistingFileHelper);

    constructor(modid: string, output: PackOutput);
    addModel(location: ResourceLocation, model: ModelInstance<any>): void;
    get name(): string;
    run(cache: CachedOutput): CompletableFuture<any>;
  }


  interface FusionTextureMetadataProvider extends DataProvider {}
  class FusionTextureMetadataProvider extends DataProvider {
    constructor(modid: string, output: PackOutput);
    addTextureMetadata<T>(location: ResourceLocation, textureType: TextureType<T>, data: T): void;
    get name(): string;
    run(cache: CachedOutput): CompletableFuture<any>;
  }

}

declare module 'com.supermartijn642.fusion.api.provider.FusionBlockModelModifierProvider' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Block } from 'net.minecraft.world.level.block';
  import { Map, Set } from 'java.util';
  import { Property } from 'net.minecraft.world.level.block.state.properties';
  import { Comparable } from 'java.lang';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  class ModifierBuilder {
    appendModel(location: ResourceLocation): ModifierBuilder;
    paneCullingFix(enabled: boolean): ModifierBuilder;
    target(block: ResourceLocation): ModifierBuilder;
    target(block: Block): ModifierBuilder;
    target(block: Block, properties: Map<Property<any>, Set<any>>): ModifierBuilder;
    target<T extends Comparable<T>>(block: Block, property: Property<T>, ...values: T[]): ModifierBuilder;
    target(state: BlockState): ModifierBuilder;
  }

}

declare module 'com.supermartijn642.fusion.api.provider.FusionItemModelModifierProvider' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Item } from 'net.minecraft.world.item';
  import { Block } from 'net.minecraft.world.level.block';
  import { ItemPredicate } from 'com.supermartijn642.fusion.api.model.modifier.item';

  class ModifierBuilder {
    conditionalModel(model: ResourceLocation, condition: ItemPredicate): ModifierBuilder;
    defaultModel(location: ResourceLocation): ModifierBuilder;
    target(item: ResourceLocation): ModifierBuilder;
    target(item: Item): ModifierBuilder;
    target(block: Block): ModifierBuilder;
  }

}

declare module 'com.supermartijn642.fusion.api.texture.data' {
  import { Builder, RenderType, QuadTinting } from 'com.supermartijn642.fusion.api.texture.data.BaseTextureData';
  import { Builder as com_supermartijn642_fusion_api_texture_data_connectingtexturedata_Builder } from 'com.supermartijn642.fusion.api.texture.data.ConnectingTextureData';
  import { Enum, Long } from 'java.lang';
  import { List } from 'java.util';
  import { Builder as com_supermartijn642_fusion_api_texture_data_continuoustexturedata_Builder } from 'com.supermartijn642.fusion.api.texture.data.ContinuousTextureData';
  import { Builder as com_supermartijn642_fusion_api_texture_data_randomtexturedata_Builder } from 'com.supermartijn642.fusion.api.texture.data.RandomTextureData';
  import { Builder as com_supermartijn642_fusion_api_texture_data_scrollingtexturedata_Builder, Position, LoopType } from 'com.supermartijn642.fusion.api.texture.data.ScrollingTextureData';

  class BaseTextureData {
    static builder(): Builder<any, BaseTextureData>;
    get renderType(): RenderType;
    get tinting(): QuadTinting;
    isEmissive(): boolean;
  }


  interface ConnectingTextureData extends BaseTextureData {}
  class ConnectingTextureData extends BaseTextureData {
    static builder(): com_supermartijn642_fusion_api_texture_data_connectingtexturedata_Builder;
    get layout(): ConnectingTextureLayout;
  }


  interface ConnectingTextureLayout extends Enum<ConnectingTextureLayout> {}
  class ConnectingTextureLayout extends Enum<ConnectingTextureLayout> {
    static readonly FULL: ConnectingTextureLayout;
    static readonly HORIZONTAL: ConnectingTextureLayout;
    static readonly SIMPLE: ConnectingTextureLayout;
    static readonly VERTICAL: ConnectingTextureLayout;
    static readonly COMPACT: ConnectingTextureLayout;
    static readonly PIECED: ConnectingTextureLayout;
    static readonly OVERLAY: ConnectingTextureLayout;
    static valueOf(name: string): ConnectingTextureLayout;
    static values(): ConnectingTextureLayout[];
  }


  interface ContinuousTextureData extends BaseTextureData {}
  class ContinuousTextureData extends BaseTextureData {
    static builder(): com_supermartijn642_fusion_api_texture_data_continuoustexturedata_Builder;
    get columns(): number;
    get rows(): number;
  }


  interface RandomTextureData extends BaseTextureData {}
  class RandomTextureData extends BaseTextureData {
    static builder(): com_supermartijn642_fusion_api_texture_data_randomtexturedata_Builder;
    get columns(): number;
    get count(): number;
    get rows(): number;
    get seed(): Long;
  }


  interface ScrollingTextureData extends BaseTextureData {}
  class ScrollingTextureData extends BaseTextureData {
    static builder(): com_supermartijn642_fusion_api_texture_data_scrollingtexturedata_Builder;
    get endPosition(): Position;
    get frameHeight(): number;
    get frameTime(): number;
    get frameWidth(): number;
    get loopPause(): number;
    get loopType(): LoopType;
    get startPosition(): Position;
  }

}

declare module 'com.supermartijn642.fusion.api.texture.data.BaseTextureData' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class Builder<T extends Builder<T, S> = any, S = any> {
    build(): S;
    emissive(var1: boolean): T;
    renderType(var1: RenderType): T;
    tinting(var1: QuadTinting): T;
  }


  interface QuadTinting extends Enum<QuadTinting> {}
  class QuadTinting extends Enum<QuadTinting> {
    static readonly BIOME_GRASS: QuadTinting;
    static readonly BIOME_FOLIAGE: QuadTinting;
    static readonly BIOME_WATER: QuadTinting;
    static valueOf(name: string): QuadTinting;
    static values(): QuadTinting[];
  }


  interface RenderType extends Enum<RenderType> {}
  class RenderType extends Enum<RenderType> {
    static readonly OPAQUE: RenderType;
    static readonly CUTOUT: RenderType;
    static readonly TRANSLUCENT: RenderType;
    static valueOf(name: string): RenderType;
    static values(): RenderType[];
  }

}

declare module 'com.supermartijn642.fusion.api.texture.data.ConnectingTextureData' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { Builder as com_supermartijn642_fusion_api_texture_data_basetexturedata_Builder } from 'com.supermartijn642.fusion.api.texture.data.BaseTextureData';
  import { ConnectingTextureData, ConnectingTextureLayout } from 'com.supermartijn642.fusion.api.texture.data';

  interface RenderType extends Enum<RenderType> {}
  class RenderType extends Enum<RenderType> {
    static readonly OPAQUE: RenderType;
    static readonly CUTOUT: RenderType;
    static readonly TRANSLUCENT: RenderType;
    static valueOf(name: string): RenderType;
    static values(): RenderType[];
  }


  interface Builder extends com_supermartijn642_fusion_api_texture_data_basetexturedata_Builder<Builder, ConnectingTextureData> {}
  class Builder extends com_supermartijn642_fusion_api_texture_data_basetexturedata_Builder<Builder, ConnectingTextureData> {
    layout(var1: ConnectingTextureLayout): Builder;
    renderType(var1: RenderType): Builder;
  }

}

declare module 'com.supermartijn642.fusion.api.texture.data.ContinuousTextureData' {
  import { Builder as com_supermartijn642_fusion_api_texture_data_basetexturedata_Builder } from 'com.supermartijn642.fusion.api.texture.data.BaseTextureData';
  import { ContinuousTextureData } from 'com.supermartijn642.fusion.api.texture.data';

  interface Builder extends com_supermartijn642_fusion_api_texture_data_basetexturedata_Builder<Builder, ContinuousTextureData> {}
  class Builder extends com_supermartijn642_fusion_api_texture_data_basetexturedata_Builder<Builder, ContinuousTextureData> {
    columns(var1: number): Builder;
    rows(var1: number): Builder;
  }

}

declare module 'com.supermartijn642.fusion.api.texture.data.RandomTextureData' {
  import { Builder as com_supermartijn642_fusion_api_texture_data_basetexturedata_Builder } from 'com.supermartijn642.fusion.api.texture.data.BaseTextureData';
  import { RandomTextureData } from 'com.supermartijn642.fusion.api.texture.data';
  import { Long } from 'java.lang';

  interface Builder extends com_supermartijn642_fusion_api_texture_data_basetexturedata_Builder<Builder, RandomTextureData> {}
  class Builder extends com_supermartijn642_fusion_api_texture_data_basetexturedata_Builder<Builder, RandomTextureData> {
    columns(var1: number): Builder;
    count(var1: number): Builder;
    rows(var1: number): Builder;
    seed(var1: Long): Builder;
  }

}

declare module 'com.supermartijn642.fusion.api.texture.data.ScrollingTextureData' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { Builder as com_supermartijn642_fusion_api_texture_data_basetexturedata_Builder } from 'com.supermartijn642.fusion.api.texture.data.BaseTextureData';
  import { ScrollingTextureData } from 'com.supermartijn642.fusion.api.texture.data';

  interface LoopType extends Enum<LoopType> {}
  class LoopType extends Enum<LoopType> {
    static readonly RESET: LoopType;
    static readonly REVERSE: LoopType;
    static valueOf(name: string): LoopType;
    static values(): LoopType[];
  }


  interface Position extends Enum<Position> {}
  class Position extends Enum<Position> {
    static readonly TOP_LEFT: Position;
    static readonly TOP_RIGHT: Position;
    static readonly BOTTOM_LEFT: Position;
    static readonly BOTTOM_RIGHT: Position;
    static valueOf(name: string): Position;
    static values(): Position[];
  }


  interface Builder extends com_supermartijn642_fusion_api_texture_data_basetexturedata_Builder<Builder, ScrollingTextureData> {}
  class Builder extends com_supermartijn642_fusion_api_texture_data_basetexturedata_Builder<Builder, ScrollingTextureData> {
    endPosition(var1: Position): Builder;
    frameHeight(var1: number): Builder;
    frameSize(var1: number, var2: number): Builder;
    frameTime(var1: number): Builder;
    frameWidth(var1: number): Builder;
    loopPause(var1: number): Builder;
    loopType(var1: LoopType): Builder;
    startPosition(var1: Position): Builder;
  }

}

declare module 'com.supermartijn642.fusion.api.texture' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { JsonObject } from 'com.google.gson';
  import { TextureAtlasSprite, TextureAtlas } from 'net.minecraft.client.renderer.texture';
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { Pair, Serializer } from 'com.supermartijn642.fusion.api.util';
  import { Integer, RuntimeException } from 'java.lang';
  import { AnimationMetadataSection } from 'net.minecraft.client.resources.metadata.animation';

  class DefaultTextureTypes {
    static readonly VANILLA: TextureType;
    static readonly BASE: TextureType;
    static readonly CONNECTING: TextureType;
    static readonly SCROLLING: TextureType;
    static readonly RANDOM: TextureType;
    static readonly CONTINUOUS: TextureType;
  }


  class FusionTextureTypeRegistry {
    static registerTextureType(identifier: ResourceLocation, textureType: TextureType<any>): void;
    static serializeTextureData<T>(textureType: TextureType<T>, textureData: T): JsonObject;
  }


  class SpriteCreationContext {
    createOriginalSprite(): TextureAtlasSprite;
    get atlas(): TextureAtlas;
    get atlasHeight(): number;
    get atlasWidth(): number;
    get mipmapLevels(): number;
    get spriteHeight(): number;
    get spritePositionX(): number;
    get spritePositionY(): number;
    get spriteWidth(): number;
    get textureBuffers(): NativeImage[];
    get textureHeight(): number;
    get textureIdentifier(): ResourceLocation;
    get textureWidth(): number;
  }


  class SpriteHelper {
    static getTextureType(sprite: TextureAtlasSprite): TextureType<any>;
  }


  class SpritePreparationContext {
    get animationMetadata(): AnimationMetadataSection;
    get identifier(): ResourceLocation;
    get originalFrameHeight(): number;
    get originalFrameSize(): Pair<number, number>;
    get originalFrameWith(): number;
    get textureHeight(): number;
    get textureWidth(): number;
  }


  interface TextureErrorException extends RuntimeException {}
  class TextureErrorException extends RuntimeException {
    constructor(message: string);
  }


  interface TextureType<T = any> extends Serializer<T> {}
  class TextureType<T = any> extends Serializer<T> {
    createSprite(var1: SpriteCreationContext, var2: T): TextureAtlasSprite;
    getFrameSize(context: SpritePreparationContext, data: T): Pair<number, number>;
  }

}

declare module 'com.supermartijn642.fusion.api.util' {
  import { Supplier, Function, Consumer, BiFunction, BiConsumer } from 'java.util.function';
  import { JsonObject } from 'com.google.gson';

  class Either<X = any, Y = any> {
    flatMap<S>(var1: Function<X, S>, var2: Function<Y, S>): S;
    ifLeft(var1: Consumer<X>): void;
    ifRight(var1: Consumer<Y>): void;
    isLeft(): boolean;
    isRight(): boolean;
    static left<X, Y>(object: X): Either<X, Y>;
    left(): X;
    leftOrElse(var1: X): X;
    leftOrElseGet(var1: Supplier<X>): X;
    leftOrNull(): X;
    map<R, S>(mapLeft: Function<X, R>, mapRight: Function<Y, S>): Either<R, S>;
    mapLeft<S>(var1: Function<X, S>): Either<S, Y>;
    mapRight<S>(var1: Function<Y, S>): Either<X, S>;
    static right<X, Y>(object: Y): Either<X, Y>;
    right(): Y;
    rightOrElse(var1: Y): Y;
    rightOrElseGet(var1: Supplier<Y>): Y;
    rightOrNull(): Y;
  }


  class Pair<X = any, Y = any> {
    apply(consumer: BiConsumer<X, Y>): void;
    equals(o: any): boolean;
    flatMap<S>(mapper: BiFunction<X, Y, S>): S;
    hashCode(): number;
    left(): X;
    map<R, S>(mapLeft: Function<X, R>, mapRight: Function<Y, S>): Pair<R, S>;
    mapLeft<S>(mapper: Function<X, S>): Pair<S, Y>;
    mapRight<S>(mapper: Function<Y, S>): Pair<X, S>;
    static of<X, Y>(left: X, right: Y): Pair<X, Y>;
    right(): Y;
  }


  class Serializer<T = any> {
    deserialize(var1: JsonObject): T;
    serialize(var1: T): JsonObject;
  }

}

declare module 'com.supermartijn642.fusion.entity' {
  import { Map } from 'java.util';
  import { ModelLayerLocation, ModelPart } from 'net.minecraft.client.model.geom';
  import { EntityLayerProperties, FusionModelPart } from 'com.supermartijn642.fusion.entity.model';
  import { LayerDefinition } from 'net.minecraft.client.model.geom.builders';
  import { EntityRenderer, EntityRendererProvider } from 'net.minecraft.client.renderer.entity';
  import { EntityType } from 'net.minecraft.world.entity';
  import { Context } from 'EntityRendererProvider';
  import { Modifier } from 'com.supermartijn642.fusion.entity.EntityModelModifierReloadListener';
  import { Consumer } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ResourceManager } from 'net.minecraft.server.packs.resources';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';

  class EntityModelModifier {
    constructor(layers: Map<ModelLayerLocation, EntityLayerProperties>);
    get layers(): Map<ModelLayerLocation, EntityLayerProperties>;
  }


  class EntityModelModifierManager {
    static reloadCounter: number;
    static bakeModels(originalModels: Map<ModelLayerLocation, LayerDefinition>): void;
    static handleModelBake(location: ModelLayerLocation, original: ModelPart): FusionModelPart;
    static handleRendererCreation(entityType: EntityType<any>, rendererProvider: EntityRendererProvider<any>, context: Context): EntityRenderer<any>;
  }


  class EntityModelModifierReloadListener {
    static get modifiers(): Map<EntityType<any>, Modifier>;
    static getModelLocations(output: Consumer<ResourceLocation>): void;
    static reload(resourceManager: ResourceManager): void;
  }


  class EntityRenderTypeHelper {
    static getRenderTypeWithTexture(renderType: RenderType, texture: ResourceLocation): RenderType;
  }


  class VanillaModelLayerProperties {
    static get(location: ModelLayerLocation, renderer: EntityRenderer<any>): VanillaModelLayerProperties;
    get offsetX(): number;
    get offsetY(): number;
    get offsetZ(): number;
    shouldFlipX(): boolean;
    shouldFlipY(): boolean;
    shouldFlipZ(): boolean;
    transform(poseStack: PoseStack): void;
  }

}

declare module 'com.supermartijn642.fusion.entity.EntityModelModifierReloadListener' {
  import { EntityType } from 'net.minecraft.world.entity';
  import { Map, List } from 'java.util';
  import { Either } from 'com.supermartijn642.fusion.api.util';
  import { Boolean, Float } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';

  class Modifier {
    readonly entityType: EntityType;
    readonly layers: Map;
  }


  class Layer {
    readonly defaultModel: ModelOption;
    readonly conditionals: List;
  }


  class ModelOption {
    readonly model: Either;
    readonly textures: List;
    readonly flipX: boolean;
    readonly flipY: boolean;
    readonly flipZ: boolean;
    readonly offsetX: number;
    readonly offsetY: number;
    readonly offsetZ: number;
    readonly scale: number;
    readonly weight: number;
    constructor(model: Either<ResourceLocation, ModelOption[]>, textures: ResourceLocation[], flipX: boolean, flipY: boolean, flipZ: boolean, offsetX: number, offsetY: number, offsetZ: number, scale: number, weight: number);
  }

}

declare module 'com.supermartijn642.fusion.entity.model' {
  import { ModelPart, ModelLayerLocation } from 'net.minecraft.client.model.geom';
  import { RandomSource } from 'net.minecraft.util';
  import { List } from 'java.util';
  import { ModelOption } from 'com.supermartijn642.fusion.entity.model.EntityLayerProperties';
  import { Pair } from 'com.supermartijn642.fusion.api.util';
  import { EntityModelPredicate } from 'com.supermartijn642.fusion.entity.model.predicates';
  import { Triple } from 'com.supermartijn642.fusion.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Float } from 'java.lang';
  import { Entity } from 'net.minecraft.world.entity';
  import { Consumer } from 'java.util.function';
  import { VanillaModelLayerProperties } from 'com.supermartijn642.fusion.entity';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';

  interface DummyModelPart extends ModelPart {}
  class DummyModelPart extends ModelPart {
    constructor(childPart: ModelPart);
    get dummyChild(): ModelPart;
    get properChild(): ModelPart;
    getChild(name: string): ModelPart;
    hasChild(name: string): boolean;
    set dummyChild(child: ModelPart);
  }


  class EntityLayerProperties {
    static readonly RANDOM: RandomSource;
    constructor(identifier: ModelLayerLocation, defaultModel: ModelOption[], conditionals: Pair<EntityModelPredicate, ModelOption[]>[]);
    chooseModel(entity: Entity): Triple<ModelPart, ResourceLocation, number>;
    gatherModels(output: Consumer<ModelPart>): void;
    identifier(): ModelLayerLocation;
    transformed(properties: VanillaModelLayerProperties): EntityLayerProperties;
  }


  interface FusionModelPart extends SubModelPart {}
  class FusionModelPart extends SubModelPart {
    constructor(layerIndex: number, original: ModelPart);
    clear(): void;
    render(poseStack: PoseStack, vertexConsumer: VertexConsumer, i: number, j: number, k: number): void;
    renderPart(part: SubModelPart, poseStack: PoseStack, vertexConsumer: VertexConsumer, i: number, j: number, k: number): void;
    setProperties(properties: EntityLayerProperties, vanillaProperties: VanillaModelLayerProperties): void;
    setup(entity: Entity, bufferSource: MultiBufferSource): void;
  }


  class ModelTransformer {
    static flipX(model: ModelPart): ModelPart;
    static flipY(model: ModelPart): ModelPart;
    static flipZ(model: ModelPart): ModelPart;
    static translateX(model: ModelPart, translation: number): ModelPart;
    static translateY(model: ModelPart, translation: number): ModelPart;
    static translateZ(model: ModelPart, translation: number): ModelPart;
  }


  interface SubModelPart extends ModelPart {}
  class SubModelPart extends ModelPart {
    constructor(mainPart: FusionModelPart);
    finish(): void;
    getChild(name: string): ModelPart;
    hasChild(name: string): boolean;
    mirror(target: ModelPart): void;
    render(poseStack: PoseStack, vertexConsumer: VertexConsumer, i: number, j: number, k: number): void;
    validateModelHasImportantChildren(model: ModelPart, missingPartOutput: Consumer<string>): void;
  }

}

declare module 'com.supermartijn642.fusion.entity.model.EntityLayerProperties' {
  import { ModelPart } from 'net.minecraft.client.model.geom';
  import { List } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Float } from 'java.lang';

  class ModelOption {
    constructor(model: ModelPart, isVanillaModel: boolean, textures: ResourceLocation[], weight: number, scaling: number);
    isVanillaModel(): boolean;
    model(): ModelPart;
    scaling(): number;
    textures(): ResourceLocation[];
    weight(): number;
  }

}

declare module 'com.supermartijn642.fusion.entity.model.loader' {
  import { ModelPart, ModelLayerLocation } from 'net.minecraft.client.model.geom';
  import { JsonObject } from 'com.google.gson';
  import { Map, List } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ResourceManager } from 'net.minecraft.server.packs.resources';

  interface BedrockEntityModelLoader extends EntityModelLoader {}
  class BedrockEntityModelLoader extends EntityModelLoader {
    loadModel(json: JsonObject): ModelPart;
  }


  class EntityModelLoader {
    loadModel(var1: JsonObject): ModelPart;
  }


  class FusionEntityModelLoader {
    static MODELS: Map;
    static loadModels(identifiers: ResourceLocation[], resourceManager: ResourceManager): void;
    static locationForLayer(layer: ModelLayerLocation): ResourceLocation;
  }


  interface OptifineEntityModelLoader extends EntityModelLoader {}
  class OptifineEntityModelLoader extends EntityModelLoader {
    loadModel(json: JsonObject): ModelPart;
  }

}

declare module 'com.supermartijn642.fusion.entity.model.predicates' {
  import { Serializer } from 'com.supermartijn642.fusion.api.util';
  import { Entity } from 'net.minecraft.world.entity';
  import { List, Set } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { JsonObject } from 'com.google.gson';

  interface AltitudeEntityModelPredicate extends EntityModelPredicate {}
  class AltitudeEntityModelPredicate extends EntityModelPredicate {
    static readonly SERIALIZER: Serializer;
    constructor(min: number, max: number);
    get serializer(): Serializer<EntityModelPredicate>;
    test(entity: Entity): boolean;
  }


  interface AndEntityModelPredicate extends EntityModelPredicate {}
  class AndEntityModelPredicate extends EntityModelPredicate {
    static readonly SERIALIZER: Serializer;
    constructor(predicates: EntityModelPredicate[]);
    get serializer(): Serializer<EntityModelPredicate>;
    test(entity: Entity): boolean;
  }


  interface BabyEntityModelPredicate extends EntityModelPredicate {}
  class BabyEntityModelPredicate extends EntityModelPredicate {
    static readonly INSTANCE: BabyEntityModelPredicate;
    static readonly SERIALIZER: Serializer;
    get serializer(): Serializer<EntityModelPredicate>;
    test(entity: Entity): boolean;
  }


  interface BiomeEntityModelPredicate extends EntityModelPredicate {}
  class BiomeEntityModelPredicate extends EntityModelPredicate {
    static readonly SERIALIZER: Serializer;
    constructor(biomes: Set<ResourceLocation>);
    get serializer(): Serializer<EntityModelPredicate>;
    test(entity: Entity): boolean;
  }


  interface DimensionEntityModelPredicate extends EntityModelPredicate {}
  class DimensionEntityModelPredicate extends EntityModelPredicate {
    static readonly SERIALIZER: Serializer;
    constructor(dimension: ResourceLocation);
    get serializer(): Serializer<EntityModelPredicate>;
    test(entity: Entity): boolean;
  }


  class EntityModelPredicate {
    get serializer(): Serializer<EntityModelPredicate>;
    test(var1: Entity): boolean;
  }


  class EntityModelPredicateRegistry {
    static deserializeEntityModelPredicate(json: JsonObject): EntityModelPredicate;
    static finalizeRegistration(): void;
    static registerEntityModelPredicate(identifier: ResourceLocation, serializer: Serializer<EntityModelPredicate>): void;
    static serializeEntityModelPredicate(predicate: EntityModelPredicate): JsonObject;
  }


  interface NotEntityModelPredicate extends EntityModelPredicate {}
  class NotEntityModelPredicate extends EntityModelPredicate {
    static readonly SERIALIZER: Serializer;
    constructor(predicate: EntityModelPredicate);
    get serializer(): Serializer<EntityModelPredicate>;
    test(entity: Entity): boolean;
  }


  interface OrEntityModelPredicate extends EntityModelPredicate {}
  class OrEntityModelPredicate extends EntityModelPredicate {
    static readonly SERIALIZER: Serializer;
    constructor(predicates: EntityModelPredicate[]);
    get serializer(): Serializer<EntityModelPredicate>;
    test(entity: Entity): boolean;
  }

}

declare module 'com.supermartijn642.fusion.extensions' {
  import { ModelInstance } from 'com.supermartijn642.fusion.api.model';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { Triple } from 'com.supermartijn642.fusion.util';
  import { ModelPart } from 'net.minecraft.client.model.geom';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Float } from 'java.lang';
  import { List } from 'java.util';
  import { FusionModelPart } from 'com.supermartijn642.fusion.entity.model';
  import { FusionPackMetadata } from 'com.supermartijn642.fusion.resources';
  import { Pair } from 'com.supermartijn642.fusion.api.util';
  import { TextureType } from 'com.supermartijn642.fusion.api.texture';

  class BlockModelExtension {
    get fusionModel(): ModelInstance<any>;
    set fusionModel(var1: ModelInstance<any>);
  }


  class BufferSourceExtension {
    fusionGetLastRenderType(): RenderType;
  }


  class EntityExtension {
    getFusionModel(var1: number): Triple<ModelPart, ResourceLocation, number>;
    markFusionRecomputeModels(): void;
    setFusionModel(var1: number, var2: Triple<ModelPart, ResourceLocation, number>): void;
    shouldFusionRecomputeModel(var1: number): boolean;
  }


  class EntityRendererExtension {
    get fusionModelParts(): FusionModelPart[];
    set fusionModelParts(var1: FusionModelPart[]);
  }


  class ModelExtension {
    containsFusionModel(): boolean;
  }


  class PackExtension {
    get fusionMetadata(): FusionPackMetadata;
  }


  class PackResourcesExtension {
    setFusionOverridesFolder(var1: string): void;
  }


  class SpriteContentsExtension {
    clearFusionTextureMetadata(): void;
    fusionTextureMetadata(): Pair<TextureType<any>, any>;
  }


  class TextureAtlasSpriteExtension {
    get fusionTextureType(): TextureType<any>;
    set fusionTextureType(var1: TextureType<any>);
  }

}

declare module 'com.supermartijn642.fusion' {
  import { Logger } from 'org.slf4j';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { ThreadLocal } from 'java.lang';
  import { RenderType as com_supermartijn642_fusion_api_texture_data_basetexturedata_RenderType } from 'com.supermartijn642.fusion.api.texture.data.BaseTextureData';

  class Fusion {
    constructor();
  }


  class FusionClient {
    static readonly LOGGER: Logger;
    static readonly USE_ORIGINAL_RENDER_TYPE_MARKER: RenderType;
    static readonly IS_RENDERING_BREAKING_OVERLAY: ThreadLocal;
    static get fusionVersion(): string;
    static getRenderTypeMaterial(renderType: com_supermartijn642_fusion_api_texture_data_basetexturedata_RenderType): RenderType;
    static init(): void;
  }

}

declare module 'com.supermartijn642.fusion.mixin' {
  import { BlockModelExtension, BufferSourceExtension, PackResourcesExtension, EntityExtension, EntityRendererExtension, PackExtension, SpriteContentsExtension, TextureAtlasSpriteExtension } from 'com.supermartijn642.fusion.extensions';
  import { ModelInstance } from 'com.supermartijn642.fusion.api.model';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { Triple } from 'com.supermartijn642.fusion.util';
  import { ModelPart } from 'net.minecraft.client.model.geom';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Float } from 'java.lang';
  import { List, Set } from 'java.util';
  import { FusionModelPart } from 'com.supermartijn642.fusion.entity.model';
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { ClassNode } from 'org.objectweb.asm.tree';
  import { BakedModel } from 'net.minecraft.client.resources.model';
  import { ItemStack } from 'net.minecraft.world.item';
  import { FusionPackMetadata } from 'com.supermartijn642.fusion.resources';
  import { Pair } from 'com.supermartijn642.fusion.api.util';
  import { TextureType } from 'com.supermartijn642.fusion.api.texture';
  import { TextureSheetParticle } from 'net.minecraft.client.particle';
  import { IBakedModelExtension } from 'net.neoforged.neoforge.client.extensions';
  import { ModelData } from 'net.neoforged.neoforge.client.model.data';
  import { BlockAndTintGetter } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  class AgeableMobMixin {
  }


  class BlockModelDeserializerMixin {
  }


  interface BlockModelMixin extends BlockModelExtension {}
  class BlockModelMixin extends BlockModelExtension {
    get fusionModel(): ModelInstance<any>;
    set fusionModel(fusionModel: ModelInstance<any>);
  }


  class BlockRenderDispatcherMixin {
  }


  interface BufferSourceMixin extends BufferSourceExtension {}
  class BufferSourceMixin extends BufferSourceExtension {
    fusionGetLastRenderType(): RenderType;
  }


  interface CompositePackResourceMixin extends PackResourcesExtension {}
  class CompositePackResourceMixin extends PackResourcesExtension {
    setFusionOverridesFolder(folder: string): void;
  }


  interface EntityMixin extends EntityExtension {}
  class EntityMixin extends EntityExtension {
    getFusionModel(layerIndex: number): Triple<ModelPart, ResourceLocation, number>;
    markFusionRecomputeModels(): void;
    setFusionModel(layerIndex: number, model: Triple<ModelPart, ResourceLocation, number>): void;
    shouldFusionRecomputeModel(layerIndex: number): boolean;
  }


  class EntityModelSetMixin {
  }


  class EntityRenderDispatcherMixin {
  }


  interface EntityRendererMixin extends EntityRendererExtension {}
  class EntityRendererMixin extends EntityRendererExtension {
    get fusionModelParts(): FusionModelPart[];
    set fusionModelParts(parts: FusionModelPart[]);
  }


  class EntityRenderersMixin {
  }


  interface FilePackResourcesMixin extends PackResourcesExtension {}
  class FilePackResourcesMixin extends PackResourcesExtension {
    setFusionOverridesFolder(folder: string): void;
  }


  interface FusionMixinPlugin extends IMixinConfigPlugin {}
  class FusionMixinPlugin extends IMixinConfigPlugin {
    acceptTargets(myTargets: Set<string>, otherTargets: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    onLoad(mixinPackage: string): void;
    postApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    preApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    shouldApplyMixin(targetClassName: string, mixinClassName: string): boolean;
  }


  class ItemModelShaperMixin {
    resolveItemPredicatesModel(model: BakedModel, stack: ItemStack): BakedModel;
  }


  class ItemRendererMixin {
  }


  class ModelBlockRendererMixin {
  }


  class ModelManagerMixin {
  }


  interface OutlineBufferSourceMixin extends BufferSourceExtension {}
  class OutlineBufferSourceMixin extends BufferSourceExtension {
    fusionGetLastRenderType(): RenderType;
  }


  class PackEntryMixin {
  }


  interface PackMixin extends PackExtension {}
  class PackMixin extends PackExtension {
    get fusionMetadata(): FusionPackMetadata;
  }


  interface PathPackResourcesMixin extends PackResourcesExtension {}
  class PathPackResourcesMixin extends PackResourcesExtension {
    setFusionOverridesFolder(folder: string): void;
  }


  interface SpriteContentsMixin extends SpriteContentsExtension {}
  class SpriteContentsMixin extends SpriteContentsExtension {
    clearFusionTextureMetadata(): void;
    fusionTextureMetadata(): Pair<TextureType<any>, any>;
  }


  class SpriteLoaderMixin {
  }


  class SpriteResourceLoaderMixin {
  }


  interface TerrainParticleMixin extends TextureSheetParticle {}
  class TerrainParticleMixin extends TextureSheetParticle {
  }


  interface TextureAtlasSpriteMixin extends TextureAtlasSpriteExtension {}
  class TextureAtlasSpriteMixin extends TextureAtlasSpriteExtension {
    get fusionTextureType(): TextureType<any>;
    set fusionTextureType(type: TextureType<any>);
  }


  interface WeightedBakedModelMixin extends IBakedModelExtension {}
  class WeightedBakedModelMixin extends IBakedModelExtension {
    getModelData(level: BlockAndTintGetter, pos: BlockPos, state: BlockState, modelData: ModelData): ModelData;
  }

}

declare module 'com.supermartijn642.fusion.mixin.embeddium' {
  class BlockRendererMixinEmbeddium {
  }

}

declare module 'com.supermartijn642.fusion.mixin.neoforge' {
  class DatagenModLoaderMixin {
  }


  class QuadLighterMixin {
  }

}

declare module 'com.supermartijn642.fusion.mixin.sodium' {
  import { AbstractBlockRenderContext } from 'net.caffeinemc.mods.sodium.client.render.frapi.render';

  interface BlockRendererMixinSodium extends AbstractBlockRenderContext {}
  class BlockRendererMixinSodium extends AbstractBlockRenderContext {
  }

}

declare module 'com.supermartijn642.fusion.model' {
  import { BlockModel, BakedQuad, ItemTransforms, ItemOverrides } from 'net.minecraft.client.renderer.block.model';
  import { UnbakedModel, BakedModel, ModelBaker, Material, ModelState } from 'net.minecraft.client.resources.model';
  import { ModelInstance } from 'com.supermartijn642.fusion.api.model';
  import { Function } from 'java.util.function';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { Collection, List } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Direction, BlockPos } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';
  import { ModelData } from 'net.neoforged.neoforge.client.model.data';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { ItemStack, ItemDisplayContext } from 'net.minecraft.world.item';
  import { ChunkRenderTypeSet } from 'net.neoforged.neoforge.client';
  import { TriState } from 'net.neoforged.neoforge.common.util';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { BlockAndTintGetter } from 'net.minecraft.world.level';

  interface FusionBlockModel extends BlockModel {}
  class FusionBlockModel extends BlockModel {
    static readonly DUMMY_MODEL: UnbakedModel;
    constructor(model: ModelInstance<any>);
    bake(baker: ModelBaker, someOtherModel: BlockModel, spriteGetter: Function<Material, TextureAtlasSprite>, modelTransform: ModelState, gui3d: boolean): BakedModel;
    get dependencies(): Collection<ResourceLocation>;
    get vanillaModel(): BlockModel;
    static getModelInstance(model: UnbakedModel): ModelInstance<any>;
    hasVanillaModel(): boolean;
    resolveParents(functionParameter: Function<ResourceLocation, UnbakedModel>): void;
  }


  interface ItemBakedModel extends WrappedBakedModel {}
  class ItemBakedModel extends WrappedBakedModel {
    constructor(original: BakedModel);
    asList(): BakedModel[];
    static getNonModelRenderType(stack: ItemStack, fabulous: boolean): RenderType;
    getQuads(state: BlockState, cullDirection: Direction, random: RandomSource, data: ModelData, renderType: RenderType): BakedQuad[];
    getQuads(state: BlockState, cullDirection: Direction, random: RandomSource): BakedQuad[];
    set(stack: ItemStack, fabulous: boolean): void;
  }


  class MutableQuad {
    constructor();
    ambientOcclusion(ambientOcclusion: boolean): void;
    emissive(emissive: boolean): void;
    fillFromBakedQuad(quad: BakedQuad): void;
    lightmap(vertexIndex: number, lightmap: number): void;
    lightmap(vertexIndex: number): number;
    pos(vertexIndex: number, x: number, y: number, z: number): void;
    toBakedQuad(): BakedQuad;
    u(vertexIndex: number): number;
    uv(vertexIndex: number, u: number, v: number): void;
    v(vertexIndex: number): number;
    x(vertexIndex: number): number;
    y(vertexIndex: number): number;
    z(vertexIndex: number): number;
  }


  interface WrappedBakedModel extends BakedModel {}
  class WrappedBakedModel extends BakedModel {
    constructor(original: BakedModel);
    applyTransform(transformType: ItemDisplayContext, poseStack: PoseStack, applyLeftHandTransform: boolean): BakedModel;
    get overrides(): ItemOverrides;
    get particleIcon(): TextureAtlasSprite;
    get transforms(): ItemTransforms;
    getModelData(level: BlockAndTintGetter, pos: BlockPos, state: BlockState, data: ModelData): ModelData;
    getParticleIcon(data: ModelData): TextureAtlasSprite;
    getQuads(state: BlockState, cullDirection: Direction, random: RandomSource, data: ModelData, renderType: RenderType): BakedQuad[];
    getQuads(state: BlockState, cullDirection: Direction, random: RandomSource): BakedQuad[];
    getRenderPasses(stack: ItemStack, fabulous: boolean): BakedModel[];
    getRenderTypes(state: BlockState, rand: RandomSource, data: ModelData): ChunkRenderTypeSet;
    getRenderTypes(itemStack: ItemStack, fabulous: boolean): RenderType[];
    isCustomRenderer(): boolean;
    isGui3d(): boolean;
    useAmbientOcclusion(): boolean;
    useAmbientOcclusion(state: BlockState, data: ModelData, renderType: RenderType): TriState;
    usesBlockLight(): boolean;
  }

}

declare module 'com.supermartijn642.fusion.model.modifiers.block' {
  import { BakedModel, ModelBakery } from 'net.minecraft.client.resources.model';
  import { List } from 'java.util';
  import { BakedQuad, ItemTransforms, ItemOverrides } from 'net.minecraft.client.renderer.block.model';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Direction, BlockPos } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';
  import { ModelData } from 'net.neoforged.neoforge.client.model.data';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { ChunkRenderTypeSet } from 'net.neoforged.neoforge.client';
  import { ItemStack, ItemDisplayContext } from 'net.minecraft.world.item';
  import { BlockAndTintGetter } from 'net.minecraft.world.level';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { TriState } from 'net.neoforged.neoforge.common.util';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { ResourceManager } from 'net.minecraft.server.packs.resources';
  import { WrappedBakedModel } from 'com.supermartijn642.fusion.model';

  interface BlockModelModifierBakedModel extends BakedModel {}
  class BlockModelModifierBakedModel extends BakedModel {
    constructor(original: BakedModel, models: BakedModel[], showBreakingOverlay: boolean);
    applyTransform(transformType: ItemDisplayContext, poseStack: PoseStack, applyLeftHandTransform: boolean): BakedModel;
    get overrides(): ItemOverrides;
    get particleIcon(): TextureAtlasSprite;
    get transforms(): ItemTransforms;
    getModelData(level: BlockAndTintGetter, pos: BlockPos, state: BlockState, data: ModelData): ModelData;
    getParticleIcon(data: ModelData): TextureAtlasSprite;
    getQuads(state: BlockState, side: Direction, random: RandomSource, data: ModelData, renderType: RenderType): BakedQuad[];
    getQuads(state: BlockState, side: Direction, random: RandomSource): BakedQuad[];
    getRenderPasses(stack: ItemStack, fabulous: boolean): BakedModel[];
    getRenderTypes(state: BlockState, random: RandomSource, data: ModelData): ChunkRenderTypeSet;
    getRenderTypes(stack: ItemStack, fabulous: boolean): RenderType[];
    isCustomRenderer(): boolean;
    isGui3d(): boolean;
    useAmbientOcclusion(): boolean;
    useAmbientOcclusion(state: BlockState, data: ModelData, renderType: RenderType): TriState;
    usesBlockLight(): boolean;
  }


  class BlockModelModifierReloadListener {
    static readonly INSTANCE: BlockModelModifierReloadListener;
    applyOverlays(bakery: ModelBakery): void;
    registerOverlays(bakery: ModelBakery): void;
    reload(resourceManager: ResourceManager): void;
  }


  interface PaneCullingBakedModel extends WrappedBakedModel {}
  class PaneCullingBakedModel extends WrappedBakedModel {
    constructor(original: BakedModel);
    getModelData(level: BlockAndTintGetter, pos: BlockPos, state: BlockState, data: ModelData): ModelData;
    getQuads(state: BlockState, cullDirection: Direction, random: RandomSource, data: ModelData, renderType: RenderType): BakedQuad[];
    getQuads(state: BlockState, cullDirection: Direction, random: RandomSource): BakedQuad[];
  }

}

declare module 'com.supermartijn642.fusion.model.modifiers.item' {
  import { BakedModel, ModelBakery } from 'net.minecraft.client.resources.model';
  import { List } from 'java.util';
  import { Pair } from 'com.supermartijn642.fusion.api.util';
  import { ItemPredicate } from 'com.supermartijn642.fusion.api.model.modifier.item';
  import { ItemStack, ItemDisplayContext } from 'net.minecraft.world.item';
  import { BakedQuad, ItemTransforms, ItemOverrides } from 'net.minecraft.client.renderer.block.model';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Direction, BlockPos } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';
  import { ModelData } from 'net.neoforged.neoforge.client.model.data';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { ChunkRenderTypeSet } from 'net.neoforged.neoforge.client';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { TriState } from 'net.neoforged.neoforge.common.util';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { BlockAndTintGetter } from 'net.minecraft.world.level';
  import { ResourceManager } from 'net.minecraft.server.packs.resources';

  interface ItemModelModifierBakedModel extends BakedModel {}
  class ItemModelModifierBakedModel extends BakedModel {
    constructor(defaultModel: BakedModel, models: Pair<ItemPredicate, BakedModel>[]);
    applyTransform(transformType: ItemDisplayContext, poseStack: PoseStack, applyLeftHandTransform: boolean): BakedModel;
    forStack(stack: ItemStack): BakedModel;
    get overrides(): ItemOverrides;
    get particleIcon(): TextureAtlasSprite;
    get transforms(): ItemTransforms;
    getModelData(level: BlockAndTintGetter, pos: BlockPos, state: BlockState, data: ModelData): ModelData;
    getParticleIcon(data: ModelData): TextureAtlasSprite;
    getQuads(state: BlockState, cullDirection: Direction, random: RandomSource, data: ModelData, renderType: RenderType): BakedQuad[];
    getQuads(state: BlockState, cullDirection: Direction, random: RandomSource): BakedQuad[];
    getRenderPasses(stack: ItemStack, fabulous: boolean): BakedModel[];
    getRenderTypes(state: BlockState, random: RandomSource, data: ModelData): ChunkRenderTypeSet;
    getRenderTypes(stack: ItemStack, fabulous: boolean): RenderType[];
    isCustomRenderer(): boolean;
    isGui3d(): boolean;
    useAmbientOcclusion(): boolean;
    useAmbientOcclusion(state: BlockState, data: ModelData, renderType: RenderType): TriState;
    usesBlockLight(): boolean;
  }


  class ItemModelModifierReloadListener {
    static readonly INSTANCE: ItemModelModifierReloadListener;
    applyPredicateModels(bakery: ModelBakery): void;
    registerPredicateModels(bakery: ModelBakery): void;
    reload(resourceManager: ResourceManager): void;
  }

}

declare module 'com.supermartijn642.fusion.model.modifiers.item.predicates' {
  import { ItemPredicate } from 'com.supermartijn642.fusion.api.model.modifier.item';
  import { Serializer, Either } from 'com.supermartijn642.fusion.api.util';
  import { List } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Integer, Float } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { JsonObject } from 'com.google.gson';
  import { Holder } from 'net.minecraft.core';
  import { Potion } from 'net.minecraft.world.item.alchemy';

  interface AndItemPredicate extends ItemPredicate {}
  class AndItemPredicate extends ItemPredicate {
    static readonly SERIALIZER: Serializer;
    constructor(predicates: ItemPredicate[]);
    get predicates(): ItemPredicate[];
    get serializer(): Serializer<ItemPredicate>;
    test(stack: ItemStack): boolean;
  }


  interface CountItemPredicate extends ItemPredicate {}
  class CountItemPredicate extends ItemPredicate {
    static readonly SERIALIZER: Serializer;
    constructor(min: Either<number, number>, max: Either<number, number>);
    get serializer(): Serializer<ItemPredicate>;
    test(stack: ItemStack): boolean;
  }


  interface DurabilityItemPredicate extends ItemPredicate {}
  class DurabilityItemPredicate extends ItemPredicate {
    static readonly SERIALIZER: Serializer;
    constructor(min: Either<number, number>, max: Either<number, number>);
    get serializer(): Serializer<ItemPredicate>;
    test(stack: ItemStack): boolean;
  }


  interface EnchantmentItemPredicate extends ItemPredicate {}
  class EnchantmentItemPredicate extends ItemPredicate {
    static readonly SERIALIZER: Serializer;
    constructor(enchantment: ResourceLocation, minLevel: number, maxLevel: number);
    get serializer(): Serializer<ItemPredicate>;
    test(stack: ItemStack): boolean;
  }


  class ItemPredicateRegistry {
    static deserializeItemPredicate(json: JsonObject): ItemPredicate;
    static finalizeRegistration(): void;
    static registerItemPredicate(identifier: ResourceLocation, serializer: Serializer<ItemPredicate>): void;
    static serializeItemPredicate(predicate: ItemPredicate): JsonObject;
  }


  interface NotItemPredicate extends ItemPredicate {}
  class NotItemPredicate extends ItemPredicate {
    static readonly SERIALIZER: Serializer;
    constructor(predicate: ItemPredicate);
    get serializer(): Serializer<ItemPredicate>;
    test(stack: ItemStack): boolean;
  }


  interface OrItemPredicate extends ItemPredicate {}
  class OrItemPredicate extends ItemPredicate {
    static readonly SERIALIZER: Serializer;
    constructor(predicates: ItemPredicate[]);
    get serializer(): Serializer<ItemPredicate>;
    test(stack: ItemStack): boolean;
  }


  interface PotionItemPredicate extends ItemPredicate {}
  class PotionItemPredicate extends ItemPredicate {
    static readonly SERIALIZER: Serializer;
    constructor(potion: Holder<Potion>);
    get serializer(): Serializer<ItemPredicate>;
    test(stack: ItemStack): boolean;
  }

}

declare module 'com.supermartijn642.fusion.model.types.base' {
  import { BlockElement, BlockElementFace, BlockElementRotation, BakedQuad, BlockModel } from 'net.minecraft.client.renderer.block.model';
  import { Integer } from 'java.lang';
  import { Vector3f } from 'org.joml';
  import { Map, Collection, List } from 'java.util';
  import { Direction } from 'net.minecraft.core';
  import { TextureType } from 'com.supermartijn642.fusion.api.texture';
  import { RenderType } from 'com.supermartijn642.fusion.api.texture.data.BaseTextureData';
  import { ModelType, ModelBakingContext } from 'com.supermartijn642.fusion.api.model';
  import { BaseModelData } from 'com.supermartijn642.fusion.api.model.data';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { BakedModel } from 'net.minecraft.client.resources.model';
  import { JsonObject } from 'com.google.gson';

  interface BaseModelElement extends BlockElement {}
  class BaseModelElement extends BlockElement {
    light_emission: number;
    constructor(from: Vector3f, to: Vector3f, faces: Map<Direction, BlockElementFace>, rotation: BlockElementRotation, shade: boolean, light_emission: number);
  }


  class BaseModelQuad {
    constructor(bakedQuad: BakedQuad, cullDirection: Direction, lightEmission: number);
    bakedQuad(): BakedQuad;
    cullDirection(): Direction;
    emissive(): boolean;
    lightEmission(): number;
    renderType(): RenderType;
    textureType(): TextureType<any>;
  }


  interface BaseModelType extends ModelType<BaseModelData> {}
  class BaseModelType extends ModelType<BaseModelData> {
    bake(context: ModelBakingContext, data: BaseModelData): BakedModel;
    deserialize(json: JsonObject): BaseModelData;
    getAsVanillaModel(data: BaseModelData): BlockModel;
    getModelDependencies(data: BaseModelData): Collection<ResourceLocation>;
    getParentModels(data: BaseModelData): ResourceLocation[];
    serialize(value: BaseModelData): JsonObject;
  }

}

declare module 'com.supermartijn642.fusion.model.types.connecting' {
  import { BaseModelElement, BaseModelQuad } from 'com.supermartijn642.fusion.model.types.base';
  import { Map, Collection, List } from 'java.util';
  import { Vector3f } from 'org.joml';
  import { Direction, BlockPos } from 'net.minecraft.core';
  import { BlockElementFace, BlockElementRotation, BakedQuad, BlockModel } from 'net.minecraft.client.renderer.block.model';
  import { Integer } from 'java.lang';
  import { ConnectionPredicate } from 'com.supermartijn642.fusion.api.predicate';
  import { ConnectingTextureLayout } from 'com.supermartijn642.fusion.api.texture.data';
  import { ModelType, ModelBakingContext } from 'com.supermartijn642.fusion.api.model';
  import { ConnectingModelData } from 'com.supermartijn642.fusion.api.model.data';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { BakedModel } from 'net.minecraft.client.resources.model';
  import { JsonObject } from 'com.google.gson';
  import { MutableQuad } from 'com.supermartijn642.fusion.model';
  import { BlockAndTintGetter } from 'net.minecraft.world.level';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  interface ConnectingModelElement extends BaseModelElement {}
  class ConnectingModelElement extends BaseModelElement {
    readonly faceConnectionKeys: Map;
    constructor(from: Vector3f, to: Vector3f, faces: Map<Direction, BlockElementFace>, rotation: BlockElementRotation, shade: boolean, light_emission: number, faceConnectionKeys: Map<Direction, string>);
  }


  interface ConnectingModelQuad extends BaseModelQuad {}
  class ConnectingModelQuad extends BaseModelQuad {
    constructor(bakedQuad: BakedQuad, cullDirection: Direction, lightEmission: number, connectionPredicate: ConnectionPredicate);
    connectionPredicate(): ConnectionPredicate;
    get layout(): ConnectingTextureLayout;
    hasConnectingTexture(): boolean;
  }


  interface ConnectingModelType extends ModelType<ConnectingModelData> {}
  class ConnectingModelType extends ModelType<ConnectingModelData> {
    static readonly DEFAULT_CONNECTION_KEY: string;
    bake(context: ModelBakingContext, data: ConnectingModelData): BakedModel;
    deserialize(json: JsonObject): ConnectingModelData;
    getAsVanillaModel(data: ConnectingModelData): BlockModel;
    getModelDependencies(data: ConnectingModelData): Collection<ResourceLocation>;
    getParentModels(data: ConnectingModelData): ResourceLocation[];
    serialize(value: ConnectingModelData): JsonObject;
  }


  interface OrientedMutableQuad extends MutableQuad {}
  class OrientedMutableQuad extends MutableQuad {
    lightmap(vertexIndex: number, lightmap: number): void;
    lightmap(vertexIndex: number): number;
    pos(vertexIndex: number, x: number, y: number, z: number): void;
    resetPermutation(): void;
    set(permutation: number[]): void;
    u(vertexIndex: number): number;
    uv(vertexIndex: number, u: number, v: number): void;
    v(vertexIndex: number): number;
    x(vertexIndex: number): number;
    y(vertexIndex: number): number;
    z(vertexIndex: number): number;
  }


  class SurroundingBlockCache {
    constructor(level: BlockAndTintGetter, pos: BlockPos, self: BlockState);
    fillAll(): void;
    get center(): BlockState;
    get level(): BlockAndTintGetter;
    get realPos(): BlockPos;
    getState(x: number, y: number, z: number): BlockState;
    setSelf(self: BlockState): void;
  }

}

declare module 'com.supermartijn642.fusion.model.types.connecting.predicates' {
  import { ConnectionPredicate, ConnectionDirection, SensitiveConnectionPredicate } from 'com.supermartijn642.fusion.api.predicate';
  import { Serializer, Pair } from 'com.supermartijn642.fusion.api.util';
  import { List, Set } from 'java.util';
  import { Direction, BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockGetter } from 'net.minecraft.world.level';
  import { Block } from 'net.minecraft.world.level.block';
  import { Property } from 'net.minecraft.world.level.block.state.properties';

  interface AndConnectionPredicate extends ConnectionPredicate {}
  class AndConnectionPredicate extends ConnectionPredicate {
    static readonly SERIALIZER: Serializer;
    constructor(predicates: ConnectionPredicate[]);
    equals(o: any): boolean;
    get serializer(): Serializer<ConnectionPredicate>;
    hashCode(): number;
    isSensitive(): boolean;
    shouldConnect(side: Direction, ownState: BlockState, otherState: BlockState, blockInFront: BlockState, direction: ConnectionDirection): boolean;
    shouldConnect(level: BlockGetter, pos: BlockPos, side: Direction, ownState: BlockState, otherState: BlockState, blockInFront: BlockState, direction: ConnectionDirection): boolean;
  }


  interface IsFaceVisibleConnectionPredicate extends SensitiveConnectionPredicate {}
  class IsFaceVisibleConnectionPredicate extends SensitiveConnectionPredicate {
    static readonly INSTANCE: IsFaceVisibleConnectionPredicate;
    static readonly SERIALIZER: Serializer;
    get serializer(): Serializer<ConnectionPredicate>;
    shouldConnect(level: BlockGetter, pos: BlockPos, side: Direction, ownState: BlockState, otherState: BlockState, blockInFront: BlockState, direction: ConnectionDirection): boolean;
    shouldConnect(side: Direction, ownState: BlockState, otherState: BlockState, blockInFront: BlockState, direction: ConnectionDirection): boolean;
  }


  interface IsSameBlockConnectionPredicate extends ConnectionPredicate {}
  class IsSameBlockConnectionPredicate extends ConnectionPredicate {
    static readonly INSTANCE: IsSameBlockConnectionPredicate;
    static readonly SERIALIZER: Serializer;
    get serializer(): Serializer<ConnectionPredicate>;
    shouldConnect(side: Direction, ownState: BlockState, otherState: BlockState, blockInFront: BlockState, direction: ConnectionDirection): boolean;
    shouldConnect(level: BlockGetter, pos: BlockPos, side: Direction, ownState: BlockState, otherState: BlockState, blockInFront: BlockState, direction: ConnectionDirection): boolean;
  }


  interface IsSameStateConnectionPredicate extends ConnectionPredicate {}
  class IsSameStateConnectionPredicate extends ConnectionPredicate {
    static readonly INSTANCE: IsSameStateConnectionPredicate;
    static readonly SERIALIZER: Serializer;
    get serializer(): Serializer<ConnectionPredicate>;
    shouldConnect(side: Direction, ownState: BlockState, otherState: BlockState, blockInFront: BlockState, direction: ConnectionDirection): boolean;
    shouldConnect(level: BlockGetter, pos: BlockPos, side: Direction, ownState: BlockState, otherState: BlockState, blockInFront: BlockState, direction: ConnectionDirection): boolean;
  }


  interface MatchBlockConnectionPredicate extends ConnectionPredicate {}
  class MatchBlockConnectionPredicate extends ConnectionPredicate {
    static readonly SERIALIZER: Serializer;
    constructor(block: Block);
    equals(o: any): boolean;
    get serializer(): Serializer<ConnectionPredicate>;
    hashCode(): number;
    shouldConnect(side: Direction, ownState: BlockState, otherState: BlockState, blockInFront: BlockState, direction: ConnectionDirection): boolean;
    shouldConnect(level: BlockGetter, pos: BlockPos, side: Direction, ownState: BlockState, otherState: BlockState, blockInFront: BlockState, direction: ConnectionDirection): boolean;
  }


  interface MatchBlockInFrontConnectionPredicate extends ConnectionPredicate {}
  class MatchBlockInFrontConnectionPredicate extends ConnectionPredicate {
    static readonly SERIALIZER: Serializer;
    constructor(block: Block);
    equals(o: any): boolean;
    get serializer(): Serializer<ConnectionPredicate>;
    hashCode(): number;
    shouldConnect(side: Direction, ownState: BlockState, otherState: BlockState, blockInFront: BlockState, direction: ConnectionDirection): boolean;
    shouldConnect(level: BlockGetter, pos: BlockPos, side: Direction, ownState: BlockState, otherState: BlockState, blockInFront: BlockState, direction: ConnectionDirection): boolean;
  }


  interface MatchStateConnectionPredicate extends ConnectionPredicate {}
  class MatchStateConnectionPredicate extends ConnectionPredicate {
    static readonly SERIALIZER: Serializer;
    constructor(block: Block, properties: Pair<Property<any>[]);

    constructor(block: Block, ...propertyPair: Pair<Property<any>, any>[]);
    equals(o: any): boolean;
    get serializer(): Serializer<ConnectionPredicate>;
    hashCode(): number;
    shouldConnect(side: Direction, ownState: BlockState, otherState: BlockState, blockInFront: BlockState, direction: ConnectionDirection): boolean;
    shouldConnect(level: BlockGetter, pos: BlockPos, side: Direction, ownState: BlockState, otherState: BlockState, blockInFront: BlockState, direction: ConnectionDirection): boolean;
  }


  interface MatchStateInFrontConnectionPredicate extends ConnectionPredicate {}
  class MatchStateInFrontConnectionPredicate extends ConnectionPredicate {
    static readonly SERIALIZER: Serializer;
    constructor(block: Block, properties: Pair<Property<any>[]);

    constructor(block: Block, ...propertyPair: Pair<Property<any>, any>[]);
    equals(o: any): boolean;
    get serializer(): Serializer<ConnectionPredicate>;
    hashCode(): number;
    shouldConnect(side: Direction, ownState: BlockState, otherState: BlockState, blockInFront: BlockState, direction: ConnectionDirection): boolean;
    shouldConnect(level: BlockGetter, pos: BlockPos, side: Direction, ownState: BlockState, otherState: BlockState, blockInFront: BlockState, direction: ConnectionDirection): boolean;
  }


  interface NotConnectionPredicate extends ConnectionPredicate {}
  class NotConnectionPredicate extends ConnectionPredicate {
    static readonly SERIALIZER: Serializer;
    constructor(predicate: T);
    equals(o: any): boolean;
    get serializer(): Serializer<ConnectionPredicate>;
    hashCode(): number;
    isSensitive(): boolean;
    shouldConnect(side: Direction, ownState: BlockState, otherState: BlockState, blockInFront: BlockState, direction: ConnectionDirection): boolean;
    shouldConnect(level: BlockGetter, pos: BlockPos, side: Direction, ownState: BlockState, otherState: BlockState, blockInFront: BlockState, direction: ConnectionDirection): boolean;
  }


  interface OrConnectionPredicate extends ConnectionPredicate {}
  class OrConnectionPredicate extends ConnectionPredicate {
    static readonly SERIALIZER: Serializer;
    constructor(predicates: ConnectionPredicate[]);
    equals(o: any): boolean;
    get serializer(): Serializer<ConnectionPredicate>;
    hashCode(): number;
    isSensitive(): boolean;
    shouldConnect(side: Direction, ownState: BlockState, otherState: BlockState, blockInFront: BlockState, direction: ConnectionDirection): boolean;
    shouldConnect(level: BlockGetter, pos: BlockPos, side: Direction, ownState: BlockState, otherState: BlockState, blockInFront: BlockState, direction: ConnectionDirection): boolean;
  }

}

declare module 'com.supermartijn642.fusion.model.types' {
  import { ModelType, ModelBakingContext } from 'com.supermartijn642.fusion.api.model';
  import { UnbakedModel, BakedModel } from 'net.minecraft.client.resources.model';
  import { JsonObject } from 'com.google.gson';
  import { Collection } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface UnknownModelType extends ModelType<UnbakedModel> {}
  class UnknownModelType extends ModelType<UnbakedModel> {
    bake(context: ModelBakingContext, data: UnbakedModel): BakedModel;
    deserialize(json: JsonObject): UnbakedModel;
    getModelDependencies(data: UnbakedModel): Collection<ResourceLocation>;
    serialize(value: UnbakedModel): JsonObject;
  }

}

declare module 'com.supermartijn642.fusion.model.types.vanilla' {
  import { JsonSerializer, Gson, JsonElement, JsonSerializationContext, JsonObject } from 'com.google.gson';
  import { BlockModel } from 'net.minecraft.client.renderer.block.model';
  import { Type } from 'java.lang.reflect';
  import { ModelType, ModelBakingContext } from 'com.supermartijn642.fusion.api.model';
  import { Collection } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { BakedModel } from 'net.minecraft.client.resources.model';

  interface VanillaModelSerializer extends JsonSerializer<BlockModel> {}
  class VanillaModelSerializer extends JsonSerializer<BlockModel> {
    static readonly GSON: Gson;
    serialize(src: BlockModel, typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }


  interface VanillaModelType extends ModelType<BlockModel> {}
  class VanillaModelType extends ModelType<BlockModel> {
    bake(context: ModelBakingContext, data: BlockModel): BakedModel;
    deserialize(json: JsonObject): BlockModel;
    getAsVanillaModel(data: BlockModel): BlockModel;
    getModelDependencies(data: BlockModel): Collection<ResourceLocation>;
    serialize(value: BlockModel): JsonObject;
  }

}

declare module 'com.supermartijn642.fusion.resources' {
  import { MetadataSectionSerializer } from 'net.minecraft.server.packs.metadata';
  import { JsonObject } from 'com.google.gson';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { EntryBase } from 'PackSelectionModel';
  import { Consumer } from 'java.util.function';
  import { Boolean } from 'java.lang';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class FusionPackMetadata {
    get minimumVersion(): string;
    get overridesFolder(): string;
    hasOverridesFolder(): boolean;
    isMinVersionSatisfied(): boolean;
  }


  interface FusionPackMetadataSection extends MetadataSectionSerializer<FusionPackMetadata> {}
  class FusionPackMetadataSection extends MetadataSectionSerializer<FusionPackMetadata> {
    static readonly INSTANCE: FusionPackMetadataSection;
    fromJson(json: JsonObject): FusionPackMetadata;
    get metadataSectionName(): string;
  }


  interface MinimumVersionWarningScreen extends Screen {}
  class MinimumVersionWarningScreen extends Screen {
    constructor(pack: EntryBase, confirmation: Consumer<boolean>);
    get narrationMessage(): Component;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    shouldCloseOnEsc(): boolean;
  }


  class ResourcePackListTipRenderer {
    static getWarningMessage(metadata: FusionPackMetadata, isVanillaCompatible: boolean): Component;
    static renderBackground(metadata: FusionPackMetadata, isVanillaCompatible: boolean, graphics: GuiGraphics, x: number, y: number, width: number, height: number): void;
    static renderIcon(metadata: FusionPackMetadata, isVanillaCompatible: boolean, graphics: GuiGraphics, x: number, y: number, width: number, height: number): void;
    static showWarningScreen(metadata: FusionPackMetadata, isVanillaCompatible: boolean, entry: EntryBase, confirmation: Consumer<boolean>): boolean;
  }

}

declare module 'com.supermartijn642.fusion.texture' {
  import { MetadataSectionSerializer } from 'net.minecraft.server.packs.metadata';
  import { Pair } from 'com.supermartijn642.fusion.api.util';
  import { TextureType } from 'com.supermartijn642.fusion.api.texture';
  import { JsonObject } from 'com.google.gson';
  import { QuadTinting } from 'com.supermartijn642.fusion.api.texture.data.BaseTextureData';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockAndTintGetter } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';

  interface FusionTextureMetadataSection extends MetadataSectionSerializer<Pair> {}
  class FusionTextureMetadataSection extends MetadataSectionSerializer<Pair> {
    static readonly INSTANCE: FusionTextureMetadataSection;
    fromJson(json: JsonObject): Pair<TextureType<any>, any>;
    get metadataSectionName(): string;
  }


  class QuadTintingHelper {
    static getColor(tinting: QuadTinting, state: BlockState, level: BlockAndTintGetter, pos: BlockPos): number;
  }

}

declare module 'com.supermartijn642.fusion.texture.types.base' {
  import { TextureAtlasSprite, SpriteContents } from 'net.minecraft.client.renderer.texture';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { BaseTextureData } from 'com.supermartijn642.fusion.api.texture.data';
  import { TextureType, SpritePreparationContext, SpriteCreationContext } from 'com.supermartijn642.fusion.api.texture';
  import { Pair } from 'com.supermartijn642.fusion.api.util';
  import { Integer } from 'java.lang';
  import { JsonObject } from 'com.google.gson';

  interface BaseTextureSprite extends TextureAtlasSprite {}
  class BaseTextureSprite extends TextureAtlasSprite {
    constructor(atlas: ResourceLocation, contents: SpriteContents, atlasWidth: number, atlasHeight: number, spriteX: number, spriteY: number, data: BaseTextureData);
    data(): BaseTextureData;
  }


  interface BaseTextureType extends TextureType<BaseTextureData> {}
  class BaseTextureType extends TextureType<BaseTextureData> {
    createSprite(context: SpriteCreationContext, data: BaseTextureData): TextureAtlasSprite;
    deserialize(json: JsonObject): BaseTextureData;
    getFrameSize(context: SpritePreparationContext, data: BaseTextureData): Pair<number, number>;
    serialize(value: BaseTextureData): JsonObject;
  }

}

declare module 'com.supermartijn642.fusion.texture.types.connecting' {
  import { BaseTextureSprite } from 'com.supermartijn642.fusion.texture.types.base';
  import { ConnectingTextureData } from 'com.supermartijn642.fusion.api.texture.data';
  import { TextureType, SpritePreparationContext, SpriteCreationContext } from 'com.supermartijn642.fusion.api.texture';
  import { JsonObject } from 'com.google.gson';
  import { Pair } from 'com.supermartijn642.fusion.api.util';
  import { Integer, Iterable } from 'java.lang';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { Iterator } from 'java.util';

  interface ConnectingTextureSprite extends BaseTextureSprite {}
  class ConnectingTextureSprite extends BaseTextureSprite {
    data(): ConnectingTextureData;
    get startU(): number;
    get startV(): number;
  }


  interface ConnectingTextureType extends TextureType<ConnectingTextureData> {}
  class ConnectingTextureType extends TextureType<ConnectingTextureData> {
    createSprite(context: SpriteCreationContext, data: ConnectingTextureData): TextureAtlasSprite;
    deserialize(json: JsonObject): ConnectingTextureData;
    getFrameSize(context: SpritePreparationContext, data: ConnectingTextureData): Pair<number, number>;
    serialize(data: ConnectingTextureData): JsonObject;
  }


  class TextureConnections {
    readonly top: boolean;
    readonly topRight: boolean;
    readonly right: boolean;
    readonly bottomRight: boolean;
    readonly bottom: boolean;
    readonly bottomLeft: boolean;
    readonly left: boolean;
    readonly topLeft: boolean;
    constructor(top: boolean, topRight: boolean, right: boolean, bottomRight: boolean, bottom: boolean, bottomLeft: boolean, left: boolean, topLeft: boolean);
    equals(o: any): boolean;
    hasNext(): boolean;
    hashCode(): number;
    static iterateAll(): Iterable<TextureConnections>;
    iterator(): Iterator<TextureConnections>;
    next(): TextureConnections;
  }

}

declare module 'com.supermartijn642.fusion.texture.types.connecting.layouts' {
  import { SimpleHandler } from 'com.supermartijn642.fusion.texture.types.connecting.layouts.ConnectingTextureLayoutHandler';
  import { ConnectingTextureLayout } from 'com.supermartijn642.fusion.api.texture.data';
  import { MutableQuad } from 'com.supermartijn642.fusion.model';
  import { ConnectingTextureSprite, TextureConnections } from 'com.supermartijn642.fusion.texture.types.connecting';

  interface CompactLayoutHandler extends SimpleHandler {}
  class CompactLayoutHandler extends SimpleHandler {
    constructor();
  }


  class ConnectingTextureLayoutHandler {
    constructor(width: number, height: number, defaultTileX: number, defaultTileY: number, auxiliaryQuadCount: number);
    defaultTileX(): number;
    defaultTileY(): number;
    static get(layout: ConnectingTextureLayout): ConnectingTextureLayoutHandler;
    get auxiliaryQuadCount(): number;
    get height(): number;
    get width(): number;
    processBlockQuad(var1: number, var2: MutableQuad, var3: ConnectingTextureSprite, var4: TextureConnections): boolean;
    processItemQuad(var1: number, var2: MutableQuad, var3: ConnectingTextureSprite): boolean;
  }


  interface FullLayoutHandler extends SimpleHandler {}
  class FullLayoutHandler extends SimpleHandler {
    constructor();
  }


  interface HorizontalLayoutHandler extends SimpleHandler {}
  class HorizontalLayoutHandler extends SimpleHandler {
    constructor();
  }


  interface OverlayLayoutHandler extends ConnectingTextureLayoutHandler {}
  class OverlayLayoutHandler extends ConnectingTextureLayoutHandler {
    constructor();
    processBlockQuad(quadIndex: number, quad: MutableQuad, sprite: ConnectingTextureSprite, connections: TextureConnections): boolean;
    processItemQuad(quadIndex: number, quad: MutableQuad, sprite: ConnectingTextureSprite): boolean;
  }


  interface PiecedLayoutHandler extends ConnectingTextureLayoutHandler {}
  class PiecedLayoutHandler extends ConnectingTextureLayoutHandler {
    constructor();
    processBlockQuad(quadIndex: number, quad: MutableQuad, sprite: ConnectingTextureSprite, connections: TextureConnections): boolean;
    processItemQuad(quadIndex: number, quad: MutableQuad, sprite: ConnectingTextureSprite): boolean;
  }


  interface SimpleLayoutHandler extends SimpleHandler {}
  class SimpleLayoutHandler extends SimpleHandler {
    constructor();
  }


  interface VerticalLayoutHandler extends SimpleHandler {}
  class VerticalLayoutHandler extends SimpleHandler {
    constructor();
  }

}

declare module 'com.supermartijn642.fusion.texture.types.connecting.layouts.ConnectingTextureLayoutHandler' {
  import { ConnectingTextureLayoutHandler } from 'com.supermartijn642.fusion.texture.types.connecting.layouts';
  import { MutableQuad } from 'com.supermartijn642.fusion.model';
  import { ConnectingTextureSprite, TextureConnections } from 'com.supermartijn642.fusion.texture.types.connecting';

  interface SimpleHandler extends ConnectingTextureLayoutHandler {}
  class SimpleHandler extends ConnectingTextureLayoutHandler {
    constructor(width: number, height: number, maxIndexSize: number);
    processBlockQuad(quadIndex: number, quad: MutableQuad, sprite: ConnectingTextureSprite, connections: TextureConnections): boolean;
    processItemQuad(quadIndex: number, quad: MutableQuad, sprite: ConnectingTextureSprite): boolean;
  }

}

declare module 'com.supermartijn642.fusion.texture.types.continuous' {
  import { BaseTextureSprite } from 'com.supermartijn642.fusion.texture.types.base';
  import { ContinuousTextureData } from 'com.supermartijn642.fusion.api.texture.data';
  import { TextureType, SpritePreparationContext, SpriteCreationContext } from 'com.supermartijn642.fusion.api.texture';
  import { JsonObject } from 'com.google.gson';
  import { Pair } from 'com.supermartijn642.fusion.api.util';
  import { Integer } from 'java.lang';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { MutableQuad } from 'com.supermartijn642.fusion.model';
  import { BlockPos, Direction } from 'net.minecraft.core';

  interface ContinuousTextureSprite extends BaseTextureSprite {}
  class ContinuousTextureSprite extends BaseTextureSprite {
    data(): ContinuousTextureData;
  }


  interface ContinuousTextureType extends TextureType<ContinuousTextureData> {}
  class ContinuousTextureType extends TextureType<ContinuousTextureData> {
    createSprite(context: SpriteCreationContext, data: ContinuousTextureData): TextureAtlasSprite;
    deserialize(json: JsonObject): ContinuousTextureData;
    getFrameSize(context: SpritePreparationContext, data: ContinuousTextureData): Pair<number, number>;
    static processQuad(quad: MutableQuad, pos: BlockPos, side: Direction, sprite: ContinuousTextureSprite): void;
    serialize(data: ContinuousTextureData): JsonObject;
  }

}

declare module 'com.supermartijn642.fusion.texture.types.random' {
  import { BaseTextureSprite } from 'com.supermartijn642.fusion.texture.types.base';
  import { RandomTextureData } from 'com.supermartijn642.fusion.api.texture.data';
  import { TextureType, SpritePreparationContext, SpriteCreationContext } from 'com.supermartijn642.fusion.api.texture';
  import { JsonObject } from 'com.google.gson';
  import { Pair } from 'com.supermartijn642.fusion.api.util';
  import { Integer } from 'java.lang';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { MutableQuad } from 'com.supermartijn642.fusion.model';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';

  interface RandomTextureSprite extends BaseTextureSprite {}
  class RandomTextureSprite extends BaseTextureSprite {
    data(): RandomTextureData;
  }


  interface RandomTextureType extends TextureType<RandomTextureData> {}
  class RandomTextureType extends TextureType<RandomTextureData> {
    createSprite(context: SpriteCreationContext, data: RandomTextureData): TextureAtlasSprite;
    deserialize(json: JsonObject): RandomTextureData;
    getFrameSize(context: SpritePreparationContext, data: RandomTextureData): Pair<number, number>;
    static processQuad(quad: MutableQuad, pos: BlockPos, side: Direction, random: RandomSource, sprite: RandomTextureSprite): void;
    serialize(data: RandomTextureData): JsonObject;
  }

}

declare module 'com.supermartijn642.fusion.texture.types.scrolling' {
  import { TextureType, SpritePreparationContext, SpriteCreationContext } from 'com.supermartijn642.fusion.api.texture';
  import { ScrollingTextureData } from 'com.supermartijn642.fusion.api.texture.data';
  import { JsonObject } from 'com.google.gson';
  import { Pair } from 'com.supermartijn642.fusion.api.util';
  import { Integer } from 'java.lang';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';

  interface ScrollingTextureType extends TextureType<ScrollingTextureData> {}
  class ScrollingTextureType extends TextureType<ScrollingTextureData> {
    createSprite(context: SpriteCreationContext, data: ScrollingTextureData): TextureAtlasSprite;
    deserialize(json: JsonObject): ScrollingTextureData;
    getFrameSize(context: SpritePreparationContext, data: ScrollingTextureData): Pair<number, number>;
    serialize(data: ScrollingTextureData): JsonObject;
  }

}

declare module 'com.supermartijn642.fusion.texture.types' {
  import { TextureType, SpritePreparationContext, SpriteCreationContext } from 'com.supermartijn642.fusion.api.texture';
  import { Void, Integer } from 'java.lang';
  import { Pair } from 'com.supermartijn642.fusion.api.util';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { JsonObject } from 'com.google.gson';

  interface VanillaTextureType extends TextureType<Void> {}
  class VanillaTextureType extends TextureType<Void> {
    createSprite(context: SpriteCreationContext, data: Void): TextureAtlasSprite;
    deserialize(json: JsonObject): Void;
    getFrameSize(context: SpritePreparationContext, data: Void): Pair<number, number>;
    serialize(value: Void): JsonObject;
  }

}

declare module 'com.supermartijn642.fusion.util' {
  import { ResourceLocation } from 'net.minecraft.resources';

  class IdentifierUtil {
    static isValidIdentifier(namespace: string, path: string): boolean;
    static isValidIdentifier(identifier: string): boolean;
    static isValidNamespace(namespace: string): boolean;
    static isValidPath(path: string): boolean;
    static withFusionNamespace(identifier: string): ResourceLocation;
  }


  class TextureAtlases {
    static get blocks(): ResourceLocation;
  }

}