declare module 'dev.uncandango.alltheleaks' {
  import { Logger } from 'org.slf4j';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';
  import { Path } from 'java.nio.file';

  class AllTheLeaks {
    static readonly MOD_ID: string;
    static readonly LOGGER: Logger;
    static readonly INDEV: boolean;
    constructor(eventModBus: IEventBus, modContainer: ModContainer);
    static get local(): Path;
  }

}

declare module 'dev.uncandango.alltheleaks.annotation' {
  import { AnnotationData } from 'ModFileScanData';

  class AnnotationHelper {
    static getValue<T>(annotation: AnnotationData, fieldName: string): T;
  }

}

declare module 'dev.uncandango.alltheleaks.api.windows' {
  import { Struct, NativeResource, MemoryStack, SharedLibrary } from 'org.lwjgl.system';
  import { ByteBuffer } from 'java.nio';

  interface ProcessMemoryCounter extends NativeResource, Struct<ProcessMemoryCounter> {}
  class ProcessMemoryCounter extends NativeResource {
    static readonly SIZEOF: number;
    static readonly ALIGNOF: number;
    static readonly CB: number;
    static readonly PAGE_FAULT_COUNT: number;
    static readonly PEAK_WORKING_SET_SIZE: number;
    static readonly WORKING_SET_SIZE: number;
    static readonly QUOTA_PEAK_PAGED_POOL_USAGE: number;
    static readonly QUOTA_PAGED_POOL_USAGE: number;
    static readonly QUOTA_PEAK_NON_PAGED_POOL_USAGE: number;
    static readonly QUOTA_NON_PAGED_POOL_USAGE: number;
    static readonly PAGEFILE_USAGE: number;
    static readonly PEAK_PAGEFILE_USAGE: number;
    constructor(container: ByteBuffer);
    cb(): number;
    static create(): ProcessMemoryCounter;
    static malloc(stack: MemoryStack): ProcessMemoryCounter;
    static ncb(struct: number): number;
    static npageFaultCount(struct: number): number;
    static npagefileUsage(struct: number): number;
    static npeakPagefileUsage(struct: number): number;
    static npeakWorkingSetSize(struct: number): number;
    static nquotaNonPagedPoolUsage(struct: number): number;
    static nquotaPagedPoolUsage(struct: number): number;
    static nquotaPeakNonPagedPoolUsage(struct: number): number;
    static nquotaPeakPagedPoolUsage(struct: number): number;
    static nworkingSetSize(struct: number): number;
    pageFaultCount(): number;
    pagefileUsage(): number;
    peakPagefileUsage(): number;
    peakWorkingSetSize(): number;
    quotaNonPagedPoolUsage(): number;
    quotaPagedPoolUsage(): number;
    quotaPeakNonPagedPoolUsage(): number;
    quotaPeakPagedPoolUsage(): number;
    sizeof(): number;
    workingSetSize(): number;
  }


  class PsApi {
    static EmptyWorkingSetOfCurrentProcess(): boolean;
    static GetProcessMemoryInfo(Process: number, ppsmemCounters: number, cb: number): boolean;
    static get library(): SharedLibrary;
  }

}

declare module 'dev.uncandango.alltheleaks.api.windows.PsApi' {
  class Functions {
    static readonly EmptyWorkingSet: number;
    static readonly GetProcessMemoryInfo: number;
  }

}

declare module 'dev.uncandango.alltheleaks.commands' {
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack, CommandBuildContext } from 'net.minecraft.commands';
  import { Post } from 'LevelTickEvent';
  import { ServerLevel } from 'net.minecraft.server.level';

  class ATLCommands {
    static checkLeaking(source: CommandSourceStack, shouldRunGc: boolean): number;
    static clearTrackingChunks(source: CommandSourceStack): number;
    onLevelTick(event: Post): void;
    static registerClientCommands(dispatcher: CommandDispatcher<CommandSourceStack>, context: CommandBuildContext): void;
    static registerCommonCommands(dispatcher: CommandDispatcher<CommandSourceStack>, context: CommandBuildContext): void;
    static registerServerCommands(dispatcher: CommandDispatcher<CommandSourceStack>, context: CommandBuildContext): void;
    static runGc(source: CommandSourceStack): number;
    static startTrackingChunks(source: CommandSourceStack, x: number, z: number, level: ServerLevel): number;
  }

}

declare module 'dev.uncandango.alltheleaks.config' {
  class ATLProperties {
    ingredientDedupe: boolean;
    debugItemStackModifications: boolean;
    debugNativeImage: boolean;
    disableSearchTree: boolean;
    logIntervalInMinutes: number;
    showSummaryOnDebugScreen: boolean;
    version: number;
    memoryUsageWarningPercentage: number;
    debugChunkLoading: boolean;
    debugThreadsStuck: boolean;
    disableEternalStarlightProgress: boolean;
    skipTickingUnloadedFluxNetworks: boolean;
    static get (): ATLProperties;
    load(): void;
    static save(): void;
  }

}

declare module 'dev.uncandango.alltheleaks.diag.common.mods.minecraft' {
  import { BlockPos } from 'net.minecraft.core';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Level, ChunkPos } from 'net.minecraft.world.level';
  import { List, Map } from 'java.util';

  class DebugChunkLoading {
    static lastBlockPos: BlockPos;
    constructor();
    static addTrackingChunk(dimension: ResourceKey<Level>, chunkPos: ChunkPos): void;
    static clearTrackingChunks(): void;
    static getTrackingChunks(dimension: ResourceKey<Level>): ChunkPos[];
    static isTracking(dimension: ResourceKey<Level>, packedPos: number): boolean;
  }


  class DebugItemStackModifications {
  }


  class DebugNativeImage {
    static readonly NATIVE_IMAGES_TRACKER: Map;
  }


  class LogSavedData {
  }


  class ModernFixProfilerByMod {
  }

}

declare module 'dev.uncandango.alltheleaks.diag.server.mods.minecraft' {
  import { RecordedEvent } from 'jdk.jfr.consumer';
  import { Thread } from 'java.lang';

  class DebugThreadsHooks {
    static prettyPrintEvent(thread: Thread): void;
    static track(event: RecordedEvent): void;
    static untrack(event: RecordedEvent): void;
  }

}

declare module 'dev.uncandango.alltheleaks.events' {
  import { DebugText } from 'CustomizeGuiOverlayEvent';
  import { RegisterClientCommandsEvent } from 'net.neoforged.neoforge.client.event';
  import { Post } from 'ClientTickEvent';
  import { Opening } from 'ScreenEvent';
  import { EntityLeaveLevelEvent } from 'net.neoforged.neoforge.event.entity';
  import { LoggingIn, Clone, LoggingOut } from 'ClientPlayerNetworkEvent';
  import { RenderEnginesUpdated } from 'dev.uncandango.alltheleaks.mixin.UpdateableLevel';
  import { InterModProcessEvent, FMLLoadCompleteEvent } from 'net.neoforged.fml.event.lifecycle';
  import { ServerStoppingEvent, ServerStoppedEvent, ServerStartedEvent } from 'net.neoforged.neoforge.event.server';
  import { PlayerLoggedOutEvent, Clone as playerevent_Clone } from 'PlayerEvent';
  import { Unload } from 'ChunkEvent';
  import { Unload as levelevent_Unload } from 'LevelEvent';
  import { RegisterCommandsEvent, AddReloadListenerEvent } from 'net.neoforged.neoforge.event';
  import { RegisterTicketControllersEvent } from 'net.neoforged.neoforge.common.world.chunk';
  import { Post as servertickevent_Post } from 'ServerTickEvent';

