declare module 'me.shedaniel.autoconfig.annotation.Config' {
  class Gui {
  }

}

declare module 'me.shedaniel.autoconfig.annotation' {
  class ConfigEntry {
  }

}

declare module 'me.shedaniel.autoconfig.annotation.ConfigEntry' {
  class Gui {
  }

}

declare module 'me.shedaniel.autoconfig.annotation.ConfigEntry.Gui.EnumHandler' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface EnumDisplayOption extends Enum<EnumDisplayOption> {}
  class EnumDisplayOption extends Enum<EnumDisplayOption> {
    static readonly DROPDOWN: EnumDisplayOption;
    static readonly BUTTON: EnumDisplayOption;
    static valueOf(name: string): EnumDisplayOption;
    static values(): EnumDisplayOption[];
  }

}

declare module 'me.shedaniel.autoconfig' {
  import { Class } from 'java.lang';
  import { Factory } from 'me.shedaniel.autoconfig.serializer.ConfigSerializer';
  import { GuiRegistry } from 'me.shedaniel.autoconfig.gui.registry';
  import { Supplier } from 'java.util.function';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Save, Load } from 'me.shedaniel.autoconfig.event.ConfigSerializeEvent';
  import { Config } from 'me.shedaniel.autoconfig.annotation';
  import { ConfigSerializer } from 'me.shedaniel.autoconfig.serializer';

  class AutoConfig {
    static readonly MOD_ID: string;
    static getConfigHolder<T extends ConfigData>(configClass: Class<T>): ConfigHolder<T>;
    static getConfigScreen<T extends ConfigData>(configClass: Class<T>, parent: Screen): Supplier<Screen>;
    static getGuiRegistry<T extends ConfigData>(configClass: Class<T>): GuiRegistry;
    static register<T extends ConfigData>(configClass: Class<T>, serializerFactory: Factory<T>): ConfigHolder<T>;
  }


  class ConfigData {
    validatePostLoad(): void;
  }


  interface ConfigHolder<T extends ConfigData = any> extends Supplier<T> {}
  class ConfigHolder<T extends ConfigData = any> extends Supplier<T> {
    get (): T;
    get config(): T;
    get configClass(): Class<T>;
    load(): boolean;
    registerLoadListener(var1: Load<T>): void;
    registerSaveListener(var1: Save<T>): void;
    resetToDefault(): void;
    save(): void;
    set config(var1: T);
  }


  interface ConfigManager<T extends ConfigData = any> extends ConfigHolder<T> {}
  class ConfigManager<T extends ConfigData = any> extends ConfigHolder<T> {
    get config(): T;
    get configClass(): Class<T>;
    get definition(): Config;
    get serializer(): ConfigSerializer<T>;
    load(): boolean;
    registerLoadListener(load: Load<T>): void;
    registerSaveListener(save: Save<T>): void;
    resetToDefault(): void;
    save(): void;
    set config(config: T);
  }

}

declare module 'me.shedaniel.autoconfig.ConfigData' {
  import { Exception, Throwable } from 'java.lang';

  interface ValidationException extends Exception {}
  class ValidationException extends Exception {
    constructor(message: string);

    constructor(message: string, cause: Throwable);

    constructor(cause: Throwable);
  }

}

declare module 'me.shedaniel.autoconfig.event' {
  class ConfigSerializeEvent {
  }

}

declare module 'me.shedaniel.autoconfig.event.ConfigSerializeEvent' {
  import { InteractionResult } from 'net.minecraft.world';
  import { ConfigHolder } from 'me.shedaniel.autoconfig';

  class Load<T extends ConfigData = any> {
    onLoad(var1: ConfigHolder<T>, var2: T): InteractionResult;
  }


  class Save<T extends ConfigData = any> {
    onSave(var1: ConfigHolder<T>, var2: T): InteractionResult;
  }

}

declare module 'me.shedaniel.autoconfig.example' {
  import { GlobalData } from 'me.shedaniel.autoconfig.serializer.PartitioningSerializer';
  import { ModuleA, Empty, ModuleB } from 'me.shedaniel.autoconfig.example.ExampleConfig';

  interface ExampleConfig extends GlobalData {}
  class ExampleConfig extends GlobalData {
    moduleA: ModuleA;
    empty: Empty;
    moduleB: ModuleB;
  }


  class ExampleInits {
    static exampleClientInit(): void;
    static exampleCommonInit(): void;
  }

}

declare module 'me.shedaniel.autoconfig.example.ExampleConfig' {
  import { ConfigData } from 'me.shedaniel.autoconfig';
  import { List } from 'java.util';
  import { Long, Enum } from 'java.lang';

  interface ModuleA extends ConfigData {}
  class ModuleA extends ConfigData {
    aBoolean: boolean;
    anEnum: ExampleEnum;
    anEnumWithButton: ExampleEnum;
    aString: string;
    anObject: PairOfIntPairs;
    list: List;
    array: number[];
    complexList: List;
    complexArray: PairOfInts[];
  }


  interface Empty extends ConfigData {}
  class Empty extends ConfigData {
  }


  interface ModuleB extends ConfigData {}
  class ModuleB extends ConfigData {
    intSlider: number;
    longSlider: Long;
    anObject: PairOfIntPairs;
    aList: List;
    color: number;
  }


  class PairOfIntPairs {
    first: PairOfInts;
    second: PairOfInts;
    constructor();

    constructor(first: PairOfInts, second: PairOfInts);
  }


  class PairOfInts {
    foo: number;
    bar: number;
    constructor();

    constructor(foo: number, bar: number);
  }


  interface ExampleEnum extends Enum<ExampleEnum> {}
  class ExampleEnum extends Enum<ExampleEnum> {
    static readonly FOO: ExampleEnum;
    static readonly BAR: ExampleEnum;
    static readonly BAZ: ExampleEnum;
    static valueOf(name: string): ExampleEnum;
    static values(): ExampleEnum[];
  }

}

declare module 'me.shedaniel.autoconfig.gui' {
  import { Supplier, Function, BiFunction } from 'java.util.function';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ConfigManager } from 'me.shedaniel.autoconfig';
  import { GuiRegistryAccess } from 'me.shedaniel.autoconfig.gui.registry.api';
  import { ConfigBuilder } from 'me.shedaniel.clothconfig2.api';
  import { Field } from 'java.lang.reflect';
  import { GuiRegistry } from 'me.shedaniel.autoconfig.gui.registry';

  interface ConfigScreenProvider<T extends ConfigData = any> extends Supplier<Screen> {}
  class ConfigScreenProvider<T extends ConfigData = any> extends Supplier<Screen> {
    constructor(manager2: ConfigManager<T>, registry: GuiRegistryAccess, parent: Screen);
    get (): Screen;
    setBuildFunction(buildFunction: Function<ConfigBuilder, Screen>): void;
    setCategoryFunction(categoryFunction: BiFunction<string, string, string>): void;
    setI13nFunction(i18nFunction: Function<ConfigManager<T>, string>): void;
    setOptionFunction(optionFunction: BiFunction<string, Field, string>): void;
  }


  class DefaultGuiTransformers {
    static apply(registry: GuiRegistry): GuiRegistry;
  }

}

declare module 'me.shedaniel.autoconfig.gui.registry.api' {
  import { List } from 'java.util';
  import { AbstractConfigListEntry } from 'me.shedaniel.clothconfig2.api';
  import { Field } from 'java.lang.reflect';

  class GuiProvider {
    get(var1: string, var2: Field, var3: any, var4: any, var5: GuiRegistryAccess): AbstractConfigListEntry[];
  }


  interface GuiRegistryAccess extends GuiProvider, GuiTransformer {}
  class GuiRegistryAccess extends GuiProvider {
    getAndTransform(i18n: string, field: Field, config: any, defaults: any, registry: GuiRegistryAccess): AbstractConfigListEntry[];
  }


  class GuiTransformer {
    transform(var1: AbstractConfigListEntry[], var2: string, var3: Field, var4: any, var5: any, var6: GuiRegistryAccess): AbstractConfigListEntry[];
  }

}

declare module 'me.shedaniel.autoconfig.gui.registry' {
  import { GuiRegistryAccess, GuiProvider, GuiTransformer } from 'me.shedaniel.autoconfig.gui.registry.api';
  import { List } from 'java.util';
  import { AbstractConfigListEntry } from 'me.shedaniel.clothconfig2.api';
  import { Field } from 'java.lang.reflect';
  import { Class } from 'java.lang';
  import { Predicate } from 'java.util.function';
  import { Annotation } from 'java.lang.annotation';

  interface ComposedGuiRegistryAccess extends GuiRegistryAccess {}
  class ComposedGuiRegistryAccess extends GuiRegistryAccess {
    constructor(...children: GuiRegistryAccess[]);
    get(i18n: string, field: Field, config: any, defaults: any, registry: GuiRegistryAccess): AbstractConfigListEntry[];
    transform(guis: AbstractConfigListEntry[], i18n: string, field: Field, config: any, defaults: any, registry: GuiRegistryAccess): AbstractConfigListEntry[];
  }


  interface DefaultGuiRegistryAccess extends GuiRegistryAccess {}
  class DefaultGuiRegistryAccess extends GuiRegistryAccess {
    get(i18n: string, field: Field, config: any, defaults: any, registry: GuiRegistryAccess): AbstractConfigListEntry[];
    transform(guis: AbstractConfigListEntry[], i18n: string, field: Field, config: any, defaults: any, registry: GuiRegistryAccess): AbstractConfigListEntry[];
  }


  interface GuiRegistry extends GuiRegistryAccess {}
  class GuiRegistry extends GuiRegistryAccess {
    constructor();
    get(i18n: string, field: Field, config: any, defaults: any, registry: GuiRegistryAccess): AbstractConfigListEntry[];
    registerAnnotationProvider(provider: GuiProvider, ...types: Class<Annotation>[]): void;
    registerAnnotationProvider(provider: GuiProvider, predicate: Predicate<Field>, ...types: Class<Annotation>[]): void;
    registerAnnotationTransformer(transformer: GuiTransformer, ...types: Class<Annotation>[], field: Field): void;
    registerAnnotationTransformer(transformer: GuiTransformer, predicate: Predicate<Field>, ...types: Class<Annotation>[]): void;
    registerPredicateProvider(provider: GuiProvider, predicate: Predicate<Field>): void;
    registerPredicateTransformer(transformer: GuiTransformer, predicate: Predicate<Field>): void;
    registerTypeProvider(provider: GuiProvider, ...types: Class[]): void;
    transform(guis: AbstractConfigListEntry[], i18n: string, field: Field, config: any, defaults: any, registry: GuiRegistryAccess): AbstractConfigListEntry[];
  }

}

declare module 'me.shedaniel.autoconfig.serializer' {
  import { Config } from 'me.shedaniel.autoconfig.annotation';
  import { Class } from 'java.lang';
  import { Gson } from 'com.google.gson';
  import { Jankson } from 'me.shedaniel.cloth.clothconfig.shadowed.blue.endless.jankson';
  import { Factory } from 'me.shedaniel.autoconfig.serializer.ConfigSerializer';
  import { GlobalData } from 'me.shedaniel.autoconfig.serializer.PartitioningSerializer';
  import { ConfigData } from 'me.shedaniel.autoconfig';
  import { Annotation } from 'java.lang.annotation';
  import { TomlWriter } from 'me.shedaniel.cloth.clothconfig.shadowed.com.moandjiezana.toml';
  import { Yaml } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml';

  class ConfigSerializer<T extends ConfigData = any> {
    createDefault(): T;
    deserialize(): T;
    serialize(var1: T): void;
  }


  interface DummyConfigSerializer<T extends ConfigData = any> extends ConfigSerializer<T> {}
  class DummyConfigSerializer<T extends ConfigData = any> extends ConfigSerializer<T> {
    constructor(definition: Config, configClass: Class<T>);
    createDefault(): T;
    deserialize(): T;
    serialize(config: T): void;
  }


  interface GsonConfigSerializer<T extends ConfigData = any> extends ConfigSerializer<T> {}
  class GsonConfigSerializer<T extends ConfigData = any> extends ConfigSerializer<T> {
    constructor(definition: Config, configClass: Class<T>, gson: Gson);

    constructor(definition: Config, configClass: Class<T>);
    createDefault(): T;
    deserialize(): T;
    serialize(config: T): void;
  }


  interface JanksonConfigSerializer<T extends ConfigData = any> extends ConfigSerializer<T> {}
  class JanksonConfigSerializer<T extends ConfigData = any> extends ConfigSerializer<T> {
    constructor(definition: Config, configClass: Class<T>, jankson: Jankson);

    constructor(definition: Config, configClass: Class<T>);
    createDefault(): T;
    deserialize(): T;
    serialize(config: T): void;
  }


  interface PartitioningSerializer<T extends GlobalData = any, M extends ConfigData = any> extends ConfigSerializer<T> {}
  class PartitioningSerializer<T extends GlobalData = any, M extends ConfigData = any> extends ConfigSerializer<T> {
    annotationType(): Class<Annotation>;
    createDefault(): T;
    deserialize(): T;
    equals(obj: any): boolean;
    hashCode(): number;
    serialize(config: T): void;
    static wrap<T extends GlobalData, M extends ConfigData>(inner: Factory<M>): Factory<T>;
  }


  interface Toml4jConfigSerializer<T extends ConfigData = any> extends ConfigSerializer<T> {}
  class Toml4jConfigSerializer<T extends ConfigData = any> extends ConfigSerializer<T> {
    constructor(definition: Config, configClass: Class<T>, tomlWriter: TomlWriter);

    constructor(definition: Config, configClass: Class<T>);
    createDefault(): T;
    deserialize(): T;
    serialize(config: T): void;
  }


  interface YamlConfigSerializer<T extends ConfigData = any> extends ConfigSerializer<T> {}
  class YamlConfigSerializer<T extends ConfigData = any> extends ConfigSerializer<T> {
    constructor(definition: Config, configClass: Class<T>, yaml: Yaml);

    constructor(definition: Config, configClass: Class<T>);
    createDefault(): T;
    deserialize(): T;
    serialize(config: T): void;
  }

}

declare module 'me.shedaniel.autoconfig.serializer.ConfigSerializer' {
  import { Exception, Throwable, Class } from 'java.lang';
  import { ConfigSerializer } from 'me.shedaniel.autoconfig.serializer';
  import { Config } from 'me.shedaniel.autoconfig.annotation';

  interface SerializationException extends Exception {}
  class SerializationException extends Exception {
    constructor(cause: Throwable);
  }


  class Factory<T extends ConfigData = any> {
    create(var1: Config, var2: Class<T>): ConfigSerializer<T>;
  }

}

declare module 'me.shedaniel.autoconfig.serializer.PartitioningSerializer' {
  import { ConfigData } from 'me.shedaniel.autoconfig';

  interface GlobalData extends ConfigData {}
  class GlobalData extends ConfigData {
    constructor();
    validatePostLoad(): void;
  }

}

declare module 'me.shedaniel.autoconfig.util' {
  import { Path } from 'java.nio.file';
  import { Class } from 'java.lang';
  import { Field } from 'java.lang.reflect';
  import { Collector } from 'java.util.stream';
  import { Map } from 'java.util';
  import { Function } from 'java.util.function';

  class Utils {
    static constructUnsafely<V>(cls: Class<V>): V;
    static get configFolder(): Path;
    static getUnsafely<V>(field: Field, obj: any): V;
    static getUnsafely<V>(field: Field, obj: any, defaultValue: V): V;
    static setUnsafely(field: Field, obj: any, newValue: any): void;
    static toLinkedMap<T, K, U>(keyMapper: Function<T, K>, valueMapper: Function<T, U>): Collector<T, any, Map<K, U>>;
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.blue.endless.jankson.api' {
  import { Exception, Throwable, Class } from 'java.lang';
  import { InternalDeserializerFunction } from 'me.shedaniel.cloth.clothconfig.shadowed.blue.endless.jankson.impl.serializer';
  import { JsonElement } from 'me.shedaniel.cloth.clothconfig.shadowed.blue.endless.jankson';
  import { Type } from 'java.lang.reflect';

  interface DeserializationException extends Exception {}
  class DeserializationException extends Exception {
    constructor();

    constructor(message: string);

    constructor(message: string, cause: Throwable);

    constructor(cause: Throwable);
  }


  interface DeserializerFunction<A = any, B = any> extends InternalDeserializerFunction<B> {}
  class DeserializerFunction<A = any, B = any> extends InternalDeserializerFunction<B> {
    apply(var1: A, var2: Marshaller): B;
    deserialize(a: any, m: Marshaller): B;
  }


  class Marshaller {
    marshall<E>(var1: Class<E>, var2: JsonElement): E;
    marshall<E>(var1: Type, var2: JsonElement): E;
    marshallCarefully<E>(var1: Class<E>, var2: JsonElement): E;
    serialize(var1: any): JsonElement;
  }


  interface SyntaxError extends Exception {}
  class SyntaxError extends Exception {
    constructor(message: string);
    get completeMessage(): string;
    get lineMessage(): string;
    setEndParsing(line: number, column: number): void;
    setStartParsing(line: number, column: number): void;
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.blue.endless.jankson.impl' {
  import { JsonElement, JsonArray, Jankson, JsonPrimitive, JsonObject } from 'me.shedaniel.cloth.clothconfig.shadowed.blue.endless.jankson';
  import { Field, Type } from 'java.lang.reflect';
  import { Marshaller } from 'me.shedaniel.cloth.clothconfig.shadowed.blue.endless.jankson.api';
  import { Map, Collection } from 'java.util';

  class AnnotatedElement {
    constructor(elem: JsonElement, comment: string);
    get comment(): string;
    get element(): JsonElement;
  }


  interface ArrayParserContext extends ParserContext<JsonArray> {}
  class ArrayParserContext extends ParserContext<JsonArray> {
    consume(codePoint: number, loader: Jankson): boolean;
    eof(): void;
    get result(): JsonArray;
    isComplete(): boolean;
  }


  interface CommentParserContext extends ParserContext<string> {}
  class CommentParserContext extends ParserContext<string> {
    constructor(codePoint: number);
    consume(codePoint: number, loader: Jankson): boolean;
    eof(): void;
    get result(): string;
    isComplete(): boolean;
  }


  interface ElementParserContext extends ParserContext<AnnotatedElement> {}
  class ElementParserContext extends ParserContext<AnnotatedElement> {
    consume(codePoint: number, loader: Jankson): boolean;
    eof(): void;
    get result(): AnnotatedElement;
    isComplete(): boolean;
    set result(elem: JsonElement);
  }


  interface NumberParserContext extends ParserContext<JsonPrimitive> {}
  class NumberParserContext extends ParserContext<JsonPrimitive> {
    constructor(firstCodePoint: number);
    consume(codePoint: number, loader: Jankson): boolean;
    eof(): void;
    get result(): JsonPrimitive;
    isComplete(): boolean;
  }


  interface ObjectParserContext extends ParserContext<JsonObject> {}
  class ObjectParserContext extends ParserContext<JsonObject> {
    consume(codePoint: number, loader: Jankson): boolean;
    eof(): void;
    get result(): JsonObject;
    isComplete(): boolean;
  }


  class ParserContext<T = any> {
    consume(var1: number, var2: Jankson): boolean;
    eof(): void;
    get result(): T;
    isComplete(): boolean;
  }


  class POJODeserializer {
    static unpack(t: Type, elem: JsonElement, marshaller: Marshaller): any;
    static unpackCollection(collection: Collection<any>, elementType: Type, elem: JsonElement, marshaller: Marshaller): void;
    static unpackField(parent: any, f: Field, source: JsonObject, failFast: boolean): void;
    static unpackFieldData(parent: any, field: Field, elem: JsonElement, marshaller: Marshaller): boolean;
    static unpackMap(map: Map<any, any>, keyType: Type, valueType: Type, elem: JsonElement, marshaller: Marshaller): void;
    static unpackObject(target: any, source: JsonObject): void;
    static unpackObject(target: any, source: JsonObject, failFast: boolean): void;
  }


  interface StringParserContext extends ParserContext<JsonPrimitive> {}
  class StringParserContext extends ParserContext<JsonPrimitive> {
    constructor(quote: number);
    consume(codePoint: number, loader: Jankson): boolean;
    eof(): void;
    get result(): JsonPrimitive;
    isComplete(): boolean;
  }


  interface TokenParserContext extends ParserContext<JsonPrimitive> {}
  class TokenParserContext extends ParserContext<JsonPrimitive> {
    constructor(firstCodePoint: number);
    consume(codePoint: number, loader: Jankson): boolean;
    eof(): void;
    get result(): JsonPrimitive;
    isComplete(): boolean;
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.blue.endless.jankson.impl.serializer' {
  import { StringBuilder, Class } from 'java.lang';
  import { JsonGrammar, JsonElement } from 'me.shedaniel.cloth.clothconfig.shadowed.blue.endless.jankson';
  import { Marshaller } from 'me.shedaniel.cloth.clothconfig.shadowed.blue.endless.jankson.api';

  class CommentSerializer {
    static print(builder: StringBuilder, comment: string, indent: number, grammar: JsonGrammar): void;
    static print(builder: StringBuilder, comment: string, indent: number, comments: boolean, whitespace: boolean): void;
  }


  class DeserializerFunctionPool<B = any> {
    constructor(targetClass: Class<B>);
    apply(elem: JsonElement, marshaller: Marshaller): B;
    getFunction(sourceClass: Class<any>): InternalDeserializerFunction<B>;
    registerUnsafe(sourceClass: Class<any>, functionParameter: InternalDeserializerFunction<B>): void;
  }


  class InternalDeserializerFunction<B = any> {
    deserialize(var1: any, var2: Marshaller): B;
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.blue.endless.jankson.impl.serializer.DeserializerFunctionPool' {
  import { Exception } from 'java.lang';

  interface FunctionMatchFailedException extends Exception {}
  class FunctionMatchFailedException extends Exception {
    constructor(message: string);
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.blue.endless.jankson' {
  import { File, InputStream } from 'java.io';
  import { Class, Iterable, Cloneable } from 'java.lang';
  import { Marshaller, SyntaxError } from 'me.shedaniel.cloth.clothconfig.shadowed.blue.endless.jankson.api';
  import { ParserContext } from 'me.shedaniel.cloth.clothconfig.shadowed.blue.endless.jankson.impl';
  import { Consumer } from 'java.util.function';
  import { Builder } from 'me.shedaniel.cloth.clothconfig.shadowed.blue.endless.jankson.Jankson';
  import { List, Collection, Iterator, ListIterator, Map, Set } from 'java.util';
  import { Builder as me_shedaniel_cloth_clothconfig_shadowed_blue_endless_jankson_jsongrammar_Builder } from 'me.shedaniel.cloth.clothconfig.shadowed.blue.endless.jankson.JsonGrammar';
  import { Entry } from 'Map';

  class Jankson {
    static builder(): Builder;
    fromJson<T>(obj: JsonObject, clazz: Class<T>): T;
    fromJson<T>(json: string, clazz: Class<T>): T;
    fromJsonCarefully<T>(json: string, clazz: Class<T>): T;
    fromJsonCarefully<T>(obj: JsonObject, clazz: Class<T>): T;
    get marshaller(): Marshaller;
    getCodePoint(inParameter: InputStream): number;
    load(s: string): JsonObject;
    load(f: File): JsonObject;
    load(inParameter: InputStream): JsonObject;
    loadElement(s: string): JsonElement;
    loadElement(f: File): JsonElement;
    loadElement(inParameter: InputStream): JsonElement;
    push<T>(t: ParserContext<T>, consumer: Consumer<T>): void;
    throwDelayed(syntaxError: SyntaxError): void;
    toJson<T>(t: T): JsonElement;
    toJson<T>(t: T, alternateMarshaller: Marshaller): JsonElement;
  }


  interface JsonArray extends List<JsonElement>, Iterable<JsonElement>, JsonElement {}
  class JsonArray extends List<JsonElement> {
    constructor();

    constructor(ts: T[], marshaller: Marshaller);

    constructor(ts: Collection<any>, marshaller: Marshaller);
    add(e: JsonElement, comment: string): boolean;
    add(e: JsonElement): boolean;
    add(index: number, element: JsonElement): void;
    addAll(c: Collection<JsonElement>): boolean;
    addAll(index: number, elements: Collection<JsonElement>): boolean;
    clear(): void;
    clone(): JsonArray;
    contains(o: any): boolean;
    containsAll(c: Collection<any>): boolean;
    equals(other: any): boolean;
    get(i: number): JsonElement;
    get<E>(clazz: Class<E>, index: number): E;
    get marshaller(): Marshaller;
    getBoolean(index: number, defaultValue: boolean): boolean;
    getByte(index: number, defaultValue: number): number;
    getChar(index: number, defaultValue: string): string;
    getComment(i: number): string;
    getDouble(index: number, defaultValue: number): number;
    getFloat(index: number, defaultValue: number): number;
    getInt(index: number, defaultValue: number): number;
    getLong(index: number, defaultValue: number): number;
    getShort(index: number, defaultValue: number): number;
    getString(index: number, defaultValue: string): string;
    hashCode(): number;
    indexOf(obj: any): number;
    isEmpty(): boolean;
    iterator(): Iterator<JsonElement>;
    lastIndexOf(obj: any): number;
    listIterator(): ListIterator<JsonElement>;
    listIterator(index: number): ListIterator<JsonElement>;
    remove(o: any): boolean;
    remove(index: number): JsonElement;
    removeAll(c: Collection<any>): boolean;
    retainAll(c: Collection<any>): boolean;
    set(index: number, element: JsonElement): JsonElement;
    set marshaller(marshaller: Marshaller);
    setComment(i: number, comment: string): void;
    size(): number;
    subList(arg0: number, arg1: number): JsonElement[];
    toArray(): JsonElement[];
    toArray<T>(a: T[]): T[];
    toJson(comments: boolean, newlines: boolean, depth: number): string;
    toJson(grammar: JsonGrammar, depth: number): string;
    toJson(): string;
    toJson(comments: boolean, newlines: boolean): string;
    toJson(grammar: JsonGrammar): string;
    toString(): string;
  }


  interface JsonElement extends Cloneable {}
  class JsonElement extends Cloneable {
    clone(): JsonElement;
    toJson(): string;
    toJson(comments: boolean, newlines: boolean): string;
    toJson(var1: boolean, var2: boolean, var3: number): string;
    toJson(var1: JsonGrammar, var2: number): string;
    toJson(grammar: JsonGrammar): string;
  }


  class JsonGrammar {
    static readonly JANKSON: JsonGrammar;
    static readonly JSON5: JsonGrammar;
    static readonly STRICT: JsonGrammar;
    static readonly COMPACT: JsonGrammar;
    static builder(): me_shedaniel_cloth_clothconfig_shadowed_blue_endless_jankson_jsongrammar_Builder;
    hasComments(): boolean;
    shouldOutputWhitespace(): boolean;
  }


  interface JsonNull extends JsonElement {}
  class JsonNull extends JsonElement {
    static readonly INSTANCE: JsonNull;
    clone(): JsonNull;
    equals(other: any): boolean;
    hashCode(): number;
    toJson(comments: boolean, newlines: boolean, depth: number): string;
    toJson(grammar: JsonGrammar, depth: number): string;
    toJson(): string;
    toJson(comments: boolean, newlines: boolean): string;
    toJson(grammar: JsonGrammar): string;
    toString(): string;
  }


  interface JsonObject extends Map<string, JsonElement>, JsonElement {}
  class JsonObject extends Map<string, JsonElement> {
    clear(): void;
    clone(): JsonObject;
    containsKey(key: any): boolean;
    containsValue(val: any): boolean;
    entrySet(): Set<Entry<string, JsonElement>>;
    equals(other: any): boolean;
    get<E>(clazz: Class<E>, key: string): E;
    get(key: any): JsonElement;
    get key(): string;
    get marshaller(): Marshaller;
    get value(): JsonElement;
    getBoolean(key: string, defaultValue: boolean): boolean;
    getByte(key: string, defaultValue: number): number;
    getChar(key: string, defaultValue: string): string;
    getComment(name: string): string;
    getDelta(defaults: JsonObject): JsonObject;
    getDouble(key: string, defaultValue: number): number;
    getFloat(key: string, defaultValue: number): number;
    getInt(key: string, defaultValue: number): number;
    getLong(key: string, defaultValue: number): number;
    getObject(name: string): JsonObject;
    getShort(key: string, defaultValue: number): number;
    hashCode(): number;
    isEmpty(): boolean;
    keySet(): Set<string>;
    put(key: string, elem: JsonElement, comment: string): JsonElement;
    put(key: string, elem: JsonElement): JsonElement;
    putAll(map: Map<string, JsonElement>): void;
    putDefault(key: string, elem: JsonElement, comment: string): JsonElement;
    putDefault<T>(key: string, elem: T, comment: string): T;
    putDefault<T>(key: string, elem: T, clazz: Class<T>, comment: string): T;
    recursiveGet<E>(clazz: Class<E>, key: string): E;
    recursiveGetOrCreate<E extends JsonElement>(clazz: Class<E>, key: string, fallback: E, comment: string): E;
    remove(key: any): JsonElement;
    set marshaller(marshaller: Marshaller);
    set value(value: JsonElement);
    setComment(name: string, comment: string): void;
    size(): number;
    toJson(comments: boolean, newlines: boolean, depth: number): string;
    toJson(grammar: JsonGrammar, depth: number): string;
    toJson(): string;
    toJson(comments: boolean, newlines: boolean): string;
    toJson(grammar: JsonGrammar): string;
    toString(): string;
    values(): Collection<JsonElement>;
  }


  interface JsonPrimitive extends JsonElement {}
  class JsonPrimitive extends JsonElement {
    static TRUE: JsonPrimitive;
    static FALSE: JsonPrimitive;
    constructor(value: any);
    asBoolean(defaultValue: boolean): boolean;
    asByte(defaultValue: number): number;
    asChar(defaultValue: string): string;
    asDouble(defaultValue: number): number;
    asFloat(defaultValue: number): number;
    asInt(defaultValue: number): number;
    asLong(defaultValue: number): number;
    asShort(defaultValue: number): number;
    asString(): string;
    clone(): JsonPrimitive;
    equals(other: any): boolean;
    static escape(s: string): string;
    get value(): any;
    hashCode(): number;
    toJson(comments: boolean, newlines: boolean, depth: number): string;
    toJson(grammar: JsonGrammar, depth: number): string;
    toJson(): string;
    toJson(comments: boolean, newlines: boolean): string;
    toJson(grammar: JsonGrammar): string;
    toString(): string;
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.blue.endless.jankson.Jankson' {
  import { Class } from 'java.lang';
  import { Function, BiFunction, Supplier } from 'java.util.function';
  import { JsonObject, JsonElement, Jankson } from 'me.shedaniel.cloth.clothconfig.shadowed.blue.endless.jankson';
  import { Marshaller, DeserializerFunction } from 'me.shedaniel.cloth.clothconfig.shadowed.blue.endless.jankson.api';

  class Builder {
    build(): Jankson;
    registerDeserializer<A, B>(sourceClass: Class<A>, targetClass: Class<B>, functionParameter: DeserializerFunction<A, B>): Builder;
    registerPrimitiveTypeAdapter<T>(clazz: Class<T>, adapter: Function<any, T>): Builder;
    registerSerializer<T>(clazz: Class<T>, serializer: BiFunction<T, Marshaller, JsonElement>): Builder;
    registerTypeAdapter<T>(clazz: Class<T>, adapter: Function<JsonObject, T>): Builder;
    registerTypeFactory<T>(clazz: Class<T>, factory: Supplier<T>): Builder;
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.blue.endless.jankson.JsonGrammar' {
  import { JsonGrammar } from 'me.shedaniel.cloth.clothconfig.shadowed.blue.endless.jankson';

  class Builder {
    bareRootObject(bare: boolean): Builder;
    bareSpecialNumerics(bare: boolean): Builder;
    build(): JsonGrammar;
    printCommas(commas: boolean): Builder;
    printTrailingCommas(trailing: boolean): Builder;
    printUnquotedKeys(unquoted: boolean): Builder;
    printWhitespace(whitespace: boolean): Builder;
    withComments(comments: boolean): Builder;
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.blue.endless.jankson.magic' {
  import { Class } from 'java.lang';
  import { Type } from 'java.lang.reflect';

  class TypeMagic {
    static classForType(t: Type): Class<any>;
    static createAndCast<U>(t: Type): U;
    static createAndCast<U>(t: Class<U>, failFast: boolean): U;
    static createAndCastCarefully<U>(t: Type): U;
    static shoehorn<T>(o: any): T;
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.com.moandjiezana.toml' {
  import { AtomicInteger } from 'java.util.concurrent.atomic';
  import { Errors } from 'me.shedaniel.cloth.clothconfig.shadowed.com.moandjiezana.toml.Results';
  import { File, InputStream, Reader, OutputStream, Writer } from 'java.io';
  import { Long, Boolean, Double, Class } from 'java.lang';
  import { List, Date, Map, Set } from 'java.util';
  import { Entry } from 'Map';

  interface ArrayValueReader extends ValueReader {}
  class ArrayValueReader extends ValueReader {
    canRead(s: string): boolean;
    read(s: string, index: AtomicInteger, context: Context): any;
  }


  interface ArrayValueWriter extends ValueWriter {}
  class ArrayValueWriter extends ValueWriter {
    isPrimitiveType(): boolean;
  }


  interface BooleanValueReaderWriter extends ValueReader, ValueWriter {}
  class BooleanValueReaderWriter extends ValueReader {
    canRead(s: string): boolean;
    canWrite(value: any): boolean;
    isPrimitiveType(): boolean;
    read(s: string, index: AtomicInteger, context: Context): any;
    toString(): string;
    write(value: any, context: WriterContext): void;
  }


  class Container {
  }


  class Context {
    constructor(identifier: Identifier, line: AtomicInteger, errors: Errors);
    with(identifier: Identifier): Context;
  }


