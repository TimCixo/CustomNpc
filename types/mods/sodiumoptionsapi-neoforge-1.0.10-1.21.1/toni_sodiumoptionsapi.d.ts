declare module 'toni.sodiumoptionsapi.api' {
  import { Builder } from 'OptionGroup';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Void, Class } from 'java.lang';
  import { Event } from 'net.fabricmc.fabric.api.event';
  import { List } from 'java.util';
  import { Option, OptionPage, OptionGroup } from 'net.caffeinemc.mods.sodium.client.gui.options';
  import { Component } from 'net.minecraft.network.chat';

  class ExtendedOptionGroup {
    static createBuilder(id: OptionIdentifier<Void>): Builder;
    static createBuilder(id: ResourceLocation): Builder;
    sodiumOptionsAPI$setId(var1: ResourceLocation): Builder;
    sodiumOptionsAPI$setId(var1: OptionIdentifier<Void>): Builder;
  }


  class OptionGroupConstruction {
    static readonly EVENT: Event;
    onGroupConstruction(var1: OptionIdentifier<Void>, var2: Option<any>[]): void;
  }


  class OptionGUIConstruction {
    static readonly EVENT: Event;
    onGroupConstruction(var1: OptionPage[]): void;
  }


  class OptionIdentifier<T = any> {
    static readonly EMPTY: OptionIdentifier;
    constructor(modId: string, path: string, clz: Class<T>);
    static create(location: ResourceLocation): OptionIdentifier<Void>;
    static create<T>(location: ResourceLocation, clz: Class<T>): OptionIdentifier<T>;
    static create(modId: string, path: string): OptionIdentifier<Void>;
    static create<T>(modId: string, path: string, clz: Class<T>): OptionIdentifier<T>;
    equals(o: any): boolean;
    get modId(): string;
    get path(): string;
    get type(): Class<T>;
    hashCode(): number;
    static isPresent(id: OptionIdentifier<any>): boolean;
    matches(other: OptionIdentifier<any>): boolean;
    matches(other: ResourceLocation): boolean;
    toString(): string;
  }


  class OptionPageConstruction {
    static readonly EVENT: Event;
    onPageConstruction(var1: OptionIdentifier<Void>, var2: Component, var3: OptionGroup[]): void;
  }

}

