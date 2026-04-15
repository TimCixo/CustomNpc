declare module 'fuzs.puzzleslib.api.attachment.v4' {
  import { EntityBuilder, Builder } from 'fuzs.puzzleslib.api.attachment.v4.DataAttachmentRegistry';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { LevelChunk } from 'net.minecraft.world.level.chunk';
  import { Level } from 'net.minecraft.world.level';
  import { UnaryOperator } from 'java.util.function';

  class DataAttachmentRegistry {
    static blockEntityBuilder<A>(): Builder<BlockEntity, A>;
    static entityBuilder<A>(): EntityBuilder<A>;
    static levelBuilder<A>(): Builder<Level, A>;
    static levelChunkBuilder<A>(): Builder<LevelChunk, A>;
  }


  class DataAttachmentType<T = any, V = any> {
    get(var1: T): V;
    getOrDefault(var1: T, var2: V): V;
    has(var1: T): boolean;
    set(var1: T, var2: V): void;
    update(var1: T, var2: UnaryOperator<V>): void;
  }

}

declare module 'fuzs.puzzleslib.api.attachment.v4.DataAttachmentRegistry' {
  import { Entity, EntityType } from 'net.minecraft.world.entity';
  import { Codec } from 'com.mojang.serialization';
  import { Class } from 'java.lang';
  import { Predicate, Function } from 'java.util.function';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { PlayerSet } from 'fuzs.puzzleslib.api.network.v3';
  import { DataAttachmentType } from 'fuzs.puzzleslib.api.attachment.v4';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { BlockEntity, BlockEntityType } from 'net.minecraft.world.level.block.entity';

  interface EntityBuilder<A = any> extends RegistryBuilder<Entity, A> {}
  class EntityBuilder<A = any> extends RegistryBuilder<Entity, A> {
    copyOnDeath(): EntityBuilder<A>;
    defaultValue(defaultValue: A): EntityBuilder<A>;
    defaultValue(type: Class<Entity>, defaultValue: A): EntityBuilder<A>;
    defaultValue(type: EntityType<any>, defaultValue: A): EntityBuilder<A>;
    defaultValue(var1: Predicate<Entity>, var2: A): EntityBuilder<A>;
    networkSynchronized(streamCodec: StreamCodec<RegistryFriendlyByteBuf, A>): EntityBuilder<A>;
    networkSynchronized(var1: StreamCodec<RegistryFriendlyByteBuf, A>, var2: Function<Entity, PlayerSet>): EntityBuilder<A>;
    persistent(var1: Codec<A>): EntityBuilder<A>;
  }


  class Builder<T = any, A = any> {
    build(var1: ResourceLocation): DataAttachmentType<T, A>;
    defaultValue(var1: A): Builder<T, A>;
    persistent(var1: Codec<A>): Builder<T, A>;
  }


  interface BlockEntityBuilder<A = any> extends RegistryBuilder<BlockEntity, A> {}
  class BlockEntityBuilder<A = any> extends RegistryBuilder<BlockEntity, A> {
    defaultValue(defaultValue: A): BlockEntityBuilder<A>;
    defaultValue(type: Class<BlockEntity>, defaultValue: A): BlockEntityBuilder<A>;
    defaultValue(type: BlockEntityType<any>, defaultValue: A): BlockEntityBuilder<A>;
    defaultValue(var1: Predicate<BlockEntity>, var2: A): BlockEntityBuilder<A>;
    persistent(var1: Codec<A>): BlockEntityBuilder<A>;
  }


  interface RegistryBuilder<T = any, A = any> extends Builder<T, A> {}
  class RegistryBuilder<T = any, A = any> extends Builder<T, A> {
    defaultValue(defaultValue: A): RegistryBuilder<T, A>;
    defaultValue(type: Class<T>, defaultValue: A): RegistryBuilder<T, A>;
    defaultValue(var1: Predicate<T>, var2: A): RegistryBuilder<T, A>;
  }

}

declare module 'fuzs.puzzleslib.api.biome.v1' {
  import { ResourceKey } from 'net.minecraft.resources';
  import { Biome, AmbientParticleSettings, AmbientMoodSettings, AmbientAdditionsSettings } from 'net.minecraft.world.level.biome';
  import { Holder } from 'net.minecraft.core';
  import { ConfiguredFeature } from 'net.minecraft.world.level.levelgen.feature';
  import { PlacedFeature } from 'net.minecraft.world.level.levelgen.placement';
  import { Optional, List, Set } from 'java.util';
  import { Structure } from 'net.minecraft.world.level.levelgen.structure';
  import { LevelStem } from 'net.minecraft.world.level.dimension';
  import { TagKey } from 'net.minecraft.tags';
  import { Enum, Iterable, Integer } from 'java.lang';
  import { TemperatureModifier } from 'Biome';
  import { Decoration, Carving } from 'GenerationStep';
  import { ConfiguredWorldCarver } from 'net.minecraft.world.level.levelgen.carver';
  import { MobCategory, EntityType } from 'net.minecraft.world.entity';
  import { SpawnerData, MobSpawnCost } from 'MobSpawnSettings';
  import { BiPredicate } from 'java.util.function';
  import { GrassColorModifier } from 'BiomeSpecialEffects';
  import { SoundEvent, Music } from 'net.minecraft.sounds';

  class BiomeLoadingContext {
    canGenerateIn(var1: ResourceKey<LevelStem>): boolean;
    get biome(): Biome;
    get resourceKey(): ResourceKey<Biome>;
    getFeatureKey(var1: ConfiguredFeature<any, any>): Optional<ResourceKey<ConfiguredFeature<any, any>>>;
    getPlacedFeatureKey(var1: PlacedFeature): Optional<ResourceKey<PlacedFeature>>;
    getStructureKey(var1: Structure): Optional<ResourceKey<Structure>>;
    hasFeature(key: ResourceKey<ConfiguredFeature<any, any>>): boolean;
    hasPlacedFeature(key: ResourceKey<PlacedFeature>): boolean;
    holder(): Holder<Biome>;
    is(var1: TagKey<Biome>): boolean;
    is(biome: Biome): boolean;
    is(holder: Holder<Biome>): boolean;
    is(resourceKey: ResourceKey<Biome>): boolean;
    validForStructure(var1: ResourceKey<Structure>): boolean;
  }


  interface BiomeLoadingPhase extends Enum<BiomeLoadingPhase> {}
  class BiomeLoadingPhase extends Enum<BiomeLoadingPhase> {
    static readonly ADDITIONS: BiomeLoadingPhase;
    static readonly REMOVALS: BiomeLoadingPhase;
    static readonly MODIFICATIONS: BiomeLoadingPhase;
    static readonly POST_PROCESSING: BiomeLoadingPhase;
    static valueOf(name: string): BiomeLoadingPhase;
    static values(): BiomeLoadingPhase[];
  }


  class ClimateSettingsContext {
    get temperature(): number;
    hasPrecipitation(var1: boolean): void;
    hasPrecipitation(): boolean;
    set temperature(var1: number);
    setDownfall(var1: number): void;
    setTemperatureModifier(var1: TemperatureModifier): void;
  }


  class GenerationSettingsContext {
    addCarver(var1: Carving, var2: ResourceKey<ConfiguredWorldCarver<any>>): void;
    addFeature(var1: Decoration, var2: ResourceKey<PlacedFeature>): void;
    getCarvers(var1: Carving): Iterable<Holder<ConfiguredWorldCarver<any>>>;
    getFeatures(var1: Decoration): Iterable<Holder<PlacedFeature>>;
    removeCarver(var1: Carving, var2: ResourceKey<ConfiguredWorldCarver<any>>): boolean;
    removeCarver(carverKey: ResourceKey<ConfiguredWorldCarver<any>>): boolean;
    removeFeature(var1: Decoration, var2: ResourceKey<PlacedFeature>): boolean;
    removeFeature(featureKey: ResourceKey<PlacedFeature>): boolean;
  }


  class MobSpawnSettingsContext {
    addSpawn(var1: MobCategory, var2: SpawnerData): void;
    clearSpawnCost(var1: EntityType<any>): boolean;
    clearSpawns(group: MobCategory): void;
    clearSpawns(): void;
    get creatureGenerationProbability(): number;
    get entityTypesWithSpawnCost(): Set<EntityType<any>>;
    get mobCategoriesWithSpawns(): Set<MobCategory>;
    getSpawnCost(var1: EntityType<any>): MobSpawnCost;
    getSpawnerData(var1: MobCategory): SpawnerData[];
    removeSpawns(var1: BiPredicate<MobCategory, SpawnerData>): boolean;
    removeSpawnsOfEntityType(entityType: EntityType<any>): boolean;
    set creatureGenerationProbability(var1: number);
    setSpawnCost(var1: EntityType<any>, var2: number, var4: number): void;
  }


  class SpecialEffectsContext {
    clearAmbientAdditionsSettings(): void;
    clearAmbientLoopSoundEvent(): void;
    clearAmbientMoodSettings(): void;
    clearAmbientParticleSettings(): void;
    clearBackgroundMusic(): void;
    clearFoliageColorOverride(): void;
    clearGrassColorOverride(): void;
    get ambientAdditionsSettings(): Optional<AmbientAdditionsSettings>;
    get ambientLoopSoundEvent(): Optional<Holder<SoundEvent>>;
    get ambientMoodSettings(): Optional<AmbientMoodSettings>;
    get ambientParticleSettings(): Optional<AmbientParticleSettings>;
    get backgroundMusic(): Optional<Music>;
    get fogColor(): number;
    get foliageColorOverride(): Optional<number>;
    get grassColorModifier(): GrassColorModifier;
    get grassColorOverride(): Optional<number>;
    get skyColor(): number;
    get waterColor(): number;
    get waterFogColor(): number;
    set ambientAdditionsSettings(var1: Optional<AmbientAdditionsSettings>);
    set ambientLoopSoundEvent(var1: Optional<Holder<SoundEvent>>);
    set ambientMoodSettings(var1: Optional<AmbientMoodSettings>);
    set ambientParticleSettings(var1: Optional<AmbientParticleSettings>);
    set backgroundMusic(var1: Optional<Music>);
    set fogColor(var1: number);
    set foliageColorOverride(var1: Optional<number>);
    set grassColorModifier(var1: GrassColorModifier);
    set grassColorOverride(var1: Optional<number>);
    set skyColor(var1: number);
    set waterColor(var1: number);
    set waterFogColor(var1: number);
    setAmbientAdditionsSettings(ambientAdditionsSettings: AmbientAdditionsSettings): void;
    setAmbientLoopSoundEvent(ambientLoopSoundEvent: Holder<SoundEvent>): void;
    setAmbientMoodSettings(ambientMoodSettings: AmbientMoodSettings): void;
    setAmbientParticleSettings(ambientParticleSettings: AmbientParticleSettings): void;
    setBackgroundMusic(backgroundMusic: Music): void;
    setFoliageColorOverride(foliageColorOverride: number): void;
    setGrassColorOverride(grassColorOverride: number): void;
  }

}

declare module 'fuzs.puzzleslib.api.block.v1' {
  import { BlockItem, Item } from 'net.minecraft.world.item';
  import { Block, SoundType } from 'net.minecraft.world.level.block';
  import { Holder } from 'net.minecraft.core';
  import { SoundEvent } from 'net.minecraft.sounds';

  class BlockConversionHelper {
    static copyBoundTags(from: Block, to: Block): void;
    static setBlockForItem(item: BlockItem, block: Block): void;
    static setBlockItemBlock(item: BlockItem, block: Block): void;
    static setItemForBlock(block: Block, item: Item): void;
  }


  interface HolderBackedSoundType extends SoundType {}
  class HolderBackedSoundType extends SoundType {
    constructor(volume: number, pitch: number, breakSound: Holder<SoundEvent>, stepSound: Holder<SoundEvent>, placeSound: Holder<SoundEvent>, hitSound: Holder<SoundEvent>, fallSound: Holder<SoundEvent>);
    get breakSound(): SoundEvent;
    get fallSound(): SoundEvent;
    get hitSound(): SoundEvent;
    get placeSound(): SoundEvent;
    get stepSound(): SoundEvent;
  }


  interface MutableSoundType extends HolderBackedSoundType {}
  class MutableSoundType extends HolderBackedSoundType {
    constructor(volume: number, pitch: number, breakSound: SoundEvent, stepSound: SoundEvent, placeSound: SoundEvent, hitSound: SoundEvent, fallSound: SoundEvent);

    constructor(volume: number, pitch: number, breakSound: Holder<SoundEvent>, stepSound: Holder<SoundEvent>, placeSound: Holder<SoundEvent>, hitSound: Holder<SoundEvent>, fallSound: Holder<SoundEvent>);
    static copyOf(soundType: SoundType): MutableSoundType;
    setBreakSound(breakSound: SoundEvent): MutableSoundType;
    setBreakSound(breakSound: Holder<SoundEvent>): MutableSoundType;
    setFallSound(fallSound: SoundEvent): MutableSoundType;
    setFallSound(fallSound: Holder<SoundEvent>): MutableSoundType;
    setHitSound(hitSound: SoundEvent): MutableSoundType;
    setHitSound(hitSound: Holder<SoundEvent>): MutableSoundType;
    setPitch(pitch: number): MutableSoundType;
    setPlaceSound(placeSound: SoundEvent): MutableSoundType;
    setPlaceSound(placeSound: Holder<SoundEvent>): MutableSoundType;
    setStepSound(stepSound: SoundEvent): MutableSoundType;
    setStepSound(stepSound: Holder<SoundEvent>): MutableSoundType;
    setVolume(volume: number): MutableSoundType;
  }

}

declare module 'fuzs.puzzleslib.api.block.v1.entity' {
  import { EntityBlock } from 'net.minecraft.world.level.block';
  import { BlockEntityType, BlockEntity, BlockEntityTicker } from 'net.minecraft.world.level.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level } from 'net.minecraft.world.level';

  class TickingBlockEntity {
    clientTick(): void;
    serverTick(): void;
  }


  interface TickingEntityBlock<T extends BlockEntity = any> extends EntityBlock {}
  class TickingEntityBlock<T extends BlockEntity = any> extends EntityBlock {
    get blockEntityType(): BlockEntityType<T>;
    getTicker<BE extends BlockEntity>(level: Level, state: BlockState, blockEntityType: BlockEntityType<BE>): BlockEntityTicker<BE>;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
  }

}

declare module 'fuzs.puzzleslib.api.capability.v3' {
  import { CapabilityKey, CapabilityComponent, BlockEntityCapabilityKey, LevelChunkCapabilityKey, LevelCapabilityKey } from 'fuzs.puzzleslib.api.capability.v3.data';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Mutable } from 'fuzs.puzzleslib.api.capability.v3.data.EntityCapabilityKey';
  import { Class } from 'java.lang';
  import { Supplier } from 'java.util.function';
  import { Entity } from 'net.minecraft.world.entity';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { LevelChunk } from 'net.minecraft.world.level.chunk';
  import { Level } from 'net.minecraft.world.level';

  class CapabilityController {
    static from(modId: string): CapabilityController;
    static get(identifier: ResourceLocation): CapabilityKey<any, any>;
    registerBlockEntityCapability<T extends BlockEntity, C extends CapabilityComponent<T>>(var1: string, var2: Class<C>, var3: Supplier<C>, var4: Class<T>): BlockEntityCapabilityKey<T, C>;
    registerEntityCapability<T extends Entity, C extends CapabilityComponent<T>>(var1: string, var2: Class<C>, var3: Supplier<C>, var4: Class<T>): Mutable<T, C>;
    registerLevelCapability<C extends CapabilityComponent<Level>>(var1: string, var2: Class<C>, var3: Supplier<C>): LevelCapabilityKey<C>;
    registerLevelChunkCapability<C extends CapabilityComponent<LevelChunk>>(var1: string, var2: Class<C>, var3: Supplier<C>): LevelChunkCapabilityKey<C>;
  }

}

declare module 'fuzs.puzzleslib.api.capability.v3.data' {
  import { PlayerSet, ClientboundMessage } from 'fuzs.puzzleslib.api.network.v3';
  import { NbtSerializable } from 'fuzs.puzzleslib.api.core.v1.utility';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Optional, List } from 'java.util';
  import { Enum } from 'java.lang';
  import { Entity } from 'net.minecraft.world.entity';
  import { ClientboundEntityCapabilityMessage } from 'fuzs.puzzleslib.impl.capability';
  import { Level } from 'net.minecraft.world.level';
  import { LevelChunk } from 'net.minecraft.world.level.chunk';

  interface BlockEntityCapabilityKey<T extends BlockEntity = any, C extends CapabilityComponent<T> = any> extends CapabilityKey<T, C> {}
  class BlockEntityCapabilityKey<T extends BlockEntity = any, C extends CapabilityComponent<T> = any> extends CapabilityKey<T, C> {
    setChanged(capabilityComponent: C, playerSet: PlayerSet): void;
    toPacket(capabilityComponent: C): ClientboundMessage<any>;
  }


  interface CapabilityComponent<T = any> extends NbtSerializable {}
  class CapabilityComponent<T = any> extends NbtSerializable {
    initialize(capabilityKey: CapabilityKey<T, CapabilityComponent<T>>, holder: T): void;
    read(compoundTag: CompoundTag, registries: Provider): void;
    setChanged(): void;
    setChanged(playerSet: PlayerSet): void;
    write(compoundTag: CompoundTag, registries: Provider): void;
  }


  class CapabilityKey<T = any, C extends CapabilityComponent<T> = any> {
    get(var1: T): C;
    getIfProvided(holder: any): Optional<C>;
    identifier(): ResourceLocation;
    isProvidedBy(var1: any): boolean;
    setChanged(var1: C, var2: PlayerSet): void;
    toPacket(var1: C): ClientboundMessage<any>;
  }


  interface CopyStrategy extends Enum<CopyStrategy> {}
  class CopyStrategy extends Enum<CopyStrategy> {
    static readonly ALWAYS: CopyStrategy;
    static readonly NEVER: CopyStrategy;
    static readonly KEEP_PLAYER_INVENTORY: CopyStrategy;
    copy(var1: Entity, var2: CapabilityComponent<any>, var3: Entity, var4: CapabilityComponent<any>, var5: boolean): void;
    static valueOf(name: string): CopyStrategy;
    static values(): CopyStrategy[];
  }


  interface EntityCapabilityKey<T extends Entity = any, C extends CapabilityComponent<T> = any> extends CapabilityKey<T, C> {}
  class EntityCapabilityKey<T extends Entity = any, C extends CapabilityComponent<T> = any> extends CapabilityKey<T, C> {
    get copyStrategy(): CopyStrategy;
    get syncStrategy(): SyncStrategy;
    setChanged(capabilityComponent: C, playerSet: PlayerSet): void;
    toPacket(capabilityComponent: C): ClientboundEntityCapabilityMessage;
  }


  interface LevelCapabilityKey<C extends CapabilityComponent<Level> = any> extends CapabilityKey<Level, C> {}
  class LevelCapabilityKey<C extends CapabilityComponent<Level> = any> extends CapabilityKey<Level, C> {
    setChanged(capabilityComponent: C, playerSet: PlayerSet): void;
    toPacket(capabilityComponent: C): ClientboundMessage<any>;
  }


  interface LevelChunkCapabilityKey<C extends CapabilityComponent<LevelChunk> = any> extends CapabilityKey<LevelChunk, C> {}
  class LevelChunkCapabilityKey<C extends CapabilityComponent<LevelChunk> = any> extends CapabilityKey<LevelChunk, C> {
    setChanged(capabilityComponent: C, playerSet: PlayerSet): void;
    toPacket(capabilityComponent: C): ClientboundMessage<any>;
  }


  interface SyncStrategy extends Enum<SyncStrategy> {}
  class SyncStrategy extends Enum<SyncStrategy> {
    static readonly MANUAL: SyncStrategy;
    static readonly TRACKING: SyncStrategy;
    static readonly PLAYER: SyncStrategy;
    getPlayerSet(var1: Entity): PlayerSet;
    static valueOf(name: string): SyncStrategy;
    static values(): SyncStrategy[];
  }

}

declare module 'fuzs.puzzleslib.api.capability.v3.data.EntityCapabilityKey' {
  import { EntityCapabilityKey, SyncStrategy, CopyStrategy } from 'fuzs.puzzleslib.api.capability.v3.data';

  interface Mutable<T extends Entity = any, C extends CapabilityComponent<T> = any> extends EntityCapabilityKey<T, C> {}
  class Mutable<T extends Entity = any, C extends CapabilityComponent<T> = any> extends EntityCapabilityKey<T, C> {
    setCopyStrategy(var1: CopyStrategy): Mutable<T, C>;
    setSyncStrategy(var1: SyncStrategy): Mutable<T, C>;
  }

}

declare module 'fuzs.puzzleslib.api.chat.v1' {
  import { Component, FormattedText } from 'net.minecraft.network.chat';
  import { FormattedCharSequence } from 'net.minecraft.util';

  class ComponentHelper {
    static toComponent(formattedText: FormattedText): Component;
    static toComponent(formattedCharSequence: FormattedCharSequence): Component;
    static toString(formattedText: FormattedText): string;
    static toString(formattedCharSequence: FormattedCharSequence): string;
  }

}

declare module 'fuzs.puzzleslib.api.client.core.v1' {
  import { ClientPacketListener } from 'net.minecraft.client.multiplayer';
  import { Type } from 'CustomPacketPayload';
  import { KeyMapping } from 'net.minecraft.client';
  import { ClientTooltipComponent, ClientTooltipPositioner } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { TooltipComponent } from 'net.minecraft.world.inventory.tooltip';
  import { BakedModel, ModelManager } from 'net.minecraft.client.resources.model';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { Block } from 'net.minecraft.world.level.block';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { GuiGraphics, Font, Gui } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { BaseModConstructor } from 'fuzs.puzzleslib.api.core.v1';
  import { Supplier } from 'java.util.function';
  import { EntityRenderersContext, BlockEntityRenderersContext, ClientTooltipComponentsContext, ParticleProvidersContext, MenuScreensContext, LayerDefinitionsContext, AdditionalModelsContext, ItemModelPropertiesContext, BuiltinModelItemRendererContext, ItemDecorationContext, EntitySpectatorShaderContext, SkullRenderersContext, LivingEntityRenderLayersContext, KeyMappingsContext, RenderTypesContext, ColorProvidersContext, CoreShadersContext, RenderBuffersContext } from 'fuzs.puzzleslib.api.client.core.v1.context';
  import { BlockColor } from 'net.minecraft.client.color.block';
  import { Item } from 'net.minecraft.world.item';
  import { ItemColor } from 'net.minecraft.client.color.item';
  import { PackRepositorySourcesContext } from 'fuzs.puzzleslib.api.core.v1.context';

  class ClientAbstractions {
    static readonly INSTANCE: ClientAbstractions;
    addGuiLeftHeight(var1: Gui, var2: number): void;
    addGuiRightHeight(var1: Gui, var2: number): void;
    createImageComponent(var1: TooltipComponent): ClientTooltipComponent;
    get partialTick(): number;
    getBakedModel(resourceLocation: ResourceLocation): BakedModel;
    getBakedModel(var1: ModelManager, var2: ResourceLocation): BakedModel;
    getGuiLeftHeight(var1: Gui): number;
    getGuiRightHeight(var1: Gui): number;
    getRenderType(var1: Block): RenderType;
    getRenderType(fluid: Fluid): RenderType;
    hasChannel(var1: ClientPacketListener, var2: Type<any>): boolean;
    isKeyActiveAndMatches(var1: KeyMapping, var2: number, var3: number): boolean;
    onRenderTooltip(var1: GuiGraphics, var2: Font, var3: number, var4: number, var5: ClientTooltipComponent[], var6: ClientTooltipPositioner): boolean;
    registerRenderType(var1: Block, var2: RenderType): void;
    registerRenderType(var1: Fluid, var2: RenderType): void;
  }


  interface ClientModConstructor extends BaseModConstructor {}
  class ClientModConstructor extends BaseModConstructor {
    static construct(modId: string, modConstructor: Supplier<ClientModConstructor>): void;
    onAddResourcePackFinders(context: PackRepositorySourcesContext): void;
    onClientSetup(): void;
    onConstructMod(): void;
    onRegisterAdditionalModels(context: AdditionalModelsContext): void;
    onRegisterBlockColorProviders(context: ColorProvidersContext<Block, BlockColor>): void;
    onRegisterBlockEntityRenderers(context: BlockEntityRenderersContext): void;
    onRegisterBlockRenderTypes(context: RenderTypesContext<Block>): void;
    onRegisterBuiltinModelItemRenderers(context: BuiltinModelItemRendererContext): void;
    onRegisterClientTooltipComponents(context: ClientTooltipComponentsContext): void;
    onRegisterCoreShaders(context: CoreShadersContext): void;
    onRegisterEntityRenderers(context: EntityRenderersContext): void;
    onRegisterEntitySpectatorShaders(context: EntitySpectatorShaderContext): void;
    onRegisterFluidRenderTypes(context: RenderTypesContext<Fluid>): void;
    onRegisterItemColorProviders(context: ColorProvidersContext<Item, ItemColor>): void;
    onRegisterItemDecorations(context: ItemDecorationContext): void;
    onRegisterItemModelProperties(context: ItemModelPropertiesContext): void;
    onRegisterKeyMappings(context: KeyMappingsContext): void;
    onRegisterLayerDefinitions(context: LayerDefinitionsContext): void;
    onRegisterLivingEntityRenderLayers(context: LivingEntityRenderLayersContext): void;
    onRegisterMenuScreens(context: MenuScreensContext): void;
    onRegisterParticleProviders(context: ParticleProvidersContext): void;
    onRegisterRenderBuffers(context: RenderBuffersContext): void;
    onRegisterSkullRenderers(context: SkullRenderersContext): void;
  }

}

declare module 'fuzs.puzzleslib.api.client.core.v1.context' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockEntityRendererProvider } from 'net.minecraft.client.renderer.blockentity';
  import { BuiltinItemRenderer, ReloadingBuiltInItemRenderer, DynamicItemDecorator, SkullRenderersFactory } from 'fuzs.puzzleslib.api.client.init.v1';
  import { ItemLike } from 'net.minecraft.world.level';
  import { Class } from 'java.lang';
  import { Function, Consumer, Supplier, BiFunction, Predicate } from 'java.util.function';
  import { ClientTooltipComponent } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { TooltipComponent } from 'net.minecraft.world.inventory.tooltip';
  import { VertexFormat, ByteBufferBuilder } from 'com.mojang.blaze3d.vertex';
  import { ShaderInstance, RenderType } from 'net.minecraft.client.renderer';
  import { EntityType, Entity, LivingEntity } from 'net.minecraft.world.entity';
  import { EntityRendererProvider, RenderLayerParent } from 'net.minecraft.client.renderer.entity';
  import { ClampedItemPropertyFunction } from 'net.minecraft.client.renderer.item';
  import { KeyMapping } from 'net.minecraft.client';
  import { KeyActivationContext, KeyActivationHandler } from 'fuzs.puzzleslib.api.client.key.v1';
  import { ModelLayerLocation } from 'net.minecraft.client.model.geom';
  import { LayerDefinition } from 'net.minecraft.client.model.geom.builders';
  import { Context } from 'EntityRendererProvider';
  import { RenderLayer } from 'net.minecraft.client.renderer.entity.layers';
  import { EntityModel } from 'net.minecraft.client.model';
  import { MenuType, AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { ScreenConstructor } from 'MenuScreens';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ParticleType, ParticleOptions } from 'net.minecraft.core.particles';
  import { ParticleProvider } from 'net.minecraft.client.particle';
  import { Sprite } from 'ParticleProvider';
  import { SpriteParticleRegistration } from 'ParticleEngine';

  class AdditionalModelsContext {
    registerAdditionalModel(...var1: ResourceLocation[]): void;
  }


  class BlockEntityRenderersContext {
    registerBlockEntityRenderer<T extends BlockEntity>(var1: BlockEntityType<T>, var2: BlockEntityRendererProvider<T>): void;
  }


  class BuiltinModelItemRendererContext {
    registerItemRenderer(var1: BuiltinItemRenderer, ...var2: ItemLike[]): void;
    registerItemRenderer(var1: ReloadingBuiltInItemRenderer, ...var2: ItemLike[]): void;
  }


  class ClientTooltipComponentsContext {
    registerClientTooltipComponent<T extends TooltipComponent>(var1: Class<T>, var2: Function<T, ClientTooltipComponent>): void;
  }


  class ColorProvidersContext<T = any, P = any> {
    getProvider(var1: T): P;
    registerColorProvider(var1: P, ...var2: T[]): void;
  }


  class CoreShadersContext {
    registerCoreShader(var1: ResourceLocation, var2: VertexFormat, var3: Consumer<ShaderInstance>): void;
  }


  class EntityRenderersContext {
    registerEntityRenderer<T extends Entity>(var1: EntityType<T>, var2: EntityRendererProvider<T>): void;
  }


  class EntitySpectatorShaderContext {
    registerSpectatorShader(var1: ResourceLocation, ...var2: EntityType<any>[]): void;
  }


  class ItemDecorationContext {
    registerItemDecorator(var1: DynamicItemDecorator, ...var2: ItemLike[]): void;
  }


  class ItemModelPropertiesContext {
    registerGlobalProperty(var1: ResourceLocation, var2: ClampedItemPropertyFunction): void;
    registerItemProperty(var1: ResourceLocation, var2: ClampedItemPropertyFunction, ...var3: ItemLike[]): void;
  }


  class KeyMappingsContext {
    registerKeyMapping(keyMapping: KeyMapping): void;
    registerKeyMapping(keyMapping: KeyMapping, activationContext: KeyActivationContext): void;
    registerKeyMapping(var1: KeyMapping, var2: KeyActivationHandler): void;
  }


  class LayerDefinitionsContext {
    registerLayerDefinition(var1: ModelLayerLocation, var2: Supplier<LayerDefinition>): void;
  }


  class LivingEntityRenderLayersContext {
    registerRenderLayer<E extends LivingEntity, T extends E, M extends EntityModel<T>>(factory: BiFunction<RenderLayerParent<T, M>, Context, RenderLayer<T, M>>): void;
    registerRenderLayer<E extends LivingEntity, T extends E, M extends EntityModel<T>>(entityType: EntityType<E>, factory: BiFunction<RenderLayerParent<T, M>, Context, RenderLayer<T, M>>, entityTypeX: EntityType<E>): void;
    registerRenderLayer<E extends LivingEntity, T extends E, M extends EntityModel<T>>(var1: Predicate<EntityType<E>>, var2: BiFunction<RenderLayerParent<T, M>, Context, RenderLayer<T, M>>): void;
  }


  class MenuScreensContext {
    registerMenuScreen<M extends AbstractContainerMenu, S extends Screen>(var1: MenuType<M>, var2: ScreenConstructor<M, S>): void;
  }


  class ParticleProvidersContext {
    registerParticleProvider<T extends ParticleOptions>(var1: ParticleType<T>, var2: ParticleProvider<T>): void;
    registerParticleProvider<T extends ParticleOptions>(var1: ParticleType<T>, var2: Sprite<T>): void;
    registerParticleProvider<T extends ParticleOptions>(var1: ParticleType<T>, var2: SpriteParticleRegistration<T>): void;
  }


  class RenderBuffersContext {
    registerRenderBuffer(...renderTypes: RenderType[]): void;
    registerRenderBuffer(var1: RenderType, var2: ByteBufferBuilder): void;
  }


  class RenderTypesContext<T = any> {
    getRenderType(var1: T): RenderType;
    registerRenderType(var1: RenderType, ...var2: T[]): void;
  }


  class SkullRenderersContext {
    registerSkullRenderer(var1: SkullRenderersFactory): void;
  }

}

declare module 'fuzs.puzzleslib.api.client.data.v2' {
  import { DataProvider, PackOutput, CachedOutput } from 'net.minecraft.data';
  import { DataProviderContext } from 'fuzs.puzzleslib.api.data.v2.core';
  import { TranslationBuilder } from 'fuzs.puzzleslib.api.client.data.v2.AbstractLanguageProvider';
  import { CompletableFuture } from 'java.util.concurrent';
  import { ModelTemplate, TextureSlot } from 'net.minecraft.data.models.model';
  import { BlockModelGenerators, ItemModelGenerators } from 'net.minecraft.data.models';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Block } from 'net.minecraft.world.level.block';
  import { Item } from 'net.minecraft.world.item';
  import { BiConsumer, Supplier } from 'java.util.function';
  import { JsonElement } from 'com.google.gson';
  import { JsonFactory } from 'ModelTemplate';

  interface AbstractLanguageProvider extends DataProvider {}
  class AbstractLanguageProvider extends DataProvider {
    constructor(context: DataProviderContext);

    constructor(languageCode: string, context: DataProviderContext);

    constructor(modId: string, packOutput: PackOutput);

    constructor(languageCode: string, modId: string, packOutput: PackOutput);
    addTranslations(var1: TranslationBuilder): void;
    get name(): string;
    run(writer: CachedOutput): CompletableFuture<any>;
  }


  interface AbstractModelProvider extends DataProvider {}
  class AbstractModelProvider extends DataProvider {
    static readonly BLOCK_PATH: string;
    static readonly ITEM_PATH: string;
    static readonly SPAWN_EGG: ModelTemplate;
    constructor(context: DataProviderContext);

    constructor(modId: string, packOutput: PackOutput);
    addBlockModels(builder: BlockModelGenerators): void;
    addItemModels(builder: ItemModelGenerators): void;
    static createBlockModelTemplate(blockModelLocation: ResourceLocation, ...requiredSlots: TextureSlot[]): ModelTemplate;
    static createBlockModelTemplate(blockModelLocation: ResourceLocation, suffix: string, ...requiredSlots: TextureSlot[]): ModelTemplate;
    static createItemModelTemplate(itemModelLocation: ResourceLocation, ...requiredSlots: TextureSlot[]): ModelTemplate;
    static createItemModelTemplate(itemModelLocation: ResourceLocation, suffix: string, ...requiredSlots: TextureSlot[]): ModelTemplate;
    static decorateBlockModelLocation(resourceLocation: ResourceLocation): ResourceLocation;
    static decorateItemModelLocation(resourceLocation: ResourceLocation): ResourceLocation;
    static generateFlatItem(resourceLocation: ResourceLocation, modelTemplate: ModelTemplate, modelOutput: BiConsumer<ResourceLocation, Supplier<JsonElement>>): ResourceLocation;
    static generateFlatItem(item: Item, modelTemplate: ModelTemplate, modelOutput: BiConsumer<ResourceLocation, Supplier<JsonElement>>, factory: JsonFactory): ResourceLocation;
    get name(): string;
    static getLocation(block: Block): ResourceLocation;
    static getLocation(item: Item): ResourceLocation;
    static getModelLocation(block: Block): ResourceLocation;
    static getModelLocation(item: Item): ResourceLocation;
    static getName(block: Block): string;
    static getName(item: Item): string;
    run(output: CachedOutput): CompletableFuture<any>;
    static stripUntil(resourceLocation: ResourceLocation, s: string): ResourceLocation;
  }

}

declare module 'fuzs.puzzleslib.api.client.data.v2.AbstractLanguageProvider' {
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Holder } from 'net.minecraft.core';
  import { TagKey } from 'net.minecraft.tags';
  import { Block } from 'net.minecraft.world.level.block';
  import { Item, CreativeModeTab } from 'net.minecraft.world.item';
  import { Enchantment } from 'net.minecraft.world.item.enchantment';
  import { MobEffect } from 'net.minecraft.world.effect';
  import { EntityType } from 'net.minecraft.world.entity';
  import { Attribute } from 'net.minecraft.world.entity.ai.attributes';
  import { StatType } from 'net.minecraft.stats';
  import { Key } from 'GameRules';
  import { Potion } from 'net.minecraft.world.item.alchemy';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { KeyMapping } from 'net.minecraft.client';
  import { Component } from 'net.minecraft.network.chat';
  import { DamageType } from 'net.minecraft.world.damagesource';

  class TranslationBuilder {
    add(var1: string, var2: string): void;
    add(translationKey: string, additionalKey: string, value: string): void;
    add(resourceLocation: ResourceLocation, value: string): void;
    add(resourceLocation: ResourceLocation, additionalKey: string, value: string): void;
    add(registry: string, holder: Holder<any>, value: string): void;
    add(registry: string, resourceKey: ResourceKey<any>, value: string): void;
    add(registry: string, resourceLocation: ResourceLocation, value: string): void;
    add(tagKey: TagKey<any>, value: string): void;
    add(block: Block, value: string): void;
    add(block: Block, additionalKey: string, value: string): void;
    add(item: Item, value: string): void;
    add(item: Item, additionalKey: string, value: string): void;
    add(mobEffect: MobEffect, value: string): void;
    add(mobEffect: MobEffect, additionalKey: string, value: string): void;
    add(entityType: EntityType<any>, value: string): void;
    add(entityType: EntityType<any>, additionalKey: string, value: string): void;
    add(attribute: Attribute, value: string): void;
    add(attribute: Attribute, additionalKey: string, value: string): void;
    add(statType: StatType<any>, value: string): void;
    add(statType: StatType<any>, additionalKey: string, value: string): void;
    add(gameRule: Key<any>, value: string): void;
    add(gameRule: Key<any>, additionalKey: string, value: string): void;
    add(soundEvent: SoundEvent, value: string): void;
    add(keyMapping: KeyMapping, value: string): void;
    add(tab: CreativeModeTab, value: string): void;
    add(component: Component, value: string): void;
    addAttribute(attribute: Holder<Attribute>, value: string): void;
    addBlock(block: Holder<Block>, value: string): void;
    addCreativeModeTab(modId: string, value: string): void;
    addCreativeModeTab(modId: string, tabId: string, value: string): void;
    addCreativeModeTab(resourceLocation: ResourceLocation, value: string): void;
    addCreativeModeTab(resourceKey: ResourceKey<CreativeModeTab>, value: string): void;
    addEnchantment(enchantment: ResourceKey<Enchantment>, value: string): void;
    addEnchantment(enchantment: ResourceKey<Enchantment>, additionalKey: string, value: string): void;
    addEntityType(entityType: Holder<EntityType<any>>, value: string): void;
    addGameRuleDescription(gameRule: Key<any>, value: string): void;
    addGenericDamageType(damageType: ResourceKey<DamageType>, value: string): void;
    addItem(item: Holder<Item>, value: string): void;
    addItemDamageType(damageType: ResourceKey<DamageType>, value: string): void;
    addKeyCategory(modId: string, value: string): void;
    addMobEffect(mobEffect: Holder<MobEffect>, value: string): void;
    addPlayerDamageType(damageType: ResourceKey<DamageType>, value: string): void;
    addPotion(potion: Holder<Potion>, value: string): void;
    addSoundEvent(soundEvent: Holder<SoundEvent>, value: string): void;
    addSpawnEgg(item: Item, value: string): void;
  }

}

