declare module 'org.embeddedt.modernfix.api.constants' {
  class IntegrationConstants {
    static readonly INTEGRATIONS_KEY: string;
    static readonly CLIENT_INTEGRATION_CLASS: string;
    static readonly INTEGRATION_CLASS: string;
  }

}

declare module 'org.embeddedt.modernfix.api.entrypoint' {
  import { BakedModel, ModelResourceLocation, UnbakedModel, ModelState, ModelBakery } from 'net.minecraft.client.resources.model';
  import { TextureGetter } from 'ModelBakery';

  class ModernFixClientIntegration {
    onBakedModelLoad(location: ModelResourceLocation, baseModel: UnbakedModel, originalModel: BakedModel, state: ModelState, bakery: ModelBakery, textureGetter: TextureGetter): BakedModel;
    onDynamicResourcesStatusChange(enabled: boolean): void;
  }

}

declare module 'org.embeddedt.modernfix.api.helpers' {
  import { ImmutableList } from 'com.google.common.collect';
  import { BlockState, StateDefinition } from 'net.minecraft.world.level.block.state';
  import { ModelResourceLocation, BakedModel, ModelState, ModelBaker, ModelBakery } from 'net.minecraft.client.resources.model';
  import { Block } from 'net.minecraft.world.level.block';
  import { Map } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { BiFunction } from 'java.util.function';

  class ModelHelpers {
    static adaptBakery(bakery: ModelBakery): ModelBaker;
    static createFakeTopLevelMap(modelGetter: BiFunction<ResourceLocation, ModelState, BakedModel>): Map<ResourceLocation, BakedModel>;
    static getBlockStateForLocation(location: ModelResourceLocation): ImmutableList<BlockState>;
    static getBlockStateForLocation(definition: StateDefinition<Block, BlockState>, location: ModelResourceLocation): ImmutableList<BlockState>;
  }

}

declare module 'org.embeddedt.modernfix.blockstate' {
  import { Map, Set, Iterator, Collection } from 'java.util';
  import { Property } from 'net.minecraft.world.level.block.state.properties';
  import { Comparable } from 'java.lang';
  import { Entry } from 'Map';

  class BlockStateCacheHandler {
    static invalidateCache(): void;
  }


  interface FakeStateMap<S = any> extends Map<Map, S> {}
  class FakeStateMap<S = any> extends Map<Map, S> {
    constructor(numStates: number);
    clear(): void;
    containsKey(o: any): boolean;
    containsValue(o: any): boolean;
    entrySet(): Set<Entry<Map<Property<any>, Comparable<any>>, S>>;
    get(o: any): S;
    hasNext(): boolean;
    isEmpty(): boolean;
    iterator(): Iterator<Map<Property<any>, Comparable<any>>>;
    iterator(): Iterator<Entry<Map<Property<any>, Comparable<any>>, S>>;
    keySet(): Set<Map<Property<any>, Comparable<any>>>;
    next(): Entry<Map<Property<any>, Comparable<any>>, S>;
    put(propertyComparableMap: Map<Property<any>, Comparable<any>>, s: S): S;
    putAll(map: Map<Map<Property<any>, Comparable<any>>, S>): void;
    remove(o: any): S;
    size(): number;
    size(): number;
    size(): number;
    values(): Collection<S>;
  }

}

