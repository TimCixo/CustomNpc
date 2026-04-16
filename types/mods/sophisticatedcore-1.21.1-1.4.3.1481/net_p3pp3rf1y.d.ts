declare module 'net.p3pp3rf1y.sophisticatedcore.api' {
  import { Optional, UUID } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Level } from 'net.minecraft.world.level';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { Runnable, Integer } from 'java.lang';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { RandomSource } from 'net.minecraft.util';
  import { FilterLogic, UpgradeHandler } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { IItemHandler } from 'net.neoforged.neoforge.items';
  import { TooltipComponent } from 'net.minecraft.world.inventory.tooltip';
  import { StashResult } from 'net.p3pp3rf1y.sophisticatedcore.api.IStashStorageItem';
  import { Provider } from 'HolderLookup';
  import { IFluidHandlerItem } from 'net.neoforged.neoforge.fluids.capability';
  import { TagKey } from 'net.minecraft.tags';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { FluidAction } from 'IFluidHandler';
  import { FluidStack } from 'net.neoforged.neoforge.fluids';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ITintable } from 'net.p3pp3rf1y.sophisticatedcore.util';
  import { ITrackedContentsItemHandler, InventoryHandler } from 'net.p3pp3rf1y.sophisticatedcore.inventory';
  import { SettingsHandler } from 'net.p3pp3rf1y.sophisticatedcore.settings';
  import { SortBy } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { Player } from 'net.minecraft.world.entity.player';
  import { RenderInfo } from 'net.p3pp3rf1y.sophisticatedcore.renderdata';
  import { IEnergyStorage } from 'net.neoforged.neoforge.energy';
  import { Component } from 'net.minecraft.network.chat';
  import { UnaryOperator } from 'java.util.function';
  import { Vector3f } from 'org.joml';

  class IDiscHandler<I = any> {
    get musicDiscSize(): number;
    getMusicLengthInTicks(var1: ItemStack, var2: Level): Optional<number>;
    getRandomDisc(var1: RandomSource): Optional<ItemStack>;
    getSongInfo(var1: ItemStack, var2: Level): Optional<I>;
    playDisc(var1: ServerLevel, var2: BlockPos, var3: UUID, var4: ItemStack, var5: Runnable): void;
    playDisc(var1: ServerLevel, var2: Vec3, var3: UUID, var4: ItemStack, var5: number, var6: Runnable): void;
    supports(var1: ItemStack): boolean;
  }


  class IIOFilterUpgrade {
    get inputFilter(): Optional<FilterLogic>;
    get outputFilter(): Optional<FilterLogic>;
  }


  class ISlotChangeResponseUpgrade {
    onSlotChange(var1: IItemHandler, var2: number): void;
  }


  class IStashStorageItem {
    getInventoryTooltip(var1: ItemStack): Optional<TooltipComponent>;
    getItemStashable(var1: Provider, var2: ItemStack, var3: ItemStack): StashResult;
  }


  interface IStorageFluidHandler extends IFluidHandlerItem {}
  class IStorageFluidHandler extends IFluidHandlerItem {
    drain(var1: TagKey<Fluid>, var2: number, var3: FluidAction, var4: boolean): FluidStack;
    drain(var1: FluidStack, var2: FluidAction, var3: boolean): FluidStack;
    drain(var1: number, var2: FluidAction, var3: boolean): FluidStack;
    fill(fluidTag: TagKey<Fluid>, maxFill: number, fallbackFluid: Fluid, action: FluidAction): number;
    fill(fluidTag: TagKey<Fluid>, maxFill: number, fallbackFluid: Fluid, action: FluidAction, ignoreInOutLimit: boolean): number;
    fill(var1: FluidStack, var2: FluidAction, var3: boolean): number;
  }


  class IStorageSavedData {
    get contents(): CompoundTag;
    markChanged(): void;
    set contents(var1: CompoundTag);
  }


  interface IStorageWrapper extends ITintable {}
  class IStorageWrapper extends ITintable {
    static readonly SETTINGS_TAG: string;
    fillWithLoot(var1: Player): void;
    get baseStackSizeMultiplier(): number;
    get columnsTaken(): number;
    get contentsUuid(): Optional<UUID>;
    get displayName(): Component;
    get energyStorage(): Optional<IEnergyStorage>;
    get fluidHandler(): Optional<IStorageFluidHandler>;
    get inventoryForInputOutput(): ITrackedContentsItemHandler;
    get inventoryForUpgradeProcessing(): ITrackedContentsItemHandler;
    get inventoryHandler(): InventoryHandler;
    get numberOfSlotRows(): number;
    get openTabId(): Optional<number>;
    get renderInfo(): RenderInfo;
    get settingsHandler(): SettingsHandler;
    get sortBy(): SortBy;
    get storageType(): string;
    get upgradeHandler(): UpgradeHandler;
    get wrappedStorageStack(): ItemStack;
    isUpgradeRunnable(upgrade: ItemStack): boolean;
    onContentsNbtUpdated(): void;
    onInit(): void;
    refreshInventoryForInputOutput(): void;
    refreshInventoryForUpgradeProcessing(): void;
    registerOnInventoryInputOutputHandlerRefreshListener(onInventoryForInputOutputHandlerRefresh: Runnable): void;
    removeOpenTabId(): void;
    set openTabId(var1: number);
    set sortBy(var1: SortBy);
    setColumnsTaken(var1: number, var2: boolean): void;
    setContentsChangeHandler(var1: Runnable): void;
    setInventorySlotChangeHandler(slotChangeHandler: Runnable): void;
    setPersistent(var1: boolean): void;
    setUpgradeCachesInvalidatedHandler(handler: Runnable): void;
    sort(): void;
  }


  class IUpgradeRenderer<T extends IUpgradeRenderData = any> {
    render(var1: Level, var2: RandomSource, var3: UnaryOperator<Vector3f>, var4: T): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.api.IStashStorageItem' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface StashResult extends Enum<StashResult> {}
  class StashResult extends Enum<StashResult> {
    static readonly MATCH_AND_SPACE: StashResult;
    static readonly SPACE: StashResult;
    static readonly NO_SPACE: StashResult;
    static valueOf(name: string): StashResult;
    static values(): StashResult[];
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.client' {
  import { KeyMapping } from 'net.minecraft.client';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { Pre } from 'ScreenEvent.KeyPressed';
  import { Pre as screenevent_mousebuttonpressed_Pre } from 'ScreenEvent.MouseButtonPressed';
  import { ResourceLocation } from 'net.minecraft.resources';

  class ClientEventHandler {
    static readonly SORT_KEYBIND: KeyMapping;
    get flowingTexture(): ResourceLocation;
    get stillTexture(): ResourceLocation;
    static handleGuiKeyPress(event: Pre): void;
    static handleGuiMouseKeyPress(event: screenevent_mousebuttonpressed_Pre): void;
    static registerHandlers(modBus: IEventBus): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls' {
  import { Position, Dimension, TextureBlitData } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { IntConsumer, Supplier, Consumer } from 'java.util.function';
  import { NarrationElementOutput, NarratableEntry } from 'net.minecraft.client.gui.narration';
  import { List, Map, Optional } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Toggle } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls.ButtonDefinition';
  import { Boolean, Comparable, Integer, Float } from 'java.lang';
  import { StateData } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls.ToggleButton';
  import { Minecraft } from 'net.minecraft.client';
  import { ContainerEventHandler, GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { ScrollPanel } from 'net.neoforged.neoforge.client.gui.widget';
  import { IInventoryScreen } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls.InventoryScrollPanel';
  import { Slot } from 'net.minecraft.world.inventory';
  import { NarrationPriority } from 'NarratableEntry';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ProgressDirection } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls.ProgressBar';
  import { Renderable } from 'net.minecraft.client.gui.components';

  interface Button extends ButtonBase {}
  class Button extends ButtonBase {
    constructor(position: Position, buttonDefinition: ButtonDefinition, onClick: IntConsumer);
    isHovered(): boolean;
    renderTooltip(screen: Screen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    setTooltip(tooltip: Component[]): void;
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
  }


  interface ButtonBase extends WidgetBase {}
  class ButtonBase extends WidgetBase {
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
  }


  class ButtonDefinition {
    constructor(dimension: Dimension, backgroundTexture: TextureBlitData, hoveredBackgroundTexture: TextureBlitData);

    constructor(dimension: Dimension, backgroundTexture: TextureBlitData, hoveredBackgroundTexture: TextureBlitData, foregroundTexture: TextureBlitData, ...tooltip: Component[]);
    get backgroundTexture(): TextureBlitData;
    get dimension(): Dimension;
    get foregroundTexture(): TextureBlitData;
    get hoveredBackgroundTexture(): TextureBlitData;
    get tooltip(): Component[];
  }


  class ButtonDefinitions {
    static readonly ALLOW_LIST: Toggle;
    static readonly MATCH_DURABILITY: Toggle;
    static readonly MATCH_NBT: Toggle;
    static readonly PRIMARY_MATCH: Toggle;
    static readonly SORT_BY: Toggle;
    static readonly TRANSFER_TO_STORAGE: ButtonDefinition;
    static readonly TRANSFER_TO_STORAGE_FILTERED: ButtonDefinition;
    static readonly TRANSFER_TO_INVENTORY: ButtonDefinition;
    static readonly TRANSFER_TO_INVENTORY_FILTERED: ButtonDefinition;
    static readonly SORT: ButtonDefinition;
    static readonly UPGRADE_SWITCH: Toggle;
    static readonly UPGRADE_SWITCH_INACTIVE: ButtonDefinition;
    static readonly WORK_IN_GUI: Toggle;
    static readonly MATCH_ANY_TAG: Toggle;
    static readonly ADD_TAG: ButtonDefinition;
    static readonly REMOVE_TAG: ButtonDefinition;
    static readonly CONFIRM: ButtonDefinition;
    static readonly CANCEL: ButtonDefinition;
    static readonly TRANSPARENT: ButtonDefinition;
    static createSmallToggleButtonDefinition<T extends Comparable<T>>(stateData: Map<T, StateData>): Toggle<T>;
    static createToggleButtonDefinition<T extends Comparable<T>>(stateData: Map<T, StateData>): Toggle<T>;
    static getBooleanStateData(onStateData: StateData, offStateData: StateData): Map<boolean, StateData>;
  }


  interface ColorButton extends ButtonBase {}
  class ColorButton extends ButtonBase {
    constructor(position: Position, dimension: Dimension, colorGetter: Supplier<number>, onClick: IntConsumer, tooltip: Component);
    renderTooltip(screen: Screen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
  }


  interface ColorPicker extends CompositeWidgetBase<WidgetBase> {}
  class ColorPicker extends CompositeWidgetBase<WidgetBase> {
    static readonly COLOR_GRADIENT_WIDTH: number;
    static readonly RAINBOW_SLIDER_WIDTH: number;
    static readonly COLOR_ENTRY_WIDTH: number;
    static readonly COLOR_GRADIENT_HEIGHT: number;
    static readonly DIMENSIONS: Dimension;
    constructor(screen: Screen, position: Position, color: number, colorSetter: IntConsumer);
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    renderBg(guiGraphics: GuiGraphics, minecraft: Minecraft, mouseX: number, mouseY: number): void;
    setPosition(position: Position): void;
  }


  interface CompositeWidgetBase<T extends WidgetBase = any> extends ContainerEventHandler, WidgetBase {}
  class CompositeWidgetBase<T extends WidgetBase = any> extends ContainerEventHandler {
    children(): GuiEventListener[];
    get focused(): GuiEventListener;
    isDragging(): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean;
    renderTooltip(screen: Screen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    set focused(listener: GuiEventListener);
    setDragging(dragging: boolean): void;
    setFocused(focused: boolean): void;
  }


  interface ImageButton extends ButtonBase {}
  class ImageButton extends ButtonBase {
    constructor(position: Position, dimension: Dimension, texture: TextureBlitData, onClick: IntConsumer);
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
  }


  interface InventoryScrollPanel extends ScrollPanel {}
  class InventoryScrollPanel extends ScrollPanel {
    constructor(client: Minecraft, screen: IInventoryScreen, firstSlotIndex: number, numberOfSlots: number, slotsInARow: number, height: number, top: number, left: number);
    findSlot(mouseX: number, mouseY: number): Optional<Slot>;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, deltaX: number, deltaY: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrollX: number, scrollY: number): boolean;
    narrationPriority(): NarrationPriority;
    resetScrollDistance(): void;
    static setRestrictScrollToScrollbar(restrictScrollToScrollbar: boolean): void;
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
    updateSlotsPosition(): void;
  }


  interface ItemButton extends ButtonBase {}
  class ItemButton extends ButtonBase {
    constructor(position: Position, onClick: IntConsumer, stack: ItemStack, narration: Component);
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
  }


  interface Label extends WidgetBase {}
  class Label extends WidgetBase {
    constructor(position: Position, labelText: Component);

    constructor(position: Position, labelText: Component, color: number);
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
  }


  interface ProgressBar extends WidgetBase {}
  class ProgressBar extends WidgetBase {
    constructor(position: Position, progressTexture: TextureBlitData, getProgress: Supplier<number>, dir: ProgressDirection);
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
  }


  interface TextBox extends WidgetBase {}
  class TextBox extends WidgetBase {
    constructor(position: Position, dimension: Dimension);
    charTyped(codePoint: string, modifiers: number): boolean;
    get value(): string;
    isEditable(): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    set value(value: string);
    setBordered(bordered: boolean): void;
    setEditable(editable: boolean): void;
    setFocused(focused: boolean): void;
    setMaxLength(maxLength: number): void;
    setPosition(position: Position): void;
    setResponder(responder: Consumer<string>): void;
    setTextColor(color: number): void;
    setTextColorUneditable(color: number): void;
    setUnfocusedEmptyHint(hint: string): void;
    setValueWithoutNotification(value: string): void;
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
  }


  interface ToggleButton<T extends Comparable<T> = any> extends Button {}
  class ToggleButton<T extends Comparable<T> = any> extends Button {
    constructor(position: Position, buttonDefinition: Toggle<T>, onClick: IntConsumer, getState: Supplier<T>);
    renderTooltip(screen: Screen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
  }


  interface WidgetBase extends Renderable, GuiEventListener, NarratableEntry {}
  class WidgetBase extends Renderable {
    get height(): number;
    get width(): number;
    get x(): number;
    get y(): number;
    isFocused(): boolean;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    narrationPriority(): NarrationPriority;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    renderTooltip(screen: Screen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    setFocused(focused: boolean): void;
    setPosition(position: Position): void;
    setVisible(visible: boolean): void;
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls.ButtonDefinition' {
  import { ButtonDefinition } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls';
  import { Dimension, TextureBlitData } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { Map } from 'java.util';
  import { StateData } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls.ToggleButton';

  interface Toggle<T extends Comparable<T> = any> extends ButtonDefinition {}
  class Toggle<T extends Comparable<T> = any> extends ButtonDefinition {
    constructor(dimension: Dimension, backgroundTexture: TextureBlitData, stateData: Map<T, StateData>, hoveredBackgroundTexture: TextureBlitData);
    get stateData(): Map<T, StateData>;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls.InventoryScrollPanel' {
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Slot } from 'net.minecraft.world.inventory';
  import { Predicate } from 'java.util.function';
  import { ItemStack } from 'net.minecraft.world.item';

  class IInventoryScreen {
    drawSlotBg(var1: GuiGraphics, var2: number): void;
    get leftX(): number;
    get stackFilter(): Predicate<ItemStack>;
    get topY(): number;
    get visibleSlotsCount(): number;
    getSlot(var1: number): Slot;
    isMouseOverSlot(var1: Slot, var2: number, var4: number): boolean;
    renderInventorySlots(var1: GuiGraphics, var2: number, var3: number, var4: boolean): void;
    set visibleSlotsCount(visibleSlotsCount: number);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls.ProgressBar' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ProgressDirection extends Enum<ProgressDirection> {}
  class ProgressDirection extends Enum<ProgressDirection> {
    static readonly LEFT_RIGHT: ProgressDirection;
    static readonly BOTTOM_UP: ProgressDirection;
    static valueOf(name: string): ProgressDirection;
    static values(): ProgressDirection[];
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls.ToggleButton' {
  import { TextureBlitData } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  class StateData {
    constructor(texture: TextureBlitData, tooltip: Component[]);

    constructor(texture: TextureBlitData, ...tooltip: Component[]);
    get texture(): TextureBlitData;
    get tooltip(): Component[];
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.client.gui' {
  import { AbstractButton } from 'net.minecraft.client.gui.components';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Slot } from 'net.minecraft.world.inventory';
  import { TextBox, CompositeWidgetBase, WidgetBase, ButtonDefinition } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls';
  import { Position, Dimension } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { SettingsContainerMenu, UpgradeContainerType, UpgradeContainerBase } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { IInventoryScreen } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls.InventoryScrollPanel';
  import { Predicate, BooleanSupplier, IntConsumer } from 'java.util.function';
  import { Minecraft } from 'net.minecraft.client';
  import { StorageSettingsTabControlBase } from 'net.p3pp3rf1y.sophisticatedcore.settings';
  import { List, Optional } from 'java.util';
  import { Rect2i } from 'net.minecraft.client.renderer';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Runnable, Enum } from 'java.lang';
  import { NarrationPriority } from 'NarratableEntry';
  import { NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ICraftingUIPart } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.crafting';
  import { IUpgradeSettingsFactory, IUpgradeInventoryPartFactory } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.UpgradeGuiManager';
  import { IUpgradeWrapper } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';

  class IButtonFactory {
    instantiateButton(var1: StorageScreenBase<any>): AbstractButton;
  }


  class INameableEmptySlot {
    get emptyTooltip(): Component;
    hasEmptyTooltip(): boolean;
  }


  class ISlotDecorationRenderer {
    renderDecoration(var1: GuiGraphics, var2: Slot): void;
  }


  interface SearchBox extends TextBox {}
  class SearchBox extends TextBox {
    static readonly MAGNIFYING_GLASS: string;
    static readonly UNFOCUSED_COLOR: number;
    constructor(position: Position, dimension: Dimension, screen: StorageScreenBase<any>);
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    renderTooltip(screen: Screen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    setFocused(focused: boolean): void;
  }


  interface SettingsScreen extends IInventoryScreen, AbstractContainerScreen<SettingsContainerMenu> {}
  class SettingsScreen extends IInventoryScreen {
    static readonly HEIGHT_WITHOUT_STORAGE_SLOTS: number;
    static readonly MATCH_ALL_FILTER: Predicate;
    drawSlotBg(guiGraphics: GuiGraphics, visibleSlotsCount: number): void;
    get extendedControlsRectangles(): Rect2i[];
    get leftX(): number;
    get settingsTabControl(): StorageSettingsTabControlBase;
    get slotsOnLine(): number;
    get stackFilter(): Predicate<ItemStack>;
    get topY(): number;
    get visibleSlotsCount(): number;
    getSlot(slotIndex: number): Slot;
    isMouseOverSlot(slot: Slot, mouseX: number, mouseY: number): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    renderInventorySlots(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, canShowHover: boolean): void;
    renderTransparentBackground(guiGraphics: GuiGraphics): void;
    resize(minecraft: Minecraft, width: number, height: number): void;
    set visibleSlotsCount(visibleSlotsCount: number);
    startMouseDragHandledByOther(): void;
    stopMouseDragHandledByOther(): void;
  }


  interface SettingsTabBase<T extends AbstractContainerScreen<any> = any> extends Tab {}
  class SettingsTabBase<T extends AbstractContainerScreen<any> = any> extends Tab {
    close(): void;
    renderTooltip(screen: Screen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    setHandlers(onOpen: Runnable, onClose: Runnable, shouldRender: BooleanSupplier, shouldShowTooltip: BooleanSupplier): void;
    setHandlers(shouldShowTooltip: BooleanSupplier, shouldRender: BooleanSupplier): void;
  }


  interface SettingsTabControl<C extends AbstractContainerScreen<any> = any, T extends SettingsTabBase<C> = any> extends CompositeWidgetBase<Tab> {}
  class SettingsTabControl<C extends AbstractContainerScreen<any> = any, T extends SettingsTabBase<C> = any> extends CompositeWidgetBase<Tab> {
    get height(): number;
    get openTab(): Optional<T>;
    get tabRectangles(): Rect2i[];
    get width(): number;
    narrationPriority(): NarrationPriority;
    renderTooltip(screen: Screen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
  }


  interface SortButtonsPosition extends Enum<SortButtonsPosition> {}
  class SortButtonsPosition extends Enum<SortButtonsPosition> {
    static readonly TITLE_LINE_RIGHT: SortButtonsPosition;
    static readonly BELOW_UPGRADES: SortButtonsPosition;
    static readonly BELOW_UPGRADE_TABS: SortButtonsPosition;
    static readonly HIDDEN: SortButtonsPosition;
    static valueOf(name: string): SortButtonsPosition;
    static values(): SortButtonsPosition[];
  }


  class StorageGuiHelper {
    static renderStorageBackground(position: Position, guiGraphics: GuiGraphics, textureName: ResourceLocation, xSize: number, slotsHeight: number): void;
  }


  interface StorageScreenBase<S extends StorageContainerMenuBase<any> = any> extends IInventoryScreen, AbstractContainerScreen<S> {}
  class StorageScreenBase<S extends StorageContainerMenuBase<any> = any> extends IInventoryScreen {
    static readonly ERROR_BACKGROUND_COLOR: number;
    static readonly ERROR_BORDER_COLOR: number;
    static readonly UPGRADE_INVENTORY_OFFSET: number;
    static readonly DISABLED_SLOT_X_POS: number;
    static readonly ERROR_SLOT_COLOR: number;
    static readonly HEIGHT_WITHOUT_STORAGE_SLOTS: number;
    drawInventoryBg(guiGraphics: GuiGraphics, x: number, y: number, textureName: ResourceLocation): void;
    drawSlotBg(guiGraphics: GuiGraphics, visibleSlotsCount: number): void;
    findSlot(mouseX: number, mouseY: number): Slot;
    get craftingUIAddition(): ICraftingUIPart;
    get inventoryLabelX(): number;
    get leftX(): number;
    get slotsOnLine(): number;
    get sortButtonsRectangle(): Optional<Rect2i>;
    get stackFilter(): Predicate<ItemStack>;
    get topY(): number;
    get upgradeHeight(): number;
    get upgradeSettingsControl(): UpgradeSettingsTabControl;
    get upgradeSlotsRectangle(): Optional<Rect2i>;
    get visibleSlotsCount(): number;
    getSlot(slotIndex: number): Slot;
    isMouseOverSlot(slot: Slot, mouseX: number, mouseY: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    renderInventorySlots(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, canShowHover: boolean): void;
    renderOverlay(guiGraphics: GuiGraphics, slotColor: number, xPos: number, yPos: number, width: number, height: number): void;
    renderTooltip(screen: Screen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    resize(minecraft: Minecraft, width: number, height: number): void;
    set visibleSlotsCount(visibleSlotsCount: number);
    static setCraftingUIPart(part: ICraftingUIPart): void;
    static setSlotDecorationRenderer(renderer: ISlotDecorationRenderer): void;
  }


  interface StorageSettingsTab extends Tab {}
  class StorageSettingsTab extends Tab {
    constructor(position: Position, screen: StorageScreenBase<any>, tabTooltip: string, onTabIconClicked: IntConsumer);
  }


  interface Tab extends CompositeWidgetBase<WidgetBase> {}
  class Tab extends CompositeWidgetBase<WidgetBase> {
    static readonly DEFAULT_HEIGHT: number;
    get bottomY(): number;
    get height(): number;
    get tabRectangle(): Optional<Rect2i>;
    get topY(): number;
    get width(): number;
    narrationPriority(): NarrationPriority;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    renderTooltip(screen: Screen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    set height(height: number);
    set width(width: number);
    setHandlers(shouldShowTooltip: BooleanSupplier, shouldRender: BooleanSupplier): void;
    tick(): void;
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
  }


  interface TemplatePersistanceControl extends CompositeWidgetBase<WidgetBase> {}
  class TemplatePersistanceControl extends CompositeWidgetBase<WidgetBase> {
    static readonly SAVE_TEMPLATE: ButtonDefinition;
    static readonly LOAD_TEMPLATE: ButtonDefinition;
    static readonly EXPORT_TEMPLATE: ButtonDefinition;
    isTemplateLoadHovered(): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrollX: number, scrollY: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrollX: number, scrollY: number): boolean;
    renderTooltip(screen: Screen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    renderTooltip(screen: Screen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    renderTooltip(screen: Screen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
  }


  class UpgradeGuiManager {
    static getInventoryPart<C extends UpgradeContainerBase<any, any>>(upgradeSlot: number, container: C, position: Position, height: number, screen: StorageScreenBase<any>): Optional<UpgradeInventoryPartBase<C>>;
    static getTab<C extends UpgradeContainerBase<any, any>>(container: C, position: Position, screen: StorageScreenBase<any>): UpgradeSettingsTab<C>;
    static registerInventoryPart<W extends IUpgradeWrapper, C extends UpgradeContainerBase<W, C>, I extends UpgradeInventoryPartBase<C>>(containerType: UpgradeContainerType<W, C>, factory: IUpgradeInventoryPartFactory<C, I>): void;
    static registerTab<W extends IUpgradeWrapper, C extends UpgradeContainerBase<W, C>, S extends UpgradeSettingsTab<C>>(containerType: UpgradeContainerType<W, C>, upgradeSettingsFactory: IUpgradeSettingsFactory<C, S>): void;
  }


  class UpgradeInventoryPartBase<C extends UpgradeContainerBase<any, any> = any> {
    handleMouseReleased(var1: number, var3: number, var5: number): boolean;
    render(var1: GuiGraphics, var2: number, var3: number): void;
    renderErrorOverlay(var1: GuiGraphics): void;
    renderTooltip(var1: StorageScreenBase<any>, var2: GuiGraphics, var3: number, var4: number): void;
  }


  interface UpgradeSettingsTab<C extends UpgradeContainerBase<any, any> = any> extends SettingsTabBase<StorageScreenBase> {}
  class UpgradeSettingsTab<C extends UpgradeContainerBase<any, any> = any> extends SettingsTabBase<StorageScreenBase> {
    onAfterInit(): void;
    slotIsNotCoveredAt(slot: Slot, mouseX: number, mouseY: number): boolean;
  }


  interface UpgradeSettingsTabControl extends SettingsTabControl<StorageScreenBase, UpgradeSettingsTab> {}
  class UpgradeSettingsTabControl extends SettingsTabControl<StorageScreenBase, UpgradeSettingsTab> {
    constructor(position: Position, screen: StorageScreenBase<any>, storageSettingsTabTooltip: string);
    slotIsNotCoveredAt(slot: Slot, mouseX: number, mouseY: number): boolean;
    tick(): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.client.gui.UpgradeGuiManager' {
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';

  class IUpgradeSettingsFactory<C extends UpgradeContainerBase<any, any> = any, S extends UpgradeSettingsTab<C> = any> {
    create(var1: C, var2: Position, var3: StorageScreenBase<any>): S;
  }


  class IUpgradeInventoryPartFactory<C extends UpgradeContainerBase<any, any> = any, I extends UpgradeInventoryPartBase<C> = any> {
    create(var1: number, var2: C, var3: Position, var4: number, var5: StorageScreenBase<any>): I;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { Minecraft } from 'net.minecraft.client';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { Matrix4f } from 'org.joml';
  import { List, Optional } from 'java.util';
  import { FormattedCharSequence } from 'net.minecraft.util';
  import { BufferSource } from 'MultiBufferSource';
  import { RenderType, Rect2i } from 'net.minecraft.client.renderer';
  import { StateData } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls.ToggleButton';
  import { Component, FormattedText, MutableComponent } from 'net.minecraft.network.chat';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { ItemRenderer } from 'net.minecraft.client.renderer.entity';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ClientTooltipComponent } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { ChatFormatting } from 'net.minecraft';

  class GuiHelper {
    static readonly GUI_CONTROLS: ResourceLocation;
    static readonly GUI_CONTROLS_TEXTURE_WIDTH: number;
    static readonly GUI_CONTROLS_TEXTURE_HEIGHT: number;
    static readonly BAR_BACKGROUND_BOTTOM: TextureBlitData;
    static readonly BAR_BACKGROUND_MIDDLE: TextureBlitData;
    static readonly BAR_BACKGROUND_TOP: TextureBlitData;
    static readonly ICONS: ResourceLocation;
    static readonly CRAFTING_RESULT_SLOT: TextureBlitData;
    static readonly DEFAULT_BUTTON_HOVERED_BACKGROUND: TextureBlitData;
    static readonly DEFAULT_BUTTON_BACKGROUND: TextureBlitData;
    static readonly SMALL_BUTTON_BACKGROUND: TextureBlitData;
    static readonly SMALL_BUTTON_HOVERED_BACKGROUND: TextureBlitData;
    static readonly SLOTS_BACKGROUND: ResourceLocation;
    static blit(guiGraphics: GuiGraphics, x: number, y: number, texData: TextureBlitData): void;
    static blit(guiGraphics: GuiGraphics, x: number, y: number, texData: TextureBlitData, width: number, height: number): void;
    static coloredBlit(matrix: Matrix4f, x: number, y: number, texData: TextureBlitData, color: number): void;
    static fill(guiGraphics: GuiGraphics, minX: number, minY: number, maxX: number, maxY: number, color: number): void;
    static fill(guiGraphics: GuiGraphics, renderType: RenderType, minX: number, minY: number, maxX: number, maxY: number, z: number, color: number): void;
    static gatherTooltipComponents(textElements: FormattedText[], mouseX: number, screenWidth: number, screenHeight: number, fallbackFont: Font): ClientTooltipComponent[];
    static getButtonStateData(uv: UV, dimension: Dimension, offset: Position, ...tooltip: Component[]): StateData;
    static getButtonStateData(uv: UV, tooltip: string, dimension: Dimension): StateData;
    static getButtonStateData(uv: UV, tooltip: string, dimension: Dimension, offset: Position): StateData;
    static getButtonStateData(uv: UV, dimension: Dimension, offset: Position, tooltip: Component[]): StateData;
    static getPositiveRectangle(x: number, y: number, width: number, height: number): Optional<Rect2i>;
    static renderControlBackground(guiGraphics: GuiGraphics, x: number, y: number, renderWidth: number, renderHeight: number): void;
    static renderControlBackground(guiGraphics: GuiGraphics, x: number, y: number, renderWidth: number, renderHeight: number, u: number, v: number, textureBgWidth: number, textureBgHeight: number): void;
    static renderItemInGUI(guiGraphics: GuiGraphics, minecraft: Minecraft, stack: ItemStack, xPosition: number, yPosition: number): void;
    static renderItemInGUI(guiGraphics: GuiGraphics, minecraft: Minecraft, stack: ItemStack, xPosition: number, yPosition: number, renderOverlay: boolean): void;
    static renderItemInGUI(guiGraphics: GuiGraphics, minecraft: Minecraft, stack: ItemStack, xPosition: number, yPosition: number, renderOverlay: boolean, countText: string): void;
    static renderSlotsBackground(guiGraphics: GuiGraphics, x: number, y: number, slotWidth: number, slotHeight: number): void;
    static renderSlotsBackground(guiGraphics: GuiGraphics, x: number, y: number, slotsInRow: number, fullSlotRows: number, extraRowSlots: number): void;
    static renderTiledFluidTextureAtlas(guiGraphics: GuiGraphics, sprite: TextureAtlasSprite, color: number, x: number, y: number, height: number): void;
    static renderTooltip(screen: Screen, guiGraphics: GuiGraphics, components: Component[], x: number, y: number): void;
    static renderTooltipBackground(matrix4f: Matrix4f, tooltipWidth: number, leftX: number, topY: number, tooltipHeight: number, backgroundColor: number, borderColorStart: number, borderColorEnd: number): void;
    static tryRenderGuiItem(guiGraphics: GuiGraphics, itemRenderer: ItemRenderer, livingEntity: LivingEntity, stack: ItemStack, x: number, y: number, rotation: number): void;
    static writeTooltipLines(guiGraphics: GuiGraphics, textLines: FormattedCharSequence[], font: Font, leftX: number, topY: number, matrix4f: Matrix4f, renderTypeBuffer: BufferSource, color: number): void;
  }


  class TextureBlitData {
    constructor(textureName: ResourceLocation, textureDimension: Dimension, uv: UV, dimension: Dimension);

    constructor(textureName: ResourceLocation, uv: UV, dimension: Dimension);

    constructor(textureName: ResourceLocation, offset: Position, textureDimension: Dimension, uv: UV, dimension: Dimension);
    get height(): number;
    get textureHeight(): number;
    get textureName(): ResourceLocation;
    get textureWidth(): number;
    get u(): number;
    get v(): number;
    get width(): number;
    get xOffset(): number;
    get yOffset(): number;
  }


  class TranslationHelper {
    static readonly TOOLTIP_SUFFIX: string;
    static readonly INSTANCE: TranslationHelper;
    constructor(modId: string);
    getTranslatedLines(translateKey: string, parameters: any, ...textFormattings: ChatFormatting[]): Component[];
    getTranslatedLines(translateKey: string): Component[];
    getTranslatedLines(translateKey: string, parameters: any): Component[];
    translBlockTooltipKey(blockName: string): string;
    translButton(buttonName: string): string;
    translColoredButton(buttonName: string, color: ChatFormatting): Component;
    translError(key: string, ...params: any[]): Component;
    translGui(guiTranslateKey: string): string;
    translGuiTooltip(guiTranslateKey: string): string;
    translItemTooltip(item: Item): string;
    translItemTooltip(itemName: string): string;
    translKeybind(keybindName: string): string;
    translSettings(categoryName: string): string;
    translSettingsButton(buttonName: string): string;
    translSettingsMessage(messageName: string): string;
    translSettingsTooltip(categoryName: string): string;
    translStatusMessage(statusMessage: string, ...params: any[]): MutableComponent;
    translUpgrade(upgradeName: string, ...params: any[]): MutableComponent;
    translUpgradeButton(buttonName: string): string;
    translUpgradeControl(controlName: string): string;
    translUpgradeGroup(groupName: string): string;
    translUpgradeKey(upgradeName: string): string;
    translUpgradeSlotTooltip(tooltipName: string): Component;
    translUpgradeTooltip(upgradeName: string): Component;
    translate(translateKey: string, ...parameters: any[]): string;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.client.init' {
  import { RegisterParticleProvidersEvent } from 'net.neoforged.neoforge.client.event';

  class ModParticles {
    static registerFactories(event: RegisterParticleProvidersEvent): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.client.render' {
  import { Map, List, Optional } from 'java.util';
  import { Integer } from 'java.lang';
  import { BlockPos } from 'net.minecraft.core';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { RenderType, MultiBufferSource } from 'net.minecraft.client.renderer';
  import { Edge } from 'net.p3pp3rf1y.sophisticatedcore.util.VoxelOutliner';
  import { Pose } from 'PoseStack';
  import { ClientTooltipComponent } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { Font } from 'net.minecraft.client.gui';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Player } from 'net.minecraft.world.entity.player';
  import { IUpgradeRenderer } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { UpgradeRenderDataType, IUpgradeRenderData } from 'net.p3pp3rf1y.sophisticatedcore.renderdata';

  class BlockHighlightRenderer {
    static readonly HIGHLIGHT_DURATION: number;
    static addHighlightedPositions(highlightPositions: Map<number, BlockPos[]>): void;
    static render(poseStack: PoseStack, partialTick: number, cameraPos: Vec3): void;
    static tri01(ticks: number, periodTicks: number, phaseOffsetTicks: number): number;
  }


  class BlockHighlightRenderHelper {
    static readonly OUTLINE_QUADS: RenderType;
    static emitThickLineOrtho(vc: VertexConsumer, pose: Pose, a: Vec3, b: Vec3, thickness: number, r: number, g: number, bl: number, alpha: number, originX: number, originY: number, originZ: number): void;
    static renderThickEdges(poseStack: PoseStack, bufferSource: MultiBufferSource, color: number, edges: Edge[], originPos: BlockPos): void;
    static renderThickEdges(poseStack: PoseStack, bufferSource: MultiBufferSource, color: number, edges: Edge[], originX: number, originY: number, originZ: number): void;
  }


  interface ClientStorageContentsTooltipBase extends ClientTooltipComponent {}
  class ClientStorageContentsTooltipBase extends ClientTooltipComponent {
    get height(): number;
    getWidth(font: Font): number;
    static refreshContents(): void;
  }


  class IItemActionPayloadBuilder<T = any> {
    buildClientRequestData(var1: Player): Optional<T>;
    get payloadHandlerId(): ResourceLocation;
  }


  class UpgradeRenderRegistry {
    static getUpgradeRenderer<T extends IUpgradeRenderData>(upgradeRenderDataType: UpgradeRenderDataType<T>): Optional<IUpgradeRenderer<T>>;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.common' {
  import { IEventBus } from 'net.neoforged.bus.api';

  class CommonEventHandler {
    registerHandlers(modBus: IEventBus): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.common.gui' {
  import { Supplier, BiConsumer, Consumer } from 'java.util.function';
  import { IItemHandler, SlotItemHandler } from 'net.neoforged.neoforge.items';
  import { Player, Inventory } from 'net.minecraft.world.entity.player';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { ContainerSynchronizer, AbstractContainerMenu, Slot, ClickType, MenuConstructor } from 'net.minecraft.world.inventory';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { NonNullList, Holder, BlockPos, RegistryAccess } from 'net.minecraft.core';
  import { Set, Map, List, Optional, OptionalInt } from 'java.util';
  import { Integer, Class, Enum, Runnable } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Container, MenuProvider } from 'net.minecraft.world';
  import { RecipeType } from 'net.minecraft.world.item.crafting';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { SettingsContainerBase, ISettingsCategory } from 'net.p3pp3rf1y.sophisticatedcore.settings';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { Pair } from 'com.mojang.datafixers.util';
  import { Entity } from 'net.minecraft.world.entity';
  import { IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { TemplateSettingsHandler } from 'net.p3pp3rf1y.sophisticatedcore.common.gui.TemplatePersistanceContainer';
  import { Matcher } from 'java.util.regex';
  import { IUpgradeWrapper } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { IFactory } from 'net.p3pp3rf1y.sophisticatedcore.common.gui.UpgradeContainerType';

  interface FilterSlotItemHandler extends IFilterSlot, SlotSuppliedHandler {}
  class FilterSlotItemHandler extends IFilterSlot {
    constructor(itemHandlerSupplier: Supplier<IItemHandler>, slot: number, xPosition: number, yPosition: number);
    get maxStackSize(): number;
    getMaxStackSize(stack: ItemStack): number;
    mayPickup(playerIn: Player): boolean;
  }


  interface HighStackCountSynchronizer extends ContainerSynchronizer {}
  class HighStackCountSynchronizer extends ContainerSynchronizer {
    constructor(player: ServerPlayer);
    sendCarriedChange(containerMenu: AbstractContainerMenu, stack: ItemStack): void;
    sendDataChange(containerMenu: AbstractContainerMenu, slotInd: number, data: number): void;
    sendInitialData(containerMenu: AbstractContainerMenu, stacks: NonNullList<ItemStack>, carriedStack: ItemStack, dataSlots: number[]): void;
    sendSlotChange(containerMenu: AbstractContainerMenu, slotInd: number, stack: ItemStack): void;
  }


  class IAdditionalSlotInfoMenu {
    updateAdditionalSlotInfo(var1: Set<number>, var2: Map<number, number>, var3: Set<number>, var4: Map<number, Holder<Item>>): void;
    updateEmptySlotIcons(var1: Map<ResourceLocation, Set<number>>): void;
  }


  class ICraftingContainer {
    get craftMatrix(): Container;
    get recipeSlots(): Slot[];
    get recipeType(): RecipeType<any>;
    setRecipeUsed(var1: ResourceLocation): void;
    shouldRefillCraftingGrid(): boolean;
  }


  class IFilterSlot {
  }


  class IServerUpdater {
    sendBooleanToServer(var1: string, var2: boolean): void;
    sendDataToServer(var1: Supplier<CompoundTag>): void;
  }


  class ISyncedContainer {
    handlePacket(var1: CompoundTag): void;
  }


  interface SettingsContainerMenu<S extends IStorageWrapper = any> extends ISyncedContainer, IAdditionalSlotInfoMenu, AbstractContainerMenu {}
  class SettingsContainerMenu<S extends IStorageWrapper = any> extends ISyncedContainer {
    readonly lastGhostSlots: NonNullList;
    readonly remoteGhostSlots: NonNullList;
    readonly ghostSlots: List;
    broadcastChanges(): void;
    broadcastFullState(): void;
    clicked(slotId: number, dragType: number, clickTypeIn: ClickType, player: Player): void;
    detectSettingsChangeAndReload(): void;
    forEachSettingsContainer(consumer: BiConsumer<string, SettingsContainerBase<any>>): void;
    get blockPosition(): BlockPos;
    get columnsTaken(): number;
    get numberOfRows(): number;
    get numberOfSlots(): number;
    get numberOfStorageInventorySlots(): number;
    get player(): Player;
    get storageInventorySlots(): Slot[];
    get storageWrapper(): S;
    get templatePersistanceContainer(): TemplatePersistanceContainer;
    getSelectedTemplatesCategory<T extends ISettingsCategory<any>>(categoryClass: Class<T>): Optional<T>;
    getSlot(slotId: number): Slot;
    getSlotFilterItem(slot: number): ItemStack;
    handlePacket(data: CompoundTag): void;
    onMemorizedItemsChanged(): void;
    onMemorizedStackAdded(slotNumber: number): void;
    onMemorizedStackRemoved(slotNumber: number): void;
    quickMoveStack(player: Player, index: number): ItemStack;
    refreshTemplateSlots(): void;
    sendAdditionalSlotInfo(): void;
    sendAllDataToRemote(): void;
    sendDataToServer(supplyData: Supplier<CompoundTag>): void;
    setRemoteSlotNoCopy(slot: number, stack: ItemStack): void;
    setSynchronizer(synchronizer: ContainerSynchronizer): void;
    stillValid(player: Player): boolean;
    supportsItemDisplaySideSelection(): boolean;
    updateAdditionalSlotInfo(inaccessibleSlots: Set<number>, slotLimitOverrides: Map<number, number>, infiniteSlots: Set<number>, slotFilterItems: Map<number, Holder<Item>>): void;
    updateEmptySlotIcons(emptySlotIcons: Map<ResourceLocation, Set<number>>): void;
  }


  interface SlotSuppliedHandler extends SlotItemHandler {}
  class SlotSuppliedHandler extends SlotItemHandler {
    constructor(itemHandlerSupplier: Supplier<IItemHandler>, slot: number, xPosition: number, yPosition: number);
    get itemHandler(): IItemHandler;
    get maxStackSize(): number;
    mayPlace(stack: ItemStack): boolean;
    setChanged(): void;
  }


  interface SophisticatedMenuProvider extends MenuProvider {}
  class SophisticatedMenuProvider extends MenuProvider {
    constructor(menuConstructor: MenuConstructor, title: Component);

    constructor(menuConstructor: MenuConstructor, title: Component, triggerClientSideContainerClosingOnOpen: boolean);
    createMenu(containerId: number, playerInventory: Inventory, player: Player): AbstractContainerMenu;
    get displayName(): Component;
    shouldTriggerClientSideContainerClosingOnOpen(): boolean;
  }


  interface SortBy extends Enum<SortBy> {}
  class SortBy extends Enum<SortBy> {
    static readonly NAME: SortBy;
    static readonly MOD: SortBy;
    static readonly COUNT: SortBy;
    static readonly TAGS: SortBy;
    static fromName(name: string): SortBy;
    get serializedName(): string;
    next(): SortBy;
    static valueOf(name: string): SortBy;
    static values(): SortBy[];
  }


  interface StorageContainerMenuBase<S extends IStorageWrapper = any> extends IAdditionalSlotInfoMenu, AbstractContainerMenu {}
  class StorageContainerMenuBase<S extends IStorageWrapper = any> extends IAdditionalSlotInfoMenu {
    static readonly NUMBER_OF_PLAYER_SLOTS: number;
    static readonly EMPTY_UPGRADE_SLOT_BACKGROUND: ResourceLocation;
    static readonly INACCESSIBLE_SLOT_BACKGROUND: Pair;
    readonly lastUpgradeSlots: NonNullList;
    readonly upgradeSlots: List;
    readonly remoteUpgradeSlots: NonNullList;
    readonly lastRealSlots: NonNullList;
    readonly realInventorySlots: List;
    broadcastChanges(): void;
    broadcastFullState(): void;
    canDisableUpgrade(upgradeSlot: number): boolean;
    static canItemQuickReplace(slot: Slot, stack: ItemStack): boolean;
    canTakeItemForPickAll(stack: ItemStack, slot: Slot): boolean;
    clicked(slotId: number, dragType: number, clickType: ClickType, player: Player): void;
    detectSettingsChangeAndReload(): boolean;
    findSlot(container: Container, slotIdx: number): OptionalInt;
    get blockPosition(): Optional<BlockPos>;
    get columnsTaken(): number;
    get entity(): Optional<Entity>;
    get errorUpgradeSlotChangeResult(): Optional<UpgradeSlotChangeResult>;
    get extraSlots(): Slot[];
    get firstUpgradeSlot(): number;
    get inventorySlotsSize(): number;
    get items(): NonNullList<ItemStack>;
    get maxStackSize(): number;
    get noItemIcon(): Pair<ResourceLocation, ResourceLocation>;
    get numberOfRows(): number;
    get numberOfStorageInventorySlots(): number;
    get numberOfUpgradeSlots(): number;
    get openContainer(): Optional<UpgradeContainerBase<any, any>>;
    get searchPhrase(): string;
    get sortBy(): SortBy;
    get storageWrapper(): S;
    get totalSlotsNumber(): number;
    get upgradeContainers(): Map<number, UpgradeContainerBase<any, any>>;
    get upgradeSlotsSize(): number;
    get visibleStorageItem(): Optional<ItemStack>;
    getMaxStackSize(stack: ItemStack): number;
    getMemorizedStackInSlot(slotId: number): Optional<ItemStack>;
    getOpenOrFirstCraftingContainer<T extends UpgradeContainerBase<any, any>>(recipeType: RecipeType<any>): Optional<T>;
    static getQuickCraftPlaceCount(slot: Slot, quickCraftSlotsSize: number, quickCraftingType: number, carriedStack: ItemStack): number;
    getSlot(slotId: number): Slot;
    getSlotFilterItem(slot: number): ItemStack;
    getSlotOverlayColors(slot: number): number[];
    getSlotUpgradeContainer(slot: Slot): Optional<UpgradeContainerBase<any, any>>;
    getUpgradeEnabled(upgradeSlot: number): boolean;
    handlePacket(data: CompoundTag): void;
    hasSomethingMessedWithStorage(): boolean;
    initializeContents(stateId: number, items: ItemStack[], carried: ItemStack): void;
    isFirstLevelStorage(): boolean;
    isInfiniteSlot(slot: number): boolean;
    isNotPlayersInventorySlot(slotNumber: number): boolean;
    isStorageInventorySlot(index: number): boolean;
    isUpgradeRunnable(upgradeSlot: number): boolean;
    isValidSlotIndex(slotIndex: number): boolean;
    mayPickup(playerIn: Player): boolean;
    mayPickup(playerIn: Player): boolean;
    mayPlace(stack: ItemStack): boolean;
    openSettings(): void;
    quickMoveStack(player: Player, index: number): ItemStack;
    removeOpenTabId(): void;
    removed(player: Player): void;
    sendAllDataToRemote(): void;
    set(stack: ItemStack): void;
    set searchPhrase(searchPhrase: string);
    set sortBy(sortBy: SortBy);
    setItem(slotId: number, stateId: number, stack: ItemStack): void;
    setOpenTabId(tabId: number): void;
    setRemoteSlot(slotIndex: number, stack: ItemStack): void;
    setRemoteSlotNoCopy(slotIndex: number, stack: ItemStack): void;
    setSynchronizer(synchronizer: ContainerSynchronizer): void;
    setUpgradeChangeListener(upgradeChangeListener: Consumer<StorageContainerMenuBase<any>>): void;
    setUpgradeEnabled(upgradeSlot: number, enabled: boolean): void;
    shouldKeepSearchPhrase(): boolean;
    sort(): void;
    transferItemsToPlayerInventory(filterByContents: boolean): void;
    transferItemsToStorage(filterByContents: boolean): void;
    updateAdditionalSlotInfo(inaccessibleSlots: Set<number>, slotLimitOverrides: Map<number, number>, infiniteSlots: Set<number>, slotFilterItems: Map<number, Holder<Item>>): void;
    updateEmptySlotIcons(emptySlotIcons: Map<ResourceLocation, Set<number>>): void;
    updateSlotChangeError(result: UpgradeSlotChangeResult): void;
  }


  interface StorageInventorySlot extends SlotSuppliedHandler {}
  class StorageInventorySlot extends SlotSuppliedHandler {
    constructor(isClientSide: boolean, storageWrapper: IStorageWrapper, slotIndex: number, player: Player);
    get maxStackSize(): number;
    getMaxStackSize(stack: ItemStack): number;
    isInfinite(): boolean;
    mayPlace(stack: ItemStack): boolean;
    safeInsert(stack: ItemStack, maxCount: number): ItemStack;
    setChanged(): void;
  }


  class TemplatePersistanceContainer {
    constructor(settingsContainer: SettingsContainerMenu<any>, registryAccess: RegistryAccess);
    exportTemplate(fileName: string): void;
    static findNonMatchingCharacters(matcher: Matcher, input: string): string;
    get loadSlot(): number;
    get loadSlotSource(): Optional<string>;
    get loadSlotTooltipName(): MutableComponent;
    get saveSlotTooltipName(): MutableComponent;
    get selectedTemplate(): Optional<TemplateSettingsHandler>;
    handlePacket(data: CompoundTag): void;
    loadTemplate(): void;
    refreshTemplateSlots(): void;
    saveTemplate(slotName: string): void;
    scrollLoadSlot(next: boolean): void;
    scrollSaveSlot(next: boolean): void;
    setOnSlotsRefreshed(onSlotsRefreshed: Runnable): void;
    showsTextbox(): boolean;
    templateHasTooManySlots(): boolean;
  }


  interface UpgradeContainerBase<W extends IUpgradeWrapper = any, C extends UpgradeContainerBase<W, C> = any> extends IServerUpdater {}
  class UpgradeContainerBase<W extends IUpgradeWrapper = any, C extends UpgradeContainerBase<W, C> = any> extends IServerUpdater {
    allowsPickupAll(slot: Slot): boolean;
    containsSlot(slot: Slot): boolean;
    get slots(): Slot[];
    get type(): UpgradeContainerType<W, C>;
    get upgradeContainerId(): number;
    get upgradeStack(): ItemStack;
    get upgradeWrapper(): W;
    getSlotStackToTransfer(slot: Slot): ItemStack;
    handlePacket(var1: CompoundTag): void;
    isOpen(): boolean;
    mergeIntoStorageFirst(slot: Slot): boolean;
    onInit(): void;
    onTakeFromSlot(slot: Slot, player: Player, slotStack: ItemStack): void;
    sendBooleanToServer(key: string, value: boolean): void;
    sendDataToServer(supplyData: Supplier<CompoundTag>): void;
    set upgradeWrapper(updatedUpgradeWrapper: IUpgradeWrapper);
    setIsOpen(isOpen: boolean): void;
  }


  class UpgradeContainerRegistry {
    static instantiateContainer<W extends IUpgradeWrapper, C extends UpgradeContainerBase<W, C>>(player: Player, containerId: number, wrapper: W): Optional<UpgradeContainerBase<W, C>>;
    static register(upgradeName: ResourceLocation, containerFactory: UpgradeContainerType<IUpgradeWrapper, UpgradeContainerBase<any, any>>): void;
  }


  class UpgradeContainerType<W extends IUpgradeWrapper = any, C extends UpgradeContainerBase<W, C> = any> {
    constructor(factory: IFactory<W, C>);
    create(player: Player, containerId: number, wrapper: W): C;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.common.gui.SettingsContainerMenu' {
  import { SettingsContainerMenu } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';

  class ISettingsContainerFactory<C extends ISettingsCategory<any> = any, T extends SettingsContainerBase<C> = any> {
    create(var1: SettingsContainerMenu<any>, var2: string, var3: C): T;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.common.gui.StorageContainerMenuBase' {
  import { SlotItemHandler } from 'net.neoforged.neoforge.items';
  import { UpgradeHandler } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Pair } from 'com.mojang.datafixers.util';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface StorageUpgradeSlot extends SlotItemHandler {}
  class StorageUpgradeSlot extends SlotItemHandler {
    constructor(upgradeHandler: UpgradeHandler, slotIndex: number);
    get noItemIcon(): Pair<ResourceLocation, ResourceLocation>;
    mayPickup(player: Player): boolean;
    mayPlace(stack: ItemStack): boolean;
    set(stack: ItemStack): void;
    setChanged(): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.common.gui.TemplatePersistanceContainer' {
  import { SettingsHandler, ISettingsCategory } from 'net.p3pp3rf1y.sophisticatedcore.settings';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Consumer } from 'java.util.function';

  interface TemplateSettingsHandler extends SettingsHandler {}
  class TemplateSettingsHandler extends SettingsHandler {
    get globalSettingsCategoryName(): string;
    instantiateGlobalSettingsCategory(categoryNbt: CompoundTag, saveNbt: Consumer<CompoundTag>): ISettingsCategory<any>;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.common.gui.UpgradeContainerType' {
  import { Player } from 'net.minecraft.world.entity.player';
  import { UpgradeContainerType } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';

  class IFactory<W extends IUpgradeWrapper = any, C extends UpgradeContainerBase<W, C> = any> {
    create(var1: Player, var2: number, var3: W, var4: UpgradeContainerType<W, C>): C;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.compat.accessories' {
  import { ICompat } from 'net.p3pp3rf1y.sophisticatedcore.compat';

  interface AccessoriesCompat extends ICompat {}
  class AccessoriesCompat extends ICompat {
    setup(): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.compat.chipped' {
  import { RecipeType } from 'net.minecraft.world.item.crafting';
  import { ChippedRecipe } from 'earth.terrarium.chipped.common.recipes';
  import { Consumer, Supplier } from 'java.util.function';
  import { Slot, ContainerLevelAccess } from 'net.minecraft.world.inventory';
  import { IServerUpdater, UpgradeContainerBase, UpgradeContainerType } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Runnable, Boolean } from 'java.lang';
  import { List, Optional } from 'java.util';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { WidgetBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { Player } from 'net.minecraft.world.entity.player';
  import { UpgradeItemBase, IUpgradeCountLimitConfig, UpgradeType, UpgradeWrapperBase } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { UpgradeConflictDefinition } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.IUpgradeItem';
  import { UpgradeSettingsTab, StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { Toggle } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls.ButtonDefinition';
  import { IItemHandlerModifiable } from 'net.neoforged.neoforge.items';
  import { SimpleItemContent } from 'net.p3pp3rf1y.sophisticatedcore.util';

  class BlockTransformationRecipeContainer {
    constructor(upgradeContainer: BlockTransformationUpgradeContainer, recipeType: RecipeType<ChippedRecipe>, addSlot: Consumer<Slot>, serverUpdater: IServerUpdater, worldPosCallable: ContainerLevelAccess);
    get inputSlot(): Slot;
    get outputSlot(): Slot;
    get results(): ItemStack[];
    get selectedRecipe(): number;
    handlePacket(data: CompoundTag): void;
    hasItemsInInputSlot(): boolean;
    isNotResultSlot(slot: Slot): boolean;
    remove(amount: number): ItemStack;
    selectRecipeIndex(recipeIndex: number): boolean;
    setChanged(): void;
    setInventoryUpdateListener(listenerIn: Runnable): void;
  }


  interface BlockTransformationRecipeControl extends WidgetBase {}
  class BlockTransformationRecipeControl extends WidgetBase {
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrollX: number, scrollY: number): boolean;
    moveSlotsToView(): void;
    renderTooltip(screen: Screen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
  }


  interface BlockTransformationUpgradeContainer extends UpgradeContainerBase<BlockTransformationUpgradeWrapper, BlockTransformationUpgradeContainer> {}
  class BlockTransformationUpgradeContainer extends UpgradeContainerBase<BlockTransformationUpgradeWrapper, BlockTransformationUpgradeContainer> {
    constructor(player: Player, upgradeContainerId: number, upgradeWrapper: BlockTransformationUpgradeWrapper, type: UpgradeContainerType<BlockTransformationUpgradeWrapper, BlockTransformationUpgradeContainer>);
    allowsPickupAll(slot: Slot): boolean;
    get recipeContainer(): BlockTransformationRecipeContainer;
    handlePacket(data: CompoundTag): void;
    mergeIntoStorageFirst(slot: Slot): boolean;
    setShiftClickIntoStorage(shiftClickIntoStorage: boolean): void;
    shouldShiftClickIntoStorage(): boolean;
  }


  interface BlockTransformationUpgradeItem extends UpgradeItemBase<BlockTransformationUpgradeWrapper> {}
  class BlockTransformationUpgradeItem extends UpgradeItemBase<BlockTransformationUpgradeWrapper> {
    constructor(getRecipeType: Supplier<RecipeType<ChippedRecipe>>, upgradeTypeLimitConfig: IUpgradeCountLimitConfig);
    get recipeType(): RecipeType<ChippedRecipe>;
    get type(): UpgradeType<BlockTransformationUpgradeWrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
  }


  interface BlockTransformationUpgradeTab extends UpgradeSettingsTab<BlockTransformationUpgradeContainer> {}
  class BlockTransformationUpgradeTab extends UpgradeSettingsTab<BlockTransformationUpgradeContainer> {
    constructor(upgradeContainer: BlockTransformationUpgradeContainer, position: Position, screen: StorageScreenBase<any>, shiftClickTargetButton: Toggle<boolean>, upgradeName: string);
  }


  interface BlockTransformationUpgradeWrapper extends UpgradeWrapperBase<BlockTransformationUpgradeWrapper, BlockTransformationUpgradeItem> {}
  class BlockTransformationUpgradeWrapper extends UpgradeWrapperBase<BlockTransformationUpgradeWrapper, BlockTransformationUpgradeItem> {
    canBeDisabled(): boolean;
    get inputInventory(): IItemHandlerModifiable;
    get recipeType(): RecipeType<ChippedRecipe>;
    get result(): Optional<SimpleItemContent>;
    set result(result: ItemStack);
    setShiftClickIntoStorage(shiftClickIntoStorage: boolean): void;
    shouldShiftClickIntoStorage(): boolean;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.compat' {
  import { Supplier, Function } from 'java.util.function';
  import { IEventBus } from 'net.neoforged.bus.api';

  class CompatModIds {
    static readonly JEI: string;
    static readonly EMI: string;
    static readonly REI: string;
    static readonly CRAFTING_TWEAKS: string;
    static readonly INVENTORY_SORTER: string;
    static readonly QUARK: string;
    static readonly ITEM_BORDERS: string;
    static readonly CHIPPED: string;
    static readonly CURIOS: string;
    static readonly CREATE: string;
    static readonly TRASH_SLOT: string;
    static readonly RELIQUARY: string;
    static readonly MOUSE_TWEAKS: string;
    static readonly INVENTORY_TWEAKS: string;
    static readonly FTB_CHUNKS: string;
    static readonly OPEN_PARTIES_AND_CLAIMS_CHUNKS: string;
    static readonly ACCESSORIES: string;
  }


  class CompatRegistry {
    static initCompats(modBus: IEventBus): void;
    static registerCompat(info: CompatInfo, factory: Supplier<Function<IEventBus, ICompat>>): void;
    static setupCompats(): void;
  }


  class ICompat {
    init(modBus: IEventBus): void;
    setup(): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.compat.craftingtweaks' {
  import { ICompat } from 'net.p3pp3rf1y.sophisticatedcore.compat';
  import { CraftingGridProvider, CraftingGridBuilder } from 'net.blay09.mods.craftingtweaks.api';
  import { AbstractContainerMenu, Slot } from 'net.minecraft.world.inventory';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ICraftingUIPart } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.crafting';
  import { StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { List } from 'java.util';

  interface CraftingTweaksCompat extends ICompat {}
  class CraftingTweaksCompat extends ICompat {
    setup(): void;
  }


  class CraftingTweaksCompatClient {
    static setup(): void;
  }


  interface CraftingUpgradeTweakProvider extends CraftingGridProvider {}
  class CraftingUpgradeTweakProvider extends CraftingGridProvider {
    buildCraftingGrids(builder: CraftingGridBuilder, containerMenu: AbstractContainerMenu): void;
    clearGrid(player: Player, menu: AbstractContainerMenu, forced: boolean): void;
    get modId(): string;
    handles(abstractContainerMenu: AbstractContainerMenu): boolean;
    requiresServerSide(): boolean;
  }


  interface CraftingUpgradeTweakUIPart extends ICraftingUIPart {}
  class CraftingUpgradeTweakUIPart extends ICraftingUIPart {
    get width(): number;
    onCraftingSlotsDisplayed(slots: Slot[]): void;
    onCraftingSlotsHidden(): void;
    static register(): void;
    setStorageScreen(screen: StorageScreenBase<any>): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.compat.create' {
  import { AbstractContraptionEntity, Contraption } from 'com.simibubi.create.content.contraptions';
  import { BlockPos } from 'net.minecraft.core';
  import { ICompat } from 'net.p3pp3rf1y.sophisticatedcore.compat';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { RegisterPayloadHandlersEvent } from 'net.neoforged.neoforge.network.event';
  import { MountedItemStorage, MountedItemStorageType } from 'com.simibubi.create.api.contraption.storage.item';
  import { SyncedMountedStorage } from 'com.simibubi.create.api.contraption.storage';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IStorageWrapper, IStorageSavedData } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { StorageContainerMenuBase, SettingsContainerMenu } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { MenuType } from 'net.minecraft.world.inventory';
  import { Optional, UUID } from 'java.util';
  import { Entity } from 'net.minecraft.world.entity';
  import { SavedData } from 'net.minecraft.world.level.saveddata';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { File } from 'java.io';

  class ContraptionHelper {
    static getMountedStorage(contraptionEntity: AbstractContraptionEntity, localPos: BlockPos): MountedStorageBase;
  }


  interface CreateCompat extends ICompat {}
  class CreateCompat extends ICompat {
    init(modBus: IEventBus): void;
    registerPayloads(event: RegisterPayloadHandlersEvent): void;
    setup(): void;
  }


  interface MountedStorageBase extends SyncedMountedStorage, MountedItemStorage {}
  class MountedStorageBase extends SyncedMountedStorage {
    constructor(type: MountedItemStorageType<any>, storageStack: ItemStack);
    afterSync(contraption: Contraption, localPos: BlockPos): void;
    extractItem(i: number, i1: number, b: boolean): ItemStack;
    get slots(): number;
    get storageStack(): ItemStack;
    get storageWrapper(): IStorageWrapper;
    getSlotLimit(i: number): number;
    getStackInSlot(i: number): ItemStack;
    insertItem(i: number, itemStack: ItemStack, b: boolean): ItemStack;
    isDirty(): boolean;
    isItemValid(i: number, itemStack: ItemStack): boolean;
    markClean(): void;
    onClose(player: Player, pos: Vec3): void;
    set storageStack(stack: ItemStack);
    setStackInSlot(i: number, itemStack: ItemStack): void;
    updateWithSyncedStorageStack(var1: ItemStack, var2: boolean): void;
  }


  interface MountedStorageContainerMenuBase extends StorageContainerMenuBase<IStorageWrapper> {}
  class MountedStorageContainerMenuBase extends StorageContainerMenuBase<IStorageWrapper> {
    constructor(menuType: MenuType<any>, containerId: number, player: Player, parentStorageWrapper: IStorageWrapper, storageItemSlotIndex: number, shouldLockStorageItemSlot: boolean, contraptionEntityId: number, localPos: BlockPos);

    constructor(menuType: MenuType<any>, containerId: number, player: Player, wrapper: IStorageWrapper, parentStorageWrapper: IStorageWrapper, storageItemSlotIndex: number, shouldLockStorageItemSlot: boolean, contraptionEntityId: number, localPos: BlockPos);
    detectSettingsChangeAndReload(): boolean;
    get blockPosition(): Optional<BlockPos>;
    get contraptionEntity(): Optional<AbstractContraptionEntity>;
    get entity(): Optional<Entity>;
    get localPos(): BlockPos;
    openSettings(): void;
    removed(player: Player): void;
    stillValid(player: Player): boolean;
  }


  interface MountedStorageData extends IStorageSavedData, SavedData {}
  class MountedStorageData extends IStorageSavedData {
    static get(storageId: UUID): MountedStorageData;
    get contents(): CompoundTag;
    static load(nbt: CompoundTag, registries: Provider): MountedStorageData;
    markChanged(): void;
    removeStorageContents(): void;
    removeUpdatedStorageSettingsFlag(backpackUuid: UUID): boolean;
    save(compound: CompoundTag, registries: Provider): CompoundTag;
    save(file: File, registries: Provider): void;
    set contents(contents: CompoundTag);
    setContents(storageUuid: UUID, contents: CompoundTag): void;
  }


  interface MountedStorageSettingsContainerMenuBase extends SettingsContainerMenu<IStorageWrapper> {}
  class MountedStorageSettingsContainerMenuBase extends SettingsContainerMenu<IStorageWrapper> {
    constructor(menuType: MenuType<any>, windowId: number, player: Player, storageWrapper: IStorageWrapper, contraptionEntityId: number, localPos: BlockPos);
    broadcastChanges(): void;
    detectSettingsChangeAndReload(): void;
    get blockPosition(): BlockPos;
    get contraptionEntityId(): number;
    get localPos(): BlockPos;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.compat.curios' {
  import { ICompat } from 'net.p3pp3rf1y.sophisticatedcore.compat';

  interface CuriosCompat extends ICompat {}
  class CuriosCompat extends ICompat {
    setup(): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.compat.ftbchunks' {
  import { ICompat } from 'net.p3pp3rf1y.sophisticatedcore.compat';

  interface FTBChunksCompat extends ICompat {}
  class FTBChunksCompat extends ICompat {
    setup(): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.compat.inventorysorter' {
  import { ICompat } from 'net.p3pp3rf1y.sophisticatedcore.compat';
  import { IEventBus } from 'net.neoforged.bus.api';

  interface InventorySorterCompat extends ICompat {}
  class InventorySorterCompat extends ICompat {
    init(modBus: IEventBus): void;
    setup(): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.compat.itemborders' {
  import { ICompat } from 'net.p3pp3rf1y.sophisticatedcore.compat';

  interface ItemBordersCompat extends ICompat {}
  class ItemBordersCompat extends ICompat {
    setup(): void;
  }


  class ItemBordersCompatClient {
    static registerBorderDecorationRenderer(): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.compat.mousetweaks' {
  import { ICompat } from 'net.p3pp3rf1y.sophisticatedcore.compat';

  interface MouseTweaksCompat extends ICompat {}
  class MouseTweaksCompat extends ICompat {
    setup(): void;
  }


  class MouseTweaksCompatClient {
    static restrictSophisticatedScrollInteraction(): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.compat.openpartiesandclaims' {
  import { ICompat } from 'net.p3pp3rf1y.sophisticatedcore.compat';

  interface OpenPACCompat extends ICompat {}
  class OpenPACCompat extends ICompat {
    setup(): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.compat.recipeviewers.common' {
  import { List, Map } from 'java.util';
  import { RecipeType, RecipeInput, Recipe } from 'net.minecraft.world.item.crafting';
  import { Class, Integer } from 'java.lang';
  import { BiFunction, Function } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ItemStack } from 'net.minecraft.world.item';
  import { PayloadRegistrar } from 'net.neoforged.neoforge.network.registration';
  import { Player } from 'net.minecraft.world.entity.player';

  class ClientRecipeHelper {
    static assemble<I extends RecipeInput>(recipe: Recipe<I>, container: I): ItemStack;
    static getResultItem<I extends RecipeInput>(recipe: Recipe<I>): ItemStack;
    static transformAllRecipesOfType<I extends RecipeInput, T extends Recipe<I>, U extends Recipe<any>, V>(recipeType: RecipeType<T>, filterRecipeClass: Class<U>, transformRecipe: BiFunction<ResourceLocation, U, V>): V[];
    static transformAllRecipesOfTypeIntoMultiple<I extends RecipeInput, T extends Recipe<I>, U extends Recipe<any>, V>(recipeType: RecipeType<T>, filterRecipeClass: Class<U>, transformRecipe: Function<U, V[]>): V[];
  }


  class CommonPayloads {
    static registerPackets(registrar: PayloadRegistrar): void;
  }


  class CraftingContainerRecipeTransferHandlerServer {
    static setItemsWithSlotIDMap(player: Player, recipeId: ResourceLocation, recipeType: RecipeType<any>, slotIdMap: Map<number, number>, craftingSlots: number[], inventorySlots: number[], maxTransfer: boolean): void;
    static setItemsWithStacks(player: Player, recipeId: ResourceLocation, recipeType: RecipeType<any>, stacks: ItemStack[], craftingSlots: number[], inventorySlots: number[], maxTransfer: boolean): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.compat.recipeviewers.common.subtypes' {
  import { IPropertyValueGetter } from 'net.p3pp3rf1y.sophisticatedcore.compat.recipeviewers.common.subtypes.PropertyBasedSubtypeInterpreter';
  import { Function } from 'java.util.function';
  import { ItemStack } from 'net.minecraft.world.item';

  class PropertyBasedSubtypeInterpreter {
    addProperty<T>(propertyGetter: IPropertyValueGetter<T>, propertyName: string, propertyValueSerializer: Function<T, string>): void;
    getComparableData(stack: ItemStack): any;
    getRegistrySanitizedItemString(stack: ItemStack): string;
  }


  interface PropertyBasedSubtypeInterpreterWrapper extends PropertyBasedSubtypeInterpreter {}
  class PropertyBasedSubtypeInterpreterWrapper extends PropertyBasedSubtypeInterpreter {
    constructor(wrapped: PropertyBasedSubtypeInterpreter);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.compat.recipeviewers.common.subtypes.PropertyBasedSubtypeInterpreter' {
  import { ItemStack } from 'net.minecraft.world.item';

  class IPropertyValueGetter<T = any> {
    getPropertyValue(var1: ItemStack): T;
  }


  class IPropertyDefinition<T = any> {
    get propertyName(): string;
    getPropertyValue(var1: ItemStack): T;
    serializePropertyValue(var1: T): string;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.compat.recipeviewers.emi.comparison' {
  import { Comparison } from 'dev.emi.emi.api.stack';
  import { PropertyBasedSubtypeInterpreter } from 'net.p3pp3rf1y.sophisticatedcore.compat.recipeviewers.common.subtypes';

  class EmiSubtypeInterpreter {
    static of(wrapped: PropertyBasedSubtypeInterpreter): Comparison;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.compat.recipeviewers.emi' {
  import { EmiPlugin, EmiRegistry, EmiDragDropHandler } from 'dev.emi.emi.api';
  import { EmiCraftingRecipe, EmiRecipe } from 'dev.emi.emi.api.recipe';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { CraftingRecipe } from 'net.minecraft.world.item.crafting';
  import { ICompat } from 'net.p3pp3rf1y.sophisticatedcore.compat';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { StandardRecipeHandler, EmiCraftContext } from 'dev.emi.emi.api.recipe.handler';
  import { StorageContainerMenuBase } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { List } from 'java.util';
  import { Slot } from 'net.minecraft.world.inventory';
  import { SlotBased } from 'EmiDragDropHandler';
  import { EmiIngredient } from 'dev.emi.emi.api.stack';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface CoreEmiPlugin extends EmiPlugin {}
  class CoreEmiPlugin extends EmiPlugin {
    register(registry: EmiRegistry): void;
  }


  class EmiClientRecipeHelper {
    static wrapSyntheticShapedRecipe(id: ResourceLocation, recipe: CraftingRecipe): EmiCraftingRecipe;
    static wrapSyntheticShapelessRecipe(id: ResourceLocation, recipe: CraftingRecipe): EmiCraftingRecipe;
  }


  interface EmiCompat extends ICompat {}
  class EmiCompat extends ICompat {
    init(modBus: IEventBus): void;
    setup(): void;
  }


  interface EmiGridMenuInfo<C extends StorageContainerMenuBase<any> = any> extends StandardRecipeHandler<C> {}
  class EmiGridMenuInfo<C extends StorageContainerMenuBase<any> = any> extends StandardRecipeHandler<C> {
    canCraft(recipe: EmiRecipe, context: EmiCraftContext<C>): boolean;
    craft(recipe: EmiRecipe, context: EmiCraftContext<C>): boolean;
    static crafting<C extends StorageContainerMenuBase<any>>(): EmiGridMenuInfo<C>;
    getCraftingSlots(handler: C): Slot[];
    getInputSources(handler: C): Slot[];
    getOutputSlot(handler: C): Slot;
    static smithing<C extends StorageContainerMenuBase<any>>(): EmiGridMenuInfo<C>;
    supportsRecipe(recipe: EmiRecipe): boolean;
  }


  interface EmiSettingsGhostDragDropHandler<T extends SettingsScreen = any> extends SlotBased<T> {}
  class EmiSettingsGhostDragDropHandler<T extends SettingsScreen = any> extends SlotBased<T> {
    constructor();
  }


  interface EmiStorageGhostDragDropHandler<T extends StorageScreenBase<any> = any> extends EmiDragDropHandler<T> {}
  class EmiStorageGhostDragDropHandler<T extends StorageScreenBase<any> = any> extends EmiDragDropHandler<T> {
    dropStack(screen: T, stack: EmiIngredient, x: number, y: number): boolean;
    render(screen: T, dragged: EmiIngredient, draw: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.compat.recipeviewers.jei' {
  import { IModPlugin } from 'mezz.jei.api';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IGuiHandlerRegistration, IRecipeRegistration } from 'mezz.jei.api.registration';
  import { RecipeHolder, CraftingRecipe, ShapedRecipe, ShapelessRecipe } from 'net.minecraft.world.item.crafting';
  import { ICompat } from 'net.p3pp3rf1y.sophisticatedcore.compat';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { IRecipeTransferHandler, IRecipeTransferError } from 'mezz.jei.api.recipe.transfer';
  import { Optional, List } from 'java.util';
  import { MenuType } from 'net.minecraft.world.inventory';
  import { IRecipeSlotsView } from 'mezz.jei.api.gui.ingredient';
  import { Player } from 'net.minecraft.world.entity.player';
  import { IGhostIngredientHandler } from 'mezz.jei.api.gui.handlers';
  import { Target } from 'IGhostIngredientHandler';
  import { ITypedIngredient } from 'mezz.jei.api.ingredients';
  import { Advanced } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.pump.PumpUpgradeTab';
  import { FluidStack } from 'net.neoforged.neoforge.fluids';

  interface CoreJeiPlugin extends IModPlugin {}
  class CoreJeiPlugin extends IModPlugin {
    get pluginUid(): ResourceLocation;
    registerGuiHandlers(registration: IGuiHandlerRegistration): void;
    registerRecipes(registration: IRecipeRegistration): void;
  }


  class JeiClientRecipeHelper {
    static copyShapedRecipeWithRecipeHolder(id: ResourceLocation, recipe: ShapedRecipe): RecipeHolder<CraftingRecipe>;
    static copyShapelessRecipeWithRecipeHolder(id: ResourceLocation, recipe: ShapelessRecipe): RecipeHolder<CraftingRecipe>;
  }


  interface JeiCompat extends ICompat {}
  class JeiCompat extends ICompat {
    init(modBus: IEventBus): void;
    setup(): void;
  }


  interface JeiCraftingContainerRecipeTransferHandlerBase<C extends StorageContainerMenuBase<any> = any, R extends RecipeHolder<Recipe<any>> = any> extends IRecipeTransferHandler<C, R> {}
  class JeiCraftingContainerRecipeTransferHandlerBase<C extends StorageContainerMenuBase<any> = any, R extends RecipeHolder<Recipe<any>> = any> extends IRecipeTransferHandler<C, R> {
    get menuType(): Optional<MenuType<C>>;
    transferRecipe(container: C, recipe: R, recipeSlots: IRecipeSlotsView, player: Player, maxTransfer: boolean, doTransfer: boolean): IRecipeTransferError;
  }


  interface JeiSettingsGhostIngredientHandler<S extends SettingsScreen = any> extends IGhostIngredientHandler<S> {}
  class JeiSettingsGhostIngredientHandler<S extends SettingsScreen = any> extends IGhostIngredientHandler<S> {
    getTargetsTyped<I>(gui: S, ingredient: ITypedIngredient<I>, doStart: boolean, i: I): Target<I>[];
    onComplete(): void;
  }


  interface JeiStorageGhostIngredientHandler<S extends StorageScreenBase<any> = any> extends IGhostIngredientHandler<S> {}
  class JeiStorageGhostIngredientHandler<S extends StorageScreenBase<any> = any> extends IGhostIngredientHandler<S> {
    addFluidTargets<I>(pumpUpgradeTab: Advanced, ghostFluid: FluidStack, targets: Target<I>[], i: I): void;
    getTargetsTyped<I>(gui: S, ingredient: ITypedIngredient<I>, doStart: boolean, i: I): Target<I>[];
    onComplete(): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.compat.recipeviewers.jei.subtypes' {
  import { PropertyBasedSubtypeInterpreterWrapper, PropertyBasedSubtypeInterpreter } from 'net.p3pp3rf1y.sophisticatedcore.compat.recipeviewers.common.subtypes';
  import { ISubtypeInterpreter, UidContext } from 'mezz.jei.api.ingredients.subtypes';
  import { ItemStack } from 'net.minecraft.world.item';

  interface JeiSubtypeInterpreter extends ISubtypeInterpreter<ItemStack>, PropertyBasedSubtypeInterpreterWrapper {}
  class JeiSubtypeInterpreter extends ISubtypeInterpreter<ItemStack> {
    getLegacyStringSubtypeInfo(itemStack: ItemStack, context: UidContext): string;
    getSubtypeData(ingredient: ItemStack, context: UidContext): any;
    static of(wrapped: PropertyBasedSubtypeInterpreter): JeiSubtypeInterpreter;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.compat.recipeviewers.rei.comparator' {
  import { PropertyBasedSubtypeInterpreterWrapper, PropertyBasedSubtypeInterpreter } from 'net.p3pp3rf1y.sophisticatedcore.compat.recipeviewers.common.subtypes';
  import { EntryComparator, ComparisonContext } from 'me.shedaniel.rei.api.common.entry.comparison';
  import { ItemStack } from 'net.minecraft.world.item';

  interface ReiSubtypeInterpreter extends EntryComparator<ItemStack>, PropertyBasedSubtypeInterpreterWrapper {}
  class ReiSubtypeInterpreter extends EntryComparator<ItemStack> {
    hash(context: ComparisonContext, stack: ItemStack): number;
    static of(wrapped: PropertyBasedSubtypeInterpreter): ReiSubtypeInterpreter;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.compat.recipeviewers.rei' {
  import { REIServerPlugin } from 'me.shedaniel.rei.api.common.plugins';
  import { SlotAccessorRegistry, SlotAccessor } from 'me.shedaniel.rei.api.common.transfer.info.stack';
  import { AbstractContainerMenu, Slot } from 'net.minecraft.world.inventory';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ICompat } from 'net.p3pp3rf1y.sophisticatedcore.compat';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { SimpleTransferHandler } from 'me.shedaniel.rei.api.client.registry.transfer.simple';
  import { Class, Iterable } from 'java.lang';
  import { CategoryIdentifier } from 'me.shedaniel.rei.api.common.category';
  import { RecipeType, Recipe } from 'net.minecraft.world.item.crafting';
  import { TransferHandler } from 'me.shedaniel.rei.api.client.registry.transfer';
  import { StorageContainerMenuBase } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { ApplicabilityResult, Context, Result } from 'TransferHandler';
  import { BoundsProvider } from 'DraggableStackVisitor';
  import { DraggableStackVisitor, DraggedAcceptorResult, DraggingContext, DraggableStack } from 'me.shedaniel.rei.api.client.gui.drag';
  import { Stream } from 'java.util.stream';
  import { VoxelShape } from 'net.minecraft.world.phys.shapes';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ItemStack } from 'net.minecraft.world.item';

  interface CoreReiCommonPlugin extends REIServerPlugin {}
  class CoreReiCommonPlugin extends REIServerPlugin {
    read(menu: AbstractContainerMenu, player: Player, tag: CompoundTag): SlotAccessor;
    registerSlotAccessors(registry: SlotAccessorRegistry): void;
    save(menu: AbstractContainerMenu, player: Player, accessor: SlotAccessor): CompoundTag;
  }


  interface ReiCompat extends ICompat {}
  class ReiCompat extends ICompat {
    init(modBus: IEventBus): void;
    setup(): void;
  }


  interface ReiCraftingContainerTransferHandler<C extends StorageContainerMenuBase<any> = any, D extends Display = any> extends SimpleTransferHandler {}
  class ReiCraftingContainerTransferHandler<C extends StorageContainerMenuBase<any> = any, D extends Display = any> extends SimpleTransferHandler {
    constructor(containerClass: Class<C>, categoryIdentifier: CategoryIdentifier<D>, recipeType: RecipeType<Recipe<any>>);
    checkApplicable(context: Context): ApplicabilityResult;
    static crafting<C extends StorageContainerMenuBase<any>>(containerClass: Class<C>): TransferHandler;
    getInputSlots(context: Context): Iterable<SlotAccessor>;
    getInventorySlots(context: Context): Iterable<SlotAccessor>;
    handle(context: Context): Result;
    static smithing<C extends StorageContainerMenuBase<any>>(containerClass: Class<C>): TransferHandler;
  }


  interface ReiGhostTarget extends BoundsProvider {}
  class ReiGhostTarget extends BoundsProvider {
    accept(): void;
    contains(x: number, y: number): boolean;
  }


  interface ReiSettingsGhostIngredientHandler<S extends SettingsScreen = any> extends DraggableStackVisitor<S> {}
  class ReiSettingsGhostIngredientHandler<S extends SettingsScreen = any> extends DraggableStackVisitor<S> {
    constructor(handingScreenClass: Class<S>);
    accept(): void;
    acceptDraggedStack(context: DraggingContext<S>, stack: DraggableStack): DraggedAcceptorResult;
    bounds(): VoxelShape;
    getDraggableAcceptingBounds(context: DraggingContext<S>, stack: DraggableStack): Stream<BoundsProvider>;
    isHandingScreen<R extends Screen>(screen: R): boolean;
  }


  interface ReiSlotAccessor extends SlotAccessor {}
  class ReiSlotAccessor extends SlotAccessor {
    constructor(slot: Slot);
    static fromSlot(slot: Slot): SlotAccessor;
    get index(): number;
    get itemStack(): ItemStack;
    set itemStack(stack: ItemStack);
    takeStack(amount: number): ItemStack;
  }


  interface ReiStorageGhostIngredientHandler<S extends StorageScreenBase<any> = any> extends DraggableStackVisitor<S> {}
  class ReiStorageGhostIngredientHandler<S extends StorageScreenBase<any> = any> extends DraggableStackVisitor<S> {
    constructor(handingScreenClass: Class<S>);
    accept(): void;
    accept(): void;
    acceptDraggedStack(context: DraggingContext<S>, stack: DraggableStack): DraggedAcceptorResult;
    bounds(): VoxelShape;
    bounds(): VoxelShape;
    getDraggableAcceptingBounds(context: DraggingContext<S>, stack: DraggableStack): Stream<BoundsProvider>;
    isHandingScreen<R extends Screen>(screen: R): boolean;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.compat.reliquary' {
  import { ICompat } from 'net.p3pp3rf1y.sophisticatedcore.compat';

  interface ReliquaryCompat extends ICompat {}
  class ReliquaryCompat extends ICompat {
    setup(): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.compat.sawmill' {
  import { BlockConverterRecipeContainer, BlockConverterRecipeControl, BlockConverterUpgradeContainer, BlockConverterUpgradeItem, BlockConverterUpgradeTab } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.blockconverter';
  import { WoodcuttingRecipe } from 'net.mehvahdjukaar.sawmill';
  import { Consumer } from 'java.util.function';
  import { Slot, ContainerLevelAccess } from 'net.minecraft.world.inventory';
  import { IServerUpdater, UpgradeContainerType } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Wrapper } from 'net.p3pp3rf1y.sophisticatedcore.compat.sawmill.SawmillUpgradeItem';
  import { IUpgradeCountLimitConfig, UpgradeType } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { Toggle } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls.ButtonDefinition';
  import { Boolean } from 'java.lang';

  interface SawmillRecipeContainer extends BlockConverterRecipeContainer<WoodcuttingRecipe, Wrapper, SawmillRecipeContainer, SawmillUpgradeContainer> {}
  class SawmillRecipeContainer extends BlockConverterRecipeContainer<WoodcuttingRecipe, Wrapper, SawmillRecipeContainer, SawmillUpgradeContainer> {
    constructor(upgradeContainer: SawmillUpgradeContainer, addSlot: Consumer<Slot>, serverUpdater: IServerUpdater, worldPosCallable: ContainerLevelAccess, level: Level);
  }


  interface SawmillRecipeControl extends BlockConverterRecipeControl<WoodcuttingRecipe, SawmillRecipeContainer> {}
  class SawmillRecipeControl extends BlockConverterRecipeControl<WoodcuttingRecipe, SawmillRecipeContainer> {
  }


  interface SawmillUpgradeContainer extends BlockConverterUpgradeContainer<WoodcuttingRecipe, Wrapper, SawmillUpgradeContainer, SawmillRecipeContainer> {}
  class SawmillUpgradeContainer extends BlockConverterUpgradeContainer<WoodcuttingRecipe, Wrapper, SawmillUpgradeContainer, SawmillRecipeContainer> {
    constructor(player: Player, upgradeContainerId: number, upgradeWrapper: Wrapper, type: UpgradeContainerType<Wrapper, SawmillUpgradeContainer>);
  }


  interface SawmillUpgradeItem extends BlockConverterUpgradeItem<SawmillUpgradeItem, Wrapper> {}
  class SawmillUpgradeItem extends BlockConverterUpgradeItem<SawmillUpgradeItem, Wrapper> {
    constructor(upgradeTypeLimitConfig: IUpgradeCountLimitConfig);
    get type(): UpgradeType<Wrapper>;
  }


  interface SawmillUpgradeTab extends BlockConverterUpgradeTab<WoodcuttingRecipe, SawmillRecipeContainer, SawmillUpgradeContainer> {}
  class SawmillUpgradeTab extends BlockConverterUpgradeTab<WoodcuttingRecipe, SawmillRecipeContainer, SawmillUpgradeContainer> {
    constructor(upgradeContainer: SawmillUpgradeContainer, position: Position, screen: StorageScreenBase<any>, shiftClickTargetButton: Toggle<boolean>);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.compat.sawmill.SawmillUpgradeItem' {
  import { BlockConverterUpgradeWrapper } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.blockconverter';
  import { SawmillUpgradeItem } from 'net.p3pp3rf1y.sophisticatedcore.compat.sawmill';

  interface Wrapper extends BlockConverterUpgradeWrapper<SawmillUpgradeItem, Wrapper> {}
  class Wrapper extends BlockConverterUpgradeWrapper<SawmillUpgradeItem, Wrapper> {
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.compat.trashslot' {
  import { SimpleGuiContainerLayout } from 'net.blay09.mods.trashslot.client.gui.layout';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { List, Set } from 'java.util';
  import { Snap, SlotRenderStyle } from 'net.blay09.mods.trashslot.api';
  import { Rect2i } from 'net.minecraft.client.renderer';
  import { ICompat } from 'net.p3pp3rf1y.sophisticatedcore.compat';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { Class } from 'java.lang';

  interface SophisticatedContainerLayout extends SimpleGuiContainerLayout {}
  class SophisticatedContainerLayout extends SimpleGuiContainerLayout {
    static readonly INSTANCE: SophisticatedContainerLayout;
    static readonly PLAYER_INVENTORY_WIDTH: number;
    static readonly HEIGHT_OF_PLAYER_INVENTORY_STICKING_OUT: number;
    getCollisionAreas(screen: AbstractContainerScreen<any>): Rect2i[];
    getContainerId(screen: AbstractContainerScreen<any>): string;
    getDefaultSlotX(screen: AbstractContainerScreen<any>): number;
    getDefaultSlotY(screen: AbstractContainerScreen<any>): number;
    getSlotRenderStyle(screen: AbstractContainerScreen<any>, slotX: number, slotY: number): SlotRenderStyle;
    getSnaps(screen: AbstractContainerScreen<any>, renderStyle: SlotRenderStyle): Snap[];
  }


  interface TrashSlotCompat extends ICompat {}
  class TrashSlotCompat extends ICompat {
    init(modBus: IEventBus): void;
    setup(): void;
  }


  class TrashSlotScreenRegistry {
    static get registeredScreens(): Set<Class<AbstractContainerScreen<any>>>;
    static registerScreen(screenClass: Class<AbstractContainerScreen<any>>): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore' {
  import { Client, Common } from 'net.p3pp3rf1y.sophisticatedcore.Config';
  import { ModConfigSpec } from 'net.neoforged.neoforge.common';
  import { Logger } from 'org.apache.logging.log4j';
  import { CommonEventHandler } from 'net.p3pp3rf1y.sophisticatedcore.common';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { Dist } from 'net.neoforged.api.distmarker';
  import { ModContainer } from 'net.neoforged.fml';
  import { ResourceLocation } from 'net.minecraft.resources';

  class Config {
    static readonly CLIENT: Client;
    static readonly CLIENT_SPEC: ModConfigSpec;
    static readonly COMMON: Common;
    static readonly COMMON_SPEC: ModConfigSpec;
  }


  class SophisticatedCore {
    static readonly MOD_ID: string;
    static readonly LOGGER: Logger;
    readonly commonEventHandler: CommonEventHandler;
    constructor(modBus: IEventBus, dist: Dist, container: ModContainer);
    static getRL(regName: string): ResourceLocation;
    static getRegistryName(regName: string): string;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.Config' {
  import { EnumValue, BooleanValue } from 'ModConfigSpec';
  import { EnabledItems } from 'net.p3pp3rf1y.sophisticatedcore.Config.Common';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { Reloading } from 'ModConfigEvent';

  class Client {
    readonly sortButtonsPosition: EnumValue;
    readonly playButtonSound: BooleanValue;
    readonly mouseTweaksScrollEnabled: BooleanValue;
  }


  class Common {
    readonly enabledItems: EnabledItems;
    initListeners(modBus: IEventBus): void;
    onConfigReload(event: Reloading): void;
    saveIfChanged(): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.Config.Common' {
  import { Item } from 'net.minecraft.world.item';
  import { ResourceLocation } from 'net.minecraft.resources';

  class EnabledItems {
    isItemEnabled(item: Item): boolean;
    isItemEnabled(itemRegistryName: ResourceLocation): boolean;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.controller' {
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { IItemHandlerSimpleInserter, IInsertBlockOverride, ItemStackKey } from 'net.p3pp3rf1y.sophisticatedcore.inventory';
  import { BlockPos } from 'net.minecraft.core';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { ClientboundBlockEntityDataPacket } from 'net.minecraft.network.protocol.game';
  import { Set, List, Optional } from 'java.util';
  import { IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { Level } from 'net.minecraft.world.level';
  import { Consumer } from 'java.util.function';

  interface ControllerBlockEntityBase extends IItemHandlerSimpleInserter, IInsertBlockOverride, BlockEntity {}
  class ControllerBlockEntityBase extends IItemHandlerSimpleInserter {
    addLinkedBlock(linkedPos: BlockPos): boolean;
    addStorage(storagePos: BlockPos): void;
    addStorageMemorizedItem(storagePos: BlockPos, item: Item): void;
    addStorageMemorizedStack(storagePos: BlockPos, stackHash: number): void;
    addStorageStack(storagePos: BlockPos, itemStackKey: ItemStackKey): void;
    addStorageStacksAndRegisterListeners(storagePos: BlockPos): void;
    addStorageWithEmptySlots(storageBlockPos: BlockPos): void;
    changeSlots(storagePos: BlockPos, newSlots: number, hasEmptySlots: boolean): void;
    clearCachedHandler(storagePos: BlockPos): void;
    detachFromStoragesAndUnlinkBlocks(): void;
    extractItem(slot: number, amount: number, simulate: boolean): ItemStack;
    extractItem(stack: ItemStack, simulate: boolean): ItemStack;
    get linkedBlocks(): Set<BlockPos>;
    get slots(): number;
    get storagePositions(): BlockPos[];
    get updatePacket(): ClientboundBlockEntityDataPacket;
    getSlotLimit(slot: number): number;
    getSlots(storageIndex: number): number;
    getStackInSlot(slot: number): ItemStack;
    getUpdateTag(registries: Provider): CompoundTag;
    hasMatchingItem(item: Item): boolean;
    hasMatchingStack(stackKey: ItemStackKey): boolean;
    insertItem(slot: number, stack: ItemStack, simulate: boolean): ItemStack;
    insertItem(stack: ItemStack, simulate: boolean): ItemStack;
    isInsertBlocked(): boolean;
    isItemValid(slot: number, stack: ItemStack): boolean;
    isStorageConnected(storagePos: BlockPos): boolean;
    loadAdditional(tag: CompoundTag, registries: Provider): void;
    onChunkUnloaded(): void;
    onLoad(): void;
    removeBoundable(boundablePos: BlockPos): void;
    removeLinkedBlock(storageBlockPos: BlockPos): void;
    removeNonConnectingBlock(storagePos: BlockPos): void;
    removeStorage(storagePos: BlockPos): void;
    removeStorageMemorizedItem(storagePos: BlockPos, item: Item): void;
    removeStorageMemorizedStack(storagePos: BlockPos, stackHash: number): void;
    removeStorageStack(storagePos: BlockPos, stackKey: ItemStackKey): void;
    removeStorageStacks(storagePos: BlockPos): void;
    removeStorageWithEmptySlots(storageBlockPos: BlockPos): void;
    searchAndAddBoundables(): void;
    setStackInSlot(slot: number, stack: ItemStack): void;
    setStorageFilterItems(storagePos: BlockPos, filterItems: Set<Item>): void;
    updateEmptySlots(storagePos: BlockPos, hasEmptySlots: boolean): void;
  }


  interface IControllableStorage extends IControllerBoundable {}
  class IControllableStorage extends IControllerBoundable {
    addToController(level: Level, pos: BlockPos, controllerPos: BlockPos): void;
    canConnectStorages(): boolean;
    changeSlots(newSlots: number): void;
    get storageWrapper(): IStorageWrapper;
    hasStorageData(): boolean;
    onInventoryInputOutputHandlerRefresh(): void;
    registerController(controllerBlockEntity: ControllerBlockEntityBase): void;
    registerInventoryStackListeners(): void;
    registerWithControllerOnLoad(): void;
    removeFromController(): void;
    tryToAddToController(): void;
    unregisterController(): void;
    updateEmptySlots(): void;
  }


  class IControllerBoundable {
    static readonly CONTROLLER_POS_TAG: string;
    addToAdjacentController(): void;
    addToController(level: Level, pos: BlockPos, controllerPos: BlockPos): void;
    canBeConnected(): boolean;
    canConnectStorages(): boolean;
    get controllerPos(): Optional<BlockPos>;
    get storageBlockLevel(): Level;
    get storageBlockPos(): BlockPos;
    loadControllerPos(tag: CompoundTag): void;
    registerController(var1: ControllerBlockEntityBase): void;
    removeControllerPos(): void;
    runOnController(level: Level, toRun: Consumer<ControllerBlockEntityBase>): void;
    saveControllerPos(tag: CompoundTag): void;
    set controllerPos(var1: BlockPos);
    unregisterController(): void;
  }


  interface ILinkable extends IControllerBoundable {}
  class ILinkable extends IControllerBoundable {
    canBeLinked(): boolean;
    connectLinkedSelf(): boolean;
    get connectablePositions(): Set<BlockPos>;
    get controllerPos(): Optional<BlockPos>;
    isLinked(): boolean;
    linkToController(controllerPos: BlockPos): void;
    set controllerPos(var1: BlockPos);
    setNotLinked(): void;
    unlinkFromController(): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.crafting' {
  import { RecipeOutput, ShapedRecipeBuilder, ShapelessRecipeBuilder } from 'net.minecraft.data.recipes';
  import { Builder } from 'Advancement';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Recipe, RecipeSerializer, ShapedRecipe, ShapelessRecipe, CustomRecipe, CraftingInput, CraftingBookCategory } from 'net.minecraft.world.item.crafting';
  import { AdvancementHolder } from 'net.minecraft.advancements';
  import { ICondition } from 'net.neoforged.neoforge.common.conditions';
  import { Function } from 'java.util.function';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ItemLike, Level } from 'net.minecraft.world.level';
  import { Provider } from 'HolderLookup';

  interface HoldingRecipeOutput extends RecipeOutput {}
  class HoldingRecipeOutput extends RecipeOutput {
    constructor(advancement: Builder);
    accept(id: ResourceLocation, recipe: Recipe<any>, advancement: AdvancementHolder, ...conditions: ICondition[]): void;
    advancement(): Builder;
    get advancementHolder(): AdvancementHolder;
    get conditions(): ICondition[];
    get recipe(): Recipe<any>;
  }


  class IWrapperRecipe<T extends Recipe<any> = any> {
    get compose(): T;
  }


  interface RecipeWrapperSerializer<T extends Recipe<any> = any, R extends Recipe<any> & IWrapperRecipe<T> = any> extends RecipeSerializer<R> {}
  class RecipeWrapperSerializer<T extends Recipe<any> = any, R extends Recipe<any> & IWrapperRecipe<T> = any> extends RecipeSerializer<R> {
    constructor(initialize: Function<T, R>, recipeSerializer: RecipeSerializer<T>);
    codec(): MapCodec<R>;
    decode(buffer: RegistryFriendlyByteBuf): R;
    encode(pBuffer: RegistryFriendlyByteBuf, pValue: R): void;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, R>;
  }


  interface ShapeBasedRecipeBuilder extends ShapedRecipeBuilder {}
  class ShapeBasedRecipeBuilder extends ShapedRecipeBuilder {
    save(recipeOutput: RecipeOutput): void;
    save(recipeOutput: RecipeOutput, id: ResourceLocation): void;
    static shaped(result: ItemStack): ShapeBasedRecipeBuilder;
    static shaped(result: ItemLike): ShapeBasedRecipeBuilder;
    static shaped(result: ItemLike, factory: Function<ShapedRecipe, ShapedRecipe>): ShapeBasedRecipeBuilder;
    static shaped(result: ItemStack, factory: Function<ShapedRecipe, ShapedRecipe>): ShapeBasedRecipeBuilder;
  }


  interface ShapelessBasedRecipeBuilder extends ShapelessRecipeBuilder {}
  class ShapelessBasedRecipeBuilder extends ShapelessRecipeBuilder {
    constructor(result: ItemStack, factory: Function<ShapelessRecipe, ShapelessRecipe>);

    constructor(result: ItemLike, count: number, factory: Function<ShapelessRecipe, ShapelessRecipe>);
    save(recipeOutput: RecipeOutput, id: ResourceLocation): void;
    static shapeless(result: ItemStack, factory: Function<ShapelessRecipe, ShapelessRecipe>): ShapelessBasedRecipeBuilder;
    static shapeless(result: ItemStack): ShapelessBasedRecipeBuilder;
    static shapeless(result: ItemLike): ShapelessBasedRecipeBuilder;
    static shapeless(result: ItemLike, count: number): ShapelessBasedRecipeBuilder;
    static shapeless(result: ItemLike, factory: Function<ShapelessRecipe, ShapelessRecipe>): ShapelessBasedRecipeBuilder;
    static shapeless(result: ItemLike, count: number, factory: Function<ShapelessRecipe, ShapelessRecipe>): ShapelessBasedRecipeBuilder;
  }


  interface StorageDyeRecipeBase extends CustomRecipe {}
  class StorageDyeRecipeBase extends CustomRecipe {
    assemble(inv: CraftingInput, registries: Provider): ItemStack;
    canCraftInDimensions(width: number, height: number): boolean;
    matches(inv: CraftingInput, worldIn: Level): boolean;
  }


  interface UpgradeClearRecipe extends CustomRecipe {}
  class UpgradeClearRecipe extends CustomRecipe {
    constructor(category: CraftingBookCategory);
    assemble(inventory: CraftingInput, registries: Provider): ItemStack;
    canCraftInDimensions(width: number, height: number): boolean;
    get serializer(): RecipeSerializer<any>;
    matches(inventory: CraftingInput, level: Level): boolean;
  }


  interface UpgradeNextTierRecipe extends IWrapperRecipe<ShapedRecipe>, ShapedRecipe {}
  class UpgradeNextTierRecipe extends IWrapperRecipe<ShapedRecipe> {
    constructor(compose: ShapedRecipe);
    assemble(inv: CraftingInput, registries: Provider): ItemStack;
    get compose(): ShapedRecipe;
    get serializer(): RecipeSerializer<any>;
    isSpecial(): boolean;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.crafting.UpgradeNextTierRecipe' {
  import { RecipeWrapperSerializer, UpgradeNextTierRecipe } from 'net.p3pp3rf1y.sophisticatedcore.crafting';
  import { ShapedRecipe } from 'net.minecraft.world.item.crafting';

  interface Serializer extends RecipeWrapperSerializer<ShapedRecipe, UpgradeNextTierRecipe> {}
  class Serializer extends RecipeWrapperSerializer<ShapedRecipe, UpgradeNextTierRecipe> {
    constructor();
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.data' {
  import { GatherDataEvent } from 'net.neoforged.neoforge.data.event';
  import { FluidTagsProvider } from 'net.minecraft.data.tags';
  import { PackOutput } from 'net.minecraft.data';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';
  import { ExistingFileHelper } from 'net.neoforged.neoforge.common.data';
  import { RecipeProvider } from 'net.minecraft.data.recipes';

  class DataGenerators {
    static gatherData(evt: GatherDataEvent): void;
  }


  interface SCFluidTagsProvider extends FluidTagsProvider {}
  class SCFluidTagsProvider extends FluidTagsProvider {
    constructor(output: PackOutput, provider: CompletableFuture<Provider>, existingFileHelper: ExistingFileHelper);
  }


  interface SCRecipeProvider extends RecipeProvider {}
  class SCRecipeProvider extends RecipeProvider {
    constructor(packOutput: PackOutput, registries: CompletableFuture<Provider>);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.init' {
  import { Supplier } from 'java.util.function';
  import { DeferredHolder, DeferredRegister } from 'net.neoforged.neoforge.registries';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { TagKey } from 'net.minecraft.tags';
  import { RegisterPayloadHandlersEvent } from 'net.neoforged.neoforge.network.event';

  class ModCompat {
    static register(): void;
  }


  class ModCoreDataComponents {
    static readonly NUMBER_OF_INVENTORY_SLOTS: Supplier;
    static readonly NUMBER_OF_UPGRADE_SLOTS: Supplier;
    static readonly MAIN_COLOR: Supplier;
    static readonly ACCENT_COLOR: Supplier;
    static readonly STORAGE_UUID: Supplier;
    static readonly OPEN_TAB_ID: Supplier;
    static readonly SORT_BY: Supplier;
    static readonly RENDER_INFO_TAG: Supplier;
    static readonly SHIFT_CLICK_INTO_STORAGE: Supplier;
    static readonly REFILL_CRAFTING_GRID: Supplier;
    static readonly INPUT_ITEM: Supplier;
    static readonly RESULT_ITEM: Supplier;
    static readonly ENERGY_STORED: Supplier;
    static readonly COMPACT_NON_UNCRAFTABLE: Supplier;
    static readonly SHOULD_WORK_IN_GUI: Supplier;
    static readonly COOKING_INVENTORY: Supplier;
    static readonly BURN_TIME_FINISH: Supplier;
    static readonly BURN_TIME_TOTAL: Supplier;
    static readonly COOK_TIME_FINISH: Supplier;
    static readonly COOK_TIME_TOTAL: Supplier;
    static readonly IS_COOKING: Supplier;
    static readonly FEED_AT_HUNGER_LEVEL: Supplier;
    static readonly FEED_IMMEDIATELY_WHEN_HURT: Supplier;
    static readonly DIRECTION: Supplier;
    static readonly IS_PLAYING: Supplier;
    static readonly PICKUP_ITEMS: Supplier;
    static readonly PICKUP_XP: Supplier;
    static readonly FLUID_FILTERS: Supplier;
    static readonly IS_INPUT: Supplier;
    static readonly INTERACT_WITH_HAND: Supplier;
    static readonly INTERACT_WITH_WORLD: Supplier;
    static readonly INTERACT_WITH_FLUID_HANDLERS: Supplier;
    static readonly RECIPE_ID: Supplier;
    static readonly FLUID_CONTENTS: Supplier;
    static readonly LEGACY_SHOULD_VOID_OVERFLOW: Supplier;
    static readonly VOID_TYPE: Supplier;
    static readonly AUTOMATION_DIRECTION: Supplier;
    static readonly LEVEL: Supplier;
    static readonly LEVELS_TO_STORE: Supplier;
    static readonly LEVELS_TO_TAKE: Supplier;
    static readonly MEND_ITEMS: Supplier;
    static readonly FILTER_ATTRIBUTES: DeferredHolder;
    static readonly INPUT_FILTER_ATTRIBUTES: DeferredHolder;
    static readonly FUEL_FILTER_ATTRIBUTES: DeferredHolder;
    static readonly ALCHEMY_FILTER_ATTRIBUTES: Supplier;
    static readonly ENABLED: Supplier;
    static readonly REPEAT_MODE: Supplier;
    static readonly SHUFFLE: Supplier;
    static readonly DISC_SLOT_ACTIVE: Supplier;
    static readonly DISC_FINISH_TIME: Supplier;
    static readonly MATCH_ALL_EFFECTS: Supplier;
    static readonly MATCH_EFFECT_DURATION: Supplier;
    static readonly MATCH_EFFECT_AMPLIFIER: Supplier;
    static readonly ENTITY_MATCH: Supplier;
    static readonly RECIPES_USED: Supplier;
    static readonly STORED_XP: Supplier;
    static readonly LENIENT_CONTAINER: Supplier;
    static register(modBus: IEventBus): void;
  }


  class ModFluids {
    static readonly EXPERIENCE_TAG_NAME: ResourceLocation;
    static readonly EXPERIENCE_TAG: TagKey;
    static readonly FLUIDS: DeferredRegister;
    static readonly FLUID_TYPES: DeferredRegister;
    static readonly XP_STILL: Supplier;
    static readonly XP_FLOWING: Supplier;
    static readonly XP_FLUID_TYPE: Supplier;
    static readonly ITEMS: DeferredRegister;
    static readonly XP_BUCKET: Supplier;
    static readonly CREATIVE_MODE_TABS: DeferredRegister;
    static readonly CREATIVE_TAB: Supplier;
    static registerHandlers(modBus: IEventBus): void;
  }


  class ModParticles {
    static readonly JUKEBOX_NOTE: Supplier;
    static registerParticles(modBus: IEventBus): void;
  }


  class ModPayloads {
    static registerPayloads(event: RegisterPayloadHandlersEvent): void;
  }


  class ModRecipes {
    static readonly UPGRADE_NEXT_TIER_SERIALIZER: Supplier;
    static readonly UPGRADE_CLEAR_SERIALIZER: Supplier;
    static readonly ITEM_ENABLED_CONDITION: Supplier;
    static registerHandlers(modBus: IEventBus): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.inventory' {
  import { IItemHandlerModifiable, IItemHandler, ItemStackHandler } from 'net.neoforged.neoforge.items';
  import { Supplier, LongSupplier, BiConsumer, BiPredicate, IntFunction, IntConsumer, Consumer, BooleanSupplier, BiFunction, UnaryOperator, Function } from 'java.util.function';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { List, Set, Map, Optional, UUID } from 'java.util';
  import { FilterLogic } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { TriFunction } from 'org.apache.commons.lang3.function';
  import { Integer, Boolean, Runnable, Class } from 'java.lang';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Pair } from 'com.mojang.datafixers.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Provider } from 'HolderLookup';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { MemorySettingsCategory } from 'net.p3pp3rf1y.sophisticatedcore.settings.memory';
  import { SlotValueMap, SlotRange } from 'net.p3pp3rf1y.sophisticatedcore.util';
  import { IItemHandlerInserter, IItemHandlerExtractor } from 'net.p3pp3rf1y.sophisticatedcore.inventory.ISlotTracker';
  import { IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { Factory } from 'net.p3pp3rf1y.sophisticatedcore.inventory.IInventoryPartHandler';
  import { Post } from 'ServerTickEvent';
  import { MutableDataComponentHolder } from 'net.neoforged.neoforge.common';
  import { DataComponentType } from 'net.minecraft.core.component';
  import { ItemContainerContents } from 'net.minecraft.world.item.component';

  interface CachedFailedInsertInventoryHandler<T extends IItemHandlerModifiable & IInsertBlockOverride = any> extends IItemHandlerModifiable, IInsertBlockOverride {}
  class CachedFailedInsertInventoryHandler<T extends IItemHandlerModifiable & IInsertBlockOverride = any> extends IItemHandlerModifiable {
    constructor(wrappedHandlerGetter: Supplier<T>, timeSupplier: LongSupplier);
    extractItem(slot: number, amount: number, simulate: boolean): ItemStack;
    get slots(): number;
    getSlotLimit(slot: number): number;
    getStackInSlot(slot: number): ItemStack;
    insertItem(slot: number, stack: ItemStack, simulate: boolean): ItemStack;
    isInsertBlocked(): boolean;
    isItemValid(slot: number, stack: ItemStack): boolean;
    setStackInSlot(slot: number, stack: ItemStack): void;
  }


  interface FilteredItemHandler<T extends IItemHandler = any> extends IItemHandler, IItemHandlerSimpleInserter {}
  class FilteredItemHandler<T extends IItemHandler = any> extends IItemHandler {
    constructor(inventoryHandler: T, inputFilters: FilterLogic[], outputFilters: FilterLogic[]);
    extractItem(slot: number, amount: number, simulate: boolean): ItemStack;
    get slots(): number;
    getSlotLimit(slot: number): number;
    getStackInSlot(slot: number): ItemStack;
    insertItem(slot: number, stack: ItemStack, simulate: boolean): ItemStack;
    insertItem(stack: ItemStack, simulate: boolean): ItemStack;
    isItemValid(slot: number, stack: ItemStack): boolean;
    setStackInSlot(i: number, itemStack: ItemStack): void;
  }


  class IInsertBlockOverride {
    isInsertBlocked(): boolean;
  }


  class IInventoryPartHandler {
    static readonly EMPTY: IInventoryPartHandler;
    canBeReplaced(): boolean;
    extractItem(slot: number, amount: number, simulate: boolean): ItemStack;
    get filterItems(): Map<Item, Set<number>>;
    get name(): string;
    get noSortSlots(): Set<number>;
    get slots(): number;
    getFilterItem(slot: number): Item;
    getNoItemIcon(slot: number): Pair<ResourceLocation, ResourceLocation>;
    getSlotLimit(slot: number): number;
    getStackInSlot(slot: number, getStackInSlotSuper: IntFunction<ItemStack>): ItemStack;
    getStackLimit(slot: number, stack: ItemStack): number;
    insertItem(slot: number, stack: ItemStack, simulate: boolean, insertSuper: TriFunction<number, ItemStack, boolean, ItemStack>): ItemStack;
    isFilterItem(item: Item): boolean;
    isInfinite(slot: number): boolean;
    isItemValid(slot: number, stack: ItemStack, player: Player, isItemValidSuper: BiPredicate<number, ItemStack>): boolean;
    isSlotAccessible(slot: number): boolean;
    onContentsChanged(slot: number, setStackInSlotSuper: BiConsumer<number, ItemStack>): void;
    onInit(): void;
    onSlotFilterChanged(slot: number): void;
    onSlotLimitChange(): void;
    setStackInSlot(slot: number, stack: ItemStack, setStackInSlotSuper: BiConsumer<number, ItemStack>): void;
  }


  class IItemHandlerSimpleExtractor {
    extractItem(var1: ItemStack, var2: boolean): ItemStack;
  }


  interface IItemHandlerSimpleInserter extends IItemHandlerModifiable {}
  class IItemHandlerSimpleInserter extends IItemHandlerModifiable {
    insertItem(var1: ItemStack, var2: boolean): ItemStack;
  }


  interface InventoryHandler extends ITrackedContentsItemHandler, IInsertBlockOverride, ItemStackHandler {}
  class InventoryHandler extends ITrackedContentsItemHandler {
    static readonly INVENTORY_TAG: string;
    addListener(onContentsChanged: IntConsumer): void;
    changeSlots(diff: number): void;
    clearListeners(): void;
    copyStacksTo(otherHandler: InventoryHandler): void;
    deserializeNBT(registries: Provider, nbt: CompoundTag): void;
    extractItem(slot: number, amount: number, simulate: boolean): ItemStack;
    extractItem(stack: ItemStack, simulate: boolean): ItemStack;
    extractItemInternal(slot: number, amount: number, simulate: boolean): ItemStack;
    get baseSlotLimit(): number;
    get filterItems(): Set<Item>;
    get inventoryPartitioner(): InventoryPartitioner;
    get noSortSlots(): Set<number>;
    get slotTracker(): ISlotTracker;
    get stackSizeMultiplier(): number;
    get trackedStacks(): Set<ItemStackKey>;
    getBaseStackLimit(stack: ItemStack): number;
    getFilterItem(slot: number): Item;
    getNoItemIcon(slotIndex: number): Pair<ResourceLocation, ResourceLocation>;
    getSlotLimit(slot: number): number;
    getSlotStack(slot: number): ItemStack;
    getStackInSlot(slot: number): ItemStack;
    getStackLimit(slot: number, stack: ItemStack): number;
    hasEmptySlots(): boolean;
    initFilterItems(): void;
    insertItem(slot: number, stack: ItemStack, simulate: boolean): ItemStack;
    insertItem(stack: ItemStack, simulate: boolean): ItemStack;
    insertItemOnlyToSlot(slot: number, stack: ItemStack, simulate: boolean): ItemStack;
    isFilterItem(item: Item): boolean;
    isInfinite(slot: number): boolean;
    isInsertBlocked(): boolean;
    isItemValid(slot: number, stack: ItemStack, player: Player): boolean;
    isItemValid(slot: number, stack: ItemStack): boolean;
    isSlotAccessible(slot: number): boolean;
    onContentsChanged(slot: number): void;
    onFilterItemsChanged(): void;
    onInit(): void;
    onSlotFilterChanged(slot: number): void;
    registerFilterItemsChangeListener(listener: Consumer<Set<Item>>): void;
    registerTrackingListeners(onAddStackKey: Consumer<ItemStackKey>, onRemoveStackKey: Consumer<ItemStackKey>, onAddFirstEmptySlot: Runnable, onRemoveLastEmptySlot: Runnable): void;
    saveInventory(): void;
    serializeNBT(registries: Provider): CompoundTag;
    set baseSlotLimit(baseSlotLimit: number);
    setPersistent(persistent: boolean): void;
    setShouldInsertIntoEmpty(shouldInsertIntoEmpty: BooleanSupplier): void;
    setSize(size: number): void;
    setSlotStack(slot: number, stack: ItemStack): void;
    setStackInSlot(slot: number, stack: ItemStack): void;
    triggerOnChangeListeners(slot: number): void;
    unregisterFilterItemsChangeListener(): void;
    unregisterStackKeyListeners(): void;
    validateSlotIndex(slot: number): void;
  }


  interface InventoryHandlerSlotTracker extends ISlotTracker {}
  class InventoryHandlerSlotTracker extends ISlotTracker {
    constructor(memorySettings: MemorySettingsCategory, filterItemSlots: SlotValueMap<Item>);
    addFull(slot: number, stack: ItemStack): void;
    addPartiallyFilled(slot: number, stack: ItemStack): void;
    clear(): void;
    extractItemFromHandler(inventoryHandler: InventoryHandler, extractItemInternal: IItemHandlerExtractor, stack: ItemStack, simulate: boolean): ItemStack;
    get fullStacks(): Set<ItemStackKey>;
    get items(): Set<Item>;
    get partialStacks(): Set<ItemStackKey>;
    getFirstMatchingSlot(stackKey: ItemStackKey): number;
    hasEmptySlots(): boolean;
    hasExactStackMemorized(stackKey: ItemStackKey): boolean;
    hasItemMemorizedOrFiltered(item: Item): boolean;
    insertItemIntoHandler(itemHandler: InventoryHandler, beforeInsertHandler: BiFunction<ItemStack, boolean, ItemStack>, inserter: IItemHandlerInserter, slotOverflowHandler: UnaryOperator<ItemStack>, storageOverflowHandler: UnaryOperator<ItemStack>, stack: ItemStack, simulate: boolean): ItemStack;
    insertItemIntoHandler(itemHandler: InventoryHandler, beforeInsertHandler: BiFunction<ItemStack, boolean, ItemStack>, inserter: IItemHandlerInserter, slotOverflowHandler: UnaryOperator<ItemStack>, storageOverflowHandler: UnaryOperator<ItemStack>, slot: number, stack: ItemStack, simulate: boolean): ItemStack;
    refreshSlotIndexesFrom(itemHandler: InventoryHandler): void;
    registerListeners(onAddStackKey: Consumer<ItemStackKey>, onRemoveStackKey: Consumer<ItemStackKey>, onAddFirstEmptySlot: Runnable, onRemoveLastEmptySlot: Runnable): void;
    removeAndSetSlotIndexes(inventoryHandler: InventoryHandler, slot: number, stack: ItemStack): void;
    removePartiallyFilled(slot: number): void;
    setShouldInsertIntoEmpty(shouldInsertIntoEmpty: BooleanSupplier): void;
    unregisterStackKeyListeners(): void;
  }


  class InventoryIOHandler {
    constructor(storageWrapper: IStorageWrapper);
    get filteredItemHandler(): ITrackedContentsItemHandler;
  }


  class InventoryPartitioner {
    static readonly BASE_INDEXES_TAG: string;
    constructor(tag: CompoundTag, parent: InventoryHandler, getMemorySettings: Supplier<MemorySettingsCategory>);
    addInventoryPart(inventorySlot: number, numberOfSlots: number, inventoryPartHandler: IInventoryPartHandler): void;
    get filterItems(): Map<Item, Set<number>>;
    get noSortSlots(): Set<number>;
    getFirstSpace(maxNumberOfSlots: number): Optional<SlotRange>;
    getNoItemIcon(slot: number): Pair<ResourceLocation, ResourceLocation>;
    getPartBySlot(slot: number): IInventoryPartHandler;
    isFilterItem(item: Item): boolean;
    isInfinite(slot: number): boolean;
    onInit(): void;
    onSlotLimitChange(): void;
    removeInventoryPart(inventorySlot: number): void;
    serializeNBT(): CompoundTag;
  }


  class InventoryPartRegistry {
    static instantiatePart(name: string, parent: InventoryHandler, slotRange: SlotRange, getMemorySettings: Supplier<MemorySettingsCategory>): IInventoryPartHandler;
    static registerFactory(name: string, factory: Factory): void;
  }


  class ISlotChangeListener {
    onSlotChanged(var1: number): void;
  }


  class ISlotTracker {
    clear(): void;
    extractItemFromHandler(var1: InventoryHandler, var2: IItemHandlerExtractor, var3: ItemStack, var4: boolean): ItemStack;
    get fullStacks(): Set<ItemStackKey>;
    get items(): Set<Item>;
    get partialStacks(): Set<ItemStackKey>;
    getFirstMatchingSlot(var1: ItemStackKey): number;
    hasEmptySlots(): boolean;
    hasExactStackMemorized(var1: ItemStackKey): boolean;
    hasItemMemorizedOrFiltered(var1: Item): boolean;
    insertItemIntoHandler(var1: InventoryHandler, var2: BiFunction<ItemStack, boolean, ItemStack>, var3: IItemHandlerInserter, var4: UnaryOperator<ItemStack>, var5: UnaryOperator<ItemStack>, var6: ItemStack, var7: boolean): ItemStack;
    insertItemIntoHandler(var1: InventoryHandler, var2: BiFunction<ItemStack, boolean, ItemStack>, var3: IItemHandlerInserter, var4: UnaryOperator<ItemStack>, var5: UnaryOperator<ItemStack>, var6: number, var7: ItemStack, var8: boolean): ItemStack;
    refreshSlotIndexesFrom(var1: InventoryHandler): void;
    registerListeners(var1: Consumer<ItemStackKey>, var2: Consumer<ItemStackKey>, var3: Runnable, var4: Runnable): void;
    removeAndSetSlotIndexes(var1: InventoryHandler, var2: number, var3: ItemStack): void;
    setShouldInsertIntoEmpty(var1: BooleanSupplier): void;
    unregisterStackKeyListeners(): void;
  }


  class ItemStackKey {
    static clearCacheOnTickEnd(event: Post): void;
    equals(o: any): boolean;
    getStack(): ItemStack;
    hashCode(): number;
    hashCodeNotEquals(otherStack: ItemStack): boolean;
    matches(stack: ItemStack): boolean;
    static of(stack: ItemStack): ItemStackKey;
    stack(): ItemStack;
    toString(): string;
  }


  interface ITrackedContentsItemHandler extends IItemHandlerSimpleInserter, IItemHandlerSimpleExtractor, IInsertBlockOverride {}
  class ITrackedContentsItemHandler extends IItemHandlerSimpleInserter {
    get trackedStacks(): Set<ItemStackKey>;
    hasEmptySlots(): boolean;
    registerTrackingListeners(var1: Consumer<ItemStackKey>, var2: Consumer<ItemStackKey>, var3: Runnable, var4: Runnable): void;
    unregisterStackKeyListeners(): void;
  }


  interface StatefulComponentItemHandler extends IItemHandlerModifiable, ISlotChangeListener {}
  class StatefulComponentItemHandler extends IItemHandlerModifiable {
    constructor(parent: MutableDataComponentHolder, component: DataComponentType<ItemContainerContents>, size: number);
    extractItem(slot: number, amount: number, simulate: boolean): ItemStack;
    get slots(): number;
    getSlotLimit(slot: number): number;
    getStackInSlot(slot: number): ItemStack;
    insertItem(slot: number, toInsert: ItemStack, simulate: boolean): ItemStack;
    isItemValid(slot: number, stack: ItemStack): boolean;
    onSlotChanged(slot: number): void;
    setStackInSlot(slot: number, stack: ItemStack): void;
  }


  class StorageWrapperRepository {
    static clearCache(): void;
    static getExistingStorageWrapper<T extends IStorageWrapper>(stack: ItemStack, wrapperClass: Class<T>): Optional<T>;
    static getStorageWrapper<T extends IStorageWrapper>(stack: ItemStack, wrapperClass: Class<T>, factory: Function<ItemStack, T>): T;
    static migrateToUuid(storageWrapper: IStorageWrapper, stack: ItemStack, storageUuid: UUID): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.inventory.FilteredItemHandler' {
  import { FilteredItemHandler, ITrackedContentsItemHandler, ItemStackKey } from 'net.p3pp3rf1y.sophisticatedcore.inventory';
  import { List, Set } from 'java.util';
  import { FilterLogic } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Consumer } from 'java.util.function';
  import { Runnable } from 'java.lang';

  interface Modifiable extends ITrackedContentsItemHandler, FilteredItemHandler<ITrackedContentsItemHandler> {}
  class Modifiable extends ITrackedContentsItemHandler {
    constructor(inventoryHandler: ITrackedContentsItemHandler, inputFilters: FilterLogic[], outputFilters: FilterLogic[]);
    extractItem(stack: ItemStack, simulate: boolean): ItemStack;
    extractItem(slot: number, amount: number, simulate: boolean): ItemStack;
    get trackedStacks(): Set<ItemStackKey>;
    hasEmptySlots(): boolean;
    insertItem(stack: ItemStack, simulate: boolean): ItemStack;
    insertItem(slot: number, stack: ItemStack, simulate: boolean): ItemStack;
    isInsertBlocked(): boolean;
    registerTrackingListeners(onAddStackKey: Consumer<ItemStackKey>, onRemoveStackKey: Consumer<ItemStackKey>, onAddFirstEmptySlot: Runnable, onRemoveLastEmptySlot: Runnable): void;
    setStackInSlot(slot: number, stack: ItemStack): void;
    unregisterStackKeyListeners(): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.inventory.IInventoryPartHandler' {
  import { IInventoryPartHandler, InventoryHandler } from 'net.p3pp3rf1y.sophisticatedcore.inventory';
  import { SlotRange } from 'net.p3pp3rf1y.sophisticatedcore.util';
  import { Supplier, BiConsumer, BiPredicate, IntFunction } from 'java.util.function';
  import { MemorySettingsCategory } from 'net.p3pp3rf1y.sophisticatedcore.settings.memory';
  import { ItemStack } from 'net.minecraft.world.item';
  import { TriFunction } from 'org.apache.commons.lang3.function';
  import { Integer, Boolean } from 'java.lang';
  import { Player } from 'net.minecraft.world.entity.player';

  class Factory {
    create(var1: InventoryHandler, var2: SlotRange, var3: Supplier<MemorySettingsCategory>): IInventoryPartHandler;
  }


  interface Default extends IInventoryPartHandler {}
  class Default extends IInventoryPartHandler {
    static readonly NAME: string;
    constructor(parent: InventoryHandler, slots: number);
    canBeReplaced(): boolean;
    extractItem(slot: number, amount: number, simulate: boolean): ItemStack;
    get name(): string;
    get slots(): number;
    getSlotLimit(slot: number): number;
    getStackInSlot(slot: number, getStackInSlotSuper: IntFunction<ItemStack>): ItemStack;
    getStackLimit(slot: number, stack: ItemStack): number;
    insertItem(slot: number, stack: ItemStack, simulate: boolean, insertSuper: TriFunction<number, ItemStack, boolean, ItemStack>): ItemStack;
    isItemValid(slot: number, stack: ItemStack, player: Player, isItemValidSuper: BiPredicate<number, ItemStack>): boolean;
    isSlotAccessible(slot: number): boolean;
    setStackInSlot(slot: number, stack: ItemStack, setStackInSlotSuper: BiConsumer<number, ItemStack>): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.inventory.ISlotTracker' {
  import { ISlotTracker, ItemStackKey, InventoryHandler } from 'net.p3pp3rf1y.sophisticatedcore.inventory';
  import { BooleanSupplier, BiFunction, UnaryOperator, Consumer } from 'java.util.function';
  import { Set } from 'java.util';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { Boolean, Runnable } from 'java.lang';

  interface Noop extends ISlotTracker {}
  class Noop extends ISlotTracker {
    clear(): void;
    extractItemFromHandler(inventoryHandler: InventoryHandler, extractItemInternal: IItemHandlerExtractor, stack: ItemStack, simulate: boolean): ItemStack;
    get fullStacks(): Set<ItemStackKey>;
    get items(): Set<Item>;
    get partialStacks(): Set<ItemStackKey>;
    getFirstMatchingSlot(stackKey: ItemStackKey): number;
    hasEmptySlots(): boolean;
    hasExactStackMemorized(stackKey: ItemStackKey): boolean;
    hasItemMemorizedOrFiltered(item: Item): boolean;
    insertItemIntoHandler(itemHandler: InventoryHandler, beforeInsertHandler: BiFunction<ItemStack, boolean, ItemStack>, inserter: IItemHandlerInserter, slotOverflowHandler: UnaryOperator<ItemStack>, storageOverflowHandler: UnaryOperator<ItemStack>, stack: ItemStack, simulate: boolean): ItemStack;
    insertItemIntoHandler(itemHandler: InventoryHandler, beforeInsertHandler: BiFunction<ItemStack, boolean, ItemStack>, inserter: IItemHandlerInserter, slotOverflowHandler: UnaryOperator<ItemStack>, storageOverflowHandler: UnaryOperator<ItemStack>, slot: number, stack: ItemStack, simulate: boolean): ItemStack;
    refreshSlotIndexesFrom(itemHandler: InventoryHandler): void;
    registerListeners(onAddStackKey: Consumer<ItemStackKey>, onRemoveStackKey: Consumer<ItemStackKey>, onAddFirstEmptySlot: Runnable, onRemoveLastEmptySlot: Runnable): void;
    removeAndSetSlotIndexes(inventoryHandler: InventoryHandler, slot: number, stack: ItemStack): void;
    setShouldInsertIntoEmpty(shouldInsertIntoEmpty: BooleanSupplier): void;
    unregisterStackKeyListeners(): void;
  }


  class IItemHandlerExtractor {
    extractItem(var1: number, var2: number, var3: boolean): ItemStack;
  }


  class IItemHandlerInserter {
    insertItem(var1: number, var2: ItemStack, var3: boolean): ItemStack;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.mixin' {
  class MixinVanillaInventoryCodeHooks {
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.renderdata' {
  import { Enum, Integer, Float, Class } from 'java.lang';
  import { List, Optional, Map } from 'java.util';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ItemDisplayRenderInfo, DisplayItem } from 'net.p3pp3rf1y.sophisticatedcore.renderdata.RenderInfo';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Consumer, Function } from 'java.util.function';
  import { TankRenderInfo } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.IRenderedTankUpgrade';
  import { BatteryRenderInfo } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.IRenderedBatteryUpgrade';

  interface DisplaySide extends Enum<DisplaySide> {}
  class DisplaySide extends Enum<DisplaySide> {
    static readonly FRONT: DisplaySide;
    static readonly LEFT: DisplaySide;
    static readonly RIGHT: DisplaySide;
    static fromName(name: string): DisplaySide;
    get serializedName(): string;
    next(): DisplaySide;
    previous(): DisplaySide;
    static valueOf(name: string): DisplaySide;
    static values(): DisplaySide[];
  }


  class IUpgradeRenderData {
    serializeNBT(): CompoundTag;
  }


  class RenderInfo {
    deserializeFrom(renderInfoNbt: CompoundTag): void;
    get batteryRenderInfo(): Optional<BatteryRenderInfo>;
    get itemDisplayRenderInfo(): ItemDisplayRenderInfo;
    get nbt(): CompoundTag;
    get tankRenderInfos(): Map<TankPosition, TankRenderInfo>;
    get upgradeItems(): ItemStack[];
    get upgradeRenderData(): Map<UpgradeRenderDataType<any>, IUpgradeRenderData>;
    getUpgradeRenderData<T extends IUpgradeRenderData>(upgradeRenderDataType: UpgradeRenderDataType<T>): Optional<T>;
    refreshDisplayItemsAndInaccessibleSlots(displayItems: DisplayItem[], inaccessibleSlots: number[]): void;
    refreshItemDisplayRenderInfo(displayItems: DisplayItem[], inaccessibleSlots: number[], infiniteSlots: number[], slotCounts: number[], slotFillRatios: number[]): void;
    refreshSlotCountsFillRatiosAndInfiniteSlots(slotCounts: number[], slotFillRatios: number[], infiniteSlots: number[]): void;
    removeAllUpgradeRenderData(): void;
    removeUpgradeRenderData(type: UpgradeRenderDataType<any>): void;
    resetUpgradeInfo(triggerChangeListener: boolean): void;
    set batteryRenderInfo(batteryRenderInfo: BatteryRenderInfo);
    set upgradeItems(upgradeItems: ItemStack[]);
    setDisplayItemsChangeListener(displayItemsChangeListener: Consumer<RenderInfo>): void;
    setTankRenderInfo(tankPosition: TankPosition, tankRenderInfo: TankRenderInfo): void;
    setUpgradeRenderData<T extends IUpgradeRenderData>(upgradeRenderDataType: UpgradeRenderDataType<T>, renderData: T): void;
    showsCountsAndFillRatios(): boolean;
  }


  interface TankPosition extends Enum<TankPosition> {}
  class TankPosition extends Enum<TankPosition> {
    static readonly LEFT: TankPosition;
    static readonly RIGHT: TankPosition;
    get serializedName(): string;
    static valueOf(name: string): TankPosition;
    static values(): TankPosition[];
  }


  class UpgradeRenderDataType<T extends IUpgradeRenderData = any> {
    constructor(name: string, clazz: Class<T>, deserialize: Function<CompoundTag, T>);
    cast(upgradeRenderData: IUpgradeRenderData): Optional<T>;
    deserialize(nbt: CompoundTag): T;
    get name(): string;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.renderdata.RenderInfo' {
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Optional, List } from 'java.util';
  import { Integer, Float } from 'java.lang';
  import { ItemStack } from 'net.minecraft.world.item';
  import { DisplaySide } from 'net.p3pp3rf1y.sophisticatedcore.renderdata';

  class ItemDisplayRenderInfo {
    static readonly SLOT_COUNTS_TAG: string;
    static readonly SLOT_FILL_RATIOS_TAG: string;
    constructor();
    static deserialize(tag: CompoundTag): ItemDisplayRenderInfo;
    get displayItem(): Optional<DisplayItem>;
    get displayItems(): DisplayItem[];
    get inaccessibleSlots(): number[];
    get infiniteSlots(): number[];
    get slotCounts(): number[];
    get slotFillRatios(): number[];
    serialize(): CompoundTag;
  }


  class DisplayItem {
    constructor(item: ItemStack, rotation: number, slotIndex: number, displaySide: DisplaySide);
    get displaySide(): DisplaySide;
    get item(): ItemStack;
    get rotation(): number;
    get slotIndex(): number;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.settings' {
  import { ButtonBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { Supplier, Consumer, BiFunction } from 'java.util.function';
  import { DyeColor, ItemStack } from 'net.minecraft.world.item';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Map, Optional, List } from 'java.util';
  import { Integer, Class } from 'java.lang';
  import { TriConsumer } from 'org.apache.logging.log4j.util';
  import { SettingsContainerMenu } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { MainSettingsCategory } from 'net.p3pp3rf1y.sophisticatedcore.settings.main';
  import { Player } from 'net.minecraft.world.entity.player';
  import { SettingsTabBase, SettingsScreen, SettingsTabControl } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { Slot } from 'net.minecraft.world.inventory';
  import { SavedData } from 'net.minecraft.world.level.saveddata';
  import { Provider } from 'HolderLookup';
  import { ISlotOverlayRenderer } from 'net.p3pp3rf1y.sophisticatedcore.settings.StorageSettingsTabControlBase';
  import { ItemRenderer } from 'net.minecraft.client.renderer.entity';

  interface ColorToggleButton extends ButtonBase {}
  class ColorToggleButton extends ButtonBase {
    constructor(position: Position, getColor: Supplier<DyeColor>, setColor: Consumer<DyeColor>, b: number);
    renderTooltip(screen: Screen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
  }


  class DatapackSettingsTemplateManager {
    static get templates(): Map<string, Map<string, CompoundTag>>;
    static getTemplateNbt(datapackName: string, templateName: string): Optional<CompoundTag>;
    static putTemplate(datapackName: string, templateName: string, tag: CompoundTag): void;
  }


  class ISettingsCategory<T extends ISettingsCategory<any> = any> {
    copyTo(var1: T, var2: number, var3: number): void;
    deleteSlotSettingsFrom(var1: number): void;
    isLargerThanNumberOfSlots(var1: number): boolean;
    overwriteWith(var1: T): void;
    reloadFrom(var1: CompoundTag): void;
  }


  class ISlotColorCategory {
    getSlotColor(var1: number): Optional<number>;
  }


  class MainSetting<T = any> {
    constructor(tagName: string, getValue: BiFunction<CompoundTag, string, Optional<T>>, setValue: TriConsumer<CompoundTag, string, T>, defaultValue: T);
    get defaultValue(): T;
    get name(): string;
    getValue(tag: CompoundTag): Optional<T>;
    removeFrom(tag: CompoundTag): void;
    setValue(tag: CompoundTag, value: T): void;
  }


  class SettingsContainerBase<C extends ISettingsCategory<any> = any> {
    get settingsContainer(): SettingsContainerMenu<any>;
    handlePacket(var1: CompoundTag): void;
    sendBooleanToServer(key: string, value: boolean): void;
    sendDataToServer(supplyData: Supplier<CompoundTag>): void;
    sendIntToServer(key: string, value: number): void;
    sendStringToServer(key: string, value: string): void;
  }


  class SettingsHandler {
    get globalSettingsCategory(): MainSettingsCategory<any>;
    get globalSettingsCategoryName(): string;
    get nbt(): CompoundTag;
    get settingsCategories(): Map<string, ISettingsCategory<any>>;
    getCategoriesThatImplement<T>(categoryClass: Class<T>): T[];
    getTypeCategory<T extends ISettingsCategory<any>>(categoryClazz: Class<T>): T;
    instantiateGlobalSettingsCategory(var1: CompoundTag, var2: Consumer<CompoundTag>): ISettingsCategory<any>;
    reloadFrom(contentsNbt: CompoundTag): void;
  }


  class SettingsManager {
    static readonly SHIFT_CLICK_INTO_OPEN_TAB_FIRST: MainSetting;
    static readonly KEEP_TAB_OPEN: MainSetting;
    static readonly KEEP_SEARCH_PHRASE: MainSetting;
    static readonly SEARCH_PHRASE: MainSetting;
    static addSetting(setting: MainSetting<any>): void;
    static getPlayerSetting<T>(player: Player, playerSettingsTagName: string, setting: MainSetting<T>): Optional<T>;
    static getPlayerSettingOrDefault<T>(player: Player, playerSettingsTagName: string, setting: MainSetting<T>): T;
    static getPlayerSettingsTag(player: Player, playerSettingsTagName: string): CompoundTag;
    static getSetting(settingName: string): Optional<MainSetting<any>>;
    static getSettingValue<T>(player: Player, playerSettingsTagName: string, category: MainSettingsCategory<any>, setting: MainSetting<T>): T;
    static setPlayerSetting<T>(player: Player, playerSettingsTagName: string, setting: MainSetting<T>, value: T): void;
    static setPlayerSettingsTag(player: Player, playerSettingsTagName: string, settingsNbt: CompoundTag): void;
    static setSetting<T>(player: Player, playerSettingsTagName: string, category: MainSettingsCategory<any>, setting: MainSetting<T>, value: T): void;
  }


  interface SettingsTab<C extends SettingsContainerBase<any> = any> extends SettingsTabBase<SettingsScreen> {}
  class SettingsTab<C extends SettingsContainerBase<any> = any> extends SettingsTabBase<SettingsScreen> {
    drawSlotStackOverlay(guiGraphics: GuiGraphics, slot: Slot, templateLoadHovered: boolean): void;
    getItemDisplayOverride(slotNumber: number, templateLoadHovered: boolean): ItemStack;
    getItemRotation(slotIndex: number, templateLoadHovered: boolean): number;
    getSlotOverlayColor(var1: number, var2: boolean): Optional<number>;
    handleSlotClick(var1: Slot, var2: number): void;
    renderExtra(guiGraphics: GuiGraphics, slot: Slot): void;
  }


  interface SettingsTemplateStorage extends SavedData {}
  class SettingsTemplateStorage extends SavedData {
    clearPlayerTemplates(player: Player): void;
    static get (): SettingsTemplateStorage;
    getPlayerNamedTemplates(player: Player): Map<string, CompoundTag>;
    getPlayerTemplates(player: Player): Map<number, CompoundTag>;
    putPlayerNamedTemplate(player: Player, name: string, settingsTag: CompoundTag): void;
    putPlayerTemplate(player: Player, slot: number, settingsTag: CompoundTag): void;
    save(tag: CompoundTag, registries: Provider): CompoundTag;
  }


  interface StorageSettingsTabControlBase extends SettingsTabControl<SettingsScreen, SettingsTab> {}
  class StorageSettingsTabControlBase extends SettingsTabControl<SettingsScreen, SettingsTab> {
    drawSlotStackOverlay(guiGraphics: GuiGraphics, slot: Slot, templateLoadHovered: boolean): void;
    getSlotStackDisplayOverride(slotNumber: number, isTemplateLoadHovered: boolean): ItemStack;
    handleSlotClick(slot: Slot, mouseButton: number): void;
    renderGuiItem(guiGraphics: GuiGraphics, itemRenderer: ItemRenderer, itemstack: ItemStack, slot: Slot, templateLoadHovered: boolean): boolean;
    renderSlotExtra(guiGraphics: GuiGraphics, slot: Slot): void;
    renderSlotOverlays(guiGraphics: GuiGraphics, slot: Slot, overlayRenderer: ISlotOverlayRenderer, templateLoadHovered: boolean): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.settings.DatapackSettingsTemplateManager' {
  import { SimplePreparableReloadListener } from 'net.minecraft.server.packs.resources';
  import { Map } from 'java.util';

  interface Loader extends SimplePreparableReloadListener<Map> {}
  class Loader extends SimplePreparableReloadListener<Map> {
    static readonly INSTANCE: Loader;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.settings.itemdisplay' {
  import { ISettingsCategory, ISlotColorCategory, SettingsContainerBase, SettingsTab } from 'net.p3pp3rf1y.sophisticatedcore.settings';
  import { Supplier, Consumer } from 'java.util.function';
  import { InventoryHandler } from 'net.p3pp3rf1y.sophisticatedcore.inventory';
  import { RenderInfo, DisplaySide } from 'net.p3pp3rf1y.sophisticatedcore.renderdata';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { MemorySettingsCategory } from 'net.p3pp3rf1y.sophisticatedcore.settings.memory';
  import { List, Optional } from 'java.util';
  import { Integer } from 'java.lang';
  import { DyeColor } from 'net.minecraft.world.item';
  import { SettingsContainerMenu } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { ButtonDefinition } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { SettingsScreen } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { Slot } from 'net.minecraft.world.inventory';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface ItemDisplaySettingsCategory extends ISettingsCategory<ItemDisplaySettingsCategory>, ISlotColorCategory {}
  class ItemDisplaySettingsCategory extends ISettingsCategory<ItemDisplaySettingsCategory> {
    static readonly NAME: string;
    constructor(inventoryHandlerSupplier: Supplier<InventoryHandler>, renderInfoSupplier: Supplier<RenderInfo>, categoryNbt: CompoundTag, saveNbt: Consumer<CompoundTag>, itemNumberLimit: number, getMemorySettings: Supplier<MemorySettingsCategory>);
    copyTo(otherCategory: ItemDisplaySettingsCategory, startFromSlot: number, slotOffset: number): void;
    deleteSlotSettingsFrom(slotIndex: number): void;
    get color(): DyeColor;
    get displaySide(): DisplaySide;
    get itemNumberLimit(): number;
    get slots(): number[];
    getRotation(slotIndex: number): number;
    getSlotColor(slotNumber: number): Optional<number>;
    isLargerThanNumberOfSlots(slots: number): boolean;
    itemChanged(changedSlotIndex: number): void;
    itemsChanged(): void;
    overwriteWith(otherCategory: ItemDisplaySettingsCategory): void;
    reloadFrom(categoryNbt: CompoundTag): void;
    rotate(slotIndex: number, clockwise: boolean): void;
    selectSlot(slotIndex: number): void;
    selectSlots(minSlot: number, maxSlot: number): void;
    set color(color: DyeColor);
    set displaySide(displaySide: DisplaySide);
    unselectSlot(slotIndex: number): void;
  }


  interface ItemDisplaySettingsContainer extends SettingsContainerBase<ItemDisplaySettingsCategory> {}
  class ItemDisplaySettingsContainer extends SettingsContainerBase<ItemDisplaySettingsCategory> {
    constructor(settingsContainer: SettingsContainerMenu<any>, categoryName: string, category: ItemDisplaySettingsCategory);
    get color(): DyeColor;
    get displaySide(): DisplaySide;
    get firstSelectedSlot(): number;
    getRotation(slotIndex: number): number;
    handlePacket(data: CompoundTag): void;
    isSlotSelected(slotIndex: number): boolean;
    rotateClockwise(slotIndex: number): void;
    rotateCounterClockwise(slotIndex: number): void;
    selectSlot(slotIndex: number): void;
    set color(color: DyeColor);
    set displaySide(displaySide: DisplaySide);
    supportsSideSelection(): boolean;
    unselectSlot(slotIndex: number): void;
  }


  interface ItemDisplaySettingsTab extends SettingsTab<ItemDisplaySettingsContainer> {}
  class ItemDisplaySettingsTab extends SettingsTab<ItemDisplaySettingsContainer> {
    static readonly ROTATE: ButtonDefinition;
    constructor(container: ItemDisplaySettingsContainer, position: Position, screen: SettingsScreen);
    getItemRotation(slotIndex: number, templateLoadHovered: boolean): number;
    getSlotOverlayColor(slotNumber: number, templateLoadHovered: boolean): Optional<number>;
    handleSlotClick(slot: Slot, mouseButton: number): void;
    renderExtra(guiGraphics: GuiGraphics, slot: Slot): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.settings.main' {
  import { Enum, Integer } from 'java.lang';
  import { List, Optional } from 'java.util';
  import { ButtonBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls';
  import { TextureBlitData, Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { ISettingsCategory, MainSetting, SettingsContainerBase, SettingsTab } from 'net.p3pp3rf1y.sophisticatedcore.settings';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Consumer, Function, IntConsumer } from 'java.util.function';
  import { SettingsContainerMenu } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { SettingsScreen } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { Component } from 'net.minecraft.network.chat';
  import { Slot } from 'net.minecraft.world.inventory';

  interface Context extends Enum<Context> {}
  class Context extends Enum<Context> {
    static readonly PLAYER: Context;
    static readonly STORAGE: Context;
    static fromId(id: number): Context;
    get id(): number;
    static valueOf(name: string): Context;
    static values(): Context[];
  }


  interface ContextButton extends ButtonBase {}
  class ContextButton extends ButtonBase {
    static readonly LEFT_BUTTON_HOVERED_BACKGROUND: TextureBlitData;
    static readonly LEFT_BUTTON_BACKGROUND: TextureBlitData;
    static readonly MIDDLE_BUTTON_HOVERED_BACKGROUND: TextureBlitData;
    static readonly MIDDLE_BUTTON_BACKGROUND: TextureBlitData;
    static readonly RIGHT_BUTTON_HOVERED_BACKGROUND: TextureBlitData;
    static readonly RIGHT_BUTTON_BACKGROUND: TextureBlitData;
    renderTooltip(screen: Screen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
  }


  interface MainSettingsCategory<T extends MainSettingsCategory<any> = any> extends ISettingsCategory<T> {}
  class MainSettingsCategory<T extends MainSettingsCategory<any> = any> extends ISettingsCategory<T> {
    static readonly NAME: string;
    constructor(categoryNbt: CompoundTag, saveNbt: Consumer<CompoundTag>, playerSettingsTagName: string);
    copyTo(otherCategory: T, startFromSlot: number, slotOffset: number): void;
    deleteSlotSettingsFrom(slotIndex: number): void;
    get playerSettingsTagName(): string;
    getSettingValue<S>(setting: MainSetting<S>): Optional<S>;
    isLargerThanNumberOfSlots(slots: number): boolean;
    overwriteWith(otherCategory: T): void;
    reloadFrom(categoryNbt: CompoundTag): void;
    removeSetting<S>(setting: MainSetting<S>): void;
    setSettingValue<S>(setting: MainSetting<S>, value: S): void;
  }


  interface MainSettingsContainer extends SettingsContainerBase<MainSettingsCategory> {}
  class MainSettingsContainer extends SettingsContainerBase<MainSettingsCategory> {
    constructor(settingsContainer: SettingsContainerMenu<any>, categoryName: string, category: MainSettingsCategory<any>);
    get context(): Context;
    handlePacket(data: CompoundTag): void;
    shouldKeepSearchPhrase(): boolean;
    shouldKeepTabOpen(): boolean;
    shouldShiftClickIntoOpenTab(): boolean;
    toggleContext(): void;
    toggleKeepSearchPhrase(): void;
    toggleKeepTabOpen(): void;
    toggleShiftClickIntoOpenTab(): void;
  }


  interface MainSettingsTab<T extends MainSettingsContainer = any> extends SettingsTab<T> {}
  class MainSettingsTab<T extends MainSettingsContainer = any> extends SettingsTab<T> {
    constructor(container: T, position: Position, screen: SettingsScreen, storageContextTooltip: Component[], storageContextTitle: Component, tabLabelTranslKey: string, tabTooltipTranslKey: string, getTabButton: Function<IntConsumer, ButtonBase>);
    getSlotOverlayColor(slotNumber: number, templateLoadHovered: boolean): Optional<number>;
    handleSlotClick(slot: Slot, mouseButton: number): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.settings.memory' {
  import { ISettingsCategory, SettingsContainerBase, SettingsTab } from 'net.p3pp3rf1y.sophisticatedcore.settings';
  import { Supplier, Consumer } from 'java.util.function';
  import { InventoryHandler, ItemStackKey } from 'net.p3pp3rf1y.sophisticatedcore.inventory';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { Optional, Set, Map } from 'java.util';
  import { Integer } from 'java.lang';
  import { SettingsContainerMenu } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { ButtonDefinition } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { SettingsScreen } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { Slot } from 'net.minecraft.world.inventory';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface MemorySettingsCategory extends ISettingsCategory<MemorySettingsCategory> {}
  class MemorySettingsCategory extends ISettingsCategory<MemorySettingsCategory> {
    static readonly NAME: string;
    constructor(inventoryHandlerSupplier: Supplier<InventoryHandler>, categoryNbt: CompoundTag, saveNbt: Consumer<CompoundTag>);
    copyTo(otherCategory: MemorySettingsCategory, startFromSlot: number, slotOffset: number): void;
    deleteSlotSettingsFrom(slotIndex: number): void;
    get filterItemSlots(): Map<Item, Set<number>>;
    get filterStackSlots(): Map<number, Set<number>>;
    get slotIndexes(): Set<number>;
    getSlotFilterStack(slotNumber: number, copy: boolean): Optional<ItemStack>;
    ignoresNbt(): boolean;
    isLargerThanNumberOfSlots(slots: number): boolean;
    isSlotSelected(slotNumber: number): boolean;
    matchesFilter(slotNumber: number, stack: ItemStack): boolean;
    matchesFilter(stack: ItemStack): boolean;
    matchesItem(item: Item): boolean;
    matchesStackKey(stackKey: ItemStackKey): boolean;
    overwriteWith(otherCategory: MemorySettingsCategory): void;
    registerListeners(onItemAdded: Consumer<Item>, onItemRemoved: Consumer<Item>, onStackAdded: Consumer<number>, onStackRemoved: Consumer<number>): void;
    reloadFrom(categoryNbt: CompoundTag): void;
    selectSlot(slotNumber: number): void;
    selectSlots(minSlot: number, maxSlot: number): void;
    setFilter(slot: number, filter: ItemStack): void;
    setIgnoreNbt(ignoreNbt: boolean): void;
    unregisterListeners(): void;
    unselectAllSlots(): void;
    unselectSlot(slotNumber: number): void;
  }


  interface MemorySettingsContainer extends SettingsContainerBase<MemorySettingsCategory> {}
  class MemorySettingsContainer extends SettingsContainerBase<MemorySettingsCategory> {
    constructor(settingsContainer: SettingsContainerMenu<any>, categoryName: string, category: MemorySettingsCategory);
    getMemorizedStack(slotNumber: number): ItemStack;
    getSelectedTemplatesMemorizedStack(slotNumber: number): ItemStack;
    handlePacket(data: CompoundTag): void;
    ignoresNbt(): boolean;
    isSlotSelected(slotNumber: number): boolean;
    selectAllSlots(): void;
    selectSlot(slotNumber: number): void;
    setIgnoreNbt(ignoreNbt: boolean): void;
    unselectAllSlots(): void;
    unselectSlot(slotNumber: number): void;
  }


  interface MemorySettingsTab extends SettingsTab<MemorySettingsContainer> {}
  class MemorySettingsTab extends SettingsTab<MemorySettingsContainer> {
    static readonly SELECT_ALL_SLOTS: ButtonDefinition;
    static readonly UNSELECT_ALL_SLOTS: ButtonDefinition;
    constructor(container: MemorySettingsContainer, position: Position, screen: SettingsScreen);
    drawSlotStackOverlay(guiGraphics: GuiGraphics, slot: Slot, templateLoadHovered: boolean): void;
    getItemDisplayOverride(slotNumber: number, templateLoadHovered: boolean): ItemStack;
    getSlotOverlayColor(slotNumber: number, templateLoadHovered: boolean): Optional<number>;
    handleSlotClick(slot: Slot, mouseButton: number): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.settings.nosort' {
  import { ISettingsCategory, ISlotColorCategory, SettingsContainerBase, SettingsTab } from 'net.p3pp3rf1y.sophisticatedcore.settings';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Consumer } from 'java.util.function';
  import { DyeColor } from 'net.minecraft.world.item';
  import { Optional, Set } from 'java.util';
  import { Integer } from 'java.lang';
  import { SettingsContainerMenu } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { ButtonDefinition } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { SettingsScreen } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { Slot } from 'net.minecraft.world.inventory';

  interface NoSortSettingsCategory extends ISettingsCategory<NoSortSettingsCategory>, ISlotColorCategory {}
  class NoSortSettingsCategory extends ISettingsCategory<NoSortSettingsCategory> {
    static readonly NAME: string;
    constructor(categoryNbt: CompoundTag, saveNbt: Consumer<CompoundTag>);
    copyTo(otherCategory: NoSortSettingsCategory, startFromSlot: number, slotOffset: number): void;
    deleteSlotSettingsFrom(slotIndex: number): void;
    get color(): DyeColor;
    get noSortSlots(): Set<number>;
    getSlotColor(slotNumber: number): Optional<number>;
    isLargerThanNumberOfSlots(slots: number): boolean;
    isSlotSelected(slotNumber: number): boolean;
    overwriteWith(otherCategory: NoSortSettingsCategory): void;
    reloadFrom(categoryNbt: CompoundTag): void;
    selectSlot(slotNumber: number): void;
    selectSlots(minSlot: number, maxSlot: number): void;
    set color(color: DyeColor);
    unselectAllSlots(): void;
    unselectSlot(slotNumber: number): void;
  }


  interface NoSortSettingsContainer extends SettingsContainerBase<NoSortSettingsCategory> {}
  class NoSortSettingsContainer extends SettingsContainerBase<NoSortSettingsCategory> {
    constructor(settingsContainer: SettingsContainerMenu<any>, categoryName: string, category: NoSortSettingsCategory);
    get color(): DyeColor;
    handlePacket(data: CompoundTag): void;
    isSlotSelected(slotNumber: number): boolean;
    selectAllSlots(): void;
    selectSlot(slotNumber: number): void;
    set color(color: DyeColor);
    unselectAllSlots(): void;
    unselectSlot(slotNumber: number): void;
  }


  interface NoSortSettingsTab extends SettingsTab<NoSortSettingsContainer> {}
  class NoSortSettingsTab extends SettingsTab<NoSortSettingsContainer> {
    static readonly SELECT_ALL_SLOTS: ButtonDefinition;
    static readonly UNSELECT_ALL_SLOTS: ButtonDefinition;
    constructor(container: NoSortSettingsContainer, position: Position, screen: SettingsScreen);
    getSlotOverlayColor(slotNumber: number, templateLoadHovered: boolean): Optional<number>;
    handleSlotClick(slot: Slot, mouseButton: number): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.settings.StorageSettingsTabControlBase' {
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { SettingsScreen } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';

  class ISlotOverlayRenderer {
    renderSlotOverlay(var1: GuiGraphics, var2: number, var3: number, var4: number, var5: number): void;
  }


  class ISettingsTabFactory<C extends SettingsContainerBase<any> = any, T extends SettingsTab<C> = any> {
    create(var1: C, var2: Position, var3: SettingsScreen): T;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.alchemy' {
  import { Enum, Boolean } from 'java.lang';
  import { LivingEntity, Entity } from 'net.minecraft.world.entity';
  import { List } from 'java.util';
  import { IntValue, Builder } from 'ModConfigSpec';
  import { UpgradeContainerBase, UpgradeContainerType } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { EntityMatch, UpgradeItemBase, IUpgradeCountLimitConfig, UpgradeType, UpgradeWrapperBase, ITickableUpgrade } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { IntSupplier } from 'java.util.function';
  import { UpgradeConflictDefinition } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.IUpgradeItem';
  import { UpgradeSettingsTab } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { Toggle } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls.ButtonDefinition';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { AlchemyItemDefinition, ObservableFilterItemStackHandler } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.alchemy.AlchemyUpgradeWrapper';

  interface AlchemyCondition extends Enum<AlchemyCondition> {}
  class AlchemyCondition extends Enum<AlchemyCondition> {
    static readonly NEVER: AlchemyCondition;
    static readonly ALWAYS: AlchemyCondition;
    static readonly UNDER_WATER: AlchemyCondition;
    static readonly ON_FIRE: AlchemyCondition;
    static readonly FALLING: AlchemyCondition;
    static readonly MINING: AlchemyCondition;
    static readonly SPRINTING: AlchemyCondition;
    static readonly HURT: AlchemyCondition;
    static readonly NEGATIVE_EFFECT: AlchemyCondition;
    defaultValue(): number;
    static fromName(name: string): AlchemyCondition;
    get serializedName(): string;
    next(): AlchemyCondition;
    test(livingEntity: LivingEntity, value: number): boolean;
    static valueOf(name: string): AlchemyCondition;
    static values(): AlchemyCondition[];
  }


  class AlchemyUpgradeConfig {
    readonly filterSlots: IntValue;
    constructor(builder: Builder, name: string, path: string, defaultFilterSlots: number);
  }


  interface AlchemyUpgradeContainer extends UpgradeContainerBase<AlchemyUpgradeWrapper, AlchemyUpgradeContainer> {}
  class AlchemyUpgradeContainer extends UpgradeContainerBase<AlchemyUpgradeWrapper, AlchemyUpgradeContainer> {
    static readonly EMPTY_POTION_SLOT_BACKGROUND: ResourceLocation;
    static readonly DATA_CONDITION: string;
    static readonly DATA_MATCH_ALL: string;
    static readonly DATA_MATCH_AMPLIFIER: string;
    constructor(player: Player, upgradeContainerId: number, upgradeWrapper: AlchemyUpgradeWrapper, type: UpgradeContainerType<AlchemyUpgradeWrapper, AlchemyUpgradeContainer>);
    get entityMatch(): EntityMatch;
    getCondition(slot: number): AlchemyCondition;
    getValue(slot: number): number;
    handlePacket(data: CompoundTag): void;
    hasEntityMatchOption(): boolean;
    hasNoFilter(slot: number): boolean;
    mayPickup(player: Player): boolean;
    mayPlace(stack: ItemStack): boolean;
    setValue(slot: number, value: number): void;
    shouldMatchAll(): boolean;
    shouldMatchAmplifier(): boolean;
    shouldMatchDuration(): boolean;
    toggleCondition(slot: number): void;
    toggleEntityMatch(): void;
    toggleMatchAll(): void;
    toggleMatchAmplifier(): void;
    toggleMatchDuration(): void;
  }


  interface AlchemyUpgradeItem extends UpgradeItemBase<AlchemyUpgradeWrapper> {}
  class AlchemyUpgradeItem extends UpgradeItemBase<AlchemyUpgradeWrapper> {
    constructor(filterSlotCount: IntSupplier, upgradeTypeLimitConfig: IUpgradeCountLimitConfig);
    get filterSlotCount(): number;
    get type(): UpgradeType<AlchemyUpgradeWrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
  }


  interface AlchemyUpgradeTab extends UpgradeSettingsTab<AlchemyUpgradeContainer> {}
  class AlchemyUpgradeTab extends UpgradeSettingsTab<AlchemyUpgradeContainer> {
    static readonly ALCHEMY_CONDITION: Toggle;
    static readonly ANY_EFFECT_MISSING: Toggle;
    static readonly MATCH_DURATION: Toggle;
    static readonly MATCH_AMPLIFIER: Toggle;
    static readonly ENTITY_MATCH: Toggle;
    mouseScrolled(mouseX: number, mouseY: number, scrollX: number, scrollY: number): boolean;
  }


  interface AlchemyUpgradeWrapper extends ITickableUpgrade, UpgradeWrapperBase<AlchemyUpgradeWrapper, AlchemyUpgradeItem> {}
  class AlchemyUpgradeWrapper extends ITickableUpgrade {
    static addItemDefinition(itemDefinition: AlchemyItemDefinition): void;
    get entityMatch(): EntityMatch;
    get filterAttributes(): AlchemyFilterAttribute[];
    get filterHandler(): ObservableFilterItemStackHandler;
    getCondition(slot: number): AlchemyCondition;
    static getDefaultConditionForPotion(potionStack: ItemStack): AlchemyCondition;
    getValue(slot: number): number;
    isValidAlchemyItem(stack: ItemStack): boolean;
    set entityMatch(entityMatch: EntityMatch);
    setConditionValue(slot: number, condition: AlchemyCondition, value: number): void;
    setMatchAllEffects(matchAllEffects: boolean): void;
    setMatchEffectAmplifier(matchEffectAmplifier: boolean): void;
    setMatchEffectDuration(matchEffectDuration: boolean): void;
    static shouldApplyPotionEffectsTo(le: LivingEntity, potionStack: ItemStack, matchAllEffects: boolean, matchEffectAmplifier: boolean): boolean;
    shouldMatchAllEffects(): boolean;
    shouldMatchEffectAmplifier(): boolean;
    shouldMatchEffectDuration(): boolean;
    static stackPotionEffectsMatch(stack: ItemStack, filter: ItemStack, matchAllEffects: boolean, matchEffectDuration: boolean, matchEffectAmplifier: boolean): boolean;
    tick(entity: Entity, level: Level, pos: BlockPos): void;
    triggerItemUseEffects(level: Level): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.alchemy.AlchemyUpgradeTab' {
  import { AlchemyUpgradeTab, AlchemyUpgradeContainer } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.alchemy';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';

  interface Advanced extends AlchemyUpgradeTab {}
  class Advanced extends AlchemyUpgradeTab {
    constructor(upgradeContainer: AlchemyUpgradeContainer, position: Position, screen: StorageScreenBase<any>);
  }


  interface Basic extends AlchemyUpgradeTab {}
  class Basic extends AlchemyUpgradeTab {
    constructor(upgradeContainer: AlchemyUpgradeContainer, position: Position, screen: StorageScreenBase<any>);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.alchemy.AlchemyUpgradeWrapper' {
  import { FilterItemStackHandler } from 'net.p3pp3rf1y.sophisticatedcore.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { List } from 'java.util';
  import { AlchemyFilterAttribute } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.alchemy';
  import { LivingEntity } from 'net.minecraft.world.entity';

  interface ObservableFilterItemStackHandler extends FilterItemStackHandler {}
  class ObservableFilterItemStackHandler extends FilterItemStackHandler {
    constructor(filterSlotCount: number);
    initFilters(filterAttributes: AlchemyFilterAttribute[]): void;
    isItemValid(slot: number, stack: ItemStack): boolean;
  }


  class FinishUsing {
    apply(var1: ItemStack, var2: LivingEntity): ItemStack;
  }


  class AlchemyItemEntityMatcher {
    test(var1: LivingEntity, var2: ItemStack, var3: boolean, var4: boolean): boolean;
  }


  class AlchemyItemStackMatcher {
    test(var1: ItemStack, var2: ItemStack, var3: boolean, var4: boolean, var5: boolean): boolean;
  }


  class StartUsing {
    applyAsInt(var1: ItemStack, var2: LivingEntity): number;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.battery' {
  import { UpgradeInventoryPartBase, StorageScreenBase, UpgradeSettingsTab } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { IntValue, DoubleValue, Builder } from 'ModConfigSpec';
  import { UpgradeContainerBase, UpgradeContainerType, UpgradeSlotChangeResult } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { UpgradeItemBase, UpgradeType, IUpgradeCountLimitConfig, IUpgradeItem, UpgradeWrapperBase, IRenderedBatteryUpgrade, ITickableUpgrade, IStackableContentsUpgrade } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { List } from 'java.util';
  import { UpgradeConflictDefinition } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.IUpgradeItem';
  import { IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { IEnergyStorage } from 'net.neoforged.neoforge.energy';
  import { Consumer } from 'java.util.function';
  import { BatteryRenderInfo } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.IRenderedBatteryUpgrade';
  import { Entity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { IItemHandler } from 'net.neoforged.neoforge.items';

  interface BatteryInventoryPart extends UpgradeInventoryPartBase<BatteryUpgradeContainer> {}
  class BatteryInventoryPart extends UpgradeInventoryPartBase<BatteryUpgradeContainer> {
    constructor(upgradeSlot: number, container: BatteryUpgradeContainer, pos: Position, height: number, screen: StorageScreenBase<any>);
    handleMouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    renderErrorOverlay(guiGraphics: GuiGraphics): void;
    renderTooltip(screen: StorageScreenBase<any>, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
  }


  class BatteryUpgradeConfig {
    readonly energyPerSlotRow: IntValue;
    readonly stackMultiplierRatio: DoubleValue;
    readonly maxInputOutput: IntValue;
    constructor(builder: Builder);
  }


  interface BatteryUpgradeContainer extends UpgradeContainerBase<BatteryUpgradeWrapper, BatteryUpgradeContainer> {}
  class BatteryUpgradeContainer extends UpgradeContainerBase<BatteryUpgradeWrapper, BatteryUpgradeContainer> {
    static readonly EMPTY_BATTERY_INPUT_SLOT_BACKGROUND: ResourceLocation;
    static readonly EMPTY_BATTERY_OUTPUT_SLOT_BACKGROUND: ResourceLocation;
    constructor(player: Player, upgradeContainerId: number, upgradeWrapper: BatteryUpgradeWrapper, type: UpgradeContainerType<BatteryUpgradeWrapper, BatteryUpgradeContainer>);
    get energyStored(): number;
    get maxEnergyStored(): number;
    getMaxStackSize(stack: ItemStack): number;
    getMaxStackSize(stack: ItemStack): number;
    handlePacket(data: CompoundTag): void;
  }


  interface BatteryUpgradeItem extends UpgradeItemBase<BatteryUpgradeWrapper> {}
  class BatteryUpgradeItem extends UpgradeItemBase<BatteryUpgradeWrapper> {
    static readonly TYPE: UpgradeType;
    static readonly UPGRADE_CONFLICT_DEFINITIONS: List;
    constructor(batteryUpgradeConfig: BatteryUpgradeConfig, upgradeTypeLimitConfig: IUpgradeCountLimitConfig);
    checkExtraInsertConditions(upgradeStack: ItemStack, storageWrapper: IStorageWrapper, isClientSide: boolean, upgradeInSlot: IUpgradeItem<any>): UpgradeSlotChangeResult;
    get batteryUpgradeConfig(): BatteryUpgradeConfig;
    get inventoryColumnsTaken(): number;
    get type(): UpgradeType<BatteryUpgradeWrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
    getAdjustedStackMultiplier(storageWrapper: IStorageWrapper): number;
    getMaxEnergyBase(storageWrapper: IStorageWrapper): number;
    getMaxEnergyStored(storageWrapper: IStorageWrapper): number;
  }


  interface BatteryUpgradeTab extends UpgradeSettingsTab<BatteryUpgradeContainer> {}
  class BatteryUpgradeTab extends UpgradeSettingsTab<BatteryUpgradeContainer> {
    constructor(upgradeContainer: BatteryUpgradeContainer, position: Position, screen: StorageScreenBase<any>);
  }


  interface BatteryUpgradeWrapper extends IRenderedBatteryUpgrade, IEnergyStorage, ITickableUpgrade, IStackableContentsUpgrade, UpgradeWrapperBase<BatteryUpgradeWrapper, BatteryUpgradeItem> {}
  class BatteryUpgradeWrapper extends IRenderedBatteryUpgrade {
    static readonly INPUT_SLOT: number;
    static readonly OUTPUT_SLOT: number;
    canBeDisabled(): boolean;
    canExtract(): boolean;
    canReceive(): boolean;
    extractEnergy(maxExtract: number, simulate: boolean): number;
    forceUpdateBatteryRenderInfo(): void;
    get energyStored(): number;
    get inventory(): IItemHandler;
    get maxEnergyStored(): number;
    get minimumMultiplierRequired(): number;
    static getEnergyStored(upgrade: ItemStack): number;
    receiveEnergy(maxReceive: number, simulate: boolean): number;
    setBatteryRenderInfoUpdateCallback(updateTankRenderInfoCallback: Consumer<BatteryRenderInfo>): void;
    tick(entity: Entity, level: Level, pos: BlockPos): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.blockconverter' {
  import { Consumer } from 'java.util.function';
  import { Slot, ContainerLevelAccess } from 'net.minecraft.world.inventory';
  import { IServerUpdater, UpgradeContainerBase, UpgradeContainerType } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { Level } from 'net.minecraft.world.level';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Runnable, Boolean } from 'java.lang';
  import { List, Optional } from 'java.util';
  import { RecipeHolder } from 'net.minecraft.world.item.crafting';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { WidgetBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls';
  import { StorageScreenBase, UpgradeSettingsTab } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { Player } from 'net.minecraft.world.entity.player';
  import { UpgradeItemBase, IUpgradeCountLimitConfig, UpgradeWrapperBase } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { UpgradeConflictDefinition } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.IUpgradeItem';
  import { Component } from 'net.minecraft.network.chat';
  import { Toggle } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls.ButtonDefinition';
  import { IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { IItemHandlerModifiable } from 'net.neoforged.neoforge.items';
  import { ResourceLocation } from 'net.minecraft.resources';

  class BlockConverterRecipeContainer<R extends SingleItemRecipe = any, W extends BlockConverterUpgradeWrapper<any, any> = any, RC extends BlockConverterRecipeContainer<R, W, RC, C> = any, C extends BlockConverterUpgradeContainer<R, W, C, RC> = any> {
    constructor(upgradeContainer: C, addSlot: Consumer<Slot>, serverUpdater: IServerUpdater, worldPosCallable: ContainerLevelAccess, level: Level, craftSound: SoundEvent);
    get inputSlot(): Slot;
    get outputSlot(): Slot;
    get recipeList(): RecipeHolder<R>[];
    get selectedRecipe(): number;
    handlePacket(data: CompoundTag): void;
    hasItemsInInputSlot(): boolean;
    isNotResultSlot(slot: Slot): boolean;
    remove(amount: number): ItemStack;
    safeInsert(stack: ItemStack, increment: number): ItemStack;
    selectRecipe(recipeIndex: number): boolean;
    setChanged(): void;
    setInventoryUpdateListener(listenerIn: Runnable): void;
  }


  interface BlockConverterRecipeControl<R extends SingleItemRecipe = any, RC extends BlockConverterRecipeContainer<R, any, RC, any> = any> extends WidgetBase {}
  class BlockConverterRecipeControl<R extends SingleItemRecipe = any, RC extends BlockConverterRecipeContainer<R, any, RC, any> = any> extends WidgetBase {
    constructor(screen: StorageScreenBase<any>, container: BlockConverterRecipeContainer<R, any, RC, any>, position: Position, renderResultCount: boolean);
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrollX: number, scrollY: number): boolean;
    moveSlotsToView(): void;
    renderTooltip(screen: Screen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
  }


  interface BlockConverterUpgradeContainer<R extends SingleItemRecipe = any, W extends BlockConverterUpgradeWrapper<any, any> = any, C extends BlockConverterUpgradeContainer<R, W, C, RC> = any, RC extends BlockConverterRecipeContainer<R, W, RC, C> = any> extends UpgradeContainerBase<W, C> {}
  class BlockConverterUpgradeContainer<R extends SingleItemRecipe = any, W extends BlockConverterUpgradeWrapper<any, any> = any, C extends BlockConverterUpgradeContainer<R, W, C, RC> = any, RC extends BlockConverterRecipeContainer<R, W, RC, C> = any> extends UpgradeContainerBase<W, C> {
    constructor(player: Player, upgradeContainerId: number, upgradeWrapper: W, type: UpgradeContainerType<W, C>);
    allowsPickupAll(slot: Slot): boolean;
    get recipeContainer(): RC;
    handlePacket(data: CompoundTag): void;
    mergeIntoStorageFirst(slot: Slot): boolean;
    setShiftClickIntoStorage(shiftClickIntoStorage: boolean): void;
    shouldShiftClickIntoStorage(): boolean;
  }


  interface BlockConverterUpgradeItem<U extends BlockConverterUpgradeItem<U, W> = any, W extends BlockConverterUpgradeWrapper<U, W> = any> extends UpgradeItemBase<W> {}
  class BlockConverterUpgradeItem<U extends BlockConverterUpgradeItem<U, W> = any, W extends BlockConverterUpgradeWrapper<U, W> = any> extends UpgradeItemBase<W> {
    constructor(upgradeTypeLimitConfig: IUpgradeCountLimitConfig);
    get upgradeConflicts(): UpgradeConflictDefinition[];
  }


  interface BlockConverterUpgradeTab<R extends SingleItemRecipe = any, RC extends BlockConverterRecipeContainer<R, any, RC, C> = any, C extends BlockConverterUpgradeContainer<R, any, C, RC> = any> extends UpgradeSettingsTab<C> {}
  class BlockConverterUpgradeTab<R extends SingleItemRecipe = any, RC extends BlockConverterRecipeContainer<R, any, RC, C> = any, C extends BlockConverterUpgradeContainer<R, any, C, RC> = any> extends UpgradeSettingsTab<C> {
    constructor(upgradeContainer: C, position: Position, screen: StorageScreenBase<any>, tabLabel: Component, closedTooltip: Component, shiftClickTargetButton: Toggle<boolean>);
  }


  interface BlockConverterUpgradeWrapper<U extends BlockConverterUpgradeItem<U, W> = any, W extends BlockConverterUpgradeWrapper<U, W> = any> extends UpgradeWrapperBase<W, U> {}
  class BlockConverterUpgradeWrapper<U extends BlockConverterUpgradeItem<U, W> = any, W extends BlockConverterUpgradeWrapper<U, W> = any> extends UpgradeWrapperBase<W, U> {
    constructor(storageWrapper: IStorageWrapper, upgrade: ItemStack, upgradeSaveHandler: Consumer<ItemStack>);
    canBeDisabled(): boolean;
    get inputInventory(): IItemHandlerModifiable;
    get recipeId(): Optional<ResourceLocation>;
    set recipeId(recipeId: ResourceLocation);
    setShiftClickIntoStorage(shiftClickIntoStorage: boolean): void;
    shouldShiftClickIntoStorage(): boolean;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.compacting' {
  import { UpgradeContainerBase, UpgradeContainerType } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { Player } from 'net.minecraft.world.entity.player';
  import { FilterLogicContainer, FilterLogic, UpgradeItemBase, IUpgradeCountLimitConfig, UpgradeType, UpgradeWrapperBase, IInsertResponseUpgrade, IFilteredUpgrade, ITickableUpgrade, IExtractResponseUpgrade } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { IntSupplier, Consumer } from 'java.util.function';
  import { List } from 'java.util';
  import { UpgradeConflictDefinition } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.IUpgradeItem';
  import { UpgradeSettingsTab } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { Toggle } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls.ButtonDefinition';
  import { ISlotChangeResponseUpgrade, IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IItemHandlerSimpleInserter } from 'net.p3pp3rf1y.sophisticatedcore.inventory';
  import { IItemHandler } from 'net.neoforged.neoforge.items';
  import { Entity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';

  interface CompactingUpgradeContainer extends UpgradeContainerBase<CompactingUpgradeWrapper, CompactingUpgradeContainer> {}
  class CompactingUpgradeContainer extends UpgradeContainerBase<CompactingUpgradeWrapper, CompactingUpgradeContainer> {
    constructor(player: Player, containerId: number, wrapper: CompactingUpgradeWrapper, type: UpgradeContainerType<CompactingUpgradeWrapper, CompactingUpgradeContainer>);
    get filterLogicContainer(): FilterLogicContainer<FilterLogic>;
    handlePacket(data: CompoundTag): void;
    setCompactNonUncraftable(shouldCompactNonUncraftable: boolean): void;
    setShouldWorkdInGUI(shouldWorkdInGUI: boolean): void;
    shouldCompactNonUncraftable(): boolean;
    shouldWorkInGUI(): boolean;
  }


  interface CompactingUpgradeItem extends UpgradeItemBase<CompactingUpgradeWrapper> {}
  class CompactingUpgradeItem extends UpgradeItemBase<CompactingUpgradeWrapper> {
    constructor(shouldCompactThreeByThree: boolean, filterSlotCount: IntSupplier, upgradeTypeLimitConfig: IUpgradeCountLimitConfig);
    get filterSlotCount(): number;
    get type(): UpgradeType<CompactingUpgradeWrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
    shouldCompactThreeByThree(): boolean;
  }


  interface CompactingUpgradeTab extends UpgradeSettingsTab<CompactingUpgradeContainer> {}
  class CompactingUpgradeTab extends UpgradeSettingsTab<CompactingUpgradeContainer> {
    static readonly COMPACT_UNCRAFTABLE: Toggle;
  }


  interface CompactingUpgradeWrapper extends IInsertResponseUpgrade, IFilteredUpgrade, ISlotChangeResponseUpgrade, ITickableUpgrade, IExtractResponseUpgrade, UpgradeWrapperBase<CompactingUpgradeWrapper, CompactingUpgradeItem> {}
  class CompactingUpgradeWrapper extends IInsertResponseUpgrade {
    constructor(storageWrapper: IStorageWrapper, upgrade: ItemStack, upgradeSaveHandler: Consumer<ItemStack>);
    get filterLogic(): FilterLogic;
    onAfterExtract(inventoryHandler: IItemHandlerSimpleInserter, slot: number, originalContents: ItemStack): void;
    onAfterInsert(inventoryHandler: IItemHandlerSimpleInserter, slot: number): void;
    onSlotChange(handler: IItemHandler, slot: number): void;
    resetFullSlotInfo(): void;
    setCompactNonUncraftable(shouldCompactNonUncraftable: boolean): void;
    setShouldWorkdInGUI(shouldWorkdInGUI: boolean): void;
    shouldCompactNonUncraftable(): boolean;
    shouldWorkInGUI(): boolean;
    tick(entity: Entity, level: Level, pos: BlockPos): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.compacting.CompactingUpgradeTab' {
  import { CompactingUpgradeTab, CompactingUpgradeContainer } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.compacting';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';

  interface Advanced extends CompactingUpgradeTab {}
  class Advanced extends CompactingUpgradeTab {
    constructor(upgradeContainer: CompactingUpgradeContainer, position: Position, screen: StorageScreenBase<any>, slotsPerRow: number);
  }


  interface Basic extends CompactingUpgradeTab {}
  class Basic extends CompactingUpgradeTab {
    constructor(upgradeContainer: CompactingUpgradeContainer, position: Position, screen: StorageScreenBase<any>, slotsPerRow: number);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades' {
  import { NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { UpgradeContainerBase, UpgradeContainerType, IServerUpdater, UpgradeSlotChangeResult } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ItemStack, Item, TooltipFlag } from 'net.minecraft.world.item';
  import { Consumer, Supplier, Predicate } from 'java.util.function';
  import { InventoryHandler, IItemHandlerSimpleInserter } from 'net.p3pp3rf1y.sophisticatedcore.inventory';
  import { MemorySettingsCategory } from 'net.p3pp3rf1y.sophisticatedcore.settings.memory';
  import { DeferredHolder } from 'net.neoforged.neoforge.registries';
  import { DataComponentType } from 'net.minecraft.core.component';
  import { Slot } from 'net.minecraft.world.inventory';
  import { Enum, Class, Runnable, Integer } from 'java.lang';
  import { List, Set, Map } from 'java.util';
  import { Builder, IntValue } from 'ModConfigSpec';
  import { ObservableFilterItemStackHandler } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.FilterLogic';
  import { TagKey } from 'net.minecraft.tags';
  import { FilterLogicSlot } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.FilterLogicContainer';
  import { TagSelectionSlot } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.FilterLogicContainerBase';
  import { StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { MatchButton } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.FilterLogicControlBase';
  import { CompositeWidgetBase, WidgetBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Level } from 'net.minecraft.world.level';
  import { BatteryRenderInfo } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.IRenderedBatteryUpgrade';
  import { TankRenderInfo } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.IRenderedTankUpgrade';
  import { Entity } from 'net.minecraft.world.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { UpgradeConflictDefinition } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.IUpgradeItem';
  import { Component } from 'net.minecraft.network.chat';
  import { ItemStackHandler } from 'net.neoforged.neoforge.items';
  import { ItemBase } from 'net.p3pp3rf1y.sophisticatedcore.util';
  import { TooltipContext } from 'Item';
  import { IFactory } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.UpgradeType';

  interface ContentsFilterControl extends FilterLogicControl<ContentsFilterLogic, ContentsFilterLogicContainer> {}
  class ContentsFilterControl extends FilterLogicControl<ContentsFilterLogic, ContentsFilterLogicContainer> {
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
  }


  interface ContentsFilteredUpgradeContainer<W extends IUpgradeWrapper & IContentsFilteredUpgrade = any> extends UpgradeContainerBase<W, ContentsFilteredUpgradeContainer> {}
  class ContentsFilteredUpgradeContainer<W extends IUpgradeWrapper & IContentsFilteredUpgrade = any> extends UpgradeContainerBase<W, ContentsFilteredUpgradeContainer> {
    constructor(player: Player, containerId: number, wrapper: W, type: UpgradeContainerType<W, ContentsFilteredUpgradeContainer<W>>);
    get filterLogicContainer(): ContentsFilterLogicContainer;
    handlePacket(data: CompoundTag): void;
  }


  interface ContentsFilterLogic extends FilterLogic {}
  class ContentsFilterLogic extends FilterLogic {
    constructor(upgrade: ItemStack, saveHandler: Consumer<ItemStack>, filterSlotCount: number, getInventoryHandler: Supplier<InventoryHandler>, memorySettings: MemorySettingsCategory, filterAttributesComponent: DeferredHolder<DataComponentType<any>, DataComponentType<FilterAttributes>>);
    get filterType(): ContentsFilterType;
    matchesFilter(stack: ItemStack): boolean;
    setDepositFilterType(contentsFilterType: ContentsFilterType): void;
  }


  interface ContentsFilterLogicContainer extends FilterLogicContainer<ContentsFilterLogic> {}
  class ContentsFilterLogicContainer extends FilterLogicContainer<ContentsFilterLogic> {
    constructor(filterLogic: Supplier<ContentsFilterLogic>, serverUpdater: IServerUpdater, addSlot: Consumer<Slot>);
    get filterType(): ContentsFilterType;
    handlePacket(data: CompoundTag): boolean;
    set filterType(depositFilterType: ContentsFilterType);
  }


  interface ContentsFilterType extends Enum<ContentsFilterType> {}
  class ContentsFilterType extends Enum<ContentsFilterType> {
    static readonly ALLOW: ContentsFilterType;
    static readonly BLOCK: ContentsFilterType;
    static readonly STORAGE: ContentsFilterType;
    static fromName(name: string): ContentsFilterType;
    get serializedName(): string;
    next(): ContentsFilterType;
    static valueOf(name: string): ContentsFilterType;
    static values(): ContentsFilterType[];
  }


  interface EntityMatch extends Enum<EntityMatch> {}
  class EntityMatch extends Enum<EntityMatch> {
    static readonly PLAYERS: EntityMatch;
    static readonly PLAYERS_AND_ENTITIES: EntityMatch;
    static readonly ENTITIES: EntityMatch;
    static fromName(name: string): EntityMatch;
    get serializedName(): string;
    next(): EntityMatch;
    static valueOf(name: string): EntityMatch;
    static values(): EntityMatch[];
  }


  interface FilteredUpgradeConfig extends FilteredUpgradeConfigBase {}
  class FilteredUpgradeConfig extends FilteredUpgradeConfigBase {
    constructor(builder: Builder, name: string, path: string, defaultFilterSlots: number, defaultSlotsInRow: number);
  }


  class FilteredUpgradeConfigBase {
    readonly filterSlots: IntValue;
    readonly slotsInRow: IntValue;
  }


  class FilterLogic {
    constructor(upgrade: ItemStack, saveHandler: Consumer<ItemStack>, defaultFilterSlotCount: number, filterAttributesComponent: DeferredHolder<DataComponentType<any>, DataComponentType<FilterAttributes>>);

    constructor(upgrade: ItemStack, saveHandler: Consumer<ItemStack>, defaultFilterSlotCount: number, isItemValid: Predicate<ItemStack>, filterAttributesComponent: DeferredHolder<DataComponentType<any>, DataComponentType<FilterAttributes>>);
    addTag(tagName: TagKey<Item>): void;
    get attributesComponent(): DeferredHolder<DataComponentType<any>, DataComponentType<FilterAttributes>>;
    get filterHandler(): ObservableFilterItemStackHandler;
    get primaryMatch(): PrimaryMatch;
    get tagKeys(): Set<TagKey<Item>>;
    isAllowList(): boolean;
    matchesFilter(stack: ItemStack): boolean;
    removeTagName(tagName: TagKey<Item>): void;
    set primaryMatch(primaryMatch: PrimaryMatch);
    setAllowByDefault(allowListDefault: boolean): void;
    setAllowList(isAllowList: boolean): void;
    setEmptyAllowListMatchesEverything(): void;
    setMatchAnyTag(matchAnyTag: boolean): void;
    setMatchComponents(matchComponents: boolean): void;
    setMatchDurability(matchDurability: boolean): void;
    shouldMatchAnyTag(): boolean;
    shouldMatchComponents(): boolean;
    shouldMatchDurability(): boolean;
    stackMatchesFilter(stack: ItemStack, filter: ItemStack): boolean;
  }


  interface FilterLogicContainer<T extends FilterLogic = any> extends FilterLogicContainerBase<T, FilterLogicSlot> {}
  class FilterLogicContainer<T extends FilterLogic = any> extends FilterLogicContainerBase<T, FilterLogicSlot> {
    constructor(filterLogic: Supplier<T>, serverUpdater: IServerUpdater, addSlot: Consumer<Slot>);
  }


  class FilterLogicContainerBase<T extends FilterLogic = any, S extends Slot = any> {
    constructor(serverUpdater: IServerUpdater, filterLogic: Supplier<T>, addSlot: Consumer<Slot>);
    addSelectedTag(): void;
    get filterSlots(): S[];
    get primaryMatch(): PrimaryMatch;
    get selectedTagToAdd(): number;
    get selectedTagToRemove(): number;
    get tagNames(): Set<TagKey<Item>>;
    get tagSelectionSlot(): TagSelectionSlot;
    get tagsToAdd(): Set<TagKey<Item>>;
    handlePacket(data: CompoundTag): boolean;
    isAllowList(): boolean;
    removeSelectedTag(): void;
    selectNextTagToAdd(): void;
    selectNextTagToRemove(): void;
    selectPreviousTagToAdd(): void;
    selectPreviousTagToRemove(): void;
    set primaryMatch(primaryMatch: PrimaryMatch);
    setAllowList(isAllowList: boolean): void;
    setMatchAnyTag(matchAnyTag: boolean): void;
    setMatchDurability(matchDurability: boolean): void;
    setMatchNbt(matchNbt: boolean): void;
    shouldMatchAnyTag(): boolean;
    shouldMatchDurability(): boolean;
    shouldMatchNbt(): boolean;
  }


  interface FilterLogicControl<L extends FilterLogic = any, C extends FilterLogicContainer<L> = any> extends FilterLogicControlBase<L, FilterLogicSlot, C> {}
  class FilterLogicControl<L extends FilterLogic = any, C extends FilterLogicContainer<L> = any> extends FilterLogicControlBase<L, FilterLogicSlot, C> {
    constructor(screen: StorageScreenBase<any>, position: Position, filterLogicContainer: C, slotsPerRow: number, ...showMatchButtons: MatchButton[]);
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
  }


  interface FilterLogicControlBase<F extends FilterLogic = any, S extends Slot = any, C extends FilterLogicContainerBase<F, S> = any> extends CompositeWidgetBase<WidgetBase> {}
  class FilterLogicControlBase<F extends FilterLogic = any, S extends Slot = any, C extends FilterLogicContainerBase<F, S> = any> extends CompositeWidgetBase<WidgetBase> {
    static readonly TAG_FONT_COLOR: number;
    static readonly MORE_TAGS_FONT_COLOR: number;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    moveSlotsToView(): void;
    renderTooltip(screen: Screen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
  }


  interface IContentsFilteredUpgrade extends IFilteredUpgrade {}
  class IContentsFilteredUpgrade extends IFilteredUpgrade {
    get filterLogic(): ContentsFilterLogic;
  }


  class IExtractResponseUpgrade {
    onAfterExtract(var1: IItemHandlerSimpleInserter, var2: number, var3: ItemStack): void;
  }


  class IFilteredUpgrade {
    get filterLogic(): FilterLogic;
  }


  class IInsertResponseUpgrade {
    onAfterInsert(inventoryHandler: IItemHandlerSimpleInserter, slot: number): void;
    onBeforeInsert(inventoryHandler: InventoryHandler, slot: number, stack: ItemStack, simulate: boolean): ItemStack;
    onBeforeInsert(inventoryHandler: InventoryHandler, stack: ItemStack, simulate: boolean): ItemStack;
  }


  class IOverflowResponseUpgrade {
    get filterLogic(): FilterLogic;
    onSlotOverflow(var1: ItemStack): ItemStack;
    onStorageOverflow(var1: ItemStack): ItemStack;
    stackMatchesFilter(var1: ItemStack): boolean;
    worksInGui(): boolean;
  }


  class IPickupResponseUpgrade {
    pickup(var1: Level, var2: ItemStack, var3: boolean): ItemStack;
  }


  class IRenderedBatteryUpgrade {
    forceUpdateBatteryRenderInfo(): void;
    setBatteryRenderInfoUpdateCallback(var1: Consumer<BatteryRenderInfo>): void;
  }


  class IRenderedTankUpgrade {
    forceUpdateTankRenderInfo(): void;
    setTankRenderInfoUpdateCallback(var1: Consumer<TankRenderInfo>): void;
  }


  class ISlotLimitUpgrade {
    get slotLimit(): number;
  }


  class IStackableContentsUpgrade {
    get minimumMultiplierRequired(): number;
  }


  class ITickableUpgrade {
    tick(var1: Entity, var2: Level, var3: BlockPos): void;
  }


  class IUpgradeAccessModifier {
    wrapAccessor(var1: IUpgradeWrapperAccessor): IUpgradeWrapperAccessor;
  }


  class IUpgradeCountLimitConfig {
    getMaxUpgradesInGroupPerStorage(var1: string, var2: UpgradeGroup): number;
    getMaxUpgradesPerStorage(var1: string, var2: ResourceLocation): number;
  }


  class IUpgradeItem<T extends IUpgradeWrapper = any> {
    canAddUpgradeTo(storageWrapper: IStorageWrapper, upgradeStack: ItemStack, firstLevelStorage: boolean, isClientSide: boolean): UpgradeSlotChangeResult;
    canRemoveUpgradeFrom(storageWrapper: IStorageWrapper, isClientSide: boolean, player: Player): UpgradeSlotChangeResult;
    canRemoveUpgradeFrom(storageWrapper: IStorageWrapper, isClientSide: boolean): UpgradeSlotChangeResult;
    canSwapUpgradeFor(upgradeStackToPut: ItemStack, upgradeSlot: number, storageWrapper: IStorageWrapper, isClientSide: boolean): UpgradeSlotChangeResult;
    checkExtraInsertConditions(upgradeStack: ItemStack, storageWrapper: IStorageWrapper, isClientSide: boolean, upgradeSlot: number, upgradeInSlot: IUpgradeItem<any>): UpgradeSlotChangeResult;
    checkExtraInsertConditions(upgradeStack: ItemStack, storageWrapper: IStorageWrapper, isClientSide: boolean, upgradeInSlot: IUpgradeItem<any>): UpgradeSlotChangeResult;
    checkThisForConflictsWithExistingUpgrades(upgradeStack: ItemStack, storageWrapper: IStorageWrapper, excludeUpgradeSlot: number): UpgradeSlotChangeResult;
    get inventoryColumnsTaken(): number;
    get name(): Component;
    get type(): UpgradeType<T>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
    get upgradeGroup(): UpgradeGroup;
    getCleanedUpgradeStack(upgradeStack: ItemStack): ItemStack;
    getUpgradesInGroupPerStorage(var1: string): number;
    getUpgradesPerStorage(var1: string): number;
  }


  class IUpgradeWrapper {
    canBeDisabled(): boolean;
    get upgradeStack(): ItemStack;
    hideSettingsTab(): boolean;
    isEnabled(): boolean;
    onAdded(): void;
    onBeforeRemoved(): void;
    setEnabled(var1: boolean): void;
  }


  class IUpgradeWrapperAccessor {
    clearCache(): void;
    getWrappersThatImplement<T>(var1: Class<T>): T[];
    getWrappersThatImplementFromMainStorage<T>(var1: Class<T>): T[];
    onBeforeDeconstruct(): void;
  }


  interface PrimaryMatch extends Enum<PrimaryMatch> {}
  class PrimaryMatch extends Enum<PrimaryMatch> {
    static readonly ITEM: PrimaryMatch;
    static readonly MOD: PrimaryMatch;
    static readonly TAGS: PrimaryMatch;
    static fromName(name: string): PrimaryMatch;
    get serializedName(): string;
    next(): PrimaryMatch;
    static valueOf(name: string): PrimaryMatch;
    static values(): PrimaryMatch[];
  }


  class UpgradeGroup {
    static readonly NONE: UpgradeGroup;
    constructor(name: string, translName: string);
    isSolo(): boolean;
    translName(): string;
  }


  interface UpgradeHandler extends ItemStackHandler {}
  class UpgradeHandler extends ItemStackHandler {
    static readonly UPGRADE_INVENTORY_TAG: string;
    constructor(numberOfUpgradeSlots: number, storageWrapper: IStorageWrapper, contentsNbt: CompoundTag, contentsSaveHandler: Runnable, onInvalidateUpgradeCaches: Runnable);
    copyTo(otherHandler: UpgradeHandler): void;
    extractItem(slot: number, amount: number, simulate: boolean): ItemStack;
    get slotWrappers(): Map<number, IUpgradeWrapper>;
    getListOfWrappersThatImplement<T>(uc: Class<T>): T[];
    getSlotLimit(slot: number): number;
    getTypeWrappers<T extends IUpgradeWrapper>(type: UpgradeType<T>): T[];
    getWrappersThatImplement<T>(upgradeClass: Class<T>): T[];
    getWrappersThatImplementFromMainStorage<T>(upgradeClass: Class<T>): T[];
    hasUpgrade<T extends IUpgradeWrapper>(type: UpgradeType<T>): boolean;
    increaseSize(diff: number): void;
    insertItem(slot: number, stack: ItemStack, simulate: boolean): ItemStack;
    isItemValid(slot: number, stack: ItemStack): boolean;
    refreshUpgradeWrappers(): void;
    refreshWrappersThatImplementAndTypeWrappers(): void;
    registerUpgradeDefaultsHandler<T extends IUpgradeWrapper>(upgradeClass: Class<T>, defaultsHandler: Consumer<T>): void;
    removeRefreshCallback(): void;
    saveInventory(): void;
    setPersistent(persistent: boolean): void;
    setRefreshCallBack(refreshCallBack: Runnable): void;
    setRenderUpgradeItems(): void;
    setSize(size: number): void;
    setStackInSlot(slot: number, stack: ItemStack): void;
  }


  interface UpgradeItemBase<T extends IUpgradeWrapper = any> extends IUpgradeItem<T>, ItemBase {}
  class UpgradeItemBase<T extends IUpgradeWrapper = any> extends IUpgradeItem<T> {
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    get name(): Component;
    getUpgradesInGroupPerStorage(storageType: string): number;
    getUpgradesPerStorage(storageType: string): number;
  }


  class UpgradeType<T extends IUpgradeWrapper = any> {
    constructor(factory: IFactory<T>);
    create(storageWrapper: IStorageWrapper, upgrade: ItemStack, upgradeSaveHandler: Consumer<ItemStack>): T;
  }


  interface UpgradeWrapperBase<W extends IUpgradeWrapper = any, T extends UpgradeItemBase<W> = any> extends IUpgradeWrapper {}
  class UpgradeWrapperBase<W extends IUpgradeWrapper = any, T extends UpgradeItemBase<W> = any> extends IUpgradeWrapper {
    get cooldownTime(): number;
    get upgradeStack(): ItemStack;
    isEnabled(): boolean;
    isInCooldown(level: Level): boolean;
    setEnabled(enabled: boolean): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.ContentsFilterControl' {
  import { ContentsFilterControl, ContentsFilterLogicContainer, ContentsFilterType } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { Toggle } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls.ButtonDefinition';

  interface Advanced extends ContentsFilterControl {}
  class Advanced extends ContentsFilterControl {
    constructor(screen: StorageScreenBase<any>, position: Position, filterLogicContainer: ContentsFilterLogicContainer, slotsPerRow: number, contentsFilterButton: Toggle<ContentsFilterType>);
  }


  interface Basic extends ContentsFilterControl {}
  class Basic extends ContentsFilterControl {
    constructor(screen: StorageScreenBase<any>, position: Position, filterLogicContainer: ContentsFilterLogicContainer, slotsPerRow: number, contentsFilterButton: Toggle<ContentsFilterType>);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.cooking' {
  import { UpgradeItemBase, UpgradeType, IUpgradeCountLimitConfig, UpgradeGroup, FilterLogicContainer, FilterLogic, UpgradeWrapperBase, ITickableUpgrade } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { AutoBlastingUpgradeWrapper, AutoSmeltingUpgradeWrapper, AutoSmokingUpgradeWrapper } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.cooking.AutoCookingUpgradeWrapper';
  import { List } from 'java.util';
  import { UpgradeConflictDefinition } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.IUpgradeItem';
  import { IntValue, Builder, DoubleValue } from 'ModConfigSpec';
  import { UpgradeContainerBase, UpgradeContainerType } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { UpgradeSettingsTab } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { IStorageWrapper, IUpgradeRenderer } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Consumer, Predicate, Supplier, UnaryOperator } from 'java.util.function';
  import { RecipeType, RecipeHolder } from 'net.minecraft.world.item.crafting';
  import { Entity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { BlastingUpgradeWrapper, SmeltingUpgradeWrapper, SmokingUpgradeWrapper } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.cooking.CookingUpgradeWrapper';
  import { Codec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { CookingComponentItemHandler } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.cooking.CookingLogic';
  import { ServerPlayer, ServerLevel } from 'net.minecraft.server.level';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Slot } from 'net.minecraft.world.inventory';
  import { CompositeWidgetBase, WidgetBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { IUpgradeRenderData, UpgradeRenderDataType } from 'net.p3pp3rf1y.sophisticatedcore.renderdata';
  import { RandomSource } from 'net.minecraft.util';
  import { Vector3f } from 'org.joml';

  interface AutoBlastingUpgradeItem extends IAutoCookingUpgradeItem, UpgradeItemBase<AutoBlastingUpgradeWrapper> {}
  class AutoBlastingUpgradeItem extends IAutoCookingUpgradeItem {
    static readonly TYPE: UpgradeType;
    constructor(autoBlastingUpgradeConfig: AutoCookingUpgradeConfig, upgradeTypeLimitConfig: IUpgradeCountLimitConfig);
    get autoCookingUpgradeConfig(): AutoCookingUpgradeConfig;
    get type(): UpgradeType<AutoBlastingUpgradeWrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
    get upgradeGroup(): UpgradeGroup;
  }


  interface AutoCookingUpgradeConfig extends CookingUpgradeConfig {}
  class AutoCookingUpgradeConfig extends CookingUpgradeConfig {
    readonly inputFilterSlots: IntValue;
    readonly inputFilterSlotsInRow: IntValue;
    readonly fuelFilterSlots: IntValue;
    readonly fuelFilterSlotsInRow: IntValue;
    constructor(builder: Builder, upgradeName: string, path: string);
  }


  interface AutoCookingUpgradeContainer<R extends AbstractCookingRecipe = any, W extends AutoCookingUpgradeWrapper<W, any, R> = any> extends UpgradeContainerBase<W, AutoCookingUpgradeContainer> {}
  class AutoCookingUpgradeContainer<R extends AbstractCookingRecipe = any, W extends AutoCookingUpgradeWrapper<W, any, R> = any> extends UpgradeContainerBase<W, AutoCookingUpgradeContainer> {
    constructor(player: Player, containerId: number, wrapper: W, type: UpgradeContainerType<W, AutoCookingUpgradeContainer<R, W>>);
    get cookingLogicContainer(): CookingLogicContainer<R>;
    get fuelFilterLogicContainer(): FilterLogicContainer<FilterLogic>;
    get inputFilterLogicContainer(): FilterLogicContainer<FilterLogic>;
    handlePacket(data: CompoundTag): void;
  }


  interface AutoCookingUpgradeTab<R extends AbstractCookingRecipe = any, W extends AutoCookingUpgradeWrapper<W, any, R> = any> extends UpgradeSettingsTab<AutoCookingUpgradeContainer> {}
  class AutoCookingUpgradeTab<R extends AbstractCookingRecipe = any, W extends AutoCookingUpgradeWrapper<W, any, R> = any> extends UpgradeSettingsTab<AutoCookingUpgradeContainer> {
  }


  interface AutoCookingUpgradeWrapper<W extends AutoCookingUpgradeWrapper<W, U, R> = any, U extends UpgradeItemBase<W> = any, R extends AbstractCookingRecipe = any> extends ITickableUpgrade, ICookingUpgrade<R>, UpgradeWrapperBase<W, U> {}
  class AutoCookingUpgradeWrapper<W extends AutoCookingUpgradeWrapper<W, U, R> = any, U extends UpgradeItemBase<W> = any, R extends AbstractCookingRecipe = any> extends ITickableUpgrade {
    constructor(storageWrapper: IStorageWrapper, upgrade: ItemStack, upgradeSaveHandler: Consumer<ItemStack>, recipeType: RecipeType<R>, burnTimeModifier: number);
    get cookingLogic(): CookingLogic<R>;
    get fuelFilterLogic(): FilterLogic;
    get inputFilterLogic(): FilterLogic;
    onBeforeRemoved(): void;
    setEnabled(enabled: boolean): void;
    tick(entity: Entity, level: Level, pos: BlockPos): void;
  }


  interface AutoSmeltingUpgradeItem extends IAutoCookingUpgradeItem, UpgradeItemBase<AutoSmeltingUpgradeWrapper> {}
  class AutoSmeltingUpgradeItem extends IAutoCookingUpgradeItem {
    static readonly TYPE: UpgradeType;
    constructor(autoSmeltingUpgradeConfig: AutoCookingUpgradeConfig, upgradeTypeLimitConfig: IUpgradeCountLimitConfig);
    get autoCookingUpgradeConfig(): AutoCookingUpgradeConfig;
    get type(): UpgradeType<AutoSmeltingUpgradeWrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
    get upgradeGroup(): UpgradeGroup;
  }


  interface AutoSmokingUpgradeItem extends IAutoCookingUpgradeItem, UpgradeItemBase<AutoSmokingUpgradeWrapper> {}
  class AutoSmokingUpgradeItem extends IAutoCookingUpgradeItem {
    static readonly TYPE: UpgradeType;
    constructor(autoSmokingUpgradeConfig: AutoCookingUpgradeConfig, upgradeTypeLimitConfig: IUpgradeCountLimitConfig);
    get autoCookingUpgradeConfig(): AutoCookingUpgradeConfig;
    get type(): UpgradeType<AutoSmokingUpgradeWrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
    get upgradeGroup(): UpgradeGroup;
  }


  interface BlastingUpgradeItem extends ICookingUpgradeItem, UpgradeItemBase<BlastingUpgradeWrapper> {}
  class BlastingUpgradeItem extends ICookingUpgradeItem {
    static readonly TYPE: UpgradeType;
    constructor(blastingUpgradeConfig: CookingUpgradeConfig, upgradeTypeLimitConfig: IUpgradeCountLimitConfig);
    get cookingUpgradeConfig(): CookingUpgradeConfig;
    get type(): UpgradeType<BlastingUpgradeWrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
    get upgradeGroup(): UpgradeGroup;
  }


  class CookingLogic<T extends AbstractCookingRecipe = any> {
    static readonly COOK_INPUT_SLOT: number;
    static readonly COOK_OUTPUT_SLOT: number;
    static readonly FUEL_SLOT: number;
    static readonly RECIPES_USED_CODEC: Codec;
    static readonly RECIPES_USED_STREAM_CODEC: StreamCodec;
    constructor(upgrade: ItemStack, saveHandler: Consumer<ItemStack>, cookingUpgradeConfig: CookingUpgradeConfig, recipeType: RecipeType<T>, burnTimeModifier: number);

    constructor(upgrade: ItemStack, saveHandler: Consumer<ItemStack>, isFuel: Predicate<ItemStack>, isInput: Predicate<ItemStack>, cookingUpgradeConfig: CookingUpgradeConfig, recipeType: RecipeType<T>, burnTimeModifier: number);
    awardUsedRecipesAndPopExperience(serverPlayer: ServerPlayer): void;
    drainStoredExperience(xp: number): void;
    get burnTimeFinish(): number;
    get burnTimeTotal(): number;
    get cookInput(): ItemStack;
    get cookOutput(): ItemStack;
    get cookTimeFinish(): number;
    get cookTimeTotal(): number;
    get cookingInventory(): CookingComponentItemHandler;
    get fuel(): ItemStack;
    get storedExperience(): number;
    getRecipesToAwardAndPopExperience(serverLevel: ServerLevel, position: Vec3): RecipeHolder<any>[];
    isBurning(level: Level): boolean;
    isCooking(): boolean;
    pause(): void;
    set cookInput(input: ItemStack);
    set fuel(fuel: ItemStack);
    tick(level: Level): boolean;
  }


  class CookingLogicContainer<T extends AbstractCookingRecipe = any> {
    constructor(player: Player, supplyCoookingLogic: Supplier<CookingLogic<T>>, addSlot: Consumer<Slot>);
    get burnTimeFinish(): number;
    get burnTimeTotal(): number;
    get cookTimeFinish(): number;
    get cookTimeTotal(): number;
    get cookingSlots(): Slot[];
    isBurning(level: Level): boolean;
    isCooking(): boolean;
    mayPlace(stack: ItemStack): boolean;
    onTake(player2: Player, stack: ItemStack): void;
    remove(amount: number): ItemStack;
  }


  interface CookingLogicControl<T extends AbstractCookingRecipe = any> extends CompositeWidgetBase<WidgetBase> {}
  class CookingLogicControl<T extends AbstractCookingRecipe = any> extends CompositeWidgetBase<WidgetBase> {
    constructor(position: Position, cookingLogicContainer: CookingLogicContainer<T>);
    moveSlotsToView(screenGuiLeft: number, screenGuiTop: number): void;
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
  }


  class CookingUpgradeConfig {
    readonly cookingSpeedMultiplier: DoubleValue;
    readonly fuelEfficiencyMultiplier: DoubleValue;
    constructor(builder: Builder, upgradeName: string, path: string);
    static getInstance(builder: Builder, upgradeName: string, path: string): CookingUpgradeConfig;
  }


  interface CookingUpgradeContainer<R extends AbstractCookingRecipe = any, W extends CookingUpgradeWrapper<W, any, R> = any> extends UpgradeContainerBase<W, CookingUpgradeContainer> {}
  class CookingUpgradeContainer<R extends AbstractCookingRecipe = any, W extends CookingUpgradeWrapper<W, any, R> = any> extends UpgradeContainerBase<W, CookingUpgradeContainer> {
    constructor(player: Player, containerId: number, wrapper: W, type: UpgradeContainerType<W, CookingUpgradeContainer<R, W>>);
    get smeltingLogicContainer(): CookingLogicContainer<R>;
    handlePacket(data: CompoundTag): void;
  }


  interface CookingUpgradeRenderData extends IUpgradeRenderData {}
  class CookingUpgradeRenderData extends IUpgradeRenderData {
    static readonly TYPE: UpgradeRenderDataType;
    constructor(burning: boolean);
    static deserializeNBT(nbt: CompoundTag): CookingUpgradeRenderData;
    isBurning(): boolean;
    serializeNBT(): CompoundTag;
  }


  interface CookingUpgradeRenderer extends IUpgradeRenderer<CookingUpgradeRenderData> {}
  class CookingUpgradeRenderer extends IUpgradeRenderer<CookingUpgradeRenderData> {
    render(level: Level, rand: RandomSource, getPositionFromOffset: UnaryOperator<Vector3f>, upgradeRenderData: CookingUpgradeRenderData): void;
  }


  interface CookingUpgradeTab<R extends AbstractCookingRecipe = any, W extends CookingUpgradeWrapper<W, any, R> = any> extends UpgradeSettingsTab<CookingUpgradeContainer> {}
  class CookingUpgradeTab<R extends AbstractCookingRecipe = any, W extends CookingUpgradeWrapper<W, any, R> = any> extends UpgradeSettingsTab<CookingUpgradeContainer> {
  }


  interface CookingUpgradeWrapper<W extends CookingUpgradeWrapper<W, U, R> = any, U extends UpgradeItemBase<W> = any, R extends AbstractCookingRecipe = any> extends ITickableUpgrade, ICookingUpgrade<R>, UpgradeWrapperBase<W, U> {}
  class CookingUpgradeWrapper<W extends CookingUpgradeWrapper<W, U, R> = any, U extends UpgradeItemBase<W> = any, R extends AbstractCookingRecipe = any> extends ITickableUpgrade {
    get cookingLogic(): CookingLogic<R>;
    onBeforeRemoved(): void;
    setEnabled(enabled: boolean): void;
    tick(entity: Entity, level: Level, pos: BlockPos): void;
  }


  class IAutoCookingUpgradeItem {
    get autoCookingUpgradeConfig(): AutoCookingUpgradeConfig;
  }


  class ICookingUpgrade<T extends AbstractCookingRecipe = any> {
    static readonly UPGRADE_GROUP: UpgradeGroup;
    get cookingLogic(): CookingLogic<T>;
  }


  class ICookingUpgradeItem {
    get cookingUpgradeConfig(): CookingUpgradeConfig;
  }


  interface SmeltingUpgradeItem extends ICookingUpgradeItem, UpgradeItemBase<SmeltingUpgradeWrapper> {}
  class SmeltingUpgradeItem extends ICookingUpgradeItem {
    static readonly TYPE: UpgradeType;
    constructor(smeltingUpgradeConfig: CookingUpgradeConfig, upgradeTypeLimitConfig: IUpgradeCountLimitConfig);
    get cookingUpgradeConfig(): CookingUpgradeConfig;
    get type(): UpgradeType<SmeltingUpgradeWrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
    get upgradeGroup(): UpgradeGroup;
  }


  interface SmokingUpgradeItem extends ICookingUpgradeItem, UpgradeItemBase<SmokingUpgradeWrapper> {}
  class SmokingUpgradeItem extends ICookingUpgradeItem {
    static readonly TYPE: UpgradeType;
    constructor(smokingUpgradeConfig: CookingUpgradeConfig, upgradeTypeLimitConfig: IUpgradeCountLimitConfig);
    get cookingUpgradeConfig(): CookingUpgradeConfig;
    get type(): UpgradeType<SmokingUpgradeWrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
    get upgradeGroup(): UpgradeGroup;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.cooking.AutoCookingUpgradeTab' {
  import { AutoCookingUpgradeTab, AutoBlastingUpgradeWrapper, AutoCookingUpgradeContainer, AutoSmokingUpgradeWrapper, AutoSmeltingUpgradeWrapper } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.cooking';
  import { BlastingRecipe, SmokingRecipe, SmeltingRecipe } from 'net.minecraft.world.item.crafting';
  import { AutoBlastingUpgradeWrapper as net_p3pp3rf1y_sophisticatedcore_upgrades_cooking_autocookingupgradewrapper_AutoBlastingUpgradeWrapper, AutoSmokingUpgradeWrapper as net_p3pp3rf1y_sophisticatedcore_upgrades_cooking_autocookingupgradewrapper_AutoSmokingUpgradeWrapper, AutoSmeltingUpgradeWrapper as net_p3pp3rf1y_sophisticatedcore_upgrades_cooking_autocookingupgradewrapper_AutoSmeltingUpgradeWrapper } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.cooking.AutoCookingUpgradeWrapper';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';

  interface AutoBlastingUpgradeTab extends AutoCookingUpgradeTab<BlastingRecipe, AutoBlastingUpgradeWrapper> {}
  class AutoBlastingUpgradeTab extends AutoCookingUpgradeTab<BlastingRecipe, AutoBlastingUpgradeWrapper> {
    constructor(upgradeContainer: AutoCookingUpgradeContainer<BlastingRecipe, net_p3pp3rf1y_sophisticatedcore_upgrades_cooking_autocookingupgradewrapper_AutoBlastingUpgradeWrapper>, position: Position, screen: StorageScreenBase<any>, inputFilterSlotsPerRow: number, fuelFilterSlotsPerRow: number);
  }


  interface AutoSmokingUpgradeTab extends AutoCookingUpgradeTab<SmokingRecipe, AutoSmokingUpgradeWrapper> {}
  class AutoSmokingUpgradeTab extends AutoCookingUpgradeTab<SmokingRecipe, AutoSmokingUpgradeWrapper> {
    constructor(upgradeContainer: AutoCookingUpgradeContainer<SmokingRecipe, net_p3pp3rf1y_sophisticatedcore_upgrades_cooking_autocookingupgradewrapper_AutoSmokingUpgradeWrapper>, position: Position, screen: StorageScreenBase<any>, inputFilterSlotsPerRow: number, fuelFilterSlotsPerRow: number);
  }


  interface AutoSmeltingUpgradeTab extends AutoCookingUpgradeTab<SmeltingRecipe, AutoSmeltingUpgradeWrapper> {}
  class AutoSmeltingUpgradeTab extends AutoCookingUpgradeTab<SmeltingRecipe, AutoSmeltingUpgradeWrapper> {
    constructor(upgradeContainer: AutoCookingUpgradeContainer<SmeltingRecipe, net_p3pp3rf1y_sophisticatedcore_upgrades_cooking_autocookingupgradewrapper_AutoSmeltingUpgradeWrapper>, position: Position, screen: StorageScreenBase<any>, inputFilterSlotsPerRow: number, fuelFilterSlotsPerRow: number);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.cooking.AutoCookingUpgradeWrapper' {
  import { AutoCookingUpgradeWrapper, AutoBlastingUpgradeItem, AutoSmokingUpgradeItem, AutoSmeltingUpgradeItem } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.cooking';
  import { BlastingRecipe, SmokingRecipe, SmeltingRecipe } from 'net.minecraft.world.item.crafting';
  import { IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Consumer } from 'java.util.function';

  interface AutoBlastingUpgradeWrapper extends AutoCookingUpgradeWrapper<AutoBlastingUpgradeWrapper, AutoBlastingUpgradeItem, BlastingRecipe> {}
  class AutoBlastingUpgradeWrapper extends AutoCookingUpgradeWrapper<AutoBlastingUpgradeWrapper, AutoBlastingUpgradeItem, BlastingRecipe> {
    constructor(storageWrapper: IStorageWrapper, upgrade: ItemStack, upgradeSaveHandler: Consumer<ItemStack>);
  }


  interface AutoSmokingUpgradeWrapper extends AutoCookingUpgradeWrapper<AutoSmokingUpgradeWrapper, AutoSmokingUpgradeItem, SmokingRecipe> {}
  class AutoSmokingUpgradeWrapper extends AutoCookingUpgradeWrapper<AutoSmokingUpgradeWrapper, AutoSmokingUpgradeItem, SmokingRecipe> {
    constructor(storageWrapper: IStorageWrapper, upgrade: ItemStack, upgradeSaveHandler: Consumer<ItemStack>);
  }


  interface AutoSmeltingUpgradeWrapper extends AutoCookingUpgradeWrapper<AutoSmeltingUpgradeWrapper, AutoSmeltingUpgradeItem, SmeltingRecipe> {}
  class AutoSmeltingUpgradeWrapper extends AutoCookingUpgradeWrapper<AutoSmeltingUpgradeWrapper, AutoSmeltingUpgradeItem, SmeltingRecipe> {
    constructor(storageWrapper: IStorageWrapper, upgrade: ItemStack, upgradeSaveHandler: Consumer<ItemStack>);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.cooking.CookingLogic' {
  import { ComponentItemHandler } from 'net.neoforged.neoforge.items';
  import { ItemStack } from 'net.minecraft.world.item';

  interface CookingComponentItemHandler extends ComponentItemHandler {}
  class CookingComponentItemHandler extends ComponentItemHandler {
    constructor();
    isItemValid(slot: number, stack: ItemStack): boolean;
    setStackInSlotWithoutValidation(slot: number, stack: ItemStack): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.cooking.CookingUpgradeTab' {
  import { CookingUpgradeTab, BlastingUpgradeWrapper, CookingUpgradeContainer, SmokingUpgradeWrapper, SmeltingUpgradeWrapper } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.cooking';
  import { BlastingRecipe, SmokingRecipe, SmeltingRecipe } from 'net.minecraft.world.item.crafting';
  import { BlastingUpgradeWrapper as net_p3pp3rf1y_sophisticatedcore_upgrades_cooking_cookingupgradewrapper_BlastingUpgradeWrapper, SmokingUpgradeWrapper as net_p3pp3rf1y_sophisticatedcore_upgrades_cooking_cookingupgradewrapper_SmokingUpgradeWrapper, SmeltingUpgradeWrapper as net_p3pp3rf1y_sophisticatedcore_upgrades_cooking_cookingupgradewrapper_SmeltingUpgradeWrapper } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.cooking.CookingUpgradeWrapper';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';

  interface BlastingUpgradeTab extends CookingUpgradeTab<BlastingRecipe, BlastingUpgradeWrapper> {}
  class BlastingUpgradeTab extends CookingUpgradeTab<BlastingRecipe, BlastingUpgradeWrapper> {
    constructor(upgradeContainer: CookingUpgradeContainer<BlastingRecipe, net_p3pp3rf1y_sophisticatedcore_upgrades_cooking_cookingupgradewrapper_BlastingUpgradeWrapper>, position: Position, screen: StorageScreenBase<any>);
  }


  interface SmokingUpgradeTab extends CookingUpgradeTab<SmokingRecipe, SmokingUpgradeWrapper> {}
  class SmokingUpgradeTab extends CookingUpgradeTab<SmokingRecipe, SmokingUpgradeWrapper> {
    constructor(upgradeContainer: CookingUpgradeContainer<SmokingRecipe, net_p3pp3rf1y_sophisticatedcore_upgrades_cooking_cookingupgradewrapper_SmokingUpgradeWrapper>, position: Position, screen: StorageScreenBase<any>);
  }


  interface SmeltingUpgradeTab extends CookingUpgradeTab<SmeltingRecipe, SmeltingUpgradeWrapper> {}
  class SmeltingUpgradeTab extends CookingUpgradeTab<SmeltingRecipe, SmeltingUpgradeWrapper> {
    constructor(upgradeContainer: CookingUpgradeContainer<SmeltingRecipe, net_p3pp3rf1y_sophisticatedcore_upgrades_cooking_cookingupgradewrapper_SmeltingUpgradeWrapper>, position: Position, screen: StorageScreenBase<any>);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.cooking.CookingUpgradeWrapper' {
  import { CookingUpgradeWrapper, BlastingUpgradeItem, SmokingUpgradeItem, SmeltingUpgradeItem } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.cooking';
  import { BlastingRecipe, SmokingRecipe, SmeltingRecipe } from 'net.minecraft.world.item.crafting';
  import { IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Consumer } from 'java.util.function';

  interface BlastingUpgradeWrapper extends CookingUpgradeWrapper<BlastingUpgradeWrapper, BlastingUpgradeItem, BlastingRecipe> {}
  class BlastingUpgradeWrapper extends CookingUpgradeWrapper<BlastingUpgradeWrapper, BlastingUpgradeItem, BlastingRecipe> {
    constructor(storageWrapper: IStorageWrapper, upgrade: ItemStack, upgradeSaveHandler: Consumer<ItemStack>);
  }


  interface SmokingUpgradeWrapper extends CookingUpgradeWrapper<SmokingUpgradeWrapper, SmokingUpgradeItem, SmokingRecipe> {}
  class SmokingUpgradeWrapper extends CookingUpgradeWrapper<SmokingUpgradeWrapper, SmokingUpgradeItem, SmokingRecipe> {
    constructor(storageWrapper: IStorageWrapper, upgrade: ItemStack, upgradeSaveHandler: Consumer<ItemStack>);
  }


  interface SmeltingUpgradeWrapper extends CookingUpgradeWrapper<SmeltingUpgradeWrapper, SmeltingUpgradeItem, SmeltingRecipe> {}
  class SmeltingUpgradeWrapper extends CookingUpgradeWrapper<SmeltingUpgradeWrapper, SmeltingUpgradeItem, SmeltingRecipe> {
    constructor(storageWrapper: IStorageWrapper, upgrade: ItemStack, upgradeSaveHandler: Consumer<ItemStack>);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.crafting' {
  import { TransientCraftingContainer, Slot } from 'net.minecraft.world.inventory';
  import { Supplier, Consumer } from 'java.util.function';
  import { IItemHandlerModifiable } from 'net.neoforged.neoforge.items';
  import { Container } from 'net.minecraft.world';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player, StackedContents } from 'net.minecraft.world.entity.player';
  import { List } from 'java.util';
  import { UpgradeContainerBase, ICraftingContainer, UpgradeContainerType } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RecipeType } from 'net.minecraft.world.item.crafting';
  import { UpgradeItemBase, IUpgradeCountLimitConfig, UpgradeType, UpgradeWrapperBase } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { UpgradeConflictDefinition } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.IUpgradeItem';
  import { UpgradeSettingsTab, StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { Toggle } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls.ButtonDefinition';
  import { Boolean } from 'java.lang';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { StatefulComponentItemHandler } from 'net.p3pp3rf1y.sophisticatedcore.inventory';

  interface CraftingItemHandler extends TransientCraftingContainer {}
  class CraftingItemHandler extends TransientCraftingContainer {
    constructor(supplyInventory: Supplier<IItemHandlerModifiable>, onCraftingMatrixChanged: Consumer<Container>);
    fillStackedContents(helper: StackedContents): void;
    get containerSize(): number;
    get items(): ItemStack[];
    getItem(index: number): ItemStack;
    isEmpty(): boolean;
    quickMoveStack(player: Player, index: number): ItemStack;
    removeItem(index: number, count: number): ItemStack;
    removeItemNoUpdate(index: number): ItemStack;
    setChanged(): void;
    setItem(index: number, stack: ItemStack): void;
    stillValid(playerIn: Player): boolean;
  }


  interface CraftingUpgradeContainer extends ICraftingContainer, UpgradeContainerBase<CraftingUpgradeWrapper, CraftingUpgradeContainer> {}
  class CraftingUpgradeContainer extends ICraftingContainer {
    constructor(player: Player, upgradeContainerId: number, upgradeWrapper: CraftingUpgradeWrapper, type: UpgradeContainerType<CraftingUpgradeWrapper, CraftingUpgradeContainer>);
    allowsPickupAll(slot: Slot): boolean;
    get craftMatrix(): Container;
    get matchedCraftingResults(): ItemStack[];
    get recipeSlots(): Slot[];
    get recipeType(): RecipeType<any>;
    getSlotStackToTransfer(slot: Slot): ItemStack;
    handlePacket(data: CompoundTag): void;
    mayPickup(player2: Player): boolean;
    mergeIntoStorageFirst(slot: Slot): boolean;
    onInit(): void;
    onTake(thePlayer: Player, stack: ItemStack): void;
    selectCraftingResult(resultIndex: number): void;
    selectNextCraftingResult(): void;
    selectPreviousCraftingResult(): void;
    setChanged(): void;
    setChanged(): void;
    setRecipeUsed(recipeId: ResourceLocation): void;
    setRefillCraftingGrid(replenish: boolean): void;
    setShiftClickIntoStorage(shiftClickIntoStorage: boolean): void;
    shouldRefillCraftingGrid(): boolean;
    shouldShiftClickIntoStorage(): boolean;
  }


  interface CraftingUpgradeItem extends UpgradeItemBase<CraftingUpgradeWrapper> {}
  class CraftingUpgradeItem extends UpgradeItemBase<CraftingUpgradeWrapper> {
    constructor(upgradeTypeLimitConfig: IUpgradeCountLimitConfig);
    get type(): UpgradeType<CraftingUpgradeWrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
  }


  interface CraftingUpgradeTab extends UpgradeSettingsTab<CraftingUpgradeContainer> {}
  class CraftingUpgradeTab extends UpgradeSettingsTab<CraftingUpgradeContainer> {
    static readonly RESULT_SELECTION_BORDER_WIDTH: number;
    constructor(upgradeContainer: CraftingUpgradeContainer, position: Position, screen: StorageScreenBase<any>, shiftClickTargetButton: Toggle<boolean>, refillCraftingGridButton: Toggle<boolean>);
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    renderTooltip(screen: Screen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    renderTooltip(screen: Screen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    slotIsNotCoveredAt(slot: Slot, mouseX: number, mouseY: number): boolean;
  }


  interface CraftingUpgradeWrapper extends UpgradeWrapperBase<CraftingUpgradeWrapper, CraftingUpgradeItem> {}
  class CraftingUpgradeWrapper extends UpgradeWrapperBase<CraftingUpgradeWrapper, CraftingUpgradeItem> {
    constructor(storageWrapper: IStorageWrapper, upgrade: ItemStack, upgradeSaveHandler: Consumer<ItemStack>);
    canBeDisabled(): boolean;
    extractFromStorageOrPlayer(player: Player, stack: ItemStack): boolean;
    get inventory(): StatefulComponentItemHandler;
    insertIntoStorageOrPlayer(player: Player, stack: ItemStack): boolean;
    isItemValid(slot: number, stack: ItemStack): boolean;
    setRefillCraftingGridNBT(replenish: boolean): void;
    setShiftClickIntoStorage(shiftClickIntoStorage: boolean): void;
    shouldRefillCraftingGridNBT(): boolean;
    shouldShiftClickIntoStorage(): boolean;
  }


  class ICraftingUIPart {
    static readonly NOOP: ICraftingUIPart;
    get width(): number;
    onCraftingSlotsDisplayed(var1: Slot[]): void;
    onCraftingSlotsHidden(): void;
    setStorageScreen(var1: StorageScreenBase<any>): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.feeding' {
  import { UpgradeContainerBase, UpgradeContainerType } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { FilterLogicContainer, FilterLogic, UpgradeItemBase, UpgradeType, IUpgradeCountLimitConfig, UpgradeWrapperBase, ITickableUpgrade, IFilteredUpgrade } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { IntSupplier, Consumer } from 'java.util.function';
  import { List } from 'java.util';
  import { UpgradeConflictDefinition } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.IUpgradeItem';
  import { UpgradeSettingsTab } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { Toggle } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls.ButtonDefinition';
  import { IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Entity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { Enum } from 'java.lang';

  interface FeedingUpgradeContainer extends UpgradeContainerBase<FeedingUpgradeWrapper, FeedingUpgradeContainer> {}
  class FeedingUpgradeContainer extends UpgradeContainerBase<FeedingUpgradeWrapper, FeedingUpgradeContainer> {
    constructor(player: Player, containerId: number, wrapper: FeedingUpgradeWrapper, type: UpgradeContainerType<FeedingUpgradeWrapper, FeedingUpgradeContainer>);
    get feedAtHungerLevel(): HungerLevel;
    get filterLogicContainer(): FilterLogicContainer<FilterLogic>;
    handlePacket(data: CompoundTag): void;
    set feedAtHungerLevel(hungerLevel: HungerLevel);
    setFeedImmediatelyWhenHurt(feedImmediatelyWhenHurt: boolean): void;
    shouldFeedImmediatelyWhenHurt(): boolean;
  }


  interface FeedingUpgradeItem extends UpgradeItemBase<FeedingUpgradeWrapper> {}
  class FeedingUpgradeItem extends UpgradeItemBase<FeedingUpgradeWrapper> {
    static readonly TYPE: UpgradeType;
    constructor(filterSlotCount: IntSupplier, upgradeTypeLimitConfig: IUpgradeCountLimitConfig);
    get filterSlotCount(): number;
    get type(): UpgradeType<FeedingUpgradeWrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
  }


  interface FeedingUpgradeTab extends UpgradeSettingsTab<FeedingUpgradeContainer> {}
  class FeedingUpgradeTab extends UpgradeSettingsTab<FeedingUpgradeContainer> {
    static readonly HUNGER_LEVEL: Toggle;
    static readonly FEED_IMMEDIATELY_WHEN_HURT: Toggle;
  }


  interface FeedingUpgradeWrapper extends ITickableUpgrade, IFilteredUpgrade, UpgradeWrapperBase<FeedingUpgradeWrapper, FeedingUpgradeItem> {}
  class FeedingUpgradeWrapper extends ITickableUpgrade {
    constructor(storageWrapper: IStorageWrapper, upgrade: ItemStack, upgradeSaveHandler: Consumer<ItemStack>);
    get feedAtHungerLevel(): HungerLevel;
    get filterLogic(): FilterLogic;
    set feedAtHungerLevel(hungerLevel: HungerLevel);
    setFeedImmediatelyWhenHurt(feedImmediatelyWhenHurt: boolean): void;
    shouldFeedImmediatelyWhenHurt(): boolean;
    tick(entity: Entity, level: Level, pos: BlockPos): void;
  }


  interface HungerLevel extends Enum<HungerLevel> {}
  class HungerLevel extends Enum<HungerLevel> {
    static readonly ANY: HungerLevel;
    static readonly HALF: HungerLevel;
    static readonly FULL: HungerLevel;
    static fromName(name: string): HungerLevel;
    get serializedName(): string;
    next(): HungerLevel;
    static valueOf(name: string): HungerLevel;
    static values(): HungerLevel[];
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.feeding.FeedingUpgradeTab' {
  import { FeedingUpgradeTab, FeedingUpgradeContainer } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.feeding';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';

  interface Advanced extends FeedingUpgradeTab {}
  class Advanced extends FeedingUpgradeTab {
    constructor(upgradeContainer: FeedingUpgradeContainer, position: Position, screen: StorageScreenBase<any>, slotsPerRow: number);
  }


  interface Basic extends FeedingUpgradeTab {}
  class Basic extends FeedingUpgradeTab {
    constructor(upgradeContainer: FeedingUpgradeContainer, position: Position, screen: StorageScreenBase<any>, slotsPerRow: number);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.filter' {
  import { Enum } from 'java.lang';
  import { List, Optional } from 'java.util';
  import { UpgradeContainerBase, UpgradeContainerType } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { ContentsFilterLogicContainer, UpgradeItemBase, UpgradeType, IUpgradeCountLimitConfig, UpgradeWrapperBase, IContentsFilteredUpgrade, ContentsFilterLogic, FilterLogic } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { IntSupplier, Consumer } from 'java.util.function';
  import { UpgradeConflictDefinition } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.IUpgradeItem';
  import { UpgradeSettingsTab } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { IIOFilterUpgrade, IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { ItemStack } from 'net.minecraft.world.item';

  interface Direction extends Enum<Direction> {}
  class Direction extends Enum<Direction> {
    static readonly BOTH: Direction;
    static readonly INPUT: Direction;
    static readonly OUTPUT: Direction;
    static fromName(name: string): Direction;
    get serializedName(): string;
    next(): Direction;
    static valueOf(name: string): Direction;
    static values(): Direction[];
  }


  interface FilterUpgradeContainer extends UpgradeContainerBase<FilterUpgradeWrapper, FilterUpgradeContainer> {}
  class FilterUpgradeContainer extends UpgradeContainerBase<FilterUpgradeWrapper, FilterUpgradeContainer> {
    static readonly BASIC_TYPE: UpgradeContainerType;
    static readonly ADVANCED_TYPE: UpgradeContainerType;
    get direction(): Direction;
    get filterLogicContainer(): ContentsFilterLogicContainer;
    handlePacket(data: CompoundTag): void;
    set direction(direction: Direction);
  }


  interface FilterUpgradeItem extends UpgradeItemBase<FilterUpgradeWrapper> {}
  class FilterUpgradeItem extends UpgradeItemBase<FilterUpgradeWrapper> {
    static readonly TYPE: UpgradeType;
    constructor(filterSlotCount: IntSupplier, upgradeTypeLimitConfig: IUpgradeCountLimitConfig);
    get filterSlotCount(): number;
    get type(): UpgradeType<FilterUpgradeWrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
  }


  interface FilterUpgradeTab extends UpgradeSettingsTab<FilterUpgradeContainer> {}
  class FilterUpgradeTab extends UpgradeSettingsTab<FilterUpgradeContainer> {
  }


  interface FilterUpgradeWrapper extends IContentsFilteredUpgrade, IIOFilterUpgrade, UpgradeWrapperBase<FilterUpgradeWrapper, FilterUpgradeItem> {}
  class FilterUpgradeWrapper extends IContentsFilteredUpgrade {
    constructor(storageWrapper: IStorageWrapper, upgrade: ItemStack, upgradeSaveHandler: Consumer<ItemStack>);
    get direction(): Direction;
    get filterLogic(): ContentsFilterLogic;
    get inputFilter(): Optional<FilterLogic>;
    get outputFilter(): Optional<FilterLogic>;
    set direction(direction: Direction);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.filter.FilterUpgradeTab' {
  import { FilterUpgradeTab, FilterUpgradeContainer } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.filter';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { Toggle } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls.ButtonDefinition';
  import { ContentsFilterType } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';

  interface Advanced extends FilterUpgradeTab {}
  class Advanced extends FilterUpgradeTab {
    constructor(upgradeContainer: FilterUpgradeContainer, position: Position, screen: StorageScreenBase<any>, slotsPerRow: number, contentsFilterButton: Toggle<ContentsFilterType>);
  }


  interface Basic extends FilterUpgradeTab {}
  class Basic extends FilterUpgradeTab {
    constructor(upgradeContainer: FilterUpgradeContainer, position: Position, screen: StorageScreenBase<any>, slotsPerRow: number, contentsFilterButton: Toggle<ContentsFilterType>);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.FilterLogic' {
  import { FilterItemStackHandler } from 'net.p3pp3rf1y.sophisticatedcore.util';
  import { IntConsumer } from 'java.util.function';
  import { ItemStack } from 'net.minecraft.world.item';
  import { List } from 'java.util';

  interface ObservableFilterItemStackHandler extends FilterItemStackHandler {}
  class ObservableFilterItemStackHandler extends FilterItemStackHandler {
    constructor(filterSlotCount: number);
    initFilters(filterItems: ItemStack[]): void;
    isItemValid(slot: number, stack: ItemStack): boolean;
    setOnSlotChange(onSlotChange: IntConsumer): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.FilterLogicContainer' {
  import { FilterSlotItemHandler } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { Supplier } from 'java.util.function';
  import { IItemHandler } from 'net.neoforged.neoforge.items';
  import { Integer } from 'java.lang';

  interface FilterLogicSlot extends FilterSlotItemHandler {}
  class FilterLogicSlot extends FilterSlotItemHandler {
    constructor(filterHandler: Supplier<IItemHandler>, slot: number);
    isActive(): boolean;
    setEnabled(enabled: boolean): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.FilterLogicContainerBase' {
  import { Slot } from 'net.minecraft.world.inventory';
  import { IFilterSlot } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { Runnable } from 'java.lang';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';

  interface TagSelectionSlot extends IFilterSlot, Slot {}
  class TagSelectionSlot extends IFilterSlot {
    constructor();
    get item(): ItemStack;
    get maxStackSize(): number;
    isSameInventory(other: Slot): boolean;
    mayPickup(player: Player): boolean;
    mayPlace(stack: ItemStack): boolean;
    remove(amount: number): ItemStack;
    set(stack: ItemStack): void;
    setChanged(): void;
    setOnUpdate(onUpdate: Runnable): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.FilterLogicControl' {
  import { FilterLogicControl, FilterLogic, FilterLogicContainer } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';

  interface Advanced extends FilterLogicControl<FilterLogic, FilterLogicContainer> {}
  class Advanced extends FilterLogicControl<FilterLogic, FilterLogicContainer> {
    constructor(screen: StorageScreenBase<any>, position: Position, filterLogicContainer: FilterLogicContainer<FilterLogic>, slotsPerRow: number);
  }


  interface Basic extends FilterLogicControl<FilterLogic, FilterLogicContainer> {}
  class Basic extends FilterLogicControl<FilterLogic, FilterLogicContainer> {
    constructor(screen: StorageScreenBase<any>, position: Position, filterLogicContainer: FilterLogicContainer<FilterLogic>, slotsPerRow: number);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.FilterLogicControlBase' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface MatchButton extends Enum<MatchButton> {}
  class MatchButton extends Enum<MatchButton> {
    static readonly ALLOW_LIST: MatchButton;
    static readonly PRIMARY_MATCH: MatchButton;
    static readonly DURABILITY: MatchButton;
    static readonly NBT: MatchButton;
    static valueOf(name: string): MatchButton;
    static values(): MatchButton[];
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.infinity' {
  import { IInventoryPartHandler, InventoryHandler } from 'net.p3pp3rf1y.sophisticatedcore.inventory';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BiPredicate, BiConsumer, IntFunction } from 'java.util.function';
  import { Integer, Boolean } from 'java.lang';
  import { TriFunction } from 'org.apache.commons.lang3.function';
  import { UpgradeItemBase, UpgradeType, IUpgradeCountLimitConfig } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { Wrapper } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.infinity.InfinityUpgradeItem';
  import { List } from 'java.util';
  import { UpgradeConflictDefinition } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.IUpgradeItem';
  import { UpgradeSlotChangeResult } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { SlotRange } from 'net.p3pp3rf1y.sophisticatedcore.util';

  interface InfinityInventoryPart extends IInventoryPartHandler {}
  class InfinityInventoryPart extends IInventoryPartHandler {
    extractItem(slot: number, amount: number, simulate: boolean): ItemStack;
    get slots(): number;
    getSlotLimit(slot: number): number;
    getStackInSlot(slot: number, getStackInSlotSuper: IntFunction<ItemStack>): ItemStack;
    getStackLimit(slot: number, stack: ItemStack): number;
    insertItem(slot: number, stack: ItemStack, simulate: boolean, insertSuper: TriFunction<number, ItemStack, boolean, ItemStack>): ItemStack;
    isInfinite(slot: number): boolean;
    isItemValid(slot: number, stack: ItemStack, player: Player, isItemValidSuper: BiPredicate<number, ItemStack>): boolean;
    isSlotAccessible(slot: number): boolean;
    setStackInSlot(slot: number, stack: ItemStack, setStackInSlotSuper: BiConsumer<number, ItemStack>): void;
  }


  interface InfinityUpgradeItem extends UpgradeItemBase<Wrapper> {}
  class InfinityUpgradeItem extends UpgradeItemBase<Wrapper> {
    static readonly UPGRADE_CONFLICT_DEFINITIONS: List;
    static readonly TYPE: UpgradeType;
    constructor(upgradeTypeLimitConfig: IUpgradeCountLimitConfig, admin: boolean);
    canRemoveUpgradeFrom(storageWrapper: IStorageWrapper, isClientSide: boolean, player: Player): UpgradeSlotChangeResult;
    canRemoveUpgradeFrom(storageWrapper: IStorageWrapper, isClientSide: boolean): UpgradeSlotChangeResult;
    createInventoryPartHandler(parent: InventoryHandler, slotRange: SlotRange): IInventoryPartHandler;
    get permissionLevel(): number;
    get type(): UpgradeType<Wrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.infinity.InfinityInventoryPart' {
  import { InfinityInventoryPart } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.infinity';

  interface Survival extends InfinityInventoryPart {}
  class Survival extends InfinityInventoryPart {
    static readonly NAME: string;
    get name(): string;
  }


  interface Admin extends InfinityInventoryPart {}
  class Admin extends InfinityInventoryPart {
    static readonly NAME: string;
    get name(): string;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.infinity.InfinityUpgradeItem' {
  import { UpgradeWrapperBase } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { InfinityUpgradeItem } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.infinity';

  interface Wrapper extends UpgradeWrapperBase<Wrapper, InfinityUpgradeItem> {}
  class Wrapper extends UpgradeWrapperBase<Wrapper, InfinityUpgradeItem> {
    canBeDisabled(): boolean;
    get permissionLevel(): number;
    onAdded(): void;
    onBeforeRemoved(): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.IRenderedBatteryUpgrade' {
  import { CompoundTag } from 'net.minecraft.nbt';

  class BatteryRenderInfo {
    constructor(chargeRatio: number);
    static deserialize(tag: CompoundTag): BatteryRenderInfo;
    get chargeRatio(): number;
    serialize(): CompoundTag;
    set chargeRatio(chargeRatio: number);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.IRenderedTankUpgrade' {
  import { FluidStack } from 'net.neoforged.neoforge.fluids';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Optional } from 'java.util';

  class TankRenderInfo {
    constructor();

    constructor(fluidStack: FluidStack, fillRatio: number);
    static deserialize(tag: CompoundTag): TankRenderInfo;
    get fillRatio(): number;
    get fluid(): Optional<FluidStack>;
    serialize(): CompoundTag;
    set fillRatio(fillRatio: number);
    set fluid(fluidStack: FluidStack);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.jukebox' {
  import { List, Optional, UUID } from 'java.util';
  import { IDiscHandler, IUpgradeRenderer } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { ItemStack, JukeboxSong } from 'net.minecraft.world.item';
  import { Integer, Enum, Runnable } from 'java.lang';
  import { Level } from 'net.minecraft.world.level';
  import { RandomSource } from 'net.minecraft.util';
  import { IntValue, Builder } from 'ModConfigSpec';
  import { UpgradeContainerBase, UpgradeContainerType } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Slot } from 'net.minecraft.world.inventory';
  import { UpgradeItemBase, UpgradeGroup, UpgradeType, IUpgradeCountLimitConfig, UpgradeWrapperBase, ITickableUpgrade } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { IntSupplier, UnaryOperator, Supplier } from 'java.util.function';
  import { UpgradeConflictDefinition } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.IUpgradeItem';
  import { TextureSheetParticle, ParticleRenderType } from 'net.minecraft.client.particle';
  import { ParticleType, ParticleOptions } from 'net.minecraft.core.particles';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { IUpgradeRenderData, UpgradeRenderDataType } from 'net.p3pp3rf1y.sophisticatedcore.renderdata';
  import { Vector3f } from 'org.joml';
  import { UpgradeSettingsTab, StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { Component } from 'net.minecraft.network.chat';
  import { BlockPos, Holder } from 'net.minecraft.core';
  import { Entity, LivingEntity } from 'net.minecraft.world.entity';
  import { IItemHandler } from 'net.neoforged.neoforge.items';
  import { Post } from 'LevelTickEvent';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { Unload } from 'LevelEvent';
  import { SoundInstance } from 'net.minecraft.client.resources.sounds';
  import { SoundEvent } from 'net.minecraft.sounds';

  class DiscHandlerRegistry {
    static findHandler(itemStack: ItemStack): Optional<IDiscHandler<any>>;
    static get handlers(): IDiscHandler<any>[];
    static getMusicLengthInTicks(itemStack: ItemStack, level: Level): Optional<number>;
    static getRandomDisc(rnd: RandomSource): Optional<ItemStack>;
    static isSupported(itemStack: ItemStack): boolean;
    static registerHandler(handler: IDiscHandler<any>): void;
  }


  class JukeboxUpgradeConfig {
    readonly numberOfSlots: IntValue;
    readonly slotsInRow: IntValue;
    constructor(builder: Builder, upgradeName: string, path: string, defaultNumberOfSlots: number);
  }


  interface JukeboxUpgradeContainer extends UpgradeContainerBase<JukeboxUpgradeWrapper, JukeboxUpgradeContainer> {}
  class JukeboxUpgradeContainer extends UpgradeContainerBase<JukeboxUpgradeWrapper, JukeboxUpgradeContainer> {
    constructor(player: Player, upgradeContainerId: number, upgradeWrapper: JukeboxUpgradeWrapper, type: UpgradeContainerType<JukeboxUpgradeWrapper, JukeboxUpgradeContainer>);
    get discFinishTime(): number;
    get discSlotActive(): Optional<Slot>;
    get repeatMode(): RepeatMode;
    handlePacket(data: CompoundTag): void;
    isShuffleEnabled(): boolean;
    next(): void;
    play(): void;
    previous(): void;
    setChanged(): void;
    stop(): void;
    toggleRepeat(): void;
    toggleShuffle(): void;
  }


  interface JukeboxUpgradeItem extends UpgradeItemBase<JukeboxUpgradeWrapper> {}
  class JukeboxUpgradeItem extends UpgradeItemBase<JukeboxUpgradeWrapper> {
    static readonly UPGRADE_GROUP: UpgradeGroup;
    static readonly TYPE: UpgradeType;
    constructor(upgradeTypeLimitConfig: IUpgradeCountLimitConfig, numberOfSlots: IntSupplier, slotsInRow: IntSupplier);
    get numberOfSlots(): number;
    get slotsInRow(): number;
    get type(): UpgradeType<JukeboxUpgradeWrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
    get upgradeGroup(): UpgradeGroup;
  }


  interface JukeboxUpgradeNoteParticle extends TextureSheetParticle {}
  class JukeboxUpgradeNoteParticle extends TextureSheetParticle {
    get renderType(): ParticleRenderType;
    getQuadSize(scaleFactor: number): number;
    tick(): void;
  }


  interface JukeboxUpgradeNoteParticleData extends ParticleOptions, ParticleType<JukeboxUpgradeNoteParticleData> {}
  class JukeboxUpgradeNoteParticleData extends ParticleOptions {
    constructor();
    codec(): MapCodec<JukeboxUpgradeNoteParticleData>;
    get type(): JukeboxUpgradeNoteParticleData;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, JukeboxUpgradeNoteParticleData>;
  }


  interface JukeboxUpgradeRenderData extends IUpgradeRenderData {}
  class JukeboxUpgradeRenderData extends IUpgradeRenderData {
    static readonly TYPE: UpgradeRenderDataType;
    constructor(playing: boolean);
    static deserializeNBT(nbt: CompoundTag): JukeboxUpgradeRenderData;
    isPlaying(): boolean;
    serializeNBT(): CompoundTag;
  }


  interface JukeboxUpgradeRenderer extends IUpgradeRenderer<JukeboxUpgradeRenderData> {}
  class JukeboxUpgradeRenderer extends IUpgradeRenderer<JukeboxUpgradeRenderData> {
    render(level: Level, rand: RandomSource, getPositionFromOffset: UnaryOperator<Vector3f>, upgradeRenderData: JukeboxUpgradeRenderData): void;
  }


  interface JukeboxUpgradeTab extends UpgradeSettingsTab<JukeboxUpgradeContainer> {}
  class JukeboxUpgradeTab extends UpgradeSettingsTab<JukeboxUpgradeContainer> {
    static readonly TOP_Y: number;
    constructor(upgradeContainer: JukeboxUpgradeContainer, position: Position, screen: StorageScreenBase<any>, slotsInRow: number, tabLabel: Component, closedTooltip: Component);
  }


  interface JukeboxUpgradeWrapper extends ITickableUpgrade, UpgradeWrapperBase<JukeboxUpgradeWrapper, JukeboxUpgradeItem> {}
  class JukeboxUpgradeWrapper extends ITickableUpgrade {
    get disc(): ItemStack;
    get discFinishTime(): number;
    get discInventory(): IItemHandler;
    get discSlotActive(): number;
    get repeatMode(): RepeatMode;
    isItemValid(slot: number, stack: ItemStack): boolean;
    isPlaying(): boolean;
    isShuffleEnabled(): boolean;
    next(): void;
    onBeforeRemoved(): void;
    play(level: Level, pos: BlockPos): void;
    play(entity: Entity): void;
    playNext(): void;
    playNext(startOverIfAtTheEnd: boolean): void;
    playPrevious(): void;
    previous(): void;
    set repeatMode(repeatMode: RepeatMode);
    setShuffleEnabled(shuffleEnabled: boolean): void;
    stop(entity: LivingEntity): void;
    tick(entity: Entity, level: Level, pos: BlockPos): void;
  }


  interface RepeatMode extends Enum<RepeatMode> {}
  class RepeatMode extends Enum<RepeatMode> {
    static readonly ALL: RepeatMode;
    static readonly ONE: RepeatMode;
    static readonly NO: RepeatMode;
    static fromName(name: string): RepeatMode;
    get serializedName(): string;
    next(): RepeatMode;
    static valueOf(name: string): RepeatMode;
    static values(): RepeatMode[];
  }


  class ServerStorageSoundHandler {
    static onWorldUnload(evt: Unload): void;
    static putSoundInfo(serverLevel: ServerLevel, storageUuid: UUID, onFinishedHandler: Runnable, pos: Vec3, finishTime: number): void;
    static startPlayingDisc(serverLevel: ServerLevel, position: BlockPos, storageUuid: UUID, song: Holder<JukeboxSong>, onFinishedHandler: Runnable): void;
    static startPlayingDisc(serverLevel: ServerLevel, position: Vec3, storageUuid: UUID, entityId: number, song: Holder<JukeboxSong>, onStopHandler: Runnable): void;
    static stopPlayingDisc(level: Level, position: Vec3, storageUuid: UUID): void;
    static tick(event: Post): void;
    static updateKeepAlive(storageUuid: UUID, level: Level, position: Vec3, onNoLongerRunning: Runnable): void;
  }


  class StorageSoundHandler {
    static onWorldUnload(evt: Unload): void;
    static playStorageSound(storageUuid: UUID, sound: SoundInstance): void;
    static playStorageSound(soundEvent: SoundEvent, storageUuid: UUID, pos: BlockPos): void;
    static playStorageSound(soundEvent: SoundEvent, storageUuid: UUID, entityId: number): void;
    static stopStorageSound(storageUuid: UUID): void;
    static tick(event: Post): void;
    tick(): void;
  }


  interface VanillaDiscHandler extends IDiscHandler<Holder> {}
  class VanillaDiscHandler extends IDiscHandler<Holder> {
    get musicDiscSize(): number;
    getMusicLengthInTicks(itemStack: ItemStack, level: Level): Optional<number>;
    getRandomDisc(randomSource: RandomSource): Optional<ItemStack>;
    getSongInfo(itemStack: ItemStack, level: Level): Optional<Holder<JukeboxSong>>;
    playDisc(serverLevel: ServerLevel, position: BlockPos, storageUuid: UUID, discItemStack: ItemStack, onFinished: Runnable): void;
    playDisc(serverLevel: ServerLevel, position: Vec3, storageUuid: UUID, discItemStack: ItemStack, entityId: number, onFinished: Runnable): void;
    static setDiscBlockListGetter(getter: Supplier<string[]>): void;
    supports(itemStack: ItemStack): boolean;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.jukebox.JukeboxUpgradeNoteParticle' {
  import { ParticleProvider, SpriteSet, Particle } from 'net.minecraft.client.particle';
  import { JukeboxUpgradeNoteParticleData } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.jukebox';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';

  interface Factory extends ParticleProvider<JukeboxUpgradeNoteParticleData> {}
  class Factory extends ParticleProvider<JukeboxUpgradeNoteParticleData> {
    constructor(spriteSet: SpriteSet);
    createParticle(type: JukeboxUpgradeNoteParticleData, level: ClientLevel, x: number, y: number, z: number, xSpeed: number, ySpeed: number, zSpeed: number): Particle;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.jukebox.JukeboxUpgradeTab' {
  import { JukeboxUpgradeTab, JukeboxUpgradeContainer } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.jukebox';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';

  interface Advanced extends JukeboxUpgradeTab {}
  class Advanced extends JukeboxUpgradeTab {
    constructor(upgradeContainer: JukeboxUpgradeContainer, position: Position, screen: StorageScreenBase<any>, slotsInRow: number);
  }


  interface Basic extends JukeboxUpgradeTab {}
  class Basic extends JukeboxUpgradeTab {
    constructor(upgradeContainer: JukeboxUpgradeContainer, position: Position, screen: StorageScreenBase<any>);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.magnet' {
  import { Entity } from 'net.minecraft.world.entity';
  import { FilteredUpgradeConfigBase, ContentsFilterLogicContainer, UpgradeItemBase, UpgradeType, IUpgradeCountLimitConfig, UpgradeWrapperBase, IContentsFilteredUpgrade, ITickableUpgrade, IPickupResponseUpgrade, ContentsFilterLogic } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { IntValue, Builder } from 'ModConfigSpec';
  import { UpgradeContainerBase, UpgradeContainerType } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { IntSupplier, Consumer } from 'java.util.function';
  import { List } from 'java.util';
  import { UpgradeConflictDefinition } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.IUpgradeItem';
  import { UpgradeSettingsTab } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Pre } from 'LevelTickEvent';
  import { Unload } from 'LevelEvent';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';

  class IMagnetPreventionChecker {
    isBlocked(var1: Entity): boolean;
  }


  interface MagnetUpgradeConfig extends FilteredUpgradeConfigBase {}
  class MagnetUpgradeConfig extends FilteredUpgradeConfigBase {
    readonly magnetRange: IntValue;
    constructor(builder: Builder, name: string, path: string, defaultFilterSlots: number, defaultSlotsInRow: number, defaultMagnetRange: number);
  }


  interface MagnetUpgradeContainer extends UpgradeContainerBase<MagnetUpgradeWrapper, MagnetUpgradeContainer> {}
  class MagnetUpgradeContainer extends UpgradeContainerBase<MagnetUpgradeWrapper, MagnetUpgradeContainer> {
    constructor(player: Player, containerId: number, wrapper: MagnetUpgradeWrapper, type: UpgradeContainerType<MagnetUpgradeWrapper, MagnetUpgradeContainer>);
    get filterLogicContainer(): ContentsFilterLogicContainer;
    handlePacket(data: CompoundTag): void;
    setPickupItems(pickupItems: boolean): void;
    setPickupXp(pickupXp: boolean): void;
    shouldPickupItems(): boolean;
    shouldPickupXp(): boolean;
  }


  interface MagnetUpgradeItem extends UpgradeItemBase<MagnetUpgradeWrapper> {}
  class MagnetUpgradeItem extends UpgradeItemBase<MagnetUpgradeWrapper> {
    static readonly TYPE: UpgradeType;
    constructor(radius: IntSupplier, filterSlotCount: IntSupplier, upgradeTypeLimitConfig: IUpgradeCountLimitConfig);
    get filterSlotCount(): number;
    get radius(): number;
    get type(): UpgradeType<MagnetUpgradeWrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
  }


  interface MagnetUpgradeTab extends UpgradeSettingsTab<MagnetUpgradeContainer> {}
  class MagnetUpgradeTab extends UpgradeSettingsTab<MagnetUpgradeContainer> {
  }


  interface MagnetUpgradeWrapper extends IContentsFilteredUpgrade, ITickableUpgrade, IPickupResponseUpgrade, UpgradeWrapperBase<MagnetUpgradeWrapper, MagnetUpgradeItem> {}
  class MagnetUpgradeWrapper extends IContentsFilteredUpgrade {
    constructor(storageWrapper: IStorageWrapper, upgrade: ItemStack, upgradeSaveHandler: Consumer<ItemStack>);
    static addMagnetPreventionChecker(checker: IMagnetPreventionChecker): void;
    get filterLogic(): ContentsFilterLogic;
    static globalPostTick(event: Pre): void;
    static onWorldUnload(evt: Unload): void;
    pickup(level: Level, stack: ItemStack, simulate: boolean): ItemStack;
    setPickupItems(pickupItems: boolean): void;
    setPickupXp(pickupXp: boolean): void;
    shouldPickupItems(): boolean;
    shouldPickupXp(): boolean;
    tick(entity: Entity, level: Level, pos: BlockPos): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.magnet.MagnetUpgradeTab' {
  import { MagnetUpgradeTab, MagnetUpgradeContainer } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.magnet';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { Toggle } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls.ButtonDefinition';
  import { ContentsFilterType } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';

  interface Advanced extends MagnetUpgradeTab {}
  class Advanced extends MagnetUpgradeTab {
    constructor(upgradeContainer: MagnetUpgradeContainer, position: Position, screen: StorageScreenBase<any>, slotsPerRow: number, contentsFilterButton: Toggle<ContentsFilterType>);
  }


  interface Basic extends MagnetUpgradeTab {}
  class Basic extends MagnetUpgradeTab {
    constructor(upgradeContainer: MagnetUpgradeContainer, position: Position, screen: StorageScreenBase<any>, slotsPerRow: number, contentsFilterButton: Toggle<ContentsFilterType>);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.pickup' {
  import { UpgradeItemBase, UpgradeType, IUpgradeCountLimitConfig, ContentsFilteredUpgradeContainer, UpgradeWrapperBase, IPickupResponseUpgrade, IContentsFilteredUpgrade, ContentsFilterLogic } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { IntSupplier, Consumer } from 'java.util.function';
  import { List } from 'java.util';
  import { UpgradeConflictDefinition } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.IUpgradeItem';
  import { UpgradeSettingsTab } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Level } from 'net.minecraft.world.level';

  interface PickupUpgradeItem extends UpgradeItemBase<PickupUpgradeWrapper> {}
  class PickupUpgradeItem extends UpgradeItemBase<PickupUpgradeWrapper> {
    static readonly TYPE: UpgradeType;
    constructor(filterSlotCount: IntSupplier, upgradeTypeLimitConfig: IUpgradeCountLimitConfig);
    get filterSlotCount(): number;
    get type(): UpgradeType<PickupUpgradeWrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
  }


  interface PickupUpgradeTab extends UpgradeSettingsTab<ContentsFilteredUpgradeContainer> {}
  class PickupUpgradeTab extends UpgradeSettingsTab<ContentsFilteredUpgradeContainer> {
  }


  interface PickupUpgradeWrapper extends IPickupResponseUpgrade, IContentsFilteredUpgrade, UpgradeWrapperBase<PickupUpgradeWrapper, PickupUpgradeItem> {}
  class PickupUpgradeWrapper extends IPickupResponseUpgrade {
    constructor(storageWrapper: IStorageWrapper, upgrade: ItemStack, upgradeSaveHandler: Consumer<ItemStack>);
    get filterLogic(): ContentsFilterLogic;
    pickup(level: Level, stack: ItemStack, simulate: boolean): ItemStack;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.pickup.PickupUpgradeTab' {
  import { PickupUpgradeTab, PickupUpgradeWrapper } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.pickup';
  import { ContentsFilteredUpgradeContainer, ContentsFilterType } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { Toggle } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls.ButtonDefinition';

  interface Advanced extends PickupUpgradeTab {}
  class Advanced extends PickupUpgradeTab {
    constructor(upgradeContainer: ContentsFilteredUpgradeContainer<PickupUpgradeWrapper>, position: Position, screen: StorageScreenBase<any>, slotsPerRow: number, contentsFilterButton: Toggle<ContentsFilterType>);
  }


  interface Basic extends PickupUpgradeTab {}
  class Basic extends PickupUpgradeTab {
    constructor(upgradeContainer: ContentsFilteredUpgradeContainer<PickupUpgradeWrapper>, position: Position, screen: StorageScreenBase<any>, slotsPerRow: number, contentsFilterButton: Toggle<ContentsFilterType>);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.pump' {
  import { Player } from 'net.minecraft.world.entity.player';
  import { IServerUpdater, UpgradeContainerBase, UpgradeContainerType } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { Supplier, Consumer } from 'java.util.function';
  import { FluidStack } from 'net.neoforged.neoforge.fluids';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { WidgetBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IntValue, DoubleValue, Builder } from 'ModConfigSpec';
  import { UpgradeItemBase, IUpgradeCountLimitConfig, UpgradeType, UpgradeWrapperBase, ITickableUpgrade } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { UpgradeConflictDefinition } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.IUpgradeItem';
  import { UpgradeSettingsTab } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { Entity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';

  class FluidFilterContainer {
    constructor(player: Player, serverUpdater: IServerUpdater, fluidFilterLogic: Supplier<FluidFilterLogic>);
    get numberOfFluidFilters(): number;
    getFluid(index: number): FluidStack;
    handlePacket(data: CompoundTag): boolean;
    setFluid(index: number, fluid: FluidStack): void;
    slotClick(index: number): void;
  }


  interface FluidFilterControl extends WidgetBase {}
  class FluidFilterControl extends WidgetBase {
    get slotTopLeftPositions(): Position[];
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    renderTooltip(screen: Screen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    setFluid(index: number, fluid: FluidStack): void;
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
  }


  class FluidFilterLogic {
    constructor(filterSlots: number, upgrade: ItemStack, saveHandler: Consumer<ItemStack>);
    fluidMatches(fluid: FluidStack): boolean;
    get numberOfFluidFilters(): number;
    getFluid(index: number): FluidStack;
    setFluid(index: number, fluid: FluidStack): void;
  }


  class PumpUpgradeConfig {
    readonly maxInputOutput: IntValue;
    readonly stackMultiplierRatio: DoubleValue;
    readonly filterSlots: IntValue;
    constructor(builder: Builder);
  }


  interface PumpUpgradeContainer extends UpgradeContainerBase<PumpUpgradeWrapper, PumpUpgradeContainer> {}
  class PumpUpgradeContainer extends UpgradeContainerBase<PumpUpgradeWrapper, PumpUpgradeContainer> {
    static readonly DATA_INTERACT_WITH_FLUID_HANDLERS: string;
    constructor(player: Player, upgradeContainerId: number, upgradeWrapper: PumpUpgradeWrapper, type: UpgradeContainerType<PumpUpgradeWrapper, PumpUpgradeContainer>);
    get fluidFilterContainer(): FluidFilterContainer;
    handlePacket(data: CompoundTag): void;
    isInput(): boolean;
    setInteractWithFluidHandlers(interact: boolean): void;
    setInteractWithHand(interactWithHand: boolean): void;
    setInteractWithWorld(interactWithWorld: boolean): void;
    setIsInput(input: boolean): void;
    shouldInteractWithFluidHandlers(): boolean;
    shouldInteractWithHand(): boolean;
    shouldInteractWithWorld(): boolean;
  }


  interface PumpUpgradeItem extends UpgradeItemBase<PumpUpgradeWrapper> {}
  class PumpUpgradeItem extends UpgradeItemBase<PumpUpgradeWrapper> {
    constructor(interactWithHandDefault: boolean, interactWithWorldDefault: boolean, interactWithFluidHandlersDefault: boolean, pumpUpgradeConfig: PumpUpgradeConfig, upgradeTypeLimitConfig: IUpgradeCountLimitConfig);
    get interactWithFluidHandlersDefault(): boolean;
    get interactWithHandDefault(): boolean;
    get interactWithWorldDefault(): boolean;
    get pumpUpgradeConfig(): PumpUpgradeConfig;
    get type(): UpgradeType<PumpUpgradeWrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
  }


  interface PumpUpgradeTab extends UpgradeSettingsTab<PumpUpgradeContainer> {}
  class PumpUpgradeTab extends UpgradeSettingsTab<PumpUpgradeContainer> {
  }


  interface PumpUpgradeWrapper extends ITickableUpgrade, UpgradeWrapperBase<PumpUpgradeWrapper, PumpUpgradeItem> {}
  class PumpUpgradeWrapper extends ITickableUpgrade {
    get fluidFilterLogic(): FluidFilterLogic;
    getAdjustedStackMultiplier(storageWrapper: IStorageWrapper): number;
    isInput(): boolean;
    setInteractWithFluidHandlers(interactWithFluidHandlers: boolean): void;
    setInteractWithHand(interactWithHand: boolean): void;
    setInteractWithWorld(interactWithWorld: boolean): void;
    setIsInput(input: boolean): void;
    shouldInteractWithFluidHandlers(): boolean;
    shouldInteractWithHand(): boolean;
    shouldInteractWithWorld(): boolean;
    tick(entity: Entity, level: Level, pos: BlockPos): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.pump.PumpUpgradeTab' {
  import { PumpUpgradeTab, PumpUpgradeContainer, FluidFilterControl } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.pump';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';

  interface Advanced extends PumpUpgradeTab {}
  class Advanced extends PumpUpgradeTab {
    constructor(upgradeContainer: PumpUpgradeContainer, position: Position, screen: StorageScreenBase<any>);
    get fluidFilterControl(): FluidFilterControl;
  }


  interface Basic extends PumpUpgradeTab {}
  class Basic extends PumpUpgradeTab {
    constructor(upgradeContainer: PumpUpgradeContainer, position: Position, screen: StorageScreenBase<any>);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.stack' {
  import { Builder } from 'ModConfigSpec';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { UpgradeItemBase, UpgradeType, UpgradeGroup, IUpgradeCountLimitConfig, IUpgradeItem } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { Wrapper } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.stack.StackUpgradeItem';
  import { IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { List } from 'java.util';
  import { UpgradeConflictDefinition } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.IUpgradeItem';
  import { UpgradeSlotChangeResult } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { Player } from 'net.minecraft.world.entity.player';

  class StackUpgradeConfig {
    constructor(builder: Builder);
    canStackItem(item: Item): boolean;
    clearNonStackableItems(): void;
  }


  interface StackUpgradeItem extends UpgradeItemBase<Wrapper> {}
  class StackUpgradeItem extends UpgradeItemBase<Wrapper> {
    static readonly TYPE: UpgradeType;
    static readonly UPGRADE_GROUP: UpgradeGroup;
    constructor(stackSizeMultiplier: number, upgradeTypeLimitConfig: IUpgradeCountLimitConfig);
    canRemoveUpgradeFrom(storageWrapper: IStorageWrapper, isClientSide: boolean): UpgradeSlotChangeResult;
    canRemoveUpgradeFrom(storageWrapper: IStorageWrapper, isClientSide: boolean, player: Player): UpgradeSlotChangeResult;
    canSwapUpgradeFor(upgradeStackToPut: ItemStack, upgradeSlot: number, storageWrapper: IStorageWrapper, isClientSide: boolean): UpgradeSlotChangeResult;
    checkExtraInsertConditions(upgradeStack: ItemStack, storageWrapper: IStorageWrapper, isClientSide: boolean, upgradeSlot: number, upgradeInSlot: IUpgradeItem<any>): UpgradeSlotChangeResult;
    get stackSizeMultiplier(): number;
    get type(): UpgradeType<Wrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
    get upgradeGroup(): UpgradeGroup;
    static getInventorySlotLimit(storageWrapper: IStorageWrapper): number;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.stack.StackUpgradeItem' {
  import { UpgradeWrapperBase } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { StackUpgradeItem } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.stack';

  interface Wrapper extends UpgradeWrapperBase<Wrapper, StackUpgradeItem> {}
  class Wrapper extends UpgradeWrapperBase<Wrapper, StackUpgradeItem> {
    canBeDisabled(): boolean;
    get stackSizeMultiplier(): number;
    hideSettingsTab(): boolean;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.stonecutter' {
  import { BlockConverterRecipeContainer, BlockConverterRecipeControl, BlockConverterUpgradeContainer, BlockConverterUpgradeItem, BlockConverterUpgradeTab } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.blockconverter';
  import { StonecutterRecipe } from 'net.minecraft.world.item.crafting';
  import { Consumer } from 'java.util.function';
  import { Slot, ContainerLevelAccess } from 'net.minecraft.world.inventory';
  import { IServerUpdater, UpgradeContainerType } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Wrapper } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.stonecutter.StonecutterUpgradeItem';
  import { IUpgradeCountLimitConfig, UpgradeType } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { Toggle } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls.ButtonDefinition';
  import { Boolean } from 'java.lang';

  interface StonecutterRecipeContainer extends BlockConverterRecipeContainer<StonecutterRecipe, Wrapper, StonecutterRecipeContainer, StonecutterUpgradeContainer> {}
  class StonecutterRecipeContainer extends BlockConverterRecipeContainer<StonecutterRecipe, Wrapper, StonecutterRecipeContainer, StonecutterUpgradeContainer> {
    constructor(upgradeContainer: StonecutterUpgradeContainer, addSlot: Consumer<Slot>, serverUpdater: IServerUpdater, worldPosCallable: ContainerLevelAccess, level: Level);
  }


  interface StonecutterRecipeControl extends BlockConverterRecipeControl<StonecutterRecipe, StonecutterRecipeContainer> {}
  class StonecutterRecipeControl extends BlockConverterRecipeControl<StonecutterRecipe, StonecutterRecipeContainer> {
  }


  interface StonecutterUpgradeContainer extends BlockConverterUpgradeContainer<StonecutterRecipe, Wrapper, StonecutterUpgradeContainer, StonecutterRecipeContainer> {}
  class StonecutterUpgradeContainer extends BlockConverterUpgradeContainer<StonecutterRecipe, Wrapper, StonecutterUpgradeContainer, StonecutterRecipeContainer> {
    constructor(player: Player, upgradeContainerId: number, upgradeWrapper: Wrapper, type: UpgradeContainerType<Wrapper, StonecutterUpgradeContainer>);
  }


  interface StonecutterUpgradeItem extends BlockConverterUpgradeItem<StonecutterUpgradeItem, Wrapper> {}
  class StonecutterUpgradeItem extends BlockConverterUpgradeItem<StonecutterUpgradeItem, Wrapper> {
    constructor(upgradeTypeLimitConfig: IUpgradeCountLimitConfig);
    get type(): UpgradeType<Wrapper>;
  }


  interface StonecutterUpgradeTab extends BlockConverterUpgradeTab<StonecutterRecipe, StonecutterRecipeContainer, StonecutterUpgradeContainer> {}
  class StonecutterUpgradeTab extends BlockConverterUpgradeTab<StonecutterRecipe, StonecutterRecipeContainer, StonecutterUpgradeContainer> {
    constructor(upgradeContainer: StonecutterUpgradeContainer, position: Position, screen: StorageScreenBase<any>, shiftClickTargetButton: Toggle<boolean>);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.stonecutter.StonecutterUpgradeItem' {
  import { BlockConverterUpgradeWrapper } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.blockconverter';
  import { StonecutterUpgradeItem } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.stonecutter';

  interface Wrapper extends BlockConverterUpgradeWrapper<StonecutterUpgradeItem, Wrapper> {}
  class Wrapper extends BlockConverterUpgradeWrapper<StonecutterUpgradeItem, Wrapper> {
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.tank' {
  import { UpgradeInventoryPartBase, StorageScreenBase, UpgradeSettingsTab } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { IntValue, DoubleValue, Builder } from 'ModConfigSpec';
  import { UpgradeContainerBase, UpgradeContainerType, UpgradeSlotChangeResult } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { FluidStack, SimpleFluidContent } from 'net.neoforged.neoforge.fluids';
  import { UpgradeItemBase, UpgradeType, IUpgradeCountLimitConfig, IUpgradeItem, UpgradeWrapperBase, IRenderedTankUpgrade, ITickableUpgrade, IStackableContentsUpgrade } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { List } from 'java.util';
  import { IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { ItemStack } from 'net.minecraft.world.item';
  import { UpgradeConflictDefinition } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.IUpgradeItem';
  import { Consumer } from 'java.util.function';
  import { TankRenderInfo } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.IRenderedTankUpgrade';
  import { TankComponentItemHandler } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.tank.TankUpgradeWrapper';
  import { FluidAction } from 'IFluidHandler';
  import { Entity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { IFluidHandlerItem } from 'net.neoforged.neoforge.fluids.capability';

  interface TankInventoryPart extends UpgradeInventoryPartBase<TankUpgradeContainer> {}
  class TankInventoryPart extends UpgradeInventoryPartBase<TankUpgradeContainer> {
    constructor(upgradeSlot: number, container: TankUpgradeContainer, pos: Position, height: number, screen: StorageScreenBase<any>);
    handleMouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    renderErrorOverlay(guiGraphics: GuiGraphics): void;
    renderTooltip(screen: StorageScreenBase<any>, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
  }


  class TankUpgradeConfig {
    readonly capacityPerSlotRow: IntValue;
    readonly stackMultiplierRatio: DoubleValue;
    readonly autoFillDrainContainerCooldown: IntValue;
    readonly maxInputOutput: IntValue;
    constructor(builder: Builder);
  }


  interface TankUpgradeContainer extends UpgradeContainerBase<TankUpgradeWrapper, TankUpgradeContainer> {}
  class TankUpgradeContainer extends UpgradeContainerBase<TankUpgradeWrapper, TankUpgradeContainer> {
    static readonly EMPTY_TANK_INPUT_SLOT_BACKGROUND: ResourceLocation;
    static readonly EMPTY_TANK_OUTPUT_SLOT_BACKGROUND: ResourceLocation;
    constructor(player: Player, upgradeContainerId: number, upgradeWrapper: TankUpgradeWrapper, type: UpgradeContainerType<TankUpgradeWrapper, TankUpgradeContainer>);
    get contents(): FluidStack;
    get tankCapacity(): number;
    handlePacket(data: CompoundTag): void;
  }


  interface TankUpgradeItem extends UpgradeItemBase<TankUpgradeWrapper> {}
  class TankUpgradeItem extends UpgradeItemBase<TankUpgradeWrapper> {
    static readonly TYPE: UpgradeType;
    static readonly UPGRADE_CONFLICT_DEFINITIONS: List;
    constructor(tankUpgradeConfig: TankUpgradeConfig, upgradeTypeLimitConfig: IUpgradeCountLimitConfig);
    checkExtraInsertConditions(upgradeStack: ItemStack, storageWrapper: IStorageWrapper, isClientSide: boolean, upgradeInSlot: IUpgradeItem<any>): UpgradeSlotChangeResult;
    get inventoryColumnsTaken(): number;
    get tankUpgradeConfig(): TankUpgradeConfig;
    get type(): UpgradeType<TankUpgradeWrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
    getAdjustedStackMultiplier(storageWrapper: IStorageWrapper): number;
    getBaseCapacity(storageWrapper: IStorageWrapper): number;
    getTankCapacity(storageWrapper: IStorageWrapper): number;
  }


  interface TankUpgradeTab extends UpgradeSettingsTab<TankUpgradeContainer> {}
  class TankUpgradeTab extends UpgradeSettingsTab<TankUpgradeContainer> {
    constructor(upgradeContainer: TankUpgradeContainer, position: Position, screen: StorageScreenBase<any>);
  }


  interface TankUpgradeWrapper extends IRenderedTankUpgrade, ITickableUpgrade, IStackableContentsUpgrade, UpgradeWrapperBase<TankUpgradeWrapper, TankUpgradeItem> {}
  class TankUpgradeWrapper extends IRenderedTankUpgrade {
    static readonly INPUT_SLOT: number;
    static readonly OUTPUT_SLOT: number;
    static readonly INPUT_RESULT_SLOT: number;
    static readonly OUTPUT_RESULT_SLOT: number;
    canBeDisabled(): boolean;
    drain(maxDrain: number, action: FluidAction, ignoreInOutLimit: boolean): FluidStack;
    drainHandler(fluidHandler: IFluidHandlerItem, updateContainerStack: Consumer<ItemStack>): void;
    drainHandler(fluidHandler: IFluidHandlerItem, updateContainerStack: Consumer<ItemStack>, moveEmptyToResult: boolean, simulateIncludingFullDrain: boolean): boolean;
    fill(resource: FluidStack, action: FluidAction, ignoreInOutLimit: boolean): number;
    fillHandler(fluidHandler: IFluidHandlerItem, updateContainerStack: Consumer<ItemStack>, moveFullToResult: boolean, simulateIncludingFullFill: boolean): boolean;
    forceUpdateTankRenderInfo(): void;
    get contents(): FluidStack;
    get inventory(): TankComponentItemHandler;
    get minimumMultiplierRequired(): number;
    get tankCapacity(): number;
    static getContents(upgrade: ItemStack): SimpleFluidContent;
    interactWithCursorStack(cursorStack: ItemStack, updateContainerStack: Consumer<ItemStack>): void;
    setTankRenderInfoUpdateCallback(updateTankRenderInfoCallback: Consumer<TankRenderInfo>): void;
    tick(entity: Entity, level: Level, pos: BlockPos): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.tank.TankUpgradeWrapper' {
  import { ComponentItemHandler } from 'net.neoforged.neoforge.items';
  import { ItemStack } from 'net.minecraft.world.item';

  interface TankComponentItemHandler extends ComponentItemHandler {}
  class TankComponentItemHandler extends ComponentItemHandler {
    constructor(upgrade: ItemStack);
    isItemValid(slot: number, stack: ItemStack): boolean;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.tank.TankUpgradeWrapper.SwapEmptyFluidContainerHandler' {
  import { SwapEmptyFluidContainerHandler } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.tank.TankUpgradeWrapper';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { Fluid } from 'net.minecraft.world.level.material';

  interface Full extends SwapEmptyFluidContainerHandler {}
  class Full extends SwapEmptyFluidContainerHandler {
    constructor(container: ItemStack, empty: Item, full: ItemStack, capacity: number, validFluid: Fluid);
  }


  interface Empty extends SwapEmptyFluidContainerHandler {}
  class Empty extends SwapEmptyFluidContainerHandler {
    constructor(container: ItemStack, empty: Item, ...fullContainers: FullContainerDefinition[]);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.UpgradeType' {
  import { IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Consumer } from 'java.util.function';

  class IFactory<T extends IUpgradeWrapper = any> {
    create(var1: IStorageWrapper, var2: ItemStack, var3: Consumer<ItemStack>): T;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.voiding' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { FilteredUpgradeConfigBase, FilterLogicContainer, FilterLogic, UpgradeItemBase, UpgradeType, IUpgradeCountLimitConfig, UpgradeWrapperBase, IInsertResponseUpgrade, IFilteredUpgrade, ITickableUpgrade, IOverflowResponseUpgrade } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { BooleanValue, Builder } from 'ModConfigSpec';
  import { UpgradeContainerBase, UpgradeContainerType } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { UpgradeConflictDefinition } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.IUpgradeItem';
  import { UpgradeSettingsTab } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { ISlotChangeResponseUpgrade, IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Consumer } from 'java.util.function';
  import { InventoryHandler } from 'net.p3pp3rf1y.sophisticatedcore.inventory';
  import { IItemHandler } from 'net.neoforged.neoforge.items';
  import { Entity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';

  interface VoidType extends Enum<VoidType> {}
  class VoidType extends Enum<VoidType> {
    static readonly ALWAYS: VoidType;
    static readonly SLOT_OVERFLOW: VoidType;
    static readonly STORAGE_OVERFLOW: VoidType;
    static fromName(name: string): VoidType;
    get serializedName(): string;
    next(): VoidType;
    static valueOf(name: string): VoidType;
    static values(): VoidType[];
  }


  interface VoidUpgradeConfig extends FilteredUpgradeConfigBase {}
  class VoidUpgradeConfig extends FilteredUpgradeConfigBase {
    readonly voidAlwaysEnabled: BooleanValue;
    constructor(builder: Builder, name: string, path: string, defaultFilterSlots: number, defaultSlotsInRow: number);
  }


  interface VoidUpgradeContainer extends UpgradeContainerBase<VoidUpgradeWrapper, VoidUpgradeContainer> {}
  class VoidUpgradeContainer extends UpgradeContainerBase<VoidUpgradeWrapper, VoidUpgradeContainer> {
    constructor(player: Player, containerId: number, wrapper: VoidUpgradeWrapper, type: UpgradeContainerType<VoidUpgradeWrapper, VoidUpgradeContainer>);
    get filterLogicContainer(): FilterLogicContainer<FilterLogic>;
    get voidType(): VoidType;
    handlePacket(data: CompoundTag): void;
    set voidType(voidType: VoidType);
    setShouldWorkdInGUI(shouldWorkdInGUI: boolean): void;
    shouldWorkInGUI(): boolean;
  }


  interface VoidUpgradeItem extends UpgradeItemBase<VoidUpgradeWrapper> {}
  class VoidUpgradeItem extends UpgradeItemBase<VoidUpgradeWrapper> {
    static readonly TYPE: UpgradeType;
    constructor(voidUpgradeConfig: VoidUpgradeConfig, upgradeTypeLimitConfig: IUpgradeCountLimitConfig);
    get filterSlotCount(): number;
    get type(): UpgradeType<VoidUpgradeWrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
    isVoidAlwaysEnabled(): boolean;
  }


  interface VoidUpgradeTab extends UpgradeSettingsTab<VoidUpgradeContainer> {}
  class VoidUpgradeTab extends UpgradeSettingsTab<VoidUpgradeContainer> {
  }


  interface VoidUpgradeWrapper extends IInsertResponseUpgrade, IFilteredUpgrade, ISlotChangeResponseUpgrade, ITickableUpgrade, IOverflowResponseUpgrade, UpgradeWrapperBase<VoidUpgradeWrapper, VoidUpgradeItem> {}
  class VoidUpgradeWrapper extends IInsertResponseUpgrade {
    constructor(storageWrapper: IStorageWrapper, upgrade: ItemStack, upgradeSaveHandler: Consumer<ItemStack>);
    get filterLogic(): FilterLogic;
    get voidType(): VoidType;
    isVoidAlwaysEnabled(): boolean;
    onBeforeInsert(inventoryHandler: InventoryHandler, slot: number, stack: ItemStack, simulate: boolean): ItemStack;
    onBeforeInsert(inventoryHandler: InventoryHandler, stack: ItemStack, simulate: boolean): ItemStack;
    onSlotChange(inventoryHandler: IItemHandler, slot: number): void;
    onSlotOverflow(stack: ItemStack): ItemStack;
    onStorageOverflow(stack: ItemStack): ItemStack;
    set voidType(voidType: VoidType);
    setShouldWorkdInGUI(shouldWorkdInGUI: boolean): void;
    setVoidOverflowDefaultOrLoadFromNbt(voidOverflowDefault: VoidType): void;
    shouldVoidOverflow(): boolean;
    shouldWorkInGUI(): boolean;
    stackMatchesFilter(stack: ItemStack): boolean;
    tick(entity: Entity, level: Level, pos: BlockPos): void;
    worksInGui(): boolean;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.voiding.VoidUpgradeTab' {
  import { VoidUpgradeTab, VoidUpgradeContainer } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.voiding';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';

  interface Advanced extends VoidUpgradeTab {}
  class Advanced extends VoidUpgradeTab {
    constructor(upgradeContainer: VoidUpgradeContainer, position: Position, screen: StorageScreenBase<any>, slotsPerRow: number);
  }


  interface Basic extends VoidUpgradeTab {}
  class Basic extends VoidUpgradeTab {
    constructor(upgradeContainer: VoidUpgradeContainer, position: Position, screen: StorageScreenBase<any>, slotsPerRow: number);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.upgrades.xppump' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { IntValue, BooleanValue, Builder } from 'ModConfigSpec';
  import { UpgradeContainerBase, UpgradeContainerType } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { UpgradeItemBase, UpgradeType, IUpgradeCountLimitConfig, UpgradeWrapperBase, ITickableUpgrade } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { UpgradeConflictDefinition } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.IUpgradeItem';
  import { UpgradeSettingsTab, StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { ButtonDefinition } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.controls';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { Entity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';

  interface AutomationDirection extends Enum<AutomationDirection> {}
  class AutomationDirection extends Enum<AutomationDirection> {
    static readonly INPUT: AutomationDirection;
    static readonly OUTPUT: AutomationDirection;
    static readonly KEEP: AutomationDirection;
    static readonly OFF: AutomationDirection;
    static fromName(name: string): AutomationDirection;
    get serializedName(): string;
    next(): AutomationDirection;
    static valueOf(name: string): AutomationDirection;
    static values(): AutomationDirection[];
  }


  class XpPumpUpgradeConfig {
    readonly maxXpPointsPerMending: IntValue;
    readonly mendingOn: BooleanValue;
    constructor(builder: Builder);
  }


  interface XpPumpUpgradeContainer extends UpgradeContainerBase<XpPumpUpgradeWrapper, XpPumpUpgradeContainer> {}
  class XpPumpUpgradeContainer extends UpgradeContainerBase<XpPumpUpgradeWrapper, XpPumpUpgradeContainer> {
    constructor(player: Player, upgradeContainerId: number, upgradeWrapper: XpPumpUpgradeWrapper, type: UpgradeContainerType<XpPumpUpgradeWrapper, XpPumpUpgradeContainer>);
    get direction(): AutomationDirection;
    get level(): number;
    get levelsToStore(): number;
    get levelsToTake(): number;
    handlePacket(data: CompoundTag): void;
    set direction(direction: AutomationDirection);
    set level(level: number);
    set levelsToStore(levelsToStore: number);
    set levelsToTake(levelsToTake: number);
    setMendItems(mendItems: boolean): void;
    shouldMendItems(): boolean;
    storeAllExperience(): void;
    storeLevels(): void;
    takeAllExperience(): void;
    takeLevels(): void;
  }


  interface XpPumpUpgradeItem extends UpgradeItemBase<XpPumpUpgradeWrapper> {}
  class XpPumpUpgradeItem extends UpgradeItemBase<XpPumpUpgradeWrapper> {
    static readonly TYPE: UpgradeType;
    constructor(xpPumpUpgradeConfig: XpPumpUpgradeConfig, upgradeTypeLimitConfig: IUpgradeCountLimitConfig);
    get type(): UpgradeType<XpPumpUpgradeWrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
    get xpPumpUpgradeConfig(): XpPumpUpgradeConfig;
  }


  interface XpPumpUpgradeTab extends UpgradeSettingsTab<XpPumpUpgradeContainer> {}
  class XpPumpUpgradeTab extends UpgradeSettingsTab<XpPumpUpgradeContainer> {
    static readonly STORE_ALL: ButtonDefinition;
    static readonly TAKE_ALL: ButtonDefinition;
    static readonly TAKE: ButtonDefinition;
    static readonly STORE: ButtonDefinition;
    constructor(upgradeContainer: XpPumpUpgradeContainer, position: Position, screen: StorageScreenBase<any>, isMendingTurnedOn: boolean);
    mouseScrolled(mouseX: number, mouseY: number, scrollX: number, scrollY: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrollX: number, scrollY: number): boolean;
  }


  interface XpPumpUpgradeWrapper extends ITickableUpgrade, UpgradeWrapperBase<XpPumpUpgradeWrapper, XpPumpUpgradeItem> {}
  class XpPumpUpgradeWrapper extends ITickableUpgrade {
    get direction(): AutomationDirection;
    get level(): number;
    get levelsToStore(): number;
    get levelsToTake(): number;
    giveAllExperienceToPlayer(player: Player): void;
    giveLevelsToPlayer(player: Player): void;
    set direction(direction: AutomationDirection);
    set level(level: number);
    set levelsToStore(levelsToStore: number);
    set levelsToTake(levelsToTake: number);
    setMendItems(mendItems: boolean): void;
    shouldMendItems(): boolean;
    takeAllExperienceFromPlayer(player: Player): void;
    takeLevelsFromPlayer(player: Player): void;
    tick(entity: Entity, level: Level, pos: BlockPos): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.util' {
  import { Block } from 'net.minecraft.world.level.block';
  import { Properties } from 'BlockBehaviour';
  import { Consumer, Function, Predicate, BiConsumer, BooleanSupplier, BiFunction, Supplier, BiPredicate } from 'java.util.function';
  import { ItemStack, BlockItem, DyeColor, Item } from 'net.minecraft.world.item';
  import { Properties as item_Properties } from 'Item';
  import { Entity } from 'net.minecraft.world.entity';
  import { IItemHandler, ItemStackHandler, IItemHandlerModifiable } from 'net.neoforged.neoforge.items';
  import { Level, BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos, Direction, RegistryAccess, Registry, Holder, HolderSet } from 'net.minecraft.core';
  import { EntityCapability, ItemCapability, BlockCapability } from 'net.neoforged.neoforge.capabilities';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { IFluidHandler, IFluidHandlerItem } from 'net.neoforged.neoforge.fluids.capability';
  import { Optional, Set, List, Comparator, Collection, Map, UUID } from 'java.util';
  import { Codec } from 'com.mojang.serialization';
  import { PrimitiveCodec } from 'com.mojang.serialization.codecs';
  import { FakePlayer } from 'net.neoforged.neoforge.common.util';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { Unload } from 'LevelEvent';
  import { Vec3, AABB } from 'net.minecraft.world.phys';
  import { Slot } from 'net.minecraft.world.inventory';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Integer, Boolean, Enum, Long, Runnable, Class } from 'java.lang';
  import { UpgradeHandler } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { ItemStackKey, ITrackedContentsItemHandler, InventoryHandler } from 'net.p3pp3rf1y.sophisticatedcore.inventory';
  import { RandomSource } from 'net.minecraft.util';
  import { Entry } from 'Map';
  import { DataComponentMap, DataComponentHolder } from 'net.minecraft.core.component';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { MinecraftServer } from 'net.minecraft.server';
  import { CompoundTag, Tag } from 'net.minecraft.nbt';
  import { Component } from 'net.minecraft.network.chat';
  import { Provider } from 'HolderLookup';
  import { IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { SettingsHandler, ISettingsCategory } from 'net.p3pp3rf1y.sophisticatedcore.settings';
  import { SortBy } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { RenderInfo } from 'net.p3pp3rf1y.sophisticatedcore.renderdata';
  import { RecipesUpdatedEvent } from 'net.neoforged.neoforge.client.event';
  import { OnDatapackSyncEvent } from 'net.neoforged.neoforge.event';
  import { UncompactingResult, CompactingResult, CompactingShape } from 'net.p3pp3rf1y.sophisticatedcore.util.RecipeHelper';
  import { RecipeHolder, RecipeType, AbstractCookingRecipe, RecipeInput, Recipe, CraftingInput } from 'net.minecraft.world.item.crafting';
  import { VoxelShape } from 'net.minecraft.world.phys.shapes';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { TagKey } from 'net.minecraft.tags';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { ByteBuf } from 'io.netty.buffer';
  import { Function7, Function8, Function9 } from 'com.mojang.datafixers.util';
  import { Edge } from 'net.p3pp3rf1y.sophisticatedcore.util.VoxelOutliner';

  interface BlockBase extends Block {}
  class BlockBase extends Block {
    constructor(properties: Properties);
    addCreativeTabItems(itemConsumer: Consumer<ItemStack>): void;
  }


  interface BlockItemBase extends BlockItem {}
  class BlockItemBase extends BlockItem {
    constructor(block: Block, properties: item_Properties);
    addCreativeTabItems(itemConsumer: Consumer<ItemStack>): void;
  }


  class CapabilityHelper {
    static getFromCapability<T, C, U>(stack: ItemStack, capability: ItemCapability<T, C>, context: C, get: Function<T, U>, defaultValue: U): U;
    static getFromCapability<T, C, U>(level: Level, pos: BlockPos, capability: BlockCapability<T, C>, context: C, get: Function<T, U>, defaultValue: U): U;
    static getFromCapability<T, C, U>(blockEntity: BlockEntity, capability: BlockCapability<T, C>, context: C, get: Function<T, U>, defaultValue: U): U;
    static getFromCapability<T, C, U>(level: Level, pos: BlockPos, state: BlockState, blockEntity: BlockEntity, capability: BlockCapability<T, C>, context: C, get: Function<T, U>, defaultValue: U): U;
    static getFromFluidHandler<T>(be: BlockEntity, side: Direction, get: Function<IFluidHandler, T>, defaultValue: T): T;
    static getFromFluidHandler<T>(stack: ItemStack, get: Function<IFluidHandlerItem, T>, defaultValue: T): T;
    static getFromItemHandler<T>(level: Level, pos: BlockPos, context: Direction, get: Function<IItemHandler, T>, defaultValue: T): T;
    static getFromItemHandler<T>(level: Level, pos: BlockPos, get: Function<IItemHandler, T>, defaultValue: T): T;
    static runOnCapability<T, C>(entity: Entity, capability: EntityCapability<T, C>, context: C, run: Consumer<T>): void;
    static runOnCapability<T, C>(stack: ItemStack, capability: ItemCapability<T, C>, context: C, run: Consumer<T>): void;
    static runOnFluidHandler(stack: ItemStack, run: Consumer<IFluidHandlerItem>): void;
    static runOnItemHandler(entity: Entity, run: Consumer<IItemHandler>): void;
  }


  class ClientRegistryHelper {
    static get registryAccess(): Optional<RegistryAccess>;
  }


  class CodecHelper {
    static readonly OVERSIZED_ITEM_STACK_CODEC: Codec;
    static readonly OPTIONAL_OVERSIZED_ITEM_STACK_CODEC: Codec;
    static readonly LENIENT_CONTENTS_SLOT_CODEC: Codec;
    static LENIENT_ITEM_CONTAINER_CONTENTS_CODEC: Codec;
    static readonly STRING_ENCODED_INT: PrimitiveCodec;
    static setOf<T>(elementCodec: Codec<T>): Codec<Set<T>>;
  }


  class ColorHelper {
    static calculateColor(baseColor: number, defaultColor: number, dyes: DyeColor[]): number;
    static getHexColor(rgb: number): string;
  }


  interface CoreFakePlayer extends FakePlayer {}
  class CoreFakePlayer extends FakePlayer {
    blockPosition(): BlockPos;
    static get(level: ServerLevel): CoreFakePlayer;
    static onDimensionUnload(event: Unload): void;
    position(): Vec3;
    setPosition(position: Vec3): void;
  }


  class CountAbbreviator {
    static abbreviate(count: number): string;
    static abbreviate(count: number, maxCharacters: number): string;
  }


  interface DummySlot extends Slot {}
  class DummySlot extends Slot {
    static readonly INSTANCE: DummySlot;
    get item(): ItemStack;
    set(p_40240_: ItemStack): void;
    setChanged(): void;
  }


  class Easing {
    static readonly EASE_IN_OUT_CUBIC: Easing;
    static readonly EASE_OUT_CUBIC: Easing;
    ease(number: number): number;
  }


  interface FilterItemStackHandler extends ItemStackHandler {}
  class FilterItemStackHandler extends ItemStackHandler {
    constructor(size: number);
    extractItem(slot: number, amount: number, simulate: boolean): ItemStack;
    getSlotLimit(slot: number): number;
    hasOnlyEmptyFilters(): boolean;
    insertItem(slot: number, stack: ItemStack, simulate: boolean): ItemStack;
  }


  class IDoubleBlock {
    getOtherPosition(var1: BlockState, var2: BlockPos): Optional<BlockPos>;
  }


  class InventoryHelper {
    static cloneInventory(inventory: IItemHandler): IItemHandler;
    static copyTo(handlerA: IItemHandlerModifiable, handlerB: IItemHandlerModifiable): void;
    static dropItem(handler: ItemStackHandler, level: Level, x: number, y: number, z: number, slot: number, stack: ItemStack): void;
    static dropItems(inventoryHandler: ItemStackHandler, level: Level, pos: BlockPos): void;
    static dropItems(inventoryHandler: ItemStackHandler, level: Level, x: number, y: number, z: number, slot: number, stack: ItemStack): void;
    static extractFromInventory(item: Item, count: number, inventory: IItemHandler, simulate: boolean, stack: ItemStack): ItemStack;
    static extractFromInventory(stackMatcher: Predicate<ItemStack>, count: number, inventory: IItemHandler, simulate: boolean): ItemStack;
    static extractFromInventory(stack: ItemStack, inventory: IItemHandler, simulate: boolean): ItemStack;
    static getAnalogOutputSignal(handler: ITrackedContentsItemHandler): number;
    static getAndRemove(itemHandler: IItemHandler, slot: number): ItemStack;
    static getCompactedStacksSortedByCount(handler: IItemHandler): ItemStack[];
    static getCountMissingInHandler(itemHandler: IItemHandler, filter: ItemStack, expectedCount: number): number;
    static getEmptySlotsRandomized(inventory: IItemHandler): number[];
    static getEquipmentItemHandlersFromPlayer(player: Player): IItemHandler[];
    static getItemFromEitherHand(player: Player, item: Item): Optional<ItemStack>;
    static getItemHandlersFromPlayerIncludingContainers(player: Player): IItemHandler[];
    static getItemSlots(inventory: IItemHandler, matches: Predicate<ItemStack>): Set<number>;
    static getStacks(handler: IItemHandler): ItemStack[];
    static getUniqueStacks(handler: IItemHandler): Set<ItemStackKey>;
    static hasItem(inventory: IItemHandler, matches: Predicate<ItemStack>): boolean;
    static insertIntoInventory(stacks: ItemStack[], inventory: IItemHandler, simulate: boolean): ItemStack[];
    static insertIntoInventory(stack: ItemStack, inventory: IItemHandler, simulate: boolean): ItemStack;
    static insertIntoInventoryMatchingFirst(stack: ItemStack, inventory: IItemHandler, simulate: boolean): ItemStack;
    static insertOrDropItem(player: Player, stack: ItemStack, ...inventories: IItemHandler[]): void;
    static isEmpty(itemHandler: IItemHandler): boolean;
    static iterate(handler: IItemHandler, actOn: BiConsumer<number, ItemStack>): void;
    static iterate(handler: IItemHandler, actOn: BiConsumer<number, ItemStack>, shouldExit: BooleanSupplier): void;
    static iterate(handler: IItemHandler, actOn: BiConsumer<number, ItemStack>, shouldExit: BooleanSupplier, getVirtualCounts: boolean): void;
    static iterate<T>(handler: IItemHandler, getFromSlotStack: BiFunction<number, ItemStack, T>, supplyDefault: Supplier<T>, shouldExit: Predicate<T>): T;
    static mergeIntoPlayerInventory(player: Player, stack: ItemStack, startSlot: number): ItemStack;
    static registerEquipmentInventoryProvider(provider: Function<Player, IItemHandler>): void;
    static registerPlayerInventoryProvider(provider: Function<Player, IItemHandler>): void;
    static runPickupOnPickupResponseUpgrades(level: Level, upgradeHandler: UpgradeHandler, remainingStack: ItemStack, simulate: boolean): ItemStack;
    static runPickupOnPickupResponseUpgrades(level: Level, player: Player, upgradeHandler: UpgradeHandler, remainingStack: ItemStack, simulate: boolean): ItemStack;
    static shuffleItems(stacks: ItemStack[], emptySlotsCount: number, rand: RandomSource): void;
    static transfer(handlerA: IItemHandler, handlerB: IItemHandler, onInserted: Consumer<Supplier<ItemStack>>): void;
  }


  class InventorySorter {
    static readonly BY_NAME: Comparator;
    static readonly BY_MOD: Comparator;
    static readonly BY_COUNT: Comparator;
    static readonly BY_TAGS: Comparator;
    static sortHandler(handler: IItemHandlerModifiable, comparator: Comparator<Entry<ItemStackKey, number>>, noSortSlots: Set<number>): void;
  }


  interface ItemBase extends Item {}
  class ItemBase extends Item {
    constructor(properties: item_Properties);
    addCreativeTabItems(itemConsumer: Consumer<ItemStack>): void;
  }


  class ItemStackHelper {
    static areComponentsEqualIgnoreDurability(componentsA: DataComponentMap, componentsB: DataComponentMap): boolean;
    static areItemStackComponentsEqualIgnoreDurability(stackA: ItemStack, stackB: ItemStack): boolean;
  }


  class ITintable {
    get accentColor(): number;
    get mainColor(): number;
    setColors(var1: number, var2: number): void;
  }


  class LootHelper {
    static fillWithLoot(rand: RandomSource, loot: ItemStack[], inventory: IItemHandlerModifiable): void;
    static getLoot(lootTableName: ResourceLocation, server: MinecraftServer, level: ServerLevel, pos: BlockPos, player: Player): ItemStack[];
  }


  class MathHelper {
    static epsilonEquals(a: number, b: number): boolean;
    static intMaxCappedAddition(a: number, b: number): number;
    static intMaxCappedMultiply(a: number, b: number): number;
  }


  class NBTHelper {
    static getBoolean(tag: CompoundTag, key: string): Optional<boolean>;
    static getCollection<E, C extends Collection<E>>(tag: CompoundTag, key: string, listType: number, getElement: Function<Tag, Optional<E>>, initCollection: Supplier<C>): Optional<C>;
    static getComponent(tag: CompoundTag, key: string, registries: Provider): Optional<Component>;
    static getCompound(tag: CompoundTag, key: string): Optional<CompoundTag>;
    static getEnumConstant<T extends Enum<T>>(tag: CompoundTag, key: string, deserialize: Function<string, T>): Optional<T>;
    static getInt(tag: CompoundTag, key: string): Optional<number>;
    static getIntArray(tag: CompoundTag, key: string): Optional<number[]>;
    static getLong(tag: CompoundTag, key: string): Optional<Long>;
    static getMap<K, V>(tag: CompoundTag, key: string, getKey: Function<string, K>, getValue: BiFunction<string, Tag, Optional<V>>): Optional<Map<K, V>>;
    static getMap<K, V>(tag: CompoundTag, key: string, getKey: Function<string, K>, getValue: BiFunction<string, Tag, Optional<V>>, initMap: Supplier<Map<K, V>>): Optional<Map<K, V>>;
    static getString(tag: CompoundTag, key: string): Optional<string>;
    static getTagValue<T>(tag: CompoundTag, key: string, getValue: BiFunction<CompoundTag, string, T>): Optional<T>;
    static putBoolean(tag: CompoundTag, key: string, value: boolean): CompoundTag;
    static putEnumConstant<T extends Enum<T>>(tag: CompoundTag, key: string, enumConstant: T): CompoundTag;
    static putInt(tag: CompoundTag, key: string, value: number): CompoundTag;
    static putList<T>(tag: CompoundTag, key: string, values: Collection<T>, getNbtValue: Function<T, Tag>): void;
    static putMap<K, V>(tag: CompoundTag, key: string, map: Map<K, V>, getStringKey: Function<K, string>, getNbtValue: Function<V, Tag>): CompoundTag;
    static putString(tag: CompoundTag, key: string, value: string): CompoundTag;
  }


  interface NoopStorageWrapper extends IStorageWrapper {}
  class NoopStorageWrapper extends IStorageWrapper {
    static readonly INSTANCE: NoopStorageWrapper;
    fillWithLoot(playerEntity: Player): void;
    get accentColor(): number;
    get columnsTaken(): number;
    get contentsUuid(): Optional<UUID>;
    get displayName(): Component;
    get globalSettingsCategoryName(): string;
    get inventoryForInputOutput(): ITrackedContentsItemHandler;
    get inventoryForUpgradeProcessing(): ITrackedContentsItemHandler;
    get inventoryHandler(): InventoryHandler;
    get mainColor(): number;
    get openTabId(): Optional<number>;
    get renderInfo(): RenderInfo;
    get settingsHandler(): SettingsHandler;
    get sortBy(): SortBy;
    get storageType(): string;
    get upgradeHandler(): UpgradeHandler;
    instantiateGlobalSettingsCategory(categoryNbt: CompoundTag, saveNbt: Consumer<CompoundTag>): ISettingsCategory<any>;
    onContentsNbtUpdated(): void;
    refreshInventoryForInputOutput(): void;
    refreshInventoryForUpgradeProcessing(): void;
    removeOpenTabId(): void;
    set openTabId(openTabId: number);
    set sortBy(sortBy: SortBy);
    setColors(mainColor: number, accentColor: number): void;
    setColumnsTaken(columnsTaken: number, hasChanged: boolean): void;
    setContentsChangeHandler(contentsChangeHandler: Runnable): void;
    setPersistent(persistent: boolean): void;
    sort(): void;
  }


  class RandHelper {
    static getNRandomElements<T>(input: T[], numberOfElements: number): T[];
    static getRandomMinusOneToOne(rand: RandomSource): number;
    static getRandomWeightedElement<T>(random: RandomSource, weightedElements: WeightedElement<T>[]): Optional<T>;
  }


  class RecipeHelper {
    static addRecipeChangeListener(runnable: Runnable): void;
    static clearListeners(): void;
    static getCompactingResult(stack: ItemStack, shape: CompactingShape): CompactingResult;
    static getCompactingResult(stack: ItemStack, width: number, height: number): CompactingResult;
    static getCookingRecipe<T extends AbstractCookingRecipe>(stack: ItemStack, recipeType: RecipeType<T>): Optional<RecipeHolder<T>>;
    static getItemCompactingShapes(stack: ItemStack): Set<CompactingShape>;
    static getRecipesOfType<I extends RecipeInput, T extends Recipe<I>>(recipeType: RecipeType<T>, inventory: I): RecipeHolder<T>[];
    static getUncompactingResult(uncompactedItem: ItemStack): UncompactingResult;
    static onDataPackSync(event: OnDatapackSyncEvent): void;
    static onRecipesUpdated(event: RecipesUpdatedEvent): void;
    quickMoveStack(player: Player, index: number): ItemStack;
    static safeGetRecipeFor<I extends RecipeInput, T extends Recipe<I>>(recipeType: RecipeType<T>, inventory: I, recipeId: ResourceLocation): Optional<RecipeHolder<T>>;
    static safeGetRecipeFor<I extends RecipeInput, T extends Recipe<I>>(recipeType: RecipeType<T>, inventory: I, level: Level, recipeId: ResourceLocation): Optional<RecipeHolder<T>>;
    static safeGetRecipesFor<I extends CraftingInput, T extends Recipe<I>>(recipeType: RecipeType<T>, inventory: I, level: Level): RecipeHolder<T>[];
    static setLevel(l: Level): void;
    stillValid(playerIn: Player): boolean;
  }


  class RegistryHelper {
    static get registryAccess(): Optional<RegistryAccess>;
    static getBlockKey(block: Block): ResourceLocation;
    static getItemKey(item: Item): ResourceLocation;
    static getRegistryName<V>(registry: Registry<V>, registryEntry: V): Optional<ResourceLocation>;
  }


  class RotatedShapes {
    constructor(...shapes: VoxelShape[]);

    constructor(horizontal: boolean, ...shapes: VoxelShape[]);
    getRotatedShape(to: Direction): VoxelShape;
  }


  interface SimpleItemContent extends DataComponentHolder {}
  class SimpleItemContent extends DataComponentHolder {
    static readonly EMPTY: SimpleItemContent;
    static readonly CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    copy(): ItemStack;
    static copyOf(itemStack: ItemStack): SimpleItemContent;
    equals(obj: any): boolean;
    get components(): DataComponentMap;
    get count(): number;
    get item(): Item;
    hashCode(): number;
    is(tag: TagKey<Item>): boolean;
    is(item: Item): boolean;
    is(predicate: Predicate<Holder<Item>>): boolean;
    is(holder: Holder<Item>): boolean;
    is(holders: HolderSet<Item>): boolean;
    isEmpty(): boolean;
    isSameItem(other: ItemStack): boolean;
    isSameItemSameComponents(other: ItemStack): boolean;
    isSameItemSameComponents(content: SimpleItemContent): boolean;
    matches(other: ItemStack): boolean;
  }


  class SlotValueMap<T = any> {
    constructor();

    constructor(slot: number, value: T);
    add(slot: number, value: T): void;
    clear(): void;
    containsSlot(slot: number): boolean;
    containsSlotAndDoesNotMatch(slot: number, value: T): boolean;
    containsValue(value: T): boolean;
    getSlots(value: T): Set<number>;
    keySet(): Set<T>;
    static of<T>(): SlotValueMap<T>;
    static of<T>(slot: number, value: T): SlotValueMap<T>;
    static of<T>(slot1: number, value1: T, slot2: number, value2: T): SlotValueMap<T>;
    remove(slot: number): void;
  }


  class StreamCodecHelper {
    static readonly VEC3: StreamCodec;
    static readonly BLOCKSTATE: StreamCodec;
    static composite<B, C, T1, T2, T3, T4, T5, T6, T7>(pCodec1: StreamCodec<B, T1>, pGetter1: Function<C, T1>, pCodec2: StreamCodec<B, T2>, pGetter2: Function<C, T2>, pCodec3: StreamCodec<B, T3>, pGetter3: Function<C, T3>, pCodec4: StreamCodec<B, T4>, pGetter4: Function<C, T4>, pCodec5: StreamCodec<B, T5>, pGetter5: Function<C, T5>, pCodec6: StreamCodec<B, T6>, pGetter6: Function<C, T6>, pCodec7: StreamCodec<B, T7>, pGetter7: Function<C, T7>, pFactory: Function7<T1, T2, T3, T4, T5, T6, T7, C>, buffer: B, buffer: B, value: C): StreamCodec<B, C>;
    static composite<B, C, T1, T2, T3, T4, T5, T6, T7, T8>(pCodec1: StreamCodec<B, T1>, pGetter1: Function<C, T1>, pCodec2: StreamCodec<B, T2>, pGetter2: Function<C, T2>, pCodec3: StreamCodec<B, T3>, pGetter3: Function<C, T3>, pCodec4: StreamCodec<B, T4>, pGetter4: Function<C, T4>, pCodec5: StreamCodec<B, T5>, pGetter5: Function<C, T5>, pCodec6: StreamCodec<B, T6>, pGetter6: Function<C, T6>, pCodec7: StreamCodec<B, T7>, pGetter7: Function<C, T7>, pCodec8: StreamCodec<B, T8>, pGetter8: Function<C, T8>, pFactory: Function8<T1, T2, T3, T4, T5, T6, T7, T8, C>, buffer: B, buffer: B, value: C): StreamCodec<B, C>;
    static composite<B, C, T1, T2, T3, T4, T5, T6, T7, T8, T9>(pCodec1: StreamCodec<B, T1>, pGetter1: Function<C, T1>, pCodec2: StreamCodec<B, T2>, pGetter2: Function<C, T2>, pCodec3: StreamCodec<B, T3>, pGetter3: Function<C, T3>, pCodec4: StreamCodec<B, T4>, pGetter4: Function<C, T4>, pCodec5: StreamCodec<B, T5>, pGetter5: Function<C, T5>, pCodec6: StreamCodec<B, T6>, pGetter6: Function<C, T6>, pCodec7: StreamCodec<B, T7>, pGetter7: Function<C, T7>, pCodec8: StreamCodec<B, T8>, pGetter8: Function<C, T8>, pCodec9: StreamCodec<B, T9>, pGetter9: Function<C, T9>, pFactory: Function9<T1, T2, T3, T4, T5, T6, T7, T8, T9, C>, buffer: B, buffer: B, value: C): StreamCodec<B, C>;
    static ofCollection<B extends ByteBuf, E, V extends Collection<E>>(elementStreamCodec: StreamCodec<B, E>, instantiator: Supplier<V>, buf: B, buf: B, collection: V): StreamCodec<B, V>;
    static ofMap<B extends ByteBuf, K, V, M extends Map<K, V>>(keyStreamCodec: StreamCodec<B, K>, valueStreamCodec: StreamCodec<B, V>, instantiator: Supplier<M>, buf: B, buf: B, map: M): StreamCodec<B, M>;
    static ofNullable<B extends ByteBuf, V>(streamCodec: StreamCodec<B, V>, buf: B | null, buf: B, value: V): StreamCodec<B, V>;
    static ofTagkey<B extends FriendlyByteBuf, T>(registry: ResourceKey<Registry<T>>, buffer: B, value: TagKey<T>, buffer: B): StreamCodec<B, TagKey<T>>;
    static singleton<B extends ByteBuf, V>(instantiator: Supplier<V>, p_320376_: B, p_320158_: B, p_320396_: V): StreamCodec<B, V>;
  }


  class VoxelOutliner {
    static computeRenderableEdges(blocks: Collection<BlockPos>): Edge[];
    static computeShapeRenderableEdges(level: Level, positions: BlockPos[]): Edge[];
    static edgesFromAABB(aabb: AABB): Edge[];
    static linesFromVoxelShapeSimplified(shape: VoxelShape, pos: BlockPos): Edge[];
  }


  class WeightedElement<T = any> {
    constructor(weight: number, element: T);
    get element(): T;
    get weight(): number;
  }


  class WorldHelper {
    static addAdditionalInteractionCheck(check: BiPredicate<Player, BlockPos>): void;
    static getBlockEntitiesInRange(level: Level, origin: BlockPos, range: number): BlockEntity[];
    static getBlockEntitiesInRange<T>(level: Level, origin: BlockPos, range: number, beClass: Class<T>): T[];
    static getBlockEntity(level: BlockGetter, pos: BlockPos): Optional<BlockEntity>;
    static getBlockEntity<T>(level: BlockGetter, pos: BlockPos, teClass: Class<T>): Optional<T>;
    static getLoadedBlockEntity<T>(level: Level, pos: BlockPos, teClass: Class<T>): Optional<T>;
    static notifyBlockUpdate(tile: BlockEntity): void;
    static playerMayInteract(player: Player, pos: BlockPos): boolean;
  }


  class XpHelper {
    static experienceToLiquid(xp: number): number;
    static getExperienceForLevel(level: number): number;
    static getExperienceLimitOnLevel(level: number): number;
    static getLevelForExperience(experience: number): number;
    static getLevelsForExperience(experience: number): number;
    static getPlayerTotalExperience(player: Player): number;
    static liquidToExperience(liquid: number): number;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.util.RecipeHelper' {
  import { ItemStack } from 'net.minecraft.world.item';
  import { List } from 'java.util';
  import { Enum } from 'java.lang';

  class CompactingResult {
    static readonly EMPTY: CompactingResult;
    constructor(result: ItemStack, remainingItems: ItemStack[]);
    get remainingItems(): ItemStack[];
    get result(): ItemStack;
  }


  class UncompactingResult {
    static readonly EMPTY: UncompactingResult;
    constructor(result: ItemStack, compactUsingShape: CompactingShape);
    get compactUsingShape(): CompactingShape;
    get result(): ItemStack;
  }


  interface CompactingShape extends Enum<CompactingShape> {}
  class CompactingShape extends Enum<CompactingShape> {
    static readonly NONE: CompactingShape;
    static readonly THREE_BY_THREE: CompactingShape;
    static readonly TWO_BY_TWO: CompactingShape;
    static readonly THREE_BY_THREE_UNCRAFTABLE: CompactingShape;
    static readonly TWO_BY_TWO_UNCRAFTABLE: CompactingShape;
    get numberOfIngredients(): number;
    isUncraftable(): boolean;
    static valueOf(name: string): CompactingShape;
    static values(): CompactingShape[];
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.util.RotatedShapes' {
  import { VoxelShape } from 'net.minecraft.world.phys.shapes';

  class DoubleLineFunction {
    apply(var1: number, var3: number, var5: number, var7: number, var9: number, var11: number): VoxelShape;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedcore.util.VoxelOutliner' {
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Axis } from 'Direction';

  class Edge {
    constructor(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number);

    constructor(a: Vec3, b: Vec3);
    a(): Vec3;
    axis(): Axis;
    b(): Vec3;
    length(): number;
  }

}