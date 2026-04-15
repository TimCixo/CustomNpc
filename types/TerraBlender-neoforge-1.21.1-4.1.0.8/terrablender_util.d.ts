declare module 'terrablender.util' {
  import { MinecraftServer } from 'net.minecraft.server';
  import { ChunkGenerator } from 'net.minecraft.world.level.chunk';
  import { BiomeSource } from 'net.minecraft.world.level.biome';
  import { RegionType } from 'terrablender.api';
  import { Holder, RegistryAccess } from 'net.minecraft.core';
  import { DimensionType, LevelStem } from 'net.minecraft.world.level.dimension';
  import { ResourceKey } from 'net.minecraft.resources';
  import { WeightedEntry } from 'net.minecraft.util.random';
  import { List, Optional } from 'java.util';
  import { AreaContext } from 'terrablender.worldgen.noise';

  class LevelUtils {
    static getRegionTypeForDimension(dimensionType: Holder<DimensionType>): RegionType;
    static initializeBiomes(registryAccess: RegistryAccess, dimensionType: Holder<DimensionType>, levelResourceKey: ResourceKey<LevelStem>, chunkGenerator: ChunkGenerator, seed: number): void;
    static initializeOnServerStart(server: MinecraftServer): void;
    static shouldApplyToBiomeSource(biomeSource: BiomeSource): boolean;
    static shouldApplyToChunkGenerator(chunkGenerator: ChunkGenerator): boolean;
  }


  class WeightedRandomList<E extends WeightedEntry = any> {
    static create<E extends WeightedEntry>(): WeightedRandomList<E>;
    static create<E extends WeightedEntry>(...entries: E[]): WeightedRandomList<E>;
    static create<E extends WeightedEntry>(entries: E[]): WeightedRandomList<E>;
    getRandom(context: AreaContext): Optional<E>;
  }

}