declare module 'com.blamejared.controlling.api' {
  import { Enum } from 'java.lang';
  import { Predicate } from 'java.util.function';
  import { Entry } from 'KeyBindsList';
  import { List } from 'java.util';
  import { IKeyEntry } from 'com.blamejared.controlling.api.entries';
  import { Component } from 'net.minecraft.network.chat';

  interface DisplayMode extends Enum<DisplayMode> {}
  class DisplayMode extends Enum<DisplayMode> {
    static readonly ALL: DisplayMode;
    static readonly NONE: DisplayMode;
    static readonly CONFLICTING: DisplayMode;
    get predicate(): Predicate<Entry>;
    static valueOf(name: string): DisplayMode;
    static values(): DisplayMode[];
  }


  class ISort {
    sort(var1: IKeyEntry[]): void;
  }


  interface SortOrder extends Enum<SortOrder> {}
  class SortOrder extends Enum<SortOrder> {
    static readonly NONE: SortOrder;
    static readonly AZ: SortOrder;
    static readonly ZA: SortOrder;
    static readonly KEY_AZ: SortOrder;
    static readonly KEY_ZA: SortOrder;
    cycle(): SortOrder;
    get display(): Component;
    sort(list: Entry[]): void;
    static valueOf(name: string): SortOrder;
    static values(): SortOrder[];
  }

}

declare module 'com.blamejared.controlling.api.entries' {
  import { Component } from 'net.minecraft.network.chat';
  import { Key } from 'InputConstants';
  import { KeyMapping } from 'net.minecraft.client';
  import { Button } from 'net.minecraft.client.gui.components';
  import { List } from 'java.util';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class ICategoryEntry {
  }


  class IInputEntry {
    get input(): Key;
  }


  class IKeyEntry {
    categoryName(): Component;
    children(): GuiEventListener[];
    get btnChangeKeyBinding(): Button;
    get btnResetKeyBinding(): Button;
    get key(): KeyMapping;
    get keyDesc(): Component;
    mouseClicked(var1: number, var3: number, var5: number): boolean;
    mouseReleased(var1: number, var3: number, var5: number): boolean;
    render(var1: GuiGraphics, var2: number, var3: number, var4: number, var5: number, var6: number, var7: number, var8: number, var9: boolean, var10: number): void;
  }

}

declare module 'com.blamejared.controlling.api.events' {
  import { KeyMapping, Options } from 'net.minecraft.client';
  import { Key } from 'InputConstants';
  import { List } from 'java.util';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { IKeyEntry } from 'com.blamejared.controlling.api.entries';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Event } from 'net.neoforged.bus.api';

  class IHasConflictingModifierEvent {
    otherMapping(): KeyMapping;
    thisMapping(): KeyMapping;
  }


  class IIsKeyCodeModifierEvent {
    key(): Key;
  }


  class IKeyEntryListenersEvent {
    get entry(): IKeyEntry;
    get listeners(): GuiEventListener[];
  }


  class IKeyEntryMouseClickedEvent {
    get buttonId(): number;
    get entry(): IKeyEntry;
    get mouseX(): number;
    get mouseY(): number;
    isHandled(): boolean;
    setHandled(var1: boolean): void;
  }


  class IKeyEntryMouseReleasedEvent {
    get buttonId(): number;
    get entry(): IKeyEntry;
    get mouseX(): number;
    get mouseY(): number;
    isHandled(): boolean;
    setHandled(var1: boolean): void;
  }


  class IKeyEntryRenderEvent {
    get entry(): IKeyEntry;
    get guiGraphics(): GuiGraphics;
    get mouseX(): number;
    get mouseY(): number;
    get partialTicks(): number;
    get rowLeft(): number;
    get rowWidth(): number;
    get slotIndex(): number;
    get x(): number;
    get y(): number;
    isHovered(): boolean;
  }


  class ISetKeyEvent {
    key(): Key;
    mapping(): KeyMapping;
    options(): Options;
  }


  class ISetToDefaultEvent {
    mapping(): KeyMapping;
    options(): Options;
  }


  interface KeyEntryListenersEvent extends IKeyEntryListenersEvent, Event {}
  class KeyEntryListenersEvent extends IKeyEntryListenersEvent {
    constructor(entry: IKeyEntry);
    get entry(): IKeyEntry;
    get listeners(): GuiEventListener[];
  }


  interface KeyEntryMouseClickedEvent extends IKeyEntryMouseClickedEvent, Event {}
  class KeyEntryMouseClickedEvent extends IKeyEntryMouseClickedEvent {
    constructor(entry: IKeyEntry, mouseX: number, mouseY: number, buttonId: number);
    get buttonId(): number;
    get entry(): IKeyEntry;
    get mouseX(): number;
    get mouseY(): number;
    isHandled(): boolean;
    setHandled(handled: boolean): void;
  }


  interface KeyEntryMouseReleasedEvent extends IKeyEntryMouseReleasedEvent, Event {}
  class KeyEntryMouseReleasedEvent extends IKeyEntryMouseReleasedEvent {
    constructor(entry: IKeyEntry, mouseX: number, mouseY: number, buttonId: number);
    get buttonId(): number;
    get entry(): IKeyEntry;
    get mouseX(): number;
    get mouseY(): number;
    isHandled(): boolean;
    setHandled(handled: boolean): void;
  }


  interface KeyEntryRenderEvent extends IKeyEntryRenderEvent, Event {}
  class KeyEntryRenderEvent extends IKeyEntryRenderEvent {
    constructor(entry: IKeyEntry, guiGraphics: GuiGraphics, slotIndex: number, y: number, x: number, rowLeft: number, rowWidth: number, mouseX: number, mouseY: number, hovered: boolean, partialTicks: number);
    get entry(): IKeyEntry;
    get guiGraphics(): GuiGraphics;
    get mouseX(): number;
    get mouseY(): number;
    get partialTicks(): number;
    get rowLeft(): number;
    get rowWidth(): number;
    get slotIndex(): number;
    get x(): number;
    get y(): number;
    isHovered(): boolean;
  }

}

