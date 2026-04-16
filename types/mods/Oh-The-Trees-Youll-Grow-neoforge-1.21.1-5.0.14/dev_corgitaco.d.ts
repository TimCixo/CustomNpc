declare module 'dev.corgitaco.ohthetreesyoullgrow' {
  import { Logger } from 'org.slf4j';
  import { ResourceLocation } from 'net.minecraft.resources';

  class CommonClass {
    static init(): void;
  }


  class Constants {
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static readonly LOGGER: Logger;
    static createLocation(path: string): ResourceLocation;
  }

}

declare module 'dev.corgitaco.ohthetreesyoullgrow.data.worldgen.features' {
  import { Map } from 'java.util';
  import { ResourceKey } from 'net.minecraft.resources';

  class TYGConfiguredFeatures {
    static readonly CONFIGURED_FEATURES_FACTORIES: Map;
    static readonly V1_TEST_TREE1: ResourceKey;
    static readonly V1_TEST_TREE2: ResourceKey;
    static readonly V1_TEST_TREE3: ResourceKey;
    static readonly V1_TEST_MUSHROOM1: ResourceKey;
    static readonly V1_TEST_MUSHROOM2: ResourceKey;
    static register(): void;
  }


  class TYGPlacedFeatures {
    static readonly PLACED_FEATURE_FACTORIES: Map;
    static readonly V1_TEST_TREE1: ResourceKey;
    static readonly V1_TEST_TREE2: ResourceKey;
    static readonly V1_TEST_TREE3: ResourceKey;
    static readonly V1_TEST_MUSHROOM1: ResourceKey;
    static readonly V1_TEST_MUSHROOM2: ResourceKey;
    static register(): void;
  }

}

declare module 'dev.corgitaco.ohthetreesyoullgrow.data.worldgen.features.TYGConfiguredFeatures' {
  import { ConfiguredFeature } from 'net.minecraft.world.level.levelgen.feature';
  import { BootstrapContext } from 'net.minecraft.data.worldgen';

  class ConfiguredFeatureFactory {
    generate(var1: BootstrapContext<ConfiguredFeature<any, any>>): ConfiguredFeature<any, any>;
  }

}

declare module 'dev.corgitaco.ohthetreesyoullgrow.data.worldgen.features.TYGPlacedFeatures' {
  import { PlacedFeature } from 'net.minecraft.world.level.levelgen.placement';
  import { HolderGetter } from 'net.minecraft.core';
  import { ConfiguredFeature } from 'net.minecraft.world.level.levelgen.feature';

  class PlacedFeatureFactory {
    generate(var1: HolderGetter<ConfiguredFeature<any, any>>): PlacedFeature;
  }

}

declare module 'dev.corgitaco.ohthetreesyoullgrow.mixin.chunk' {
  import { RandomTickScheduler } from 'dev.corgitaco.ohthetreesyoullgrow.world.level.chunk';
  import { BlockPos } from 'net.minecraft.core';
  import { List } from 'java.util';

  interface MixinChunkAccess extends RandomTickScheduler {}
  class MixinChunkAccess extends RandomTickScheduler {
    get scheduledRandomTicks(): BlockPos[];
    scheduleRandomTick(pos: BlockPos): void;
  }


  class MixinChunkSerializer {
  }


  interface MixinLevelChunk extends RandomTickScheduler {}
  class MixinLevelChunk extends RandomTickScheduler {
  }

}

declare module 'dev.corgitaco.ohthetreesyoullgrow.mixin' {
  import { Level } from 'net.minecraft.world.level';
  import { MinecraftServer } from 'net.minecraft.server';
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { Set, List } from 'java.util';
  import { ClassNode } from 'org.objectweb.asm.tree';

  interface MixinServerLevel extends Level {}
  class MixinServerLevel extends Level {
    get server(): MinecraftServer;
  }


