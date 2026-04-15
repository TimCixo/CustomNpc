declare module 'dev.isxander.yacl3.api' {
  import { Function, Supplier, Consumer, BiConsumer, BiFunction } from 'java.util.function';
  import { OptionInstance, Minecraft } from 'net.minecraft.client';
  import { YACLScreen, AbstractWidget } from 'dev.isxander.yacl3.gui';
  import { Builder } from 'dev.isxander.yacl3.api.ButtonOption';
  import { Builder as dev_isxander_yacl3_api_option_Builder } from 'dev.isxander.yacl3.api.Option';
  import { Class, Integer, Runnable } from 'java.lang';
  import { Component } from 'net.minecraft.network.chat';
  import { ImmutableList, ImmutableSet } from 'com.google.common.collect';
  import { Builder as dev_isxander_yacl3_api_configcategory_Builder } from 'dev.isxander.yacl3.api.ConfigCategory';
  import { Dimension } from 'dev.isxander.yacl3.api.utils';
  import { Tab } from 'net.minecraft.client.gui.components.tabs';
  import { ScreenRectangle } from 'net.minecraft.client.gui.navigation';
  import { Builder as dev_isxander_yacl3_api_labeloption_Builder } from 'dev.isxander.yacl3.api.LabelOption';
  import { List, Collection, Optional } from 'java.util';
  import { Builder as dev_isxander_yacl3_api_listoption_Builder } from 'dev.isxander.yacl3.api.ListOption';
  import { Builder as dev_isxander_yacl3_api_optiongroup_Builder } from 'dev.isxander.yacl3.api.OptionGroup';
  import { CompletableFuture } from 'java.util.concurrent';
  import { ImageRenderer } from 'dev.isxander.yacl3.gui.image';
  import { Builder as dev_isxander_yacl3_api_optiondescription_Builder } from 'dev.isxander.yacl3.api.OptionDescription';
  import { Event } from 'dev.isxander.yacl3.api.OptionEventListener';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Builder as dev_isxander_yacl3_api_placeholdercategory_Builder } from 'dev.isxander.yacl3.api.PlaceholderCategory';
  import { ResetAction, StateListener } from 'dev.isxander.yacl3.api.StateManager';
  import { Builder as dev_isxander_yacl3_api_yetanotherconfiglib_Builder, ConfigBackedBuilder } from 'dev.isxander.yacl3.api.YetAnotherConfigLib';
  import { ConfigClassHandler } from 'dev.isxander.yacl3.config.v2.api';
  import { ConfigInstance } from 'dev.isxander.yacl3.config';

  class Binding<T = any> {
    defaultValue(): T;
    static generic<T>(def: T, getter: Supplier<T>, setter: Consumer<T>): Binding<T>;
    get value(): T;
    static immutable<T>(value: T): Binding<T>;
    static minecraft<T>(minecraftOption: OptionInstance<T>): Binding<T>;
    set value(var1: T);
    xmap<U>(to: Function<T, U>, from: Function<U, T>): Binding<U>;
  }


  interface ButtonOption extends Option<BiConsumer> {}
  class ButtonOption extends Option<BiConsumer> {
    action(): BiConsumer<YACLScreen, ButtonOption>;
    static createBuilder(): Builder;
    static createBuilder<T>(): dev_isxander_yacl3_api_option_Builder<T>;
    static createBuilder<T>(typeClass: Class<T>): dev_isxander_yacl3_api_option_Builder<T>;
  }


  class ConfigCategory {
    static createBuilder(): dev_isxander_yacl3_api_configcategory_Builder;
    groups(): ImmutableList<OptionGroup>;
    tooltip(): Component;
  }


  class Controller<T = any> {
    formatValue(): Component;
    option(): Option<T>;
    provideWidget(var1: YACLScreen, var2: Dimension<number>): AbstractWidget;
  }


  class CustomTabProvider {
    createTab(var1: YACLScreen, var2: ScreenRectangle): Tab;
  }


  interface LabelOption extends Option<Component> {}
  class LabelOption extends Option<Component> {
    static create(label: Component): LabelOption;
    static createBuilder(): dev_isxander_yacl3_api_labeloption_Builder;
    static createBuilder<T>(): dev_isxander_yacl3_api_option_Builder<T>;
    static createBuilder<T>(typeClass: Class<T>): dev_isxander_yacl3_api_option_Builder<T>;
    label(): Component;
  }


  interface ListOption<T = any> extends OptionGroup, Option<List> {}
  class ListOption<T = any> extends OptionGroup {
    addRefreshListener(var1: Runnable): void;
    static createBuilder<T>(): dev_isxander_yacl3_api_listoption_Builder<T>;
    static createBuilder<T>(typeClass: Class<T>): dev_isxander_yacl3_api_listoption_Builder<T>;
    static createBuilder(): dev_isxander_yacl3_api_optiongroup_Builder;
    indexOf(var1: ListOptionEntry<any>): number;
    insertEntry(var1: number, var2: ListOptionEntry<any>): void;
    insertNewEntry(): ListOptionEntry<T>;
    maximumNumberOfEntries(): number;
    minimumNumberOfEntries(): number;
    numberOfEntries(): number;
    options(): ImmutableList<ListOptionEntry<T>>;
    removeEntry(var1: ListOptionEntry<any>): void;
  }


  interface ListOptionEntry<T = any> extends Option<T> {}
  class ListOptionEntry<T = any> extends Option<T> {
    available(): boolean;
    flags(): ImmutableSet<OptionFlag>;
    parentGroup(): ListOption<T>;
  }


  class NameableEnum {
    get displayName(): Component;
  }


  class Option<T = any> {
    addEventListener(var1: OptionEventListener<T>): void;
    addListener(var1: BiConsumer<Option<T>, T>): void;
    applyValue(): boolean;
    available(): boolean;
    binding(): Binding<T>;
    canResetToDefault(): boolean;
    changed(): boolean;
    controller(): Controller<T>;
    static createBuilder<T>(): dev_isxander_yacl3_api_option_Builder<T>;
    static createBuilder<T>(typeClass: Class<T>): dev_isxander_yacl3_api_option_Builder<T>;
    description(): OptionDescription;
    flags(): ImmutableSet<OptionFlag>;
    forgetPendingValue(): void;
    isPendingValueDefault(): boolean;
    pendingValue(): T;
    requestSet(var1: T): void;
    requestSetDefault(): void;
    setAvailable(var1: boolean): void;
    stateManager(): StateManager<T>;
    tooltip(): Component;
  }


  class OptionAddable {
    option(var1: Option<any>): OptionAddable;
    option(optionSupplier: Supplier<Option<any>>): OptionAddable;
    optionIf(condition: boolean, option: Option<any>): OptionAddable;
    optionIf(condition: boolean, optionSupplier: Supplier<Option<any>>): OptionAddable;
    options(var1: Collection<Option<any>>): OptionAddable;
  }


  class OptionDescription {
    static readonly EMPTY: OptionDescription;
    static createBuilder(): dev_isxander_yacl3_api_optiondescription_Builder;
    image(): CompletableFuture<Optional<ImageRenderer>>;
    static of(...description: Component[]): OptionDescription;
    text(): Component;
  }


  class OptionEventListener<T = any> {
    onEvent(var1: Option<T>, var2: Event): void;
  }


  interface OptionFlag extends Consumer<Minecraft> {}
  class OptionFlag extends Consumer<Minecraft> {
    static readonly GAME_RESTART: OptionFlag;
    static readonly RELOAD_CHUNKS: OptionFlag;
    static readonly WORLD_RENDER_UPDATE: OptionFlag;
    static readonly ASSET_RELOAD: OptionFlag;
  }


  class OptionGroup {
    collapsed(): boolean;
    static createBuilder(): dev_isxander_yacl3_api_optiongroup_Builder;
    description(): OptionDescription;
    isRoot(): boolean;
    options(): ImmutableList<Option<any>>;
    tooltip(): Component;
  }


  interface PlaceholderCategory extends ConfigCategory {}
  class PlaceholderCategory extends ConfigCategory {
    static createBuilder(): dev_isxander_yacl3_api_placeholdercategory_Builder;
    screen(): BiFunction<Minecraft, YACLScreen, Screen>;
  }


  class StateManager<T = any> {
    addListener(var1: StateListener<T>): void;
    apply(): void;
    static createImmutable<T>(value: T): StateManager<T>;
    static createInstant<T>(binding: Binding<T>): StateManager<T>;
    static createInstant<T>(def: T, getter: Supplier<T>, setter: Consumer<T>): StateManager<T>;
    static createSimple<T>(binding: Binding<T>): StateManager<T>;
    static createSimple<T>(def: T, getter: Supplier<T>, setter: Consumer<T>): StateManager<T>;
    get (): T;
    isAlwaysSynced(): boolean;
    isDefault(): boolean;
    isSynced(): boolean;
    resetToDefault(var1: ResetAction): void;
    set (var1: T);
    sync(): void;
  }


  class YetAnotherConfigLib {
    categories(): ImmutableList<ConfigCategory>;
    static create<T>(configHandler: ConfigClassHandler<T>, builder: ConfigBackedBuilder<T>): YetAnotherConfigLib;
    static create<T>(configInstance: ConfigInstance<T>, builder: ConfigBackedBuilder<T>): YetAnotherConfigLib;
    static createBuilder(): dev_isxander_yacl3_api_yetanotherconfiglib_Builder;
    generateScreen(var1: Screen): Screen;
    initConsumer(): Consumer<YACLScreen>;
    saveFunction(): Runnable;
    title(): Component;
  }

}

declare module 'dev.isxander.yacl3.api.ButtonOption' {
  import { Component } from 'net.minecraft.network.chat';
  import { OptionDescription, ButtonOption } from 'dev.isxander.yacl3.api';
  import { BiConsumer, Consumer } from 'java.util.function';
  import { YACLScreen } from 'dev.isxander.yacl3.gui';

  class Builder {
    action(var1: BiConsumer<YACLScreen, ButtonOption>): Builder;
    action(var1: Consumer<YACLScreen>): Builder;
    available(var1: boolean): Builder;
    build(): ButtonOption;
    description(var1: OptionDescription): Builder;
    name(var1: Component): Builder;
    text(var1: Component): Builder;
  }

}

declare module 'dev.isxander.yacl3.api.ConfigCategory' {
  import { OptionAddable, Option, OptionGroup, ConfigCategory } from 'dev.isxander.yacl3.api';
  import { Component } from 'net.minecraft.network.chat';
  import { Supplier } from 'java.util.function';
  import { Collection } from 'java.util';
  import { Builder as dev_isxander_yacl3_api_optiongroup_Builder } from 'dev.isxander.yacl3.api.OptionGroup';

  interface Builder extends OptionAddable {}
  class Builder extends OptionAddable {
    build(): ConfigCategory;
    group(var1: OptionGroup): Builder;
    group(groupSupplier: Supplier<OptionGroup>): Builder;
    groupIf(condition: boolean, group: OptionGroup): Builder;
    groupIf(condition: boolean, groupSupplier: Supplier<OptionGroup>): Builder;
    groups(var1: Collection<OptionGroup>): Builder;
    name(var1: Component): Builder;
    option(var1: Option<any>): Builder;
    option(optionSupplier: Supplier<Option<any>>): Builder;
    optionIf(condition: boolean, option: Option<any>): Builder;
    optionIf(condition: boolean, optionSupplier: Supplier<Option<any>>): Builder;
    options(var1: Collection<Option<any>>): Builder;
    rootGroupBuilder(): dev_isxander_yacl3_api_optiongroup_Builder;
    tooltip(...var1: Component[]): Builder;
  }

}

declare module 'dev.isxander.yacl3.api.controller' {
  import { Boolean, Iterable, Double, Class, Enum, Float, Integer, Long } from 'java.lang';
  import { Option, Controller } from 'dev.isxander.yacl3.api';
  import { Color } from 'java.awt';
  import { List } from 'java.util';
  import { Item } from 'net.minecraft.world.item';
  import { Function } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';

  interface BooleanControllerBuilder extends ValueFormattableController<boolean, BooleanControllerBuilder> {}
  class BooleanControllerBuilder extends ValueFormattableController<boolean, BooleanControllerBuilder> {
    coloured(var1: boolean): BooleanControllerBuilder;
    static create(option: Option<boolean>): BooleanControllerBuilder;
    onOffFormatter(): BooleanControllerBuilder;
    trueFalseFormatter(): BooleanControllerBuilder;
    yesNoFormatter(): BooleanControllerBuilder;
  }


  interface ColorControllerBuilder extends ControllerBuilder<Color> {}
  class ColorControllerBuilder extends ControllerBuilder<Color> {
    allowAlpha(var1: boolean): ColorControllerBuilder;
    static create(option: Option<Color>): ColorControllerBuilder;
  }


  class ControllerBuilder<T = any> {
    build(): Controller<T>;
  }


  interface CyclingListControllerBuilder<T = any> extends ValueFormattableController<T, CyclingListControllerBuilder> {}
  class CyclingListControllerBuilder<T = any> extends ValueFormattableController<T, CyclingListControllerBuilder> {
    static create<T>(option: Option<T>): CyclingListControllerBuilder<T>;
    values(...var1: T[]): CyclingListControllerBuilder<T>;
    values(var1: Iterable<T>): CyclingListControllerBuilder<T>;
  }


  interface DoubleFieldControllerBuilder extends NumberFieldControllerBuilder<number, DoubleFieldControllerBuilder> {}
  class DoubleFieldControllerBuilder extends NumberFieldControllerBuilder<number, DoubleFieldControllerBuilder> {
    static create(option: Option<number>): DoubleFieldControllerBuilder;
  }


  interface DoubleSliderControllerBuilder extends SliderControllerBuilder<number, DoubleSliderControllerBuilder> {}
  class DoubleSliderControllerBuilder extends SliderControllerBuilder<number, DoubleSliderControllerBuilder> {
    static create(option: Option<number>): DoubleSliderControllerBuilder;
  }


  interface DropdownStringControllerBuilder extends StringControllerBuilder {}
  class DropdownStringControllerBuilder extends StringControllerBuilder {
    allowAnyValue(var1: boolean): DropdownStringControllerBuilder;
    allowEmptyValue(var1: boolean): DropdownStringControllerBuilder;
    static create(option: Option<string>): DropdownStringControllerBuilder;
    values(var1: string[]): DropdownStringControllerBuilder;
    values(...var1: string[]): DropdownStringControllerBuilder;
  }


  interface EnumControllerBuilder<T extends Enum<T> = any> extends ValueFormattableController<T, EnumControllerBuilder> {}
  class EnumControllerBuilder<T extends Enum<T> = any> extends ValueFormattableController<T, EnumControllerBuilder> {
    static create<T extends Enum<T>>(option: Option<T>): EnumControllerBuilder<T>;
    enumClass(var1: Class<T>): EnumControllerBuilder<T>;
  }


  interface EnumDropdownControllerBuilder<E extends Enum<E> = any> extends ValueFormattableController<E, EnumDropdownControllerBuilder> {}
  class EnumDropdownControllerBuilder<E extends Enum<E> = any> extends ValueFormattableController<E, EnumDropdownControllerBuilder> {
    static create<E extends Enum<E>>(option: Option<E>): EnumDropdownControllerBuilder<E>;
  }


  interface FloatFieldControllerBuilder extends NumberFieldControllerBuilder<number, FloatFieldControllerBuilder> {}
  class FloatFieldControllerBuilder extends NumberFieldControllerBuilder<number, FloatFieldControllerBuilder> {
    static create(option: Option<number>): FloatFieldControllerBuilder;
  }


  interface FloatSliderControllerBuilder extends SliderControllerBuilder<number, FloatSliderControllerBuilder> {}
  class FloatSliderControllerBuilder extends SliderControllerBuilder<number, FloatSliderControllerBuilder> {
    static create(option: Option<number>): FloatSliderControllerBuilder;
  }


