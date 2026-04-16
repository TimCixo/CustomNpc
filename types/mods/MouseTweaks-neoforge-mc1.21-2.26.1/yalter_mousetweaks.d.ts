declare module 'yalter.mousetweaks.api' {
  import { List } from 'java.util';
  import { Slot, ClickType } from 'net.minecraft.world.inventory';

  class IMTModGuiContainer3Ex {
    MT_clickSlot(var1: Slot, var2: number, var3: ClickType): void;
    MT_disableRMBDraggingFunctionality(): boolean;
    MT_getSlotUnderMouse(var1: number, var3: number): Slot;
    MT_getSlots(): Slot[];
    MT_isCraftingOutput(var1: Slot): boolean;
    MT_isIgnored(var1: Slot): boolean;
    MT_isMouseTweaksDisabled(): boolean;
    MT_isWheelTweakDisabled(): boolean;
  }

}

declare module 'yalter.mousetweaks' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { Slot } from 'net.minecraft.world.inventory';
  import { Enum } from 'java.lang';

  class Config {
    rmbTweak: boolean;
    lmbTweakWithItem: boolean;
    lmbTweakWithoutItem: boolean;
    wheelTweak: boolean;
    wheelSearchOrder: WheelSearchOrder;
    wheelScrollDirection: WheelScrollDirection;
    scrollItemScaling: ScrollItemScaling;
    static debug: boolean;
    read(): void;
    save(): void;
  }


  interface ConfigScreen extends Screen {}
  class ConfigScreen extends Screen {
    constructor(previous: Screen);
    onClose(): void;
    removed(): void;
    render(guiGraphics: GuiGraphics, i: number, j: number, f: number): void;
  }


  class Constants {
    static readonly MOD_ID: string;
  }


  class IGuiScreenHandler {
    clickSlot(var1: Slot, var2: MouseButton, var3: boolean): void;
    disableRMBDraggingFunctionality(): boolean;
    get slots(): Slot[];
    getSlotUnderMouse(var1: number, var3: number): Slot;
    isCraftingOutput(var1: Slot): boolean;
    isIgnored(var1: Slot): boolean;
    isMouseTweaksDisabled(): boolean;
    isWheelTweakDisabled(): boolean;
  }


  class IMouseState {
    clear(): void;
    consumeScrollAmount(): number;
    isButtonPressed(var1: MouseButton): boolean;
    update(): void;
  }


  class Logger {
    static DebugLog(text: string): void;
    static Log(text: string): void;
  }


  class Main {
    static config: Config;
    static initialize(): void;
    static onMouseClicked(screen: Screen, x: number, y: number, button: MouseButton): boolean;
    static onMouseDrag(screen: Screen, x: number, y: number, button: MouseButton): boolean;
    static onMouseReleased(screen: Screen, x: number, y: number, button: MouseButton): boolean;
    static onMouseScrolled(screen: Screen, x: number, y: number, scrollDelta: number): boolean;
  }


  interface MouseButton extends Enum<MouseButton> {}
  class MouseButton extends Enum<MouseButton> {
    static readonly LEFT: MouseButton;
    static readonly RIGHT: MouseButton;
    static fromEventButton(eventButton: number): MouseButton;
    get value(): number;
    static valueOf(name: string): MouseButton;
    static values(): MouseButton[];
  }


  interface ScrollHandling extends Enum<ScrollHandling> {}
  class ScrollHandling extends Enum<ScrollHandling> {
    static readonly SIMPLE: ScrollHandling;
    static readonly EVENT_BASED: ScrollHandling;
    static fromId(id: number): ScrollHandling;
    get value(): number;
    static valueOf(name: string): ScrollHandling;
    static values(): ScrollHandling[];
  }


  interface ScrollItemScaling extends Enum<ScrollItemScaling> {}
  class ScrollItemScaling extends Enum<ScrollItemScaling> {
    static readonly PROPORTIONAL: ScrollItemScaling;
    static readonly ALWAYS_ONE: ScrollItemScaling;
    static fromId(id: number): ScrollItemScaling;
    get value(): number;
    scale(scrollDelta: number): number;
    static valueOf(name: string): ScrollItemScaling;
    static values(): ScrollItemScaling[];
  }


  interface WheelScrollDirection extends Enum<WheelScrollDirection> {}
  class WheelScrollDirection extends Enum<WheelScrollDirection> {
    static readonly NORMAL: WheelScrollDirection;
    static readonly INVERTED: WheelScrollDirection;
    static readonly INVENTORY_POSITION_AWARE: WheelScrollDirection;
    static readonly INVENTORY_POSITION_AWARE_INVERTED: WheelScrollDirection;
    static fromId(id: number): WheelScrollDirection;
    get value(): number;
    isInverted(): boolean;
    isPositionAware(): boolean;
    static valueOf(name: string): WheelScrollDirection;
    static values(): WheelScrollDirection[];
  }


  interface WheelSearchOrder extends Enum<WheelSearchOrder> {}
  class WheelSearchOrder extends Enum<WheelSearchOrder> {
    static readonly FIRST_TO_LAST: WheelSearchOrder;
    static readonly LAST_TO_FIRST: WheelSearchOrder;
    static fromId(id: number): WheelSearchOrder;
    get value(): number;
    static valueOf(name: string): WheelSearchOrder;
    static values(): WheelSearchOrder[];
  }

}