declare module 'org.embeddedt.modernfix.command' {
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack } from 'net.minecraft.commands';

  class ModernFixCommands {
    static register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.bugfix.chunk_deadlock' {
  class EntityMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.bugfix.cofh_core_crash' {
  class FlagManagerMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.bugfix.ctm_resourceutil_cme' {
  class ResourceUtilMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.bugfix.ender_dragon_leak' {
  class EnderDragonRendererMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.bugfix.entity_pose_stack' {
  import { Deque } from 'java.util';
  import { Pose } from 'PoseStack';

  class LivingEntityRendererMixin {
  }


  class PlayerRendererMixin {
  }


  class PoseStackAccessor {
    get poseStack(): Deque<Pose>;
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.bugfix.extra_experimental_screen' {
  class CreateWorldScreenMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.bugfix.missing_block_entities' {
  import { ChunkAccess, UpgradeData, LevelChunkSection } from 'net.minecraft.world.level.chunk';
  import { ChunkPos, LevelHeightAccessor } from 'net.minecraft.world.level';
  import { Registry, BlockPos } from 'net.minecraft.core';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { BlendingData } from 'net.minecraft.world.level.levelgen.blending';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { EntityCreationType } from 'LevelChunk';

  interface LevelChunkMixin extends ChunkAccess {}
  class LevelChunkMixin extends ChunkAccess {
    constructor(chunkPos: ChunkPos, upgradeData: UpgradeData, levelHeightAccessor: LevelHeightAccessor, biomeRegistry: Registry<Biome>, inhabitedTime: number, sections: LevelChunkSection[], blendingData: BlendingData);
    getBlockEntity(var1: BlockPos, var2: EntityCreationType): BlockEntity;
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.bugfix.paper_chunk_patches' {
  import { AbstractSet } from 'java.util';
  import { Predicate } from 'java.util.function';

  interface SortedArraySetMixin<T = any> extends AbstractSet<T> {}
  class SortedArraySetMixin<T = any> extends AbstractSet<T> {
    removeIf(filter: Predicate<T>): boolean;
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.bugfix.recipe_book_type_desync' {
  class RecipeBookSettingsMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.bugfix.restore_old_dragon_movement' {
  class EnderDragonMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.bugfix.unsafe_modded_shape_caches' {
  class ShapeCacheCyclicMixin {
  }


  class ShapeCacheRSMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.bugfix.world_leaks' {
  import { ClientLevel } from 'net.minecraft.client.multiplayer';

  class MinecraftMixin {
    level: ClientLevel;
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.bugfix.world_screen_skipped' {
  class WorldSelectionListMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.core' {
  import { ITimeTrackingServer } from 'org.embeddedt.modernfix.duck';

  class BootstrapClientMixin {
  }


  class BootstrapMixin {
  }


  interface MinecraftServerMixin extends ITimeTrackingServer {}
  class MinecraftServerMixin extends ITimeTrackingServer {
    mfix$getLastTickStartTime(): number;
  }


  class WorldLoaderMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.devenv' {
  class MinecraftMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.feature.blockentity_incorrect_thread' {
  import { Thread } from 'java.lang';

  class ChunkAccessMixin {
  }


  class LevelThreadAccessor {
    get thread(): Thread;
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.feature.branding' {
  class BrandingControlMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.feature.cause_lag_by_disabling_threads' {
  class ChunkRenderDispatcherMixin {
  }


  class UtilMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.feature.mcfunction_profiling' {
  import { IProfilingServerFunctionManager } from 'org.embeddedt.modernfix.duck';

  interface ServerFunctionManagerMixin extends IProfilingServerFunctionManager {}
  class ServerFunctionManagerMixin extends IProfilingServerFunctionManager {
    mfix$getProfilingResults(): string;
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.feature.measure_time' {
  import { PreparableReloadListener } from 'net.minecraft.server.packs.resources';
  import { Overlay } from 'net.minecraft.client.gui.screens';

  interface AddReloadListenerEventWrapperMixin extends PreparableReloadListener {}
  class AddReloadListenerEventWrapperMixin extends PreparableReloadListener {
    get name(): string;
  }


  class BootstrapMixin {
  }


  class ConnectScreenMixin {
  }


  class MinecraftMixin {
    overlay: Overlay;
  }


  class MinecraftMixin_Forge {
  }


  class ProfiledReloadInstanceMixin {
  }


  class SimpleReloadInstanceMixin {
  }


  class WorldLoaderMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.feature.registry_event_progress' {
  class GameDataMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.feature.remove_chat_signing' {
  import { ProfileKeyPairManager } from 'net.minecraft.client.multiplayer';
  import { UserApiService } from 'com.mojang.authlib.minecraft';
  import { User } from 'net.minecraft.client';
  import { Path } from 'java.nio.file';

  class ChatTrustLevelMixin {
  }


  class ProfileKeyPairManagerMixin {
    static create(userApiService: UserApiService, user: User, gameDirectory: Path): ProfileKeyPairManager;
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.feature.remove_telemetry' {
  class ClientTelemetryManagerMixin {
  }


  class MinecraftMixin_Telemetry {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.feature.spark_profile_world_join' {
  class MinecraftMixin {
  }


  class WorldLoaderMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.feature.suppress_narrator_stacktrace' {
  class GameNarratorMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.cache_blockstate_cache_arrays' {
  class AbstractBlockStateCacheMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.cache_profile_texture_url' {
  class SkinManagerMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.cache_strongholds' {
  import { IChunkGenerator, IServerLevel } from 'org.embeddedt.modernfix.duck';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { Level } from 'net.minecraft.world.level';
  import { DimensionDataStorage } from 'net.minecraft.world.level.storage';
  import { StrongholdLocationCache } from 'org.embeddedt.modernfix.world';

  interface ChunkGeneratorMixin extends IChunkGenerator {}
  class ChunkGeneratorMixin extends IChunkGenerator {
    mfix$setAssociatedServerLevel(level: ServerLevel): void;
  }


  interface ServerLevelMixin extends IServerLevel, Level {}
  class ServerLevelMixin extends IServerLevel {
    get dataStorage(): DimensionDataStorage;
    mfix$getStrongholdCache(): StrongholdLocationCache;
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.capability_list_compaction' {
  import { ITrackingCapEvent } from 'org.embeddedt.modernfix.neoforge.caps';
  import { Set } from 'java.util';
  import { BaseCapability } from 'net.neoforged.neoforge.capabilities';

  class CapabilityHooksMixin {
  }


  interface RegisterCapabilitiesEventMixin extends ITrackingCapEvent {}
  class RegisterCapabilitiesEventMixin extends ITrackingCapEvent {
    mfix$getTrackedCaps(): Set<BaseCapability<any, any>>;
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.chunk_meshing' {
  class RebuildTaskMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.compact_bit_storage' {
  class PalettedContainerMixin<T = any> {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.compact_mojang_registries' {
  class BlockStateDataMixin {
  }


  class MappedRegistryMixin<T = any> {
  }


  class VanillaRegistriesMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.compress_unihex_font' {
  class UnihexProviderByteContentsMixin {
  }


  class UnihexProviderShortContentsMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.datapack_reload_exceptions' {
  class RecipeManagerMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.dedicated_reload_executor' {
  class CreateWorldScreenMixin {
  }


  class MinecraftMixin {
  }


  class MinecraftServerMixin {
  }


  class WorldOpenFlowsMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.deduplicate_wall_shapes' {
  import { Block } from 'net.minecraft.world.level.block';
  import { Properties } from 'BlockBehaviour';

  interface WallBlockMixin extends Block {}
  class WallBlockMixin extends Block {
    constructor(properties: Properties);
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.dynamic_dfu' {
  class DataFixersMixin {
  }


  class DataFixTypesMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.dynamic_resources' {
  import { BakedModel, ModelResourceLocation, ModelManager, UnbakedModel } from 'net.minecraft.client.resources.model';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { IModelHoldingBlockState, IBlockStateModelLoader, IExtendedModelBakery, IExtendedModelManager } from 'org.embeddedt.modernfix.duck';
  import { ItemModelShaper } from 'net.minecraft.client.renderer';
  import { Item } from 'net.minecraft.world.item';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Map } from 'java.util';
  import { ReentrantLock } from 'java.util.concurrent.locks';

  class BlockModelShaperMixin {
    getBlockModel(state: BlockState): BakedModel;
  }


  interface BlockStateBaseMixin extends IModelHoldingBlockState {}
  class BlockStateBaseMixin extends IModelHoldingBlockState {
    mfix$getModel(): BakedModel;
    mfix$setModel(model: BakedModel): void;
  }


  interface BlockStateModelLoaderMixin extends IBlockStateModelLoader {}
  class BlockStateModelLoaderMixin extends IBlockStateModelLoader {
    loadSpecificBlock(location: ModelResourceLocation): void;
  }


  class ForgeHooksClientMixin {
  }


  interface ItemModelMesherForgeMixin extends ItemModelShaper {}
  class ItemModelMesherForgeMixin extends ItemModelShaper {
    constructor(arg: ModelManager);
    getItemModel(item: Item): BakedModel;
    rebuildCache(): void;
    register(item: Item, location: ModelResourceLocation): void;
  }


  class ItemModelShaperMixin {
    get modelManager(): ModelManager;
    getItemModel(item: Item): BakedModel;
    rebuildCache(): void;
    register(item: Item, location: ModelResourceLocation): void;
  }


  class ItemRendererMixin {
  }


  class MinecraftMixin_ModelTicking {
    get modelManager(): ModelManager;
  }


  class ModelBakerImplMixin {
    getModel(var1: ResourceLocation): UnbakedModel;
    getTopLevelModel(location: ModelResourceLocation): UnbakedModel;
  }


  interface ModelBakeryMixin extends IExtendedModelBakery {}
  class ModelBakeryMixin extends IExtendedModelBakery {
    topLevelModels: Map;
    bakedCache: Map;
    static MISSING_MODEL_VARIANT: ModelResourceLocation;
    get bakedTopLevelModels(): Map<ModelResourceLocation, BakedModel>;
    mfix$finishLoading(): void;
    mfix$getLock(): ReentrantLock;
    mfix$getMissingModel(): UnbakedModel;
    mfix$loadUnbakedModelDynamic(location: ModelResourceLocation): UnbakedModel;
    mfix$tick(): void;
  }


  interface ModelManagerMixin extends IExtendedModelManager {}
  class ModelManagerMixin extends IExtendedModelManager {
    mfix$tick(): void;
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.dynamic_resources.ctm' {
  import { Map } from 'java.util';
  import { BakedCacheKey, TextureGetter } from 'ModelBakery';
  import { BakedModel, ModelResourceLocation, UnbakedModel, ModelState, ModelBakery } from 'net.minecraft.client.resources.model';
  import { ModernFixClientIntegration } from 'org.embeddedt.modernfix.api.entrypoint';

  class CTMModelBakeryAccessor {
    mfix$getBakedCache(): Map<BakedCacheKey, BakedModel>;
  }


  interface TextureMetadataHandlerMixin extends ModernFixClientIntegration {}
  class TextureMetadataHandlerMixin extends ModernFixClientIntegration {
    onBakedModelLoad(mrl: ModelResourceLocation, rootModel: UnbakedModel, baked: BakedModel, state: ModelState, bakery: ModelBakery, getter: TextureGetter): BakedModel;
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.dynamic_resources.ldlib' {
  import { ModernFixClientIntegration } from 'org.embeddedt.modernfix.api.entrypoint';
  import { BakedModel, ModelResourceLocation, UnbakedModel, ModelState, ModelBakery } from 'net.minecraft.client.resources.model';
  import { TextureGetter } from 'ModelBakery';

  interface ClientProxyImplMixin extends ModernFixClientIntegration {}
  class ClientProxyImplMixin extends ModernFixClientIntegration {
    onBakedModelLoad(mrl: ModelResourceLocation, rootModel: UnbakedModel, baked: BakedModel, state: ModelState, bakery: ModelBakery, textureGetter: TextureGetter): BakedModel;
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.dynamic_structure_manager' {
  class StructureManagerMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.encoder_cache_leak' {
  import { EncoderCache } from 'net.minecraft.util';
  import { LoadingCache } from 'com.google.common.cache';

  class DataComponentsAccessor {
    static mfix$getCache(): EncoderCache;
  }


  class EncoderCacheAccessor {
    mfix$getCache(): LoadingCache<any, any>;
  }


  class ReloadableServerResourcesMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.faster_ingredients' {
  import { ExtendedIngredient } from 'org.embeddedt.modernfix.neoforge.recipe';
  import { CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Boolean } from 'java.lang';
  import { ItemStack } from 'net.minecraft.world.item';

  interface IngredientMixin extends ExtendedIngredient {}
  class IngredientMixin extends ExtendedIngredient {
    get items(): ItemStack[];
    hasNoItems(cir: CallbackInfoReturnable<boolean>): void;
    isCustom(): boolean;
    mfix$clearReference(): void;
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.faster_item_rendering' {
  class GameRendererMixin {
  }


  class ItemRendererMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.faster_texture_stitching' {
  class StitcherMixin<T extends Entry = any> {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.fix_loop_spin_waiting' {
  import { BlockableEventLoop } from 'net.minecraft.util.thread';
  import { Runnable } from 'java.lang';

  interface MinecraftServerMixin extends BlockableEventLoop<Runnable> {}
  class MinecraftServerMixin extends BlockableEventLoop<Runnable> {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.ingredient_item_deduplication' {
  import { DataComponentMap, DataComponentType } from 'net.minecraft.core.component';
  import { Reference2ObjectMap } from 'it.unimi.dsi.fastutil.objects';
  import { Optional } from 'java.util';

  class IngredientItemValueMixin {
  }


  class IngredientMixin {
  }


  class PatchedDataComponentMapAccessor {
    mfix$getPatch(): Reference2ObjectMap<DataComponentType<any>, Optional<any>>;
    mfix$getPrototype(): DataComponentMap;
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.lazy_search_tree_registry' {
  class SessionSearchTreesMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.memoize_creative_tab_build' {
  import { Type } from 'CreativeModeTab';

  class CreativeModeTabMixin {
    get type(): Type;
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.model_optimizations' {
  import { List } from 'java.util';
  import { Variant } from 'net.minecraft.client.renderer.block.model';
  import { Function } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { UnbakedModel } from 'net.minecraft.client.resources.model';

  class BooleanPropertyMixin {
  }


  class MultiVariantMixin {
    get variants(): Variant[];
    resolveParents(modelGetter: Function<ResourceLocation, UnbakedModel>): void;
  }


  class PropertyMixin {
    equals(p_equals_1_: any): boolean;
  }


  class SelectorMixin {
  }


  class TransformationMatrixMixin {
    hashCode(): number;
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.mojang_registry_size' {
  class StateHolderMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.patchouli_deduplicate_books' {
  class ClientBookRegistryMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.reduce_blockstate_cache_rebuilds' {
  import { FluidState } from 'net.minecraft.world.level.material';
  import { BlockState, StateHolder } from 'net.minecraft.world.level.block.state';
  import { Block } from 'net.minecraft.world.level.block';
  import { IBlockState } from 'org.embeddedt.modernfix.duck';

  class BlockBehaviourInvoker {
    invokeGetFluidState(var1: BlockState): FluidState;
    invokeIsRandomlyTicking(var1: BlockState): boolean;
  }


  class BlockCallbacksMixin {
  }


  class BlocksMixin {
  }


  interface BlockStateBaseMixin extends IBlockState, StateHolder<Block, BlockState> {}
  class BlockStateBaseMixin extends IBlockState {
    clearCache(): void;
    initCache(): void;
    isCacheInvalid(): boolean;
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.remove_biome_temperature_cache' {
  class BiomeMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.resourcepacks' {
  import { ICachingResourcePack } from 'org.embeddedt.modernfix.resources';

  interface PathPackResourcesMixin extends ICachingResourcePack {}
  class PathPackResourcesMixin extends ICachingResourcePack {
    invalidateCache(): void;
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.smart_ingredient_sync' {
  class ConnectionMixin {
  }


  class IngredientMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.state_definition_construct' {
  class StateDefinitionMixin<O = any, S extends StateHolder<O, S> = any> {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.tag_id_caching' {
  class TagEntryMixin {
  }


  class TagOrElementLocationMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.thread_priorities' {
  class IntegratedServerMixin {
  }


  class UtilMixin {
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.ticking_chunk_alloc' {
  import { Map } from 'java.util';

  class BatMixin {
  }


  class ChunkAccessMixin {
    get allReferences(): Map<any, any>;
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.perf.worldgen_allocation' {
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { FunctionContext } from 'DensityFunction';
  import { LazyCondition } from 'SurfaceRules';

  class MaterialRuleListMixin {
    calculate(arg: FunctionContext): BlockState;
  }


  class NoiseChunkMixin {
  }


  class SequenceRuleMixin {
    tryApply(x: number, y: number, z: number): BlockState;
  }


  class SurfaceRulesContextMixin {
    updateY(stoneDepthAbove: number, stoneDepthBelow: number, waterHeight: number, blockX: number, blockY: number, blockZ: number): void;
  }


  interface SurfaceRulesMixin extends LazyCondition {}
  class SurfaceRulesMixin extends LazyCondition {
    test(): boolean;
  }

}

declare module 'org.embeddedt.modernfix.common.mixin.safety' {
  class BlockColorsMixin {
  }


  class ItemColorsMixin {
  }


  class ItemPropertiesMixin {
  }


  class LivingEntityRendererMixin {
  }

}

declare module 'org.embeddedt.modernfix.core.config' {
  import { Map, Collection, List } from 'java.util';
  import { File } from 'java.io';
  import { Multimap } from 'com.google.common.collect';

  class ModernFixEarlyConfig {
    static readonly OPTIFINE_PRESENT: boolean;
    static isFabric: boolean;
    get optionCategoryMap(): Multimap<string, Option>;
    get optionCount(): number;
    get optionMap(): Map<string, Option>;
    get optionOverrideCount(): number;
    get permanentlyDisabledMixins(): Map<string, string>;
    getEffectiveOptionForMixin(mixinClassName: string): Option;
    static load(file: File): ModernFixEarlyConfig;
    static sanitize(mixinClassName: string): string;
    save(): void;
  }


  class Option {
    constructor(name: string, enabled: boolean, userDefined: boolean);
    addModOverride(enabled: boolean, modId: string): void;
    clearModsDefiningValue(): void;
    clearUserDefined(): void;
    get definingMods(): Collection<string>;
    get depth(): number;
    get name(): string;
    get parent(): Option;
    get selfName(): string;
    isEffectivelyDisabledByParent(): boolean;
    isEnabled(): boolean;
    isModDefined(): boolean;
    isOverridden(): boolean;
    isUserDefined(): boolean;
    set parent(option: Option);
    setEnabled(enabled: boolean, userDefined: boolean): void;
  }


  class OptionCategories {
    static get categoriesInOrder(): string[];
    static getCategoryForOption(optionName: string): string;
    static load(): void;
  }

}

declare module 'org.embeddedt.modernfix.core' {
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { Logger } from 'org.apache.logging.log4j';
  import { ModernFixEarlyConfig } from 'org.embeddedt.modernfix.core.config';
  import { Set, List } from 'java.util';
  import { ClassNode } from 'org.objectweb.asm.tree';

  interface ModernFixMixinPlugin extends IMixinConfigPlugin {}
  class ModernFixMixinPlugin extends IMixinConfigPlugin {
    readonly logger: Logger;
    config: ModernFixEarlyConfig;
    static instance: ModernFixMixinPlugin;
    constructor();
    acceptTargets(myTargets: Set<string>, otherTargets: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    isOptionEnabled(mixin: string): boolean;
    onLoad(mixinPackage: string): void;
    postApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    preApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    run(): void;
    shouldApplyMixin(targetClassName: string, mixinClassName: string): boolean;
  }

}

declare module 'org.embeddedt.modernfix.dfu' {
  class DFUBlaster {
    static blastMaps(): void;
    static kick(): void;
  }

}

declare module 'org.embeddedt.modernfix.dfu.DFUBlaster' {
  import { Thread } from 'java.lang';

  interface CleanerThread extends Thread {}
  class CleanerThread extends Thread {
    run(): void;
  }

}

declare module 'org.embeddedt.modernfix.duck' {
  import { ModelResourceLocation, UnbakedModel, BakedModel } from 'net.minecraft.client.resources.model';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { ReentrantLock } from 'java.util.concurrent.locks';
  import { StrongholdLocationCache } from 'org.embeddedt.modernfix.world';
  import { ChunkGeneratorStructureState } from 'net.minecraft.world.level.chunk';

  class IBlockState {
    clearCache(): void;
    isCacheInvalid(): boolean;
  }


  class IBlockStateModelLoader {
    loadSpecificBlock(var1: ModelResourceLocation): void;
  }


  class IChunkGenerator {
    mfix$setAssociatedServerLevel(var1: ServerLevel): void;
  }


  class IExtendedModelBakery {
    mfix$finishLoading(): void;
    mfix$getLock(): ReentrantLock;
    mfix$getMissingModel(): UnbakedModel;
    mfix$loadUnbakedModelDynamic(var1: ModelResourceLocation): UnbakedModel;
    mfix$tick(): void;
  }


  class IExtendedModelManager {
    mfix$tick(): void;
  }


  class IModelHoldingBlockState {
    mfix$getModel(): BakedModel;
    mfix$setModel(var1: BakedModel): void;
  }


  class IProfilingServerFunctionManager {
    mfix$getProfilingResults(): string;
  }


  class IServerLevel {
    mfix$getStrongholdCache(): StrongholdLocationCache;
  }


  class IStructureCheck {
    mfix$setStructureState(var1: ChunkGeneratorStructureState): void;
  }


  class ITimeTrackingServer {
    mfix$getLastTickStartTime(): number;
  }

}

declare module 'org.embeddedt.modernfix.dynamicresources' {
  import { Function } from 'it.unimi.dsi.fastutil';
  import { BakedModel, UnbakedModel, ModelResourceLocation } from 'net.minecraft.client.resources.model';
  import { Map } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ImmutableList } from 'com.google.common.collect';
  import { BlockState, StateDefinition } from 'net.minecraft.world.level.block.state';
  import { Block } from 'net.minecraft.world.level.block';
  import { Item } from 'net.minecraft.world.item';
  import { RuntimeException } from 'java.lang';

  class DynamicModelCache<K = any> {
    constructor(modelRetriever: Function<K, BakedModel>, allowNulls: boolean);
    clear(): void;
    get(key: K): BakedModel;
  }


  class DynamicModelProvider {
    constructor(initialModels: Map<ResourceLocation, UnbakedModel>);
    getModel(location: ResourceLocation): UnbakedModel;
  }


  class DynamicSoundHelpers {
  }


  class ModelBakeryHelpers {
    static readonly MAX_BAKED_MODEL_COUNT: number;
    static readonly MAX_UNBAKED_MODEL_COUNT: number;
    static readonly MAX_MODEL_LIFETIME_SECS: number;
    static get extraTextureFolders(): string[];
    static getBlockStatesForMRL(stateDefinition: StateDefinition<Block, BlockState>, location: ModelResourceLocation): ImmutableList<BlockState>;
  }


  class ModelLocationCache {
    static get(state: BlockState): ModelResourceLocation;
    static get(item: Item): ModelResourceLocation;
  }


  interface ModelMissingException extends RuntimeException {}
  class ModelMissingException extends RuntimeException {
  }

}

declare module 'org.embeddedt.modernfix.dynamicresources.DynamicSoundHelpers' {
  import { AbstractMap, Map, Set } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { CompletableFuture } from 'java.util.concurrent';
  import { SoundBuffer } from 'com.mojang.blaze3d.audio';
  import { Entry } from 'Map';

  interface Cache extends AbstractMap<ResourceLocation, CompletableFuture> {}
  class Cache extends AbstractMap<ResourceLocation, CompletableFuture> {
    constructor(otherMap: Map<ResourceLocation, CompletableFuture<SoundBuffer>>);
    entrySet(): Set<Entry<ResourceLocation, CompletableFuture<SoundBuffer>>>;
    get(key: any): CompletableFuture<SoundBuffer>;
    put(key: ResourceLocation, value: CompletableFuture<SoundBuffer>): CompletableFuture<SoundBuffer>;
  }


  class SoundBufAccess {
    mfix$getDurationNanos(): number;
  }

}

declare module 'org.embeddedt.modernfix' {
  import { Logger } from 'org.apache.logging.log4j';
  import { ExecutorService } from 'java.util.concurrent';
  import { MinecraftServer } from 'net.minecraft.server';
  import { List } from 'java.util';

  class ModernFix {
    static readonly LOGGER: Logger;
    static readonly MODID: string;
    static NAME: string;
    static INSTANCE: ModernFix;
    static runningFirstInjection: boolean;
    constructor();
    onServerDead(server: MinecraftServer): void;
    onServerStarted(): void;
    static resourceReloadExecutor(): ExecutorService;
  }


  class ModernFixClient {
    static INSTANCE: ModernFixClient;
    static worldLoadStartTime: number;
    static gameStartTimeSeconds: number;
    static recipesUpdated: boolean;
    static tagsUpdated: boolean;
    brandingString: string;
    static CLIENT_INTEGRATIONS: List;
    constructor();
    onGameLaunchFinish(): void;
    onRecipesUpdated(): void;
    onRenderTickEnd(): void;
    onServerStarted(server: MinecraftServer): void;
    onTagsUpdated(): void;
    resetWorldLoadStateMachine(): void;
  }

}

declare module 'org.embeddedt.modernfix.neoforge.caps' {
  import { Map, List, Set } from 'java.util';
  import { ICapabilityProvider, BaseCapability } from 'net.neoforged.neoforge.capabilities';

  class CapProviderGetter {
    static deduplicateCap(cap: BaseCapability<any, any>): void;
    static getProviderMap<T extends BaseCapability>(cap: T): Map<any, ICapabilityProvider<any, any, any>[]>;
  }


  class ITrackingCapEvent {
    mfix$getTrackedCaps(): Set<BaseCapability<any, any>>;
  }

}

declare module 'org.embeddedt.modernfix.neoforge.dynresources' {
  import { Map, Set, Collection } from 'java.util';
  import { ModelResourceLocation, BakedModel } from 'net.minecraft.client.resources.model';
  import { Entry } from 'Map';
  import { BiFunction } from 'java.util.function';
  import { Block } from 'net.minecraft.world.level.block';
  import { ResourceLocation } from 'net.minecraft.resources';

  class ModelBakeEventHelper {
    constructor(modelRegistry: Map<ModelResourceLocation, BakedModel>);
    entrySet(): Set<Entry<ModelResourceLocation, BakedModel>>;
    keySet(): Set<ModelResourceLocation>;
    replaceAll(functionParameter: BiFunction<ModelResourceLocation, BakedModel, BakedModel>): void;
    values(): Collection<BakedModel>;
    wrapRegistry(modId: string): Map<ModelResourceLocation, BakedModel>;
  }


  class ModelLocationBuilder {
    generateForBlock(destinationSet: Set<ModelResourceLocation>, block: Block, baseLocation: ResourceLocation): void;
  }

}

declare module 'org.embeddedt.modernfix.neoforge.dynresources.ModelBakeEventHelper' {
  import { ForwardingMap } from 'com.google.common.collect';
  import { ModelResourceLocation, BakedModel } from 'net.minecraft.client.resources.model';
  import { Set } from 'java.util';
  import { Entry } from 'Map';
  import { BiFunction } from 'java.util.function';

  interface EmulatedModelRegistry extends ForwardingMap<ModelResourceLocation, BakedModel> {}
  class EmulatedModelRegistry extends ForwardingMap<ModelResourceLocation, BakedModel> {
    containsKey(key: any): boolean;
    entrySet(): Set<Entry<ModelResourceLocation, BakedModel>>;
    get(key: any): BakedModel;
    keySet(): Set<ModelResourceLocation>;
    replaceAll(functionParameter: BiFunction<ModelResourceLocation, BakedModel, BakedModel>): void;
  }

}

declare module 'org.embeddedt.modernfix.neoforge.init' {
  import { ModContainer } from 'net.neoforged.fml';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { Pre } from 'ClientTickEvent';
  import { DebugText } from 'CustomizeGuiOverlayEvent';
  import { Unload } from 'LevelEvent';
  import { ServerStartedEvent, ServerStoppedEvent } from 'net.neoforged.neoforge.event.server';
  import { Post } from 'RenderFrameEvent';
  import { RecipesUpdatedEvent } from 'net.neoforged.neoforge.client.event';
  import { TagsUpdatedEvent } from 'net.neoforged.neoforge.event';
  import { FMLCommonSetupEvent } from 'net.neoforged.fml.event.lifecycle';

  class ModernFixClientForge {
    constructor(modContainer: ModContainer, modBus: IEventBus);
    onConfigKey(event: Pre): void;
    onDisconnect(event: Unload): void;
    onRecipes(e: RecipesUpdatedEvent): void;
    onRenderOverlay(event: DebugText): void;
    onRenderTickEnd(event: Post): void;
    onServerStarting(event: ServerStartedEvent): void;
    onTags(e: TagsUpdatedEvent): void;
  }


  class ModernFixForge {
    static launchDone: boolean;
    constructor(modContainer: ModContainer, modBus: IEventBus);
    commonSetup(event: FMLCommonSetupEvent): void;
    onServerDead(event: ServerStoppedEvent): void;
    onServerStarted(event: ServerStartedEvent): void;
  }

}

declare module 'org.embeddedt.modernfix.neoforge.load' {
  import { IModFile } from 'net.neoforged.neoforgespi.locating';
  import { Path } from 'java.nio.file';

  class MinecraftServerReloadTracker {
    static ACTIVE_RELOADS: number;
    static isReloadActive(): boolean;
  }


  class ModResourcePackPathFixer {
    static getModFileByRootPath(path: Path): IModFile;
  }

}

declare module 'org.embeddedt.modernfix.neoforge' {
  import { ModConfigSpec } from 'net.neoforged.neoforge.common';
  import { ConfigValue } from 'ModConfigSpec';
  import { Set } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';

  class ModernFixConfig {
    static COMMON_CONFIG: ModConfigSpec;
    static BLACKLIST_ASYNC_JEI_PLUGINS: ConfigValue;
    static get jeiPluginBlacklist(): Set<ResourceLocation>;
  }

}

declare module 'org.embeddedt.modernfix.neoforge.packet' {
  import { Enum } from 'java.lang';
  import { Type } from 'CustomPacketPayload';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { List } from 'java.util';

  interface SmartIngredientSyncPayload extends Enum<SmartIngredientSyncPayload> {}
  class SmartIngredientSyncPayload extends Enum<SmartIngredientSyncPayload> {
    static readonly INSTANCE: SmartIngredientSyncPayload;
    type(): Type<CustomPacketPayload>;
    static valueOf(name: string): SmartIngredientSyncPayload;
    static values(): SmartIngredientSyncPayload[];
  }

}

declare module 'org.embeddedt.modernfix.neoforge.recipe' {
  import { SoftReference } from 'java.lang.ref';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { Value } from 'Ingredient';

  class ExtendedIngredient {
    mfix$clearReference(): void;
  }


  interface IngredientItemStacksSoftReference extends SoftReference<ItemStack[]> {}
  class IngredientItemStacksSoftReference extends SoftReference<ItemStack[]> {
    constructor(ingredient: Ingredient, stacks: ItemStack[]);
  }


  class IngredientValueDeduplicator {
    static deduplicate(value: Value): Value;
  }

}

declare module 'org.embeddedt.modernfix.neoforge.util' {
  import { Thread, AutoCloseable } from 'java.lang';
  import { ForkJoinPool } from 'java.util.concurrent';

  interface AsyncLoadingScreen extends AutoCloseable, Thread {}
  class AsyncLoadingScreen extends AutoCloseable {
    constructor();
    close(): void;
    run(): void;
    start(): void;
  }


  class ModUtil {
    static commonPool: ForkJoinPool;
  }

}

declare module 'org.embeddedt.modernfix.platform' {
  import { ClassNode } from 'org.objectweb.asm.tree';
  import { MinecraftServer } from 'net.minecraft.server';
  import { Path } from 'java.nio.file';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { Multimap } from 'com.google.common.collect';
  import { Consumer } from 'java.util.function';
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack } from 'net.minecraft.commands';

  class ModernFixPlatformHooks {
    static readonly INSTANCE: ModernFixPlatformHooks;
    applyASMTransformers(var1: string, var2: ClassNode): void;
    get currentServer(): MinecraftServer;
    get customModOptions(): Multimap<string, string>;
    get gameDirectory(): Path;
    get platformName(): string;
    get versionString(): string;
    injectPlatformSpecificHacks(): void;
    isClient(): boolean;
    isDedicatedServer(): boolean;
    isDevEnv(): boolean;
    isEarlyLoadingNormally(): boolean;
    isLoadingNormally(): boolean;
    modPresent(var1: string): boolean;
    onLaunchComplete(): void;
    onServerCommandRegister(var1: Consumer<CommandDispatcher<CommandSourceStack>>): void;
    sendPacket(var1: ServerPlayer, var2: CustomPacketPayload): void;
  }


  class PlatformHookLoader {
  }

}

declare module 'org.embeddedt.modernfix.registry' {
  import { Reference2ReferenceOpenHashMap } from 'it.unimi.dsi.fastutil.objects';
  import { ResourceKey } from 'net.minecraft.resources';
  import { RegistrationInfo } from 'net.minecraft.core';

  interface LifecycleMap<T = any> extends Reference2ReferenceOpenHashMap<ResourceKey, RegistrationInfo> {}
  class LifecycleMap<T = any> extends Reference2ReferenceOpenHashMap<ResourceKey, RegistrationInfo> {
    constructor();
    put(t: ResourceKey<T>, lifecycle: RegistrationInfo): RegistrationInfo;
  }

}

declare module 'org.embeddedt.modernfix.render' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { BakedModel } from 'net.minecraft.client.resources.model';
  import { BakedQuad, ItemTransforms, ItemOverrides } from 'net.minecraft.client.renderer.block.model';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Direction } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';

  interface FastItemRenderType extends Enum<FastItemRenderType> {}
  class FastItemRenderType extends Enum<FastItemRenderType> {
    static readonly SIMPLE_ITEM: FastItemRenderType;
    static readonly SIMPLE_BLOCK: FastItemRenderType;
    static valueOf(name: string): FastItemRenderType;
    static values(): FastItemRenderType[];
  }


  class RenderState {
    static IS_RENDERING_LEVEL: boolean;
  }


  interface SimpleItemModelView extends BakedModel {}
  class SimpleItemModelView extends BakedModel {
    get overrides(): ItemOverrides;
    get particleIcon(): TextureAtlasSprite;
    get transforms(): ItemTransforms;
    getQuads(state: BlockState, side: Direction, rand: RandomSource): BakedQuad[];
    isCustomRenderer(): boolean;
    isGui3d(): boolean;
    setItem(model: BakedModel): void;
    setType(type: FastItemRenderType): void;
    useAmbientOcclusion(): boolean;
    usesBlockLight(): boolean;
  }

}

declare module 'org.embeddedt.modernfix.render.font' {
  class CompactUnihexContents {
  }

}

declare module 'org.embeddedt.modernfix.render.font.CompactUnihexContents' {
  import { LineData } from 'UnihexProvider';

  interface Shorts extends LineData {}
  class Shorts extends LineData {
    constructor(contents: number[]);
    bitWidth(): number;
    line(index: number): number;
  }


  interface Bytes extends LineData {}
  class Bytes extends LineData {
    constructor(contents: number[]);
    bitWidth(): number;
    line(index: number): number;
  }

}

declare module 'org.embeddedt.modernfix.resources' {
  import { Function } from 'java.util.function';
  import { PackType } from 'net.minecraft.server.packs';
  import { Path } from 'java.nio.file';
  import { Set } from 'java.util';
  import { ResourceOutput } from 'PackResources';
  import { ExecutorService } from 'java.util.concurrent';

  class ICachingResourcePack {
    invalidateCache(): void;
  }


  class PackResourcesCacheEngine {
    constructor(basePathRetriever: Function<PackType, Path>);
    collectResources(type: PackType, resourceNamespace: string, components: string[], maxDepth: number, output: ResourceOutput): void;
    static decomposeCached(path: string): string[];
    getNamespaces(type: PackType): Set<string>;
    hasResource(paths: string[]): boolean;
  }


  class ReloadExecutor {
    static createCustomResourceReloadExecutor(): ExecutorService;
  }

}

declare module 'org.embeddedt.modernfix.resources.PackResourcesCacheEngine' {
  class Node {
  }

}

declare module 'org.embeddedt.modernfix.screen' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ContainerObjectSelectionList } from 'net.minecraft.client.gui.components';
  import { Entry } from 'org.embeddedt.modernfix.screen.OptionList';
  import { Minecraft } from 'net.minecraft.client';

  interface ModernFixConfigScreen extends Screen {}
  class ModernFixConfigScreen extends Screen {
    madeChanges: boolean;
    constructor(lastScreen: Screen);
    onClose(): void;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    setLastScrollAmount(d: number): void;
  }


  interface ModernFixOptionInfoScreen extends Screen {}
  class ModernFixOptionInfoScreen extends Screen {
    constructor(lastScreen: Screen, optionName: string);
    onClose(): void;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface OptionList extends ContainerObjectSelectionList<Entry> {}
  class OptionList extends ContainerObjectSelectionList<Entry> {
    constructor(arg: ModernFixConfigScreen, arg2: Minecraft);
    get rowWidth(): number;
    updateOptionEntryStatuses(): void;
  }

}

declare module 'org.embeddedt.modernfix.screen.OptionList' {
  import { Entry as containerobjectselectionlist_Entry } from 'ContainerObjectSelectionList';
  import { Option } from 'org.embeddedt.modernfix.core.config';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { NarratableEntry } from 'net.minecraft.client.gui.narration';
  import { Component } from 'net.minecraft.network.chat';

  interface Entry extends containerobjectselectionlist_Entry<Entry> {}
  class Entry extends containerobjectselectionlist_Entry<Entry> {
  }


  interface OptionEntry extends Entry {}
  class OptionEntry extends Entry {
    constructor(optionName: string, option: Option);
    children(): GuiEventListener[];
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    narratables(): NarratableEntry[];
    render(guiGraphics: GuiGraphics, index: number, top: number, left: number, width: number, height: number, mouseX: number, mouseY: number, isMouseOver: boolean, partialTicks: number): void;
  }


  interface CategoryEntry extends Entry {}
  class CategoryEntry extends Entry {
    constructor(component: Component);
    changeFocus(focus: boolean): boolean;
    children(): GuiEventListener[];
    narratables(): NarratableEntry[];
    render(guiGraphics: GuiGraphics, index: number, top: number, left: number, width: number, height: number, mouseX: number, mouseY: number, isMouseOver: boolean, partialTicks: number): void;
  }

}

declare module 'org.embeddedt.modernfix.spark' {
  class SparkLaunchProfiler {
    static start(key: string): void;
    static stop(key: string): void;
  }

}

declare module 'org.embeddedt.modernfix.spark.SparkLaunchProfiler' {
  import { PlatformInfo } from 'me.lucko.spark.common.platform';
  import { Type } from 'PlatformInfo';
  import { CommandSender } from 'me.lucko.spark.common.command.sender';
  import { UUID } from 'java.util';
  import { Component } from 'me.lucko.spark.lib.adventure.text';
  import { SparkPlugin } from 'me.lucko.spark.common';
  import { Path } from 'java.nio.file';
  import { Stream } from 'java.util.stream';
  import { Runnable, Throwable } from 'java.lang';
  import { Level } from 'java.util.logging';

  interface ModernFixPlatformInfo extends PlatformInfo {}
  class ModernFixPlatformInfo extends PlatformInfo {
    get brand(): string;
    get minecraftVersion(): string;
    get name(): string;
    get type(): Type;
    get version(): string;
  }


  interface ModernFixCommandSender extends CommandSender {}
  class ModernFixCommandSender extends CommandSender {
    constructor();
    get name(): string;
    get uniqueId(): UUID;
    hasPermission(s: string): boolean;
    sendMessage(component: Component): void;
  }


  interface ModernFixSparkPlugin extends SparkPlugin {}
  class ModernFixSparkPlugin extends SparkPlugin {
    executeAsync(runnable: Runnable): void;
    get commandName(): string;
    get commandSenders(): Stream<CommandSender>;
    get platformInfo(): PlatformInfo;
    get pluginDirectory(): Path;
    get version(): string;
    log(level: Level, s: string): void;
    log(level: Level, s: string, t: Throwable): void;
  }

}

declare module 'org.embeddedt.modernfix.textures' {
  import { STBRPRect } from 'org.lwjgl.stb';
  import { Pair } from 'com.mojang.datafixers.util';
  import { Integer } from 'java.lang';
  import { List } from 'java.util';
  import { LoadableSpriteInfo } from 'org.embeddedt.modernfix.textures.StbStitcher';
  import { Holder, Entry } from 'Stitcher';

  class StbStitcher {
    static getX(rect: STBRPRect): number;
    static getY(rect: STBRPRect): number;
    static packRects<T extends Entry>(holders: Holder<T>): Pair<Pair<number, number>, LoadableSpriteInfo<T>[]>;
    static setWrapper(rect: STBRPRect, id: number, width: number, height: number, x: number, y: number, was_packed: boolean): STBRPRect;
  }

}

declare module 'org.embeddedt.modernfix.textures.StbStitcher' {
  class LoadableSpriteInfo<T extends Entry = any> {
    readonly info: T;
    readonly width: number;
    readonly height: number;
    readonly x: number;
    readonly y: number;
  }

}

declare module 'org.embeddedt.modernfix.util.blockpos' {
  import { Iterator } from 'java.util';
  import { BlockPos } from 'net.minecraft.core';

  interface SectionBlockPosIterator extends Iterator<BlockPos> {}
  class SectionBlockPosIterator extends Iterator<BlockPos> {
    constructor(baseX: number, baseY: number, baseZ: number);

    constructor(pos: BlockPos);
    hasNext(): boolean;
    next(): BlockPos;
  }

}

declare module 'org.embeddedt.modernfix.util' {
  import { LoadingCache } from 'com.google.common.cache';
  import { Function, BiConsumer, BiFunction } from 'java.util.function';
  import { SafeRunnable } from 'org.embeddedt.modernfix.util.CommonModUtil';
  import { Map, Set, Collection, List, Iterator, ListIterator } from 'java.util';
  import { Thread, Runnable, Integer, Class, Void } from 'java.lang';
  import { Entry } from 'Map';
  import { AbstractExecutorService, TimeUnit, CompletableFuture, Executor } from 'java.util.concurrent';
  import { Int2ObjectMap, IntSet } from 'it.unimi.dsi.fastutil.ints';
  import { ObjectCollection, ObjectSet, Object2ObjectLinkedOpenHashMap } from 'it.unimi.dsi.fastutil.objects';
  import { Entry as int2objectmap_Entry } from 'Int2ObjectMap';
  import { Either } from 'com.mojang.datafixers.util';
  import { File } from 'java.io';
  import { ForwardingMap } from 'com.google.common.collect';
  import { ModelResourceLocation } from 'net.minecraft.client.resources.model';
  import { PreparableReloadListener, ResourceManager } from 'net.minecraft.server.packs.resources';
  import { PreparationBarrier } from 'PreparableReloadListener';
  import { ProfilerFiller } from 'net.minecraft.util.profiling';
  import { PackType } from 'net.minecraft.server.packs';

  class CacheUtil {
    static simpleCacheForLambda<K, V>(functionParameter: Function<K, V>, maxSize: number, key: K): LoadingCache<K, V>;
  }


  class ClassInfoManager {
    static clear(): void;
  }


  class CommonModUtil {
    static runWithoutCrash(r: SafeRunnable, errorMsg: string): void;
  }


  interface ConcurrencySanitizingMap<K = any, V = any> extends Map<K, V> {}
  class ConcurrencySanitizingMap<K = any, V = any> extends Map<K, V> {
    constructor(map: Map<K, V>, owner: Thread);
    clear(): void;
    containsKey(key: any): boolean;
    containsValue(value: any): boolean;
    entrySet(): Set<Entry<K, V>>;
    get(key: any): V;
    isEmpty(): boolean;
    keySet(): Set<K>;
    put(key: K, value: V): V;
    putAll(m: Map<K, V>): void;
    remove(key: any): V;
    size(): number;
    values(): Collection<V>;
  }


  interface DirectExecutorService extends AbstractExecutorService {}
  class DirectExecutorService extends AbstractExecutorService {
    awaitTermination(timeout: number, unit: TimeUnit): boolean;
    execute(command: Runnable): void;
    isShutdown(): boolean;
    isTerminated(): boolean;
    shutdown(): void;
    shutdownNow(): Runnable[];
  }


  interface DummyList<T = any> extends List<T> {}
  class DummyList<T = any> extends List<T> {
    add(t: T): boolean;
    add(i: number, t: T): void;
    addAll(collection: Collection<T>): boolean;
    addAll(i: number, collection: Collection<T>): boolean;
    clear(): void;
    contains(o: any): boolean;
    containsAll(collection: Collection<any>): boolean;
    get(i: number): T;
    indexOf(o: any): number;
    isEmpty(): boolean;
    iterator(): Iterator<T>;
    lastIndexOf(o: any): number;
    listIterator(): ListIterator<T>;
    listIterator(i: number): ListIterator<T>;
    remove(o: any): boolean;
    remove(i: number): T;
    removeAll(collection: Collection<any>): boolean;
    retainAll(collection: Collection<any>): boolean;
    set(i: number, t: T): T;
    size(): number;
    subList(i: number, i1: number): T[];
    toArray(): any[];
    toArray<T1>(t1s: T1[]): T1[];
  }


  interface DynamicInt2ObjectMap<V = any> extends Int2ObjectMap<V>, DynamicMap<number, V> {}
  class DynamicInt2ObjectMap<V = any> extends Int2ObjectMap<V> {
    constructor(functionParameter: Function<number, V>);
    containsKey(key: number): boolean;
    containsKey(o: any): boolean;
    defaultReturnValue(rv: V): void;
    defaultReturnValue(): V;
    entrySet(): ObjectSet<Entry<number, V>>;
    get(key: number): V;
    getOrDefault(key: number, defaultValue: V): V;
    int2ObjectEntrySet(): ObjectSet<int2objectmap_Entry<V>>;
    keySet(): IntSet;
    values(): ObjectCollection<V>;
  }


  interface DynamicMap<K = any, V = any> extends Map<K, V> {}
  class DynamicMap<K = any, V = any> extends Map<K, V> {
    constructor(keyClass: Class<K>, functionParameter: Function<K, V>);
    clear(): void;
    containsKey(o: any): boolean;
    containsValue(o: any): boolean;
    entrySet(): Set<Entry<K, V>>;
    get(o: any): V;
    isEmpty(): boolean;
    keySet(): Set<K>;
    put(k: K, v: V): V;
    putAll(map: Map<K, V>): void;
    remove(o: any): V;
    size(): number;
    values(): Collection<V>;
  }


  interface DynamicOverridableMap<K = any, V = any> extends DynamicMap<K, V> {}
  class DynamicOverridableMap<K = any, V = any> extends DynamicMap<K, V> {
    constructor(keyClass: Class<K>, functionParameter: Function<K, V>);
    get(o: any): V;
    put(k: K, v: V): V;
    putAll(map: Map<K, V>): void;
  }


  class EitherUtil {
    static leftOrNull<L, R>(either: Either<L, R>): L;
    static rightOrNull<L, R>(either: Either<L, R>): R;
  }


  class FileUtil {
    static childFile(file: File): File;
    static normalize(path: string): string;
  }


  interface ForwardingInclDefaultsMap<K = any, V = any> extends ForwardingMap<K, V> {}
  class ForwardingInclDefaultsMap<K = any, V = any> extends ForwardingMap<K, V> {
    compute(key: K, remappingFunction: BiFunction<K, V, V>): V;
    computeIfAbsent(key: K, mappingFunction: Function<K, V>): V;
    computeIfPresent(key: K, remappingFunction: BiFunction<K, V, V>): V;
    forEach(action: BiConsumer<K, V>): void;
    getOrDefault(key: any, defaultValue: V): V;
    merge(key: K, value: V, remappingFunction: BiFunction<V, V, V>): V;
    putIfAbsent(key: K, value: V): V;
    remove(key: any, value: any): boolean;
    replace(key: K, oldValue: V, newValue: V): boolean;
    replace(key: K, value: V): V;
    replaceAll(functionParameter: BiFunction<K, V, V>): void;
  }


  interface ItemMesherMap<K = any> extends Map<K, ModelResourceLocation> {}
  class ItemMesherMap<K = any> extends Map<K, ModelResourceLocation> {
    constructor(getLocation: Function<K, ModelResourceLocation>);
    clear(): void;
    containsKey(key: any): boolean;
    containsValue(value: any): boolean;
    entrySet(): Set<Entry<K, ModelResourceLocation>>;
    get(key: any): ModelResourceLocation;
    isEmpty(): boolean;
    keySet(): Set<K>;
    put(key: K, value: ModelResourceLocation): ModelResourceLocation;
    putAll(m: Map<K, ModelResourceLocation>): void;
    remove(key: any): ModelResourceLocation;
    size(): number;
    values(): Collection<ModelResourceLocation>;
  }


  interface LambdaMap<K = any, V = any> extends Map<K, V> {}
  class LambdaMap<K = any, V = any> extends Map<K, V> {
    constructor(supplier: Function<K, V>);
    clear(): void;
    containsKey(o: any): boolean;
    containsValue(o: any): boolean;
    entrySet(): Set<Entry<K, V>>;
    get(o: any): V;
    isEmpty(): boolean;
    keySet(): Set<K>;
    put(k: K, v: V): V;
    putAll(map: Map<K, V>): void;
    remove(o: any): V;
    size(): number;
    values(): Collection<V>;
  }


  interface LRUMap<K = any, V = any> extends Object2ObjectLinkedOpenHashMap<K, V> {}
  class LRUMap<K = any, V = any> extends Object2ObjectLinkedOpenHashMap<K, V> {
    constructor(map: Map<K, V>);
    dropEntriesToMeetSize(size: number): void;
    get(k: any): V;
    put(k: K, v: V): V;
    setPermanentEntries(permanentEntries: Set<K>): void;
  }


  interface NamedPreparableResourceListener extends PreparableReloadListener {}
  class NamedPreparableResourceListener extends PreparableReloadListener {
    constructor(delegate: PreparableReloadListener);
    get name(): string;
    reload(stage: PreparationBarrier, resourceManager: ResourceManager, preparationsProfiler: ProfilerFiller, reloadProfiler: ProfilerFiller, backgroundExecutor: Executor, gameExecutor: Executor): CompletableFuture<Void>;
  }


  class PackTypeHelper {
    static isVanillaPackType(type: PackType): boolean;
  }


  class TimeFormatter {
    static formatNanos(nanos: number): string;
  }

}

declare module 'org.embeddedt.modernfix.util.CommonModUtil' {
  class SafeRunnable {
    run(): void;
  }

}

declare module 'org.embeddedt.modernfix.world.gen' {
  import { Supplier, Function } from 'java.util.function';
  import { Holder, BlockPos } from 'net.minecraft.core';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { MutableBlockPos } from 'BlockPos';

  interface PositionalBiomeGetter extends Supplier<Holder> {}
  class PositionalBiomeGetter extends Supplier<Holder> {
    constructor(biomeGetter: Function<BlockPos, Holder<Biome>>, pos: MutableBlockPos);
    get (): Holder<Biome>;
    update(nextX: number, nextY: number, nextZ: number): void;
  }

}

declare module 'org.embeddedt.modernfix.world' {
  import { Thread } from 'java.lang';
  import { MinecraftServer } from 'net.minecraft.server';
  import { SavedData } from 'net.minecraft.world.level.saveddata';
  import { Factory } from 'SavedData';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { List } from 'java.util';
  import { ChunkPos } from 'net.minecraft.world.level';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { Holder } from 'net.minecraft.core';
  import { DimensionType } from 'net.minecraft.world.level.dimension';

  interface IntegratedWatchdog extends Thread {}
  class IntegratedWatchdog extends Thread {
    constructor(server: MinecraftServer);
    run(): void;
  }


  interface StrongholdLocationCache extends SavedData {}
  class StrongholdLocationCache extends SavedData {
    static factory(serverLevel: ServerLevel): Factory<StrongholdLocationCache>;
    get chunkPosList(): ChunkPos[];
    static getFileId(dimensionType: Holder<DimensionType>): string;
    static load(arg: CompoundTag, provider: Provider): StrongholdLocationCache;
    save(compoundTag: CompoundTag, provider: Provider): CompoundTag;
    set chunkPosList(positions: ChunkPos[]);
  }


  class ThreadDumper {
    static obtainThreadDump(): string;
  }

}