  class ClientEvents {
    static addDebugOSMemoryUsed(event: DebugText): void;
    static clientCommands(event: RegisterClientCommandsEvent): void;
    static onClientPlayerClone(event: Clone): void;
    static onClientPlayerLogout(event: LoggingOut): void;
    static onClientTick(event: Post): void;
    static onDebugRender(event: DebugText): void;
    static onEntityLeaveLevelEvent(event: EntityLeaveLevelEvent): void;
    static onPlayerLogin(event: LoggingIn): void;
    static onRenderLevelUpdate(event: RenderEnginesUpdated): void;
    static onWorldSelection(event: Opening): void;
    static registerClientCommands(event: RegisterClientCommandsEvent): void;
  }


  class CommonEvents {
    static reports: number;
    static commonSetup(event: InterModProcessEvent): void;
    static onClosedServer(event: ServerStoppedEvent): void;
    static onModLoadComplete(event: FMLLoadCompleteEvent): void;
    static onPlayerClone(event: playerevent_Clone): void;
    static onPlayerCloneLowest(event: playerevent_Clone): void;
    static onPlayerLogout(event: PlayerLoggedOutEvent): void;
    static onReloadListener(event: AddReloadListenerEvent): void;
    static onShutdownServer(event: ServerStoppingEvent): void;
    static onUnloadChunk(event: Unload): void;
    static onUnloadLevel(event: levelevent_Unload): void;
    static registerChunkLoader(event: RegisterTicketControllersEvent): void;
    static registerCommonCommands(event: RegisterCommandsEvent): void;
  }


  class ServerEvents {
    static onServerStarted(event: ServerStartedEvent): void;
    static onServerTick(event: servertickevent_Post): void;
    static printNonDaemonThreads(event: ServerStoppedEvent): void;
    static registerServerCommands(event: RegisterCommandsEvent): void;
  }

}

declare module 'dev.uncandango.alltheleaks.exceptions' {
  import { IllegalStateException, UnsupportedOperationException } from 'java.lang';
  import { TYPE } from 'dev.uncandango.alltheleaks.exceptions.ATLIllegalState';

  interface ATLIllegalState extends IllegalStateException {}
  class ATLIllegalState extends IllegalStateException {
    constructor(type: TYPE, message: string);
  }


  interface ATLUnsupportedOperation extends UnsupportedOperationException {}
  class ATLUnsupportedOperation extends UnsupportedOperationException {
    constructor(message: string);
    static get errorCount(): number;
    static get unreportedErrorCount(): number;
  }

}

declare module 'dev.uncandango.alltheleaks.exceptions.ATLIllegalState' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface TYPE extends Enum<TYPE> {}
  class TYPE extends Enum<TYPE> {
    static readonly NO_REMOVAL_REASON: TYPE;
    get errorCount(): number;
    static valueOf(name: string): TYPE;
    static values(): TYPE[];
  }

}

declare module 'dev.uncandango.alltheleaks.feature.common.mods.minecraft' {
  import { PreparableReloadListener, ResourceManager } from 'net.minecraft.server.packs.resources';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { CompletableFuture, Executor } from 'java.util.concurrent';
  import { Void } from 'java.lang';
  import { PreparationBarrier } from 'PreparableReloadListener';
  import { ProfilerFiller } from 'net.minecraft.util.profiling';
  import { List } from 'java.util';
  import { Consumer } from 'java.util.function';
  import { TicketController } from 'net.neoforged.neoforge.common.world.chunk';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { FileVisitResult, Path } from 'java.nio.file';
  import { BasicFileAttributes } from 'java.nio.file.attribute';

  class DisableSearchTree {
  }


  interface IngredientDedupe extends PreparableReloadListener {}
  class IngredientDedupe extends PreparableReloadListener {
    static INSTANCE: IngredientDedupe;
    static clearIngredientsWithComponents(): void;
    equals(a: Ingredient, b: Ingredient): boolean;
    static get instance(): IngredientDedupe;
    get name(): string;
    hashCode(o: Ingredient): number;
    static intern(ingredient: Ingredient): Ingredient;
    reload(preparationBarrier: PreparationBarrier, resourceManager: ResourceManager, preparationsProfiler: ProfilerFiller, reloadProfiler: ProfilerFiller, backgroundExecutor: Executor, gameExecutor: Executor): CompletableFuture<Void>;
  }


  class MemoryMonitor {
    static readonly DEBUG_MOD_PREFIX: string;
    static diagnosticGcRun(): boolean;
    static dumpHeap(): void;
    static get eventsSummary(): string[];
    static get memoryStatistics(): string;
    static getFormattedSummary(prefix: string): string[];
    static getFullSummary(prefix: string, padding: boolean): string[];
    static isExplicitGcDisabled(): boolean;
    static lastRunGc(): number;
    static logFullSummary(logger: Consumer<string>): void;
    static runExplicitGc(): boolean;
    static tooMuchMemoryUsage(): void;
    static updateLeakSummary(): void;
  }


  class SaveWithLoadedChunks {
    static readonly ATL_CHUNKLOADER: TicketController;
    static loadChunksFromSaveFile(source: CommandSourceStack): number;
    static saveWorld(source: CommandSourceStack): number;
    visitFile(file: Path, attrs: BasicFileAttributes): FileVisitResult;
  }

}

declare module 'dev.uncandango.alltheleaks.feature.common.mods.minecraft.MemoryMonitor' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class DiagnosticGcRun {
    gcRun(): string;
  }


  interface EventStatistics extends Enum<EventStatistics> {}
  class EventStatistics extends Enum<EventStatistics> {
    static readonly CLIENT_LEVEL_UPDATE: EventStatistics;
    static readonly WORLD_JOIN_SINGLEPLAYER: EventStatistics;
    static readonly WORLD_JOIN_MULTIPLAYER: EventStatistics;
    static readonly CLIENT_PLAYER_CLONE: EventStatistics;
    static readonly CLIENT_PLAYER_LOGOUT: EventStatistics;
    static readonly SERVER_PLAYER_CLONE: EventStatistics;
    static readonly SERVER_PLAYER_LOGOUT: EventStatistics;
    static readonly SERVER_STOP: EventStatistics;
    get count(): number;
    increment(): void;
    static valueOf(name: string): EventStatistics;
    static values(): EventStatistics[];
  }


  class Statistics {
    static evaluateMemory(): void;
    static get currentMinMemoryInMb(): number;
    static get maxMemoryInMb(): number;
    static get minMemoryInMb(): number;
    static get stableCount(): number;
    static get stableThreshold(): number;
    static reset(): void;
  }

}

declare module 'dev.uncandango.alltheleaks.fix.client.mods.apotheosis' {
  class FixModifyingStack {
  }

}

