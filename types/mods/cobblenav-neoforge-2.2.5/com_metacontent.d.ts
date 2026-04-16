declare module 'com.metacontent.cobblenav.api.fishingcontext' {
  import { JsonDataRegistry } from 'com.cobblemon.mod.common.api.data';
  import { CloudList } from 'com.metacontent.cobblenav.api.fishingcontext.CloudRepository';
  import { Gson } from 'com.google.gson';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { SimpleObservable } from 'com.cobblemon.mod.common.api.reactive';
  import { PackType } from 'net.minecraft.server.packs';
  import { TypeToken } from 'com.google.gson.reflect';
  import { Set, Map } from 'java.util';
  import { ServerPlayer } from 'net.minecraft.server.level';

  interface CloudRepository extends JsonDataRegistry<CloudList> {}
  class CloudRepository extends JsonDataRegistry<CloudList> {
    static readonly INSTANCE: CloudRepository;
    get clouds(): Set<ResourceLocation>;
    get gson(): Gson;
    get id(): ResourceLocation;
    get observable(): SimpleObservable<CloudRepository>;
    get resourcePath(): string;
    get type(): PackType;
    get typeToken(): TypeToken<CloudList>;
    reload(data: Map<ResourceLocation, CloudList>): void;
    sync(player: ServerPlayer): void;
  }

}

declare module 'com.metacontent.cobblenav.api.fishingcontext.CloudRepository' {
  import { Boolean } from 'java.lang';
  import { List } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';

  class CloudList {
    constructor(replace: boolean, ids: ResourceLocation[]);
    component1(): boolean;
    component2(): ResourceLocation[];
    copy(replace: boolean, ids: ResourceLocation[]): CloudList;
    static copy$default(cloudList: CloudList, bl: boolean, list: List, n: number, object: any): CloudList;
    equals(other: any): boolean;
    get ids(): ResourceLocation[];
    get replace(): boolean;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'com.metacontent.cobblenav.api.platform' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { HashSet, Map, Set } from 'java.util';
  import { Vector2i } from 'org.joml';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { JsonDataRegistry } from 'com.cobblemon.mod.common.api.data';
  import { Gson } from 'com.google.gson';
  import { SimpleObservable } from 'com.cobblemon.mod.common.api.reactive';
  import { PackType } from 'net.minecraft.server.packs';
  import { TypeToken } from 'com.google.gson.reflect';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Float } from 'java.lang';

  class BiomePlatform {
    constructor(id: ResourceLocation, conditions: HashSet<PlatformCondition>, anticonditions: HashSet<PlatformCondition>);
    component1(): ResourceLocation;
    component2(): HashSet<PlatformCondition>;
    component3(): HashSet<PlatformCondition>;
    copy(id: ResourceLocation, conditions: HashSet<PlatformCondition>, anticonditions: HashSet<PlatformCondition>): BiomePlatform;
    static copy$default(biomePlatform: BiomePlatform, resourceLocation: ResourceLocation, hashSet: HashSet, hashSet2: HashSet, n: number, object: any): BiomePlatform;
    equals(other: any): boolean;
    get anticonditions(): HashSet<PlatformCondition>;
    get conditions(): HashSet<PlatformCondition>;
    get id(): ResourceLocation;
    hashCode(): number;
    toString(): string;
  }


  class BiomePlatformRenderData {
    constructor(id: ResourceLocation, platform: ResourceLocation, details: ResourceLocation, platformHighlighting: HoverHighlighting, detailsHighlighting: HoverHighlighting, hoveredPokemonOffset: Vector2i);

    constructor(resourceLocation: ResourceLocation, resourceLocation2: ResourceLocation, resourceLocation3: ResourceLocation, hoverHighlighting: HoverHighlighting, hoverHighlighting2: HoverHighlighting, vector2i: Vector2i, n: number, defaultConstructorMarker: DefaultConstructorMarker);
    component1(): ResourceLocation;
    component2(): ResourceLocation;
    component3(): ResourceLocation;
    component4(): HoverHighlighting;
    component5(): HoverHighlighting;
    component6(): Vector2i;
    copy(id: ResourceLocation, platform: ResourceLocation, details: ResourceLocation, platformHighlighting: HoverHighlighting, detailsHighlighting: HoverHighlighting, hoveredPokemonOffset: Vector2i): BiomePlatformRenderData;
    static copy$default(biomePlatformRenderData: BiomePlatformRenderData, resourceLocation: ResourceLocation, resourceLocation2: ResourceLocation, resourceLocation3: ResourceLocation, hoverHighlighting: HoverHighlighting, hoverHighlighting2: HoverHighlighting, vector2i: Vector2i, n: number, object: any): BiomePlatformRenderData;
    equals(other: any): boolean;
    get details(): ResourceLocation;
    get detailsHighlighting(): HoverHighlighting;
    get hoveredPokemonOffset(): Vector2i;
    get id(): ResourceLocation;
    get platform(): ResourceLocation;
    get platformHighlighting(): HoverHighlighting;
    getPokemonXOffset(hovered: boolean): number;
    getPokemonYOffset(hovered: boolean): number;
    hashCode(): number;
    renderDetails(poseStack: PoseStack, x: number, y: number, width: number, height: number, hovered: boolean): void;
    renderPlatform(poseStack: PoseStack, x: number, y: number, width: number, height: number, hovered: boolean): void;
    toString(): string;
  }


  interface BiomePlatformRenderDataRepository extends JsonDataRegistry<BiomePlatformRenderData> {}
  class BiomePlatformRenderDataRepository extends JsonDataRegistry<BiomePlatformRenderData> {
    static readonly INSTANCE: BiomePlatformRenderDataRepository;
    get(id: ResourceLocation): BiomePlatformRenderData;
    get dEFAULT(): BiomePlatformRenderData;
    get fISHING(): BiomePlatformRenderData;
    get gson(): Gson;
    get id(): ResourceLocation;
    get observable(): SimpleObservable<BiomePlatformRenderDataRepository>;
    get resourcePath(): string;
    get type(): PackType;
    get typeToken(): TypeToken<BiomePlatformRenderData>;
    reload(data: Map<ResourceLocation, BiomePlatformRenderData>): void;
    sync(player: ServerPlayer): void;
  }


  interface BiomePlatforms extends JsonDataRegistry<BiomePlatform> {}
  class BiomePlatforms extends JsonDataRegistry<BiomePlatform> {
    static readonly INSTANCE: BiomePlatforms;
    firstFitting(context: SpawnDataContext): ResourceLocation;
    get gson(): Gson;
    get id(): ResourceLocation;
    get observable(): SimpleObservable<BiomePlatforms>;
    get resourcePath(): string;
    get type(): PackType;
    get typeToken(): TypeToken<BiomePlatform>;
    reload(data: Map<ResourceLocation, BiomePlatform>): void;
    sync(player: ServerPlayer): void;
  }


  class DimensionPlate {
    constructor(dimension: ResourceLocation, texture: ResourceLocation, highlighting: HoverHighlighting);

    constructor(resourceLocation: ResourceLocation, resourceLocation2: ResourceLocation, hoverHighlighting: HoverHighlighting, n: number, defaultConstructorMarker: DefaultConstructorMarker);
    component1(): ResourceLocation;
    component2(): ResourceLocation;
    component3(): HoverHighlighting;
    copy(dimension: ResourceLocation, texture: ResourceLocation, highlighting: HoverHighlighting): DimensionPlate;
    static copy$default(dimensionPlate: DimensionPlate, resourceLocation: ResourceLocation, resourceLocation2: ResourceLocation, hoverHighlighting: HoverHighlighting, n: number, object: any): DimensionPlate;
    equals(other: any): boolean;
    get dimension(): ResourceLocation;
    get highlighting(): HoverHighlighting;
    get texture(): ResourceLocation;
    hashCode(): number;
    render(poseStack: PoseStack, x: number, y: number, width: number, height: number, hovered: boolean): void;
    toString(): string;
  }


  interface DimensionPlateRepository extends JsonDataRegistry<DimensionPlate> {}
  class DimensionPlateRepository extends JsonDataRegistry<DimensionPlate> {
    static readonly INSTANCE: DimensionPlateRepository;
    get(dimension: ResourceLocation): DimensionPlate;
    get dEFAULT(): DimensionPlate;
    get fISHING(): DimensionPlate;
    get gson(): Gson;
    get id(): ResourceLocation;
    get observable(): SimpleObservable<DimensionPlateRepository>;
    get resourcePath(): string;
    get type(): PackType;
    get typeToken(): TypeToken<DimensionPlate>;
    reload(data: Map<ResourceLocation, DimensionPlate>): void;
    sync(player: ServerPlayer): void;
  }


  class HoverHighlighting {
    constructor(offset: Vector2i, texture: ResourceLocation, tintOffset: number);

    constructor(vector2i: Vector2i, resourceLocation: ResourceLocation, f: number, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor();
    component1(): Vector2i;
    component2(): ResourceLocation;
    component3(): number;
    copy(offset: Vector2i, texture: ResourceLocation, tintOffset: number): HoverHighlighting;
    static copy$default(hoverHighlighting: HoverHighlighting, vector2i: Vector2i, resourceLocation: ResourceLocation, f: number, n: number, object: any): HoverHighlighting;
    equals(other: any): boolean;
    get offset(): Vector2i;
    get texture(): ResourceLocation;
    get tintOffset(): number;
    hashCode(): number;
    toString(): string;
  }


  class PlatformCondition {
    constructor(id: string, biome: ResourceLocation, structure: ResourceLocation, fluid: ResourceLocation);

    constructor(string: string, resourceLocation: ResourceLocation, resourceLocation2: ResourceLocation, resourceLocation3: ResourceLocation, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor();
    anyMatches(context: SpawnDataContext): boolean;
    component1(): string;
    component2(): ResourceLocation;
    component3(): ResourceLocation;
    component4(): ResourceLocation;
    copy(id: string, biome: ResourceLocation, structure: ResourceLocation, fluid: ResourceLocation): PlatformCondition;
    static copy$default(platformCondition: PlatformCondition, string: string, resourceLocation: ResourceLocation, resourceLocation2: ResourceLocation, resourceLocation3: ResourceLocation, n: number, object: any): PlatformCondition;
    equals(other: any): boolean;
    get biome(): ResourceLocation;
    get fluid(): ResourceLocation;
    get id(): string;
    get structure(): ResourceLocation;
    hashCode(): number;
    toString(): string;
  }


  class SpawnDataContext {
    constructor(detailId: string, biomes: Set<ResourceLocation>, structures: Set<ResourceLocation>, fluid: ResourceLocation);
    component1(): string;
    component2(): Set<ResourceLocation>;
    component3(): Set<ResourceLocation>;
    component4(): ResourceLocation;
    copy(detailId: string, biomes: Set<ResourceLocation>, structures: Set<ResourceLocation>, fluid: ResourceLocation): SpawnDataContext;
    static copy$default(spawnDataContext: SpawnDataContext, string: string, set: Set, set2: Set, resourceLocation: ResourceLocation, n: number, object: any): SpawnDataContext;
    equals(other: any): boolean;
    get biomes(): Set<ResourceLocation>;
    get detailId(): string;
    get fluid(): ResourceLocation;
    get structures(): Set<ResourceLocation>;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'com.metacontent.cobblenav.api.platform.SpawnDataContext' {
  import { Set } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { SpawnDataContext } from 'com.metacontent.cobblenav.api.platform';

  class Builder {
    build(): SpawnDataContext;
    get biomes(): Set<ResourceLocation>;
    get detailId(): string;
    get fluid(): ResourceLocation;
    get structures(): Set<ResourceLocation>;
    set biomes(set: Set<ResourceLocation>);
    set detailId(string: string);
    set fluid(resourceLocation: ResourceLocation);
    set structures(set: Set<ResourceLocation>);
  }

}

declare module 'com.metacontent.cobblenav.client' {
  import { ClientCobblenavConfig } from 'com.metacontent.cobblenav.config';
  import { PokenavSettings, PokefinderSettings } from 'com.metacontent.cobblenav.client.settings';
  import { PokefinderOverlay, TrackArrowOverlay } from 'com.metacontent.cobblenav.client.gui.overlay';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { DeltaTracker } from 'net.minecraft.client';
  import { ResourceManager } from 'net.minecraft.server.packs.resources';

  class ClientImplementation {
  }


  class CobblenavClient {
    static readonly INSTANCE: CobblenavClient;
    static implementation: ClientImplementation;
    static config: ClientCobblenavConfig;
    get config(): ClientCobblenavConfig;
    get implementation(): ClientImplementation;
    get pokefinderOverlay(): PokefinderOverlay;
    get pokefinderSettings(): PokefinderSettings;
    get pokenavSettings(): PokenavSettings;
    get trackArrowOverlay(): TrackArrowOverlay;
    init(implementation: ClientImplementation): void;
    reloadAssets(resourceManager: ResourceManager): void;
    renderOverlay(guiGraphics: GuiGraphics, deltaTracker: DeltaTracker): void;
    set config(clientCobblenavConfig: ClientCobblenavConfig);
    set implementation(clientImplementation: ClientImplementation);
    set pokefinderSettings(pokefinderSettings: PokefinderSettings);
    set pokenavSettings(pokenavSettings: PokenavSettings);
  }

}

declare module 'com.metacontent.cobblenav.client.gui.overlay' {
  import { Gui, GuiGraphics } from 'net.minecraft.client.gui';
  import { Companion } from 'com.metacontent.cobblenav.client.gui.overlay.PokefinderOverlay';
  import { DeltaTracker } from 'net.minecraft.client';

  interface PokefinderOverlay extends Gui {}
  class PokefinderOverlay extends Gui {
    static readonly Companion: Companion;
    static readonly WIDTH: number;
    static readonly HEIGHT: number;
    static readonly COMPASS_WIDTH: number;
    static readonly COMPASS_HEIGHT: number;
    static readonly COMPASS_OFFSET: number;
    static readonly RADAR_SCALE: number;
    constructor();
    initialize(): void;
    render(guiGraphics: GuiGraphics, deltaTracker: DeltaTracker): void;
  }


