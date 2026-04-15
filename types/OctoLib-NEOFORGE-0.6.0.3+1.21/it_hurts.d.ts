declare module 'it.hurts.octostudios.octolib.client.animation.easing' {
  import { Enum, Double } from 'java.lang';
  import { Function } from 'java.util.function';
  import { List } from 'java.util';

  interface EaseType extends Enum<EaseType> {}
  class EaseType extends Enum<EaseType> {
    static readonly EASE_IN: EaseType;
    static readonly EASE_OUT: EaseType;
    static readonly EASE_IN_OUT: EaseType;
    apply(functionParameter: Function<number, number>, t: number): number;
    static valueOf(name: string): EaseType;
    static values(): EaseType[];
  }


  class Interpolator<T = any> {
    lerp(var1: T, var2: T, var3: number): T;
  }


  interface TransitionType extends Enum<TransitionType> {}
  class TransitionType extends Enum<TransitionType> {
    static readonly LINEAR: TransitionType;
    static readonly SINE: TransitionType;
    static readonly QUAD: TransitionType;
    static readonly CUBIC: TransitionType;
    static readonly QUART: TransitionType;
    static readonly QUINT: TransitionType;
    static readonly EXPO: TransitionType;
    static readonly CIRC: TransitionType;
    static readonly BACK: TransitionType;
    static readonly ELASTIC: TransitionType;
    static readonly BOUNCE: TransitionType;
    apply(ease: EaseType, t: number): number;
    runEquation(easeType: EaseType, time: number, initial: number, delta: number, duration: number): number;
    static valueOf(name: string): TransitionType;
    static values(): TransitionType[];
  }

}

declare module 'it.hurts.octostudios.octolib.client.animation' {
  import { Consumer } from 'java.util.function';
  import { TransitionType, EaseType } from 'it.hurts.octostudios.octolib.client.animation.easing';
  import { Runnable } from 'java.lang';

  interface IntervalTweener extends Tweener {}
  class IntervalTweener extends Tweener {
    constructor(duration: number);
    step(): boolean;
  }


  interface MethodTweener<T = any> extends Tweener {}
  class MethodTweener<T = any> extends Tweener {
    constructor(method: Consumer<T>, from: T, to: T, duration: number);
    setDelay(delay: number): MethodTweener<T>;
    setEaseType(easeType: EaseType): MethodTweener<T>;
    setTransitionType(transitionType: TransitionType): MethodTweener<T>;
    setTween(tween: Tween): void;
    step(): boolean;
  }


  interface PropertyTweener<T = any> extends Tweener {}
  class PropertyTweener<T = any> extends Tweener {
    asRelative(): PropertyTweener<T>;
    from(value: T): PropertyTweener<T>;
    fromCurrent(): PropertyTweener<T>;
    getField(object: any, field: string[]): T;
    setDelay(delay: number): PropertyTweener<T>;
    setEaseType(easeType: EaseType): PropertyTweener<T>;
    setField(object: any, field: string[], value: T): void;
    setTransitionType(transitionType: TransitionType): PropertyTweener<T>;
    setTween(tween: Tween): void;
    start(): void;
    step(): boolean;
  }


  interface RunnableTweener extends Tweener {}
  class RunnableTweener extends Tweener {
    constructor(runnable: Runnable);
    setDelay(delayInSeconds: number): RunnableTweener;
    step(): boolean;
  }


  class Tween {
    chain(): Tween;
    clear(): void;
    static create(): Tween;
    get defaultEase(): EaseType;
    get defaultTransition(): TransitionType;
    get loops(): number;
    get loopsLeft(): number;
    get totalTime(): number;
    isIgnoreTimeScale(): boolean;
    static isObjectInvalid(object: any): boolean;
    isRunning(): boolean;
    isStarted(): boolean;
    kill(): void;
    parallel(): Tween;
    pause(): void;
    play(): void;
    set loops(loops: number);
    setEase(easeType: EaseType): Tween;
    setIgnoreTimeScale(ignore: boolean): Tween;
    setParallel(parallel: boolean): Tween;
    setSpeedScale(speedScale: number): Tween;
    setTransitionType(transitionType: TransitionType): Tween;
    start(): void;
    stop(): void;
    tweenInterval(durationInSeconds: number): IntervalTweener;
    tweenMethod<T>(method: Consumer<T>, from: T, to: T, duration: number): MethodTweener<T>;
    tweenProperty<T>(target: any, property: string, to: T, durationInSeconds: number): PropertyTweener<T>;
    tweenRunnable(runnable: Runnable): RunnableTweener;
  }


  class Tweener {
    get elapsedTime(): number;
    get tween(): Tween;
    isFinished(): boolean;
    set tween(tween: Tween);
    start(): void;
    step(): boolean;
  }


  class TweenSystem {
    static init(): void;
    static updateAll(): void;
  }

}

declare module 'it.hurts.octostudios.octolib.client.animation.TweenSystem' {
  import { Runnable } from 'java.lang';

  class ServerThreadExecutor {
    static executeAll(): void;
    static runOnServerThread(task: Runnable): void;
  }


  class RenderThreadExecutor {
    static executeAll(): void;
    static runOnRenderThread(task: Runnable): void;
  }

}

declare module 'it.hurts.octostudios.octolib.client.particle' {
  import { Texture2D, Layer } from 'it.hurts.octostudios.octolib.client.particle.UIParticle';
  import { Vector2f } from 'org.joml';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { OctoColor } from 'it.hurts.octostudios.octolib.util';
  import { Pair } from 'oshi.util.tuples';
  import { Integer } from 'java.lang';

  interface ExtendedUIParticle extends UIParticle {}
  class ExtendedUIParticle extends UIParticle {
    constructor(texture: Texture2D, maxSpeed: number, lifetime: number, xStart: number, yStart: number, layer: Layer, zOffset: number);
    get angularVelocity(): number;
    get friction(): number;
    get gravity(): number;
    get gravityDirection(): Vector2f;
    set angularVelocity(angularVelocity: number);
    set friction(friction: number);
    set gravity(gravity: number);
    set gravityDirection(gravityDirection: Vector2f);
    setGravityDirection(x: number, y: number): void;
    tick(): void;
  }


