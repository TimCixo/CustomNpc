declare module 'fi.dy.masa.malilib.command' {
  import { ICommandDispatcher, IClientCommandListener } from 'fi.dy.masa.malilib.interfaces';
  import { Minecraft } from 'net.minecraft.client';

  interface ClientCommandHandler extends ICommandDispatcher {}
  class ClientCommandHandler extends ICommandDispatcher {
    static readonly INSTANCE: ClientCommandHandler;
    onSendClientMessage(message: string, mc: Minecraft): boolean;
    registerCommand(command: IClientCommandListener): void;
  }

}

declare module 'fi.dy.masa.malilib.config' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { JsonObject, JsonElement } from 'com.google.gson';
  import { IHotkey } from 'fi.dy.masa.malilib.hotkeys';
  import { ConfigTypeWrapper } from 'fi.dy.masa.malilib.config.options';
  import { Color4f } from 'fi.dy.masa.malilib.util';
  import { ImmutableList } from 'com.google.common.collect';
  import { IValueChangeCallback, IStringValue } from 'fi.dy.masa.malilib.interfaces';

  interface ConfigManager extends IConfigManager {}
  class ConfigManager extends IConfigManager {
    static get instance(): IConfigManager;
    loadAllConfigs(): void;
    onConfigsChanged(modId: string): void;
    registerConfigHandler(modId: string, handler: IConfigHandler): void;
    saveAllConfigs(): void;
  }


  interface ConfigType extends Enum<ConfigType> {}
  class ConfigType extends Enum<ConfigType> {
    static readonly BOOLEAN: ConfigType;
    static readonly INTEGER: ConfigType;
    static readonly DOUBLE: ConfigType;
    static readonly FLOAT: ConfigType;
    static readonly COLOR: ConfigType;
    static readonly STRING: ConfigType;
    static readonly STRING_LIST: ConfigType;
    static readonly LOCKED_LIST: ConfigType;
    static readonly COLOR_LIST: ConfigType;
    static readonly OPTION_LIST: ConfigType;
    static readonly HOTKEY: ConfigType;
    static valueOf(name: string): ConfigType;
    static values(): ConfigType[];
  }


  class ConfigUtils {
    static createConfigWrapperForType(wrappedType: ConfigType, toWrap: IConfigValue[]): ConfigTypeWrapper[];
    static readConfigBase(root: JsonObject, category: string, options: IConfigBase[]): void;
    static readHotkeyToggleOptions(root: JsonObject, keyHotkey: string, keyBoolean: string, options: IHotkeyTogglable[]): void;
    static readHotkeys(root: JsonObject, keyHotkey: string, hotkeys: IHotkey[]): void;
    static writeConfigBase(root: JsonObject, category: string, options: IConfigBase[]): void;
    static writeHotkeyToggleOptions(root: JsonObject, keyHotkey: string, keyBoolean: string, options: IHotkeyTogglable[]): void;
    static writeHotkeys(root: JsonObject, category: string, hotkeys: IHotkey[]): void;
  }


  interface HudAlignment extends Enum<HudAlignment> {}
  class HudAlignment extends Enum<HudAlignment> {
    static readonly TOP_LEFT: HudAlignment;
    static readonly TOP_RIGHT: HudAlignment;
    static readonly BOTTOM_LEFT: HudAlignment;
    static readonly BOTTOM_RIGHT: HudAlignment;
    static readonly CENTER: HudAlignment;
    cycle(forward: boolean): IConfigOptionListEntry;
    fromString(name: string): HudAlignment;
    static fromStringStatic(name: string): HudAlignment;
    get displayName(): string;
    get stringValue(): string;
    static valueOf(name: string): HudAlignment;
    static values(): HudAlignment[];
  }


  class IConfigBase {
    get asJsonElement(): JsonElement;
    get cleanName(): string;
    get comment(): string;
    get configGuiDisplayName(): string;
    get lowerName(): string;
    get name(): string;
    get prettyName(): string;
    get translatedName(): string;
    get type(): ConfigType;
    set comment(var1: string);
    set prettyName(var1: string);
    set translatedName(var1: string);
    setValueFromJsonElement(var1: JsonElement): void;
  }


  interface IConfigBoolean extends IConfigValue {}
  class IConfigBoolean extends IConfigValue {
    get booleanValue(): boolean;
    get defaultBooleanValue(): boolean;
    set booleanValue(var1: boolean);
    toggleBooleanValue(): void;
  }


  interface IConfigColorList extends IConfigBase {}
  class IConfigColorList extends IConfigBase {
    get colors(): Color4f[];
    get defaultColors(): ImmutableList<Color4f>;
    set colors(var1: Color4f[]);
    setModified(): void;
  }


  interface IConfigDouble extends IConfigValue, IConfigSlider {}
  class IConfigDouble extends IConfigValue {
    get defaultDoubleValue(): number;
    get doubleValue(): number;
    get maxDoubleValue(): number;
    get minDoubleValue(): number;
    set doubleValue(var1: number);
  }


  interface IConfigFloat extends IConfigValue, IConfigSlider {}
  class IConfigFloat extends IConfigValue {
    get defaultFloatValue(): number;
    get floatValue(): number;
    get maxFloatValue(): number;
    get minFloatValue(): number;
    set floatValue(var1: number);
  }


  class IConfigHandler {
    load(): void;
    onConfigsChanged(): void;
    save(): void;
  }


  interface IConfigInteger extends IConfigValue, IConfigSlider {}
  class IConfigInteger extends IConfigValue {
    get defaultIntegerValue(): number;
    get integerValue(): number;
    get maxIntegerValue(): number;
    get minIntegerValue(): number;
    set integerValue(var1: number);
  }


  interface IConfigLockedList extends IConfigBase {}
  class IConfigLockedList extends IConfigBase {
    get configKeys(): string[];
    get defaultEntries(): ImmutableList<IConfigLockedListEntry>;
    get empty(): IConfigLockedListEntry;
    get entries(): IConfigLockedListEntry[];
    getEntry(var1: string): IConfigLockedListEntry;
    getEntryIndex(var1: IConfigLockedListEntry): number;
    set entries(var1: IConfigLockedListEntry[]);
    setModified(): void;
  }


  class IConfigLockedListEntry {
    static empty(): IConfigLockedListEntry;
    get displayName(): string;
    get stringValue(): string;
  }


  class IConfigLockedListType {
    fromString(var1: string): IConfigLockedListEntry;
    get defaultEntries(): ImmutableList<IConfigLockedListEntry>;
  }


  class IConfigManager {
    onConfigsChanged(var1: string): void;
    registerConfigHandler(var1: string, var2: IConfigHandler): void;
  }


  class IConfigNotifiable<T extends IConfigBase = any> {
    onValueChanged(): void;
    setValueChangeCallback(var1: IValueChangeCallback<T>): void;
  }


  class IConfigOptionList {
    get defaultOptionListValue(): IConfigOptionListEntry;
    get optionListValue(): IConfigOptionListEntry;
    set optionListValue(var1: IConfigOptionListEntry);
  }


  class IConfigOptionListEntry {
    cycle(var1: boolean): IConfigOptionListEntry;
    fromString(var1: string): IConfigOptionListEntry;
    get displayName(): string;
    get stringValue(): string;
  }


  class IConfigResettable {
    isModified(): boolean;
    resetToDefault(): void;
  }


  interface IConfigSlider extends IConfigValue {}
  class IConfigSlider extends IConfigValue {
    shouldUseSlider(): boolean;
    toggleUseSlider(): void;
  }


  interface IConfigStringList extends IConfigBase {}
  class IConfigStringList extends IConfigBase {
    get defaultStrings(): ImmutableList<string>;
    get strings(): string[];
    set strings(var1: string[]);
    setModified(): void;
  }


  interface IConfigValue extends IConfigBase, IConfigResettable, IStringRepresentable {}
  class IConfigValue extends IConfigBase {
  }


  interface IHotkeyTogglable extends IConfigBoolean, IHotkey {}
  class IHotkeyTogglable extends IConfigBoolean {
  }


  interface IStringRepresentable extends IStringValue {}
  class IStringRepresentable extends IStringValue {
    get defaultStringValue(): string;
    isModified(var1: string): boolean;
    setValueFromString(var1: string): void;
  }

}

declare module 'fi.dy.masa.malilib.config.gui' {
  import { IButtonActionListener, ButtonBase, ConfigButtonKeybind, ButtonGeneric } from 'fi.dy.masa.malilib.gui.button';
  import { IConfigResettable, IStringRepresentable, IConfigBase, IConfigDouble, IConfigFloat, IConfigInteger } from 'fi.dy.masa.malilib.config';
  import { IKeybind } from 'fi.dy.masa.malilib.hotkeys';
  import { IKeybindConfigGui, ITextFieldListener, ISliderCallback } from 'fi.dy.masa.malilib.gui.interfaces';
  import { GuiTextFieldGeneric, GuiConfigsBase } from 'fi.dy.masa.malilib.gui';
  import { ConfigResetterBase } from 'fi.dy.masa.malilib.config.gui.ConfigOptionListenerResetConfig';
  import { List } from 'java.util';
  import { ConfigOptionWrapper } from 'fi.dy.masa.malilib.gui.GuiConfigsBase';

  interface ButtonPressDirtyListenerSimple extends IButtonActionListener {}
  class ButtonPressDirtyListenerSimple extends IButtonActionListener {
    actionPerformedWithButton(button: ButtonBase, mouseButton: number): void;
    isDirty(): boolean;
    resetDirty(): void;
  }


  interface ConfigOptionChangeListenerButton extends IButtonActionListener {}
  class ConfigOptionChangeListenerButton extends IButtonActionListener {
    constructor(config: IConfigResettable, buttonReset: ButtonBase, dirtyListener: ButtonPressDirtyListenerSimple);
    actionPerformedWithButton(button: ButtonBase, mouseButton: number): void;
  }


  interface ConfigOptionChangeListenerKeybind extends IButtonActionListener {}
  class ConfigOptionChangeListenerKeybind extends IButtonActionListener {
    constructor(keybind: IKeybind, buttonHotkey: ConfigButtonKeybind, button: ButtonGeneric, host: IKeybindConfigGui);
    actionPerformedWithButton(button: ButtonBase, mouseButton: number): void;
    updateButtons(): void;
  }


  interface ConfigOptionChangeListenerTextField extends ITextFieldListener<GuiTextFieldGeneric> {}
  class ConfigOptionChangeListenerTextField extends ITextFieldListener<GuiTextFieldGeneric> {
    constructor(config: IStringRepresentable, textField: GuiTextFieldGeneric, buttonReset: ButtonBase);
    onTextChange(textField: GuiTextFieldGeneric): boolean;
  }


  interface ConfigOptionListenerResetConfig extends IButtonActionListener {}
  class ConfigOptionListenerResetConfig extends IButtonActionListener {
    constructor(config: IConfigResettable, reset: ConfigResetterBase, buttonReset: ButtonGeneric, dirtyListener: ButtonPressDirtyListenerSimple);
    actionPerformedWithButton(button: ButtonBase, mouseButton: number): void;
  }


  interface ConfigPanelAllHotkeys extends GuiModConfigs {}
  class ConfigPanelAllHotkeys extends GuiModConfigs {
    constructor();
  }


  interface GuiModConfigs extends GuiConfigsBase {}
  class GuiModConfigs extends GuiConfigsBase {
    constructor(modId: string, configs: IConfigBase[], titleKey: string, ...args: any[]);

    constructor(modId: string, wrappers: ConfigOptionWrapper[], unused: boolean, titleKey: string, ...args: any[]);
    get configs(): ConfigOptionWrapper[];
  }


  interface SliderCallbackDouble extends ISliderCallback {}
  class SliderCallbackDouble extends ISliderCallback {
    constructor(config: IConfigDouble, resetButton: ButtonBase);
    get formattedDisplayValue(): string;
    get maxSteps(): number;
    get valueRelative(): number;
    set valueRelative(relativeValue: number);
  }


  interface SliderCallbackFloat extends ISliderCallback {}
  class SliderCallbackFloat extends ISliderCallback {
    constructor(config: IConfigFloat, resetButton: ButtonBase);
    get formattedDisplayValue(): string;
    get maxSteps(): number;
    get valueRelative(): number;
    set valueRelative(relativeValue: number);
  }


  interface SliderCallbackInteger extends ISliderCallback {}
  class SliderCallbackInteger extends ISliderCallback {
    constructor(config: IConfigInteger, buttonReset: ButtonBase);
    get formattedDisplayValue(): string;
    get maxSteps(): number;
    get valueRelative(): number;
    set valueRelative(relativeValue: number);
  }

}

declare module 'fi.dy.masa.malilib.config.gui.ConfigOptionListenerResetConfig' {
  import { IStringRepresentable } from 'fi.dy.masa.malilib.config';
  import { EditBox } from 'net.minecraft.client.gui.components';
  import { ButtonBase } from 'fi.dy.masa.malilib.gui.button';

  class ConfigResetterBase {
    resetConfigOption(): void;
  }


  interface ConfigResetterTextField extends ConfigResetterBase {}
  class ConfigResetterTextField extends ConfigResetterBase {
    constructor(config: IStringRepresentable, textField: EditBox);
    resetConfigOption(): void;
  }


  interface ConfigResetterButton extends ConfigResetterBase {}
  class ConfigResetterButton extends ConfigResetterBase {
    constructor(button: ButtonBase);
    resetConfigOption(): void;
  }

}

declare module 'fi.dy.masa.malilib.config.options' {
  import { IConfigBoolean, IConfigBase, IConfigResettable, IConfigNotifiable, ConfigType, IHotkeyTogglable, IConfigColorList, IConfigDouble, IConfigFloat, IConfigInteger, IConfigLockedList, IConfigLockedListType, IConfigLockedListEntry, IConfigOptionList, IStringRepresentable, IConfigOptionListEntry, IConfigValue, IConfigStringList } from 'fi.dy.masa.malilib.config';
  import { IKeybind, KeybindSettings, IHotkey } from 'fi.dy.masa.malilib.hotkeys';
  import { IValueChangeCallback } from 'fi.dy.masa.malilib.interfaces';
  import { JsonElement } from 'com.google.gson';
  import { Color4f } from 'fi.dy.masa.malilib.util';
  import { ImmutableList } from 'com.google.common.collect';
  import { List } from 'java.util';

  interface BooleanHotkeyGuiWrapper extends ConfigBoolean {}
  class BooleanHotkeyGuiWrapper extends ConfigBoolean {
    constructor(name: string, booleanConfig: IConfigBoolean, keybind: IKeybind);
    apply(translatePrefix: string): BooleanHotkeyGuiWrapper;
    get booleanConfig(): IConfigBoolean;
    get booleanValue(): boolean;
    get keybind(): IKeybind;
    getTranslatedName(): string;
    isModified(): boolean;
    isModified(newValue: string): boolean;
    resetToDefault(): void;
    set booleanValue(value: boolean);
    translatedName(translatedName: string): BooleanHotkeyGuiWrapper;
  }


  interface ConfigBase<T extends IConfigBase = any> extends IConfigBase, IConfigResettable, IConfigNotifiable<T> {}
  class ConfigBase<T extends IConfigBase = any> extends IConfigBase {
    static readonly COMMENT_KEY: string;
    static readonly PRETTY_NAME_KEY: string;
    static readonly TRANSLATED_NAME_KEY: string;
    constructor(type: ConfigType, name: string);

    constructor(type: ConfigType, name: string, comment: string);

    constructor(type: ConfigType, name: string, comment: string, prettyName: string, translatedName: string);
    apply(translationPrefix: string): T;
    get comment(): string;
    get name(): string;
    get prettyName(): string;
    get type(): ConfigType;
    getTranslatedName(): string;
    onValueChanged(): void;
    set comment(comment: string);
    set prettyName(prettyName: string);
    setTranslatedName(translatedName: string): void;
    setValueChangeCallback(callback: IValueChangeCallback<T>): void;
    toString(): string;
    translatedName(translatedName: string): T;
  }


  interface ConfigBoolean extends IConfigBoolean, ConfigBase<ConfigBoolean> {}
  class ConfigBoolean extends IConfigBoolean {
    constructor(name: string, defaultValue: boolean);

    constructor(name: string, defaultValue: boolean, comment: string);

    constructor(name: string, defaultValue: boolean, comment: string, prettyName: string);

    constructor(name: string, defaultValue: boolean, comment: string, prettyName: string, translatedName: string);
    get asJsonElement(): JsonElement;
    get booleanValue(): boolean;
    get defaultBooleanValue(): boolean;
    get defaultStringValue(): string;
    get stringValue(): string;
    isModified(): boolean;
    isModified(newValue: string): boolean;
    resetToDefault(): void;
    set booleanValue(value: boolean);
    setValueFromJsonElement(element: JsonElement): void;
    setValueFromString(value: string): void;
  }


  interface ConfigBooleanHotkeyed extends IHotkeyTogglable, ConfigBoolean {}
  class ConfigBooleanHotkeyed extends IHotkeyTogglable {
    constructor(name: string, defaultValue: boolean, defaultHotkey: string);

    constructor(name: string, defaultValue: boolean, defaultHotkey: string, comment: string);

    constructor(name: string, defaultValue: boolean, defaultHotkey: string, comment: string, prettyName: string);

    constructor(name: string, defaultValue: boolean, defaultHotkey: string, comment: string, prettyName: string, translatedName: string);

    constructor(name: string, defaultValue: boolean, defaultHotkey: string, settings: KeybindSettings);

    constructor(name: string, defaultValue: boolean, defaultHotkey: string, settings: KeybindSettings, comment: string);

    constructor(name: string, defaultValue: boolean, defaultHotkey: string, settings: KeybindSettings, comment: string, prettyName: string);

    constructor(name: string, defaultValue: boolean, defaultHotkey: string, settings: KeybindSettings, comment: string, prettyName: string, translatedName: string);
    apply(translationPrefix: string): ConfigBooleanHotkeyed;
    get asJsonElement(): JsonElement;
    get keybind(): IKeybind;
    isModified(): boolean;
    isModified(newValue: string): boolean;
    resetToDefault(): void;
    setValueFromJsonElement(element: JsonElement): void;
    translatedName(translatedName: string): ConfigBooleanHotkeyed;
  }


  interface ConfigColor extends ConfigInteger {}
  class ConfigColor extends ConfigInteger {
    constructor(name: string, defaultValue: string);

    constructor(name: string, defaultValue: string, comment: string);

    constructor(name: string, defaultValue: string, comment: string, prettyName: string);

    constructor(name: string, defaultValue: string, comment: string, prettyName: string, translatedName: string);
    apply(translationPrefix: string): ConfigColor;
    get asJsonElement(): JsonElement;
    get color(): Color4f;
    get defaultStringValue(): string;
    get stringValue(): string;
    get type(): ConfigType;
    isModified(newValue: string): boolean;
    isModified(): boolean;
    setIntegerValue(value: number): void;
    setValueFromJsonElement(element: JsonElement): void;
    setValueFromString(value: string): void;
    translatedName(translatedName: string): ConfigColor;
  }


  interface ConfigColorList extends IConfigColorList, ConfigBase<ConfigColorList> {}
  class ConfigColorList extends IConfigColorList {
    constructor(name: string, defaultValue: ImmutableList<Color4f>);

    constructor(name: string, defaultValue: ImmutableList<Color4f>, comment: string);

    constructor(name: string, defaultValue: ImmutableList<Color4f>, comment: string, prettyName: string);

    constructor(name: string, defaultValue: ImmutableList<Color4f>, comment: string, prettyName: string, translationName: string);
    get asJsonElement(): JsonElement;
    get colors(): Color4f[];
    get defaultColors(): ImmutableList<Color4f>;
    isModified(): boolean;
    resetToDefault(): void;
    set colors(colors: Color4f[]);
    setModified(): void;
    setValueFromJsonElement(element: JsonElement): void;
  }


  interface ConfigDouble extends IConfigDouble, ConfigBase<ConfigDouble> {}
  class ConfigDouble extends IConfigDouble {
    constructor(name: string, defaultValue: number);

    constructor(name: string, defaultValue: number, comment: string);

    constructor(name: string, defaultValue: number, comment: string, prettyName: string);

    constructor(name: string, defaultValue: number, comment: string, prettyName: string, translatedName: string);

    constructor(name: string, defaultValue: number, minValue: number, maxValue: number);

    constructor(name: string, defaultValue: number, minValue: number, maxValue: number, comment: string);

    constructor(name: string, defaultValue: number, minValue: number, maxValue: number, comment: string, prettyName: string);

    constructor(name: string, defaultValue: number, minValue: number, maxValue: number, comment: string, prettyName: string, translatedName: string);

    constructor(name: string, defaultValue: number, minValue: number, maxValue: number, useSlider: boolean);

    constructor(name: string, defaultValue: number, minValue: number, maxValue: number, useSlider: boolean, comment: string);

    constructor(name: string, defaultValue: number, minValue: number, maxValue: number, useSlider: boolean, comment: string, prettyName: string);

    constructor(name: string, defaultValue: number, minValue: number, maxValue: number, useSlider: boolean, comment: string, prettyName: string, translatedName: string);
    get asJsonElement(): JsonElement;
    get defaultDoubleValue(): number;
    get defaultStringValue(): string;
    get doubleValue(): number;
    get maxDoubleValue(): number;
    get minDoubleValue(): number;
    get stringValue(): string;
    isModified(): boolean;
    isModified(newValue: string): boolean;
    resetToDefault(): void;
    set doubleValue(value: number);
    setValueFromJsonElement(element: JsonElement): void;
    setValueFromString(value: string): void;
    shouldUseSlider(): boolean;
    toggleUseSlider(): void;
  }


  interface ConfigFloat extends IConfigFloat, ConfigBase<ConfigFloat> {}
  class ConfigFloat extends IConfigFloat {
    constructor(name: string, defaultValue: number);

    constructor(name: string, defaultValue: number, comment: string);

    constructor(name: string, defaultValue: number, comment: string, prettyName: string);

    constructor(name: string, defaultValue: number, comment: string, prettyName: string, translatedName: string);

    constructor(name: string, defaultValue: number, minValue: number, maxValue: number);

    constructor(name: string, defaultValue: number, minValue: number, maxValue: number, comment: string);

    constructor(name: string, defaultValue: number, minValue: number, maxValue: number, comment: string, prettyName: string);

    constructor(name: string, defaultValue: number, minValue: number, maxValue: number, useSlider: boolean);

    constructor(name: string, defaultValue: number, minValue: number, maxValue: number, useSlider: boolean, comment: string);

    constructor(name: string, defaultValue: number, minValue: number, maxValue: number, useSlider: boolean, comment: string, prettyName: string);

    constructor(name: string, defaultValue: number, minValue: number, maxValue: number, useSlider: boolean, comment: string, prettyName: string, translatedName: string);
    get asJsonElement(): JsonElement;
    get defaultFloatValue(): number;
    get defaultStringValue(): string;
    get floatValue(): number;
    get maxFloatValue(): number;
    get minFloatValue(): number;
    get stringValue(): string;
    isModified(): boolean;
    isModified(newValue: string): boolean;
    resetToDefault(): void;
    set floatValue(value: number);
    setValueFromJsonElement(element: JsonElement): void;
    setValueFromString(value: string): void;
    shouldUseSlider(): boolean;
    toggleUseSlider(): void;
  }


  interface ConfigHotkey extends IHotkey, ConfigBase<ConfigHotkey> {}
  class ConfigHotkey extends IHotkey {
    constructor(name: string, defaultStorageString: string);

    constructor(name: string, defaultStorageString: string, comment: string);

    constructor(name: string, defaultStorageString: string, comment: string, prettyName: string);

    constructor(name: string, defaultStorageString: string, comment: string, prettyName: string, translatedName: string);

    constructor(name: string, defaultStorageString: string, settings: KeybindSettings);

    constructor(name: string, defaultStorageString: string, settings: KeybindSettings, comment: string);

    constructor(name: string, defaultStorageString: string, settings: KeybindSettings, comment: string, prettyName: string);

    constructor(name: string, defaultStorageString: string, settings: KeybindSettings, comment: string, prettyName: string, translatedName: string);
    get asJsonElement(): JsonElement;
    get defaultStringValue(): string;
    get keybind(): IKeybind;
    get stringValue(): string;
    isModified(): boolean;
    isModified(newValue: string): boolean;
    resetToDefault(): void;
    setValueFromJsonElement(element: JsonElement): void;
    setValueFromString(value: string): void;
  }


  interface ConfigInteger extends IConfigInteger, ConfigBase<ConfigInteger> {}
  class ConfigInteger extends IConfigInteger {
    constructor(name: string, defaultValue: number);

    constructor(name: string, defaultValue: number, comment: string);

    constructor(name: string, defaultValue: number, comment: string, prettyName: string);

    constructor(name: string, defaultValue: number, comment: string, prettyName: string, translatedName: string);

    constructor(name: string, defaultValue: number, minValue: number, maxValue: number);

    constructor(name: string, defaultValue: number, minValue: number, maxValue: number, comment: string);

    constructor(name: string, defaultValue: number, minValue: number, maxValue: number, comment: string, prettyName: string);

    constructor(name: string, defaultValue: number, minValue: number, maxValue: number, comment: string, prettyName: string, translatedName: string);

    constructor(name: string, defaultValue: number, minValue: number, maxValue: number, useSlider: boolean);

    constructor(name: string, defaultValue: number, minValue: number, maxValue: number, useSlider: boolean, comment: string);

    constructor(name: string, defaultValue: number, minValue: number, maxValue: number, useSlider: boolean, comment: string, prettyName: string);

    constructor(name: string, defaultValue: number, minValue: number, maxValue: number, useSlider: boolean, comment: string, prettyName: string, translatedName: string);
    get asJsonElement(): JsonElement;
    get defaultIntegerValue(): number;
    get defaultStringValue(): string;
    get integerValue(): number;
    get maxIntegerValue(): number;
    get minIntegerValue(): number;
    get stringValue(): string;
    isModified(): boolean;
    isModified(newValue: string): boolean;
    resetToDefault(): void;
    set integerValue(value: number);
    setValueFromJsonElement(element: JsonElement): void;
    setValueFromString(value: string): void;
    shouldUseSlider(): boolean;
    toggleUseSlider(): void;
  }


  interface ConfigLockedList extends IConfigLockedList, ConfigBase<ConfigLockedList> {}
  class ConfigLockedList extends IConfigLockedList {
    constructor(name: string, handler: IConfigLockedListType);

    constructor(name: string, handler: IConfigLockedListType, comment: string);

    constructor(name: string, handler: IConfigLockedListType, comment: string, prettyName: string);

    constructor(name: string, handler: IConfigLockedListType, comment: string, prettyName: string, translatedName: string);
    get asJsonElement(): JsonElement;
    get configKeys(): string[];
    get defaultEntries(): ImmutableList<IConfigLockedListEntry>;
    get empty(): IConfigLockedListEntry;
    get entries(): IConfigLockedListEntry[];
    getEntry(key: string): IConfigLockedListEntry;
    getEntryIndex(entry: IConfigLockedListEntry): number;
    isModified(): boolean;
    resetToDefault(): void;
    set entries(entries: IConfigLockedListEntry[]);
    setModified(): void;
    setValueFromJsonElement(element: JsonElement): void;
  }


  interface ConfigOptionList extends IConfigOptionList, IStringRepresentable, ConfigBase<ConfigOptionList> {}
  class ConfigOptionList extends IConfigOptionList {
    constructor(name: string, defaultValue: IConfigOptionListEntry);

    constructor(name: string, defaultValue: IConfigOptionListEntry, comment: string);

    constructor(name: string, defaultValue: IConfigOptionListEntry, comment: string, prettyName: string);

    constructor(name: string, defaultValue: IConfigOptionListEntry, comment: string, prettyName: string, translatedName: string);
    get asJsonElement(): JsonElement;
    get defaultOptionListValue(): IConfigOptionListEntry;
    get defaultStringValue(): string;
    get optionListValue(): IConfigOptionListEntry;
    get stringValue(): string;
    isModified(): boolean;
    isModified(newValue: string): boolean;
    resetToDefault(): void;
    set optionListValue(value: IConfigOptionListEntry);
    setValueFromJsonElement(element: JsonElement): void;
    setValueFromString(value: string): void;
  }


  interface ConfigString extends IConfigValue, ConfigBase<ConfigString> {}
  class ConfigString extends IConfigValue {
    constructor(name: string, defaultValue: string);

    constructor(name: string, defaultValue: string, comment: string);

    constructor(name: string, defaultValue: string, comment: string, prettyName: string);

    constructor(name: string, defaultValue: string, comment: string, prettyName: string, translatedName: string);
    get asJsonElement(): JsonElement;
    get defaultStringValue(): string;
    get oldStringValue(): string;
    get stringValue(): string;
    isModified(): boolean;
    isModified(newValue: string): boolean;
    resetToDefault(): void;
    setValueFromJsonElement(element: JsonElement): void;
    setValueFromString(value: string): void;
  }


  interface ConfigStringList extends IConfigStringList, ConfigBase<ConfigStringList> {}
  class ConfigStringList extends IConfigStringList {
    constructor(name: string, defaultValue: ImmutableList<string>);

    constructor(name: string, defaultValue: ImmutableList<string>, comment: string);

    constructor(name: string, defaultValue: ImmutableList<string>, comment: string, prettyName: string);

    constructor(name: string, defaultValue: ImmutableList<string>, comment: string, prettyName: string, translatedName: string);
    get asJsonElement(): JsonElement;
    get defaultStrings(): ImmutableList<string>;
    get strings(): string[];
    isModified(): boolean;
    resetToDefault(): void;
    set strings(strings: string[]);
    setModified(): void;
    setValueFromJsonElement(element: JsonElement): void;
  }


  interface ConfigTypeWrapper extends IConfigBoolean, IConfigDouble, IConfigFloat, IConfigInteger, IConfigOptionList, IHotkey, IConfigNotifiable<IConfigBase> {}
  class ConfigTypeWrapper extends IConfigBoolean {
    constructor(wrappedType: ConfigType, wrappedConfig: IConfigBase);
    get asJsonElement(): JsonElement;
    get booleanValue(): boolean;
    get comment(): string;
    get configGuiDisplayName(): string;
    get defaultBooleanValue(): boolean;
    get defaultDoubleValue(): number;
    get defaultFloatValue(): number;
    get defaultIntegerValue(): number;
    get defaultOptionListValue(): IConfigOptionListEntry;
    get defaultStringValue(): string;
    get doubleValue(): number;
    get floatValue(): number;
    get integerValue(): number;
    get keybind(): IKeybind;
    get lowerName(): string;
    get maxDoubleValue(): number;
    get maxFloatValue(): number;
    get maxIntegerValue(): number;
    get minDoubleValue(): number;
    get minFloatValue(): number;
    get minIntegerValue(): number;
    get name(): string;
    get optionListValue(): IConfigOptionListEntry;
    get prettyName(): string;
    get stringValue(): string;
    get translatedName(): string;
    get type(): ConfigType;
    isModified(): boolean;
    isModified(newValue: string): boolean;
    onValueChanged(): void;
    resetToDefault(): void;
    set booleanValue(value: boolean);
    set comment(comment: string);
    set doubleValue(value: number);
    set floatValue(value: number);
    set integerValue(value: number);
    set optionListValue(value: IConfigOptionListEntry);
    set prettyName(prettyName: string);
    set translatedName(translatedName: string);
    setValueChangeCallback(callback: IValueChangeCallback<IConfigBase>): void;
    setValueFromJsonElement(element: JsonElement): void;
    setValueFromString(value: string): void;
    shouldUseSlider(): boolean;
    toggleUseSlider(): void;
  }

}

declare module 'fi.dy.masa.malilib.config.value' {
  import { List } from 'java.util';
  import { ImmutableList } from 'com.google.common.collect';

  interface BaseOptionListConfigValue extends OptionListConfigValue {}
  class BaseOptionListConfigValue extends OptionListConfigValue {
    constructor(name: string, translationKey: string);
    static findValueByName<T extends OptionListConfigValue>(name: string, values: T[]): T;
    static findValueByName<T extends OptionListConfigValue>(name: string, values: T[], fallback: T): T;
    get displayName(): string;
    get name(): string;
    toString(): string;
  }


  interface FileWriteType extends BaseOptionListConfigValue {}
  class FileWriteType extends BaseOptionListConfigValue {
    static readonly NORMAL_WRITE: FileWriteType;
    static readonly TEMP_AND_RENAME: FileWriteType;
    static readonly VALUES: ImmutableList;
  }


  class OptionListConfigValue {
    get displayName(): string;
    get name(): string;
  }

}

declare module 'fi.dy.masa.malilib.data' {
  import { Format, Alignment } from 'fi.dy.masa.malilib.data.DataDump';
  import { List } from 'java.util';
  import { File } from 'java.io';
  import { Path } from 'java.nio.file';

  class DataDump {
    static readonly EMPTY_STRING: string;
    constructor(columns: number);

