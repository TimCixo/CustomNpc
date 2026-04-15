declare module 'journeymap.api.client.impl' {
  import { IBlockInfo, ThemeButtonDisplay, IThemeButton, CustomToolBarBuilder, IThemeToolBar } from 'journeymap.api.v2.client.fullscreen';
  import { BlockPos } from 'net.minecraft.core';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { LevelChunk } from 'net.minecraft.world.level.chunk';
  import { ChunkPos, Level } from 'net.minecraft.world.level';
  import { Integer, Enum, Class } from 'java.lang';
  import { Builder } from 'journeymap.api.client.impl.BlockInfo';
  import { UIState } from 'journeymap.api.v2.client.util';
  import { UI, MapType } from 'Context';
  import { File } from 'java.io';
  import { List, Collection, Iterator, Map } from 'java.util';
  import { Waypoint, WaypointGroup } from 'journeymap.api.v2.common.waypoint';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { Displayable, DisplayType, Overlay } from 'journeymap.api.v2.client.display';
  import { Consumer, Supplier } from 'java.util.function';
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { OverlayDrawStep } from 'journeymap.client.render.draw';
  import { IClientAPI, IClientPlugin } from 'journeymap.api.v2.client';
  import { HashBasedTable } from 'com.google.common.collect';
  import { DisplayUpdateEvent } from 'journeymap.api.v2.client.event';
  import { Entity } from 'net.minecraft.world.entity';
  import { InfoSlotRegistrar } from 'RegistryEvent.InfoSlotRegistryEvent';
  import { Component } from 'net.minecraft.network.chat';
  import { AddonProperties } from 'journeymap.client.properties';
  import { ConfigField } from 'journeymap.common.properties.config';
  import { Theme, ThemeButton, ThemeToolbar } from 'journeymap.client.ui.theme';
  import { Action } from 'IThemeButton';
  import { Fullscreen } from 'journeymap.client.ui.fullscreen';

  interface BlockInfo extends IBlockInfo {}
  class BlockInfo extends IBlockInfo {
    static builder(): Builder;
    get biome(): Biome;
    get block(): Block;
    get blockPos(): BlockPos;
    get blockState(): BlockState;
    get chunk(): LevelChunk;
    get chunkPos(): ChunkPos;
    get regionX(): number;
    get regionZ(): number;
  }


  interface ClientAPI extends Enum<ClientAPI> {}
  class ClientAPI extends Enum<ClientAPI> {
    static readonly INSTANCE: ClientAPI;
    addWaypoint(modId: string, waypoint: Waypoint): void;
    addWaypointGroup(waypointGroup: WaypointGroup): void;
    disableFeature(dimension: ResourceKey<Level>, mapType: MapType, enable: boolean): void;
    exists(displayable: Displayable): boolean;
    flagOverlaysForRerender(): void;
    get allWaypointGroups(): WaypointGroup[];
    get allWaypoints(): Waypoint[];
    get clientEventManager(): ClientEventManager;
    get lastUIState(): UIState;
    get modId(): string;
    get worldId(): string;
    getAllWaypoints(dim: ResourceKey<Level>): Waypoint[];
    getDataPath(modId: string): File;
    getDrawSteps(list: OverlayDrawStep[], uiState: UIState): void;
    getOverlays(modId: string, dimension: ResourceKey<Level>): HashBasedTable<string, Overlay, OverlayDrawStep>;
    getUIState(ui: UI): UIState;
    getWaypoint(modId: string, guid: string): Waypoint;
    getWaypointGroup(groupId: string): WaypointGroup;
    getWaypointGroupByName(modid: string, name: string): WaypointGroup;
    getWaypointGroups(modId: string): WaypointGroup[];
    getWaypoints(modId: string): Waypoint[];
    initialize(jmClientApi: IClientAPI): void;
    isDrawStepsUpdateNeeded(): boolean;
    minimapEnabled(): boolean;
    playerAccepts(modId: string, displayType: DisplayType): boolean;
    purge(): void;
    refreshDataPathCache(flush: boolean): void;
    remove(displayable: Displayable): void;
    removeAll(modId: string, displayType: DisplayType): void;
    removeAll(modId: string): void;
    removeAllWaypoints(modId: string): void;
    removeWaypoint(modId: string, waypoint: Waypoint): void;
    removeWaypointGroup(waypointGroup: WaypointGroup, deleteWaypoints: boolean): void;
    removeWaypointGroups(modId: string, deleteWaypoints: boolean): void;
    requestMapTile(modId: string, dimension: ResourceKey<Level>, apiMapType: MapType, startChunk: ChunkPos, endChunk: ChunkPos, chunkY: number, zoom: number, showGrid: boolean, callback: Consumer<NativeImage>): void;
    show(displayable: Displayable): void;
    toggleMinimap(enable: boolean): void;
    static valueOf(name: string): ClientAPI;
    static values(): ClientAPI[];
  }


  class ClientEventManager {
    constructor(plugins: Collection<PluginWrapper>);
    fireMappingEvent(started: boolean, dimension: ResourceKey<Level>): void;
    fireNextClientEvents(): void;
    queueDisplayUpdateEvent(clientEvent: DisplayUpdateEvent): void;
  }


  class DisplayUpdateEventThrottle {
    add(event: DisplayUpdateEvent): void;
    isReady(): boolean;
    iterator(): Iterator<DisplayUpdateEvent>;
  }


  class EntityRegistrationFactory {
    get ambient(): Class<Entity>[];
    get entities(): Class<Entity>[];
    get hostiles(): Class<Entity>[];
    static get instance(): EntityRegistrationFactory;
    get passives(): Class<Entity>[];
    get villagers(): Class<Entity>[];
    static init(): void;
  }


  interface InfoSlotFactory extends InfoSlotRegistrar {}
  class InfoSlotFactory extends InfoSlotRegistrar {
    register(modId: string, component: Component, cacheMillis: number, supplier: Supplier<Component>): void;
  }


  class OptionsDisplayFactory {
    static readonly PROPERTIES_REGISTRY: Map;
    static readonly MOD_FIELD_REGISTRY: Map;
    constructor();
    buildAddonProperties(): OptionsDisplayFactory;
    static get allFields(): Map<string, ConfigField<any>>;
    load(): OptionsDisplayFactory;
    static register(modId: string, prop: AddonProperties): void;
    static register(modId: string, fieldMap: Map<string, ConfigField<any>>): void;
    save(): void;
  }


  class PluginWrapper {
    constructor(plugin: IClientPlugin);
    add(waypoint: Waypoint): void;
    equals(o: any): boolean;
    exists(displayable: Displayable): boolean;
    get waypoints(): Waypoint[];
    getDrawSteps(list: OverlayDrawStep[], uiState: UIState): void;
    getOverlays(dimension: ResourceKey<Level>): HashBasedTable<string, Overlay, OverlayDrawStep>;
    getWaypoint(guid: string): Waypoint;
    hashCode(): number;
    remove(displayable: Displayable): void;
    remove(wp: Waypoint): void;
    removeAll(displayType: DisplayType): void;
    removeAllWaypoints(): void;
    show(displayable: Displayable): void;
    toString(): string;
  }


  interface ThemeButtonDisplayFactory extends ThemeButtonDisplay, ThemeFactory {}
  class ThemeButtonDisplayFactory extends ThemeButtonDisplay {
    constructor(theme: Theme);
    addThemeButton(labelOn: string, labelOff: string, icon: ResourceLocation, onPress: Action): IThemeButton;
    addThemeButton(label: string, icon: ResourceLocation, onPress: Action): IThemeButton;
    addThemeToggleButton(labelOn: string, labelOff: string, icon: ResourceLocation, toggled: boolean, onPress: Action): IThemeButton;
    addThemeToggleButton(label: string, icon: ResourceLocation, toggled: boolean, onPress: Action): IThemeButton;
    get themeButtonList(): ThemeButton[];
  }


  class ThemeFactory {
    getThemeButton(labelOn: string, labelOff: string, icon: ResourceLocation, onPress: Action): ThemeButton;
    getThemeButton(label: string, icon: ResourceLocation, onPress: Action): ThemeButton;
    getThemeToggleButton(labelOn: string, labelOff: string, icon: ResourceLocation, onPress: Action): ThemeButton;
    getThemeToggleButton(label: string, icon: ResourceLocation, onPress: Action): ThemeButton;
  }


  interface ThemeToolbarDisplayFactory extends CustomToolBarBuilder, ThemeFactory {}
  class ThemeToolbarDisplayFactory extends CustomToolBarBuilder {
    constructor(theme: Theme, fullscreen: Fullscreen);
    get toolbarList(): ThemeToolbar[];
    getNewToolbar(...themeButtons: IThemeButton[]): IThemeToolBar;
  }

}