declare module 'toni.sodiumoptionsapi.gui' {
  import { AbstractWidget, FlatButtonWidget } from 'net.caffeinemc.mods.sodium.client.gui.widgets';
  import { ContainerEventHandler, GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { Dim2i } from 'net.caffeinemc.mods.sodium.client.util';
  import { GuiGraphics, ComponentPath } from 'net.minecraft.client.gui';
  import { Runnable, Integer } from 'java.lang';
  import { Consumer } from 'java.util.function';
  import { List } from 'java.util';
  import { FocusNavigationEvent, ScreenRectangle } from 'net.minecraft.client.gui.navigation';
  import { AtomicReference } from 'java.util.concurrent.atomic';
  import { Builder } from 'toni.sodiumoptionsapi.gui.ScrollableFrame';
  import { Multimap } from 'com.google.common.collect';
  import { Tab } from 'me.flashyreese.mods.reeses_sodium_options.client.gui.frame.tab';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { Builder as toni_sodiumoptionsapi_gui_sodiumoptionstabframe_Builder } from 'toni.sodiumoptionsapi.gui.SodiumOptionsTabFrame';
  import { Style } from 'FlatButtonWidget';
  import { Point2i } from 'me.flashyreese.mods.reeses_sodium_options.client.gui';

  interface AbstractFrame extends ContainerEventHandler, AbstractWidget {}
  class AbstractFrame extends ContainerEventHandler {
    constructor(dim: Dim2i, renderOutline: boolean);
    applyScissor(x: number, y: number, width: number, height: number, action: Runnable): void;
    buildFrame(): void;
    children(): GuiEventListener[];
    get dimensions(): Dim2i;
    get focused(): GuiEventListener;
    get rectangle(): ScreenRectangle;
    isDragging(): boolean;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    nextFocusPath(navigation: FocusNavigationEvent): ComponentPath;
    registerFocusListener(focusListener: Consumer<GuiEventListener>): void;
    render(drawContext: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    set focused(focused: GuiEventListener);
    setDragging(dragging: boolean): void;
  }


  interface ScrollableFrame extends AbstractFrame {}
  class ScrollableFrame extends AbstractFrame {
    constructor(dim: Dim2i, frame: AbstractFrame, renderOutline: boolean, verticalScrollBarOffset: AtomicReference<number>, horizontalScrollBarOffset: AtomicReference<number>);
    buildFrame(): void;
    static createBuilder(): Builder;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, deltaX: number, deltaY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrollX: number, verticalAmount: number): boolean;
    render(drawContext: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    setupFrame(verticalScrollBarOffset: AtomicReference<number>, horizontalScrollBarOffset: AtomicReference<number>): void;
    withHeight(ths: Dim2i, newHeight: number): Dim2i;
    withWidth(ths: Dim2i, newWidth: number): Dim2i;
  }


  interface SodiumOptionsTabFrame extends AbstractFrame {}
  class SodiumOptionsTabFrame extends AbstractFrame {
    constructor(dim: Dim2i, renderOutline: boolean, tabs: Multimap<string, Tab<any>>, onSetTab: Runnable, tabSectionSelectedTab: AtomicReference<Component>, tabSectionScrollBarOffset: AtomicReference<number>);
    buildFrame(): void;
    static createBuilder(): toni_sodiumoptionsapi_gui_sodiumoptionstabframe_Builder;
    static get style(): Style;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, deltaX: number, deltaY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrollX: number, scrollY: number): boolean;
    render(drawContext: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    setHeader(header: string, tab: Tab<any>): void;
    setTab(tab: Tab<any>): void;
    withParentOffset(ths: Dim2i, parent: Point2i): Dim2i;
  }


  interface TabHeaderWidget extends FlatButtonWidget {}
  class TabHeaderWidget extends FlatButtonWidget {
    constructor(dim: Dim2i, modId: string, action: Runnable);
    get style(): Style;
    static getLabel(modId: string, underline: boolean): MutableComponent;
    static getModName(modId: string): string;
    render(drawContext: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }

}

declare module 'toni.sodiumoptionsapi.gui.ScrollableFrame' {
  import { Dim2i } from 'net.caffeinemc.mods.sodium.client.util';
  import { AtomicReference } from 'java.util.concurrent.atomic';
  import { Integer } from 'java.lang';
  import { AbstractFrame, ScrollableFrame } from 'toni.sodiumoptionsapi.gui';

  class Builder {
    build(): ScrollableFrame;
    setDimension(dim: Dim2i): Builder;
    setFrame(frame: AbstractFrame): Builder;
    setHorizontalScrollBarOffset(horizontalScrollBarOffset: AtomicReference<number>): Builder;
    setVerticalScrollBarOffset(verticalScrollBarOffset: AtomicReference<number>): Builder;
    shouldRenderOutline(state: boolean): Builder;
  }

}

declare module 'toni.sodiumoptionsapi.gui.SodiumOptionsTabFrame' {
  import { Dim2i } from 'net.caffeinemc.mods.sodium.client.util';
  import { Consumer } from 'java.util.function';
  import { Multimap } from 'com.google.common.collect';
  import { Tab } from 'me.flashyreese.mods.reeses_sodium_options.client.gui.frame.tab';
  import { Runnable, Integer } from 'java.lang';
  import { AtomicReference } from 'java.util.concurrent.atomic';
  import { Component } from 'net.minecraft.network.chat';
  import { SodiumOptionsTabFrame, AbstractFrame } from 'toni.sodiumoptionsapi.gui';

  class Builder {
    addTabs(tabs: Consumer<Multimap<string, Tab<any>>>): Builder;
    build(): SodiumOptionsTabFrame;
    onSetTab(onSetTab: Runnable): Builder;
    setDimension(dim: Dim2i): Builder;
    setTabSectionScrollBarOffset(tabSectionScrollBarOffset: AtomicReference<number>): Builder;
    setTabSectionSelectedTab(tabSectionSelectedTab: AtomicReference<Component>): Builder;
    shouldRenderOutline(renderOutline: boolean): Builder;
  }


  interface TabSidebarFrame extends AbstractFrame {}
  class TabSidebarFrame extends AbstractFrame {
    buildFrame(): void;
  }

}

declare module 'toni.sodiumoptionsapi.mixin.sodium' {
  import { Dim2i } from 'net.caffeinemc.mods.sodium.client.util';
  import { ILeftAlignOffsetAccessor, IOptionGroupIdAccessor } from 'toni.sodiumoptionsapi.util';
  import { Args } from 'org.spongepowered.asm.mixin.injection.invoke.arg';
  import { CallbackInfo, CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { ExtendedOptionGroup, OptionIdentifier } from 'toni.sodiumoptionsapi.api';
  import { Builder } from 'OptionGroup';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Void } from 'java.lang';
  import { OptionGroup } from 'net.caffeinemc.mods.sodium.client.gui.options';
  import { Component } from 'net.minecraft.network.chat';
  import { ImmutableList } from 'com.google.common.collect';

  class FlatButtonWidgetAccessor {
    get dim(): Dim2i;
  }


  interface FlatButtonWidgetOffsetMixin extends ILeftAlignOffsetAccessor {}
  class FlatButtonWidgetOffsetMixin extends ILeftAlignOffsetAccessor {
    redirectDrawString(args: Args, ci: CallbackInfo): void;
    sodiumOptionsAPI$setLeftAlignOffset(leftAlignOffset: number): void;
  }


  interface OptionGroupBuilderMixin extends ExtendedOptionGroup {}
  class OptionGroupBuilderMixin extends ExtendedOptionGroup {
    onBuild(cir: CallbackInfoReturnable<OptionGroup>): void;
    sodiumOptionsAPI$setId(id: ResourceLocation): Builder;
    sodiumOptionsAPI$setId(id: OptionIdentifier<Void>): Builder;
  }


  interface OptionGroupMixin extends IOptionGroupIdAccessor {}
  class OptionGroupMixin extends IOptionGroupIdAccessor {
    sodiumOptionsAPI$id: OptionIdentifier;
    sodiumOptionsAPI$getId(): OptionIdentifier<Void>;
    sodiumOptionsAPI$setId(id: OptionIdentifier<Void>): void;
    sodiumOptionsAPI$setId(id: ResourceLocation): void;
  }


  interface OptionPageMixin extends IOptionGroupIdAccessor {}
  class OptionPageMixin extends IOptionGroupIdAccessor {
    onInit(name: Component, groups: ImmutableList<OptionGroup>, ci: CallbackInfo): void;
    sodiumOptionsAPI$getId(): OptionIdentifier<Void>;
    sodiumOptionsAPI$setId(id: OptionIdentifier<Void>): void;
    sodiumOptionsAPI$setId(id: ResourceLocation): void;
  }


  class ReesesVideoOptionsScreenMixin {
  }


  class SodiumOptionsGuiMixin {
  }

}

declare module 'toni.sodiumoptionsapi' {
  import { Logger } from 'org.apache.logging.log4j';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';
  import { FMLCommonSetupEvent, FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';

  class SodiumOptionsAPI {
    static readonly MODNAME: string;
    static readonly ID: string;
    static readonly LOGGER: Logger;
    constructor(modEventBus: IEventBus, modContainer: ModContainer);
    clientSetup(event: FMLClientSetupEvent): void;
    commonSetup(event: FMLCommonSetupEvent): void;
    onInitialize(): void;
    onInitializeClient(): void;
  }

}

declare module 'toni.sodiumoptionsapi.util' {
  import { OptionIdentifier } from 'toni.sodiumoptionsapi.api';
  import { Void } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';

  class ILeftAlignOffsetAccessor {
    sodiumOptionsAPI$setLeftAlignOffset(var1: number): void;
  }


  class IOptionGroupIdAccessor {
    sodiumOptionsAPI$getId(): OptionIdentifier<Void>;
    sodiumOptionsAPI$setId(var1: OptionIdentifier<Void>): void;
    sodiumOptionsAPI$setId(var1: ResourceLocation): void;
  }


  class OptionIdGenerator {
    static generateId<T>(path: string): OptionIdentifier<T>;
  }


  class PlatformUtil {
    static modPresent(modid: string): boolean;
  }

}