declare module 'journeymap.common.accessors' {
  import { List } from 'java.util';
  import { Renderable } from 'net.minecraft.client.gui.components';

  class ScreenAccess {
    get renderables(): Renderable[];
  }

}

declare module 'journeymap.common.codecs' {
  import { Codec } from 'com.mojang.serialization';
  import { TreeSet } from 'java.util';
  import { Class } from 'java.lang';

  class MiscCodecs {
    static toSubclass<R, T extends R>(codec: Codec<T>, subclass: Class<T>): Codec<R>;
    static treeSetCodec<T>(codec: Codec<T>): Codec<TreeSet<T>>;
  }


  class WaypointCodecs {
    static LEGACY_WAYPOINT_CODEC: Codec;
    static V1_WAYPOINT_CODEC: Codec;
    static readonly WAYPOINT_CODEC: Codec;
  }


  class WaypointGroupCodecs {
    static V1_WAYPOINT_GROUP_CODEC: Codec;
  }

}

declare module 'journeymap.common.command' {
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack } from 'net.minecraft.commands';

  class CreateWaypoint {
    static register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }

}

declare module 'journeymap.common' {
  import { Pattern } from 'java.util.regex';
  import { Entity } from 'net.minecraft.world.entity';
  import { PreLaunchEntrypoint } from 'net.fabricmc.loader.api.entrypoint';
  import { Version } from 'journeymap.common.version';
  import { Logger } from 'org.apache.logging.log4j';
  import { MinecraftServer } from 'net.minecraft.server';
  import { AdminConfig } from 'journeymap.common.config';
  import { NetworkDispatcher } from 'journeymap.common.network.dispatch';
  import { PacketHandler } from 'journeymap.common.network.handler';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { FMLCommonSetupEvent } from 'net.neoforged.fml.event.lifecycle';
  import { Loading } from 'ModConfigEvent';
  import { ServerStartingEvent, ServerStoppedEvent } from 'net.neoforged.neoforge.event.server';

  class CommonConstants {
    static readonly JOURNEYMAP_DIR: string;
    static readonly LEGAL_CHARS: Pattern;
    static readonly PATTERN_WITH_UNICODE: Pattern;
    static readonly CSS_SAFE_PATTERN: Pattern;
    static debugOverride(sender: Entity): boolean;
    static get serverConfigDir(): string;
    static getCSSSafeString(string: string, replacement: string): string;
    static getSafeString(string: string, replacement: string): string;
    static isDev(sender: Entity): boolean;
  }


  interface FabricError extends PreLaunchEntrypoint {}
  class FabricError extends PreLaunchEntrypoint {
    onPreLaunch(): void;
  }


  class JM {
    static MOD_ID: string;
    static SHORT_MOD_NAME: string;
    static DISCORD_URL: string;
    static DOWNLOAD_URL: string;
    static VERSION_URL: string;
    static WEBSITE_URL: string;
    static readonly WEB_MAP_CURSEFORGE_DOWNLOAD_URL: string;
    static readonly WEB_MAP_MODRINTH_DOWNLOAD_URL: string;
    static MC_VERSION: string;
    static LOADER_VERSION: string;
    static LOADER_NAME: string;
    static VERSION_MAJOR: string;
    static VERSION_MINOR: string;
    static VERSION_MICRO: string;
    static VERSION_PATCH: string;
    static readonly WEBMAP_URL: string;
  }


  class Journeymap {
    static readonly MINIMUM_SERVER_ACCEPTABLE_VERSION: Version;
    static readonly MINIMUM_CLIENT_ACCEPTABLE_VERSION: Version;
    static readonly DEV_VERSION: Version;
    static readonly JM_VERSION: Version;
    static readonly MOD_ID: string;
    static readonly SHORT_MOD_NAME: string;
    static readonly LOADER_VERSION: string;
    static readonly LOADER_NAME: string;
    static readonly MC_VERSION: string;
    static readonly WEBSITE_URL: string;
    static readonly DOWNLOAD_URL: string;
    static readonly VERSION_URL: string;
    static DEV_MODE: boolean;
    constructor();
    get dispatcher(): NetworkDispatcher;
    static get instance(): Journeymap;
    static get logger(): Logger;
    get packetHandler(): PacketHandler;
    get server(): MinecraftServer;
    static getLogger(name: string): Logger;
    serverStarted(server: MinecraftServer): void;
    serverStopping(server: MinecraftServer): void;
    setAdminConfig(config: AdminConfig): void;
  }


  class JourneymapNeoForge {
    constructor(eventBus: IEventBus);
    commonSetupEvent(event: FMLCommonSetupEvent): void;
    serverConfig(event: Loading): void;
    serverStartingEvent(event: ServerStartingEvent): void;
    serverStoppingEvent(event: ServerStoppedEvent): void;
  }

}

declare module 'journeymap.common.config' {
  import { List } from 'java.util';
  import { Server } from 'journeymap.common.config.NeoForgeConfig';
  import { ModConfigSpec } from 'net.neoforged.neoforge.common';
  import { ConfigValue } from 'ModConfigSpec';

  interface AdminAccessConfig extends AdminConfig {}
  class AdminAccessConfig extends AdminConfig {
    constructor();
    get admins(): string[];
    static get instance(): AdminAccessConfig;
    get opAccess(): boolean;
    load(adminConfig: AdminConfig): void;
    load(): void;
  }


  class AdminConfig {
    get admins(): string[];
    get opAccess(): boolean;
    load(): void;
  }


  interface NeoForgeConfig extends AdminConfig {}
  class NeoForgeConfig extends AdminConfig {
    static readonly SERVER: Server;
    static readonly SERVER_SPEC: ModConfigSpec;
    static serverAdmins: ConfigValue;
    static opAccess: ConfigValue;
    get admins(): string[];
    get opAccess(): boolean;
    load(): void;
  }

}

declare module 'journeymap.common.config.NeoForgeConfig' {
  import { ConfigValue } from 'ModConfigSpec';

  class Server {
    readonly serverAdmins: ConfigValue;
    readonly opAccess: ConfigValue;
  }

}

declare module 'journeymap.common.event' {
  import { PermissionsChangedEvent } from 'net.neoforged.neoforge.event.entity.player';
  import { Pre } from 'ServerTickEvent';
  import { EntityJoinLevelEvent, EntityLeaveLevelEvent } from 'net.neoforged.neoforge.event.entity';
  import { PlayerLoggedInEvent } from 'PlayerEvent';
  import { RegisterCommandsEvent } from 'net.neoforged.neoforge.event';

  class NeoForgeServerEvents {
    onEntityJoinWorldEvent(event: EntityJoinLevelEvent): void;
    onEntityLeaveWorldEvent(event: EntityLeaveLevelEvent): void;
    onPermissionChangedEvent(event: PermissionsChangedEvent): void;
    onPlayerLoggedInEvent(event: PlayerLoggedInEvent): void;
    onServerTickEvent(event: Pre): void;
    registerCommandEvent(event: RegisterCommandsEvent): void;
  }

}

declare module 'journeymap.common.events' {
  import { Level } from 'net.minecraft.world.level';
  import { Entity } from 'net.minecraft.world.entity';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ServerPlayer, ServerLevel } from 'net.minecraft.server.level';

  class ServerEventHandler {
    onEntityJoinWorldEvent(entity: Entity): void;
    onPlayerLoggedInEvent(player: Player): void;
    onServerTickEvent(world: Level): void;
    sendConfigsToPlayer(player: ServerPlayer): void;
    unloadPlayer(entity: Entity, world: ServerLevel): void;
  }

}

declare module 'journeymap.common.helper' {
  import { Biome } from 'net.minecraft.world.level.biome';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Entity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { DimensionType } from 'net.minecraft.world.level.dimension';
  import { Map, List, Set } from 'java.util';

  class BiomeHelper {
    static getBiomeFromResource(biome: ResourceLocation): Biome;
    static getBiomeFromResourceString(biome: string): Biome;
    static getBiomeResource(biome: Biome): ResourceLocation;
    static getTranslatedBiomeName(biome: Biome): string;
    static getTranslatedBiomeName(biomeResource: ResourceLocation): string;
  }


  class DimensionHelper {
    static get clientDimList(): Set<ResourceKey<Level>>;
    static get dimTypeMap(): Map<string, DimensionType>;
    static get serverDimNameList(): ResourceKey<Level>[];
    static getDimKeyName(entity: Entity): string;
    static getDimKeyName(world: Level): string;
    static getDimKeyName(dimensionKey: ResourceKey<Level>): string;
    static getDimName(entity: Entity): string;
    static getDimName(world: Level): string;
    static getDimName(dimensionKey: ResourceKey<Level>): string;
    static getDimName(key: string): string;
    static getDimResource(dimName: string): ResourceLocation;
    static getDimTypeForKey(dimKey: ResourceKey<Level>): DimensionType;
    static getDimTypeForName(dimName: string): DimensionType;
    static getDimension(entity: Entity): ResourceKey<Level>;
    static getDimension(world: Level): ResourceKey<Level>;
    static getSafeDimName(dim: ResourceKey<Level>): string;
    static getWorldKeyForName(dimName: string): ResourceKey<Level>;
    static isEndWorld(world: Level): boolean;
    static isNetherWorld(world: Level): boolean;
    static isOverworldWorld(world: Level): boolean;
  }

}