  interface TrackArrowOverlay extends Gui {}
  class TrackArrowOverlay extends Gui {
    constructor();
    get entityId(): number;
    get tracking(): boolean;
    render(guiGraphics: GuiGraphics, deltaTracker: DeltaTracker): void;
    set entityId(value: number);
    set tracking(bl: boolean);
  }

}

declare module 'com.metacontent.cobblenav.client.gui.overlay.PokefinderOverlay' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get bACKGROUND(): ResourceLocation;
    get cOMPASS(): ResourceLocation;
  }

}

declare module 'com.metacontent.cobblenav.client.gui.screen' {
  import { PokenavOS } from 'com.metacontent.cobblenav.os';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { SpawnDataWidget } from 'com.metacontent.cobblenav.client.gui.widget.location';

  interface MainScreen extends PokenavScreen {}
  class MainScreen extends PokenavScreen {
    constructor(os: PokenavOS, makeOpeningSound: boolean, animateOpening: boolean);

    constructor(pokenavOS: PokenavOS, bl: boolean, bl2: boolean, n: number, defaultConstructorMarker: DefaultConstructorMarker);
    get color(): number;
    initScreen(): void;
    renderOnBackLayer(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }


  interface MapScreen extends PokenavScreen {}
  class MapScreen extends PokenavScreen {
    constructor(os: PokenavOS, makeOpeningSound: boolean, animateOpening: boolean);

    constructor(pokenavOS: PokenavOS, bl: boolean, bl2: boolean, n: number, defaultConstructorMarker: DefaultConstructorMarker);
    get color(): number;
    initScreen(): void;
    renderOnBackLayer(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }


  class SpawnDataTooltipDisplayer {
    get hoveredWidget(): SpawnDataWidget;
    isBlockingTooltip(): boolean;
    set hoveredWidget(var1: SpawnDataWidget);
  }


  interface WelcomeScreen extends PokenavScreen {}
  class WelcomeScreen extends PokenavScreen {
    constructor(os: PokenavOS, makeOpeningSound: boolean, animateOpening: boolean);

    constructor(pokenavOS: PokenavOS, bl: boolean, bl2: boolean, n: number, defaultConstructorMarker: DefaultConstructorMarker);
    get color(): number;
    initScreen(): void;
    renderOnBackLayer(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }

}

declare module 'com.metacontent.cobblenav.client.gui.util' {
  import { Companion } from 'com.metacontent.cobblenav.client.gui.util.RGB';
  import { Enum } from 'java.lang';
  import { EnumEntries } from 'kotlin.enums';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { SpawnData } from 'com.metacontent.cobblenav.spawndata';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { List } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';

  class RGB {
    static readonly Companion: Companion;
    static readonly MAX_VALUE: number;
    constructor(r: number, g: number, b: number);
    blue(): number;
    component1(): number;
    component2(): number;
    component3(): number;
    copy(r: number, g: number, b: number): RGB;
    static copy$default(rGB: RGB, n: number, n2: number, n3: number, n4: number, object: any): RGB;
    equals(other: any): boolean;
    get b(): number;
    get g(): number;
    get r(): number;
    green(): number;
    hashCode(): number;
    red(): number;
    toColor(opacity: number): number;
    static toColor$default(rGB: RGB, n: number, n2: number, object: any): number;
    toString(): string;
  }


  interface Sorting extends Enum<Sorting> {}
  class Sorting extends Enum<Sorting> {
    static readonly ASCENDING: Sorting;
    static readonly DESCENDING: Sorting;
    static get entries(): EnumEntries<Sorting>;
    get multiplier(): number;
    static valueOf(value: string): Sorting;
    static values(): Sorting[];
  }


  class Timer {
    constructor(duration: number, loop: boolean);

    constructor(f: number, bl: boolean, n: number, defaultConstructorMarker: DefaultConstructorMarker);
    get loop(): boolean;
    get progress(): number;
    isOver(): boolean;
    reset(): void;
    reset(duration: number): void;
    set loop(bl: boolean);
    tick(delta: number): void;
  }


  class TooltipUtilsKt {
    static renderAdvancedTooltip($this$renderAdvancedTooltip: GuiGraphics, header: MutableComponent, body: MutableComponent[], items: ItemStack[], mouseX: number, mouseY: number, x1: number, y1: number, x2: number, y2: number, lineHeight: number, bodyHeight: number, opacity: number, headerColor: number, headerOutlineColor: number, bodyColor: number, bodyOutlineColor: number, blur: number, delta: number): void;
    static renderAdvancedTooltip$default(guiGraphics: GuiGraphics, mutableComponent: MutableComponent, list: List, list2: List, n: number, n2: number, n3: number, n4: number, n5: number, n6: number, n7: number, n8: number, f: number, n9: number, n10: number, n11: number, n12: number, f2: number, f3: number, n13: number, object: any): void;
    static renderMultilineTextTooltip($this$renderMultilineTextTooltip: GuiGraphics, header: MutableComponent, body: MutableComponent, targetWidth: number, mouseX: number, mouseY: number, x1: number, y1: number, x2: number, y2: number, lineHeight: number, opacity: number, headerColor: number, delta: number): void;
    static renderMultilineTextTooltip$default(guiGraphics: GuiGraphics, mutableComponent: MutableComponent, mutableComponent2: MutableComponent, n: number, n2: number, n3: number, n4: number, n5: number, n6: number, n7: number, n8: number, f: number, n9: number, f2: number, n10: number, object: any): void;
    static renderSpawnDataTooltip($this$renderSpawnDataTooltip: GuiGraphics, spawnData: SpawnData, chanceMultiplier: number, mouseX: number, mouseY: number, x1: number, y1: number, x2: number, y2: number, lineHeight: number, opacity: number, delta: number): void;
    static renderSpawnDataTooltip$default(guiGraphics: GuiGraphics, spawnData: SpawnData, f: number, n: number, n2: number, n3: number, n4: number, n5: number, n6: number, n7: number, f2: number, f3: number, n8: number, object: any): void;
  }

}

declare module 'com.metacontent.cobblenav.client.gui.util.RGB' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
  }

}

declare module 'com.metacontent.cobblenav.client.gui.widget.button' {
  import { Companion } from 'com.metacontent.cobblenav.client.gui.widget.button.CheckBox';
  import { MutableComponent, Component } from 'net.minecraft.network.chat';
  import { Function1 } from 'kotlin.jvm.functions';
  import { Unit } from 'kotlin';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Companion as com_metacontent_cobblenav_client_gui_widget_button_infobutton_Companion } from 'com.metacontent.cobblenav.client.gui.widget.button.InfoButton';
  import { PokenavScreen } from 'com.metacontent.cobblenav.client.gui.screen';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { CobblemonRenderable } from 'com.cobblemon.mod.common.client.gui';
  import { SoundManager } from 'net.minecraft.client.sounds';

  interface CheckBox extends PokenavButton {}
  class CheckBox extends PokenavButton {
    static readonly Companion: Companion;
    constructor(pX: number, pY: number, pHeight: number, pWidth: number, textOffset: number, disabled: boolean, text: MutableComponent, shadow: boolean, bl: boolean, afterClick: Function1<PokenavButton, Unit>);

    constructor(n: number, n2: number, n3: number, n4: number, n5: number, bl: boolean, mutableComponent: MutableComponent, bl2: boolean, bl3: boolean, function1: Function1, n6: number, defaultConstructorMarker: DefaultConstructorMarker);
    get checked(): boolean;
    set checked(bl: boolean);
  }


  interface IconButton extends PokenavButton {}
  class IconButton extends PokenavButton {
    constructor(pX: number, pY: number, pWidth: number, pHeight: number, disabled: boolean, action: Function1<PokenavButton, Unit>, texture: ResourceLocation, message: Component, textureWidth: number, textureHeight: number, uOffset: number, vOffset: number);

    constructor(n: number, n2: number, n3: number, n4: number, bl: boolean, function1: Function1, resourceLocation: ResourceLocation, component: Component, n5: number, n6: number, n7: number, n8: number, n9: number, defaultConstructorMarker: DefaultConstructorMarker);
    get texture(): ResourceLocation;
    set texture(resourceLocation: ResourceLocation);
  }


  interface InfoButton extends IconButton {}
  class InfoButton extends IconButton {
    static readonly Companion: com_metacontent_cobblenav_client_gui_widget_button_infobutton_Companion;
    static readonly TARGET_WIDTH: number;
    constructor(pX: number, pY: number, pWidth: number, pHeight: number, header: MutableComponent, body: MutableComponent, texture: ResourceLocation, textureWidth: number, textureHeight: number, uOffset: number, vOffset: number, parent: PokenavScreen, headerColor: number);

    constructor(n: number, n2: number, n3: number, n4: number, mutableComponent: MutableComponent, mutableComponent2: MutableComponent, resourceLocation: ResourceLocation, n5: number, n6: number, n7: number, n8: number, pokenavScreen: PokenavScreen, n9: number, n10: number, defaultConstructorMarker: DefaultConstructorMarker);
  }


  interface PokenavButton extends CobblemonRenderable, AbstractWidget {}
  class PokenavButton extends CobblemonRenderable {
    constructor(pX: number, pY: number, pWidth: number, pHeight: number, message: Component, disabled: boolean, action: Function1<PokenavButton, Unit>);
    activate(): void;
    get disabled(): boolean;
    isHovered(mouseX: number, mouseY: number): boolean;
    onClick(d: number, e: number): void;
    playDownSound(soundManager: SoundManager): void;
    set disabled(bl: boolean);
  }


  interface TextButton extends PokenavButton {}
  class TextButton extends PokenavButton {
    constructor(pX: number, pY: number, pWidth: number, pHeight: number, disabled: boolean, action: Function1<PokenavButton, Unit>, texture: ResourceLocation, text: MutableComponent, textureWidth: number, textureHeight: number, uOffset: number, vOffset: number, shadow: boolean);

    constructor(n: number, n2: number, n3: number, n4: number, bl: boolean, function1: Function1, resourceLocation: ResourceLocation, mutableComponent: MutableComponent, n5: number, n6: number, n7: number, n8: number, bl2: boolean, n9: number, defaultConstructorMarker: DefaultConstructorMarker);
    get texture(): ResourceLocation;
    set texture(resourceLocation: ResourceLocation);
  }

}

declare module 'com.metacontent.cobblenav.client.gui.widget.button.CheckBox' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get cHECKMARK(): ResourceLocation;
    get cOLOR(): number;
  }

}

declare module 'com.metacontent.cobblenav.client.gui.widget.button.InfoButton' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get tEXTURE(): ResourceLocation;
  }

}

declare module 'com.metacontent.cobblenav.client.gui.widget' {
  import { SoundlessWidget } from 'com.cobblemon.mod.common.client.gui.summary.widgets';
  import { Companion } from 'com.metacontent.cobblenav.client.gui.widget.NotificationWidget';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { Companion as com_metacontent_cobblenav_client_gui_widget_statusbarwidget_Companion } from 'com.metacontent.cobblenav.client.gui.widget.StatusBarWidget';
  import { EditBox } from 'net.minecraft.client.gui.components';
  import { Function1 } from 'kotlin.jvm.functions';
  import { Unit } from 'kotlin';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface ContainerWidget<T extends AbstractWidget = any> extends SoundlessWidget {}
  class ContainerWidget<T extends AbstractWidget = any> extends SoundlessWidget {
    constructor(child: T);
    get child(): T;
    get height(): number;
    get width(): number;
    get x(): number;
    get y(): number;
    set height(i: number);
    set width(i: number);
    set x(i: number);
    set y(i: number);
  }


  interface NotificationWidget extends SoundlessWidget {}
  class NotificationWidget extends SoundlessWidget {
    static readonly Companion: Companion;
    static readonly WIDTH: number;
    static readonly HEIGHT: number;
    constructor(pX: number, pY: number);
    add(text: MutableComponent, duration: number): void;
    static add$default(notificationWidget: NotificationWidget, mutableComponent: MutableComponent, f: number, n: number, object: any): void;
  }


  interface StatusBarWidget extends SoundlessWidget {}
  class StatusBarWidget extends SoundlessWidget {
    static readonly Companion: com_metacontent_cobblenav_client_gui_widget_statusbarwidget_Companion;
    static readonly DECORATION_WIDTH: number;
    static readonly CLOCKS_WIDTH: number;
    static readonly SPACE: number;
    static readonly WIDTH: number;
    static readonly HEIGHT: number;
    static readonly TEXT_SCALE: number;
    constructor(x: number, y: number);
  }


  interface TextFieldWidget extends EditBox {}
  class TextFieldWidget extends EditBox {
    constructor(fieldX: number, fieldY: number, width: number, height: number, string: string, fillColor: number, outlineColor: number, focusedOutlineColor: number, hint: MutableComponent, onFinish: Function1<string, Unit>, onUpdate: Function1<string, Unit>);

    constructor(n: number, n2: number, n3: number, n4: number, string: string, n5: number, n6: number, n7: number, mutableComponent: MutableComponent, function1: Function1, function12: Function1, n8: number, defaultConstructorMarker: DefaultConstructorMarker);
    finish(): void;
    get fieldX(): number;
    get fieldY(): number;
    insertText(string: string): void;
    keyPressed(i: number, j: number, k: number): boolean;
    renderWidget(guiGraphics: GuiGraphics, i: number, j: number, f: number): void;
    setFocused(bl: boolean): void;
    update(): void;
  }

}

declare module 'com.metacontent.cobblenav.client.gui.widget.finder' {
  import { SoundlessWidget } from 'com.cobblemon.mod.common.client.gui.summary.widgets';
  import { Companion } from 'com.metacontent.cobblenav.client.gui.widget.finder.FoundPokemonWidget';
  import { SpawnData } from 'com.metacontent.cobblenav.spawndata';
  import { FoundPokemon } from 'com.metacontent.cobblenav.util.finder';
  import { Companion as com_metacontent_cobblenav_client_gui_widget_finder_statstablewidget_Companion } from 'com.metacontent.cobblenav.client.gui.widget.finder.StatsTableWidget';
  import { PokenavScreen } from 'com.metacontent.cobblenav.client.gui.screen';

