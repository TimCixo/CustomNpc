declare module 'org.enginehub.worldeditcui.config' {
  import { InitialisationFactory } from 'org.enginehub.worldeditcui';
  import { Map } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  interface CUIConfiguration extends InitialisationFactory {}
  class CUIConfiguration extends InitialisationFactory {
    changeValue(text: string, value: any): void;
    configChanged(): void;
    static create(): CUIConfiguration;
    get configArray(): Map<string, any>;
    getDefaultValue(text: string): any;
    getDescription(text: string): Component;
    getTooltip(text: string): Component;
    initialise(): void;
    isClearAllOnKey(): boolean;
    isDebugMode(): boolean;
    isPromiscuous(): boolean;
    save(): void;
    setClearAllOnKey(clearAllOnKey: boolean): void;
    setPromiscuous(promiscuous: boolean): void;
  }

}

declare module 'org.enginehub.worldeditcui.debug' {
  import { InitialisationFactory, WorldEditCUI } from 'org.enginehub.worldeditcui';
  import { Throwable } from 'java.lang';
  import { AbstractFilter } from 'org.apache.logging.log4j.core.filter';
  import { Result } from 'Filter';
  import { LogEvent, Logger } from 'org.apache.logging.log4j.core';
  import { Level, Marker } from 'org.apache.logging.log4j';
  import { Message } from 'org.apache.logging.log4j.message';

  interface CUIDebug extends InitialisationFactory {}
  class CUIDebug extends InitialisationFactory {
    constructor(controller: WorldEditCUI);
    debug(message: string): void;
    error(message: string, exception: Throwable): void;
    info(message: string): void;
    info(message: string, e: Throwable): void;
    initialise(): void;
  }


  interface DebugModeEnabledFilter extends AbstractFilter {}
  class DebugModeEnabledFilter extends AbstractFilter {
    filter(event: LogEvent): Result;
    filter(logger: Logger, level: Level, marker: Marker, msg: Message, t: Throwable): Result;
    filter(logger: Logger, level: Level, marker: Marker, msg: any, t: Throwable): Result;
    filter(logger: Logger, level: Level, marker: Marker, msg: string, ...params: any[]): Result;
  }

}

declare module 'org.enginehub.worldeditcui.event.cui' {
  import { CUIEvent, CUIEventArgs, CUIEventType } from 'org.enginehub.worldeditcui.event';

  interface CUIEventBounds extends CUIEvent {}
  class CUIEventBounds extends CUIEvent {
    constructor(args: CUIEventArgs);
    get eventType(): CUIEventType;
    raise(): string;
  }


  interface CUIEventColour extends CUIEvent {}
  class CUIEventColour extends CUIEvent {
    constructor(args: CUIEventArgs);
    get eventType(): CUIEventType;
    prepare(): void;
    raise(): string;
  }


  interface CUIEventCylinder extends CUIEvent {}
  class CUIEventCylinder extends CUIEvent {
    constructor(args: CUIEventArgs);
    get eventType(): CUIEventType;
    raise(): string;
  }


  interface CUIEventEllipsoid extends CUIEvent {}
  class CUIEventEllipsoid extends CUIEvent {
    constructor(args: CUIEventArgs);
    get eventType(): CUIEventType;
    raise(): string;
  }


  interface CUIEventGrid extends CUIEvent {}
  class CUIEventGrid extends CUIEvent {
    constructor(args: CUIEventArgs);
    get eventType(): CUIEventType;
    prepare(): void;
    raise(): string;
  }


  interface CUIEventPoint2D extends CUIEventPoint3D {}
  class CUIEventPoint2D extends CUIEventPoint3D {
    constructor(args: CUIEventArgs);
    get eventType(): CUIEventType;
    raise(): string;
  }


  interface CUIEventPoint3D extends CUIEvent {}
  class CUIEventPoint3D extends CUIEvent {
    constructor(args: CUIEventArgs);
    get eventType(): CUIEventType;
    raise(): string;
  }


  interface CUIEventPolygon extends CUIEvent {}
  class CUIEventPolygon extends CUIEvent {
    constructor(args: CUIEventArgs);
    get eventType(): CUIEventType;
    raise(): string;
  }


  interface CUIEventSelection extends CUIEvent {}
  class CUIEventSelection extends CUIEvent {
    constructor(args: CUIEventArgs);
    get eventType(): CUIEventType;
    raise(): string;
  }


  interface CUIEventUpdate extends CUIEvent {}
  class CUIEventUpdate extends CUIEvent {
    constructor(args: CUIEventArgs);
    get eventType(): CUIEventType;
    raise(): string;
  }

}

