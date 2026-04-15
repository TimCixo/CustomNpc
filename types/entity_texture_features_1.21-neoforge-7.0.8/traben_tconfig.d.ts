declare module 'traben.tconfig.gui.entries' {
  import { TConfigEntryForList } from 'traben.tconfig.gui.TConfigEntryListWidget';
  import { Component } from 'net.minecraft.network.chat';
  import { Tooltip, AbstractWidget } from 'net.minecraft.client.gui.components';
  import { Boolean, Runnable, Class, Integer } from 'java.lang';
  import { Supplier, Consumer } from 'java.util.function';
  import { Type } from 'traben.tconfig.gui.entries.TConfigEntryBoolean';
  import { Align, Renderable } from 'traben.tconfig.gui.TConfigScreenList';
  import { Object2ObjectLinkedOpenHashMap } from 'it.unimi.dsi.fastutil.objects';
  import { TConfigScreenList } from 'traben.tconfig.gui';
  import { Collection, List } from 'java.util';
  import { OnPress } from 'Button';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { TextAlignment } from 'traben.tconfig.gui.entries.TConfigEntryText';

  interface TConfigEntry extends TConfigEntryForList {}
  class TConfigEntry extends TConfigEntryForList {
    static readonly CHANGED_COLOR: string;
    constructor(text: string, tooltip: string);

    constructor(text: string);
    get text(): Component;
    get tooltip(): Tooltip;
    setEnabled(enabled: boolean): TConfigEntry;
  }


  interface TConfigEntryBoolean extends TConfigEntryValue<boolean> {}
  class TConfigEntryBoolean extends TConfigEntryValue<boolean> {
    constructor(translationKey: string, tooltip: string, getter: Supplier<boolean>, setter: Consumer<boolean>, defaultValue: boolean);

    constructor(translationKey: string, getter: Supplier<boolean>, setter: Consumer<boolean>, defaultValue: boolean);
    getWidget(x: number, y: number, width: number, height: number): AbstractWidget;
    setType(type: Type): TConfigEntryBoolean;
  }


  interface TConfigEntryCategory extends TConfigEntry {}
  class TConfigEntryCategory extends TConfigEntry {
    constructor(text: string, tooltip: string);

    constructor(text: string);
    add(...option: TConfigEntry[]): TConfigEntryCategory;
    add(option: TConfigEntry): TConfigEntryCategory;
    addAll(option: Collection<TConfigEntry>): TConfigEntryCategory;
    get options(): Object2ObjectLinkedOpenHashMap<string, TConfigEntry>;
    get screen(): TConfigScreenList;
    getWidget(x: number, y: number, width: number, height: number): AbstractWidget;
    resetValuesToInitial(): void;
    saveValuesToConfig(): boolean;
    setAlign(align: Align): void;
    setEmptyTooltip(emptyTooltipKey: string): TConfigEntryCategory;
    setRenderFeature(renderFeature: Renderable): void;
    setValuesToDefault(): void;
    setWidgetBackgroundToFullWidth(): void;
  }


  interface TConfigEntryCustomButton extends TConfigEntry {}
  class TConfigEntryCustomButton extends TConfigEntry {
    constructor(text: string, tooltip: string, action: OnPress);

    constructor(text: string, button: OnPress);
    getWidget(x: number, y: number, width: number, height: number): AbstractWidget;
  }


  interface TConfigEntryCustomScreenOpener extends TConfigEntry {}
  class TConfigEntryCustomScreenOpener extends TConfigEntry {
    constructor(text: string, tooltip: string, screenSupplier: Supplier<Screen>, savedSupplier: Supplier<boolean>, setValuesDefault: Runnable, resetValuesToInitial: Runnable, screenIsSingleton: boolean);

    constructor(text: string, screenSupplier: Supplier<Screen>, savedSupplier: Supplier<boolean>, setValuesDefault: Runnable, resetValuesToInitial: Runnable, screenIsSingleton: boolean);

    constructor(text: string, tooltip: string, screenSupplier: Supplier<Screen>, screenIsSingleton: boolean);

    constructor(text: string, screenSupplier: Supplier<Screen>, screenIsSingleton: boolean);
    getWidget(x: number, y: number, width: number, height: number): AbstractWidget;
  }


  interface TConfigEntryEnumButton<E extends Enum<E> = any> extends TConfigEntryNullSafe<E> {}
  class TConfigEntryEnumButton<E extends Enum<E> = any> extends TConfigEntryNullSafe<E> {
    constructor(text: string, tooltip: string, getter: Supplier<E>, setter: Consumer<E>, defaultValue: E, enumClass: Class<E>);

    constructor(text: string, tooltip: string, getter: Supplier<E>, setter: Consumer<E>, defaultValue: E);

    constructor(text: string, getter: Supplier<E>, setter: Consumer<E>, defaultValue: E, enumClass: Class<E>);

    constructor(text: string, getter: Supplier<E>, setter: Consumer<E>, defaultValue: E);
    allowNullValue(): TConfigEntryNullSafe<E>;
    getWidget(x: number, y: number, width: number, height: number): AbstractWidget;
  }


  interface TConfigEntryEnumSlider<E extends Enum<E> = any> extends TConfigEntryNullSafe<E> {}
  class TConfigEntryEnumSlider<E extends Enum<E> = any> extends TConfigEntryNullSafe<E> {
    constructor(text: string, tooltip: string, getter: Supplier<E>, setter: Consumer<E>, defaultValue: E, enumClass: Class<E>);

    constructor(text: string, tooltip: string, getter: Supplier<E>, setter: Consumer<E>, defaultValue: E);

    constructor(text: string, getter: Supplier<E>, setter: Consumer<E>, defaultValue: E);

    constructor(text: string, getter: Supplier<E>, setter: Consumer<E>, defaultValue: E, enumClass: Class<E>);
    allowNullValue(): TConfigEntryNullSafe<E>;
    getWidget(x: number, y: number, width: number, height: number): AbstractWidget;
  }


  interface TConfigEntryInt extends TConfigEntryValue<number> {}
  class TConfigEntryInt extends TConfigEntryValue<number> {
    constructor(text: string, tooltip: string, getter: Supplier<number>, setter: Consumer<number>, defaultValue: number, min: number, max: number, isMinOff: boolean, isMaxOff: boolean);

    constructor(text: string, tooltip: string, getter: Supplier<number>, setter: Consumer<number>, defaultValue: number, min: number, max: number);

    constructor(text: string, getter: Supplier<number>, setter: Consumer<number>, defaultValue: number, min: number, max: number, isMinOff: boolean, isMaxOff: boolean);

    constructor(text: string, getter: Supplier<number>, setter: Consumer<number>, defaultValue: number, min: number, max: number);
    dontModifyOffMaxValues(): TConfigEntryInt;
    getWidget(x: number, y: number, width: number, height: number): AbstractWidget;
  }


  interface TConfigEntryNullSafe<E extends Enum<E> = any> extends TConfigEntryValue<E> {}
  class TConfigEntryNullSafe<E extends Enum<E> = any> extends TConfigEntryValue<E> {
    constructor(translationKey: string, tooltip: string, getter: Supplier<E>, setter: Consumer<E>, defaultValue: E);
    allowNullValue(): TConfigEntryNullSafe<E>;
  }


  interface TConfigEntryText extends TConfigEntry {}
  class TConfigEntryText extends TConfigEntry {
    constructor(text: string, alignment: TextAlignment);

    constructor(text: string);
    static fromLongOrMultilineTranslation(translationKey: string, width: number): Collection<TConfigEntry>;
    static fromLongOrMultilineTranslation(translationKey: string, width: number, alignment: TextAlignment): TConfigEntry[];
    getWidget(x: number, y: number, width: number, height: number): AbstractWidget;
  }


  interface TConfigEntryValue<V = any> extends TConfigEntry {}
  class TConfigEntryValue<V = any> extends TConfigEntry {
    saveValuesToConfig(): boolean;
  }

}