    constructor(columns: number, format: Format);
    addData(...data: string[]): void;
    addFooter(...data: string[]): void;
    addHeader(...data: string[]): void;
    addHeader(index: number, ...data: string[]): void;
    addTitle(...data: string[]): void;
    static dumpDataToFile(dir: File, fileNameBase: string, lines: string[], format: Format): File;
    static dumpDataToFile(dir: File, fileNameBase: string, lines: string[]): File;
    static dumpDataToFile(dir: File, fileNameBase: string, fileNameExtension: string, lines: string[]): File;
    static dumpDataToFile(dir: Path, fileNameBase: string, lines: string[], format: Format): Path;
    static dumpDataToFile(dir: Path, fileNameBase: string, lines: string[]): Path;
    static dumpDataToFile(dir: Path, fileNameBase: string, fileNameExtension: string, lines: string[]): Path;
    get format(): Format;
    get lines(): string[];
    static printDataToLogger(lines: string[]): void;
    set format(format: Format);
    setCenterTitle(center: boolean): void;
    setColumnAlignment(columnId: number, align: Alignment): DataDump;
    setColumnIsNumeric(columnId: number, isNumeric: boolean): DataDump;
    setColumnProperties(columnId: number, align: Alignment, isNumeric: boolean): DataDump;
    setRepeatTitleAtBottom(repeat: boolean): void;
    setSort(sort: boolean): void;
    setUseColumnSeparator(value: boolean): void;
  }


  class MaLiLibTag {
    static register(): void;
  }

}

declare module 'fi.dy.masa.malilib.data.DataDump' {
  import { Enum, Comparable } from 'java.lang';
  import { List } from 'java.util';

  interface Format extends Enum<Format> {}
  class Format extends Enum<Format> {
    static readonly ASCII: Format;
    static readonly CSV: Format;
    static valueOf(name: string): Format;
    static values(): Format[];
  }


  interface Alignment extends Enum<Alignment> {}
  class Alignment extends Enum<Alignment> {
    static readonly LEFT: Alignment;
    static readonly RIGHT: Alignment;
    static valueOf(name: string): Alignment;
    static values(): Alignment[];
  }


  interface Row extends Comparable<Row> {}
  class Row extends Comparable<Row> {
    constructor(strings: string[]);
    compareTo(other: Row): number;
    get values(): string[];
  }

}

declare module 'fi.dy.masa.malilib.data.MaLiLibTag' {
  import { TagKey } from 'net.minecraft.tags';
  import { ImmutableList } from 'com.google.common.collect';

  class Items {
  }


  class Blocks {
    static readonly ALL_SIGNS_FIX: TagKey;
    static readonly ALL_BANNERS_FIX: TagKey;
    static readonly CONCRETE_POWDER_FIX: TagKey;
    static readonly CORAL_FANS_FIX: TagKey;
    static readonly LEAVES_FIX: TagKey;
    static readonly WOOL_BLOCKS_FIX: TagKey;
    static readonly CONCRETE_BLOCKS: TagKey;
    static readonly GLASS_BLOCKS: TagKey;
    static readonly GLASS_PANES: TagKey;
    static readonly GLAZED_TERRACOTTA_BLOCKS: TagKey;
    static readonly SCULK_BLOCKS: TagKey;
    static readonly ORE_BLOCKS: TagKey;
    static readonly GRAVITY_BLOCKS: TagKey;
    static readonly IMMOVABLE_BLOCKS: TagKey;
    static readonly NEEDS_SILK_TOUCH: TagKey;
    static readonly NEEDS_SHEARS: TagKey;
    static readonly REPLACEABLE_GROUPS: ImmutableList;
  }

}

declare module 'fi.dy.masa.malilib.datagen' {
  import { BlockTags, ItemTags } from 'team.cagayakegirls.mafglib.utils.DataGenProvider';
  import { PackOutput } from 'net.minecraft.data';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';
  import { ExistingFileHelper } from 'net.neoforged.neoforge.common.data';
  import { TagLookup } from 'TagsProvider';
  import { Block } from 'net.minecraft.world.level.block';
  import { AddPackFindersEvent } from 'net.neoforged.neoforge.event';

  interface BlockTagDataGenerator extends BlockTags {}
  class BlockTagDataGenerator extends BlockTags {
    constructor(output: PackOutput, registriesFuture: CompletableFuture<Provider>, existingFileHelper: ExistingFileHelper);
  }


  interface ItemTagDataGenerator extends ItemTags {}
  class ItemTagDataGenerator extends ItemTags {
    constructor(output: PackOutput, completableFuture: CompletableFuture<Provider>, blockTagProvider: CompletableFuture<TagLookup<Block>>, existingFileHelper: ExistingFileHelper);
  }


  class MaLiLibDataGen {
    static onInitializeDataGenerator(event: AddPackFindersEvent): void;
  }

}

declare module 'fi.dy.masa.malilib.event' {
  import { IInitializationDispatcher, IInitializationHandler, IServerListener, IWorldLoadListener, IRenderDispatcher, IRenderer, IClientTickHandler } from 'fi.dy.masa.malilib.interfaces';
  import { IKeybindManager, IInputManager, IKeybindProvider, KeybindCategory, IKeybind, IHotkey, IKeyboardInputHandler, IMouseInputHandler } from 'fi.dy.masa.malilib.hotkeys';
  import { List } from 'java.util';
  import { Minecraft } from 'net.minecraft.client';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { TooltipContext } from 'Item';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Component } from 'net.minecraft.network.chat';
  import { Matrix4f } from 'org.joml';
  import { MinecraftServer } from 'net.minecraft.server';
  import { IntegratedServer } from 'net.minecraft.client.server';
  import { Frozen } from 'RegistryAccess';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';

  interface InitializationHandler extends IInitializationDispatcher {}
  class InitializationHandler extends IInitializationDispatcher {
    static get instance(): IInitializationDispatcher;
    onGameInitDone(): void;
    registerInitializationHandler(handler: IInitializationHandler): void;
  }


  interface InputEventHandler extends IKeybindManager, IInputManager {}
  class InputEventHandler extends IKeybindManager {
    addHotkeysForCategory(modName: string, keyCategory: string, hotkeys: IHotkey[]): void;
    addKeybindToMap(keybind: IKeybind): void;
    static get inputManager(): IInputManager;
    get keybindCategories(): KeybindCategory[];
    static get keybindManager(): IKeybindManager;
    onKeyInput(keyCode: number, scanCode: number, modifiers: number, action: number, mc: Minecraft): boolean;
    onMouseClick(mouseX: number, mouseY: number, eventButton: number, action: number, mc: Minecraft): boolean;
    onMouseMove(mouseX: number, mouseY: number, mc: Minecraft): void;
    onMouseScroll(mouseX: number, mouseY: number, xOffset: number, yOffset: number, mc: Minecraft): boolean;
    registerKeybindProvider(provider: IKeybindProvider): void;
    registerKeyboardInputHandler(handler: IKeyboardInputHandler): void;
    registerMouseInputHandler(handler: IMouseInputHandler): void;
    unregisterKeybindProvider(provider: IKeybindProvider): void;
    unregisterKeyboardInputHandler(handler: IKeyboardInputHandler): void;
    unregisterMouseInputHandler(handler: IMouseInputHandler): void;
    updateUsedKeys(): void;
  }


  class IServerManager {
    registerServerHandler(var1: IServerListener): void;
    unregisterServerHandler(var1: IServerListener): void;
  }


  class IWorldLoadManager {
    registerWorldLoadPostHandler(var1: IWorldLoadListener): void;
    registerWorldLoadPreHandler(var1: IWorldLoadListener): void;
    unregisterWorldLoadPostHandler(var1: IWorldLoadListener): void;
    unregisterWorldLoadPreHandler(var1: IWorldLoadListener): void;
  }


  interface RenderEventHandler extends IRenderDispatcher {}
  class RenderEventHandler extends IRenderDispatcher {
    static get instance(): IRenderDispatcher;
    onRenderGameOverlayLastDrawer(drawContext: GuiGraphics, mc: Minecraft, partialTicks: number): void;
    onRenderGameOverlayPost(drawContext: GuiGraphics, mc: Minecraft, partialTicks: number): void;
    onRenderTooltipComponentInsertFirst(context: TooltipContext, stack: ItemStack, list: Component[]): void;
    onRenderTooltipComponentInsertLast(context: TooltipContext, stack: ItemStack, list: Component[]): void;
    onRenderTooltipComponentInsertMiddle(context: TooltipContext, stack: ItemStack, list: Component[]): void;
    onRenderTooltipLast(drawContext: GuiGraphics, stack: ItemStack, x: number, y: number): void;
    onRenderWorldLast(matrix4f: Matrix4f, projMatrix: Matrix4f, mc: Minecraft): void;
    registerGameOverlayRenderer(renderer: IRenderer): void;
    registerTooltipLastRenderer(renderer: IRenderer): void;
    registerWorldLastRenderer(renderer: IRenderer): void;
  }


  interface ServerHandler extends IServerManager {}
  class ServerHandler extends IServerManager {
    static get instance(): IServerManager;
    onServerIntegratedSetup(server: IntegratedServer): void;
    onServerOpenToLan(server: IntegratedServer): void;
    onServerStarted(server: MinecraftServer): void;
    onServerStarting(server: MinecraftServer): void;
    onServerStopped(server: MinecraftServer): void;
    onServerStopping(server: MinecraftServer): void;
    registerServerHandler(handler: IServerListener): void;
    unregisterServerHandler(handler: IServerListener): void;
  }


  class TickHandler {
    static get instance(): TickHandler;
    onClientTick(mc: Minecraft): void;
    registerClientTickHandler(handler: IClientTickHandler): void;
  }


  interface WorldLoadHandler extends IWorldLoadManager {}
  class WorldLoadHandler extends IWorldLoadManager {
    static get instance(): IWorldLoadManager;
    onWorldLoadImmutable(immutable: Frozen): void;
    onWorldLoadPost(worldBefore: ClientLevel, worldAfter: ClientLevel, mc: Minecraft): void;
    onWorldLoadPre(worldBefore: ClientLevel, worldAfter: ClientLevel, mc: Minecraft): void;
    registerWorldLoadPostHandler(listener: IWorldLoadListener): void;
    registerWorldLoadPreHandler(listener: IWorldLoadListener): void;
    unregisterWorldLoadPostHandler(listener: IWorldLoadListener): void;
    unregisterWorldLoadPreHandler(listener: IWorldLoadListener): void;
  }

}

declare module 'fi.dy.masa.malilib.gui.button' {
  import { WidgetBase } from 'fi.dy.masa.malilib.gui.widgets';
  import { List } from 'java.util';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { IGuiIcon, IConfigGui, IDialogHandler, IKeybindConfigGui } from 'fi.dy.masa.malilib.gui.interfaces';
  import { LeftRight } from 'fi.dy.masa.malilib.gui';
  import { IConfigBoolean, IConfigColorList, IConfigLockedList, IConfigOptionList, IConfigStringList } from 'fi.dy.masa.malilib.config';
  import { IKeybind } from 'fi.dy.masa.malilib.hotkeys';

  interface ButtonBase extends WidgetBase {}
  class ButtonBase extends WidgetBase {
    constructor(x: number, y: number, width: number, height: number);

    constructor(x: number, y: number, width: number, height: number, text: string);

    constructor(x: number, y: number, width: number, height: number, text: string, actionListener: IButtonActionListener);
    clearHoverStrings(): void;
    get hoverStrings(): string[];
    hasHoverText(): boolean;
    isMouseOver(): boolean;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    onMouseScrolledImpl(mouseX: number, mouseY: number, horizontalAmount: number, verticalAmount: number): boolean;
    postRenderHovered(mouseX: number, mouseY: number, selected: boolean, drawContext: GuiGraphics): void;
    set hoverStrings(...hoverStrings: string[]);
    setActionListener(actionListener: IButtonActionListener): ButtonBase;
    setDisplayString(text: string): void;
    setEnabled(enabled: boolean): void;
    setHoverInfoRequiresShift(requireShift: boolean): void;
    setHoverStrings(hoverStrings: string[]): void;
    updateDisplayString(): void;
  }


  interface ButtonGeneric extends ButtonBase {}
  class ButtonGeneric extends ButtonBase {
    constructor(x: number, y: number, width: number, rightAlign: boolean, translationKey: string, ...args: any[]);

    constructor(x: number, y: number, width: number, height: number, text: string, ...hoverStrings: string[]);

    constructor(x: number, y: number, width: number, height: number, text: string, icon: IGuiIcon, ...hoverStrings: string[]);

    constructor(x: number, y: number, icon: IGuiIcon, ...hoverStrings: string[]);
    render(mouseX: number, mouseY: number, selected: boolean, drawContext: GuiGraphics): void;
    setActionListener(actionListener: IButtonActionListener): ButtonGeneric;
    setIconAlignment(alignment: LeftRight): ButtonGeneric;
    setRenderDefaultBackground(render: boolean): ButtonGeneric;
    setTextCentered(centered: boolean): ButtonGeneric;
  }


  interface ButtonOnOff extends ButtonGeneric {}
  class ButtonOnOff extends ButtonGeneric {
    constructor(x: number, y: number, width: number, rightAlign: boolean, translationKey: string, isCurrentlyOn: boolean, ...hoverStrings: string[]);
    static getDisplayStringForStatus(translationKey: string, isCurrentlyOn: boolean): string;
    updateDisplayString(isCurrentlyOn: boolean): void;
    updateDisplayString(): void;
  }


  interface ConfigButtonBoolean extends ButtonGeneric {}
  class ConfigButtonBoolean extends ButtonGeneric {
    constructor(x: number, y: number, width: number, height: number, config: IConfigBoolean);
    updateDisplayString(): void;
  }


  interface ConfigButtonColorList extends ButtonGeneric {}
  class ConfigButtonColorList extends ButtonGeneric {
    constructor(x: number, y: number, width: number, height: number, config: IConfigColorList, configGui: IConfigGui, dialogHandler: IDialogHandler);
    updateDisplayString(): void;
  }


  interface ConfigButtonKeybind extends ButtonGeneric {}
  class ConfigButtonKeybind extends ButtonGeneric {
    constructor(x: number, y: number, width: number, height: number, keybind: IKeybind, host: IKeybindConfigGui);
    isSelected(): boolean;
    onClearSelection(): void;
    onKeyPressed(keyCode: number): void;
    onSelected(): void;
    updateDisplayString(): void;
  }


  interface ConfigButtonLockedList extends ButtonGeneric {}
  class ConfigButtonLockedList extends ButtonGeneric {
    constructor(x: number, y: number, width: number, height: number, config: IConfigLockedList, configGui: IConfigGui, dialogHandler: IDialogHandler);
    updateDisplayString(): void;
  }


  interface ConfigButtonOptionList extends ButtonGeneric {}
  class ConfigButtonOptionList extends ButtonGeneric {
    constructor(x: number, y: number, width: number, height: number, config: IConfigOptionList);

    constructor(x: number, y: number, width: number, height: number, config: IConfigOptionList, prefixTranslationKey: string);
    updateDisplayString(): void;
  }


  interface ConfigButtonStringList extends ButtonGeneric {}
  class ConfigButtonStringList extends ButtonGeneric {
    constructor(x: number, y: number, width: number, height: number, config: IConfigStringList, configGui: IConfigGui, dialogHandler: IDialogHandler);
    updateDisplayString(): void;
  }


  class IButtonActionListener {
    actionPerformedWithButton(var1: ButtonBase, var2: number): void;
  }

}

declare module 'fi.dy.masa.malilib.gui.config.registry' {
  import { ModInfo } from 'fi.dy.masa.malilib.util.data';
  import { Supplier } from 'java.util.function';
  import { GuiBase } from 'fi.dy.masa.malilib.gui';
  import { ImmutableList } from 'com.google.common.collect';
  import { Class } from 'java.lang';

  class ConfigScreenRegistry {
    get allModsWithConfigScreens(): ImmutableList<ModInfo>;
    getConfigScreenFactoryFor(modInfo: ModInfo): Supplier<GuiBase>;
    getModInfoFromConfigScreen(clazz: Class<GuiBase>): ModInfo;
    registerConfigScreenFactory(modInfo: ModInfo): void;
  }

}

