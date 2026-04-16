declare module 'me.flashyreese.mods.reeses_sodium_options.client.gui' {
  import { Dim2i } from 'net.caffeinemc.mods.sodium.client.util';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ScreenPromptable, ScreenPrompt } from 'net.caffeinemc.mods.sodium.client.gui.prompt';
  import { List } from 'java.util';
  import { OptionPage } from 'net.caffeinemc.mods.sodium.client.gui.options';
  import { Builder } from 'me.flashyreese.mods.reeses_sodium_options.client.gui.frame.BasicFrame';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class Dim2iExtended {
    canFitDimension(var1: Dim2i): boolean;
    overlapWith(var1: Dim2i): boolean;
    setHeight(var1: number): void;
    setPoint2i(var1: Point2i): void;
    setWidth(var1: number): void;
    setX(var1: number): void;
    setY(var1: number): void;
  }


  class FlatButtonWidgetExtended {
    get dimensions(): Dim2i;
    isLeftAligned(): boolean;
    setLeftAligned(var1: boolean): void;
  }


  class OptionExtended {
    get dim2i(): Dim2i;
    get parentDimension(): Dim2i;
    get selected(): boolean;
    isHighlight(): boolean;
    set dim2i(var1: Dim2i);
    set parentDimension(var1: Dim2i);
    set selected(var1: boolean);
    setHighlight(var1: boolean): void;
  }


  class Point2i {
    get x(): number;
    get y(): number;
    set x(var1: number);
    set y(var1: number);
  }


  class SliderControlElementExtended {
    isEditMode(): boolean;
    setEditMode(var1: boolean): void;
  }


  interface SodiumVideoOptionsScreen extends ScreenPromptable, Screen {}
  class SodiumVideoOptionsScreen extends ScreenPromptable {
    constructor(prev: Screen, pages: OptionPage[]);
    get dimensions(): Dim2i;
    get prompt(): ScreenPrompt;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    onClose(): void;
    parentBasicFrameBuilder(parentBasicFrameDim: Dim2i, tabFrameDim: Dim2i): Builder;
    rebuildUI(): void;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    set prompt(prompt: ScreenPrompt);
    shouldCloseOnEsc(): boolean;
  }

}