declare module 'dev.uncandango.alltheleaks.fix.client.mods.betterf3' {
  class FixDebugScreen {
  }

}

declare module 'dev.uncandango.alltheleaks.fix.client.mods.confluence_magic_lib' {
  class FixItemStackModification {
  }

}

declare module 'dev.uncandango.alltheleaks.fix.client.mods.enderio' {
  class FixModifyingStack {
  }


  class FixModifyingStack2 {
  }

}

declare module 'dev.uncandango.alltheleaks.fix.client.mods.jei' {
  class FixCopyItemStack {
  }

}

declare module 'dev.uncandango.alltheleaks.fix.client.mods.nautec' {
  class FixModifyingStack {
  }

}

declare module 'dev.uncandango.alltheleaks.fix.client.mods.neoforge' {
  class FixSnapshot {
    constructor();
  }


  class FixSnapshotAgain {
  }

}

declare module 'dev.uncandango.alltheleaks.fix.client.mods.railcraft' {
  class FixModifyingStack {
  }

}

declare module 'dev.uncandango.alltheleaks.fix.client.mods.twilightforest' {
  class FixItemstack {
  }

}

declare module 'dev.uncandango.alltheleaks.fix.common.mods.eternal_starlight' {
  class FixLag {
  }

}

declare module 'dev.uncandango.alltheleaks.fix.common.mods.fluxnetworks' {
  class FixTicking {
  }

}

declare module 'dev.uncandango.alltheleaks.fix.common.mods.kubejs' {
  class FixCachedTagLookup {
  }

}

declare module 'dev.uncandango.alltheleaks.fix.common.mods.modernfix' {
  class FixPrototypeExtension {
  }

}

declare module 'dev.uncandango.alltheleaks.fix.common.mods.theurgy_kubejs' {
  class FixRecipeSchema {
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.ars_nouveau' {
  import { VarHandle } from 'java.lang.invoke';

  class UntrackedIssue001 {
    static readonly LAST_HOVERED: VarHandle;
    constructor();
  }


  class UntrackedIssue002 {
    static readonly SLOT_UNDER_MOUSE: VarHandle;
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.athena' {
  class UntrackedIssue001 {
    static isModernFixDynResEnabled(): boolean;
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.badpackets' {
  import { ClientPacketListener } from 'net.minecraft.client.multiplayer';

  class UntrackedIssue001 {
    static clearPacketsFromHandler(listener: ClientPacketListener): void;
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.buildinggadgets2' {
  import { VarHandle } from 'java.lang.invoke';

  class UntrackedIssue001 {
    static readonly FAKE_RENDERING_WORLD: VarHandle;
    static readonly REAL_WORLD: VarHandle;
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.cookingforblockheads' {
  import { VarHandle } from 'java.lang.invoke';

  class UntrackedIssue001 {
    static readonly ENTITY: VarHandle;
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.craftingtweaks' {
  import { VarHandle } from 'java.lang.invoke';

  class UntrackedIssue001 {
    static readonly UNPLEASANT_BUTTON: VarHandle;
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.doggytalents' {
  import { VarHandle } from 'java.lang.invoke';

  class UntrackedIssue001 {
    static readonly INVENTORY_BUTTON: VarHandle;
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.draconicevolution' {
  import { VarHandle } from 'java.lang.invoke';

  class UntrackedIssue001 {
    static readonly RENDER_ENTITY_MAP: VarHandle;
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.emi' {
  import { MethodHandle } from 'java.lang.invoke';

  class UntrackedIssue001 {
    static readonly CLEAR_HISTORY: MethodHandle;
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.emi_loot' {
  class UntrackedIssue001 {
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.entityculling' {
  class Issue168 {
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.entity_model_features' {
  import { VarHandle } from 'java.lang.invoke';

  class UntrackedIssue001 {
    static readonly EMF$HELDITERATION: VarHandle;
    constructor();
  }


  class UntrackedIssue002 {
    static readonly EMF$HELDITERATION: VarHandle;
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.entity_texture_features' {
  import { VarHandle, MethodHandle } from 'java.lang.invoke';

  class UntrackedIssue001 {
    static readonly ETF$HELDENTITY: VarHandle;
    static readonly ETF$ETFPLAYERTEXTURE: VarHandle;
    static readonly ETF_INSTANCE: MethodHandle;
    static readonly PLAYER_TEXTURE_MAP: VarHandle;
    constructor();
  }


  class UntrackedIssue002 {
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.findme' {
  class Issue43 {
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.flywheel' {
  import { AtomicInteger } from 'java.util.concurrent.atomic';

  class UntrackedIssue001 {
    static readonly lastUnloadedLevelHash: AtomicInteger;
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.ftbchunks' {
  import { VarHandle } from 'java.lang.invoke';

  class UntrackedIssue001 {
    static readonly MAP_ICONS: VarHandle;
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.ftblibrary' {
  class UntrackedIssue001 {
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.geckolib' {
  class Issue625 {
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.iceberg' {
  class Issue76 {
    constructor();
  }


  class UntrackedIssue001 {
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.immersiveengineering' {
  class UntrackedIssue001 {
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.irons_spellbooks' {
  class Issue556 {
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.jade' {
  class UntrackedIssue001 {
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.jei' {
  import { VarHandle } from 'java.lang.invoke';

  class UntrackedIssue001 {
    constructor();
  }


  class UntrackedIssue002 {
    constructor();
  }


  class UntrackedIssue003 {
  }


  class UntrackedIssue004 {
    static readonly GRINDSTONE_MENU: VarHandle;
    constructor();
  }


  class UntrackedIssue005 {
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.journeymap' {
  import { MethodHandle } from 'java.lang.invoke';

  class UntrackedIssue001 {
    static clearPlayerFromComparator(): void;
    static clearPlayerFromDTOComparator(): void;
  }


  class UntrackedIssue002 {
    static readonly REMOVE: MethodHandle;
  }


  class UntrackedIssue003 {
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.justdirethings' {
  import { VarHandle } from 'java.lang.invoke';

  class Issue316 {
  }


  class UntrackedIssue001 {
    static readonly MOCK_PLAYER: VarHandle;
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.justenoughprofessions' {
  import { VarHandle } from 'java.lang.invoke';

  class UntrackedIssue001 {
    static readonly CACHED_VILLAGER: VarHandle;
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.lionfishapi' {
  class UntrackedIssue001 {
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.mahoutsukai' {
  class UntrackedIssue001 {
  }


  class UntrackedIssue002 {
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.mekanism' {
  import { MethodHandle } from 'java.lang.invoke';

  class Issue8221 {
    constructor();
  }


  class UntrackedIssue001 {
    static readonly CLEAR_CLIENT_NETWORKS: MethodHandle;
    constructor();
  }


  class UntrackedIssue002 {
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.mffs' {
  import { VarHandle } from 'java.lang.invoke';

  class UntrackedIssue001 {
    static readonly CLIENT_INSTANCE: VarHandle;
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.minecolonies' {
  import { VarHandle, MethodHandle } from 'java.lang.invoke';
  import { Class } from 'java.lang';

  class Issue10302 {
  }