  interface IntegerFieldControllerBuilder extends NumberFieldControllerBuilder<number, IntegerFieldControllerBuilder> {}
  class IntegerFieldControllerBuilder extends NumberFieldControllerBuilder<number, IntegerFieldControllerBuilder> {
    static create(option: Option<number>): IntegerFieldControllerBuilder;
  }


  interface IntegerSliderControllerBuilder extends SliderControllerBuilder<number, IntegerSliderControllerBuilder> {}
  class IntegerSliderControllerBuilder extends SliderControllerBuilder<number, IntegerSliderControllerBuilder> {
    static create(option: Option<number>): IntegerSliderControllerBuilder;
  }


  interface ItemControllerBuilder extends ControllerBuilder<Item> {}
  class ItemControllerBuilder extends ControllerBuilder<Item> {
    static create(option: Option<Item>): ItemControllerBuilder;
  }


  interface LongFieldControllerBuilder extends NumberFieldControllerBuilder<Long, LongFieldControllerBuilder> {}
  class LongFieldControllerBuilder extends NumberFieldControllerBuilder<Long, LongFieldControllerBuilder> {
    static create(option: Option<Long>): LongFieldControllerBuilder;
  }


  interface LongSliderControllerBuilder extends SliderControllerBuilder<Long, LongSliderControllerBuilder> {}
  class LongSliderControllerBuilder extends SliderControllerBuilder<Long, LongSliderControllerBuilder> {
    static create(option: Option<Long>): LongSliderControllerBuilder;
  }


  interface NumberFieldControllerBuilder<T extends Number = any, B extends NumberFieldControllerBuilder<T, B> = any> extends ValueFormattableController<T, B> {}
  class NumberFieldControllerBuilder<T extends Number = any, B extends NumberFieldControllerBuilder<T, B> = any> extends ValueFormattableController<T, B> {
    max(var1: T): B;
    min(var1: T): B;
    range(var1: T, var2: T): B;
  }


  interface SliderControllerBuilder<T extends Number = any, B extends SliderControllerBuilder<T, B> = any> extends ValueFormattableController<T, B> {}
  class SliderControllerBuilder<T extends Number = any, B extends SliderControllerBuilder<T, B> = any> extends ValueFormattableController<T, B> {
    range(var1: T, var2: T): B;
    step(var1: T): B;
  }


  interface StringControllerBuilder extends ControllerBuilder<string> {}
  class StringControllerBuilder extends ControllerBuilder<string> {
    static create(option: Option<string>): StringControllerBuilder;
  }


  interface TickBoxControllerBuilder extends ControllerBuilder<boolean> {}
  class TickBoxControllerBuilder extends ControllerBuilder<boolean> {
    static create(option: Option<boolean>): TickBoxControllerBuilder;
  }


  interface ValueFormattableController<T = any, B extends ValueFormattableController<T, B> = any> extends ControllerBuilder<T> {}
  class ValueFormattableController<T = any, B extends ValueFormattableController<T, B> = any> extends ControllerBuilder<T> {
    formatValue(var1: ValueFormatter<T>): B;
    valueFormatter(formatter: Function<T, Component>): B;
  }


  class ValueFormatter<T = any> {
    format(var1: T): Component;
  }

}

declare module 'dev.isxander.yacl3.api.LabelOption' {
  import { StateManager, LabelOption } from 'dev.isxander.yacl3.api';
  import { Component } from 'net.minecraft.network.chat';
  import { Collection } from 'java.util';

  class Builder {
    build(): LabelOption;
    line(var1: Component): Builder;
    lines(var1: Collection<Component>): Builder;
    state(var1: StateManager<Component>): Builder;
  }

}

declare module 'dev.isxander.yacl3.api.ListOption' {
  import { Component } from 'net.minecraft.network.chat';
  import { OptionDescription, Option, ListOptionEntry, Controller, StateManager, Binding, OptionFlag, OptionEventListener, List<T, T>, ListOption } from 'dev.isxander.yacl3.api';
  import { Supplier, Function, Consumer, BiConsumer } from 'java.util.function';
  import { ControllerBuilder } from 'dev.isxander.yacl3.api.controller';
  import { List, Collection } from 'java.util';

  class Builder<T = any> {
    addListener(var1: OptionEventListener<T[]>): Builder<T>;
    addListeners(var1: Collection<OptionEventListener<T[]>>): Builder<T>;
    available(var1: boolean): Builder<T>;
    binding(var1: Binding<T[]>): Builder<T>;
    binding(var1: T[], var2: Supplier<T[]>, var3: Consumer<T[]>): Builder<T>;
    build(): ListOption<T>;
    collapsed(var1: boolean): Builder<T>;
    controller(var1: Function<Option<T>, ControllerBuilder<T>>): Builder<T>;
    customController(var1: Function<ListOptionEntry<T>, Controller<T>>): Builder<T>;
    description(var1: OptionDescription): Builder<T>;
    flag(...var1: OptionFlag[]): Builder<T>;
    flags(var1: Collection<OptionFlag>): Builder<T>;
    initial(var1: Supplier<T>): Builder<T>;
    initial(var1: T): Builder<T>;
    insertEntriesAtEnd(var1: boolean): Builder<T>;
    listener(var1: BiConsumer<Option<T[]>, T[]>): Builder<T>;
    listeners(var1: Collection<BiConsumer<Option<List<T>>, T>[]>): Builder<T>;
    maximumNumberOfEntries(var1: number): Builder<T>;
    minimumNumberOfEntries(var1: number): Builder<T>;
    name(var1: Component): Builder<T>;
    state(var1: StateManager<T[]>): Builder<T>;
  }

}

declare module 'dev.isxander.yacl3.api.Option' {
  import { Component } from 'net.minecraft.network.chat';
  import { OptionDescription, Option, Controller, StateManager, Binding, OptionFlag, OptionEventListener, Option<T, T> } from 'dev.isxander.yacl3.api';
  import { Function, Supplier, Consumer, BiConsumer } from 'java.util.function';
  import { ControllerBuilder } from 'dev.isxander.yacl3.api.controller';
  import { Collection } from 'java.util';

  class Builder<T = any> {
    addListener(var1: OptionEventListener<T>): Builder<T>;
    addListeners(var1: Collection<OptionEventListener<T>>): Builder<T>;
    available(var1: boolean): Builder<T>;
    binding(var1: Binding<T>): Builder<T>;
    binding(var1: T, var2: Supplier<T>, var3: Consumer<T>): Builder<T>;
    build(): Option<T>;
    controller(var1: Function<Option<T>, ControllerBuilder<T>>): Builder<T>;
    customController(var1: Function<Option<T>, Controller<T>>): Builder<T>;
    description(var1: OptionDescription): Builder<T>;
    description(var1: Function<T, OptionDescription>): Builder<T>;
    flag(...var1: OptionFlag[]): Builder<T>;
    flags(var1: Collection<OptionFlag>): Builder<T>;
    instant(var1: boolean): Builder<T>;
    listener(var1: BiConsumer<Option<T>, T>): Builder<T>;
    listeners(var1: Collection<BiConsumer<Option<T>, T>>): Builder<T>;
    name(var1: Component): Builder<T>;
    stateManager(var1: StateManager<T>): Builder<T>;
  }

}

declare module 'dev.isxander.yacl3.api.OptionDescription' {
  import { Component } from 'net.minecraft.network.chat';
  import { Collection, Optional } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Path } from 'java.nio.file';
  import { CompletableFuture } from 'java.util.concurrent';
  import { ImageRenderer } from 'dev.isxander.yacl3.gui.image';
  import { OptionDescription } from 'dev.isxander.yacl3.api';

  class Builder {
    build(): OptionDescription;
    customImage(var1: CompletableFuture<Optional<ImageRenderer>>): Builder;
    customImage(image: ImageRenderer): Builder;
    gifImage(var1: ResourceLocation): Builder;
    gifImage(var1: Path, var2: ResourceLocation): Builder;
    image(var1: ResourceLocation, var2: number, var3: number): Builder;
    image(var1: ResourceLocation, var2: number, var3: number, var4: number, var5: number, var6: number, var7: number): Builder;
    image(var1: Path, var2: ResourceLocation): Builder;
    text(...var1: Component[]): Builder;
    text(var1: Collection<Component>): Builder;
    webpImage(var1: ResourceLocation): Builder;
    webpImage(var1: Path, var2: ResourceLocation): Builder;
  }

}

declare module 'dev.isxander.yacl3.api.OptionEventListener' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Event extends Enum<Event> {}
  class Event extends Enum<Event> {
    static readonly INITIAL: Event;
    static readonly STATE_CHANGE: Event;
    static readonly AVAILABILITY_CHANGE: Event;
    static readonly OTHER: Event;
    static valueOf(name: string): Event;
    static values(): Event[];
  }

}

declare module 'dev.isxander.yacl3.api.OptionGroup' {
  import { OptionAddable, OptionDescription, Option, OptionGroup } from 'dev.isxander.yacl3.api';
  import { Component } from 'net.minecraft.network.chat';
  import { Supplier } from 'java.util.function';
  import { Collection } from 'java.util';

  interface Builder extends OptionAddable {}
  class Builder extends OptionAddable {
    build(): OptionGroup;
    collapsed(var1: boolean): Builder;
    description(var1: OptionDescription): Builder;
    name(var1: Component): Builder;
    option(var1: Option<any>): Builder;
    option(optionSupplier: Supplier<Option<any>>): Builder;
    optionIf(condition: boolean, option: Option<any>): Builder;
    optionIf(condition: boolean, optionSupplier: Supplier<Option<any>>): Builder;
    options(var1: Collection<Option<any>>): Builder;
  }

}

declare module 'dev.isxander.yacl3.api.PlaceholderCategory' {
  import { Component } from 'net.minecraft.network.chat';
  import { BiFunction } from 'java.util.function';
  import { Minecraft } from 'net.minecraft.client';
  import { YACLScreen } from 'dev.isxander.yacl3.gui';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { PlaceholderCategory } from 'dev.isxander.yacl3.api';

  class Builder {
    build(): PlaceholderCategory;
    name(var1: Component): Builder;
    screen(var1: BiFunction<Minecraft, YACLScreen, Screen>): Builder;
    tooltip(...var1: Component[]): Builder;
  }

}

declare module 'dev.isxander.yacl3.api.StateManager' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class StateListener<T = any> {
    andThen(after: StateListener<T>): StateListener<T>;
    static noop<T>(): StateListener<T>;
    onStateChange(var1: T, var2: T): void;
  }


  interface ResetAction extends Enum<ResetAction> {}
  class ResetAction extends Enum<ResetAction> {
    static readonly BY_OPTION: ResetAction;
    static readonly BY_GLOBAL: ResetAction;
    static valueOf(name: string): ResetAction;
    static values(): ResetAction[];
  }

}

declare module 'dev.isxander.yacl3.api.utils' {
  import { Integer, Boolean } from 'java.lang';
  import { Stream } from 'java.util.stream';
  import { Option, YetAnotherConfigLib } from 'dev.isxander.yacl3.api';
  import { Function, Consumer } from 'java.util.function';

  class Dimension<T extends Number = any> {
    centerX(): T;
    centerY(): T;
    clone(): MutableDimension<T>;
    expanded(var1: T, var2: T): Dimension<T>;
    height(): T;
    isPointInside(var1: T, var2: T): boolean;
    moved(var1: T, var2: T): Dimension<T>;
    static ofInt(x: number, y: number, width: number, height: number): MutableDimension<number>;
    width(): T;
    withHeight(var1: T): Dimension<T>;
    withWidth(var1: T): Dimension<T>;
    withX(var1: T): Dimension<T>;
    withY(var1: T): Dimension<T>;
    x(): T;
    xLimit(): T;
    y(): T;
    yLimit(): T;
  }


  interface MutableDimension<T extends Number = any> extends Dimension<T> {}
  class MutableDimension<T extends Number = any> extends Dimension<T> {
    expand(var1: T, var2: T): MutableDimension<T>;
    move(var1: T, var2: T): MutableDimension<T>;
    setHeight(var1: T): MutableDimension<T>;
    setWidth(var1: T): MutableDimension<T>;
    setX(var1: T): MutableDimension<T>;
    setY(var1: T): MutableDimension<T>;
  }


  class OptionUtils {
    static consumeOptions(yacl: YetAnotherConfigLib, consumer: Function<Option<any>, boolean>): void;
    static forEachOptions(yacl: YetAnotherConfigLib, consumer: Consumer<Option<any>>): void;
    static getFlatOptions(yacl: YetAnotherConfigLib): Stream<Option<any>>;
  }

}

declare module 'dev.isxander.yacl3.api.YetAnotherConfigLib' {
  import { Component } from 'net.minecraft.network.chat';
  import { ConfigCategory, YetAnotherConfigLib } from 'dev.isxander.yacl3.api';
  import { Supplier, Consumer } from 'java.util.function';
  import { Collection } from 'java.util';
  import { Runnable } from 'java.lang';
  import { YACLScreen } from 'dev.isxander.yacl3.gui';

  class Builder {
    build(): YetAnotherConfigLib;
    categories(var1: Collection<ConfigCategory>): Builder;
    categories(categoriesSupplier: Supplier<Collection<ConfigCategory>>): Builder;
    categoriesIf(condition: boolean, categories: Collection<ConfigCategory>): Builder;
    categoriesIf(condition: boolean, categoriesSupplier: Supplier<Collection<ConfigCategory>>): Builder;
    category(var1: ConfigCategory): Builder;
    category(categorySupplier: Supplier<ConfigCategory>): Builder;
    categoryIf(condition: boolean, category: ConfigCategory): Builder;
    categoryIf(condition: boolean, categorySupplier: Supplier<ConfigCategory>): Builder;
    save(var1: Runnable): Builder;
    screenInit(var1: Consumer<YACLScreen>): Builder;
    title(var1: Component): Builder;
  }


  class ConfigBackedBuilder<T = any> {
    build(var1: T, var2: T, var3: Builder): Builder;
  }

}

declare module 'dev.isxander.yacl3.config' {
  import { Class } from 'java.lang';
  import { Path } from 'java.nio.file';
  import { Gson, GsonBuilder } from 'com.google.gson';
  import { UnaryOperator } from 'java.util.function';
  import { Builder } from 'dev.isxander.yacl3.config.GsonConfigInstance';

  class ConfigInstance<T = any> {
    constructor(configClass: Class<T>);
    get config(): T;
    get configClass(): Class<T>;
    get defaults(): T;
    load(): void;
    save(): void;
  }


  interface GsonConfigInstance<T = any> extends ConfigInstance<T> {}
  class GsonConfigInstance<T = any> extends ConfigInstance<T> {
    constructor(configClass: Class<T>, path: Path);

    constructor(configClass: Class<T>, path: Path, gson: Gson);

    constructor(configClass: Class<T>, path: Path, builder: UnaryOperator<GsonBuilder>);

    constructor(configClass: Class<T>, path: Path, builder: GsonBuilder);
    static createBuilder<T>(configClass: Class<T>): Builder<T>;
    get path(): Path;
    load(): void;
    save(): void;
  }

}

declare module 'dev.isxander.yacl3.config.GsonConfigInstance' {
  import { JsonSerializer, JsonDeserializer, JsonElement, JsonDeserializationContext, JsonSerializationContext, GsonBuilder, Gson } from 'com.google.gson';
  import { Color } from 'java.awt';
  import { Type } from 'java.lang.reflect';
  import { Item } from 'net.minecraft.world.item';
  import { Path } from 'java.nio.file';
  import { UnaryOperator } from 'java.util.function';
  import { GsonConfigInstance } from 'dev.isxander.yacl3.config';

