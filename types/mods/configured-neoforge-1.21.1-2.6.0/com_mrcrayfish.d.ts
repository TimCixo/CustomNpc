declare module 'com.mrcrayfish.configured.api' {
  import { Enum, Runnable } from 'java.lang';
  import { Optional, List, Set } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { Path } from 'java.nio.file';
  import { Player } from 'net.minecraft.world.entity.player';

  interface ConfigType extends Enum<ConfigType> {}
  class ConfigType extends Enum<ConfigType> {
    static readonly CLIENT: ConfigType;
    static readonly UNIVERSAL: ConfigType;
    static readonly SERVER: ConfigType;
    static readonly SERVER_SYNC: ConfigType;
    static readonly DEDICATED_SERVER: ConfigType;
    static readonly WORLD: ConfigType;
    static readonly WORLD_SYNC: ConfigType;
    static readonly MEMORY: ConfigType;
    get env(): Optional<Environment>;
    isServer(): boolean;
    isSync(): boolean;
    isWorld(): boolean;
    static valueOf(name: string): ConfigType;
    static values(): ConfigType[];
  }


  interface Environment extends Enum<Environment> {}
  class Environment extends Enum<Environment> {
    static readonly CLIENT: Environment;
    static readonly DEDICATED_SERVER: Environment;
    static valueOf(name: string): Environment;
    static values(): Environment[];
  }


  class IAllowedEnums<T = any> {
    get allowedValues(): Set<T>;
  }


  class IConfigEntry {
    get children(): IConfigEntry[];
    get entryName(): string;
    get tooltip(): Component;
    get translationKey(): string;
    get value(): IConfigValue<any>;
    isLeaf(): boolean;
    isRoot(): boolean;
  }


  class IConfigValue<T = any> {
    cleanCache(): void;
    get (): T;
    get comment(): Component;
    get default(): T;
    get name(): string;
    get translationKey(): string;
    get validationHint(): Component;
    isChanged(): boolean;
    isDefault(): boolean;
    isValid(var1: T): boolean;
    requiresGameRestart(): boolean;
    requiresWorldRestart(): boolean;
    restore(): void;
    set (var1: T);
  }


  class IModConfig {
    canPlayerEdit(player: Player): ActionResult;
    createRootEntry(): IConfigEntry;
    get fileName(): string;
    get modId(): string;
    get translationKey(): string;
    get type(): ConfigType;
    isChanged(): boolean;
    isReadOnly(): boolean;
    loadWorldConfig(path: Path): ActionResult;
    requestFromServerTask(): Optional<Runnable>;
    restoreDefaultsTask(): Optional<Runnable>;
    showSaveConfirmation(player: Player): ActionResult;
    startEditing(): void;
    stopEditing(updated: boolean): void;
    update(var1: IConfigEntry): ActionResult;
  }


  class IModConfigProvider {
    getConfigurationsForMod(var1: ModContext): Set<IModConfig>;
  }


  interface ValueEntry extends IConfigEntry {}
  class ValueEntry extends IConfigEntry {
    constructor(value: IConfigValue<any>);
    get children(): IConfigEntry[];
    get entryName(): string;
    get tooltip(): Component;
    get translationKey(): string;
    get value(): IConfigValue<any>;
    isLeaf(): boolean;
    isRoot(): boolean;
  }

}

declare module 'com.mrcrayfish.configured.api.util' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Component } from 'net.minecraft.network.chat';
  import { Map, Set } from 'java.util';
  import { ConfigType, IModConfig } from 'com.mrcrayfish.configured.api';

  class ConfigScreenHelper {
    static createSelectionScreen(parent: Screen, title: Component, configs: Map<ConfigType, Set<IModConfig>>): Screen;
    static createSelectionScreen(title: Component, config: IModConfig): Screen;
    static createSelectionScreen(parent: Screen, title: Component, config: IModConfig): Screen;
  }

}

declare module 'com.mrcrayfish.configured' {
  import { Path } from 'java.nio.file';
  import { ChatFormatting } from 'net.minecraft';
  import { ImmutableList } from 'com.google.common.collect';
  import { UUID } from 'java.util';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { PlayerLoggedInEvent } from 'PlayerEvent';
  import { Logger } from 'org.slf4j';
  import { ServerPlayer } from 'net.minecraft.server.level';

  class Bootstrap {
    static init(): void;
  }


  class Config {
    static get changedFormatting(): ChatFormatting;
    static get developers(): ImmutableList<UUID>;
    static isDeveloperEnabled(): boolean;
    static isForceConfiguredMenu(): boolean;
    static isIncludeFoldersInSearch(): boolean;
    static load(path: Path): void;
    static shouldBroadcastLogs(): boolean;
  }


  class Configured {
    constructor(bus: IEventBus);
    onPlayerLoggedIn(event: PlayerLoggedInEvent): void;
  }


  class Constants {
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static readonly LOG: Logger;
  }