  class UntrackedIssue001 {
    static readonly ENTITY_CACHE: VarHandle;
    static readonly CITIZEN_CACHE: VarHandle;
    constructor();
  }


  class UntrackedIssue002 {
    static readonly eventHandlersPerType: VarHandle;
    static readonly getEventBus: MethodHandle;
    static readonly customRecipesReloadEventClass: Class;
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.minecraft' {
  class UntrackedIssue001 {
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.mousetweaks' {
  class UntrackedIssue001 {
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.neoforge' {
  class UntrackedIssue001 {
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.oritech' {
  class UntrackedIssue001 {
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.pneumaticcraft' {
  import { MethodHandle, VarHandle } from 'java.lang.invoke';

  class Issue1334 {
  }


  class Issue1335 {
  }


  class UntrackedIssue001 {
    static readonly CLEAR_REMOTE_PLAYER: MethodHandle;
    static readonly CLIENT_HANDLER: VarHandle;
    static readonly PLAYER_HANDLERS: VarHandle;
    constructor();
  }


  class UntrackedIssue002 {
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.rainbows' {
  class UntrackedIssue001 {
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.relics' {
  import { VarHandle } from 'java.lang.invoke';

  class UntrackedIssue001 {
    static readonly SLOT: VarHandle;
    static readonly TICKS_COUNT_OLD: VarHandle;
    static readonly TICKS_COUNT: VarHandle;
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.reliquary' {
  import { VarHandle } from 'java.lang.invoke';

  class UntrackedIssue001 {
    static readonly CONTEXT: VarHandle;
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.rep_ae2_bridge' {
  import { VarHandle } from 'java.lang.invoke';

  class Issue25 {
    static readonly ACTIVE_BRIDGES: VarHandle;
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.sereneseasons' {
  import { UpdateableLevel } from 'dev.uncandango.alltheleaks.mixin';
  import { VarHandle } from 'java.lang.invoke';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';

  interface UntrackedIssue001 extends UpdateableLevel<UntrackedIssue001> {}
  class UntrackedIssue001 extends UpdateableLevel<UntrackedIssue001> {
    static readonly renderSnowAndRain_level: VarHandle;
    static INSTANCE: UntrackedIssue001;
    constructor();
    atl$onClientLevelUpdated(level: ClientLevel): void;
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.smithingtemplateviewer' {
  class Issue2 {
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.sophisticatedcore' {
  import { VarHandle } from 'java.lang.invoke';

  class UntrackedIssue001 {
    static readonly CACHE: VarHandle;
    constructor();
  }


  class UntrackedIssue002 {
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.transfer_labels' {
  class Issue7 {
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.trophymanager' {
  import { VarHandle } from 'java.lang.invoke';

  class UntrackedIssue001 {
    static readonly CACHED_ENTITIES: VarHandle;
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.client.mods.watut' {
  class UntrackedIssue001 {
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.accessories_compat_layer' {
  class UntrackedIssue001 {
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.additionalentityattributes' {
  class UntrackedIssue001 {
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.ars_affinity' {
  import { VarHandle } from 'java.lang.invoke';

  class Issue40 {
    static readonly PLAYER_DATA_CACHE: VarHandle;
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.ars_nouveau' {
  class Issue1931 {
    constructor();
  }


  class UntrackedIssue001 {
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.badpackets' {
  import { VarHandle } from 'java.lang.invoke';

  class UntrackedIssue001 {
    static readonly HANDLERS: VarHandle;
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.cclayer' {
  class UntrackedIssue001 {
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.connectivity' {
  import { VarHandle } from 'java.lang.invoke';

  class UntrackedIssue001 {
    static readonly MINUTEDATA: VarHandle;
    static readonly RECORDINGDURATION: VarHandle;
    static readonly CONNECTIONPACKETDATA: VarHandle;
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.curios' {
  class Issue22 {
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.enderstorage' {
  import { VarHandle } from 'java.lang.invoke';

  class UntrackedIssue001 {
    static readonly PLAYER_ITEM_TANK_STATES: VarHandle;
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.evilcraft' {
  class Issue1051 {
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.ftbquests' {
  class UntrackedIssue001 {
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.geckolib' {
  class UntrackedIssue001 {
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.geneticsresequenced' {
  class UntrackedIssue001 {
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.industrialforegoing' {
  class UntrackedIssue001 {
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.irregular_implements' {
  class Issue45 {
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.journeymap' {
  class Issue774 {
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.justdirethings' {
  class UntrackedIssue001 {
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.kubejs' {
  class UntrackedIssue001 {
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.lootr' {
  class Issue464 {
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.malum' {
  class Issue413 {
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.minecraft' {
  class UntrackedIssue001 {
  }


  class UntrackedIssue002 {
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.neoforge' {
  import { VarHandle, MethodHandle } from 'java.lang.invoke';
  import { Map } from 'java.util';

  class Issue1486 {
    static readonly LISTENER_LIST: VarHandle;
    static readonly REBUILD: VarHandle;
    static readonly GET_READ_MAP: MethodHandle;
    constructor();
  }


  class Issue1487 {
    static readonly atl$fakeAdvancements: Map;
    constructor();
  }


  class Issue289 {
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.octolib' {
  class UntrackedIssue001 {
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.pneumaticcraft' {
  class Issue1336 {
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.railcraft' {
  class Issue241 {
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.sereneseasons' {
  class UntrackedIssue001 {
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.sfm' {
  class UntrackedIssue001 {
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.supplementaries' {
  import { MethodHandle } from 'java.lang.invoke';

  class UntrackedIssue001 {
    constructor();
  }


  class UntrackedIssue002 {
    static readonly CLEAR_CACHE: MethodHandle;
    constructor();
  }


  class UntrackedIssue003 {
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.travelersbackpack' {
  class UntrackedIssue001 {
  }

}

declare module 'dev.uncandango.alltheleaks.leaks.common.mods.xycraft_core' {
  import { VarHandle } from 'java.lang.invoke';

  class UntrackedIssue001 {
    static readonly FAKE_PLAYERS: VarHandle;
    constructor();
  }

}

declare module 'dev.uncandango.alltheleaks.leaks' {
  import { Set, List } from 'java.util';
  import { Supplier } from 'java.util.function';
  import { Boolean } from 'java.lang';

  class IssueManager {
    static generateCondition(modId: string, versionRange: string, annotatedClass: string, extraModDep: string[], extraModDepVersions: string[]): Supplier<boolean>;
    static get allowedMixins(): Set<string>;
    static get mixinToCancel(): Set<string>;
    static initiateIssues(): void;
  }

}

declare module 'dev.uncandango.alltheleaks.mixin.core.debug.accessor' {
  import { ServerLevel, ChunkMap } from 'net.minecraft.server.level';
  import { ArrayList } from 'java.util';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';

  class ChunkMapAccessor {
    atl$getServerLevel(): ServerLevel;
  }


  class ChunkMapDistanceManagerAccessor {
    atl$getChunkMap(): ChunkMap;
  }