  interface ColorTypeAdapter extends JsonSerializer<Color>, JsonDeserializer<Color> {}
  class ColorTypeAdapter extends JsonSerializer<Color> {
    deserialize(jsonElement: JsonElement, type: Type, jsonDeserializationContext: JsonDeserializationContext): Color;
    serialize(color: Color, type: Type, jsonSerializationContext: JsonSerializationContext): JsonElement;
  }


  interface ItemTypeAdapter extends JsonSerializer<Item>, JsonDeserializer<Item> {}
  class ItemTypeAdapter extends JsonSerializer<Item> {
    deserialize(jsonElement: JsonElement, type: Type, jsonDeserializationContext: JsonDeserializationContext): Item;
    serialize(item: Item, type: Type, jsonSerializationContext: JsonSerializationContext): JsonElement;
  }


  class Builder<T = any> {
    appendGsonBuilder(gsonBuilder: UnaryOperator<GsonBuilder>): Builder<T>;
    build(): GsonConfigInstance<T>;
    overrideGsonBuilder(gsonBuilder: GsonBuilder): Builder<T>;
    overrideGsonBuilder(gson: Gson): Builder<T>;
    setPath(path: Path): Builder<T>;
  }

}

declare module 'dev.isxander.yacl3.config.util' {
  import { JsonSerializer, JsonDeserializer, JsonElement, JsonSerializationContext, JsonDeserializationContext } from 'com.google.gson';
  import { Codec } from 'com.mojang.serialization';
  import { Type } from 'java.lang.reflect';

  interface CodecSerializerAdapter<T = any> extends JsonSerializer<T>, JsonDeserializer<T> {}
  class CodecSerializerAdapter<T = any> extends JsonSerializer<T> {
    constructor(codec: Codec<T>);
    deserialize(json: JsonElement, typeOfT: Type, context: JsonDeserializationContext): T;
    serialize(src: T, typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }

}

declare module 'dev.isxander.yacl3.config.v2.api.autogen' {
  import { Optional } from 'java.util';
  import { Option } from 'dev.isxander.yacl3.api';
  import { Consumer } from 'java.util.function';
  import { ConfigField } from 'dev.isxander.yacl3.config.v2.api';
  import { Class } from 'java.lang';
  import { Annotation } from 'java.lang.annotation';

  class AutoGenField {
    category(): string;
    group(): Optional<string>;
  }


  class OptionAccess {
    getOption(var1: string): Option<any>;
    scheduleOptionOperation(var1: string, var2: Consumer<Option<any>>): void;
  }


  class OptionFactory<A extends Annotation = any, T = any> {
    createOption(var1: A, var2: ConfigField<T>, var3: OptionAccess): Option<T>;
    static register<A extends Annotation, T>(annotationClass: Class<A>, factory: OptionFactory<A, T>): void;
  }


  interface SimpleOptionFactory<A extends Annotation = any, T = any> extends OptionFactory<A, T> {}
  class SimpleOptionFactory<A extends Annotation = any, T = any> extends OptionFactory<A, T> {
    createOption(annotation: A, field: ConfigField<T>, optionAccess: OptionAccess): Option<T>;
  }

}

declare module 'dev.isxander.yacl3.config.v2.api.autogen.Boolean' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Formatter extends Enum<Formatter> {}
  class Formatter extends Enum<Formatter> {
    static readonly YES_NO: Formatter;
    static readonly TRUE_FALSE: Formatter;
    static readonly ON_OFF: Formatter;
    static readonly CUSTOM: Formatter;
    static valueOf(name: string): Formatter;
    static values(): Formatter[];
  }

}

declare module 'dev.isxander.yacl3.config.v2.api.autogen.CustomImage' {
  import { CompletableFuture } from 'java.util.concurrent';
  import { ImageRenderer } from 'dev.isxander.yacl3.gui.image';
  import { ConfigField } from 'dev.isxander.yacl3.config.v2.api';
  import { OptionAccess } from 'dev.isxander.yacl3.config.v2.api.autogen';

  class CustomImageFactory<T = any> {
    createImage(var1: T, var2: ConfigField<T>, var3: OptionAccess): CompletableFuture<ImageRenderer>;
  }

}

declare module 'dev.isxander.yacl3.config.v2.api.autogen.EnumCycler' {
  class CyclableEnum<T extends Enum<T> = any> {
    allowedValues(): T[];
  }

}

declare module 'dev.isxander.yacl3.config.v2.api.autogen.ListGroup' {
  import { ControllerBuilder } from 'dev.isxander.yacl3.api.controller';
  import { ListGroup, OptionAccess } from 'dev.isxander.yacl3.config.v2.api.autogen';
  import { ConfigField } from 'dev.isxander.yacl3.config.v2.api';
  import { List } from 'java.util';
  import { Option } from 'dev.isxander.yacl3.api';

  class ControllerFactory<T = any> {
    createController(var1: ListGroup, var2: ConfigField<T[]>, var3: OptionAccess, var4: Option<T>): ControllerBuilder<T>;
  }


  class ValueFactory<T = any> {
    provideNewValue(): T;
  }

}

declare module 'dev.isxander.yacl3.config.v2.api' {
  import { Class } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { YetAnotherConfigLib } from 'dev.isxander.yacl3.api';
  import { Builder } from 'dev.isxander.yacl3.config.v2.api.ConfigClassHandler';
  import { Optional, Map } from 'java.util';
  import { AutoGenField } from 'dev.isxander.yacl3.config.v2.api.autogen';
  import { LoadResult } from 'dev.isxander.yacl3.config.v2.api.ConfigSerializer';
  import { Type } from 'java.lang.reflect';
  import { Annotation } from 'java.lang.annotation';

  class ConfigClassHandler<T = any> {
    configClass(): Class<T>;
    static createBuilder<T>(configClass: Class<T>): Builder<T>;
    defaults(): T;
    fields(): ConfigField<any>;
    generateGui(): YetAnotherConfigLib;
    id(): ResourceLocation;
    instance(): T;
    load(): boolean;
    save(): void;
    serializer(): ConfigSerializer<T>;
    supportsAutoGen(): boolean;
  }


  class ConfigField<T = any> {
    access(): FieldAccess<T>;
    autoGen(): Optional<AutoGenField>;
    defaultAccess(): ReadOnlyFieldAccess<T>;
    parent(): ConfigClassHandler<any>;
    serial(): Optional<SerialField>;
  }


  class ConfigSerializer<T = any> {
    constructor(config: ConfigClassHandler<T>);
    load(): void;
    loadSafely(bufferAccessMap: Map<ConfigField<any>, FieldAccess<any>>): LoadResult;
    save(): void;
  }


  interface FieldAccess<T = any> extends ReadOnlyFieldAccess<T> {}
  class FieldAccess<T = any> extends ReadOnlyFieldAccess<T> {
    set(var1: T): void;
  }


  class ReadOnlyFieldAccess<T = any> {
    get (): T;
    getAnnotation<A extends Annotation>(var1: Class<A>): Optional<A>;
    type(): Type;
    typeClass(): Class<T>;
  }


  class SerialField {
    comment(): Optional<string>;
    nullable(): boolean;
    required(): boolean;
    serialName(): string;
  }

}

declare module 'dev.isxander.yacl3.config.v2.api.ConfigClassHandler' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Function } from 'java.util.function';
  import { ConfigClassHandler, ConfigSerializer } from 'dev.isxander.yacl3.config.v2.api';

  class Builder<T = any> {
    build(): ConfigClassHandler<T>;
    id(var1: ResourceLocation): Builder<T>;
    serializer(var1: Function<ConfigClassHandler<T>, ConfigSerializer<T>>): Builder<T>;
  }

}

declare module 'dev.isxander.yacl3.config.v2.api.ConfigSerializer' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface LoadResult extends Enum<LoadResult> {}
  class LoadResult extends Enum<LoadResult> {
    static readonly SUCCESS: LoadResult;
    static readonly FAILURE: LoadResult;
    static readonly NO_CHANGE: LoadResult;
    static readonly DIRTY: LoadResult;
    static valueOf(name: string): LoadResult;
    static values(): LoadResult[];
  }

}

declare module 'dev.isxander.yacl3.config.v2.api.serializer' {
  import { ConfigClassHandler, ConfigSerializer } from 'dev.isxander.yacl3.config.v2.api';
  import { Path } from 'java.nio.file';
  import { GsonBuilder, Gson } from 'com.google.gson';
  import { UnaryOperator } from 'java.util.function';

  class GsonConfigSerializerBuilder<T = any> {
    appendGsonBuilder(var1: UnaryOperator<GsonBuilder>): GsonConfigSerializerBuilder<T>;
    build(): ConfigSerializer<T>;
    static create<T>(config: ConfigClassHandler<T>): GsonConfigSerializerBuilder<T>;
    overrideGsonBuilder(var1: GsonBuilder): GsonConfigSerializerBuilder<T>;
    overrideGsonBuilder(var1: Gson): GsonConfigSerializerBuilder<T>;
    setJson5(var1: boolean): GsonConfigSerializerBuilder<T>;
    setPath(var1: Path): GsonConfigSerializerBuilder<T>;
  }

}

declare module 'dev.isxander.yacl3.config.v2.impl.autogen' {
  import { ControllerBuilder } from 'dev.isxander.yacl3.api.controller';
  import { ReadOnlyFieldAccess, ConfigField } from 'dev.isxander.yacl3.config.v2.api';
  import { Class, RuntimeException, Throwable } from 'java.lang';
  import { Supplier } from 'java.util.function';
  import { CustomImageFactory } from 'dev.isxander.yacl3.config.v2.api.autogen.CustomImage';
  import { CompletableFuture } from 'java.util.concurrent';
  import { ImageRenderer } from 'dev.isxander.yacl3.gui.image';
  import { OptionAccess, OptionFactory } from 'dev.isxander.yacl3.config.v2.api.autogen';
  import { Annotation } from 'java.lang.annotation';
  import { Optional } from 'java.util';
  import { Option } from 'dev.isxander.yacl3.api';
  import { Field } from 'java.lang.reflect';

  class AutoGenUtils {
    static addCustomFormatterToController<T>(controller: ControllerBuilder<T>, field: ReadOnlyFieldAccess<T>): void;
    static constructNoArgsClass<T>(clazz: Class<T>, constructorNotFoundConsumer: Supplier<string>, constructorFailedConsumer: Supplier<string>): T;
  }


  interface EmptyCustomImageFactory extends CustomImageFactory<any> {}
  class EmptyCustomImageFactory extends CustomImageFactory<any> {
    createImage(value: any, field: ConfigField<any>, access: OptionAccess): CompletableFuture<ImageRenderer>;
  }


  class OptionFactoryRegistry {
    static createOption<T>(field: Field, configField: ConfigField<T>, storage: OptionAccess): Optional<Option<T>>;
    static registerOptionFactory<A extends Annotation, T>(annotation: Class<A>, factory: OptionFactory<A, T>): void;
  }


  interface YACLAutoGenException extends RuntimeException {}
  class YACLAutoGenException extends RuntimeException {
    constructor(message: string);

    constructor(message: string, e: Throwable);
  }

}

declare module 'dev.isxander.yacl3.config.v2.impl.serializer' {
  import { ConfigSerializer, ConfigField, FieldAccess } from 'dev.isxander.yacl3.config.v2.api';
  import { LoadResult } from 'dev.isxander.yacl3.config.v2.api.ConfigSerializer';
  import { Map } from 'java.util';

  interface GsonConfigSerializer<T = any> extends ConfigSerializer<T> {}
  class GsonConfigSerializer<T = any> extends ConfigSerializer<T> {
    load(): void;
    loadSafely(bufferAccessMap: Map<ConfigField<any>, FieldAccess<any>>): LoadResult;
    save(): void;
  }

}

declare module 'dev.isxander.yacl3.config.v2.impl.serializer.GsonConfigSerializer' {
  import { GsonConfigSerializerBuilder } from 'dev.isxander.yacl3.config.v2.api.serializer';
  import { ConfigClassHandler } from 'dev.isxander.yacl3.config.v2.api';
  import { Path } from 'java.nio.file';
  import { GsonBuilder, Gson, JsonSerializer, JsonDeserializer, JsonElement, JsonDeserializationContext, JsonSerializationContext } from 'com.google.gson';
  import { UnaryOperator } from 'java.util.function';
  import { GsonConfigSerializer } from 'dev.isxander.yacl3.config.v2.impl.serializer';
  import { Item } from 'net.minecraft.world.item';
  import { Type } from 'java.lang.reflect';
  import { Color } from 'java.awt';
  import { Style } from 'net.minecraft.network.chat';

  interface Builder<T = any> extends GsonConfigSerializerBuilder<T> {}
  class Builder<T = any> extends GsonConfigSerializerBuilder<T> {
    constructor(config: ConfigClassHandler<T>);
    appendGsonBuilder(gsonBuilder: UnaryOperator<GsonBuilder>): Builder<T>;
    build(): GsonConfigSerializer<T>;
    overrideGsonBuilder(gsonBuilder: GsonBuilder): Builder<T>;
    overrideGsonBuilder(gson: Gson): Builder<T>;
    setJson5(json5: boolean): Builder<T>;
    setPath(path: Path): Builder<T>;
  }


  interface ItemTypeAdapter extends JsonSerializer<Item>, JsonDeserializer<Item> {}
  class ItemTypeAdapter extends JsonSerializer<Item> {
    deserialize(jsonElement: JsonElement, type: Type, jsonDeserializationContext: JsonDeserializationContext): Item;
    serialize(item: Item, type: Type, jsonSerializationContext: JsonSerializationContext): JsonElement;
  }


  interface ColorTypeAdapter extends JsonSerializer<Color>, JsonDeserializer<Color> {}
  class ColorTypeAdapter extends JsonSerializer<Color> {
    deserialize(jsonElement: JsonElement, type: Type, jsonDeserializationContext: JsonDeserializationContext): Color;
    serialize(color: Color, type: Type, jsonSerializationContext: JsonSerializationContext): JsonElement;
  }


  interface StyleTypeAdapter extends JsonSerializer<Style>, JsonDeserializer<Style> {}
  class StyleTypeAdapter extends JsonSerializer<Style> {
    deserialize(json: JsonElement, typeOfT: Type, context: JsonDeserializationContext): Style;
    serialize(src: Style, typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }

}

declare module 'dev.isxander.yacl3.config.v3' {
  import { UnaryOperator, Consumer } from 'java.util.function';
  import { Codec, DataResult, DynamicOps, RecordBuilder } from 'com.mojang.serialization';
  import { Pair } from 'com.mojang.datafixers.util';
  import { Binding, Option } from 'dev.isxander.yacl3.api';
  import { Path } from 'java.nio.file';
  import { PropertyDelegateProvider, ReadOnlyProperty } from 'kotlin.properties';
  import { KProperty } from 'kotlin.reflect';
  import { OptionRegistrar, OptionDsl } from 'dev.isxander.yacl3.dsl';
  import { Function1 } from 'kotlin.jvm.functions';
  import { Unit } from 'kotlin';

  interface AbstractConfigEntry<T = any> extends ConfigEntry<T>, AbstractReadonlyConfigEntry<T> {}
  class AbstractConfigEntry<T = any> extends ConfigEntry<T> {
    constructor(fieldName: string, defaultValue: T);
    defaultValue(): T;
    modifyGet(modifier: UnaryOperator<T>): ConfigEntry<T>;
    modifySet(modifier: UnaryOperator<T>): ConfigEntry<T>;
    set(value: T): void;
  }


  interface AbstractReadonlyConfigEntry<T = any> extends ReadonlyConfigEntry<T> {}
  class AbstractReadonlyConfigEntry<T = any> extends ReadonlyConfigEntry<T> {
    constructor(fieldName: string);
    fieldName(): string;
    get (): T;
    modifyGet(modifier: UnaryOperator<T>): ReadonlyConfigEntry<T>;
  }


