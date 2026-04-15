declare module 'terrablender.worldgen' {
  import { Region, RegionType } from 'terrablender.api';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Registry, Holder, RegistryAccess } from 'net.minecraft.core';
  import { Biome, MultiNoiseBiomeSource } from 'net.minecraft.world.level.biome';
  import { Consumer } from 'java.util.function';
  import { Pair } from 'com.mojang.datafixers.util';
  import { ParameterPoint, TargetPoint, RTree, ParameterList } from 'Climate';
  import { List } from 'java.util';
  import { Cloneable } from 'java.lang';
  import { RuleCategory } from 'terrablender.api.SurfaceRuleManager';
  import { RuleSource } from 'SurfaceRules';

  interface DefaultNetherRegion extends Region {}
  class DefaultNetherRegion extends Region {
    static readonly LOCATION: ResourceLocation;
    constructor(weight: number);
    addBiomes(registry: Registry<Biome>, mapper: Consumer<Pair<ParameterPoint, ResourceKey<Biome>>>): void;
  }


  interface DefaultOverworldRegion extends Region {}
  class DefaultOverworldRegion extends Region {
    static readonly LOCATION: ResourceLocation;
    constructor(weight: number);
    addBiomes(registry: Registry<Biome>, mapper: Consumer<Pair<ParameterPoint, ResourceKey<Biome>>>): void;
  }


  class IExtendedBiomeSource {
    appendDeferredBiomesList(var1: Holder<Biome>[]): void;
  }


  interface IExtendedMultiNoiseBiomeSource extends Cloneable {}
  class IExtendedMultiNoiseBiomeSource extends Cloneable {
    clone(): MultiNoiseBiomeSource;
  }


  class IExtendedNoiseGeneratorSettings {
    setRuleCategory(var1: RuleCategory): void;
  }


  interface IExtendedParameterList<T = any> extends Cloneable {}
  class IExtendedParameterList<T = any> extends Cloneable {
    clone(): ParameterList<T>;
    findValuePositional(var1: TargetPoint, var2: number, var3: number, var4: number): T;
    get treeCount(): number;
    getRegion(var1: number): Region;
    getTree(var1: number): RTree;
    getUniqueness(var1: number, var2: number, var3: number): number;
    initializeForTerraBlender(var1: RegistryAccess, var2: RegionType, var3: number): void;
    isInitialized(): boolean;
    recreateUniqueness(): void;
  }


  class IExtendedTheEndBiomeSource {
    initializeForTerraBlender(var1: RegistryAccess, var2: number): void;
  }


  class RegionUtils {
    static getVanillaParameterPoints(biome: ResourceKey<Biome>): ParameterPoint[];
  }


  class TBSurfaceRuleData {
    static air(): RuleSource;
    static end(): RuleSource;
    static nether(): RuleSource;
    static overworld(): RuleSource;
    static overworldLike(checkAbovePreliminarySurface: boolean, bedrockRoof: boolean, bedrockFloor: boolean): RuleSource;
  }

}

declare module 'terrablender.worldgen.noise' {
  import { RegistryAccess } from 'net.minecraft.core';
  import { List } from 'java.util';
  import { Wrapper } from 'WeightedEntry';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { RegionType } from 'terrablender.api';
  import { LongFunction } from 'java.util.function';
  import { Enum } from 'java.lang';

  class Area {
    constructor(operator: PixelTransformer, size: number);
    get(x: number, z: number): number;
    get maxCache(): number;
  }


  class AreaContext {
    constructor(maxCache: number, worldSeed: number, seedModifier: number);
    createResult(transformer: PixelTransformer): Area;
    createResult(p_76541_: PixelTransformer, p_76542_: Area): Area;
    createResult(transformer: PixelTransformer, p_76545_: Area, p_76546_: Area): Area;
    initRandom(x: number, y: number): void;
    nextRandom(bound: number): number;
    random(a: number, b: number): number;
    random(a: number, b: number, c: number, d: number): number;
  }


  class AreaFactory {
    make(): Area;
  }


  class AreaTransformer0 {
    apply(var1: AreaContext, var2: number, var3: number): number;
    run(context: AreaContext): AreaFactory;
  }


  class AreaTransformer1 {
    apply(var1: AreaContext, var2: Area, var3: number, var4: number): number;
    run(context: AreaContext, areaFactory: AreaFactory): AreaFactory;
  }


  interface BiomeInitialLayer extends WeightedRandomLayer<Wrapper> {}
  class BiomeInitialLayer extends WeightedRandomLayer<Wrapper> {
    constructor(registryAccess: RegistryAccess, entries: Wrapper<ResourceKey<Biome>>[]);
  }


  interface InitialLayer extends WeightedRandomLayer<Wrapper> {}
  class InitialLayer extends WeightedRandomLayer<Wrapper> {
    constructor(registryAccess: RegistryAccess, regionType: RegionType);
  }


  class LayeredNoiseUtil {
    static biomeArea(registryAccess: RegistryAccess, seed: number, size: number, entries: Wrapper<ResourceKey<Biome>>[]): Area;
    static createZoomedArea(seed: number, zooms: number, initialTransformer: AreaTransformer0): Area;
    static finalUniqueness(regionType: RegionType, seed: number, initialLayer: InitialLayer): Area;
    static initialUniqueness(registryAccess: RegistryAccess, regionType: RegionType): InitialLayer;
    static uniqueness(registryAccess: RegistryAccess, regionType: RegionType, seed: number): Area;
    static zoom(seedModifier: number, transformer: AreaTransformer1, initialAreaFactory: AreaFactory, times: number, contextFactory: LongFunction<AreaContext>): AreaFactory;
  }


  class PixelTransformer {
    apply(var1: number, var2: number): number;
  }


  interface WeightedRandomLayer<T extends WeightedEntry = any> extends AreaTransformer0 {}
  class WeightedRandomLayer<T extends WeightedEntry = any> extends AreaTransformer0 {
    constructor(entries: T[]);
    apply(context: AreaContext, x: number, y: number): number;
  }


  interface ZoomLayer extends Enum<ZoomLayer> {}
  class ZoomLayer extends Enum<ZoomLayer> {
    static readonly NORMAL: ZoomLayer;
    static readonly FUZZY: ZoomLayer;
    apply(context: AreaContext, area: Area, x: number, y: number): number;
    getParentX(x: number): number;
    getParentY(y: number): number;
    static valueOf(name: string): ZoomLayer;
    static values(): ZoomLayer[];
  }

}