  class DatePolicy {
  }


  interface DateValueReaderWriter extends ValueReader, ValueWriter {}
  class DateValueReaderWriter extends ValueReader {
    canRead(s: string): boolean;
    canWrite(value: any): boolean;
    isPrimitiveType(): boolean;
    read(original: string, index: AtomicInteger, context: Context): any;
    toString(): string;
    write(value: any, context: WriterContext): void;
  }


  class Identifier {
  }


  class IdentifierConverter {
  }


  class IndentationPolicy {
  }


  interface InlineTableValueReader extends ValueReader {}
  class InlineTableValueReader extends ValueReader {
    canRead(s: string): boolean;
    read(s: string, sharedIndex: AtomicInteger, context: Context): any;
  }


  class Keys {
  }


  interface LiteralStringValueReader extends ValueReader {}
  class LiteralStringValueReader extends ValueReader {
    canRead(s: string): boolean;
    read(s: string, index: AtomicInteger, context: Context): any;
  }


  interface MapValueWriter extends ValueWriter {}
  class MapValueWriter extends ValueWriter {
    canWrite(value: any): boolean;
    isPrimitiveType(): boolean;
    write(value: any, context: WriterContext): void;
  }


  interface MultilineLiteralStringValueReader extends ValueReader {}
  class MultilineLiteralStringValueReader extends ValueReader {
    canRead(s: string): boolean;
    read(s: string, index: AtomicInteger, context: Context): any;
  }


  interface MultilineStringValueReader extends ValueReader {}
  class MultilineStringValueReader extends ValueReader {
    canRead(s: string): boolean;
    read(s: string, index: AtomicInteger, context: Context): any;
  }


  interface NumberValueReaderWriter extends ValueReader, ValueWriter {}
  class NumberValueReaderWriter extends ValueReader {
    canRead(s: string): boolean;
    canWrite(value: any): boolean;
    isPrimitiveType(): boolean;
    read(s: string, index: AtomicInteger, context: Context): any;
    toString(): string;
    write(value: any, context: WriterContext): void;
  }


  interface ObjectValueWriter extends ValueWriter {}
  class ObjectValueWriter extends ValueWriter {
    canWrite(value: any): boolean;
    isPrimitiveType(): boolean;
    write(value: any, context: WriterContext): void;
  }


  interface PrimitiveArrayValueWriter extends ArrayValueWriter {}
  class PrimitiveArrayValueWriter extends ArrayValueWriter {
    canWrite(value: any): boolean;
    toString(): string;
    write(o: any, context: WriterContext): void;
  }


  class Results {
  }


  interface StringValueReaderWriter extends ValueReader, ValueWriter {}
  class StringValueReaderWriter extends ValueReader {
    canRead(s: string): boolean;
    canWrite(value: any): boolean;
    isPrimitiveType(): boolean;
    read(s: string, index: AtomicInteger, context: Context): any;
    toString(): string;
    write(value: any, context: WriterContext): void;
  }


  interface TableArrayValueWriter extends ArrayValueWriter {}
  class TableArrayValueWriter extends ArrayValueWriter {
    canWrite(value: any): boolean;
    toString(): string;
    write(from: any, context: WriterContext): void;
  }


  class Toml {
    constructor();

    constructor(defaults: Toml);
    contains(key: string): boolean;
    containsPrimitive(key: string): boolean;
    containsTable(key: string): boolean;
    containsTableArray(key: string): boolean;
    entrySet(): Set<Entry<string, any>>;
    getBoolean(key: string): boolean;
    getBoolean(key: string, defaultValue: boolean): boolean;
    getDate(key: string): Date;
    getDate(key: string, defaultValue: Date): Date;
    getDouble(key: string): number;
    getDouble(key: string, defaultValue: number): number;
    getList<T>(key: string): T[];
    getList<T>(key: string, defaultValue: T[]): T[];
    getLong(key: string): Long;
    getLong(key: string, defaultValue: Long): Long;
    getString(key: string): string;
    getString(key: string, defaultValue: string): string;
    getTable(key: string): Toml;
    getTables(key: string): Toml[];
    isEmpty(): boolean;
    read(file: File): Toml;
    read(inputStream: InputStream): Toml;
    read(reader: Reader): Toml;
    read(otherToml: Toml): Toml;
    read(tomlString: string): Toml;
    to<T>(targetClass: Class<T>): T;
    toMap(): Map<string, any>;
  }


  class TomlParser {
  }


  class TomlWriter {
    constructor();
    write(from: any): string;
    write(from: any, target: File): void;
    write(from: any, target: OutputStream): void;
    write(from: any, target: Writer): void;
  }


  class ValueReader {
    canRead(var1: string): boolean;
    read(var1: string, var2: AtomicInteger, var3: Context): any;
  }


  class ValueReaders {
  }


  class ValueWriter {
    canWrite(var1: any): boolean;
    isPrimitiveType(): boolean;
    write(var1: any, var2: WriterContext): void;
  }


  class ValueWriters {
  }


  class WriterContext {
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.com.moandjiezana.toml.Container' {
  import { Container } from 'me.shedaniel.cloth.clothconfig.shadowed.com.moandjiezana.toml';

  interface TableArray extends Container {}
  class TableArray extends Container {
    toString(): string;
  }


  interface Table extends Container {}
  class Table extends Container {
    constructor(name: string);

    constructor(tableName: string, implicit: boolean);
    toString(): string;
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.com.moandjiezana.toml.Keys' {
  class Key {
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.com.moandjiezana.toml.Results' {
  import { AtomicInteger } from 'java.util.concurrent.atomic';

  class Errors {
    add(other: Errors): void;
    heterogenous(key: string, line: number): void;
    keyDuplicatesTable(key: string, line: AtomicInteger): void;
    tableDuplicatesKey(table: string, line: AtomicInteger): void;
    toString(): string;
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.com.moandjiezana.toml.TomlWriter' {
  import { TimeZone } from 'java.util';
  import { TomlWriter } from 'me.shedaniel.cloth.clothconfig.shadowed.com.moandjiezana.toml';

  class Builder {
    build(): TomlWriter;
    indentTablesBy(spaces: number): Builder;
    indentValuesBy(spaces: number): Builder;
    padArrayDelimitersBy(spaces: number): Builder;
    showFractionalSeconds(): Builder;
    timeZone(timeZone: TimeZone): Builder;
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.composer' {
  import { Parser } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.parser';
  import { Resolver } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.resolver';
  import { LoaderOptions } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml';
  import { Node } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.nodes';
  import { MarkedYAMLException } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.error';

  class Composer {
    constructor(parser: Parser, resolver: Resolver);

    constructor(parser: Parser, resolver: Resolver, loadingConfig: LoaderOptions);
    checkNode(): boolean;
    get node(): Node;
    get singleNode(): Node;
  }


  interface ComposerException extends MarkedYAMLException {}
  class ComposerException extends MarkedYAMLException {
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.constructor' {
  import { Node } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.nodes';
  import { LoaderOptions, TypeDescription } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml';
  import { Composer } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.composer';
  import { Class, ClassLoader } from 'java.lang';
  import { PropertyUtils } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.introspector';
  import { Collection } from 'java.util';
  import { MarkedYAMLException } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.error';
  import { ConstructUndefined } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.constructor.SafeConstructor';

  interface AbstractConstruct extends Construct {}
  class AbstractConstruct extends Construct {
    construct2ndStep(node: Node, data: any): void;
  }


  class BaseConstructor {
    constructor();

    constructor(loadingConfig: LoaderOptions);
    addTypeDescription(definition: TypeDescription): TypeDescription;
    checkData(): boolean;
    get data(): any;
    get propertyUtils(): PropertyUtils;
    getSingleData(type: Class<any>): any;
    isAllowDuplicateKeys(): boolean;
    isExplicitPropertyUtils(): boolean;
    isWrappedToRootException(): boolean;
    set propertyUtils(propertyUtils: PropertyUtils);
    setAllowDuplicateKeys(allowDuplicateKeys: boolean): void;
    setComposer(composer: Composer): void;
    setWrappedToRootException(wrappedToRootException: boolean): void;
  }


  class Construct {
    construct(var1: Node): any;
    construct2ndStep(var1: Node, var2: any): void;
  }


  interface Constructor extends SafeConstructor {}
  class Constructor extends SafeConstructor {
    constructor();

    constructor(loadingConfig: LoaderOptions);

    constructor(theRoot: Class<any>);

    constructor(theRoot: Class<any>, loadingConfig: LoaderOptions);

    constructor(theRoot: TypeDescription);

    constructor(theRoot: TypeDescription, loadingConfig: LoaderOptions);

    constructor(theRoot: TypeDescription, moreTDs: Collection<TypeDescription>);

    constructor(theRoot: TypeDescription, moreTDs: Collection<TypeDescription>, loadingConfig: LoaderOptions);

    constructor(theRoot: string);

    constructor(theRoot: string, loadingConfig: LoaderOptions);
  }


  interface ConstructorException extends MarkedYAMLException {}
  class ConstructorException extends MarkedYAMLException {
  }


  interface CustomClassLoaderConstructor extends Constructor {}
  class CustomClassLoaderConstructor extends Constructor {
    constructor(cLoader: ClassLoader);

    constructor(theRoot: Class<any>, theLoader: ClassLoader);
  }


  interface DuplicateKeyException extends ConstructorException {}
  class DuplicateKeyException extends ConstructorException {
  }


  interface SafeConstructor extends BaseConstructor {}
  class SafeConstructor extends BaseConstructor {
    static readonly undefinedConstructor: ConstructUndefined;
    constructor();

    constructor(loadingConfig: LoaderOptions);
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.constructor.SafeConstructor' {
  import { AbstractConstruct, Construct } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.constructor';
  import { Node } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.nodes';
  import { Calendar } from 'java.util';

  interface ConstructUndefined extends AbstractConstruct {}
  class ConstructUndefined extends AbstractConstruct {
    construct(node: Node): any;
  }


  interface ConstructYamlMap extends Construct {}
  class ConstructYamlMap extends Construct {
    construct(node: Node): any;
    construct2ndStep(node: Node, object: any): void;
  }


  interface ConstructYamlSeq extends Construct {}
  class ConstructYamlSeq extends Construct {
    construct(node: Node): any;
    construct2ndStep(node: Node, data: any): void;
  }


  interface ConstructYamlStr extends AbstractConstruct {}
  class ConstructYamlStr extends AbstractConstruct {
    construct(node: Node): any;
  }


  interface ConstructYamlSet extends Construct {}
  class ConstructYamlSet extends Construct {
    construct(node: Node): any;
    construct2ndStep(node: Node, object: any): void;
  }


  interface ConstructYamlPairs extends AbstractConstruct {}
  class ConstructYamlPairs extends AbstractConstruct {
    construct(node: Node): any;
  }


  interface ConstructYamlOmap extends AbstractConstruct {}
  class ConstructYamlOmap extends AbstractConstruct {
    construct(node: Node): any;
  }


  interface ConstructYamlTimestamp extends AbstractConstruct {}
  class ConstructYamlTimestamp extends AbstractConstruct {
    construct(node: Node): any;
    get calendar(): Calendar;
  }


  interface ConstructYamlBinary extends AbstractConstruct {}
  class ConstructYamlBinary extends AbstractConstruct {
    construct(node: Node): any;
  }


  interface ConstructYamlFloat extends AbstractConstruct {}
  class ConstructYamlFloat extends AbstractConstruct {
    construct(node: Node): any;
  }


  interface ConstructYamlInt extends AbstractConstruct {}
  class ConstructYamlInt extends AbstractConstruct {
    construct(node: Node): any;
  }


  interface ConstructYamlBool extends AbstractConstruct {}
  class ConstructYamlBool extends AbstractConstruct {
    construct(node: Node): any;
  }


  interface ConstructYamlNull extends AbstractConstruct {}
  class ConstructYamlNull extends AbstractConstruct {
    construct(node: Node): any;
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml' {
  import { ScalarStyle, Version, LineBreak, FlowStyle, NonPrintableStyle } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.DumperOptions';
  import { Map, TimeZone, Iterator, List } from 'java.util';
  import { AnchorGenerator } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.serializer';
  import { Representer } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.representer';
  import { BaseConstructor } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.constructor';
  import { Resolver } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.resolver';
  import { Node, Tag } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.nodes';
  import { Writer, InputStream, Reader } from 'java.io';
  import { Event } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.events';
  import { Class, Iterable } from 'java.lang';
  import { Pattern } from 'java.util.regex';
  import { BeanAccess } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.introspector';

  class DumperOptions {
    get anchorGenerator(): AnchorGenerator;
    get defaultFlowStyle(): FlowStyle;
    get defaultScalarStyle(): ScalarStyle;
    get indent(): number;
    get indentWithIndicator(): boolean;
    get indicatorIndent(): number;
    get lineBreak(): LineBreak;
    get maxSimpleKeyLength(): number;
    get nonPrintableStyle(): NonPrintableStyle;
    get splitLines(): boolean;
    get tags(): Map<string, string>;
    get timeZone(): TimeZone;
    get version(): Version;
    get width(): number;
    isAllowReadOnlyProperties(): boolean;
    isAllowUnicode(): boolean;
    isCanonical(): boolean;
    isExplicitEnd(): boolean;
    isExplicitStart(): boolean;
    isPrettyFlow(): boolean;
    set anchorGenerator(anchorGenerator: AnchorGenerator);
    set defaultFlowStyle(defaultFlowStyle: FlowStyle);
    set defaultScalarStyle(defaultStyle: ScalarStyle);
    set indent(indent: number);
    set indentWithIndicator(indentWithIndicator: boolean);
    set indicatorIndent(indicatorIndent: number);
    set lineBreak(lineBreak: LineBreak);
    set maxSimpleKeyLength(maxSimpleKeyLength: number);
    set nonPrintableStyle(style: NonPrintableStyle);
    set splitLines(splitLines: boolean);
    set tags(tags: Map<string, string>);
    set timeZone(timeZone: TimeZone);
    set version(version: Version);
    set width(bestWidth: number);
    setAllowReadOnlyProperties(allowReadOnlyProperties: boolean): void;
    setAllowUnicode(allowUnicode: boolean): void;
    setCanonical(canonical: boolean): void;
    setExplicitEnd(explicitEnd: boolean): void;
    setExplicitStart(explicitStart: boolean): void;
    setPrettyFlow(prettyFlow: boolean): void;
  }


  class LoaderOptions {
    get allowRecursiveKeys(): boolean;
    get maxAliasesForCollections(): number;
    isAllowDuplicateKeys(): boolean;
    isWrappedToRootException(): boolean;
    set allowRecursiveKeys(allowRecursiveKeys: boolean);
    set maxAliasesForCollections(maxAliasesForCollections: number);
    setAllowDuplicateKeys(allowDuplicateKeys: boolean): void;
    setWrappedToRootException(wrappedToRootException: boolean): void;
  }


  class Yaml {
    constructor();

    constructor(dumperOptions: DumperOptions);

    constructor(loadingConfig: LoaderOptions);

    constructor(representer: Representer);

    constructor(constructor: BaseConstructor);

    constructor(constructor: BaseConstructor, representer: Representer);

    constructor(representer: Representer, dumperOptions: DumperOptions);

    constructor(constructor: BaseConstructor, representer: Representer, dumperOptions: DumperOptions);

    constructor(constructor: BaseConstructor, representer: Representer, dumperOptions: DumperOptions, loadingConfig: LoaderOptions);

    constructor(constructor: BaseConstructor, representer: Representer, dumperOptions: DumperOptions, resolver: Resolver);

    constructor(constructor: BaseConstructor, representer: Representer, dumperOptions: DumperOptions, loadingConfig: LoaderOptions, resolver: Resolver);
    addImplicitResolver(tag: Tag, regexp: Pattern, first: string): void;
    addTypeDescription(td: TypeDescription): void;
    compose(yaml: Reader): Node;
    composeAll(yaml: Reader): Iterable<Node>;
    dump(data: any): string;
    dump(data: any, output: Writer): void;
    dumpAll(data: Iterator<any>): string;
    dumpAll(data: Iterator<any>, output: Writer): void;
    dumpAs(data: any, rootTag: Tag, flowStyle: FlowStyle): string;
    dumpAsMap(data: any): string;
    get name(): string;
    hasNext(): boolean;
    hasNext(): boolean;
    hasNext(): boolean;
    load<T>(yaml: string): T;
    load<T>(io: InputStream): T;
    load<T>(io: Reader): T;
    loadAll(yaml: Reader): Iterable<any>;
    loadAll(yaml: string): Iterable<any>;
    loadAll(yaml: InputStream): Iterable<any>;
    loadAs<T>(io: Reader, type: Class<T>): T;
    loadAs<T>(yaml: string, type: Class<T>): T;
    loadAs<T>(input: InputStream, type: Class<T>): T;
    next(): any;
    next(): Node;
    next(): Event;
    parse(yaml: Reader): Iterable<Event>;
    remove(): void;
    remove(): void;
    remove(): void;
    represent(data: any): Node;
    serialize(node: Node, output: Writer): void;
    serialize(data: Node): Event[];
    set name(name: string);
    setBeanAccess(beanAccess: BeanAccess): void;
    toString(): string;
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.DumperOptions' {
  import { Enum, Boolean, Character } from 'java.lang';
  import { List } from 'java.util';

  interface NonPrintableStyle extends Enum<NonPrintableStyle> {}
  class NonPrintableStyle extends Enum<NonPrintableStyle> {
    static readonly BINARY: NonPrintableStyle;
    static readonly ESCAPE: NonPrintableStyle;
    static valueOf(name: string): NonPrintableStyle;
    static values(): NonPrintableStyle[];
  }


  interface Version extends Enum<Version> {}
  class Version extends Enum<Version> {
    static readonly V1_0: Version;
    static readonly V1_1: Version;
    get representation(): string;
    major(): number;
    minor(): number;
    toString(): string;
    static valueOf(name: string): Version;
    static values(): Version[];
  }


  interface LineBreak extends Enum<LineBreak> {}
  class LineBreak extends Enum<LineBreak> {
    static readonly WIN: LineBreak;
    static readonly MAC: LineBreak;
    static readonly UNIX: LineBreak;
    static get platformLineBreak(): LineBreak;
    get string(): string;
    toString(): string;
    static valueOf(name: string): LineBreak;
    static values(): LineBreak[];
  }


  interface FlowStyle extends Enum<FlowStyle> {}
  class FlowStyle extends Enum<FlowStyle> {
    static readonly FLOW: FlowStyle;
    static readonly BLOCK: FlowStyle;
    static readonly AUTO: FlowStyle;
    static fromBoolean(flowStyle: boolean): FlowStyle;
    get styleBoolean(): boolean;
    toString(): string;
    static valueOf(name: string): FlowStyle;
    static values(): FlowStyle[];
  }


  interface ScalarStyle extends Enum<ScalarStyle> {}
  class ScalarStyle extends Enum<ScalarStyle> {
    static readonly DOUBLE_QUOTED: ScalarStyle;
    static readonly SINGLE_QUOTED: ScalarStyle;
    static readonly LITERAL: ScalarStyle;
    static readonly FOLDED: ScalarStyle;
    static readonly PLAIN: ScalarStyle;
    static createStyle(style: string): ScalarStyle;
    get char(): string;
    toString(): string;
    static valueOf(name: string): ScalarStyle;
    static values(): ScalarStyle[];
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.emitter' {
  import { Event } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.events';
  import { Writer } from 'java.io';
  import { DumperOptions } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml';
  import { YAMLException } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.error';

  class Emitable {
    emit(var1: Event): void;
  }


  interface Emitter extends Emitable {}
  class Emitter extends Emitable {
    static readonly MIN_INDENT: number;
    static readonly MAX_INDENT: number;
    constructor(stream: Writer, opts: DumperOptions);
    emit(event: Event): void;
  }


  interface EmitterException extends YAMLException {}
  class EmitterException extends YAMLException {
    constructor(msg: string);
  }


  class EmitterState {
    expect(): void;
  }


  class ScalarAnalysis {
    constructor(scalar: string, empty: boolean, multiline: boolean, allowFlowPlain: boolean, allowBlockPlain: boolean, allowSingleQuoted: boolean, allowBlock: boolean);
    get scalar(): string;
    isAllowBlock(): boolean;
    isAllowBlockPlain(): boolean;
    isAllowFlowPlain(): boolean;
    isAllowSingleQuoted(): boolean;
    isEmpty(): boolean;
    isMultiline(): boolean;
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.env' {
  import { Constructor } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.constructor';
  import { Tag } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.nodes';
  import { Pattern } from 'java.util.regex';

  interface EnvScalarConstructor extends Constructor {}
  class EnvScalarConstructor extends Constructor {
    static readonly ENV_TAG: Tag;
    static readonly ENV_FORMAT: Pattern;
    constructor();
    apply(name: string, separator: string, value: string, environment: string): string;
    getEnv(key: string): string;
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.error' {
  import { Serializable } from 'java.io';
  import { RuntimeException, Throwable } from 'java.lang';

  interface Mark extends Serializable {}
  class Mark extends Serializable {
    constructor(name: string, index: number, line: number, column: number, str: string[], pointer: number);

    constructor(name: string, index: number, line: number, column: number, buffer: string, pointer: number);

    constructor(name: string, index: number, line: number, column: number, buffer: number[], pointer: number);
    get _snippet(): string;
    get buffer(): number[];
    get column(): number;
    get index(): number;
    get line(): number;
    get name(): string;
    get pointer(): number;
    get_snippet(indent: number, max_length: number): string;
    toString(): string;
  }


  interface MarkedYAMLException extends YAMLException {}
  class MarkedYAMLException extends YAMLException {
    get context(): string;
    get contextMark(): Mark;
    get message(): string;
    get problem(): string;
    get problemMark(): Mark;
    toString(): string;
  }


  interface MissingEnvironmentVariableException extends YAMLException {}
  class MissingEnvironmentVariableException extends YAMLException {
    constructor(message: string);
  }


  interface YAMLException extends RuntimeException {}
  class YAMLException extends RuntimeException {
    constructor(message: string);

    constructor(cause: Throwable);

    constructor(message: string, cause: Throwable);
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.events' {
  import { Mark } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.error';
  import { ID } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.events.Event';
  import { FlowStyle, Version, ScalarStyle } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.DumperOptions';
  import { Boolean, Character } from 'java.lang';
  import { Map } from 'java.util';

  interface AliasEvent extends NodeEvent {}
  class AliasEvent extends NodeEvent {
    constructor(anchor: string, startMark: Mark, endMark: Mark);
    get eventId(): ID;
  }


  interface CollectionEndEvent extends Event {}
  class CollectionEndEvent extends Event {
    constructor(startMark: Mark, endMark: Mark);
  }


  interface CollectionStartEvent extends NodeEvent {}
  class CollectionStartEvent extends NodeEvent {
    constructor(anchor: string, tag: string, implicit: boolean, startMark: Mark, endMark: Mark, flowStyle: FlowStyle);

    constructor(anchor: string, tag: string, implicit: boolean, startMark: Mark, endMark: Mark, flowStyle: boolean);
    get flowStyle(): FlowStyle;
    get implicit(): boolean;
    get tag(): string;
    isFlow(): boolean;
  }


  interface DocumentEndEvent extends Event {}
  class DocumentEndEvent extends Event {
    constructor(startMark: Mark, endMark: Mark, explicit: boolean);
    get eventId(): ID;
    get explicit(): boolean;
  }


  interface DocumentStartEvent extends Event {}
  class DocumentStartEvent extends Event {
    constructor(startMark: Mark, endMark: Mark, explicit: boolean, version: Version, tags: Map<string, string>);
    get eventId(): ID;
    get explicit(): boolean;
    get tags(): Map<string, string>;
    get version(): Version;
  }


  class Event {
    constructor(startMark: Mark, endMark: Mark);
    equals(obj: any): boolean;
    get endMark(): Mark;
    get eventId(): ID;
    get startMark(): Mark;
    hashCode(): number;
    is(id: ID): boolean;
    toString(): string;
  }


  class ImplicitTuple {
    constructor(plain: boolean, nonplain: boolean);
    bothFalse(): boolean;
    canOmitTagInNonPlainScalar(): boolean;
    canOmitTagInPlainScalar(): boolean;
    toString(): string;
  }


  interface MappingEndEvent extends CollectionEndEvent {}
  class MappingEndEvent extends CollectionEndEvent {
    constructor(startMark: Mark, endMark: Mark);
    get eventId(): ID;
  }


  interface MappingStartEvent extends CollectionStartEvent {}
  class MappingStartEvent extends CollectionStartEvent {
    constructor(anchor: string, tag: string, implicit: boolean, startMark: Mark, endMark: Mark, flowStyle: FlowStyle);

    constructor(anchor: string, tag: string, implicit: boolean, startMark: Mark, endMark: Mark, flowStyle: boolean);
    get eventId(): ID;
  }


  interface NodeEvent extends Event {}
  class NodeEvent extends Event {
    constructor(anchor: string, startMark: Mark, endMark: Mark);
    get anchor(): string;
  }


  interface ScalarEvent extends NodeEvent {}
  class ScalarEvent extends NodeEvent {
    constructor(anchor: string, tag: string, implicit: ImplicitTuple, value: string, startMark: Mark, endMark: Mark, style: ScalarStyle);

    constructor(anchor: string, tag: string, implicit: ImplicitTuple, value: string, startMark: Mark, endMark: Mark, style: string);
    get eventId(): ID;
    get implicit(): ImplicitTuple;
    get scalarStyle(): ScalarStyle;
    get style(): string;
    get tag(): string;
    get value(): string;
    isPlain(): boolean;
  }


  interface SequenceEndEvent extends CollectionEndEvent {}
  class SequenceEndEvent extends CollectionEndEvent {
    constructor(startMark: Mark, endMark: Mark);
    get eventId(): ID;
  }


  interface SequenceStartEvent extends CollectionStartEvent {}
  class SequenceStartEvent extends CollectionStartEvent {
    constructor(anchor: string, tag: string, implicit: boolean, startMark: Mark, endMark: Mark, flowStyle: FlowStyle);

    constructor(anchor: string, tag: string, implicit: boolean, startMark: Mark, endMark: Mark, flowStyle: boolean);
    get eventId(): ID;
  }


  interface StreamEndEvent extends Event {}
  class StreamEndEvent extends Event {
    constructor(startMark: Mark, endMark: Mark);
    get eventId(): ID;
  }


  interface StreamStartEvent extends Event {}
  class StreamStartEvent extends Event {
    constructor(startMark: Mark, endMark: Mark);
    get eventId(): ID;
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.events.Event' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ID extends Enum<ID> {}
  class ID extends Enum<ID> {
    static readonly Alias: ID;
    static readonly DocumentEnd: ID;
    static readonly DocumentStart: ID;
    static readonly MappingEnd: ID;
    static readonly MappingStart: ID;
    static readonly Scalar: ID;
    static readonly SequenceEnd: ID;
    static readonly SequenceStart: ID;
    static readonly StreamEnd: ID;
    static readonly StreamStart: ID;
    static valueOf(name: string): ID;
    static values(): ID[];
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.extensions.compactnotation' {
  import { Constructor } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.constructor';
  import { Map, List } from 'java.util';

  interface CompactConstructor extends Constructor {}
  class CompactConstructor extends Constructor {
    getCompactData(scalar: string): CompactData;
  }


  class CompactData {
    constructor(prefix: string);
    get arguments(): string[];
    get prefix(): string;
    get properties(): Map<string, string>;
    toString(): string;
  }


  interface PackageCompactConstructor extends CompactConstructor {}
  class PackageCompactConstructor extends CompactConstructor {
    constructor(packageName: string);
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.extensions.compactnotation.CompactConstructor' {
  import { ConstructMapping } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.constructor.Constructor';
  import { Node } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.nodes';

  interface ConstructCompactObject extends ConstructMapping {}
  class ConstructCompactObject extends ConstructMapping {
    construct(node: Node): any;
    construct2ndStep(node: Node, object: any): void;
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.external.biz.base64Coder' {
  class Base64Coder {
    static decode(s: string): number[];
    static decode(inParameter: string[]): number[];
    static decode(inParameter: string[], iOff: number, iLen: number): number[];
    static decodeLines(s: string): number[];
    static decodeString(s: string): string;
    static encode(inParameter: number[]): string[];
    static encode(inParameter: number[], iLen: number): string[];
    static encode(inParameter: number[], iOff: number, iLen: number): string[];
    static encodeLines(inParameter: number[]): string;
    static encodeLines(inParameter: number[], iOff: number, iLen: number, lineLen: number, lineSeparator: string): string;
    static encodeString(s: string): string;
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.external.com.google.gdata.util.common.base' {
  import { Appendable, CharSequence } from 'java.lang';

  class Escaper {
    escape(var1: string): string;
    escape(var1: Appendable): Appendable;
  }


  interface PercentEscaper extends UnicodeEscaper {}
  class PercentEscaper extends UnicodeEscaper {
    static readonly SAFECHARS_URLENCODER: string;
    static readonly SAFEPATHCHARS_URLENCODER: string;
    static readonly SAFEQUERYSTRINGCHARS_URLENCODER: string;
    constructor(safeChars: string, plusForSpace: boolean);
    escape(s: string): string;
    escape(out: Appendable): Appendable;
  }


  interface UnicodeEscaper extends Escaper {}
  class UnicodeEscaper extends Escaper {
    append(csq: CharSequence): Appendable;
    append(csq: CharSequence, start: number, end: number): Appendable;
    append(c: string): Appendable;
    escape(string: string): string;
    escape(out: Appendable): Appendable;
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.introspector' {
  import { Enum, Class, Comparable } from 'java.lang';
  import { List, Set } from 'java.util';
  import { Field, Type } from 'java.lang.reflect';
  import { Annotation } from 'java.lang.annotation';
  import { PropertyDescriptor } from 'java.beans';

  interface BeanAccess extends Enum<BeanAccess> {}
  class BeanAccess extends Enum<BeanAccess> {
    static readonly DEFAULT: BeanAccess;
    static readonly FIELD: BeanAccess;
    static readonly PROPERTY: BeanAccess;
    static valueOf(name: string): BeanAccess;
    static values(): BeanAccess[];
  }


  interface FieldProperty extends GenericProperty {}
  class FieldProperty extends GenericProperty {
    constructor(field: Field);
    get(object: any): any;
    get annotations(): Annotation[];
    getAnnotation<A extends Annotation>(annotationType: Class<A>): A;
    set(object: any, value: any): void;
  }


  interface GenericProperty extends Property {}
  class GenericProperty extends Property {
    constructor(name: string, aClass: Class<any>, aType: Type);
    get actualTypeArguments(): Class<any>;
  }


  interface MethodProperty extends GenericProperty {}
  class MethodProperty extends GenericProperty {
    constructor(property: PropertyDescriptor);
    get(object: any): any;
    get annotations(): Annotation[];
    getAnnotation<A extends Annotation>(annotationType: Class<A>): A;
    isReadable(): boolean;
    isWritable(): boolean;
    set(object: any, value: any): void;
  }


  interface MissingProperty extends Property {}
  class MissingProperty extends Property {
    constructor(name: string);
    get(object: any): any;
    get actualTypeArguments(): Class<any>;
    get annotations(): Annotation[];
    getAnnotation<A extends Annotation>(annotationType: Class<A>): A;
    set(object: any, value: any): void;
  }


  interface Property extends Comparable<Property> {}
  class Property extends Comparable<Property> {
    constructor(name: string, type: Class<any>);
    compareTo(o: Property): number;
    equals(other: any): boolean;
    get(var1: any): any;
    get actualTypeArguments(): Class<any>;
    get annotations(): Annotation[];
    get name(): string;
    get type(): Class<any>;
    getAnnotation<A extends Annotation>(var1: Class<A>): A;
    hashCode(): number;
    isReadable(): boolean;
    isWritable(): boolean;
    set(var1: any, var2: any): void;
    toString(): string;
  }


  interface PropertySubstitute extends Property {}
  class PropertySubstitute extends Property {
    constructor(name: string, type: Class<any>, readMethod: string, writeMethod: string, ...params: Class<any>[]);

    constructor(name: string, type: Class<any>, ...params: Class<any>[]);
    get(object: any): any;
    get actualTypeArguments(): Class<any>;
    get annotations(): Annotation[];
    get name(): string;
    get type(): Class<any>;
    getAnnotation<A extends Annotation>(annotationType: Class<A>): A;
    isReadable(): boolean;
    isWritable(): boolean;
    set(object: any, value: any): void;
    set actualTypeArguments(...args: Class<any>[]);
    setDelegate(delegate: Property): void;
    setTargetType(targetType: Class<any>): void;
  }


  class PropertyUtils {
    constructor();
    getProperties(type: Class<any>): Set<Property>;
    getProperties(type: Class<any>, bAccess: BeanAccess): Set<Property>;
    getProperty(type: Class<any>, name: string): Property;
    getProperty(type: Class<any>, name: string, bAccess: BeanAccess): Property;
    isAllowReadOnlyProperties(): boolean;
    isSkipMissingProperties(): boolean;
    setAllowReadOnlyProperties(allowReadOnlyProperties: boolean): void;
    setBeanAccess(beanAccess: BeanAccess): void;
    setSkipMissingProperties(skipMissingProperties: boolean): void;
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.nodes' {
  import { Mark } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.error';
  import { FlowStyle, ScalarStyle } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.DumperOptions';
  import { Boolean, Class, Enum, Character } from 'java.lang';
  import { List } from 'java.util';
  import { URI } from 'java.net';

  interface AnchorNode extends Node {}
  class AnchorNode extends Node {
    constructor(realNode: Node);
    get nodeId(): NodeId;
    get realNode(): Node;
  }


  interface CollectionNode<T = any> extends Node {}
  class CollectionNode<T = any> extends Node {
    constructor(tag: Tag, startMark: Mark, endMark: Mark, flowStyle: FlowStyle);

