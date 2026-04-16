declare module 'com.yungnickyoung.minecraft.yungsapi.api.autoregister' {
  import { AutoRegisterEntry } from 'com.yungnickyoung.minecraft.yungsapi.autoregister';
  import { Block } from 'net.minecraft.world.level.block';
  import { Supplier } from 'java.util.function';
  import { Properties } from 'Item';
  import { WoodType } from 'net.minecraft.world.level.block.state.properties';
  import { BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { TriConsumer } from 'org.apache.logging.log4j.util';
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack, CommandBuildContext } from 'net.minecraft.commands';
  import { CommandSelection } from 'Commands';
  import { CreativeModeTab, ItemStack, Item } from 'net.minecraft.world.item';
  import { Builder } from 'com.yungnickyoung.minecraft.yungsapi.api.autoregister.AutoRegisterCreativeTab';
  import { Component } from 'net.minecraft.network.chat';
  import { DisplayItemsGenerator, Type } from 'CreativeModeTab';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { EntityType, Entity } from 'net.minecraft.world.entity';
  import { Builder as attributesupplier_Builder } from 'AttributeSupplier';
  import { MobEffect } from 'net.minecraft.world.effect';
  import { Holder } from 'net.minecraft.core';
  import { ParticleType, ParticleOptions, SimpleParticleType } from 'net.minecraft.core.particles';
  import { Potion } from 'net.minecraft.world.item.alchemy';
  import { SoundEvent } from 'net.minecraft.sounds';

  interface AutoRegisterBlock extends AutoRegisterEntry<Block> {}
  class AutoRegisterBlock extends AutoRegisterEntry<Block> {
    get fence(): Block;
    get fenceGate(): Block;
    get fenceGateWoodType(): WoodType;
    get itemProperties(): Supplier<Properties>;
    get slab(): Block;
    get stairs(): Block;
    get wall(): Block;
    hasFence(): boolean;
    hasFenceGate(): boolean;
    hasItemProperties(): boolean;
    hasSlab(): boolean;
    hasStairs(): boolean;
    hasWall(): boolean;
    static of(blockSupplier: Supplier<Block>): AutoRegisterBlock;
    set fence(fence: Block);
    set fenceGate(fenceGate: Block);
    set slab(slab: Block);
    set stairs(stairs: Block);
    set wall(wall: Block);
    withFence(): AutoRegisterBlock;
    withFenceGate(woodType: WoodType): AutoRegisterBlock;
    withItem(itemProperties: Supplier<Properties>): AutoRegisterBlock;
    withSlab(): AutoRegisterBlock;
    withStairs(): AutoRegisterBlock;
    withWall(): AutoRegisterBlock;
  }


  interface AutoRegisterBlockEntityType<T extends BlockEntity = any> extends AutoRegisterEntry<BlockEntityType> {}
  class AutoRegisterBlockEntityType<T extends BlockEntity = any> extends AutoRegisterEntry<BlockEntityType> {
    static of<U extends BlockEntity>(blockSupplier: Supplier<BlockEntityType<U>>): AutoRegisterBlockEntityType<U>;
  }


  class AutoRegisterCommand {
    invokeHandler(dispatcher: CommandDispatcher<CommandSourceStack>, context: CommandBuildContext, selection: CommandSelection): void;
    static of(handler: TriConsumer<CommandDispatcher<CommandSourceStack>, CommandBuildContext, CommandSelection>): AutoRegisterCommand;
  }


  interface AutoRegisterCreativeTab extends AutoRegisterEntry<CreativeModeTab> {}
  class AutoRegisterCreativeTab extends AutoRegisterEntry<CreativeModeTab> {
    alignedRight(): boolean;
    static builder(): Builder;
    canScroll(): boolean;
    get backgroundTexture(): ResourceLocation;
    get displayItemsGenerator(): DisplayItemsGenerator;
    get displayName(): Component;
    get iconItemStackSupplier(): Supplier<ItemStack>;
    get type(): Type;
    showTitle(): boolean;
  }


  interface AutoRegisterEntityType<T extends Entity = any> extends AutoRegisterEntry<EntityType> {}
  class AutoRegisterEntityType<T extends Entity = any> extends AutoRegisterEntry<EntityType> {
    attributes(attributesBuilderSupplier: Supplier<attributesupplier_Builder>): AutoRegisterEntityType<T>;
    get attributesSupplier(): Supplier<attributesupplier_Builder>;
    hasAttributes(): boolean;
    static of<U extends Entity>(entityTypeSupplier: Supplier<EntityType<U>>): AutoRegisterEntityType<U>;
  }


  interface AutoRegisterItem extends AutoRegisterEntry<Item> {}
  class AutoRegisterItem extends AutoRegisterEntry<Item> {
    static of(itemSupplier: Supplier<Item>): AutoRegisterItem;
  }


  interface AutoRegisterMobEffect extends AutoRegisterEntry<MobEffect> {}
  class AutoRegisterMobEffect extends AutoRegisterEntry<MobEffect> {
    get holder(): Holder<MobEffect>;
    static of(mobEffectSupplier: Supplier<MobEffect>): AutoRegisterMobEffect;
    set holder(holder: Holder<MobEffect>);
  }


  interface AutoRegisterParticleType<T extends ParticleOptions = any> extends AutoRegisterEntry<ParticleType> {}
  class AutoRegisterParticleType<T extends ParticleOptions = any> extends AutoRegisterEntry<ParticleType> {
    static of<U extends ParticleOptions>(particleTypeSupplier: Supplier<ParticleType<U>>): AutoRegisterParticleType<U>;
    static simple(): AutoRegisterParticleType<SimpleParticleType>;
    static simple(alwaysSpawn: boolean): AutoRegisterParticleType<SimpleParticleType>;
  }


  interface AutoRegisterPotion extends AutoRegisterEntry<Potion> {}
  class AutoRegisterPotion extends AutoRegisterEntry<Potion> {
    get holder(): Holder<Potion>;
    static of(potionSupplier: Supplier<Potion>): AutoRegisterPotion;
    set holder(holder: Holder<Potion>);
  }


  interface AutoRegisterSoundEvent extends AutoRegisterEntry<SoundEvent> {}
  class AutoRegisterSoundEvent extends AutoRegisterEntry<SoundEvent> {
    static create(): AutoRegisterSoundEvent;
  }


  class AutoRegisterUtils {
    static addCompostableItem(ingredient: Supplier<Item>, compostChance: number): void;
    static registerBrewingRecipe(inputPotion: Holder<Potion>, ingredient: Supplier<Item>, outputPotion: Holder<Potion>): void;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.api.autoregister.AutoRegisterBlockEntityType' {
  import { BlockEntitySupplier } from 'com.yungnickyoung.minecraft.yungsapi.api.autoregister.AutoRegisterBlockEntityType.Builder';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockEntity, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { Type } from 'com.mojang.datafixers.types';

  class Builder<T extends BlockEntity = any> {
    build(): BlockEntityType<T>;
    build(type: Type<any>): BlockEntityType<T>;
    get blocks(): Block[];
    get factory(): BlockEntitySupplier<T>;
    static of<T extends BlockEntity>(factory: BlockEntitySupplier<T>, ...blocks: Block[]): Builder<T>;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.api.autoregister.AutoRegisterBlockEntityType.Builder' {
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  class BlockEntitySupplier<T extends BlockEntity = any> {
    create(var1: BlockPos, var2: BlockState): T;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.api.autoregister.AutoRegisterCreativeTab' {
  import { Supplier } from 'java.util.function';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Component } from 'net.minecraft.network.chat';
  import { DisplayItemsGenerator } from 'CreativeModeTab';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { AutoRegisterCreativeTab } from 'com.yungnickyoung.minecraft.yungsapi.api.autoregister';

  class Builder {
    alignedRight(): Builder;
    backgroundTexture(backgroundTexture: ResourceLocation): Builder;
    build(): AutoRegisterCreativeTab;
    entries(displayItemsGenerator: DisplayItemsGenerator): Builder;
    hideTitle(): Builder;
    iconItem(iconItemStack: Supplier<ItemStack>): Builder;
    noScrollBar(): Builder;
    title(title: Component): Builder;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.api.autoregister.AutoRegisterEntityType' {
  import { EntityFactory } from 'EntityType';
  import { MobCategory, Entity, EntityAttachment, EntityType } from 'net.minecraft.world.entity';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Block } from 'net.minecraft.world.level.block';
  import { FeatureFlag } from 'net.minecraft.world.flag';

  class Builder<T extends Entity = any> {
    attach(attachment: EntityAttachment, x: number, y: number, z: number): Builder<T>;
    attach(attachment: EntityAttachment, attachPos: Vec3): Builder<T>;
    build(): EntityType<T>;
    build(s: string): EntityType<T>;
    canSpawnFarFromPlayer(): Builder<T>;
    clientTrackingRange(chunkRange: number): Builder<T>;
    eyeHeight(eyeHeight: number): Builder<T>;
    fireImmune(): Builder<T>;
    immuneTo(...blocks: Block[]): Builder<T>;
    nameTagOffset(offset: number): Builder<T>;
    noSave(): Builder<T>;
    noSummon(): Builder<T>;
    static of<T extends Entity>(entityFactory: EntityFactory<T>, mobCategory: MobCategory): Builder<T>;
    passengerAttachments(...attachments: number[]): Builder<T>;
    passengerAttachments(...attachments: Vec3[]): Builder<T>;
    requiredFeatures(...$$0: FeatureFlag[]): Builder<T>;
    ridingOffset(offset: number): Builder<T>;
    sized(width: number, height: number): Builder<T>;
    spawnDimensionsScale(scale: number): Builder<T>;
    updateInterval(interval: number): Builder<T>;
    vehicleAttachment(attachment: Vec3): Builder<T>;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.api.world.randomize' {
  import { Codec } from 'com.mojang.serialization';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Map, List, Random } from 'java.util';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Float } from 'java.lang';
  import { Entry } from 'com.yungnickyoung.minecraft.yungsapi.api.world.randomize.BlockStateRandomizer';
  import { RandomSource } from 'net.minecraft.util';
  import { StructureContext } from 'com.yungnickyoung.minecraft.yungsapi.world.structure.context';
  import { Entry as com_yungnickyoung_minecraft_yungsapi_api_world_randomize_itemrandomizer_Entry } from 'com.yungnickyoung.minecraft.yungsapi.api.world.randomize.ItemRandomizer';
  import { Item } from 'net.minecraft.world.item';

  class BlockStateRandomizer {
    static readonly CODEC: Codec;
    constructor(compoundTag: CompoundTag);

    constructor(entries: Map<BlockState, number>, defaultBlockState: BlockState);

    constructor(entries: Entry[], defaultBlockState: BlockState);

    constructor(defaultBlockState: BlockState);

    constructor();
    addBlock(blockState: BlockState, chance: number): BlockStateRandomizer;
    static from(...blockStates: BlockState[]): BlockStateRandomizer;
    get(random: Random): BlockState;
    get(randomSource: RandomSource): BlockState;
    get(randomSource: RandomSource, ctx: StructureContext): BlockState;
    get defaultBlockState(): BlockState;
    get entries(): Entry[];
    get entriesAsMap(): Map<BlockState, number>;
    saveTag(): CompoundTag;
    set defaultBlockState(blockState: BlockState);
  }


  class ItemRandomizer {
    static readonly CODEC: Codec;
    constructor(compoundTag: CompoundTag);

    constructor(entries: com_yungnickyoung_minecraft_yungsapi_api_world_randomize_itemrandomizer_Entry[], defaultItem: Item);

    constructor(defaultItem: Item);

    constructor();
    addItem(item: Item, chance: number): ItemRandomizer;
    static from(...items: Item[]): ItemRandomizer;
    get(random: Random): Item;
    get(randomSource: RandomSource): Item;
    get defaultItem(): Item;
    get entries(): com_yungnickyoung_minecraft_yungsapi_api_world_randomize_itemrandomizer_Entry[];
    get entriesAsMap(): Map<Item, number>;
    saveTag(): CompoundTag;
    set defaultItem(item: Item);
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.api.world.randomize.BlockStateRandomizer' {
  import { Codec } from 'com.mojang.serialization';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Optional } from 'java.util';
  import { StructureCondition } from 'com.yungnickyoung.minecraft.yungsapi.world.structure.condition';
  import { StructureContext } from 'com.yungnickyoung.minecraft.yungsapi.world.structure.context';

  class Entry {
    static CODEC: Codec;
    blockState: BlockState;
    probability: number;
    condition: Optional;
    constructor(blockState: BlockState, probability: number);

    constructor(blockState: BlockState, probability: number, condition: Optional<StructureCondition>);
    equals(obj: any): boolean;
    passesCondition(ctx: StructureContext): boolean;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.api.world.randomize.ItemRandomizer' {
  import { Codec } from 'com.mojang.serialization';
  import { Item } from 'net.minecraft.world.item';

  class Entry {
    static CODEC: Codec;
    item: Item;
    probability: number;
    constructor(item: Item, probability: number);
    equals(obj: any): boolean;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.api' {
  import { Optional } from 'java.util';
  import { GenerationStub, GenerationContext } from 'Structure';
  import { Holder, BlockPos } from 'net.minecraft.core';
  import { StructureTemplatePool, DimensionPadding } from 'net.minecraft.world.level.levelgen.structure.pools';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Types } from 'Heightmap';
  import { Integer } from 'java.lang';
  import { LiquidSettings } from 'net.minecraft.world.level.levelgen.structure.templatesystem';

  class YungAutoRegister {
    static scanPackageForAnnotations(packageName: string): void;
  }


  class YungJigsawManager {
    static assembleJigsawStructure(generationContext: GenerationContext, startPool: Holder<StructureTemplatePool>, startJigsawNameOptional: Optional<ResourceLocation>, maxDepth: number, startPos: BlockPos, useExpansionHack: boolean, projectStartToHeightmap: Optional<Types>, maxDistanceFromCenter: number, maxY: Optional<number>, minY: Optional<number>, dimensionPadding: DimensionPadding, liquidSettings: LiquidSettings): Optional<GenerationStub>;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.autoregister' {
  import { Supplier } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List } from 'java.util';

  class AutoRegisterEntry<T = any> {
    constructor(entrySupplier: Supplier<T>);
    get (): T;
    get supplier(): Supplier<T>;
    set supplier(entrySupplier: Supplier<T>);
  }


  class AutoRegisterField {
    object: any;
    name: ResourceLocation;
    processed: boolean;
    constructor(object: any, name: ResourceLocation);
    markProcessed(): void;
    object(): any;
    processed(): boolean;
  }


  class AutoRegisterFieldRouter {
    static queueField(registerData: AutoRegisterField): void;
  }


  class AutoRegistrationManager {
    static readonly STRUCTURE_TYPES: List;
    static readonly STRUCTURE_POOL_ELEMENT_TYPES: List;
    static readonly STRUCTURE_PROCESSOR_TYPES: List;
    static readonly STRUCTURE_PIECE_TYPES: List;
    static readonly STRUCTURE_PLACEMENT_TYPES: List;
    static readonly FEATURES: List;
    static readonly PLACEMENT_MODIFIER_TYPES: List;
    static readonly CRITERION_TRIGGERS: List;
    static readonly BLOCKS: List;
    static readonly ITEMS: List;
    static readonly BLOCK_ENTITY_TYPES: List;
    static readonly CREATIVE_MODE_TABS: List;
    static readonly ENTITY_TYPES: List;
    static readonly ENTITY_DATA_SERIALIZERS: List;
    static readonly MOB_EFFECTS: List;
    static readonly POTIONS: List;
    static readonly PARTICLE_TYPES: List;
    static readonly SOUND_EVENTS: List;
    static readonly COMMANDS: List;
    static initAutoRegPackage(packageName: string): void;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.codec' {
  import { Codec } from 'com.mojang.serialization';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  class CodecHelper {
    static BLOCKSTATE_STRING_CODEC: Codec;
    static blockStateFromString(blockStateString: string): BlockState;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.io' {
  import { Gson, GsonBuilder } from 'com.google.gson';
  import { Path } from 'java.nio.file';
  import { Class } from 'java.lang';

  class JSON {
    static gson: Gson;
    static createJsonFileFromObject(path: Path, object: any): void;
    static createJsonFileFromObject(path: Path, object: any, gson: Gson): void;
    static loadObjectFromJsonFile<T>(path: Path, objectClass: Class<T>): T;
    static loadObjectFromJsonFile<T>(path: Path, objectClass: Class<T>, gson: Gson): T;
    static newGsonBuilder(): GsonBuilder;
    static toJsonString(object: any): string;
    static toJsonString(object: any, gson: Gson): string;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.json' {
  import { TypeAdapter } from 'com.google.gson';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { JsonReader, JsonWriter } from 'com.google.gson.stream';
  import { BlockStateRandomizer, ItemRandomizer } from 'com.yungnickyoung.minecraft.yungsapi.api.world.randomize';
  import { Item } from 'net.minecraft.world.item';

  interface BlockStateAdapter extends TypeAdapter<BlockState> {}
  class BlockStateAdapter extends TypeAdapter<BlockState> {
    read(reader: JsonReader): BlockState;
    static resolveBlockState(fullString: string): BlockState;
    write(writer: JsonWriter, blockState: BlockState): void;
  }


  interface BlockStateRandomizerAdapter extends TypeAdapter<BlockStateRandomizer> {}
  class BlockStateRandomizerAdapter extends TypeAdapter<BlockStateRandomizer> {
    read(reader: JsonReader): BlockStateRandomizer;
    write(writer: JsonWriter, randomizer: BlockStateRandomizer): void;
  }


  interface ItemAdapter extends TypeAdapter<Item> {}
  class ItemAdapter extends TypeAdapter<Item> {
    read(reader: JsonReader): Item;
    static resolveItem(itemString: string): Item;
    write(writer: JsonWriter, item: Item): void;
  }


  interface ItemRandomizerAdapter extends TypeAdapter<ItemRandomizer> {}
  class ItemRandomizerAdapter extends TypeAdapter<ItemRandomizer> {
    read(reader: JsonReader): ItemRandomizer;
    write(writer: JsonWriter, randomizer: ItemRandomizer): void;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.math' {
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { Rotation } from 'net.minecraft.world.level.block';

  class ColPos {
    constructor();

    constructor(x: number, z: number);

    constructor(source: BlockPos);
    down(): ColPos;
    down(n: number): ColPos;
    east(): ColPos;
    east(n: number): ColPos;
    static fromBlockPos(blockPos: BlockPos): ColPos;
    static fromLong(packedPos: number): ColPos;
    get x(): number;
    get z(): number;
    north(): ColPos;
    north(n: number): ColPos;
    offset(facing: Direction): ColPos;
    offset(facing: Direction, n: number): ColPos;
    rotate(rotationIn: Rotation): ColPos;
    south(): ColPos;
    south(n: number): ColPos;
    toBlockPos(): BlockPos;
    toLong(): number;
    up(): ColPos;
    up(n: number): ColPos;
    west(): ColPos;
    west(n: number): ColPos;
  }


  class Vector2f {
    x: number;
    y: number;
    constructor(x: number, y: number);

    constructor(v: number[]);

    constructor(v1: Vector2f);
    dot(v1: Vector2f): number;
    length(): number;
    lengthSquared(): number;
  }


  class Vector3f {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);

    constructor(v: number[]);

    constructor(v1: Vector3f);
    dot(v1: Vector3f): number;
    length(): number;
    lengthSquared(): number;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.math.ColPos' {
  import { ColPos } from 'com.yungnickyoung.minecraft.yungsapi.math';
  import { BlockPos, Direction } from 'net.minecraft.core';

  interface Mutable extends ColPos {}
  class Mutable extends ColPos {
    constructor();

    constructor(source: BlockPos);

    constructor(pos: ColPos);

    constructor(x: number, z: number);
    move(facing: Direction, n: number): Mutable;
    move(facing: Direction): Mutable;
    set(x: number, z: number): Mutable;
    set(source: ColPos): Mutable;
    set(source: BlockPos): Mutable;
    setX(x: number): void;
    setZ(z: number): void;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.mixin.accessor' {
  import { ObjectListIterator } from 'it.unimi.dsi.fastutil.objects';
  import { Rigid } from 'Beardifier';
  import { JigsawJunction, StructurePoolElement } from 'net.minecraft.world.level.levelgen.structure.pools';
  import { Holder } from 'net.minecraft.core';
  import { PlacedFeature } from 'net.minecraft.world.level.levelgen.placement';
  import { List } from 'java.util';
  import { NoiseSettings } from 'net.minecraft.world.level.levelgen';
  import { StructureTemplate, StructureTemplateManager } from 'net.minecraft.world.level.levelgen.structure.templatesystem';
  import { Pair } from 'com.mojang.datafixers.util';
  import { Integer } from 'java.lang';

  class BeardifierAccessor {
    get junctionIterator(): ObjectListIterator<JigsawJunction>;
    get pieceIterator(): ObjectListIterator<Rigid>;
  }


  class BoundingBoxAccessor {
    setMaxX(var1: number): void;
    setMaxY(var1: number): void;
    setMaxZ(var1: number): void;
    setMinX(var1: number): void;
    setMinY(var1: number): void;
    setMinZ(var1: number): void;
  }


  class FeaturePoolElementAccessor {
    get feature(): Holder<PlacedFeature>;
  }


  class ListPoolElementAccessor {
    get elements(): StructurePoolElement[];
  }


  class NoiseChunkAccessor {
    get noiseSettings(): NoiseSettings;
  }


  class PotionAccessor {
    get name(): string;
    set name(var1: string);
  }


  class SinglePoolElementAccessor {
    callGetTemplate(var1: StructureTemplateManager): StructureTemplate;
  }


  class StructureTemplatePoolAccessor {
    get rawTemplates(): Pair<StructurePoolElement, number>[];
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.mixin' {
  import { EnhancedBeardifierData, EnhancedBeardifierRigid, EnhancedJigsawJunction } from 'com.yungnickyoung.minecraft.yungsapi.world.structure.terrainadaptation.beardifier';
  import { FunctionContext } from 'DensityFunction';
  import { CallbackInfoReturnable, CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Double } from 'java.lang';
  import { ObjectListIterator } from 'it.unimi.dsi.fastutil.objects';
  import { NoiseChunk } from 'net.minecraft.world.level.levelgen';
  import { BlockEntity, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { ItemStack } from 'net.minecraft.world.item';
  import { AquiferOverrideMaskSupplier, AquiferOverrideMask } from 'com.yungnickyoung.minecraft.yungsapi.world.structure.terrainadaptation.aquiferoverride';
  import { Supplier } from 'java.util.function';

  interface BeardifierMixin extends EnhancedBeardifierData {}
  class BeardifierMixin extends EnhancedBeardifierData {
    get enhancedJunctionIterator(): ObjectListIterator<EnhancedJigsawJunction>;
    get enhancedPieceIterator(): ObjectListIterator<EnhancedBeardifierRigid>;
    get noiseChunk(): NoiseChunk;
    set enhancedJunctionIterator(enhancedJunctionIterator: ObjectListIterator<EnhancedJigsawJunction>);
    set enhancedPieceIterator(enhancedPieceIterator: ObjectListIterator<EnhancedBeardifierRigid>);
    set noiseChunk(noiseChunk: NoiseChunk);
    yungsapi_calculateDensity(ctx: FunctionContext, cir: CallbackInfoReturnable<number>): void;
  }


  interface FixJukeboxCrashMixin extends BlockEntity {}
  class FixJukeboxCrashMixin extends BlockEntity {
    constructor($$0: BlockEntityType<any>, $$1: BlockPos, $$2: BlockState);
    yungsapi_checkIfLevelNull(itemStack: ItemStack, ci: CallbackInfo): void;
  }


  class IncreaseStructureWeightLimitMixinNeoForge {
  }


  class NoBasaltColumnsInStructuresMixin {
  }


  class NoDeltasInStructuresMixin {
  }


  interface NoiseChunkMixin extends AquiferOverrideMaskSupplier {}
  class NoiseChunkMixin extends AquiferOverrideMaskSupplier {
    blockX(): number;
    blockY(): number;
    blockZ(): number;
    getOrCreateAquiferOverrideMask(aquiferOverrideMaskSupplier: Supplier<AquiferOverrideMask>): AquiferOverrideMask;
  }


  class NoMagmaInStructuresMixin {
  }


  class NoVinesInStructuresMixin {
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.module' {
  import { List, Map } from 'java.util';
  import { Object2FloatMap } from 'it.unimi.dsi.fastutil.objects';
  import { StructurePlacementType } from 'net.minecraft.world.level.levelgen.structure.placement';
  import { StructurePoolElementType } from 'net.minecraft.world.level.levelgen.structure.pools';
  import { StructureType } from 'net.minecraft.world.level.levelgen.structure';
  import { TagKey } from 'net.minecraft.tags';

  class BlockEntityTypeModuleNeoForge {
    static processEntries(): void;
  }


  class BlockModuleNeoForge {
    static readonly EXTRA_BLOCKS: List;
    static processEntries(): void;
  }


  class CommandModuleNeoForge {
    static processEntries(): void;
  }


  class CompostModuleNeoForge {
    static readonly COMPOSTABLES: Object2FloatMap;
    static registerCompostables(): void;
  }


  class CreativeModeTabModuleNeoForge {
    static processEntries(): void;
  }


  class CriteriaModuleNeoForge {
    static processEntries(): void;
  }


  class EntityDataSerializerModuleNeoForge {
    static processEntries(): void;
  }


  class EntityTypeModuleNeoForge {
    static readonly ENTITY_ATTRIBUTES: Map;
    static processEntries(): void;
  }


  class FeatureModuleNeoForge {
    static processEntries(): void;
  }


  class ItemModuleNeoForge {
    static processEntries(): void;
  }


  class MobEffectModuleNeoForge {
    static processEntries(): void;
  }


  class ParticleTypeModuleNeoForge {
    static processEntries(): void;
  }


  class PlacementModifierTypeModuleNeoForge {
    static processEntries(): void;
  }


  class PostLoadModuleNeoForge {
    static METHODS: List;
    static init(): void;
  }


  class PotionModuleNeoForge {
    static readonly BREWING_RECIPES: List;
    static processEntries(): void;
  }


  class SoundEventModuleNeoForge {
    static processEntries(): void;
  }


  class StructurePieceTypeModuleNeoForge {
    static processEntries(): void;
  }


  class StructurePlacementTypeModule {
    static readonly ENHANCED_RANDOM_SPREAD: StructurePlacementType;
  }


  class StructurePlacementTypeModuleNeoForge {
    static processEntries(): void;
  }


  class StructurePoolElementTypeModule {
    static MAX_COUNT_SINGLE_ELEMENT: StructurePoolElementType;
    static MAX_COUNT_LEGACY_SINGLE_ELEMENT: StructurePoolElementType;
    static MAX_COUNT_FEATURE_ELEMENT: StructurePoolElementType;
    static MAX_COUNT_LIST_ELEMENT: StructurePoolElementType;
    static YUNG_SINGLE_ELEMENT: StructurePoolElementType;
    static YUNG_FEATURE_ELEMENT: StructurePoolElementType;
  }


  class StructurePoolElementTypeModuleForge {
    static processEntries(): void;
  }


  class StructureProcessorTypeModuleNeoForge {
    static processEntries(): void;
  }


  class StructureTypeModule {
    static YUNG_JIGSAW: StructureType;
  }


  class StructureTypeModuleNeoForge {
    static processEntries(): void;
  }


  class TagModule {
    static readonly NO_DELTA: TagKey;
    static readonly NO_BASALT: TagKey;
    static readonly NO_MAGMA: TagKey;
    static readonly NO_VINES: TagKey;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.noise' {
  import { Interp, NoiseType, FractalType, CellularDistanceFunction, CellularReturnType } from 'com.yungnickyoung.minecraft.yungsapi.noise.FastNoise';
  import { Vector3f, Vector2f } from 'com.yungnickyoung.minecraft.yungsapi.math';

  interface FastNoise extends INoiseLibrary {}
  class FastNoise extends INoiseLibrary {
    constructor();

    constructor(seed: number);
    GetCellular(x: number, y: number, z: number): number;
    GetCellular(x: number, y: number): number;
    GetCubic(x: number, y: number, z: number): number;
    GetCubic(x: number, y: number): number;
    GetCubicFractal(x: number, y: number, z: number): number;
    GetCubicFractal(x: number, y: number): number;
    static GetDecimalType(): number;
    GetNoise(x: number, y: number, z: number): number;
    GetNoise(x: number, y: number): number;
    GetPerlin(x: number, y: number, z: number): number;
    GetPerlin(x: number, y: number): number;
    GetPerlinFractal(x: number, y: number, z: number): number;
    GetPerlinFractal(x: number, y: number): number;
    GetSeed(): number;
    GetSimplex(x: number, y: number, z: number): number;
    GetSimplex(x: number, y: number): number;
    GetSimplex(x: number, y: number, z: number, w: number): number;
    GetSimplexFractal(x: number, y: number, z: number): number;
    GetSimplexFractal(x: number, y: number): number;
    GetValue(x: number, y: number, z: number): number;
    GetValue(x: number, y: number): number;
    GetValueFractal(x: number, y: number, z: number): number;
    GetValueFractal(x: number, y: number): number;
    GetWhiteNoise(x: number, y: number, z: number, w: number): number;
    GetWhiteNoise(x: number, y: number, z: number): number;
    GetWhiteNoise(x: number, y: number): number;
    GetWhiteNoiseInt(x: number, y: number, z: number, w: number): number;
    GetWhiteNoiseInt(x: number, y: number, z: number): number;
    GetWhiteNoiseInt(x: number, y: number): number;
    GradientPerturb(v3: Vector3f): void;
    GradientPerturb(v2: Vector2f): void;
    GradientPerturbFractal(v3: Vector3f): void;
    GradientPerturbFractal(v2: Vector2f): void;
    SetCellularDistanceFunction(cellularDistanceFunction: CellularDistanceFunction): void;
    SetCellularNoiseLookup(noise: FastNoise): void;
    SetCellularReturnType(cellularReturnType: CellularReturnType): void;
    SetFractalGain(gain: number): void;
    SetFractalLacunarity(lacunarity: number): void;
    SetFractalOctaves(octaves: number): void;
    SetFractalType(fractalType: FractalType): void;
    SetFrequency(frequency: number): void;
    SetGradientPerturbAmp(gradientPerturbAmp: number): void;
    SetInterp(interp: Interp): void;
    SetNoiseType(noiseType: NoiseType): void;
    SetSeed(seed: number): void;
  }


  class INoiseLibrary {
    GetNoise(var1: number, var2: number, var3: number): number;
  }


  interface OpenSimplex2S extends INoiseLibrary {}
  class OpenSimplex2S extends INoiseLibrary {
    static readonly N2: number;
    static readonly N3: number;
    constructor(seed: number);
    GetNoise(x: number, y: number, z: number): number;
    noise2(x: number, y: number): number;
    noise2_XBeforeY(x: number, y: number): number;
    noise3_Classic(x: number, y: number, z: number): number;
    noise3_XYBeforeZ(x: number, y: number, z: number): number;
    noise3_XZBeforeY(x: number, y: number, z: number): number;
    setFrequency(frequency: number): void;
    setGain(gain: number): void;
    setLacunarity(lacunarity: number): void;
    setOctaves(octaves: number): void;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.noise.FastNoise' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Interp extends Enum<Interp> {}
  class Interp extends Enum<Interp> {
    static readonly Linear: Interp;
    static readonly Hermite: Interp;
    static readonly Quintic: Interp;
    static valueOf(name: string): Interp;
    static values(): Interp[];
  }


  interface NoiseType extends Enum<NoiseType> {}
  class NoiseType extends Enum<NoiseType> {
    static readonly Value: NoiseType;
    static readonly ValueFractal: NoiseType;
    static readonly Perlin: NoiseType;
    static readonly PerlinFractal: NoiseType;
    static readonly Simplex: NoiseType;
    static readonly SimplexFractal: NoiseType;
    static readonly Cellular: NoiseType;
    static readonly WhiteNoise: NoiseType;
    static readonly Cubic: NoiseType;
    static readonly CubicFractal: NoiseType;
    static valueOf(name: string): NoiseType;
    static values(): NoiseType[];
  }


  interface FractalType extends Enum<FractalType> {}
  class FractalType extends Enum<FractalType> {
    static readonly FBM: FractalType;
    static readonly Billow: FractalType;
    static readonly RigidMulti: FractalType;
    static valueOf(name: string): FractalType;
    static values(): FractalType[];
  }


  interface CellularDistanceFunction extends Enum<CellularDistanceFunction> {}
  class CellularDistanceFunction extends Enum<CellularDistanceFunction> {
    static readonly Euclidean: CellularDistanceFunction;
    static readonly Manhattan: CellularDistanceFunction;
    static readonly Natural: CellularDistanceFunction;
    static valueOf(name: string): CellularDistanceFunction;
    static values(): CellularDistanceFunction[];
  }


  interface CellularReturnType extends Enum<CellularReturnType> {}
  class CellularReturnType extends Enum<CellularReturnType> {
    static readonly CellValue: CellularReturnType;
    static readonly NoiseLookup: CellularReturnType;
    static readonly Distance: CellularReturnType;
    static readonly Distance2: CellularReturnType;
    static readonly Distance2Add: CellularReturnType;
    static readonly Distance2Sub: CellularReturnType;
    static readonly Distance2Mul: CellularReturnType;
    static readonly Distance2Div: CellularReturnType;
    static valueOf(name: string): CellularReturnType;
    static values(): CellularReturnType[];
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.noise.OpenSimplex2S' {
  class Grad2 {
    constructor(dx: number, dy: number);
  }


  class Grad3 {
    constructor(dx: number, dy: number, dz: number);
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.services' {
  import { Holder } from 'net.minecraft.core';
  import { Potion } from 'net.minecraft.world.item.alchemy';
  import { Supplier } from 'java.util.function';
  import { Item } from 'net.minecraft.world.item';
  import { BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { Builder } from 'com.yungnickyoung.minecraft.yungsapi.api.autoregister.AutoRegisterBlockEntityType';
  import { Type } from 'com.mojang.datafixers.types';
  import { SimpleParticleType } from 'net.minecraft.core.particles';
  import { Class } from 'java.lang';

  class IAutoRegisterHelper {
    addCompostableItem(var1: Supplier<Item>, var2: number): void;
    collectAllAutoRegisterFieldsInPackage(var1: string): void;
    invokeAllAutoRegisterMethods(var1: string): void;
    processQueuedAutoRegEntries(): void;
    registerBrewingRecipe(var1: Holder<Potion>, var2: Supplier<Item>, var3: Holder<Potion>): void;
  }


  class IBlockEntityTypeHelper {
    build<T extends BlockEntity>(var1: Builder<T>, var2: Type<any>): BlockEntityType<T>;
  }


  class IParticleTypeHelper {
    simple(var1: boolean): SimpleParticleType;
  }


  class IPlatformHelper {
    get platformName(): string;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(var1: string): boolean;
  }


  interface NeoForgeAutoRegisterHelper extends IAutoRegisterHelper {}
  class NeoForgeAutoRegisterHelper extends IAutoRegisterHelper {
    addCompostableItem(ingredient: Supplier<Item>, compostChance: number): void;
    collectAllAutoRegisterFieldsInPackage(packageName: string): void;
    invokeAllAutoRegisterMethods(packageName: string): void;
    processQueuedAutoRegEntries(): void;
    registerBrewingRecipe(inputPotion: Holder<Potion>, ingredient: Supplier<Item>, outputPotion: Holder<Potion>): void;
  }


  interface NeoForgeBlockEntityTypeHelper extends IBlockEntityTypeHelper {}
  class NeoForgeBlockEntityTypeHelper extends IBlockEntityTypeHelper {
    build<T extends BlockEntity>(builder: Builder<T>, type: Type<any>): BlockEntityType<T>;
  }


  interface NeoForgeParticleTypeHelper extends IParticleTypeHelper {}
  class NeoForgeParticleTypeHelper extends IParticleTypeHelper {
    simple(alwaysSpawn: boolean): SimpleParticleType;
  }


  interface NeoForgePlatformHelper extends IPlatformHelper {}
  class NeoForgePlatformHelper extends IPlatformHelper {
    get platformName(): string;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(modId: string): boolean;
  }


  class Services {
    static readonly PLATFORM: IPlatformHelper;
    static readonly AUTO_REGISTER: IAutoRegisterHelper;
    static readonly BLOCK_ENTITY_TYPE_HELPER: IBlockEntityTypeHelper;
    static readonly PARTICLE_HELPER: IParticleTypeHelper;
    static load<T>(clazz: Class<T>): T;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.util' {
  import { AABB } from 'net.minecraft.world.phys';
  import { WorldGenRegion } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { TagKey } from 'net.minecraft.tags';
  import { Structure } from 'net.minecraft.world.level.levelgen.structure';

  class BoxOctree {
    constructor(axisAlignedBB: AABB);
    addBox(axisAlignedBB: AABB): void;
    boundaryContains(axisAlignedBB: AABB): boolean;
    boundaryIntersectsFuzzy(axisAlignedBB: AABB): boolean;
    intersectsAnyBox(axisAlignedBB: AABB): boolean;
    removeBox(axisAlignedBB: AABB): void;
  }


  class MixinUtils {
    static isPositionInTaggedStructure(worldGenRegion: WorldGenRegion, pos: BlockPos, structureTagKey: TagKey<Structure>): boolean;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.world.banner' {
  import { List } from 'java.util';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ResourceKey } from 'net.minecraft.resources';
  import { BannerPattern } from 'net.minecraft.world.level.block.entity';
  import { DyeColor } from 'net.minecraft.world.item';

  class Banner {
    constructor(patterns: ColoredBannerPattern[], state: BlockState, nbt: CompoundTag);

    constructor(patterns: ColoredBannerPattern[], state: BlockState, nbt: CompoundTag, isWallBanner: boolean);
    get nbt(): CompoundTag;
    get patterns(): ColoredBannerPattern[];
    get state(): BlockState;
    isWallBanner(): boolean;
    set nbt(nbt: CompoundTag);
    set patterns(patterns: ColoredBannerPattern[]);
    set state(state: BlockState);
    setWallBanner(wallBanner: boolean): void;
  }


  class ColoredBannerPattern {
    constructor(pattern: ResourceKey<BannerPattern>, color: DyeColor);
    get color(): DyeColor;
    get pattern(): ResourceKey<BannerPattern>;
    set color(color: DyeColor);
    set pattern(pattern: ResourceKey<BannerPattern>);
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.world.banner.Banner' {
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { ColoredBannerPattern, Banner } from 'com.yungnickyoung.minecraft.yungsapi.world.banner';
  import { ResourceKey } from 'net.minecraft.resources';
  import { BannerPattern } from 'net.minecraft.world.level.block.entity';
  import { DyeColor } from 'net.minecraft.world.item';

  class Builder {
    blockState(state: BlockState): Builder;
    build(): Banner;
    customColor(colorString: string): Builder;
    customName(translatableNamePath: string): Builder;
    pattern(pattern: ColoredBannerPattern): Builder;
    pattern(pattern: ResourceKey<BannerPattern>, color: DyeColor): Builder;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.world.spawner' {
  import { SimpleWeightedRandomList } from 'net.minecraft.util.random';
  import { SpawnData } from 'net.minecraft.world.level';
  import { Builder } from 'com.yungnickyoung.minecraft.yungsapi.world.spawner.MobSpawnerData';
  import { CompoundTag } from 'net.minecraft.nbt';

  class MobSpawnerData {
    readonly spawnDelay: number;
    readonly spawnPotentials: SimpleWeightedRandomList;
    readonly nextSpawnData: SpawnData;
    readonly minSpawnDelay: number;
    readonly maxSpawnDelay: number;
    readonly spawnCount: number;
    readonly maxNearbyEntities: number;
    readonly requiredPlayerRange: number;
    readonly spawnRange: number;
    constructor(builder: Builder);
    static builder(): Builder;
    save(): CompoundTag;
    save(compoundTag: CompoundTag): CompoundTag;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.world.spawner.MobSpawnerData' {
  import { MobSpawnerData } from 'com.yungnickyoung.minecraft.yungsapi.world.spawner';
  import { SimpleWeightedRandomList } from 'net.minecraft.util.random';
  import { SpawnData } from 'net.minecraft.world.level';
  import { EntityType } from 'net.minecraft.world.entity';

  class Builder {
    build(): MobSpawnerData;
    maxNearbyEntities(maxNearbyEntities: number): Builder;
    maxSpawnDelay(maxSpawnDelay: number): Builder;
    minSpawnDelay(minSpawnDelay: number): Builder;
    requiredPlayerRange(requiredPlayerRange: number): Builder;
    setEntityType(entityType: EntityType<any>): Builder;
    spawnCount(spawnCount: number): Builder;
    spawnDelay(spawnDelay: number): Builder;
    spawnPotentials(spawnPotentials: SimpleWeightedRandomList<SpawnData>): Builder;
    spawnRange(spawnRange: number): Builder;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.world.structure.action' {
  import { MapCodec, Codec } from 'com.mojang.serialization';
  import { StructureContext } from 'com.yungnickyoung.minecraft.yungsapi.world.structure.context';
  import { PieceEntry } from 'com.yungnickyoung.minecraft.yungsapi.world.structure.jigsaw';
  import { Map, List } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Either } from 'com.mojang.datafixers.util';
  import { StructureTemplate } from 'net.minecraft.world.level.levelgen.structure.templatesystem';

  interface DelayGenerationAction extends StructureAction {}
  class DelayGenerationAction extends StructureAction {
    static readonly CODEC: MapCodec;
    apply(ctx: StructureContext, targetPieceEntry: PieceEntry): void;
    type(): StructureActionType<any>;
  }


  class StructureAction {
    apply(var1: StructureContext, var2: PieceEntry): void;
    type(): StructureActionType<any>;
  }


  class StructureActionType<C extends StructureAction = any> {
    static readonly ACTION_TYPES_BY_NAME: Map;
    static readonly NAME_BY_ACTION_TYPES: Map;
    static readonly ACTION_TYPE_CODEC: Codec;
    static readonly ACTION_CODEC: Codec;
    static readonly TRANSFORM: StructureActionType;
    static readonly DELAY_GENERATION: StructureActionType;
    codec(): MapCodec<C>;
    static register<C extends StructureAction>(resourceLocation: ResourceLocation, codec: MapCodec<C>): StructureActionType<C>;
  }


  interface TransformAction extends StructureAction {}
  class TransformAction extends StructureAction {
    static readonly CODEC: MapCodec;
    constructor(output: Either<ResourceLocation, StructureTemplate>[], xOffset: number, yOffset: number, zOffset: number);
    apply(ctx: StructureContext, targetPieceEntry: PieceEntry): void;
    type(): StructureActionType<any>;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.world.structure.condition' {
  import { MapCodec, Codec } from 'com.mojang.serialization';
  import { List, Optional, Map } from 'java.util';
  import { StructureContext } from 'com.yungnickyoung.minecraft.yungsapi.world.structure.context';
  import { Double, Integer } from 'java.lang';
  import { TagKey } from 'net.minecraft.tags';
  import { BlockPos } from 'net.minecraft.core';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Rotation } from 'net.minecraft.world.level.block';

  interface AllOfCondition extends StructureCondition {}
  class AllOfCondition extends StructureCondition {
    static readonly CODEC: MapCodec;
    constructor(conditions: StructureCondition[]);
    passes(ctx: StructureContext): boolean;
    type(): StructureConditionType<any>;
  }


  interface AltitudeCondition extends StructureCondition {}
  class AltitudeCondition extends StructureCondition {
    static readonly CODEC: MapCodec;
    constructor(bottomCutoffY: Optional<number>, topCutoffY: Optional<number>);
    passes(ctx: StructureContext): boolean;
    type(): StructureConditionType<any>;
  }


  interface AlwaysTrueCondition extends StructureCondition {}
  class AlwaysTrueCondition extends StructureCondition {
    static readonly CODEC: MapCodec;
    passes(ctx: StructureContext): boolean;
    type(): StructureConditionType<any>;
  }


  interface AnyOfCondition extends StructureCondition {}
  class AnyOfCondition extends StructureCondition {
    static readonly CODEC: MapCodec;
    constructor(conditions: StructureCondition[]);
    passes(ctx: StructureContext): boolean;
    type(): StructureConditionType<any>;
  }


  interface BiomeCondition extends StructureCondition {}
  class BiomeCondition extends StructureCondition {
    static readonly CODEC: MapCodec;
    readonly biomeTag: TagKey;
    readonly offset: BlockPos;
    constructor(biome: TagKey<Biome>, offset: BlockPos);
    passes(ctx: StructureContext): boolean;
    type(): StructureConditionType<any>;
  }


  interface DepthCondition extends StructureCondition {}
  class DepthCondition extends StructureCondition {
    static readonly CODEC: MapCodec;
    readonly minRequiredDepth: Optional;
    readonly maxPossibleDepth: Optional;
    constructor(minRequiredDepth: Optional<number>, maxPossibleDepth: Optional<number>);
    passes(ctx: StructureContext): boolean;
    type(): StructureConditionType<any>;
  }


  interface ModLoadedCondition extends StructureCondition {}
  class ModLoadedCondition extends StructureCondition {
    static readonly CODEC: MapCodec;
    constructor(modId: string);
    passes(ctx: StructureContext): boolean;
    type(): StructureConditionType<any>;
  }


  interface ModLoaderCondition extends StructureCondition {}
  class ModLoaderCondition extends StructureCondition {
    static readonly CODEC: MapCodec;
    constructor(validLoaders: string[]);
    passes(ctx: StructureContext): boolean;
    type(): StructureConditionType<any>;
  }


  interface NotCondition extends StructureCondition {}
  class NotCondition extends StructureCondition {
    static readonly CODEC: MapCodec;
    constructor(condition: StructureCondition);
    passes(ctx: StructureContext): boolean;
    type(): StructureConditionType<any>;
  }


  interface PieceInHorizontalDirectionCondition extends StructureCondition {}
  class PieceInHorizontalDirectionCondition extends StructureCondition {
    static readonly CODEC: MapCodec;
    constructor(pieces: ResourceLocation[], range: number, rotation: Rotation);
    passes(ctx: StructureContext): boolean;
    type(): StructureConditionType<any>;
  }


  interface PieceInRangeCondition extends StructureCondition {}
  class PieceInRangeCondition extends StructureCondition {
    static readonly CODEC: MapCodec;
    constructor(pieces: ResourceLocation[], aboveRange: number, horizontalRange: number, belowRange: number);
    passes(ctx: StructureContext): boolean;
    type(): StructureConditionType<any>;
  }


  interface RandomChanceCondition extends StructureCondition {}
  class RandomChanceCondition extends StructureCondition {
    static readonly CODEC: MapCodec;
    readonly chance: number;
    constructor(chance: number);
    passes(ctx: StructureContext): boolean;
    type(): StructureConditionType<any>;
  }


  interface RotationCondition extends StructureCondition {}
  class RotationCondition extends StructureCondition {
    static readonly CODEC: MapCodec;
    constructor(validRotations: Rotation[]);
    passes(ctx: StructureContext): boolean;
    type(): StructureConditionType<any>;
  }


  class StructureCondition {
    static readonly ALWAYS_TRUE: StructureCondition;
    passes(var1: StructureContext): boolean;
    type(): StructureConditionType<any>;
  }


  class StructureConditionType<C extends StructureCondition = any> {
    static readonly CONDITION_TYPES_BY_NAME: Map;
    static readonly NAME_BY_CONDITION_TYPES: Map;
    static readonly CONDITION_TYPE_CODEC: Codec;
    static readonly CONDITION_CODEC: Codec;
    static readonly ALWAYS_TRUE: StructureConditionType;
    static readonly ANY_OF: StructureConditionType;
    static readonly ALL_OF: StructureConditionType;
    static readonly NOT: StructureConditionType;
    static readonly ALTITUDE: StructureConditionType;
    static readonly DEPTH: StructureConditionType;
    static readonly RANDOM_CHANCE: StructureConditionType;
    static readonly PIECE_IN_RANGE: StructureConditionType;
    static readonly MOD_LOADER: StructureConditionType;
    static readonly MOD_LOADED: StructureConditionType;
    static readonly PIECE_IN_HORIZONTAL_DIRECTION: StructureConditionType;
    static readonly ROTATION: StructureConditionType;
    static readonly BIOME: StructureConditionType;
    codec(): MapCodec<C>;
    static register<C extends StructureCondition>(resourceLocation: ResourceLocation, codec: MapCodec<C>): StructureConditionType<C>;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.world.structure.context' {
  import { BlockPos } from 'net.minecraft.core';
  import { Rotation } from 'net.minecraft.world.level.block';
  import { StructureTemplateManager } from 'net.minecraft.world.level.levelgen.structure.templatesystem';
  import { List } from 'java.util';
  import { PieceEntry } from 'com.yungnickyoung.minecraft.yungsapi.world.structure.jigsaw';
  import { RandomSource } from 'net.minecraft.util';
  import { RandomState } from 'net.minecraft.world.level.levelgen';
  import { BiomeSource } from 'net.minecraft.world.level.biome';

  class StructureContext {
    biomeSource(): BiomeSource;
    depth(): number;
    pieceEntry(): PieceEntry;
    pieceMaxY(): number;
    pieceMinY(): number;
    pieces(): PieceEntry[];
    pos(): BlockPos;
    random(): RandomSource;
    randomState(): RandomState;
    rotation(): Rotation;
    structureTemplateManager(): StructureTemplateManager;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.world.structure.context.StructureContext' {
  import { BlockPos } from 'net.minecraft.core';
  import { Rotation } from 'net.minecraft.world.level.block';
  import { StructureTemplateManager } from 'net.minecraft.world.level.levelgen.structure.templatesystem';
  import { List } from 'java.util';
  import { PieceEntry } from 'com.yungnickyoung.minecraft.yungsapi.world.structure.jigsaw';
  import { RandomSource } from 'net.minecraft.util';
  import { RandomState } from 'net.minecraft.world.level.levelgen';
  import { BiomeSource } from 'net.minecraft.world.level.biome';
  import { StructureContext } from 'com.yungnickyoung.minecraft.yungsapi.world.structure.context';

  class Builder {
    biomeSource(biomeSource: BiomeSource): Builder;
    build(): StructureContext;
    depth(depth: number): Builder;
    pieceEntry(pieceEntry: PieceEntry): Builder;
    pieceMaxY(pieceMaxY: number): Builder;
    pieceMinY(pieceMinY: number): Builder;
    pieces(pieces: PieceEntry[]): Builder;
    pos(pos: BlockPos): Builder;
    random(random: RandomSource): Builder;
    randomState(randomState: RandomState): Builder;
    rotation(rotation: Rotation): Builder;
    structureTemplateManager(structureTemplateManager: StructureTemplateManager): Builder;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.world.structure.exclusion' {
  import { Codec } from 'com.mojang.serialization';
  import { HolderSet } from 'net.minecraft.core';
  import { StructureSet } from 'net.minecraft.world.level.levelgen.structure';
  import { ChunkGeneratorStructureState } from 'net.minecraft.world.level.chunk';

  class EnhancedExclusionZone {
    static readonly CODEC: Codec;
    constructor(otherSet: HolderSet<StructureSet>, chunkCount: number);
    isPlacementForbidden(chunkGeneratorStructureState: ChunkGeneratorStructureState, x: number, z: number): boolean;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.world.structure.jigsaw.assembler' {
  import { Deque } from 'java.util';
  import { Settings } from 'com.yungnickyoung.minecraft.yungsapi.world.structure.jigsaw.assembler.JigsawStructureAssembler';
  import { PoolElementStructurePiece } from 'net.minecraft.world.level.levelgen.structure';
  import { BoxOctree } from 'com.yungnickyoung.minecraft.yungsapi.util';
  import { StructurePiecesBuilder } from 'net.minecraft.world.level.levelgen.structure.pieces';
  import { ObjectArrayList } from 'it.unimi.dsi.fastutil.objects';
  import { StructureBlockInfo } from 'StructureTemplate';
  import { BlockPos } from 'net.minecraft.core';
  import { MutableObject } from 'org.apache.commons.lang3.mutable';
  import { PieceEntry } from 'com.yungnickyoung.minecraft.yungsapi.world.structure.jigsaw';
  import { Pair } from 'com.mojang.datafixers.util';
  import { StructurePoolElement } from 'net.minecraft.world.level.levelgen.structure.pools';
  import { Integer } from 'java.lang';

  class JigsawStructureAssembler {
    unprocessedPieceEntries: Deque;
    constructor(settings: Settings);
    addAllPiecesToStructureBuilder(structurePiecesBuilder: StructurePiecesBuilder): void;
    assembleStructure(startPiece: PoolElementStructurePiece, structureBounds: BoxOctree): void;
  }


  class PieceContext {
    candidatePoolElements: ObjectArrayList;
    jigsawBlock: StructureBlockInfo;
    jigsawBlockTargetPos: BlockPos;
    pieceMinY: number;
    jigsawBlockPos: BlockPos;
    boxOctree: MutableObject;
    pieceEntry: PieceEntry;
    depth: number;
    constructor(candidatePoolElements: ObjectArrayList<Pair<StructurePoolElement, number>>, jigsawBlock: StructureBlockInfo, jigsawBlockTargetPos: BlockPos, pieceMinY: number, jigsawBlockPos: BlockPos, boxOctree: MutableObject<BoxOctree>, pieceEntry: PieceEntry, depth: number);
    copy(): PieceContext;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.world.structure.jigsaw.assembler.JigsawStructureAssembler' {
  import { RandomState } from 'net.minecraft.world.level.levelgen';
  import { Registry } from 'net.minecraft.core';
  import { StructureTemplatePool, DimensionPadding } from 'net.minecraft.world.level.levelgen.structure.pools';
  import { ChunkGenerator } from 'net.minecraft.world.level.chunk';
  import { StructureTemplateManager, LiquidSettings } from 'net.minecraft.world.level.levelgen.structure.templatesystem';
  import { RandomSource } from 'net.minecraft.util';
  import { LevelHeightAccessor } from 'net.minecraft.world.level';
  import { Optional } from 'java.util';
  import { Integer } from 'java.lang';
  import { BiomeSource } from 'net.minecraft.world.level.biome';

  class Settings {
    randomState: RandomState;
    biomeSource(biomeSource: BiomeSource): Settings;
    chunkGenerator(chunkGenerator: ChunkGenerator): Settings;
    dimensionPadding(dimensionPadding: DimensionPadding): Settings;
    isInBounds(y: number): boolean;
    levelHeightAccessor(levelHeightAccessor: LevelHeightAccessor): Settings;
    liquidSettings(liquidSettings: LiquidSettings): Settings;
    maxDepth(maxDepth: number): Settings;
    maxY(maxY: Optional<number>): Settings;
    minY(minY: Optional<number>): Settings;
    poolRegistry(poolRegistry: Registry<StructureTemplatePool>): Settings;
    rand(rand: RandomSource): Settings;
    randomState(randomState: RandomState): Settings;
    structureTemplateManager(structureTemplateManager: StructureTemplateManager): Settings;
    useExpansionHack(useExpansionHack: boolean): Settings;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.world.structure.jigsaw.element' {
  import { FeaturePoolElement, StructurePoolElementType, LegacySinglePoolElement, ListPoolElement, StructurePoolElement, SinglePoolElement } from 'net.minecraft.world.level.levelgen.structure.pools';
  import { MapCodec } from 'com.mojang.serialization';
  import { Holder, Vec3i, BlockPos } from 'net.minecraft.core';
  import { PlacedFeature } from 'net.minecraft.world.level.levelgen.placement';
  import { Projection } from 'StructureTemplatePool';
  import { Either } from 'com.mojang.datafixers.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { StructureTemplate, StructureProcessorList, LiquidSettings, StructureTemplateManager } from 'net.minecraft.world.level.levelgen.structure.templatesystem';
  import { Optional, List } from 'java.util';
  import { Integer, Boolean } from 'java.lang';
  import { StructureCondition } from 'com.yungnickyoung.minecraft.yungsapi.world.structure.condition';
  import { EnhancedTerrainAdaptation } from 'com.yungnickyoung.minecraft.yungsapi.world.structure.terrainadaptation.adaptations';
  import { Rotation } from 'net.minecraft.world.level.block';
  import { StructureBlockInfo } from 'StructureTemplate';
  import { RandomSource } from 'net.minecraft.util';
  import { BoundingBox } from 'net.minecraft.world.level.levelgen.structure';
  import { WorldGenLevel, StructureManager } from 'net.minecraft.world.level';
  import { ChunkGenerator } from 'net.minecraft.world.level.chunk';
  import { StructureContext } from 'com.yungnickyoung.minecraft.yungsapi.world.structure.context';
  import { RecordCodecBuilder } from 'com.mojang.serialization.codecs';
  import { StructureModifier } from 'com.yungnickyoung.minecraft.yungsapi.world.structure.modifier';

  class IMaxCountJigsawPoolElement {
    get maxCount(): number;
    get name(): string;
  }


  interface MaxCountFeaturePoolElement extends IMaxCountJigsawPoolElement, FeaturePoolElement {}
  class MaxCountFeaturePoolElement extends IMaxCountJigsawPoolElement {
    static readonly CODEC: MapCodec;
    constructor(feature: Holder<PlacedFeature>, projection: Projection, name: string, maxCount: number);
    get maxCount(): number;
    get name(): string;
    get type(): StructurePoolElementType<any>;
    toString(): string;
  }


  interface MaxCountLegacySinglePoolElement extends IMaxCountJigsawPoolElement, LegacySinglePoolElement {}
  class MaxCountLegacySinglePoolElement extends IMaxCountJigsawPoolElement {
    static readonly CODEC: MapCodec;
    constructor(resourceLocation: Either<ResourceLocation, StructureTemplate>, processors: Holder<StructureProcessorList>, projection: Projection, liquidSettings: Optional<LiquidSettings>, name: string, maxCount: number);
    get maxCount(): number;
    get name(): string;
    get type(): StructurePoolElementType<any>;
    toString(): string;
  }


  interface MaxCountListPoolElement extends IMaxCountJigsawPoolElement, ListPoolElement {}
  class MaxCountListPoolElement extends IMaxCountJigsawPoolElement {
    static readonly CODEC: MapCodec;
    constructor(elements: StructurePoolElement[], projection: Projection, name: string, maxCount: number);
    get maxCount(): number;
    get name(): string;
    get type(): StructurePoolElementType<any>;
    toString(): string;
  }


  interface MaxCountSinglePoolElement extends IMaxCountJigsawPoolElement, SinglePoolElement {}
  class MaxCountSinglePoolElement extends IMaxCountJigsawPoolElement {
    static readonly CODEC: MapCodec;
    constructor(resourceLocation: Either<ResourceLocation, StructureTemplate>, processors: Holder<StructureProcessorList>, projection: Projection, liquidSettings: Optional<LiquidSettings>, name: string, maxCount: number);
    get maxCount(): number;
    get name(): string;
    get type(): StructurePoolElementType<any>;
    toString(): string;
  }


  interface YungJigsawFeatureElement extends YungJigsawPoolElement {}
  class YungJigsawFeatureElement extends YungJigsawPoolElement {
    static readonly CODEC: MapCodec;
    constructor(feature: Holder<PlacedFeature>, projection: Projection, name: Optional<string>, maxCount: Optional<number>, minRequiredDepth: Optional<number>, maxPossibleDepth: Optional<number>, isPriority: boolean, ignoreBounds: boolean, condition: StructureCondition, enhancedTerrainAdaptation: Optional<EnhancedTerrainAdaptation>);
    get type(): StructurePoolElementType<any>;
    getBoundingBox(structureTemplateManager: StructureTemplateManager, blockPos: BlockPos, rotation: Rotation): BoundingBox;
    getShuffledJigsawBlocks(structureTemplateManager: StructureTemplateManager, blockPos: BlockPos, rotation: Rotation, randomSource: RandomSource): StructureBlockInfo[];
    getSize(structureTemplateManager: StructureTemplateManager, rotation: Rotation): Vec3i;
    place(structureTemplateManager: StructureTemplateManager, worldGenLevel: WorldGenLevel, structureManager: StructureManager, chunkGenerator: ChunkGenerator, pos: BlockPos, pivotPos: BlockPos, rotation: Rotation, boundingBox: BoundingBox, randomSource: RandomSource, liquidSettings: LiquidSettings, replaceJigsaws: boolean): boolean;
    toString(): string;
  }


  interface YungJigsawPoolElement extends StructurePoolElement {}
  class YungJigsawPoolElement extends StructurePoolElement {
    readonly name: Optional;
    readonly maxCount: Optional;
    readonly minRequiredDepth: Optional;
    readonly maxPossibleDepth: Optional;
    readonly isPriority: boolean;
    readonly ignoreBounds: boolean;
    readonly condition: StructureCondition;
    readonly enhancedTerrainAdaptation: Optional;
    constructor(projection: Projection, name: Optional<string>, maxCount: Optional<number>, minRequiredDepth: Optional<number>, maxPossibleDepth: Optional<number>, isPriority: boolean, ignoreBounds: boolean, condition: StructureCondition, enhancedTerrainAdaptation: Optional<EnhancedTerrainAdaptation>);
    static conditionCodec<E extends YungJigsawPoolElement>(): RecordCodecBuilder<E, StructureCondition>;
    static enhancedTerrainAdaptationCodec<E extends YungJigsawPoolElement>(): RecordCodecBuilder<E, Optional<EnhancedTerrainAdaptation>>;
    get condition(): StructureCondition;
    get enhancedTerrainAdaptation(): Optional<EnhancedTerrainAdaptation>;
    get maxCount(): Optional<number>;
    get maxPossibleDepth(): Optional<number>;
    get minRequiredDepth(): Optional<number>;
    get name(): Optional<string>;
    static ignoreBoundsCodec<E extends YungJigsawPoolElement>(): RecordCodecBuilder<E, boolean>;
    ignoresBounds(): boolean;
    isAtValidDepth(depth: number): boolean;
    static isPriorityCodec<E extends YungJigsawPoolElement>(): RecordCodecBuilder<E, boolean>;
    isPriorityPiece(): boolean;
    static maxCountCodec<E extends YungJigsawPoolElement>(): RecordCodecBuilder<E, Optional<number>>;
    static maxPossibleDepthCodec<E extends YungJigsawPoolElement>(): RecordCodecBuilder<E, Optional<number>>;
    static minRequiredDepthCodec<E extends YungJigsawPoolElement>(): RecordCodecBuilder<E, Optional<number>>;
    static nameCodec<E extends YungJigsawPoolElement>(): RecordCodecBuilder<E, Optional<string>>;
    passesConditions(ctx: StructureContext): boolean;
  }


  interface YungJigsawSinglePoolElement extends YungJigsawPoolElement {}
  class YungJigsawSinglePoolElement extends YungJigsawPoolElement {
    static readonly CODEC: MapCodec;
    readonly template: Either;
    readonly processors: Holder;
    readonly overrideLiquidSettings: Optional;
    readonly deadendPool: Optional;
    readonly modifiers: List;
    constructor(template: Either<ResourceLocation, StructureTemplate>, processors: Holder<StructureProcessorList>, projection: Projection, overrideLiquidSettings: Optional<LiquidSettings>, name: Optional<string>, maxCount: Optional<number>, minRequiredDepth: Optional<number>, maxPossibleDepth: Optional<number>, isPriority: boolean, ignoreBounds: boolean, condition: StructureCondition, enhancedTerrainAdaptation: Optional<EnhancedTerrainAdaptation>, deadendPool: Optional<ResourceLocation>, modifiers: StructureModifier[]);
    get deadendPool(): Optional<ResourceLocation>;
    get type(): StructurePoolElementType<any>;
    getBoundingBox(structureTemplateManager: StructureTemplateManager, blockPos: BlockPos, rotation: Rotation): BoundingBox;
    getShuffledJigsawBlocks(structureTemplateManager: StructureTemplateManager, blockPos: BlockPos, rotation: Rotation, randomSource: RandomSource): StructureBlockInfo[];
    getSize(structureTemplateManager: StructureTemplateManager, rotation: Rotation): Vec3i;
    getTemplate(structureTemplateManager: StructureTemplateManager): StructureTemplate;
    hasModifiers(): boolean;
    static overrideLiquidSettingsCodec<E extends YungJigsawSinglePoolElement>(): RecordCodecBuilder<E, Optional<LiquidSettings>>;
    place(structureTemplateManager: StructureTemplateManager, worldGenLevel: WorldGenLevel, structureManager: StructureManager, chunkGenerator: ChunkGenerator, pos: BlockPos, pivotPos: BlockPos, rotation: Rotation, boundingBox: BoundingBox, randomSource: RandomSource, liquidSettings: LiquidSettings, replaceJigsaws: boolean): boolean;
    static processorsCodec<E extends YungJigsawSinglePoolElement>(): RecordCodecBuilder<E, Holder<StructureProcessorList>>;
    static templateCodec<E extends YungJigsawSinglePoolElement>(): RecordCodecBuilder<E, Either<ResourceLocation, StructureTemplate>>;
    toString(): string;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.world.structure.jigsaw' {
  import { Optional } from 'java.util';
  import { GenerationStub, GenerationContext } from 'Structure';
  import { Holder, BlockPos } from 'net.minecraft.core';
  import { StructureTemplatePool, DimensionPadding, JigsawJunction } from 'net.minecraft.world.level.levelgen.structure.pools';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Types } from 'Heightmap';
  import { Integer } from 'java.lang';
  import { LiquidSettings } from 'net.minecraft.world.level.levelgen.structure.templatesystem';
  import { PoolElementStructurePiece } from 'net.minecraft.world.level.levelgen.structure';
  import { MutableObject } from 'org.apache.commons.lang3.mutable';
  import { BoxOctree } from 'com.yungnickyoung.minecraft.yungsapi.util';
  import { AABB } from 'net.minecraft.world.phys';
  import { PieceContext } from 'com.yungnickyoung.minecraft.yungsapi.world.structure.jigsaw.assembler';

  class JigsawManager {
    static assembleJigsawStructure(generationContext: GenerationContext, startPool: Holder<StructureTemplatePool>, startJigsawNameOptional: Optional<ResourceLocation>, maxDepth: number, locatePos: BlockPos, useExpansionHack: boolean, projectStartToHeightmap: Optional<Types>, maxDistanceFromCenter: number, maxY: Optional<number>, minY: Optional<number>, dimensionPadding: DimensionPadding, liquidSettings: LiquidSettings): Optional<GenerationStub>;
  }


  class PieceEntry {
    constructor(piece: PoolElementStructurePiece, boxOctree: MutableObject<BoxOctree>, pieceAabb: AABB, depth: number, parentEntry: PieceEntry, sourcePieceContext: PieceContext, parentJunction: JigsawJunction);
    addChildEntry(childEntry: PieceEntry): void;
    equals(obj: any): boolean;
    get boxOctree(): MutableObject<BoxOctree>;
    get deadendPool(): Optional<ResourceLocation>;
    get depth(): number;
    get parentEntry(): PieceEntry;
    get parentJunction(): JigsawJunction;
    get piece(): PoolElementStructurePiece;
    get pieceAabb(): AABB;
    get sourcePieceContext(): PieceContext;
    hasChildren(): boolean;
    hashCode(): number;
    isDelayGeneration(): boolean;
    set piece(newPiece: PoolElementStructurePiece);
    setDelayGeneration(delayGeneration: boolean): void;
    toString(): string;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.world.structure.modifier' {
  import { Codec } from 'com.mojang.serialization';
  import { StructureCondition } from 'com.yungnickyoung.minecraft.yungsapi.world.structure.condition';
  import { List } from 'java.util';
  import { StructureAction } from 'com.yungnickyoung.minecraft.yungsapi.world.structure.action';
  import { StructureTargetSelector } from 'com.yungnickyoung.minecraft.yungsapi.world.structure.targetselector';
  import { StructureContext } from 'com.yungnickyoung.minecraft.yungsapi.world.structure.context';

  class StructureModifier {
    static readonly CODEC: Codec;
    constructor(condition: StructureCondition, actions: StructureAction[], targetSelector: StructureTargetSelector);
    apply(structureContext: StructureContext): boolean;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.world.structure.placement' {
  import { RandomSpreadStructurePlacement, RandomSpreadType, StructurePlacementType } from 'net.minecraft.world.level.levelgen.structure.placement';
  import { MapCodec } from 'com.mojang.serialization';
  import { Vec3i } from 'net.minecraft.core';
  import { FrequencyReductionMethod, ExclusionZone } from 'StructurePlacement';
  import { Float, Integer } from 'java.lang';
  import { Optional } from 'java.util';
  import { EnhancedExclusionZone } from 'com.yungnickyoung.minecraft.yungsapi.world.structure.exclusion';
  import { ChunkGeneratorStructureState } from 'net.minecraft.world.level.chunk';

  interface EnhancedRandomSpread extends RandomSpreadStructurePlacement {}
  class EnhancedRandomSpread extends RandomSpreadStructurePlacement {
    static readonly CODEC: MapCodec;
    constructor(locateOffset: Vec3i, frequencyReductionMethod: FrequencyReductionMethod, frequency: number, salt: number, exclusionZone: Optional<ExclusionZone>, enhancedExclusionZone: Optional<EnhancedExclusionZone>, spacing: number, separation: number, randomSpreadType: RandomSpreadType);
    isStructureChunk(chunkGeneratorStructureState: ChunkGeneratorStructureState, x: number, z: number): boolean;
    type(): StructurePlacementType<any>;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.world.structure.processor' {
  import { FluidState } from 'net.minecraft.world.level.material';
  import { LevelChunkSection } from 'net.minecraft.world.level.chunk';
  import { BlockPos } from 'net.minecraft.core';
  import { LevelReader } from 'net.minecraft.world.level';
  import { Optional } from 'java.util';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  class ISafeWorldModifier {
    getBlockStateSafe(chunkSection: LevelChunkSection, pos: BlockPos): Optional<BlockState>;
    getBlockStateSafe(world: LevelReader, pos: BlockPos): Optional<BlockState>;
    getFluidStateSafe(chunkSection: LevelChunkSection, pos: BlockPos): FluidState;
    getFluidStateSafe(world: LevelReader, pos: BlockPos): FluidState;
    isBlockStateAirSafe(world: LevelReader, pos: BlockPos): boolean;
    isMaterialLiquidSafe(world: LevelReader, pos: BlockPos): boolean;
    setBlockStateSafe(chunkSection: LevelChunkSection, pos: BlockPos, state: BlockState): Optional<BlockState>;
    setBlockStateSafe(world: LevelReader, pos: BlockPos, state: BlockState): Optional<BlockState>;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.world.structure.targetselector' {
  import { MapCodec, Codec } from 'com.mojang.serialization';
  import { List, Map } from 'java.util';
  import { PieceEntry } from 'com.yungnickyoung.minecraft.yungsapi.world.structure.jigsaw';
  import { StructureContext } from 'com.yungnickyoung.minecraft.yungsapi.world.structure.context';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface SelfTargetSelector extends StructureTargetSelector {}
  class SelfTargetSelector extends StructureTargetSelector {
    static readonly CODEC: MapCodec;
    apply(ctx: StructureContext): PieceEntry[];
    type(): StructureTargetSelectorType<any>;
  }


  class StructureTargetSelector {
    apply(var1: StructureContext): PieceEntry[];
    type(): StructureTargetSelectorType<any>;
  }


  class StructureTargetSelectorType<C extends StructureTargetSelector = any> {
    static readonly TARGET_SELECTOR_TYPES_BY_NAME: Map;
    static readonly NAME_BY_TARGET_SELECTOR_TYPES: Map;
    static readonly TARGET_SELECTOR_TYPE_CODEC: Codec;
    static readonly TARGET_SELECTOR_CODEC: Codec;
    static readonly SELF: StructureTargetSelectorType;
    codec(): MapCodec<C>;
    static register<C extends StructureTargetSelector>(resourceLocation: ResourceLocation, codec: MapCodec<C>): StructureTargetSelectorType<C>;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.world.structure.terrainadaptation.adaptations' {
  import { MapCodec, Codec } from 'com.mojang.serialization';
  import { TerrainAction, Padding } from 'com.yungnickyoung.minecraft.yungsapi.world.structure.terrainadaptation.adaptations.EnhancedTerrainAdaptation';
  import { AquiferOverride } from 'com.yungnickyoung.minecraft.yungsapi.world.structure.terrainadaptation.aquiferoverride';
  import { Map } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface CustomAdaptation extends EnhancedTerrainAdaptation {}
  class CustomAdaptation extends EnhancedTerrainAdaptation {
    static readonly CODEC: MapCodec;
    type(): EnhancedTerrainAdaptationType<any>;
  }


  class EnhancedTerrainAdaptation {
    static readonly NONE: EnhancedTerrainAdaptation;
    bottomAction(): TerrainAction;
    computeDensityFactor(xDistance: number, yDistance: number, zDistance: number, yDistanceToPieceBottom: number): number;
    get aquiferOverride(): AquiferOverride;
    get bottomOffset(): number;
    get kernel(): number[];
    get kernelDistance(): number;
    get kernelRadius(): number;
    get kernelSize(): number;
    get padding(): Padding;
    topAction(): TerrainAction;
    type(): EnhancedTerrainAdaptationType<any>;
  }


  class EnhancedTerrainAdaptationType<C extends EnhancedTerrainAdaptation = any> {
    static readonly ADAPTATION_TYPES_BY_NAME: Map;
    static readonly NAME_BY_ADAPTATION_TYPES: Map;
    static readonly ADAPTATION_TYPE_CODEC: Codec;
    static readonly ADAPTATION_CODEC: Codec;
    static readonly NONE: EnhancedTerrainAdaptationType;
    static readonly LARGE_CARVED_TOP_NO_BEARD: EnhancedTerrainAdaptationType;
    static readonly SMALL_CARVED_TOP_NO_BEARD: EnhancedTerrainAdaptationType;
    static readonly CUSTOM: EnhancedTerrainAdaptationType;
    codec(): MapCodec<C>;
    static register<C extends EnhancedTerrainAdaptation>(resourceLocation: ResourceLocation, codec: MapCodec<C>): EnhancedTerrainAdaptationType<C>;
  }


  interface LargeCarvedTopNoBeardAdaptation extends EnhancedTerrainAdaptation {}
  class LargeCarvedTopNoBeardAdaptation extends EnhancedTerrainAdaptation {
    static readonly CODEC: MapCodec;
    constructor();
    type(): EnhancedTerrainAdaptationType<any>;
  }


  interface NoneAdaptation extends EnhancedTerrainAdaptation {}
  class NoneAdaptation extends EnhancedTerrainAdaptation {
    static readonly CODEC: MapCodec;
    constructor();
    computeDensityFactor(xDistance: number, yDistance: number, zDistance: number, yDistanceToPieceBottom: number): number;
    type(): EnhancedTerrainAdaptationType<any>;
  }


  interface SmallCarvedTopNoBeardAdaptation extends EnhancedTerrainAdaptation {}
  class SmallCarvedTopNoBeardAdaptation extends EnhancedTerrainAdaptation {
    static readonly CODEC: MapCodec;
    constructor();
    type(): EnhancedTerrainAdaptationType<any>;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.world.structure.terrainadaptation.adaptations.EnhancedTerrainAdaptation' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface TerrainAction extends Enum<TerrainAction> {}
  class TerrainAction extends Enum<TerrainAction> {
    static readonly CARVE: TerrainAction;
    static readonly BURY: TerrainAction;
    static readonly NONE: TerrainAction;
    get densityModifier(): number;
    get serializedName(): string;
    static valueOf(name: string): TerrainAction;
    static values(): TerrainAction[];
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.world.structure.terrainadaptation.aquiferoverride' {
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Supplier } from 'java.util.function';
  import { Map } from 'java.util';
  import { Codec, MapCodec } from 'com.mojang.serialization';
  import { ResourceLocation } from 'net.minecraft.resources';

  class AquiferOverride {
    static readonly NONE: AquiferOverride;
    getBlockState(var1: BlockState): BlockState;
    type(): AquiferOverrideType<any>;
  }


  class AquiferOverrideMask {
    constructor(chunkHeight: number, minY: number);
    get(x: number, y: number, z: number): boolean;
    get aquiferOverride(): AquiferOverride;
    getBlockStateForPos(x: number, y: number, z: number, defaultBlockState: BlockState): BlockState;
    set(x: number, y: number, z: number): void;
    set aquiferOverride(aquiferOverride: AquiferOverride);
  }


  class AquiferOverrideMaskSupplier {
    getOrCreateAquiferOverrideMask(var1: Supplier<AquiferOverrideMask>): AquiferOverrideMask;
  }


  class AquiferOverrideType<C extends AquiferOverride = any> {
    static readonly AQUIFER_OVERRIDE_TYPE_BY_NAME: Map;
    static readonly AQUIFER_OVERRIDE_NAME_BY_TYPE: Map;
    static readonly AQUIFER_OVERRIDE_TYPE_CODEC: Codec;
    static readonly AQUIFER_OVERRIDE_CODEC: Codec;
    static readonly NONE: AquiferOverrideType;
    static readonly REPLACE: AquiferOverrideType;
    static readonly SOLIDIFY: AquiferOverrideType;
    codec(): MapCodec<C>;
    static register<C extends AquiferOverride>(resourceLocation: ResourceLocation, codec: MapCodec<C>): AquiferOverrideType<C>;
  }


  interface NoneAquiferOverride extends AquiferOverride {}
  class NoneAquiferOverride extends AquiferOverride {
    static readonly CODEC: MapCodec;
    getBlockState(defaultBlockState: BlockState): BlockState;
    type(): AquiferOverrideType<any>;
  }


  interface ReplaceAquiferOverride extends AquiferOverride {}
  class ReplaceAquiferOverride extends AquiferOverride {
    static readonly CODEC: MapCodec;
    constructor(replaceBlockState: BlockState);
    getBlockState(defaultBlockState: BlockState): BlockState;
    type(): AquiferOverrideType<any>;
  }


  interface SolidifyAquiferOverride extends AquiferOverride {}
  class SolidifyAquiferOverride extends AquiferOverride {
    static readonly CODEC: MapCodec;
    getBlockState(defaultBlockState: BlockState): BlockState;
    setSolidBlockState(solidBlockState: BlockState): void;
    type(): AquiferOverrideType<any>;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.world.structure.terrainadaptation.beardifier' {
  import { ObjectListIterator } from 'it.unimi.dsi.fastutil.objects';
  import { NoiseChunk, Beardifier } from 'net.minecraft.world.level.levelgen';
  import { StructureManager, ChunkPos } from 'net.minecraft.world.level';
  import { FunctionContext } from 'DensityFunction';

  class EnhancedBeardifierData {
    get enhancedJunctionIterator(): ObjectListIterator<EnhancedJigsawJunction>;
    get enhancedPieceIterator(): ObjectListIterator<EnhancedBeardifierRigid>;
    get noiseChunk(): NoiseChunk;
    set enhancedJunctionIterator(var1: ObjectListIterator<EnhancedJigsawJunction>);
    set enhancedPieceIterator(var1: ObjectListIterator<EnhancedBeardifierRigid>);
    set noiseChunk(var1: NoiseChunk);
  }


  class EnhancedBeardifierHelper {
    static computeDensity(ctx: FunctionContext, density: number, data: EnhancedBeardifierData): number;
    static forStructuresInChunk(structureManager: StructureManager, chunkPos: ChunkPos, original: Beardifier): Beardifier;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.world.structure' {
  import { Structure, BoundingBox, StructureType } from 'net.minecraft.world.level.levelgen.structure';
  import { MapCodec } from 'com.mojang.serialization';
  import { Holder } from 'net.minecraft.core';
  import { HeightProvider } from 'net.minecraft.world.level.levelgen.heightproviders';
  import { IntProvider } from 'net.minecraft.util.valueproviders';
  import { Optional } from 'java.util';
  import { EnhancedTerrainAdaptation } from 'com.yungnickyoung.minecraft.yungsapi.world.structure.terrainadaptation.adaptations';
  import { StructureSettings, GenerationStub, GenerationContext } from 'Structure';
  import { StructureTemplatePool, DimensionPadding } from 'net.minecraft.world.level.levelgen.structure.pools';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Types } from 'Heightmap';
  import { Integer } from 'java.lang';
  import { LiquidSettings } from 'net.minecraft.world.level.levelgen.structure.templatesystem';

  interface YungJigsawStructure extends Structure {}
  class YungJigsawStructure extends Structure {
    static readonly MAX_TOTAL_STRUCTURE_RADIUS: number;
    static readonly CODEC: MapCodec;
    readonly startPool: Holder;
    readonly maxDepth: number;
    readonly startHeight: HeightProvider;
    readonly xOffsetInChunk: IntProvider;
    readonly zOffsetInChunk: IntProvider;
    readonly useExpansionHack: boolean;
    readonly projectStartToHeightmap: Optional;
    readonly maxDistanceFromCenter: number;
    readonly maxY: Optional;
    readonly minY: Optional;
    readonly enhancedTerrainAdaptation: EnhancedTerrainAdaptation;
    constructor(structureSettings: StructureSettings, startPool: Holder<StructureTemplatePool>, startJigsawName: Optional<ResourceLocation>, maxDepth: number, startHeight: HeightProvider, xOffsetInChunk: IntProvider, zOffsetInChunk: IntProvider, useExpansionHack: boolean, projectStartToHeightmap: Optional<Types>, maxBlockDistanceFromCenter: number, maxY: Optional<number>, minY: Optional<number>, enhancedTerrainAdaptation: EnhancedTerrainAdaptation, dimensionPadding: DimensionPadding, liquidSettings: LiquidSettings);
    adjustBoundingBox(boundingBox: BoundingBox): BoundingBox;
    findGenerationPoint(context: GenerationContext): Optional<GenerationStub>;
    type(): StructureType<any>;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi.world.util' {
  import { BoundingBox } from 'net.minecraft.world.level.levelgen.structure';
  import { Direction } from 'net.minecraft.core';
  import { ChunkAccess } from 'net.minecraft.world.level.chunk';
  import { ColumnPos } from 'net.minecraft.server.level';

  class BoundingBoxHelper {
    static boxFromCoordsWithRotation(x: number, y: number, z: number, secondaryAxisLen: number, yLen: number, mainAxisLen: number, mainAxis: Direction): BoundingBox;
  }


  class SurfaceHelper {
    static getSurfaceHeight(chunk: ChunkAccess, pos: ColumnPos): number;
  }

}

declare module 'com.yungnickyoung.minecraft.yungsapi' {
  import { Logger } from 'org.apache.logging.log4j';
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { Set, List } from 'java.util';
  import { ClassNode } from 'org.objectweb.asm.tree';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { Consumer, Function } from 'java.util.function';
  import { RegisterEvent } from 'net.neoforged.neoforge.registries';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Registry } from 'net.minecraft.core';
  import { AutoRegisterField } from 'com.yungnickyoung.minecraft.yungsapi.autoregister';
  import { TriConsumer } from 'org.apache.logging.log4j.util';
  import { RegisterHelper } from 'RegisterEvent';

  class YungsApiCommon {
    static readonly MOD_ID: string;
    static readonly LOGGER: Logger;
    static init(): void;
  }


  interface YungsApiMixinPlugin extends IMixinConfigPlugin {}
  class YungsApiMixinPlugin extends IMixinConfigPlugin {
    acceptTargets(myTargets: Set<string>, otherTargets: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    onLoad(mixinPackage: string): void;
    postApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    preApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    shouldApplyMixin(targetClassName: string, mixinClassName: string): boolean;
  }


  class YungsApiNeoForge {
    static loadingContextEventBus: IEventBus;
    constructor(eventBus: IEventBus);
    static buildAutoRegistrar<T>(registryKey: ResourceKey<Registry<T>>, registerables: AutoRegisterField[], unwrapper: Function<AutoRegisterField, T>): Consumer<RegisterEvent>;
    static buildAutoRegistrar<T>(registryKey: ResourceKey<Registry<T>>, registerables: AutoRegisterField[], unwrapper: Function<AutoRegisterField, T>, registrationHandler: TriConsumer<AutoRegisterField, T, RegisterHelper<T>>): Consumer<RegisterEvent>;
    static buildSimpleRegistrar<T>(registryKey: ResourceKey<Registry<T>>, registerables: AutoRegisterField[]): Consumer<RegisterEvent>;
  }

}