  interface FoundPokemonWidget extends SoundlessWidget {}
  class FoundPokemonWidget extends SoundlessWidget {
    static readonly Companion: Companion;
    static readonly RADIUS: number;
    static readonly POKEMON_OFFSET: number;
    static readonly SCALE: number;
    static readonly OPENING: number;
    static readonly LOOP: number;
    static readonly BAR_LENGTH: number;
    static readonly BARS: number;
    static readonly NOTIFICATION_WIDTH: number;
    static readonly NOTIFICATION_HEIGHT: number;
    static readonly NOTIFICATION_OFFSET: number;
    static readonly SHINY_ASPECT: string;
    constructor(x: number, y: number, spawnData: SpawnData, pokemon: FoundPokemon);
    get pokemon(): FoundPokemon;
    get spawnData(): SpawnData;
  }


  interface StatsTableWidget extends SoundlessWidget {}
  class StatsTableWidget extends SoundlessWidget {
    static readonly Companion: com_metacontent_cobblenav_client_gui_widget_finder_statstablewidget_Companion;
    static readonly WIDTH: number;
    static readonly HEIGHT: number;
    static readonly TOP_MARGIN: number;
    static readonly BOTTOM_MARGIN: number;
    static readonly VERTICAL_MARGIN: number;
    static readonly ROW_HEIGHT: number;
    static readonly ICON_WIDTH: number;
    static readonly PADDING: number;
    static readonly TEXT_WIDTH: number;
    static readonly TEXT_VERTICAL_OFFSET: number;
    static readonly TEXT_HORIZONTAL_OFFSET: number;
    static readonly TEXT_SCALE: number;
    static readonly NOTIFICATION_WIDTH: number;
    static readonly NOTIFICATION_HEIGHT: number;
    static readonly NOTIFICATION_OFFSET: number;
    constructor(x: number, y: number, spawnData: SpawnData, pokemon: FoundPokemon, parent: PokenavScreen);
    get parent(): PokenavScreen;
    get pokemon(): FoundPokemon;
    get spawnData(): SpawnData;
  }

}

declare module 'com.metacontent.cobblenav.client.gui.widget.finder.FoundPokemonWidget' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get dECORATIONS_1(): ResourceLocation;
    get dECORATIONS_2(): ResourceLocation;
    get nOTIFICATION(): ResourceLocation;
  }

}

declare module 'com.metacontent.cobblenav.client.gui.widget.finder.StatsTableWidget' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get aBILITY(): ResourceLocation;
    get eGG_MOVE(): ResourceLocation;
    get nAME(): ResourceLocation;
    get nOTIFICATION(): ResourceLocation;
    get tABLE(): ResourceLocation;
    get tYPE(): ResourceLocation;
  }

}

declare module 'com.metacontent.cobblenav.client.gui.widget.fishing' {
  import { TableView } from 'com.metacontent.cobblenav.client.gui.widget.layout';
  import { ScrollableItemWidget } from 'com.metacontent.cobblenav.client.gui.widget.layout.scrollable';
  import { Companion } from 'com.metacontent.cobblenav.client.gui.widget.fishing.BucketViewWidget';
  import { WeightedBucket } from 'com.metacontent.cobblenav.util';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { RGB } from 'com.metacontent.cobblenav.client.gui.util';
  import { SoundlessWidget } from 'com.cobblemon.mod.common.client.gui.summary.widgets';
  import { Companion as com_metacontent_cobblenav_client_gui_widget_fishing_fishingcontextwidget_Companion } from 'com.metacontent.cobblenav.client.gui.widget.fishing.FishingContextWidget';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { Integer } from 'java.lang';
  import { ItemStack } from 'net.minecraft.world.item';
  import { SpawnDataWidget } from 'com.metacontent.cobblenav.client.gui.widget.location';
  import { SpawnData } from 'com.metacontent.cobblenav.spawndata';
  import { SpawnDataTooltipDisplayer } from 'com.metacontent.cobblenav.client.gui.screen';
  import { PoseType } from 'com.cobblemon.mod.common.entity';
  import { Vector3f } from 'org.joml';

  interface BucketViewWidget extends TableView<ScrollableItemWidget> {}
  class BucketViewWidget extends TableView<ScrollableItemWidget> {
    static readonly Companion: Companion;
    static readonly SEPARATOR_HEIGHT: number;
    static readonly BUCKET_PADDING: number;
    static readonly BUCKET_WIDTH: number;
    static readonly DITHERING_HEIGHT: number;
    constructor(x: number, y: number, width: number, columns: number, columnWidth: number, verticalPadding: number, horizontalPadding: number, minHeight: number, depthProgress: number, bucket: WeightedBucket);

    constructor(n: number, n2: number, n3: number, n4: number, n5: number, f: number, f2: number, n6: number, f3: number, weightedBucket: WeightedBucket, n7: number, defaultConstructorMarker: DefaultConstructorMarker);
    get bucket(): WeightedBucket;
    get color(): RGB;
    get depthProgress(): number;
    get minHeight(): number;
    initItems(): void;
  }


  interface FishingContextWidget extends SoundlessWidget {}
  class FishingContextWidget extends SoundlessWidget {
    static readonly Companion: com_metacontent_cobblenav_client_gui_widget_fishing_fishingcontextwidget_Companion;
    static readonly SUN_WIDTH: number;
    static readonly SUN_HEIGHT: number;
    static readonly HOOK_WIDTH: number;
    static readonly HOOK_HEIGHT: number;
    static readonly CLOUD_WIDTH: number;
    static readonly CLOUD_HEIGHT: number;
    static readonly MAX_CLOUD_OPACITY: number;
    static readonly MAX_STARS_OPACITY: number;
    static readonly WINGULL_CHANCE: number;
    constructor(x: number, y: number, width: number, height: number, level: ClientLevel);

    constructor(n: number, n2: number, n3: number, n4: number, clientLevel: ClientLevel, n5: number, defaultConstructorMarker: DefaultConstructorMarker);
    get baitStack(): ItemStack;
    get level(): ClientLevel;
    get lineColor(): number;
    get pokeBallStack(): ItemStack;
    set baitStack(itemStack: ItemStack);
    set lineColor(n: number);
    set pokeBallStack(itemStack: ItemStack);
  }


  interface FishingDataWidget extends SpawnDataWidget {}
  class FishingDataWidget extends SpawnDataWidget {
    constructor(x: number, y: number, spawnData: SpawnData, displayer: SpawnDataTooltipDisplayer, pose: PoseType, pokemonRotation: Vector3f, chanceMultiplier: number);

    constructor(n: number, n2: number, spawnData: SpawnData, spawnDataTooltipDisplayer: SpawnDataTooltipDisplayer, poseType: PoseType, vector3f: Vector3f, f: number, n3: number, defaultConstructorMarker: DefaultConstructorMarker);
  }

}

declare module 'com.metacontent.cobblenav.client.gui.widget.fishing.BucketViewWidget' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { RGB } from 'com.metacontent.cobblenav.client.gui.util';
  import { ResourceLocation } from 'net.minecraft.resources';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get dITHERING(): ResourceLocation;
    get dOWN_COLOR(): RGB;
    get uP_DAY_COLOR(): RGB;
    get uP_NIGHT_COLOR(): RGB;
  }

}

declare module 'com.metacontent.cobblenav.client.gui.widget.fishing.FishingContextWidget' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get hOOK(): ResourceLocation;
    get mOON(): ResourceLocation;
    get sTARS(): ResourceLocation;
    get sUN(): ResourceLocation;
  }

}

declare module 'com.metacontent.cobblenav.client.gui.widget.layout.scrollable' {
  import { ContainerWidget } from 'com.metacontent.cobblenav.client.gui.widget';
  import { PokenavButton } from 'com.metacontent.cobblenav.client.gui.widget.button';
  import { Companion } from 'com.metacontent.cobblenav.client.gui.widget.layout.scrollable.ScrollThumbWidget';
  import { SoundManager } from 'net.minecraft.client.sounds';

  interface ScrollableItemWidget<T extends AbstractWidget = any> extends ContainerWidget<T> {}
  class ScrollableItemWidget<T extends AbstractWidget = any> extends ContainerWidget<T> {
    constructor(child: T, topEdge: number, bottomEdge: number);
    get bottomEdge(): number;
    get topEdge(): number;
  }


  interface ScrollThumbWidget extends PokenavButton {}
  class ScrollThumbWidget extends PokenavButton {
    static readonly Companion: Companion;
    static readonly WIDTH: number;
    constructor(x: number, y: number, parent: ScrollableView);
    get parent(): ScrollableView;
    mouseDragged(d: number, e: number, i: number, f: number, g: number): boolean;
    onClick(d: number, e: number): void;
    onRelease(d: number, e: number): void;
    playDownSound(soundManager: SoundManager): void;
  }

}

declare module 'com.metacontent.cobblenav.client.gui.widget.layout.scrollable.ScrollThumbWidget' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
  }

}

declare module 'com.metacontent.cobblenav.client.gui.widget.layout' {
  import { SoundlessWidget } from 'com.cobblemon.mod.common.client.gui.summary.widgets';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { List } from 'java.util';
  import { Sorting } from 'com.metacontent.cobblenav.client.gui.util';
  import { Function1 } from 'kotlin.jvm.functions';
  import { Comparable } from 'java.lang';
  import { Unit } from 'kotlin';

  interface TableView<I extends AbstractWidget = any> extends SoundlessWidget {}
  class TableView<I extends AbstractWidget = any> extends SoundlessWidget {
    constructor(x: number, y: number, width: number, columns: number, columnWidth: number, verticalGap: number, horizontalGap: number);

    constructor(n: number, n2: number, n3: number, n4: number, n5: number, f: number, f2: number, n6: number, defaultConstructorMarker: DefaultConstructorMarker);
    add(widget: I): void;
    add(widgets: I[]): void;
    applyToAll(consumer: Function1<I, Unit>): void;
    clear(): void;
    get columnWidth(): number;
    get columns(): number;
    get rows(): number;
    initItems(): void;
    isEmpty(): boolean;
    mouseClicked(pMouseX: number, pMouseY: number, pButton: number): boolean;
    resort<T extends Comparable<T>>(sorting: Sorting, extractor: Function1<I, T>): void;
    setX(i: number): void;
    setY(i: number): void;
  }

}

declare module 'com.metacontent.cobblenav.client.gui.widget.location' {
  import { SoundlessWidget } from 'com.cobblemon.mod.common.client.gui.summary.widgets';
  import { Companion } from 'com.metacontent.cobblenav.client.gui.widget.location.BucketSelectorWidget';
  import { LocationScreen, SpawnDataTooltipDisplayer } from 'com.metacontent.cobblenav.client.gui.screen';
  import { Companion as com_metacontent_cobblenav_client_gui_widget_location_locationinfowidget_Companion } from 'com.metacontent.cobblenav.client.gui.widget.location.LocationInfoWidget';
  import { Companion as com_metacontent_cobblenav_client_gui_widget_location_spawndatawidget_Companion } from 'com.metacontent.cobblenav.client.gui.widget.location.SpawnDataWidget';
  import { SpawnData } from 'com.metacontent.cobblenav.spawndata';
  import { Function1 } from 'kotlin.jvm.functions';
  import { Unit } from 'kotlin';
  import { PoseType } from 'com.cobblemon.mod.common.entity';
  import { Vector3f } from 'org.joml';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  interface BucketSelectorWidget extends SoundlessWidget {}
  class BucketSelectorWidget extends SoundlessWidget {
    static readonly Companion: Companion;
    static readonly WIDTH: number;
    static readonly HEIGHT: number;
    static readonly BUTTON_WIDTH: number;
    static readonly BUTTON_HEIGHT: number;
    static readonly SPACE: number;
    static readonly BUCKET_KEY_BASE: string;
    constructor(x: number, y: number, parent: LocationScreen);
  }


  interface LocationInfoWidget extends SoundlessWidget {}
  class LocationInfoWidget extends SoundlessWidget {
    static readonly Companion: com_metacontent_cobblenav_client_gui_widget_location_locationinfowidget_Companion;
    static readonly SYMBOL_WIDTH: number;
    static readonly SYMBOL_HEIGHT: number;
    static readonly SPACE: number;
    static readonly BIOME_WIDTH: number;
    static readonly WIDTH: number;
    static readonly HEIGHT: number;
    static readonly BIOME_KEY_BASE: string;
    constructor(x: number, y: number, biome: string);
  }


  interface SpawnDataWidget extends SoundlessWidget {}
  class SpawnDataWidget extends SoundlessWidget {
    static readonly Companion: com_metacontent_cobblenav_client_gui_widget_location_spawndatawidget_Companion;
    static readonly WIDTH: number;
    static readonly HEIGHT: number;
    static readonly MODEL_HEIGHT: number;
    static readonly POKE_BALL_OFFSET: number;
    static readonly MARK_SIZE: number;
    constructor(x: number, y: number, spawnData: SpawnData, displayer: SpawnDataTooltipDisplayer, onClick: Function1<SpawnDataWidget, Unit>, pose: PoseType, pokemonRotation: Vector3f, chanceMultiplier: number);

    constructor(n: number, n2: number, spawnData: SpawnData, spawnDataTooltipDisplayer: SpawnDataTooltipDisplayer, function1: Function1, poseType: PoseType, vector3f: Vector3f, f: number, n3: number, defaultConstructorMarker: DefaultConstructorMarker);
    get chanceMultiplier(): number;
    get spawnData(): SpawnData;
    isNearby(): boolean;
    mouseClicked(pMouseX: number, pMouseY: number, pButton: number): boolean;
    set chanceMultiplier(value: number);
    setNearby(bl: boolean): void;
  }

}

declare module 'com.metacontent.cobblenav.client.gui.widget.location.BucketSelectorWidget' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get nEXT(): ResourceLocation;
    get pREV(): ResourceLocation;
  }

}

declare module 'com.metacontent.cobblenav.client.gui.widget.location.LocationInfoWidget' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get dAY(): ResourceLocation;
    get nIGHT(): ResourceLocation;
    get uNKNOWN_BIOME(): ResourceLocation;
  }

}