declare module 'me.flashyreese.mods.reeses_sodium_options.client.gui.frame' {
  import { AbstractWidget } from 'net.caffeinemc.mods.sodium.client.gui.widgets';
  import { ContainerEventHandler, GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { Dim2i } from 'net.caffeinemc.mods.sodium.client.util';
  import { GuiGraphics, ComponentPath } from 'net.minecraft.client.gui';
  import { Runnable, Integer } from 'java.lang';
  import { Consumer, Function } from 'java.util.function';
  import { List } from 'java.util';
  import { FocusNavigationEvent, ScreenRectangle } from 'net.minecraft.client.gui.navigation';
  import { ControlElement } from 'net.caffeinemc.mods.sodium.client.gui.options.control';
  import { Builder } from 'me.flashyreese.mods.reeses_sodium_options.client.gui.frame.BasicFrame';
  import { OptionPage } from 'net.caffeinemc.mods.sodium.client.gui.options';
  import { Builder as me_flashyreese_mods_reeses_sodium_options_client_gui_frame_optionpageframe_Builder } from 'me.flashyreese.mods.reeses_sodium_options.client.gui.frame.OptionPageFrame';
  import { AtomicReference } from 'java.util.concurrent.atomic';
  import { Builder as me_flashyreese_mods_reeses_sodium_options_client_gui_frame_scrollableframe_Builder } from 'me.flashyreese.mods.reeses_sodium_options.client.gui.frame.ScrollableFrame';

  interface AbstractFrame extends ContainerEventHandler, AbstractWidget {}
  class AbstractFrame extends ContainerEventHandler {
    constructor(dim: Dim2i, renderOutline: boolean);
    applyScissor(guiGraphics: GuiGraphics, x: number, y: number, width: number, height: number, action: Runnable): void;
    buildFrame(): void;
    children(): GuiEventListener[];
    get controlElements(): ControlElement<any>[];
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


  interface BasicFrame extends AbstractFrame {}
  class BasicFrame extends AbstractFrame {
    constructor(dim: Dim2i, renderOutline: boolean, functions: Function<Dim2i, AbstractWidget>[]);
    buildFrame(): void;
    static builder(): Builder;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }


  interface OptionPageFrame extends AbstractFrame {}
  class OptionPageFrame extends AbstractFrame {
    constructor(dim: Dim2i, renderOutline: boolean, page: OptionPage);
    buildFrame(): void;
    static builder(): me_flashyreese_mods_reeses_sodium_options_client_gui_frame_optionpageframe_Builder;
    nextFocusPath(navigation: FocusNavigationEvent): ComponentPath;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    setupFrame(): void;
  }


  interface ScrollableFrame extends AbstractFrame {}
  class ScrollableFrame extends AbstractFrame {
    constructor(dim: Dim2i, frame: AbstractFrame, renderOutline: boolean, verticalScrollBarOffset: AtomicReference<number>, horizontalScrollBarOffset: AtomicReference<number>);
    buildFrame(): void;
    static builder(): me_flashyreese_mods_reeses_sodium_options_client_gui_frame_scrollableframe_Builder;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, deltaX: number, deltaY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, horizontalAmount: number, verticalAmount: number): boolean;
    nextFocusPath(navigation: FocusNavigationEvent): ComponentPath;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    setupFrame(verticalScrollBarOffset: AtomicReference<number>, horizontalScrollBarOffset: AtomicReference<number>): void;
  }

}

declare module 'me.flashyreese.mods.reeses_sodium_options.client.gui.frame.BasicFrame' {
  import { Dim2i } from 'net.caffeinemc.mods.sodium.client.util';
  import { Function } from 'java.util.function';
  import { AbstractWidget } from 'net.caffeinemc.mods.sodium.client.gui.widgets';
  import { BasicFrame } from 'me.flashyreese.mods.reeses_sodium_options.client.gui.frame';

  class Builder {
    addChild(functionParameter: Function<Dim2i, AbstractWidget>): Builder;
    build(): BasicFrame;
    withDimension(dim: Dim2i): Builder;
    withRenderOutline(renderOutline: boolean): Builder;
  }

}

declare module 'me.flashyreese.mods.reeses_sodium_options.client.gui.frame.components' {
  import { AbstractWidget } from 'net.caffeinemc.mods.sodium.client.gui.widgets';
  import { Dim2i } from 'net.caffeinemc.mods.sodium.client.util';
  import { ScrollDirection } from 'me.flashyreese.mods.reeses_sodium_options.client.gui.frame.components.ScrollBarComponent';
  import { Consumer } from 'java.util.function';
  import { Integer } from 'java.lang';
  import { GuiGraphics, ComponentPath } from 'net.minecraft.client.gui';
  import { ScreenRectangle, FocusNavigationEvent } from 'net.minecraft.client.gui.navigation';
  import { List } from 'java.util';
  import { OptionPage } from 'net.caffeinemc.mods.sodium.client.gui.options';
  import { AtomicReference } from 'java.util.concurrent.atomic';
  import { Component } from 'net.minecraft.network.chat';
  import { SodiumVideoOptionsScreen } from 'me.flashyreese.mods.reeses_sodium_options.client.gui';

  interface ScrollBarComponent extends AbstractWidget {}
  class ScrollBarComponent extends AbstractWidget {
    constructor(trackArea: Dim2i, scrollDirection: ScrollDirection, contentLength: number, visibleAreaLength: number, offsetChangeListener: Consumer<number>);

    constructor(scrollBarArea: Dim2i, scrollDirection: ScrollDirection, contentLength: number, visibleAreaLength: number, offsetChangeListener: Consumer<number>, extraScrollArea: Dim2i);
    get offset(): number;
    get rectangle(): ScreenRectangle;
    isMouseOver(x: number, y: number): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, deltaX: number, deltaY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, horizontalAmount: number, verticalAmount: number): boolean;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    set offset(value: number);
    updateThumbLocation(): void;
  }