declare module 'journeymap.api.client.impl.BlockInfo' {
  import { BlockInfo } from 'journeymap.api.client.impl';
  import { BlockPos } from 'net.minecraft.core';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { LevelChunk } from 'net.minecraft.world.level.chunk';
  import { ChunkPos } from 'net.minecraft.world.level';
  import { Integer } from 'java.lang';

  class Builder {
    build(): BlockInfo;
    withBiome(biome: Biome): Builder;
    withBlock(block: Block): Builder;
    withBlockPos(blockPos: BlockPos): Builder;
    withBlockState(blockState: BlockState): Builder;
    withChunk(chunk: LevelChunk): Builder;
    withChunkPos(chunkPos: ChunkPos): Builder;
    withRegionX(regionX: number): Builder;
    withRegionZ(regionZ: number): Builder;
  }

}

declare module 'journeymap.api.client.impl.DisplayUpdateEventThrottle' {
  class Queue {
  }

}

declare module 'journeymap.api.client.impl.ModPopupMenuImpl' {
  import { Action } from 'ModPopupMenu';
  import { BlockPos } from 'net.minecraft.core';
  import { Button } from 'journeymap.client.ui.component.buttons';

  class MenuItem {
    constructor(label: string, action: Action);

    constructor(label: string, subMenu: SubMenuAction, autoClose: boolean);
    get action(): Action;
    get label(): string;
    get subMenuAction(): SubMenuAction;
    isAutoCloseable(): boolean;
  }