declare module 'com.metacontent.cobblenav.client.gui.widget.location.SpawnDataWidget' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { DecimalFormat } from 'java.text';
  import { ResourceLocation } from 'net.minecraft.resources';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get bROKEN_MODEL(): ResourceLocation;
    get fORMAT(): DecimalFormat;
    get nEARBY_MARK(): ResourceLocation;
  }

}

declare module 'com.metacontent.cobblenav.client.gui.widget.NotificationWidget' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
  }

}

declare module 'com.metacontent.cobblenav.client.gui.widget.party' {
  import { Renderable, AbstractWidget } from 'net.minecraft.client.gui.components';
  import { RenderablePokemon } from 'com.cobblemon.mod.common.pokemon';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface PartyMemberWidget extends Renderable {}
  class PartyMemberWidget extends Renderable {
    constructor(x: number, y: number, width: number, height: number, pokemon: RenderablePokemon, rotationY: number);
    get height(): number;
    get pokemon(): RenderablePokemon;
    get width(): number;
    get x(): number;
    get y(): number;
    render(guiGraphics: GuiGraphics, i: number, j: number, delta: number): void;
    set x(n: number);
    set y(n: number);
  }


  interface PartyWidget extends AbstractWidget {}
  class PartyWidget extends AbstractWidget {
    constructor(playerX: number, playerY: number);
  }

}

declare module 'com.metacontent.cobblenav.client.gui.widget.radialmenu' {
  import { Companion } from 'com.metacontent.cobblenav.client.gui.widget.radialmenu.ClosedRadialMenu';
  import { Companion as com_metacontent_cobblenav_client_gui_widget_radialmenu_openedradialmenu_Companion } from 'com.metacontent.cobblenav.client.gui.widget.radialmenu.OpenedRadialMenu';
  import { Companion as com_metacontent_cobblenav_client_gui_widget_radialmenu_openingradialmenu_Companion } from 'com.metacontent.cobblenav.client.gui.widget.radialmenu.OpeningRadialMenu';
  import { PokenavOS } from 'com.metacontent.cobblenav.os';
  import { PokenavScreen } from 'com.metacontent.cobblenav.client.gui.screen';
  import { SoundlessWidget } from 'com.cobblemon.mod.common.client.gui.summary.widgets';
  import { Companion as com_metacontent_cobblenav_client_gui_widget_radialmenu_radialmenustate_Companion } from 'com.metacontent.cobblenav.client.gui.widget.radialmenu.RadialMenuState';
  import { Component } from 'net.minecraft.network.chat';

  interface ClosedRadialMenu extends RadialMenuState {}
  class ClosedRadialMenu extends RadialMenuState {
    static readonly Companion: Companion;
    static readonly ANIMATION_DURATION: number;
    constructor(handler: RadialMenuHandler, pX: number, pY: number);
    get blockScreenWidgets(): boolean;
    mouseClicked(pMouseX: number, pMouseY: number, pButton: number): boolean;
  }


  interface OpenedRadialMenu extends RadialMenuState {}
  class OpenedRadialMenu extends RadialMenuState {
    static readonly Companion: com_metacontent_cobblenav_client_gui_widget_radialmenu_openedradialmenu_Companion;
    static readonly DIAMETER: number;
    constructor(handler: RadialMenuHandler, pX: number, pY: number);
    get blockScreenWidgets(): boolean;
    mouseClicked(pMouseX: number, pMouseY: number, pButton: number): boolean;
  }


  interface OpeningRadialMenu extends RadialMenuState {}
  class OpeningRadialMenu extends RadialMenuState {
    static readonly Companion: com_metacontent_cobblenav_client_gui_widget_radialmenu_openingradialmenu_Companion;
    static readonly ANIMATION_DURATION: number;
    static readonly ROTATION: number;
    static readonly DIAMETER: number;
    constructor(handler: RadialMenuHandler, pX: number, pY: number);
    get blockScreenWidgets(): boolean;
  }


  class RadialMenuHandler {
    changeState(var1: RadialMenuState): void;
    get os(): PokenavOS;
    get parentScreen(): PokenavScreen;
  }


  interface RadialMenuState extends SoundlessWidget {}
  class RadialMenuState extends SoundlessWidget {
    static readonly Companion: com_metacontent_cobblenav_client_gui_widget_radialmenu_radialmenustate_Companion;
    static readonly MENU_DIAMETER: number;
    static readonly ANIMATION_SHEET_WIDTH: number;
    constructor(handler: RadialMenuHandler, pX: number, pY: number, pWidth: number, pHeight: number, component: Component);
    get blockScreenWidgets(): boolean;
  }

}

declare module 'com.metacontent.cobblenav.client.gui.widget.radialmenu.ClosedRadialMenu' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
  }

}

declare module 'com.metacontent.cobblenav.client.gui.widget.radialmenu.OpenedRadialMenu' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
  }

}

declare module 'com.metacontent.cobblenav.client.gui.widget.radialmenu.OpeningRadialMenu' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
  }

}

declare module 'com.metacontent.cobblenav.client.gui.widget.radialmenu.RadialMenuState' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get cONTACTS(): ResourceLocation;
    get lOCATION(): ResourceLocation;
    get mAP(): ResourceLocation;
    get rADIAL_MENU(): ResourceLocation;
    get sWITCH_OFF(): ResourceLocation;
  }

}

declare module 'com.metacontent.cobblenav.client.gui.widget.StatusBarWidget' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get tEXTURE(): ResourceLocation;
  }

}

declare module 'com.metacontent.cobblenav.client.settings' {
  import { Gson } from 'com.google.gson';
  import { Class } from 'java.lang';
  import { Companion } from 'com.metacontent.cobblenav.client.settings.PokefinderSettings';
  import { Set } from 'java.util';
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';
  import { Sorting } from 'com.metacontent.cobblenav.client.gui.util';
  import { Companion as com_metacontent_cobblenav_client_settings_pokenavsettings_Companion } from 'com.metacontent.cobblenav.client.settings.PokenavSettings';

  class ClientSettingsDataManager {
    static readonly INSTANCE: ClientSettingsDataManager;
    static readonly DIRECTORY: string;
    get gSON(): Gson;
    load<T extends Settings<T>>(name: string, clazz: Class<T>): Settings<T>;
    save<T extends Settings<T>>(settings: T): void;
  }


  interface PokefinderSettings extends Settings<PokefinderSettings> {}
  class PokefinderSettings extends Settings<PokefinderSettings> {
    static readonly Companion: Companion;
    static readonly NAME: string;
    constructor();
    check(pokemon: Pokemon): boolean;
    get aspects(): Set<string>;
    get labels(): Set<string>;
    get name(): string;
    get shinyOnly(): boolean;
    get species(): Set<string>;
    get strictAspectCheck(): boolean;
    get strictLabelCheck(): boolean;
    set aspects(value: Set<string>);
    set labels(value: Set<string>);
    set shinyOnly(value: boolean);
    set species(value: Set<string>);
    set strictAspectCheck(value: boolean);
    set strictLabelCheck(value: boolean);
  }


  class PokenavPreferences {
    constructor(bucketIndex: number, sorting: Sorting, applyBucketChecked: boolean);
    component1(): number;
    component2(): Sorting;
    component3(): boolean;
    copy(bucketIndex: number, sorting: Sorting, applyBucketChecked: boolean): PokenavPreferences;
    static copy$default(pokenavPreferences: PokenavPreferences, n: number, sorting: Sorting, bl: boolean, n2: number, object: any): PokenavPreferences;
    equals(other: any): boolean;
    get applyBucketChecked(): boolean;
    get bucketIndex(): number;
    get sorting(): Sorting;
    hashCode(): number;
    toString(): string;
  }


  interface PokenavSettings extends Settings<PokenavSettings> {}
  class PokenavSettings extends Settings<PokenavSettings> {
    static readonly Companion: com_metacontent_cobblenav_client_settings_pokenavsettings_Companion;
    static readonly NAME: string;
    constructor();
    get name(): string;
    get preferences(): PokenavPreferences;
    set preferences(value: PokenavPreferences);
  }


  class Settings<T extends Settings<T> = any> {
    get changed(): boolean;
    get name(): string;
    set changed(bl: boolean);
  }

}

declare module 'com.metacontent.cobblenav.client.settings.PokefinderSettings' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
  }

}

declare module 'com.metacontent.cobblenav.client.settings.PokenavSettings' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
  }

}

declare module 'com.metacontent.cobblenav' {
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack, CommandBuildContext } from 'net.minecraft.commands';
  import { CommandSelection } from 'Commands';
  import { RegistryProvider } from 'com.metacontent.cobblenav.registry';
  import { Registry } from 'net.minecraft.core';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { Item } from 'net.minecraft.world.item';
  import { Fishingnav } from 'com.metacontent.cobblenav.item';
  import { ItemDisplayParameters, Output } from 'CreativeModeTab';
  import { Function1 } from 'kotlin.jvm.functions';
  import { Builder } from 'LootPool';
  import { Unit } from 'kotlin';
  import { NetworkManager } from 'com.cobblemon.mod.common';
  import { KClass } from 'kotlin.reflect';
  import { ArgumentTypeInfo } from 'net.minecraft.commands.synchronization';
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { Template } from 'ArgumentTypeInfo';
  import { ModDependency } from 'com.metacontent.cobblenav.util';

  class CobblenavCommands {
    static readonly INSTANCE: CobblenavCommands;
    register(dispatcher: CommandDispatcher<CommandSourceStack>, registry: CommandBuildContext, selection: CommandSelection): void;
  }


  interface CobblenavItems extends RegistryProvider<Registry, ResourceKey, Item> {}
  class CobblenavItems extends RegistryProvider<Registry, ResourceKey, Item> {
    static readonly INSTANCE: CobblenavItems;
    addToGroup(displayContext: ItemDisplayParameters, entries: Output): void;
    get bLACK_POKEFINDER(): Item;
    get bLACK_POKENAV(): Item;
    get bLUE_POKEFINDER(): Item;
    get bLUE_POKENAV(): Item;
    get bROWN_POKENAV(): Item;
    get cYAN_POKENAV(): Item;
    get fISHINGNAV(): Fishingnav;
    get gHOLDENGO_POKENAV(): Item;
    get gRAY_POKENAV(): Item;
    get gREEN_POKEFINDER(): Item;
    get gREEN_POKENAV(): Item;
    get lIGHT_BLUE_POKENAV(): Item;
    get lIGHT_GRAY_POKENAV(): Item;
    get lIME_POKENAV(): Item;
    get mAGENTA_POKENAV(): Item;
    get oLD_POKENAV(): Item;
    get oRANGE_POKENAV(): Item;
    get pINK_POKEFINDER(): Item;
    get pINK_POKENAV(): Item;
    get pOKENAV(): Item;
    get pURPLE_POKENAV(): Item;
    get rED_POKEFINDER(): Item;
    get rED_POKENAV(): Item;
    get registry(): Registry<Item>;
    get resourceKey(): ResourceKey<Registry<Item>>;
    get wANDERER_POKENAV(): Item;
    get wHITE_POKEFINDER(): Item;
    get wHITE_POKENAV(): Item;
    get yELLOW_POKEFINDER(): Item;
    get yELLOW_POKENAV(): Item;
  }


  class CobblenavLootInjector {
    static readonly INSTANCE: CobblenavLootInjector;
    inject(id: ResourceLocation, consumer: Function1<Builder, Unit>): void;
  }


  class Implementation {
    get networkManager(): NetworkManager;
    injectLootTables(): void;
    isModInstalled(var1: ModDependency): boolean;
    registerCommandArgument<A extends ArgumentType<any>, T extends Template<A>>(var1: ResourceLocation, var2: KClass<A>, var3: ArgumentTypeInfo<A, T>): void;
    registerCommands(): void;
    registerItems(): void;
  }

}

declare module 'com.metacontent.cobblenav.command' {
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack } from 'net.minecraft.commands';

  class Command {
    register(var1: CommandDispatcher<CommandSourceStack>): void;
  }

}

declare module 'com.metacontent.cobblenav.config' {
  import { Map } from 'java.util';
  import { Boolean, Integer, Float } from 'java.lang';
  import { Companion } from 'com.metacontent.cobblenav.config.Config';
  import { Companion as com_metacontent_cobblenav_config_featureweights_Companion } from 'com.metacontent.cobblenav.config.FeatureWeights';

  interface ClientCobblenavConfig extends Config<ClientCobblenavConfig> {}
  class ClientCobblenavConfig extends Config<ClientCobblenavConfig> {
    constructor();
    get collectableClientConditions(): Map<string, boolean>;
    get enableBlurEffect(): boolean;
    get fileName(): string;
    get maxCloudNumber(): number;
    get maxCloudVelocity(): number;
    get obscureUnknownPokemon(): boolean;
    get pokefinderOverlayOffset(): number;
    get screenScale(): number;
    get sendErrorMessagesToChat(): boolean;
    get trackArrowYOffset(): number;
    get useSwimmingAnimationIfSubmerged(): boolean;
  }


  interface CobblenavConfig extends Config<CobblenavConfig> {}
  class CobblenavConfig extends Config<CobblenavConfig> {
    constructor();
    get checkSpawnHeight(): number;
    get checkSpawnWidth(): number;
    get collectableConditions(): Map<string, boolean>;
    get fileName(): string;
    get hideNaturalBlockConditions(): boolean;
    get hideUnknownPokemon(): boolean;
    get hideUnknownPokemonTooltips(): boolean;
    get pokemonFeatureWeights(): FeatureWeights;
    get searchAreaHeight(): number;
    get searchAreaWidth(): number;
    get showPokemonTooltips(): boolean;
    get syncLabelsWithClient(): boolean;
  }


  class Config<T extends Config<T> = any> {
    static readonly Companion: Companion;
    get fileName(): string;
    save(): void;
  }


