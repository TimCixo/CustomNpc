declare module 'com.logisticscraft.occlusionculling.cache' {
  interface ArrayOcclusionCache extends OcclusionCache {}
  class ArrayOcclusionCache extends OcclusionCache {
    constructor(reach: number);
    getState(x: number, y: number, z: number): number;
    resetCache(): void;
    setHidden(x: number, y: number, z: number): void;
    setLastHidden(): void;
    setLastVisible(): void;
    setVisible(x: number, y: number, z: number): void;
  }


  class OcclusionCache {
    getState(var1: number, var2: number, var3: number): number;
    resetCache(): void;
    setHidden(var1: number, var2: number, var3: number): void;
    setLastHidden(): void;
    setLastVisible(): void;
    setVisible(var1: number, var2: number, var3: number): void;
  }

}

declare module 'com.logisticscraft.occlusionculling' {
  import { Vec3d } from 'com.logisticscraft.occlusionculling.util';
  import { OcclusionCache } from 'com.logisticscraft.occlusionculling.cache';

  class DataProvider {
    checkingPosition(targetPoints: Vec3d[], size: number, viewerPosition: Vec3d): void;
    cleanup(): void;
    isOpaqueFullCube(var1: number, var2: number, var3: number): boolean;
    prepareChunk(var1: number, var2: number): boolean;
  }


  class OcclusionCullingInstance {
    constructor(maxDistance: number, provider: DataProvider);

    constructor(maxDistance: number, provider: DataProvider, cache: OcclusionCache, aabbExpansion: number);
    isAABBVisible(aabbMin: Vec3d, aabbMax: Vec3d, viewerPosition: Vec3d): boolean;
    resetCache(): void;
  }

}

declare module 'com.logisticscraft.occlusionculling.util' {
  class MathUtilities {
    static ceil(d: number): number;
    static fastFloor(d: number): number;
    static floor(d: number): number;
  }


  class Vec3d {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);
    div(rayDir: Vec3d): Vec3d;
    equals(other: any): boolean;
    get x(): number;
    get y(): number;
    get z(): number;
    hashCode(): number;
    normalize(): Vec3d;
    set(x: number, y: number, z: number): void;
    setAdd(vec: Vec3d, x: number, y: number, z: number): void;
    toString(): string;
  }

}