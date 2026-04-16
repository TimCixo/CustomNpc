declare module 'dynamic_fps.impl.compat' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Component } from 'net.minecraft.network.chat';
  import { Enum } from 'java.lang';
  import { IdleCondition, BatteryIndicatorCondition, BatteryIndicatorPlacement } from 'dynamic_fps.impl.config.option';

  class ClothConfig {
    static IdleConditionMessage(state: Enum<IdleCondition>): Component;
    static batteryIndicatorConditionMessage(state: Enum<BatteryIndicatorCondition>): Component;
    static batteryIndicatorPlacementMessage(state: Enum<BatteryIndicatorPlacement>): Component;
    static genConfigScreen(parent: Screen): Screen;
    static ignoreInitialClickMessage(state: Enum<IdleCondition>): Component;
  }


  class GLFW {
    static applyWorkaround(): void;
  }

}

declare module 'dynamic_fps.impl.config' {
  import { DisplayConfig } from 'dynamic_fps.impl.config.BatteryTrackerConfig';
  import { Map } from 'java.util';
  import { Float } from 'java.lang';
  import { GraphicsState, IgnoreInitialClick, IdleCondition } from 'dynamic_fps.impl.config.option';
  import { SoundSource } from 'net.minecraft.sounds';
  import { PowerState } from 'dynamic_fps.impl';

  class BatteryTrackerConfig {
    criticalLevel(): number;
    display(): DisplayConfig;
    enabled(): boolean;
    notifications(): boolean;
    setCriticalLevel(value: number): void;
    setEnabled(value: boolean): void;
    setNotifications(value: boolean): void;
    setShowWhenDebug(value: boolean): void;
    setSwitchStates(value: boolean): void;
    showWhenDebug(): boolean;
    switchStates(): boolean;
  }


  class Config {
    static readonly ACTIVE: Config;
    constructor(frameRateTarget: number, enableVsync: boolean, volumeMultipliers: Map<string, number>, graphicsState: GraphicsState, showToasts: boolean, runGarbageCollector: boolean);
    enableVsync(): boolean;
    frameRateTarget(): number;
    graphicsState(): GraphicsState;
    rawVolumeMultiplier(source: SoundSource): number;
    runGarbageCollector(): boolean;
    setEnableVsync(value: boolean): void;
    setFrameRateTarget(value: number): void;
    setGraphicsState(value: GraphicsState): void;
    setRunGarbageCollector(value: boolean): void;
    setShowToasts(value: boolean): void;
    setVolumeMultiplier(source: SoundSource, value: number): void;
    showToasts(): boolean;
    volumeMultiplier(source: SoundSource): number;
  }


  class DynamicFPSConfig {
    static readonly DEFAULTS: DynamicFPSConfig;
    static readonly INSTANCE: DynamicFPSConfig;
    batteryTracker(): BatteryTrackerConfig;
    downloadNatives(): boolean;
    enabled(): boolean;
    get(state: PowerState): Config;
    idle(): IdleConfig;
    ignoreInitialClick(): IgnoreInitialClick;
    mockBatteryData(): boolean;
    save(): void;
    setDownloadNatives(value: boolean): void;
    setEnabled(value: boolean): void;
    setIgnoreInitialClick(value: IgnoreInitialClick): void;
    setMockBatteryData(value: boolean): void;
    setUncapMenuFrameRate(value: boolean): void;
    uncapMenuFrameRate(): boolean;
    volumeTransitionSpeed(): VolumeTransitionConfig;
  }


  class IdleConfig {
    condition(): IdleCondition;
    setCondition(value: IdleCondition): void;
    setTimeout(value: number): void;
    timeout(): number;
  }


  class Serialization {
    static loadDefault(): DynamicFPSConfig;
    static loadPersonalized(): DynamicFPSConfig;
    static save(): void;
  }


  class VolumeTransitionConfig {
    get down(): number;
    get up(): number;
    isActive(): boolean;
    set down(value: number);
    set up(value: number);
  }

}

declare module 'dynamic_fps.impl.config.BatteryTrackerConfig' {
  import { BatteryIndicatorCondition, BatteryIndicatorPlacement } from 'dynamic_fps.impl.config.option';