declare module 'fi.dy.masa.malilib.gui' {
  import { IConfigInfoProvider, IMessageConsumer, ITextFieldListener, IDialogHandler, IConfigGui, IKeybindConfigGui, IGuiIcon, IStringListConsumer } from 'fi.dy.masa.malilib.gui.interfaces';
  import { IConfigBase, IConfigInteger, IConfigColorList, IConfigLockedList, IConfigStringList } from 'fi.dy.masa.malilib.config';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { IStringConsumer, ICompletionListener, IConfirmationListener, IStringListProvider, IStringConsumerFeedback } from 'fi.dy.masa.malilib.interfaces';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Minecraft } from 'net.minecraft.client';
  import { Font, GuiGraphics } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';
  import { MessageType } from 'fi.dy.masa.malilib.gui.Message';
  import { IButtonActionListener, ButtonBase, ConfigButtonKeybind } from 'fi.dy.masa.malilib.gui.button';
  import { TextFieldWrapper } from 'fi.dy.masa.malilib.gui.wrappers';
  import { WidgetBase, WidgetLabel, WidgetColorListEditEntry, WidgetColorListEdit, WidgetConfigOption, WidgetListConfigOptions, WidgetLockedListEditEntry, WidgetListLockedListEdit, WidgetStringListEditEntry, WidgetListStringListEdit, WidgetStringListEntry, WidgetListStringSelection } from 'fi.dy.masa.malilib.gui.widgets';
  import { List, Collection } from 'java.util';
  import { BufferBuilder } from 'com.mojang.blaze3d.vertex';
  import { Color4f } from 'fi.dy.masa.malilib.util';
  import { ConfigOptionWrapper } from 'fi.dy.masa.malilib.gui.GuiConfigsBase';
  import { Runnable, Enum } from 'java.lang';
  import { ButtonPressDirtyListenerSimple } from 'fi.dy.masa.malilib.config.gui';
  import { IKeybind } from 'fi.dy.masa.malilib.hotkeys';
  import { EditBox } from 'net.minecraft.client.gui.components';
  import { BufferSource } from 'MultiBufferSource';

  interface ConfigInfoProviderSimple extends IConfigInfoProvider {}
  class ConfigInfoProviderSimple extends IConfigInfoProvider {
    constructor(prefix: string, suffix: string);
    getHoverInfo(config: IConfigBase): string;
  }


  interface GuiBase extends IMessageConsumer, IStringConsumer, Screen {}
  class GuiBase extends IMessageConsumer {
    static readonly TXT_AQUA: string;
    static readonly TXT_BLACK: string;
    static readonly TXT_BLUE: string;
    static readonly TXT_GOLD: string;
    static readonly TXT_GRAY: string;
    static readonly TXT_GREEN: string;
    static readonly TXT_RED: string;
    static readonly TXT_WHITE: string;
    static readonly TXT_YELLOW: string;
    static readonly TXT_BOLD: string;
    static readonly TXT_ITALIC: string;
    static readonly TXT_RST: string;
    static readonly TXT_STRIKETHROUGH: string;
    static readonly TXT_UNDERLINE: string;
    static readonly TXT_DARK_AQUA: string;
    static readonly TXT_DARK_BLUE: string;
    static readonly TXT_DARK_GRAY: string;
    static readonly TXT_DARK_GREEN: string;
    static readonly TXT_DARK_PURPLE: string;
    static readonly TXT_DARK_RED: string;
    static readonly TXT_LIGHT_PURPLE: string;
    static readonly BG_TEXTURE: ResourceLocation;
    static readonly COLOR_WHITE: number;
    static readonly TOOLTIP_BACKGROUND: number;
    static readonly COLOR_HORIZONTAL_BAR: number;
    readonly mc: Minecraft;
    readonly textRenderer: Font;
    readonly fontHeight: number;
    addButton<T extends ButtonBase>(button: T, listener: IButtonActionListener): T;
    addGuiMessage(type: MessageType, displayTimeMs: number, messageKey: string, ...args: any[]): void;
    addLabel(x: number, y: number, width: number, height: number, textColor: number, ...lines: string[]): WidgetLabel;
    addLabel(x: number, y: number, width: number, height: number, textColor: number, lines: string[]): WidgetLabel;
    addMessage(type: MessageType, messageKey: string, ...args: any[]): void;
    addMessage(type: MessageType, lifeTime: number, messageKey: string, ...args: any[]): void;
    addTextField<T extends GuiTextFieldGeneric>(textField: T, listener: ITextFieldListener<T>): TextFieldWrapper<T>;
    addWidget<T extends WidgetBase>(widget: T): T;
    bindTexture(texture: ResourceLocation): void;
    charTyped(charIn: string, modifiers: number): boolean;
    drawString(drawContext: GuiGraphics, text: string, x: number, y: number, color: number): void;
    drawStringWithShadow(drawContext: GuiGraphics, text: string, x: number, y: number, color: number): void;
    get parent(): Screen;
    get screenHeight(): number;
    get screenWidth(): number;
    get title(): Component;
    get titleString(): string;
    getMaxPrettyNameLength(configs: IConfigBase[]): number;
    getStringWidth(text: string): number;
    init(): void;
    initGui(): void;
    static isAltDown(): boolean;
    static isCtrlDown(): boolean;
    static isMouseOver(mouseX: number, mouseY: number, x: number, y: number, width: number, height: number): boolean;
    isPauseScreen(): boolean;
    static isShiftDown(): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, mouseButton: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, mouseButton: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, horizontalAmount: number, verticalAmount: number): boolean;
    onCharTyped(charIn: string, modifiers: number): boolean;
    onKeyTyped(keyCode: number, scanCode: number, modifiers: number): boolean;
    onMouseClicked(mouseX: number, mouseY: number, mouseButton: number): boolean;
    onMouseReleased(mouseX: number, mouseY: number, mouseButton: number): boolean;
    onMouseScrolled(mouseX: number, mouseY: number, horizontalAmount: number, verticalAmount: number): boolean;
    static openGui(gui: Screen): void;
    render(drawContext: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    resize(mc: Minecraft, width: number, height: number): void;
    set parent(parent: Screen);
    set title(title: string);
    setNextMessageType(type: MessageType): void;
    setString(string: string): void;
  }


  interface GuiColorEditorHSV extends GuiDialogBase {}
  class GuiColorEditorHSV extends GuiDialogBase {
    constructor(config: IConfigInteger, dialogHandler: IDialogHandler, parent: Screen);
    initGui(): void;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    onKeyTyped(keyCode: number, scanCode: number, modifiers: number): boolean;
    onMouseClicked(mouseX: number, mouseY: number, mouseButton: number): boolean;
    onMouseReleased(mouseX: number, mouseY: number, mouseButton: number): boolean;
    removed(): void;
    render(drawContext: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    static renderBarMarkerHorizontalBar(x: number, y: number, z: number, barWidth: number, barHeight: number, value: number, buffer: BufferBuilder): void;
    static renderBarMarkerVerticalBar(x: number, y: number, z: number, barWidth: number, barHeight: number, value: number, buffer: BufferBuilder): void;
    static renderGradientColorBar(x: number, y: number, z: number, width: number, height: number, colorStart: number, colorEnd: number, buffer: BufferBuilder): void;
    static renderHSSelector(xStart: number, yStart: number, z: number, width: number, height: number, hue: number, buffer: BufferBuilder): void;
    static renderHueBar(x: number, y: number, z: number, width: number, height: number, segmentWidth: number, segmentHeight: number, saturation: number, value: number, buffer: BufferBuilder): void;
    static renderHueBarHorizontal(x: number, y: number, z: number, width: number, height: number, saturation: number, value: number, buffer: BufferBuilder): void;
    static renderHueBarSegment(x: number, y: number, z: number, width: number, height: number, segmentWidth: number, segmentHeight: number, color1: number, color2: number, buffer: BufferBuilder): void;
    static renderHueBarVertical(x: number, y: number, z: number, width: number, height: number, saturation: number, value: number, buffer: BufferBuilder): void;
    setPosition(left: number, top: number): void;
  }


  interface GuiColorListEdit extends GuiListBase<Color4f, WidgetColorListEditEntry, WidgetColorListEdit> {}
  class GuiColorListEdit extends GuiListBase<Color4f, WidgetColorListEditEntry, WidgetColorListEdit> {
    constructor(config: IConfigColorList, configGui: IConfigGui, dialogHandler: IDialogHandler, parent: Screen);
    get config(): IConfigColorList;
    initGui(): void;
    onKeyTyped(keyCode: number, scanCode: number, modifiers: number): boolean;
    removed(): void;
    render(drawContext: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface GuiConfigsBase extends IKeybindConfigGui, GuiListBase<ConfigOptionWrapper, WidgetConfigOption, WidgetListConfigOptions> {}
  class GuiConfigsBase extends IKeybindConfigGui {
    constructor(listX: number, listY: number, modId: string, parent: Screen, titleKey: string, ...args: any[]);
    addKeybindChangeListener(listener: Runnable): void;
    clearOptions(): void;
    get buttonPressListener(): ButtonPressDirtyListenerSimple;
    get dialogHandler(): IDialogHandler;
    get hoverInfoProvider(): IConfigInfoProvider;
    get modId(): string;
    initGui(): void;
    onCharTyped(charIn: string, modifiers: number): boolean;
    onKeyTyped(keyCode: number, scanCode: number, modifiers: number): boolean;
    onMouseClicked(mouseX: number, mouseY: number, mouseButton: number): boolean;
    removed(): void;
    set dialogHandler(handler: IDialogHandler);
    set hoverInfoProvider(provider: IConfigInfoProvider);
    setActiveKeybindButton(button: ConfigButtonKeybind): void;
    setConfigWidth(configWidth: number): GuiConfigsBase;
  }


  interface GuiConfirmAction extends ICompletionListener, GuiDialogBase {}
  class GuiConfirmAction extends ICompletionListener {
    constructor(width: number, titleKey: string, listener: IConfirmationListener, parent: Screen, messageKey: string, ...args: any[]);
    addMessage(type: MessageType, lifeTime: number, messageKey: string, ...args: any[]): void;
    addMessage(type: MessageType, messageKey: string, ...args: any[]): void;
    drawContents(drawContext: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    get messageHeight(): number;
    initGui(): void;
    isPauseScreen(): boolean;
    onTaskAborted(): void;
    onTaskCompleted(): void;
    setTextColor(textColor: number): void;
  }


  interface GuiDialogBase extends GuiBase {}
  class GuiDialogBase extends GuiBase {
    centerOnScreen(): void;
    setPosition(left: number, top: number): void;
    setWidthAndHeight(width: number, height: number): void;
  }


  interface GuiKeybindSettings extends GuiDialogBase {}
  class GuiKeybindSettings extends GuiDialogBase {
    constructor(keybind: IKeybind, name: string, dialogHandler: IDialogHandler, parent: Screen);
    initGui(): void;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    onKeyTyped(keyCode: number, scanCode: number, modifiers: number): boolean;
    removed(): void;
    render(drawContext: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface GuiListBase<TYPE = any, WIDGET extends WidgetListEntryBase<TYPE> = any, WIDGETLIST extends WidgetListBase<TYPE, WIDGET> = any> extends GuiBase {}
  class GuiListBase<TYPE = any, WIDGET extends WidgetListEntryBase<TYPE> = any, WIDGETLIST extends WidgetListBase<TYPE, WIDGET> = any> extends GuiBase {
    drawContents(drawContext: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    initGui(): void;
    onCharTyped(charIn: string, modifiers: number): boolean;
    onKeyTyped(keyCode: number, scanCode: number, modifiers: number): boolean;
    onMouseClicked(mouseX: number, mouseY: number, mouseButton: number): boolean;
    onMouseReleased(mouseX: number, mouseY: number, mouseButton: number): boolean;
    onMouseScrolled(mouseX: number, mouseY: number, horizontalAmount: number, verticalAmount: number): boolean;
    removed(): void;
    resize(mc: Minecraft, width: number, height: number): void;
  }


  interface GuiLockedListEdit extends GuiListBase<string, WidgetLockedListEditEntry, WidgetListLockedListEdit> {}
  class GuiLockedListEdit extends GuiListBase<string, WidgetLockedListEditEntry, WidgetListLockedListEdit> {
    constructor(config: IConfigLockedList, configGui: IConfigGui, dialogHandler: IDialogHandler, parent: Screen);
    get config(): IConfigLockedList;
    initGui(): void;
    onKeyTyped(keyCode: number, scanCode: number, modifiers: number): boolean;
    removed(): void;
    render(drawContext: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface GuiRenderLayerEditBase extends GuiBase {}
  class GuiRenderLayerEditBase extends GuiBase {
  }


  class GuiScrollBar {
    constructor();

    constructor(barTexture: IGuiIcon);
    get maxValue(): number;
    get value(): number;
    handleDrag(mouseY: number, barTravel: number): void;
    offsetValue(offset: number): void;
    render(mouseX: number, mouseY: number, partialTicks: number, xPosition: number, yPosition: number, width: number, height: number, totalHeight: number): void;
    set maxValue(maxValue: number);
    set value(value: number);
    setIsDragging(isDragging: boolean): void;
    setRenderBarBackground(render: boolean): GuiScrollBar;
    wasMouseOver(): boolean;
  }


  interface GuiStringListEdit extends GuiListBase<string, WidgetStringListEditEntry, WidgetListStringListEdit> {}
  class GuiStringListEdit extends GuiListBase<string, WidgetStringListEditEntry, WidgetListStringListEdit> {
    constructor(config: IConfigStringList, configGui: IConfigGui, dialogHandler: IDialogHandler, parent: Screen);
    get config(): IConfigStringList;
    initGui(): void;
    onKeyTyped(keyCode: number, scanCode: number, modifiers: number): boolean;
    removed(): void;
    render(drawContext: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface GuiStringListSelection extends IStringListProvider, GuiListBase<string, WidgetStringListEntry, WidgetListStringSelection> {}
  class GuiStringListSelection extends IStringListProvider {
    constructor(strings: Collection<string>, consumer: IStringListConsumer);
    get strings(): Collection<string>;
    initGui(): void;
  }


  interface GuiTextFieldDouble extends GuiTextFieldGeneric {}
  class GuiTextFieldDouble extends GuiTextFieldGeneric {
    constructor(x: number, y: number, width: number, height: number, fontRenderer: Font);
    test(input: string): boolean;
  }


  interface GuiTextFieldGeneric extends EditBox {}
  class GuiTextFieldGeneric extends EditBox {
    constructor(x: number, y: number, width: number, height: number, textRenderer: Font);
    charTypedWrapper(chr: string, modifiers: number): boolean;
    get cursorWrapper(): number;
    get textWrapper(): string;
    get widthWrapper(): number;
    get x(): number;
    get xWrapper(): number;
    get y(): number;
    get yWrapper(): number;
    isFocusedWrapper(): boolean;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    keyPressedWrapper(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, mouseButton: number): boolean;
    mouseClickedWrapper(mouseX: number, mouseY: number, mouseButton: number): boolean;
    renderWidget(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    renderWrapper(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    set textWrapper(text: string);
    set x(x: number);
    set xWrapper(x: number);
    set y(y: number);
    set yWrapper(y: number);
    setFocusedWrapper(focus: boolean): void;
    setMaxLengthWrapper(length: number): void;
    setZLevel(zLevel: number): GuiTextFieldGeneric;
  }


  interface GuiTextFieldInteger extends GuiTextFieldGeneric {}
  class GuiTextFieldInteger extends GuiTextFieldGeneric {
    constructor(x: number, y: number, width: number, height: number, fontRenderer: Font);
    test(input: string): boolean;
  }


  interface GuiTextInput extends ICompletionListener, GuiTextInputBase {}
  class GuiTextInput extends ICompletionListener {
    constructor(maxTextLength: number, titleKey: string, defaultText: string, parent: Screen, consumer: IStringConsumer);

    constructor(maxTextLength: number, titleKey: string, defaultText: string, parent: Screen, consumer: IStringConsumerFeedback);
    addMessage(type: MessageType, lifeTime: number, messageKey: string, ...args: any[]): void;
    addMessage(type: MessageType, messageKey: string, ...args: any[]): void;
    onTaskAborted(): void;
    onTaskCompleted(): void;
  }


  interface GuiTextInputBase extends GuiDialogBase {}
  class GuiTextInputBase extends GuiDialogBase {
    constructor(maxTextLength: number, titleKey: string, defaultText: string, parent: Screen);
    drawContents(drawContext: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    initGui(): void;
    isPauseScreen(): boolean;
    onCharTyped(charIn: string, modifiers: number): boolean;
    onKeyTyped(keyCode: number, scanCode: number, modifiers: number): boolean;
    onMouseClicked(mouseX: number, mouseY: number, button: number): boolean;
  }


  interface GuiTextInputFeedback extends GuiTextInputBase {}
  class GuiTextInputFeedback extends GuiTextInputBase {
    constructor(maxTextLength: number, titleKey: string, defaultText: string, parent: Screen, consumer: IStringConsumerFeedback);
  }


  interface LeftRight extends Enum<LeftRight> {}
  class LeftRight extends Enum<LeftRight> {
    static readonly LEFT: LeftRight;
    static readonly RIGHT: LeftRight;
    static readonly CENTER: LeftRight;
    static valueOf(name: string): LeftRight;
    static values(): LeftRight[];
  }


  interface MalilibDrawContext extends GuiGraphics {}
  class MalilibDrawContext extends GuiGraphics {
    constructor(client: Minecraft, vertexConsumers: BufferSource);
    flush(): void;
  }


  interface MaLiLibIcons extends Enum<MaLiLibIcons> {}
  class MaLiLibIcons extends Enum<MaLiLibIcons> {
    static readonly ARROW_UP: MaLiLibIcons;
    static readonly ARROW_DOWN: MaLiLibIcons;
    static readonly PLUS: MaLiLibIcons;
    static readonly MINUS: MaLiLibIcons;
    static readonly BTN_SLIDER: MaLiLibIcons;
    static readonly BTN_TXTFIELD: MaLiLibIcons;
    static readonly BTN_PLUSMINUS_16: MaLiLibIcons;
    static readonly SEARCH: MaLiLibIcons;
    get height(): number;
    get texture(): ResourceLocation;
    get u(): number;
    get v(): number;
    get width(): number;
    renderAt(x: number, y: number, zLevel: number, enabled: boolean, selected: boolean): void;
    static valueOf(name: string): MaLiLibIcons;
    static values(): MaLiLibIcons[];
  }


  class Message {
    constructor(type: MessageType, displayTimeMs: number, maxLineLength: number, message: string, ...args: any[]);
    get formatCode(): string;
    get messageHeight(): number;
    hasExpired(currentTime: number): boolean;
    renderAt(x: number, y: number, textColor: number, drawContext: GuiGraphics): number;
    setMessage(message: string): void;
  }

}

declare module 'fi.dy.masa.malilib.gui.GuiConfigsBase' {
  import { IConfigBase } from 'fi.dy.masa.malilib.config';
  import { Type } from 'fi.dy.masa.malilib.gui.GuiConfigsBase.ConfigOptionWrapper';
  import { List, Collection } from 'java.util';

  class ConfigOptionWrapper {
    constructor(config: IConfigBase);

    constructor(label: string);
    static createFor(configs: Collection<IConfigBase>): ConfigOptionWrapper[];
    get config(): IConfigBase;
    get label(): string;
    get type(): Type;
  }

}

declare module 'fi.dy.masa.malilib.gui.GuiConfigsBase.ConfigOptionWrapper' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Type extends Enum<Type> {}
  class Type extends Enum<Type> {
    static readonly CONFIG: Type;
    static readonly LABEL: Type;
    static valueOf(name: string): Type;
    static values(): Type[];
  }

}

declare module 'fi.dy.masa.malilib.gui.GuiRenderLayerEditBase.ButtonListenerLayerEdit' {
  import { Enum } from 'java.lang';
  import { LayerRange } from 'fi.dy.masa.malilib.util';
  import { List } from 'java.util';

  interface Type extends Enum<Type> {}
  class Type extends Enum<Type> {
    static readonly MODE: Type;
    static readonly AXIS: Type;
    static readonly SET_HERE: Type;
    getDisplayName(layerRange: LayerRange): string;
    static valueOf(name: string): Type;
    static values(): Type[];
  }

}

declare module 'fi.dy.masa.malilib.gui.GuiRenderLayerEditBase' {
  import { ISelectionListener } from 'fi.dy.masa.malilib.gui.interfaces';
  import { WidgetCheckBox } from 'fi.dy.masa.malilib.gui.widgets';
  import { LayerRange } from 'fi.dy.masa.malilib.util';

  interface RangeHotkeyListener extends ISelectionListener<WidgetCheckBox> {}
  class RangeHotkeyListener extends ISelectionListener<WidgetCheckBox> {
    constructor(layerRange: LayerRange, isMax: boolean);
    onSelectionChange(entry: WidgetCheckBox): void;
  }

}

declare module 'fi.dy.masa.malilib.gui.GuiStringListSelection.ButtonListener' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Type extends Enum<Type> {}
  class Type extends Enum<Type> {
    static readonly OK: Type;
    static readonly CANCEL: Type;
    getDisplayName(...args: any[]): string;
    static valueOf(name: string): Type;
    static values(): Type[];
  }

}

declare module 'fi.dy.masa.malilib.gui.interfaces' {
  import { List, Collection } from 'java.util';
  import { ConfigOptionWrapper } from 'fi.dy.masa.malilib.gui.GuiConfigsBase';
  import { ButtonPressDirtyListenerSimple } from 'fi.dy.masa.malilib.config.gui';
  import { IConfigBase } from 'fi.dy.masa.malilib.config';
  import { GuiBase } from 'fi.dy.masa.malilib.gui';
  import { File } from 'java.io';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Runnable } from 'java.lang';
  import { ConfigButtonKeybind } from 'fi.dy.masa.malilib.gui.button';
  import { MessageType } from 'fi.dy.masa.malilib.gui.Message';

  class IConfigGui {
    clearOptions(): void;
    get buttonPressListener(): ButtonPressDirtyListenerSimple;
    get configs(): ConfigOptionWrapper[];
    get dialogHandler(): IDialogHandler;
    get hoverInfoProvider(): IConfigInfoProvider;
    get modId(): string;
  }


  class IConfigInfoProvider {
    getHoverInfo(var1: IConfigBase): string;
  }


  class IDialogHandler {
    closeDialog(): void;
    openDialog(var1: GuiBase): void;
  }


  class IDirectoryCache {
    getCurrentDirectoryForContext(var1: string): File;
    setCurrentDirectoryForContext(var1: string, var2: File): void;
  }


  class IDirectoryNavigator {
    get currentDirectory(): File;
    switchToDirectory(var1: File): void;
    switchToParentDirectory(): void;
    switchToRootDirectory(): void;
  }


  class IFileBrowserIconProvider {
    get iconCreateDirectory(): IGuiIcon;
    get iconDirectory(): IGuiIcon;
    get iconRoot(): IGuiIcon;
    get iconSearch(): IGuiIcon;
    get iconUp(): IGuiIcon;
    getIconForFile(var1: File): IGuiIcon;
  }


  class IGuiIcon {
    get height(): number;
    get texture(): ResourceLocation;
    get u(): number;
    get v(): number;
    get width(): number;
    renderAt(var1: number, var2: number, var3: number, var4: boolean, var5: boolean): void;
  }


  interface IKeybindConfigGui extends IConfigGui {}
  class IKeybindConfigGui extends IConfigGui {
    addKeybindChangeListener(var1: Runnable): void;
    setActiveKeybindButton(var1: ConfigButtonKeybind): void;
  }


  class IMessageConsumer {
    addMessage(var1: MessageType, var2: string, ...var3: any[]): void;
    addMessage(var1: MessageType, var2: number, var3: string, ...var4: any[]): void;
  }


  class ISelectionListener<T = any> {
    onSelectionChange(var1: T): void;
  }


  class ISliderCallback {
    get formattedDisplayValue(): string;
    get maxSteps(): number;
    get valueRelative(): number;
    set valueRelative(var1: number);
  }


  class IStringListConsumer {
    consume(var1: Collection<string>): boolean;
  }


  class ITextFieldListener<T extends EditBox = any> {
    onGuiClosed(textField: T): boolean;
    onTextChange(var1: T): boolean;
  }

}

declare module 'fi.dy.masa.malilib.gui.Message' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface MessageType extends Enum<MessageType> {}
  class MessageType extends Enum<MessageType> {
    static readonly INFO: MessageType;
    static readonly SUCCESS: MessageType;
    static readonly WARNING: MessageType;
    static readonly ERROR: MessageType;
    get formatting(): string;
    static valueOf(name: string): MessageType;
    static values(): MessageType[];
  }

}

declare module 'fi.dy.masa.malilib.gui.widgets' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { IGuiIcon, ISelectionListener, IDirectoryNavigator, IFileBrowserIconProvider, IDirectoryCache, IDialogHandler, ITextFieldListener, ISliderCallback } from 'fi.dy.masa.malilib.gui.interfaces';
  import { Color4f } from 'fi.dy.masa.malilib.util';
  import { IntConsumer } from 'java.util.function';
  import { IConfigInteger, IConfigColorList, IConfigLockedList, IConfigStringList, IConfigLockedListEntry } from 'fi.dy.masa.malilib.config';
  import { GuiColorListEdit, GuiBase, GuiScrollBar, GuiConfigsBase, GuiTextFieldGeneric, GuiLockedListEdit, GuiStringListEdit, LeftRight } from 'fi.dy.masa.malilib.gui';
  import { DirectoryEntry } from 'fi.dy.masa.malilib.gui.widgets.WidgetFileBrowserBase';
  import { File } from 'java.io';
  import { List, Set } from 'java.util';
  import { IStringRetriever, IStringListProvider } from 'fi.dy.masa.malilib.interfaces';
  import { SimpleDateFormat } from 'java.text';
  import { IKeybind } from 'fi.dy.masa.malilib.hotkeys';
  import { ConfigOptionWrapper } from 'fi.dy.masa.malilib.gui.GuiConfigsBase';
  import { TextFieldWrapper } from 'fi.dy.masa.malilib.gui.wrappers';

  class WidgetBase {
    constructor(x: number, y: number, width: number, height: number);
    bindTexture(texture: ResourceLocation): void;
    canSelectAt(mouseX: number, mouseY: number, mouseButton: number): boolean;
    drawCenteredString(x: number, y: number, color: number, text: string, drawContext: GuiGraphics): void;
    drawCenteredStringWithShadow(x: number, y: number, color: number, text: string, drawContext: GuiGraphics): void;
    drawString(x: number, y: number, color: number, text: string, drawContext: GuiGraphics): void;
    drawStringWithShadow(x: number, y: number, color: number, text: string, drawContext: GuiGraphics): void;
    get height(): number;
    get width(): number;
    get x(): number;
    get y(): number;
    getStringWidth(text: string): number;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    onCharTyped(charIn: string, modifiers: number): boolean;
    onKeyTyped(keyCode: number, scanCode: number, modifiers: number): boolean;
    onMouseClicked(mouseX: number, mouseY: number, mouseButton: number): boolean;
    onMouseReleased(mouseX: number, mouseY: number, mouseButton: number): void;
    onMouseReleasedImpl(mouseX: number, mouseY: number, mouseButton: number): void;
    onMouseScrolled(mouseX: number, mouseY: number, horizontalAmount: number, verticalAmount: number): boolean;
    onMouseScrolledImpl(mouseX: number, mouseY: number, horizontalAmount: number, verticalAmount: number): boolean;
    postRenderHovered(mouseX: number, mouseY: number, selected: boolean, drawContext: GuiGraphics): void;
    render(mouseX: number, mouseY: number, selected: boolean, drawContext: GuiGraphics): void;
    set height(height: number);
    set width(width: number);
    set x(x: number);
    set y(y: number);
    setPosition(x: number, y: number): void;
    setZLevel(zLevel: number): void;
  }


  interface WidgetCheckBox extends WidgetBase {}
  class WidgetCheckBox extends WidgetBase {
    constructor(x: number, y: number, widgetUnchecked: IGuiIcon, widgetChecked: IGuiIcon, text: string);

    constructor(x: number, y: number, widgetUnchecked: IGuiIcon, widgetChecked: IGuiIcon, text: string, hoverInfo: string);
    isChecked(): boolean;
    postRenderHovered(mouseX: number, mouseY: number, selected: boolean, drawContext: GuiGraphics): void;
    render(mouseX: number, mouseY: number, selected: boolean, drawContext: GuiGraphics): void;
    setChecked(checked: boolean): void;
    setChecked(checked: boolean, notifyListener: boolean): void;
    setListener(listener: ISelectionListener<WidgetCheckBox>): void;
  }


  interface WidgetColorIndicator extends WidgetBase {}
  class WidgetColorIndicator extends WidgetBase {
    constructor(x: number, y: number, width: number, height: number, color: Color4f, consumer: IntConsumer);

    constructor(x: number, y: number, width: number, height: number, config: IConfigInteger);
    postRenderHovered(mouseX: number, mouseY: number, selected: boolean, drawContext: GuiGraphics): void;
    render(mouseX: number, mouseY: number, selected: boolean, drawContext: GuiGraphics): void;
  }


  interface WidgetColorListEdit extends WidgetListConfigOptionsBase<Color4f, WidgetColorListEditEntry> {}
  class WidgetColorListEdit extends WidgetListConfigOptionsBase<Color4f, WidgetColorListEditEntry> {
    constructor(x: number, y: number, width: number, height: number, configWidth: number, parent: GuiColorListEdit);
    get config(): IConfigColorList;
  }


  interface WidgetColorListEditEntry extends WidgetConfigOptionBase<Color4f> {}
  class WidgetColorListEditEntry extends WidgetConfigOptionBase<Color4f> {
    constructor(x: number, y: number, width: number, height: number, listIndex: number, isOdd: boolean, initialValue: Color4f, defaultValue: Color4f, parent: WidgetColorListEdit);
    applyNewValueToConfig(): void;
    render(mouseX: number, mouseY: number, selected: boolean, drawContext: GuiGraphics): void;
    wasConfigModified(): boolean;
  }


  interface WidgetConfigOptionBase<TYPE = any> extends WidgetListEntryBase<TYPE> {}
  class WidgetConfigOptionBase<TYPE = any> extends WidgetListEntryBase<TYPE> {
    constructor(x: number, y: number, width: number, height: number, parent: WidgetListConfigOptionsBase<any, any>, entry: TYPE, listIndex: number);
    applyNewValueToConfig(): void;
    canSelectAt(mouseX: number, mouseY: number, mouseButton: number): boolean;
    hasPendingModifications(): boolean;
    onKeyTypedImpl(keyCode: number, scanCode: number, modifiers: number): boolean;
    wasConfigModified(): boolean;
  }


  interface WidgetContainer extends WidgetBase {}
  class WidgetContainer extends WidgetBase {
    constructor(x: number, y: number, width: number, height: number);
    onCharTyped(charIn: string, modifiers: number): boolean;
    onKeyTyped(keyCode: number, scanCode: number, modifiers: number): boolean;
    onMouseClicked(mouseX: number, mouseY: number, mouseButton: number): boolean;
    onMouseReleased(mouseX: number, mouseY: number, mouseButton: number): void;
    onMouseScrolled(mouseX: number, mouseY: number, horizontalAmount: number, verticalAmount: number): boolean;
    postRenderHovered(mouseX: number, mouseY: number, selected: boolean, drawContext: GuiGraphics): void;
    render(mouseX: number, mouseY: number, selected: boolean, drawContext: GuiGraphics): void;
  }


  interface WidgetDirectoryEntry extends WidgetListEntryBase<DirectoryEntry> {}
  class WidgetDirectoryEntry extends WidgetListEntryBase<DirectoryEntry> {
    constructor(x: number, y: number, width: number, height: number, isOdd: boolean, entry: DirectoryEntry, listIndex: number, navigator: IDirectoryNavigator, iconProvider: IFileBrowserIconProvider);
    get directoryEntry(): DirectoryEntry;
    render(mouseX: number, mouseY: number, selected: boolean, drawContext: GuiGraphics): void;
  }


  interface WidgetDirectoryNavigation extends WidgetSearchBar {}
  class WidgetDirectoryNavigation extends WidgetSearchBar {
    constructor(x: number, y: number, width: number, height: number, currentDir: File, rootDir: File, navigator: IDirectoryNavigator, iconProvider: IFileBrowserIconProvider);
    postRenderHovered(mouseX: number, mouseY: number, selected: boolean, drawContext: GuiGraphics): void;
    render(mouseX: number, mouseY: number, selected: boolean, drawContext: GuiGraphics): void;
  }


  interface WidgetDropDownList<T = any> extends WidgetBase {}
  class WidgetDropDownList<T = any> extends WidgetBase {
    constructor(x: number, y: number, width: number, height: number, maxHeight: number, maxVisibleEntries: number, entries: T[]);

    constructor(x: number, y: number, width: number, height: number, maxHeight: number, maxVisibleEntries: number, entries: T[], stringRetriever: IStringRetriever<T>);
    get selectedEntry(): T;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    onMouseReleasedImpl(mouseX: number, mouseY: number, mouseButton: number): void;
    onMouseScrolledImpl(mouseX: number, mouseY: number, horizontalAmount: number, verticalAmount: number): boolean;
    postRenderHovered(mouseX: number, mouseY: number, selected: boolean, drawContext: GuiGraphics): void;
    render(mouseX: number, mouseY: number, selected: boolean, drawContext: GuiGraphics): void;
    set selectedEntry(entry: T);
    setPosition(x: number, y: number): void;
  }


  interface WidgetFileBrowserBase extends IDirectoryNavigator, WidgetListBase<DirectoryEntry, WidgetDirectoryEntry> {}
  class WidgetFileBrowserBase extends IDirectoryNavigator {
    static readonly DATE_FORMAT: SimpleDateFormat;
    constructor(x: number, y: number, width: number, height: number, cache: IDirectoryCache, browserContext: string, defaultDirectory: File, selectionListener: ISelectionListener<DirectoryEntry>, iconProvider: IFileBrowserIconProvider);
    drawContents(drawContext: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    get currentDirectory(): File;
    onKeyTyped(keyCode: number, scanCode: number, modifiers: number): boolean;
    refreshEntries(): void;
    setSize(width: number, height: number): void;
    switchToDirectory(dir: File): void;
    switchToParentDirectory(): void;
    switchToRootDirectory(): void;
  }


  interface WidgetHoverInfo extends WidgetBase {}
  class WidgetHoverInfo extends WidgetBase {
    constructor(x: number, y: number, width: number, height: number, key: string, ...args: any[]);
    addLines(...lines: string[]): void;
    get lines(): string[];
    postRenderHovered(mouseX: number, mouseY: number, selected: boolean, drawContext: GuiGraphics): void;
    render(mouseX: number, mouseY: number, selected: boolean, drawContext: GuiGraphics): void;
  }


  interface WidgetIcon extends WidgetBase {}
  class WidgetIcon extends WidgetBase {
    constructor(x: number, y: number, icon: IGuiIcon);
    render(enabled: boolean, selected: boolean): void;
    render(mouseX: number, mouseY: number, selected: boolean, drawContext: GuiGraphics): void;
  }


  interface WidgetInfoIcon extends WidgetHoverInfo {}
  class WidgetInfoIcon extends WidgetHoverInfo {
    constructor(x: number, y: number, icon: IGuiIcon, key: string, ...args: any[]);
    render(mouseX: number, mouseY: number, selected: boolean, drawContext: GuiGraphics): void;
  }


  interface WidgetKeybindSettings extends WidgetBase {}
  class WidgetKeybindSettings extends WidgetBase {
    static readonly TEXTURE: ResourceLocation;
    constructor(x: number, y: number, width: number, height: number, keybind: IKeybind, keybindName: string, widgetList: WidgetListBase<any, any>, dialogHandler: IDialogHandler);
    postRenderHovered(mouseX: number, mouseY: number, selected: boolean, drawContext: GuiGraphics): void;
    render(mouseX: number, mouseY: number, selected: boolean, drawContext: GuiGraphics): void;
  }


  interface WidgetLabel extends WidgetBase {}
  class WidgetLabel extends WidgetBase {
    constructor(x: number, y: number, width: number, height: number, textColor: number, ...text: string[]);

    constructor(x: number, y: number, width: number, height: number, textColor: number, lines: string[]);
    addLine(key: string, ...args: any[]): void;
    render(mouseX: number, mouseY: number, selected: boolean, drawContext: GuiGraphics): void;
    setBackgroundProperties(borderSize: number, backgroundColor: number, borderULColor: number, borderBRColor: number): void;
    setCentered(centered: boolean): void;
  }


  interface WidgetListBase<TYPE = any, WIDGET extends WidgetListEntryBase<TYPE> = any> extends GuiBase {}
  class WidgetListBase<TYPE = any, WIDGET extends WidgetListEntryBase<TYPE> = any> extends GuiBase {
    constructor(x: number, y: number, width: number, height: number, selectionListener: ISelectionListener<TYPE>);
    clearAllSelections(): void;
    clearSelection(): void;
    drawContents(drawContext: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    get currentEntries(): TYPE[];
    get lastSelectedEntry(): TYPE;
    get scrollbar(): GuiScrollBar;
    get searchBarWidget(): WidgetSearchBar;
    get selectedEntries(): Set<TYPE>;
    initGui(): void;
    onCharTyped(charIn: string, modifiers: number): boolean;
    onKeyTyped(keyCode: number, scanCode: number, modifiers: number): boolean;
    onMouseClicked(mouseX: number, mouseY: number, mouseButton: number): boolean;
    onMouseReleased(mouseX: number, mouseY: number, mouseButton: number): boolean;
    onMouseScrolled(mouseX: number, mouseY: number, horizontalAmount: number, verticalAmount: number): boolean;
    refreshEntries(): void;
    resetScrollbarPosition(): void;
    setLastSelectedEntry(entry: TYPE, index: number): void;
    setSize(width: number, height: number): void;
  }


  interface WidgetListConfigOptions extends WidgetListConfigOptionsBase<ConfigOptionWrapper, WidgetConfigOption> {}
  class WidgetListConfigOptions extends WidgetListConfigOptionsBase<ConfigOptionWrapper, WidgetConfigOption> {
    constructor(x: number, y: number, width: number, height: number, configWidth: number, zLevel: number, useKeybindSearch: boolean, parent: GuiConfigsBase);
    getMaxNameLengthWrapped(wrappers: ConfigOptionWrapper[]): number;
  }


  interface WidgetListConfigOptionsBase<TYPE = any, WIDGET extends WidgetConfigOptionBase<TYPE> = any> extends WidgetListBase<TYPE, WIDGET> {}
  class WidgetListConfigOptionsBase<TYPE = any, WIDGET extends WidgetConfigOptionBase<TYPE> = any> extends WidgetListBase<TYPE, WIDGET> {
    constructor(x: number, y: number, width: number, height: number, configWidth: number);
    addTextField(wrapper: TextFieldWrapper<GuiTextFieldGeneric>): void;
    addTextField<T extends GuiTextFieldGeneric>(textField: T, listener: ITextFieldListener<T>): TextFieldWrapper<T>;
    applyPendingModifications(): void;
    clearConfigsModifiedFlag(): void;
    markConfigsModified(): void;
    onCharTyped(charIn: string, modifiers: number): boolean;
    onKeyTyped(keyCode: number, scanCode: number, modifiers: number): boolean;
    onMouseClicked(mouseX: number, mouseY: number, mouseButton: number): boolean;
    wereConfigsModified(): boolean;
  }


  interface WidgetListEntryBase<TYPE = any> extends WidgetContainer {}
  class WidgetListEntryBase<TYPE = any> extends WidgetContainer {
    constructor(x: number, y: number, width: number, height: number, entry: TYPE, listIndex: number);
    get entry(): TYPE;
    get listIndex(): number;
  }


  interface WidgetListEntrySortable<TYPE = any> extends WidgetListEntryBase<TYPE> {}
  class WidgetListEntrySortable<TYPE = any> extends WidgetListEntryBase<TYPE> {
    constructor(x: number, y: number, width: number, height: number, entry: TYPE, listIndex: number);
  }


  interface WidgetListLockedListEdit extends WidgetListConfigOptionsBase<string, WidgetLockedListEditEntry> {}
  class WidgetListLockedListEdit extends WidgetListConfigOptionsBase<string, WidgetLockedListEditEntry> {
    constructor(x: number, y: number, width: number, height: number, configWidth: number, parent: GuiLockedListEdit);
    get config(): IConfigLockedList;
  }


  interface WidgetListStringListEdit extends WidgetListConfigOptionsBase<string, WidgetStringListEditEntry> {}
  class WidgetListStringListEdit extends WidgetListConfigOptionsBase<string, WidgetStringListEditEntry> {
    constructor(x: number, y: number, width: number, height: number, configWidth: number, parent: GuiStringListEdit);
    get config(): IConfigStringList;
  }


  interface WidgetListStringSelection extends WidgetListBase<string, WidgetStringListEntry> {}
  class WidgetListStringSelection extends WidgetListBase<string, WidgetStringListEntry> {
    constructor(x: number, y: number, width: number, height: number, stringProvider: IStringListProvider);
  }


  interface WidgetLockedListEditEntry extends WidgetConfigOptionBase<string> {}
  class WidgetLockedListEditEntry extends WidgetConfigOptionBase<string> {
    constructor(x: number, y: number, width: number, height: number, listIndex: number, isOdd: boolean, initialValue: IConfigLockedListEntry, defaultValue: IConfigLockedListEntry, parent: WidgetListLockedListEdit);
    applyNewValueToConfig(): void;
    onKeyTypedImpl(keyCode: number, scanCode: number, modifiers: number): boolean;
    render(mouseX: number, mouseY: number, selected: boolean, drawContext: GuiGraphics): void;
    wasConfigModified(): boolean;
  }


  interface WidgetSearchBar extends WidgetBase {}
  class WidgetSearchBar extends WidgetBase {
    constructor(x: number, y: number, width: number, height: number, searchBarOffsetX: number, iconSearch: IGuiIcon, iconAlignment: LeftRight);
    get filter(): string;
    hasFilter(): boolean;
    isSearchOpen(): boolean;
    render(mouseX: number, mouseY: number, selected: boolean, drawContext: GuiGraphics): void;
    setSearchOpen(isOpen: boolean): void;
  }


  interface WidgetSearchBarConfigs extends WidgetSearchBar {}
  class WidgetSearchBarConfigs extends WidgetSearchBar {
    constructor(x: number, y: number, width: number, height: number, searchBarOffsetX: number, iconSearch: IGuiIcon, iconAlignment: LeftRight);
    get keybind(): IKeybind;
    hasFilter(): boolean;
    render(mouseX: number, mouseY: number, selected: boolean, drawContext: GuiGraphics): void;
  }


  interface WidgetSlider extends WidgetBase {}
  class WidgetSlider extends WidgetBase {
    static readonly BUTTON_TEXTURE: ResourceLocation;
    static readonly BUTTON_DISABLE_TEXTURE: ResourceLocation;
    constructor(x: number, y: number, width: number, height: number, callback: ISliderCallback);
    onMouseReleasedImpl(mouseX: number, mouseY: number, mouseButton: number): void;
    render(mouseX: number, mouseY: number, selected: boolean, drawContext: GuiGraphics): void;
  }


  interface WidgetStringListEditEntry extends WidgetConfigOptionBase<string> {}
  class WidgetStringListEditEntry extends WidgetConfigOptionBase<string> {
    constructor(x: number, y: number, width: number, height: number, listIndex: number, isOdd: boolean, initialValue: string, defaultValue: string, parent: WidgetListStringListEdit);
    applyNewValueToConfig(): void;
    render(mouseX: number, mouseY: number, selected: boolean, drawContext: GuiGraphics): void;
    wasConfigModified(): boolean;
  }


  interface WidgetStringListEntry extends WidgetListEntryBase<string> {}
  class WidgetStringListEntry extends WidgetListEntryBase<string> {
    constructor(x: number, y: number, width: number, height: number, isOdd: boolean, entry: string, listIndex: number);
    render(mouseX: number, mouseY: number, selected: boolean, drawContext: GuiGraphics): void;
  }

}

declare module 'fi.dy.masa.malilib.gui.widgets.WidgetColorListEditEntry' {
  import { ConfigOptionChangeListenerTextField } from 'fi.dy.masa.malilib.config.gui';
  import { GuiTextFieldGeneric } from 'fi.dy.masa.malilib.gui';
  import { ButtonBase } from 'fi.dy.masa.malilib.gui.button';

  interface ChangeListenerTextField extends ConfigOptionChangeListenerTextField {}
  class ChangeListenerTextField extends ConfigOptionChangeListenerTextField {
    constructor(textField: GuiTextFieldGeneric, buttonReset: ButtonBase, defaultValue: string);
    onTextChange(textField: GuiTextFieldGeneric): boolean;
  }

}

declare module 'fi.dy.masa.malilib.gui.widgets.WidgetFileBrowserBase' {
  import { Comparable, Enum } from 'java.lang';
  import { File, FileFilter } from 'java.io';
  import { List } from 'java.util';

  interface DirectoryEntry extends Comparable<DirectoryEntry> {}
  class DirectoryEntry extends Comparable<DirectoryEntry> {
    constructor(type: DirectoryEntryType, dir: File, name: string, displaynamePrefix: string);
    compareTo(other: DirectoryEntry): number;
    get directory(): File;
    get displayName(): string;
    get displayNamePrefix(): string;
    get fullPath(): File;
    get name(): string;
    get type(): DirectoryEntryType;
  }


  interface DirectoryEntryType extends Enum<DirectoryEntryType> {}
  class DirectoryEntryType extends Enum<DirectoryEntryType> {
    static readonly INVALID: DirectoryEntryType;
    static readonly DIRECTORY: DirectoryEntryType;
    static readonly FILE: DirectoryEntryType;
    static fromFile(file: File): DirectoryEntryType;
    static valueOf(name: string): DirectoryEntryType;
    static values(): DirectoryEntryType[];
  }


  interface FileFilterDirectories extends FileFilter {}
  class FileFilterDirectories extends FileFilter {
    accept(pathName: File): boolean;
  }

}

declare module 'fi.dy.masa.malilib.gui.widgets.WidgetLockedListEditEntry' {
  import { ConfigOptionChangeListenerTextField } from 'fi.dy.masa.malilib.config.gui';
  import { GuiTextFieldGeneric } from 'fi.dy.masa.malilib.gui';
  import { ButtonBase } from 'fi.dy.masa.malilib.gui.button';
  import { IConfigLockedListEntry } from 'fi.dy.masa.malilib.config';

  interface ChangeListenerTextField extends ConfigOptionChangeListenerTextField {}
  class ChangeListenerTextField extends ConfigOptionChangeListenerTextField {
    constructor(textField: GuiTextFieldGeneric, buttonReset: ButtonBase, defaultValue: IConfigLockedListEntry);
    onTextChange(textField: GuiTextFieldGeneric): boolean;
  }

}

declare module 'fi.dy.masa.malilib.gui.widgets.WidgetStringListEditEntry' {
  import { ConfigOptionChangeListenerTextField } from 'fi.dy.masa.malilib.config.gui';
  import { GuiTextFieldGeneric } from 'fi.dy.masa.malilib.gui';
  import { ButtonBase } from 'fi.dy.masa.malilib.gui.button';

  interface ChangeListenerTextField extends ConfigOptionChangeListenerTextField {}
  class ChangeListenerTextField extends ConfigOptionChangeListenerTextField {
    constructor(textField: GuiTextFieldGeneric, buttonReset: ButtonBase, defaultValue: string);
    onTextChange(textField: GuiTextFieldGeneric): boolean;
  }

}

declare module 'fi.dy.masa.malilib.gui.wrappers' {
  import { ITextFieldListener } from 'fi.dy.masa.malilib.gui.interfaces';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class TextFieldWrapper<T extends GuiTextFieldGeneric = any> {
    constructor(textField: T, listener: ITextFieldListener<T>);
    draw(mouseX: number, mouseY: number, drawContext: GuiGraphics): void;
    get listener(): ITextFieldListener<T>;
    get textField(): T;
    isFocused(): boolean;
    mouseClicked(mouseX: number, mouseY: number, mouseButton: number): boolean;
    onCharTyped(charIn: string, modifiers: number): boolean;
    onGuiClosed(): void;
    onKeyTyped(keyCode: number, scanCode: number, modifiers: number): boolean;
    setFocused(isFocused: boolean): void;
  }

}

declare module 'fi.dy.masa.malilib.hotkeys' {
  import { IConfigValue, IConfigResettable, IStringRepresentable, IConfigOptionListEntry, IConfigBoolean } from 'fi.dy.masa.malilib.config';
  import { List } from 'java.util';
  import { Integer, Enum, Comparable } from 'java.lang';
  import { JsonElement, JsonObject } from 'com.google.gson';
  import { KeyMapping } from 'net.minecraft.client';
  import { Context } from 'fi.dy.masa.malilib.hotkeys.KeybindSettings';

  interface IHotkey extends IConfigValue {}
  class IHotkey extends IConfigValue {
    get defaultStringValue(): string;
    get keybind(): IKeybind;
    get stringValue(): string;
    isModified(): boolean;
    isModified(newValue: string): boolean;
    resetToDefault(): void;
    setValueFromString(value: string): void;
  }


  class IHotkeyCallback {
    onKeyAction(var1: KeyAction, var2: IKeybind): boolean;
  }


  class IInputManager {
    registerKeyboardInputHandler(var1: IKeyboardInputHandler): void;
    registerMouseInputHandler(var1: IMouseInputHandler): void;
    unregisterKeyboardInputHandler(var1: IKeyboardInputHandler): void;
    unregisterMouseInputHandler(var1: IMouseInputHandler): void;
  }


  interface IKeybind extends IConfigResettable, IStringRepresentable {}
  class IKeybind extends IConfigResettable {
    addKey(var1: number): void;
    areSettingsModified(): boolean;
    clearKeys(): void;
    get asJsonElement(): JsonElement;
    get keys(): number[];
    get keysDisplayString(): string;
    get settings(): KeybindSettings;
    isKeybindHeld(): boolean;
    isPressed(): boolean;
    isValid(): boolean;
    matches(var1: number): boolean;
    overlaps(var1: IKeybind): boolean;
    removeKey(var1: number): void;
    resetSettingsToDefaults(): void;
    set settings(var1: KeybindSettings);
    setCallback(var1: IHotkeyCallback): void;
    setValueFromJsonElement(element: JsonElement): void;
    tick(): void;
    updateIsPressed(): boolean;
  }


  class IKeybindManager {
    addHotkeysForCategory(var1: string, var2: string, var3: IHotkey[]): void;
    addKeybindToMap(var1: IKeybind): void;
    get keybindCategories(): KeybindCategory[];
    registerKeybindProvider(var1: IKeybindProvider): void;
    unregisterKeybindProvider(var1: IKeybindProvider): void;
    updateUsedKeys(): void;
  }


  class IKeybindProvider {
    addHotkeys(var1: IKeybindManager): void;
    addKeysToMap(var1: IKeybindManager): void;
  }


  class IKeyboardInputHandler {
    onKeyInput(keyCode: number, scanCode: number, modifiers: number, eventKeyState: boolean): boolean;
  }


  class IMouseInputHandler {
    onMouseClick(mouseX: number, mouseY: number, eventButton: number, eventButtonState: boolean): boolean;
    onMouseMove(mouseX: number, mouseY: number): void;
    onMouseScroll(mouseX: number, mouseY: number, amount: number): boolean;
  }


  interface KeyAction extends Enum<KeyAction> {}
  class KeyAction extends Enum<KeyAction> {
    static readonly PRESS: KeyAction;
    static readonly RELEASE: KeyAction;
    static readonly BOTH: KeyAction;
    cycle(forward: boolean): IConfigOptionListEntry;
    fromString(name: string): KeyAction;
    static fromStringStatic(name: string): KeyAction;
    get displayName(): string;
    get stringValue(): string;
    static valueOf(name: string): KeyAction;
    static values(): KeyAction[];
  }


  interface KeybindCategory extends Comparable<KeybindCategory> {}
  class KeybindCategory extends Comparable<KeybindCategory> {
    constructor(modName: string, categoryName: string, hotkeys: IHotkey[]);
    compareTo(other: KeybindCategory): number;
    equals(obj: any): boolean;
    get category(): string;
    get hotkeys(): IHotkey[];
    get modName(): string;
  }


  interface KeybindMulti extends IKeybind {}
  class KeybindMulti extends IKeybind {
    addKey(keyCode: number): void;
    areSettingsModified(): boolean;
    clearKeys(): void;
    contextOverlaps(other: IKeybind): boolean;
    static fromStorageString(str: string, settings: KeybindSettings): KeybindMulti;
    static get activeKeysString(): string;
    get callback(): IHotkeyCallback;
    get defaultStringValue(): string;
    get keys(): number[];
    get keysDisplayString(): string;
    get settings(): KeybindSettings;
    get stringValue(): string;
    static get triggeredCount(): number;
    static getKeyCode(keybind: KeyMapping): number;
    static getStorageStringForKeyCode(keyCode: number): string;
    static hotkeyMatchesKeybind(hotkey: IHotkey, keybind: KeyMapping): boolean;
    static isKeyDown(keyCode: number): boolean;
    isKeybindHeld(): boolean;
    isModified(): boolean;
    isModified(newValue: string): boolean;
    isPressed(): boolean;
    isValid(): boolean;
    matches(keyCode: number): boolean;
    static onKeyInputPre(keyCode: number, scanCode: number, modifiers: number, action: number): void;
    overlaps(other: IKeybind): boolean;
    static reCheckPressedKeys(): void;
    removeKey(keyCode: number): void;
    resetSettingsToDefaults(): void;
    resetToDefault(): void;
    set callback(callback: IHotkeyCallback);
    set settings(settings: KeybindSettings);
    setValueFromString(str: string): void;
    tick(): void;
    updateIsPressed(): boolean;
  }


  class KeybindSettings {
    static readonly DEFAULT: KeybindSettings;
    static readonly EXCLUSIVE: KeybindSettings;
    static readonly RELEASE: KeybindSettings;
    static readonly RELEASE_ALLOW_EXTRA: KeybindSettings;
    static readonly RELEASE_EXCLUSIVE: KeybindSettings;
    static readonly NOCANCEL: KeybindSettings;
    static readonly PRESS_ALLOWEXTRA: KeybindSettings;
    static readonly PRESS_ALLOWEXTRA_EMPTY: KeybindSettings;
    static readonly PRESS_NON_ORDER_SENSITIVE: KeybindSettings;
    static readonly INGAME_BOTH: KeybindSettings;
    static readonly MODIFIER_INGAME: KeybindSettings;
    static readonly MODIFIER_INGAME_EMPTY: KeybindSettings;
    static readonly MODIFIER_GUI: KeybindSettings;
    static readonly GUI: KeybindSettings;
    static create(context: Context, activateOn: KeyAction, allowExtraKeys: boolean, orderSensitive: boolean, exclusive: boolean, cancel: boolean): KeybindSettings;
    static create(context: Context, activateOn: KeyAction, allowExtraKeys: boolean, orderSensitive: boolean, exclusive: boolean, cancel: boolean, allowEmpty: boolean): KeybindSettings;
    equals(obj: any): boolean;
    static fromJson(obj: JsonObject): KeybindSettings;
    get activateOn(): KeyAction;
    get allowEmpty(): boolean;
    get allowExtraKeys(): boolean;
    get context(): Context;
    isExclusive(): boolean;
    isOrderSensitive(): boolean;
    shouldCancel(): boolean;
    toJson(): JsonObject;
  }


  interface KeyCallbackAdjustable extends IHotkeyCallback {}
  class KeyCallbackAdjustable extends IHotkeyCallback {
    constructor(config: IConfigBoolean, callback: IHotkeyCallback);
    onKeyAction(action: KeyAction, key: IKeybind): boolean;
    static setValueChanged(): void;
  }


  interface KeyCallbackToggleBoolean extends IHotkeyCallback {}
  class KeyCallbackToggleBoolean extends IHotkeyCallback {
    constructor(config: IConfigBoolean);
    onKeyAction(action: KeyAction, key: IKeybind): boolean;
  }


  interface KeyCallbackToggleBooleanConfigWithMessage extends KeyCallbackToggleBoolean {}
  class KeyCallbackToggleBooleanConfigWithMessage extends KeyCallbackToggleBoolean {
    constructor(config: IConfigBoolean);
    onKeyAction(action: KeyAction, key: IKeybind): boolean;
  }

}

declare module 'fi.dy.masa.malilib.hotkeys.KeybindSettings' {
  import { Enum } from 'java.lang';
  import { IConfigOptionListEntry } from 'fi.dy.masa.malilib.config';
  import { List } from 'java.util';

  interface Context extends Enum<Context> {}
  class Context extends Enum<Context> {
    static readonly INGAME: Context;
    static readonly GUI: Context;
    static readonly ANY: Context;
    cycle(forward: boolean): IConfigOptionListEntry;
    fromString(name: string): Context;
    static fromStringStatic(name: string): Context;
    get displayName(): string;
    get stringValue(): string;
    static valueOf(name: string): Context;
    static values(): Context[];
  }

}

declare module 'fi.dy.masa.malilib.interfaces' {
  import { List, Collection } from 'java.util';
  import { Minecraft } from 'net.minecraft.client';
  import { CoordinateType } from 'fi.dy.masa.malilib.util.PositionUtils';
  import { Level } from 'net.minecraft.world.level';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { Entity } from 'net.minecraft.world.entity';
  import { Pair } from 'org.apache.commons.lang3.tuple';
  import { Container } from 'net.minecraft.world';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Refresher, Context } from 'fi.dy.masa.malilib.render.InventoryOverlay';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ProfilerFiller } from 'net.minecraft.util.profiling';
  import { Matrix4f } from 'org.joml';
  import { TooltipContext } from 'Item';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Component } from 'net.minecraft.network.chat';
  import { Supplier } from 'java.util.function';
  import { MinecraftServer } from 'net.minecraft.server';
  import { IntegratedServer } from 'net.minecraft.client.server';
  import { Frozen } from 'RegistryAccess';

  class IClientCommandListener {
    execute(var1: string[], var2: Minecraft): boolean;
    get command(): string;
  }


  class IClientTickHandler {
    onClientTick(var1: Minecraft): void;
  }


  class ICommandDispatcher {
    registerCommand(var1: IClientCommandListener): void;
  }


  class ICompletionListener {
    onTaskAborted(): void;
    onTaskCompleted(): void;
  }


  class IConfirmationListener {
    onActionCancelled(): boolean;
    onActionConfirmed(): boolean;
  }


  class ICoordinateValueModifier {
    modifyValue(var1: CoordinateType, var2: number): boolean;
    setValueFromString(var1: CoordinateType, var2: string): boolean;
  }


  class IDataSyncer {
    get clientWorld(): ClientLevel;
    get world(): Level;
    getBlockInventory(world: Level, pos: BlockPos, useNbt: boolean): Container;
    getEntityInventory(world: Level, entityId: number, useNbt: boolean): Container;
    getFromBlockEntityCache(pos: BlockPos): BlockEntity;
    getFromBlockEntityCacheNbt(pos: BlockPos): CompoundTag;
    getFromEntityCache(entityId: number): Entity;
    getFromEntityCacheNbt(entityId: number): CompoundTag;
    handleBlockEntityData(pos: BlockPos, nbt: CompoundTag, type: ResourceLocation): BlockEntity;
    handleBulkEntityData(transactionId: number, nbt: CompoundTag): void;
    handleEntityData(entityId: number, nbt: CompoundTag): Entity;
    handleVanillaQueryNbt(transactionId: number, nbt: CompoundTag): void;
    onGameInit(): void;
    onWorldJoin(): void;
    onWorldPre(): void;
    requestBlockEntity(world: Level, pos: BlockPos): Pair<BlockEntity, CompoundTag>;
    requestEntity(world: Level, entityId: number): Pair<Entity, CompoundTag>;
    reset(isLogout: boolean): void;
  }


  class IInitializationDispatcher {
    registerInitializationHandler(var1: IInitializationHandler): void;
  }


  class IInitializationHandler {
    registerModHandlers(): void;
  }


  class IInventoryOverlayHandler {
    get dataSyncer(): IDataSyncer;
    get modId(): string;
    get refreshHandler(): Refresher;
    get renderContextNullable(): Context;
    getRenderContext(var1: GuiGraphics, var2: ProfilerFiller, var3: Minecraft): Context;
    getTargetInventory(var1: Minecraft): Context;
    getTargetInventoryFromBlock(var1: Level, var2: BlockPos, var3: BlockEntity, var4: CompoundTag): Context;
    getTargetInventoryFromEntity(var1: Entity, var2: CompoundTag): Context;
    isEmpty(): boolean;
    refreshInventoryOverlay(mc: Minecraft, shulkerBGColors: boolean, villagerBGColors: boolean): void;
    refreshInventoryOverlay(mc: Minecraft, shulkerBGColors: boolean): void;
    refreshInventoryOverlay(mc: Minecraft): void;
    renderInventoryOverlay(context: Context, drawContext: GuiGraphics, mc: Minecraft, shulkerBGColors: boolean, villagerBGColors: boolean): void;
    renderInventoryOverlay(context: Context, drawContext: GuiGraphics, mc: Minecraft, shulkerBGColors: boolean): void;
    renderInventoryOverlay(context: Context, drawContext: GuiGraphics, mc: Minecraft): void;
    requestBlockEntityAt(world: Level, pos: BlockPos): Pair<BlockEntity, CompoundTag>;
    set dataSyncer(var1: IDataSyncer);
  }


  class IRangeChangeListener {
    updateAll(): void;
    updateBetweenX(var1: number, var2: number): void;
    updateBetweenY(var1: number, var2: number): void;
    updateBetweenZ(var1: number, var2: number): void;
  }


  class IRenderDispatcher {
    registerGameOverlayRenderer(var1: IRenderer): void;
    registerTooltipLastRenderer(var1: IRenderer): void;
    registerWorldLastRenderer(var1: IRenderer): void;
  }


  class IRenderer {
    get profilerSectionSupplier(): Supplier<string>;
    onRenderGameOverlayLastDrawer(drawContext: GuiGraphics, partialTicks: number, profiler: ProfilerFiller, mc: Minecraft): void;
    onRenderGameOverlayPost(drawContext: GuiGraphics): void;
    onRenderTooltipComponentInsertFirst(context: TooltipContext, stack: ItemStack, list: Component[]): void;
    onRenderTooltipComponentInsertLast(context: TooltipContext, stack: ItemStack, list: Component[]): void;
    onRenderTooltipComponentInsertMiddle(context: TooltipContext, stack: ItemStack, list: Component[]): void;
    onRenderTooltipLast(drawContext: GuiGraphics, stack: ItemStack, x: number, y: number): void;
    onRenderWorldLast(posMatrix: Matrix4f, projMatrix: Matrix4f): void;
  }


  class IServerListener {
    onServerIntegratedSetup(server: IntegratedServer): void;
    onServerOpenToLan(server: IntegratedServer): void;
    onServerStarted(server: MinecraftServer): void;
    onServerStarting(server: MinecraftServer): void;
    onServerStopped(server: MinecraftServer): void;
    onServerStopping(server: MinecraftServer): void;
  }


  class IStringConsumer {
    setString(var1: string): void;
  }


  class IStringConsumerFeedback {
    setString(var1: string): boolean;
  }


  class IStringListProvider {
    get strings(): Collection<string>;
  }


  class IStringRetriever<T = any> {
    getStringValue(var1: T): string;
  }


  class IStringValue {
    get stringValue(): string;
  }


  class IValueChangeCallback<T extends IConfigBase = any> {
    onValueChanged(var1: T): void;
  }


  class IWorldLoadListener {
    onWorldLoadImmutable(immutable: Frozen): void;
    onWorldLoadPost(worldBefore: ClientLevel, worldAfter: ClientLevel, mc: Minecraft): void;
    onWorldLoadPre(worldBefore: ClientLevel, worldAfter: ClientLevel, mc: Minecraft): void;
  }

}

declare module 'fi.dy.masa.malilib.interoperation' {
  import { BlockPos } from 'net.minecraft.core';

  class BlockPlacementPositionHandler {
    get currentPlacementPosition(): BlockPos;
    registerPositionProvider(provider: IBlockPlacementPositionProvider): void;
    unregisterPositionProvider(provider: IBlockPlacementPositionProvider): void;
  }


  class IBlockPlacementPositionProvider {
    get placementPosition(): BlockPos;
  }

}

declare module 'fi.dy.masa.malilib' {
  import { Logger } from 'org.apache.logging.log4j';
  import { GuiConfigsBase } from 'fi.dy.masa.malilib.gui';
  import { ImmutableList } from 'com.google.common.collect';
  import { List } from 'java.util';
  import { ConfigOptionWrapper } from 'fi.dy.masa.malilib.gui.GuiConfigsBase';
  import { IConfigHandler } from 'fi.dy.masa.malilib.config';
  import { IInitializationHandler } from 'fi.dy.masa.malilib.interfaces';
  import { IKeybindProvider, IKeybindManager } from 'fi.dy.masa.malilib.hotkeys';

  class MaLiLib {
    static readonly LOGGER: Logger;
    static debugLog(key: string, ...args: any[]): void;
    onInitialize(): void;
  }


  interface MaLiLibConfigGui extends GuiConfigsBase {}
  class MaLiLibConfigGui extends GuiConfigsBase {
    static TEST_ENUM_LIST: ImmutableList;
    constructor();
    get configs(): ConfigOptionWrapper[];
    initGui(): void;
  }


  interface MaLiLibConfigs extends IConfigHandler {}
  class MaLiLibConfigs extends IConfigHandler {
    load(): void;
    static loadFromFile(): void;
    onConfigsChanged(): void;
    save(): void;
    static saveToFile(): void;
  }


  interface MaLiLibInitHandler extends IInitializationHandler {}
  class MaLiLibInitHandler extends IInitializationHandler {
    registerModHandlers(): void;
  }


  interface MaLiLibInputHandler extends IKeybindProvider {}
  class MaLiLibInputHandler extends IKeybindProvider {
    addHotkeys(manager: IKeybindManager): void;
    addKeysToMap(manager: IKeybindManager): void;
    static get instance(): MaLiLibInputHandler;
  }


  class MaLiLibReference {
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static readonly MOD_VERSION: string;
    static readonly DEBUG_MODE: boolean;
    static readonly ANSI_MODE: boolean;
    static readonly EXPERIMENTAL_MODE: boolean;
  }

}

declare module 'fi.dy.masa.malilib.MaLiLibConfigGui' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ConfigGuiTab extends Enum<ConfigGuiTab> {}
  class ConfigGuiTab extends Enum<ConfigGuiTab> {
    static readonly GENERIC: ConfigGuiTab;
    static readonly DEBUG: ConfigGuiTab;
    static readonly TEST: ConfigGuiTab;
    static readonly TEST_ENUM: ConfigGuiTab;
    static readonly EXPERIMENTAL: ConfigGuiTab;
    get displayName(): string;
    static valueOf(name: string): ConfigGuiTab;
    static values(): ConfigGuiTab[];
  }

}

declare module 'fi.dy.masa.malilib.MaLiLibConfigs' {
  import { ConfigHotkey, ConfigInteger, ConfigFloat, ConfigBooleanHotkeyed, ConfigBoolean, ConfigString, ConfigColor, ConfigColorList, ConfigDouble, ConfigOptionList, ConfigStringList, ConfigLockedList } from 'fi.dy.masa.malilib.config.options';
  import { ImmutableList } from 'com.google.common.collect';
  import { List } from 'java.util';

  class Generic {
    static readonly IGNORED_KEYS: ConfigHotkey;
    static readonly OPEN_GUI_CONFIGS: ConfigHotkey;
    static readonly ACTIONBAR_HUD_TICKS: ConfigInteger;
    static readonly IN_GAME_MESSAGE_TIMEOUT: ConfigFloat;
    static readonly ENABLE_CONFIG_SWITCHER: ConfigBooleanHotkeyed;
    static readonly REALMS_COMMON_CONFIG: ConfigBoolean;
    static readonly OPTIONS: ImmutableList;
    static readonly HOTKEY_LIST: List;
  }


  class Debug {
    static readonly DEBUG_MESSAGES: ConfigBoolean;
    static readonly CONFIG_ELEMENT_DEBUG: ConfigBoolean;
    static readonly INPUT_CANCELLATION_DEBUG: ConfigBoolean;
    static readonly KEYBIND_DEBUG: ConfigBoolean;
    static readonly KEYBIND_DEBUG_ACTIONBAR: ConfigBoolean;
    static readonly MOUSE_SCROLL_DEBUG: ConfigBoolean;
    static readonly PRINT_TRANSLATION_KEYS: ConfigBoolean;
    static readonly OPTIONS: ImmutableList;
    static readonly HOTKEY_LIST: List;
  }


  class Experimental {
    static readonly SORT_CONFIGS_BY_NAME: ConfigBoolean;
    static readonly SORT_EXTENSION_MOD_OPTIONS: ConfigBoolean;
    static readonly ACTIVE_CONFIG_PROFILE: ConfigString;
    static readonly OPTIONS: ImmutableList;
  }


  class Test {
    static readonly TEST_CONFIG_BOOLEAN: ConfigBoolean;
    static readonly TEST_CONFIG_BOOLEAN_HOTKEYED: ConfigBooleanHotkeyed;
    static readonly TEST_CONFIG_COLOR: ConfigColor;
    static readonly TEST_CONFIG_COLOR_LIST: ConfigColorList;
    static readonly TEST_CONFIG_DOUBLE: ConfigDouble;
    static readonly TEST_CONFIG_FLOAT: ConfigFloat;
    static readonly TEST_CONFIG_HOTKEY: ConfigHotkey;
    static readonly TEST_CONFIG_INTEGER: ConfigInteger;
    static readonly TEST_CONFIG_OPTIONS_LIST: ConfigOptionList;
    static readonly TEST_CONFIG_STRING: ConfigString;
    static readonly TEST_CONFIG_STRING_LIST: ConfigStringList;
    static readonly TEST_CONFIG_LOCKED_LIST: ConfigLockedList;
    static readonly TEST_BUNDLE_PREVIEW_WIDTH: ConfigInteger;
    static readonly TEST_INVENTORY_OVERLAY: ConfigBooleanHotkeyed;
    static readonly TEST_INVENTORY_OVERLAY_OG: ConfigBooleanHotkeyed;
    static readonly TEST_INVENTORY_OVERLAY_TOGGLE: ConfigHotkey;
    static readonly TEST_GUI_KEYBIND: ConfigHotkey;
    static readonly TEST_DATE_TIME_OPTION: ConfigOptionList;
    static readonly TEST_DURATION_OPTION: ConfigOptionList;
    static readonly TEST_RUN_DATETIME_TEST: ConfigHotkey;
    static readonly OPTIONS: ImmutableList;
    static readonly HOTKEY_LIST: List;
  }

}

declare module 'fi.dy.masa.malilib.mixin.entity' {
  import { SimpleContainer, Container } from 'net.minecraft.world';
  import { BodyType } from 'AnimalArmorItem';
  import { MerchantOffers } from 'net.minecraft.world.item.trading';
  import { PlayerEnderChestContainer } from 'net.minecraft.world.inventory';
  import { Entity, EntityType } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { IEntityOwnedInventory } from 'fi.dy.masa.malilib.util';

  class IMixinAbstractHorseEntity {
    malilib_getHorseInventory(): SimpleContainer;
  }


  class IMixinAnimalArmorItem {
    malilib_getAnimalArmorType(): BodyType;
  }


  class IMixinMerchantEntity {
    malilib_offers(): MerchantOffers;
  }


  class IMixinPiglinEntity {
    malilib_getInventory(): SimpleContainer;
  }


  class IMixinPlayerEntity {
    malilib_getEnderItems(): PlayerEnderChestContainer;
  }


  interface MixinHorseEntity extends Entity {}
  class MixinHorseEntity extends Entity {
    constructor(type: EntityType<any>, world: Level);
  }


  interface MixinPiglinEntity extends Entity {}
  class MixinPiglinEntity extends Entity {
    constructor(type: EntityType<any>, world: Level);
  }


  interface MixinSimpleInventory extends IEntityOwnedInventory, Container {}
  class MixinSimpleInventory extends IEntityOwnedInventory {
    malilib$getEntityOwner(): Entity;
    malilib$setEntityOwner(entityOwner: Entity): void;
  }

}

declare module 'fi.dy.masa.malilib.mixin.hud' {
  import { IGameHud } from 'fi.dy.masa.malilib.util.game';

  interface MixinInGameHud extends IGameHud {}
  class MixinInGameHud extends IGameHud {
    malilib$setOverlayRemaining(ticks: number): void;
  }

}

declare module 'fi.dy.masa.malilib.mixin.input' {
  import { IF3KeyStateSetter } from 'fi.dy.masa.malilib.util';

  interface MixinKeyboard extends IF3KeyStateSetter {}
  class MixinKeyboard extends IF3KeyStateSetter {
    malilib$setF3KeyState(value: boolean): void;
  }


  class MixinMouse {
  }

}

declare module 'fi.dy.masa.malilib.mixin.item' {
  import { NonNullList } from 'net.minecraft.core';
  import { ItemStack } from 'net.minecraft.world.item';

  class IMixinContainerComponent {
    malilib_getStacks(): NonNullList<ItemStack>;
  }


  class MixinItemStack {
  }

}

declare module 'fi.dy.masa.malilib.mixin' {
  import { ClientLevel } from 'net.minecraft.client.multiplayer';

  class MixinMinecraftClient {
    level: ClientLevel;
  }

}

declare module 'fi.dy.masa.malilib.mixin.network' {
  class IMixinDataQueryHandler {
    malilib_currentTransactionId(): number;
  }


  class MixinClientConfigurationNetworkHandler {
  }


  class MixinClientPlayNetworkHandler {
  }

}

declare module 'fi.dy.masa.malilib.mixin.render' {
  class MixinDrawContext {
  }


  class MixinWorldRenderer {
  }

}

declare module 'fi.dy.masa.malilib.mixin.screen' {
  import { Slot } from 'net.minecraft.world.inventory';
  import { Screen } from 'net.minecraft.client.gui.screens';

  class IMixinHandledScreen {
    malilib_getFocusedSlot(): Slot;
  }


  interface MixinChatScreen extends Screen {}
  class MixinChatScreen extends Screen {
  }


  class MixinHandledScreen {
  }


  class MixinInventoryScreen {
  }

}

declare module 'fi.dy.masa.malilib.mixin.server' {
  class MixinIntegratedServer {
  }


  class MixinMinecraftServer {
  }

}

declare module 'fi.dy.masa.malilib.mixin.test' {
  class MixinBundleItem {
  }

}

declare module 'fi.dy.masa.malilib.network' {
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { FriendlyByteBuf, RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { PlayPayloadHandler, Context } from 'ClientPlayNetworking';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { ClientPacketListener } from 'net.minecraft.client.multiplayer';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ByteBuf } from 'io.netty.buffer';

  interface ClientPlayHandler<T extends CustomPacketPayload = any> extends IClientPlayHandler {}
  class ClientPlayHandler<T extends CustomPacketPayload = any> extends IClientPlayHandler {
    static get instance(): IClientPlayHandler;
    registerClientPlayHandler<P extends CustomPacketPayload>(handler: IPluginClientPlayHandler<P>): void;
    reset(channel: ResourceLocation): void;
    unregisterClientPlayHandler<P extends CustomPacketPayload>(handler: IPluginClientPlayHandler<P>): void;
  }


  class IClientPayloadData {
    clear(): void;
    static fromPacket<T extends IClientPayloadData>(input: FriendlyByteBuf): T;
    get packetType(): number;
    get totalSize(): number;
    get version(): number;
    isEmpty(): boolean;
    toPacket(var1: FriendlyByteBuf): void;
  }


  class IClientPlayHandler {
    registerClientPlayHandler<P extends CustomPacketPayload>(var1: IPluginClientPlayHandler<P>): void;
    unregisterClientPlayHandler<P extends CustomPacketPayload>(var1: IPluginClientPlayHandler<P>): void;
  }


  interface IPluginClientPlayHandler<T extends CustomPacketPayload = any> extends PlayPayloadHandler<T> {}
  class IPluginClientPlayHandler<T extends CustomPacketPayload = any> extends PlayPayloadHandler<T> {
    static readonly FROM_SERVER: number;
    static readonly TO_SERVER: number;
    static readonly BOTH_SERVER: number;
    static readonly TO_CLIENT: number;
    static readonly FROM_CLIENT: number;
    static readonly BOTH_CLIENT: number;
    decodeByteBuf(channel: ResourceLocation, data: MaLiLibBuf): void;
    decodeClientData<P extends IClientPayloadData>(channel: ResourceLocation, data: P): void;
    decodeNbtCompound(channel: ResourceLocation, data: CompoundTag): void;
    decodeObject<D>(channel: ResourceLocation, data1: D): void;
    encodeByteBuf(data: MaLiLibBuf): void;
    encodeClientData<P extends IClientPayloadData>(data: P): void;
    encodeNbtCompound(data: CompoundTag): void;
    encodeObject<D>(data1: D): void;
    encodeWithSplitter(var1: FriendlyByteBuf, var2: ClientPacketListener): void;
    get payloadChannel(): ResourceLocation;
    isPlayRegistered(var1: ResourceLocation): boolean;
    receivePlayPayload(var1: T, var2: Context): void;
    receivePlayPayload(payload: T, handler: ClientPacketListener, ci: CallbackInfo): void;
    registerPlayPayload(id: Type<T>, codec: StreamCodec<RegistryFriendlyByteBuf, T>, direction: number): void;
    registerPlayReceiver(id: Type<T>, receiver: PlayPayloadHandler<T>): boolean;
    reset(var1: ResourceLocation): void;
    sendPlayPayload(payload: T): boolean;
    sendPlayPayload(handler: ClientPacketListener, payload: T): boolean;
    setPlayRegistered(var1: ResourceLocation): void;
    unregisterPlayReceiver(): void;
  }


  interface MaLiLibBuf extends FriendlyByteBuf {}
  class MaLiLibBuf extends FriendlyByteBuf {
    constructor(parent: ByteBuf);
  }


  class PacketSplitter {
    static readonly MAX_TOTAL_PER_PACKET_S2C: number;
    static readonly MAX_PAYLOAD_PER_PACKET_S2C: number;
    static readonly MAX_TOTAL_PER_PACKET_C2S: number;
    static readonly MAX_PAYLOAD_PER_PACKET_C2S: number;
    static readonly DEFAULT_MAX_RECEIVE_SIZE_C2S: number;
    static readonly DEFAULT_MAX_RECEIVE_SIZE_S2C: number;
    static receive<T extends CustomPacketPayload>(handler: IPluginClientPlayHandler<T>, key: number, buf: FriendlyByteBuf): FriendlyByteBuf;
    static send<T extends CustomPacketPayload>(handler: IPluginClientPlayHandler<T>, packet: FriendlyByteBuf, networkHandler: ClientPacketListener): boolean;
  }

}

declare module 'fi.dy.masa.malilib.registry' {
  import { BlockPlacementPositionHandler } from 'fi.dy.masa.malilib.interoperation';
  import { ConfigScreenRegistry } from 'fi.dy.masa.malilib.gui.config.registry';

  class Registry {
    static readonly BLOCK_PLACEMENT_POSITION_HANDLER: BlockPlacementPositionHandler;
    static readonly CONFIG_SCREEN: ConfigScreenRegistry;
  }

}

declare module 'fi.dy.masa.malilib.render' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { InventoryProperties, InventoryRenderType, Context } from 'fi.dy.masa.malilib.render.InventoryOverlay';
  import { Minecraft } from 'net.minecraft.client';
  import { BufferBuilder } from 'com.mojang.blaze3d.vertex';
  import { Container } from 'net.minecraft.world';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { LivingEntity, Entity } from 'net.minecraft.world.entity';
  import { ItemStack, DyeColor } from 'net.minecraft.world.item';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Set, List } from 'java.util';
  import { Integer } from 'java.lang';
  import { NonNullList, BlockPos, Direction } from 'net.minecraft.core';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { MessageType } from 'fi.dy.masa.malilib.gui.Message';
  import { HudAlignment } from 'fi.dy.masa.malilib.config';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Color4f, IntBoundingBox } from 'fi.dy.masa.malilib.util';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Matrix4f, Matrix4fStack } from 'org.joml';
  import { ShulkerBoxBlock } from 'net.minecraft.world.level.block';
  import { VillagerData, VillagerProfession } from 'net.minecraft.world.entity.npc';
  import { BakedModel } from 'net.minecraft.client.resources.model';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  class InventoryOverlay {
    static readonly TEXTURE_BREWING_STAND: ResourceLocation;
    static readonly TEXTURE_CRAFTER: ResourceLocation;
    static readonly TEXTURE_DISPENSER: ResourceLocation;
    static readonly TEXTURE_DOUBLE_CHEST: ResourceLocation;
    static readonly TEXTURE_FURNACE: ResourceLocation;
    static readonly TEXTURE_HOPPER: ResourceLocation;
    static readonly TEXTURE_PLAYER_INV: ResourceLocation;
    static readonly TEXTURE_SINGLE_CHEST: ResourceLocation;
    static readonly TEXTURE_EMPTY_SHIELD: ResourceLocation;
    static readonly TEXTURE_LOCKED_SLOT: ResourceLocation;
    static readonly TEXTURE_EMPTY_HORSE_ARMOR: ResourceLocation;
    static readonly TEXTURE_EMPTY_LLAMA_ARMOR: ResourceLocation;
    static readonly TEXTURE_EMPTY_SADDLE: ResourceLocation;
    static readonly TEXTURE_EMPTY_BREWER_FUEL: ResourceLocation;
    static readonly TEXTURE_EMPTY_POTION: ResourceLocation;
    static readonly TEXTURE_EMPTY_SLOT_AMETHYST: ResourceLocation;
    static readonly TEXTURE_EMPTY_SLOT_AXE: ResourceLocation;
    static readonly TEXTURE_EMPTY_SLOT_DIAMOND: ResourceLocation;
    static readonly TEXTURE_EMPTY_SLOT_EMERALD: ResourceLocation;
    static readonly TEXTURE_EMPTY_SLOT_HOE: ResourceLocation;
    static readonly TEXTURE_EMPTY_SLOT_INGOT: ResourceLocation;
    static readonly TEXTURE_EMPTY_SLOT_LAPIS: ResourceLocation;
    static readonly TEXTURE_EMPTY_SLOT_PICKAXE: ResourceLocation;
    static readonly TEXTURE_EMPTY_SLOT_QUARTZ: ResourceLocation;
    static readonly TEXTURE_EMPTY_SLOT_REDSTONE: ResourceLocation;
    static readonly TEXTURE_EMPTY_SLOT_SHOVEL: ResourceLocation;
    static readonly TEXTURE_EMPTY_SLOT_ARMOR_TRIM: ResourceLocation;
    static readonly TEXTURE_EMPTY_SLOT_UPGRADE: ResourceLocation;
    static readonly TEXTURE_EMPTY_SLOT_SWORD: ResourceLocation;
    static readonly INV_PROPS_TEMP: InventoryProperties;
    static getBestInventoryType(inv: Container, nbt: CompoundTag): InventoryRenderType;
    static getBestInventoryType(inv: Container, nbt: CompoundTag, ctx: Context): InventoryRenderType;
    static getInventoryPropsTemp(type: InventoryRenderType, totalSlots: number): InventoryProperties;
    static getInventoryPropsTemp(type: InventoryRenderType, totalSlots: number, slotsPerARow: number): InventoryProperties;
    static getInventoryType(inv: Container): InventoryRenderType;
    static getInventoryType(stack: ItemStack): InventoryRenderType;
    static getInventoryType(nbt: CompoundTag): InventoryRenderType;
    static renderBackgroundSlotAt(x: number, y: number, texture: ResourceLocation, drawContext: GuiGraphics): void;
    static renderBackgroundSlotAt(x: number, y: number, scale: number, texture: ResourceLocation, drawContext: GuiGraphics, mouseX: number, mouseY: number): void;
    static renderEquipmentOverlayBackground(x: number, y: number, entity: LivingEntity, drawContext: GuiGraphics): void;
    static renderEquipmentStacks(entity: LivingEntity, x: number, y: number, mc: Minecraft, drawContext: GuiGraphics): void;
    static renderEquipmentStacks(entity: LivingEntity, x: number, y: number, mc: Minecraft, drawContext: GuiGraphics, mouseX: number, mouseY: number): void;
    static renderHorseArmorBackgroundSlots(inv: Container, x: number, y: number, drawContext: GuiGraphics): void;
    static renderHorseArmorBackgroundSlots(inv: Container, x: number, y: number, scale: number, drawContext: GuiGraphics, mouseX: number, mouseY: number): void;
    static renderInventoryBackground(type: InventoryRenderType, x: number, y: number, slotsPerRow: number, totalSlots: number, mc: Minecraft): void;
    static renderInventoryBackground27(x: number, y: number, buffer: BufferBuilder, mc: Minecraft): void;
    static renderInventoryBackground54(x: number, y: number, buffer: BufferBuilder, mc: Minecraft): void;
    static renderInventoryBackgroundSlots(type: InventoryRenderType, inv: Container, x: number, y: number, drawContext: GuiGraphics): void;
    static renderInventoryStacks(type: InventoryRenderType, inv: Container, startX: number, startY: number, slotsPerRow: number, startSlot: number, maxSlots: number, mc: Minecraft, drawContext: GuiGraphics): void;
    static renderInventoryStacks(type: InventoryRenderType, inv: Container, startX: number, startY: number, slotsPerRow: number, startSlot: number, maxSlots: number, disabledSlots: Set<number>, mc: Minecraft, drawContext: GuiGraphics): void;
    static renderInventoryStacks(type: InventoryRenderType, inv: Container, startX: number, startY: number, slotsPerRow: number, startSlot: number, maxSlots: number, mc: Minecraft, drawContext: GuiGraphics, mouseX: number, mouseY: number): void;
    static renderInventoryStacks(type: InventoryRenderType, inv: Container, startX: number, startY: number, slotsPerRow: number, startSlot: number, maxSlots: number, disabledSlots: Set<number>, mc: Minecraft, drawContext: GuiGraphics, mouseX: number, mouseY: number): void;
    static renderItemStacks(items: NonNullList<ItemStack>, startX: number, startY: number, slotsPerRow: number, startSlot: number, maxSlots: number, mc: Minecraft, drawContext: GuiGraphics): void;
    static renderItemStacks(items: NonNullList<ItemStack>, startX: number, startY: number, slotsPerRow: number, startSlot: number, maxSlots: number, disabledSlots: Set<number>, mc: Minecraft, drawContext: GuiGraphics): void;
    static renderLlamaArmorBackgroundSlots(inv: Container, x: number, y: number, drawContext: GuiGraphics): void;
    static renderLlamaArmorBackgroundSlots(inv: Container, x: number, y: number, scale: number, drawContext: GuiGraphics, mouseX: number, mouseY: number): void;
    static renderLockedSlotAt(x: number, y: number, scale: number, drawContext: GuiGraphics, mouseX: number, mouseY: number): void;
    static renderStackAt(stack: ItemStack, x: number, y: number, scale: number, mc: Minecraft, drawContext: GuiGraphics): void;
    static renderStackAt(stack: ItemStack, x: number, y: number, scale: number, mc: Minecraft, drawContext: GuiGraphics, mouseX: number, mouseY: number): void;
    static renderStackToolTip(x: number, y: number, stack: ItemStack, mc: Minecraft, drawContext: GuiGraphics): void;
    static renderStackToolTipStyled(x: number, y: number, stack: ItemStack, mc: Minecraft, drawContext: GuiGraphics): void;
    static renderWolfArmorBackgroundSlots(inv: Container, x: number, y: number, drawContext: GuiGraphics): void;
    static renderWolfArmorBackgroundSlots(inv: Container, x: number, y: number, scale: number, drawContext: GuiGraphics, mouseX: number, mouseY: number): void;
  }


  interface InventoryOverlayScreen extends Renderable, Screen {}
  class InventoryOverlayScreen extends Renderable {
    constructor(modId: string, previewData: Context);

    constructor(modId: string, previewData: Context, shulkerBGColors: boolean);

    constructor(modId: string, previewData: Context, shulkerBGColors: boolean, villagerBGColors: boolean);
    isPauseScreen(): boolean;
    render(drawContext: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }


  class MessageRenderer {
    constructor(bgColor: number, borderColor: number);
    addMessage(displayTimeMs: number, messageKey: string, ...args: any[]): void;
    addMessage(type: MessageType, displayTimeMs: number, messageKey: string, ...args: any[]): void;
    drawMessages(x: number, y: number, drawContext: GuiGraphics): void;
    get messageBoxWidth(): number;
    get messagesHeight(): number;
    get nextMessageType(): MessageType;
    set messageBoxWidth(width: number);
    set nextMessageType(type: MessageType);
    setBackgroundColors(bgColor: number, borderColor: number): MessageRenderer;
    setBackgroundStyle(useBackground: boolean, useBorder: boolean): MessageRenderer;
    setCentered(centeredH: boolean, centeredV: boolean): MessageRenderer;
    setExpandUp(expandUp: boolean): MessageRenderer;
    setZLevel(zLevel: number): MessageRenderer;
  }


  class RenderUtils {
    static readonly TEXTURE_MAP_BACKGROUND: ResourceLocation;
    static readonly TEXTURE_MAP_BACKGROUND_CHECKERBOARD: ResourceLocation;
    static bindTexture(texture: ResourceLocation): void;
    static color(r: number, g: number, b: number, a: number): void;
    static disableDiffuseLighting(): void;
    static drawBlockBoundingBoxOutlinesBatchedLines(pos: BlockPos, color: Color4f, expand: number, buffer: BufferBuilder): void;
    static drawBlockBoundingBoxOutlinesBatchedLines(pos: BlockPos, cameraPos: Vec3, color: Color4f, expand: number, buffer: BufferBuilder): void;
    static drawBlockBoundingBoxSidesBatchedQuads(pos: BlockPos, color: Color4f, expand: number, buffer: BufferBuilder): void;
    static drawBox(bb: IntBoundingBox, cameraPos: Vec3, color: Color4f, bufferQuads: BufferBuilder, bufferLines: BufferBuilder): void;
    static drawBoxAllEdgesBatchedLines(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number, color: Color4f, buffer: BufferBuilder): void;
    static drawBoxAllSidesBatchedQuads(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number, color: Color4f, buffer: BufferBuilder): void;
    static drawBoxBottomBatchedQuads(minX: number, minY: number, minZ: number, maxX: number, maxZ: number, color: Color4f, buffer: BufferBuilder): void;
    static drawBoxHorizontalSidesBatchedQuads(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number, color: Color4f, buffer: BufferBuilder): void;
    static drawBoxTopBatchedQuads(minX: number, minZ: number, maxX: number, maxY: number, maxZ: number, color: Color4f, buffer: BufferBuilder): void;
    static drawBoxWithEdgesBatched(posMin: BlockPos, posMax: BlockPos, colorLines: Color4f, colorSides: Color4f, bufferQuads: BufferBuilder, bufferLines: BufferBuilder): void;
    static drawBoxWithEdgesBatched(posMin: BlockPos, posMax: BlockPos, cameraPos: Vec3, colorLines: Color4f, colorSides: Color4f, bufferQuads: BufferBuilder, bufferLines: BufferBuilder): void;
    static drawCenteredString(x: number, y: number, color: number, text: string, drawContext: GuiGraphics): void;
    static drawGradientRect(left: number, top: number, right: number, bottom: number, zLevel: number, startColor: number, endColor: number): void;
    static drawHorizontalLine(x: number, y: number, width: number, color: number): void;
    static drawHoverText(x: number, y: number, textLines: string[], drawContext: GuiGraphics): void;
    static drawOutline(x: number, y: number, width: number, height: number, colorBorder: number): void;
    static drawOutline(x: number, y: number, width: number, height: number, colorBorder: number, zLevel: number): void;
    static drawOutline(x: number, y: number, width: number, height: number, borderWidth: number, colorBorder: number): void;
    static drawOutline(x: number, y: number, width: number, height: number, borderWidth: number, colorBorder: number, zLevel: number): void;
    static drawOutlinedBox(x: number, y: number, width: number, height: number, colorBg: number, colorBorder: number): void;
    static drawOutlinedBox(x: number, y: number, width: number, height: number, colorBg: number, colorBorder: number, zLevel: number): void;
    static drawRect(x: number, y: number, width: number, height: number, color: number): void;
    static drawRect(x: number, y: number, width: number, height: number, color: number, zLevel: number): void;
    static drawScreenBlur(mc: Minecraft): void;
    static drawTextPlate(text: string[], x: number, y: number, z: number, scale: number): void;
    static drawTextPlate(text: string[], x: number, y: number, z: number, yaw: number, pitch: number, scale: number, textColor: number, bgColor: number, disableDepth: boolean): void;
    static drawTexturedRect(x: number, y: number, u: number, v: number, width: number, height: number): void;
    static drawTexturedRect(x: number, y: number, u: number, v: number, width: number, height: number, zLevel: number): void;
    static drawTexturedRectBatched(x: number, y: number, u: number, v: number, width: number, height: number, buffer: BufferBuilder): void;
    static drawTexturedRectBatched(x: number, y: number, u: number, v: number, width: number, height: number, zLevel: number, buffer: BufferBuilder): void;
    static drawVerticalLine(x: number, y: number, height: number, color: number): void;
    static enableDiffuseLightingForLevel(): void;
    static enableDiffuseLightingGui3D(): void;
    static forceDraw(drawContext: GuiGraphics): void;
    static getBundleColor(bundle: ItemStack): DyeColor;
    static getColorComponents(color: number): number[];
    static getHudOffsetForPotions(alignment: HudAlignment, scale: number, player: Player): number;
    static getHudPosY(yOrig: number, yOffset: number, contentHeight: number, scale: number, alignment: HudAlignment): number;
    static getVillagerColor(profession: VillagerProfession): DyeColor;
    static matrix4fRotateFix(ang: number): number;
    static renderBlockTargetingOverlay(entity: Entity, pos: BlockPos, side: Direction, hitVec: Vec3, color: Color4f, posMatrix: Matrix4f, mc: Minecraft): void;
    static renderBlockTargetingOverlaySimple(entity: Entity, pos: BlockPos, side: Direction, color: Color4f, posMatrix: Matrix4f, mc: Minecraft): void;
    static renderBundlePreview(stack: ItemStack, baseX: number, baseY: number, useBgColors: boolean, drawContext: GuiGraphics): void;
    static renderBundlePreview(stack: ItemStack, baseX: number, baseY: number, slotsPerRow: number, useBgColors: boolean, drawContext: GuiGraphics): void;
    static renderMapPreview(stack: ItemStack, x: number, y: number, dimensions: number): void;
    static renderMapPreview(stack: ItemStack, x: number, y: number, dimensions: number, requireShift: boolean): void;
    static renderModelInGui(x: number, y: number, model: BakedModel, state: BlockState, zLevel: number): void;
    static renderNbtItemsPreview(stackIn: ItemStack, itemsTag: CompoundTag, baseX: number, baseY: number, useBgColors: boolean, drawContext: GuiGraphics): void;
    static renderShulkerBoxPreview(stack: ItemStack, baseX: number, baseY: number, useBgColors: boolean, drawContext: GuiGraphics): void;
    static renderSprite(x: number, y: number, width: number, height: number, atlas: ResourceLocation, texture: ResourceLocation, drawContext: GuiGraphics): void;
    static renderText(x: number, y: number, color: number, text: string, drawContext: GuiGraphics): void;
    static renderText(x: number, y: number, color: number, lines: string[], drawContext: GuiGraphics): void;
    static renderText(xOff: number, yOff: number, scale: number, textColor: number, bgColor: number, alignment: HudAlignment, useBackground: boolean, useShadow: boolean, lines: string[], drawContext: GuiGraphics): number;
    static renderText(xOff: number, yOff: number, scale: number, textColor: number, bgColor: number, alignment: HudAlignment, useBackground: boolean, useShadow: boolean, useStatusShift: boolean, lines: string[], drawContext: GuiGraphics): number;
    static setBundleBackgroundTintColor(bundle: ItemStack, useBgColors: boolean): void;
    static setShulkerboxBackgroundTintColor(block: ShulkerBoxBlock, useBgColors: boolean): void;
    static setVillagerBackgroundTintColor(data: VillagerData, useBgColors: boolean): void;
    static setVillagerBackgroundTintColor(profession: VillagerProfession, useBgColors: boolean): void;
    static setupBlend(): void;
    static setupBlendSimple(): void;
    static setupGuiTransform(xPosition: number, yPosition: number, isGui3d: boolean, zLevel: number): void;
    static setupGuiTransform(matrix4fStack: Matrix4fStack, xPosition: number, yPosition: number, zLevel: number): void;
  }

}

declare module 'fi.dy.masa.malilib.render.InventoryOverlay' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { Level } from 'net.minecraft.world.level';

  interface InventoryRenderType extends Enum<InventoryRenderType> {}
  class InventoryRenderType extends Enum<InventoryRenderType> {
    static readonly BREWING_STAND: InventoryRenderType;
    static readonly CRAFTER: InventoryRenderType;
    static readonly DISPENSER: InventoryRenderType;
    static readonly FURNACE: InventoryRenderType;
    static readonly HOPPER: InventoryRenderType;
    static readonly HORSE: InventoryRenderType;
    static readonly LLAMA: InventoryRenderType;
    static readonly WOLF: InventoryRenderType;
    static readonly FIXED_27: InventoryRenderType;
    static readonly FIXED_54: InventoryRenderType;
    static readonly VILLAGER: InventoryRenderType;
    static readonly PLAYER: InventoryRenderType;
    static readonly ENDER_CHEST: InventoryRenderType;
    static readonly BOOKSHELF: InventoryRenderType;
    static readonly SINGLE_ITEM: InventoryRenderType;
    static readonly BUNDLE: InventoryRenderType;
    static readonly ARMOR_STAND: InventoryRenderType;
    static readonly LIVING_ENTITY: InventoryRenderType;
    static readonly GENERIC: InventoryRenderType;
    static valueOf(name: string): InventoryRenderType;
    static values(): InventoryRenderType[];
  }


  class InventoryProperties {
    totalSlots: number;
    width: number;
    height: number;
    slotsPerRow: number;
    slotOffsetX: number;
    slotOffsetY: number;
  }


  class Refresher {
    onContextRefresh(var1: Context, var2: Level): Context;
  }

}

declare module 'fi.dy.masa.malilib.render.shader' {
  class ShaderProgram {
    constructor(domain: string, vertShaderFilename: string, fragShaderFilename: string);
    get program(): number;
  }

}

declare module 'fi.dy.masa.malilib.test' {
  import { Enum, AutoCloseable } from 'java.lang';
  import { IValueChangeCallback, IClientCommandListener, IDataSyncer, IInventoryOverlayHandler, IRenderer } from 'fi.dy.masa.malilib.interfaces';
  import { IConfigBoolean, ConfigType, IConfigLockedListType, IConfigLockedListEntry, IConfigOptionListEntry } from 'fi.dy.masa.malilib.config';
  import { IKeybind, IKeybindProvider, IKeybindManager } from 'fi.dy.masa.malilib.hotkeys';
  import { JsonElement } from 'com.google.gson';
  import { List } from 'java.util';
  import { ImmutableList } from 'com.google.common.collect';
  import { Minecraft, Camera } from 'net.minecraft.client';
  import { Level } from 'net.minecraft.world.level';
  import { Callbacks } from 'fi.dy.masa.malilib.test.TestInputHandler';
  import { Refresher, Context } from 'fi.dy.masa.malilib.render.InventoryOverlay';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ProfilerFiller } from 'net.minecraft.util.profiling';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Entity } from 'net.minecraft.world.entity';
  import { HitResult, Vec3 } from 'net.minecraft.world.phys';
  import { Matrix4f } from 'org.joml';
  import { TooltipContext } from 'Item';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Component } from 'net.minecraft.network.chat';
  import { Supplier } from 'java.util.function';
  import { Color4f } from 'fi.dy.masa.malilib.util';
  import { BufferBuilder } from 'com.mojang.blaze3d.vertex';

  interface ConfigTestEnum extends Enum<ConfigTestEnum> {}
  class ConfigTestEnum extends Enum<ConfigTestEnum> {
    static readonly TEST_ENUM_CONFIG: ConfigTestEnum;
    static readonly TEST_ENUM_SINGLE_PLAYER: ConfigTestEnum;
    static readonly TEST_WALLS_HOTKEY: ConfigTestEnum;
    get asJsonElement(): JsonElement;
    get booleanValue(): boolean;
    get comment(): string;
    get configGuiDisplayName(): string;
    get defaultBooleanValue(): boolean;
    get defaultStringValue(): string;
    get keybind(): IKeybind;
    get name(): string;
    get prettyName(): string;
    get stringValue(): string;
    get translatedName(): string;
    get type(): ConfigType;
    isModified(): boolean;
    isModified(newValue: string): boolean;
    onValueChanged(): void;
    resetToDefault(): void;
    set booleanValue(value: boolean);
    set comment(comment: string);
    set prettyName(prettyName: string);
    set translatedName(translatedName: string);
    setValueChangeCallback(callback: IValueChangeCallback<IConfigBoolean>): void;
    setValueFromJsonElement(element: JsonElement): void;
    setValueFromString(value: string): void;
    static valueOf(name: string): ConfigTestEnum;
    static values(): ConfigTestEnum[];
  }


  interface ConfigTestLockedList extends IConfigLockedListType {}
  class ConfigTestLockedList extends IConfigLockedListType {
    static readonly INSTANCE: ConfigTestLockedList;
    VALUES: ImmutableList;
    fromString(element: string): IConfigLockedListEntry;
    get defaultEntries(): ImmutableList<IConfigLockedListEntry>;
  }


  interface ConfigTestOptList extends Enum<ConfigTestOptList> {}
  class ConfigTestOptList extends Enum<ConfigTestOptList> {
    static readonly TEST1: ConfigTestOptList;
    static readonly TEST2: ConfigTestOptList;
    cycle(forward: boolean): IConfigOptionListEntry;
    fromString(value: string): ConfigTestOptList;
    static fromStringStatic(name: string): ConfigTestOptList;
    get displayName(): string;
    get stringValue(): string;
    static valueOf(name: string): ConfigTestOptList;
    static values(): ConfigTestOptList[];
  }


  interface TestCommand extends IClientCommandListener {}
  class TestCommand extends IClientCommandListener {
    execute(args: string[], mc: Minecraft): boolean;
    get command(): string;
  }


  interface TestDataSyncer extends IDataSyncer {}
  class TestDataSyncer extends IDataSyncer {
    static get instance(): TestDataSyncer;
    get world(): Level;
  }


  interface TestInputHandler extends IKeybindProvider {}
  class TestInputHandler extends IKeybindProvider {
    addHotkeys(manager: IKeybindManager): void;
    addKeysToMap(manager: IKeybindManager): void;
    get callback(): Callbacks;
    static get instance(): TestInputHandler;
    init(): void;
  }


  interface TestInventoryOverlayHandler extends IInventoryOverlayHandler {}
  class TestInventoryOverlayHandler extends IInventoryOverlayHandler {
    get dataSyncer(): IDataSyncer;
    static get instance(): TestInventoryOverlayHandler;
    get modId(): string;
    get refreshHandler(): Refresher;
    get renderContextNullable(): Context;
    getRenderContext(drawContext: GuiGraphics, profiler: ProfilerFiller, mc: Minecraft): Context;
    getTargetInventory(mc: Minecraft): Context;
    getTargetInventoryFromBlock(world: Level, pos: BlockPos, be: BlockEntity, nbt: CompoundTag): Context;
    getTargetInventoryFromEntity(entity: Entity, nbt: CompoundTag): Context;
    isEmpty(): boolean;
    set dataSyncer(syncer: IDataSyncer);
  }


  class TestRayTraceUtils {
    static getRayTraceFromEntity(worldIn: Level, entityIn: Entity, useLiquids: boolean): HitResult;
    static getRayTraceFromEntity(worldIn: Level, entityIn: Entity, useLiquids: boolean, range: number): HitResult;
  }


  interface TestRenderHandler extends IRenderer {}
  class TestRenderHandler extends IRenderer {
    static get instance(): TestRenderHandler;
    get profilerSectionSupplier(): Supplier<string>;
    onRenderGameOverlayLastDrawer(drawContext: GuiGraphics, partialTicks: number, profiler: ProfilerFiller, mc: Minecraft): void;
    onRenderGameOverlayPost(drawContext: GuiGraphics): void;
    onRenderTooltipComponentInsertFirst(context: TooltipContext, stack: ItemStack, list: Component[]): void;
    onRenderTooltipComponentInsertLast(context: TooltipContext, stack: ItemStack, list: Component[]): void;
    onRenderTooltipComponentInsertMiddle(context: TooltipContext, stack: ItemStack, list: Component[]): void;
    onRenderTooltipLast(drawContext: GuiGraphics, stack: ItemStack, x: number, y: number): void;
    onRenderWorldLast(posMatrix: Matrix4f, projMatrix: Matrix4f): void;
    onRenderWorldTestWalls(posMatrix: Matrix4f, projMatrix: Matrix4f, camera: Camera, profiler: ProfilerFiller): void;
    static renderInventoryOverlayOG(context: Context, drawContext: GuiGraphics, mc: Minecraft): void;
  }


  class TestUtils {
    static drawBlockBoundingBoxSidesBatchedQuads(pos: BlockPos, cameraPos: Vec3, color: Color4f, expand: number, buffer: BufferBuilder): void;
    static renderWallWithLines(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number, lineIntervalH: number, lineIntervalV: number, alignLinesToModulo: boolean, cameraPos: Vec3, color: Color4f, bufferQuads: BufferBuilder, bufferLines: BufferBuilder): void;
    static renderWallsWithLines(posStart: BlockPos, posEnd: BlockPos, cameraPos: Vec3, lineIntervalH: number, lineIntervalV: number, alignLinesToModulo: boolean, color: Color4f, bufferQuads: BufferBuilder, bufferLines: BufferBuilder): void;
    static roundUp(value: number, interval: number): number;
  }


  interface TestWalls extends AutoCloseable {}
  class TestWalls extends AutoCloseable {
    static clear(): void;
    close(): void;
    static draw(cameraPos: Vec3, matrix4f: Matrix4f, projMatrix: Matrix4f, mc: Minecraft, profiler: ProfilerFiller): void;
    static get updatePosition(): Vec3;
    static needsUpdate(pos: BlockPos): boolean;
    static set updatePosition(cameraPosition: Vec3);
    static update(camera: Camera, mc: Minecraft): void;
  }

}