declare module 'traben.tconfig.gui.entries.TConfigEntry' {
  import { TConfigEntry } from 'traben.tconfig.gui.entries';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';

  interface Empty extends TConfigEntry {}
  class Empty extends TConfigEntry {
    constructor();
    getWidget(x: number, y: number, width: number, height: number): AbstractWidget;
  }

}

declare module 'traben.tconfig.gui.entries.TConfigEntryBoolean' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Type extends Enum<Type> {}
  class Type extends Enum<Type> {
    static readonly ON_OFF: Type;
    static readonly YES_NO: Type;
    get(value: boolean): string;
    static valueOf(name: string): Type;
    static values(): Type[];
  }

}

declare module 'traben.tconfig.gui.entries.TConfigEntryCategory' {
  import { TConfigEntryCategory } from 'traben.tconfig.gui.entries';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';

  interface Empty extends TConfigEntryCategory {}
  class Empty extends TConfigEntryCategory {
    constructor();
    getWidget(x: number, y: number, width: number, height: number): AbstractWidget;
  }

}

declare module 'traben.tconfig.gui.entries.TConfigEntryEnumButton' {
  import { Button, Tooltip } from 'net.minecraft.client.gui.components';
  import { Component } from 'net.minecraft.network.chat';
  import { Class } from 'java.lang';