declare module 'fuzs.puzzleslib.api.client.data.v2.models' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Block } from 'net.minecraft.world.level.block';
  import { Item } from 'net.minecraft.world.item';
  import { ModelTemplate, TextureSlot } from 'net.minecraft.data.models.model';
  import { BiConsumer, Supplier } from 'java.util.function';
  import { JsonElement } from 'com.google.gson';
  import { JsonFactory } from 'ModelTemplate';

  class ModelLocationHelper {
    static readonly BLOCK_PATH: string;
    static readonly ITEM_PATH: string;
    static getBlockLocation(block: Block): ResourceLocation;
    static getBlockLocation(block: Block, suffix: string): ResourceLocation;
    static getBlockModel(block: Block): ResourceLocation;
    static getBlockModel(block: Block, suffix: string): ResourceLocation;
    static getBlockModel(resourceLocation: ResourceLocation): ResourceLocation;
    static getBlockModel(resourceLocation: ResourceLocation, suffix: string): ResourceLocation;
    static getBlockName(block: Block): string;
    static getBlockTexture(block: Block): ResourceLocation;
    static getBlockTexture(block: Block, suffix: string): ResourceLocation;
    static getBlockTexture(resourceLocation: ResourceLocation): ResourceLocation;
    static getBlockTexture(resourceLocation: ResourceLocation, suffix: string): ResourceLocation;
    static getItemLocation(item: Item): ResourceLocation;
    static getItemLocation(item: Item, suffix: string): ResourceLocation;
    static getItemModel(item: Item): ResourceLocation;
    static getItemModel(item: Item, suffix: string): ResourceLocation;
    static getItemModel(resourceLocation: ResourceLocation): ResourceLocation;
    static getItemModel(resourceLocation: ResourceLocation, suffix: string): ResourceLocation;
    static getItemName(item: Item): string;
    static getItemTexture(item: Item): ResourceLocation;
    static getItemTexture(item: Item, suffix: string): ResourceLocation;
    static getItemTexture(resourceLocation: ResourceLocation): ResourceLocation;
    static getItemTexture(resourceLocation: ResourceLocation, suffix: string): ResourceLocation;
  }


  class ModelTemplateHelper {
    static createBlockModelTemplate(resourceLocation: ResourceLocation, ...requiredSlots: TextureSlot[]): ModelTemplate;
    static createBlockModelTemplate(resourceLocation: ResourceLocation, suffix: string, ...requiredSlots: TextureSlot[]): ModelTemplate;
    static createItemModelTemplate(resourceLocation: ResourceLocation, ...requiredSlots: TextureSlot[]): ModelTemplate;
    static createItemModelTemplate(resourceLocation: ResourceLocation, suffix: string, ...requiredSlots: TextureSlot[]): ModelTemplate;
    static generateFlatItem(item: Item, modelOutput: BiConsumer<ResourceLocation, Supplier<JsonElement>>): ResourceLocation;
    static generateFlatItem(item: Item, modelTemplate: ModelTemplate, modelOutput: BiConsumer<ResourceLocation, Supplier<JsonElement>>): ResourceLocation;
    static generateFlatItem(item: Item, modelTemplate: ModelTemplate, modelOutput: BiConsumer<ResourceLocation, Supplier<JsonElement>>, factory: JsonFactory): ResourceLocation;
    static generateFlatItem(item: Item, layerItem: Item, modelOutput: BiConsumer<ResourceLocation, Supplier<JsonElement>>): ResourceLocation;
    static generateFlatItem(item: Item, layerItem: Item, modelTemplate: ModelTemplate, modelOutput: BiConsumer<ResourceLocation, Supplier<JsonElement>>): ResourceLocation;
    static generateFlatItem(item: Item, layerItem: Item, modelTemplate: ModelTemplate, modelOutput: BiConsumer<ResourceLocation, Supplier<JsonElement>>, factory: JsonFactory): ResourceLocation;
    static generateFlatItem(resourceLocation: ResourceLocation, modelOutput: BiConsumer<ResourceLocation, Supplier<JsonElement>>): ResourceLocation;
    static generateFlatItem(resourceLocation: ResourceLocation, modelTemplate: ModelTemplate, modelOutput: BiConsumer<ResourceLocation, Supplier<JsonElement>>): ResourceLocation;
    static generateFlatItem(resourceLocation: ResourceLocation, modelTemplate: ModelTemplate, modelOutput: BiConsumer<ResourceLocation, Supplier<JsonElement>>, factory: JsonFactory): ResourceLocation;
    static generateFlatItem(resourceLocation: ResourceLocation, layer0: ResourceLocation, modelOutput: BiConsumer<ResourceLocation, Supplier<JsonElement>>): ResourceLocation;
    static generateFlatItem(resourceLocation: ResourceLocation, layer0: ResourceLocation, modelTemplate: ModelTemplate, modelOutput: BiConsumer<ResourceLocation, Supplier<JsonElement>>): ResourceLocation;
    static generateFlatItem(resourceLocation: ResourceLocation, layer0: ResourceLocation, modelTemplate: ModelTemplate, modelOutput: BiConsumer<ResourceLocation, Supplier<JsonElement>>, factory: JsonFactory): ResourceLocation;
    static generateLayeredItem(item: Item, layer0: ResourceLocation, layer1: ResourceLocation, modelOutput: BiConsumer<ResourceLocation, Supplier<JsonElement>>): ResourceLocation;
    static generateLayeredItem(item: Item, layer0: ResourceLocation, layer1: ResourceLocation, modelTemplate: ModelTemplate, modelOutput: BiConsumer<ResourceLocation, Supplier<JsonElement>>): ResourceLocation;
    static generateLayeredItem(item: Item, layer0: ResourceLocation, layer1: ResourceLocation, modelTemplate: ModelTemplate, modelOutput: BiConsumer<ResourceLocation, Supplier<JsonElement>>, factory: JsonFactory): ResourceLocation;
    static generateLayeredItem(resourceLocation: ResourceLocation, layer0: ResourceLocation, layer1: ResourceLocation, modelOutput: BiConsumer<ResourceLocation, Supplier<JsonElement>>): ResourceLocation;
    static generateLayeredItem(resourceLocation: ResourceLocation, layer0: ResourceLocation, layer1: ResourceLocation, modelTemplate: ModelTemplate, modelOutput: BiConsumer<ResourceLocation, Supplier<JsonElement>>): ResourceLocation;
    static generateLayeredItem(resourceLocation: ResourceLocation, layer0: ResourceLocation, layer1: ResourceLocation, modelTemplate: ModelTemplate, modelOutput: BiConsumer<ResourceLocation, Supplier<JsonElement>>, factory: JsonFactory): ResourceLocation;
  }

}

declare module 'fuzs.puzzleslib.api.client.event.v1' {
  import { EventInvoker } from 'fuzs.puzzleslib.api.event.v1.core';
  import { BiConsumer } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { PreparableReloadListener } from 'net.minecraft.server.packs.resources';

  class AddResourcePackReloadListenersCallback {
    static readonly EVENT: EventInvoker;
    onAddResourcePackReloadListeners(var1: BiConsumer<ResourceLocation, PreparableReloadListener>): void;
  }


  class ClientTickEvents {
    static readonly START: EventInvoker;
    static readonly END: EventInvoker;
  }


  class InputEvents {
    static readonly MOUSE_CLICK: EventInvoker;
    static readonly MOUSE_SCROLL: EventInvoker;
    static readonly KEY_PRESS: EventInvoker;
  }


  class ModelEvents {
    static readonly MODIFY_UNBAKED_MODEL: EventInvoker;
    static readonly MODIFY_BAKED_MODEL: EventInvoker;
    static readonly ADD_ADDITIONAL_BAKED_MODEL: EventInvoker;
    static readonly COMPLETE_MODEL_LOADING: EventInvoker;
  }

}

declare module 'fuzs.puzzleslib.api.client.event.v1.ClientTickEvents' {
  import { Minecraft } from 'net.minecraft.client';

  class Start {
    onStartClientTick(var1: Minecraft): void;
  }


  class End {
    onEndClientTick(var1: Minecraft): void;
  }

}

declare module 'fuzs.puzzleslib.api.client.event.v1.entity' {
  import { EventInvoker } from 'fuzs.puzzleslib.api.event.v1.core';

  class ClientEntityLevelEvents {
    static readonly LOAD: EventInvoker;
    static readonly UNLOAD: EventInvoker;
  }

}

declare module 'fuzs.puzzleslib.api.client.event.v1.entity.ClientEntityLevelEvents' {
  import { EventResult } from 'fuzs.puzzleslib.api.event.v1.core';
  import { Entity } from 'net.minecraft.world.entity';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';

  class Load {
    onEntityLoad(var1: Entity, var2: ClientLevel): EventResult;
  }


  class Unload {
    onEntityUnload(var1: Entity, var2: ClientLevel): void;
  }

}

declare module 'fuzs.puzzleslib.api.client.event.v1.entity.player' {
  import { EventInvoker } from 'fuzs.puzzleslib.api.event.v1.core';
  import { LocalPlayer, Input } from 'net.minecraft.client.player';
  import { MultiPlayerGameMode } from 'net.minecraft.client.multiplayer';
  import { Connection } from 'net.minecraft.network';
  import { Player } from 'net.minecraft.world.entity.player';
  import { DefaultedFloat } from 'fuzs.puzzleslib.api.event.v1.data';

  class ClientPlayerCopyCallback {
    static readonly EVENT: EventInvoker;
    onCopy(var1: LocalPlayer, var2: LocalPlayer, var3: MultiPlayerGameMode, var4: Connection): void;
  }


  class ClientPlayerNetworkEvents {
    static readonly LOGGED_IN: EventInvoker;
    static readonly LOGGED_OUT: EventInvoker;
  }


  class ComputeFovModifierCallback {
    static readonly EVENT: EventInvoker;
    onComputeFovModifier(var1: Player, var2: DefaultedFloat): void;
  }


  class InteractionInputEvents {
    static readonly ATTACK: EventInvoker;
    static readonly USE: EventInvoker;
    static readonly PICK: EventInvoker;
  }


  class MovementInputUpdateCallback {
    static readonly EVENT: EventInvoker;
    onMovementInputUpdate(var1: LocalPlayer, var2: Input): void;
  }

}

declare module 'fuzs.puzzleslib.api.client.event.v1.entity.player.ClientPlayerNetworkEvents' {
  import { LocalPlayer } from 'net.minecraft.client.player';
  import { MultiPlayerGameMode } from 'net.minecraft.client.multiplayer';
  import { Connection } from 'net.minecraft.network';

  class LoggedIn {
    onLoggedIn(var1: LocalPlayer, var2: MultiPlayerGameMode, var3: Connection): void;
  }


  class LoggedOut {
    onLoggedOut(var1: LocalPlayer, var2: MultiPlayerGameMode, var3: Connection): void;
  }

}

declare module 'fuzs.puzzleslib.api.client.event.v1.entity.player.InteractionInputEvents' {
  import { EventResult } from 'fuzs.puzzleslib.api.event.v1.core';
  import { Minecraft } from 'net.minecraft.client';
  import { LocalPlayer } from 'net.minecraft.client.player';
  import { HitResult } from 'net.minecraft.world.phys';
  import { InteractionHand } from 'net.minecraft.world';

  class Attack {
    onAttackInteraction(var1: Minecraft, var2: LocalPlayer, var3: HitResult): EventResult;
  }


  class Use {
    onUseInteraction(var1: Minecraft, var2: LocalPlayer, var3: InteractionHand, var4: HitResult): EventResult;
  }


  class Pick {
    onPickInteraction(var1: Minecraft, var2: LocalPlayer, var3: HitResult): EventResult;
  }

}

declare module 'fuzs.puzzleslib.api.client.event.v1.gui' {
  import { EventInvoker, EventResult } from 'fuzs.puzzleslib.api.event.v1.core';
  import { ToastComponent, Toast } from 'net.minecraft.client.gui.components.toasts';
  import { MutableValue, MutableInt, MutableBoolean, DefaultedValue } from 'fuzs.puzzleslib.api.event.v1.data';
  import { Component, PlayerChatMessage } from 'net.minecraft.network.chat';
  import { Bound } from 'ChatType';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { DeltaTracker, Minecraft } from 'net.minecraft.client';
  import { EffectRenderingInventoryScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { MobEffectInstance } from 'net.minecraft.world.effect';
  import { List } from 'java.util';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { TooltipContext } from 'Item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Before, After } from 'fuzs.puzzleslib.api.client.event.v1.gui.RenderGuiLayerEvents';
  import { ClientTooltipComponent, ClientTooltipPositioner } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { BeforeInit, AfterInit, Remove, BeforeRender, AfterRender } from 'fuzs.puzzleslib.api.client.event.v1.gui.ScreenEvents';
  import { Class } from 'java.lang';
  import { BeforeKeyPress, AfterKeyPress, BeforeKeyRelease, AfterKeyRelease } from 'fuzs.puzzleslib.api.client.event.v1.gui.ScreenKeyboardEvents';
  import { BeforeMouseClick, AfterMouseClick, BeforeMouseRelease, AfterMouseRelease, BeforeMouseScroll, AfterMouseScroll, BeforeMouseDrag, AfterMouseDrag } from 'fuzs.puzzleslib.api.client.event.v1.gui.ScreenMouseEvents';

  class AddToastCallback {
    static readonly EVENT: EventInvoker;
    onAddToast(var1: ToastComponent, var2: Toast): EventResult;
  }


  class ChatMessageReceivedCallback {
    static readonly EVENT: EventInvoker;
    onChatMessageReceived(var1: MutableValue<Component>, var2: Bound, var3: PlayerChatMessage, var4: boolean): EventResult;
  }


  class ContainerScreenEvents {
    static readonly BACKGROUND: EventInvoker;
    static readonly FOREGROUND: EventInvoker;
  }


  class CustomizeChatPanelCallback {
    static readonly EVENT: EventInvoker;
    onRenderChatPanel(var1: GuiGraphics, var2: DeltaTracker, var3: MutableInt, var4: MutableInt): void;
  }


  class GatherDebugTextEvents {
    static readonly LEFT: EventInvoker;
    static readonly RIGHT: EventInvoker;
  }


  class GatherEffectScreenTooltipCallback {
    static readonly EVENT: EventInvoker;
    onGatherEffectScreenTooltip(var1: EffectRenderingInventoryScreen<any>, var2: MobEffectInstance, var3: Component[]): void;
  }


  class InventoryMobEffectsCallback {
    static readonly EVENT: EventInvoker;
    onInventoryMobEffects(var1: Screen, var2: number, var3: MutableBoolean, var4: MutableInt): EventResult;
  }


  class ItemTooltipCallback {
    static readonly EVENT: EventInvoker;
    onItemTooltip(var1: ItemStack, var2: Component[], var3: TooltipContext, var4: Player, var5: TooltipFlag): void;
  }


  class RenderGuiCallback {
    static readonly EVENT: EventInvoker;
    onRenderGui(var1: Minecraft, var2: GuiGraphics, var3: DeltaTracker): void;
  }


  class RenderGuiEvents {
    static readonly BEFORE: EventInvoker;
    static readonly AFTER: EventInvoker;
  }


  class RenderGuiLayerEvents {
    static readonly VANILLA_GUI_LAYERS_VIEW: List;
    static readonly CAMERA_OVERLAYS: ResourceLocation;
    static readonly CROSSHAIR: ResourceLocation;
    static readonly HOTBAR: ResourceLocation;
    static readonly JUMP_METER: ResourceLocation;
    static readonly EXPERIENCE_BAR: ResourceLocation;
    static readonly PLAYER_HEALTH: ResourceLocation;
    static readonly ARMOR_LEVEL: ResourceLocation;
    static readonly FOOD_LEVEL: ResourceLocation;
    static readonly VEHICLE_HEALTH: ResourceLocation;
    static readonly AIR_LEVEL: ResourceLocation;
    static readonly SELECTED_ITEM_NAME: ResourceLocation;
    static readonly SPECTATOR_TOOLTIP: ResourceLocation;
    static readonly EXPERIENCE_LEVEL: ResourceLocation;
    static readonly EFFECTS: ResourceLocation;
    static readonly BOSS_OVERLAY: ResourceLocation;
    static readonly SLEEP_OVERLAY: ResourceLocation;
    static readonly DEMO_OVERLAY: ResourceLocation;
    static readonly DEBUG_OVERLAY: ResourceLocation;
    static readonly SCOREBOARD_SIDEBAR: ResourceLocation;
    static readonly OVERLAY_MESSAGE: ResourceLocation;
    static readonly TITLE: ResourceLocation;
    static readonly CHAT: ResourceLocation;
    static readonly TAB_LIST: ResourceLocation;
    static readonly SUBTITLE_OVERLAY: ResourceLocation;
    static readonly SAVING_INDICATOR: ResourceLocation;
    static after(resourceLocation: ResourceLocation): EventInvoker<After>;
    static before(resourceLocation: ResourceLocation): EventInvoker<Before>;
  }


  class RenderTooltipCallback {
    static readonly EVENT: EventInvoker;
    onRenderTooltip(var1: GuiGraphics, var2: Font, var3: number, var4: number, var5: ClientTooltipComponent[], var6: ClientTooltipPositioner): EventResult;
  }


  class ScreenEvents {
    static afterInit<T extends Screen>(screen: Class<T>): EventInvoker<AfterInit<T>>;
    static afterRender<T extends Screen>(screen: Class<T>): EventInvoker<AfterRender<T>>;
    static beforeInit<T extends Screen>(screen: Class<T>): EventInvoker<BeforeInit<T>>;
    static beforeRender<T extends Screen>(screen: Class<T>): EventInvoker<BeforeRender<T>>;
    static remove<T extends Screen>(screen: Class<T>): EventInvoker<Remove<T>>;
  }


  class ScreenKeyboardEvents {
    static afterKeyPress<T extends Screen>(screen: Class<T>): EventInvoker<AfterKeyPress<T>>;
    static afterKeyRelease<T extends Screen>(screen: Class<T>): EventInvoker<AfterKeyRelease<T>>;
    static beforeKeyPress<T extends Screen>(screen: Class<T>): EventInvoker<BeforeKeyPress<T>>;
    static beforeKeyRelease<T extends Screen>(screen: Class<T>): EventInvoker<BeforeKeyRelease<T>>;
  }


  class ScreenMouseEvents {
    static afterMouseClick<T extends Screen>(screen: Class<T>): EventInvoker<AfterMouseClick<T>>;
    static afterMouseDrag<T extends Screen>(screen: Class<T>): EventInvoker<AfterMouseDrag<T>>;
    static afterMouseRelease<T extends Screen>(screen: Class<T>): EventInvoker<AfterMouseRelease<T>>;
    static afterMouseScroll<T extends Screen>(screen: Class<T>): EventInvoker<AfterMouseScroll<T>>;
    static beforeMouseClick<T extends Screen>(screen: Class<T>): EventInvoker<BeforeMouseClick<T>>;
    static beforeMouseDrag<T extends Screen>(screen: Class<T>): EventInvoker<BeforeMouseDrag<T>>;
    static beforeMouseRelease<T extends Screen>(screen: Class<T>): EventInvoker<BeforeMouseRelease<T>>;
    static beforeMouseScroll<T extends Screen>(screen: Class<T>): EventInvoker<BeforeMouseScroll<T>>;
  }


  class ScreenOpeningCallback {
    static readonly EVENT: EventInvoker;
    onScreenOpening(var1: Screen, var2: DefaultedValue<Screen>): EventResult;
  }

}

declare module 'fuzs.puzzleslib.api.client.event.v1.gui.ContainerScreenEvents' {
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class Background {
    onDrawBackground(var1: AbstractContainerScreen<any>, var2: GuiGraphics, var3: number, var4: number): void;
  }


  class Foreground {
    onDrawForeground(var1: AbstractContainerScreen<any>, var2: GuiGraphics, var3: number, var4: number): void;
  }

}

declare module 'fuzs.puzzleslib.api.client.event.v1.gui.GatherDebugTextEvents' {
  import { Window } from 'com.mojang.blaze3d.platform';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { DeltaTracker } from 'net.minecraft.client';
  import { List } from 'java.util';

  class Left {
    onGatherLeftDebugText(var1: Window, var2: GuiGraphics, var3: DeltaTracker, var4: string[]): void;
  }


  class Right {
    onGatherRightDebugText(var1: Window, var2: GuiGraphics, var3: DeltaTracker, var4: string[]): void;
  }

}

declare module 'fuzs.puzzleslib.api.client.event.v1.gui.RenderGuiEvents' {
  import { Gui, GuiGraphics } from 'net.minecraft.client.gui';
  import { DeltaTracker } from 'net.minecraft.client';

  class Before {
    onBeforeRenderGui(var1: Gui, var2: GuiGraphics, var3: DeltaTracker): void;
  }


  class After {
    onAfterRenderGui(var1: Gui, var2: GuiGraphics, var3: DeltaTracker): void;
  }

}

declare module 'fuzs.puzzleslib.api.client.event.v1.gui.RenderGuiLayerEvents' {
  import { EventResult } from 'fuzs.puzzleslib.api.event.v1.core';
  import { Minecraft, DeltaTracker } from 'net.minecraft.client';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class Before {
    onBeforeRenderGuiLayer(var1: Minecraft, var2: GuiGraphics, var3: DeltaTracker): EventResult;
  }


  class After {
    onAfterRenderGuiLayer(var1: Minecraft, var2: GuiGraphics, var3: DeltaTracker): void;
  }

}

declare module 'fuzs.puzzleslib.api.client.event.v1.gui.ScreenEvents' {
  import { Minecraft } from 'net.minecraft.client';
  import { List } from 'java.util';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { UnaryOperator, Consumer } from 'java.util.function';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class BeforeInit<T extends Screen = any> {
    onBeforeInit(var1: Minecraft, var2: T, var3: number, var4: number, var5: AbstractWidget[]): void;
  }


  class AfterInit<T extends Screen = any> {
    onAfterInit(var1: Minecraft, var2: T, var3: number, var4: number, var5: AbstractWidget[], var6: UnaryOperator<AbstractWidget>, var7: Consumer<AbstractWidget>): void;
  }


  class Remove<T extends Screen = any> {
    onRemove(var1: T): void;
  }


  class BeforeRender<T extends Screen = any> {
    onBeforeRender(var1: T, var2: GuiGraphics, var3: number, var4: number, var5: number): void;
  }


  class AfterRender<T extends Screen = any> {
    onAfterRender(var1: T, var2: GuiGraphics, var3: number, var4: number, var5: number): void;
  }

}

declare module 'fuzs.puzzleslib.api.client.event.v1.gui.ScreenKeyboardEvents' {
  import { EventResult } from 'fuzs.puzzleslib.api.event.v1.core';

  class BeforeKeyPress<T extends Screen = any> {
    onBeforeKeyPress(var1: T, var2: number, var3: number, var4: number): EventResult;
  }


  class AfterKeyPress<T extends Screen = any> {
    onAfterKeyPress(var1: T, var2: number, var3: number, var4: number): void;
  }


  class BeforeKeyRelease<T extends Screen = any> {
    onBeforeKeyRelease(var1: T, var2: number, var3: number, var4: number): EventResult;
  }


  class AfterKeyRelease<T extends Screen = any> {
    onAfterKeyRelease(var1: T, var2: number, var3: number, var4: number): void;
  }

}

declare module 'fuzs.puzzleslib.api.client.event.v1.gui.ScreenMouseEvents' {
  import { EventResult } from 'fuzs.puzzleslib.api.event.v1.core';

  class BeforeMouseClick<T extends Screen = any> {
    onBeforeMouseClick(var1: T, var2: number, var4: number, var6: number): EventResult;
  }


  class AfterMouseClick<T extends Screen = any> {
    onAfterMouseClick(var1: T, var2: number, var4: number, var6: number): void;
  }


  class BeforeMouseRelease<T extends Screen = any> {
    onBeforeMouseRelease(var1: T, var2: number, var4: number, var6: number): EventResult;
  }


  class AfterMouseRelease<T extends Screen = any> {
    onAfterMouseRelease(var1: T, var2: number, var4: number, var6: number): void;
  }


  class BeforeMouseScroll<T extends Screen = any> {
    onBeforeMouseScroll(var1: T, var2: number, var4: number, var6: number, var8: number): EventResult;
  }


  class AfterMouseScroll<T extends Screen = any> {
    onAfterMouseScroll(var1: T, var2: number, var4: number, var6: number, var8: number): void;
  }


  class BeforeMouseDrag<T extends Screen = any> {
    onBeforeMouseDrag(var1: T, var2: number, var4: number, var6: number, var7: number, var9: number): EventResult;
  }


  class AfterMouseDrag<T extends Screen = any> {
    onAfterMouseDrag(var1: T, var2: number, var4: number, var6: number, var7: number, var9: number): void;
  }

}

declare module 'fuzs.puzzleslib.api.client.event.v1.InputEvents' {
  import { EventResult } from 'fuzs.puzzleslib.api.event.v1.core';

  class MouseClick {
    onMouseClick(var1: number, var2: number, var3: number): EventResult;
  }


  class MouseScroll {
    onMouseScroll(var1: boolean, var2: boolean, var3: boolean, var4: number, var6: number): EventResult;
  }


  class KeyPress {
    onKeyPress(var1: number, var2: number, var3: number, var4: number): EventResult;
  }

}

declare module 'fuzs.puzzleslib.api.client.event.v1.level' {
  import { EventInvoker } from 'fuzs.puzzleslib.api.event.v1.core';

  class ClientChunkEvents {
    static readonly LOAD: EventInvoker;
    static readonly UNLOAD: EventInvoker;
  }


  class ClientLevelEvents {
    static readonly LOAD: EventInvoker;
    static readonly UNLOAD: EventInvoker;
  }


  class ClientLevelTickEvents {
    static readonly START: EventInvoker;
    static readonly END: EventInvoker;
  }

}

declare module 'fuzs.puzzleslib.api.client.event.v1.level.ClientChunkEvents' {
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { LevelChunk } from 'net.minecraft.world.level.chunk';

  class Load {
    onChunkLoad(var1: ClientLevel, var2: LevelChunk): void;
  }


  class Unload {
    onChunkUnload(var1: ClientLevel, var2: LevelChunk): void;
  }

}

declare module 'fuzs.puzzleslib.api.client.event.v1.level.ClientLevelEvents' {
  import { Minecraft } from 'net.minecraft.client';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';

  class Load {
    onLevelLoad(var1: Minecraft, var2: ClientLevel): void;
  }


  class Unload {
    onLevelUnload(var1: Minecraft, var2: ClientLevel): void;
  }

}

declare module 'fuzs.puzzleslib.api.client.event.v1.level.ClientLevelTickEvents' {
  import { Minecraft } from 'net.minecraft.client';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';

  class Start {
    onStartLevelTick(var1: Minecraft, var2: ClientLevel): void;
  }


  class End {
    onEndLevelTick(var1: Minecraft, var2: ClientLevel): void;
  }

}

declare module 'fuzs.puzzleslib.api.client.event.v1.ModelEvents' {
  import { EventResultHolder } from 'fuzs.puzzleslib.api.event.v1.core';
  import { UnbakedModel, ModelResourceLocation, BakedModel, ModelBaker, ModelManager, ModelBakery } from 'net.minecraft.client.resources.model';
  import { Supplier, Function, BiConsumer } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';

  class ModifyUnbakedModel {
    onModifyUnbakedModel(var1: ModelResourceLocation, var2: Supplier<UnbakedModel>, var3: Function<ModelResourceLocation, UnbakedModel>, var4: BiConsumer<ResourceLocation, UnbakedModel>): EventResultHolder<UnbakedModel>;
  }


  class ModifyBakedModel {
    onModifyBakedModel(var1: ModelResourceLocation, var2: Supplier<BakedModel>, var3: Supplier<ModelBaker>, var4: Function<ModelResourceLocation, BakedModel>, var5: BiConsumer<ModelResourceLocation, BakedModel>): EventResultHolder<BakedModel>;
  }


  class AddAdditionalBakedModel {
    onAddAdditionalBakedModel(var1: BiConsumer<ModelResourceLocation, BakedModel>, var2: Function<ModelResourceLocation, BakedModel>, var3: Supplier<ModelBaker>): void;
  }


  class CompleteModelLoading {
    onCompleteModelLoading(var1: Supplier<ModelManager>, var2: Supplier<ModelBakery>): void;
  }

}

declare module 'fuzs.puzzleslib.api.client.event.v1.renderer' {
  import { EventInvoker, EventResult } from 'fuzs.puzzleslib.api.event.v1.core';
  import { GameRenderer, LevelRenderer, MultiBufferSource } from 'net.minecraft.client.renderer';
  import { Camera, DeltaTracker } from 'net.minecraft.client';
  import { MutableFloat, MutableDouble, DefaultedValue } from 'fuzs.puzzleslib.api.event.v1.data';
  import { LocalPlayer } from 'net.minecraft.client.player';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { HitResult } from 'net.minecraft.world.phys';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { Entity } from 'net.minecraft.world.entity';
  import { Component } from 'net.minecraft.network.chat';
  import { EntityRenderer } from 'net.minecraft.client.renderer.entity';

  class ComputeCameraAnglesCallback {
    static readonly EVENT: EventInvoker;
    onComputeCameraAngles(var1: GameRenderer, var2: Camera, var3: number, var4: MutableFloat, var5: MutableFloat, var6: MutableFloat): void;
  }


  class ComputeFieldOfViewCallback {
    static readonly EVENT: EventInvoker;
    onComputeFieldOfView(var1: GameRenderer, var2: Camera, var3: number, var4: MutableDouble): void;
  }


  class FogEvents {
    static readonly RENDER: EventInvoker;
    static readonly COMPUTE_COLOR: EventInvoker;
  }


  class GameRenderEvents {
    static readonly BEFORE: EventInvoker;
    static readonly AFTER: EventInvoker;
  }


  class RenderBlockOverlayCallback {
    static readonly EVENT: EventInvoker;
    onRenderBlockOverlay(var1: LocalPlayer, var2: PoseStack, var3: BlockState): EventResult;
  }


  class RenderHandEvents {
    static readonly MAIN_HAND: EventInvoker;
    static readonly OFF_HAND: EventInvoker;
  }


  class RenderHighlightCallback {
    static readonly EVENT: EventInvoker;
    onRenderHighlight(var1: LevelRenderer, var2: Camera, var3: GameRenderer, var4: HitResult, var5: DeltaTracker, var6: PoseStack, var7: MultiBufferSource, var8: ClientLevel): EventResult;
  }


  class RenderLevelEvents {
    static readonly AFTER_TERRAIN: EventInvoker;
    static readonly AFTER_ENTITIES: EventInvoker;
    static readonly AFTER_TRANSLUCENT: EventInvoker;
    static readonly AFTER_LEVEL: EventInvoker;
  }


  class RenderLivingEvents {
    static readonly BEFORE: EventInvoker;
    static readonly AFTER: EventInvoker;
  }


  class RenderNameTagCallback {
    static readonly EVENT: EventInvoker;
    onRenderNameTag(var1: Entity, var2: DefaultedValue<Component>, var3: EntityRenderer<any>, var4: PoseStack, var5: MultiBufferSource, var6: number, var7: number): EventResult;
  }


  class RenderPlayerEvents {
    static readonly BEFORE: EventInvoker;
    static readonly AFTER: EventInvoker;
  }

}

declare module 'fuzs.puzzleslib.api.client.event.v1.renderer.FogEvents' {
  import { GameRenderer } from 'net.minecraft.client.renderer';
  import { Camera } from 'net.minecraft.client';
  import { FogMode } from 'FogRenderer';
  import { FogType } from 'net.minecraft.world.level.material';
  import { MutableFloat, MutableValue } from 'fuzs.puzzleslib.api.event.v1.data';
  import { FogShape } from 'com.mojang.blaze3d.shaders';

  class Render {
    onRenderFog(var1: GameRenderer, var2: Camera, var3: number, var4: FogMode, var5: FogType, var6: MutableFloat, var7: MutableFloat, var8: MutableValue<FogShape>): void;
  }


  class ComputeColor {
    onComputeFogColor(var1: GameRenderer, var2: Camera, var3: number, var4: MutableFloat, var5: MutableFloat, var6: MutableFloat): void;
  }

}

declare module 'fuzs.puzzleslib.api.client.event.v1.renderer.GameRenderEvents' {
  import { Minecraft, DeltaTracker } from 'net.minecraft.client';
  import { GameRenderer } from 'net.minecraft.client.renderer';

  class Before {
    onBeforeGameRender(var1: Minecraft, var2: GameRenderer, var3: DeltaTracker): void;
  }


  class After {
    onAfterGameRender(var1: Minecraft, var2: GameRenderer, var3: DeltaTracker): void;
  }

}

declare module 'fuzs.puzzleslib.api.client.event.v1.renderer.RenderHandEvents' {
  import { EventResult } from 'fuzs.puzzleslib.api.event.v1.core';
  import { ItemInHandRenderer, MultiBufferSource } from 'net.minecraft.client.renderer';
  import { AbstractClientPlayer } from 'net.minecraft.client.player';
  import { HumanoidArm } from 'net.minecraft.world.entity';
  import { ItemStack } from 'net.minecraft.world.item';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';

  class MainHand {
    onRenderMainHand(var1: ItemInHandRenderer, var2: AbstractClientPlayer, var3: HumanoidArm, var4: ItemStack, var5: PoseStack, var6: MultiBufferSource, var7: number, var8: number, var9: number, var10: number, var11: number): EventResult;
  }


  class OffHand {
    onRenderOffHand(var1: ItemInHandRenderer, var2: AbstractClientPlayer, var3: HumanoidArm, var4: ItemStack, var5: PoseStack, var6: MultiBufferSource, var7: number, var8: number, var9: number, var10: number, var11: number): EventResult;
  }

}

declare module 'fuzs.puzzleslib.api.client.event.v1.renderer.RenderLevelEvents' {
  import { LevelRenderer, GameRenderer } from 'net.minecraft.client.renderer';
  import { Camera, DeltaTracker } from 'net.minecraft.client';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { Matrix4f } from 'org.joml';
  import { Frustum } from 'net.minecraft.client.renderer.culling';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';

  class AfterTerrain {
    onRenderLevelAfterTerrain(var1: LevelRenderer, var2: Camera, var3: GameRenderer, var4: DeltaTracker, var5: PoseStack, var6: Matrix4f, var7: Frustum, var8: ClientLevel): void;
  }


  class AfterEntities {
    onRenderLevelAfterEntities(var1: LevelRenderer, var2: Camera, var3: GameRenderer, var4: DeltaTracker, var5: PoseStack, var6: Matrix4f, var7: Frustum, var8: ClientLevel): void;
  }


  class AfterTranslucent {
    onRenderLevelAfterTranslucent(var1: LevelRenderer, var2: Camera, var3: GameRenderer, var4: DeltaTracker, var5: PoseStack, var6: Matrix4f, var7: Frustum, var8: ClientLevel): void;
  }


  class AfterLevel {
    onRenderLevelAfterLevel(var1: LevelRenderer, var2: Camera, var3: GameRenderer, var4: DeltaTracker, var5: PoseStack, var6: Matrix4f, var7: Frustum, var8: ClientLevel): void;
  }

}

declare module 'fuzs.puzzleslib.api.client.event.v1.renderer.RenderLivingEvents' {
  import { EventResult } from 'fuzs.puzzleslib.api.event.v1.core';
  import { LivingEntityRenderer } from 'net.minecraft.client.renderer.entity';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { EntityModel } from 'net.minecraft.client.model';

  class Before {
    onBeforeRenderEntity<T extends LivingEntity, M extends EntityModel<T>>(var1: T, var2: LivingEntityRenderer<T, M>, var3: number, var4: PoseStack, var5: MultiBufferSource, var6: number): EventResult;
  }


  class After {
    onAfterRenderEntity<T extends LivingEntity, M extends EntityModel<T>>(var1: T, var2: LivingEntityRenderer<T, M>, var3: number, var4: PoseStack, var5: MultiBufferSource, var6: number): void;
  }

}

declare module 'fuzs.puzzleslib.api.client.event.v1.renderer.RenderPlayerEvents' {
  import { EventResult } from 'fuzs.puzzleslib.api.event.v1.core';
  import { AbstractClientPlayer } from 'net.minecraft.client.player';
  import { PlayerRenderer } from 'net.minecraft.client.renderer.entity.player';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';

  class Before {
    onBeforeRenderPlayer(var1: AbstractClientPlayer, var2: PlayerRenderer, var3: number, var4: PoseStack, var5: MultiBufferSource, var6: number): EventResult;
  }


  class After {
    onAfterRenderPlayer(var1: AbstractClientPlayer, var2: PlayerRenderer, var3: number, var4: PoseStack, var5: MultiBufferSource, var6: number): void;
  }

}

declare module 'fuzs.puzzleslib.api.client.gui.v2.components' {
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { Matrix4f } from 'org.joml';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { AbstractSliderButton, Button } from 'net.minecraft.client.gui.components';
  import { LayoutElement } from 'net.minecraft.client.gui.layouts';
  import { List } from 'java.util';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { ToIntFunction } from 'java.util.function';
  import { OnPress } from 'Button';
  import { Component } from 'net.minecraft.network.chat';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { ClientTooltipComponent } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { TooltipComponent } from 'net.minecraft.world.inventory.tooltip';

  class GuiGraphicsHelper {
    static blitNineSliced(guiGraphics: GuiGraphics, resourceLocation: ResourceLocation, x: number, y: number, width: number, height: number, borderSize: number, spriteWidth: number, spriteHeight: number, uOffset: number, vOffset: number): void;
    static blitNineSliced(guiGraphics: GuiGraphics, resourceLocation: ResourceLocation, x: number, y: number, width: number, height: number, borderWidth: number, borderHeight: number, spriteWidth: number, spriteHeight: number, uOffset: number, vOffset: number): void;
    static blitNineSliced(guiGraphics: GuiGraphics, resourceLocation: ResourceLocation, x: number, y: number, width: number, height: number, borderLeft: number, borderTop: number, borderRight: number, borderBottom: number, spriteWidth: number, spriteHeight: number, uOffset: number, vOffset: number): void;
    static blitNineSliced(guiGraphics: GuiGraphics, resourceLocation: ResourceLocation, x: number, y: number, width: number, height: number, borderLeft: number, borderTop: number, borderRight: number, borderBottom: number, spriteWidth: number, spriteHeight: number, uOffset: number, vOffset: number, textureWidth: number, textureHeight: number): void;
    static blitNineSliced(guiGraphics: GuiGraphics, resourceLocation: ResourceLocation, x: number, y: number, blitOffset: number, width: number, height: number, borderLeft: number, borderTop: number, borderRight: number, borderBottom: number, spriteWidth: number, spriteHeight: number, uOffset: number, vOffset: number, textureWidth: number, textureHeight: number): void;
    static blitNineSlicedSprite(guiGraphics: GuiGraphics, sprite: ResourceLocation, x: number, y: number, width: number, height: number, borderSize: number): void;
    static blitNineSlicedSprite(guiGraphics: GuiGraphics, sprite: ResourceLocation, x: number, y: number, width: number, height: number, borderLeft: number, borderTop: number, borderRight: number, borderBottom: number): void;
    static blitNineSlicedSprite(guiGraphics: GuiGraphics, sprite: ResourceLocation, x: number, y: number, blitOffset: number, width: number, height: number, borderLeft: number, borderTop: number, borderRight: number, borderBottom: number): void;
    static blitTiledSprite(guiGraphics: GuiGraphics, sprite: ResourceLocation, x: number, y: number, width: number, height: number, spriteWidth: number, spriteHeight: number): void;
    static blitTiledSprite(guiGraphics: GuiGraphics, sprite: ResourceLocation, x: number, y: number, blitOffset: number, width: number, height: number, spriteWidth: number, spriteHeight: number): void;
    static blitTiledSprite(guiGraphics: GuiGraphics, sprite: ResourceLocation, x: number, y: number, blitOffset: number, width: number, height: number, spriteWidth: number, spriteHeight: number, uOffset: number, vOffset: number): void;
    static create(poseStack: PoseStack): GuiGraphics;
    static create(matrix4f: Matrix4f): GuiGraphics;
    static fillFrame(guiGraphics: GuiGraphics, posX: number, posY: number, width: number, height: number, borderSize: number, color: number): void;
    static fillFrame(guiGraphics: GuiGraphics, posX: number, posY: number, width: number, height: number, borderSize: number, z: number, color: number): void;
    static fillFrameArea(guiGraphics: GuiGraphics, minX: number, minY: number, maxX: number, maxY: number, borderSize: number, z: number, color: number): void;
    static fillFrameArea(guiGraphics: GuiGraphics, minX: number, minY: number, maxX: number, maxY: number, borderSize: number, color: number): void;
  }