declare module 'fi.dy.masa.malilib.test.ConfigTestLockedList' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Entry extends Enum<Entry> {}
  class Entry extends Enum<Entry> {
    static readonly TEST1: Entry;
    static readonly TEST2: Entry;
    static readonly TEST3: Entry;
    static readonly TEST4: Entry;
    static fromString(key: string): Entry;
    get displayName(): string;
    get stringValue(): string;
    static valueOf(name: string): Entry;
    static values(): Entry[];
  }

}

declare module 'fi.dy.masa.malilib.test.TestInputHandler' {
  import { IHotkeyCallback, KeyAction, IKeybind } from 'fi.dy.masa.malilib.hotkeys';

  interface Callbacks extends IHotkeyCallback {}
  class Callbacks extends IHotkeyCallback {
    onKeyAction(action: KeyAction, key: IKeybind): boolean;
  }

}

declare module 'fi.dy.masa.malilib.test.TestInventoryOverlayHandler' {
  import { Refresher as fi_dy_masa_malilib_render_inventoryoverlay_Refresher, Context } from 'fi.dy.masa.malilib.render.InventoryOverlay';
  import { Level } from 'net.minecraft.world.level';

  interface Refresher extends fi_dy_masa_malilib_render_inventoryoverlay_Refresher {}
  class Refresher extends fi_dy_masa_malilib_render_inventoryoverlay_Refresher {
    onContextRefresh(data: Context, world: Level): Context;
  }

}