  class FeatureWeights {
    static readonly Companion: com_metacontent_cobblenav_config_featureweights_Companion;
    constructor(shiny: number, perfectIvsRates: Map<number, number>, hiddenAbility: number, eggMove: number);
    component1(): number;
    component2(): Map<number, number>;
    component3(): number;
    component4(): number;
    copy(shiny: number, perfectIvsRates: Map<number, number>, hiddenAbility: number, eggMove: number): FeatureWeights;
    static copy$default(featureWeights: FeatureWeights, f: number, map: Map, f2: number, f3: number, n: number, object: any): FeatureWeights;
    equals(other: any): boolean;
    get eggMove(): number;
    get hiddenAbility(): number;
    get perfectIvsRates(): Map<number, number>;
    get shiny(): number;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'com.metacontent.cobblenav.config.Config' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Class } from 'java.lang';
  import { Config } from 'com.metacontent.cobblenav.config';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    load<C extends Config<C>>(clazz: Class<C>): C;
  }

}

declare module 'com.metacontent.cobblenav.config.FeatureWeights' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { FeatureWeights } from 'com.metacontent.cobblenav.config';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get bASE(): FeatureWeights;
  }

}

declare module 'com.metacontent.cobblenav.event' {
  import { EventObservable } from 'com.cobblemon.mod.common.api.reactive';
  import { ClientCollector, ConditionCollector, BlockConditionCollector } from 'com.metacontent.cobblenav.spawndata.collector';
  import { ServerPlayer } from 'net.minecraft.server.level';

  class CobblenavEvents {
    static readonly INSTANCE: CobblenavEvents;
    get fISH_TRAVEL_STARTED(): EventObservable<FishTravelStartedEvent>;
    get rEGISTER_CUSTOM_CLIENT_COLLECTORS(): EventObservable<CustomClientCollectorRegistrar>;
    get rEGISTER_CUSTOM_COLLECTORS(): EventObservable<CustomCollectorRegistrar>;
  }


  class CustomClientCollectorRegistrar {
    register(var1: ClientCollector): CustomClientCollectorRegistrar;
  }


  class CustomCollectorRegistrar {
    register(var1: ConditionCollector<any>): CustomCollectorRegistrar;
    register(var1: BlockConditionCollector<any>): CustomCollectorRegistrar;
  }


  class FishTravelStartedEvent {
    constructor(player: ServerPlayer);
    component1(): ServerPlayer;
    copy(player: ServerPlayer): FishTravelStartedEvent;
    static copy$default(fishTravelStartedEvent: FishTravelStartedEvent, serverPlayer: ServerPlayer, n: number, object: any): FishTravelStartedEvent;
    equals(other: any): boolean;
    get player(): ServerPlayer;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'com.metacontent.cobblenav.item' {
  import { Item, ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { InteractionResultHolder, InteractionHand } from 'net.minecraft.world';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { TooltipContext } from 'Item';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { Companion } from 'com.metacontent.cobblenav.item.Pokefinder';
  import { Companion as com_metacontent_cobblenav_item_pokenav_Companion } from 'com.metacontent.cobblenav.item.Pokenav';
  import { Enum } from 'java.lang';
  import { EnumEntries } from 'kotlin.enums';

  interface Fishingnav extends Item {}
  class Fishingnav extends Item {
    constructor();
    appendHoverText(itemStack: ItemStack, tooltipContext: TooltipContext, list: Component[], tooltipFlag: TooltipFlag): void;
    use(level: Level, player: Player, interactionHand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface Pokefinder extends Item {}
  class Pokefinder extends Item {
    static readonly Companion: Companion;
    static readonly BASE_REGISTRY_KEY: string;
    static readonly TRANSLATION_KEY: string;
    constructor();
    get descriptionId(): string;
    use(level: Level, player: Player, interactionHand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface Pokenav extends Item {}
  class Pokenav extends Item {
    static readonly Companion: com_metacontent_cobblenav_item_pokenav_Companion;
    static readonly MAX_STACK: number;
    static readonly BASE_REGISTRY_KEY: string;
    static readonly TRANSLATION_KEY: string;
    static readonly BASE_TOOLTIP_TRANSLATION_KEY: string;
    constructor(model: PokenavModelType);
    appendHoverText(itemStack: ItemStack, tooltipContext: TooltipContext, list: Component[], tooltipFlag: TooltipFlag): void;
    getDescriptionId(itemStack: ItemStack): string;
    use(level: Level, player: Player, interactionHand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface PokenavModelType extends Enum<PokenavModelType> {}
  class PokenavModelType extends Enum<PokenavModelType> {
    static readonly BASE: PokenavModelType;
    static readonly WHITE: PokenavModelType;
    static readonly LIGHT_GRAY: PokenavModelType;
    static readonly GRAY: PokenavModelType;
    static readonly BLACK: PokenavModelType;
    static readonly BROWN: PokenavModelType;
    static readonly RED: PokenavModelType;
    static readonly ORANGE: PokenavModelType;
    static readonly YELLOW: PokenavModelType;
    static readonly LIME: PokenavModelType;
    static readonly GREEN: PokenavModelType;
    static readonly CYAN: PokenavModelType;
    static readonly LIGHT_BLUE: PokenavModelType;
    static readonly BLUE: PokenavModelType;
    static readonly PURPLE: PokenavModelType;
    static readonly MAGENTA: PokenavModelType;
    static readonly PINK: PokenavModelType;
    static readonly GHOLDENGO: PokenavModelType;
    static readonly WANDERER: PokenavModelType;
    static get entries(): EnumEntries<PokenavModelType>;
    get modelName(): string;
    static valueOf(value: string): PokenavModelType;
    static values(): PokenavModelType[];
  }

}

declare module 'com.metacontent.cobblenav.item.Pokefinder' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
  }

}

declare module 'com.metacontent.cobblenav.item.Pokenav' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
  }

}

declare module 'com.metacontent.cobblenav.mixin' {
  import { CustomizableBlurEffectProcessor, FishTravelChecker } from 'com.metacontent.cobblenav.util';
  import { GrowingPlantHeadBlock } from 'net.minecraft.world.level.block';

  interface GameRendererMixin extends CustomizableBlurEffectProcessor {}
  class GameRendererMixin extends CustomizableBlurEffectProcessor {
    cobblenav$processBlurEffect(blur: number, delta: number): void;
  }


  class GrowingPlantBlockMixin {
    invokeGetHeadBlock(): GrowingPlantHeadBlock;
  }


  class GuiMixin {
  }


  interface PokeRodFishingBobberEntityMixin extends FishTravelChecker {}
  class PokeRodFishingBobberEntityMixin extends FishTravelChecker {
    cobblenav$isTraveling(): boolean;
  }


  class PokeRodItemMixin {
  }

}

declare module 'com.metacontent.cobblenav.neoforge.client' {
  import { ClientImplementation } from 'com.metacontent.cobblenav.client';

  interface CobblenavNeoForgeClient extends ClientImplementation {}
  class CobblenavNeoForgeClient extends ClientImplementation {
    static readonly INSTANCE: CobblenavNeoForgeClient;
    init(): void;
  }

}

declare module 'com.metacontent.cobblenav.neoforge' {
  import { Implementation } from 'com.metacontent.cobblenav';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { KClass } from 'kotlin.reflect';
  import { ArgumentTypeInfo } from 'net.minecraft.commands.synchronization';
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { Template } from 'ArgumentTypeInfo';
  import { WandererTradesEvent } from 'net.neoforged.neoforge.event.village';
  import { ModDependency } from 'com.metacontent.cobblenav.util';

  interface CobblenavNeoForge extends Implementation {}
  class CobblenavNeoForge extends Implementation {
    constructor();
    get networkManager(): CobblenavNeoForgeNetworkManager;
    injectLootTables(): void;
    isModInstalled(mod: ModDependency): boolean;
    onWanderingTraderRegistry(event: WandererTradesEvent): void;
    registerCommandArgument<A extends ArgumentType<any>, T extends Template<A>>(identifier: ResourceLocation, argumentClass: KClass<A>, serializer: ArgumentTypeInfo<A, T>): void;
    registerCommands(): void;
    registerItems(): void;
  }

}

declare module 'com.metacontent.cobblenav.networking' {
  import { List } from 'java.util';
  import { PacketRegisterInfo } from 'com.cobblemon.mod.common.net';
  import { SpawnMapPacket, LocationScreenInitDataPacket, FoundPokemonPacket, OpenPokenavPacket, OpenFishingnavPacket, CloseFishingnavPacket, FishingMapPacket, FishingnavScreenInitDataPacket, LabelSyncPacket } from 'com.metacontent.cobblenav.networking.packet.client';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { RequestSpawnMapPacket, RequestLocationScreenInitDataPacket, FindPokemonPacket, RequestFishingMapPacket, RequestFishingnavScreenInitDataPacket } from 'com.metacontent.cobblenav.networking.packet.server';

  class CobblenavNetwork {
    static readonly INSTANCE: CobblenavNetwork;
    get c2sPayloads(): PacketRegisterInfo<any>[];
    get s2cPayloads(): PacketRegisterInfo<any>[];
    invoke(p0: RegistryFriendlyByteBuf): SpawnMapPacket;
    invoke(p0: RegistryFriendlyByteBuf): LocationScreenInitDataPacket;
    invoke(p0: RegistryFriendlyByteBuf): FoundPokemonPacket;
    invoke(p0: RegistryFriendlyByteBuf): OpenPokenavPacket;
    invoke(p0: RegistryFriendlyByteBuf): OpenFishingnavPacket;
    invoke(p0: RegistryFriendlyByteBuf): CloseFishingnavPacket;
    invoke(p0: RegistryFriendlyByteBuf): FishingMapPacket;
    invoke(p0: RegistryFriendlyByteBuf): FishingnavScreenInitDataPacket;
    invoke(p0: RegistryFriendlyByteBuf): LabelSyncPacket;
    invoke(p0: RegistryFriendlyByteBuf): RequestSpawnMapPacket;
    invoke(p0: RegistryFriendlyByteBuf): RequestLocationScreenInitDataPacket;
    invoke(p0: RegistryFriendlyByteBuf): FindPokemonPacket;
    invoke(p0: RegistryFriendlyByteBuf): RequestFishingMapPacket;
    invoke(p0: RegistryFriendlyByteBuf): RequestFishingnavScreenInitDataPacket;
  }

}

declare module 'com.metacontent.cobblenav.networking.handler.client' {
  import { ClientNetworkPacketHandler } from 'com.cobblemon.mod.common.api.net';
  import { CloseFishingnavPacket, FishingMapPacket, FishingnavScreenInitDataPacket, FoundPokemonPacket, LocationScreenInitDataPacket, OpenFishingnavPacket, OpenPokenavPacket, SpawnMapPacket } from 'com.metacontent.cobblenav.networking.packet.client';
  import { Minecraft } from 'net.minecraft.client';

  interface CloseFishingnavHandler extends ClientNetworkPacketHandler<CloseFishingnavPacket> {}
  class CloseFishingnavHandler extends ClientNetworkPacketHandler<CloseFishingnavPacket> {
    static readonly INSTANCE: CloseFishingnavHandler;
    handle(packet: CloseFishingnavPacket, client: Minecraft): void;
  }


  interface FishingMapHandler extends ClientNetworkPacketHandler<FishingMapPacket> {}
  class FishingMapHandler extends ClientNetworkPacketHandler<FishingMapPacket> {
    static readonly INSTANCE: FishingMapHandler;
    handle(packet: FishingMapPacket, client: Minecraft): void;
  }


  interface FishingnavScreenInitDataHandler extends ClientNetworkPacketHandler<FishingnavScreenInitDataPacket> {}
  class FishingnavScreenInitDataHandler extends ClientNetworkPacketHandler<FishingnavScreenInitDataPacket> {
    static readonly INSTANCE: FishingnavScreenInitDataHandler;
    handle(packet: FishingnavScreenInitDataPacket, client: Minecraft): void;
  }


  interface FoundPokemonHandler extends ClientNetworkPacketHandler<FoundPokemonPacket> {}
  class FoundPokemonHandler extends ClientNetworkPacketHandler<FoundPokemonPacket> {
    static readonly INSTANCE: FoundPokemonHandler;
    handle(packet: FoundPokemonPacket, client: Minecraft): void;
  }


  interface LocationScreenInitDataHandler extends ClientNetworkPacketHandler<LocationScreenInitDataPacket> {}
  class LocationScreenInitDataHandler extends ClientNetworkPacketHandler<LocationScreenInitDataPacket> {
    static readonly INSTANCE: LocationScreenInitDataHandler;
    handle(packet: LocationScreenInitDataPacket, client: Minecraft): void;
  }


  interface OpenFishingnavHandler extends ClientNetworkPacketHandler<OpenFishingnavPacket> {}
  class OpenFishingnavHandler extends ClientNetworkPacketHandler<OpenFishingnavPacket> {
    static readonly INSTANCE: OpenFishingnavHandler;
    handle(packet: OpenFishingnavPacket, client: Minecraft): void;
  }


  interface OpenPokenavHandler extends ClientNetworkPacketHandler<OpenPokenavPacket> {}
  class OpenPokenavHandler extends ClientNetworkPacketHandler<OpenPokenavPacket> {
    static readonly INSTANCE: OpenPokenavHandler;
    handle(packet: OpenPokenavPacket, client: Minecraft): void;
  }


  interface SpawnMapHandler extends ClientNetworkPacketHandler<SpawnMapPacket> {}
  class SpawnMapHandler extends ClientNetworkPacketHandler<SpawnMapPacket> {
    static readonly INSTANCE: SpawnMapHandler;
    handle(packet: SpawnMapPacket, client: Minecraft): void;
  }

}

declare module 'com.metacontent.cobblenav.networking.handler.server' {
  import { ServerNetworkPacketHandler } from 'com.cobblemon.mod.common.api.net';
  import { FindPokemonPacket, RequestSpawnMapPacket } from 'com.metacontent.cobblenav.networking.packet.server';
  import { MinecraftServer } from 'net.minecraft.server';
  import { ServerPlayer } from 'net.minecraft.server.level';

  interface FindPokemonHandler extends ServerNetworkPacketHandler<FindPokemonPacket> {}
  class FindPokemonHandler extends ServerNetworkPacketHandler<FindPokemonPacket> {
    static readonly INSTANCE: FindPokemonHandler;
    handle(packet: FindPokemonPacket, server: MinecraftServer, player: ServerPlayer): void;
  }


  interface RequestSpawnMapHandler extends ServerNetworkPacketHandler<RequestSpawnMapPacket> {}
  class RequestSpawnMapHandler extends ServerNetworkPacketHandler<RequestSpawnMapPacket> {
    static readonly INSTANCE: RequestSpawnMapHandler;
    handle(packet: RequestSpawnMapPacket, server: MinecraftServer, player: ServerPlayer): void;
  }

}

declare module 'com.metacontent.cobblenav.networking.packet.client' {
  import { CobblenavNetworkPacket } from 'com.metacontent.cobblenav.networking.packet';
  import { Companion } from 'com.metacontent.cobblenav.networking.packet.client.CloseFishingnavPacket';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { Companion as com_metacontent_cobblenav_networking_packet_client_fishingmappacket_Companion } from 'com.metacontent.cobblenav.networking.packet.client.FishingMapPacket';
  import { Map, List, Collection, HashSet } from 'java.util';
  import { SpawnData } from 'com.metacontent.cobblenav.spawndata';
  import { Companion as com_metacontent_cobblenav_networking_packet_client_fishingnavscreeninitdatapacket_Companion } from 'com.metacontent.cobblenav.networking.packet.client.FishingnavScreenInitDataPacket';
  import { WeightedBucket } from 'com.metacontent.cobblenav.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Companion as com_metacontent_cobblenav_networking_packet_client_foundpokemonpacket_Companion } from 'com.metacontent.cobblenav.networking.packet.client.FoundPokemonPacket';
  import { FoundPokemon } from 'com.metacontent.cobblenav.util.finder';
  import { DataRegistrySyncPacket } from 'com.cobblemon.mod.common.net.messages.client.data';
  import { Pair } from 'kotlin';
  import { Companion as com_metacontent_cobblenav_networking_packet_client_labelsyncpacket_Companion } from 'com.metacontent.cobblenav.networking.packet.client.LabelSyncPacket';
  import { Companion as com_metacontent_cobblenav_networking_packet_client_locationscreeninitdatapacket_Companion } from 'com.metacontent.cobblenav.networking.packet.client.LocationScreenInitDataPacket';
  import { Companion as com_metacontent_cobblenav_networking_packet_client_openfishingnavpacket_Companion } from 'com.metacontent.cobblenav.networking.packet.client.OpenFishingnavPacket';
  import { PokenavOS } from 'com.metacontent.cobblenav.os';
  import { Companion as com_metacontent_cobblenav_networking_packet_client_openpokenavpacket_Companion } from 'com.metacontent.cobblenav.networking.packet.client.OpenPokenavPacket';
  import { Companion as com_metacontent_cobblenav_networking_packet_client_spawnmappacket_Companion } from 'com.metacontent.cobblenav.networking.packet.client.SpawnMapPacket';

  interface CloseFishingnavPacket extends CobblenavNetworkPacket<CloseFishingnavPacket> {}
  class CloseFishingnavPacket extends CobblenavNetworkPacket<CloseFishingnavPacket> {
    static readonly Companion: Companion;
    encode(buffer: RegistryFriendlyByteBuf): void;
    get id(): ResourceLocation;
  }


  interface FishingMapPacket extends CobblenavNetworkPacket<FishingMapPacket> {}
  class FishingMapPacket extends CobblenavNetworkPacket<FishingMapPacket> {
    static readonly Companion: com_metacontent_cobblenav_networking_packet_client_fishingmappacket_Companion;
    constructor(fishingMap: Map<string, SpawnData[]>);
    encode(buffer: RegistryFriendlyByteBuf): void;
    get fishingMap(): Map<string, SpawnData[]>;
    get id(): ResourceLocation;
  }


  interface FishingnavScreenInitDataPacket extends CobblenavNetworkPacket<FishingnavScreenInitDataPacket> {}
  class FishingnavScreenInitDataPacket extends CobblenavNetworkPacket<FishingnavScreenInitDataPacket> {
    static readonly Companion: com_metacontent_cobblenav_networking_packet_client_fishingnavscreeninitdatapacket_Companion;
    constructor(buckets: WeightedBucket[], pokeBall: ResourceLocation, lineColor: string, baitItem: ItemStack);
    encode(buffer: RegistryFriendlyByteBuf): void;
    get baitItem(): ItemStack;
    get buckets(): WeightedBucket[];
    get id(): ResourceLocation;
    get lineColor(): string;
    get pokeBall(): ResourceLocation;
  }


  interface FoundPokemonPacket extends CobblenavNetworkPacket<FoundPokemonPacket> {}
  class FoundPokemonPacket extends CobblenavNetworkPacket<FoundPokemonPacket> {
    static readonly Companion: com_metacontent_cobblenav_networking_packet_client_foundpokemonpacket_Companion;
    constructor(pokemon: FoundPokemon);
    encode(buffer: RegistryFriendlyByteBuf): void;
    get id(): ResourceLocation;
    get pokemon(): FoundPokemon;
  }


  interface LabelSyncPacket extends DataRegistrySyncPacket<Pair, LabelSyncPacket> {}
  class LabelSyncPacket extends DataRegistrySyncPacket<Pair, LabelSyncPacket> {
    static readonly Companion: com_metacontent_cobblenav_networking_packet_client_labelsyncpacket_Companion;
    constructor(speciesToLabels: Collection<Pair<ResourceLocation, HashSet<string>>>);
    decodeEntry(buffer: RegistryFriendlyByteBuf): Pair<ResourceLocation, HashSet<string>>;
    encodeEntry(buffer: RegistryFriendlyByteBuf, entry: Pair<ResourceLocation, HashSet<string>>): void;
    get id(): ResourceLocation;
    synchronizeDecoded(entries: Collection<Pair<ResourceLocation, HashSet<string>>>): void;
  }


  interface LocationScreenInitDataPacket extends CobblenavNetworkPacket<LocationScreenInitDataPacket> {}
  class LocationScreenInitDataPacket extends CobblenavNetworkPacket<LocationScreenInitDataPacket> {
    static readonly Companion: com_metacontent_cobblenav_networking_packet_client_locationscreeninitdatapacket_Companion;
    constructor(buckets: WeightedBucket[], biome: string);
    encode(buffer: RegistryFriendlyByteBuf): void;
    get biome(): string;
    get buckets(): WeightedBucket[];
    get id(): ResourceLocation;
  }


  interface OpenFishingnavPacket extends CobblenavNetworkPacket<OpenFishingnavPacket> {}
  class OpenFishingnavPacket extends CobblenavNetworkPacket<OpenFishingnavPacket> {
    static readonly Companion: com_metacontent_cobblenav_networking_packet_client_openfishingnavpacket_Companion;
    constructor(os: PokenavOS);
    encode(buffer: RegistryFriendlyByteBuf): void;
    get id(): ResourceLocation;
    get os(): PokenavOS;
  }


  interface OpenPokenavPacket extends CobblenavNetworkPacket<OpenPokenavPacket> {}
  class OpenPokenavPacket extends CobblenavNetworkPacket<OpenPokenavPacket> {
    static readonly Companion: com_metacontent_cobblenav_networking_packet_client_openpokenavpacket_Companion;
    constructor(os: PokenavOS);
    encode(buffer: RegistryFriendlyByteBuf): void;
    get id(): ResourceLocation;
    get os(): PokenavOS;
  }


  interface SpawnMapPacket extends CobblenavNetworkPacket<SpawnMapPacket> {}
  class SpawnMapPacket extends CobblenavNetworkPacket<SpawnMapPacket> {
    static readonly Companion: com_metacontent_cobblenav_networking_packet_client_spawnmappacket_Companion;
    constructor(bucketName: string, spawnDataList: SpawnData[]);
    encode(buffer: RegistryFriendlyByteBuf): void;
    get bucketName(): string;
    get id(): ResourceLocation;
    get spawnDataList(): SpawnData[];
  }

}

declare module 'com.metacontent.cobblenav.networking.packet.client.CloseFishingnavPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { CloseFishingnavPacket } from 'com.metacontent.cobblenav.networking.packet.client';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): CloseFishingnavPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'com.metacontent.cobblenav.networking.packet.client.FishingMapPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { FishingMapPacket } from 'com.metacontent.cobblenav.networking.packet.client';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): FishingMapPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'com.metacontent.cobblenav.networking.packet.client.FishingnavScreenInitDataPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { FishingnavScreenInitDataPacket } from 'com.metacontent.cobblenav.networking.packet.client';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): FishingnavScreenInitDataPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'com.metacontent.cobblenav.networking.packet.client.FoundPokemonPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { FoundPokemonPacket } from 'com.metacontent.cobblenav.networking.packet.client';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): FoundPokemonPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'com.metacontent.cobblenav.networking.packet.client.LabelSyncPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { LabelSyncPacket } from 'com.metacontent.cobblenav.networking.packet.client';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): LabelSyncPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'com.metacontent.cobblenav.networking.packet.client.LocationScreenInitDataPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { LocationScreenInitDataPacket } from 'com.metacontent.cobblenav.networking.packet.client';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): LocationScreenInitDataPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'com.metacontent.cobblenav.networking.packet.client.OpenFishingnavPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { OpenFishingnavPacket } from 'com.metacontent.cobblenav.networking.packet.client';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): OpenFishingnavPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'com.metacontent.cobblenav.networking.packet.client.OpenPokenavPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { OpenPokenavPacket } from 'com.metacontent.cobblenav.networking.packet.client';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): OpenPokenavPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'com.metacontent.cobblenav.networking.packet.client.SpawnMapPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { SpawnMapPacket } from 'com.metacontent.cobblenav.networking.packet.client';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): SpawnMapPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'com.metacontent.cobblenav.networking.packet' {
  import { NetworkPacket } from 'com.cobblemon.mod.common.api.net';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Iterable } from 'java.lang';

  interface CobblenavNetworkPacket<T extends NetworkPacket<T> = any> extends NetworkPacket<T> {}
  class CobblenavNetworkPacket<T extends NetworkPacket<T> = any> extends NetworkPacket<T> {
    sendToAllPlayers(): void;
    sendToPlayer(player: ServerPlayer): void;
    sendToPlayers(players: Iterable<ServerPlayer>): void;
    sendToServer(): void;
  }

}