  interface RangedSliderButton extends AbstractSliderButton {}
  class RangedSliderButton extends AbstractSliderButton {
    constructor(x: number, y: number, width: number, height: number, value: number, minValue: number, maxValue: number);
    get scaledValue(): number;
    get value(): number;
    set scaledValue(value: number);
  }


  class ScreenElementPositioner {
    static tryPositionElement(element: LayoutElement, widgets: GuiEventListener[], ...translationKeys: string[]): boolean;
    static tryPositionElement(element: LayoutElement, widgets: GuiEventListener[], tryPositionRightFirst: boolean, ...translationKeys: string[]): boolean;
    static tryPositionElement(element: LayoutElement, widgets: GuiEventListener[], tryPositionRightFirst: boolean, horizontalOffset: number, ...translationKeys: string[]): boolean;
  }


  interface SpritelessImageButton extends Button {}
  class SpritelessImageButton extends Button {
    static readonly TEXTURE_LAYOUT: ToIntFunction;
    static readonly LEGACY_TEXTURE_LAYOUT: ToIntFunction;
    static readonly SINGLE_TEXTURE_LAYOUT: ToIntFunction;
    resourceLocation: ResourceLocation;
    xTexStart: number;
    yTexStart: number;
    yDiffTex: number;
    textureWidth: number;
    textureHeight: number;
    constructor(x: number, y: number, width: number, height: number, xTexStart: number, yTexStart: number, resourceLocation: ResourceLocation, onPress: OnPress);

    constructor(x: number, y: number, width: number, height: number, xTexStart: number, yTexStart: number, yDiffTex: number, resourceLocation: ResourceLocation, onPress: OnPress);

    constructor(x: number, y: number, width: number, height: number, xTexStart: number, yTexStart: number, yDiffTex: number, resourceLocation: ResourceLocation, textureWidth: number, textureHeight: number, onPress: OnPress);

    constructor(x: number, y: number, width: number, height: number, xTexStart: number, yTexStart: number, yDiffTex: number, resourceLocation: ResourceLocation, textureWidth: number, textureHeight: number, onPress: OnPress, message: Component);
    renderString(guiGraphics: GuiGraphics, font: Font, color: number): void;
    renderWidget(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    setDrawBackground(): SpritelessImageButton;
    setTextureCoordinates(xTexStart: number, yTexStart: number): SpritelessImageButton;
    setTextureDimensions(textureWidth: number, textureHeight: number): SpritelessImageButton;
    setTextureLayout(textureLayout: ToIntFunction<Button>): SpritelessImageButton;
  }


  class TooltipRenderHelper {
    static createClientComponents(components: Component[], imageComponents: TooltipComponent[]): ClientTooltipComponent[];
    static createClientComponents(components: Component[], imageComponents: TooltipComponent[], insertAt: number): ClientTooltipComponent[];
    static getTooltip(itemStack: ItemStack): ClientTooltipComponent[];
    static getTooltip(itemStack: ItemStack, tooltipFlag: TooltipFlag): ClientTooltipComponent[];
    static getTooltipLines(itemStack: ItemStack): Component[];
    static getTooltipLines(itemStack: ItemStack, tooltipFlag: TooltipFlag): Component[];
    static renderTooltip(guiGraphics: GuiGraphics, posX: number, posY: number, itemStack: ItemStack): void;
    static renderTooltip(guiGraphics: GuiGraphics, posX: number, posY: number, component: Component, imageComponent: TooltipComponent): void;
    static renderTooltip(guiGraphics: GuiGraphics, posX: number, posY: number, components: Component[], imageComponent: TooltipComponent): void;
    static renderTooltip(guiGraphics: GuiGraphics, posX: number, posY: number, components: Component[]): void;
    static renderTooltip(guiGraphics: GuiGraphics, posX: number, posY: number, components: Component[], imageComponents: TooltipComponent[]): void;
    static renderTooltipComponents(guiGraphics: GuiGraphics, posX: number, posY: number, components: ClientTooltipComponent[]): void;
  }

}

declare module 'fuzs.puzzleslib.api.client.gui.v2.components.tooltip' {
  import { Stream } from 'java.util.stream';
  import { FormattedCharSequence } from 'net.minecraft.util';
  import { FormattedText } from 'net.minecraft.network.chat';
  import { List } from 'java.util';
  import { Supplier, BiFunction, Function } from 'java.util.function';
  import { Duration } from 'java.time';
  import { ClientTooltipPositioner } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';

  class ClientComponentSplitter {
    static processTooltipLines(...tooltipLines: FormattedText[]): Stream<FormattedCharSequence>;
    static processTooltipLines(tooltipLines: FormattedText[]): Stream<FormattedCharSequence>;
    static splitTooltipLines(...tooltipLines: FormattedText[]): Stream<FormattedCharSequence>;
    static splitTooltipLines(maxWidth: number, ...tooltipLines: FormattedText[]): Stream<FormattedCharSequence>;
    static splitTooltipLines(tooltipLines: FormattedText[]): Stream<FormattedCharSequence>;
    static splitTooltipLines(maxWidth: number, tooltipLines: FormattedText[]): Stream<FormattedCharSequence>;
  }


  class TooltipBuilder {
    addLines(...var1: FormattedText[]): TooltipBuilder;
    addLines(var1: FormattedText[]): TooltipBuilder;
    build(var1: AbstractWidget): void;
    static create(): TooltipBuilder;
    static create(...lines: FormattedText[]): TooltipBuilder;
    static create(lines: FormattedText[]): TooltipBuilder;
    setDelay(var1: Duration): TooltipBuilder;
    setLines(var1: Supplier<FormattedText[]>): TooltipBuilder;
    setTooltipLineProcessor(var1: Function<FormattedText[], FormattedCharSequence[]>): TooltipBuilder;
    setTooltipPositionerFactory(var1: BiFunction<ClientTooltipPositioner, AbstractWidget, ClientTooltipPositioner>): TooltipBuilder;
    splitLines(): TooltipBuilder;
    splitLines(var1: number): TooltipBuilder;
  }

}

declare module 'fuzs.puzzleslib.api.client.gui.v2.screen' {
  import { Codec } from 'com.mojang.serialization';
  import { Component } from 'net.minecraft.network.chat';

  class ScreenHelper {
    static get mouseX(): number;
    static get mouseY(): number;
    static isHovering(posX: number, posY: number, width: number, height: number, mouseX: number, mouseY: number): boolean;
  }


  class ScreenSkipper {
    static readonly CODEC: Codec;
    build(): void;
    static create(): ScreenSkipper;
    setButtonComponent(buttonKey: string): ScreenSkipper;
    setButtonComponent(buttonComponent: Component): ScreenSkipper;
    setLastTitleComponent(lastTitleKey: string): ScreenSkipper;
    setLastTitleComponent(lastTitleComponent: Component): ScreenSkipper;
    setSingleTrigger(): ScreenSkipper;
    setSkipButtons(skipButtons: number): ScreenSkipper;
    setTitleComponent(titleKey: string): ScreenSkipper;
    setTitleComponent(titleComponent: Component): ScreenSkipper;
  }

}

declare module 'fuzs.puzzleslib.api.client.init.v1' {
  import { ItemStack, ItemDisplayContext } from 'net.minecraft.world.item';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { ModelResourceLocation } from 'net.minecraft.client.resources.model';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ModelLayerLocation, EntityModelSet } from 'net.minecraft.client.model.geom';
  import { ResourceManagerReloadListener } from 'net.minecraft.server.packs.resources';
  import { BiConsumer } from 'java.util.function';
  import { Type } from 'SkullBlock';
  import { SkullModelBase } from 'net.minecraft.client.model';

  class BuiltinItemRenderer {
    renderByItem(var1: ItemStack, var2: ItemDisplayContext, var3: PoseStack, var4: MultiBufferSource, var5: number, var6: number): void;
  }


  class DynamicItemDecorator {
    renderItemDecorations(var1: GuiGraphics, var2: Font, var3: ItemStack, var4: number, var5: number): boolean;
  }


  class ItemModelDisplayOverrides {
    static readonly INSTANCE: ItemModelDisplayOverrides;
    register(var1: ModelResourceLocation, var2: ModelResourceLocation): void;
    register(var1: ModelResourceLocation, var2: ModelResourceLocation, ...var3: ItemDisplayContext[]): void;
    register(var1: ModelResourceLocation, var2: ResourceLocation): void;
    register(var1: ModelResourceLocation, var2: ResourceLocation, ...var3: ItemDisplayContext[]): void;
  }


  class ModelLayerFactory {
    static from(modId: string): ModelLayerFactory;
    modId(): string;
    register(path: string, layer: string): ModelLayerLocation;
    register(path: string): ModelLayerLocation;
    registerInnerArmor(path: string): ModelLayerLocation;
    registerOuterArmor(path: string): ModelLayerLocation;
  }


  interface ReloadingBuiltInItemRenderer extends BuiltinItemRenderer, ResourceManagerReloadListener {}
  class ReloadingBuiltInItemRenderer extends BuiltinItemRenderer {
  }


  class SkullRenderersFactory {
    createSkullRenderers(var1: EntityModelSet, var2: BiConsumer<Type, SkullModelBase>): void;
  }

}

declare module 'fuzs.puzzleslib.api.client.key.v1' {
  import { Enum, Class } from 'java.lang';
  import { List } from 'java.util';
  import { Consumer } from 'java.util.function';
  import { Minecraft, KeyMapping } from 'net.minecraft.client';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface KeyActivationContext extends Enum<KeyActivationContext> {}
  class KeyActivationContext extends Enum<KeyActivationContext> {
    static readonly UNIVERSAL: KeyActivationContext;
    static readonly GAME: KeyActivationContext;
    static readonly SCREEN: KeyActivationContext;
    isActive(): boolean;
    isConflictingWith(other: KeyActivationContext): boolean;
    static valueOf(name: string): KeyActivationContext;
    static values(): KeyActivationContext[];
  }


  class KeyActivationHandler {
    static direct(activationContext: KeyActivationContext): KeyActivationHandler;
    static forGame(gameHandler: Consumer<Minecraft>): KeyActivationHandler;
    static forScreen(screenHandler: Consumer<Screen>): KeyActivationHandler;
    static forScreen<T extends Screen>(screenType: Class<T>, screenHandler: Consumer<T>): KeyActivationHandler;
    gameHandler(): Consumer<Minecraft>;
    get activationContext(): KeyActivationContext;
    static of(): KeyActivationHandler;
    screenHandler(): Consumer<Screen>;
    screenType(): Class<Screen>;
    withGameHandler(gameHandler: Consumer<Minecraft>): KeyActivationHandler;
    withScreenHandler(screenHandler: Consumer<Screen>): KeyActivationHandler;
    withScreenHandler<T extends Screen>(screenType: Class<T>, screenHandler: Consumer<T>): KeyActivationHandler;
  }


  class KeyMappingHelper {
    static readonly INSTANCE: KeyMappingHelper;
    getKeyActivationContext(var1: KeyMapping): KeyActivationContext;
    isConflictingWith(keyMapping: KeyMapping, otherKeyMapping: KeyMapping): boolean;
    static registerKeyMapping(resourceLocation: ResourceLocation, keyCode: number): KeyMapping;
    static registerUnboundKeyMapping(resourceLocation: ResourceLocation): KeyMapping;
  }

}

declare module 'fuzs.puzzleslib.api.client.packs.v1' {
  import { AbstractModPackResources } from 'fuzs.puzzleslib.api.resources.v1';
  import { IoSupplier } from 'net.minecraft.server.packs.resources';
  import { InputStream } from 'java.io';
  import { PackType } from 'net.minecraft.server.packs';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Set } from 'java.util';
  import { Supplier } from 'java.util.function';
  import { TextureCopy } from 'fuzs.puzzleslib.api.client.packs.v1.DynamicallyCopiedPackResources';

  interface DynamicallyCopiedPackResources extends AbstractModPackResources {}
  class DynamicallyCopiedPackResources extends AbstractModPackResources {
    static create(...textures: TextureCopy[]): Supplier<AbstractModPackResources>;
    getNamespaces(packType: PackType): Set<string>;
    getResource(packType: PackType, resourceLocation: ResourceLocation): IoSupplier<InputStream>;
  }

}

declare module 'fuzs.puzzleslib.api.client.particle.v1' {
  import { Particle } from 'net.minecraft.client.particle';
  import { Level } from 'net.minecraft.world.level';
  import { ParticleOptions } from 'net.minecraft.core.particles';

  class ClientParticleHelper {
    static addAlwaysVisibleParticle(level: Level, particleData: ParticleOptions, x: number, y: number, z: number, xSpeed: number, ySpeed: number, zSpeed: number): Particle;
    static addAlwaysVisibleParticle(level: Level, particleData: ParticleOptions, ignoreRange: boolean, x: number, y: number, z: number, xSpeed: number, ySpeed: number, zSpeed: number): Particle;
    static addParticle(level: Level, particleData: ParticleOptions, x: number, y: number, z: number, xSpeed: number, ySpeed: number, zSpeed: number): Particle;
    static addParticle(level: Level, particleData: ParticleOptions, forceAlwaysRender: boolean, x: number, y: number, z: number, xSpeed: number, ySpeed: number, zSpeed: number): Particle;
    static addParticle(level: Level, options: ParticleOptions, force: boolean, decreased: boolean, x: number, y: number, z: number, xSpeed: number, ySpeed: number, zSpeed: number): Particle;
  }

}

declare module 'fuzs.puzzleslib.api.client.searchtree.v1' {
  import { Function } from 'java.util.function';
  import { List } from 'java.util';
  import { SearchTree } from 'net.minecraft.client.searchtree';
  import { Stream } from 'java.util.stream';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';

  class SearchRegistryHelper {
    static getSearchTree<T>(type: SearchTreeType<T>): SearchTree<T>;
    static getTooltipLines(itemStack: ItemStack): Stream<string>;
    static getTooltipLines(stream: Stream<ItemStack>, tooltipFlag: TooltipFlag): Stream<string>;
    static populateSearchTree<T>(type: SearchTreeType<T>, values: T[]): void;
    static register<T>(type: SearchTreeType<T>, factory: Function<T[], SearchTree<T>>): void;
  }

}

declare module 'fuzs.puzzleslib.api.codec.v1' {
  import { Codec, DataResult } from 'com.mojang.serialization';
  import { NonNullList } from 'net.minecraft.core';
  import { Predicate, Function } from 'java.util.function';
  import { Tag, CompoundTag } from 'net.minecraft.nbt';

  class CodecExtras {
    static readonly NON_NULL_ITEM_STACK_LIST_CODEC: Codec;
    static mapCompoundTag(): Function<Tag, DataResult<CompoundTag>>;
    static nonNullList<T>(codec: Codec<T>, filter: Predicate<T>, defaultValue: T): Codec<NonNullList<T>>;
  }

}

declare module 'fuzs.puzzleslib.api.config.v3' {
  import { Builder, ConfigValue } from 'ModConfigSpec';
  import { Runnable, Class } from 'java.lang';
  import { Consumer, UnaryOperator } from 'java.util.function';
  import { Builder as fuzs_puzzleslib_api_config_v3_configholder_Builder } from 'fuzs.puzzleslib.api.config.v3.ConfigHolder';

  class ConfigCore {
    addToBuilder(builder: Builder, callback: ValueCallback): void;
    afterConfigReload(): void;
  }


  class ConfigDataHolder<T extends ConfigCore = any> {
    addCallback(callback: Runnable, config: T): void;
    addCallback(var1: Consumer<T>): void;
    get config(): T;
    isAvailable(): boolean;
  }


  class ConfigHolder {
    static builder(modId: string): fuzs_puzzleslib_api_config_v3_configholder_Builder;
    get<T extends ConfigCore>(clazz: Class<T>): T;
    static getDefaultNameFactory(configType: string): UnaryOperator<string>;
    static getDirectoryNameFactory(configType: string, directory: string): UnaryOperator<string>;
    getHolder<T extends ConfigCore>(var1: Class<T>): ConfigDataHolder<T>;
    static getSimpleNameFactory(): UnaryOperator<string>;
  }


  class ValueCallback {
    accept<S, V extends ConfigValue<S>>(var1: V, var2: Consumer<S>): V;
  }

}

declare module 'fuzs.puzzleslib.api.config.v3.ConfigHolder' {
  import { ConfigHolderRegistry } from 'fuzs.puzzleslib.impl.config';
  import { Buildable } from 'fuzs.puzzleslib.api.core.v1.utility';
  import { Class } from 'java.lang';
  import { ConfigCore } from 'fuzs.puzzleslib.api.config.v3';
  import { UnaryOperator } from 'java.util.function';

  interface Builder extends ConfigHolderRegistry, Buildable {}
  class Builder extends ConfigHolderRegistry {
    client<T extends ConfigCore>(var1: Class<T>): Builder;
    common<T extends ConfigCore>(var1: Class<T>): Builder;
    server<T extends ConfigCore>(var1: Class<T>): Builder;
    setFileName<T extends ConfigCore>(var1: Class<T>, var2: UnaryOperator<string>): Builder;
  }

}

declare module 'fuzs.puzzleslib.api.config.v3.json' {
  import { Gson, JsonObject, JsonElement } from 'com.google.gson';
  import { Codec } from 'com.mojang.serialization';
  import { Supplier, Consumer } from 'java.util.function';
  import { Path } from 'java.nio.file';
  import { Optional } from 'java.util';
  import { Class, Enum, Runnable } from 'java.lang';
  import { File, FileReader } from 'java.io';

  class GsonCodecHelper {
    static readonly GSON: Gson;
    static load<T>(codec: Codec<T>, value: Supplier<T>, path: Path): T;
    static load<T>(codec: Codec<T>, path: Path): Optional<T>;
    static save<T>(codec: Codec<T>, value: T, path: Path): boolean;
    static saveIfAbsent<T>(codec: Codec<T>, value: Supplier<T>, path: Path): boolean;
  }


  class GsonEnumHelper {
    static convertToEnum<T extends Enum<T>>(enumName: string, clazz: Class<T>): T;
    static getAsEnum<T extends Enum<T>>(jsonObject: JsonObject, key: string, clazz: Class<T>): T;
    static getAsEnum<T extends Enum<T>>(jsonObject: JsonObject, key: string, clazz: Class<T>, fallback: T): T;
  }


  class JsonConfigFileUtil {
    static readonly GSON: Gson;
    static copyToFile(jsonFile: File): boolean;
    static getAllAndLoad(jsonName: string, serializer: Consumer<File>, deserializer: Consumer<FileReader>, prepareForLoad: Runnable): void;
    static getAndLoad(jsonName: string, serializer: Consumer<File>, deserializer: Consumer<FileReader>): void;
    static getAndLoad(jsonName: string, modId: string, serializer: Consumer<File>, deserializer: Consumer<FileReader>): void;
    static getConfigPath(jsonName: string): File;
    static getSpecialConfigPath(jsonName: string, modId: string): File;
    static mkdirs(modId: string): boolean;
    static mkdirs(dir: File): boolean;
    static saveToFile(jsonFile: File, jsonElement: JsonElement): boolean;
  }


  class JsonSerializationUtil {
    static readonly FILE_FORMAT_STRING: string;
    static readonly COMMENT_STRING: string;
    static getConfigBase(...comments: string[]): JsonObject;
    static getConfigBase(fileFormat: number, ...comments: string[]): JsonObject;
    static readFileFormat(jsonObject: JsonObject): number;
    static readJsonObject(reader: FileReader): JsonObject;
  }

}

declare module 'fuzs.puzzleslib.api.config.v3.serialization' {
  import { Collection, List, Map, Set, Optional } from 'java.util';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { Registry } from 'net.minecraft.core';
  import { Class, Integer, Enum } from 'java.lang';
  import { BiPredicate } from 'java.util.function';
  import { AbstractTagAppender } from 'fuzs.puzzleslib.api.data.v2.tags';
  import { Stream } from 'java.util.stream';
  import { Entry } from 'Map';

  interface ConfigDataSet<T = any> extends Collection<T> {}
  class ConfigDataSet<T = any> extends Collection<T> {
    static readonly CONFIG_DESCRIPTION: string;
    static readonly CONFIG_DESCRIPTION_WITHOUT_TAGS: string;
    add(var1: T): boolean;
    addAll(var1: Collection<T>): boolean;
    clear(): void;
    static from<T>(registryKey: ResourceKey<Registry<T>>, ...values: string[]): ConfigDataSet<T>;
    static from<T>(registryKey: ResourceKey<Registry<T>>, values: string[], ...types: Class<any>[]): ConfigDataSet<T>;
    static from<T>(registryKey: ResourceKey<Registry<T>>, values: string[], filter: BiPredicate<number, any>, ...types: Class<any>[]): ConfigDataSet<T>;
    static from<T>(valueProvider: KeyedValueProvider<T>, ...values: string[]): ConfigDataSet<T>;
    static from<T>(valueProvider: KeyedValueProvider<T>, values: string[], ...types: Class<any>[], index: number, value: any): ConfigDataSet<T>;
    static from<T>(valueProvider: KeyedValueProvider<T>, values: string[], filter: BiPredicate<number, any>, ...types: Class<any>[]): ConfigDataSet<T>;
    get(var1: T): any[];
    get<V>(var1: T, var2: number): V;
    getOptional<V>(var1: T, var2: number): Optional<V>;
    remove(var1: any): boolean;
    removeAll(var1: Collection<any>): boolean;
    retainAll(var1: Collection<any>): boolean;
    toMap(): Map<T, any[]>;
    toSet(): Set<T>;
  }


  class KeyedValueProvider<T = any> {
    static enumConstants<T extends Enum<T>>(enumClazz: Class<T>): KeyedValueProvider<T>;
    static enumConstants<T extends Enum<T>>(enumClazz: Class<T>, modId: string): KeyedValueProvider<T>;
    getKey(var1: T): ResourceLocation;
    getValue(var1: ResourceLocation): Optional<T>;
    static registryEntries<T>(registryKey: ResourceKey<Registry<T>>): KeyedValueProvider<T>;
    stream(): Stream<Entry<ResourceLocation, T>>;
    streamValues(): Stream<T>;
    static tagAppender<T>(registryKey: ResourceKey<Registry<T>>): AbstractTagAppender<T>;
    static toString<T>(registryKey: ResourceKey<Registry<T>>, ...entries: T[]): string[];
    static toString<T extends Enum<T>>(enumClazz: Class<T>, ...entries: T[]): string[];
    static toString<T extends Enum<T>>(enumClazz: Class<T>, modId: string, ...entries: T[]): string[];
    static toString<T>(valueProvider: KeyedValueProvider<T>, ...entries: T[]): string[];
  }

}

declare module 'fuzs.puzzleslib.api.container.v1' {
  import { AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { Inventory, Player } from 'net.minecraft.world.entity.player';
  import { SimpleContainer, Container, ContainerListener, ContainerHelper } from 'net.minecraft.world';
  import { NonNullList } from 'net.minecraft.core';
  import { ItemStack } from 'net.minecraft.world.item';
  import { CompoundTag, ListTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { IntFunction, ObjIntConsumer } from 'java.util.function';

  class ContainerMenuHelper {
    static addInventorySlots(containerMenu: AbstractContainerMenu, inventory: Inventory, offsetY: number): void;
    static addInventorySlots(containerMenu: AbstractContainerMenu, inventory: Inventory, offsetX: number, offsetY: number): void;
    static copyItemsIntoContainer(from: NonNullList<ItemStack>, to: Container): void;
    static copyItemsIntoList(from: NonNullList<ItemStack>, to: NonNullList<ItemStack>): void;
    static createListBackedContainer(items: NonNullList<ItemStack>, listener: Container): SimpleContainer;
    static createListBackedContainer(items: NonNullList<ItemStack>, listener: ContainerListener): SimpleContainer;
    isFake(): boolean;
    static setSelectedSlotLocked(containerMenu: AbstractContainerMenu): void;
  }


  interface ContainerSerializationHelper extends ContainerHelper {}
  class ContainerSerializationHelper extends ContainerHelper {
    static readonly TAG_ITEMS: string;
    static readonly TAG_SLOT: string;
    static createTag(size: number, itemGetter: IntFunction<ItemStack>, lookupProvider: Provider): ListTag;
    static fromTag(listTag: ListTag, size: number, itemSetter: ObjIntConsumer<ItemStack>, lookupProvider: Provider): void;
    static loadAllItems(tag: CompoundTag, items: NonNullList<ItemStack>, lookupProvider: Provider): void;
    static loadAllItems(tag: CompoundTag, container: Container, lookupProvider: Provider): void;
    static loadAllItems(tagKey: string, tag: CompoundTag, items: NonNullList<ItemStack>, lookupProvider: Provider): void;
    static loadAllItems(tagKey: string, tag: CompoundTag, size: number, itemSetter: ObjIntConsumer<ItemStack>, lookupProvider: Provider): void;
    static saveAllItems(tag: CompoundTag, items: NonNullList<ItemStack>, lookupProvider: Provider): CompoundTag;
    static saveAllItems(tag: CompoundTag, container: Container, lookupProvider: Provider): CompoundTag;
    static saveAllItems(tagKey: string, tag: CompoundTag, items: NonNullList<ItemStack>, lookupProvider: Provider): CompoundTag;
    static saveAllItems(tag: CompoundTag, container: Container, saveEmpty: boolean, lookupProvider: Provider): CompoundTag;
    static saveAllItems(tag: CompoundTag, items: NonNullList<ItemStack>, saveEmpty: boolean, lookupProvider: Provider): CompoundTag;
    static saveAllItems(tagKey: string, tag: CompoundTag, items: NonNullList<ItemStack>, saveEmpty: boolean, lookupProvider: Provider): CompoundTag;
    static saveAllItems(tagKey: string, tag: CompoundTag, size: number, itemGetter: IntFunction<ItemStack>, saveEmpty: boolean, lookupProvider: Provider): CompoundTag;
  }


  interface ListBackedContainer extends Container {}
  class ListBackedContainer extends Container {
    clearContent(): void;
    get containerItems(): NonNullList<ItemStack>;
    get containerSize(): number;
    getItem(slot: number): ItemStack;
    isEmpty(): boolean;
    static of(items: NonNullList<ItemStack>): ListBackedContainer;
    static of(size: number): ListBackedContainer;
    removeItem(slot: number, count: number): ItemStack;
    removeItemNoUpdate(slot: number): ItemStack;
    setChanged(): void;
    setItem(slot: number, stack: ItemStack): void;
    stillValid(player: Player): boolean;
  }

}

declare module 'fuzs.puzzleslib.api.core.v1' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { MinecraftServer } from 'net.minecraft.server';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Type } from 'CustomPacketPayload';
  import { MenuProvider, InteractionHand } from 'net.minecraft.world';
  import { BiConsumer, Supplier } from 'java.util.function';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { Entity, EntityType, EquipmentSlot, LivingEntity, MobSpawnType, Mob } from 'net.minecraft.world.entity';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level, Explosion } from 'net.minecraft.world.level';
  import { BlockPos, Holder } from 'net.minecraft.core';
  import { ItemStack } from 'net.minecraft.world.item';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Metadata } from 'Pack';
  import { Component } from 'net.minecraft.network.chat';
  import { PackCompatibility } from 'net.minecraft.server.packs.repository';
  import { FeatureFlagSet } from 'net.minecraft.world.flag';
  import { Enchantment } from 'net.minecraft.world.item.enchantment';
  import { Enum, Class } from 'java.lang';
  import { List, Collection, Map, Optional } from 'java.util';
  import { SpawnPlacementsContext, EntityAttributesCreateContext, EntityAttributesModifyContext, BiomeModificationsContext, GameplayContentContext, FuelBurnTimesContext, FlammableBlocksContext, CompostableBlocksContext, BlockInteractionsContext, CreativeModeTabContext, BuildCreativeModeTabContentsContext, PackRepositorySourcesContext } from 'fuzs.puzzleslib.api.core.v1.context';
  import { Path } from 'java.nio.file';
  import { Stream } from 'java.util.stream';
  import { ClientPacketListener } from 'net.minecraft.client.multiplayer';

  class BaseModConstructor {
    get contentRegistrationFlags(): ContentRegistrationFlags[];
    get pairingIdentifier(): ResourceLocation;
  }


  class CommonAbstractions {
    static readonly INSTANCE: CommonAbstractions;
    canApplyAtEnchantingTable(var1: Holder<Enchantment>, var2: ItemStack): boolean;
    canEquip(var1: ItemStack, var2: EquipmentSlot, var3: LivingEntity): boolean;
    createPackInfo(var1: ResourceLocation, var2: Component, var3: PackCompatibility, var4: FeatureFlagSet, var5: boolean): Metadata;
    get minecraftServer(): MinecraftServer;
    getEnchantPowerBonus(var1: BlockState, var2: Level, var3: BlockPos): number;
    getMobGriefingRule(var1: Level, var2: Entity): boolean;
    getMobLootingLevel(target: Entity, attacker: Entity, damageSource: DamageSource): number;
    getMobSpawnType(var1: Mob): MobSpawnType;
    getPartEntityParent(var1: Entity): Entity;
    hasChannel(var1: ServerPlayer, var2: Type<any>): boolean;
    isAllowedOnBooks(enchantment: Holder<Enchantment>): boolean;
    isBookEnchantable(var1: ItemStack, var2: ItemStack): boolean;
    isBossMob(var1: EntityType<any>): boolean;
    onExplosionStart(var1: Level, var2: Explosion): boolean;
    onPlayerDestroyItem(var1: Player, var2: ItemStack, var3: InteractionHand): void;
    openMenu(var1: ServerPlayer, var2: MenuProvider, var3: BiConsumer<ServerPlayer, RegistryFriendlyByteBuf>): void;
  }


  interface ContentRegistrationFlags extends Enum<ContentRegistrationFlags> {}
  class ContentRegistrationFlags extends Enum<ContentRegistrationFlags> {
    static readonly BIOME_MODIFICATIONS: ContentRegistrationFlags;
    static readonly DYNAMIC_RENDERERS: ContentRegistrationFlags;
    static readonly COPY_RECIPES: ContentRegistrationFlags;
    static throwForFlag(flag: ContentRegistrationFlags): void;
    static valueOf(name: string): ContentRegistrationFlags;
    static values(): ContentRegistrationFlags[];
  }


  interface ModConstructor extends BaseModConstructor {}
  class ModConstructor extends BaseModConstructor {
    static construct(modId: string, modConstructor: Supplier<ModConstructor>): void;
    onAddDataPackFinders(context: PackRepositorySourcesContext): void;
    onBuildCreativeModeTabContents(context: BuildCreativeModeTabContentsContext): void;
    onCommonSetup(): void;
    onConstructMod(): void;
    onEntityAttributeCreation(context: EntityAttributesCreateContext): void;
    onEntityAttributeModification(context: EntityAttributesModifyContext): void;
    onRegisterBiomeModifications(context: BiomeModificationsContext): void;
    onRegisterBlockInteractions(context: BlockInteractionsContext): void;
    onRegisterCompostableBlocks(context: CompostableBlocksContext): void;
    onRegisterCreativeModeTabs(context: CreativeModeTabContext): void;
    onRegisterFlammableBlocks(context: FlammableBlocksContext): void;
    onRegisterFuelBurnTimes(context: FuelBurnTimesContext): void;
    onRegisterGameplayContent(context: GameplayContentContext): void;
    onRegisterSpawnPlacements(context: SpawnPlacementsContext): void;
  }


  class ModContainer {
    findResource(...var1: string[]): Optional<Path>;
    get allChildren(): Stream<ModContainer>;
    get authors(): Collection<string>;
    get children(): Collection<ModContainer>;
    get contactTypes(): Map<string, string>;
    get credits(): Collection<string>;
    get description(): string;
    get displayName(): string;
    get licenses(): Collection<string>;
    get modId(): string;
    get parent(): ModContainer;
    get version(): string;
    static getDisplayName(modId: string): string;
    static toModList(modContainers: Supplier<Stream<ModContainer>>): Map<string, ModContainer>;
  }


  interface ModLoader extends Enum<ModLoader> {}
  class ModLoader extends Enum<ModLoader> {
    static readonly FABRIC: ModLoader;
    static readonly NEOFORGE: ModLoader;
    static readonly FORGE: ModLoader;
    static readonly QUILT: ModLoader;
    static get fabricLike(): ModLoader[];
    static get forgeLike(): ModLoader[];
    isFabric(): boolean;
    isFabricLike(): boolean;
    isForge(): boolean;
    isForgeLike(): boolean;
    isNeoForge(): boolean;
    isQuilt(): boolean;
    static valueOf(name: string): ModLoader;
    static values(): ModLoader[];
  }


  class ModLoaderEnvironment {
    static readonly INSTANCE: ModLoaderEnvironment;
    get configDirectory(): Path;
    get currentMappingsNamespace(): string;
    get gameDirectory(): Path;
    get modList(): Map<string, ModContainer>;
    get modLoader(): ModLoader;
    get modsDirectory(): Path;
    getModContainer(modId: string): Optional<ModContainer>;
    isClient(): boolean;
    isDataGeneration(): boolean;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(modId: string): boolean;
    isModPresentServerside(modId: string): boolean;
    isServer(): boolean;
  }


  class Proxy {
    static readonly INSTANCE: Proxy;
    get clientLevel(): Level;
    get clientPacketListener(): ClientPacketListener;
    get clientPlayer(): Player;
    hasAltDown(): boolean;
    hasControlDown(): boolean;
    hasShiftDown(): boolean;
    splitTooltipLines(var1: Component): Component[];
  }


  class ServiceProviderHelper {
    static load<T>(clazz: Class<T>): T;
  }

}

declare module 'fuzs.puzzleslib.api.core.v1.context' {
  import { BiomeLoadingPhase, BiomeLoadingContext, BiomeModificationContext } from 'fuzs.puzzleslib.api.biome.v1';
  import { Predicate, Consumer } from 'java.util.function';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { ItemLike } from 'net.minecraft.world.level';
  import { DisplayItemsGenerator } from 'CreativeModeTab';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { CreativeModeTab } from 'net.minecraft.world.item';
  import { Holder } from 'net.minecraft.core';
  import { CreativeModeTabConfigurator } from 'fuzs.puzzleslib.api.item.v2';
  import { EntityType, LivingEntity, SpawnPlacementType, Mob } from 'net.minecraft.world.entity';
  import { Builder } from 'AttributeSupplier';
  import { Attribute } from 'net.minecraft.world.entity.ai.attributes';
  import { Fraction } from 'org.apache.commons.lang3.math';
  import { RepositorySource } from 'net.minecraft.server.packs.repository';
  import { Component } from 'net.minecraft.network.chat';
  import { Types } from 'Heightmap';
  import { SpawnPredicate } from 'SpawnPlacements';

  class BiomeModificationsContext {
    register(var1: BiomeLoadingPhase, var2: Predicate<BiomeLoadingContext>, var3: Consumer<BiomeModificationContext>): void;
  }


  class BlockInteractionsContext {
    registerFlattenable(flattenedBlock: Block, ...unflattenedBlocks: Block[]): void;
    registerFlattenable(var1: BlockState, ...var2: Block[]): void;
    registerScrapeable(var1: Block, ...var2: Block[]): void;
    registerStrippable(var1: Block, ...var2: Block[]): void;
    registerTillable(tilledBlock: Block, ...untilledBlocks: Block[]): void;
    registerTillable(tilledBlock: Block, droppedItem: ItemLike, ...untilledBlocks: Block[]): void;
    registerTillable(var1: BlockState, var2: ItemLike, var3: boolean, ...var4: Block[]): void;
    registerWaxable(var1: Block, ...var2: Block[]): void;
  }


  class BuildCreativeModeTabContentsContext {
    registerBuildListener(modId: string, itemsGenerator: DisplayItemsGenerator): void;
    registerBuildListener(identifier: ResourceLocation, itemsGenerator: DisplayItemsGenerator): void;
    registerBuildListener(var1: ResourceKey<CreativeModeTab>, var2: DisplayItemsGenerator): void;
  }


  class CompostableBlocksContext {
    registerCompostable(var1: number, ...var2: Holder<ItemLike>[]): void;
  }


  class CreativeModeTabContext {
    registerCreativeModeTab(var1: CreativeModeTabConfigurator): void;
  }


  class EntityAttributesCreateContext {
    registerEntityAttributes(var1: EntityType<LivingEntity>, var2: Builder): void;
  }


  class EntityAttributesModifyContext {
    registerAttributeModification(entityType: EntityType<LivingEntity>, attribute: Holder<Attribute>): void;
    registerAttributeModification(var1: EntityType<LivingEntity>, var2: Holder<Attribute>, var3: number): void;
  }


  class FlammableBlocksContext {
    registerFlammable(var1: number, var2: number, ...var3: Block[]): void;
  }


  class FuelBurnTimesContext {
    registerFuel(var1: number, ...var2: ItemLike[]): void;
  }


  class GameplayContentContext {
    registerCompostable(var1: Holder<ItemLike>, var2: number): void;
    registerFlammable(var1: Holder<Block>, var2: number, var3: number): void;
    registerFlattenable(var1: Holder<Block>, var2: Holder<Block>): void;
    registerFuel(var1: Holder<ItemLike>, var2: Fraction): void;
    registerOxidizable(var1: Holder<Block>, var2: Holder<Block>): void;
    registerStrippable(var1: Holder<Block>, var2: Holder<Block>): void;
    registerTillable(var1: Holder<Block>, var2: Holder<Block>): void;
    registerWaxable(var1: Holder<Block>, var2: Holder<Block>): void;
  }


