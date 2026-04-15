declare module 'betteradvancements.common.advancements' {
  import { IBetterDisplayInfo } from 'betteradvancements.common.api';
  import { AdvancementHolder, AdvancementNode } from 'net.minecraft.advancements';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { JsonObject } from 'com.google.gson';
  import { Boolean, Integer } from 'java.lang';
  import { AdvancementWidgetType } from 'net.minecraft.client.gui.screens.advancements';

  interface BetterDisplayInfo extends IBetterDisplayInfo {}
  class BetterDisplayInfo extends IBetterDisplayInfo {
    static readonly defaultMinecraftCompletedIconColor: string;
    static readonly defaultMinecraftUncompletedIconColor: string;
    static readonly defaultMinecraftCompletedTitleColor: string;
    static readonly defaultMinecraftUncompletedTitleColor: string;
    static defaultCompletedIconColor: number;
    static defaultUncompletedIconColor: number;
    static defaultCompletedTitleColor: number;
    static defaultUncompletedTitleColor: number;
    static defaultDrawDirectLines: boolean;
    static defaultCompletedLineColor: number;
    static defaultUncompletedLineColor: number;
    static defaultHideLines: boolean;
    constructor(advancementHolder: AdvancementHolder);

    constructor(id: ResourceLocation);

    constructor(id: ResourceLocation, displayJson: JsonObject);
    allowDragging(): boolean;
    defaultIconColor(): number;
    drawDirectLines(): boolean;
    get completedIconColor(): number;
    get completedLineColor(): number;
    get completedTitleColor(): number;
    get id(): ResourceLocation;
    get posX(): number;
    get posY(): number;
    get unCompletedIconColor(): number;
    get unCompletedLineColor(): number;
    get unCompletedTitleColor(): number;
    getIconColor(state: AdvancementWidgetType): number;
    getIconYMultiplier(state: AdvancementWidgetType): number;
    getTitleColor(state: AdvancementWidgetType): number;
    getTitleYMultiplier(state: AdvancementWidgetType): number;
    hasCustomIconColor(): boolean;
    hasCustomTitleColor(): boolean;
    hideLines(): boolean;
  }


  class BetterDisplayInfoRegistry {
    constructor(advancementNode: AdvancementNode);
    get(advancementHolder: AdvancementHolder): BetterDisplayInfo;
  }

}

declare module 'betteradvancements.common.api.event' {
  import { class_8781, class_8779 } from 'net.minecraft';
  import { List } from 'java.util';

  class IAdvancementDrawConnectionsEvent {
    get advancement(): class_8781;
    get extraConnections(): class_8779[];
  }


  class IAdvancementMovedEvent {
    get advancement(): class_8781;
    get x(): number;
    get y(): number;
  }

}

declare module 'betteradvancements.common.api' {
  import { class_8781 } from 'net.minecraft';
  import { Boolean, Integer } from 'java.lang';

  class IBetterAdvancementEntryGui {
    get advancement(): class_8781;
    get x(): number;
    get y(): number;
  }


  class IBetterDisplayInfo {
    allowDragging(): boolean;
    drawDirectLines(): boolean;
    get completedIconColor(): number;
    get completedLineColor(): number;
    get completedTitleColor(): number;
    get posX(): number;
    get posY(): number;
    get unCompletedIconColor(): number;
    get unCompletedLineColor(): number;
    get unCompletedTitleColor(): number;
    hideLines(): boolean;
  }

}