  interface EnumButtonWidget<T extends Enum<any> = any> extends Button {}
  class EnumButtonWidget<T extends Enum<any> = any> extends Button {
    constructor(text: Component, initialValue: T, tooltip: Tooltip, enumClass: Class<T>);
    get index(): number;
    onPress(): void;
  }

}

declare module 'traben.tconfig.gui.entries.TConfigEntryEnumSlider' {
  import { AbstractSliderButton, Tooltip } from 'net.minecraft.client.gui.components';
  import { Component } from 'net.minecraft.network.chat';
  import { Class } from 'java.lang';

  interface EnumSliderWidget<T extends Enum<any> = any> extends AbstractSliderButton {}
  class EnumSliderWidget<T extends Enum<any> = any> extends AbstractSliderButton {
    constructor(text: Component, initialValue: T, tooltip: Tooltip, enumClass: Class<T>);
  }

}

declare module 'traben.tconfig.gui.entries.TConfigEntryInt' {
  import { AbstractSliderButton, Tooltip } from 'net.minecraft.client.gui.components';
  import { Component } from 'net.minecraft.network.chat';

  interface IntSliderWidget extends AbstractSliderButton {}
  class IntSliderWidget extends AbstractSliderButton {
    constructor(text: Component, initialValue: number, tooltip: Tooltip, min: number, max: number, isMinOff: boolean, isMaxOff: boolean);
    get valueRoundedToIntBetweenMinMax(): number;
  }

}

declare module 'traben.tconfig.gui.entries.TConfigEntryText' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { TConfigEntryText } from 'traben.tconfig.gui.entries';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface TextAlignment extends Enum<TextAlignment> {}
  class TextAlignment extends Enum<TextAlignment> {
    static readonly LEFT: TextAlignment;
    static readonly CENTER: TextAlignment;
    static readonly RIGHT: TextAlignment;
    static valueOf(name: string): TextAlignment;
    static values(): TextAlignment[];
  }


  interface TwoLines extends TConfigEntryText {}
  class TwoLines extends TConfigEntryText {
    constructor(text1: string, text2: string);

    constructor(text1: string, text2: string, alignment: TextAlignment);
    getWidget(x: number, y: number, width: number, height: number): AbstractWidget;
    render(context: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, hovered: boolean, tickDelta: number): void;
  }

}

