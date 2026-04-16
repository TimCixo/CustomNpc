declare module 'journeymap.client.cartography' {
  import { BaseRenderer } from 'journeymap.client.cartography.render';
  import { RegionCoord } from 'journeymap.client.model.region';
  import { MapType } from 'journeymap.client.model.map';
  import { ChunkMD } from 'journeymap.client.model.chunk';
  import { RegionData } from 'journeymap.common.nbt';
  import { ComparableNativeImage } from 'journeymap.client.texture';
  import { Integer } from 'java.lang';
  import { BlockMD } from 'journeymap.client.model.block';
  import { BlockPos } from 'net.minecraft.core';

  class ChunkRenderController {
    constructor();
    getRenderer(rCoord: RegionCoord, mapType: MapType, chunkMd: ChunkMD): BaseRenderer;
    renderChunk(rCoord: RegionCoord, mapType: MapType, chunkMd: ChunkMD, regionData: RegionData): boolean;
  }


  class IChunkRenderer {
    get ambientColor(): number[];
    render(var1: ComparableNativeImage, var2: RegionData, var3: ChunkMD, var4: number): boolean;
    setStratumColors(var1: Stratum, var2: number, var3: number, var4: boolean, var5: boolean, var6: boolean): void;
  }


  class Strata {
    constructor(name: string, initialPoolSize: number, poolGrowthIncrement: number, underground: boolean);
    get bottomFluidY(): number;
    get bottomY(): number;
    get fluidColor(): number;
    get lightAttenuation(): number;
    get maxLightLevel(): number;
    get renderCaveColor(): number;
    get renderDayColor(): number;
    get renderNightColor(): number;
    get topFluidY(): number;
    get topY(): number;
    isBlocksFound(): boolean;
    isEmpty(): boolean;
    isMapCaveLighting(): boolean;
    isUnderground(): boolean;
    nextUp(renderer: IChunkRenderer, ignoreMiddleFluid: boolean): Stratum;
    push(chunkMd: ChunkMD, blockMD: BlockMD, x: number, y: number, z: number): Stratum;
    push(chunkMd: ChunkMD, blockMD: BlockMD, localX: number, y: number, localZ: number, lightLevel: number): Stratum;
    release(stratum: Stratum): void;
    reset(): void;
    set bottomFluidY(bottomFluidY: number);
    set bottomY(bottomY: number);
    set fluidColor(fluidColor: number);
    set lightAttenuation(lightAttenuation: number);
    set maxLightLevel(maxLightLevel: number);
    set renderCaveColor(renderCaveColor: number);
    set renderDayColor(renderDayColor: number);
    set renderNightColor(renderNightColor: number);
    set topFluidY(topFluidY: number);
    set topY(topY: number);
    setBlocksFound(blocksFound: boolean): void;
    toString(): string;
  }


  class Stratum {
    clear(): void;
    equals(o: any): boolean;
    get blockMD(): BlockMD;
    get blockPos(): BlockPos;
    get caveColor(): number;
    get chunkMd(): ChunkMD;
    get dayColor(): number;
    get lightLevel(): number;
    get lightOpacity(): number;
    get nightColor(): number;
    get worldAmbientLight(): number;
    get worldHasNoSky(): boolean;
    get x(): number;
    get y(): number;
    get z(): number;
    hashCode(): number;
    isFluid(): boolean;
    isUninitialized(): boolean;
    set blockMD(blockMD: BlockMD);
    set caveColor(caveColor: number);
    set chunkMd(chunkMd: ChunkMD);
    set dayColor(dayColor: number);
    set lightLevel(lightLevel: number);
    set lightOpacity(lightOpacity: number);
    set nightColor(nightColor: number);
    set x(x: number);
    set y(y: number);
    set z(z: number);
    setFluid(isFluid: boolean): void;
    toString(): string;
  }

}

declare module 'journeymap.client.cartography.color' {
  import { Comparable, Float, Integer, Enum } from 'java.lang';
  import { Effect } from 'journeymap.client.cartography.color.BiomeColor';
  import { EnumSet, Collection, List, Set, Map } from 'java.util';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { BakedQuad } from 'net.minecraft.client.renderer.block.model';
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { BlockMD, BiomeMD, BlockFlag } from 'journeymap.client.model.block';
  import { Charset } from 'java.nio.charset';
  import { Type } from 'journeymap.client.cartography.color.ColorPalette';
  import { File } from 'java.io';
  import { Color } from 'java.awt';

  interface BiomeColor extends Comparable<BiomeColor> {}
  class BiomeColor extends Comparable<BiomeColor> {
    biome: string;
    grassColor: string;
    fogColor: string;
    foliageColor: string;
    waterColor: string;
    compareTo(that: BiomeColor): number;
    getColor(effect: Effect): string;
  }


  interface BlockStateColor extends Comparable<BlockStateColor> {}
  class BlockStateColor extends Comparable<BlockStateColor> {
    block: string;
    state: string;
    name: string;
    color: string;
    alpha: number;
    flags: EnumSet;
    compareTo(that: BlockStateColor): number;
  }


  class ColoredSprite {
    constructor(sprite: TextureAtlasSprite, color: number);

    constructor(quad: BakedQuad);
    get color(): number;
    get coloredImage(): NativeImage;
    get iconName(): string;
    hasColor(): boolean;
  }


  interface ColorManager extends Enum<ColorManager> {}
  class ColorManager extends Enum<ColorManager> {
    static readonly INSTANCE: ColorManager;
    addNewBiomeColor(biomeMD: BiomeMD): void;
    addNewBlockStateColor(blockMD: BlockMD): void;
    closePalettes(): void;
    ensureCurrent(): void;
    get defaultPalette(): ColorPalette;
    get globalPalette(): ColorPalette;
    static get resourcePackNames(): string;
    get worldPalette(): ColorPalette;
    getAverageColor(sprites: Collection<ColoredSprite>): number[];
    loadPalettes(): void;
    regenerateDefaultPalette(): void;
    savePalettes(): void;
    static valueOf(name: string): ColorManager;
    static values(): ColorManager[];
  }


  class ColorPalette {
    static readonly JSON_FILENAME: string;
    static readonly VARIABLE: string;
    static readonly UTF8: Charset;
    static readonly VERSION: number;
    addBiomeColor(biomeMD: BiomeMD, grassColor: number, fogColor: number, foliageColor: number, waterColor: number): void;
    addBlockStateColor(blockMD: BlockMD, color: number): void;
    applyColor(blockMD: BlockMD): void;
    applyColor(biomeMD: BiomeMD): void;
    biomeCount(): number;
    blockCount(): number;
    clear(): void;
    copyAllFromPalette(other: ColorPalette): void;
    copyBiomeFromPalette(other: ColorPalette, biomeId: string): void;
    copyBlockFromPalette(other: ColorPalette, blockId: string): void;
    copyExistingFromPalette(other: ColorPalette): void;
    copyNonExistingFromPalette(other: ColorPalette): void;
    static create(type: Type): ColorPalette;
    deleteFile(): void;
    get allBiomes(): Set<string>;
    get allBlocks(): Set<string>;
    static get globalColorPalette(): ColorPalette;
    get origin(): File;
    get type(): Type;
    get version(): number;
    static get worldColorPalette(): ColorPalette;
    getAllStates(blockId: string): Map<string, BlockStateColor>;
    getBiomeColor(biomeMD: BiomeMD): BiomeColor;
    getBiomeColor(biomeId: string): BiomeColor;
    getBlockStateColor(blockMD: BlockMD): BlockStateColor;
    getBlockStateColor(blockId: string, blockState: string): BlockStateColor;
    hasBiomeColor(biomeMD: BiomeMD): boolean;
    hasBiomeColors(): boolean;
    hasBiomeId(biomeId: string): boolean;
    hasBlockId(blockId: string): boolean;
    hasBlockStateColor(blockMD: BlockMD): boolean;
    hasBlockStateColors(): boolean;
    hasModdedBlockOrBiome(): boolean;
    isDirty(): boolean;
    removeBiome(biomeId: string): void;
    removeBlock(blockId: string): void;
    setBiomeColor(biomeId: string, grassColor: number, fogColor: number, foliageColor: number, waterColor: number): void;
    setBlockStateColor(blockId: string, blockState: string, color: number, alpha: number, flags: EnumSet<BlockFlag>): void;
    setDirty(): void;
    setVanillaFlags(defaultBlockStateColor: BlockStateColor): void;
    stateCount(): number;
    toString(): string;
    writeToFile(): void;
  }


  class RGB {
    static readonly ALPHA_OPAQUE: number;
    static readonly BLACK_ARGB: number;
    static readonly BLACK_RGB: number;
    static readonly WHITE_ARGB: number;
    static readonly WHITE_RGB: number;
    static readonly GREEN_RGB: number;
    static readonly RED_RGB: number;
    static readonly BLUE_RGB: number;
    static readonly CYAN_RGB: number;
    static readonly GRAY_RGB: number;
    static readonly DARK_GRAY_RGB: number;
    static readonly LIGHT_GRAY_RGB: number;
    static adjustBrightness(rgb: number, factor: number): number;
    static bevelSlope(rgb: number, factor: number): number;
    static blendWith(rgb: number, otherRgb: number, otherAlpha: number): number;
    static clampFloat(value: number): number;
    static clampFloats(rgbFloats: number[], factor: number): number[];
    static clampInt(value: number): number;
    static darkenAmbient(rgb: number, factor: number, ambient: number[]): number;
    static floats(rgb: number): number[];
    static floats(rgb: number, alpha: number): number[];
    static greyScale(rgb: number): number;
    static hexToInt(hexColor: string): number;
    static ints(rgb: number): number[];
    static ints(rgb: number, alpha: number): number[];
    static ints(rgb: number, alpha: number): number[];
    static isBlack(rgb: number): boolean;
    static isWhite(rgb: number): boolean;
    static max(...colors: number[]): number;
    static multiply(rgb: number, multiplier: number): number;
    static randomColor(): number;
    static rgbaToRgb(rgba: number): number;
    static subtract(minuend: number, subtrahend: number): number;
    static tint(rgb: number, rgbTint: number): number;
    static tintRgba(rgba: number, rgbTint: number): number;
    static toArbg(rgbInt: number, alpha: number): number;
    static toArgb(rgbInt: number, alpha: number): number;
    static toClampedInt(value: number): number;
    static toColor(rgb: number): Color;
    static toHexString(rgb: number): string;
    static toHexStringRGBA(rgba: number): string;
    static toInteger(r: number, g: number, b: number): number;
    static toInteger(rgb: number[]): number;
    static toInteger(r: number, g: number, b: number): number;
    static toInteger(rgb: number[]): number;
    static toRgba(rgbInt: number, alpha: number): number;
    static toScaledFloat(value: number): number;
    static toString(rgb: number): string;
  }

}

declare module 'journeymap.client.cartography.color.BiomeColor' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Effect extends Enum<Effect> {}
  class Effect extends Enum<Effect> {
    static readonly GRASS: Effect;
    static readonly FOG: Effect;
    static readonly FOLIAGE: Effect;
    static readonly WATER: Effect;
    get key(): string;
    static valueOf(name: string): Effect;
    static values(): Effect[];
  }

}

declare module 'journeymap.client.cartography.color.ColorPalette' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Type extends Enum<Type> {}
  class Type extends Enum<Type> {
    static readonly Default: Type;
    static readonly Global: Type;
    static readonly World: Type;
    static valueOf(name: string): Type;
    static values(): Type[];
  }

}

declare module 'journeymap.client.cartography.render' {
  import { IChunkRenderer, Stratum } from 'journeymap.client.cartography';
  import { AtomicLong } from 'java.util.concurrent.atomic';
  import { Integer } from 'java.lang';
  import { ChunkMD } from 'journeymap.client.model.chunk';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockCoordIntPair } from 'journeymap.client.model.block';
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { ComparableNativeImage } from 'journeymap.client.texture';
  import { RegionData } from 'journeymap.common.nbt';

  interface BaseRenderer extends IChunkRenderer {}
  class BaseRenderer extends IChunkRenderer {
    static readonly COLOR_BLACK: number;
    static badBlockCount: AtomicLong;
    constructor();
    get ambientColor(): number[];
    getBlockHeight(var1: ChunkMD, var2: BlockPos): number;
    getOffsetChunk(chunkMd: ChunkMD, x: number, z: number, offset: BlockCoordIntPair): ChunkMD;
    paintBadBlock(image: NativeImage, x: number, y: number, z: number): void;
    paintBlackBlock(image: NativeImage, x: number, z: number): number;
    paintBlock(image: NativeImage, x: number, z: number, color: number): number;
    paintClearBlock(image: NativeImage, x: number, z: number): number;
    paintDimOverlay(image: NativeImage, x: number, z: number, alpha: number): void;
    paintDimOverlay(sourceImage: NativeImage, targetImage: NativeImage, x: number, z: number, alpha: number): number;
    paintVoidBlock(image: NativeImage, x: number, z: number): number;
    setStratumColors(stratum: Stratum, lightAttenuation: number, waterColor: number, waterAbove: boolean, underground: boolean, mapCaveLighting: boolean): void;
  }


  interface BiomeRenderer extends IChunkRenderer, SurfaceRenderer {}
  class BiomeRenderer extends IChunkRenderer {
    render(chunkImage: ComparableNativeImage, regionData: RegionData, chunkMd: ChunkMD, vSlice: number): boolean;
    render(dayChunkImage: ComparableNativeImage, nightChunkImage: NativeImage, regionData: RegionData, chunkMd: ChunkMD): boolean;
    render(dayChunkImage: ComparableNativeImage, nightChunkImage: NativeImage, regionData: RegionData, chunkMd: ChunkMD, vSlice: number, cavePrePass: boolean): boolean;
  }


  interface CaveRenderer extends IChunkRenderer, BaseRenderer {}
  class CaveRenderer extends IChunkRenderer {
    constructor(surfaceRenderer: SurfaceRenderer);
    getBlockHeight(chunkMd: ChunkMD, blockPos: BlockPos): number;
    render(chunkImage: ComparableNativeImage, regionData: RegionData, chunkMd: ChunkMD, vSlice: number): boolean;
  }


  interface EndCaveRenderer extends IChunkRenderer, CaveRenderer {}
  class EndCaveRenderer extends IChunkRenderer {
    constructor(endSurfaceRenderer: SurfaceRenderer);
  }


  interface EndSurfaceRenderer extends IChunkRenderer, SurfaceRenderer {}
  class EndSurfaceRenderer extends IChunkRenderer {
  }


  interface NetherCaveRenderer extends IChunkRenderer, CaveRenderer {}
  class NetherCaveRenderer extends IChunkRenderer {
    constructor();
    get ambientColor(): number[];
  }


  interface NetherSurfaceRenderer extends IChunkRenderer, SurfaceRenderer {}
  class NetherSurfaceRenderer extends IChunkRenderer {
  }


  interface SurfaceRenderer extends IChunkRenderer, BaseRenderer {}
  class SurfaceRenderer extends IChunkRenderer {
    constructor();
    getBlockHeight(chunkMd: ChunkMD, blockPos: BlockPos): number;
    getBlockHeight(chunkMd: ChunkMD, localX: number, vSlice: number, localZ: number, sliceMinY: number, sliceMaxY: number): number;
    getSurfaceBlockHeight(chunkMd: ChunkMD, x: number, z: number, offset: BlockCoordIntPair, defaultVal: number): number;
    render(dayChunkImage: ComparableNativeImage, regionData: RegionData, chunkMd: ChunkMD, ignored: number): boolean;
    render(dayChunkImage: ComparableNativeImage, nightChunkImage: NativeImage, regionData: RegionData, chunkMd: ChunkMD): boolean;
    render(dayChunkImage: ComparableNativeImage, nightChunkImage: NativeImage, regionData: RegionData, chunkMd: ChunkMD, vSlice: number, cavePrePass: boolean): boolean;
  }


  interface TopoRenderer extends IChunkRenderer, BaseRenderer {}
  class TopoRenderer extends IChunkRenderer {
    constructor();
    getBlockHeight(chunkMd: ChunkMD, localX: number, vSlice: number, localZ: number, sliceMinY: number, sliceMaxY: number): number;
    getBlockHeight(chunkMd: ChunkMD, blockPos: BlockPos): number;
    render(chunkImage: ComparableNativeImage, regionData: RegionData, chunkMd: ChunkMD, vSlice: number): boolean;
  }

}

declare module 'journeymap.client.command' {
  import { CommandSource } from 'net.minecraft.commands';
  import { IMainThreadTask } from 'journeymap.client.task.main';
  import { Minecraft } from 'net.minecraft.client';
  import { JourneymapClient } from 'journeymap.client';
  import { ClientWaypointImpl } from 'journeymap.client.waypoint';
  import { BlockPos } from 'net.minecraft.core';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Level } from 'net.minecraft.world.level';
  import { Throwable } from 'java.lang';

  interface ClientCommandInvoker extends JMCommand {}
  class ClientCommandInvoker extends JMCommand {
    static readonly BASE: string;
    static readonly BASE_COMMAND: string;
    static readonly BASE_COMMAND_SPACED: string;
    execute(sender: CommandSource, args: string[]): number;
    get name(): string;
    get possibleCommands(): string;
    getSubCommand(args: string[]): JMCommand;
    getUsage(sender: CommandSource): string;
    registerSub(command: JMCommand): ClientCommandInvoker;
  }


  interface CmdChatPosition extends JMCommand {}
  class CmdChatPosition extends JMCommand {
    execute(sender: CommandSource, args: string[]): number;
    get name(): string;
    get name(): string;
    getUsage(sender: CommandSource): string;
    perform(mc: Minecraft, jm: JourneymapClient): IMainThreadTask;
  }


  interface CmdEditWaypoint extends JMCommand {}
  class CmdEditWaypoint extends JMCommand {
    static readonly COMMAND: string;
    execute(sender: CommandSource, args: string[]): number;
    get name(): string;
    get name(): string;
    getUsage(sender: CommandSource): string;
    perform(mc: Minecraft, jm: JourneymapClient): IMainThreadTask;
  }


  interface CmdReloadWaypoint extends JMCommand {}
  class CmdReloadWaypoint extends JMCommand {
    execute(sender: CommandSource, args: string[]): number;
    get name(): string;
    getUsage(sender: CommandSource): string;
  }


  class CmdTeleportWaypoint {
    constructor(waypoint: ClientWaypointImpl);
    static isPermitted(mc: Minecraft): boolean;
    run(): void;
    static teleport(pos: BlockPos, dim: ResourceKey<Level>, name: string): void;
    static teleport(x: number, y: number, z: number, dim: string, name: string): void;
  }


  class JMCommand {
    exception(err: string, t: Throwable): void;
    execute(var1: CommandSource, var2: string[]): number;
    get name(): string;
    getUsage(var1: CommandSource): string;
  }

}

declare module 'journeymap.client' {
  import { Ordering } from 'com.google.common.collect';
  import { TimeZone, Locale } from 'java.util';
  import { MutableComponent, Style } from 'net.minecraft.network.chat';
  import { FormattedCharSequence } from 'net.minecraft.util';
  import { Font } from 'net.minecraft.client.gui';
  import { PackRepository } from 'net.minecraft.server.packs.repository';
  import { ClientState } from 'journeymap.common.network.model';
  import { CoreProperties, RenderingProperties, FullMapProperties, TopoProperties, MiniMapProperties, WebMapProperties, WaypointProperties } from 'journeymap.client.properties';
  import { Boolean, Runnable, Class } from 'java.lang';
  import { MainTaskController, IMainThreadTask } from 'journeymap.client.task.main';
  import { TaskController, ITaskManager } from 'journeymap.client.task.multi';
  import { WebMapService } from 'journeymap.api.services';
  import { ChunkRenderController } from 'journeymap.client.cartography';
  import { ClientNetworkDispatcher } from 'journeymap.common.network.dispatch';
  import { ClientPacketHandler } from 'journeymap.common.network.handler';
  import { KeyEvent } from 'journeymap.client.event.handlers.keymapping';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { FMLCommonSetupEvent, FMLClientSetupEvent, FMLLoadCompleteEvent } from 'net.neoforged.fml.event.lifecycle';
  import { NeoForgeKeyEvents } from 'journeymap.client.event';

  class Constants {
    static readonly CASE_INSENSITIVE_NULL_SAFE_ORDER: Ordering;
    static readonly GMT: TimeZone;
    static JOURNEYMAP_DIR: string;
    static CONFIG_DIR_LEGACY: string;
    static CONFIG_DIR: string;
    static DATA_DIR: string;
    static SP_DATA_DIR: string;
    static MP_DATA_DIR: string;
    static RESOURCE_PACKS_DEFAULT: string;
    static WEB_DIR: string;
    static ENTITY_ICON_DIR: string;
    static WAYPOINT_ICON_DIR: string;
    static THEME_ICON_DIR: string;
    static birthdayMessage(): string;
    static get locale(): Locale;
    static get resourcePacks(): PackRepository;
    static getFormattedText(text: string, style: Style, fontRenderer: Font, size: number): FormattedCharSequence;
    static getString(key: string): string;
    static getString(key: string, ...params: any[]): string;
    static getStringTextComponent(key: string): MutableComponent;
    static getTranslatedTextComponent(key: string): MutableComponent;
    static safeEqual(first: string, second: string): boolean;
  }


  class InternalStateHandler {
    canServerAdmin(): boolean;
    canShowInGameBeacons(): boolean;
    get maxAmbientCreaturesData(): number;
    get maxAnimalsData(): number;
    get maxCaveRenderDistance(): number;
    get maxMobsData(): number;
    get maxPlayersData(): number;
    get maxSurfaceRenderDistance(): number;
    get maxVillagersData(): number;
    get radarLateralDistance(): number;
    get radarVerticalDistance(): number;
    isAllowDeathPoints(): boolean;
    isAllowRightClickTeleport(): boolean;
    isExpandedRadarEnabled(): boolean;
    isHideCoordinates(): boolean;
    isJourneyMapServerConnection(): boolean;
    isMinimapEnabled(): boolean;
    isMinimapEnabledApi(): boolean;
    isModdedServerConnection(): boolean;
    isMultiplayerOptionsAllowed(): boolean;
    isPlayerRadarNamesEnabled(): boolean;
    isReadOnlyServerAdmin(): boolean;
    isServerAdmin(): boolean;
    isTeleportEnabled(): boolean;
    isWaypointsAllowed(): boolean;
    reset(): void;
    setHideCoordinates(hideCoordinates: boolean): void;
    setJourneyMapServerConnection(journeyMapServerConnection: boolean): void;
    setMinimapEnabled(minimapEnabled: boolean): void;
    setMinimapEnabledApi(minimapEnabledApi: boolean): void;
    setStates(state: ClientState): void;
    useServerFullscreenBiomes(): boolean;
  }


  class JourneymapClient {
    static readonly FULL_VERSION: string;
    static readonly MOD_NAME: string;
    hasOptifine: boolean;
    constructor();
    commonSetup(): void;
    disable(): void;
    enable(): void;
    enabled(): boolean;
    get activeMiniMapProperties(): MiniMapProperties;
    get activeMinimapId(): number;
    get chunkRenderController(): ChunkRenderController;
    get coreProperties(): CoreProperties;
    get currentWorldId(): string;
    get dispatcher(): ClientNetworkDispatcher;
    get fullMapProperties(): FullMapProperties;
    static get instance(): JourneymapClient;
    get keyEvents(): KeyEvent;
    get mainThreadTaskController(): MainTaskController;
    get miniMapProperties1(): MiniMapProperties;
    get miniMapProperties2(): MiniMapProperties;
    get multithreadTaskController(): TaskController;
    get packetHandler(): ClientPacketHandler;
    get renderingProperties(): RenderingProperties;
    get stateHandler(): InternalStateHandler;
    get topoProperties(): TopoProperties;
    get waypointProperties(): WaypointProperties;
    get webMap(): WebMapService;
    get webMapProperties(): WebMapProperties;
    getMiniMapProperties(which: number): MiniMapProperties;
    getRenderDistance(underground: boolean): number;
    init(): void;
    isInitialized(): boolean;
    isMainThreadTaskActive(): boolean;
    isMapping(): boolean;
    isTaskManagerEnabled(managerClass: Class<ITaskManager>): boolean;
    isThreadLogging(): boolean;
    isUpdateCheckEnabled(): boolean;
    loadConfigProperties(): void;
    performMainThreadTasks(): void;
    performMultithreadTasks(): void;
    postInit(): void;
    queueMainThreadTask(task: IMainThreadTask): void;
    queueOneOff(runnable: Runnable): void;
    reset(): void;
    saveConfigProperties(): void;
    set currentWorldId(worldId: string);
    set keyEvents(keyEvents: KeyEvent);
    setEnable(): void;
    startMapping(): void;
    startWebMap(): void;
    started(): boolean;
    stopMapping(): void;
    stopWebMap(): void;
    toggleTask(managerClass: Class<ITaskManager>, enable: boolean, params: any): void;
  }


  class JourneymapClientNeoForge {
    constructor(eventBus: IEventBus);
    clientSetupEvent(event: FMLClientSetupEvent): void;
    commonSetupEvent(event: FMLCommonSetupEvent): void;
    static get instance(): JourneymapClientNeoForge;
    get keyEvents(): NeoForgeKeyEvents;
    loadCompleteEvent(event: FMLLoadCompleteEvent): void;
  }

}

declare module 'journeymap.client.Constants' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface WorldType extends Enum<WorldType> {}
  class WorldType extends Enum<WorldType> {
    static readonly mp: WorldType;
    static readonly sp: WorldType;
    static valueOf(name: string): WorldType;
    static values(): WorldType[];
  }

}

declare module 'journeymap.client.data' {
  import { CacheLoader, LoadingCache, Cache } from 'com.google.common.cache';
  import { Long, Class, Enum, Integer } from 'java.lang';
  import { Map, Collection, List, Set } from 'java.util';
  import { Key } from 'journeymap.client.data.AllData';
  import { EntityDTO } from 'journeymap.client.model.entity';
  import { MapType } from 'journeymap.client.model.map';
  import { Name } from 'journeymap.client.model.map.MapType';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Level, ChunkPos } from 'net.minecraft.world.level';
  import { ClientWaypointImpl } from 'journeymap.client.waypoint';
  import { DrawEntityStep, DrawPolygonStep, DrawImageStep, DrawMarkerStep, DrawWayPointStep } from 'journeymap.client.render.draw';
  import { Entity, LivingEntity } from 'net.minecraft.world.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { PolygonOverlay, ImageOverlay, MarkerOverlay } from 'journeymap.api.v2.client.display';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockMD, BiomeMD } from 'journeymap.client.model.block';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { ChunkMD } from 'journeymap.client.model.chunk';
  import { Key as journeymap_client_model_region_regionimageset_Key } from 'journeymap.client.model.region.RegionImageSet';
  import { RegionImageSet, RegionCoord } from 'journeymap.client.model.region';
  import { Minecraft } from 'net.minecraft.client';
  import { Player } from 'net.minecraft.world.entity.player';
  import { DimensionProvider } from 'journeymap.client.data.WorldData';

  interface AllData extends CacheLoader<Long, Map> {}
  class AllData extends CacheLoader<Long, Map> {
    get tTL(): number;
    load(since: Long): Map<Key, any>;
  }


  interface AmbientCreatureData extends CacheLoader<Class, Map> {}
  class AmbientCreatureData extends CacheLoader<Class, Map> {
    get tTL(): number;
    load(aClass: Class): Map<string, EntityDTO>;
  }


  interface AnimalsData extends CacheLoader<Class, Map> {}
  class AnimalsData extends CacheLoader<Class, Map> {
    get tTL(): number;
    load(aClass: Class): Map<string, EntityDTO>;
  }


  interface DataCache extends Enum<DataCache> {}
  class DataCache extends Enum<DataCache> {
    static readonly INSTANCE: DataCache;
    addChunkMD(chunkMD: ChunkMD): void;
    get blockMDCount(): number;
    get debugHtml(): string;
    get loadedBlockMDs(): Set<BlockMD>;
    static get player(): EntityDTO;
    get regionCoords(): Cache<string, RegionCoord>;
    get regionImageSets(): LoadingCache<journeymap_client_model_region_regionimageset_Key, RegionImageSet>;
    getAll(since: number): Map<any, any>;
    getAmbientCreatures(forceRefresh: boolean): Map<string, EntityDTO>;
    getAnimals(forceRefresh: boolean): Map<string, EntityDTO>;
    getBiomeMD(key: ResourceKey<Biome>): BiomeMD;
    getBlockMD(blockState: BlockState): BlockMD;
    getChunkMD(blockPos: BlockPos): ChunkMD;
    getChunkMD(coordLong: number): ChunkMD;
    getDrawEntityStep(entity: Entity): DrawEntityStep;
    getDrawImageStep(overlay: ImageOverlay): DrawImageStep;
    getDrawMakerStep(overlay: MarkerOverlay): DrawMarkerStep;
    getDrawPolygonStep(overlay: PolygonOverlay): DrawPolygonStep;
    getDrawWayPointStep(holder: ClientWaypointImpl): DrawWayPointStep;
    getEntityDTO(entity: LivingEntity): EntityDTO;
    getMapType(name: Name, vSlice: number, dimension: ResourceKey<Level>): MapType;
    getMobs(forceRefresh: boolean): Map<string, EntityDTO>;
    getPlayer(forceRefresh: boolean): EntityDTO;
    getPlayers(forceRefresh: boolean): Map<string, EntityDTO>;
    getTriangulation(overlay: PolygonOverlay): BlockPos[];
    getVillagers(forceRefresh: boolean): Map<string, EntityDTO>;
    getWaypoints(forceRefresh: boolean): Collection<ClientWaypointImpl>;
    getWorld(forceRefresh: boolean): WorldData;
    hasBlockMD(aBlockState: BlockState): boolean;
    invalidateChunkMD(coord: ChunkPos): void;
    invalidateChunkMDCache(): void;
    invalidatePolygon(overlay: PolygonOverlay): void;
    invalidateWaypointSteps(): void;
    purge(): void;
    removeChunkMD(chunkMD: ChunkMD): void;
    removePlayer(id: string): void;
    resetBiomeMetadata(): void;
    resetBlockMetadata(): void;
    resetRadarCaches(): void;
    stopChunkMDRetention(): void;
    static valueOf(name: string): DataCache;
    static values(): DataCache[];
  }


  class ImagesData {
    static readonly PARAM_SINCE: string;
    constructor(since: Long);
  }


  interface MobsData extends CacheLoader<Class, Map> {}
  class MobsData extends CacheLoader<Class, Map> {
    get tTL(): number;
    load(aClass: Class): Map<string, EntityDTO>;
  }


  interface PlayerData extends CacheLoader<Class, EntityDTO> {}
  class PlayerData extends CacheLoader<Class, EntityDTO> {
    get tTL(): number;
    load(aClass: Class): EntityDTO;
    static playerIsUnderground(mc: Minecraft, player: Player): boolean;
  }


  interface PlayersData extends CacheLoader<Class, Map> {}
  class PlayersData extends CacheLoader<Class, Map> {
    get tTL(): number;
    load(aClass: Class): Map<string, EntityDTO>;
  }


  interface VillagersData extends CacheLoader<Class, Map> {}
  class VillagersData extends CacheLoader<Class, Map> {
    get tTL(): number;
    load(aClass: Class): Map<string, EntityDTO>;
  }


  interface WaypointsData extends CacheLoader<Class, Collection> {}
  class WaypointsData extends CacheLoader<Class, Collection> {
    get tTL(): number;
    static isManagerEnabled(): boolean;
    load(aClass: Class): Collection<ClientWaypointImpl>;
  }


  interface WorldData extends CacheLoader<Class, WorldData> {}
  class WorldData extends CacheLoader<Class, WorldData> {
    static get currentWeather(): string;
    static get day(): string;
    static get dimension(): string;
    static get dimensionProviders(): DimensionProvider[];
    static get gameTime(): string;
    static get legacyServerName(): string;
    static get lightLevel(): string;
    static get moonPhase(): string;
    static get movementSpeed(): string;
    static get realGameTime(): string;
    static get region(): string;
    static get systemTime(): string;
    get tTL(): number;
    static getDimensionProviders(requiredDimensionList: string[]): DimensionProvider[];
    static getSafeDimensionName(dimensionProvider: DimensionProvider): string;
    static getWorldName(mc: Minecraft): string;
    static isDay(worldTime: number): boolean;
    static isHardcoreAndMultiplayer(): boolean;
    static isNight(worldTime: number): boolean;
    load(aClass: Class): WorldData;
  }

}

declare module 'journeymap.client.data.AllData' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Key extends Enum<Key> {}
  class Key extends Enum<Key> {
    static readonly ambient: Key;
    static readonly animals: Key;
    static readonly images: Key;
    static readonly mobs: Key;
    static readonly player: Key;
    static readonly players: Key;
    static readonly villagers: Key;
    static readonly waypoints: Key;
    static readonly world: Key;
    static valueOf(name: string): Key;
    static values(): Key[];
  }

}

declare module 'journeymap.client.data.WorldData' {
  import { ResourceKey } from 'net.minecraft.resources';
  import { Level } from 'net.minecraft.world.level';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface WrappedProvider extends DimensionProvider {}
  class WrappedProvider extends DimensionProvider {
    constructor(dimension: ResourceKey<Level>);
    get dimension(): ResourceKey<Level>;
    get dimensionId(): string;
    get name(): string;
  }


  class DimensionProvider {
    get dimension(): ResourceKey<Level>;
    get dimensionId(): string;
    get name(): string;
  }


  interface DummyProvider extends DimensionProvider {}
  class DummyProvider extends DimensionProvider {
    get dimension(): ResourceKey<Level>;
    get dimensionId(): string;
    get name(): string;
  }


  interface MoonPhase extends Enum<MoonPhase> {}
  class MoonPhase extends Enum<MoonPhase> {
    static readonly DAY_TIME: MoonPhase;
    static readonly FULL_MOON: MoonPhase;
    static readonly WANING_GIBBOUS: MoonPhase;
    static readonly THIRD_QUARTER: MoonPhase;
    static readonly WANING_CRESCENT: MoonPhase;
    static readonly NEW_MOON: MoonPhase;
    static readonly WAXING_CRESCENT: MoonPhase;
    static readonly FIRST_QUARTER: MoonPhase;
    static readonly WAXING_GIBBOUS: MoonPhase;
    static fromPhase(phase: number): string;
    static valueOf(name: string): MoonPhase;
    static values(): MoonPhase[];
  }


  interface TimeValue extends Enum<TimeValue> {}
  class TimeValue extends Enum<TimeValue> {
    static readonly DAYTIME: TimeValue;
    static readonly SUNRISE: TimeValue;
    static readonly SUNSET: TimeValue;
    static readonly NIGHT: TimeValue;
    get text(): string;
    static valueOf(name: string): TimeValue;
    static values(): TimeValue[];
  }

}

declare module 'journeymap.client.event.dispatchers' {
  import { ThemeToolbar, Theme } from 'journeymap.client.ui.theme';
  import { Fullscreen } from 'journeymap.client.ui.fullscreen';
  import { Button } from 'journeymap.client.ui.component.buttons';
  import { List } from 'java.util';
  import { ModPopupMenu, IBlockInfo } from 'journeymap.api.v2.client.fullscreen';
  import { ClientWaypointImpl } from 'journeymap.client.waypoint';
  import { EntityDTO } from 'journeymap.client.model.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Level } from 'net.minecraft.world.level';
  import { Double } from 'Point2D';

  class CustomEventDispatcher {
    entityRadarMobUpdateEvent(dto: EntityDTO): boolean;
    entityRadarPlayerUpdateEvent(dto: EntityDTO): boolean;
    static get instance(): CustomEventDispatcher;
    getAddonToolbar(fullscreen: Fullscreen, theme: Theme): ThemeToolbar;
    getCustomToolBars(fullscreen: Fullscreen, theme: Theme): ThemeToolbar[];
    getMapTypeToolbar(fullscreen: Fullscreen, theme: Theme, ...buttons: Button[]): ThemeToolbar;
    popupMenuEvent(fullscreen: Fullscreen, menu: ModPopupMenu): boolean;
    popupWaypointMenuEvent(fullscreen: Fullscreen, menu: ModPopupMenu, wp: ClientWaypointImpl): boolean;
  }


  class FullscreenEventDispatcher {
    static clickEventPost(location: BlockPos, level: ResourceKey<Level>, mousePosition: Double, button: number): void;
    static clickEventPre(location: BlockPos, level: ResourceKey<Level>, mousePosition: Double, button: number): boolean;
    static dragEventPost(location: BlockPos, level: ResourceKey<Level>, mousePosition: Double, button: number): void;
    static dragEventPre(location: BlockPos, level: ResourceKey<Level>, mousePosition: Double, button: number): boolean;
    static moveEvent(level: ResourceKey<Level>, info: IBlockInfo, mousePosition: Double): void;
  }

}