declare module 'fi.dy.masa.malilib.util' {
  import { Enum, Integer, Double } from 'java.lang';
  import { IConfigOptionListEntry } from 'fi.dy.masa.malilib.config';
  import { List, Set, Collection } from 'java.util';
  import { NbtBlockUtils, NbtEntityUtils, NbtKeys as fi_dy_masa_malilib_util_nbt_NbtKeys } from 'fi.dy.masa.malilib.util.nbt';
  import { DirectionProperty } from 'net.minecraft.world.level.block.state.properties';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Direction, FrontAndTop, Holder, RegistryAccess, BlockPos, Vec3i, NonNullList } from 'net.minecraft.core';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { CrafterBlockEntity } from 'net.minecraft.world.level.block.entity';
  import { Block } from 'net.minecraft.world.level.block';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Constants as fi_dy_masa_malilib_util_data_Constants } from 'fi.dy.masa.malilib.util.data';
  import { IStringConsumerFeedback, ICoordinateValueModifier, IStringConsumer, IRangeChangeListener } from 'fi.dy.masa.malilib.interfaces';
  import { File, BufferedWriter } from 'java.io';
  import { IDirectoryNavigator } from 'fi.dy.masa.malilib.gui.interfaces';
  import { Entity, EquipmentSlot, EquipmentSlotGroup } from 'net.minecraft.world.entity';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Pair } from 'org.apache.commons.lang3.tuple';
  import { Enchantment } from 'net.minecraft.world.item.enchantment';
  import { SimpleDateFormat } from 'java.text';
  import { ImmutableSet, ImmutableList } from 'com.google.common.collect';
  import { Predicate, Consumer, Function } from 'java.util.function';
  import { Path } from 'java.nio.file';
  import { FileWriteType } from 'fi.dy.masa.malilib.config.value';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiBase, LeftRight } from 'fi.dy.masa.malilib.gui';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { CoordinateType, HitPart } from 'fi.dy.masa.malilib.util.PositionUtils';
  import { MessageType } from 'fi.dy.masa.malilib.gui.Message';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { MutableComponent, Component } from 'net.minecraft.network.chat';
  import { Codec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Axis } from 'Direction';
  import { BoundingBox } from 'net.minecraft.world.level.levelgen.structure';
  import { IntArrayTag, CompoundTag, Tag } from 'net.minecraft.nbt';
  import { Level } from 'net.minecraft.world.level';
  import { Pattern } from 'java.util.regex';
  import { DataComponentMap, DataComponentType } from 'net.minecraft.core.component';
  import { AbstractContainerMenu, PlayerEnderChestContainer } from 'net.minecraft.world.inventory';
  import { Minecraft } from 'net.minecraft.client';
  import { Container } from 'net.minecraft.world';
  import { Provider } from 'HolderLookup';
  import { MerchantOffers } from 'net.minecraft.world.item.trading';
  import { Fraction } from 'org.apache.commons.lang3.math';
  import { Object2IntOpenHashMap } from 'it.unimi.dsi.fastutil.objects';
  import { Gson, JsonObject, JsonArray, JsonElement } from 'com.google.gson';
  import { FriendlyByteBuf, RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { MaLiLibBuf } from 'fi.dy.masa.malilib.network';
  import { ByteBuf } from 'io.netty.buffer';
  import { SocketAddress } from 'java.net';
  import { LevelChunk, ChunkAccess } from 'net.minecraft.world.level.chunk';
  import { DimensionType } from 'net.minecraft.world.level.dimension';
  import { Biome } from 'net.minecraft.world.level.biome';

  interface ActiveMode extends Enum<ActiveMode> {}
  class ActiveMode extends Enum<ActiveMode> {
    static readonly NEVER: ActiveMode;
    static readonly WITH_KEY: ActiveMode;
    static readonly ALWAYS: ActiveMode;
    cycle(forward: boolean): IConfigOptionListEntry;
    fromString(name: string): ActiveMode;
    static fromStringStatic(name: string): ActiveMode;
    get displayName(): string;
    get serializedName(): string;
    get stringValue(): string;
    static valueOf(name: string): ActiveMode;
    static values(): ActiveMode[];
  }


  class AlphaNumComparator {
    compare(s1: string, s2: string): number;
  }


  interface BlockSnap extends Enum<BlockSnap> {}
  class BlockSnap extends Enum<BlockSnap> {
    static readonly NONE: BlockSnap;
    static readonly CENTER: BlockSnap;
    static readonly CORNER: BlockSnap;
    cycle(forward: boolean): IConfigOptionListEntry;
    fromString(name: string): BlockSnap;
    static fromStringStatic(name: string): BlockSnap;
    get displayName(): string;
    get serializedName(): string;
    get stringValue(): string;
    static valueOf(name: string): BlockSnap;
    static values(): BlockSnap[];
  }


  interface BlockUtils extends NbtBlockUtils {}
  class BlockUtils extends NbtBlockUtils {
    static getBlockEntry(id: ResourceLocation, registry: RegistryAccess): Holder<Block>;
    static getDirectionFacingIndex(stack: ItemStack, facing: Direction): number;
    static getDisabledSlots(ce: CrafterBlockEntity): Set<number>;
    static getFirstDirectionProperty(state: BlockState): DirectionProperty;
    static getFirstPropertyFacingValue(state: BlockState): Direction;
    static getFormattedBlockStateProperties(state: BlockState): string[];
    static getFormattedBlockStateProperties(state: BlockState, separator: string): string[];
    static getOrientationFacingIndex(stack: ItemStack, facing: Direction): number;
    static getPropertyFacingValue(state: BlockState): Direction;
    static getPropertyHopperFacingValue(state: BlockState): Direction;
    static getPropertyHorizontalFacingValue(state: BlockState): Direction;
    static getPropertyOrientationFacing(state: BlockState): Direction;
    static getPropertyOrientationRotation(state: BlockState): Direction;
    static getPropertyOrientationValue(state: BlockState): FrontAndTop;
    static isFacingValidForDirection(stack: ItemStack, facing: Direction): boolean;
    static isFacingValidForOrientation(stack: ItemStack, facing: Direction): boolean;
  }


  class Color4f {
    static readonly WHITE: Color4f;
    static readonly ZERO: Color4f;
    readonly r: number;
    readonly g: number;
    readonly b: number;
    readonly a: number;
    readonly intValue: number;
    constructor(r: number, g: number, b: number);

    constructor(r: number, g: number, b: number, a: number);
    equals(obj: any): boolean;
    static fromColor(color: number): Color4f;
    static fromColor(color: number, alpha: number): Color4f;
    static fromColor(color: Color4f, alpha: number): Color4f;
    hashCode(): number;
    toHexString(): string;
    toString(): string;
  }


  interface Constants extends fi_dy_masa_malilib_util_data_Constants {}
  class Constants extends fi_dy_masa_malilib_util_data_Constants {
    static isValidChar(chr: string): boolean;
  }


  interface DirectoryCreator extends IStringConsumerFeedback {}
  class DirectoryCreator extends IStringConsumerFeedback {
    constructor(dir: File, navigator: IDirectoryNavigator);
    setString(string: string): boolean;
  }


  interface EntityUtils extends NbtEntityUtils {}
  class EntityUtils extends NbtEntityUtils {
    static get cameraEntity(): Entity;
    static hasTurtleHelmetEquipped(player: Player): boolean;
  }


  class EquipmentUtils {
    static getDamageAndSpeedAttributes(stack: ItemStack): Pair<number, number>;
    static getEnchantmentLevel(stack: ItemStack, enchantment: ResourceKey<Enchantment>): number;
    static getEquipmentSlot(stack: ItemStack): EquipmentSlotGroup;
    static getMiningSpeed(stack: ItemStack, state: BlockState): number;
    static hasSameOrBetterEnchantment(testedStack: ItemStack, previous: ItemStack, enchantment: ResourceKey<Enchantment>): number;
    static hasSilkTouch(stack: ItemStack): boolean;
    static isAnyAnimalArmor(stack: ItemStack): boolean;
    static isAnyArmor(stack: ItemStack): boolean;
    static isAnyTool(stack: ItemStack): boolean;
    static isAnyWeapon(stack: ItemStack): boolean;
    static isAxe(stack: ItemStack): boolean;
    static isCorrectTool(stack: ItemStack, state: BlockState): boolean;
    static isHoe(stack: ItemStack): boolean;
    static isHorseArmor(stack: ItemStack): boolean;
    static isHumanoidArmor(stack: ItemStack): boolean;
    static isMeleeWeapon(stack: ItemStack): boolean;
    static isMiscTool(stack: ItemStack): boolean;
    static isPickAxe(stack: ItemStack): boolean;
    static isRangedWeapon(stack: ItemStack): boolean;
    static isRegularTool(stack: ItemStack): boolean;
    static isShovel(stack: ItemStack): boolean;
    static isSword(stack: ItemStack): boolean;
    static isWolfArmor(stack: ItemStack): boolean;
    static matchArmorSlot(stack: ItemStack, slot: EquipmentSlot): boolean;
  }


  class FileNameUtils {
    static readonly DATE_TIME_FORMAT: SimpleDateFormat;
    static readonly ILLEGAL_CHARACTERS: ImmutableSet;
    static readonly REGEX_SANITIZE: string;
    static addExtensionIfNotExists(name: string, extension: string): string;
    static doesFileNameContainIllegalCharacters(filename: string): boolean;
    static generateSafeFileName(name: string): string;
    static generateSimpleSafeFileName(name: string): string;
    static generateSimpleUnicodeSafeFileName(fileIn: string): string;
    static get dateTimeString(): string;
    static getFileNameExtension(name: string): string;
    static getFileNameWithoutExtension(name: string): string;
  }


  class FileUtils {
    static readonly DIRECTORY_FILTER: Predicate;
    static readonly ALWAYS_FALSE_FILEFILTER: Predicate;
    static readonly ANY_FILE_FILEFILTER: Predicate;
    static readonly JSON_FILEFILTER: Predicate;
    static canWriteToFile(dir: File, fileName: string, canOverwrite: boolean): boolean;
    static canWriteToFileAsPath(dir: Path, fileName: string, canOverwrite: boolean): boolean;
    static copy(srcFile: Path, dstFile: Path): boolean;
    static copy(srcFile: Path, dstFile: Path, overwrite: boolean): boolean;
    static copy(srcFile: Path, dstFile: Path, overwrite: boolean, messageConsumer: Consumer<string>): boolean;
    static copyFile(sourceFile: Path, destinationFile: Path, messageConsumer: Consumer<string>): boolean;
    static copyFileToDirectory(sourceFile: Path, destinationDir: Path, messageConsumer: Consumer<string>): boolean;
    static copyFilesToDirectory(files: Collection<Path>, destinationDir: Path, messageConsumer: Consumer<string>): boolean;
    static createDirectoriesIfMissing(dir: Path): boolean;
    static createDirectoriesIfMissing(dir: Path, messageConsumer: Consumer<string>): boolean;
    static createFile(file: Path): boolean;
    static createFile(file: Path, messageConsumer: Consumer<string>): boolean;
    static delete(file: Path): boolean;
    static delete(file: Path, messageConsumer: Consumer<string>): boolean;
    static deleteFiles(files: Collection<Path>, messageConsumer: Consumer<string>): boolean;
    static generateSafeFileName(name: string): string;
    static get configDirectory(): File;
    static get configDirectoryAsPath(): Path;
    static get minecraftDirectory(): File;
    static get minecraftDirectoryAsPath(): Path;
    static get rootDirectory(): Path;
    static getCanonicalFileIfPossible(file: File): File;
    static getDirectoryContents(dir: Path, filter: Predicate<Path>, sortByName: boolean): Path[];
    static getDirsForRootPath(dir: Path, root: Path): Path[];
    static getJoinedTrailingPathElements(file: File, rootPath: File, maxStringLength: number, separator: string): string;
    static getJoinedTrailingPathElements(file: Path, rootPath: Path, maxStringLength: number, separator: string): string;
    static getMTime(file: Path): number;
    static getNameWithoutExtension(name: string): string;
    static getRelativePath(dir: Path, file: Path): string;
    static getSiblingDirs(dir: Path): Path[];
    static getSubDirectories(dir: Path): Path[];
    static getUnusedFileName(dir: Path, fileNameFormatString: string, startNumber: number): Path;
    static isCurrentOrParentDirectory(file: Path): boolean;
    static isDirectoryEmpty(dir: Path): boolean;
    static isRegularDirectory(file: Path): boolean;
    static move(srcFile: Path, dstFile: Path): boolean;
    static move(srcFile: Path, dstFile: Path, overwrite: boolean): boolean;
    static move(srcFile: Path, dstFile: Path, overwrite: boolean, messageConsumer: Consumer<string>): boolean;
    static moveFile(sourceFile: Path, destinationFile: Path, messageConsumer: Consumer<string>): boolean;
    static moveFileToDirectory(sourceFile: Path, destinationDir: Path, messageConsumer: Consumer<string>): boolean;
    static moveFilesToDirectory(files: Collection<Path>, destinationDir: Path, messageConsumer: Consumer<string>): boolean;
    static readFileAsString(file: Path, maxFileSize: number): string;
    static renameFile(sourceFile: Path, destinationFile: Path, messageConsumer: Consumer<string>): boolean;
    static renameFileToName(oldFile: Path, newName: string, messageConsumer: Consumer<string>): boolean;
    static size(file: Path): number;
    static writeDataToExactFile(file: Path, dataWriter: Consumer<BufferedWriter>): boolean;
    static writeDataToFile(file: Path, dataWriter: Consumer<BufferedWriter>, writeType: FileWriteType): boolean;
    static writeStringToFile(str: string, file: Path, override: boolean): boolean;
  }


  class GuiUtils {
    static createBlockPosInput(x: number, y: number, textFieldWidth: number, type: CoordinateType, pos: BlockPos, modifier: ICoordinateValueModifier, addButton: boolean, gui: GuiBase): void;
    static createBlockPosInputsVertical(x: number, y: number, textFieldWidth: number, pos: BlockPos, modifier: ICoordinateValueModifier, addButton: boolean, gui: GuiBase): void;
    static createVec3dInput(x: number, y: number, textFieldWidth: number, type: CoordinateType, pos: Vec3, modifier: ICoordinateValueModifier, addButton: boolean, gui: GuiBase): void;
    static createVec3dInputsVertical(x: number, y: number, textFieldWidth: number, pos: Vec3, modifier: ICoordinateValueModifier, addButton: boolean, gui: GuiBase): void;
    static get currentScreen(): Screen;
    static get currentScreenHeight(): number;
    static get currentScreenWidth(): number;
    static get displayHeight(): number;
    static get displayWidth(): number;
    static get scaledWindowHeight(): number;
    static get scaledWindowWidth(): number;
    static getCoordinateValueString(type: CoordinateType, pos: BlockPos): string;
    static getCoordinateValueString(type: CoordinateType, pos: Vec3): string;
  }


  class IEntityOwnedInventory {
    malilib$getEntityOwner(): Entity;
    malilib$setEntityOwner(var1: Entity): void;
  }


  class IF3KeyStateSetter {
    malilib$setF3KeyState(var1: boolean): void;
  }


  class InfoUtils {
    static readonly INFO_MESSAGE_CONSUMER: IStringConsumer;
    static printActionbarMessage(key: string, ...args: any[]): void;
    static printBooleanConfigToggleMessage(prettyName: string, newValue: boolean): void;
    static renderInGameMessages(drawContext: GuiGraphics): void;
    static sendVanillaMessage(message: MutableComponent): void;
    static showGuiAndInGameMessage(type: MessageType, translationKey: string, ...args: any[]): void;
    static showGuiAndInGameMessage(type: MessageType, lifeTime: number, translationKey: string, ...args: any[]): void;
    static showGuiMessage(type: MessageType, translationKey: string, ...args: any[]): void;
    static showGuiMessage(type: MessageType, lifeTime: number, translationKey: string, ...args: any[]): void;
    static showGuiOrActionBarMessage(type: MessageType, translationKey: string, ...args: any[]): void;
    static showGuiOrActionBarMessage(type: MessageType, lifeTime: number, translationKey: string, ...args: any[]): void;
    static showGuiOrInGameMessage(type: MessageType, translationKey: string, ...args: any[]): void;
    static showGuiOrInGameMessage(type: MessageType, lifeTime: number, translationKey: string, ...args: any[]): void;
    static showInGameMessage(type: MessageType, translationKey: string, ...args: any[]): void;
    static showInGameMessage(type: MessageType, lifeTime: number, translationKey: string, ...args: any[]): void;
  }


  class InputUtils {
    static get mouseX(): number;
    static get mouseY(): number;
  }


  class IntBoundingBox {
    static readonly CODEC: Codec;
    static readonly PACKET_CODEC: StreamCodec;
    readonly minX: number;
    readonly minY: number;
    readonly minZ: number;
    readonly maxX: number;
    readonly maxY: number;
    readonly maxZ: number;
    constructor(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number);
    containsPos(pos: Vec3i): boolean;
    containsPos(pos: number): boolean;
    static createForWorldBounds(world: Level): IntBoundingBox;
    static createProper(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): IntBoundingBox;
    equals(obj: any): boolean;
    expand(amount: number): IntBoundingBox;
    expand(x: number, y: number, z: number): IntBoundingBox;
    static fromArray(coords: number[]): IntBoundingBox;
    static fromVanillaBox(box: BoundingBox): IntBoundingBox;
    getMaxValueForAxis(axis: Axis): number;
    getMinValueForAxis(axis: Axis): number;
    hashCode(): number;
    intersects(box: IntBoundingBox): boolean;
    shrink(x: number, y: number, z: number): IntBoundingBox;
    toNBTIntArray(): IntArrayTag;
    toVanillaBox(): BoundingBox;
  }


  class InventoryUtils {
    static readonly PATTERN_ITEM_BASE: Pattern;
    static areNbtEqualIgnoreKeys<T>(tag1: DataComponentMap, tag2: DataComponentMap, type: DataComponentType<T>, ignoredKeys: Set<DataComponentType<T>>): boolean;
    static areNbtEqualIgnoreKeys(tag1: CompoundTag, tag2: CompoundTag, ignoredKeys: Set<string>): boolean;
    static areStacksAndNbtEqual(stack1: ItemStack, stack2: ItemStack): boolean;
    static areStacksEqual(stack1: ItemStack, stack2: ItemStack): boolean;
    static areStacksEqualIgnoreDurability(stack1: ItemStack, stack2: ItemStack): boolean;
    static areStacksEqualIgnoreNbt(stack1: ItemStack, stack2: ItemStack): boolean;
    static bundleCountItems(stack: ItemStack): number;
    static bundleHasItems(stack: ItemStack): boolean;
    static bundleOccupancy(stack: ItemStack): Fraction;
    static findEmptySlotInPlayerInventory(containerPlayer: AbstractContainerMenu, allowOffhand: boolean, reverse: boolean): number;
    static findSlotWithItem(container: AbstractContainerMenu, stackReference: ItemStack, reverse: boolean): number;
    static getAsInventory(items: NonNullList<ItemStack>): Container;
    static getAsItemList(inv: Container): NonNullList<ItemStack>;
    static getBundleItems(stackIn: ItemStack): NonNullList<ItemStack>;
    static getBundleItems(stackIn: ItemStack, maxSlots: number): NonNullList<ItemStack>;
    static getInventory(world: Level, pos: BlockPos): Container;
    static getInventoryItemCounts(inv: Container): Object2IntOpenHashMap<ItemType>;
    static getItemEntry(id: ResourceLocation, registry: RegistryAccess): Holder<Item>;
    static getItemStackFromString(itemNameIn: string): ItemStack;
    static getItemStackFromString(itemNameIn: string, data: DataComponentMap): ItemStack;
    static getItemStackFromString(itemNameIn: string, count: number): ItemStack;
    static getItemStackFromString(itemNameIn: string, count: number, data: DataComponentMap): ItemStack;
    static getItemStackFromString(stringIn: string, registry: RegistryAccess): ItemStack;
    static getNbtInventory(nbt: CompoundTag): Container;
    static getNbtInventory(nbt: CompoundTag, slotCount: number, registry: Provider): Container;
    static getNbtInventoryHorseFix(nbt: CompoundTag, slotCount: number, registry: Provider): Container;
    static getNbtItems(tag: CompoundTag): NonNullList<ItemStack>;
    static getNbtItems(nbt: CompoundTag, slotCount: number, registry: Provider): NonNullList<ItemStack>;
    static getPlayerEnderItems(player: Player): PlayerEnderChestContainer;
    static getPlayerEnderItemsFromNbt(nbt: CompoundTag, registry: Provider): PlayerEnderChestContainer;
    static getSellingItems(offers: MerchantOffers): NonNullList<ItemStack>;
    static getSellingItemsFromNbt(nbt: CompoundTag, registry: RegistryAccess): NonNullList<ItemStack>;
    static getStoredBlockEntityNbt(stack: ItemStack): CompoundTag;
    static getStoredItemCounts(stackShulkerBox: ItemStack): Object2IntOpenHashMap<ItemType>;
    static getStoredItems(stackIn: ItemStack): NonNullList<ItemStack>;
    static getStoredItems(stackIn: ItemStack, slotCount: number): NonNullList<ItemStack>;
    static hasNbtItems(nbt: CompoundTag): boolean;
    static hasStoredBlockEntityData(stack: ItemStack): boolean;
    static isRegularInventorySlot(slotNumber: number, allowOffhand: boolean): boolean;
    static shulkerBoxHasItems(stack: ItemStack): boolean;
    static stackHasNbtItems(stack: ItemStack, registry: RegistryAccess): CompoundTag;
    static swapItemToMainHand(stackReference: ItemStack, mc: Minecraft): boolean;
    static swapSlots(container: AbstractContainerMenu, slotNum: number, hotbarSlot: number): void;
  }


  class ItemType {
    constructor(stack: ItemStack);

    constructor(stack: ItemStack, copy: boolean, checkNBT: boolean);
    checkNBT(): boolean;
    equals(obj: any): boolean;
    get stack(): ItemStack;
    hashCode(): number;
    set stack(stack: ItemStack);
    toString(): string;
  }


  class JsonUtils {
    static readonly GSON: Gson;
    static blockPosFromJson(obj: JsonObject, name: string): BlockPos;
    static blockPosToJson(pos: BlockPos): JsonArray;
    static deepCopy(jsonObject: JsonObject): JsonObject;
    static deepCopy(jsonArray: JsonArray): JsonArray;
    static deepCopy(jsonElement: JsonElement): JsonElement;
    static getBoolean(obj: JsonObject, name: string): boolean;
    static getBooleanOrDefault(obj: JsonObject, name: string, defaultValue: boolean): boolean;
    static getDouble(obj: JsonObject, name: string): number;
    static getDoubleOrDefault(obj: JsonObject, name: string, defaultValue: number): number;
    static getFloat(obj: JsonObject, name: string): number;
    static getFloatOrDefault(obj: JsonObject, name: string, defaultValue: number): number;
    static getInteger(obj: JsonObject, name: string): number;
    static getIntegerOrDefault(obj: JsonObject, name: string, defaultValue: number): number;
    static getLong(obj: JsonObject, name: string): number;
    static getLongOrDefault(obj: JsonObject, name: string, defaultValue: number): number;
    static getNestedObject(parent: JsonObject, key: string, create: boolean): JsonObject;
    static getString(obj: JsonObject, name: string): string;
    static getStringOrDefault(obj: JsonObject, name: string, defaultValue: string): string;
    static hasArray(obj: JsonObject, name: string): boolean;
    static hasBlockPos(obj: JsonObject, name: string): boolean;
    static hasBoolean(obj: JsonObject, name: string): boolean;
    static hasDouble(obj: JsonObject, name: string): boolean;
    static hasFloat(obj: JsonObject, name: string): boolean;
    static hasInteger(obj: JsonObject, name: string): boolean;
    static hasLong(obj: JsonObject, name: string): boolean;
    static hasObject(obj: JsonObject, name: string): boolean;
    static hasString(obj: JsonObject, name: string): boolean;
    static hasVec3d(obj: JsonObject, name: string): boolean;
    static parseJsonFile(file: File): JsonElement;
    static parseJsonFileAsPath(file: Path): JsonElement;
    static vec3dFromJson(obj: JsonObject, name: string): Vec3;
    static vec3dToJson(vec: Vec3): JsonArray;
    static writeJsonToFile(root: JsonObject, file: File): boolean;
    static writeJsonToFileAsPath(root: JsonObject, file: Path): boolean;
  }


  class KeyCodes {
    static readonly KEY_NONE: number;
    static readonly KEY_SPACE: number;
    static readonly KEY_APOSTROPHE: number;
    static readonly KEY_COMMA: number;
    static readonly KEY_MINUS: number;
    static readonly KEY_PERIOD: number;
    static readonly KEY_SLASH: number;
    static readonly KEY_0: number;
    static readonly KEY_1: number;
    static readonly KEY_2: number;
    static readonly KEY_3: number;
    static readonly KEY_4: number;
    static readonly KEY_5: number;
    static readonly KEY_6: number;
    static readonly KEY_7: number;
    static readonly KEY_8: number;
    static readonly KEY_9: number;
    static readonly KEY_SEMICOLON: number;
    static readonly KEY_EQUAL: number;
    static readonly KEY_A: number;
    static readonly KEY_B: number;
    static readonly KEY_C: number;
    static readonly KEY_D: number;
    static readonly KEY_E: number;
    static readonly KEY_F: number;
    static readonly KEY_G: number;
    static readonly KEY_H: number;
    static readonly KEY_I: number;
    static readonly KEY_J: number;
    static readonly KEY_K: number;
    static readonly KEY_L: number;
    static readonly KEY_M: number;
    static readonly KEY_N: number;
    static readonly KEY_O: number;
    static readonly KEY_P: number;
    static readonly KEY_Q: number;
    static readonly KEY_R: number;
    static readonly KEY_S: number;
    static readonly KEY_T: number;
    static readonly KEY_U: number;
    static readonly KEY_V: number;
    static readonly KEY_W: number;
    static readonly KEY_X: number;
    static readonly KEY_Y: number;
    static readonly KEY_Z: number;
    static readonly KEY_LEFT_BRACKET: number;
    static readonly KEY_BACKSLASH: number;
    static readonly KEY_RIGHT_BRACKET: number;
    static readonly KEY_GRAVE_ACCENT: number;
    static readonly KEY_WORLD_1: number;
    static readonly KEY_WORLD_2: number;
    static readonly KEY_ESCAPE: number;
    static readonly KEY_ENTER: number;
    static readonly KEY_TAB: number;
    static readonly KEY_BACKSPACE: number;
    static readonly KEY_INSERT: number;
    static readonly KEY_DELETE: number;
    static readonly KEY_RIGHT: number;
    static readonly KEY_LEFT: number;
    static readonly KEY_DOWN: number;
    static readonly KEY_UP: number;
    static readonly KEY_PAGE_UP: number;
    static readonly KEY_PAGE_DOWN: number;
    static readonly KEY_HOME: number;
    static readonly KEY_END: number;
    static readonly KEY_CAPS_LOCK: number;
    static readonly KEY_SCROLL_LOCK: number;
    static readonly KEY_NUM_LOCK: number;
    static readonly KEY_PRINT_SCREEN: number;
    static readonly KEY_PAUSE: number;
    static readonly KEY_F1: number;
    static readonly KEY_F2: number;
    static readonly KEY_F3: number;
    static readonly KEY_F4: number;
    static readonly KEY_F5: number;
    static readonly KEY_F6: number;
    static readonly KEY_F7: number;
    static readonly KEY_F8: number;
    static readonly KEY_F9: number;
    static readonly KEY_F10: number;
    static readonly KEY_F11: number;
    static readonly KEY_F12: number;
    static readonly KEY_F13: number;
    static readonly KEY_F14: number;
    static readonly KEY_F15: number;
    static readonly KEY_F16: number;
    static readonly KEY_F17: number;
    static readonly KEY_F18: number;
    static readonly KEY_F19: number;
    static readonly KEY_F20: number;
    static readonly KEY_F21: number;
    static readonly KEY_F22: number;
    static readonly KEY_F23: number;
    static readonly KEY_F24: number;
    static readonly KEY_F25: number;
    static readonly KEY_KP_0: number;
    static readonly KEY_KP_1: number;
    static readonly KEY_KP_2: number;
    static readonly KEY_KP_3: number;
    static readonly KEY_KP_4: number;
    static readonly KEY_KP_5: number;
    static readonly KEY_KP_6: number;
    static readonly KEY_KP_7: number;
    static readonly KEY_KP_8: number;
    static readonly KEY_KP_9: number;
    static readonly KEY_KP_DECIMAL: number;
    static readonly KEY_KP_DIVIDE: number;
    static readonly KEY_KP_MULTIPLY: number;
    static readonly KEY_KP_SUBTRACT: number;
    static readonly KEY_KP_ADD: number;
    static readonly KEY_KP_ENTER: number;
    static readonly KEY_KP_EQUAL: number;
    static readonly KEY_LEFT_SHIFT: number;
    static readonly KEY_LEFT_CONTROL: number;
    static readonly KEY_LEFT_ALT: number;
    static readonly KEY_LEFT_SUPER: number;
    static readonly KEY_RIGHT_SHIFT: number;
    static readonly KEY_RIGHT_CONTROL: number;
    static readonly KEY_RIGHT_ALT: number;
    static readonly KEY_RIGHT_SUPER: number;
    static readonly KEY_MENU: number;
    static readonly MOUSE_BUTTON_1: number;
    static readonly MOUSE_BUTTON_2: number;
    static readonly MOUSE_BUTTON_3: number;
    static readonly MOUSE_BUTTON_4: number;
    static readonly MOUSE_BUTTON_5: number;
    static readonly MOUSE_BUTTON_6: number;
    static readonly MOUSE_BUTTON_7: number;
    static readonly MOUSE_BUTTON_8: number;
    static getKeyCodeFromName(name: string): number;
    static getNameForKey(keyCode: number): string;
  }


  interface LayerMode extends Enum<LayerMode> {}
  class LayerMode extends Enum<LayerMode> {
    static readonly ALL: LayerMode;
    static readonly SINGLE_LAYER: LayerMode;
    static readonly LAYER_RANGE: LayerMode;
    static readonly ALL_BELOW: LayerMode;
    static readonly ALL_ABOVE: LayerMode;
    cycle(forward: boolean): IConfigOptionListEntry;
    fromString(name: string): LayerMode;
    static fromStringStatic(name: string): LayerMode;
    get displayName(): string;
    get index(): number;
    get serializedName(): string;
    get stringValue(): string;
    static valueOf(name: string): LayerMode;
    static values(): LayerMode[];
  }


  class LayerRange {
    static readonly CODEC: Codec;
    static readonly PACKET_CODEC: StreamCodec;
    constructor(refresher: IRangeChangeListener);
    static createFromJson(obj: JsonObject, refresher: IRangeChangeListener): LayerRange;
    fromJson(obj: JsonObject): void;
    get axis(): Axis;
    get currentLayerString(): string;
    get layerAbove(): number;
    get layerBelow(): number;
    get layerMax(): number;
    get layerMin(): number;
    get layerMode(): LayerMode;
    get layerRangeMax(): number;
    get layerRangeMin(): number;
    get layerSingle(): number;
    get moveLayerRangeMax(): boolean;
    get moveLayerRangeMin(): boolean;
    getClampedArea(posMin: BlockPos, posMax: BlockPos): IntBoundingBox;
    getClampedArea(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): IntBoundingBox;
    getClampedRenderBoundingBox(box: IntBoundingBox): IntBoundingBox;
    getClampedValue(value: number, axis: Axis): number;
    getCurrentLayerValue(isSecondValue: boolean): number;
    getExpandedBox(world: Level, expandAmount: number): IntBoundingBox;
    intersects(pos: SubChunkPos): boolean;
    intersects(box: IntBoundingBox): boolean;
    intersectsBox(posMin: BlockPos, posMax: BlockPos): boolean;
    intersectsBox(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): boolean;
    isPositionAtRenderEdgeOnSide(pos: BlockPos, side: Direction): boolean;
    isPositionWithinRange(pos: BlockPos): boolean;
    isPositionWithinRange(posLong: number): boolean;
    isPositionWithinRange(x: number, y: number, z: number): boolean;
    moveLayer(amount: number): boolean;
    set axis(axis: Axis);
    set layerAbove(layer: number);
    set layerBelow(layer: number);
    set layerMode(mode: LayerMode);
    set layerRangeMax(layer: number);
    set layerRangeMin(layer: number);
    set layerSingle(layer: number);
    setLayerMode(mode: LayerMode, printMessage: boolean): void;
    setRefresher(refresher: IRangeChangeListener): LayerRange;
    setSingleBoundaryToPosition(entity: Entity): void;
    setToPosition(entity: Entity): void;
    toJson(): JsonObject;
    toggleHotkeyMoveRangeMax(): void;
    toggleHotkeyMoveRangeMin(): void;
  }


  class ListUtils {
    static containsAny<T>(hayStack: Collection<T>, needles: Collection<T>): boolean;
    static extractEntriesToSecondList<T>(listFrom: T[], listTo: T[], filter: Predicate<T>, removeMatched: boolean): void;
    static getAppendedList<T>(originalList: Collection<T>, additionalEntries: Collection<T>): ImmutableList<T>;
    static getAppendedList<T>(originalList: Collection<T>, newEntry: T): ImmutableList<T>;
    static getNextEntry<T>(list: T[], currentValue: T, reverse: boolean): T;
    static getNextEntry<T>(list: T[], currentValue: T, reverse: boolean, predicate: Predicate<T>): T;
    static getPrependedList<T>(newEntry: T, originalList: Collection<T>): ImmutableList<T>;
    static replaceOrAddValue<T>(originalList: Collection<T>, oldValue: T, newValue: T, replaceInPlace: boolean): ImmutableList<T>;
  }


  class MathUtils {
    static average(arr: number[]): number;
    static average(arr: number[]): number;
    static average(arr: number[]): number;
    static clamp(value: number, min: number, max: number): number;
    static clamp(value: number, min: number, max: number): number;
    static clamp(value: number, min: number, max: number): number;
    static clamp(value: number, min: number, max: number): number;
    static distanceFromPointToLine(pointX: number, pointY: number, line1X: number, line1Y: number, line2X: number, line2Y: number): number;
    static floor(value: number): number;
    static floor(value: number): number;
    static getCoordinateRandom(x: number, y: number, z: number): number;
    static getMaxValue(arr: number[]): number;
    static getMaxValue(arr: number[]): number;
    static getMinValue(arr: number[]): number;
    static getMinValue(arr: number[]): number;
    static getPositionRandom(pos: Vec3i): number;
    static getRotationVector(yaw: number, pitch: number): Vec3;
    static log2(value: number): number;
    static log2DeBruijn(value: number): number;
    static positiveModulo(numerator: number, denominator: number): number;
    static positiveModulo(numerator: number, denominator: number): number;
    static roundDown(value: number, interval: number): number;
    static roundDown(value: number, interval: number): number;
    static roundUp(value: number, interval: number): number;
    static roundUp(value: number, interval: number): number;
    static roundUp(number: number, interval: number): number;
    static scale(vec: Vec3, factor: number): Vec3;
    static smallestEncompassingPowerOfTwo(value: number): number;
    static sqrtf(value: number): number;
    static wrapDegrees(value: number): number;
    static wrapDegrees(value: number): number;
    static wrapDegrees(angle: number): number;
    static wrapRadianAngle(angle: number): number;
  }


  interface MessageOutputType extends Enum<MessageOutputType> {}
  class MessageOutputType extends Enum<MessageOutputType> {
    static readonly NONE: MessageOutputType;
    static readonly ACTIONBAR: MessageOutputType;
    static readonly MESSAGE: MessageOutputType;
    cycle(forward: boolean): IConfigOptionListEntry;
    fromString(name: string): MessageOutputType;
    static fromStringStatic(name: string): MessageOutputType;
    get displayName(): string;
    get stringValue(): string;
    static valueOf(name: string): MessageOutputType;
    static values(): MessageOutputType[];
  }


  interface NbtKeys extends fi_dy_masa_malilib_util_nbt_NbtKeys {}
  class NbtKeys extends fi_dy_masa_malilib_util_nbt_NbtKeys {
  }


  class NBTUtils {
    static createBlockPosTag(pos: Vec3i): CompoundTag;
    static readAttachedPosFromTag(tag: CompoundTag): BlockPos;
    static readBlockPos(tag: CompoundTag): BlockPos;
    static readBlockPosFromIntArray(nbt: CompoundTag, key: string): BlockPos;
    static readEntityPositionFromTag(tag: CompoundTag): Vec3;
    static readVec3d(tag: CompoundTag): Vec3;
    static writeAttachedPosToTag(pos: BlockPos, tag: CompoundTag): CompoundTag;
    static writeBlockPosToNbtIntArray(pos: BlockPos, key: string): CompoundTag;
    static writeBlockPosToTag(pos: Vec3i, tag: CompoundTag): CompoundTag;
    static writeEntityPositionToTag(pos: Vec3, tag: CompoundTag): CompoundTag;
    static writeVec3dToTag(vec: Vec3, tag: CompoundTag): CompoundTag;
  }


  class PayloadUtils {
    static fromNbtCompound(inParameter: CompoundTag): MaLiLibBuf;
    static fromNbtElement(inParameter: Tag): MaLiLibBuf;
    static fromPacketByteBuf(inParameter: FriendlyByteBuf): MaLiLibBuf;
    static fromRegistryByteBuf(inParameter: RegistryFriendlyByteBuf): MaLiLibBuf;
    static toNbtCompound(inParameter: MaLiLibBuf): CompoundTag;
    static toNbtElement(inParameter: MaLiLibBuf): Tag;
    static toPacketByteBuf(inParameter: MaLiLibBuf): FriendlyByteBuf;
    static toRegistryByteBuf(inParameter: MaLiLibBuf, registryManager: RegistryAccess): RegistryFriendlyByteBuf;
  }


  class PositionUtils {
    static readonly ALL_DIRECTIONS: Direction[];
    static readonly HORIZONTAL_DIRECTIONS: Direction[];
    static readonly VERTICAL_DIRECTIONS: Direction[];
    static getClosestLookingDirection(entity: Entity): Direction;
    static getClosestLookingDirection(entity: Entity, verticalThreshold: number): Direction;
    static getEntityBlockPos(entity: Entity): BlockPos;
    static getHitPart(originalSide: Direction, playerFacingH: Direction, pos: BlockPos, hitVec: Vec3): HitPart;
    static getHitVecCenter(basePos: BlockPos, facing: Direction): Vec3;
    static getPositionInfrontOfEntity(entity: Entity): BlockPos;
    static getPositionInfrontOfEntity(entity: Entity, verticalThreshold: number): BlockPos;
    static getTargetedDirection(side: Direction, playerFacingH: Direction, pos: BlockPos, hitVec: Vec3): Direction;
    static modifyValue(type: CoordinateType, valueIn: Vec3, amount: number): Vec3;
    static modifyValue(type: CoordinateType, valueIn: BlockPos, amount: number): BlockPos;
    static setValue(type: CoordinateType, valueIn: Vec3, newValue: number): Vec3;
    static setValue(type: CoordinateType, valueIn: BlockPos, newValue: number): BlockPos;
  }


  interface Quadrant extends Enum<Quadrant> {}
  class Quadrant extends Enum<Quadrant> {
    static readonly NORTH_WEST: Quadrant;
    static readonly NORTH_EAST: Quadrant;
    static readonly SOUTH_WEST: Quadrant;
    static readonly SOUTH_EAST: Quadrant;
    cycle(forward: boolean): IConfigOptionListEntry;
    fromString(name: string): Quadrant;
    static fromStringStatic(name: string): Quadrant;
    get displayName(): string;
    get serializedName(): string;
    get stringValue(): string;
    static getQuadrant(pos: BlockPos, center: Vec3): Quadrant;
    static getQuadrant(x: number, z: number, center: Vec3): Quadrant;
    static getQuadrant(x: number, z: number, center: Vec3): Quadrant;
    static valueOf(name: string): Quadrant;
    static values(): Quadrant[];
  }


  interface Schema extends Enum<Schema> {}
  class Schema extends Enum<Schema> {
    static readonly SCHEMA_FUTURE: Schema;
    static readonly SCHEMA_1_21_06: Schema;
    static readonly SCHEMA_25W21A: Schema;
    static readonly SCHEMA_25W16A: Schema;
    static readonly SCHEMA_1_21_05: Schema;
    static readonly SCHEMA_25W10A: Schema;
    static readonly SCHEMA_25W03A: Schema;
    static readonly SCHEMA_25W02A: Schema;
    static readonly SCHEMA_1_21_04: Schema;
    static readonly SCHEMA_24W46A: Schema;
    static readonly SCHEMA_24W44A: Schema;
    static readonly SCHEMA_1_21_03: Schema;
    static readonly SCHEMA_1_21_02: Schema;
    static readonly SCHEMA_24W40A: Schema;
    static readonly SCHEMA_24W37A: Schema;
    static readonly SCHEMA_24W35A: Schema;
    static readonly SCHEMA_24W33A: Schema;
    static readonly SCHEMA_1_21_01: Schema;
    static readonly SCHEMA_1_21_00: Schema;
    static readonly SCHEMA_24W21A: Schema;
    static readonly SCHEMA_24W18A: Schema;
    static readonly SCHEMA_1_20_05: Schema;
    static readonly SCHEMA_24W14A: Schema;
    static readonly SCHEMA_24W13A: Schema;
    static readonly SCHEMA_24W12A: Schema;
    static readonly SCHEMA_24W10A: Schema;
    static readonly SCHEMA_24W09A: Schema;
    static readonly SCHEMA_24W07A: Schema;
    static readonly SCHEMA_24W03A: Schema;
    static readonly SCHEMA_23W51A: Schema;
    static readonly SCHEMA_1_20_04: Schema;
    static readonly SCHEMA_23W46A: Schema;
    static readonly SCHEMA_23W43B: Schema;
    static readonly SCHEMA_23W40A: Schema;
    static readonly SCHEMA_1_20_02: Schema;
    static readonly SCHEMA_23W35A: Schema;
    static readonly SCHEMA_23W31A: Schema;
    static readonly SCHEMA_1_20_01: Schema;
    static readonly SCHEMA_1_20_00: Schema;
    static readonly SCHEMA_23W18A: Schema;
    static readonly SCHEMA_23W16A: Schema;
    static readonly SCHEMA_23W12A: Schema;
    static readonly SCHEMA_1_19_04: Schema;
    static readonly SCHEMA_1_19_03: Schema;
    static readonly SCHEMA_1_19_02: Schema;
    static readonly SCHEMA_1_19_01: Schema;
    static readonly SCHEMA_1_19_00: Schema;
    static readonly SCHEMA_22W19A: Schema;
    static readonly SCHEMA_22W16A: Schema;
    static readonly SCHEMA_22W11A: Schema;
    static readonly SCHEMA_1_18_02: Schema;
    static readonly SCHEMA_1_18_01: Schema;
    static readonly SCHEMA_1_18_00: Schema;
    static readonly SCHEMA_21W44A: Schema;
    static readonly SCHEMA_21W41A: Schema;
    static readonly SCHEMA_21W37A: Schema;
    static readonly SCHEMA_1_17_01: Schema;
    static readonly SCHEMA_1_17_00: Schema;
    static readonly SCHEMA_21W20A: Schema;
    static readonly SCHEMA_21W15A: Schema;
    static readonly SCHEMA_21W10A: Schema;
    static readonly SCHEMA_21W05A: Schema;
    static readonly SCHEMA_20W49A: Schema;
    static readonly SCHEMA_20W45A: Schema;
    static readonly SCHEMA_1_16_05: Schema;
    static readonly SCHEMA_1_16_04: Schema;
    static readonly SCHEMA_1_16_03: Schema;
    static readonly SCHEMA_1_16_02: Schema;
    static readonly SCHEMA_1_16_01: Schema;
    static readonly SCHEMA_1_16_00: Schema;
    static readonly SCHEMA_20W22A: Schema;
    static readonly SCHEMA_20W15A: Schema;
    static readonly SCHEMA_20W06A: Schema;
    static readonly SCHEMA_1_15_02: Schema;
    static readonly SCHEMA_1_15_01: Schema;
    static readonly SCHEMA_1_15_00: Schema;
    static readonly SCHEMA_19W46B: Schema;
    static readonly SCHEMA_19W40A: Schema;
    static readonly SCHEMA_19W34A: Schema;
    static readonly SCHEMA_1_14_04: Schema;
    static readonly SCHEMA_1_14_03: Schema;
    static readonly SCHEMA_1_14_02: Schema;
    static readonly SCHEMA_1_14_01: Schema;
    static readonly SCHEMA_1_14_00: Schema;
    static readonly SCHEMA_19W14B: Schema;
    static readonly SCHEMA_19W08B: Schema;
    static readonly SCHEMA_18W50A: Schema;
    static readonly SCHEMA_18W43A: Schema;
    static readonly SCHEMA_1_13_02: Schema;
    static readonly SCHEMA_1_13_01: Schema;
    static readonly SCHEMA_1_13_00: Schema;
    static readonly SCHEMA_18W22C: Schema;
    static readonly SCHEMA_18W14B: Schema;
    static readonly SCHEMA_18W07C: Schema;
    static readonly SCHEMA_17W50A: Schema;
    static readonly SCHEMA_17W47A: Schema;
    static readonly SCHEMA_17W46A: Schema;
    static readonly SCHEMA_17W43A: Schema;
    static readonly SCHEMA_1_12_02: Schema;
    static readonly SCHEMA_1_12_01: Schema;
    static readonly SCHEMA_1_12_00: Schema;
    static readonly SCHEMA_1_11_02: Schema;
    static readonly SCHEMA_1_11_00: Schema;
    static readonly SCHEMA_1_10_02: Schema;
    static readonly SCHEMA_1_10_00: Schema;
    static readonly SCHEMA_1_09_04: Schema;
    static readonly SCHEMA_1_09_00: Schema;
    static readonly SCHEMA_15W32A: Schema;
    decode(buf: ByteBuf): Schema;
    encode(buf: ByteBuf, value: Schema): void;
    get dataVersion(): number;
    get index(): number;
    get serializedName(): string;
    get string(): string;
    get stringValue(): string;
    static getSchemaByDataVersion(dataVersion: number): Schema;
    static getSchemaByString(str: string): Schema;
    toString(): string;
    static valueOf(name: string): Schema;
    static values(): Schema[];
  }


  class StringUtils {
    static addTranslatedLines(linesOut: string[], translationKey: string): void;
    static clampTextToRenderLength(text: string, maxWidth: number, side: LeftRight, indicator: string): string;
    static containsOrderedCharacters(needle: string, haystack: string): boolean;
    static drawString(x: number, y: number, color: number, text: string, drawContext: GuiGraphics): void;
    static get fontHeight(): number;
    static get worldOrServerName(): string;
    static getClampedDisplayStringRenderlen(list: string[], maxWidth: number, prefix: string, suffix: string): string;
    static getClampedDisplayStringStrlen(list: string[], maxWidth: number, prefix: string, suffix: string): string;
    static getColor(colorStr: string, defaultColor: number): number;
    static getDisplayStringForList(list: string[], maxWidth: number, quote: string, prefix: string, suffix: string): string;
    static getDurationString(durationMs: number): string;
    static getMaxStringRenderWidth(...strings: string[]): number;
    static getMaxStringRenderWidth(lines: string[], l: string): number;
    static getMaxStringRenderWidth(translator: Function<string, string>, ...strings: string[]): number;
    static getMaxStringRenderWidth(lines: string[], translator: Function<string, string>): number;
    static getMaxStringRenderWidthOfObjects<T>(list: T[], translator: Function<T, string>): number;
    static getModVersionString(modId: string): string;
    static getPrettyFileSizeText(fileSize: number, decimalPlaces: number): string;
    static getStorageFileName(globalData: boolean, prefix: string, suffix: string, defaultName: string): string;
    static getStringWidth(text: string): number;
    static getTranslatedAsTextOrFallback(key: string, fallback: string): Component;
    static getTranslatedOrFallback(key: string, fallback: string): string;
    static getWorldOrServerNameOrDefault(defaultStr: string): string;
    static hasTranslation(translationKey: string): boolean;
    static identifier(fullPath: string): ResourceLocation;
    static identifier(nameSpace: string, path: string): ResourceLocation;
    static prettifyRawTranslationPath(translationPath: string): string;
    static sendOpenFileChatMessage(sender: Player, messageKey: string, file: File): void;
    static sendOpenFileChatMessage(sender: Player, messageKey: string, file: Path): void;
    static splitCamelCase(str: string): string;
    static splitTextToLines(linesOut: string[], textIn: string, maxLineLength: number): void;
    static stringifyAddress(address: SocketAddress): string;
    static stripExtensionIfMatches(str: string, extension: string): string;
    static translate(translationKey: string, ...args: any[]): string;
    static translateAndLineSplit(translationKey: string, ...args: any[]): string[];
    static translateAndLineSplit(lineConsumer: Consumer<string>, translationKey: string, ...args: any[]): void;
    static translateAsText(translationKey: string, ...args: any[]): Component;
    static translateable(translationKey: string): MutableComponent;
    static translateable(translationKey: string, ...args: any[]): MutableComponent;
  }


  interface SubChunkPos extends Vec3i {}
  class SubChunkPos extends Vec3i {
    static readonly BLOCK_POS_CODEC: Codec;
    static readonly VEC3I_CODEC: Codec;
    static readonly CODEC: Codec;
    constructor(pos: BlockPos);

    constructor(x: number, y: number, z: number);
  }


  class WorldUtils {
    static getBestChunk(chunkX: number, chunkZ: number, mc: Minecraft): LevelChunk;
    static getBestWorld(mc: Minecraft): Level;
    static getBiomeEntry(key: ResourceKey<Biome>, registry: RegistryAccess): Holder<Biome>;
    static getBiomeEntry(id: ResourceLocation, registry: RegistryAccess): Holder<Biome>;
    static getBiomeEntry(id: string, registry: RegistryAccess): Holder<Biome>;
    static getDimensionId(world: Level): string;
    static getDimensionTypeEntry(key: DimensionType, registry: RegistryAccess): Holder<DimensionType>;
    static getDimensionTypeEntry(id: ResourceLocation, registry: RegistryAccess): Holder<DimensionType>;
    static getDimensionTypeEntry(id: string, registry: RegistryAccess): Holder<DimensionType>;
    static getHighestSectionYOffset(chunk: ChunkAccess): number;
    static getPlains(registry: RegistryAccess): Holder<Biome>;
    static getTheEnd(registry: RegistryAccess): Holder<Biome>;
    static getWastes(registry: RegistryAccess): Holder<Biome>;
  }

}