  interface TYGMixinPlugin extends IMixinConfigPlugin {}
  class TYGMixinPlugin extends IMixinConfigPlugin {
    acceptTargets(myTargets: Set<string>, otherTargets: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    onLoad(mixinPackage: string): void;
    postApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    preApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    shouldApplyMixin(targetClassName: string, mixinClassName: string): boolean;
  }

}

declare module 'dev.corgitaco.ohthetreesyoullgrow.neoforge' {
  import { IEventBus } from 'net.neoforged.bus.api';

  class OhTheTreesYoullGrowNeoForge {
    constructor(bus: IEventBus);
  }

}

declare module 'dev.corgitaco.ohthetreesyoullgrow.neoforge.platform' {
  import { ModPlatform } from 'dev.corgitaco.ohthetreesyoullgrow.platform';
  import { Map } from 'java.util';
  import { Path } from 'java.nio.file';
  import { Platform } from 'dev.corgitaco.ohthetreesyoullgrow.platform.ModPlatform';
  import { Supplier } from 'java.util.function';
  import { Registry } from 'net.minecraft.core';

  interface NeoForgeModPlatform extends ModPlatform {}
  class NeoForgeModPlatform extends ModPlatform {
    static readonly CACHED: Map;
    configPath(): Path;
    isModLoaded(isLoaded: string): boolean;
    modPlatform(): Platform;
    register<T>(registry: Registry<T>, name: string, value: Supplier<T>): Supplier<T>;
  }

}

declare module 'dev.corgitaco.ohthetreesyoullgrow.platform' {
  import { Path } from 'java.nio.file';
  import { Platform } from 'dev.corgitaco.ohthetreesyoullgrow.platform.ModPlatform';
  import { Supplier } from 'java.util.function';
  import { Registry } from 'net.minecraft.core';

  class ModPlatform {
    static readonly INSTANCE: ModPlatform;
    configPath(): Path;
    isModLoaded(var1: string): boolean;
    modPlatform(): Platform;
    register<T>(var1: Registry<T>, var2: string, var3: Supplier<T>): Supplier<T>;
  }

}

declare module 'dev.corgitaco.ohthetreesyoullgrow.platform.ModPlatform' {
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

declare module 'dev.corgitaco.ohthetreesyoullgrow.world.level.chunk' {
  import { BlockPos } from 'net.minecraft.core';
  import { List } from 'java.util';

  class RandomTickScheduler {
    get scheduledRandomTicks(): BlockPos[];
    scheduleRandomTick(var1: BlockPos): void;
  }

}

declare module 'dev.corgitaco.ohthetreesyoullgrow.world.level.levelgen.feature.configurations.treedecorators' {
  import { AttachedToLeavesDecorator, TreeDecorator } from 'net.minecraft.world.level.levelgen.feature.treedecorators';
  import { MapCodec } from 'com.mojang.serialization';
  import { Block, VineBlock } from 'net.minecraft.world.level.block';
  import { BlockStateProvider } from 'net.minecraft.world.level.levelgen.feature.stateproviders';
  import { List } from 'java.util';
  import { Direction, BlockPos } from 'net.minecraft.core';
  import { Context } from 'TreeDecorator';
  import { BooleanProperty } from 'net.minecraft.world.level.block.state.properties';
  import { Supplier } from 'java.util.function';

  interface AttachedToFruitLeavesDecorator extends AttachedToLeavesDecorator {}
  class AttachedToFruitLeavesDecorator extends AttachedToLeavesDecorator {
    static readonly CODEC: MapCodec;
    constructor(probability: number, exclusionRadiusXZ: number, exclusionRadiusY: number, leavesBlock: Block, blockProvider: BlockStateProvider, requiredEmptyBlocks: number, directions: Direction[]);
    place(context: Context): void;
  }


  interface AttachedToLogsDecorator extends TreeDecorator {}
  class AttachedToLogsDecorator extends TreeDecorator {
    static readonly CODEC: MapCodec;
    constructor(probability: number, exclusionRadiusXZ: number, exclusionRadiusY: number, blockProvider: BlockStateProvider, requiredEmptyBlocks: number, directions: Direction[]);
    place(pContext: Context): void;
  }