  interface SearchTextFieldComponent extends AbstractWidget {}
  class SearchTextFieldComponent extends AbstractWidget {
    constructor(dim: Dim2i, pages: OptionPage[], tabFrameSelectedTab: AtomicReference<Component>, tabFrameScrollBarOffset: AtomicReference<number>, optionPageScrollBarOffset: AtomicReference<number>, tabDimHeight: number, sodiumVideoOptionsScreen: SodiumVideoOptionsScreen, lastSearch: AtomicReference<string>, lastSearchIndex: AtomicReference<number>);
    charTyped(chr: string, modifiers: number): boolean;
    eraseCharacters(characterOffset: number): void;
    eraseWords(wordOffset: number): void;
    get cursor(): number;
    get innerWidth(): number;
    get rectangle(): ScreenRectangle;
    get selectedText(): string;
    getWordSkipPosition(wordOffset: number): number;
    isActive(): boolean;
    isEditable(): boolean;
    isMouseOver(x: number, y: number): boolean;
    isVisible(): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    moveCursor(offset: number): void;
    nextFocusPath(navigation: FocusNavigationEvent): ComponentPath;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    set cursor(cursor: number);
    setCursorToEnd(): void;
    setCursorToStart(): void;
    setFocused(focused: boolean): void;
    setSelectionEnd(index: number): void;
    setSelectionStart(cursor: number): void;
    write(text: string): void;
  }

}

declare module 'me.flashyreese.mods.reeses_sodium_options.client.gui.frame.components.ScrollBarComponent' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ScrollDirection extends Enum<ScrollDirection> {}
  class ScrollDirection extends Enum<ScrollDirection> {
    static readonly HORIZONTAL: ScrollDirection;
    static readonly VERTICAL: ScrollDirection;
    static valueOf(name: string): ScrollDirection;
    static values(): ScrollDirection[];
  }

}

declare module 'me.flashyreese.mods.reeses_sodium_options.client.gui.frame.OptionPageFrame' {
  import { Dim2i } from 'net.caffeinemc.mods.sodium.client.util';
  import { OptionPage } from 'net.caffeinemc.mods.sodium.client.gui.options';
  import { OptionPageFrame } from 'me.flashyreese.mods.reeses_sodium_options.client.gui.frame';

  class Builder {
    build(): OptionPageFrame;
    withDimension(dim: Dim2i): Builder;
    withOptionPage(page: OptionPage): Builder;
    withRenderOutline(renderOutline: boolean): Builder;
  }

}

declare module 'me.flashyreese.mods.reeses_sodium_options.client.gui.frame.ScrollableFrame' {
  import { Dim2i } from 'net.caffeinemc.mods.sodium.client.util';
  import { AtomicReference } from 'java.util.concurrent.atomic';
  import { Integer } from 'java.lang';
  import { AbstractFrame, ScrollableFrame } from 'me.flashyreese.mods.reeses_sodium_options.client.gui.frame';

  class Builder {
    build(): ScrollableFrame;
    withDimension(dim: Dim2i): Builder;
    withFrame(frame: AbstractFrame): Builder;
    withHorizontalScrollBarOffset(horizontalScrollBarOffset: AtomicReference<number>): Builder;
    withRenderOutline(state: boolean): Builder;
    withVerticalScrollBarOffset(verticalScrollBarOffset: AtomicReference<number>): Builder;
  }

}

declare module 'me.flashyreese.mods.reeses_sodium_options.client.gui.frame.tab.Tab' {
  import { Component } from 'net.minecraft.network.chat';
  import { Function } from 'java.util.function';
  import { Dim2i } from 'net.caffeinemc.mods.sodium.client.util';
  import { Tab } from 'me.flashyreese.mods.reeses_sodium_options.client.gui.frame.tab';
  import { ScrollableFrame } from 'me.flashyreese.mods.reeses_sodium_options.client.gui.frame';
  import { OptionPage } from 'net.caffeinemc.mods.sodium.client.gui.options';
  import { AtomicReference } from 'java.util.concurrent.atomic';
  import { Integer } from 'java.lang';