declare module 'org.enginehub.worldeditcui.event' {
  import { WorldEditCUI, InitialisationFactory } from 'org.enginehub.worldeditcui';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class CUIEvent {
    constructor(args: CUIEventArgs);
    get eventName(): string;
    get eventType(): CUIEventType;
    getDouble(index: number): number;
    getInt(index: number): number;
    getString(index: number): string;
    isValid(): boolean;
    prepare(): void;
    raise(): string;
  }


  class CUIEventArgs {
    constructor(controller: WorldEditCUI, multi: boolean, type: string, params: string[]);
    get controller(): WorldEditCUI;
    get params(): string[];
    get type(): string;
    isMulti(): boolean;
  }


  interface CUIEventDispatcher extends InitialisationFactory {}
  class CUIEventDispatcher extends InitialisationFactory {
    constructor(controller: WorldEditCUI);
    initialise(): void;
    raiseEvent(eventArgs: CUIEventArgs): void;
  }


  interface CUIEventType extends Enum<CUIEventType> {}
  class CUIEventType extends Enum<CUIEventType> {
    static readonly SELECTION: CUIEventType;
    static readonly POINT: CUIEventType;
    static readonly POINT2D: CUIEventType;
    static readonly ELLIPSOID: CUIEventType;
    static readonly CYLINDER: CUIEventType;
    static readonly MINMAX: CUIEventType;
    static readonly UPDATE: CUIEventType;
    static readonly POLYGON: CUIEventType;
    static readonly COLOUR: CUIEventType;
    static readonly GRID: CUIEventType;
    get key(): string;
    get maxParameters(): number;
    get minParameters(): number;
    get name(): string;
    make(args: CUIEventArgs): CUIEvent;
    static named(key: string): CUIEventType;
    static valueOf(name: string): CUIEventType;
    static values(): CUIEventType[];
  }

}

declare module 'org.enginehub.worldeditcui.event.listeners' {
  import { WorldEditCUI } from 'org.enginehub.worldeditcui';
  import { Minecraft } from 'net.minecraft.client';
  import { List } from 'java.util';
  import { PipelineProvider, RenderSink, LineStyle } from 'org.enginehub.worldeditcui.render';
  import { Vector3 } from 'org.enginehub.worldeditcui.util';
  import { Matrix4fStack } from 'org.joml';
  import { Consumer } from 'java.util.function';
  import { Colour } from 'org.enginehub.worldeditcui.config';
  import { RenderType } from 'org.enginehub.worldeditcui.render.RenderStyle';

  class CUIListenerChannel {
    constructor(controller: WorldEditCUI);
    onMessage(message: string): void;
  }


  class CUIListenerWorldRender {
    constructor(controller: WorldEditCUI, minecraft: Minecraft, pipelines: PipelineProvider[]);
    onRender(partialTicks: number): void;
  }


  interface CUIRenderContext extends RenderSink {}
  class CUIRenderContext extends RenderSink {
    apply(line: LineStyle, type: RenderType): boolean;
    applyMatrices(): void;
    beginLineLoop(): CUIRenderContext;
    beginLines(): RenderSink;
    beginQuads(): CUIRenderContext;
    cameraPos(): Vector3;
    color(r: number, g: number, b: number, alpha: number): CUIRenderContext;
    color(colour: Colour): CUIRenderContext;
    color(style: LineStyle): RenderSink;
    color(style: LineStyle, tint: number): RenderSink;
    dt(): number;
    endLineLoop(): CUIRenderContext;
    endLines(): RenderSink;
    endQuads(): CUIRenderContext;
    flush(): void;
    poseStack(): Matrix4fStack;
    vertex(x: number, y: number, z: number): CUIRenderContext;
    withCameraAt(pos: Vector3, action: Consumer<CUIRenderContext>): void;
  }

}

declare module 'org.enginehub.worldeditcui.exceptions' {
  import { Exception, RuntimeException } from 'java.lang';

  interface InitialisationException extends Exception {}
  class InitialisationException extends Exception {
    constructor(string: string);

    constructor();
  }


  interface InvalidSelectionTypeException extends RuntimeException {}
  class InvalidSelectionTypeException extends RuntimeException {
    constructor(regionType: string, eventName: string);
  }

}

declare module 'org.enginehub.worldeditcui.gui' {
  import { ContainerObjectSelectionList } from 'net.minecraft.client.gui.components';
  import { ConfigEntry } from 'org.enginehub.worldeditcui.gui.CUIConfigList';
  import { Minecraft } from 'net.minecraft.client';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { CUIConfiguration } from 'org.enginehub.worldeditcui.config';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface CUIConfigList extends ContainerObjectSelectionList<ConfigEntry> {}
  class CUIConfigList extends ContainerObjectSelectionList<ConfigEntry> {
    constructor(panel: CUIConfigPanel, minecraft: Minecraft);
    get rowWidth(): number;
  }