  class LevelAccessor {
    atl$getFreshBlockEntities(): ArrayList<BlockEntity>;
  }

}

declare module 'dev.uncandango.alltheleaks.mixin.core.debug' {
  import { ChunkStorage, RegionStorageInfo } from 'net.minecraft.world.level.chunk.storage';
  import { PlayerProvider } from 'ChunkHolder';
  import { GeneratingChunkMap } from 'net.minecraft.server.level';
  import { Path } from 'java.nio.file';
  import { DataFixer } from 'com.mojang.datafixers';
  import { ChunkAccess, UpgradeData, LevelChunkSection } from 'net.minecraft.world.level.chunk';
  import { ChunkPos, LevelHeightAccessor } from 'net.minecraft.world.level';
  import { Registry } from 'net.minecraft.core';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { BlendingData } from 'net.minecraft.world.level.levelgen.blending';
  import { TicketExtension } from 'dev.uncandango.alltheleaks.mixin';

  interface ChunkMapMixin extends PlayerProvider, GeneratingChunkMap, ChunkStorage {}
  class ChunkMapMixin extends PlayerProvider {
    constructor(info: RegionStorageInfo, folder: Path, fixerUpper: DataFixer, sync: boolean);
  }


  class ChunkStatusTasksMixin {
  }


  class DistanceManagerMixin {
  }


  interface LevelChunkMixin extends ChunkAccess {}
  class LevelChunkMixin extends ChunkAccess {
    constructor(chunkPos: ChunkPos, upgradeData: UpgradeData, levelHeightAccessor: LevelHeightAccessor, biomeRegistry: Registry<Biome>, inhabitedTime: number, sections: LevelChunkSection[], blendingData: BlendingData);
  }


  class LevelMixin {
  }


  class ServerLevelMixin {
  }


  interface TicketMixin<T = any> extends TicketExtension<T> {}
  class TicketMixin<T = any> extends TicketExtension<T> {
    atl$getKey(): T;
  }