  interface GalacticUIParticle extends ExtendedUIParticle {}
  class GalacticUIParticle extends ExtendedUIParticle {
    constructor(maxSpeed: number, maxLifetime: number, xStart: number, yStart: number, layer: Layer, zOffset: number);
  }


  class ParticleSystem {
    static renderGuiParticles(guiGraphics: GuiGraphics, partialTicks: number): void;
    static renderScreenParticles(screen: Screen, guiGraphics: GuiGraphics, partialTicks: number): void;
    static tick(): void;
  }


  class Transform {
    constructor(position: Vector2f, roll: number, size: Vector2f);
    get oldPosition(): Vector2f;
    get oldRoll(): number;
    get oldSize(): Vector2f;
    get position(): Vector2f;
    get roll(): number;
    get size(): Vector2f;
    getInterpolatedPosition(partialTicks: number): Vector2f;
    getInterpolatedRoll(partialTicks: number): number;
    getInterpolatedSize(partialTicks: number): Vector2f;
    set position(position: Vector2f);
    set roll(angle: number);
    set size(size: Vector2f);
    updateOldValues(): void;
  }


  class UIParticle {
    constructor(texture: Texture2D, maxSpeed: number, lifetime: number, xStart: number, yStart: number, layer: Layer, zOffset: number);
    enableBlend(value: boolean): void;
    get blendFunc(): Pair<number, number>;
    get colors(): OctoColor[];
    get direction(): Vector2f;
    get layer(): Layer;
    get lifetime(): number;
    get maxSpeed(): number;
    get rollVelocity(): number;
    get screen(): Screen;
    get speed(): number;
    get texture(): Texture2D;
    get time(): number;
    get transform(): Transform;
    get zOffset(): number;
    getColor(partialTicks: number): OctoColor;
    getTimeRatio(partialTicks: number): number;
    instantiate(): void;
    isEnableBlend(): boolean;
    isExpired(): boolean;
    isGui(): boolean;
    isScreen(): boolean;
    render(guiGraphics: GuiGraphics, partialTicks: number): void;
    set colors(...colors: OctoColor[]);
    set direction(direction: Vector2f);
    set rollVelocity(rollVelocity: number);
    set screen(screen: Screen);
    set speed(speed: number);
    set time(time: number);
    set zOffset(zOffset: number);
    setBlendFunc(source: number, destination: number): void;
    setDirection(x: number, y: number): void;
    setEnableBlend(enableBlend: boolean): void;
    tick(): void;
  }

}

declare module 'it.hurts.octostudios.octolib.client.particle.UIParticle' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class Texture2D {
    constructor(texture: ResourceLocation, texOffX: number, texOffY: number, texWidth: number, texHeight: number, width: number, height: number);

    constructor(texture: ResourceLocation, width: number, height: number);
    equals(o: any): boolean;
    get height(): number;
    get rl(): ResourceLocation;
    get texHeight(): number;
    get texOffX(): number;
    get texOffY(): number;
    get texWidth(): number;
    get width(): number;
    hashCode(): number;
    set height(height: number);
    set rl(rl: ResourceLocation);
    set texHeight(texHeight: number);
    set texOffX(texOffX: number);
    set texOffY(texOffY: number);
    set texWidth(texWidth: number);
    set width(width: number);
    toString(): string;
  }


  interface Layer extends Enum<Layer> {}
  class Layer extends Enum<Layer> {
    static readonly GUI: Layer;
    static readonly SCREEN: Layer;
    static valueOf(name: string): Layer;
    static values(): Layer[];
  }

}

declare module 'it.hurts.octostudios.octolib.client.screen' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface TestGearScreen extends Screen {}
  class TestGearScreen extends Screen {
    constructor();
    isPauseScreen(): boolean;
    onClose(): void;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    tick(): void;
  }

}

declare module 'it.hurts.octostudios.octolib.client.screen.widget' {
  import { LayoutElement } from 'net.minecraft.client.gui.layouts';
  import { GuiEventListener, ContainerEventHandler } from 'net.minecraft.client.gui.components.events';
  import { Vector2i, Matrix4f } from 'org.joml';
  import { ScreenRectangle } from 'net.minecraft.client.gui.navigation';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { List } from 'java.util';
  import { OctoColor } from 'it.hurts.octostudios.octolib.util';

  interface Child<T extends LayoutElement = any> extends LayoutElement, GuiEventListener {}
  class Child<T extends LayoutElement = any> extends LayoutElement {
    attachWidget(parent: T): void;
    detachWidget(): void;
    get localPosition(): Vector2i;
    get localX(): number;
    get localY(): number;
    get parent(): T;
    get parentPosition(): Vector2i;
    get position(): Vector2i;
    get rectangle(): ScreenRectangle;
    set parent(var1: T);
  }


  class HasRenderMatrix {
    get matrix(): Matrix4f;
    set matrix(var1: Matrix4f);
  }


  interface TestGear extends HasRenderMatrix, ContainerEventHandler, AbstractWidget {}
  class TestGear extends HasRenderMatrix {
    constructor(x: number, y: number);
    children(): GuiEventListener[];
    get focused(): GuiEventListener;
    get matrix(): Matrix4f;
    isDragging(): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    set focused(focused: GuiEventListener);
    set matrix(matrix: Matrix4f);
    setDragging(isDragging: boolean): void;
    setRot(rot: number): void;
  }


  interface TestPin extends Child<TestGear>, AbstractWidget {}
  class TestPin extends Child<TestGear> {
    constructor(x: number, y: number, parent: TestGear);
    get parent(): TestGear;
    onClick(mouseX: number, mouseY: number): void;
    set parent(parent: TestGear);
    setColor(color: OctoColor): void;
  }

}

declare module 'it.hurts.octostudios.octolib.client.shake' {
  import { Vector2f } from 'org.joml';

  class Shakeable {
    get shakeOffset(): Vector2f;
    set shakeOffset(var1: Vector2f);
  }


  class ShakeData {
    constructor(amplitude: Vector2f, frequency: Vector2f, durationInSeconds: number, seed: number);

    constructor(amplitude: Vector2f, frequency: Vector2f, durationInSeconds: number);

    constructor(amplitude: number, frequency: number, durationInSeconds: number);
    isFinished(): boolean;
    update(): Vector2f;
  }