  interface CUIConfigPanel extends Screen {}
  class CUIConfigPanel extends Screen {
    constructor(parent: Screen, configuration: CUIConfiguration);
    render(gfx: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }

}

declare module 'org.enginehub.worldeditcui.gui.CUIConfigList' {
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { NarratableEntry } from 'net.minecraft.client.gui.narration';
  import { Entry } from 'ContainerObjectSelectionList';

  interface OnOffEntry extends ConfigEntry {}
  class OnOffEntry extends ConfigEntry {
    constructor(tag: string);
    children(): GuiEventListener[];
    narratables(): NarratableEntry[];
    render(gfx: GuiGraphics, index: number, top: number, left: number, width: number, height: number, mouseX: number, mouseY: number, isMouseOver: boolean, partialTick: number): void;
  }


  interface ColorConfigEntry extends ConfigEntry {}
  class ColorConfigEntry extends ConfigEntry {
    constructor(tag: string);
    children(): GuiEventListener[];
    narratables(): NarratableEntry[];
    render(gfx: GuiGraphics, index: number, top: number, left: number, width: number, height: number, mouseX: number, mouseY: number, isMouseOver: boolean, partialTick: number): void;
  }


  interface ConfigEntry extends Entry<ConfigEntry> {}
  class ConfigEntry extends Entry<ConfigEntry> {
    constructor(tag: string);
    render(gfx: GuiGraphics, index: number, top: number, left: number, width: number, height: number, mouseX: number, mouseY: number, isMouseOver: boolean, partialTick: number): void;
  }

}

declare module 'org.enginehub.worldeditcui' {
  import { Minecraft } from 'net.minecraft.client';
  import { CUIEventDispatcher } from 'org.enginehub.worldeditcui.event';
  import { CUISelectionProvider } from 'org.enginehub.worldeditcui.render';
  import { CUIConfiguration } from 'org.enginehub.worldeditcui.config';
  import { CUIDebug } from 'org.enginehub.worldeditcui.debug';
  import { Region } from 'org.enginehub.worldeditcui.render.region';
  import { UUID } from 'java.util';
  import { CUIRenderContext } from 'org.enginehub.worldeditcui.event.listeners';

  class InitialisationFactory {
    initialise(): void;
  }


  class WorldEditCUI {
    static readonly PROTOCOL_VERSION: number;
    clear(): void;
    clearRegions(): void;
    clearSelection(): void;
    get configuration(): CUIConfiguration;
    get debugger(): CUIDebug;
    get dispatcher(): CUIEventDispatcher;
    get selectionProvider(): CUISelectionProvider;
    getSelection(multi: boolean): Region;
    initialise(minecraft: Minecraft): void;
    renderSelections(ctx: CUIRenderContext): void;
    setSelection(id: UUID, region: Region): void;
    toggleChunkBorders(): void;
  }

}

declare module 'org.enginehub.worldeditcui.neoforge' {
  import { RegisterPayloadHandlersEvent } from 'net.neoforged.neoforge.network.event';
  import { ClientPacketListener } from 'net.minecraft.client.multiplayer';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';
  import { Minecraft, DeltaTracker } from 'net.minecraft.client';
  import { WorldEditCUI } from 'org.enginehub.worldeditcui';

  class CUINetworking {
    static register(event: RegisterPayloadHandlersEvent): void;
    static send(handler: ClientPacketListener, text: string): void;
  }


  class NeoForgeModWorldEditCUI {
    static readonly MOD_ID: string;
    constructor(eventBus: IEventBus, container: ModContainer);
    get controller(): WorldEditCUI;
    static get instance(): NeoForgeModWorldEditCUI;
    onGameInitDone(client: Minecraft): void;
    onJoinGame(handler: ClientPacketListener): void;
    onPluginMessage(stringPayload: string): void;
    onPostRenderEntities(timer: DeltaTracker): void;
  }

}

declare module 'org.enginehub.worldeditcui.neoforge.mixins' {
  import { PostChain } from 'net.minecraft.client.renderer';
  import { Map } from 'java.util';
  import { ConnectionProtocol } from 'net.minecraft.network';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { PayloadRegistration } from 'net.neoforged.neoforge.network.registration';

  class LevelRendererAccessor {
    get transparencyChain(): PostChain;
  }