declare module 'journeymap.common.helpers' {
  import { ClientPlatformService, CommonPlatformService } from 'journeymap.api.services';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { BlockMD } from 'journeymap.client.model.block';
  import { List, ArrayList } from 'java.util';
  import { BakedQuad } from 'net.minecraft.client.renderer.block.model';
  import { BakedModel } from 'net.minecraft.client.resources.model';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Direction, BlockPos } from 'net.minecraft.core';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { UpdateAwareKeyBinding, KeyConflictContext, KeyModifier } from 'journeymap.client.event.handlers.keymapping';
  import { Type } from 'InputConstants';
  import { KeyEventHandler } from 'journeymap.client.event.handlers';
  import { Loader } from 'journeymap.api.services.CommonPlatformService';
  import { MinecraftServer } from 'net.minecraft.server';
  import { URL } from 'java.net';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ObfuscationHelper } from 'journeymap.common.util';
  import { Field, Method } from 'java.lang.reflect';
  import { Class } from 'java.lang';

  interface NeoForgeClientHooks extends ClientPlatformService {}
  class NeoForgeClientHooks extends ClientPlatformService {
    get farPlane(): number;
    getFluidTint(blockMD: BlockMD): number;
    getKeyBinding(description: string, keyConflictContext: KeyConflictContext, keyModifier: KeyModifier, inputType: Type, keyCode: number, category: string, handler: KeyEventHandler): UpdateAwareKeyBinding;
    getQuads(model: BakedModel, blockState: BlockState, facing: Direction, blockPos: BlockPos, type: RenderType): BakedQuad[];
    getTextureAtlasSprite(blockMD: BlockMD): TextureAtlasSprite;
  }


  interface NeoForgeHooks extends CommonPlatformService {}
  class NeoForgeHooks extends CommonPlatformService {
    get clientPluginScanResult(): string[];
    get loader(): Loader;
    get loaderVersion(): string;
    get modNames(): string;
    get mods(): ArrayList<string>;
    get obfHelper(): ObfuscationHelper;
    get server(): MinecraftServer;
    getModFileLocation(domain: string): URL;
    getModName(modId: string): string;
    getModVersion(modId: string): string;
    isClient(): boolean;
    isDedicatedServer(): boolean;
    isModLoaded(modId: string): boolean;
    isOp(player: Player): boolean;
  }


  interface NeoForgeObfHelper extends ObfuscationHelper {}
  class NeoForgeObfHelper extends ObfuscationHelper {
    findField<T>(declaringClass: Class<T>, propertyEnumStaticFieldName: string): Field;
    findMethod(declaringClass: Class<any>, methodName: string, ...methodArgTypes: Class<any>[]): Method;
  }

}

declare module 'journeymap.common.log' {
  import { Throwable } from 'java.lang';

  class LogFormatter {
    static readonly LINEBREAK: string;
    static toPartialString(t: Throwable): string;
    static toString(thrown: Throwable): string;
  }

}

declare module 'journeymap.common.migrate' {
  import { MigrationTask } from 'journeymap.client.task';
  import { Version } from 'journeymap.common.version';
  import { Boolean } from 'java.lang';

  interface Migrate59to60 extends MigrationTask {}
  class Migrate59to60 extends MigrationTask {
    call(): boolean;
    isActive(currentVersion: Version): boolean;
  }


  class Migration {
    constructor(targetPackage: string);
    performTasks(): boolean;
  }

}

declare module 'journeymap.common.mixin.client' {
  import { Iterable, Integer, Boolean } from 'java.lang';
  import { ModelPart } from 'net.minecraft.client.model.geom';
  import { ClientboundLoginPacket, ClientboundRespawnPacket, ClientboundDisguisedChatPacket } from 'net.minecraft.network.protocol.game';
  import { CallbackInfo, CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { TextureAccess, HttpTextureAccess } from 'journeymap.client.texture';
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { DynamicTexture } from 'net.minecraft.client.renderer.texture';
  import { BiFunction } from 'java.util.function';
  import { FormattedCharSequence } from 'net.minecraft.util';
  import { Component, FormattedText } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { DragonModel } from 'EnderDragonRenderer';
  import { FlowingFluid } from 'net.minecraft.world.level.material';
  import { EntityRenderer, RenderLayerParent } from 'net.minecraft.client.renderer.entity';
  import { LivingEntityRendererETFTextureGetter } from 'journeymap.client.render.draw';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { Map } from 'java.util';
  import { EntityModel, ColorableHierarchicalModel } from 'net.minecraft.client.model';
  import { Pufferfish, TropicalFish } from 'net.minecraft.world.entity.animal';

  class AgeableListModelInvoker {
    get bodyParts(): Iterable<ModelPart>;
    get headParts(): Iterable<ModelPart>;
  }


  class BiomeInvoker {
    invokeGetGrassColorFromTexture(): number;
  }


  class ClientHooksMixin {
  }


  class ClientPacketListenerMixin {
    journeymap_handleDisguisedChat_onClientChatEventReceived(clientboundSystemChatPacket: ClientboundDisguisedChatPacket, ci: CallbackInfo): void;
    journeymap_handleLogin(packet: ClientboundLoginPacket, callbackInfo: CallbackInfo): void;
    journeymap_handleRespawn(packet: ClientboundRespawnPacket, callbackInfo: CallbackInfo): void;
  }


  interface DynamicTextureMixin extends TextureAccess {}
  class DynamicTextureMixin extends TextureAccess {
    get pixels(): NativeImage;
    journeymap$getHeight(): number;
    journeymap$getScaledImage(drawScale: number): DynamicTexture;
    journeymap$getWidth(): number;
    journeymap$hasImage(): boolean;
    journeymap$putScale(scale: number, tex: DynamicTexture): void;
    journeymap$setDisplayHeight(height: number): void;
    journeymap$setDisplayWidth(width: number): void;
  }


  class EditBoxAccessor {
    get focusTime(): number;
    get formatter(): BiFunction<string, number, FormattedCharSequence>;
    get highlightPos(): number;
    get hint(): Component;
    get suggestion(): string;
    get textColor(): number;
    get uneditableTextColor(): number;
    invokeRenderHighlight(var1: GuiGraphics, var2: number, var3: number, var4: number, var5: number): void;
    isEditable(): boolean;
    maxLength(): number;
  }


  class EnderDragonRendererMixin {
    get model(): DragonModel;
  }


  class GuiMixin {
  }


  interface HttpTextureMixin extends HttpTextureAccess {}
  class HttpTextureMixin extends HttpTextureAccess {
    journeymap$getNativeImage(): NativeImage;
  }


  class LiquidBlockAccessor {
    get fluid(): FlowingFluid;
  }


  interface LivingEntityRendererMixin<T extends LivingEntity = any, M extends EntityModel<T> = any> extends RenderLayerParent<T, M>, LivingEntityRendererETFTextureGetter<T>, EntityRenderer<T> {}
  class LivingEntityRendererMixin<T extends LivingEntity = any, M extends EntityModel<T> = any> extends RenderLayerParent<T, M> {
    getETFTextureLocation(livingEntity: T): ResourceLocation;
  }


  class LlamaModelMixin {
    get head(): ModelPart;
  }


  class LocalPlayerMixin {
    journeymap_handleEntityEvent(id: number, ci: CallbackInfo): void;
  }


  class MinecraftMixin {
    level: ClientLevel;
  }


  class ModelPartMixin {
    get children(): Map<string, ModelPart>;
  }


  class NeoClientPacketListenerMixin {
    jm$SendUnsignedCommandMixin(command: string, cir: CallbackInfoReturnable<boolean>): void;
  }


  class PufferfishRendererMixin {
    get bigModel(): EntityModel<Pufferfish>;
  }


  class RabbitModelMixin {
    get head(): ModelPart;
    get leftEar(): ModelPart;
    get nose(): ModelPart;
    get rightEar(): ModelPart;
  }


  class ScreenAccessor {
    setInitialized(var1: boolean): void;
  }


  class TranslatableContentsMixin {
    journeymap_getArguments(i: number, cir: CallbackInfoReturnable<FormattedText>): void;
  }


  class TropicalFishRendererMixin {
    get modelA(): ColorableHierarchicalModel<TropicalFish>;
    get modelB(): ColorableHierarchicalModel<TropicalFish>;
  }


  class WorldSelectionListMixin {
    deleteWorld(ci: CallbackInfo): void;
    doDeleteWorld(): void;
  }

}

declare module 'journeymap.common.mixin.client.EnderDragonRendererMixin' {
  import { ModelPart } from 'net.minecraft.client.model.geom';

  class EnderDragonModelMixin {
    get head(): ModelPart;
  }

}

declare module 'journeymap.common.mixin.server' {
  import { Iterable } from 'java.lang';
  import { ChunkHolder, ChunkMap } from 'net.minecraft.server.level';

  class ChunkMapAccessor {
    invokeGetChunks(): Iterable<ChunkHolder>;
  }


  class ServerChunkCacheAccessor {
    get chunkMap(): ChunkMap;
  }

}

declare module 'journeymap.common.nbt.cache' {
  import { AutoCloseable, Void } from 'java.lang';
  import { Path } from 'java.nio.file';
  import { RegionFileVersion } from 'net.minecraft.world.level.chunk.storage';
  import { DataInputStream, DataOutputStream } from 'java.io';
  import { ChunkPos } from 'net.minecraft.world.level';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { CompletableFuture } from 'java.util.concurrent';

  interface CacheFile extends AutoCloseable {}
  class CacheFile extends AutoCloseable {
    constructor(path: Path, folderPath: Path, async: boolean);

