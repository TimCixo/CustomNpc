declare module 'terrablender.api' {
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { Biome, OverworldBiomeBuilder } from 'net.minecraft.world.level.biome';
  import { List } from 'java.util';
  import { Wrapper } from 'WeightedEntry';
  import { ParameterPoint, Parameter } from 'Climate';
  import { Pair } from 'com.mojang.datafixers.util';
  import { Registry } from 'net.minecraft.core';
  import { Consumer } from 'java.util.function';
  import { Enum } from 'java.lang';
  import { RuleCategory, RuleStage } from 'terrablender.api.SurfaceRuleManager';
  import { RuleSource } from 'SurfaceRules';

  class EndBiomeRegistry {
    static get edgeBiomes(): Wrapper<ResourceKey<Biome>>[];
    static get highlandsBiomes(): Wrapper<ResourceKey<Biome>>[];
    static get islandBiomes(): Wrapper<ResourceKey<Biome>>[];
    static get midlandsBiomes(): Wrapper<ResourceKey<Biome>>[];
    static registerEdgeBiome(biome: ResourceKey<Biome>, weight: number): void;
    static registerHighlandsBiome(biome: ResourceKey<Biome>, weight: number): void;
    static registerIslandBiome(biome: ResourceKey<Biome>, weight: number): void;
    static registerMidlandsBiome(biome: ResourceKey<Biome>, weight: number): void;
  }


  class ModifiedVanillaOverworldBuilder {
    build(): Pair<ParameterPoint, ResourceKey<Biome>>[];
    removeParameter(parameter: ParameterPoint): void;
    replaceBiome(original: ResourceKey<Biome>, replacement: ResourceKey<Biome>): void;
    replaceBiome(point: ParameterPoint, biome: ResourceKey<Biome>): void;
    replaceParameter(original: ParameterPoint, replacement: ParameterPoint): void;
  }


  class ParameterUtils {
  }


  class Region {
    static readonly DEFERRED_PLACEHOLDER: ResourceKey;
    constructor(name: ResourceLocation, type: RegionType, weight: number);
    addBiomes(registry: Registry<Biome>, mapper: Consumer<Pair<ParameterPoint, ResourceKey<Biome>>>): void;
    get name(): ResourceLocation;
    get type(): RegionType;
    get weight(): number;
  }


  class Regions {
    static get(type: RegionType): Region[];
    static getCount(type: RegionType): number;
    static getIndex(type: RegionType, location: ResourceLocation): number;
    static register(name: ResourceLocation, region: Region): void;
    static register(name: ResourceLocation, index: number, region: Region): void;
    static register(region: Region): void;
    static remove(type: RegionType, name: ResourceLocation): void;
  }


  interface RegionType extends Enum<RegionType> {}
  class RegionType extends Enum<RegionType> {
    static readonly OVERWORLD: RegionType;
    static readonly NETHER: RegionType;
    static valueOf(name: string): RegionType;
    static values(): RegionType[];
  }


  class SurfaceRuleManager {
    static addSurfaceRules(category: RuleCategory, namespace: string, rules: RuleSource): void;
    static addToDefaultSurfaceRulesAtStage(category: RuleCategory, ruleStage: RuleStage, priority: number, rules: RuleSource): void;
    static getDefaultSurfaceRuleAdditionsForStage(category: RuleCategory, ruleStage: RuleStage): RuleSource[];
    static getDefaultSurfaceRules(category: RuleCategory): RuleSource;
    static getNamespacedRules(category: RuleCategory, fallback: RuleSource): RuleSource;
    static removeSurfaceRules(category: RuleCategory, namespace: string): void;
    static setDefaultSurfaceRules(category: RuleCategory, rules: RuleSource): void;
  }


  interface TerrablenderOverworldBiomeBuilder extends OverworldBiomeBuilder {}
  class TerrablenderOverworldBiomeBuilder extends OverworldBiomeBuilder {
    constructor(oceans: ResourceKey<Biome>, middleBiomes: ResourceKey<Biome>, middleBiomesVariant: ResourceKey<Biome>, plateauBiomes: ResourceKey<Biome>, plateauBiomesVariant: ResourceKey<Biome>, shatteredBiomes: ResourceKey<Biome>, beachBiomes: ResourceKey<Biome>, peakBiomes: ResourceKey<Biome>, peakBiomesVariant: ResourceKey<Biome>, slopeBiomes: ResourceKey<Biome>, slopeBiomesVariant: ResourceKey<Biome>);
    pickBeachBiome(temp: number, humidity: number): ResourceKey<Biome>;
    pickPeakBiome(temp: number, humidity: number, weirdness: Parameter): ResourceKey<Biome>;
    pickSlopeBiome(temp: number, humidity: number, weirdness: Parameter): ResourceKey<Biome>;
  }


  class VanillaParameterOverlayBuilder {
    add(point: ParameterPoint, biome: ResourceKey<Biome>): void;
    build(): Pair<ParameterPoint, ResourceKey<Biome>>[];
  }

}

declare module 'terrablender.api.ParameterUtils' {
  import { Enum, Float, Long } from 'java.lang';
  import { Parameter, ParameterPoint } from 'Climate';
  import { List } from 'java.util';

