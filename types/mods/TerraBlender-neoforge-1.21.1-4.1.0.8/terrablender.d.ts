declare module 'terrablender' {
  import { TagKey } from 'net.minecraft.tags';

  class DimensionTypeTags {
    static readonly OVERWORLD_REGIONS: TagKey;
    static readonly NETHER_REGIONS: TagKey;
    static init(): void;
  }

}