  class Events {
    static onPlayerLoggedIn(player: ServerPlayer): void;
  }

}

declare module 'com.mrcrayfish.configured.client' {
  import { Player } from 'net.minecraft.world.entity.player';
  import { KeyMapping } from 'net.minecraft.client';
  import { Set, Map } from 'java.util';
  import { IModConfigProvider, ConfigType, IModConfig, ModContext } from 'com.mrcrayfish.configured.api';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Opening } from 'ScreenEvent';

  class ClientConfigHelper {
    static get clientPlayer(): Player;
    static isConfiguredInstalledRemotely(): boolean;
    static isIntegratedServer(): boolean;
    static isLan(): boolean;
    static isMainMenu(): boolean;
    static isPlayingGame(): boolean;
    static isPlayingRemotely(): boolean;
    static isServerOwnedByPlayer(player: Player): boolean;
    static isSingleplayer(): boolean;
  }


  class ClientConfigured {
    static generateConfigFactories(): void;
  }


  class ClientHandler {
    static readonly KEY_OPEN_MOD_LIST: KeyMapping;
    static createConfigMap(context: ModContext): Map<ConfigType, Set<IModConfig>>;
    static get providers(): Set<IModConfigProvider>;
    static init(): void;
  }


  class ClientSessionData {
    static isDeveloper(): boolean;
    static isLan(): boolean;
    static setDeveloper(enabled: boolean): void;
    static setLan(lan: boolean): void;
  }


  class EditingTracker {
    static instance(): EditingTracker;
    markChanged(): void;
    onScreenOpen(screen: Screen): void;
  }


  class NeoForgeClientEvents {
    static onScreenOpen(event: Opening): void;
  }

}