  interface Weirdness extends Enum<Weirdness> {}
  class Weirdness extends Enum<Weirdness> {
    static readonly MID_SLICE_NORMAL_ASCENDING: Weirdness;
    static readonly HIGH_SLICE_NORMAL_ASCENDING: Weirdness;
    static readonly PEAK_NORMAL: Weirdness;
    static readonly HIGH_SLICE_NORMAL_DESCENDING: Weirdness;
    static readonly MID_SLICE_NORMAL_DESCENDING: Weirdness;
    static readonly LOW_SLICE_NORMAL_DESCENDING: Weirdness;
    static readonly VALLEY: Weirdness;
    static readonly LOW_SLICE_VARIANT_ASCENDING: Weirdness;
    static readonly MID_SLICE_VARIANT_ASCENDING: Weirdness;
    static readonly HIGH_SLICE_VARIANT_ASCENDING: Weirdness;
    static readonly PEAK_VARIANT: Weirdness;
    static readonly HIGH_SLICE_VARIANT_DESCENDING: Weirdness;
    static readonly MID_SLICE_VARIANT_DESCENDING: Weirdness;
    static readonly FULL_RANGE: Weirdness;
    parameter(): Parameter;
    static span(min: Weirdness, max: Weirdness): Parameter;
    static valueOf(name: string): Weirdness;
    static values(): Weirdness[];
  }


  interface Depth extends Enum<Depth> {}
  class Depth extends Enum<Depth> {
    static readonly SURFACE: Depth;
    static readonly UNDERGROUND: Depth;
    static readonly FLOOR: Depth;
    static readonly FULL_RANGE: Depth;
    parameter(): Parameter;
    static span(min: Depth, max: Depth): Parameter;
    static valueOf(name: string): Depth;
    static values(): Depth[];
  }


  interface Erosion extends Enum<Erosion> {}
  class Erosion extends Enum<Erosion> {
    static readonly EROSION_0: Erosion;
    static readonly EROSION_1: Erosion;
    static readonly EROSION_2: Erosion;
    static readonly EROSION_3: Erosion;
    static readonly EROSION_4: Erosion;
    static readonly EROSION_5: Erosion;
    static readonly EROSION_6: Erosion;
    static readonly FULL_RANGE: Erosion;
    parameter(): Parameter;
    static span(min: Erosion, max: Erosion): Parameter;
    static valueOf(name: string): Erosion;
    static values(): Erosion[];
  }


  interface Continentalness extends Enum<Continentalness> {}
  class Continentalness extends Enum<Continentalness> {
    static readonly MUSHROOM_FIELDS: Continentalness;
    static readonly DEEP_OCEAN: Continentalness;
    static readonly OCEAN: Continentalness;
    static readonly COAST: Continentalness;
    static readonly NEAR_INLAND: Continentalness;
    static readonly MID_INLAND: Continentalness;
    static readonly FAR_INLAND: Continentalness;
    static readonly INLAND: Continentalness;
    static readonly FULL_RANGE: Continentalness;
    parameter(): Parameter;
    static span(min: Continentalness, max: Continentalness): Parameter;
    static valueOf(name: string): Continentalness;
    static values(): Continentalness[];
  }


  interface Humidity extends Enum<Humidity> {}
  class Humidity extends Enum<Humidity> {
    static readonly ARID: Humidity;
    static readonly DRY: Humidity;
    static readonly NEUTRAL: Humidity;
    static readonly WET: Humidity;
    static readonly HUMID: Humidity;
    static readonly FULL_RANGE: Humidity;
    parameter(): Parameter;
    static span(min: Humidity, max: Humidity): Parameter;
    static valueOf(name: string): Humidity;
    static values(): Humidity[];
  }


  interface Temperature extends Enum<Temperature> {}
  class Temperature extends Enum<Temperature> {
    static readonly ICY: Temperature;
    static readonly COOL: Temperature;
    static readonly NEUTRAL: Temperature;
    static readonly WARM: Temperature;
    static readonly HOT: Temperature;
    static readonly FROZEN: Temperature;
    static readonly UNFROZEN: Temperature;
    static readonly FULL_RANGE: Temperature;
    parameter(): Parameter;
    static span(min: Temperature, max: Temperature): Parameter;
    static valueOf(name: string): Temperature;
    static values(): Temperature[];
  }


  class ParameterPointListBuilder {
    build(): ParameterPoint[];
    continentalness(...values: Parameter[]): ParameterPointListBuilder;
    continentalness(...values: Continentalness[]): ParameterPointListBuilder;
    depth(...values: Parameter[]): ParameterPointListBuilder;
    depth(...values: Depth[]): ParameterPointListBuilder;
    erosion(...values: Parameter[]): ParameterPointListBuilder;
    erosion(...values: Erosion[]): ParameterPointListBuilder;
    humidity(...values: Parameter[]): ParameterPointListBuilder;
    humidity(...values: Humidity[]): ParameterPointListBuilder;
    offset(...values: number[]): ParameterPointListBuilder;
    offset(...values: Long[]): ParameterPointListBuilder;
    temperature(...values: Parameter[]): ParameterPointListBuilder;
    temperature(...values: Temperature[]): ParameterPointListBuilder;
    weirdness(...values: Parameter[]): ParameterPointListBuilder;
    weirdness(...values: Weirdness[]): ParameterPointListBuilder;
  }

}

declare module 'terrablender.api.SurfaceRuleManager' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface RuleCategory extends Enum<RuleCategory> {}
  class RuleCategory extends Enum<RuleCategory> {
    static readonly OVERWORLD: RuleCategory;
    static readonly NETHER: RuleCategory;
    static readonly END: RuleCategory;
    static valueOf(name: string): RuleCategory;
    static values(): RuleCategory[];
  }


  interface RuleStage extends Enum<RuleStage> {}
  class RuleStage extends Enum<RuleStage> {
    static readonly BEFORE_BEDROCK: RuleStage;
    static readonly AFTER_BEDROCK: RuleStage;
    static valueOf(name: string): RuleStage;
    static values(): RuleStage[];
  }

}