  class ShakeSystem {
    static clearAll(): void;
    static startShake(target: Shakeable, data: ShakeData): void;
    static stopShake(target: Shakeable): void;
    static updateAll(): void;
  }

}

declare module 'it.hurts.octostudios.octolib.client' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Vector2d } from 'org.joml';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { TransitionType, EaseType } from 'it.hurts.octostudios.octolib.client.animation.easing';
  import { Tween } from 'it.hurts.octostudios.octolib.client.animation';
  import { OctoColor } from 'it.hurts.octostudios.octolib.util';

  interface TestScreen extends Screen {}
  class TestScreen extends Screen {
    squeeze: Vector2d;
    constructor();
    isPauseScreen(): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    onClose(): void;
    render(guiGraphics: GuiGraphics, i: number, j: number, f: number): void;
    tick(): void;
  }


  interface TestWidget extends AbstractWidget {}
  class TestWidget extends AbstractWidget {
    transitionType: TransitionType;
    easeType: EaseType;
    tween: Tween;
    hoverTween: Tween;
    constructor(x: number, y: number, transitionType: TransitionType, easeType: EaseType, screen: Screen);
    isHovered(): boolean;
    onClick(mouseX: number, mouseY: number): void;
    setColor(color: OctoColor): void;
  }

}

declare module 'it.hurts.octostudios.octolib.event' {
  import { RenderLevelStageEvent } from 'net.neoforged.neoforge.client.event';

  class LevelRenderEvents {
    static renderLevelRender(event: RenderLevelStageEvent): void;
  }

}

declare module 'it.hurts.octostudios.octolib.mixin' {
  class AbstractContainerScreenMixin {
  }


  class AbstractWidgetAccessor {
    get localX(): number;
    get localY(): number;
  }


  class AbstractWidgetMixin {
    get localX(): number;
    get localY(): number;
    isMouseOver(var1: number, var3: number): boolean;
  }


  class ClientLevelMixin {
  }


  class GameRendererMixin {
  }


  class GuiMixin {
  }


  class MinecraftMixin {
  }


  class ScreenMixin {
  }

}

declare module 'it.hurts.octostudios.octolib.module.command' {
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack, CommandBuildContext } from 'net.minecraft.commands';
  import { CommandSelection } from 'Commands';

  class OctolibCommand {
    static register(dispatcher: CommandDispatcher<CommandSourceStack>, buildContext: CommandBuildContext, commandSelection: CommandSelection): void;
  }

}

declare module 'it.hurts.octostudios.octolib.module.config.annotation.registration' {
  import { OctoConfig } from 'it.hurts.octostudios.octolib.module.config.impl';

  class AnnotationConfigFactory<T extends Annotation = any> {
    create(var1: T, var2: any): OctoConfig;
  }


  class ConfigNameGetter<T extends Annotation = any> {
    getName(var1: T, var2: any): string;
  }


  class ConfigRegistration {
    get commonDir(): string;
  }

}

declare module 'it.hurts.octostudios.octolib.module.config.annotation.registration.ObjectConfig' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ConfigType extends Enum<ConfigType> {}
  class ConfigType extends Enum<ConfigType> {
    static readonly FILE_SPREAD: ConfigType;
    static readonly SOLID_OBJECT: ConfigType;
    static valueOf(name: string): ConfigType;
    static values(): ConfigType[];
  }

}

declare module 'it.hurts.octostudios.octolib.module.config.cfgbuilder' {
  import { Iterable, Class, Enum } from 'java.lang';
  import { Collection, Iterator, HashMap, Map, Set, List } from 'java.util';
  import { Tag, NodeId } from 'org.yaml.snakeyaml.nodes';
  import { Entry } from 'Map';
  import { BinaryEntry, StringEntry, BoolEntry, IntEntry, DoubleEntry, ScalarEntry } from 'it.hurts.octostudios.octolib.module.config.cfgbuilder.scalar';

  interface ArrayEntry extends Iterable<ConfigEntry>, ConfigEntry {}
  class ArrayEntry extends Iterable<ConfigEntry> {
    static readonly SEQ_I: CfgTag;
    constructor();

    constructor(tag: CfgTag);

    constructor(entries: Collection<ConfigEntry>);

    constructor(tag: CfgTag, entries: Collection<ConfigEntry>);

    constructor(...entries: T[]);

    constructor(tag: CfgTag, ...entries: T[]);
    add(entry: ConfigEntry): void;
    add(index: number, entry: ConfigEntry): void;
    get data(): any;
    isEmpty(): boolean;
    iterator(): Iterator<ConfigEntry>;
    remove(): void;
    size(): number;
    toString(): string;
  }


  class CfgTag {
    static readonly PREFIX: string;
    static readonly ENUM_POSTFIX: string;
    static readonly YAML: CfgTag;
    static readonly MERGE: CfgTag;
    static readonly SET: CfgTag;
    static readonly PAIRS: CfgTag;
    static readonly OMAP: CfgTag;
    static readonly BINARY: CfgTag;
    static readonly INT: CfgTag;
    static readonly FLOAT: CfgTag;
    static readonly TIMESTAMP: CfgTag;
    static readonly BOOL: CfgTag;
    static readonly NULL: CfgTag;
    static readonly STR: CfgTag;
    static readonly SEQ: CfgTag;
    static readonly MAP: CfgTag;
    static readonly ENUM: CfgTag;
    static readonly STANDART_TAGS: HashMap;
    constructor(name: string);

    constructor(clazz: Class<any>);
    static by(tag: Tag): CfgTag;
    equals(o: any): boolean;
    get className(): string;
    get value(): string;
    hashCode(): number;
    isCompatible(clazz: Class<any>): boolean;
    isCustomGlobal(): boolean;
    isSecondary(): boolean;
    matches(clazz: Class<any>): boolean;
    startsWith(prefix: string): boolean;
    toString(): string;
    yamlTag(): Tag;
  }


  interface CompoundEntry extends Map<string, ConfigEntry>, ConfigEntry {}
  class CompoundEntry extends Map<string, ConfigEntry> {
    static readonly COMPOUND_CFG_TAG: CfgTag;
    static readonly SCALAR_FACTORIES: Map;
    constructor();