declare module 'yalter.mousetweaks.handlers' {
  import { CreativeModeInventoryScreen, AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { Slot } from 'net.minecraft.world.inventory';
  import { IGuiScreenHandler, MouseButton } from 'yalter.mousetweaks';
  import { List } from 'java.util';
  import { IMTModGuiContainer3Ex } from 'yalter.mousetweaks.api';

  interface GuiContainerCreativeHandler extends GuiContainerHandler {}
  class GuiContainerCreativeHandler extends GuiContainerHandler {
    constructor(guiContainerCreative: CreativeModeInventoryScreen);
    isIgnored(slot: Slot): boolean;
  }


  interface GuiContainerHandler extends IGuiScreenHandler {}
  class GuiContainerHandler extends IGuiScreenHandler {
    constructor(screen: AbstractContainerScreen);
    clickSlot(slot: Slot, mouseButton: MouseButton, shiftPressed: boolean): void;
    disableRMBDraggingFunctionality(): boolean;
    get slots(): Slot[];
    getSlotUnderMouse(mouseX: number, mouseY: number): Slot;
    isCraftingOutput(slot: Slot): boolean;
    isIgnored(slot: Slot): boolean;
    isMouseTweaksDisabled(): boolean;
    isWheelTweakDisabled(): boolean;
  }


  interface IMTModGuiContainer3ExHandler extends IGuiScreenHandler {}
  class IMTModGuiContainer3ExHandler extends IGuiScreenHandler {
    constructor(modGuiContainer: IMTModGuiContainer3Ex);
    clickSlot(slot: Slot, mouseButton: MouseButton, shiftPressed: boolean): void;
    disableRMBDraggingFunctionality(): boolean;
    get slots(): Slot[];
    getSlotUnderMouse(mouseX: number, mouseY: number): Slot;
    isCraftingOutput(slot: Slot): boolean;
    isIgnored(slot: Slot): boolean;
    isMouseTweaksDisabled(): boolean;
    isWheelTweakDisabled(): boolean;
  }

}

declare module 'yalter.mousetweaks.mixin' {
  import { Slot, ClickType } from 'net.minecraft.world.inventory';

  class AbstractContainerScreenAccessor {
    mousetweaks$getIsQuickCrafting(): boolean;
    mousetweaks$getQuickCraftingButton(): number;
    mousetweaks$invokeFindSlot(var1: number, var3: number): Slot;
    mousetweaks$invokeSlotClicked(var1: Slot, var2: number, var3: number, var4: ClickType): void;
    mousetweaks$setIsQuickCrafting(var1: boolean): void;
    mousetweaks$setSkipNextRelease(var1: boolean): void;
  }

}

declare module 'yalter.mousetweaks.neoforge' {
  import { IConfigScreenFactory } from 'net.neoforged.neoforge.client.gui';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ModContainer } from 'net.neoforged.fml';
  import { Pre } from 'ScreenEvent.MouseButtonPressed';
  import { Pre as screenevent_mousebuttonreleased_Pre } from 'ScreenEvent.MouseButtonReleased';
  import { Post } from 'ScreenEvent.MouseScrolled';
  import { Pre as screenevent_mousedragged_Pre } from 'ScreenEvent.MouseDragged';

  interface ClientHelper extends IConfigScreenFactory {}
  class ClientHelper extends IConfigScreenFactory {
    createScreen(container: ModContainer, modListScreen: Screen): Screen;
  }


  class MouseTweaksNeo {
    constructor();
    onGuiMouseClickedPre(event: Pre): void;
    onGuiMouseDragPre(event: screenevent_mousedragged_Pre): void;
    onGuiMouseReleasedPre(event: screenevent_mousebuttonreleased_Pre): void;
    onGuiMouseScrollPost(event: Post): void;
  }

}