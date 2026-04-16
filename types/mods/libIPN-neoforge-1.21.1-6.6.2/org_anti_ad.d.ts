declare module 'org.anti_ad.embedded.ca.solostudios.fuzzykt' {
  import { Pair } from 'kotlin';
  import { Integer } from 'java.lang';

  class FuzzyKt {
    static readonly INSTANCE: FuzzyKt;
    longestCommonSubstring(s1: string, s2: string): Pair<number, number>;
    partialRatio(s1: string, s2: string): number;
    ratio(s1: string, s2: string): number;
  }

}

declare module 'org.anti_ad.embedded.ca.solostudios.stringsimilarity.interfaces' {
  interface MetricStringDistance extends StringDistance {}
  class MetricStringDistance extends StringDistance {
    distance(var1: string, var2: string): number;
  }


  interface NormalizedStringDistance extends StringDistance {}
  class NormalizedStringDistance extends StringDistance {
    distance(var1: string, var2: string): number;
  }


  interface NormalizedStringSimilarity extends StringSimilarity {}
  class NormalizedStringSimilarity extends StringSimilarity {
    similarity(var1: string, var2: string): number;
  }


  class StringDistance {
    distance(var1: string, var2: string): number;
  }


  class StringSimilarity {
    similarity(var1: string, var2: string): number;
  }

}

declare module 'org.anti_ad.embedded.ca.solostudios.stringsimilarity.normalized' {
  import { MetricStringDistance, NormalizedStringDistance, NormalizedStringSimilarity } from 'org.anti_ad.embedded.ca.solostudios.stringsimilarity.interfaces';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  interface NormalizedLevenshtein extends MetricStringDistance, NormalizedStringDistance, NormalizedStringSimilarity {}
  class NormalizedLevenshtein extends MetricStringDistance {
    constructor(insertionWeight: number, deletionWeight: number, substitutionWeight: number);

    constructor(d: number, d2: number, d3: number, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor();
    distance(s1: string, s2: string): number;
    similarity(s1: string, s2: string): number;
  }

}

declare module 'org.anti_ad.embedded.ca.solostudios.stringsimilarity.util' {
  import { Pair } from 'kotlin';
  import { Comparator } from 'java.util';

  class ComparisonsKt {
    static maxLength(a: string, b: string): number;
    static min(a: number, b: number, c: number, d: number): number;
    static min(a: number, b: number, c: number): number;
    static minLength(a: string, b: string): number;
    static minMaxByLength(a: string, b: string): Pair<string, string>;
    static minMaxOf<T>(a: T, b: T, comparator: Comparator<T>): Pair<T, T>;
  }

}

declare module 'org.anti_ad.mc.alias.client' {
  import { SimpleSoundInstance } from 'net.minecraft.client.resources.sounds';
  import { SoundEvent } from 'net.minecraft.sounds';

  class ClientExKt {
    static PositionedSoundInstance_Master(sound: SoundEvent, pitch: number, volume: number): SimpleSoundInstance;
    static vanillaTranslate(string: string, ...objects: any[]): string;
  }

}

declare module 'org.anti_ad.mc.alias.nbt' {
  import { Tag } from 'net.minecraft.nbt';
  import { StringBuilder } from 'java.lang';

  class NbtExKt {
    static NbtHelper_toFormattedString(element: Tag, bl: boolean): string;
    static NbtHelper_toFormattedString(element: Tag): string;
    static NbtHelper_toFormattedString(sb: StringBuilder, element: Tag, level: number, bl: boolean): StringBuilder;
  }

}

declare module 'org.anti_ad.mc.alias.util' {
  import { ResourceLocation } from 'net.minecraft.resources';

  class UtilExKt {
    static IdentifierOf(identifier: string): ResourceLocation;
    static IdentifierOf(namespace: string, identifier: string): ResourceLocation;
  }

}

declare module 'org.anti_ad.mc.common.algoritms' {
  import { Random } from 'kotlin.random';
  import { Comparable } from 'java.lang';

  class WeightedNode<D = any> {
    get data(): D;
    get weight(): number;
    set weight(var1: number);
  }


  class WeightedRandomizingList<D extends Comparable<D> = any> {
    constructor(noiseSource: Random);
    add(data: D, weight: number): WeightedNode<D>;
    compare(a: T, b: T): number;
    get length(): number;
    get size(): number;
    getWeightedRandomElement(pos: number): D;
    static getWeightedRandomElement$default(weightedRandomizingList: WeightedRandomizingList, n: number, n2: number, object: any): Comparable;
    remove(data: D): void;
  }


  class WeightedRandomizingListKt {
    static main(): void;
    static main(args: string[]): void;
  }

}

declare module 'org.anti_ad.mc.common.algoritms.WeightedRandomizingList' {
  import { WeightedNode } from 'org.anti_ad.mc.common.algoritms';

  interface Node<D = any> extends WeightedNode<D> {}
  class Node<D = any> extends WeightedNode<D> {
    constructor(data: D, aWeight: number, pos: number);
    get data(): D;
    get end(): number;
    get index(): number;
    get pos(): number;
    get weight(): number;
    set index(n: number);
    set pos(n: number);
    set weight(value: number);
  }

}

declare module 'org.anti_ad.mc.common.config.builder' {
  import { CategorizedMultiConfig, IConfigElement } from 'org.anti_ad.mc.common.config';
  import { ByPropertyName } from 'org.anti_ad.mc.common.extensions';
  import { Savable } from 'org.anti_ad.mc.common';
  import { Function0 } from 'kotlin.jvm.functions';

  class ConfigDeclaration {
    get builder(): ConfigDeclarationBuilder;
  }


  class ConfigDeclarationBuilder {
    get innerConfig(): CategorizedMultiConfig;
  }


  interface ConfigOptionDelegateProvider<T extends IConfigOption = any> extends ByPropertyName<T> {}
  class ConfigOptionDelegateProvider<T extends IConfigOption = any> extends ByPropertyName<T> {
    constructor(value: T, declaration: ConfigDeclaration);
    get declaration(): ConfigDeclaration;
  }


  interface ConfigSaveLoadManager extends Savable {}
  class ConfigSaveLoadManager extends Savable {
    constructor(modId: string, fileName: string, configSource: Function0<IConfigElement>);
    load(): void;
    save(): void;
  }

}

declare module 'org.anti_ad.mc.common.config' {
  import { List } from 'java.util';
  import { Importance } from 'org.anti_ad.mc.common.config.IConfigOption';
  import { JsonElement, JsonObject } from 'kotlinx.serialization.json';
  import { Number } from 'java.lang';

  class CategorizedMultiConfigKt {
    static toMultiConfig($this$toMultiConfig: IConfigOption[]): CategorizedMultiConfig;
  }


  interface ConfigOptionBase extends IConfigOption {}
  class ConfigOptionBase extends IConfigOption {
    get hidden(): boolean;
    get importance(): Importance;
    get key(): string;
    set hidden(bl: boolean);
    set importance(importance: Importance);
    set key(string: string);
  }


  interface ConfigOptionNumericBase<T extends Number = any> extends IConfigOptionNumeric<T>, ConfigOptionBase {}
  class ConfigOptionNumericBase<T extends Number = any> extends IConfigOptionNumeric<T> {
    constructor(defaultValue: T, minValue: T, maxValue: T);
    get defaultValue(): T;
    get maxValue(): T;
    get minValue(): T;
    get value(): T;
    set value(value: T);
  }


  class IConfigElement {
    fromJsonElement(var1: JsonElement): void;
    toJsonElement(): JsonElement;
  }


  interface IConfigElementObject extends IConfigElementResettable {}
  class IConfigElementObject extends IConfigElementResettable {
    fromJsonElement(var1: JsonElement): void;
    fromJsonObject(var1: JsonObject): void;
  }


  interface IConfigElementResettable extends IConfigElement {}
  class IConfigElementResettable extends IConfigElement {
    isModified(): boolean;
    resetToDefault(): void;
  }


  interface IConfigOption extends IConfigElementResettable {}
  class IConfigOption extends IConfigElementResettable {
    get hidden(): boolean;
    get importance(): Importance;
    get key(): string;
    set hidden(var1: boolean);
    set importance(var1: Importance);
    set key(var1: string);
  }


  interface IConfigOptionNumeric<T extends Number = any> extends IConfigOptionPrimitive<T> {}
  class IConfigOptionNumeric<T extends Number = any> extends IConfigOptionPrimitive<T> {
    get maxValue(): T;
    get minValue(): T;
    setNumericValue(var1: Number): void;
  }


  interface IConfigOptionPrimitive<T = any> extends IConfigOption {}
  class IConfigOptionPrimitive<T = any> extends IConfigOption {
    fromJsonElement(var1: JsonElement): void;
    get defaultValue(): T;
    get value(): T;
    isModified(): boolean;
    resetToDefault(): void;
    set value(var1: T);
    toJsonElement(): JsonElement;
  }


  interface IConfigOptionToggleable extends IConfigOption {}
  class IConfigOptionToggleable extends IConfigOption {
    toggleNext(): void;
    togglePrevious(): void;
  }

}

declare module 'org.anti_ad.mc.common.config.IConfigElementObject' {
  import { IConfigElementObject } from 'org.anti_ad.mc.common.config';
  import { JsonElement } from 'kotlinx.serialization.json';

  class DefaultImpls {
    static fromJsonElement($this: IConfigElementObject, element: JsonElement): void;
  }

}

declare module 'org.anti_ad.mc.common.config.IConfigOption' {
  import { Enum } from 'java.lang';
  import { EnumEntries } from 'kotlin.enums';

  interface Importance extends Enum<Importance> {}
  class Importance extends Enum<Importance> {
    static readonly NORMAL: Importance;
    static readonly IMPORTANT: Importance;
    static get entries(): EnumEntries<Importance>;
    static valueOf(value: string): Importance;
    static values(): Importance[];
  }

}

declare module 'org.anti_ad.mc.common.config.IConfigOptionNumeric' {
  import { IConfigOptionNumeric } from 'org.anti_ad.mc.common.config';
  import { Number } from 'java.lang';
  import { JsonElement } from 'kotlinx.serialization.json';

  class DefaultImpls {
    static fromJsonElement<T extends Number>($this: IConfigOptionNumeric<T>, element: JsonElement): void;
    static isModified<T extends Number>($this: IConfigOptionNumeric<T>): boolean;
    static resetToDefault<T extends Number>($this: IConfigOptionNumeric<T>): void;
    static toJsonElement<T extends Number>($this: IConfigOptionNumeric<T>): JsonElement;
  }

}

declare module 'org.anti_ad.mc.common.config.IConfigOptionPrimitive' {
  import { IConfigOptionPrimitive } from 'org.anti_ad.mc.common.config';
  import { JsonElement } from 'kotlinx.serialization.json';

  class DefaultImpls {
    static fromJsonElement<T>($this: IConfigOptionPrimitive<T>, element: JsonElement): void;
    static isModified<T>($this: IConfigOptionPrimitive<T>): boolean;
    static resetToDefault<T>($this: IConfigOptionPrimitive<T>): void;
    static toJsonElement<T>($this: IConfigOptionPrimitive<T>): JsonElement;
  }

}

declare module 'org.anti_ad.mc.common.config.options' {
  import { AlternativeKeybind, KeybindSettings, MainKeybind, IKeybind } from 'org.anti_ad.mc.common.input';
  import { ConfigOptionBase, IConfigOptionPrimitive, IConfigOptionToggleable, ConfigOptionNumericBase, IConfigElementObject } from 'org.anti_ad.mc.common.config';
  import { Boolean, Integer, Double, Number } from 'java.lang';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ConfigButtonInfo } from 'org.anti_ad.mc.common.gui.widgets';
  import { JsonElement, JsonObject } from 'kotlinx.serialization.json';
  import { List } from 'java.util';
  import { Function0, Function2 } from 'kotlin.jvm.functions';
  import { Unit } from 'kotlin';

  interface ConfigAltHotkey extends ConfigHotkey {}
  class ConfigAltHotkey extends ConfigHotkey {
    constructor(parent: ConfigHotkey, index: number);
    get index(): number;
    get parent(): ConfigHotkey;
    get realMainKeybind(): AlternativeKeybind;
  }


  interface ConfigBoolean extends IConfigOptionPrimitive<boolean>, IConfigOptionToggleable, ConfigOptionBase {}
  class ConfigBoolean extends IConfigOptionPrimitive<boolean> {
    constructor(defaultValue: boolean, assignKey: boolean);

    constructor(bl: boolean, bl2: boolean, n: number, defaultConstructorMarker: DefaultConstructorMarker);
    get assignKey(): boolean;
    get booleanValue(): boolean;
    get defaultValue(): boolean;
    get value(): boolean;
    set value(bl: boolean);
    toggleNext(): void;
    togglePrevious(): void;
  }