  class NetworkRegistryAccessor {
    static getPAYLOAD_REGISTRATIONS(): Map<ConnectionProtocol, Map<ResourceLocation, PayloadRegistration<any>>>;
  }

}

declare module 'org.enginehub.worldeditcui.render' {
  import { TypeFactory } from 'org.enginehub.worldeditcui.render.BufferBuilderRenderSink';
  import { Runnable, Enum } from 'java.lang';
  import { RenderType } from 'org.enginehub.worldeditcui.render.RenderStyle';
  import { Colour } from 'org.enginehub.worldeditcui.config';
  import { List } from 'java.util';
  import { InitialisationFactory, WorldEditCUI } from 'org.enginehub.worldeditcui';
  import { Region } from 'org.enginehub.worldeditcui.render.region';

  interface BufferBuilderRenderSink extends RenderSink {}
  class BufferBuilderRenderSink extends RenderSink {
    constructor(types: TypeFactory);

    constructor(types: TypeFactory, preFlush: Runnable, postFlush: Runnable);
    apply(line: LineStyle, type: RenderType): boolean;
    beginLineLoop(): RenderSink;
    beginLines(): RenderSink;
    beginQuads(): RenderSink;
    color(r: number, g: number, b: number, alpha: number): RenderSink;
    color(colour: Colour): RenderSink;
    color(style: LineStyle): RenderSink;
    color(style: LineStyle, tint: number): RenderSink;
    endLineLoop(): RenderSink;
    endLines(): RenderSink;
    endQuads(): RenderSink;
    flush(): void;
    vertex(x: number, y: number, z: number): RenderSink;
  }


  interface ConfiguredColour extends Enum<ConfiguredColour> {}
  class ConfiguredColour extends Enum<ConfiguredColour> {
    static readonly CUBOIDGRID: ConfiguredColour;
    static readonly CUBOIDBOX: ConfiguredColour;
    static readonly CUBOIDPOINT1: ConfiguredColour;
    static readonly CUBOIDPOINT2: ConfiguredColour;
    static readonly POLYGRID: ConfiguredColour;
    static readonly POLYBOX: ConfiguredColour;
    static readonly POLYPOINT: ConfiguredColour;
    static readonly ELLIPSOIDGRID: ConfiguredColour;
    static readonly ELLIPSOIDCENTRE: ConfiguredColour;
    static readonly CYLINDERGRID: ConfiguredColour;
    static readonly CYLINDERBOX: ConfiguredColour;
    static readonly CYLINDERCENTRE: ConfiguredColour;
    static readonly CHUNKBOUNDARY: ConfiguredColour;
    static readonly CHUNKGRID: ConfiguredColour;
    get colour(): Colour;
    get colourIntARGB(): number;
    get default(): Colour;
    get displayName(): string;
    get hidden(): LineStyle;
    get lines(): LineStyle[];
    get normal(): LineStyle;
    set colour(colour: Colour);
    setColourIntRGBA(argb: number): void;
    setDefault(): void;
    style(): RenderStyle;
    static valueOf(name: string): ConfiguredColour;
    static values(): ConfiguredColour[];
  }


  interface CUISelectionProvider extends InitialisationFactory {}
  class CUISelectionProvider extends InitialisationFactory {
    constructor(controller: WorldEditCUI);
    createSelection(key: string): Region;
    initialise(): void;
  }


  interface CustomStyle extends RenderStyle {}
  class CustomStyle extends RenderStyle {
    constructor(colour: Colour);
    get colour(): Colour;
    get lines(): LineStyle[];
    get renderType(): RenderType;
    set colour(colour: Colour);
    set renderType(renderType: RenderType);
  }


  class LineStyle {
    static readonly DEFAULT_WIDTH: number;
    readonly lineWidth: number;
    readonly red: number;
    readonly green: number;
    readonly blue: number;
    readonly alpha: number;
    readonly renderType: RenderType;
    constructor(renderType: RenderType, lineWidth: number, red: number, green: number, blue: number);

    constructor(renderType: RenderType, lineWidth: number, red: number, green: number, blue: number, alpha: number);
  }


  interface OptifinePipelineProvider extends PipelineProvider {}
  class OptifinePipelineProvider extends PipelineProvider {
    available(): boolean;
    id(): string;
    provide(): RenderSink;
    shouldRender(): boolean;
  }


  class PipelineProvider {
    available(): boolean;
    id(): string;
    provide(): RenderSink;
    shouldRender(): boolean;
  }


  class RenderSink {
    apply(var1: LineStyle, var2: RenderType): boolean;
    beginLineLoop(): RenderSink;
    beginLines(): RenderSink;
    beginQuads(): RenderSink;
    color(var1: number, var2: number, var3: number, var4: number): RenderSink;
    color(colour: Colour): RenderSink;
    color(style: LineStyle): RenderSink;
    color(style: LineStyle, tint: number): RenderSink;
    endLineLoop(): RenderSink;
    endLines(): RenderSink;
    endQuads(): RenderSink;
    flush(): void;
    vertex(var1: number, var3: number, var5: number): RenderSink;
  }