declare module 'fi.dy.masa.malilib.util.AlphaNumComparator' {
  import { AlphaNumComparator } from 'fi.dy.masa.malilib.util';
  import { Comparator } from 'java.util';

  interface AlphaNumStringComparator extends Comparator<string>, AlphaNumComparator {}
  class AlphaNumStringComparator extends Comparator<string> {
  }

}

declare module 'fi.dy.masa.malilib.util.Constants' {
  class NBT {
    static readonly TAG_END: number;
    static readonly TAG_BYTE: number;
    static readonly TAG_SHORT: number;
    static readonly TAG_INT: number;
    static readonly TAG_LONG: number;
    static readonly TAG_FLOAT: number;
    static readonly TAG_DOUBLE: number;
    static readonly TAG_BYTE_ARRAY: number;
    static readonly TAG_STRING: number;
    static readonly TAG_LIST: number;
    static readonly TAG_COMPOUND: number;
    static readonly TAG_INT_ARRAY: number;
    static readonly TAG_LONG_ARRAY: number;
    static readonly TAG_ANY_NUMERIC: number;
  }

}

declare module 'fi.dy.masa.malilib.util.data' {
  import { Codec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Pattern } from 'java.util.regex';
  import { StringRepresentable } from 'net.minecraft.util';
  import { Supplier } from 'java.util.function';
  import { GuiBase } from 'fi.dy.masa.malilib.gui';
  import { ResourceLocation as net_minecraft_resources_ResourceLocation } from 'net.minecraft.resources';
  import { List } from 'java.util';