    constructor(path: Path, folderPath: Path, fileVersion: RegionFileVersion, async: boolean);
    clear(pos: ChunkPos): void;
    close(): void;
    flush(): void;
    getChunkDataInputStream(chunkPos: ChunkPos): DataInputStream;
    getChunkDataOutputStream(pos: ChunkPos): DataOutputStream;
    hasChunk(pos: ChunkPos): boolean;
  }


  interface CacheFileStorage extends AutoCloseable {}
  class CacheFileStorage extends AutoCloseable {
    static readonly EXTENSION: string;
    close(): void;
    flush(): void;
    hasChunk(pos: ChunkPos): boolean;
    read(chunkPos: ChunkPos): CompoundTag;
  }


  interface CacheStorage extends AutoCloseable {}
  class CacheStorage extends AutoCloseable {
    constructor(path: Path, sync: boolean);
    close(): void;
    flushWorker(): void;
    hasChunk(pos: ChunkPos): boolean;
    read(chunkPos: ChunkPos): CompoundTag;
    write(chunkPos: ChunkPos, compoundTag: CompoundTag): void;
  }


  interface CacheWorker extends AutoCloseable {}
  class CacheWorker extends AutoCloseable {
    close(): void;
    hasChunk(pos: ChunkPos): boolean;
    load(chunkPos: ChunkPos): CompoundTag;
    store(chunkPos: ChunkPos, tag: CompoundTag): CompletableFuture<Void>;
    synchronize(sync: boolean): CompletableFuture<Void>;
  }

}

declare module 'journeymap.common.nbt.cache.CacheFile' {
  import { ByteArrayOutputStream } from 'java.io';
  import { ChunkPos } from 'net.minecraft.world.level';

  interface ChunkBuffer extends ByteArrayOutputStream {}
  class ChunkBuffer extends ByteArrayOutputStream {
    constructor(pos: ChunkPos);
    close(): void;
  }

}

declare module 'journeymap.common.nbt.cache.CacheWorker' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface Priority extends Enum<Priority> {}
  class Priority extends Enum<Priority> {
    static readonly FOREGROUND: Priority;
    static readonly BACKGROUND: Priority;
    static readonly SHUTDOWN: Priority;
    static valueOf(name: string): Priority;
    static values(): Priority[];
  }


  class PendingStore {
    constructor(data: CompoundTag);
  }

}

declare module 'journeymap.common.nbt.model' {
  class PlayerDTO {
    constructor(uuid: string);

    constructor(uuid: string, hiddenUnderground: boolean, visible: boolean, chunkEntity: boolean, chunkFull: boolean, chunkBlock: boolean, chunkInaccessible: boolean);
    get uuid(): string;
    isChunkBlock(): boolean;
    isChunkEntity(): boolean;
    isChunkFull(): boolean;
    isChunkInaccessible(): boolean;
    isHiddenUnderground(): boolean;
    isVisible(): boolean;
    setChunkBlock(chunkBlock: boolean): void;
    setChunkEntity(chunkEntity: boolean): void;
    setChunkFull(chunkFull: boolean): void;
    setChunkInaccessible(chunkInaccessible: boolean): void;
    setHiddenUnderground(hiddenUnderground: boolean): void;
    setVisible(visible: boolean): void;
    viewChunkBlock(): boolean;
    viewChunkEntity(): boolean;
    viewChunkFull(): boolean;
    viewChunkInaccessible(): boolean;
  }

}

declare module 'journeymap.common.nbt' {
  import { SavedData } from 'net.minecraft.world.level.saveddata';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { Factory } from 'SavedData';
  import { PlayerDTO } from 'journeymap.common.nbt.model';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Key } from 'journeymap.common.nbt.RegionDataStorageHandler';
  import { CacheStorage } from 'journeymap.common.nbt.cache';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { BlockPos } from 'net.minecraft.core';
  import { Integer } from 'java.lang';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { MapType } from 'journeymap.client.model.map';
  import { ResourceKey } from 'net.minecraft.resources';
  import { ChunkMD } from 'journeymap.client.model.chunk';
  import { Name } from 'journeymap.client.model.map.MapType';
  import { ChunkPos } from 'net.minecraft.world.level';
  import { Path } from 'java.nio.file';
  import { RegionCoord } from 'journeymap.client.model.region';

  interface PlayerData extends SavedData {}
  class PlayerData extends SavedData {
    constructor();
    static dataFactory(): Factory<PlayerData>;
    static get playerData(): PlayerData;
    getPlayer(serverPlayer: ServerPlayer): PlayerDTO;
    save(compound: CompoundTag, provider: Provider): CompoundTag;
  }


  class RegionData {
    static readonly BIOME_TAG_NAME: string;
    static readonly BLOCK_TAG_NAME: string;
    static readonly BLOCKSTATES_TAG_NAME: string;
    static readonly BLOCK_LIGHT_VALUE: string;
    static readonly TOP_Y_TAG_NAME: string;
    static readonly SURFACE_Y_TAG_NAME: string;
    static readonly BLOCK_COLOR_TAG_NAME: string;
    static readonly CHUNK_POS_NAME: string;
    constructor(key: Key, storage: CacheStorage);
    getBiome(blockPos: BlockPos): Biome;
    static getBlockDataForChunk(chunk: CompoundTag, x: number, z: number): CompoundTag;
    getBlockDataFromBlockPos(chunkPos: ChunkPos, chunk: CompoundTag, x: number, z: number): CompoundTag;
    getBlockDataFromBlockPos(chunkPos: ChunkPos, x: number, z: number): CompoundTag;
    getBlockState(blockPos: BlockPos): BlockState;
    static getBlockState(blockData: CompoundTag, blockPos: BlockPos, mapType: MapType): BlockState;
    getChunkNbt(chunkPos: ChunkPos): CompoundTag;
    getColor(blockPos: BlockPos): number;
    getTopY(blockPos: BlockPos): number;
    hasChunk(pos: ChunkPos): boolean;
    isFullRegion(): boolean;
    setBiome(blockData: CompoundTag, biome: ResourceKey<Biome>): void;
    setBlockColor(blockData: CompoundTag, color: number, mapTypeName: Name): void;
    setBlockState(blockData: CompoundTag, chunkMD: ChunkMD, pos: BlockPos): void;
    setLightValue(blockData: CompoundTag, light: number): void;
    setSurfaceY(blockData: CompoundTag, surfaceY: number): void;
    setY(blockData: CompoundTag, topY: number): void;
    writeChunk(chunkPos: ChunkPos, tag: CompoundTag): void;
  }


  class RegionDataStorageHandler {
    deleteCache(): void;
    flushDataCache(): void;
    static get instance(): RegionDataStorageHandler;
    getFile(regionCoord: RegionCoord, mapType: MapType): Path;
    getRegionData(key: Key): RegionData;
    getRegionDataAsyncNoCache(blockPos: BlockPos, mapType: MapType): RegionData;
    getRegionDataAsyncNoCache(regionCoord: RegionCoord, mapType: MapType): RegionData;
    removeRegion(rCoord: RegionCoord, mapType: MapType): void;
  }


  interface WorldIdData extends SavedData {}
  class WorldIdData extends SavedData {
    constructor();
    static dataFactory(): Factory<WorldIdData>;
    static get worldId(): string;
    save(compound: CompoundTag, provider: Provider): CompoundTag;
  }

}

declare module 'journeymap.common.nbt.RegionDataStorageHandler' {
  import { RegionCoord } from 'journeymap.client.model.region';
  import { MapType } from 'journeymap.client.model.map';

  class Key {
    constructor(rCoord: RegionCoord, mapType: MapType);
    equals(o: any): boolean;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'journeymap.common.nbt.waypoint' {
  import { Map, Collection } from 'java.util';
  import { WaypointGroupImpl, WaypointImpl } from 'journeymap.common.waypoint';
  import { CompoundTag, Tag } from 'net.minecraft.nbt';
  import { WaypointGroup } from 'journeymap.api.v2.common.waypoint';

  class WaypointDAO {
    addGroup(group: WaypointGroup): void;
    addWaypoint(waypoint: WaypointImpl): void;
    copyWaypoint(var1: WaypointImpl): WaypointImpl;
    decodeGroups(var1: CompoundTag): Map<string, WaypointGroupImpl>;
    decodeWaypoint(var1: Tag): WaypointImpl;
    decodeWaypoints(var1: CompoundTag): Map<string, WaypointImpl>;
    deleteGroup(group: WaypointGroup): void;
    deleteWaypoint(waypoint: WaypointImpl): void;
    encodeGroups(var1: Collection<WaypointGroupImpl>): CompoundTag;
    encodeWaypoint(var1: WaypointImpl): Tag;
    encodeWaypoints(var1: Collection<WaypointImpl>): CompoundTag;
    get groups(): Map<string, WaypointGroupImpl>;
    get waypoints(): Map<string, WaypointImpl>;
    isDirty(): boolean;
    save(var1: boolean): void;
    setDirty(dirty: boolean): void;
  }

}

declare module 'journeymap.common.network.dispatch' {
  import { NetworkHandler } from 'commonnetwork.api';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { List } from 'java.util';
  import { PlayerLoc } from 'journeymap.common.network.model';

  class ClientNetworkDispatcher {
    constructor(handler: NetworkHandler);
    sendHandshakePacket(version: string): void;
    sendMultiplayerOptionsRequest(): void;
    sendMultiplayerOptionsSaveRequest(payload: string): void;
    sendPermissionRequest(): void;
    sendSaveAdminDataPacket(id: number, payload: string, dim: string): void;
    sendServerAdminScreenRequest(id: number, dim: string): void;
    sendTeleportPacket(x: number, y: number, z: number, dim: string): void;
    sendWorldIdRequest(): void;
  }