    constructor(map: Map<string, ConfigEntry>);
    clear(): void;
    containsKey(key: any): boolean;
    containsKey(key: string): boolean;
    containsValue(value: any): boolean;
    entrySet(): Set<Entry<string, ConfigEntry>>;
    get(key: any): ConfigEntry;
    get data(): any;
    get withoutTypes(): CompoundEntry;
    getBoolean(key: string): boolean;
    getByte(key: string): number;
    getDouble(key: string): number;
    getInt(key: string): number;
    getList(key: string): ArrayEntry;
    getObject<T>(key: string, type: Class<T>): T;
    getString(key: string): string;
    isEmpty(): boolean;
    keySet(): Set<string>;
    put(key: string, entry: ConfigEntry): ConfigEntry;
    putAll(m: Map<string, ConfigEntry>): void;
    putBoolean(key: string, value: boolean): BoolEntry;
    putByte(key: string, value: number): BinaryEntry;
    putDouble(key: string, value: number): DoubleEntry;
    putInt(key: string, value: number): IntEntry;
    putList(key: string, list: ArrayEntry): ArrayEntry;
    putList(key: string, list: ConfigEntry[]): ArrayEntry;
    putNull(key: string): NullEntry;
    putObject(key: string, value: any): ObjectEntry;
    putObjectList(key: string, ...list: any[]): ArrayEntry;
    putObjectList(key: string, list: any[]): ArrayEntry;
    putScalarList(key: string, scalarTag: CfgTag, ...list: any[]): ArrayEntry;
    putScalarList(key: string, scalarTag: CfgTag, list: any[]): ArrayEntry;
    putString(key: string, value: string): StringEntry;
    remove(key: any): ConfigEntry;
    size(): number;
    toString(): string;
    values(): Collection<ConfigEntry>;
  }


  class ConfigEntry {
    constructor(tag: CfgTag, nodeId: EntryId);
    get blockComment(): string;
    get data(): any;
    get inlineComment(): string;
    get nodeId(): EntryId;
    get tag(): CfgTag;
    get type(): CfgTag;
    isNull(): boolean;
    refine(entry: ConfigEntry): ConfigEntry;
    set blockComment(blockComment: string);
    set inlineComment(inlineComment: string);
    set type(type: CfgTag);
    toString(): string;
  }


  interface DeconstructedEnumEntry extends ScalarEntry {}
  class DeconstructedEnumEntry extends ScalarEntry {
    constructor(value: string, tag: CfgTag);
  }


  interface DeconstructedObjectEntry extends CompoundEntry {}
  class DeconstructedObjectEntry extends CompoundEntry {
    static readonly DECONSTRUCTED_CFG_TAG: CfgTag;
    constructor(tag: CfgTag, compoundEntry: CompoundEntry);

    constructor(tag: CfgTag);
  }


  interface EntryId extends Enum<EntryId> {}
  class EntryId extends Enum<EntryId> {
    static readonly SCALAR: EntryId;
    static readonly MAPPING: EntryId;
    static readonly OBJECT: EntryId;
    static readonly SEQUENCE: EntryId;
    static readonly ANCHOR: EntryId;
    nodeId(): NodeId;
    static valueOf(name: string): EntryId;
    static values(): EntryId[];
  }


  interface EnumEntry extends ScalarEntry {}
  class EnumEntry extends ScalarEntry {
    constructor(object: Enum<any>);
    refine(entry: ConfigEntry): ConfigEntry;
  }


  interface ListEntry extends ConfigEntry {}
  class ListEntry extends ConfigEntry {
    constructor();
    get data(): any;
  }


  interface NullEntry extends ScalarEntry {}
  class NullEntry extends ScalarEntry {
    constructor();
  }


  interface ObjectEntry extends ConfigEntry {}
  class ObjectEntry extends ConfigEntry {
    constructor(object: any);

    constructor(type: CfgTag, object: any);
    get data(): any;
    toString(): string;
  }

}

declare module 'it.hurts.octostudios.octolib.module.config.cfgbuilder.CompoundEntry' {
  import { ScalarEntry } from 'it.hurts.octostudios.octolib.module.config.cfgbuilder.scalar';

  class ScalarFactory {
    create(var1: any): ScalarEntry;
  }

}

declare module 'it.hurts.octostudios.octolib.module.config.cfgbuilder.scalar' {
  import { Number } from 'java.lang';
  import { CfgTag, ConfigEntry } from 'it.hurts.octostudios.octolib.module.config.cfgbuilder';

  interface BinaryEntry extends NumberEntry {}
  class BinaryEntry extends NumberEntry {
    constructor(value: number);
  }


  interface BoolEntry extends ScalarEntry {}
  class BoolEntry extends ScalarEntry {
    constructor(value: boolean);
  }


  interface DoubleEntry extends NumberEntry {}
  class DoubleEntry extends NumberEntry {
    constructor(value: number);
  }


  interface IntEntry extends NumberEntry {}
  class IntEntry extends NumberEntry {
    constructor(value: number);
  }


  interface NumberEntry extends ScalarEntry {}
  class NumberEntry extends ScalarEntry {
    constructor(value: Number, tag: CfgTag);
  }


  interface ScalarEntry extends ConfigEntry {}
  class ScalarEntry extends ConfigEntry {
    constructor(value: any, tag: CfgTag);
    get data(): any;
  }


  interface StringEntry extends ScalarEntry {}
  class StringEntry extends ScalarEntry {
    constructor(value: string);
  }

}

declare module 'it.hurts.octostudios.octolib.module.config' {
  import { ConfigProvider } from 'it.hurts.octostudios.octolib.module.config.provider';
  import { Set } from 'java.util';
  import { OctoConfig } from 'it.hurts.octostudios.octolib.module.config.impl';
  import { Pair } from 'com.mojang.datafixers.util';
  import { AnnotationConfigFactory, ConfigNameGetter } from 'it.hurts.octostudios.octolib.module.config.annotation.registration';
  import { Class } from 'java.lang';
  import { Annotation } from 'java.lang.annotation';
  import { MinecraftServer } from 'net.minecraft.server';
  import { ServerPlayer } from 'net.minecraft.server.level';

