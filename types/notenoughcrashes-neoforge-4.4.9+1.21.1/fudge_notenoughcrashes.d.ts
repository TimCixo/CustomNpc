declare module 'fudge.notenoughcrashes.config' {
  import { Map } from 'java.util';
  import { Class } from 'java.lang';
  import { Tooltip } from 'net.minecraft.client.gui.components';
  import { EntryInfo, Comment } from 'fudge.notenoughcrashes.config.MidnightConfig';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { CrashUpload } from 'fudge.notenoughcrashes.config.OldNecConfig';

  class MidnightConfig {
    static readonly configClass: Map;
    static getClass(modid: string): MidnightConfig;
    static getScreen(parent: Screen, modid: string): Screen;
    static getTooltip(info: EntryInfo): Tooltip;
    static init(modid: string, config: Class<MidnightConfig>): void;
    static write(modid: string): void;
    writeChanges(modid: string): void;
  }


  interface NecMidnightConfig extends MidnightConfig {}
  class NecMidnightConfig extends MidnightConfig {
    static disableReturnToMainMenuComment1: Comment;
    static disableReturnToMainMenuComment2: Comment;
    static disableReturnToMainMenu: boolean;
    static catchInitializationCrashesComment1: Comment;
    static catchInitializationCrashesComment2: Comment;
    static catchInitializationCrashesComment3: Comment;
    static catchInitializationCrashes: boolean;
    static debugModIdentificationComment: Comment;
    static debugModIdentification: boolean;
    static crashLimitComment: Comment;
    static crashLimit: number;
    static catchGameloopComment1: Comment;
    static catchGameloopComment2: Comment;
    static catchGameloop: boolean;
  }


  class OldNecConfig {
    disableReturnToMainMenu: boolean;
    deobfuscateStackTrace: boolean;
    catchInitializationCrashes: boolean;
    debugModIdentification: boolean;
    forceCrashScreen: boolean;
    crashLimit: number;
    crashlogUpload: CrashUpload;
    static instance(): OldNecConfig;
  }

}

declare module 'fudge.notenoughcrashes.config.MidnightConfig' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { TabManager, Tab, TabNavigationBar } from 'net.minecraft.client.gui.components.tabs';
  import { Map, List } from 'java.util';
  import { Button, AbstractSliderButton, AbstractWidget, ContainerObjectSelectionList } from 'net.minecraft.client.gui.components';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ExclusionStrategy, FieldAttributes } from 'com.google.gson';
  import { Class } from 'java.lang';
  import { Component } from 'net.minecraft.network.chat';
  import { Entry } from 'ContainerObjectSelectionList';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { NarratableEntry } from 'net.minecraft.client.gui.narration';
  import { Minecraft } from 'net.minecraft.client';

  class EntryInfo {
  }


  interface MidnightConfigScreen extends Screen {}
  class MidnightConfigScreen extends Screen {
    readonly translationPrefix: string;
    readonly parent: Screen;
    readonly modid: string;
    list: MidnightConfigListWidget;
    reload: boolean;
    tabManager: TabManager;
    tabs: Map;
    prevTab: Tab;
    tabNavigation: TabNavigationBar;
    done: Button;
    scrollProgress: number;
    fillList(): void;
    init(): void;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    loadValues(): void;
    render(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    tick(): void;
    updateResetButtons(): void;
  }


  interface HiddenAnnotationExclusionStrategy extends ExclusionStrategy {}
  class HiddenAnnotationExclusionStrategy extends ExclusionStrategy {
    shouldSkipClass(clazz: Class<any>): boolean;
    shouldSkipField(fieldAttributes: FieldAttributes): boolean;
  }


  interface MidnightSliderWidget extends AbstractSliderButton {}
  class MidnightSliderWidget extends AbstractSliderButton {
    constructor(x: number, y: number, width: number, height: number, text: Component, value: number, info: EntryInfo);
  }


  interface ButtonEntry extends Entry<ButtonEntry> {}
  class ButtonEntry extends Entry<ButtonEntry> {
    readonly buttons: List;
    readonly info: EntryInfo;
    centered: boolean;
    static readonly buttonsWithText: Map;
    constructor(buttons: AbstractWidget[], text: Component, info: EntryInfo);
    children(): GuiEventListener[];
    narratables(): NarratableEntry[];
    render(context: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, hovered: boolean, tickDelta: number): void;
  }


  interface MidnightConfigListWidget extends ContainerObjectSelectionList<ButtonEntry> {}
  class MidnightConfigListWidget extends ContainerObjectSelectionList<ButtonEntry> {
    constructor(client: Minecraft, width: number, height: number, y: number, itemHeight: number);
    addButton(buttons: AbstractWidget[], text: Component, info: EntryInfo): void;
    clear(): void;
    get rowWidth(): number;
    get scrollbarPosition(): number;
  }

}