  class NetworkDispatcher {
    constructor(handler: NetworkHandler);
    sendClientPermissions(player: ServerPlayer, payload: string, serverAdmin: boolean): void;
    sendHandshakePacket(player: ServerPlayer, version: string): void;
    sendMultiplayerOptionsPacket(player: ServerPlayer, payload: string): void;
    sendPlayerLocationPacket(player: ServerPlayer, remotePlayers: PlayerLoc[]): void;
    sendServerAdminPacket(player: ServerPlayer, type: number, payload: string, dimension: string): void;
    sendWaypointPacket(player: ServerPlayer, waypoint: string, announce: boolean, action: string): void;
    sendWorldIdPacket(player: ServerPlayer, worldId: string): void;
  }

}

declare module 'journeymap.common.network.handler' {
  import { ClientState, PlayerLocation, Location } from 'journeymap.common.network.model';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Integer } from 'java.lang';

  class ClientPacketHandler {
    onClientStateUpdate(packet: ClientState): void;
    onMultiplayerDataResponse(payload: string): void;
    onPlayerLocationPacket(packet: PlayerLocation): void;
    onServerAdminDataResponse(type: number, payload: string, dimension: string): void;
    onWaypointCreatePacket(waypoint: string, action: string, announce: boolean): void;
    onWorldIdReceived(worldId: string): void;
  }


  class PacketHandler {
    handleTeleportPacket(player: ServerPlayer, location: Location): void;
    onAdminScreenOpen(sender: ServerPlayer, type: number, dimension: string): void;
    onClientPermsRequest(sender: ServerPlayer): void;
    onMultiplayerOptionsOpen(sender: ServerPlayer): void;
    onMultiplayerOptionsSave(sender: ServerPlayer, payload: string): void;
    onServerAdminSave(sender: ServerPlayer, type: number, payload: string, dimension: string): void;
    onWorldIdRequest(sender: ServerPlayer): void;
  }

}

declare module 'journeymap.common.network.model' {
  import { Player } from 'net.minecraft.world.entity.player';
  import { UUID, List } from 'java.util';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { Enum } from 'java.lang';

  class Location {
    get dim(): string;
    get x(): number;
    get y(): number;
    get z(): number;
  }


  class ClientState {
    get payload(): string;
    hasServerMod(): boolean;
    isServerAdmin(): boolean;
  }


  interface PlayerLoc extends PlayerLocation {}
  class PlayerLoc extends PlayerLocation {
    constructor();

    constructor(player: Player, visible: boolean);
    static decode(buf: FriendlyByteBuf): PlayerLoc;
    encode(buf: FriendlyByteBuf): void;
    get entityId(): number;
    get pitch(): number;
    get uniqueId(): UUID;
    get x(): number;
    get y(): number;
    get yaw(): number;
    get z(): number;
    isVisible(): boolean;
  }


  class PlayerLocation {
    get entityId(): number;
    get pitch(): number;
    get uniqueId(): UUID;
    get x(): number;
    get y(): number;
    get yaw(): number;
    get z(): number;
    isVisible(): boolean;
  }


  interface ServerPropertyType extends Enum<ServerPropertyType> {}
  class ServerPropertyType extends Enum<ServerPropertyType> {
    static readonly GLOBAL: ServerPropertyType;
    static readonly DEFAULT: ServerPropertyType;
    static readonly DIMENSION: ServerPropertyType;
    get id(): number;
    static getFromType(id: number): ServerPropertyType;
    static valueOf(name: string): ServerPropertyType;
    static values(): ServerPropertyType[];
  }

}

declare module 'journeymap.common.network' {
  class PacketManager {
    static init(): void;
  }

}

declare module 'journeymap.common.network.packets' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { FriendlyByteBuf, RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { Type } from 'CustomPacketPayload';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { PacketContext } from 'commonnetwork.networking.data';
  import { ClientState, PlayerLoc, Location } from 'journeymap.common.network.model';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { UUID, List } from 'java.util';
  import { Integer } from 'java.lang';

  class ChunkOverlayPacket {
    static readonly CHANNEL: ResourceLocation;
    static readonly STREAM_CODEC: StreamCodec;
    constructor();

    constructor(payload: string);

    constructor(buf: FriendlyByteBuf);
    encode(buf: FriendlyByteBuf): void;
    get payload(): string;
    static handle(ctx: PacketContext<ChunkOverlayPacket>): void;
    static type(): Type<CustomPacketPayload>;
  }


  interface ClientPermissionsPacket extends ClientState {}
  class ClientPermissionsPacket extends ClientState {
    static readonly CHANNEL: ResourceLocation;
    static readonly STREAM_CODEC: StreamCodec;
    constructor();

    constructor(payload: string, serverAdmin: boolean, hasServerMod: boolean);

    constructor(buf: FriendlyByteBuf);
    encode(buf: FriendlyByteBuf): void;
    get payload(): string;
    static handle(ctx: PacketContext<ClientPermissionsPacket>): void;
    hasServerMod(): boolean;
    isServerAdmin(): boolean;
    static type(): Type<CustomPacketPayload>;
  }


  class CommonPacket {
    static readonly CHANNEL: ResourceLocation;
    static readonly STREAM_CODEC: StreamCodec;
    constructor();

    constructor(buf: FriendlyByteBuf);
    encode(buf: FriendlyByteBuf): void;
    static handle(ctx: PacketContext<CommonPacket>): void;
    static type(): Type<CustomPacketPayload>;
  }


  class HandshakePacket {
    static readonly CHANNEL: ResourceLocation;
    static readonly STREAM_CODEC: StreamCodec;
    constructor();

    constructor(version: string);

    constructor(buf: RegistryFriendlyByteBuf);
    static disconnect(player: ServerPlayer, message: string): void;
    static handle(ctx: PacketContext<HandshakePacket>): void;
    static type(): Type<CustomPacketPayload>;
  }


  class MultiplayerOptionsPacket {
    static readonly CHANNEL: ResourceLocation;
    static readonly STREAM_CODEC: StreamCodec;
    constructor();

    constructor(payload: string);

    constructor(buf: FriendlyByteBuf);
    encode(buf: FriendlyByteBuf): void;
    get payload(): string;
    static handle(ctx: PacketContext<MultiplayerOptionsPacket>): void;
    static type(): Type<CustomPacketPayload>;
  }


  class RemovePlayerPacket {
    static readonly CHANNEL: ResourceLocation;
    static readonly STREAM_CODEC: StreamCodec;
    constructor();

    constructor(id: UUID);

    constructor(buf: FriendlyByteBuf);
    encode(buf: FriendlyByteBuf): void;
    static handle(ctx: PacketContext<RemovePlayerPacket>): void;
    static type(): Type<CustomPacketPayload>;
  }


  class ServerAdminRequestPropPacket {
    static readonly CHANNEL: ResourceLocation;
    static readonly STREAM_CODEC: StreamCodec;
    constructor();

    constructor(type: number, payload: string, dimension: string);

    constructor(type: number, dimension: string);

    constructor(buf: FriendlyByteBuf);
    encode(buf: FriendlyByteBuf): void;
    get payload(): string;
    get type(): number;
    static handle(ctx: PacketContext<ServerAdminRequestPropPacket>): void;
    static type(): Type<CustomPacketPayload>;
  }


  class ServerAdminSavePropPacket {
    static readonly CHANNEL: ResourceLocation;
    static readonly STREAM_CODEC: StreamCodec;
    constructor();

    constructor(type: number, payload: string, dimension: string);

    constructor(buf: FriendlyByteBuf);
    encode(buf: FriendlyByteBuf): void;
    get payload(): string;
    get type(): number;
    static handle(ctx: PacketContext<ServerAdminSavePropPacket>): void;
    static type(): Type<CustomPacketPayload>;
  }


  class ServerPlayerLocationPacket {
    static readonly CHANNEL: ResourceLocation;
    static readonly STREAM_CODEC: StreamCodec;
    constructor();

    constructor(remotePlayers: PlayerLoc[]);

    constructor(buf: FriendlyByteBuf);
    encode(buf: FriendlyByteBuf): void;
    static handle(ctx: PacketContext<ServerPlayerLocationPacket>): void;
    static type(): Type<CustomPacketPayload>;
  }


  interface TeleportPacket extends Location {}
  class TeleportPacket extends Location {
    static readonly CHANNEL: ResourceLocation;
    static readonly STREAM_CODEC: StreamCodec;
    constructor();

    constructor(x: number, y: number, z: number, dim: string);

    constructor(buf: RegistryFriendlyByteBuf);
    encode(buf: RegistryFriendlyByteBuf): void;
    get dim(): string;
    get x(): number;
    get y(): number;
    get z(): number;
    static handle(ctx: PacketContext<TeleportPacket>): void;
    toString(): string;
    static type(): Type<CustomPacketPayload>;
  }


  class WaypointPacket {
    static readonly CHANNEL: ResourceLocation;
    static readonly STREAM_CODEC: StreamCodec;
    constructor();

    constructor(waypoint: string, announce: boolean, action: string);

    constructor(buf: FriendlyByteBuf);
    encode(buf: FriendlyByteBuf): void;
    static handle(ctx: PacketContext<WaypointPacket>): void;
    static type(): Type<CustomPacketPayload>;
  }