  class RenderStyle {
    get colour(): Colour;
    get lines(): LineStyle[];
    get renderType(): RenderType;
    set colour(var1: Colour);
    set renderType(var1: RenderType);
  }


  interface VanillaPipelineProvider extends PipelineProvider {}
  class VanillaPipelineProvider extends PipelineProvider {
    available(): boolean;
    id(): string;
    provide(): RenderSink;
  }

}

declare module 'org.enginehub.worldeditcui.render.BufferBuilderRenderSink' {
  import { Mode } from 'VertexFormat';
  import { VertexFormat } from 'com.mojang.blaze3d.vertex';
  import { Supplier } from 'java.util.function';
  import { ShaderInstance } from 'net.minecraft.client.renderer';

  class TypeFactory {
    lines(): RenderType;
    linesLoop(): RenderType;
    quads(): RenderType;
  }


  class RenderType {
    constructor(mode: Mode, format: VertexFormat, shader: Supplier<ShaderInstance>);
  }


  class LineWidth {
  }

}

declare module 'org.enginehub.worldeditcui.render.ConfiguredColour' {
  import { RenderStyle, LineStyle } from 'org.enginehub.worldeditcui.render';
  import { RenderType } from 'org.enginehub.worldeditcui.render.RenderStyle';
  import { Colour } from 'org.enginehub.worldeditcui.config';

  interface Style extends RenderStyle {}
  class Style extends RenderStyle {
    get colour(): Colour;
    get lines(): LineStyle[];
    get renderType(): RenderType;
    set colour(colour: Colour);
    set renderType(renderType: RenderType);
  }

}

declare module 'org.enginehub.worldeditcui.render.OptifinePipelineProvider' {
  import { TypeFactory, RenderType } from 'org.enginehub.worldeditcui.render.BufferBuilderRenderSink';

  interface OptifineTypeFactory extends TypeFactory {}
  class OptifineTypeFactory extends TypeFactory {
    static readonly INSTANCE: OptifineTypeFactory;
    lines(): RenderType;
    linesLoop(): RenderType;
    quads(): RenderType;
  }

}

declare module 'org.enginehub.worldeditcui.render.points' {
  import { Observable, BoundingBox, Vector3, Vector2 } from 'org.enginehub.worldeditcui.util';
  import { CUIRenderContext } from 'org.enginehub.worldeditcui.event.listeners';
  import { RenderStyle } from 'org.enginehub.worldeditcui.render';
  import { Entity } from 'net.minecraft.world.entity';

  interface PointCube extends Observable<BoundingBox> {}
  class PointCube extends Observable<BoundingBox> {
    constructor(x: number, y: number, z: number);

    constructor(point: Vector3);
    get id(): number;
    get point(): Vector3;
    get style(): RenderStyle;
    isDynamic(): boolean;
    render(ctx: CUIRenderContext): void;
    set id(id: number);
    set point(point: Vector3);
    set style(style: RenderStyle);
    updatePoint(partialTicks: number): void;
  }


  interface PointCubeTracking extends PointCube {}
  class PointCubeTracking extends PointCube {
    constructor(entity: Entity, traceDistance: number);
    get point(): Vector3;
    isDynamic(): boolean;
    updatePoint(partialTicks: number): void;
  }


  class PointRectangle {
    constructor(x: number, z: number);

    constructor(point: Vector2);
    get max(): number;
    get min(): number;
    get point(): Vector2;
    get style(): RenderStyle;
    render(ctx: CUIRenderContext): void;
    set point(point: Vector2);
    set style(style: RenderStyle);
    setMinMax(min: number, max: number): void;
  }

}

declare module 'org.enginehub.worldeditcui.render.region' {
  import { WorldEditCUI, InitialisationFactory } from 'org.enginehub.worldeditcui';
  import { CUIRenderContext } from 'org.enginehub.worldeditcui.event.listeners';
  import { Entity } from 'net.minecraft.world.entity';
  import { RenderStyle } from 'org.enginehub.worldeditcui.render';
  import { RenderType } from 'org.enginehub.worldeditcui.render.RenderStyle';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface CuboidRegion extends Region {}
  class CuboidRegion extends Region {
    constructor(controller: WorldEditCUI);
    get type(): RegionType;
    render(ctx: CUIRenderContext): void;
    setCuboidPoint(id: number, x: number, y: number, z: number): void;
    setCuboidVertexLatch(id: number, entity: Entity, traceDistance: number): void;
    setGridSpacing(spacing: number): void;
  }


  interface CylinderRegion extends Region {}
  class CylinderRegion extends Region {
    constructor(controller: WorldEditCUI);
    get type(): RegionType;
    render(ctx: CUIRenderContext): void;
    setCylinderCenter(x: number, y: number, z: number): void;
    setCylinderRadius(x: number, z: number): void;
    setMinMax(min: number, max: number): void;
  }