  class DisplayConfig {
    condition(): BatteryIndicatorCondition;
    isActive(): boolean;
    placement(): BatteryIndicatorPlacement;
    setCondition(value: BatteryIndicatorCondition): void;
    setPlacement(value: BatteryIndicatorPlacement): void;
  }

}

declare module 'dynamic_fps.impl.config.option' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { Window } from 'com.mojang.blaze3d.platform';

  interface BatteryIndicatorCondition extends Enum<BatteryIndicatorCondition> {}
  class BatteryIndicatorCondition extends Enum<BatteryIndicatorCondition> {
    static readonly DISABLED: BatteryIndicatorCondition;
    static readonly DRAINING: BatteryIndicatorCondition;
    static readonly CRITICAL: BatteryIndicatorCondition;
    static readonly CONSTANT: BatteryIndicatorCondition;
    isConditionMet(): boolean;
    static valueOf(name: string): BatteryIndicatorCondition;
    static values(): BatteryIndicatorCondition[];
  }


  interface BatteryIndicatorPlacement extends Enum<BatteryIndicatorPlacement> {}
  class BatteryIndicatorPlacement extends Enum<BatteryIndicatorPlacement> {
    static readonly TOP_LEFT: BatteryIndicatorPlacement;
    static readonly TOP_RIGHT: BatteryIndicatorPlacement;
    static readonly BOTTOM_LEFT: BatteryIndicatorPlacement;
    static readonly BOTTOM_RIGHT: BatteryIndicatorPlacement;
    get(window: Window): number[];
    static valueOf(name: string): BatteryIndicatorPlacement;
    static values(): BatteryIndicatorPlacement[];
  }


  interface GraphicsState extends Enum<GraphicsState> {}
  class GraphicsState extends Enum<GraphicsState> {
    static readonly DEFAULT: GraphicsState;
    static readonly REDUCED: GraphicsState;
    static readonly MINIMAL: GraphicsState;
    static valueOf(name: string): GraphicsState;
    static values(): GraphicsState[];
  }


  interface IdleCondition extends Enum<IdleCondition> {}
  class IdleCondition extends Enum<IdleCondition> {
    static readonly NONE: IdleCondition;
    static readonly ON_BATTERY: IdleCondition;
    static valueOf(name: string): IdleCondition;
    static values(): IdleCondition[];
  }


  interface IgnoreInitialClick extends Enum<IgnoreInitialClick> {}
  class IgnoreInitialClick extends Enum<IgnoreInitialClick> {
    static readonly DISABLED: IgnoreInitialClick;
    static readonly IN_WORLD: IgnoreInitialClick;
    static readonly CONSTANT: IgnoreInitialClick;
    static valueOf(name: string): IgnoreInitialClick;
    static values(): IgnoreInitialClick[];
  }

}

declare module 'dynamic_fps.impl' {
  import { WindowObserver } from 'dynamic_fps.impl.feature.state';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { SoundSource } from 'net.minecraft.sounds';
  import { GraphicsState } from 'dynamic_fps.impl.config.option';
  import { State } from 'net.lostluma.battery.api';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class Constants {
    static readonly MOD_ID: string;
    static readonly DEBUG: boolean;
    static readonly MIN_FRAME_RATE_LIMIT: number;
    static readonly NO_FRAME_RATE_LIMIT: number;
    static readonly TITLE_FRAME_RATE_LIMIT: number;
    static readonly CLOTH_CONFIG_ID: string[];
  }


  class DynamicFPSMod {
    static checkForRender(): boolean;
    static disabledByUser(): boolean;
    static enableVsync(): boolean;
    static get window(): WindowObserver;
    static getConfigScreen(parent: Screen): Screen;
    static graphicsState(): GraphicsState;
    static handleStateChange(previous: PowerState, current: PowerState): void;
    static init(): void;
    static isDisabled(): boolean;
    static isForcingLowFPS(): boolean;
    static onBatteryChargeChanged(before: number, after: number): void;
    static onBatteryStatusChanged(before: State, after: State): void;
    static onConfigChanged(): void;
    static onStatusChanged(userInitiated: boolean): void;
    static powerState(): PowerState;
    static renderedCurrentFrame(): boolean;
    static set window(address: number);
    static shouldShowLevels(): boolean;
    static shouldShowToasts(): boolean;
    static targetFrameRate(): number;
    static toggleDisabled(): void;
    static toggleForceLowFPS(): void;
    static volumeMultiplier(source: SoundSource): number;
    static whyIsTheModNotWorking(): string;
  }