  class WorldIdPacket {
    static readonly CHANNEL: ResourceLocation;
    static readonly STREAM_CODEC: StreamCodec;
    constructor();

    constructor(worldId: string);

    constructor(buf: FriendlyByteBuf);
    encode(buf: FriendlyByteBuf): void;
    get worldId(): string;
    static handle(ctx: PacketContext<WorldIdPacket>): void;
    static type(): Type<CustomPacketPayload>;
  }

}

declare module 'journeymap.common.properties.catagory' {
  import { Comparable } from 'java.lang';
  import { TreeSet } from 'java.util';

  interface Category extends Comparable<Category> {}
  class Category extends Comparable<Category> {
    static readonly Inherit: Category;
    static readonly Hidden: Category;
    constructor(name: string, order: number, label: string);

    constructor(name: string, order: number, label: string, unique: boolean);

    constructor(name: string, order: number, label: string, tooltip: string);
    compareTo(o: Category): number;
    equals(o: any): boolean;
    get label(): string;
    get name(): string;
    get order(): number;
    get tooltip(): string;
    hashCode(): number;
    isUnique(): boolean;
    set tooltip(tooltip: string);
    toString(): string;
  }


  interface CategorySet extends TreeSet<Category> {}
  class CategorySet extends TreeSet<Category> {
  }

}

declare module 'journeymap.common.properties.config' {
  import { Boolean, Integer, Float, Double, Class, Enum, Iterable } from 'java.lang';
  import { Category } from 'journeymap.common.properties.catagory';
  import { Config } from 'journeymap.api.v2.client.option';
  import { Map, Set, List } from 'java.util';
  import { PropertiesBase } from 'journeymap.common.properties';
  import { JsonElement, JsonSerializationContext } from 'com.google.gson';
  import { Type } from 'java.lang.reflect';
  import { ValuesProvider } from 'journeymap.common.properties.config.StringField';

  interface BooleanField extends ConfigField<boolean> {}
  class BooleanField extends ConfigField<boolean> {
    static readonly ATTR_CATEGORY_MASTER: string;
    constructor(category: Category, defaultValue: boolean);

    constructor(category: Category, key: string, defaultValue: boolean);

    constructor(category: Category, key: string, defaultValue: boolean, sortOrder: number);

    constructor(category: Category, key: string, defaultValue: boolean, isMaster: boolean, sortOrder: number);

    constructor(category: Category, key: string, defaultValue: boolean, isMaster: boolean);
    categoryMaster(isMaster: boolean): BooleanField;
    get(attrName: string): any;
    get (): boolean;
    getDefaultValue(): boolean;
    isCategoryMaster(): boolean;
    set (value: boolean);
    setParent(fieldName: string, value: any): BooleanField;
    toggle(): boolean;
    toggleAndSave(): boolean;
  }


  interface ConfigField<T = any> extends Config<T> {}
  class ConfigField<T = any> extends Config<T> {
    static readonly ATTR_TYPE: string;
    static readonly ATTR_CATEGORY: string;
    static readonly ATTR_KEY: string;
    static readonly ATTR_LABEL: string;
    static readonly ATTR_TOOLTIP: string;
    static readonly ATTR_ORDER: string;
    static readonly ATTR_VALUE: string;
    static readonly ATTR_DEFAULT: string;
    static readonly ATTR_VALID_VALUES: string;
    static readonly ATTR_PARENT: string;
    static readonly ATTR_PARENT_VALUE: string;
    static readonly ATTR_ENABLED: string;
    static readonly ATTR_HAS_CUSTOM_MESSAGE: string;
    static readonly ATTR_CUSTOM_MESSAGE: string;
    constructor();
    category(category: Category): ConfigField<T>;
    defaultValue(defaultValue: T): ConfigField<T>;
    equals(o: any): boolean;
    get(attrName: string): any;
    get (): T;
    get attributeMap(): Map<string, any>;
    get attributeNames(): Set<string>;
    get customMessage(): string;
    get customToolTip(): string;
    get declaredField(): string;
    get key(): string;
    get owner(): PropertiesBase;
    get tooltip(): string;
    get type(): string;
    getBooleanAttr(attrName: string): boolean;
    getCategory(): Category;
    getDefaultValue(): T;
    getDoubleAttr(attrName: string): number;
    getEnumAttr<E extends Enum>(attrName: string, enumType: Class<E>): E;
    getFloatAttr(attrName: string): number;
    getIntegerAttr(attrName: string): number;
    getLabel(): string;
    getSortOrder(): number;
    getStringAttr(attrName: string): string;
    hasCustomMessage(): boolean;
    hasEnabledAttribute(): boolean;
    hashCode(): number;
    isEnabled(): boolean;
    label(label: string): ConfigField<T>;
    put(attrName: string, value: any): ConfigField<T>;
    save(): boolean;
    set (value: T);
    setOwner(fieldName: string, properties: PropertiesBase): void;
    setParent(fieldName: string, value: any): ConfigField<T>;
    setToDefault(): void;
    sortOrder(order: number): ConfigField<T>;
    toString(): string;
    validate(fix: boolean): boolean;
  }


  interface CustomField extends ConfigField<any> {}
  class CustomField extends ConfigField<any> {
    static readonly ATTR_VALUE_PATTERN: string;
    constructor(category: Category, key: string);

    constructor(category: Category, key: string, defaultValue: string, sortOrder: number);

    constructor(category: Category, key: string, defaultValue: string);

    constructor(category: Category, key: string, minValue: number, maxValue: number, defaultValue: number, allowNeg: boolean);

    constructor(category: Category, key: string, minValue: number, maxValue: number, defaultValue: number, sortOrder: number, allowNeg: boolean);
    allowNeg(): boolean;
    get(attrName: string): any;
    get (): any;
    get asInteger(): number;
    get asString(): string;
    get maxValue(): number;
    get minValue(): number;
    getDefaultValue(): any;
    getPattern(): string;
    isNumber(): boolean;
    pattern(regexPattern: string): CustomField;
    range(min: number, max: number): CustomField;
    set (value: any);
    validate(fix: boolean): boolean;
  }


  interface DoubleField extends ConfigField<number> {}
  class DoubleField extends ConfigField<number> {
    static readonly ATTR_MIN: string;
    static readonly ATTR_MAX: string;
    static readonly ATTR_INC_VAL: string;
    static readonly PRECISION: string;
    constructor(category: Category, key: string, minValue: number, maxValue: number, defaultValue: number);

    constructor(category: Category, key: string, minValue: number, maxValue: number, defaultValue: number, incrementValue: number, precision: number);

    constructor(category: Category, key: string, minValue: number, maxValue: number, defaultValue: number, incrementValue: number, precision: number, sortOrder: number);

    constructor(category: Category, key: string, minValue: number, maxValue: number, defaultValue: number, sortOrder: number);
    get(attrName: string): any;
    get (): number;
    get incrementValue(): number;
    get maxValue(): number;
    get minValue(): number;
    get precision(): number;
    getDefaultValue(): number;
    range(min: number, max: number): DoubleField;
    validate(fix: boolean): boolean;
  }


  interface EnumField<E extends Enum = any> extends ConfigField<E> {}
  class EnumField<E extends Enum = any> extends ConfigField<E> {
    static readonly ATTR_ENUM_TYPE: string;
    constructor(category: Category, key: string, defaultValue: E);

    constructor(category: Category, key: string, defaultValue: E, sortOrder: number);
    get(attrName: string): any;
    get (): E;
    get enumClass(): Class<E>;
    get validValues(): Set<E>;
    getDefaultValue(): E;
    set (value: E);
    setParent(fieldName: string, value: any): EnumField<E>;
    validate(fix: boolean): boolean;
  }


  interface FloatField extends ConfigField<number> {}
  class FloatField extends ConfigField<number> {
    static readonly ATTR_MIN: string;
    static readonly ATTR_MAX: string;
    static readonly ATTR_INC_VAL: string;
    static readonly PRECISION: string;
    constructor(category: Category, key: string, minValue: number, maxValue: number, defaultValue: number);

    constructor(category: Category, key: string, minValue: number, maxValue: number, defaultValue: number, incrementValue: number, precision: number);

    constructor(category: Category, key: string, minValue: number, maxValue: number, defaultValue: number, incrementValue: number, precision: number, sortOrder: number);

    constructor(category: Category, key: string, minValue: number, maxValue: number, defaultValue: number, sortOrder: number);
    get(attrName: string): any;
    get (): number;
    get incrementValue(): number;
    get maxValue(): number;
    get minValue(): number;
    get precision(): number;
    getDefaultValue(): number;
    range(min: number, max: number): FloatField;
    validate(fix: boolean): boolean;
  }


  class GsonHelper<T extends ConfigField = any> {
    constructor(verbose: boolean);

    constructor(verbose: boolean, saveType: boolean);
    serializeAttributes(src: ConfigField<any>, typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }


  interface IntegerField extends ConfigField<number> {}
  class IntegerField extends ConfigField<number> {
    static readonly ATTR_MIN: string;
    static readonly ATTR_MAX: string;
    constructor(category: Category, key: string, minValue: number, maxValue: number, defaultValue: number);

    constructor(category: Category, key: string, minValue: number, maxValue: number, defaultValue: number, sortOrder: number);

    constructor(category: Category, key: string);
    decrementAndGet(): number;
    get(attrName: string): any;
    get (): number;
    get maxValue(): number;
    get minValue(): number;
    getDefaultValue(): number;
    incrementAndGet(): number;
    range(min: number, max: number): IntegerField;
    setParent(fieldName: string, value: any): IntegerField;
    validate(fix: boolean): boolean;
  }