  class ConfigManager {
    static readonly BASE_PROVIDER: ConfigProvider;
    static get allPaths(): Set<string>;
    static get serverConfigs(): Set<string>;
    static getConfig(location: string): OctoConfig;
    static getConfigFactory(clazz: Class<Annotation>): Pair<AnnotationConfigFactory<any>, ConfigNameGetter<any>>;
    static isServerConfig(name: string): boolean;
    static registerConfig(location: string, config: OctoConfig): void;
    static registerConfigFactory<T extends Annotation>(annotation: Class<T>, fabric: AnnotationConfigFactory<T>, nameGetter: ConfigNameGetter<T>): void;
    static registerConfigPackage(configPackage: Class<any>, dir: string): void;
    static registerConfigProvider(location: string, provider: ConfigProvider): void;
    static reload(location: string): void;
    static reload(location: string, config: OctoConfig): void;
    static reloadAll(): void;
    static reloadStringConfig(stringData: string, location: string, saveToFile: boolean): void;
    static saveAsString(location: string): string;
    static syncConfig(path: string, server: MinecraftServer): void;
    static syncConfig(player: ServerPlayer, path: string): void;
    static syncConfigs(player: ServerPlayer): void;
    static uploadDataToConfig(location: string): void;
  }

}

declare module 'it.hurts.octostudios.octolib.module.config.impl' {
  import { IConfigFileLoader } from 'it.hurts.octostudios.octolib.module.config.loader';
  import { CompoundEntry } from 'it.hurts.octostudios.octolib.module.config.cfgbuilder';
  import { Enum } from 'java.lang';
  import { List, Collection } from 'java.util';

  interface CompoundConfig extends OctoConfig {}
  class CompoundConfig extends OctoConfig {
    get loader(): IConfigFileLoader<any, any>;
    onLoadObject(object: any): void;
    prepareData(): any;
    read(var1: CompoundEntry): void;
    write(var1: CompoundEntry): void;
  }


  interface ConfigSide extends Enum<ConfigSide> {}
  class ConfigSide extends Enum<ConfigSide> {
    static readonly CLIENT: ConfigSide;
    static readonly SERVER: ConfigSide;
    static valueOf(name: string): ConfigSide;
    static values(): ConfigSide[];
  }


  interface FileSpreadConfig extends OctoConfigBase {}
  class FileSpreadConfig extends OctoConfigBase {
    constructor(object: Collection<any>);

    constructor(object: Collection<any>, side: ConfigSide);
    get loader(): IConfigFileLoader<any, any>;
  }


  class OctoConfig {
    get loader(): IConfigFileLoader<any, any>;
    get side(): ConfigSide;
    onLoadObject(object: any): void;
    prepareData(): any;
  }


  interface OctoConfigBase extends OctoConfig {}
  class OctoConfigBase extends OctoConfig {
    constructor(object: any);

    constructor(object: any, side: ConfigSide);
    get loader(): IConfigFileLoader<any, any>;
    get side(): ConfigSide;
    onLoadObject(object: any): void;
    prepareData(): any;
  }

}

declare module 'it.hurts.octostudios.octolib.module.config.loader' {
  import { Iterable } from 'java.lang';
  import { List } from 'java.util';
  import { ConfigProvider } from 'it.hurts.octostudios.octolib.module.config.provider';
  import { ConfigEntry } from 'it.hurts.octostudios.octolib.module.config.cfgbuilder';

  interface FileSpreadLoader<T = any> extends IConfigFileLoader<Iterable, List> {}
  class FileSpreadLoader<T = any> extends IConfigFileLoader<Iterable, List> {
    loadFiles(filePath: string, pattern: ConfigEntry, provider: ConfigProvider): T[];
    saveToFiles(filePath: string, data: Iterable<T>, provider: ConfigProvider): void;
    saveToFiles(var1: string, var2: U1, var3: ConfigProvider): void;
  }


  class IConfigFileLoader<U1 = any, U2 = any> {
    static readonly SOLID: SolidConfigLoader;
    loadFiles(var1: string, var2: ConfigEntry, var3: ConfigProvider): U2;
    saveToFiles(var1: string, var2: U1, var3: ConfigProvider): void;
  }


  interface SolidConfigLoader<T = any> extends IConfigFileLoader<T, T> {}
  class SolidConfigLoader<T = any> extends IConfigFileLoader<T, T> {
    loadFiles(filePath: string, pattern: ConfigEntry, provider: ConfigProvider): T;
    saveToFiles(filePath: string, data: T, provider: ConfigProvider): void;
    saveToFiles(var1: string, var2: U1, var3: ConfigProvider): void;
  }

}

declare module 'it.hurts.octostudios.octolib.module.config.network' {
  import { Packet } from 'it.hurts.octostudios.octolib.module.network';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';

  interface SyncConfigPacket extends Packet {}
  class SyncConfigPacket extends Packet {
    static readonly TYPE: Type;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(buf: RegistryFriendlyByteBuf);

    constructor(configPath: string);
    type(): Type<CustomPacketPayload>;
    write(buf: RegistryFriendlyByteBuf): void;
  }


  interface TestScreenPacket extends Packet {}
  class TestScreenPacket extends Packet {
    static TYPE: Type;
    static STREAM_CODEC: StreamCodec;
    constructor(buf: RegistryFriendlyByteBuf);

    constructor();
    type(): Type<CustomPacketPayload>;
    write(buf: RegistryFriendlyByteBuf): void;
  }


  interface UnholyAbominationPacket extends Packet {}
  class UnholyAbominationPacket extends Packet {
    static readonly TYPE: Type;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(buf: RegistryFriendlyByteBuf);

    constructor(path: string);
    type(): Type<CustomPacketPayload>;
    write(buf: RegistryFriendlyByteBuf): void;
  }

}

declare module 'it.hurts.octostudios.octolib.module.config.provider' {
  import { ConfigEntry, CompoundEntry } from 'it.hurts.octostudios.octolib.module.config.cfgbuilder';
  import { Writer, Reader } from 'java.io';
  import { Iterator, List } from 'java.util';
  import { ConstructorExt, RepresenterExt, EntryInjector, ConfigEntryConverter } from 'it.hurts.octostudios.octolib.module.config.util';
  import { DumperOptions, Yaml } from 'org.yaml.snakeyaml';