declare module 'journeymap.client.event.handlers' {
  import { Component } from 'net.minecraft.network.chat';
  import { LevelAccessor, ChunkPos } from 'net.minecraft.world.level';
  import { ChunkAccess } from 'net.minecraft.world.level.chunk';
  import { BlockPos } from 'net.minecraft.core';
  import { EntityDTO } from 'journeymap.client.model.entity';
  import { UIState } from 'journeymap.api.v2.client.util';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { List, Map } from 'java.util';
  import { UpdateAwareKeyBinding, KeyEvent, KeyBindingAction } from 'journeymap.client.event.handlers.keymapping';
  import { ListMultimap } from 'com.google.common.collect';
  import { Integer } from 'java.lang';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { WaypointPopupMenuEvent } from 'PopupMenuEvent';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ShaderRegistration } from 'journeymap.client.event.handlers.ShaderRegistrationHandler';

  class ChatEventHandler {
    static get instance(): ChatEventHandler;
    onChatEvent(message: string): boolean;
    onClientChatEventReceived(message: Component): Component;
  }


  class ChunkMonitorHandler {
    static get instance(): ChunkMonitorHandler;
    onBlockUpdate(world: LevelAccessor, pos: BlockPos): void;
    onChunkLoad(world: LevelAccessor, chunkAccess: ChunkAccess): void;
    onChunkUpdate(world: LevelAccessor, pos: ChunkPos): void;
    onWorldUnload(world: LevelAccessor): void;
    reset(): void;
    resetRenderTimes(pos: number): void;
  }


  class DeathPointHandler {
    handlePlayerDeath(): void;
  }


  class EntityRadarUpdateEventHandler {
    static INSTANCE: EntityRadarUpdateEventHandler;
    static addEntityToolTips(entity: EntityDTO, activeUiState: UIState, name: Component, showNames: boolean): void;
    static getEntityName(entity: EntityDTO, activeUiState: UIState, showNames: boolean): Component;
    static init(): EntityRadarUpdateEventHandler;
  }


  class HudOverlayHandler {
    static get instance(): HudOverlayHandler;
    onRenderOverlay(graphics: GuiGraphics): void;
    onRenderOverlayDebug(leftText: string[]): void;
    postOverlay(graphics: GuiGraphics): void;
    preOverlay(graphics: GuiGraphics): boolean;
    renderWaypointDecos(graphics: GuiGraphics): void;
  }


  class KeyEventHandler {
    kbMapZoomin: UpdateAwareKeyBinding;
    kbMapZoomout: UpdateAwareKeyBinding;
    kbMapToggleType: UpdateAwareKeyBinding;
    kbCreateWaypoint: UpdateAwareKeyBinding;
    kbToggleWaypointRendering: UpdateAwareKeyBinding;
    kbToggleWaypointWorldRendering: UpdateAwareKeyBinding;
    kbToggleWaypointMapRendering: UpdateAwareKeyBinding;
    kbToggleWaypoints: UpdateAwareKeyBinding;
    kbFullscreenCreateWaypoint: UpdateAwareKeyBinding;
    kbFullscreenChatPosition: UpdateAwareKeyBinding;
    kbFullscreenToggle: UpdateAwareKeyBinding;
    kbWaypointManager: UpdateAwareKeyBinding;
    kbMinimapToggle: UpdateAwareKeyBinding;
    kbMinimapPreset: UpdateAwareKeyBinding;
    kbFullmapOptionsManager: UpdateAwareKeyBinding;
    kbFullmapPanNorth: UpdateAwareKeyBinding;
    kbFullmapPanSouth: UpdateAwareKeyBinding;
    kbFullmapPanEast: UpdateAwareKeyBinding;
    kbFullmapPanWest: UpdateAwareKeyBinding;
    kbFullmapButtonHide: UpdateAwareKeyBinding;
    kbEntityNameDisplay: UpdateAwareKeyBinding;
    kbFullmapFollowPlayer: UpdateAwareKeyBinding;
    sortActionsNeeded: boolean;
    kbTest: UpdateAwareKeyBinding;
    constructor(keyEvent: KeyEvent);
    get inGuiKeybindings(): UpdateAwareKeyBinding[];
    getPressedKey(actions: ListMultimap<number, KeyBindingAction>): number;
    onGameKeyboardEvent(key: number): boolean;
    onGuiKeyboardEvent(screen: Screen, key: number): boolean;
    onMouseEvent(key: number, screen: Screen, action: number): boolean;
    registerActions(): KeyEventHandler;
    sortActions(): void;
  }


  class PlayerConnectHandler {
    onConnect(): void;
    onDisconnect(): void;
  }


  class PopupMenuEventHandler {
    static INSTANCE: PopupMenuEventHandler;
    static init(): PopupMenuEventHandler;
    onWaypointPopupMenu(event: WaypointPopupMenuEvent): void;
  }


  class ResourceReloadHandler {
    onResourceReload(): void;
  }


  class ScreenEventHandler {
    static get instance(): ScreenEventHandler;
    onScreenClosedEvent(screen: Screen): void;
    onScreenMouseDraggedEvent(screen: Screen, mouseX: number, mouseY: number, dragX: number, dragY: number, mouseButton: number): boolean;
    onScreenMousePressedEvent(screen: Screen, mouseX: number, mouseY: number, button: number): boolean;
    onScreenMouseReleasedEvent(screen: Screen, mouseX: number, mouseY: number, button: number): boolean;
    onScreenPreRender(screen: Screen, graphics: GuiGraphics, mouseX: number, mouseY: number): void;
  }


  class ShaderRegistrationHandler {
    static get shaders(): Map<ResourceLocation, ShaderRegistration>;
  }


  class StateTickHandler {
    onClientTick(): void;
  }


  class WaypointBeaconHandler {
    onRenderWaypoints(graphics: GuiGraphics, shaderBeacon: boolean): void;
    onRenderWaypoints(graphics: GuiGraphics): void;
  }


  class WorldEventHandler {
    onUnload(world: LevelAccessor): void;
  }

}

declare module 'journeymap.client.event.handlers.keymapping' {
  import { Runnable, Enum } from 'java.lang';
  import { Type, Key } from 'InputConstants';
  import { List } from 'java.util';
  import { KeyMapping } from 'net.minecraft.client';
  import { KeyEventHandler } from 'journeymap.client.event.handlers';
  import { Component } from 'net.minecraft.network.chat';

  class KeyBindingAction {
    constructor(keyBinding: UpdateAwareKeyBinding, action: Runnable);
    get action(): Runnable;
    get keyBinding(): UpdateAwareKeyBinding;
    isActive(key: number, useContext: boolean, type: Type): boolean;
    order(): number;
    toString(): string;
  }


  interface KeyConflictContext extends Enum<KeyConflictContext> {}
  class KeyConflictContext extends Enum<KeyConflictContext> {
    static readonly UNIVERSAL: KeyConflictContext;
    static readonly GUI: KeyConflictContext;
    static readonly IN_GAME: KeyConflictContext;
    isActive(): boolean;
    static valueOf(name: string): KeyConflictContext;
    static values(): KeyConflictContext[];
  }


  class KeyEvent {
    get handler(): KeyEventHandler;
    register(var1: KeyMapping): KeyMapping;
  }


  interface KeyModifier extends Enum<KeyModifier> {}
  class KeyModifier extends Enum<KeyModifier> {
    static readonly CONTROL: KeyModifier;
    static readonly SHIFT: KeyModifier;
    static readonly ALT: KeyModifier;
    static readonly NONE: KeyModifier;
    isActive(context: KeyConflictContext): boolean;
    static valueOf(name: string): KeyModifier;
    static values(): KeyModifier[];
  }


  class UpdateAwareKeyBinding {
    get keyValue(): Key;
    get mapping(): KeyMapping;
    get modifier(): KeyModifier;
    get text(): string;
    get translatedName(): Component;
    isActiveAndMatches(var1: Key): boolean;
    isKeyPressed(): boolean;
    modifierActive(): boolean;
  }

}

declare module 'journeymap.client.event.handlers.keymapping.KeyConflictContext' {
  class Func {
    isActive(): boolean;
  }

}

declare module 'journeymap.client.event.handlers.keymapping.KeyModifier' {
  class Func {
    isActive(): boolean;
  }

}

declare module 'journeymap.client.event.keymapping' {
  import { KeyModifier, IKeyConflictContext } from 'net.neoforged.neoforge.client.settings';
  import { KeyModifier as journeymap_client_event_handlers_keymapping_KeyModifier, KeyConflictContext, UpdateAwareKeyBinding } from 'journeymap.client.event.handlers.keymapping';
  import { KeyMapping } from 'net.minecraft.client';
  import { Type, Key } from 'InputConstants';
  import { KeyEventHandler } from 'journeymap.client.event.handlers';
  import { Component } from 'net.minecraft.network.chat';

  class NeoForgeKeyHooks {
    static getForgeConflictContext(context: KeyConflictContext): IKeyConflictContext;
    static getForgeModifier(key: journeymap_client_event_handlers_keymapping_KeyModifier): KeyModifier;
  }


  interface NeoForgeUpdateAwareKeyBinding extends UpdateAwareKeyBinding, KeyMapping {}
  class NeoForgeUpdateAwareKeyBinding extends UpdateAwareKeyBinding {
    constructor(description: string, keyConflictContext: KeyConflictContext, keyModifier: journeymap_client_event_handlers_keymapping_KeyModifier, inputType: Type, keyCode: number, category: string, handler: KeyEventHandler);
    get keyValue(): Key;
    get mapping(): KeyMapping;
    get modifier(): journeymap_client_event_handlers_keymapping_KeyModifier;
    get text(): string;
    get translatedName(): Component;
    isActiveAndMatches(keyCode: Key): boolean;
    isKeyPressed(): boolean;
    modifierActive(): boolean;
    setKey(key: Key): void;
    setKeyModifierAndCode(keyModifier: KeyModifier, keyCode: Key): void;
  }

}

declare module 'journeymap.client.event' {
  import { EventHandler } from 'journeymap.client.event.NeoForgeEventHandlerManager';
  import { ClientChatReceivedEvent, RegisterClientCommandsEvent, RegisterKeyMappingsEvent, RenderLevelStageEvent, RegisterShadersEvent } from 'net.neoforged.neoforge.client.event';
  import { BreakEvent, EntityMultiPlaceEvent, NeighborNotifyEvent, EntityPlaceEvent } from 'BlockEvent';
  import { Watch } from 'ChunkWatchEvent';
  import { Load } from 'ChunkEvent';
  import { Post } from 'ClientTickEvent';
  import { Class } from 'java.lang';
  import { HashMap } from 'java.util';
  import { Pre, Post as renderguievent_Post } from 'RenderGuiEvent';
  import { Pre as renderguilayerevent_Pre, Post as renderguilayerevent_Post } from 'RenderGuiLayerEvent';
  import { DebugText } from 'CustomizeGuiOverlayEvent';
  import { KeyEvent } from 'journeymap.client.event.handlers.keymapping';
  import { Key } from 'InputEvent';
  import { Post as screenevent_keypressed_Post } from 'ScreenEvent.KeyPressed';
  import { Post as screenevent_mousebuttonpressed_Post, Pre as screenevent_mousebuttonpressed_Pre } from 'ScreenEvent.MouseButtonPressed';
  import { Post as inputevent_mousebutton_Post } from 'InputEvent.MouseButton';
  import { KeyEventHandler } from 'journeymap.client.event.handlers';
  import { KeyMapping } from 'net.minecraft.client';
  import { LoggingIn, LoggingOut } from 'ClientPlayerNetworkEvent';
  import { Pre as screenevent_mousedragged_Pre } from 'ScreenEvent.MouseDragged';
  import { Pre as screenevent_mousebuttonreleased_Pre } from 'ScreenEvent.MouseButtonReleased';
  import { Closing } from 'ScreenEvent';
  import { Unload } from 'LevelEvent';

  interface NeoForgeChatEvents extends EventHandler {}
  class NeoForgeChatEvents extends EventHandler {
    invoke(event: ClientChatReceivedEvent): void;
    onClientCommandRegistration(event: RegisterClientCommandsEvent): void;
  }


  interface NeoForgeChunkEvents extends EventHandler {}
  class NeoForgeChunkEvents extends EventHandler {
    onBlockUpdate(event: BreakEvent): void;
    onBlockUpdate(event: EntityMultiPlaceEvent): void;
    onBlockUpdate(event: NeighborNotifyEvent): void;
    onBlockUpdate(event: EntityPlaceEvent): void;
    onChunkLoad(event: Load): void;
    onChunkUpdate(event: Watch): void;
  }


  interface NeoForgeClientTickEvent extends EventHandler {}
  class NeoForgeClientTickEvent extends EventHandler {
    onClientTick(event: Post): void;
  }


  class NeoForgeEventHandlerManager {
    static get handlers(): HashMap<Class<EventHandler>, EventHandler>;
    static register(handler: EventHandler): void;
    static registerHandlers(): void;
    static unregister(handlerClass: Class<EventHandler>): void;
    static unregisterAll(): void;
  }


  interface NeoForgeHudOverlayEvents extends EventHandler {}
  class NeoForgeHudOverlayEvents extends EventHandler {
    onRenderOverlayDebug(event: DebugText): void;
    postGuiOverlay(event: renderguievent_Post): void;
    postOverlayLayer(event: renderguilayerevent_Post): void;
    preOverlayHighest(event: Pre): void;
    preOverlayHighest(event: renderguilayerevent_Pre): void;
    preOverlayLow(event: renderguilayerevent_Pre): void;
  }


  interface NeoForgeKeyEvents extends KeyEvent, EventHandler {}
  class NeoForgeKeyEvents extends KeyEvent {
    get handler(): KeyEventHandler;
    onGameKeyboardEvent(event: Key): void;
    onGuiKeyboardEvent(event: screenevent_keypressed_Post): void;
    onGuiMouseEvent(event: screenevent_mousebuttonpressed_Post): void;
    onKeyRegisterEvent(event: RegisterKeyMappingsEvent): void;
    onMouseEvent(event: inputevent_mousebutton_Post): void;
    register(keyMapping: KeyMapping): KeyMapping;
  }


  interface NeoForgeLoggedInEvent extends EventHandler {}
  class NeoForgeLoggedInEvent extends EventHandler {
    onConnect(event: LoggingIn): void;
    onDisconnect(event: LoggingOut): void;
  }


  interface NeoForgeRenderLevelStageEvent extends EventHandler {}
  class NeoForgeRenderLevelStageEvent extends EventHandler {
    onRenderWorldLastEvent(event: RenderLevelStageEvent): void;
  }


  interface NeoForgeScreenEvents extends EventHandler {}
  class NeoForgeScreenEvents extends EventHandler {
    onScreenMouseDraggedEvent(event: screenevent_mousedragged_Pre): void;
    onScreenMousePressedEvent(event: screenevent_mousebuttonpressed_Pre): void;
    onScreenMouseReleasedEvent(event: screenevent_mousebuttonreleased_Pre): void;
    onScreenMouseReleasedEvent(event: Closing): void;
  }


  class NeoForgeShaderRegistration {
    static registerShaders(event: RegisterShadersEvent): void;
  }


  interface NeoForgeWorldEvent extends EventHandler {}
  class NeoForgeWorldEvent extends EventHandler {
    onUnload(event: Unload): void;
  }

}

declare module 'journeymap.client.event.NeoForgeEventHandlerManager' {
  class EventHandler {
  }

}

declare module 'journeymap.client.feature' {
  import { Enum, Boolean } from 'java.lang';
  import { EnumSet, List, Map, Set } from 'java.util';
  import { MapType } from 'journeymap.client.model.map';
  import { MapType as context_MapType } from 'Context';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Level } from 'net.minecraft.world.level';
  import { GlobalProperties } from 'journeymap.common.properties';

  interface Feature extends Enum<Feature> {}
  class Feature extends Enum<Feature> {
    static readonly RadarPlayers: Feature;
    static readonly RadarAnimals: Feature;
    static readonly RadarMobs: Feature;
    static readonly RadarVillagers: Feature;
    static readonly MapTopo: Feature;
    static readonly MapSurface: Feature;
    static readonly MapCaves: Feature;
    static readonly MapBiome: Feature;
    static all(): EnumSet<Feature>;
    static fromApiMapType(mapType: context_MapType, dimension: ResourceKey<Level>): Feature;
    static fromMapType(mapType: MapType): Feature;
    static radar(): EnumSet<Feature>;
    static valueOf(name: string): Feature;
    static values(): Feature[];
  }


  class FeatureManager {
    disableFeature(apiMapType: context_MapType, dimension: ResourceKey<Level>): void;
    get allowedFeatures(): Map<Feature, boolean>;
    static get instance(): FeatureManager;
    get policyDetails(): string;
    isAllowed(feature: Feature): boolean;
    reset(): void;
    updateDimensionFeatures(properties: GlobalProperties): void;
  }


  class Policy {
    constructor(feature: Feature, allowInSingleplayer: boolean, allowInMultiplayer: boolean);
    static bulkCreate(allowInSingleplayer: boolean, allowInMultiplayer: boolean): Set<Policy>;
    static bulkCreate(features: EnumSet<Feature>, allowInSingleplayer: boolean, allowInMultiplayer: boolean): Set<Policy>;
    equals(o: any): boolean;
    hashCode(): number;
    isCurrentlyAllowed(): boolean;
  }

}

declare module 'journeymap.client.io' {
  import { File, InputStream, OutputStream } from 'java.io';
  import { Path } from 'java.nio.file';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { Level, ChunkPos } from 'net.minecraft.world.level';
  import { Minecraft } from 'net.minecraft.client';
  import { Properties, ArrayList, List, Set } from 'java.util';
  import { Class, Boolean, Integer } from 'java.lang';
  import { URL } from 'java.net';
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { MapType } from 'journeymap.client.model.map';
  import { RegionCoord } from 'journeymap.client.model.region';
  import { Gson } from 'com.google.gson';
  import { Theme } from 'journeymap.client.ui.theme';

  class FileHandler {
    static readonly DEV_MINECRAFT_DIR: string;
    static readonly ASSETS_JOURNEYMAP: string;
    static readonly ASSETS_JOURNEYMAP_UI: string;
    static readonly ASSETS_WEBMAP: string;
    static readonly MinecraftDirectory: File;
    static readonly JourneyMapDirectory: File;
    static readonly StandardConfigDirectory: File;
    accept(pathname: File): boolean;
    static copyColorPaletteHtmlFile(toDir: File, fileName: string): File;
    static copyResources(targetDirectory: File, location: ResourceLocation, setName: string, overwrite: boolean): boolean;
    static copyResources(targetDirectory: File, resourceDir: URL, assetsPath: string, setName: string, overwrite: boolean): boolean;
    static delete(file: File): boolean;
    static deleteJMWorldDirForLevelId(levelId: string): boolean;
    static get journeyMapDir(): File;
    static get minecraftDirectory(): File;
    static get mobIconsDomainsDirectories(): File[];
    static get waypointDir(): File;
    static getAddonDataPath(minecraft: Minecraft): File;
    static getDimNameForPath(dimensionKey: ResourceKey<Level>): string;
    static getDimNameForPath(worldDir: File, dimensionKey: ResourceKey<Level>): string;
    static getDimPath(worldDir: File, dimensionKey: ResourceKey<Level>): Path;
    static getIconFromFile(parentdir: File, setName: string, iconPath: string): NativeImage;
    static getImageFromFile(file: File): NativeImage;
    static getImageFromStream(stream: InputStream): NativeImage;
    static getJMWorldDir(minecraft: Minecraft): File;
    static getJMWorldDir(minecraft: Minecraft, worldId: string): File;
    static getJMWorldDirForWorldId(minecraft: Minecraft, worldId: string): File;
    static getLangFile(fileName: string): Properties;
    static getMCWorldDir(minecraft: Minecraft): File;
    static getMCWorldDir(minecraft: Minecraft, dimension: ResourceKey<Level>): File;
    static getMessageModel<M>(model: Class<M>, filePrefix: string): M;
    static getMessageModelInputStream(filePrefix: string, lang: string): InputStream;
    static getMobIconsDomainsDirectory(mobLocation: ResourceLocation): File;
    static getWaypointDir(jmWorldDir: File): File;
    static getWorldConfigDir(fallbackToStandardConfigDir: boolean): File;
    static getWorldDirectoryName(minecraft: Minecraft): string;
    static getWorldDirectoryName(minecraft: Minecraft, worldId: string): string;
    static getWorldSaveDir(minecraft: Minecraft): File;
    static isInJar(): boolean;
    static isInJar(location: URL): boolean;
    static open(file: File): void;
    openStream(): OutputStream;
  }


  class IconSetFileHandler {
    static readonly MOB_ICON_SET_DEFAULT: string;
    static ensureEntityIconSet(setName: string): void;
    static ensureEntityIconSet(setName: string, overwrite: boolean): void;
    static get entityIconDir(): File;
    static get entityIconSetNames(): ArrayList<string>;
    static getIconSetNames(parentDir: File, defaultIconSets: string[]): ArrayList<string>;
    static initialize(): void;
    static registerEntityIconDirectory(resourceLocation: ResourceLocation): boolean;
  }


  class MapSaver {
    constructor(worldDir: File, mapType: MapType);
    get saveFileName(): string;
    isValid(): boolean;
    saveMap(): File;
  }


  class PngjHelper {
    static mergeFiles(tiles: File[], destFile: File, tileColumns: number, tileSize: number): void;
  }


  class RegionImageHandler {
    static get blank512x512ImageFile(): File;
    static getImage(file: File): NativeImage;
    static getImageDir(rCoord: RegionCoord, mapType: MapType): File;
    static getImageFilesForMapType(minecraft: Minecraft, mapType: MapType): Set<string>;
    static getMergedChunks(worldDir: File, startCoord: ChunkPos, endCoord: ChunkPos, mapType: MapType, useCache: boolean, image: NativeImage, imageWidth: number, imageHeight: number, allowNullImage: boolean, showGrid: boolean): NativeImage;
    static getRegionImageFile(rCoord: RegionCoord, mapType: MapType): File;
    static readRegionImage(regionFile: File): NativeImage;
  }


  class ThemeLoader {
    static readonly THEME_FILE_SUFFIX: string;
    static readonly DEFAULT_THEME_FILE: string;
    static readonly GSON: Gson;
    accept(pathname: File): boolean;
    accept(dir: File, name: string): boolean;
    static get currentTheme(): Theme;
    static get defaultTheme(): Theme;
    static get themeDirectories(): File[];
    static get themeIconDir(): File;
    static get themeNames(): string[];
    static get themes(): Theme[];
    static getCurrentTheme(forceReload: boolean): Theme;
    static getThemeByName(themeName: string): Theme;
    static initialize(preLoadCurrentTheme: boolean): void;
    static loadNextTheme(): void;
    static loadThemeFromFile(themeFile: File, createIfMissing: boolean): Theme;
    static preloadCurrentTheme(): void;
    static save(theme: Theme): void;
    static set currentTheme(theme: Theme);
  }

}

declare module 'journeymap.client.io.IconSetFileHandler' {
  import { ValuesProvider } from 'journeymap.common.properties.config.StringField';
  import { List } from 'java.util';

  interface IconSetValuesProvider extends ValuesProvider {}
  class IconSetValuesProvider extends ValuesProvider {
    get defaultString(): string;
    get strings(): string[];
  }

}

declare module 'journeymap.client.io.nbt' {
  import { ProcessedChunk } from 'journeymap.client.io.nbt.CustomChunkReader';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { ChunkPos, Level } from 'net.minecraft.world.level';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ChunkMD } from 'journeymap.client.model.chunk';
  import { ChunkStorage } from 'net.minecraft.world.level.chunk.storage';
  import { Minecraft } from 'net.minecraft.client';
  import { MapType } from 'journeymap.client.model.map';
  import { File } from 'java.io';
  import { Stack } from 'java.util';
  import { RegionCoord } from 'journeymap.client.model.region';
  import { Integer } from 'java.lang';

  class CustomChunkReader {
    static read(level: ClientLevel, chunkPos: ChunkPos, chunkTag: CompoundTag): ProcessedChunk;
  }


  class JMChunkLoader {
    static getChunkFromNBT(world: ClientLevel, coord: ChunkPos, nbt: CompoundTag, forceRetain: boolean): ChunkMD;
    static getChunkMD(loader: ChunkStorage, mc: Minecraft, coord: ChunkPos, forceRetain: boolean): ChunkMD;
    static getChunkMdFromMemory(level: Level, chunkX: number, chunkZ: number): ChunkMD;
  }


  class RegionLoader {
    constructor(minecraft: Minecraft, mapType: MapType, all: boolean);
    get mapType(): MapType;
    get regions(): Stack<RegionCoord>;
    get regionsFound(): number;
    get vSlice(): number;
    static getRegionFile(minecraft: Minecraft, dimension: number, chunkX: number, chunkZ: number): File;
    static getRegionFile(minecraft: Minecraft, chunkX: number, chunkZ: number): File;
    isUnderground(): boolean;
  }

}

declare module 'journeymap.client.io.nbt.CustomChunkReader' {
  import { RuntimeException, Throwable } from 'java.lang';

  interface AutoMapChunkReaderException extends RuntimeException {}
  class AutoMapChunkReaderException extends RuntimeException {
    constructor(message: string, cause: Throwable);
  }

}

declare module 'journeymap.client.io.ThemeLoader' {
  import { ValuesProvider } from 'journeymap.common.properties.config.StringField';
  import { List } from 'java.util';

  interface ThemeValuesProvider extends ValuesProvider {}
  class ThemeValuesProvider extends ValuesProvider {
    get defaultString(): string;
    get strings(): string[];
    getTooltip(value: string): string;
  }

}

declare module 'journeymap.client.log' {
  import { Component } from 'net.minecraft.network.chat';
  import { File } from 'java.io';
  import { Minecraft } from 'net.minecraft.client';
  import { Logger } from 'org.apache.logging.log4j';
  import { Throwable } from 'java.lang';
  import { List } from 'java.util';

  class ChatLog {
    static enableAnnounceMod: boolean;
    static announceActionBar(message: Component): void;
    static announceError(text: string): void;
    static announceFile(message: string, file: File): void;
    static announceI18N(key: string, ...parms: any[]): void;
    static announceMod(forced: boolean): void;
    static announceURL(message: string, url: string): void;
    static announceWaypointRendering(enable: boolean): void;
    static queueAnnouncement(chat: Component): void;
    static showChatAnnouncements(mc: Minecraft): void;
  }


  class JMLogger {
    static readonly DEPRECATED_LOG_FILE: string;
    static readonly LOG_FILE: string;
    static get logFile(): File;
    static get propertiesSummary(): string;
    static init(): Logger;
    static logOnce(text: string): void;
    static logProperties(): void;
    static setLevelFromProperties(): void;
    static throwLogOnce(text: string, throwable: Throwable): void;
    static throwLogOnce(text: string, throwable: Throwable, shouldThrow: boolean): void;
  }


  class StatTimer {
    static readonly NS: number;
    cancel(): void;
    compare(o1: StatTimer, o2: StatTimer): number;
    compare(o1: StatTimer, o2: StatTimer): number;
    elapsed(): number;
    static get(name: string): StatTimer;
    static get(name: string, warmupCount: number): StatTimer;
    static get(name: string, warmupCount: number, elapsedLimit: number): StatTimer;
    get elapsedLimitReachedCount(): number;
    get elapsedLimitWarningsRemaining(): number;
    get logReportString(): string;
    get name(): string;
    get reportString(): string;
    get simpleReportString(): string;
    static getDisposable(name: string): StatTimer;
    static getDisposable(name: string, elapsedLimit: number): StatTimer;
    static getReport(): string;
    static getReportByTotalTime(prefix: string, suffix: string): string[];
    hasReachedElapsedLimit(): boolean;
    report(): void;
    reset(): void;
    static resetAll(): void;
    start(): StatTimer;
    stop(): number;
    stopAndReport(): string;
  }

}

declare module 'journeymap.client.log.JMLogger' {
  import { ValuesProvider } from 'journeymap.common.properties.config.StringField';
  import { List } from 'java.util';

  interface LogLevelStringProvider extends ValuesProvider {}
  class LogLevelStringProvider extends ValuesProvider {
    get defaultString(): string;
    get strings(): string[];
  }

}

declare module 'journeymap.client.mod' {
  import { BlockMD } from 'journeymap.client.model.block';
  import { ChunkMD } from 'journeymap.client.model.chunk';
  import { BlockPos } from 'net.minecraft.core';
  import { Collection, List } from 'java.util';
  import { ColoredSprite } from 'journeymap.client.cartography.color';
  import { Enum, Class } from 'java.lang';
  import { EnumProperty } from 'net.minecraft.world.level.block.state.properties';
  import { Method } from 'java.lang.reflect';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  class IBlockColorProxy {
    deriveBlockColor(var1: BlockMD, var2: ChunkMD, var3: BlockPos): number;
    getBlockColor(var1: ChunkMD, var2: BlockMD, var3: BlockPos): number;
  }


  class IBlockSpritesProxy {
    getSprites(var1: BlockMD, var2: ChunkMD, var3: BlockPos): Collection<ColoredSprite>;
  }


  class IModBlockHandler {
    initialize(var1: BlockMD): void;
  }


  interface ModBlockDelegate extends Enum<ModBlockDelegate> {}
  class ModBlockDelegate extends Enum<ModBlockDelegate> {
    static readonly INSTANCE: ModBlockDelegate;
    get commonBlockHandler(): IModBlockHandler;
    get defaultBlockColorProxy(): IBlockColorProxy;
    get defaultBlockSpritesProxy(): IBlockSpritesProxy;
    get materialBlockColorProxy(): IBlockColorProxy;
    initialize(blockMD: BlockMD): void;
    reset(): void;
    static valueOf(name: string): ModBlockDelegate;
    static values(): ModBlockDelegate[];
  }


  class ModPropertyEnum<T = any> {
    constructor(propertyEnum: EnumProperty, method: Method, returnType: Class<T>);

    constructor(propertyEnum: EnumProperty, methodName: string, returnType: Class<T>, methodArgTypes: Class<any>);

    constructor(declaringClassName: string, propertyEnumStaticFieldName: string, methodName: string, returnType: Class<T>);

    constructor(declaringClassName: string, propertyEnumStaticFieldName: string, methodName: string, returnType: Class<T>, methodArgTypes: Class<any>);

    constructor(declaringClassName: string, propertyEnumStaticFieldName: string, method: Method, returnType: Class<T>);
    get propertyEnum(): EnumProperty;
    static getFirstValue<T>(modPropertyEnums: Collection<ModPropertyEnum<T>>, blockState: BlockState, ...args: any[]): T;
    getValue(blockState: BlockState, ...args: any[]): T;
    isValid(): boolean;
    static lookupMethod(propertyEnum: EnumProperty, methodName: string, ...methodArgTypes: Class[]): Method;
    static lookupMethod(declaringClassName: string, methodName: string, ...methodArgTypes: Class[]): Method;
    static lookupPropertyEnum(declaringClassName: string, propertyEnumStaticFieldName: string): EnumProperty;
  }

}

declare module 'journeymap.client.mod.impl' {
  import { IModBlockHandler, IBlockSpritesProxy, IBlockColorProxy } from 'journeymap.client.mod';
  import { BlockMD } from 'journeymap.client.model.block';
  import { Collection } from 'java.util';
  import { ColoredSprite } from 'journeymap.client.cartography.color';
  import { ChunkMD } from 'journeymap.client.model.chunk';
  import { BlockPos } from 'net.minecraft.core';

  interface Bibliocraft extends IModBlockHandler, IBlockSpritesProxy {}
  class Bibliocraft extends IModBlockHandler {
    constructor();
    getSprites(blockMD: BlockMD, chunkMD: ChunkMD, blockPos: BlockPos): Collection<ColoredSprite>;
    initialize(blockMD: BlockMD): void;
  }


  interface BiomesOPlenty extends IModBlockHandler {}
  class BiomesOPlenty extends IModBlockHandler {
    initialize(blockMD: BlockMD): void;
  }


  interface ChinjufuMod extends IModBlockHandler, IBlockSpritesProxy {}
  class ChinjufuMod extends IModBlockHandler {
    getSprites(blockMD: BlockMD, chunkMD: ChunkMD, blockPos: BlockPos): Collection<ColoredSprite>;
    initialize(blockMD: BlockMD): void;
  }


  interface CodeChickenLibMod extends IModBlockHandler, IBlockColorProxy {}
  class CodeChickenLibMod extends IModBlockHandler {
    deriveBlockColor(blockMD: BlockMD, chunkMD: ChunkMD, blockPos: BlockPos): number;
    getBlockColor(chunkMD: ChunkMD, blockMD: BlockMD, blockPos: BlockPos): number;
    initialize(blockMD: BlockMD): void;
  }


  interface CreateMod extends IModBlockHandler, IBlockColorProxy {}
  class CreateMod extends IModBlockHandler {
    deriveBlockColor(blockMD: BlockMD, chunkMD: ChunkMD, blockPos: BlockPos): number;
    getBlockColor(chunkMD: ChunkMD, blockMD: BlockMD, blockPos: BlockPos): number;
    initialize(blockMD: BlockMD): void;
  }


  interface ImmersiveRailroading extends IModBlockHandler, IBlockColorProxy {}
  class ImmersiveRailroading extends IModBlockHandler {
    deriveBlockColor(blockMD: BlockMD, chunkMD: ChunkMD, blockPos: BlockPos): number;
    getBlockColor(chunkMD: ChunkMD, blockMD: BlockMD, blockPos: BlockPos): number;
    initialize(blockMD: BlockMD): void;
  }


  interface ProjectVibrant extends IModBlockHandler {}
  class ProjectVibrant extends IModBlockHandler {
    initialize(blockMD: BlockMD): void;
  }


  interface Streams extends IModBlockHandler {}
  class Streams extends IModBlockHandler {
    initialize(blockMD: BlockMD): void;
  }


  interface TerraFirmaCraft extends IModBlockHandler, IBlockColorProxy {}
  class TerraFirmaCraft extends IModBlockHandler {
    constructor();
    deriveBlockColor(blockMD: BlockMD, chunkMD: ChunkMD, blockPos: BlockPos): number;
    getBlockColor(chunkMD: ChunkMD, blockMD: BlockMD, blockPos: BlockPos): number;
    initialize(blockMD: BlockMD): void;
  }

}

declare module 'journeymap.client.mod.vanilla' {
  import { Enum, Integer } from 'java.lang';
  import { BlockMD } from 'journeymap.client.model.block';
  import { ChunkMD } from 'journeymap.client.model.chunk';
  import { BlockPos } from 'net.minecraft.core';
  import { List, Collection, HashMap } from 'java.util';
  import { IBlockColorProxy, IModBlockHandler, IBlockSpritesProxy } from 'journeymap.client.mod';
  import { ColoredSprite } from 'journeymap.client.cartography.color';
  import { BakedQuad } from 'net.minecraft.client.renderer.block.model';

  interface BedBlockProxy extends Enum<BedBlockProxy> {}
  class BedBlockProxy extends Enum<BedBlockProxy> {
    static readonly INSTANCE: BedBlockProxy;
    deriveBlockColor(blockMD: BlockMD, chunkMD: ChunkMD, blockPos: BlockPos): number;
    getBlockColor(chunkMD: ChunkMD, blockMD: BlockMD, blockPos: BlockPos): number;
    static valueOf(name: string): BedBlockProxy;
    static values(): BedBlockProxy[];
  }


  interface BirchLeavesBlockProxy extends IBlockColorProxy {}
  class BirchLeavesBlockProxy extends IBlockColorProxy {
    deriveBlockColor(blockMD: BlockMD, chunkMD: ChunkMD, blockPos: BlockPos): number;
    static get instance(): BirchLeavesBlockProxy;
    getBlockColor(chunkMD: ChunkMD, blockMD: BlockMD, blockPos: BlockPos): number;
  }


  interface FlowerBlockProxy extends Enum<FlowerBlockProxy> {}
  class FlowerBlockProxy extends Enum<FlowerBlockProxy> {
    static readonly INSTANCE: FlowerBlockProxy;
    deriveBlockColor(blockMD: BlockMD, chunkMD: ChunkMD, blockPos: BlockPos): number;
    getBlockColor(chunkMD: ChunkMD, blockMD: BlockMD, blockPos: BlockPos): number;
    static valueOf(name: string): FlowerBlockProxy;
    static values(): FlowerBlockProxy[];
  }


  interface MaterialBlockColorProxy extends IBlockColorProxy {}
  class MaterialBlockColorProxy extends IBlockColorProxy {
    deriveBlockColor(blockMD: BlockMD, chunkMD: ChunkMD, blockPos: BlockPos): number;
    getBlockColor(chunkMD: ChunkMD, blockMD: BlockMD, blockPos: BlockPos): number;
  }


  interface PetalBlockProxy extends IBlockColorProxy {}
  class PetalBlockProxy extends IBlockColorProxy {
    deriveBlockColor(blockMD: BlockMD, chunkMD: ChunkMD, blockPos: BlockPos): number;
    static get instance(): PetalBlockProxy;
    getBlockColor(chunkMD: ChunkMD, blockMD: BlockMD, blockPos: BlockPos): number;
  }


  interface SpruceLeavesBlockProxy extends IBlockColorProxy {}
  class SpruceLeavesBlockProxy extends IBlockColorProxy {
    deriveBlockColor(blockMD: BlockMD, chunkMD: ChunkMD, blockPos: BlockPos): number;
    static get instance(): SpruceLeavesBlockProxy;
    getBlockColor(chunkMD: ChunkMD, blockMD: BlockMD, blockPos: BlockPos): number;
  }


  interface VanillaBlockColorProxy extends IBlockColorProxy {}
  class VanillaBlockColorProxy extends IBlockColorProxy {
    deriveBlockColor(blockMD: BlockMD, chunkMD: ChunkMD, blockPos: BlockPos): number;
    getBlockColor(chunkMD: ChunkMD, blockMD: BlockMD, blockPos: BlockPos): number;
    getColorMultiplier(chunkMD: ChunkMD, blockMD: BlockMD, blockPos: BlockPos, tintIndex: number): number;
    static getSpriteColor(blockMD: BlockMD, defaultColor: number, chunkMD: ChunkMD, blockPos: BlockPos): number;
    static setBlockColorToError(blockMD: BlockMD): number;
    static setBlockColorToMaterial(blockMD: BlockMD): number;
  }


  interface VanillaBlockHandler extends IModBlockHandler {}
  class VanillaBlockHandler extends IModBlockHandler {
    constructor();
    initialize(blockMD: BlockMD): void;
    postInitialize(blockMD: BlockMD): void;
  }


  interface VanillaBlockSpriteProxy extends IBlockSpritesProxy {}
  class VanillaBlockSpriteProxy extends IBlockSpritesProxy {
    addSprites(sprites: HashMap<string, ColoredSprite>, quads: BakedQuad[]): boolean;
    getSprites(blockMD: BlockMD, chunkMD: ChunkMD, blockPos: BlockPos): Collection<ColoredSprite>;
  }

}