declare module 'com.mrcrayfish.configured.client.screen' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { IModConfig, IConfigEntry, IConfigValue } from 'com.mrcrayfish.configured.api';
  import { Component } from 'net.minecraft.network.chat';
  import { Icon } from 'com.mrcrayfish.configured.client.screen.ConfirmationScreen';
  import { Function } from 'java.util.function';
  import { Boolean, Integer } from 'java.lang';
  import { Comparator, List } from 'java.util';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Minecraft } from 'net.minecraft.client';
  import { FormattedCharSequence } from 'net.minecraft.util';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface ActiveConfirmationScreen extends IEditing, ConfirmationScreen {}
  class ActiveConfirmationScreen extends IEditing {
    constructor(parent: Screen, config: IModConfig, message: Component, icon: Icon, handler: Function<boolean, boolean>);
    get activeConfig(): IModConfig;
  }


  interface ConfigScreen extends IEditing, ListMenuScreen {}
  class ConfigScreen extends IEditing {
    static readonly TOOLTIP_WIDTH: number;
    static readonly SORT_ALPHABETICALLY: Comparator;
    constructor(parent: Screen, title: Component, config: IModConfig);
    static createLabel(input: string): string;
    get activeConfig(): IModConfig;
    isChanged(entry: IConfigEntry): boolean;
    isModified(entry: IConfigEntry): boolean;
    removed(): void;
    shouldCloseOnEsc(): boolean;
  }


  interface ConfirmationScreen extends Screen {}
  class ConfirmationScreen extends Screen {
    constructor(parent: Screen, message: Component, icon: Icon, handler: Function<boolean, boolean>);
    static drawListBackground(graphics: GuiGraphics, startX: number, endX: number, startY: number, endY: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    setNegativeText(negativeText: Component): void;
    setPositiveText(positiveText: Component): void;
    static showError(minecraft: Minecraft, parent: Screen, message: Component): void;
    static showInfo(minecraft: Minecraft, parent: Screen, message: Component): void;
  }


  interface EditListScreen<T = any> extends IEditing, Screen {}
  class EditListScreen<T = any> extends IEditing {
    constructor(parent: Screen, config: IModConfig, titleIn: Component, holder: IConfigValue<T[]>);
    get activeConfig(): IModConfig;
    isModified(): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface EditStringScreen extends IEditing, TooltipScreen {}
  class EditStringScreen extends IEditing {
    get activeConfig(): IModConfig;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  class IColouredTooltip {
    static readonly DUMMY_TOOLTIP: List;
    drawColouredTooltip(poseStack: PoseStack, mouseX: number, mouseY: number, screen: Screen): boolean;
    get tooltipBackgroundColour(): number;
    get tooltipOutlineColour(): number;
    get tooltipText(): FormattedCharSequence[];
    get tooltipX(): number;
    get tooltipY(): number;
  }


  class IEditing {
    get activeConfig(): IModConfig;
  }


  class ILabelProvider {
    get label(): string;
  }


  interface ListMenuScreen extends TooltipScreen {}
  class ListMenuScreen extends TooltipScreen {
    static readonly CONFIGURED_LOGO: ResourceLocation;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface RequestScreen extends IEditing, ListMenuScreen {}
  class RequestScreen extends IEditing {
    get activeConfig(): IModConfig;
    handleResponse(config: IModConfig, message: Component): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, deltaTick: number): void;
    tick(): void;
  }


  interface TooltipScreen extends Screen {}
  class TooltipScreen extends Screen {
    tooltipText: List;
    tooltipOutlineColour: number;
    setActiveTooltip(tooltip: FormattedCharSequence[]): void;
    setActiveTooltip(text: Component): void;
    setActiveTooltip(text: Component, outlineColour: number): void;
  }

}

declare module 'com.mrcrayfish.configured.client.screen.ConfigScreen' {
  import { Boolean, Integer, Double, Long, Enum, Number } from 'java.lang';
  import { IConfigValue, IConfigEntry } from 'com.mrcrayfish.configured.api';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ConfigScreen } from 'com.mrcrayfish.configured.client.screen';
  import { List } from 'java.util';
  import { Item } from 'com.mrcrayfish.configured.client.screen.ListMenuScreen';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { Component } from 'net.minecraft.network.chat';
  import { Function } from 'java.util.function';

  interface BooleanItem extends ConfigItem<boolean> {}
  class BooleanItem extends ConfigItem<boolean> {
    constructor(holder: IConfigValue<boolean>);
    onResetValue(): void;
    render(graphics: GuiGraphics, index: number, top: number, left: number, width: number, p_230432_6_: number, mouseX: number, mouseY: number, hovered: boolean, partialTicks: number): void;
  }


  interface IntegerItem extends NumberItem<number> {}
  class IntegerItem extends NumberItem<number> {
    constructor(this$0: ConfigScreen, holder: IConfigValue<number>);
  }


  interface DoubleItem extends NumberItem<number> {}
  class DoubleItem extends NumberItem<number> {
    constructor(this$0: ConfigScreen, holder: IConfigValue<number>);
  }


  interface LongItem extends NumberItem<Long> {}
  class LongItem extends NumberItem<Long> {
    constructor(this$0: ConfigScreen, holder: IConfigValue<Long>);
  }


  interface EnumItem extends ConfigItem<Enum> {}
  class EnumItem extends ConfigItem<Enum> {
    constructor(holder: IConfigValue<Enum<any>>);
    render(graphics: GuiGraphics, index: number, top: number, left: number, width: number, p_230432_6_: number, mouseX: number, mouseY: number, hovered: boolean, partialTicks: number): void;
  }


  interface StringItem extends ConfigItem<string> {}
  class StringItem extends ConfigItem<string> {
    constructor(holder: IConfigValue<string>);
    render(graphics: GuiGraphics, index: number, top: number, left: number, width: number, p_230432_6_: number, mouseX: number, mouseY: number, hovered: boolean, partialTicks: number): void;
  }


  interface ListItem extends ConfigItem<List> {}
  class ListItem extends ConfigItem<List> {
    constructor(holder: IConfigValue<any[]>);
    render(graphics: GuiGraphics, index: number, top: number, left: number, width: number, p_230432_6_: number, mouseX: number, mouseY: number, hovered: boolean, partialTicks: number): void;
  }


  interface FolderItem extends Item {}
  class FolderItem extends Item {
    constructor(entry: IConfigEntry);
    children(): GuiEventListener[];
    render(graphics: GuiGraphics, index: number, top: number, left: number, width: number, height: number, mouseX: number, mouseY: number, selected: boolean, partialTicks: number): void;
  }


  interface ConfigItem<T = any> extends Item {}
  class ConfigItem<T = any> extends Item {
    constructor(holder: IConfigValue<T>);
    children(): GuiEventListener[];
    render(graphics: GuiGraphics, x: number, top: number, left: number, width: number, p_230432_6_: number, mouseX: number, mouseY: number, hovered: boolean, partialTicks: number): void;
    setValidationHint(text: Component): void;
  }


  interface NumberItem<T extends Number = any> extends ConfigItem<T> {}
  class NumberItem<T extends Number = any> extends ConfigItem<T> {
    constructor(holder: IConfigValue<T>, parser: Function<string, Number>);
    onResetValue(): void;
    render(graphics: GuiGraphics, index: number, top: number, left: number, width: number, p_230432_6_: number, mouseX: number, mouseY: number, hovered: boolean, partialTicks: number): void;
  }

}

declare module 'com.mrcrayfish.configured.client.screen.ConfirmationScreen' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Icon extends Enum<Icon> {}
  class Icon extends Enum<Icon> {
    static readonly INFO: Icon;
    static readonly WARNING: Icon;
    static readonly ERROR: Icon;
    u(): number;
    v(): number;
    static valueOf(name: string): Icon;
    static values(): Icon[];
  }

}