  interface PowerState extends Enum<PowerState> {}
  class PowerState extends Enum<PowerState> {
    static readonly FOCUSED: PowerState;
    static readonly HOVERED: PowerState;
    static readonly UNFOCUSED: PowerState;
    static readonly INVISIBLE: PowerState;
    static readonly UNPLUGGED: PowerState;
    static readonly ABANDONED: PowerState;
    static valueOf(name: string): PowerState;
    static values(): PowerState[];
  }

}

declare module 'dynamic_fps.impl.feature.battery' {
  import { Toast, ToastComponent } from 'net.minecraft.client.gui.components.toasts';
  import { Visibility } from 'Toast';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { State } from 'net.lostluma.battery.api';

  interface BaseToast extends Toast {}
  class BaseToast extends Toast {
    onFirstRender(): void;
    render(graphics: GuiGraphics, toastComponent: ToastComponent, currentTime: number): Visibility;
  }


  interface BatteryToast extends BaseToast {}
  class BatteryToast extends BaseToast {
    onFirstRender(): void;
    static queueToast(title: Component, icon: ResourceLocation): void;
  }


  class BatteryTracker {
    static charge(): number;
    static hasBatteries(): boolean;
    static init(): void;
    static isFeatureEnabled(): boolean;
    static status(): State;
  }


  interface ErrorToast extends BaseToast {}
  class ErrorToast extends BaseToast {
    static queueToast(description: Component): void;
  }

}

declare module 'dynamic_fps.impl.feature.state' {
  import { Options } from 'net.minecraft.client';
  import { GraphicsState } from 'dynamic_fps.impl.config.option';

  class ClickIgnoreHandler {
    constructor(address: number);
    static isFeatureActive(): boolean;
  }


  class IdleHandler {
    static init(): void;
    static isIdle(): boolean;
    static onActivity(): void;
    static setWindow(address: number): void;
  }


  class OptionHolder {
    static applyOptions(options: Options, state: GraphicsState): void;
    static copyOptions(options: Options): void;
  }


  class WindowObserver {
    constructor(address: number);
    address(): number;
    isFocused(): boolean;
    isHovered(): boolean;
    isIconified(): boolean;
  }

}

declare module 'dynamic_fps.impl.feature.volume' {
  import { SoundSource } from 'net.minecraft.sounds';

  class SmoothVolumeHandler {
    static init(): void;
    static onStateChange(): void;
    static volumeMultiplier(source: SoundSource): number;
  }

}

declare module 'dynamic_fps.impl.mixin.bugfix' {
  class BlockableEventLoopMixin {
    waitForTasks(): void;
  }

}

declare module 'dynamic_fps.impl.mixin' {
  import { DuckLoadingOverlay, DuckSoundEngine } from 'dynamic_fps.impl.util.duck';
  import { Options } from 'net.minecraft.client';
  import { SoundSource } from 'net.minecraft.sounds';

  class DebugScreenOverlayMixin {
  }


  class GameRendererMixin {
  }


  class GuiMixin {
  }


  interface LoadingOverlayMixin extends DuckLoadingOverlay {}
  class LoadingOverlayMixin extends DuckLoadingOverlay {
    dynamic_fps$isReloadComplete(): boolean;
  }


  class MinecraftMixin {
    options: Options;
  }


  class OptionsMixin {
  }


  interface SoundEngineMixin extends DuckSoundEngine {}
  class SoundEngineMixin extends DuckSoundEngine {
    dynamic_fps$updateVolume(source: SoundSource): void;
  }


  class ToastComponentMixin {
  }


  class WindowMixin {
  }

}