    constructor(tag: Tag, startMark: Mark, endMark: Mark, flowStyle: boolean);
    get flowStyle(): FlowStyle;
    get value(): T[];
    set flowStyle(flowStyle: FlowStyle);
    setEndMark(endMark: Mark): void;
    setFlowStyle(flowStyle: boolean): void;
  }


  interface MappingNode extends CollectionNode<NodeTuple> {}
  class MappingNode extends CollectionNode<NodeTuple> {
    constructor(tag: Tag, resolved: boolean, value: NodeTuple[], startMark: Mark, endMark: Mark, flowStyle: FlowStyle);

    constructor(tag: Tag, value: NodeTuple[], flowStyle: FlowStyle);

    constructor(tag: Tag, resolved: boolean, value: NodeTuple[], startMark: Mark, endMark: Mark, flowStyle: boolean);

    constructor(tag: Tag, value: NodeTuple[], flowStyle: boolean);
    get nodeId(): NodeId;
    get value(): NodeTuple[];
    isMerged(): boolean;
    set value(mergedValue: NodeTuple[]);
    setMerged(merged: boolean): void;
    setOnlyKeyType(keyType: Class<any>): void;
    setTypes(keyType: Class<any>, valueType: Class<any>): void;
    toString(): string;
  }


  class Node {
    constructor(tag: Tag, startMark: Mark, endMark: Mark);
    equals(obj: any): boolean;
    get anchor(): string;
    get endMark(): Mark;
    get nodeId(): NodeId;
    get startMark(): Mark;
    get tag(): Tag;
    get type(): Class<any>;
    hashCode(): number;
    isResolved(): boolean;
    isTwoStepsConstruction(): boolean;
    set anchor(anchor: string);
    set tag(tag: Tag);
    set type(type: Class<any>);
    setTwoStepsConstruction(twoStepsConstruction: boolean): void;
    setUseClassConstructor(useClassConstructor: boolean): void;
    useClassConstructor(): boolean;
  }


  interface NodeId extends Enum<NodeId> {}
  class NodeId extends Enum<NodeId> {
    static readonly scalar: NodeId;
    static readonly sequence: NodeId;
    static readonly mapping: NodeId;
    static readonly anchor: NodeId;
    static valueOf(name: string): NodeId;
    static values(): NodeId[];
  }


  class NodeTuple {
    constructor(keyNode: Node, valueNode: Node);
    get keyNode(): Node;
    get valueNode(): Node;
    toString(): string;
  }


  interface ScalarNode extends Node {}
  class ScalarNode extends Node {
    constructor(tag: Tag, value: string, startMark: Mark, endMark: Mark, style: ScalarStyle);

    constructor(tag: Tag, resolved: boolean, value: string, startMark: Mark, endMark: Mark, style: ScalarStyle);

    constructor(tag: Tag, value: string, startMark: Mark, endMark: Mark, style: string);

    constructor(tag: Tag, resolved: boolean, value: string, startMark: Mark, endMark: Mark, style: string);
    get nodeId(): NodeId;
    get scalarStyle(): ScalarStyle;
    get style(): string;
    get value(): string;
    isPlain(): boolean;
    toString(): string;
  }


  interface SequenceNode extends CollectionNode<Node> {}
  class SequenceNode extends CollectionNode<Node> {
    constructor(tag: Tag, resolved: boolean, value: Node[], startMark: Mark, endMark: Mark, flowStyle: FlowStyle);

    constructor(tag: Tag, value: Node[], flowStyle: FlowStyle);

    constructor(tag: Tag, value: Node[], style: boolean);

    constructor(tag: Tag, resolved: boolean, value: Node[], startMark: Mark, endMark: Mark, style: boolean);
    get nodeId(): NodeId;
    get value(): Node[];
    setListType(listType: Class<any>): void;
    toString(): string;
  }


  class Tag {
    static readonly PREFIX: string;
    static readonly YAML: Tag;
    static readonly MERGE: Tag;
    static readonly SET: Tag;
    static readonly PAIRS: Tag;
    static readonly OMAP: Tag;
    static readonly BINARY: Tag;
    static readonly INT: Tag;
    static readonly FLOAT: Tag;
    static readonly TIMESTAMP: Tag;
    static readonly BOOL: Tag;
    static readonly NULL: Tag;
    static readonly STR: Tag;
    static readonly SEQ: Tag;
    static readonly MAP: Tag;
    constructor(tag: string);

    constructor(clazz: Class<any>);

    constructor(uri: URI);
    equals(obj: any): boolean;
    get className(): string;
    get value(): string;
    hashCode(): number;
    isCompatible(clazz: Class<any>): boolean;
    isSecondary(): boolean;
    matches(clazz: Class<any>): boolean;
    startsWith(prefix: string): boolean;
    toString(): string;
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.parser' {
  import { ID } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.events.Event';
  import { Event } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.events';
  import { MarkedYAMLException, Mark } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.error';
  import { Version } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.DumperOptions';
  import { Map } from 'java.util';

  class Parser {
    checkEvent(var1: ID): boolean;
    get event(): Event;
    peekEvent(): Event;
  }


  interface ParserException extends MarkedYAMLException {}
  class ParserException extends MarkedYAMLException {
    constructor(context: string, contextMark: Mark, problem: string, problemMark: Mark);
  }


  class Production {
    produce(): Event;
  }


  class VersionTagsTuple {
    constructor(version: Version, tags: Map<string, string>);
    get tags(): Map<string, string>;
    get version(): Version;
    toString(): string;
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.reader' {
  import { YAMLException, Mark } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.error';
  import { Reader, InputStream } from 'java.io';

  interface ReaderException extends YAMLException {}
  class ReaderException extends YAMLException {
    constructor(name: string, position: number, codePoint: number, message: string);
    get codePoint(): number;
    get name(): string;
    get position(): number;
    toString(): string;
  }


  class StreamReader {
    constructor(stream: string);

    constructor(reader: Reader);
    forward(): void;
    forward(length: number): void;
    get column(): number;
    get index(): number;
    get line(): number;
    get mark(): Mark;
    static isPrintable(data: string): boolean;
    static isPrintable(c: number): boolean;
    peek(): number;
    peek(index: number): number;
    prefix(length: number): string;
    prefixForward(length: number): string;
  }


  interface UnicodeReader extends Reader {}
  class UnicodeReader extends Reader {
    constructor(inParameter: InputStream);
    close(): void;
    get encoding(): string;
    read(cbuf: string[], off: number, len: number): number;
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.representer' {
  import { Node, Tag } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.nodes';
  import { ScalarStyle, FlowStyle } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.DumperOptions';
  import { PropertyUtils } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.introspector';
  import { DumperOptions, TypeDescription } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml';
  import { Class } from 'java.lang';
  import { TimeZone } from 'java.util';

  class BaseRepresenter {
    get defaultFlowStyle(): FlowStyle;
    get defaultScalarStyle(): ScalarStyle;
    get propertyUtils(): PropertyUtils;
    isExplicitPropertyUtils(): boolean;
    represent(data: any): Node;
    set defaultFlowStyle(defaultFlowStyle: FlowStyle);
    set defaultScalarStyle(defaultStyle: ScalarStyle);
    set propertyUtils(propertyUtils: PropertyUtils);
  }


  class Represent {
    representData(var1: any): Node;
  }


  interface Representer extends SafeRepresenter {}
  class Representer extends SafeRepresenter {
    constructor();

    constructor(options: DumperOptions);
    addTypeDescription(td: TypeDescription): TypeDescription;
    setPropertyUtils(propertyUtils: PropertyUtils): void;
  }


  interface SafeRepresenter extends BaseRepresenter {}
  class SafeRepresenter extends BaseRepresenter {
    constructor();

    constructor(options: DumperOptions);
    addClassTag(clazz: Class<any>, tag: Tag): Tag;
    get timeZone(): TimeZone;
    set timeZone(timeZone: TimeZone);
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.resolver' {
  import { Pattern } from 'java.util.regex';
  import { Tag, NodeId } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.nodes';

  class Resolver {
    static readonly BOOL: Pattern;
    static readonly FLOAT: Pattern;
    static readonly INT: Pattern;
    static readonly MERGE: Pattern;
    static readonly NULL: Pattern;
    static readonly EMPTY: Pattern;
    static readonly TIMESTAMP: Pattern;
    static readonly VALUE: Pattern;
    static readonly YAML: Pattern;
    constructor();
    addImplicitResolver(tag: Tag, regexp: Pattern, first: string): void;
    resolve(kind: NodeId, value: string, implicit: boolean): Tag;
  }


  class ResolverTuple {
    constructor(tag: Tag, regexp: Pattern);
    get regexp(): Pattern;
    get tag(): Tag;
    toString(): string;
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.scanner' {
  import { ID } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.tokens.Token';
  import { Token } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.tokens';
  import { MarkedYAMLException, Mark } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.error';

  class Constant {
    static readonly LINEBR: Constant;
    static readonly FULL_LINEBR: Constant;
    static readonly NULL_OR_LINEBR: Constant;
    static readonly NULL_BL_LINEBR: Constant;
    static readonly NULL_BL_T_LINEBR: Constant;
    static readonly NULL_BL_T: Constant;
    static readonly URI_CHARS: Constant;
    static readonly ALPHA: Constant;
    has(c: number): boolean;
    has(c: number, additional: string): boolean;
    hasNo(c: number): boolean;
    hasNo(c: number, additional: string): boolean;
  }


  class Scanner {
    checkToken(...var1: ID[]): boolean;
    get token(): Token;
    peekToken(): Token;
  }


  interface ScannerException extends MarkedYAMLException {}
  class ScannerException extends MarkedYAMLException {
    constructor(context: string, contextMark: Mark, problem: string, problemMark: Mark, note: string);

    constructor(context: string, contextMark: Mark, problem: string, problemMark: Mark);
  }


  class SimpleKey {
    constructor(tokenNumber: number, required: boolean, index: number, line: number, column: number, mark: Mark);
    get column(): number;
    get index(): number;
    get line(): number;
    get mark(): Mark;
    get tokenNumber(): number;
    isRequired(): boolean;
    toString(): string;
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.serializer' {
  import { Node, Tag } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.nodes';
  import { Emitable } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.emitter';
  import { Resolver } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.resolver';
  import { DumperOptions } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml';
  import { YAMLException } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.error';

  class AnchorGenerator {
    nextAnchor(var1: Node): string;
  }


  interface NumberAnchorGenerator extends AnchorGenerator {}
  class NumberAnchorGenerator extends AnchorGenerator {
    constructor(lastAnchorId: number);
    nextAnchor(node: Node): string;
  }


  class Serializer {
    constructor(emitter: Emitable, resolver: Resolver, opts: DumperOptions, rootTag: Tag);
    close(): void;
    open(): void;
    serialize(node: Node): void;
  }


  interface SerializerException extends YAMLException {}
  class SerializerException extends YAMLException {
    constructor(message: string);
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.tokens' {
  import { Mark } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.error';
  import { ID } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.tokens.Token';
  import { List } from 'java.util';
  import { ScalarStyle } from 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.DumperOptions';

  interface AliasToken extends Token {}
  class AliasToken extends Token {
    constructor(value: string, startMark: Mark, endMark: Mark);
    get tokenId(): ID;
    get value(): string;
  }


  interface AnchorToken extends Token {}
  class AnchorToken extends Token {
    constructor(value: string, startMark: Mark, endMark: Mark);
    get tokenId(): ID;
    get value(): string;
  }


  interface BlockEndToken extends Token {}
  class BlockEndToken extends Token {
    constructor(startMark: Mark, endMark: Mark);
    get tokenId(): ID;
  }


  interface BlockEntryToken extends Token {}
  class BlockEntryToken extends Token {
    constructor(startMark: Mark, endMark: Mark);
    get tokenId(): ID;
  }


  interface BlockMappingStartToken extends Token {}
  class BlockMappingStartToken extends Token {
    constructor(startMark: Mark, endMark: Mark);
    get tokenId(): ID;
  }


  interface BlockSequenceStartToken extends Token {}
  class BlockSequenceStartToken extends Token {
    constructor(startMark: Mark, endMark: Mark);
    get tokenId(): ID;
  }


  interface CommentToken extends Token {}
  class CommentToken extends Token {
    constructor(startMark: Mark, endMark: Mark);
    get tokenId(): ID;
  }


  interface DirectiveToken<T = any> extends Token {}
  class DirectiveToken<T = any> extends Token {
    constructor(name: string, value: T[], startMark: Mark, endMark: Mark);
    get name(): string;
    get tokenId(): ID;
    get value(): T[];
  }


  interface DocumentEndToken extends Token {}
  class DocumentEndToken extends Token {
    constructor(startMark: Mark, endMark: Mark);
    get tokenId(): ID;
  }


  interface DocumentStartToken extends Token {}
  class DocumentStartToken extends Token {
    constructor(startMark: Mark, endMark: Mark);
    get tokenId(): ID;
  }


  interface FlowEntryToken extends Token {}
  class FlowEntryToken extends Token {
    constructor(startMark: Mark, endMark: Mark);
    get tokenId(): ID;
  }


  interface FlowMappingEndToken extends Token {}
  class FlowMappingEndToken extends Token {
    constructor(startMark: Mark, endMark: Mark);
    get tokenId(): ID;
  }


  interface FlowMappingStartToken extends Token {}
  class FlowMappingStartToken extends Token {
    constructor(startMark: Mark, endMark: Mark);
    get tokenId(): ID;
  }


  interface FlowSequenceEndToken extends Token {}
  class FlowSequenceEndToken extends Token {
    constructor(startMark: Mark, endMark: Mark);
    get tokenId(): ID;
  }


  interface FlowSequenceStartToken extends Token {}
  class FlowSequenceStartToken extends Token {
    constructor(startMark: Mark, endMark: Mark);
    get tokenId(): ID;
  }


  interface KeyToken extends Token {}
  class KeyToken extends Token {
    constructor(startMark: Mark, endMark: Mark);
    get tokenId(): ID;
  }


  interface ScalarToken extends Token {}
  class ScalarToken extends Token {
    constructor(value: string, startMark: Mark, endMark: Mark, plain: boolean);

    constructor(value: string, plain: boolean, startMark: Mark, endMark: Mark, style: ScalarStyle);
    get plain(): boolean;
    get style(): ScalarStyle;
    get tokenId(): ID;
    get value(): string;
  }


  interface StreamEndToken extends Token {}
  class StreamEndToken extends Token {
    constructor(startMark: Mark, endMark: Mark);
    get tokenId(): ID;
  }


  interface StreamStartToken extends Token {}
  class StreamStartToken extends Token {
    constructor(startMark: Mark, endMark: Mark);
    get tokenId(): ID;
  }


  interface TagToken extends Token {}
  class TagToken extends Token {
    constructor(value: TagTuple, startMark: Mark, endMark: Mark);
    get tokenId(): ID;
    get value(): TagTuple;
  }


  class TagTuple {
    constructor(handle: string, suffix: string);
    get handle(): string;
    get suffix(): string;
  }


  class Token {
    constructor(startMark: Mark, endMark: Mark);
    get endMark(): Mark;
    get startMark(): Mark;
    get tokenId(): ID;
  }


  interface ValueToken extends Token {}
  class ValueToken extends Token {
    constructor(startMark: Mark, endMark: Mark);
    get tokenId(): ID;
  }


  interface WhitespaceToken extends Token {}
  class WhitespaceToken extends Token {
    constructor(startMark: Mark, endMark: Mark);
    get tokenId(): ID;
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.tokens.Token' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ID extends Enum<ID> {}
  class ID extends Enum<ID> {
    static readonly Alias: ID;
    static readonly Anchor: ID;
    static readonly BlockEnd: ID;
    static readonly BlockEntry: ID;
    static readonly BlockMappingStart: ID;
    static readonly BlockSequenceStart: ID;
    static readonly Directive: ID;
    static readonly DocumentEnd: ID;
    static readonly DocumentStart: ID;
    static readonly FlowEntry: ID;
    static readonly FlowMappingEnd: ID;
    static readonly FlowMappingStart: ID;
    static readonly FlowSequenceEnd: ID;
    static readonly FlowSequenceStart: ID;
    static readonly Key: ID;
    static readonly Scalar: ID;
    static readonly StreamEnd: ID;
    static readonly StreamStart: ID;
    static readonly Tag: ID;
    static readonly Value: ID;
    static readonly Whitespace: ID;
    static readonly Comment: ID;
    static readonly Error: ID;
    toString(): string;
    static valueOf(name: string): ID;
    static values(): ID[];
  }

}

declare module 'me.shedaniel.cloth.clothconfig.shadowed.org.yaml.snakeyaml.util' {
  import { List } from 'java.util';
  import { ByteBuffer } from 'java.nio';

  class ArrayStack<T = any> {
    constructor(initSize: number);
    clear(): void;
    isEmpty(): boolean;
    pop(): T;
    push(obj: T): void;
  }


  class ArrayUtils {
    static toUnmodifiableCompositeList<E>(array1: E[], array2: E[]): E[];
    static toUnmodifiableList<E>(elements: E[]): E[];
  }


  class PlatformFeatureDetector {
    isRunningOnAndroid(): boolean;
  }


  class UriEncoder {
    static decode(buff: ByteBuffer): string;
    static decode(buff: string): string;
    static encode(uri: string): string;
  }

}

declare module 'me.shedaniel.clothconfig' {
  class ClothConfigForge {
    constructor();
  }


  class ClothConfigForgeDemo {
    static registerModsPage(): void;
  }

}

declare module 'me.shedaniel.clothconfig2.api' {
  import { ElementEntry } from 'me.shedaniel.clothconfig2.gui.widget.DynamicElementListWidget';
  import { List, Iterator, Optional } from 'java.util';
  import { Component, FormattedText, TextColor } from 'net.minecraft.network.chat';
  import { Iterable, Runnable, Integer, Long, Float, Double, Class, Enum, Boolean } from 'java.lang';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Supplier, Consumer, Function } from 'java.util.function';
  import { AbstractConfigScreen } from 'me.shedaniel.clothconfig2.gui';
  import { Rectangle, Color, Point } from 'me.shedaniel.math';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ConfigEntryBuilderImpl, EasingMethod } from 'me.shedaniel.clothconfig2.impl';
  import { IntListBuilder, LongListBuilder, FloatListBuilder, DoubleListBuilder, StringListBuilder, SubCategoryBuilder, BooleanToggleBuilder, StringFieldBuilder, ColorFieldBuilder, TextFieldBuilder, TextDescriptionBuilder, EnumSelectorBuilder, SelectorBuilder, IntFieldBuilder, LongFieldBuilder, FloatFieldBuilder, DoubleFieldBuilder, IntSliderBuilder, LongSliderBuilder, KeyCodeBuilder, DropdownMenuBuilder } from 'me.shedaniel.clothconfig2.impl.builders';
  import { Key, Type } from 'InputConstants';
  import { KeyMapping } from 'net.minecraft.client';
  import { SelectionTopCellElement, SelectionCellCreator } from 'me.shedaniel.clothconfig2.gui.entries.DropdownBoxEntry';
  import { FormattedCharSequence } from 'net.minecraft.util';

  interface AbstractConfigEntry<T = any> extends ReferenceProvider<T>, ValueHolder<T>, ElementEntry<AbstractConfigEntry> {}
  class AbstractConfigEntry<T = any> extends ReferenceProvider<T> {
    addTooltip(tooltip: Tooltip): void;
    appendSearchTags(tags: Iterable<string>): void;
    get configError(): Optional<Component>;
    get configScreen(): AbstractConfigScreen;
    get defaultValue(): Optional<T>;
    get displayedFieldName(): Component;
    get error(): Optional<Component>;
    get fieldName(): Component;
    get initialReferenceOffset(): number;
    get itemHeight(): number;
    get referenceProviderEntries(): ReferenceProvider<any>[];
    get searchTags(): Iterator<string>;
    isEdited(): boolean;
    isRequiresRestart(): boolean;
    lateRender(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    provideReferenceEntry(): AbstractConfigEntry<T>;
    requestReferenceRebuilding(): void;
    save(): void;
    set referenceProviderEntries(referencableEntries: ReferenceProvider<any>[]);
    setErrorSupplier(errorSupplier: Supplier<Optional<Component>>): void;
    setRequiresRestart(var1: boolean): void;
    setScreen(screen: AbstractConfigScreen): void;
    updateSelected(isSelected: boolean): void;
  }


  interface AbstractConfigListEntry<T = any> extends AbstractConfigEntry<T> {}
  class AbstractConfigListEntry<T = any> extends AbstractConfigEntry<T> {
    constructor(fieldName: Component, requiresRestart: boolean);
    get fieldName(): Component;
    get preferredTextColor(): number;
    getEntryArea(x: number, y: number, entryWidth: number, entryHeight: number): Rectangle;
    isEditable(): boolean;
    isMouseInside(mouseX: number, mouseY: number, x: number, y: number, entryWidth: number, entryHeight: number): boolean;
    isRequiresRestart(): boolean;
    render(graphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, isHovered: boolean, delta: number): void;
    setEditable(editable: boolean): void;
    setRequiresRestart(requiresRestart: boolean): void;
  }


  class ConfigBuilder {
    alwaysShowTabs(): ConfigBuilder;
    build(): Screen;
    static create(): ConfigBuilder;
    doesConfirmSave(): boolean;
    doesProcessErrors(): boolean;
    entryBuilder(): ConfigEntryBuilder;
    get afterInitConsumer(): Consumer<Screen>;
    get defaultBackgroundTexture(): ResourceLocation;
    get parentScreen(): Screen;
    get savingRunnable(): Runnable;
    get title(): Component;
    getEntryBuilder(): ConfigEntryBuilderImpl;
    getOrCreateCategory(var1: Component): ConfigCategory;
    hasCategory(var1: Component): boolean;
    hasTransparentBackground(): boolean;
    isAlwaysShowTabs(): boolean;
    isEditable(): boolean;
    isListSmoothScrolling(): boolean;
    isTabsSmoothScrolling(): boolean;
    removeCategory(var1: Component): ConfigBuilder;
    removeCategoryIfExists(var1: Component): ConfigBuilder;
    set afterInitConsumer(var1: Consumer<Screen>);
    set defaultBackgroundTexture(var1: ResourceLocation);
    set parentScreen(var1: Screen);
    set savingRunnable(var1: Runnable);
    set title(var1: Component);
    setAlwaysShowTabs(var1: boolean): ConfigBuilder;
    setDoesConfirmSave(var1: boolean): ConfigBuilder;
    setDoesProcessErrors(processErrors: boolean): ConfigBuilder;
    setEditable(var1: boolean): ConfigBuilder;
    setFallbackCategory(var1: ConfigCategory): ConfigBuilder;
    setGlobalized(var1: boolean): void;
    setGlobalizedExpanded(var1: boolean): void;
    setShouldListSmoothScroll(var1: boolean): ConfigBuilder;
    setShouldTabsSmoothScroll(var1: boolean): ConfigBuilder;
    setTransparentBackground(var1: boolean): ConfigBuilder;
    solidBackground(): ConfigBuilder;
    transparentBackground(): ConfigBuilder;
  }


  class ConfigCategory {
    addEntry(var1: AbstractConfigListEntry): ConfigCategory;
    get background(): ResourceLocation;
    get categoryKey(): Component;
    get description(): Supplier<Optional<FormattedText[]>>;
    get entries(): any[];
    removeCategory(): void;
    set background(var1: ResourceLocation);
    set description(var1: Supplier<Optional<FormattedText[]>>);
    setCategoryBackground(var1: ResourceLocation): ConfigCategory;
    setDescription(description: FormattedText[]): void;
  }


  class ConfigEntryBuilder {
    static create(): ConfigEntryBuilder;
    fillKeybindingField(fieldNameKey: Component, value: KeyMapping): KeyCodeBuilder;
    get resetButtonKey(): Component;
    set resetButtonKey(var1: Component);
    startAlphaColorField(fieldNameKey: Component, value: number): ColorFieldBuilder;
    startAlphaColorField(fieldNameKey: Component, color: Color): ColorFieldBuilder;
    startBooleanToggle(var1: Component, var2: boolean): BooleanToggleBuilder;
    startColorField(var1: Component, var2: number): ColorFieldBuilder;
    startColorField(fieldNameKey: Component, color: TextColor): ColorFieldBuilder;
    startColorField(fieldNameKey: Component, color: Color): ColorFieldBuilder;
    startDoubleField(var1: Component, var2: number): DoubleFieldBuilder;
    startDoubleList(var1: Component, var2: number[]): DoubleListBuilder;
    startDropdownMenu<T>(var1: Component, var2: SelectionTopCellElement<T>, var3: SelectionCellCreator<T>): DropdownMenuBuilder<T>;
    startDropdownMenu<T>(fieldNameKey: Component, topCellElement: SelectionTopCellElement<T>): DropdownMenuBuilder<T>;
    startDropdownMenu<T>(fieldNameKey: Component, value: T, toObjectFunction: Function<string, T>, cellCreator: SelectionCellCreator<T>): DropdownMenuBuilder<T>;
    startDropdownMenu<T>(fieldNameKey: Component, value: T, toObjectFunction: Function<string, T>, toTextFunction: Function<T, Component>, cellCreator: SelectionCellCreator<T>): DropdownMenuBuilder<T>;
    startDropdownMenu<T>(fieldNameKey: Component, value: T, toObjectFunction: Function<string, T>): DropdownMenuBuilder<T>;
    startDropdownMenu<T>(fieldNameKey: Component, value: T, toObjectFunction: Function<string, T>, toTextFunction: Function<T, Component>): DropdownMenuBuilder<T>;
    startEnumSelector<T extends Enum<any>>(var1: Component, var2: Class<T>, var3: T): EnumSelectorBuilder<T>;
    startFloatField(var1: Component, var2: number): FloatFieldBuilder;
    startFloatList(var1: Component, var2: number[]): FloatListBuilder;
    startIntField(var1: Component, var2: number): IntFieldBuilder;
    startIntList(var1: Component, var2: number[]): IntListBuilder;
    startIntSlider(var1: Component, var2: number, var3: number, var4: number): IntSliderBuilder;
    startKeyCodeField(fieldNameKey: Component, value: Key): KeyCodeBuilder;
    startLongField(var1: Component, var2: number): LongFieldBuilder;
    startLongList(var1: Component, var2: Long[]): LongListBuilder;
    startLongSlider(var1: Component, var2: number, var4: number, var6: number): LongSliderBuilder;
    startModifierKeyCodeField(var1: Component, var2: ModifierKeyCode): KeyCodeBuilder;
    startSelector<T>(var1: Component, var2: T[], var3: T): SelectorBuilder<T>;
    startStrField(var1: Component, var2: string): StringFieldBuilder;
    startStrList(var1: Component, var2: string[]): StringListBuilder;
    startStringDropdownMenu(fieldNameKey: Component, value: string, cellCreator: SelectionCellCreator<string>): DropdownMenuBuilder<string>;
    startStringDropdownMenu(fieldNameKey: Component, value: string, toTextFunction: Function<string, Component>, cellCreator: SelectionCellCreator<string>): DropdownMenuBuilder<string>;
    startStringDropdownMenu(fieldNameKey: Component, value: string): DropdownMenuBuilder<string>;
    startStringDropdownMenu(fieldNameKey: Component, value: string, toTextFunction: Function<string, Component>): DropdownMenuBuilder<string>;
    startSubCategory(var1: Component): SubCategoryBuilder;
    startSubCategory(var1: Component, var2: AbstractConfigListEntry[]): SubCategoryBuilder;
    startTextDescription(var1: Component): TextDescriptionBuilder;
    startTextField(var1: Component, var2: string): TextFieldBuilder;
  }


  class ConfigScreen {
    addTooltip(var1: Tooltip): void;
    get backgroundLocation(): ResourceLocation;
    isEdited(): boolean;
    isRequiresRestart(): boolean;
    matchesSearch(var1: Iterator<string>): boolean;
    saveAll(var1: boolean): void;
    setAfterInitConsumer(var1: Consumer<Screen>): void;
    setSavingRunnable(var1: Runnable): void;
  }


  class DisableableWidget {
    get requirement(): Requirement;
    isEnabled(): boolean;
    set requirement(var1: Requirement);
  }


  class Expandable {
    isExpanded(): boolean;
    setExpanded(var1: boolean): void;
  }


  class HideableWidget {
    get displayRequirement(): Requirement;
    isDisplayed(): boolean;
    set displayRequirement(var1: Requirement);
  }


  interface LazyResettable<T = any> extends Supplier<T> {}
  class LazyResettable<T = any> extends Supplier<T> {
    constructor(supplier: Supplier<T>);
    equals(o: any): boolean;
    get (): T;
    hashCode(): number;
    reset(): void;
  }


  class Modifier {
    static current(): Modifier;
    equals(other: any): boolean;
    get value(): number;
    hasAlt(): boolean;
    hasControl(): boolean;
    hasShift(): boolean;
    hashCode(): number;
    isEmpty(): boolean;
    matchesCurrent(): boolean;
    static none(): Modifier;
    static of(alt: boolean, control: boolean, shift: boolean): Modifier;
    static of(value: number): Modifier;
  }


  class ModifierKeyCode {
    clearModifier(): ModifierKeyCode;
    copy(): ModifierKeyCode;
    static copyOf(code: ModifierKeyCode): ModifierKeyCode;
    get keyCode(): Key;
    get localizedName(): Component;
    get modifier(): Modifier;
    get type(): Type;
    isUnknown(): boolean;
    matchesCurrentKey(): boolean;
    matchesCurrentMouse(): boolean;
    matchesKey(keyCode: number, scanCode: number): boolean;
    matchesMouse(button: number): boolean;
    static of(keyCode: Key, modifier: Modifier): ModifierKeyCode;
    set keyCode(var1: Key);
    set modifier(var1: Modifier);
    setKeyCodeAndModifier(keyCode: Key, modifier: Modifier): ModifierKeyCode;
    toString(): string;
    static unknown(): ModifierKeyCode;
  }


  interface QueuedTooltip extends Tooltip {}
  class QueuedTooltip extends Tooltip {
    static create(location: Point, text: Component[]): QueuedTooltip;
    static create(location: Point, ...text: Component[]): QueuedTooltip;
    static create(location: Point, ...text: FormattedCharSequence[]): QueuedTooltip;
    static create(location: Point, ...text: FormattedText[]): QueuedTooltip;
    get point(): Point;
    get text(): FormattedCharSequence[];
  }


  interface ReferenceBuildingConfigScreen extends ConfigScreen {}
  class ReferenceBuildingConfigScreen extends ConfigScreen {
    requestReferenceRebuilding(): void;
  }


  class ReferenceProvider<T = any> {
    provideReferenceEntry(): AbstractConfigEntry<T>;
  }


  class Requirement {
    static all(...requirements: Requirement[]): Requirement;
    static any(...requirements: Requirement[]): Requirement;
    check(): boolean;
    static isFalse(dependency: ValueHolder<boolean>): Requirement;
    static isTrue(dependency: ValueHolder<boolean>): Requirement;
    static isValue<T>(dependency: ValueHolder<T>, firstValue: T, ...otherValues: T[]): Requirement;
    static matches<T>(firstDependency: ValueHolder<T>, secondDependency: ValueHolder<T>): Requirement;
    static none(...requirements: Requirement[]): Requirement;
    static not(requirement: Requirement): Requirement;
    static one(...requirements: Requirement[]): Requirement;
  }


  class ScissorsHandler {
    static readonly INSTANCE: ScissorsHandler;
    applyScissors(): void;
    clearScissors(): void;
    get scissorsAreas(): Rectangle[];
    removeLastScissor(): void;
    scissor(var1: Rectangle): void;
  }


  class ScissorsScreen {
    handleScissor(var1: Rectangle): Rectangle;
  }


  class ScrollingContainer {
    scrollAmount: number;
    scrollTarget: number;
    start: number;
    duration: number;
    draggingScrollBar: boolean;
    clamp(v: number): number;
    clamp(v: number, clampExtension: number): number;
    static clampExtension(value: number, maxScroll: number): number;
    static clampExtension(v: number, maxScroll: number, clampExtension: number): number;
    static ease(start: number, end: number, amount: number, easingMethod: EasingMethod): number;
    get bounds(): Rectangle;
    get maxScroll(): number;
    get maxScrollHeight(): number;
    get scissorBounds(): Rectangle;
    get scrollBarX(): number;
    static handleScrollingPosition(target: number[], scroll: number, maxScroll: number, delta: number, start: number, duration: number): number;
    static handleScrollingPosition(target: number[], scroll: number, maxScroll: number, delta: number, start: number, duration: number, bounceBackMultiplier: number, easingMethod: EasingMethod): number;
    hasScrollBar(): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, dx: number, dy: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, dx: number, dy: number, snapToRows: boolean, rowSize: number): boolean;
    offset(value: number, animated: boolean): void;
    renderScrollBar(graphics: GuiGraphics): void;
    renderScrollBar(graphics: GuiGraphics, background: number, alpha: number, scrollBarAlphaOffset: number): void;
    scrollTo(value: number, animated: boolean): void;
    scrollTo(value: number, animated: boolean, duration: number): void;
    updateDraggingState(mouseX: number, mouseY: number, button: number): boolean;
    updatePosition(delta: number): void;
  }


  interface TabbedConfigScreen extends ConfigScreen {}
  class TabbedConfigScreen extends ConfigScreen {
    get selectedCategory(): Component;
    registerCategoryBackground(var1: string, var2: ResourceLocation): void;
    registerCategoryTransparency(var1: string, var2: boolean): void;
  }


  class TickableWidget {
    tick(): void;
  }


  class Tooltip {
    get point(): Point;
    get text(): FormattedCharSequence[];
    get x(): number;
    get y(): number;
    static of(location: Point, ...text: Component[]): Tooltip;
    static of(location: Point, ...text: FormattedText[]): Tooltip;
    static of(location: Point, ...text: FormattedCharSequence[]): Tooltip;
  }