declare module 'com.blamejared.controlling.client' {
  import { KeyBindsList, KeyBindsScreen } from 'net.minecraft.client.gui.screens.options.controls';
  import { List } from 'java.util';
  import { Minecraft, Options } from 'net.minecraft.client';
  import { Entry } from 'KeyBindsList';
  import { Component } from 'net.minecraft.network.chat';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Button } from 'net.minecraft.client.gui.components';

  interface CustomList extends KeyBindsList {}
  class CustomList extends KeyBindsList {
    allEntries: List;
    constructor(controls: KeyBindsScreen, mcIn: Minecraft);
    get allEntries(): Entry[];
  }


  class DisplayableBoolean {
    constructor(initialState: boolean, whenTrue: Component, whenFalse: Component);
    currentDisplay(): Component;
    state(): boolean;
    state(state: boolean): void;
    toggle(): boolean;
    whenFalse(): Component;
    whenTrue(): Component;
  }


  interface FreeKeysList extends CustomList {}
  class FreeKeysList extends CustomList {
    constructor(controls: KeyBindsScreen, mcIn: Minecraft);
    get bottom(): number;
    get right(): number;
    recalculate(): void;
  }


  interface NewKeyBindsList extends CustomList {}
  class NewKeyBindsList extends CustomList {
    constructor(controls: KeyBindsScreen, mcIn: Minecraft);
    get bottom(): number;
  }


  interface NewKeyBindsScreen extends KeyBindsScreen {}
  class NewKeyBindsScreen extends KeyBindsScreen {
    constructor(screen: Screen, settings: Options);
    filterKeys(): void;
    filterKeys(lastSearch: string): void;
    get keyBindsList(): KeyBindsList;
    keyPressed(key: number, scancode: number, mods: number): boolean;
    mouseClicked(xpos: number, ypos: number, buttonId: number): boolean;
    mouseScrolled(xpos: number, ypos: number, xDelta: number, yDelta: number): boolean;
    render(guiGraphics: GuiGraphics, mxPos: number, myPos: number, partialTicks: number): void;
    resetButton(): Button;
    resetButton(button: Button): void;
  }

}

declare module 'com.blamejared.controlling.client.FreeKeysList' {
  import { Entry } from 'KeyBindsList';
  import { List } from 'java.util';
  import { NarratableEntry } from 'net.minecraft.client.gui.narration';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { IInputEntry } from 'com.blamejared.controlling.api.entries';
  import { Key } from 'InputConstants';

  interface HeaderEntry extends Entry {}
  class HeaderEntry extends Entry {
    constructor(text: string);
    children(): GuiEventListener[];
    narratables(): NarratableEntry[];
    render(guiGraphics: GuiGraphics, slotIndex: number, y: number, x: number, width: number, height: number, mouseX: number, mouseY: number, hovered: boolean, partialTicks: number): void;
  }