  class ConfigProvider {
    createPattern(var1: any): ConfigEntry;
    insert2ndStep<T>(var1: T, var2: T): T;
    load(var1: Reader, var2: CompoundEntry): any;
    loadAll<T>(var1: Reader, var2: Iterator<CompoundEntry>): T[];
    save(var1: Writer, var2: any): void;
    saveAll(var1: Writer, var2: Iterator<any>): void;
  }


  interface ConfigProviderBase extends ConfigProvider {}
  class ConfigProviderBase extends ConfigProvider {
    constructor(constructor: ConstructorExt, patternRepresenter: RepresenterExt, configRepresenter: RepresenterExt, options: DumperOptions);

    constructor(constructor: ConstructorExt, patternRepresenter: RepresenterExt, configRepresenter: RepresenterExt, options: DumperOptions, injector: EntryInjector<ConfigEntry>);
    createPattern(object: any): ConfigEntry;
    get configEntryConverter(): ConfigEntryConverter;
    get configRepresenter(): RepresenterExt;
    get constructor(): ConstructorExt;
    get injector(): EntryInjector<ConfigEntry>;
    get options(): DumperOptions;
    get patternRepresenter(): RepresenterExt;
    get yamlConverted(): Yaml;
    static getDefault(indent: number): ConfigProviderBase;
    insert2ndStep<T>(target: T, data: T): T;
    load(reader: Reader, pattern: CompoundEntry): any;
    loadAll<T>(reader: Reader, patternIterator: Iterator<CompoundEntry>): T[];
    save(writer: Writer, config: any): void;
    saveAll(writer: Writer, config: Iterator<any>): void;
  }

}

declare module 'it.hurts.octostudios.octolib.module.config.util' {
  import { Representer } from 'org.yaml.snakeyaml.representer';
  import { DumperOptions, LoaderOptions, TypeDescription } from 'org.yaml.snakeyaml';
  import { ConfigEntry } from 'it.hurts.octostudios.octolib.module.config.cfgbuilder';
  import { Class } from 'java.lang';
  import { Field } from 'java.lang.reflect';
  import { Constructor } from 'org.yaml.snakeyaml.constructor';
  import { Collection } from 'java.util';
  import { Node } from 'org.yaml.snakeyaml.nodes';
  import { BinaryOperator } from 'java.util.function';
  import { PropertyUtils } from 'org.yaml.snakeyaml.introspector';

  class ConfigEntryConverter {
    constructor(constructor: ConstructorExt, representer: Representer);

    constructor(constructor: ConstructorExt, representer: Representer, dumperOptions: DumperOptions);

    constructor(constructor: ConstructorExt, representer: Representer, dumperOptions: DumperOptions, loadingConfig: LoaderOptions);
    construct<T>(compound: ConfigEntry): T;
    constructAs<T>(compound: ConfigEntry, type: Class<T>): T;
    represent(obj: any): ConfigEntry;
    representDeconstructed(obj: any): ConfigEntry;
  }


  class ConfigUtils {
    static registerFieldConfig(field: Field, dir: string): void;
  }


  interface ConstructorExt extends Constructor {}
  class ConstructorExt extends Constructor {
    constructor(loadingConfig: LoaderOptions);

    constructor(theRoot: Class<any>, loadingConfig: LoaderOptions);

    constructor(theRoot: TypeDescription, loadingConfig: LoaderOptions);

    constructor(theRoot: TypeDescription, moreTDs: Collection<TypeDescription>, loadingConfig: LoaderOptions);

    constructor(theRoot: string, loadingConfig: LoaderOptions);
    constructObject(node: Node): any;
    newInstance(node: Node): any;
  }


  interface EntryInjector<T extends ConfigEntry = any> extends BinaryOperator<T> {}
  class EntryInjector<T extends ConfigEntry = any> extends BinaryOperator<T> {
  }


  interface PropertyUtilsExt extends PropertyUtils {}
  class PropertyUtilsExt extends PropertyUtils {
  }


  interface RepresenterExt extends Representer {}
  class RepresenterExt extends Representer {
    constructor(options: DumperOptions);
  }


  interface SchemeInjector extends EntryInjector<ConfigEntry> {}
  class SchemeInjector extends EntryInjector<ConfigEntry> {
    apply(pattern: ConfigEntry, target: ConfigEntry): ConfigEntry;
  }

}

declare module 'it.hurts.octostudios.octolib.module.config.util.ConstructorExt' {
  import { ConstructMapping, ConstructSequence } from 'Constructor';
  import { Node } from 'org.yaml.snakeyaml.nodes';
  import { AbstractConstruct } from 'org.yaml.snakeyaml.constructor';
  import { ConstructorExt } from 'it.hurts.octostudios.octolib.module.config.util';

  interface ConstructMappingCustomized extends ConstructMapping {}
  class ConstructMappingCustomized extends ConstructMapping {
    constructor();
    construct(node: Node): any;
    construct2ndStep(node: Node, object: any): void;
  }


  interface ConstructSequenceCustomizable extends ConstructSequence {}
  class ConstructSequenceCustomizable extends ConstructSequence {
    constructor();
    construct(node: Node): any;
  }


  interface ConstructEntry extends AbstractConstruct {}
  class ConstructEntry extends AbstractConstruct {
    construct(node: Node): any;
  }


  interface ConstructMappedEntry extends ConstructEntry {}
  class ConstructMappedEntry extends ConstructEntry {
    constructor(this$0: ConstructorExt);
  }

}

declare module 'it.hurts.octostudios.octolib.module.config.util.properties' {
  import { Field, Type } from 'java.lang.reflect';
  import { List } from 'java.util';
  import { Annotation } from 'java.lang.annotation';
  import { Class } from 'java.lang';
  import { GenericProperty } from 'org.yaml.snakeyaml.introspector';
  import { PropertyDescriptor } from 'java.beans';

  interface FieldPropertyExt extends GenericPropertyExt {}
  class FieldPropertyExt extends GenericPropertyExt {
    constructor(field: Field);

    constructor(field: Field, name: string);
    get(object: any): any;
    get annotations(): Annotation[];
    getAnnotation<A extends Annotation>(annotationType: Class<A>): A;
    set(object: any, value: any): void;
  }