declare module 'traben.tconfig.gui' {
  import { AbstractSelectionList } from 'net.minecraft.client.gui.components';
  import { TConfigEntryForList } from 'traben.tconfig.gui.TConfigEntryListWidget';
  import { TConfigEntry } from 'traben.tconfig.gui.entries';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Runnable } from 'java.lang';
  import { Align, Renderable } from 'traben.tconfig.gui.TConfigScreenList';
  import { Set, List } from 'java.util';
  import { TConfigHandler } from 'traben.tconfig';

  interface TConfigEntryListWidget extends AbstractSelectionList<TConfigEntryForList> {}
  class TConfigEntryListWidget extends AbstractSelectionList<TConfigEntryForList> {
    constructor(width: number, height: number, y: number, x: number, itemHeight: number, ...entries: TConfigEntry[]);
    get rowWidth(): number;
    setSelected(entry: TConfigEntryForList): void;
    setWidgetBackgroundToFullWidth(): void;
  }


  interface TConfigScreen extends Screen {}
  class TConfigScreen extends Screen {
    onClose(): void;
    render(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    shouldCloseOnEsc(): boolean;
  }


  interface TConfigScreenList extends TConfigScreen {}
  class TConfigScreenList extends TConfigScreen {
    constructor(title: string, parent: Screen, options: TConfigEntry[], resetValuesToDefault: Runnable, undoChanges: Runnable, align: Align);

    constructor(title: string, parent: Screen, options: TConfigEntry[], resetValuesToDefault: Runnable, undoChanges: Runnable);
    render(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    setRenderFeature(renderFeature: Renderable): void;
    setWidgetBackgroundToFullWidth(): void;
  }


  interface TConfigScreenMain extends TConfigScreen {}
  class TConfigScreenMain extends TConfigScreen {
    constructor(title: string, parent: Screen, inputHandlers: Set<TConfigHandler<any>>, defaultEntries: TConfigEntry[]);
    onClose(): void;
    render(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }

}

declare module 'traben.tconfig.gui.TConfigEntryListWidget' {
  import { Entry } from 'AbstractSelectionList';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';

  interface TConfigEntryForList extends Entry<TConfigEntryForList> {}
  class TConfigEntryForList extends Entry<TConfigEntryForList> {
    getWidget(var1: number, var2: number, var3: number, var4: number): AbstractWidget;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, deltaX: number, deltaY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    render(context: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, hovered: boolean, tickDelta: number): void;
    setFocused(focused: boolean): void;
  }

}

declare module 'traben.tconfig.gui.TConfigScreenList' {
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class Renderable {
    render(var1: GuiGraphics, var2: number, var3: number): void;
  }


  interface Align extends Enum<Align> {}
  class Align extends Enum<Align> {
    static readonly LEFT: Align;
    static readonly CENTER: Align;
    static readonly RIGHT: Align;
    static valueOf(name: string): Align;
    static values(): Align[];
  }

}

declare module 'traben.tconfig' {
  import { TConfigEntryCategory } from 'traben.tconfig.gui.entries';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Supplier } from 'java.util.function';
  import { FileReader } from 'java.io';

  class TConfig {
    doesGUI(): boolean;
    get gUIOptions(): TConfigEntryCategory;
    get modIcon(): ResourceLocation;
  }


  class TConfigHandler<T extends TConfig = any> {
    constructor(newConfigSupplier: Supplier<T>, configFileName: string, logID: string);
    configEquals(that: any): boolean;
    copyOfConfig(): T;
    doesGUI(): boolean;
    equals(o: any): boolean;
    fromJson(json: string): T;
    fromJson(json: FileReader): T;
    get config(): T;
    hashCode(): number;
    loadFromFile(): void;
    saveToFile(): void;
    set config(CONFIG: T);
    toJson(): string;
    toJson(config: any): string;
  }


  class TConfigLog {
    static log(ID: string, message: string): void;
    static logError(ID: string, message: string): void;
    static logWarn(ID: string, message: string): void;
  }

}

declare module 'traben.tconfig.TConfig' {
  import { TConfig } from 'traben.tconfig';
  import { TConfigEntryCategory } from 'traben.tconfig.gui.entries';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface NoGUI extends TConfig {}
  class NoGUI extends TConfig {
    doesGUI(): boolean;
    get gUIOptions(): TConfigEntryCategory;
    get modIcon(): ResourceLocation;
  }

}