  class TicketOwnerMixin<T extends Comparable<T> = any> {
    toString(): string;
  }

}

declare module 'dev.uncandango.alltheleaks.mixin.core.main.accessor' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { MapCodec, Codec } from 'com.mojang.serialization';
  import { IBookmark } from 'mezz.jei.gui.bookmarks';
  import { Map, Optional, UUID, Set } from 'java.util';
  import { ServerLevel, ServerPlayer } from 'net.minecraft.server.level';
  import { ChargeNetworkImpl } from 'mods.railcraft.charge';
  import { ThreadLocal } from 'java.lang';
  import { Context } from 'dev.latvian.mods.rhino';
  import { Entity } from 'net.minecraft.world.entity';
  import { Horse } from 'net.minecraft.world.entity.animal.horse';
  import { ArmorStand } from 'net.minecraft.world.entity.decoration';
  import { Wolf } from 'net.minecraft.world.entity.animal';
  import { Player } from 'net.minecraft.world.entity.player';
  import { HolderOwner } from 'net.minecraft.core';
  import { MinecraftServer, PlayerAdvancements } from 'net.minecraft.server';
  import { DataComponentMap, DataComponentType } from 'net.minecraft.core.component';
  import { Reference2ObjectMap } from 'it.unimi.dsi.fastutil.objects';
  import { ServerStatsCounter } from 'net.minecraft.stats';
  import { AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { IIngredientType, ITypedIngredient } from 'mezz.jei.api.ingredients';

  class BaseScreenAccessor {
    atl$setPrevScreen(var1: Screen): void;
  }


  class BookmarkJsonConfigAccessor {
    static atl$setBookmarkCodec(bookmarkCodec: MapCodec<IBookmark>): void;
  }


  class ChargeProviderImplAccessor {
    get networks(): Map<ServerLevel, ChargeNetworkImpl>;
  }


  class ContextFactoryAccessor {
    get currentContext(): ThreadLocal<Context>;
  }


  class CustomItemRendererAccessor {
    static setArmorStand(armorStand: ArmorStand): void;
    static setEntity(entity: Entity): void;
    static setHorse(horse: Horse): void;
    static setWolf(wolf: Wolf): void;
  }


  class EntityComparatorAccessor {
    atl$getPlayer(): Player;
    atl$setPlayer(var1: Player): void;
  }


  class HolderReferenceAccessor<T = any> {
    atl$getOwner(): HolderOwner<T>;
  }


  class JourneymapAccessor {
    atl$setServer(var1: MinecraftServer): void;
  }


  class LookupHistoryJsonConfigAccessor {
    static atl$setBookmarkCodec(bookmarkCodec: MapCodec<IBookmark>): void;
  }


  class PatchedDataComponentMapAccessor {
    atl$getPatch(): Reference2ObjectMap<DataComponentType<any>, Optional<any>>;
    atl$getPrototype(): DataComponentMap;
  }


  class PlayerAdvancementsAccessor {
    get player(): ServerPlayer;
  }


  class PlayerListAccessor {
    atl$getAdvancements(): Map<UUID, PlayerAdvancements>;
    atl$getStats(): Map<UUID, ServerStatsCounter>;
  }


  class RecipeTransferManagerAccessor {
    get unsupportedContainers(): Set<AbstractContainerMenu>;
  }


  class TypedIngredientCodecsAccessor {
    static atl$getCodecMapCache(): Map<IIngredientType<any>, Codec<ITypedIngredient<any>>>;
    static atl$setIngredientCodec(ingredientCodec: MapCodec<any>): void;
    static atl$setIngredientTypeCodec(ingredientTypeCodec: Codec<any>): void;
  }

}

declare module 'dev.uncandango.alltheleaks.mixin.core.main' {
  import { Function, Consumer } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List, Map, HashMap } from 'java.util';
  import { LoadedJson } from 'BlockStateModelLoader';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BlockPos, Holder } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockEntity, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { ItemStack } from 'net.minecraft.world.item';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Trackable, EventKey, UpdateableLevel, EntityEmiStackFactory, InnerLockable, Lockable, UpdateableServerPlayer, UpdateablePlayer, ServerScriptManagerExtension } from 'dev.uncandango.alltheleaks.mixin';
  import { Class } from 'java.lang';
  import { OnDeathCallback, OnDropCallback } from 'io.wispforest.accessories.api.events';
  import { DropRule } from 'io.wispforest.accessories.api';
  import { SlotReference } from 'io.wispforest.accessories.api.slot';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { EntityEmiStack } from 'fzzyhmstrs.emi_loot.util';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { EntityEmiStack as stepsword_mahoutsukai_integration_emi_EntityEmiStack } from 'stepsword.mahoutsukai.integration.emi';
  import { EntityFactory } from 'EntityType';
  import { Entity } from 'net.minecraft.world.entity';
  import { GenericRecipe } from 'com.minecolonies.api.crafting';
  import { AnimationState } from 'software.bernie.geckolib.animation';
  import { GeoAnimatable } from 'software.bernie.geckolib.animatable';
  import { AbstractClientPlayer, LocalPlayer } from 'net.minecraft.client.player';
  import { JobBasedRecipeCategory } from 'com.minecolonies.core.compatibility.jei';
  import { CommandLootr } from 'noobanidus.mods.lootr.common.command';
  import { ManualElementMultiblock } from 'blusunrize.immersiveengineering.client.manual';
  import { IModPlugin } from 'mezz.jei.api';
  import { ModelAnimator } from 'com.github.L_Ender.lionfishapi.client.model.Animations';
  import { IAnimatedEntity } from 'com.github.L_Ender.lionfishapi.server.animation';
  import { SparkPlugin } from 'me.lucko.spark.common';
  import { ClassSourceLookup } from 'me.lucko.spark.common.sampler.source';
  import { BaseMachineBE } from 'com.direwolf20.justdirethings.common.blockentities.basebe';
  import { PlayerAccessorBE } from 'com.direwolf20.justdirethings.common.blockentities';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { AbstractAirHandlingBlockEntity } from 'me.desht.pneumaticcraft.common.block.entity';
  import { PressureTier } from 'me.desht.pneumaticcraft.api.pressure';
  import { TextureSheetParticle } from 'net.minecraft.client.particle';
  import { RecipeComponent } from 'dev.latvian.mods.kubejs.recipe.component';
  import { Key, Value } from 'RecipeComponentBuilder';
  import { Context } from 'dev.latvian.mods.rhino';
  import { KubeRecipe } from 'dev.latvian.mods.kubejs.recipe';
  import { RecipeTransferButton } from 'mezz.jei.gui.recipes';
  import { AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { IngredientWithCount } from 'com.portingdeadmods.nautec.content.recipes.utils';
  import { RefineryRenderer } from 'rearth.oritech.client.renderers';
  import { ScriptManager, ScriptType } from 'dev.latvian.mods.kubejs.script';
  import { SmithingTrimWrapper } from 'com.buuz135.smithingtemplateviewer';

  class AerialInterfaceBlockEntityMixin {
  }


  class AmountIngredientMixin {
  }


  class AreaRenderManagerMixin {
  }


  class AthenaResourceLoaderMixin {
    setGetter(var1: Function<ResourceLocation, LoadedJson[]>): void;
  }


  class ATLBlockMixin {
    additionalEntityAttributes$saveBreakingPlayer(level: Level, player: Player, pos: BlockPos, state: BlockState, blockEntity: BlockEntity, stack: ItemStack, callbackInfo: CallbackInfo): void;
  }


  class BlockBehaviorMixinSquared {
  }


  class CachedTagLookupMixin<T = any> {
  }


  class CasterTomeRegistryMixin {
  }


  interface ChatDetectorBlockEntityMixin extends BlockEntity {}
  class ChatDetectorBlockEntityMixin extends BlockEntity {
    constructor(type: BlockEntityType<any>, pos: BlockPos, blockState: BlockState);
    onChunkUnloaded(): void;
  }


  interface ChunkAccessMixin extends Trackable {}
  class ChunkAccessMixin extends Trackable {
    atl$getBaseClass(): Class<any>;
  }


  class ClarentEmiRecipeMixin {
  }


  class ClientPacketListenerMixin {
  }


  class ClientPacketListenerMixin2 {
  }


  class ClientPayloadHandlerMixin {
  }


  class CullTaskMixin {
  }


  class CuriosEventHandlerMixin {
  }


  interface DeathWrapperEventsImplMixin extends OnDeathCallback, OnDropCallback {}
  class DeathWrapperEventsImplMixin extends OnDeathCallback {
    onDrop(dropRule: DropRule, stack: ItemStack, reference: SlotReference, damageSource: DamageSource): DropRule;
  }


  interface DeathWrapperEventsImplMixin2 extends OnDeathCallback, OnDropCallback {}
  class DeathWrapperEventsImplMixin2 extends OnDeathCallback {
  }


  class DebugScreenOverlayMixin {
  }


  class DefaultRecipeWrapperMixin {
  }


  interface DroneEntityMixin extends EventKey {}
  class DroneEntityMixin extends EventKey {
    atl$getKeyMap(): Map<string, Consumer<any>>;
  }


  interface EmiLootEntityEmiStackMixin extends UpdateableLevel<EntityEmiStack> {}
  class EmiLootEntityEmiStackMixin extends UpdateableLevel<EntityEmiStack> {
    atl$onClientLevelUpdated(level: ClientLevel): void;
  }


  interface EntityEmiStackMixin extends UpdateableLevel<stepsword_mahoutsukai_integration_emi_EntityEmiStack>, EntityEmiStackFactory {}
  class EntityEmiStackMixin extends UpdateableLevel<stepsword_mahoutsukai_integration_emi_EntityEmiStack> {
    loc: ResourceLocation;
    atl$onClientLevelUpdated(level: ClientLevel): void;
    atl$withFactory(factory: EntityFactory<Entity>): stepsword_mahoutsukai_integration_emi_EntityEmiStack;
  }


  class EntityHelperMixin {
  }


  class EntityTickListMixin {
  }


  class ESBookUtilMixin {
  }


  class ExanimateEssenceRepairExtensionMixin {
  }


  class FakePlayerFactoryMixin {
  }


  class FakePlayerMixin {
  }


  class FTBQuestsEventHandlerMixin {
  }


  interface GenericRecipeMixin extends UpdateableLevel<GenericRecipe> {}
  class GenericRecipeMixin extends UpdateableLevel<GenericRecipe> {
    atl$onClientLevelUpdated(level: ClientLevel): void;
  }


  class GeoArmorRendererMixin {
  }


  class GeoModelMixin {
    applyMolangQueries<T extends GeoAnimatable>(animationState: AnimationState<T>, animTime: number): void;
  }


  interface GlobalChatDetectorBlockEntityMixin extends BlockEntity {}
  class GlobalChatDetectorBlockEntityMixin extends BlockEntity {
    constructor(type: BlockEntityType<any>, pos: BlockPos, blockState: BlockState);
    onChunkUnloaded(): void;
  }


  class GlodiumHelpersMixin {
  }


  interface HolderReferenceMixin<T = any> extends Holder<T> {}
  class HolderReferenceMixin<T = any> extends Holder<T> {
  }


  class ImageSetMixin {
  }


  interface IngredientLockMixin extends InnerLockable {}
  class IngredientLockMixin extends InnerLockable {
    atl$isInnerLocked(): boolean;
    atl$isLocked(): boolean;
    atl$setInnerLocked(locked: boolean): void;
    atl$setLocked(locked: boolean): void;
  }


  class IngredientMixin {
  }


  class IngredientValueDeduplicatorMixin {
  }


  class InventoryHolderBERMixin {
    static mockPlayer: AbstractClientPlayer;
  }


  interface ItemStackLockMixin extends Lockable {}
  class ItemStackLockMixin extends Lockable {
    atl$isLocked(): boolean;
    atl$setLocked(locked: boolean): void;
  }


  interface JobBasedRecipeCategoryMixin extends UpdateableLevel<JobBasedRecipeCategory> {}
  class JobBasedRecipeCategoryMixin extends UpdateableLevel<JobBasedRecipeCategory> {
    atl$onClientLevelUpdated(level: ClientLevel): void;
  }


  interface LazyItemRendererMixin extends UpdateableLevel {}
  class LazyItemRendererMixin extends UpdateableLevel {
    atl$onClientLevelUpdated(level: ClientLevel): void;
  }


  class LevelAttachedMixin<T = any> {
  }


  interface LevelMixin extends Trackable {}
  class LevelMixin extends Trackable {
    atl$getBaseClass(): Class<any>;
  }


  class LootrMixin {
    COMMAND_LOOTR: CommandLootr;
  }


  interface ManualElementMultiblockMixin extends UpdateableLevel<ManualElementMultiblock> {}
  class ManualElementMultiblockMixin extends UpdateableLevel<ManualElementMultiblock> {
    atl$onClientLevelUpdated(level: ClientLevel): void;
  }


  interface MineColoniesJEIPluginMixin extends IModPlugin {}
  class MineColoniesJEIPluginMixin extends IModPlugin {
  }


  class MinecraftMixin {
  }


  class MinecraftMixin2 {
    level: ClientLevel;
  }


  interface MinecraftServerMixin extends Trackable {}
  class MinecraftServerMixin extends Trackable {
    atl$getBaseClass(): Class<any>;
  }


  class MobIconCacheMixin {
  }


  interface ModelAnimatorMixin extends UpdateableLevel<ModelAnimator> {}
  class ModelAnimatorMixin extends UpdateableLevel<ModelAnimator> {
    atl$onClientLevelUpdated(level: ClientLevel): void;
    update(var1: IAnimatedEntity): void;
  }


  interface ModernFixSparkPluginMixin extends SparkPlugin {}
  class ModernFixSparkPluginMixin extends SparkPlugin {
    createClassSourceLookup(): ClassSourceLookup;
  }


  class NativeImageMixin {
    toString(): string;
  }


  class NeoForgeEventHandlerMixin {
  }


  class OctoRenderManagerMixin {
  }


  interface PlayerAccessorBEMixin extends UpdateableServerPlayer<PlayerAccessorBE>, BaseMachineBE {}
  class PlayerAccessorBEMixin extends UpdateableServerPlayer<PlayerAccessorBE> {
    serverPlayer: ServerPlayer;
    playerHandlers: HashMap;
    constructor(pType: BlockEntityType<any>, pPos: BlockPos, pBlockState: BlockState);
    atl$onServerPlayerUpdated(player: ServerPlayer): void;
    onLoad(): void;
  }


  class PlayerListMixin {
  }


  interface PlayerMixin extends Trackable {}
  class PlayerMixin extends Trackable {
    atl$getBaseClass(): Class<any>;
  }


  class PotionCharmExtensionMixin {
  }


  interface ProgrammableControllerBlockEntityMixin extends AbstractAirHandlingBlockEntity {}
  class ProgrammableControllerBlockEntityMixin extends AbstractAirHandlingBlockEntity {
    constructor(type: BlockEntityType<any>, pos: BlockPos, state: BlockState, pressureTier: PressureTier, volume: number, upgradeSlots: number);
  }


  class ProjectorRenderMixin {
  }


  interface RainbowsRendererParticleMixin extends TextureSheetParticle {}
  class RainbowsRendererParticleMixin extends TextureSheetParticle {
    player: Player;
  }


  interface RecipeComponentBuilderMixin extends RecipeComponent<Map> {}
  class RecipeComponentBuilderMixin extends RecipeComponent<Map> {
    wrap(cx: Context, recipe: KubeRecipe, from: any): Map<Key, Value>;
  }


  interface RecipeTransferButtonMixin extends UpdateablePlayer<RecipeTransferButton> {}
  class RecipeTransferButtonMixin extends UpdateablePlayer<RecipeTransferButton> {
    atl$onClientPlayerUpdated(player: LocalPlayer): void;
    update(var1: AbstractContainerMenu, var2: Player): void;
  }


  class RecipeUtilsMixin {
    static iWCToIngredientSaveCount(ingredientWithCount: IngredientWithCount): Ingredient;
  }


  interface RefineryRendererMixin<T = any> extends UpdateableLevel<RefineryRenderer> {}
  class RefineryRendererMixin<T = any> extends UpdateableLevel<RefineryRenderer> {
    atl$onClientLevelUpdated(level: ClientLevel): void;
  }


  class RegistryComponentMixin<T = any> {
  }


  class RegistryManagerMixin {
  }


  class SavedDataMixin {
  }


  class SearchOptionsMixin {
  }


  class ServerFluxNetworkMixin {
  }


  class ServerPlayerMixin {
  }


  interface ServerScriptManagerMixin extends ServerScriptManagerExtension, ScriptManager {}
  class ServerScriptManagerMixin extends ServerScriptManagerExtension {
    constructor(t: ScriptType);
    clearContext(): void;
  }


  class ShapedEntityStorageCategoryExtensionMixin {
  }


  class SingletonGeoAnimatableMixin {
  }


  class SmithingCategoryExtensionMixin {
  }


  interface SmithingTrimWrapperMixin extends UpdateableLevel<SmithingTrimWrapper> {}
  class SmithingTrimWrapperMixin extends UpdateableLevel<SmithingTrimWrapper> {
    atl$onClientLevelUpdated(level: ClientLevel): void;
    updateArmorStand(): void;
  }


  class SpellSelectionManagerMixin {
  }


  class TheurgyRecipeSchemaMixin {
  }


  class WrappedEnchanterRecipeMixin {
  }

}

declare module 'dev.uncandango.alltheleaks.mixin.core.main.IngredientMixin' {
  import { ItemStack } from 'net.minecraft.world.item';

