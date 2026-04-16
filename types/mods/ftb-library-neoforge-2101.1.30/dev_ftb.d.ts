declare module 'dev.ftb.mods.ftblibrary.api.client' {
  import { Set } from 'java.util';
  import { Screen } from 'net.minecraft.client.gui.screens';

  class FTBLibraryClientApi {
    screenSidebarBlacklist: Set;
    addSidebarScreenBlacklist(...screenClass: string[]): void;
    static get (): FTBLibraryClientApi;
    get sidebarBlacklist(): Set<string>;
    isSidebarScreenBlacklisted(screen: Screen): boolean;
  }

}

declare module 'dev.ftb.mods.ftblibrary.api.sidebar' {
  import { Supplier, BooleanSupplier } from 'java.util.function';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { Event } from 'dev.architectury.event';
  import { RegisteredSidebarButton } from 'dev.ftb.mods.ftblibrary.sidebar';

  class ButtonOverlayRender {
    static ofSimpleString(customTextHandler: Supplier<string>): ButtonOverlayRender;
    render(var1: GuiGraphics, var2: Font, var3: number): void;
  }


  class SidebarButton {
    addOverlayRender(var1: ButtonOverlayRender): void;
    addVisibilityCondition(var1: BooleanSupplier): void;
    get id(): ResourceLocation;
    setTooltipOverride(var1: Supplier<Component[]>): void;
  }


  class SidebarButtonCreatedEvent {
    static readonly EVENT: Event;
    constructor(button: RegisteredSidebarButton);
    get button(): RegisteredSidebarButton;
  }

}

declare module 'dev.ftb.mods.ftblibrary.config' {
  import { Boolean, Comparable, Integer, Long, Double, Iterable, Enum } from 'java.lang';
  import { Component } from 'net.minecraft.network.chat';
  import { Color4I, Icon } from 'dev.ftb.mods.ftblibrary.icon';
  import { Widget } from 'dev.ftb.mods.ftblibrary.ui';
  import { MouseButton } from 'dev.ftb.mods.ftblibrary.ui.input';
  import { Consumer, Predicate } from 'java.util.function';
  import { Optional, List, Collection, OptionalLong, Map, Random, Iterator } from 'java.util';
  import { SNBTConfig, BooleanValue, IntArrayValue, EnumValue, StringSidebarMapValue, StringValue, IntValue } from 'dev.ftb.mods.ftblibrary.snbt.config';
  import { Pattern } from 'java.util.regex';
  import { ItemStack } from 'net.minecraft.world.item';
  import { FluidStack } from 'dev.architectury.fluid';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { EntityType } from 'net.minecraft.world.entity';
  import { TooltipList } from 'dev.ftb.mods.ftblibrary.util';
  import { SelectableResource } from 'dev.ftb.mods.ftblibrary.config.ui.resource';
  import { Builder } from 'dev.ftb.mods.ftblibrary.config.NameMap';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface BooleanConfig extends ConfigWithVariants<boolean> {}
  class BooleanConfig extends ConfigWithVariants<boolean> {
    static readonly TRUE_TEXT: Component;
    static readonly FALSE_TEXT: Component;
    get color(): Color4I;
    get icon(): Icon;
    get stringForGUI(): Component;
    getColor(v: boolean): Color4I;
    getIcon(v: boolean): Icon;
    getIteration(currentValue: boolean, next: boolean): boolean;
    getStringForGUI(v: boolean): Component;
  }


  interface ColorConfig extends ConfigValue<Color4I> {}
  class ColorConfig extends ConfigValue<Color4I> {
    constructor();
    get stringForGUI(): Component;
    getStringForGUI(v: Color4I): Component;
    isAllowAlphaEdit(): boolean;
    onClicked(clicked: Widget, button: MouseButton, callback: ConfigCallback): void;
    withAlphaEditing(): ColorConfig;
  }


  class ConfigCallback {
    save(var1: boolean): void;
  }


  interface ConfigFromString<T = any> extends ConfigValue<T> {}
  class ConfigFromString<T = any> extends ConfigValue<T> {
    canScroll(): boolean;
    get stringForGUI(): Component;
    getStringForGUI(v: T): Component;
    getStringFromValue(v: T): string;
    onClicked(clicked: Widget, button: MouseButton, callback: ConfigCallback): void;
    parse(var1: Consumer<T>, var2: string): boolean;
    scrollValue(currentValue: T, forward: boolean): Optional<T>;
  }


  interface ConfigGroup extends Comparable<ConfigGroup> {}
  class ConfigGroup extends Comparable<ConfigGroup> {
    constructor(id: string);

    constructor(id: string, savedCallback: ConfigCallback);
    add<T, CV extends ConfigValue<T>>(id: string, type: CV, value: T, setter: Consumer<T>, defaultValue: T): CV;
    addBool(id: string, value: boolean, setter: Consumer<boolean>, def: boolean): BooleanConfig;
    addColor(id: string, value: Color4I, setter: Consumer<Color4I>, def: Color4I): ColorConfig;
    addDouble(id: string, value: number, setter: Consumer<number>, def: number, min: number, max: number): DoubleConfig;
    addEntityFace(id: string, value: EntityType<any>, setter: Consumer<EntityType<any>>, def: EntityType<any>): EntityFaceConfig;
    addEnum<E>(id: string, value: E, setter: Consumer<E>, nameMap: NameMap<E>, def: E): EnumConfig<E>;
    addEnum<E>(id: string, value: E, setter: Consumer<E>, nameMap: NameMap<E>): EnumConfig<E>;
    addFluidStack(id: string, value: FluidStack, setter: Consumer<FluidStack>, def: FluidStack, allowEmpty: boolean): FluidConfig;
    addFluidStack(id: string, value: FluidStack, setter: Consumer<FluidStack>, def: FluidStack, fixedSize: number): FluidConfig;
    addImage(id: string, value: ResourceLocation, setter: Consumer<ResourceLocation>, def: ResourceLocation): ImageResourceConfig;
    addInt(id: string, value: number, setter: Consumer<number>, def: number, min: number, max: number): IntConfig;
    addItemStack(id: string, value: ItemStack, setter: Consumer<ItemStack>, def: ItemStack, singleItem: boolean, allowEmpty: boolean): ItemStackConfig;
    addItemStack(id: string, value: ItemStack, setter: Consumer<ItemStack>, def: ItemStack, fixedSize: number): ItemStackConfig;
    addList<E, CV extends ConfigValue<E>>(id: string, value: E[], type: CV, def: E): ListConfig<E, CV>;
    addList<E, CV extends ConfigValue<E>>(id: string, value: E[], type: CV, setter: Consumer<E[]>, def: E): ListConfig<E, CV>;
    addLong(id: string, value: number, setter: Consumer<Long>, def: number, min: number, max: number): LongConfig;
    addString(id: string, value: string, setter: Consumer<string>, def: string, pattern: Pattern): StringConfig;
    addString(id: string, value: string, setter: Consumer<string>, def: string): StringConfig;
    addTristate(id: string, value: Tristate, setter: Consumer<Tristate>, def: Tristate): EnumConfig<Tristate>;
    addTristate(id: string, value: Tristate, setter: Consumer<Tristate>): EnumConfig<Tristate>;
    compareTo(o: ConfigGroup): number;
    static createEditable(config: SNBTConfig, groupName: string, serverConfig: boolean): ConfigGroup;
    get id(): string;
    get name(): Component;
    get nameKey(): string;
    get parent(): ConfigGroup;
    get path(): string;
    get subgroups(): Collection<ConfigGroup>;
    get tooltip(): Component;
    get values(): Collection<ConfigValue<any>>;
    getOrCreateSubgroup(id: string, displayOrder: number): ConfigGroup;
    getOrCreateSubgroup(id: string): ConfigGroup;
    save(accepted: boolean): void;
    set nameKey(key: string);
  }


  interface ConfigValue<T = any> extends Comparable<ConfigValue> {}
  class ConfigValue<T = any> extends Comparable<ConfigValue> {
    static readonly NULL_TEXT: Component;
    id: string;
    addInfo(list: TooltipList): void;
    applyValue(): void;
    compareTo(o: ConfigValue<T>): number;
    copy(value: T): T;
    get canEdit(): boolean;
    get color(): Color4I;
    get defaultValue(): T;
    get group(): ConfigGroup;
    get icon(): Icon;
    get name(): string;
    get nameKey(): string;
    get path(): string;
    get stringForGUI(): Component;
    get tooltip(): string;
    get value(): T;
    getColor(v: T): Color4I;
    getIcon(v: T): Icon;
    getStringForGUI(v: T): Component;
    static info(key: string, value: any): Component;
    init(group: ConfigGroup, id: string, value: T, setter: Consumer<T>, defaultValue: T): ConfigValue<T>;
    isEqual(v1: T, v2: T): boolean;
    onClicked(var1: Widget, var2: MouseButton, var3: ConfigCallback): void;
    set canEdit(e: boolean);
    set defaultValue(defaultValue: T);
    set icon(i: Icon);
    set nameKey(key: string);
    set value(value: T);
    setCurrentValue(v: T): boolean;
    setOrder(o: number): ConfigValue<T>;
  }


  interface ConfigWithVariants<T = any> extends ConfigValue<T> {}
  class ConfigWithVariants<T = any> extends ConfigValue<T> {
    getIteration(var1: T, var2: boolean): T;
    onClicked(clickedWidget: Widget, button: MouseButton, callback: ConfigCallback): void;
  }


  interface DoubleConfig extends NumberConfig<number> {}
  class DoubleConfig extends NumberConfig<number> {
    constructor(mn: number, mx: number);
    addInfo(list: TooltipList): void;
    getStringFromValue(v: number): string;
    parse(callback: Consumer<number>, string: string): boolean;
    scrollValue(currentValue: number, forward: boolean): Optional<number>;
  }


  interface EntityFaceConfig extends ResourceConfigValue<EntityType> {}
  class EntityFaceConfig extends ResourceConfigValue<EntityType> {
    static readonly NONE: EntityType;
    constructor();
    addInfo(list: TooltipList): void;
    fixedResourceSize(): OptionalLong;
    get resource(): SelectableResource<EntityType<any>>;
    get stringForGUI(): Component;
    getStringForGUI(v: EntityType<any>): Component;
    isEmpty(): boolean;
    onClicked(clickedWidget: Widget, button: MouseButton, callback: ConfigCallback): void;
    set resource(selectable: SelectableResource<EntityType<any>>);
  }


  interface EnumConfig<E = any> extends ConfigWithVariants<E> {}
  class EnumConfig<E = any> extends ConfigWithVariants<E> {
    readonly nameMap: NameMap;
    constructor(nm: NameMap<E>);
    addInfo(list: TooltipList): void;
    get color(): Color4I;
    get icon(): Icon;
    get stringForGUI(): Component;
    getColor(v: E): Color4I;
    getIcon(v: E): Icon;
    getIteration(currentValue: E, next: boolean): E;
    getStringForGUI(v: E): Component;
    onClicked(clickedWidget: Widget, button: MouseButton, callback: ConfigCallback): void;
  }


  interface FluidConfig extends ResourceConfigValue<FluidStack> {}
  class FluidConfig extends ResourceConfigValue<FluidStack> {
    constructor(allowEmpty: boolean);

    constructor(fixedSize: number);
    allowEmptyResource(): boolean;
    fixedResourceSize(): OptionalLong;
    get resource(): SelectableResource<FluidStack>;
    get stringForGUI(): Component;
    getStringForGUI(v: FluidStack): Component;
    isEmpty(): boolean;
    onClicked(clickedWidget: Widget, button: MouseButton, callback: ConfigCallback): void;
    set resource(selectable: SelectableResource<FluidStack>);
    showAmount(show: boolean): FluidConfig;
  }


  class FTBLibraryClientConfig {
    static readonly KEY: string;
    static readonly CONFIG: SNBTConfig;
    static readonly TOOLTIPS: SNBTConfig;
    static readonly ITEM_MODNAME: BooleanValue;
    static readonly FLUID_MODNAME: BooleanValue;
    static readonly IMAGE_MODNAME: BooleanValue;
    static readonly ENTITY_MODNAME: BooleanValue;
    static readonly COLOR: SNBTConfig;
    static readonly RECENT: IntArrayValue;
    static readonly SIDEBAR: SNBTConfig;
    static readonly SIDEBAR_ENABLED: BooleanValue;
    static readonly SIDEBAR_POSITION: EnumValue;
    static readonly SIDEBAR_BUTTONS: StringSidebarMapValue;
    static save(): void;
  }


  class FTBLibraryServerConfig {
    static readonly KEY: string;
    static readonly CONFIG: SNBTConfig;
    static readonly SECT1: SNBTConfig;
    static readonly TEST1: StringValue;
    static readonly TEST2: StringValue;
    static readonly TEST3: BooleanValue;
    static readonly SECT2: SNBTConfig;
    static readonly TEST4: BooleanValue;
    static readonly TEST5: IntValue;
    static onChanged(isServer: boolean): void;
  }


  class FTBLibraryStartupConfig {
    static readonly KEY: string;
    static readonly CONFIG: SNBTConfig;
    static readonly SECT1: SNBTConfig;
    static readonly TEST1: StringValue;
    static readonly TEST2: StringValue;
    static readonly TEST3: BooleanValue;
    static readonly SECT2: SNBTConfig;
    static readonly TEST4: BooleanValue;
    static readonly TEST5: IntValue;
  }


  interface ImageResourceConfig extends ResourceConfigValue<ResourceLocation> {}
  class ImageResourceConfig extends ResourceConfigValue<ResourceLocation> {
    static readonly NONE: ResourceLocation;
    constructor();
    addInfo(list: TooltipList): void;
    fixedResourceSize(): OptionalLong;
    get resource(): SelectableResource<ResourceLocation>;
    static getResourceLocation(icon: Icon): ResourceLocation;
    isEmpty(): boolean;
    onClicked(clicked: Widget, button: MouseButton, callback: ConfigCallback): void;
    set resource(selectable: SelectableResource<ResourceLocation>);
  }


  interface IntConfig extends NumberConfig<number> {}
  class IntConfig extends NumberConfig<number> {
    constructor(mn: number, mx: number);
    addInfo(list: TooltipList): void;
    parse(callback: Consumer<number>, string: string): boolean;
    scrollValue(currentValue: number, forward: boolean): Optional<number>;
  }


  interface ItemStackConfig extends ResourceConfigValue<ItemStack> {}
  class ItemStackConfig extends ResourceConfigValue<ItemStack> {
    constructor(single: boolean, empty: boolean);

    constructor(fixedSize: number);
    allowEmptyResource(): boolean;
    copy(value: ItemStack): ItemStack;
    fixedResourceSize(): OptionalLong;
    get resource(): SelectableResource<ItemStack>;
    get stringForGUI(): Component;
    get value(): ItemStack;
    getStringForGUI(v: ItemStack): Component;
    isEmpty(): boolean;
    onClicked(clickedWidget: Widget, button: MouseButton, callback: ConfigCallback): void;
    set resource(selectable: SelectableResource<ItemStack>);
  }


  interface ListConfig<E = any, CV extends ConfigValue<E> = any> extends ConfigValue<List> {}
  class ListConfig<E = any, CV extends ConfigValue<E> = any> extends ConfigValue<List> {
    static readonly EMPTY_LIST: Component;
    static readonly NON_EMPTY_LIST: Component;
    static readonly COLOR: Color4I;
    constructor(t: CV);
    addInfo(l: TooltipList): void;
    copy(v: E[]): E[];
    get color(): Color4I;
    get stringForGUI(): Component;
    get type(): CV;
    getColor(v: E[]): Color4I;
    getStringForGUI(v: E[]): Component;
    onClicked(clickedWidget: Widget, button: MouseButton, callback: ConfigCallback): void;
  }


  interface LongConfig extends NumberConfig<Long> {}
  class LongConfig extends NumberConfig<Long> {
    constructor(mn: number, mx: number);
    addInfo(list: TooltipList): void;
    parse(callback: Consumer<Long>, string: string): boolean;
    scrollValue(currentValue: Long, forward: boolean): Optional<Long>;
  }


  interface NameMap<E = any> extends Iterable<E> {}
  class NameMap<E = any> extends Iterable<E> {
    readonly defaultValue: E;
    readonly map: Map;
    readonly keys: List;
    readonly values: List;
    get(s: string): E;
    get(index: number): E;
    getColor(value: E): Color4I;
    getDisplayName(value: E): Component;
    getIcon(v: E): Icon;
    getIndex(e: E): number;
    getName(value: E): string;
    getNext(value: E): E;
    getNullable(s: string): E;
    getPrevious(value: E): E;
    getRandom(rand: Random): E;
    getStringIndex(s: string): number;
    iterator(): Iterator<E>;
    static of<T>(defaultValue: T, values: T[]): Builder<T>;
    static of<T>(defaultValue: T, values: T[]): Builder<T>;
    offset(value: E, index: number): E;
    read(data: FriendlyByteBuf): E;
    size(): number;
    withDefault(def: E): NameMap<E>;
    write(data: FriendlyByteBuf, object: E): void;
  }


  interface NBTConfig extends ConfigFromString<CompoundTag> {}
  class NBTConfig extends ConfigFromString<CompoundTag> {
    static readonly EMPTY_NBT: Component;
    static readonly NON_EMPTY_NBT: Component;
    addInfo(list: TooltipList): void;
    copy(v: CompoundTag): CompoundTag;
    get stringForGUI(): Component;
    getStringForGUI(v: CompoundTag): Component;
    getStringFromValue(v: CompoundTag): string;
    parse(callback: Consumer<CompoundTag>, string: string): boolean;
  }