  interface CodecConfig<S extends CodecConfig<S> = any> extends EntryAddable, Codec<S> {}
  class CodecConfig<S extends CodecConfig<S> = any> extends EntryAddable {
    constructor();
    decode<R>(ops: DynamicOps<R>, input: R): DataResult<Pair<S, R>>;
    decode<R>(encoded: R, ops: DynamicOps<R>): boolean;
    encode<R>(input: S, ops: DynamicOps<R>, prefix: R): DataResult<R>;
    encode<R>(ops: DynamicOps<R>, prefix: R): DataResult<R>;
    encodeStart<R>(ops: DynamicOps<R>): DataResult<R>;
    register<T>(fieldName: string, defaultValue: T, codec: Codec<T>): ConfigEntry<T>;
    register<T extends CodecConfig<T>>(fieldName: string, configInstance: T): ReadonlyConfigEntry<T>;
  }


  interface ConfigEntry<T = any> extends ReadonlyConfigEntry<T> {}
  class ConfigEntry<T = any> extends ReadonlyConfigEntry<T> {
    asBinding(): Binding<T>;
    defaultValue(): T;
    modifyGet(var1: UnaryOperator<T>): ConfigEntry<T>;
    modifySet(var1: UnaryOperator<T>): ConfigEntry<T>;
    onGet(consumer: Consumer<T>): ConfigEntry<T>;
    onSet(consumer: Consumer<T>): ConfigEntry<T>;
    set(var1: T): void;
  }


  class EntryAddable {
    register<T>(var1: string, var2: T, var3: Codec<T>): ConfigEntry<T>;
    register<T extends CodecConfig<T>>(var1: string, var2: T): ReadonlyConfigEntry<T>;
  }


  interface JsonFileCodecConfig<T extends JsonFileCodecConfig<T> = any> extends CodecConfig<T> {}
  class JsonFileCodecConfig<T extends JsonFileCodecConfig<T> = any> extends CodecConfig<T> {
    constructor(configPath: Path);
    loadFromFile(): boolean;
    saveToFile(): void;
  }


  class KotlinExtsKt {
    static getDefault<T>($this$default: ConfigEntry<T>): T;
    static getFieldName($this$fieldName: ConfigEntry<any>): string;
    static getValue<T extends CodecConfig<T>>($this$getValue: T, thisRef: CodecConfig<any>, property: KProperty<any>): T;
    static getValue<T>($this$value: ConfigEntry<T>): T;
    static register<T>($this$register: EntryAddable, t: T, codec: Codec<T>): PropertyDelegateProvider<EntryAddable, ReadOnlyProperty<EntryAddable, ConfigEntry<T>>>;
    static register<T extends CodecConfig<T>>($this$register: EntryAddable, fieldName: string, configInstance: T): PropertyDelegateProvider<EntryAddable, T>;
    static register<T>($this$register: OptionRegistrar, configEntry: ConfigEntry<T>, block: Function1<OptionDsl<T>, Unit>): Option<T>;
    static register$default(entryAddable: EntryAddable, string: string, codecConfig: CodecConfig, n: number, object: any): PropertyDelegateProvider;
    static setValue<T>($this$value: ConfigEntry<T>, value: T): void;
  }


  class ReadonlyConfigEntry<T = any> {
    decode<R>(var1: R, var2: DynamicOps<R>): boolean;
    encode<R>(var1: DynamicOps<R>, var2: RecordBuilder<R>): RecordBuilder<R>;
    fieldName(): string;
    get (): T;
    modifyGet(var1: UnaryOperator<T>): ReadonlyConfigEntry<T>;
    onGet(consumer: Consumer<T>): ReadonlyConfigEntry<T>;
  }

}

declare module 'dev.isxander.yacl3.debug' {
  class DebugProperties {
    static readonly IMAGE_FILTERING: boolean;
  }

}

declare module 'dev.isxander.yacl3.dsl' {
  import { CompletableFuture } from 'java.util.concurrent';
  import { Function1, Function0, Function2 } from 'kotlin.jvm.functions';
  import { Unit } from 'kotlin';
  import { Option, YetAnotherConfigLib, ButtonOption, ConfigCategory, OptionGroup, Binding, OptionDescription, LabelOption } from 'dev.isxander.yacl3.api';
  import { Builder } from 'dev.isxander.yacl3.api.ButtonOption';
  import { Builder as dev_isxander_yacl3_api_optiondescription_Builder } from 'dev.isxander.yacl3.api.OptionDescription';
  import { Integer, Boolean, Long, Float, Double, Iterable, Class, Enum } from 'java.lang';
  import { Component } from 'net.minecraft.network.chat';
  import { ControllerBuilder, ValueFormatter } from 'dev.isxander.yacl3.api.controller';
  import { IntRange, LongRange, ClosedRange } from 'kotlin.ranges';
  import { Color } from 'java.awt';
  import { Item } from 'net.minecraft.world.item';
  import { ReadOnlyProperty } from 'kotlin.properties';
  import { KProperty, KMutableProperty0 } from 'kotlin.reflect';
  import { Builder as dev_isxander_yacl3_api_option_Builder } from 'dev.isxander.yacl3.api.Option';
  import { Builder as dev_isxander_yacl3_api_optiongroup_Builder } from 'dev.isxander.yacl3.api.OptionGroup';
  import { Logger } from 'org.slf4j';
  import { Companion } from 'dev.isxander.yacl3.dsl.TextLineBuilderDsl';

  class APIKt {
    static YetAnotherConfigLib(id: string, block: Function1<RootDsl, Unit>): YetAnotherConfigLib;
    static futureRef<T>($this$futureRef: CompletableFuture<OptionRegistrar>, id: string): CompletableFuture<Option<T>>;
    static futureRef<T>($this$futureRef: CompletableFuture<OptionRegistrar>): RegisterableDelegateProvider<CompletableFuture<Option<T>>>;
    static get<T>($this$get: CompletableFuture<ParentRegistrar<any, any, T>>, id: string, it: ParentRegistrar<any, any, T>): CompletableFuture<T>;
    static onReady<T>($this$onReady: CompletableFuture<T>, block: Function1<T, Unit>): CompletableFuture<T>;
  }


  class Buildable<T = any> {
    build(): T;
    get built(): CompletableFuture<T>;
  }


  interface ButtonOptionDsl extends Builder, Buildable<ButtonOption> {}
  class ButtonOptionDsl extends Builder {
    addDefaultText(var1: dev_isxander_yacl3_api_optiondescription_Builder, var2: number): void;
    get optionId(): string;
    get optionKey(): string;
    get thisOption(): CompletableFuture<ButtonOption>;
  }


  interface CategoryDsl extends Buildable<ConfigCategory> {}
  class CategoryDsl extends Buildable<ConfigCategory> {
    get categoryId(): string;
    get categoryKey(): string;
    get groups(): ParentRegistrar<OptionGroup, GroupDsl, OptionRegistrar>;
    get rootOptions(): OptionRegistrar;
    get thisCategory(): CompletableFuture<ConfigCategory>;
    name(var1: Component): void;
    name(var1: Function0<Component>): void;
    tooltip(...var1: Component[]): void;
    tooltip(var1: Function1<TextLineBuilderDsl, Unit>): void;
  }


  class ControllersKt {
    static colorPicker(allowAlpha: boolean): Function1<Option<Color>, ControllerBuilder<Color>>;
    static colorPicker$default(bl: boolean, n: number, object: any): Function1;
    static cyclingList<T>(values: Iterable<T>, formatter: ValueFormatter<T>): Function1<Option<T>, ControllerBuilder<T>>;
    static cyclingList$default(iterable: Iterable, valueFormatter: ValueFormatter, n: number, object: any): Function1;
    static enumDropdown<T extends Enum<T>>(formatter: ValueFormatter<T>): Function1<Option<T>, ControllerBuilder<T>>;
    static enumDropdown$default(valueFormatter: ValueFormatter, n: number, object: any): Function1;
    static enumSwitch<T extends Enum<T>>(enumClass: Class<T>, formatter: ValueFormatter<T>): Function1<Option<T>, ControllerBuilder<T>>;
    static enumSwitch<T extends Enum<T>>(formatter: ValueFormatter<T>): Function1<Option<T>, ControllerBuilder<T>>;
    static enumSwitch$default(clazz: Class, valueFormatter: ValueFormatter, n: number, object: any): Function1;
    static enumSwitch$default(formatter: ValueFormatter, n: number, object: any): Function1;
    static minecraftItem(): Function1<Option<Item>, ControllerBuilder<Item>>;
    static numberField(min: number, max: number, formatter: ValueFormatter<number>): Function1<Option<number>, ControllerBuilder<number>>;
    static numberField(min: Long, max: Long, formatter: ValueFormatter<Long>): Function1<Option<Long>, ControllerBuilder<Long>>;
    static numberField(min: number, max: number, formatter: ValueFormatter<number>): Function1<Option<number>, ControllerBuilder<number>>;
    static numberField(min: number, max: number, formatter: ValueFormatter<number>): Function1<Option<number>, ControllerBuilder<number>>;
    static numberField$default(n: number, n2: number, valueFormatter: ValueFormatter, n3: number, object: any): Function1;
    static numberField$default(l: Long, l2: Long, valueFormatter: ValueFormatter, n: number, object: any): Function1;
    static numberField$default(f: number, f2: number, valueFormatter: ValueFormatter, n: number, object: any): Function1;
    static numberField$default(d: number, d2: number, valueFormatter: ValueFormatter, n: number, object: any): Function1;
    static slider(range: IntRange, step: number, formatter: ValueFormatter<number>): Function1<Option<number>, ControllerBuilder<number>>;
    static slider(range: LongRange, step: number, formatter: ValueFormatter<Long>): Function1<Option<Long>, ControllerBuilder<Long>>;
    static slider(range: ClosedRange<number>, step: number, formatter: ValueFormatter<number>): Function1<Option<number>, ControllerBuilder<number>>;
    static slider(range: ClosedRange<number>, step: number, formatter: ValueFormatter<number>): Function1<Option<number>, ControllerBuilder<number>>;
    static slider$default(intRange: IntRange, n: number, valueFormatter: ValueFormatter, n2: number, object: any): Function1;
    static slider$default(longRange: LongRange, l: number, valueFormatter: ValueFormatter, n: number, object: any): Function1;
    static slider$default(closedRange: ClosedRange, f: number, valueFormatter: ValueFormatter, n: number, object: any): Function1;
    static slider$default(closedRange: ClosedRange, d: number, valueFormatter: ValueFormatter, n: number, object: any): Function1;
    static stringField(): Function1<Option<string>, ControllerBuilder<string>>;
    static textSwitch(formatter: ValueFormatter<boolean>): Function1<Option<boolean>, ControllerBuilder<boolean>>;
    static textSwitch$default(valueFormatter: ValueFormatter, n: number, object: any): Function1;
    static tickBox(): Function1<Option<boolean>, ControllerBuilder<boolean>>;
  }


  interface ExistingDelegateProvider<Return = any> extends ReadOnlyProperty<any, Return> {}
  class ExistingDelegateProvider<Return = any> extends ReadOnlyProperty<any, Return> {
    constructor(delegate: Return);
    getValue(thisRef: any, property: KProperty<any>): Return;
  }


  class ExtensionsKt {
    static addDefaultText($this$addDefaultText: dev_isxander_yacl3_api_optiondescription_Builder, prefix: string, lines: number): void;
    static addDefaultText$default(builder: dev_isxander_yacl3_api_optiondescription_Builder, string: string, n: number, n2: number, object: any): void;
    static available($this$available: dev_isxander_yacl3_api_option_Builder<any>, block: Function0<boolean>): void;
    static binding<T>($this$binding: dev_isxander_yacl3_api_option_Builder<T>, property: KMutableProperty0<T>, t: T): void;
    static controller<T, B extends ControllerBuilder<T>>($this$controller: dev_isxander_yacl3_api_option_Builder<T>, builder: Function1<Option<T>, B>, block: Function1<B, Unit>): void;
    static controller$default(builder: dev_isxander_yacl3_api_option_Builder, function1: Function1, function12: Function1, n: number, object: any): void;
    static descriptionBuilder($this$descriptionBuilder: dev_isxander_yacl3_api_option_Builder<any>, block: Function1<dev_isxander_yacl3_api_optiondescription_Builder, Unit>): void;
    static descriptionBuilder($this$descriptionBuilder: Builder, block: Function1<dev_isxander_yacl3_api_optiondescription_Builder, Unit>): void;
    static descriptionBuilder($this$descriptionBuilder: dev_isxander_yacl3_api_optiongroup_Builder, block: Function1<dev_isxander_yacl3_api_optiondescription_Builder, Unit>): void;
    static descriptionBuilderDyn<T>($this$descriptionBuilderDyn: dev_isxander_yacl3_api_option_Builder<T>, block: Function2<dev_isxander_yacl3_api_optiondescription_Builder, T, Unit>): void;
    static getAvailable($this$available: dev_isxander_yacl3_api_option_Builder<any>): boolean;
    static getBinding<T>($this$binding: dev_isxander_yacl3_api_option_Builder<T>): Binding<T>;
    static getController<T>($this$controller: dev_isxander_yacl3_api_option_Builder<T>): Function1<Option<T>, ControllerBuilder<T>>;
    static setAvailable($this$available: dev_isxander_yacl3_api_option_Builder<any>, value: boolean): void;
    static setBinding<T>($this$binding: dev_isxander_yacl3_api_option_Builder<T>, value: Binding<T>): void;
    static setController<T>($this$controller: dev_isxander_yacl3_api_option_Builder<T>, value: Function1<Option<T>, ControllerBuilder<T>>): void;
    static text($this$text: dev_isxander_yacl3_api_optiondescription_Builder, block: Function0<Component>): void;
  }


  interface GroupDsl extends Buildable<OptionGroup> {}
  class GroupDsl extends Buildable<OptionGroup> {
    addDefaultText(var1: dev_isxander_yacl3_api_optiondescription_Builder, var2: number): void;
    collapsed(var1: boolean): void;
    description(var1: OptionDescription): void;
    descriptionBuilder(var1: Function1<dev_isxander_yacl3_api_optiondescription_Builder, Unit>): void;
    get groupId(): string;
    get groupKey(): string;
    get options(): OptionRegistrar;
    get thisGroup(): CompletableFuture<OptionGroup>;
    getCollapsed(): boolean;
    name(var1: Component): void;
    name(var1: Function0<Component>): void;
    setCollapsed(var1: boolean): void;
  }


  class ImplKt {
    static access$getLOGGER$p(): Logger;
  }


  interface OptionDsl<T = any> extends dev_isxander_yacl3_api_option_Builder<T>, Buildable<Option> {}
  class OptionDsl<T = any> extends dev_isxander_yacl3_api_option_Builder<T> {
    addDefaultText(var1: dev_isxander_yacl3_api_optiondescription_Builder, var2: number): void;
    get optionId(): string;
    get optionKey(): string;
    get thisOption(): CompletableFuture<Option<T>>;
  }


  class OptionRegistrar {
    futureRef<T>(var1: string): CompletableFuture<Option<T>>;
    futureRef<T>(): RegisterableDelegateProvider<CompletableFuture<Option<T>>>;
    get registeringLabel(): RegisterableDelegateProvider<LabelOption>;
    ref<T>(var1: string): ReadOnlyProperty<any, Option<T>>;
    register<T, OPT extends Option<T>>(var1: string, var2: OPT): OPT;
    register<T>(var1: string, var2: Function1<OptionDsl<T>, Unit>): Option<T>;
    registerButton(var1: string, var2: Function1<ButtonOptionDsl, Unit>): ButtonOption;
    registerLabel(var1: string): LabelOption;
    registerLabel(var1: string, var2: Component): LabelOption;
    registerLabel(var1: string, var2: Function1<TextLineBuilderDsl, Unit>): LabelOption;
    registering<T>(var1: string, var2: Function1<OptionDsl<T>, Unit>): RegisterableActionDelegateProvider<OptionDsl<T>, Option<T>>;
    registeringButton(var1: string, var2: Function1<ButtonOptionDsl, Unit>): RegisterableActionDelegateProvider<ButtonOptionDsl, ButtonOption>;
  }