  class ValueHolder<T = any> {
    get value(): T;
  }

}

declare module 'me.shedaniel.clothconfig2.api.animator' {
  import { Number, Double, Float, Integer, Long, Boolean } from 'java.lang';
  import { Supplier, Function } from 'java.util.function';
  import { Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, Arg7, Arg8, Arg9, Arg10, Arg11, Arg12, Arg13, Arg14, Arg15, Arg16, Arg17, Arg18, Arg19, Arg20 } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs';
  import { Op, Up } from 'RecordValueAnimatorArgs.Arg1';
  import { Op as recordvalueanimatorargs_arg2_Op, Up as recordvalueanimatorargs_arg2_Up } from 'RecordValueAnimatorArgs.Arg2';
  import { Op as recordvalueanimatorargs_arg3_Op, Up as recordvalueanimatorargs_arg3_Up } from 'RecordValueAnimatorArgs.Arg3';
  import { Op as recordvalueanimatorargs_arg4_Op, Up as recordvalueanimatorargs_arg4_Up } from 'RecordValueAnimatorArgs.Arg4';
  import { Op as recordvalueanimatorargs_arg5_Op, Up as recordvalueanimatorargs_arg5_Up } from 'RecordValueAnimatorArgs.Arg5';
  import { Op as recordvalueanimatorargs_arg6_Op, Up as recordvalueanimatorargs_arg6_Up } from 'RecordValueAnimatorArgs.Arg6';
  import { Op as recordvalueanimatorargs_arg7_Op, Up as recordvalueanimatorargs_arg7_Up } from 'RecordValueAnimatorArgs.Arg7';
  import { Op as recordvalueanimatorargs_arg8_Op, Up as recordvalueanimatorargs_arg8_Up } from 'RecordValueAnimatorArgs.Arg8';
  import { Op as recordvalueanimatorargs_arg9_Op, Up as recordvalueanimatorargs_arg9_Up } from 'RecordValueAnimatorArgs.Arg9';
  import { Op as recordvalueanimatorargs_arg10_Op, Up as recordvalueanimatorargs_arg10_Up } from 'RecordValueAnimatorArgs.Arg10';
  import { Op as recordvalueanimatorargs_arg11_Op, Up as recordvalueanimatorargs_arg11_Up } from 'RecordValueAnimatorArgs.Arg11';
  import { Op as recordvalueanimatorargs_arg12_Op, Up as recordvalueanimatorargs_arg12_Up } from 'RecordValueAnimatorArgs.Arg12';
  import { Op as recordvalueanimatorargs_arg13_Op, Up as recordvalueanimatorargs_arg13_Up } from 'RecordValueAnimatorArgs.Arg13';
  import { Op as recordvalueanimatorargs_arg14_Op, Up as recordvalueanimatorargs_arg14_Up } from 'RecordValueAnimatorArgs.Arg14';
  import { Op as recordvalueanimatorargs_arg15_Op, Up as recordvalueanimatorargs_arg15_Up } from 'RecordValueAnimatorArgs.Arg15';
  import { Op as recordvalueanimatorargs_arg16_Op, Up as recordvalueanimatorargs_arg16_Up } from 'RecordValueAnimatorArgs.Arg16';
  import { Op as recordvalueanimatorargs_arg17_Op, Up as recordvalueanimatorargs_arg17_Up } from 'RecordValueAnimatorArgs.Arg17';
  import { Op as recordvalueanimatorargs_arg18_Op, Up as recordvalueanimatorargs_arg18_Up } from 'RecordValueAnimatorArgs.Arg18';
  import { Op as recordvalueanimatorargs_arg19_Op, Up as recordvalueanimatorargs_arg19_Up } from 'RecordValueAnimatorArgs.Arg19';
  import { Op as recordvalueanimatorargs_arg20_Op, Up as recordvalueanimatorargs_arg20_Up } from 'RecordValueAnimatorArgs.Arg20';
  import { Color, Rectangle, Dimension, Point, FloatingRectangle, FloatingDimension, FloatingPoint } from 'me.shedaniel.math';

  interface ConstantValueProvider<T = any> extends ValueProvider<T> {}
  class ConstantValueProvider<T = any> extends ValueProvider<T> {
    constructor(value: T);
    completeImmediately(): void;
    target(): T;
    update(delta: number): void;
    value(): T;
  }


  interface ConventionValueAnimator<T = any> extends ValueAnimator<T> {}
  class ConventionValueAnimator<T = any> extends ValueAnimator<T> {
    setTarget(target: T): ValueAnimator<T>;
    setTo(value: T, duration: number): ValueAnimator<T>;
    target(): T;
    update(delta: number): void;
    value(): T;
  }


  interface MappingProgressValueAnimator<R = any> extends ProgressValueAnimator<R> {}
  class MappingProgressValueAnimator<R = any> extends ProgressValueAnimator<R> {
    progress(): number;
    setTarget(target: R): ProgressValueAnimator<R>;
    setTo(value: R, duration: number): ProgressValueAnimator<R>;
    target(): R;
    update(delta: number): void;
    value(): R;
  }


  interface MappingValueAnimator<T = any, R = any> extends ValueAnimator<R> {}
  class MappingValueAnimator<T = any, R = any> extends ValueAnimator<R> {
    setTarget(target: R): ValueAnimator<R>;
    setTo(value: R, duration: number): ValueAnimator<R>;
    target(): R;
    update(delta: number): void;
    value(): R;
  }


  interface NumberAnimator<T extends Number = any> extends ValueAnimator<T>, Number {}
  class NumberAnimator<T extends Number = any> extends ValueAnimator<T> {
    asDouble(): NumberAnimator<number>;
    asFloat(): NumberAnimator<number>;
    asInt(): NumberAnimator<number>;
    asLong(): NumberAnimator<Long>;
    setAs(value: T): NumberAnimator<T>;
    setAs(value: number): NumberAnimator<T>;
    setAs(value: number): NumberAnimator<T>;
    setAs(value: number): NumberAnimator<T>;
    setAs(value: number): NumberAnimator<T>;
    setAsNumber(value: Number): NumberAnimator<T>;
    setTarget(target: T): ValueAnimator<T>;
    setTarget(value: number): NumberAnimator<T>;
    setTarget(value: number): NumberAnimator<T>;
    setTarget(value: number): NumberAnimator<T>;
    setTarget(value: number): NumberAnimator<T>;
    setTargetNumber(var1: Number): NumberAnimator<T>;
    setTargetNumber(value: Number): NumberAnimator<T>;
    setTo(value: T, duration: number): NumberAnimator<T>;
    setTo(value: number, duration: number): NumberAnimator<T>;
    setTo(value: number, duration: number): NumberAnimator<T>;
    setTo(value: number, duration: number): NumberAnimator<T>;
    setTo(value: number, duration: number): NumberAnimator<T>;
    setToNumber(var1: Number, var2: number): NumberAnimator<T>;
    setToNumber(value: Number, duration: number): NumberAnimator<T>;
    withConvention(convention: Supplier<T>, duration: number): NumberAnimator<T>;
  }


  interface NumberAnimatorWrapped<T extends Number = any, R extends Number = any> extends NumberAnimator<T> {}
  class NumberAnimatorWrapped<T extends Number = any, R extends Number = any> extends NumberAnimator<T> {
    doubleValue(): number;
    floatValue(): number;
    intValue(): number;
    longValue(): number;
    setTargetNumber(value: Number): NumberAnimator<T>;
    setToNumber(value: Number, duration: number): NumberAnimator<T>;
    target(): T;
    update(delta: number): void;
    value(): T;
  }


  interface ProgressValueAnimator<T = any> extends ValueAnimator<T> {}
  class ProgressValueAnimator<T = any> extends ValueAnimator<T> {
    static mapProgress<R>(parent: NumberAnimator<any>, converter: Function<number, R>, backwardsConverter: Function<R, number>): ProgressValueAnimator<R>;
    progress(): number;
    setAs(value: T): ProgressValueAnimator<T>;
    setTarget(var1: T): ProgressValueAnimator<T>;
    setTo(var1: T, var2: number): ProgressValueAnimator<T>;
  }


  interface RecordValueAnimator<T = any, A extends Arg<T> = any> extends ValueAnimator<T> {}
  class RecordValueAnimator<T = any, A extends Arg<T> = any> extends ValueAnimator<T> {
    static of<A1, T>(a1: ValueAnimator<A1>, op: Op<A1, T>, up: Up<A1, T>): RecordValueAnimator<T, Arg1<A1, T>>;
    static of<A1, A2, T>(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, op: recordvalueanimatorargs_arg2_Op<A1, A2, T>, up: recordvalueanimatorargs_arg2_Up<A1, A2, T>): RecordValueAnimator<T, Arg2<A1, A2, T>>;
    static of<A1, A2, A3, T>(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, op: recordvalueanimatorargs_arg3_Op<A1, A2, A3, T>, up: recordvalueanimatorargs_arg3_Up<A1, A2, A3, T>): RecordValueAnimator<T, Arg3<A1, A2, A3, T>>;
    static of<A1, A2, A3, A4, T>(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, op: recordvalueanimatorargs_arg4_Op<A1, A2, A3, A4, T>, up: recordvalueanimatorargs_arg4_Up<A1, A2, A3, A4, T>): RecordValueAnimator<T, Arg4<A1, A2, A3, A4, T>>;
    static of<A1, A2, A3, A4, A5, T>(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, op: recordvalueanimatorargs_arg5_Op<A1, A2, A3, A4, A5, T>, up: recordvalueanimatorargs_arg5_Up<A1, A2, A3, A4, A5, T>): RecordValueAnimator<T, Arg5<A1, A2, A3, A4, A5, T>>;
    static of<A1, A2, A3, A4, A5, A6, T>(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, op: recordvalueanimatorargs_arg6_Op<A1, A2, A3, A4, A5, A6, T>, up: recordvalueanimatorargs_arg6_Up<A1, A2, A3, A4, A5, A6, T>): RecordValueAnimator<T, Arg6<A1, A2, A3, A4, A5, A6, T>>;
    static of<A1, A2, A3, A4, A5, A6, A7, T>(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, a7: ValueAnimator<A7>, op: recordvalueanimatorargs_arg7_Op<A1, A2, A3, A4, A5, A6, A7, T>, up: recordvalueanimatorargs_arg7_Up<A1, A2, A3, A4, A5, A6, A7, T>): RecordValueAnimator<T, Arg7<A1, A2, A3, A4, A5, A6, A7, T>>;
    static of<A1, A2, A3, A4, A5, A6, A7, A8, T>(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, a7: ValueAnimator<A7>, a8: ValueAnimator<A8>, op: recordvalueanimatorargs_arg8_Op<A1, A2, A3, A4, A5, A6, A7, A8, T>, up: recordvalueanimatorargs_arg8_Up<A1, A2, A3, A4, A5, A6, A7, A8, T>): RecordValueAnimator<T, Arg8<A1, A2, A3, A4, A5, A6, A7, A8, T>>;
    static of<A1, A2, A3, A4, A5, A6, A7, A8, A9, T>(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, a7: ValueAnimator<A7>, a8: ValueAnimator<A8>, a9: ValueAnimator<A9>, op: recordvalueanimatorargs_arg9_Op<A1, A2, A3, A4, A5, A6, A7, A8, A9, T>, up: recordvalueanimatorargs_arg9_Up<A1, A2, A3, A4, A5, A6, A7, A8, A9, T>): RecordValueAnimator<T, Arg9<A1, A2, A3, A4, A5, A6, A7, A8, A9, T>>;
    static of<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, T>(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, a7: ValueAnimator<A7>, a8: ValueAnimator<A8>, a9: ValueAnimator<A9>, a10: ValueAnimator<A10>, op: recordvalueanimatorargs_arg10_Op<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, T>, up: recordvalueanimatorargs_arg10_Up<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, T>): RecordValueAnimator<T, Arg10<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, T>>;
    static of<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, T>(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, a7: ValueAnimator<A7>, a8: ValueAnimator<A8>, a9: ValueAnimator<A9>, a10: ValueAnimator<A10>, a11: ValueAnimator<A11>, op: recordvalueanimatorargs_arg11_Op<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, T>, up: recordvalueanimatorargs_arg11_Up<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, T>): RecordValueAnimator<T, Arg11<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, T>>;
    static of<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, T>(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, a7: ValueAnimator<A7>, a8: ValueAnimator<A8>, a9: ValueAnimator<A9>, a10: ValueAnimator<A10>, a11: ValueAnimator<A11>, a12: ValueAnimator<A12>, op: recordvalueanimatorargs_arg12_Op<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, T>, up: recordvalueanimatorargs_arg12_Up<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, T>): RecordValueAnimator<T, Arg12<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, T>>;
    static of<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, T>(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, a7: ValueAnimator<A7>, a8: ValueAnimator<A8>, a9: ValueAnimator<A9>, a10: ValueAnimator<A10>, a11: ValueAnimator<A11>, a12: ValueAnimator<A12>, a13: ValueAnimator<A13>, op: recordvalueanimatorargs_arg13_Op<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, T>, up: recordvalueanimatorargs_arg13_Up<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, T>): RecordValueAnimator<T, Arg13<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, T>>;
    static of<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, T>(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, a7: ValueAnimator<A7>, a8: ValueAnimator<A8>, a9: ValueAnimator<A9>, a10: ValueAnimator<A10>, a11: ValueAnimator<A11>, a12: ValueAnimator<A12>, a13: ValueAnimator<A13>, a14: ValueAnimator<A14>, op: recordvalueanimatorargs_arg14_Op<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, T>, up: recordvalueanimatorargs_arg14_Up<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, T>): RecordValueAnimator<T, Arg14<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, T>>;
    static of<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, T>(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, a7: ValueAnimator<A7>, a8: ValueAnimator<A8>, a9: ValueAnimator<A9>, a10: ValueAnimator<A10>, a11: ValueAnimator<A11>, a12: ValueAnimator<A12>, a13: ValueAnimator<A13>, a14: ValueAnimator<A14>, a15: ValueAnimator<A15>, op: recordvalueanimatorargs_arg15_Op<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, T>, up: recordvalueanimatorargs_arg15_Up<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, T>): RecordValueAnimator<T, Arg15<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, T>>;
    static of<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, T>(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, a7: ValueAnimator<A7>, a8: ValueAnimator<A8>, a9: ValueAnimator<A9>, a10: ValueAnimator<A10>, a11: ValueAnimator<A11>, a12: ValueAnimator<A12>, a13: ValueAnimator<A13>, a14: ValueAnimator<A14>, a15: ValueAnimator<A15>, a16: ValueAnimator<A16>, op: recordvalueanimatorargs_arg16_Op<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, T>, up: recordvalueanimatorargs_arg16_Up<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, T>): RecordValueAnimator<T, Arg16<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, T>>;
    static of<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, T>(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, a7: ValueAnimator<A7>, a8: ValueAnimator<A8>, a9: ValueAnimator<A9>, a10: ValueAnimator<A10>, a11: ValueAnimator<A11>, a12: ValueAnimator<A12>, a13: ValueAnimator<A13>, a14: ValueAnimator<A14>, a15: ValueAnimator<A15>, a16: ValueAnimator<A16>, a17: ValueAnimator<A17>, op: recordvalueanimatorargs_arg17_Op<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, T>, up: recordvalueanimatorargs_arg17_Up<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, T>): RecordValueAnimator<T, Arg17<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, T>>;
    static of<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18, T>(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, a7: ValueAnimator<A7>, a8: ValueAnimator<A8>, a9: ValueAnimator<A9>, a10: ValueAnimator<A10>, a11: ValueAnimator<A11>, a12: ValueAnimator<A12>, a13: ValueAnimator<A13>, a14: ValueAnimator<A14>, a15: ValueAnimator<A15>, a16: ValueAnimator<A16>, a17: ValueAnimator<A17>, a18: ValueAnimator<A18>, op: recordvalueanimatorargs_arg18_Op<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18, T>, up: recordvalueanimatorargs_arg18_Up<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18, T>): RecordValueAnimator<T, Arg18<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18, T>>;
    static of<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18, A19, T>(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, a7: ValueAnimator<A7>, a8: ValueAnimator<A8>, a9: ValueAnimator<A9>, a10: ValueAnimator<A10>, a11: ValueAnimator<A11>, a12: ValueAnimator<A12>, a13: ValueAnimator<A13>, a14: ValueAnimator<A14>, a15: ValueAnimator<A15>, a16: ValueAnimator<A16>, a17: ValueAnimator<A17>, a18: ValueAnimator<A18>, a19: ValueAnimator<A19>, op: recordvalueanimatorargs_arg19_Op<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18, A19, T>, up: recordvalueanimatorargs_arg19_Up<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18, A19, T>): RecordValueAnimator<T, Arg19<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18, A19, T>>;
    static of<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18, A19, A20, T>(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, a7: ValueAnimator<A7>, a8: ValueAnimator<A8>, a9: ValueAnimator<A9>, a10: ValueAnimator<A10>, a11: ValueAnimator<A11>, a12: ValueAnimator<A12>, a13: ValueAnimator<A13>, a14: ValueAnimator<A14>, a15: ValueAnimator<A15>, a16: ValueAnimator<A16>, a17: ValueAnimator<A17>, a18: ValueAnimator<A18>, a19: ValueAnimator<A19>, a20: ValueAnimator<A20>, op: recordvalueanimatorargs_arg20_Op<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18, A19, A20, T>, up: recordvalueanimatorargs_arg20_Up<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18, A19, A20, T>): RecordValueAnimator<T, Arg20<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18, A19, A20, T>>;
    setTarget(target: T): ValueAnimator<T>;
    setTo(value: T, duration: number): ValueAnimator<T>;
    target(): T;
    update(delta: number): void;
    value(): T;
  }


  class RecordValueAnimatorArgs {
  }


  interface ValueAnimator<T = any> extends ValueProvider<T> {}
  class ValueAnimator<T = any> extends ValueProvider<T> {
    completeImmediately(): void;
    map<R>(converter: Function<T, R>, backwardsConverter: Function<R, T>): ValueAnimator<R>;
    static ofBoolean(): ProgressValueAnimator<boolean>;
    static ofBoolean(switchPoint: number): ProgressValueAnimator<boolean>;
    static ofBoolean(initialValue: boolean): ProgressValueAnimator<boolean>;
    static ofBoolean(switchPoint: number, initialValue: boolean): ProgressValueAnimator<boolean>;
    static ofColor(): ValueAnimator<Color>;
    static ofColor(initialValue: Color): ValueAnimator<Color>;
    static ofDimension(): ValueAnimator<Dimension>;
    static ofDimension(initialValue: Dimension): ValueAnimator<Dimension>;
    static ofDimension(initialValue: Point): ValueAnimator<Point>;
    static ofDouble(): NumberAnimator<number>;
    static ofDouble(initialValue: number): NumberAnimator<number>;
    static ofFloat(): NumberAnimator<number>;
    static ofFloat(initialValue: number): NumberAnimator<number>;
    static ofFloatingDimension(): ValueAnimator<FloatingDimension>;
    static ofFloatingDimension(initialValue: FloatingDimension): ValueAnimator<FloatingDimension>;
    static ofFloatingDimension(initialValue: FloatingPoint): ValueAnimator<FloatingPoint>;
    static ofFloatingPoint(): ValueAnimator<FloatingPoint>;
    static ofFloatingPoint(initialValue: FloatingPoint): ValueAnimator<FloatingPoint>;
    static ofFloatingRectangle(): ValueAnimator<FloatingRectangle>;
    static ofFloatingRectangle(initialValue: FloatingRectangle): ValueAnimator<FloatingRectangle>;
    static ofInt(): NumberAnimator<number>;
    static ofInt(initialValue: number): NumberAnimator<number>;
    static ofLong(): NumberAnimator<Long>;
    static ofLong(initialValue: number): NumberAnimator<Long>;
    static ofPoint(): ValueAnimator<Point>;
    static ofPoint(initialValue: Point): ValueAnimator<Point>;
    static ofRectangle(): ValueAnimator<Rectangle>;
    static ofRectangle(initialValue: Rectangle): ValueAnimator<Rectangle>;
    setAs(value: T): ValueAnimator<T>;
    setTarget(var1: T): ValueAnimator<T>;
    setTo(var1: T, var2: number): ValueAnimator<T>;
    static typicalTransitionTime(): number;
    withConvention(convention: Supplier<T>, duration: number): ValueAnimator<T>;
  }


  interface ValueAnimatorAsNumberAnimator<T extends Number = any> extends NumberAnimator<T> {}
  class ValueAnimatorAsNumberAnimator<T extends Number = any> extends NumberAnimator<T> {
    doubleValue(): number;
    floatValue(): number;
    intValue(): number;
    longValue(): number;
    target(): T;
    update(delta: number): void;
    value(): T;
  }


  class ValueProvider<T = any> {
    completeImmediately(): void;
    static constant<T>(value: T): ValueProvider<T>;
    target(): T;
    update(var1: number): void;
    value(): T;
  }

}

declare module 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimator' {
  import { List } from 'java.util';
  import { ValueAnimator } from 'me.shedaniel.clothconfig2.api.animator';

  class Arg<T = any> {
    dependencies(): ValueAnimator<any>[];
    set(var1: T, var2: number): void;
    setTarget(var1: T): void;
    target(): T;
    value(): T;
  }


  class Setter<T = any> {
    set(var1: T): void;
  }

}

declare module 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs' {
  import { Arg } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimator';
  import { ValueAnimator } from 'me.shedaniel.clothconfig2.api.animator';
  import { Op, Up } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg20';
  import { List } from 'java.util';
  import { Op as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg19_Op, Up as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg19_Up } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg19';
  import { Op as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg18_Op, Up as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg18_Up } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg18';
  import { Op as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg17_Op, Up as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg17_Up } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg17';
  import { Op as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg16_Op, Up as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg16_Up } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg16';
  import { Op as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg15_Op, Up as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg15_Up } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg15';
  import { Op as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg14_Op, Up as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg14_Up } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg14';
  import { Op as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg13_Op, Up as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg13_Up } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg13';
  import { Op as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg12_Op, Up as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg12_Up } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg12';
  import { Op as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg11_Op, Up as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg11_Up } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg11';
  import { Op as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg10_Op, Up as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg10_Up } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg10';
  import { Op as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg9_Op, Up as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg9_Up } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg9';
  import { Op as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg8_Op, Up as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg8_Up } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg8';
  import { Op as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg7_Op, Up as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg7_Up } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg7';
  import { Op as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg6_Op, Up as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg6_Up } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg6';
  import { Op as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg5_Op, Up as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg5_Up } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg5';
  import { Op as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg4_Op, Up as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg4_Up } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg4';
  import { Op as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg3_Op, Up as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg3_Up } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg3';
  import { Op as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg2_Op, Up as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg2_Up } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg2';
  import { Op as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg1_Op, Up as me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg1_Up } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg1';

  interface Arg20<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, A14 = any, A15 = any, A16 = any, A17 = any, A18 = any, A19 = any, A20 = any, T = any> extends Arg<T> {}
  class Arg20<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, A14 = any, A15 = any, A16 = any, A17 = any, A18 = any, A19 = any, A20 = any, T = any> extends Arg<T> {
    constructor(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, a7: ValueAnimator<A7>, a8: ValueAnimator<A8>, a9: ValueAnimator<A9>, a10: ValueAnimator<A10>, a11: ValueAnimator<A11>, a12: ValueAnimator<A12>, a13: ValueAnimator<A13>, a14: ValueAnimator<A14>, a15: ValueAnimator<A15>, a16: ValueAnimator<A16>, a17: ValueAnimator<A17>, a18: ValueAnimator<A18>, a19: ValueAnimator<A19>, a20: ValueAnimator<A20>, op: Op<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18, A19, A20, T>, up: Up<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18, A19, A20, T>);
    dependencies(): ValueAnimator<any>[];
    set(value: T, duration: number): void;
    setTarget(value: T): void;
    target(): T;
    value(): T;
  }


  interface Arg19<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, A14 = any, A15 = any, A16 = any, A17 = any, A18 = any, A19 = any, T = any> extends Arg<T> {}
  class Arg19<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, A14 = any, A15 = any, A16 = any, A17 = any, A18 = any, A19 = any, T = any> extends Arg<T> {
    constructor(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, a7: ValueAnimator<A7>, a8: ValueAnimator<A8>, a9: ValueAnimator<A9>, a10: ValueAnimator<A10>, a11: ValueAnimator<A11>, a12: ValueAnimator<A12>, a13: ValueAnimator<A13>, a14: ValueAnimator<A14>, a15: ValueAnimator<A15>, a16: ValueAnimator<A16>, a17: ValueAnimator<A17>, a18: ValueAnimator<A18>, a19: ValueAnimator<A19>, op: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg19_Op<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18, A19, T>, up: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg19_Up<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18, A19, T>);
    dependencies(): ValueAnimator<any>[];
    set(value: T, duration: number): void;
    setTarget(value: T): void;
    target(): T;
    value(): T;
  }


  interface Arg18<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, A14 = any, A15 = any, A16 = any, A17 = any, A18 = any, T = any> extends Arg<T> {}
  class Arg18<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, A14 = any, A15 = any, A16 = any, A17 = any, A18 = any, T = any> extends Arg<T> {
    constructor(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, a7: ValueAnimator<A7>, a8: ValueAnimator<A8>, a9: ValueAnimator<A9>, a10: ValueAnimator<A10>, a11: ValueAnimator<A11>, a12: ValueAnimator<A12>, a13: ValueAnimator<A13>, a14: ValueAnimator<A14>, a15: ValueAnimator<A15>, a16: ValueAnimator<A16>, a17: ValueAnimator<A17>, a18: ValueAnimator<A18>, op: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg18_Op<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18, T>, up: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg18_Up<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18, T>);
    dependencies(): ValueAnimator<any>[];
    set(value: T, duration: number): void;
    setTarget(value: T): void;
    target(): T;
    value(): T;
  }


  interface Arg17<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, A14 = any, A15 = any, A16 = any, A17 = any, T = any> extends Arg<T> {}
  class Arg17<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, A14 = any, A15 = any, A16 = any, A17 = any, T = any> extends Arg<T> {
    constructor(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, a7: ValueAnimator<A7>, a8: ValueAnimator<A8>, a9: ValueAnimator<A9>, a10: ValueAnimator<A10>, a11: ValueAnimator<A11>, a12: ValueAnimator<A12>, a13: ValueAnimator<A13>, a14: ValueAnimator<A14>, a15: ValueAnimator<A15>, a16: ValueAnimator<A16>, a17: ValueAnimator<A17>, op: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg17_Op<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, T>, up: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg17_Up<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, T>);
    dependencies(): ValueAnimator<any>[];
    set(value: T, duration: number): void;
    setTarget(value: T): void;
    target(): T;
    value(): T;
  }


  interface Arg16<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, A14 = any, A15 = any, A16 = any, T = any> extends Arg<T> {}
  class Arg16<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, A14 = any, A15 = any, A16 = any, T = any> extends Arg<T> {
    constructor(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, a7: ValueAnimator<A7>, a8: ValueAnimator<A8>, a9: ValueAnimator<A9>, a10: ValueAnimator<A10>, a11: ValueAnimator<A11>, a12: ValueAnimator<A12>, a13: ValueAnimator<A13>, a14: ValueAnimator<A14>, a15: ValueAnimator<A15>, a16: ValueAnimator<A16>, op: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg16_Op<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, T>, up: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg16_Up<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, T>);
    dependencies(): ValueAnimator<any>[];
    set(value: T, duration: number): void;
    setTarget(value: T): void;
    target(): T;
    value(): T;
  }


  interface Arg15<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, A14 = any, A15 = any, T = any> extends Arg<T> {}
  class Arg15<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, A14 = any, A15 = any, T = any> extends Arg<T> {
    constructor(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, a7: ValueAnimator<A7>, a8: ValueAnimator<A8>, a9: ValueAnimator<A9>, a10: ValueAnimator<A10>, a11: ValueAnimator<A11>, a12: ValueAnimator<A12>, a13: ValueAnimator<A13>, a14: ValueAnimator<A14>, a15: ValueAnimator<A15>, op: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg15_Op<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, T>, up: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg15_Up<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, T>);
    dependencies(): ValueAnimator<any>[];
    set(value: T, duration: number): void;
    setTarget(value: T): void;
    target(): T;
    value(): T;
  }


  interface Arg14<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, A14 = any, T = any> extends Arg<T> {}
  class Arg14<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, A14 = any, T = any> extends Arg<T> {
    constructor(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, a7: ValueAnimator<A7>, a8: ValueAnimator<A8>, a9: ValueAnimator<A9>, a10: ValueAnimator<A10>, a11: ValueAnimator<A11>, a12: ValueAnimator<A12>, a13: ValueAnimator<A13>, a14: ValueAnimator<A14>, op: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg14_Op<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, T>, up: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg14_Up<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, T>);
    dependencies(): ValueAnimator<any>[];
    set(value: T, duration: number): void;
    setTarget(value: T): void;
    target(): T;
    value(): T;
  }


  interface Arg13<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, T = any> extends Arg<T> {}
  class Arg13<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, T = any> extends Arg<T> {
    constructor(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, a7: ValueAnimator<A7>, a8: ValueAnimator<A8>, a9: ValueAnimator<A9>, a10: ValueAnimator<A10>, a11: ValueAnimator<A11>, a12: ValueAnimator<A12>, a13: ValueAnimator<A13>, op: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg13_Op<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, T>, up: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg13_Up<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, T>);
    dependencies(): ValueAnimator<any>[];
    set(value: T, duration: number): void;
    setTarget(value: T): void;
    target(): T;
    value(): T;
  }


  interface Arg12<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, T = any> extends Arg<T> {}
  class Arg12<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, T = any> extends Arg<T> {
    constructor(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, a7: ValueAnimator<A7>, a8: ValueAnimator<A8>, a9: ValueAnimator<A9>, a10: ValueAnimator<A10>, a11: ValueAnimator<A11>, a12: ValueAnimator<A12>, op: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg12_Op<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, T>, up: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg12_Up<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, T>);
    dependencies(): ValueAnimator<any>[];
    set(value: T, duration: number): void;
    setTarget(value: T): void;
    target(): T;
    value(): T;
  }


  interface Arg11<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, T = any> extends Arg<T> {}
  class Arg11<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, T = any> extends Arg<T> {
    constructor(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, a7: ValueAnimator<A7>, a8: ValueAnimator<A8>, a9: ValueAnimator<A9>, a10: ValueAnimator<A10>, a11: ValueAnimator<A11>, op: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg11_Op<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, T>, up: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg11_Up<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, T>);
    dependencies(): ValueAnimator<any>[];
    set(value: T, duration: number): void;
    setTarget(value: T): void;
    target(): T;
    value(): T;
  }


  interface Arg10<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, T = any> extends Arg<T> {}
  class Arg10<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, T = any> extends Arg<T> {
    constructor(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, a7: ValueAnimator<A7>, a8: ValueAnimator<A8>, a9: ValueAnimator<A9>, a10: ValueAnimator<A10>, op: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg10_Op<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, T>, up: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg10_Up<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, T>);
    dependencies(): ValueAnimator<any>[];
    set(value: T, duration: number): void;
    setTarget(value: T): void;
    target(): T;
    value(): T;
  }


  interface Arg9<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, T = any> extends Arg<T> {}
  class Arg9<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, T = any> extends Arg<T> {
    constructor(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, a7: ValueAnimator<A7>, a8: ValueAnimator<A8>, a9: ValueAnimator<A9>, op: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg9_Op<A1, A2, A3, A4, A5, A6, A7, A8, A9, T>, up: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg9_Up<A1, A2, A3, A4, A5, A6, A7, A8, A9, T>);
    dependencies(): ValueAnimator<any>[];
    set(value: T, duration: number): void;
    setTarget(value: T): void;
    target(): T;
    value(): T;
  }


  interface Arg8<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, T = any> extends Arg<T> {}
  class Arg8<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, T = any> extends Arg<T> {
    constructor(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, a7: ValueAnimator<A7>, a8: ValueAnimator<A8>, op: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg8_Op<A1, A2, A3, A4, A5, A6, A7, A8, T>, up: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg8_Up<A1, A2, A3, A4, A5, A6, A7, A8, T>);
    dependencies(): ValueAnimator<any>[];
    set(value: T, duration: number): void;
    setTarget(value: T): void;
    target(): T;
    value(): T;
  }


  interface Arg7<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, T = any> extends Arg<T> {}
  class Arg7<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, T = any> extends Arg<T> {
    constructor(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, a7: ValueAnimator<A7>, op: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg7_Op<A1, A2, A3, A4, A5, A6, A7, T>, up: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg7_Up<A1, A2, A3, A4, A5, A6, A7, T>);
    dependencies(): ValueAnimator<any>[];
    set(value: T, duration: number): void;
    setTarget(value: T): void;
    target(): T;
    value(): T;
  }


  interface Arg6<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, T = any> extends Arg<T> {}
  class Arg6<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, T = any> extends Arg<T> {
    constructor(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, a6: ValueAnimator<A6>, op: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg6_Op<A1, A2, A3, A4, A5, A6, T>, up: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg6_Up<A1, A2, A3, A4, A5, A6, T>);
    dependencies(): ValueAnimator<any>[];
    set(value: T, duration: number): void;
    setTarget(value: T): void;
    target(): T;
    value(): T;
  }


  interface Arg5<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, T = any> extends Arg<T> {}
  class Arg5<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, T = any> extends Arg<T> {
    constructor(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, a5: ValueAnimator<A5>, op: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg5_Op<A1, A2, A3, A4, A5, T>, up: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg5_Up<A1, A2, A3, A4, A5, T>);
    dependencies(): ValueAnimator<any>[];
    set(value: T, duration: number): void;
    setTarget(value: T): void;
    target(): T;
    value(): T;
  }