  interface ConfigButton extends ConfigOptionBase {}
  class ConfigButton extends ConfigOptionBase {
    constructor(info: ConfigButtonInfo);
    fromJsonElement(element: JsonElement): void;
    get info(): ConfigButtonInfo;
    isModified(): boolean;
    resetToDefault(): void;
    toJsonElement(): JsonElement;
  }


  interface ConfigColorPicker extends IConfigOptionPrimitive<number>, ConfigOptionBase {}
  class ConfigColorPicker extends IConfigOptionPrimitive<number> {
    constructor(defaultValue: number);
    copy(): ConfigColorPicker;
    fromJsonElement(element: JsonElement): void;
    get defaultValue(): number;
    get value(): number;
    set value(n: number);
    toJsonElement(): JsonElement;
  }


  interface ConfigDouble extends ConfigOptionNumericBase<number> {}
  class ConfigDouble extends ConfigOptionNumericBase<number> {
    constructor(defaultValue: number, minValue: number, maxValue: number);
    get doubleValue(): number;
    setNumericValue(value: Number): void;
  }


  interface ConfigEnum<E extends Enum<E> = any> extends IConfigOptionPrimitive<E>, IConfigOptionToggleable, ConfigOptionBase {}
  class ConfigEnum<E extends Enum<E> = any> extends IConfigOptionPrimitive<E> {
    constructor(defaultValue: E);
    get defaultValue(): E;
    get value(): E;
    set value(e: E);
    toggleNext(): void;
    togglePrevious(): void;
  }


  interface ConfigHotkey extends IConfigElementObject, ConfigOptionBase {}
  class ConfigHotkey extends IConfigElementObject {
    constructor(defaultStorageString: string, defaultSettings: KeybindSettings);
    fromJsonElement(element: JsonElement): void;
    fromJsonObject(obj: JsonObject): void;
    get alternativeKeybinds(): AlternativeKeybind[];
    get mainKeybind(): MainKeybind;
    get realMainKeybind(): IKeybind;
    isActivated(): boolean;
    isModified(): boolean;
    isPressing(): boolean;
    resetToDefault(): void;
    toJsonElement(): JsonObject;
  }


  interface ConfigInteger extends ConfigOptionNumericBase<number> {}
  class ConfigInteger extends ConfigOptionNumericBase<number> {
    constructor(defaultValue: number, minValue: number, maxValue: number);
    get integerValue(): number;
    setNumericValue(value: Number): void;
  }


  interface ConfigKeyToggleBoolean extends IConfigOptionPrimitive<boolean>, IConfigOptionToggleable, IConfigElementObject, ConfigHotkey {}
  class ConfigKeyToggleBoolean extends IConfigOptionPrimitive<boolean> {
    constructor(defaultValue: boolean, finish: Function0<Unit>, toggleNotificationHandler: Function2<boolean, string, Unit>, defaultSettings: KeybindSettings);

    constructor(bl: boolean, function0: Function0, function2: Function2, keybindSettings: KeybindSettings, n: number, defaultConstructorMarker: DefaultConstructorMarker);
    fromJsonElement(element: JsonElement): void;
    fromJsonObject(obj: JsonObject): void;
    get booleanValue(): boolean;
    get defaultValue(): boolean;
    get finish(): Function0<Unit>;
    get toggleNotificationHandler(): Function2<boolean, string, Unit>;
    get value(): boolean;
    isModified(): boolean;
    resetToDefault(): void;
    set value(bl: boolean);
    toJsonElement(): JsonObject;
    toggleIfActivated(): Function0<Unit>;
    toggleNext(): void;
    togglePrevious(): void;
  }


  interface ConfigString extends IConfigOptionPrimitive<string>, ConfigOptionBase {}
  class ConfigString extends IConfigOptionPrimitive<string> {
    constructor(defaultValue: string);
    get defaultValue(): string;
    get value(): string;
    set value(string: string);
  }


  interface HandledConfigString extends IConfigOptionPrimitive<string>, ConfigString {}
  class HandledConfigString extends IConfigOptionPrimitive<string> {
    constructor(defaultValue: string, changeHandler: Function0<Unit>);
    get changeHandler(): Function0<Unit>;
    get defaultValue(): string;
    get value(): string;
    set value(value: string);
  }

}

declare module 'org.anti_ad.mc.common.events' {
  import { Function0 } from 'kotlin.jvm.functions';
  import { Unit } from 'kotlin';

  class OnetimeDelayedInit {
    static readonly INSTANCE: OnetimeDelayedInit;
    static access$onTickPost($this: OnetimeDelayedInit): void;
    static access$onTickPre($this: OnetimeDelayedInit): void;
    compare(a: T, b: T): number;
    compare(a: T, b: T): number;
    init(): void;
    invoke(): void;
    invoke(): void;
    invoke(): void;
    invoke(): void;
    register(priority: number, action: Function0<Unit>): void;
    registerPost(priority: number, action: Function0<Unit>): void;
  }

}

declare module 'org.anti_ad.mc.common.extensions' {
  import { Comparable, Throwable, Enum, Class, Boolean } from 'java.lang';
  import { Comparator, List } from 'java.util';
  import { ReadOnlyProperty, PropertyDelegateProvider } from 'kotlin.properties';
  import { KProperty } from 'kotlin.reflect';
  import { Function2, Function0, Function1 } from 'kotlin.jvm.functions';
  import { Unit } from 'kotlin';
  import { Path } from 'java.nio.file';
  import { JsonPrimitive, JsonElement } from 'kotlinx.serialization.json';

  interface AsComparable<T = any> extends Comparable<AsComparable> {}
  class AsComparable<T = any> extends Comparable<AsComparable> {
    constructor(value: T, comparator: Comparator<T>);
    compareTo(other: AsComparable<T>): number;
    get comparator(): Comparator<T>;
    get value(): T;
  }


  interface AsDelegate<V = any> extends ReadOnlyProperty<any, V> {}
  class AsDelegate<V = any> extends ReadOnlyProperty<any, V> {
    constructor(value: V);
    get value(): V;
    getValue(thisRef: any, property: KProperty<any>): V;
  }


  interface ByPropertyName<V = any> extends PropertyDelegateProvider<any, AsDelegate> {}
  class ByPropertyName<V = any> extends PropertyDelegateProvider<any, AsDelegate> {
    constructor(value: Function2<ByPropertyName<V>, string, V>);
    get value(): Function2<ByPropertyName<V>, string, V>;
    provideDelegate(thisRef: any, property: KProperty<any>): AsDelegate<V>;
  }


  class CommonKt {
    static transformOrNull<A, B>($this$transformOrNull: A, converter: Function1<A, B>): B;
    static tryCatch<R>(tryToRun: Function0<R>): R;
    static tryCatch<R>(failureValue: R, tryToRun: Function0<R>): R;
    static tryCatch<R>(onFailure: Function1<Throwable, R>, tryToRun: Function0<R>): R;
    static tryOrElse<R>(onFailure: Function1<Throwable, R>, tryToRun: Function0<R>): R;
    static tryOrPrint<R>(printFailure: Function1<string, Unit>, tryToRun: Function0<R>): R;
    static tryOrPrint<R>(failureValue: R, printFailure: Function1<string, Unit>, tryToRun: Function0<R>): R;
    static trySwallow<R>(tryToRun: Function0<R>): R;
    static trySwallow<R>(failureValue: R, tryToRun: Function0<R>): R;
  }


  class Java_ioKt {
    static createDirectories($this$createDirectories: Path): Path;
    static div($this$div: Path, other: Path): Path;
    static div($this$div: Path, other: string): Path;
    static exists($this$exists: Path): boolean;
    static getLoggingPath($this$loggingPath: Path): string;
    static getName($this$name: Path): string;
    static listFiles($this$listFiles: Path, regex: string): Path[];
    static pathFrom($this$pathFrom: Path, other: string): Path;
    static pathFrom($this$pathFrom: Path, other: Path): Path;
    static pathOf(first: string, ...more: string[]): Path;
    static writeToFile($this$writeToFile: string, path: Path): void;
  }


  class JsonKt {
    static toJsonElement($this$toJsonElement: string): JsonElement;
    static toJsonPrimitive(value: any): JsonPrimitive;
    static value<T>($this$value: JsonPrimitive, t: T): T;
  }


  class Kt_commonKt {
    static alsoIf<T>($this$alsoIf: T, condition: boolean, block: Function1<T, Unit>): T;
    static alsoIf<T>($this$alsoIf: T, condition: Function1<T, boolean>, block: Function1<T, Unit>): T;
    static applyIf<T>($this$applyIf: T, condition: boolean, block: Function1<T, Unit>): T;
    static applyIf<T>($this$applyIf: T, condition: Function1<T, boolean>, block: Function1<T, Unit>): T;
    static asComparable<T>($this$asComparable: T, comparator: Comparator<T>): AsComparable<T>;
    static asComparable<T extends Comparable<T>>($this$asComparable: T[]): AsComparable<T[]>;
    static asComparator<T>($this$asComparator: Comparator<T>[]): Comparator<T>;
    static compare<T>($this$compare: Comparator<T>[], a: T, b: T): number;
    static compareTo<T extends Comparable<T>>($this$compareTo: T[], other: T[]): number;
    static getUsefulName($this$usefulName: Class<any>): string;
    static ifFalse($this$ifFalse: boolean, block: Function0<Unit>): boolean;
    static ifIt<T>($this$ifIt: T, predicate: Function1<T, boolean>): T;
    static ifTrue($this$ifTrue: boolean, block: Function0<Unit>): boolean;
    static letIf<T>($this$letIf: T, condition: boolean, block: Function1<T, T>): T;
    static letIf<T>($this$letIf: T, condition: Function1<T, boolean>, block: Function1<T, T>): T;
    static next<T extends Enum<T>>($this$next: T, amount: number): T;
    static next$default(enum_: Enum, n: number, n2: number, object: any): Enum;
    static orDefault<T>($this$orDefault: T, predicate: Function0<T>): T;
    static plus($this$plus: boolean, b: boolean): number;
    static plus($this$plus: boolean, b: number): number;
    static plus($this$plus: number, b: boolean): number;
    static previous<T extends Enum<T>>($this$previous: T, amount: number): T;
    static previous$default(enum_: Enum, n: number, n2: number, object: any): Enum;
    static runIf<T>($this$runIf: T, condition: boolean, block: Function1<T, T>): T;
    static runIf<T>($this$runIf: T, condition: Function1<T, boolean>, block: Function1<T, T>): T;
    static unlessIt<T>($this$unlessIt: T, predicate: Function1<T, boolean>): T;
  }

}

declare module 'org.anti_ad.mc.common.forge' {
  import { Key, MouseScrollingEvent } from 'InputEvent';
  import { Pre, Post } from 'ScreenEvent.KeyPressed';
  import { Pre as screenevent_keyreleased_Pre, Post as screenevent_keyreleased_Post } from 'ScreenEvent.KeyReleased';
  import { Post as inputevent_mousebutton_Post, Pre as inputevent_mousebutton_Pre } from 'InputEvent.MouseButton';
  import { Pre as screenevent_mousebuttonpressed_Pre, Post as screenevent_mousebuttonpressed_Post } from 'ScreenEvent.MouseButtonPressed';
  import { Pre as screenevent_mousebuttonreleased_Pre, Post as screenevent_mousebuttonreleased_Post } from 'ScreenEvent.MouseButtonReleased';
  import { Pre as screenevent_mousescrolled_Pre } from 'ScreenEvent.MouseScrolled';
  import { Pre as clienttickevent_Pre, Post as clienttickevent_Post } from 'ClientTickEvent';

  class CommonForgeEventHandler {
    onGuiMouseScroll(event: screenevent_mousescrolled_Pre): void;
    onKeyLast(event: Key): void;
    onKeyPressed(event: Pre): void;
    onKeyPressedPost(event: Post): void;
    onKeyRelease(event: screenevent_keyreleased_Pre): void;
    onKeyReleasePost(event: screenevent_keyreleased_Post): void;
    onMouseButtonLast(event: inputevent_mousebutton_Post): void;
    onMouseClicked(event: screenevent_mousebuttonpressed_Pre): void;
    onMouseClickedPost(event: screenevent_mousebuttonpressed_Post): void;
    onMouseReleased(event: screenevent_mousebuttonreleased_Pre): void;
    onMouseReleasedPost(event: screenevent_mousebuttonreleased_Post): void;
    onMouseScroll(event: MouseScrollingEvent): void;
    onRawMouse(event: inputevent_mousebutton_Pre): void;
  }