  class PackRepositorySourcesContext {
    addRepositorySource(repositorySource: RepositorySource): void;
    addRepositorySource(...repositorySources: RepositorySource[]): void;
    registerBuiltInPack(resourceLocation: ResourceLocation): void;
    registerBuiltInPack(var1: ResourceLocation, var2: Component, var3: boolean): void;
    registerRepositorySource(var1: RepositorySource): void;
  }


  class SpawnPlacementsContext {
    registerSpawnPlacement<T extends Mob>(var1: EntityType<T>, var2: SpawnPlacementType, var3: Types, var4: SpawnPredicate<T>): void;
  }

}

declare module 'fuzs.puzzleslib.api.core.v1.resources' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { PreparableReloadListener, ResourceManagerReloadListener } from 'net.minecraft.server.packs.resources';
  import { Supplier } from 'java.util.function';
  import { Collection } from 'java.util';

  class ForwardingReloadListenerHelper {
    static fromReloadListener<T extends PreparableReloadListener & NamedReloadListener>(identifier: ResourceLocation, reloadListener: PreparableReloadListener): T;
    static fromReloadListener<T extends PreparableReloadListener & NamedReloadListener>(identifier: ResourceLocation, supplier: Supplier<PreparableReloadListener>): T;
    static fromReloadListeners<T extends PreparableReloadListener & NamedReloadListener>(identifier: ResourceLocation, reloadListeners: Collection<PreparableReloadListener>): T;
    static fromReloadListeners<T extends PreparableReloadListener & NamedReloadListener>(identifier: ResourceLocation, supplier: Supplier<Collection<PreparableReloadListener>>): T;
    static fromResourceManagerReloadListener<T extends ResourceManagerReloadListener & NamedReloadListener>(identifier: ResourceLocation, reloadListener: ResourceManagerReloadListener): T;
    static fromResourceManagerReloadListener<T extends ResourceManagerReloadListener & NamedReloadListener>(identifier: ResourceLocation, supplier: Supplier<ResourceManagerReloadListener>): T;
    static fromResourceManagerReloadListeners<T extends ResourceManagerReloadListener & NamedReloadListener>(identifier: ResourceLocation, reloadListeners: Collection<ResourceManagerReloadListener>): T;
    static fromResourceManagerReloadListeners<T extends ResourceManagerReloadListener & NamedReloadListener>(identifier: ResourceLocation, supplier: Supplier<Collection<ResourceManagerReloadListener>>): T;
  }


  interface NamedReloadListener extends PreparableReloadListener {}
  class NamedReloadListener extends PreparableReloadListener {
    get name(): string;
    identifier(): ResourceLocation;
  }

}

declare module 'fuzs.puzzleslib.api.core.v1.utility' {
  import { ModLoader } from 'fuzs.puzzleslib.api.core.v1';
  import { Codec } from 'com.mojang.serialization';
  import { Supplier } from 'java.util.function';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { Field, Method, Constructor } from 'java.lang.reflect';
  import { Class } from 'java.lang';
  import { Optional } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';

  class Buildable {
    build(): void;
  }


  class EnvironmentAwareBuilder<T = any> {
    whenNotOn(...forbiddenModLoaders: ModLoader[]): T;
    whenOn(...var1: ModLoader[]): T;
    whenOnFabricLike(): T;
    whenOnForgeLike(): T;
  }


  class NbtSerializable {
    static codec<T extends NbtSerializable>(factory: Supplier<T>): Codec<T>;
    read(var1: CompoundTag, var2: Provider): void;
    toCompoundTag(registries: Provider): CompoundTag;
    write(var1: CompoundTag, var2: Provider): void;
  }


  class ReflectionHelper {
    static findConstructor<T>(clazz: Class<any>, ...parameterTypes: Class<any>[]): Constructor<T>;
    static findConstructor<T>(clazz: Class<any>, allowCache: boolean, ...parameterTypes: Class<any>[]): Constructor<T>;
    static findConstructor<T>(typeName: string, allowCache: boolean, ...parameterTypes: Class<any>[]): Constructor<T>;
    static findField(clazz: Class<any>, name: string): Field;
    static findField(clazz: Class<any>, name: string, allowCache: boolean): Field;
    static findField(typeName: string, name: string, allowCache: boolean): Field;
    static findMethod(clazz: Class<any>, name: string, ...parameterTypes: Class<any>[]): Method;
    static findMethod(clazz: Class<any>, name: string, allowCache: boolean, ...parameterTypes: Class<any>[]): Method;
    static findMethod(typeName: string, name: string, allowCache: boolean, ...parameterTypes: Class<any>[]): Method;
    static getValue<T, E>(clazz: Class<E>, name: string, instance: E): Optional<T>;
    static getValue<T, E>(typeName: string, name: string, instance: E): Optional<T>;
    static getValue<T>(field: Field, instance: any): Optional<T>;
    static invokeMethod<T, E>(clazz: Class<E>, name: string, parameterTypes: Class<any>, instance: E, args: any[]): Optional<T>;
    static invokeMethod<T>(method: Method, instance: any, ...args: any[]): Optional<T>;
    static newDefaultInstanceFactory<T>(clazz: Class<T>): Supplier<Optional<T>>;
    static newInstance<T, E>(clazz: Class<E>, parameterTypes: Class<any>, args: any[]): Optional<T>;
    static newInstance<T>(constructor: Constructor<T>, ...args: any[]): Optional<T>;
    static newInstanceFactory<T>(clazz: Class<T>, parameterTypes: Class<any>, args: any[]): Supplier<Optional<T>>;
    static newInstanceFactory<T>(constructor: Constructor<T>, ...args: any[]): Supplier<Optional<T>>;
    static setValue<T, E>(clazz: Class<E>, name: string, instance: E, value: T): boolean;
    static setValue<T, E>(typeName: string, name: string, instance: E, value: T): boolean;
    static setValue<T>(field: Field, instance: any, value: T): boolean;
  }


  class ResourceLocationHelper {
    static fromNamespaceAndPath(namespace: string, path: string): ResourceLocation;
    static parse(location: string): ResourceLocation;
    static tryParse(location: string): ResourceLocation;
    static withDefaultNamespace(path: string): ResourceLocation;
  }

}

declare module 'fuzs.puzzleslib.api.data.v2' {
  import { DataProvider, PackOutput, CachedOutput } from 'net.minecraft.data';
  import { AdvancementSubProvider } from 'net.minecraft.data.advancements';
  import { DataProviderContext, RegistriesDataProvider } from 'fuzs.puzzleslib.api.data.v2.core';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';
  import { Consumer } from 'java.util.function';
  import { AdvancementHolder, Criterion } from 'net.minecraft.advancements';
  import { RegistriesDatapackGenerator } from 'net.minecraft.data.registries';
  import { RegistryBoostrapConsumer } from 'fuzs.puzzleslib.api.data.v2.AbstractDatapackRegistriesProvider';
  import { BootstrapContext } from 'net.minecraft.data.worldgen';
  import { Enchantment } from 'net.minecraft.world.item.enchantment';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Builder } from 'Enchantment';
  import { DamageType, DamageEffects } from 'net.minecraft.world.damagesource';
  import { TrimMaterial } from 'net.minecraft.world.item.armortrim';
  import { Item, ArmorMaterial, Instrument, JukeboxSong } from 'net.minecraft.world.item';
  import { Map } from 'java.util';
  import { Holder, Registry } from 'net.minecraft.core';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { RecipeProvider, RecipeOutput, RecipeCategory } from 'net.minecraft.data.recipes';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { ItemLike } from 'net.minecraft.world.level';
  import { TriggerInstance } from 'InventoryChangeTrigger';
  import { PackMetadataGenerator } from 'net.minecraft.data.metadata';
  import { PackType } from 'net.minecraft.server.packs';

  interface AbstractAdvancementProvider extends DataProvider, AdvancementSubProvider {}
  class AbstractAdvancementProvider extends DataProvider {
    constructor(context: DataProviderContext);

    constructor(modId: string, output: PackOutput, registries: CompletableFuture<Provider>);
    addAdvancements(var1: Provider, var2: Consumer<AdvancementHolder>): void;
    generate(registries: Provider, writer: Consumer<AdvancementHolder>): void;
    get name(): string;
    run(output: CachedOutput): CompletableFuture<any>;
  }


  interface AbstractDatapackRegistriesProvider extends RegistriesDataProvider, RegistriesDatapackGenerator {}
  class AbstractDatapackRegistriesProvider extends RegistriesDataProvider {
    constructor(context: DataProviderContext);

    constructor(output: PackOutput, registries: CompletableFuture<Provider>);
    addBootstrap(var1: RegistryBoostrapConsumer): void;
    get registries(): CompletableFuture<Provider>;
    static registerDamageType(context: BootstrapContext<DamageType>, resourceKey: ResourceKey<DamageType>): void;
    static registerDamageType(context: BootstrapContext<DamageType>, resourceKey: ResourceKey<DamageType>, damageEffects: DamageEffects): void;
    static registerEnchantment(context: BootstrapContext<Enchantment>, resourceKey: ResourceKey<Enchantment>, builder: Builder): void;
    static registerInstrument(context: BootstrapContext<Instrument>, resourceKey: ResourceKey<Instrument>, soundEvent: Holder<SoundEvent>, useDuration: number, range: number): void;
    static registerJukeboxSong(context: BootstrapContext<JukeboxSong>, resourceKey: ResourceKey<JukeboxSong>, soundEvent: Holder<SoundEvent>, lengthInSeconds: number, comparatorOutput: number): void;
    static registerTrimMaterial(context: BootstrapContext<TrimMaterial>, resourceKey: ResourceKey<TrimMaterial>, ingredient: Item, descriptionColor: number, itemModelIndex: number): void;
    static registerTrimMaterial(context: BootstrapContext<TrimMaterial>, resourceKey: ResourceKey<TrimMaterial>, ingredient: Item, descriptionColor: number, itemModelIndex: number, overrideArmorMaterials: Map<Holder<ArmorMaterial>, string>): void;
  }


  class AbstractLootProvider {
  }


  interface AbstractRecipeProvider extends RecipeProvider {}
  class AbstractRecipeProvider extends RecipeProvider {
    constructor(context: DataProviderContext);

    constructor(modId: string, packOutput: PackOutput, lookupProvider: CompletableFuture<Provider>);
    addRecipes(var1: RecipeOutput): void;
    buildRecipes(recipeOutput: RecipeOutput): void;
    static getConversionRecipeName(result: ItemLike, ingredient: Ingredient): string;
    static getConversionRecipeName(result: ItemLike, ...items: ItemLike[]): string;
    static getHasName(ingredient: Ingredient): string;
    static getHasName(...items: ItemLike[]): string;
    static getItemName(ingredient: Ingredient): string;
    static getItemName(...items: ItemLike[]): string;
    static has(ingredient: Ingredient): Criterion<TriggerInstance>;
    static has(...items: ItemLike[]): Criterion<TriggerInstance>;
    run(output: CachedOutput, registries: Provider): CompletableFuture<any>;
    static stonecutterResultFromBase(recipeOutput: RecipeOutput, category: RecipeCategory, result: ItemLike, material: Ingredient): void;
    static stonecutterResultFromBase(recipeOutput: RecipeOutput, category: RecipeCategory, result: ItemLike, material: Ingredient, resultCount: number): void;
  }


  interface AbstractRegistriesDatapackGenerator<T = any> extends RegistriesDataProvider, RegistriesDatapackGenerator {}
  class AbstractRegistriesDatapackGenerator<T = any> extends RegistriesDataProvider {
    constructor(registryKey: ResourceKey<Registry<T>>, context: DataProviderContext);

    constructor(registryKey: ResourceKey<Registry<T>>, output: PackOutput, registries: CompletableFuture<Provider>);
    addBootstrap(var1: BootstrapContext<T>): void;
    get name(): string;
    get registries(): CompletableFuture<Provider>;
  }


  interface ModPackMetadataProvider extends PackMetadataGenerator {}
  class ModPackMetadataProvider extends PackMetadataGenerator {
    constructor(context: DataProviderContext);

    constructor(packType: PackType, context: DataProviderContext);

    constructor(modId: string, packOutput: PackOutput);

    constructor(packType: PackType, modId: string, packOutput: PackOutput);
  }

}

declare module 'fuzs.puzzleslib.api.data.v2.AbstractDatapackRegistriesProvider' {
  import { ResourceKey } from 'net.minecraft.resources';
  import { Registry } from 'net.minecraft.core';
  import { RegistryBootstrap } from 'RegistrySetBuilder';

  class RegistryBoostrapConsumer {
    add<T>(var1: ResourceKey<Registry<T>>, var2: RegistryBootstrap<T>): void;
  }

}

declare module 'fuzs.puzzleslib.api.data.v2.AbstractLootProvider' {
  import { DataProvider, CachedOutput, PackOutput } from 'net.minecraft.data';
  import { LootTableSubProvider, EntityLootSubProvider, BlockLootSubProvider } from 'net.minecraft.data.loot';
  import { Provider } from 'HolderLookup';
  import { PathProvider } from 'PackOutput';
  import { LootContextParamSet } from 'net.minecraft.world.level.storage.loot.parameters';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { LootTable, ValidationContext } from 'net.minecraft.world.level.storage.loot';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Registry } from 'net.minecraft.core';
  import { Reference } from 'Holder';
  import { DataProviderContext } from 'fuzs.puzzleslib.api.data.v2.core';
  import { BiConsumer } from 'java.util.function';
  import { Builder } from 'LootTable';
  import { EntityType } from 'net.minecraft.world.entity';
  import { Block } from 'net.minecraft.world.level.block';

  interface LootTableDataProvider extends DataProvider, LootTableSubProvider {}
  class LootTableDataProvider extends DataProvider {
    paramSet(): LootContextParamSet;
    pathProvider(): PathProvider;
    registries(): Provider;
    run(output: CachedOutput, registries: Provider): CompletableFuture<any>;
    skipValidationFor(var1: ResourceKey<LootTable>): boolean;
    validate(registry: Registry<LootTable>): void;
    validate(holder: Reference<LootTable>, validationContext: ValidationContext): void;
  }


  interface Simple extends LootTableDataProvider {}
  class Simple extends LootTableDataProvider {
    constructor(paramSet: LootContextParamSet, context: DataProviderContext);

    constructor(paramSet: LootContextParamSet, packOutput: PackOutput, registries: CompletableFuture<Provider>);
    addLootTables(): void;
    generate(exporter: BiConsumer<ResourceKey<LootTable>, Builder>): void;
    get name(): string;
    paramSet(): LootContextParamSet;
    pathProvider(): PathProvider;
    registries(): Provider;
    run(output: CachedOutput): CompletableFuture<any>;
    skipValidation(resourceLocation: ResourceLocation): void;
    skipValidation(resourceKey: ResourceKey<LootTable>): void;
    skipValidationFor(resourceKey: ResourceKey<LootTable>): boolean;
  }


  interface EntityTypes extends LootTableDataProvider, EntityLootSubProvider {}
  class EntityTypes extends LootTableDataProvider {
    constructor(context: DataProviderContext);

    constructor(modId: string, packOutput: PackOutput, registries: CompletableFuture<Provider>);
    addLootTables(): void;
    generate(): void;
    generate(consumer: BiConsumer<ResourceKey<LootTable>, Builder>): void;
    get name(): string;
    paramSet(): LootContextParamSet;
    pathProvider(): PathProvider;
    registries(): Provider;
    run(output: CachedOutput): CompletableFuture<any>;
    skipValidation(resourceLocation: ResourceLocation): void;
    skipValidation(resourceKey: ResourceKey<LootTable>): void;
    skipValidation(entityType: EntityType<any>): void;
    skipValidationFor(resourceKey: ResourceKey<LootTable>): boolean;
  }


  interface Blocks extends LootTableDataProvider, BlockLootSubProvider {}
  class Blocks extends LootTableDataProvider {
    constructor(context: DataProviderContext);

    constructor(modId: string, packOutput: PackOutput, registries: CompletableFuture<Provider>);
    addLootTables(): void;
    dropNameable(block: Block): void;
    dropNothing(block: Block): void;
    generate(): void;
    generate(consumer: BiConsumer<ResourceKey<LootTable>, Builder>): void;
    get name(): string;
    paramSet(): LootContextParamSet;
    pathProvider(): PathProvider;
    registries(): Provider;
    run(output: CachedOutput): CompletableFuture<any>;
    skipValidation(resourceLocation: ResourceLocation): void;
    skipValidation(resourceKey: ResourceKey<LootTable>): void;
    skipValidation(block: Block): void;
    skipValidationFor(resourceKey: ResourceKey<LootTable>): boolean;
  }

}

declare module 'fuzs.puzzleslib.api.data.v2.AbstractRecipeProvider' {
  import { RecipeOutput } from 'net.minecraft.data.recipes';
  import { CachedOutput } from 'net.minecraft.data';
  import { Provider } from 'HolderLookup';
  import { List } from 'java.util';
  import { CompletableFuture } from 'java.util.concurrent';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Recipe } from 'net.minecraft.world.item.crafting';
  import { AdvancementHolder } from 'net.minecraft.advancements';
  import { Builder } from 'Advancement';

  interface IdentifiableRecipeOutput extends RecipeOutput {}
  class IdentifiableRecipeOutput extends RecipeOutput {
    constructor(output: CachedOutput, registries: Provider, completableFutures: CompletableFuture<any>[]);
    accept(location: ResourceLocation, recipe: Recipe<any>, advancement: AdvancementHolder): void;
    advancement(): Builder;
    get modId(): string;
  }

}

declare module 'fuzs.puzzleslib.api.data.v2.core' {
  import { PackOutput } from 'net.minecraft.data';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';
  import { Path } from 'java.nio.file';

  class DataProviderContext {
    constructor(modId: string, packOutput: PackOutput, registries: CompletableFuture<Provider>);
    static fromModId(modId: string): DataProviderContext;
    static fromModId(modId: string, path: Path): DataProviderContext;
    get modId(): string;
    get packOutput(): PackOutput;
    get registries(): CompletableFuture<Provider>;
    withRegistries(registries: CompletableFuture<Provider>): DataProviderContext;
  }


  class RegistriesDataProvider {
    get registries(): CompletableFuture<Provider>;
  }

}

declare module 'fuzs.puzzleslib.api.data.v2.core.DataProviderContext' {
  import { Function } from 'java.util.function';
  import { DataProviderContext } from 'fuzs.puzzleslib.api.data.v2.core';
  import { DataProvider } from 'net.minecraft.data';

  interface Factory extends Function<DataProviderContext, DataProvider> {}
  class Factory extends Function<DataProviderContext, DataProvider> {
  }

}

declare module 'fuzs.puzzleslib.api.data.v2.recipes' {
  import { ShapedRecipeBuilder, RecipeCategory, RecipeOutput, ShapelessRecipeBuilder } from 'net.minecraft.data.recipes';
  import { ItemLike } from 'net.minecraft.world.level';
  import { Character } from 'java.lang';
  import { TagKey } from 'net.minecraft.tags';
  import { Item } from 'net.minecraft.world.item';
  import { Ingredient, Recipe } from 'net.minecraft.world.item.crafting';
  import { Criterion, AdvancementHolder } from 'net.minecraft.advancements';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Builder } from 'Advancement';

  interface CopyComponentsShapedRecipeBuilder extends ShapedRecipeBuilder {}
  class CopyComponentsShapedRecipeBuilder extends ShapedRecipeBuilder {
    constructor(recipeCategory: RecipeCategory, result: ItemLike, count: number);
    accept(location: ResourceLocation, recipe: Recipe<any>, advancement: AdvancementHolder): void;
    advancement(): Builder;
    copyFrom(copyFrom: ItemLike): CopyComponentsShapedRecipeBuilder;
    copyFrom(copyFrom: Ingredient): CopyComponentsShapedRecipeBuilder;
    define(symbol: string, tag: TagKey<Item>): CopyComponentsShapedRecipeBuilder;
    define(symbol: string, item: ItemLike): CopyComponentsShapedRecipeBuilder;
    define(symbol: string, ingredient: Ingredient): CopyComponentsShapedRecipeBuilder;
    group(groupName: string): CopyComponentsShapedRecipeBuilder;
    pattern(pattern: string): CopyComponentsShapedRecipeBuilder;
    save(recipeOutput: RecipeOutput, id: ResourceLocation): void;
    static shaped(category: RecipeCategory, result: ItemLike): CopyComponentsShapedRecipeBuilder;
    static shaped(category: RecipeCategory, result: ItemLike, count: number): CopyComponentsShapedRecipeBuilder;
    showNotification(bl: boolean): CopyComponentsShapedRecipeBuilder;
    unlockedBy(criterionName: string, criterionTrigger: Criterion<any>): CopyComponentsShapedRecipeBuilder;
  }


  interface CopyComponentsShapelessRecipeBuilder extends ShapelessRecipeBuilder {}
  class CopyComponentsShapelessRecipeBuilder extends ShapelessRecipeBuilder {
    constructor(recipeCategory: RecipeCategory, result: ItemLike, count: number);
    accept(location: ResourceLocation, recipe: Recipe<any>, advancement: AdvancementHolder): void;
    advancement(): Builder;
    copyFrom(copyFrom: ItemLike): CopyComponentsShapelessRecipeBuilder;
    copyFrom(copyFrom: Ingredient): CopyComponentsShapelessRecipeBuilder;
    group(groupName: string): CopyComponentsShapelessRecipeBuilder;
    requires(tag: TagKey<Item>): CopyComponentsShapelessRecipeBuilder;
    requires(item: ItemLike): CopyComponentsShapelessRecipeBuilder;
    requires(item: ItemLike, quantity: number): CopyComponentsShapelessRecipeBuilder;
    requires(ingredient: Ingredient): CopyComponentsShapelessRecipeBuilder;
    requires(ingredient: Ingredient, quantity: number): CopyComponentsShapelessRecipeBuilder;
    save(recipeOutput: RecipeOutput, id: ResourceLocation): void;
    static shapeless(category: RecipeCategory, result: ItemLike): CopyComponentsShapelessRecipeBuilder;
    static shapeless(category: RecipeCategory, result: ItemLike, count: number): CopyComponentsShapelessRecipeBuilder;
    unlockedBy(criterionName: string, criterionTrigger: Criterion<any>): CopyComponentsShapelessRecipeBuilder;
  }

}

declare module 'fuzs.puzzleslib.api.data.v2.tags' {
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Reference } from 'Holder';
  import { TagKey } from 'net.minecraft.tags';
  import { List } from 'java.util';
  import { TagsProvider } from 'net.minecraft.data.tags';
  import { Registry } from 'net.minecraft.core';
  import { DataProviderContext } from 'fuzs.puzzleslib.api.data.v2.core';
  import { PackOutput } from 'net.minecraft.data';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';
  import { TagAppender } from 'TagsProvider';

  class AbstractTagAppender<T = any> {
    add(string: string): AbstractTagAppender<T>;
    add(...strings: string[]): AbstractTagAppender<T>;
    add(resourceLocation: ResourceLocation): AbstractTagAppender<T>;
    add(...resourceLocations: ResourceLocation[]): AbstractTagAppender<T>;
    add(resourceKey: ResourceKey<T>): AbstractTagAppender<T>;
    add(...resourceKeys: ResourceKey<T>[]): AbstractTagAppender<T>;
    add(value: T): AbstractTagAppender<T>;
    add(...values: T[]): AbstractTagAppender<T>;
    add(holder: Reference<T>): AbstractTagAppender<T>;
    add(...holders: Reference<T>[]): AbstractTagAppender<T>;
    addOptional(string: string): AbstractTagAppender<T>;
    addOptional(...strings: string[]): AbstractTagAppender<T>;
    addOptional(resourceLocation: ResourceLocation): AbstractTagAppender<T>;
    addOptional(...resourceLocations: ResourceLocation[]): AbstractTagAppender<T>;
    addOptional(resourceKey: ResourceKey<T>): AbstractTagAppender<T>;
    addOptional(...resourceKeys: ResourceKey<T>[]): AbstractTagAppender<T>;
    addOptionalTag(string: string): AbstractTagAppender<T>;
    addOptionalTag(...strings: string[]): AbstractTagAppender<T>;
    addOptionalTag(resourceLocation: ResourceLocation): AbstractTagAppender<T>;
    addOptionalTag(...resourceLocations: ResourceLocation[]): AbstractTagAppender<T>;
    addOptionalTag(tagKey: TagKey<T>): AbstractTagAppender<T>;
    addOptionalTag(...tagKeys: TagKey<T>[]): AbstractTagAppender<T>;
    addTag(string: string): AbstractTagAppender<T>;
    addTag(...strings: string[]): AbstractTagAppender<T>;
    addTag(resourceLocation: ResourceLocation): AbstractTagAppender<T>;
    addTag(...resourceLocations: ResourceLocation[]): AbstractTagAppender<T>;
    addTag(tagKey: TagKey<T>): AbstractTagAppender<T>;
    addTag(...tagKeys: TagKey<T>[]): AbstractTagAppender<T>;
    asStringList(): string[];
    remove(string: string): AbstractTagAppender<T>;
    remove(...strings: string[]): AbstractTagAppender<T>;
    remove(var1: ResourceLocation): AbstractTagAppender<T>;
    remove(...resourceLocations: ResourceLocation[]): AbstractTagAppender<T>;
    remove(resourceKey: ResourceKey<T>): AbstractTagAppender<T>;
    remove(...resourceKeys: ResourceKey<T>[]): AbstractTagAppender<T>;
    remove(value: T): AbstractTagAppender<T>;
    remove(...values: T[]): AbstractTagAppender<T>;
    removeTag(string: string): AbstractTagAppender<T>;
    removeTag(...strings: string[]): AbstractTagAppender<T>;
    removeTag(var1: ResourceLocation): AbstractTagAppender<T>;
    removeTag(...resourceLocations: ResourceLocation[]): AbstractTagAppender<T>;
    removeTag(tagKey: TagKey<T>): AbstractTagAppender<T>;
    removeTag(...tagKeys: TagKey<T>[]): AbstractTagAppender<T>;
    setReplace(var1: boolean): AbstractTagAppender<T>;
    setReplace(): AbstractTagAppender<T>;
  }


  interface AbstractTagProvider<T = any> extends TagsProvider<T> {}
  class AbstractTagProvider<T = any> extends TagsProvider<T> {
    constructor(registryKey: ResourceKey<Registry<T>>, context: DataProviderContext);

    constructor(registryKey: ResourceKey<Registry<T>>, modId: string, packOutput: PackOutput, registries: CompletableFuture<Provider>);
    add(string: string): AbstractTagAppender<T>;
    add(resourceLocation: ResourceLocation): AbstractTagAppender<T>;
    add(tagKey: TagKey<T>): AbstractTagAppender<T>;
    addTags(var1: Provider): void;
    tag(tagKey: TagKey<T>): TagAppender<T>;
  }

}

declare module 'fuzs.puzzleslib.api.entity.v1' {
  import { DamageSource, DamageType } from 'net.minecraft.world.damagesource';
  import { LevelReader, Level, Explosion, ExplosionDamageCalculator } from 'net.minecraft.world.level';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Entity } from 'net.minecraft.world.entity';
  import { RegistryAccess, Holder } from 'net.minecraft.core';
  import { ExplosionFactory } from 'fuzs.puzzleslib.api.entity.v1.GenericExplosionHelper';
  import { ExplosionInteraction } from 'Level';
  import { ParticleOptions } from 'net.minecraft.core.particles';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { Vec3 } from 'net.minecraft.world.phys';

  class DamageSourcesHelper {
    static source(level: LevelReader, damageType: ResourceKey<DamageType>): DamageSource;
    static source(level: LevelReader, damageType: ResourceKey<DamageType>, directEntity: Entity): DamageSource;
    static source(level: LevelReader, damageType: ResourceKey<DamageType>, directEntity: Entity, causingEntity: Entity): DamageSource;
    static source(registryAccess: RegistryAccess, damageType: ResourceKey<DamageType>, directEntity: Entity, causingEntity: Entity): DamageSource;
  }


  class GenericExplosionHelper {
    static explode<T extends Explosion>(factory: ExplosionFactory<T>, level: Level, source: Entity, x: number, y: number, z: number, radius: number, explosionInteraction: ExplosionInteraction): T;
    static explode<T extends Explosion>(factory: ExplosionFactory<T>, level: Level, source: Entity, damageSource: DamageSource, damageCalculator: ExplosionDamageCalculator, x: number, y: number, z: number, radius: number, fire: boolean, explosionInteraction: ExplosionInteraction, smallExplosionParticles: ParticleOptions, largeExplosionParticles: ParticleOptions, explosionSound: Holder<SoundEvent>): T;
    static explode<T extends Explosion>(factory: ExplosionFactory<T>, level: Level, source: Entity, x: number, y: number, z: number, radius: number, fire: boolean, explosionInteraction: ExplosionInteraction): T;
    static explode<T extends Explosion>(factory: ExplosionFactory<T>, level: Level, source: Entity, damageSource: DamageSource, damageCalculator: ExplosionDamageCalculator, pos: Vec3, radius: number, fire: boolean, explosionInteraction: ExplosionInteraction): T;
    static explode<T extends Explosion>(factory: ExplosionFactory<T>, level: Level, source: Entity, damageSource: DamageSource, damageCalculator: ExplosionDamageCalculator, x: number, y: number, z: number, radius: number, fire: boolean, explosionInteraction: ExplosionInteraction): T;
  }

}

declare module 'fuzs.puzzleslib.api.entity.v1.GenericExplosionHelper' {
  import { Level, ExplosionDamageCalculator } from 'net.minecraft.world.level';
  import { Entity } from 'net.minecraft.world.entity';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { BlockInteraction } from 'Explosion';
  import { ParticleOptions } from 'net.minecraft.core.particles';
  import { Holder } from 'net.minecraft.core';
  import { SoundEvent } from 'net.minecraft.sounds';