  interface InputEntry extends IInputEntry, Entry {}
  class InputEntry extends IInputEntry {
    constructor(input: Key);
    children(): GuiEventListener[];
    get input(): Key;
    narratables(): NarratableEntry[];
    render(guiGraphics: GuiGraphics, slotIndex: number, y: number, x: number, width: number, height: number, mouseX: number, mouseY: number, hovered: boolean, partialTicks: number): void;
  }

}

declare module 'com.blamejared.controlling.client.NewKeyBindsList' {
  import { Entry } from 'KeyBindsList';
  import { ICategoryEntry, IKeyEntry } from 'com.blamejared.controlling.api.entries';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics, ComponentPath } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { NarratableEntry, NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { NarrationPriority } from 'NarratableEntry';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { FocusNavigationEvent } from 'net.minecraft.client.gui.navigation';
  import { KeyMapping } from 'net.minecraft.client';
  import { Button } from 'net.minecraft.client.gui.components';

  interface CategoryEntry extends ICategoryEntry, Entry {}
  class CategoryEntry extends ICategoryEntry {
    constructor(name: Component);
    children(): GuiEventListener[];
    narratables(): NarratableEntry[];
    narrationPriority(): NarrationPriority;
    nextFocusPath($$0: FocusNavigationEvent): ComponentPath;
    render(guiGraphics: GuiGraphics, slotIndex: number, y: number, x: number, rowLeft: number, rowWidth: number, mouseX: number, mouseY: number, hovered: boolean, partialTicks: number): void;
    updateNarration(neo: NarrationElementOutput): void;
  }


  interface KeyEntry extends IKeyEntry, Entry {}
  class KeyEntry extends IKeyEntry {
    constructor(key: KeyMapping, keyDesc: Component);
    categoryName(): Component;
    children(): GuiEventListener[];
    get btnChangeKeyBinding(): Button;
    get btnResetKeyBinding(): Button;
    get key(): KeyMapping;
    get keyDesc(): Component;
    mouseClicked(mouseX: number, mouseY: number, buttonId: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, buttonId: number): boolean;
    narratables(): NarratableEntry[];
    render(guiGraphics: GuiGraphics, slotIndex: number, y: number, x: number, rowLeft: number, rowWidth: number, mouseX: number, mouseY: number, hovered: boolean, partialTicks: number): void;
  }

}

declare module 'com.blamejared.controlling' {
  import { IEventBus } from 'net.neoforged.bus.api';
  import { Logger } from 'org.apache.logging.log4j';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { SearchableType } from 'com.blamejared.searchables.api';

  class Controlling {
    constructor(modEventBus: IEventBus);
  }


  class ControllingCommon {
    static readonly LOG: Logger;
  }


  class ControllingConstants {
    static readonly COMPONENT_CONTROLS_RESET: MutableComponent;
    static readonly COMPONENT_CONTROLS_RESET_ALL: MutableComponent;
    static readonly COMPONENT_OPTIONS_CONFIRM_RESET: MutableComponent;
    static readonly COMPONENT_OPTIONS_SHOW_NONE: MutableComponent;
    static readonly COMPONENT_OPTIONS_SHOW_ALL: MutableComponent;
    static readonly COMPONENT_OPTIONS_SHOW_CONFLICTS: MutableComponent;
    static readonly COMPONENT_OPTIONS_SORT: MutableComponent;
    static readonly COMPONENT_OPTIONS_TOGGLE_FREE: MutableComponent;
    static readonly COMPONENT_OPTIONS_AVAILABLE_KEYS: MutableComponent;
    static readonly SEARCHABLE_KEYBINDINGS: SearchableType;
  }

}

declare module 'com.blamejared.controlling.events' {
  import { Opening } from 'ScreenEvent';

  class ClientEventHandler {
    openGui(event: Opening): void;
  }

}

declare module 'com.blamejared.controlling.mixin' {
  import { Map } from 'java.util';
  import { Key } from 'InputConstants';
  import { KeyBindsList } from 'net.minecraft.client.gui.screens.options.controls';
  import { Button } from 'net.minecraft.client.gui.components';
  import { Screen } from 'net.minecraft.client.gui.screens';

  class AccessInputConstantsKey {
    static controlling$getNAME_MAP(): Map<string, Key>;
  }


  class AccessKeyBindsScreen {
    controlling$getKeyBindsList(): KeyBindsList;
    controlling$getResetButton(): Button;
    controlling$setKeyBindsList(var1: KeyBindsList): void;
    controlling$setResetButton(var1: Button): void;
  }