declare module 'journeymap.client.model.block' {
  import { Comparable, Enum } from 'java.lang';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Dataset } from 'journeymap.client.model.block.BlockDataArrays';
  import { MapType } from 'journeymap.client.model.map';
  import { List, EnumSet, Set, Collection } from 'java.util';
  import { Block } from 'net.minecraft.world.level.block';
  import { ChunkMD } from 'journeymap.client.model.chunk';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { IBlockSpritesProxy, IBlockColorProxy } from 'journeymap.client.mod';

  interface BiomeMD extends Comparable<BiomeMD> {}
  class BiomeMD extends Comparable<BiomeMD> {
    static readonly THE_VOID: BiomeMD;
    static readonly EMPTY_ID: string;
    constructor(biome: Biome, id: string, addToPalette: boolean);
    compareTo(that: BiomeMD): number;
    equals(o: any): boolean;
    static get(biome: Biome): BiomeMD;
    static get(key: ResourceKey<Biome>): BiomeMD;
    get biomeId(): string;
    get fogColor(): number;
    get foliageColor(): number;
    get grassColor(): number;
    get waterColor(): number;
    getGrassColor(posX: number, posZ: number): number;
    hashCode(): number;
    set fogColor(color: number);
    set foliageColor(color: number);
    set grassColor(color: number);
    set waterColor(color: number);
    toString(): string;
  }


  class BlockCoordIntPair {
    x: number;
    z: number;
    constructor();

    constructor(x: number, z: number);
    equals(o: any): boolean;
    hashCode(): number;
    setLocation(x: number, z: number): void;
  }


  class BlockDataArrays {
    static areIdentical(arr: int[][], arr2: int[][]): boolean;
    clearAll(): void;
    get(mapType: MapType): Dataset;
  }


  interface BlockFlag extends Enum<BlockFlag> {}
  class BlockFlag extends Enum<BlockFlag> {
    static readonly Ignore: BlockFlag;
    static readonly Foliage: BlockFlag;
    static readonly Grass: BlockFlag;
    static readonly Water: BlockFlag;
    static readonly Fluid: BlockFlag;
    static readonly OpenToSky: BlockFlag;
    static readonly NoShadow: BlockFlag;
    static readonly Transparency: BlockFlag;
    static readonly Error: BlockFlag;
    static readonly Plant: BlockFlag;
    static readonly Crop: BlockFlag;
    static readonly NoTopo: BlockFlag;
    static readonly Force: BlockFlag;
    get key(): string;
    static valueOf(name: string): BlockFlag;
    static values(): BlockFlag[];
  }


  interface BlockMD extends Comparable<BlockMD> {}
  class BlockMD extends Comparable<BlockMD> {
    static readonly FlagsPlantAndCrop: EnumSet;
    static readonly FlagsNormal: EnumSet;
    static readonly AIRBLOCK: BlockMD;
    static readonly VOIDBLOCK: BlockMD;
    addFlags(...addFlags: BlockFlag[]): void;
    addFlags(addFlags: Collection<BlockFlag>): void;
    clearColor(): void;
    compareTo(that: BlockMD): number;
    equals(o: any): boolean;
    generateColor(chunkMD: ChunkMD, blockPos: BlockPos): number;
    generateColor(): number;
    static get(blockState: BlockState): BlockMD;
    static get all(): Set<BlockMD>;
    static get allMinecraft(): Set<BlockMD>;
    static get allValid(): Set<BlockMD>;
    get alpha(): number;
    get block(): Block;
    get blockColorProxy(): IBlockColorProxy;
    get blockDomain(): string;
    get blockId(): string;
    get blockSpritesProxy(): IBlockSpritesProxy;
    get blockState(): BlockState;
    get blockStateId(): string;
    get flags(): EnumSet<BlockFlag>;
    get name(): string;
    get textureColor(): number;
    get validStateMDs(): Set<BlockMD>;
    getBlockColor(chunkMD: ChunkMD, blockPos: BlockPos): number;
    static getBlockId(blockMD: BlockMD): string;
    static getBlockId(blockState: BlockState): string;
    static getBlockMD(chunkMd: ChunkMD, blockPos: BlockPos): BlockMD;
    static getBlockMDFromChunkLocal(chunkMd: ChunkMD, localX: number, y: number, localZ: number): BlockMD;
    static getBlockName(block: Block): string;
    static getBlockStateId(blockMD: BlockMD): string;
    getTextureColor(chunkMD: ChunkMD, blockPos: BlockPos): number;
    hasAnyFlag(checkFlags: EnumSet<BlockFlag>): boolean;
    hasColor(): boolean;
    hasFlag(checkFlag: BlockFlag): boolean;
    hasNoShadow(): boolean;
    hasTransparency(): boolean;
    hashCode(): number;
    isFire(): boolean;
    isFluid(): boolean;
    isFoliage(): boolean;
    isGrass(): boolean;
    isIce(): boolean;
    isIgnore(): boolean;
    isLava(): boolean;
    isLeavesBlock(): boolean;
    isVanillaBlock(): boolean;
    isWater(): boolean;
    removeFlags(...removeFlags: BlockFlag[]): void;
    removeFlags(removeFlags: Collection<BlockFlag>): void;
    static reset(): void;
    set alpha(alpha: number);
    set blockColorProxy(blockColorProxy: IBlockColorProxy);
    set blockSpritesProxy(blockSpritesProxy: IBlockSpritesProxy);
    set flags(flags: EnumSet<BlockFlag>);
    static setAllFlags(block: Block, ...flags: BlockFlag[]): void;
    setColor(baseColor: number): number;
    toString(): string;
  }

}

declare module 'journeymap.client.model.block.BiomeMD' {
  import { CacheLoader as com_google_common_cache_CacheLoader } from 'com.google.common.cache';
  import { ResourceKey } from 'net.minecraft.resources';
  import { BiomeMD } from 'journeymap.client.model.block';
  import { Biome } from 'net.minecraft.world.level.biome';

  interface CacheLoader extends com_google_common_cache_CacheLoader<ResourceKey, BiomeMD> {}
  class CacheLoader extends com_google_common_cache_CacheLoader<ResourceKey, BiomeMD> {
    load(key: ResourceKey<Biome>): BiomeMD;
  }

}

declare module 'journeymap.client.model.block.BlockDataArrays' {
  import { MapType } from 'journeymap.client.model.map';
  import { Integer, Float, Boolean } from 'java.lang';
  import { T[] } from 'journeymap.client.model.block';

  class Dataset {
    constructor(mapType: MapType);
    booleans(): DataArray<boolean>;
    clear(): void;
    floats(): DataArray<number>;
    ints(): DataArray<number>;
    objects(): DataArray<any>;
  }


  class DataArray<T = any> {
    clear(name: string): void;
    copy(name: string): T[][];
    copyTo(srcName: string, dstName: string): void;
    get(name: string): T[][];
    get(name: string, x: number, z: number): T;
    has(name: string): boolean;
    set(name: string, x: number, z: number, value: T): boolean;
  }

}

declare module 'journeymap.client.model.block.BlockMD' {
  import { CacheLoader as com_google_common_cache_CacheLoader } from 'com.google.common.cache';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockMD } from 'journeymap.client.model.block';

  interface CacheLoader extends com_google_common_cache_CacheLoader<BlockState, BlockMD> {}
  class CacheLoader extends com_google_common_cache_CacheLoader<BlockState, BlockMD> {
    load(blockState: BlockState): BlockMD;
  }

}

declare module 'journeymap.client.model.chunk' {
  import { LevelChunk, DataLayer } from 'net.minecraft.world.level.chunk';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockPos, Holder } from 'net.minecraft.core';
  import { BlockMD, BlockDataArrays } from 'journeymap.client.model.block';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Serializable } from 'java.io';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { Boolean, Integer, Float } from 'java.lang';
  import { ChunkPos, Level } from 'net.minecraft.world.level';
  import { MapType } from 'journeymap.client.model.map';
  import { DataArray } from 'journeymap.client.model.block.BlockDataArrays';
  import { CompoundTag } from 'net.minecraft.nbt';

  class ChunkMD {
    static readonly PROP_IS_SLIME_CHUNK: string;
    static readonly PROP_LOADED: string;
    static readonly PROP_LAST_RENDERED: string;
    constructor(chunk: LevelChunk);

    constructor(chunk: LevelChunk, forceRetain: boolean, lights: DataLayer);

    constructor(chunk: LevelChunk, forceRetain: boolean);
    canBlockSeeTheSky(localX: number, y: number, localZ: number): boolean;
    ceiling(localX: number, localZ: number): number;
    equals(obj: any): boolean;
    fromNbt(): boolean;
    get blockData(): BlockDataArrays;
    get chunk(): LevelChunk;
    get coord(): ChunkPos;
    get dimension(): ResourceKey<Level>;
    get loaded(): number;
    get longCoord(): number;
    get minY(): number;
    get world(): ClientLevel;
    get worldActualHeight(): number;
    getBiome(pos: BlockPos): Biome;
    getBiomeHolder(pos: BlockPos): Holder<Biome>;
    getBiomeKey(pos: BlockPos): ResourceKey<Biome>;
    getBlockDataBooleans(mapType: MapType): DataArray<boolean>;
    getBlockDataFloats(mapType: MapType): DataArray<number>;
    getBlockDataInts(mapType: MapType): DataArray<number>;
    getBlockMD(blockPos: BlockPos): BlockMD;
    getBlockMD(localX: number, y: number, localZ: number): BlockMD;
    getBlockPos(localX: number, y: number, localZ: number): BlockPos;
    getBlockState(localX: number, y: number, localZ: number): BlockState;
    getBlockState(blockPos: BlockPos): BlockState;
    getChunkBlockState(blockPos: BlockPos): BlockState;
    getHeight(blockPos: BlockPos): number;
    getLastRendered(mapType: MapType): number;
    getLightOpacity(blockMD: BlockMD, localX: number, y: number, localZ: number): number;
    getPrecipitationHeight(localX: number, localZ: number): number;
    getPrecipitationHeight(blockPos: BlockPos): number;
    getProperty(name: string): Serializable;
    getProperty(name: string, defaultValue: Serializable): Serializable;
    getSavedLightValue(localX: number, y: number, localZ: number): number;
    hasChunk(): boolean;
    hasNoSky(): boolean;
    hasRetainedChunk(): boolean;
    hashCode(): number;
    static isSlimeChunk(chunk: LevelChunk): boolean;
    resetBlockData(mapType: MapType): void;
    resetRenderTime(mapType: MapType): void;
    resetRenderTimes(): void;
    setProperty(name: string, value: Serializable): Serializable;
    setRendered(mapType: MapType): number;
    stopChunkRetention(): void;
    toString(): string;
    toWorldX(localX: number): number;
    toWorldZ(localZ: number): number;
  }


  interface NBTChunkMD extends ChunkMD {}
  class NBTChunkMD extends ChunkMD {
    constructor(chunk: LevelChunk, chunkPos: ChunkPos, data: CompoundTag, mapType: MapType);
    canBlockSeeTheSky(localX: number, y: number, localZ: number): boolean;
    fromNbt(): boolean;
    get chunk(): LevelChunk;
    getBiome(blockPos: BlockPos): Biome;
    getBlockMD(blockPos: BlockPos): BlockMD;
    getBlockMD(localX: number, y: number, localZ: number): BlockMD;
    getBlockState(blockPos: BlockPos): BlockState;
    getBlockState(localX: number, y: number, localZ: number): BlockState;
    getChunkBlockState(blockPos: BlockPos): BlockState;
    getGetLightValue(blockPos: BlockPos): number;
    getHeight(blockPos: BlockPos): number;
    getPrecipitationHeight(localX: number, localZ: number): number;
    getPrecipitationHeight(blockPos: BlockPos): number;
    getSavedLightValue(localX: number, y: number, localZ: number): number;
    getTopY(blockPos: BlockPos): number;
    hasChunk(): boolean;
  }

}

declare module 'journeymap.client.model.chunk.ChunkMD' {
  import { RuntimeException } from 'java.lang';

  interface ChunkMissingException extends RuntimeException {}
  class ChunkMissingException extends RuntimeException {
  }

}

declare module 'journeymap.client.model.entity' {
  import { WrappedEntity } from 'journeymap.api.v2.client.entity';
  import { Serializable } from 'java.io';
  import { WeakReference } from 'java.lang.ref';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Boolean, Class } from 'java.lang';
  import { LivingEntity, Entity } from 'net.minecraft.world.entity';
  import { Vec3, AABB } from 'net.minecraft.world.phys';
  import { BlockPos } from 'net.minecraft.core';
  import { Component } from 'net.minecraft.network.chat';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { Level } from 'net.minecraft.world.level';
  import { List, Map } from 'java.util';
  import { EntityMapComparator, IconData } from 'journeymap.client.model.entity.EntityHelper';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ModelPart } from 'net.minecraft.client.model.geom';

  interface EntityDTO extends WrappedEntity, Serializable {}
  class EntityDTO extends WrappedEntity {
    readonly entityId: string;
    entityRef: WeakReference;
    entityTextureLocation: ResourceLocation;
    entityIconLocation: ResourceLocation;
    entityTypeLocation: ResourceLocation;
    hasCustomIcon: boolean;
    drawOutline: boolean;
    iconLocation: string;
    hostile: boolean;
    aggro: boolean;
    posX: number;
    posY: number;
    posZ: number;
    chunkCoordX: number;
    chunkCoordY: number;
    chunkCoordZ: number;
    heading: number;
    serializedCustomName: string;
    owner: string;
    profession: string;
    username: string;
    biome: string;
    dimension: ResourceKey;
    underground: boolean;
    invisible: boolean;
    sneaking: boolean;
    passiveAnimal: boolean;
    ambientCreature: boolean;
    npc: boolean;
    color: number;
    labelColor: number;
    disabled: boolean;
    get aggro(): boolean;
    get biome(): Biome;
    get chunkPos(): BlockPos;
    get color(): number;
    get customName(): Component;
    get dimension(): ResourceKey<Level>;
    get entityIconLocation(): ResourceLocation;
    get entityId(): string;
    get entityRef(): WeakReference<Entity>;
    get entityToolTips(): Component[];
    get heading(): number;
    get hostile(): boolean;
    get labelColor(): number;
    get owner(): Entity;
    get playerName(): string;
    get position(): Vec3;
    get profession(): string;
    get underground(): boolean;
    isAmbientCreature(): boolean;
    isDisabled(): boolean;
    isInvisible(): boolean;
    isNpc(): boolean;
    isPassiveAnimal(): boolean;
    isSneaking(): boolean;
    set color(color: number);
    set customName(customName: string);
    set entityIconLocation(entityIconLocation: ResourceLocation);
    set entityToolTips(entityToolTips: Component[]);
    set labelColor(labelColor: number);
    setCustomName(customName: Component): void;
    setDisable(disable: boolean): void;
    setDrawOutline(drawOutline: boolean): void;
    update(entity: LivingEntity, hostile: boolean): void;
  }


  class EntityHelper {
    static readonly entityMapComparator: EntityMapComparator;
    static buildEntityIdMap(list: EntityDTO[], sort: boolean): Map<string, EntityDTO>;
    static get ambientCreaturesNearby(): EntityDTO[];
    static get animalsNearby(): EntityDTO[];
    static get mobsNearby(): EntityDTO[];
    static get playersNearby(): EntityDTO[];
    static get villagersNearby(): EntityDTO[];
    static getBoundingBox(player: Player, lateralDistance: number, verticalDistance: number): AABB;
    static getEntitiesNearby(timerName: string, maxEntities: number, hostile: boolean, entities: Class<Entity>[], ...entityClasses: Class[]): EntityDTO[];
    static getIconData(entity: Entity): IconData;
    static isPassive(entityLiving: LivingEntity): boolean;
  }


  class GeckoLibHelper {
    static getIconData(entity: Entity): IconData;
    static getModelParts(entity: Entity, mobLocation: ResourceLocation, onlyHead: boolean): ModelPart[];
  }

}

declare module 'journeymap.client.model.entity.EntityDTO' {
  import { ExclusionStrategy, FieldAttributes } from 'com.google.gson';
  import { Class } from 'java.lang';
  import { CacheLoader } from 'com.google.common.cache';
  import { Entity } from 'net.minecraft.world.entity';
  import { EntityDTO } from 'journeymap.client.model.entity';

  interface EntityDTOExclusionStrategy extends ExclusionStrategy {}
  class EntityDTOExclusionStrategy extends ExclusionStrategy {
    shouldSkipClass(clazz: Class<any>): boolean;
    shouldSkipField(f: FieldAttributes): boolean;
  }


  interface SimpleCacheLoader extends CacheLoader<Entity, EntityDTO> {}
  class SimpleCacheLoader extends CacheLoader<Entity, EntityDTO> {
    load(entity: Entity): EntityDTO;
  }

}

declare module 'journeymap.client.model.entity.EntityHelper' {
  class IconData {
    toString(): string;
  }

}

declare module 'journeymap.client.model.grid' {
  import { Style } from 'journeymap.client.model.grid.GridSpec';
  import { Color } from 'java.awt';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { Integer } from 'java.lang';
  import { MapType } from 'journeymap.client.model.map';

  class GridSpec {
    readonly style: Style;
    readonly red: number;
    readonly green: number;
    readonly blue: number;
    readonly alpha: number;
    constructor(style: Style, color: Color, alpha: number);

    constructor(style: Style, red: number, green: number, blue: number, alpha: number);
    clone(): GridSpec;
    get color(): number;
    get colorX(): number;
    get colorY(): number;
    getRenderType(zoom: number): RenderType;
    setColorCoords(x: number, y: number): GridSpec;
  }


  class GridSpecs {
    static readonly DEFAULT_DAY: GridSpec;
    static readonly DEFAULT_NIGHT: GridSpec;
    static readonly DEFAULT_UNDERGROUND: GridSpec;
    constructor();

    constructor(day: GridSpec, night: GridSpec, underground: GridSpec);
    clone(): GridSpecs;
    getSpec(mapType: MapType): GridSpec;
    setSpec(mapType: MapType, newSpec: GridSpec): void;
    updateFrom(other: GridSpecs): void;
  }

}

declare module 'journeymap.client.model.grid.GridSpec' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Style extends Enum<Style> {}
  class Style extends Enum<Style> {
    static readonly Squares: Style;
    static readonly SquaresWithRegion: Style;
    static readonly GridRegion: Style;
    displayName(): string;
    get key(): string;
    hasChunkLines(): boolean;
    hasRegionLines(): boolean;
    static valueOf(name: string): Style;
    static values(): Style[];
  }

}

declare module 'journeymap.client.model.map' {
  import { AtomicBoolean } from 'java.util.concurrent.atomic';
  import { Minecraft } from 'net.minecraft.client';
  import { Player } from 'net.minecraft.world.entity.player';
  import { InGameMapProperties, MapProperties } from 'journeymap.client.properties';
  import { Name } from 'journeymap.client.model.map.MapType';
  import { File } from 'java.io';
  import { List } from 'java.util';
  import { DrawStep, DrawWayPointStep, WaypointDrawStepFactory, RadarDrawStepFactory } from 'journeymap.client.render.draw';
  import { Renderer } from 'journeymap.client.render.map';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Level } from 'net.minecraft.world.level';
  import { IntegerField } from 'journeymap.common.properties.config';
  import { Integer } from 'java.lang';
  import { MapType as context_MapType } from 'Context';
  import { EntityDTO } from 'journeymap.client.model.entity';

  class MapState {
    readonly minZoom: number;
    readonly maxZoom: number;
    follow: AtomicBoolean;
    playerLastPos: string;
    constructor();
    generateDrawSteps(mc: Minecraft, renderer: Renderer, waypointRenderer: WaypointDrawStepFactory, radarRenderer: RadarDrawStepFactory, mapProperties: InGameMapProperties, checkWaypointDistance: boolean): void;
    get dimension(): ResourceKey<Level>;
    get drawSteps(): DrawStep[];
    get drawWaypointSteps(): DrawWayPointStep[];
    get lastMapTypeChange(): number;
    get lastSlice(): IntegerField;
    get mapType(): MapType;
    get playerBiome(): string;
    get worldDir(): File;
    get zoom(): number;
    getNextMapType(name: Name): Name;
    isBiomeMappingAllowed(): boolean;
    isCaveMappingAllowed(): boolean;
    isCaveMappingEnabled(): boolean;
    isSurfaceMappingAllowed(): boolean;
    isTopoMappingAllowed(): boolean;
    isUnderground(): boolean;
    minimapZoomIn(): boolean;
    minimapZoomOut(): boolean;
    refresh(mc: Minecraft, player: Player, mapProperties: InGameMapProperties): void;
    requireRefresh(): void;
    resetMapType(): void;
    set mapType(mapTypeName: Name);
    set zoom(zoom: number);
    setForceRefreshState(force: boolean): void;
    setMapType(mapType: MapType): MapType;
    shouldRefresh(mc: Minecraft, mapProperties: MapProperties): boolean;
    toggleMapType(): MapType;
    updateLastRefresh(): void;
  }


  class MapType {
    readonly vSlice: number;
    readonly name: Name;
    readonly dimension: ResourceKey;
    readonly apiMapType: context_MapType;
    constructor(name: Name, vSlice: number, dimension: ResourceKey<Level>);
    static biome(player: EntityDTO): MapType;
    static biome(dimension: ResourceKey<Level>): MapType;
    static day(dimension: ResourceKey<Level>): MapType;
    static day(player: EntityDTO): MapType;
    equals(o: any): boolean;
    static from(name: Name, vSlice: number, dimension: ResourceKey<Level>): MapType;
    static from(vSlice: number, dimension: ResourceKey<Level>): MapType;
    static from(name: Name, player: EntityDTO): MapType;
    static fromApiContextMapType(apiMapType: context_MapType, vSlice: number, dimension: ResourceKey<Level>): MapType;
    get shader(): number;
    hashCode(): number;
    isAllowed(): boolean;
    isBiome(): boolean;
    isDay(): boolean;
    isDayOrNight(): boolean;
    isNight(): boolean;
    isSurface(): boolean;
    isSurfaceType(): boolean;
    isTopo(): boolean;
    isUnderground(): boolean;
    static night(dimension: ResourceKey<Level>): MapType;
    static night(player: EntityDTO): MapType;
    static none(): MapType;
    static toCacheKey(name: Name, vSlice: number, dimension: ResourceKey<Level>): string;
    toCacheKey(): string;
    toString(): string;
    static topo(dimension: ResourceKey<Level>): MapType;
    static topo(player: EntityDTO): MapType;
    static underground(player: EntityDTO): MapType;
    static underground(vSlice: number, dimension: ResourceKey<Level>): MapType;
  }

}

declare module 'journeymap.client.model.map.MapType' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Name extends Enum<Name> {}
  class Name extends Enum<Name> {
    static readonly any: Name;
    static readonly day: Name;
    static readonly night: Name;
    static readonly underground: Name;
    static readonly surface: Name;
    static readonly topo: Name;
    static readonly biome: Name;
    static readonly none: Name;
    get key(): string;
    static valueOf(name: string): Name;
    static values(): Name[];
  }

}

