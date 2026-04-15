declare module 'net.potionstudios.biomeswevegone.advancements.critereon' {
  import { EntityVariantPredicateType } from 'EntitySubPredicates';

  class BWGEntitySubPredicates {
    static readonly ODDION: EntityVariantPredicateType;
    static readonly PUMPKIN_WARDEN: EntityVariantPredicateType;
    static entitySubPredicates(): void;
  }

}

declare module 'net.potionstudios.biomeswevegone' {
  import { Logger } from 'org.slf4j';
  import { MinecraftServer } from 'net.minecraft.server';
  import { Entity, EntityType, Mob } from 'net.minecraft.world.entity';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Registry } from 'net.minecraft.core';
  import { Platform } from 'net.potionstudios.biomeswevegone.PlatformHandler';
  import { Path } from 'java.nio.file';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { Supplier } from 'java.util.function';
  import { BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { Builder } from 'BlockEntityType';
  import { PoiType } from 'net.minecraft.world.entity.ai.village.poi';
  import { Block, FlowerPotBlock } from 'net.minecraft.world.level.block';
  import { SpawnEggItem, MobBucketItem, CreativeModeTab, ItemStack, Item } from 'net.minecraft.world.item';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { BWGFarmLandBlock } from 'net.potionstudios.biomeswevegone.world.level.block.custom';
  import { WoodType, BlockSetType } from 'net.minecraft.world.level.block.state.properties';
  import { SimpleParticleType } from 'net.minecraft.core.particles';
  import { ArrayList } from 'java.util';
  import { Reference } from 'Holder';

  class BiomesWeveGone {
    static readonly MOD_ID: string;
    static readonly LOGGER: Logger;
    static commonSetup(): void;
    static id(name: string): ResourceLocation;
    static init(): void;
    static key<T>(registryKey: ResourceKey<Registry<T>>, name: string): ResourceKey<T>;
    static onEntityLoad(entity: Entity): void;
    static postInit(): void;
    static serverStart(server: MinecraftServer): void;
  }


  class PlatformHandler {
    static readonly PLATFORM_HANDLER: PlatformHandler;
    bwgFarmLandBlock(dirt: Supplier<Block>): Supplier<BWGFarmLandBlock>;
    configPath(): Path;
    createCreativeTab(var1: string, var2: Supplier<ItemStack>, ...var3: ArrayList<Supplier<Item>>[]): Supplier<CreativeModeTab>;
    createMobBucket(entity: Supplier<EntityType<Mob>>, fluid: Supplier<Fluid>, sound: Supplier<SoundEvent>): Supplier<MobBucketItem>;
    createPottedBlock(block: Supplier<Block>): Supplier<FlowerPotBlock>;
    createSpawnEgg(entity: Supplier<EntityType<Mob>>, backgroundColor: number, highlightColor: number): Supplier<SpawnEggItem>;
    createWoodType(var1: string, var2: BlockSetType): WoodType;
    get platform(): Platform;
    hasPermission(sourceStack: CommandSourceStack, permission: string): boolean;
    register<T>(var1: Registry<T>, var2: string, var3: Supplier<T>): Supplier<T>;
    registerBlockEntity<T extends BlockEntity>(var1: string, var2: Supplier<Builder<T>>): Supplier<BlockEntityType<T>>;
    registerCreateParticle(var1: string): Supplier<SimpleParticleType>;
    registerForHolder<T>(var1: Registry<T>, var2: string, var3: Supplier<T>): Supplier<Reference<T>>;
    registerPOIType(id: string, block: Supplier<Block>, maxTickets: number, validRange: number): Supplier<PoiType>;
  }

}

declare module 'net.potionstudios.biomeswevegone.client' {
  import { BiConsumer, Supplier, Consumer, Function } from 'java.util.function';
  import { EntityType, Entity } from 'net.minecraft.world.entity';
  import { EntityRendererProvider } from 'net.minecraft.client.renderer.entity';
  import { BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockEntityRendererProvider } from 'net.minecraft.client.renderer.blockentity';
  import { ModelLayerLocation } from 'net.minecraft.client.model.geom';
  import { LayerDefinition } from 'net.minecraft.client.model.geom.builders';
  import { ModelResourceLocation } from 'net.minecraft.client.resources.model';
  import { SimpleParticleType } from 'net.minecraft.core.particles';
  import { SpriteSet, ParticleProvider } from 'net.minecraft.client.particle';
  import { TriConsumer } from 'org.apache.logging.log4j.util';
  import { Item } from 'net.minecraft.world.item';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ClampedItemPropertyFunction } from 'net.minecraft.client.renderer.item';
  import { BlockColor } from 'net.minecraft.client.color.block';
  import { Block } from 'net.minecraft.world.level.block';

  class BiomesWeveGoneClient {
    static onInitialize(): void;
    static registerAdditionalModels(consumer: Consumer<ModelResourceLocation>): void;
    static registerBlockColors(consumer: BiConsumer<BlockColor, Block[]>): void;
    static registerBlockEntityRenderers(consumer: BiConsumer<BlockEntityType<BlockEntity>, BlockEntityRendererProvider>): void;
    static registerBlockItemColors(consumer: Consumer<Block[]>): void;
    static registerEntityRenderers(consumer: BiConsumer<EntityType<Entity>, EntityRendererProvider>): void;
    static registerItemProperties(consumer: TriConsumer<Item, ResourceLocation, ClampedItemPropertyFunction>): void;
    static registerLayerDefinitions(consumer: BiConsumer<ModelLayerLocation, Supplier<LayerDefinition>>): void;
    static registerParticles(consumer: BiConsumer<SimpleParticleType, Function<SpriteSet, ParticleProvider<SimpleParticleType>>>): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.client.model' {
  import { BakedModel, ModelResourceLocation, ModelManager } from 'net.minecraft.client.resources.model';

  class ModelAccess {
    static readonly MODEL_ACCESS: ModelAccess;
    getModel(location: ModelResourceLocation, modelManager: ModelManager): BakedModel;
  }

}

declare module 'net.potionstudios.biomeswevegone.client.particle' {
  import { Supplier } from 'java.util.function';

  class BWGParticles {
    static readonly WITCH_HAZEL_LEAVES: Supplier;
    static readonly SPIRIT_LEAVES: Supplier;
    static readonly WHITE_SAKURA_LEAVES: Supplier;
    static readonly YELLOW_SAKURA_LEAVES: Supplier;
    static readonly RED_MAPLE_LEAVES: Supplier;
    static readonly SILVER_MAPLE_LEAVES: Supplier;
    static readonly IRONWOOD_LEAVES: Supplier;
    static readonly BOREALIS_GLINT: Supplier;
    static readonly FIREFLY: Supplier;
    static readonly SPIRIT: Supplier;
  }

}

declare module 'net.potionstudios.biomeswevegone.client.particle.particles' {
  import { TextureSheetParticle, ParticleRenderType } from 'net.minecraft.client.particle';

  interface FallingLeafParticle extends TextureSheetParticle {}
  class FallingLeafParticle extends TextureSheetParticle {
    get renderType(): ParticleRenderType;
    tick(): void;
  }


  interface FireFlyParticle extends TextureSheetParticle {}
  class FireFlyParticle extends TextureSheetParticle {
    get renderType(): ParticleRenderType;
    tick(): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.client.renderer.entity.boat' {
  import { EntityRenderer } from 'net.minecraft.client.renderer.entity';
  import { Boat } from 'net.minecraft.world.entity.vehicle';
  import { Context } from 'EntityRendererProvider';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { ModelLayerLocation } from 'net.minecraft.client.model.geom';
  import { Type } from 'net.potionstudios.biomeswevegone.world.entity.boats.BWGBoatEntity';
  import { Pair } from 'com.mojang.datafixers.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ListModel } from 'net.minecraft.client.model';

  interface BWGBoatRenderer extends EntityRenderer<Boat> {}
  class BWGBoatRenderer extends EntityRenderer<Boat> {
    constructor(context: Context, chestBoat: boolean);
    static createBoatModelName(pType: Type): ModelLayerLocation;
    static createChestBoatModelName(pType: Type): ModelLayerLocation;
    getModelWithLocation(boat: Boat): Pair<ResourceLocation, ListModel<Boat>>;
    getTextureLocation(entity: Boat): ResourceLocation;
    render(boat: Boat, entityYaw: number, partialTicks: number, poseStack: PoseStack, buffer: MultiBufferSource, packedLight: number): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.client.renderer.entity.manowar' {
  import { GeoModel } from 'software.bernie.geckolib.model';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { GeoEntityRenderer } from 'software.bernie.geckolib.renderer';
  import { Context } from 'EntityRendererProvider';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { BakedGeoModel } from 'software.bernie.geckolib.cache.object';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';

  interface ManOWarModel<T extends ManOWar = any> extends GeoModel<T> {}
  class ManOWarModel<T extends ManOWar = any> extends GeoModel<T> {
    getAnimationResource(manOWar: T): ResourceLocation;
    getModelResource(manOWar: T): ResourceLocation;
    getTextureResource(manOWar: T): ResourceLocation;
  }


  interface ManOWarRenderer<T extends ManOWar = any> extends GeoEntityRenderer<T> {}
  class ManOWarRenderer<T extends ManOWar = any> extends GeoEntityRenderer<T> {
    constructor(context: Context);
    preRender(poseStack: PoseStack, animatable: T, model: BakedGeoModel, bufferSource: MultiBufferSource, buffer: VertexConsumer, isReRender: boolean, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.client.renderer.entity.oddion' {
  import { GeoModel } from 'software.bernie.geckolib.model';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { GeoEntityRenderer } from 'software.bernie.geckolib.renderer';
  import { Context } from 'EntityRendererProvider';

  interface OddionModel<T extends Oddion = any> extends GeoModel<T> {}
  class OddionModel<T extends Oddion = any> extends GeoModel<T> {
    getAnimationResource(oddion: T): ResourceLocation;
    getModelResource(oddion: T): ResourceLocation;
    getTextureResource(oddion: T): ResourceLocation;
  }


  interface OddionRenderer<T extends Oddion = any> extends GeoEntityRenderer<T> {}
  class OddionRenderer<T extends Oddion = any> extends GeoEntityRenderer<T> {
    constructor(context: Context);
  }

}

declare module 'net.potionstudios.biomeswevegone.client.renderer.entity.pumpkinwarden' {
  import { GeoModel } from 'software.bernie.geckolib.model';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { AnimationState } from 'software.bernie.geckolib.animation';
  import { GeoEntityRenderer } from 'software.bernie.geckolib.renderer';
  import { Context } from 'EntityRendererProvider';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { BakedGeoModel, GeoBone } from 'software.bernie.geckolib.cache.object';
  import { MultiBufferSource, RenderType } from 'net.minecraft.client.renderer';

  interface PumpkinWardenModel<T extends PumpkinWarden = any> extends GeoModel<T> {}
  class PumpkinWardenModel<T extends PumpkinWarden = any> extends GeoModel<T> {
    getAnimationResource(pumpkinWarden: T): ResourceLocation;
    getModelResource(pumpkinWarden: T): ResourceLocation;
    getTextureResource(pumpkinWarden: T): ResourceLocation;
    setCustomAnimations(pumpkinWarden: T, uniqueID: number, customPredicate: AnimationState<T>): void;
  }