  class IngredientAccessor {
    setItemStacks(var1: ItemStack[]): void;
  }

}

declare module 'dev.uncandango.alltheleaks.mixin.core.main.RecipeComponentBuilderMixin' {
  class MapCodecMixin {
  }


  class ValueMixin {
  }

}

declare module 'dev.uncandango.alltheleaks.mixin.core.plugin' {
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { Set, List } from 'java.util';
  import { ClassNode } from 'org.objectweb.asm.tree';
  import { RecordedEvent } from 'jdk.jfr.consumer';

  interface ATLMixinPlugin extends IMixinConfigPlugin {}
  class ATLMixinPlugin extends IMixinConfigPlugin {
    acceptTargets(myTargets: Set<string>, otherTargets: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    onLoad(mixinPackage: string): void;
    postApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    preApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    shouldApplyMixin(targetClassName: string, mixinClassName: string): boolean;
  }


  class DebugThreadsStuck {
    static isDebugEnabled(): boolean;
    static logThreadEnded(event: RecordedEvent): void;
    static logThreadStarted(event: RecordedEvent): void;
    static start(): void;
  }

}

declare module 'dev.uncandango.alltheleaks.mixin' {
  import { EntityEmiStack } from 'stepsword.mahoutsukai.integration.emi';
  import { EntityFactory } from 'EntityType';
  import { Entity } from 'net.minecraft.world.entity';
  import { Map, IdentityHashMap, List } from 'java.util';
  import { Consumer } from 'java.util.function';
  import { Clone } from 'PlayerEvent';
  import { ChunkPos } from 'net.minecraft.world.level';
  import { Strategy } from 'Hash';
  import { ReentrantLock } from 'java.util.concurrent.locks';
  import { WeakReference } from 'java.lang.ref';
  import { ObjectOpenCustomHashSet } from 'it.unimi.dsi.fastutil.objects';
  import { Class } from 'java.lang';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { HashMultimap } from 'com.google.common.collect';
  import { LocalPlayer } from 'net.minecraft.client.player';
  import { ServerPlayer } from 'net.minecraft.server.level';