declare module 'com.metacontent.cobblenav.networking.packet.CobblenavNetworkPacket' {
  import { CobblenavNetworkPacket } from 'com.metacontent.cobblenav.networking.packet';
  import { NetworkPacket } from 'com.cobblemon.mod.common.api.net';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Iterable, Boolean } from 'java.lang';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Level } from 'net.minecraft.world.level';
  import { Function1 } from 'kotlin.jvm.functions';
  import { Type } from 'CustomPacketPayload';

  class DefaultImpls {
    static sendToAllPlayers<T extends NetworkPacket<T>>($this: CobblenavNetworkPacket<T>): void;
    static sendToPlayer<T extends NetworkPacket<T>>($this: CobblenavNetworkPacket<T>, player: ServerPlayer): void;
    static sendToPlayers<T extends NetworkPacket<T>>($this: CobblenavNetworkPacket<T>, players: Iterable<ServerPlayer>): void;
    static sendToPlayersAround<T extends NetworkPacket<T>>($this: CobblenavNetworkPacket<T>, x: number, y: number, z: number, distance: number, worldKey: ResourceKey<Level>, exclusionCondition: Function1<ServerPlayer, boolean>): void;
    static sendToServer<T extends NetworkPacket<T>>($this: CobblenavNetworkPacket<T>): void;
    static type<T extends NetworkPacket<T>>($this: CobblenavNetworkPacket<T>): Type<T>;
  }

}

declare module 'com.metacontent.cobblenav.networking.packet.server' {
  import { CobblenavNetworkPacket } from 'com.metacontent.cobblenav.networking.packet';
  import { Companion } from 'com.metacontent.cobblenav.networking.packet.server.FindPokemonPacket';
  import { Set } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { Companion as com_metacontent_cobblenav_networking_packet_server_requestfishingmappacket_Companion } from 'com.metacontent.cobblenav.networking.packet.server.RequestFishingMapPacket';
  import { Companion as com_metacontent_cobblenav_networking_packet_server_requestfishingnavscreeninitdatapacket_Companion } from 'com.metacontent.cobblenav.networking.packet.server.RequestFishingnavScreenInitDataPacket';
  import { Companion as com_metacontent_cobblenav_networking_packet_server_requestlocationscreeninitdatapacket_Companion } from 'com.metacontent.cobblenav.networking.packet.server.RequestLocationScreenInitDataPacket';
  import { Companion as com_metacontent_cobblenav_networking_packet_server_requestspawnmappacket_Companion } from 'com.metacontent.cobblenav.networking.packet.server.RequestSpawnMapPacket';

  interface FindPokemonPacket extends CobblenavNetworkPacket<FindPokemonPacket> {}
  class FindPokemonPacket extends CobblenavNetworkPacket<FindPokemonPacket> {
    static readonly Companion: Companion;
    constructor(species: string, aspects: Set<string>);
    encode(buffer: RegistryFriendlyByteBuf): void;
    get aspects(): Set<string>;
    get id(): ResourceLocation;
    get species(): string;
  }


  interface RequestFishingMapPacket extends CobblenavNetworkPacket<RequestFishingMapPacket> {}
  class RequestFishingMapPacket extends CobblenavNetworkPacket<RequestFishingMapPacket> {
    static readonly Companion: com_metacontent_cobblenav_networking_packet_server_requestfishingmappacket_Companion;
    encode(buffer: RegistryFriendlyByteBuf): void;
    get id(): ResourceLocation;
  }


  interface RequestFishingnavScreenInitDataPacket extends CobblenavNetworkPacket<RequestFishingnavScreenInitDataPacket> {}
  class RequestFishingnavScreenInitDataPacket extends CobblenavNetworkPacket<RequestFishingnavScreenInitDataPacket> {
    static readonly Companion: com_metacontent_cobblenav_networking_packet_server_requestfishingnavscreeninitdatapacket_Companion;
    encode(buffer: RegistryFriendlyByteBuf): void;
    get id(): ResourceLocation;
  }