declare module 'com.mrcrayfish.configured.client.screen.EditListScreen' {
  import { ContainerObjectSelectionList } from 'net.minecraft.client.gui.components';
  import { Entry } from 'ContainerObjectSelectionList';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { NarratableEntry, NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { NarrationPriority } from 'NarratableEntry';

  interface ObjectList extends ContainerObjectSelectionList<StringEntry> {}
  class ObjectList extends ContainerObjectSelectionList<StringEntry> {
    constructor();
    addEntry(entry: StringEntry): number;
    get rowWidth(): number;
    removeEntry(entry: StringEntry): boolean;
  }


  class StringHolder {
    constructor(value: string);
    get value(): string;
    set value(value: string);
  }


  interface StringEntry extends Entry<StringEntry> {}
  class StringEntry extends Entry<StringEntry> {
    constructor(list: ObjectList, holder: StringHolder);
    children(): GuiEventListener[];
    narratables(): NarratableEntry[];
    narrationPriority(): NarrationPriority;
    render(graphics: GuiGraphics, x: number, top: number, left: number, width: number, p_230432_6_: number, mouseX: number, mouseY: number, selected: boolean, partialTicks: number): void;
    updateNarration(output: NarrationElementOutput): void;
  }

}

declare module 'com.mrcrayfish.configured.client.screen.list' {
  import { IAllowedEnums, IConfigValue } from 'com.mrcrayfish.configured.api';
  import { Class } from 'java.lang';
  import { Function } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';
  import { Set, List } from 'java.util';

  interface EnumListType<T extends Enum<T> = any> extends IListType<T>, IAllowedEnums<T> {}
  class EnumListType<T extends Enum<T> = any> extends IListType<T> {
    constructor(enumClass: Class<T>);
    get allowedValues(): Set<T>;
    get hint(): Component;
    get stringParser(): Function<T, string>;
    get valueParser(): Function<string, T>;
  }


  interface IListConfigValue<T = any> extends IConfigValue<List> {}
  class IListConfigValue<T = any> extends IConfigValue<List> {
    createPropertyValue(): string;
    get listType(): IListType<T>;
  }


  class IListType<T = any> {
    get hint(): Component;
    get stringParser(): Function<T, string>;
    get valueParser(): Function<string, T>;
  }


  interface ListType<T = any> extends IListType<T> {}
  class ListType<T = any> extends IListType<T> {
    constructor(stringParser: Function<T, string>, valueParser: Function<string, T>, hintKey: string);
    get hint(): Component;
    get stringParser(): Function<T, string>;
    get valueParser(): Function<string, T>;
  }


  class ListTypes {
    static readonly BOOLEAN: IListType;
    static readonly INTEGER: IListType;
    static readonly LONG: IListType;
    static readonly DOUBLE: IListType;
    static readonly STRING: IListType;
    static get unknown<T>(): IListType<T>;
    static getType<T>(holder: IConfigValue<T[]>): IListType<T>;
  }

}

declare module 'com.mrcrayfish.configured.client.screen.ListMenuScreen' {
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface MultiTextItem extends IIgnoreSearch, Item {}
  class MultiTextItem extends IIgnoreSearch {
    constructor(topText: Component, bottomText: Component);
    render(graphics: GuiGraphics, x: number, top: number, left: number, width: number, height: number, mouseX: number, mouseY: number, selected: boolean, partialTicks: number): void;
  }


  interface TitleItem extends IIgnoreSearch, Item {}
  class TitleItem extends IIgnoreSearch {
    constructor(title: Component);

    constructor(title: string);
    render(graphics: GuiGraphics, x: number, top: number, left: number, width: number, height: number, mouseX: number, mouseY: number, selected: boolean, partialTicks: number): void;
  }

}

declare module 'com.mrcrayfish.configured.client.screen.widget' {
  import { AbstractButton, Button, Tooltip } from 'net.minecraft.client.gui.components';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { OnPress } from 'com.mrcrayfish.configured.client.screen.widget.CheckBoxButton';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Predicate } from 'java.util.function';
  import { OnPress as button_OnPress } from 'Button';
  import { Component } from 'net.minecraft.network.chat';

  interface CheckBoxButton extends AbstractButton {}
  class CheckBoxButton extends AbstractButton {
    static readonly ICONS: ResourceLocation;
    constructor(x: number, y: number, onPress: OnPress);
    isSelected(): boolean;
    onPress(): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface ConfiguredButton extends Button {}
  class ConfiguredButton extends Button {
    setTooltip(tooltip: Tooltip, predicate: Predicate<Button>): void;
  }


  interface IconButton extends ConfiguredButton {}
  class IconButton extends ConfiguredButton {
    static readonly ICONS: ResourceLocation;
    constructor(x: number, y: number, u: number, v: number, onPress: button_OnPress);

    constructor(x: number, y: number, u: number, v: number, width: number, label: Component, onPress: button_OnPress);
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
  }

}

declare module 'com.mrcrayfish.configured.client.screen.widget.CheckBoxButton' {
  import { CheckBoxButton } from 'com.mrcrayfish.configured.client.screen.widget';

