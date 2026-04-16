declare module 'terrablender.mixin' {
  import { BiomeResolver, Biome, MultiNoiseBiomeSource, MultiNoiseBiomeSourceParameterList } from 'net.minecraft.world.level.biome';
  import { IExtendedBiomeSource, IExtendedMultiNoiseBiomeSource, IExtendedNoiseGeneratorSettings, IExtendedParameterList, IExtendedTheEndBiomeSource } from 'terrablender.worldgen';
  import { Supplier } from 'java.util.function';
  import { List } from 'java.util';
  import { Holder, BlockPos, RegistryAccess } from 'net.minecraft.core';
  import { CallbackInfo, CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { ParameterList, Sampler, TargetPoint, RTree } from 'Climate';
  import { RuleCategory } from 'terrablender.api.SurfaceRuleManager';
  import { RegionType, Region } from 'terrablender.api';
  import { Either } from 'com.mojang.datafixers.util';

  interface MixinBiomeSource extends BiomeResolver, IExtendedBiomeSource {}
  class MixinBiomeSource extends BiomeResolver {
    possibleBiomes: Supplier;
    appendDeferredBiomesList(biomesToAppend: Holder<Biome>[]): void;
  }


  class MixinBuiltInRegistries {
  }


  class MixinChunkGenerator {
    validate(ci: CallbackInfo): void;
  }


  interface MixinMultiNoiseBiomeSource extends IExtendedMultiNoiseBiomeSource {}
  class MixinMultiNoiseBiomeSource extends IExtendedMultiNoiseBiomeSource {
    addDebugInfo(debugLines: string[], pos: BlockPos, sampler: Sampler, ci: CallbackInfo): void;
    clone(): MultiNoiseBiomeSource;
    getNoiseBiome(x: number, y: number, z: number, sampler: Sampler, cir: CallbackInfoReturnable<Holder<Biome>>): void;
    parameters(): ParameterList<Holder<Biome>>;
  }


  class MixinNoiseBasedChunkGenerator {
  }


  interface MixinNoiseGeneratorSettings extends IExtendedNoiseGeneratorSettings {}
  class MixinNoiseGeneratorSettings extends IExtendedNoiseGeneratorSettings {
    setRuleCategory(ruleCategory: RuleCategory): void;
  }


  interface MixinParameterList<T = any> extends IExtendedParameterList<T> {}
  class MixinParameterList<T = any> extends IExtendedParameterList<T> {
    clone(): ParameterList<T>;
    findValue(var1: TargetPoint): T;
    findValuePositional(target: TargetPoint, x: number, y: number, z: number): T;
    get treeCount(): number;
    getRegion(uniqueness: number): Region;
    getTree(uniqueness: number): RTree;
    getUniqueness(x: number, y: number, z: number): number;
    initializeForTerraBlender(registryAccess: RegistryAccess, regionType: RegionType, seed: number): void;
    isInitialized(): boolean;
    recreateUniqueness(): void;
  }


  class MixinPrimaryLevelData {
  }


  interface MixinTheEndBiomeSource extends IExtendedTheEndBiomeSource {}
  class MixinTheEndBiomeSource extends IExtendedTheEndBiomeSource {
    initializeForTerraBlender(registryAccess: RegistryAccess, seed: number): void;
    onGetNoiseBiome(x: number, y: number, z: number, sampler: Sampler, cir: CallbackInfoReturnable<Holder<Biome>>): void;
  }


  class MixinWorldOpenFlows {
  }


  class MultiNoiseBiomeSourceAccess {
    get parameters(): Either<ParameterList<Holder<Biome>>, Holder<MultiNoiseBiomeSourceParameterList>>;
    set parameters(var1: Either<ParameterList<Holder<Biome>>, Holder<MultiNoiseBiomeSourceParameterList>>);
  }

}