  interface Arg4<A1 = any, A2 = any, A3 = any, A4 = any, T = any> extends Arg<T> {}
  class Arg4<A1 = any, A2 = any, A3 = any, A4 = any, T = any> extends Arg<T> {
    constructor(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, a4: ValueAnimator<A4>, op: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg4_Op<A1, A2, A3, A4, T>, up: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg4_Up<A1, A2, A3, A4, T>);
    dependencies(): ValueAnimator<any>[];
    set(value: T, duration: number): void;
    setTarget(value: T): void;
    target(): T;
    value(): T;
  }


  interface Arg3<A1 = any, A2 = any, A3 = any, T = any> extends Arg<T> {}
  class Arg3<A1 = any, A2 = any, A3 = any, T = any> extends Arg<T> {
    constructor(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, a3: ValueAnimator<A3>, op: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg3_Op<A1, A2, A3, T>, up: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg3_Up<A1, A2, A3, T>);
    dependencies(): ValueAnimator<any>[];
    set(value: T, duration: number): void;
    setTarget(value: T): void;
    target(): T;
    value(): T;
  }


  interface Arg2<A1 = any, A2 = any, T = any> extends Arg<T> {}
  class Arg2<A1 = any, A2 = any, T = any> extends Arg<T> {
    constructor(a1: ValueAnimator<A1>, a2: ValueAnimator<A2>, op: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg2_Op<A1, A2, T>, up: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg2_Up<A1, A2, T>);
    dependencies(): ValueAnimator<any>[];
    set(value: T, duration: number): void;
    setTarget(value: T): void;
    target(): T;
    value(): T;
  }


  interface Arg1<A1 = any, T = any> extends Arg<T> {}
  class Arg1<A1 = any, T = any> extends Arg<T> {
    constructor(a1: ValueAnimator<A1>, op: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg1_Op<A1, T>, up: me_shedaniel_clothconfig2_api_animator_recordvalueanimatorargs_arg1_Up<A1, T>);
    dependencies(): ValueAnimator<any>[];
    set(value: T, duration: number): void;
    setTarget(value: T): void;
    target(): T;
    value(): T;
  }


  class Setter<T = any> {
    set(var1: T): void;
  }

}

declare module 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg20' {
  import { Setter } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs';

  class Op<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, A14 = any, A15 = any, A16 = any, A17 = any, A18 = any, A19 = any, A20 = any, T = any> {
    construct(var1: A1, var2: A2, var3: A3, var4: A4, var5: A5, var6: A6, var7: A7, var8: A8, var9: A9, var10: A10, var11: A11, var12: A12, var13: A13, var14: A14, var15: A15, var16: A16, var17: A17, var18: A18, var19: A19, var20: A20): T;
  }


  class Up<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, A14 = any, A15 = any, A16 = any, A17 = any, A18 = any, A19 = any, A20 = any, T = any> {
    update(var1: T, var2: Setter<A1>, var3: Setter<A2>, var4: Setter<A3>, var5: Setter<A4>, var6: Setter<A5>, var7: Setter<A6>, var8: Setter<A7>, var9: Setter<A8>, var10: Setter<A9>, var11: Setter<A10>, var12: Setter<A11>, var13: Setter<A12>, var14: Setter<A13>, var15: Setter<A14>, var16: Setter<A15>, var17: Setter<A16>, var18: Setter<A17>, var19: Setter<A18>, var20: Setter<A19>, var21: Setter<A20>): void;
  }

}

declare module 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg19' {
  import { Setter } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs';

  class Op<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, A14 = any, A15 = any, A16 = any, A17 = any, A18 = any, A19 = any, T = any> {
    construct(var1: A1, var2: A2, var3: A3, var4: A4, var5: A5, var6: A6, var7: A7, var8: A8, var9: A9, var10: A10, var11: A11, var12: A12, var13: A13, var14: A14, var15: A15, var16: A16, var17: A17, var18: A18, var19: A19): T;
  }


  class Up<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, A14 = any, A15 = any, A16 = any, A17 = any, A18 = any, A19 = any, T = any> {
    update(var1: T, var2: Setter<A1>, var3: Setter<A2>, var4: Setter<A3>, var5: Setter<A4>, var6: Setter<A5>, var7: Setter<A6>, var8: Setter<A7>, var9: Setter<A8>, var10: Setter<A9>, var11: Setter<A10>, var12: Setter<A11>, var13: Setter<A12>, var14: Setter<A13>, var15: Setter<A14>, var16: Setter<A15>, var17: Setter<A16>, var18: Setter<A17>, var19: Setter<A18>, var20: Setter<A19>): void;
  }

}

declare module 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg18' {
  import { Setter } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs';

  class Op<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, A14 = any, A15 = any, A16 = any, A17 = any, A18 = any, T = any> {
    construct(var1: A1, var2: A2, var3: A3, var4: A4, var5: A5, var6: A6, var7: A7, var8: A8, var9: A9, var10: A10, var11: A11, var12: A12, var13: A13, var14: A14, var15: A15, var16: A16, var17: A17, var18: A18): T;
  }


  class Up<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, A14 = any, A15 = any, A16 = any, A17 = any, A18 = any, T = any> {
    update(var1: T, var2: Setter<A1>, var3: Setter<A2>, var4: Setter<A3>, var5: Setter<A4>, var6: Setter<A5>, var7: Setter<A6>, var8: Setter<A7>, var9: Setter<A8>, var10: Setter<A9>, var11: Setter<A10>, var12: Setter<A11>, var13: Setter<A12>, var14: Setter<A13>, var15: Setter<A14>, var16: Setter<A15>, var17: Setter<A16>, var18: Setter<A17>, var19: Setter<A18>): void;
  }

}

declare module 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg17' {
  import { Setter } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs';

  class Op<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, A14 = any, A15 = any, A16 = any, A17 = any, T = any> {
    construct(var1: A1, var2: A2, var3: A3, var4: A4, var5: A5, var6: A6, var7: A7, var8: A8, var9: A9, var10: A10, var11: A11, var12: A12, var13: A13, var14: A14, var15: A15, var16: A16, var17: A17): T;
  }


  class Up<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, A14 = any, A15 = any, A16 = any, A17 = any, T = any> {
    update(var1: T, var2: Setter<A1>, var3: Setter<A2>, var4: Setter<A3>, var5: Setter<A4>, var6: Setter<A5>, var7: Setter<A6>, var8: Setter<A7>, var9: Setter<A8>, var10: Setter<A9>, var11: Setter<A10>, var12: Setter<A11>, var13: Setter<A12>, var14: Setter<A13>, var15: Setter<A14>, var16: Setter<A15>, var17: Setter<A16>, var18: Setter<A17>): void;
  }

}

declare module 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg16' {
  import { Setter } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs';

  class Op<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, A14 = any, A15 = any, A16 = any, T = any> {
    construct(var1: A1, var2: A2, var3: A3, var4: A4, var5: A5, var6: A6, var7: A7, var8: A8, var9: A9, var10: A10, var11: A11, var12: A12, var13: A13, var14: A14, var15: A15, var16: A16): T;
  }


  class Up<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, A14 = any, A15 = any, A16 = any, T = any> {
    update(var1: T, var2: Setter<A1>, var3: Setter<A2>, var4: Setter<A3>, var5: Setter<A4>, var6: Setter<A5>, var7: Setter<A6>, var8: Setter<A7>, var9: Setter<A8>, var10: Setter<A9>, var11: Setter<A10>, var12: Setter<A11>, var13: Setter<A12>, var14: Setter<A13>, var15: Setter<A14>, var16: Setter<A15>, var17: Setter<A16>): void;
  }

}

declare module 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg15' {
  import { Setter } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs';

  class Op<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, A14 = any, A15 = any, T = any> {
    construct(var1: A1, var2: A2, var3: A3, var4: A4, var5: A5, var6: A6, var7: A7, var8: A8, var9: A9, var10: A10, var11: A11, var12: A12, var13: A13, var14: A14, var15: A15): T;
  }


  class Up<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, A14 = any, A15 = any, T = any> {
    update(var1: T, var2: Setter<A1>, var3: Setter<A2>, var4: Setter<A3>, var5: Setter<A4>, var6: Setter<A5>, var7: Setter<A6>, var8: Setter<A7>, var9: Setter<A8>, var10: Setter<A9>, var11: Setter<A10>, var12: Setter<A11>, var13: Setter<A12>, var14: Setter<A13>, var15: Setter<A14>, var16: Setter<A15>): void;
  }

}

declare module 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg14' {
  import { Setter } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs';

  class Op<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, A14 = any, T = any> {
    construct(var1: A1, var2: A2, var3: A3, var4: A4, var5: A5, var6: A6, var7: A7, var8: A8, var9: A9, var10: A10, var11: A11, var12: A12, var13: A13, var14: A14): T;
  }


  class Up<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, A14 = any, T = any> {
    update(var1: T, var2: Setter<A1>, var3: Setter<A2>, var4: Setter<A3>, var5: Setter<A4>, var6: Setter<A5>, var7: Setter<A6>, var8: Setter<A7>, var9: Setter<A8>, var10: Setter<A9>, var11: Setter<A10>, var12: Setter<A11>, var13: Setter<A12>, var14: Setter<A13>, var15: Setter<A14>): void;
  }

}

declare module 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg13' {
  import { Setter } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs';

  class Op<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, T = any> {
    construct(var1: A1, var2: A2, var3: A3, var4: A4, var5: A5, var6: A6, var7: A7, var8: A8, var9: A9, var10: A10, var11: A11, var12: A12, var13: A13): T;
  }


  class Up<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, A13 = any, T = any> {
    update(var1: T, var2: Setter<A1>, var3: Setter<A2>, var4: Setter<A3>, var5: Setter<A4>, var6: Setter<A5>, var7: Setter<A6>, var8: Setter<A7>, var9: Setter<A8>, var10: Setter<A9>, var11: Setter<A10>, var12: Setter<A11>, var13: Setter<A12>, var14: Setter<A13>): void;
  }

}

declare module 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg12' {
  import { Setter } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs';

  class Op<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, T = any> {
    construct(var1: A1, var2: A2, var3: A3, var4: A4, var5: A5, var6: A6, var7: A7, var8: A8, var9: A9, var10: A10, var11: A11, var12: A12): T;
  }


  class Up<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, A12 = any, T = any> {
    update(var1: T, var2: Setter<A1>, var3: Setter<A2>, var4: Setter<A3>, var5: Setter<A4>, var6: Setter<A5>, var7: Setter<A6>, var8: Setter<A7>, var9: Setter<A8>, var10: Setter<A9>, var11: Setter<A10>, var12: Setter<A11>, var13: Setter<A12>): void;
  }

}

declare module 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg11' {
  import { Setter } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs';

  class Op<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, T = any> {
    construct(var1: A1, var2: A2, var3: A3, var4: A4, var5: A5, var6: A6, var7: A7, var8: A8, var9: A9, var10: A10, var11: A11): T;
  }


  class Up<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, A11 = any, T = any> {
    update(var1: T, var2: Setter<A1>, var3: Setter<A2>, var4: Setter<A3>, var5: Setter<A4>, var6: Setter<A5>, var7: Setter<A6>, var8: Setter<A7>, var9: Setter<A8>, var10: Setter<A9>, var11: Setter<A10>, var12: Setter<A11>): void;
  }

}

declare module 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg10' {
  import { Setter } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs';

  class Op<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, T = any> {
    construct(var1: A1, var2: A2, var3: A3, var4: A4, var5: A5, var6: A6, var7: A7, var8: A8, var9: A9, var10: A10): T;
  }


  class Up<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, A10 = any, T = any> {
    update(var1: T, var2: Setter<A1>, var3: Setter<A2>, var4: Setter<A3>, var5: Setter<A4>, var6: Setter<A5>, var7: Setter<A6>, var8: Setter<A7>, var9: Setter<A8>, var10: Setter<A9>, var11: Setter<A10>): void;
  }

}

declare module 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg9' {
  import { Setter } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs';

  class Op<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, T = any> {
    construct(var1: A1, var2: A2, var3: A3, var4: A4, var5: A5, var6: A6, var7: A7, var8: A8, var9: A9): T;
  }


  class Up<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, A9 = any, T = any> {
    update(var1: T, var2: Setter<A1>, var3: Setter<A2>, var4: Setter<A3>, var5: Setter<A4>, var6: Setter<A5>, var7: Setter<A6>, var8: Setter<A7>, var9: Setter<A8>, var10: Setter<A9>): void;
  }

}

declare module 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg8' {
  import { Setter } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs';

  class Op<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, T = any> {
    construct(var1: A1, var2: A2, var3: A3, var4: A4, var5: A5, var6: A6, var7: A7, var8: A8): T;
  }


  class Up<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, A8 = any, T = any> {
    update(var1: T, var2: Setter<A1>, var3: Setter<A2>, var4: Setter<A3>, var5: Setter<A4>, var6: Setter<A5>, var7: Setter<A6>, var8: Setter<A7>, var9: Setter<A8>): void;
  }

}

declare module 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg7' {
  import { Setter } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs';

  class Op<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, T = any> {
    construct(var1: A1, var2: A2, var3: A3, var4: A4, var5: A5, var6: A6, var7: A7): T;
  }


  class Up<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, A7 = any, T = any> {
    update(var1: T, var2: Setter<A1>, var3: Setter<A2>, var4: Setter<A3>, var5: Setter<A4>, var6: Setter<A5>, var7: Setter<A6>, var8: Setter<A7>): void;
  }

}

declare module 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg6' {
  import { Setter } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs';

  class Op<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, T = any> {
    construct(var1: A1, var2: A2, var3: A3, var4: A4, var5: A5, var6: A6): T;
  }


  class Up<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, A6 = any, T = any> {
    update(var1: T, var2: Setter<A1>, var3: Setter<A2>, var4: Setter<A3>, var5: Setter<A4>, var6: Setter<A5>, var7: Setter<A6>): void;
  }

}

declare module 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg5' {
  import { Setter } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs';

  class Op<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, T = any> {
    construct(var1: A1, var2: A2, var3: A3, var4: A4, var5: A5): T;
  }


  class Up<A1 = any, A2 = any, A3 = any, A4 = any, A5 = any, T = any> {
    update(var1: T, var2: Setter<A1>, var3: Setter<A2>, var4: Setter<A3>, var5: Setter<A4>, var6: Setter<A5>): void;
  }

}

declare module 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg4' {
  import { Setter } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs';

  class Op<A1 = any, A2 = any, A3 = any, A4 = any, T = any> {
    construct(var1: A1, var2: A2, var3: A3, var4: A4): T;
  }


  class Up<A1 = any, A2 = any, A3 = any, A4 = any, T = any> {
    update(var1: T, var2: Setter<A1>, var3: Setter<A2>, var4: Setter<A3>, var5: Setter<A4>): void;
  }

}

declare module 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg3' {
  import { Setter } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs';

  class Op<A1 = any, A2 = any, A3 = any, T = any> {
    construct(var1: A1, var2: A2, var3: A3): T;
  }


  class Up<A1 = any, A2 = any, A3 = any, T = any> {
    update(var1: T, var2: Setter<A1>, var3: Setter<A2>, var4: Setter<A3>): void;
  }

}

declare module 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg2' {
  import { Setter } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs';

  class Op<A1 = any, A2 = any, T = any> {
    construct(var1: A1, var2: A2): T;
  }


  class Up<A1 = any, A2 = any, T = any> {
    update(var1: T, var2: Setter<A1>, var3: Setter<A2>): void;
  }

}

declare module 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs.Arg1' {
  import { Setter } from 'me.shedaniel.clothconfig2.api.animator.RecordValueAnimatorArgs';

  class Op<A1 = any, T = any> {
    construct(var1: A1): T;
  }


  class Up<A1 = any, T = any> {
    update(var1: T, var2: Setter<A1>): void;
  }

}

declare module 'me.shedaniel.clothconfig2.api.scroll' {
  import { Rectangle } from 'me.shedaniel.math';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class ScrollingContainer {
    clamp(v: number): number;
    clamp(v: number, clampExtension: number): number;
    static clampExtension(value: number, maxScroll: number): number;
    static clampExtension(v: number, maxScroll: number, clampExtension: number): number;
    get bounds(): Rectangle;
    get maxScroll(): number;
    get maxScrollHeight(): number;
    get scissorBounds(): Rectangle;
    getScrollBarX(maxX: number): number;
    static handleBounceBack(target: number, maxScroll: number, delta: number): number;
    static handleBounceBack(target: number, maxScroll: number, delta: number, bounceBackMultiplier: number): number;
    hasScrollBar(): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, dx: number, dy: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, dx: number, dy: number, snapToRows: boolean, rowSize: number): boolean;
    offset(value: number, animated: boolean): void;
    renderScrollBar(graphics: GuiGraphics): void;
    renderScrollBar(graphics: GuiGraphics, background: number, alpha: number, scrollBarAlphaOffset: number): void;
    scrollAmount(): number;
    scrollAmountInt(): number;
    scrollTarget(): number;
    scrollTo(value: number, animated: boolean): void;
    scrollTo(value: number, animated: boolean, duration: number): void;
    setScrollDuration(scrollDuration: number): void;
    updateDraggingState(mouseX: number, mouseY: number, button: number): boolean;
    updatePosition(delta: number): void;
  }

}

declare module 'me.shedaniel.clothconfig2' {
  import { Logger } from 'org.apache.logging.log4j';
  import { EasingMethod } from 'me.shedaniel.clothconfig2.impl';

  class ClothConfigInitializer {
    static readonly LOGGER: Logger;
    static readonly MOD_ID: string;
    static clamp(v: number, maxScroll: number): number;
    static clamp(v: number, maxScroll: number, clampExtension: number): number;
    static expoEase(start: number, end: number, amount: number): number;
    static get bounceBackMultiplier(): number;
    static get easingMethod(): EasingMethod;
    static get scrollDuration(): number;
    static get scrollStep(): number;
    static handleScrollingPosition(target: number[], scroll: number, maxScroll: number, delta: number, start: number, duration: number): number;
  }

}

declare module 'me.shedaniel.clothconfig2.gui' {
  import { Screen, ConfirmScreen } from 'net.minecraft.client.gui.screens';
  import { ConfigScreen, AbstractConfigEntry, Tooltip, TabbedConfigScreen, ConfigCategory, ReferenceBuildingConfigScreen, Expandable } from 'me.shedaniel.clothconfig2.api';
  import { List, Map, Iterator, Optional } from 'java.util';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { Runnable } from 'java.lang';
  import { Consumer, Supplier } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Component, Style, FormattedText } from 'net.minecraft.network.chat';
  import { KeyCodeEntry } from 'me.shedaniel.clothconfig2.gui.entries';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ListWidget } from 'me.shedaniel.clothconfig2.gui.ClothConfigScreen';
  import { AbstractButton } from 'net.minecraft.client.gui.components';
  import { NarrationElementOutput } from 'net.minecraft.client.gui.narration';

  interface AbstractConfigScreen extends ConfigScreen, Screen {}
  class AbstractConfigScreen extends ConfigScreen {
    selectedCategoryIndex: number;
    addTooltip(tooltip: Tooltip): void;
    childrenL(): GuiEventListener[];
    get backgroundLocation(): ResourceLocation;
    get categorizedEntries(): Map<Component, AbstractConfigEntry<any>[]>;
    get fallbackCategory(): Component;
    get focusedBinding(): KeyCodeEntry;
    handleComponentClicked(style: Style): boolean;
    isAlwaysShowTabs(): boolean;
    isEditable(): boolean;
    isEdited(): boolean;
    isRequiresRestart(): boolean;
    isShowingTabs(): boolean;
    isTransparentBackground(): boolean;
    keyPressed(int_1: number, int_2: number, int_3: number): boolean;
    keyReleased(int_1: number, int_2: number, int_3: number): boolean;
    mouseClicked(double_1: number, double_2: number, int_1: number): boolean;
    mouseReleased(double_1: number, double_2: number, int_1: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    save(): void;
    saveAll(openOtherScreens: boolean): void;
    set fallbackCategory(defaultFallbackCategory: Component);
    set focusedBinding(focusedBinding: KeyCodeEntry);
    setAfterInitConsumer(afterInitConsumer: Consumer<Screen>): void;
    setAlwaysShowTabs(alwaysShowTabs: boolean): void;
    setConfirmSave(confirmSave: boolean): void;
    setEditable(editable: boolean): void;
    setSavingRunnable(savingRunnable: Runnable): void;
    setTransparentBackground(transparentBackground: boolean): void;
    tick(): void;
  }


  interface AbstractTabbedConfigScreen extends TabbedConfigScreen, AbstractConfigScreen {}
  class AbstractTabbedConfigScreen extends TabbedConfigScreen {
    get backgroundLocation(): ResourceLocation;
    isTransparentBackground(): boolean;
    registerCategoryBackground(text: string, identifier: ResourceLocation): void;
    registerCategoryTransparency(text: string, transparent: boolean): void;
  }


  interface ClothConfigScreen extends AbstractTabbedConfigScreen {}
  class ClothConfigScreen extends AbstractTabbedConfigScreen {
    listWidget: ListWidget;
    constructor(parent: Screen, title: Component, categoryMap: Map<string, ConfigCategory>, backgroundLocation: ResourceLocation);
    get categorizedEntries(): Map<Component, AbstractConfigEntry<any>[]>;
    get selectedCategory(): Component;
    get tabsMaximumScrolled(): number;
    isEditable(): boolean;
    matchesSearch(tags: Iterator<string>): boolean;
    mouseScrolled(mouseX: number, mouseY: number, amountX: number, amountY: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    renderBackground(guiGraphics: GuiGraphics, i: number, j: number, f: number): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    resetTabsMaximumScrolled(): void;
    save(): void;
  }


  interface ClothConfigTabButton extends AbstractButton {}
  class ClothConfigTabButton extends AbstractButton {
    constructor(screen: ClothConfigScreen, index: number, int_1: number, int_2: number, int_3: number, int_4: number, string_1: Component, descriptionSupplier: Supplier<Optional<FormattedText[]>>);

    constructor(screen: ClothConfigScreen, index: number, int_1: number, int_2: number, int_3: number, int_4: number, string_1: Component);
    get description(): Optional<FormattedText[]>;
    isMouseOver(double_1: number, double_2: number): boolean;
    onPress(): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    updateWidgetNarration(narrationElementOutput: NarrationElementOutput): void;
  }


  interface ClothRequiresRestartScreen extends ConfirmScreen {}
  class ClothRequiresRestartScreen extends ConfirmScreen {
    constructor(parent: Screen);
  }


  interface GlobalizedClothConfigScreen extends ReferenceBuildingConfigScreen, Expandable, AbstractConfigScreen {}
  class GlobalizedClothConfigScreen extends ReferenceBuildingConfigScreen {
    listWidget: ListWidget;
    constructor(parent: Screen, title: Component, categoryMap: Map<string, ConfigCategory>, backgroundLocation: ResourceLocation);
    get categorizedEntries(): Map<Component, AbstractConfigEntry<any>[]>;
    isExpanded(): boolean;
    matchesSearch(tags: Iterator<string>): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, amountX: number, amountY: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    renderBackground(guiGraphics: GuiGraphics, i: number, j: number, f: number): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    requestReferenceRebuilding(): void;
    setExpanded(expanded: boolean): void;
  }

}

declare module 'me.shedaniel.clothconfig2.gui.ClothConfigScreen' {
  import { DynamicElementListWidget } from 'me.shedaniel.clothconfig2.gui.widget';
  import { UnaryOperator } from 'java.util.function';
  import { Rectangle } from 'me.shedaniel.math';
  import { AbstractConfigScreen } from 'me.shedaniel.clothconfig2.gui';
  import { Minecraft } from 'net.minecraft.client';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List } from 'java.util';