  class OnPress {
    onPress(var1: CheckBoxButton): void;
  }

}

declare module 'com.mrcrayfish.configured.client.util' {
  import { Tooltip, Button, EditBox } from 'net.minecraft.client.gui.components';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Component } from 'net.minecraft.network.chat';
  import { Predicate } from 'java.util.function';
  import { List } from 'java.util';
  import { ILabelProvider } from 'com.mrcrayfish.configured.client.screen';
  import { OnPress } from 'Button';

  class ScreenUtil {
    static button(x: number, y: number, width: number, height: number, label: Component, onPress: OnPress): Button;
    static createTooltip(screen: Screen, message: Component, maxWidth: number): Tooltip;
    static createTooltip(screen: Screen, message: Component, maxWidth: number, predicate: Predicate<Button>): Tooltip;
    static isMouseWithin(x: number, y: number, width: number, height: number, mouseX: number, mouseY: number): boolean;
    static updateSearchTextFieldSuggestion(editBox: EditBox, value: string, entries: ILabelProvider[]): void;
  }

}

declare module 'com.mrcrayfish.configured.impl.framework' {
  import { FrameworkConfigImpl } from 'FrameworkConfigManager';
  import { IModConfigProvider, IModConfig, ModContext, IAllowedEnums, IConfigEntry, IConfigValue, ActionResult, ConfigType } from 'com.mrcrayfish.configured.api';
  import { Set, List, Optional } from 'java.util';
  import { EnumProperty, ListProperty, AbstractProperty } from 'com.mrcrayfish.framework.api.config';
  import { PropertyMap } from 'com.mrcrayfish.configured.impl.framework.FrameworkModConfig';
  import { Component } from 'net.minecraft.network.chat';
  import { IListConfigValue, IListType } from 'com.mrcrayfish.configured.client.screen.list';
  import { Path } from 'java.nio.file';
  import { Runnable } from 'java.lang';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Response } from 'com.mrcrayfish.configured.impl.framework.message.MessageFramework';

  class FrameworkConfigHelper {
    static isWorldType(config: FrameworkConfigImpl): boolean;
  }


  interface FrameworkConfigProvider extends IModConfigProvider {}
  class FrameworkConfigProvider extends IModConfigProvider {
    getConfigurationsForMod(context: ModContext): Set<IModConfig>;
  }


  interface FrameworkEnumValue<T extends Enum<T> = any> extends IAllowedEnums<T>, FrameworkValue<T> {}
  class FrameworkEnumValue<T extends Enum<T> = any> extends IAllowedEnums<T> {
    constructor(enumProperty: EnumProperty<T>);
    get allowedValues(): Set<T>;
  }


  interface FrameworkFolderEntry extends IConfigEntry {}
  class FrameworkFolderEntry extends IConfigEntry {
    constructor(map: PropertyMap);
    get children(): IConfigEntry[];
    get entryName(): string;
    get tooltip(): Component;
    get translationKey(): string;
    get value(): IConfigValue<any>;
    isLeaf(): boolean;
    isRoot(): boolean;
    static lastValue<V>(list: V[], defaultValue: V): V;
  }


  interface FrameworkListValue<T = any> extends IListConfigValue<T>, FrameworkValue<List> {}
  class FrameworkListValue<T = any> extends IListConfigValue<T> {
    constructor(property: ListProperty<T>);
    get listType(): IListType<T>;
    isDefault(): boolean;
  }


  interface FrameworkModConfig extends IModConfig {}
  class FrameworkModConfig extends IModConfig {
    constructor(config: FrameworkConfigImpl);
    canPlayerEdit(player: Player): ActionResult;
    createRootEntry(): IConfigEntry;
    get fileName(): string;
    get modId(): string;
    get type(): ConfigType;
    isChanged(): boolean;
    isReadOnly(): boolean;
    loadDataFromResponse(message: Response): boolean;
    loadWorldConfig(path: Path): ActionResult;
    requestFromServerTask(): Optional<Runnable>;
    restoreDefaultsTask(): Optional<Runnable>;
    startEditing(): void;
    stopEditing(changed: boolean): void;
    update(entry: IConfigEntry): ActionResult;
  }


  interface FrameworkValue<T = any> extends IConfigValue<T> {}
  class FrameworkValue<T = any> extends IConfigValue<T> {
    constructor(property: AbstractProperty<T>);
    cleanCache(): void;
    get (): T;
    get comment(): Component;
    get default(): T;
    get name(): string;
    get path(): string[];
    get translationKey(): string;
    get validationHint(): Component;
    isChanged(): boolean;
    isDefault(): boolean;
    isValid(value: T): boolean;
    requiresGameRestart(): boolean;
    requiresWorldRestart(): boolean;
    restore(): void;
    set (value: T);
  }

}

declare module 'com.mrcrayfish.configured.impl.framework.FrameworkModConfig' {
  import { IMapEntry } from 'FrameworkConfigManager';
  import { List } from 'java.util';
  import { Pair } from 'it.unimi.dsi.fastutil';
  import { AbstractProperty } from 'com.mrcrayfish.framework.api.config';