  class NeoForgeTicksSource {
    clientTick(e: clienttickevent_Pre): void;
    clientTick(e: clienttickevent_Post): void;
  }

}

declare module 'org.anti_ad.mc.common.gui.debug' {
  import { List } from 'java.util';
  import { Integer } from 'java.lang';
  import { NativeInputContextBase } from 'org.anti_ad.mc.common.gui';
  import { IdentifierHolder } from 'org.anti_ad.mc.common.vanilla.render.glue';

  class DebugInfos {
    static readonly INSTANCE: DebugInfos;
    get asTexts(): string[];
    get buttons(): number[];
    get height(): number;
    get key(): number;
    get keyText(): string;
    get keys(): number[];
    get mouseX(): number;
    get mouseY(): number;
    get pressingKeysText(): string;
    get scrollHorizontal(): number;
    get scrollVertical(): number;
    get width(): number;
    onKey(context: NativeInputContextBase<any>, key: number, scanCode: number, action: number, modifiers: number): void;
    onMouseButton(context: NativeInputContextBase<any>, button: number, action: number, mods: number): void;
    onScrollButton(context: NativeInputContextBase<any>, horizontal: number, vertical: number): boolean;
    set buttons(list: number[]);
    set key(n: number);
    set keys(list: number[]);
    set mouseX(n: number);
    set mouseY(n: number);
    set scrollHorizontal(d: number);
    set scrollVertical(d: number);
  }


  class SpriteTestScreenKt {
    static access$getWIDGETS_TEXTURE$p(): IdentifierHolder;
  }

}

declare module 'org.anti_ad.mc.common.gui.layout' {
  import { Enum } from 'java.lang';
  import { EnumEntries } from 'kotlin.enums';
  import { Widget } from 'org.anti_ad.mc.common.gui.widgets';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Companion } from 'org.anti_ad.mc.common.gui.layout.FlexDirection';

  interface Axis extends Enum<Axis> {}
  class Axis extends Enum<Axis> {
    static readonly HORIZONTAL: Axis;
    static readonly VERTICAL: Axis;
    static get entries(): EnumEntries<Axis>;
    static valueOf(value: string): Axis;
    static values(): Axis[];
  }


  class BiFlex {
    constructor(owner: Widget, axis: Axis);

    constructor(widget2: Widget, axis: Axis, n: number, defaultConstructorMarker: DefaultConstructorMarker);
    addAndFit(child: Widget, anchorSides: boolean, cross: number): void;
    static addAndFit$default(biFlex: BiFlex, widget2: Widget, bl: boolean, n: number, n2: number, object: any): void;
    get axis(): Axis;
    get normal(): Flex;
    get owner(): Widget;
    get reverse(): Flex;
  }


  class Flex {
    constructor(owner: Widget, direction: FlexDirection);

    constructor(widget2: Widget, flexDirection: FlexDirection, n: number, defaultConstructorMarker: DefaultConstructorMarker);
    add(child: Widget, extent: number, anchorSides: boolean, cross: number, isLast: boolean): void;
    static add$default(flex: Flex, widget2: Widget, n: number, bl: boolean, n2: number, bl2: boolean, n3: number, object: any): void;
    addAndFit(child: Widget, anchorSides: boolean, cross: number): void;
    static addAndFit$default(flex: Flex, widget2: Widget, bl: boolean, n: number, n2: number, object: any): void;
    addSpace(dimension: number): void;
    get direction(): FlexDirection;
    get maxCross(): number;
    get offset(): number;
    get owner(): Widget;
    get ownerExtent(): number;
    set offset(n: number);
  }


  interface FlexDirection extends Enum<FlexDirection> {}
  class FlexDirection extends Enum<FlexDirection> {
    static readonly Companion: Companion;
    static readonly LEFT_TO_RIGHT: FlexDirection;
    static readonly TOP_DOWN: FlexDirection;
    static readonly RIGHT_TO_LEFT: FlexDirection;
    static readonly BOTTOM_UP: FlexDirection;
    get anchor(): AnchorStyles;
    get axis(): Axis;
    static get entries(): EnumEntries<FlexDirection>;
    isHorizontal(): boolean;
    isReverse(): boolean;
    isVertical(): boolean;
    static valueOf(value: string): FlexDirection;
    static values(): FlexDirection[];
  }


  interface Overflow extends Enum<Overflow> {}
  class Overflow extends Enum<Overflow> {
    static readonly UNSET: Overflow;
    static readonly VISIBLE: Overflow;
    static readonly HIDDEN: Overflow;
    static get entries(): EnumEntries<Overflow>;
    static valueOf(value: string): Overflow;
    static values(): Overflow[];
  }


  class WidgetExtensionsKt {
    static fillParent($this$fillParent: Widget): Widget;
    static moveToCenter($this$moveToCenter: Widget): void;
    static setBottomLeft($this$setBottomLeft: Widget, bottom: number, left: number): void;
    static setBottomRight($this$setBottomRight: Widget, bottom: number, right: number): void;
    static setHMiddle($this$setHMiddle: Widget, bottom: number, top: number): void;
    static setTopLeft($this$setTopLeft: Widget, top: number, left: number): void;
    static setTopRight($this$setTopRight: Widget, top: number, right: number): void;
    static setVMiddle($this$setVMiddle: Widget, left: number, right: number): void;
  }

}

declare module 'org.anti_ad.mc.common.gui.layout.FlexDirection' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { FlexDirection, Axis } from 'org.anti_ad.mc.common.gui.layout';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    of(axis: Axis, isReverse: boolean): FlexDirection;
  }

}

declare module 'org.anti_ad.mc.common.gui' {
  import { Companion } from 'org.anti_ad.mc.common.gui.NativeInputContext';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class NativeContextBase {
    isOverlay(): boolean;
    isSlotBackground(): boolean;
    setOverlay(bl: boolean): void;
    setSlotBackground(bl: boolean): void;
  }


  interface NativeInputContext<T = any> extends NativeInputContextBase<T> {}
  class NativeInputContext<T = any> extends NativeInputContextBase<T> {
    static readonly Companion: Companion;
    constructor(value: T, doubled: boolean);

    constructor(object: any, bl: boolean, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor();
    component1(): T;
    component2(): boolean;
    copy(value: T, doubled: boolean): NativeInputContext<T>;
    static copy$default(nativeInputContext: NativeInputContext, object: any, bl: boolean, n: number, object2: any): NativeInputContext;
    equals(other: any): boolean;
    get doubled(): boolean;
    static get empty(): any;
    static get iGNORED(): NativeInputContext<any>;
    get value(): T;
    hashCode(): number;
    set doubled(bl: boolean);
    toString(): string;
  }


  class NativeInputContextBase<T = any> {
    get doubled(): boolean;
    get value(): T;
  }

}

declare module 'org.anti_ad.mc.common.gui.NativeInputContext' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { NativeInputContext } from 'org.anti_ad.mc.common.gui';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get empty(): any;
    static get empty$annotations(): void;
    get iGNORED(): NativeInputContext<any>;
    static get iGNORED$annotations(): void;
  }

}

declare module 'org.anti_ad.mc.common.gui.screen' {
  import { Component } from 'net.minecraft.network.chat';
  import { Savable } from 'org.anti_ad.mc.common';
  import { ConfigHotkey, ConfigKeyToggleBoolean } from 'org.anti_ad.mc.common.config.options';
  import { List, Set } from 'java.util';
  import { ConfigDeclaration } from 'org.anti_ad.mc.common.config.builder';
  import { Function0 } from 'kotlin.jvm.functions';
  import { Unit } from 'kotlin';
  import { NativeInputContextBase, NativeContext } from 'org.anti_ad.mc.common.gui';
  import { Minecraft } from 'net.minecraft.client';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { IScreenMarker } from 'org.anti_ad.mc.common.vanilla.glue';
  import { RootWidget, Widget } from 'org.anti_ad.mc.common.gui.widgets';

  class BaseConfigScreenSettings {
    checkAll(): void;
    finish(): void;
    get allToggleSettings(): Set<ConfigKeyToggleBoolean>;
    get configDeclarations(): ConfigDeclaration[];
    get configLabelsPrefix(): string;
    get configOptionsPrefix(): string;
    get configScreenTitle(): Component;
    get onClosed(): Function0<Unit>;
    get openConfigHotkey(): ConfigHotkey;
    get saveManager(): Savable;
    get storedSelectedIndex(): number;
    initMainConfig(): void;
    onInput(context: NativeInputContextBase<any>, lastKey: number, lastAction: number): boolean;
    set storedSelectedIndex(n: number);
    toggleBooleanSettingMessage(value: boolean, key: string): void;
  }


  class BaseDialogKt {
    static access$getCOLOR_BG$p(): number;
  }


  interface BaseOverlay extends BaseScreen {}
  class BaseOverlay extends BaseScreen {
    constructor(text: Component);

    constructor();
    onTick(): void;
    render(context: NativeContext, mouseX: number, mouseY: number, partialTicks: number): void;
    render(context: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    renderParentPost(context: NativeContext, mouseX: number, mouseY: number, partialTicks: number): void;
    resize(minecraftClient: Minecraft, width: number, height: number): void;
    tick(): void;
  }


  interface BaseScreen extends IScreenMarker, Screen {}
  class BaseScreen extends IScreenMarker {
    constructor(text: Component);

    constructor();
    addWidget(widget2: Widget): void;
    applyBlur(f: number): void;
    static applyBlur$default(baseScreen: BaseScreen, f: number, n: number, object: any): void;
    charTyped(charIn: string, modifiers: number): boolean;
    charTyped(context: NativeInputContextBase<any>, charIn: string, modifiers: number): boolean;
    closeScreen(): void;
    dumpWidgetTree(): void;
    get parent(): Screen;
    get rootWidget(): RootWidget;
    get screenInfo(): ScreenInfo;
    get titleString(): string;
    hasParent(screen: Screen): boolean;
    internalClearWidgets(): void;
    isClosing(): boolean;
    isPauseScreen(): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    keyPressed(context: NativeInputContextBase<any>, keyCode: number, scanCode: number, modifiers: number): boolean;
    keyReleased(keyCode: number, scanCode: number, modifiers: number): boolean;
    keyReleased(context: NativeInputContextBase<any>, keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(d: number, e: number, i: number): boolean;
    mouseClicked(context: NativeInputContextBase<any>, d: number, e: number, i: number): boolean;
    mouseDragged(d: number, e: number, i: number, f: number, g: number): boolean;
    mouseDragged(context: NativeInputContextBase<any>, d: number, e: number, i: number, f: number, g: number): boolean;
    mouseReleased(d: number, e: number, i: number): boolean;
    mouseReleased(context: NativeInputContextBase<any>, d: number, e: number, i: number): boolean;
    mouseScrolled(d: number, e: number, horisontal: number, vertical: number): boolean;
    mouseScrolled(context: NativeInputContextBase<any>, d: number, e: number, horisontal: number, vertical: number): boolean;
    onClose(): void;
    render(context: NativeContext, mouseX: number, mouseY: number, partialTicks: number): void;
    render(context: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    renderDarkening(context: GuiGraphics): void;
    renderPanoramaBackground(context: GuiGraphics, delta: number): void;
    renderWidgetPre(context: NativeContext, mouseX: number, mouseY: number, partialTicks: number): void;
    resize(minecraftClient: Minecraft, width: number, height: number): void;
    set parent(screen: Screen);
    setClosing(bl: boolean): void;
  }


  class ConfigOptionHotkeyDialogKt {
  }


  class ConfigScreenBaseKt {
  }

}

declare module 'org.anti_ad.mc.common.gui.widgets' {
  import { NativeInputContextBase, NativeContext } from 'org.anti_ad.mc.common.gui';
  import { Function1, Function0 } from 'kotlin.jvm.functions';
  import { Integer, Boolean } from 'java.lang';
  import { Unit, Pair } from 'kotlin';
  import { ConfigBoolean, ConfigColorPicker, ConfigEnum, ConfigButton, ConfigHotkey, ConfigKeyToggleBoolean, ConfigString } from 'org.anti_ad.mc.common.config.options';
  import { CategorizedMultiConfig, IConfigOptionToggleable, IConfigOptionNumeric, IConfigOption } from 'org.anti_ad.mc.common.config';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Regex } from 'kotlin.text';
  import { IdentifierHolder, Sprite } from 'org.anti_ad.mc.common.vanilla.render.glue';
  import { IButtonWidget, IBaseGlueWidget, ISliderWidget, ITextFieldWidget } from 'org.anti_ad.mc.common.gui.widgets.glue';
  import { Size, Rectangle, Point } from 'org.anti_ad.mc.common.math2d';
  import { EditBox, AbstractSliderButton, Button } from 'net.minecraft.client.gui.components';
  import { Font, GuiGraphics } from 'net.minecraft.client.gui';
  import { BiFlex, AnchorStyles, Overflow } from 'org.anti_ad.mc.common.gui.layout';
  import { List } from 'java.util';