declare module 'journeymap.client.model.region' {
  import { RegionTexture, ComparableNativeImage } from 'journeymap.client.texture';
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { MapType, MapState } from 'journeymap.client.model.map';
  import { LoadingCache, CacheBuilder, RemovalNotification } from 'com.google.common.cache';
  import { Comparable, Enum } from 'java.lang';
  import { File } from 'java.io';
  import { Path } from 'java.nio.file';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Level, ChunkPos } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { List, Comparator, Collection } from 'java.util';
  import { Key } from 'journeymap.client.model.region.RegionImageSet';
  import { ChunkMD } from 'journeymap.client.model.chunk';

  class ImageHolder {
    clear(): void;
    get imageTimestamp(): number;
    get texture(): RegionTexture;
    hasTexture(): boolean;
    toString(): string;
    writeNextIO(): boolean;
  }


  class ImageSet {
    clear(): void;
    equals(var1: any): boolean;
    getImage(mapType: MapType): NativeImage;
    hashCode(): number;
    toString(): string;
    updatedSince(mapType: MapType, time: number): boolean;
    writeToDisk(force: boolean): number;
    writeToDiskAsync(force: boolean): number;
  }


  class RegionCacheManager {
    readonly textureCacheAgeSecs: number;
    initRegionHoldersCache(builder: CacheBuilder<any, any>): LoadingCache<RegionKey, RegionHolder>;
    load(key: RegionKey): RegionHolder;
    onRemoval(notification: RemovalNotification<RegionKey, RegionHolder>): void;
  }


  interface RegionCoord extends Comparable<RegionCoord> {}
  class RegionCoord extends Comparable<RegionCoord> {
    static readonly SIZE: number;
    readonly worldDir: File;
    readonly dimDir: Path;
    readonly regionX: number;
    readonly regionZ: number;
    readonly dimension: ResourceKey;
    constructor(worldDir: File, regionX: number, regionZ: number, dimension: ResourceKey<Level>);

    constructor(worldDir: File, regionX: number, regionZ: number, dimension: ResourceKey<Level>, createCache: boolean);
    cacheKey(): string;
    compare(o1: RegionCoord, o2: RegionCoord): number;
    compareTo(o: RegionCoord): number;
    equals(o: any): boolean;
    exists(): boolean;
    static fromChunkPos(worldDir: File, mapType: MapType, chunkX: number, chunkZ: number): RegionCoord;
    static fromRegionPos(worldDir: File, regionX: number, regionZ: number, dimension: ResourceKey<Level>): RegionCoord;
    get centerChunk(): ChunkPos;
    get chunkCoordsInRegion(): ChunkPos[];
    get fileName(): string;
    get maxChunkCoord(): ChunkPos;
    get maxChunkX(): number;
    get maxChunkZ(): number;
    get middleBlock(): BlockPos;
    get minChunkCoord(): ChunkPos;
    get minChunkX(): number;
    get minChunkZ(): number;
    static getComparator(center: RegionCoord): Comparator<RegionCoord>;
    static getMaxChunkX(rX: number): number;
    static getMaxChunkZ(rZ: number): number;
    static getMinChunkX(rX: number): number;
    static getMinChunkZ(rZ: number): number;
    static getRegionPos(chunkPos: number): number;
    getXOffset(chunkX: number): number;
    getZOffset(chunkZ: number): number;
    hashCode(): number;
    static toCacheKey(dimDir: Path, regionX: number, regionZ: number): string;
    toString(): string;
  }


  class RegionHolder {
    constructor(key: RegionKey);
    clear(): void;
    writeImage(b: boolean): number;
  }


  interface RegionImageCache extends Enum<RegionImageCache> {}
  class RegionImageCache extends Enum<RegionImageCache> {
    static readonly INSTANCE: RegionImageCache;
    accept(dir: File, name: string): boolean;
    clear(): void;
    deleteMap(state: MapState, allDims: boolean): boolean;
    deleteRegion(coord: RegionCoord, state: MapState): boolean;
    flushToDisk(force: boolean): void;
    flushToDiskAsync(force: boolean): void;
    get lastFlush(): number;
    get regionImageSets(): Collection<RegionImageSet>;
    getChangedSince(mapType: MapType, time: number): RegionCoord[];
    getRegionImageSet(chunkMd: ChunkMD, mapType: MapType): RegionImageSet;
    getRegionImageSet(rCoord: RegionCoord): RegionImageSet;
    getRegionImageSet(rCoordKey: Key): RegionImageSet;
    initRegionImageSetsCache(builder: CacheBuilder<any, any>): LoadingCache<Key, RegionImageSet>;
    isDirtySince(rc: RegionCoord, mapType: MapType, time: number): boolean;
    load(key: Key): RegionImageSet;
    onRemoval(notification: RemovalNotification<Key, RegionImageSet>): void;
    updateTextures(forceFlush: boolean, async: boolean): void;
    static valueOf(name: string): RegionImageCache;
    static values(): RegionImageCache[];
  }


  interface RegionImageSet extends ImageSet {}
  class RegionImageSet extends ImageSet {
    constructor(key: Key);
    equals(obj: any): boolean;
    finishChunkUpdates(): void;
    get oldestTimestamp(): number;
    get regionCoord(): RegionCoord;
    getChunkImage(chunkMd: ChunkMD, mapType: MapType): ComparableNativeImage;
    getExistingHolder(mapType: MapType): ImageHolder;
    getHolder(mapType: MapType): ImageHolder;
    getHolderAsyncLoad(mapType: MapType): ImageHolder;
    hasChunkUpdates(): boolean;
    hashCode(): number;
    setChunkImage(chunkMd: ChunkMD, mapType: MapType, chunkImage: ComparableNativeImage): void;
  }


  class RegionKey {
    equals(o: any): boolean;
    static from(rCoord: RegionCoord, mapType: MapType): RegionKey;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'journeymap.client.model.region.RegionImageSet' {
  import { RegionCoord } from 'journeymap.client.model.region';

  class Key {
    equals(o: any): boolean;
    static from(rCoord: RegionCoord): Key;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'journeymap.client.properties' {
  import { Category } from 'journeymap.common.properties.catagory';
  import { File } from 'java.io';
  import { Map, List } from 'java.util';
  import { ConfigField, StringField, IntegerField, BooleanField, EnumField, FloatField, CustomField } from 'journeymap.common.properties.config';
  import { PropertiesBase } from 'journeymap.common.properties';
  import { Comparable, Integer } from 'java.lang';
  import { GridSpecs } from 'journeymap.client.model.grid';

  interface AddonProperties extends ClientPropertiesBase {}
  class AddonProperties extends ClientPropertiesBase {
    get configFields(): Map<string, ConfigField<any>>;
    get file(): File;
    get fileName(): string;
    get name(): string;
    get parentCategory(): Category;
    set name(name: string);
    setFieldMap(fields: Map<string, ConfigField<any>>): AddonProperties;
  }


  class ClientCategory {
    static readonly values: List;
    static readonly MiniMap1: Category;
    static readonly MiniMap2: Category;
    static readonly FullMap: Category;
    static readonly WebMap: Category;
    static readonly Waypoint: Category;
    static readonly WaypointBeacon: Category;
    static readonly Cartography: Category;
    static readonly MapFilters: Category;
    static readonly Advanced: Category;
    static readonly AdvancedMapRendering: Category;
    static readonly MinimapPosition: Category;
    static create(name: string, key: string): Category;
    static create(name: string, key: string, unique: boolean): Category;
    static create(name: string, key: string, tooltip: string): Category;
    static valueOf(name: string): Category;
  }


  interface ClientPropertiesBase extends PropertiesBase {}
  class ClientPropertiesBase extends PropertiesBase {
    copyToStandardConfig(): boolean;
    copyToWorldConfig(overwrite: boolean): boolean;
    get file(): File;
    get fileName(): string;
    get headers(): string[];
    getCategoryByName(name: string): Category;
    isValid(fix: boolean): boolean;
    isWorldConfig(): boolean;
    updateFrom<T extends PropertiesBase>(otherInstance: T): void;
  }


  interface CoreProperties extends Comparable<CoreProperties>, ClientPropertiesBase {}
  class CoreProperties extends Comparable<CoreProperties> {
    static readonly PATTERN_COLOR: string;
    readonly logLevel: StringField;
    readonly autoMapPoll: IntegerField;
    readonly cacheAnimalsData: IntegerField;
    readonly cacheMobsData: IntegerField;
    readonly cachePlayerData: IntegerField;
    readonly cachePlayersData: IntegerField;
    readonly cacheVillagersData: IntegerField;
    readonly announceMod: BooleanField;
    readonly checkUpdates: BooleanField;
    readonly recordCacheStats: BooleanField;
    readonly themeName: StringField;
    readonly caveIgnoreGlass: BooleanField;
    readonly mapOnlyPlayerChunk: BooleanField;
    readonly mapBathymetry: BooleanField;
    readonly mapWaterBiomeColors: BooleanField;
    readonly mapTopography: BooleanField;
    readonly mapBiome: BooleanField;
    readonly mapTransparency: BooleanField;
    readonly mapCaveLighting: BooleanField;
    readonly mapAntialiasing: BooleanField;
    readonly mapPlantShadows: BooleanField;
    readonly mapShadows: BooleanField;
    readonly mapPlants: BooleanField;
    readonly mapCrops: BooleanField;
    readonly mapBlendGrass: BooleanField;
    readonly mapBlendFoliage: BooleanField;
    readonly mapBlendWater: BooleanField;
    readonly mapSurfaceAboveCaves: BooleanField;
    readonly caveBlackAsClear: BooleanField;
    readonly renderDistanceCaveMax: IntegerField;
    readonly renderDistanceSurfaceMax: IntegerField;
    readonly renderDelay: IntegerField;
    readonly topoMax: IntegerField;
    readonly revealShape: EnumField;
    readonly caveModeThreshold: IntegerField;
    readonly alwaysMapCaves: BooleanField;
    readonly alwaysMapSurface: BooleanField;
    readonly ignoreHeightmaps: BooleanField;
    readonly ignoreSnow: BooleanField;
    readonly mipmapLevels: IntegerField;
    readonly legacyIcons: BooleanField;
    readonly allowMiniMapBehindScreens: BooleanField;
    readonly maxAnimalsData: IntegerField;
    readonly maxAmbientCreaturesData: IntegerField;
    readonly maxMobsData: IntegerField;
    readonly maxPlayersData: IntegerField;
    readonly maxVillagersData: IntegerField;
    readonly hideSneakingEntities: BooleanField;
    readonly hideSpectators: BooleanField;
    readonly radarLateralDistance: IntegerField;
    readonly radarVerticalDistance: IntegerField;
    readonly dataCachingEnabled: BooleanField;
    readonly glErrorChecking: BooleanField;
    readonly seedId: BooleanField;
    readonly serverIp: BooleanField;
    readonly playerIconFade: BooleanField;
    readonly mobIconFade: BooleanField;
    readonly mappingEnabled: BooleanField;
    readonly optionsManagerViewed: StringField;
    readonly splashViewed: StringField;
    readonly gridSpecs: GridSpecs;
    readonly colorPassive: StringField;
    readonly colorPassiveLabel: StringField;
    readonly colorHostile: StringField;
    readonly colorHostileLabel: StringField;
    readonly colorPet: StringField;
    readonly colorPetLabel: StringField;
    readonly colorVillager: StringField;
    readonly colorVillagerLabel: StringField;
    readonly colorPlayer: StringField;
    readonly colorPlayerLabel: StringField;
    readonly colorSelf: StringField;
    readonly initialSortOrder: EnumField;
    readonly sortDescending: BooleanField;
    readonly dayShader: StringField;
    readonly nightShader: StringField;
    readonly biomeShader: StringField;
    readonly topoShader: StringField;
    readonly caveShader: StringField;
    readonly netherShader: StringField;
    readonly colorPickerHistory: List;
    clearMobColors(): void;
    compareTo(other: CoreProperties): number;
    get name(): string;
    getColor(colorField: StringField): number;
    isValid(fix: boolean): boolean;
    updateFrom<T extends PropertiesBase>(otherInstance: T): void;
  }


  interface FullMapProperties extends InGameMapProperties {}
  class FullMapProperties extends InGameMapProperties {
    readonly showKeys: BooleanField;
    readonly showThemeButton: BooleanField;
    readonly showPlayerLoc: BooleanField;
    readonly showMouseLoc: BooleanField;
    readonly minimalMode: BooleanField;
    constructor();
    get name(): string;
    postLoad(isNew: boolean): void;
  }


  interface InGameMapProperties extends MapProperties {}
  class InGameMapProperties extends MapProperties {
    readonly playerDisplay: EnumField;
    readonly selfDisplayScale: FloatField;
    readonly playerDisplayScale: FloatField;
    readonly showPlayerHeading: BooleanField;
    readonly mobDisplay: EnumField;
    readonly mobDisplayScale: FloatField;
    readonly showMobHeading: BooleanField;
    readonly showMobs: BooleanField;
    readonly showAnimals: BooleanField;
    readonly showAmbientCreatures: BooleanField;
    readonly showVillagers: BooleanField;
    readonly showPets: BooleanField;
    readonly showPlayers: BooleanField;
    readonly fontScale: FloatField;
    readonly showWaypointLabels: BooleanField;
    readonly waypointLabelScale: FloatField;
    readonly waypointIconScale: FloatField;
    readonly locationFormatVerbose: BooleanField;
    readonly locationFormat: StringField;
    get propertiesId(): number;
    set propertiesId(id: number);
  }


  interface MapProperties extends Comparable<MapProperties>, ClientPropertiesBase {}
  class MapProperties extends Comparable<MapProperties> {
    readonly showOffScreenPlayers: BooleanField;
    readonly showWaypoints: BooleanField;
    readonly showSelf: BooleanField;
    readonly showGrid: BooleanField;
    readonly showCaves: BooleanField;
    readonly showPlayerNames: BooleanField;
    readonly showTeamNames: BooleanField;
    readonly showEntityNames: BooleanField;
    readonly showHostileNames: BooleanField;
    readonly showPassiveNames: BooleanField;
    readonly showAmbientNames: BooleanField;
    readonly showPetNames: BooleanField;
    readonly showNpcNames: BooleanField;
    readonly showVillagerNames: BooleanField;
    readonly showNoIconNames: BooleanField;
    readonly preferredMapType: EnumField;
    readonly zoomLevel: IntegerField;
    compareTo(other: MapProperties): number;
  }


  interface MiniMapProperties extends InGameMapProperties {}
  class MiniMapProperties extends InGameMapProperties {
    readonly enabled: BooleanField;
    readonly showDayNight: BooleanField;
    readonly minimapLockedMapType: StringField;
    readonly caveLayer: IntegerField;
    readonly info1Label: StringField;
    readonly info1LabelPosition: EnumField;
    readonly info2Label: StringField;
    readonly info2LabelPosition: EnumField;
    readonly info3Label: StringField;
    readonly info3LabelPosition: EnumField;
    readonly info4Label: StringField;
    readonly info4LabelPosition: EnumField;
    readonly infoSlotAlpha: FloatField;
    readonly infoSlotFontScale: FloatField;
    readonly infoSlotTimeFormat: StringField;
    readonly systemTimeRealFormat: StringField;
    readonly reticleOrientation: EnumField;
    readonly shape: EnumField;
    readonly sizePercent: IntegerField;
    readonly frameAlpha: IntegerField;
    readonly terrainAlpha: IntegerField;
    readonly backgroundAlpha: FloatField;
    readonly orientation: EnumField;
    readonly compassFontScale: FloatField;
    readonly showCompass: BooleanField;
    readonly showReticle: BooleanField;
    readonly positionX: FloatField;
    readonly positionY: FloatField;
    readonly moveEffectIcons: BooleanField;
    readonly hideEffectIcons: BooleanField;
    readonly effectTranslateX: IntegerField;
    readonly effectTranslateY: IntegerField;
    readonly effectVertical: BooleanField;
    readonly effectReversed: BooleanField;
    readonly minimapKeyMovementSpeed: FloatField;
    readonly position: EnumField;
    constructor(id: number);
    get id(): number;
    get name(): string;
    get size(): number;
    isActive(): boolean;
    setActive(active: boolean): void;
    updateFrom<T extends PropertiesBase>(otherInstance: T): void;
  }


  interface RenderingProperties extends Comparable<CoreProperties>, ClientPropertiesBase {}
  class RenderingProperties extends Comparable<CoreProperties> {
    readonly shadingSlopeMin: FloatField;
    readonly shadingSlopeMax: FloatField;
    readonly shadingPrimaryDownslopeMultiplier: FloatField;
    readonly shadingPrimaryUpslopeMultiplier: FloatField;
    readonly shadingSecondaryDownslopeMultiplier: FloatField;
    readonly shadingSecondaryUpslopeMultiplier: FloatField;
    readonly tweakMoonlightLevel: FloatField;
    readonly tweakBrightenDaylightDiff: FloatField;
    readonly tweakBrightenLightsourceBlock: FloatField;
    readonly tweakMinimumDarkenNightWater: FloatField;
    readonly tweakWaterColorBlend: FloatField;
    readonly tweakSurfaceAmbientColor: CustomField;
    readonly tweakNetherAmbientColor: CustomField;
    readonly tweakEndAmbientColor: CustomField;
    compareTo(other: CoreProperties): number;
    get name(): string;
    updateFrom<T extends PropertiesBase>(otherInstance: T): void;
  }


  interface TopoProperties extends Comparable<TopoProperties>, ClientPropertiesBase {}
  class TopoProperties extends Comparable<TopoProperties> {
    readonly showContour: BooleanField;
    readonly landContour: StringField;
    readonly waterContour: StringField;
    readonly land: StringField;
    readonly water: StringField;
    compareTo(other: TopoProperties): number;
    get headers(): string[];
    get landColors(): number[];
    get landContourColor(): number;
    get name(): string;
    get waterColors(): number[];
    get waterContourColor(): number;
    isValid(fix: boolean): boolean;
    updateFrom<T extends PropertiesBase>(otherInstance: T): void;
  }


  interface WaypointProperties extends Comparable<WaypointProperties>, ClientPropertiesBase {}
  class WaypointProperties extends Comparable<WaypointProperties> {
    readonly managerEnabled: BooleanField;
    readonly showDeleteConfirmation: BooleanField;
    readonly disableShare: BooleanField;
    readonly disableStrikeThrough: BooleanField;
    readonly coordinatesFormat: EnumField;
    readonly useActionsButton: BooleanField;
    readonly managerDimensionFocus: BooleanField;
    readonly createDeathpoints: BooleanField;
    readonly showPlayers: BooleanField;
    readonly wholeNumberTeleportCoords: BooleanField;
    readonly autoRemoveDeathpoints: BooleanField;
    readonly autoRemoveDeathpointDistance: IntegerField;
    readonly autoRemoveTempWaypoints: IntegerField;
    readonly showDeathpointlabel: BooleanField;
    readonly fullscreenDoubleClickToCreate: BooleanField;
    readonly teleportCommand: CustomField;
    readonly dateFormat: StringField;
    readonly timeFormat: StringField;
    readonly renderWaypoints: BooleanField;
    readonly renderWaypointsWorld: BooleanField;
    readonly renderWaypointsMap: BooleanField;
    readonly beaconEnabled: BooleanField;
    readonly autoHideIcon: BooleanField;
    readonly ignoreRenderDistance: BooleanField;
    readonly autoHideIconAngle: IntegerField;
    readonly showStaticBeam: BooleanField;
    readonly showRotatingBeam: BooleanField;
    readonly showName: BooleanField;
    readonly showDistance: BooleanField;
    readonly autoHideLabel: BooleanField;
    readonly autoHideLabelAngle: IntegerField;
    readonly boldLabel: BooleanField;
    readonly fontScale: FloatField;
    readonly textureSmall: BooleanField;
    readonly shaderBeacon: BooleanField;
    readonly maxDistance: IntegerField;
    readonly minDistance: IntegerField;
    compareTo(other: WaypointProperties): number;
    get name(): string;
  }


  interface WebMapProperties extends ClientPropertiesBase {}
  class WebMapProperties extends ClientPropertiesBase {
    readonly enabled: BooleanField;
    readonly port: CustomField;
    get name(): string;
  }

}

declare module 'journeymap.client.render.draw' {
  import { Renderer } from 'journeymap.client.render.map';
  import { Double } from 'Point2D';
  import { Double as rectangle2d_Double } from 'Rectangle2D';
  import { EntityDisplay } from 'journeymap.client.ui.minimap';
  import { DynamicTexture } from 'net.minecraft.client.renderer.texture';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { Pass } from 'journeymap.client.render.draw.DrawStep';
  import { Point2D } from 'java.awt.geom';
  import { ImageOverlay, MarkerOverlay, PolygonOverlay, Overlay } from 'journeymap.api.v2.client.display';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List, Collection } from 'java.util';
  import { MapPolygon, ShapeProperties } from 'journeymap.api.v2.client.model';
  import { Integer } from 'java.lang';
  import { HAlign, VAlign } from 'journeymap.client.render.draw.DrawUtil';
  import { LabelSpec } from 'journeymap.client.ui.theme.Theme';
  import { Component } from 'net.minecraft.network.chat';
  import { VertexConsumer, BufferBuilder } from 'com.mojang.blaze3d.vertex';
  import { Matrix4f } from 'org.joml';
  import { ClientWaypointImpl } from 'journeymap.client.waypoint';
  import { Tuple2 } from 'journeymap.api.v2.client.util.tuple';
  import { EntityDTO } from 'journeymap.client.model.entity';
  import { InGameMapProperties } from 'journeymap.client.properties';

  interface BaseOverlayDrawStep<T extends Overlay = any> extends OverlayDrawStep {}
  class BaseOverlayDrawStep<T extends Overlay = any> extends OverlayDrawStep {
    readonly overlay: T;
    get bounds(): rectangle2d_Double;
    get displayOrder(): number;
    get modId(): string;
    get overlay(): T;
    isOnScreen(xOffset: number, yOffset: number, renderer: Renderer, rotation: number): boolean;
    setEnabled(enabled: boolean): void;
    setTitlePosition(titlePosition: Double): void;
  }


  interface DrawEntityStep extends DrawStep {}
  class DrawEntityStep extends DrawStep {
    draw(graphics: GuiGraphics, buffers: MultiBufferSource, pass: Pass, xOffset: number, yOffset: number, renderer: Renderer, fontScale: number, rotation: number): void;
    drawOffscreen(graphics: GuiGraphics, buffers: MultiBufferSource, pass: Pass, pixel: Point2D, renderer: Renderer, rotation: number): void;
    drawOffscreen(graphics: GuiGraphics, buffers: MultiBufferSource, pass: Pass, pixel: Point2D, renderer: Renderer, rotation: number, zeroOffset: boolean): void;
    get displayOrder(): number;
    get modId(): string;
    getPosition(xOffset: number, yOffset: number, renderer: Renderer, forceUpdate: boolean): Double;
    update(entityDisplay: EntityDisplay, locatorTexture: DynamicTexture, locatorBGTexture: DynamicTexture, entityTexture: DynamicTexture, color: number, labelColor: number, showHeading: boolean, showTeamName: boolean, showPlayerName: boolean, showOutline: boolean, entityDrawScale: number): void;
  }


  interface DrawImageStep extends BaseOverlayDrawStep<ImageOverlay> {}
  class DrawImageStep extends BaseOverlayDrawStep<ImageOverlay> {
    constructor(marker: ImageOverlay);
    draw(graphics: GuiGraphics, buffers: MultiBufferSource, pass: Pass, xOffset: number, yOffset: number, renderer: Renderer, fontScale: number, rotation: number): void;
  }


  interface DrawMarkerStep extends BaseOverlayDrawStep<MarkerOverlay> {}
  class DrawMarkerStep extends BaseOverlayDrawStep<MarkerOverlay> {
    constructor(marker: MarkerOverlay);
    draw(graphics: GuiGraphics, buffers: MultiBufferSource, pass: Pass, xOffset: number, yOffset: number, renderer: Renderer, fontScale: number, rotation: number): void;
  }


  interface DrawPolygonStep extends BaseOverlayDrawStep<PolygonOverlay> {}
  class DrawPolygonStep extends BaseOverlayDrawStep<PolygonOverlay> {
    constructor(polygon: PolygonOverlay);
    draw(graphics: GuiGraphics, buffers: MultiBufferSource, pass: Pass, xOffset: number, yOffset: number, renderer: Renderer, fontScale: number, rotation: number): void;
    get textureResource(): ResourceLocation;
    set textureResource(textureResource: ResourceLocation);
    static triangulate(overlay: PolygonOverlay): MapPolygon[];
  }


  class DrawStep {
    draw(var1: GuiGraphics, var2: MultiBufferSource, var3: Pass, var4: number, var6: number, var8: Renderer, var9: number, var11: number): void;
    get displayOrder(): number;
    get modId(): string;
  }


  class DrawUtil {
    static zLevel: number;
    static addVertex(graphics: GuiGraphics, bufferIn: VertexConsumer, red: number, green: number, blue: number, alpha: number, x: number, y: number, z: number): void;
    static addVertexUV(graphics: GuiGraphics, bufferIn: VertexConsumer, red: number, green: number, blue: number, alpha: number, y: number, x: number, z: number, texU: number, texV: number): void;
    static addVertexUV(graphics: GuiGraphics, bufferIn: VertexConsumer, red: number, green: number, blue: number, alpha: number, x: number, y: number, z: number, texU: number, texV: number): void;
    static addVertexUV(graphics: GuiGraphics, buff: BufferBuilder, x: number, y: number, z: number, u: number, v: number, rgba: number[]): void;
    static addVertexWithUV(graphics: GuiGraphics, buff: BufferBuilder, x: number, y: number, z: number, u: number, v: number): void;
    static addVertexWithUV(graphics: GuiGraphics, buff: BufferBuilder, x: number, y: number, z: number, u: number, v: number): void;
    static drawBatchLabel(graphics: GuiGraphics, text: Component, labelSpec: LabelSpec, x: number, y: number, hAlign: HAlign, vAlign: VAlign, fontScale: number, rotation: number): void;
    static drawBatchLabel(graphics: GuiGraphics, text: Component, x: number, y: number, hAlign: HAlign, vAlign: VAlign, bgColor: number, bgAlpha: number, color: number, alpha: number, fontScale: number, fontShadow: boolean, rotation: number): void;
    static drawBatchLabel(graphics: GuiGraphics, text: Component, pass: Pass, buffers: MultiBufferSource, x: number, y: number, hAlign: HAlign, vAlign: VAlign, bgColor: number, bgAlpha: number, color: number, alpha: number, fontScale: number, fontShadow: boolean, rotation: number): void;
    static drawCenteredLabel(graphics: GuiGraphics, text: string, x: number, y: number, bgColor: number, bgAlpha: number, color: number, alpha: number, fontScale: number, fontShadow: boolean): void;
    static drawClampedImage(graphics: GuiGraphics, texture: DynamicTexture, color: number, alpha: number, x: number, y: number, scale: number, rotation: number): void;
    static drawColoredEntity(graphics: GuiGraphics, x: number, y: number, texture: DynamicTexture, color: number, alpha: number, scale: number, rotation: number): void;
    static drawColoredEntity(graphics: GuiGraphics, vertexBuilder: VertexConsumer, texture: DynamicTexture, color: number, alpha: number, x: number, y: number, scale: number, rotation: number): void;
    static drawColoredImage(graphics: GuiGraphics, texture: DynamicTexture, color: number, alpha: number, x: number, y: number, scale: number, rotation: number): void;
    static drawColoredImage(graphics: GuiGraphics, texture: DynamicTexture, color: number, alpha: number, x: number, y: number, rotation: number): void;
    static drawGradientRect(graphics: GuiGraphics, x: number, y: number, width: number, height: number, startColor: number, startAlpha: number, endColor: number, endAlpha: number): void;
    static drawImage(graphics: GuiGraphics, texture: DynamicTexture, x: number, y: number, flip: boolean, scale: number, rotation: number): void;
    static drawImage(graphics: GuiGraphics, texture: DynamicTexture, x: number, y: number, flip: boolean, scale: number, rotation: number, blur: boolean): void;
    static drawImage(graphics: GuiGraphics, texture: DynamicTexture, alpha: number, x: number, y: number, flip: boolean, scale: number, rotation: number): void;
    static drawLabel(graphics: GuiGraphics, text: string, x: number, y: number, hAlign: HAlign, vAlign: VAlign, bgColor: number, bgAlpha: number, color: number, alpha: number, fontScale: number, fontShadow: boolean): void;
    static drawLabel(graphics: GuiGraphics, text: string, labelSpec: LabelSpec, x: number, y: number, hAlign: HAlign, vAlign: VAlign, fontScale: number, rotation: number): void;
    static drawLabel(graphics: GuiGraphics, text: string, x: number, y: number, hAlign: HAlign, vAlign: VAlign, bgColor: number, bgAlpha: number, color: number, alpha: number, fontScale: number, fontShadow: boolean, rotation: number): void;
    static drawLabel(graphics: GuiGraphics, text: string, x: number, y: number, hAlign: HAlign, vAlign: VAlign, bgColor: number, bgAlpha: number, bgWidth: number, bgHeight: number, color: number, alpha: number, fontScale: number, fontShadow: boolean, rotation: number): void;
    static drawLabels(graphics: GuiGraphics, lines: string[], x: number, y: number, hAlign: HAlign, vAlign: VAlign, bgColor: number, bgAlpha: number, color: number, alpha: number, fontScale: number, fontShadow: boolean, rotation: number): void;
    static drawPolygon(graphics: GuiGraphics, buffers: MultiBufferSource, xOffset: number, yOffset: number, fillPoints: Double[], strokePoints: Double[][], texturePoints: Double[], texture: DynamicTexture, shapeProperties: ShapeProperties): void;
    static drawQuad(graphics: GuiGraphics, texture: DynamicTexture, x: number, y: number, width: number, height: number, flip: boolean, rotation: number): void;
    static drawQuad(graphics: GuiGraphics, texture: DynamicTexture, color: number, alpha: number, x: number, y: number, width: number, height: number, flip: boolean, rotation: number): void;
    static drawQuad(graphics: GuiGraphics, texture: DynamicTexture, color: number, alpha: number, x: number, y: number, width: number, height: number, minU: number, minV: number, maxU: number, maxV: number, rotation: number, flip: boolean, blend: boolean, glBlendSfactor: number, glBlendDFactor: number, clampTexture: boolean, blur: boolean): void;
    static drawQuad(graphics: GuiGraphics, vertexBuilder: VertexConsumer, color: number, alpha: number, x: number, y: number, width: number, height: number, rotation: number, flip: boolean): void;
    static drawQuad(graphics: GuiGraphics, vertexBuilder: VertexConsumer, color: number, alpha: number, x: number, y: number, width: number, height: number, minU: number, minV: number, maxU: number, maxV: number, rotation: number, flip: boolean): void;
    static drawRectangle(graphics: GuiGraphics, x: number, y: number, width: number, height: number, color: number, alpha: number): void;
    static drawRectangle(graphics: GuiGraphics, vertexBuilder: VertexConsumer, x: number, y: number, width: number, height: number, color: number, alpha: number): void;
    static drawRectangle(matrixPos: Matrix4f, x: number, y: number, width: number, height: number, color: number): void;
    static drawWaypointIcon(graphics: GuiGraphics, vertexBuilder: VertexConsumer, texture: DynamicTexture, scale: number, color: number, alpha: number, x: number, y: number, rotation: number): void;
    static fill(matrixPos: Matrix4f, x: number, y: number, bottomX: number, bottomY: number, color: number): void;
    static getLabelHeight(fr: Font, fontShadow: boolean): number;
    static sizeDisplay(width: number, height: number): void;
  }


  interface DrawWayPointStep extends DrawStep {}
  class DrawWayPointStep extends DrawStep {
    readonly waypoint: ClientWaypointImpl;
    constructor(waypoint: ClientWaypointImpl);

    constructor(waypoint: ClientWaypointImpl, isEdit: boolean);
    draw(graphics: GuiGraphics, buffers: MultiBufferSource, pass: Pass, xOffset: number, yOffset: number, renderer: Renderer, fontScale: number, rotation: number): void;
    drawOffscreen(graphics: GuiGraphics, buffers: MultiBufferSource, pass: Pass, pixel: Point2D, rotation: number): void;
    get displayOrder(): number;
    get modId(): string;
    getPosition(xOffset: number, yOffset: number, renderer: Renderer, forceUpdate: boolean): Double;
    isOnScreen(): boolean;
    setIconScale(iconScale: number): void;
    setLabelScale(labelScale: number): void;
    setOnScreen(lastOnScreen: boolean): void;
    setShowLabel(showLabel: boolean): void;
  }


  class LivingEntityRendererETFTextureGetter<T extends LivingEntity = any> {
    getETFTextureLocation(var1: T): ResourceLocation;
  }


  class MobIconCache {
    static clearCache(): void;
    static getMobIcon(dto: EntityDTO, outlined: boolean): Tuple2<ResourceLocation, DynamicTexture>;
    static getWebMapIcon(loc: ResourceLocation): DynamicTexture;
  }


  interface OverlayDrawStep extends DrawStep {}
  class OverlayDrawStep extends DrawStep {
    get bounds(): rectangle2d_Double;
    get overlay(): Overlay;
    isOnScreen(var1: number, var3: number, var5: Renderer, var6: number): boolean;
    setEnabled(var1: boolean): void;
    setTitlePosition(var1: Double): void;
  }


  class RadarDrawStepFactory {
    prepareSteps(entityDTOs: EntityDTO[], renderer: Renderer, mapProperties: InGameMapProperties): DrawStep[];
  }


  class WaypointDrawStepFactory {
    prepareSteps(waypoints: Collection<ClientWaypointImpl>, renderer: Renderer, checkDistance: boolean, showLabel: boolean): DrawWayPointStep[];
  }

}

declare module 'journeymap.client.render.draw.DrawEntityStep' {
  import { CacheLoader } from 'com.google.common.cache';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { DrawEntityStep } from 'journeymap.client.render.draw';

  interface SimpleCacheLoader extends CacheLoader<LivingEntity, DrawEntityStep> {}
  class SimpleCacheLoader extends CacheLoader<LivingEntity, DrawEntityStep> {
    load(entityLiving: LivingEntity): DrawEntityStep;
  }

}

declare module 'journeymap.client.render.draw.DrawImageStep' {
  import { CacheLoader } from 'com.google.common.cache';
  import { ImageOverlay } from 'journeymap.api.v2.client.display';
  import { DrawImageStep } from 'journeymap.client.render.draw';

  interface SimpleCacheLoader extends CacheLoader<ImageOverlay, DrawImageStep> {}
  class SimpleCacheLoader extends CacheLoader<ImageOverlay, DrawImageStep> {
    load(overlay: ImageOverlay): DrawImageStep;
  }

}

declare module 'journeymap.client.render.draw.DrawMarkerStep' {
  import { CacheLoader } from 'com.google.common.cache';
  import { MarkerOverlay } from 'journeymap.api.v2.client.display';
  import { DrawMarkerStep } from 'journeymap.client.render.draw';

  interface SimpleCacheLoader extends CacheLoader<MarkerOverlay, DrawMarkerStep> {}
  class SimpleCacheLoader extends CacheLoader<MarkerOverlay, DrawMarkerStep> {
    load(overlay: MarkerOverlay): DrawMarkerStep;
  }

}

declare module 'journeymap.client.render.draw.DrawPolygonStep' {
  import { CacheLoader } from 'com.google.common.cache';
  import { PolygonOverlay } from 'journeymap.api.v2.client.display';
  import { DrawPolygonStep } from 'journeymap.client.render.draw';
  import { List } from 'java.util';
  import { BlockPos } from 'net.minecraft.core';

  interface SimpleCacheLoader extends CacheLoader<PolygonOverlay, DrawPolygonStep> {}
  class SimpleCacheLoader extends CacheLoader<PolygonOverlay, DrawPolygonStep> {
    load(overlay: PolygonOverlay): DrawPolygonStep;
  }


  interface TriangulationCacheLoader extends CacheLoader<PolygonOverlay, List> {}
  class TriangulationCacheLoader extends CacheLoader<PolygonOverlay, List> {
    load(overlay: PolygonOverlay): BlockPos[];
  }

}

declare module 'journeymap.client.render.draw.DrawStep' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Pass extends Enum<Pass> {}
  class Pass extends Enum<Pass> {
    static readonly PreObject: Pass;
    static readonly Object: Pass;
    static readonly PostObject: Pass;
    static readonly TextBG: Pass;
    static readonly Text: Pass;
    static readonly Tooltip: Pass;
    static valueOf(name: string): Pass;
    static values(): Pass[];
  }

}

declare module 'journeymap.client.render.draw.DrawUtil' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface HAlign extends Enum<HAlign> {}
  class HAlign extends Enum<HAlign> {
    static readonly Left: HAlign;
    static readonly Center: HAlign;
    static readonly Right: HAlign;
    static valueOf(name: string): HAlign;
    static values(): HAlign[];
  }


  interface VAlign extends Enum<VAlign> {}
  class VAlign extends Enum<VAlign> {
    static readonly Above: VAlign;
    static readonly Middle: VAlign;
    static readonly Below: VAlign;
    static valueOf(name: string): VAlign;
    static values(): VAlign[];
  }

}

declare module 'journeymap.client.render.draw.DrawWayPointStep' {
  import { CacheLoader } from 'com.google.common.cache';
  import { ClientWaypointImpl } from 'journeymap.client.waypoint';
  import { DrawWayPointStep } from 'journeymap.client.render.draw';

  interface SimpleCacheLoader extends CacheLoader<ClientWaypointImpl, DrawWayPointStep> {}
  class SimpleCacheLoader extends CacheLoader<ClientWaypointImpl, DrawWayPointStep> {
    load(holder: ClientWaypointImpl): DrawWayPointStep;
  }

}

declare module 'journeymap.client.render.ingame' {
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';

  interface WaypointBeaconRenderer extends WaypointRenderer {}
  class WaypointBeaconRenderer extends WaypointRenderer {
    render(graphics: GuiGraphics): void;
    renderBeamSegment(graphics: GuiGraphics, buffer: MultiBufferSource, partialTicks: number, gameTime: number, yOffset: number, height: number, colors: number[], beamRadius: number, glowRadius: number, showStaticInnerBeam: boolean, showRotatingOuterBeam: boolean): void;
  }


  interface WaypointDecorationRenderer extends WaypointRenderer {}
  class WaypointDecorationRenderer extends WaypointRenderer {
    render(graphics: GuiGraphics): void;
  }


  class WaypointRenderer {
    render(var1: GuiGraphics): void;
  }

}

declare module 'journeymap.client.render' {
  import { RenderType, ShaderInstance, MultiBufferSource } from 'net.minecraft.client.renderer';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ShaderStateShard } from 'RenderStateShard';
  import { VertexFormat, PoseStack, VertexSorting } from 'com.mojang.blaze3d.vertex';
  import { Mode } from 'VertexFormat';
  import { Runnable } from 'java.lang';
  import { RegionTexture } from 'journeymap.client.texture';
  import { AbstractTexture } from 'net.minecraft.client.renderer.texture';
  import { ValuesProvider } from 'journeymap.common.properties.config.StringField';
  import { List } from 'java.util';
  import { EntityRenderer } from 'net.minecraft.client.renderer.entity';
  import { Context } from 'EntityRendererProvider';
  import { Entity } from 'net.minecraft.world.entity';
  import { Matrix4f, Matrix4fStack } from 'org.joml';
  import { IntBuffer } from 'java.nio';
  import { Supplier } from 'java.util.function';

  interface JMRenderTypes extends RenderType {}
  class JMRenderTypes extends RenderType {
    static readonly WAYPOINT_DEFAULT_BEAM: ResourceLocation;
    static POSITION_TEX_COLOR_SHADER: ShaderStateShard;
    static readonly MINIMAP_RECTANGLE_MASK_RENDER_TYPE: RenderType;
    static readonly BEAM_RENDER_TYPE: RenderType;
    static readonly RECTANGLE_RENDER_TYPE: RenderType;
    static readonly GRID_LINES_RENDER_TYPE: RenderType;
    static readonly POLYGON_WITHOUT_TEXTURE_RENDER_TYPE: RenderType;
    static readonly POLYGON_STROKE_RENDER_TYPE: RenderType;
    constructor(name: string, vertexFormat: VertexFormat, drawMode: Mode, bufferSize: number, useDelegate: boolean, needsSorting: boolean, pre: Runnable, post: Runnable);
    static clearRegionRenderTypes(id: number): void;
    static getGridLines(resourceLocation: ResourceLocation): RenderType;
    static getIcon(texture: AbstractTexture): RenderType;
    static getIconNoBlur(texture: AbstractTexture): RenderType;
    static getIconUnmasked(texture: AbstractTexture): RenderType;
    static getMinimapCircleMask(texture: AbstractTexture): RenderType;
    static getPolygonWithTexture(texture: AbstractTexture): RenderType;
    static getRegionTile(texture: RegionTexture, shaderIndex: number): RenderType;
    static registerMapShader(key: string, shader: ShaderInstance): void;
    static registerPosTexColorShader(shader: ShaderInstance): void;
  }


  interface RegionTileShaders extends ValuesProvider {}
  class RegionTileShaders extends ValuesProvider {
    static readonly REGION_SHADERS: List;
    static from(key: string): number;
    static from(key: number): string;
    get defaultString(): string;
    get strings(): string[];
    getTooltip(value: string): string;
  }


  interface RenderFacade extends EntityRenderer {}
  class RenderFacade extends EntityRenderer {
    constructor(unused: Context);
    static getEntityTexture(render: EntityRenderer, entity: Entity): ResourceLocation;
    getTextureLocation(entity: Entity): ResourceLocation;
    render(entityIn: Entity, entityYaw: number, partialTicks: number, poseStack: PoseStack, bufferIn: MultiBufferSource, packedLightIn: number): void;
  }


  class RenderWrapper {
    static readonly GL_TEXTURE_2D: number;
    static readonly GL_NEAREST: number;
    static readonly GL_LINEAR: number;
    static readonly GL_TEXTURE_MAG_FILTER: number;
    static readonly GL_TEXTURE_MIN_FILTER: number;
    static readonly GL_NEAREST_MIPMAP_NEAREST: number;
    static readonly GL_NEAREST_MIPMAP_LINEAR: number;
    static readonly GL_LINEAR_MIPMAP_LINEAR: number;
    static readonly GL_TEXTURE_WRAP_S: number;
    static readonly GL_TEXTURE_WRAP_T: number;
    static readonly GL_REPEAT: number;
    static readonly GL_SRC_ALPHA: number;
    static readonly GL_ONE_MINUS_SRC_ALPHA: number;
    static readonly GL_ZERO: number;
    static readonly GL_DEPTH_BUFFER_BIT: number;
    static readonly GL_LEQUAL: number;
    static readonly GL_GREATER: number;
    static readonly GL_GEQUAL: number;
    static readonly GL_NO_ERROR: number;
    static readonly GL_VIEWPORT: number;
    static readonly UNSIGNED_INT_8_8_8_8_REV: number;
    static readonly GL_UNSIGNED_BYTE: number;
    static readonly GL_BGRA: number;
    static readonly GL_RGBA: number;
    static readonly GL_CLAMP_TO_EDGE: number;
    static readonly GL_TEXTURE_MAX_LEVEL: number;
    static readonly GL_TEXTURE_MAX_LOD: number;
    static readonly GL_TEXTURE_MIN_LOD: number;
    static readonly GL_MIRRORED_REPEAT: number;
    static readonly GL_TEXTURE_LOD_BIAS: number;
    static readonly errorCheck: boolean;
    static activeTexture(texture: number): void;
    static applyModelViewMatrix(): void;
    static bindFramebuffer(target: number, framebuffer: number): void;
    static bindTexture(id: number): void;
    static bindTextureForSetup(id: number): void;
    static blendFunc(sfactor: number, dfactor: number): void;
    static blendFuncSeparate(sfactorRGB: number, dfactorRGB: number, sfactorAlpha: number, dfactorAlpha: number): void;
    static blitFramebuffer(srcX0: number, srcY0: number, srcX1: number, srcY1: number, dstX0: number, dstY0: number, dstX1: number, dstY1: number, mask: number, filter: number): void;
    static checkGLError(method: string): boolean;
    static clear(mask: number): void;
    static clearColor(red: number, green: number, blue: number, alpha: number): void;
    static colorMask(red: boolean, green: boolean, blue: boolean, alpha: boolean): void;
    static defaultBlendFunc(): void;
    static depthFunc(func: number): void;
    static depthMask(flag: boolean): void;
    static disableBlend(): void;
    static disableCull(): void;
    static disableDepthTest(): void;
    static enableBlend(): void;
    static enableCull(): void;
    static enableDepthTest(): void;
    static generateMipmap(target: number): void;
    static get error(): number;
    static get modelViewStack(): Matrix4fStack;
    static get projectionMatrix(): Matrix4f;
    static getIntegerv(pname: number, params: IntBuffer): void;
    static lineWidth(stroke: number): void;
    static pixelStore(pname: number, param: number): void;
    static setColor4f(red: number, green: number, blue: number, alpha: number): void;
    static setProjectionMatrix(matrix4f: Matrix4f, sorting: VertexSorting): void;
    static setShader(shaderInstanceSupplier: Supplier<ShaderInstance>): void;
    static setShaderTexture(index: number, id: number): void;
    static setShaderTexture(index: number, resourceLocation: ResourceLocation): void;
    static texImage2D(target: number, level: number, internalFormat: number, width: number, height: number, border: number, format: number, type: number, pixels: IntBuffer): void;
    static texParameter(target: number, pname: number, param: number): void;
    static texSubImage2D(target: number, level: number, xoffset: number, yoffset: number, width: number, height: number, format: number, type: number, pixels: number): void;
  }

}

declare module 'journeymap.client.render.map' {
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { RegionCoord } from 'journeymap.client.model.region';
  import { Double } from 'Point2D';
  import { Double as rectangle2d_Double } from 'Rectangle2D';
  import { Fullscreen } from 'journeymap.client.ui.fullscreen';
  import { UI } from 'Context';
  import { MapState, MapType } from 'journeymap.client.model.map';
  import { BufferSource } from 'MultiBufferSource';
  import { List } from 'java.util';
  import { DrawStep } from 'journeymap.client.render.draw';
  import { BlockPos } from 'net.minecraft.core';
  import { Point2D } from 'java.awt.geom';
  import { File } from 'java.io';
  import { UIState } from 'journeymap.api.v2.client.util';
  import { ModPopupMenu } from 'journeymap.api.v2.client.fullscreen';
  import { Listener } from 'journeymap.client.texture.RegionTexture';
  import { RegionTexture } from 'journeymap.client.texture';

  class GridLines {
    constructor(mapRenderer: MapRenderer);
    draw(graphics: GuiGraphics, buffers: MultiBufferSource, centerRegion: RegionCoord, centerPixel: Double, regionBounds: rectangle2d_Double, pixelOffsetX: number, pixelOffsetZ: number, offsetX: number, offsetZ: number, zoom: number, alpha: number, showGrid: boolean): void;
  }


  interface MapRenderer extends Renderer {}
  class MapRenderer extends Renderer {
    mouseX: number;
    mouseY: number;
    fullscreen: Fullscreen;
    constructor(contextUi: UI);
    blockPixelOffsetInRegion(centerRegion: RegionCoord, centerBlockX: number, centerBlockZ: number): Point2D;
    center(): boolean;
    center(worldDir: File, mapType: MapType, blockX: number, blockZ: number, zoom: number): boolean;
    clear(): void;
    clearGlErrors(report: boolean): void;
    draw(graphics: GuiGraphics, buffers: BufferSource, drawStepList: DrawStep[], fullscreen: Fullscreen, mouseX: number, mouseY: number, xOffset: number, yOffset: number, fontScale: number, rotation: number): void;
    draw(graphics: GuiGraphics, buffers: BufferSource, drawStepList: DrawStep[], xOffset: number, yOffset: number, fontScale: number, rotation: number): void;
    draw(graphics: GuiGraphics, buffers: BufferSource, xOffset: number, yOffset: number, fontScale: number, rotation: number, ...drawSteps: DrawStep[]): void;
    ensureOnScreen(pixel: Point2D): void;
    get centerBlockX(): number;
    get centerBlockZ(): number;
    get context(): UI;
    get fullscreen(): Fullscreen;
    get gridSize(): number;
    get height(): number;
    get mapType(): MapType;
    get mouseX(): number;
    get mouseY(): number;
    get uIState(): UIState;
    get width(): number;
    get zoom(): number;
    getBlockAtPixel(pixel: Double): BlockPos;
    getBlockPixelInGrid(pos: BlockPos): Double;
    getBlockPixelInGrid(blockX: number, blockZ: number): Double;
    getCalculatedGridSize(zoom: number): number;
    getPixel(blockX: number, blockZ: number): Double;
    getWindowPosition(matrixPixel: Double): Double;
    hasUnloadedTile(): boolean;
    isOnScreen(pixel: Double): boolean;
    isOnScreen(bounds: rectangle2d_Double): boolean;
    isOnScreen(x: number, y: number): boolean;
    isOnScreen(startX: number, startY: number, width: number, height: number): boolean;
    move(deltaBlockX: number, deltaBlockZ: number): void;
    render(graphics: GuiGraphics, buffers: BufferSource, offsetX: number, offsetZ: number, alpha: number, showGrid: boolean): void;
    set context(state: MapState);
    set zoom(zoom: number);
    static setEnabled(enabled: boolean): void;
    setViewPortBounds(viewPortBounds: rectangle2d_Double): void;
    shiftWindowPosition(x: number, y: number, shiftX: number, shiftY: number): Point2D;
    updateRotation(graphics: GuiGraphics, rotation: number): void;
    updateTiles(mapType: MapType, zoom: number, fullUpdate: boolean): void;
    updateUIState(isActive: boolean): void;
  }


  class RegionRenderer {
    static TOGGLED: boolean;
    onActivate(mapState: UIState): void;
    onActivate(mapState: UIState): void;
    onDeactivate(mapState: UIState): void;
    onDeactivate(mapState: UIState): void;
    onMouseClick(mapState: UIState, mousePosition: Double, blockPosition: BlockPos, button: number, doubleClick: boolean): boolean;
    onMouseClick(mapState: UIState, mousePosition: Double, blockPosition: BlockPos, button: number, doubleClick: boolean): boolean;
    onMouseMove(mapState: UIState, mousePosition: Double, blockPosition: BlockPos): void;
    onMouseMove(mapState: UIState, mousePosition: Double, blockPosition: BlockPos): void;
    onMouseOut(mapState: UIState, mousePosition: Double, blockPosition: BlockPos): void;
    onMouseOut(mapState: UIState, mousePosition: Double, blockPosition: BlockPos): void;
    onOverlayMenuPopup(mapState: UIState, mousePosition: Double, blockPosition: BlockPos, modPopupMenu: ModPopupMenu): void;
    onOverlayMenuPopup(mapState: UIState, mousePosition: Double, blockPosition: BlockPos, modPopupMenu: ModPopupMenu): void;
    static render(toggled: boolean): void;
  }


  interface RegionTile extends Listener<RegionTexture> {}
  class RegionTile extends Listener<RegionTexture> {
    static readonly TILE_SIZE: number;
    close(): void;
    get regionCoord(): RegionCoord;
    get texture(): RegionTexture;
    get x(): number;
    get y(): number;
    get zoom(): number;
    hashCode(): number;
    render(graphics: GuiGraphics, buffers: MultiBufferSource, pixelOffsetX: number, pixelOffsetZ: number, alpha: number): void;
    setPosition(centerRegion: RegionCoord, centerPixel: Double, regionBounds: rectangle2d_Double, offsetX: number, offsetZ: number, zoom: number): void;
    shouldRender(): boolean;
    textureImageUpdated(texture: RegionTexture): void;
    textureImageUpdated(var1: RegionTexture): void;
    static toCacheKey(regionCoord: RegionCoord, mapType: MapType): string;
    toString(): string;
  }


  class Renderer {
    ensureOnScreen(var1: Point2D): void;
    get context(): UI;
    get fullscreen(): Fullscreen;
    get gridSize(): number;
    get height(): number;
    get mapType(): MapType;
    get mouseX(): number;
    get mouseY(): number;
    get uIState(): UIState;
    get width(): number;
    get zoom(): number;
    getBlockAtPixel(var1: Double): BlockPos;
    getBlockPixelInGrid(var1: BlockPos): Double;
    getBlockPixelInGrid(var1: number, var3: number): Double;
    getPixel(var1: number, var3: number): Double;
    getWindowPosition(var1: Double): Double;
    isOnScreen(var1: Double): boolean;
    isOnScreen(var1: rectangle2d_Double): boolean;
    shiftWindowPosition(var1: number, var3: number, var5: number, var6: number): Point2D;
  }

}

declare module 'journeymap.client.task.main' {
  import { RegionCoord } from 'journeymap.client.model.region';
  import { MapType } from 'journeymap.client.model.map';
  import { Minecraft } from 'net.minecraft.client';
  import { JourneymapClient } from 'journeymap.client';
  import { DynamicTexture } from 'net.minecraft.client.renderer.texture';
  import { Collection } from 'java.util';

  interface DeleteMapTask extends IMainThreadTask {}
  class DeleteMapTask extends IMainThreadTask {
    constructor(regionCoord: RegionCoord, mapType: MapType);
    get name(): string;
    perform(mc: Minecraft, jm: JourneymapClient): IMainThreadTask;
    static queue(allDims: boolean): void;
    static queue(regionCoord: RegionCoord, mapType: MapType): void;
  }


  interface EnsureCurrentColorsTask extends IMainThreadTask {}
  class EnsureCurrentColorsTask extends IMainThreadTask {
    constructor();

    constructor(forceRemap: boolean);
    get name(): string;
    perform(mc: Minecraft, jm: JourneymapClient): IMainThreadTask;
  }


  interface ExpireTextureTask extends IMainThreadTask {}
  class ExpireTextureTask extends IMainThreadTask {
    get name(): string;
    perform(mc: Minecraft, jm: JourneymapClient): IMainThreadTask;
    static queue(textureId: number): void;
    static queue(texture: DynamicTexture): void;
    static queue(textureCollection: Collection<DynamicTexture>): void;
  }


  class IMainThreadTask {
    get name(): string;
    perform(var1: Minecraft, var2: JourneymapClient): IMainThreadTask;
  }


  class MainTaskController {
    addTask(task: IMainThreadTask): void;
    isActive(): boolean;
    performTasks(): void;
  }


  interface MappingMonitorTask extends IMainThreadTask {}
  class MappingMonitorTask extends IMainThreadTask {
    get name(): string;
    perform(mc: Minecraft, jm: JourneymapClient): IMainThreadTask;
  }


  interface SoftResetTask extends IMainThreadTask {}
  class SoftResetTask extends IMainThreadTask {
    get name(): string;
    perform(mc: Minecraft, jm: JourneymapClient): IMainThreadTask;
    static queue(): void;
  }

}

