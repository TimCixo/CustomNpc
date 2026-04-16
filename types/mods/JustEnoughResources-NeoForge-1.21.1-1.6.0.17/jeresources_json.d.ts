declare module 'jeresources.json' {
  import { Map } from 'java.util';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Level } from 'net.minecraft.world.level';
  import { DimensionData } from 'jeresources.json.ProfilingAdapter';
  import { File } from 'java.io';

  class ProfilingAdapter {
    static write(allDimensionData: Map<ResourceKey<Level>, DimensionData>): void;
  }


  class WorldGenAdapter {
    static get worldGenFile(): File;
    static hasWorldGenDIYData(): boolean;
    static readDIYData(): boolean;
  }

}

declare module 'jeresources.json.ProfilingAdapter' {
  import { Map } from 'java.util';

  class DimensionData {
    distribution: Map;
    silkTouchMap: Map;
    dropsMap: Map;
  }

}