  class Builder<T extends AbstractFrame = any> {
    build(): Tab<T>;
    from(page: OptionPage, verticalScrollBarOffset: AtomicReference<number>): Tab<ScrollableFrame>;
    withFrameFunction(frameFunction: Function<Dim2i, T>): Builder<T>;
    withTitle(title: Component): Builder<T>;
  }

}

declare module 'me.flashyreese.mods.reeses_sodium_options.client.gui.frame.tab' {
  import { AbstractFrame } from 'me.flashyreese.mods.reeses_sodium_options.client.gui.frame';
  import { Dim2i } from 'net.caffeinemc.mods.sodium.client.util';
  import { List, Optional } from 'java.util';
  import { Runnable, Integer } from 'java.lang';
  import { AtomicReference } from 'java.util.concurrent.atomic';
  import { Component } from 'net.minecraft.network.chat';
  import { Builder } from 'me.flashyreese.mods.reeses_sodium_options.client.gui.frame.tab.TabFrame';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface TabFrame extends AbstractFrame {}
  class TabFrame extends AbstractFrame {
    constructor(dim: Dim2i, renderOutline: boolean, tabs: Tab<any>[], onSetTab: Runnable, tabSectionSelectedTab: AtomicReference<Component>, tabSectionScrollBarOffset: AtomicReference<number>);
    buildFrame(): void;
    static createBuilder(): Builder;
    get selectedFrame(): AbstractFrame;
    get selectedTab(): Optional<Tab<any>>;
    get tabs(): Tab<any>[];
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, deltaX: number, deltaY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, horizontalAmount: number, verticalAmount: number): boolean;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    setTab(tab: Optional<Tab<any>>): void;
  }

}

declare module 'me.flashyreese.mods.reeses_sodium_options.client.gui.frame.tab.TabFrame' {
  import { Dim2i } from 'net.caffeinemc.mods.sodium.client.util';
  import { Consumer } from 'java.util.function';
  import { List } from 'java.util';
  import { Tab, TabFrame } from 'me.flashyreese.mods.reeses_sodium_options.client.gui.frame.tab';
  import { Runnable, Integer } from 'java.lang';
  import { AtomicReference } from 'java.util.concurrent.atomic';
  import { Component } from 'net.minecraft.network.chat';

  class Builder {
    addTabs(tabs: Consumer<Tab<any>[]>): Builder;
    build(): TabFrame;
    onSetTab(onSetTab: Runnable): Builder;
    setDimension(dim: Dim2i): Builder;
    setTabSectionScrollBarOffset(tabSectionScrollBarOffset: AtomicReference<number>): Builder;
    setTabSectionSelectedTab(tabSectionSelectedTab: AtomicReference<Component>): Builder;
    shouldRenderOutline(renderOutline: boolean): Builder;
  }

}

declare module 'me.flashyreese.mods.reeses_sodium_options.compat' {
  import { Screen } from 'net.minecraft.client.gui.screens';

  class IrisCompat {
    static get irisShaderPacksScreenLanguageKey(): string;
    static getIrisShaderPacksScreen(parent: Screen): Screen;
    static isIrisPresent(): boolean;
  }

}

declare module 'me.flashyreese.mods.reeses_sodium_options.mixin.sodium' {
  import { AbstractWidget } from 'net.caffeinemc.mods.sodium.client.gui.widgets';
  import { Option } from 'net.caffeinemc.mods.sodium.client.gui.options';
  import { Dim2i } from 'net.caffeinemc.mods.sodium.client.util';
  import { CallbackInfo, CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { ControlElement } from 'net.caffeinemc.mods.sodium.client.gui.options.control';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { Dim2iExtended, Point2i, FlatButtonWidgetExtended, SliderControlElementExtended } from 'me.flashyreese.mods.reeses_sodium_options.client.gui';
  import { Integer, Boolean } from 'java.lang';
  import { Args } from 'org.spongepowered.asm.mixin.injection.invoke.arg';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Rect2i } from 'net.minecraft.client.renderer';

  interface MixinControlElement<T = any> extends AbstractWidget {}
  class MixinControlElement<T = any> extends AbstractWidget {
    drawString(instance: ControlElement<T>, drawContext: GuiGraphics, s: string, x: number, y: number, color: number): void;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    postInit(option: Option<T>, dim: Dim2i, ci: CallbackInfo): void;
    render(dim2i: Dim2i, x: number, y: number): boolean;
    updateNarration(builder: NarrationElementOutput): void;
  }