declare module 'fudge.notenoughcrashes.config.OldNecConfig' {
  import { Privacy, Expiry } from 'fudge.notenoughcrashes.config.OldNecConfig.Pastebin';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class CrashUpload {
    destination: CrashLogUploadDestination;
    hasteUrl: string;
    bytebinUrl: string;
    gist: Gist;
    pastebin: Pastebin;
    customUserAgent: string;
  }


  class Pastebin {
    uploadKey: string;
    privacy: Privacy;
    expiry: Expiry;
  }


  class Gist {
    accessToken: string;
    unlisted: boolean;
  }


  interface CrashLogUploadDestination extends Enum<CrashLogUploadDestination> {}
  class CrashLogUploadDestination extends Enum<CrashLogUploadDestination> {
    static readonly GIST: CrashLogUploadDestination;
    static readonly HASTE: CrashLogUploadDestination;
    static readonly PASTEBIN: CrashLogUploadDestination;
    static readonly BYTEBIN: CrashLogUploadDestination;
    static readonly CRASHY: CrashLogUploadDestination;
    static valueOf(name: string): CrashLogUploadDestination;
    static values(): CrashLogUploadDestination[];
  }

}

declare module 'fudge.notenoughcrashes.config.OldNecConfig.Pastebin' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Privacy extends Enum<Privacy> {}
  class Privacy extends Enum<Privacy> {
    static readonly PUBLIC: Privacy;
    static readonly UNLISTED: Privacy;
    static valueOf(name: string): Privacy;
    static values(): Privacy[];
  }


  interface Expiry extends Enum<Expiry> {}
  class Expiry extends Enum<Expiry> {
    static readonly NEVER: Expiry;
    static readonly TENMIN: Expiry;
    static readonly ONEHOUR: Expiry;
    static readonly ONEDAY: Expiry;
    static readonly ONEWEEK: Expiry;
    static readonly TWOWEEK: Expiry;
    static readonly ONEMONTH: Expiry;
    static readonly SIXMONTH: Expiry;
    static readonly ONEYEAR: Expiry;
    static valueOf(name: string): Expiry;
    static values(): Expiry[];
  }

}

declare module 'fudge.notenoughcrashes.forge.client' {
  import { ModContainer } from 'net.neoforged.fml';

  class NotEnoughCrashesForgeClient {
    constructor(container: ModContainer);
  }

}

declare module 'fudge.notenoughcrashes.forge.mixins.client' {
  class MixinMain {
  }

}

declare module 'fudge.notenoughcrashes.forge.mixins' {
  class MixinMain {
  }

}

declare module 'fudge.notenoughcrashes.forge' {
  class NotEnoughCrashesForge {
    constructor();
  }

}

declare module 'fudge.notenoughcrashes.forge.platform' {
  import { NecPlatform, ModsByLocation, CommonModMetadata } from 'fudge.notenoughcrashes.platform';
  import { Path } from 'java.nio.file';
  import { InputStream } from 'java.io';
  import { List } from 'java.util';

  interface ForgePlatform extends NecPlatform {}
  class ForgePlatform extends NecPlatform {
    get allMods(): CommonModMetadata[];
    get configDirectory(): Path;
    get gameDirectory(): Path;
    get modsAtLocationsInDisk(): ModsByLocation;
    getModMetadatas(modId: string): CommonModMetadata[];
    getResource(relativePath: Path): InputStream;
    isClient(): boolean;
    isDevelopmentEnvironment(): boolean;
    isForge(): boolean;
    isModLoaded(modId: string): boolean;
    modContainsFile(mod: CommonModMetadata, path: string): boolean;
  }

}