  interface TYGLeavesVineDecorator extends TreeDecorator {}
  class TYGLeavesVineDecorator extends TreeDecorator {
    static readonly CODEC: MapCodec;
    constructor(vineBlock: VineBlock, probability: number);
    place(context: Context): void;
    placeVine(context: Context, blockPos: BlockPos, booleanProperty: BooleanProperty): void;
  }


  class TYGTreeDecoratorTypes {
    static readonly TRUNK_VINE: Supplier;
    static readonly LEAVE_VINE: Supplier;
    static readonly ATTACHED_TO_LOGS: Supplier;
    static readonly ATTACHED_TO_FRUIT_LEAVES: Supplier;
    static register(): void;
  }


  interface TYGTrunkVineDecorator extends TreeDecorator {}
  class TYGTrunkVineDecorator extends TreeDecorator {
    static readonly CODEC: MapCodec;
    constructor(vineBlock: VineBlock, probability: number);
    place(context: Context): void;
    placeVine(context: Context, blockPos: BlockPos, booleanProperty: BooleanProperty): void;
  }

}

declare module 'dev.corgitaco.ohthetreesyoullgrow.world.level.levelgen.feature.configurations.TreeFromStructureNBTConfig' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IntProvider } from 'net.minecraft.util.valueproviders';
  import { BlockStateProvider } from 'net.minecraft.world.level.levelgen.feature.stateproviders';
  import { Set, List } from 'java.util';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockPredicate } from 'net.minecraft.world.level.levelgen.blockpredicates';
  import { TreeDecorator } from 'net.minecraft.world.level.levelgen.feature.treedecorators';
  import { TreeFromStructureNBTConfig } from 'dev.corgitaco.ohthetreesyoullgrow.world.level.levelgen.feature.configurations';

  class Builder {
    baseLocation(baseLocation: ResourceLocation): Builder;
    build(): TreeFromStructureNBTConfig;
    canopyLocation(canopyLocation: ResourceLocation): Builder;
    growableOn(growableOn: BlockPredicate): Builder;
    height(height: IntProvider): Builder;
    isSapling(isSapling: boolean): Builder;
    leavesPlacementFilter(leavesPlacementFilter: BlockPredicate): Builder;
    leavesProvider(leavesProvider: BlockStateProvider): Builder;
    leavesTarget(leavesTarget: Set<Block>): Builder;
    logProvider(logProvider: BlockStateProvider): Builder;
    logTarget(logTarget: Set<Block>): Builder;
    maxLogDepth(maxLogDepth: number): Builder;
    placeFromNBT(placeFromNBT: Set<Block>): Builder;
    treeDecorators(treeDecorators: TreeDecorator[]): Builder;
  }

}