  class ParentRegistrar<T = any, DSL = any, INNER = any> {
    futureRef(var1: string): CompletableFuture<T>;
    get(var1: string): CompletableFuture<INNER>;
    getFutureRef(): ReadOnlyProperty<any, CompletableFuture<T>>;
    getRef(): ReadOnlyProperty<any, T>;
    ref(var1: string): T;
    register(var1: string, var2: T): T;
    register(var1: string, var2: Function1<DSL, Unit>): T;
    registering(var1: string, var2: Function1<DSL, Unit>): RegisterableActionDelegateProvider<DSL, T>;
  }


  class RegisterableActionDelegateProvider<Dsl = any, Return = any> {
    constructor(registerFunction: Function2<string, Function1<Dsl, Unit>, Return>, action: Function1<Dsl, Unit>, name: string);
    provideDelegate(thisRef: any, property: KProperty<any>): ExistingDelegateProvider<Return>;
  }


  class RegisterableDelegateProvider<R = any> {
    constructor(registerFunction: Function1<string, R>, id: string);
    provideDelegate(thisRef: any, property: KProperty<any>): ExistingDelegateProvider<R>;
  }


  class RootDsl {
    get categories(): ParentRegistrar<ConfigCategory, CategoryDsl, ParentRegistrar<OptionGroup, GroupDsl, OptionRegistrar>>;
    get rootId(): string;
    get rootKey(): string;
    get thisRoot(): CompletableFuture<YetAnotherConfigLib>;
    save(var1: Function0<Unit>): void;
    screenInit(var1: Function0<Unit>): void;
    title(var1: Component): void;
    title(var1: Function0<Component>): void;
  }


  class TextLineBuilderDsl {
    static readonly Companion: Companion;
    text(var1: Component): void;
    text(var1: Function0<Component>): void;
    unaryPlus(var1: Component): void;
  }

}

declare module 'dev.isxander.yacl3.dsl.ButtonOptionDsl' {
  import { ButtonOptionDsl } from 'dev.isxander.yacl3.dsl';
  import { Builder } from 'dev.isxander.yacl3.api.OptionDescription';
  import { Integer } from 'java.lang';

  class DefaultImpls {
    static addDefaultText($this: ButtonOptionDsl, $receiver: Builder, lines: number): void;
    static addDefaultText$default(buttonOptionDsl: ButtonOptionDsl, builder: Builder, n: number, n2: number, object: any): void;
  }

}

declare module 'dev.isxander.yacl3.dsl.GroupDsl' {
  import { GroupDsl } from 'dev.isxander.yacl3.dsl';
  import { Builder } from 'dev.isxander.yacl3.api.OptionDescription';
  import { Integer } from 'java.lang';

  class DefaultImpls {
    static addDefaultText($this: GroupDsl, $receiver: Builder, lines: number): void;
    static addDefaultText$default(groupDsl: GroupDsl, builder: Builder, n: number, n2: number, object: any): void;
  }

}

declare module 'dev.isxander.yacl3.dsl.OptionDsl' {
  import { OptionDsl } from 'dev.isxander.yacl3.dsl';
  import { Builder } from 'dev.isxander.yacl3.api.OptionDescription';
  import { Integer } from 'java.lang';

  class DefaultImpls {
    static addDefaultText<T>($this: OptionDsl<T>, $receiver: Builder, lines: number): void;
    static addDefaultText$default(optionDsl: OptionDsl, builder: Builder, n: number, n2: number, object: any): void;
  }

}

declare module 'dev.isxander.yacl3.dsl.OptionRegistrar' {
  import { RegisterableActionDelegateProvider, OptionRegistrar } from 'dev.isxander.yacl3.dsl';
  import { Function1 } from 'kotlin.jvm.functions';
  import { ReadOnlyProperty } from 'kotlin.properties';

  class DefaultImpls {
    static ref$default(optionRegistrar: OptionRegistrar, string: string, n: number, object: any): ReadOnlyProperty;
    static registering$default(optionRegistrar: OptionRegistrar, string: string, function1: Function1, n: number, object: any): RegisterableActionDelegateProvider;
    static registeringButton$default(optionRegistrar: OptionRegistrar, string: string, function1: Function1, n: number, object: any): RegisterableActionDelegateProvider;
  }

}

declare module 'dev.isxander.yacl3.dsl.ParentRegistrar' {
  import { RegisterableActionDelegateProvider, ParentRegistrar } from 'dev.isxander.yacl3.dsl';
  import { Function1 } from 'kotlin.jvm.functions';

  class DefaultImpls {
    static registering$default(parentRegistrar: ParentRegistrar, string: string, function1: Function1, n: number, object: any): RegisterableActionDelegateProvider;
  }

}

declare module 'dev.isxander.yacl3.dsl.TextLineBuilderDsl' {
  import { Component } from 'net.minecraft.network.chat';
  import { Function1, Function0 } from 'kotlin.jvm.functions';
  import { TextLineBuilderDsl } from 'dev.isxander.yacl3.dsl';
  import { Unit } from 'kotlin';

  class Companion {
    createText(block: Function1<TextLineBuilderDsl, Unit>): Component;
  }


  interface Delegate extends TextLineBuilderDsl {}
  class Delegate extends TextLineBuilderDsl {
    constructor(tooltipFunction: Function1<Component, Unit>);
    text(component: Component): void;
    text(block: Function0<Component>): void;
    unaryPlus($this$unaryPlus: Component): void;
  }

}

declare module 'dev.isxander.yacl3.gui' {
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { Renderable, ContainerObjectSelectionList, AbstractWidget as net_minecraft_client_gui_components_AbstractWidget, Button, Tooltip, EditBox, MultiLineLabel } from 'net.minecraft.client.gui.components';
  import { NarratableEntry, NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { Dimension } from 'dev.isxander.yacl3.api.utils';
  import { Integer, Float } from 'java.lang';
  import { NarrationPriority } from 'NarratableEntry';
  import { LayoutElement } from 'net.minecraft.client.gui.layouts';
  import { Minecraft } from 'net.minecraft.client';
  import { GuiGraphics, ComponentPath, Font } from 'net.minecraft.client.gui';
  import { ScreenRectangle, FocusNavigationEvent } from 'net.minecraft.client.gui.navigation';
  import { Consumer, Supplier } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';
  import { OnPress } from 'Button';
  import { Entry } from 'dev.isxander.yacl3.gui.OptionListWidget';
  import { ConfigCategory, YetAnotherConfigLib } from 'dev.isxander.yacl3.api';
  import { List } from 'java.util';
  import { ConfirmScreen, Screen } from 'net.minecraft.client.gui.screens';
  import { ValueFormatter } from 'dev.isxander.yacl3.api.controller';
  import { TabManager } from 'net.minecraft.client.gui.components.tabs';
  import { ScrollableNavigationBar } from 'dev.isxander.yacl3.gui.tab';
  import { ControllerPopupWidget } from 'dev.isxander.yacl3.gui.controllers';
  import { ClientTooltipPositioner } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { Vector2ic } from 'org.joml';

  interface AbstractWidget extends GuiEventListener, Renderable, NarratableEntry {}
  class AbstractWidget extends GuiEventListener {
    constructor(dim: Dimension<number>);
    canReset(): boolean;
    get dimension(): Dimension<number>;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    matchesSearch(query: string): boolean;
    narrationPriority(): NarrationPriority;
    playDownSound(): void;
    set dimension(dim: Dimension<number>);
    unfocus(): void;
    updateNarration(builder: NarrationElementOutput): void;
  }


  interface ElementListWidgetExt<E extends Entry<E> = any> extends LayoutElement, ContainerObjectSelectionList<E> {}
  class ElementListWidgetExt<E extends Entry<E> = any> extends LayoutElement {
    constructor(client: Minecraft, x: number, y: number, width: number, height: number, smoothScrolling: boolean);
    get scrollAmount(): number;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, horizontal: number, vertical: number): boolean;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    updateDimensions(rectangle: ScreenRectangle): void;
    visitWidgets(consumer: Consumer<net_minecraft_client_gui_components_AbstractWidget>): void;
  }


  interface LowProfileButtonWidget extends Button {}
  class LowProfileButtonWidget extends Button {
    constructor(x: number, y: number, width: number, height: number, message: Component, onPress: OnPress);

    constructor(x: number, y: number, width: number, height: number, message: Component, onPress: OnPress, tooltip: Tooltip);
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, deltaTicks: number): void;
  }


  interface OptionDescriptionWidget extends net_minecraft_client_gui_components_AbstractWidget {}
  class OptionDescriptionWidget extends net_minecraft_client_gui_components_AbstractWidget {
    constructor(dimensions: Supplier<ScreenRectangle>, description: DescriptionWithName);
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, horizontal: number, vertical: number): boolean;
    nextFocusPath(event: FocusNavigationEvent): ComponentPath;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    setOptionDescription(description: DescriptionWithName): void;
    tick(): void;
  }


  interface OptionListWidget extends ElementListWidgetExt<Entry> {}
  class OptionListWidget extends ElementListWidgetExt<Entry> {
    constructor(screen: YACLScreen, category: ConfigCategory, client: Minecraft, x: number, y: number, width: number, height: number, hoverEvent: Consumer<DescriptionWithName>);
    addEntry(index: number, entry: Entry): void;
    addEntryBelow(below: Entry, entry: Entry): void;
    addEntryBelowWithoutScroll(below: Entry, entry: Entry): void;
    charTyped(chr: string, modifiers: number): boolean;
    children(): Entry[];
    expandAllGroups(): void;
    get defaultEntryDimension(): Dimension<number>;
    get rowLeft(): number;
    get rowWidth(): number;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, deltaX: number, deltaY: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, horizontal: number, vertical: number): boolean;
    recacheViewableChildren(): void;
    refreshOptions(): void;
    removeEntry(entry: Entry): boolean;
    removeEntryFromTop(entry: Entry): boolean;
    updateSearchQuery(query: string): void;
  }


  interface RequireRestartScreen extends ConfirmScreen {}
  class RequireRestartScreen extends ConfirmScreen {
    constructor(parent: Screen);
  }


  interface SearchFieldWidget extends EditBox {}
  class SearchFieldWidget extends EditBox {
    constructor(yaclScreen: YACLScreen, font: Font, x: number, y: number, width: number, height: number, text: Component, emptyText: Component, updateConsumer: Consumer<string>);
    get emptyText(): Component;
    get query(): string;
    isEmpty(): boolean;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    set emptyText(emptyText: Component);
  }


  interface TextScaledButtonWidget extends TooltipButtonWidget {}
  class TextScaledButtonWidget extends TooltipButtonWidget {
    textScale: number;
    constructor(screen: Screen, x: number, y: number, width: number, height: number, textScale: number, message: Component, tooltip: Component, onPress: OnPress);

    constructor(screen: Screen, x: number, y: number, width: number, height: number, textScale: number, message: Component, onPress: OnPress);
    renderString(graphics: GuiGraphics, textRenderer: Font, color: number): void;
  }


  interface TooltipButtonWidget extends Button {}
  class TooltipButtonWidget extends Button {
    constructor(screen: Screen, x: number, y: number, width: number, height: number, message: Component, tooltip: Component, onPress: OnPress);
  }


  class ValueFormatters {
    static percent(decimalPlaces: number): ValueFormatter<number>;
  }


  interface YACLScreen extends Screen {}
  class YACLScreen extends Screen {
    readonly config: YetAnotherConfigLib;
    readonly tabManager: TabManager;
    tabNavigationBar: ScrollableNavigationBar;
    tabArea: ScreenRectangle;
    saveButtonMessage: Component;
    saveButtonTooltipMessage: Tooltip;
    currentPopupController: ControllerPopupWidget;
    popupControllerVisible: boolean;
    constructor(config: YetAnotherConfigLib, parent: Screen);
    addPopupControllerWidget(controllerPopupWidget: ControllerPopupWidget<any>): void;
    cancelOrReset(): void;
    clearPopupControllerWidget(): void;
    finishOrSave(): void;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, deltaX: number, deltaY: number): boolean;
    onClose(): void;
    pendingChanges(): boolean;
    renderBackground(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    static renderMultilineTooltip(graphics: GuiGraphics, font: Font, text: MultiLineLabel, centerX: number, yAbove: number, yBelow: number, screenWidth: number, screenHeight: number): void;
    setSaveButtonMessage(message: Component, tooltip: Component): void;
    shouldCloseOnEsc(): boolean;
    tick(): void;
    undo(): void;
  }


  interface YACLTooltipPositioner extends ClientTooltipPositioner {}
  class YACLTooltipPositioner extends ClientTooltipPositioner {
    constructor(widget: net_minecraft_client_gui_components_AbstractWidget);

    constructor(widget: AbstractWidget);

    constructor(buttonDimensions: Supplier<ScreenRectangle>);
    positionTooltip(guiWidth: number, guiHeight: number, x: number, y: number, width: number, height: number): Vector2ic;
  }

}