  interface PropertyMap extends IMapEntry {}
  class PropertyMap extends IMapEntry {
    get comment(): string;
    get configMaps(): Pair<string, PropertyMap>[];
    get configProperties(): AbstractProperty<any>[];
    get path(): string[];
    get translationKey(): string;
  }

}

declare module 'com.mrcrayfish.configured.impl.framework.handler' {
  import { Response, Sync, Request } from 'com.mrcrayfish.configured.impl.framework.message.MessageFramework';
  import { Consumer } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';
  import { ServerPlayer } from 'net.minecraft.server.level';

  class FrameworkClientHandler {
    static handleResponse(message: Response, disconnect: Consumer<Component>): void;
  }


  class FrameworkServerHandler {
    static handleRequestConfig(player: ServerPlayer, message: Request, disconnect: Consumer<Component>): void;
    static handleServerSync(player: ServerPlayer, message: Sync, disconnect: Consumer<Component>): void;
  }

}

declare module 'com.mrcrayfish.configured.impl.framework.message' {
  class MessageFramework {
  }

}

declare module 'com.mrcrayfish.configured.impl.jei' {
  import { IModPlugin } from 'mezz.jei.api';
  import { Optional, List, Set } from 'java.util';
  import { IJeiConfigManager, IJeiConfigCategory, IJeiConfigFile, IJeiConfigValue } from 'mezz.jei.api.runtime.config';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IConfigEntry, IConfigValue, IModConfig, ConfigType, ActionResult, IModConfigProvider, ModContext } from 'com.mrcrayfish.configured.api';
  import { Component } from 'net.minecraft.network.chat';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Runnable } from 'java.lang';
  import { IListConfigValue, IListType } from 'com.mrcrayfish.configured.client.screen.list';

  interface ConfiguredJeiPlugin extends IModPlugin {}
  class ConfiguredJeiPlugin extends IModPlugin {
    static get jeiConfigManager(): Optional<IJeiConfigManager>;
    get pluginUid(): ResourceLocation;
    onConfigManagerAvailable(configManager: IJeiConfigManager): void;
  }


  interface JeiCategoryEntry extends IConfigEntry {}
  class JeiCategoryEntry extends IConfigEntry {
    constructor(category: IJeiConfigCategory);
    get children(): IConfigEntry[];
    get entryName(): string;
    get tooltip(): Component;
    get translationKey(): string;
    get value(): IConfigValue<any>;
    isLeaf(): boolean;
    isRoot(): boolean;
  }


  interface JeiCategoryListEntry extends IConfigEntry {}
  class JeiCategoryListEntry extends IConfigEntry {
    constructor(name: string, categories: IJeiConfigCategory[]);
    get children(): IConfigEntry[];
    get entryName(): string;
    get tooltip(): Component;
    get translationKey(): string;
    get value(): IConfigValue<any>;
    isLeaf(): boolean;
    isRoot(): boolean;
  }


  interface JeiConfig extends IModConfig {}
  class JeiConfig extends IModConfig {
    constructor(name: string, type: ConfigType, configFile: IJeiConfigFile);
    canPlayerEdit(player: Player): ActionResult;
    createRootEntry(): IConfigEntry;
    get fileName(): string;
    get modId(): string;
    get type(): ConfigType;
    isChanged(): boolean;
    restoreDefaultsTask(): Optional<Runnable>;
    update(entry: IConfigEntry): ActionResult;
  }


  interface JeiConfigProvider extends IModConfigProvider {}
  class JeiConfigProvider extends IModConfigProvider {
    getConfigurationsForMod(context: ModContext): Set<IModConfig>;
  }


  interface JeiListValue<T = any> extends IListConfigValue<T>, JeiValue<List> {}
  class JeiListValue<T = any> extends IListConfigValue<T> {
    constructor(configValue: IJeiConfigValue<T[]>);
    get listType(): IListType<T>;
  }


  interface JeiValue<T = any> extends IConfigValue<T> {}
  class JeiValue<T = any> extends IConfigValue<T> {
    constructor(configValue: IJeiConfigValue<T>);
    cleanCache(): void;
    get (): T;
    get comment(): Component;
    get default(): T;
    get name(): string;
    get translationKey(): string;
    get validationHint(): Component;
    isChanged(): boolean;
    isDefault(): boolean;
    isValid(value: T): boolean;
    requiresGameRestart(): boolean;
    requiresWorldRestart(): boolean;
    restore(): void;
    set (value: T);
    updateConfigValue(): void;
  }

}