declare module 'betteradvancements.common.gui' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Listener } from 'ClientAdvancements';
  import { ClientAdvancements } from 'net.minecraft.client.multiplayer';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { AdvancementNode, AdvancementProgress, AdvancementHolder, DisplayInfo } from 'net.minecraft.advancements';
  import { AbstractButton } from 'net.minecraft.client.gui.components';
  import { Component } from 'net.minecraft.network.chat';
  import { Map, List } from 'java.util';
  import { Minecraft } from 'net.minecraft.client';
  import { BetterDisplayInfo } from 'betteradvancements.common.advancements';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IBetterAdvancementEntryGui } from 'betteradvancements.common.api';

  interface BetterAdvancementsScreen extends Listener, Screen {}
  class BetterAdvancementsScreen extends Listener {
    static uiScaling: number;
    static showDebugCoordinates: boolean;
    static orderTabsAlphabetically: boolean;
    constructor(clientAdvancements: ClientAdvancements);
    getAdvancementWidget(advancement: AdvancementNode): BetterAdvancementWidget;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, modifiers: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, mouseDeltaX: number, mouseDeltaY: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrollX: number, scrollY: number): boolean;
    onAddAdvancementRoot(advancement: AdvancementNode): void;
    onAddAdvancementTask(advancement: AdvancementNode): void;
    onAdvancementsCleared(): void;
    onClose(): void;
    onRemoveAdvancementRoot(advancement: AdvancementNode): void;
    onRemoveAdvancementTask(advancement: AdvancementNode): void;
    onSelectedTabChanged(advancement: AdvancementHolder): void;
    onUpdateAdvancementProgress(advancement: AdvancementNode, advancementProgress: AdvancementProgress): void;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    renderWindow(guiGraphics: GuiGraphics, left: number, top: number, right: number, bottom: number, maxTabs: number, skip: number): void;
  }


  interface BetterAdvancementsScreenButton extends AbstractButton {}
  class BetterAdvancementsScreenButton extends AbstractButton {
    static addToInventory: boolean;
    constructor(x: number, y: number, buttonText: Component);
    onPress(): void;
    renderWidget(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  class BetterAdvancementTab {
    static doFade: boolean;
    static readonly scrollHistory: Map;
    constructor(mc: Minecraft, betterAdvancementsScreen: BetterAdvancementsScreen, type: BetterAdvancementTabType, index: number, advancementNode: AdvancementNode, displayInfo: DisplayInfo);
    addAdvancement(advancementNode: AdvancementNode): void;
    static create(mc: Minecraft, betterAdvancementsScreen: BetterAdvancementsScreen, index: number, advancementNode: AdvancementNode, width: number, height: number): BetterAdvancementTab;
    drawContents(guiGraphics: GuiGraphics, left: number, top: number, width: number, height: number): void;
    drawIcon(guiGraphics: GuiGraphics, left: number, top: number, width: number, height: number): void;
    drawTab(guiGraphics: GuiGraphics, left: number, top: number, width: number, height: number, selected: boolean): void;
    drawToolTips(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, left: number, top: number, width: number, height: number): void;
    get rootNode(): AdvancementNode;
    get screen(): BetterAdvancementsScreen;
    get title(): Component;
    getBetterDisplayInfo(advancementNode: AdvancementNode): BetterDisplayInfo;
    getWidget(advancementHolder: AdvancementHolder): BetterAdvancementWidget;
    isMouseOver(left: number, top: number, width: number, height: number, mouseX: number, mouseY: number): boolean;
    loadScroll(): void;
    scroll(scrollX: number, scrollY: number, width: number, height: number): void;
    storeScroll(): void;
  }


  class BetterAdvancementTabType {
    static readonly ABOVE: BetterAdvancementTabType;
    static readonly BELOW: BetterAdvancementTabType;
    static readonly LEFT: BetterAdvancementTabType;
    static readonly RIGHT: BetterAdvancementTabType;
    static readonly ALL: List;
    static onlyUseAbove: boolean;
    draw(guiGraphics: GuiGraphics, x: number, y: number, width: number, height: number, selected: boolean, index: number): void;
    drawIcon(guiGraphics: GuiGraphics, left: number, top: number, width: number, height: number, index: number, stack: ItemStack): void;
    static getMaxTabs(width: number, height: number): number;
    static getTabType(width: number, height: number, index: number): BetterAdvancementTabType;
    getX(index: number, width: number, height: number): number;
    getY(index: number, width: number, height: number): number;
    isMouseOver(left: number, top: number, width: number, height: number, index: number, mouseX: number, mouseY: number): boolean;
  }


  interface BetterAdvancementWidget extends IBetterAdvancementEntryGui {}
  class BetterAdvancementWidget extends IBetterAdvancementEntryGui {
    constructor(betterAdvancementTabGui: BetterAdvancementTab, mc: Minecraft, advancementNode: AdvancementNode, displayInfo: DisplayInfo);
    addGuiAdvancement(betterAdvancementEntryScreen: BetterAdvancementWidget): void;
    attachToParent(): void;
    draw(guiGraphics: GuiGraphics, scrollX: number, scrollY: number): void;
    drawConnection(guiGraphics: GuiGraphics, parent: BetterAdvancementWidget, scrollX: number, scrollY: number, drawInside: boolean): void;
    drawConnectivity(guiGraphics: GuiGraphics, scrollX: number, scrollY: number, drawInside: boolean): void;
    drawHover(guiGraphics: GuiGraphics, scrollX: number, scrollY: number, fade: number, left: number, top: number): void;
    get advancement(): AdvancementNode;
    get x(): number;
    get y(): number;
    getAdvancementProgress(advancementProgressIn: AdvancementProgress): void;
    isMouseOver(scrollX: number, scrollY: number, mouseX: number, mouseY: number): boolean;
  }

}

declare module 'betteradvancements.common.platform' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { Function, BiFunction } from 'java.util.function';
  import { Path } from 'java.nio.file';
  import { Boolean, Class } from 'java.lang';
  import { IAdvancementMovedEvent, IAdvancementDrawConnectionsEvent } from 'betteradvancements.common.api.event';
  import { IBetterAdvancementEntryGui } from 'betteradvancements.common.api';
  import { AdvancementNode } from 'net.minecraft.advancements';

  class IAdvancementVisitor {
    findAdvancements(var1: ResourceLocation, var2: ServerLevel, var3: Function<Path, boolean>, var4: BiFunction<Path, Path, boolean>, var5: boolean, var6: boolean): boolean;
  }


  class IEventHelper {
    postAdvancementDrawConnectionsEvent(var1: AdvancementNode): IAdvancementDrawConnectionsEvent;
    postAdvancementMovementEvent(var1: IBetterAdvancementEntryGui): IAdvancementMovedEvent;
  }


  class IPlatformHelper {
    get advancementVisitor(): IAdvancementVisitor;
    get eventHelper(): IEventHelper;
    get platformName(): string;
  }


  class Services {
    static readonly PLATFORM: IPlatformHelper;
    static load<T>(serviceClass: Class<T>): T;
  }

}

