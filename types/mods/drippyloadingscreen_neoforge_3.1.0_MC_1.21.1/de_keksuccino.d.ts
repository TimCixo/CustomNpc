declare module 'de.keksuccino.drippyloadingscreen.customization.backgrounds' {
  import { ColorMenuBackgroundBuilder } from 'de.keksuccino.drippyloadingscreen.customization.backgrounds.color';

  class Backgrounds {
    static readonly COLOR_MENU_BACKGROUND: ColorMenuBackgroundBuilder;
    static registerAll(): void;
  }

}

declare module 'de.keksuccino.drippyloadingscreen.customization.backgrounds.color' {
  import { MenuBackground, MenuBackgroundBuilder, SerializedMenuBackground } from 'de.keksuccino.fancymenu.customization.background';
  import { DrawableColor } from 'de.keksuccino.fancymenu.util.rendering';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Consumer } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';
  import { CellScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';

  interface ColorMenuBackground extends MenuBackground {}
  class ColorMenuBackground extends MenuBackground {
    color: DrawableColor;
    constructor(builder: MenuBackgroundBuilder<ColorMenuBackground>);
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface ColorMenuBackgroundBuilder extends MenuBackgroundBuilder<ColorMenuBackground> {}
  class ColorMenuBackgroundBuilder extends MenuBackgroundBuilder<ColorMenuBackground> {
    constructor();
    buildNewOrEditInstance(currentScreen: Screen, backgroundToEdit: ColorMenuBackground, backgroundConsumer: Consumer<ColorMenuBackground>): void;
    deserializeBackground(serializedMenuBackground: SerializedMenuBackground): ColorMenuBackground;
    get description(): Component[];
    get displayName(): Component;
    isDeprecated(): boolean;
    serializedBackground(background: ColorMenuBackground): SerializedMenuBackground;
  }


  interface ColorMenuBackgroundConfigScreen extends CellScreen {}
  class ColorMenuBackgroundConfigScreen extends CellScreen {
    allowDone(): boolean;
  }

}

declare module 'de.keksuccino.drippyloadingscreen.customization' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { RendererWidget } from 'de.keksuccino.fancymenu.util.rendering.ui.widget';

  interface DrippyOverlayScreen extends Screen {}
  class DrippyOverlayScreen extends Screen {
    backgroundOpacity: number;
    constructor();
    static buildLogoWidget(): RendererWidget;
    static buildProgressBarWidget(): RendererWidget;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBackground(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }

}

declare module 'de.keksuccino.drippyloadingscreen.customization.elements' {
  import { VanillaBarElementBuilder } from 'de.keksuccino.drippyloadingscreen.customization.elements.vanillabar';

  class Elements {
    static readonly VANILLA_BAR_ELEMENT: VanillaBarElementBuilder;
    static registerAll(): void;
  }

}

declare module 'de.keksuccino.drippyloadingscreen.customization.elements.vanillabar' {
  import { AbstractEditorElement } from 'de.keksuccino.fancymenu.customization.element.editor';
  import { AbstractElement, ElementBuilder, SerializedElement } from 'de.keksuccino.fancymenu.customization.element';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { DrawableColor } from 'de.keksuccino.fancymenu.util.rendering';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';

  interface VanillaBarEditorElement extends AbstractEditorElement {}
  class VanillaBarEditorElement extends AbstractEditorElement {
    constructor(element: AbstractElement, editor: LayoutEditorScreen);
    get element(): VanillaBarElement;
    init(): void;
  }


  interface VanillaBarElement extends AbstractElement {}
  class VanillaBarElement extends AbstractElement {
    color: DrawableColor;
    constructor(builder: ElementBuilder<any, any>);
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface VanillaBarElementBuilder extends ElementBuilder<VanillaBarElement, VanillaBarEditorElement> {}
  class VanillaBarElementBuilder extends ElementBuilder<VanillaBarElement, VanillaBarEditorElement> {
    constructor();
    buildDefaultInstance(): VanillaBarElement;
    deserializeElement(serialized: SerializedElement): VanillaBarElement;
    getDescription(element: AbstractElement): Component[];
    getDisplayName(element: AbstractElement): Component;
    wrapIntoEditorElement(element: VanillaBarElement, editor: LayoutEditorScreen): VanillaBarEditorElement;
  }

}

declare module 'de.keksuccino.drippyloadingscreen.customization.placeholders' {
  import { Placeholder, DeserializedPlaceholderString } from 'de.keksuccino.fancymenu.customization.placeholder';
  import { List } from 'java.util';

  interface GameLoadingProgressPercentPlaceholder extends Placeholder {}
  class GameLoadingProgressPercentPlaceholder extends Placeholder {
    constructor();
    get alternativeIdentifiers(): string[];
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  class Placeholders {
    static readonly GAME_LOADING_PROGRESS_PERCENT: GameLoadingProgressPercentPlaceholder;
    static registerAll(): void;
  }

}

declare module 'de.keksuccino.drippyloadingscreen' {
  import { Supplier } from 'java.util.function';
  import { InitOrResizeScreenCompletedEvent } from 'de.keksuccino.fancymenu.events.screen';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Post } from 'RenderScreenEvent';
  import { File } from 'java.io';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { DrippyOverlayScreen } from 'de.keksuccino.drippyloadingscreen.customization';
  import { ITexture } from 'de.keksuccino.fancymenu.util.resource.resources.texture';
  import { AbstractOptions } from 'de.keksuccino.fancymenu.util';
  import { Option } from 'AbstractOptions';
  import { Post as initorresizescreenevent_Post } from 'InitOrResizeScreenEvent';

  class DrippyEvents {
    static earlyLoadingEditorScreenSupplier: Supplier;
    mouseClicked($$0: number, $$1: number, $$2: number): boolean;
    onInitOrResizeScreenCompleted(e: InitOrResizeScreenCompletedEvent): void;
    onScreenRenderPost(e: Post): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  class DrippyLoadingScreen {
    static readonly VERSION: string;
    static readonly MOD_LOADER: string;
    static readonly MOD_ID: string;
    static readonly MOD_DIR: File;
    static get options(): Options;
    static init(): void;
    static isEarlyLoadingModulePresent(): boolean;
    static registerAll(): void;
    static reloadOptions(): void;
  }


  class DrippyLoadingScreenNeoForge {
    constructor(eventBus: IEventBus);
  }


  class DrippyUtils {
    static readonly DUMMY_DRIPPY_OVERLAY_SCREEN: DrippyOverlayScreen;
    static isDrippyIdentifier(identifier: string): boolean;
    static isDrippyRendering(): boolean;
    static waitForTexture(t: ITexture): void;
  }


  interface Options extends AbstractOptions {}
  class Options extends AbstractOptions {
    readonly allowUniversalLayouts: Option;
    readonly earlyFadeOutElements: Option;
    readonly waitForTexturesInLoading: Option;
    readonly fadeInOutLoadingScreen: Option;
    readonly earlyLoadingBackgroundTexturePath: Option;
    readonly earlyLoadingBackgroundPreserveAspectRatio: Option;
    readonly earlyLoadingLogoTexturePath: Option;
    readonly earlyLoadingLogoWidth: Option;
    readonly earlyLoadingLogoHeight: Option;
    readonly earlyLoadingLogoPositionOffsetX: Option;
    readonly earlyLoadingLogoPositionOffsetY: Option;
    readonly earlyLoadingWindowTitle: Option;
    readonly earlyLoadingBarBackgroundTexturePath: Option;
    readonly earlyLoadingBarProgressTexturePath: Option;
    readonly earlyLoadingBarWidth: Option;
    readonly earlyLoadingBarHeight: Option;
    readonly earlyLoadingBarPositionOffsetX: Option;
    readonly earlyLoadingBarPositionOffsetY: Option;
    readonly earlyLoadingWindowWidth: Option;
    readonly earlyLoadingWindowHeight: Option;
    readonly earlyLoadingHideLogo: Option;
    readonly earlyLoadingHideBar: Option;
    readonly earlyLoadingTopLeftWatermarkTexturePath: Option;
    readonly earlyLoadingTopLeftWatermarkTextureWidth: Option;
    readonly earlyLoadingTopLeftWatermarkTextureHeight: Option;
    readonly earlyLoadingTopLeftWatermarkTexturePositionOffsetX: Option;
    readonly earlyLoadingTopLeftWatermarkTexturePositionOffsetY: Option;
    readonly earlyLoadingTopRightWatermarkTexturePath: Option;
    readonly earlyLoadingTopRightWatermarkTextureWidth: Option;
    readonly earlyLoadingTopRightWatermarkTextureHeight: Option;
    readonly earlyLoadingTopRightWatermarkTexturePositionOffsetX: Option;
    readonly earlyLoadingTopRightWatermarkTexturePositionOffsetY: Option;
    readonly earlyLoadingBottomLeftWatermarkTexturePath: Option;
    readonly earlyLoadingBottomLeftWatermarkTextureWidth: Option;
    readonly earlyLoadingBottomLeftWatermarkTextureHeight: Option;
    readonly earlyLoadingBottomLeftWatermarkTexturePositionOffsetX: Option;
    readonly earlyLoadingBottomLeftWatermarkTexturePositionOffsetY: Option;
    readonly earlyLoadingBottomRightWatermarkTexturePath: Option;
    readonly earlyLoadingBottomRightWatermarkTextureWidth: Option;
    readonly earlyLoadingBottomRightWatermarkTextureHeight: Option;
    readonly earlyLoadingBottomRightWatermarkTexturePositionOffsetX: Option;
    readonly earlyLoadingBottomRightWatermarkTexturePositionOffsetY: Option;
    readonly earlyLoadingHideLogger: Option;
    constructor();
  }


  class Test {
  }


  class TestNeoForge {
    onRenderPost(e: initorresizescreenevent_Post): void;
  }

}

declare module 'de.keksuccino.drippyloadingscreen.mixin' {
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { Set, List } from 'java.util';
  import { ClassNode } from 'org.objectweb.asm.tree';

  interface DrippyMixinPlugin extends IMixinConfigPlugin {}
  class DrippyMixinPlugin extends IMixinConfigPlugin {
    acceptTargets(myTargets: Set<string>, otherTargets: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    onLoad(mixinPackage: string): void;
    postApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    preApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    shouldApplyMixin(targetClassName: string, mixinClassName: string): boolean;
  }


  class MixinCache {
    static cachedCurrentLoadingScreenProgress: number;
    static cachedLoadingOverlayScale: number;
  }

}

declare module 'de.keksuccino.drippyloadingscreen.mixin.mixins.common.client' {
  import { IntSupplier } from 'java.util.function';
  import { FontManager } from 'net.minecraft.client.gui.font';

  class IMixinLoadingOverlay {
    get currentProgressDrippy(): number;
    static getBrandBackgroundDrippy(): IntSupplier;
  }


  class IMixinMinecraft {
    get fontManagerDrippy(): FontManager;
  }


  class MixinCustomizationOverlay {
  }


  class MixinCustomizationOverlayUI {
  }


  class MixinElementBuilder {
  }


  class MixinImageElement {
  }


  class MixinImageMenuBackground {
  }


  class MixinLayout {
  }


  class MixinLayoutEditorUI {
  }


  class MixinLoadingOverlay {
  }


  class MixinMenuBackgroundBuilder {
  }


  class MixinPlayerEntityElement {
  }


  class MixinProgressBarElement {
  }


  class MixinScreenCustomization {
  }


  class MixinScreenCustomizationLayer {
  }

}

declare module 'de.keksuccino.drippyloadingscreen.mixin.mixins.neoforge.client' {
  import { LoadingOverlay } from 'net.minecraft.client.gui.screens';
  import { Minecraft } from 'net.minecraft.client';
  import { ReloadInstance } from 'net.minecraft.server.packs.resources';
  import { Consumer } from 'java.util.function';
  import { Optional } from 'java.util';
  import { Throwable } from 'java.lang';

  class MixinNeoForgeCustomizationOverlayUI {
  }


  interface MixinNeoForgeLoadingOverlay extends LoadingOverlay {}
  class MixinNeoForgeLoadingOverlay extends LoadingOverlay {
    constructor(mc: Minecraft, reload: ReloadInstance, errorConsumer: Consumer<Optional<Throwable>>, b: boolean);
  }

}

declare module 'de.keksuccino.drippyloadingscreen.neoforge' {
  import { LoadingOverlay, Screen } from 'net.minecraft.client.gui.screens';
  import { Minecraft } from 'net.minecraft.client';
  import { ReloadInstance } from 'net.minecraft.server.packs.resources';
  import { Consumer } from 'java.util.function';
  import { Optional } from 'java.util';
  import { Throwable } from 'java.lang';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface CustomLoadingOverlay extends LoadingOverlay {}
  class CustomLoadingOverlay extends LoadingOverlay {
    constructor(minecraft: Minecraft, reload: ReloadInstance, onFinish: Consumer<Optional<Throwable>>, fadeIn: boolean);
  }


  interface EarlyLoadingEditorScreen extends Screen {}
  class EarlyLoadingEditorScreen extends Screen {
    constructor();
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    removed(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    renderBackground(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    tick(): void;
  }

}

declare module 'de.keksuccino.drippyloadingscreen.platform' {
  import { IPlatformCompatibilityLayer, IPlatformHelper } from 'de.keksuccino.drippyloadingscreen.platform.services';
  import { List } from 'java.util';
  import { Key } from 'InputConstants';
  import { KeyMapping } from 'net.minecraft.client';
  import { Class } from 'java.lang';

  interface NeoForgeCompatibilityLayer extends IPlatformCompatibilityLayer {}
  class NeoForgeCompatibilityLayer extends IPlatformCompatibilityLayer {
  }


  interface NeoForgePlatformHelper extends IPlatformHelper {}
  class NeoForgePlatformHelper extends IPlatformHelper {
    get loadedModIds(): string[];
    get loaderVersion(): string;
    get platformDisplayName(): string;
    get platformName(): string;
    getKeyMappingKey(keyMapping: KeyMapping): Key;
    getModVersion(modId: string): string;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(modId: string): boolean;
    isOnClient(): boolean;
  }


  class Services {
    static readonly PLATFORM: IPlatformHelper;
    static readonly COMPAT: IPlatformCompatibilityLayer;
    static load<T>(clazz: Class<T>): T;
  }

}

declare module 'de.keksuccino.drippyloadingscreen.platform.services' {
  import { List } from 'java.util';
  import { Key } from 'InputConstants';
  import { KeyMapping } from 'net.minecraft.client';

  class IPlatformCompatibilityLayer {
  }


  class IPlatformHelper {
    get environmentName(): string;
    get loadedModIds(): string[];
    get loaderVersion(): string;
    get platformDisplayName(): string;
    get platformName(): string;
    getKeyMappingKey(var1: KeyMapping): Key;
    getModVersion(var1: string): string;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(var1: string): boolean;
    isOnClient(): boolean;
  }

}