  interface ListWidget<R extends ElementEntry<R> = any> extends DynamicElementListWidget<R> {}
  class ListWidget<R extends ElementEntry<R> = any> extends DynamicElementListWidget<R> {
    entriesTransformer: UnaryOperator;
    thisTimeTarget: Rectangle;
    lastTouch: number;
    constructor(screen: AbstractConfigScreen, client: Minecraft, width: number, height: number, top: number, bottom: number, backgroundLocation: ResourceLocation);
    children(): R[];
    get itemWidth(): number;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
  }

}

declare module 'me.shedaniel.clothconfig2.gui.entries' {
  import { Component } from 'net.minecraft.network.chat';
  import { List, Optional, Iterator } from 'java.util';
  import { Supplier, Consumer, BiFunction, Function } from 'java.util.function';
  import { AbstractContainerEventHandler, GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { NarratableEntry } from 'net.minecraft.client.gui.narration';
  import { GuiGraphics, ComponentPath } from 'net.minecraft.client.gui';
  import { Expandable, AbstractConfigListEntry, ModifierKeyCode } from 'me.shedaniel.clothconfig2.api';
  import { Rectangle } from 'me.shedaniel.math';
  import { Boolean, Integer, Double, Iterable, Class, Enum, Float, Long } from 'java.lang';
  import { DoubleListCell } from 'me.shedaniel.clothconfig2.gui.entries.DoubleListListEntry';
  import { SelectionTopCellElement, SelectionCellCreator, SelectionElement } from 'me.shedaniel.clothconfig2.gui.entries.DropdownBoxEntry';
  import { ImmutableList } from 'com.google.common.collect';
  import { FocusNavigationEvent } from 'net.minecraft.client.gui.navigation';
  import { FloatListCell } from 'me.shedaniel.clothconfig2.gui.entries.FloatListListEntry';
  import { IntegerListCell } from 'me.shedaniel.clothconfig2.gui.entries.IntegerListListEntry';
  import { LongListCell } from 'me.shedaniel.clothconfig2.gui.entries.LongListListEntry';
  import { NestedListCell } from 'me.shedaniel.clothconfig2.gui.entries.NestedListListEntry';
  import { StringListCell } from 'me.shedaniel.clothconfig2.gui.entries.StringListListEntry';

  interface AbstractListListEntry<T = any, C extends AbstractListCell<T, C, SELF> = any, SELF extends AbstractListListEntry<T, C, SELF> = any> extends BaseListEntry<T, C, SELF> {}
  class AbstractListListEntry<T = any, C extends AbstractListCell<T, C, SELF> = any, SELF extends AbstractListListEntry<T, C, SELF> = any> extends BaseListEntry<T, C, SELF> {
    constructor(fieldName: Component, value: T[], defaultExpanded: boolean, tooltipSupplier: Supplier<Optional<Component[]>>, saveConsumer: Consumer<T[]>, defaultValue: Supplier<T[]>, resetButtonKey: Component, requiresRestart: boolean, deleteButtonEnabled: boolean, insertInFront: boolean, createNewCell: BiFunction<T, SELF, C>);
    get cellErrorSupplier(): Function<T, Optional<Component>>;
    get value(): T[];
    isEdited(): boolean;
    set cellErrorSupplier(cellErrorSupplier: Function<T, Optional<Component>>);
  }


  interface AbstractNumberListEntry<T = any> extends TextFieldListEntry<T> {}
  class AbstractNumberListEntry<T = any> extends TextFieldListEntry<T> {
  }


  interface AbstractTextFieldListListEntry<T = any, C extends AbstractTextFieldListCell<T, C, SELF> = any, SELF extends AbstractTextFieldListListEntry<T, C, SELF> = any> extends AbstractListListEntry<T, C, SELF> {}
  class AbstractTextFieldListListEntry<T = any, C extends AbstractTextFieldListCell<T, C, SELF> = any, SELF extends AbstractTextFieldListListEntry<T, C, SELF> = any> extends AbstractListListEntry<T, C, SELF> {
    constructor(fieldName: Component, value: T[], defaultExpanded: boolean, tooltipSupplier: Supplier<Optional<Component[]>>, saveConsumer: Consumer<T[]>, defaultValue: Supplier<T[]>, resetButtonKey: Component, requiresRestart: boolean, deleteButtonEnabled: boolean, insertInFront: boolean, createNewCell: BiFunction<T, SELF, C>);
  }


  interface BaseListCell extends NarratableEntry, AbstractContainerEventHandler {}
  class BaseListCell extends NarratableEntry {
    get cellHeight(): number;
    get configError(): Optional<Component>;
    get error(): Optional<Component>;
    get preferredTextColor(): number;
    isEdited(): boolean;
    isRequiresRestart(): boolean;
    onAdd(): void;
    onDelete(): void;
    render(var1: GuiGraphics, var2: number, var3: number, var4: number, var5: number, var6: number, var7: number, var8: number, var9: boolean, var10: number): void;
    setErrorSupplier(errorSupplier: Supplier<Optional<Component>>): void;
    updateSelected(isSelected: boolean): void;
  }


  interface BaseListEntry<T = any, C extends BaseListCell = any, SELF extends BaseListEntry<T, C, SELF> = any> extends Expandable, TooltipListEntry<List> {}
  class BaseListEntry<T = any, C extends BaseListCell = any, SELF extends BaseListEntry<T, C, SELF> = any> extends Expandable {
    constructor(fieldName: Component, tooltipSupplier: Supplier<Optional<Component[]>>, defaultValue: Supplier<T[]>, createNewInstance: Function<SELF, C>, saveConsumer: Consumer<T[]>, resetButtonKey: Component);

    constructor(fieldName: Component, tooltipSupplier: Supplier<Optional<Component[]>>, defaultValue: Supplier<T[]>, createNewInstance: Function<SELF, C>, saveConsumer: Consumer<T[]>, resetButtonKey: Component, requiresRestart: boolean);

    constructor(fieldName: Component, tooltipSupplier: Supplier<Optional<Component[]>>, defaultValue: Supplier<T[]>, createNewInstance: Function<SELF, C>, saveConsumer: Consumer<T[]>, resetButtonKey: Component, requiresRestart: boolean, deleteButtonEnabled: boolean, insertInFront: boolean);
    children(): GuiEventListener[];
    get createNewInstance(): Function<SELF, C>;
    get defaultValue(): Optional<T[]>;
    get error(): Optional<Component>;
    get initialReferenceOffset(): number;
    get itemHeight(): number;
    get removeTooltip(): Component;
    get tooltip(): Optional<Component[]>;
    getAddTooltip(): Component;
    getEntryArea(x: number, y: number, entryWidth: number, entryHeight: number): Rectangle;
    getTooltip(mouseX: number, mouseY: number): Optional<Component[]>;
    insertInFront(): boolean;
    isDeleteButtonEnabled(): boolean;
    isEdited(): boolean;
    isExpanded(): boolean;
    isInsertButtonEnabled(): boolean;
    isMatchDefault(): boolean;
    isRequiresRestart(): boolean;
    narratables(): NarratableEntry[];
    render(graphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, isHovered: boolean, delta: number): void;
    save(): void;
    self(): SELF;
    set createNewInstance(createNewInstance: Function<SELF, C>);
    set removeTooltip(removeTooltip: Component);
    setAddTooltip(addTooltip: Component): void;
    setDeleteButtonEnabled(deleteButtonEnabled: boolean): void;
    setExpanded(expanded: boolean): void;
    setInsertButtonEnabled(insertButtonEnabled: boolean): void;
    setRequiresRestart(requiresRestart: boolean): void;
    updateSelected(isSelected: boolean): void;
  }


  interface BooleanListEntry extends TooltipListEntry<boolean> {}
  class BooleanListEntry extends TooltipListEntry<boolean> {
    constructor(fieldName: Component, bool: boolean, resetButtonKey: Component, defaultValue: Supplier<boolean>, saveConsumer: Consumer<boolean>);

    constructor(fieldName: Component, bool: boolean, resetButtonKey: Component, defaultValue: Supplier<boolean>, saveConsumer: Consumer<boolean>, tooltipSupplier: Supplier<Optional<Component[]>>);

    constructor(fieldName: Component, bool: boolean, resetButtonKey: Component, defaultValue: Supplier<boolean>, saveConsumer: Consumer<boolean>, tooltipSupplier: Supplier<Optional<Component[]>>, requiresRestart: boolean);
    children(): GuiEventListener[];
    get defaultValue(): Optional<boolean>;
    get value(): boolean;
    getYesNoText(bool: boolean): Component;
    isEdited(): boolean;
    narratables(): NarratableEntry[];
    render(graphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, isHovered: boolean, delta: number): void;
  }


  interface ColorEntry extends TextFieldListEntry<number> {}
  class ColorEntry extends TextFieldListEntry<number> {
    constructor(fieldName: Component, value: number, resetButtonKey: Component, defaultValue: Supplier<number>, saveConsumer: Consumer<number>, tooltipSupplier: Supplier<Optional<Component[]>>, requiresRestart: boolean);
    get error(): Optional<Component>;
    get value(): number;
    isEdited(): boolean;
    render(graphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, isHovered: boolean, delta: number): void;
    set value(color: number);
    setValue(s: string): void;
    withAlpha(): void;
    withoutAlpha(): void;
  }


  interface DoubleListEntry extends AbstractNumberListEntry<number> {}
  class DoubleListEntry extends AbstractNumberListEntry<number> {
    constructor(fieldName: Component, value: number, resetButtonKey: Component, defaultValue: Supplier<number>, saveConsumer: Consumer<number>);

    constructor(fieldName: Component, value: number, resetButtonKey: Component, defaultValue: Supplier<number>, saveConsumer: Consumer<number>, tooltipSupplier: Supplier<Optional<Component[]>>);

    constructor(fieldName: Component, value: number, resetButtonKey: Component, defaultValue: Supplier<number>, saveConsumer: Consumer<number>, tooltipSupplier: Supplier<Optional<Component[]>>, requiresRestart: boolean);
    get error(): Optional<Component>;
    get value(): number;
    setMaximum(maximum: number): DoubleListEntry;
    setMinimum(minimum: number): DoubleListEntry;
  }


  interface DoubleListListEntry extends AbstractTextFieldListListEntry<number, DoubleListCell, DoubleListListEntry> {}
  class DoubleListListEntry extends AbstractTextFieldListListEntry<number, DoubleListCell, DoubleListListEntry> {
    constructor(fieldName: Component, value: number[], defaultExpanded: boolean, tooltipSupplier: Supplier<Optional<Component[]>>, saveConsumer: Consumer<number[]>, defaultValue: Supplier<number[]>, resetButtonKey: Component);

    constructor(fieldName: Component, value: number[], defaultExpanded: boolean, tooltipSupplier: Supplier<Optional<Component[]>>, saveConsumer: Consumer<number[]>, defaultValue: Supplier<number[]>, resetButtonKey: Component, requiresRestart: boolean);

    constructor(fieldName: Component, value: number[], defaultExpanded: boolean, tooltipSupplier: Supplier<Optional<Component[]>>, saveConsumer: Consumer<number[]>, defaultValue: Supplier<number[]>, resetButtonKey: Component, requiresRestart: boolean, deleteButtonEnabled: boolean, insertInFront: boolean);
    self(): DoubleListListEntry;
    setMaximum(maximum: number): DoubleListListEntry;
    setMinimum(minimum: number): DoubleListListEntry;
  }


  interface DropdownBoxEntry<T = any> extends TooltipListEntry<T> {}
  class DropdownBoxEntry<T = any> extends TooltipListEntry<T> {
    constructor(fieldName: Component, resetButtonKey: Component, tooltipSupplier: Supplier<Optional<Component[]>>, requiresRestart: boolean, defaultValue: Supplier<T>, saveConsumer: Consumer<T>, selections: Iterable<T>, topRenderer: SelectionTopCellElement<T>, cellCreator: SelectionCellCreator<T>);
    children(): GuiEventListener[];
    get defaultValue(): Optional<T>;
    get error(): Optional<Component>;
    get morePossibleHeight(): number;
    get selectionElement(): SelectionElement<T>;
    get selections(): ImmutableList<T>;
    get value(): T;
    isEdited(): boolean;
    isSuggestionMode(): boolean;
    lateRender(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    mouseScrolled(double_1: number, double_2: number, amountX: number, amountY: number): boolean;
    narratables(): NarratableEntry[];
    render(graphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, isHovered: boolean, delta: number): void;
    setSuggestionMode(suggestionMode: boolean): void;
    updateSelected(isSelected: boolean): void;
  }


  interface EmptyEntry extends AbstractConfigListEntry<any> {}
  class EmptyEntry extends AbstractConfigListEntry<any> {
    constructor(height: number);
    children(): GuiEventListener[];
    get defaultValue(): Optional<any>;
    get itemHeight(): number;
    get searchTags(): Iterator<string>;
    get value(): any;
    isMouseInside(mouseX: number, mouseY: number, x: number, y: number, entryWidth: number, entryHeight: number): boolean;
    narratables(): NarratableEntry[];
    nextFocusPath(focusNavigationEvent: FocusNavigationEvent): ComponentPath;
    render(graphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, isHovered: boolean, delta: number): void;
  }


  interface EnumListEntry<T extends Enum<any> = any> extends SelectionListEntry<T> {}
  class EnumListEntry<T extends Enum<any> = any> extends SelectionListEntry<T> {
    static readonly DEFAULT_NAME_PROVIDER: Function;
    constructor(fieldName: Component, clazz: Class<T>, value: T, resetButtonKey: Component, defaultValue: Supplier<T>, saveConsumer: Consumer<T>);

    constructor(fieldName: Component, clazz: Class<T>, value: T, resetButtonKey: Component, defaultValue: Supplier<T>, saveConsumer: Consumer<T>, enumNameProvider: Function<Enum, Component>);

    constructor(fieldName: Component, clazz: Class<T>, value: T, resetButtonKey: Component, defaultValue: Supplier<T>, saveConsumer: Consumer<T>, enumNameProvider: Function<Enum, Component>, tooltipSupplier: Supplier<Optional<Component[]>>);

    constructor(fieldName: Component, clazz: Class<T>, value: T, resetButtonKey: Component, defaultValue: Supplier<T>, saveConsumer: Consumer<T>, enumNameProvider: Function<Enum, Component>, tooltipSupplier: Supplier<Optional<Component[]>>, requiresRestart: boolean);
  }


  interface FloatListEntry extends AbstractNumberListEntry<number> {}
  class FloatListEntry extends AbstractNumberListEntry<number> {
    constructor(fieldName: Component, value: number, resetButtonKey: Component, defaultValue: Supplier<number>, saveConsumer: Consumer<number>);

    constructor(fieldName: Component, value: number, resetButtonKey: Component, defaultValue: Supplier<number>, saveConsumer: Consumer<number>, tooltipSupplier: Supplier<Optional<Component[]>>);

    constructor(fieldName: Component, value: number, resetButtonKey: Component, defaultValue: Supplier<number>, saveConsumer: Consumer<number>, tooltipSupplier: Supplier<Optional<Component[]>>, requiresRestart: boolean);
    get error(): Optional<Component>;
    get value(): number;
    setMaximum(maximum: number): FloatListEntry;
    setMinimum(minimum: number): FloatListEntry;
  }


  interface FloatListListEntry extends AbstractTextFieldListListEntry<number, FloatListCell, FloatListListEntry> {}
  class FloatListListEntry extends AbstractTextFieldListListEntry<number, FloatListCell, FloatListListEntry> {
    constructor(fieldName: Component, value: number[], defaultExpanded: boolean, tooltipSupplier: Supplier<Optional<Component[]>>, saveConsumer: Consumer<number[]>, defaultValue: Supplier<number[]>, resetButtonKey: Component);

    constructor(fieldName: Component, value: number[], defaultExpanded: boolean, tooltipSupplier: Supplier<Optional<Component[]>>, saveConsumer: Consumer<number[]>, defaultValue: Supplier<number[]>, resetButtonKey: Component, requiresRestart: boolean);

    constructor(fieldName: Component, value: number[], defaultExpanded: boolean, tooltipSupplier: Supplier<Optional<Component[]>>, saveConsumer: Consumer<number[]>, defaultValue: Supplier<number[]>, resetButtonKey: Component, requiresRestart: boolean, deleteButtonEnabled: boolean, insertInFront: boolean);
    self(): FloatListListEntry;
    setMaximum(maximum: number): FloatListListEntry;
    setMinimum(minimum: number): FloatListListEntry;
  }


  interface IntegerListEntry extends AbstractNumberListEntry<number> {}
  class IntegerListEntry extends AbstractNumberListEntry<number> {
    constructor(fieldName: Component, value: number, resetButtonKey: Component, defaultValue: Supplier<number>, saveConsumer: Consumer<number>);

    constructor(fieldName: Component, value: number, resetButtonKey: Component, defaultValue: Supplier<number>, saveConsumer: Consumer<number>, tooltipSupplier: Supplier<Optional<Component[]>>);

    constructor(fieldName: Component, value: number, resetButtonKey: Component, defaultValue: Supplier<number>, saveConsumer: Consumer<number>, tooltipSupplier: Supplier<Optional<Component[]>>, requiresRestart: boolean);
    get error(): Optional<Component>;
    get value(): number;
    setMaximum(maximum: number): IntegerListEntry;
    setMinimum(minimum: number): IntegerListEntry;
  }


  interface IntegerListListEntry extends AbstractTextFieldListListEntry<number, IntegerListCell, IntegerListListEntry> {}
  class IntegerListListEntry extends AbstractTextFieldListListEntry<number, IntegerListCell, IntegerListListEntry> {
    constructor(fieldName: Component, value: number[], defaultExpanded: boolean, tooltipSupplier: Supplier<Optional<Component[]>>, saveConsumer: Consumer<number[]>, defaultValue: Supplier<number[]>, resetButtonKey: Component);

    constructor(fieldName: Component, value: number[], defaultExpanded: boolean, tooltipSupplier: Supplier<Optional<Component[]>>, saveConsumer: Consumer<number[]>, defaultValue: Supplier<number[]>, resetButtonKey: Component, requiresRestart: boolean);

    constructor(fieldName: Component, value: number[], defaultExpanded: boolean, tooltipSupplier: Supplier<Optional<Component[]>>, saveConsumer: Consumer<number[]>, defaultValue: Supplier<number[]>, resetButtonKey: Component, requiresRestart: boolean, deleteButtonEnabled: boolean, insertInFront: boolean);
    self(): IntegerListListEntry;
    setMaximum(maximum: number): IntegerListListEntry;
    setMinimum(minimum: number): IntegerListListEntry;
  }


  interface IntegerSliderEntry extends TooltipListEntry<number> {}
  class IntegerSliderEntry extends TooltipListEntry<number> {
    constructor(fieldName: Component, minimum: number, maximum: number, value: number, resetButtonKey: Component, defaultValue: Supplier<number>, saveConsumer: Consumer<number>);

    constructor(fieldName: Component, minimum: number, maximum: number, value: number, resetButtonKey: Component, defaultValue: Supplier<number>, saveConsumer: Consumer<number>, tooltipSupplier: Supplier<Optional<Component[]>>);

    constructor(fieldName: Component, minimum: number, maximum: number, value: number, resetButtonKey: Component, defaultValue: Supplier<number>, saveConsumer: Consumer<number>, tooltipSupplier: Supplier<Optional<Component[]>>, requiresRestart: boolean);
    children(): GuiEventListener[];
    get defaultValue(): Optional<number>;
    get textGetter(): Function<number, Component>;
    get value(): number;
    isEdited(): boolean;
    narratables(): NarratableEntry[];
    render(graphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, isHovered: boolean, delta: number): void;
    set textGetter(textGetter: Function<number, Component>);
    set value(value: number);
    setMaximum(maximum: number): IntegerSliderEntry;
    setMinimum(minimum: number): IntegerSliderEntry;
  }


  interface KeyCodeEntry extends TooltipListEntry<ModifierKeyCode> {}
  class KeyCodeEntry extends TooltipListEntry<ModifierKeyCode> {
    constructor(fieldName: Component, value: ModifierKeyCode, resetButtonKey: Component, defaultValue: Supplier<ModifierKeyCode>, saveConsumer: Consumer<ModifierKeyCode>, tooltipSupplier: Supplier<Optional<Component[]>>, requiresRestart: boolean);
    children(): GuiEventListener[];
    get defaultValue(): Optional<ModifierKeyCode>;
    get value(): ModifierKeyCode;
    isAllowKey(): boolean;
    isAllowModifiers(): boolean;
    isAllowMouse(): boolean;
    isEdited(): boolean;
    narratables(): NarratableEntry[];
    render(graphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, isHovered: boolean, delta: number): void;
    set value(value: ModifierKeyCode);
    setAllowKey(allowKey: boolean): void;
    setAllowModifiers(allowModifiers: boolean): void;
    setAllowMouse(allowMouse: boolean): void;
  }


  interface LongListEntry extends AbstractNumberListEntry<Long> {}
  class LongListEntry extends AbstractNumberListEntry<Long> {
    constructor(fieldName: Component, value: Long, resetButtonKey: Component, defaultValue: Supplier<Long>, saveConsumer: Consumer<Long>);

    constructor(fieldName: Component, value: Long, resetButtonKey: Component, defaultValue: Supplier<Long>, saveConsumer: Consumer<Long>, tooltipSupplier: Supplier<Optional<Component[]>>);

    constructor(fieldName: Component, value: Long, resetButtonKey: Component, defaultValue: Supplier<Long>, saveConsumer: Consumer<Long>, tooltipSupplier: Supplier<Optional<Component[]>>, requiresRestart: boolean);
    get error(): Optional<Component>;
    get value(): Long;
    setMaximum(maximum: number): LongListEntry;
    setMinimum(minimum: number): LongListEntry;
  }


  interface LongListListEntry extends AbstractTextFieldListListEntry<Long, LongListCell, LongListListEntry> {}
  class LongListListEntry extends AbstractTextFieldListListEntry<Long, LongListCell, LongListListEntry> {
    constructor(fieldName: Component, value: Long[], defaultExpanded: boolean, tooltipSupplier: Supplier<Optional<Component[]>>, saveConsumer: Consumer<Long[]>, defaultValue: Supplier<Long[]>, resetButtonKey: Component);

    constructor(fieldName: Component, value: Long[], defaultExpanded: boolean, tooltipSupplier: Supplier<Optional<Component[]>>, saveConsumer: Consumer<Long[]>, defaultValue: Supplier<Long[]>, resetButtonKey: Component, requiresRestart: boolean);

    constructor(fieldName: Component, value: Long[], defaultExpanded: boolean, tooltipSupplier: Supplier<Optional<Component[]>>, saveConsumer: Consumer<Long[]>, defaultValue: Supplier<Long[]>, resetButtonKey: Component, requiresRestart: boolean, deleteButtonEnabled: boolean, insertInFront: boolean);
    self(): LongListListEntry;
    setMaximum(maximum: number): LongListListEntry;
    setMinimum(minimum: number): LongListListEntry;
  }


  interface LongSliderEntry extends TooltipListEntry<Long> {}
  class LongSliderEntry extends TooltipListEntry<Long> {
    constructor(fieldName: Component, minimum: number, maximum: number, value: number, saveConsumer: Consumer<Long>, resetButtonKey: Component, defaultValue: Supplier<Long>);

    constructor(fieldName: Component, minimum: number, maximum: number, value: number, saveConsumer: Consumer<Long>, resetButtonKey: Component, defaultValue: Supplier<Long>, tooltipSupplier: Supplier<Optional<Component[]>>);

    constructor(fieldName: Component, minimum: number, maximum: number, value2: number, saveConsumer: Consumer<Long>, resetButtonKey: Component, defaultValue: Supplier<Long>, tooltipSupplier: Supplier<Optional<Component[]>>, requiresRestart: boolean);
    children(): GuiEventListener[];
    get defaultValue(): Optional<Long>;
    get textGetter(): Function<Long, Component>;
    get value(): Long;
    isEdited(): boolean;
    narratables(): NarratableEntry[];
    render(graphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, isHovered: boolean, delta: number): void;
    set textGetter(textGetter: Function<Long, Component>);
    set value(value: number);
    setMaximum(maximum: number): LongSliderEntry;
    setMinimum(minimum: number): LongSliderEntry;
  }


  interface MultiElementListEntry<T = any> extends Expandable, TooltipListEntry<T> {}
  class MultiElementListEntry<T = any> extends Expandable {
    constructor(categoryName: Component, object: T, entries: AbstractConfigListEntry<any>[], defaultExpanded: boolean);
    children(): GuiEventListener[];
    get categoryName(): Component;
    get defaultValue(): Optional<T>;
    get error(): Optional<Component>;
    get initialReferenceOffset(): number;
    get itemHeight(): number;
    get morePossibleHeight(): number;
    get searchTags(): Iterator<string>;
    get value(): T;
    getEntryArea(x: number, y: number, entryWidth: number, entryHeight: number): Rectangle;
    isEdited(): boolean;
    isExpanded(): boolean;
    isRequiresRestart(): boolean;
    lateRender(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    narratables(): NarratableEntry[];
    render(graphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, isHovered: boolean, delta: number): void;
    save(): void;
    setExpanded(expanded: boolean): void;
    setRequiresRestart(requiresRestart: boolean): void;
    updateSelected(isSelected: boolean): void;
  }


  interface NestedListListEntry<T = any, INNER extends AbstractConfigListEntry<T> = any> extends AbstractListListEntry<T, NestedListCell, NestedListListEntry> {}
  class NestedListListEntry<T = any, INNER extends AbstractConfigListEntry<T> = any> extends AbstractListListEntry<T, NestedListCell, NestedListListEntry> {
    constructor(fieldName: Component, value: T[], defaultExpanded: boolean, tooltipSupplier: Supplier<Optional<Component[]>>, saveConsumer: Consumer<T[]>, defaultValue: Supplier<T[]>, resetButtonKey: Component, deleteButtonEnabled: boolean, insertInFront: boolean, createNewCell: BiFunction<T, NestedListListEntry<T, INNER>, INNER>);
    get searchTags(): Iterator<string>;
    self(): NestedListListEntry<T, INNER>;
  }


  interface SelectionListEntry<T = any> extends TooltipListEntry<T> {}
  class SelectionListEntry<T = any> extends TooltipListEntry<T> {
    constructor(fieldName: Component, valuesArray: T[], value: T, resetButtonKey: Component, defaultValue: Supplier<T>, saveConsumer: Consumer<T>);

    constructor(fieldName: Component, valuesArray: T[], value: T, resetButtonKey: Component, defaultValue: Supplier<T>, saveConsumer: Consumer<T>, nameProvider: Function<T, Component>);

    constructor(fieldName: Component, valuesArray: T[], value: T, resetButtonKey: Component, defaultValue: Supplier<T>, saveConsumer: Consumer<T>, nameProvider: Function<T, Component>, tooltipSupplier: Supplier<Optional<Component[]>>);

    constructor(fieldName: Component, valuesArray: T[], value: T, resetButtonKey: Component, defaultValue: Supplier<T>, saveConsumer: Consumer<T>, nameProvider: Function<T, Component>, tooltipSupplier: Supplier<Optional<Component[]>>, requiresRestart: boolean);
    children(): GuiEventListener[];
    get defaultValue(): Optional<T>;
    get value(): T;
    isEdited(): boolean;
    narratables(): NarratableEntry[];
    render(graphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, isHovered: boolean, delta: number): void;
  }


  interface StringListEntry extends TextFieldListEntry<string> {}
  class StringListEntry extends TextFieldListEntry<string> {
    constructor(fieldName: Component, value: string, resetButtonKey: Component, defaultValue: Supplier<string>, saveConsumer: Consumer<string>);

    constructor(fieldName: Component, value: string, resetButtonKey: Component, defaultValue: Supplier<string>, saveConsumer: Consumer<string>, tooltipSupplier: Supplier<Optional<Component[]>>);

    constructor(fieldName: Component, value: string, resetButtonKey: Component, defaultValue: Supplier<string>, saveConsumer: Consumer<string>, tooltipSupplier: Supplier<Optional<Component[]>>, requiresRestart: boolean);
    get value(): string;
  }


  interface StringListListEntry extends AbstractTextFieldListListEntry<string, StringListCell, StringListListEntry> {}
  class StringListListEntry extends AbstractTextFieldListListEntry<string, StringListCell, StringListListEntry> {
    constructor(fieldName: Component, value: string[], defaultExpanded: boolean, tooltipSupplier: Supplier<Optional<Component[]>>, saveConsumer: Consumer<string[]>, defaultValue: Supplier<string[]>, resetButtonKey: Component);

    constructor(fieldName: Component, value: string[], defaultExpanded: boolean, tooltipSupplier: Supplier<Optional<Component[]>>, saveConsumer: Consumer<string[]>, defaultValue: Supplier<string[]>, resetButtonKey: Component, requiresRestart: boolean);

    constructor(fieldName: Component, value: string[], defaultExpanded: boolean, tooltipSupplier: Supplier<Optional<Component[]>>, saveConsumer: Consumer<string[]>, defaultValue: Supplier<string[]>, resetButtonKey: Component, requiresRestart: boolean, deleteButtonEnabled: boolean, insertInFront: boolean);
    self(): StringListListEntry;
  }


  interface SubCategoryListEntry extends Expandable, TooltipListEntry<List> {}
  class SubCategoryListEntry extends Expandable {
    constructor(categoryName: Component, entries: AbstractConfigListEntry[], defaultExpanded: boolean);
    children(): GuiEventListener[];
    filteredEntries(): AbstractConfigListEntry[];
    get(index: number): AbstractConfigListEntry;
    get categoryName(): Component;
    get defaultValue(): Optional<AbstractConfigListEntry[]>;
    get error(): Optional<Component>;
    get initialReferenceOffset(): number;
    get itemHeight(): number;
    get morePossibleHeight(): number;
    get searchTags(): Iterator<string>;
    get value(): AbstractConfigListEntry[];
    getEntryArea(x: number, y: number, entryWidth: number, entryHeight: number): Rectangle;
    isEdited(): boolean;
    isExpanded(): boolean;
    isRequiresRestart(): boolean;
    iterator(): Iterator<AbstractConfigListEntry>;
    lateRender(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    narratables(): NarratableEntry[];
    render(graphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, isHovered: boolean, delta: number): void;
    save(): void;
    setExpanded(expanded: boolean): void;
    setFocused(guiEventListener: GuiEventListener): void;
    setRequiresRestart(requiresRestart: boolean): void;
    size(): number;
    tick(): void;
    updateSelected(isSelected: boolean): void;
  }


  interface TextFieldListEntry<T = any> extends TooltipListEntry<T> {}
  class TextFieldListEntry<T = any> extends TooltipListEntry<T> {
    children(): GuiEventListener[];
    get defaultValue(): Optional<T>;
    insertText(string_1: string): void;
    isEdited(): boolean;
    narratables(): NarratableEntry[];
    render(graphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, isHovered: boolean, delta: number): void;
    renderWidget(graphics: GuiGraphics, int_1: number, int_2: number, float_1: number): void;
    setValue(s: string): void;
    updateSelected(isSelected: boolean): void;
  }


  interface TextListEntry extends TooltipListEntry<any> {}
  class TextListEntry extends TooltipListEntry<any> {
    static readonly LINE_HEIGHT: number;
    static readonly DISABLED_COLOR: number;
    constructor(fieldName: Component, text: Component);

    constructor(fieldName: Component, text: Component, color: number);

    constructor(fieldName: Component, text: Component, color: number, tooltipSupplier: Supplier<Optional<Component[]>>);
    children(): GuiEventListener[];
    get defaultValue(): Optional<any>;
    get itemHeight(): number;
    get value(): any;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    narratables(): NarratableEntry[];
    render(graphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, isHovered: boolean, delta: number): void;
  }


  interface TooltipListEntry<T = any> extends AbstractConfigListEntry<T> {}
  class TooltipListEntry<T = any> extends AbstractConfigListEntry<T> {
    constructor(fieldName: Component, tooltipSupplier: Supplier<Optional<Component[]>>);

    constructor(fieldName: Component, tooltipSupplier: Supplier<Optional<Component[]>>, requiresRestart: boolean);
    get tooltip(): Optional<Component[]>;
    get tooltipSupplier(): Supplier<Optional<Component[]>>;
    getTooltip(mouseX: number, mouseY: number): Optional<Component[]>;
    render(graphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, isHovered: boolean, delta: number): void;
    set tooltipSupplier(tooltipSupplier: Supplier<Optional<Component[]>>);
  }

}

declare module 'me.shedaniel.clothconfig2.gui.entries.AbstractListListEntry' {
  import { BaseListCell } from 'me.shedaniel.clothconfig2.gui.entries';

  interface AbstractListCell<T = any, SELF extends AbstractListCell<T, SELF, OUTER_SELF> = any, OUTER_SELF extends AbstractListListEntry<T, SELF, OUTER_SELF> = any> extends BaseListCell {}
  class AbstractListCell<T = any, SELF extends AbstractListCell<T, SELF, OUTER_SELF> = any, OUTER_SELF extends AbstractListListEntry<T, SELF, OUTER_SELF> = any> extends BaseListCell {
    constructor(value: T, listListEntry: OUTER_SELF);
    get value(): T;
  }

}

declare module 'me.shedaniel.clothconfig2.gui.entries.AbstractTextFieldListListEntry' {
  import { AbstractListCell } from 'me.shedaniel.clothconfig2.gui.entries.AbstractListListEntry';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { NarrationPriority } from 'NarratableEntry';
  import { NarrationElementOutput } from 'net.minecraft.client.gui.narration';

  interface AbstractTextFieldListCell<T = any, SELF extends AbstractTextFieldListCell<T, SELF, OUTER_SELF> = any, OUTER_SELF extends AbstractTextFieldListListEntry<T, SELF, OUTER_SELF> = any> extends AbstractListCell<T, SELF, OUTER_SELF> {}
  class AbstractTextFieldListCell<T = any, SELF extends AbstractTextFieldListCell<T, SELF, OUTER_SELF> = any, OUTER_SELF extends AbstractTextFieldListListEntry<T, SELF, OUTER_SELF> = any> extends AbstractListCell<T, SELF, OUTER_SELF> {
    constructor(value: T, listListEntry: OUTER_SELF);
    children(): GuiEventListener[];
    get cellHeight(): number;
    narrationPriority(): NarrationPriority;
    render(graphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, isSelected: boolean, delta: number): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
    updateSelected(isSelected: boolean): void;
  }

}

declare module 'me.shedaniel.clothconfig2.gui.entries.BaseListEntry' {
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';

  interface ListLabelWidget extends GuiEventListener {}
  class ListLabelWidget extends GuiEventListener {
    isFocused(): boolean;
    mouseClicked(mouseX: number, mouseY: number, int_1: number): boolean;
    setFocused(bl: boolean): void;
  }

}

declare module 'me.shedaniel.clothconfig2.gui.entries.DoubleListListEntry' {
  import { AbstractTextFieldListCell } from 'me.shedaniel.clothconfig2.gui.entries.AbstractTextFieldListListEntry';
  import { Double } from 'java.lang';
  import { DoubleListListEntry } from 'me.shedaniel.clothconfig2.gui.entries';
  import { Optional } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  interface DoubleListCell extends AbstractTextFieldListCell<number, DoubleListCell, DoubleListListEntry> {}
  class DoubleListCell extends AbstractTextFieldListCell<number, DoubleListCell, DoubleListListEntry> {
    constructor(value: number, listListEntry: DoubleListListEntry);
    get error(): Optional<Component>;
    get value(): number;
  }

}

declare module 'me.shedaniel.clothconfig2.gui.entries.DropdownBoxEntry' {
  import { AbstractContainerEventHandler, GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { DropdownBoxEntry } from 'me.shedaniel.clothconfig2.gui.entries';
  import { Rectangle } from 'me.shedaniel.math';
  import { GuiGraphics, ComponentPath } from 'net.minecraft.client.gui';
  import { List, Optional } from 'java.util';
  import { ImmutableList } from 'com.google.common.collect';
  import { FocusNavigationEvent } from 'net.minecraft.client.gui.navigation';
  import { Component } from 'net.minecraft.network.chat';
  import { Function } from 'java.util.function';

  interface SelectionElement<R = any> extends Renderable, AbstractContainerEventHandler {}
  class SelectionElement<R = any> extends Renderable {
    constructor(entry: DropdownBoxEntry<R>, bounds: Rectangle, menu: DropdownMenuElement<R>, topRenderer: SelectionTopCellElement<R>, cellCreator: SelectionCellCreator<R>);
    children(): GuiEventListener[];
    get morePossibleHeight(): number;
    get topRenderer(): SelectionTopCellElement<R>;
    get value(): R;
    lateRender(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    mouseClicked(double_1: number, double_2: number, int_1: number): boolean;
    mouseScrolled(double_1: number, double_2: number, amountX: number, amountY: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }


  interface DefaultDropdownMenuElement<R = any> extends DropdownMenuElement<R> {}
  class DefaultDropdownMenuElement<R = any> extends DropdownMenuElement<R> {
    constructor(selections: ImmutableList<R>);
    children(): SelectionCellElement<R>[];
    get height(): number;
    get maxScroll(): number;
    get selections(): ImmutableList<R>;
    initCells(): void;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    lateRender(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    mouseClicked(double_1: number, double_2: number, int_1: number): boolean;
    mouseDragged(double_1: number, double_2: number, int_1: number, double_3: number, double_4: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, amountX: number, amountY: number): boolean;
    offset(value: number, animated: boolean): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, rectangle: Rectangle, delta: number): void;
    scrollTo(value: number, animated: boolean): void;
    scrollTo(value: number, animated: boolean, duration: number): void;
    search(): void;
  }


  interface DropdownMenuElement<R = any> extends AbstractContainerEventHandler {}
  class DropdownMenuElement<R = any> extends AbstractContainerEventHandler {
    children(): SelectionCellElement<R>[];
    get cellCreator(): SelectionCellCreator<R>;
    get entry(): DropdownBoxEntry<R>;
    get height(): number;
    get selections(): ImmutableList<R>;
    initCells(): void;
    isExpanded(): boolean;
    isSuggestionMode(): boolean;
    lateRender(var1: GuiGraphics, var2: number, var3: number, var4: number): void;
    nextFocusPath(focusNavigationEvent: FocusNavigationEvent): ComponentPath;
    render(var1: GuiGraphics, var2: number, var3: number, var4: Rectangle, var5: number): void;
  }


  interface SelectionTopCellElement<R = any> extends AbstractContainerEventHandler {}
  class SelectionTopCellElement<R = any> extends AbstractContainerEventHandler {
    get configError(): Optional<Component>;
    get error(): Optional<Component>;
    get parent(): DropdownBoxEntry<R>;
    get preferredTextColor(): number;
    get searchTerm(): Component;
    get value(): R;
    hasConfigError(): boolean;
    hasError(): boolean;
    isEdited(): boolean;
    isSuggestionMode(): boolean;
    render(var1: GuiGraphics, var2: number, var3: number, var4: number, var5: number, var6: number, var7: number, var8: number): void;
    selectFirstRecommendation(): void;
    set value(var1: R);
  }


  class SelectionCellCreator<R = any> {
    create(var1: R): SelectionCellElement<R>;
    get cellHeight(): number;
    get cellWidth(): number;
    get dropBoxMaxHeight(): number;
  }


  interface DefaultSelectionTopCellElement<R = any> extends SelectionTopCellElement<R> {}
  class DefaultSelectionTopCellElement<R = any> extends SelectionTopCellElement<R> {
    constructor(value: R, toObjectFunction: Function<string, R>, toTextFunction: Function<R, Component>);
    charTyped(chr: string, keyCode: number): boolean;
    children(): GuiEventListener[];
    get error(): Optional<Component>;
    get searchTerm(): Component;
    get value(): R;
    isEdited(): boolean;
    keyPressed(int_1: number, int_2: number, int_3: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, x: number, y: number, width: number, height: number, delta: number): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    set value(value: R);
  }


  interface DefaultSelectionCellElement<R = any> extends SelectionCellElement<R> {}
  class DefaultSelectionCellElement<R = any> extends SelectionCellElement<R> {
    constructor(r: R, toTextFunction: Function<R, Component>);
    children(): GuiEventListener[];
    dontRender(graphics: GuiGraphics, delta: number): void;
    get searchKey(): Component;
    get selection(): R;
    mouseClicked(mouseX: number, mouseY: number, int_1: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, x: number, y: number, width: number, height: number, delta: number): void;
  }


  interface SelectionCellElement<R = any> extends AbstractContainerEventHandler {}
  class SelectionCellElement<R = any> extends AbstractContainerEventHandler {
    dontRender(var1: GuiGraphics, var2: number): void;
    get entry(): DropdownBoxEntry<R>;
    get searchKey(): Component;
    get selection(): R;
    render(var1: GuiGraphics, var2: number, var3: number, var4: number, var5: number, var6: number, var7: number, var8: number): void;
  }


  interface DefaultSelectionCellCreator<R = any> extends SelectionCellCreator<R> {}
  class DefaultSelectionCellCreator<R = any> extends SelectionCellCreator<R> {
    constructor(toTextFunction: Function<R, Component>);

    constructor();
    create(selection: R): SelectionCellElement<R>;
    get cellHeight(): number;
    get dropBoxMaxHeight(): number;
  }

}

declare module 'me.shedaniel.clothconfig2.gui.entries.FloatListListEntry' {
  import { AbstractTextFieldListCell } from 'me.shedaniel.clothconfig2.gui.entries.AbstractTextFieldListListEntry';
  import { Float } from 'java.lang';
  import { FloatListListEntry } from 'me.shedaniel.clothconfig2.gui.entries';
  import { Optional } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  interface FloatListCell extends AbstractTextFieldListCell<number, FloatListCell, FloatListListEntry> {}
  class FloatListCell extends AbstractTextFieldListCell<number, FloatListCell, FloatListListEntry> {
    constructor(value: number, listListEntry: FloatListListEntry);
    get error(): Optional<Component>;
    get value(): number;
  }

}

declare module 'me.shedaniel.clothconfig2.gui.entries.IntegerListListEntry' {
  import { AbstractTextFieldListCell } from 'me.shedaniel.clothconfig2.gui.entries.AbstractTextFieldListListEntry';
  import { Integer } from 'java.lang';
  import { IntegerListListEntry } from 'me.shedaniel.clothconfig2.gui.entries';
  import { Optional } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  interface IntegerListCell extends AbstractTextFieldListCell<number, IntegerListCell, IntegerListListEntry> {}
  class IntegerListCell extends AbstractTextFieldListCell<number, IntegerListCell, IntegerListListEntry> {
    constructor(value: number, listListEntry: IntegerListListEntry);
    get error(): Optional<Component>;
    get value(): number;
  }

}

declare module 'me.shedaniel.clothconfig2.gui.entries.LongListListEntry' {
  import { AbstractTextFieldListCell } from 'me.shedaniel.clothconfig2.gui.entries.AbstractTextFieldListListEntry';
  import { Long } from 'java.lang';
  import { LongListListEntry } from 'me.shedaniel.clothconfig2.gui.entries';
  import { Optional } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  interface LongListCell extends AbstractTextFieldListCell<Long, LongListCell, LongListListEntry> {}
  class LongListCell extends AbstractTextFieldListCell<Long, LongListCell, LongListListEntry> {
    constructor(value: Long, listListEntry: LongListListEntry);
    get error(): Optional<Component>;
    get value(): Long;
  }

}

declare module 'me.shedaniel.clothconfig2.gui.entries.MultiElementListEntry' {
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { NarratableEntry, NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { NarrationPriority } from 'NarratableEntry';

  interface CategoryLabelWidget extends GuiEventListener, NarratableEntry {}
  class CategoryLabelWidget extends GuiEventListener {
    isFocused(): boolean;
    mouseClicked(mouseX: number, mouseY: number, int_1: number): boolean;
    narrationPriority(): NarrationPriority;
    setFocused(bl: boolean): void;
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
  }

}

declare module 'me.shedaniel.clothconfig2.gui.entries.NestedListListEntry' {
  import { AbstractListCell } from 'me.shedaniel.clothconfig2.gui.entries.AbstractListListEntry';
  import { NestedListListEntry } from 'me.shedaniel.clothconfig2.gui.entries';
  import { ReferenceProvider, AbstractConfigEntry } from 'me.shedaniel.clothconfig2.api';
  import { Optional, List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { NarrationPriority } from 'NarratableEntry';
  import { NarrationElementOutput } from 'net.minecraft.client.gui.narration';

  interface NestedListCell<T = any, INNER extends AbstractConfigListEntry<T> = any> extends ReferenceProvider<T>, AbstractListCell<T, NestedListCell, NestedListListEntry> {}
  class NestedListCell<T = any, INNER extends AbstractConfigListEntry<T> = any> extends ReferenceProvider<T> {
    constructor(value: T, listListEntry: NestedListListEntry<T, INNER>, nestedEntry: INNER);
    children(): GuiEventListener[];
    get cellHeight(): number;
    get error(): Optional<Component>;
    get value(): T;
    isEdited(): boolean;
    isRequiresRestart(): boolean;
    narrationPriority(): NarrationPriority;
    onAdd(): void;
    onDelete(): void;
    provideReferenceEntry(): AbstractConfigEntry<T>;
    render(graphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, isSelected: boolean, delta: number): void;
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
    updateSelected(isSelected: boolean): void;
  }

}

declare module 'me.shedaniel.clothconfig2.gui.entries.SelectionListEntry' {
  class Translatable {
    get key(): string;
  }

}

declare module 'me.shedaniel.clothconfig2.gui.entries.StringListListEntry' {
  import { AbstractTextFieldListCell } from 'me.shedaniel.clothconfig2.gui.entries.AbstractTextFieldListListEntry';
  import { StringListListEntry } from 'me.shedaniel.clothconfig2.gui.entries';
  import { Optional } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  interface StringListCell extends AbstractTextFieldListCell<string, StringListCell, StringListListEntry> {}
  class StringListCell extends AbstractTextFieldListCell<string, StringListCell, StringListListEntry> {
    constructor(value: string, listListEntry: StringListListEntry);
    get error(): Optional<Component>;
    get value(): string;
  }

}

declare module 'me.shedaniel.clothconfig2.gui.entries.SubCategoryListEntry' {
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { NarratableEntry, NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { NarrationPriority } from 'NarratableEntry';

  interface CategoryLabelWidget extends GuiEventListener, NarratableEntry {}
  class CategoryLabelWidget extends GuiEventListener {
    isFocused(): boolean;
    mouseClicked(mouseX: number, mouseY: number, int_1: number): boolean;
    narrationPriority(): NarrationPriority;
    setFocused(bl: boolean): void;
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
  }

}

declare module 'me.shedaniel.clothconfig2.gui.widget' {
  import { AbstractWidget, EditBox, Renderable } from 'net.minecraft.client.gui.components';
  import { GuiGraphics, ComponentPath } from 'net.minecraft.client.gui';
  import { NarrationElementOutput, NarratableEntry } from 'net.minecraft.client.gui.narration';
  import { Minecraft } from 'net.minecraft.client';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { FocusNavigationEvent, ScreenRectangle } from 'net.minecraft.client.gui.navigation';
  import { GuiEventListener, AbstractContainerEventHandler } from 'net.minecraft.client.gui.components.events';
  import { NarrationPriority } from 'NarratableEntry';
  import { List, Iterator, Optional } from 'java.util';
  import { AbstractConfigListEntry, ConfigScreen, AbstractConfigEntry } from 'me.shedaniel.clothconfig2.api';
  import { ListWidget } from 'me.shedaniel.clothconfig2.gui.ClothConfigScreen';

  interface ColorDisplayWidget extends AbstractWidget {}
  class ColorDisplayWidget extends AbstractWidget {
    constructor(textFieldWidget: EditBox, x: number, y: number, size: number, color: number);
    onClick(mouseX: number, mouseY: number): void;
    onRelease(mouseX: number, mouseY: number): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    setColor(color: number): void;
    updateWidgetNarration(narrationElementOutput: NarrationElementOutput): void;
  }


  interface DynamicElementListWidget<E extends ElementEntry<E> = any> extends DynamicSmoothScrollingEntryListWidget<E> {}
  class DynamicElementListWidget<E extends ElementEntry<E> = any> extends DynamicSmoothScrollingEntryListWidget<E> {
    constructor(client: Minecraft, width: number, height: number, top: number, bottom: number, backgroundLocation: ResourceLocation);
    narrationPriority(): NarrationPriority;
    nextFocusPath(focusNavigationEvent: FocusNavigationEvent): ComponentPath;
    setFocused(guiEventListener: GuiEventListener): void;
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
  }


  interface DynamicEntryListWidget<E extends Entry<E> = any> extends Renderable, NarratableEntry, AbstractContainerEventHandler {}
  class DynamicEntryListWidget<E extends Entry<E> = any> extends Renderable {
    static readonly VERTICAL_HEADER_SEPARATOR: ResourceLocation;
    static readonly VERTICAL_FOOTER_SEPARATOR: ResourceLocation;
    width: number;
    height: number;
    top: number;
    bottom: number;
    right: number;
    left: number;
    constructor(client: Minecraft, width: number, height: number, top: number, bottom: number, backgroundLocation: ResourceLocation);
    capYPosition(double_1: number): void;
    children(): E[];
    ensureVisible(rowTop: number, itemHeight: number): void;
    get focused(): E;
    get itemWidth(): number;
    get rectangle(): ScreenRectangle;
    get scroll(): number;
    get scrollBottom(): number;
    get selectedItem(): E;
    getRowTop(index: number): number;
    isFocused(): boolean;
    isMouseOver(double_1: number, double_2: number): boolean;
    keyPressed(int_1: number, int_2: number, int_3: number): boolean;
    mouseClicked(double_1: number, double_2: number, int_1: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, deltaX: number, deltaY: number): boolean;
    mouseReleased(double_1: number, double_2: number, int_1: number): boolean;
    mouseScrolled(double_1: number, double_2: number, amountX: number, amountY: number): boolean;
    narrationPriority(): NarrationPriority;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    selectItem(item: E): void;
    set focused(guiEventListener: GuiEventListener);
    setLeftPos(left: number): void;
    setRenderSelection(boolean_1: boolean): void;
    tickList(): void;
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
    updateSize(width: number, height: number, top: number, bottom: number): void;
    visibleChildren(): E[];
  }


  interface DynamicNewSmoothScrollingEntryListWidget<E extends Entry<E> = any> extends DynamicEntryListWidget<E> {}
  class DynamicNewSmoothScrollingEntryListWidget<E extends Entry<E> = any> extends DynamicEntryListWidget<E> {
    constructor(client: Minecraft, width: number, height: number, top: number, bottom: number, backgroundLocation: ResourceLocation);
    capYPosition(double_1: number): void;
    isSmoothScrolling(): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, deltaX: number, deltaY: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, amountX: number, amountY: number): boolean;
    offset(value: number, animated: boolean): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    scrollTo(value: number, animated: boolean): void;
    scrollTo(value: number, animated: boolean, duration: number): void;
    setSmoothScrolling(smoothScrolling: boolean): void;
  }


  interface DynamicSmoothScrollingEntryListWidget<E extends Entry<E> = any> extends DynamicEntryListWidget<E> {}
  class DynamicSmoothScrollingEntryListWidget<E extends Entry<E> = any> extends DynamicEntryListWidget<E> {
    constructor(client: Minecraft, width: number, height: number, top: number, bottom: number, backgroundLocation: ResourceLocation);
    capYPosition(scroll: number): void;
    isSmoothScrolling(): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, deltaX: number, deltaY: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, amountX: number, amountY: number): boolean;
    offset(value: number, animated: boolean): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    scrollTo(value: number, animated: boolean): void;
    scrollTo(value: number, animated: boolean, duration: number): void;
    setSmoothScrolling(smoothScrolling: boolean): void;
  }


  interface SearchFieldEntry extends AbstractConfigListEntry<any> {}
  class SearchFieldEntry extends AbstractConfigListEntry<any> {
    constructor(screen: ConfigScreen, listWidget: ListWidget<AbstractConfigEntry<AbstractConfigEntry<any>>>);
    add(index: number, element: AbstractConfigEntry<AbstractConfigEntry<any>>): void;
    children(): GuiEventListener[];
    clear(): void;
    get(index: number): AbstractConfigEntry<AbstractConfigEntry<any>>;
    get defaultValue(): Optional<any>;
    get value(): any;
    iterator(): Iterator<AbstractConfigEntry<AbstractConfigEntry<any>>>;
    matchesSearch(tags: Iterator<string>): boolean;
    narratables(): NarratableEntry[];
    remove(index: number): AbstractConfigEntry<AbstractConfigEntry<any>>;
    remove(o: any): boolean;
    render(graphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, isHovered: boolean, delta: number): void;
    size(): number;
  }

}

declare module 'me.shedaniel.clothconfig2.gui.widget.DynamicElementListWidget' {
  import { Entry } from 'me.shedaniel.clothconfig2.gui.widget.DynamicEntryListWidget';
  import { ContainerEventHandler, GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { NarratableEntry, NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { ComponentPath } from 'net.minecraft.client.gui';
  import { FocusNavigationEvent } from 'net.minecraft.client.gui.navigation';
  import { List } from 'java.util';
  import { NarrationPriority } from 'NarratableEntry';

  interface ElementEntry<E extends ElementEntry<E> = any> extends ContainerEventHandler, NarratableEntry, Entry<E> {}
  class ElementEntry<E extends ElementEntry<E> = any> extends ContainerEventHandler {
    charTyped(c: string, i: number): boolean;
    focusPathAtIndex(focusNavigationEvent: FocusNavigationEvent, i: number): ComponentPath;
    get focused(): GuiEventListener;
    isActive(): boolean;
    isDragging(): boolean;
    keyPressed(i: number, j: number, k: number): boolean;
    keyReleased(i: number, j: number, k: number): boolean;
    mouseClicked(d: number, e: number, i: number): boolean;
    mouseDragged(d: number, e: number, i: number, f: number, g: number): boolean;
    mouseReleased(d: number, e: number, i: number): boolean;
    mouseScrolled(d: number, e: number, amountX: number, amountY: number): boolean;
    narratables(): NarratableEntry[];
    narrationPriority(): NarrationPriority;
    nextFocusPath(focusNavigationEvent: FocusNavigationEvent): ComponentPath;
    set focused(guiEventListener: GuiEventListener);
    setDragging(bl: boolean): void;
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
  }

}

declare module 'me.shedaniel.clothconfig2.gui.widget.DynamicEntryListWidget' {
  import { AbstractList, List } from 'java.util';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { TickableWidget, HideableWidget, DisableableWidget, Requirement } from 'me.shedaniel.clothconfig2.api';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { DynamicEntryListWidget } from 'me.shedaniel.clothconfig2.gui.widget';
  import { NarratableEntry } from 'net.minecraft.client.gui.narration';

  interface Entries extends AbstractList<E> {}
  class Entries extends AbstractList<E> {
    add(int_1: number, itemListWidget$Item_1: E): void;
    clear(): void;
    get(int_1: number): E;
    remove(int_1: number): E;
    set(int_1: number, itemListWidget$Item_1: E): E;
    size(): number;
  }


  interface Entry<E extends Entry<E> = any> extends GuiEventListener, TickableWidget, HideableWidget, DisableableWidget {}
  class Entry<E extends Entry<E> = any> extends GuiEventListener {
    get displayRequirement(): Requirement;
    get itemHeight(): number;
    get morePossibleHeight(): number;
    get parent(): DynamicEntryListWidget<E>;
    get requirement(): Requirement;
    isDisplayed(): boolean;
    isEnabled(): boolean;
    isMouseOver(double_1: number, double_2: number): boolean;
    narratables(): NarratableEntry[];
    render(var1: GuiGraphics, var2: number, var3: number, var4: number, var5: number, var6: number, var7: number, var8: number, var9: boolean, var10: number): void;
    set displayRequirement(requirement: Requirement);
    set parent(parent: DynamicEntryListWidget<E>);
    set requirement(requirement: Requirement);
    tick(): void;
  }


  class SmoothScrollingSettings {
    static readonly CLAMP_EXTENSION: number;
  }

}

declare module 'me.shedaniel.clothconfig2.gui.widget.DynamicNewSmoothScrollingEntryListWidget' {
  class Precision {
    static readonly FLOAT_EPSILON: number;
    static readonly DOUBLE_EPSILON: number;
    static almostEquals(value1: number, value2: number, acceptableDifference: number): boolean;
    static almostEquals(value1: number, value2: number, acceptableDifference: number): boolean;
  }


  class Interpolation {
    static expoEase(start: number, end: number, amount: number): number;
  }

}

declare module 'me.shedaniel.clothconfig2.gui.widget.DynamicSmoothScrollingEntryListWidget' {
  class Precision {
    static readonly FLOAT_EPSILON: number;
    static readonly DOUBLE_EPSILON: number;
    static almostEquals(value1: number, value2: number, acceptableDifference: number): boolean;
    static almostEquals(value1: number, value2: number, acceptableDifference: number): boolean;
  }


  class Interpolation {
    static expoEase(start: number, end: number, amount: number): number;
  }

}

declare module 'me.shedaniel.clothconfig2.impl.builders' {
  import { Supplier, Function, Consumer } from 'java.util.function';
  import { Optional, List, Iterator, Collection, ListIterator } from 'java.util';
  import { Component, TextColor } from 'net.minecraft.network.chat';
  import { Boolean, Integer, Double, Iterable, Class, Enum, Float, Long } from 'java.lang';
  import { BooleanListEntry, ColorEntry, DoubleListEntry, DoubleListListEntry, DropdownBoxEntry, EnumListEntry, FloatListEntry, FloatListListEntry, IntegerListEntry, IntegerListListEntry, IntegerSliderEntry, KeyCodeEntry, LongListEntry, LongListListEntry, LongSliderEntry, SelectionListEntry, StringListEntry, StringListListEntry, SubCategoryListEntry, TextListEntry } from 'me.shedaniel.clothconfig2.gui.entries';
  import { Color } from 'me.shedaniel.math';
  import { DoubleListCell } from 'me.shedaniel.clothconfig2.gui.entries.DoubleListListEntry';
  import { SelectionTopCellElement, SelectionCellCreator } from 'me.shedaniel.clothconfig2.gui.entries.DropdownBoxEntry';
  import { AbstractConfigListEntry, Requirement, ModifierKeyCode } from 'me.shedaniel.clothconfig2.api';
  import { FloatListCell } from 'me.shedaniel.clothconfig2.gui.entries.FloatListListEntry';
  import { IntegerListCell } from 'me.shedaniel.clothconfig2.gui.entries.IntegerListListEntry';
  import { Key } from 'InputConstants';
  import { LongListCell } from 'me.shedaniel.clothconfig2.gui.entries.LongListListEntry';
  import { StringListCell } from 'me.shedaniel.clothconfig2.gui.entries.StringListListEntry';

  interface AbstractFieldBuilder<T = any, A extends AbstractConfigListEntry = any, SELF extends FieldBuilder<T, A, SELF> = any> extends FieldBuilder<T, A, SELF> {}
  class AbstractFieldBuilder<T = any, A extends AbstractConfigListEntry = any, SELF extends FieldBuilder<T, A, SELF> = any> extends FieldBuilder<T, A, SELF> {
    get saveConsumer(): Consumer<T>;
    get tooltipSupplier(): Function<T, Optional<Component[]>>;
    requireRestart(): SELF;
    requireRestart(requireRestart: boolean): void;
    set saveConsumer(saveConsumer: Consumer<T>);
    set tooltipSupplier(tooltipSupplier: Function<T, Optional<Component[]>>);
    setDefaultValue(defaultValue: Supplier<T>): SELF;
    setDefaultValue(defaultValue: T): SELF;
    setErrorSupplier(errorSupplier: Function<T, Optional<Component>>): SELF;
    setTooltip(tooltip: Optional<Component[]>): SELF;
    setTooltip(...tooltip: Component[]): SELF;
    setTooltipSupplier(tooltipSupplier: Supplier<Optional<Component[]>>): SELF;
  }


  interface AbstractListBuilder<T = any, A extends AbstractConfigListEntry = any, SELF extends AbstractListBuilder<T, A, SELF> = any> extends AbstractFieldBuilder<List, A, SELF> {}
  class AbstractListBuilder<T = any, A extends AbstractConfigListEntry = any, SELF extends AbstractListBuilder<T, A, SELF> = any> extends AbstractFieldBuilder<List, A, SELF> {
    get addTooltip(): Component;
    get cellErrorSupplier(): Function<T, Optional<Component>>;
    get removeTooltip(): Component;
    isDeleteButtonEnabled(): boolean;
    isExpanded(): boolean;
    isInsertButtonEnabled(): boolean;
    isInsertInFront(): boolean;
    set cellErrorSupplier(cellErrorSupplier: Function<T, Optional<Component>>);
    setAddButtonTooltip(addTooltip: Component): SELF;
    setDeleteButtonEnabled(deleteButtonEnabled: boolean): SELF;
    setExpanded(expanded: boolean): SELF;
    setInsertButtonEnabled(insertButtonEnabled: boolean): SELF;
    setInsertInFront(insertInFront: boolean): SELF;
    setRemoveButtonTooltip(removeTooltip: Component): SELF;
  }


  interface AbstractRangeFieldBuilder<T = any, A extends AbstractConfigListEntry = any, SELF extends FieldBuilder<T, A, SELF> = any> extends AbstractFieldBuilder<T, A, SELF> {}
  class AbstractRangeFieldBuilder<T = any, A extends AbstractConfigListEntry = any, SELF extends FieldBuilder<T, A, SELF> = any> extends AbstractFieldBuilder<T, A, SELF> {
    removeMax(): SELF;
    removeMin(): SELF;
    setMax(max: T): SELF;
    setMin(min: T): SELF;
  }


  interface AbstractRangeListBuilder<T = any, A extends AbstractConfigListEntry = any, SELF extends AbstractRangeListBuilder<T, A, SELF> = any> extends AbstractListBuilder<T, A, SELF> {}
  class AbstractRangeListBuilder<T = any, A extends AbstractConfigListEntry = any, SELF extends AbstractRangeListBuilder<T, A, SELF> = any> extends AbstractListBuilder<T, A, SELF> {
    removeMax(): SELF;
    removeMin(): SELF;
    setMax(max: T): SELF;
    setMin(min: T): SELF;
  }


  interface AbstractSliderFieldBuilder<T = any, A extends AbstractConfigListEntry = any, SELF extends FieldBuilder<T, A, SELF> = any> extends AbstractRangeFieldBuilder<T, A, SELF> {}
  class AbstractSliderFieldBuilder<T = any, A extends AbstractConfigListEntry = any, SELF extends FieldBuilder<T, A, SELF> = any> extends AbstractRangeFieldBuilder<T, A, SELF> {
    setMax(max: T): SELF;
    setMin(min: T): SELF;
    setTextGetter(textGetter: Function<T, Component>): SELF;
  }


  interface BooleanToggleBuilder extends AbstractFieldBuilder<boolean, BooleanListEntry, BooleanToggleBuilder> {}
  class BooleanToggleBuilder extends AbstractFieldBuilder<boolean, BooleanListEntry, BooleanToggleBuilder> {
    constructor(resetButtonKey: Component, fieldNameKey: Component, value: boolean);
    build(): BooleanListEntry;
    get yesNoTextSupplier(): Function<boolean, Component>;
    getYesNoText(bool: boolean): Component;
    requireRestart(): BooleanToggleBuilder;
    requireRestart(requireRestart: boolean): void;
    set yesNoTextSupplier(yesNoTextSupplier: Function<boolean, Component>);
    setDefaultValue(defaultValue: Supplier<boolean>): BooleanToggleBuilder;
    setDefaultValue(defaultValue: boolean): BooleanToggleBuilder;
    setErrorSupplier(errorSupplier: Function<boolean, Optional<Component>>): BooleanToggleBuilder;
    setSaveConsumer(saveConsumer: Consumer<boolean>): BooleanToggleBuilder;
    setTooltip(tooltip: Optional<Component[]>): BooleanToggleBuilder;
    setTooltip(...tooltip: Component[]): BooleanToggleBuilder;
    setTooltipSupplier(tooltipSupplier: Function<boolean, Optional<Component[]>>): BooleanToggleBuilder;
    setTooltipSupplier(tooltipSupplier: Supplier<Optional<Component[]>>): BooleanToggleBuilder;
  }


  interface ColorFieldBuilder extends AbstractFieldBuilder<number, ColorEntry, ColorFieldBuilder> {}
  class ColorFieldBuilder extends AbstractFieldBuilder<number, ColorEntry, ColorFieldBuilder> {
    constructor(resetButtonKey: Component, fieldNameKey: Component, value: number);
    build(): ColorEntry;
    requireRestart(): ColorFieldBuilder;
    requireRestart(requireRestart: boolean): void;
    setAlphaMode(withAlpha: boolean): ColorFieldBuilder;
    setDefaultValue(defaultValue: Supplier<number>): ColorFieldBuilder;
    setDefaultValue(defaultValue: number): ColorFieldBuilder;
    setDefaultValue(defaultValue: TextColor): ColorFieldBuilder;
    setDefaultValue2(defaultValue: Supplier<Color>): ColorFieldBuilder;
    setDefaultValue3(defaultValue: Supplier<TextColor>): ColorFieldBuilder;
    setErrorSupplier(errorSupplier: Function<number, Optional<Component>>): ColorFieldBuilder;
    setSaveConsumer(saveConsumer: Consumer<number>): ColorFieldBuilder;
    setSaveConsumer2(saveConsumer: Consumer<Color>, integer: T): ColorFieldBuilder;
    setSaveConsumer3(saveConsumer: Consumer<TextColor>, integer: T): ColorFieldBuilder;
    setTooltip(tooltip: Optional<Component[]>): ColorFieldBuilder;
    setTooltip(...tooltip: Component[]): ColorFieldBuilder;
    setTooltipSupplier(tooltipSupplier: Supplier<Optional<Component[]>>): ColorFieldBuilder;
    setTooltipSupplier(tooltipSupplier: Function<number, Optional<Component[]>>): ColorFieldBuilder;
  }


  interface DoubleFieldBuilder extends AbstractRangeFieldBuilder<number, DoubleListEntry, DoubleFieldBuilder> {}
  class DoubleFieldBuilder extends AbstractRangeFieldBuilder<number, DoubleListEntry, DoubleFieldBuilder> {
    constructor(resetButtonKey: Component, fieldNameKey: Component, value: number);
    build(): DoubleListEntry;
    removeMax(): DoubleFieldBuilder;
    removeMin(): DoubleFieldBuilder;
    requireRestart(): DoubleFieldBuilder;
    requireRestart(requireRestart: boolean): void;
    setDefaultValue(defaultValue: Supplier<number>): DoubleFieldBuilder;
    setDefaultValue(defaultValue: number): DoubleFieldBuilder;
    setErrorSupplier(errorSupplier: Function<number, Optional<Component>>): DoubleFieldBuilder;
    setMax(max: number): DoubleFieldBuilder;
    setMin(min: number): DoubleFieldBuilder;
    setSaveConsumer(saveConsumer: Consumer<number>): DoubleFieldBuilder;
    setTooltip(tooltip: Optional<Component[]>): DoubleFieldBuilder;
    setTooltip(...tooltip: Component[]): DoubleFieldBuilder;
    setTooltipSupplier(tooltipSupplier: Function<number, Optional<Component[]>>): DoubleFieldBuilder;
    setTooltipSupplier(tooltipSupplier: Supplier<Optional<Component[]>>): DoubleFieldBuilder;
  }


  interface DoubleListBuilder extends AbstractRangeListBuilder<number, DoubleListListEntry, DoubleListBuilder> {}
  class DoubleListBuilder extends AbstractRangeListBuilder<number, DoubleListListEntry, DoubleListBuilder> {
    constructor(resetButtonKey: Component, fieldNameKey: Component, value: number[]);
    build(): DoubleListListEntry;
    get cellErrorSupplier(): Function<number, Optional<Component>>;
    removeMax(): DoubleListBuilder;
    removeMin(): DoubleListBuilder;
    requireRestart(): DoubleListBuilder;
    requireRestart(requireRestart: boolean): void;
    set cellErrorSupplier(cellErrorSupplier: Function<number, Optional<Component>>);
    setAddButtonTooltip(addTooltip: Component): DoubleListBuilder;
    setCreateNewInstance(createNewInstance: Function<DoubleListListEntry, DoubleListCell>): DoubleListBuilder;
    setDefaultValue(defaultValue: Supplier<number[]>): DoubleListBuilder;
    setDefaultValue(defaultValue: number[]): DoubleListBuilder;
    setDeleteButtonEnabled(deleteButtonEnabled: boolean): DoubleListBuilder;
    setErrorSupplier(errorSupplier: Function<number[], Optional<Component>>): DoubleListBuilder;
    setExpanded(expanded: boolean): DoubleListBuilder;
    setInsertInFront(insertInFront: boolean): DoubleListBuilder;
    setMax(max: number): DoubleListBuilder;
    setMin(min: number): DoubleListBuilder;
    setRemoveButtonTooltip(removeTooltip: Component): DoubleListBuilder;
    setSaveConsumer(saveConsumer: Consumer<number[]>): DoubleListBuilder;
    setTooltip(tooltip: Optional<Component[]>): DoubleListBuilder;
    setTooltip(...tooltip: Component[]): DoubleListBuilder;
    setTooltipSupplier(tooltipSupplier: Function<number[], Optional<Component[]>>): DoubleListBuilder;
    setTooltipSupplier(tooltipSupplier: Supplier<Optional<Component[]>>): DoubleListBuilder;
  }


  interface DropdownMenuBuilder<T = any> extends FieldBuilder<T, DropdownBoxEntry, DropdownMenuBuilder> {}
  class DropdownMenuBuilder<T = any> extends FieldBuilder<T, DropdownBoxEntry, DropdownMenuBuilder> {
    constructor(resetButtonKey: Component, fieldNameKey: Component, topCellElement: SelectionTopCellElement<T>, cellCreator: SelectionCellCreator<T>);
    build(): DropdownBoxEntry<T>;
    isSuggestionMode(): boolean;
    requireRestart(): DropdownMenuBuilder<T>;
    requireRestart(requireRestart: boolean): void;
    setDefaultValue(defaultValue: Supplier<T>): DropdownMenuBuilder<T>;
    setDefaultValue(defaultValue: T): DropdownMenuBuilder<T>;
    setErrorSupplier(errorSupplier: Function<T, Optional<Component>>): DropdownMenuBuilder<T>;
    setSaveConsumer(saveConsumer: Consumer<T>): DropdownMenuBuilder<T>;
    setSelections(selections: Iterable<T>): DropdownMenuBuilder<T>;
    setSuggestionMode(suggestionMode: boolean): DropdownMenuBuilder<T>;
    setTooltip(tooltip: Optional<Component[]>): DropdownMenuBuilder<T>;
    setTooltip(...tooltip: Component[]): DropdownMenuBuilder<T>;
    setTooltipSupplier(tooltipSupplier: Supplier<Optional<Component[]>>): DropdownMenuBuilder<T>;
    setTooltipSupplier(tooltipSupplier: Function<T, Optional<Component[]>>): DropdownMenuBuilder<T>;
  }


  interface EnumSelectorBuilder<T extends Enum<any> = any> extends AbstractFieldBuilder<T, EnumListEntry, EnumSelectorBuilder> {}
  class EnumSelectorBuilder<T extends Enum<any> = any> extends AbstractFieldBuilder<T, EnumListEntry, EnumSelectorBuilder> {
    constructor(resetButtonKey: Component, fieldNameKey: Component, clazz: Class<T>, value: T);
    build(): EnumListEntry<T>;
    requireRestart(): EnumSelectorBuilder<T>;
    requireRestart(requireRestart: boolean): void;
    setDefaultValue(defaultValue: Supplier<T>): EnumSelectorBuilder<T>;
    setDefaultValue(defaultValue: T): EnumSelectorBuilder<T>;
    setEnumNameProvider(enumNameProvider: Function<Enum, Component>): EnumSelectorBuilder<T>;
    setErrorSupplier(errorSupplier: Function<T, Optional<Component>>): EnumSelectorBuilder<T>;
    setSaveConsumer(saveConsumer: Consumer<T>): EnumSelectorBuilder<T>;
    setTooltip(tooltip: Optional<Component[]>): EnumSelectorBuilder<T>;
    setTooltip(...tooltip: Component[]): EnumSelectorBuilder<T>;
    setTooltipSupplier(tooltipSupplier: Function<T, Optional<Component[]>>): EnumSelectorBuilder<T>;
    setTooltipSupplier(tooltipSupplier: Supplier<Optional<Component[]>>): EnumSelectorBuilder<T>;
  }


  class FieldBuilder<T = any, A extends AbstractConfigListEntry = any, SELF extends FieldBuilder<T, A, SELF> = any> {
    build(): A;
    buildEntry(): AbstractConfigListEntry;
    get defaultValue(): Supplier<T>;
    get fieldNameKey(): Component;
    get resetButtonKey(): Component;
    isRequireRestart(): boolean;
    requireRestart(requireRestart: boolean): void;
    setDisplayRequirement(requirement: Requirement): SELF;
    setRequirement(requirement: Requirement): SELF;
  }


  interface FloatFieldBuilder extends AbstractRangeFieldBuilder<number, FloatListEntry, FloatFieldBuilder> {}
  class FloatFieldBuilder extends AbstractRangeFieldBuilder<number, FloatListEntry, FloatFieldBuilder> {
    constructor(resetButtonKey: Component, fieldNameKey: Component, value: number);
    build(): FloatListEntry;
    removeMax(): FloatFieldBuilder;
    removeMin(): FloatFieldBuilder;
    requireRestart(): FloatFieldBuilder;
    requireRestart(requireRestart: boolean): void;
    setDefaultValue(defaultValue: Supplier<number>): FloatFieldBuilder;
    setDefaultValue(defaultValue: number): FloatFieldBuilder;
    setErrorSupplier(errorSupplier: Function<number, Optional<Component>>): FloatFieldBuilder;
    setMax(max: number): FloatFieldBuilder;
    setMin(min: number): FloatFieldBuilder;
    setSaveConsumer(saveConsumer: Consumer<number>): FloatFieldBuilder;
    setTooltip(tooltip: Optional<Component[]>): FloatFieldBuilder;
    setTooltip(...tooltip: Component[]): FloatFieldBuilder;
    setTooltipSupplier(tooltipSupplier: Function<number, Optional<Component[]>>): FloatFieldBuilder;
    setTooltipSupplier(tooltipSupplier: Supplier<Optional<Component[]>>): FloatFieldBuilder;
  }


  interface FloatListBuilder extends AbstractRangeListBuilder<number, FloatListListEntry, FloatListBuilder> {}
  class FloatListBuilder extends AbstractRangeListBuilder<number, FloatListListEntry, FloatListBuilder> {
    constructor(resetButtonKey: Component, fieldNameKey: Component, value: number[]);
    build(): FloatListListEntry;
    get cellErrorSupplier(): Function<number, Optional<Component>>;
    removeMax(): FloatListBuilder;
    removeMin(): FloatListBuilder;
    requireRestart(): FloatListBuilder;
    requireRestart(requireRestart: boolean): void;
    set cellErrorSupplier(cellErrorSupplier: Function<number, Optional<Component>>);
    setAddButtonTooltip(addTooltip: Component): FloatListBuilder;
    setCreateNewInstance(createNewInstance: Function<FloatListListEntry, FloatListCell>): FloatListBuilder;
    setDefaultValue(defaultValue: Supplier<number[]>): FloatListBuilder;
    setDefaultValue(defaultValue: number[]): FloatListBuilder;
    setDeleteButtonEnabled(deleteButtonEnabled: boolean): FloatListBuilder;
    setErrorSupplier(errorSupplier: Function<number[], Optional<Component>>): FloatListBuilder;
    setExpanded(expanded: boolean): FloatListBuilder;
    setInsertInFront(insertInFront: boolean): FloatListBuilder;
    setMax(max: number): FloatListBuilder;
    setMin(min: number): FloatListBuilder;
    setRemoveButtonTooltip(removeTooltip: Component): FloatListBuilder;
    setSaveConsumer(saveConsumer: Consumer<number[]>): FloatListBuilder;
    setTooltip(tooltip: Optional<Component[]>): FloatListBuilder;
    setTooltip(...tooltip: Component[]): FloatListBuilder;
    setTooltipSupplier(tooltipSupplier: Function<number[], Optional<Component[]>>): FloatListBuilder;
    setTooltipSupplier(tooltipSupplier: Supplier<Optional<Component[]>>): FloatListBuilder;
  }


  interface IntFieldBuilder extends AbstractRangeFieldBuilder<number, IntegerListEntry, IntFieldBuilder> {}
  class IntFieldBuilder extends AbstractRangeFieldBuilder<number, IntegerListEntry, IntFieldBuilder> {
    constructor(resetButtonKey: Component, fieldNameKey: Component, value: number);
    build(): IntegerListEntry;
    removeMax(): IntFieldBuilder;
    removeMin(): IntFieldBuilder;
    requireRestart(): IntFieldBuilder;
    requireRestart(requireRestart: boolean): void;
    setDefaultValue(defaultValue: Supplier<number>): IntFieldBuilder;
    setDefaultValue(defaultValue: number): IntFieldBuilder;
    setErrorSupplier(errorSupplier: Function<number, Optional<Component>>): IntFieldBuilder;
    setMax(max: number): IntFieldBuilder;
    setMin(min: number): IntFieldBuilder;
    setSaveConsumer(saveConsumer: Consumer<number>): IntFieldBuilder;
    setTooltip(tooltip: Optional<Component[]>): IntFieldBuilder;
    setTooltip(...tooltip: Component[]): IntFieldBuilder;
    setTooltipSupplier(tooltipSupplier: Function<number, Optional<Component[]>>): IntFieldBuilder;
    setTooltipSupplier(tooltipSupplier: Supplier<Optional<Component[]>>): IntFieldBuilder;
  }


  interface IntListBuilder extends AbstractRangeListBuilder<number, IntegerListListEntry, IntListBuilder> {}
  class IntListBuilder extends AbstractRangeListBuilder<number, IntegerListListEntry, IntListBuilder> {
    constructor(resetButtonKey: Component, fieldNameKey: Component, value: number[]);
    build(): IntegerListListEntry;
    get cellErrorSupplier(): Function<number, Optional<Component>>;
    removeMax(): IntListBuilder;
    removeMin(): IntListBuilder;
    requireRestart(): IntListBuilder;
    requireRestart(requireRestart: boolean): void;
    set cellErrorSupplier(cellErrorSupplier: Function<number, Optional<Component>>);
    setAddButtonTooltip(addTooltip: Component): IntListBuilder;
    setCreateNewInstance(createNewInstance: Function<IntegerListListEntry, IntegerListCell>): IntListBuilder;
    setDefaultValue(defaultValue: Supplier<number[]>): IntListBuilder;
    setDefaultValue(defaultValue: number[]): IntListBuilder;
    setDeleteButtonEnabled(deleteButtonEnabled: boolean): IntListBuilder;
    setErrorSupplier(errorSupplier: Function<number[], Optional<Component>>): IntListBuilder;
    setExpanded(expanded: boolean): IntListBuilder;
    setInsertInFront(insertInFront: boolean): IntListBuilder;
    setMax(max: number): IntListBuilder;
    setMin(min: number): IntListBuilder;
    setRemoveButtonTooltip(removeTooltip: Component): IntListBuilder;
    setSaveConsumer(saveConsumer: Consumer<number[]>): IntListBuilder;
    setTooltip(tooltip: Optional<Component[]>): IntListBuilder;
    setTooltip(...tooltip: Component[]): IntListBuilder;
    setTooltipSupplier(tooltipSupplier: Function<number[], Optional<Component[]>>): IntListBuilder;
    setTooltipSupplier(tooltipSupplier: Supplier<Optional<Component[]>>): IntListBuilder;
  }


  interface IntSliderBuilder extends AbstractSliderFieldBuilder<number, IntegerSliderEntry, IntSliderBuilder> {}
  class IntSliderBuilder extends AbstractSliderFieldBuilder<number, IntegerSliderEntry, IntSliderBuilder> {
    constructor(resetButtonKey: Component, fieldNameKey: Component, value: number, min: number, max: number);
    build(): IntegerSliderEntry;
    removeMax(): IntSliderBuilder;
    removeMin(): IntSliderBuilder;
    requireRestart(): IntSliderBuilder;
    requireRestart(requireRestart: boolean): void;
    setDefaultValue(defaultValue: Supplier<number>): IntSliderBuilder;
    setDefaultValue(defaultValue: number): IntSliderBuilder;
    setErrorSupplier(errorSupplier: Function<number, Optional<Component>>): IntSliderBuilder;
    setMax(max: number): IntSliderBuilder;
    setMin(min: number): IntSliderBuilder;
    setSaveConsumer(saveConsumer: Consumer<number>): IntSliderBuilder;
    setTextGetter(textGetter: Function<number, Component>): IntSliderBuilder;
    setTooltip(tooltip: Optional<Component[]>): IntSliderBuilder;
    setTooltip(...tooltip: Component[]): IntSliderBuilder;
    setTooltipSupplier(tooltipSupplier: Function<number, Optional<Component[]>>): IntSliderBuilder;
    setTooltipSupplier(tooltipSupplier: Supplier<Optional<Component[]>>): IntSliderBuilder;
  }


  interface KeyCodeBuilder extends FieldBuilder<ModifierKeyCode, KeyCodeEntry, KeyCodeBuilder> {}
  class KeyCodeBuilder extends FieldBuilder<ModifierKeyCode, KeyCodeEntry, KeyCodeBuilder> {
    constructor(resetButtonKey: Component, fieldNameKey: Component, value: ModifierKeyCode);
    build(): KeyCodeEntry;
    requireRestart(): KeyCodeBuilder;
    requireRestart(requireRestart: boolean): void;
    setAllowKey(allowKey: boolean): KeyCodeBuilder;
    setAllowModifiers(allowModifiers: boolean): KeyCodeBuilder;
    setAllowMouse(allowMouse: boolean): KeyCodeBuilder;
    setDefaultValue(defaultValue: Supplier<Key>): KeyCodeBuilder;
    setDefaultValue(defaultValue: Key): KeyCodeBuilder;
    setDefaultValue(defaultValue: ModifierKeyCode): KeyCodeBuilder;
    setErrorSupplier(errorSupplier: Function<Key, Optional<Component>>): KeyCodeBuilder;
    setKeySaveConsumer(saveConsumer: Consumer<Key>): KeyCodeBuilder;
    setKeyTooltipSupplier(tooltipSupplier: Function<Key, Optional<Component[]>>): KeyCodeBuilder;
    setModifierDefaultValue(defaultValue: Supplier<ModifierKeyCode>): KeyCodeBuilder;
    setModifierErrorSupplier(errorSupplier: Function<ModifierKeyCode, Optional<Component>>): KeyCodeBuilder;
    setModifierSaveConsumer(saveConsumer: Consumer<ModifierKeyCode>): KeyCodeBuilder;
    setModifierTooltipSupplier(tooltipSupplier: Function<ModifierKeyCode, Optional<Component[]>>): KeyCodeBuilder;
    setTooltip(tooltip: Optional<Component[]>): KeyCodeBuilder;
    setTooltip(...tooltip: Component[]): KeyCodeBuilder;
    setTooltipSupplier(tooltipSupplier: Supplier<Optional<Component[]>>): KeyCodeBuilder;
  }


  interface LongFieldBuilder extends AbstractRangeFieldBuilder<Long, LongListEntry, LongFieldBuilder> {}
  class LongFieldBuilder extends AbstractRangeFieldBuilder<Long, LongListEntry, LongFieldBuilder> {
    constructor(resetButtonKey: Component, fieldNameKey: Component, value: number);
    build(): LongListEntry;
    removeMax(): LongFieldBuilder;
    removeMin(): LongFieldBuilder;
    requireRestart(): LongFieldBuilder;
    requireRestart(requireRestart: boolean): void;
    setDefaultValue(defaultValue: Supplier<Long>): LongFieldBuilder;
    setDefaultValue(defaultValue: number): LongFieldBuilder;
    setErrorSupplier(errorSupplier: Function<Long, Optional<Component>>): LongFieldBuilder;
    setMax(max: number): LongFieldBuilder;
    setMin(min: number): LongFieldBuilder;
    setSaveConsumer(saveConsumer: Consumer<Long>): LongFieldBuilder;
    setTooltip(tooltip: Optional<Component[]>): LongFieldBuilder;
    setTooltip(...tooltip: Component[]): LongFieldBuilder;
    setTooltipSupplier(tooltipSupplier: Supplier<Optional<Component[]>>): LongFieldBuilder;
    setTooltipSupplier(tooltipSupplier: Function<Long, Optional<Component[]>>): LongFieldBuilder;
  }


  interface LongListBuilder extends AbstractRangeListBuilder<Long, LongListListEntry, LongListBuilder> {}
  class LongListBuilder extends AbstractRangeListBuilder<Long, LongListListEntry, LongListBuilder> {
    constructor(resetButtonKey: Component, fieldNameKey: Component, value: Long[]);
    build(): LongListListEntry;
    get cellErrorSupplier(): Function<Long, Optional<Component>>;
    removeMax(): LongListBuilder;
    removeMin(): LongListBuilder;
    requireRestart(): LongListBuilder;
    requireRestart(requireRestart: boolean): void;
    set cellErrorSupplier(cellErrorSupplier: Function<Long, Optional<Component>>);
    setAddButtonTooltip(addTooltip: Component): LongListBuilder;
    setCreateNewInstance(createNewInstance: Function<LongListListEntry, LongListCell>): LongListBuilder;
    setDefaultValue(defaultValue: Supplier<Long[]>): LongListBuilder;
    setDefaultValue(defaultValue: Long[]): LongListBuilder;
    setDeleteButtonEnabled(deleteButtonEnabled: boolean): LongListBuilder;
    setErrorSupplier(errorSupplier: Function<Long[], Optional<Component>>): LongListBuilder;
    setExpanded(expanded: boolean): LongListBuilder;
    setInsertInFront(insertInFront: boolean): LongListBuilder;
    setMax(max: number): LongListBuilder;
    setMin(min: number): LongListBuilder;
    setRemoveButtonTooltip(removeTooltip: Component): LongListBuilder;
    setSaveConsumer(saveConsumer: Consumer<Long[]>): LongListBuilder;
    setTooltip(tooltip: Optional<Component[]>): LongListBuilder;
    setTooltip(...tooltip: Component[]): LongListBuilder;
    setTooltipSupplier(tooltipSupplier: Function<Long[], Optional<Component[]>>): LongListBuilder;
    setTooltipSupplier(tooltipSupplier: Supplier<Optional<Component[]>>): LongListBuilder;
  }


  interface LongSliderBuilder extends AbstractSliderFieldBuilder<Long, LongSliderEntry, LongSliderBuilder> {}
  class LongSliderBuilder extends AbstractSliderFieldBuilder<Long, LongSliderEntry, LongSliderBuilder> {
    constructor(resetButtonKey: Component, fieldNameKey: Component, value: number, min: number, max: number);
    build(): LongSliderEntry;
    requireRestart(): LongSliderBuilder;
    requireRestart(requireRestart: boolean): void;
    setDefaultValue(defaultValue: Supplier<Long>): LongSliderBuilder;
    setDefaultValue(defaultValue: number): LongSliderBuilder;
    setErrorSupplier(errorSupplier: Function<Long, Optional<Component>>): LongSliderBuilder;
    setSaveConsumer(saveConsumer: Consumer<Long>): LongSliderBuilder;
    setTextGetter(textGetter: Function<Long, Component>): LongSliderBuilder;
    setTooltip(tooltip: Optional<Component[]>): LongSliderBuilder;
    setTooltip(...tooltip: Component[]): LongSliderBuilder;
    setTooltipSupplier(tooltipSupplier: Function<Long, Optional<Component[]>>): LongSliderBuilder;
    setTooltipSupplier(tooltipSupplier: Supplier<Optional<Component[]>>): LongSliderBuilder;
  }


  interface SelectorBuilder<T = any> extends AbstractFieldBuilder<T, SelectionListEntry, SelectorBuilder> {}
  class SelectorBuilder<T = any> extends AbstractFieldBuilder<T, SelectionListEntry, SelectorBuilder> {
    constructor(resetButtonKey: Component, fieldNameKey: Component, valuesArray: T[], value: T);
    build(): SelectionListEntry<T>;
    requireRestart(): SelectorBuilder<T>;
    requireRestart(requireRestart: boolean): void;
    setDefaultValue(defaultValue: Supplier<T>): SelectorBuilder<T>;
    setDefaultValue(defaultValue: T): SelectorBuilder<T>;
    setErrorSupplier(errorSupplier: Function<T, Optional<Component>>): SelectorBuilder<T>;
    setNameProvider(enumNameProvider: Function<T, Component>): SelectorBuilder<T>;
    setSaveConsumer(saveConsumer: Consumer<T>): SelectorBuilder<T>;
    setTooltip(tooltip: Optional<Component[]>): SelectorBuilder<T>;
    setTooltip(...tooltip: Component[]): SelectorBuilder<T>;
    setTooltipSupplier(tooltipSupplier: Function<T, Optional<Component[]>>): SelectorBuilder<T>;
    setTooltipSupplier(tooltipSupplier: Supplier<Optional<Component[]>>): SelectorBuilder<T>;
  }


  interface StringFieldBuilder extends AbstractFieldBuilder<string, StringListEntry, StringFieldBuilder> {}
  class StringFieldBuilder extends AbstractFieldBuilder<string, StringListEntry, StringFieldBuilder> {
    constructor(resetButtonKey: Component, fieldNameKey: Component, value: string);
    build(): StringListEntry;
    requireRestart(): StringFieldBuilder;
    requireRestart(requireRestart: boolean): void;
    setDefaultValue(defaultValue: Supplier<string>): StringFieldBuilder;
    setDefaultValue(defaultValue: string): StringFieldBuilder;
    setErrorSupplier(errorSupplier: Function<string, Optional<Component>>): StringFieldBuilder;
    setSaveConsumer(saveConsumer: Consumer<string>): StringFieldBuilder;
    setTooltip(tooltip: Optional<Component[]>): StringFieldBuilder;
    setTooltip(...tooltip: Component[]): StringFieldBuilder;
    setTooltipSupplier(tooltipSupplier: Function<string, Optional<Component[]>>): StringFieldBuilder;
    setTooltipSupplier(tooltipSupplier: Supplier<Optional<Component[]>>): StringFieldBuilder;
  }


  interface StringListBuilder extends AbstractListBuilder<string, StringListListEntry, StringListBuilder> {}
  class StringListBuilder extends AbstractListBuilder<string, StringListListEntry, StringListBuilder> {
    constructor(resetButtonKey: Component, fieldNameKey: Component, value: string[]);
    build(): StringListListEntry;
    get cellErrorSupplier(): Function<string, Optional<Component>>;
    requireRestart(): StringListBuilder;
    requireRestart(requireRestart: boolean): void;
    set cellErrorSupplier(cellErrorSupplier: Function<string, Optional<Component>>);
    setAddButtonTooltip(addTooltip: Component): StringListBuilder;
    setCreateNewInstance(createNewInstance: Function<StringListListEntry, StringListCell>): StringListBuilder;
    setDefaultValue(defaultValue: Supplier<string[]>): StringListBuilder;
    setDefaultValue(defaultValue: string[]): StringListBuilder;
    setDeleteButtonEnabled(deleteButtonEnabled: boolean): StringListBuilder;
    setErrorSupplier(errorSupplier: Function<string[], Optional<Component>>): StringListBuilder;
    setExpanded(expanded: boolean): StringListBuilder;
    setInsertInFront(insertInFront: boolean): StringListBuilder;
    setRemoveButtonTooltip(removeTooltip: Component): StringListBuilder;
    setSaveConsumer(saveConsumer: Consumer<string[]>): StringListBuilder;
    setTooltip(tooltip: Optional<Component[]>): StringListBuilder;
    setTooltip(...tooltip: Component[]): StringListBuilder;
    setTooltipSupplier(tooltipSupplier: Function<string[], Optional<Component[]>>): StringListBuilder;
    setTooltipSupplier(tooltipSupplier: Supplier<Optional<Component[]>>): StringListBuilder;
  }


  interface SubCategoryBuilder extends List<AbstractConfigListEntry>, FieldBuilder<List, SubCategoryListEntry, SubCategoryBuilder> {}
  class SubCategoryBuilder extends List<AbstractConfigListEntry> {
    constructor(resetButtonKey: Component, fieldNameKey: Component);
    add(abstractConfigListEntry: AbstractConfigListEntry): boolean;
    add(index: number, element: AbstractConfigListEntry): void;
    addAll(c: Collection<AbstractConfigListEntry>): boolean;
    addAll(index: number, c: Collection<AbstractConfigListEntry>): boolean;
    build(): SubCategoryListEntry;
    clear(): void;
    contains(o: any): boolean;
    containsAll(c: Collection<any>): boolean;
    get(index: number): AbstractConfigListEntry;
    indexOf(o: any): number;
    isEmpty(): boolean;
    iterator(): Iterator<AbstractConfigListEntry>;
    lastIndexOf(o: any): number;
    listIterator(): ListIterator<AbstractConfigListEntry>;
    listIterator(index: number): ListIterator<AbstractConfigListEntry>;
    remove(o: any): boolean;
    remove(index: number): AbstractConfigListEntry;
    removeAll(c: Collection<any>): boolean;
    requireRestart(requireRestart: boolean): void;
    retainAll(c: Collection<any>): boolean;
    set(index: number, element: AbstractConfigListEntry): AbstractConfigListEntry;
    setExpanded(expanded: boolean): SubCategoryBuilder;
    setTooltip(tooltip: Optional<Component[]>): SubCategoryBuilder;
    setTooltip(...tooltip: Component[]): SubCategoryBuilder;
    setTooltipSupplier(tooltipSupplier: Supplier<Optional<Component[]>>): SubCategoryBuilder;
    setTooltipSupplier(tooltipSupplier: Function<AbstractConfigListEntry[], Optional<Component[]>>): SubCategoryBuilder;
    size(): number;
    subList(fromIndex: number, toIndex: number): AbstractConfigListEntry[];
    toArray(): any[];
    toArray<T>(a: T[]): T[];
  }


  interface TextDescriptionBuilder extends FieldBuilder<Component, TextListEntry, TextDescriptionBuilder> {}
  class TextDescriptionBuilder extends FieldBuilder<Component, TextListEntry, TextDescriptionBuilder> {
    constructor(resetButtonKey: Component, fieldNameKey: Component, value: Component);
    build(): TextListEntry;
    requireRestart(requireRestart: boolean): void;
    setColor(color: number): TextDescriptionBuilder;
    setTooltip(tooltip: Optional<Component[]>): TextDescriptionBuilder;
    setTooltip(...tooltip: Component[]): TextDescriptionBuilder;
    setTooltipSupplier(tooltipSupplier: Supplier<Optional<Component[]>>): TextDescriptionBuilder;
  }


  interface TextFieldBuilder extends AbstractFieldBuilder<string, StringListEntry, TextFieldBuilder> {}
  class TextFieldBuilder extends AbstractFieldBuilder<string, StringListEntry, TextFieldBuilder> {
    constructor(resetButtonKey: Component, fieldNameKey: Component, value: string);
    build(): StringListEntry;
    requireRestart(): TextFieldBuilder;
    requireRestart(requireRestart: boolean): void;
    setDefaultValue(defaultValue: Supplier<string>): TextFieldBuilder;
    setDefaultValue(defaultValue: string): TextFieldBuilder;
    setErrorSupplier(errorSupplier: Function<string, Optional<Component>>): TextFieldBuilder;
    setSaveConsumer(saveConsumer: Consumer<string>): TextFieldBuilder;
    setTooltip(tooltip: Optional<Component[]>): TextFieldBuilder;
    setTooltip(...tooltip: Component[]): TextFieldBuilder;
    setTooltipSupplier(tooltipSupplier: Function<string, Optional<Component[]>>): TextFieldBuilder;
    setTooltipSupplier(tooltipSupplier: Supplier<Optional<Component[]>>): TextFieldBuilder;
  }

}

declare module 'me.shedaniel.clothconfig2.impl.builders.DropdownMenuBuilder' {
  import { SelectionCellCreator, SelectionCellElement, SelectionTopCellElement } from 'me.shedaniel.clothconfig2.gui.entries.DropdownBoxEntry';
  import { Function } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Item } from 'net.minecraft.world.item';
  import { Block } from 'net.minecraft.world.level.block';

  class CellCreatorBuilder {
    create(selection: ResourceLocation): SelectionCellElement<ResourceLocation>;
    create(selection: ResourceLocation): SelectionCellElement<ResourceLocation>;
    create(selection: Item): SelectionCellElement<Item>;
    create(selection: Block): SelectionCellElement<Block>;
    get cellHeight(): number;
    get cellHeight(): number;
    get cellHeight(): number;
    get cellHeight(): number;
    get cellWidth(): number;
    get cellWidth(): number;
    get cellWidth(): number;
    get cellWidth(): number;
    get dropBoxMaxHeight(): number;
    get dropBoxMaxHeight(): number;
    get dropBoxMaxHeight(): number;
    get dropBoxMaxHeight(): number;
    static of<T>(): SelectionCellCreator<T>;
    static of<T>(toTextFunction: Function<T, Component>): SelectionCellCreator<T>;
    static of<T>(cellWidth: number, maxItems: number): SelectionCellCreator<T>;
    static of<T>(cellWidth: number, maxItems: number, toTextFunction: Function<T, Component>): SelectionCellCreator<T>;
    static of<T>(cellHeight: number, cellWidth: number, maxItems: number): SelectionCellCreator<T>;
    static of<T>(cellHeight: number, cellWidth: number, maxItems: number, toTextFunction: Function<T, Component>): SelectionCellCreator<T>;
    static ofBlockIdentifier(): SelectionCellCreator<ResourceLocation>;
    static ofBlockIdentifier(maxItems: number): SelectionCellCreator<ResourceLocation>;
    static ofBlockIdentifier(cellHeight: number, cellWidth: number, maxItems: number): SelectionCellCreator<ResourceLocation>;
    static ofBlockObject(): SelectionCellCreator<Block>;
    static ofBlockObject(maxItems: number): SelectionCellCreator<Block>;
    static ofBlockObject(cellHeight: number, cellWidth: number, maxItems: number): SelectionCellCreator<Block>;
    static ofCellCount<T>(maxItems: number): SelectionCellCreator<T>;
    static ofCellCount<T>(maxItems: number, toTextFunction: Function<T, Component>): SelectionCellCreator<T>;
    static ofItemIdentifier(): SelectionCellCreator<ResourceLocation>;
    static ofItemIdentifier(maxItems: number): SelectionCellCreator<ResourceLocation>;
    static ofItemIdentifier(cellHeight: number, cellWidth: number, maxItems: number): SelectionCellCreator<ResourceLocation>;
    static ofItemObject(): SelectionCellCreator<Item>;
    static ofItemObject(maxItems: number): SelectionCellCreator<Item>;
    static ofItemObject(cellHeight: number, cellWidth: number, maxItems: number): SelectionCellCreator<Item>;
    static ofWidth<T>(cellWidth: number): SelectionCellCreator<T>;
    static ofWidth<T>(cellWidth: number, toTextFunction: Function<T, Component>): SelectionCellCreator<T>;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, x: number, y: number, width: number, height: number, delta: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, x: number, y: number, width: number, height: number, delta: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, x: number, y: number, width: number, height: number, delta: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, x: number, y: number, width: number, height: number, delta: number): void;
  }


  class TopCellElementBuilder {
    static readonly IDENTIFIER_FUNCTION: Function;
    static readonly ITEM_IDENTIFIER_FUNCTION: Function;
    static readonly BLOCK_IDENTIFIER_FUNCTION: Function;
    static readonly ITEM_FUNCTION: Function;
    static readonly BLOCK_FUNCTION: Function;
    static of<T>(value: T, toObjectFunction: Function<string, T>): SelectionTopCellElement<T>;
    static of<T>(value: T, toObjectFunction: Function<string, T>, toTextFunction: Function<T, Component>): SelectionTopCellElement<T>;
    static ofBlockIdentifier(block: Block): SelectionTopCellElement<ResourceLocation>;
    static ofBlockObject(block: Block): SelectionTopCellElement<Block>;
    static ofItemIdentifier(item: Item): SelectionTopCellElement<ResourceLocation>;
    static ofItemObject(item: Item): SelectionTopCellElement<Item>;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, x: number, y: number, width: number, height: number, delta: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, x: number, y: number, width: number, height: number, delta: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, x: number, y: number, width: number, height: number, delta: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, x: number, y: number, width: number, height: number, delta: number): void;
  }

}

declare module 'me.shedaniel.clothconfig2.impl' {
  import { List } from 'java.util';
  import { KeyMapping } from 'net.minecraft.client';

  class EasingMethod {
    apply(var1: number): number;
  }


  class EasingMethods {
    static get methods(): EasingMethod[];
    static register(easingMethod: EasingMethod): void;
  }


  class GameOptionsHooks {
    cloth_setKeysAll(var1: KeyMapping[]): void;
  }


  class KeyBindingHooks {
    cloth_setId(var1: string): void;
  }

}

declare module 'me.shedaniel.math.api' {
  import { Supplier } from 'java.util.function';
  import { Runnable, Boolean } from 'java.lang';
  import { Dist } from 'net.neoforged.api.distmarker';
  import { Callable } from 'java.util.concurrent';
  import { Optional } from 'java.util';

  class Executor {
    static call<T>(runnableSupplier: Supplier<Callable<T>>): T;
    static callIf<T>(predicate: Supplier<boolean>, runnableSupplier: Supplier<Callable<T>>): Optional<T>;
    static callIfEnv<T>(env: Dist, runnableSupplier: Supplier<Callable<T>>): Optional<T>;
    static run(runnableSupplier: Supplier<Runnable>): void;
    static runIf(predicate: Supplier<boolean>, runnableSupplier: Supplier<Runnable>): void;
    static runIfEnv(env: Dist, runnableSupplier: Supplier<Runnable>): void;
  }

}

declare module 'me.shedaniel.math' {
  import { Cloneable } from 'java.lang';

  class Color {
    static HSBtoRGB(f: number, f2: number, f3: number): number;
    brighter(d: number): Color;
    darker(d: number): Color;
    equals(object: any): boolean;
    get alpha(): number;
    get blue(): number;
    get color(): number;
    get green(): number;
    get red(): number;
    hashCode(): number;
    static ofHSB(f: number, f2: number, f3: number): Color;
    static ofOpaque(n: number): Color;
    static ofRGB(f: number, f2: number, f3: number): Color;
    static ofRGB(n: number, n2: number, n3: number): Color;
    static ofRGBA(f: number, f2: number, f3: number, f4: number): Color;
    static ofRGBA(n: number, n2: number, n3: number, n4: number): Color;
    static ofTransparent(n: number): Color;
    toString(): string;
  }


  interface Dimension extends Cloneable {}
  class Dimension extends Cloneable {
    width: number;
    height: number;
    constructor();

    constructor(dimension: Dimension);

    constructor(floatingDimension: FloatingDimension);

    constructor(n: number, n2: number);

    constructor(d: number, d2: number);
    clone(): Dimension;
    equals(object: any): boolean;
    get floatingSize(): FloatingDimension;
    get height(): number;
    get size(): Dimension;
    get width(): number;
    hashCode(): number;
    set size(dimension: Dimension);
    setSize(d: number, d2: number): void;
    setSize(floatingDimension: FloatingDimension): void;
    setSize(n: number, n2: number): void;
    toString(): string;
  }


  interface FloatingDimension extends Cloneable {}
  class FloatingDimension extends Cloneable {
    width: number;
    height: number;
    constructor();

    constructor(dimension: Dimension);

    constructor(floatingDimension: FloatingDimension);

    constructor(d: number, d2: number);
    clone(): FloatingDimension;
    equals(object: any): boolean;
    get floatingSize(): FloatingDimension;
    get height(): number;
    get size(): Dimension;
    get width(): number;
    hashCode(): number;
    set size(floatingDimension: FloatingDimension);
    setSize(d: number, d2: number): void;
    setSize(dimension: Dimension): void;
    toString(): string;
  }


  interface FloatingPoint extends Cloneable {}
  class FloatingPoint extends Cloneable {
    x: number;
    y: number;
    constructor();

    constructor(point: Point);

    constructor(floatingPoint: FloatingPoint);

    constructor(d: number, d2: number);
    clone(): FloatingPoint;
    equals(object: any): boolean;
    get floatingLocation(): FloatingPoint;
    get location(): Point;
    get x(): number;
    get y(): number;
    hashCode(): number;
    move(d: number, d2: number): void;
    setLocation(d: number, d2: number): void;
    toString(): string;
    translate(d: number, d2: number): void;
  }


  interface FloatingRectangle extends Cloneable {}
  class FloatingRectangle extends Cloneable {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor();

    constructor(floatingRectangle: FloatingRectangle);

    constructor(rectangle: Rectangle);

    constructor(n: number, n2: number);

    constructor(point: Point, dimension: Dimension);

    constructor(point: Point, floatingDimension: FloatingDimension);

    constructor(floatingPoint: FloatingPoint, dimension: Dimension);

    constructor(floatingPoint: FloatingPoint, floatingDimension: FloatingDimension);

    constructor(point: Point);

    constructor(floatingPoint: FloatingPoint);

    constructor(dimension: Dimension);

    constructor(floatingDimension: FloatingDimension);

    constructor(d: number, d2: number, d3: number, d4: number);
    add(d: number, d2: number): void;
    add(floatingPoint: FloatingPoint): void;
    add(point: Point): void;
    add(floatingRectangle: FloatingRectangle): void;
    clone(): FloatingRectangle;
    contains(point: Point): boolean;
    contains(floatingPoint: FloatingPoint): boolean;
    contains(n: number, n2: number): boolean;
    contains(d: number, d2: number): boolean;
    contains(rectangle: Rectangle): boolean;
    contains(floatingRectangle: FloatingRectangle): boolean;
    contains(d: number, d2: number, d3: number, d4: number): boolean;
    equals(object: any): boolean;
    get bounds(): Rectangle;
    get centerX(): number;
    get centerY(): number;
    get floatingBounds(): FloatingRectangle;
    get floatingLocation(): FloatingPoint;
    get height(): number;
    get location(): Point;
    get maxX(): number;
    get maxY(): number;
    get minX(): number;
    get minY(): number;
    get size(): Dimension;
    get width(): number;
    get x(): number;
    get y(): number;
    grow(d: number, d2: number): void;
    hashCode(): number;
    inside(d: number, d2: number): boolean;
    intersection(floatingRectangle: FloatingRectangle): FloatingRectangle;
    intersects(floatingRectangle: FloatingRectangle): boolean;
    isEmpty(): boolean;
    move(d: number, d2: number): void;
    reshape(d: number, d2: number, d3: number, d4: number): void;
    resize(d: number, d2: number): void;
    set bounds(floatingRectangle: FloatingRectangle);
    set location(point: Point);
    set size(dimension: Dimension);
    setBounds(rectangle: Rectangle): void;
    setBounds(d: number, d2: number, d3: number, d4: number): void;
    setLocation(floatingPoint: FloatingPoint): void;
    setLocation(d: number, d2: number): void;
    setSize(floatingDimension: FloatingDimension): void;
    setSize(d: number, d2: number): void;
    toString(): string;
    translate(d: number, d2: number): void;
    union(floatingRectangle: FloatingRectangle): FloatingRectangle;
  }


  interface Point extends Cloneable {}
  class Point extends Cloneable {
    x: number;
    y: number;
    constructor();

    constructor(point: Point);

    constructor(floatingPoint: FloatingPoint);

    constructor(d: number, d2: number);

    constructor(n: number, n2: number);
    clone(): Point;
    equals(object: any): boolean;
    get floatingLocation(): FloatingPoint;
    get location(): Point;
    get x(): number;
    get y(): number;
    hashCode(): number;
    move(n: number, n2: number): void;
    setLocation(d: number, d2: number): void;
    toString(): string;
    translate(n: number, n2: number): void;
  }


  interface Rectangle extends Cloneable {}
  class Rectangle extends Cloneable {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor();

    constructor(rectangle: Rectangle);

    constructor(floatingRectangle: FloatingRectangle);

    constructor(n: number, n2: number);

    constructor(point: Point, dimension: Dimension);

    constructor(point: Point, floatingDimension: FloatingDimension);

    constructor(floatingPoint: FloatingPoint, dimension: Dimension);

    constructor(floatingPoint: FloatingPoint, floatingDimension: FloatingDimension);

    constructor(point: Point);

    constructor(floatingPoint: FloatingPoint);

    constructor(dimension: Dimension);

    constructor(floatingDimension: FloatingDimension);

    constructor(d: number, d2: number, d3: number, d4: number);

    constructor(n: number, n2: number, n3: number, n4: number);
    add(n: number, n2: number): void;
    add(floatingPoint: FloatingPoint): void;
    add(point: Point): void;
    add(rectangle: Rectangle): void;
    clone(): Rectangle;
    contains(point: Point): boolean;
    contains(floatingPoint: FloatingPoint): boolean;
    contains(n: number, n2: number): boolean;
    contains(d: number, d2: number): boolean;
    contains(floatingRectangle: FloatingRectangle): boolean;
    contains(rectangle: Rectangle): boolean;
    contains(n: number, n2: number, n3: number, n4: number): boolean;
    equals(object: any): boolean;
    get bounds(): Rectangle;
    get centerX(): number;
    get centerY(): number;
    get floatingBounds(): FloatingRectangle;
    get floatingLocation(): FloatingPoint;
    get floatingSize(): FloatingDimension;
    get height(): number;
    get location(): Point;
    get maxX(): number;
    get maxY(): number;
    get minX(): number;
    get minY(): number;
    get size(): Dimension;
    get width(): number;
    get x(): number;
    get y(): number;
    grow(n: number, n2: number): void;
    hashCode(): number;
    inside(n: number, n2: number): boolean;
    intersection(rectangle: Rectangle): Rectangle;
    intersects(rectangle: Rectangle): boolean;
    isEmpty(): boolean;
    move(n: number, n2: number): void;
    reshape(n: number, n2: number, n3: number, n4: number): void;
    resize(n: number, n2: number): void;
    set bounds(floatingRectangle: FloatingRectangle);
    set location(floatingPoint: FloatingPoint);
    set size(floatingDimension: FloatingDimension);
    setBounds(rectangle: Rectangle): void;
    setBounds(d: number, d2: number, d3: number, d4: number): void;
    setBounds(n: number, n2: number, n3: number, n4: number): void;
    setLocation(point: Point): void;
    setLocation(d: number, d2: number): void;
    setLocation(n: number, n2: number): void;
    setSize(dimension: Dimension): void;
    setSize(d: number, d2: number): void;
    setSize(n: number, n2: number): void;
    toString(): string;
    translate(n: number, n2: number): void;
    union(rectangle: Rectangle): Rectangle;
  }

}

declare module 'me.shedaniel.math.impl' {
  import { Point, FloatingPoint } from 'me.shedaniel.math';

  class PointHelper {
    static get mouseFloatingX(): number;
    static get mouseFloatingY(): number;
    static get mouseX(): number;
    static get mouseY(): number;
    static ofFloatingMouse(): FloatingPoint;
    static ofMouse(): Point;
  }

}