declare module 'journeymap.client.task' {
  import { Callable } from 'java.util.concurrent';
  import { Boolean } from 'java.lang';
  import { Version } from 'journeymap.common.version';

  interface MigrationTask extends Callable<boolean> {}
  class MigrationTask extends Callable<boolean> {
    isActive(var1: Version): boolean;
  }

}

declare module 'journeymap.client.task.multi' {
  import { Runnable, Integer, Class, Boolean } from 'java.lang';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Level, ChunkPos } from 'net.minecraft.world.level';
  import { MapType } from 'Context';
  import { Consumer } from 'java.util.function';
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { ChunkRenderController } from 'journeymap.client.cartography';
  import { MapType as journeymap_client_model_map_MapType } from 'journeymap.client.model.map';
  import { Collection, List } from 'java.util';
  import { Minecraft } from 'net.minecraft.client';
  import { JourneymapClient } from 'journeymap.client';
  import { File } from 'java.io';
  import { MapPlayerTaskBatch } from 'journeymap.client.task.multi.MapPlayerTask';
  import { EntityDTO } from 'journeymap.client.model.entity';
  import { RegionCoord } from 'journeymap.client.model.region';
  import { RevealShape } from 'journeymap.client.task.multi.RenderSpec';

  interface ApiImageTask extends Runnable {}
  class ApiImageTask extends Runnable {
    constructor(modId: string, dimension: ResourceKey<Level>, apiMapType: MapType, startChunk: ChunkPos, endChunk: ChunkPos, vSlice: number, zoom: number, showGrid: boolean, callback: Consumer<NativeImage>);
    run(): void;
  }


  interface BaseMapTask extends ITask {}
  class BaseMapTask extends ITask {
    constructor(renderController: ChunkRenderController, world: Level, mapType: journeymap_client_model_map_MapType, chunkCoords: Collection<ChunkPos>, flushCacheWhenDone: boolean, asyncFileWrites: boolean, elapsedLimit: number);
    initTask(mc: Minecraft, jm: JourneymapClient, jmWorldDir: File, threadLogging: boolean): void;
    performTask(mc: Minecraft, jm: JourneymapClient, jmWorldDir: File, threadLogging: boolean): void;
    toString(): string;
  }


  class ITask {
    get maxRuntime(): number;
    performTask(var1: Minecraft, var2: JourneymapClient, var3: File, var4: boolean): void;
  }


  class ITaskManager {
    disableTask(var1: Minecraft): void;
    enableTask(var1: Minecraft, var2: any): boolean;
    get taskClass(): Class<ITask>;
    getTask(var1: Minecraft): ITask;
    isEnabled(var1: Minecraft): boolean;
    taskAccepted(var1: ITask, var2: boolean): void;
  }


  interface MapPlayerTask extends BaseMapTask {}
  class MapPlayerTask extends BaseMapTask {
    static addTempDebugMessage(key: string, message: string): void;
    static create(chunkRenderController: ChunkRenderController, player: EntityDTO): MapPlayerTaskBatch;
    static forceNearbyRemap(): void;
    static get debugStats(): string[];
    static get lastTaskCompleted(): number;
    get maxRuntime(): number;
    static get simpleStats(): string;
    initTask(minecraft: Minecraft, jm: JourneymapClient, jmWorldDir: File, threadLogging: boolean): void;
    static removeTempDebugMessage(key: string): void;
  }


  interface MapRegionTask extends BaseMapTask {}
  class MapRegionTask extends BaseMapTask {
    static MAP_TYPE: journeymap_client_model_map_MapType;
    static active: boolean;
    static create(renderController: ChunkRenderController, rCoord: RegionCoord, mapType: journeymap_client_model_map_MapType, minecraft: Minecraft): BaseMapTask;
    get maxRuntime(): number;
    static get memoryUsage(): number;
    performTask(mc: Minecraft, jm: JourneymapClient, jmWorldDir: File, threadLogging: boolean): void;
  }


  class RenderSpec {
    copyLastStatsFrom(other: RenderSpec): void;
    equals(o: any): boolean;
    get debugStats(): string;
    get lastSecondaryRenderDistance(): number;
    get lastSecondaryRenderSize(): number;
    get lastTaskChunks(): number;
    get maxSecondaryRenderDistance(): number;
    get primaryRenderDistance(): number;
    get primaryRenderSize(): number;
    get revealShape(): RevealShape;
    get surface(): boolean;
    static get surfaceSpec(): RenderSpec;
    static get topoSpec(): RenderSpec;
    static get undergroundSpec(): RenderSpec;
    hashCode(): number;
    isTopo(): boolean;
    isUnderground(): boolean;
    static resetRenderSpecs(): void;
    setLastTaskInfo(chunks: number, elapsedNs: number): void;
  }


  interface SaveMapTask extends ITask {}
  class SaveMapTask extends ITask {
    static MAP_TYPE: journeymap_client_model_map_MapType;
    get maxRuntime(): number;
    performTask(mc: Minecraft, jm: JourneymapClient, jmWorldDir: File, threadLogging: boolean): void;
  }


  interface TaskBatch extends ITask {}
  class TaskBatch extends ITask {
    constructor(tasks: ITask[]);
    get maxRuntime(): number;
    performTask(mc: Minecraft, jm: JourneymapClient, jmWorldDir: File, threadLogging: boolean): void;
  }


  class TaskController {
    constructor();
    clear(): void;
    disableTasks(): void;
    enableTasks(): void;
    getManager(managerClass: Class<ITaskManager>): ITaskManager;
    hasRunningTask(): boolean;
    isActive(): boolean;
    isTaskManagerEnabled(managerClass: Class<ITaskManager>): boolean;
    performTasks(): void;
    queueOneOff(runnable: Runnable): void;
    toggleTask(managerClass: Class<ITaskManager>, enable: boolean, params: any): void;
    toggleTask(manager: ITaskManager, enable: boolean, params: any): void;
  }

}

declare module 'journeymap.client.task.multi.MapPlayerTask' {
  import { TaskBatch, ITask, ITaskManager, BaseMapTask } from 'journeymap.client.task.multi';
  import { List } from 'java.util';
  import { Minecraft } from 'net.minecraft.client';
  import { JourneymapClient } from 'journeymap.client';
  import { File } from 'java.io';
  import { Class } from 'java.lang';

  interface MapPlayerTaskBatch extends TaskBatch {}
  class MapPlayerTaskBatch extends TaskBatch {
    constructor(tasks: ITask[]);
    performTask(mc: Minecraft, jm: JourneymapClient, jmWorldDir: File, threadLogging: boolean): void;
  }


  interface Manager extends ITaskManager {}
  class Manager extends ITaskManager {
    constructor();
    disableTask(minecraft: Minecraft): void;
    enableTask(minecraft: Minecraft, params: any): boolean;
    get taskClass(): Class<BaseMapTask>;
    getTask(minecraft: Minecraft): ITask;
    isEnabled(minecraft: Minecraft): boolean;
    taskAccepted(task: ITask, accepted: boolean): void;
  }

}

declare module 'journeymap.client.task.multi.MapRegionTask' {
  import { ITaskManager, ITask, BaseMapTask } from 'journeymap.client.task.multi';
  import { Class } from 'java.lang';
  import { Minecraft } from 'net.minecraft.client';

  interface Manager extends ITaskManager {}
  class Manager extends ITaskManager {
    disableTask(minecraft: Minecraft): void;
    enableTask(minecraft: Minecraft, params: any): boolean;
    get taskClass(): Class<ITask>;
    getTask(minecraft: Minecraft): BaseMapTask;
    isEnabled(minecraft: Minecraft): boolean;
    taskAccepted(task: ITask, accepted: boolean): void;
  }

}

declare module 'journeymap.client.task.multi.RenderSpec' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface RevealShape extends Enum<RevealShape> {}
  class RevealShape extends Enum<RevealShape> {
    static readonly Square: RevealShape;
    static readonly Circle: RevealShape;
    get key(): string;
    toString(): string;
    static valueOf(name: string): RevealShape;
    static values(): RevealShape[];
  }

}

declare module 'journeymap.client.task.multi.SaveMapTask' {
  import { ITaskManager, ITask, SaveMapTask } from 'journeymap.client.task.multi';
  import { Class } from 'java.lang';
  import { Minecraft } from 'net.minecraft.client';

  interface Manager extends ITaskManager {}
  class Manager extends ITaskManager {
    disableTask(minecraft: Minecraft): void;
    enableTask(minecraft: Minecraft, params: any): boolean;
    get taskClass(): Class<ITask>;
    getTask(minecraft: Minecraft): SaveMapTask;
    isEnabled(minecraft: Minecraft): boolean;
    taskAccepted(task: ITask, accepted: boolean): void;
  }

}

declare module 'journeymap.client.texture' {
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { Format } from 'NativeImage';
  import { DynamicTexture, AbstractTexture } from 'net.minecraft.client.renderer.texture';
  import { GameProfile } from 'com.mojang.authlib';
  import { Set, HashSet, Map, Collection } from 'java.util';
  import { ChunkPos } from 'net.minecraft.world.level';
  import { Integer } from 'java.lang';
  import { Listener } from 'journeymap.client.texture.RegionTexture';
  import { ResourceManager } from 'net.minecraft.server.packs.resources';
  import { WidgetSprites } from 'net.minecraft.client.gui.components';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Future, Callable } from 'java.util.concurrent';
  import { Theme } from 'journeymap.client.ui.theme';

  interface ComparableNativeImage extends NativeImage {}
  class ComparableNativeImage extends NativeImage {
    constructor(other: NativeImage);

    constructor(format: Format, width: number, height: number);
    static areIdentical(pixels: number[], otherPixels: number[]): boolean;
    close(): void;
    get pixelData(): number[];
    static getPixelData(image: NativeImage): number[];
    identicalTo(other: NativeImage): boolean;
    isChanged(): boolean;
    setChanged(val: boolean): void;
    setPixelRGBA(x: number, y: number, argb: number): void;
  }


  class HttpTextureAccess {
    journeymap$getNativeImage(): NativeImage;
  }


  class IgnSkin {
    static cropToFace(playerSkin: NativeImage): DynamicTexture;
    static getFace(profile: GameProfile): DynamicTexture;
  }


  class ImageUtil {
    static closeSafely(image: NativeImage): void;
    static closeSafely(texture: DynamicTexture): void;
    static getAlpha(color: number): number;
    static getComparableSubImage(x: number, y: number, width: number, height: number, from: NativeImage, autoClose: boolean): ComparableNativeImage;
    static getNewBlankImage(width: number, height: number): NativeImage;
    static getScaledImage(scale: number, from: NativeImage, autoClose: boolean): NativeImage;
    static getSizedImage(width: number, height: number, from: NativeImage, autoClose: boolean): NativeImage;
    static getSubImage(x: number, y: number, width: number, height: number, from: NativeImage, autoClose: boolean): NativeImage;
    static getSubImage(x: number, y: number, width: number, height: number, from: NativeImage, to: NativeImage, autoClose: boolean): NativeImage;
    static recolorImage(image: NativeImage, color: number): NativeImage;
  }


  class RegionMipmapGenerator {
    static generateMipmaps(baseImage: NativeImage, mipmapLevel: number): NativeImage[];
    static updateMipmapsAndUpload(mipmaps: NativeImage[], dirtyChunks: Set<ChunkPos>): void;
  }


  interface RegionTexture extends AbstractTexture {}
  class RegionTexture extends AbstractTexture {
    constructor(pixels: NativeImage, description: string);
    addListener(addedListener: Listener<RegionTexture>): void;
    bind(): void;
    bindNeeded(): boolean;
    bindRegionTexture(): void;
    close(): void;
    get height(): number;
    get lastImageUpdate(): number;
    get nativeImage(): NativeImage;
    get width(): number;
    getRGB(x: number, y: number): number;
    hasImage(): boolean;
    id(): number;
    isBound(): boolean;
    isDefunct(): boolean;
    load(pResourceManager: ResourceManager): void;
    setNativeImage(image: NativeImage, retainImage: boolean): void;
    setNativeImage(image: NativeImage, retainImage: boolean, updatedChunks: HashSet<ChunkPos>): void;
    toString(): string;
  }


  class TextureAccess {
    journeymap$getHeight(): number;
    journeymap$getScaledImage(var1: number): DynamicTexture;
    journeymap$getWidth(): number;
    journeymap$hasImage(): boolean;
    journeymap$putScale(var1: number, var2: DynamicTexture): void;
    journeymap$setDisplayHeight(var1: number): void;
    journeymap$setDisplayWidth(var1: number): void;
  }


  class TextureCache {
    static readonly TELEPORT_SPRITE: WidgetSprites;
    static readonly SHARE_SPRITE: WidgetSprites;
    static readonly POWER_SPRITE: WidgetSprites;
    static readonly PIN_SPRITE: WidgetSprites;
    static readonly OPTIONS_SPRITE: WidgetSprites;
    static readonly X_OUTLINE_SPRITE: WidgetSprites;
    static readonly X_SPRITE: WidgetSprites;
    static readonly TOGGLE_ON: ResourceLocation;
    static readonly TOGGLE_OFF: ResourceLocation;
    static readonly ARROW_GLYPH: ResourceLocation;
    static readonly Question: ResourceLocation;
    static readonly GridSquares: ResourceLocation;
    static readonly GridRegionSquares: ResourceLocation;
    static readonly GridRegion: ResourceLocation;
    static readonly SearchIcon: ResourceLocation;
    static readonly ColorPicker: ResourceLocation;
    static readonly ColorPicker2: ResourceLocation;
    static readonly TileSampleDay: ResourceLocation;
    static readonly TileSampleNight: ResourceLocation;
    static readonly TileSampleUnderground: ResourceLocation;
    static readonly UnknownEntity: ResourceLocation;
    static readonly Deathpoint: ResourceLocation;
    static readonly Waypoint: ResourceLocation;
    static readonly MobDot: ResourceLocation;
    static readonly MobDotArrow: ResourceLocation;
    static readonly MobDotChevron: ResourceLocation;
    static readonly MobIconArrow: ResourceLocation;
    static readonly MobIconArrowBG: ResourceLocation;
    static readonly MobIcon: ResourceLocation;
    static readonly MobIconBG: ResourceLocation;
    static readonly MobIconMask: ResourceLocation;
    static readonly PlayerArrow: ResourceLocation;
    static readonly PlayerArrowBG: ResourceLocation;
    static readonly PlayerOutline: ResourceLocation;
    static readonly Logo: ResourceLocation;
    static readonly MinimapSquare128: ResourceLocation;
    static readonly MinimapSquare256: ResourceLocation;
    static readonly MinimapSquare512: ResourceLocation;
    static readonly Discord: ResourceLocation;
    static readonly CurseForge: ResourceLocation;
    static readonly Modrinth: ResourceLocation;
    static readonly ColorWheel: ResourceLocation;
    static readonly ColorWheelHandler: ResourceLocation;
    static readonly ColorBox: ResourceLocation;
    static readonly ColorVSlider: ResourceLocation;
    static readonly ColorVSliderHandler: ResourceLocation;
    static readonly ColorHistoryButton: ResourceLocation;
    static readonly Flag: ResourceLocation;
    static readonly WaypointEdit: ResourceLocation;
    static readonly WaypointOffscreen: ResourceLocation;
    static readonly colorizedWPIconMap: Map;
    static readonly waypointIconMap: Map;
    static readonly modTextureMap: Map;
    static readonly playerSkins: Map;
    static readonly themeImages: Map;
    static readonly waypointIconCache: Map;
    static flush(): void;
    static getColorizedWaypointIcon(id: string): DynamicTexture;
    static getPlayerSkin(profile: GameProfile): DynamicTexture;
    static getScaledCopy(texName: string, original: DynamicTexture, width: number, height: number, alpha: number): DynamicTexture;
    static getSizedThemeTexture(theme: Theme, iconPath: string, width: number, height: number, resize: boolean, alpha: number): DynamicTexture;
    static getTexture(texturePath: string): ResourceLocation;
    static getTexture(location: ResourceLocation): DynamicTexture;
    static getTextures(path: string): Collection<ResourceLocation>;
    static getThemeTexture(theme: Theme, iconPath: string): DynamicTexture;
    static getThemeTextureFromResource(icon: ResourceLocation): DynamicTexture;
    static getWaypointIcon(location: ResourceLocation): DynamicTexture;
    static purgeThemeImages(themeImages: Map<string, DynamicTexture>): void;
    static reset(): void;
    static resolveImage(location: ResourceLocation): NativeImage;
    static scheduleTextureTask<T extends AbstractTexture>(textureTask: Callable<T>): Future<T>;
    static spriteImage(fileName: string): ResourceLocation;
    static uiImage(fileName: string): ResourceLocation;
    static waypointTexture(fileName: string): ResourceLocation;
  }

}

declare module 'journeymap.client.texture.RegionTexture' {
  class Listener<RegionTexture = any> {
    textureImageUpdated(var1: RegionTexture): void;
  }

}

declare module 'journeymap.client.thread' {
  import { Runnable } from 'java.lang';
  import { ExecutorService } from 'java.util.concurrent';
  import { ITask } from 'journeymap.client.task.multi';

  interface RunnableTask extends Runnable {}
  class RunnableTask extends Runnable {
    constructor(taskExecutor: ExecutorService, task: ITask);
    run(): void;
  }

}

declare module 'journeymap.client.thread.RunnableTask' {
  import { Runnable } from 'java.lang';

  interface Inner extends Runnable {}
  class Inner extends Runnable {
    run(): void;
  }

}