  interface RequestLocationScreenInitDataPacket extends CobblenavNetworkPacket<RequestLocationScreenInitDataPacket> {}
  class RequestLocationScreenInitDataPacket extends CobblenavNetworkPacket<RequestLocationScreenInitDataPacket> {
    static readonly Companion: com_metacontent_cobblenav_networking_packet_server_requestlocationscreeninitdatapacket_Companion;
    encode(buffer: RegistryFriendlyByteBuf): void;
    get id(): ResourceLocation;
  }


  interface RequestSpawnMapPacket extends CobblenavNetworkPacket<RequestSpawnMapPacket> {}
  class RequestSpawnMapPacket extends CobblenavNetworkPacket<RequestSpawnMapPacket> {
    static readonly Companion: com_metacontent_cobblenav_networking_packet_server_requestspawnmappacket_Companion;
    constructor(bucket: string);
    encode(buffer: RegistryFriendlyByteBuf): void;
    get bucket(): string;
    get id(): ResourceLocation;
  }

}

declare module 'com.metacontent.cobblenav.networking.packet.server.FindPokemonPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { FindPokemonPacket } from 'com.metacontent.cobblenav.networking.packet.server';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): FindPokemonPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'com.metacontent.cobblenav.networking.packet.server.RequestFishingMapPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RequestFishingMapPacket } from 'com.metacontent.cobblenav.networking.packet.server';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): RequestFishingMapPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'com.metacontent.cobblenav.networking.packet.server.RequestFishingnavScreenInitDataPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RequestFishingnavScreenInitDataPacket } from 'com.metacontent.cobblenav.networking.packet.server';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): RequestFishingnavScreenInitDataPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'com.metacontent.cobblenav.networking.packet.server.RequestLocationScreenInitDataPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RequestLocationScreenInitDataPacket } from 'com.metacontent.cobblenav.networking.packet.server';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): RequestLocationScreenInitDataPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'com.metacontent.cobblenav.networking.packet.server.RequestSpawnMapPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RequestSpawnMapPacket } from 'com.metacontent.cobblenav.networking.packet.server';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): RequestSpawnMapPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'com.metacontent.cobblenav.os' {
  import { Encodable } from 'com.cobblemon.mod.common.api.net';
  import { Companion } from 'com.metacontent.cobblenav.os.PokenavOS';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  interface PokenavOS extends Encodable {}
  class PokenavOS extends Encodable {
    static readonly Companion: Companion;
    constructor(version: string, canUseLocation: boolean, canUseContacts: boolean, canUseMap: boolean, canUseFishingAid: boolean);

    constructor(string: string, bl: boolean, bl2: boolean, bl3: boolean, bl4: boolean, n: number, defaultConstructorMarker: DefaultConstructorMarker);
    encode(buffer: RegistryFriendlyByteBuf): void;
    get canUseContacts(): boolean;
    get canUseFishingAid(): boolean;
    get canUseLocation(): boolean;
    get canUseMap(): boolean;
    get version(): string;
  }

}

declare module 'com.metacontent.cobblenav.os.PokenavOS' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { PokenavOS } from 'com.metacontent.cobblenav.os';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): PokenavOS;
  }

}

declare module 'com.metacontent.cobblenav.registry' {
  import { Function2 } from 'kotlin.jvm.functions';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Unit } from 'kotlin';
  import { Collection } from 'java.util';

  class RegistryProvider<R extends Registry<T> = any, K extends ResourceKey<R> = any, T = any> {
    add<E extends T>(name: string, entry: E): E;
    all(): Collection<T>;
    get registry(): R;
    get resourceKey(): K;
    register(consumer: Function2<ResourceLocation, T, Unit>): void;
  }

}

declare module 'com.metacontent.cobblenav.spawndata.collector.client.counter' {
  import { ClientCollector, ConfigureableCollector } from 'com.metacontent.cobblenav.spawndata.collector';
  import { ModAPI } from 'com.cobblemon.mod.common';
  import { List } from 'java.util';
  import { ModDependency } from 'com.metacontent.cobblenav.util';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { SpawnData } from 'com.metacontent.cobblenav.spawndata';
  import { LocalPlayer } from 'net.minecraft.client.player';

  interface CounterClientCollector extends ClientCollector, ConfigureableCollector {}
  class CounterClientCollector extends ClientCollector {
    constructor(api: ModAPI);
    get neededInstalledMods(): ModDependency[];
    get neededUninstalledMods(): ModDependency[];
    set neededInstalledMods(list: ModDependency[]);
    set neededUninstalledMods(list: ModDependency[]);
  }


  interface FishingCountCollector extends CounterClientCollector {}
  class FishingCountCollector extends CounterClientCollector {
    constructor(api: ModAPI);
    collect(spawnData: SpawnData, player: LocalPlayer): MutableComponent;
    get configName(): string;
  }


  interface StreakCountCollector extends CounterClientCollector {}
  class StreakCountCollector extends CounterClientCollector {
    constructor(api: ModAPI);
    collect(spawnData: SpawnData, player: LocalPlayer): MutableComponent;
    get configName(): string;
  }

}

declare module 'com.metacontent.cobblenav.spawndata.collector.client' {
  import { ClientCollector, ConfigureableCollector } from 'com.metacontent.cobblenav.spawndata.collector';
  import { List } from 'java.util';
  import { ModDependency } from 'com.metacontent.cobblenav.util';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { SpawnData } from 'com.metacontent.cobblenav.spawndata';
  import { LocalPlayer } from 'net.minecraft.client.player';

  interface EncounterCollector extends ClientCollector, ConfigureableCollector {}
  class EncounterCollector extends ClientCollector {
    constructor();
    collect(spawnData: SpawnData, player: LocalPlayer): MutableComponent;
    get configName(): string;
    get neededInstalledMods(): ModDependency[];
    get neededUninstalledMods(): ModDependency[];
    set neededInstalledMods(list: ModDependency[]);
    set neededUninstalledMods(list: ModDependency[]);
  }

}

declare module 'com.metacontent.cobblenav.spawndata.collector' {
  import { ModDependant } from 'com.metacontent.cobblenav.util';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { SpawnData } from 'com.metacontent.cobblenav.spawndata';
  import { LocalPlayer } from 'net.minecraft.client.player';
  import { Class, Number, Boolean } from 'java.lang';
  import { SpawningCondition } from 'com.cobblemon.mod.common.api.spawning.condition';
  import { List, Map } from 'java.util';
  import { SpawnablePosition } from 'com.cobblemon.mod.common.api.spawning.position';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Builder } from 'com.metacontent.cobblenav.api.platform.SpawnDataContext';

  interface ClientCollector extends ModDependant {}
  class ClientCollector extends ModDependant {
    collect(var1: SpawnData, var2: LocalPlayer): MutableComponent;
  }


  interface Collector<T extends SpawningCondition<any> = any> extends ModDependant {}
  class Collector<T extends SpawningCondition<any> = any> extends ModDependant {
    get conditionClass(): Class<T>;
    supports(condition: SpawningCondition<any>): boolean;
  }


  interface ConditionCollector<T extends SpawningCondition<any> = any> extends Collector<T> {}
  class ConditionCollector<T extends SpawningCondition<any> = any> extends Collector<T> {
    collect(var1: T, var2: SpawnablePosition[], var3: ServerPlayer, var4: Builder): MutableComponent;
    formatValueRange(min: Number, max: Number, useSpaces: boolean): string;
    static formatValueRange$default(conditionCollector: ConditionCollector, number: Number, number2: Number, bl: boolean, n: number, object: any): string;
  }


  class ConfigureableCollector {
    allowed(collectors: Map<string, boolean>): boolean;
    get configName(): string;
  }

}

declare module 'com.metacontent.cobblenav.spawndata.collector.ClientCollector' {
  import { ClientCollector } from 'com.metacontent.cobblenav.spawndata.collector';

  class DefaultImpls {
    static isModDependencySatisfied($this: ClientCollector): boolean;
  }

}

declare module 'com.metacontent.cobblenav.spawndata.collector.Collector' {
  import { Collector } from 'com.metacontent.cobblenav.spawndata.collector';
  import { SpawningCondition } from 'com.cobblemon.mod.common.api.spawning.condition';

  class DefaultImpls {
    static isModDependencySatisfied<T extends SpawningCondition<any>>($this: Collector<T>): boolean;
    static supports<T extends SpawningCondition<any>>($this: Collector<T>, condition: SpawningCondition<any>): boolean;
  }

}

declare module 'com.metacontent.cobblenav.spawndata.collector.ConditionCollector' {
  import { ConditionCollector } from 'com.metacontent.cobblenav.spawndata.collector';
  import { Number } from 'java.lang';
  import { SpawningCondition } from 'com.cobblemon.mod.common.api.spawning.condition';

  class DefaultImpls {
    static formatValueRange<T extends SpawningCondition<any>>($this: ConditionCollector<T>, min: Number, max: Number, useSpaces: boolean): string;
    static formatValueRange$default(conditionCollector: ConditionCollector, number: Number, number2: Number, bl: boolean, n: number, object: any): string;
    static isModDependencySatisfied<T extends SpawningCondition<any>>($this: ConditionCollector<T>): boolean;
    static supports<T extends SpawningCondition<any>>($this: ConditionCollector<T>, condition: SpawningCondition<any>): boolean;
  }

}

declare module 'com.metacontent.cobblenav.spawndata.collector.ConfigureableCollector' {
  import { ConfigureableCollector } from 'com.metacontent.cobblenav.spawndata.collector';
  import { Map } from 'java.util';
  import { Boolean } from 'java.lang';

  class DefaultImpls {
    static allowed($this: ConfigureableCollector, collectors: Map<string, boolean>): boolean;
  }

}

declare module 'com.metacontent.cobblenav.spawndata.collector.general' {
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { SpawningCondition } from 'com.cobblemon.mod.common.api.spawning.condition';
  import { List } from 'java.util';
  import { SpawnablePosition } from 'com.cobblemon.mod.common.api.spawning.position';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Builder } from 'com.metacontent.cobblenav.api.platform.SpawnDataContext';
  import { ConditionCollector, ConfigureableCollector } from 'com.metacontent.cobblenav.spawndata.collector';
  import { Class } from 'java.lang';
  import { ModDependency } from 'com.metacontent.cobblenav.util';

  interface CoordinatesCollector extends GeneralConditionCollector {}
  class CoordinatesCollector extends GeneralConditionCollector {
    constructor();
    collect(condition: SpawningCondition<any>, spawnablePositions: SpawnablePosition[], player: ServerPlayer, builder: Builder): MutableComponent;
    get configName(): string;
  }


  interface GeneralConditionCollector extends ConditionCollector<SpawningCondition>, ConfigureableCollector {}
  class GeneralConditionCollector extends ConditionCollector<SpawningCondition> {
    get conditionClass(): Class<SpawningCondition<any>>;
    get neededInstalledMods(): ModDependency[];
    get neededUninstalledMods(): ModDependency[];
    set neededInstalledMods(list: ModDependency[]);
    set neededUninstalledMods(list: ModDependency[]);
  }


  interface LightCollector extends GeneralConditionCollector {}
  class LightCollector extends GeneralConditionCollector {
    constructor();
    collect(condition: SpawningCondition<any>, spawnablePositions: SpawnablePosition[], player: ServerPlayer, builder: Builder): MutableComponent;
    get configName(): string;
  }


  interface MoonPhaseCollector extends GeneralConditionCollector {}
  class MoonPhaseCollector extends GeneralConditionCollector {
    constructor();
    collect(condition: SpawningCondition<any>, spawnablePositions: SpawnablePosition[], player: ServerPlayer, builder: Builder): MutableComponent;
    get configName(): string;
  }


  interface SkyLightCollector extends GeneralConditionCollector {}
  class SkyLightCollector extends GeneralConditionCollector {
    constructor();
    collect(condition: SpawningCondition<any>, spawnablePositions: SpawnablePosition[], player: ServerPlayer, builder: Builder): MutableComponent;
    get configName(): string;
  }


  interface SlimeChunkCollector extends GeneralConditionCollector {}
  class SlimeChunkCollector extends GeneralConditionCollector {
    constructor();
    collect(condition: SpawningCondition<any>, spawnablePositions: SpawnablePosition[], player: ServerPlayer, builder: Builder): MutableComponent;
    get configName(): string;
  }


  interface TimeRangeCollector extends GeneralConditionCollector {}
  class TimeRangeCollector extends GeneralConditionCollector {
    constructor();
    collect(condition: SpawningCondition<any>, spawnablePositions: SpawnablePosition[], player: ServerPlayer, builder: Builder): MutableComponent;
    get configName(): string;
  }


  interface UnderOpenSkyCollector extends GeneralConditionCollector {}
  class UnderOpenSkyCollector extends GeneralConditionCollector {
    constructor();
    collect(condition: SpawningCondition<any>, spawnablePositions: SpawnablePosition[], player: ServerPlayer, builder: Builder): MutableComponent;
    get configName(): string;
  }


  interface WeatherCollector extends GeneralConditionCollector {}
  class WeatherCollector extends GeneralConditionCollector {
    constructor();
    collect(condition: SpawningCondition<any>, spawnablePositions: SpawnablePosition[], player: ServerPlayer, builder: Builder): MutableComponent;
    get configName(): string;
  }


  interface YHeightCollector extends GeneralConditionCollector {}
  class YHeightCollector extends GeneralConditionCollector {
    constructor();
    collect(condition: SpawningCondition<any>, spawnablePositions: SpawnablePosition[], player: ServerPlayer, builder: Builder): MutableComponent;
    get configName(): string;
  }

}