  interface StringField extends ConfigField<string> {}
  class StringField extends ConfigField<string> {
    static readonly ATTR_VALUE_PROVIDER: string;
    static readonly ATTR_VALUE_PATTERN: string;
    static readonly ATTR_MULTILINE: string;
    constructor(category: Category, key: string);

    constructor(category: Category, key: string, sortOrder: number);

    constructor(category: Category, key: string, validValues: string[], defaultValue: string, sortOrder: number);

    constructor(category: Category, key: string, validValues: string[], defaultValue: string);

    constructor(category: Category, key: string, valueProviderClass: Class<ValuesProvider>);

    constructor(category: Category, key: string, valueProviderClass: Class<ValuesProvider>, sortOrder: number);

    constructor(category: Category, key: string, defaultValue: string, valueProviderClass: Class<ValuesProvider>, sortOrder: number);

    constructor(category: Category, key: string, defaultValue: string, valueProviderClass: Class<ValuesProvider>);
    get(attrName: string): any;
    get (): string;
    get valuesProviderClass(): Class<ValuesProvider>;
    getDefaultValue(): string;
    getPattern(): string;
    getValidValues(): string[];
    isMultiline(): boolean;
    multiline(isMultiline: boolean): StringField;
    pattern(regexPattern: string): StringField;
    set (value: string);
    validValues(values: Iterable<string>): StringField;
    validate(fix: boolean): boolean;
  }

}

declare module 'journeymap.common.properties.config.custom' {
  import { IntegerField, BooleanField } from 'journeymap.common.properties.config';
  import { Category } from 'journeymap.common.properties.catagory';

  interface MinimapCaveLayerIntField extends IntegerField {}
  class MinimapCaveLayerIntField extends IntegerField {
    constructor(category: Category, key: string, minValue: number, maxValue: number, defaultValue: number, minimapId: number, sortOrder: number);
    get tooltip(): string;
    isEnabled(): boolean;
    setId(minimapId: number): void;
    updateSlices(): void;
  }


  interface RenderDistanceIntField extends IntegerField {}
  class RenderDistanceIntField extends IntegerField {
    constructor(category: Category, key: string, minValue: number, maxValue: number, defaultValue: number, sortOrder: number);
    get customMessage(): string;
    get customToolTip(): string;
    hasCustomMessage(): boolean;
  }


  interface ShowEntityNamesBooleanField extends BooleanField {}
  class ShowEntityNamesBooleanField extends BooleanField {
    constructor(category: Category, key: string, defaultValue: boolean, sortOrder: number);
    isEnabled(): boolean;
    setId(minimapId: number): void;
  }


  interface TopoMaxIntField extends IntegerField {}
  class TopoMaxIntField extends IntegerField {
    constructor(category: Category, key: string, minValue: number, maxValue: number, defaultValue: number, sortOrder: number);
    get customMessage(): string;
    get customToolTip(): string;
    hasCustomMessage(): boolean;
  }

}

declare module 'journeymap.common.properties.config.GsonHelper' {
  import { GsonHelper, EnumField, CustomField, StringField, IntegerField, FloatField, BooleanField, ConfigField } from 'journeymap.common.properties.config';
  import { JsonSerializer, JsonDeserializer, JsonElement, JsonSerializationContext, JsonDeserializationContext } from 'com.google.gson';
  import { Type } from 'java.lang.reflect';
  import { Map } from 'java.util';
  import { GridSpec } from 'journeymap.client.model.grid';
  import { Version } from 'journeymap.common.version';
  import { CategorySet } from 'journeymap.common.properties.catagory';

  interface EnumFieldSerializer extends JsonSerializer<EnumField>, JsonDeserializer<EnumField>, GsonHelper<EnumField> {}
  class EnumFieldSerializer extends JsonSerializer<EnumField> {
    constructor(verbose: boolean);
    deserialize(json: JsonElement, typeOfT: Type, context: JsonDeserializationContext): EnumField;
    serialize(src: EnumField, typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }


  interface TextFieldSerializer extends JsonSerializer<CustomField>, JsonDeserializer<CustomField>, GsonHelper<CustomField> {}
  class TextFieldSerializer extends JsonSerializer<CustomField> {
    constructor(verbose: boolean);
    deserialize(json: JsonElement, typeOfT: Type, context: JsonDeserializationContext): CustomField;
    serialize(src: CustomField, typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }


  interface StringFieldSerializer extends JsonSerializer<StringField>, JsonDeserializer<StringField>, GsonHelper<StringField> {}
  class StringFieldSerializer extends JsonSerializer<StringField> {
    constructor(verbose: boolean);
    deserialize(json: JsonElement, typeOfT: Type, context: JsonDeserializationContext): StringField;
    serialize(src: StringField, typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }


  interface IntegerFieldSerializer extends JsonSerializer<IntegerField>, JsonDeserializer<IntegerField>, GsonHelper<IntegerField> {}
  class IntegerFieldSerializer extends JsonSerializer<IntegerField> {
    constructor(verbose: boolean);
    deserialize(json: JsonElement, typeOfT: Type, context: JsonDeserializationContext): IntegerField;
    serialize(src: IntegerField, typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }


  interface FloatFieldSerializer extends JsonSerializer<FloatField>, JsonDeserializer<FloatField>, GsonHelper<FloatField> {}
  class FloatFieldSerializer extends JsonSerializer<FloatField> {
    constructor(verbose: boolean);
    deserialize(json: JsonElement, typeOfT: Type, context: JsonDeserializationContext): FloatField;
    serialize(src: FloatField, typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }


  interface BooleanFieldSerializer extends JsonSerializer<BooleanField>, JsonDeserializer<BooleanField>, GsonHelper<BooleanField> {}
  class BooleanFieldSerializer extends JsonSerializer<BooleanField> {
    constructor(verbose: boolean);
    deserialize(json: JsonElement, typeOfT: Type, context: JsonDeserializationContext): BooleanField;
    serialize(src: BooleanField, typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }


  interface MapFieldSerializer extends JsonSerializer<Map>, JsonDeserializer<Map>, GsonHelper<ConfigField> {}
  class MapFieldSerializer extends JsonSerializer<Map> {
    constructor(verbose: boolean, saveType: boolean);
    deserialize(json: JsonElement, typeOfT: Type, context: JsonDeserializationContext): Map<string, ConfigField>;
    serialize(src: Map<string, ConfigField>, typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }


  interface GridSpecSerializer extends JsonSerializer<GridSpec>, JsonDeserializer<GridSpec> {}
  class GridSpecSerializer extends JsonSerializer<GridSpec> {
    constructor(verbose: boolean);
    deserialize(json: JsonElement, typeOfT: Type, context: JsonDeserializationContext): GridSpec;
    serialize(src: GridSpec, typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }


  interface VersionSerializer extends JsonSerializer<Version>, JsonDeserializer<Version> {}
  class VersionSerializer extends JsonSerializer<Version> {
    constructor(verbose: boolean);
    deserialize(json: JsonElement, typeOfT: Type, context: JsonDeserializationContext): Version;
    serialize(src: Version, typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }


  interface CategorySetSerializer extends JsonSerializer<CategorySet>, JsonDeserializer<CategorySet> {}
  class CategorySetSerializer extends JsonSerializer<CategorySet> {
    constructor(verbose: boolean);
    deserialize(json: JsonElement, typeOfT: Type, context: JsonDeserializationContext): CategorySet;
    serialize(src: CategorySet, typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }

}

declare module 'journeymap.common.properties.config.StringField' {
  import { List } from 'java.util';

  class ValuesProvider {
    get defaultString(): string;
    get strings(): string[];
    getTooltip(value: string): string;
  }

}

declare module 'journeymap.common.properties' {
  import { BooleanField, EnumField, IntegerField, ConfigField } from 'journeymap.common.properties.config';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Level } from 'net.minecraft.world.level';
  import { Category } from 'journeymap.common.properties.catagory';
  import { List, Map } from 'java.util';
  import { Supplier } from 'java.util.function';
  import { Boolean, Class, Enum, Cloneable } from 'java.lang';
  import { File, Serializable } from 'java.io';
  import { Gson, ExclusionStrategy, FieldAttributes } from 'com.google.gson';

  interface DefaultDimensionProperties extends PermissionProperties {}
  class DefaultDimensionProperties extends PermissionProperties {
    readonly enabled: BooleanField;
    constructor();
    get name(): string;
  }


  interface DimensionProperties extends PermissionProperties {}
  class DimensionProperties extends PermissionProperties {
    readonly enabled: BooleanField;
    constructor(dimension: ResourceKey<Level>);

    constructor(name: string);
    build(): DimensionProperties;
    clone(): any;
    get dimension(): ResourceKey<Level>;
    get name(): string;
  }


  interface GlobalProperties extends PermissionProperties {}
  class GlobalProperties extends PermissionProperties {
    readonly journeymapEnabled: BooleanField;
    readonly useWorldId: BooleanField;
    readonly viewOnlyServerProperties: BooleanField;
    readonly allowMultiplayerSettings: EnumField;
    readonly worldPlayerRadar: EnumField;
    readonly worldPlayerRadarUpdateTime: IntegerField;
    readonly seeUndergroundPlayers: EnumField;
    readonly hideOps: BooleanField;
    readonly hideSpectators: BooleanField;
    readonly allowDeathPoints: BooleanField;
    readonly showInGameBeacons: BooleanField;
    readonly allowWaypoints: BooleanField;
    readonly allowRightClickTeleport: BooleanField;
    readonly radarLateralDistance: IntegerField;
    readonly radarVerticalDistance: IntegerField;
    readonly maxAnimalsData: IntegerField;
    readonly maxAmbientCreaturesData: IntegerField;
    readonly maxMobsData: IntegerField;
    readonly maxPlayersData: IntegerField;
    readonly maxVillagersData: IntegerField;
    constructor();
    clone(): any;
    get name(): string;
  }