  class AnchoredListWidgetKt {
  }


  class CharTypedEvent {
    constructor(context: NativeInputContextBase<any>, charIn: string, modifiers: number);
    component1(): NativeInputContextBase<any>;
    component2(): string;
    component3(): number;
    copy(context: NativeInputContextBase<any>, charIn: string, modifiers: number): CharTypedEvent;
    static copy$default(charTypedEvent: CharTypedEvent, nativeInputContextBase: NativeInputContextBase, c: string, n: number, n2: number, object: any): CharTypedEvent;
    equals(other: any): boolean;
    get charIn(): string;
    get context(): NativeInputContextBase<any>;
    get modifiers(): number;
    hashCode(): number;
    toString(): string;
  }


  interface ColorSquareWidget extends Widget {}
  class ColorSquareWidget extends Widget {
    constructor(aClickEvent: Function1<number, Unit>);
    get color(): Function0<number>;
    get text(): string;
    mouseClicked(context: NativeInputContextBase<any>, x: number, y: number, button: number): boolean;
    onClick(button: number): void;
    render(context: NativeContext, mouseX: number, mouseY: number, partialTicks: number): void;
    set color(function0: Function0<number>);
    set text(string: string);
  }


  interface ConfigBooleanWidget extends ConfigWidgetBase<ConfigBoolean> {}
  class ConfigBooleanWidget extends ConfigWidgetBase<ConfigBoolean> {
    constructor(configOption: ConfigBoolean);
    get booleanButton(): ConfigOptionToggleableButtonWidget;
    get falseText(): string;
    get trueText(): string;
    set falseText(string: string);
    set trueText(string: string);
  }


  class ConfigButtonClickHandler {
    onClick(guiClick: Function0<Unit>): void;
  }


  class ConfigButtonInfo {
    constructor();
    get buttonText(): string;
    onClick(widget2: CustomButtonWidget): void;
  }


  interface ConfigColorWidget extends ConfigWidgetBase<ConfigColorPicker> {}
  class ConfigColorWidget extends ConfigWidgetBase<ConfigColorPicker> {
    constructor(configOption: ConfigColorPicker);
    get colorSquare(): ColorSquareWidget;
    render(context: NativeContext, mouseX: number, mouseY: number, partialTicks: number): void;
    set colorSquare(colorSquareWidget: ColorSquareWidget);
  }


  class ConfigListWidgetKt {
    static toListWidget($this$toListWidget: CategorizedMultiConfig, displayNameOf: Function1<string, string>, descriptionOf: Function1<string, string>, categoryNameOf: Function1<string, string>): ConfigListWidget;
  }


  interface ConfigOptionToggleableButtonWidget extends CustomButtonWidget {}
  class ConfigOptionToggleableButtonWidget extends CustomButtonWidget {
    constructor(configOptionToggleable: IConfigOptionToggleable, textProvider: Function0<string>);

