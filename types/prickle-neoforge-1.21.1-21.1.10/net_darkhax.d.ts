declare module 'net.darkhax.pricklemc.common.api.config.comment' {
  import { JsonSerializer, JsonDeserializer, JsonElement, JsonDeserializationContext, JsonSerializationContext } from 'com.google.gson';
  import { Type, Field } from 'java.lang.reflect';
  import { Value } from 'net.darkhax.pricklemc.common.api.annotations';

  interface Comment extends IComment {}
  class Comment extends IComment {
    constructor(...lines: string[]);
    get lines(): string[];
  }


  interface CommentTypeAdapter extends JsonSerializer<IComment>, JsonDeserializer<IComment> {}
  class CommentTypeAdapter extends JsonSerializer<IComment> {
    static readonly INSTANCE: CommentTypeAdapter;
    deserialize(json: JsonElement, typeOfT: Type, context: JsonDeserializationContext): IComment;
    serialize(src: IComment, typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }


  class IComment {
    get lines(): string[];
  }


  class ICommentResolver {
    static hasComment(valueMeta: Value): boolean;
    resolve(var1: Field, var2: any, var3: Value): IComment;
  }


  interface WrappedComment extends Comment {}
  class WrappedComment extends Comment {
    static readonly RESOLVER: ICommentResolver;
    constructor(text: string, lineLength: number, pad: boolean);
  }

}

declare module 'net.darkhax.pricklemc.common.api.config.comment.WrappedComment' {
  import { ICommentResolver, WrappedComment } from 'net.darkhax.pricklemc.common.api.config.comment';
  import { Field } from 'java.lang.reflect';
  import { Value } from 'net.darkhax.pricklemc.common.api.annotations';

  interface WrappedCommentResolver extends ICommentResolver {}
  class WrappedCommentResolver extends ICommentResolver {
    constructor(lineLength: number, padLength: boolean);
    resolve(field: Field, value: any, valueMeta: Value): WrappedComment;
  }

}

declare module 'net.darkhax.pricklemc.common.api.config' {
  import { Consumer } from 'java.util.function';
  import { Builder } from 'net.darkhax.pricklemc.common.api.config.ConfigManager';
  import { JsonWriter, JsonReader } from 'com.google.gson.stream';
  import { Gson } from 'com.google.gson';
  import { Logger } from 'org.slf4j';
  import { List } from 'java.util';
  import { IPropertyAdapter, IConfigProperty } from 'net.darkhax.pricklemc.common.api.config.property';
  import { ICommentResolver, IComment } from 'net.darkhax.pricklemc.common.api.config.comment';
  import { Field } from 'java.lang.reflect';
  import { Value } from 'net.darkhax.pricklemc.common.api.annotations';

  class ConfigManager<T = any> {
    get (): T;
    static init<T>(name: string, defaultValue: T): ConfigManager<T>;
    static init<T>(name: string, defaultValue: T, configure: Consumer<Builder<T>>): ConfigManager<T>;
    static load<T>(name: string, defaultValue: T): T;
    static load<T>(name: string, defaultValue: T, configure: Consumer<Builder<T>>): T;
    load(): void;
    save(): void;
  }


  class ConfigObjectSerializer<T = any> {
    constructor(propertyResolver: PropertyResolver, dataObj: T);
    read(inParameter: JsonReader): void;
    write(out: JsonWriter): void;
  }


  class PropertyResolver {
    constructor(gson: Gson, logger: Logger, propertyAdapters: IPropertyAdapter<any>[], commentResolver: ICommentResolver);
    gson(): Gson;
    logger(): Logger;
    toComment(field: Field, value: any, valueMeta: Value): IComment;
    toProperty(field: Field, parent: any, cfgValue: Value): IConfigProperty<any>;
  }

}

declare module 'net.darkhax.pricklemc.common.api.config.ConfigManager' {
  import { Path } from 'java.nio.file';
  import { Logger } from 'org.slf4j';
  import { IPropertyAdapter } from 'net.darkhax.pricklemc.common.api.config.property';
  import { GsonBuilder } from 'com.google.gson';
  import { Consumer } from 'java.util.function';
  import { ICommentResolver } from 'net.darkhax.pricklemc.common.api.config.comment';
  import { ConfigManager } from 'net.darkhax.pricklemc.common.api.config';

  class Builder<T = any> {
    constructor(filePath: Path);
    adapter(adapter: IPropertyAdapter<any>): Builder<T>;
    build(cfgData: T): ConfigManager<T>;
    commentResolver(resolver: ICommentResolver): Builder<T>;
    gsonBuilder(builder: GsonBuilder): Builder<T>;
    gsonConfig(config: Consumer<GsonBuilder>): Builder<T>;
    logger(logger: Logger): Builder<T>;
  }

}

declare module 'net.darkhax.pricklemc.common.api.config.property.array' {
  import { ObjectProperty } from 'net.darkhax.pricklemc.common.api.config.property';
  import { Set } from 'java.util';
  import { Field } from 'java.lang.reflect';
  import { Value, Array } from 'net.darkhax.pricklemc.common.api.annotations';
  import { IComment } from 'net.darkhax.pricklemc.common.api.config.comment';
  import { JsonWriter } from 'com.google.gson.stream';
  import { PropertyResolver } from 'net.darkhax.pricklemc.common.api.config';
  import { Logger } from 'org.slf4j';
  import { Adapter } from 'net.darkhax.pricklemc.common.api.config.property.array.ArrayProperty';
  import { Adapter as net_darkhax_pricklemc_common_api_config_property_array_collectionarrayproperty_Adapter } from 'net.darkhax.pricklemc.common.api.config.property.array.CollectionArrayProperty';

  interface AbstractArrayProperty<T = any> extends ObjectProperty<T> {}
  class AbstractArrayProperty<T = any> extends ObjectProperty<T> {
    static readonly BASIC_TYPES: Set;
    constructor(field: Field, parent: any, defaultValue: T, valueMeta: Value, meta: ArraySettings, comment: IComment);
    isComplex(var1: T): boolean;
    isEmpty(var1: T): boolean;
    isOverInlineThreshold(var1: T): boolean;
    settings(): ArraySettings;
    validate(value: T): boolean;
    writeAdditionalComments(out: JsonWriter, resolver: PropertyResolver, log: Logger): void;
    writeArrayValues(var1: T, var2: JsonWriter, var3: PropertyResolver, var4: Logger): void;
    writeValue(value: T, out: JsonWriter, resolver: PropertyResolver, log: Logger): void;
  }


  interface ArrayProperty<T = any> extends AbstractArrayProperty<any> {}
  class ArrayProperty<T = any> extends AbstractArrayProperty<any> {
    static readonly ADAPTER: Adapter;
    isComplex(value: any): boolean;
    isEmpty(value: any): boolean;
    isOverInlineThreshold(value: any): boolean;
    writeArrayValues(value: any, out: JsonWriter, resolver: PropertyResolver, log: Logger): void;
  }


  class ArraySettings {
    static readonly DEFAULT: ArraySettings;
    constructor(meta: Array);
    allowEmpty(): boolean;
    inlineComplex(): boolean;
    inlineCount(): number;
  }


  interface CollectionArrayProperty<T extends Collection<any> = any> extends AbstractArrayProperty<T> {}
  class CollectionArrayProperty<T extends Collection<any> = any> extends AbstractArrayProperty<T> {
    static readonly ADAPTER: net_darkhax_pricklemc_common_api_config_property_array_collectionarrayproperty_Adapter;
    isComplex(value: T): boolean;
    isEmpty(value: T): boolean;
    isOverInlineThreshold(value: T): boolean;
    writeArrayValues(value: T, out: JsonWriter, resolver: PropertyResolver, log: Logger): void;
  }

}

declare module 'net.darkhax.pricklemc.common.api.config.property' {
  import { JsonWriter, JsonReader } from 'com.google.gson.stream';
  import { PropertyResolver } from 'net.darkhax.pricklemc.common.api.config';
  import { Logger } from 'org.slf4j';
  import { Consumer } from 'java.util.function';
  import { Field } from 'java.lang.reflect';
  import { Value } from 'net.darkhax.pricklemc.common.api.annotations';
  import { IComment } from 'net.darkhax.pricklemc.common.api.config.comment';

  interface ConfigObjectProperty<T = any> extends ObjectProperty<T> {}
  class ConfigObjectProperty<T = any> extends ObjectProperty<T> {
    static adapter(resolver: PropertyResolver): IPropertyAdapter<any>;
    read(reader: JsonReader, resolver: PropertyResolver, logger: Logger): void;
    writeValue(value: T, writer: JsonWriter, resolver: PropertyResolver, logger: Logger): void;
  }


  class IConfigProperty<T = any> {
    read(var1: JsonReader, var2: PropertyResolver, var3: Logger): void;
    validate(var1: T): boolean;
    value(): T;
    write(var1: JsonWriter, var2: PropertyResolver, var3: Logger): void;
  }


  class IDefaultPropertyAdapters {
    register(var1: Consumer<IPropertyAdapter<any>>): void;
  }


  class IPropertyAdapter<T extends IConfigProperty<any> = any> {
    toValue(var1: PropertyResolver, var2: Field, var3: any, var4: any, var5: Value): T;
  }


  interface ObjectProperty<T = any> extends IConfigProperty<T> {}
  class ObjectProperty<T = any> extends IConfigProperty<T> {
    static readonly FALLBACK_ADAPTER: IPropertyAdapter;
    constructor(field: Field, parent: any, defaultValue: T, valueMeta: Value, comment: IComment);
    comment(): IComment;
    defaultValue(): T;
    read(reader: JsonReader, resolver: PropertyResolver, logger: Logger): void;
    readValue(reader: JsonReader, resolver: PropertyResolver, logger: Logger): T;
    validate(value: T): boolean;
    value(): T;
    write(writer: JsonWriter, resolver: PropertyResolver, logger: Logger): void;
    writeAdditionalComments(writer: JsonWriter, resolver: PropertyResolver, logger: Logger): void;
    writeDefaultValue(): boolean;
    writeDefaultValue(writer: JsonWriter, resolver: PropertyResolver, logger: Logger): void;
    writeValue(value: T, writer: JsonWriter, resolver: PropertyResolver, logger: Logger): void;
  }


  interface RangedProperty<T extends Number = any> extends ObjectProperty<T> {}
  class RangedProperty<T extends Number = any> extends ObjectProperty<T> {
    static readonly ADAPTER: IPropertyAdapter;
    max(): T;
    validate(value: T): boolean;
    writeAdditionalComments(writer: JsonWriter, resolver: PropertyResolver, logger: Logger): void;
  }


  interface RegexStringProperty extends ObjectProperty<string> {}
  class RegexStringProperty extends ObjectProperty<string> {
    static ADAPTER: IPropertyAdapter;
    validate(value: string): boolean;
    writeAdditionalComments(writer: JsonWriter, resolver: PropertyResolver, log: Logger): void;
  }

}

declare module 'net.darkhax.pricklemc.common.api.services' {
  import { IPlatformHelper } from 'net.darkhax.pricklemc.common.api.util';
  import { Class } from 'java.lang';
  import { List } from 'java.util';

  class Services {
    static readonly PLATFORM: IPlatformHelper;
    static load<T>(clazz: Class<T>): T;
    static loadMany<T>(clazz: Class<T>): T[];
  }

}

declare module 'net.darkhax.pricklemc.common.api.util' {
  import { Supplier, Consumer } from 'java.util.function';
  import { Path } from 'java.nio.file';
  import { File } from 'java.io';
  import { Number } from 'java.lang';
  import { BigDecimal } from 'java.math';

  interface CachedSupplier<T = any> extends Supplier<T> {}
  class CachedSupplier<T = any> extends Supplier<T> {
    apply(consumer: Consumer<T>): void;
    static cache<T>(delegate: Supplier<T>): CachedSupplier<T>;
    cast<X>(): CachedSupplier<X>;
    get (): T;
    ifCached(consumer: Consumer<T>): void;
    ifPresent(consumer: Consumer<T>): void;
    invalidate(): void;
    isCached(): boolean;
    static singleton<T>(singleton: T): CachedSupplier<T>;
  }


  class IPlatformHelper {
    get configDirectory(): File;
    get configPath(): Path;
    get name(): string;
  }


  class NumberUtils {
    static asBigDecimal(number: Number): BigDecimal;
    static compareNumber(x: Number, y: Number): number;
    static equals(x: Number, y: Number): boolean;
    static greaterThan(x: Number, y: Number): boolean;
    static isSpecialNumber(number: Number): boolean;
    static lessThan(x: Number, y: Number): boolean;
  }

}

declare module 'net.darkhax.pricklemc.common.impl.config.property' {
  import { ObjectProperty, IDefaultPropertyAdapters, IPropertyAdapter } from 'net.darkhax.pricklemc.common.api.config.property';
  import { Adapter } from 'net.darkhax.pricklemc.common.impl.config.property.CodecProperty';
  import { Field, Type } from 'java.lang.reflect';
  import { Value } from 'net.darkhax.pricklemc.common.api.annotations';
  import { IComment } from 'net.darkhax.pricklemc.common.api.config.comment';
  import { Codec } from 'com.mojang.serialization';
  import { JsonWriter, JsonReader } from 'com.google.gson.stream';
  import { PropertyResolver } from 'net.darkhax.pricklemc.common.api.config';
  import { Logger } from 'org.slf4j';
  import { Consumer } from 'java.util.function';

  interface CodecProperty<T = any> extends ObjectProperty<T> {}
  class CodecProperty<T = any> extends ObjectProperty<T> {
    static readonly RESOURCE_LOCATION: Adapter;
    static readonly BLOCK_POS: Adapter;
    static readonly TEXT_COMPONENT: Adapter;
    static readonly TEXT_STYLE: Adapter;
    static readonly EFFECT_INSTANCE: Adapter;
    static readonly ATTRIBUTE_MODIFIER: Adapter;
    static readonly ITEM_STACK: Adapter;
    static readonly INGREDIENT: Adapter;
    constructor(field: Field, parent: any, defaultValue: T, valueMeta: Value, comment: IComment, codec: Codec<T>);
    static of<T>(classType: Type, codec: Codec<T>): Adapter<T>;
    readValue(reader: JsonReader, resolver: PropertyResolver, logger: Logger): T;
    writeValue(value: T, writer: JsonWriter, resolver: PropertyResolver, logger: Logger): void;
  }


  interface MinecraftPropertyPlugin extends IDefaultPropertyAdapters {}
  class MinecraftPropertyPlugin extends IDefaultPropertyAdapters {
    register(registry: Consumer<IPropertyAdapter<any>>): void;
  }

}

declare module 'net.darkhax.pricklemc.common.impl.config.property.CodecProperty' {
  import { IPropertyAdapter } from 'net.darkhax.pricklemc.common.api.config.property';
  import { CodecProperty } from 'net.darkhax.pricklemc.common.impl.config.property';
  import { PropertyResolver } from 'net.darkhax.pricklemc.common.api.config';
  import { Field } from 'java.lang.reflect';
  import { Value } from 'net.darkhax.pricklemc.common.api.annotations';

  interface Adapter<T = any> extends IPropertyAdapter<CodecProperty> {}
  class Adapter<T = any> extends IPropertyAdapter<CodecProperty> {
    toValue(resolver: PropertyResolver, field: Field, parent: any, value: any, valueMeta: Value): CodecProperty<T>;
  }

}

declare module 'net.darkhax.pricklemc.common.impl' {
  import { Logger } from 'org.slf4j';
  import { ResourceLocation } from 'net.minecraft.resources';

  class Constants {
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static readonly LOG: Logger;
    static readonly DEFAULT_INDENT: string;
    static id(path: string): ResourceLocation;
  }


  class PrickleMod {
    static get instance(): PrickleMod;
    init(): void;
  }

}

declare module 'net.darkhax.pricklemc.neoforge.impl' {
  import { IEventBus } from 'net.neoforged.bus.api';

  class NeoForgeMod {
    constructor(eventBus: IEventBus);
  }

}

declare module 'net.darkhax.pricklemc.neoforge.impl.util' {
  import { IPlatformHelper } from 'net.darkhax.pricklemc.common.api.util';
  import { Path } from 'java.nio.file';

  interface NeoForgePlatformHelper extends IPlatformHelper {}
  class NeoForgePlatformHelper extends IPlatformHelper {
    get configPath(): Path;
    get name(): string;
  }

}