declare module 'journeymap.client.ui.colorpalette' {
  import { Slot, ScrollListPane } from 'journeymap.client.ui.component';
  import { ColorPalette } from 'journeymap.client.cartography.color';
  import { Font, GuiGraphics, ComponentPath } from 'net.minecraft.client.gui';
  import { Collection, List } from 'java.util';
  import { SlotMetadata } from 'journeymap.client.ui.option';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { JmUI } from 'journeymap.client.ui.component.screens';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Minecraft } from 'net.minecraft.client';
  import { Type } from 'journeymap.client.cartography.color.ColorPalette';
  import { PopupButtonScreen } from 'journeymap.client.ui.component.popupscreenbutton';
  import { Mode } from 'journeymap.client.ui.colorpalette.CopyPalettePopup';
  import { DropDownButton, DropDownItem } from 'journeymap.client.ui.component.dropdown';
  import { OnPress } from 'Button';

  interface ColorPaletteItem extends Slot {}
  class ColorPaletteItem extends Slot {
    x: number;
    y: number;
    readonly palette: ColorPalette;
    readonly id: string;
    constructor(palette: ColorPalette, name: string, id: string, underDefault: boolean, fontRenderer: Font, screen: ColorPaletteScreen);
    children(): GuiEventListener[];
    contains(slotMetadata: SlotMetadata): boolean;
    displayHover(enabled: boolean): void;
    focusEditButton(): void;
    get columnWidth(): number;
    get currentTooltip(): SlotMetadata;
    get lastPressed(): SlotMetadata;
    get metadata(): Collection<SlotMetadata>;
    getChildSlots(listWidth: number, columnWidth: number): Slot[];
    mouseClicked(mouseX: number, mouseY: number, mouseEvent: number): boolean;
    render(graphics: GuiGraphics, slotIndex: number, y: number, x: number, rowWidth: number, itemHeight: number, mouseX: number, mouseY: number, isMouseOver: boolean, partialTicks: number): void;
    setEnabled(enabled: boolean): void;
  }


  interface ColorPaletteItemEditor<T extends ColorItem<any> = any> extends JmUI {}
  class ColorPaletteItemEditor<T extends ColorItem<any> = any> extends JmUI {
    constructor(id: string, name: string, saveToGlobal: boolean, saveToWorld: boolean, returnDisplay: Screen);
    init(): void;
    init(minecraft: Minecraft, width: number, height: number): void;
    render(graphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface ColorPaletteManagerScreen extends JmUI {}
  class ColorPaletteManagerScreen extends JmUI {
    constructor(returnDisplay: ColorPaletteScreen);
    init(): void;
    init(minecraft: Minecraft, width: number, height: number): void;
    renderBackground(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
  }


  interface ColorPaletteScreen extends JmUI {}
  class ColorPaletteScreen extends JmUI {
    constructor(returnDisplay: Screen);
    changeFocus(path: ComponentPath): void;
    charTyped(typedChar: string, keyCode: number): boolean;
    copyBiome(biomeId: string, globalToWorld: boolean): void;
    copyBlock(blockId: string, globalToWorld: boolean): void;
    init(): void;
    init(minecraft: Minecraft, width: number, height: number): void;
    mouseClicked(mouseX: number, mouseY: number, mouseButton: number): boolean;
    removeBiomeFromPalette(biomeId: string, type: Type): void;
    removeBlockFromPalette(blockId: string, type: Type): void;
    render(graphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
    setRemapNeeded(): void;
  }


  interface ColorPaletteScrollList<T extends ColorPaletteItem = any> extends ScrollListPane<T> {}
  class ColorPaletteScrollList<T extends ColorPaletteItem = any> extends ScrollListPane<T> {
    constructor(mc: Minecraft, x: number, y: number, width: number, height: number, slotHeight: number);
    renderBackground(graphics: GuiGraphics, i: number, j: number, f: number): void;
  }


  interface CopyPalettePopup extends PopupButtonScreen<Mode> {}
  class CopyPalettePopup extends PopupButtonScreen<Mode> {
    constructor();
    init(): void;
  }


  interface DomainDropDownButton extends DropDownButton {}
  class DomainDropDownButton extends DropDownButton {
    constructor(colorPalette: ColorPalette, onPress: OnPress);
    setSelected(selectedButton: DropDownItem): void;
  }


  interface MobsAndPlayersColorEditor extends JmUI {}
  class MobsAndPlayersColorEditor extends JmUI {
    constructor(returnDisplay: Screen);
    init(): void;
    init(minecraft: Minecraft, width: number, height: number): void;
    render(graphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface ModeDropDownButton extends DropDownButton {}
  class ModeDropDownButton extends DropDownButton {
    constructor(onPress: OnPress);
    setSelected(selectedButton: DropDownItem): void;
  }


  interface PaletteDropDownButton extends DropDownButton {}
  class PaletteDropDownButton extends DropDownButton {
    constructor(global: boolean, world: boolean, onPress: OnPress);
    setSelected(selectedButton: DropDownItem): void;
    setValidPalettes(global: boolean, world: boolean): void;
  }

}

declare module 'journeymap.client.ui.colorpalette.ColorPaletteItem' {
  import { Enum } from 'java.lang';
  import { List, Comparator } from 'java.util';
  import { ColorPaletteItem, ColorPaletteScreen } from 'journeymap.client.ui.colorpalette';
  import { ColorPalette } from 'journeymap.client.cartography.color';
  import { Font } from 'net.minecraft.client.gui';

  interface SortType extends Enum<SortType> {}
  class SortType extends Enum<SortType> {
    static readonly Id: SortType;
    static readonly Name: SortType;
    get key(): string;
    static valueOf(name: string): SortType;
    static values(): SortType[];
  }


  interface IdComparator extends Sort {}
  class IdComparator extends Sort {
    constructor(ascending: boolean);
    compare(o1: ColorPaletteItem, o2: ColorPaletteItem): number;
  }


  interface NameComparator extends Sort {}
  class NameComparator extends Sort {
    constructor(ascending: boolean);
    compare(o1: ColorPaletteItem, o2: ColorPaletteItem): number;
  }


  interface Sort extends Comparator<ColorPaletteItem> {}
  class Sort extends Comparator<ColorPaletteItem> {
    equals(o: any): boolean;
    hashCode(): number;
  }


  interface Biome extends ColorPaletteItem {}
  class Biome extends ColorPaletteItem {
    constructor(palette: ColorPalette, biomeId: string, underDefault: boolean, fontRenderer: Font, screen: ColorPaletteScreen);
  }


  interface Block extends ColorPaletteItem {}
  class Block extends ColorPaletteItem {
    constructor(palette: ColorPalette, blockId: string, underDefault: boolean, fontRenderer: Font, screen: ColorPaletteScreen);
  }

}

declare module 'journeymap.client.ui.colorpalette.ColorPaletteItemEditor' {
  import { Slot } from 'journeymap.client.ui.component';
  import { Collection, List, Map } from 'java.util';
  import { SlotMetadata } from 'journeymap.client.ui.option';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { ColorPaletteItemEditor, Biome } from 'journeymap.client.ui.colorpalette';
  import { BiomeColor, ColorPalette, BlockStateColor } from 'journeymap.client.cartography.color';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Block } from 'net.minecraft.world.level.block';

  interface ColorItem<T extends ColorPaletteItemEditor<any> = any> extends Slot {}
  class ColorItem<T extends ColorPaletteItemEditor<any> = any> extends Slot {
    children(): GuiEventListener[];
    contains(slotMetadata: SlotMetadata): boolean;
    equalColor(other: ColorItem<any>): boolean;
    get columnWidth(): number;
    get currentTooltip(): SlotMetadata;
    get lastPressed(): SlotMetadata;
    get metadata(): Collection<SlotMetadata>;
    getChildSlots(listWidth: number, columnWidth: number): Slot[];
    mouseClicked(mouseX: number, mouseY: number, mouseEvent: number): boolean;
    render(graphics: GuiGraphics, slotIndex: number, y: number, x: number, rowWidth: number, itemHeight: number, mouseX: number, mouseY: number, isMouseOver: boolean, partialTicks: number): void;
    setColor(color: number): void;
    setEnabled(enabled: boolean): void;
  }


  interface BiomeEditor extends ColorPaletteItemEditor<Biome> {}
  class BiomeEditor extends ColorPaletteItemEditor<Biome> {
    constructor(biomeId: string, biomeColor: BiomeColor, saveToGlobal: boolean, saveToWorld: boolean, returnDisplay: Screen);
    saveToPalette(palette: ColorPalette): void;
  }


  interface BlockEditor extends ColorPaletteItemEditor<Block> {}
  class BlockEditor extends ColorPaletteItemEditor<Block> {
    constructor(blockId: string, blockStatesToColor: Map<string, BlockStateColor>, saveToGlobal: boolean, saveToWorld: boolean, returnDisplay: Screen);
  }

}

declare module 'journeymap.client.ui.colorpalette.ColorPaletteItemEditor.ColorItem' {
  import { ColorItem, BiomeEditor, BlockEditor } from 'journeymap.client.ui.colorpalette.ColorPaletteItemEditor';
  import { ColorPalette } from 'journeymap.client.cartography.color';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface Biome extends ColorItem<BiomeEditor> {}
  class Biome extends ColorItem<BiomeEditor> {
    isEdited(): boolean;
    resetItemToDefault(): void;
    saveToPalette(palette: ColorPalette): void;
    undoItem(): void;
    withAlpha(): boolean;
  }


  interface Block extends ColorItem<BlockEditor> {}
  class Block extends ColorItem<BlockEditor> {
    isEdited(): boolean;
    mouseClicked(mouseX: number, mouseY: number, mouseEvent: number): boolean;
    render(graphics: GuiGraphics, slotIndex: number, y: number, x: number, rowWidth: number, itemHeight: number, mouseX: number, mouseY: number, isMouseOver: boolean, partialTicks: number): void;
    resetItemToDefault(): void;
    saveToPalette(palette: ColorPalette): void;
    undoItem(): void;
    withAlpha(): boolean;
  }

}

declare module 'journeymap.client.ui.colorpalette.ColorPaletteManagerScreen' {
  import { LinearLayout } from 'net.minecraft.client.gui.layouts';
  import { ColorPalette } from 'journeymap.client.cartography.color';
  import { Font } from 'net.minecraft.client.gui';
  import { ColorPaletteManagerScreen } from 'journeymap.client.ui.colorpalette';
  import { Mode } from 'journeymap.client.ui.colorpalette.CopyPalettePopup';

  interface Palette extends LinearLayout {}
  class Palette extends LinearLayout {
    constructor(colorPalette: ColorPalette, font: Font, screen: ColorPaletteManagerScreen);
    copyPalette(mode: Mode): void;
    deletePalette(deleteParameter: boolean): void;
    fillFromDefaultPalette(fill: boolean): void;
  }

}

declare module 'journeymap.client.ui.colorpalette.CopyPalettePopup' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Mode extends Enum<Mode> {}
  class Mode extends Enum<Mode> {
    static readonly CopyAllAndReplace: Mode;
    static readonly CopyExistingAndReplace: Mode;
    static readonly CopyNonExisting: Mode;
    static valueOf(name: string): Mode;
    static values(): Mode[];
  }

}

declare module 'journeymap.client.ui.colorpalette.MobsAndPlayersColorEditor' {
  import { Slot } from 'journeymap.client.ui.component';
  import { Collection, List } from 'java.util';
  import { SlotMetadata } from 'journeymap.client.ui.option';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';

  interface DotLabelColorItem extends Slot {}
  class DotLabelColorItem extends Slot {
    children(): GuiEventListener[];
    contains(slotMetadata: SlotMetadata): boolean;
    get columnWidth(): number;
    get currentTooltip(): SlotMetadata;
    get lastPressed(): SlotMetadata;
    get metadata(): Collection<SlotMetadata>;
    getChildSlots(listWidth: number, columnWidth: number): Slot[];
    isEdited(): boolean;
    mouseClicked(mouseX: number, mouseY: number, mouseEvent: number): boolean;
    render(graphics: GuiGraphics, slotIndex: number, y: number, x: number, rowWidth: number, itemHeight: number, mouseX: number, mouseY: number, isMouseOver: boolean, partialTicks: number): void;
    setColor(color: number): void;
    setEnabled(enabled: boolean): void;
  }

}

declare module 'journeymap.client.ui.component.buttons' {
  import { ConfigField, BooleanField, FloatField, IntegerField, CustomField } from 'journeymap.common.properties.config';
  import { OnPress } from 'Button';
  import { Button as net_minecraft_client_gui_components_Button, WidgetSprites } from 'net.minecraft.client.gui.components';
  import { Component } from 'net.minecraft.network.chat';
  import { Integer, Boolean } from 'java.lang';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { IConfigFieldHolder, ButtonList } from 'journeymap.client.ui.component';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Minecraft } from 'net.minecraft.client';
  import { SoundManager } from 'net.minecraft.client.sounds';
  import { HAlign, VAlign } from 'journeymap.client.render.draw.DrawUtil';
  import { List, Collection } from 'java.util';
  import { FormattedCharSequence } from 'net.minecraft.util';
  import { Double } from 'Rectangle2D';
  import { HoverState } from 'journeymap.client.ui.component.buttons.Button';
  import { Function, Consumer } from 'java.util.function';
  import { PopupButton } from 'journeymap.client.ui.component.popupscreenbutton';
  import { Category } from 'journeymap.common.properties.catagory';
  import { OnClose } from 'journeymap.client.ui.component.popupscreenbutton.PopupButtonScreen';
  import { ToggleListener } from 'journeymap.client.ui.component.buttons.OnOffButton';

  interface AbstractSliderButton extends FieldButton {}
  class AbstractSliderButton extends FieldButton {
    constructor(field: ConfigField<any>, label: string);

    constructor(field: ConfigField<any>, label: string, onPress: OnPress);

    constructor(field: ConfigField<any>, width: number, height: number, label: string, onPress: OnPress);
    get sliderValue(): number;
  }


  interface BasicImageButton extends net_minecraft_client_gui_components_Button {}
  class BasicImageButton extends net_minecraft_client_gui_components_Button {
    constructor(x: number, y: number, width: number, height: number, sprites: WidgetSprites, onPress: OnPress);

    constructor(x: number, y: number, width: number, height: number, sprites: WidgetSprites, onPress: OnPress, message: Component);

    constructor(x: number, y: number, width: number, height: number, sprites: WidgetSprites, color: number, onPress: OnPress, message: Component);

    constructor(width: number, height: number, sprites: WidgetSprites, color: number, onPress: OnPress, message: Component);

    constructor(width: number, height: number, sprites: WidgetSprites, onPress: OnPress, message: Component);

    constructor(width: number, height: number, sprites: WidgetSprites, onPress: OnPress);
    renderString(guiGraphics: GuiGraphics, font: Font, color: number): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    setColor(color: number): BasicImageButton;
    setTexHeight(texHeight: number): BasicImageButton;
    setTexWidth(texWidth: number): BasicImageButton;
    setXOffset(xOffset: number): BasicImageButton;
    setYOffset(yOffset: number): BasicImageButton;
  }


  interface BooleanPropertyButton extends IConfigFieldHolder<BooleanField>, OnOffButton {}
  class BooleanPropertyButton extends IConfigFieldHolder<BooleanField> {
    constructor(labelOn: string, labelOff: string, field: BooleanField, onPress: OnPress);
    get configField(): BooleanField;
    get field(): BooleanField;
    refresh(): void;
    setValue(value: boolean): void;
    toggle(): void;
  }


  interface Button extends net_minecraft_client_gui_components_Button {}
  class Button extends net_minecraft_client_gui_components_Button {
    static readonly buttonActiveResource: ResourceLocation;
    static readonly buttonDisabledResource: ResourceLocation;
    static readonly buttonHighlightedResource: ResourceLocation;
    static readonly SPRITES: WidgetSprites;
    static readonly UNSET_ACTIVE_COLOR: number;
    constructor(label: string);

    constructor(label: string, onPress: OnPress);

    constructor(width: number, height: number, label: string);

    constructor(width: number, height: number, label: string, onPress: OnPress);

    constructor(width: number, height: number, label: Component, onPress: OnPress);
    above(other: Button, margin: number): Button;
    above(y: number): Button;
    addClickListener(listener: Function<Button, boolean>): void;
    alignTo(other: Button, hAlign: HAlign, hgap: number, vAlign: VAlign, vgap: number): Button;
    below(other: Button, margin: number): Button;
    below(list: ButtonList, margin: number): Button;
    below(y: number): Button;
    centerHorizontalOn(x: number): Button;
    centerVerticalOn(y: number): Button;
    checkClickListeners(): boolean;
    clickScrollable(mc: Minecraft, mouseX: number, mouseY: number): void;
    drawHovered(drawHovered: boolean): void;
    drawPartialScrollable(graphics: GuiGraphics, minecraft: Minecraft, x: number, y: number, width: number, height: number): void;
    drawScrollable(graphics: GuiGraphics, mc: Minecraft, mouseX: number, mouseY: number): void;
    drawUnderline(drawUnderline: boolean): void;
    drawUnderline(graphics: GuiGraphics): void;
    static emptyPressable(): OnPress;
    fitWidth(fr: Font): void;
    get activeColor(): number;
    get bottomY(): number;
    get bounds(): Double;
    get buttonHeight(): number;
    get centerX(): number;
    get displayString(): string;
    get label(): string;
    get labelColor(): number;
    get middleY(): number;
    get rightX(): number;
    get scrollableWidth(): number;
    get unformattedTooltip(): string;
    get wrappedTooltip(): FormattedCharSequence[];
    getFitWidth(fr: Font): number;
    isActive(): boolean;
    isDefaultStyle(): boolean;
    isDrawBackground(): boolean;
    isDrawBackgroundOnDisable(): boolean;
    isDrawFrame(): boolean;
    isEnabled(): boolean;
    isHovered(): boolean;
    isMouseOver(x: number, y: number): boolean;
    isMouseOver(): boolean;
    isVisible(): boolean;
    leftOf(x: number): Button;
    leftOf(other: Button, margin: number): Button;
    mouseMoved(mouseX: number, mouseY: number): void;
    mouseOver(mouseX: number, mouseY: number): boolean;
    onPress(): void;
    playDownSound(soundHandler: SoundManager): void;
    refresh(): void;
    renderSpecialDecoration(graphics: GuiGraphics, mouseX: number, mouseY: number, x: number, y: number, width: number, height: number): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    resetLabelColors(): void;
    rightOf(x: number): Button;
    rightOf(other: Button, margin: number): Button;
    secondaryDrawButton(): void;
    set scrollableWidth(width: number);
    setBackgroundColors(customBgColor: number, customBgHoverColor: number, customBgHoverColor2: number): void;
    setDefaultStyle(defaultStyle: boolean): void;
    setDrawBackground(drawBackground: boolean): void;
    setDrawBackgroundOnDisable(drawBackgroundOnDisable: boolean): void;
    setDrawButton(drawButton: boolean): void;
    setDrawFrame(drawFrame: boolean): void;
    setDrawLabelShadow(draw: boolean): void;
    setEnabled(enabled: boolean): void;
    setHeight(height: number): void;
    setHorizontalAlignment(horizontalAlignment: HAlign): void;
    setHovered(hovered: boolean): void;
    setLabelColors(labelColor: number, hoverLabelColor: number, disabledLabelColor: number): void;
    setMouseOver(hover: boolean): void;
    setOnHover(hoverState: HoverState): void;
    setScrollablePosition(x: number, y: number): void;
    setTextOnly(fr: Font): void;
    setTooltip(...tooltip: string[]): void;
    setTooltip(size: number, ...tooltip: string[]): void;
    setVisible(visible: boolean): void;
    setWidth(width: number): void;
    setX(x: number): void;
    setY(y: number): void;
    showDisabledOnHover(show: boolean): void;
    toString(): string;
  }


  interface CheckBox extends BooleanPropertyButton {}
  class CheckBox extends BooleanPropertyButton {
    boxWidth: number;
    constructor(label: string, checked: boolean, pressable: OnPress);

    constructor(label: string, field: BooleanField, pressable: OnPress);

    constructor(label: string, checked: boolean);

    constructor(label: string, field: BooleanField);
    getFitWidth(fr: Font): number;
    isDrawText(): boolean;
    keyPressed(key: number, value: number, modifier: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, ticks: number): void;
    setDrawText(drawText: boolean): void;
  }


  interface CopyConfigButton extends PopupButton<Category> {}
  class CopyConfigButton extends PopupButton<Category> {
    constructor(label: string, categoryFrom: Category, toCategories: Category[], onClose: OnClose<Category>);
  }


  interface FieldButton extends Button {}
  class FieldButton extends Button {
    constructor(field: ConfigField<any>, label: string);

    constructor(field: ConfigField<any>, label: string, onPress: OnPress);

    constructor(field: ConfigField<any>, width: number, height: number, label: string, onPress: OnPress);
    get customFieldTooltip(): string;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface FloatSliderButton extends IConfigFieldHolder<FloatField>, SliderButton, AbstractSliderButton {}
  class FloatSliderButton extends IConfigFieldHolder<FloatField> {
    prefix: string;
    dragging: boolean;
    minValue: number;
    maxValue: number;
    suffix: string;
    drawString: boolean;
    constructor(field: FloatField, prefix: string, suf: string);

    constructor(field: FloatField, prefix: string, suf: string, minVal: number, maxVal: number);

    constructor(field: FloatField, prefix: string, suf: string, minVal: number, maxVal: number, incrementValue: number, precision: number);
    get configField(): FloatField;
    get sliderValue(): number;
    get value(): number;
    getFitWidth(fr: Font): number;
    keyPressed(key: number, value: number, modifier: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, mouseDX: number, mouseDY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, mouseButton: number): boolean;
    refresh(): void;
    set sliderValue(sliderValue: number);
    set value(value: number);
    updateLabel(): void;
  }


  interface IntSliderButton extends IConfigFieldHolder<IntegerField>, SliderButton, AbstractSliderButton {}
  class IntSliderButton extends IConfigFieldHolder<IntegerField> {
    prefix: string;
    dragging: boolean;
    minValue: number;
    maxValue: number;
    suffix: string;
    drawString: boolean;
    constructor(field: IntegerField, prefix: string, suf: string);

    constructor(field: IntegerField, prefix: string, suf: string, drawStr: boolean);
    get configField(): IntegerField;
    get sliderValue(): number;
    get value(): number;
    getFitWidth(fr: Font): number;
    keyPressed(key: number, value: number, modifier: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, mouseDX: number, mouseDY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, mouseButton: number): boolean;
    refresh(): void;
    set sliderValue(sliderValue: number);
    set value(value: number);
    updateLabel(): void;
  }


  interface ListPropertyButton<T = any> extends IConfigFieldHolder<ConfigField>, Button {}
  class ListPropertyButton<T = any> extends IConfigFieldHolder<ConfigField> {
    constructor(values: Collection<T>, label: string, field: ConfigField<T>, pressable: OnPress);

    constructor(values: Collection<T>, label: string, field: ConfigField<T>);
    get configField(): ConfigField<T>;
    get field(): ConfigField<T>;
    getFitWidth(fr: Font): number;
    keyTyped(c: string, i: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    nextOption(): void;
    prevOption(): void;
    refresh(): void;
    setValue(value: T): void;
  }


  interface OnOffButton extends Button {}
  class OnOffButton extends Button {
    constructor(labelOn: string, labelOff: string, toggled: boolean, onPress: OnPress);
    addToggleListener(toggleListener: ToggleListener): void;
    get toggled(): boolean;
    getFitWidth(fr: Font): number;
    isActive(): boolean;
    set toggled(toggled: boolean);
    setLabels(labelOn: string, labelOff: string): void;
    setToggled(toggled: boolean, notifyToggleListener: boolean): void;
    toggle(): void;
  }


  interface RadioButton extends net_minecraft_client_gui_components_Button {}
  class RadioButton extends net_minecraft_client_gui_components_Button {
    constructor(width: number, height: number, message: Component, state: boolean, onPress: OnPress);
    setState(state: boolean): void;
    state(): boolean;
    toggle(): void;
  }


  interface ResetButton extends Button {}
  class ResetButton extends Button {
    readonly category: Category;
    constructor(category: Category);

    constructor(category: Category, onPress: OnPress);
  }


  class SliderButton {
    mouseDragged(var1: number, var3: number, var5: number, var6: number, var8: number): boolean;
  }


  interface SortButton extends OnOffButton {}
  class SortButton extends OnOffButton {
    constructor(message: string, key: string, toggled: boolean, onPress: OnPress);
    get key(): string;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, f: number): void;
    setSorting(sorting: boolean): void;
  }


  interface TextBoxButton extends Button {}
  class TextBoxButton extends Button {
    constructor(text: string);

    constructor(text: any, fontRenderer: Font, width: number, height: number);

    constructor(text: any, fontRenderer: Font, width: number, height: number, isNumeric: boolean, negative: boolean);
    charTyped(typedChar: string, keyCode: number): boolean;
    get bottomY(): number;
    get centerX(): number;
    get height(): number;
    get middleY(): number;
    get rightX(): number;
    get selectedText(): string;
    get text(): string;
    get width(): number;
    isActive(): boolean;
    isFocused(): boolean;
    isHoveredOrFocused(): boolean;
    keyPressed(key: number, value: number, modifier: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, mouseButton: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, mouseDX: number, mouseDY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, mouseButton: number): boolean;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    set text(text: string);
    set width(width: number);
    setFocused(focused: boolean): void;
    setMinLength(minLength: number): void;
    setResponder(responder: Consumer<string>): void;
    setVisible(visible: boolean): void;
  }


  interface TextFieldButton extends IConfigFieldHolder<CustomField>, TextBoxButton {}
  class TextFieldButton extends IConfigFieldHolder<CustomField> {
    constructor(field: CustomField);
    charTyped(typedChar: string, keyCode: number): boolean;
    get configField(): CustomField;
    getFitWidth(fr: Font): number;
    keyPressed(key: number, value: number, modifier: number): boolean;
    refresh(): void;
    setValue(value: any): void;
    updateValue(value: any): void;
  }


  interface ThreeLineButton extends Button {}
  class ThreeLineButton extends Button {
    constructor(gap: number, width: number, height: number, onPress: OnPress);
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface ToggleButton extends Button {}
  class ToggleButton extends Button {
    constructor();

    constructor(label: string, onPress: OnPress);

    constructor(width: number, height: number, label: string, onPress: OnPress);
    mouseClicked(x: number, y: number, button: number): boolean;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }

}

declare module 'journeymap.client.ui.component.buttons.Button' {
  import { Button } from 'journeymap.client.ui.component.buttons';

  class HoverState {
    onHoverState(var1: Button, var2: boolean): void;
  }

}

declare module 'journeymap.client.ui.component.buttons.OnOffButton' {
  import { OnOffButton } from 'journeymap.client.ui.component.buttons';

  class ToggleListener {
    onToggle(var1: OnOffButton, var2: boolean): boolean;
  }

}

declare module 'journeymap.client.ui.component.buttons.RadioButton' {
  import { RadioButton } from 'journeymap.client.ui.component.buttons';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { OnPress } from 'Button';
  import { ColoredImageWidget } from 'journeymap.client.ui.component.widgets';
  import { Component } from 'net.minecraft.network.chat';

  interface ImageRadioButton extends RadioButton {}
  class ImageRadioButton extends RadioButton {
    constructor(width: number, height: number, textureWidth: number, textureHeight: number, texture: ResourceLocation, state: boolean, onPress: OnPress);
    get imageWidget(): ColoredImageWidget;
  }


  interface TextRadioButton extends RadioButton {}
  class TextRadioButton extends RadioButton {
    constructor(width: number, height: number, message: Component, state: boolean, onPress: OnPress);
  }

}

declare module 'journeymap.client.ui.component' {
  import { Minecraft } from 'net.minecraft.client';
  import { List, Optional, Collection } from 'java.util';
  import { Button } from 'journeymap.client.ui.component.buttons';
  import { Font, GuiGraphics, ComponentPath } from 'net.minecraft.client.gui';
  import { HAlign } from 'journeymap.client.render.draw.DrawUtil';
  import { LayoutElement } from 'net.minecraft.client.gui.layouts';
  import { Consumer } from 'java.util.function';
  import { AbstractWidget, ObjectSelectionList, EditBox } from 'net.minecraft.client.gui.components';
  import { SlotMetadata } from 'journeymap.client.ui.option';
  import { FocusNavigationEvent } from 'net.minecraft.client.gui.navigation';
  import { NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { ScrollPaneEntry } from 'journeymap.client.ui.component.ScrollPane';
  import { Double } from 'Point2D';
  import { JmUILegacy } from 'journeymap.client.ui.component.screens';
  import { GuiEventListener, ContainerEventHandler } from 'net.minecraft.client.gui.components.events';
  import { Entry } from 'ObjectSelectionList';
  import { Component } from 'net.minecraft.network.chat';
  import { OnPress } from 'journeymap.client.ui.component.TextBox';
  import { Integer } from 'java.lang';

  interface DraggableListPane<T extends Slot = any> extends ScrollListPane<T> {}
  class DraggableListPane<T extends Slot = any> extends ScrollListPane<T> {
    constructor(mc: Minecraft, width: number, height: number, x: number, y: number);
    get height(): number;
    get width(): number;
    isClicked(): boolean;
    mouseClicked(pMouseX: number, pMouseY: number, pButton: number): boolean;
    mouseDragged(pMouseX: number, pMouseY: number, pButton: number, pDragX: number, pDragY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, mouseButton: number): boolean;
    setClicked(clicked: boolean): void;
    setSlots(slots: T[]): void;
    updatePosition(x: number, y: number): void;
    updateSize(width: number, height: number, x: number, y: number): void;
  }


  class IConfigFieldHolder<T extends ConfigField = any> {
    get configField(): T;
  }


  interface Label extends Button {}
  class Label extends Button {
    constructor(width: number, key: string, ...labelArgs: any[]);
    fitWidth(fr: Font): void;
    getFitWidth(fr: Font): number;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, ticks: number): void;
    setHAlign(hAlign: HAlign): void;
  }


  interface LayoutSlot<T = any> extends Slot<T> {}
  class LayoutSlot<T = any> extends Slot<T> {
    get layout(): LayoutElement;
    init(): void;
    repositionElements(): void;
  }


  interface MultiSelectableScrollListPane<T extends Slot = any> extends ScrollListPane<T> {}
  class MultiSelectableScrollListPane<T extends Slot = any> extends ScrollListPane<T> {
    constructor(mc: Minecraft, x: number, y: number, width: number, height: number, slotHeight: number);
    get allSelected(): Slot[];
    get selectedCount(): number;
    get totalItemHeight(): number;
    isSelectedItem(index: number): boolean;
    isSelectedItem(slot: Slot): boolean;
    renderBackground(graphics: GuiGraphics, i: number, j: number, f: number): void;
    selectAll(): void;
    setSelected(slot: Slot): void;
    setSelectedAndKeepCurrent(slot: Slot): void;
  }


  class Removable {
    onRemove(): void;
  }


  interface ScrollListLayoutPane<T extends LayoutSlot = any> extends ScrollListPane<T> {}
  class ScrollListLayoutPane<T extends LayoutSlot = any> extends ScrollListPane<T> {
    constructor(mc: Minecraft, x: number, y: number, width: number, height: number, slotHeight: number);
    initSlots(): void;
    renderItem(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number, index: number, left: number, top: number, width: number, height: number): void;
    repositionSlots(): void;
    setListWidth(width: number): void;
    updateSize(width: number, height: number, x: number, y: number): void;
    visitSlots(consumer: Consumer<AbstractWidget>): void;
  }


  interface ScrollListPane<T extends Slot = any> extends ObjectSelectionList<Slot> {}
  class ScrollListPane<T extends Slot = any> extends ObjectSelectionList<Slot> {
    lastTooltipMetadata: SlotMetadata;
    lastTooltip: List;
    lastTooltipTime: number;
    hoverDelay: number;
    constructor(mc: Minecraft, x: number, y: number, width: number, height: number, slotHeight: number);
    charTyped(typedChar: string, keyCode: number): boolean;
    get height(): number;
    get itemHeight(): number;
    get lastPressed(): SlotMetadata;
    get lastPressedParentSlot(): Slot;
    get rootSlots(): T[];
    get rowWidth(): number;
    get top(): number;
    getSlot(index: number): Slot;
    isSelectedItem(index: number): boolean;
    keyPressed(key: number, value: number, modifier: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, mouseDX: number, mouseDY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, mouseButton: number): boolean;
    nextFocusPath(focusNavigationEvent: FocusNavigationEvent): ComponentPath;
    renderListItems(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    resetLastPressed(): void;
    scrollTo(slot: Slot): void;
    setAlignTop(alignTop: boolean): void;
    setListWidth(width: number): void;
    setSlots(slots: T[]): void;
    updateSize(width: number, height: number, x: number, y: number): void;
    updateSlots(): void;
    updateWidgetNarration(narrationElementOutput: NarrationElementOutput): void;
  }


  interface ScrollPane extends ObjectSelectionList<ScrollPaneEntry> {}
  class ScrollPane extends ObjectSelectionList<ScrollPaneEntry> {
    paneWidth: number;
    paneHeight: number;
    origin: Double;
    constructor(parent: JmUILegacy, mc: Minecraft, width: number, height: number, items: Button[], itemHeight: number, itemGap: number);
    get maxScroll(): number;
    get slotHeight(): number;
    get width(): number;
    get x(): number;
    get y(): number;
    getButton(mouseX: number, mouseY: number): Button;
    getChildAt(mouseX: number, mouseY: number): Optional<GuiEventListener>;
    getFitWidth(fr: Font): number;
    inFullView(item: Button): boolean;
    isMouseOver(posX: number, posY: number): boolean;
    isScrollVisible(): boolean;
    isSelectedItem(i: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, mouseButton: number): Button;
    mouseDragged(mouseX: number, mouseY: number, button: number, mouseDX: number, mouseDY: number): boolean;
    mouseMoved(mouseX: number, mouseY: number): void;
    renderItem(graphics: GuiGraphics, index: number, y: number, x: number, l: number, var6: number, var7: number, f: number): void;
    renderWidget(graphics: GuiGraphics, mX: number, mY: number, partialTicks: number): void;
    setDimensions(width: number, height: number, marginTop: number, marginBottom: number, x: number, y: number): void;
    setDrawPartialScrollable(value: boolean): void;
    setRenderDecorations(value: boolean): void;
    setRenderSelection(renderSelection: boolean): void;
    setRenderSolidBackground(value: boolean): void;
    updateScrollingState(xPos: number, yPos: number, button: number): void;
  }


  interface SearchTextBox extends EditBox {}
  class SearchTextBox extends EditBox {
    constructor(value: string, fontRenderer: Font, width: number, height: number);
    get innerWidth(): number;
    isDrawBackground(): boolean;
    mouseClicked(mouseX: number, mouseY: number, mouseButton: number): boolean;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    selectAll(): void;
    setDrawBackground(drawBackground: boolean): void;
    setFillColor(fillColor: number): void;
    setFillColor(fillColor: number, alpha: number): void;
  }


  interface Slot<T = any> extends ContainerEventHandler, Entry<Slot> {}
  class Slot<T = any> extends ContainerEventHandler {
    children(): GuiEventListener[];
    contains(var1: SlotMetadata<T>): boolean;
    displayHover(enabled: boolean): void;
    focusPathAtIndex(focusNavigationEvent: FocusNavigationEvent, index: number): ComponentPath;
    get columnWidth(): number;
    get currentFocusPath(): ComponentPath;
    get currentTooltip(): SlotMetadata<T>;
    get focused(): GuiEventListener;
    get lastPressed(): SlotMetadata<T>;
    get metadata(): Collection<SlotMetadata<T>>;
    get narration(): Component;
    getChildSlots(var1: number, var2: number): Slot<T>[];
    getCurrentTooltip(mouseX: number, mouseY: number): SlotMetadata<T>;
    isDragging(): boolean;
    set focused(guiEventListener: GuiEventListener);
    setDragging($$0: boolean): void;
    setEnabled(var1: boolean): void;
  }


  interface TextBox extends EditBox {}
  class TextBox extends EditBox {
    constructor(text: any, fontRenderer: Font, width: number, height: number);

    constructor(text: any, fontRenderer: Font, width: number, height: number, onPress: OnPress);

    constructor(text: any, fontRenderer: Font, width: number, height: number, isNumeric: boolean, negative: boolean);

    constructor(text: any, fontRenderer: Font, width: number, height: number, isNumeric: boolean, negative: boolean, onPress: OnPress);
    charTyped(c: string, key: number): boolean;
    clamp(): number;
    clamp(text: string): number;
    get bottomY(): number;
    get centerX(): number;
    get height(): number;
    get middleY(): number;
    get rightX(): number;
    get width(): number;
    get x(): number;
    get y(): number;
    hasErrorState(): boolean;
    hasMinLength(): boolean;
    insertText(par1Str: string): void;
    isAllSelected(): boolean;
    isHovered(): boolean;
    isNumeric(): boolean;
    keyPressed(key: number, value: number, modifier: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, mouseButton: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, mouseDX: number, mouseDY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, mouseButton: number): boolean;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    selectAll(): void;
    set height(h: number);
    set width(w: number);
    set x(x: number);
    set y(y: number);
    setClamp(min: number, max: number): void;
    setCursorPosition(position: number): void;
    setErrorState(hasError: boolean): void;
    setFocused(focused: boolean): void;
    setMinLength(minLength: number): void;
    setText(object: any): void;
  }

}

declare module 'journeymap.client.ui.component.dropdown' {
  import { OnPress } from 'Button';
  import { List, Collection } from 'java.util';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { Button } from 'journeymap.client.ui.component.buttons';
  import { Removable, IConfigFieldHolder } from 'journeymap.client.ui.component';
  import { DynamicTexture } from 'net.minecraft.client.renderer.texture';
  import { ScrollPaneScreen } from 'journeymap.client.ui.component.screens';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ConfigField } from 'journeymap.common.properties.config';

  interface ActionsDropDownButton extends DropDownButton {}
  class ActionsDropDownButton extends DropDownButton {
    constructor(label: string, onPress: OnPress);
    get height(): number;
    get paneWidth(): number;
    get width(): number;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    setItems(items: DropDownItem[]): void;
    setMatchPaneWidth(matchPaneWidth: boolean): void;
    setMaxHeight(maxHeight: number): void;
  }


  interface DropDownButton extends Removable, SelectableParent, Button {}
  class DropDownButton extends Removable {
    constructor(label: string, onPress: OnPress);
    get height(): number;
    get selected(): DropDownItem;
    get width(): number;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    onRemove(): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    set selected(selected: DropDownItem);
    setButtonBuffer(buttonBuffer: number): void;
    setItems(items: DropDownItem[]): void;
    setRenderDecorations(value: boolean): void;
    setRenderSolidBackground(value: boolean): void;
    setSelectedId(id: string): void;
  }


  interface DropDownItem extends Button {}
  class DropDownItem extends Button {
    constructor(parent: SelectableParent, id: any, label: string, onPress: OnPress, ...toolTip: string[]);

    constructor(parent: SelectableParent, id: any, label: string, onPress: OnPress);

    constructor(parent: SelectableParent, id: any, label: string, ...toolTip: string[]);

    constructor(parent: SelectableParent, id: any, label: string);

    constructor(parent: SelectableParent, id: any, autoClose: boolean, label: string, onPress: OnPress);
    get id(): any;
    get label(): string;
    isAutoClose(): boolean;
    isHovered(): boolean;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    isMouseOver(): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    press(): void;
    renderSpecialDecoration(graphics: GuiGraphics, mouseX: number, mouseY: number, x: number, y: number, width: number, height: number): void;
    select(): void;
  }


  interface ImageDropDownItem extends DropDownItem {}
  class ImageDropDownItem extends DropDownItem {
    constructor(parent: SelectableParent, id: any, texture: DynamicTexture, textureWidth: number, textureHeight: number, onPress: OnPress, ...toolTip: string[]);
    renderImage(graphics: GuiGraphics, x: number, y: number): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    setBlur(): ImageDropDownItem;
    setColor(color: number): void;
  }


  interface PopupMenu extends Removable, SelectableParent, ScrollPaneScreen {}
  class PopupMenu extends Removable {
    constructor(parent: PopupMenu);

    constructor(parent: Screen);
    closeStack(): void;
    display(items: DropDownItem[]): void;
    display(): void;
    isMouseOver(): boolean;
    isPauseScreen(): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseMoved(mouseX: number, mouseY: number): void;
    onClick(pressed: DropDownItem): void;
    onRemove(): void;
    renderPopupScreen(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    resetPass(): void;
    setClickLoc(mouseX: number, mouseY: number): void;
    setSelected(button: DropDownItem): void;
  }


  interface PropertyDropdownButton<T = any> extends IConfigFieldHolder<ConfigField>, DropDownButton {}
  class PropertyDropdownButton<T = any> extends IConfigFieldHolder<ConfigField> {
    constructor(values: Collection<T>, label: string, field: ConfigField<T>, pressable: OnPress);

    constructor(values: Collection<T>, label: string, field: ConfigField<T>);
    get configField(): ConfigField<T>;
    get field(): ConfigField<T>;
    get width(): number;
    getFitWidth(fr: Font): number;
    refresh(): void;
    set width(width: number);
    setSelected(selected: DropDownItem): void;
    setValue(value: T): void;
  }


  class SelectableParent {
    setSelected(var1: DropDownItem): void;
  }

}

declare module 'journeymap.client.ui.component.popupscreenbutton.blockflags' {
  import { PopupButton, PopupButtonScreen } from 'journeymap.client.ui.component.popupscreenbutton';
  import { Supplier } from 'java.util.function';
  import { EnumSet } from 'java.util';
  import { BlockFlag } from 'journeymap.client.model.block';
  import { OnClose } from 'journeymap.client.ui.component.popupscreenbutton.PopupButtonScreen';
  import { BlockFlagsResponse } from 'journeymap.client.ui.component.popupscreenbutton.blockflags.BlockFlagsScreen';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface BlockFlagsButton extends PopupButton<BlockFlagsResponse> {}
  class BlockFlagsButton extends PopupButton<BlockFlagsResponse> {
    constructor(width: number, height: number, flags: Supplier<EnumSet<BlockFlag>>, onClose: OnClose<BlockFlagsResponse>);
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface BlockFlagsScreen extends PopupButtonScreen<BlockFlagsResponse> {}
  class BlockFlagsScreen extends PopupButtonScreen<BlockFlagsResponse> {
    init(): void;
  }

}

declare module 'journeymap.client.ui.component.popupscreenbutton.colorpicker' {
  import { PopupButton, PopupButtonScreen } from 'journeymap.client.ui.component.popupscreenbutton';
  import { IntSupplier, BooleanSupplier } from 'java.util.function';
  import { OnClose } from 'journeymap.client.ui.component.popupscreenbutton.PopupButtonScreen';
  import { ColorPickerResponse } from 'journeymap.client.ui.component.popupscreenbutton.colorpicker.ColorPickerScreen';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface ColorPickerButton extends PopupButton<ColorPickerResponse> {}
  class ColorPickerButton extends PopupButton<ColorPickerResponse> {
    constructor(width: number, height: number, color: IntSupplier, onClose: OnClose<ColorPickerResponse>);

    constructor(width: number, height: number, color: IntSupplier, withAlpha: BooleanSupplier, onClose: OnClose<ColorPickerResponse>);
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface ColorPickerScreen extends PopupButtonScreen<ColorPickerResponse> {}
  class ColorPickerScreen extends PopupButtonScreen<ColorPickerResponse> {
    charTyped(typedChar: string, keyCode: number): boolean;
    init(): void;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    renderPopupScreen(graphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
    renderPopupScreenBackground(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
  }

}

declare module 'journeymap.client.ui.component.popupscreenbutton.copyconfig' {
  import { PopupButtonScreen } from 'journeymap.client.ui.component.popupscreenbutton';
  import { Category } from 'journeymap.common.properties.catagory';

  interface CopyConfigScreen extends PopupButtonScreen<Category> {}
  class CopyConfigScreen extends PopupButtonScreen<Category> {
    constructor(from: Category, to: Category[]);
    copy(categoryTo: Category): void;
    init(): void;
  }

}

declare module 'journeymap.client.ui.component.popupscreenbutton' {
  import { WidgetSprites } from 'net.minecraft.client.gui.components';
  import { Component } from 'net.minecraft.network.chat';
  import { Supplier } from 'java.util.function';
  import { OnClose } from 'journeymap.client.ui.component.popupscreenbutton.PopupButtonScreen';
  import { Integer } from 'java.lang';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { Button } from 'journeymap.client.ui.component.buttons';
  import { AbstractPopupScreen } from 'journeymap.client.ui.component.screens';

  interface ImagePopupButton<T = any> extends PopupButton<T> {}
  class ImagePopupButton<T = any> extends PopupButton<T> {
    constructor(width: number, height: number, sprites: WidgetSprites, title: Component, screen: Supplier<PopupButtonScreen<T>>, onClose: OnClose<T>);

    constructor(width: number, height: number, sprites: WidgetSprites, color: number, title: Component, screen: Supplier<PopupButtonScreen<T>>, onClose: OnClose<T>);
    renderString(guiGraphics: GuiGraphics, font: Font, color: number): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
  }


  interface PopupButton<T = any> extends Button {}
  class PopupButton<T = any> extends Button {
    constructor(width: number, height: number, title: Component, screen: Supplier<PopupButtonScreen<T>>, onClose: OnClose<T>);
  }


  interface PopupButtonScreen<T = any> extends AbstractPopupScreen {}
  class PopupButtonScreen<T = any> extends AbstractPopupScreen {
  }

}

declare module 'journeymap.client.ui.component.popupscreenbutton.imageselect' {
  import { LayoutSlot, Slot, ScrollListLayoutPane } from 'journeymap.client.ui.component';
  import { Layout } from 'net.minecraft.client.gui.layouts';
  import { Collection, List, Optional } from 'java.util';
  import { SlotMetadata } from 'journeymap.client.ui.option';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { PopupButton, PopupButtonScreen } from 'journeymap.client.ui.component.popupscreenbutton';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Integer, Comparable } from 'java.lang';
  import { Component } from 'net.minecraft.network.chat';
  import { Supplier } from 'java.util.function';
  import { OnClose } from 'journeymap.client.ui.component.popupscreenbutton.PopupButtonScreen';
  import { Response } from 'journeymap.client.ui.component.popupscreenbutton.imageselect.ImageSelectionScreen';
  import { Image } from 'journeymap.client.ui.component.widgets.ColoredImageWidget';

  interface ImageListSlot extends LayoutSlot<ImageSlot> {}
  class ImageListSlot extends LayoutSlot<ImageSlot> {
    addImage(image: ImageSlot): void;
    contains(slotMetadata: SlotMetadata<ImageSlot>): boolean;
    get currentTooltip(): SlotMetadata;
    get lastPressed(): SlotMetadata<ImageSlot>;
    get layout(): Layout;
    get metadata(): Collection<SlotMetadata<ImageSlot>>;
    getChildAt(mouseX: number, mouseY: number): Optional<GuiEventListener>;
    getChildSlots(listWidth: number, columnWidth: number): Slot<ImageSlot>[];
    init(): void;
    render(graphics: GuiGraphics, slotIndex: number, y: number, x: number, rowWidth: number, itemHeight: number, mouseX: number, mouseY: number, isMouseOver: boolean, partialTicks: number): void;
    repositionElements(): void;
    setEnabled(enabled: boolean): void;
    updateColor(color: number): void;
  }


  interface ImageScrollListPane<T extends ImageListSlot = any> extends ScrollListLayoutPane<ImageListSlot> {}
  class ImageScrollListPane<T extends ImageListSlot = any> extends ScrollListLayoutPane<ImageListSlot> {
    constructor(x: number, y: number, width: number, height: number, slotHeight: number);
    renderSelection(guiGraphics: GuiGraphics, top: number, width: number, height: number, outerColor: number, innerColor: number): void;
  }


  interface ImageSelectButton<T = any> extends PopupButton<T> {}
  class ImageSelectButton<T = any> extends PopupButton<T> {
    constructor(width: number, height: number, imageWidth: number, imageHeight: number, location: ResourceLocation, color: number, title: Component, screen: Supplier<PopupButtonScreen<T>>, onClose: OnClose<T>);
    renderString(guiGraphics: GuiGraphics, font: Font, color: number): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    setColor(color: number): void;
    setLocation(location: ResourceLocation): void;
  }


  interface ImageSelectionScreen extends PopupButtonScreen<Response> {}
  class ImageSelectionScreen extends PopupButtonScreen<Response> {
    constructor(component: Component, initialSelected: ResourceLocation, icons: ResourceLocation[], color: number);
    init(): void;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
  }


  interface ImageSlot extends Comparable<ImageSlot>, Image {}
  class ImageSlot extends Comparable<ImageSlot> {
    compareTo(o: ImageSlot): number;
    fileName(): string;
    get image(): ResourceLocation;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    set image(image: ResourceLocation);
  }

}

declare module 'journeymap.client.ui.component.popupscreenbutton.PopupButtonScreen' {
  class OnClose<T = any> {
    closed(var1: T): void;
  }

}

declare module 'journeymap.client.ui.component.popupscreenbutton.simple' {
  import { PopupButtonScreen } from 'journeymap.client.ui.component.popupscreenbutton';
  import { Boolean } from 'java.lang';
  import { Component } from 'net.minecraft.network.chat';

  interface ConfirmationPopup extends PopupButtonScreen<boolean> {}
  class ConfirmationPopup extends PopupButtonScreen<boolean> {
    constructor(messageKey: string, confirmKey: string, cancelKey: string);
    init(): void;
  }


  interface TextBoxPopup extends PopupButtonScreen<string> {}
  class TextBoxPopup extends PopupButtonScreen<string> {
    constructor(title: Component);
  }

}

declare module 'journeymap.client.ui.component.screens' {
  import { LayeredScreen } from 'journeymap.api.v2.client.ui.component';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Stack, List } from 'java.util';
  import { Minecraft } from 'net.minecraft.client';
  import { Double } from 'Point2D';
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { Removable, ScrollPane } from 'journeymap.client.ui.component';
  import { DropDownItem } from 'journeymap.client.ui.component.dropdown';

  interface AbstractPopupScreen extends LayeredScreen {}
  class AbstractPopupScreen extends LayeredScreen {
    renderPopupScreenBackground(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
  }


  interface JmUI extends Screen {}
  class JmUI extends Screen {
    static returnDisplayStack: Stack;
    constructor(title: string, hasHeaderAndFooter: boolean);

    constructor(title: string, hasHeaderAndFooter: boolean, returnDisplay: Screen);
    static calculateScaleFactor(): number;
    closeWithKeyBind(): void;
    drawGradientRect(graphics: GuiGraphics, pX1: number, pY1: number, pX2: number, pY2: number, pColorFrom: number, pColorTo: number, pBlitOffset: number): void;
    get fontRenderer(): Font;
    get minecraft(): Minecraft;
    static get mousePos(): Double;
    get renderables(): Renderable[];
    get returnDisplay(): Screen;
    init(minecraft: Minecraft, width: number, height: number): void;
    init(): void;
    isPauseScreen(): boolean;
    keyPressed(key: number, value: number, modifier: number): boolean;
    render(graphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
    renderBackground(graphics: GuiGraphics, i: number, j: number, f: number): void;
    renderWrappedToolTip(graphics: GuiGraphics, tooltip: List, mouseX: number, mouseY: number, fontRenderer: Font): void;
  }


  interface JmUILegacy extends Screen {}
  class JmUILegacy extends Screen {
    constructor(title: string);

    constructor(title: string, returnDisplay: Screen);
    charTyped(c: string, i: number): boolean;
    closeWithKeyBind(): void;
    drawGradientRect(graphics: GuiGraphics, pX1: number, pY1: number, pX2: number, pY2: number, pColorFrom: number, pColorTo: number, pBlitOffset: number): void;
    get buttonList(): List;
    get fontRenderer(): Font;
    get minecraft(): Minecraft;
    get renderables(): Renderable[];
    get returnDisplay(): Screen;
    init(minecraft: Minecraft, width: number, height: number): void;
    init(): void;
    isPauseScreen(): boolean;
    keyPressed(key: number, value: number, modifier: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, mouseEvent: number): boolean;
    render(graphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
    renderBackground(graphics: GuiGraphics, i: number, j: number, f: number): void;
    renderTooltip(graphics: GuiGraphics, tooltip: string[], mouseX: number, mouseY: number): void;
    renderWrappedToolTip(graphics: GuiGraphics, tooltip: List, mouseX: number, mouseY: number, fontRenderer: Font): void;
    setRenderBottomBar(renderBottomBar: boolean): void;
    sizeDisplay(graphics: GuiGraphics, scaled: boolean): void;
  }


  interface ScrollPaneScreen extends LayeredScreen {}
  class ScrollPaneScreen extends LayeredScreen {
    visible: boolean;
    constructor(parent: Removable, items: DropDownItem[], paneWidth: number, paneHeight: number, paneX: number, paneY: number);
    display(): void;
    get paneHeight(): number;
    get paneWidth(): number;
    get paneX(): number;
    get paneY(): number;
    get scrollPane(): ScrollPane;
    isPauseScreen(): boolean;
    keyReleased(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, mouseDX: number, mouseDY: number): boolean;
    mouseMoved(mouseX: number, mouseY: number): void;
    mouseOverPane(x: number, y: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, mouseButton: number): boolean;
    mouseScrolled(x: number, y: number, f: number, scroll: number): boolean;
    onClick(pressed: DropDownItem): void;
    onClose(): void;
    renderPopupScreen(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    set paneHeight(paneHeight: number);
    set paneWidth(paneWidth: number);
    set paneX(paneX: number);
    set paneY(paneY: number);
    setItems(items: DropDownItem[]): void;
    setParent(removable: Removable): void;
    setRenderDecorations(renderDecorations: boolean): void;
    setRenderSolidBackground(renderSolidBackground: boolean): void;
  }

}

declare module 'journeymap.client.ui.component.ScrollPane' {
  import { Entry } from 'ObjectSelectionList';
  import { ScrollPane } from 'journeymap.client.ui.component';
  import { Button } from 'journeymap.client.ui.component.buttons';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';

  interface ScrollPaneEntry extends Entry<ScrollPaneEntry> {}
  class ScrollPaneEntry extends Entry<ScrollPaneEntry> {
    constructor(this$0: ScrollPane, parent: ScrollPane, item: Button);
    get narration(): Component;
    render(graphics: GuiGraphics, index: number, y: number, x: number, l: number, var6: number, var7: number, p_230432_8_: number, p_230432_9_: boolean, f: number): void;
  }

}

declare module 'journeymap.client.ui.component.TextBox' {
  class OnPress {
    onPress(): void;
  }

}

declare module 'journeymap.client.ui.component.widgets' {
  import { AbstractWidget, AbstractStringWidget, StringWidget as net_minecraft_client_gui_components_StringWidget } from 'net.minecraft.client.gui.components';
  import { DynamicTexture } from 'net.minecraft.client.renderer.texture';
  import { SoundManager } from 'net.minecraft.client.sounds';
  import { ComponentPath, Font, GuiGraphics } from 'net.minecraft.client.gui';
  import { FocusNavigationEvent } from 'net.minecraft.client.gui.navigation';
  import { Collection } from 'java.util';
  import { OnChange } from 'journeymap.client.ui.component.widgets.RadioButtonListWidget';
  import { DoubleSupplier, Consumer } from 'java.util.function';
  import { EnumField } from 'journeymap.common.properties.config';
  import { LinearLayout } from 'net.minecraft.client.gui.layouts';
  import { Component } from 'net.minecraft.network.chat';

  interface ColoredImageWidget extends AbstractWidget {}
  class ColoredImageWidget extends AbstractWidget {
    get color(): number;
    isActive(): boolean;
    nextFocusPath(event: FocusNavigationEvent): ComponentPath;
    playDownSound(handler: SoundManager): void;
    set color(var1: number);
    setOutline(var1: boolean): void;
    setOutlineColor(var1: number): void;
    static texture(width: number, height: number, texture: DynamicTexture, textureWidth: number, textureHeight: number, color: number, blur: boolean): ColoredImageWidget;
  }


  interface ImageRadioButtonListWidget<T extends ResourceLocation = any> extends RadioButtonListWidget<T> {}
  class ImageRadioButtonListWidget<T extends ResourceLocation = any> extends RadioButtonListWidget<T> {
    constructor(titleKey: string, values: Collection<T>, enabledValue: T, textureWidth: number, textureHeight: number, onChange: OnChange<T>);
  }


  interface LogoWidget extends AbstractWidget {}
  class LogoWidget extends AbstractWidget {
    constructor(scaleFactorSupplier: DoubleSupplier);
    get height(): number;
    get width(): number;
    isActive(): boolean;
    nextFocusPath(focusNavigationEvent: FocusNavigationEvent): ComponentPath;
    playDownSound(soundHandler: SoundManager): void;
  }


  interface PropertiesRadioButtonListWidget<T extends Enum<any> = any> extends RadioButtonListWidget<T> {}
  class PropertiesRadioButtonListWidget<T extends Enum<any> = any> extends RadioButtonListWidget<T> {
    constructor(titleKey: string, values: EnumField<T>, onChange: OnChange<T>);
  }


  interface RadioButtonListWidget<T = any> extends LinearLayout {}
  class RadioButtonListWidget<T = any> extends LinearLayout {
    constructor(titleKey: string, values: Collection<T>, enabledValue: T, onChange: OnChange<T>);
    visitWidgets(consumer: Consumer<AbstractWidget>): void;
  }


  interface StringWidget extends AbstractStringWidget {}
  class StringWidget extends AbstractStringWidget {
    constructor(message: Component, font: Font);

    constructor(message: Component, width: number, font: Font);

    constructor(width: number, height: number, message: Component, font: Font);

    constructor(x: number, y: number, width: number, height: number, message: Component, font: Font);
    alignCenter(): StringWidget;
    alignLeft(): StringWidget;
    alignRight(): StringWidget;
    noShadow(): StringWidget;
    renderWidget(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    scrolling(): StringWidget;
    setColor(color: number): StringWidget;
  }


  interface UnscaledStringWidget extends net_minecraft_client_gui_components_StringWidget {}
  class UnscaledStringWidget extends net_minecraft_client_gui_components_StringWidget {
    constructor(minWidth: number, minHeight: number, message: Component, font: Font, scaleFactorSupplier: DoubleSupplier);
    get height(): number;
    get width(): number;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    setColor(color: number): UnscaledStringWidget;
  }

}

declare module 'journeymap.client.ui.component.widgets.ColoredImageWidget' {
  import { ColoredImageWidget } from 'journeymap.client.ui.component.widgets';
  import { DynamicTexture } from 'net.minecraft.client.renderer.texture';

  interface Image extends ColoredImageWidget {}
  class Image extends ColoredImageWidget {
    constructor(x: number, y: number, width: number, height: number, texture: DynamicTexture, textureWidth: number, textureHeight: number, color: number, blur: boolean);
    get color(): number;
    set color(color: number);
    setOutline(outline: boolean): void;
    setOutlineColor(outlineColor: number): void;
    setTexture(texture: DynamicTexture): void;
  }

}

declare module 'journeymap.client.ui.component.widgets.RadioButtonListWidget' {
  class OnChange<T = any> {
    onChange(var1: T): void;
  }

}

declare module 'journeymap.client.ui.dialog.about' {
  import { JmUI } from 'journeymap.client.ui.component.screens';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { Minecraft } from 'net.minecraft.client';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { DynamicTexture } from 'net.minecraft.client.renderer.texture';
  import { Double } from 'Rectangle2D';
  import { List, ArrayList } from 'java.util';
  import { LinearLayout } from 'net.minecraft.client.gui.layouts';
  import { Consumer } from 'java.util.function';

  interface AboutScreen extends JmUI {}
  class AboutScreen extends JmUI {
    constructor(returnDisplay: Screen);
    init(): void;
    init(minecraft: Minecraft, width: number, height: number): void;
    render(graphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface SplashHead extends AbstractWidget {}
  class SplashHead extends AbstractWidget {
    readonly name: string;
    readonly uuid: string;
    readonly title: string;
    width: number;
    moveX: number;
    moveY: number;
    constructor(uuid: string, name: string, titleKey: string);
    adjustVector(screenBounds: Double): void;
    avoid(others: SplashHead[]): void;
    continueVector(): void;
    get bounds(): Double;
    get centerX(): number;
    get middleY(): number;
    get skin(): DynamicTexture;
    getDistance(other: SplashHead): number;
    getWidth(fr: Font): number;
    randomizeVector(): void;
    renderWidget(guiGraphics: GuiGraphics, i: number, i1: number, v: number): void;
    setWidth(minWidth: number): void;
  }


  class SplashInfo {
    lines: ArrayList;
  }


  interface WhatsNew extends LinearLayout {}
  class WhatsNew extends LinearLayout {
    constructor(parent: Screen);
    visitWidgets(consumer: Consumer<AbstractWidget>): void;
  }

}

declare module 'journeymap.client.ui.dialog.about.SplashInfo' {
  import { Screen } from 'net.minecraft.client.gui.screens';

  class Line {
    label: string;
    action: string;
    constructor();

    constructor(label: string, action: string);
    hasAction(): boolean;
    invokeAction(returnUi: Screen): void;
  }

}

declare module 'journeymap.client.ui.dialog' {
  import { AbstractPopupScreen } from 'journeymap.client.ui.component.screens';
  import { IMainThreadTask } from 'journeymap.client.task.main';
  import { Minecraft } from 'net.minecraft.client';
  import { JourneymapClient } from 'journeymap.client';
  import { ConfirmScreen } from 'net.minecraft.client.gui.screens';
  import { BiConsumer } from 'java.util.function';
  import { Boolean } from 'java.lang';
  import { Component } from 'net.minecraft.network.chat';
  import { CheckBox } from 'journeymap.client.ui.component.buttons';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { DynamicTexture } from 'net.minecraft.client.renderer.texture';
  import { MapType } from 'journeymap.client.model.map';

  interface AutoMapPopup extends AbstractPopupScreen {}
  class AutoMapPopup extends AbstractPopupScreen {
    constructor();
    get name(): string;
    init(): void;
    perform(mc: Minecraft, jm: JourneymapClient): IMainThreadTask;
  }


  interface DeleteMapPopup extends AbstractPopupScreen {}
  class DeleteMapPopup extends AbstractPopupScreen {
    constructor();
  }


  interface DeleteWorldConfirmScreen extends ConfirmScreen {}
  class DeleteWorldConfirmScreen extends ConfirmScreen {
    constructor(deleteMapData: BiConsumer<boolean, boolean>, title: Component, message: Component, yesButton: Component, noButton: Component, checkBox: CheckBox);
    static get checkBox(): CheckBox;
  }


  class FullscreenActions {
    static changeLog(): void;
    static discord(): void;
    static launchDownloadWebsite(): void;
    static launchLocalhost(): void;
    static launchWebMapDownloadWebsite(url: string): void;
    static launchWebsite(path: string): void;
    static open(): void;
    static openKeybindings(): void;
    static showCaveLayers(): void;
    static toggleSearchBar(): void;
    static tweet(message: string): void;
    static webmapDownloadCF(): void;
    static webmapDownloadMR(): void;
  }


  interface GridEditorPopup extends AbstractPopupScreen {}
  class GridEditorPopup extends AbstractPopupScreen {
    constructor();
    getTileSample(mapType: MapType): DynamicTexture;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean;
    renderPopupScreenBackground(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
  }

}

declare module 'journeymap.client.ui.dialog.DeleteMapPopup' {
  import { AbstractPopupScreen } from 'journeymap.client.ui.component.screens';

  interface Confirm extends AbstractPopupScreen {}
  class Confirm extends AbstractPopupScreen {
  }

}

declare module 'journeymap.client.ui.dialog.import_export' {
  import { AbstractPopupScreen } from 'journeymap.client.ui.component.screens';

  interface ExportPopup extends AbstractPopupScreen {}
  class ExportPopup extends AbstractPopupScreen {
    constructor();
    onClose(): void;
  }


  interface ImportExportPopup extends AbstractPopupScreen {}
  class ImportExportPopup extends AbstractPopupScreen {
    constructor();
    init(): void;
  }


  interface ImportFolderPopup extends ImportPopup {}
  class ImportFolderPopup extends ImportPopup {
  }


  interface ImportPopup extends AbstractPopupScreen {}
  class ImportPopup extends AbstractPopupScreen {
    init(): void;
  }


  interface ImportZipPopup extends ImportPopup {}
  class ImportZipPopup extends ImportPopup {
  }

}

declare module 'journeymap.client.ui.dialog.import_export.ImportExportPopup' {
  class DimensionFolder {
  }

}

declare module 'journeymap.client.ui.fullscreen.event' {
  import { IClientPlugin, IClientAPI } from 'journeymap.api.v2.client';

  interface FullscreenEventReceiver extends IClientPlugin {}
  class FullscreenEventReceiver extends IClientPlugin {
    get modId(): string;
    initialize(api: IClientAPI): void;
  }

}

declare module 'journeymap.client.ui.fullscreen' {
  import { JmUILegacy } from 'journeymap.client.ui.component.screens';
  import { IFullscreen } from 'journeymap.api.v2.client.fullscreen';
  import { FullScreenPopupMenu } from 'journeymap.client.ui.fullscreen.menu';
  import { MapState, MapType as journeymap_client_model_map_MapType } from 'journeymap.client.model.map';
  import { UIState } from 'journeymap.api.v2.client.util';
  import { Screen, ChatScreen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { Minecraft } from 'net.minecraft.client';
  import { Double } from 'Rectangle2D';
  import { Double as point2d_Double } from 'Point2D';
  import { MapType } from 'Context';
  import { Integer, Boolean } from 'java.lang';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { ClientWaypointImpl } from 'journeymap.client.waypoint';
  import { Button, TextBoxButton } from 'journeymap.client.ui.component.buttons';
  import { PropertyDropdownButton } from 'journeymap.client.ui.component.dropdown';
  import { StringField } from 'journeymap.common.properties.config';
  import { OnPress } from 'Button';

  interface Fullscreen extends IFullscreen, JmUILegacy {}
  class Fullscreen extends IFullscreen {
    chatOpenedFromEvent: boolean;
    readonly popupMenu: FullScreenPopupMenu;
    constructor();
    addButtonWidget(button: Button): void;
    addTempMarker(waypoint: ClientWaypointImpl): void;
    centerOn(holder: ClientWaypointImpl): void;
    centerOn(x: number, z: number): void;
    charTyped(typedChar: string, keyCode: number): boolean;
    chatPositionAtMouse(): void;
    close(): void;
    createWaypointAtMouse(): void;
    get blockAtMouse(): BlockPos;
    get mapType(): journeymap_client_model_map_MapType;
    get menuToolbarBounds(): Double;
    get mouseDrag(): point2d_Double;
    get optionsToolbarBounds(): Double;
    get screen(): Screen;
    get screenScaleFactor(): number;
    get uiState(): UIState;
    get zoom(): number;
    getCenterBlockX(withDragOffset: boolean): number;
    getCenterBlockZ(withDragOffset: boolean): number;
    hideButtons(): void;
    init(): void;
    init(minecraft: Minecraft, width: number, height: number): void;
    isButtonsVisable(): boolean;
    isChatOpen(): boolean;
    isPauseScreen(): boolean;
    isSearchFocused(): boolean;
    keyPressed(key: number, value: number, modifier: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, mouseButton: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, mouseDX: number, mouseDY: number): boolean;
    mouseMoved(mouseX: number, mouseY: number): void;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, f: number, wheel: number): boolean;
    moveCanvas(deltaBlockX: number, deltaBlockZ: number): void;
    openChat(defaultText: string): void;
    queueToolTip(tooltips: Component[]): void;
    removed(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    renderBackground(graphics: GuiGraphics, i: number, j: number, f: number): void;
    reset(): void;
    resize(minecraft: Minecraft, width: number, height: number): void;
    setFollow(follow: boolean): void;
    setTheme(name: string): void;
    showCaveLayers(): void;
    static state(): MapState;
    tick(): void;
    toggleEntityNames(): void;
    toggleMapType(): void;
    toggleSearchBar(toggled: boolean): void;
    static uiState(): UIState;
    updateMapType(mapType: MapType, vSlice: number, dimension: ResourceKey<Level>): void;
    zoomIn(): void;
    zoomOut(): void;
  }


  interface FullscreenTextBoxButton extends TextBoxButton {}
  class FullscreenTextBoxButton extends TextBoxButton {
    constructor(value: string, fontRenderer: Font, width: number, height: number);

    constructor(value: string, fontRenderer: Font, width: number, height: number, isNumeric: boolean, negative: boolean);
    mouseClicked(mouseX: number, mouseY: number, mouseButton: number): boolean;
  }


  interface FullscreenThemeDropdownButton extends PropertyDropdownButton<string> {}
  class FullscreenThemeDropdownButton extends PropertyDropdownButton<string> {
    constructor(fr: Font, field: StringField, needReopen: boolean, pressable: OnPress);
    getFormattedLabel(value: string): string;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    setTextOnly(fr: Font): void;
  }


  interface MapChat extends ChatScreen {}
  class MapChat extends ChatScreen {
    constructor(defaultText: string, hidden: boolean);
    charTyped(typedChar: string, keyCode: number): boolean;
    close(): void;
    isHidden(): boolean;
    keyPressed(key: number, value: number, modifier: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, mouseButton: number): boolean;
    removed(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    setHidden(hidden: boolean): void;
    setText(defaultText: string): void;
    tick(): void;
  }

}

declare module 'journeymap.client.ui.fullscreen.layer' {
  import { Fullscreen } from 'journeymap.client.ui.fullscreen';
  import { List } from 'java.util';
  import { DrawStep } from 'journeymap.client.render.draw';
  import { Minecraft } from 'net.minecraft.client';
  import { Renderer } from 'journeymap.client.render.map';
  import { Double } from 'Point2D';
  import { BlockPos } from 'net.minecraft.core';
  import { ClientWaypointImpl } from 'journeymap.client.waypoint';

  interface BlockInfoLayer extends Layer {}
  class BlockInfoLayer extends Layer {
    constructor(fullscreen: Fullscreen);
    onMouseClick(mc: Minecraft, renderer: Renderer, mousePosition: Double, blockCoord: BlockPos, button: number, doubleClick: boolean, fontScale: number): DrawStep[];
    onMouseMove(mc: Minecraft, renderer: Renderer, mousePosition: Double, blockPos: BlockPos, fontScale: number, isScrolling: boolean): DrawStep[];
    propagateClick(): boolean;
    update(): DrawStep[];
  }


  interface KeybindingInfoLayer extends Layer {}
  class KeybindingInfoLayer extends Layer {
    constructor(fullscreen: Fullscreen);
    onMouseClick(mc: Minecraft, renderer: Renderer, mousePosition: Double, blockCoord: BlockPos, button: number, doubleClick: boolean, fontScale: number): DrawStep[];
    onMouseMove(mc: Minecraft, renderer: Renderer, mousePosition: Double, blockPos: BlockPos, fontScale: number, isScrolling: boolean): DrawStep[];
    propagateClick(): boolean;
  }


  class Layer {
    constructor(fullscreen: Fullscreen);
    onMouseClick(var1: Minecraft, var2: Renderer, var3: Double, var4: BlockPos, var5: number, var6: boolean, var7: number): DrawStep[];
    onMouseMove(var1: Minecraft, var2: Renderer, var3: Double, var4: BlockPos, var5: number, var6: boolean): DrawStep[];
    propagateClick(): boolean;
    update(): DrawStep[];
  }


  class LayerDelegate {
    constructor(fullscreen: Fullscreen);
    get drawSteps(): DrawStep[];
    getBlockPos(mc: Minecraft, renderer: Renderer, mousePosition: Double): BlockPos;
    onMouseClicked(mc: Minecraft, renderer: Renderer, mousePosition: Double, button: number, fontScale: number): void;
    onMouseMove(mc: Minecraft, renderer: Renderer, mousePosition: Double, fontScale: number, isScrolling: boolean): void;
    update(): void;
  }


  interface ModOverlayLayer extends Layer {}
  class ModOverlayLayer extends Layer {
    constructor(fullscreen: Fullscreen);
    onMouseClick(mc: Minecraft, renderer: Renderer, mousePosition: Double, blockCoord: BlockPos, button: number, doubleClick: boolean, fontScale: number): DrawStep[];
    onMouseMove(mc: Minecraft, renderer: Renderer, mousePosition: Double, blockCoord: BlockPos, fontScale: number, isScrolling: boolean): DrawStep[];
    propagateClick(): boolean;
  }


  interface WaypointLayer extends Layer {}
  class WaypointLayer extends Layer {
    constructor(fullscreen: Fullscreen);
    compare(o1: ClientWaypointImpl, o2: ClientWaypointImpl): number;
    onMouseClick(mc: Minecraft, renderer: Renderer, mousePosition: Double, blockCoord: BlockPos, button: number, doubleClick: boolean, fontScale: number): DrawStep[];
    onMouseMove(mc: Minecraft, renderer: Renderer, mousePosition: Double, blockCoord: BlockPos, fontScale: number, isScrolling: boolean): DrawStep[];
    propagateClick(): boolean;
  }

}

declare module 'journeymap.client.ui.fullscreen.layer.BlockInfoLayer' {
  import { DrawStep } from 'journeymap.client.render.draw';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { Pass } from 'journeymap.client.render.draw.DrawStep';
  import { Renderer } from 'journeymap.client.render.map';

  interface BlockInfoStep extends DrawStep {}
  class BlockInfoStep extends DrawStep {
    draw(graphics: GuiGraphics, buffers: MultiBufferSource, pass: Pass, xOffset: number, yOffset: number, renderer: Renderer, fontScale: number, rotation: number): void;
    get displayOrder(): number;
    get modId(): string;
  }


  interface PlayerInfoStep extends DrawStep {}
  class PlayerInfoStep extends DrawStep {
    draw(graphics: GuiGraphics, buffers: MultiBufferSource, pass: Pass, xOffset: number, yOffset: number, renderer: Renderer, fontScale: number, rotation: number): void;
    get displayOrder(): number;
    get modId(): string;
  }

}

declare module 'journeymap.client.ui.fullscreen.layer.KeybindingInfoLayer' {
  import { DrawStep } from 'journeymap.client.render.draw';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { Pass } from 'journeymap.client.render.draw.DrawStep';
  import { Renderer } from 'journeymap.client.render.map';

  interface KeybindingInfoStep extends DrawStep {}
  class KeybindingInfoStep extends DrawStep {
    draw(graphics: GuiGraphics, buffers: MultiBufferSource, pass: Pass, xOffset: number, yOffset: number, renderer: Renderer, fontScale: number, rotation: number): void;
    get displayOrder(): number;
    get modId(): string;
  }

}

declare module 'journeymap.client.ui.fullscreen.layer.WaypointLayer' {
  import { DrawStep } from 'journeymap.client.render.draw';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { Pass } from 'journeymap.client.render.draw.DrawStep';
  import { Renderer } from 'journeymap.client.render.map';

  interface BlockOutlineDrawStep extends DrawStep {}
  class BlockOutlineDrawStep extends DrawStep {
    draw(graphics: GuiGraphics, buffers: MultiBufferSource, pass: Pass, xOffset: number, yOffset: number, renderer: Renderer, fontScale: number, rotation: number): void;
    get displayOrder(): number;
    get modId(): string;
  }

}

declare module 'journeymap.client.ui.fullscreen.menu' {
  import { PopupMenu } from 'journeymap.client.ui.component.dropdown';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { BlockPos } from 'net.minecraft.core';
  import { ClientWaypointImpl } from 'journeymap.client.waypoint';
  import { ModPopupMenu } from 'journeymap.api.v2.client.fullscreen';

  interface FullScreenPopupMenu extends PopupMenu {}
  class FullScreenPopupMenu extends PopupMenu {
    constructor(parent: PopupMenu);

    constructor(parent: Screen);
    displayBasicOptions(blockPos: BlockPos): void;
    displayOptions(blockPos: BlockPos, popupMenu: ModPopupMenu): void;
    displayWaypointOptions(blockPos: BlockPos, wp: ClientWaypointImpl): void;
  }

}

declare module 'journeymap.client.ui' {
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Enum, LinkageError, Class } from 'java.lang';
  import { MiniMap } from 'journeymap.client.ui.minimap';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Fullscreen } from 'journeymap.client.ui.fullscreen';
  import { ClientWaypointImpl } from 'journeymap.client.waypoint';
  import { Category } from 'journeymap.common.properties.catagory';
  import { BlockPos } from 'net.minecraft.core';
  import { Map, List } from 'java.util';
  import { BlockStateColor, BiomeColor } from 'journeymap.client.cartography.color';
  import { ColorPaletteScreen } from 'journeymap.client.ui.colorpalette';
  import { MiniMapProperties } from 'journeymap.client.properties';
  import { ServerOptionsManager, MultiplayerOptionsManager } from 'journeymap.client.ui.option';

  class GuiUtils {
    static drawContinuousTexturedBox(graphics: GuiGraphics, res: ResourceLocation, x: number, y: number, u: number, v: number, width: number, height: number, textureWidth: number, textureHeight: number, topBorder: number, bottomBorder: number, leftBorder: number, rightBorder: number, zLevel: number): void;
    static drawContinuousTexturedBox(graphics: GuiGraphics, x: number, y: number, u: number, v: number, width: number, height: number, textureWidth: number, textureHeight: number, topBorder: number, bottomBorder: number, leftBorder: number, rightBorder: number, zLevel: number): void;
    static drawTexturedModalRect(graphics: GuiGraphics, x: number, y: number, u: number, v: number, width: number, height: number, zLevel: number): void;
  }


  interface UIManager extends Enum<UIManager> {}
  class UIManager extends Enum<UIManager> {
    static readonly INSTANCE: UIManager;
    closeAll(): void;
    closeCurrent(): void;
    closeWithKeyBind(): void;
    drawMiniMap(graphics: GuiGraphics): void;
    drawWaypointDecorations(graphics: GuiGraphics): void;
    get miniMap(): MiniMap;
    get minimap(): MiniMap;
    get multiplayerOptions(): MultiplayerOptionsManager;
    get serverEditor(): ServerOptionsManager;
    static handleLinkageError(error: LinkageError): void;
    isMiniMapEnabled(): boolean;
    open(uiClass: Class<T>, returnDisplay: Screen): T;
    open(uiClass: Class<T>): T;
    open(ui: T): T;
    openAddonOptionsEditor(returnDisplay: Screen, clientOnly: boolean): void;
    openColorPalette(returnDisplay: Screen): void;
    openColorPaletteBiomeEditor(blockId: string, biomeColor: BiomeColor, saveToStandard: boolean, saveToWorld: boolean, returnDisplay: Screen): void;
    openColorPaletteBlockEditor(blockId: string, blockStatesToColor: Map<string, BlockStateColor>, saveToStandard: boolean, saveToWorld: boolean, returnDisplay: Screen): void;
    openColorPaletteManager(returnDisplay: ColorPaletteScreen): void;
    openFullscreenMap(): Fullscreen;
    openFullscreenMap(holder: ClientWaypointImpl): void;
    openGridEditor(): void;
    openInventory(): void;
    openMinimapPosition(returnDisplay: Screen, properties: MiniMapProperties): void;
    openMobsAndPlayersColorEditor(returnDisplay: Screen): void;
    openMultiplayerEditor(returnDisplay: Screen): void;
    openOptionsManager(returnDisplay: Screen, clientOnly: boolean): Screen;
    openOptionsManager(returnDisplay: Screen, ...initialCategories: Category[]): void;
    openServerEditor(returnDisplay: Screen): void;
    openSplash(returnDisplay: Screen): void;
    openWaypointEditor(holder: ClientWaypointImpl, openedWithHotkey: boolean): void;
    openWaypointEditor(holder: ClientWaypointImpl, pos: BlockPos, openedWithHotkey: boolean): void;
    openWaypointManager(holder: ClientWaypointImpl, returnDisplay: Screen): void;
    reset(): void;
    setMiniMapEnabled(enable: boolean): void;
    setScreen(screen: Screen): Screen;
    switchMiniMapPreset(): void;
    switchMiniMapPreset(which: number): void;
    toggleMiniMapEntityNames(): void;
    toggleMinimap(): void;
    static valueOf(name: string): UIManager;
    static values(): UIManager[];
  }

}

declare module 'journeymap.client.ui.minimap' {
  import { Double } from 'Point2D';
  import { Tuple2 } from 'journeymap.api.v2.client.util.tuple';
  import { List } from 'java.util';
  import { InfoSlot } from 'journeymap.client.ui.theme.ThemeLabelSource';
  import { MiniMapProperties } from 'journeymap.client.properties';
  import { Font, GuiGraphics } from 'net.minecraft.client.gui';
  import { LabelSpec } from 'journeymap.client.ui.theme.Theme';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { MobEffect } from 'net.minecraft.world.effect';
  import { Vec2 } from 'net.minecraft.world.phys';
  import { Enum } from 'java.lang';
  import { DynamicTexture } from 'net.minecraft.client.renderer.texture';
  import { GameProfile } from 'com.mojang.authlib';
  import { EntityDTO } from 'journeymap.client.model.entity';
  import { MapState } from 'journeymap.client.model.map';
  import { UIState } from 'journeymap.api.v2.client.util';

  class DisplayVars {
    readonly minimapWidth: number;
    readonly minimapHeight: number;
    readonly textureX: number;
    readonly textureY: number;
    readonly centerPoint: Double;
    marginX: number;
    marginY: number;
    drawInfoLabels(graphics: GuiGraphics, buffers: MultiBufferSource, currentTimeMillis: number): void;
    get shape(): Shape;
    getInfoLabelAreaHeight(fontRenderer: Font, labelSpec: LabelSpec, themeLabelSources: InfoSlot[]): number;
    getInfoSlotLabels(miniMapProperties: MiniMapProperties): Tuple2<InfoSlot[], InfoSlot[]>;
  }


  interface Effect extends Selectable {}
  class Effect extends Selectable {
    canPotionShift(): boolean;
    static effectProcessor(k: number, l: number, j: number, i: number, mobEffect: MobEffect): number[];
    static get instance(): Effect;
    get potionEffectsLocation(): Vec2;
    isDragging(): boolean;
    mouseClicked(mouseX: number, mouseY: number, pButton: number): boolean;
    mouseDragged(pMouseX: number, pMouseY: number, pButton: number, pDragX: number, pDragY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, mouseButton: number): boolean;
    renderBorder(graphics: GuiGraphics, color: number): void;
    tick(): void;
    withinBounds(mouseX: number, mouseY: number): boolean;
    withinScreenBounds(pMouseX: number, pMouseY: number): Vec2;
  }


  interface EntityDisplay extends Enum<EntityDisplay> {}
  class EntityDisplay extends Enum<EntityDisplay> {
    static readonly Dots: EntityDisplay;
    static readonly Icons: EntityDisplay;
    static readonly OutlinedIcons: EntityDisplay;
    static readonly DotsAndIcons: EntityDisplay;
    static readonly DotsAndOutlinedIcons: EntityDisplay;
    get dot(): EntityDisplay;
    get key(): string;
    static getEntityTexture(entityDisplay: EntityDisplay, profile: GameProfile): DynamicTexture;
    static getEntityTexture(entityDisplay: EntityDisplay, dto: EntityDTO): DynamicTexture;
    static getLocatorBGTexture(entityDisplay: EntityDisplay, showHeading: boolean): DynamicTexture;
    static getLocatorTexture(entityDisplay: EntityDisplay, showHeading: boolean): DynamicTexture;
    static hasEntityIcon(entityDisplay: EntityDisplay, dto: EntityDTO): boolean;
    isDots(): boolean;
    isOutlined(): boolean;
    toString(): string;
    static valueOf(name: string): EntityDisplay;
    static values(): EntityDisplay[];
  }


  class LabelVars {
  }


  interface MiniMap extends Selectable {}
  class MiniMap extends Selectable {
    constructor(miniMapProperties: MiniMapProperties);
    drawMap(graphics: GuiGraphics): void;
    drawMap(graphics: GuiGraphics, preview: boolean): void;
    get biome(): string;
    get currentMinimapProperties(): MiniMapProperties;
    get displayVars(): DisplayVars;
    get location(): string;
    isDragging(): boolean;
    isDrawingInPreviewMode(): boolean;
    isMinimapDragging(): boolean;
    mouseClicked(pMouseX: number, pMouseY: number, pButton: number): boolean;
    mouseDragged(pMouseX: number, pMouseY: number, pButton: number, pDragX: number, pDragY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, mouseButton: number): boolean;
    renderBorder(graphics: GuiGraphics, color: number): void;
    reset(): void;
    resetInitTime(): void;
    resetState(): void;
    setDrawingInPreviewMode(drawingInPreviewMode: boolean): void;
    setMiniMapProperties(miniMapProperties: MiniMapProperties): void;
    static state(): MapState;
    tick(): void;
    static uiState(): UIState;
    updateDisplayVars(force: boolean): void;
    updateDisplayVars(force: boolean, preview: boolean): void;
    updateDisplayVars(shape: Shape, posX: number, posY: number, position: Position, force: boolean, preview: boolean): void;
    static updateUIState(isActive: boolean): void;
    validateScreenBounds(pMouseX: number, pMouseY: number): Vec2;
    withinBounds(mouseX: number, mouseY: number): boolean;
  }


  interface Orientation extends Enum<Orientation> {}
  class Orientation extends Enum<Orientation> {
    static readonly North: Orientation;
    static readonly OldNorth: Orientation;
    static readonly PlayerHeading: Orientation;
    get key(): string;
    toString(): string;
    static valueOf(name: string): Orientation;
    static values(): Orientation[];
  }


  interface Position extends Enum<Position> {}
  class Position extends Enum<Position> {
    static readonly TopRight: Position;
    static readonly BottomRight: Position;
    static readonly BottomLeft: Position;
    static readonly TopLeft: Position;
    static readonly TopCenter: Position;
    static readonly Center: Position;
    static readonly Custom: Position;
    get key(): string;
    toString(): string;
    static valueOf(name: string): Position;
    static values(): Position[];
  }


  interface ReticleOrientation extends Enum<ReticleOrientation> {}
  class ReticleOrientation extends Enum<ReticleOrientation> {
    static readonly Compass: ReticleOrientation;
    static readonly PlayerHeading: ReticleOrientation;
    get key(): string;
    toString(): string;
    static valueOf(name: string): ReticleOrientation;
    static values(): ReticleOrientation[];
  }


  class Selectable {
    static readonly SELECTED_COLOR: number;
    static readonly UNSELECTED_COLOR: number;
    isDragging(): boolean;
    mouseClicked(var1: number, var3: number, var5: number): boolean;
    mouseDragged(var1: number, var3: number, var5: number, var6: number, var8: number): boolean;
    mouseReleased(var1: number, var3: number, var5: number): boolean;
    renderBorder(var1: GuiGraphics, var2: number): void;
    tick(): void;
  }


  interface Shape extends Enum<Shape> {}
  class Shape extends Enum<Shape> {
    static readonly Square: Shape;
    static readonly Rectangle_Horizontal: Shape;
    static readonly Rectangle_Vertical: Shape;
    static readonly Circle: Shape;
    get key(): string;
    toString(): string;
    static valueOf(name: string): Shape;
    static values(): Shape[];
  }

}

declare module 'journeymap.client.ui.minimap.DisplayVars' {
  class MapPresetStatus {
  }


  class MapTypeStatus {
  }

}

declare module 'journeymap.client.ui.option' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Minecraft } from 'net.minecraft.client';
  import { Slot, ScrollListPane } from 'journeymap.client.ui.component';
  import { Comparable } from 'java.lang';
  import { Collection, List, Map } from 'java.util';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Category } from 'journeymap.common.properties.catagory';
  import { LocationFormatKeys } from 'journeymap.client.ui.option.LocationFormat';
  import { ValuesProvider } from 'journeymap.common.properties.config.StringField';
  import { Source } from 'journeymap.client.ui.option.MapTypeProvider';
  import { Name } from 'journeymap.client.model.map.MapType';
  import { JmUILegacy } from 'journeymap.client.ui.component.screens';
  import { MiniMapProperties } from 'journeymap.client.properties';
  import { ServerPropertyType } from 'journeymap.common.network.model';
  import { PropertiesBase } from 'journeymap.common.properties';
  import { Button } from 'journeymap.client.ui.component.buttons';
  import { ValueType } from 'journeymap.client.ui.option.SlotMetadata';
  import { FormattedCharSequence } from 'net.minecraft.util';

  interface AddonOptionsManager extends ClientOptionsManager {}
  class AddonOptionsManager extends ClientOptionsManager {
    constructor(returnDisplay: Screen, clientOnly: boolean);
    init(): void;
    init(minecraft: Minecraft, width: number, height: number): void;
  }


  interface ButtonListSlot extends Comparable<ButtonListSlot>, Slot {}
  class ButtonListSlot extends Comparable<ButtonListSlot> {
    constructor(parent: CategorySlot);
    add(slotMetadata: SlotMetadata): ButtonListSlot;
    addAll(slotMetadataCollection: Collection<SlotMetadata>): ButtonListSlot;
    charTyped(typedChar: string, keyCode: number): boolean;
    clear(): void;
    compareTo(o: ButtonListSlot): number;
    contains(slotMetadata: SlotMetadata): boolean;
    get columnWidth(): number;
    get currentTooltip(): SlotMetadata;
    get lastPressed(): SlotMetadata;
    get metadata(): Collection<SlotMetadata>;
    getChildSlots(listWidth: number, columnWidth: number): Slot[];
    keyPressed(key: number, value: number, modifier: number): boolean;
    merge(other: ButtonListSlot): ButtonListSlot;
    mouseClicked(x: number, y: number, mouseButton: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, mouseButton: number, mouseDX: number, mouseDY: number): boolean;
    mouseReleased(x: number, y: number, mouseButton: number): boolean;
    render(graphics: GuiGraphics, slotIndex: number, y: number, x: number, listWidth: number, slotHeight: number, mouseX: number, mouseY: number, isMouseOver: boolean, partialTicks: number): void;
    setEnabled(enabled: boolean): void;
  }


  interface CategorySlot extends Comparable<CategorySlot>, Slot {}
  class CategorySlot extends Comparable<CategorySlot> {
    constructor(category: Category);
    add(slot: Slot): CategorySlot;
    charTyped(typedChar: string, keyCode: number): boolean;
    clear(): void;
    compareTo(other: CategorySlot): number;
    contains(slotMetadata: SlotMetadata): boolean;
    get allChildMetadata(): SlotMetadata[];
    get category(): Category;
    get columnWidth(): number;
    get currentColumnWidth(): number;
    get currentColumns(): number;
    get currentTooltip(): SlotMetadata;
    get lastPressed(): SlotMetadata;
    get metadata(): Collection<SlotMetadata>;
    getChildSlots(listWidth: number, columnWidth: number): Slot[];
    isMouseOver(x: number, y: number): boolean;
    isSelected(): boolean;
    keyPressed(key: number, value: number, modifier: number): boolean;
    mouseClicked(x: number, y: number, mouseButton: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, mouseButton: number, mouseDX: number, mouseDY: number): boolean;
    mouseReleased(x: number, y: number, mouseButton: number): boolean;
    render(graphics: GuiGraphics, slotIndex: number, y: number, x: number, listWidth: number, slotHeight: number, mouseX: number, mouseY: number, isMouseOver: boolean, partialTicks: number): void;
    setEnabled(enabled: boolean): void;
    setSelected(selected: boolean): void;
    size(): number;
    sort(): void;
  }


  interface ClientOptionsManager extends OptionScreen {}
  class ClientOptionsManager extends OptionScreen {
    constructor();

    constructor(returnDisplay: Screen, clientOnly: boolean);

    constructor(returnDisplay: Screen, clientOnly: boolean, ...initialCategories: Category[]);

    constructor(title: string, returnDisplay: Screen, clientOnly: boolean);
    charTyped(typedChar: string, keyCode: number): boolean;
    closeWithKeyBind(): void;
    init(): void;
    init(minecraft: Minecraft, width: number, height: number): void;
    isPauseScreen(): boolean;
    keyPressed(key: number, value: number, modifier: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, mouseButton: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, mouseDX: number, mouseDY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, mouseButton: number): boolean;
    mouseScrolled(x: number, y: number, f: number, scroll: number): boolean;
    previewMiniMap(): boolean;
    refreshMinimapOptions(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, par3: number): void;
    renderBackground(graphics: GuiGraphics, i: number, j: number, f: number): void;
  }


  class DateFormat {
  }


  class LocationFormat {
    constructor();
    getFormatKeys(id: string): LocationFormatKeys;
    getLabel(id: string): string;
  }


  interface MapTypeProvider extends ValuesProvider {}
  class MapTypeProvider extends ValuesProvider {
    static ANY: Source;
    static DAY: Source;
    static NIGHT: Source;
    static UNDERGROUND: Source;
    static BIOME: Source;
    static TOPO: Source;
    static from(name: Name): string;
    static from(name: string): Name;
    get defaultString(): string;
    get strings(): string[];
    getTooltip(value: string): string;
  }


  interface MinimapOptions extends JmUILegacy {}
  class MinimapOptions extends JmUILegacy {
    constructor(returnDisplay: Screen, miniMapProperties: MiniMapProperties);
    init(minecraft: Minecraft, width: number, height: number): void;
    init(): void;
    mouseClicked(pMouseX: number, pMouseY: number, pButton: number): boolean;
    mouseDragged(pMouseX: number, pMouseY: number, pButton: number, pDragX: number, pDragY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, mouseButton: number): boolean;
    mouseScrolled(x: number, y: number, f: number, scroll: number): boolean;
    onClose(): void;
    render(graphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
    renderBackground(graphics: GuiGraphics, i: number, j: number, f: number): void;
    tick(): void;
  }


  interface MultiplayerOptionsManager extends ServerOptionsManager {}
  class MultiplayerOptionsManager extends ServerOptionsManager {
    constructor(returnDisplay: Screen);
    init(): void;
    init(minecraft: Minecraft, width: number, height: number): void;
    setData(payload: string): void;
    setData(requestType: ServerPropertyType, payload: string, dim: string): void;
  }


  interface OptionScreen extends JmUILegacy {}
  class OptionScreen extends JmUILegacy {
    constructor(title: string, returnDisplay: Screen, clientOnly: boolean);

    constructor(title: string);
    init(): void;
    init(minecraft: Minecraft, width: number, height: number): void;
  }


  class OptionSlotFactory {
    static getOptionSlots(toolbars: Map<Category, SlotMetadata[]>, slotMap: Map<Category, PropertiesBase>): CategorySlot[];
    static getOptionSlots(toolbars: Map<Category, SlotMetadata[]>, slotMap: Map<Category, PropertiesBase>, viewOnly: boolean, useTargetCategory: boolean): CategorySlot[];
  }


  interface OptionsScrollListPane<T extends Slot = any> extends ScrollListPane<T> {}
  class OptionsScrollListPane<T extends Slot = any> extends ScrollListPane<T> {
    constructor(mc: Minecraft, x: number, y: number, width: number, height: number, slotHeight: number);
    renderListItems(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface ServerOptionsManager extends OptionScreen {}
  class ServerOptionsManager extends OptionScreen {
    constructor(returnDisplay: Screen);

    constructor(returnDisplay: Screen, title: string, categoryList: Category[]);
    init(): void;
    init(minecraft: Minecraft, width: number, height: number): void;
    mouseClicked(mouseX: number, mouseY: number, mouseButton: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, mouseDX: number, mouseDY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, mouseButton: number): boolean;
    mouseScrolled(x: number, y: number, f: number, scroll: number): boolean;
    render(graphics: GuiGraphics, x: number, y: number, par3: number): void;
    renderBackground(graphics: GuiGraphics, i: number, j: number, f: number): void;
    resize(minecraft: Minecraft, width: number, height: number): void;
    setData(requestType: ServerPropertyType, payload: string, dim: string): void;
  }


  interface SlotMetadata<T = any> extends Comparable<SlotMetadata> {}
  class SlotMetadata<T = any> extends Comparable<SlotMetadata> {
    constructor(button: Button);

    constructor(button: Button, order: number);

    constructor(button: Button, advanced: boolean);

    constructor(button: Button, name: string, tooltip: string, advanced: boolean);

    constructor(button: Button, name: string, tooltip: string);

    constructor(button: Button, name: string, tooltip: string, order: number);

    constructor(button: Button, name: string, tooltip: string, range: string, defaultValue: T, advanced: boolean);
    compareTo(other: SlotMetadata): number;
    get button(): Button;
    get defaultValue(): T;
    get name(): string;
    get order(): number;
    get properties(): PropertiesBase;
    get range(): string;
    get tooltip(): FormattedCharSequence[];
    get tooltipLines(): FormattedCharSequence[];
    get valueList(): List;
    get valueType(): ValueType;
    hasConfigField(): boolean;
    isAdvanced(): boolean;
    isMaster(): boolean;
    isMasterPropertyForCategory(): boolean;
    isToolbar(): boolean;
    resetToDefaultValue(): void;
    set order(order: number);
    set valueList(valueList: List);
    setAdvanced(advanced: boolean): void;
    setMasterPropertyForCategory(master: boolean): void;
    updateFromButton(): void;
  }


  class TimeFormat {
  }

}

declare module 'journeymap.client.ui.option.ClientOptionsManager' {
  import { Button } from 'journeymap.client.ui.component.buttons';
  import { Font, GuiGraphics } from 'net.minecraft.client.gui';
  import { HAlign } from 'journeymap.client.render.draw.DrawUtil';

  interface LabelButton extends Button {}
  class LabelButton extends Button {
    constructor(width: number, key: string, ...labelArgs: any[]);
    fitWidth(fr: Font): void;
    getFitWidth(fr: Font): number;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, ticks: number): void;
    setHAlign(hAlign: HAlign): void;
  }

}

declare module 'journeymap.client.ui.option.DateFormat' {
  import { PropertyDropdownButton } from 'journeymap.client.ui.component.dropdown';
  import { StringField } from 'journeymap.common.properties.config';
  import { ValuesProvider } from 'journeymap.common.properties.config.StringField';
  import { List } from 'java.util';

  interface Button extends PropertyDropdownButton<string> {}
  class Button extends PropertyDropdownButton<string> {
    constructor(valueHolder: StringField);
  }


  interface Provider extends ValuesProvider {}
  class Provider extends ValuesProvider {
    get defaultString(): string;
    get strings(): string[];
  }

}

declare module 'journeymap.client.ui.option.LocationFormat' {
  import { DropDownItem, DropDownButton, PropertyDropdownButton } from 'journeymap.client.ui.component.dropdown';
  import { StringField } from 'journeymap.common.properties.config';
  import { ValuesProvider } from 'journeymap.common.properties.config.StringField';
  import { List } from 'java.util';

  class LocationFormatKeys {
    format(verbose: boolean, x: number, z: number, y: number, vslice: number): string;
  }


  interface LocationDropDownItem extends DropDownItem {}
  class LocationDropDownItem extends DropDownItem {
    constructor(parent: DropDownButton, id: any, label: string);
    get label(): string;
  }


  interface Button extends PropertyDropdownButton<string> {}
  class Button extends PropertyDropdownButton<string> {
    constructor(valueHolder: StringField);
    get label(): string;
    getFormattedLabel(id: string): string;
    getLabel(id: string): string;
  }


  interface IdProvider extends ValuesProvider {}
  class IdProvider extends ValuesProvider {
    get defaultString(): string;
    get strings(): string[];
  }

}

declare module 'journeymap.client.ui.option.SlotMetadata' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ValueType extends Enum<ValueType> {}
  class ValueType extends Enum<ValueType> {
    static readonly Boolean: ValueType;
    static readonly Set: ValueType;
    static readonly Integer: ValueType;
    static readonly Toolbar: ValueType;
    static valueOf(name: string): ValueType;
    static values(): ValueType[];
  }

}

declare module 'journeymap.client.ui.option.TimeFormat' {
  import { PropertyDropdownButton } from 'journeymap.client.ui.component.dropdown';
  import { StringField } from 'journeymap.common.properties.config';
  import { ValuesProvider } from 'journeymap.common.properties.config.StringField';
  import { List } from 'java.util';

  interface Button extends PropertyDropdownButton<string> {}
  class Button extends PropertyDropdownButton<string> {
    constructor(valueHolder: StringField);
  }


  interface Provider extends ValuesProvider {}
  class Provider extends ValuesProvider {
    get defaultString(): string;
    get strings(): string[];
  }

}

declare module 'journeymap.client.ui.theme.impl' {
  import { Theme } from 'journeymap.client.ui.theme';

  interface FlatTheme extends Theme {}
  class FlatTheme extends Theme {
    static EndCity(): Theme;
    static createDesertTemple(): Theme;
    static createForestMansion(): Theme;
    static createNetherFortress(): Theme;
    static createOceanMonument(): Theme;
    static createPurist(): Theme;
    static createStronghold(): Theme;
  }


  class Style {
  }

}

declare module 'journeymap.client.ui.theme.impl.Style' {
  class Colors {
  }

}

declare module 'journeymap.client.ui.theme' {
  import { IThemeToolBar, IThemeButton } from 'journeymap.api.v2.client.fullscreen';
  import { Container, Control, Fullscreen, ImageSpec, Minimap } from 'journeymap.client.ui.theme.Theme';
  import { Color } from 'java.awt';
  import { BooleanPropertyButton, Button as journeymap_client_ui_component_buttons_Button } from 'journeymap.client.ui.component.buttons';
  import { OnPress } from 'Button';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { BooleanField } from 'journeymap.common.properties.config';
  import { ButtonSpec } from 'Theme.Control';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { List, Map } from 'java.util';
  import { FormattedCharSequence } from 'net.minecraft.util';
  import { Button } from 'net.minecraft.client.gui.components';
  import { MinimapSpec } from 'Theme.Minimap';
  import { MiniMapProperties } from 'journeymap.client.properties';
  import { DynamicTexture } from 'net.minecraft.client.renderer.texture';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { ValuesProvider } from 'journeymap.common.properties.config.StringField';
  import { InfoSlot } from 'journeymap.client.ui.theme.ThemeLabelSource';
  import { Supplier } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';
  import { Double } from 'Rectangle2D';
  import { ReticleOrientation } from 'journeymap.client.ui.minimap';
  import { ButtonList } from 'journeymap.client.ui.component';
  import { ToolbarSpec } from 'Theme.Container.Toolbar';
  import { Layout, Direction } from 'ButtonList';
  import { JmUILegacy } from 'journeymap.client.ui.component.screens';

  interface IThemeToolbarInternal extends IThemeToolBar {}
  class IThemeToolbarInternal extends IThemeToolBar {
    get height(): number;
    get toolbarHeight(): number;
    get toolbarWidth(): number;
    get toolbarX(): number;
    get toolbarY(): number;
    get width(): number;
    get x(): number;
    get y(): number;
    setPosition(x: number, y: number): void;
    setToolbarPosition(var1: number, var2: number): void;
  }


  class Theme {
    static readonly VERSION: number;
    schema: number;
    author: string;
    name: string;
    directory: string;
    container: Container;
    control: Control;
    fullscreen: Fullscreen;
    icon: ImageSpec;
    minimap: Minimap;
    equals(o: any): boolean;
    hashCode(): number;
    static toHexColor(color: Color): string;
    static toHexColor(rgb: number): string;
    toString(): string;
  }


  interface ThemeButton extends IThemeButton, BooleanPropertyButton {}
  class ThemeButton extends IThemeButton {
    constructor(theme: Theme, rawLabel: string, iconName: string, onPress: OnPress);

    constructor(theme: Theme, rawLabel: string, icon: ResourceLocation, onPress: OnPress);

    constructor(theme: Theme, labelOn: string, labelOff: string, toggled: boolean, iconName: string, onPress: OnPress);

    constructor(theme: Theme, labelOn: string, labelOff: string, iconName: string, field: BooleanField, onPress: OnPress);

    constructor(theme: Theme, labelOn: string, labelOff: string, icon: ResourceLocation, field: BooleanField, onPress: OnPress);
    drawNativeButton(graphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get button(): Button;
    get buttonSpec(): ButtonSpec;
    get wrappedTooltip(): FormattedCharSequence[];
    hasValidTextures(): boolean;
    isStaysOn(): boolean;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, ticks: number): void;
    setAdditionalTooltips(additionalTooltips: FormattedCharSequence[]): void;
    setDisplayClickToggle(displayClickToggle: boolean): void;
    setStaysOn(staysOn: boolean): void;
    updateTheme(theme: Theme): void;
  }


  class ThemeCompassPoints {
    constructor(x: number, y: number, halfWidth: number, halfHeight: number, minimapSpec: MinimapSpec, miniMapProperties: MiniMapProperties, compassPointTex: DynamicTexture, labelHeight: number);
    drawLabels(graphics: GuiGraphics, buffers: MultiBufferSource, rotation: number): void;
    drawPoints(graphics: GuiGraphics, rotation: number): void;
    static getCompassPointScale(compassLabelHeight: number, minimapSpec: MinimapSpec, compassPointTex: DynamicTexture): number;
    setPosition(x: number, y: number): void;
  }


  interface ThemeLabelSource extends ValuesProvider {}
  class ThemeLabelSource extends ValuesProvider {
    static readonly values: Map;
    static FPS: InfoSlot;
    static GameTime: InfoSlot;
    static GameTimeReal: InfoSlot;
    static RealTime: InfoSlot;
    static Day: InfoSlot;
    static Location: InfoSlot;
    static Biome: InfoSlot;
    static Dimension: InfoSlot;
    static Region: InfoSlot;
    static LightLevel: InfoSlot;
    static MoonPhase: InfoSlot;
    static Blank: InfoSlot;
    static Weather: InfoSlot;
    static MovementSpeed: InfoSlot;
    static create(key: string, cacheMillis: number, granularityMillis: number, supplier: Supplier<Component>): InfoSlot;
    static create(modId: string, key: string, cacheMillis: number, granularityMillis: number, supplier: Supplier<Component>): InfoSlot;
    get defaultString(): string;
    get strings(): string[];
    getTooltip(value: string): string;
    static resetCaches(): void;
  }


  class ThemeMinimapFrame {
    readonly theme: Theme;
    readonly minimapSpec: MinimapSpec;
    clear: boolean;
    constructor(theme: Theme, minimapSpec: MinimapSpec, miniMapProperties: MiniMapProperties, width: number, height: number);
    clear(): void;
    drawFrame(graphics: GuiGraphics): void;
    drawMask(graphics: GuiGraphics, buffers: MultiBufferSource): void;
    drawReticle(graphics: GuiGraphics): void;
    get compassPoint(): DynamicTexture;
    get frameBounds(): Double;
    get height(): number;
    get reticleOrientation(): ReticleOrientation;
    get width(): number;
    get x(): number;
    get y(): number;
    set x(x: number);
    set y(y: number);
    setPosition(x: number, y: number): void;
  }


  class ThemePresets {
    static DEFAULT_DIRECTORY: string;
    static get default(): Theme;
    static get presetDirs(): string[];
    static get presets(): Theme[];
  }


  interface ThemeToggle extends ThemeButton {}
  class ThemeToggle extends ThemeButton {
    constructor(theme: Theme, rawlabel: string, icon: ResourceLocation, onPress: OnPress);

    constructor(theme: Theme, labelOn: string, labelOff: string, icon: ResourceLocation, onPress: OnPress);

    constructor(theme: Theme, rawlabel: string, iconName: string, onPress: OnPress);

    constructor(theme: Theme, labelOn: string, labelOff: string, iconName: string, onPress: OnPress);

    constructor(theme: Theme, rawlabel: string, iconName: string, field: BooleanField, onPress: OnPress);
    mouseClicked(mouseX: number, mouseY: number, mouseButton: number): boolean;
  }


  interface ThemeToolbar extends IThemeToolbarInternal, journeymap_client_ui_component_buttons_Button {}
  class ThemeToolbar extends IThemeToolbarInternal {
    constructor(theme: Theme, ...buttons: journeymap_client_ui_component_buttons_Button[]);

    constructor(theme: Theme, ...buttons: ThemeButton[]);

    constructor(theme: Theme, buttonList: ButtonList);
    add<B extends journeymap_client_ui_component_buttons_Button>(...buttons: B[]): void;
    addAllButtons(gui: JmUILegacy): void;
    contains(button: Button): boolean;
    equalizeWidths(fr: Font): void;
    equalizeWidths(fr: Font, hgap: number, maxTotalWidth: number): void;
    get bottomY(): number;
    get centerX(): number;
    get hMargin(): number;
    get middleY(): number;
    get rightX(): number;
    get toolbarHeight(): number;
    get toolbarSpec(): ToolbarSpec;
    get toolbarWidth(): number;
    get toolbarX(): number;
    get toolbarY(): number;
    get vMargin(): number;
    get wrappedTooltip(): FormattedCharSequence[];
    layoutCenteredHorizontal(centerX: number, y: number, leftToRight: boolean, hgap: number): ButtonList;
    layoutCenteredVertical(x: number, centerY: number, leftToRight: boolean, vgap: number): ButtonList;
    layoutDistributedHorizontal(leftX: number, y: number, rightX: number, leftToRight: boolean): ButtonList;
    layoutFilledHorizontal(fr: Font, leftX: number, y: number, rightX: number, hgap: number, leftToRight: boolean): ButtonList;
    layoutHorizontal(startX: number, y: number, leftToRight: boolean, hgap: number): ButtonList;
    layoutHorizontal(startX: number, y: number, leftToRight: boolean, hgap: number, alignCenter: boolean): ButtonList;
    layoutVertical(x: number, startY: number, leftToRight: boolean, vgap: number): ButtonList;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, f: number): void;
    reverse(): ButtonList;
    setDrawToolbar(draw: boolean): void;
    setLayout(layout: Layout, direction: Direction): void;
    setLayoutCenteredHorizontal(centerX: number, y: number, hgap: number, leftToRight: boolean): void;
    setLayoutCenteredVertical(x: number, centerY: number, vgap: number, leftToRight: boolean): void;
    setLayoutDistributedHorizontal(leftX: number, y: number, rightX: number, leftToRight: boolean): void;
    setLayoutHorizontal(startX: number, y: number, hgap: number, leftToRight: boolean): void;
    setLayoutVertical(x: number, startY: number, vgap: number, leftToRight: boolean): void;
    setPosition(i: number, j: number): void;
    setReverse(): void;
    setToolbarPosition(x: number, y: number): void;
    updateLayout(): void;
    updateTextures(): ToolbarSpec;
    updateTheme(theme: Theme): void;
  }

}

declare module 'journeymap.client.ui.theme.Theme' {
  import { Toolbar } from 'journeymap.client.ui.theme.Theme.Container';
  import { ButtonSpec } from 'journeymap.client.ui.theme.Theme.Control';
  import { MinimapCircle, MinimapSquare } from 'journeymap.client.ui.theme.Theme.Minimap';
  import { Theme } from 'journeymap.client.ui.theme';
  import { Cloneable } from 'java.lang';

  class Container {
    toolbar: Toolbar;
  }


  class Control {
    button: ButtonSpec;
    toggle: ButtonSpec;
  }


  class Fullscreen {
    background: ColorSpec;
    statusLabel: LabelSpec;
  }


  interface ImageSpec extends ColorSpec {}
  class ImageSpec extends ColorSpec {
    width: number;
    height: number;
    constructor();

    constructor(width: number, height: number);
  }


  class Minimap {
    circle: MinimapCircle;
    square: MinimapSquare;
  }


  class DefaultPointer {
    directory: string;
    filename: string;
    name: string;
    constructor(theme: Theme);
  }


  interface LabelSpec extends Cloneable {}
  class LabelSpec extends Cloneable {
    margin: number;
    background: ColorSpec;
    foreground: ColorSpec;
    highlight: ColorSpec;
    shadow: boolean;
    clone(): LabelSpec;
  }


  interface ColorSpec extends Cloneable {}
  class ColorSpec extends Cloneable {
    color: string;
    alpha: number;
    constructor();

    constructor(color: string, alpha: number);
    clone(): ColorSpec;
    get color(): number;
  }

}

declare module 'journeymap.client.ui.theme.Theme.Container' {
  import { ToolbarSpec } from 'journeymap.client.ui.theme.Theme.Container.Toolbar';

  class Toolbar {
    horizontal: ToolbarSpec;
    vertical: ToolbarSpec;
  }

}

declare module 'journeymap.client.ui.theme.Theme.Container.Toolbar' {
  import { ImageSpec } from 'journeymap.client.ui.theme.Theme';

  class ToolbarSpec {
    useThemeImages: boolean;
    prefix: string;
    margin: number;
    padding: number;
    begin: ImageSpec;
    inner: ImageSpec;
    end: ImageSpec;
  }

}

declare module 'journeymap.client.ui.theme.Theme.Control' {
  import { ColorSpec } from 'journeymap.client.ui.theme.Theme';

  class ButtonSpec {
    useThemeImages: boolean;
    width: number;
    height: number;
    prefix: string;
    tooltipOnStyle: string;
    tooltipOffStyle: string;
    tooltipDisabledStyle: string;
    iconOn: ColorSpec;
    iconOff: ColorSpec;
    iconHoverOn: ColorSpec;
    iconHoverOff: ColorSpec;
    iconDisabled: ColorSpec;
    buttonOn: ColorSpec;
    buttonOff: ColorSpec;
    buttonHoverOn: ColorSpec;
    buttonHoverOff: ColorSpec;
    buttonDisabled: ColorSpec;
  }

}

declare module 'journeymap.client.ui.theme.Theme.Minimap' {
  import { ImageSpec, LabelSpec, ColorSpec } from 'journeymap.client.ui.theme.Theme';

  interface MinimapCircle extends MinimapSpec {}
  class MinimapCircle extends MinimapSpec {
    rim256: ImageSpec;
    mask256: ImageSpec;
    rim512: ImageSpec;
    mask512: ImageSpec;
    rotates: boolean;
  }


  interface MinimapSquare extends MinimapSpec {}
  class MinimapSquare extends MinimapSpec {
    topLeft: ImageSpec;
    top: ImageSpec;
    topRight: ImageSpec;
    right: ImageSpec;
    bottomRight: ImageSpec;
    bottom: ImageSpec;
    bottomLeft: ImageSpec;
    left: ImageSpec;
  }


  class MinimapSpec {
    margin: number;
    labelTop: LabelSpec;
    labelTopInside: boolean;
    labelBottom: LabelSpec;
    labelBottomInside: boolean;
    compassLabel: LabelSpec;
    compassPoint: ImageSpec;
    compassPointLabelPad: number;
    compassPointOffset: number;
    compassShowNorth: boolean;
    compassShowSouth: boolean;
    compassShowEast: boolean;
    compassShowWest: boolean;
    waypointOffset: number;
    reticle: ColorSpec;
    reticleHeading: ColorSpec;
    reticleThickness: number;
    reticleHeadingThickness: number;
    reticleOffsetOuter: number;
    reticleOffsetInner: number;
    frame: ColorSpec;
    prefix: string;
  }

}

declare module 'journeymap.client.ui.theme.ThemeLabelSource' {
  import { Supplier } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';

  class InfoSlot {
    constructor(key: string, cacheMillis: number, granularityMillis: number, supplier: Supplier<Component>);

    constructor(modId: string, key: string, cacheMillis: number, granularityMillis: number, supplier: Supplier<Component>);
    get key(): string;
    get tooltip(): string;
    getLabelText(currentTimeMillis: number): Component;
    isShown(): boolean;
  }

}

declare module 'journeymap.client.ui.waypointmanager' {
  import { PopupButtonScreen } from 'journeymap.client.ui.component.popupscreenbutton';
  import { Boolean, Comparable, Integer } from 'java.lang';
  import { OnClose } from 'journeymap.client.ui.component.popupscreenbutton.PopupButtonScreen';
  import { DropDownButton, DropDownItem, SelectableParent } from 'journeymap.client.ui.component.dropdown';
  import { OnPress } from 'Button';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Level } from 'net.minecraft.world.level';
  import { LayoutSlot, Slot } from 'journeymap.client.ui.component';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Layout } from 'net.minecraft.client.gui.layouts';
  import { ChatScreen, Screen } from 'net.minecraft.client.gui.screens';
  import { ClientWaypointImpl } from 'journeymap.client.waypoint';
  import { JmUI } from 'journeymap.client.ui.component.screens';
  import { Minecraft } from 'net.minecraft.client';

  interface DeleteConfirmMultiSelectPopup extends PopupButtonScreen<boolean> {}
  class DeleteConfirmMultiSelectPopup extends PopupButtonScreen<boolean> {
    setOnClosed(onClose: OnClose<boolean>): void;
  }


  interface DimensionsDropDownButton extends DropDownButton {}
  class DimensionsDropDownButton extends DropDownButton {
    constructor(onPress: OnPress);
    setDim(dimension: ResourceKey<Level>): void;
    setDim(dimension: string): void;
    setSelected(selectedButton: DropDownItem): void;
    setX(x: number): void;
    setY(y: number): void;
  }


  interface ManagerSlot extends Comparable<ManagerSlot>, LayoutSlot {}
  class ManagerSlot extends Comparable<ManagerSlot> {
    static backgroundHover: number;
    get layout(): Layout;
    init(): void;
    outline(graphics: GuiGraphics, x: number, y: number, width: number, height: number, color: number, alpha: number): void;
    repositionElements(): void;
  }


  interface WaypointChat extends ChatScreen {}
  class WaypointChat extends ChatScreen {
    constructor(waypoint: ClientWaypointImpl);

    constructor(text: string);
    init(): void;
  }


  interface WaypointManager extends SelectableParent, JmUI {}
  class WaypointManager extends SelectableParent {
    constructor(returnDisplay: Screen);

    constructor(focusWaypoint: ClientWaypointImpl, returnDisplay: Screen);
    init(): void;
    init(minecraft: Minecraft, width: number, height: number): void;
    isSearchFocused(): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrollX: number, scrollY: number): boolean;
    onClose(): void;
    render(graphics: GuiGraphics, x: number, y: number, par3: number): void;
    setSelected(button: DropDownItem): void;
    updateGroupSlots(): void;
    updateSelectedGroup(groupSelected: Slot): void;
  }

}

declare module 'journeymap.client.ui.waypointmanager.group' {
  import { PopupButtonScreen } from 'journeymap.client.ui.component.popupscreenbutton';
  import { Tuple2 } from 'journeymap.api.v2.client.util.tuple';
  import { WaypointGroupEvent } from 'journeymap.api.v2.common.event.common';
  import { SelectableParent, DropDownItem } from 'journeymap.client.ui.component.dropdown';
  import { Component } from 'net.minecraft.network.chat';
  import { WaypointGroup } from 'journeymap.api.v2.common.waypoint';
  import { ScrollListLayoutPane, Slot } from 'journeymap.client.ui.component';
  import { Minecraft } from 'net.minecraft.client';
  import { WaypointManager, ManagerSlot } from 'journeymap.client.ui.waypointmanager';
  import { GuiGraphics, ComponentPath } from 'net.minecraft.client.gui';
  import { FocusNavigationEvent } from 'net.minecraft.client.gui.navigation';
  import { Consumer } from 'java.util.function';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { Boolean } from 'java.lang';
  import { Layout } from 'net.minecraft.client.gui.layouts';
  import { Collection, List } from 'java.util';
  import { SlotMetadata } from 'journeymap.client.ui.option';

  interface DeleteConfirmGroupPopup extends PopupButtonScreen<Tuple2> {}
  class DeleteConfirmGroupPopup extends PopupButtonScreen<Tuple2> {
  }


  interface EditGroupPopup extends SelectableParent, PopupButtonScreen<WaypointGroupEvent> {}
  class EditGroupPopup extends SelectableParent {
    constructor(title: Component, group: WaypointGroup);

    constructor(title: Component);
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    setSelected(button: DropDownItem): void;
  }


  interface GroupPanel<T extends GroupSlot = any> extends ScrollListLayoutPane<T> {}
  class GroupPanel<T extends GroupSlot = any> extends ScrollListLayoutPane<T> {
    constructor(mc: Minecraft, manager: WaypointManager, x: number, y: number, width: number, height: number, slotHeight: number);
    initSlots(): void;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    nextFocusPath(event: FocusNavigationEvent): ComponentPath;
    renderBackground(graphics: GuiGraphics, i: number, j: number, f: number): void;
    renderSelection(guiGraphics: GuiGraphics, top: number, width: number, height: number, outerColor: number, innerColor: number): void;
    repositionSlots(): void;
    select(guid: string): void;
    setSelected(lastSelected: string): void;
    unselect(): void;
    visitSlots(consumer: Consumer<AbstractWidget>): void;
  }


  interface GroupSettingsPopup extends PopupButtonScreen<boolean> {}
  class GroupSettingsPopup extends PopupButtonScreen<boolean> {
    constructor();
    init(): void;
  }


  interface GroupSlot extends ManagerSlot {}
  class GroupSlot extends ManagerSlot {
    constructor(group: WaypointGroup, width: number, height: number);
    charTyped(typedChar: string, keyCode: number): boolean;
    compareTo(o: ManagerSlot): number;
    contains(slotMetadata: SlotMetadata): boolean;
    equals(o: any): boolean;
    get columnWidth(): number;
    get currentTooltip(): SlotMetadata;
    get group(): WaypointGroup;
    get lastPressed(): SlotMetadata;
    get layout(): Layout;
    get metadata(): Collection<SlotMetadata<GroupSlot>>;
    getChildSlots(listWidth: number, columnWidth: number): Slot[];
    getCurrentTooltip(mouseX: number, mouseY: number): SlotMetadata;
    hashCode(): number;
    init(): void;
    keyPressed(key: number, value: number, modifier: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    render(graphics: GuiGraphics, slotIndex: number, y: number, x: number, rowWidth: number, itemHeight: number, mouseX: number, mouseY: number, isMouseOver: boolean, partialTicks: number): void;
    renderTransferStatus(graphics: GuiGraphics, transferable: boolean): void;
    repositionElements(): void;
    setEnabled(enabled: boolean): void;
    setSelected(selected: boolean): void;
    toString(): string;
  }

}

declare module 'journeymap.client.ui.waypointmanager.ManagerSlot' {
  import { SlotMetadata } from 'journeymap.client.ui.option';
  import { ManagerSlot } from 'journeymap.client.ui.waypointmanager';
  import { List } from 'java.util';
  import { FormattedCharSequence } from 'net.minecraft.util';

  interface ToolTipMeta extends SlotMetadata<ManagerSlot> {}
  class ToolTipMeta extends SlotMetadata<ManagerSlot> {
    constructor(tooltips: FormattedCharSequence[]);
    get tooltip(): FormattedCharSequence[];
  }

}

declare module 'journeymap.client.ui.waypointmanager.notification' {
  import { Component } from 'net.minecraft.network.chat';
  import { ScrollListLayoutPane, Slot } from 'journeymap.client.ui.component';
  import { Minecraft } from 'net.minecraft.client';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { PopupButtonScreen } from 'journeymap.client.ui.component.popupscreenbutton';
  import { List, Collection } from 'java.util';
  import { ManagerSlot } from 'journeymap.client.ui.waypointmanager';
  import { ClientWaypointImpl } from 'journeymap.client.waypoint';
  import { Layout } from 'net.minecraft.client.gui.layouts';
  import { SlotMetadata } from 'journeymap.client.ui.option';

  interface ImportExternalWaypointsScreen extends NotificationScreen {}
  class ImportExternalWaypointsScreen extends NotificationScreen {
    constructor(title: Component);
  }


  interface NotificationPanel<T extends WaypointNotificationSlot = any> extends ScrollListLayoutPane<T> {}
  class NotificationPanel<T extends WaypointNotificationSlot = any> extends ScrollListLayoutPane<T> {
    constructor(mc: Minecraft, width: number, height: number, slotHeight: number);
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    renderBackground(graphics: GuiGraphics, i: number, j: number, f: number): void;
    renderSelection(guiGraphics: GuiGraphics, top: number, width: number, height: number, outerColor: number, innerColor: number): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    setListWidth(width: number): void;
    setX(x: number): void;
    updateSize(width: number, height: number, x: number, y: number): void;
  }


  interface NotificationScreen extends PopupButtonScreen<List> {}
  class NotificationScreen extends PopupButtonScreen<List> {
    constructor(title: Component);
  }


  interface WaypointNotificationSlot extends ManagerSlot {}
  class WaypointNotificationSlot extends ManagerSlot {
    constructor(waypoint: ClientWaypointImpl, from: string);
    compareTo(o: ManagerSlot): number;
    contains(slotMetadata: SlotMetadata): boolean;
    get currentTooltip(): SlotMetadata;
    get lastPressed(): SlotMetadata;
    get layout(): Layout;
    get metadata(): Collection<SlotMetadata>;
    get waypoint(): ClientWaypointImpl;
    getChildSlots(listWidth: number, columnWidth: number): Slot[];
    init(): void;
    isChecked(): boolean;
    render(graphics: GuiGraphics, slotIndex: number, y: number, x: number, rowWidth: number, itemHeight: number, mouseX: number, mouseY: number, isMouseOver: boolean, partialTicks: number): void;
    repositionElements(): void;
    setChecked(checked: boolean): void;
    setEnabled(enabled: boolean): void;
  }

}

declare module 'journeymap.client.ui.waypointmanager.waypoint' {
  import { Enum, Boolean } from 'java.lang';
  import { List, Collection } from 'java.util';
  import { PopupButtonScreen } from 'journeymap.client.ui.component.popupscreenbutton';
  import { OnClose } from 'journeymap.client.ui.component.popupscreenbutton.PopupButtonScreen';
  import { ScrollListLayoutPane, Slot } from 'journeymap.client.ui.component';
  import { Minecraft } from 'net.minecraft.client';
  import { Consumer } from 'java.util.function';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ManagerSlot } from 'journeymap.client.ui.waypointmanager';
  import { Layout } from 'net.minecraft.client.gui.layouts';
  import { SlotMetadata } from 'journeymap.client.ui.option';
  import { Waypoint, WaypointGroup } from 'journeymap.api.v2.common.waypoint';
  import { SelectableParent, DropDownItem } from 'journeymap.client.ui.component.dropdown';
  import { ClientWaypointImpl } from 'journeymap.client.waypoint';
  import { BlockPos } from 'net.minecraft.core';
  import { Component } from 'net.minecraft.network.chat';
  import { StringWidget, ColoredImageWidget } from 'journeymap.client.ui.component.widgets';
  import { Player } from 'net.minecraft.world.entity.player';

  interface CoordinatesLayout extends Enum<CoordinatesLayout> {}
  class CoordinatesLayout extends Enum<CoordinatesLayout> {
    static readonly XZY: CoordinatesLayout;
    static readonly XYZ: CoordinatesLayout;
    static readonly SINGLE_FIELD: CoordinatesLayout;
    get key(): string;
    static valueOf(name: string): CoordinatesLayout;
    static values(): CoordinatesLayout[];
  }


  interface DeleteConfirmWaypointPopup extends PopupButtonScreen<boolean> {}
  class DeleteConfirmWaypointPopup extends PopupButtonScreen<boolean> {
    setOnClosed(onClose: OnClose<boolean>): void;
  }


  interface DimensionPanel<T extends DimensionSlot = any> extends ScrollListLayoutPane<T> {}
  class DimensionPanel<T extends DimensionSlot = any> extends ScrollListLayoutPane<T> {
    constructor(mc: Minecraft, width: number, height: number, slotHeight: number);
    initSlots(): void;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    renderBackground(graphics: GuiGraphics, i: number, j: number, f: number): void;
    renderSelection(guiGraphics: GuiGraphics, top: number, width: number, height: number, outerColor: number, innerColor: number): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    repositionSlots(): void;
    setX(x: number): void;
    visitSlots(consumer: Consumer<AbstractWidget>): void;
  }


  interface DimensionSlot extends ManagerSlot {}
  class DimensionSlot extends ManagerSlot {
    constructor(dimId: string, dimName: string, enabled: boolean, primary: boolean);
    compareTo(o: ManagerSlot): number;
    contains(slotMetadata: SlotMetadata): boolean;
    get columnWidth(): number;
    get currentTooltip(): SlotMetadata;
    get dimId(): string;
    get lastPressed(): SlotMetadata;
    get layout(): Layout;
    get metadata(): Collection<SlotMetadata>;
    getChildSlots(listWidth: number, columnWidth: number): Slot[];
    init(): void;
    isEnabled(): boolean;
    isPrimary(): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    render(graphics: GuiGraphics, slotIndex: number, y: number, x: number, rowWidth: number, itemHeight: number, mouseX: number, mouseY: number, isMouseOver: boolean, partialTicks: number): void;
    repositionElements(): void;
    setEnabled(selected: boolean): void;
    setPrimary(primary: boolean): void;
  }


  interface EditorOptionsPopup extends PopupButtonScreen<boolean> {}
  class EditorOptionsPopup extends PopupButtonScreen<boolean> {
    init(): void;
  }


  interface WaypointEditor extends SelectableParent, PopupButtonScreen<Waypoint> {}
  class WaypointEditor extends SelectableParent {
    constructor(waypoint: ClientWaypointImpl);

    constructor(openedWithHotkey: boolean, pos: BlockPos);

    constructor(title: Component, waypoint: ClientWaypointImpl, pos: BlockPos);

    constructor(openedWithHotkey: boolean, waypoint: ClientWaypointImpl, group: WaypointGroup);
    charTyped(typedChar: string, keyCode: number): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    renderPopupScreenBackground(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    setSelected(button: DropDownItem): void;
  }


  interface WaypointPanel<T extends WaypointSlot = any> extends ScrollListLayoutPane<T> {}
  class WaypointPanel<T extends WaypointSlot = any> extends ScrollListLayoutPane<T> {
    constructor(mc: Minecraft, x: number, y: number, width: number, height: number, slotHeight: number);
    get draggingSlots(): WaypointSlot[];
    get rowLeft(): number;
    initSlots(): void;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    renderBackground(graphics: GuiGraphics, i: number, j: number, f: number): void;
    renderItem(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number, index: number, left: number, top: number, width: number, height: number): void;
    repositionSlots(): void;
    visitSlots(consumer: Consumer<AbstractWidget>): void;
  }


  interface WaypointSlot extends SelectableParent, ManagerSlot {}
  class WaypointSlot extends SelectableParent {
    dragX: number;
    dragY: number;
    y: number;
    x: number;
    name: StringWidget;
    icon: ColoredImageWidget;
    constructor(waypoint: ClientWaypointImpl);
    charTyped(typedChar: string, keyCode: number): boolean;
    compareTo(o: ManagerSlot): number;
    contains(slotMetadata: SlotMetadata): boolean;
    get columnWidth(): number;
    get currentTooltip(): SlotMetadata;
    get distance(): number;
    get lastPressed(): SlotMetadata;
    get layout(): Layout;
    get metadata(): Collection<SlotMetadata>;
    get waypoint(): ClientWaypointImpl;
    getChildSlots(listWidth: number, columnWidth: number): Slot[];
    getDistanceTo(player: Player): number;
    init(): void;
    isDragging(): boolean;
    isSelected(): boolean;
    keyPressed(key: number, value: number, modifier: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    render(graphics: GuiGraphics, slotIndex: number, y: number, x: number, listWidth: number, itemHeight: number, mouseX: number, mouseY: number, isMouseOver: boolean, partialTicks: number): void;
    renderGhost(graphics: GuiGraphics, xOffset: number, yOffset: number, partialTicks: number): void;
    repositionElements(): void;
    setEnabled(enabled: boolean): void;
    setSelected(selected: boolean): void;
    setSelected(button: DropDownItem): void;
  }

}

declare module 'journeymap.client.waypoint' {
  import { WaypointDAO } from 'journeymap.common.nbt.waypoint';
  import { Map, Collection, List } from 'java.util';
  import { WaypointGroupImpl, WaypointImpl } from 'journeymap.common.waypoint';
  import { CompoundTag, Tag } from 'net.minecraft.nbt';
  import { File } from 'java.io';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Integer } from 'java.lang';
  import { DynamicTexture } from 'net.minecraft.client.renderer.texture';

  interface ClientWaypointDAO extends WaypointDAO {}
  class ClientWaypointDAO extends WaypointDAO {
    constructor();
    copyWaypoint(waypoint: WaypointImpl): WaypointImpl;
    decodeGroups(data: CompoundTag): Map<string, WaypointGroupImpl>;
    decodeWaypoint(data: Tag): WaypointImpl;
    decodeWaypoints(data: CompoundTag): Map<string, WaypointImpl>;
    encodeGroups(groups: Collection<WaypointGroupImpl>): CompoundTag;
    encodeWaypoint(waypoint: WaypointImpl): Tag;
    encodeWaypoints(waypoints: Collection<WaypointImpl>): CompoundTag;
    get groups(): Map<string, WaypointGroupImpl>;
    get waypoints(): Map<string, WaypointImpl>;
    save(async: boolean): void;
  }


  class ExternalWaypointFinder {
    get xaeroWaypoints(): ClientWaypointImpl[];
    hasExternalWaypoints(): boolean;
  }


  class LegacyWaypointFileMigrator {
    static loadWaypoints(waypointDir: File): ClientWaypointImpl[];
  }


  interface PlayerPoint extends ClientWaypointImpl {}
  class PlayerPoint extends ClientWaypointImpl {
    constructor(player: Player);
    get displayName(): string;
    get iconColor(): number;
    get texture(): DynamicTexture;
    get x(): number;
    get y(): number;
    get z(): number;
    hasCustomIconColor(): boolean;
    hasCustomTexture(): boolean;
    isInPlayerDimension(): boolean;
  }


  class WaypointHandler {
    get dao(): WaypointDAO;
    static get instance(): WaypointHandler;
    reset(): void;
    reset(migrate: boolean): void;
  }

}

declare module 'journeymap.client.world' {
  import { ColorResolver, BlockAndTintGetter, ClipContext, Level, LightLayer } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { Enum } from 'java.lang';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { BlockHitResult, Vec3 } from 'net.minecraft.world.phys';
  import { VoxelShape } from 'net.minecraft.world.phys.shapes';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { LevelLightEngine } from 'net.minecraft.world.level.lighting';
  import { List } from 'java.util';

  class BiomeColors {
    static readonly GRASS_COLOR_RESOLVER: ColorResolver;
    static readonly FOLIAGE_COLOR_RESOLVER: ColorResolver;
    static readonly WATER_COLOR_RESOLVER: ColorResolver;
    static getAverageFoliageColor(level: BlockAndTintGetter, blockPos: BlockPos): number;
    static getAverageGrassColor(level: BlockAndTintGetter, blockPos: BlockPos): number;
    static getAverageWaterColor(level: BlockAndTintGetter, blockPos: BlockPos): number;
  }


  interface JmBlockAccess extends Enum<JmBlockAccess> {}
  class JmBlockAccess extends Enum<JmBlockAccess> {
    static readonly INSTANCE: JmBlockAccess;
    canSeeSky(blockPosIn: BlockPos): boolean;
    clip(context: ClipContext): BlockHitResult;
    clipWithInteractionOverride(vec3d: Vec3, vec3d_1: Vec3, blockPos: BlockPos, voxelShape: VoxelShape, blockState: BlockState): BlockHitResult;
    get height(): number;
    get lightEngine(): LevelLightEngine;
    get maxBuildHeight(): number;
    get maxLightLevel(): number;
    get minBuildHeight(): number;
    get world(): Level;
    getBiome(pos: BlockPos): Biome;
    getBiome(pos: BlockPos, defaultBiome: Biome): Biome;
    getBlockEntity(pos: BlockPos): BlockEntity;
    getBlockState(pos: BlockPos): BlockState;
    getBlockTint(blockPos: BlockPos, colorResolver: ColorResolver): number;
    getBrightness(lightType: LightLayer, blockPos: BlockPos): number;
    getFluidState(blockPos: BlockPos): FluidState;
    getLightEmission(p_217298_1_: BlockPos): number;
    getRawBrightness(blockPosIn: BlockPos, amount: number): number;
    getShade(p_230487_1_: Direction, p_230487_2_: boolean): number;
    static valueOf(name: string): JmBlockAccess;
    static values(): JmBlockAccess[];
  }

}