  class ExplosionFactory<T extends Explosion = any> {
    create(var1: Level, var2: Entity, var3: DamageSource, var4: ExplosionDamageCalculator, var5: number, var7: number, var9: number, var11: number, var12: boolean, var13: BlockInteraction, var14: ParticleOptions, var15: ParticleOptions, var16: Holder<SoundEvent>): T;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1' {
  import { EventInvoker } from 'fuzs.puzzleslib.api.event.v1.core';
  import { BiConsumer, Consumer, Function, Supplier } from 'java.util.function';
  import { BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { Block } from 'net.minecraft.world.level.block';
  import { Item } from 'net.minecraft.world.item';
  import { List } from 'java.util';
  import { Entry } from 'ItemAttributeModifiers';
  import { DataComponentMap, DataComponentPatch } from 'net.minecraft.core.component';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { Registry } from 'net.minecraft.core';

  class AddBlockEntityTypeBlocksCallback {
    static readonly EVENT: EventInvoker;
    onAddBlockEntityTypeBlocks(var1: BiConsumer<BlockEntityType<any>, Block>): void;
  }


  class ComputeItemAttributeModifiersCallback {
    static readonly EVENT: EventInvoker;
    onComputeItemAttributeModifiers(var1: Item, var2: Entry[]): void;
  }


  class FinalizeItemComponentsCallback {
    static readonly EVENT: EventInvoker;
    onFinalizeItemComponents(var1: Item, var2: Consumer<Function<DataComponentMap, DataComponentPatch>>): void;
  }


  class LoadCompleteCallback {
    static readonly EVENT: EventInvoker;
    onLoadComplete(): void;
  }


  class RegistryEntryAddedCallback<T = any> {
    onRegistryEntryAdded(var1: Registry<T>, var2: ResourceLocation, var3: T, var4: BiConsumer<ResourceLocation, Supplier<T>>): void;
    static registryEntryAdded<T>(resourceKey: ResourceKey<Registry<T>>): EventInvoker<RegistryEntryAddedCallback<T>>;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.core' {
  import { Class, Enum } from 'java.lang';
  import { BiConsumer, Consumer, Predicate, Function } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List, Optional } from 'java.util';

  class EventInvoker<T = any> {
    static lookup<T>(clazz: Class<T>): EventInvoker<T>;
    static lookup<T>(clazz: Class<T>, context: any): EventInvoker<T>;
    register(callback: T): void;
    register(var1: EventPhase, var2: T): void;
  }


  class EventInvokerRegistry {
    register<T>(clazz: Class<T>, converter: BiConsumer<T, any>): void;
    register<T>(clazz: Class<T>, converter: BiConsumer<T, any>, joinInvokers: boolean): void;
  }


  class EventPhase {
    static readonly DEFAULT: EventPhase;
    static readonly BEFORE: EventPhase;
    static readonly AFTER: EventPhase;
    static readonly FIRST: EventPhase;
    static readonly LAST: EventPhase;
    applyOrdering(var1: BiConsumer<ResourceLocation, ResourceLocation>): void;
    static early(eventPhase: EventPhase): EventPhase;
    identifier(): ResourceLocation;
    static late(eventPhase: EventPhase): EventPhase;
    parent(): EventPhase;
  }


  interface EventResult extends Enum<EventResult> {}
  class EventResult extends Enum<EventResult> {
    static readonly PASS: EventResult;
    static readonly INTERRUPT: EventResult;
    static readonly ALLOW: EventResult;
    static readonly DENY: EventResult;
    get asBoolean(): boolean;
    isInterrupt(): boolean;
    isPass(): boolean;
    static valueOf(name: string): EventResult;
    static values(): EventResult[];
  }


  class EventResultHolder<T = any> {
    static allow<T>(value: T): EventResultHolder<T>;
    static deny<T>(value: T): EventResultHolder<T>;
    filter(filter: Predicate<T>): EventResultHolder<T>;
    flatMap<U>(mapper: Function<T, EventResultHolder<U>>): EventResultHolder<U>;
    get allow(): Optional<T>;
    get deny(): Optional<T>;
    get interrupt(): Optional<T>;
    ifAllow(action: Consumer<T>): EventResultHolder<T>;
    ifDeny(action: Consumer<T>): EventResultHolder<T>;
    ifInterrupt(action: Consumer<T>): EventResultHolder<T>;
    static interrupt<T>(value: T): EventResultHolder<T>;
    isInterrupt(): boolean;
    isPass(): boolean;
    map<U>(mapper: Function<T, U>): EventResultHolder<U>;
    static pass<T>(): EventResultHolder<T>;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.data' {
  import { Consumer, Supplier, UnaryOperator, DoubleConsumer, DoubleSupplier, DoubleUnaryOperator, IntConsumer, IntSupplier, IntUnaryOperator, BooleanSupplier } from 'java.util.function';
  import { Boolean, Float } from 'java.lang';
  import { Optional, OptionalDouble, OptionalInt } from 'java.util';

  interface DefaultedBoolean extends MutableBoolean {}
  class DefaultedBoolean extends MutableBoolean {
    applyDefaultBoolean(): void;
    static fromEvent(consumer: Consumer<boolean>, supplier: Supplier<boolean>, defaultSupplier: Supplier<boolean>): DefaultedBoolean;
    static fromEvent(consumer: Consumer<boolean>, supplier: Supplier<boolean>): MutableBoolean;
    static fromEventWithValue(consumer: Consumer<boolean>, supplier: Supplier<boolean>, defaultValue: boolean): DefaultedBoolean;
    static fromValue(value: boolean): DefaultedBoolean;
    get asDefaultBoolean(): boolean;
    get asOptionalBoolean(): Optional<boolean>;
    mapDefaultBoolean(operator: UnaryOperator<boolean>): void;
  }


  interface DefaultedDouble extends MutableDouble {}
  class DefaultedDouble extends MutableDouble {
    applyDefaultDouble(): void;
    static fromEvent(consumer: DoubleConsumer, supplier: DoubleSupplier, defaultSupplier: DoubleSupplier): DefaultedDouble;
    static fromEvent(consumer: DoubleConsumer, supplier: DoubleSupplier): MutableDouble;
    static fromEventWithValue(consumer: DoubleConsumer, supplier: DoubleSupplier, defaultValue: number): DefaultedDouble;
    static fromValue(value: number): DefaultedDouble;
    get asDefaultDouble(): number;
    get asOptionalDouble(): OptionalDouble;
    mapDefaultDouble(operator: DoubleUnaryOperator): void;
  }


  interface DefaultedFloat extends MutableFloat {}
  class DefaultedFloat extends MutableFloat {
    applyDefaultFloat(): void;
    static fromEvent(consumer: Consumer<number>, supplier: Supplier<number>, defaultSupplier: Supplier<number>): DefaultedFloat;
    static fromEvent(consumer: Consumer<number>, supplier: Supplier<number>): MutableFloat;
    static fromEventWithValue(consumer: Consumer<number>, supplier: Supplier<number>, defaultValue: number): DefaultedFloat;
    static fromValue(value: number): DefaultedFloat;
    get asDefaultFloat(): number;
    get asOptionalFloat(): Optional<number>;
    mapDefaultFloat(operator: UnaryOperator<number>): void;
  }


  interface DefaultedInt extends MutableInt {}
  class DefaultedInt extends MutableInt {
    applyDefaultInt(): void;
    static fromEvent(consumer: IntConsumer, supplier: IntSupplier, defaultSupplier: IntSupplier): DefaultedInt;
    static fromEvent(consumer: IntConsumer, supplier: IntSupplier): MutableInt;
    static fromEventWithValue(consumer: IntConsumer, supplier: IntSupplier, defaultValue: number): DefaultedInt;
    static fromValue(value: number): DefaultedInt;
    get asDefaultInt(): number;
    get asOptionalInt(): OptionalInt;
    mapDefaultInt(operator: IntUnaryOperator): void;
  }


  interface DefaultedValue<T = any> extends MutableValue<T> {}
  class DefaultedValue<T = any> extends MutableValue<T> {
    applyDefault(): void;
    static fromEvent<T>(consumer: Consumer<T>, supplier: Supplier<T>, defaultSupplier: Supplier<T>): DefaultedValue<T>;
    static fromEvent<T>(consumer: Consumer<T>, supplier: Supplier<T>): MutableValue<T>;
    static fromEventWithValue<T>(consumer: Consumer<T>, supplier: Supplier<T>, defaultValue: T): DefaultedValue<T>;
    static fromValue<T>(value: T): DefaultedValue<T>;
    get asDefault(): T;
    get asOptional(): Optional<T>;
    mapDefault(operator: UnaryOperator<T>): void;
  }


  interface MutableBoolean extends BooleanSupplier {}
  class MutableBoolean extends BooleanSupplier {
    accept(var1: boolean): void;
    static fromEvent(consumer: Consumer<boolean>, supplier: Supplier<boolean>): MutableBoolean;
    static fromValue(value: boolean): MutableBoolean;
    mapBoolean(operator: UnaryOperator<boolean>): void;
  }


  interface MutableDouble extends DoubleConsumer, DoubleSupplier {}
  class MutableDouble extends DoubleConsumer {
    static fromEvent(consumer: DoubleConsumer, supplier: DoubleSupplier): MutableDouble;
    static fromValue(value: number): MutableDouble;
    mapDouble(operator: DoubleUnaryOperator): void;
  }


  class MutableFloat {
    accept(var1: number): void;
    static fromEvent(consumer: Consumer<number>, supplier: Supplier<number>): MutableFloat;
    static fromValue(value: number): MutableFloat;
    get asFloat(): number;
    mapFloat(operator: UnaryOperator<number>): void;
  }


  interface MutableInt extends IntConsumer, IntSupplier {}
  class MutableInt extends IntConsumer {
    static fromEvent(consumer: IntConsumer, supplier: IntSupplier): MutableInt;
    static fromValue(value: number): MutableInt;
    mapInt(operator: IntUnaryOperator): void;
  }


  interface MutableValue<T = any> extends Consumer<T>, Supplier<T> {}
  class MutableValue<T = any> extends Consumer<T> {
    static fromEvent<T>(consumer: Consumer<T>, supplier: Supplier<T>): MutableValue<T>;
    static fromValue<T>(value: T): MutableValue<T>;
    map(operator: UnaryOperator<T>): void;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.entity' {
  import { EventInvoker, EventResultHolder, EventResult } from 'fuzs.puzzleslib.api.event.v1.core';
  import { EntityDimensions, Entity, Pose } from 'net.minecraft.world.entity';
  import { Projectile } from 'net.minecraft.world.entity.projectile';
  import { HitResult } from 'net.minecraft.world.phys';

  class ChangeEntitySizeCallback {
    static readonly EVENT: EventInvoker;
    onChangeEntitySize(var1: Entity, var2: Pose, var3: EntityDimensions): EventResultHolder<EntityDimensions>;
  }


  class EntityRidingEvents {
    static readonly START: EventInvoker;
    static readonly STOP: EventInvoker;
  }


  class EntityTickEvents {
    static readonly START: EventInvoker;
    static readonly END: EventInvoker;
  }


  class ProjectileImpactCallback {
    static readonly EVENT: EventInvoker;
    onProjectileImpact(var1: Projectile, var2: HitResult): EventResult;
  }


  class ServerEntityLevelEvents {
    static readonly LOAD: EventInvoker;
    static readonly SPAWN: EventInvoker;
    static readonly UNLOAD: EventInvoker;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.entity.EntityRidingEvents' {
  import { EventResult } from 'fuzs.puzzleslib.api.event.v1.core';
  import { Level } from 'net.minecraft.world.level';
  import { Entity } from 'net.minecraft.world.entity';

  class Start {
    onStartRiding(var1: Level, var2: Entity, var3: Entity): EventResult;
  }


  class Stop {
    onStopRiding(var1: Level, var2: Entity, var3: Entity): EventResult;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.entity.EntityTickEvents' {
  import { EventResult } from 'fuzs.puzzleslib.api.event.v1.core';
  import { Entity } from 'net.minecraft.world.entity';

  class Start {
    onStartEntityTick(var1: Entity): EventResult;
  }


  class End {
    onEndEntityTick(var1: Entity): void;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.entity.living' {
  import { EventInvoker, EventResult } from 'fuzs.puzzleslib.api.event.v1.core';
  import { Animal } from 'net.minecraft.world.entity.animal';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Mob, AgeableMob, LivingEntity, EquipmentSlot, Entity } from 'net.minecraft.world.entity';
  import { MutableValue, MutableInt, DefaultedValue, DefaultedInt, MutableFloat, DefaultedDouble, MutableDouble, DefaultedFloat } from 'fuzs.puzzleslib.api.event.v1.data';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { Holder } from 'net.minecraft.core';
  import { Enchantment } from 'net.minecraft.world.item.enchantment';
  import { Collection } from 'java.util';
  import { ItemEntity } from 'net.minecraft.world.entity.item';
  import { ItemStack } from 'net.minecraft.world.item';
  import { EnderMan } from 'net.minecraft.world.entity.monster';

  class AnimalTameCallback {
    static readonly EVENT: EventInvoker;
    onAnimalTame(var1: Animal, var2: Player): EventResult;
  }


  class BabyEntitySpawnCallback {
    static readonly EVENT: EventInvoker;
    onBabyEntitySpawn(var1: Mob, var2: Mob, var3: MutableValue<AgeableMob>): EventResult;
  }


  class CheckMobDespawnCallback {
    static readonly EVENT: EventInvoker;
    onCheckMobDespawn(var1: Mob, var2: ServerLevel): EventResult;
  }


  class ComputeEnchantedLootBonusCallback {
    static readonly EVENT: EventInvoker;
    onComputeEnchantedLootBonus(var1: LivingEntity, var2: DamageSource, var3: Holder<Enchantment>, var4: MutableInt): void;
  }


  class LivingAttackCallback {
    static readonly EVENT: EventInvoker;
    onLivingAttack(var1: LivingEntity, var2: DamageSource, var3: number): EventResult;
  }


  class LivingBreathEvents {
    static readonly BREATHE: EventInvoker;
    static readonly DROWN: EventInvoker;
  }


  class LivingChangeTargetCallback {
    static readonly EVENT: EventInvoker;
    onLivingChangeTarget(var1: LivingEntity, var2: DefaultedValue<LivingEntity>): EventResult;
  }


  class LivingConversionCallback {
    static readonly EVENT: EventInvoker;
    onLivingConversion(var1: LivingEntity, var2: LivingEntity): void;
  }


  class LivingDeathCallback {
    static readonly EVENT: EventInvoker;
    onLivingDeath(var1: LivingEntity, var2: DamageSource): EventResult;
  }


  class LivingDropsCallback {
    static readonly EVENT: EventInvoker;
    onLivingDrops(var1: LivingEntity, var2: DamageSource, var3: Collection<ItemEntity>, var4: boolean): EventResult;
  }


  class LivingEquipmentChangeCallback {
    static readonly EVENT: EventInvoker;
    onLivingEquipmentChange(var1: LivingEntity, var2: EquipmentSlot, var3: ItemStack, var4: ItemStack): void;
  }


  class LivingExperienceDropCallback {
    static readonly EVENT: EventInvoker;
    onLivingExperienceDrop(var1: LivingEntity, var2: Player, var3: DefaultedInt): EventResult;
  }


  class LivingFallCallback {
    static readonly EVENT: EventInvoker;
    onLivingFall(var1: LivingEntity, var2: MutableFloat, var3: MutableFloat): EventResult;
  }


  class LivingHurtCallback {
    static readonly EVENT: EventInvoker;
    onLivingHurt(var1: LivingEntity, var2: DamageSource, var3: MutableFloat): EventResult;
  }


  class LivingJumpCallback {
    static readonly EVENT: EventInvoker;
    onLivingJump(var1: LivingEntity, var2: DefaultedDouble): EventResult;
  }


  class LivingKnockBackCallback {
    static readonly EVENT: EventInvoker;
    onLivingKnockBack(var1: LivingEntity, var2: DefaultedDouble, var3: DefaultedDouble, var4: DefaultedDouble): EventResult;
  }


  class LivingVisibilityCallback {
    static readonly EVENT: EventInvoker;
    onLivingVisibility(var1: LivingEntity, var2: Entity, var3: MutableDouble): void;
  }


  class LookingAtEndermanCallback {
    static readonly EVENT: EventInvoker;
    onLookingAtEnderManCallback(var1: EnderMan, var2: Player): EventResult;
  }


  class MobEffectEvents {
    static readonly AFFECTS: EventInvoker;
    static readonly APPLY: EventInvoker;
    static readonly REMOVE: EventInvoker;
    static readonly EXPIRE: EventInvoker;
  }


  class ShieldBlockCallback {
    static readonly EVENT: EventInvoker;
    onShieldBlock(var1: LivingEntity, var2: DamageSource, var3: DefaultedFloat): EventResult;
  }


  class UseItemEvents {
    static readonly START: EventInvoker;
    static readonly TICK: EventInvoker;
    static readonly STOP: EventInvoker;
    static readonly FINISH: EventInvoker;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.entity.living.LivingBreathEvents' {
  import { EventResult } from 'fuzs.puzzleslib.api.event.v1.core';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { DefaultedInt } from 'fuzs.puzzleslib.api.event.v1.data';

  class Breathe {
    onLivingBreathe(var1: LivingEntity, var2: DefaultedInt, var3: boolean, var4: boolean): EventResult;
  }


  class Drown {
    onLivingDrown(var1: LivingEntity, var2: number, var3: boolean): EventResult;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.entity.living.MobEffectEvents' {
  import { EventResult } from 'fuzs.puzzleslib.api.event.v1.core';
  import { LivingEntity, Entity } from 'net.minecraft.world.entity';
  import { MobEffectInstance } from 'net.minecraft.world.effect';

  class Affects {
    onMobEffectAffects(var1: LivingEntity, var2: MobEffectInstance): EventResult;
  }


  class Apply {
    onMobEffectApply(var1: LivingEntity, var2: MobEffectInstance, var3: MobEffectInstance, var4: Entity): void;
  }


  class Remove {
    onMobEffectRemove(var1: LivingEntity, var2: MobEffectInstance): EventResult;
  }


  class Expire {
    onMobEffectExpire(var1: LivingEntity, var2: MobEffectInstance): void;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.entity.living.UseItemEvents' {
  import { EventResult } from 'fuzs.puzzleslib.api.event.v1.core';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { ItemStack } from 'net.minecraft.world.item';
  import { MutableInt, MutableValue } from 'fuzs.puzzleslib.api.event.v1.data';

  class Start {
    onUseItemStart(var1: LivingEntity, var2: ItemStack, var3: MutableInt): EventResult;
  }


  class Tick {
    onUseItemTick(var1: LivingEntity, var2: ItemStack, var3: MutableInt): EventResult;
  }


  class Stop {
    onUseItemStop(var1: LivingEntity, var2: ItemStack, var3: number): EventResult;
  }


  class Finish {
    onUseItemFinish(var1: LivingEntity, var2: MutableValue<ItemStack>, var3: number, var4: ItemStack): void;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.entity.player' {
  import { EventInvoker, EventResult } from 'fuzs.puzzleslib.api.event.v1.core';
  import { ServerPlayer, ServerLevel } from 'net.minecraft.server.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Level } from 'net.minecraft.world.level';
  import { MutableInt, DefaultedFloat } from 'fuzs.puzzleslib.api.event.v1.data';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { ExperienceOrb } from 'net.minecraft.world.entity';
  import { BlockPos } from 'net.minecraft.core';

  class AfterChangeDimensionCallback {
    static readonly EVENT: EventInvoker;
    onAfterChangeDimension(var1: ServerPlayer, var2: ServerLevel, var3: ServerLevel): void;
  }


  class AnvilEvents {
    static readonly UPDATE: EventInvoker;
    static readonly USE: EventInvoker;
  }


  class ArrowLooseCallback {
    static readonly EVENT: EventInvoker;
    onArrowLoose(var1: Player, var2: ItemStack, var3: Level, var4: MutableInt, var5: boolean): EventResult;
  }


  class BreakSpeedCallback {
    static readonly EVENT: EventInvoker;
    onBreakSpeed(var1: Player, var2: BlockState, var3: DefaultedFloat): EventResult;
  }


  class ContainerEvents {
    static readonly OPEN: EventInvoker;
    static readonly CLOSE: EventInvoker;
  }


  class GrindstoneEvents {
    static readonly UPDATE: EventInvoker;
    static readonly USE: EventInvoker;
  }


  class ItemEntityEvents {
    static readonly TOSS: EventInvoker;
    static readonly PICKUP: EventInvoker;
    static readonly TOUCH: EventInvoker;
  }


  class PickupExperienceCallback {
    static readonly EVENT: EventInvoker;
    onPickupExperience(var1: Player, var2: ExperienceOrb): EventResult;
  }


  class PlayerCopyEvents {
    static readonly COPY: EventInvoker;
    static readonly RESPAWN: EventInvoker;
  }


  class PlayerInteractEvents {
    static readonly USE_BLOCK: EventInvoker;
    static readonly ATTACK_BLOCK: EventInvoker;
    static readonly USE_ITEM: EventInvoker;
    static readonly USE_ENTITY: EventInvoker;
    static readonly USE_ENTITY_AT: EventInvoker;
    static readonly ATTACK_ENTITY: EventInvoker;
  }


  class PlayerNetworkEvents {
    static readonly LOGGED_IN: EventInvoker;
    static readonly LOGGED_OUT: EventInvoker;
  }


  class PlayerTickEvents {
    static readonly START: EventInvoker;
    static readonly END: EventInvoker;
  }


  class PlayerTrackingEvents {
    static readonly START: EventInvoker;
    static readonly STOP: EventInvoker;
  }


  class UseBoneMealCallback {
    static readonly EVENT: EventInvoker;
    onUseBoneMeal(var1: Level, var2: BlockPos, var3: BlockState, var4: ItemStack): EventResult;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.entity.player.AnvilEvents' {
  import { EventResult } from 'fuzs.puzzleslib.api.event.v1.core';
  import { ItemStack } from 'net.minecraft.world.item';
  import { MutableValue, MutableInt, MutableFloat } from 'fuzs.puzzleslib.api.event.v1.data';
  import { Player } from 'net.minecraft.world.entity.player';

  class Update {
    onAnvilUpdate(var1: ItemStack, var2: ItemStack, var3: MutableValue<ItemStack>, var4: string, var5: MutableInt, var6: MutableInt, var7: Player): EventResult;
  }


  class Use {
    onAnvilUse(var1: Player, var2: ItemStack, var3: ItemStack, var4: ItemStack, var5: MutableFloat): void;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.entity.player.ContainerEvents' {
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { AbstractContainerMenu } from 'net.minecraft.world.inventory';

  class Open {
    onContainerOpen(var1: ServerPlayer, var2: AbstractContainerMenu): void;
  }


  class Close {
    onContainerClose(var1: ServerPlayer, var2: AbstractContainerMenu): void;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.entity.player.GrindstoneEvents' {
  import { EventResult } from 'fuzs.puzzleslib.api.event.v1.core';
  import { ItemStack } from 'net.minecraft.world.item';
  import { MutableValue, MutableInt, DefaultedValue } from 'fuzs.puzzleslib.api.event.v1.data';
  import { Player } from 'net.minecraft.world.entity.player';

  class Update {
    onGrindstoneUpdate(var1: ItemStack, var2: ItemStack, var3: MutableValue<ItemStack>, var4: MutableInt, var5: Player): EventResult;
  }


  class Use {
    onGrindstoneUse(var1: DefaultedValue<ItemStack>, var2: DefaultedValue<ItemStack>, var3: Player): void;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.entity.player.ItemEntityEvents' {
  import { EventResult } from 'fuzs.puzzleslib.api.event.v1.core';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemEntity } from 'net.minecraft.world.entity.item';
  import { ItemStack } from 'net.minecraft.world.item';

  class Toss {
    onItemToss(var1: Player, var2: ItemEntity): EventResult;
  }


  class Pickup {
    onItemPickup(var1: Player, var2: ItemEntity, var3: ItemStack): void;
  }


  class Touch {
    onItemTouch(var1: Player, var2: ItemEntity): EventResult;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.entity.player.PlayerCopyEvents' {
  import { ServerPlayer } from 'net.minecraft.server.level';

  class Copy {
    onCopy(var1: ServerPlayer, var2: ServerPlayer, var3: boolean): void;
  }


  class Respawn {
    onRespawn(var1: ServerPlayer, var2: boolean): void;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.entity.player.PlayerInteractEvents' {
  import { EventResultHolder, EventResult } from 'fuzs.puzzleslib.api.event.v1.core';
  import { InteractionResult, InteractionHand } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Level } from 'net.minecraft.world.level';
  import { BlockHitResult, Vec3 } from 'net.minecraft.world.phys';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { Entity } from 'net.minecraft.world.entity';

  class UseBlock {
    onUseBlock(var1: Player, var2: Level, var3: InteractionHand, var4: BlockHitResult): EventResultHolder<InteractionResult>;
  }


  class AttackBlock {
    onAttackBlock(var1: Player, var2: Level, var3: InteractionHand, var4: BlockPos, var5: Direction): EventResult;
  }


  class UseItem {
    onUseItem(var1: Player, var2: Level, var3: InteractionHand): EventResultHolder<InteractionResult>;
  }


  class UseEntity {
    onUseEntity(var1: Player, var2: Level, var3: InteractionHand, var4: Entity): EventResultHolder<InteractionResult>;
  }


  class UseEntityAt {
    onUseEntityAt(var1: Player, var2: Level, var3: InteractionHand, var4: Entity, var5: Vec3): EventResultHolder<InteractionResult>;
  }


  class AttackEntity {
    onAttackEntity(var1: Player, var2: Level, var3: InteractionHand, var4: Entity): EventResult;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.entity.player.PlayerNetworkEvents' {
  import { ServerPlayer } from 'net.minecraft.server.level';

  class LoggedIn {
    onLoggedIn(var1: ServerPlayer): void;
  }


  class LoggedOut {
    onLoggedOut(var1: ServerPlayer): void;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.entity.player.PlayerTickEvents' {
  import { Player } from 'net.minecraft.world.entity.player';

  class Start {
    onStartPlayerTick(var1: Player): void;
  }


  class End {
    onEndPlayerTick(var1: Player): void;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.entity.player.PlayerTrackingEvents' {
  import { Entity } from 'net.minecraft.world.entity';
  import { ServerPlayer } from 'net.minecraft.server.level';

  class Start {
    onStartTracking(var1: Entity, var2: ServerPlayer): void;
  }


  class Stop {
    onStopTracking(var1: Entity, var2: ServerPlayer): void;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.entity.ServerEntityLevelEvents' {
  import { EventResult } from 'fuzs.puzzleslib.api.event.v1.core';
  import { Entity, MobSpawnType } from 'net.minecraft.world.entity';
  import { ServerLevel } from 'net.minecraft.server.level';

  class Load {
    onEntityLoad(var1: Entity, var2: ServerLevel): EventResult;
  }


  class Spawn {
    onEntitySpawn(var1: Entity, var2: ServerLevel, var3: MobSpawnType): EventResult;
  }


  class Unload {
    onEntityUnload(var1: Entity, var2: ServerLevel): void;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.level' {
  import { EventInvoker } from 'fuzs.puzzleslib.api.event.v1.core';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { StructureManager } from 'net.minecraft.world.level';
  import { ChunkGenerator } from 'net.minecraft.world.level.chunk';
  import { MobCategory } from 'net.minecraft.world.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { List } from 'java.util';
  import { SpawnerData } from 'MobSpawnSettings';

  class BlockEvents {
    static readonly BREAK: EventInvoker;
    static readonly DROP_EXPERIENCE: EventInvoker;
    static readonly FARMLAND_TRAMPLE: EventInvoker;
  }


  class ExplosionEvents {
    static readonly START: EventInvoker;
    static readonly DETONATE: EventInvoker;
  }


  class GatherPotentialSpawnsCallback {
    static readonly EVENT: EventInvoker;
    onGatherPotentialSpawns(var1: ServerLevel, var2: StructureManager, var3: ChunkGenerator, var4: MobCategory, var5: BlockPos, var6: SpawnerData[]): void;
  }


  class PlayLevelSoundEvents {
    static readonly POSITION: EventInvoker;
    static readonly ENTITY: EventInvoker;
  }


  class ServerChunkEvents {
    static readonly LOAD: EventInvoker;
    static readonly UNLOAD: EventInvoker;
    static readonly WATCH: EventInvoker;
    static readonly UNWATCH: EventInvoker;
  }


  class ServerLevelEvents {
    static readonly LOAD: EventInvoker;
    static readonly UNLOAD: EventInvoker;
  }


  class ServerLevelTickEvents {
    static readonly START: EventInvoker;
    static readonly END: EventInvoker;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.level.BlockEvents' {
  import { EventResult } from 'fuzs.puzzleslib.api.event.v1.core';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { MutableInt } from 'fuzs.puzzleslib.api.event.v1.data';
  import { Level } from 'net.minecraft.world.level';
  import { Entity } from 'net.minecraft.world.entity';

  class Break {
    onBreakBlock(var1: ServerLevel, var2: BlockPos, var3: BlockState, var4: Player, var5: ItemStack): EventResult;
  }


  class DropExperience {
    onDropExperience(var1: ServerLevel, var2: BlockPos, var3: BlockState, var4: Player, var5: ItemStack, var6: MutableInt): void;
  }


  class FarmlandTrample {
    onFarmlandTrample(var1: Level, var2: BlockPos, var3: BlockState, var4: number, var5: Entity): EventResult;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.level.ExplosionEvents' {
  import { EventResult } from 'fuzs.puzzleslib.api.event.v1.core';
  import { Level, Explosion } from 'net.minecraft.world.level';
  import { List } from 'java.util';
  import { BlockPos } from 'net.minecraft.core';
  import { Entity } from 'net.minecraft.world.entity';

  class Start {
    onExplosionStart(var1: Level, var2: Explosion): EventResult;
  }


  class Detonate {
    onExplosionDetonate(var1: Level, var2: Explosion, var3: BlockPos[], var4: Entity[]): void;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.level.PlayLevelSoundEvents' {
  import { EventResult } from 'fuzs.puzzleslib.api.event.v1.core';
  import { Level } from 'net.minecraft.world.level';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { MutableValue, DefaultedFloat } from 'fuzs.puzzleslib.api.event.v1.data';
  import { Holder } from 'net.minecraft.core';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';
  import { Entity } from 'net.minecraft.world.entity';

  class AtPosition {
    onPlaySoundAtPosition(var1: Level, var2: Vec3, var3: MutableValue<Holder<SoundEvent>>, var4: MutableValue<SoundSource>, var5: DefaultedFloat, var6: DefaultedFloat): EventResult;
  }


  class AtEntity {
    onPlaySoundAtEntity(var1: Level, var2: Entity, var3: MutableValue<Holder<SoundEvent>>, var4: MutableValue<SoundSource>, var5: DefaultedFloat, var6: DefaultedFloat): EventResult;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.level.ServerChunkEvents' {
  import { ServerLevel, ServerPlayer } from 'net.minecraft.server.level';
  import { LevelChunk } from 'net.minecraft.world.level.chunk';
  import { ChunkPos } from 'net.minecraft.world.level';

  class Load {
    onChunkLoad(var1: ServerLevel, var2: LevelChunk): void;
  }


  class Unload {
    onChunkUnload(var1: ServerLevel, var2: LevelChunk): void;
  }


  class Watch {
    onChunkWatch(var1: ServerPlayer, var2: LevelChunk, var3: ServerLevel): void;
  }


  class Unwatch {
    onChunkUnwatch(var1: ServerPlayer, var2: ChunkPos, var3: ServerLevel): void;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.level.ServerLevelEvents' {
  import { MinecraftServer } from 'net.minecraft.server';
  import { ServerLevel } from 'net.minecraft.server.level';

  class Load {
    onLevelLoad(var1: MinecraftServer, var2: ServerLevel): void;
  }


  class Unload {
    onLevelUnload(var1: MinecraftServer, var2: ServerLevel): void;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.level.ServerLevelTickEvents' {
  import { MinecraftServer } from 'net.minecraft.server';
  import { ServerLevel } from 'net.minecraft.server.level';

  class Start {
    onStartLevelTick(var1: MinecraftServer, var2: ServerLevel): void;
  }


  class End {
    onEndLevelTick(var1: MinecraftServer, var2: ServerLevel): void;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.server' {
  import { EventInvoker } from 'fuzs.puzzleslib.api.event.v1.core';
  import { BiConsumer, BiFunction } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Provider } from 'HolderLookup';
  import { RegistryAccess } from 'net.minecraft.core';
  import { PreparableReloadListener } from 'net.minecraft.server.packs.resources';
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack, CommandBuildContext } from 'net.minecraft.commands';
  import { CommandSelection } from 'Commands';
  import { Builder } from 'fuzs.puzzleslib.api.event.v1.server.RegisterPotionBrewingMixesCallback';
  import { ServerPlayer } from 'net.minecraft.server.level';

  class AddDataPackReloadListenersCallback {
    static readonly EVENT: EventInvoker;
    onAddDataPackReloadListeners(var1: BiConsumer<ResourceLocation, BiFunction<Provider, RegistryAccess, PreparableReloadListener>>): void;
  }


  class LootTableLoadEvents {
    static readonly REPLACE: EventInvoker;
    static readonly MODIFY: EventInvoker;
  }


  class RegisterCommandsCallback {
    static readonly EVENT: EventInvoker;
    onRegisterCommands(var1: CommandDispatcher<CommandSourceStack>, var2: CommandBuildContext, var3: CommandSelection): void;
  }


  class RegisterPotionBrewingMixesCallback {
    static readonly EVENT: EventInvoker;
    onRegisterPotionBrewingMixes(var1: Builder): void;
  }


  class ServerLifecycleEvents {
    static readonly STARTING: EventInvoker;
    static readonly STARTED: EventInvoker;
    static readonly STOPPING: EventInvoker;
    static readonly STOPPED: EventInvoker;
  }


  class ServerTickEvents {
    static readonly START: EventInvoker;
    static readonly END: EventInvoker;
  }


  class SyncDataPackContentsCallback {
    static readonly EVENT: EventInvoker;
    onSyncDataPackContents(var1: ServerPlayer, var2: boolean): void;
  }


  class TagsUpdatedCallback {
    static readonly EVENT: EventInvoker;
    onTagsUpdated(var1: RegistryAccess, var2: boolean): void;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.server.LootTableLoadEvents' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { MutableValue } from 'fuzs.puzzleslib.api.event.v1.data';
  import { LootTable, LootPool } from 'net.minecraft.world.level.storage.loot';
  import { Consumer, IntPredicate } from 'java.util.function';

  class Replace {
    onReplaceLootTable(var1: ResourceLocation, var2: MutableValue<LootTable>): void;
  }


  class Modify {
    onModifyLootTable(var1: ResourceLocation, var2: Consumer<LootPool>, var3: IntPredicate): void;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.server.RegisterPotionBrewingMixesCallback' {
  import { PotionItem, Item } from 'net.minecraft.world.item';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { Holder } from 'net.minecraft.core';
  import { Potion } from 'net.minecraft.world.item.alchemy';

  class Builder {
    registerContainerRecipe(from: PotionItem, item: Item, to: PotionItem): void;
    registerContainerRecipe(var1: PotionItem, var2: Ingredient, var3: PotionItem): void;
    registerPotionContainer(var1: PotionItem): void;
    registerPotionRecipe(from: Holder<Potion>, item: Item, to: Holder<Potion>): void;
    registerPotionRecipe(var1: Holder<Potion>, var2: Ingredient, var3: Holder<Potion>): void;
    registerStartPotionRecipe(item: Item, to: Holder<Potion>): void;
    registerStartPotionRecipe(ingredient: Ingredient, to: Holder<Potion>): void;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.server.ServerLifecycleEvents' {
  import { MinecraftServer } from 'net.minecraft.server';

  class Starting {
    onServerStarting(var1: MinecraftServer): void;
  }


  class Started {
    onServerStarted(var1: MinecraftServer): void;
  }


  class Stopping {
    onServerStopping(var1: MinecraftServer): void;
  }


  class Stopped {
    onServerStopped(var1: MinecraftServer): void;
  }

}

declare module 'fuzs.puzzleslib.api.event.v1.server.ServerTickEvents' {
  import { MinecraftServer } from 'net.minecraft.server';

  class Start {
    onStartServerTick(var1: MinecraftServer): void;
  }


  class End {
    onEndServerTick(var1: MinecraftServer): void;
  }

}

declare module 'fuzs.puzzleslib.api.init.v3' {
  import { Key, BooleanValue, Category, IntegerValue, Type, Value } from 'GameRules';
  import { BiConsumer } from 'java.util.function';
  import { MinecraftServer } from 'net.minecraft.server';
  import { Type as abstractminecart_Type } from 'AbstractMinecart';
  import { Factory } from 'fuzs.puzzleslib.api.init.v3.MinecartTypeRegistry';

  class GameRulesFactory {
    static readonly INSTANCE: GameRulesFactory;
    createBooleanRule(defaultValue: boolean): Type<BooleanValue>;
    createBooleanRule(var1: boolean, var2: BiConsumer<MinecraftServer, BooleanValue>): Type<BooleanValue>;
    createIntRule(defaultValue: number): Type<IntegerValue>;
    createIntRule(defaultValue: number, minimumValue: number): Type<IntegerValue>;
    createIntRule(defaultValue: number, minimumValue: number, maximumValue: number): Type<IntegerValue>;
    createIntRule(defaultValue: number, callback: BiConsumer<MinecraftServer, IntegerValue>): Type<IntegerValue>;
    createIntRule(defaultValue: number, minimumValue: number, callback: BiConsumer<MinecraftServer, IntegerValue>): Type<IntegerValue>;
    createIntRule(var1: number, var2: number, var3: number, var4: BiConsumer<MinecraftServer, IntegerValue>): Type<IntegerValue>;
    register<T extends Value<T>>(var1: string, var2: Category, var3: Type<T>): Key<T>;
    registerBooleanRule(name: string, category: Category, defaultValue: boolean): Key<BooleanValue>;
    registerIntRule(name: string, category: Category, defaultValue: number): Key<IntegerValue>;
  }


  class MinecartTypeRegistry {
    static readonly INSTANCE: MinecartTypeRegistry;
    register(var1: abstractminecart_Type, var2: Factory): void;
  }

}

declare module 'fuzs.puzzleslib.api.init.v3.MinecartTypeRegistry' {
  import { AbstractMinecart } from 'net.minecraft.world.entity.vehicle';
  import { Level } from 'net.minecraft.world.level';

  class Factory {
    create(var1: Level, var2: number, var4: number, var6: number): AbstractMinecart;
  }

}

declare module 'fuzs.puzzleslib.api.init.v3.override' {
  import { Holder } from 'net.minecraft.core';
  import { MobEffect } from 'net.minecraft.world.effect';
  import { Key, BooleanValue, IntegerValue, Value } from 'GameRules';
  import { Consumer } from 'java.util.function';

  class CommandOverrides {
    static registerEffectCommand(holder: Holder<MobEffect>): void;
    static registerHandlers(): void;
    static registerPlayerCommand(command: string, onlyDedicated: boolean): void;
    static registerServerCommand(command: string, onlyDedicated: boolean): void;
  }


  class GameRuleValueOverrides {
    static setValue(key: Key<BooleanValue>, value: boolean): void;
    static setValue(key: Key<IntegerValue>, value: number): void;
    static setValue<T extends Value<T>>(key: Key<T>, valueSetter: Consumer<T>): void;
  }

}

declare module 'fuzs.puzzleslib.api.init.v3.registry' {
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { Holder, Registry } from 'net.minecraft.core';
  import { Entity, EntityType, Mob } from 'net.minecraft.world.entity';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { LevelReader, ItemLike } from 'net.minecraft.world.level';
  import { Provider } from 'HolderLookup';
  import { Enchantment } from 'net.minecraft.world.item.enchantment';
  import { DamageType } from 'net.minecraft.world.damagesource';
  import { Optional, Set, Map } from 'java.util';
  import { Reference } from 'Holder';
  import { TagKey } from 'net.minecraft.tags';
  import { EnvironmentAwareBuilder } from 'fuzs.puzzleslib.api.core.v1.utility';
  import { Supplier, Function, BiFunction, UnaryOperator } from 'java.util.function';
  import { Block } from 'net.minecraft.world.level.block';
  import { Properties } from 'BlockBehaviour';
  import { Item, BlockItem, CreativeModeTab, ItemStack, ArmorMaterial } from 'net.minecraft.world.item';
  import { Properties as item_Properties } from 'Item';
  import { DisplayItemsGenerator } from 'CreativeModeTab';
  import { DataComponentType } from 'net.minecraft.core.component';
  import { Builder } from 'DataComponentType';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { MobEffect } from 'net.minecraft.world.effect';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { Potion } from 'net.minecraft.world.item.alchemy';
  import { Builder as entitytype_Builder } from 'EntityType';
  import { BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { Builder as blockentitytype_Builder } from 'BlockEntityType';
  import { MenuType, AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { MenuSupplier } from 'MenuType';
  import { PoiType } from 'net.minecraft.world.entity.ai.village.poi';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { ArgumentTypeInfo } from 'net.minecraft.commands.synchronization';
  import { Class, Integer } from 'java.lang';
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { Template } from 'ArgumentTypeInfo';
  import { RecipeType, Recipe, Ingredient } from 'net.minecraft.world.item.crafting';
  import { GameEvent } from 'net.minecraft.world.level.gameevent';
  import { SimpleParticleType, ParticleType, ParticleOptions } from 'net.minecraft.core.particles';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Attribute } from 'net.minecraft.world.entity.ai.attributes';
  import { Sentiment } from 'Attribute';
  import { EntityDataSerializer } from 'net.minecraft.network.syncher';
  import { Type } from 'ArmorItem';
  import { TrimMaterial } from 'net.minecraft.world.item.armortrim';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';
  import { MutableComponent } from 'net.minecraft.network.chat';

  class ExtendedMenuSupplier<T extends AbstractContainerMenu = any> {
    create(var1: number, var2: Inventory, var3: RegistryFriendlyByteBuf): T;
  }


  class LookupHelper {
    static lookup<T>(entity: Entity, registryKey: ResourceKey<Registry<T>>, resourceKey: ResourceKey<T>): Holder<T>;
    static lookup<T>(levelReader: LevelReader, registryKey: ResourceKey<Registry<T>>, resourceKey: ResourceKey<T>): Holder<T>;
    static lookup<T>(registries: Provider, registryKey: ResourceKey<Registry<T>>, resourceKey: ResourceKey<T>): Holder<T>;
    static lookupDamageType(entity: Entity, resourceKey: ResourceKey<DamageType>): Holder<DamageType>;
    static lookupDamageType(levelReader: LevelReader, resourceKey: ResourceKey<DamageType>): Holder<DamageType>;
    static lookupDamageType(registries: Provider, resourceKey: ResourceKey<DamageType>): Holder<DamageType>;
    static lookupEnchantment(entity: Entity, resourceKey: ResourceKey<Enchantment>): Holder<Enchantment>;
    static lookupEnchantment(levelReader: LevelReader, resourceKey: ResourceKey<Enchantment>): Holder<Enchantment>;
    static lookupEnchantment(registries: Provider, resourceKey: ResourceKey<Enchantment>): Holder<Enchantment>;
  }


  class RegistryFactory {
    static readonly INSTANCE: RegistryFactory;
    create<T>(registryKey: ResourceKey<Registry<T>>): Registry<T>;
    create<T>(var1: ResourceKey<Registry<T>>, var2: boolean): Registry<T>;
    create<T>(registryKey: ResourceKey<Registry<T>>, defaultKey: string): Registry<T>;
    create<T>(registryKey: ResourceKey<Registry<T>>, defaultKey: string, synced: boolean): Registry<T>;
    create<T>(var1: ResourceKey<Registry<T>>, var2: ResourceLocation, var3: boolean): Registry<T>;
    register<T>(var1: Registry<T>): Registry<T>;
  }


  class RegistryHelper {
    static findBuiltInRegistry<T>(registryKey: ResourceKey<Registry<T>>): Registry<T>;
    static findGameRegistry<T>(registryKey: ResourceKey<Registry<T>>): Registry<T>;
    static findNullableBuiltInRegistry<T>(registryKey: ResourceKey<Registry<T>>): Registry<T>;
    static findNullableGameRegistry<T>(registryKey: ResourceKey<Registry<T>>): Registry<T>;
    static getBuiltInRegistryHolder<T>(object: T): Reference<T>;
    static getHolderOrThrow<T>(registryKey: ResourceKey<Registry<T>>, object: T): Reference<T>;
    static getHolderOrThrow<T>(registry: Registry<T>, object: T): Reference<T>;
    static getHolderReference<T>(registryKey: ResourceKey<Registry<T>>, object: T): Optional<Reference<T>>;
    static getHolderReference<T>(registry: Registry<T>, object: T): Optional<Reference<T>>;
    static getResourceKey<T>(registryKey: ResourceKey<Registry<T>>, object: T): Optional<ResourceKey<T>>;
    static getResourceKey<T>(registry: Registry<T>, object: T): Optional<ResourceKey<T>>;
    static getResourceKeyOrThrow<T>(registryKey: ResourceKey<Registry<T>>, object: T): ResourceKey<T>;
    static getResourceKeyOrThrow<T>(registry: Registry<T>, object: T): ResourceKey<T>;
    static is<T>(tagKey: TagKey<T>, object: T): boolean;
    static wrapAsHolder<T>(registryKey: ResourceKey<Registry<T>>, object: T): Holder<T>;
  }


  interface RegistryManager extends EnvironmentAwareBuilder<RegistryManager> {}
  class RegistryManager extends EnvironmentAwareBuilder<RegistryManager> {
    static from(modId: string): RegistryManager;
    makeDescriptionId(registryKey: ResourceKey<Registry<any>>, path: string): string;
    makeKey(var1: string): ResourceLocation;
    makeResourceKey<T>(registryKey: ResourceKey<Registry<T>>, path: string): ResourceKey<T>;
    register<T>(var1: ResourceKey<Registry<T>>, var2: string, var3: Supplier<T>): Reference<T>;
    registerArgumentType<A extends ArgumentType<any>>(path: string, argumentClass: Class<A>, argumentType: Supplier<A>): Reference<ArgumentTypeInfo<any, any>>;
    registerArgumentType<A extends ArgumentType<any>, T extends Template<A>>(var1: string, var2: Class<A>, var3: ArgumentTypeInfo<A, T>): Reference<ArgumentTypeInfo<any, any>>;
    registerArmorMaterial(path: string, repairItem: Holder<Item>): Reference<ArmorMaterial>;
    registerArmorMaterial(path: string, defense: Map<Type, number>, enchantmentValue: number, repairItem: Holder<Item>): Reference<ArmorMaterial>;
    registerArmorMaterial(path: string, defense: Map<Type, number>, enchantmentValue: number, equipSound: Holder<SoundEvent>, repairIngredient: Supplier<Ingredient>, toughness: number, knockbackResistance: number): Reference<ArmorMaterial>;
    registerAttribute(path: string, defaultValue: number, minValue: number, maxValue: number): Reference<Attribute>;
    registerAttribute(path: string, defaultValue: number, minValue: number, maxValue: number, syncable: boolean, sentiment: Sentiment): Reference<Attribute>;
    registerBlock(path: string, factory: Function<Properties, Block>, blockPropertiesSupplier: Supplier<Properties>): Reference<Block>;
    registerBlock(path: string, entry: Supplier<Block>): Reference<Block>;
    registerBlockEntityType<T extends BlockEntity>(path: string, entry: Supplier<blockentitytype_Builder<T>>): Reference<BlockEntityType<T>>;
    registerBlockItem(block: Holder<Block>): Reference<Item>;
    registerBlockItem(block: Holder<Block>, itemPropertiesSupplier: Supplier<item_Properties>): Reference<Item>;
    registerBlockItem(block: Holder<Block>, itemFactory: BiFunction<Block, item_Properties, BlockItem>): Reference<Item>;
    registerBlockItem(block: Holder<Block>, factory: BiFunction<Block, item_Properties, BlockItem>, itemPropertiesSupplier: Supplier<item_Properties>): Reference<Item>;
    registerBlockItem(blockReference: Holder<Block>, itemProperties: item_Properties): Reference<Item>;
    registerCreativeModeTab(iconHolder: Holder<ItemLike>): Reference<CreativeModeTab>;
    registerCreativeModeTab(iconSupplier: Supplier<ItemStack>): Reference<CreativeModeTab>;
    registerCreativeModeTab(iconSupplier: Supplier<ItemStack>, displayItems: DisplayItemsGenerator): Reference<CreativeModeTab>;
    registerCreativeModeTab(var1: string, var2: Supplier<ItemStack>, var3: DisplayItemsGenerator, var4: boolean): Reference<CreativeModeTab>;
    registerDamageType(path: string): ResourceKey<DamageType>;
    registerDataComponentType<T>(path: string, entry: UnaryOperator<Builder<T>>): Reference<DataComponentType<T>>;
    registerEnchantment(path: string): ResourceKey<Enchantment>;
    registerEntityDataSerializer<T>(var1: string, var2: Supplier<EntityDataSerializer<T>>): Reference<EntityDataSerializer<T>>;
    registerEntityType<T extends Entity>(path: string, entry: Supplier<entitytype_Builder<T>>): Reference<EntityType<T>>;
    registerExtendedMenuType<T extends AbstractContainerMenu>(var1: string, var2: Supplier<ExtendedMenuSupplier<T>>): Reference<MenuType<T>>;
    registerFluid(path: string, entry: Supplier<Fluid>): Reference<Fluid>;
    registerGameEvent(path: string, notificationRadius: number): Reference<GameEvent>;
    registerItem(path: string): Reference<Item>;
    registerItem(path: string, factory: Function<item_Properties, Item>): Reference<Item>;
    registerItem(path: string, factory: Function<item_Properties, Item>, itemPropertiesSupplier: Supplier<item_Properties>): Reference<Item>;
    registerItem(path: string, entry: Supplier<Item>): Reference<Item>;
    registerLazily<T>(var1: ResourceKey<Registry<T>>, var2: string): Reference<T>;
    registerLootTable(path: string): ResourceKey<LootTable>;
    registerMenuType<T extends AbstractContainerMenu>(path: string, entry: Supplier<MenuSupplier<T>>): Reference<MenuType<T>>;
    registerMobEffect(path: string, entry: Supplier<MobEffect>): Reference<MobEffect>;
    registerParticleType(path: string): Reference<SimpleParticleType>;
    registerParticleType<T extends ParticleOptions>(path: string, overrideLimiter: boolean, codecGetter: Function<ParticleType<T>, MapCodec<T>>, streamCodecGetter: Function<ParticleType<T>, StreamCodec<RegistryFriendlyByteBuf, T>>): Reference<ParticleType<T>>;
    registerPoiType(path: string, block: Holder<Block>): Reference<PoiType>;
    registerPoiType(path: string, block: Supplier<Block>): Reference<PoiType>;
    registerPoiType(var1: string, var2: Supplier<Set<BlockState>>, var3: number, var4: number): Reference<PoiType>;
    registerPotion(path: string, entry: Supplier<Potion>): Reference<Potion>;
    registerRecipeType<T extends Recipe<any>>(path: string): Reference<RecipeType<T>>;
    registerSimpleBlock(path: string, blockPropertiesSupplier: Supplier<Properties>): Reference<Block>;
    registerSimpleItem(path: string, itemPropertiesSupplier: Supplier<item_Properties>): Reference<Item>;
    registerSoundEvent(path: string): Reference<SoundEvent>;
    registerSpawnEggItem(entityTypeReference: Holder<EntityType<Mob>>, backgroundColor: number, highlightColor: number): Reference<Item>;
    registerSpawnEggItem(var1: Holder<EntityType<Mob>>, var2: number, var3: number, var4: item_Properties): Reference<Item>;
    registerTrimMaterial(path: string): ResourceKey<TrimMaterial>;
  }


  class ResourceKeyHelper {
    static getComponent(resourceKey: ResourceKey<any>): MutableComponent;
    static getComponent(registryKey: ResourceKey<Registry<any>>, resourceLocation: ResourceLocation): MutableComponent;
    static getTranslationKey(resourceKey: ResourceKey<any>): string;
    static getTranslationKey(registryKey: ResourceKey<Registry<any>>, resourceLocation: ResourceLocation): string;
  }

}

declare module 'fuzs.puzzleslib.api.init.v3.tags' {
  import { TagKey } from 'net.minecraft.tags';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { Registry } from 'net.minecraft.core';
  import { Block } from 'net.minecraft.world.level.block';
  import { Item } from 'net.minecraft.world.item';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { EntityType } from 'net.minecraft.world.entity';
  import { Enchantment } from 'net.minecraft.world.item.enchantment';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { GameEvent } from 'net.minecraft.world.level.gameevent';
  import { DamageType } from 'net.minecraft.world.damagesource';

  class BoundTagFactory {
    static readonly MINECRAFT: BoundTagFactory;
    static readonly COMMON: BoundTagFactory;
    static readonly FABRIC: BoundTagFactory;
    static readonly FORGE: BoundTagFactory;
    static readonly CURIOS: BoundTagFactory;
    static readonly TRINKETS: BoundTagFactory;
    static make(namespace: string): BoundTagFactory;
    registerBiomeTag(path: string): TagKey<Biome>;
    registerBlockTag(path: string): TagKey<Block>;
    registerDamageTypeTag(path: string): TagKey<DamageType>;
    registerEnchantmentTag(path: string): TagKey<Enchantment>;
    registerEntityTypeTag(path: string): TagKey<EntityType<any>>;
    registerFluidTag(path: string): TagKey<Fluid>;
    registerGameEventTag(path: string): TagKey<GameEvent>;
    registerItemTag(path: string): TagKey<Item>;
    registerTagKey<T>(registryKey: ResourceKey<Registry<T>>, path: string): TagKey<T>;
  }


  class TagFactory {
    static readonly MINECRAFT: TagFactory;
    static readonly COMMON: TagFactory;
    static readonly FABRIC: TagFactory;
    static readonly NEOFORGE: TagFactory;
    static readonly FORGE: TagFactory;
    static readonly CURIOS: TagFactory;
    static readonly TRINKETS: TagFactory;
    static make(modId: string): TagFactory;
    modId(): string;
    registerBiomeTag(path: string): TagKey<Biome>;
    registerBlockTag(path: string): TagKey<Block>;
    registerDamageTypeTag(path: string): TagKey<DamageType>;
    registerEnchantmentTag(path: string): TagKey<Enchantment>;
    registerEntityTypeTag(path: string): TagKey<EntityType<any>>;
    registerFluidTag(path: string): TagKey<Fluid>;
    registerGameEventTag(path: string): TagKey<GameEvent>;
    registerItemTag(path: string): TagKey<Item>;
    registerTagKey<T>(registryKey: ResourceKey<Registry<T>>, path: string): TagKey<T>;
  }


  class TypedTagFactory<T = any> {
    static readonly BLOCK: TypedTagFactory;
    static readonly ITEM: TypedTagFactory;
    static readonly FLUID: TypedTagFactory;
    static readonly ENTITY_TYPE: TypedTagFactory;
    static readonly ENCHANTMENT: TypedTagFactory;
    static readonly BIOME: TypedTagFactory;
    static readonly GAME_EVENT: TypedTagFactory;
    static readonly DAMAGE_TYPE: TypedTagFactory;
    common(path: string): TagKey<T>;
    curios(path: string): TagKey<T>;
    fabric(path: string): TagKey<T>;
    forge(path: string): TagKey<T>;
    static make<T>(registryKey: ResourceKey<Registry<T>>): TypedTagFactory<T>;
    make(namespace: string, path: string): TagKey<T>;
    make(resourceLocation: ResourceLocation): TagKey<T>;
    minecraft(path: string): TagKey<T>;
    trinkets(path: string): TagKey<T>;
  }

}

declare module 'fuzs.puzzleslib.api.item.v2.crafting' {
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { ItemLike } from 'net.minecraft.world.level';
  import { DataComponentPatch } from 'net.minecraft.core.component';
  import { ItemStack } from 'net.minecraft.world.item';

  class CombinedIngredients {
    static readonly INSTANCE: CombinedIngredients;
    all(...var1: Ingredient[]): Ingredient;
    any(...var1: Ingredient[]): Ingredient;
    components(item: ItemLike, components: DataComponentPatch): Ingredient;
    components(var1: ItemStack): Ingredient;
    difference(var1: Ingredient, var2: Ingredient): Ingredient;
  }

}

declare module 'fuzs.puzzleslib.api.item.v2' {
  import { Holder } from 'net.minecraft.core';
  import { ItemLike } from 'net.minecraft.world.level';
  import { Supplier, Consumer } from 'java.util.function';
  import { ItemStack, Tier, Item } from 'net.minecraft.world.item';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { DisplayItemsGenerator } from 'CreativeModeTab';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { TagKey } from 'net.minecraft.tags';
  import { Block } from 'net.minecraft.world.level.block';
  import { Map } from 'java.util';
  import { Type } from 'ArmorItem';
  import { Integer } from 'java.lang';
  import { LivingEntity, EquipmentSlot } from 'net.minecraft.world.entity';
  import { InteractionHand } from 'net.minecraft.world';
  import { ServerLevel, ServerPlayer } from 'net.minecraft.server.level';

  class CreativeModeTabConfigurator {
    appendEnchantmentsAndPotions(): CreativeModeTabConfigurator;
    displayItems(var1: DisplayItemsGenerator): CreativeModeTabConfigurator;
    static from(modId: string, icon: Holder<ItemLike>): CreativeModeTabConfigurator;
    static from(modId: string, icon: Supplier<ItemStack>): CreativeModeTabConfigurator;
    static from(modId: string): CreativeModeTabConfigurator;
    static from(modId: string, tabId: string): CreativeModeTabConfigurator;
    static from(resourceLocation: ResourceLocation): CreativeModeTabConfigurator;
    icon(icon: Holder<ItemLike>): CreativeModeTabConfigurator;
    icon(var1: Supplier<ItemStack>): CreativeModeTabConfigurator;
    icons(var1: Supplier<ItemStack[]>): CreativeModeTabConfigurator;
    withSearchBar(): CreativeModeTabConfigurator;
  }


  class ItemEquipmentFactories {
    static getVanillaMiningLevelBlockTag(miningLevel: number): TagKey<Block>;
    static registerTier(miningLevel: number, itemDurability: number, miningSpeed: number, attackDamageBonus: number, enchantability: number, repairIngredient: Supplier<Ingredient>): Tier;
    static registerTier(incorrectBlocksForDrops: TagKey<Block>, itemDurability: number, miningSpeed: number, attackDamageBonus: number, enchantability: number, repairIngredient: Supplier<Ingredient>): Tier;
    static toArmorTypeMap(...protectionAmounts: number[]): Map<Type, number>;
    static toArmorTypeMapWithFallback(protectionAmountFallback: number, ...protectionAmounts: number[]): Map<Type, number>;
  }


  class ItemHelper {
    static hurtAndBreak(itemStack: ItemStack, amount: number, entity: LivingEntity, interactionHand: InteractionHand): void;
    static hurtAndBreak(itemStack: ItemStack, amount: number, entity: LivingEntity, slot: EquipmentSlot): void;
    static hurtAndBreak(itemStack: ItemStack, amount: number, level: ServerLevel, serverPlayer: ServerPlayer, onBreak: Consumer<Item>, item: T): void;
  }


  class ToolTypeHelper {
    static readonly INSTANCE: ToolTypeHelper;
    isArmor(itemStack: ItemStack): boolean;
    isAxe(itemStack: ItemStack): boolean;
    isBodyArmor(itemStack: ItemStack): boolean;
    isBow(itemStack: ItemStack): boolean;
    isBrush(itemStack: ItemStack): boolean;
    isChestArmor(itemStack: ItemStack): boolean;
    isCrossbow(itemStack: ItemStack): boolean;
    isFishingRod(itemStack: ItemStack): boolean;
    isFootArmor(itemStack: ItemStack): boolean;
    isHeadArmor(itemStack: ItemStack): boolean;
    isHoe(itemStack: ItemStack): boolean;
    isLegArmor(itemStack: ItemStack): boolean;
    isMace(itemStack: ItemStack): boolean;
    isMeleeWeapon(itemStack: ItemStack): boolean;
    isMiningTool(itemStack: ItemStack): boolean;
    isPickaxe(itemStack: ItemStack): boolean;
    isRangedWeapon(itemStack: ItemStack): boolean;
    isShears(itemStack: ItemStack): boolean;
    isShield(itemStack: ItemStack): boolean;
    isShovel(itemStack: ItemStack): boolean;
    isSword(itemStack: ItemStack): boolean;
    isTool(itemStack: ItemStack): boolean;
    isTridentLike(itemStack: ItemStack): boolean;
    isWeapon(itemStack: ItemStack): boolean;
  }

}

declare module 'fuzs.puzzleslib.api.network.v2' {
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { MessageHandler } from 'fuzs.puzzleslib.api.network.v2.MessageV2';
  import { ClientboundMessage, ServerboundMessage } from 'fuzs.puzzleslib.api.network.v3';

  class MessageV2<T extends MessageV2<T> = any> {
    makeHandler(): MessageHandler<T>;
    read(var1: FriendlyByteBuf): void;
    toClientboundMessage(): ClientboundMessage<T>;
    toServerboundMessage(): ServerboundMessage<T>;
    write(var1: FriendlyByteBuf): void;
  }


  interface WritableMessage<T extends MessageV2<T> = any> extends MessageV2<T> {}
  class WritableMessage<T extends MessageV2<T> = any> extends MessageV2<T> {
    read(friendlyByteBuf: FriendlyByteBuf): void;
  }

}

declare module 'fuzs.puzzleslib.api.network.v2.MessageV2' {
  import { Player } from 'net.minecraft.world.entity.player';

  class MessageHandler<T extends MessageV2<T> = any> {
    handle(var1: T, var2: Player, var3: any): void;
  }

}

declare module 'fuzs.puzzleslib.api.network.v3' {
  import { Minecraft } from 'net.minecraft.client';
  import { ClientPacketListener, ClientLevel } from 'net.minecraft.client.multiplayer';
  import { LocalPlayer } from 'net.minecraft.client.player';
  import { Builder } from 'fuzs.puzzleslib.api.network.v3.NetworkHandler';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Packet } from 'net.minecraft.network.protocol';
  import { ClientCommonPacketListener, ServerCommonPacketListener } from 'net.minecraft.network.protocol.common';
  import { ServerPlayer, ServerLevel } from 'net.minecraft.server.level';
  import { MinecraftServer } from 'net.minecraft.server';
  import { Collection } from 'java.util';
  import { Vec3i } from 'net.minecraft.core';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { LevelChunk } from 'net.minecraft.world.level.chunk';
  import { ChunkPos } from 'net.minecraft.world.level';
  import { Entity } from 'net.minecraft.world.entity';
  import { Type } from 'CustomPacketPayload';
  import { ServerGamePacketListenerImpl } from 'net.minecraft.server.network';

  interface ClientboundMessage<T = any> extends MessageV3<T, ClientMessageListener> {}
  class ClientboundMessage<T = any> extends MessageV3<T, ClientMessageListener> {
  }


  class ClientMessageListener<T = any> {
    handle(var1: T, var2: Minecraft, var3: ClientPacketListener, var4: LocalPlayer, var5: ClientLevel): void;
  }


  class MessageV3<T = any, H = any> {
    get handler(): H;
    unwrap(): T;
  }


  class NetworkHandler {
    static builder(modId: string): Builder;
    static builder(channelName: ResourceLocation): Builder;
    sendMessage<T>(var1: PlayerSet, var2: ClientboundMessage<T>): void;
    sendMessage<T>(var1: ServerboundMessage<T>): void;
    sendTo<T>(player: ServerPlayer, message: ClientboundMessage<T>): void;
    sendToAll<T>(server: MinecraftServer, message: ClientboundMessage<T>): void;
    sendToAll<T>(server: MinecraftServer, excludePlayer: ServerPlayer, message: ClientboundMessage<T>): void;
    sendToAll<T>(playerList: Collection<ServerPlayer>, excludePlayer: ServerPlayer, message: ClientboundMessage<T>): void;
    sendToAll<T>(level: ServerLevel, message: ClientboundMessage<T>): void;
    sendToAllNear<T>(pos: Vec3i, level: ServerLevel, message: ClientboundMessage<T>): void;
    sendToAllNear<T>(posX: number, posY: number, posZ: number, level: ServerLevel, message: ClientboundMessage<T>): void;
    sendToAllNear<T>(excludePlayer: ServerPlayer, posX: number, posY: number, posZ: number, distance: number, level: ServerLevel, message: ClientboundMessage<T>): void;
    sendToAllTracking<T>(blockEntity: BlockEntity, message: ClientboundMessage<T>): void;
    sendToAllTracking<T>(chunk: LevelChunk, message: ClientboundMessage<T>): void;
    sendToAllTracking<T>(level: ServerLevel, chunkPos: ChunkPos, message: ClientboundMessage<T>): void;
    sendToAllTracking<T>(entity: Entity, message: ClientboundMessage<T>, includeSelf: boolean): void;
    sendToServer<T>(message: ServerboundMessage<T>): void;
    toClientboundPacket<T>(var1: ClientboundMessage<T>): Packet<ClientCommonPacketListener>;
    toServerboundPacket<T>(var1: ServerboundMessage<T>): Packet<ServerCommonPacketListener>;
  }


  class PlayerSet {
    broadcast(var1: Type<any>, var2: Packet<any>): void;
    static inLevel(serverLevel: ServerLevel): PlayerSet;
    static nearBlockEntity(blockEntity: BlockEntity): PlayerSet;
    static nearChunk(levelChunk: LevelChunk): PlayerSet;
    static nearChunk(serverLevel: ServerLevel, chunkPos: ChunkPos): PlayerSet;
    static nearEntity(entity: Entity): PlayerSet;
    static nearPlayer(serverPlayer: ServerPlayer): PlayerSet;
    static nearPosition(position: Vec3i, serverLevel: ServerLevel): PlayerSet;
    static nearPosition(posX: number, posY: number, posZ: number, serverLevel: ServerLevel): PlayerSet;
    static nearPosition(excludePlayer: ServerPlayer, posX: number, posY: number, posZ: number, distance: number, serverLevel: ServerLevel): PlayerSet;
    static ofAll(minecraftServer: MinecraftServer): PlayerSet;
    static ofEntity(entity: Entity): PlayerSet;
    static ofNone(): PlayerSet;
    static ofOthers(serverPlayer: ServerPlayer): PlayerSet;
    static ofPlayer(serverPlayer: ServerPlayer): PlayerSet;
  }


  interface ServerboundMessage<T = any> extends MessageV3<T, ServerMessageListener> {}
  class ServerboundMessage<T = any> extends MessageV3<T, ServerMessageListener> {
  }


  class ServerMessageListener<T = any> {
    handle(var1: T, var2: MinecraftServer, var3: ServerGamePacketListenerImpl, var4: ServerPlayer, var5: ServerLevel): void;
  }

}

declare module 'fuzs.puzzleslib.api.network.v3.codec' {
  import { StreamCodec, StreamEncoder, StreamDecoder } from 'net.minecraft.network.codec';
  import { ByteBuf } from 'io.netty.buffer';
  import { Class, Enum } from 'java.lang';
  import { ToIntFunction, Function } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Registry } from 'net.minecraft.core';
  import { Type } from 'java.lang.reflect';

  class ExtraStreamCodecs {
    static readonly CHAR: StreamCodec;
    static readonly DATE: StreamCodec;
    static readonly INSTANT: StreamCodec;
    static readonly CHUNK_POS: StreamCodec;
    static readonly BLOCK_HIT_RESULT: StreamCodec;
    static readonly BIT_SET: StreamCodec;
    static readonly DIRECT_RESOURCE_KEY: StreamCodec;
    static readonly VEC3: StreamCodec;
    static readonly VECTOR3F: StreamCodec;
    static readonly FRIENDLY_BYTE_BUF: StreamCodec;
    static readonly REGISTRY_FRIENDLY_BYTE_BUF: StreamCodec;
    static fromEnum<E extends Enum<E>>(clazz: Class<E>): StreamCodec<ByteBuf, E>;
    static fromEnum<E extends Enum<E>>(clazz: Class<E>, keyExtractor: ToIntFunction<E>): StreamCodec<ByteBuf, E>;
    static readComponent(buf: FriendlyByteBuf): Component;
    static readItem(buf: FriendlyByteBuf): ItemStack;
    static writeComponent(buf: FriendlyByteBuf, component: Component): void;
    static writeItem(buf: FriendlyByteBuf, itemStack: ItemStack): void;
  }


  class StreamCodecRegistry<T extends StreamCodecRegistry<T> = any> {
    registerContainerProvider<B extends ByteBuf, V>(var1: Class<V>, var2: Function<Type[], StreamCodec<B, V>>): T;
    registerSerializer<B extends ByteBuf, V>(type: Class<V>, encoder: StreamEncoder<B, V>, decoder: StreamDecoder<B, V>): T;
    registerSerializer<V>(type: Class<V>, resourceKey: ResourceKey<Registry<V>>): T;
    registerSerializer<B extends ByteBuf, V>(var1: Class<V>, var2: StreamCodec<B, V>): T;
  }

}

declare module 'fuzs.puzzleslib.api.network.v3.NetworkHandler' {
  import { NetworkHandlerRegistry } from 'fuzs.puzzleslib.impl.network';
  import { StreamCodecRegistry } from 'fuzs.puzzleslib.api.network.v3.codec';
  import { Buildable } from 'fuzs.puzzleslib.api.core.v1.utility';
  import { Class } from 'java.lang';
  import { StreamCodec, StreamDecoder } from 'net.minecraft.network.codec';
  import { ByteBuf } from 'io.netty.buffer';
  import { Function, Supplier } from 'java.util.function';
  import { Type } from 'java.lang.reflect';
  import { Record } from 'fuzs.puzzleslib.api.network.v3';
  import { MessageV2 } from 'fuzs.puzzleslib.api.network.v2';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  interface Builder extends NetworkHandlerRegistry, StreamCodecRegistry<Builder>, Buildable {}
  class Builder extends NetworkHandlerRegistry {
    optional(): Builder;
    registerClientbound<T extends Record>(var1: Class<T>): Builder;
    registerContainerProvider<B extends ByteBuf, V>(type: Class<V>, factory: Function<Type[], StreamCodec<B, V>>): Builder;
    registerLegacyClientbound<T extends MessageV2<T>>(clazz: Class<T>, factory: Supplier<T>): Builder;
    registerLegacyClientbound<T extends MessageV2<T>>(var1: Class<T>, var2: StreamDecoder<FriendlyByteBuf, T>): Builder;
    registerLegacyServerbound<T extends MessageV2<T>>(clazz: Class<T>, factory: Supplier<T>): Builder;
    registerLegacyServerbound<T extends MessageV2<T>>(var1: Class<T>, var2: StreamDecoder<FriendlyByteBuf, T>): Builder;
    registerSerializer<B extends ByteBuf, V>(type: Class<V>, streamCodec: StreamCodec<B, V>): Builder;
    registerServerbound<T extends Record>(var1: Class<T>): Builder;
  }

}

declare module 'fuzs.puzzleslib.api.resources.v1' {
  import { PackResources, PackType, PackLocationInfo } from 'net.minecraft.server.packs';
  import { IoSupplier } from 'net.minecraft.server.packs.resources';
  import { InputStream } from 'java.io';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ResourceOutput } from 'PackResources';
  import { Set, Map } from 'java.util';
  import { MetadataSectionSerializer } from 'net.minecraft.server.packs.metadata';
  import { Pack, RepositorySource, PackCompatibility } from 'net.minecraft.server.packs.repository';
  import { Supplier } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';
  import { Position, Metadata } from 'Pack';
  import { FeatureFlagSet } from 'net.minecraft.world.flag';
  import { Factory } from 'fuzs.puzzleslib.api.data.v2.core.DataProviderContext';

  interface AbstractModPackResources extends PackResources {}
  class AbstractModPackResources extends PackResources {
    constructor();

    constructor(modLogoPath: string);
    static buildPack(packType: PackType, id: ResourceLocation, factory: Supplier<AbstractModPackResources>, title: Component, description: Component, required: boolean, position: Position, fixedPosition: boolean, hidden: boolean, features: FeatureFlagSet): Pack;
    close(): void;
    get namespace(): string;
    getMetadataSection<T>(deserializer: MetadataSectionSerializer<T>): T;
    getNamespaces(type: PackType): Set<string>;
    getResource(packType: PackType, location: ResourceLocation): IoSupplier<InputStream>;
    getRootResource(...elements: string[]): IoSupplier<InputStream>;
    listResources(packType: PackType, namespace: string, path: string, resourceOutput: ResourceOutput): void;
    location(): PackLocationInfo;
  }


  interface DynamicPackResources extends AbstractModPackResources {}
  class DynamicPackResources extends AbstractModPackResources {
    static readonly PATHS_FOR_TYPE: Map;
    static create(...factories: Factory[]): Supplier<AbstractModPackResources>;
    static generatePathsFromProviders(modId: string, ...factories: Factory[]): Map<PackType, Map<ResourceLocation, IoSupplier<InputStream>>>;
    getNamespaces(packType: PackType): Set<string>;
    getResource(packType: PackType, location: ResourceLocation): IoSupplier<InputStream>;
    listResources(packType: PackType, namespace: string, path: string, resourceOutput: ResourceOutput): void;
  }


  class PackResourcesHelper {
    static buildClientPack(id: ResourceLocation, factory: Supplier<AbstractModPackResources>, hidden: boolean): RepositorySource;
    static buildClientPack(id: ResourceLocation, factory: Supplier<AbstractModPackResources>, required: boolean, position: Position, fixedPosition: boolean, hidden: boolean): RepositorySource;
    static buildClientPack(id: ResourceLocation, factory: Supplier<AbstractModPackResources>, title: Component, description: Component, required: boolean, position: Position, fixedPosition: boolean, hidden: boolean): RepositorySource;
    static buildServerPack(id: ResourceLocation, factory: Supplier<AbstractModPackResources>, hidden: boolean): RepositorySource;
    static buildServerPack(id: ResourceLocation, factory: Supplier<AbstractModPackResources>, required: boolean, position: Position, fixedPosition: boolean, hidden: boolean): RepositorySource;
    static buildServerPack(id: ResourceLocation, factory: Supplier<AbstractModPackResources>, title: Component, description: Component, required: boolean, position: Position, fixedPosition: boolean, hidden: boolean): RepositorySource;
    static createPackInfo(resourceLocation: ResourceLocation, descriptionComponent: Component, packCompatibility: PackCompatibility, featureFlagSet: FeatureFlagSet, hidden: boolean): Metadata;
    static getBuiltInPack(resourceLocation: ResourceLocation, packType: PackType): ResourceLocation;
    static getPackDescription(modId: string): Component;
    static getPackTitle(packType: PackType): Component;
  }

}

declare module 'fuzs.puzzleslib.api.shape.v1' {
  import { Map } from 'java.util';
  import { Direction } from 'net.minecraft.core';
  import { VoxelShape } from 'net.minecraft.world.phys.shapes';
  import { Quaternionf, Vector3d } from 'org.joml';

  class ShapesHelper {
    static box(startX: number, startY: number, startZ: number, endX: number, endY: number, endZ: number): VoxelShape;
    static getHorizontalRotation(direction: Direction): Quaternionf;
    static rotate(voxelShape: VoxelShape): Map<Direction, VoxelShape>;
    static rotate(direction: Direction, voxelShape: VoxelShape): VoxelShape;
    static rotate(direction: Direction, voxelShape: VoxelShape, originOffset: Vector3d): VoxelShape;
    static rotate(rotation: Quaternionf, voxelShape: VoxelShape): VoxelShape;
    static rotate(rotation: Quaternionf, voxelShape: VoxelShape, originOffset: Vector3d): VoxelShape;
    static rotateHorizontally(voxelShape: VoxelShape): Map<Direction, VoxelShape>;
  }

}

declare module 'fuzs.puzzleslib.impl.attachment' {
  import { ResourceLocation } from 'net.minecraft.resources';

  class AttachmentTypeAdapter<T = any, A = any> {
    getData(var1: T): A;
    hasData(var1: T): boolean;
    removeData(var1: T): A;
    resourceLocation(): ResourceLocation;
    setData(var1: T, var2: A): A;
  }

}

declare module 'fuzs.puzzleslib.impl.attachment.builder' {
  import { Builder, EntityBuilder } from 'fuzs.puzzleslib.api.attachment.v4.DataAttachmentRegistry';
  import { Codec } from 'com.mojang.serialization';
  import { BiConsumer, Function } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { AttachmentTypeAdapter, ClientboundEntityDataAttachmentMessage } from 'fuzs.puzzleslib.impl.attachment';
  import { Entity } from 'net.minecraft.world.entity';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { PlayerSet } from 'fuzs.puzzleslib.api.network.v3';
  import { Type } from 'CustomPacketPayload';

  interface DataAttachmentBuilder<T = any, A = any> extends Builder<T, A> {}
  class DataAttachmentBuilder<T = any, A = any> extends Builder<T, A> {
    defaultValue(defaultValue: A): Builder<T, A>;
    getSynchronizer(resourceLocation: ResourceLocation, attachmentType: AttachmentTypeAdapter<T, A>): BiConsumer<T, A>;
    persistent(codec: Codec<A>): Builder<T, A>;
  }


  interface EntityDataAttachmentBuilder<V = any> extends EntityBuilder<V> {}
  class EntityDataAttachmentBuilder<V = any> extends EntityBuilder<V> {
    getSynchronizer(resourceLocation: ResourceLocation, attachmentType: AttachmentTypeAdapter<Entity, V>, streamCodec: StreamCodec<RegistryFriendlyByteBuf, V>, synchronizationTargets: Function<Entity, PlayerSet>): BiConsumer<Entity, V>;
    registerPayloadHandlers(var1: ResourceLocation, var2: AttachmentTypeAdapter<Entity, V>, var3: Type<ClientboundEntityDataAttachmentMessage<V>>, var4: StreamCodec<RegistryFriendlyByteBuf, V>): void;
  }

}

declare module 'fuzs.puzzleslib.impl.capability' {
  import { CapabilityKey, CapabilityComponent } from 'fuzs.puzzleslib.api.capability.v3.data';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Class } from 'java.lang';

  class GlobalCapabilityRegister {
    static get(identifier: ResourceLocation): CapabilityKey<any, any>;
    static register<T, C extends CapabilityComponent<T>>(capabilityKey: CapabilityKey<T, C>): void;
    static testHolderType(holderType: Class<any>): void;
  }

}

declare module 'fuzs.puzzleslib.impl.chat' {
  import { StyledContentConsumer } from 'FormattedText';
  import { Unit, FormattedCharSink, FormattedCharSequence } from 'net.minecraft.util';
  import { FormattedText, Style, Component } from 'net.minecraft.network.chat';
  import { Optional, List } from 'java.util';
  import { ChatFormatting } from 'net.minecraft';

  interface FormattedContentSink extends StyledContentConsumer<Unit>, FormattedCharSink {}
  class FormattedContentSink extends StyledContentConsumer<Unit> {
    constructor(formattedText: FormattedText);

    constructor(formattedCharSequence: FormattedCharSequence);
    accept(style: Style, string: string): Optional<Unit>;
    accept(width: number, style: Style, codePoint: number): boolean;
    get component(): Component;
    get string(): string;
    getFormatFromStyle(style: Style): ChatFormatting[];
    getStringFormatFromStyle(style: Style): string;
  }

}

declare module 'fuzs.puzzleslib.impl.client.core' {
  import { ClientModConstructor } from 'fuzs.puzzleslib.api.client.core.v1';
  import { Set } from 'java.util';
  import { ContentRegistrationFlags } from 'fuzs.puzzleslib.api.core.v1';
  import { ItemDisplayOverridesImpl } from 'fuzs.puzzleslib.impl.client.init';
  import { KeyMappingHelper } from 'fuzs.puzzleslib.api.client.key.v1';

  class ClientFactories {
    static readonly INSTANCE: ClientFactories;
    constructClientMod(var1: string, var2: ClientModConstructor, var3: Set<ContentRegistrationFlags>, var4: Set<ContentRegistrationFlags>): void;
    get itemModelDisplayOverrides(): ItemDisplayOverridesImpl;
    get keyMappingActivationHelper(): KeyMappingHelper;
  }

}

declare module 'fuzs.puzzleslib.impl.client.event' {
  import { BlockStateModelLoader, ModelResourceLocation, UnbakedModel, ModelBakery } from 'net.minecraft.client.resources.model';
  import { Function } from 'java.util.function';
  import { AbstractList, List } from 'java.util';
  import { AbstractWidget, Renderable } from 'net.minecraft.client.gui.components';

  class ModelLoadingHelper {
    static getUnbakedTopLevelModel(modelBakery: ModelBakery): Function<ModelResourceLocation, UnbakedModel>;
    static loadUnbakedBlockStateModel(modelBakery: ModelBakery, blockStateModelLoader: BlockStateModelLoader, modelResourceLocation: ModelResourceLocation): UnbakedModel;
    static setModelLoader(modelLoader: BlockStateModelLoader): void;
  }


  interface ScreenButtonList extends AbstractList<AbstractWidget> {}
  class ScreenButtonList extends AbstractList<AbstractWidget> {
    constructor(renderables: Renderable[]);
    get(index: number): AbstractWidget;
    size(): number;
  }

}

declare module 'fuzs.puzzleslib.impl.client.gui' {
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface SingleTextureAtlasSprite extends TextureAtlasSprite {}
  class SingleTextureAtlasSprite extends TextureAtlasSprite {
    constructor(resourceLocation: ResourceLocation, spriteWidth: number, spriteHeight: number, uOffset: number, vOffset: number);

    constructor(resourceLocation: ResourceLocation, spriteWidth: number, spriteHeight: number, uOffset: number, vOffset: number, textureWidth: number, textureHeight: number);
  }

}

declare module 'fuzs.puzzleslib.impl.client' {
  import { ClientModConstructor } from 'fuzs.puzzleslib.api.client.core.v1';
  import { Options } from 'net.minecraft.client';

  interface PuzzlesLibClient extends ClientModConstructor {}
  class PuzzlesLibClient extends ClientModConstructor {
    static initializeGameOptions(options: Options): void;
    onClientSetup(): void;
    onConstructMod(): void;
  }

}

declare module 'fuzs.puzzleslib.impl.config.annotation' {
  import { Builder, ConfigValue } from 'ModConfigSpec';
  import { ConfigDataHolderImpl } from 'fuzs.puzzleslib.impl.config';
  import { ConfigCore, Config } from 'fuzs.puzzleslib.api.config.v3';
  import { Class } from 'java.lang';
  import { Field } from 'java.lang.reflect';
  import { List, Optional } from 'java.util';

  class ConfigBuilder {
    static build<T extends ConfigCore>(builder: Builder, context: ConfigDataHolderImpl<any>, o: T): void;
    static build<T extends ConfigCore>(builder: Builder, context: ConfigDataHolderImpl<any>, clazz: Class<T>): void;
    static build<T extends ConfigCore>(builder: Builder, context: ConfigDataHolderImpl<any>, clazz: Class<T>, o: T): void;
  }


  class ConfigEntry<T = any> {
    constructor(field: Field);
    defineValue(var1: Builder, var2: ConfigDataHolderImpl<any>, var3: any): void;
    get annotation(): Config;
    get name(): string;
    getComments(o: any): string[];
    getDefaultValue(o: any): T;
  }


  interface NumberEntry<T extends Number = any, A extends Annotation = any> extends ValueEntry<T> {}
  class NumberEntry<T extends Number = any, A extends Annotation = any> extends ValueEntry<T> {
    constructor(field: Field, rangeClazz: Class<A>);
    get rangeAnnotation(): Optional<A>;
    max(): T;
    min(): T;
  }


  interface ValueEntry<T = any> extends ConfigEntry<T> {}
  class ValueEntry<T = any> extends ConfigEntry<T> {
    constructor(field: Field);
    defineValue(builder: Builder, context: ConfigDataHolderImpl<any>, o: any): void;
    getComments(o: any): string[];
    getConfigValue(var1: Builder, var2: any): ConfigValue<T>;
  }

}

declare module 'fuzs.puzzleslib.impl.config.annotation.ConfigEntry' {
  import { ConfigEntry } from 'fuzs.puzzleslib.impl.config.annotation';
  import { ConfigCore } from 'fuzs.puzzleslib.api.config.v3';
  import { Field } from 'java.lang.reflect';
  import { Builder } from 'ModConfigSpec';
  import { ConfigDataHolderImpl } from 'fuzs.puzzleslib.impl.config';

  interface ChildEntry extends ConfigEntry<ConfigCore> {}
  class ChildEntry extends ConfigEntry<ConfigCore> {
    constructor(field: Field);
    defineValue(builder: Builder, context: ConfigDataHolderImpl<any>, o: any): void;
  }

}

declare module 'fuzs.puzzleslib.impl.config.annotation.NumberEntry' {
  import { NumberEntry, DoubleRange, LongRange, IntRange } from 'fuzs.puzzleslib.impl.config.annotation';
  import { Double, Long, Integer } from 'java.lang';
  import { Field } from 'java.lang.reflect';
  import { DoubleValue, Builder, LongValue, IntValue } from 'ModConfigSpec';

  interface DoubleEntry extends NumberEntry<number, DoubleRange> {}
  class DoubleEntry extends NumberEntry<number, DoubleRange> {
    constructor(field: Field);
    getConfigValue(builder: Builder, o: any): DoubleValue;
    max(): number;
    min(): number;
  }


  interface LongEntry extends NumberEntry<Long, LongRange> {}
  class LongEntry extends NumberEntry<Long, LongRange> {
    constructor(field: Field);
    getConfigValue(builder: Builder, o: any): LongValue;
    max(): Long;
    min(): Long;
  }


  interface IntegerEntry extends NumberEntry<number, IntRange> {}
  class IntegerEntry extends NumberEntry<number, IntRange> {
    constructor(field: Field);
    getConfigValue(builder: Builder, o: any): IntValue;
    max(): number;
    min(): number;
  }

}

declare module 'fuzs.puzzleslib.impl.config.annotation.ValueEntry' {
  import { ValueEntry } from 'fuzs.puzzleslib.impl.config.annotation';
  import { Boolean } from 'java.lang';
  import { Field } from 'java.lang.reflect';
  import { BooleanValue, Builder } from 'ModConfigSpec';

  interface BooleanEntry extends ValueEntry<boolean> {}
  class BooleanEntry extends ValueEntry<boolean> {
    constructor(field: Field);
    getConfigValue(builder: Builder, o: any): BooleanValue;
  }

}

declare module 'fuzs.puzzleslib.impl.config.ConfigDataHolderImpl' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ModConfigEventType extends Enum<ModConfigEventType> {}
  class ModConfigEventType extends Enum<ModConfigEventType> {
    static readonly LOADING: ModConfigEventType;
    static readonly RELOADING: ModConfigEventType;
    static readonly UNLOADING: ModConfigEventType;
    isLoading(): boolean;
    toString(): string;
    static valueOf(name: string): ModConfigEventType;
    static values(): ModConfigEventType[];
  }

}

declare module 'fuzs.puzzleslib.impl.config' {
  import { ConfigHolder, ConfigDataHolder, ConfigCore } from 'fuzs.puzzleslib.api.config.v3';
  import { Class } from 'java.lang';
  import { Map, List } from 'java.util';
  import { BiConsumer } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { PreparableReloadListener } from 'net.minecraft.server.packs.resources';
  import { ModConfigSpec } from 'net.neoforged.neoforge.common';

  interface ConfigHolderRegistry extends ConfigHolder {}
  class ConfigHolderRegistry extends ConfigHolder {
    get<T extends ConfigCore>(clazz: Class<T>): T;
    getHolder<T extends ConfigCore>(var1: Class<T>): ConfigDataHolder<T>;
  }


  class ConfigTranslationsManager {
    static readonly TRANSLATIONS: Map;
    static addConfigFile(modId: string, fileName: string, configType: string): void;
    static addConfigTitle(modId: string): void;
    static addConfigValue(modId: string, valueName: string): void;
    static addConfigValue(modId: string, valuePath: string[]): void;
    static addConfigValueButton(modId: string, valueName: string): void;
    static addConfigValueButton(modId: string, valuePath: string[]): void;
    static addConfigValueComment(modId: string, valueName: string, comment: string): void;
    static addConfigValueComment(modId: string, valuePath: string[], comments: string[]): void;
    static addModConfig(modId: string, configType: string, fileName: string, configSpec: ModConfigSpec): void;
    static onAddResourcePackReloadListeners(consumer: BiConsumer<ResourceLocation, PreparableReloadListener>): void;
  }

}

declare module 'fuzs.puzzleslib.impl.config.serialization' {
  import { KeyedValueProvider } from 'fuzs.puzzleslib.api.config.v3.serialization';
  import { Class } from 'java.lang';
  import { Optional } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Stream } from 'java.util.stream';
  import { Entry } from 'Map';

  interface EnumProvider<T extends Enum<T> = any> extends KeyedValueProvider<T> {}
  class EnumProvider<T extends Enum<T> = any> extends KeyedValueProvider<T> {
    constructor(enumClazz: Class<T>, modId: string);
    getKey(value: T): ResourceLocation;
    getValue(name: ResourceLocation): Optional<T>;
    stream(): Stream<Entry<ResourceLocation, T>>;
    streamValues(): Stream<T>;
  }

}

declare module 'fuzs.puzzleslib.impl.core' {
  import { ModConstructor, ContentRegistrationFlags, BaseModConstructor } from 'fuzs.puzzleslib.api.core.v1';
  import { Set, Collection } from 'java.util';
  import { RegistryFactory, RegistryManager } from 'fuzs.puzzleslib.api.init.v3.registry';
  import { GameRulesFactory } from 'fuzs.puzzleslib.api.init.v3';
  import { ToolTypeHelper } from 'fuzs.puzzleslib.api.item.v2';
  import { CombinedIngredients } from 'fuzs.puzzleslib.api.item.v2.crafting';
  import { AbstractTagAppender } from 'fuzs.puzzleslib.api.data.v2.tags';
  import { TagBuilder } from 'net.minecraft.tags';
  import { Function } from 'java.util.function';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { DataAttachmentRegistryImpl } from 'fuzs.puzzleslib.impl.attachment';
  import { Stream } from 'java.util.stream';
  import { CapabilityController } from 'fuzs.puzzleslib.api.capability.v3';
  import { Builder } from 'fuzs.puzzleslib.api.network.v3.NetworkHandler';
  import { Builder as fuzs_puzzleslib_api_config_v3_configholder_Builder } from 'fuzs.puzzleslib.api.config.v3.ConfigHolder';
  import { Runnable } from 'java.lang';

  class CommonFactories {
    static readonly INSTANCE: CommonFactories;
    constructMod(var1: string, var2: ModConstructor, var3: Set<ContentRegistrationFlags>, var4: Set<ContentRegistrationFlags>): void;
    get clientProxy(): ProxyImpl;
    get combinedIngredients(): CombinedIngredients;
    get dataAttachmentRegistry(): DataAttachmentRegistryImpl;
    get gameRulesFactory(): GameRulesFactory;
    get registryFactory(): RegistryFactory;
    get serverProxy(): ProxyImpl;
    get toolTypeHelper(): ToolTypeHelper;
    getModContext(var1: string): ModContext;
    getTagAppender<T>(var1: TagBuilder, var2: Function<T, ResourceKey<T>>): AbstractTagAppender<T>;
    registerEventHandlers(): void;
    registerLoadingHandlers(): void;
  }


  class EventHandlerProvider {
    registerEventHandlers(): void;
    static tryRegister(o: any): void;
  }


  class ModContext {
    static acceptServersideMods(modList: Collection<string>): void;
    afterModConstruction(identifier: ResourceLocation): void;
    beforeModConstruction(): void;
    static get(modId: string): ModContext;
    get capabilityController(): CapabilityController;
    static get capabilityControllers(): Stream<CapabilityController>;
    get configHolder(): fuzs_puzzleslib_api_config_v3_configholder_Builder;
    get registryManager(): RegistryManager;
    getFlagsToHandle(availableFlags: Set<ContentRegistrationFlags>): Set<ContentRegistrationFlags>;
    getNetworkHandler(var1: ResourceLocation): Builder;
    static getPairingIdentifier(modId: string, modConstructor: BaseModConstructor): ResourceLocation;
    static isPresentServerside(modId: string): boolean;
    static registerEventHandlers(): void;
    scheduleClientModConstruction(identifier: ResourceLocation, runnable: Runnable): void;
  }

}

declare module 'fuzs.puzzleslib.impl.core.resources' {
  import { NamedReloadListener } from 'fuzs.puzzleslib.api.core.v1.resources';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Supplier } from 'java.util.function';
  import { Collection } from 'java.util';
  import { CompletableFuture, Executor } from 'java.util.concurrent';
  import { Void } from 'java.lang';
  import { PreparationBarrier } from 'PreparableReloadListener';
  import { ResourceManager, ResourceManagerReloadListener } from 'net.minecraft.server.packs.resources';
  import { ProfilerFiller } from 'net.minecraft.util.profiling';

  interface ForwardingReloadListener<T extends PreparableReloadListener = any> extends NamedReloadListener {}
  class ForwardingReloadListener<T extends PreparableReloadListener = any> extends NamedReloadListener {
    constructor(identifier: ResourceLocation, supplier: Supplier<Collection<T>>);
    identifier(): ResourceLocation;
    reload(preparationBarrier: PreparationBarrier, resourceManager: ResourceManager, preparationsProfiler: ProfilerFiller, reloadProfiler: ProfilerFiller, backgroundExecutor: Executor, gameExecutor: Executor): CompletableFuture<Void>;
    toString(): string;
  }


  interface ForwardingResourceManagerReloadListener extends ResourceManagerReloadListener, ForwardingReloadListener<ResourceManagerReloadListener> {}
  class ForwardingResourceManagerReloadListener extends ResourceManagerReloadListener {
    constructor(identifier: ResourceLocation, supplier: Supplier<Collection<ResourceManagerReloadListener>>);
    onResourceManagerReload(resourceManager: ResourceManager): void;
    reload(preparationBarrier: PreparationBarrier, resourceManager: ResourceManager, preparationsProfiler: ProfilerFiller, reloadProfiler: ProfilerFiller, backgroundExecutor: Executor, gameExecutor: Executor): CompletableFuture<Void>;
  }

}

declare module 'fuzs.puzzleslib.impl.event' {
  import { AbstractList, List, Optional } from 'java.util';
  import { LivingJumpCallback } from 'fuzs.puzzleslib.api.event.v1.entity.living';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { Supplier, Predicate } from 'java.util.function';

  interface CopyOnWriteForwardingList<T = any> extends AbstractList<T> {}
  class CopyOnWriteForwardingList<T = any> extends AbstractList<T> {
    constructor(delegate: T[]);
    add(index: number, element: T): void;
    delegate(): T[];
    get(index: number): T;
    remove(index: number): T;
    set(index: number, element: T): T;
    size(): number;
  }


  class EventImplHelper {
    static getGrindstoneUsingPlayer(topInput: ItemStack, bottomInput: ItemStack): Optional<Player>;
    static getPlayerFromContainerMenu(menu: AbstractContainerMenu): Optional<Player>;
    static onLivingJump(callback: LivingJumpCallback, entity: LivingEntity): void;
  }


  interface PotentialSpawnsList<E = any> extends AbstractList<E> {}
  class PotentialSpawnsList<E = any> extends AbstractList<E> {
    constructor(list: Supplier<E[]>, add: Predicate<E>, remove: Predicate<E>);
    add(index: number, element: E): void;
    add(e: E): boolean;
    get(index: number): E;
    remove(index: number): E;
    remove(o: any): boolean;
    set(index: number, element: E): E;
    size(): number;
  }

}

declare module 'fuzs.puzzleslib.impl.event.core.EventInvokerImpl' {
  import { EventInvoker } from 'fuzs.puzzleslib.api.event.v1.core';

  class EventInvokerLike<T = any> {
    asEventInvoker(var1: any): EventInvoker<T>;
  }

}

declare module 'fuzs.puzzleslib.impl.event.core.EventPhaseImpl' {
  import { BiConsumer } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';

  class Ordering {
    static readonly BEFORE: Ordering;
    static readonly AFTER: Ordering;
    apply(var1: BiConsumer<ResourceLocation, ResourceLocation>, var2: ResourceLocation, var3: ResourceLocation): void;
  }

}

declare module 'fuzs.puzzleslib.impl.event.data' {
  import { DefaultedBoolean, DefaultedDouble, DefaultedFloat, DefaultedInt, DefaultedValue, MutableBoolean, MutableDouble, MutableFloat, MutableInt, MutableValue } from 'fuzs.puzzleslib.api.event.v1.data';
  import { Consumer, Supplier, DoubleConsumer, DoubleSupplier, IntConsumer, IntSupplier } from 'java.util.function';
  import { Boolean, Float } from 'java.lang';
  import { Optional, OptionalDouble, OptionalInt } from 'java.util';

  interface EventDefaultedBoolean extends DefaultedBoolean, EventMutableBoolean {}
  class EventDefaultedBoolean extends DefaultedBoolean {
    constructor(consumer: Consumer<boolean>, supplier: Supplier<boolean>, defaultSupplier: Supplier<boolean>);
    accept(value: boolean): void;
    get asDefaultBoolean(): boolean;
    get asOptionalBoolean(): Optional<boolean>;
  }


  interface EventDefaultedDouble extends DefaultedDouble, EventMutableDouble {}
  class EventDefaultedDouble extends DefaultedDouble {
    constructor(consumer: DoubleConsumer, supplier: DoubleSupplier, defaultSupplier: DoubleSupplier);
    accept(value: number): void;
    get asDefaultDouble(): number;
    get asOptionalDouble(): OptionalDouble;
  }


  interface EventDefaultedFloat extends DefaultedFloat, EventMutableFloat {}
  class EventDefaultedFloat extends DefaultedFloat {
    constructor(consumer: Consumer<number>, supplier: Supplier<number>, defaultSupplier: Supplier<number>);
    accept(value: number): void;
    get asDefaultFloat(): number;
    get asOptionalFloat(): Optional<number>;
  }


  interface EventDefaultedInt extends DefaultedInt, EventMutableInt {}
  class EventDefaultedInt extends DefaultedInt {
    constructor(consumer: IntConsumer, supplier: IntSupplier, defaultSupplier: IntSupplier);
    accept(value: number): void;
    get asDefaultInt(): number;
    get asOptionalInt(): OptionalInt;
  }


  interface EventDefaultedValue<T = any> extends DefaultedValue<T>, EventMutableValue<T> {}
  class EventDefaultedValue<T = any> extends DefaultedValue<T> {
    constructor(consumer: Consumer<T>, supplier: Supplier<T>, defaultSupplier: Supplier<T>);
    accept(value: T): void;
    get asDefault(): T;
    get asOptional(): Optional<T>;
  }


  interface EventMutableBoolean extends MutableBoolean {}
  class EventMutableBoolean extends MutableBoolean {
    constructor(consumer: Consumer<boolean>, supplier: Supplier<boolean>);
    accept(value: boolean): void;
    get asBoolean(): boolean;
    toString(): string;
  }


  interface EventMutableDouble extends MutableDouble {}
  class EventMutableDouble extends MutableDouble {
    constructor(consumer: DoubleConsumer, supplier: DoubleSupplier);
    accept(value: number): void;
    get asDouble(): number;
    toString(): string;
  }


  interface EventMutableFloat extends MutableFloat {}
  class EventMutableFloat extends MutableFloat {
    constructor(consumer: Consumer<number>, supplier: Supplier<number>);
    accept(value: number): void;
    get asFloat(): number;
    toString(): string;
  }


  interface EventMutableInt extends MutableInt {}
  class EventMutableInt extends MutableInt {
    constructor(consumer: IntConsumer, supplier: IntSupplier);
    accept(value: number): void;
    get asInt(): number;
    toString(): string;
  }


  interface EventMutableValue<T = any> extends MutableValue<T> {}
  class EventMutableValue<T = any> extends MutableValue<T> {
    constructor(consumer: Consumer<T>, supplier: Supplier<T>);
    accept(value: T): void;
    get (): T;
    toString(): string;
  }


  interface ValueDefaultedBoolean extends DefaultedBoolean, ValueMutableBoolean {}
  class ValueDefaultedBoolean extends DefaultedBoolean {
    constructor(value: boolean);
    accept(value: boolean): void;
    get asDefaultBoolean(): boolean;
    get asOptionalBoolean(): Optional<boolean>;
  }


  interface ValueDefaultedDouble extends DefaultedDouble, ValueMutableDouble {}
  class ValueDefaultedDouble extends DefaultedDouble {
    constructor(value: number);
    accept(value: number): void;
    get asDefaultDouble(): number;
    get asOptionalDouble(): OptionalDouble;
  }


  interface ValueDefaultedFloat extends DefaultedFloat, ValueMutableFloat {}
  class ValueDefaultedFloat extends DefaultedFloat {
    constructor(value: number);
    accept(value: number): void;
    get asDefaultFloat(): number;
    get asOptionalFloat(): Optional<number>;
  }


  interface ValueDefaultedInt extends DefaultedInt, ValueMutableInt {}
  class ValueDefaultedInt extends DefaultedInt {
    constructor(value: number);
    accept(value: number): void;
    get asDefaultInt(): number;
    get asOptionalInt(): OptionalInt;
  }


  interface ValueDefaultedValue<T = any> extends DefaultedValue<T>, ValueMutableValue<T> {}
  class ValueDefaultedValue<T = any> extends DefaultedValue<T> {
    constructor(value: T);
    accept(value: T): void;
    get asDefault(): T;
    get asOptional(): Optional<T>;
  }


  interface ValueMutableBoolean extends MutableBoolean {}
  class ValueMutableBoolean extends MutableBoolean {
    constructor(value: boolean);
    accept(value: boolean): void;
    get asBoolean(): boolean;
    toString(): string;
  }


  interface ValueMutableDouble extends MutableDouble {}
  class ValueMutableDouble extends MutableDouble {
    constructor(value: number);
    accept(value: number): void;
    get asDouble(): number;
    toString(): string;
  }


  interface ValueMutableFloat extends MutableFloat {}
  class ValueMutableFloat extends MutableFloat {
    constructor(value: number);
    accept(value: number): void;
    get asFloat(): number;
    toString(): string;
  }


  interface ValueMutableInt extends MutableInt {}
  class ValueMutableInt extends MutableInt {
    constructor(value: number);
    accept(value: number): void;
    get asInt(): number;
    toString(): string;
  }


  interface ValueMutableValue<T = any> extends MutableValue<T> {}
  class ValueMutableValue<T = any> extends MutableValue<T> {
    constructor(value: T);
    accept(value: T): void;
    get (): T;
    toString(): string;
  }

}

declare module 'fuzs.puzzleslib.impl.init' {
  import { Reference } from 'Holder';
  import { ResourceKey } from 'net.minecraft.resources';
  import { HolderOwner, Registry, Holder } from 'net.minecraft.core';
  import { Supplier } from 'java.util.function';
  import { Collection } from 'java.util';
  import { TagKey } from 'net.minecraft.tags';
  import { Stream } from 'java.util.stream';

  interface DirectReferenceHolder<T = any> extends Reference<T> {}
  class DirectReferenceHolder<T = any> extends Reference<T> {
    constructor(key: ResourceKey<T>, value: T);
    bindValue(value: T): void;
    canSerializeIn(owner: HolderOwner<T>): boolean;
  }


  interface LazyHolder<T = any> extends Reference<T> {}
  class LazyHolder<T = any> extends Reference<T> {
    constructor(registryKey: ResourceKey<Registry<T>>, holder: Holder<T>);

    constructor(registryKey: ResourceKey<Registry<T>>, key: ResourceKey<T>, supplier: Supplier<Holder<T>>);
    bindTags(tags: Collection<TagKey<T>>): void;
    bindValue(value: T): void;
    canSerializeIn(owner: HolderOwner<T>): boolean;
    is(tagKey: TagKey<T>): boolean;
    isBound(): boolean;
    tags(): Stream<TagKey<T>>;
    toString(): string;
    toString(): string;
    value(): T;
  }

}

declare module 'fuzs.puzzleslib.impl.item' {
  import { RecipeSerializer, Ingredient, CraftingInput, ShapedRecipe, ShapelessRecipe } from 'net.minecraft.world.item.crafting';
  import { BiConsumer, Supplier, Predicate, Consumer } from 'java.util.function';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Provider } from 'HolderLookup';
  import { Component } from 'net.minecraft.network.chat';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { DisplayItemsGenerator } from 'CreativeModeTab';
  import { Stream } from 'java.util.stream';
  import { Reference } from 'Holder';
  import { Registry } from 'net.minecraft.core';

  class CopyComponentsRecipe {
    static readonly SHAPED_RECIPE_SERIALIZER_ID: string;
    static readonly SHAPELESS_RECIPE_SERIALIZER_ID: string;
    copyComponentsToResult(result: ItemStack, craftingInput: CraftingInput): void;
    get componentsSource(): Ingredient;
    static getModSerializer(modId: string, recipeSerializerId: string): RecipeSerializer<any>;
    static registerSerializers(registrar: BiConsumer<string, Supplier<RecipeSerializer<any>>>): void;
  }


  interface CopyComponentsShapedRecipe extends CopyComponentsRecipe, ShapedRecipe {}
  class CopyComponentsShapedRecipe extends CopyComponentsRecipe {
    constructor(modId: string, shapedRecipe: ShapedRecipe, copyFrom: Ingredient);

    constructor(recipeSerializer: RecipeSerializer<any>, shapedRecipe: ShapedRecipe, copyFrom: Ingredient);
    assemble(craftingInput: CraftingInput, registries: Provider): ItemStack;
    get componentsSource(): Ingredient;
    get serializer(): RecipeSerializer<any>;
  }


  interface CopyComponentsShapelessRecipe extends CopyComponentsRecipe, ShapelessRecipe {}
  class CopyComponentsShapelessRecipe extends CopyComponentsRecipe {
    constructor(modId: string, shapelessRecipe: ShapelessRecipe, copyFrom: Ingredient);

    constructor(recipeSerializer: RecipeSerializer<any>, shapelessRecipe: ShapelessRecipe, copyFrom: Ingredient);
    assemble(craftingInput: CraftingInput, registries: Provider): ItemStack;
    get componentsSource(): Ingredient;
    get serializer(): RecipeSerializer<any>;
  }


  class CreativeModeTabHelper {
    static appendAllEnchantments(modId: string, registries: Provider, itemStacks: Consumer<ItemStack>): void;
    static appendAllItems(modId: string, registries: Provider, itemStacks: Consumer<ItemStack>): void;
    static appendAllPotions(modId: string, registries: Provider, itemStacks: Consumer<ItemStack>): void;
    static getDisplayItems(modId: string): DisplayItemsGenerator;
    static getDisplayItems(modId: string, filter: Predicate<ItemStack>): DisplayItemsGenerator;
    static getHoldersFromNamespace<T>(registryKey: ResourceKey<Registry<T>>, registries: Provider, modId: string): Stream<Reference<T>>;
    static getTitle(resourceLocation: ResourceLocation): Component;
  }

}

declare module 'fuzs.puzzleslib.impl.item.CopyComponentsRecipe' {
  import { RecipeSerializer, Ingredient } from 'net.minecraft.world.item.crafting';

  class Factory<T extends CraftingRecipe = any, S extends CraftingRecipe & CopyComponentsRecipe = any> {
    apply(var1: RecipeSerializer<any>, var2: T, var3: Ingredient): S;
  }

}

declare module 'fuzs.puzzleslib.impl.network.codec' {
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { ByteBuf } from 'io.netty.buffer';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { Class } from 'java.lang';

  interface CustomPacketPayloadAdapter<T = any> extends CustomPacketPayload {}
  class CustomPacketPayloadAdapter<T = any> extends CustomPacketPayload {
    static streamCodec<B extends ByteBuf, T>(type: Type<CustomPacketPayloadAdapter<T>>, streamCodec: StreamCodec<ByteBuf, T>): StreamCodec<B, CustomPacketPayloadAdapter<T>>;
    type(): Type<CustomPacketPayloadAdapter<T>>;
    unwrap(): T;
  }


  interface RecordStreamCodec<R extends Record = any> extends StreamCodec<FriendlyByteBuf, R> {}
  class RecordStreamCodec<R extends Record = any> extends StreamCodec<FriendlyByteBuf, R> {
    static createRecordSerializer<R extends Record>(clazz: Class<R>): StreamCodec<FriendlyByteBuf, R>;
    decode(buf: FriendlyByteBuf): R;
    encode(buf: FriendlyByteBuf, instance: R): void;
    get recordType(): Class<R>;
  }

}

declare module 'fuzs.puzzleslib.impl.network' {
  import { NetworkHandler, ClientboundMessage, ServerboundMessage, PlayerSet } from 'fuzs.puzzleslib.api.network.v3';
  import { Packet } from 'net.minecraft.network.protocol';
  import { ClientCommonPacketListener, ServerCommonPacketListener } from 'net.minecraft.network.protocol.common';

  interface NetworkHandlerRegistry extends NetworkHandler {}
  class NetworkHandlerRegistry extends NetworkHandler {
    sendMessage<T>(var1: PlayerSet, var2: ClientboundMessage<T>): void;
    sendMessage<T>(var1: ServerboundMessage<T>): void;
    toClientboundPacket<T>(var1: ClientboundMessage<T>): Packet<ClientCommonPacketListener>;
    toServerboundPacket<T>(var1: ServerboundMessage<T>): Packet<ServerCommonPacketListener>;
  }

}

declare module 'fuzs.puzzleslib.impl' {
  import { Logger } from 'org.slf4j';
  import { ModConstructor } from 'fuzs.puzzleslib.api.core.v1';
  import { NetworkHandler } from 'fuzs.puzzleslib.api.network.v3';
  import { ResourceLocation } from 'net.minecraft.resources';

  class PuzzlesLib {
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static readonly LOGGER: Logger;
    static isDevelopmentEnvironment(): boolean;
    static isDevelopmentEnvironmentWithoutDataGeneration(): boolean;
  }


  interface PuzzlesLibMod extends ModConstructor, PuzzlesLib {}
  class PuzzlesLibMod extends ModConstructor {
    static readonly NETWORK: NetworkHandler;
    static id(path: string): ResourceLocation;
    onConstructMod(): void;
  }

}

declare module 'fuzs.puzzleslib.impl.resources.ModPackResourcesSupplier' {
  import { PackType, PackLocationInfo, BuiltInMetadata } from 'net.minecraft.server.packs';

  class PackResourcesSupplier<T extends PackResources = any> {
    apply(var1: PackType, var2: PackLocationInfo, var3: BuiltInMetadata): T;
  }

}

declare module 'fuzs.puzzleslib.mixin' {
  import { VehicleEntity } from 'net.minecraft.world.entity.vehicle';
  import { EntityType } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';

  interface AbstractMinecartMixin extends VehicleEntity {}
  class AbstractMinecartMixin extends VehicleEntity {
    constructor(entityType: EntityType<any>, level: Level);
  }

}

declare module 'fuzs.puzzleslib.mixin.client' {
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { Font } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';
  import { CallbackInfoReturnable, CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Boolean } from 'java.lang';
  import { BlockStateModelLoader } from 'net.minecraft.client.resources.model';

  interface EditBoxMixin extends AbstractWidget {}
  class EditBoxMixin extends AbstractWidget {
    font: Font;
    value: string;
    bordered: boolean;
    displayPos: number;
    cursorPos: number;
    highlightPos: number;
    constructor(x: number, y: number, width: number, height: number, message: Component);
    deleteChars(var1: number): void;
    deleteWords(var1: number): void;
    get cursorPosition(): number;
    get innerWidth(): number;
    getWordPosition(var1: number): number;
    keyPressed(keyCode: number, scanCode: number, modifiers: number, callback: CallbackInfoReturnable<boolean>): void;
    moveCursor(var1: number, var2: boolean): void;
    moveCursorTo(var1: number, var2: boolean): void;
    moveCursorToEnd(var1: boolean): void;
    moveCursorToStart(var1: boolean): void;
    onClick(mouseX: number, mouseY: number, callback: CallbackInfo): void;
    set cursorPosition(var1: number);
    setHighlightPos(var1: number): void;
  }


  class ModelBakeryMixin {
    init(blockStateModelLoader: BlockStateModelLoader): BlockStateModelLoader;
  }

}

declare module 'fuzs.puzzleslib.mixin.server' {
  import { Path } from 'java.nio.file';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  class DedicatedServerSettingsMixin {
    init(path: Path, callback: CallbackInfo): void;
  }


  class EulaMixin {
  }

}

declare module 'fuzs.puzzleslib.neoforge.api.core.v1' {
  import { IEventBus } from 'net.neoforged.bus.api';
  import { Optional } from 'java.util';
  import { ModContainer } from 'net.neoforged.fml';

  class NeoForgeModContainerHelper {
    static get activeModEventBus(): IEventBus;
    static get optionalActiveModEventBus(): Optional<IEventBus>;
    static getModContainer(modId: string): ModContainer;
    static getModEventBus(modId: string): IEventBus;
    static getOptionalModContainer(modId: string): Optional<ModContainer>;
    static getOptionalModEventBus(modId: string): Optional<IEventBus>;
  }

}

declare module 'fuzs.puzzleslib.neoforge.api.data.v2' {
  import { DataProvider, PackOutput, CachedOutput } from 'net.minecraft.data';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Registry } from 'net.minecraft.core';
  import { NeoForgeDataProviderContext } from 'fuzs.puzzleslib.neoforge.api.data.v2.core';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';
  import { ExistingFileHelper } from 'net.neoforged.neoforge.common.data';

  interface AbstractBuiltInDataProvider<T = any> extends DataProvider {}
  class AbstractBuiltInDataProvider<T = any> extends DataProvider {
    constructor(registryKey: ResourceKey<Registry<T>>, context: NeoForgeDataProviderContext);

    constructor(registryKey: ResourceKey<Registry<T>>, modId: string, output: PackOutput, registries: CompletableFuture<Provider>, fileHelper: ExistingFileHelper);
    get name(): string;
    run(output: CachedOutput): CompletableFuture<any>;
  }

}

declare module 'fuzs.puzzleslib.neoforge.api.data.v2.AbstractBuiltInDataProvider' {
  import { AbstractBuiltInDataProvider } from 'fuzs.puzzleslib.neoforge.api.data.v2';
  import { TrimMaterial } from 'net.minecraft.world.item.armortrim';
  import { NeoForgeDataProviderContext } from 'fuzs.puzzleslib.neoforge.api.data.v2.core';
  import { PackOutput } from 'net.minecraft.data';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';
  import { ExistingFileHelper } from 'net.neoforged.neoforge.common.data';
  import { DamageType } from 'net.minecraft.world.damagesource';
  import { Enchantment } from 'net.minecraft.world.item.enchantment';

  interface TrimMaterials extends AbstractBuiltInDataProvider<TrimMaterial> {}
  class TrimMaterials extends AbstractBuiltInDataProvider<TrimMaterial> {
    constructor(context: NeoForgeDataProviderContext);

    constructor(modId: string, output: PackOutput, lookupProvider: CompletableFuture<Provider>, fileHelper: ExistingFileHelper);
  }


  interface DamageTypes extends AbstractBuiltInDataProvider<DamageType> {}
  class DamageTypes extends AbstractBuiltInDataProvider<DamageType> {
    constructor(context: NeoForgeDataProviderContext);

    constructor(modId: string, output: PackOutput, lookupProvider: CompletableFuture<Provider>, fileHelper: ExistingFileHelper);
  }


  interface Enchantments extends AbstractBuiltInDataProvider<Enchantment> {}
  class Enchantments extends AbstractBuiltInDataProvider<Enchantment> {
    constructor(context: NeoForgeDataProviderContext);
  }

}

declare module 'fuzs.puzzleslib.neoforge.api.data.v2.client' {
  import { BlockStateProvider } from 'net.neoforged.neoforge.client.model.generators';
  import { NeoForgeDataProviderContext } from 'fuzs.puzzleslib.neoforge.api.data.v2.core';
  import { PackOutput } from 'net.minecraft.data';
  import { ExistingFileHelper, JsonCodecProvider, SoundDefinitionsProvider, SpriteSourceProvider } from 'net.neoforged.neoforge.common.data';
  import { ModItemModelProvider } from 'fuzs.puzzleslib.neoforge.api.data.v2.client.model';
  import { Block } from 'net.minecraft.world.level.block';
  import { ExistingModelFile } from 'ModelFile';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List } from 'java.util';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';

  interface AbstractModelProvider extends BlockStateProvider {}
  class AbstractModelProvider extends BlockStateProvider {
    constructor(context: NeoForgeDataProviderContext);

    constructor(modId: string, packOutput: PackOutput, fileHelper: ExistingFileHelper);
    builtInBlock(block: Block, particleTexture: Block): void;
    builtInBlock(block: Block, particleTexture: ResourceLocation): void;
    cubeBottomTopBlock(block: Block): void;
    cubeBottomTopBlock(block: Block, side: ResourceLocation, bottom: ResourceLocation, top: ResourceLocation): void;
    existingBlockModel(block: Block): ExistingModelFile;
    extend(rl: ResourceLocation, suffix: string): ResourceLocation;
    extendKey(block: Block, ...extensions: string[]): ResourceLocation;
    itemModels(): ModItemModelProvider;
    key(block: Block): ResourceLocation;
    name(block: Block): string;
    simpleExistingBlock(block: Block): void;
    simpleExistingBlockWithItem(block: Block): void;
  }


  interface AbstractParticleDescriptionProvider extends JsonCodecProvider<List> {}
  class AbstractParticleDescriptionProvider extends JsonCodecProvider<List> {
    constructor(context: NeoForgeDataProviderContext);

    constructor(modId: string, packOutput: PackOutput, lookupProvider: CompletableFuture<Provider>, fileHelper: ExistingFileHelper);
    addParticleDescriptions(): void;
    get name(): string;
    unconditional(id: ResourceLocation, value: ResourceLocation[]): void;
  }


  interface AbstractSoundDefinitionProvider extends SoundDefinitionsProvider {}
  class AbstractSoundDefinitionProvider extends SoundDefinitionsProvider {
    constructor(context: NeoForgeDataProviderContext);

    constructor(modId: string, packOutput: PackOutput, fileHelper: ExistingFileHelper);
    addSoundDefinitions(): void;
    registerSounds(): void;
  }


  interface AbstractSpriteSourceProvider extends SpriteSourceProvider {}
  class AbstractSpriteSourceProvider extends SpriteSourceProvider {
    constructor(context: NeoForgeDataProviderContext);

    constructor(modId: string, packOutput: PackOutput, lookupProvider: CompletableFuture<Provider>, fileHelper: ExistingFileHelper);
    addSpriteSources(): void;
    get name(): string;
  }

}

declare module 'fuzs.puzzleslib.neoforge.api.data.v2.client.model' {
  import { ItemModelProvider, BlockStateProvider, ItemModelBuilder } from 'net.neoforged.neoforge.client.model.generators';
  import { PackOutput, CachedOutput } from 'net.minecraft.data';
  import { ExistingFileHelper } from 'net.neoforged.neoforge.common.data';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Item } from 'net.minecraft.world.item';
  import { Block } from 'net.minecraft.world.level.block';
  import { CompletableFuture } from 'java.util.concurrent';

  interface ModItemModelProvider extends ItemModelProvider {}
  class ModItemModelProvider extends ItemModelProvider {
    constructor(output: PackOutput, modId: string, fileHelper: ExistingFileHelper, provider: BlockStateProvider);
    basicItem(item: Item, texture: ResourceLocation): ItemModelBuilder;
    basicItem(item: ResourceLocation, texture: Item): ItemModelBuilder;
    basicItem(item: ResourceLocation, texture: ResourceLocation): ItemModelBuilder;
    builtInItem(item: Item, texture: Block): ItemModelBuilder;
    builtInItem(item: Item, texture: Block, parent: ResourceLocation): ItemModelBuilder;
    handheldItem(item: Item): ItemModelBuilder;
    handheldItem(item: ResourceLocation): ItemModelBuilder;
    key(item: Item): ResourceLocation;
    name(item: Item): string;
    run(cache: CachedOutput): CompletableFuture<any>;
    spawnEgg(item: Item): ItemModelBuilder;
    spawnEgg(item: ResourceLocation): ItemModelBuilder;
  }

}

declare module 'fuzs.puzzleslib.neoforge.api.data.v2.core' {
  import { Factory, LegacyFactory } from 'fuzs.puzzleslib.neoforge.api.data.v2.core.NeoForgeDataProviderContext';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { PackType } from 'net.minecraft.server.packs';
  import { RegistrySetBuilder } from 'net.minecraft.core';
  import { DataProviderContext } from 'fuzs.puzzleslib.api.data.v2.core';
  import { PackOutput } from 'net.minecraft.data';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';
  import { ExistingFileHelper } from 'net.neoforged.neoforge.common.data';
  import { GatherDataEvent } from 'net.neoforged.neoforge.data.event';

  class DataProviderHelper {
    static registerDataProviders(modId: string, ...dataProviderFactories: Factory[]): void;
    static registerDataProviders(modId: string, ...dataProviderFactories: LegacyFactory[]): void;
    static registerDataProviders(resourceLocation: ResourceLocation, packType: PackType, ...dataProviderFactories: Factory[]): void;
    static registerDataProviders(modId: string, registrySetBuilder: RegistrySetBuilder, ...dataProviderFactories: Factory[]): void;
    static registerDataProviders(modId: string, registrySetBuilder: RegistrySetBuilder, ...dataProviderFactories: LegacyFactory[]): void;
    static registerDataProviders(resourceLocation: ResourceLocation, packType: PackType, registrySetBuilder: RegistrySetBuilder, ...dataProviderFactories: Factory[]): void;
  }


  interface NeoForgeDataProviderContext extends DataProviderContext {}
  class NeoForgeDataProviderContext extends DataProviderContext {
    constructor(modId: string, packOutput: PackOutput, registries: CompletableFuture<Provider>, fileHelper: ExistingFileHelper);
    static fromEvent(event: GatherDataEvent, packOutput: PackOutput, registries: CompletableFuture<Provider>): NeoForgeDataProviderContext;
    get fileHelper(): ExistingFileHelper;
    withRegistries(registries: CompletableFuture<Provider>): NeoForgeDataProviderContext;
  }

}

declare module 'fuzs.puzzleslib.neoforge.api.data.v2.core.NeoForgeDataProviderContext' {
  import { BiFunction, Function } from 'java.util.function';
  import { GatherDataEvent } from 'net.neoforged.neoforge.data.event';
  import { DataProvider } from 'net.minecraft.data';
  import { NeoForgeDataProviderContext } from 'fuzs.puzzleslib.neoforge.api.data.v2.core';

  interface LegacyFactory extends BiFunction<GatherDataEvent, string, DataProvider> {}
  class LegacyFactory extends BiFunction<GatherDataEvent, string, DataProvider> {
  }


  interface Factory extends Function<NeoForgeDataProviderContext, DataProvider> {}
  class Factory extends Function<NeoForgeDataProviderContext, DataProvider> {
  }

}

declare module 'fuzs.puzzleslib.neoforge.api.event.v1.core' {
  import { EventInvokerRegistry } from 'fuzs.puzzleslib.api.event.v1.core';
  import { Class } from 'java.lang';
  import { BiConsumer } from 'java.util.function';
  import { Event } from 'net.neoforged.bus.api';
  import { NeoForgeEventContextConsumer } from 'fuzs.puzzleslib.neoforge.api.event.v1.core.NeoForgeEventInvokerRegistry';

  interface NeoForgeEventInvokerRegistry extends EventInvokerRegistry {}
  class NeoForgeEventInvokerRegistry extends EventInvokerRegistry {
    static readonly INSTANCE: NeoForgeEventInvokerRegistry;
    register<T, E extends Event>(clazz: Class<T>, event: Class<E>, converter: BiConsumer<T, E>, callback: T, evt: E, context: any): void;
    register<T, E extends Event>(clazz: Class<T>, event: Class<E>, converter: BiConsumer<T, E>, joinInvokers: boolean, callback: T, evt: E, context: any): void;
    register<T, E extends Event>(clazz: Class<T>, event: Class<E>, converter: NeoForgeEventContextConsumer<T, E>): void;
    register<T, E extends Event>(var1: Class<T>, var2: Class<E>, var3: NeoForgeEventContextConsumer<T, E>, var4: boolean): void;
    register<T>(clazz: Class<T>, converter: BiConsumer<T, any>): void;
    register<T>(clazz: Class<T>, converter: BiConsumer<T, any>, joinInvokers: boolean): void;
  }

}

declare module 'fuzs.puzzleslib.neoforge.api.event.v1.core.NeoForgeEventInvokerRegistry' {
  class NeoForgeEventContextConsumer<T = any, E extends Event = any> {
    accept(var1: T, var2: E, var3: any): void;
  }

}

declare module 'fuzs.puzzleslib.neoforge.api.event.v1.entity.living' {
  import { LivingEvent } from 'net.neoforged.neoforge.event.entity.living';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { Holder } from 'net.minecraft.core';
  import { Enchantment } from 'net.minecraft.world.item.enchantment';
  import { LootContext } from 'net.minecraft.world.level.storage.loot';

  interface ComputeEnchantedLootBonusEvent extends LivingEvent {}
  class ComputeEnchantedLootBonusEvent extends LivingEvent {
    constructor(entity: LivingEntity, damageSource: DamageSource, enchantment: Holder<Enchantment>, enchantmentLevel: number);
    get damageSource(): DamageSource;
    get enchantment(): Holder<Enchantment>;
    get enchantmentLevel(): number;
    static onComputeEnchantedLootBonus(enchantment: Holder<Enchantment>, enchantmentLevel: number, lootContext: LootContext): number;
    static onComputeEnchantedLootBonus(enchantment: Holder<Enchantment>, enchantmentLevel: number, livingEntity: LivingEntity, damageSource: DamageSource): number;
    set enchantmentLevel(enchantmentLevel: number);
  }

}

declare module 'fuzs.puzzleslib.neoforge.api.init.v3.capability' {
  import { Holder, Direction } from 'net.minecraft.core';
  import { ChestBlock } from 'net.minecraft.world.level.block';
  import { BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { ICapabilityProvider, RegisterCapabilitiesEvent } from 'net.neoforged.neoforge.capabilities';
  import { IItemHandler } from 'net.neoforged.neoforge.items';
  import { EntityType, Entity } from 'net.minecraft.world.entity';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { Void } from 'java.lang';
  import { BiConsumer } from 'java.util.function';

  class NeoForgeCapabilityHelper {
    static register<T>(consumer: BiConsumer<RegisterCapabilitiesEvent, T>, ...types: Holder<T>[]): void;
    static registerBlockEntity<T extends BlockEntity>(capabilityProvider: ICapabilityProvider<T, Direction, IItemHandler>, ...blockEntityTypes: Holder<BlockEntityType<T>>[]): void;
    static registerBlockEntityContainer<T extends BlockEntity>(...blockEntityTypes: Holder<BlockEntityType<T>>[]): void;
    static registerChestBlock(...chestBlocks: Holder<ChestBlock>[]): void;
    static registerEntityContainer<T extends Entity>(...entityTypes: Holder<EntityType<T>>[]): void;
    static registerItemContainer(capabilityProvider: ICapabilityProvider<ItemStack, Void, IItemHandler>, ...items: Holder<Item>[]): void;
    static registerRestrictedBlockEntityContainer<T extends BlockEntity>(...blockEntityTypes: Holder<BlockEntityType<T>>[]): void;
    static registerWorldlyBlockEntityContainer<T extends BlockEntity>(...blockEntityTypes: Holder<BlockEntityType<T>>[]): void;
  }

}

declare module 'fuzs.puzzleslib.neoforge.impl.attachment.builder' {
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockEntityBuilder, EntityBuilder } from 'fuzs.puzzleslib.api.attachment.v4.DataAttachmentRegistry';
  import { Predicate, BiConsumer, Function } from 'java.util.function';
  import { Codec } from 'com.mojang.serialization';
  import { DataAttachmentBuilder, EntityDataAttachmentBuilder } from 'fuzs.puzzleslib.impl.attachment.builder';
  import { DataAttachmentType } from 'fuzs.puzzleslib.api.attachment.v4';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Entity } from 'net.minecraft.world.entity';
  import { AttachmentTypeAdapter, ClientboundEntityDataAttachmentMessage } from 'fuzs.puzzleslib.impl.attachment';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { PlayerSet } from 'fuzs.puzzleslib.api.network.v3';

  interface NeoForgeBlockEntityDataAttachmentBuilder<V = any> extends BlockEntityBuilder<V>, NeoForgeDataAttachmentBuilder<BlockEntity, V> {}
  class NeoForgeBlockEntityDataAttachmentBuilder<V = any> extends BlockEntityBuilder<V> {
    defaultValue(defaultValue: V): BlockEntityBuilder<V>;
    defaultValue(defaultFilter: Predicate<BlockEntity>, defaultValue: V): BlockEntityBuilder<V>;
    persistent(codec: Codec<V>): BlockEntityBuilder<V>;
  }


  interface NeoForgeDataAttachmentBuilder<T extends IAttachmentHolder = any, V = any> extends DataAttachmentBuilder<T, V> {}
  class NeoForgeDataAttachmentBuilder<T extends IAttachmentHolder = any, V = any> extends DataAttachmentBuilder<T, V> {
    build(resourceLocation: ResourceLocation): DataAttachmentType<T, V>;
  }


  interface NeoForgeEntityDataAttachmentBuilder<V = any> extends EntityDataAttachmentBuilder<V>, NeoForgeDataAttachmentBuilder<Entity, V> {}
  class NeoForgeEntityDataAttachmentBuilder<V = any> extends EntityDataAttachmentBuilder<V> {
    copyOnDeath(): EntityBuilder<V>;
    defaultValue(defaultValue: V): EntityBuilder<V>;
    defaultValue(defaultFilter: Predicate<Entity>, defaultValue: V): EntityBuilder<V>;
    getSynchronizer(resourceLocation: ResourceLocation, attachmentType: AttachmentTypeAdapter<Entity, V>): BiConsumer<Entity, V>;
    networkSynchronized(streamCodec: StreamCodec<RegistryFriendlyByteBuf, V>, synchronizationTargets: Function<Entity, PlayerSet>): EntityBuilder<V>;
    persistent(codec: Codec<V>): EntityBuilder<V>;
    registerPayloadHandlers(resourceLocation: ResourceLocation, attachmentType: AttachmentTypeAdapter<Entity, V>, type: Type<ClientboundEntityDataAttachmentMessage<V>>, streamCodec: StreamCodec<RegistryFriendlyByteBuf, V>): void;
  }

}

declare module 'fuzs.puzzleslib.neoforge.impl.capability.data' {
  import { BlockEntityCapabilityKey, CapabilityKey, SyncStrategy, CopyStrategy, LevelCapabilityKey, LevelChunkCapabilityKey } from 'fuzs.puzzleslib.api.capability.v3.data';
  import { DeferredHolder } from 'net.neoforged.neoforge.registries';
  import { AttachmentType } from 'net.neoforged.neoforge.attachment';
  import { Predicate } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { EntityCapabilityKeyImpl } from 'fuzs.puzzleslib.impl.capability';
  import { Mutable } from 'fuzs.puzzleslib.api.capability.v3.data.EntityCapabilityKey';
  import { Level } from 'net.minecraft.world.level';
  import { LevelChunk } from 'net.minecraft.world.level.chunk';

  interface NeoForgeBlockEntityCapabilityKey<T extends BlockEntity = any, C extends CapabilityComponent<T> = any> extends BlockEntityCapabilityKey<T, C>, NeoForgeCapabilityKey<T, C> {}
  class NeoForgeBlockEntityCapabilityKey<T extends BlockEntity = any, C extends CapabilityComponent<T> = any> extends BlockEntityCapabilityKey<T, C> {
    constructor(holder: DeferredHolder<AttachmentType<any>, AttachmentType<C>>, filter: Predicate<any>);
  }


  interface NeoForgeCapabilityKey<T = any, C extends CapabilityComponent<T> = any> extends CapabilityKey<T, C> {}
  class NeoForgeCapabilityKey<T = any, C extends CapabilityComponent<T> = any> extends CapabilityKey<T, C> {
    constructor(holder: DeferredHolder<AttachmentType<any>, AttachmentType<C>>, filter: Predicate<any>);
    get(holder: T): C;
    identifier(): ResourceLocation;
    isProvidedBy(holder: any): boolean;
  }


  interface NeoForgeEntityCapabilityKey<T extends Entity = any, C extends CapabilityComponent<T> = any> extends EntityCapabilityKeyImpl<T, C>, NeoForgeCapabilityKey<T, C> {}
  class NeoForgeEntityCapabilityKey<T extends Entity = any, C extends CapabilityComponent<T> = any> extends EntityCapabilityKeyImpl<T, C> {
    constructor(holder: DeferredHolder<AttachmentType<any>, AttachmentType<C>>, filter: Predicate<any>);
    get copyStrategy(): CopyStrategy;
    get syncStrategy(): SyncStrategy;
    set copyStrategy(copyStrategy: CopyStrategy);
    set syncStrategy(syncStrategy: SyncStrategy);
  }


  interface NeoForgeLevelCapabilityKey<C extends CapabilityComponent<Level> = any> extends LevelCapabilityKey<C>, NeoForgeCapabilityKey<Level, C> {}
  class NeoForgeLevelCapabilityKey<C extends CapabilityComponent<Level> = any> extends LevelCapabilityKey<C> {
    constructor(holder: DeferredHolder<AttachmentType<any>, AttachmentType<C>>, filter: Predicate<any>);
  }


  interface NeoForgeLevelChunkCapabilityKey<C extends CapabilityComponent<LevelChunk> = any> extends LevelChunkCapabilityKey<C>, NeoForgeCapabilityKey<LevelChunk, C> {}
  class NeoForgeLevelChunkCapabilityKey<C extends CapabilityComponent<LevelChunk> = any> extends LevelChunkCapabilityKey<C> {
    constructor(holder: DeferredHolder<AttachmentType<any>, AttachmentType<C>>, filter: Predicate<any>);
  }

}

declare module 'fuzs.puzzleslib.neoforge.impl.capability.data.NeoForgeCapabilityKey' {
  import { BiFunction, Predicate } from 'java.util.function';
  import { DeferredHolder } from 'net.neoforged.neoforge.registries';

  interface Factory<T = any, C extends CapabilityComponent<T> = any, K extends CapabilityKey<T, C> = any> extends BiFunction<DeferredHolder, Predicate, K> {}
  class Factory<T = any, C extends CapabilityComponent<T> = any, K extends CapabilityKey<T, C> = any> extends BiFunction<DeferredHolder, Predicate, K> {
  }

}

declare module 'fuzs.puzzleslib.neoforge.impl.capability' {
  import { CapabilityController } from 'fuzs.puzzleslib.api.capability.v3';
  import { Mutable } from 'fuzs.puzzleslib.api.capability.v3.data.EntityCapabilityKey';
  import { Class } from 'java.lang';
  import { Supplier } from 'java.util.function';
  import { Entity } from 'net.minecraft.world.entity';
  import { CapabilityComponent, BlockEntityCapabilityKey, LevelChunkCapabilityKey, LevelCapabilityKey } from 'fuzs.puzzleslib.api.capability.v3.data';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { LevelChunk } from 'net.minecraft.world.level.chunk';
  import { Level } from 'net.minecraft.world.level';
  import { IAttachmentHolder } from 'net.neoforged.neoforge.attachment';

  interface NeoForgeCapabilityController extends CapabilityController {}
  class NeoForgeCapabilityController extends CapabilityController {
    constructor(modId: string);
    static lambda$registerCapability$0(capabilityFactory: Supplier, capabilityKey: any[], attachmentHolder: IAttachmentHolder): CapabilityComponent;
    registerBlockEntityCapability<T extends BlockEntity, C extends CapabilityComponent<T>>(identifier: string, capabilityType: Class<C>, capabilityFactory: Supplier<C>, blockEntityType: Class<T>): BlockEntityCapabilityKey<T, C>;
    registerEntityCapability<T extends Entity, C extends CapabilityComponent<T>>(identifier: string, capabilityType: Class<C>, capabilityFactory: Supplier<C>, entityType: Class<T>): Mutable<T, C>;
    registerLevelCapability<C extends CapabilityComponent<Level>>(identifier: string, capabilityType: Class<C>, capabilityFactory: Supplier<C>): LevelCapabilityKey<C>;
    registerLevelChunkCapability<C extends CapabilityComponent<LevelChunk>>(identifier: string, capabilityType: Class<C>, capabilityFactory: Supplier<C>): LevelChunkCapabilityKey<C>;
  }

}

declare module 'fuzs.puzzleslib.neoforge.impl.client.commands' {
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { BiConsumer } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';
  import { Enum, Class } from 'java.lang';
  import { SharedSuggestionProvider } from 'net.minecraft.commands';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Suggestions, SuggestionsBuilder } from 'com.mojang.brigadier.suggestion';
  import { CommandContext } from 'com.mojang.brigadier.context';
  import { StringRepresentableArgument } from 'net.minecraft.commands.arguments';

  class NeoForgeConfigCommand {
    static enumConstant<T extends Enum<T>>(enumClazz: Class<T>): StringRepresentableArgument<T>;
    listSuggestions<S>(context: CommandContext<S>, builder: SuggestionsBuilder): CompletableFuture<Suggestions>;
    static register<T extends Enum<T>, P extends SharedSuggestionProvider>(dispatcher: CommandDispatcher<P>, feedbackSender: BiConsumer<P, Component>): void;
  }

}

declare module 'fuzs.puzzleslib.neoforge.impl.client.core' {
  import { ClientAbstractions, ClientModConstructor } from 'fuzs.puzzleslib.api.client.core.v1';
  import { ClientPacketListener } from 'net.minecraft.client.multiplayer';
  import { Type } from 'CustomPacketPayload';
  import { KeyMapping } from 'net.minecraft.client';
  import { ClientTooltipComponent, ClientTooltipPositioner } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { TooltipComponent } from 'net.minecraft.world.inventory.tooltip';
  import { BakedModel, ModelManager } from 'net.minecraft.client.resources.model';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { Block } from 'net.minecraft.world.level.block';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { GuiGraphics, Font, Gui } from 'net.minecraft.client.gui';
  import { List, Set } from 'java.util';
  import { ClientFactories } from 'fuzs.puzzleslib.impl.client.core';
  import { ContentRegistrationFlags } from 'fuzs.puzzleslib.api.core.v1';
  import { ItemDisplayOverridesImpl } from 'fuzs.puzzleslib.impl.client.init';
  import { KeyMappingHelper } from 'fuzs.puzzleslib.api.client.key.v1';

  interface NeoForgeClientAbstractions extends ClientAbstractions {}
  class NeoForgeClientAbstractions extends ClientAbstractions {
    addGuiLeftHeight(gui: Gui, leftHeight: number): void;
    addGuiRightHeight(gui: Gui, rightHeight: number): void;
    createImageComponent(imageComponent: TooltipComponent): ClientTooltipComponent;
    getBakedModel(modelManager: ModelManager, resourceLocation: ResourceLocation): BakedModel;
    getBakedModel(resourceLocation: ResourceLocation): BakedModel;
    getGuiLeftHeight(gui: Gui): number;
    getGuiRightHeight(gui: Gui): number;
    getRenderType(block: Block): RenderType;
    getRenderType(fluid: Fluid): RenderType;
    hasChannel(clientPacketListener: ClientPacketListener, type: Type<any>): boolean;
    isKeyActiveAndMatches(keyMapping: KeyMapping, keyCode: number, scanCode: number): boolean;
    onRenderTooltip(guiGraphics: GuiGraphics, font: Font, mouseX: number, mouseY: number, components: ClientTooltipComponent[], positioner: ClientTooltipPositioner): boolean;
    registerRenderType(block: Block, renderType: RenderType): void;
    registerRenderType(fluid: Fluid, renderType: RenderType): void;
  }


  interface NeoForgeClientFactories extends ClientFactories {}
  class NeoForgeClientFactories extends ClientFactories {
    constructClientMod(modId: string, modConstructor: ClientModConstructor, availableFlags: Set<ContentRegistrationFlags>, flagsToHandle: Set<ContentRegistrationFlags>): void;
    get itemModelDisplayOverrides(): ItemDisplayOverridesImpl;
    get keyMappingActivationHelper(): KeyMappingHelper;
  }


  class NeoForgeClientModConstructor {
    static construct(constructor: ClientModConstructor, modId: string, availableFlags: Set<ContentRegistrationFlags>, flagsToHandle: Set<ContentRegistrationFlags>): void;
  }

}

declare module 'fuzs.puzzleslib.neoforge.impl.client.event' {
  class NeoForgeClientEventInvokers {
    static registerEventHandlers(): void;
    static registerLoadingHandlers(): void;
  }

}

declare module 'fuzs.puzzleslib.neoforge.impl.client.init' {
  import { ItemDisplayOverridesImpl } from 'fuzs.puzzleslib.impl.client.init';
  import { BakedModelKey } from 'fuzs.puzzleslib.neoforge.impl.client.init.NeoForgeItemDisplayOverrides';
  import { ModelResourceLocation, BakedModel } from 'net.minecraft.client.resources.model';
  import { ItemDisplayContext } from 'net.minecraft.world.item';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';

  interface NeoForgeItemDisplayOverrides extends ItemDisplayOverridesImpl<BakedModelKey> {}
  class NeoForgeItemDisplayOverrides extends ItemDisplayOverridesImpl<BakedModelKey> {
    applyTransform(itemDisplayContext: ItemDisplayContext, poseStack: PoseStack, applyLeftHandTransform: boolean): BakedModel;
    getModel(modelResourceLocation: ModelResourceLocation): BakedModel;
    getModel(resourceLocation: ResourceLocation): BakedModel;
    register(itemModel: ModelResourceLocation, itemModelOverride: ModelResourceLocation, ...itemDisplayContexts: ItemDisplayContext[]): void;
    register(itemModel: ModelResourceLocation, itemModelOverride: ResourceLocation, ...itemDisplayContexts: ItemDisplayContext[]): void;
  }

}

declare module 'fuzs.puzzleslib.neoforge.impl.client.key' {
  import { KeyMappingHelper, KeyActivationContext } from 'fuzs.puzzleslib.api.client.key.v1';
  import { BiMap } from 'com.google.common.collect';
  import { KeyMapping } from 'net.minecraft.client';

  interface NeoForgeKeyMappingHelper extends KeyMappingHelper {}
  class NeoForgeKeyMappingHelper extends KeyMappingHelper {
    static readonly KEY_CONTEXTS: BiMap;
    getKeyActivationContext(keyMapping: KeyMapping): KeyActivationContext;
  }

}

declare module 'fuzs.puzzleslib.neoforge.impl.client' {
  class PuzzlesLibNeoForgeClient {
    constructor();
  }

}

declare module 'fuzs.puzzleslib.neoforge.impl.core' {
  import { CommonAbstractions, ModLoaderEnvironment, ModLoader, ModContainer, ModConstructor, ContentRegistrationFlags } from 'fuzs.puzzleslib.api.core.v1';
  import { MinecraftServer } from 'net.minecraft.server';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Type } from 'CustomPacketPayload';
  import { MenuProvider, InteractionHand } from 'net.minecraft.world';
  import { BiConsumer, Function } from 'java.util.function';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { Entity, EntityType, EquipmentSlot, LivingEntity, MobSpawnType, Mob } from 'net.minecraft.world.entity';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level, Explosion } from 'net.minecraft.world.level';
  import { BlockPos, Holder } from 'net.minecraft.core';
  import { ItemStack } from 'net.minecraft.world.item';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Metadata } from 'Pack';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Component } from 'net.minecraft.network.chat';
  import { PackCompatibility, RepositorySource } from 'net.minecraft.server.packs.repository';
  import { FeatureFlagSet } from 'net.minecraft.world.flag';
  import { Enchantment } from 'net.minecraft.world.item.enchantment';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { Multimap } from 'com.google.common.collect';
  import { BiomeLoadingPhase } from 'fuzs.puzzleslib.api.biome.v1';
  import { BiomeModification } from 'fuzs.puzzleslib.neoforge.impl.core.NeoForgeBiomeLoadingHandler';
  import { PackType } from 'net.minecraft.server.packs';
  import { ResourceOutput } from 'PackResources';
  import { ClientProxyImpl, CommonFactories, ModContext, ProxyImpl } from 'fuzs.puzzleslib.impl.core';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Void } from 'java.lang';
  import { CustomPacketPayloadAdapter } from 'fuzs.puzzleslib.impl.network.codec';
  import { IPayloadContext } from 'net.neoforged.neoforge.network.handling';
  import { ClientboundMessage, ServerboundMessage } from 'fuzs.puzzleslib.api.network.v3';
  import { Path } from 'java.nio.file';
  import { Map, Set, Collection, Optional } from 'java.util';
  import { RegistryFactory, RegistryManager } from 'fuzs.puzzleslib.api.init.v3.registry';
  import { GameRulesFactory } from 'fuzs.puzzleslib.api.init.v3';
  import { ToolTypeHelper } from 'fuzs.puzzleslib.api.item.v2';
  import { CombinedIngredients } from 'fuzs.puzzleslib.api.item.v2.crafting';
  import { AbstractTagAppender } from 'fuzs.puzzleslib.api.data.v2.tags';
  import { TagBuilder } from 'net.minecraft.tags';
  import { DataAttachmentRegistryImpl } from 'fuzs.puzzleslib.impl.attachment';
  import { IModInfo } from 'net.neoforged.neoforgespi.language';
  import { URI } from 'java.net';
  import { Builder } from 'fuzs.puzzleslib.api.network.v3.NetworkHandler';
  import { Builder as fuzs_puzzleslib_api_config_v3_configholder_Builder } from 'fuzs.puzzleslib.api.config.v3.ConfigHolder';
  import { CapabilityController } from 'fuzs.puzzleslib.api.capability.v3';

  interface NeoForgeAbstractions extends CommonAbstractions {}
  class NeoForgeAbstractions extends CommonAbstractions {
    canApplyAtEnchantingTable(enchantment: Holder<Enchantment>, itemStack: ItemStack): boolean;
    canEquip(stack: ItemStack, slot: EquipmentSlot, entity: LivingEntity): boolean;
    createPackInfo(id: ResourceLocation, description: Component, packCompatibility: PackCompatibility, features: FeatureFlagSet, hidden: boolean): Metadata;
    get minecraftServer(): MinecraftServer;
    getEnchantPowerBonus(state: BlockState, level: Level, pos: BlockPos): number;
    getMobGriefingRule(level: Level, entity: Entity): boolean;
    getMobLootingLevel(target: Entity, attacker: Entity, damageSource: DamageSource): number;
    getMobSpawnType(mob: Mob): MobSpawnType;
    getPartEntityParent(entity: Entity): Entity;
    hasChannel(serverPlayer: ServerPlayer, type: Type<any>): boolean;
    isBookEnchantable(inputStack: ItemStack, bookStack: ItemStack): boolean;
    isBossMob(type: EntityType<any>): boolean;
    onExplosionStart(level: Level, explosion: Explosion): boolean;
    onPlayerDestroyItem(player: Player, originalItemStack: ItemStack, interactionHand: InteractionHand): void;
    openMenu(player: ServerPlayer, menuProvider: MenuProvider, dataWriter: BiConsumer<ServerPlayer, RegistryFriendlyByteBuf>): void;
  }


  class NeoForgeBiomeLoadingHandler {
    static buildPack(modId: string): RepositorySource;
    listResources(packType: PackType, namespace: string, path: string, resourceOutput: ResourceOutput): void;
    static register(modId: string, modEventBus: IEventBus, biomeModifications: Multimap<BiomeLoadingPhase, BiomeModification>): void;
  }


  interface NeoForgeClientProxy extends ClientProxyImpl, NeoForgeServerProxy {}
  class NeoForgeClientProxy extends ClientProxyImpl {
    registerClientReceiver<M1, M2>(payload: CustomPacketPayloadAdapter<M1>, context: IPayloadContext, adapter: Function<M1, ClientboundMessage<M2>>): CompletableFuture<Void>;
  }


  interface NeoForgeEnvironment extends ModLoaderEnvironment {}
  class NeoForgeEnvironment extends ModLoaderEnvironment {
    get configDirectory(): Path;
    get currentMappingsNamespace(): string;
    get gameDirectory(): Path;
    get modList(): Map<string, ModContainer>;
    get modLoader(): ModLoader;
    get modsDirectory(): Path;
    isClient(): boolean;
    isDataGeneration(): boolean;
    isDevelopmentEnvironment(): boolean;
    isServer(): boolean;
  }


  interface NeoForgeFactories extends CommonFactories {}
  class NeoForgeFactories extends CommonFactories {
    constructMod(modId: string, modConstructor: ModConstructor, availableFlags: Set<ContentRegistrationFlags>, flagsToHandle: Set<ContentRegistrationFlags>): void;
    get clientProxy(): ProxyImpl;
    get combinedIngredients(): CombinedIngredients;
    get dataAttachmentRegistry(): DataAttachmentRegistryImpl;
    get gameRulesFactory(): GameRulesFactory;
    get registryFactory(): RegistryFactory;
    get serverProxy(): ProxyImpl;
    get toolTypeHelper(): ToolTypeHelper;
    getModContext(modId: string): ModContext;
    getTagAppender<T>(tagBuilder: TagBuilder, keyExtractor: Function<T, ResourceKey<T>>): AbstractTagAppender<T>;
    registerEventHandlers(): void;
    registerLoadingHandlers(): void;
  }


  class NeoForgeModConstructor {
    static construct(constructor: ModConstructor, modId: string, availableFlags: Set<ContentRegistrationFlags>, flagsToHandle: Set<ContentRegistrationFlags>): void;
  }


  interface NeoForgeModContainer extends ModContainer {}
  class NeoForgeModContainer extends ModContainer {
    constructor(metadata: IModInfo);
    findResource(...path: string[]): Optional<Path>;
    get authors(): Collection<string>;
    get children(): Collection<ModContainer>;
    get contactTypes(): Map<string, string>;
    get credits(): Collection<string>;
    get description(): string;
    get displayName(): string;
    get licenses(): Collection<string>;
    get modId(): string;
    get parent(): ModContainer;
    get uRI(): URI;
    get version(): string;
    static getDisplayName(modId: string): string;
    set parent(parent: NeoForgeModContainer);
  }


  interface NeoForgeModContext extends ModContext {}
  class NeoForgeModContext extends ModContext {
    constructor(modId: string);
    get capabilityController(): CapabilityController;
    get configHolder(): fuzs_puzzleslib_api_config_v3_configholder_Builder;
    get registryManager(): RegistryManager;
    getNetworkHandler(channelName: ResourceLocation): Builder;
  }


  interface NeoForgeProxy extends ProxyImpl {}
  class NeoForgeProxy extends ProxyImpl {
    registerClientReceiver<M1, M2>(var1: CustomPacketPayloadAdapter<M1>, var2: IPayloadContext, var3: Function<M1, ClientboundMessage<M2>>): CompletableFuture<Void>;
    registerServerReceiver<M1, M2>(var1: CustomPacketPayloadAdapter<M1>, var2: IPayloadContext, var3: Function<M1, ServerboundMessage<M2>>): CompletableFuture<Void>;
  }


  interface NeoForgeServerProxy extends NeoForgeProxy {}
  class NeoForgeServerProxy extends NeoForgeProxy {
    registerClientReceiver<M1, M2>(payload: CustomPacketPayloadAdapter<M1>, context: IPayloadContext, adapter: Function<M1, ClientboundMessage<M2>>): CompletableFuture<Void>;
    registerServerReceiver<M1, M2>(payload: CustomPacketPayloadAdapter<M1>, context: IPayloadContext, adapter: Function<M1, ServerboundMessage<M2>>): CompletableFuture<Void>;
  }

}

declare module 'fuzs.puzzleslib.neoforge.impl.data' {
  import { ExistingFileHelper } from 'net.neoforged.neoforge.common.data';
  import { AbstractTagAppender } from 'fuzs.puzzleslib.api.data.v2.tags';
  import { TagBuilder } from 'net.minecraft.tags';
  import { Function } from 'java.util.function';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { List } from 'java.util';

  class FileHelperDataProvider {
    puzzleslib$setExistingFileHelper(var1: ExistingFileHelper): void;
  }


  interface NeoForgeTagAppender<T = any> extends AbstractTagAppender<T> {}
  class NeoForgeTagAppender<T = any> extends AbstractTagAppender<T> {
    constructor(tagBuilder: TagBuilder, keyExtractor: Function<T, ResourceKey<T>>);
    asStringList(): string[];
    remove(resourceLocation: ResourceLocation): AbstractTagAppender<T>;
    removeTag(resourceLocation: ResourceLocation): AbstractTagAppender<T>;
    setReplace(replace: boolean): AbstractTagAppender<T>;
  }

}

declare module 'fuzs.puzzleslib.neoforge.impl.init' {
  import { GameRulesFactory } from 'fuzs.puzzleslib.api.init.v3';
  import { Key, Category, Type, Value, BooleanValue, IntegerValue } from 'GameRules';
  import { BiConsumer, Supplier } from 'java.util.function';
  import { MinecraftServer } from 'net.minecraft.server';
  import { RegistryFactory, ExtendedMenuSupplier } from 'fuzs.puzzleslib.api.init.v3.registry';
  import { Registry, Holder } from 'net.minecraft.core';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { RegistryManagerImpl } from 'fuzs.puzzleslib.impl.init';
  import { Reference } from 'Holder';
  import { Item } from 'net.minecraft.world.item';
  import { EntityType, Mob } from 'net.minecraft.world.entity';
  import { Properties } from 'Item';
  import { MenuType, AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { PoiType } from 'net.minecraft.world.entity.ai.village.poi';
  import { Set } from 'java.util';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { ArgumentTypeInfo } from 'net.minecraft.commands.synchronization';
  import { Class } from 'java.lang';
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { Template } from 'ArgumentTypeInfo';
  import { EntityDataSerializer } from 'net.minecraft.network.syncher';

  interface NeoForgeGameRulesFactory extends GameRulesFactory {}
  class NeoForgeGameRulesFactory extends GameRulesFactory {
    createBooleanRule(defaultValue: boolean, callback: BiConsumer<MinecraftServer, BooleanValue>): Type<BooleanValue>;
    createBooleanRule(defaultValue: boolean): Type<BooleanValue>;
    createIntRule(defaultValue: number, minimumValue: number, maximumValue: number, callback: BiConsumer<MinecraftServer, IntegerValue>): Type<IntegerValue>;
    createIntRule(defaultValue: number): Type<IntegerValue>;
    createIntRule(defaultValue: number, minimumValue: number): Type<IntegerValue>;
    createIntRule(defaultValue: number, minimumValue: number, maximumValue: number): Type<IntegerValue>;
    createIntRule(defaultValue: number, callback: BiConsumer<MinecraftServer, IntegerValue>): Type<IntegerValue>;
    createIntRule(defaultValue: number, minimumValue: number, callback: BiConsumer<MinecraftServer, IntegerValue>): Type<IntegerValue>;
    register<T extends Value<T>>(name: string, category: Category, type: Type<T>): Key<T>;
  }


  interface NeoForgeRegistryFactory extends RegistryFactory {}
  class NeoForgeRegistryFactory extends RegistryFactory {
    create<T>(registryKey: ResourceKey<Registry<T>>, synced: boolean): Registry<T>;
    create<T>(registryKey: ResourceKey<Registry<T>>, defaultKey: ResourceLocation, synced: boolean): Registry<T>;
    create<T>(registryKey: ResourceKey<Registry<T>>): Registry<T>;
    create<T>(registryKey: ResourceKey<Registry<T>>, defaultKey: string): Registry<T>;
    create<T>(registryKey: ResourceKey<Registry<T>>, defaultKey: string, synced: boolean): Registry<T>;
    register<T>(registry: Registry<T>): Registry<T>;
  }


  interface NeoForgeRegistryManager extends RegistryManagerImpl {}
  class NeoForgeRegistryManager extends RegistryManagerImpl {
    constructor(modId: string);
    registerArgumentType<A extends ArgumentType<any>, T extends Template<A>>(path: string, argumentClass: Class<A>, argumentTypeInfo: ArgumentTypeInfo<A, T>): Reference<ArgumentTypeInfo<any, any>>;
    registerEntityDataSerializer<T>(path: string, entry: Supplier<EntityDataSerializer<T>>): Reference<EntityDataSerializer<T>>;
    registerExtendedMenuType<T extends AbstractContainerMenu>(path: string, entry: Supplier<ExtendedMenuSupplier<T>>): Reference<MenuType<T>>;
    registerLazily<T>(registryKey: ResourceKey<Registry<T>>, path: string): Reference<T>;
    registerPoiType(path: string, matchingStates: Supplier<Set<BlockState>>, maxTickets: number, validRange: number): Reference<PoiType>;
    registerSpawnEggItem(entityTypeReference: Holder<EntityType<Mob>>, backgroundColor: number, highlightColor: number, itemProperties: Properties): Reference<Item>;
  }

}

declare module 'fuzs.puzzleslib.neoforge.impl.item.crafting' {
  import { CombinedIngredients } from 'fuzs.puzzleslib.api.item.v2.crafting';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ItemLike } from 'net.minecraft.world.level';
  import { DataComponentPatch } from 'net.minecraft.core.component';

  interface NeoForgeCombinedIngredients extends CombinedIngredients {}
  class NeoForgeCombinedIngredients extends CombinedIngredients {
    all(...ingredients: Ingredient[]): Ingredient;
    any(...ingredients: Ingredient[]): Ingredient;
    components(itemStack: ItemStack): Ingredient;
    components(item: ItemLike, components: DataComponentPatch): Ingredient;
    difference(ingredient: Ingredient, subtracted: Ingredient): Ingredient;
  }

}

declare module 'fuzs.puzzleslib.neoforge.impl.item' {
  import { ToolTypeHelper } from 'fuzs.puzzleslib.api.item.v2';
  import { ItemStack } from 'net.minecraft.world.item';

  interface NeoForgeToolTypeHelper extends ToolTypeHelper {}
  class NeoForgeToolTypeHelper extends ToolTypeHelper {
    isArmor(itemStack: ItemStack): boolean;
    isAxe(itemStack: ItemStack): boolean;
    isBow(itemStack: ItemStack): boolean;
    isBrush(itemStack: ItemStack): boolean;
    isCrossbow(itemStack: ItemStack): boolean;
    isFishingRod(itemStack: ItemStack): boolean;
    isHoe(itemStack: ItemStack): boolean;
    isMace(itemStack: ItemStack): boolean;
    isMeleeWeapon(itemStack: ItemStack): boolean;
    isMiningTool(itemStack: ItemStack): boolean;
    isPickaxe(itemStack: ItemStack): boolean;
    isRangedWeapon(itemStack: ItemStack): boolean;
    isShears(itemStack: ItemStack): boolean;
    isShield(itemStack: ItemStack): boolean;
    isShovel(itemStack: ItemStack): boolean;
    isSword(itemStack: ItemStack): boolean;
    isTool(itemStack: ItemStack): boolean;
    isTridentLike(itemStack: ItemStack): boolean;
  }

}

declare module 'fuzs.puzzleslib.neoforge.impl.network' {
  import { NetworkHandlerRegistryImpl } from 'fuzs.puzzleslib.impl.network';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Class } from 'java.lang';
  import { Packet } from 'net.minecraft.network.protocol';
  import { ClientCommonPacketListener, ServerCommonPacketListener } from 'net.minecraft.network.protocol.common';
  import { ClientboundMessage, ServerboundMessage } from 'fuzs.puzzleslib.api.network.v3';

  interface NeoForgeNetworkHandler extends NetworkHandlerRegistryImpl {}
  class NeoForgeNetworkHandler extends NetworkHandlerRegistryImpl {
    constructor(channelName: ResourceLocation);
    build(): void;
    registerClientbound$Internal<T extends Record>(clazz: Class<any>): void;
    registerServerbound$Internal<T extends Record>(clazz: Class<any>): void;
    toClientboundPacket<T>(message: ClientboundMessage<T>): Packet<ClientCommonPacketListener>;
    toServerboundPacket<T>(message: ServerboundMessage<T>): Packet<ServerCommonPacketListener>;
  }

}

declare module 'fuzs.puzzleslib.neoforge.impl' {
  class PuzzlesLibNeoForge {
    constructor();
  }

}

declare module 'fuzs.puzzleslib.neoforge.mixin' {
  import { ItemStack } from 'net.minecraft.world.item';
  import { LootContext } from 'net.minecraft.world.level.storage.loot';
  import { CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Holder } from 'net.minecraft.core';
  import { FileHelperDataProvider } from 'fuzs.puzzleslib.neoforge.impl.data';
  import { ExistingFileHelper } from 'net.neoforged.neoforge.common.data';

  class AbstractPackResourcesNeoForgeMixin {
  }


  class DatagenModLoaderNeoForgeMixin {
  }


  class EnchantedCountIncreaseFunctionNeoForgeMixin {
    run(enchantmentLevel: number, itemStack: ItemStack, lootContext: LootContext): number;
    run(stack: ItemStack, context: LootContext, callback: CallbackInfoReturnable<ItemStack>): void;
  }


  class EnchantmentHelperNeoForgeMixin {
  }


  class LootItemRandomChanceWithEnchantedBonusConditionNeoForgeMixin {
    enchantment: Holder;
    test(enchantmentLevel: number, lootContext: LootContext): number;
  }


  interface TagsProviderNeoForgeMixin<T = any> extends FileHelperDataProvider {}
  class TagsProviderNeoForgeMixin<T = any> extends FileHelperDataProvider {
    puzzleslib$setExistingFileHelper(fileHelper: ExistingFileHelper): void;
  }

}

declare module 'fuzs.puzzleslib.neoforge.mixin.accessor' {
  import { Optional, Map } from 'java.util';
  import { Integer } from 'java.lang';
  import { AmbientParticleSettings, AmbientMoodSettings, AmbientAdditionsSettings } from 'net.minecraft.world.level.biome';
  import { Holder } from 'net.minecraft.core';
  import { SoundEvent, Music } from 'net.minecraft.sounds';
  import { EntityType } from 'net.minecraft.world.entity';
  import { MobSpawnCost } from 'MobSpawnSettings';
  import { NewRegistryEvent } from 'net.neoforged.neoforge.registries';

  class BiomeSpecialEffectsBuilderNeoForgeAccessor {
    puzzleslib$setAmbientAdditionsSettings(var1: Optional<AmbientAdditionsSettings>): void;
    puzzleslib$setAmbientLoopSoundEvent(var1: Optional<Holder<SoundEvent>>): void;
    puzzleslib$setAmbientMoodSettings(var1: Optional<AmbientMoodSettings>): void;
    puzzleslib$setAmbientParticle(var1: Optional<AmbientParticleSettings>): void;
    puzzleslib$setBackgroundMusic(var1: Optional<Music>): void;
    puzzleslib$setFoliageColorOverride(var1: Optional<number>): void;
    puzzleslib$setGrassColorOverride(var1: Optional<number>): void;
  }


  class MobSpawnSettingsBuilderNeoForgeAccessor {
    puzzleslib$getMobSpawnCosts(): Map<EntityType<any>, MobSpawnCost>;
  }


  class NewRegistryEventNeoForgeAccessor {
    puzzleslib$callFill(): void;
    static puzzleslib$callInit(): NewRegistryEvent;
  }

}

declare module 'fuzs.puzzleslib.neoforge.mixin.client.accessor' {
  import { Map } from 'java.util';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockColor } from 'net.minecraft.client.color.block';
  import { Item } from 'net.minecraft.world.item';
  import { ItemColor } from 'net.minecraft.client.color.item';

  class BlockColorsNeoForgeAccessor {
    puzzleslib$getBlockColors(): Map<Block, BlockColor>;
  }


  class ItemColorsNeoForgeAccessor {
    puzzleslib$getItemColors(): Map<Item, ItemColor>;
  }

}