  interface NumberConfig<T extends Number = any> extends ConfigFromString<T> {}
  class NumberConfig<T extends Number = any> extends ConfigFromString<T> {
    static readonly COLOR: Color4I;
    readonly min: T;
    readonly max: T;
    fader: boolean;
    constructor(mn: T, mx: T);
    canScroll(): boolean;
    fader(v: boolean): NumberConfig<T>;
    get color(): Color4I;
    get stringForGUI(): Component;
    getColor(v: T): Color4I;
    getStringForGUI(v: T): Component;
    withScrollIncrement(increment: T): NumberConfig<T>;
  }


  interface ResourceConfigValue<T = any> extends ConfigValue<T> {}
  class ResourceConfigValue<T = any> extends ConfigValue<T> {
    allowEmptyResource(): boolean;
    allowResource(resource: T): boolean;
    canHaveNBT(): boolean;
    fixedResourceSize(): OptionalLong;
    get resource(): SelectableResource<T>;
    isEmpty(): boolean;
    set resource(var1: SelectableResource<T>);
    setAllowNBTEdit(allow: boolean): ResourceConfigValue<T>;
    withAllowEmpty(allowEmpty: boolean): ResourceConfigValue<T>;
    withFilter(filter: Predicate<T>): ResourceConfigValue<T>;
  }


  interface StringConfig extends ConfigFromString<string> {}
  class StringConfig extends ConfigFromString<string> {
    static readonly COLOR: Color4I;
    readonly pattern: Pattern;
    constructor(p: Pattern);

    constructor();
    addInfo(list: TooltipList): void;
    get color(): Color4I;
    get stringForGUI(): Component;
    getColor(v: string): Color4I;
    getStringForGUI(v: string): Component;
    parse(callback: Consumer<string>, string: string): boolean;
  }


  interface Tristate extends Enum<Tristate> {}
  class Tristate extends Enum<Tristate> {
    static readonly FALSE: Tristate;
    static readonly TRUE: Tristate;
    static readonly DEFAULT: Tristate;
    get(def: boolean): boolean;
    get opposite(): Tristate;
    isDefault(): boolean;
    isFalse(): boolean;
    isTrue(): boolean;
    static read(nbt: CompoundTag, key: string): Tristate;
    static read(buffer: FriendlyByteBuf): Tristate;
    toString(): string;
    static valueOf(name: string): Tristate;
    static values(): Tristate[];
    write(nbt: CompoundTag, key: string): void;
    write(buffer: FriendlyByteBuf): void;
  }

}

declare module 'dev.ftb.mods.ftblibrary.config.FTBLibraryClientConfig' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface SidebarPosition extends Enum<SidebarPosition> {}
  class SidebarPosition extends Enum<SidebarPosition> {
    static readonly TOP_LEFT: SidebarPosition;
    static readonly TOP_RIGHT: SidebarPosition;
    static readonly BOTTOM_LEFT: SidebarPosition;
    static readonly BOTTOM_RIGHT: SidebarPosition;
    isBottom(): boolean;
    isRight(): boolean;
    static valueOf(name: string): SidebarPosition;
    static values(): SidebarPosition[];
  }

}

declare module 'dev.ftb.mods.ftblibrary.config.manager' {
  import { Enum } from 'java.lang';
  import { SNBTConfig } from 'dev.ftb.mods.ftblibrary.snbt.config';
  import { BooleanConsumer } from 'dev.ftb.mods.ftblibrary.util';
  import { SNBTCompoundTag } from 'dev.ftb.mods.ftblibrary.snbt';
  import { Optional, List } from 'java.util';
  import { ConfigGroup } from 'dev.ftb.mods.ftblibrary.config';

  interface ConfigManager extends Enum<ConfigManager> {}
  class ConfigManager extends Enum<ConfigManager> {
    static readonly INSTANCE: ConfigManager;
    createConfigGroup(configName: string): Optional<ConfigGroup>;
    editedOnClient(key: string): void;
    static get instance(): ConfigManager;
    init(): void;
    registerClientConfig(config: SNBTConfig, groupPrefix: string): SNBTConfig;
    registerClientConfig(config: SNBTConfig, groupPrefix: string, onEdited: BooleanConsumer): SNBTConfig;
    registerServerConfig(config: SNBTConfig, groupPrefix: string, sync: boolean): SNBTConfig;
    registerServerConfig(config: SNBTConfig, groupPrefix: string, sync: boolean, onEdited: BooleanConsumer): SNBTConfig;
    registerStartupConfig(config: SNBTConfig, groupPrefix: string): SNBTConfig;
    save(key: string): void;
    syncFromClient(serverConfigName: string, tag: SNBTCompoundTag, playerName: string): void;
    syncFromServer(serverConfigName: string, tag: SNBTCompoundTag): void;
    static valueOf(name: string): ConfigManager;
    static values(): ConfigManager[];
  }


  class ConfigManagerClient {
    static editConfig(configName: string): void;
    static editConfig(configName: string, isReadOnly: boolean): void;
    static initClient(): void;
  }

}

declare module 'dev.ftb.mods.ftblibrary.config.manager.ConfigManager' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ConfigType extends Enum<ConfigType> {}
  class ConfigType extends Enum<ConfigType> {
    static readonly SERVER: ConfigType;
    static readonly CLIENT: ConfigType;
    static readonly STARTUP: ConfigType;
    static valueOf(name: string): ConfigType;
    static values(): ConfigType[];
  }

}

declare module 'dev.ftb.mods.ftblibrary.config.NameMap' {
  import { Function } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';
  import { Color4I, Icon } from 'dev.ftb.mods.ftblibrary.icon';
  import { NameMap } from 'dev.ftb.mods.ftblibrary.config';

  class Builder<T = any> {
    baseNameKey(key: string): Builder<T>;
    color(p: Function<T, Color4I>): Builder<T>;
    create(): NameMap<T>;
    icon(p: Function<T, Icon>): Builder<T>;
    id(p: Function<T, string>): Builder<T>;
    name(p: Function<T, Component>): Builder<T>;
    nameKey(p: Function<T, string>): Builder<T>;
  }

}

declare module 'dev.ftb.mods.ftblibrary.config.ResourceConfigValue' {
  import { ResourceConfigValue } from 'dev.ftb.mods.ftblibrary.config';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { OptionalLong } from 'java.util';

  interface Image<T = any> extends ResourceConfigValue<T> {}
  class Image<T = any> extends ResourceConfigValue<T> {
    static readonly NONE: ResourceLocation;
    canHaveNBT(): boolean;
    fixedResourceSize(): OptionalLong;
    isEmpty(): boolean;
  }

}

declare module 'dev.ftb.mods.ftblibrary.config.ui' {
  import { BaseScreen, Theme, ModalPanel, Panel } from 'dev.ftb.mods.ftblibrary.ui';
  import { EditConfigChoicePacket } from 'dev.ftb.mods.ftblibrary.net';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { AbstractThreePanelScreen } from 'dev.ftb.mods.ftblibrary.ui.misc';
  import { ConfigPanel } from 'dev.ftb.mods.ftblibrary.config.ui.EditConfigListScreen';
  import { ListConfig, ConfigCallback, ConfigGroup, StringConfig, ConfigFromString } from 'dev.ftb.mods.ftblibrary.config';
  import { Key } from 'dev.ftb.mods.ftblibrary.ui.input';
  import { Component } from 'net.minecraft.network.chat';
  import { ConfigPanel as dev_ftb_mods_ftblibrary_config_ui_editconfigscreen_ConfigPanel } from 'dev.ftb.mods.ftblibrary.config.ui.EditConfigScreen';

  interface ChooseConfigScreen extends BaseScreen {}
  class ChooseConfigScreen extends BaseScreen {
    addWidgets(): void;
    alignWidgets(): void;
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    onInit(): boolean;
    static open(message: EditConfigChoicePacket): void;
  }


  interface EditConfigListScreen<E = any, CV extends ConfigValue<E> = any> extends AbstractThreePanelScreen<ConfigPanel> {}
  class EditConfigListScreen<E = any, CV extends ConfigValue<E> = any> extends AbstractThreePanelScreen<ConfigPanel> {
    constructor(listConfig: ListConfig<E, CV>, callback: ConfigCallback);
    get title(): Component;
    keyPressed(key: Key): boolean;
    onClosedByKey(key: Key): boolean;
    onInit(): boolean;
    shouldCloseOnEsc(): boolean;
  }


  interface EditConfigScreen extends AbstractThreePanelScreen<dev_ftb_mods_ftblibrary_config_ui_editconfigscreen_ConfigPanel> {}
  class EditConfigScreen extends AbstractThreePanelScreen<dev_ftb_mods_ftblibrary_config_ui_editconfigscreen_ConfigPanel> {
    constructor(configGroup: ConfigGroup);

    constructor(configGroup: ConfigGroup, readOnly: boolean);
    get title(): Component;
    keyPressed(key: Key): boolean;
    onClosedByKey(key: Key): boolean;
    onInit(): boolean;
    setAutoclose(autoclose: boolean): EditConfigScreen;
    setOpenPrevScreenOnClose(openPrevScreenOnClose: boolean): EditConfigScreen;
    shouldCloseOnEsc(): boolean;
  }


  interface EditMultilineStringConfigOverlay extends ModalPanel {}
  class EditMultilineStringConfigOverlay extends ModalPanel {
    constructor(panel: Panel, config: StringConfig, callback: ConfigCallback);
    addWidgets(): void;
    alignWidgets(): void;
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    keyPressed(key: Key): boolean;
  }


  interface EditStringConfigOverlay<T = any> extends ModalPanel {}
  class EditStringConfigOverlay<T = any> extends ModalPanel {
    constructor(panel: Panel, config: ConfigFromString<T>, callback: ConfigCallback);

    constructor(panel: Panel, config: ConfigFromString<T>, callback: ConfigCallback, title: Component);
    addWidgets(): void;
    alignWidgets(): void;
    atMousePosition(): EditStringConfigOverlay<T>;
    atPosition(x: number, y: number): EditStringConfigOverlay<T>;
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    keyPressed(key: Key): boolean;
    setAddAcceptCancelButtons(addAcceptCancelButtons: boolean): void;
  }

}

declare module 'dev.ftb.mods.ftblibrary.config.ui.ChooseConfigScreen.TextButton' {
  import { TextButton } from 'dev.ftb.mods.ftblibrary.config.ui.ChooseConfigScreen';
  import { MouseButton } from 'dev.ftb.mods.ftblibrary.ui.input';

  class Callback {
    onClicked(var1: TextButton, var2: MouseButton): void;
  }

}

declare module 'dev.ftb.mods.ftblibrary.config.ui.EditConfigListScreen' {
  import { SimpleButton, Panel, Button, Theme } from 'dev.ftb.mods.ftblibrary.ui';
  import { PosProvider } from 'dev.ftb.mods.ftblibrary.config.ui.EditStringConfigOverlay';
  import { MouseButton } from 'dev.ftb.mods.ftblibrary.ui.input';
  import { TooltipList } from 'dev.ftb.mods.ftblibrary.util';
  import { Offset } from 'EditStringConfigOverlay.PosProvider';
  import { Optional } from 'java.util';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface ButtonAddValue extends PosProvider, SimpleButton {}
  class ButtonAddValue extends PosProvider {
    constructor(panel: Panel, btn: SimpleButton, mb: MouseButton);
    addMouseOverText(list: TooltipList): void;
    get overlayOffset(): Offset;
    onClicked(button: MouseButton): void;
  }


  interface ConfigPanel extends Panel {}
  class ConfigPanel extends Panel {
    constructor();
    addWidgets(): void;
    alignWidgets(): void;
    get hoveredDeletable(): Optional<Deletable>;
  }


  class Deletable {
    deleteItem(): void;
  }


  interface ButtonConfigValue extends Deletable, PosProvider, Button {}
  class ButtonConfigValue extends Deletable {
    readonly index: number;
    constructor(index: number);
    addMouseOverText(l: TooltipList): void;
    deleteItem(): void;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    get overlayOffset(): Offset;
    onClicked(button: MouseButton): void;
  }

}

declare module 'dev.ftb.mods.ftblibrary.config.ui.EditConfigScreen' {
  import { Button, Panel, Theme } from 'dev.ftb.mods.ftblibrary.ui';
  import { ConfigGroup } from 'dev.ftb.mods.ftblibrary.config';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { TooltipList } from 'dev.ftb.mods.ftblibrary.util';
  import { MouseButton } from 'dev.ftb.mods.ftblibrary.ui.input';

  interface ConfigGroupButton extends Button {}
  class ConfigGroupButton extends Button {
    constructor(panel: Panel, g: ConfigGroup);
    addMouseOverText(list: TooltipList): void;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    onClicked(button: MouseButton): void;
    setCollapsed(collapsed: boolean): void;
  }


  interface ConfigPanel extends Panel {}
  class ConfigPanel extends Panel {
    constructor();
    addWidgets(): void;
    alignWidgets(): void;
  }

}

declare module 'dev.ftb.mods.ftblibrary.config.ui.EditStringConfigOverlay' {
  import { Offset } from 'dev.ftb.mods.ftblibrary.config.ui.EditStringConfigOverlay.PosProvider';

  class PosProvider {
    get overlayOffset(): Offset;
  }

}

declare module 'dev.ftb.mods.ftblibrary.config.ui.resource' {
  import { EntityType } from 'net.minecraft.world.entity';
  import { Comparable } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Component } from 'net.minecraft.network.chat';
  import { Icon } from 'dev.ftb.mods.ftblibrary.icon';
  import { FluidStack } from 'dev.architectury.fluid';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Collection, List, Optional } from 'java.util';
  import { AbstractThreePanelScreen } from 'dev.ftb.mods.ftblibrary.ui.misc';
  import { StacksPanel } from 'dev.ftb.mods.ftblibrary.config.ui.resource.ResourceSelectorScreen';
  import { ResourceConfigValue, ConfigCallback, FluidConfig, ItemStackConfig } from 'dev.ftb.mods.ftblibrary.config';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Theme, Widget } from 'dev.ftb.mods.ftblibrary.ui';

  interface EntityFaceResource extends SelectableResource<EntityType>, Comparable<EntityFaceResource> {}
  class EntityFaceResource extends SelectableResource<EntityType> {
    static readonly NONE: EntityFaceResource;
    constructor(type: EntityType<any>);
    compareTo(o: EntityFaceResource): number;
    copyWithCount(count: number): SelectableResource<EntityType<any>>;
    get count(): number;
    get icon(): Icon;
    get location(): ResourceLocation;
    get name(): Component;
    isEmpty(): boolean;
    resource(): EntityType<any>;
    set count(count: number);
  }


  interface FluidStackResource extends SelectableResource<FluidStack>, Record {}
  class FluidStackResource extends SelectableResource<FluidStack> {
    constructor(resource: FluidStack);
    applyComponentsTag(tag: CompoundTag): void;
    copyWithCount(count: number): SelectableResource<FluidStack>;
    equals(o: any): boolean;
    get componentsTag(): CompoundTag;
    get count(): number;
    get icon(): Icon;
    get name(): Component;
    hashCode(): number;
    resource(): FluidStack;
    set count(count: number);
    toString(): string;
  }


  interface ImageResource extends SelectableResource<ResourceLocation> {}
  class ImageResource extends SelectableResource<ResourceLocation> {
    constructor(location: ResourceLocation);
    copyWithCount(count: number): SelectableResource<ResourceLocation>;
    get count(): number;
    get icon(): Icon;
    get name(): Component;
    resource(): ResourceLocation;
    set count(count: number);
  }


  interface ItemStackResource extends SelectableResource<ItemStack>, Record {}
  class ItemStackResource extends SelectableResource<ItemStack> {
    constructor(resource: ItemStack);
    applyComponentsTag(tag: CompoundTag): void;
    copyWithCount(count: number): SelectableResource<ItemStack>;
    equals(o: any): boolean;
    get componentsTag(): CompoundTag;
    get count(): number;
    get icon(): Icon;
    get name(): Component;
    hashCode(): number;
    resource(): ItemStack;
    set count(count: number);
    toString(): string;
  }


  class ResourceSearchMode<T = any> {
    static readonly ALL_ITEMS: ResourceSearchMode;
    static readonly INVENTORY: ResourceSearchMode;
    static readonly ALL_FLUIDS: ResourceSearchMode;
    static readonly ENTITY_FACES: ResourceSearchMode;
    static readonly IMAGES: ResourceSearchMode;
    clearCache(): void;
    get allResources(): Collection<SelectableResource<T>>;
    get displayName(): Component;
    get icon(): Icon;
  }


  interface ResourceSelectorScreen<T = any> extends AbstractThreePanelScreen<StacksPanel> {}
  class ResourceSelectorScreen<T = any> extends AbstractThreePanelScreen<StacksPanel> {
    update: number;
    constructor(config: ResourceConfigValue<T>, callback: ConfigCallback);
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawForeground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    makeResourceWidgets(search: string): Widget[];
    onInit(): boolean;
    onTextChanged(): void;
    tick(): void;
    withGridSize(rows: number, cols: number): ResourceSelectorScreen<T>;
  }


  class SearchModeIndex<T extends ResourceSearchMode<any> = any> {
    appendMode(mode: T): void;
    get currentSearchMode(): Optional<T>;
    nextMode(): void;
    prependMode(mode: T): void;
  }


  class SelectableResource<T = any> {
    applyComponentsTag(tag: CompoundTag): void;
    copyWithCount(var1: number): SelectableResource<T>;
    static fluid(stack: FluidStack): SelectableResource<FluidStack>;
    get componentsTag(): CompoundTag;
    get count(): number;
    get icon(): Icon;
    get name(): Component;
    isEmpty(): boolean;
    static item(stack: ItemStack): SelectableResource<ItemStack>;
    resource(): T;
    set count(var1: number);
  }


  interface SelectEntityFaceScreen extends ResourceSelectorScreen<EntityType> {}
  class SelectEntityFaceScreen extends ResourceSelectorScreen<EntityType> {
    constructor(config: ResourceConfigValue<EntityType<any>>, callback: ConfigCallback);
  }


  interface SelectFluidScreen extends ResourceSelectorScreen<FluidStack> {}
  class SelectFluidScreen extends ResourceSelectorScreen<FluidStack> {
    constructor(config: FluidConfig, callback: ConfigCallback);
  }


  interface SelectImageResourceScreen extends ResourceSelectorScreen<ResourceLocation> {}
  class SelectImageResourceScreen extends ResourceSelectorScreen<ResourceLocation> {
    constructor(config: ResourceConfigValue<ResourceLocation>, callback: ConfigCallback);
  }


  interface SelectItemStackScreen extends ResourceSelectorScreen<ItemStack> {}
  class SelectItemStackScreen extends ResourceSelectorScreen<ItemStack> {
    static readonly KNOWN_MODES: SearchModeIndex;
    constructor(config: ItemStackConfig, callback: ConfigCallback);
  }

}