declare module 'dev.isxander.yacl3.gui.controllers' {
  import { Controller, ButtonOption, Option, ListOptionEntry } from 'dev.isxander.yacl3.api';
  import { BiConsumer, Function } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';
  import { AbstractWidget, YACLScreen } from 'dev.isxander.yacl3.gui';
  import { Dimension } from 'dev.isxander.yacl3.api.utils';
  import { Integer, Boolean } from 'java.lang';
  import { ValueFormatter } from 'dev.isxander.yacl3.api.controller';
  import { IStringController } from 'dev.isxander.yacl3.gui.controllers.string';
  import { Color } from 'java.awt';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ColorControllerElement } from 'dev.isxander.yacl3.gui.controllers.ColorController';
  import { GuiGraphics, ComponentPath } from 'net.minecraft.client.gui';
  import { GuiEventListener, ContainerEventHandler } from 'net.minecraft.client.gui.components.events';
  import { FocusNavigationEvent } from 'net.minecraft.client.gui.navigation';
  import { NarrationPriority } from 'NarratableEntry';
  import { NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { List } from 'java.util';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Minecraft } from 'net.minecraft.client';

  interface ActionController extends Controller<BiConsumer> {}
  class ActionController extends Controller<BiConsumer> {
    static readonly DEFAULT_TEXT: Component;
    constructor(option: ButtonOption);

    constructor(option: ButtonOption, text: Component);
    formatValue(): Component;
    option(): ButtonOption;
    provideWidget(screen: YACLScreen, widgetDimension: Dimension<number>): AbstractWidget;
  }


  interface BooleanController extends Controller<boolean> {}
  class BooleanController extends Controller<boolean> {
    static readonly ON_OFF_FORMATTER: Function;
    static readonly TRUE_FALSE_FORMATTER: Function;
    static readonly YES_NO_FORMATTER: Function;
    constructor(option: Option<boolean>);

    constructor(option: Option<boolean>, coloured: boolean);

    constructor(option: Option<boolean>, valueFormatter: Function<boolean, Component>, coloured: boolean);
    coloured(): boolean;
    static createInternal(option: Option<boolean>, formatter: ValueFormatter<boolean>, coloured: boolean): BooleanController;
    formatValue(): Component;
    option(): Option<boolean>;
    provideWidget(screen: YACLScreen, widgetDimension: Dimension<number>): AbstractWidget;
  }


  interface ColorController extends IStringController<Color> {}
  class ColorController extends IStringController<Color> {
    constructor(option: Option<Color>);

    constructor(option: Option<Color>, allowAlpha: boolean);
    allowAlpha(): boolean;
    formatValue(): Component;
    get string(): string;
    option(): Option<Color>;
    provideWidget(screen: YACLScreen, widgetDimension: Dimension<number>): AbstractWidget;
    setFromString(value: string): void;
  }


  interface ColorPickerWidget extends ControllerPopupWidget<ColorController> {}
  class ColorPickerWidget extends ControllerPopupWidget<ColorController> {
    static readonly COLOR_PICKER_SPRITE: ResourceLocation;
    static readonly TRANSPARENT_SPRITE: ResourceLocation;
    constructor(control: ColorController, screen: YACLScreen, dim: Dimension<number>, entryWidget: ColorControllerElement);
    charTyped(chr: string, modifiers: number): boolean;
    clickedAlphaSlider(mouseX: number, mouseY: number): boolean;
    clickedHueSlider(mouseX: number, mouseY: number): boolean;
    clickedSatLightGradient(mouseX: number, mouseY: number): boolean;
    close(): void;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, deltaX: number, deltaY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    popupTitle(): Component;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    renderBackground(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    setAlphaFromMouse(mouseX: number): void;
    setColorControllerFromHSL(): void;
    setColorFromMouseClick(mouseX: number, mouseY: number): void;
    setDimension(dim: Dimension<number>): void;
    setHueFromMouse(mouseX: number): void;
    setSatLightFromMouse(mouseX: number, mouseY: number): void;
    setThumbX(): void;
  }


  interface ControllerPopupWidget<T extends Controller<any> = any> extends GuiEventListener, ControllerWidget<Controller> {}
  class ControllerPopupWidget<T extends Controller<any> = any> extends GuiEventListener {
    readonly entryWidget: ControllerWidget;
    constructor(control: T, screen: YACLScreen, dim: Dimension<number>, entryWidget: ControllerWidget<any>);
    close(): void;
    entryWidget(): ControllerWidget<any>;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    popupTitle(): Component;
    renderBackground(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
  }


  interface ControllerWidget<T extends Controller<any> = any> extends AbstractWidget {}
  class ControllerWidget<T extends Controller<any> = any> extends AbstractWidget {
    constructor(control: T, screen: YACLScreen, dim: Dimension<number>);
    canReset(): boolean;
    isFocused(): boolean;
    isHovered(): boolean;
    matchesSearch(query: string): boolean;
    narrationPriority(): NarrationPriority;
    nextFocusPath(focusNavigationEvent: FocusNavigationEvent): ComponentPath;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    setFocused(focused: boolean): void;
    unfocus(): void;
    updateNarration(builder: NarrationElementOutput): void;
  }


  interface LabelController extends Controller<Component> {}
  class LabelController extends Controller<Component> {
    constructor(option: Option<Component>);
    formatValue(): Component;
    option(): Option<Component>;
    provideWidget(screen: YACLScreen, widgetDimension: Dimension<number>): AbstractWidget;
  }


  interface ListEntryWidget extends ContainerEventHandler, AbstractWidget {}
  class ListEntryWidget extends ContainerEventHandler {
    constructor(screen: YACLScreen, listOptionEntry: ListOptionEntry<any>, entryWidget: AbstractWidget);
    children(): GuiEventListener[];
    get focused(): GuiEventListener;
    isDragging(): boolean;
    matchesSearch(query: string): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    set focused(focused: GuiEventListener);
    setDragging(dragging: boolean): void;
    unfocus(): void;
    updateNarration(builder: NarrationElementOutput): void;
  }


  interface PopupControllerScreen extends Screen {}
  class PopupControllerScreen extends Screen {
    constructor(backgroundYaclScreen: YACLScreen, controllerPopup: ControllerPopupWidget<any>);
    charTyped(codePoint: string, modifiers: number): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseMoved(mouseX: number, mouseY: number): void;
    mouseScrolled(mouseX: number, mouseY: number, horizontal: number, vertical: number): boolean;
    onClose(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    renderBackground(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    resize(minecraft: Minecraft, width: number, height: number): void;
    tick(): void;
  }


  interface TickBoxController extends Controller<boolean> {}
  class TickBoxController extends Controller<boolean> {
    constructor(option: Option<boolean>);
    formatValue(): Component;
    option(): Option<boolean>;
    provideWidget(screen: YACLScreen, widgetDimension: Dimension<number>): AbstractWidget;
  }

}

declare module 'dev.isxander.yacl3.gui.controllers.ActionController' {
  import { ControllerWidget, ActionController } from 'dev.isxander.yacl3.gui.controllers';
  import { YACLScreen } from 'dev.isxander.yacl3.gui';
  import { Dimension } from 'dev.isxander.yacl3.api.utils';
  import { Integer } from 'java.lang';

  interface ActionControllerElement extends ControllerWidget<ActionController> {}
  class ActionControllerElement extends ControllerWidget<ActionController> {
    constructor(control: ActionController, screen: YACLScreen, dim: Dimension<number>);
    canReset(): boolean;
    executeAction(): void;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    matchesSearch(query: string): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
  }

}

declare module 'dev.isxander.yacl3.gui.controllers.BooleanController' {
  import { ControllerWidget, BooleanController } from 'dev.isxander.yacl3.gui.controllers';
  import { YACLScreen } from 'dev.isxander.yacl3.gui';
  import { Dimension } from 'dev.isxander.yacl3.api.utils';
  import { Integer } from 'java.lang';

  interface BooleanControllerElement extends ControllerWidget<BooleanController> {}
  class BooleanControllerElement extends ControllerWidget<BooleanController> {
    constructor(control: BooleanController, screen: YACLScreen, dim: Dimension<number>);
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    toggleSetting(): void;
  }

}

declare module 'dev.isxander.yacl3.gui.controllers.ColorController' {
  import { StringControllerElement } from 'dev.isxander.yacl3.gui.controllers.string';
  import { ColorController, ColorPickerWidget } from 'dev.isxander.yacl3.gui.controllers';
  import { YACLScreen } from 'dev.isxander.yacl3.gui';
  import { Dimension } from 'dev.isxander.yacl3.api.utils';
  import { Integer } from 'java.lang';
  import { Color } from 'java.awt';

  interface ColorControllerElement extends StringControllerElement {}
  class ColorControllerElement extends StringControllerElement {
    hoveredOverColorPreview: boolean;
    constructor(control: ColorController, screen: YACLScreen, dim: Dimension<number>);
    colorPickerVisible(): boolean;
    colorPickerWidget(): ColorPickerWidget;
    createColorPicker(): ColorPickerWidget;
    createOrRemoveColorPicker(): void;
    getPreviewOutlineColor(colorPreviewHovered: boolean): Color;
    isMouseOverColorPreview(mouseX: number, mouseY: number): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    removeColorPicker(): void;
    setDimension(dim: Dimension<number>): void;
    unfocus(): void;
    write(string: string): void;
  }

}

declare module 'dev.isxander.yacl3.gui.controllers.cycling' {
  import { ControllerWidget } from 'dev.isxander.yacl3.gui.controllers';
  import { YACLScreen, AbstractWidget } from 'dev.isxander.yacl3.gui';
  import { Dimension } from 'dev.isxander.yacl3.api.utils';
  import { Integer, Iterable, Class, Enum } from 'java.lang';
  import { Option, Controller } from 'dev.isxander.yacl3.api';
  import { Function } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';
  import { ValueFormatter } from 'dev.isxander.yacl3.api.controller';

  interface CyclingControllerElement extends ControllerWidget<ICyclingController> {}
  class CyclingControllerElement extends ControllerWidget<ICyclingController> {
    constructor(control: ICyclingController<any>, screen: YACLScreen, dim: Dimension<number>);
    cycleValue(increment: number): void;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
  }


  interface CyclingListController<T = any> extends ICyclingController<T> {}
  class CyclingListController<T = any> extends ICyclingController<T> {
    constructor(option: Option<T>, values: Iterable<T>);

    constructor(option: Option<T>, values: Iterable<T>, valueFormatter: Function<T, Component>);
    static createInternal<T>(option: Option<T>, values: Iterable<T>, formatter: ValueFormatter<T>): CyclingListController<T>;
    formatValue(): Component;
    get cycleLength(): number;
    get pendingValue(): number;
    option(): Option<T>;
    set pendingValue(ordinal: number);
  }


  interface EnumController<T extends Enum<T> = any> extends CyclingListController<T> {}
  class EnumController<T extends Enum<T> = any> extends CyclingListController<T> {
    constructor(option: Option<T>, enumClass: Class<T>);

    constructor(option: Option<T>, valueFormatter: Function<T, Component>, availableValues: T[]);
    static createInternal<T extends Enum<T>>(option: Option<T>, formatter: ValueFormatter<T>, values: T[]): EnumController<T>;
    static createInternal<T>(option: Option<T>, values: Iterable<T>, formatter: ValueFormatter<T>): CyclingListController<T>;
    static get defaultFormatter<T extends Enum<T>>(): Function<T, Component>;
  }


  interface ICyclingController<T = any> extends Controller<T> {}
  class ICyclingController<T = any> extends Controller<T> {
    get cycleLength(): number;
    get pendingValue(): number;
    provideWidget(screen: YACLScreen, widgetDimension: Dimension<number>): AbstractWidget;
    set pendingValue(var1: number);
  }

}

declare module 'dev.isxander.yacl3.gui.controllers.dropdown' {
  import { IStringController, StringControllerElement } from 'dev.isxander.yacl3.gui.controllers.string';
  import { Option } from 'dev.isxander.yacl3.api';
  import { List } from 'java.util';
  import { YACLScreen, AbstractWidget } from 'dev.isxander.yacl3.gui';
  import { Dimension } from 'dev.isxander.yacl3.api.utils';
  import { Integer, StringBuilder } from 'java.lang';
  import { Consumer } from 'java.util.function';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';
  import { ControllerPopupWidget } from 'dev.isxander.yacl3.gui.controllers';
  import { ValueFormatter } from 'dev.isxander.yacl3.api.controller';
  import { Item } from 'net.minecraft.world.item';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface AbstractDropdownController<T = any> extends IStringController<T> {}
  class AbstractDropdownController<T = any> extends IStringController<T> {
    readonly allowEmptyValue: boolean;
    readonly allowAnyValue: boolean;
    get allowedValues(): string[];
    getAllowedValues(inputField: string): string[];
    isValueValid(value: string): boolean;
    option(): Option<T>;
  }


  interface AbstractDropdownControllerElement<T = any, U = any> extends StringControllerElement {}
  class AbstractDropdownControllerElement<T = any, U = any> extends StringControllerElement {
    constructor(control: AbstractDropdownController<T>, screen: YACLScreen, dim: Dimension<number>);
    charTyped(chr: string, modifiers: number): boolean;
    computeMatchingValues(): U[];
    createDropdownWidget(): void;
    dropdownWidget(): DropdownWidget<T>;
    ensureValidValue(): void;
    getString(var1: U): string;
    isDropdownVisible(): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    matchingValue(value: string): boolean;
    modifyInput(builder: Consumer<StringBuilder>): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    removeDropdownWidget(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    setDimension(dim: Dimension<number>): void;
    setFocused(focused: boolean): void;
    shortenString(value: string): Component;
    unfocus(): void;
  }


  interface DropdownStringController extends AbstractDropdownController<string> {}
  class DropdownStringController extends AbstractDropdownController<string> {
    constructor(option: Option<string>, allowedValues: string[], allowEmptyValue: boolean, allowAnyValue: boolean);
    get string(): string;
    provideWidget(screen: YACLScreen, widgetDimension: Dimension<number>): AbstractWidget;
    setFromString(value: string): void;
  }


  interface DropdownStringControllerElement extends AbstractDropdownControllerElement<string, string> {}
  class DropdownStringControllerElement extends AbstractDropdownControllerElement<string, string> {
    constructor(control: DropdownStringController, screen: YACLScreen, dim: Dimension<number>);
    computeMatchingValues(): string[];
    getString(object: string): string;
  }


  interface DropdownWidget<T = any> extends ControllerPopupWidget<AbstractDropdownController> {}
  class DropdownWidget<T = any> extends ControllerPopupWidget<AbstractDropdownController> {
    static readonly MAX_SHOWN_NUMBER_OF_ITEMS: number;
    static readonly DROPDOWN_PADDING: number;
    constructor(control: AbstractDropdownController<T>, screen: YACLScreen, dim: Dimension<number>, dropdownElement: AbstractDropdownControllerElement<T, any>);
    charTyped(chr: string, modifiers: number): boolean;
    close(): void;
    dropdownLength(): number;
    entryHeight(): number;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    lastVisibleIndex(): number;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseMoved(mouseX: number, mouseY: number): void;
    mouseScrolled(mouseX: number, mouseY: number, horizontal: number, vertical: number): boolean;
    numberOfVisibleItems(): number;
    popupTitle(): Component;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    resetSelectedIndex(): void;
    scrollDown(): void;
    scrollUp(): void;
    selectNextEntry(): void;
    selectPreviousEntry(): void;
    selectVisibleItem(visibleIndex: number): void;
    selectedIndex(): number;
    selectedVisibleIndex(): number;
    setDimension(dim: Dimension<number>): void;
  }


  interface EnumDropdownController<E extends Enum<E> = any> extends AbstractDropdownController<E> {}
  class EnumDropdownController<E extends Enum<E> = any> extends AbstractDropdownController<E> {
    constructor(option: Option<E>, formatter: ValueFormatter<E>);
    get string(): string;
    isValueValid(value: string): boolean;
    provideWidget(screen: YACLScreen, widgetDimension: Dimension<number>): AbstractWidget;
    setFromString(value: string): void;
  }


  interface EnumDropdownControllerElement<E extends Enum<E> = any> extends AbstractDropdownControllerElement<E, string> {}
  class EnumDropdownControllerElement<E extends Enum<E> = any> extends AbstractDropdownControllerElement<E, string> {
    constructor(control: EnumDropdownController<E>, screen: YACLScreen, dim: Dimension<number>);
    computeMatchingValues(): string[];
    getString(object: string): string;
  }


  interface ItemController extends AbstractDropdownController<Item> {}
  class ItemController extends AbstractDropdownController<Item> {
    constructor(option: Option<Item>);
    formatValue(): Component;
    get string(): string;
    isValueValid(value: string): boolean;
    provideWidget(screen: YACLScreen, widgetDimension: Dimension<number>): AbstractWidget;
    setFromString(value: string): void;
  }


  interface ItemControllerElement extends AbstractDropdownControllerElement<Item, ResourceLocation> {}
  class ItemControllerElement extends AbstractDropdownControllerElement<Item, ResourceLocation> {
    constructor(control: ItemController, screen: YACLScreen, dim: Dimension<number>);
    computeMatchingValues(): ResourceLocation[];
    getString(identifier: ResourceLocation): string;
  }

}

declare module 'dev.isxander.yacl3.gui.controllers.LabelController' {
  import { AbstractWidget, YACLScreen } from 'dev.isxander.yacl3.gui';
  import { Dimension } from 'dev.isxander.yacl3.api.utils';
  import { Integer } from 'java.lang';
  import { GuiGraphics, ComponentPath } from 'net.minecraft.client.gui';
  import { FocusNavigationEvent } from 'net.minecraft.client.gui.navigation';
  import { NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { NarrationPriority } from 'NarratableEntry';

  interface LabelControllerElement extends AbstractWidget {}
  class LabelControllerElement extends AbstractWidget {
    constructor(screen: YACLScreen, dim: Dimension<number>);
    isFocused(): boolean;
    matchesSearch(query: string): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    narrationPriority(): NarrationPriority;
    nextFocusPath(focusNavigationEvent: FocusNavigationEvent): ComponentPath;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    setFocused(focused: boolean): void;
    updateNarration(builder: NarrationElementOutput): void;
  }

}

declare module 'dev.isxander.yacl3.gui.controllers.slider' {
  import { Double, Float, Integer, Long } from 'java.lang';
  import { Function } from 'java.util.function';
  import { Option, Controller } from 'dev.isxander.yacl3.api';
  import { Component } from 'net.minecraft.network.chat';
  import { ValueFormatter } from 'dev.isxander.yacl3.api.controller';
  import { AbstractWidget, YACLScreen } from 'dev.isxander.yacl3.gui';
  import { Dimension } from 'dev.isxander.yacl3.api.utils';
  import { ControllerWidget } from 'dev.isxander.yacl3.gui.controllers';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface DoubleSliderController extends ISliderController<number> {}
  class DoubleSliderController extends ISliderController<number> {
    static readonly DEFAULT_FORMATTER: Function;
    constructor(option: Option<number>, min: number, max: number, interval: number);

    constructor(option: Option<number>, min: number, max: number, interval: number, valueFormatter: Function<number, Component>);
    static createInternal(option: Option<number>, min: number, max: number, interval: number, formatter: ValueFormatter<number>): DoubleSliderController;
    formatValue(): Component;
    interval(): number;
    max(): number;
    min(): number;
    option(): Option<number>;
    pendingValue(): number;
    setPendingValue(value: number): void;
  }


  interface FloatSliderController extends ISliderController<number> {}
  class FloatSliderController extends ISliderController<number> {
    static readonly DEFAULT_FORMATTER: Function;
    constructor(option: Option<number>, min: number, max: number, interval: number);

    constructor(option: Option<number>, min: number, max: number, interval: number, valueFormatter: Function<number, Component>);
    static createInternal(option: Option<number>, min: number, max: number, interval: number, formatter: ValueFormatter<number>): FloatSliderController;
    formatValue(): Component;
    interval(): number;
    max(): number;
    min(): number;
    option(): Option<number>;
    pendingValue(): number;
    setPendingValue(value: number): void;
  }


  interface IntegerSliderController extends ISliderController<number> {}
  class IntegerSliderController extends ISliderController<number> {
    static readonly DEFAULT_FORMATTER: Function;
    constructor(option: Option<number>, min: number, max: number, interval: number);

    constructor(option: Option<number>, min: number, max: number, interval: number, valueFormatter: Function<number, Component>);
    static createInternal(option: Option<number>, min: number, max: number, interval: number, formatter: ValueFormatter<number>): IntegerSliderController;
    formatValue(): Component;
    interval(): number;
    max(): number;
    min(): number;
    option(): Option<number>;
    pendingValue(): number;
    setPendingValue(value: number): void;
  }


  interface ISliderController<T extends Number = any> extends Controller<T> {}
  class ISliderController<T extends Number = any> extends Controller<T> {
    interval(): number;
    max(): number;
    min(): number;
    pendingValue(): number;
    provideWidget(screen: YACLScreen, widgetDimension: Dimension<number>): AbstractWidget;
    range(): number;
    setPendingValue(var1: number): void;
  }


  interface LongSliderController extends ISliderController<Long> {}
  class LongSliderController extends ISliderController<Long> {
    static readonly DEFAULT_FORMATTER: Function;
    constructor(option: Option<Long>, min: number, max: number, interval: number);

    constructor(option: Option<Long>, min: number, max: number, interval: number, valueFormatter: Function<Long, Component>);
    static createInternal(option: Option<Long>, min: number, max: number, interval: number, formatter: ValueFormatter<Long>): LongSliderController;
    formatValue(): Component;
    interval(): number;
    max(): number;
    min(): number;
    option(): Option<Long>;
    pendingValue(): number;
    setPendingValue(value: number): void;
  }


  interface SliderControllerElement extends ControllerWidget<ISliderController> {}
  class SliderControllerElement extends ControllerWidget<ISliderController> {
    constructor(option: ISliderController<any>, screen: YACLScreen, dim: Dimension<number>, min: number, max: number, interval: number);
    incrementValue(amount: number): void;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, deltaX: number, deltaY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, horizontal: number, vertical: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    setDimension(dim: Dimension<number>): void;
  }

}

declare module 'dev.isxander.yacl3.gui.controllers.string' {
  import { Controller, Option } from 'dev.isxander.yacl3.api';
  import { Component } from 'net.minecraft.network.chat';
  import { AbstractWidget, YACLScreen } from 'dev.isxander.yacl3.gui';
  import { Dimension } from 'dev.isxander.yacl3.api.utils';
  import { Integer, StringBuilder } from 'java.lang';
  import { ControllerWidget } from 'dev.isxander.yacl3.gui.controllers';
  import { Consumer } from 'java.util.function';

  interface IStringController<T = any> extends Controller<T> {}
  class IStringController<T = any> extends Controller<T> {
    formatValue(): Component;
    get string(): string;
    isInputValid(input: string): boolean;
    provideWidget(screen: YACLScreen, widgetDimension: Dimension<number>): AbstractWidget;
    setFromString(var1: string): void;
  }


  interface StringController extends IStringController<string> {}
  class StringController extends IStringController<string> {
    constructor(option: Option<string>);
    get string(): string;
    option(): Option<string>;
    setFromString(value: string): void;
  }


  interface StringControllerElement extends ControllerWidget<IStringController> {}
  class StringControllerElement extends ControllerWidget<IStringController> {
    constructor(control: IStringController<any>, screen: YACLScreen, dim: Dimension<number>, instantApply: boolean);
    charTyped(chr: string, modifiers: number): boolean;
    get maxUnwrapLength(): number;
    get selectionEnd(): number;
    get selectionStart(): number;
    get unshiftedLength(): number;
    isHovered(): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    modifyInput(consumer: Consumer<StringBuilder>): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    setDimension(dim: Dimension<number>): void;
    setFocused(focused: boolean): void;
    unfocus(): void;
    write(string: string): void;
  }

}

declare module 'dev.isxander.yacl3.gui.controllers.string.number' {
  import { Double, Float, Integer, Long } from 'java.lang';
  import { Option } from 'dev.isxander.yacl3.api';
  import { Function } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';
  import { ValueFormatter } from 'dev.isxander.yacl3.api.controller';
  import { ISliderController } from 'dev.isxander.yacl3.gui.controllers.slider';
  import { IStringController } from 'dev.isxander.yacl3.gui.controllers.string';
  import { AbstractWidget, YACLScreen } from 'dev.isxander.yacl3.gui';
  import { Dimension } from 'dev.isxander.yacl3.api.utils';

  interface DoubleFieldController extends NumberFieldController<number> {}
  class DoubleFieldController extends NumberFieldController<number> {
    constructor(option: Option<number>, min: number, max: number, formatter: Function<number, Component>);

    constructor(option: Option<number>, min: number, max: number);

    constructor(option: Option<number>, formatter: Function<number, Component>);

    constructor(option: Option<number>);
    static createInternal(option: Option<number>, min: number, max: number, formatter: ValueFormatter<number>): DoubleFieldController;
    get string(): string;
    max(): number;
    min(): number;
    pendingValue(): number;
    setPendingValue(value: number): void;
  }


  interface FloatFieldController extends NumberFieldController<number> {}
  class FloatFieldController extends NumberFieldController<number> {
    constructor(option: Option<number>, min: number, max: number, formatter: Function<number, Component>);

    constructor(option: Option<number>, min: number, max: number);

    constructor(option: Option<number>, formatter: Function<number, Component>);

    constructor(option: Option<number>);
    static createInternal(option: Option<number>, min: number, max: number, formatter: ValueFormatter<number>): FloatFieldController;
    get string(): string;
    max(): number;
    min(): number;
    pendingValue(): number;
    setPendingValue(value: number): void;
  }


  interface IntegerFieldController extends NumberFieldController<number> {}
  class IntegerFieldController extends NumberFieldController<number> {
    constructor(option: Option<number>, min: number, max: number, formatter: Function<number, Component>);

    constructor(option: Option<number>, min: number, max: number);

    constructor(option: Option<number>, formatter: Function<number, Component>);

    constructor(option: Option<number>);
    static createInternal(option: Option<number>, min: number, max: number, formatter: ValueFormatter<number>): IntegerFieldController;
    get string(): string;
    max(): number;
    min(): number;
    pendingValue(): number;
    setPendingValue(value: number): void;
  }


  interface LongFieldController extends NumberFieldController<Long> {}
  class LongFieldController extends NumberFieldController<Long> {
    constructor(option: Option<Long>, min: number, max: number, formatter: Function<Long, Component>);

    constructor(option: Option<Long>, min: number, max: number);

    constructor(option: Option<Long>, formatter: Function<Long, Component>);

    constructor(option: Option<Long>);
    static createInternal(option: Option<Long>, min: number, max: number, formatter: ValueFormatter<Long>): LongFieldController;
    get string(): string;
    max(): number;
    min(): number;
    pendingValue(): number;
    setPendingValue(value: number): void;
  }


  interface NumberFieldController<T extends Number = any> extends ISliderController<T>, IStringController<T> {}
  class NumberFieldController<T extends Number = any> extends ISliderController<T> {
    constructor(option: Option<T>, displayFormatter: Function<T, Component>);
    formatValue(): Component;
    interval(): number;
    isInputValid(input: string): boolean;
    option(): Option<T>;
    pendingValue(): number;
    provideWidget(screen: YACLScreen, widgetDimension: Dimension<number>): AbstractWidget;
    setFromString(value: string): void;
  }

}

declare module 'dev.isxander.yacl3.gui.controllers.TickBoxController' {
  import { ControllerWidget, TickBoxController } from 'dev.isxander.yacl3.gui.controllers';
  import { YACLScreen } from 'dev.isxander.yacl3.gui';
  import { Dimension } from 'dev.isxander.yacl3.api.utils';
  import { Integer } from 'java.lang';

  interface TickBoxControllerElement extends ControllerWidget<TickBoxController> {}
  class TickBoxControllerElement extends ControllerWidget<TickBoxController> {
    constructor(control: TickBoxController, screen: YACLScreen, dim: Dimension<number>);
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    toggleSetting(): void;
  }

}

declare module 'dev.isxander.yacl3.gui.ElementListWidgetExt' {
  import { Entry as containerobjectselectionlist_Entry } from 'ContainerObjectSelectionList';

  interface Entry<E extends Entry<E> = any> extends containerobjectselectionlist_Entry<E> {}
  class Entry<E extends Entry<E> = any> extends containerobjectselectionlist_Entry<E> {
    get itemHeight(): number;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, deltaX: number, deltaY: number): boolean;
  }

}

declare module 'dev.isxander.yacl3.gui.image' {
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ImageSupplier } from 'dev.isxander.yacl3.gui.image.ImageRendererFactory';
  import { Optional } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { CompletableFuture, Executor } from 'java.util.concurrent';
  import { Supplier } from 'java.util.function';
  import { PreparableReloadListener, ResourceManager } from 'net.minecraft.server.packs.resources';
  import { Void } from 'java.lang';
  import { PreparationBarrier } from 'PreparableReloadListener';
  import { ProfilerFiller } from 'net.minecraft.util.profiling';

  class ImageRenderer {
    close(): void;
    render(var1: GuiGraphics, var2: number, var3: number, var4: number, var5: number): number;
    tick(): void;
  }


  class ImageRendererFactory {
    prepareImage(): ImageSupplier;
    requiresOffThreadPreparation(): boolean;
  }


  class ImageRendererManager {
    static closeAll(): void;
    static getImage<T extends ImageRenderer>(id: ResourceLocation): Optional<T>;
    static registerImage<T extends ImageRenderer>(id: ResourceLocation, factory: ImageRendererFactory): CompletableFuture<T>;
    static registerOrGetImage<T extends ImageRenderer>(id: ResourceLocation, factorySupplier: Supplier<ImageRendererFactory>): CompletableFuture<T>;
  }


  interface YACLImageReloadListener extends PreparableReloadListener {}
  class YACLImageReloadListener extends PreparableReloadListener {
    get id(): ResourceLocation;
    reload(preparationBarrier: PreparationBarrier, resourceManager: ResourceManager, preparationsProfiler: ProfilerFiller, reloadProfiler: ProfilerFiller, backgroundExecutor: Executor, gameExecutor: Executor): CompletableFuture<Void>;
  }

}

declare module 'dev.isxander.yacl3.gui.image.ImageRendererFactory' {
  import { ImageRendererFactory, ImageRenderer } from 'dev.isxander.yacl3.gui.image';

  interface OnThread extends ImageRendererFactory {}
  class OnThread extends ImageRendererFactory {
    requiresOffThreadPreparation(): boolean;
  }


  class ImageSupplier {
    completeImage(): ImageRenderer;
  }

}

declare module 'dev.isxander.yacl3.gui.image.impl' {
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ImageRendererFactory, ImageRenderer } from 'dev.isxander.yacl3.gui.image';
  import { Path } from 'java.nio.file';

  interface AnimatedDynamicTextureImage extends DynamicTextureImage {}
  class AnimatedDynamicTextureImage extends DynamicTextureImage {
    constructor(image: NativeImage, frameWidth: number, frameHeight: number, frameCount: number, frameDelayMS: number[], packCols: number, packRows: number, uniqueLocation: ResourceLocation);
    static createGIFFromPath(path: Path, uniqueLocation: ResourceLocation): ImageRendererFactory;
    static createGIFFromTexture(textureLocation: ResourceLocation): ImageRendererFactory;
    static createWEBPFromPath(path: Path, uniqueLocation: ResourceLocation): ImageRendererFactory;
    static createWEBPFromTexture(textureLocation: ResourceLocation): ImageRendererFactory;
    render(graphics: GuiGraphics, x: number, y: number, renderWidth: number, tickDelta: number): number;
  }


  interface DynamicTextureImage extends ImageRenderer {}
  class DynamicTextureImage extends ImageRenderer {
    constructor(image: NativeImage, location: ResourceLocation, textureFiltering: boolean);
    close(): void;
    static fromPath(imagePath: Path, location: ResourceLocation, textureFiltering: boolean): ImageRendererFactory;
    render(graphics: GuiGraphics, x: number, y: number, renderWidth: number, tickDelta: number): number;
  }


  interface ResourceTextureImage extends ImageRenderer {}
  class ResourceTextureImage extends ImageRenderer {
    constructor(location: ResourceLocation, u: number, v: number, width: number, height: number, textureWidth: number, textureHeight: number);
    close(): void;
    static createFactory(location: ResourceLocation, u: number, v: number, width: number, height: number, textureWidth: number, textureHeight: number): ImageRendererFactory;
    render(graphics: GuiGraphics, x: number, y: number, renderWidth: number, tickDelta: number): number;
  }

}

declare module 'dev.isxander.yacl3.gui.image.YACLImageReloadListener' {
  import { Collector } from 'java.util.stream';
  import { List, Set } from 'java.util';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Supplier, BiConsumer, BinaryOperator, Function } from 'java.util.function';
  import { Characteristics } from 'Collector';

  interface CompletableFutureCollector<X = any, T extends CompletableFuture<X> = any> extends Collector<T, List, CompletableFuture> {}
  class CompletableFutureCollector<X = any, T extends CompletableFuture<X> = any> extends Collector<T, List, CompletableFuture> {
    accumulator(): BiConsumer<T[], T>;
    static allOf<X, T extends CompletableFuture<X>>(): Collector<T, T[], CompletableFuture<X[]>>;
    characteristics(): Set<Characteristics>;
    combiner(): BinaryOperator<T[]>;
    finisher(): Function<T[], CompletableFuture<X[]>>;
    supplier(): Supplier<T[]>;
  }

}

declare module 'dev.isxander.yacl3.gui.OptionListWidget' {
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { NarratableEntry, NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { NarrationPriority } from 'NarratableEntry';
  import { ConfigCategory, Option, OptionGroup } from 'dev.isxander.yacl3.api';
  import { AbstractWidget } from 'dev.isxander.yacl3.gui';
  import { Entry as dev_isxander_yacl3_gui_elementlistwidgetext_Entry } from 'dev.isxander.yacl3.gui.ElementListWidgetExt';

  interface ListGroupSeparatorEntry extends GroupSeparatorEntry {}
  class ListGroupSeparatorEntry extends GroupSeparatorEntry {
    children(): GuiEventListener[];
    render(graphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, hovered: boolean, tickDelta: number): void;
    setExpanded(expanded: boolean): void;
  }


  interface GroupSeparatorEntry extends Entry {}
  class GroupSeparatorEntry extends Entry {
    children(): GuiEventListener[];
    get itemHeight(): number;
    isExpanded(): boolean;
    isViewable(): boolean;
    narratables(): NarratableEntry[];
    narrationPriority(): NarrationPriority;
    render(graphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, hovered: boolean, tickDelta: number): void;
    setChildEntries(childEntries: Entry[]): void;
    setExpanded(expanded: boolean): void;
    setFocused(focused: boolean): void;
    updateNarration(builder: NarrationElementOutput): void;
  }


  interface EmptyListLabel extends Entry {}
  class EmptyListLabel extends Entry {
    constructor(parent: ListGroupSeparatorEntry, category: ConfigCategory);
    children(): GuiEventListener[];
    get itemHeight(): number;
    isViewable(): boolean;
    narratables(): NarratableEntry[];
    render(graphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, hovered: boolean, tickDelta: number): void;
  }


  interface OptionEntry extends Entry {}
  class OptionEntry extends Entry {
    readonly option: Option;
    readonly category: ConfigCategory;
    readonly group: OptionGroup;
    readonly groupSeparatorEntry: GroupSeparatorEntry;
    readonly widget: AbstractWidget;
    constructor(option: Option<any>, category: ConfigCategory, group: OptionGroup, groupSeparatorEntry: GroupSeparatorEntry, widget: AbstractWidget);
    charTyped(chr: string, modifiers: number): boolean;
    children(): GuiEventListener[];
    get itemHeight(): number;
    isViewable(): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, horizontal: number, vertical: number): boolean;
    narratables(): NarratableEntry[];
    render(graphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, hovered: boolean, tickDelta: number): void;
    setFocused(focused: boolean): void;
  }


  interface Entry extends dev_isxander_yacl3_gui_elementlistwidgetext_Entry<Entry> {}
  class Entry extends dev_isxander_yacl3_gui_elementlistwidgetext_Entry<Entry> {
    isViewable(): boolean;
  }

}

declare module 'dev.isxander.yacl3.gui.render' {
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { VertexConsumer } from 'com.mojang.blaze3d.vertex';

  class GuiRenderStateSink {
    static bufferSource(graphics: GuiGraphics): MultiBufferSource;
    yacl$bufferSource(): MultiBufferSource;
  }


  class YACLGuiElementRenderState {
    add2DVertex(vertexConsumer: VertexConsumer, x: number, y: number, z: number): VertexConsumer;
    baseState(): BaseRenderState;
    buildVertices(var1: VertexConsumer, var2: number): void;
    submit(graphics: GuiGraphics): void;
  }

}

declare module 'dev.isxander.yacl3.gui.tab' {
  import { AbstractWidget, Tooltip } from 'net.minecraft.client.gui.components';
  import { ContainerEventHandler, GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { Supplier } from 'java.util.function';
  import { ScreenRectangle, FocusNavigationEvent } from 'net.minecraft.client.gui.navigation';
  import { GuiGraphics, ComponentPath } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { TabNavigationBar, TabManager, Tab } from 'net.minecraft.client.gui.components.tabs';
  import { Iterable } from 'java.lang';
  import { ImmutableList } from 'com.google.common.collect';
  import { Component } from 'net.minecraft.network.chat';

  interface ListHolderWidget<T extends ElementListWidgetExt<any> = any> extends ContainerEventHandler, AbstractWidget {}
  class ListHolderWidget<T extends ElementListWidgetExt<any> = any> extends ContainerEventHandler {
    constructor(dimensions: Supplier<ScreenRectangle>, list: T);
    charTyped(c: string, i: number): boolean;
    children(): GuiEventListener[];
    get currentFocusPath(): ComponentPath;
    get focused(): GuiEventListener;
    get list(): T;
    isDragging(): boolean;
    keyPressed(i: number, j: number, k: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, deltaX: number, deltaY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, horizontal: number, vertical: number): boolean;
    nextFocusPath(event: FocusNavigationEvent): ComponentPath;
    renderWidget(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, deltaTick: number): void;
    set focused(listener: GuiEventListener);
    setDragging(dragging: boolean): void;
  }


  interface ScrollableNavigationBar extends TabNavigationBar {}
  class ScrollableNavigationBar extends TabNavigationBar {
    constructor(width: number, tabManager: TabManager, tabs: Iterable<Tab>);
    arrangeElements(): void;
    get scrollOffset(): number;
    get tabManager(): TabManager;
    get tabs(): ImmutableList<Tab>;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, horizontal: number, vertical: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    set scrollOffset(scrollOffset: number);
    setFocused(child: GuiEventListener): void;
  }


  interface TabExt extends Tab {}
  class TabExt extends Tab {
    get tabExtraNarration(): Component;
    get tooltip(): Tooltip;
    renderBackground(graphics: GuiGraphics): void;
    tick(): void;
  }

}

declare module 'dev.isxander.yacl3.gui.utils' {
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Function } from 'java.util.function';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { MutableComponent, Component } from 'net.minecraft.network.chat';
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { Item } from 'net.minecraft.world.item';
  import { Stream } from 'java.util.stream';
  import { Registry } from 'net.minecraft.core';
  import { FieldState } from 'dev.isxander.yacl3.gui.utils.UndoRedoHelper';

  class GuiUtils {
    static blitGuiTex(graphics: GuiGraphics, texture: ResourceLocation, x: number, y: number, u: number, v: number, textureWidth: number, textureHeight: number, width: number, height: number): void;
    static blitGuiTex(graphics: GuiGraphics, texture: ResourceLocation, x: number, y: number, u: number, v: number, textureWidth: number, textureHeight: number, width: number, height: number, linearFiltering: boolean): void;
    static blitGuiTexColor(graphics: GuiGraphics, texture: ResourceLocation, x: number, y: number, u: number, v: number, textureWidth: number, textureHeight: number, width: number, height: number, color: number): void;
    static blitSprite(graphics: GuiGraphics, sprite: ResourceLocation, x: number, y: number, width: number, height: number): void;
    static doTextureFiltering(): void;
    static extractAlpha(argb: number): number;
    static guiTextured(textureFiltering: boolean): Function<ResourceLocation, RenderType>;
    static popPose(graphics: GuiGraphics): void;
    static pushPose(graphics: GuiGraphics): void;
    static putAlpha(rgb: number, alpha: number): number;
    static rotate2D(graphics: GuiGraphics, angle: number): void;
    static scale2D(graphics: GuiGraphics, x: number, y: number): void;
    static setPixelARGB(nativeImage: NativeImage, x: number, y: number, argb: number): void;
    static shortenString(string: string, font: Font, maxWidth: number, suffix: string): string;
    static translatableFallback(key: string, fallback: Component): MutableComponent;
    static translate2D(graphics: GuiGraphics, x: number, y: number): void;
    static translateZ(graphics: GuiGraphics, z: number): void;
  }


  class ItemRegistryHelper {
    static getItemFromName(identifier: string, defaultItem: Item): Item;
    static getItemFromName(identifier: string): Item;
    static getMatchingItemIdentifiers(value: string): Stream<ResourceLocation>;
    static isRegisteredItem(identifier: string): boolean;
  }


  class MiscUtil {
    static getFromRegistry<T>(registry: Registry<T>, identifier: ResourceLocation): T;
  }


  class UndoRedoHelper {
    constructor(text: string, cursorPos: number, selectionLength: number);
    redo(): FieldState;
    save(text: string, cursorPos: number, selectionLength: number): void;
    undo(): FieldState;
  }


  class YACLRenderHelper {
    static renderButtonTexture(graphics: GuiGraphics, x: number, y: number, width: number, height: number, enabled: boolean, focused: boolean): void;
  }

}

declare module 'dev.isxander.yacl3.gui.YACLScreen' {
  import { TabExt } from 'dev.isxander.yacl3.gui.tab';
  import { Button, AbstractWidget, Tooltip } from 'net.minecraft.client.gui.components';
  import { YACLScreen } from 'dev.isxander.yacl3.gui';
  import { ConfigCategory, PlaceholderCategory } from 'dev.isxander.yacl3.api';
  import { ScreenRectangle } from 'net.minecraft.client.gui.navigation';
  import { Component } from 'net.minecraft.network.chat';
  import { Consumer } from 'java.util.function';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface CategoryTab extends TabExt {}
  class CategoryTab extends TabExt {
    readonly saveFinishedButton: Button;
    readonly cancelResetButton: Button;
    readonly undoButton: Button;
    constructor(screen: YACLScreen, category: ConfigCategory, tabArea: ScreenRectangle);
    doLayout(screenRectangle: ScreenRectangle): void;
    get tabTitle(): Component;
    get tooltip(): Tooltip;
    renderBackground(graphics: GuiGraphics): void;
    tick(): void;
    updateButtons(): void;
    visitChildren(consumer: Consumer<AbstractWidget>): void;
  }


  interface PlaceholderTab extends TabExt {}
  class PlaceholderTab extends TabExt {
    constructor(category: PlaceholderCategory, screen: YACLScreen);
    doLayout(screenRectangle: ScreenRectangle): void;
    get tabTitle(): Component;
    get tooltip(): Tooltip;
    visitChildren(consumer: Consumer<AbstractWidget>): void;
  }

}

declare module 'dev.isxander.yacl3.impl' {
  import { ListOptionEntry, OptionDescription, StateManager, Controller, Binding, ListOption, OptionFlag, Option, OptionEventListener } from 'dev.isxander.yacl3.api';
  import { Component } from 'net.minecraft.network.chat';
  import { ImmutableSet } from 'com.google.common.collect';
  import { BiConsumer } from 'java.util.function';
  import { ResetAction, StateListener } from 'dev.isxander.yacl3.api.StateManager';

  interface HiddenNameListOptionEntry<T = any> extends ListOptionEntry<T> {}
  class HiddenNameListOptionEntry<T = any> extends ListOptionEntry<T> {
    constructor(option: ListOptionEntry<T>);
    addEventListener(listener: OptionEventListener<T>): void;
    addListener(changedListener: BiConsumer<Option<T>, T>): void;
    applyValue(): boolean;
    available(): boolean;
    binding(): Binding<T>;
    canResetToDefault(): boolean;
    changed(): boolean;
    controller(): Controller<T>;
    description(): OptionDescription;
    flags(): ImmutableSet<OptionFlag>;
    forgetPendingValue(): void;
    isPendingValueDefault(): boolean;
    parentGroup(): ListOption<T>;
    pendingValue(): T;
    requestSet(value: T): void;
    requestSetDefault(): void;
    setAvailable(available: boolean): void;
    stateManager(): StateManager<T>;
    tooltip(): Component;
  }


  interface ImmutableStateManager<T = any> extends StateManager<T> {}
  class ImmutableStateManager<T = any> extends StateManager<T> {
    constructor(value: T);
    addListener(stateListener: StateListener<T>): void;
    apply(): void;
    get (): T;
    isAlwaysSynced(): boolean;
    isDefault(): boolean;
    isSynced(): boolean;
    resetToDefault(action: ResetAction): void;
    set (value: T);
    sync(): void;
  }


  interface InstantStateManager<T = any> extends StateManager<T>, ProvidesBindingForDeprecation<T> {}
  class InstantStateManager<T = any> extends StateManager<T> {
    constructor(binding: Binding<T>);
    addListener(stateListener: StateListener<T>): void;
    apply(): void;
    get (): T;
    get binding(): Binding<T>;
    isAlwaysSynced(): boolean;
    isDefault(): boolean;
    isSynced(): boolean;
    resetToDefault(action: ResetAction): void;
    set (value: T);
    sync(): void;
  }


  interface NotNullBinding<T = any> extends Binding<T> {}
  class NotNullBinding<T = any> extends Binding<T> {
    constructor(binding: Binding<T>);
    defaultValue(): T;
    get value(): T;
    set value(value: T);
  }


  class ProvidesBindingForDeprecation<T = any> {
    get binding(): Binding<T>;
  }


  interface SelfContainedBinding<T = any> extends Binding<T> {}
  class SelfContainedBinding<T = any> extends Binding<T> {
    constructor(value: T, defaultValue: T);

    constructor(value: T);
    defaultValue(): T;
    get value(): T;
    set value(value: T);
  }


  interface SimpleStateManager<T = any> extends StateManager<T>, ProvidesBindingForDeprecation<T> {}
  class SimpleStateManager<T = any> extends StateManager<T> {
    constructor(binding: Binding<T>);
    addListener(stateListener: StateListener<T>): void;
    apply(): void;
    get (): T;
    get binding(): Binding<T>;
    isDefault(): boolean;
    isSynced(): boolean;
    resetToDefault(action: ResetAction): void;
    set (value: T);
    sync(): void;
  }

}

declare module 'dev.isxander.yacl3.impl.utils' {
  import { Logger } from 'org.slf4j';

  class YACLConstants {
    static readonly LOGGER: Logger;
  }

}

declare module 'dev.isxander.yacl3.mixin' {
  import { List } from 'java.util';
  import { ContainerEventHandler, GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { ScreenRectangle, ScreenDirection, FocusNavigationEvent } from 'net.minecraft.client.gui.navigation';
  import { GuiRenderStateSink } from 'dev.isxander.yacl3.gui.render';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { LinearLayout } from 'net.minecraft.client.gui.layouts';
  import { TabManager, Tab } from 'net.minecraft.client.gui.components.tabs';
  import { ImmutableList } from 'com.google.common.collect';
  import { TabButton } from 'net.minecraft.client.gui.components';

  class AbstractSelectionListAccessor {
  }


  class AbstractSelectionListMixin<E extends Entry<E> = any> {
    children(): E[];
  }


  class ContainerEventHandlerMixin {
    modifyFocusCandidates(instance: ContainerEventHandler, screenArea: ScreenRectangle, direction: ScreenDirection, focused: GuiEventListener, event: FocusNavigationEvent): any[];
  }


  interface GuiGraphicsMixin extends GuiRenderStateSink {}
  class GuiGraphicsMixin extends GuiRenderStateSink {
    yacl$bufferSource(): MultiBufferSource;
  }


  class MinecraftMixin {
  }


  class OptionInstanceAccessor<T = any> {
    get initialValue(): T;
  }


  class TabNavigationBarAccessor {
    yacl$getLayout(): LinearLayout;
    yacl$getTabButtons(): ImmutableList<TabButton>;
    yacl$getTabManager(): TabManager;
    yacl$getTabs(): ImmutableList<Tab>;
    yacl$getWidth(): number;
  }

}

declare module 'dev.isxander.yacl3.platform' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ConfigClassHandler } from 'dev.isxander.yacl3.config.v2.api';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Path } from 'java.nio.file';

  interface Env extends Enum<Env> {}
  class Env extends Enum<Env> {
    static readonly CLIENT: Env;
    static readonly SERVER: Env;
    isClient(): boolean;
    static valueOf(name: string): Env;
    static values(): Env[];
  }


  class PlatformEntrypoint {
    constructor(modEventBus: IEventBus);
  }


  class YACLConfig {
    static readonly HANDLER: ConfigClassHandler;
    showColorPickerIndicator: boolean;
    preloadComplexImageFormats: boolean;
  }


  class YACLPlatform {
    static get configDir(): Path;
    static get environment(): Env;
    static isDevelopmentEnv(): boolean;
    static mcRl(path: string): ResourceLocation;
    static parseRl(rl: string): ResourceLocation;
    static rl(path: string): ResourceLocation;
    static rl(namespace: string, path: string): ResourceLocation;
  }

}