  interface SubMenuAction extends Action {}
  class SubMenuAction extends Action {
    doAction(blockPos: BlockPos): void;
    doAction(var1: BlockPos, var2: Button): void;
    onHoverState(var1: BlockPos, var2: Button, var3: boolean): void;
  }

}

declare module 'journeymap.api.plugins' {
  import { IClientPlugin, IClientAPI } from 'journeymap.api.v2.client';

  interface LoadedChunkOverlayPlugin extends IClientPlugin {}
  class LoadedChunkOverlayPlugin extends IClientPlugin {
    displayOverlay(packet: string): void;
    static get instance(): LoadedChunkOverlayPlugin;
    get modId(): string;
    initialize(api: IClientAPI): void;
  }


  interface PokemonOptionsPlugin extends IClientPlugin {}
  class PokemonOptionsPlugin extends IClientPlugin {
    constructor(modId: string);
    static get instance(): PokemonOptionsPlugin;
    get modId(): string;
    static hasPokemonMod(): boolean;
    initialize(iClientAPI: IClientAPI): void;
    showPokemon(): boolean;
  }

}

declare module 'journeymap.api.services' {
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
  import { JourneyMapEvent } from 'journeymap.api.v2.common.event.impl';
  import { Listener } from 'EventImpl';
  import { Class } from 'java.lang';

  class ClientPlatformService {
    static readonly DEFAULT_WATER_COLOR: number;
    get farPlane(): number;
    getFluidTint(var1: BlockMD): number;
    getKeyBinding(var1: string, var2: KeyConflictContext, var3: KeyModifier, var4: Type, var5: number, var6: string, var7: KeyEventHandler): UpdateAwareKeyBinding;
    getQuads(var1: BakedModel, var2: BlockState, var3: Direction, var4: BlockPos, var5: RenderType): BakedQuad[];
    getTextureAtlasSprite(var1: BlockMD): TextureAtlasSprite;
  }


  class CommonPlatformService {
    get clientPluginScanResult(): string[];
    get loader(): Loader;
    get loaderVersion(): string;
    get modNames(): string;
    get mods(): ArrayList<string>;
    get obfHelper(): ObfuscationHelper;
    get server(): MinecraftServer;
    getModFileLocation(var1: string): URL;
    getModName(var1: string): string;
    getModVersion(var1: string): string;
    isClient(): boolean;
    isDedicatedServer(): boolean;
    isModLoaded(var1: string): boolean;
    isOp(var1: Player): boolean;
  }


  class EventBus {
    static getEventListeners<T extends JourneyMapEvent>(event: T): Listener<JourneyMapEvent>[];
    static hasListeners<T extends JourneyMapEvent>(event: T): boolean;
    static pluginHasListeners<T extends JourneyMapEvent>(modId: string, event: T): boolean;
    static post<T extends JourneyMapEvent>(event: T): T;
  }


  class Services {
    static readonly WEB_MAP_SERVICE: WebMapService;
    static readonly CLIENT_SERVICE: ClientPlatformService;
    static readonly COMMON_SERVICE: CommonPlatformService;
    static load<T>(clazz: Class<T>): T;
  }


  class WebMapService {
    get port(): number;
    get version(): string;
    start(): void;
    stop(): void;
  }

}

declare module 'journeymap.api.services.CommonPlatformService' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Loader extends Enum<Loader> {}
  class Loader extends Enum<Loader> {
    static readonly FORGE: Loader;
    static readonly FABRIC: Loader;
    static readonly QUILT: Loader;
    static valueOf(name: string): Loader;
    static values(): Loader[];
  }

}