  interface EllipsoidRegion extends Region {}
  class EllipsoidRegion extends Region {
    constructor(controller: WorldEditCUI);
    get type(): RegionType;
    render(ctx: CUIRenderContext): void;
    setEllipsoidCenter(x: number, y: number, z: number): void;
    setEllipsoidRadii(x: number, y: number, z: number): void;
  }


  interface PolygonRegion extends Region {}
  class PolygonRegion extends Region {
    constructor(controller: WorldEditCUI);
    get type(): RegionType;
    render(ctx: CUIRenderContext): void;
    setMinMax(min: number, max: number): void;
    setPolygonPoint(id: number, x: number, z: number): void;
  }


  interface PolyhedronRegion extends Region {}
  class PolyhedronRegion extends Region {
    constructor(controller: WorldEditCUI);
    addPolygon(vertexIds: number[]): void;
    get type(): RegionType;
    render(ctx: CUIRenderContext): void;
    setCuboidPoint(id: number, x: number, y: number, z: number): void;
  }


  interface Region extends InitialisationFactory {}
  class Region extends InitialisationFactory {
    addPolygon(vertexIds: number[]): void;
    get defaultStyles(): RenderStyle[];
    get type(): RegionType;
    initialise(): void;
    render(var1: CUIRenderContext): void;
    setCuboidPoint(id: number, x: number, y: number, z: number): void;
    setCuboidVertexLatch(id: number, entity: Entity, traceDistance: number): void;
    setCylinderCenter(x: number, y: number, z: number): void;
    setCylinderRadius(x: number, z: number): void;
    setEllipsoidCenter(x: number, y: number, z: number): void;
    setEllipsoidRadii(x: number, y: number, z: number): void;
    setGridSpacing(spacing: number): void;
    setMinMax(min: number, max: number): void;
    setPolygonPoint(id: number, x: number, z: number): void;
    setRenderType(renderType: RenderType): void;
    setStyles(...styles: RenderStyle[]): void;
  }


  interface RegionType extends Enum<RegionType> {}
  class RegionType extends Enum<RegionType> {
    static readonly CUBOID: RegionType;
    static readonly POLYGON: RegionType;
    static readonly ELLIPSOID: RegionType;
    static readonly CYLINDER: RegionType;
    static readonly POLYHEDRON: RegionType;
    get key(): string;
    get name(): string;
    make(controller: WorldEditCUI): Region;
    static named(key: string): RegionType;
    static valueOf(name: string): RegionType;
    static values(): RegionType[];
  }

}

declare module 'org.enginehub.worldeditcui.render.RenderStyle' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface RenderType extends Enum<RenderType> {}
  class RenderType extends Enum<RenderType> {
    static readonly ANY: RenderType;
    static readonly HIDDEN: RenderType;
    static readonly VISIBLE: RenderType;
    depthFunc(): number;
    matches(other: RenderType): boolean;
    static valueOf(name: string): RenderType;
    static values(): RenderType[];
  }

}

declare module 'org.enginehub.worldeditcui.render.shapes' {
  import { RenderStyle } from 'org.enginehub.worldeditcui.render';
  import { List } from 'java.util';
  import { PointRectangle, PointCube } from 'org.enginehub.worldeditcui.render.points';
  import { CUIRenderContext } from 'org.enginehub.worldeditcui.event.listeners';
  import { BoundingBox, Vector3, Observable, Observer } from 'org.enginehub.worldeditcui.util';
  import { Minecraft } from 'net.minecraft.client';

  interface Render2DBox extends RenderRegion {}
  class Render2DBox extends RenderRegion {
    constructor(style: RenderStyle, points: PointRectangle[], min: number, max: number);
    render(ctx: CUIRenderContext): void;
  }


  interface Render2DGrid extends RenderRegion {}
  class Render2DGrid extends RenderRegion {
    constructor(style: RenderStyle, points: PointRectangle[], min: number, max: number);
    render(ctx: CUIRenderContext): void;
  }


  interface Render3DBox extends RenderRegion {}
  class Render3DBox extends RenderRegion {
    constructor(style: RenderStyle, region: BoundingBox);

    constructor(style: RenderStyle, first: Vector3, second: Vector3);
    notifyChanged(source: Observable<any>): void;
    render(ctx: CUIRenderContext): void;
    setPosition(region: BoundingBox): void;
    setPosition(first: Vector3, second: Vector3): void;
  }


  interface Render3DGrid extends RenderRegion {}
  class Render3DGrid extends RenderRegion {
    static readonly MIN_SPACING: number;
    constructor(style: RenderStyle, region: BoundingBox);