  class MultiplayerCategories {
    static readonly Multiplayer: Category;
    static readonly Radar: Category;
    static readonly Debug: Category;
    static readonly values: List;
    static create(name: string, label: string, tooltip: string, enabled: Supplier<boolean>): Category;
    static valueOf(name: string): Category;
  }


  interface MultiplayerProperties extends ServerPropertiesBase {}
  class MultiplayerProperties extends ServerPropertiesBase {
    readonly loadedChunksEntity: BooleanField;
    readonly loadedChunksBlock: BooleanField;
    readonly loadedChunksFull: BooleanField;
    readonly loadedChunksInaccessible: BooleanField;
    readonly visible: BooleanField;
    readonly hideSelfUnderground: BooleanField;
    constructor();
    get name(): string;
    save(): boolean;
    save(configFile: File, verbose: boolean): boolean;
  }


  interface PermissionProperties extends ServerPropertiesBase {}
  class PermissionProperties extends ServerPropertiesBase {
    readonly minimapEnabled: BooleanField;
    readonly hideCoordinates: BooleanField;
    readonly teleportEnabled: BooleanField;
    readonly crossDimTeleport: BooleanField;
    readonly surfaceRenderRange: IntegerField;
    readonly caveRenderRange: IntegerField;
    readonly surfaceMapping: EnumField;
    readonly topoMapping: EnumField;
    readonly biomeMapping: EnumField;
    readonly caveMapping: EnumField;
    readonly radarEnabled: EnumField;
    readonly playerRadarEnabled: BooleanField;
    readonly playerRadarNamesEnabled: BooleanField;
    readonly villagerRadarEnabled: BooleanField;
    readonly animalRadarEnabled: BooleanField;
    readonly mobRadarEnabled: BooleanField;
  }


  interface Permissions extends DimensionProperties {}
  class Permissions extends DimensionProperties {
    constructor();
  }


  class PropertiesBase {
    equals(o: any): boolean;
    fromJsonString<T extends PropertiesBase>(jsonString: string, propertiesClass: Class<T>, verbose: boolean): T;
    get configFields(): Map<string, ConfigField<any>>;
    get file(): File;
    get fileName(): string;
    get headers(): string[];
    get name(): string;
    getCategoryByName(name: string): Category;
    getExclusionStrategies(verbose: boolean): ExclusionStrategy[];
    getGson(verbose: boolean): Gson;
    hashCode(): number;
    isCurrent(): boolean;
    isValid(fix: boolean): boolean;
    lastModified(): number;
    load<T extends PropertiesBase>(): T;
    load<T extends PropertiesBase>(verbose: boolean): T;
    load<T extends PropertiesBase>(configFile: File, verbose: boolean): T;
    save(): boolean;
    save(configFile: File, verbose: boolean): boolean;
    shouldSkipClass(clazz: Class<any>): boolean;
    shouldSkipField(f: FieldAttributes): boolean;
    toJsonString(verbose: boolean): string;
    toString(): string;
    updateFrom<T extends PropertiesBase>(otherInstance: T): void;
  }


  class PropertiesManager {
    clear(): void;
    get defaultDimensionProperties(): DefaultDimensionProperties;
    get globalProperties(): GlobalProperties;
    static get instance(): PropertiesManager;
    getDimProperties(dim: ResourceKey<Level>): DimensionProperties;
    reloadConfigs(): void;
  }


  class ServerCategory {
    static readonly Global: Category;
    static readonly Default: Category;
    static readonly Dimension: Category;
    static readonly values: List;
    static create(name: string, label: string, tooltip: string): Category;
    static valueOf(name: string): Category;
  }


  interface ServerOption extends Enum<ServerOption> {}
  class ServerOption extends Enum<ServerOption> {
    static readonly ALL: ServerOption;
    static readonly OPS: ServerOption;
    static readonly NONE: ServerOption;
    canOps(): boolean;
    displayName(): string;
    enabled(): boolean;
    enabled(isOp: boolean): ServerOption;
    get key(): string;
    hasOption(isOp: boolean): boolean;
    static valueOf(name: string): ServerOption;
    static values(): ServerOption[];
  }


  interface ServerPropertiesBase extends Cloneable, Serializable, PropertiesBase {}
  class ServerPropertiesBase extends Cloneable {
    clone(): any;
    get file(): File;
    get fileName(): string;
    get headers(): string[];
    getCategoryByName(name: string): Category;
    getExclusionStrategies(verbose: boolean): ExclusionStrategy[];
    isValid(fix: boolean): boolean;
    load<T extends PropertiesBase>(jsonString: string, verbose: boolean): T;
    load<T extends PropertiesBase>(): T;
    load<T extends PropertiesBase>(verbose: boolean): T;
    load<T extends PropertiesBase>(configFile: File, verbose: boolean): T;
    loadForClient<T extends PropertiesBase>(jsonString: string, verbose: boolean): T;
    save(): boolean;
    save(configFile: File, verbose: boolean): boolean;
    shouldSkipClass(clazz: Class<any>): boolean;
    shouldSkipField(f: FieldAttributes): boolean;
    updateFrom<T extends PropertiesBase>(otherInstance: T): void;
  }

}

declare module 'journeymap.common.properties.MultiplayerCategories' {
  import { Category } from 'journeymap.common.properties.catagory';
  import { Supplier } from 'java.util.function';
  import { Boolean } from 'java.lang';

  interface MultiplayerCategory extends Category {}
  class MultiplayerCategory extends Category {
    constructor(name: string, order: number, label: string, enabled: Supplier<boolean>);

    constructor(name: string, order: number, label: string, unique: boolean, enabled: Supplier<boolean>);

    constructor(name: string, order: number, label: string, tooltip: string, enabled: Supplier<boolean>);
    enabled(): boolean;
  }

}

declare module 'journeymap.common.thread' {
  import { ThreadFactory } from 'java.util.concurrent';
  import { Thread, Runnable } from 'java.lang';

  interface JMThreadFactory extends ThreadFactory {}
  class JMThreadFactory extends ThreadFactory {
    constructor(name: string);
    newThread(runnable: Runnable): Thread;
  }

}

declare module 'journeymap.common.util' {
  import { Entity } from 'net.minecraft.world.entity';
  import { Location, PlayerLocation } from 'journeymap.common.network.model';
  import { PolygonData } from 'journeymap.common.util.LoadedChunksToPoints';
  import { Iterable, Class } from 'java.lang';
  import { ChunkHolder, ServerPlayer } from 'net.minecraft.server.level';
  import { Field, Method } from 'java.lang.reflect';
  import { Map, UUID, Optional, List } from 'java.util';
  import { Player } from 'net.minecraft.world.entity.player';

  class JourneyMapTeleport {
    attemptTeleport(entity: Entity, location: Location): boolean;
    static instance(): JourneyMapTeleport;
  }


  class LoadedChunksToPoints {
    static recalculateChunks(chunks: Iterable<ChunkHolder>): PolygonData;
  }


  class ObfuscationHelper {
    findField<T>(var1: Class<T>, var2: string): Field;
    findMethod(var1: Class<any>, var2: string, ...var3: Class<any>[]): Method;
  }


  class PermissionsManager {
    canServerAdmin(player: ServerPlayer): boolean;
    static get instance(): PermissionsManager;
    sendPermissions(playerEntity: ServerPlayer): void;
  }


  class PlayerRadarManager {
    static get instance(): PlayerRadarManager;
    get players(): Map<UUID, Player>;
    remove(playerId: UUID): void;
    reset(): void;
    updatePlayers(player: PlayerLocation): void;
  }


  class ReflectionHelper {
    static getPrivateField<T>(obj: any, fieldName: string): Optional<T>;
    static getPrivateFieldsOfClass<T>(obj: any, theClass: Class<T>): T[];
    static getStaticMethod(className: string, fieldName: string, ...params: Class<any>[]): Optional<Method>;
    static hasField(obj: any, fieldName: string): boolean;
    static invokeMethod<T>(obj: any, fieldName: string, ...params: any[]): Optional<T>;
    static invokeStaticMethod<T>(className: string, fieldName: string, ...params: any[]): Optional<T>;
    static invokeStaticMethod<T>(clazz: Class<any>, fieldName: string, ...params: any[]): Optional<T>;
    static invokeStaticMethod<T>(method: Method, ...params: any[]): Optional<T>;
    static isInstanceOf(object: any, ...classPaths: string[]): boolean;
  }

}

declare module 'journeymap.common.version' {
  import { Comparable, Boolean } from 'java.lang';
  import { Side } from 'commonnetwork.networking.data';

  interface Version extends Comparable<Version> {}
  class Version extends Comparable<Version> {
    readonly major: number;
    readonly minor: number;
    readonly micro: number;
    readonly patch: string;
    loader: string;
    loaderVersion: string;
    minecraftVersion: string;
    constructor(major: number, minor: number, micro: number);