  class Color4f {
    static readonly RGBA_CODEC: Codec;
    static readonly RGB_CODEC: Codec;
    static readonly CODEC: Codec;
    static readonly LIST_CODEC: Codec;
    static readonly PACKET_CODEC: StreamCodec;
    static readonly HEX_8: Pattern;
    static readonly HEX_6: Pattern;
    static readonly HEX_4: Pattern;
    static readonly HEX_3: Pattern;
    static readonly WHITE: Color4f;
    static readonly ZERO: Color4f;
    readonly r: number;
    readonly g: number;
    readonly b: number;
    readonly a: number;
    readonly ri: number;
    readonly gi: number;
    readonly bi: number;
    readonly ai: number;
    readonly intValue: number;
    constructor(r: number, g: number, b: number);

    constructor(r: number, g: number, b: number, a: number);
    static convertRgb2Hsv(color: number): number[];
    equals(o: any): boolean;
    static fromColor(color: number): Color4f;
    static fromColor(color: Color4f): Color4f;
    static fromColor(color: number, alpha: number): Color4f;
    static fromColor(color: Color4f, alpha: number): Color4f;
    static fromString(str: string): Color4f;
    get debugString(): string;
    get intValue(): number;
    static getColorFromHue(hue: number): number;
    static getColorFromString(colorStr: string, defaultColor: number): number;
    static getHexColorString(color: number): string;
    hashCode(): number;
    static toArgbInt(a: number, r: number, g: number, b: number): number;
    toHexString(): string;
    toString(): string;
    toVanillaArgb(): number;
    withAlpha(alpha: number): Color4f;
  }


  class Constants {
    static isValidChar(chr: string): boolean;
  }


  interface IEnumCodecProvider extends StringRepresentable {}
  class IEnumCodecProvider extends StringRepresentable {
    get index(): number;
    get stringValue(): string;
  }


  class ModInfo {
    static readonly NO_MOD: ModInfo;
    constructor(modId: string, modName: string);

    constructor(modId: string, modName: string, configScreenSupplier: Supplier<GuiBase>);
    equals(o: any): boolean;
    get configScreenSupplier(): Supplier<GuiBase>;
    get modId(): string;
    get modName(): string;
    hashCode(): number;
    toString(): string;
  }


  class ResourceLocation {
    static readonly CODEC: Codec;
    static readonly PACKET_CODEC: StreamCodec;
    constructor(str: string);

    constructor(name: string, path: string);

    constructor(id: net_minecraft_resources_ResourceLocation);
    get id(): net_minecraft_resources_ResourceLocation;
    get namespace(): string;
    get path(): string;
    static of(str: string): ResourceLocation;
    static of(name: string, path: string): ResourceLocation;
    static of(id: net_minecraft_resources_ResourceLocation): ResourceLocation;
    static of(list: net_minecraft_resources_ResourceLocation[]): ResourceLocation[];
    static ofVanilla(path: string): ResourceLocation;
    toString(): string;
    toTranslationKey(): string;
  }

}

declare module 'fi.dy.masa.malilib.util.data.Constants' {
  class NBT {
    static readonly TAG_END: number;
    static readonly TAG_BYTE: number;
    static readonly TAG_SHORT: number;
    static readonly TAG_INT: number;
    static readonly TAG_LONG: number;
    static readonly TAG_FLOAT: number;
    static readonly TAG_DOUBLE: number;
    static readonly TAG_BYTE_ARRAY: number;
    static readonly TAG_STRING: number;
    static readonly TAG_LIST: number;
    static readonly TAG_COMPOUND: number;
    static readonly TAG_INT_ARRAY: number;
    static readonly TAG_LONG_ARRAY: number;
    static readonly TAG_ANY_NUMERIC: number;
  }

}

declare module 'fi.dy.masa.malilib.util.game' {
  import { Optional, List, Set } from 'java.util';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Property, DirectionProperty } from 'net.minecraft.world.level.block.state.properties';
  import { Comparable, Integer } from 'java.lang';
  import { Direction, FrontAndTop, RegistryAccess, BlockPos } from 'net.minecraft.core';
  import { ItemStack } from 'net.minecraft.world.item';
  import { CrafterBlockEntity, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { Level } from 'net.minecraft.world.level';
  import { BlockStatePredicate, RayTraceFluidHandling, IRayPositionHandler, RayTraceCalculationData } from 'fi.dy.masa.malilib.util.game.RayTraceUtils';
  import { HitResult, Vec3 } from 'net.minecraft.world.phys';
  import { Entity } from 'net.minecraft.world.entity';
  import { Fluid } from 'ClipContext';
  import { LayerRange } from 'fi.dy.masa.malilib.util';

  class BlockUtils {
    static compareProperties<T extends Comparable<T>>(state: BlockState, otherState: BlockState): boolean;
    static getBlockStateFromString(str: string): Optional<BlockState>;
    static getBlockStateStringFromTag(stateTag: CompoundTag): string;
    static getBlockStateTagFromString(stateString: string): CompoundTag;
    static getBlockStateWithProperty<T extends Comparable<T>>(state: BlockState, prop: Property<T>, value: Comparable<any>): BlockState;
    static getDirectionFacingIndex(stack: ItemStack, facing: Direction): number;
    static getDisabledSlots(ce: CrafterBlockEntity): Set<number>;
    static getFirstDirectionProperty(state: BlockState): Optional<DirectionProperty>;
    static getFirstPropertyFacingValue(state: BlockState): Optional<Direction>;
    static getFormattedBlockStateProperties(state: BlockState): string[];
    static getFormattedBlockStateProperties(state: BlockState, separator: string): string[];
    static getOrientationFacingIndex(stack: ItemStack, facing: Direction): number;
    static getPropertyFacingValue(state: BlockState): Direction;
    static getPropertyHopperFacingValue(state: BlockState): Direction;
    static getPropertyHorizontalFacingValue(state: BlockState): Direction;
    static getPropertyOrientationFacing(state: BlockState): Direction;
    static getPropertyOrientationRotation(state: BlockState): Direction;
    static getPropertyOrientationValue(state: BlockState): FrontAndTop;
    static getPropertyValueByName<T extends Comparable<T>>(prop: Property<T>, valStr: string): T;
    static isFacingValidForDirection(stack: ItemStack, facing: Direction): boolean;
    static isFacingValidForOrientation(stack: ItemStack, facing: Direction): boolean;
    static isFluidBlock(state: BlockState): boolean;
    static isFluidSourceBlock(state: BlockState): boolean;
    static isInSameGroup(left: BlockState, right: BlockState): boolean;
    static matchPropertiesOnly(left: BlockState, right: BlockState): boolean;
    static setStackNbt(stack: ItemStack, be: BlockEntity, registry: RegistryAccess): void;
  }


  class IGameHud {
    malilib$setOverlayRemaining(var1: number): void;
  }


  class PlacementUtils {
    static isReplaceable(world: Level, pos: BlockPos, checkMaterial: boolean): boolean;
  }


  class RayTraceUtils {
    static readonly BLOCK_STATE_AIR: BlockState;
    static readonly BLOCK_FILTER_ANY: BlockStatePredicate;
    static readonly BLOCK_FILTER_NON_AIR: BlockStatePredicate;
    static checkRayCollision(data: RayTraceCalculationData, world: Level, ignoreNonCollidable: boolean): boolean;
    static getRayTraceFromEntity(world: Level, entity: Entity, fluidHandling: Fluid): HitResult;
    static getRayTraceFromEntity(world: Level, entity: Entity, fluidHandling: Fluid, includeEntities: boolean, maxRange: number): HitResult;
    static rayTraceAdvance(data: RayTraceCalculationData): boolean;
    static rayTraceBlocks(world: Level, start: Vec3, end: Vec3, fluidMode: RayTraceFluidHandling, ignoreNonCollidable: boolean, returnLastUncollidableBlock: boolean, layerRange: LayerRange, maxSteps: number): HitResult;
    static rayTraceBlocks(world: Level, start: Vec3, end: Vec3, handler: IRayPositionHandler, fluidMode: RayTraceFluidHandling, blockFilter: BlockStatePredicate, ignoreNonCollidable: boolean, returnLastUncollidableBlock: boolean, layerRange: LayerRange, maxSteps: number): HitResult;
  }

}

declare module 'fi.dy.masa.malilib.util.game.RayTraceUtils' {
  import { Level } from 'net.minecraft.world.level';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { MutableBlockPos } from 'BlockPos';
  import { Vec3, HitResult } from 'net.minecraft.world.phys';
  import { Direction } from 'net.minecraft.core';
  import { LayerRange } from 'fi.dy.masa.malilib.util';

  class IRayPositionHandler {
    handleRayTracePosition(var1: RayTraceCalculationData, var2: Level, var3: boolean): boolean;
  }


  class BlockStatePredicate {
    test(var1: BlockState): boolean;
  }


  interface RayTraceFluidHandling extends Enum<RayTraceFluidHandling> {}
  class RayTraceFluidHandling extends Enum<RayTraceFluidHandling> {
    static readonly NONE: RayTraceFluidHandling;
    static readonly SOURCE_ONLY: RayTraceFluidHandling;
    static readonly ANY: RayTraceFluidHandling;
    handled(blockState: BlockState): boolean;
    static valueOf(name: string): RayTraceFluidHandling;
    static values(): RayTraceFluidHandling[];
  }


  class RayTraceCalculationData {
    readonly fluidMode: RayTraceFluidHandling;
    readonly blockFilter: BlockStatePredicate;
    readonly mutablePos: MutableBlockPos;
    readonly start: Vec3;
    readonly end: Vec3;
    readonly endBlockX: number;
    readonly endBlockY: number;
    readonly endBlockZ: number;
    blockX: number;
    blockY: number;
    blockZ: number;
    currentX: number;
    currentY: number;
    currentZ: number;
    facing: Direction;
    trace: HitResult;
    constructor(start: Vec3, end: Vec3, fluidMode: RayTraceFluidHandling, blockFilter: BlockStatePredicate, range: LayerRange);
    checkRayCollision(world: Level, ignoreNonCollidable: boolean): boolean;
    isPositionWithinRange(): boolean;
    isValidBlock(state: BlockState): boolean;
    setBlockPos(x: number, y: number, z: number): void;
  }

}

declare module 'fi.dy.masa.malilib.util.game.wrap' {
  import { Minecraft, Options } from 'net.minecraft.client';
  import { ClientLevel, MultiPlayerGameMode, ClientPacketListener } from 'net.minecraft.client.multiplayer';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { RegistryAccess, Holder } from 'net.minecraft.core';
  import { Player, Inventory } from 'net.minecraft.world.entity.player';
  import { ClickType } from 'net.minecraft.world.inventory';
  import { MinecraftServer } from 'net.minecraft.server';
  import { GameRules } from 'net.minecraft.world.level';
  import { Entity, EntityType } from 'net.minecraft.world.entity';
  import { HitResult } from 'net.minecraft.world.phys';
  import { Runnable } from 'java.lang';
  import { Supplier } from 'java.util.function';
  import { Path } from 'java.nio.file';
  import { CompoundTag, ListTag, Tag, ByteTag, ShortTag, IntTag, LongTag, FloatTag, DoubleTag, StringTag } from 'net.minecraft.nbt';
  import { Set, Collection, List } from 'java.util';
  import { Block } from 'net.minecraft.world.level.block';
  import { ResourceLocation } from 'fi.dy.masa.malilib.util.data';
  import { ResourceLocation as net_minecraft_resources_ResourceLocation } from 'net.minecraft.resources';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { Item } from 'net.minecraft.world.item';

  class GameWrap {
    static clickSlot(syncId: number, slotId: number, mouseButton: number, clickType: ClickType): void;
    static get cameraEntity(): Entity;
    static get client(): Minecraft;
    static get clientPlayer(): Player;
    static get clientPlayersServerWorld(): ServerLevel;
    static get clientRegistryManager(): RegistryAccess;
    static get clientWorld(): ClientLevel;
    static get currentSinglePlayerWorldDirectory(): Path;
    static get currentWorldTick(): number;
    static get gameRules(): GameRules;
    static get hitResult(): HitResult;
    static get integratedServer(): MinecraftServer;
    static get interactionManager(): MultiPlayerGameMode;
    static get networkConnection(): ClientPacketListener;
    static get options(): Options;
    static get playerInventory(): Inventory;
    static get playerName(): string;
    static get playerReachDistance(): number;
    static get renderDistanceChunks(): number;
    static get serverRegistryManager(): RegistryAccess;
    static get vanillaOptionsScreenScale(): number;
    static isCreativeMode(): boolean;
    static isHideGui(): boolean;
    static isSinglePlayer(): boolean;
    static isUnicode(): boolean;
    static openFile(file: Path): void;
    static printToChat(msg: string): void;
    static profilerPop(): void;
    static profilerPush(name: string): void;
    static profilerPush(nameSupplier: Supplier<string>): void;
    static profilerSwap(name: string): void;
    static profilerSwap(nameSupplier: Supplier<string>): void;
    static scheduleToClientThread(task: Runnable): void;
    static sendChatMessage(command: string): boolean;
    static sendCommand(command: string): boolean;
    static showHotbarMessage(msg: string): void;
  }


  class NbtWrap {
    static addTag(listTag: ListTag, value: Tag): void;
    static asByteTag(value: number): ByteTag;
    static asDoubleTag(value: number): DoubleTag;
    static asFloatTag(value: number): FloatTag;
    static asIntTag(value: number): IntTag;
    static asLongTag(value: number): LongTag;
    static asShortTag(value: number): ShortTag;
    static asStringTag(value: string): StringTag;
    static contains(tag: CompoundTag, name: string, typeId: number): boolean;
    static containsByte(tag: CompoundTag, name: string): boolean;
    static containsByteArray(tag: CompoundTag, name: string): boolean;
    static containsCompound(tag: CompoundTag, name: string): boolean;
    static containsDouble(tag: CompoundTag, name: string): boolean;
    static containsFloat(tag: CompoundTag, name: string): boolean;
    static containsInt(tag: CompoundTag, name: string): boolean;
    static containsIntArray(tag: CompoundTag, name: string): boolean;
    static containsList(tag: CompoundTag, name: string): boolean;
    static containsLong(tag: CompoundTag, name: string): boolean;
    static containsLongArray(tag: CompoundTag, name: string): boolean;
    static containsShort(tag: CompoundTag, name: string): boolean;
    static containsString(tag: CompoundTag, name: string): boolean;
    static copy(tag: CompoundTag): CompoundTag;
    static copy(tag: ListTag): ListTag;
    static getBoolean(tag: CompoundTag, name: string): boolean;
    static getBooleanOrDefault(tag: CompoundTag, name: string, defaultValue: boolean): boolean;
    static getByte(tag: CompoundTag, name: string): number;
    static getByteArray(tag: CompoundTag, name: string): number[];
    static getByteOrDefault(tag: CompoundTag, name: string, defaultValue: number): number;
    static getCommandFeedbackName(tag: Tag): string;
    static getCompound(tag: CompoundTag, name: string): CompoundTag;
    static getCompoundAt(listTag: ListTag, index: number): CompoundTag;
    static getDouble(tag: CompoundTag, name: string): number;
    static getDoubleAt(listTag: ListTag, index: number): number;
    static getDoubleOrDefault(tag: CompoundTag, name: string, defaultValue: number): number;
    static getFloat(tag: CompoundTag, name: string): number;
    static getFloatOrDefault(tag: CompoundTag, name: string, defaultValue: number): number;
    static getInt(tag: CompoundTag, name: string): number;
    static getIntArray(tag: CompoundTag, name: string): number[];
    static getIntAt(listTag: ListTag, index: number): number;
    static getIntOrDefault(tag: CompoundTag, name: string, defaultValue: number): number;
    static getKeys(tag: CompoundTag): Set<string>;
    static getList(tag: CompoundTag, name: string, type: number): ListTag;
    static getListOfCompounds(tag: CompoundTag, name: string): ListTag;
    static getListSize(list: ListTag): number;
    static getListStoredType(listTag: ListTag): number;
    static getLong(tag: CompoundTag, name: string): number;
    static getLongOrDefault(tag: CompoundTag, name: string, defaultValue: number): number;
    static getShort(tag: CompoundTag, name: string): number;
    static getShortOrDefault(tag: CompoundTag, name: string, defaultValue: number): number;
    static getString(tag: CompoundTag, name: string): string;
    static getStringOrDefault(tag: CompoundTag, name: string, defaultValue: string): string;
    static getTag(tag: CompoundTag, name: string): Tag;
    static getTypeId(tag: Tag): number;
    static hasUUID(tag: CompoundTag): boolean;
    static hasUUID(tag: CompoundTag, keyM: string, keyL: string): boolean;
    static putBoolean(tag: CompoundTag, name: string, value: boolean): void;
    static putByte(tag: CompoundTag, name: string, value: number): void;
    static putByteArray(tag: CompoundTag, name: string, value: number[]): void;
    static putDouble(tag: CompoundTag, name: string, value: number): void;
    static putFloat(tag: CompoundTag, name: string, value: number): void;
    static putInt(tag: CompoundTag, name: string, value: number): void;
    static putIntArray(tag: CompoundTag, name: string, value: number[]): void;
    static putLong(tag: CompoundTag, name: string, value: number): void;
    static putShort(tag: CompoundTag, name: string, value: number): void;
    static putString(tag: CompoundTag, name: string, value: string): void;
    static putTag(tag: CompoundTag, name: string, value: Tag): void;
    static remove(tag: CompoundTag, name: string): void;
  }


  class RegistryUtils {
    static get registeredBlockIds(): Collection<ResourceLocation>;
    static get registeredItemIds(): Collection<ResourceLocation>;
    static get sortedBlockList(): Block[];
    static get sortedItemList(): Item[];
    static getBlockById(id: ResourceLocation): Block;
    static getBlockById(id: net_minecraft_resources_ResourceLocation): Block;
    static getBlockByIdStr(name: string): Block;
    static getBlockEntityType(id: ResourceLocation, registry: RegistryAccess): Holder<BlockEntityType<any>>;
    static getBlockEntityType(id: net_minecraft_resources_ResourceLocation, registry: RegistryAccess): Holder<BlockEntityType<any>>;
    static getBlockEntry(id: ResourceLocation, registry: RegistryAccess): Holder<Block>;
    static getBlockEntry(id: net_minecraft_resources_ResourceLocation, registry: RegistryAccess): Holder<Block>;
    static getBlockId(block: Block): ResourceLocation;
    static getBlockId(state: BlockState): ResourceLocation;
    static getBlockIdStr(block: Block): string;
    static getBlockIdStr(state: BlockState): string;
    static getEntityType(id: ResourceLocation, registry: RegistryAccess): Holder<EntityType<any>>;
    static getEntityType(id: net_minecraft_resources_ResourceLocation, registry: RegistryAccess): Holder<EntityType<any>>;
    static getItemById(id: ResourceLocation): Item;
    static getItemByIdStr(name: string): Item;
    static getItemId(item: Item): ResourceLocation;
    static getItemIdStr(item: Item): string;
  }

}

declare module 'fi.dy.masa.malilib.util.GuiUtils' {
  import { ITextFieldListener } from 'fi.dy.masa.malilib.gui.interfaces';
  import { GuiTextFieldGeneric } from 'fi.dy.masa.malilib.gui';
  import { CoordinateType } from 'fi.dy.masa.malilib.util.PositionUtils';
  import { ICoordinateValueModifier } from 'fi.dy.masa.malilib.interfaces';
  import { IButtonActionListener, ButtonBase } from 'fi.dy.masa.malilib.gui.button';

  interface TextFieldListenerCoordinateInput extends ITextFieldListener<GuiTextFieldGeneric> {}
  class TextFieldListenerCoordinateInput extends ITextFieldListener<GuiTextFieldGeneric> {
    constructor(type: CoordinateType, modifier: ICoordinateValueModifier);
    onTextChange(textField: GuiTextFieldGeneric): boolean;
  }


  interface ButtonListenerCoordinateInput extends IButtonActionListener {}
  class ButtonListenerCoordinateInput extends IButtonActionListener {
    constructor(type: CoordinateType, modifier: ICoordinateValueModifier);
    actionPerformedWithButton(button: ButtonBase, mouseButton: number): void;
  }

}

declare module 'fi.dy.masa.malilib.util.GuiUtils.ButtonListenerCoordinateInput' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Type extends Enum<Type> {}
  class Type extends Enum<Type> {
    static readonly NUDGE_COORD_X: Type;
    static readonly NUDGE_COORD_Y: Type;
    static readonly NUDGE_COORD_Z: Type;
    static valueOf(name: string): Type;
    static values(): Type[];
  }

}

declare module 'fi.dy.masa.malilib.util.InfoUtils' {
  import { IStringConsumer } from 'fi.dy.masa.malilib.interfaces';

  interface InfoMessageConsumer extends IStringConsumer {}
  class InfoMessageConsumer extends IStringConsumer {
    setString(string: string): void;
  }

}

declare module 'fi.dy.masa.malilib.util.log' {
  import { Class } from 'java.lang';

  class AnsiColors {
    static readonly RESET: string;
    static readonly BLACK: string;
    static readonly RED: string;
    static readonly GREEN: string;
    static readonly YELLOW: string;
    static readonly BLUE: string;
    static readonly PURPLE: string;
    static readonly CYAN: string;
    static readonly WHITE: string;
    static readonly BLACK_BOLD: string;
    static readonly RED_BOLD: string;
    static readonly GREEN_BOLD: string;
    static readonly YELLOW_BOLD: string;
    static readonly BLUE_BOLD: string;
    static readonly PURPLE_BOLD: string;
    static readonly CYAN_BOLD: string;
    static readonly WHITE_BOLD: string;
    static readonly BLACK_UNDERLINED: string;
    static readonly RED_UNDERLINED: string;
    static readonly GREEN_UNDERLINED: string;
    static readonly YELLOW_UNDERLINED: string;
    static readonly BLUE_UNDERLINED: string;
    static readonly PURPLE_UNDERLINED: string;
    static readonly CYAN_UNDERLINED: string;
    static readonly WHITE_UNDERLINED: string;
    static readonly BLACK_BACKGROUND: string;
    static readonly RED_BACKGROUND: string;
    static readonly GREEN_BACKGROUND: string;
    static readonly YELLOW_BACKGROUND: string;
    static readonly BLUE_BACKGROUND: string;
    static readonly PURPLE_BACKGROUND: string;
    static readonly CYAN_BACKGROUND: string;
    static readonly WHITE_BACKGROUND: string;
    static readonly BLACK_BRIGHT: string;
    static readonly RED_BRIGHT: string;
    static readonly GREEN_BRIGHT: string;
    static readonly YELLOW_BRIGHT: string;
    static readonly BLUE_BRIGHT: string;
    static readonly PURPLE_BRIGHT: string;
    static readonly CYAN_BRIGHT: string;
    static readonly WHITE_BRIGHT: string;
    static readonly BLACK_BOLD_BRIGHT: string;
    static readonly RED_BOLD_BRIGHT: string;
    static readonly GREEN_BOLD_BRIGHT: string;
    static readonly YELLOW_BOLD_BRIGHT: string;
    static readonly BLUE_BOLD_BRIGHT: string;
    static readonly PURPLE_BOLD_BRIGHT: string;
    static readonly CYAN_BOLD_BRIGHT: string;
    static readonly WHITE_BOLD_BRIGHT: string;
    static readonly BLACK_BACKGROUND_BRIGHT: string;
    static readonly RED_BACKGROUND_BRIGHT: string;
    static readonly GREEN_BACKGROUND_BRIGHT: string;
    static readonly YELLOW_BACKGROUND_BRIGHT: string;
    static readonly BLUE_BACKGROUND_BRIGHT: string;
    static readonly PURPLE_BACKGROUND_BRIGHT: string;
    static readonly CYAN_BACKGROUND_BRIGHT: string;
    static readonly WHITE_BACKGROUND_BRIGHT: string;
    static readonly ANSI_STRIKEOUT_BLACK: string;
    static readonly ANSI_STRIKEOUT_RED: string;
    static readonly ANSI_STRIKEOUT_GREEN: string;
    static readonly ANSI_STRIKEOUT_YELLOW: string;
    static readonly ANSI_STRIKEOUT_BLUE: string;
    static readonly ANSI_STRIKEOUT_PURPLE: string;
    static readonly ANSI_STRIKEOUT_CYAN: string;
    static readonly ANSI_STRIKEOUT_WHITE: string;
  }


  interface AnsiLogger extends IAnsiLogger {}
  class AnsiLogger extends IAnsiLogger {
    constructor(clazz: Class<any>);

    constructor(clazz: Class<any>, debug: boolean);