    constructor(style: RenderStyle, first: Vector3, second: Vector3);
    notifyChanged(source: Observable<any>): void;
    render(ctx: CUIRenderContext): void;
    setPosition(region: BoundingBox): void;
    setPosition(first: Vector3, second: Vector3): void;
    setSpacing(spacing: number): Render3DGrid;
  }


  interface Render3DPolygon extends RenderRegion {}
  class Render3DPolygon extends RenderRegion {
    constructor(style: RenderStyle, ...vertices: Vector3[]);
    render(ctx: CUIRenderContext): void;
  }


  interface RenderChunkBoundary extends RenderRegion {}
  class RenderChunkBoundary extends RenderRegion {
    constructor(boundaryStyle: RenderStyle, gridStyle: RenderStyle, minecraft: Minecraft);
    render(ctx: CUIRenderContext): void;
  }


  interface RenderCylinderBox extends RenderRegion {}
  class RenderCylinderBox extends RenderRegion {
    constructor(style: RenderStyle, centre: PointCube, radX: number, radZ: number, minY: number, maxY: number);
    render(ctx: CUIRenderContext): void;
  }


  interface RenderCylinderCircles extends RenderRegion {}
  class RenderCylinderCircles extends RenderRegion {
    constructor(style: RenderStyle, centre: PointCube, radX: number, radZ: number, minY: number, maxY: number);
    render(ctx: CUIRenderContext): void;
  }


  interface RenderCylinderGrid extends RenderRegion {}
  class RenderCylinderGrid extends RenderRegion {
    constructor(style: RenderStyle, centre: PointCube, radX: number, radZ: number, minY: number, maxY: number);
    render(ctx: CUIRenderContext): void;
  }


  interface RenderEllipsoid extends RenderRegion {}
  class RenderEllipsoid extends RenderRegion {
    constructor(style: RenderStyle, centre: PointCube, radii: Vector3);
    render(ctx: CUIRenderContext): void;
  }


  interface RenderRegion extends Observer {}
  class RenderRegion extends Observer {
    notifyChanged(source: Observable<any>): void;
    render(var1: CUIRenderContext): void;
    setStyle(style: RenderStyle): void;
  }

}

declare module 'org.enginehub.worldeditcui.render.VanillaPipelineProvider' {
  import { TypeFactory, RenderType } from 'org.enginehub.worldeditcui.render.BufferBuilderRenderSink';

  interface DefaultTypeFactory extends TypeFactory {}
  class DefaultTypeFactory extends TypeFactory {
    static readonly INSTANCE: DefaultTypeFactory;
    lines(): RenderType;
    linesLoop(): RenderType;
    quads(): RenderType;
  }

}

declare module 'org.enginehub.worldeditcui.util' {
  import { RenderRegion } from 'org.enginehub.worldeditcui.render.shapes';
  import { PointCube } from 'org.enginehub.worldeditcui.render.points';
  import { Comparable, Double } from 'java.lang';
  import { Entity } from 'net.minecraft.world.entity';
  import { Vec3 } from 'net.minecraft.world.phys';

  interface BoundingBox extends Observer, Observable<RenderRegion> {}
  class BoundingBox extends Observer {
    constructor(pc1: PointCube, pc2: PointCube);
    get max(): Vector3;
    get min(): Vector3;
    isDynamic(): boolean;
    notifyChanged(source: Observable<any>): void;
  }


  class Observable<TObserver extends Observer = any> {
    addObserver(observer: TObserver): void;
  }


  class Observer {
    notifyChanged(var1: Observable<any>): void;
  }


  interface Vector2 extends Comparable<Vector2> {}
  class Vector2 extends Comparable<Vector2> {
    static readonly ZERO: Vector2;
    static readonly UNIT_X: Vector2;
    static readonly UNIT_Y: Vector2;
    static ONE: Vector2;
    constructor(x: number, y: number);

    constructor(x: number, y: number);

    constructor();