declare module 'betteradvancements.common.reference' {
  import { Logger } from 'org.apache.logging.log4j';

  class Constants {
    static readonly ID: string;
    static readonly log: Logger;
  }


  class Resources {
  }


  class Textures {
  }

}

declare module 'betteradvancements.common.reference.Resources' {
  import { ResourceLocation } from 'net.minecraft.resources';

  class Gui {
    static readonly WINDOW: ResourceLocation;
    static readonly TABS: ResourceLocation;
    static readonly WIDGETS: ResourceLocation;
  }

}

declare module 'betteradvancements.common.reference.Textures' {
  class Gui {
    static readonly WINDOW: string;
    static readonly TABS: string;
    static readonly WIDGETS: string;
  }

}

declare module 'betteradvancements.common.util' {
  import { Comparator, List } from 'java.util';
  import { AdvancementNode, AdvancementHolder, Advancement, AdvancementProgress } from 'net.minecraft.advancements';
  import { Enum } from 'java.lang';
  import { Component } from 'net.minecraft.network.chat';
  import { Font, GuiGraphics } from 'net.minecraft.client.gui';
  import { ResourceLocation } from 'net.minecraft.resources';

  class AdvancementComparer {
    static sortByTitle(): Comparator<AdvancementNode>;
  }


  class ColorHelper {
    static RGB(r: number, g: number, b: number): number;
    static RGB(red: number, green: number, blue: number): number;
    static RGB(red: number, green: number, blue: number, alpha: number): number;
    static RGB(colour: string): number;
    static RGBA(r: number, g: number, b: number, a: number): number;
    static asRGBString(colour: number): string;
  }


  interface CriteriaDetail extends Enum<CriteriaDetail> {}
  class CriteriaDetail extends Enum<CriteriaDetail> {
    static readonly OFF: CriteriaDetail;
    static readonly DEFAULT: CriteriaDetail;
    static readonly SPOILER: CriteriaDetail;
    static readonly ALL: CriteriaDetail;
    static comments(): string;
    static fromName(value: string): CriteriaDetail;
    get name(): string;
    static names(): string[];
    showObtained(): boolean;
    showUnobtained(): boolean;
    static valueOf(name: string): CriteriaDetail;
    static values(): CriteriaDetail[];
    static valuesAsList(): CriteriaDetail[];
  }


  class CriterionGrid {
    static detailLevel: CriteriaDetail;
    static requiresShift: boolean;
    readonly numRows: number;
    columns: List;
    width: number;
    height: number;
    constructor(cellContents: Component[], cellWidths: number[], fontHeight: number, numColumns: number);
    static findOptimalCriterionGrid(holder: AdvancementHolder, advancement: Advancement, progress: AdvancementProgress, maxWidth: number, font: Font): CriterionGrid;
    init(): void;
  }


  class RenderUtil {
    static drawRect(x: number, y: number, x2: number, y2: number, width: number, color: number): void;
    static renderRepeating(texture: ResourceLocation, guiGraphics: GuiGraphics, x: number, y: number, width: number, height: number, textureX: number, textureY: number, textureWidth: number, textureHeight: number): void;
    static setColor(color: number): void;
  }

}