declare module 'dev.ftb.mods.ftblibrary.config.ui.resource.ResourceSearchMode' {
  import { ResourceSearchMode } from 'dev.ftb.mods.ftblibrary.config.ui.resource';
  import { Component } from 'net.minecraft.network.chat';
  import { Icon } from 'dev.ftb.mods.ftblibrary.icon';

  interface SearchMode<T = any> extends ResourceSearchMode<T> {}
  class SearchMode<T = any> extends ResourceSearchMode<T> {
    get displayName(): Component;
    get icon(): Icon;
  }

}

declare module 'dev.ftb.mods.ftblibrary.config.ui.resource.ResourceSelectorScreen' {
  import { Panel, Theme } from 'dev.ftb.mods.ftblibrary.ui';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface StacksPanel extends Panel {}
  class StacksPanel extends Panel {
    constructor();
    addWidgets(): void;
    alignWidgets(): void;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
  }

}

declare module 'dev.ftb.mods.ftblibrary.config.ui.resource.SelectImageResourceScreen' {
  import { Enum } from 'java.lang';
  import { ResourceManager } from 'net.minecraft.server.packs.resources';
  import { List } from 'java.util';

  interface ResourceListener extends Enum<ResourceListener> {}
  class ResourceListener extends Enum<ResourceListener> {
    static readonly INSTANCE: ResourceListener;
    onResourceManagerReload(resourceManager: ResourceManager): void;
    static valueOf(name: string): ResourceListener;
    static values(): ResourceListener[];
  }

}

declare module 'dev.ftb.mods.ftblibrary.core' {
  import { Container } from 'net.minecraft.world';
  import { Item } from 'net.minecraft.world.item';

  class CompoundContainerFTBL {
    get container1FTBL(): Container;
    get container2FTBL(): Container;
  }


  class ItemFTBL {
    setCraftingRemainingItemFTBL(var1: Item): void;
  }

}

declare module 'dev.ftb.mods.ftblibrary.core.mixin.common' {
  import { CompoundContainerFTBL, ItemFTBL } from 'dev.ftb.mods.ftblibrary.core';
  import { Container } from 'net.minecraft.world';
  import { Item } from 'net.minecraft.world.item';

  interface CompoundContainerMixin extends CompoundContainerFTBL {}
  class CompoundContainerMixin extends CompoundContainerFTBL {
    get container1FTBL(): Container;
    get container2FTBL(): Container;
  }


  interface ItemMixin extends ItemFTBL {}
  class ItemMixin extends ItemFTBL {
    setCraftingRemainingItemFTBL(var1: Item): void;
  }


  class MultilineTextFieldAccess {
    setSelectCursor(var1: number): void;
  }


  class ResourceLocationMixin {
  }


  class TextColorMixin {
  }

}

declare module 'dev.ftb.mods.ftblibrary' {
  import { Logger } from 'org.apache.logging.log4j';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { DeferredSupplier } from 'dev.architectury.registry.registries';
  import { CreativeModeTab } from 'net.minecraft.world.item';
  import { CursorType } from 'dev.ftb.mods.ftblibrary.ui';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Map } from 'java.util';
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack, CommandBuildContext } from 'net.minecraft.commands';
  import { CommandSelection } from 'Commands';

  class FTBLibrary {
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static readonly LOGGER: Logger;
    constructor();
    static get creativeModeTab(): DeferredSupplier<CreativeModeTab>;
    static rl(path: string): ResourceLocation;
  }


  class FTBLibraryClient {
    static lastCursorType: CursorType;
    static areButtonsVisible(gui: Screen): boolean;
    static init(): void;
  }


  class FTBLibraryCommands {
    static readonly EDITING_NBT: Map;
    static registerCommands(dispatcher: CommandDispatcher<CommandSourceStack>, ignoredCtx: CommandBuildContext, ignoredType: CommandSelection): void;
  }


  class FTBLibraryCommon {
    init(): void;
  }

}