declare module 'dynamic_fps.impl.PowerState' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ConfigurabilityLevel extends Enum<ConfigurabilityLevel> {}
  class ConfigurabilityLevel extends Enum<ConfigurabilityLevel> {
    static readonly NONE: ConfigurabilityLevel;
    static readonly SOME: ConfigurabilityLevel;
    static readonly FULL: ConfigurabilityLevel;
    static valueOf(name: string): ConfigurabilityLevel;
    static values(): ConfigurabilityLevel[];
  }

}

declare module 'dynamic_fps.impl.service' {
  import { Path } from 'java.nio.file';
  import { Optional } from 'java.util';
  import { Version } from 'dynamic_fps.impl.util';
  import { StartTickEvent } from 'dynamic_fps.impl.service.Platform';

  class ModCompat {
    disableOverlayOptimization(): boolean;
    static getInstance(): ModCompat;
    isDisabled(): boolean;
  }


  class Platform {
    get cacheDir(): Path;
    get configDir(): Path;
    get name(): string;
    static getInstance(): Platform;
    getModVersion(var1: string): Optional<Version>;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(var1: string): boolean;
    isModLoaded(...modId: string[]): boolean;
    registerStartTickEvent(var1: StartTickEvent): void;
  }


  class Services {
  }

}

declare module 'dynamic_fps.impl.service.Platform' {
  class StartTickEvent {
    onStartTick(): void;
  }

}

declare module 'dynamic_fps.impl.util' {
  import { State } from 'net.lostluma.battery.api';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { JsonElement } from 'com.google.gson';
  import { Class, Runnable, Thread, Comparable } from 'java.lang';
  import { KeyMapping } from 'net.minecraft.client';
  import { Logger } from 'org.slf4j';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Step } from 'dynamic_fps.impl.util.VariableStepTransformer';

  class BatteryUtil {
    static isCharging(state: State): boolean;
  }


  class Components {
    static literal(value: string): MutableComponent;
    static translatable(path: string, ...args: any[]): MutableComponent;
    static translatable(domain: string, path: string, ...args: any[]): MutableComponent;
    static translationKey(domain: string, path: string): string;
  }


  interface FallbackConfigScreen extends Screen {}
  class FallbackConfigScreen extends Screen {
    constructor(parent: Screen);
    onClose(): void;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  class HudInfoRenderer {
    static renderInfo(guiGraphics: GuiGraphics): void;
  }


  class JsonUtil {
    static fromJson<T>(data: string, type: Class<T>): T;
    static fromJson<T>(data: JsonElement, type: Class<T>): T;
    static toJson(object: any): string;
    static toJson(element: JsonElement): string;
    static toJsonTree(object: any): JsonElement;
  }


  class KeyMappingHandler {
    static get handlers(): KeyMappingHandler[];
    keyMapping(): KeyMapping;
  }


  class Logging {
    static get logger(): Logger;
  }


  class ResourceLocations {
    static of(namespace: string, path: string): ResourceLocation;
  }


  class Threads {
    static create(name: string, runnable: Runnable): Thread;
    static runOnMainThread(runnable: Runnable): void;
  }


  class VariableStepTransformer {
    addStep(change: number, max: number): void;
    compare(self: Step, other: Step): number;
    toStep(value: number): number;
    toValue(step: number): number;
  }


  interface Version extends Comparable<Version> {}
  class Version extends Comparable<Version> {
    buildMetadata(): string;
    compareTo(other: Version): number;
    hasBuildMetadata(): boolean;
    isPreRelease(): boolean;
    major(): number;
    minor(): number;
    static of(major: number, minor: number, patch: number): Version;
    static of(raw: string): Version;
    patch(): number;
    preRelease(): string;
    toString(): string;
  }

}

declare module 'dynamic_fps.impl.util.duck' {
  import { SoundSource } from 'net.minecraft.sounds';

  class DuckLoadingOverlay {
    dynamic_fps$isReloadComplete(): boolean;
  }


  class DuckSoundEngine {
    dynamic_fps$updateVolume(source: SoundSource): void;
  }

}

declare module 'dynamic_fps.impl.util.Version' {
  import { Exception } from 'java.lang';

  interface VersionParseException extends Exception {}
  class VersionParseException extends Exception {
  }

}