  interface PumpkinWardenRenderer<T extends PumpkinWarden = any> extends GeoEntityRenderer<T> {}
  class PumpkinWardenRenderer<T extends PumpkinWarden = any> extends GeoEntityRenderer<T> {
    constructor(context: Context);
    preRender(poseStack: PoseStack, animatable: T, model: BakedGeoModel, bufferSource: MultiBufferSource, buffer: VertexConsumer, isReRender: boolean, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
    renderRecursively(poseStack: PoseStack, animatable: T, bone: GeoBone, renderType: RenderType, bufferSource: MultiBufferSource, buffer: VertexConsumer, isReRender: boolean, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.client.renderer.entity.wreath' {
  import { EntityRenderer } from 'net.minecraft.client.renderer.entity';
  import { Wreath } from 'net.potionstudios.biomeswevegone.world.entity.decoration';
  import { Context } from 'EntityRendererProvider';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface WreathRenderer extends EntityRenderer<Wreath> {}
  class WreathRenderer extends EntityRenderer<Wreath> {
    constructor(context: Context);
    getTextureLocation(entity: Wreath): ResourceLocation;
    render(entity: Wreath, entityYaw: number, partialTick: number, poseStack: PoseStack, bufferSource: MultiBufferSource, packedLight: number): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.commands' {
  import { Consumer } from 'java.util.function';
  import { LiteralArgumentBuilder } from 'com.mojang.brigadier.builder';
  import { CommandSourceStack } from 'net.minecraft.commands';

  class BWGCommands {
    static register(dispatcher: Consumer<LiteralArgumentBuilder<CommandSourceStack>>): void;
  }


  class BWGReloadCommand {
  }


  class BWGVillagerUpgradeCommand {
  }

}

declare module 'net.potionstudios.biomeswevegone.compat.vanilla.dispenser' {
  import { DefaultDispenseItemBehavior, BlockSource } from 'net.minecraft.core.dispenser';
  import { Type } from 'net.potionstudios.biomeswevegone.world.entity.boats.BWGBoatEntity';
  import { ItemStack } from 'net.minecraft.world.item';

  interface BWGBoatDispenseItemBehavior extends DefaultDispenseItemBehavior {}
  class BWGBoatDispenseItemBehavior extends DefaultDispenseItemBehavior {
    constructor(type: Type);

    constructor(type: Type, isChestBoat: boolean);
    execute(blockSource: BlockSource, stack: ItemStack): ItemStack;
  }


  class BWGDispenseItemBehavior {
    static registerDispenseItemBehavior(): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.compat.wthit' {
  import { Enum } from 'java.lang';
  import { ITooltip, IBlockAccessor, IPluginConfig, IWailaClientPlugin, IWailaCommonPlugin, IClientRegistrar, ICommonRegistrar } from 'mcp.mobius.waila.api';
  import { List } from 'java.util';

  interface BWGOddionCropProvider extends Enum<BWGOddionCropProvider> {}
  class BWGOddionCropProvider extends Enum<BWGOddionCropProvider> {
    static readonly INSTANCE: BWGOddionCropProvider;
    appendBody(tooltip: ITooltip, accessor: IBlockAccessor, config: IPluginConfig): void;
    static valueOf(name: string): BWGOddionCropProvider;
    static values(): BWGOddionCropProvider[];
  }


  interface BWGPlantProvider extends Enum<BWGPlantProvider> {}
  class BWGPlantProvider extends Enum<BWGPlantProvider> {
    static readonly INSTANCE: BWGPlantProvider;
    appendBody(tooltip: ITooltip, accessor: IBlockAccessor, config: IPluginConfig): void;
    static valueOf(name: string): BWGPlantProvider;
    static values(): BWGPlantProvider[];
  }


  interface BWGWTHITPlugin extends IWailaClientPlugin, IWailaCommonPlugin {}
  class BWGWTHITPlugin extends IWailaClientPlugin {
    register(registrar: IClientRegistrar): void;
    register(registrar: ICommonRegistrar): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.component' {
  import { Supplier } from 'java.util.function';

  class BWGDataComponents {
    static readonly PUMPKIN_WARDEN: Supplier;
    static dataComponents(): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.config' {
  import { Class } from 'java.lang';
  import { Path } from 'java.nio.file';
  import { Codec } from 'com.mojang.serialization';

  class ConfigLoader {
    static loadConfig<T>(clazz: Class<T>, name: string): T;
  }


  class ConfigUtils {
    static createDefaultFile<T>(path: Path, codec: Codec<T>, config: T): void;
    static loadConfig<T>(path: Path, codec: Codec<T>, defaultConfig: T): T;
  }

}

declare module 'net.potionstudios.biomeswevegone.config.configs' {
  import { MISC, SOUL_FRUIT } from 'net.potionstudios.biomeswevegone.config.configs.BWGMiscConfig';
  import { BWGSpawnConfig } from 'net.potionstudios.biomeswevegone.config.configs.BWGMobSpawnConfig';
  import { BWGTrades, BWGVillagerTradesConfig, BWGWanderingTraderTradesConfig } from 'net.potionstudios.biomeswevegone.config.configs.BWGTradesConfig';

  class BWGMiscConfig {
    static INSTANCE: BWGMiscConfig;
    misc: MISC;
    soulFruit: SOUL_FRUIT;
    static reload(): void;
  }


  class BWGMobSpawnConfig {
    static INSTANCE: BWGSpawnConfig;
    spawn: BWGSpawnConfig;
    static reload(): void;
  }


  class BWGTradesConfig {
    static readonly INSTANCE: BWGTradesConfig;
    trades: BWGTrades;
    villagerTrades: BWGVillagerTradesConfig;
    wanderingTraderTrades: BWGWanderingTraderTradesConfig;
  }

}

declare module 'net.potionstudios.biomeswevegone.config.configs.BWGMiscConfig' {
  import { CommentValue } from 'net.potionstudios.biomeswevegone.config.ConfigUtils';

  class MISC {
  }


  class SOUL_FRUIT {
    ALLOW_SOUL_FRUIT_BLINDNESS: CommentValue;
    SOUL_FRUIT_BLINDNESS: CommentValue;
    SOUL_FRUIT_BLINDNESS_RANGE: CommentValue;
  }

}

declare module 'net.potionstudios.biomeswevegone.config.configs.BWGMobSpawnConfig' {
  class BWGSpawnConfig {
    man_o_war: boolean;
    oddion: boolean;
  }

}

declare module 'net.potionstudios.biomeswevegone.config.configs.BWGTradesConfig' {
  import { CommentValue } from 'net.potionstudios.biomeswevegone.config.ConfigUtils';

  class BWGTrades {
    disableTrades: CommentValue;
  }


  class BWGVillagerTradesConfig {
    allowBWGForagerTrades: CommentValue;
    enableBWGVanillaProfessionTradeAdditions: CommentValue;
  }


  class BWGWanderingTraderTradesConfig {
    enableBWGItemsTrades: CommentValue;
  }

}

declare module 'net.potionstudios.biomeswevegone.mixin' {
  import { GeneratorHeightGetter } from 'net.potionstudios.biomeswevegone.util';
  import { ChunkStatus } from 'net.minecraft.world.level.chunk.status';
  import { Types } from 'Heightmap';
  import { ChunkGenerator } from 'net.minecraft.world.level.chunk';
  import { RandomState, PositionalRandomFactory } from 'net.minecraft.world.level.levelgen';
  import { BandsContext, BandsRuleSource } from 'net.potionstudios.biomeswevegone.world.level.levelgen.surfacerules';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { SimpleWeightedRandomList } from 'net.minecraft.util.random';
  import { IntProvider } from 'net.minecraft.util.valueproviders';

  interface ChunkAccessMixin extends GeneratorHeightGetter {}
  class ChunkAccessMixin extends GeneratorHeightGetter {
    get persistedStatus(): ChunkStatus;
    getHeight(var1: Types, var2: number, var3: number): number;
    getHeight(generator: ChunkGenerator, heightmapType: Types, worldX: number, worldZ: number, randomState: RandomState, sampleRaw: boolean): number;
  }


  class ChunkStatusTasksMixin {
  }


  class EatBlockGoalMixin {
  }


  interface SurfaceSystemMixin extends BandsContext {}
  class SurfaceSystemMixin extends BandsContext {
    noiseRandom: PositionalRandomFactory;
    getBandsState(bandsRuleSource: BandsRuleSource, bandStates: SimpleWeightedRandomList<BlockState>, bandSizeProvider: IntProvider, bandsCountProvider: IntProvider, x: number, y: number, z: number, frequency: number, noiseScale: number): BlockState;
  }

}

declare module 'net.potionstudios.biomeswevegone.neoforge' {
  import { IEventBus } from 'net.neoforged.bus.api';
  import { PlatformHandler } from 'net.potionstudios.biomeswevegone';
  import { Platform } from 'net.potionstudios.biomeswevegone.PlatformHandler';
  import { Path } from 'java.nio.file';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { Supplier } from 'java.util.function';
  import { BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { Builder } from 'BlockEntityType';
  import { SpawnEggItem, CreativeModeTab, ItemStack, Item } from 'net.minecraft.world.item';
  import { EntityType, Mob } from 'net.minecraft.world.entity';
  import { FlowerPotBlock, Block } from 'net.minecraft.world.level.block';
  import { BWGFarmLandBlock } from 'net.potionstudios.biomeswevegone.world.level.block.custom';
  import { WoodType, BlockSetType } from 'net.minecraft.world.level.block.state.properties';
  import { SimpleParticleType } from 'net.minecraft.core.particles';
  import { ArrayList } from 'java.util';
  import { Registry } from 'net.minecraft.core';
  import { Reference } from 'Holder';

  class BiomesWeveGoneNeoForge {
    constructor(eventBus: IEventBus);
  }


  interface NeoForgePlatformHandler extends PlatformHandler {}
  class NeoForgePlatformHandler extends PlatformHandler {
    bwgFarmLandBlock(dirt: Supplier<Block>): Supplier<BWGFarmLandBlock>;
    configPath(): Path;
    createCreativeTab(name: string, icon: Supplier<ItemStack>, ...items: ArrayList<Supplier<Item>>[]): Supplier<CreativeModeTab>;
    createPottedBlock(block: Supplier<Block>): Supplier<FlowerPotBlock>;
    createSpawnEgg(entity: Supplier<EntityType<Mob>>, backgroundColor: number, highlightColor: number): Supplier<SpawnEggItem>;
    createWoodType(id: string, setType: BlockSetType): WoodType;
    get platform(): Platform;
    hasPermission(sourceStack: CommandSourceStack, permission: string): boolean;
    register<T>(registry: Registry<T>, name: string, value: Supplier<T>): Supplier<T>;
    static register(bus: IEventBus): void;
    registerBlockEntity<T extends BlockEntity>(key: string, builder: Supplier<Builder<T>>): Supplier<BlockEntityType<T>>;
    registerCreateParticle(name: string): Supplier<SimpleParticleType>;
    registerForHolder<T>(registry: Registry<T>, name: string, value: Supplier<T>): Supplier<Reference<T>>;
    static registerPottedPlants(): void;
  }


  class VanillaCompatNeoForge {
    static init(): void;
    static registerVanillaCompatEvents(bus: IEventBus): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.neoforge.client' {
  import { IEventBus } from 'net.neoforged.bus.api';

  class BiomesWeveGoneClientNeoForge {
    constructor(eventBus: IEventBus);
  }

}

declare module 'net.potionstudios.biomeswevegone.neoforge.loot' {
  import { LootModifier, IGlobalLootModifier } from 'net.neoforged.neoforge.common.loot';
  import { Supplier } from 'java.util.function';
  import { LootItemCondition } from 'net.minecraft.world.level.storage.loot.predicates';
  import { List } from 'java.util';
  import { Item } from 'net.minecraft.world.item';
  import { MapCodec } from 'com.mojang.serialization';
  import { DeferredHolder } from 'net.neoforged.neoforge.registries';
  import { IEventBus } from 'net.neoforged.bus.api';

  interface AddItemModifier extends LootModifier {}
  class AddItemModifier extends LootModifier {
    static readonly CODEC: Supplier;
    constructor(conditionsIn: LootItemCondition[], items: Item[]);

    constructor(conditionsIn: LootItemCondition[], ...items: Item[]);
    codec(): MapCodec<IGlobalLootModifier>;
  }


  class LootModifiersRegister {
    static readonly ADD_ITEM: DeferredHolder;
    static register(eventBus: IEventBus): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.neoforge.world.level.block' {
  import { BWGFarmLandBlock } from 'net.potionstudios.biomeswevegone.world.level.block.custom';
  import { IBlockExtension } from 'net.neoforged.neoforge.common.extensions';
  import { Supplier } from 'java.util.function';
  import { Block } from 'net.minecraft.world.level.block';
  import { TriState } from 'net.neoforged.neoforge.common.util';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';

  interface BWGNeoForgeFarmLandBlock extends IBlockExtension, BWGFarmLandBlock {}
  class BWGNeoForgeFarmLandBlock extends IBlockExtension {
    constructor(dirt: Supplier<Block>);
    canSustainPlant(state: BlockState, level: BlockGetter, soilPosition: BlockPos, facing: Direction, plant: BlockState): TriState;
  }

}

declare module 'net.potionstudios.biomeswevegone.PlatformHandler' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Platform extends Enum<Platform> {}
  class Platform extends Enum<Platform> {
    static readonly FORGE: Platform;
    static readonly FABRIC: Platform;
    static readonly NEOFORGE: Platform;
    static valueOf(name: string): Platform;
    static values(): Platform[];
  }

}

declare module 'net.potionstudios.biomeswevegone.sounds' {
  import { Supplier } from 'java.util.function';

  class BWGSounds {
    static readonly ODDION_DEATH: Supplier;
    static readonly ODDION_HURT: Supplier;
    static readonly ODDION_AMBIENT: Supplier;
    static readonly ODDION_HAPPY: Supplier;
    static readonly SOUL_FRUIT_WAIL: Supplier;
    static readonly MUSIC_DISC_PIXIE_CLUB: Supplier;
    static readonly MUSIC_DISC_BETTER_DAYS: Supplier;
    static readonly MUSIC_BIOME_CRAG_GARDENS: Supplier;
    static readonly MUSIC_BIOME_ERODED_BOREALIS: Supplier;
    static readonly MUSIC_BIOME_FORGOTTEN_FOREST: Supplier;
    static readonly MUSIC_BIOME_PALE_BOG: Supplier;
    static sounds(): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.tags' {
  import { TagKey } from 'net.minecraft.tags';

  class BWGBiomeTags {
    static readonly SHARPENED_ROCKS: TagKey;
    static readonly IRONWOOD_GOUR_PLATEAU: TagKey;
    static readonly LARGE_COLD_LAKE: TagKey;
    static readonly LUSH_ARCH: TagKey;
    static readonly RED_ROCK_ARCH: TagKey;
    static readonly DRIPSTONE_ARCH: TagKey;
    static readonly OVERWORLD: TagKey;
    static readonly HOT: TagKey;
    static readonly TEMPERATE: TagKey;
    static readonly COLD: TagKey;
    static readonly WET: TagKey;
    static readonly DRY: TagKey;
    static readonly SPARSE: TagKey;
    static readonly DENSE: TagKey;
    static readonly PLAINS: TagKey;
    static readonly FOREST: TagKey;
    static readonly TAIGA: TagKey;
    static readonly DESERT: TagKey;
    static readonly SAVANNA: TagKey;
    static readonly JUNGLE: TagKey;
    static readonly BEACH: TagKey;
    static readonly SWAMP: TagKey;
    static readonly SLOPE: TagKey;
    static readonly PEAK: TagKey;
    static readonly MOUNTAIN: TagKey;
    static readonly SNOWY: TagKey;
    static readonly ICY: TagKey;
    static readonly BADLANDS: TagKey;
    static readonly SANDY: TagKey;
    static readonly FLORAL: TagKey;
    static readonly CONIFEROUS: TagKey;
    static readonly DEAD: TagKey;
    static readonly WASTELAND: TagKey;
    static readonly MAGICAL: TagKey;
    static readonly WINDSWEPT: TagKey;
    static readonly OCEAN: TagKey;
  }


  class BWGBlockTags {
    static readonly PALO_VERDE_LOGS: TagKey;
    static readonly BLACK_ICE: TagKey;
    static readonly BOREALIS_ICE: TagKey;
    static readonly SNOWY_PLANT_PLACEABLE: TagKey;
    static readonly BWG_MUSHROOM_PLACEABLE: TagKey;
    static readonly HYDRANGEA_BUSH_PLACEABLE: TagKey;
    static readonly TALL_ALLIUMS: TagKey;
    static readonly SHORT_ALLIUMS: TagKey;
    static readonly ALLIUM_FLOWER_BUSHES: TagKey;
    static readonly ALLIUMS: TagKey;
    static readonly ROSES: TagKey;
    static readonly TULIPS: TagKey;
    static readonly AMARANTH: TagKey;
    static readonly SAGES: TagKey;
    static readonly DAFFODILS: TagKey;
    static readonly RED_ROCK_BRICKS: TagKey;
    static readonly DACITE_BRICKS: TagKey;
    static readonly WHITE_DACITE_BRICKS: TagKey;
    static readonly GLOWCANE: TagKey;
    static readonly GLOW_BOTTLE: TagKey;
    static readonly OAK_SAPLINGS: TagKey;
    static readonly SPRUCE_SAPLINGS: TagKey;
    static readonly BIRCH_SAPLINGS: TagKey;
    static readonly STORAGE_BLOCKS_ALLIUM: TagKey;
    static readonly STORAGE_BLOCKS_PINK_ALLIUM: TagKey;
    static readonly STORAGE_BLOCKS_WHITE_ALLIUM: TagKey;
    static readonly STORAGE_BLOCKS_ROSE: TagKey;
  }


  class BWGEnchantmentTags {
    static readonly PREVENTS_PUMPKIN_WARDENS_SPAWNS_WHEN_MINING: TagKey;
  }


  class BWGEntityTypeTags {
    static readonly ATTACKS_PUMPKIN_WARDEN: TagKey;
  }


  class BWGItemTags {
    static readonly SHEARS: TagKey;
    static readonly PUMPKIN_WARDEN_PICKS_UP: TagKey;
    static readonly BLACK_ICE: TagKey;
    static readonly BOREALIS_ICE: TagKey;
    static readonly PALO_VERDE_LOGS: TagKey;
    static readonly TALL_ALLIUMS: TagKey;
    static readonly SHORT_ALLIUMS: TagKey;
    static readonly ALLIUM_FLOWER_BUSHES: TagKey;
    static readonly ALLIUMS: TagKey;
    static readonly ROSES: TagKey;
    static readonly TULIPS: TagKey;
    static readonly AMARANTH: TagKey;
    static readonly SAGES: TagKey;
    static readonly DAFFODILS: TagKey;
    static readonly WREATHS: TagKey;
    static readonly RED_ROCK_BRICKS: TagKey;
    static readonly DACITE_BRICKS: TagKey;
    static readonly WHITE_DACITE_BRICKS: TagKey;
    static readonly GLOWCANE_POWDER: TagKey;
    static readonly GLOWCANE_SHOOT: TagKey;
    static readonly GLOW_BOTTLE: TagKey;
    static readonly OAK_SAPLINGS: TagKey;
    static readonly SPRUCE_SAPLINGS: TagKey;
    static readonly BIRCH_SAPLINGS: TagKey;
    static readonly STORAGE_BLOCKS_ALLIUM: TagKey;
    static readonly STORAGE_BLOCKS_PINK_ALLIUM: TagKey;
    static readonly STORAGE_BLOCKS_WHITE_ALLIUM: TagKey;
    static readonly STORAGE_BLOCKS_ROSE: TagKey;
    static readonly MAKES_BLACK_DYE: TagKey;
    static readonly MAKES_BLUE_DYE: TagKey;
    static readonly MAKES_CYAN_DYE: TagKey;
    static readonly MAKES_GREEN_DYE: TagKey;
    static readonly MAKES_LIGHT_BLUE_DYE: TagKey;
    static readonly MAKES_LIME_DYE: TagKey;
    static readonly MAKES_MAGENTA_DYE: TagKey;
    static readonly MAKES_ORANGE_DYE: TagKey;
    static readonly MAKES_PINK_DYE: TagKey;
    static readonly MAKES_PURPLE_DYE: TagKey;
    static readonly MAKES_RED_DYE: TagKey;
    static readonly MAKES_WHITE_DYE: TagKey;
    static readonly MAKES_YELLOW_DYE: TagKey;
    static readonly MAKES_2_BLUE_DYE: TagKey;
    static readonly MAKES_2_CYAN_DYE: TagKey;
    static readonly MAKES_2_PINK_DYE: TagKey;
    static readonly MAKES_2_PURPLE_DYE: TagKey;
    static readonly MAKES_2_WHITE_DYE: TagKey;
  }


  class BWGStructureTags {
    static readonly PRAIRIE_HOUSES: TagKey;
    static readonly ASPEN_MANORS: TagKey;
    static readonly VILLAGE: TagKey;
    static readonly BOG_TRIALS: TagKey;
  }

}

declare module 'net.potionstudios.biomeswevegone.tags.BWGBiomeTags' {
  import { TagKey } from 'net.minecraft.tags';

  class StructureHasTags {
    static readonly HAS_PRAIRIE_HOUSE: TagKey;
    static readonly HAS_RUGGED_FOSSIL: TagKey;
    static readonly HAS_ASPEN_MANOR: TagKey;
    static readonly HAS_BOG_TRIAL: TagKey;
    static readonly HAS_VILLAGE_FORGOTTEN: TagKey;
    static readonly HAS_VILLAGE_SKYRIS: TagKey;
    static readonly HAS_VILLAGE_SALEM: TagKey;
    static readonly HAS_VILLAGE_RED_ROCK: TagKey;
    static readonly HAS_VILLAGE_PUMPKIN_PATCH: TagKey;
    static readonly HAS_VILLAGE_SWAMP: TagKey;
  }

}

declare module 'net.potionstudios.biomeswevegone.util' {
  import { ServerLevel } from 'net.minecraft.server.level';
  import { BlockPos, Vec3i } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Block } from 'net.minecraft.world.level.block';
  import { ResourceKey } from 'net.minecraft.resources';
  import { PlacedFeature } from 'net.minecraft.world.level.levelgen.placement';
  import { List } from 'java.util';
  import { ChunkGenerator } from 'net.minecraft.world.level.chunk';
  import { Types } from 'Heightmap';
  import { RandomState } from 'net.minecraft.world.level.levelgen';
  import { Vector4d, Vector2d } from 'org.joml';
  import { BoundingBox } from 'net.minecraft.world.level.levelgen.structure';

  class BoneMealHandler {
    static bwgBoneMealEventHandler(level: ServerLevel, blockPos: BlockPos, state: BlockState): boolean;
    static grassBoneMealHandler(level: ServerLevel, blockPos: BlockPos, grass: Block, placedFeatureResourceKey: ResourceKey<PlacedFeature>, randomizeFlower: boolean, grassBlock: Block): boolean;
  }


  class BWGUtil {
    static useTagReplacements: boolean;
    static _2DResourceKeyArrayTo2DList<T>(listToConvert: ResourceKey<T>[][]): ResourceKey<T>;
    static convert2DArray<V>(arrayToConvert: V[][]): V[][];
    static print2DResourceKeyArray<T>(valueToPrint: ResourceKey<T>): string;
  }


  class GeneratorHeightGetter {
    getHeight(var1: ChunkGenerator, var2: Types, var3: number, var4: number, var5: RandomState, var6: boolean): number;
  }


  class MathUtil {
    static calcHexInfo(pos: Vector2d, r: number): Vector4d;
    static getSurroundingHexPositions(pos: Vector2d, r: number): Vector4d[];
  }


  class UnsafeBoundingBox {
    constructor();

    constructor(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number);
    encapsulate(pos: Vec3i): void;
    equals(obj: any): boolean;
    hashCode(): number;
    maxX(): number;
    maxY(): number;
    maxZ(): number;
    minX(): number;
    minY(): number;
    minZ(): number;
    toBoundingBox(): BoundingBox;
    toString(): string;
    valid(): boolean;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.damagesource' {
  import { Map } from 'java.util';
  import { ResourceKey } from 'net.minecraft.resources';

  class BWGDamageTypes {
    static readonly DAMAGE_TYPE_FACTORIES: Map;
    static readonly IN_QUICKSAND: ResourceKey;
    static readonly CATTAIL_EXPLOSION: ResourceKey;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.damagesource.BWGDamageTypes' {
  import { DamageType } from 'net.minecraft.world.damagesource';
  import { BootstrapContext } from 'net.minecraft.data.worldgen';

  class DamageTypeFactory {
    generate(var1: BootstrapContext<DamageType>): DamageType;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.entity.ai.behavior' {
  import { Behavior, BehaviorControl, OneShot } from 'net.minecraft.world.entity.ai.behavior';
  import { PumpkinWarden } from 'net.potionstudios.biomeswevegone.world.entity.pumpkinwarden';
  import { PathfinderMob, LivingEntity } from 'net.minecraft.world.entity';
  import { ImmutableList } from 'com.google.common.collect';
  import { Pair } from 'com.mojang.datafixers.util';
  import { Integer } from 'java.lang';
  import { MemoryModuleType } from 'net.minecraft.world.entity.ai.memory';
  import { GlobalPos, Holder } from 'net.minecraft.core';
  import { Predicate } from 'java.util.function';
  import { PoiType } from 'net.minecraft.world.entity.ai.village.poi';

  interface DestroyPumpkin extends Behavior<PumpkinWarden> {}
  class DestroyPumpkin extends Behavior<PumpkinWarden> {
    constructor();
  }


  interface Eat extends Behavior<PumpkinWarden> {}
  class Eat extends Behavior<PumpkinWarden> {
    constructor();
  }


  interface EnterPumpkinBurrow extends Behavior<PumpkinWarden> {}
  class EnterPumpkinBurrow extends Behavior<PumpkinWarden> {
    constructor();
  }


  class GoToClosestVillage {
    static create(speedModifier: number, closeEnoughDist: number): BehaviorControl<PumpkinWarden>;
  }


  interface PlaceInContainer extends Behavior<PumpkinWarden> {}
  class PlaceInContainer extends Behavior<PumpkinWarden> {
    constructor();
  }


  class PlayTagWithVillagersAndWardens {
    static create(): BehaviorControl<PathfinderMob>;
  }


  class PumpkinWardenGoalPackages {
    static get corePackage(): ImmutableList<Pair<number, BehaviorControl<PumpkinWarden>>>;
    static get hidePackage(): ImmutableList<Pair<number, BehaviorControl<PumpkinWarden>>>;
    static get idlePackage(): ImmutableList<Pair<number, BehaviorControl<PumpkinWarden>>>;
    static get meetPackage(): ImmutableList<Pair<number, BehaviorControl<PumpkinWarden>>>;
    static get panicPackage(): ImmutableList<Pair<number, BehaviorControl<PumpkinWarden>>>;
    static get playPackage(): ImmutableList<Pair<number, BehaviorControl<PumpkinWarden>>>;
    static get restPackage(): ImmutableList<Pair<number, BehaviorControl<PumpkinWarden>>>;
    static get workPackage(): ImmutableList<Pair<number, BehaviorControl<PumpkinWarden>>>;
  }


  interface PumpkinWardenPanicTrigger extends Behavior<PumpkinWarden> {}
  class PumpkinWardenPanicTrigger extends Behavior<PumpkinWarden> {
    constructor();
  }


  class SetClosestPumpkinBurrowAsWalkTarget {
    static create(speedModifier: number): BehaviorControl<PathfinderMob>;
  }


  class SetWalkTargetFromBlockMemory {
    static create(blockTargetMemory: MemoryModuleType<GlobalPos>, speedModifier: number, closeEnoughDist: number, tooFarDistance: number, tooLongUnreachableDuration: number): OneShot<PumpkinWarden>;
  }


  class SocializeAtBell {
    static create(): OneShot<LivingEntity>;
  }


  interface Unhide extends Behavior<PumpkinWarden> {}
  class Unhide extends Behavior<PumpkinWarden> {
    constructor();
  }


  class ValidateNearbyPoi {
    static create(poiValidator: Predicate<Holder<PoiType>>, poiPosMemory: MemoryModuleType<GlobalPos>): BehaviorControl<LivingEntity>;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.entity.ai.memory' {
  import { Supplier } from 'java.util.function';

  class BWGMemoryModuleType {
    static readonly VISIBLE_PUMPKIN_WARDENS: Supplier;
    static readonly HOPPER_BARREL_LOCATION: Supplier;
    static memoryModuleTypes(): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.entity.ai.sensing' {
  import { Supplier } from 'java.util.function';
  import { Sensor } from 'net.minecraft.world.entity.ai.sensing';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { Set } from 'java.util';
  import { MemoryModuleType } from 'net.minecraft.world.entity.ai.memory';

  class BWGSensorType {
    static readonly NEAREST_PUMPKIN_WARDENS: Supplier;
    static sensorTypes(): void;
  }


  interface PumpkinWardenSensor extends Sensor<LivingEntity> {}
  class PumpkinWardenSensor extends Sensor<LivingEntity> {
    requires(): Set<MemoryModuleType<any>>;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.entity.ai.village.poi' {
  import { ResourceKey } from 'net.minecraft.resources';

  class BWGPoiTypes {
    static readonly FORAGER: ResourceKey;
    static readonly PUMPKIN_BURROW: ResourceKey;
    static poiTypes(): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.entity.boats' {
  import { Boat, ChestBoat } from 'net.minecraft.world.entity.vehicle';
  import { EntityType } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { Item } from 'net.minecraft.world.item';
  import { Type } from 'net.potionstudios.biomeswevegone.world.entity.boats.BWGBoatEntity';

  interface BWGBoatEntity extends Boat {}
  class BWGBoatEntity extends Boat {
    constructor(entityType: EntityType<Boat>, level: Level);

    constructor(level: Level, x: number, y: number, z: number);
    get dropItem(): Item;
    get modVariant(): Type;
    setVariant(pVariant: Type): void;
  }


  interface BWGChestBoatEntity extends ChestBoat {}
  class BWGChestBoatEntity extends ChestBoat {
    constructor(entityType: EntityType<Boat>, level: Level);

    constructor(level: Level, x: number, y: number, z: number);
    get dropItem(): Item;
    get modVariant(): Type;
    setVariant(pVariant: Type): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.entity.boats.BWGBoatEntity' {
  import { Enum } from 'java.lang';
  import { Supplier } from 'java.util.function';
  import { Item } from 'net.minecraft.world.item';
  import { List } from 'java.util';

  interface Type extends Enum<Type> {}
  class Type extends Enum<Type> {
    static readonly ASPEN: Type;
    static readonly BAOBAB: Type;
    static readonly CHERRY: Type;
    static readonly CIKA: Type;
    static readonly CYPRESS: Type;
    static readonly EBONY: Type;
    static readonly FIR: Type;
    static readonly FLORUS: Type;
    static readonly GREEN_ENCHANTED: Type;
    static readonly HOLLY: Type;
    static readonly IRONWOOD: Type;
    static readonly JACARANDA: Type;
    static readonly MAHOGANY: Type;
    static readonly MAPLE: Type;
    static readonly PALM: Type;
    static readonly PINE: Type;
    static readonly RAINBOW_EUCALYPTUS: Type;
    static readonly REDWOOD: Type;
    static readonly SAKURA: Type;
    static readonly SKYRIS: Type;
    static readonly SPIRIT: Type;
    static readonly WHITE_MANGROVE: Type;
    static readonly WILLOW: Type;
    static readonly WITCH_HAZEL: Type;
    static readonly ZELKOVA: Type;
    static byId(id: number): Type;
    static byName(name: string): Type;
    get boatItem(): Supplier<Item>;
    get chestBoatItem(): Supplier<Item>;
    get name(): string;
    get serializedName(): string;
    toString(): string;
    static valueOf(name: string): Type;
    static values(): Type[];
  }

}

declare module 'net.potionstudios.biomeswevegone.world.entity' {
  import { Supplier, Consumer, BiConsumer } from 'java.util.function';
  import { SpawnPlacement } from 'net.potionstudios.biomeswevegone.world.entity.BWGEntityType';
  import { Mob, EntityType, LivingEntity } from 'net.minecraft.world.entity';
  import { AttributeSupplier } from 'net.minecraft.world.entity.ai.attributes';

  class BWGEntityType {
    static readonly MAN_O_WAR: Supplier;
    static readonly PUMPKIN_WARDEN: Supplier;
    static readonly ODDION: Supplier;
    static readonly BWG_BOAT: Supplier;
    static readonly BWG_CHEST_BOAT: Supplier;
    static readonly WREATH: Supplier;
    static entities(): void;
    static registerEntityAttributes(consumer: BiConsumer<EntityType<LivingEntity>, AttributeSupplier>): void;
    static registerSpawnPlacements<T extends Mob>(consumer: Consumer<SpawnPlacement<T>>): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.entity.decoration' {
  import { HangingEntity } from 'net.minecraft.world.entity.decoration';
  import { VariantHolder, EntityType, Entity } from 'net.minecraft.world.entity';
  import { Type } from 'net.potionstudios.biomeswevegone.world.entity.decoration.Wreath';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Packet } from 'net.minecraft.network.protocol';
  import { ClientGamePacketListener, ClientboundAddEntityPacket } from 'net.minecraft.network.protocol.game';
  import { ServerEntity } from 'net.minecraft.server.level';
  import { ItemStack } from 'net.minecraft.world.item';

  interface Wreath extends VariantHolder<Type>, HangingEntity {}
  class Wreath extends VariantHolder<Type> {
    constructor(entityType: EntityType<HangingEntity>, level: Level);

    constructor(level: Level, pos: BlockPos, facingDirection: Direction, type: Type);

    constructor(entityType: EntityType<HangingEntity>, level: Level, pos: BlockPos, facingDirection: Direction, type: Type);
    addAdditionalSaveData(compound: CompoundTag): void;
    dropItem(entity: Entity): void;
    get pickResult(): ItemStack;
    get variant(): Type;
    getAddEntityPacket(entity: ServerEntity): Packet<ClientGamePacketListener>;
    playPlacementSound(): void;
    readAdditionalSaveData(compound: CompoundTag): void;
    recreateFromPacket(packet: ClientboundAddEntityPacket): void;
    set variant(type: Type);
  }

}

declare module 'net.potionstudios.biomeswevegone.world.entity.decoration.Wreath' {
  import { Enum } from 'java.lang';
  import { WreathItem } from 'net.potionstudios.biomeswevegone.world.item.custom';
  import { List } from 'java.util';

  interface Type extends Enum<Type> {}
  class Type extends Enum<Type> {
    static readonly HOLLY: Type;
    static readonly MUSHROOM: Type;
    static readonly ODDION: Type;
    static readonly PETAL: Type;
    static readonly ROSY: Type;
    static readonly WINTER_ROSY: Type;
    static readonly DEFAULT: Type;
    static byId(id: number): Type;
    static byName(name: string): Type;
    get item(): WreathItem;
    get serializedName(): string;
    static valueOf(name: string): Type;
    static values(): Type[];
  }

}

declare module 'net.potionstudios.biomeswevegone.world.entity.manowar' {
  import { Animal, Bucketable } from 'net.minecraft.world.entity.animal';
  import { GeoEntity } from 'software.bernie.geckolib.animatable';
  import { EntityType, MobSpawnType, SpawnGroupData, AgeableMob } from 'net.minecraft.world.entity';
  import { Level, LevelReader, LevelAccessor, ServerLevelAccessor } from 'net.minecraft.world.level';
  import { ItemStack } from 'net.minecraft.world.item';
  import { BlockPos } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';
  import { Builder } from 'AttributeSupplier';
  import { InteractionResult, InteractionHand, DifficultyInstance } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Colors } from 'net.potionstudios.biomeswevegone.world.entity.manowar.ManOWar';
  import { ControllerRegistrar } from 'AnimatableManager';
  import { AnimatableInstanceCache } from 'software.bernie.geckolib.animatable.instance';
  import { SoundEvent } from 'net.minecraft.sounds';

  interface ManOWar extends GeoEntity, Bucketable, Animal {}
  class ManOWar extends GeoEntity {
    xBodyRot: number;
    xBodyRotO: number;
    zBodyRot: number;
    zBodyRotO: number;
    tentacleMovement: number;
    oldTentacleMovement: number;
    tentacleAngle: number;
    oldTentacleAngle: number;
    glowLayer: boolean;
    constructor(entityType: EntityType<ManOWar>, level: Level);
    addAdditionalSaveData(compoundTag: CompoundTag): void;
    aiStep(): void;
    baseTick(): void;
    canBeLeashed(): boolean;
    static checkManOWarSpawnRules(entity: EntityType<ManOWar>, world: LevelAccessor, spawnType: MobSpawnType, pos: BlockPos, rand: RandomSource): boolean;
    checkSpawnObstruction(levelReader: LevelReader): boolean;
    static createAttributes(): Builder;
    finalizeSpawn(level: ServerLevelAccessor, difficulty: DifficultyInstance, spawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    fromBucket(): boolean;
    get animatableInstanceCache(): AnimatableInstanceCache;
    get bucketItemStack(): ItemStack;
    get color(): Colors;
    get maxAirSupply(): number;
    get pickupSound(): SoundEvent;
    get rawColor(): number;
    getBreedOffspring(serverLevel: ServerLevel, ageableMob: AgeableMob): AgeableMob;
    handleEntityEvent(b: number): void;
    hasMovementVector(): boolean;
    isFood(stack: ItemStack): boolean;
    isPushedByFluid(): boolean;
    loadFromBucketTag(tag: CompoundTag): void;
    static makeIndex<T>(array: T[], index: number): T;
    mobInteract(player: Player, hand: InteractionHand): InteractionResult;
    playerTouch(player: Player): void;
    readAdditionalSaveData(compoundTag: CompoundTag): void;
    registerControllers(controllerRegistrar: ControllerRegistrar): void;
    removeWhenFarAway(pDistanceToClosestPlayer: number): boolean;
    requiresCustomPersistence(): boolean;
    saveToBucketTag(stack: ItemStack): void;
    set color(color: Colors);
    setColor(color: number): void;
    setFromBucket(pFromBucket: boolean): void;
    setMovementVector(f: number, g: number, h: number): void;
    spawnChildFromBreeding(level: ServerLevel, animal: Animal): void;
    travel(vec3: Vec3): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.entity.manowar.ManOWar' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Colors extends Enum<Colors> {}
  class Colors extends Enum<Colors> {
    static readonly BLUE: Colors;
    static readonly PURPLE: Colors;
    static readonly MAGENTA: Colors;
    static readonly RAINBOW: Colors;
    static byIndex(index: number): Colors;
    get serializedName(): string;
    static valueOf(name: string): Colors;
    static values(): Colors[];
  }

}

declare module 'net.potionstudios.biomeswevegone.world.entity.npc' {
  import { Supplier, BiConsumer } from 'java.util.function';
  import { Map } from 'java.util';
  import { Int2ObjectMap } from 'it.unimi.dsi.fastutil.ints';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { VillagerType } from 'net.minecraft.world.entity.npc';

  class BWGVillagerProfessions {
    static readonly FORAGER: Supplier;
    static professions(): void;
  }


  class BWGVillagerTrades {
    static readonly TRADES: Map;
    static readonly WANDERING_TRADER_TRADES: Int2ObjectMap;
    static makeTrades(): void;
    static makeWanderingTrades(): void;
  }


  class BWGVillagerTypes {
    static readonly RED_ROCK: Supplier;
    static readonly SALEM: Supplier;
    static readonly SKYRIS: Supplier;
    static setVillagerBiomes(consumer: BiConsumer<ResourceKey<Biome>, VillagerType>): void;
    static villagerTypes(): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.entity.oddion' {
  import { PathfinderMob, VariantHolder, EntityType, MobSpawnType, SpawnGroupData, EntityDimensions, Pose } from 'net.minecraft.world.entity';
  import { GeoEntity } from 'software.bernie.geckolib.animatable';
  import { Variant } from 'net.potionstudios.biomeswevegone.world.entity.oddion.Oddion';
  import { Level, LevelAccessor, ServerLevelAccessor } from 'net.minecraft.world.level';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { BlockPos } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';
  import { DifficultyInstance } from 'net.minecraft.world';
  import { ControllerRegistrar } from 'AnimatableManager';
  import { Builder } from 'AttributeSupplier';
  import { EntityDataAccessor } from 'net.minecraft.network.syncher';
  import { AnimatableInstanceCache } from 'software.bernie.geckolib.animatable.instance';

  interface Oddion extends GeoEntity, VariantHolder<Variant>, PathfinderMob {}
  class Oddion extends GeoEntity {
    onionTime: number;
    constructor(entityType: EntityType<PathfinderMob>, level: Level);

    constructor(level: Level);
    addAdditionalSaveData(compound: CompoundTag): void;
    aiStep(): void;
    checkGoals(): void;
    static checkOddionSpawnRules(entity: EntityType<Oddion>, world: LevelAccessor, spawnType: MobSpawnType, pos: BlockPos, rand: RandomSource): boolean;
    static createAttributes(): Builder;
    finalizeSpawn(level: ServerLevelAccessor, difficulty: DifficultyInstance, spawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get animatableInstanceCache(): AnimatableInstanceCache;
    get groundingTime(): number;
    get petTime(): number;
    get risingTime(): number;
    get variant(): Variant;
    getDimensions(pose: Pose): EntityDimensions;
    isBeingPet(): boolean;
    isGrounded(): boolean;
    isPartying(): boolean;
    onSyncedDataUpdated(dataAccessor: EntityDataAccessor<any>): void;
    readAdditionalSaveData(compound: CompoundTag): void;
    registerControllers(controllers: ControllerRegistrar): void;
    removeWhenFarAway(distanceToClosestPlayer: number): boolean;
    set petTime(time: number);
    set variant(variant: Variant);
    setGrounded(flag: boolean): void;
    setGroundingTimer(flag: number): void;
    setPartying(flag: boolean): void;
    setRecordPlayingNearby(jukebox: BlockPos, partying: boolean): void;
    setRisingTimer(flag: number): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.entity.oddion.Oddion' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Variant extends Enum<Variant> {}
  class Variant extends Enum<Variant> {
    static readonly STANDARD: Variant;
    static readonly PINK: Variant;
    static readonly ALBINO: Variant;
    static byId(id: number): Variant;
    get id(): number;
    get name(): string;
    get serializedName(): string;
    static valueOf(name: string): Variant;
    static values(): Variant[];
  }

}

declare module 'net.potionstudios.biomeswevegone.world.entity.pumpkinwarden' {
  import { PathfinderMob, VariantHolder, EntityType, SpawnGroupData, MobSpawnType, EntityDimensions, Pose, Entity } from 'net.minecraft.world.entity';
  import { GeoEntity } from 'software.bernie.geckolib.animatable';
  import { Variant } from 'net.potionstudios.biomeswevegone.world.entity.pumpkinwarden.PumpkinWarden';
  import { Map } from 'java.util';
  import { Level, ServerLevelAccessor } from 'net.minecraft.world.level';
  import { Brain } from 'net.minecraft.world.entity.ai';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Builder } from 'AttributeSupplier';
  import { ControllerRegistrar } from 'AnimatableManager';
  import { AnimatableInstanceCache } from 'software.bernie.geckolib.animatable.instance';
  import { BlockPos, GlobalPos } from 'net.minecraft.core';
  import { DifficultyInstance } from 'net.minecraft.world';
  import { ItemStack } from 'net.minecraft.world.item';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { EntityDataAccessor } from 'net.minecraft.network.syncher';
  import { MemoryModuleType } from 'net.minecraft.world.entity.ai.memory';

  interface PumpkinWarden extends GeoEntity, VariantHolder<Variant>, PathfinderMob {}
  class PumpkinWarden extends GeoEntity {
    static readonly POI_MEMORIES: Map;
    constructor(entityType: EntityType<PathfinderMob>, level: Level);
    addAdditionalSaveData(compound: CompoundTag): void;
    aiStep(): void;
    canBeLeashed(): boolean;
    canBeSeenAsEnemy(): boolean;
    canHoldItem(stack: ItemStack): boolean;
    canMove(): boolean;
    canPickUpLoot(): boolean;
    canTakeItem(stack: ItemStack): boolean;
    checkDespawn(): void;
    static createAttributes(): Builder;
    die(damageSource: DamageSource): void;
    finalizeSpawn(level: ServerLevelAccessor, difficulty: DifficultyInstance, spawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get animatableInstanceCache(): AnimatableInstanceCache;
    get brain(): Brain<PumpkinWarden>;
    get variant(): Variant;
    get voicePitch(): number;
    getDimensions(pose: Pose): EntityDimensions;
    handleEntityEvent(id: number): void;
    hide(): void;
    hurt(source: DamageSource, amount: number): boolean;
    isHiding(): boolean;
    onSyncedDataUpdated(dataAccessor: EntityDataAccessor<any>): void;
    readAdditionalSaveData(compound: CompoundTag): void;
    registerControllers(controllerRegistrar: ControllerRegistrar): void;
    releasePoi(moduleType: MemoryModuleType<GlobalPos>): void;
    removeWhenFarAway(distanceToClosestPlayer: number): boolean;
    set variant(variant: Variant);
    setRecordPlayingNearby(blockPos: BlockPos, partying: boolean): void;
    startSleeping(pos: BlockPos): void;
    stopSleeping(): void;
    travel(travelVector: Vec3): void;
    unhide(): void;
    static villagerToPumpkinWarden(entity: Entity, stack: ItemStack, level: Level): boolean;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.entity.pumpkinwarden.PumpkinWarden' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Variant extends Enum<Variant> {}
  class Variant extends Enum<Variant> {
    static readonly DEFAULT: Variant;
    static readonly PALE: Variant;
    static readonly CHEERY: Variant;
    static readonly FROWNY: Variant;
    static readonly SILLY: Variant;
    static byId(id: number): Variant;
    get id(): number;
    get name(): string;
    get serializedName(): string;
    static valueOf(name: string): Variant;
    static values(): Variant[];
  }

}

declare module 'net.potionstudios.biomeswevegone.world.entity.schedule' {
  import { Supplier } from 'java.util.function';

  class BWGSchedule {
    static readonly PUMPKIN_WARDEN: Supplier;
    static schedules(): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.item.boat' {
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { Type } from 'net.potionstudios.biomeswevegone.world.entity.boats.BWGBoatEntity';
  import { Properties } from 'Item';
  import { InteractionResultHolder, InteractionHand } from 'net.minecraft.world';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';

  interface BWGBoatItem extends Item {}
  class BWGBoatItem extends Item {
    constructor(hasChest: boolean, type: Type, properties: Properties);
    hasChest(): boolean;
    use(level: Level, player: Player, usedHand: InteractionHand): InteractionResultHolder<ItemStack>;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.item.brewing' {
  import { TriConsumer } from 'org.apache.logging.log4j.util';
  import { Holder } from 'net.minecraft.core';
  import { Potion } from 'net.minecraft.world.item.alchemy';
  import { Item } from 'net.minecraft.world.item';

  class BWGBrewingRecipes {
    static buildBrewingRecipes(consumer: TriConsumer<Holder<Potion>, Item, Holder<Potion>>): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.item' {
  import { ResourceKey } from 'net.minecraft.resources';
  import { ArrayList } from 'java.util';
  import { Supplier } from 'java.util.function';
  import { Item } from 'net.minecraft.world.item';

  class BWGCreativeTabs {
    static readonly CREATIVE_TAB: ResourceKey;
    static readonly WOOD_TAB: ResourceKey;
    static tabs(): void;
  }


  class BWGItems {
    static readonly ITEMS: ArrayList;
    static readonly NO_LANG_ITEMS: ArrayList;
    static readonly SIMPLE_ITEMS: ArrayList;
    static readonly BWG_LOGO: Supplier;
    static readonly MAN_O_WAR_SPAWN_EGG: Supplier;
    static readonly PUMPKIN_WARDEN_SPAWN_EGG: Supplier;
    static readonly ODDION_SPAWN_EGG: Supplier;
    static readonly MAN_O_WAR_BUCKET: Supplier;
    static readonly CATTAIL_SPROUT: Supplier;
    static readonly FLUORESCENT_CATTAIL_SPROUT: Supplier;
    static readonly PUMPKIN_BURROW: Supplier;
    static readonly BLUE_GLOWCANE_SHOOT: Supplier;
    static readonly GREEN_GLOWCANE_SHOOT: Supplier;
    static readonly RED_GLOWCANE_SHOOT: Supplier;
    static readonly YELLOW_GLOWCANE_SHOOT: Supplier;
    static readonly BLUE_GLOWCANE_POWDER: Supplier;
    static readonly GREEN_GLOWCANE_POWDER: Supplier;
    static readonly RED_GLOWCANE_POWDER: Supplier;
    static readonly YELLOW_GLOWCANE_POWDER: Supplier;
    static readonly PALE_PUMPKIN_SEEDS: Supplier;
    static readonly BAOBAB_FRUIT: Supplier;
    static readonly SOUL_FRUIT: Supplier;
    static readonly YUCCA_FRUIT: Supplier;
    static readonly COOKED_YUCCA_FRUIT: Supplier;
    static readonly GREEN_APPLE: Supplier;
    static readonly GREEN_APPLE_PIE: Supplier;
    static readonly BLUEBERRIES: Supplier;
    static readonly BLUEBERRY_PIE: Supplier;
    static readonly ODDION_BULB: Supplier;
    static readonly COOKED_ODDION_BULB: Supplier;
    static readonly ALLIUM_ODDION_SOUP: Supplier;
    static readonly BLOOMING_ODDION: Supplier;
    static readonly WHITE_PUFFBALL_SPORES: Supplier;
    static readonly WHITE_PUFFBALL_CAP: Supplier;
    static readonly COOKED_WHITE_PUFFBALL_CAP: Supplier;
    static readonly WHITE_PUFFBALL_STEW: Supplier;
    static readonly ALOE_VERA_JUICE: Supplier;
    static readonly TINY_LILY_PADS: Supplier;
    static readonly FLOWERING_TINY_LILY_PADS: Supplier;
    static readonly WATER_SILK: Supplier;
    static readonly MUSIC_DISC_PIXIE_CLUB: Supplier;
    static readonly MUSIC_DISC_BETTER_DAYS: Supplier;
    static readonly WREATH: Supplier;
    static readonly HOLLY_WREATH: Supplier;
    static readonly MUSHROOM_WREATH: Supplier;
    static readonly ODDION_WREATH: Supplier;
    static readonly PETAL_WREATH: Supplier;
    static readonly ROSY_WREATH: Supplier;
    static readonly WINTER_ROSY_WREATH: Supplier;
    static items(): void;
    static register<I extends Item>(id: string, item: Supplier<I>): Supplier<I>;
    static registerItem<I extends Item>(id: string, item: Supplier<I>): Supplier<I>;
    static registerItemNoLang<I extends Item>(id: string, item: Supplier<I>): Supplier<I>;
    static registerSimpleItem<I extends Item>(id: string, item: Supplier<I>): Supplier<I>;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.item.custom' {
  import { BlockItem, Item } from 'net.minecraft.world.item';
  import { Supplier } from 'java.util.function';
  import { Block } from 'net.minecraft.world.level.block';
  import { Properties } from 'Item';
  import { InteractionResult } from 'net.minecraft.world';
  import { UseOnContext } from 'net.minecraft.world.item.context';
  import { ColorProperty } from 'net.potionstudios.biomeswevegone.world.level.block.plants.vegetation.cattail';
  import { Type } from 'net.potionstudios.biomeswevegone.world.entity.decoration.Wreath';

  interface CampfireExplodingBlockItem extends BlockItem {}
  class CampfireExplodingBlockItem extends BlockItem {
    constructor(block: Supplier<Block>, properties: Properties);
    useOn(context: UseOnContext): InteractionResult;
  }


  interface PowderItem extends Item {}
  class PowderItem extends Item {
    constructor(colorProperty: ColorProperty);
    get color(): ColorProperty;
  }


  interface WreathItem extends Item {}
  class WreathItem extends Item {
    constructor(properties: Properties, type: Type);
    get type(): Type;
    useOn(context: UseOnContext): InteractionResult;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.item.jukebox' {
  import { Map } from 'java.util';
  import { ResourceKey } from 'net.minecraft.resources';

  class BWGJukeBoxSongs {
    static readonly JUKEBOX_SONG_FACTORIES: Map;
    static readonly PIXIE_CLUB: ResourceKey;
    static readonly BETTER_DAYS: ResourceKey;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.item.jukebox.BWGJukeBoxSongs' {
  import { JukeboxSong } from 'net.minecraft.world.item';
  import { BootstrapContext } from 'net.minecraft.data.worldgen';

  class JukeBoxSongFactory {
    generate(var1: BootstrapContext<JukeboxSong>): JukeboxSong;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.item.tools' {
  import { BiConsumer, Consumer } from 'java.util.function';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Pair } from 'com.mojang.datafixers.util';

  class ToolInteractions {
    static registerFlattenables(consumer: BiConsumer<Block, BlockState>): void;
    static registerStrippableBlocks(consumer: BiConsumer<Block, Block>): void;
    static registerTillables(consumer: BiConsumer<Block, Pair<Predicate<UseOnContext>, Consumer<UseOnContext>>>): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.block' {
  import { BiConsumer, Supplier } from 'java.util.function';
  import { ItemLike } from 'net.minecraft.world.level';
  import { Float, Integer } from 'java.lang';
  import { TriConsumer } from 'org.apache.logging.log4j.util';
  import { Block } from 'net.minecraft.world.level.block';
  import { ArrayList } from 'java.util';
  import { BWGSandSet } from 'net.potionstudios.biomeswevegone.world.level.block.sand';
  import { PottedBlock } from 'net.potionstudios.biomeswevegone.world.level.block.plants';
  import { FlowerBlockFeature } from 'net.potionstudios.biomeswevegone.world.level.block.plants.flower';
  import { BWGBlockSet } from 'net.potionstudios.biomeswevegone.world.level.block.set';
  import { Properties } from 'BlockBehaviour';

  class BlockFeatures {
    static registerCompostables(consumer: BiConsumer<ItemLike, number>): void;
    static registerFlammable(consumer: TriConsumer<Block, number, number>): void;
    static registerFurnaceFuels(consumer: BiConsumer<ItemLike, number>): void;
  }


  class BWGBlocks {
    static readonly cubeAllBlocks: ArrayList;
    static readonly BLOCKS: ArrayList;
    static readonly BLOCK_ITEMS: ArrayList;
    static readonly FORAGERS_TABLE: Supplier;
    static readonly PEAT: Supplier;
    static readonly SANDY_DIRT: Supplier;
    static readonly SANDY_DIRT_PATH: Supplier;
    static readonly SANDY_FARMLAND: Supplier;
    static readonly LUSH_DIRT: Supplier;
    static readonly LUSH_GRASS_BLOCK: Supplier;
    static readonly LUSH_DIRT_PATH: Supplier;
    static readonly LUSH_FARMLAND: Supplier;
    static readonly BLACK_SAND_SET: BWGSandSet;
    static readonly WHITE_SAND_SET: BWGSandSet;
    static readonly BLUE_SAND_SET: BWGSandSet;
    static readonly PURPLE_SAND_SET: BWGSandSet;
    static readonly PINK_SAND_SET: BWGSandSet;
    static readonly WINDSWEPT_SAND_SET: BWGSandSet;
    static readonly WINDSWEPT_SANDSTONE_PILLAR: Supplier;
    static readonly CRACKED_SAND: Supplier;
    static readonly CRACKED_RED_SAND: Supplier;
    static readonly QUICKSAND: Supplier;
    static readonly RED_QUICKSAND: Supplier;
    static readonly BLACK_ICE: Supplier;
    static readonly PACKED_BLACK_ICE: Supplier;
    static readonly BOREALIS_ICE: Supplier;
    static readonly PACKED_BOREALIS_ICE: Supplier;
    static readonly BLUEBERRY_BUSH: Supplier;
    static readonly FLOWERING_JACARANDA_BUSH: Supplier;
    static readonly JACARANDA_BUSH: PottedBlock;
    static readonly FLOWERING_INDIGO_JACARANDA_BUSH: Supplier;
    static readonly INDIGO_JACARANDA_BUSH: PottedBlock;
    static readonly HYDRANGEA_BUSH: PottedBlock;
    static readonly HYDRANGEA_HEDGE: Supplier;
    static readonly SHRUB: PottedBlock;
    static readonly FIRECRACKER_FLOWER_BUSH: PottedBlock;
    static readonly ODDION_CROP: Supplier;
    static readonly GREEN_MUSHROOM_BLOCK: Supplier;
    static readonly WEEPING_MILKCAP_MUSHROOM_BLOCK: Supplier;
    static readonly WOOD_BLEWIT_MUSHROOM_BLOCK: Supplier;
    static readonly WHITE_MUSHROOM_STEM: Supplier;
    static readonly BROWN_MUSHROOM_STEM: Supplier;
    static readonly GREEN_MUSHROOM: Supplier;
    static readonly WEEPING_MILKCAP: Supplier;
    static readonly WOOD_BLEWIT: Supplier;
    static readonly TALL_ALLIUM: Supplier;
    static readonly ALLIUM_FLOWER_BUSH: FlowerBlockFeature;
    static readonly ALLIUM_PETAL_BLOCK: Supplier;
    static readonly PINK_ALLIUM: FlowerBlockFeature;
    static readonly TALL_PINK_ALLIUM: Supplier;
    static readonly PINK_ALLIUM_FLOWER_BUSH: FlowerBlockFeature;
    static readonly PINK_ALLIUM_PETAL_BLOCK: Supplier;
    static readonly WHITE_ALLIUM: FlowerBlockFeature;
    static readonly TALL_WHITE_ALLIUM: Supplier;
    static readonly WHITE_ALLIUM_FLOWER_BUSH: FlowerBlockFeature;
    static readonly WHITE_ALLIUM_PETAL_BLOCK: Supplier;
    static readonly CYAN_PITCHER_PLANT: Supplier;
    static readonly MAGENTA_PITCHER_PLANT: Supplier;
    static readonly ROSE: FlowerBlockFeature;
    static readonly OSIRIA_ROSE: FlowerBlockFeature;
    static readonly BLACK_ROSE: FlowerBlockFeature;
    static readonly CYAN_ROSE: FlowerBlockFeature;
    static readonly BLUE_ROSE_BUSH: Supplier;
    static readonly ROSE_PETAL_BLOCK: Supplier;
    static readonly CYAN_TULIP: FlowerBlockFeature;
    static readonly GREEN_TULIP: FlowerBlockFeature;
    static readonly MAGENTA_TULIP: FlowerBlockFeature;
    static readonly PURPLE_TULIP: FlowerBlockFeature;
    static readonly YELLOW_TULIP: FlowerBlockFeature;
    static readonly AMARANTH: FlowerBlockFeature;
    static readonly CYAN_AMARANTH: FlowerBlockFeature;
    static readonly MAGENTA_AMARANTH: FlowerBlockFeature;
    static readonly ORANGE_AMARANTH: FlowerBlockFeature;
    static readonly PURPLE_AMARANTH: FlowerBlockFeature;
    static readonly BLUE_SAGE: FlowerBlockFeature;
    static readonly PURPLE_SAGE: FlowerBlockFeature;
    static readonly WHITE_SAGE: FlowerBlockFeature;
    static readonly DAFFODIL: FlowerBlockFeature;
    static readonly PINK_DAFFODIL: FlowerBlockFeature;
    static readonly YELLOW_DAFFODIL: FlowerBlockFeature;
    static readonly PINK_ANEMONE: FlowerBlockFeature;
    static readonly WHITE_ANEMONE: FlowerBlockFeature;
    static readonly ALPINE_BELLFLOWER: FlowerBlockFeature;
    static readonly LAZARUS_BELLFLOWER: FlowerBlockFeature;
    static readonly PEACH_LEATHER_FLOWER: FlowerBlockFeature;
    static readonly VIOLET_LEATHER_FLOWER: FlowerBlockFeature;
    static readonly ANGELICA: FlowerBlockFeature;
    static readonly BEGONIA: FlowerBlockFeature;
    static readonly BISTORT: FlowerBlockFeature;
    static readonly CALIFORNIA_POPPY: FlowerBlockFeature;
    static readonly CROCUS: FlowerBlockFeature;
    static readonly DELPHINIUM: Supplier;
    static readonly FAIRY_SLIPPER: FlowerBlockFeature;
    static readonly FOXGLOVE: Supplier;
    static readonly GUZMANIA: FlowerBlockFeature;
    static readonly INCAN_LILY: FlowerBlockFeature;
    static readonly IRIS: FlowerBlockFeature;
    static readonly JAPANESE_ORCHID: Supplier;
    static readonly KOVAN_FLOWER: FlowerBlockFeature;
    static readonly LOLLIPOP_FLOWER: FlowerBlockFeature;
    static readonly ORANGE_DAISY: FlowerBlockFeature;
    static readonly PROTEA_FLOWER: FlowerBlockFeature;
    static readonly RICHEA: FlowerBlockFeature;
    static readonly SILVER_VASE_FLOWER: FlowerBlockFeature;
    static readonly HORSEWEED: FlowerBlockFeature;
    static readonly WINTER_SUCCULENT: FlowerBlockFeature;
    static readonly SNOWDROPS: PottedBlock;
    static readonly WINTER_CYCLAMEN: PottedBlock;
    static readonly WINTER_ROSE: PottedBlock;
    static readonly WINTER_SCILLA: PottedBlock;
    static readonly CATTAIL: Supplier;
    static readonly CATTAIL_SPROUT: Supplier;
    static readonly FLUORESCENT_CATTAIL: Supplier;
    static readonly FLUORESCENT_CATTAIL_SPROUT: Supplier;
    static readonly BLUE_GLOWCANE: Supplier;
    static readonly GREEN_GLOWCANE: Supplier;
    static readonly RED_GLOWCANE: Supplier;
    static readonly YELLOW_GLOWCANE: Supplier;
    static readonly BLUE_GLOW_BOTTLE: Supplier;
    static readonly GREEN_GLOW_BOTTLE: Supplier;
    static readonly RED_GLOW_BOTTLE: Supplier;
    static readonly YELLOW_GLOW_BOTTLE: Supplier;
    static readonly WHITE_PUFFBALL: PottedBlock;
    static readonly TALL_PRAIRIE_GRASS: Supplier;
    static readonly PRAIRIE_GRASS: Supplier;
    static readonly TALL_BEACH_GRASS: Supplier;
    static readonly BEACH_GRASS: Supplier;
    static readonly LEAF_PILE: Supplier;
    static readonly CLOVER_PATCH: Supplier;
    static readonly FLOWER_PATCH: Supplier;
    static readonly WHITE_SAKURA_PETALS: Supplier;
    static readonly YELLOW_SAKURA_PETALS: Supplier;
    static readonly POISON_IVY: Supplier;
    static readonly SKYRIS_VINE: Supplier;
    static readonly WITCH_HAZEL_BRANCH: Supplier;
    static readonly WITCH_HAZEL_BLOSSOM: Supplier;
    static readonly SHELF_FUNGI: Supplier;
    static readonly MINI_CACTUS: PottedBlock;
    static readonly PRICKLY_PEAR_CACTUS: PottedBlock;
    static readonly GOLDEN_SPINED_CACTUS: PottedBlock;
    static readonly BARREL_CACTUS: Supplier;
    static readonly FLOWERING_BARREL_CACTUS: Supplier;
    static readonly CARVED_BARREL_CACTUS: Supplier;
    static readonly ALOE_VERA: Supplier;
    static readonly BLOOMING_ALOE_VERA: Supplier;
    static readonly TINY_LILY_PADS: Supplier;
    static readonly FLOWERING_TINY_LILY_PADS: Supplier;
    static readonly APPLE_FRUIT_BLOCK: Supplier;
    static readonly BAOBAB_FRUIT_BLOCK: Supplier;
    static readonly GREEN_APPLE_FRUIT_BLOCK: Supplier;
    static readonly YUCCA_FRUIT_BLOCK: Supplier;
    static readonly SOUL_FRUIT_BLOCK: Supplier;
    static readonly DACITE_SET: BWGBlockSet;
    static readonly DACITE_BRICKS_SET: BWGBlockSet;
    static readonly CRACKED_DACITE_BRICKS_SET: BWGBlockSet;
    static readonly MOSSY_DACITE_BRICKS_SET: BWGBlockSet;
    static readonly CHISELED_DACITE_BRICKS_SET: BWGBlockSet;
    static readonly DACITE_COBBLESTONE_SET: BWGBlockSet;
    static readonly DACITE_PILLAR: Supplier;
    static readonly DACITE_TILES_SET: BWGBlockSet;
    static readonly PODZOL_DACITE: Supplier;
    static readonly OVERGROWN_DACITE: Supplier;
    static readonly WHITE_DACITE_SET: BWGBlockSet;
    static readonly WHITE_DACITE_BRICKS_SET: BWGBlockSet;
    static readonly CRACKED_WHITE_DACITE_BRICKS_SET: BWGBlockSet;
    static readonly MOSSY_WHITE_DACITE_BRICKS_SET: BWGBlockSet;
    static readonly CHISELED_WHITE_DACITE_BRICKS_SET: BWGBlockSet;
    static readonly WHITE_DACITE_COBBLESTONE_SET: BWGBlockSet;
    static readonly WHITE_DACITE_PILLAR: Supplier;
    static readonly WHITE_DACITE_TILES_SET: BWGBlockSet;
    static readonly WHITE_PODZOL_DACITE: Supplier;
    static readonly WHITE_OVERGROWN_DACITE: Supplier;
    static readonly OVERGROWN_STONE: Supplier;
    static readonly RED_ROCK_SET: BWGBlockSet;
    static readonly RED_ROCK_BRICKS_SET: BWGBlockSet;
    static readonly CRACKED_RED_ROCK_BRICKS_SET: BWGBlockSet;
    static readonly CHISELED_RED_ROCK_BRICKS_SET: BWGBlockSet;
    static readonly MOSSY_RED_ROCK_BRICKS_SET: BWGBlockSet;
    static readonly POLISHED_RED_ROCK_SET: BWGBlockSet;
    static readonly RED_ROCK_TILES_SET: BWGBlockSet;
    static readonly MOSSY_STONE_SET: BWGBlockSet;
    static readonly ROCKY_STONE_SET: BWGBlockSet;
    static readonly PALE_MUD: Supplier;
    static readonly PACKED_PALE_MUD: Supplier;
    static readonly PALE_MUD_BRICKS_SET: BWGBlockSet;
    static readonly WATER_SILK: Supplier;
    static readonly CATTAIL_THATCH: Supplier;
    static readonly CATTAIL_THATCH_SLAB: Supplier;
    static readonly CATTAIL_THATCH_STAIRS: Supplier;
    static readonly CATTAIL_THATCH_CARPET: Supplier;
    static readonly ATTACHED_PALE_PUMPKIN_STEM: Supplier;
    static readonly PALE_PUMPKIN_STEM: Supplier;
    static readonly PALE_PUMPKIN: Supplier;
    static readonly CARVED_PALE_PUMPKIN: Supplier;
    static readonly PALE_JACK_O_LANTERN: Supplier;
    static readonly PUMPKIN_BURROW: Supplier;
    static blocks(): void;
    static createPottedVariant<B extends Block>(key: string, blockSupplier: Supplier<B>): PottedBlock;
    static createPottedVariantWithoutItem<B extends Block>(key: string, blockSupplier: Supplier<B>): PottedBlock;
    static register<B extends Block>(id: string, block: Supplier<B>): Supplier<B>;
    static registerBasicBlockWithItem(key: string, properties: Properties): Supplier<Block>;
    static registerBlock<B extends Block>(id: string, block: Supplier<B>): Supplier<B>;
    static registerBlockItem<B extends Block>(key: string, blockSupplier: Supplier<B>): Supplier<B>;
    static registerBlockItemNoTab<B extends Block>(key: string, blockSupplier: Supplier<B>): Supplier<B>;
    static registerCubeAllBlockItem<B extends Block>(key: string, blockSupplier: Supplier<B>): Supplier<B>;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.block.custom' {
  import { DirtPathBlock, Block, FarmBlock, GrassBlock, BonemealableBlock, BaseEntityBlock, SporeBlossomBlock } from 'net.minecraft.world.level.block';
  import { Supplier } from 'java.util.function';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';
  import { Level } from 'net.minecraft.world.level';
  import { Entity } from 'net.minecraft.world.entity';
  import { Properties } from 'BlockBehaviour';
  import { BooleanProperty, DirectionProperty } from 'net.minecraft.world.level.block.state.properties';
  import { MapCodec } from 'com.mojang.serialization';
  import { BlockEntity, BlockEntityTicker, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';

  interface BWGDirtPathBlock extends DirtPathBlock {}
  class BWGDirtPathBlock extends DirtPathBlock {
    constructor(dirtBlock: Supplier<Block>);
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    tick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
  }


  interface BWGFarmLandBlock extends FarmBlock {}
  class BWGFarmLandBlock extends FarmBlock {
    constructor(dirt: Supplier<Block>);
    fallOn(level: Level, state: BlockState, pos: BlockPos, entity: Entity, fallDistance: number): void;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    randomTick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
    tick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
  }


  interface BWGSpreadableBlock extends BonemealableBlock, GrassBlock {}
  class BWGSpreadableBlock extends BonemealableBlock {
    constructor(properties: Properties, spreadable: Supplier<Block>);
    performBonemeal(level: ServerLevel, random: RandomSource, pos: BlockPos, state: BlockState): void;
    randomTick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
  }


  interface PumpkinBurrowBlock extends BaseEntityBlock {}
  class PumpkinBurrowBlock extends BaseEntityBlock {
    static readonly OCCUPIED: BooleanProperty;
    static readonly FACING: DirectionProperty;
    static readonly CODEC: MapCodec;
    constructor(properties: Properties);
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    getTicker<T extends BlockEntity>(level: Level, state: BlockState, blockEntityType: BlockEntityType<T>): BlockEntityTicker<T>;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    playerDestroy(level: Level, player: Player, pos: BlockPos, state: BlockState, blockEntity: BlockEntity, tool: ItemStack): void;
    playerWillDestroy(level: Level, pos: BlockPos, state: BlockState, player: Player): BlockState;
  }


  interface WitchHazelBlossomBlock extends SporeBlossomBlock {}
  class WitchHazelBlossomBlock extends SporeBlossomBlock {
    constructor();
    animateTick(state: BlockState, level: Level, pos: BlockPos, random: RandomSource): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.block.entities' {
  import { Supplier } from 'java.util.function';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';

  class BWGBlockEntityType {
    static readonly SIGNS: Supplier;
    static readonly HANGING_SIGNS: Supplier;
    static readonly PUMPKIN_BURROW: Supplier;
    static blockEntities(): void;
  }


  interface PumpkinBurrowBlockEntity extends BlockEntity {}
  class PumpkinBurrowBlockEntity extends BlockEntity {
    constructor(pos: BlockPos, blockState: BlockState);
    addOccupant(occupant: LivingEntity): void;
    emptyOccupant(level: Level): void;
    isEmpty(): boolean;
    static serverTick(level: Level, pos: BlockPos, state: BlockState, blockEntity: PumpkinBurrowBlockEntity): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.block.entities.sign' {
  import { HangingSignBlockEntity, BlockEntityType, SignBlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  interface BWGHangingSignBlockEntity extends HangingSignBlockEntity {}
  class BWGHangingSignBlockEntity extends HangingSignBlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
    get type(): BlockEntityType<any>;
    isValidBlockState(blockState: BlockState): boolean;
  }


  interface BWGSignBlockEntity extends SignBlockEntity {}
  class BWGSignBlockEntity extends SignBlockEntity {
    constructor(pos: BlockPos, blockState: BlockState);
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.block.plants.bush' {
  import { SweetBerryBushBlock, BushBlock, Block, BonemealableBlock } from 'net.minecraft.world.level.block';
  import { Properties } from 'BlockBehaviour';
  import { Supplier } from 'java.util.function';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { LevelReader, Level, BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Entity } from 'net.minecraft.world.entity';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { TagKey } from 'net.minecraft.tags';
  import { RandomSource } from 'net.minecraft.util';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { IntegerProperty, BooleanProperty } from 'net.minecraft.world.level.block.state.properties';
  import { TreeGrower } from 'net.minecraft.world.level.block.grower';

  interface BWGBerryBush extends SweetBerryBushBlock {}
  class BWGBerryBush extends SweetBerryBushBlock {
    constructor(properties: Properties, item: Supplier<Supplier<Item>>, hurtEntityInside: boolean);

    constructor(item: Supplier<Supplier<Item>>, hurtEntityInside: boolean);
    entityInside(state: BlockState, level: Level, pos: BlockPos, entity: Entity): void;
    getCloneItemStack(level: LevelReader, pos: BlockPos, state: BlockState): ItemStack;
  }


  interface BWGPlacementBushBlock extends BushBlock {}
  class BWGPlacementBushBlock extends BushBlock {
    constructor(properties: Properties, shape: VoxelShape, validGround: TagKey<Block>);

    constructor(properties: Properties, validGround: TagKey<Block>);

    constructor(properties: Properties);
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
  }


  interface DesertPlantBlock extends BWGPlacementBushBlock {}
  class DesertPlantBlock extends BWGPlacementBushBlock {
    constructor(properties: Properties, shape: VoxelShape, validGround: TagKey<Block>);
    entityInside(state: BlockState, level: Level, pos: BlockPos, entity: Entity): void;
  }


  interface FlowerableBushBlock extends BonemealableBlock, BushBlock {}
  class FlowerableBushBlock extends BonemealableBlock {
    constructor(properties: Properties, floweringBlock: Supplier<FloweringBushBlock>);

    constructor(properties: Properties);
    isBonemealSuccess(level: Level, random: RandomSource, pos: BlockPos, state: BlockState): boolean;
    isValidBonemealTarget(level: LevelReader, pos: BlockPos, state: BlockState): boolean;
    performBonemeal(level: ServerLevel, random: RandomSource, pos: BlockPos, state: BlockState): void;
  }


  interface FloweringBushBlock extends BonemealableBlock, BushBlock {}
  class FloweringBushBlock extends BonemealableBlock {
    static readonly STAGE: IntegerProperty;
    constructor(properties: Properties);
    isBonemealSuccess(level: Level, random: RandomSource, pos: BlockPos, state: BlockState): boolean;
    isValidBonemealTarget(level: LevelReader, pos: BlockPos, state: BlockState): boolean;
    performBonemeal(level: ServerLevel, random: RandomSource, pos: BlockPos, state: BlockState): void;
  }


  interface HydrangeaBushBlock extends BonemealableBlock, BWGPlacementBushBlock {}
  class HydrangeaBushBlock extends BonemealableBlock {
    constructor();

    constructor(properties: Properties);
    isBonemealSuccess(level: Level, random: RandomSource, pos: BlockPos, state: BlockState): boolean;
    isValidBonemealTarget(level: LevelReader, pos: BlockPos, state: BlockState): boolean;
    performBonemeal(level: ServerLevel, random: RandomSource, pos: BlockPos, state: BlockState): void;
  }


  interface HydrangeaHedgeBlock extends BonemealableBlock, BWGPlacementBushBlock {}
  class HydrangeaHedgeBlock extends BonemealableBlock {
    constructor();
    isBonemealSuccess(level: Level, random: RandomSource, pos: BlockPos, state: BlockState): boolean;
    isValidBonemealTarget(level: LevelReader, pos: BlockPos, state: BlockState): boolean;
    performBonemeal(level: ServerLevel, random: RandomSource, pos: BlockPos, state: BlockState): void;
  }


  interface OddionCrop extends BWGBerryBush {}
  class OddionCrop extends BWGBerryBush {
    static readonly TIMER: IntegerProperty;
    static readonly HATCHING: BooleanProperty;
    constructor();
    animateTick(state: BlockState, level: Level, pos: BlockPos, random: RandomSource): void;
    isRandomlyTicking(state: BlockState): boolean;
    isValidBonemealTarget(level: LevelReader, pos: BlockPos, state: BlockState): boolean;
    performBonemeal(level: ServerLevel, random: RandomSource, pos: BlockPos, state: BlockState): void;
    randomTick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
  }


  interface ShrubBlock extends BonemealableBlock, BushBlock {}
  class ShrubBlock extends BonemealableBlock {
    constructor(treeGrower: Supplier<TreeGrower>);
    entityInside(state: BlockState, level: Level, pos: BlockPos, entity: Entity): void;
    isBonemealSuccess(level: Level, random: RandomSource, pos: BlockPos, state: BlockState): boolean;
    isValidBonemealTarget(level: LevelReader, pos: BlockPos, state: BlockState): boolean;
    performBonemeal(level: ServerLevel, random: RandomSource, pos: BlockPos, state: BlockState): void;
  }


  interface WhitePuffballBlock extends BWGBerryBush {}
  class WhitePuffballBlock extends BWGBerryBush {
    constructor();
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    randomTick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.block.plants.cactus' {
  import { BonemealableBlock, Block } from 'net.minecraft.world.level.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { LevelReader, LevelAccessor, Level, BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { Properties } from 'BlockBehaviour';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { EnumProperty } from 'net.minecraft.world.level.block.state.properties';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface BarrelCactusBlock extends BonemealableBlock, BWGCactusBlock {}
  class BarrelCactusBlock extends BonemealableBlock {
    constructor();
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    isBonemealSuccess(level: Level, random: RandomSource, pos: BlockPos, state: BlockState): boolean;
    isValidBonemealTarget(level: LevelReader, pos: BlockPos, state: BlockState): boolean;
    performBonemeal(level: ServerLevel, random: RandomSource, pos: BlockPos, state: BlockState): void;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, pos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface BWGCactusBlock extends Block {}
  class BWGCactusBlock extends Block {
    constructor(properties: Properties);
    getCollisionShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
  }


  interface CarvedBarrelCactusBlock extends BWGCactusBlock {}
  class CarvedBarrelCactusBlock extends BWGCactusBlock {
    static readonly LIQUID: EnumProperty;
    constructor();
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    getCollisionShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getInteractionShape(state: BlockState, level: BlockGetter, pos: BlockPos): VoxelShape;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    randomTick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
  }


  interface LiquidType extends Enum<LiquidType> {}
  class LiquidType extends Enum<LiquidType> {
    static readonly WATER: LiquidType;
    static readonly HONEY: LiquidType;
    static readonly EMPTY: LiquidType;
    get serializedName(): string;
    static valueOf(name: string): LiquidType;
    static values(): LiquidType[];
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.block.plants.flower' {
  import { BonemealableBlock, Block, FlowerBlock, TallFlowerBlock } from 'net.minecraft.world.level.block';
  import { Properties } from 'BlockBehaviour';
  import { TagKey } from 'net.minecraft.tags';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { Supplier } from 'java.util.function';
  import { LevelReader, Level, BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { RandomSource } from 'net.minecraft.util';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { TreeGrower } from 'net.minecraft.world.level.block.grower';
  import { PottedBlock } from 'net.potionstudios.biomeswevegone.world.level.block.plants';
  import { ResourceKey } from 'net.minecraft.resources';
  import { ConfiguredFeature } from 'net.minecraft.world.level.levelgen.feature';

  interface BWGBonemealableFlowerBlock extends BonemealableBlock, BWGFlowerBlock {}
  class BWGBonemealableFlowerBlock extends BonemealableBlock {
    constructor(properties: Properties, validGround: TagKey<Block>, shape: VoxelShape, growableBlock: Supplier<Block>);

    constructor(properties: Properties, growableBlock: Supplier<Block>);
    isBonemealSuccess(level: Level, random: RandomSource, pos: BlockPos, state: BlockState): boolean;
    isValidBonemealTarget(level: LevelReader, pos: BlockPos, state: BlockState): boolean;
    performBonemeal(level: ServerLevel, random: RandomSource, pos: BlockPos, state: BlockState): void;
  }


  interface BWGFlowerBlock extends FlowerBlock {}
  class BWGFlowerBlock extends FlowerBlock {
    constructor(properties: Properties, validGround: TagKey<Block>, shape: VoxelShape);

    constructor(properties: Properties);
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
  }


  interface BWGTallFlowerBlock extends TallFlowerBlock {}
  class BWGTallFlowerBlock extends TallFlowerBlock {
    constructor(properties: Properties, validGround: TagKey<Block>);

    constructor(properties: Properties);
  }


  interface BWGTallFlowerBlockTreeGrower extends BWGTallFlowerBlock {}
  class BWGTallFlowerBlockTreeGrower extends BWGTallFlowerBlock {
    constructor(properties: Properties, validGround: TagKey<Block>, treeGrower: Supplier<TreeGrower>);

    constructor(properties: Properties, treeGrower: Supplier<TreeGrower>);
    isBonemealSuccess(level: Level, random: RandomSource, pos: BlockPos, state: BlockState): boolean;
    performBonemeal(level: ServerLevel, random: RandomSource, pos: BlockPos, state: BlockState): void;
  }


  interface FlowerBlockFeature extends PottedBlock {}
  class FlowerBlockFeature extends PottedBlock {
    constructor(id: string, block: Supplier<Block>);
    get feature(): ResourceKey<ConfiguredFeature<any, any>>;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.block.plants' {
  import { Supplier } from 'java.util.function';
  import { Block } from 'net.minecraft.world.level.block';
  import { Item } from 'net.minecraft.world.item';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  class PottedBlock {
    constructor(block: Supplier<Block>, pottedBlock: Supplier<Block>);

    constructor(id: string, block: Supplier<Block>);
    get block(): Block;
    get blockState(): BlockState;
    get blockSupplier(): Supplier<Block>;
    get item(): Item;
    get pottedBlock(): Block;
    get pottedBlockSupplier(): Supplier<Block>;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.block.plants.tree.branch' {
  import { BaseCoralPlantTypeBlock, BonemealableBlock, Mirror, Rotation } from 'net.minecraft.world.level.block';
  import { DirectionProperty } from 'net.minecraft.world.level.block.state.properties';
  import { Properties } from 'BlockBehaviour';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockGetter, LevelAccessor, LevelReader, Level } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { RandomSource } from 'net.minecraft.util';
  import { ServerLevel } from 'net.minecraft.server.level';

  interface TreeBranchBlock extends BonemealableBlock, BaseCoralPlantTypeBlock {}
  class TreeBranchBlock extends BonemealableBlock {
    static readonly FACING: DirectionProperty;
    constructor();

    constructor(properties: Properties);
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    isBonemealSuccess(level: Level, random: RandomSource, pos: BlockPos, state: BlockState): boolean;
    isValidBonemealTarget(level: LevelReader, pos: BlockPos, state: BlockState): boolean;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    performBonemeal(level: ServerLevel, random: RandomSource, pos: BlockPos, state: BlockState): void;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, pos: BlockPos, neighborPos: BlockPos): BlockState;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.block.plants.tree.fruit' {
  import { Block, BonemealableBlock, LeavesBlock } from 'net.minecraft.world.level.block';
  import { MapCodec } from 'com.mojang.serialization';
  import { IntegerProperty } from 'net.minecraft.world.level.block.state.properties';
  import { Properties } from 'BlockBehaviour';
  import { Supplier } from 'java.util.function';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockGetter, LevelReader, LevelAccessor, Level } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { RandomSource } from 'net.minecraft.util';

  interface BWGFruitBlock extends BonemealableBlock, Block {}
  class BWGFruitBlock extends BonemealableBlock {
    static readonly CODEC: MapCodec;
    static readonly AGE: IntegerProperty;
    static readonly MAX_AGE: number;
    constructor(properties: Properties, fruit: Supplier<Supplier<Item>>, leaves: string);

    constructor(properties: Properties, fruit: Supplier<Supplier<Item>>, leaves: Supplier<LeavesBlock>);

    constructor(fruit: Supplier<Supplier<Item>>, leaves: string);
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    get fruit(): Item;
    get leaves(): LeavesBlock;
    getCloneItemStack(level: LevelReader, pos: BlockPos, state: BlockState): ItemStack;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    isBonemealSuccess(level: Level, random: RandomSource, pos: BlockPos, state: BlockState): boolean;
    isRandomlyTicking(state: BlockState): boolean;
    isValidBonemealTarget(level: LevelReader, pos: BlockPos, state: BlockState): boolean;
    performBonemeal(level: ServerLevel, random: RandomSource, pos: BlockPos, state: BlockState): void;
    randomTick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, pos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface SoulFruitBlock extends BWGFruitBlock {}
  class SoulFruitBlock extends BWGFruitBlock {
    constructor();
    animateTick(state: BlockState, level: Level, pos: BlockPos, random: RandomSource): void;
    destroy(level: LevelAccessor, pos: BlockPos, state: BlockState): void;
    isRandomlyTicking(state: BlockState): boolean;
    randomTick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.block.plants.tree.grower' {
  import { SimpleWeightedRandomList } from 'net.minecraft.util.random';
  import { ResourceKey } from 'net.minecraft.resources';
  import { ConfiguredFeature } from 'net.minecraft.world.level.levelgen.feature';
  import { TreeGrower } from 'net.minecraft.world.level.block.grower';
  import { Supplier } from 'java.util.function';

  interface BWGMegaTreeGrower extends BWGTreeGrower {}
  class BWGMegaTreeGrower extends BWGTreeGrower {
    constructor(name: string, keys: SimpleWeightedRandomList<ResourceKey<ConfiguredFeature<any, any>>>, megaKeys: SimpleWeightedRandomList<ResourceKey<ConfiguredFeature<any, any>>>);

    constructor(name: string, megaKeys: SimpleWeightedRandomList<ResourceKey<ConfiguredFeature<any, any>>>);
  }


  interface BWGTreeGrower extends TreeGrower {}
  class BWGTreeGrower extends TreeGrower {
    constructor(name: string, keys: SimpleWeightedRandomList<ResourceKey<ConfiguredFeature<any, any>>>);
  }


  class BWGTreeGrowers {
    static readonly ASPEN: Supplier;
    static readonly BAOBAB: Supplier;
    static readonly BLUE_ENCHANTED: Supplier;
    static readonly CIKA: Supplier;
    static readonly CYPRESS: Supplier;
    static readonly EBONY: Supplier;
    static readonly FIR: Supplier;
    static readonly GREEN_ENCHANTED: Supplier;
    static readonly HOLLY: Supplier;
    static readonly IRONWOOD: Supplier;
    static readonly JACARANDA: Supplier;
    static readonly MAHOGANY: Supplier;
    static readonly MAPLE: Supplier;
    static readonly PALM: Supplier;
    static readonly PINE: Supplier;
    static readonly RAINBOW_EUCALYPTUS: Supplier;
    static readonly REDWOOD: Supplier;
    static readonly WHITE_SAKURA: Supplier;
    static readonly YELLOW_SAKURA: Supplier;
    static readonly SKYRIS: Supplier;
    static readonly SPIRIT: Supplier;
    static readonly WHITE_MANGROVE: Supplier;
    static readonly WILLOW: Supplier;
    static readonly WITCH_HAZEL: Supplier;
    static readonly ZELKOVA: Supplier;
    static readonly PALO_VERDE: Supplier;
    static readonly ARAUCARIA: Supplier;
    static readonly BLUE_SPRUCE: Supplier;
    static readonly BROWN_BIRCH: Supplier;
    static readonly BROWN_OAK: Supplier;
    static readonly BROWN_ZELKOVA: Supplier;
    static readonly INDIGO_JACARANDA: Supplier;
    static readonly ORANGE_BIRCH: Supplier;
    static readonly ORANGE_OAK: Supplier;
    static readonly ORANGE_SPRUCE: Supplier;
    static readonly ORCHARD: Supplier;
    static readonly RED_BIRCH: Supplier;
    static readonly RED_MAPLE: Supplier;
    static readonly RED_OAK: Supplier;
    static readonly RED_SPRUCE: Supplier;
    static readonly SILVER_MAPLE: Supplier;
    static readonly YELLOW_BIRCH: Supplier;
    static readonly YELLOW_SPRUCE: Supplier;
    static readonly YUCCA: Supplier;
    static readonly FIRECRACKER: Supplier;
    static readonly GIANT_ALLIUM: Supplier;
    static readonly GIANT_PINK_ALLIUM: Supplier;
    static readonly GIANT_WHITE_ALLIUM: Supplier;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.block.plants.tree.leaves' {
  import { BonemealableBlock, LeavesBlock } from 'net.minecraft.world.level.block';
  import { Properties } from 'BlockBehaviour';
  import { Supplier } from 'java.util.function';
  import { SimpleParticleType } from 'net.minecraft.core.particles';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';
  import { LevelReader, Level } from 'net.minecraft.world.level';
  import { BWGFruitBlock } from 'net.potionstudios.biomeswevegone.world.level.block.plants.tree.fruit';

  interface BWGChangingLeavesBlock extends BonemealableBlock, BWGLeavesBlock {}
  class BWGChangingLeavesBlock extends BonemealableBlock {
    constructor(properties: Properties, next: Supplier<LeavesBlock>, chance: number, particleTypes: Supplier<SimpleParticleType>);

    constructor(properties: Properties, next: Supplier<LeavesBlock>, chance: number);
    isBonemealSuccess(level: Level, randomSource: RandomSource, blockPos: BlockPos, blockState: BlockState): boolean;
    isRandomlyTicking(blockState: BlockState): boolean;
    isValidBonemealTarget(level: LevelReader, pos: BlockPos, state: BlockState): boolean;
    performBonemeal(level: ServerLevel, randomSource: RandomSource, blockPos: BlockPos, blockState: BlockState): void;
    randomTick(state: BlockState, serverLevel: ServerLevel, pos: BlockPos, randomSource: RandomSource): void;
  }


  interface BWGFireCrackerLeaves extends LeavesBlock {}
  class BWGFireCrackerLeaves extends LeavesBlock {
    constructor(properties: Properties);
  }


  interface BWGFruitLeavesBlock extends BonemealableBlock, LeavesBlock {}
  class BWGFruitLeavesBlock extends BonemealableBlock {
    constructor(properties: Properties, fruitBlock: Supplier<BWGFruitBlock>, tickSpawnChance: number);
    isBonemealSuccess(level: Level, random: RandomSource, pos: BlockPos, state: BlockState): boolean;
    isValidBonemealTarget(level: LevelReader, pos: BlockPos, state: BlockState): boolean;
    performBonemeal(level: ServerLevel, random: RandomSource, pos: BlockPos, state: BlockState): void;
    randomTick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
  }


  interface BWGLeavesBlock extends LeavesBlock {}
  class BWGLeavesBlock extends LeavesBlock {
    constructor(properties: Properties, particleType: Supplier<SimpleParticleType>);

    constructor(properties: Properties);
    animateTick(blockState: BlockState, level: Level, blockPos: BlockPos, randomSource: RandomSource): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.block.plants.tree.sapling' {
  import { SaplingBlock, Block } from 'net.minecraft.world.level.block';
  import { TagKey } from 'net.minecraft.tags';
  import { TreeGrower } from 'net.minecraft.world.level.block.grower';

  interface BWGSaplingBlock extends SaplingBlock {}
  class BWGSaplingBlock extends SaplingBlock {
    constructor(groundTag: TagKey<Block>, treeGrower: TreeGrower);
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.block.plants.vegetation' {
  import { BWGPlacementBushBlock } from 'net.potionstudios.biomeswevegone.world.level.block.plants.bush';
  import { BonemealableBlock, DoublePlantBlock, TallGrassBlock, Block, MushroomBlock, BushBlock, SugarCaneBlock, SimpleWaterloggedBlock, VineBlock } from 'net.minecraft.world.level.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';
  import { LevelReader, Level, BlockGetter } from 'net.minecraft.world.level';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { Properties } from 'BlockBehaviour';
  import { Supplier } from 'java.util.function';
  import { TagKey } from 'net.minecraft.tags';
  import { ResourceKey } from 'net.minecraft.resources';
  import { ConfiguredFeature } from 'net.minecraft.world.level.levelgen.feature';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { BooleanProperty } from 'net.minecraft.world.level.block.state.properties';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { Entity } from 'net.minecraft.world.entity';

  interface AloeVeraBlock extends BonemealableBlock, BWGPlacementBushBlock {}
  class AloeVeraBlock extends BonemealableBlock {
    constructor();
    isBonemealSuccess(level: Level, random: RandomSource, pos: BlockPos, state: BlockState): boolean;
    isRandomlyTicking(state: BlockState): boolean;
    isValidBonemealTarget(level: LevelReader, pos: BlockPos, state: BlockState): boolean;
    performBonemeal(level: ServerLevel, random: RandomSource, pos: BlockPos, state: BlockState): void;
    randomTick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
  }


  interface BloomingAloeVeraBlock extends DoublePlantBlock {}
  class BloomingAloeVeraBlock extends DoublePlantBlock {
    constructor();
    getCloneItemStack(level: LevelReader, pos: BlockPos, state: BlockState): ItemStack;
  }


  interface BoneMealGrassBlock extends TallGrassBlock {}
  class BoneMealGrassBlock extends TallGrassBlock {
    constructor(properties: Properties, doublePlant: Supplier<DoublePlantBlock>, mayPlaceOn: TagKey<Block>);
    performBonemeal(level: ServerLevel, random: RandomSource, pos: BlockPos, state: BlockState): void;
  }


  interface BWGDoublePlantBlock extends DoublePlantBlock {}
  class BWGDoublePlantBlock extends DoublePlantBlock {
    constructor(properties: Properties, mayPlaceOn: TagKey<Block>);
  }


  interface BWGMushroomBlock extends MushroomBlock {}
  class BWGMushroomBlock extends MushroomBlock {
    constructor(properties: Properties, groundTag: TagKey<Block>, feature: ResourceKey<ConfiguredFeature<any, any>>, shape: VoxelShape);

    constructor(properties: Properties, groundTag: TagKey<Block>, shape: VoxelShape);
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
  }


  interface FlatVegetationBlock extends BushBlock {}
  class FlatVegetationBlock extends BushBlock {
    constructor(properties: Properties);

    constructor();
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
  }


  interface GlowCaneBlock extends SimpleWaterloggedBlock, SugarCaneBlock {}
  class GlowCaneBlock extends SimpleWaterloggedBlock {
    static readonly WATERLOGGED: BooleanProperty;
    constructor(shoot: Supplier<Supplier<Item>>);
    getCloneItemStack(level: LevelReader, pos: BlockPos, state: BlockState): ItemStack;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
  }


  interface PoisonIvyBlock extends VineBlock {}
  class PoisonIvyBlock extends VineBlock {
    constructor();
    entityInside(state: BlockState, level: Level, pos: BlockPos, entity: Entity): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.block.plants.vegetation.cattail' {
  import { DoublePlantBlock, SimpleWaterloggedBlock, Block, BonemealableBlock } from 'net.minecraft.world.level.block';
  import { BooleanProperty, EnumProperty } from 'net.minecraft.world.level.block.state.properties';
  import { Properties } from 'BlockBehaviour';
  import { Supplier } from 'java.util.function';
  import { Item, ItemStack, BlockItem } from 'net.minecraft.world.item';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { LevelReader, Level, LevelAccessor, BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { RandomSource } from 'net.minecraft.util';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface CattailPlantBlock extends SimpleWaterloggedBlock, DoublePlantBlock {}
  class CattailPlantBlock extends SimpleWaterloggedBlock {
    static readonly WATERLOGGED: BooleanProperty;
    constructor(properties: Properties, sprout: Supplier<Supplier<Item>>);

    constructor(sprout: Supplier<Supplier<Item>>);
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    get sprout(): BlockItem;
    getCloneItemStack(level: LevelReader, pos: BlockPos, state: BlockState): ItemStack;
    getFluidState(state: BlockState): FluidState;
    neighborChanged(state: BlockState, level: Level, pos: BlockPos, neighborBlock: Block, neighborPos: BlockPos, movedByPiston: boolean): void;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, pos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface CattailSproutBlock extends SimpleWaterloggedBlock, BonemealableBlock, Block {}
  class CattailSproutBlock extends SimpleWaterloggedBlock {
    static readonly WATERLOGGED: BooleanProperty;
    constructor(cattailBlock: Supplier<CattailPlantBlock>);
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    getFluidState(state: BlockState): FluidState;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    isBonemealSuccess(level: Level, random: RandomSource, pos: BlockPos, state: BlockState): boolean;
    isValidBonemealTarget(level: LevelReader, pos: BlockPos, state: BlockState): boolean;
    performBonemeal(level: ServerLevel, random: RandomSource, pos: BlockPos, state: BlockState): void;
    randomTick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
    updateShape(state: BlockState, direction: Direction, neighborState: BlockState, level: LevelAccessor, pos: BlockPos, neighborPos: BlockPos): BlockState;
  }


  interface ColorProperty extends Enum<ColorProperty> {}
  class ColorProperty extends Enum<ColorProperty> {
    static readonly NO_COLOR: ColorProperty;
    static readonly BLUE: ColorProperty;
    static readonly GREEN: ColorProperty;
    static readonly RED: ColorProperty;
    static readonly YELLOW: ColorProperty;
    get serializedName(): string;
    static valueOf(name: string): ColorProperty;
    static values(): ColorProperty[];
  }


  interface FluorescentCattailPlantBlock extends CattailPlantBlock {}
  class FluorescentCattailPlantBlock extends CattailPlantBlock {
    static readonly COLOR: EnumProperty;
    constructor(sprout: Supplier<Supplier<Item>>);
    animateTick(state: BlockState, level: Level, pos: BlockPos, random: RandomSource): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.block.plants.vegetation.pumpkin' {
  import { Equipable } from 'net.minecraft.world.item';
  import { EquipmentSlot } from 'net.minecraft.world.entity';
  import { CarvedPumpkinBlock, PumpkinBlock } from 'net.minecraft.world.level.block';
  import { Properties } from 'BlockBehaviour';

  interface EquipableCarvedPalePumpkinBlock extends Equipable, PaleCarvedPumpkinBlock {}
  class EquipableCarvedPalePumpkinBlock extends Equipable {
    constructor();
    get equipmentSlot(): EquipmentSlot;
  }


  interface PaleCarvedPumpkinBlock extends CarvedPumpkinBlock {}
  class PaleCarvedPumpkinBlock extends CarvedPumpkinBlock {
    constructor(properties: Properties);

    constructor();
  }


  interface PalePumpkinBlock extends PumpkinBlock {}
  class PalePumpkinBlock extends PumpkinBlock {
    constructor();
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.block.sand' {
  import { ColoredFallingBlock, Block, StairBlock, SlabBlock, WallBlock } from 'net.minecraft.world.level.block';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockGetter, Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { Entity } from 'net.minecraft.world.entity';
  import { TagKey } from 'net.minecraft.tags';
  import { Item } from 'net.minecraft.world.item';
  import { BlockFamily } from 'net.minecraft.data';
  import { ArrayList } from 'java.util';

  interface BWGQuickSand extends ColoredFallingBlock {}
  class BWGQuickSand extends ColoredFallingBlock {
    constructor(dustColor: number);
    entityInside(state: BlockState, level: Level, pos: BlockPos, entity: Entity): void;
    fallOn(level: Level, state: BlockState, pos: BlockPos, entity: Entity, fallDistance: number): void;
    getOcclusionShape(state: BlockState, level: BlockGetter, pos: BlockPos): VoxelShape;
    getVisualShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
  }


  class BWGSandSet {
    constructor(name: string, dustColor: number);
    get chiseledSandstone(): Block;
    get cutSandStoneFamily(): BlockFamily;
    get cutSandstone(): Block;
    get cutSandstoneSlab(): SlabBlock;
    get name(): string;
    get sand(): ColoredFallingBlock;
    get sandBlockTag(): TagKey<Block>;
    get sandItemTag(): TagKey<Item>;
    static get sandSets(): ArrayList<BWGSandSet>;
    get sandStoneFamily(): BlockFamily;
    get sandstone(): Block;
    get sandstoneBlocksItemTag(): TagKey<Item>;
    get sandstoneBlocksTag(): TagKey<Block>;
    get sandstoneSlab(): SlabBlock;
    get sandstoneSlabsItemTag(): TagKey<Item>;
    get sandstoneSlabsTag(): TagKey<Block>;
    get sandstoneStairs(): StairBlock;
    get sandstoneStairsItemTag(): TagKey<Item>;
    get sandstoneStairsTag(): TagKey<Block>;
    get sandstoneWall(): WallBlock;
    get smoothSandStoneFamily(): BlockFamily;
    get smoothSandstone(): Block;
    get smoothSandstoneSlab(): SlabBlock;
    get smoothSandstoneStairs(): StairBlock;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.block.set' {
  import { Properties } from 'BlockBehaviour';
  import { Supplier } from 'java.util.function';
  import { Block, StairBlock, SlabBlock, WallBlock } from 'net.minecraft.world.level.block';
  import { MapColor } from 'net.minecraft.world.level.material';
  import { BlockFamily } from 'net.minecraft.data';
  import { ArrayList } from 'java.util';

  class BWGBlockSet {
    constructor(name: string, properties: Properties);

    constructor(name: string, alt: string, properties: Properties);

    constructor(base: Supplier<Block>, stairs: Supplier<StairBlock>, slab: Supplier<SlabBlock>, wall: Supplier<WallBlock>);

    constructor(name: string, color: MapColor);

    constructor(name: string, alt: string, color: MapColor);
    get base(): Block;
    get blockFamily(): BlockFamily;
    static get blockSets(): ArrayList<BWGBlockSet>;
    get slab(): SlabBlock;
    get stairs(): StairBlock;
    get wall(): WallBlock;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.block.wood' {
  import { CraftingTableBlock, RotatedPillarBlock, Block, StairBlock, SlabBlock, FenceBlock, FenceGateBlock, DoorBlock, TrapDoorBlock, PressurePlateBlock, ButtonBlock, LeavesBlock, StandingSignBlock, WallSignBlock, CeilingHangingSignBlock, WallHangingSignBlock, BuddingAmethystBlock } from 'net.minecraft.world.level.block';
  import { MapColor } from 'net.minecraft.world.level.material';
  import { MenuProvider } from 'net.minecraft.world';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { ArrayList } from 'java.util';
  import { Supplier } from 'java.util.function';
  import { PottedBlock } from 'net.potionstudios.biomeswevegone.world.level.block.plants';
  import { WoodType, BooleanProperty } from 'net.minecraft.world.level.block.state.properties';
  import { SignItem, HangingSignItem, Item } from 'net.minecraft.world.item';
  import { TagKey } from 'net.minecraft.tags';
  import { BlockFamily } from 'net.minecraft.data';
  import { LogStem } from 'net.potionstudios.biomeswevegone.world.level.block.wood.BWGWoodSet';
  import { Properties } from 'BlockBehaviour';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { CraftingMenu, ContainerLevelAccess } from 'net.minecraft.world.inventory';
  import { Inventory, Player } from 'net.minecraft.world.entity.player';

  interface BWGCraftingTable extends CraftingTableBlock {}
  class BWGCraftingTable extends CraftingTableBlock {
    constructor(color: MapColor);
    getMenuProvider(state: BlockState, level: Level, pos: BlockPos): MenuProvider;
  }


  class BWGWood {
    static readonly WOOD: ArrayList;
    static readonly WOOD_BLOCK_ITEMS: ArrayList;
    static readonly NONSET_WOOD: ArrayList;
    static readonly ASPEN: BWGWoodSet;
    static readonly BAOBAB: BWGWoodSet;
    static readonly BLUE_ENCHANTED: BWGWoodSet;
    static readonly IMBUED_BLUE_ENCHANTED_WOOD: Supplier;
    static readonly CIKA: BWGWoodSet;
    static readonly CYPRESS: BWGWoodSet;
    static readonly EBONY: BWGWoodSet;
    static readonly FIR: BWGWoodSet;
    static readonly FLORUS: BWGWoodSet;
    static readonly GREEN_ENCHANTED: BWGWoodSet;
    static readonly IMBUED_GREEN_ENCHANTED_WOOD: Supplier;
    static readonly HOLLY: BWGWoodSet;
    static readonly IRONWOOD: BWGWoodSet;
    static readonly JACARANDA: BWGWoodSet;
    static readonly MAHOGANY: BWGWoodSet;
    static readonly MAPLE: BWGWoodSet;
    static readonly PALM: BWGWoodSet;
    static readonly PINE: BWGWoodSet;
    static readonly RAINBOW_EUCALYPTUS: BWGWoodSet;
    static readonly REDWOOD: BWGWoodSet;
    static readonly SAKURA: BWGWoodSet;
    static readonly WHITE_SAKURA_SAPLING: PottedBlock;
    static readonly YELLOW_SAKURA_SAPLING: PottedBlock;
    static readonly SKYRIS: BWGWoodSet;
    static readonly SPIRIT: BWGWoodSet;
    static readonly SPIRIT_ROOTS: Supplier;
    static readonly WHITE_MANGROVE: BWGWoodSet;
    static readonly WILLOW: BWGWoodSet;
    static readonly WITCH_HAZEL: BWGWoodSet;
    static readonly ZELKOVA: BWGWoodSet;
    static readonly PALO_VERDE_LOG: Supplier;
    static readonly PALO_VERDE_WOOD: Supplier;
    static readonly STRIPPED_PALO_VERDE_LOG: Supplier;
    static readonly STRIPPED_PALO_VERDE_WOOD: Supplier;
    static readonly PALO_VERDE_LEAVES: Supplier;
    static readonly PALO_VERDE_SAPLING: PottedBlock;
    static readonly ARAUCARIA_SAPLING: PottedBlock;
    static readonly BLUE_SPRUCE_SAPLING: PottedBlock;
    static readonly BROWN_BIRCH_SAPLING: PottedBlock;
    static readonly BROWN_OAK_SAPLING: PottedBlock;
    static readonly BROWN_ZELKOVA_SAPLING: PottedBlock;
    static readonly INDIGO_JACARANDA_SAPLING: PottedBlock;
    static readonly ORANGE_BIRCH_SAPLING: PottedBlock;
    static readonly ORANGE_OAK_SAPLING: PottedBlock;
    static readonly ORANGE_SPRUCE_SAPLING: PottedBlock;
    static readonly ORCHARD_SAPLING: PottedBlock;
    static readonly RED_BIRCH_SAPLING: PottedBlock;
    static readonly RED_MAPLE_SAPLING: PottedBlock;
    static readonly RED_OAK_SAPLING: PottedBlock;
    static readonly RED_SPRUCE_SAPLING: PottedBlock;
    static readonly SILVER_MAPLE_SAPLING: PottedBlock;
    static readonly YELLOW_BIRCH_SAPLING: PottedBlock;
    static readonly YELLOW_SPRUCE_SAPLING: PottedBlock;
    static readonly YUCCA_SAPLING: PottedBlock;
    static readonly ARAUCARIA_LEAVES: Supplier;
    static readonly RIPE_BAOBAB_LEAVES: Supplier;
    static readonly FLOWERING_BAOBAB_LEAVES: Supplier;
    static readonly BLUE_SPRUCE_LEAVES: Supplier;
    static readonly BLOOMING_WITCH_HAZEL_LEAVES: Supplier;
    static readonly BROWN_BIRCH_LEAVES: Supplier;
    static readonly BROWN_OAK_LEAVES: Supplier;
    static readonly BROWN_ZELKOVA_LEAVES: Supplier;
    static readonly RIPE_ORCHARD_LEAVES: Supplier;
    static readonly FLOWERING_ORCHARD_LEAVES: Supplier;
    static readonly FLOWERING_PALO_VERDE_LEAVES: Supplier;
    static readonly HOLLY_BERRY_LEAVES: Supplier;
    static readonly INDIGO_JACARANDA_LEAVES: Supplier;
    static readonly FLOWERING_JACARANDA_LEAVES: Supplier;
    static readonly FLOWERING_INDIGO_JACARANDA_LEAVES: Supplier;
    static readonly YUCCA_LEAVES: Supplier;
    static readonly RIPE_YUCCA_LEAVES: Supplier;
    static readonly FLOWERING_YUCCA_LEAVES: Supplier;
    static readonly ORANGE_BIRCH_LEAVES: Supplier;
    static readonly ORANGE_OAK_LEAVES: Supplier;
    static readonly ORANGE_SPRUCE_LEAVES: Supplier;
    static readonly ORCHARD_LEAVES: Supplier;
    static readonly RED_BIRCH_LEAVES: Supplier;
    static readonly RED_MAPLE_LEAVES: Supplier;
    static readonly RED_OAK_LEAVES: Supplier;
    static readonly RED_SPRUCE_LEAVES: Supplier;
    static readonly SILVER_MAPLE_LEAVES: Supplier;
    static readonly SPIRIT_LEAVES: Supplier;
    static readonly FLOWERING_SPIRIT_LEAVES: Supplier;
    static readonly SKYRIS_LEAVES_GREEN_APPLE: Supplier;
    static readonly FLOWERING_SKYRIS_LEAVES: Supplier;
    static readonly FLOWERING_IRONWOOD_LEAVES: Supplier;
    static readonly WHITE_SAKURA_LEAVES: Supplier;
    static readonly YELLOW_SAKURA_LEAVES: Supplier;
    static readonly YELLOW_BIRCH_LEAVES: Supplier;
    static readonly YELLOW_SPRUCE_LEAVES: Supplier;
    static readonly FIRECRACKER_LEAVES: Supplier;
    static wood(): void;
  }


  class BWGWoodSet {
    boatItem(): Supplier<Item>;
    bookshelf(): Block;
    button(): ButtonBlock;
    chestBoatItem(): Supplier<Item>;
    craftingTable(): CraftingTableBlock;
    door(): DoorBlock;
    family(): BlockFamily;
    fence(): FenceBlock;
    fenceGate(): FenceGateBlock;
    hangingSign(): CeilingHangingSignBlock;
    hangingSignItem(): HangingSignItem;
    leaves(): LeavesBlock;
    logBlockTag(): TagKey<Block>;
    logItemTag(): TagKey<Item>;
    logStemEnum(): LogStem;
    logstem(): RotatedPillarBlock;
    makeFamily(): void;
    planks(): Block;
    pressurePlate(): PressurePlateBlock;
    sapling(): PottedBlock;
    sign(): StandingSignBlock;
    signItem(): SignItem;
    slab(): SlabBlock;
    stairs(): StairBlock;
    strippedLogStem(): RotatedPillarBlock;
    strippedWood(): RotatedPillarBlock;
    trapdoor(): TrapDoorBlock;
    wallHangingSign(): WallHangingSignBlock;
    wallSign(): WallSignBlock;
    wood(): RotatedPillarBlock;
    woodType(): WoodType;
    static woodsets(): ArrayList<BWGWoodSet>;
  }


  interface ImbuedBlock extends BuddingAmethystBlock {}
  class ImbuedBlock extends BuddingAmethystBlock {
    static readonly PERSISTENT: BooleanProperty;
    constructor(properties: Properties);
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    isRandomlyTicking(state: BlockState): boolean;
  }


  interface WorkBenchContainer extends CraftingMenu {}
  class WorkBenchContainer extends CraftingMenu {
    constructor(id: number, playerInv: Inventory, worldPos: ContainerLevelAccess, workbench: Block);
    stillValid(playerIn: Player): boolean;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.block.wood.BWGWoodSet' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface LogStem extends Enum<LogStem> {}
  class LogStem extends Enum<LogStem> {
    static readonly LOG: LogStem;
    static readonly STEM: LogStem;
    get name(): string;
    static valueOf(name: string): LogStem;
    static values(): LogStem[];
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.block.wood.sign' {
  import { CeilingHangingSignBlock, StandingSignBlock, WallHangingSignBlock, WallSignBlock } from 'net.minecraft.world.level.block';
  import { Properties } from 'BlockBehaviour';
  import { WoodType } from 'net.minecraft.world.level.block.state.properties';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  interface BWGCeilingHangingSignBlock extends CeilingHangingSignBlock {}
  class BWGCeilingHangingSignBlock extends CeilingHangingSignBlock {
    constructor(properties: Properties, type: WoodType);
    newBlockEntity(arg: BlockPos, arg2: BlockState): BlockEntity;
  }


  interface BWGStandingSignBlock extends StandingSignBlock {}
  class BWGStandingSignBlock extends StandingSignBlock {
    constructor(properties: Properties, type: WoodType);
    newBlockEntity(arg: BlockPos, arg2: BlockState): BlockEntity;
  }


  interface BWGWallHangingSignBlock extends WallHangingSignBlock {}
  class BWGWallHangingSignBlock extends WallHangingSignBlock {
    constructor(properties: Properties, type: WoodType);
    newBlockEntity(arg: BlockPos, arg2: BlockState): BlockEntity;
  }


  interface BWGWallSignBlock extends WallSignBlock {}
  class BWGWallSignBlock extends WallSignBlock {
    constructor(properties: Properties, type: WoodType);
    newBlockEntity(arg: BlockPos, arg2: BlockState): BlockEntity;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen.biome' {
  import { Map, List } from 'java.util';
  import { Multimap } from 'com.google.common.collect';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { RuleSource } from 'SurfaceRules';
  import { Consumer, Predicate } from 'java.util.function';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { Region } from 'terrablender.api';
  import { Wrapped } from 'corgitaco.corgilib.serialization.codec';
  import { Registry } from 'net.minecraft.core';
  import { Pair } from 'com.mojang.datafixers.util';
  import { ParameterPoint } from 'Climate';

  class BWGBiomes {
    static readonly BIOME_FACTORIES: Map;
    static readonly BIOMES_BY_TAG: Multimap;
    static readonly ALLIUM_SHRUBLAND: ResourceKey;
    static readonly AMARANTH_GRASSLAND: ResourceKey;
    static readonly ARAUCARIA_SAVANNA: ResourceKey;
    static readonly ASPEN_BOREAL: ResourceKey;
    static readonly ATACAMA_OUTBACK: ResourceKey;
    static readonly BAOBAB_SAVANNA: ResourceKey;
    static readonly BASALT_BARRERA: ResourceKey;
    static readonly BAYOU: ResourceKey;
    static readonly BLACK_FOREST: ResourceKey;
    static readonly CANADIAN_SHIELD: ResourceKey;
    static readonly CIKA_WOODS: ResourceKey;
    static readonly COCONINO_MEADOW: ResourceKey;
    static readonly CONIFEROUS_FOREST: ResourceKey;
    static readonly CRAG_GARDENS: ResourceKey;
    static readonly CRIMSON_TUNDRA: ResourceKey;
    static readonly CYPRESS_SWAMPLANDS: ResourceKey;
    static readonly CYPRESS_WETLANDS: ResourceKey;
    static readonly DACITE_RIDGES: ResourceKey;
    static readonly DACITE_SHORE: ResourceKey;
    static readonly DEAD_SEA: ResourceKey;
    static readonly EBONY_WOODS: ResourceKey;
    static readonly ENCHANTED_TANGLE: ResourceKey;
    static readonly ERODED_BOREALIS: ResourceKey;
    static readonly FIRECRACKER_CHAPARRAL: ResourceKey;
    static readonly FORGOTTEN_FOREST: ResourceKey;
    static readonly FRAGMENT_JUNGLE: ResourceKey;
    static readonly FROSTED_CONIFEROUS_FOREST: ResourceKey;
    static readonly FROSTED_TAIGA: ResourceKey;
    static readonly HOWLING_PEAKS: ResourceKey;
    static readonly IRONWOOD_GOUR: ResourceKey;
    static readonly JACARANDA_JUNGLE: ResourceKey;
    static readonly LUSH_STACKS: ResourceKey;
    static readonly MAPLE_TAIGA: ResourceKey;
    static readonly MOJAVE_DESERT: ResourceKey;
    static readonly ORCHARD: ResourceKey;
    static readonly OVERGROWTH_WOODLANDS: ResourceKey;
    static readonly PALE_BOG: ResourceKey;
    static readonly PRAIRIE: ResourceKey;
    static readonly PUMPKIN_VALLEY: ResourceKey;
    static readonly RAINBOW_BEACH: ResourceKey;
    static readonly RED_ROCK_VALLEY: ResourceKey;
    static readonly RED_ROCK_PEAKS: ResourceKey;
    static readonly REDWOOD_THICKET: ResourceKey;
    static readonly ROSE_FIELDS: ResourceKey;
    static readonly RUGGED_BADLANDS: ResourceKey;
    static readonly SAKURA_GROVE: ResourceKey;
    static readonly SHATTERED_GLACIER: ResourceKey;
    static readonly SIERRA_BADLANDS: ResourceKey;
    static readonly SKYRIS_VALE: ResourceKey;
    static readonly TROPICAL_RAINFOREST: ResourceKey;
    static readonly TEMPERATE_GROVE: ResourceKey;
    static readonly WEEPING_WITCH_FOREST: ResourceKey;
    static readonly WHITE_MANGROVE_MARSHES: ResourceKey;
    static readonly WINDSWEPT_DESERT: ResourceKey;
    static readonly ZELKOVA_FOREST: ResourceKey;
  }


  class BWGOverworldBiomes {
  }


  class BWGOverworldSurfaceRules {
    static makeRules(): RuleSource;
  }


  class BWGRegionUtils {
    static dumpArrays(biomeConsumer: Consumer<ResourceKey<Biome>>, ...resourceKeys: ResourceKey<Biome>[]): void;
    static filter(configKey: string, regionName: ResourceLocation, configIDX: number, biomeArray: ResourceKey<Biome>, filter: Predicate<ResourceKey<Biome>>, throwsException: boolean): ResourceKey<Biome>;
  }


  interface BWGTerraBlenderRegion extends Region {}
  class BWGTerraBlenderRegion extends Region {
    static readonly REGION_1: BWGTerraBlenderRegion;
    static readonly REGION_2: BWGTerraBlenderRegion;
    static readonly REGION_3: BWGTerraBlenderRegion;
    constructor(overworldWeight: number, oceans: Wrapped<ResourceKey<Biome>[][]>, middleBiomes: Wrapped<ResourceKey<Biome>[][]>, middleBiomesVariant: Wrapped<ResourceKey<Biome>[][]>, plateauBiomes: Wrapped<ResourceKey<Biome>[][]>, plateauBiomesVariant: Wrapped<ResourceKey<Biome>[][]>, shatteredBiomes: Wrapped<ResourceKey<Biome>[][]>, beachBiomes: Wrapped<ResourceKey<Biome>[][]>, peakBiomes: Wrapped<ResourceKey<Biome>[][]>, peakBiomesVariant: Wrapped<ResourceKey<Biome>[][]>, slopeBiomes: Wrapped<ResourceKey<Biome>[][]>, slopeBiomesVariant: Wrapped<ResourceKey<Biome>[][]>, swapper: Map<ResourceKey<Biome>, ResourceKey<Biome>>, globalSwapper: Map<ResourceKey<Biome>, ResourceKey<Biome>>);

    constructor(overworldWeight: number, oceans: ResourceKey<Biome>, middleBiomes: ResourceKey<Biome>, middleBiomesVariant: ResourceKey<Biome>, plateauBiomes: ResourceKey<Biome>, plateauBiomesVariant: ResourceKey<Biome>, shatteredBiomes: ResourceKey<Biome>, beachBiomes: ResourceKey<Biome>, peakBiomes: ResourceKey<Biome>, peakBiomesVariant: ResourceKey<Biome>, slopeBiomes: ResourceKey<Biome>, slopeBiomesVariant: ResourceKey<Biome>, swapper: Map<ResourceKey<Biome>, ResourceKey<Biome>>, globalSwapper: Map<ResourceKey<Biome>, ResourceKey<Biome>>);
    addBiomes(registry: Registry<Biome>, mapper: Consumer<Pair<ParameterPoint, ResourceKey<Biome>>>): void;
    static registerTerrablenderRegions(): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen.biome.BWGBiomes' {
  import { Biome } from 'net.minecraft.world.level.biome';
  import { HolderGetter } from 'net.minecraft.core';
  import { PlacedFeature } from 'net.minecraft.world.level.levelgen.placement';
  import { ConfiguredWorldCarver } from 'net.minecraft.world.level.levelgen.carver';

  class BiomeFactory {
    generate(var1: HolderGetter<PlacedFeature>, var2: HolderGetter<ConfiguredWorldCarver<any>>): Biome;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen.biome.features' {
  import { Builder } from 'BiomeGenerationSettings';

  class BWGOverworldDefaultFeatures {
    static addAnemones(gen: Builder): void;
    static addBWGMushrooms(gen: Builder): void;
    static addBWGSwampVegetation(gen: Builder): void;
    static addBWGTropicFlowers(gen: Builder): void;
    static addBeachGrass(gen: Builder): void;
    static addBlueBerryBush(gen: Builder): void;
    static addBlueRoseBush(gen: Builder): void;
    static addCaliforniaPoppy(gen: Builder): void;
    static addCattails(gen: Builder): void;
    static addCloverFlowers(gen: Builder): void;
    static addCloverPatches(gen: Builder): void;
    static addCrocus(gen: Builder): void;
    static addExtraCattails(gen: Builder): void;
    static addFairySlipper(gen: Builder): void;
    static addFirecrackerBush(gen: Builder): void;
    static addFlowerPatches(gen: Builder): void;
    static addFluorscentCattails(gen: Builder): void;
    static addHorseWeed(gen: Builder): void;
    static addHugeMushrooms(gen: Builder): void;
    static addIris(gen: Builder): void;
    static addJacarandaBushes(gen: Builder): void;
    static addLeafPile(gen: Builder): void;
    static addLeafPileAbundant(gen: Builder): void;
    static addLeatherFlowers(gen: Builder): void;
    static addLushBlueBerryBush(gen: Builder): void;
    static addMeadowShrubs(gen: Builder): void;
    static addMossyStoneBoulder(gen: Builder): void;
    static addMudDisks(biomeIn: Builder): void;
    static addOakBushes(gen: Builder): void;
    static addOrangeTerracottaBoulder(gen: Builder): void;
    static addPaleBogFlowers(gen: Builder): void;
    static addPaloVerdeTrees(gen: Builder): void;
    static addPatchBeachGrassNoise(gen: Builder): void;
    static addProteaFlowers(gen: Builder): void;
    static addRockyStoneBoulder(gen: Builder): void;
    static addRose(gen: Builder): void;
    static addRoseFieldSpruceTrees(gen: Builder): void;
    static addSages(gen: Builder): void;
    static addShrub(gen: Builder): void;
    static addSnowdrops(gen: Builder): void;
    static addSparseAspenTreesShrubs(gen: Builder): void;
    static addSparseFluorscentCattails(gen: Builder): void;
    static addSparseJacarandaTrees(gen: Builder): void;
    static addSparseOakTrees(gen: Builder): void;
    static addSparseRedOakTrees(gen: Builder): void;
    static addSparseRedOrangeSpruceTrees(gen: Builder): void;
    static addSparseSpruceTrees(gen: Builder): void;
    static addSwampDelta(gen: Builder): void;
    static addTulips(gen: Builder): void;
    static addWhitePuffball(gen: Builder): void;
    static addWinterCyclamen(gen: Builder): void;
    static addWinterScilla(gen: Builder): void;
    static addWinterSucculent(gen: Builder): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen.biome.modifiers' {
  import { Map } from 'java.util';

  class BWGBiomeModifiers {
    static readonly BIOME_MODIFIERS_FACTORIES: Map;
    static init(): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen.biome.selector' {
  import { Map } from 'java.util';
  import { Wrapped } from 'corgitaco.corgilib.serialization.codec';

  class BiomeSelectorsUtil {
    static readonly BIOME_LAYOUTS: Map;
  }


  class BWGBiomeSelectors {
    static readonly OCEANS_BWG: Wrapped;
    static readonly OCEANS_2_BWG: Wrapped;
    static readonly MIDDLE_BIOMES_BWG: Wrapped;
    static readonly MIDDLE_BIOMES_2_BWG: Wrapped;
    static readonly MIDDLE_BIOMES_3_BWG: Wrapped;
    static readonly MIDDLE_BIOMES_VARIANT_BWG: Wrapped;
    static readonly PLATEAU_BIOMES_BWG: Wrapped;
    static readonly PLATEAU_BIOMES_2_BWG: Wrapped;
    static readonly PLATEAU_BIOMES_3_BWG: Wrapped;
    static readonly PLATEAU_BIOMES_VARIANT_BWG: Wrapped;
    static readonly PEAK_BIOMES_BWG: Wrapped;
    static readonly SHATTERED_BIOMES_BWG: Wrapped;
    static readonly BEACH_BIOMES_BWG: Wrapped;
    static readonly PEAK_BIOMES_VARIANT_BWG: Wrapped;
    static readonly SLOPE_BIOMES_BWG: Wrapped;
  }


  class TerraBlenderBiomeSelectors {
    static readonly OCEANS_TERRABLENDER: Wrapped;
    static readonly MIDDLE_BIOMES_TERRABLENDER: Wrapped;
    static readonly MIDDLE_BIOMES_VARIANT_TERRABLENDER: Wrapped;
    static readonly PLATEAU_BIOMES_TERRABLENDER: Wrapped;
    static readonly PLATEAU_BIOMES_VARIANT_TERRABLENDER: Wrapped;
    static readonly PEAK_BIOMES_TERRABLENDER: Wrapped;
    static readonly SHATTERED_BIOMES_TERRABLENDER: Wrapped;
    static readonly BEACH_BIOMES_TERRABLENDER: Wrapped;
    static readonly PEAK_BIOMES_VARIANT_TERRABLENDER: Wrapped;
    static readonly SLOPE_BIOMES_TERRABLENDER: Wrapped;
    static readonly SLOPE_BIOMES_VARIANT_TERRABLENDER: Wrapped;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen.blockpredicates' {
  import { Supplier } from 'java.util.function';

  class BWGBlockPredicateTypes {
    static readonly RANDOM_CHANCE: Supplier;
    static blockPredicateTypes(): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen' {
  import { List } from 'java.util';
  import { BlockPredicate } from 'net.minecraft.world.level.levelgen.blockpredicates';
  import { Function } from 'java.util.function';
  import { BlockPos } from 'net.minecraft.core';

  class BWGWorldGenerationUtil {
    static blockMatchesInAllDirections(factory: Function<BlockPos, BlockPredicate>): BlockPredicate[];
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen.customterrain' {
  import { Function } from 'java.util.function';
  import { BlockPos, Holder } from 'net.minecraft.core';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { ChunkAccess, ChunkGenerator } from 'net.minecraft.world.level.chunk';
  import { WorldGenRegion } from 'net.minecraft.server.level';
  import { NoiseParameters } from 'NormalNoise';

  class BasaltBarreraExtension {
    static runBasaltBarreraExtension(biomeGetter: Function<BlockPos, Holder<Biome>>, chunk: ChunkAccess, region: WorldGenRegion, generator: ChunkGenerator): void;
  }


  class CragGardenExtension {
    static runCragGardenExtension(biomeGetter: Function<BlockPos, Holder<Biome>>, chunk: ChunkAccess, worldSeed: number, noiseParameters: NoiseParameters, cliffSpacingParams: NoiseParameters): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen.feature' {
  import { Supplier } from 'java.util.function';
  import { Feature, FeaturePlaceContext } from 'net.minecraft.world.level.levelgen.feature';
  import { Config } from 'net.potionstudios.biomeswevegone.world.level.levelgen.feature.ConfigurableFreezeTopLayer';
  import { Codec } from 'com.mojang.serialization';
  import { NoneFeatureConfiguration } from 'net.minecraft.world.level.levelgen.feature.configurations';
  import { Direction } from 'net.minecraft.core';
  import { NoiseSphereConfig, RoundedRockConfig } from 'net.potionstudios.biomeswevegone.world.level.levelgen.feature.config';
  import { Config as net_potionstudios_biomeswevegone_world_level_levelgen_feature_pillarfeature_Config } from 'net.potionstudios.biomeswevegone.world.level.levelgen.feature.PillarFeature';
  import { ImprovedNoise } from 'net.minecraft.world.level.levelgen.synth';

  class BWGFeatures {
    static readonly SHARPENED_ROCK: Supplier;
    static readonly ROUNDED_ROCK: Supplier;
    static readonly PILLAR: Supplier;
    static readonly VINE_PROCESSOR: Supplier;
    static readonly LUSH_BLOCKS_PROCESSOR: Supplier;
    static readonly CRAG_LAKE: Supplier;
    static readonly NOISE_SPHERE: Supplier;
    static readonly LARGE_PUMPKIN: Supplier;
    static readonly MEDIUM_PUMPKIN: Supplier;
    static readonly CONFIGURABLE_FREEZE_TOP_LAYER: Supplier;
    static features(): void;
  }


  interface ConfigurableFreezeTopLayer extends Feature<Config> {}
  class ConfigurableFreezeTopLayer extends Feature<Config> {
    constructor(codec: Codec<Config>);
    place(context: FeaturePlaceContext<Config>): boolean;
  }


  interface CragLakeFeature extends Feature<NoneFeatureConfiguration> {}
  class CragLakeFeature extends Feature<NoneFeatureConfiguration> {
    static readonly DIRECTIONS: Direction[];
    constructor(codec: Codec<NoneFeatureConfiguration>);
    place(context: FeaturePlaceContext<NoneFeatureConfiguration>): boolean;
  }


  interface LargePumpkinFeature extends Feature<NoneFeatureConfiguration> {}
  class LargePumpkinFeature extends Feature<NoneFeatureConfiguration> {
    constructor(codec: Codec<NoneFeatureConfiguration>);
    place(context: FeaturePlaceContext<NoneFeatureConfiguration>): boolean;
  }


  interface LushBlocksProcessorFeature extends Feature<NoneFeatureConfiguration> {}
  class LushBlocksProcessorFeature extends Feature<NoneFeatureConfiguration> {
    static readonly DIRECTIONS: Direction[];
    constructor(codec: Codec<NoneFeatureConfiguration>);
    place(context: FeaturePlaceContext<NoneFeatureConfiguration>): boolean;
  }


  interface MediumPumpkinFeature extends Feature<NoneFeatureConfiguration> {}
  class MediumPumpkinFeature extends Feature<NoneFeatureConfiguration> {
    constructor(codec: Codec<NoneFeatureConfiguration>);
    place(context: FeaturePlaceContext<NoneFeatureConfiguration>): boolean;
  }


  interface NoiseSphere extends Feature<NoiseSphereConfig> {}
  class NoiseSphere extends Feature<NoiseSphereConfig> {
    constructor(codec: Codec<NoiseSphereConfig>);
    place(context: FeaturePlaceContext<NoiseSphereConfig>): boolean;
  }


  interface PillarFeature extends Feature<net_potionstudios_biomeswevegone_world_level_levelgen_feature_pillarfeature_Config> {}
  class PillarFeature extends Feature<net_potionstudios_biomeswevegone_world_level_levelgen_feature_pillarfeature_Config> {
    constructor(codec: Codec<net_potionstudios_biomeswevegone_world_level_levelgen_feature_pillarfeature_Config>);
    place(context: FeaturePlaceContext<net_potionstudios_biomeswevegone_world_level_levelgen_feature_pillarfeature_Config>): boolean;
  }


  interface RoundedRock extends Feature<RoundedRockConfig> {}
  class RoundedRock extends Feature<RoundedRockConfig> {
    constructor(codec: Codec<RoundedRockConfig>);
    static easeInCirc(x: number): number;
    place(context: FeaturePlaceContext<RoundedRockConfig>): boolean;
  }


  interface SharpenedRockFeature extends Feature<NoneFeatureConfiguration> {}
  class SharpenedRockFeature extends Feature<NoneFeatureConfiguration> {
    static readonly NOISE: ImprovedNoise;
    constructor(noneFeatureConfigurationCodec: Codec<NoneFeatureConfiguration>);
    place(featurePlaceContext: FeaturePlaceContext<NoneFeatureConfiguration>): boolean;
  }


  interface VineProcessorFeature extends Feature<NoneFeatureConfiguration> {}
  class VineProcessorFeature extends Feature<NoneFeatureConfiguration> {
    static readonly DIRECTIONS: Direction[];
    constructor(codec: Codec<NoneFeatureConfiguration>);
    place(context: FeaturePlaceContext<NoneFeatureConfiguration>): boolean;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen.feature.configured' {
  import { ResourceKey } from 'net.minecraft.resources';
  import { Supplier, Function } from 'java.util.function';
  import { Map } from 'java.util';
  import { RandomFeatureConfiguration, FeatureConfiguration } from 'net.minecraft.world.level.levelgen.feature.configurations';
  import { HolderGetter, Holder } from 'net.minecraft.core';
  import { ConfiguredFeature, Feature } from 'net.minecraft.world.level.levelgen.feature';
  import { BootstrapContext } from 'net.minecraft.data.worldgen';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  class BWGConfiguredFeatures {
    static readonly MOSSY_STONE_BOULDER: ResourceKey;
    static readonly ROCKY_STONE_BOULDER: ResourceKey;
    static readonly BLACKSTONE_BOULDER: ResourceKey;
    static readonly ORANGE_TERRACOTTA_BOULDER: ResourceKey;
    static readonly BLACK_ICE: ResourceKey;
    static readonly DISK_MUD: ResourceKey;
    static readonly BASALT_DELTA: ResourceKey;
    static readonly SMALL_BASALT_COLUMN: ResourceKey;
    static readonly LARGE_BASALT_COLUMN: ResourceKey;
    static readonly SWAMP_GRASS_BLOCK_DELTA: ResourceKey;
    static configuredFeatures(): void;
  }


  class BWGOverworldConfiguredFeatures {
    static readonly BOREALIS_ICE_SHARPENED_SPIKE: ResourceKey;
    static readonly WINDSWEPT_BOULDER: ResourceKey;
    static readonly STONE_BOULDER: ResourceKey;
    static readonly LUSH_ROUNDED_ROCK: ResourceKey;
    static readonly DRIPSTONE_ROUNDED_ROCK: ResourceKey;
    static readonly VINE_PROCESSOR: ResourceKey;
    static readonly LUSH_BLOCKS_PROCESSOR: ResourceKey;
    static readonly CRAG_LAKE: ResourceKey;
    static readonly JUNGLE_PILLAR: ResourceKey;
    static readonly BOREALIS_ICE_FREEZE_TOP_LAYER: ResourceKey;
    static init(): void;
  }


  class BWGOverworldTreeConfiguredFeatures {
    static readonly ARAUCARIA_TREE1: ResourceKey;
    static readonly ARAUCARIA_TREE2: ResourceKey;
    static readonly GLOW_BERRY_DECORATOR: Supplier;
    static readonly MOSS_CARPET: Supplier;
    static readonly SHELF_FUNGI: Supplier;
    static readonly ANCIENT_TREE1: ResourceKey;
    static readonly ANCIENT_TREE2: ResourceKey;
    static readonly ANCIENT_TREE3: ResourceKey;
    static readonly ASPEN_SHRUB1: ResourceKey;
    static readonly ASPEN_SHRUB2: ResourceKey;
    static readonly ASPEN_TREE1: ResourceKey;
    static readonly ASPEN_TREE2: ResourceKey;
    static readonly ASPEN_TREE3: ResourceKey;
    static readonly ASPEN_TREE4: ResourceKey;
    static readonly ASPEN_TREE5: ResourceKey;
    static readonly BAOBAB_TREE1: ResourceKey;
    static readonly BAOBAB_TREE2: ResourceKey;
    static readonly BAOBAB_TREE3: ResourceKey;
    static readonly BIRCH_TREE1: ResourceKey;
    static readonly BIRCH_TREE2: ResourceKey;
    static readonly BIRCH_TREE3: ResourceKey;
    static readonly BIRCH_TREE4: ResourceKey;
    static readonly BROWN_BIRCH_TREE1: ResourceKey;
    static readonly BROWN_BIRCH_TREE2: ResourceKey;
    static readonly BROWN_BIRCH_TREE3: ResourceKey;
    static readonly BROWN_BIRCH_TREE4: ResourceKey;
    static readonly BIRCH_ORANGE_TREE1: ResourceKey;
    static readonly BIRCH_ORANGE_TREE2: ResourceKey;
    static readonly BIRCH_ORANGE_TREE3: ResourceKey;
    static readonly BIRCH_ORANGE_TREE4: ResourceKey;
    static readonly RED_BIRCH_TREE1: ResourceKey;
    static readonly RED_BIRCH_TREE2: ResourceKey;
    static readonly RED_BIRCH_TREE3: ResourceKey;
    static readonly RED_BIRCH_TREE4: ResourceKey;
    static readonly YELLOW_BIRCH_TREE1: ResourceKey;
    static readonly YELLOW_BIRCH_TREE2: ResourceKey;
    static readonly YELLOW_BIRCH_TREE3: ResourceKey;
    static readonly YELLOW_BIRCH_TREE4: ResourceKey;
    static readonly BLUFF_TREE1: ResourceKey;
    static readonly BLUFF_TREE2: ResourceKey;
    static readonly BIRCH_BOREAL_TREE1: ResourceKey;
    static readonly BIRCH_YELLOW_BOREAL_TREE1: ResourceKey;
    static readonly OAK_BUSH1: ResourceKey;
    static readonly JUNGLE_BUSH1: ResourceKey;
    static readonly SAKURA_WHITE_TREE1: ResourceKey;
    static readonly SAKURA_WHITE_TREE2: ResourceKey;
    static readonly SAKURA_WHITE_TREE3: ResourceKey;
    static readonly SAKURA_WHITE_TREE4: ResourceKey;
    static readonly SAKURA_WHITE_TREE5: ResourceKey;
    static readonly SAKURA_WHITE_TREE6: ResourceKey;
    static readonly SAKURA_WHITE_TREE7: ResourceKey;
    static readonly SAKURA_YELLOW_TREE1: ResourceKey;
    static readonly SAKURA_YELLOW_TREE2: ResourceKey;
    static readonly SAKURA_YELLOW_TREE3: ResourceKey;
    static readonly SAKURA_YELLOW_TREE4: ResourceKey;
    static readonly SAKURA_YELLOW_TREE5: ResourceKey;
    static readonly SAKURA_YELLOW_TREE6: ResourceKey;
    static readonly SAKURA_YELLOW_TREE7: ResourceKey;
    static readonly CIKA_TREE1: ResourceKey;
    static readonly CIKA_TREE2: ResourceKey;
    static readonly CIKA_TREE3: ResourceKey;
    static readonly CONIFER_TREE1: ResourceKey;
    static readonly CONIFER_TREE2: ResourceKey;
    static readonly CONIFER_TREE3: ResourceKey;
    static readonly CONIFER_TREE4: ResourceKey;
    static readonly CONIFER_TREE5: ResourceKey;
    static readonly CONIFER_TREE6: ResourceKey;
    static readonly CONIFER_TREE7: ResourceKey;
    static readonly CONIFER_TREE8: ResourceKey;
    static readonly WITCH_HAZEL_BLOSSOM: Supplier;
    static readonly WITCH_HAZEL_BRANCH: Supplier;
    static readonly GLOW_LICHEN: Supplier;
    static readonly CYPRESS_TREE1: ResourceKey;
    static readonly CYPRESS_TREE2: ResourceKey;
    static readonly CYPRESS_TREE3: ResourceKey;
    static readonly WITCH_HAZEL1: ResourceKey;
    static readonly WITCH_HAZEL2: ResourceKey;
    static readonly WITCH_HAZEL3: ResourceKey;
    static readonly WITCH_HAZEL4: ResourceKey;
    static readonly WITCH_HAZEL5: ResourceKey;
    static readonly FIRECRACKER_SHRUB: ResourceKey;
    static readonly FIRECRACKER_SHRUB2: ResourceKey;
    static readonly FIRECRACKER_BUSH1: ResourceKey;
    static readonly EBONY_BUSH1: ResourceKey;
    static readonly EBONY_TREE1: ResourceKey;
    static readonly EBONY_TREE2: ResourceKey;
    static readonly HOLLY_TREE1: ResourceKey;
    static readonly HOLLY_TREE2: ResourceKey;
    static readonly HOLLY_TREE3: ResourceKey;
    static readonly HOLLY_TREE4: ResourceKey;
    static readonly BLUE_ENCHANTED_SAPLING_TREE1: ResourceKey;
    static readonly BLUE_ENCHANTED_SAPLING_TREE2: ResourceKey;
    static readonly BLUE_ENCHANTED_SAPLING_TREE3: ResourceKey;
    static readonly BLUE_ENCHANTED_TREE1: ResourceKey;
    static readonly BLUE_ENCHANTED_TREE2: ResourceKey;
    static readonly BLUE_ENCHANTED_TREE3: ResourceKey;
    static readonly BLUE_ENCHANTED_TREE4: ResourceKey;
    static readonly GREEN_ENCHANTED_SAPLING_TREE1: ResourceKey;
    static readonly GREEN_ENCHANTED_SAPLING_TREE2: ResourceKey;
    static readonly GREEN_ENCHANTED_SAPLING_TREE3: ResourceKey;
    static readonly GREEN_ENCHANTED_TREE1: ResourceKey;
    static readonly GREEN_ENCHANTED_TREE2: ResourceKey;
    static readonly GREEN_ENCHANTED_TREE3: ResourceKey;
    static readonly GREEN_ENCHANTED_TREE4: ResourceKey;
    static readonly JACARANDA_TREE1: ResourceKey;
    static readonly JACARANDA_TREE2: ResourceKey;
    static readonly JACARANDA_TREE3: ResourceKey;
    static readonly JACARANDA_TREE4: ResourceKey;
    static readonly INDIGO_JACARANDA_TREE1: ResourceKey;
    static readonly INDIGO_JACARANDA_TREE2: ResourceKey;
    static readonly INDIGO_JACARANDA_TREE3: ResourceKey;
    static readonly INDIGO_JACARANDA_TREE4: ResourceKey;
    static readonly YUCCA_TREE1: ResourceKey;
    static readonly YUCCA_TREE2: ResourceKey;
    static readonly WHITE_MANGROVE_TREE1: ResourceKey;
    static readonly WHITE_MANGROVE_TREE2: ResourceKey;
    static readonly WHITE_MANGROVE_TREE3: ResourceKey;
    static readonly WHITE_MANGROVE_TREE4: ResourceKey;
    static readonly WHITE_MANGROVE_TREE5: ResourceKey;
    static readonly IRONWOOD_TREE1: ResourceKey;
    static readonly IRONWOOD_TREE2: ResourceKey;
    static readonly IRONWOOD_TREE3: ResourceKey;
    static readonly IRONWOOD_TREE4: ResourceKey;
    static readonly FLOWERING_IRONWOOD_TREE1: ResourceKey;
    static readonly FLOWERING_IRONWOOD_TREE2: ResourceKey;
    static readonly FLOWERING_IRONWOOD_TREE3: ResourceKey;
    static readonly FLOWERING_IRONWOOD_TREE4: ResourceKey;
    static readonly MAPLE_TREE1: ResourceKey;
    static readonly MAPLE_TREE2: ResourceKey;
    static readonly MAPLE_TREE3: ResourceKey;
    static readonly MAPLE_TREE4: ResourceKey;
    static readonly MAPLE_TREE5: ResourceKey;
    static readonly RED_MAPLE_TREE1: ResourceKey;
    static readonly RED_MAPLE_TREE2: ResourceKey;
    static readonly RED_MAPLE_TREE3: ResourceKey;
    static readonly RED_MAPLE_TREE4: ResourceKey;
    static readonly RED_MAPLE_TREE5: ResourceKey;
    static readonly SILVER_MAPLE_TREE1: ResourceKey;
    static readonly SILVER_MAPLE_TREE2: ResourceKey;
    static readonly SILVER_MAPLE_TREE3: ResourceKey;
    static readonly SILVER_MAPLE_TREE4: ResourceKey;
    static readonly SILVER_MAPLE_TREE5: ResourceKey;
    static readonly MEADOW_TREE1: ResourceKey;
    static readonly MEADOW_TREE2: ResourceKey;
    static readonly MEADOW_TREE3: ResourceKey;
    static readonly OAK_TREE1: ResourceKey;
    static readonly OAK_TREE2: ResourceKey;
    static readonly OAK_TREE3: ResourceKey;
    static readonly OAK_TREE_LARGE1: ResourceKey;
    static readonly OAK_TREE_LARGE2: ResourceKey;
    static readonly OAK_TREE_LARGE3: ResourceKey;
    static readonly RED_OAK_TREE1: ResourceKey;
    static readonly RED_OAK_TREE2: ResourceKey;
    static readonly RED_OAK_TREE3: ResourceKey;
    static readonly RED_OAK_TREE_LARGE1: ResourceKey;
    static readonly RED_OAK_TREE_LARGE2: ResourceKey;
    static readonly RED_OAK_TREE_LARGE3: ResourceKey;
    static readonly BROWN_OAK_TREE1: ResourceKey;
    static readonly BROWN_OAK_TREE2: ResourceKey;
    static readonly BROWN_OAK_TREE3: ResourceKey;
    static readonly BROWN_OAK_TREE_LARGE1: ResourceKey;
    static readonly BROWN_OAK_TREE_LARGE2: ResourceKey;
    static readonly BROWN_OAK_TREE_LARGE3: ResourceKey;
    static readonly ORANGE_OAK_TREE1: ResourceKey;
    static readonly ORANGE_OAK_TREE2: ResourceKey;
    static readonly ORANGE_OAK_TREE3: ResourceKey;
    static readonly ORANGE_OAK_TREE_LARGE1: ResourceKey;
    static readonly ORANGE_OAK_TREE_LARGE2: ResourceKey;
    static readonly ORANGE_OAK_TREE_LARGE3: ResourceKey;
    static readonly ORCHARD_TREE1: ResourceKey;
    static readonly ORCHARD_TREE2: ResourceKey;
    static readonly ORCHARD_TREE3: ResourceKey;
    static readonly ORCHARD_TREE4: ResourceKey;
    static readonly ORCHARD_TREE5: ResourceKey;
    static readonly PALM_TREE1: ResourceKey;
    static readonly PALM_TREE2: ResourceKey;
    static readonly PALM_TREE3: ResourceKey;
    static readonly PALM_TREE4: ResourceKey;
    static readonly PINE_LARGE_TREE1: ResourceKey;
    static readonly PINE_LARGE_TREE2: ResourceKey;
    static readonly PINE_TREE1: ResourceKey;
    static readonly PINE_TREE2: ResourceKey;
    static readonly PALO_VERDE_TREE1: ResourceKey;
    static readonly PALO_VERDE_TREE2: ResourceKey;
    static readonly RAINBOW_EUCALYPTUS_TREE1: ResourceKey;
    static readonly RAINBOW_EUCALYPTUS_LARGE_TREE1: ResourceKey;
    static readonly REDWOOD_TREE1: ResourceKey;
    static readonly REDWOOD_TREE2: ResourceKey;
    static readonly REDWOOD_TREE3: ResourceKey;
    static readonly SHRUB_MEADOW: ResourceKey;
    static readonly SHRUB_MEADOW2: ResourceKey;
    static readonly SHRUB_PRAIRIE1: ResourceKey;
    static readonly SHRUB_PRAIRIE2: ResourceKey;
    static readonly SKYRIS_TREE1: ResourceKey;
    static readonly SKYRIS_TREE2: ResourceKey;
    static readonly SKYRIS_TREE3: ResourceKey;
    static readonly SKYRIS_TREE4: ResourceKey;
    static readonly SKYRIS_TREE5: ResourceKey;
    static readonly SKYRIS_TREE6: ResourceKey;
    static readonly SPRUCE_TREE1: ResourceKey;
    static readonly SPRUCE_TREE2: ResourceKey;
    static readonly SPRUCE_TREE3: ResourceKey;
    static readonly SPRUCE_TREE4: ResourceKey;
    static readonly SPRUCE_TREE_MEDIUM1: ResourceKey;
    static readonly SPRUCE_TREE_MEDIUM2: ResourceKey;
    static readonly SPRUCE_TREE_MEDIUM3: ResourceKey;
    static readonly SPRUCE_TREE_MEDIUM4: ResourceKey;
    static readonly SPRUCE_TREE_LARGE1: ResourceKey;
    static readonly SPRUCE_YELLOW_TREE1: ResourceKey;
    static readonly SPRUCE_YELLOW_TREE2: ResourceKey;
    static readonly SPRUCE_YELLOW_TREE3: ResourceKey;
    static readonly SPRUCE_YELLOW_TREE4: ResourceKey;
    static readonly SPRUCE_YELLOW_TREE_MEDIUM1: ResourceKey;
    static readonly SPRUCE_YELLOW_TREE_MEDIUM2: ResourceKey;
    static readonly SPRUCE_YELLOW_TREE_MEDIUM3: ResourceKey;
    static readonly SPRUCE_YELLOW_TREE_MEDIUM4: ResourceKey;
    static readonly SPRUCE_YELLOW_TREE_LARGE1: ResourceKey;
    static readonly SPRUCE_ORANGE_TREE1: ResourceKey;
    static readonly SPRUCE_ORANGE_TREE2: ResourceKey;
    static readonly SPRUCE_ORANGE_TREE3: ResourceKey;
    static readonly SPRUCE_ORANGE_TREE4: ResourceKey;
    static readonly SPRUCE_ORANGE_TREE_MEDIUM1: ResourceKey;
    static readonly SPRUCE_ORANGE_TREE_MEDIUM2: ResourceKey;
    static readonly SPRUCE_ORANGE_TREE_MEDIUM3: ResourceKey;
    static readonly SPRUCE_ORANGE_TREE_MEDIUM4: ResourceKey;
    static readonly SPRUCE_ORANGE_TREE_LARGE1: ResourceKey;
    static readonly RED_SPRUCE_TREE1: ResourceKey;
    static readonly RED_SPRUCE_TREE2: ResourceKey;
    static readonly RED_SPRUCE_TREE3: ResourceKey;
    static readonly RED_SPRUCE_TREE4: ResourceKey;
    static readonly RED_SPRUCE_TREE_MEDIUM1: ResourceKey;
    static readonly RED_SPRUCE_TREE_MEDIUM2: ResourceKey;
    static readonly RED_SPRUCE_TREE_MEDIUM3: ResourceKey;
    static readonly RED_SPRUCE_TREE_MEDIUM4: ResourceKey;
    static readonly RED_SPRUCE_TREE_LARGE1: ResourceKey;
    static readonly BLUE_SPRUCE_TREE1: ResourceKey;
    static readonly BLUE_SPRUCE_TREE2: ResourceKey;
    static readonly BLUE_SPRUCE_TREE3: ResourceKey;
    static readonly BLUE_SPRUCE_TREE4: ResourceKey;
    static readonly BLUE_SPRUCE_TREE_MEDIUM1: ResourceKey;
    static readonly BLUE_SPRUCE_TREE_MEDIUM2: ResourceKey;
    static readonly BLUE_SPRUCE_TREE_MEDIUM3: ResourceKey;
    static readonly BLUE_SPRUCE_TREE_MEDIUM4: ResourceKey;
    static readonly BLUE_SPRUCE_TREE_LARGE1: ResourceKey;
    static readonly TROPICAL_SHRUB1: ResourceKey;
    static readonly MAHOGANY_TREE1: ResourceKey;
    static readonly MAHOGANY_TREE2: ResourceKey;
    static readonly MAHOGANY_TREE3: ResourceKey;
    static readonly MAHOGANY_TREE4: ResourceKey;
    static readonly FORGOTTEN_TREE1: ResourceKey;
    static readonly WOODLANDS_TREE1: ResourceKey;
    static readonly WOODLANDS_TREE_LARGE1: ResourceKey;
    static readonly WOODLANDS_TREE_LARGE2: ResourceKey;
    static readonly WOODLANDS_STUMP1: ResourceKey;
    static readonly WILLOW_DEAD_TREE1: ResourceKey;
    static readonly WILLOW_TREE1: ResourceKey;
    static readonly WILLOW_TREE2: ResourceKey;
    static readonly WILLOW_TREE3: ResourceKey;
    static readonly WILLOW_TREE4: ResourceKey;
    static readonly SPIRIT_TREE1: ResourceKey;
    static readonly SPIRIT_TREE2: ResourceKey;
    static readonly SPIRIT_TREE3: ResourceKey;
    static readonly SPIRIT_TREE4: ResourceKey;
    static readonly BASE_SPIRIT_TREE1: ResourceKey;
    static readonly BASE_SPIRIT_TREE2: ResourceKey;
    static readonly BASE_SPIRIT_TREE3: ResourceKey;
    static readonly BASE_SPIRIT_TREE4: ResourceKey;
    static readonly ZELKOVA_TREE1: ResourceKey;
    static readonly ZELKOVA_TREE2: ResourceKey;
    static readonly ZELKOVA_TREE3: ResourceKey;
    static readonly ZELKOVA_BROWN_TREE1: ResourceKey;
    static readonly ZELKOVA_BROWN_TREE2: ResourceKey;
    static readonly ZELKOVA_BROWN_TREE3: ResourceKey;
    static readonly GIANT_ALLIUM_1: ResourceKey;
    static readonly GIANT_ALLIUM_2: ResourceKey;
    static readonly GIANT_ALLIUM_3: ResourceKey;
    static readonly GIANT_PINK_ALLIUM_1: ResourceKey;
    static readonly GIANT_PINK_ALLIUM_2: ResourceKey;
    static readonly GIANT_PINK_ALLIUM_3: ResourceKey;
    static readonly GIANT_WHITE_ALLIUM_1: ResourceKey;
    static readonly GIANT_WHITE_ALLIUM_2: ResourceKey;
    static readonly GIANT_WHITE_ALLIUM_3: ResourceKey;
    static readonly FLORUS_ROSE_1: ResourceKey;
    static readonly FLORUS_THORN_1: ResourceKey;
    static readonly GIANT_ALLIUMS: ResourceKey;
    static readonly FIRECRACKER_SHRUBS: ResourceKey;
    static readonly BAYOU_TREES: ResourceKey;
    static readonly SPIRIT_TREES: ResourceKey;
    static readonly CANADIAN_SHIELD_TREES: ResourceKey;
    static readonly FLORUS_TREES: ResourceKey;
    static readonly BLACK_FOREST_TREES: ResourceKey;
    static readonly RED_ROCK_VALLEY_TREES: ResourceKey;
    static readonly CIKA_TREES: ResourceKey;
    static readonly CONIFER_TREES: ResourceKey;
    static readonly CYPRESS_TREES: ResourceKey;
    static readonly DECIDUOUS_TREES: ResourceKey;
    static readonly DACITE_RIDGE_TREES: ResourceKey;
    static readonly JACARANDA_TREES: ResourceKey;
    static readonly MAPLE_TREES: ResourceKey;
    static readonly RED_MAPLE_TREES: ResourceKey;
    static readonly SILVER_MAPLE_TREES: ResourceKey;
    static readonly MAPLE_TAIGA_TREES: ResourceKey;
    static readonly NORTHERN_FOREST_TREES: ResourceKey;
    static readonly REDWOOD_TREES: ResourceKey;
    static readonly SPRUCE_TREES: ResourceKey;
    static readonly ORANGE_SPRUCE_TREES: ResourceKey;
    static readonly YELLOW_SPRUCE_TREES: ResourceKey;
    static readonly RED_SPRUCE_TREES: ResourceKey;
    static readonly AUTUMNAL_SPRUCE_TREES: ResourceKey;
    static readonly BLUE_SPRUCE_TREES: ResourceKey;
    static readonly ROSE_FIELD_SPRUCE_TREES: ResourceKey;
    static readonly MAHOGANY_TREES: ResourceKey;
    static readonly RAINFOREST_TREES: ResourceKey;
    static readonly GUIANA_SHIELD_TREES: ResourceKey;
    static readonly RAINBOW_EUCALYPTUS_TREES: ResourceKey;
    static readonly SKYRIS_TREES: ResourceKey;
    static readonly BAOBAB_TREES: ResourceKey;
    static readonly ARAUCARIA_TREES: ResourceKey;
    static readonly IRONWOOD_TREES: ResourceKey;
    static readonly FLOWERING_IRONWOOD_TREES: ResourceKey;
    static readonly BIRCH_TREES: ResourceKey;
    static readonly ORANGE_BIRCH_TREES: ResourceKey;
    static readonly YELLOW_BIRCH_TREES: ResourceKey;
    static readonly BROWN_ZELKOVA_TREES: ResourceKey;
    static readonly OAK_BUSHES: ResourceKey;
    static readonly MEADOW_SHRUBS: ResourceKey;
    static readonly MEADOW_TREES: ResourceKey;
    static readonly TEMPERATE_GROVE_TREES: ResourceKey;
    static readonly ENCHANTED_TREES: ResourceKey;
    static readonly ASPEN_TREES: ResourceKey;
    static readonly ASPEN_SHRUBS: ResourceKey;
    static readonly ZELKOVA_TREES: ResourceKey;
    static readonly PALO_VERDE_TREES: ResourceKey;
    static readonly YUCCA_TREES: ResourceKey;
    static readonly PRAIRIE_SHRUBS: ResourceKey;
    static readonly PALM_TREES: ResourceKey;
    static readonly WHITE_SAKURA_TREES: ResourceKey;
    static readonly YELLOW_SAKURA_TREES: ResourceKey;
    static readonly WITCH_HAZEL_TREES: ResourceKey;
    static readonly EBONY_TREES: ResourceKey;
    static readonly FRAGMENT_JUNGLE_TREES: ResourceKey;
    static readonly HOLLY_TREES: ResourceKey;
    static readonly MANGROVE_TREES: ResourceKey;
    static readonly ORCHARD_TREES: ResourceKey;
    static readonly TEMPERATE_RAINFOREST_TREES: ResourceKey;
    static readonly FORGOTTEN_FOREST_TREES: ResourceKey;
    static readonly OVERGROWTH_WOODLANDS_TREES: ResourceKey;
    static readonly OAK_TREES: ResourceKey;
    static readonly OAK_TREES_SWAMP: ResourceKey;
    static readonly ORANGE_OAK_TREES: ResourceKey;
    static readonly BROWN_OAK_TREES: ResourceKey;
    static readonly RED_OAK_TREES: ResourceKey;
    static readonly AUTUMNAL_OAK_TREES: ResourceKey;
    static init(): void;
  }


  class BWGOverworldVegetationConfiguredFeatures {
    static readonly ROSE_BUSH: ResourceKey;
    static readonly BLUE_ROSE_BUSH: ResourceKey;
    static readonly WINTER_ROSE: ResourceKey;
    static readonly WINTER_SCILLA: ResourceKey;
    static readonly WINTER_CYCLAMEN: ResourceKey;
    static readonly SNOWDROPS: ResourceKey;
    static readonly PROTEA_FLOWER: ResourceKey;
    static readonly ROSE_FIELD_FLOWERS: ResourceKey;
    static readonly TULIPS: ResourceKey;
    static readonly JAPANESE_ORCHID: ResourceKey;
    static readonly CLOVER_PATCH: ResourceKey;
    static readonly FLOWER_PATCH: ResourceKey;
    static readonly LEAF_PILE: ResourceKey;
    static readonly CLOVER_AND_FLOWERS: ResourceKey;
    static readonly WHITE_SAKURA_PETALS: ResourceKey;
    static readonly YELLOW_SAKURA_PETALS: ResourceKey;
    static readonly SAKURA_PETALS: ResourceKey;
    static readonly ALLIUM: ResourceKey;
    static readonly ALLIUM_TALL_BUSH: ResourceKey;
    static readonly TALL_PINK_ALLIUM_BUSH: ResourceKey;
    static readonly TALL_WHITE_ALLIUM_BUSH: ResourceKey;
    static readonly ALLIUM_SHRUBLAND_FLOWERS: ResourceKey;
    static readonly AMARANTH_GRASSLAND_FLOWERS: ResourceKey;
    static readonly PATCH_BLUEBERRY: ResourceKey;
    static readonly JACARANDA_BUSH: ResourceKey;
    static readonly FLOWERING_JACARANDA_BUSH: ResourceKey;
    static readonly INDIGO_JACARANDA_BUSH: ResourceKey;
    static readonly FLOWERING_INDIGO_JACARANDA_BUSH: ResourceKey;
    static readonly JACARANDA_BUSHES: ResourceKey;
    static readonly HYDRANGEA_BUSH: ResourceKey;
    static readonly HYDRANGEA_HEDGE: ResourceKey;
    static readonly SHRUB: ResourceKey;
    static readonly HYDRANGEAS: ResourceKey;
    static readonly GREEN_MUSHROOM: ResourceKey;
    static readonly WEEPING_MILKCAP: ResourceKey;
    static readonly WOOD_BLEWIT: ResourceKey;
    static readonly MUSHROOMS: ResourceKey;
    static readonly BEACH_GRASS: ResourceKey;
    static readonly TALL_BEACH_GRASS_PATCH: ResourceKey;
    static readonly BEACH_GRASSES: ResourceKey;
    static readonly SINGLE_PRAIRIE_GRASS: ResourceKey;
    static readonly PRAIRIE_GRASS_PATCH: ResourceKey;
    static readonly TALL_PRAIRIE_GRASS_PATCH: ResourceKey;
    static readonly PRAIRIE_GRASS: ResourceKey;
    static readonly FOXGLOVE: ResourceKey;
    static readonly DELPHINIUM: ResourceKey;
    static readonly CYAN_PITCHER_PLANT: ResourceKey;
    static readonly MAGENTA_PITCHER_PLANT: ResourceKey;
    static readonly MINI_CACTI: ResourceKey;
    static readonly PRICKLY_PEAR_CACTI: ResourceKey;
    static readonly GOLDEN_SPINED_CACTI: ResourceKey;
    static readonly BARREL_CACTI: ResourceKey;
    static readonly FLOWERING_BARREL_CACTI: ResourceKey;
    static readonly ALOE_VERA: ResourceKey;
    static readonly WHITE_PUFFBALL: ResourceKey;
    static readonly FIRECRACKER_BUSH: ResourceKey;
    static readonly WINDSWEPT_DESERT_VEGETATION: ResourceKey;
    static readonly MOJAVE_DESERT_VEGETATION: ResourceKey;
    static readonly RUGGED_BADLANDS_VEGETATION: ResourceKey;
    static readonly ATACAMA_OUTBACK_VEGETATION: ResourceKey;
    static readonly ANEMONES: ResourceKey;
    static readonly SAGES: ResourceKey;
    static readonly JUNGLE_FLOWERS: ResourceKey;
    static readonly LEATHER_FLOWERS: ResourceKey;
    static readonly TINY_LILY_PAD: ResourceKey;
    static readonly FLOWERING_TINY_LILY_PAD: ResourceKey;
    static readonly WATER_SILK: ResourceKey;
    static readonly SWAMP_WATER_VEGETATION: ResourceKey;
    static readonly MANGROVE_SWAMP_WATER_VEGETATION: ResourceKey;
    static readonly CATTAIL: ResourceKey;
    static readonly CATTAIL_SPROUT: ResourceKey;
    static readonly FLUORESCENT_CATTAIL: ResourceKey;
    static readonly FLUORESCENT_CATTAIL_SPROUT: ResourceKey;
    static readonly CATTAILS: ResourceKey;
    static readonly FLUORESCENT_CATTAILS: ResourceKey;
    static readonly WATER_VEGETATION: ResourceKey;
    static readonly HUGE_GREEN_MUSHROOM1: ResourceKey;
    static readonly HUGE_GREEN_MUSHROOM2: ResourceKey;
    static readonly HUGE_WEEPING_MILKCAP1: ResourceKey;
    static readonly HUGE_WOOD_BLEWIT1: ResourceKey;
    static readonly HUGE_MUSHROOMS: ResourceKey;
    static readonly LARGE_PUMPKIN: ResourceKey;
    static readonly MEDIUM_PUMPKIN: ResourceKey;
    static init(): void;
  }


  class BWGVanillaConfiguredFeatures {
    static readonly FLOWER_DEFAULT: ResourceKey;
    static readonly FLOWER_PLAINS: ResourceKey;
    static readonly FOREST_FLOWERS: ResourceKey;
    static init(): void;
  }


  class ConfiguredFeaturesUtil {
    static readonly CONFIGURED_FEATURES_FACTORIES: Map;
    static createConfiguredFeature<FC extends FeatureConfiguration, F extends Feature<FC>>(id: string, feature: F, config: Function<BootstrapContext<ConfiguredFeature<any, any>>, FC>): ResourceKey<ConfiguredFeature<any, any>>;
    static createConfiguredFeature<FC extends FeatureConfiguration, F extends Feature<FC>>(id: string, feature: Supplier<F>, config: Supplier<FC>): ResourceKey<ConfiguredFeature<any, any>>;
    static createConfiguredFeature<FC extends FeatureConfiguration, F extends Feature<FC>>(id: string, feature: F, config: Supplier<FC>): ResourceKey<ConfiguredFeature<any, any>>;
    static createConfiguredFeature<FC extends FeatureConfiguration, F extends Feature<FC>>(feature: F, config: Supplier<FC>): Holder<ConfiguredFeature<any, any>>;
    static createConfiguredFeature<FC extends FeatureConfiguration, F extends Feature<FC>>(feature: F, config: FC): Holder<ConfiguredFeature<any, any>>;
    static createConfiguredFeature<FC extends FeatureConfiguration, F extends Feature<FC>>(feature: Supplier<F>, config: Supplier<FC>): Holder<ConfiguredFeature<any, any>>;
    static createFlowerConfiguredFeature<FC extends FeatureConfiguration, F extends Feature<FC>>(id: string, flowerBlock: Supplier<Block>, configuredFeatureBootstrapContext: BootstrapContext<ConfiguredFeature<any, any>>): ResourceKey<ConfiguredFeature<any, any>>;
    static createPatchConfiguredFeatureWithBlock<FC extends FeatureConfiguration, F extends Feature<FC>>(id: string, block: Supplier<Block>, tries: number): ResourceKey<ConfiguredFeature<any, any>>;
    static createPatchConfiguredFeatureWithState(id: string, state: Supplier<BlockState>, tries: number, configuredFeatureBootstrapContext: BootstrapContext<ConfiguredFeature<any, any>>): ResourceKey<ConfiguredFeature<any, any>>;
    static createPatchConfiguredFeatureWithState<FC extends FeatureConfiguration, F extends Feature<FC>>(block: Block, tries: number): Holder<ConfiguredFeature<any, any>>;
    static createRandomWeightedConfiguredFeature(lookup: HolderGetter<ConfiguredFeature<any, any>>, ...configuredFeatures: ResourceKey<ConfiguredFeature<any, any>>[]): RandomFeatureConfiguration;
    static createSimpleBlockConfiguredFeatureWithBlock(id: string, block: Supplier<Block>): ResourceKey<ConfiguredFeature<any, any>>;
    static createSimpleBlockConfiguredFeatureWithState(id: string, state: Supplier<BlockState>, configuredFeatureBootstrapContext: BootstrapContext<ConfiguredFeature<any, any>>): ResourceKey<ConfiguredFeature<any, any>>;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen.feature.configured.ConfiguredFeaturesUtil' {
  import { ConfiguredFeature } from 'net.minecraft.world.level.levelgen.feature';
  import { BootstrapContext } from 'net.minecraft.data.worldgen';

  class ConfiguredFeatureFactory {
    generate(var1: BootstrapContext<ConfiguredFeature<any, any>>): ConfiguredFeature<any, any>;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen.feature.PillarFeature' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { BlockPos } from 'net.minecraft.core';

  interface DistanceTestType extends Enum<DistanceTestType> {}
  class DistanceTestType extends Enum<DistanceTestType> {
    static readonly EUCLIDEAN: DistanceTestType;
    static readonly MANHATTAN: DistanceTestType;
    static readonly CHEBYSHEV: DistanceTestType;
    get distanceTester(): DistanceTester;
    static valueOf(name: string): DistanceTestType;
    static values(): DistanceTestType[];
  }


  class DistanceTester {
    withinDistance(var1: BlockPos, var2: BlockPos, var3: number): boolean;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen.feature.placed' {
  import { ResourceKey } from 'net.minecraft.resources';
  import { Map, List, OptionalInt } from 'java.util';
  import { Supplier } from 'java.util.function';
  import { PlacementModifier, PlacedFeature } from 'net.minecraft.world.level.levelgen.placement';
  import { Holder } from 'net.minecraft.core';
  import { ConfiguredFeature } from 'net.minecraft.world.level.levelgen.feature';
  import { FeatureConfiguration } from 'net.minecraft.world.level.levelgen.feature.configurations';

  class BWGOverworldTreePlacedFeatures {
    static readonly SPARSE_RED_OAK_TREES: ResourceKey;
    static readonly SPARSE_JACARANDA_TREES: ResourceKey;
    static readonly ROSE_FIELD_SPRUCE_TREES: ResourceKey;
    static readonly SPARSE_ARAUCARIA_TREES: ResourceKey;
    static readonly RED_ROCK_VALLEY_TREES: ResourceKey;
    static readonly IRONWOOD_PLATEAU_TREES: ResourceKey;
    static readonly IRONWOOD_GROUND_TREES: ResourceKey;
    static readonly OAK_BUSHES: ResourceKey;
    static readonly BAOBAB_TREES: ResourceKey;
    static readonly SKYRIS_TREES: ResourceKey;
    static readonly SPARSE_BLUE_SPRUCE_TREES: ResourceKey;
    static readonly ORCHARD_TREES: ResourceKey;
    static readonly TEMPERATE_RAINFOREST_TREES: ResourceKey;
    static readonly FORGOTTEN_FOREST_TREES: ResourceKey;
    static readonly OVERGROWTH_WOODLANDS_TREES: ResourceKey;
    static readonly MEADOW_TREES: ResourceKey;
    static readonly SPARSE_MEADOW_TREES: ResourceKey;
    static readonly MEADOW_SHRUBS: ResourceKey;
    static readonly YUCCA_TREES: ResourceKey;
    static readonly CIKA_TREES: ResourceKey;
    static readonly SPARSE_SPRUCE_TREES: ResourceKey;
    static readonly SPARSE_RED_SPRUCE_TREES: ResourceKey;
    static readonly SPARSE_ORANGE_SPRUCE_TREES: ResourceKey;
    static readonly BLUE_SPRUCE_TREES: ResourceKey;
    static readonly CONIFER_TREES: ResourceKey;
    static readonly GIANT_ALLIUMS: ResourceKey;
    static readonly FLORUS_TREES: ResourceKey;
    static readonly TEMPERATE_GROVE_TREES: ResourceKey;
    static readonly MAPLE_TAIGA_TREES: ResourceKey;
    static readonly ASPEN_SHRUBS: ResourceKey;
    static readonly ASPEN_TREES: ResourceKey;
    static readonly ASPEN_TREES_SPARSE: ResourceKey;
    static readonly BLACK_FOREST_TREES: ResourceKey;
    static readonly GUIANA_SHIELD_TREES: ResourceKey;
    static readonly CANADIAN_SHIELD_TREES: ResourceKey;
    static readonly SPARSE_OAK_TREES: ResourceKey;
    static readonly BWG_OAK_TREES: ResourceKey;
    static readonly PRAIRIE_SHRUBS: ResourceKey;
    static readonly ZELKOVA_TREES: ResourceKey;
    static readonly PALO_VERDE_TREES: ResourceKey;
    static readonly FRAGMENT_JUNGLE_TREES: ResourceKey;
    static readonly SPRUCE_TREES: ResourceKey;
    static readonly REDWOOD_TREES: ResourceKey;
    static readonly DACITE_RIDGE_TREES: ResourceKey;
    static readonly HOLLY_TREES: ResourceKey;
    static readonly JACARANDA_TREES: ResourceKey;
    static readonly SPARSE_BWG_BIRCH_TREES: ResourceKey;
    static readonly BWG_BIRCH_TREES: ResourceKey;
    static readonly WHITE_SAKURA_TREES: ResourceKey;
    static readonly YELLOW_SAKURA_TREES: ResourceKey;
    static readonly EBONY_TREES: ResourceKey;
    static readonly HAZEL_TREES: ResourceKey;
    static readonly PALM_TREES: ResourceKey;
    static readonly ORANGE_BIRCH_TREES: ResourceKey;
    static readonly YELLOW_BIRCH_TREES: ResourceKey;
    static readonly RAINFOREST_TREES: ResourceKey;
    static readonly MANGROVE_TREES: ResourceKey;
    static readonly CYPRESS_TREES: ResourceKey;
    static readonly SPARSE_CYPRESS_TREES: ResourceKey;
    static readonly BAYOU_TREES: ResourceKey;
    static readonly OAK_TREES_SWAMP: ResourceKey;
    static readonly ENCHANTED_TREES: ResourceKey;
    static readonly SPARSE_ENCHANTED_TREES: ResourceKey;
    static readonly SPIRIT_TREES: ResourceKey;
    static readonly FIRECRACKER_SHRUBS: ResourceKey;
    static readonly CRAG_BUSHES: ResourceKey;
  }


  class BWGOverworldVegationPlacedFeatures {
    static readonly ROSE: ResourceKey;
    static readonly BLACK_ROSE: ResourceKey;
    static readonly CYAN_ROSE: ResourceKey;
    static readonly OSIRIA_ROSE: ResourceKey;
    static readonly WINTER_ROSE: ResourceKey;
    static readonly BLUE_ROSE_BUSH: ResourceKey;
    static readonly ORANGE_DAISY: ResourceKey;
    static readonly JAPANESE_ORCHID: ResourceKey;
    static readonly CLOVER_PATCH: ResourceKey;
    static readonly CLOVER_FLOWERS: ResourceKey;
    static readonly LEAF_PILE: ResourceKey;
    static readonly LEAF_PILE_ABUNDANT: ResourceKey;
    static readonly FLOWER_PATCHES: ResourceKey;
    static readonly SAKURA_PETALS: ResourceKey;
    static readonly ALLIUM_SHRUBLAND_FLOWERS: ResourceKey;
    static readonly AMARANTH_GRASSLAND_FLOWERS: ResourceKey;
    static readonly ROSE_FIELD_FLOWERS: ResourceKey;
    static readonly BLUE_BERRY_BUSH: ResourceKey;
    static readonly BLUE_BERRY_BUSH_LUSH: ResourceKey;
    static readonly MUSHROOMS: ResourceKey;
    static readonly PATCH_BEACH_GRASS_NOISE: ResourceKey;
    static readonly PATCH_BEACH_GRASS: ResourceKey;
    static readonly PRAIRIE_GRASS: ResourceKey;
    static readonly PRAIRIE_GRASS_BONEMEAL: ResourceKey;
    static readonly WINDSWEPT_DESERT_VEGETATION: ResourceKey;
    static readonly MOJAVE_DESERT_VEGETATION: ResourceKey;
    static readonly ATACAMA_OUTBACK_VEGETATION: ResourceKey;
    static readonly RUGGED_BADLANDS_VEGETATION: ResourceKey;
    static readonly CYAN_PITCHER_PLANT: ResourceKey;
    static readonly MAGENTA_PITCHER_PLANT: ResourceKey;
    static readonly DELPHINIUM: ResourceKey;
    static readonly DELPHINIUM_PILLAR: ResourceKey;
    static readonly FOXGLOVES: ResourceKey;
    static readonly CROCUS: ResourceKey;
    static readonly FAIRY_SLIPPER: ResourceKey;
    static readonly PINK_ALLIUMS: ResourceKey;
    static readonly WHITE_ALLIUMS: ResourceKey;
    static readonly LOLLIPOP_FLOWERS: ResourceKey;
    static readonly YELLOW_DAFFODIL: ResourceKey;
    static readonly DAFFODIL: ResourceKey;
    static readonly PINK_DAFFODIL: ResourceKey;
    static readonly ANGELICA: ResourceKey;
    static readonly BISTORT: ResourceKey;
    static readonly ANEMONES: ResourceKey;
    static readonly TULIPS: ResourceKey;
    static readonly ALPINE_BELLFLOWER: ResourceKey;
    static readonly IRIS: ResourceKey;
    static readonly WINTER_SUCCULENT: ResourceKey;
    static readonly WINTER_SCILLA: ResourceKey;
    static readonly WINTER_CYCLAMEN: ResourceKey;
    static readonly SNOWDROPS: ResourceKey;
    static readonly PROTEA_FLOWER: ResourceKey;
    static readonly SAGES: ResourceKey;
    static readonly JUNGLE_FLOWERS: ResourceKey;
    static readonly JUNGLE_FLOWERS_PILLAR: ResourceKey;
    static readonly CALIFORNIA_POPPY: ResourceKey;
    static readonly KOVAN_FLOWER: ResourceKey;
    static readonly HORSEWEED: ResourceKey;
    static readonly LEATHER_FLOWERS: ResourceKey;
    static readonly WHITE_PUFFBALL: ResourceKey;
    static readonly JACARANDA_BUSHES: ResourceKey;
    static readonly HYDRANGEAS: ResourceKey;
    static readonly SHRUB: ResourceKey;
    static readonly FIRECRACKER_BUSH: ResourceKey;
    static readonly SWAMP_WATER_VEGETATION: ResourceKey;
    static readonly MANGROVE_SWAMP_WATER_VEGETATION: ResourceKey;
    static readonly EXTRA_CATTAILS: ResourceKey;
    static readonly CATTAILS: ResourceKey;
    static readonly FLUORESCENT_CATTAILS: ResourceKey;
    static readonly SPARSE_FLUORESCENT_CATTAILS: ResourceKey;
    static readonly IRONWOOD_PLATEAU_GLOW_LICHEN: ResourceKey;
    static readonly IRONWOOD_PLATEAU_PATCH_GRASS_WORLD_SURFACE: ResourceKey;
    static readonly PATCH_GRASS_JUNGLE_WORLD_SURFACE: ResourceKey;
    static readonly CRAG_BAMBOO: ResourceKey;
    static readonly CRAG_LAKE_VEGETATION: ResourceKey;
    static readonly COLD_LAKE_VEGETATION: ResourceKey;
    static readonly HUGE_MUSHROOMS: ResourceKey;
    static readonly LARGE_PUMPKIN: ResourceKey;
    static readonly MEDIUM_PUMPKIN: ResourceKey;
    static readonly SMALL_PUMPKIN: ResourceKey;
    static init(): void;
  }


  class BWGPlacedFeatures {
    static readonly MOSSY_STONE_BOULDER: ResourceKey;
    static readonly ROCKY_STONE_BOULDER: ResourceKey;
    static readonly ORANGE_TERRACOTTA_BOULDER: ResourceKey;
    static readonly BOREALIS_ICE_SHARPENED_SPIKE: ResourceKey;
    static readonly LUSH_ROUNDED_ROCK: ResourceKey;
    static readonly DRIPSTONE_ROUNDED_ROCK: ResourceKey;
    static readonly WINDSWEPT_BOULDER: ResourceKey;
    static readonly BOULDER: ResourceKey;
    static readonly VINE_PROCESSOR: ResourceKey;
    static readonly LUSH_BLOCKS_PROCESSOR: ResourceKey;
    static readonly CRAG_LAKE: ResourceKey;
    static readonly STONE_PILLAR: ResourceKey;
    static readonly DISK_MUD: ResourceKey;
    static readonly BASALT_DELTA: ResourceKey;
    static readonly LARGE_BASALT_COLUMN: ResourceKey;
    static readonly SMALL_BASALT_COLUMN: ResourceKey;
    static readonly SWAMP_GRASS_BLOCK_DELTA: ResourceKey;
    static readonly BOREALIS_ICE_FREEZE_TOP_LAYER: ResourceKey;
    static placedFeatures(): void;
  }


  class BWGVanillaPlacedFeatures {
    static readonly FLOWER_DEFAULT: ResourceKey;
    static readonly FLOWER_WARM: ResourceKey;
    static readonly FLOWER_PLAINS: ResourceKey;
    static readonly FOREST_FLOWERS: ResourceKey;
    static init(): void;
  }


  class PlacedFeaturesUtil {
    static readonly PLACED_FEATURE_FACTORIES: Map;
    static createPlacedFeatureDirect<FC extends FeatureConfiguration>(feature: Holder<ConfiguredFeature<any, any>>, ...placementModifiers: PlacementModifier[]): Holder<PlacedFeature>;
    static createPlacedFeatureDirect<FC extends FeatureConfiguration>(feature: Holder<ConfiguredFeature<any, any>>, placementModifiers: PlacementModifier[]): Holder<PlacedFeature>;
    static oceanFloorSquaredWithCount($$0: number, ...modifiers: PlacementModifier[]): Supplier<PlacementModifier[]>;
    static oceanFloorSquaredWithCountAndMaxDepth($$0: number, maxDepth: OptionalInt, ...modifiers: PlacementModifier[]): Supplier<PlacementModifier[]>;
    static treePlacementBaseOceanFloor(...$$0: PlacementModifier[]): Supplier<PlacementModifier[]>;
    static treePlacementBaseOceanFloor(maxDepth: OptionalInt, ...$$0: PlacementModifier[]): Supplier<PlacementModifier[]>;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen.feature.placed.PlacedFeaturesUtil' {
  import { PlacedFeature } from 'net.minecraft.world.level.levelgen.placement';
  import { HolderGetter } from 'net.minecraft.core';
  import { ConfiguredFeature } from 'net.minecraft.world.level.levelgen.feature';

  class PlacedFeatureFactory {
    generate(var1: HolderGetter<ConfiguredFeature<any, any>>): PlacedFeature;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen.feature.stateproviders' {
  import { NoiseBasedStateProvider, BlockStateProvider } from 'net.minecraft.world.level.levelgen.feature.stateproviders';
  import { MapCodec } from 'com.mojang.serialization';
  import { NoiseParameters } from 'NormalNoise';
  import { List } from 'java.util';
  import { FloatProvider } from 'net.minecraft.util.valueproviders';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { RandomSource } from 'net.minecraft.util';
  import { BlockPos } from 'net.minecraft.core';
  import { Supplier } from 'java.util.function';

  interface BetweenNoiseThresholdProvider extends NoiseBasedStateProvider {}
  class BetweenNoiseThresholdProvider extends NoiseBasedStateProvider {
    static readonly CODEC: MapCodec;
    constructor(seed: number, noiseParameters: NoiseParameters, scale: number, thresholds: FloatProvider[], withinNoiseStateProvider: BlockStateProvider, outsideNoiseStateProvider: BlockStateProvider, use3D: boolean);
    static createThresholds(size: number, min: number, max: number): FloatProvider[];
    getState(random: RandomSource, pos: BlockPos): BlockState;
  }


  class BWGStateProviders {
    static readonly BETWEEN_NOISE_THRESHOLD_PROVIDER: Supplier;
    static stateProviders(): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen.feature.treedecorators' {
  import { Supplier } from 'java.util.function';
  import { TreeDecorator } from 'net.minecraft.world.level.levelgen.feature.treedecorators';
  import { MapCodec } from 'com.mojang.serialization';
  import { FloatProvider, IntProvider } from 'net.minecraft.util.valueproviders';
  import { Context } from 'TreeDecorator';

  class BWGTreeDecorators {
    static readonly GLOW_BERRY_DECORATOR: Supplier;
    static treeDecorators(): void;
  }


  interface GlowBerryDecorator extends TreeDecorator {}
  class GlowBerryDecorator extends TreeDecorator {
    static readonly CODEC: MapCodec;
    constructor(probability: FloatProvider, length: IntProvider, berriesProbability: FloatProvider);
    place(context: Context): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen.structure.arch' {
  import { StructurePiece, BoundingBox, Structure, StructureType } from 'net.minecraft.world.level.levelgen.structure';
  import { StructurePieceSerializationContext } from 'net.minecraft.world.level.levelgen.structure.pieces';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { WorldGenLevel, StructureManager, ChunkPos } from 'net.minecraft.world.level';
  import { ChunkGenerator } from 'net.minecraft.world.level.chunk';
  import { RandomSource } from 'net.minecraft.util';
  import { BlockPos } from 'net.minecraft.core';
  import { MapCodec } from 'com.mojang.serialization';
  import { StructureSettings } from 'Structure';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { BlendingFunction } from 'corgitaco.corgilib.math.blendingfunction';
  import { Consumer } from 'java.util.function';

  interface ArchPiece extends StructurePiece {}
  class ArchPiece extends StructurePiece {
    constructor(context: StructurePieceSerializationContext, tag: CompoundTag);
    postProcess(level: WorldGenLevel, structureManager: StructureManager, generator: ChunkGenerator, random: RandomSource, box: BoundingBox, chunkPos: ChunkPos, pos: BlockPos): void;
  }


  interface ArchStructure extends Structure {}
  class ArchStructure extends Structure {
    static readonly INFINITE: BoundingBox;
    static readonly CODEC: MapCodec;
    constructor(settings: StructureSettings, config: ArchConfig);
    static between(center: Vec3, second: Vec3, xzStepDistance: number, yOffset: number, step3dDistance: number, blendingFunction: BlendingFunction, stepAction: Consumer<BlockPos>): void;
    static generate(seed: number, thickness: number, frequency: number, stepOrigin: BlockPos, effectedArea: BoundingBox, action: Consumer<BlockPos>): void;
    type(): StructureType<any>;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen.structure' {
  import { Supplier } from 'java.util.function';
  import { StructurePieceType } from 'net.minecraft.world.level.levelgen.structure.pieces';
  import { Map } from 'java.util';
  import { ResourceKey } from 'net.minecraft.resources';
  import { StructureType, Structure } from 'net.minecraft.world.level.levelgen.structure';

  class BWGStructurePieceTypes {
    static readonly SHARPENED_ROCK_PIECE: Supplier;
    static readonly GOUR_PLATEAU_PIECE: Supplier;
    static readonly LARGE_LAKE: Supplier;
    static readonly ARCH_PIECE: Supplier;
    static create(id: string, structureTypeSupplier: Supplier<StructurePieceType>): Supplier<StructurePieceType>;
    static structurePieceTypes(): void;
  }


  class BWGStructures {
    static readonly STRUCTURE_FACTORIES: Map;
    static readonly SHARPENED_ROCK: ResourceKey;
    static readonly IRONWOOD_GOUR_PLATEAU: ResourceKey;
    static readonly LARGE_LAKE: ResourceKey;
    static readonly LUSH_ARCH: ResourceKey;
    static readonly DRIPSTONE_ARCH: ResourceKey;
    static readonly RED_ROCK_ARCH: ResourceKey;
    static readonly PRAIRIE_HOUSE: ResourceKey;
    static readonly ABANDONED_PRAIRIE_HOUSE: ResourceKey;
    static readonly RUGGED_FOSSIL: ResourceKey;
    static readonly ASPEN_MANOR_1: ResourceKey;
    static readonly ASPEN_MANOR_2: ResourceKey;
    static readonly BOG_TRIAL: ResourceKey;
    static readonly FORGOTTEN_VILLAGE: ResourceKey;
    static readonly SKYRIS_VILLAGE: ResourceKey;
    static readonly SALEM_VILLAGE: ResourceKey;
    static readonly RED_ROCK_VILLAGE: ResourceKey;
    static readonly PUMPKIN_PATCH_VILLAGE: ResourceKey;
    static readonly SWAMP_VILLAGE: ResourceKey;
  }


  class BWGStructureSets {
    static readonly STRUCTURE_SET_FACTORIES: Map;
  }


  class BWGStructureTypes {
    static readonly SHARPENED_ROCK: Supplier;
    static readonly OVERHANG_PLATEAU: Supplier;
    static readonly LARGE_LAKE: Supplier;
    static readonly ARCH: Supplier;
    static create<S extends Structure>(id: string, structureTypeSupplier: Supplier<StructureType<S>>): Supplier<StructureType<S>>;
    static structureTypes(): void;
  }


  class BWGTemplatePools {
    static readonly TEMPLATE_POOL_FACTORIES: Map;
    static readonly PRAIRIE_HOUSE: ResourceKey;
    static readonly ABANDONED_PRAIRIE_HOUSE: ResourceKey;
    static readonly RUGGED_FOSSIL: ResourceKey;
    static readonly ASPEN_MANOR_1: ResourceKey;
    static readonly ASPEN_MANOR_2: ResourceKey;
    static readonly BOG_TRIAL: ResourceKey;
    static templatePools(): void;
  }


  class BWGVillageTemplatePools {
    static readonly SKYRIS_TOWN_CENTERS: ResourceKey;
    static readonly SKYRIS_VILLAGERS: ResourceKey;
    static readonly SKYRIS_STREETS: ResourceKey;
    static readonly SKYRIS_HOUSES: ResourceKey;
    static readonly FORGOTTEN_TOWN_CENTERS: ResourceKey;
    static readonly FORGOTTEN_STREETS: ResourceKey;
    static readonly FORGOTTEN_HOUSES: ResourceKey;
    static readonly SALEM_TOWN_CENTERS: ResourceKey;
    static readonly SALEM_STREETS: ResourceKey;
    static readonly SALEM_VILLAGERS: ResourceKey;
    static readonly SALEM_HOUSES: ResourceKey;
    static readonly RED_ROCK_TOWN_CENTERS: ResourceKey;
    static readonly RED_ROCK_STREETS: ResourceKey;
    static readonly RED_ROCK_VILLAGERS: ResourceKey;
    static readonly RED_ROCK_HOUSES: ResourceKey;
    static readonly PUMPKIN_PATCH_TOWN_CENTERS: ResourceKey;
    static readonly PUMPKIN_PATCH_STREETS: ResourceKey;
    static readonly PUMPKIN_PATCH_HOUSES: ResourceKey;
    static readonly SWAMP_TOWN_CENTERS: ResourceKey;
    static readonly SWAMP_STREETS: ResourceKey;
    static readonly SWAMP_HOUSES: ResourceKey;
    static villageTemplatePools(): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen.structure.BWGStructures' {
  import { Structure } from 'net.minecraft.world.level.levelgen.structure';
  import { BootstrapContext } from 'net.minecraft.data.worldgen';

  class StructureFactory {
    generate(var1: BootstrapContext<Structure>): Structure;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen.structure.BWGStructureSets' {
  import { StructureSet, Structure } from 'net.minecraft.world.level.levelgen.structure';
  import { HolderGetter } from 'net.minecraft.core';

  class StructureSetFactory {
    generate(var1: HolderGetter<Structure>): StructureSet;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen.structure.BWGTemplatePools' {
  import { StructureTemplatePool } from 'net.minecraft.world.level.levelgen.structure.pools';
  import { BootstrapContext } from 'net.minecraft.data.worldgen';

  class TemplatePoolFactory {
    generate(var1: BootstrapContext<StructureTemplatePool>): StructureTemplatePool;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen.structure.lake' {
  import { StructurePiece, BoundingBox, Structure, StructureType } from 'net.minecraft.world.level.levelgen.structure';
  import { StructurePieceSerializationContext } from 'net.minecraft.world.level.levelgen.structure.pieces';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { WorldGenLevel, StructureManager, ChunkPos } from 'net.minecraft.world.level';
  import { ChunkGenerator } from 'net.minecraft.world.level.chunk';
  import { RandomSource } from 'net.minecraft.util';
  import { BlockPos } from 'net.minecraft.core';
  import { MapCodec } from 'com.mojang.serialization';
  import { StructureSettings } from 'Structure';

  interface LargeLakePiece extends StructurePiece {}
  class LargeLakePiece extends StructurePiece {
    constructor(context: StructurePieceSerializationContext, tag: CompoundTag);
    postProcess(worldGenLevel: WorldGenLevel, structureManager: StructureManager, generator: ChunkGenerator, random: RandomSource, box: BoundingBox, chunkPos: ChunkPos, pos: BlockPos): void;
  }


  interface LargeLakeStructure extends Structure {}
  class LargeLakeStructure extends Structure {
    static readonly CODEC: MapCodec;
    constructor(settings: StructureSettings, largeLakeConfig: LargeLakeConfig);
    type(): StructureType<any>;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen.structure.plateau' {
  import { StructurePiece, BoundingBox, Structure, StructureType } from 'net.minecraft.world.level.levelgen.structure';
  import { StructurePieceSerializationContext } from 'net.minecraft.world.level.levelgen.structure.pieces';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { WorldGenLevel, StructureManager, ChunkPos } from 'net.minecraft.world.level';
  import { ChunkGenerator } from 'net.minecraft.world.level.chunk';
  import { RandomSource } from 'net.minecraft.util';
  import { BlockPos } from 'net.minecraft.core';
  import { MapCodec } from 'com.mojang.serialization';
  import { StructureSettings } from 'Structure';

  interface GourPlateauPiece extends StructurePiece {}
  class GourPlateauPiece extends StructurePiece {
    constructor(context: StructurePieceSerializationContext, tag: CompoundTag);
    postProcess(worldGenLevel: WorldGenLevel, structureManager: StructureManager, generator: ChunkGenerator, random: RandomSource, box: BoundingBox, chunkPos: ChunkPos, pos: BlockPos): void;
  }


  interface GourPlateauStructure extends Structure {}
  class GourPlateauStructure extends Structure {
    static readonly CODEC: MapCodec;
    constructor(settings: StructureSettings);
    type(): StructureType<any>;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen.structure.processor' {
  import { Supplier } from 'java.util.function';
  import { Map } from 'java.util';
  import { ResourceKey } from 'net.minecraft.resources';

  class BWGCustomStructureProcessors {
    static readonly FRUIT_BLOCK_PROCESSOR: Supplier;
    static readonly PLANT_PROCESSOR: Supplier;
    static processors(): void;
  }


  class BWGProcessorRules {
  }


  class BWGStructureProcessorLists {
    static readonly STRUCTURE_PROCESSOR_LIST_FACTORIES: Map;
    static readonly PRAIRIE_HOUSE: ResourceKey;
    static readonly ABANDONED_PRAIRIE_HOUSE: ResourceKey;
    static readonly ASPEN_MANOR: ResourceKey;
    static readonly FORGOTTEN_VILLAGE_BLOCKS: ResourceKey;
    static readonly SKYRIS_STREETS: ResourceKey;
    static readonly SKYRIS_TEMPLE: ResourceKey;
    static readonly SKYRIS_LIBRARY: ResourceKey;
    static readonly SKYRIS_FLETCHER_HOUSE: ResourceKey;
    static readonly SKYRIS_FORAGER_HOUSE: ResourceKey;
    static readonly SKYRIS_TOWN_CENTERS: ResourceKey;
    static readonly SALEM_TOWN_CENTER: ResourceKey;
    static readonly SALEM_STREETS: ResourceKey;
    static readonly SALEM_HOUSES: ResourceKey;
    static readonly RED_ROCK_STREETS: ResourceKey;
    static readonly RED_ROCK_CRACKED_BRICKS_50_PERCENT_MOSSY_RED_ROCK_BRICKS: ResourceKey;
    static readonly RED_ROCK_MEETING_POINT_1: ResourceKey;
    static readonly RED_ROCK_MEETING_POINT_3: ResourceKey;
    static readonly RED_ROCK_TO_BRICKS: ResourceKey;
    static readonly RED_ROCK_HOUSE: ResourceKey;
    static readonly PUMPKIN_PATCH_STREETS: ResourceKey;
    static readonly PUMPKIN_PATCH_HOUSE: ResourceKey;
    static readonly PUMPKIN_PATCH_FARM: ResourceKey;
    static readonly PUMPKIN_PATCH_MEETING_POINT: ResourceKey;
    static readonly SWAMP_STREETS: ResourceKey;
    static readonly SWAMP_HOUSE: ResourceKey;
    static readonly MOSSIFY_10_PERCENT_WHITE_PUFFBALL: ResourceKey;
    static readonly BOG_TRIAL: ResourceKey;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen.structure.processor.BWGStructureProcessorLists' {
  import { StructureProcessorList } from 'net.minecraft.world.level.levelgen.structure.templatesystem';
  import { HolderGetter } from 'net.minecraft.core';

  class StructureProcessorListFactory {
    generate(var1: HolderGetter<StructureProcessorList>): StructureProcessorList;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen.structure.processor.processors' {
  import { StructureProcessor, StructurePlaceSettings } from 'net.minecraft.world.level.levelgen.structure.templatesystem';
  import { MapCodec } from 'com.mojang.serialization';
  import { BWGFruitBlock } from 'net.potionstudios.biomeswevegone.world.level.block.plants.tree.fruit';
  import { List } from 'java.util';
  import { StructureBlockInfo } from 'StructureTemplate';
  import { ServerLevelAccessor } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { Block } from 'net.minecraft.world.level.block';

  interface FruitBlockProcessor extends StructureProcessor {}
  class FruitBlockProcessor extends StructureProcessor {
    static readonly CODEC: MapCodec;
    constructor(fruitBlock: BWGFruitBlock);
    finalizeProcessing(serverLevel: ServerLevelAccessor, offset: BlockPos, pos: BlockPos, originalBlockInfos: StructureBlockInfo[], processedBlockInfos: StructureBlockInfo[], settings: StructurePlaceSettings): StructureBlockInfo[];
  }


  interface PlantProcessor extends StructureProcessor {}
  class PlantProcessor extends StructureProcessor {
    static readonly CODEC: MapCodec;
    constructor(ground: Block, plant: Block, chance: number);
    finalizeProcessing(serverLevel: ServerLevelAccessor, offset: BlockPos, pos: BlockPos, originalBlockInfos: StructureBlockInfo[], processedBlockInfos: StructureBlockInfo[], settings: StructurePlaceSettings): StructureBlockInfo[];
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen.structure.sharpenedrock' {
  import { StructurePiece, BoundingBox, Structure, StructureType } from 'net.minecraft.world.level.levelgen.structure';
  import { BlockPos } from 'net.minecraft.core';
  import { StructurePieceSerializationContext } from 'net.minecraft.world.level.levelgen.structure.pieces';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { WorldGenLevel, StructureManager, ChunkPos } from 'net.minecraft.world.level';
  import { ChunkGenerator } from 'net.minecraft.world.level.chunk';
  import { RandomSource } from 'net.minecraft.util';
  import { ImprovedNoise } from 'net.minecraft.world.level.levelgen.synth';
  import { MapCodec } from 'com.mojang.serialization';
  import { StructureSettings } from 'Structure';
  import { Quaterniond } from 'org.joml';
  import { BiPredicate } from 'java.util.function';

  interface SharpenedRockPiece extends StructurePiece {}
  class SharpenedRockPiece extends StructurePiece {
    constructor(origin: BlockPos, radius: number, hasFoundation: boolean, hasSpike: boolean, pitch: number, yaw: number, cache: number[], genDepth: number, box: BoundingBox);

    constructor(context: StructurePieceSerializationContext, tag: CompoundTag);
    postProcess(worldGenLevel: WorldGenLevel, structureManager: StructureManager, chunkGenerator: ChunkGenerator, r: RandomSource, boundingBox: BoundingBox, chunkPos: ChunkPos, blockPos: BlockPos): void;
  }


  interface SharpenedRockStructure extends Structure {}
  class SharpenedRockStructure extends Structure {
    static readonly NOISE: ImprovedNoise;
    static readonly CODEC: MapCodec;
    constructor(structureSettings: StructureSettings, config: SharpenedRockConfig);
    static createHeightCache(radius: number, origin: BlockPos): number[];
    static generateFromCache(radius: number, heights: number[], origin: BlockPos, quaternion: Quaterniond, reverse: boolean, action: BiPredicate<BlockPos, BlockPos>): void;
    type(): StructureType<any>;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen.structure.village' {
  import { MinecraftServer } from 'net.minecraft.server';

  class PlaceInVillage {
    static addStructuresToVillages(server: MinecraftServer): void;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen.surfacerules' {
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { SimpleWeightedRandomList } from 'net.minecraft.util.random';
  import { IntProvider } from 'net.minecraft.util.valueproviders';
  import { RuleSource, SurfaceRule, Context } from 'SurfaceRules';
  import { KeyDispatchDataCodec } from 'net.minecraft.util';
  import { ResourceKey } from 'net.minecraft.resources';
  import { NoiseParameters } from 'NormalNoise';
  import { List } from 'java.util';

  class BandsContext {
    getBandsState(var1: BandsRuleSource, var2: SimpleWeightedRandomList<BlockState>, var3: IntProvider, var4: IntProvider, var5: number, var6: number, var7: number, var8: number, var9: number): BlockState;
  }


  interface BetweenRepeatingNoiseRange extends RuleSource {}
  class BetweenRepeatingNoiseRange extends RuleSource {
    static readonly CODEC: KeyDispatchDataCodec;
    constructor(noiseParametersResourceKey: ResourceKey<NoiseParameters>, size: number, min: number, max: number, ruleSources: RuleSource[]);

    constructor(noiseParametersResourceKey: ResourceKey<NoiseParameters>, size: number, min: number, max: number, ...ruleSources: RuleSource[]);
    apply(context: Context): SurfaceRule;
    codec(): KeyDispatchDataCodec<RuleSource>;
  }


  class BWGRuleSources {
    static ruleSources(): void;
    static weightedRuleSource(ruleSource: SimpleWeightedRandomList<RuleSource>): WeightedRuleSource;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.levelgen.util' {
  import { Holder, BlockPos } from 'net.minecraft.core';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { Function } from 'java.util.function';

  class BlendUtil {
    static blendBiomeEdge(currentBiome: Holder<Biome>, biomeGetter: Function<BlockPos, Holder<Biome>>, origin: BlockPos, blendRadius: number, blendStep: number): number;
  }

}

declare module 'net.potionstudios.biomeswevegone.world.level.saveddata.maps' {
  import { Supplier } from 'java.util.function';

  class BWGMapDecorationTypes {
    static readonly BOG_TRIAL: Supplier;
    static mapDecorationTypes(): void;
  }

}