declare module 'dev.ftb.mods.ftblibrary.icon' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { PixelBuffer } from 'dev.ftb.mods.ftblibrary.math';
  import { JsonElement } from 'com.google.gson';
  import { ChatFormatting } from 'net.minecraft';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Style } from 'net.minecraft.network.chat';
  import { List, Collection, Map, Optional } from 'java.util';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { SimplePreparableReloadListener } from 'net.minecraft.server.packs.resources';
  import { EntityType, Entity } from 'net.minecraft.world.entity';
  import { EntityIconSettings, WidthHeight } from 'dev.ftb.mods.ftblibrary.icon.EntityIconLoader';
  import { Slice, ChildIconData } from 'dev.ftb.mods.ftblibrary.icon.EntityImageIcon';
  import { GameProfile } from 'com.mojang.authlib';
  import { Codec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Supplier } from 'java.util.function';
  import { URI } from 'java.net';

  interface AtlasSpriteIcon extends IResourceIcon, Icon {}
  class AtlasSpriteIcon extends IResourceIcon {
    aspectRatio(): number;
    copy(): AtlasSpriteIcon;
    createPixelBuffer(): PixelBuffer;
    draw(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    get id(): ResourceLocation;
    get pixelBufferFrameCount(): number;
    get resourceLocation(): ResourceLocation;
    hasPixelBuffer(): boolean;
    toString(): string;
    withColor(color: Color4I): AtlasSpriteIcon;
    withTint(c: Color4I): AtlasSpriteIcon;
  }


  interface BulletIcon extends Icon {}
  class BulletIcon extends Icon {
    copy(): BulletIcon;
    draw(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    get json(): JsonElement;
    setColor(col: Color4I): BulletIcon;
    setInverse(v: boolean): BulletIcon;
    withColor(col: Color4I): BulletIcon;
    withTint(c: Color4I): BulletIcon;
  }


  interface Color4I extends Icon {}
  class Color4I extends Icon {
    static readonly BLACK: Color4I;
    static readonly DARK_GRAY: Color4I;
    static readonly GRAY: Color4I;
    static readonly WHITE: Color4I;
    static readonly RED: Color4I;
    static readonly GREEN: Color4I;
    static readonly BLUE: Color4I;
    static readonly LIGHT_RED: Color4I;
    static readonly LIGHT_GREEN: Color4I;
    static readonly LIGHT_BLUE: Color4I;
    static HSBtoRGB(hue: number, saturation: number, brightness: number): number;
    static RGBtoHSB(r: number, g: number, b: number, hsbvals: number[]): number[];
    addBrightness(percent: number): Color4I;
    alphaf(): number;
    alphai(): number;
    bluef(): number;
    bluei(): number;
    copy(): Color4I;
    createPixelBuffer(): PixelBuffer;
    draw(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    equals(o: any): boolean;
    static fromJson(element: JsonElement): Color4I;
    static fromString(s: string): Color4I;
    get json(): JsonElement;
    static get256(id: number): Color4I;
    static getChatFormattingColor(id: number): Color4I;
    static getChatFormattingColor(formatting: ChatFormatting): Color4I;
    greenf(): number;
    greeni(): number;
    hasPixelBuffer(): boolean;
    hashCode(): number;
    static hsb(h: number, s: number, b: number): Color4I;
    isMutable(): boolean;
    lerp(col: Color4I, m: number): Color4I;
    mutable(): MutableColor4I;
    redf(): number;
    redi(): number;
    static rgb(r: number, g: number, b: number): Color4I;
    static rgb(col: number): Color4I;
    static rgb(color: Vec3): Color4I;
    rgb(): number;
    static rgba(r: number, g: number, b: number, a: number): Color4I;
    static rgba(col: number): Color4I;
    rgba(): number;
    toString(): string;
    toStyle(): Style;
    whiteIfEmpty(): Color4I;
    withAlpha(a: number): Color4I;
    withAlphaf(alpha: number): Color4I;
    withColor(color: Color4I): Icon;
    withTint(col: Color4I): Color4I;
  }


  interface CombinedIcon extends Icon {}
  class CombinedIcon extends Icon {
    readonly list: List;
    draw(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    draw3D(graphics: GuiGraphics): void;
    drawStatic(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    equals(o: any): boolean;
    get json(): JsonElement;
    static getCombined(icons: Collection<Icon>): Icon;
    hashCode(): number;
  }


  class CustomIconItem {
    getCustomIcon(var1: ItemStack): Icon;
  }


  class Drawable {
    draw(var1: GuiGraphics, var2: number, var3: number, var4: number, var5: number): void;
    draw3D(graphics: GuiGraphics): void;
    drawStatic(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
  }


  interface EntityIconLoader extends SimplePreparableReloadListener<Map> {}
  class EntityIconLoader extends SimplePreparableReloadListener<Map> {
    static readonly NORMAL: Icon;
    static readonly HOSTILE: Icon;
    static getIcon(entity: Entity): Icon;
    static getIcon(entityType: EntityType<any>): Icon;
    static getSettings(entityType: EntityType<any>): Optional<EntityIconSettings>;
    static isDynamicTexture(type: EntityType<any>): boolean;
  }


  interface EntityImageIcon extends Icon {}
  class EntityImageIcon extends Icon {
    constructor(mainTexture: ResourceLocation, mainSlice: Slice, children: ChildIconData[], defaultImageSize: WidthHeight);
    draw(graphics: GuiGraphics, x: number, y: number, width: number, height: number): void;
  }


  interface FaceIcon extends Icon {}
  class FaceIcon extends Icon {
    readonly profile: GameProfile;
    skin: Icon;
    head: Icon;
    hat: Icon;
    draw(poseStack: GuiGraphics, x: number, y: number, w: number, h: number): void;
    static getFace(profile: GameProfile): FaceIcon;
  }


  interface HollowRectangleIcon extends Icon {}
  class HollowRectangleIcon extends Icon {
    color: Color4I;
    roundEdges: boolean;
    constructor(c: Color4I, r: boolean);
    copy(): HollowRectangleIcon;
    draw(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    get json(): JsonElement;
    withColor(color: Color4I): HollowRectangleIcon;
    withTint(c: Color4I): HollowRectangleIcon;
  }


  interface Icon extends Drawable {}
  class Icon extends Drawable {
    static readonly CODEC: Codec;
    static readonly STRING_CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    aspectRatio(): number;
    combineWith(icon: Icon): Icon;
    combineWith(...icons: Icon[]): Icon;
    copy(): Icon;
    createPixelBuffer(): PixelBuffer;
    static empty(): Color4I;
    equals(o: any): boolean;
    get ingredient(): any;
    get json(): JsonElement;
    get pixelBufferFrameCount(): number;
    static getIcon(json: JsonElement): Icon;
    static getIcon(id: ResourceLocation): Icon;
    static getIcon(id: string): Icon;
    hasPixelBuffer(): boolean;
    hashCode(): number;
    isEmpty(): boolean;
    withBorder(color: Color4I, roundEdges: boolean): Icon;
    withColor(color: Color4I): Icon;
    withPadding(padding: number): Icon;
    withTint(color: Color4I): Icon;
    withUV(u0: number, v0: number, u1: number, v1: number): Icon;
    withUV(x: number, y: number, w: number, h: number, tw: number, th: number): Icon;
  }


  interface IconAnimation extends Icon {}
  class IconAnimation extends Icon {
    readonly list: List;
    draw(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    draw3D(graphics: GuiGraphics): void;
    drawStatic(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    equals(o: any): boolean;
    static fromList(icons: Icon[], includeEmpty: boolean): Icon;
    get ingredient(): any;
    get json(): JsonElement;
    hashCode(): number;
    isEmpty(): boolean;
  }


  class IconPresets {
    static readonly MAP: Map;
  }


  class IconProperties {
    getBoolean(key: string, def: boolean): boolean;
    getColor(key: string): Color4I;
    getDouble(key: string, def: number, min: number, max: number): number;
    getDouble(key: string, def: number): number;
    getInt(key: string, def: number, min: number, max: number): number;
    getInt(key: string, def: number): number;
    getString(key: string, def: string): string;
    set(key: string, value: string): void;
  }


  interface IconWithBorder extends IconWithParent {}
  class IconWithBorder extends IconWithParent {
    static readonly BUTTON_GRAY: Icon;
    static readonly BUTTON_RED: Icon;
    static readonly BUTTON_GREEN: Icon;
    static readonly BUTTON_BLUE: Icon;
    static readonly BUTTON_ROUND_GRAY: Icon;
    static readonly BUTTON_ROUND_RED: Icon;
    static readonly BUTTON_ROUND_GREEN: Icon;
    static readonly BUTTON_ROUND_BLUE: Icon;
    color: Color4I;
    roundEdges: boolean;
    copy(): IconWithBorder;
    draw(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    get json(): JsonElement;
    withColor(c: Color4I): IconWithBorder;
    withTint(c: Color4I): IconWithBorder;
  }


  interface IconWithPadding extends IconWithParent {}
  class IconWithPadding extends IconWithParent {
    padding: number;
    copy(): IconWithPadding;
    draw(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    get json(): JsonElement;
    withColor(color: Color4I): IconWithPadding;
    withTint(color: Color4I): IconWithPadding;
  }


  interface IconWithParent extends Icon {}
  class IconWithParent extends Icon {
    readonly parent: Icon;
    constructor(i: Icon);
  }


  class ImageCallback<T = any> {
    imageLoaded(var1: boolean, var2: T): void;
  }


  interface ImageIcon extends IResourceIcon, Icon {}
  class ImageIcon extends IResourceIcon {
    static readonly MISSING_IMAGE: ResourceLocation;
    readonly texture: ResourceLocation;
    minU: number;
    minV: number;
    maxU: number;
    maxV: number;
    tileSize: number;
    color: Color4I;
    constructor(tex: ResourceLocation);
    aspectRatio(): number;
    bindTexture(): void;
    copy(): ImageIcon;
    createPixelBuffer(): PixelBuffer;
    draw(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    equals(o: any): boolean;
    get resourceLocation(): ResourceLocation;
    hasPixelBuffer(): boolean;
    hashCode(): number;
    toString(): string;
    withColor(color: Color4I): ImageIcon;
    withTint(c: Color4I): ImageIcon;
    withUV(u0: number, v0: number, u1: number, v1: number): ImageIcon;
    withUV(x: number, y: number, w: number, h: number, tw: number, th: number): Icon;
  }


  class IResourceIcon {
    get resourceLocation(): ResourceLocation;
  }


  interface ItemIcon extends IResourceIcon, Icon {}
  class ItemIcon extends IResourceIcon {
    draw(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    draw3D(graphics: GuiGraphics): void;
    static drawItem3D(graphics: GuiGraphics, stack: ItemStack): void;
    drawStatic(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    equals(o: any): boolean;
    get ingredient(): any;
    get resourceLocation(): ResourceLocation;
    get stack(): ItemStack;
    static getItemIcon(stack: ItemStack): Icon;
    static getItemIcon(item: Item): Icon;
    static getItemIcon(lazyStackString: string): Icon;
    hashCode(): number;
    toString(): string;
    toString(): string;
  }


  interface LazyIcon extends Icon {}
  class LazyIcon extends Icon {
    readonly iconSupplier: Supplier;
    constructor(s: Supplier<Icon>);
    copy(): Icon;
    createPixelBuffer(): PixelBuffer;
    draw(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    draw3D(graphics: GuiGraphics): void;
    drawStatic(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    get icon(): Icon;
    get ingredient(): any;
    get json(): JsonElement;
    static getIcon(json: JsonElement): Icon;
    static getIcon(id: ResourceLocation): Icon;
    static getIcon(id: string): Icon;
    hasPixelBuffer(): boolean;
    hashCode(): number;
    isEmpty(): boolean;
    toString(): string;
    withColor(color: Color4I): Icon;
    withTint(color: Color4I): Icon;
    withUV(u0: number, v0: number, u1: number, v1: number): Icon;
    withUV(x: number, y: number, w: number, h: number, tw: number, th: number): Icon;
  }


  interface MutableColor4I extends Color4I {}
  class MutableColor4I extends Color4I {
    static readonly TEMP: Color4I;
    addBrightness(b: number): Color4I;
    addBrightness(percent: number): Color4I;
    copy(): MutableColor4I;
    get json(): JsonElement;
    isMutable(): boolean;
    mutable(): MutableColor4I;
    set(r: number, g: number, b: number, a: number): Color4I;
    set(col: Color4I, a: number): Color4I;
    set(col: Color4I): Color4I;
    set(col: number, a: number): Color4I;
    set(col: number): Color4I;
    setAlpha(a: number): Color4I;
    setFromHSB(h: number, s: number, b: number): Color4I;
  }


  interface PartIcon extends IconWithParent {}
  class PartIcon extends IconWithParent {
    readonly parent: Icon;
    textureWidth: number;
    textureHeight: number;
    textureU: number;
    textureV: number;
    corner: number;
    subWidth: number;
    subHeight: number;
    constructor(icon: Icon, textureU: number, textureV: number, subWidth: number, subHeight: number, corner: number, textureWidth: number, textureHeight: number);

    constructor(icon: Icon, x: number, y: number, w: number, h: number, c: number);

    constructor(iconId: string, textureU: number, textureV: number, subWidth: number, subHeight: number, corner: number, textureWidth: number, textureHeight: number);

    constructor(icon: Icon);
    copy(): PartIcon;
    draw(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    get json(): JsonElement;
    setTextureSize(w: number, h: number): PartIcon;
    updateParts(): void;
    static wholeTexture(textureId: string, textureWidth: number, textureHeight: number, corner: number): PartIcon;
  }


  interface RainbowIcon extends Icon {}
  class RainbowIcon extends Icon {
    static RAINBOW: RainbowIcon;
    draw(graphics: GuiGraphics, x: number, y: number, width: number, height: number): void;
  }


  interface URLImageIcon extends ImageIcon {}
  class URLImageIcon extends ImageIcon {
    readonly uri: URI;
    constructor(tex: ResourceLocation, _uri: URI);

    constructor(uri: URI);
    bindTexture(): void;
    copy(): URLImageIcon;
    createPixelBuffer(): PixelBuffer;
    toString(): string;
  }

}

declare module 'dev.ftb.mods.ftblibrary.icon.MutableColor4I' {
  import { MutableColor4I, Color4I } from 'dev.ftb.mods.ftblibrary.icon';
  import { PixelBuffer } from 'dev.ftb.mods.ftblibrary.math';

  interface None extends MutableColor4I {}
  class None extends MutableColor4I {
    createPixelBuffer(): PixelBuffer;
    equals(o: any): boolean;
    hashCode(): number;
    isEmpty(): boolean;
    set(r: number, g: number, b: number, a: number): Color4I;
    set(col: Color4I, a: number): Color4I;
    set(col: Color4I): Color4I;
    set(col: number, a: number): Color4I;
    set(col: number): Color4I;
  }

}

declare module 'dev.ftb.mods.ftblibrary.integration.currency' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';

  interface CurrencyHelper extends Enum<CurrencyHelper> {}
  class CurrencyHelper extends Enum<CurrencyHelper> {
    static readonly INSTANCE: CurrencyHelper;
    static get instance(): CurrencyHelper;
    get provider(): CurrencyProvider;
    setActiveImpl(newProvider: CurrencyProvider): void;
    static valueOf(name: string): CurrencyHelper;
    static values(): CurrencyHelper[];
  }


  class CurrencyProvider {
    coinName(var1: boolean): Component;
    get name(): string;
    getTotalCurrency(var1: Player): number;
    giveCurrency(var1: Player, var2: number): void;
    isValidProvider(): boolean;
    takeCurrency(var1: Player, var2: number): boolean;
  }


  interface FallbackCurrencyProvider extends Enum<FallbackCurrencyProvider> {}
  class FallbackCurrencyProvider extends Enum<FallbackCurrencyProvider> {
    static readonly INSTANCE: FallbackCurrencyProvider;
    coinName(plural: boolean): Component;
    get name(): string;
    getTotalCurrency(player: Player): number;
    giveCurrency(player: Player, amount: number): void;
    isValidProvider(): boolean;
    takeCurrency(player: Player, amount: number): boolean;
    static valueOf(name: string): FallbackCurrencyProvider;
    static values(): FallbackCurrencyProvider[];
  }

}

declare module 'dev.ftb.mods.ftblibrary.integration' {
  import { EmiPlugin, EmiInitRegistry, EmiRegistry } from 'dev.emi.emi.api';
  import { REIClientPlugin } from 'me.shedaniel.rei.api.client.plugins';
  import { ExclusionZones } from 'me.shedaniel.rei.api.client.registry.screen';

  interface EMIIntegration extends EmiPlugin {}
  class EMIIntegration extends EmiPlugin {
    initialize(registry: EmiInitRegistry): void;
    register(registry: EmiRegistry): void;
  }


  interface REIIntegration extends REIClientPlugin {}
  class REIIntegration extends REIClientPlugin {
    registerExclusionZones(zones: ExclusionZones): void;
  }

}

declare module 'dev.ftb.mods.ftblibrary.integration.neoforge' {
  import { REIIntegration } from 'dev.ftb.mods.ftblibrary.integration';

  interface REINeoforgePluginStub extends REIIntegration {}
  class REINeoforgePluginStub extends REIIntegration {
  }

}

declare module 'dev.ftb.mods.ftblibrary.integration.permissions' {
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface FallbackPermissionProvider extends PermissionProvider {}
  class FallbackPermissionProvider extends PermissionProvider {
    get name(): string;
    getBooleanPermission(player: ServerPlayer, nodeName: string, def: boolean): boolean;
    getIntegerPermission(player: ServerPlayer, nodeName: string, def: number): number;
    getStringPermission(player: ServerPlayer, nodeName: string, def: string): string;
  }


  interface PermissionHelper extends Enum<PermissionHelper> {}
  class PermissionHelper extends Enum<PermissionHelper> {
    static readonly INSTANCE: PermissionHelper;
    get instance(): PermissionHelper;
    get provider(): PermissionProvider;
    setProviderImpl(newProvider: PermissionProvider): void;
    static valueOf(name: string): PermissionHelper;
    static values(): PermissionHelper[];
  }


  class PermissionProvider {
    get name(): string;
    getBooleanPermission(var1: ServerPlayer, var2: string, var3: boolean): boolean;
    getIntegerPermission(var1: ServerPlayer, var2: string, var3: number): number;
    getStringPermission(var1: ServerPlayer, var2: string, var3: string): string;
  }

}

declare module 'dev.ftb.mods.ftblibrary.integration.stages' {
  import { Player } from 'net.minecraft.world.entity.player';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface EntityTagStageProvider extends StageProvider {}
  class EntityTagStageProvider extends StageProvider {
    add(player: ServerPlayer, stage: string): void;
    get name(): string;
    has(player: Player, stage: string): boolean;
    remove(player: ServerPlayer, stage: string): void;
    sync(player: ServerPlayer): void;
  }


  interface StageHelper extends Enum<StageHelper> {}
  class StageHelper extends Enum<StageHelper> {
    static readonly INSTANCE: StageHelper;
    static get instance(): StageHelper;
    get provider(): StageProvider;
    setProviderImpl(newProvider: StageProvider): void;
    static valueOf(name: string): StageHelper;
    static values(): StageHelper[];
  }


  class StageProvider {
    add(var1: ServerPlayer, var2: string): void;
    get name(): string;
    has(var1: Player, var2: string): boolean;
    remove(var1: ServerPlayer, var2: string): void;
    sync(player: ServerPlayer): void;
  }

}

declare module 'dev.ftb.mods.ftblibrary.items' {
  import { DeferredSupplier } from 'dev.architectury.registry.registries';

  class ModItems {
    static readonly FTB_LIBRARY_TAB: DeferredSupplier;
    static init(): void;
  }

}

declare module 'dev.ftb.mods.ftblibrary.math' {
  import { UUID, List, Collection, Random } from 'java.util';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { BufferedImage } from 'java.awt.image';
  import { InputStream } from 'java.io';
  import { ByteBuffer } from 'java.nio';
  import { Enum } from 'java.lang';

  class Bits {
    static byteFromShortA(s: number): number;
    static byteFromShortB(s: number): number;
    static bytesToShort(a: number, b: number): number;
    static fromInt(b: number[], off: number, v: number): void;
    static fromLong(b: number[], off: number, v: number): void;
    static fromUShort(b: number[], off: number, v: number): void;
    static fromUUID(b: number[], off: number, uuid: UUID): void;
    static fromUUIDList(c: Collection<UUID>): number[];
    static getFlag(flags: number, flag: number): boolean;
    static intFromLongA(l: number): number;
    static intFromLongB(l: number): number;
    static intsToLong(a: number, b: number): number;
    static setFlag(flags: number, flag: number, v: boolean): number;
    static shortFromIntA(i: number): number;
    static shortFromIntB(i: number): number;
    static shortsToInt(a: number, b: number): number;
    static toBool(b: boolean[], d: number): void;
    static toInt(b: boolean[]): number;
    static toInt(b: number[], off: number): number;
    static toLong(b: number[], off: number): number;
    static toUShort(b: number[], off: number): number;
    static toUUID(b: number[], off: number): UUID;
    static toUUIDList(b: number[]): UUID[];
  }


  class MathUtils {
    static readonly RAND: Random;
    static readonly NORMALS_X: number[];
    static readonly NORMALS_Y: number[];
    static readonly NORMALS_Z: number[];
    static readonly ROTATION_X: number[];
    static readonly ROTATION_Y: number[];
    static canParseDouble(string: string): boolean;
    static canParseInt(string: string): boolean;
    static chunk(i: number): number;
    static chunk(d: number): number;
    static clamp(f: number, g: number, h: number): number;
    static dist(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number;
    static dist(x1: number, y1: number, x2: number, y2: number): number;
    static distSq(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number;
    static distSq(x1: number, y1: number, x2: number, y2: number): number;
    static getSpiralPoint(index: number): XZ;
    static getSpiralPoint0(index: number): XZ;
    static lerp(min: number, max: number, value: number): number;
    static lerp(min: number, max: number, value: number): number;
    static lerp(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, value: number): Vec3;
    static lerp(v1: Vec3, v2: Vec3, value: number): Vec3;
    static map(min1: number, max1: number, min2: number, max2: number, value: number): number;
    static mod(i: number, n: number): number;
    static mod(i: number, n: number): number;
    static sq(value: number): number;
    static sqrt(value: number): number;
    static sqrt2sq(x: number, y: number): number;
    static sqrt3sq(x: number, y: number, z: number): number;
  }


  class PixelBuffer {
    constructor(w: number, h: number);
    copy(): PixelBuffer;
    equals(o: any): boolean;
    fill(col: number): void;
    fill(startX: number, startY: number, w: number, h: number, col: number): void;
    static from(img: BufferedImage): PixelBuffer;
    static from(stream: InputStream): PixelBuffer;
    get height(): number;
    get pixels(): number[];
    get width(): number;
    getRGB(x: number, y: number): number;
    getRGB(startX: number, startY: number, w: number, h: number, p: number[]): number[];
    getSubimage(x: number, y: number, w: number, h: number): PixelBuffer;
    hashCode(): number;
    set pixels(p: number[]);
    setRGB(x: number, y: number, col: number): void;
    setRGB(startX: number, startY: number, w: number, h: number, rgbArray: number[]): void;
    setRGB(startX: number, startY: number, buffer: PixelBuffer): void;
    toByteBuffer(alpha: boolean): ByteBuffer;
    toImage(type: number): BufferedImage;
  }


  interface ScreenPosition extends Enum<ScreenPosition> {}
  class ScreenPosition extends Enum<ScreenPosition> {
    static readonly CENTER: ScreenPosition;
    static readonly TOP: ScreenPosition;
    static readonly BOTTOM: ScreenPosition;
    static readonly LEFT: ScreenPosition;
    static readonly RIGHT: ScreenPosition;
    static readonly TOP_LEFT: ScreenPosition;
    static readonly TOP_RIGHT: ScreenPosition;
    static readonly BOTTOM_LEFT: ScreenPosition;
    static readonly BOTTOM_RIGHT: ScreenPosition;
    get offsetX(): number;
    get offsetY(): number;
    get serializedName(): string;
    getX(screenWidth: number, width: number, offset: number): number;
    getY(screenHeight: number, height: number, offset: number): number;
    static valueOf(name: string): ScreenPosition;
    static values(): ScreenPosition[];
  }

}

declare module 'dev.ftb.mods.ftblibrary.nbtedit' {
  import { AbstractThreePanelScreen } from 'dev.ftb.mods.ftblibrary.ui.misc';
  import { NBTPanel, NBTCallback } from 'dev.ftb.mods.ftblibrary.nbtedit.NBTEditorScreen';
  import { Icon } from 'dev.ftb.mods.ftblibrary.icon';
  import { Panel, SimpleButton, Theme } from 'dev.ftb.mods.ftblibrary.ui';
  import { CompoundTag, Tag } from 'net.minecraft.nbt';
  import { Key } from 'dev.ftb.mods.ftblibrary.ui.input';
  import { Supplier } from 'java.util.function';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Enum } from 'java.lang';
  import { NBTResponseHandler } from 'dev.ftb.mods.ftblibrary.nbtedit.NBTEditResponseHandlers';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { List } from 'java.util';

  interface NBTEditorScreen extends AbstractThreePanelScreen<NBTPanel> {}
  class NBTEditorScreen extends AbstractThreePanelScreen<NBTPanel> {
    static readonly NBT_BYTE: Icon;
    static readonly NBT_SHORT: Icon;
    static readonly NBT_INT: Icon;
    static readonly NBT_LONG: Icon;
    static readonly NBT_FLOAT: Icon;
    static readonly NBT_DOUBLE: Icon;
    static readonly NBT_STRING: Icon;
    static readonly NBT_LIST: Icon;
    static readonly NBT_LIST_CLOSED: Icon;
    static readonly NBT_LIST_OPEN: Icon;
    static readonly NBT_MAP: Icon;
    static readonly NBT_MAP_CLOSED: Icon;
    static readonly NBT_MAP_OPEN: Icon;
    static readonly NBT_BYTE_ARRAY: Icon;
    static readonly NBT_BYTE_ARRAY_CLOSED: Icon;
    static readonly NBT_BYTE_ARRAY_OPEN: Icon;
    static readonly NBT_INT_ARRAY: Icon;
    static readonly NBT_INT_ARRAY_CLOSED: Icon;
    static readonly NBT_INT_ARRAY_OPEN: Icon;
    readonly panelTopLeft: Panel;
    readonly panelTopRight: Panel;
    constructor(info: CompoundTag, nbt: CompoundTag, callback: NBTCallback);
    closeGui(): void;
    closeGui(openPrevScreen: boolean): void;
    doesGuiPauseGame(): boolean;
    drawBackground(stack: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    keyPressed(key: Key): boolean;
    newTag(panel: Panel, title: string, icon: Icon, supplier: Supplier<Tag>): SimpleButton;
    onInit(): boolean;
    static openEditor(info: CompoundTag, tag: CompoundTag): void;
  }


  interface NBTEditResponseHandlers extends Enum<NBTEditResponseHandlers> {}
  class NBTEditResponseHandlers extends Enum<NBTEditResponseHandlers> {
    static readonly INSTANCE: NBTEditResponseHandlers;
    handleResponse(name: string, player: ServerPlayer, info: CompoundTag, data: CompoundTag): void;
    static registerBuiltinHandlers(): void;
    registerHandler(name: string, handler: NBTResponseHandler): void;
    static valueOf(name: string): NBTEditResponseHandlers;
    static values(): NBTEditResponseHandlers[];
  }

}

declare module 'dev.ftb.mods.ftblibrary.nbtedit.NBTEditorScreen' {
  import { CompoundTag, Tag, ListTag, ByteArrayTag, IntArrayTag } from 'net.minecraft.nbt';
  import { Panel, Theme, Button } from 'dev.ftb.mods.ftblibrary.ui';
  import { TooltipList } from 'dev.ftb.mods.ftblibrary.util';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Optional, Map } from 'java.util';
  import { PositionedIngredient } from 'dev.ftb.mods.ftblibrary.util.client';
  import { Icon } from 'dev.ftb.mods.ftblibrary.icon';
  import { MouseButton } from 'dev.ftb.mods.ftblibrary.ui.input';
  import { ConfigValue } from 'dev.ftb.mods.ftblibrary.config';

  class NBTCallback {
    handle(var1: boolean, var2: CompoundTag): void;
  }


  interface ButtonNBTMap extends ButtonNBTCollection {}
  class ButtonNBTMap extends ButtonNBTCollection {
    constructor(panel: Panel, parent: ButtonNBTCollection, key: string, map: CompoundTag);
    addMouseOverText(list: TooltipList): void;
    canCreateNew(id: number): boolean;
    draw(pose: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    get ingredientUnderMouse(): Optional<PositionedIngredient>;
    getTag(key: string): Tag;
    setTag(key: string, base: Tag): void;
    toNBT(): CompoundTag;
    updateChildren(first: boolean): void;
    updateTitle(): void;
  }


  interface ButtonNBTCollection extends ButtonNBT {}
  class ButtonNBTCollection extends ButtonNBT {
    readonly children: Map;
    readonly iconOpen: Icon;
    readonly iconClosed: Icon;
    collapsed: boolean;
    constructor(panel: Panel, parent: ButtonNBTCollection, key: string, open: Icon, closed: Icon);
    addChildren(): void;
    getTag(var1: string): Tag;
    mouseDoubleClicked(button: MouseButton): boolean;
    onClicked(button: MouseButton): void;
    setCollapsed(c: boolean): void;
    setCollapsedTree(c: boolean): void;
    setTag(var1: string, var2: Tag): void;
  }


  interface ButtonNBT extends Button {}
  class ButtonNBT extends Button {
    constructor(panel: Panel, parent: ButtonNBTCollection, key: string);
    addChildren(): void;
    addMouseOverText(list: TooltipList): void;
    canCreateNew(id: number): boolean;
    draw(pose: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    isSelected(): boolean;
    toNBT(): CompoundTag;
    updateChildren(first: boolean): void;
    updateTitle(): void;
  }


  interface ButtonNBTList extends ButtonNBTCollection {}
  class ButtonNBTList extends ButtonNBTCollection {
    constructor(panel: Panel, p: ButtonNBTCollection, key: string, l: ListTag);
    canCreateNew(id: number): boolean;
    getTag(key: string): Tag;
    setTag(key: string, base: Tag): void;
    toNBT(): CompoundTag;
    updateChildren(first: boolean): void;
    updateTitle(): void;
  }


  interface ButtonNBTByteArray extends ButtonNBTCollection {}
  class ButtonNBTByteArray extends ButtonNBTCollection {
    constructor(panel: Panel, p: ButtonNBTCollection, key: string, l: ByteArrayTag);
    canCreateNew(id: number): boolean;
    getTag(key: string): Tag;
    setTag(key: string, base: Tag): void;
    toNBT(): CompoundTag;
    updateChildren(first: boolean): void;
  }


  interface ButtonNBTIntArray extends ButtonNBTCollection {}
  class ButtonNBTIntArray extends ButtonNBTCollection {
    constructor(panel: Panel, parent: ButtonNBTCollection, key: string, l: IntArrayTag);
    canCreateNew(id: number): boolean;
    getTag(key: string): Tag;
    setTag(key: string, base: Tag): void;
    toNBT(): CompoundTag;
    updateChildren(first: boolean): void;
  }


  interface ButtonBasicTag extends ButtonNBT {}
  class ButtonBasicTag extends ButtonNBT {
    constructor(panel: Panel, parent: ButtonNBTCollection, key: string, nbt: Tag);
    edit(): void;
    mouseDoubleClicked(button: MouseButton): boolean;
    onCallback(value: ConfigValue<any>, accepted: boolean): void;
    onClicked(button: MouseButton): void;
    toNBT(): CompoundTag;
    updateTitle(): void;
  }

}

declare module 'dev.ftb.mods.ftblibrary.nbtedit.NBTEditResponseHandlers' {
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { CompoundTag } from 'net.minecraft.nbt';

  class NBTResponseHandler {
    static readonly NONE: NBTResponseHandler;
    handleResponse(var1: ServerPlayer, var2: CompoundTag, var3: CompoundTag): void;
  }

}

declare module 'dev.ftb.mods.ftblibrary.neoforge' {
  class FTBLibraryNeoForge {
    constructor();
  }

}

declare module 'dev.ftb.mods.ftblibrary.net.EditConfigChoicePacket' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ConfigType extends Enum<ConfigType> {}
  class ConfigType extends Enum<ConfigType> {
    static readonly CLIENT: ConfigType;
    static readonly SERVER: ConfigType;
    static readonly CHOOSE: ConfigType;
    static valueOf(name: string): ConfigType;
    static values(): ConfigType[];
  }

}

declare module 'dev.ftb.mods.ftblibrary.net' {
  class FTBLibraryNet {
    static register(): void;
  }

}

declare module 'dev.ftb.mods.ftblibrary.net.SyncGameStagesMessage' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Operation extends Enum<Operation> {}
  class Operation extends Enum<Operation> {
    static readonly ADD: Operation;
    static readonly REMOVE: Operation;
    static readonly REPLACE: Operation;
    static valueOf(name: string): Operation;
    static values(): Operation[];
  }

}

declare module 'dev.ftb.mods.ftblibrary.sidebar' {
  import { SidebarButton, ButtonOverlayRender } from 'dev.ftb.mods.ftblibrary.api.sidebar';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List, Collection, Optional } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { BooleanSupplier, Supplier } from 'java.util.function';
  import { SimpleJsonResourceReloadListener } from 'net.minecraft.server.packs.resources';
  import { AbstractButton } from 'net.minecraft.client.gui.components';
  import { Rect2i } from 'net.minecraft.client.renderer';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Color4I } from 'dev.ftb.mods.ftblibrary.icon';
  import { NarrationElementOutput } from 'net.minecraft.client.gui.narration';

  interface RegisteredSidebarButton extends SidebarButton {}
  class RegisteredSidebarButton extends SidebarButton {
    constructor(id: ResourceLocation, data: SidebarButtonData);
    addOverlayRender(renderer: ButtonOverlayRender): void;
    addVisibilityCondition(condition: BooleanSupplier): void;
    canSee(): boolean;
    clickButton(shift: boolean): void;
    get data(): SidebarButtonData;
    get extraRenderers(): ButtonOverlayRender[];
    get id(): ResourceLocation;
    get langKey(): string;
    getTooltip(shift: boolean): Component[];
    setForceHidden(forceHidden: boolean): void;
    setTooltipOverride(tooltipOverride: Supplier<Component[]>): void;
  }


  interface SidebarButtonManager extends SimpleJsonResourceReloadListener {}
  class SidebarButtonManager extends SimpleJsonResourceReloadListener {
    static readonly INSTANCE: SidebarButtonManager;
    constructor();
    get buttonList(): SidebarGuiButton[];
    get buttons(): Collection<RegisteredSidebarButton>;
    getButton(id: ResourceLocation): Optional<RegisteredSidebarButton>;
    getDisabledButtonList(all: boolean): SidebarGuiButton[];
    getEnabledButtonList(all: boolean): SidebarGuiButton[];
    saveConfigFromButtonList(): void;
  }


  interface SidebarGroupGuiButton extends AbstractButton {}
  class SidebarGroupGuiButton extends AbstractButton {
    static lastDrawnArea: Rect2i;
    constructor();
    static drawGrid(graphics: GuiGraphics, x: number, y: number, width: number, height: number, spacing: number, backgroundColor: Color4I, gridColor: Color4I): void;
    onPress(): void;
    onRelease(d: number, e: number): void;
    renderWidget(graphics: GuiGraphics, mx: number, my: number, partialTicks: number): void;
    updateWidgetNarration(narrationElementOutput: NarrationElementOutput): void;
  }


  class SidebarGuiButton {
    x: number;
    y: number;
    constructor(girdLocation: GridLocation, enabled: boolean, sidebarButton: RegisteredSidebarButton);
    get gridLocation(): GridLocation;
    get sidebarButton(): RegisteredSidebarButton;
    isEnabled(): boolean;
    set gridLocation(gridLocation: GridLocation);
    setEnabled(enabled: boolean): void;
    setGridLocation(x: number, y: number): void;
    toString(): string;
  }

}

declare module 'dev.ftb.mods.ftblibrary.snbt.config' {
  import { Comparable, Boolean, Double, Integer, Long } from 'java.lang';
  import { BooleanSupplier, Supplier } from 'java.util.function';
  import { SNBTCompoundTag } from 'dev.ftb.mods.ftblibrary.snbt';
  import { ConfigGroup, NameMap } from 'dev.ftb.mods.ftblibrary.config';
  import { Path } from 'java.nio.file';
  import { LevelResource } from 'net.minecraft.world.level.storage';
  import { List, Map } from 'java.util';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { SideButtonInfo } from 'dev.ftb.mods.ftblibrary.snbt.config.StringSidebarMapValue';
  import { Pattern } from 'java.util.regex';

  interface BaseValue<T = any> extends Comparable<BaseValue> {}
  class BaseValue<T = any> extends Comparable<BaseValue> {
    readonly parent: SNBTConfig;
    readonly key: string;
    comment<E extends BaseValue<T>>(...s: string[]): E;
    compareTo(o: BaseValue<T>): number;
    createClientConfig(group: ConfigGroup): void;
    enabled<E extends BaseValue<T>>(e: BooleanSupplier): E;
    excluded<E extends BaseValue<T>>(): E;
    get (): T;
    get key(): string;
    read(var1: SNBTCompoundTag): void;
    set (v: T);
    toString(): string;
    withDisplayOrder(order: number): BaseValue<T>;
    write(var1: SNBTCompoundTag): void;
  }


  interface BooleanValue extends BaseValue<boolean> {}
  class BooleanValue extends BaseValue<boolean> {
    createClientConfig(group: ConfigGroup): void;
    read(tag: SNBTCompoundTag): void;
    toggle(): void;
    write(tag: SNBTCompoundTag): void;
  }


  class ConfigUtil {
    static readonly ROOT_DIR: Path;
    static readonly DEFAULT_CONFIG_DIR: Path;
    static readonly CONFIG_DIR: Path;
    static readonly LOCAL_DIR: Path;
    static readonly SERVER_CONFIG_DIR: LevelResource;
    static loadDefaulted(config: SNBTConfig, configDir: Path, namespace: string): void;
    static loadDefaulted(config: SNBTConfig, configDir: Path, namespace: string, filename: string): void;
    static makeConfigEditGroup(config: SNBTConfig, groupName: string, isServerConfig: boolean): ConfigGroup;
  }


  interface DoubleValue extends NumberValue<number> {}
  class DoubleValue extends NumberValue<number> {
    createClientConfig(group: ConfigGroup): void;
    range(max: number): NumberValue<number>;
    read(tag: SNBTCompoundTag): void;
    set(v: number): void;
    write(tag: SNBTCompoundTag): void;
  }


  interface EnumValue<T = any> extends BaseValue<T> {}
  class EnumValue<T = any> extends BaseValue<T> {
    createClientConfig(group: ConfigGroup): void;
    read(tag: SNBTCompoundTag): void;
    set(v: T): void;
    write(tag: SNBTCompoundTag): void;
  }


  interface IntArrayValue extends BaseValue<number[]> {}
  class IntArrayValue extends BaseValue<number[]> {
    createClientConfig(group: ConfigGroup): void;
    read(tag: SNBTCompoundTag): void;
    write(tag: SNBTCompoundTag): void;
  }


  interface IntValue extends NumberValue<number> {}
  class IntValue extends NumberValue<number> {
    createClientConfig(group: ConfigGroup): void;
    range(max: number): NumberValue<number>;
    read(tag: SNBTCompoundTag): void;
    set(v: number): void;
    write(tag: SNBTCompoundTag): void;
  }


  interface LongValue extends NumberValue<Long> {}
  class LongValue extends NumberValue<Long> {
    createClientConfig(group: ConfigGroup): void;
    range(max: number): NumberValue<Long>;
    read(tag: SNBTCompoundTag): void;
    set(v: Long): void;
    write(tag: SNBTCompoundTag): void;
  }


  interface NumberValue<T extends Number = any> extends BaseValue<T> {}
  class NumberValue<T extends Number = any> extends BaseValue<T> {
    fader<E extends BaseValue<T>>(): E;
    range<E extends BaseValue<T>>(min: T, max: T): E;
    write(tag: SNBTCompoundTag): void;
  }


  interface SNBTConfig extends BaseValue<List> {}
  class SNBTConfig extends BaseValue<List> {
    add<T extends BaseValue<any>>(value: T): T;
    addBoolean(key: string, def: boolean): BooleanValue;
    addDouble(key: string, def: number): DoubleValue;
    addDouble(key: string, def: number, min: number, max: number): DoubleValue;
    addEnum<T>(key: string, nameMap: NameMap<T>): EnumValue<T>;
    addEnum<T>(key: string, nameMap: NameMap<T>, def: T): EnumValue<T>;
    addGroup(key: string): SNBTConfig;
    addGroup(key: string, displayOrder: number): SNBTConfig;
    addInt(key: string, def: number): IntValue;
    addInt(key: string, def: number, min: number, max: number): IntValue;
    addIntArray(key: string, def: number[]): IntArrayValue;
    addLong(key: string, def: number): LongValue;
    addLong(key: string, def: number, min: number, max: number): LongValue;
    addString(key: string, def: string): StringValue;
    addStringList(key: string, def: string[]): StringListValue;
    static create(name: string): SNBTConfig;
    createClientConfig(group: ConfigGroup): void;
    load(path: Path): void;
    load(path: Path, defaultPath: Path, comment: Supplier<string[]>): void;
    read(tag: SNBTCompoundTag): void;
    read(buf: FriendlyByteBuf): void;
    save(path: Path): void;
    saveNow(path: Path): void;
    write(tag: SNBTCompoundTag): void;
    write(buf: FriendlyByteBuf): void;
  }


  interface StringListValue extends BaseValue<List> {}
  class StringListValue extends BaseValue<List> {
    createClientConfig(group: ConfigGroup): void;
    read(tag: SNBTCompoundTag): void;
    set(v: string[]): void;
    write(tag: SNBTCompoundTag): void;
  }


  interface StringMapValue extends BaseValue<Map> {}
  class StringMapValue extends BaseValue<Map> {
    constructor(c: SNBTConfig, n: string, def: Map<string, string>);
    read(tag: SNBTCompoundTag): void;
    write(tag: SNBTCompoundTag): void;
  }


  interface StringSidebarMapValue extends BaseValue<Map> {}
  class StringSidebarMapValue extends BaseValue<Map> {
    constructor(c: SNBTConfig, n: string, def: Map<string, SideButtonInfo>);
    read(tag: SNBTCompoundTag): void;
    write(tag: SNBTCompoundTag): void;
  }


  interface StringValue extends BaseValue<string> {}
  class StringValue extends BaseValue<string> {
    createClientConfig(group: ConfigGroup): void;
    pattern(p: Pattern): StringValue;
    read(tag: SNBTCompoundTag): void;
    set(v: string): void;
    write(tag: SNBTCompoundTag): void;
  }

}

declare module 'dev.ftb.mods.ftblibrary.snbt' {
  import { List } from 'java.util';
  import { Path } from 'java.nio.file';
  import { CompoundTag, Tag, ListTag, ByteArrayTag, IntArrayTag, LongArrayTag, TagType, TagVisitor, StreamTagVisitor } from 'net.minecraft.nbt';
  import { StringBuilder, Number, Class, IllegalStateException } from 'java.lang';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { BooleanSupplier } from 'java.util.function';
  import { DataOutput } from 'java.io';
  import { ValueResult } from 'StreamTagVisitor';

  class SNBT {
    static read(path: Path): SNBTCompoundTag;
    static readLines(lines: string[]): SNBTCompoundTag;
    static setShouldSortKeysOnWrite(shouldSortKeysOnWrite: boolean): boolean;
    static shouldSortKeysOnWrite(): boolean;
    static tryRead(path: Path): SNBTCompoundTag;
    static tryWrite(path: Path, tag: CompoundTag): void;
    static write(path: Path, nbt: CompoundTag): boolean;
    static writeLines(nbt: CompoundTag): string[];
  }


  class SNBTBuilder {
    readonly lines: List;
    readonly line: StringBuilder;
    indent: string;
    singleLine: number;
    pop(): void;
    print(string: any): void;
    println(): void;
    push(): void;
  }


  interface SNBTCompoundTag extends CompoundTag {}
  class SNBTCompoundTag extends CompoundTag {
    static readonly STREAM_CODEC: StreamCodec;
    constructor();
    comment(key: string, ...comment: string[]): void;
    comment(key: string, comment: string): void;
    getComment(key: string): string;
    getCompound(string: string): SNBTCompoundTag;
    getList<T extends Tag>(key: string, type: Class<T>): T[];
    getNullableList(key: string, type: number): ListTag;
    isBoolean(key: string): boolean;
    merge(other: CompoundTag, overwrite: boolean): CompoundTag;
    static of(tag: Tag): SNBTCompoundTag;
    putBoolean(key: string, value: boolean): void;
    putNull(key: string): void;
    putNumber(key: string, number: Number): void;
    singleLine(): void;
    singleLine(key: string): void;
  }


  interface SNBTEOFException extends SNBTSyntaxException {}
  class SNBTEOFException extends SNBTSyntaxException {
    constructor();
  }


  class SNBTNet {
    static readonly EMPTY_BYTE_ARRAY: ByteArrayTag;
    static readonly EMPTY_INT_ARRAY: IntArrayTag;
    static readonly EMPTY_LONG_ARRAY: LongArrayTag;
    static read(type: number, buf: FriendlyByteBuf): Tag;
    static readByteArray(buf: FriendlyByteBuf): ByteArrayTag;
    static readCompound(buf: FriendlyByteBuf): SNBTCompoundTag;
    static readIntArray(buf: FriendlyByteBuf): IntArrayTag;
    static readList(buf: FriendlyByteBuf): ListTag;
    static readLongArray(buf: FriendlyByteBuf): LongArrayTag;
    static write(buf: FriendlyByteBuf, tag: Tag): void;
    static writeByteArray(buf: FriendlyByteBuf, tag: ByteArrayTag): void;
    static writeCompound(buf: FriendlyByteBuf, tag: SNBTCompoundTag): void;
    static writeIntArray(buf: FriendlyByteBuf, tag: IntArrayTag): void;
    static writeList(buf: FriendlyByteBuf, tag: ListTag): void;
    static writeLongArray(buf: FriendlyByteBuf, tag: LongArrayTag): void;
  }


  class SNBTParser {
  }


  interface SNBTSyntaxException extends IllegalStateException {}
  class SNBTSyntaxException extends IllegalStateException {
    constructor(s: string);
  }


  class SNBTTagProperties {
    static readonly DEFAULT: SNBTTagProperties;
    static readonly TYPE_FALSE: number;
    static readonly TYPE_TRUE: number;
  }


  class SNBTUtils {
    static readonly ALWAYS_TRUE: BooleanSupplier;
    static readonly ESCAPE_CHARS: string[];
    static readonly REVERSE_ESCAPE_CHARS: string[];
    static getNumberType(s: string): number;
    static handleEscape(string: string): string;
    static isSimpleCharacter(c: string): boolean;
    static isSimpleString(string: string): boolean;
    static quoteAndEscape(string: string): string;
  }


  interface SpecialTag extends Tag {}
  class SpecialTag extends Tag {
    static readonly TRUE: SpecialTag;
    static readonly FALSE: SpecialTag;
    static readonly NAN_D: SpecialTag;
    static readonly POS_INFINITY_D: SpecialTag;
    static readonly NEG_INFINITY_D: SpecialTag;
    static readonly NAN_F: SpecialTag;
    static readonly POS_INFINITY_F: SpecialTag;
    static readonly NEG_INFINITY_F: SpecialTag;
    readonly wrappedTag: Tag;
    constructor(t: Tag);
    accept(tagVisitor: TagVisitor): void;
    accept(streamTagVisitor: StreamTagVisitor): ValueResult;
    copy(): Tag;
    get asString(): string;
    get id(): number;
    get type(): TagType<any>;
    sizeInBytes(): number;
    toString(): string;
    static unwrap(t: Tag): Tag;
    write(dataOutput: DataOutput): void;
  }

}

declare module 'dev.ftb.mods.ftblibrary.ui' {
  import { AbstractContainerMenu, MenuType } from 'net.minecraft.world.inventory';
  import { Inventory, Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Key, MouseButton, KeyModifiers } from 'dev.ftb.mods.ftblibrary.ui.input';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { Optional, List } from 'java.util';
  import { TooltipList, BooleanConsumer } from 'dev.ftb.mods.ftblibrary.util';
  import { Window } from 'com.mojang.blaze3d.platform';
  import { Component, ClickEvent, Style, FormattedText } from 'net.minecraft.network.chat';
  import { Runnable, Comparable, Enum, IllegalArgumentException, Iterable } from 'java.lang';
  import { Minecraft } from 'net.minecraft.client';
  import { Icon, Color4I, ImageIcon } from 'dev.ftb.mods.ftblibrary.icon';
  import { PositionedIngredient } from 'dev.ftb.mods.ftblibrary.util.client';
  import { CheckBoxEntry } from 'dev.ftb.mods.ftblibrary.ui.CheckBoxList';
  import { ColorConfig, ConfigCallback } from 'dev.ftb.mods.ftblibrary.config';
  import { Consumer, Predicate } from 'java.util.function';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { BufferBuilder } from 'com.mojang.blaze3d.vertex';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { Whence } from 'net.minecraft.client.gui.components';
  import { StringExtents } from 'dev.ftb.mods.ftblibrary.ui.MultilineTextBox';
  import { Plane } from 'dev.ftb.mods.ftblibrary.ui.ScrollBar';
  import { Callback } from 'dev.ftb.mods.ftblibrary.ui.SimpleButton';
  import { FormattedCharSequence } from 'net.minecraft.util';
  import { ToggleableCallback } from 'dev.ftb.mods.ftblibrary.ui.ToggleableButton';
  import { DrawLayer } from 'dev.ftb.mods.ftblibrary.ui.Widget';
  import { Padding } from 'dev.ftb.mods.ftblibrary.ui.WidgetLayout';

  interface BaseContainer extends AbstractContainerMenu {}
  class BaseContainer extends AbstractContainerMenu {
    constructor(type: MenuType<any>, id: number, playerInventory: Inventory);
    addPlayerSlots(playerInventory: Inventory, posX: number, posY: number, ignoreCurrent: boolean): void;
    addPlayerSlots(playerInventory: Inventory, posX: number, posY: number): void;
    get nonPlayerSlots(): number;
    mayPickup(ep: Player): boolean;
    quickMoveStack(player: Player, index: number): ItemStack;
    stillValid(player: Player): boolean;
  }


  interface BaseMenuScreen<T extends AbstractContainerMenu = any> extends BaseScreen {}
  class BaseMenuScreen<T extends AbstractContainerMenu = any> extends BaseScreen {
    constructor(menu: T, playerInventory: Inventory);
  }


  interface BaseScreen extends Panel {}
  class BaseScreen extends Panel {
    constructor(previousScreen: Screen);

    constructor();
    addMouseOverText(list: TooltipList): void;
    alignWidgets(): void;
    anyModalPanelOpen(): boolean;
    charTyped(c: string, modifiers: KeyModifiers): boolean;
    closeContextMenu(): void;
    closeGui(openPrevScreen: boolean): void;
    closeGui(): void;
    closeModalPanel(panel: ModalPanel): void;
    doesGuiPauseGame(): boolean;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawDefaultBackground(graphics: GuiGraphics): boolean;
    drawForeground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    get contextMenu(): Optional<ModalPanel>;
    get gui(): BaseScreen;
    get maxZLevel(): number;
    get minecraft(): Minecraft;
    get mouseX(): number;
    get mouseY(): number;
    get partialTicks(): number;
    get prevScreen(): Screen;
    get screen(): Window;
    get scrollX(): number;
    get scrollY(): number;
    get theme(): Theme;
    get window(): Window;
    get x(): number;
    get y(): number;
    handleClick(scheme: string, path: string): boolean;
    handleClick(click: string): boolean;
    initGui(): void;
    isMouseOver(x: number, y: number, w: number, h: number): boolean;
    isMouseOver(widget: Widget): boolean;
    isMouseOver(): boolean;
    keyPressed(key: Key): boolean;
    keyReleased(key: Key): void;
    mouseDoubleClicked(button: MouseButton): boolean;
    mouseDragged(button: number, dragX: number, dragY: number): boolean;
    mousePressed(button: MouseButton): boolean;
    mouseReleased(button: MouseButton): void;
    mouseScrolled(scroll: number): boolean;
    onBack(): void;
    onClosed(): void;
    onClosedByKey(key: Key): boolean;
    onInit(): boolean;
    onPostInit(): void;
    openContextMenu(newContextMenu: ContextMenu): void;
    openContextMenu(menuItems: ContextMenuItem[]): ContextMenu;
    openDropdownMenu(dropDownMenu: DropDownMenu): void;
    openDropdownMenu(menuItems: ContextMenuItem[]): DropDownMenu;
    openGui(): void;
    openPopupMenu(popupMenu: PopupMenu): void;
    openYesNo(title: Component, desc: Component, callback: Runnable): void;
    openYesNoFull(title: Component, desc: Component, callback: BooleanConsumer): void;
    popModalPanel(): ModalPanel;
    pushModalPanel(modalPanel: ModalPanel): void;
    refreshWidgets(): void;
    set scrollX(scroll: number);
    set scrollY(scroll: number);
    setFocusedWidget(widget: Widget): void;
    setPreviousScreen(prevScreen: Screen): void;
    setRenderBlur(renderBlur: boolean): void;
    shouldAddMouseOverText(): boolean;
    shouldCloseOnEsc(): boolean;
    shouldRenderBlur(): boolean;
    tick(): void;
    updateGui(mx: number, my: number, pt: number): void;
    updateMouseOver(mouseX: number, mouseY: number): void;
    usePreviousScreenOnBack(): boolean;
  }


  interface BlankPanel extends Panel {}
  class BlankPanel extends Panel {
    constructor(panel: Panel);

    constructor(panel: Panel, _id: string);
    addWidgets(): void;
    alignWidgets(): void;
    clearWidgets(): void;
    toString(): string;
  }


  interface Button extends Widget {}
  class Button extends Widget {
    constructor(panel: Panel, t: Component, i: Icon);

    constructor(panel: Panel);
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawIcon(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    get cursor(): CursorType;
    get ingredientUnderMouse(): Optional<PositionedIngredient>;
    get title(): Component;
    mousePressed(button: MouseButton): boolean;
    onClicked(var1: MouseButton): void;
    set title(s: Component);
    setForceButtonSize(forceButtonSize: boolean): Button;
    setIcon(i: Icon): Button;
  }


  interface CheckBoxList extends Button {}
  class CheckBoxList extends Button {
    constructor(gui: BaseScreen, radioButtonBehaviour: boolean);
    addBox(checkBox: CheckBoxEntry): void;
    addBox(name: string): CheckBoxEntry;
    addMouseOverText(list: TooltipList): void;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawCheckboxBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    get valueCount(): number;
    getCheckboxIcon(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number, index: number, value: number): void;
    onClicked(button: MouseButton): void;
  }


  interface ColorSelectorPanel extends ModalPanel {}
  class ColorSelectorPanel extends ModalPanel {
    constructor(panel: Panel, config: ColorConfig, callback: ConfigCallback);
    addWidgets(): void;
    alignWidgets(): void;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    keyPressed(key: Key): boolean;
    static popupAtMouse(gui: BaseScreen, config: ColorConfig, callback: ConfigCallback): ColorSelectorPanel;
    setAllowAlphaEdit(allowAlphaEdit: boolean): void;
  }


  interface ColorWidget extends Widget {}
  class ColorWidget extends Widget {
    readonly color: Color4I;
    mouseOverColor: Color4I;
    constructor(panel: Panel, c: Color4I, m: Color4I);
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
  }


  interface ContextButton extends Button {}
  class ContextButton extends Button {
    readonly item: ContextMenuItem;
    constructor(panel: Panel, item: ContextMenuItem, hasIcons: boolean);
    addMouseOverText(list: TooltipList): void;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawIcon(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    get widgetType(): WidgetType;
    onClicked(button: MouseButton): void;
  }


  interface ContextMenu extends PopupMenu, ModalPanel {}
  class ContextMenu extends PopupMenu {
    constructor(panel: Panel, i: ContextMenuItem[]);
    addWidgets(): void;
    alignWidgets(): void;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    get modalPanel(): ModalPanel;
    hasIcons(): boolean;
    mousePressed(button: MouseButton): boolean;
    setDrawVerticalSeparators(drawVerticalSeparators: boolean): void;
    setMaxRows(maxRows: number): void;
  }


  interface ContextMenuItem extends Comparable<ContextMenuItem> {}
  class ContextMenuItem extends Comparable<ContextMenuItem> {
    static readonly SEPARATOR: ContextMenuItem;
    constructor(title: Component, icon: Icon, callback: Consumer<Button>);
    addMouseOverText(list: TooltipList): void;
    compareTo(o: ContextMenuItem): number;
    createWidget(panel: ContextMenu): Widget;
    drawIcon(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    get icon(): Icon;
    get title(): Component;
    get yesNoText(): Component;
    isClickable(): boolean;
    isEnabled(): boolean;
    onClicked(button: Button, panel: Panel, mouseButton: MouseButton): void;
    static separator(): ContextMenuItem;
    set yesNoText(s: Component);
    setCloseMenu(v: boolean): ContextMenuItem;
    setEnabled(enabled: boolean): ContextMenuItem;
    static subMenu(title: Component, icon: Icon, subItems: ContextMenuItem[]): ContextMenuItem;
    static title(title: Component): ContextMenuItem;
  }


  interface CursorType extends Enum<CursorType> {}
  class CursorType extends Enum<CursorType> {
    static readonly ARROW: CursorType;
    static readonly IBEAM: CursorType;
    static readonly CROSSHAIR: CursorType;
    static readonly HAND: CursorType;
    static readonly HRESIZE: CursorType;
    static readonly VRESIZE: CursorType;
    static set(type: CursorType): void;
    static valueOf(name: string): CursorType;
    static values(): CursorType[];
  }


  class GuiHelper {
    static readonly BLANK_GUI: BaseScreen;
    static addRectToBuffer(graphics: GuiGraphics, buffer: BufferBuilder, x: number, y: number, w: number, h: number, col: Color4I): void;
    static addRectToBufferWithUV(graphics: GuiGraphics, buffer: BufferBuilder, x: number, y: number, w: number, h: number, col: Color4I, u0: number, v0: number, u1: number, v1: number): void;
    static addStackTooltip(stack: ItemStack, list: Component[]): void;
    static addStackTooltip(stack: ItemStack, list: Component[], prefix: Component): void;
    static clickEventToString(event: ClickEvent): string;
    static drawBorderedPanel(graphics: GuiGraphics, x: number, y: number, w: number, h: number, color: Color4I, outset: boolean): void;
    static drawGradientRect(graphics: GuiGraphics, x: number, y: number, w: number, h: number, col1: Color4I, col2: Color4I): void;
    static drawHollowRect(graphics: GuiGraphics, x: number, y: number, w: number, h: number, col: Color4I, roundEdges: boolean): void;
    static drawItem(graphics: GuiGraphics, stack: ItemStack, hash: number, renderOverlay: boolean, text: string): void;
    static drawRectWithShade(graphics: GuiGraphics, x: number, y: number, w: number, h: number, col: Color4I, intensity: number): void;
    static drawTexturedRect(graphics: GuiGraphics, x: number, y: number, w: number, h: number, col: Color4I, u0: number, v0: number, u1: number, v1: number): void;
    static playSound(event: SoundEvent, pitch: number): void;
    static popScissor(screen: Window): void;
    static pushScissor(screen: Window, x: number, y: number, w: number, h: number): void;
    static setupDrawing(): void;
  }


  class IFocusableWidget {
    isFocused(): boolean;
    setFocused(var1: boolean): void;
  }


  interface IntTextBox extends TextBox {}
  class IntTextBox extends TextBox {
    constructor(panel: Panel);
    ensureValue(): void;
    get intValue(): number;
    mouseScrolled(scroll: number): boolean;
    onTextChanged(): void;
    setAmount(amount: number): void;
    setMax(max: number): void;
    setMin(min: number): void;
    setMinMax(min: number, max: number): void;
  }


  interface IOpenableScreen extends Runnable {}
  class IOpenableScreen extends Runnable {
    closeContextMenu(): void;
    closeGui(): void;
    closeGui(openPrevScreen: boolean): void;
    openAfter(runnable: Runnable): Runnable;
    openGui(): void;
    openGuiLater(): void;
    run(): void;
  }


  interface IScreenWrapper extends IOpenableScreen {}
  class IScreenWrapper extends IOpenableScreen {
    closeGui(openPrevScreen: boolean): void;
    closeGui(): void;
    get gui(): BaseScreen;
    openGui(): void;
  }


  interface MenuScreenWrapper<T extends AbstractContainerMenu = any> extends IScreenWrapper, AbstractContainerScreen<T> {}
  class MenuScreenWrapper<T extends AbstractContainerMenu = any> extends IScreenWrapper {
    constructor(g: BaseScreen, menu: T, playerInventory: Inventory, title: Component);
    charTyped(keyChar: string, modifiers: number): boolean;
    containerTick(): void;
    disableSlotDrawing(): MenuScreenWrapper<T>;
    get gui(): BaseScreen;
    init(): void;
    isPauseScreen(): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    keyReleased(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(x: number, y: number, button: number): boolean;
    mouseReleased(x: number, y: number, button: number): boolean;
    mouseScrolled(x: number, y: number, dirX: number, dirY: number): boolean;
    removed(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    renderBackground(graphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface MismatchingParentPanelException extends IllegalArgumentException {}
  class MismatchingParentPanelException extends IllegalArgumentException {
    readonly panel: Panel;
    readonly widget: Widget;
    constructor(p: Panel, w: Widget);
  }


  interface ModalPanel extends Panel {}
  class ModalPanel extends Panel {
    constructor(panel: Panel);
    checkMouseOver(mouseX: number, mouseY: number): boolean;
    get extraZlevel(): number;
    set extraZlevel(extraZlevel: number);
  }


  interface MultilineTextBox extends IFocusableWidget, Widget {}
  class MultilineTextBox extends IFocusableWidget {
    constructor(panel: Panel);
    charTyped(c: string, modifiers: KeyModifiers): boolean;
    cursorPos(): number;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    get lineView(): StringExtents;
    get selected(): StringExtents;
    get selectedText(): string;
    get text(): string;
    getLineView(line: number): StringExtents;
    hasSelection(): boolean;
    insertText(toInsert: string): void;
    isFocused(): boolean;
    keyPressed(key: Key): boolean;
    mouseDoubleClicked(button: MouseButton): boolean;
    mouseDragged(button: number, dragX: number, dragY: number): boolean;
    mousePressed(button: MouseButton): boolean;
    seekCursor(whence: Whence, pos: number): void;
    seekCursorToPoint(x: number, y: number): void;
    selectCurrentLine(): void;
    set text(text: string);
    setFocused(focused: boolean): void;
    setPlaceHolder(placeHolder: Component): void;
    setSelecting(selecting: boolean): void;
    setValueListener(valueListener: Consumer<string>): void;
    setWidth(v: number): void;
    tick(): void;
  }


  interface NordButton extends SimpleTextButton {}
  class NordButton extends SimpleTextButton {
    constructor(panel: Panel, txt: Component, icon: Icon);
    addMouseOverText(list: TooltipList): void;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
  }


  interface NordTheme extends Theme {}
  class NordTheme extends Theme {
    static readonly THEME: Theme;
    drawButton(graphics: GuiGraphics, x: number, y: number, w: number, h: number, type: WidgetType): void;
    drawContextMenuBackground(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    drawGui(graphics: GuiGraphics, x: number, y: number, w: number, h: number, type: WidgetType): void;
    drawPanelBackground(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    drawScrollBar(graphics: GuiGraphics, x: number, y: number, w: number, h: number, type: WidgetType, vertical: boolean): void;
    drawScrollBarBackground(graphics: GuiGraphics, x: number, y: number, w: number, h: number, type: WidgetType): void;
    drawSlot(graphics: GuiGraphics, x: number, y: number, w: number, h: number, type: WidgetType): void;
    drawTextBox(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    drawWidget(graphics: GuiGraphics, x: number, y: number, w: number, h: number, type: WidgetType): void;
    getContentColor(type: WidgetType): Color4I;
  }


  interface Panel extends Widget {}
  class Panel extends Widget {
    constructor(panel: Panel);
    add(widget: Widget): void;
    addAll(list: Iterable<Widget>): void;
    addMouseOverText(list: TooltipList): void;
    addWidgets(): void;
    align(layout: WidgetLayout): number;
    alignWidgets(): void;
    charTyped(c: string, modifiers: KeyModifiers): boolean;
    clearWidgets(): void;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawOffsetBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawWidget(graphics: GuiGraphics, theme: Theme, widget: Widget, x: number, y: number, w: number, h: number): void;
    get contentHeight(): number;
    get contentWidth(): number;
    get cursor(): CursorType;
    get ingredientUnderMouse(): Optional<PositionedIngredient>;
    get onlyInteractWithWidgetsInside(): boolean;
    get onlyRenderWidgetsInside(): boolean;
    get scrollStep(): number;
    get scrollX(): number;
    get scrollY(): number;
    get widgets(): Widget[];
    get x(): number;
    get y(): number;
    getWidget(index: number): Widget;
    isDefaultScrollVertical(): boolean;
    isMouseOverAnyWidget(): boolean;
    isOffset(): boolean;
    keyPressed(key: Key): boolean;
    keyReleased(key: Key): void;
    mouseDoubleClicked(button: MouseButton): boolean;
    mouseDragged(button: number, dragX: number, dragY: number): boolean;
    mousePressed(button: MouseButton): boolean;
    mouseReleased(button: MouseButton): void;
    mouseScrolled(scroll: number): boolean;
    movePanelScroll(dx: number, dy: number): boolean;
    onClosed(): void;
    refreshWidgets(): void;
    scrollPanel(scroll: number): boolean;
    set onlyInteractWithWidgetsInside(value: boolean);
    set onlyRenderWidgetsInside(value: boolean);
    set scrollStep(s: number);
    set scrollX(scroll: number);
    set scrollY(scroll: number);
    setOffset(flag: boolean): void;
    tick(): void;
    updateMouseOver(mouseX: number, mouseY: number): void;
  }


  interface PanelScrollBar extends ScrollBar {}
  class PanelScrollBar extends ScrollBar {
    constructor(parent: Panel, plane: Plane, p: Panel);

    constructor(parent: Panel, panel: Panel);
    canMouseScroll(): boolean;
    get maxValue(): number;
    get minValue(): number;
    get panel(): Panel;
    get scrollBarSize(): number;
    get scrollStep(): number;
    isEnabled(): boolean;
    onMoved(): void;
    set maxValue(max: number);
    set minValue(min: number);
    set scrollStep(s: number);
    shouldDraw(): boolean;
  }


  class PopupMenu {
    get modalPanel(): ModalPanel;
  }


  interface ScreenWrapper extends IScreenWrapper, Screen {}
  class ScreenWrapper extends IScreenWrapper {
    constructor(g: BaseScreen);
    charTyped(keyChar: string, modifiers: number): boolean;
    get gui(): BaseScreen;
    init(): void;
    isPauseScreen(): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    keyReleased(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(x: number, y: number, button: number): boolean;
    mouseDragged(x: number, y: number, button: number, dragX: number, dragY: number): boolean;
    mouseReleased(x: number, y: number, button: number): boolean;
    mouseScrolled(x: number, y: number, dirX: number, dirY: number): boolean;
    removed(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    renderBackground(matrixStack: GuiGraphics, x: number, y: number, partialTicks: number): void;
    shouldCloseOnEsc(): boolean;
    tick(): void;
  }


  interface ScrollBar extends Widget {}
  class ScrollBar extends Widget {
    constructor(parent: Panel, p: Plane, ss: number);
    addMouseOverText(list: TooltipList): void;
    canMouseScroll(): boolean;
    canMouseScrollPlane(): boolean;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawScrollBar(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    get maxValue(): number;
    get minValue(): number;
    get plane(): Plane;
    get scrollBarSize(): number;
    get scrollStep(): number;
    get value(): number;
    getMappedValue(max: number): number;
    mousePressed(button: MouseButton): boolean;
    mouseScrolled(scroll: number): boolean;
    onMoved(): void;
    set maxValue(max: number);
    set minValue(min: number);
    set scrollStep(s: number);
    set value(v: number);
    setCanAlwaysScroll(v: boolean): void;
    setCanAlwaysScrollPlane(v: boolean): void;
    showValueOnMouseOver(): boolean;
  }


  interface SimpleButton extends Button {}
  class SimpleButton extends Button {
    constructor(panel: Panel, text: Component, icon: Icon, c: Callback);

    constructor(panel: Panel, text: Component[], icon: Icon, c: Callback);
    addMouseOverText(list: TooltipList): void;
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    onClicked(button: MouseButton): void;
    setConsumer(consumer: Callback): void;
  }


  interface SimpleTextButton extends Button {}
  class SimpleTextButton extends Button {
    constructor(panel: Panel, txt: Component, icon: Icon);
    static accept(panel: Panel, callback: Consumer<MouseButton>, ...tooltip: Component[]): SimpleTextButton;
    addMouseOverText(list: TooltipList): void;
    addMouseOverText(list: TooltipList): void;
    static cancel(panel: Panel, callback: Consumer<MouseButton>, ...tooltip: Component[]): SimpleTextButton;
    static create(panel: Panel, txt: Component, icon: Icon, callback: Consumer<MouseButton>, ...tooltip: Component[]): SimpleTextButton;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    get ingredientUnderMouse(): Optional<PositionedIngredient>;
    hasIcon(): boolean;
    onClicked(button: MouseButton): void;
    renderTitleInCenter(): boolean;
    setTitle(txt: Component): SimpleTextButton;
  }


  interface TextBox extends IFocusableWidget, Widget {}
  class TextBox extends IFocusableWidget {
    charLimit: number;
    textColor: Color4I;
    ghostText: string;
    constructor(panel: Panel);
    allowInput(): boolean;
    charTyped(c: string, modifiers: KeyModifiers): boolean;
    deleteChars(count: number): void;
    deleteCharsToPos(pos: number): void;
    deleteWords(count: number): void;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawTextBox(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    get cursor(): CursorType;
    get cursorPos(): number;
    get formattedText(): string;
    get selectedText(): string;
    get text(): string;
    getWordPosition(count: number): number;
    insertText(string: string): void;
    isFocused(): boolean;
    isTextValid(): boolean;
    isValid(txt: string): boolean;
    keyPressed(key: Key): boolean;
    mousePressed(button: MouseButton): boolean;
    moveCursor(pos: number, extendSelection: boolean): void;
    moveCursorTo(pos: number, extendSelection: boolean): void;
    moveCursorToEnd(extendSelection: boolean): void;
    moveCursorToStart(extendSelection: boolean): void;
    onEnterPressed(): void;
    onTabPressed(): void;
    onTextChanged(): void;
    set cursorPos(pos: number);
    set text(s: string);
    setCursorPosition(pos: number): void;
    setFilter(filter: Predicate<string>): void;
    setFocused(focused: boolean): void;
    setLabel(label: Component): void;
    setLabelColor(color: Color4I): void;
    setMaxLength(maxLength: number): void;
    setSelectionPos(i: number): void;
    setStrictValidity(strictValidity: boolean): void;
    setText(string: string, triggerChange: boolean): void;
    setWidth(v: number): void;
  }


  interface TextField extends Widget {}
  class TextField extends Widget {
    component: Component;
    textFlags: number;
    minWidth: number;
    maxWidth: number;
    textSpacing: number;
    scale: number;
    textColor: Color4I;
    trim: boolean;
    constructor(panel: Panel);
    addFlags(flags: number): TextField;
    addMouseOverText(list: TooltipList): void;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    getComponentStyleAt(theme: Theme, mouseX: number, mouseY: number): Optional<Style>;
    reflow(): TextField;
    resize(theme: Theme): TextField;
    setColor(color: Color4I): TextField;
    setMaxWidth(width: number): TextField;
    setMinWidth(width: number): TextField;
    setScale(s: number): TextField;
    setSpacing(s: number): TextField;
    setText(txt: Component): TextField;
    setText(txt: string): TextField;
    setTrim(): TextField;
    showTooltipForLongText(): TextField;
  }


  class Theme {
    static readonly DEFAULT: Theme;
    static readonly DARK: number;
    static readonly SHADOW: number;
    static readonly CENTERED: number;
    static readonly UNICODE: number;
    static readonly MOUSE_OVER: number;
    static readonly CENTERED_V: number;
    static readonly BACKGROUND_SQUARES: ImageIcon;
    static renderDebugBoxes: boolean;
    drawButton(graphics: GuiGraphics, x: number, y: number, w: number, h: number, type: WidgetType): void;
    drawCheckbox(graphics: GuiGraphics, x: number, y: number, w: number, h: number, type: WidgetType, selected: boolean, radioButton: boolean): void;
    drawCheckboxBackground(graphics: GuiGraphics, x: number, y: number, w: number, h: number, radioButton: boolean): void;
    drawContainerSlot(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    drawContextMenuBackground(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    drawGui(graphics: GuiGraphics, x: number, y: number, w: number, h: number, type: WidgetType): void;
    drawHorizontalTab(graphics: GuiGraphics, x: number, y: number, w: number, h: number, selected: boolean): void;
    drawPanelBackground(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    drawScrollBar(graphics: GuiGraphics, x: number, y: number, w: number, h: number, type: WidgetType, vertical: boolean): void;
    drawScrollBarBackground(graphics: GuiGraphics, x: number, y: number, w: number, h: number, type: WidgetType): void;
    drawSlot(graphics: GuiGraphics, x: number, y: number, w: number, h: number, type: WidgetType): void;
    drawString(graphics: GuiGraphics, text: any, x: number, y: number, color: Color4I, flags: number): number;
    drawString(graphics: GuiGraphics, text: any, x: number, y: number, flags: number): number;
    drawString(graphics: GuiGraphics, text: any, x: number, y: number): number;
    drawTextBox(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    drawWidget(graphics: GuiGraphics, x: number, y: number, w: number, h: number, type: WidgetType): void;
    get font(): Font;
    get fontHeight(): number;
    get invertedContentColor(): Color4I;
    getContentColor(type: WidgetType): Color4I;
    getStringWidth(text: FormattedText): number;
    getStringWidth(text: FormattedCharSequence): number;
    getStringWidth(text: string): number;
    listFormattedStringToWidth(text: FormattedText, width: number): FormattedText[];
    trimStringToWidth(text: string, width: number): string;
    trimStringToWidth(text: FormattedText, width: number): FormattedText;
    trimStringToWidthReverse(text: string, width: number): string;
  }


  interface ThemeManager extends Enum<ThemeManager> {}
  class ThemeManager extends Enum<ThemeManager> {
    static readonly INSTANCE: ThemeManager;
    get activeTheme(): Theme;
    static valueOf(name: string): ThemeManager;
    static values(): ThemeManager[];
  }


  interface ToggleableButton extends SimpleButton {}
  class ToggleableButton extends SimpleButton {
    constructor(panel: Panel, defaultState: boolean, enabled: Icon, disabled: Icon, toggleableCallback: ToggleableCallback);

    constructor(panel: Panel, defaultState: boolean, toggleableCallback: ToggleableCallback);
    get disabledText(): Component;
    get enabledText(): Component;
    set disabledText(disabledText: Component);
    set enabledText(enabledText: Component);
  }


  interface VerticalSpaceWidget extends Widget {}
  class VerticalSpaceWidget extends Widget {
    constructor(p: Panel, h: number);
    isEnabled(): boolean;
    shouldDraw(): boolean;
  }


  interface Widget extends IScreenWrapper, Comparable<Widget> {}
  class Widget extends IScreenWrapper {
    posX: number;
    posY: number;
    width: number;
    height: number;
    constructor(p: Panel);
    acceptGhostIngredient(ingredient: any): void;
    addMouseOverText(list: TooltipList): void;
    charTyped(c: string, modifiers: KeyModifiers): boolean;
    checkMouseOver(mouseX: number, mouseY: number): boolean;
    collidesWith(x: number, y: number, w: number, h: number): boolean;
    compareTo(widget: Widget): number;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    static get clipboardString(): string;
    get cursor(): CursorType;
    get drawLayer(): DrawLayer;
    get gui(): BaseScreen;
    get height(): number;
    get ingredientUnderMouse(): Optional<PositionedIngredient>;
    get mouseX(): number;
    get mouseY(): number;
    get parent(): Panel;
    get partialTicks(): number;
    get posX(): number;
    get posY(): number;
    get screen(): Window;
    get title(): Component;
    get widgetType(): WidgetType;
    get width(): number;
    get window(): Window;
    get x(): number;
    get y(): number;
    handleClick(scheme: string, path: string): boolean;
    handleClick(click: string): boolean;
    static isCtrlKeyDown(): boolean;
    isEnabled(): boolean;
    isGhostIngredientTarget(ingredient: any): boolean;
    static isKeyDown(key: number): boolean;
    static isMouseButtonDown(button: MouseButton): boolean;
    isMouseOver(): boolean;
    static isShiftKeyDown(): boolean;
    keyPressed(key: Key): boolean;
    keyReleased(key: Key): void;
    mouseDoubleClicked(button: MouseButton): boolean;
    mouseDragged(button: number, dragX: number, dragY: number): boolean;
    mousePressed(button: MouseButton): boolean;
    mouseReleased(button: MouseButton): void;
    mouseScrolled(scroll: number): boolean;
    onClosed(): void;
    playClickSound(): void;
    static set clipboardString(string: string);
    set drawLayer(drawLayer: DrawLayer);
    set height(v: number);
    set width(v: number);
    set x(v: number);
    set y(v: number);
    setPos(x: number, y: number): void;
    setPosAndSize(x: number, y: number, w: number, h: number): Widget;
    setSize(w: number, h: number): void;
    shouldAddMouseOverText(): boolean;
    shouldDraw(): boolean;
    tick(): void;
    toString(): string;
    updateMouseOver(mouseX: number, mouseY: number): void;
  }


  class WidgetLayout {
    static readonly NO_PADDING: Padding;
    static readonly NONE: WidgetLayout;
    static readonly VERTICAL: WidgetLayout;
    static readonly HORIZONTAL: WidgetLayout;
    align(var1: Panel): number;
    get layoutPadding(): Padding;
  }


  interface WidgetType extends Enum<WidgetType> {}
  class WidgetType extends Enum<WidgetType> {
    static readonly NORMAL: WidgetType;
    static readonly MOUSE_OVER: WidgetType;
    static readonly DISABLED: WidgetType;
    static mouseOver(mouseOver: boolean): WidgetType;
    static valueOf(name: string): WidgetType;
    static values(): WidgetType[];
  }

}

declare module 'dev.ftb.mods.ftblibrary.ui.BaseScreen' {
  import { ClickEvent, HoverEvent, Style } from 'net.minecraft.network.chat';

  class PositionedTextData {
    readonly posX: number;
    readonly posY: number;
    readonly width: number;
    readonly height: number;
    readonly clickEvent: ClickEvent;
    readonly hoverEvent: HoverEvent;
    readonly insertion: string;
    constructor(x: number, y: number, w: number, h: number, s: Style);
  }

}

declare module 'dev.ftb.mods.ftblibrary.ui.CheckBoxList' {
  import { CheckBoxList } from 'dev.ftb.mods.ftblibrary.ui';
  import { MouseButton } from 'dev.ftb.mods.ftblibrary.ui.input';
  import { List } from 'java.util';

  class CheckBoxEntry {
    constructor(name: string, checkBoxList: CheckBoxList);
    addMouseOverText(list: string[]): void;
    get index(): number;
    onClicked(button: MouseButton, index: number): void;
    onValueChanged(): void;
    select(index: number): CheckBoxEntry;
  }

}

declare module 'dev.ftb.mods.ftblibrary.ui.ContextMenu' {
  import { Button, Panel, Theme } from 'dev.ftb.mods.ftblibrary.ui';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { MouseButton } from 'dev.ftb.mods.ftblibrary.ui.input';

  interface CSeparator extends Button {}
  class CSeparator extends Button {
    constructor(panel: Panel);
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    onClicked(button: MouseButton): void;
  }

}

declare module 'dev.ftb.mods.ftblibrary.ui.input' {
  class KeyModifiers {
    static readonly NONE: KeyModifiers;
    readonly modifiers: number;
    constructor(m: number);
    alt(): boolean;
    capsLock(): boolean;
    control(): boolean;
    numLock(): boolean;
    onlyControl(): boolean;
    shift(): boolean;
    start(): boolean;
  }


  class MouseButton {
    static readonly LEFT: MouseButton;
    static readonly RIGHT: MouseButton;
    static readonly MIDDLE: MouseButton;
    static readonly BACK: MouseButton;
    static readonly NEXT: MouseButton;
    readonly id: number;
    static get(i: number): MouseButton;
    get id(): number;
    hashCode(): number;
    isLeft(): boolean;
    isMiddle(): boolean;
    isRight(): boolean;
  }

}

declare module 'dev.ftb.mods.ftblibrary.ui.misc' {
  import { ButtonPanel } from 'dev.ftb.mods.ftblibrary.ui.misc.AbstractButtonListScreen';
  import { Widget, Panel, BaseScreen, Theme, WidgetLayout } from 'dev.ftb.mods.ftblibrary.ui';
  import { Component } from 'net.minecraft.network.chat';
  import { Key, MouseButton } from 'dev.ftb.mods.ftblibrary.ui.input';
  import { Pair } from 'com.mojang.datafixers.util';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Color4I, Icon } from 'dev.ftb.mods.ftblibrary.icon';
  import { Toast, ToastComponent } from 'net.minecraft.client.gui.components.toasts';
  import { Visibility } from 'Toast';
  import { SoundManager } from 'net.minecraft.client.sounds';

  interface AbstractButtonListScreen extends AbstractThreePanelScreen<ButtonPanel> {}
  class AbstractButtonListScreen extends AbstractThreePanelScreen<ButtonPanel> {
    constructor();
    addButtons(var1: Panel): void;
    focus(): void;
    get title(): Component;
    getFilterText(widget: Widget): string;
    onTextChanged(): void;
    set title(txt: Component);
    setBorder(h: number, v: number, w: number): void;
    setHasSearchBox(newVal: boolean): void;
  }


  interface AbstractGroupedButtonListScreen<G = any, E = any> extends AbstractButtonListScreen {}
  class AbstractGroupedButtonListScreen<G = any, E = any> extends AbstractButtonListScreen {
    constructor(title: Component);
    addButtons(panel: Panel): void;
    isCollapsed(group: G): boolean;
    keyPressed(key: Key): boolean;
    onInit(): boolean;
    setCollapsed(group: G, collapsed: boolean): void;
  }


  interface AbstractThreePanelScreen<T extends Panel = any> extends BaseScreen {}
  class AbstractThreePanelScreen<T extends Panel = any> extends BaseScreen {
    static readonly NO_INSET: Pair;
    addWidgets(): void;
    alignWidgets(): void;
    get theme(): Theme;
    keyPressed(key: Key): boolean;
    shouldShowCloseButton(): boolean;
    showBottomPanel(show: boolean): void;
    showCloseButton(show: boolean): void;
    showScrollBar(show: boolean): void;
    tick(): void;
  }


  interface ButtonListBaseScreen extends BaseScreen {}
  class ButtonListBaseScreen extends BaseScreen {
    constructor();
    addButtons(var1: Panel): void;
    addWidgets(): void;
    alignWidgets(): void;
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    focus(): void;
    get theme(): Theme;
    get title(): Component;
    getFilterText(widget: Widget): string;
    onTextChanged(): void;
    set title(txt: Component);
    setBorder(h: number, v: number, w: number): void;
    setHasSearchBox(newVal: boolean): void;
  }


  interface CompactGridLayout extends WidgetLayout {}
  class CompactGridLayout extends WidgetLayout {
    constructor(s: number);
    align(panel: Panel): number;
  }


  interface KeyReferenceScreen extends BaseScreen {}
  class KeyReferenceScreen extends BaseScreen {
    constructor(...translationKeys: string[]);
    addWidgets(): void;
    alignWidgets(): void;
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    get theme(): Theme;
    get title(): Component;
    onClicked(button: MouseButton): void;
    onInit(): boolean;
  }


  interface LoadingScreen extends BaseScreen {}
  class LoadingScreen extends BaseScreen {
    constructor();

    constructor(t: Component);
    addWidgets(): void;
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    finishLoading(): void;
    get text(): Component[];
    isLoading(): boolean;
    set text(...s: Component[]);
    setFinished(): void;
    startLoading(): void;
  }


  class NordColors {
    static readonly POLAR_NIGHT_0: Color4I;
    static readonly POLAR_NIGHT_1: Color4I;
    static readonly POLAR_NIGHT_2: Color4I;
    static readonly POLAR_NIGHT_3: Color4I;
    static readonly POLAR_NIGHT_4: Color4I;
    static readonly POLAR_NIGHT: Color4I[];
    static readonly SNOW_STORM_0: Color4I;
    static readonly SNOW_STORM_1: Color4I;
    static readonly SNOW_STORM_2: Color4I;
    static readonly SNOW_STORM_3: Color4I;
    static readonly SNOW_STORM: Color4I[];
    static readonly FROST_0: Color4I;
    static readonly FROST_1: Color4I;
    static readonly FROST_2: Color4I;
    static readonly FROST_3: Color4I;
    static readonly FROST: Color4I[];
    static readonly RED: Color4I;
    static readonly ORANGE: Color4I;
    static readonly YELLOW: Color4I;
    static readonly GREEN: Color4I;
    static readonly PURPLE: Color4I;
    static readonly AURORA: Color4I[];
  }


  interface SimpleToast extends Toast {}
  class SimpleToast extends Toast {
    static error(title: Component, subtitle: Component): void;
    get icon(): Icon;
    get icon(): Icon;
    get subtitle(): Component;
    get subtitle(): Component;
    get subtitle(): Component;
    get title(): Component;
    get title(): Component;
    get title(): Component;
    static info(title: Component, subtitle: Component): void;
    isImportant(): boolean;
    playSound(handler: SoundManager): void;
    render(graphics: GuiGraphics, gui: ToastComponent, delta: number): Visibility;
  }


  class UITesting {
    static openTestScreen(): void;
  }

}

declare module 'dev.ftb.mods.ftblibrary.ui.misc.UITesting' {
  import { EditConfigScreen } from 'dev.ftb.mods.ftblibrary.config.ui';
  import { ConfigGroup } from 'dev.ftb.mods.ftblibrary.config';
  import { TooltipList } from 'dev.ftb.mods.ftblibrary.util';

  interface TestConfigScreen extends EditConfigScreen {}
  class TestConfigScreen extends EditConfigScreen {
    constructor(configGroup: ConfigGroup);
    addMouseOverText(list: TooltipList): void;
  }

}

declare module 'dev.ftb.mods.ftblibrary.ui.ScrollBar' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Plane extends Enum<Plane> {}
  class Plane extends Enum<Plane> {
    static readonly HORIZONTAL: Plane;
    static readonly VERTICAL: Plane;
    static valueOf(name: string): Plane;
    static values(): Plane[];
  }

}

declare module 'dev.ftb.mods.ftblibrary.ui.SimpleButton' {
  import { SimpleButton } from 'dev.ftb.mods.ftblibrary.ui';
  import { MouseButton } from 'dev.ftb.mods.ftblibrary.ui.input';

  class Callback {
    onClicked(var1: SimpleButton, var2: MouseButton): void;
  }

}

declare module 'dev.ftb.mods.ftblibrary.ui.ToggleableButton' {
  import { SimpleButton } from 'dev.ftb.mods.ftblibrary.ui';

  class ToggleableCallback {
    onClicked(var1: SimpleButton, var2: boolean): void;
  }

}

declare module 'dev.ftb.mods.ftblibrary.ui.Widget' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface DrawLayer extends Enum<DrawLayer> {}
  class DrawLayer extends Enum<DrawLayer> {
    static readonly BACKGROUND: DrawLayer;
    static readonly FOREGROUND: DrawLayer;
    static valueOf(name: string): DrawLayer;
    static values(): DrawLayer[];
  }

}

declare module 'dev.ftb.mods.ftblibrary.ui.WidgetLayout' {
  import { WidgetLayout, Widget, Panel } from 'dev.ftb.mods.ftblibrary.ui';
  import { Function, BiConsumer } from 'java.util.function';
  import { Integer } from 'java.lang';

  interface Vertical extends _Simple {}
  class Vertical extends _Simple {
    constructor(_pre: number, _spacing: number, _post: number);
    get layoutPadding(): Padding;
  }


  interface Horizontal extends _Simple {}
  class Horizontal extends _Simple {
    constructor(_pre: number, _spacing: number, _post: number);
    get layoutPadding(): Padding;
  }


  interface _Simple extends WidgetLayout {}
  class _Simple extends WidgetLayout {
    constructor(_pre: number, _spacing: number, _post: number, sizeGetter: Function<Widget, number>, positionSetter: BiConsumer<Widget, number>);
    align(panel: Panel): number;
  }

}

declare module 'dev.ftb.mods.ftblibrary.util' {
  import { OutputStream } from 'java.io';
  import { BooleanSupplier, Supplier, Predicate, Function } from 'java.util.function';
  import { Container } from 'net.minecraft.world';
  import { Component, Style } from 'net.minecraft.network.chat';
  import { Map, Comparator, Optional, List, Collection } from 'java.util';
  import { Comparable, Boolean, Throwable, Enum, CharSequence } from 'java.lang';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Consumer } from 'dev.ftb.mods.ftblibrary.util.OptionalBoolean';
  import { PanelPos } from 'dev.ftb.mods.ftblibrary.util.PanelPositioning';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ObjectLinkedOpenCustomHashSet } from 'it.unimi.dsi.fastutil.objects';
  import { DecimalFormat } from 'java.text';
  import { Char2ObjectOpenHashMap } from 'it.unimi.dsi.fastutil.chars';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { Level } from 'net.minecraft.world.level';
  import { ChatFormatting } from 'net.minecraft';

  class BooleanConsumer {
    accept(var1: boolean): void;
  }


  interface ByteCounterOutputStream extends OutputStream {}
  class ByteCounterOutputStream extends OutputStream {
    get size(): number;
    write(b: number): void;
    write(b: number[]): void;
    write(b: number[], off: number, len: number): void;
  }


  interface ChainedBooleanSupplier extends BooleanSupplier {}
  class ChainedBooleanSupplier extends BooleanSupplier {
    static readonly TRUE: ChainedBooleanSupplier;
    static readonly FALSE: ChainedBooleanSupplier;
    and(supplier: BooleanSupplier): ChainedBooleanSupplier;
    not(): ChainedBooleanSupplier;
    or(supplier: BooleanSupplier): ChainedBooleanSupplier;
    xor(supplier: BooleanSupplier): ChainedBooleanSupplier;
  }


  class ContainerKey {
    readonly container: Container;
    constructor(c: Container);
    equals(o: any): boolean;
    hashCode(): number;
  }


  class CustomComponentParser {
    parse(var1: string, var2: Map<string, string>): Component;
  }


  interface Lazy<T = any> extends Supplier<T> {}
  class Lazy<T = any> extends Supplier<T> {
    get (): T;
    invalidate(): void;
    static of<T>(valueSupplier: Supplier<T>): Lazy<T>;
    toString(): string;
  }


  class MapUtils {
    static sortMapByKey<K, V>(map: Map<K, V>, comparator: Comparator<K>): Map<K, V>;
    static sortMapByKey<K extends Comparable<K>, V>(map: Map<K, V>): Map<K, V>;
  }


  class ModUtils {
    static getModName(modId: string): Optional<string>;
    static getModName(item: Item): Optional<string>;
    static getModName(fluid: Fluid): Optional<string>;
    static isDevMode(): boolean;
  }


  class NBTUtils {
    static getSizeInBytes(nbt: CompoundTag, compressed: boolean): number;
  }


  class OptionalBoolean {
    static readonly EMPTY: OptionalBoolean;
    static readonly TRUE: OptionalBoolean;
    static readonly FALSE: OptionalBoolean;
    get (): boolean;
    ifPresent(consumer: Consumer): void;
    isPresent(): boolean;
    static of(v: boolean): OptionalBoolean;
    static ofNullable(v: boolean): OptionalBoolean;
    orElse(b: boolean): boolean;
    orElseGet(other: BooleanSupplier): boolean;
    orElseThrow<X extends Throwable>(exceptionSupplier: Supplier<X>): boolean;
  }


  interface PanelPositioning extends Enum<PanelPositioning> {}
  class PanelPositioning extends Enum<PanelPositioning> {
    static readonly TOP_LEFT: PanelPositioning;
    static readonly TOP: PanelPositioning;
    static readonly TOP_RIGHT: PanelPositioning;
    static readonly RIGHT: PanelPositioning;
    static readonly BOTTOM_RIGHT: PanelPositioning;
    static readonly BOTTOM: PanelPositioning;
    static readonly BOTTOM_LEFT: PanelPositioning;
    static readonly LEFT: PanelPositioning;
    getPanelPos(screenW: number, screenH: number, panelW: number, panelH: number, insetX: number, insetY: number): PanelPos;
    getPanelPos(screenW: number, screenH: number, panelW: number, panelH: number, insetX: number, insetY: number): PanelPos;
    static valueOf(name: string): PanelPositioning;
    static values(): PanelPositioning[];
  }


  class PlayerDisplayNameUtil {
    static refreshDisplayName(player: Player): void;
  }


  interface SetOfItemStack extends ObjectLinkedOpenCustomHashSet<ItemStack> {}
  class SetOfItemStack extends ObjectLinkedOpenCustomHashSet<ItemStack> {
    constructor();

    constructor(collection: Collection<ItemStack>);
    sortedList(): ItemStack[];
  }


  class StringUtils {
    static readonly ALLOWED_TEXT_CHARS: string;
    static readonly FORMATTING_CHAR: string;
    static readonly EMPTY_ARRAY: string[];
    static readonly HEX: string[];
    static readonly ALWAYS_TRUE: Predicate;
    static readonly FLAG_ID_ALLOW_EMPTY: number;
    static readonly FLAG_ID_FIX: number;
    static readonly FLAG_ID_ONLY_LOWERCASE: number;
    static readonly FLAG_ID_ONLY_UNDERLINE: number;
    static readonly FLAG_ID_ONLY_UNDERLINE_OR_PERIOD: number;
    static readonly FLAG_ID_DEFAULTS: number;
    static readonly IGNORE_CASE_COMPARATOR: Comparator;
    static readonly ID_COMPARATOR: Comparator;
    static readonly TEMP_MAP: Map;
    static readonly DOUBLE_FORMATTER_00: DecimalFormat;
    static readonly DOUBLE_FORMATTER_0: DecimalFormat;
    static readonly INT_SIZE_TABLE: number[];
    static ignoreResourceLocationErrors: boolean;
    static add0s(number: number, max: number): string;
    static addFormatting(string: string): string;
    static camelCaseToWords(key: string): string;
    static emptyIfNull(o: any): string;
    static fillString(s: CharSequence, fill: string, length: number): string;
    static firstUppercase(s: string): string;
    static fixTabs(string: string, tabSize: number): string;
    static formatDouble(value: number, fancy: boolean): string;
    static formatDouble(value: number): string;
    static formatDouble0(value: number): string;
    static formatDouble00(value: number): string;
    static getID(o: any, flags: number): string;
    static getRawID(o: any): string;
    static isASCIIChar(c: string): boolean;
    static isTextChar(c: string, onlyAZ09: boolean): boolean;
    static joinSpaceUntilEnd(startIndex: number, o: CharSequence[]): string;
    static parse(map: Map<string, string>, s: string): Map<string, string>;
    static removeAllWhitespace(s: string): string;
    static replace(txt: string[], s: string, s1: string): void;
    static replace(s: string, c: string, withParameter: string): string;
    static shiftArray(s: string[]): string[];
    static splitProperties(s: string): Map<string, string>;
    static stringSize(x: number): number;
    static toSnakeCase(string: string): string;
    static unformatted(string: string): string;
  }


  class TextComponentParser {
    static readonly CODE_TO_FORMATTING: Char2ObjectOpenHashMap;
    static readonly SPECIAL_COLOR_CODES: Char2ObjectOpenHashMap;
    static parse(text: string, substitutes: Function<string, Component>): Component;
  }


  class TextComponentUtils {
    static hotkeyTooltip(txt: string): Component;
    static translatedDimension(key: ResourceKey<Level>): Component;
    static translatedDimension(dimId: ResourceLocation): Component;
    static withLinks(message: string): Component;
  }


  class TimeUtils {
    static getTimeString(millis: number): string;
    static prettyTimeString(seconds: number): string;
  }


  class TooltipList {
    backgroundColor: number;
    borderColorStart: number;
    borderColorEnd: number;
    maxWidth: number;
    xOffset: number;
    yOffset: number;
    add(component: Component): void;
    blankLine(): void;
    get lines(): Component[];
    reset(): void;
    shouldRender(): boolean;
    string(text: string): void;
    styledString(text: string, style: Style): void;
    styledString(text: string, color: ChatFormatting): void;
    styledTranslate(key: string, style: Style, ...objects: any[]): void;
    translate(key: string, ...objects: any[]): void;
  }

}

declare module 'dev.ftb.mods.ftblibrary.util.client' {
  import { CustomComponentParser } from 'dev.ftb.mods.ftblibrary.util';
  import { Component, FormattedText, ComponentContents } from 'net.minecraft.network.chat';
  import { Font } from 'net.minecraft.client.gui';
  import { BooleanSupplier } from 'java.util.function';
  import { List } from 'java.util';
  import { Runnable, Class } from 'java.lang';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Provider } from 'HolderLookup';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { FluidStack } from 'dev.architectury.fluid';
  import { MapCodec } from 'com.mojang.serialization';
  import { ImageAlign } from 'dev.ftb.mods.ftblibrary.util.client.ImageComponent';
  import { Icon } from 'dev.ftb.mods.ftblibrary.icon';
  import { Type } from 'ComponentContents';

  class ClientTextComponentUtils {
    static addCustomParser(functionParameter: CustomComponentParser): void;
    static ellipsize(font: Font, text: FormattedText, maxWidth: number): FormattedText;
    static parse(s: string): Component;
  }


  class ClientUtils {
    static readonly IS_CLIENT_OP: BooleanSupplier;
    static readonly RUN_LATER: List;
    static execClientCommand(command: string, printChat: boolean): void;
    static getCurrentGuiAs<T>(clazz: Class<T>): T;
    static getFluidColor(stack: FluidStack): number;
    static getGuiAs<T>(gui: Screen, clazz: Class<T>): T;
    static getStillTexture(stack: FluidStack): ResourceLocation;
    static handleClick(scheme: string, path: string): boolean;
    static registryAccess(): Provider;
    static runLater(runnable: Runnable): void;
  }


  interface ImageComponent extends ComponentContents {}
  class ImageComponent extends ComponentContents {
    static readonly CODEC: MapCodec;
    static create(id: string, width: number, height: number, align: ImageAlign, fit: boolean): ImageComponent;
    get align(): ImageAlign;
    get height(): number;
    get image(): Icon;
    get width(): number;
    imageStr(): string;
    isFit(): boolean;
    set align(align: ImageAlign);
    set height(height: number);
    set image(image: Icon);
    set width(width: number);
    setFit(fit: boolean): void;
    toString(): string;
    type(): Type<any>;
  }

}

declare module 'dev.ftb.mods.ftblibrary.util.client.ImageComponent' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ImageAlign extends Enum<ImageAlign> {}
  class ImageAlign extends Enum<ImageAlign> {
    static readonly LEFT: ImageAlign;
    static readonly CENTER: ImageAlign;
    static readonly RIGHT: ImageAlign;
    static byName(name: string): ImageAlign;
    get name(): string;
    get serializedName(): string;
    static valueOf(name: string): ImageAlign;
    static values(): ImageAlign[];
  }

}

declare module 'dev.ftb.mods.ftblibrary.util.neoforge' {
  import { FluidStack } from 'net.neoforged.neoforge.fluids';
  import { ItemStack } from 'net.minecraft.world.item';

  class FluidKey {
    readonly stack: FluidStack;
    constructor(s: FluidStack);
    equals(o: any): boolean;
    hashCode(): number;
  }


  class ItemKey {
    readonly stack: ItemStack;
    constructor(s: ItemStack);
    equals(o: any): boolean;
    hashCode(): number;
  }

}

declare module 'dev.ftb.mods.ftblibrary.util.OptionalBoolean' {
  class Consumer {
    accept(var1: boolean): void;
  }

}

declare module 'dev.ftb.mods.ftblibrary.util.text' {
  import { TextColor } from 'net.minecraft.network.chat';
  import { Map } from 'java.util';
  import { Lazy } from 'dev.ftb.mods.ftblibrary.util';
  import { Integer } from 'java.lang';

  interface CustomTextColor extends TextColor {}
  class CustomTextColor extends TextColor {
    constructor(name: string);
  }


  class ExtendableTextColor {
    static addCustomColor(id: string, color: TextColor): void;
    static get customColors(): Map<string, TextColor>;
  }


  interface RainbowTextColor extends CustomTextColor {}
  class RainbowTextColor extends CustomTextColor {
    static readonly INSTANCE: RainbowTextColor;
    static get rainbowColors(): Lazy<number[]>;
    get value(): number;
  }

}