    constructor(original: Vector2);
    abs(): Vector2;
    static abs(o: Vector2): Vector2;
    add(that: Vector2): Vector2;
    static add(a: Vector2, b: Vector2): Vector2;
    ceil(): Vector2;
    static ceil(o: Vector2): Vector2;
    compareTo(o: Vector2): number;
    static compareTo(a: Vector2, b: Vector2): number;
    cross(): Vector2;
    distance(a: Vector2): number;
    static distance(a: Vector2, b: Vector2): number;
    dot(that: Vector2): number;
    static dot(a: Vector2, b: Vector2): number;
    equals(o: any): boolean;
    static equals(a: any, b: any): boolean;
    floor(): Vector2;
    static floor(o: Vector2): Vector2;
    get x(): number;
    get y(): number;
    hashCode(): number;
    length(): number;
    static length(a: Vector2): number;
    lengthSquared(): number;
    static lengthSquared(a: Vector2): number;
    static max(o1: Vector2, o2: Vector2): Vector2;
    static min(o1: Vector2, o2: Vector2): Vector2;
    normalize(): Vector2;
    static normalize(a: Vector2): Vector2;
    pow(power: number): Vector2;
    static pow(o: Vector2, power: number): Vector2;
    static rand(): Vector2;
    round(): Vector2;
    static round(o: Vector2): Vector2;
    scale(scale: number): Vector2;
    static scale(a: Vector2, b: number): Vector2;
    subtract(that: Vector2): Vector2;
    static subtract(a: Vector2, b: Vector2): Vector2;
    toArray(): number[];
    static toArray(a: Vector2): number[];
    toString(): string;
    toVector3(): Vector3;
    toVector3(y: number): Vector3;
    static toVector3(o: Vector2): Vector3;
    static toVector3(o: Vector2, y: number): Vector3;
  }


  interface Vector2m extends Vector2 {}
  class Vector2m extends Vector2 {
    constructor();

    constructor(x: number, y: number);

    constructor(x: number, y: number);

    constructor(original: Vector2);
    abs(): Vector2;
    static abs(o: Vector2): Vector2;
    add(that: Vector2): Vector2;
    static add(a: Vector2, b: Vector2): Vector2;
    ceil(): Vector2;
    static ceil(o: Vector2): Vector2;
    cross(that: Vector2): Vector2;
    cross(): Vector2;
    floor(): Vector2;
    static floor(o: Vector2): Vector2;
    normalize(): Vector2;
    static normalize(a: Vector2): Vector2;
    round(): Vector2;
    static round(o: Vector2): Vector2;
    scale(scale: number): Vector2;
    static scale(a: Vector2, b: number): Vector2;
    setX(x: number): void;
    setY(y: number): void;
    subtract(that: Vector2): Vector2;
    static subtract(a: Vector2, b: Vector2): Vector2;
  }


  interface Vector3 extends Comparable<Vector3> {}
  class Vector3 extends Comparable<Vector3> {
    static readonly ZERO: Vector3;
    static readonly UNIT_X: Vector3;
    static readonly Forward: Vector3;
    static readonly UNIT_Y: Vector3;
    static readonly Up: Vector3;
    static readonly UNIT_Z: Vector3;
    static readonly Right: Vector3;
    static readonly ONE: Vector3;
    constructor(entity: Entity, partialTicks: number);

    constructor(x: number, y: number, z: number);

    constructor(x: number, y: number, z: number);

    constructor();

    constructor(clone: Vector3);

    constructor(vector: Vector2, z: number);

    constructor(vector: Vector2);

    constructor(nativeVector: Vec3);
    abs(): Vector3;
    static abs(o: Vector3): Vector3;
    add(that: Vector3): Vector3;
    static add(a: Vector3, b: Vector3): Vector3;
    ceil(): Vector3;
    static ceil(o: Vector3): Vector3;
    compareTo(o: Vector3): number;
    static compareTo(a: Vector3, b: Vector3): number;
    cross(that: Vector3): Vector3;
    static cross(a: Vector3, b: Vector3): Vector3;
    distance(a: Vector3): number;
    static distance(a: Vector3, b: Vector3): number;
    dot(that: Vector3): number;
    static dot(a: Vector3, b: Vector3): number;
    equals(o: any): boolean;
    static equals(a: any, b: any): boolean;
    fastLength(): number;
    static fastLength(a: Vector3): number;
    floor(): Vector3;
    static floor(o: Vector3): Vector3;
    get x(): number;
    get y(): number;
    get z(): number;
    hashCode(): number;
    length(): number;
    static length(a: Vector3): number;
    lengthSquared(): number;
    static lengthSquared(a: Vector3): number;
    static max(o1: Vector3, o2: Vector3): Vector3;
    static min(o1: Vector3, o2: Vector3): Vector3;
    normalize(): Vector3;
    static normalize(a: Vector3): Vector3;
    pow(power: number): Vector3;
    static pow(o: Vector3, power: number): Vector3;
    static rand(): Vector3;
    round(): Vector3;
    static round(o: Vector3): Vector3;
    scale(scale: number): Vector3;
    static scale(a: Vector3, b: number): Vector3;
    subtract(that: Vector3): Vector3;
    static subtract(a: Vector3, b: Vector3): Vector3;
    toArray(): number[];
    static toArray(a: Vector3): number[];
    toString(): string;
    toVector2(): Vector2;
    static toVector2(o: Vector3): Vector2;
    toVector2m(): Vector2m;
    static toVector2m(o: Vector3): Vector2m;
  }

}