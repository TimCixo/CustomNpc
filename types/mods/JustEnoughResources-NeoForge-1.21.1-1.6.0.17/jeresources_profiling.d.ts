declare module 'jeresources.profiling' {
  import { Runnable, Integer, Float } from 'java.lang';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Level } from 'net.minecraft.world.level';
  import { List, Map } from 'java.util';
  import { ChunkAccess, EmptyLevelChunk } from 'net.minecraft.world.level.chunk';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Entity } from 'net.minecraft.world.entity';
  import { MapItemSavedData, MapId } from 'net.minecraft.world.level.saveddata.maps';
  import { RecipeManager } from 'net.minecraft.world.item.crafting';
  import { Player } from 'net.minecraft.world.entity.player';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack, CommandSource } from 'net.minecraft.commands';
  import { ConcurrentMap } from 'java.util.concurrent';
  import { File } from 'java.io';

  interface ChunkGetter extends Runnable {}
  class ChunkGetter extends Runnable {
    static readonly CHUNKS_PER_RUN: number;
    constructor(chunkCount: number, level: ServerLevel, executor: ProfilingExecutor);
    run(): void;
    run(): void;
  }


  interface ChunkProfiler extends Runnable {}
  class ChunkProfiler extends Runnable {
    static readonly CHUNK_SIZE: number;
    static readonly CHUNK_HEIGHT: number;
    constructor(level: ServerLevel, dimensionKey: ResourceKey<Level>, chunks: ChunkAccess[], dimensionData: ProfiledDimensionData, timer: ProfilingTimer, blacklist: ProfilingBlacklist);
    static getDrops(level: ServerLevel, pos: BlockPos, state: BlockState): Map<string, Map<number, number>>;
    run(): void;
  }


  interface DummyWorld extends ServerLevel {}
  class DummyWorld extends ServerLevel {
    spawnedEntities: List;
    constructor(level: ServerLevel);
    addFreshEntity(entity: Entity): boolean;
    clearChunks(): void;
    destroyBlockProgress(breakerId: number, pos: BlockPos, progress: number): void;
    get freeMapId(): MapId;
    get recipeManager(): RecipeManager;
    getEntity(id: number): Entity;
    getMapData(mapId: MapId): MapItemSavedData;
    levelEvent(player: Player, type: number, pos: BlockPos, data: number): void;
    playSound(player: Player, x: number, y: number, z: number, soundIn: SoundEvent, source: SoundSource, volume: number, pitch: number): void;
    playSound(p_217384_1_: Player, p_217384_2_: Entity, p_217384_3_: SoundEvent, p_217384_4_: SoundSource, p_217384_5_: number, p_217384_6_: number): void;
    sendBlockUpdated(pos: BlockPos, oldState: BlockState, newState: BlockState, flags: number): void;
    setBlock(pos: BlockPos, newState: BlockState, flags: number): boolean;
    setBlockAndUpdate(pos: BlockPos, state: BlockState): boolean;
    setMapData(mapId: MapId, mapData: MapItemSavedData): void;
  }


  interface EmptyChunkJER extends EmptyLevelChunk {}
  class EmptyChunkJER extends EmptyLevelChunk {
    constructor(level: ServerLevel, x: number, z: number);
    setBlockState(pos: BlockPos, state: BlockState, isMoving: boolean): BlockState;
  }


  class ProfileCommand {
    static register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }


  class ProfiledDimensionData {
    readonly distributionMap: ConcurrentMap;
    readonly silkTouchMap: ConcurrentMap;
    readonly dropsMap: ConcurrentMap;
  }


  interface Profiler extends Runnable {}
  class Profiler extends Runnable {
    get allDimensionData(): ConcurrentMap<ResourceKey<Level>, ProfiledDimensionData>;
    get blacklist(): ProfilingBlacklist;
    get timer(): ProfilingTimer;
    static init(sender: Entity, chunks: number, allWorlds: boolean): boolean;
    run(): void;
    static stop(sender: Entity): boolean;
  }


  class ProfilingBlacklist {
    constructor();
    contains(blockState: BlockState): boolean;
    static get scanBlacklistFile(): File;
  }


  class ProfilingExecutor {
    constructor(profiler: Profiler);
    addChunkProfiler(level: ServerLevel, chunks: ChunkAccess[]): void;
    awaitTermination(): void;
    execute(runnable: Runnable): void;
    shutdown(): void;
    shutdownNow(): void;
  }


  class ProfilingTimer {
    constructor(sender: CommandSource, chunkCount: number);
    complete(): void;
    endChunk(worldRegistryKey: ResourceKey<Level>): void;
    getBlocksPerLayer(worldRegistryKey: ResourceKey<Level>): number;
    isCompleted(): boolean;
    startChunk(worldRegistryKey: ResourceKey<Level>): void;
  }

}