    constructor(iConfigOptionToggleable: IConfigOptionToggleable, function0: Function0, n: number, defaultConstructorMarker: DefaultConstructorMarker);
    get configOptionToggleable(): IConfigOptionToggleable;
    get textProvider(): Function0<string>;
    render(context: NativeContext, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface ConfigToggleableWidget<T extends IConfigOptionToggleable = any> extends ConfigWidgetBase<T> {}
  class ConfigToggleableWidget<T extends IConfigOptionToggleable = any> extends ConfigWidgetBase<T> {
    constructor(configOption: T, displayText: Function1<T, string>);
    get displayText(): Function1<T, string>;
    get toggleButton(): ConfigOptionToggleableButtonWidget;
    set displayText(function1: Function1<T, string>);
  }


  class ConfigWidgetsCommonKt {
    static toWidget($this$toWidget: ConfigBoolean): ConfigBooleanWidget;
    static toWidget($this$toWidget: ConfigEnum<any>): ConfigToggleableWidget<ConfigEnum<any>>;
    static toWidget($this$toWidget: ConfigButton): ConfigButtonWidget;
  }


  class ConfigWidgetsKt {
    static access$getPATTERN_DOUBLE$p(): Regex;
    static access$getPATTERN_INTEGER$p(): Regex;
    static access$getWIDGETS_TEXTURE$p(): IdentifierHolder;
    static toConfigWidget($this$toConfigWidget: IConfigOption): ConfigWidgetBase<IConfigOption>;
    static toWidget($this$toWidget: ConfigHotkey): ConfigHotkeyWidget;
    static toWidget($this$toWidget: ConfigKeyToggleBoolean): ConfigKeyToggleBooleanWidget;
    static toWidget($this$toWidget: ConfigColorPicker): ConfigColorWidget;
    static toWidget($this$toWidget: IConfigOptionNumeric<any>): ConfigNumericWidget;
    static toWidget($this$toWidget: ConfigString): ConfigStringWidget;
  }


  class ConfigWidgetsMoreKt {
    static access$getBaseSprite$p(): Sprite;
    static access$getModifiedSprite$p(): Sprite;
    static access$translate(suffix: string): string;
    static get lIBIPN_WIDGETS_TEXTURE(): IdentifierHolder;
  }


  interface CustomButtonWidget extends IButtonWidget, VanillaWidget<NativeButtonWidget> {}
  class CustomButtonWidget extends IButtonWidget {
    constructor();

    constructor(clickEvent: Function1<number, Unit>);

    constructor(clickEvent: Function0<Unit>);
    get active(): boolean;
    get clickEvent(): Function1<number, Unit>;
    get clickThrough(): boolean;
    get size(): Size;
    get sizeModifier(): Size;
    get text(): string;
    mouseClicked(context: NativeInputContextBase<any>, x: number, y: number, button: number): boolean;
    onClick(button: number): void;
    render(context: NativeContext, mouseX: number, mouseY: number, partialTicks: number): void;
    renderButton(context: NativeContext, hovered: boolean): void;
    set active(value: boolean);
    set clickEvent(function1: Function1<number, Unit>);
    set clickThrough(bl: boolean);
    set size(value: Size);
    set sizeModifier(size: Size);
    set text(value: string);
  }


  interface CustomTextFieldWidget extends EditBox {}
  class CustomTextFieldWidget extends EditBox {
    constructor(textRenderer: Font, i: number, j: number, k: number, l: number, string: string);
    setFocused(bl: boolean): void;
  }


  interface CustomVanillaSliderWidget extends AbstractSliderButton {}
  class CustomVanillaSliderWidget extends AbstractSliderButton {
    constructor(minValue: number, maxValue: number);
    get maxValue(): number;
    get minValue(): number;
    get translatedValue(): number;
    get valueChangedEvent(): Function0<Unit>;
    renderWidget(drawContext: GuiGraphics, i: number, j: number, f: number): void;
    set translatedValue(value: number);
    set valueChangedEvent(function0: Function0<Unit>);
  }


  class Event<T = any> {
    invoke(data: T): void;
    minusAssign(handler: Function1<T, Unit>): void;
    plusAssign(handler: Function1<T, Unit>): void;
  }


  interface FlexWidgetBase extends Widget {}
  class FlexWidgetBase extends Widget {
    get flex(): BiFlex;
  }


  interface HudLabeledText extends Widget {}
  class HudLabeledText extends Widget {
    constructor(label: string, text: string);

    constructor(pair: Pair<string, string>);
    render(context: NativeContext, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface HudText extends Widget {}
  class HudText extends Widget {
    constructor(text: string);
    render(context: NativeContext, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface IPNButtonWidget extends Widget {}
  class IPNButtonWidget extends Widget {
    constructor(clickEvent: Function1<number, Unit>);

    constructor(clickEvent: Function0<Unit>);

    constructor();
    get clickEvent(): Function1<number, Unit>;
    get clickThrough(): boolean;
    mouseClicked(context: NativeInputContextBase<any>, x: number, y: number, button: number): boolean;
    onClick(button: number): void;
    render(context: NativeContext, mouseX: number, mouseY: number, partialTicks: number): void;
    renderButton(context: NativeContext, hovered: boolean): void;
    set clickEvent(function1: Function1<number, Unit>);
    set clickThrough(bl: boolean);
  }


  interface IWidget<T extends IWidget<T> = any> extends IWidgetHierarchical<T>, IWidgetPositioning, IWidgetEventTarget<T>, IWidgetRenderer, IBaseGlueWidget {}
  class IWidget<T extends IWidget<T> = any> extends IWidgetHierarchical<T> {
    childrenZIndexed(): T[];
    get absoluteBounds(): Rectangle;
    get children(): T[];
    get parent(): T;
    get zIndex(): number;
    set absoluteBounds(var1: Rectangle);
    set parent(var1: T);
  }


  class IWidgetHierarchical<T extends IWidgetHierarchical<T> = any> {
    get children(): T[];
    get parent(): T;
  }


  class IWidgetPositioning {
    get absoluteBounds(): Rectangle;
    get anchor(): AnchorStyles;
    get bottom(): number;
    get bounds(): Rectangle;
    get containerHeight(): number;
    get containerScreenLocation(): Point;
    get containerScreenX(): number;
    get containerScreenY(): number;
    get containerSize(): Size;
    get containerWidth(): number;
    get height(): number;
    get left(): number;
    get location(): Point;
    get parent(): IWidgetPositioning;
    get right(): number;
    get screenLocation(): Point;
    get screenX(): number;
    get screenY(): number;
    get size(): Size;
    get top(): number;
    get width(): number;
    set absoluteBounds(var1: Rectangle);
    set bottom(var1: number);
    set bounds(var1: Rectangle);
    set height(var1: number);
    set left(var1: number);
    set location(var1: Point);
    set right(var1: number);
    set screenLocation(var1: Point);
    set screenX(var1: number);
    set screenY(var1: number);
    set size(var1: Size);
    set top(var1: number);
    set width(var1: number);
  }


  class IWidgetRenderer {
    childrenZIndexed(): IWidgetRenderer[];
    disabled(): boolean;
    get absoluteBounds(): Rectangle;
    get overflow(): Overflow;
    get visible(): boolean;
    render(var1: NativeContext, var2: number, var3: number, var4: number): void;
    set visible(var1: boolean);
  }


  class KeyEvent {
    constructor(context: NativeInputContextBase<any>, keyCode: number, scanCode: number, modifiers: number);
    component1(): NativeInputContextBase<any>;
    component2(): number;
    component3(): number;
    component4(): number;
    copy(context: NativeInputContextBase<any>, keyCode: number, scanCode: number, modifiers: number): KeyEvent;
    static copy$default(keyEvent: KeyEvent, nativeInputContextBase: NativeInputContextBase, n: number, n2: number, n3: number, n4: number, object: any): KeyEvent;
    equals(other: any): boolean;
    get context(): NativeInputContextBase<any>;
    get keyCode(): number;
    get modifiers(): number;
    get scanCode(): number;
    hashCode(): number;
    toString(): string;
  }


  class LocationChangedEvent {
    constructor(oldValue: Point, newValue: Point);
    component1(): Point;
    component2(): Point;
    copy(oldValue: Point, newValue: Point): LocationChangedEvent;
    static copy$default(locationChangedEvent: LocationChangedEvent, point: Point, point2: Point, n: number, object: any): LocationChangedEvent;
    equals(other: any): boolean;
    get newValue(): Point;
    get oldValue(): Point;
    hashCode(): number;
    toString(): string;
  }


  class MouseDraggedEvent {
    constructor(context: NativeInputContextBase<any>, x: number, y: number, button: number, dx: number, dy: number);
    component1(): NativeInputContextBase<any>;
    component2(): number;
    component3(): number;
    component4(): number;
    component5(): number;
    component6(): number;
    copy(context: NativeInputContextBase<any>, x: number, y: number, button: number, dx: number, dy: number): MouseDraggedEvent;
    static copy$default(mouseDraggedEvent: MouseDraggedEvent, nativeInputContextBase: NativeInputContextBase, d: number, d2: number, n: number, d3: number, d4: number, n2: number, object: any): MouseDraggedEvent;
    equals(other: any): boolean;
    get button(): number;
    get context(): NativeInputContextBase<any>;
    get dx(): number;
    get dy(): number;
    get x(): number;
    get y(): number;
    hashCode(): number;
    toString(): string;
  }


  class MouseEvent {
    constructor(context: NativeInputContextBase<any>, x: number, y: number, button: number);
    component1(): NativeInputContextBase<any>;
    component2(): number;
    component3(): number;
    component4(): number;
    copy(context: NativeInputContextBase<any>, x: number, y: number, button: number): MouseEvent;
    static copy$default(mouseEvent: MouseEvent, nativeInputContextBase: NativeInputContextBase, n: number, n2: number, n3: number, n4: number, object: any): MouseEvent;
    equals(other: any): boolean;
    get button(): number;
    get context(): NativeInputContextBase<any>;
    get x(): number;
    get y(): number;
    hashCode(): number;
    toString(): string;
  }


  class MouseScrolledEvent {
    constructor(context: NativeInputContextBase<any>, x: number, y: number, horisontal: number, vertical: number);
    component1(): NativeInputContextBase<any>;
    component2(): number;
    component3(): number;
    component4(): number;
    component5(): number;
    copy(context: NativeInputContextBase<any>, x: number, y: number, horisontal: number, vertical: number): MouseScrolledEvent;
    static copy$default(mouseScrolledEvent: MouseScrolledEvent, nativeInputContextBase: NativeInputContextBase, n: number, n2: number, d: number, d2: number, n3: number, object: any): MouseScrolledEvent;
    equals(other: any): boolean;
    get context(): NativeInputContextBase<any>;
    get horisontal(): number;
    get vertical(): number;
    get x(): number;
    get y(): number;
    hashCode(): number;
    toString(): string;
  }


  interface NativeButtonWidget extends Button {}
  class NativeButtonWidget extends Button {
    constructor();
    get sHeight(): number;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseClicked(x: number, y: number, button: number): boolean;
    set sHeight(value: number);
  }


  class Page {
    constructor(name: string);
    get content(): string[];
    get name(): string;
    get widget(): Widget;
    preRender(mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface RootWidget extends Widget {}
  class RootWidget extends Widget {
    constructor();
    charTyped(context: NativeInputContextBase<any>, charIn: string, modifiers: number): boolean;
    get allowParent(): boolean;
    get mouseRelease(): RoutedEvent<MouseEvent>;
    getCharTyped(): RoutedEvent<CharTypedEvent>;
    getKeyPressed(): RoutedEvent<KeyEvent>;
    getKeyReleased(): RoutedEvent<KeyEvent>;
    getMouseClicked(): RoutedEvent<MouseEvent>;
    getMouseDragged(): RoutedEvent<MouseDraggedEvent>;
    getMouseScrolled(): RoutedEvent<MouseScrolledEvent>;
    keyPressed(context: NativeInputContextBase<any>, keyCode: number, scanCode: number, modifiers: number): boolean;
    keyReleased(context: NativeInputContextBase<any>, keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(context: NativeInputContextBase<any>, x: number, y: number, button: number): boolean;
    mouseDragged(context: NativeInputContextBase<any>, x: number, y: number, button: number, dx: number, dy: number): boolean;
    mouseReleased(context: NativeInputContextBase<any>, x: number, y: number, button: number): boolean;
    mouseScrolled(context: NativeInputContextBase<any>, x: number, y: number, horisontal: number, vertical: number): boolean;
  }


  class RootWidgetKt {
    static access$orInvoke($receiver: RoutedEvent, event: any, handled: boolean): boolean;
  }


  class ScrollableContainerWidgetKt {
  }


  class SizeChangedEvent {
    constructor(oldValue: Size, newValue: Size);
    component1(): Size;
    component2(): Size;
    copy(oldValue: Size, newValue: Size): SizeChangedEvent;
    static copy$default(sizeChangedEvent: SizeChangedEvent, size: Size, size2: Size, n: number, object: any): SizeChangedEvent;
    equals(other: any): boolean;
    get newValue(): Size;
    get oldValue(): Size;
    hashCode(): number;
    toString(): string;
  }


  interface SliderWidget extends ISliderWidget, VanillaWidget<AbstractSliderButton> {}
  class SliderWidget extends ISliderWidget {
    constructor(minValue: number, maxValue: number);

    constructor(d: number, d2: number, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor();
    get maxValue(): number;
    get minValue(): number;
    get value(): number;
    get valueChangedEvent(): Function0<Unit>;
    set value(value: number);
    set valueChangedEvent(value: Function0<Unit>);
  }


  interface TextButtonWidget extends IPNButtonWidget {}
  class TextButtonWidget extends IPNButtonWidget {
    constructor(text: string, clickEvent: Function1<number, Unit>);

    constructor(text: string, clickEvent: Function0<Unit>);

    constructor(text: string);

    constructor();
    contains(mouseX: number, mouseY: number): boolean;
    get displayText(): string;
    get hoverText(): string;
    get hovered(): boolean;
    get inactiveText(): string;
    get pressableMargin(): number;
    renderButton(context: NativeContext, hovered: boolean): void;
    set hoverText(string: string);
    set hovered(bl: boolean);
    set inactiveText(string: string);
    set pressableMargin(n: number);
    setAllText(text: string): void;
    updateWidth(): void;
  }


  interface TextFieldWidget extends ITextFieldWidget, VanillaWidget<EditBox> {}
  class TextFieldWidget extends ITextFieldWidget {
    constructor(height: number);
    editing(): boolean;
    get changedEvent(): Function1<string, Unit>;
    get textPredicate(): Function1<string, boolean>;
    get vanillaFocused(): boolean;
    get vanillaText(): string;
    gotFocus(): void;
    lostFocus(): void;
    set changedEvent(value: Function1<string, Unit>);
    set textPredicate(value: Function1<string, boolean>);
    set vanillaFocused(value: boolean);
    set vanillaText(value: string);
  }


  interface VanillaWidget<T extends AbstractWidget = any> extends Widget {}
  class VanillaWidget<T extends AbstractWidget = any> extends Widget {
    constructor(vanilla: T);
    charTyped(context: NativeInputContextBase<any>, charIn: string, modifiers: number): boolean;
    get vanilla(): T;
    get vanillaMessage(): string;
    keyPressed(context: NativeInputContextBase<any>, keyCode: number, scanCode: number, modifiers: number): boolean;
    keyReleased(context: NativeInputContextBase<any>, keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(context: NativeInputContextBase<any>, x: number, y: number, button: number): boolean;
    mouseDragged(context: NativeInputContextBase<any>, x: number, y: number, button: number, dx: number, dy: number): boolean;
    mouseReleased(context: NativeInputContextBase<any>, x: number, y: number, button: number): boolean;
    mouseScrolled(context: NativeInputContextBase<any>, x: number, y: number, horizontal: number, vertical: number): boolean;
    render(context: NativeContext, mouseX: number, mouseY: number, partialTicks: number): void;
    set vanillaMessage(value: string);
  }


  class VanillaWidgetsKt {
    static newButtonWidget(): IButtonWidget;
    static newButtonWidget(clickEvent: Function0<Unit>): IButtonWidget;
    static newButtonWidget(clickEvent: Function1<number, Unit>): IButtonWidget;
    static newSliderWidget(minValue: number, maxValue: number): ISliderWidget;
    static newSliderWidget$default(d: number, d2: number, n: number, object: any): ISliderWidget;
    static newTextFieldWidget(height: number): ITextFieldWidget;
  }


  class WidgetKt {
    static access$resizeChildren($receiver: IWidgetPositioning, oldValue: Size, newValue: Size): void;
  }

}

declare module 'org.anti_ad.mc.common.gui.widgets.glue' {
  import { Companion } from 'org.anti_ad.mc.common.gui.widgets.glue.IBaseGlueWidget';
  import { Widget } from 'org.anti_ad.mc.common.gui.widgets';
  import { Companion as org_anti_ad_mc_common_gui_widgets_glue_ibuttonwidget_Companion } from 'org.anti_ad.mc.common.gui.widgets.glue.IButtonWidget';
  import { Function1, Function0 } from 'kotlin.jvm.functions';
  import { Integer, Boolean } from 'java.lang';
  import { Unit } from 'kotlin';
  import { NativeContext } from 'org.anti_ad.mc.common.gui';
  import { Companion as org_anti_ad_mc_common_gui_widgets_glue_isliderwidget_Companion } from 'org.anti_ad.mc.common.gui.widgets.glue.ISliderWidget';
  import { Companion as org_anti_ad_mc_common_gui_widgets_glue_itextfieldwidget_Companion } from 'org.anti_ad.mc.common.gui.widgets.glue.ITextFieldWidget';

  class IBaseGlueWidget {
    static readonly Companion: Companion;
    get toWidget(): Widget;
  }


  interface IButtonWidget extends IBaseGlueWidget {}
  class IButtonWidget extends IBaseGlueWidget {
    static readonly Companion: org_anti_ad_mc_common_gui_widgets_glue_ibuttonwidget_Companion;
    get clickEvent(): Function1<number, Unit>;
    get clickThrough(): boolean;
    onClick(var1: number): void;
    render(var1: NativeContext, var2: number, var3: number, var4: number): void;
    renderButton(var1: NativeContext, var2: boolean): void;
    set clickEvent(var1: Function1<number, Unit>);
    set clickThrough(var1: boolean);
  }


  interface ISliderWidget extends IBaseGlueWidget {}
  class ISliderWidget extends IBaseGlueWidget {
    static readonly Companion: org_anti_ad_mc_common_gui_widgets_glue_isliderwidget_Companion;
    get maxValue(): number;
    get minValue(): number;
    get value(): number;
    get valueChangedEvent(): Function0<Unit>;
    get vanillaMessage(): string;
    set value(var1: number);
    set valueChangedEvent(var1: Function0<Unit>);
    set vanillaMessage(var1: string);
  }


  interface ITextFieldWidget extends IBaseGlueWidget {}
  class ITextFieldWidget extends IBaseGlueWidget {
    static readonly Companion: org_anti_ad_mc_common_gui_widgets_glue_itextfieldwidget_Companion;
    editing(): boolean;
    get changedEvent(): Function1<string, Unit>;
    get textPredicate(): Function1<string, boolean>;
    get vanillaFocused(): boolean;
    get vanillaText(): string;
    gotFocus(): void;
    lostFocus(): void;
    set changedEvent(var1: Function1<string, Unit>);
    set textPredicate(var1: Function1<string, boolean>);
    set vanillaFocused(var1: boolean);
    set vanillaText(var1: string);
  }

}

declare module 'org.anti_ad.mc.common.gui.widgets.glue.IBaseGlueWidget' {
  import { Widget } from 'org.anti_ad.mc.common.gui.widgets';
  import { IBaseGlueWidget } from 'org.anti_ad.mc.common.gui.widgets.glue';

  class Companion {
    invoke<T extends Widget>($this$invoke: IBaseGlueWidget): Widget;
  }


  class DefaultImpls {
    static getToWidget($this: IBaseGlueWidget): Widget;
  }

}

declare module 'org.anti_ad.mc.common.gui.widgets.glue.IButtonWidget' {
  import { IButtonWidget } from 'org.anti_ad.mc.common.gui.widgets.glue';
  import { Function0, Function1 } from 'kotlin.jvm.functions';
  import { Unit } from 'kotlin';
  import { Integer } from 'java.lang';
  import { Widget } from 'org.anti_ad.mc.common.gui.widgets';

  class Companion {
    invoke(): IButtonWidget;
    invoke(clickEvent: Function0<Unit>): IButtonWidget;
    invoke(clickEvent: Function1<number, Unit>): IButtonWidget;
  }


  class DefaultImpls {
    static getToWidget($this: IButtonWidget): Widget;
  }

}

declare module 'org.anti_ad.mc.common.gui.widgets.glue.ISliderWidget' {
  import { ISliderWidget } from 'org.anti_ad.mc.common.gui.widgets.glue';
  import { Widget } from 'org.anti_ad.mc.common.gui.widgets';

  class Companion {
    invoke(minValue: number, maxValue: number): ISliderWidget;
    static invoke$default(companion: Companion, d: number, d2: number, n: number, object: any): ISliderWidget;
  }


  class DefaultImpls {
    static getToWidget($this: ISliderWidget): Widget;
  }

}

declare module 'org.anti_ad.mc.common.gui.widgets.glue.ITextFieldWidget' {
  import { ITextFieldWidget } from 'org.anti_ad.mc.common.gui.widgets.glue';
  import { Widget } from 'org.anti_ad.mc.common.gui.widgets';

  class Companion {
    invoke(height: number): ITextFieldWidget;
  }


  class DefaultImpls {
    static getToWidget($this: ITextFieldWidget): Widget;
  }

}

declare module 'org.anti_ad.mc.common.gui.widgets.IWidget' {
  import { Rectangle, Size, Point } from 'org.anti_ad.mc.common.math2d';
  import { IWidget, Widget } from 'org.anti_ad.mc.common.gui.widgets';
  import { List } from 'java.util';
  import { NativeInputContextBase, NativeContext } from 'org.anti_ad.mc.common.gui';

  class DefaultImpls {
    static captures<T extends IWidget<T>>($this: IWidget<T>, x: number, y: number): boolean;
    static charTyped<T extends IWidget<T>>($this: IWidget<T>, context: NativeInputContextBase<any>, charIn: string, modifiers: number): boolean;
    static childrenZIndexed<T extends IWidget<T>>($this: IWidget<T>, a: T, b: T): T[];
    static getAbsoluteBounds<T extends IWidget<T>>($this: IWidget<T>): Rectangle;
    static getBottom<T extends IWidget<T>>($this: IWidget<T>): number;
    static getBounds<T extends IWidget<T>>($this: IWidget<T>): Rectangle;
    static getContainerHeight<T extends IWidget<T>>($this: IWidget<T>): number;
    static getContainerScreenLocation<T extends IWidget<T>>($this: IWidget<T>): Point;
    static getContainerScreenX<T extends IWidget<T>>($this: IWidget<T>): number;
    static getContainerScreenY<T extends IWidget<T>>($this: IWidget<T>): number;
    static getContainerSize<T extends IWidget<T>>($this: IWidget<T>): Size;
    static getContainerWidth<T extends IWidget<T>>($this: IWidget<T>): number;
    static getHeight<T extends IWidget<T>>($this: IWidget<T>): number;
    static getLeft<T extends IWidget<T>>($this: IWidget<T>): number;
    static getRight<T extends IWidget<T>>($this: IWidget<T>): number;
    static getScreenLocation<T extends IWidget<T>>($this: IWidget<T>): Point;
    static getScreenX<T extends IWidget<T>>($this: IWidget<T>): number;
    static getScreenY<T extends IWidget<T>>($this: IWidget<T>): number;
    static getToWidget<T extends IWidget<T>>($this: IWidget<T>): Widget;
    static getTop<T extends IWidget<T>>($this: IWidget<T>): number;
    static getWidth<T extends IWidget<T>>($this: IWidget<T>): number;
    static keyPressed<T extends IWidget<T>>($this: IWidget<T>, context: NativeInputContextBase<any>, keyCode: number, scanCode: number, modifiers: number): boolean;
    static keyReleased<T extends IWidget<T>>($this: IWidget<T>, context: NativeInputContextBase<any>, keyCode: number, scanCode: number, modifiers: number): boolean;
    static mouseClicked<T extends IWidget<T>>($this: IWidget<T>, context: NativeInputContextBase<any>, x: number, y: number, button: number): boolean;
    static mouseDragged<T extends IWidget<T>>($this: IWidget<T>, context: NativeInputContextBase<any>, x: number, y: number, button: number, dx: number, dy: number): boolean;
    static mouseReleased<T extends IWidget<T>>($this: IWidget<T>, context: NativeInputContextBase<any>, x: number, y: number, button: number): boolean;
    static mouseScrolled<T extends IWidget<T>>($this: IWidget<T>, context: NativeInputContextBase<any>, x: number, y: number, horizontal: number, vertical: number): boolean;
    static render<T extends IWidget<T>>($this: IWidget<T>, context: NativeContext, mouseX: number, mouseY: number, partialTicks: number): void;
    static setAbsoluteBounds<T extends IWidget<T>>($this: IWidget<T>, value: Rectangle): void;
    static setBottom<T extends IWidget<T>>($this: IWidget<T>, value: number): void;
    static setBounds<T extends IWidget<T>>($this: IWidget<T>, value: Rectangle): void;
    static setHeight<T extends IWidget<T>>($this: IWidget<T>, value: number): void;
    static setLeft<T extends IWidget<T>>($this: IWidget<T>, value: number): void;
    static setRight<T extends IWidget<T>>($this: IWidget<T>, value: number): void;
    static setScreenLocation<T extends IWidget<T>>($this: IWidget<T>, value: Point): void;
    static setScreenX<T extends IWidget<T>>($this: IWidget<T>, value: number): void;
    static setScreenY<T extends IWidget<T>>($this: IWidget<T>, value: number): void;
    static setTop<T extends IWidget<T>>($this: IWidget<T>, value: number): void;
    static setWidth<T extends IWidget<T>>($this: IWidget<T>, value: number): void;
  }

}

declare module 'org.anti_ad.mc.common.gui.widgets.IWidgetPositioning' {
  import { IWidgetPositioning } from 'org.anti_ad.mc.common.gui.widgets';
  import { Rectangle, Size, Point } from 'org.anti_ad.mc.common.math2d';

  class DefaultImpls {
    static getAbsoluteBounds($this: IWidgetPositioning): Rectangle;
    static getBottom($this: IWidgetPositioning): number;
    static getBounds($this: IWidgetPositioning): Rectangle;
    static getContainerHeight($this: IWidgetPositioning): number;
    static getContainerScreenLocation($this: IWidgetPositioning): Point;
    static getContainerScreenX($this: IWidgetPositioning): number;
    static getContainerScreenY($this: IWidgetPositioning): number;
    static getContainerSize($this: IWidgetPositioning): Size;
    static getContainerWidth($this: IWidgetPositioning): number;
    static getHeight($this: IWidgetPositioning): number;
    static getLeft($this: IWidgetPositioning): number;
    static getRight($this: IWidgetPositioning): number;
    static getScreenLocation($this: IWidgetPositioning): Point;
    static getScreenX($this: IWidgetPositioning): number;
    static getScreenY($this: IWidgetPositioning): number;
    static getTop($this: IWidgetPositioning): number;
    static getWidth($this: IWidgetPositioning): number;
    static setAbsoluteBounds($this: IWidgetPositioning, value: Rectangle): void;
    static setBottom($this: IWidgetPositioning, value: number): void;
    static setBounds($this: IWidgetPositioning, value: Rectangle): void;
    static setHeight($this: IWidgetPositioning, value: number): void;
    static setLeft($this: IWidgetPositioning, value: number): void;
    static setRight($this: IWidgetPositioning, value: number): void;
    static setScreenLocation($this: IWidgetPositioning, value: Point): void;
    static setScreenX($this: IWidgetPositioning, value: number): void;
    static setScreenY($this: IWidgetPositioning, value: number): void;
    static setTop($this: IWidgetPositioning, value: number): void;
    static setWidth($this: IWidgetPositioning, value: number): void;
  }

}

declare module 'org.anti_ad.mc.common.gui.widgets.IWidgetRenderer' {
  import { IWidgetRenderer } from 'org.anti_ad.mc.common.gui.widgets';
  import { NativeContext } from 'org.anti_ad.mc.common.gui';

  class DefaultImpls {
    static render($this: IWidgetRenderer, context: NativeContext, mouseX: number, mouseY: number, partialTicks: number): void;
  }

}

declare module 'org.anti_ad.mc.common' {
  import { NativeInputContextBase } from 'org.anti_ad.mc.common.gui';

  class IInputHandler {
    onInput(var1: NativeInputContextBase<any>, var2: number, var3: number): boolean;
  }


  class LibIPNKt {
    static init(): void;
  }


  class Savable {
    load(): void;
    save(): void;
  }


  class ScreenEventListener {
    charTyped(var1: NativeInputContextBase<any>, var2: string, var3: number): boolean;
    keyPressed(var1: NativeInputContextBase<any>, var2: number, var3: number, var4: number): boolean;
    keyReleased(var1: NativeInputContextBase<any>, var2: number, var3: number, var4: number): boolean;
    mouseClicked(var1: NativeInputContextBase<any>, var2: number, var4: number, var6: number): boolean;
    mouseDragged(var1: NativeInputContextBase<any>, var2: number, var4: number, var6: number, var7: number, var9: number): boolean;
    mouseRelease(var1: NativeInputContextBase<any>, var2: number, var4: number, var6: number): boolean;
    mouseScrolled(var1: NativeInputContextBase<any>, var2: number, var4: number, var6: number, var8: number): boolean;
    resize(var1: number, var2: number): void;
  }

}

declare module 'org.anti_ad.mc.common.input' {
  import { List, Set } from 'java.util';
  import { Integer } from 'java.lang';
  import { NativeInputContextBase } from 'org.anti_ad.mc.common.gui';
  import { IInputHandler, ScreenEventListener } from 'org.anti_ad.mc.common';

  interface AlternativeKeybind extends IKeybind {}
  class AlternativeKeybind extends IKeybind {
    constructor(parent: IKeybind);
    get defaultKeyCodes(): number[];
    get defaultSettings(): KeybindSettings;
    get keyCodes(): number[];
    get parent(): IKeybind;
    get settings(): KeybindSettings;
    isSettingsModified(): boolean;
    resetKeyCodesToDefault(): void;
    resetSettingsToDefault(): void;
    set keyCodes(list: number[]);
    set settings(value: KeybindSettings);
  }


  class GlobalInputHandler {
    static readonly INSTANCE: GlobalInputHandler;
    altAnd(...keyCodes: number[]): boolean;
    arePressed(...keyCodes: number[]): boolean;
    ctrlAnd(...keyCodes: number[]): boolean;
    get currentAssigningKeybind(): IKeybind;
    get lastAction(): number;
    get lastKey(): number;
    get pressedKeys(): Set<number>;
    get previousPressedKeys(): Set<number>;
    isActivated(keyCodes: number[], settings: KeybindSettings): boolean;
    isKeyDown(aKeyCode: number, window: number): boolean;
    isPressing(keyCodes: number[], settings: KeybindSettings): boolean;
    isWaitingForRelease(key: number): boolean;
    onKey(context: NativeInputContextBase<any>, key: number, scanCode: number, action: number, modifiers: number, checkPressing: boolean, handle: number): boolean;
    onMouseButton(context: NativeInputContextBase<any>, button: number, action: number, mods: number): boolean;
    register(inputHandler: IInputHandler): boolean;
    registerCancellable(inputHandler: IInputHandler): boolean;
    set currentAssigningKeybind(value: IKeybind);
    shiftAnd(...keyCodes: number[]): boolean;
    superAnd(...keyCodes: number[]): boolean;
    unregister(inputHandler: IInputHandler): boolean;
    unregisterCancellable(inputHandler: IInputHandler): boolean;
  }


  class GlobalScreenEventListener {
    static readonly INSTANCE: GlobalScreenEventListener;
    onCharTyped(context: NativeInputContextBase<any>, charIn: string, modifiers: number, pre: boolean): boolean;
    onKey(context: NativeInputContextBase<any>, key: number, scanCode: number, action: number, modifiers: number, repeatEvents: boolean, pre: boolean): boolean;
    onKey120(context: NativeInputContextBase<any>, key: number, scanCode: number, action: number, modifiers: number, pre: boolean): boolean;
    onKeyPressed(context: NativeInputContextBase<any>, keyCode: number, scanCode: number, modifiers: number, pre: boolean): boolean;
    onKeyReleased(context: NativeInputContextBase<any>, keyCode: number, scanCode: number, modifiers: number, pre: boolean): boolean;
    onMouse(context: NativeInputContextBase<any>, button: number, action: number, mods: number, pre: boolean): boolean;
    onMouseClicked(context: NativeInputContextBase<any>, x: number, y: number, button: number, pre: boolean): boolean;
    onMouseCursorPos(context: NativeInputContextBase<any>, paramX: number, paramY: number, activeButton: number, glfwTime: number, pre: boolean): boolean;
    onMouseDragged(context: NativeInputContextBase<any>, x: number, y: number, button: number, dx: number, dy: number, pre: boolean): boolean;
    onMouseReleased(context: NativeInputContextBase<any>, x: number, y: number, button: number, pre: boolean): boolean;
    onMouseScrolled(context: NativeInputContextBase<any>, x: number, y: number, hotizontal: number, vertical: number, pre: boolean): boolean;
    onResize(width: number, height: number): void;
    registerPost(listener: ScreenEventListener): boolean;
    registerPre(listener: ScreenEventListener): boolean;
    unregisterPost(listener: ScreenEventListener): boolean;
    unregisterPre(listener: ScreenEventListener): boolean;
  }


  class KeyCodes {
    static readonly INSTANCE: KeyCodes;
    static readonly KEY_UNKNOWN: number;
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
    static readonly KEY_LAST: number;
    static readonly MOUSE_BUTTON_1: number;
    static readonly MOUSE_BUTTON_2: number;
    static readonly MOUSE_BUTTON_3: number;
    static readonly MOUSE_BUTTON_4: number;
    static readonly MOUSE_BUTTON_5: number;
    static readonly MOUSE_BUTTON_6: number;
    static readonly MOUSE_BUTTON_7: number;
    static readonly MOUSE_BUTTON_8: number;
    static readonly MOUSE_SCROLL_UP: number;
    static readonly MOUSE_SCROLL_DOWN: number;
    static readonly MOUSE_SCROLL_LEFT: number;
    static readonly MOUSE_SCROLL_RIGHT: number;
    get modifiers(): Set<number>;
    getFriendlyName(name: string): string;
    getFriendlyName(keyCode: number): string;
    getKeyCode(name: string): number;
    getModifierKeyCode(keyCode: number): number;
    getModifierName(keyCode: number): string;
    getName(keyCode: number): string;
  }


  interface MainKeybind extends IKeybind {}
  class MainKeybind extends IKeybind {
    constructor(defaultStorageString: string, defaultSettings: KeybindSettings);
    get defaultKeyCodes(): number[];
    get defaultSettings(): KeybindSettings;
    get keyCodes(): number[];
    get settings(): KeybindSettings;
    set keyCodes(list: number[]);
    set settings(keybindSettings: KeybindSettings);
  }

}

declare module 'org.anti_ad.mc.common.math2d' {
  import { Enum } from 'java.lang';
  import { EnumEntries } from 'kotlin.enums';
  import { Rectangle as java_awt_Rectangle } from 'java.awt';
  import { Line2D } from 'java.awt.geom';

  interface Corner extends Enum<Corner> {}
  class Corner extends Enum<Corner> {
    static readonly TOP_LEFT: Corner;
    static readonly TOP_RIGHT: Corner;
    static readonly BOTTOM_LEFT: Corner;
    static readonly BOTTOM_RIGHT: Corner;
    static get entries(): EnumEntries<Corner>;
    isBottom(): boolean;
    isLeft(): boolean;
    isRight(): boolean;
    isTop(): boolean;
    static valueOf(value: string): Corner;
    static values(): Corner[];
  }


  class Line {
    constructor(startX: number, startY: number, endX: number, endY: number);

    constructor(start: Point, end: Point);
    component1(): number;
    component2(): number;
    component3(): number;
    component4(): number;
    copy(startX: number, startY: number, endX: number, endY: number): Line;
    static copy$default(line: Line, n: number, n2: number, n3: number, n4: number, n5: number, object: any): Line;
    equals(other: any): boolean;
    get end(): Point;
    get endX(): number;
    get endY(): number;
    get maxX(): number;
    get maxY(): number;
    get minX(): number;
    get minY(): number;
    get start(): Point;
    get startX(): number;
    get startY(): number;
    hashCode(): number;
    isHorizontal(): boolean;
    isPoint(): boolean;
    isVertical(): boolean;
    toString(): string;
  }


  class LineKt {
    static getAwt($this$awt: Rectangle): java_awt_Rectangle;
    static getAwt($this$awt: Line): Line2D;
    static getAwtPixel($this$awtPixel: Line): Line2D;
    static getDiagonal($this$diagonal: Rectangle): Line;
    static intersects($this$intersects: Line, other: Line): boolean;
    static intersects($this$intersects: Line, rectangle: Rectangle): boolean;
    static toRectangle($this$toRectangle: Line): Rectangle;
  }


  class Point {
    constructor(x: number, y: number);
    component1(): number;
    component2(): number;
    copy(x: number, y: number): Point;
    static copy$default(point: Point, n: number, n2: number, n3: number, object: any): Point;
    equals(other: any): boolean;
    get x(): number;
    get y(): number;
    hashCode(): number;
    minus(size: Size): Point;
    minus(point: Point): Point;
    plus(size: Size): Point;
    plus(point: Point): Point;
    toString(): string;
    unaryMinus(): Point;
    unaryPlus(): Point;
  }


  class Rect2dKt {
    static intersect($this$intersect: Rectangle, other: Rectangle): Rectangle;
    static normalize($this$normalize: Rectangle): Rectangle;
    static positiveOrEmpty($this$positiveOrEmpty: Rectangle): Rectangle;
    static toPoint($this$toPoint: Size): Point;
    static toSize($this$toSize: Point): Size;
    static transpose($this$transpose: Point): Point;
    static transpose($this$transpose: Size): Size;
  }


  class Rectangle {
    constructor(x: number, y: number, width: number, height: number);

    constructor(location: Point, size: Size);
    component1(): number;
    component2(): number;
    component3(): number;
    component4(): number;
    contains(point: Point): boolean;
    contains(x: number, y: number): boolean;
    contains(x: number, y: number): boolean;
    copy(location: Point, size: Size): Rectangle;
    copy(x: number, y: number, width: number, height: number): Rectangle;
    static copy$default(rectangle: Rectangle, point: Point, size: Size, n: number, object: any): Rectangle;
    static copy$default(rectangle: Rectangle, n: number, n2: number, n3: number, n4: number, n5: number, object: any): Rectangle;
    equals(other: any): boolean;
    get bottom(): number;
    get bottomLeft(): Point;
    get bottomRight(): Point;
    get height(): number;
    get left(): number;
    get location(): Point;
    get right(): number;
    get size(): Size;
    get top(): number;
    get topLeft(): Point;
    get topRight(): Point;
    get width(): number;
    get x(): number;
    get y(): number;
    hashCode(): number;
    inflated(amount: number): Rectangle;
    insideOf(parent: Rectangle): boolean;
    toString(): string;
  }


  class Size {
    constructor(width: number, height: number);
    component1(): number;
    component2(): number;
    copy(width: number, height: number): Size;
    static copy$default(size: Size, n: number, n2: number, n3: number, object: any): Size;
    equals(other: any): boolean;
    get height(): number;
    get width(): number;
    hashCode(): number;
    minus(size: Size): Size;
    plus(size: Size): Size;
    toString(): string;
    unaryMinus(): Size;
    unaryPlus(): Size;
  }

}

declare module 'org.anti_ad.mc.common.ScreenEventListener' {
  import { ScreenEventListener } from 'org.anti_ad.mc.common';
  import { NativeInputContextBase } from 'org.anti_ad.mc.common.gui';

  class DefaultImpls {
    static charTyped($this: ScreenEventListener, context: NativeInputContextBase<any>, charIn: string, modifiers: number): boolean;
    static keyPressed($this: ScreenEventListener, context: NativeInputContextBase<any>, keyCode: number, scanCode: number, modifiers: number): boolean;
    static keyReleased($this: ScreenEventListener, context: NativeInputContextBase<any>, keyCode: number, scanCode: number, modifiers: number): boolean;
    static mouseClicked($this: ScreenEventListener, context: NativeInputContextBase<any>, x: number, y: number, button: number): boolean;
    static mouseDragged($this: ScreenEventListener, context: NativeInputContextBase<any>, x: number, y: number, button: number, dx: number, dy: number): boolean;
    static mouseRelease($this: ScreenEventListener, context: NativeInputContextBase<any>, x: number, y: number, button: number): boolean;
    static mouseScrolled($this: ScreenEventListener, context: NativeInputContextBase<any>, x: number, y: number, horizontal: number, vertical: number): boolean;
    static resize($this: ScreenEventListener, width: number, height: number): void;
  }

}

declare module 'org.anti_ad.mc.common.util' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Comparator, Set } from 'java.util';
  import { Companion } from 'org.anti_ad.mc.common.util.LogicalStringComparator';

  class IndentedDataFileParserKt {
    static access$getHasIndent($receiver: string): boolean;
    static access$getIndent($receiver: string): string;
    static access$isCommentOrBlank($receiver: string): boolean;
  }


  class IndentedLine {
    constructor(lineNumber: number, rawText: string, text: string);

    constructor(n: number, string: string, string2: string, n2: number, defaultConstructorMarker: DefaultConstructorMarker);
    component1(): number;
    component2(): string;
    component3(): string;
    copy(lineNumber: number, rawText: string, text: string): IndentedLine;
    static copy$default(indentedLine: IndentedLine, n: number, string: string, string2: string, n2: number, object: any): IndentedLine;
    equals(other: any): boolean;
    get lineNumber(): number;
    get rawText(): string;
    get text(): string;
    hashCode(): number;
    toString(): string;
  }


  class Line {
    constructor(lineNumber: number, text: string);
    component1(): number;
    component2(): string;
    copy(lineNumber: number, text: string): Line;
    static copy$default(line: Line, n: number, string: string, n2: number, object: any): Line;
    equals(other: any): boolean;
    get lineNumber(): number;
    get text(): string;
    hashCode(): number;
    toString(): string;
  }


  interface LogicalStringComparator extends Comparator<string> {}
  class LogicalStringComparator extends Comparator<string> {
    static readonly Companion: Companion;
    constructor(textComparator: Comparator<string>);

    constructor();
    compare(str1: string, str2: string): number;
  }


  class Node<T = any> {
    constructor(value: T);
    add(child: Node<T>): void;
    deepContains(child: Node<T>): boolean;
    dumpWidgetTree(): void;
    get children(): Set<Node<T>>;
    get parent(): Node<T>;
    get value(): T;
    remove(child: Node<T>): void;
    set parent(value: Node<T>);
  }

}

declare module 'org.anti_ad.mc.common.util.LogicalStringComparator' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { LogicalStringComparator } from 'org.anti_ad.mc.common.util';
  import { Function0 } from 'kotlin.jvm.functions';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get file(): Function0<LogicalStringComparator>;
    get ignoreCase(): LogicalStringComparator;
    get locale(): Function0<LogicalStringComparator>;
  }

}

declare module 'org.anti_ad.mc.common.vanilla.alias.entity' {
  class BaseEntitiesKt {
  }


  class PassiveEntitiesKt {
  }

}

declare module 'org.anti_ad.mc.common.vanilla.alias.glue' {
  import { Function0 } from 'kotlin.jvm.functions';

  class I18n {
    static readonly INSTANCE: I18n;
    translate(string: string, ...objects: any[]): string;
    translateOrElse(string: string, objects: any[], elseValue: Function0<string>): string;
    translateOrEmpty(string: string, ...objects: any[]): string;
    translateOrNull(string: string, ...objects: any[]): string;
  }

}

declare module 'org.anti_ad.mc.common.vanilla.alias' {
  import { HoverEvent } from 'net.minecraft.network.chat';
  import { NativeContext } from 'org.anti_ad.mc.common.gui';

  class HoverEventExtKt {
    static createHoverEventText(text: string): HoverEvent;
  }


  class IPNDrawableHelper {
    ipnFill(context: NativeContext, x1: number, y1: number, x2: number, y2: number, color: number): void;
    ipnfillGradient(context: NativeContext, x1: number, y1: number, x2: number, y2: number, color1: number, color2: number): void;
  }


  class RenderKt {
  }

}

declare module 'org.anti_ad.mc.common.vanilla.glue' {
  class IScreenMarker {
  }

}

declare module 'org.anti_ad.mc.common.vanilla' {
  import { SimpleSoundInstance, SoundInstance } from 'net.minecraft.client.resources.sounds';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { IScreenMarker } from 'org.anti_ad.mc.common.vanilla.glue';
  import { ConfigHotkey } from 'org.anti_ad.mc.common.config.options';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Path } from 'java.nio.file';
  import { File } from 'java.io';
  import { URL } from 'java.net';
  import { Context } from 'KeybindSettings';
  import { Component } from 'net.minecraft.network.chat';

  class PositionedSoundInstance {
    static readonly INSTANCE: PositionedSoundInstance;
    master(sound: SoundEvent, pitch: number, volume: number): SimpleSoundInstance;
  }


  class VanillaScreenUtil {
    static readonly INSTANCE: VanillaScreenUtil;
    closeScreen(): void;
    closeScreenGracefully(): void;
    openDistinctScreen(screen: IScreenMarker): void;
    openDistinctScreenQuiet(screen: IScreenMarker): void;
    openScreen(screen: IScreenMarker): void;
    openScreenConfigOptionHotkeyDialog(configOption: ConfigHotkey): void;
    openScreenNullable(screen: IScreenMarker): void;
    openScreenNullable(screen: Screen): void;
  }


  class VanillaSound {
    static readonly INSTANCE: VanillaSound;
    createSoundEvent(id: ResourceLocation): SoundEvent;
    play(sound: SoundInstance): void;
    play(sound: SoundInstance, delay: number): void;
    playClick(): void;
  }


  class VanillaUtil {
    static readonly INSTANCE: VanillaUtil;
    altDown(): boolean;
    chat(message: any): void;
    configDirectory(): Path;
    configDirectory(modName: string): Path;
    ctrlDown(): boolean;
    getResourceAsString(identifier: string): string;
    inGame(): boolean;
    isOnClientThread(): boolean;
    isValidScreen(ctx: Context): boolean;
    languageCode(): string;
    loggingString(path: Path): string;
    mouseScaleX(amount: number): number;
    mouseScaleY(amount: number): number;
    mouseX(): number;
    mouseXDouble(): number;
    mouseXRaw(): number;
    mouseY(): number;
    mouseYDouble(): number;
    mouseYRaw(): number;
    open(file: File): void;
    open(url: URL): void;
    shiftDown(): boolean;
  }


  class VanillaUtilKt {
    static access$isValid($receiver: Context, s: Screen): boolean;
    static showSubTitle(text: Component): void;
  }

}

declare module 'org.anti_ad.mc.common.vanilla.render' {
  import { NativeContext } from 'org.anti_ad.mc.common.gui';
  import { Rectangle } from 'org.anti_ad.mc.common.math2d';
  import { Function0 } from 'kotlin.jvm.functions';
  import { Unit } from 'kotlin';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IdentifierHolder, Sprite, DynamicSizeSprite, DynamicSizeMode } from 'org.anti_ad.mc.common.vanilla.render.glue';

  class ColorsKt {
    static get cOLOR_BLACK(): number;
    static get cOLOR_HUD_LABEL(): number;
    static get cOLOR_HUD_TEXT(): number;
    static get cOLOR_HUD_TEXT_BG(): number;
    static get cOLOR_WHITE(): number;
  }


  class GLKt {
    static rClearDepth(context: NativeContext): void;
    static rCreateDepthMask(context: NativeContext, bounds: Rectangle): void;
    static rDepthMask(context: NativeContext, bounds: Rectangle, block: Function0<Unit>): void;
    static rDisableDepth(): void;
    static rEnableDepth(): void;
    static rRemoveDepthMask(context: NativeContext): void;
    static rStandardGlState(): void;
  }


  class TextureKt {
    static internal_rDrawSprite(context: NativeContext, sprite: Sprite, tIndex: number, x: number, y: number): void;
    static invoke($this$invoke: IdentifierHolder): ResourceLocation;
    static makeIdentifier(ns: string, path: string): any;
    static rDrawDynamicSizeSprite(context: NativeContext, sprite: DynamicSizeSprite, bounds: Rectangle, mode: DynamicSizeMode): void;
    static rDrawDynamicSizeSprite$default(nativeContext: NativeContext, dynamicSizeSprite: DynamicSizeSprite, rectangle: Rectangle, dynamicSizeMode: DynamicSizeMode, n: number, object: any): void;
    static vanilla_rBlit(context: NativeContext, identifier: IdentifierHolder, x: number, y: number, w: number, h: number, sx: number, sy: number, sw: number, sh: number, tw: number, th: number): void;
  }


  class VanillaTextRenderer {
    static readonly INSTANCE: VanillaTextRenderer;
    draw(context: NativeContext, string: string, x: number, y: number, color: number): number;
    drawWithShadow(context: NativeContext, string: string, x: number, y: number, color: number): number;
    getWidth(s: string): number;
    wrapLines(s: string, maxWidth: number): string;
  }

}

declare module 'org.anti_ad.mc.common.vanilla.render.glue' {
  import { IPNDrawableHelper } from 'org.anti_ad.mc.common.vanilla.alias';
  import { NativeContext } from 'org.anti_ad.mc.common.gui';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { Rectangle, Size, Point } from 'org.anti_ad.mc.common.math2d';
  import { EnumEntries } from 'kotlin.enums';

  interface DrawableHelperAccess extends IPNDrawableHelper {}
  class DrawableHelperAccess extends IPNDrawableHelper {
    static readonly INSTANCE: DrawableHelperAccess;
    fillRect(context: NativeContext, x1: number, y1: number, x2: number, y2: number, color: number): void;
  }


  interface DynamicSizeMode extends Enum<DynamicSizeMode> {}
  class DynamicSizeMode extends Enum<DynamicSizeMode> {
    static readonly STRETCH: DynamicSizeMode;
    static readonly REPEAT: DynamicSizeMode;
    static readonly REPEAT_BOTH: DynamicSizeMode;
    draw(context: NativeContext, identifier: IdentifierHolder, drawAreas: Rectangle[], textureAreas: Rectangle[], textureSize: Size): void;
    static get entries(): EnumEntries<DynamicSizeMode>;
    static valueOf(value: string): DynamicSizeMode;
    static values(): DynamicSizeMode[];
  }


  class DynamicSizeSprite {
    constructor(sprite: Sprite, centerBounds: Rectangle);

    constructor(sprite: Sprite, borderWidth: number);
    down(amount: number): DynamicSizeSprite;
    down(amount: number): DynamicSizeSprite;
    static down$default(dynamicSizeSprite: DynamicSizeSprite, n: number, n2: number, object: any): DynamicSizeSprite;
    get clips(): Rectangle[];
    get cornerSize(): Size;
    get identifier(): IdentifierHolder;
    get textureSize(): Size;
    left(amount: number): DynamicSizeSprite;
    left(amount: number): DynamicSizeSprite;
    static left$default(dynamicSizeSprite: DynamicSizeSprite, n: number, n2: number, object: any): DynamicSizeSprite;
    right(amount: number): DynamicSizeSprite;
    right(amount: number): DynamicSizeSprite;
    static right$default(dynamicSizeSprite: DynamicSizeSprite, n: number, n2: number, object: any): DynamicSizeSprite;
    up(amount: number): DynamicSizeSprite;
    up(amount: number): DynamicSizeSprite;
    static up$default(dynamicSizeSprite: DynamicSizeSprite, n: number, n2: number, object: any): DynamicSizeSprite;
  }


  class IdentifierHolder {
    constructor(id: any);

    constructor(ns: string, name: string);
    get id(): any;
    set id(object: any);
  }


  class ScreenKt {
    static get rScreenBounds(): Rectangle;
    static rRenderBlackOverlay(context: NativeContext): void;
    static rRenderVanillaScreenBackground(context: NativeContext, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  class Sprite {
    constructor(identifier: IdentifierHolder, textureSize: Size, spriteBounds: Rectangle);

    constructor(identifier: IdentifierHolder, spriteBounds: Rectangle);
    component1(): IdentifierHolder;
    component2(): Size;
    component3(): Rectangle;
    copy(identifier: IdentifierHolder, textureSize: Size, spriteBounds: Rectangle): Sprite;
    static copy$default(sprite: Sprite, identifierHolder: IdentifierHolder, size: Size, rectangle: Rectangle, n: number, object: any): Sprite;
    down(amount: number): Sprite;
    down(amount: number): Sprite;
    static down$default(sprite: Sprite, n: number, n2: number, object: any): Sprite;
    equals(other: any): boolean;
    get identifier(): IdentifierHolder;
    get size(): Size;
    get spriteBounds(): Rectangle;
    get textureSize(): Size;
    hashCode(): number;
    left(amount: number): Sprite;
    left(amount: number): Sprite;
    static left$default(sprite: Sprite, n: number, n2: number, object: any): Sprite;
    right(amount: number): Sprite;
    right(amount: number): Sprite;
    static right$default(sprite: Sprite, n: number, n2: number, object: any): Sprite;
    toString(): string;
    up(amount: number): Sprite;
    up(amount: number): Sprite;
    static up$default(sprite: Sprite, n: number, n2: number, object: any): Sprite;
  }


  class TextKt {
    static rDrawCenteredText(context: NativeContext, string: string, x: number, y: number, color: number, shadow: boolean): void;
    static rDrawCenteredText(context: NativeContext, string: string, bounds: Rectangle, color: number, shadow: boolean): void;
    static rDrawCenteredText$default(nativeContext: NativeContext, string: string, n: number, n2: number, n3: number, bl: boolean, n4: number, object: any): void;
    static rDrawCenteredText$default(nativeContext: NativeContext, string: string, rectangle: Rectangle, n: number, bl: boolean, n2: number, object: any): void;
    static rDrawText(context: NativeContext, string: string, x: number, y: number, color: number, shadow: boolean): void;
    static rDrawText$default(nativeContext: NativeContext, string: string, n: number, n2: number, n3: number, bl: boolean, n4: number, object: any): void;
    static rMeasureText(string: string): number;
    static rWrapText(string: string, maxWidth: number): string;
  }


  class TextureKt {
    static access$rBlit(context: NativeContext, identifier: IdentifierHolder, drawArea: Rectangle, spriteBounds: Rectangle, textureSize: Size): void;
    static access$relativeBounds(fromBounds: Rectangle, fromLocation: Point, toLocation: Point): Rectangle;
    static rDrawCenteredSprite(context: NativeContext, sprite: Sprite, location: Point): void;
    static rDrawCenteredSprite(context: NativeContext, sprite: Sprite, tIndex: number, location: Point): void;
    static rDrawCenteredSprite(context: NativeContext, sprite: Sprite, tIndex: number, x: number, y: number): void;
    static rDrawCenteredSprite(context: NativeContext, sprite: Sprite, x: number, y: number): void;
    static rDrawDynamicSizeSprite(context: NativeContext, sprite: DynamicSizeSprite, x: number, y: number, width: number, height: number, mode: DynamicSizeMode): void;
    static rDrawDynamicSizeSprite$default(nativeContext: NativeContext, dynamicSizeSprite: DynamicSizeSprite, n: number, n2: number, n3: number, n4: number, dynamicSizeMode: DynamicSizeMode, n5: number, object: any): void;
    static rDrawSprite(context: NativeContext, sprite: Sprite, location: Point): void;
    static rDrawSprite(context: NativeContext, sprite: Sprite, x: number, y: number): void;
  }


  class ThriSprite {
  }

}

declare module 'org.anti_ad.mc.common.vanilla.render.glue.DynamicSizeMode' {
  class WhenMappings {
    static readonly $EnumSwitchMapping$0: number[];
    static readonly $EnumSwitchMapping$1: number[];
  }

}

declare module 'org.anti_ad.mc.common.vanilla.VanillaUtilKt' {
  class WhenMappings {
    static readonly $EnumSwitchMapping$0: number[];
  }

}

declare module 'org.anti_ad.mc.libipn.config' {
  import { ConfigDeclaration, ConfigDeclarationBuilder } from 'org.anti_ad.mc.common.config.builder';
  import { ConfigBoolean, ConfigHotkey, ConfigColorPicker, ConfigKeyToggleBoolean } from 'org.anti_ad.mc.common.config.options';

  class ConfigsKt {
    static readonly CONFIG_CATEGORY: string;
  }


  interface Debugs extends ConfigDeclaration {}
  class Debugs extends ConfigDeclaration {
    static readonly INSTANCE: Debugs;
    get builder(): ConfigDeclarationBuilder;
    get tRACE_LOGS(): ConfigBoolean;
  }


  interface Demo extends ConfigDeclaration {}
  class Demo extends ConfigDeclaration {
    static readonly INSTANCE: Demo;
    get builder(): ConfigDeclarationBuilder;
    get cOLOR_CHOOSER_BUTTON(): ConfigColorPicker;
    get cOLOR_CHOOSER_BUTTON1(): ConfigColorPicker;
    get cOLOR_CHOOSER_BUTTON2(): ConfigColorPicker;
    get dEBUG(): ConfigBoolean;
    get fIRST_RUN(): ConfigBoolean;
    get oPEN_CONFIG_MENU(): ConfigHotkey;
    get tOGGLE_TEST(): ConfigKeyToggleBoolean;
  }


  interface Demo2 extends ConfigDeclaration {}
  class Demo2 extends ConfigDeclaration {
    static readonly INSTANCE: Demo2;
    get builder(): ConfigDeclarationBuilder;
    get cOLOR_CHOOSER_BUTTON(): ConfigColorPicker;
  }

}

declare module 'org.anti_ad.mc.libipn.forge' {
  import { Runnable } from 'java.lang';

  interface LibIPNClientInit extends Runnable {}
  class LibIPNClientInit extends Runnable {
    run(): void;
  }


  interface LibIPNServerInit extends Runnable {}
  class LibIPNServerInit extends Runnable {
    run(): void;
  }

}

declare module 'org.anti_ad.mc.libipn.gen' {
  class ModInfo {
    static readonly INSTANCE: ModInfo;
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static readonly MOD_VERSION: string;
    static readonly MOD_LOADER: string;
    static readonly GIT_HASH: string;
    static readonly CURSEFORGE_URL: string;
    static readonly MODRINTH_URL: string;
  }

}

declare module 'org.anti_ad.mc.libipn' {
  import { FMLCommonSetupEvent } from 'net.neoforged.fml.event.lifecycle';
  import { LogBase } from 'org.anti_ad.mc.common';
  import { Boolean } from 'java.lang';

  class LibIPNModEntry {
    static readonly INSTANCE: LibIPNModEntry;
    onCommonSetup(event: FMLCommonSetupEvent): void;
  }


  interface Log extends LogBase {}
  class Log extends LogBase {
    static readonly INSTANCE: Log;
    invoke(): boolean;
    invoke(): boolean;
  }

}