declare module 'fudge.notenoughcrashes.gui' {
  import { CrashReport } from 'net.minecraft';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Screen } from 'net.minecraft.client.gui.screens';

  interface CrashScreen extends ProblemScreen {}
  class CrashScreen extends ProblemScreen {
    constructor(report: CrashReport);
    construct(report: CrashReport): ProblemScreen;
    init(): void;
    render(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }


  interface InitErrorScreen extends ProblemScreen {}
  class InitErrorScreen extends ProblemScreen {
    constructor(report: CrashReport);
    construct(report: CrashReport): ProblemScreen;
    init(): void;
    render(context: GuiGraphics, mouseX: number, i: number, f: number): void;
  }


  interface ProblemScreen extends Screen {}
  class ProblemScreen extends Screen {
    construct(var1: CrashReport): ProblemScreen;
    init(): void;
    mouseClicked(x: number, y: number, int_1: number): boolean;
    render(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    shouldCloseOnEsc(): boolean;
  }

}

declare module 'fudge.notenoughcrashes.gui.util' {
  import { Component } from 'net.minecraft.network.chat';
  import { Font, GuiGraphics } from 'net.minecraft.client.gui';

  interface TextWidget extends Widget {}
  class TextWidget extends Widget {
    static readonly CLICKABLE_TEXT_COLOR: number;
    constructor(text: Component, color: number, font: Font, x: number, y: number);
    draw(context: GuiGraphics): void;
    onClick(x: number, y: number): void;
  }


  class Widget {
    draw(var1: GuiGraphics): void;
    onClick(var1: number, var3: number): void;
  }

}

declare module 'fudge.notenoughcrashes.mixinhandlers' {
  import { Throwable, Runnable } from 'java.lang';
  import { CrashReport } from 'net.minecraft';
  import { Queue } from 'java.util';

  class EntryPointCatcher {
    static crashedDuringStartup(): boolean;
    static displayInitErrorScreen(): void;
    static handleEntryPointError(e: Throwable): void;
  }


  class InGameCatcher {
    static crashScreenActive: boolean;
    static addInfoToCrash(report: CrashReport): void;
    static cleanupBeforeMinecraft(renderTaskQueue: Queue<Runnable>): void;
    static displayCrashScreen(report: CrashReport, crashCount: number, clientCrash: boolean): void;
    static handleClientCrash(report: CrashReport): void;
    static handleServerCrash(report: CrashReport): void;
  }

}

declare module 'fudge.notenoughcrashes.mixins.client' {
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { ReentrantBlockableEventLoop } from 'net.minecraft.util.thread';
  import { Runnable } from 'java.lang';
  import { MinecraftClientAccess } from 'fudge.notenoughcrashes.patches';
  import { CrashReport } from 'net.minecraft';
  import { MetricsRecorder } from 'net.minecraft.util.profiling.metrics.profiling';

  class MixinKeyboard {
    pollDebugCrashDontCrashInfinitely(ci: CallbackInfo): void;
  }


  interface MixinMinecraftClient extends MinecraftClientAccess, ReentrantBlockableEventLoop<Runnable> {}
  class MixinMinecraftClient extends MinecraftClientAccess {
    constructor(string_1: string);
    emergencySaveAndCrash(report: CrashReport): void;
    get recorder(): MetricsRecorder;
    set recorder(recorder: MetricsRecorder);
  }


  class MixinMinecraftServerClientOnly {
  }

}

declare module 'fudge.notenoughcrashes.mixins' {
  class MixinCrashReport {
  }


  class MixinEntity {
  }


  class MixinTileEntity {
  }

}

declare module 'fudge.notenoughcrashes' {
  import { Path } from 'java.nio.file';
  import { Logger } from 'org.apache.logging.log4j';
  import { CommonModMetadata } from 'fudge.notenoughcrashes.platform';

  class NotEnoughCrashes {
    static readonly DIRECTORY: Path;
    static readonly NAME: string;
    static readonly MOD_ID: string;
    static enableEntrypointCatching(): boolean;
    static enableGameloopCatching(): boolean;
    static ensureDirectoryExists(): void;
    static get logger(): Logger;
    static get metadata(): CommonModMetadata;
    static initialize(): void;
    static logDebug(message: string): void;
  }

}

declare module 'fudge.notenoughcrashes.patches' {
  import { MetricsRecorder } from 'net.minecraft.util.profiling.metrics.profiling';

  class MinecraftClientAccess {
    get recorder(): MetricsRecorder;
    set recorder(var1: MetricsRecorder);
  }

}

declare module 'fudge.notenoughcrashes.platform' {
  import { Map, Set, List } from 'java.util';
  import { Path } from 'java.nio.file';
  import { URI } from 'java.net';
  import { InputStream } from 'java.io';

  class ModsByLocation {
    constructor(locationToMod: Map<Path, Set<CommonModMetadata>>);
    get(path: URI): Set<CommonModMetadata>;
    get(path: Path): Set<CommonModMetadata>;
    getOrEmpty(path: Path): Set<CommonModMetadata>;
    toString(): string;
  }


  class NecPlatform {
    get allMods(): CommonModMetadata[];
    get configDirectory(): Path;
    get gameDirectory(): Path;
    get modsAtLocationsInDisk(): ModsByLocation;
    getModMetadatas(var1: string): CommonModMetadata[];
    getResource(var1: Path): InputStream;
    static instance(): NecPlatform;
    irisExists(): boolean;
    isClient(): boolean;
    isDevelopmentEnvironment(): boolean;
    isForge(): boolean;
    isModLoaded(var1: string): boolean;
    modContainsFile(var1: CommonModMetadata, var2: string): boolean;
  }


  class NecPlatformStorage {
    static INSTANCE_SET_ONLY_BY_SPECIFIC_PLATFORMS_VERY_EARLY: NecPlatform;
  }

}

declare module 'fudge.notenoughcrashes.stacktrace' {
  import { CrashReport } from 'net.minecraft';
  import { Set } from 'java.util';
  import { CommonModMetadata } from 'fudge.notenoughcrashes.platform';

  class CrashUtils {
    static outputClientReport(report: CrashReport): void;
    static outputReport(report: CrashReport, isClient: boolean): void;
  }


  class ModIdentifier {
    static getSuspectedModsOf(report: CrashReport): Set<CommonModMetadata>;
  }

}

declare module 'fudge.notenoughcrashes.upload' {
  import { CompletableFuture } from 'java.util.concurrent';
  import { RuntimeException } from 'java.lang';

  class CrashyUpload {
    static uploadToCrashy(text: string): CompletableFuture<string>;
    static uploadToCrashySync(text: string): string;
  }


  class LegacyCrashLogUpload {
    static upload(text: string): string;
  }


  interface UploadToCrashyError extends RuntimeException {}
  class UploadToCrashyError extends RuntimeException {
    constructor(message: string);
  }

}

declare module 'fudge.notenoughcrashes.upload.CrashyUpload' {
  class UploadCrashSuccess {
  }

}

declare module 'fudge.notenoughcrashes.upload.UploadToCrashyError' {
  import { UploadToCrashyError } from 'fudge.notenoughcrashes.upload';

  interface TooLarge extends UploadToCrashyError {}
  class TooLarge extends UploadToCrashyError {
    constructor();
  }


  interface InvalidCrash extends UploadToCrashyError {}
  class InvalidCrash extends UploadToCrashyError {
    constructor();
  }

}

declare module 'fudge.notenoughcrashes.utils' {
  import { Component } from 'net.minecraft.network.chat';
  import { SecurityException } from 'java.lang';

  class GlUtil {
    static resetState(): void;
  }


  class NecLocalization {
    static localize(translationKey: string): string;
    static translatedText(translationKey: string): Component;
  }


  interface SystemExitBlockedException extends SecurityException {}
  class SystemExitBlockedException extends SecurityException {
    constructor(s: string);
  }

}