declare module 'com.mrcrayfish.configured.impl.neoforge' {
  import { IModConfig, ActionResult, IConfigEntry, ConfigType, IModConfigProvider, ModContext, IAllowedEnums, IConfigValue } from 'com.mrcrayfish.configured.api';
  import { ModConfig } from 'net.neoforged.fml.config';
  import { Path } from 'java.nio.file';
  import { Optional, Set, List } from 'java.util';
  import { Runnable } from 'java.lang';
  import { Player } from 'net.minecraft.world.entity.player';
  import { EnumValue, ValueSpec, ConfigValue } from 'ModConfigSpec';
  import { UnmodifiableConfig } from 'com.electronwill.nightconfig.core';
  import { ModConfigSpec } from 'net.neoforged.neoforge.common';
  import { Component } from 'net.minecraft.network.chat';
  import { IListConfigValue, IListType } from 'com.mrcrayfish.configured.client.screen.list';

  interface NeoForgeConfig extends IModConfig {}
  class NeoForgeConfig extends IModConfig {
    constructor(config: ModConfig);
    canPlayerEdit(player: Player): ActionResult;
    createRootEntry(): IConfigEntry;
    get fileName(): string;
    get modId(): string;
    get type(): ConfigType;
    isChanged(): boolean;
    loadWorldConfig(path: Path): ActionResult;
    restoreDefaultsTask(): Optional<Runnable>;
    showSaveConfirmation(player: Player): ActionResult;
    stopEditing(updated: boolean): void;
    update(entry: IConfigEntry): ActionResult;
  }


  interface NeoForgeConfigProvider extends IModConfigProvider {}
  class NeoForgeConfigProvider extends IModConfigProvider {
    getConfigurationsForMod(context: ModContext): Set<IModConfig>;
  }


  interface NeoForgeEnumValue<T extends Enum<T> = any> extends IAllowedEnums<T>, NeoForgeValue<T> {}
  class NeoForgeEnumValue<T extends Enum<T> = any> extends IAllowedEnums<T> {
    constructor(configValue: EnumValue<T>, valueSpec: ValueSpec);
    get allowedValues(): Set<T>;
  }


  interface NeoForgeFolderEntry extends IConfigEntry {}
  class NeoForgeFolderEntry extends IConfigEntry {
    constructor(config: UnmodifiableConfig, spec: ModConfigSpec);

    constructor(path: string[], config: UnmodifiableConfig, spec: ModConfigSpec);
    get children(): IConfigEntry[];
    get entryName(): string;
    get tooltip(): Component;
    get translationKey(): string;
    get value(): IConfigValue<any>;
    isLeaf(): boolean;
    isRoot(): boolean;
  }


  interface NeoForgeListValue<T = any> extends IListConfigValue<T>, NeoForgeValue<List> {}
  class NeoForgeListValue<T = any> extends IListConfigValue<T> {
    constructor(configValue: ConfigValue<T[]>, valueSpec: ValueSpec);
    createPropertyValue(): string;
    get converted(): T[];
    get listType(): IListType<T>;
    set(value: T[]): void;
  }


  interface NeoForgeValue<T = any> extends IConfigValue<T> {}
  class NeoForgeValue<T = any> extends IConfigValue<T> {
    readonly configValue: ConfigValue;
    readonly valueSpec: ValueSpec;
    constructor(configValue: ConfigValue<T>, valueSpec: ValueSpec);
    cleanCache(): void;
    get (): T;
    get comment(): Component;
    get default(): T;
    get name(): string;
    get translationKey(): string;
    get validationHint(): Component;
    isChanged(): boolean;
    isDefault(): boolean;
    isValid(value: T): boolean;
    static lastValue<V>(list: V[], defaultValue: V): V;
    loadRange(): void;
    requiresGameRestart(): boolean;
    requiresWorldRestart(): boolean;
    restore(): void;
    set (value: T);
  }

}

declare module 'com.mrcrayfish.configured.network' {
  import { MessageSessionData } from 'com.mrcrayfish.configured.network.message';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Component } from 'net.minecraft.network.chat';
  import { ServerPlayer } from 'net.minecraft.server.level';

  class ClientPlayHandler {
    static handleSessionData(message: MessageSessionData): void;
  }


  class ConfiguredCodecs {
    static readonly BYTE_ARRAY: StreamCodec;
  }


  class NeoForgeNetwork {
    static readonly VERSION: number;
  }


  class ServerPlayHelper {
    static canEditServerConfigs(player: ServerPlayer): boolean;
    static sendMessageToOperators(message: Component, player: ServerPlayer): void;
  }

}

declare module 'com.mrcrayfish.configured.network.handler' {
  import { Player } from 'net.minecraft.world.entity.player';
  import { SyncNeoForgeConfigPayload } from 'com.mrcrayfish.configured.network.payload';

  class NeoForgeServerPlayHandler {
    static handleSyncServerConfigMessage(sender: Player, payload: SyncNeoForgeConfigPayload): void;
  }

}