    constructor(major: number, minor: number, micro: number, patch: string);
    compareTo(other: Version): number;
    equals(o: any): boolean;
    static from(major: string, minor: string, micro: string, patch: string, defaultVersion: Version): Version;
    static from(versionString: string, defaultVersion: Version): Version;
    static fromJson(string: string): Version;
    static fromLegacy(versionString: string, defaultVersion: Version): Version;
    hashCode(): number;
    isLegacy(): boolean;
    isNewerThan(other: Version): boolean;
    isRelease(): boolean;
    isValid(min: Version, side: Side): boolean;
    toJson(): string;
    toMajorMinorMicroString(): string;
    toMajorMinorString(): string;
    toString(): string;
  }


  class VersionCheck {
    static get downloadUrl(): string;
    static get versionAvailable(): string;
    static get versionIsChecked(): boolean;
    static get versionIsCurrent(): boolean;
  }

}

declare module 'journeymap.common.waypoint' {
  import { Map, List, Optional, Set, Collection } from 'java.util';
  import { Waypoint, WaypointGroup } from 'journeymap.api.v2.common.waypoint';
  import { Boolean, Integer, Float, Enum } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { MapCodec } from 'com.mojang.serialization';
  import { BlockPos } from 'net.minecraft.core';
  import { ClientWaypointImpl, ExternalWaypointFinder } from 'journeymap.client.waypoint';

  interface GroupSettings extends Settings {}
  class GroupSettings extends Settings {
    locked: boolean;
    colorOverride: boolean;
    constructor();

    constructor(enable: boolean, showDeviation: boolean, locked: boolean, colorOverride: boolean, displaySettings: Map<string, string>, persistent: boolean);
    get displaySettings(): Map<string, string>;
    getDisplaySetting(key: string, defaultValue: string): string;
    isColorOverride(): boolean;
    isIconOverride(): boolean;
    isLocked(): boolean;
    setColorOverride(colorOverride: boolean): void;
    setDisplaySetting(key: string, value: string): string;
    setIconOverride(iconOverride: boolean): void;
    setLocked(locked: boolean): void;
  }


  class Settings {
    constructor(enable: boolean, showDeviation: boolean, persistent: boolean);
    isDirty(): boolean;
    isEnabled(): boolean;
    isPersistent(): boolean;
    markDirty(): void;
    setDirty(dirty: boolean): void;
    setEnabled(enable: boolean): void;
    setPersistent(persistent: boolean): void;
    setShowDeviation(showDeviation: boolean): void;
    showDeviation(): boolean;
  }


  class WaypointEventManager {
    static createWaypointEvent(waypoint: Waypoint): void;
    static deleteWaypointEvent(waypoint: Waypoint): void;
    static readWaypointEvent(waypoint: Waypoint): void;
    static updateWaypointEvent(waypoint: Waypoint): void;
  }


  class WaypointGroupStore {
    static readonly DEFAULT: WaypointGroup;
    static readonly DEATH: WaypointGroup;
    static readonly TEMP: WaypointGroup;
    static readonly ALL: WaypointGroup;
    bulkSave(): void;
    canTransferWaypoint(to: WaypointGroup, waypoint: Waypoint): boolean;
    get(guid: string): WaypointGroupImpl;
    get all(): WaypointGroup[];
    static get instance(): WaypointGroupStore;
    static getDisplaySetting(key: string, defaultValue: string): string;
    getForMod(modId: string): WaypointGroup[];
    getNullable(guid: string): WaypointGroupImpl;
    getWaypoints(group: WaypointGroup): Waypoint[];
    getWaypointsIds(waypointGroup: WaypointGroupImpl): string[];
    static isNative(group: WaypointGroup): boolean;
    put(waypointGroup: WaypointGroup): void;
    remove(waypointGroup: WaypointGroup): void;
    remove(group: WaypointGroup, deleteWaypoints: boolean): void;
    removeAll(modId: string, deleteWaypoints: boolean): void;
    reset(): void;
    static setDisplaySetting(key: string, value: string): string;
    transferWaypoint(to: WaypointGroup, waypointId: string): boolean;
  }


  class WaypointIcon {
    static readonly DEFAULT_ICON_NORMAL: ResourceLocation;
    static readonly DEFAULT_ICON_DEATH: ResourceLocation;
    static CODEC: MapCodec;
    dirty: boolean;
    constructor();

    constructor(resourceLocation: ResourceLocation);

    constructor(resourceLocation: ResourceLocation, textureWidth: number, textureHeight: number);

    constructor(resourceLocation: ResourceLocation, textureWidth: number, textureHeight: number, color: number, opacity: number);

    constructor(resourceLocation: ResourceLocation, rotation: Optional<number>, textureWidth: Optional<number>, textureHeight: Optional<number>, color: Optional<number>, opacity: Optional<number>);

    constructor(original: WaypointIcon);
    equals(o: any): boolean;
    get color(): number;
    get opacity(): number;
    get resourceLocation(): ResourceLocation;
    get rotation(): number;
    get textureHeight(): number;
    get textureWidth(): number;
    hashCode(): number;
    isDirty(): boolean;
    markDirty(): void;
    set color(color: number);
    set opacity(opacity: number);
    set resourceLocation(resourceLocation: ResourceLocation);
    set rotation(rotation: number);
    set textureHeight(textureHeight: number);
    set textureWidth(textureWidth: number);
    setDirty(dirty: boolean): void;
    toString(): string;
    useBeaconColor(): boolean;
  }


  interface WaypointOrigin extends Enum<WaypointOrigin> {}
  class WaypointOrigin extends Enum<WaypointOrigin> {
    static readonly SERVER: WaypointOrigin;
    static readonly COMMAND: WaypointOrigin;
    static readonly EXTERNAL: WaypointOrigin;
    static readonly EXTERNAL_FORCE: WaypointOrigin;
    static readonly TEMP: WaypointOrigin;
    static from(string: string): WaypointOrigin;
    static fromValue(string: string): WaypointOrigin;
    get value(): string;
    static get values(): Set<string>;
    static valueOf(name: string): WaypointOrigin;
    static values(): WaypointOrigin[];
  }


  class WaypointPos {
    static CODEC: MapCodec;
    constructor(x: number, y: number, z: number, primaryDimension: string);

    constructor(x: number, y: number, z: number, primaryDimension: Optional<string>);

    constructor(x: number, y: number, z: number);

    constructor(blockPos: BlockPos, primaryDimension: string);
    asBlockPos(): BlockPos;
    get primaryDimension(): string;
    get x(): number;
    get y(): number;
    get z(): number;
    set primaryDimension(primaryDimension: string);
    set x(x: number);
    set y(y: number);
    set z(z: number);
    toString(): string;
  }


  interface WaypointSettings extends Settings {}
  class WaypointSettings extends Settings {
    static CODEC: MapCodec;
    constructor();

    constructor(enable: boolean, showDeviation: boolean, persistent: boolean);
  }


  class WaypointStore {
    bulkAdd(waypoints: ClientWaypointImpl[]): void;
    bulkSave(): void;
    get(id: string): ClientWaypointImpl;
    get all(): Collection<ClientWaypointImpl>;
    get externalWaypoints(): ExternalWaypointFinder;
    static get instance(): WaypointStore;
    get loadedDimensions(): string[];
    get playerPoints(): Collection<ClientWaypointImpl>;
    getAll(modId: string): ClientWaypointImpl[];
    remove(waypoint: ClientWaypointImpl, fireEvent: boolean): void;
    remove(group: WaypointGroup): void;
    static renderWaypoints(value: boolean): void;
    reset(): void;
    save(waypoint: ClientWaypointImpl, isNew: boolean): void;
    save(waypoint: ClientWaypointImpl, fireEvent: boolean, isNew: boolean): void;
    static toggleAllWaypoints(): void;
    static toggleWaypointRendering(): void;
    toggleWaypoints(waypoints: ClientWaypointImpl[], enable: boolean): void;
    toggleWaypoints(waypoints: ClientWaypointImpl[]): void;
  }

}

declare module 'journeymap.common.waypoint.predefined' {
  import { Optional, Map, List } from 'java.util';
  import { Integer } from 'java.lang';
  import { WaypointIcon, GroupSettings, WaypointGroupImpl } from 'journeymap.common.waypoint';

  interface AllWaypointsGroup extends LockedGroup {}
  class AllWaypointsGroup extends LockedGroup {
    constructor(modId: string, name: string, guid: string);

    constructor(name: string, version: string, modId: string, guid: string, description: Optional<string>, color: Optional<number>, icon: WaypointIcon, settings: GroupSettings, customData: Optional<string>, customDataMap: Optional<Map<string, string>>);
    get waypointIds(): string[];
    isEnabled(): boolean;
    setEnabled(enabled: boolean): void;
  }


  interface DeathWaypointGroup extends LockedGroup {}
  class DeathWaypointGroup extends LockedGroup {
    constructor(modId: string, name: string, guid: string);

    constructor(name: string, version: string, modId: string, guid: string, description: Optional<string>, color: Optional<number>, icon: WaypointIcon, settings: GroupSettings, customData: Optional<string>, customDataMap: Optional<Map<string, string>>);
  }


  interface LockedGroup extends WaypointGroupImpl {}
  class LockedGroup extends WaypointGroupImpl {
    constructor(modId: string, name: string, guid: string);

    constructor(name: string, version: string, modId: string, guid: string, description: Optional<string>, color: Optional<number>, icon: WaypointIcon, settings: GroupSettings, customData: Optional<string>, tag: string, customDataMap: Optional<Map<string, string>>);
  }

}