  interface GenericPropertyExt extends GenericProperty {}
  class GenericPropertyExt extends GenericProperty {
    constructor(name: string, aClass: Class<any>, aType: Type);
    get(o: any): any;
    get actualTypeArguments(): Class<any>;
    get annotations(): Annotation[];
    get blockComment(): string;
    get genTypeOverride(): Type;
    get inlineComment(): string;
    getAnnotation<A extends Annotation>(aClass: Class<A>): A;
    set(o: any, o1: any): void;
    set blockComment(blockComment: string);
    set genTypeOverride(genTypeOverride: Type);
    set inlineComment(inlineComment: string);
  }


  interface MethodPropertyExt extends GenericPropertyExt {}
  class MethodPropertyExt extends GenericPropertyExt {
    constructor(property: PropertyDescriptor);
    get(object: any): any;
    get annotations(): Annotation[];
    getAnnotation<A extends Annotation>(annotationType: Class<A>): A;
    isReadable(): boolean;
    isWritable(): boolean;
    set(object: any, value: any): void;
  }

}

declare module 'it.hurts.octostudios.octolib.module.config.util.RepresenterExt' {
  import { TypePropInherited, TypeProp } from 'it.hurts.octostudios.octolib.module.config.annotation';

  class TypeSettings {
    constructor(annotation: TypePropInherited);

    constructor(annotation: TypeProp);
  }

}

declare module 'it.hurts.octostudios.octolib.module' {
  class ConfigTest {
  }

}

declare module 'it.hurts.octostudios.octolib.module.ConfigTest' {
  class ConfigA {
  }

}

declare module 'it.hurts.octostudios.octolib.module.network' {
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec, StreamMemberEncoder, StreamDecoder } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { NetworkReceiver, PacketContext } from 'NetworkManager';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { ByteBuf } from 'io.netty.buffer';

  class OctolibNetwork {
    static init(): void;
    static registerC2S<T extends CustomPacketPayload>(type: Type<T>, codec: StreamCodec<RegistryFriendlyByteBuf, T>, receiver: NetworkReceiver<T>): void;
    static registerS2C<T extends CustomPacketPayload>(type: Type<T>, codec: StreamCodec<RegistryFriendlyByteBuf, T>, receiver: NetworkReceiver<T>): void;
  }


  interface Packet extends CustomPacketPayload {}
  class Packet extends CustomPacketPayload {
    constructor(buf: RegistryFriendlyByteBuf);
    static createCodec<B extends ByteBuf, T extends Packet>(encoder: StreamMemberEncoder<B, T>, decoder: StreamDecoder<B, T>): StreamCodec<B, T>;
    static createType<T extends Packet>(namespace: string, path: string): Type<T>;
    handle(packetContext: PacketContext): void;
    write(var1: RegistryFriendlyByteBuf): void;
  }

}

declare module 'it.hurts.octostudios.octolib.module.particle' {
  import { LocalPlayer } from 'net.minecraft.client.player';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { Queue } from 'java.util';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';

  class OctoRenderManager {
    static clientRenderTick(): void;
    static clientTick(level: ClientLevel): void;
    static get providers(): Queue<RenderProvider<any, any>>;
    static getOrCreateBuffer<B extends RenderBuffer<P, B>, P extends RenderProvider<P, B>>(provider: P): B;
    static registerProvider<B extends RenderBuffer<P, B>, P extends RenderProvider<P, B>>(provider: P): void;
    static worldExit(player: LocalPlayer): void;
  }


  class RenderBuffer<P extends RenderProvider<P, B> = any, B extends RenderBuffer<P, B> = any> {
    tick(var1: P): void;
  }


  class RenderProvider<P extends RenderProvider<P, B> = any, B extends RenderBuffer<P, B> = any> {
    createBuffer(): B;
    get renderDistance(): number;
    get updateFrequency(): number;
    getRenderPosition(var1: number): Vec3;
    render(var1: number, var2: PoseStack, var3: MultiBufferSource): void;
    shouldRender(var1: B): boolean;
  }

}

declare module 'it.hurts.octostudios.octolib.module.particle.trail' {
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Iterator, Deque, Map, List } from 'java.util';
  import { EntityType, Entity } from 'net.minecraft.world.entity';
  import { Function } from 'java.util.function';
  import { Arrow } from 'net.minecraft.world.entity.projectile';
  import { Iterable } from 'java.lang';
  import { RenderBuffer, RenderProvider } from 'it.hurts.octostudios.octolib.module.particle';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';

  interface DefaultTrailBuffer<T = any> extends TrailBuffer {}
  class DefaultTrailBuffer<T = any> extends TrailBuffer {
    constructor(maxSize: number);
    equals(o: any): boolean;
    get maxSize(): number;
    get points(): Deque<Vec3>;
    hashCode(): number;
    iterator(): Iterator<Vec3>;
    remove(): void;
    set points(points: Deque<Vec3>);
    size(): number;
    toString(): string;
    write(vec3: Vec3): void;
  }


  interface EntityTrailProvider<T extends Entity = any> extends TrailProvider {}
  class EntityTrailProvider<T extends Entity = any> extends TrailProvider {
    entity: T;
    constructor(entity: T);
    get trailUpdateFrequency(): number;
    getTrailPosition(partialTick: number): Vec3;
    isTrailAlive(): boolean;
    isTrailGrowing(): boolean;
  }


  class EntityTrailRegistry {
    static readonly classProviders: Map;
    static getTrailProvider<T extends Entity>(entity: T): EntityTrailProvider<T>;
    static registerProvider<T extends Entity>(type: EntityType<T>, factory: Function<T, EntityTrailProvider<T>>): void;
  }


  interface TestArrowTrail extends EntityTrailProvider<Arrow> {}
  class TestArrowTrail extends EntityTrailProvider<Arrow> {
    constructor(entity: Arrow);
    get trailFadeInColor(): number;
    get trailFadeOutColor(): number;
    get trailMaxLength(): number;
    get trailScale(): number;
    get trailUpdateFrequency(): number;
  }


  interface TrailBuffer extends Iterable<Vec3>, RenderBuffer<TrailProvider, TrailBuffer> {}
  class TrailBuffer extends Iterable<Vec3> {
    remove(): void;
    size(): number;
    tick(provider: TrailProvider): void;
    write(var1: Vec3): void;
  }


  interface TrailProvider extends RenderProvider<TrailProvider, TrailBuffer> {}
  class TrailProvider extends RenderProvider<TrailProvider, TrailBuffer> {
    createBuffer(): TrailBuffer;
    disappearAfterDeath(): boolean;
    get renderDistance(): number;
    get trailFadeInColor(): number;
    get trailFadeOutColor(): number;
    get trailInterpolationPoints(): number;
    get trailMaxLength(): number;
    get trailRenderDistance(): number;
    get trailScale(): number;
    get trailUpdateFrequency(): number;
    get updateFrequency(): number;
    getRenderPosition(partialTick: number): Vec3;
    getTrailPosition(var1: number): Vec3;
    getTrailRenderPositions(points: Vec3[], pTicks: number): Vec3[];
    isTrailAlive(): boolean;
    isTrailGrowing(): boolean;
    render(pTicks: number, poseStack: PoseStack, bufferSourceList: MultiBufferSource): void;
    shouldRender(buffer: TrailBuffer): boolean;
  }

}