  interface MixinCyclingControlElement<T extends Enum<T> = any> extends ControlElement<T> {}
  class MixinCyclingControlElement<T extends Enum<T> = any> extends ControlElement<T> {
    constructor(option: Option<T>, dim: Dim2i);
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
  }


  interface MixinDim2i extends Dim2iExtended, Point2i {}
  class MixinDim2i extends Dim2iExtended {
    canFitDimension(anotherDim: Dim2i): boolean;
    containsCursor(x: number, y: number, cir: CallbackInfoReturnable<boolean>): void;
    get limitX(): number;
    get limitY(): number;
    getX(): number;
    getY(): number;
    height(): number;
    overlapWith(other: Dim2i): boolean;
    redirectGetCenterX(cir: CallbackInfoReturnable<number>): void;
    redirectGetCenterY(cir: CallbackInfoReturnable<number>): void;
    redirectGetLimitX(cir: CallbackInfoReturnable<number>): void;
    redirectGetLimitY(cir: CallbackInfoReturnable<number>): void;
    setHeight(height: number): void;
    setPoint2i(point2i: Point2i): void;
    setWidth(width: number): void;
    setX(x: number): void;
    setY(y: number): void;
    width(): number;
    x(): number;
    x(cir: CallbackInfoReturnable<number>): void;
    y(): number;
    y(cir: CallbackInfoReturnable<number>): void;
  }


  interface MixinFlatButtonWidget extends FlatButtonWidgetExtended, AbstractWidget {}
  class MixinFlatButtonWidget extends FlatButtonWidgetExtended {
    get dimensions(): Dim2i;
    isLeftAligned(): boolean;
    redirectDrawRect(args: Args): void;
    redirectDrawString(args: Args): void;
    setLeftAligned(leftAligned: boolean): void;
  }


  interface MixinSliderControlElement extends SliderControlElementExtended, ControlElement<number> {}
  class MixinSliderControlElement extends SliderControlElementExtended {
    constructor(option: Option<number>, dim: Dim2i);
    getThumbPositionForValue(var1: number): number;
    isEditMode(): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, horizontalAmount: number, verticalAmount: number): boolean;
    render(drawContext: GuiGraphics, mouseX: number, mouseY: number, delta: number, ci: CallbackInfo): void;
    rso$renderSlider(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number, ci: CallbackInfo, sliderX: number, sliderY: number, sliderWidth: number, sliderHeight: number, label: MutableComponent, labelWidth: number, drawSlider: boolean, thumbOffset: number, thumbX: number, trackY: number): void;
    setEditMode(editMode: boolean): void;
  }


  interface MixinSodiumOptionsGUI extends Screen {}
  class MixinSodiumOptionsGUI extends Screen {
    postInit(ci: CallbackInfo): void;
  }


  interface MixinTickBoxControlElement extends ControlElement<boolean> {}
  class MixinTickBoxControlElement extends ControlElement<boolean> {
    constructor(option: Option<boolean>, dim: Dim2i);
    rso$renderSliderBoundsGetX(instance: Rect2i): number;
    rso$renderSliderBoundsGetY(instance: Rect2i): number;
  }

}

declare module 'me.flashyreese.mods.reeses_sodium_options.util' {
  import { List, Map } from 'java.util';
  import { Iterable, Character, Integer } from 'java.lang';
  import { Function } from 'java.util.function';

  class StringUtils {
    static boyerMooreSearch(text: string, pattern: string): number;
    static buildBadCharTable(badCharTable: Map<string, number>, pattern: string): void;
    static computeFullShiftTable(shiftTable: number[], suffixArray: number[], pattern: string): void;
    static computeGoodSuffixShiftTable(shiftTable: number[], suffixArray: number[], pattern: string): void;
    static levenshteinDistance(a: string, b: string): number;
    static normalizeText(text: string): string;
    static searchElements<T>(elements: Iterable<T>, query: string, extractSearchableText: Function<T, string>): T[];
  }

}