declare module 'dev.corgitaco.ohthetreesyoullgrow.world.level.levelgen.feature' {
  import { Feature, FeaturePlaceContext } from 'net.minecraft.world.level.levelgen.feature';
  import { TreeFromStructureNBTConfig } from 'dev.corgitaco.ohthetreesyoullgrow.world.level.levelgen.feature.configurations';
  import { Codec } from 'com.mojang.serialization';
  import { WorldGenLevel } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { StructurePlaceSettings } from 'net.minecraft.world.level.levelgen.structure.templatesystem';
  import { Palette, StructureBlockInfo } from 'StructureTemplate';
  import { BlockStateProvider } from 'net.minecraft.world.level.levelgen.feature.stateproviders';
  import { RandomSource } from 'net.minecraft.util';
  import { List, Map, Set } from 'java.util';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Iterable, IllegalArgumentException } from 'java.lang';
  import { TreeDecorator } from 'net.minecraft.world.level.levelgen.feature.treedecorators';
  import { BlockPredicate } from 'net.minecraft.world.level.levelgen.blockpredicates';
  import { Rotation, Block } from 'net.minecraft.world.level.block';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Supplier } from 'java.util.function';

  interface TreeFromStructureNBTFeature extends Feature<TreeFromStructureNBTConfig> {}
  class TreeFromStructureNBTFeature extends Feature<TreeFromStructureNBTConfig> {
    constructor($$0: Codec<TreeFromStructureNBTConfig>);
    static fillCanopyPositions(logProvider: BlockStateProvider, leavesProvider: BlockStateProvider, config: TreeFromStructureNBTConfig, level: WorldGenLevel, randomSource: RandomSource, origin: BlockPos, placeSettings: StructurePlaceSettings, randomCanopyPalette: Palette, leavePositions: Map<BlockPos, BlockState>, trunkPositions: Map<BlockPos, BlockState>, trunkLength: number): boolean;
    static fillLogsUnder(logProvider: BlockStateProvider, level: WorldGenLevel, random: RandomSource, origin: BlockPos, placeSettings: StructurePlaceSettings, centerOffset: BlockPos, logBuilders: StructureBlockInfo[], maxTrunkBuildingDepth: number, groundFilter: BlockPredicate, trunkPositions: Map<BlockPos, BlockState>): void;
    static fillTrunkPositions(logProvider: BlockStateProvider, leavesProvider: BlockStateProvider, config: TreeFromStructureNBTConfig, level: WorldGenLevel, randomSource: RandomSource, origin: BlockPos, placeSettings: StructurePlaceSettings, trunkBasePalette: Palette, centerOffset: BlockPos, logs: StructureBlockInfo[], logBuilders: StructureBlockInfo[], leavePositions: Map<BlockPos, BlockState>, trunkPositions: Map<BlockPos, BlockState>, maxTrunkBuildingDepth: number): void;
    static getModifiedPos(settings: StructurePlaceSettings, placing: StructureBlockInfo, partCenter: BlockPos, featureOrigin: BlockPos): BlockPos;
    static getStructureInfosInStructurePalletteFromBlockList(blocks: Iterable<Block>, palette: Palette): StructureBlockInfo[];
    static getTransformedState(modifiedPos: BlockPos, state: BlockState, nbtState: BlockState, rotation: Rotation, level: WorldGenLevel): BlockState;
    static intersectTrunk(logProvider: BlockStateProvider, level: WorldGenLevel, random: RandomSource, origin: BlockPos, placeSettings: StructurePlaceSettings, centerOffset: BlockPos, logBuilders: StructureBlockInfo[], maxTrunkBuildingDepth: number, trunkPositions: Map<BlockPos, BlockState>): boolean;
    static isOnGround(maxLogDepth: number, level: WorldGenLevel, pos: BlockPos, growableOn: BlockPredicate): boolean;
    static noTreePartPresent(location: ResourceLocation): IllegalArgumentException;
    place(featurePlaceContext: FeaturePlaceContext<TreeFromStructureNBTConfig>): boolean;
    static placeAdditional(config: TreeFromStructureNBTConfig, level: WorldGenLevel, origin: BlockPos, placeSettings: StructurePlaceSettings, palette: Palette, centerOffset: BlockPos): void;
    static placeLeavesWithCalculatedDistanceAndRotation(leavesProvider: BlockStateProvider, level: WorldGenLevel, origin: BlockPos, random: RandomSource, placeSettings: StructurePlaceSettings, leaves: StructureBlockInfo[], leavePositions: Map<BlockPos, BlockState>, canopyCenterOffset: BlockPos, leavesPlacementFilter: BlockPredicate): void;
    static placeLogsWithRotation(logProvider: BlockStateProvider, level: WorldGenLevel, random: RandomSource, origin: BlockPos, placeSettings: StructurePlaceSettings, centerOffset: BlockPos, logs: StructureBlockInfo[], trunkPositions: Map<BlockPos, BlockState>): void;
    static placeTreeDecorations(treeDecorators: Iterable<TreeDecorator>, level: WorldGenLevel, random: RandomSource, leavePositions: Set<BlockPos>, trunkPositions: Set<BlockPos>, decorationPositions: Set<BlockPos>): void;
  }


  class TYGFeatures {
    static readonly TREE_FROM_NBT_V1: Supplier;
    static register(): void;
  }

}