declare module 'it.hurts.octostudios.octolib.neoforge' {
  import { IEventBus } from 'net.neoforged.bus.api';

  class OctoLibNeoForge {
    constructor(modBus: IEventBus);
  }


  class OctoLibNeoForgeClient {
    constructor(modBus: IEventBus);
  }

}

declare module 'it.hurts.octostudios.octolib' {
  import { Logger } from 'org.apache.logging.log4j';

  class OctoLib {
    static readonly MODID: string;
    static readonly LOGGER: Logger;
    static init(): void;
  }


  class OctoLibClient {
    static DELTA_NANOS: number;
    static get deltaTime(): number;
    static init(): void;
  }

}

declare module 'it.hurts.octostudios.octolib.util' {
  import { Interpolator } from 'it.hurts.octostudios.octolib.client.animation.easing';
  import { Color } from 'java.awt';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Vec2, Vec3 } from 'net.minecraft.world.phys';
  import { Matrix4f, Vector2f } from 'org.joml';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { BlockPos } from 'net.minecraft.core';
  import { Entity } from 'net.minecraft.world.entity';

  class AnimationUtils {
    static readonly DOUBLE: Interpolator;
    static readonly FLOAT: Interpolator;
    static readonly COLOR: Interpolator;
    static readonly VEC2: Interpolator;
    static readonly VEC3: Interpolator;
    static readonly VECTOR2D: Interpolator;
    static readonly VECTOR3D: Interpolator;
    static readonly VECTOR2F: Interpolator;
    static readonly VECTOR3F: Interpolator;
    static add<T>(first: T, second: T): T;
    static lerp<T>(from: T, to: T, t: number): T;
    static subtract<T>(first: T, second: T): T;
  }


  class ColorUtils {
    static blend(a: Color, b: Color, t: number): Color;
    static lerpInt(colorStart: number, colorEnd: number, t: number): number;
  }


  class CommonCode {
    static applyShake(guiGraphics: GuiGraphics, partialTick: number): void;
  }


  class OctoColor {
    static readonly RED: OctoColor;
    static readonly GREEN: OctoColor;
    static readonly BLUE: OctoColor;
    static readonly WHITE: OctoColor;
    static readonly BLACK: OctoColor;
    static readonly ZERO: OctoColor;
    constructor(r: number, g: number, b: number, a: number);

    constructor(argb: number);
    a(): number;
    add(other: OctoColor): OctoColor;
    b(): number;
    equals(obj: any): boolean;
    g(): number;
    get aRGB(): number;
    hashCode(): number;
    lerp(other: OctoColor, t: number): OctoColor;
    static lerp(t: number, ...colors: OctoColor[]): OctoColor;
    multiply(rFactor: number, gFactor: number, bFactor: number, aFactor: number): OctoColor;
    multiply(factor: number): OctoColor;
    r(): number;
    subtract(other: OctoColor): OctoColor;
    toString(): string;
  }


  class RenderUtils {
    static renderTextureFromCenter(matrix: PoseStack, centerX: number, centerY: number, width: number, height: number, scale: number, zOffset: number): void;
    static renderTextureFromCenter(matrix: PoseStack, centerX: number, centerY: number, texOffX: number, texOffY: number, texWidth: number, texHeight: number, width: number, height: number, scale: number, zOffset: number): void;
    static renderTilingTexture(matrix: PoseStack, x: number, y: number, texOffX: number, texOffY: number, texWidth: number, texHeight: number, width: number, height: number, zOffset: number, tileHorizontally: boolean, tileVertically: boolean): void;
    static toScreenCoords(matrix: Matrix4f, x: number, y: number): Vec2;
    static toViewportCoords(matrix: Matrix4f, x: number, y: number): Vec2;
  }


  class TesselatorUtils {
    static readonly TRAIL_RENDER_TYPE: RenderType;
    static drawFullQuadWithColor(tes: VertexConsumer, matrix4f: Matrix4f, pos1X: number, pos1Y: number, pos1Z: number, pos2X: number, pos2Y: number, pos2Z: number, pos3X: number, pos3Y: number, pos3Z: number, pos4X: number, pos4Y: number, pos4Z: number, color: Color): void;
    static drawQuadGradient(tes: VertexConsumer, matrix4f: Matrix4f, pos1X: number, pos1Y: number, pos1Z: number, pos2X: number, pos2Y: number, pos2Z: number, pos3X: number, pos3Y: number, pos3Z: number, pos4X: number, pos4Y: number, pos4Z: number, color1: Color, color2: Color): void;
  }


  class VectorUtils {
    static readonly X_VEC: Vec3;
    static readonly Y_VEC: Vec3;
    static readonly Z_VEC: Vec3;
    static catmullromVec(f: number, v1: Vec3, v2: Vec3, v3: Vec3, v4: Vec3): Vec3;
    static loadFromNBT(name: string, tag: CompoundTag): Vec3;
    static parse(pos: BlockPos): Vec3;
    static parse(entity: Entity): Vec3;
    static rotate(v: Vec3, axis: Vec3, angle: number): Vec3;
    static rotate(vec: Vector2f, rotDegrees: number): Vector2f;
    static saveToNBT(name: string, tag: CompoundTag, vec3: Vec3): void;
  }

}