    constructor(clazz: Class<any>, debug: boolean, ansiColor: boolean);
    debug(fmt: string, ...args: any[]): void;
    error(fmt: string, ...args: any[]): void;
    fatal(fmt: string, ...args: any[]): void;
    info(fmt: string, ...args: any[]): void;
    toggleAnsiColor(toggle: boolean): void;
    toggleDebug(toggle: boolean): void;
    warn(fmt: string, ...args: any[]): void;
  }


  class IAnsiLogger {
    debug(var1: string, ...var2: any[]): void;
    error(var1: string, ...var2: any[]): void;
    fatal(var1: string, ...var2: any[]): void;
    format(format: string, ...args: any[]): string;
    info(var1: string, ...var2: any[]): void;
    warn(var1: string, ...var2: any[]): void;
  }

}

declare module 'fi.dy.masa.malilib.util.nbt' {
  import { BlockEntityType, SignText } from 'net.minecraft.world.level.block.entity';
  import { CompoundTag, ListTag, Tag, NbtAccounter } from 'net.minecraft.nbt';
  import { Set, List, UUID, Map, Collection } from 'java.util';
  import { Integer, Long, Boolean, Double, Float } from 'java.lang';
  import { Pair, Triple } from 'org.apache.commons.lang3.tuple';
  import { Holder, BlockPos, RegistryAccess, NonNullList, Direction, Vec3i } from 'net.minecraft.core';
  import { MobEffect, MobEffectInstance } from 'net.minecraft.world.effect';
  import { Occupant } from 'BeehiveBlockEntity';
  import { Data } from 'VibrationSystem';
  import { ItemStack, DyeColor } from 'net.minecraft.world.item';
  import { ResolvableProfile } from 'net.minecraft.world.item.component';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Component } from 'net.minecraft.network.chat';
  import { Object2IntOpenHashMap } from 'it.unimi.dsi.fastutil.objects';
  import { EntityType } from 'net.minecraft.world.entity';
  import { AttributeMap, Attribute } from 'net.minecraft.world.entity.ai.attributes';
  import { MerchantOffers } from 'net.minecraft.world.item.trading';
  import { VillagerData } from 'net.minecraft.world.entity.npc';
  import { Reference } from 'Holder';
  import { FakeLeashData } from 'fi.dy.masa.malilib.util.EntityUtils';
  import { Gene } from 'Panda';
  import { PaintingVariant } from 'net.minecraft.world.entity.decoration';
  import { Variant } from 'Axolotl';
  import { CatVariant, FrogVariant, WolfVariant } from 'net.minecraft.world.entity.animal';
  import { Variant as net_minecraft_world_entity_animal_horse_Variant, Markings } from 'net.minecraft.world.entity.animal.horse';
  import { Variant as parrot_Variant } from 'Parrot';
  import { Pattern } from 'TropicalFish';
  import { Variant as rabbit_Variant } from 'Rabbit';
  import { Variant as llama_Variant } from 'Llama';
  import { Type } from 'Fox';
  import { FoodData } from 'net.minecraft.world.food';
  import { Function } from 'java.util.function';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { File, OutputStream } from 'java.io';
  import { Path } from 'java.nio.file';

  class BaseNbtStringifier {
    constructor(useNumberSuffix: boolean);

    constructor(colored: boolean, useNumberSuffix: boolean, baseColor: string);
  }


  class NbtBlockUtils {
    static getBeaconEffectsFromNbt(nbt: CompoundTag): Pair<Holder<MobEffect>, Holder<MobEffect>>;
    static getBeesDataFromNbt(nbt: CompoundTag): Pair<Occupant[], BlockPos>;
    static getBlockEntityTypeFromNbt(nbt: CompoundTag): BlockEntityType<any>;
    static getBookFromNbt(nbt: CompoundTag, registry: RegistryAccess): Pair<ItemStack, number>;
    static getDisabledSlotsFromNbt(nbt: CompoundTag): Set<number>;
    static getExitPortalFromNbt(nbt: CompoundTag): Pair<Long, BlockPos>;
    static getOutputSignalFromNbt(nbt: CompoundTag): number;
    static getRecipesUsedFromNbt(nbt: CompoundTag): Object2IntOpenHashMap<ResourceLocation>;
    static getSignTextFromNbt(nbt: CompoundTag, registry: RegistryAccess): Pair<Pair<SignText, SignText>, boolean>;
    static getSkulkSensorVibrationsFromNbt(nbt: CompoundTag, registry: RegistryAccess): Pair<number, Data>;
    static getSkullDataFromNbt(nbt: CompoundTag, registry: RegistryAccess): Pair<ResolvableProfile, Pair<ResourceLocation, Component>>;
    static setBlockEntityTypeToNbt(type: BlockEntityType<any>, nbtIn: CompoundTag): CompoundTag;
  }


  class NbtEntityUtils {
    static getActiveStatusEffectsFromNbt(nbt: CompoundTag): Map<Holder<MobEffect>, MobEffectInstance>;
    static getAgeFromNbt(nbt: CompoundTag): Pair<number, number>;
    static getArmorItemsFromNbt(nbt: CompoundTag, registry: RegistryAccess): NonNullList<ItemStack>;
    static getAttributeBaseValueFromNbt(nbt: CompoundTag, attribute: Holder<Attribute>): number;
    static getAttributeValueFromNbt(nbt: CompoundTag, attribute: Holder<Attribute>): number;
    static getAttributesFromNbt(nbt: CompoundTag): AttributeMap;
    static getAxolotlVariantFromNbt(nbt: CompoundTag): Variant;
    static getBodyArmorFromNbt(nbt: CompoundTag, registry: RegistryAccess): ItemStack;
    static getCatVariantFromNbt(nbt: CompoundTag): Pair<ResourceKey<CatVariant>, DyeColor>;
    static getCustomNameFromNbt(nbt: CompoundTag, registry: RegistryAccess): Component;
    static getDolphinDataFromNbt(nbt: CompoundTag): Triple<BlockPos, number, boolean>;
    static getDrownedConversionTimerFromNbt(nbt: CompoundTag): Pair<number, number>;
    static getEntityTypeEntry(id: ResourceLocation, registry: RegistryAccess): Reference<EntityType<any>>;
    static getEntityTypeFromNbt(nbt: CompoundTag): EntityType<any>;
    static getFishVariantFromNbt(nbt: CompoundTag): Pattern;
    static getFoxVariantFromNbt(nbt: CompoundTag): Type;
    static getFrogVariantFromNbt(nbt: CompoundTag): ResourceKey<FrogVariant>;
    static getHandItemsFromNbt(nbt: CompoundTag, registry: RegistryAccess): NonNullList<ItemStack>;
    static getHealthFromNbt(nbt: CompoundTag): Pair<number, number>;
    static getHorseVariantFromNbt(nbt: CompoundTag): Pair<net_minecraft_world_entity_animal_horse_Variant, Markings>;
    static getItemFrameDirectionsFromNbt(nbt: CompoundTag): Pair<Direction, Direction>;
    static getLeashDataFromNbt(nbt: CompoundTag): FakeLeashData;
    static getLlamaTypeFromNbt(nbt: CompoundTag): Pair<llama_Variant, number>;
    static getOwnerAndSaddle(nbt: CompoundTag, registry: RegistryAccess): Pair<UUID, ItemStack>;
    static getPaintingDataFromNbt(nbt: CompoundTag, registry: RegistryAccess): Pair<Direction, PaintingVariant>;
    static getPandaGenesFromNbt(nbt: CompoundTag): Pair<Gene, Gene>;
    static getParrotVariantFromNbt(nbt: CompoundTag): parrot_Variant;
    static getPlayerExpFromNbt(nbt: CompoundTag): Triple<number, number, number>;
    static getPlayerHungerFromNbt(nbt: CompoundTag): FoodData;
    static getRabbitTypeFromNbt(nbt: CompoundTag): rabbit_Variant;
    static getSheepColorFromNbt(nbt: CompoundTag): DyeColor;
    static getSpeedAndJumpStrengthFromNbt(nbt: CompoundTag): Pair<number, number>;
    static getStrayConversionTimeFromNbt(nbt: CompoundTag): number;
    static getTradeOffersFromNbt(nbt: CompoundTag, registry: RegistryAccess): MerchantOffers;
    static getUUIDFromNbt(nbt: CompoundTag): UUID;
    static getVillagerDataFromNbt(nbt: CompoundTag): VillagerData;
    static getWolfVariantFromNbt(nbt: CompoundTag): Pair<ResourceKey<WolfVariant>, DyeColor>;
    static getZombieConversionTimerFromNbt(nbt: CompoundTag): Pair<number, UUID>;
    static setCustomNameToNbt(name: Component, registry: RegistryAccess, nbtIn: CompoundTag): CompoundTag;
    setEntityTypeToNbt(type: EntityType<any>, nbtIn: CompoundTag): CompoundTag;
  }


  class NbtKeys {
    static readonly ID: string;
    static readonly UUID: string;
    static readonly COMPONENTS: string;
    static readonly AGE: string;
    static readonly FIRE: string;
    static readonly POS: string;
    static readonly ITEMS: string;
    static readonly INVENTORY: string;
    static readonly ITEM: string;
    static readonly ITEM_2: string;
    static readonly SLOT: string;
    static readonly COUNT: string;
    static readonly ENDER_ITEMS: string;
    static readonly DISABLED_SLOTS: string;
    static readonly PRIMARY_EFFECT: string;
    static readonly SECONDARY_EFFECT: string;
    static readonly FLOWER: string;
    static readonly BEES: string;
    static readonly OUTPUT_SIGNAL: string;
    static readonly VIBRATION: string;
    static readonly LISTENER: string;
    static readonly EXIT: string;
    static readonly FRONT_TEXT: string;
    static readonly BACK_TEXT: string;
    static readonly WAXED: string;
    static readonly BOOK: string;
    static readonly PAGE: string;
    static readonly RECORD: string;
    static readonly SKULL_NAME: string;
    static readonly NOTE: string;
    static readonly PROFILE: string;
    static readonly RECIPES_USED: string;
    static readonly BRAIN: string;
    static readonly MEMORIES: string;
    static readonly ATTRIB: string;
    static readonly EFFECTS: string;
    static readonly CUSTOM_NAME: string;
    static readonly HEALTH: string;
    static readonly HAND_ITEMS: string;
    static readonly ARMOR_ITEMS: string;
    static readonly BODY_ARMOR: string;
    static readonly SADDLE: string;
    static readonly OWNER: string;
    static readonly FORCED_AGE: string;
    static readonly OFFERS: string;
    static readonly VILLAGER: string;
    static readonly TRADE_RECIPES: string;
    static readonly ZOMBIE_CONVERSION: string;
    static readonly CONVERSION_PLAYER: string;
    static readonly DROWNED_CONVERSION: string;
    static readonly IN_WATER: string;
    static readonly STRAY_CONVERSION: string;
    static readonly LEASH: string;
    static readonly MAIN_GENE: string;
    static readonly HIDDEN_GENE: string;
    static readonly ITEM_ROTATION: string;
    static readonly FACING: string;
    static readonly FACING_2: string;
    static readonly VARIANT: string;
    static readonly VARIANT_2: string;
    static readonly COLLAR: string;
    static readonly COLOR: string;
    static readonly BUCKET_VARIANT: string;
    static readonly RABBIT_TYPE: string;
    static readonly FOX_TYPE: string;
    static readonly SALMON_TYPE: string;
    static readonly STRENGTH: string;
    static readonly EXP_LEVEL: string;
    static readonly EXP_TOTAL: string;
    static readonly EXP_PROGRESS: string;
    static readonly FOOD_LEVEL: string;
    static readonly FOOD_TIMER: string;
    static readonly FOOD_SATURATION: string;
    static readonly FOOD_EXHAUSTION: string;
    static readonly RECIPE_BOOK: string;
    static readonly RECIPES: string;
    static readonly DISPLAYED: string;
    static readonly EATING_HAY: string;
    static readonly HORSE_TEMPER: string;
    static readonly SITTING: string;
    static readonly FALL_FLYING: string;
    static readonly TREASURE_X: string;
    static readonly TREASURE_Y: string;
    static readonly TREASURE_Z: string;
    static readonly GOT_FISH: string;
    static readonly MOISTNESS: string;
    static readonly OLD_TAGS: string;
    static readonly OLD_COUNT: string;
    static readonly OLD_DISPLAY: string;
    static readonly OLD_BLOCK_ENTITY: string;
    static readonly OLD_BLOCK_STATE: string;
    static readonly OLD_ENTITY: string;
    static readonly OLD_DAMAGE: string;
    static readonly OLD_REPAIR: string;
    static readonly OLD_UNBREAKABLE: string;
    static readonly OLD_BEES: string;
    static readonly OLD_SKULL_OWNER: string;
    static readonly OLD_PATTERNS: string;
    static readonly OLD_DECORATIONS: string;
    static readonly OLD_MAP_ID: string;
    static readonly OLD_MAP_COLOR: string;
    static readonly OLD_NAME: string;
    static readonly OLD_LORE: string;
    static readonly OLD_ATTRIBUTES: string;
    static readonly OLD_ENCHANTMENTS: string;
  }


  class NbtUtils {
    static asListTag<T>(values: Collection<T>, tagFactory: Function<T, Tag>): ListTag;
    static createBlockPos(pos: BlockPos): CompoundTag;
    static createBlockPosTag(pos: BlockPos): CompoundTag;
    static createBlockPosTag(pos: Vec3i): CompoundTag;
    static createEntityPosition(pos: Vec3): CompoundTag;
    static createEntityPositionToTag(pos: Vec3): CompoundTag;
    static createVec3iTag(pos: Vec3i): CompoundTag;
    static createVec3iToArray(pos: Vec3i, tagName: string): CompoundTag;
    static createVec3iToArrayTag(pos: Vec3i, tagName: string): CompoundTag;
    static getOrCreateCompound(tagIn: CompoundTag, tagName: string): CompoundTag;
    static putVec3i(tag: CompoundTag, pos: Vec3i): CompoundTag;
    static readAttachedPosFromTag(tag: CompoundTag): BlockPos;
    static readBlockPos(tag: CompoundTag): BlockPos;
    static readBlockPosFromArrayTag(tag: CompoundTag, tagName: string): BlockPos;
    static readBlockPosFromIntArray(nbt: CompoundTag, key: string): BlockPos;
    static readBlockPosFromListTag(tag: CompoundTag, tagName: string): BlockPos;
    static readEntityPositionFromTag(tag: CompoundTag): Vec3;
    static readNbtFromFile(file: File): CompoundTag;
    static readNbtFromFile(file: File, tracker: NbtAccounter): CompoundTag;
    static readNbtFromFileAsPath(file: Path): CompoundTag;
    static readNbtFromFileAsPath(file: Path, tracker: NbtAccounter): CompoundTag;
    static readUUID(tag: CompoundTag): UUID;
    static readUUID(tag: CompoundTag, keyM: string, keyL: string): UUID;
    static readVec3d(tag: CompoundTag): Vec3;
    static readVec3dFromListTag(tag: CompoundTag): Vec3;
    static readVec3dFromListTag(tag: CompoundTag, tagName: string): Vec3;
    static readVec3i(tag: CompoundTag): Vec3i;
    static readVec3iFromIntArray(nbt: CompoundTag, key: string): Vec3i;
    static readVec3iFromIntArrayTag(tag: CompoundTag, tagName: string): Vec3i;
    static readVec3iFromTag(tag: CompoundTag): Vec3i;
    static removeBlockPos(tag: CompoundTag): CompoundTag;
    static removeBlockPosFromTag(tag: CompoundTag): CompoundTag;
    static writeAttachedPosToTag(pos: BlockPos, tag: CompoundTag): CompoundTag;
    static writeBlockPos(pos: BlockPos, tag: CompoundTag): CompoundTag;
    static writeBlockPosToArrayTag(pos: Vec3i, tag: CompoundTag, tagName: string): CompoundTag;
    static writeBlockPosToListTag(pos: Vec3i, tag: CompoundTag, tagName: string): CompoundTag;
    static writeBlockPosToTag(pos: BlockPos, tag: CompoundTag): CompoundTag;
    static writeCompressed(tag: CompoundTag, outputStream: OutputStream): void;
    static writeCompressed(tag: CompoundTag, file: Path): void;
    static writeEntityPosition(pos: Vec3, tag: CompoundTag): CompoundTag;
    static writeEntityPositionToTag(pos: Vec3, tag: CompoundTag): CompoundTag;
    static writeUUID(tag: CompoundTag, uuid: UUID): void;
    static writeUUID(tag: CompoundTag, uuid: UUID, keyM: string, keyL: string): void;
    static writeVec3dToListTag(pos: Vec3, tag: CompoundTag): CompoundTag;
    static writeVec3dToListTag(pos: Vec3, tag: CompoundTag, tagName: string): CompoundTag;
    static writeVec3iToArray(pos: Vec3i, tag: CompoundTag, tagName: string): CompoundTag;
    static writeVec3iToArrayTag(pos: Vec3i, tag: CompoundTag, tagName: string): CompoundTag;
  }


  interface PrettyNbtStringifier extends BaseNbtStringifier {}
  class PrettyNbtStringifier extends BaseNbtStringifier {
    constructor();

    constructor(baseColor: string);
    getNbtLines(tag: CompoundTag): string[];
    setPrintTagType(printTagType: boolean): void;
  }


  interface SimpleNbtStringifier extends BaseNbtStringifier {}
  class SimpleNbtStringifier extends BaseNbtStringifier {
    constructor();

    constructor(baseColor: string);
    getNbtString(tag: CompoundTag): string;
  }

}

declare module 'fi.dy.masa.malilib.util.position' {
  import { Enum } from 'java.lang';
  import { Direction, Vec3i as net_minecraft_core_Vec3i, BlockPos } from 'net.minecraft.core';
  import { IConfigOptionListEntry } from 'fi.dy.masa.malilib.config';
  import { Mirror, Rotation } from 'net.minecraft.world.level.block';
  import { List } from 'java.util';
  import { Codec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Vector2d, Vector2i, Vector3d, Vector3f, Vector3i } from 'org.joml';
  import { Vec3 } from 'net.minecraft.world.phys';

  interface BlockMirror extends Enum<BlockMirror> {}
  class BlockMirror extends Enum<BlockMirror> {
    static readonly NONE: BlockMirror;
    static readonly X: BlockMirror;
    static readonly Y: BlockMirror;
    static readonly Z: BlockMirror;
    static byName(name: string): BlockMirror;
    cycle(reverse: boolean): BlockMirror;
    fromString(value: string): IConfigOptionListEntry;
    get displayName(): string;
    get index(): number;
    get serializedName(): string;
    get stringValue(): string;
    get vanillaMirror(): Mirror;
    mirror(direction: Direction): Direction;
    toRotation(direction: Direction): BlockRotation;
    static valueOf(name: string): BlockMirror;
    static values(): BlockMirror[];
  }


  interface BlockRotation extends Enum<BlockRotation> {}
  class BlockRotation extends Enum<BlockRotation> {
    static readonly NONE: BlockRotation;
    static readonly CW_90: BlockRotation;
    static readonly CW_180: BlockRotation;
    static readonly CCW_90: BlockRotation;
    add(rotation: BlockRotation): BlockRotation;
    static byName(name: string): BlockRotation;
    cycle(reverse: boolean): BlockRotation;
    fromString(value: string): IConfigOptionListEntry;
    get displayName(): string;
    get index(): number;
    get reverseRotation(): BlockRotation;
    get serializedName(): string;
    get stringValue(): string;
    get vanillaRotation(): Rotation;
    rotate(direction: Direction): Direction;
    static valueOf(name: string): BlockRotation;
    static values(): BlockRotation[];
  }


  class Vec2d {
    static readonly CODEC: Codec;
    static readonly PACKET_CODEC: StreamCodec;
    static readonly ZERO: Vec2d;
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number);
    equals(o: any): boolean;
    get x(): number;
    get y(): number;
    getDistance(x: number, y: number): number;
    getSquaredDistance(x: number, y: number): number;
    hashCode(): number;
    toString(): string;
    toVector(): Vector2d;
  }


  class Vec2i {
    static readonly CODEC: Codec;
    static readonly PACKET_CODEC: StreamCodec;
    static readonly ZERO: Vec2i;
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number);
    equals(o: any): boolean;
    get x(): number;
    get y(): number;
    getDistance(x: number, y: number): number;
    getSquaredDistance(x: number, y: number): number;
    hashCode(): number;
    toString(): string;
    toVector(): Vector2i;
  }


  class Vec3d {
    static readonly ZERO: Vec3d;
    readonly x: number;
    readonly y: number;
    readonly z: number;
    constructor(x: number, y: number, z: number);
    add(x: number, y: number, z: number): Vec3d;
    add(other: Vec3d): Vec3d;
    distanceTo(other: Vec3d): number;
    distanceTo(x: number, y: number, z: number): number;
    get x(): number;
    get y(): number;
    get z(): number;
    normalize(): Vec3d;
    static normalized(x: number, y: number, z: number): Vec3d;
    static of(x: number, y: number, z: number): Vec3d;
    static of(pos: Vec3): Vec3d;
    static of(pos: net_minecraft_core_Vec3i): Vec3d;
    scale(factor: number): Vec3d;
    squareDistanceTo(other: Vec3d): number;
    squareDistanceTo(other: Vec3): number;
    squareDistanceTo(x: number, y: number, z: number): number;
    subtract(x: number, y: number, z: number): Vec3d;
    subtract(other: Vec3d): Vec3d;
    toString(): string;
    toVanilla(): Vec3;
    toVector(): Vector3d;
  }


  class Vec3f {
    static readonly FLOAT_CODEC: Codec;
    static readonly DOUBLE_CODEC: Codec;
    static readonly CODEC: Codec;
    static readonly PACKET_CODEC: StreamCodec;
    static readonly ZERO: Vec3f;
    readonly x: number;
    readonly y: number;
    readonly z: number;
    constructor(x: number, y: number, z: number);

    constructor(x: number, y: number, z: number);
    get x(): number;
    get y(): number;
    get z(): number;
    normalize(): Vec3f;
    static normalized(x: number, y: number, z: number): Vec3f;
    toString(): string;
    toVector(): Vector3f;
  }


  interface Vec3i extends BlockPos {}
  class Vec3i extends BlockPos {
    static readonly ZERO: Vec3i;
    constructor(x: number, y: number, z: number);
    static of(blockPos: BlockPos): Vec3i;
    static of(vanilla: net_minecraft_core_Vec3i): Vec3i;
    squareDistanceOfCenterTo(pos: Vec3): number;
    squareDistanceTo(other: Vec3i): number;
    squareDistanceTo(x: number, y: number, z: number): number;
    toBlockPos(): BlockPos;
    toString(): string;
    toVanilla(): net_minecraft_core_Vec3i;
    toVector(): Vector3i;
  }

}

declare module 'fi.dy.masa.malilib.util.PositionUtils' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface CoordinateType extends Enum<CoordinateType> {}
  class CoordinateType extends Enum<CoordinateType> {
    static readonly X: CoordinateType;
    static readonly Y: CoordinateType;
    static readonly Z: CoordinateType;
    static valueOf(name: string): CoordinateType;
    static values(): CoordinateType[];
  }


  interface HitPart extends Enum<HitPart> {}
  class HitPart extends Enum<HitPart> {
    static readonly CENTER: HitPart;
    static readonly LEFT: HitPart;
    static readonly RIGHT: HitPart;
    static readonly BOTTOM: HitPart;
    static readonly TOP: HitPart;
    static valueOf(name: string): HitPart;
    static values(): HitPart[];
  }

}

declare module 'fi.dy.masa.malilib.util.restrictions' {
  import { Block } from 'net.minecraft.world.level.block';
  import { Item } from 'net.minecraft.world.item';
  import { ListType } from 'fi.dy.masa.malilib.util.restrictions.UsageRestriction';
  import { List, Set } from 'java.util';

  interface BlockRestriction extends UsageRestriction<Block> {}
  class BlockRestriction extends UsageRestriction<Block> {
  }


  interface ItemRestriction extends UsageRestriction<Item> {}
  class ItemRestriction extends UsageRestriction<Item> {
  }


  class UsageRestriction<TYPE = any> {
    get listType(): ListType;
    getListForType(type: ListType): Set<TYPE>;
    isAllowed(value: TYPE): boolean;
    set listType(type: ListType);
    setListContents(namesBlacklist: string[], namesWhitelist: string[]): void;
    setValuesForList(type: ListType, names: string[]): void;
  }

}

declare module 'fi.dy.masa.malilib.util.restrictions.UsageRestriction' {
  import { Enum } from 'java.lang';
  import { IConfigOptionListEntry } from 'fi.dy.masa.malilib.config';
  import { List } from 'java.util';

  interface ListType extends Enum<ListType> {}
  class ListType extends Enum<ListType> {
    static readonly NONE: ListType;
    static readonly BLACKLIST: ListType;
    static readonly WHITELIST: ListType;
    cycle(forward: boolean): IConfigOptionListEntry;
    fromString(name: string): ListType;
    static fromStringStatic(name: string): ListType;
    get displayName(): string;
    get stringValue(): string;
    static valueOf(name: string): ListType;
    static values(): ListType[];
  }

}

declare module 'fi.dy.masa.malilib.util.SubChunkPos' {
  import { Comparator } from 'java.util';
  import { SubChunkPos } from 'fi.dy.masa.malilib.util';

  interface DistanceComparator extends Comparator<SubChunkPos> {}
  class DistanceComparator extends Comparator<SubChunkPos> {
    constructor(referencePosition: SubChunkPos);
    compare(pos1: SubChunkPos, pos2: SubChunkPos): number;
  }

}

declare module 'fi.dy.masa.malilib.util.time' {
  import { Enum } from 'java.lang';
  import { IConfigOptionListEntry } from 'fi.dy.masa.malilib.config';
  import { List } from 'java.util';

  class DurationFmtType<T extends DurationFmt = any> {
    static readonly REGULAR: DurationFmtType;
    static readonly PRETTY: DurationFmtType;
    static readonly ISO_EXTENDED: DurationFmtType;
    static readonly FORMATTED: DurationFmtType;
    get fmt(): DurationFormat;
    init(fmt: DurationFormat): T;
  }


  interface DurationFormat extends Enum<DurationFormat> {}
  class DurationFormat extends Enum<DurationFormat> {
    static readonly REGULAR: DurationFormat;
    static readonly PRETTY: DurationFormat;
    static readonly ISO_EXTENDED: DurationFormat;
    static readonly FORMATTED: DurationFormat;
    cycle(forward: boolean): IConfigOptionListEntry;
    format(duration: number): string;
    format(duration: number, fmt: string): string;
    fromString(value: string): DurationFormat;
    static fromStringStatic(value: string): DurationFormat;
    get displayName(): string;
    get formatString(): string;
    get stringValue(): string;
    get type(): DurationFmtType<any>;
    toString(): string;
    static valueOf(name: string): DurationFormat;
    static values(): DurationFormat[];
  }


  class TimeFmtType<T extends TimeFmt = any> {
    static readonly REGULAR: TimeFmtType;
    static readonly ISO_LOCAL: TimeFmtType;
    static readonly ISO_OFFSET: TimeFmtType;
    static readonly FORMATTED: TimeFmtType;
    static readonly RFC1123: TimeFmtType;
    static readonly TIME_ONLY: TimeFmtType;
    static readonly DATE_ONLY: TimeFmtType;
    get fmt(): TimeFormat;
    init(fmt: TimeFormat): T;
  }


  interface TimeFormat extends Enum<TimeFormat> {}
  class TimeFormat extends Enum<TimeFormat> {
    static readonly REGULAR: TimeFormat;
    static readonly ISO_LOCAL: TimeFormat;
    static readonly ISO_OFFSET: TimeFormat;
    static readonly FORMATTED: TimeFormat;
    static readonly RFC1123: TimeFormat;
    static readonly TIME_ONLY: TimeFormat;
    static readonly DATE_ONLY: TimeFormat;
    cycle(forward: boolean): IConfigOptionListEntry;
    formatFrom(formattedTime: string): number;
    formatFrom(formattedTime: string, fmt: string): number;
    formatNow(): string;
    formatNow(fmt: string): string;
    formatTo(time: number): string;
    formatTo(time: number, fmt: string): string;
    fromString(value: string): TimeFormat;
    static fromStringStatic(value: string): TimeFormat;
    get displayName(): string;
    get formatString(): string;
    get stringValue(): string;
    get type(): TimeFmtType<any>;
    toString(): string;
    static valueOf(name: string): TimeFormat;
    static values(): TimeFormat[];
  }


  class TimeTestExample {
    static runDurationTest(): string;
    static runTimeDateTest(): string;
  }

}

declare module 'fi.dy.masa.malilib.util.time.DurationFmtType' {
  import { DurationFormat } from 'fi.dy.masa.malilib.util.time';

  class DurationFactory<T extends DurationFmt = any> {
    create(var1: DurationFormat): T;
  }

}

declare module 'fi.dy.masa.malilib.util.time.formatter' {
  import { DurationFormat, TimeFormat } from 'fi.dy.masa.malilib.util.time';

  class DurationFmt {
    constructor(fmt: DurationFormat);
    format(duration: number): string;
    format(duration: number, fmt: string): string;
    get formatString(): string;
    get type(): DurationFormat;
  }


  interface DurationFmtFormatted extends DurationFmt {}
  class DurationFmtFormatted extends DurationFmt {
    constructor(fmt: DurationFormat);
    format(duration: number, fmt: string): string;
    format(duration: number): string;
  }


  interface DurationFmtISOExtended extends DurationFmt {}
  class DurationFmtISOExtended extends DurationFmt {
    constructor(fmt: DurationFormat);
    format(duration: number, fmt: string): string;
    format(duration: number): string;
  }


  interface DurationFmtPretty extends DurationFmt {}
  class DurationFmtPretty extends DurationFmt {
    constructor(fmt: DurationFormat);
    format(duration: number, fmt: string): string;
    format(duration: number): string;
  }


  interface DurationFmtRegular extends DurationFmt {}
  class DurationFmtRegular extends DurationFmt {
    constructor(fmt: DurationFormat);
    format(duration: number, fmt: string): string;
    format(duration: number): string;
  }


  class TimeFmt {
    constructor(fmt: TimeFormat);
    formatFrom(formattedTime: string): number;
    formatFrom(formattedTime: string, fmt: string): number;
    formatNow(): string;
    formatNow(fmt: string): string;
    formatTo(time: number): string;
    formatTo(time: number, fmt: string): string;
    get formatString(): string;
    get type(): TimeFormat;
  }


  interface TimeFmtDateOnly extends TimeFmt {}
  class TimeFmtDateOnly extends TimeFmt {
    constructor(fmt: TimeFormat);
    formatFrom(formatted: string, fmt: string): number;
    formatFrom(formattedTime: string): number;
    formatNow(fmt: string): string;
    formatNow(): string;
    formatTo(time: number, fmt: string): string;
    formatTo(time: number): string;
  }


  interface TimeFmtFormatted extends TimeFmt {}
  class TimeFmtFormatted extends TimeFmt {
    constructor(fmt: TimeFormat);
    formatFrom(formatted: string, fmt: string): number;
    formatFrom(formattedTime: string): number;
    formatNow(fmt: string): string;
    formatNow(): string;
    formatTo(time: number, fmt: string): string;
    formatTo(time: number): string;
  }


  interface TimeFmtISOLocal extends TimeFmt {}
  class TimeFmtISOLocal extends TimeFmt {
    constructor(fmt: TimeFormat);
    formatFrom(formatted: string, fmt: string): number;
    formatFrom(formattedTime: string): number;
    formatNow(fmt: string): string;
    formatNow(): string;
    formatTo(time: number, fmt: string): string;
    formatTo(time: number): string;
  }


  interface TimeFmtISOOffset extends TimeFmt {}
  class TimeFmtISOOffset extends TimeFmt {
    constructor(fmt: TimeFormat);
    formatFrom(formatted: string, fmt: string): number;
    formatFrom(formattedTime: string): number;
    formatNow(fmt: string): string;
    formatNow(): string;
    formatTo(time: number, fmt: string): string;
    formatTo(time: number): string;
  }


  interface TimeFmtRegular extends TimeFmt {}
  class TimeFmtRegular extends TimeFmt {
    constructor(fmt: TimeFormat);
    formatFrom(formatted: string, fmt: string): number;
    formatFrom(formattedTime: string): number;
    formatNow(fmt: string): string;
    formatNow(): string;
    formatTo(time: number, fmt: string): string;
    formatTo(time: number): string;
  }


  interface TimeFmtRFC1123 extends TimeFmt {}
  class TimeFmtRFC1123 extends TimeFmt {
    constructor(fmt: TimeFormat);
    formatFrom(formatted: string, fmt: string): number;
    formatFrom(formattedTime: string): number;
    formatNow(fmt: string): string;
    formatNow(): string;
    formatTo(time: number, fmt: string): string;
    formatTo(time: number): string;
  }


  interface TimeFmtTimeOnly extends TimeFmt {}
  class TimeFmtTimeOnly extends TimeFmt {
    constructor(fmt: TimeFormat);
    formatFrom(formatted: string, fmt: string): number;
    formatFrom(formattedTime: string): number;
    formatNow(fmt: string): string;
    formatNow(): string;
    formatTo(time: number, fmt: string): string;
    formatTo(time: number): string;
  }

}

declare module 'fi.dy.masa.malilib.util.time.TimeFmtType' {
  import { TimeFormat } from 'fi.dy.masa.malilib.util.time';

  class TimeFactory<T extends TimeFmt = any> {
    create(var1: TimeFormat): T;
  }

}