  class AccessKeyBindsScreenNeoForge {
    get lastPressedKey(): Key;
    get lastPressedModifier(): Key;
    isIsLastKeyHeldDown(): boolean;
    isIsLastModifierHeldDown(): boolean;
    set lastPressedKey(var1: Key);
    set lastPressedModifier(var1: Key);
    setIsLastKeyHeldDown(var1: boolean): void;
    setIsLastModifierHeldDown(var1: boolean): void;
  }


  class AccessKeyMapping {
    controlling$getKey(): Key;
  }


  class AccessOptionsSubScreen {
    controlling$getLastScreen(): Screen;
  }

}

declare module 'com.blamejared.controlling.platform' {
  import { Either } from 'com.mojang.datafixers.util';
  import { IKeyEntryListenersEvent, IKeyEntryMouseClickedEvent, IKeyEntryMouseReleasedEvent, IKeyEntryRenderEvent } from 'com.blamejared.controlling.api.events';
  import { List } from 'java.util';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { IKeyEntry } from 'com.blamejared.controlling.api.entries';
  import { Boolean, Class } from 'java.lang';
  import { Unit } from 'net.minecraft.util';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { KeyMapping, Options } from 'net.minecraft.client';
  import { Key } from 'InputConstants';
  import { Component } from 'net.minecraft.network.chat';
  import { NewKeyBindsScreen } from 'com.blamejared.controlling.client';

  class IEventHelper {
    fireKeyEntryListenersEvent(var1: IKeyEntry): Either<IKeyEntryListenersEvent, GuiEventListener[]>;
    fireKeyEntryMouseClickedEvent(var1: IKeyEntry, var2: number, var4: number, var6: number): Either<IKeyEntryMouseClickedEvent, boolean>;
    fireKeyEntryMouseReleasedEvent(var1: IKeyEntry, var2: number, var4: number, var6: number): Either<IKeyEntryMouseReleasedEvent, boolean>;
    fireKeyEntryRenderEvent(var1: IKeyEntry, var2: GuiGraphics, var3: number, var4: number, var5: number, var6: number, var7: number, var8: number, var9: number, var10: boolean, var11: number): Either<IKeyEntryRenderEvent, Unit>;
  }


  class IPlatformHelper {
    getKeyName(mapping: KeyMapping): Component;
    handleKeyPress(screen: NewKeyBindsScreen, options: Options, key: number, scancode: number, mods: number): void;
    hasConflictingModifier(keybinding: KeyMapping, other: KeyMapping): boolean;
    isKeyCodeModifier(key: Key): boolean;
    setKey(options: Options, keybinding: KeyMapping, key: Key): void;
    setToDefault(options: Options, keybinding: KeyMapping): void;
  }


  interface NeoForgeEventHandler extends IEventHelper {}
  class NeoForgeEventHandler extends IEventHelper {
    fireKeyEntryListenersEvent(entry: IKeyEntry): Either<IKeyEntryListenersEvent, GuiEventListener[]>;
    fireKeyEntryMouseClickedEvent(entry: IKeyEntry, mouseX: number, mouseY: number, buttonId: number): Either<IKeyEntryMouseClickedEvent, boolean>;
    fireKeyEntryMouseReleasedEvent(entry: IKeyEntry, mouseX: number, mouseY: number, buttonId: number): Either<IKeyEntryMouseReleasedEvent, boolean>;
    fireKeyEntryRenderEvent(entry: IKeyEntry, guiGraphics: GuiGraphics, slotIndex: number, y: number, x: number, rowLeft: number, rowWidth: number, mouseX: number, mouseY: number, hovered: boolean, partialTicks: number): Either<IKeyEntryRenderEvent, Unit>;
  }


  interface NeoForgePlatformHelper extends IPlatformHelper {}
  class NeoForgePlatformHelper extends IPlatformHelper {
    getKeyName(mapping: KeyMapping): Component;
    handleKeyPress(screen: NewKeyBindsScreen, options: Options, key: number, scancode: number, mods: number): void;
    hasConflictingModifier(keybinding: KeyMapping, other: KeyMapping): boolean;
    isKeyCodeModifier(key: Key): boolean;
    setKey(options: Options, keybinding: KeyMapping, key: Key): void;
    setToDefault(options: Options, keybinding: KeyMapping): void;
  }


  class Services {
    static readonly EVENT: IEventHelper;
    static readonly PLATFORM: IPlatformHelper;
    static load<T>(clazz: Class<T>): T;
  }

}