declare module 'com.mrcrayfish.configured.platform' {
  import { IConfigHelper, IPlatformHelper } from 'com.mrcrayfish.configured.platform.services';
  import { LevelResource } from 'net.minecraft.world.level.storage';
  import { Set } from 'java.util';
  import { IModConfigProvider, Environment } from 'com.mrcrayfish.configured.api';
  import { Path } from 'java.nio.file';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ClientPacketListener } from 'net.minecraft.client.multiplayer';
  import { Class } from 'java.lang';

  interface NeoForgeConfigHelper extends IConfigHelper {}
  class NeoForgeConfigHelper extends IConfigHelper {
    get providers(): Set<IModConfigProvider>;
    get serverConfigResource(): LevelResource;
  }


  interface NeoForgePlatformHelper extends IPlatformHelper {}
  class NeoForgePlatformHelper extends IPlatformHelper {
    get configPath(): Path;
    get defaultConfigPath(): string;
    get environment(): Environment;
    get gamePath(): Path;
    get platformName(): string;
    isConnectionActive(listener: ClientPacketListener): boolean;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(modId: string): boolean;
    sendFrameworkConfigRequest(id: ResourceLocation): void;
    sendFrameworkConfigResponse(player: ServerPlayer, data: number[]): void;
    sendFrameworkConfigToServer(id: ResourceLocation, data: number[]): void;
    sendSessionData(player: ServerPlayer): void;
  }


  class Services {
    static readonly PLATFORM: IPlatformHelper;
    static readonly CONFIG: IConfigHelper;
    static load<T>(clazz: Class<T>): T;
  }

}

declare module 'com.mrcrayfish.configured.platform.services' {
  import { LevelResource } from 'net.minecraft.world.level.storage';
  import { Set } from 'java.util';
  import { IModConfigProvider, Environment } from 'com.mrcrayfish.configured.api';
  import { Path } from 'java.nio.file';
  import { ClientPacketListener } from 'net.minecraft.client.multiplayer';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { ResourceLocation } from 'net.minecraft.resources';

  class IConfigHelper {
    get providers(): Set<IModConfigProvider>;
    get serverConfigResource(): LevelResource;
  }


  class IPlatformHelper {
    get configPath(): Path;
    get defaultConfigPath(): string;
    get environment(): Environment;
    get environmentName(): string;
    get gamePath(): Path;
    get platformName(): string;
    isConnectionActive(var1: ClientPacketListener): boolean;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(var1: string): boolean;
    sendFrameworkConfigRequest(var1: ResourceLocation): void;
    sendFrameworkConfigResponse(var1: ServerPlayer, var2: number[]): void;
    sendFrameworkConfigToServer(var1: ResourceLocation, var2: number[]): void;
    sendSessionData(var1: ServerPlayer): void;
  }

}

declare module 'com.mrcrayfish.configured.util' {
  import { List, Set } from 'java.util';
  import { IConfigEntry, IConfigValue, IModConfig } from 'com.mrcrayfish.configured.api';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Pair } from 'org.apache.commons.lang3.tuple';
  import { ConfigValue<?, ValueSpec> } from 'ModConfigSpec';
  import { UnmodifiableConfig, CommentedConfig } from 'com.electronwill.nightconfig.core';
  import { ModConfigSpec } from 'net.neoforged.neoforge.common';
  import { ILoadedConfig } from 'IConfigSpec';
  import { ModConfig } from 'net.neoforged.fml.config';
  import { Path } from 'java.nio.file';

  class ConfigHelper {
    static canRestoreConfig(config: IModConfig, player: Player): boolean;
    static gatherAllConfigEntries(entry: IConfigEntry): IConfigEntry[];
    static gatherAllConfigValues(entry: IConfigEntry): IConfigValue<any>[];
    static get clientPlayer(): Player;
    static getChangedValues(entry: IConfigEntry): Set<IConfigValue<any>>;
    static isConfiguredInstalledOnServer(): boolean;
    static isDeveloper(player: Player): boolean;
    static isIntegratedServer(): boolean;
    static isOperator(player: Player): boolean;
    static isPlayingGame(): boolean;
    static isPlayingLan(): boolean;
    static isPlayingOnRemoteServer(): boolean;
    static isServerConfig(config: IModConfig): boolean;
    static isServerOwnedByPlayer(player: Player): boolean;
    static isSingleplayer(): boolean;
  }


  class NeoForgeConfigHelper {
    static closeConfig(config: ModConfig): void;
    static correctConfig(config: ModConfig, data: CommentedConfig): void;
    static gatherAllConfigValues(config: UnmodifiableConfig, spec: ModConfigSpec): Pair<ConfigValue<any>[];
    static gatherAllConfigValues(config: ModConfig): Pair<ConfigValue<any>[];
    static getConfigData(config: ModConfig): CommentedConfig;
    static getLoadedConfig(config: ModConfig): ILoadedConfig;
    static getModConfig(fileName: string): ModConfig;
    static openConfig(config: ModConfig, path: Path): void;
    static resetConfigCache(config: ModConfig): void;
    static saveConfig(config: ModConfig): void;
    static setConfigData(config: ModConfig, configData: CommentedConfig): void;
  }

}