  class EntityEmiStackFactory {
    atl$withFactory(var1: EntityFactory<Entity>): EntityEmiStack;
  }


  class EventKey {
    atl$getKeyMap(): Map<string, Consumer<any>>;
  }


  interface InnerLockable extends Lockable {}
  class InnerLockable extends Lockable {
    atl$isInnerLocked(): boolean;
    atl$isLocked(): boolean;
    atl$setInnerLocked(var1: boolean): void;
    atl$setLocked(var1: boolean): void;
  }


  class Lockable {
    atl$isLocked(): boolean;
    atl$setLocked(var1: boolean): void;
  }


  class OnCloneEvent {
    atl$onCloneEvent(var1: Clone): void;
  }


  class ServerScriptManagerExtension {
    clearContext(): void;
  }


  class TicketExtension<T = any> {
    atl$getKey(): T;
    atl$isTouching(chunkpos: ChunkPos, range: number): boolean;
  }


  class Trackable {
    static readonly TRACKABLE_MAP: IdentityHashMap;
    static readonly WEAK_REFERENCE_STRATEGY: Strategy;
    static readonly LOCK: ReentrantLock;
    atl$getBaseClass(): Class<any>;
    static clearNullReferences(): void;
    static createWeakRefBasedSet(): ObjectOpenCustomHashSet<WeakReference<Trackable>>;
    static getSummary(): Map<Class<any>, Map<Class<any>, Long>>;
    startTracking(): void;
    static startTracking(o: any): void;
    wrap(): WeakReference<Trackable>;
  }


  class UpdateableLevel<T = any> {
    static readonly INSTANCES: List;
    atl$onClientLevelUpdated(var1: ClientLevel): void;
    static register<O extends UpdateableLevel<any>>(object: O): void;
  }


  class UpdateablePlayer<T = any> {
    static readonly INSTANCES: HashMultimap;
    atl$onClientPlayerUpdated(var1: LocalPlayer): void;
    static register<O extends UpdateablePlayer<any>>(object: O): void;
  }


  class UpdateableServerPlayer<T = any> {
    static readonly INSTANCES: List;
    atl$onServerPlayerUpdated(var1: ServerPlayer): void;
    static register<O extends UpdateableServerPlayer<any>>(object: O): void;
  }

}

declare module 'dev.uncandango.alltheleaks.mixin.UpdateableLevel' {
  import { Event } from 'net.neoforged.bus.api';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';

  class Manager {
    static onLevelLoad(event: RenderEnginesUpdated): void;
  }


  interface RenderEnginesUpdated extends Event {}
  class RenderEnginesUpdated extends Event {
    constructor(level: ClientLevel);
    get level(): ClientLevel;
  }

}

declare module 'dev.uncandango.alltheleaks.mixin.UpdateablePlayer' {
  import { Clone } from 'ClientPlayerNetworkEvent';

  class Manager {
    static onClientClone(event: Clone): void;
  }

}

declare module 'dev.uncandango.alltheleaks.mixin.UpdateableServerPlayer' {
  import { Clone } from 'PlayerEvent';

  class Manager {
    static onPlayerClone(event: Clone): void;
  }

}

declare module 'dev.uncandango.alltheleaks.mixinsq' {
  import { MixinAnnotationAdjuster, MixinCanceller } from 'com.bawnorton.mixinsquared.api';
  import { AdjustableAnnotationNode } from 'com.bawnorton.mixinsquared.adjuster.tools';
  import { List } from 'java.util';
  import { MethodNode } from 'org.objectweb.asm.tree';
  import { Lazy } from 'net.neoforged.neoforge.common.util';

  interface ATLMixinAdjuster extends MixinAnnotationAdjuster {}
  class ATLMixinAdjuster extends MixinAnnotationAdjuster {
    adjust(targetClassNames: string[], mixinClassName: string, handlerNode: MethodNode, annotationNode: AdjustableAnnotationNode): AdjustableAnnotationNode;
  }


  interface ATLMixinCanceller extends MixinCanceller {}
  class ATLMixinCanceller extends MixinCanceller {
    static readonly cancelList: Lazy;
    shouldCancel(targetClassNames: string[], mixinClassName: string): boolean;
  }

}

declare module 'dev.uncandango.alltheleaks.plugins' {
  import { IModPlugin } from 'mezz.jei.api';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface ATLJeiPlugin extends IModPlugin {}
  class ATLJeiPlugin extends IModPlugin {
    get pluginUid(): ResourceLocation;
    onRuntimeUnavailable(): void;
  }

}

declare module 'dev.uncandango.alltheleaks.plugins.ATLJeiPlugin' {
  import { Event } from 'net.neoforged.bus.api';

  interface RuntimeUnavailableEvent extends Event {}
  class RuntimeUnavailableEvent extends Event {
  }

}

declare module 'dev.uncandango.alltheleaks.report' {
  import { Runnable } from 'java.lang';

  class ReportManager {
    static get currentTick(): number;
    static isRegistered(name: string): boolean;
    static registerTask(name: string, tickInterval: number, task: Runnable): void;
    static stop(name: string): void;
    static tick(): void;
  }

}

declare module 'dev.uncandango.alltheleaks.report.ReportManager' {
  import { Runnable } from 'java.lang';

  class ReportTask {
    constructor(name: string, tickInterval: number, task: Runnable);
    stop(): void;
  }

}

declare module 'dev.uncandango.alltheleaks.utils' {
  import { MethodNode, ClassNode } from 'org.objectweb.asm.tree';
  import { Lookup } from 'MethodHandles';
  import { Map } from 'java.util';
  import { VarHandle, MethodHandle, MethodType } from 'java.lang.invoke';
  import { Class } from 'java.lang';
  import { Constructor } from 'java.lang.reflect';

  class MemoryStats {
    static readonly ENABLED: boolean;
    static lastUpdateTime: number;
    static memoryString: string;
    static get memoryWorkingSetSize(): string;
  }


  class MethodNodeDebug {
    static printNormalizedInstructions(method: MethodNode): void;
  }


  class MethodNodeHasher {
    static hash(method: MethodNode): number;
    static hash(classNode: ClassNode, methodDesc: string): number;
  }


  class ReflectionHelper {
    static readonly LOOKUP: Lookup;
    static readonly PRIVATE_LOOKUP: Map;
    static getClass(className: string): Class<any>;
    static getFieldFromClass(clazz: Class<any>, fieldName: string, fieldClass: Class<any>, isStatic: boolean): VarHandle;
    static getFieldValue(handle: VarHandle): any;
    static getMethodFromClass(clazz: Class<any>, methodName: string, methodType: MethodType, isStatic: boolean): MethodHandle;
    static getPrivateClass(parent: Class<any>, subclass: string): Class<any>;
    static getRecordCtor(clazz: Class<any>): Constructor<any>;
    static safeLookup(clazz: Class<any>): Lookup;
  }

}