declare module 'com.metacontent.cobblenav.spawndata.collector.special' {
  import { ConditionCollector, ConfigureableCollector } from 'com.metacontent.cobblenav.spawndata.collector';
  import { FishingSpawningCondition, SubmergedTypeSpawningCondition, SurfaceTypeSpawningCondition } from 'com.cobblemon.mod.common.api.spawning.condition';
  import { Class } from 'java.lang';
  import { List } from 'java.util';
  import { ModDependency } from 'com.metacontent.cobblenav.util';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { SpawnablePosition } from 'com.cobblemon.mod.common.api.spawning.position';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Builder } from 'com.metacontent.cobblenav.api.platform.SpawnDataContext';

  interface BaitCollector extends ConditionCollector<FishingSpawningCondition>, ConfigureableCollector {}
  class BaitCollector extends ConditionCollector<FishingSpawningCondition> {
    constructor();
    collect(condition: FishingSpawningCondition, spawnablePositions: SpawnablePosition[], player: ServerPlayer, builder: Builder): MutableComponent;
    get conditionClass(): Class<FishingSpawningCondition>;
    get configName(): string;
    get neededInstalledMods(): ModDependency[];
    get neededUninstalledMods(): ModDependency[];
    set neededInstalledMods(list: ModDependency[]);
    set neededUninstalledMods(list: ModDependency[]);
  }


  interface DepthSubmergedCollector extends ConditionCollector<SubmergedTypeSpawningCondition>, ConfigureableCollector {}
  class DepthSubmergedCollector extends ConditionCollector<SubmergedTypeSpawningCondition> {
    constructor();
    collect(condition: SubmergedTypeSpawningCondition<any>, spawnablePositions: SpawnablePosition[], player: ServerPlayer, builder: Builder): MutableComponent;
    get conditionClass(): Class<SubmergedTypeSpawningCondition<any>>;
    get configName(): string;
    get neededInstalledMods(): ModDependency[];
    get neededUninstalledMods(): ModDependency[];
    set neededInstalledMods(list: ModDependency[]);
    set neededUninstalledMods(list: ModDependency[]);
  }


  interface DepthSurfaceCollector extends ConditionCollector<SurfaceTypeSpawningCondition>, ConfigureableCollector {}
  class DepthSurfaceCollector extends ConditionCollector<SurfaceTypeSpawningCondition> {
    constructor();
    collect(condition: SurfaceTypeSpawningCondition<any>, spawnablePositions: SpawnablePosition[], player: ServerPlayer, builder: Builder): MutableComponent;
    get conditionClass(): Class<SurfaceTypeSpawningCondition<any>>;
    get configName(): string;
    get neededInstalledMods(): ModDependency[];
    get neededUninstalledMods(): ModDependency[];
    set neededInstalledMods(list: ModDependency[]);
    set neededUninstalledMods(list: ModDependency[]);
  }


  interface FluidSubmergedCollector extends ConditionCollector<SubmergedTypeSpawningCondition>, ConfigureableCollector {}
  class FluidSubmergedCollector extends ConditionCollector<SubmergedTypeSpawningCondition> {
    constructor();
    collect(condition: SubmergedTypeSpawningCondition<any>, spawnablePositions: SpawnablePosition[], player: ServerPlayer, builder: Builder): MutableComponent;
    get conditionClass(): Class<SubmergedTypeSpawningCondition<any>>;
    get configName(): string;
    get neededInstalledMods(): ModDependency[];
    get neededUninstalledMods(): ModDependency[];
    set neededInstalledMods(list: ModDependency[]);
    set neededUninstalledMods(list: ModDependency[]);
  }


  interface FluidSurfaceCollector extends ConditionCollector<SurfaceTypeSpawningCondition>, ConfigureableCollector {}
  class FluidSurfaceCollector extends ConditionCollector<SurfaceTypeSpawningCondition> {
    constructor();
    collect(condition: SurfaceTypeSpawningCondition<any>, spawnablePositions: SpawnablePosition[], player: ServerPlayer, builder: Builder): MutableComponent;
    get conditionClass(): Class<SurfaceTypeSpawningCondition<any>>;
    get configName(): string;
    get neededInstalledMods(): ModDependency[];
    get neededUninstalledMods(): ModDependency[];
    set neededInstalledMods(list: ModDependency[]);
    set neededUninstalledMods(list: ModDependency[]);
  }


  interface LureLevelCollector extends ConditionCollector<FishingSpawningCondition>, ConfigureableCollector {}
  class LureLevelCollector extends ConditionCollector<FishingSpawningCondition> {
    constructor();
    collect(condition: FishingSpawningCondition, spawnablePositions: SpawnablePosition[], player: ServerPlayer, builder: Builder): MutableComponent;
    get conditionClass(): Class<FishingSpawningCondition>;
    get configName(): string;
    get neededInstalledMods(): ModDependency[];
    get neededUninstalledMods(): ModDependency[];
    set neededInstalledMods(list: ModDependency[]);
    set neededUninstalledMods(list: ModDependency[]);
  }


  interface RodCollector extends ConditionCollector<FishingSpawningCondition>, ConfigureableCollector {}
  class RodCollector extends ConditionCollector<FishingSpawningCondition> {
    constructor();
    collect(condition: FishingSpawningCondition, spawnablePositions: SpawnablePosition[], player: ServerPlayer, builder: Builder): MutableComponent;
    get conditionClass(): Class<FishingSpawningCondition>;
    get configName(): string;
    get neededInstalledMods(): ModDependency[];
    get neededUninstalledMods(): ModDependency[];
    set neededInstalledMods(list: ModDependency[]);
    set neededUninstalledMods(list: ModDependency[]);
  }


  interface RodTypeCollector extends ConditionCollector<FishingSpawningCondition>, ConfigureableCollector {}
  class RodTypeCollector extends ConditionCollector<FishingSpawningCondition> {
    constructor();
    collect(condition: FishingSpawningCondition, spawnablePositions: SpawnablePosition[], player: ServerPlayer, builder: Builder): MutableComponent;
    get conditionClass(): Class<FishingSpawningCondition>;
    get configName(): string;
    get neededInstalledMods(): ModDependency[];
    get neededUninstalledMods(): ModDependency[];
    set neededInstalledMods(list: ModDependency[]);
    set neededUninstalledMods(list: ModDependency[]);
  }

}

declare module 'com.metacontent.cobblenav.spawndata' {
  import { AreaSpawnablePositionResolver, AreaSpawnablePosition } from 'com.cobblemon.mod.common.api.spawning.position';
  import { List, Set } from 'java.util';
  import { Spawner } from 'com.cobblemon.mod.common.api.spawning.spawner';
  import { AreaSpawnablePositionCalculator } from 'com.cobblemon.mod.common.api.spawning.position.calculators';
  import { SpawningZone } from 'com.cobblemon.mod.common.api.spawning';
  import { Encodable } from 'com.cobblemon.mod.common.api.net';
  import { Companion } from 'com.metacontent.cobblenav.spawndata.SpawnData';
  import { RenderablePokemon } from 'com.cobblemon.mod.common.pokemon';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { PokedexEntryProgress } from 'com.cobblemon.mod.common.api.pokedex';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  interface PokenavSpawnablePositionResolver extends AreaSpawnablePositionResolver {}
  class PokenavSpawnablePositionResolver extends AreaSpawnablePositionResolver {
    resolve(spawner: Spawner, spawnablePositionCalculators: AreaSpawnablePositionCalculator<any>[], zone: SpawningZone): AreaSpawnablePosition[];
  }


  interface SpawnData extends Encodable {}
  class SpawnData extends Encodable {
    static readonly Companion: Companion;
    constructor(renderable: RenderablePokemon, spawnAspects: Set<string>, spawnChance: number, platform: ResourceLocation, spawningContext: string, knowledge: PokedexEntryProgress, conditions: MutableComponent[], blockConditions: BlockConditions);
    component1(): RenderablePokemon;
    component2(): Set<string>;
    component3(): number;
    component4(): ResourceLocation;
    component5(): string;
    component6(): PokedexEntryProgress;
    component7(): MutableComponent[];
    component8(): BlockConditions;
    copy(renderable: RenderablePokemon, spawnAspects: Set<string>, spawnChance: number, platform: ResourceLocation, spawningContext: string, knowledge: PokedexEntryProgress, conditions: MutableComponent[], blockConditions: BlockConditions): SpawnData;
    static copy$default(spawnData: SpawnData, renderablePokemon: RenderablePokemon, set: Set, f: number, resourceLocation: ResourceLocation, string: string, pokedexEntryProgress: PokedexEntryProgress, list: List, blockConditions: BlockConditions, n: number, object: any): SpawnData;
    encode(buffer: RegistryFriendlyByteBuf): void;
    equals(other: any): boolean;
    get blockConditions(): BlockConditions;
    get conditions(): MutableComponent[];
    get encountered(): boolean;
    get knowledge(): PokedexEntryProgress;
    get platform(): ResourceLocation;
    get renderable(): RenderablePokemon;
    get spawnAspects(): Set<string>;
    get spawnChance(): number;
    get spawningContext(): string;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'com.metacontent.cobblenav.spawndata.SpawnData' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { SpawnData } from 'com.metacontent.cobblenav.spawndata';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): SpawnData;
  }

}

declare module 'com.metacontent.cobblenav.util' {
  import { PokeRodFishingBobberEntity } from 'com.cobblemon.mod.common.entity.fishing';
  import { GrowingPlantHeadBlock, GrowingPlantBlock } from 'net.minecraft.world.level.block';
  import { List } from 'java.util';
  import { Encodable } from 'com.cobblemon.mod.common.api.net';
  import { Companion } from 'com.metacontent.cobblenav.util.WeightedBucket';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class CustomizableBlurEffectProcessor {
    cobblenav$processBlurEffect(var1: number, var2: number): void;
  }


  class FishTravelChecker {
    cobblenav$isTraveling(): boolean;
  }


  class MixinUtilsKt {
    static getHeadBlock($this$getHeadBlock: GrowingPlantBlock): GrowingPlantHeadBlock;
    static isTraveling($this$isTraveling: PokeRodFishingBobberEntity): boolean;
  }


  class ModDependant {
    get neededInstalledMods(): ModDependency[];
    get neededUninstalledMods(): ModDependency[];
    isModDependencySatisfied(): boolean;
    set neededInstalledMods(var1: ModDependency[]);
    set neededUninstalledMods(var1: ModDependency[]);
  }


  class ModDependency {
    constructor(id: string, version: string);
    component1(): string;
    component2(): string;
    copy(id: string, version: string): ModDependency;
    static copy$default(modDependency: ModDependency, string: string, string2: string, n: number, object: any): ModDependency;
    equals(other: any): boolean;
    get id(): string;
    get version(): string;
    hashCode(): number;
    toString(): string;
  }


  interface WeightedBucket extends Encodable {}
  class WeightedBucket extends Encodable {
    static readonly Companion: Companion;
    constructor(name: string, chance: number);
    component1(): string;
    component2(): number;
    copy(name: string, chance: number): WeightedBucket;
    static copy$default(weightedBucket: WeightedBucket, string: string, f: number, n: number, object: any): WeightedBucket;
    encode(buffer: RegistryFriendlyByteBuf): void;
    equals(other: any): boolean;
    get chance(): number;
    get name(): string;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'com.metacontent.cobblenav.util.finder' {
  import { Encodable } from 'com.cobblemon.mod.common.api.net';
  import { Companion } from 'com.metacontent.cobblenav.util.finder.FoundPokemon';
  import { Set, List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { PokemonEntity } from 'com.cobblemon.mod.common.entity.pokemon';
  import { ServerPlayer, ServerLevel } from 'net.minecraft.server.level';

  interface FoundPokemon extends Encodable {}
  class FoundPokemon extends Encodable {
    static readonly Companion: Companion;
    constructor(found: boolean, entityId: number, aspects: Set<string>, level: number, potentialStars: number, ability: Component, isAbilityHidden: boolean, eggMove: Component, rating: number);
    component1(): boolean;
    component2(): number;
    component3(): Set<string>;
    component4(): number;
    component5(): number;
    component6(): Component;
    component7(): boolean;
    component8(): Component;
    component9(): number;
    copy(found: boolean, entityId: number, aspects: Set<string>, level: number, potentialStars: number, ability: Component, isAbilityHidden: boolean, eggMove: Component, rating: number): FoundPokemon;
    static copy$default(foundPokemon: FoundPokemon, bl: boolean, n: number, set: Set, n2: number, n3: number, component: Component, bl2: boolean, component2: Component, f: number, n4: number, object: any): FoundPokemon;
    encode(buffer: RegistryFriendlyByteBuf): void;
    equals(other: any): boolean;
    get ability(): Component;
    get aspects(): Set<string>;
    get eggMove(): Component;
    get entityId(): number;
    get found(): boolean;
    get level(): number;
    get potentialStars(): number;
    get rating(): number;
    hashCode(): number;
    isAbilityHidden(): boolean;
    toString(): string;
  }


  interface NearestPokemonFinder extends PokemonFinder {}
  class NearestPokemonFinder extends PokemonFinder {
    static readonly INSTANCE: NearestPokemonFinder;
    select(pokemonEntities: PokemonEntity[], player: ServerPlayer, serverLevel: ServerLevel): FoundPokemon;
  }

}

declare module 'com.metacontent.cobblenav.util.finder.FoundPokemon' {
  import { Set } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { FoundPokemon } from 'com.metacontent.cobblenav.util.finder';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Builder {
    build(): FoundPokemon;
    get ability(): Component;
    get aspects(): Set<string>;
    get eggMove(): Component;
    get entityId(): number;
    get found(): boolean;
    get level(): number;
    get potentialStars(): number;
    get rating(): number;
    isAbilityHidden(): boolean;
    set ability(component: Component);
    set aspects(set: Set<string>);
    set eggMove(component: Component);
    set entityId(n: number);
    set found(bl: boolean);
    set level(n: number);
    set potentialStars(n: number);
    set rating(f: number);
    setAbilityHidden(bl: boolean): void;
  }


  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): FoundPokemon;
    get nOT_FOUND(): FoundPokemon;
  }

}

declare module 'com.metacontent.cobblenav.util.ModDependant' {
  import { ModDependant } from 'com.metacontent.cobblenav.util';

  class DefaultImpls {
    static isModDependencySatisfied($this: ModDependant): boolean;
  }

}

declare module 'com.metacontent.cobblenav.util.WeightedBucket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { WeightedBucket } from 'com.metacontent.cobblenav.util';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): WeightedBucket;
  }

}