declare module 'me.fzzyhmstrs.fzzy_config.annotations' {
  import { Enum } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Component } from 'net.minecraft.network.chat';
  import { EnumEntries } from 'kotlin.enums';

  interface Action extends Enum<Action> {}
  class Action extends Enum<Action> {
    static readonly RESTART: Action;
    static readonly RELOG: Action;
    static readonly RELOAD_BOTH: Action;
    static readonly RELOAD_DATA: Action;
    static readonly RELOAD_RESOURCES: Action;
    get clientPrompt(): Component;
    get clientUpdateMessage(): Component;
    get configTooltip(): Component;
    static get entries(): EnumEntries<Action>;
    get restartPrompt(): boolean;
    get sectionTooltip(): Component;
    get serverUpdateMessage(): Component;
    get settingTooltip(): Component;
    get sprite(): ResourceLocation;
    isPriority$fzzy_config(other: Action): boolean;
    static valueOf(value: string): Action;
    static values(): Action[];
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.api' {
  import { Function0 } from 'kotlin.jvm.functions';
  import { Config, ConfigContext } from 'me.fzzyhmstrs.fzzy_config.config';
  import { Supplier, BiConsumer } from 'java.util.function';
  import { ConfigScreenProvider } from 'me.fzzyhmstrs.fzzy_config.screen';
  import { TomlElement } from 'net.peanuuutz.tomlkt';
  import { List, Set } from 'java.util';
  import { ValidationResult, PlatformApi } from 'me.fzzyhmstrs.fzzy_config.util';
  import { Mutable, Type } from 'ValidationResult.ErrorEntry';
  import { Pair } from 'kotlin';
  import { File, Reader } from 'java.io';
  import { Boolean, Class, Enum } from 'java.lang';
  import { Action } from 'me.fzzyhmstrs.fzzy_config.annotations';
  import { KClass } from 'kotlin.reflect';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { NetworkApi } from 'me.fzzyhmstrs.fzzy_config.networking.api';
  import { EventApi } from 'me.fzzyhmstrs.fzzy_config.event.api';
  import { ResultApi, ResultApiJava } from 'me.fzzyhmstrs.fzzy_config.result.api';
  import { EnumEntries } from 'kotlin.enums';

  class ConfigApi {
    static readonly INSTANCE: ConfigApi;
    static actions(thing: any): Set<Action>;
    static buildTranslations<T>(kClass: KClass<T>, id: ResourceLocation, lang: string, logWarnings: boolean, builder: BiConsumer<string, string>): void;
    static deserializeConfig<T>(config: T, string: string, errorBuilder: string[], flags: number): ValidationResult<ConfigContext<T>>;
    static deserializeConfig<T>(config: T, string: string, errorBuilder: Mutable, flags: number): ValidationResult<T>;
    static deserializeConfig<T>(config: T, string: string, errorHeader: string, flags: number): ValidationResult<T>;
    static deserializeConfig<T>(config: T, string: string, errorBuilder: string[]): ValidationResult<ConfigContext<T>>;
    static deserializeConfig<T>(config: T, string: string, errorBuilder: Mutable): ValidationResult<T>;
    static deserializeConfig<T>(config: T, string: string, errorHeader: string): ValidationResult<T>;
    static deserializeConfig<T>(config: T, string: string): ValidationResult<T>;
    static deserializeConfig$default(object: any, string: string, list: List, by: number, n: number, object2: any): ValidationResult;
    static deserializeConfig$default(object: any, string: string, mutable: Mutable, by: number, n: number, object2: any): ValidationResult;
    static deserializeConfig$default(object: any, string: string, string2: string, by: number, n: number, object2: any): ValidationResult;
    static deserializeFromToml<T>(config: T, toml: TomlElement, errorBuilder: string[], flags: number): ValidationResult<ConfigContext<T>>;
    static deserializeFromToml<T>(config: T, toml: TomlElement, errorBuilder: Mutable, flags: number): ValidationResult<T>;
    static deserializeFromToml<T>(config: T, toml: TomlElement, errorHeader: string, flags: number): ValidationResult<T>;
    static deserializeFromToml<T>(config: T, toml: TomlElement, errorBuilder: string[]): ValidationResult<ConfigContext<T>>;
    static deserializeFromToml<T>(config: T, toml: TomlElement, errorBuilder: Mutable): ValidationResult<T>;
    static deserializeFromToml<T>(config: T, toml: TomlElement, errorHeader: string): ValidationResult<T>;
    static deserializeFromToml<T>(config: T, toml: TomlElement): ValidationResult<T>;
    static deserializeFromToml$default(object: any, tomlElement: TomlElement, list: List, by: number, n: number, object2: any): ValidationResult;
    static deserializeFromToml$default(object: any, tomlElement: TomlElement, mutable: Mutable, by: number, n: number, object2: any): ValidationResult;
    static deserializeFromToml$default(object: any, tomlElement: TomlElement, string: string, by: number, n: number, object2: any): ValidationResult;
    static event(): EventApi;
    static isConfigLoaded(scope: string): boolean;
    static isConfigLoaded(scope: string, type: RegisterType): boolean;
    static isScreenOpen(scope: string): boolean;
    static makeDir(folder: string, subfolder: string): Pair<File, boolean>;
    network(): NetworkApi;
    openScreen(scope: string): void;
    static parseReader(reader: Reader): TomlElement;
    static platform(): PlatformApi;
    static readOrCreateAndValidate<T extends Config>(name: string, folder: string, subfolder: string, configClass: Function0<T>): T;
    static readOrCreateAndValidate<T extends Config>(name: string, folder: string, subfolder: string, configClass: Supplier<T>): T;
    static readOrCreateAndValidate<T extends Config>(configClass: Function0<T>): T;
    static readOrCreateAndValidate<T extends Config>(configClass: Supplier<T>): T;
    static readOrCreateAndValidate<T extends Config>(name: string, folder: string, configClass: Function0<T>): T;
    static readOrCreateAndValidate<T extends Config>(name: string, configClass: Function0<T>): T;
    static readOrCreateAndValidate<T extends Config>(name: string, folder: string, configClass: Supplier<T>): T;
    static readOrCreateAndValidate<T extends Config>(name: string, configClass: Supplier<T>): T;
    static readOrCreateAndValidate$default(string: string, string2: string, string3: string, function0: Function0, n: number, object: any): Config;
    static readOrCreateAndValidate$default(string: string, string2: string, string3: string, supplier2: Supplier, n: number, object: any): Config;
    static registerAndLoadConfig<T extends Config>(configClass: Function0<T>, registerType: RegisterType): T;
    static registerAndLoadConfig<T extends Config>(configClass: Supplier<T>, registerType: RegisterType): T;
    static registerAndLoadConfig<T extends Config>(configClass: Function0<T>): T;
    static registerAndLoadConfig<T extends Config>(configClass: Supplier<T>): T;
    static registerAndLoadConfig$default(function0: Function0, registerType: RegisterType, n: number, object: any): Config;
    static registerAndLoadConfig$default(supplier2: Supplier, registerType: RegisterType, n: number, object: any): Config;
    static registerAndLoadNoGuiConfig<T extends Config>(configClass: Supplier<T>, registerType: RegisterType): T;
    static registerAndLoadNoGuiConfig$default(supplier2: Supplier, registerType: RegisterType, n: number, object: any): Config;
    static registerConfig<T extends Config>(config: T, configClass: Function0<T>, registerType: RegisterType): T;
    static registerConfig<T extends Config>(config: T, configClass: Supplier<T>, registerType: RegisterType): T;
    static registerConfig<T extends Config>(config: T, configClass: Function0<T>): T;
    static registerConfig<T extends Config>(config: T, configClass: Supplier<T>): T;
    static registerConfig$default(config: Config, function0: Function0, registerType: RegisterType, n: number, object: any): Config;
    static registerConfig$default(config: Config, supplier2: Supplier, registerType: RegisterType, n: number, object: any): Config;
    static registerScreenProvider(namespace: string, provider: ConfigScreenProvider): void;
    static result(): ResultApi;
    static save<T extends Config>(configClass: T): void;
    static saveManual<T extends Config>(name: string, folder: string, subfolder: string, configClass: T): void;
    static saveManual<T extends Config>(name: string, folder: string, configClass: T): void;
    static saveManual<T extends Config>(name: string, configClass: T): void;
    static saveManual$default(string: string, string2: string, string3: string, config: Config, n: number, object: any): void;
    static serializeConfig<T>(config: T, errorBuilder: string[], flags: number): string;
    static serializeConfig<T>(config: T, errorBuilder: Mutable, flags: number): ValidationResult<string>;
    static serializeConfig<T>(config: T, errorHeader: string, flags: number): ValidationResult<string>;
    static serializeConfig<T>(config: T, errorBuilder: string[]): string;
    static serializeConfig<T>(config: T, errorBuilder: Mutable): ValidationResult<string>;
    static serializeConfig<T>(config: T, errorHeader: string): ValidationResult<string>;
    static serializeConfig<T>(config: T): ValidationResult<string>;
    static serializeConfig$default(object: any, list: List, by: number, n: number, object2: any): string;
    static serializeConfig$default(object: any, mutable: Mutable, by: number, n: number, object2: any): ValidationResult;
    static serializeConfig$default(object: any, string: string, by: number, n: number, object2: any): ValidationResult;
    static serializeToToml<T>(config: T, errorBuilder: string[], flags: number): TomlElement;
    static serializeToToml<T>(config: T, errorBuilder: Mutable, flags: number): ValidationResult<TomlElement>;
    static serializeToToml<T>(config: T, errorHeader: string, flags: number): ValidationResult<TomlElement>;
    static serializeToToml<T>(config: T, errorBuilder: string[]): TomlElement;
    static serializeToToml<T>(config: T, errorBuilder: Mutable): ValidationResult<TomlElement>;
    static serializeToToml<T>(config: T, errorHeader: string): ValidationResult<TomlElement>;
    static serializeToToml<T>(config: T): ValidationResult<TomlElement>;
    static serializeToToml$default(object: any, list: List, by: number, n: number, object2: any): TomlElement;
    static serializeToToml$default(object: any, mutable: Mutable, by: number, n: number, object2: any): ValidationResult;
    static serializeToToml$default(object: any, string: string, by: number, n: number, object2: any): ValidationResult;
  }


  class ConfigApiJava {
    static readonly INSTANCE: ConfigApiJava;
    static buildTranslations<T>(jClass: Class<T>, id: ResourceLocation, lang: string, logWarnings: boolean, builder: BiConsumer<string, string>): void;
    static event(): EventApi;
    static isConfigLoaded(scope: string): boolean;
    static isConfigLoaded(scope: string, type: RegisterType): boolean;
    static isScreenOpen(scope: string): boolean;
    static network(): NetworkApi;
    openScreen(scope: string): void;
    static platform(): PlatformApi;
    static registerAndLoadConfig<T extends Config>(configClass: Supplier<T>, registerType: RegisterType): T;
    static registerAndLoadConfig<T extends Config>(configClass: Supplier<T>): T;
    static registerAndLoadConfig$default(supplier2: Supplier, registerType: RegisterType, n: number, object: any): Config;
    static registerAndLoadNoGuiConfig<T extends Config>(configClass: Supplier<T>, registerType: RegisterType): T;
    static registerAndLoadNoGuiConfig$default(supplier2: Supplier, registerType: RegisterType, n: number, object: any): Config;
    static registerConfig<T extends Config>(config: T, configClass: Supplier<T>, registerType: RegisterType): T;
    static registerConfig<T extends Config>(config: T, configClass: Supplier<T>): T;
    static registerConfig$default(config: Config, supplier2: Supplier, registerType: RegisterType, n: number, object: any): Config;
    static registerScreenProvider(namespace: string, provider: ConfigScreenProvider): void;
    static result(): ResultApiJava;
  }


  interface FileType extends Enum<FileType> {}
  class FileType extends Enum<FileType> {
    static readonly TOML: FileType;
    static readonly JSON: FileType;
    static readonly JSON5: FileType;
    static readonly JSONC: FileType;
    decode(input: string): ValidationResult<TomlElement>;
    encode(input: TomlElement): ValidationResult<string>;
    get decodeType$fzzy_config(): Type<string>;
    get encodeType$fzzy_config(): Type<string>;
    static get entries(): EnumEntries<FileType>;
    suffix(): string;
    static valueOf(value: string): FileType;
    static values(): FileType[];
  }


  interface RegisterType extends Enum<RegisterType> {}
  class RegisterType extends Enum<RegisterType> {
    static readonly BOTH: RegisterType;
    static readonly SERVER: RegisterType;
    static readonly CLIENT: RegisterType;
    static get entries(): EnumEntries<RegisterType>;
    static valueOf(value: string): RegisterType;
    static values(): RegisterType[];
  }


  interface SaveType extends Enum<SaveType> {}
  class SaveType extends Enum<SaveType> {
    static readonly OVERWRITE: SaveType;
    static readonly SEPARATE: SaveType;
    static get entries(): EnumEntries<SaveType>;
    incompatibleWith$fzzy_config(actions: Set<Action>): boolean;
    incompatibleWith$fzzy_config(action: Action): boolean;
    static valueOf(value: string): SaveType;
    static values(): SaveType[];
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.config' {
  import { Walkable, Translatable, TranslatableEntry, ValidationResult } from 'me.fzzyhmstrs.fzzy_config.util';
  import { EntryAnchor, EntryWidget, EntryFlag, EntryCreator, EntryTransient, EntryDeserializer, EntrySerializer, EntryParent } from 'me.fzzyhmstrs.fzzy_config.entry';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { File } from 'java.io';
  import { FileType, SaveType } from 'me.fzzyhmstrs.fzzy_config.api';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Anchor } from 'EntryAnchor';
  import { MutableComponent, Component } from 'net.minecraft.network.chat';
  import { Supplier } from 'java.util.function';
  import { Boolean, Runnable, Integer } from 'java.lang';
  import { Decorated } from 'me.fzzyhmstrs.fzzy_config.screen.decoration';
  import { TextureProvider } from 'me.fzzyhmstrs.fzzy_config.screen.widget';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { ChoiceValidator } from 'me.fzzyhmstrs.fzzy_config.validation.misc';
  import { List, Set } from 'java.util';
  import { Creator, CreatorContext } from 'me.fzzyhmstrs.fzzy_config.entry.EntryCreator';
  import { Flag } from 'me.fzzyhmstrs.fzzy_config.entry.EntryFlag';
  import { Key } from 'me.fzzyhmstrs.fzzy_config.config.ConfigContext';
  import { TomlElement } from 'net.peanuuutz.tomlkt';
  import { Action } from 'me.fzzyhmstrs.fzzy_config.annotations';

  interface Config extends Walkable, Translatable, EntryAnchor {}
  class Config extends Walkable {
    constructor(identifier: ResourceLocation, subfolder: string, folder: string, name: string);

    constructor(resourceLocation: ResourceLocation, string: string, string2: string, string3: string, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(identifier: ResourceLocation, subfolder: string, folder: string);

    constructor(identifier: ResourceLocation, subfolder: string);

    constructor(identifier: ResourceLocation);
    anchorEntry(anchor: Anchor): Anchor;
    anchorId(scope: string): string;
    defaultPermLevel(): number;
    description(fallback: string): MutableComponent;
    descriptionKey(): string;
    fileType(): FileType;
    get dir(): File;
    get folder(): string;
    get id(): ResourceLocation;
    get name(): string;
    get subfolder(): string;
    onSyncClient(): void;
    onSyncServer(): void;
    onUpdateClient(): void;
    onUpdateServer(playerEntity: ServerPlayer): void;
    prefix(fallback: string): MutableComponent;
    save(): void;
    saveType(): SaveType;
    toString(): string;
    translation(fallback: string): MutableComponent;
    translationKey(): string;
    update(deserializedVersion: number): void;
  }


  interface ConfigAction extends EntryWidget<any>, EntryFlag, EntryCreator, EntryTransient, TranslatableEntry {}
  class ConfigAction extends EntryWidget<any> {
    constructor(titleSupplier: Supplier<Component>, activeSupplier: Supplier<boolean>, pressAction: Runnable, decoration: Decorated, description: Component, background: TextureProvider);

    constructor(supplier2: Supplier, supplier3: Supplier, runnable: Runnable, decorated: Decorated, component: Component, textureProvider: TextureProvider, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(titleSupplier: Supplier<Component>, activeSupplier: Supplier<boolean>, pressAction: Runnable, decoration: ResourceLocation, description: Component, background: ResourceLocation);

    constructor(supplier2: Supplier, supplier3: Supplier, runnable: Runnable, resourceLocation: ResourceLocation, component: Component, resourceLocation2: ResourceLocation, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(titleSupplier: Supplier<Component>, activeSupplier: Supplier<boolean>, pressAction: Runnable, decoration: Decorated, description: Component);

    constructor(titleSupplier: Supplier<Component>, activeSupplier: Supplier<boolean>, pressAction: Runnable, decoration: Decorated);
    createEntry(context: CreatorContext): Creator[];
    description(fallback: string): MutableComponent;
    get translatableEntryKey(): string;
    hasDescription(): boolean;
    hasFlag(flag: Flag): boolean;
    set translatableEntryKey(string: string);
    setFlag(flag: Flag): void;
    setFlag$fzzy_config(flag: number): void;
    widgetEntry(choicePredicate: ChoiceValidator<any>): AbstractWidget;
  }


  class ConfigContext<T = any> {
    constructor(config: T);
    get<C>(key: Key<C>): C;
    get config(): T;
    getInt(key: Key<number>): number;
    getOrDefault<C>(key: Key<C>, fallback: C): C;
    withContext<C>(key: Key<C>, value: C): ConfigContext<T>;
  }


  interface ConfigSection extends Walkable, EntryDeserializer<ConfigSection>, EntrySerializer<ConfigSection>, TranslatableEntry, EntryParent, EntryAnchor, EntryCreator {}
  class ConfigSection extends Walkable {
    actions(): Set<Action>;
    anchorEntry(anchor: Anchor): Anchor;
    anchorId(scope: string): string;
    createEntry(context: CreatorContext): Creator[];
    deserializeEntry(toml: TomlElement, errorBuilder: string[], fieldName: string, flags: number): ValidationResult<ConfigSection>;
    deserializeEntry(toml: TomlElement, fieldName: string, flags: number): ValidationResult<ConfigSection>;
    get translatableEntryKey(): string;
    serializeEntry(input: ConfigSection, errorBuilder: string[], flags: number): TomlElement;
    serializeEntry(input: ConfigSection, flags: number): ValidationResult<TomlElement>;
    set translatableEntryKey(string: string);
    toString(): string;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.config.ConfigAction' {
  import { Component, ClickEvent } from 'net.minecraft.network.chat';
  import { Supplier } from 'java.util.function';
  import { Boolean, Runnable } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { TextureProvider } from 'me.fzzyhmstrs.fzzy_config.screen.widget';
  import { Decorated } from 'me.fzzyhmstrs.fzzy_config.screen.decoration';
  import { Flag } from 'me.fzzyhmstrs.fzzy_config.entry.EntryFlag';
  import { ConfigAction } from 'me.fzzyhmstrs.fzzy_config.config';

  class Builder {
    active(activeSupplier: Supplier<boolean>): Builder;
    background(id: ResourceLocation): Builder;
    background(tex: TextureProvider): Builder;
    build(action: Runnable): ConfigAction;
    build(clickEvent: ClickEvent): ConfigAction;
    decoration(id: ResourceLocation): Builder;
    decoration(deco: Decorated): Builder;
    desc(desc: Component): Builder;
    flag(flag: Flag): Builder;
    title(title: Component): Builder;
    title(titleSupplier: Supplier<Component>): Builder;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.config.ConfigAction.Builder' {
  class WhenMappings {
    static readonly $EnumSwitchMapping$0: number[];
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.config.ConfigContext' {
  class Key<C = any> {
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.entry' {
  import { Consumer, Supplier } from 'java.util.function';
  import { Companion } from 'me.fzzyhmstrs.fzzy_config.entry.EntryChecker';
  import { ValidationResult } from 'me.fzzyhmstrs.fzzy_config.util';
  import { ValidationType } from 'me.fzzyhmstrs.fzzy_config.entry.EntryValidator';
  import { List, LinkedList, Set } from 'java.util';
  import { Creator, CreatorContext } from 'me.fzzyhmstrs.fzzy_config.entry.EntryCreator';
  import { Annotation } from 'java.lang.annotation';
  import { TomlElement } from 'net.peanuuutz.tomlkt';
  import { Flag } from 'me.fzzyhmstrs.fzzy_config.entry.EntryFlag';
  import { Action } from 'me.fzzyhmstrs.fzzy_config.annotations';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Suggestions } from 'com.mojang.brigadier.suggestion';
  import { ChoiceValidator } from 'me.fzzyhmstrs.fzzy_config.validation.misc';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';

  interface Entry<T = any, E extends Entry<T, E> = any> extends EntryHandler<T>, EntryWidget<T>, EntryFlag, Consumer<T>, Supplier<T> {}
  class Entry<T = any, E extends Entry<T, E> = any> extends EntryHandler<T> {
    instanceEntry(): E;
    isValidEntry(var1: any): boolean;
    listenToEntry(var1: Consumer<Entry<T, any>>): void;
    trySet(var1: any): void;
  }


  interface EntryChecker<T = any> extends EntryValidator<T>, EntryCorrector<T> {}
  class EntryChecker<T = any> extends EntryValidator<T> {
    static readonly Companion: Companion;
  }


  class EntryCorrector<T = any> {
    correctEntry(var1: T, var2: ValidationType): ValidationResult<T>;
  }


  class EntryCreator {
    createEntry(var1: CreatorContext): Creator[];
    prepare(scope: string, groups: LinkedList<string>, annotations: Annotation[], globalAnnotations: Annotation[]): void;
  }


  class EntryDeserializer<T = any> {
    deserializeEntry(var1: TomlElement, var2: string[], var3: string, var4: number): ValidationResult<T>;
    deserializeEntry(toml: TomlElement, fieldName: string, flags: number): ValidationResult<T>;
    deserializedChanged(old: any, object: any): boolean;
  }


  class EntryFlag {
    flags(): number;
    hasFlag(flag: Flag): boolean;
    setFlag(flag: Flag): void;
  }


  interface EntryHandler<T = any> extends EntrySerializer<T>, EntryDeserializer<T>, EntryValidator<T>, EntryCorrector<T> {}
  class EntryHandler<T = any> extends EntrySerializer<T> {
    copyValue(input: T): T;
  }


  class EntryKeyed {
    get entryKey(): string;
    set entryKey(var1: string);
  }


  class EntryOpener {
    open(var1: string[]): void;
  }


  class EntryParent {
    actions(): Set<Action>;
    continueWalk(): boolean;
  }


  class EntryPermissible {
  }


  class EntrySerializer<T = any> {
    serializeEntry(var1: T, var2: string[], var3: number): TomlElement;
    serializeEntry(input: T, flags: number): ValidationResult<TomlElement>;
  }


  class EntrySuggester<T = any> {
    getSuggestions(var1: string, var2: number, var3: ChoiceValidator<T>): CompletableFuture<Suggestions>;
  }


  class EntryTransient {
  }


  class EntryValidator<T = any> {
    validateEntry(var1: T, var2: ValidationType): ValidationResult<T>;
  }


  class EntryWidget<T = any> {
    widgetAndTooltipEntry(choicePredicate: ChoiceValidator<T>): AbstractWidget;
    static widgetAndTooltipEntry$default(entryWidget: EntryWidget, choiceValidator: ChoiceValidator, n: number, object: any): AbstractWidget;
    widgetEntry(var1: ChoiceValidator<T>): AbstractWidget;
    static widgetEntry$default(entryWidget: EntryWidget, choiceValidator: ChoiceValidator, n: number, object: any): AbstractWidget;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.entry.Entry' {
  import { Entry } from 'me.fzzyhmstrs.fzzy_config.entry';
  import { ValidationResult } from 'me.fzzyhmstrs.fzzy_config.util';
  import { TomlElement } from 'net.peanuuutz.tomlkt';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { ChoiceValidator } from 'me.fzzyhmstrs.fzzy_config.validation.misc';
  import { Flag } from 'me.fzzyhmstrs.fzzy_config.entry.EntryFlag';

  class DefaultImpls {
    static copyValue<T, E extends Entry<T, E>>($this: Entry<T, E>, input: T): T;
    static deserializeEntry<T, E extends Entry<T, E>>($this: Entry<T, E>, toml: TomlElement, fieldName: string, flags: number): ValidationResult<T>;
    static deserializedChanged<T, E extends Entry<T, E>>($this: Entry<T, E>, old: any, object: any): boolean;
    static flags<T, E extends Entry<T, E>>($this: Entry<T, E>): number;
    static hasFlag<T, E extends Entry<T, E>>($this: Entry<T, E>, flag: Flag): boolean;
    static serializeEntry<T, E extends Entry<T, E>>($this: Entry<T, E>, input: T, flags: number): ValidationResult<TomlElement>;
    static setFlag<T, E extends Entry<T, E>>($this: Entry<T, E>, flag: Flag): void;
    static widgetAndTooltipEntry<T, E extends Entry<T, E>>($this: Entry<T, E>, choicePredicate: ChoiceValidator<T>): AbstractWidget;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.entry.EntryChecker' {
  import { EntryChecker } from 'me.fzzyhmstrs.fzzy_config.entry';

  class Companion {
    any<T>(): EntryChecker<T>;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.entry.EntryCorrector' {
  import { EntryCorrector } from 'me.fzzyhmstrs.fzzy_config.entry';
  import { Predicate } from 'java.util.function';

  class AbstractBuilder<T = any, E extends AbstractBuilder<T, E> = any> {
    both(corrector: EntryCorrector<T>): E;
    both(predicate: Predicate<T>, errorMsg: string): E;
    static both$default(abstractBuilder: AbstractBuilder, predicate: Predicate, string: string, n: number, object: any): AbstractBuilder;
    buildCorrector(): EntryCorrector<T>;
    strong(corrector: EntryCorrector<T>): E;
    strong(predicate: Predicate<T>, errorMsg: string): E;
    static strong$default(abstractBuilder: AbstractBuilder, predicate: Predicate, string: string, n: number, object: any): AbstractBuilder;
    weak(corrector: EntryCorrector<T>): E;
    weak(predicate: Predicate<T>, errorMsg: string): E;
    static weak$default(abstractBuilder: AbstractBuilder, predicate: Predicate, string: string, n: number, object: any): AbstractBuilder;
  }


  interface Builder<T = any> extends AbstractBuilder<T, Builder> {}
  class Builder<T = any> extends AbstractBuilder<T, Builder> {
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.entry.EntryCreator' {
  import { Result } from 'Translatable';
  import { BiFunction } from 'java.util.function';
  import { DynamicListWidget } from 'me.fzzyhmstrs.fzzy_config.screen.widget';
  import { Integer } from 'java.lang';
  import { Entry } from 'DynamicListWidget';
  import { LinkedList, List, Set } from 'java.util';
  import { Annotation } from 'java.lang.annotation';
  import { Action } from 'me.fzzyhmstrs.fzzy_config.annotations';

  class Creator {
    constructor(scope: string, texts: Result, entry: BiFunction<DynamicListWidget, number, Entry>);
    get entry(): BiFunction<DynamicListWidget, number, Entry>;
    get scope(): string;
    get texts(): Result;
  }


  class CreatorContext {
    constructor(scope: string, groups: LinkedList<string>, client: boolean, texts: Result, annotations: Annotation[], actions: Set<Action>, misc: CreatorContextMisc);
    get actions(): Set<Action>;
    get annotations(): Annotation[];
    get client(): boolean;
    get groups(): LinkedList<string>;
    get misc(): CreatorContextMisc;
    get scope(): string;
    get texts(): Result;
  }


  class CreatorContextKey<T = any> {
  }


  class CreatorContextMisc {
    get<T>(key: CreatorContextKey<T>): T;
    put$fzzy_config<T>(key: CreatorContextKey<T>, value: T): CreatorContextMisc;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.entry.EntryDeserializer' {
  import { ValidationResult } from 'me.fzzyhmstrs.fzzy_config.util';
  import { EntryDeserializer } from 'me.fzzyhmstrs.fzzy_config.entry';
  import { TomlElement } from 'net.peanuuutz.tomlkt';

  class DefaultImpls {
    static deserializeEntry<T>($this: EntryDeserializer<T>, toml: TomlElement, fieldName: string, flags: number): ValidationResult<T>;
    static deserializedChanged<T>($this: EntryDeserializer<T>, old: any, object: any): boolean;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.entry.EntryFlag' {
  import { EntryFlag } from 'me.fzzyhmstrs.fzzy_config.entry';
  import { Enum } from 'java.lang';
  import { Companion } from 'me.fzzyhmstrs.fzzy_config.entry.EntryFlag.Flag';
  import { EnumEntries } from 'kotlin.enums';

  class DefaultImpls {
    static flags($this: EntryFlag): number;
    static hasFlag($this: EntryFlag, flag: Flag): boolean;
    static setFlag($this: EntryFlag, flag: Flag): void;
  }


  interface Flag extends Enum<Flag> {}
  class Flag extends Enum<Flag> {
    static readonly Companion: Companion;
    static readonly REQUIRES_WORLD: Flag;
    static readonly QUIET: Flag;
    static readonly STRONG: Flag;
    static readonly UPDATE: Flag;
    static readonly SEPARATE: Flag;
    static get entries(): EnumEntries<Flag>;
    get flag$fzzy_config(): number;
    static valueOf(value: string): Flag;
    static values(): Flag[];
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.entry.EntryFlag.Flag' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { List } from 'java.util';
  import { Flag } from 'me.fzzyhmstrs.fzzy_config.entry.EntryFlag';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get nONE(): Flag[];
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.entry.EntryHandler' {
  import { EntryHandler } from 'me.fzzyhmstrs.fzzy_config.entry';
  import { ValidationResult } from 'me.fzzyhmstrs.fzzy_config.util';
  import { TomlElement } from 'net.peanuuutz.tomlkt';

  class DefaultImpls {
    static copyValue<T>($this: EntryHandler<T>, input: T): T;
    static deserializeEntry<T>($this: EntryHandler<T>, toml: TomlElement, fieldName: string, flags: number): ValidationResult<T>;
    static deserializedChanged<T>($this: EntryHandler<T>, old: any, object: any): boolean;
    static serializeEntry<T>($this: EntryHandler<T>, input: T, flags: number): ValidationResult<TomlElement>;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.entry.EntryValidator' {
  import { EntryValidator } from 'me.fzzyhmstrs.fzzy_config.entry';
  import { Predicate } from 'java.util.function';
  import { Enum } from 'java.lang';
  import { EnumEntries } from 'kotlin.enums';

  class AbstractBuilder<T = any, E extends AbstractBuilder<T, E> = any> {
    both(validator: EntryValidator<T>): E;
    both(predicate: Predicate<T>, errorMsg: string): E;
    static both$default(abstractBuilder: AbstractBuilder, predicate: Predicate, string: string, n: number, object: any): AbstractBuilder;
    buildValidator(): EntryValidator<T>;
    strong(validator: EntryValidator<T>): E;
    strong(predicate: Predicate<T>, errorMsg: string): E;
    static strong$default(abstractBuilder: AbstractBuilder, predicate: Predicate, string: string, n: number, object: any): AbstractBuilder;
    weak(validator: EntryValidator<T>): E;
    weak(predicate: Predicate<T>, errorMsg: string): E;
    static weak$default(abstractBuilder: AbstractBuilder, predicate: Predicate, string: string, n: number, object: any): AbstractBuilder;
  }


  interface Builder<T = any> extends AbstractBuilder<T, Builder> {}
  class Builder<T = any> extends AbstractBuilder<T, Builder> {
  }


  interface ValidationType extends Enum<ValidationType> {}
  class ValidationType extends Enum<ValidationType> {
    static readonly WEAK: ValidationType;
    static readonly STRONG: ValidationType;
    static get entries(): EnumEntries<ValidationType>;
    static valueOf(value: string): ValidationType;
    static values(): ValidationType[];
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.event.api' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Config } from 'me.fzzyhmstrs.fzzy_config.config';
  import { ServerPlayer } from 'net.minecraft.server.level';

  class EventApi {
    onRegisteredClient(var1: ResourceLocation, var2: OnRegisteredClientListener): void;
    onRegisteredServer(var1: ResourceLocation, var2: OnRegisteredServerListener): void;
    onSyncClient(var1: OnSyncClientListener): void;
    onSyncServer(var1: OnSyncServerListener): void;
    onUpdateClient(var1: OnUpdateClientListener): void;
    onUpdateServer(var1: OnUpdateServerListener): void;
  }


  class OnRegisteredClientListener {
    onRegistered(var1: Config): void;
  }


  class OnRegisteredServerListener {
    onRegistered(var1: Config): void;
  }


  class OnSyncClientListener {
    onSync(var1: ResourceLocation, var2: Config): void;
  }


  class OnSyncServerListener {
    onSync(var1: ResourceLocation, var2: Config): void;
  }


  class OnUpdateClientListener {
    onChanged(var1: ResourceLocation, var2: Config): void;
  }


  class OnUpdateServerListener {
    onChanged(var1: ResourceLocation, var2: Config, var3: ServerPlayer): void;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config' {
  import { Logger } from 'org.slf4j';
  import { Consumer, Function } from 'java.util.function';
  import { Boolean } from 'java.lang';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ResourceLocation } from 'net.minecraft.resources';

  class FC {
    static readonly INSTANCE: FC;
    static readonly MOD_ID: string;
    get dEVLOG$fzzy_config(): Logger;
    get lOGGER$fzzy_config(): Logger;
  }


  class FCC {
    static readonly INSTANCE: FCC;
    openRestartScreen(): void;
    openScopedScreen(scope: string): void;
    withRestart(functionParameter: Function<boolean, boolean>): void;
    withScope(consumer2: Consumer<string>): void;
  }


  class FzzyConfigNeoForge {
    constructor(bus: IEventBus);
  }


  class FzzyConfigNeoForgeClient {
    constructor();
  }


  class Fzzy_configKt {
    static cast<T>($this$cast: any): T;
    static fcId($this$fcId: string): ResourceLocation;
    static nsId($this$nsId: string, path: string): ResourceLocation;
    static nullCast<T>($this$nullCast: any): T;
    static simpleId($this$simpleId: string): ResourceLocation;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.impl.config' {
  import { Config } from 'me.fzzyhmstrs.fzzy_config.config';
  import { Companion } from 'me.fzzyhmstrs.fzzy_config.impl.config.KeybindsConfig';
  import { ValidatedKeybind, ValidatedCondition, ValidatedEnum, ValidatedBoolean } from 'me.fzzyhmstrs.fzzy_config.validation.misc';
  import { Companion as me_fzzyhmstrs_fzzy_config_impl_config_searchconfig_Companion, Modifier, SearchBehavior } from 'me.fzzyhmstrs.fzzy_config.impl.config.SearchConfig';
  import { Supplier } from 'java.util.function';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  interface KeybindsConfig extends Config {}
  class KeybindsConfig extends Config {
    static readonly Companion: Companion;
    constructor();
    get act(): ValidatedKeybind;
    static get act$annotations(): void;
    get back(): ValidatedKeybind;
    static get back$annotations(): void;
    get contextKeyboard(): ValidatedKeybind;
    static get contextKeyboard$annotations(): void;
    get contextMouse(): ValidatedKeybind;
    static get contextMouse$annotations(): void;
    get copy(): ValidatedKeybind;
    static get copy$annotations(): void;
    get cut(): ValidatedKeybind;
    static get cut$annotations(): void;
    get end(): ValidatedKeybind;
    static get end$annotations(): void;
    get find(): ValidatedKeybind;
    static get find$annotations(): void;
    get fullExit(): ValidatedKeybind;
    static get fullExit$annotations(): void;
    get home(): ValidatedKeybind;
    static get home$annotations(): void;
    get info(): ValidatedKeybind;
    static get info$annotations(): void;
    get pageDown(): ValidatedKeybind;
    static get pageDown$annotations(): void;
    get pageUp(): ValidatedKeybind;
    static get pageUp$annotations(): void;
    get paste(): ValidatedKeybind;
    static get paste$annotations(): void;
    static get save$annotations(): void;
    get search(): ValidatedKeybind;
    static get search$annotations(): void;
    get undo(): ValidatedKeybind;
    static get undo$annotations(): void;
    getSave(): ValidatedKeybind;
    set act(validatedKeybind: ValidatedKeybind);
    set back(validatedKeybind: ValidatedKeybind);
    set contextKeyboard(validatedKeybind: ValidatedKeybind);
    set contextMouse(validatedKeybind: ValidatedKeybind);
    set copy(validatedKeybind: ValidatedKeybind);
    set cut(validatedKeybind: ValidatedKeybind);
    set end(validatedKeybind: ValidatedKeybind);
    set find(validatedKeybind: ValidatedKeybind);
    set fullExit(validatedKeybind: ValidatedKeybind);
    set home(validatedKeybind: ValidatedKeybind);
    set info(validatedKeybind: ValidatedKeybind);
    set pageDown(validatedKeybind: ValidatedKeybind);
    set pageUp(validatedKeybind: ValidatedKeybind);
    set paste(validatedKeybind: ValidatedKeybind);
    set search(validatedKeybind: ValidatedKeybind);
    set undo(validatedKeybind: ValidatedKeybind);
    setSave(validatedKeybind: ValidatedKeybind): void;
  }


  interface SearchConfig extends Config {}
  class SearchConfig extends Config {
    static readonly Companion: me_fzzyhmstrs_fzzy_config_impl_config_searchconfig_Companion;
    constructor();
    get behavior(): ValidatedEnum<SearchBehavior>;
    static get behavior$annotations(): void;
    get clearSearch(): ValidatedBoolean;
    static get clearSearch$annotations(): void;
    get modifier(): ValidatedCondition<Modifier>;
    static get modifier$annotations(): void;
    prefixText(suffix: Component[]): Supplier<Component[]>;
    set behavior(validatedEnum: ValidatedEnum<SearchBehavior>);
    set clearSearch(validatedBoolean: ValidatedBoolean);
    set modifier(validatedCondition: ValidatedCondition<Modifier>);
    willPassSearch(): boolean;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.impl.config.KeybindsConfig' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KeybindsConfig } from 'me.fzzyhmstrs.fzzy_config.impl.config';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get iNSTANCE(): KeybindsConfig;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.impl.config.SearchConfig' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { SearchConfig } from 'me.fzzyhmstrs.fzzy_config.impl.config';
  import { Enum } from 'java.lang';
  import { EnumTranslatable } from 'me.fzzyhmstrs.fzzy_config.util';
  import { EnumEntries } from 'kotlin.enums';
  import { Supplier } from 'java.util.function';
  import { List } from 'java.util';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get iNSTANCE(): SearchConfig;
  }


  interface Modifier extends EnumTranslatable, Enum<Modifier> {}
  class Modifier extends EnumTranslatable {
    static readonly ALT: Modifier;
    static readonly SHIFT: Modifier;
    static readonly CTRL: Modifier;
    static get entries(): EnumEntries<Modifier>;
    prefix(): string;
    test(): boolean;
    static valueOf(value: string): Modifier;
    static values(): Modifier[];
  }


  interface SearchBehavior extends EnumTranslatable, Enum<SearchBehavior> {}
  class SearchBehavior extends EnumTranslatable {
    static readonly HOLD_MODIFIER: SearchBehavior;
    static readonly DONT_HOLD_MODIFIER: SearchBehavior;
    static readonly ALWAYS: SearchBehavior;
    static readonly NEVER: SearchBehavior;
    description(fallback: string): MutableComponent;
    static get entries(): EnumEntries<SearchBehavior>;
    get needsMod(): boolean;
    prefix(): string;
    textPrefix(): Supplier<Component[]>;
    translation(fallback: string): MutableComponent;
    static valueOf(value: string): SearchBehavior;
    static values(): SearchBehavior[];
    willPassSearch(modifier: Modifier): boolean;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.impl' {
  import { Map, List, Collection } from 'java.util';
  import { Boolean } from 'java.lang';
  import { Config } from 'me.fzzyhmstrs.fzzy_config.config';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ConfigScreenProvider } from 'me.fzzyhmstrs.fzzy_config.screen';
  import { ConfigBaseUpdateManager } from 'me.fzzyhmstrs.fzzy_config.screen.internal';
  import { Result } from 'Translatable';
  import { Annotation } from 'java.lang.annotation';
  import { PrepareResult, PermResult } from 'me.fzzyhmstrs.fzzy_config.impl.ConfigApiImplClient';
  import { Flag } from 'me.fzzyhmstrs.fzzy_config.entry.EntryFlag';
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { Companion } from 'me.fzzyhmstrs.fzzy_config.impl.ValidScopesArgumentType';
  import { StringReader } from 'com.mojang.brigadier';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Suggestions, SuggestionsBuilder } from 'com.mojang.brigadier.suggestion';
  import { CommandContext } from 'com.mojang.brigadier.context';
  import { Companion as me_fzzyhmstrs_fzzy_config_impl_validsubscopesargumenttype_Companion } from 'me.fzzyhmstrs.fzzy_config.impl.ValidSubScopesArgumentType';

  class ConfigApiImplClient {
    static readonly INSTANCE: ConfigApiImplClient;
    get perms$fzzy_config(): Map<string, Map<string, boolean>>;
    get permsRef$fzzy_config(): Map<string, Map<string, boolean>>;
    get playerPermissionLevel$fzzy_config(): number;
    getClientConfig$fzzy_config(scope: string): Config;
    getClientConfig$fzzy_config(id: ResourceLocation): Config;
    getScreenUpdateManager$fzzy_config(scope: string): ConfigBaseUpdateManager;
    getText$fzzy_config(thing: any, scope: string, fieldName: string, annotations: Annotation[], globalAnnotations: Annotation[], fallback: string): Result;
    static getText$fzzy_config$default(configApiImplClient: ConfigApiImplClient, object: any, string: string, string2: string, list: List, list2: List, string3: string, n: number, object2: any): Result;
    hasNeededPermLevel$fzzy_config(thing: any, playerPermLevel: number, config: any, configId: string, id: string, annotations: Annotation[], clientOnly: boolean, flags: Flag[], cachedPerms: Map<string, Map<string, boolean>>): PermResult;
    isConfigLoaded$fzzy_config(id: ResourceLocation): boolean;
    isConfigLoaded$fzzy_config(scope: string): boolean;
    isScreenOpen$fzzy_config(scope: string): boolean;
    openRestartScreen$fzzy_config(): boolean;
    openScreen$fzzy_config(scope: string): void;
    prepare$fzzy_config(thing: any, playerPermLevel: number, config: any, configId: string, id: string, annotations: Annotation[], globalAnnotations: Annotation[], clientOnly: boolean, flags: Flag[]): PrepareResult;
    registerConfig$fzzy_config(config: Config, baseConfig: Config, noGui: boolean): void;
    registerScreenProvider$fzzy_config(namespace: string, provider: ConfigScreenProvider): void;
  }


  class ConfigSet {
    constructor(active: Config, base: Config, clientOnly: boolean, rootConfig: boolean);
    component1(): Config;
    component2(): Config;
    component3(): boolean;
    component4(): boolean;
    copy(active: Config, base: Config, clientOnly: boolean, rootConfig: boolean): ConfigSet;
    static copy$default(configSet: ConfigSet, config: Config, config2: Config, bl: boolean, bl2: boolean, n: number, object: any): ConfigSet;
    equals(other: any): boolean;
    get active(): Config;
    get base(): Config;
    get clientOnly(): boolean;
    get rootConfig(): boolean;
    hashCode(): number;
    toString(): string;
  }


  interface ValidScopesArgumentType extends ArgumentType<string> {}
  class ValidScopesArgumentType extends ArgumentType<string> {
    static readonly Companion: Companion;
    get examples(): Collection<string>;
    listSuggestions<S>(context: CommandContext<S>, builder: SuggestionsBuilder): CompletableFuture<Suggestions>;
    parse(reader: StringReader): string;
  }


  interface ValidSubScopesArgumentType extends ArgumentType<string> {}
  class ValidSubScopesArgumentType extends ArgumentType<string> {
    static readonly Companion: me_fzzyhmstrs_fzzy_config_impl_validsubscopesargumenttype_Companion;
    get examples(): Collection<string>;
    listSuggestions<S>(context: CommandContext<S>, builder: SuggestionsBuilder): CompletableFuture<Suggestions>;
    parse(reader: StringReader): string;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.impl.ConfigApiImplClient' {
  import { Enum } from 'java.lang';
  import { EnumEntries } from 'kotlin.enums';
  import { Companion } from 'me.fzzyhmstrs.fzzy_config.impl.ConfigApiImplClient.PrepareResult';
  import { Set } from 'java.util';
  import { Action } from 'me.fzzyhmstrs.fzzy_config.annotations';
  import { Result } from 'Translatable';

  interface PermResult extends Enum<PermResult> {}
  class PermResult extends Enum<PermResult> {
    static readonly SUCCESS: PermResult;
    static readonly OUT_OF_GAME: PermResult;
    static readonly FAILURE: PermResult;
    static get entries(): EnumEntries<PermResult>;
    get success(): boolean;
    static valueOf(value: string): PermResult;
    static values(): PermResult[];
  }


  class PrepareResult {
    static readonly Companion: Companion;
    constructor(perms: PermResult, actions: Set<Action>, texts: Result, cont: boolean, fail: boolean);
    get actions(): Set<Action>;
    get cont(): boolean;
    get fail(): boolean;
    get perms(): PermResult;
    get texts(): Result;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.impl.ConfigApiImplClient.PrepareResult' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { PrepareResult } from 'me.fzzyhmstrs.fzzy_config.impl.ConfigApiImplClient';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get fAIL(): PrepareResult;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.impl.ValidScopesArgumentType' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { CommandContext } from 'com.mojang.brigadier.context';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    getValidScope(context: CommandContext<any>, name: string): string;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.impl.ValidSubScopesArgumentType' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { CommandContext } from 'com.mojang.brigadier.context';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    getValidSubScope(context: CommandContext<any>, name: string): string;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.networking.api' {
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { LocalPlayer } from 'net.minecraft.client.player';
  import { IPayloadContext } from 'net.neoforged.neoforge.network.handling';
  import { Runnable } from 'java.lang';
  import { Component } from 'net.minecraft.network.chat';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { ConnectionProtocol, RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { PacketFlow } from 'net.minecraft.network.protocol';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';

  interface C2SPayloadHandler<T extends CustomPacketPayload = any> extends PayloadHandler<T, ServerPlayer, ServerPlayNetworkContext> {}
  class C2SPayloadHandler<T extends CustomPacketPayload = any> extends PayloadHandler<T, ServerPlayer, ServerPlayNetworkContext> {
    handle(var1: T, var2: ServerPlayNetworkContext): void;
  }


  interface ClientPlayNetworkContext extends NetworkContext<LocalPlayer> {}
  class ClientPlayNetworkContext extends NetworkContext<LocalPlayer> {
    constructor(context: IPayloadContext);
    canReply(id: ResourceLocation): boolean;
    disconnect(reason: Component): void;
    execute(runnable: Runnable): void;
    networkPhase(): ConnectionProtocol;
    networkSide(): PacketFlow;
    player(): LocalPlayer;
    reply(payload: CustomPacketPayload): void;
  }


  class NetworkApi {
    canSend(var1: ResourceLocation, var2: Player): boolean;
    registerC2S<T extends CustomPacketPayload>(var1: Type<T>, var2: StreamCodec<RegistryFriendlyByteBuf, T>, var3: C2SPayloadHandler<T>): void;
    registerLenientC2S<T extends CustomPacketPayload>(var1: Type<T>, var2: StreamCodec<RegistryFriendlyByteBuf, T>, var3: C2SPayloadHandler<T>): void;
    registerLenientS2C<T extends CustomPacketPayload>(var1: Type<T>, var2: StreamCodec<RegistryFriendlyByteBuf, T>, var3: S2CPayloadHandler<T>): void;
    registerS2C<T extends CustomPacketPayload>(var1: Type<T>, var2: StreamCodec<RegistryFriendlyByteBuf, T>, var3: S2CPayloadHandler<T>): void;
    send(var1: CustomPacketPayload, var2: Player): void;
  }


  class NetworkContext<T extends Player = any> {
    canReply(var1: ResourceLocation): boolean;
    disconnect(var1: Component): void;
    execute(var1: Runnable): void;
    networkPhase(): ConnectionProtocol;
    networkSide(): PacketFlow;
    player(): T;
    reply(var1: CustomPacketPayload): void;
  }


  class PayloadHandler<T extends CustomPacketPayload = any, P extends Player = any, C extends NetworkContext<P> = any> {
    handle(var1: T, var2: C): void;
  }


  interface S2CPayloadHandler<T extends CustomPacketPayload = any> extends PayloadHandler<T, LocalPlayer, ClientPlayNetworkContext> {}
  class S2CPayloadHandler<T extends CustomPacketPayload = any> extends PayloadHandler<T, LocalPlayer, ClientPlayNetworkContext> {
    handle(var1: T, var2: ClientPlayNetworkContext): void;
  }


  interface ServerPlayNetworkContext extends NetworkContext<ServerPlayer> {}
  class ServerPlayNetworkContext extends NetworkContext<ServerPlayer> {
    constructor(context: IPayloadContext);
    canReply(id: ResourceLocation): boolean;
    disconnect(reason: Component): void;
    execute(runnable: Runnable): void;
    networkPhase(): ConnectionProtocol;
    networkSide(): PacketFlow;
    player(): ServerPlayer;
    reply(payload: CustomPacketPayload): void;
    sendToAllPlayers(payload: CustomPacketPayload, skipCurrentPlayer: boolean): void;
    sendToAllPlayers(payload: CustomPacketPayload): void;
    static sendToAllPlayers$default(serverPlayNetworkContext: ServerPlayNetworkContext, customPacketPayload: CustomPacketPayload, bl: boolean, n: number, object: any): void;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.networking' {
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { Companion } from 'me.fzzyhmstrs.fzzy_config.networking.ConfigSyncS2CCustomPayload';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { Type } from 'CustomPacketPayload';
  import { Companion as me_fzzyhmstrs_fzzy_config_networking_configupdatec2scustompayload_Companion } from 'me.fzzyhmstrs.fzzy_config.networking.ConfigUpdateC2SCustomPayload';
  import { Map, List, UUID } from 'java.util';
  import { Companion as me_fzzyhmstrs_fzzy_config_networking_configupdates2ccustompayload_Companion } from 'me.fzzyhmstrs.fzzy_config.networking.ConfigUpdateS2CCustomPayload';
  import { Companion as me_fzzyhmstrs_fzzy_config_networking_dynamicidss2ccustompayload_Companion } from 'me.fzzyhmstrs.fzzy_config.networking.DynamicIdsS2CCustomPayload';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Companion as me_fzzyhmstrs_fzzy_config_networking_settingforwardcustompayload_Companion } from 'me.fzzyhmstrs.fzzy_config.networking.SettingForwardCustomPayload';

  interface ConfigSyncS2CCustomPayload extends CustomPacketPayload {}
  class ConfigSyncS2CCustomPayload extends CustomPacketPayload {
    static readonly Companion: Companion;
    constructor(id: string, serializedConfig: string);

    constructor(buf: FriendlyByteBuf);
    get id(): string;
    get serializedConfig(): string;
    type(): Type<CustomPacketPayload>;
    write(buf: FriendlyByteBuf): void;
  }


  interface ConfigUpdateC2SCustomPayload extends CustomPacketPayload {}
  class ConfigUpdateC2SCustomPayload extends CustomPacketPayload {
    static readonly Companion: me_fzzyhmstrs_fzzy_config_networking_configupdatec2scustompayload_Companion;
    constructor(updates: Map<string, string>, changeHistory: string[], playerPerm: number);

    constructor(buf: FriendlyByteBuf);
    get changeHistory(): string[];
    get playerPerm(): number;
    get updates(): Map<string, string>;
    type(): Type<CustomPacketPayload>;
    write(buf: FriendlyByteBuf): void;
  }


  interface ConfigUpdateS2CCustomPayload extends CustomPacketPayload {}
  class ConfigUpdateS2CCustomPayload extends CustomPacketPayload {
    static readonly Companion: me_fzzyhmstrs_fzzy_config_networking_configupdates2ccustompayload_Companion;
    constructor(updates: Map<string, string>);

    constructor(buf: FriendlyByteBuf);
    get updates(): Map<string, string>;
    type(): Type<CustomPacketPayload>;
    write(buf: FriendlyByteBuf): void;
  }


  interface DynamicIdsS2CCustomPayload extends CustomPacketPayload {}
  class DynamicIdsS2CCustomPayload extends CustomPacketPayload {
    static readonly Companion: me_fzzyhmstrs_fzzy_config_networking_dynamicidss2ccustompayload_Companion;
    constructor(key: ResourceLocation, ids: ResourceLocation[]);

    constructor(buf: FriendlyByteBuf);
    get ids(): ResourceLocation[];
    get key(): ResourceLocation;
    type(): Type<CustomPacketPayload>;
    write(buf: FriendlyByteBuf): void;
  }


  interface SettingForwardCustomPayload extends CustomPacketPayload {}
  class SettingForwardCustomPayload extends CustomPacketPayload {
    static readonly Companion: me_fzzyhmstrs_fzzy_config_networking_settingforwardcustompayload_Companion;
    constructor(update: string, player: UUID, scope: string, summary: string);

    constructor(buf: FriendlyByteBuf);
    get player(): UUID;
    get scope(): string;
    get summary(): string;
    get update(): string;
    type(): Type<CustomPacketPayload>;
    write(buf: FriendlyByteBuf): void;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.networking.ConfigSyncS2CCustomPayload' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Type } from 'CustomPacketPayload';
  import { ConfigSyncS2CCustomPayload } from 'me.fzzyhmstrs.fzzy_config.networking';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get codec(): StreamCodec<FriendlyByteBuf, ConfigSyncS2CCustomPayload>;
    get type(): Type<ConfigSyncS2CCustomPayload>;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.networking.ConfigUpdateC2SCustomPayload' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Type } from 'CustomPacketPayload';
  import { ConfigUpdateC2SCustomPayload } from 'me.fzzyhmstrs.fzzy_config.networking';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get codec(): StreamCodec<FriendlyByteBuf, ConfigUpdateC2SCustomPayload>;
    get type(): Type<ConfigUpdateC2SCustomPayload>;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.networking.ConfigUpdateS2CCustomPayload' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Type } from 'CustomPacketPayload';
  import { ConfigUpdateS2CCustomPayload } from 'me.fzzyhmstrs.fzzy_config.networking';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get codec(): StreamCodec<FriendlyByteBuf, ConfigUpdateS2CCustomPayload>;
    get type(): Type<ConfigUpdateS2CCustomPayload>;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.networking.DynamicIdsS2CCustomPayload' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Type } from 'CustomPacketPayload';
  import { DynamicIdsS2CCustomPayload } from 'me.fzzyhmstrs.fzzy_config.networking';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get codec(): StreamCodec<FriendlyByteBuf, DynamicIdsS2CCustomPayload>;
    get type(): Type<DynamicIdsS2CCustomPayload>;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.networking.SettingForwardCustomPayload' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Type } from 'CustomPacketPayload';
  import { SettingForwardCustomPayload } from 'me.fzzyhmstrs.fzzy_config.networking';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get codec(): StreamCodec<FriendlyByteBuf, SettingForwardCustomPayload>;
    get type(): Type<SettingForwardCustomPayload>;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.registry' {
  import { Map, List, UUID, Set } from 'java.util';
  import { SyncedConfigEntry } from 'me.fzzyhmstrs.fzzy_config.registry.SyncedConfigRegistry';
  import { Predicate, Consumer, BiPredicate, BiConsumer, Function } from 'java.util.function';
  import { Type } from 'CustomPacketPayload';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { MinecraftServer } from 'net.minecraft.server';
  import { Component } from 'net.minecraft.network.chat';
  import { Config } from 'me.fzzyhmstrs.fzzy_config.config';
  import { RegisterType } from 'me.fzzyhmstrs.fzzy_config.api';

  class SyncedConfigRegistry {
    static readonly INSTANCE: SyncedConfigRegistry;
    acceptQuarantine$fzzy_config(id: string, server: MinecraftServer): void;
    getConfig$fzzy_config(scope: string): Config;
    hasConfig$fzzy_config(scope: string): boolean;
    inspectQuarantine$fzzy_config(id: string, nameFinder: Function<UUID, Component>, messageSender: Consumer<Component>): void;
    listQuarantines$fzzy_config(messageSender: Consumer<Component>): void;
    onConfigure$fzzy_config(canSender: Predicate<Type<any>>, sender: Consumer<CustomPacketPayload>): void;
    onEndDataReload$fzzy_config(players: ServerPlayer[], canSender: BiPredicate<ServerPlayer, Type<any>>, sender: BiConsumer<ServerPlayer, CustomPacketPayload>): void;
    onJoin$fzzy_config(player: ServerPlayer, server: MinecraftServer, canSender: BiPredicate<ServerPlayer, Type<any>>, sender: BiConsumer<ServerPlayer, CustomPacketPayload>): void;
    quarantineList$fzzy_config(): Set<string>;
    receiveConfigUpdate$fzzy_config(serializedConfigs: Map<string, string>, server: MinecraftServer, serverPlayer: ServerPlayer, clientPerm: number, changes: string[], canSender: BiPredicate<ServerPlayer, Type<any>>, sender: BiConsumer<ServerPlayer, CustomPacketPayload>): void;
    receiveSettingForward$fzzy_config(uuid: UUID, player: ServerPlayer, scope: string, update: string, summary: string, canSender: BiPredicate<ServerPlayer, Type<any>>, sender: BiConsumer<ServerPlayer, CustomPacketPayload>): void;
    registerConfig$fzzy_config(config: Config, registerType: RegisterType): void;
    rejectQuarantine$fzzy_config(id: string, server: MinecraftServer): void;
    syncedConfigs$fzzy_config(): Map<string, SyncedConfigEntry>;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.registry.SyncedConfigRegistry' {
  import { UUID, List } from 'java.util';
  import { Config } from 'me.fzzyhmstrs.fzzy_config.config';
  import { ResourceLocation } from 'net.minecraft.resources';

  class QuarantinedUpdate {
    constructor(playerUuid: UUID, changeHistory: string[], configId: string, configString: string);
    get changeHistory(): string[];
    get configId(): string;
    get configString(): string;
    get playerUuid(): UUID;
  }


  class SyncedConfigEntry {
    constructor(config: Config, server: boolean);
    component1(): Config;
    component2(): boolean;
    copy(config: Config, server: boolean): SyncedConfigEntry;
    static copy$default(syncedConfigEntry: SyncedConfigEntry, config: Config, bl: boolean, n: number, object: any): SyncedConfigEntry;
    equals(other: any): boolean;
    get config(): Config;
    get id(): ResourceLocation;
    get server(): boolean;
    hashCode(): number;
    skipSync(): boolean;
    toString(): string;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.result.api' {
  import { ResultProvider, ResultProviderSupplier, ResultProviderSupplierJava } from 'me.fzzyhmstrs.fzzy_config.result';
  import { Supplier } from 'java.util.function';
  import { KClass } from 'kotlin.reflect';
  import { Class } from 'java.lang';

  class ResultApi {
    createResultProvider<T>(var1: Supplier<T>, var2: KClass<T>): ResultProvider<T>;
    createResultProvider<T>(var1: Supplier<T>, var2: ResultProviderSupplier<T>): ResultProvider<T>;
    createSimpleResultProvider<T>(var1: T, var2: KClass<T>): ResultProvider<T>;
    createSimpleResultProvider<T>(var1: T, var2: ResultProviderSupplier<T>): ResultProvider<T>;
  }


  class ResultApiJava {
    createResultProvider<T>(var1: Supplier<T>, var2: Class<T>): ResultProvider<T>;
    createResultProvider<T>(var1: Supplier<T>, var2: ResultProviderSupplierJava<T>): ResultProvider<T>;
    createSimpleResultProvider<T>(var1: T, var2: Class<T>): ResultProvider<T>;
    createSimpleResultProvider<T>(var1: T, var2: ResultProviderSupplierJava<T>): ResultProvider<T>;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.result.impl' {
  import { ResultProvider } from 'me.fzzyhmstrs.fzzy_config.result';
  import { Function, Supplier } from 'java.util.function';

  interface CachedConfigValueProvider<T = any> extends ResultProvider<T> {}
  class CachedConfigValueProvider<T = any> extends ResultProvider<T> {
    constructor(delegate: Function<string, Supplier<T>>);
    getResult(scope: string): T;
    invalidateResults$fzzy_config(): void;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.result' {
  import { Companion, Processor } from 'me.fzzyhmstrs.fzzy_config.result.ResultArg';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Consumer, Supplier } from 'java.util.function';
  import { Map } from 'java.util';
  import { Config } from 'me.fzzyhmstrs.fzzy_config.config';
  import { KMutableProperty } from 'kotlin.reflect';
  import { Field } from 'java.lang.reflect';

  class ResultArg<V = any, R = any> {
    static readonly Companion: Companion;
    constructor(arg: string, fallback: R, noValueArg: boolean);

    constructor(string: string, object: any, bl: boolean, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(arg: string, fallback: R);
    applyArg(var1: V, var2: string): R;
    get arg$fzzy_config(): string;
    get fallback$fzzy_config(): R;
    static getArgs(scope: string): Map<string, string>;
    static stripArgs(scope: string): string;
    to(consumer2: Consumer<R>): Processor;
  }


  class ResultProvider<T = any> {
    getArgResult<R>(scope: string, arg: ResultArg<T, R>): R;
    getResult(var1: string): T;
    processArgResults(scope: string, ...arg: Processor[]): void;
  }


  class ResultProviderSupplier<T = any> {
    supplier(var1: string, var2: Config, var3: any, var4: KMutableProperty<any>): Supplier<T>;
  }


  class ResultProviderSupplierJava<T = any> {
    supplierJava(var1: string, var2: Config, var3: any, var4: Field): Supplier<T>;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.result.ResultArg' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Map } from 'java.util';
  import { ResultArg } from 'me.fzzyhmstrs.fzzy_config.result';
  import { Consumer } from 'java.util.function';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    getArgs(scope: string): Map<string, string>;
    stripArgs(scope: string): string;
  }


  interface Processor extends ResultArg<V, R> {}
  class Processor extends ResultArg<V, R> {
    constructor(consumer2: Consumer<R>);
    applyArg(scopeValue: V, argValue: string): R;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.screen' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiEventListener, ContainerEventHandler } from 'net.minecraft.client.gui.components.events';
  import { Companion } from 'me.fzzyhmstrs.fzzy_config.screen.PopupController';
  import { LinkedList, Optional } from 'java.util';
  import { PopupWidget } from 'me.fzzyhmstrs.fzzy_config.screen.widget';
  import { Double } from 'java.lang';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class ConfigScreenProvider {
    openScreen(namespace: string, scope: string): boolean;
    provideScreen(var1: string, var2: string): Screen;
  }


  class LastSelectable {
    get lastSelected(): GuiEventListener;
    popLast(): void;
    pushLast(): void;
    resetHover(mouseX: number, mouseY: number): void;
    set lastSelected(var1: GuiEventListener);
  }


  interface PopupController extends LastSelectable {}
  class PopupController extends LastSelectable {
    static readonly Companion: Companion;
    activeWidget(): PopupWidget;
    blurElements(): void;
    get child(): LastSelectable;
    get justClosedWidget(): boolean;
    get popupWidgets(): LinkedList<PopupWidget>;
    initPopup(var1: PopupWidget): void;
    postRender(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    preRender(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    set justClosedWidget(var1: boolean);
    setPopup(widget: PopupWidget, mouseX: number, mouseY: number): void;
    static setPopup$default(popupController: PopupController, popupWidget: PopupWidget, d: number, d2: number, n: number, object: any): void;
    setPopupImmediate(widget: PopupWidget, mouseX: number, mouseY: number): void;
    static setPopupImmediate$default(popupController: PopupController, popupWidget: PopupWidget, d: number, d2: number, n: number, object: any): void;
    setPopupInternal(widget: PopupWidget, mouseX: number, mouseY: number, setJustClosed: boolean): void;
    static setPopupInternal$default(popupController: PopupController, popupWidget: PopupWidget, d: number, d2: number, bl: boolean, n: number, object: any): void;
  }


  interface PopupParentElement extends ContainerEventHandler, PopupController {}
  class PopupParentElement extends ContainerEventHandler {
    charTyped(chr: string, modifiers: number): boolean;
    get child(): LastSelectable;
    getChildAt(mouseX: number, mouseY: number): Optional<GuiEventListener>;
    keyReleased(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, deltaX: number, deltaY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, horizontalAmount: number, verticalAmount: number): boolean;
    popLast(): void;
    pushLast(): void;
  }


  class SuggestionWindowListener {
    setSuggestionWindowElement(var1: GuiEventListener): void;
  }


  class SuggestionWindowProvider {
    addListener(var1: SuggestionWindowListener): void;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.screen.context' {
  import { Result } from 'Translatable';
  import { Supplier, Function } from 'java.util.function';
  import { Decorated } from 'me.fzzyhmstrs.fzzy_config.screen.decoration';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Boolean, Runnable, Enum } from 'java.lang';
  import { CustomButtonWidget } from 'me.fzzyhmstrs.fzzy_config.screen.widget.custom';
  import { Companion } from 'me.fzzyhmstrs.fzzy_config.screen.context.ContextActionWidget';
  import { Ref, TriState } from 'me.fzzyhmstrs.fzzy_config.util';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { StringRepresentable } from 'net.minecraft.util';
  import { Companion as me_fzzyhmstrs_fzzy_config_screen_context_contextinput_Companion } from 'me.fzzyhmstrs.fzzy_config.screen.context.ContextInput';
  import { EnumEntries } from 'kotlin.enums';
  import { Companion as me_fzzyhmstrs_fzzy_config_screen_context_contextprovider_Companion } from 'me.fzzyhmstrs.fzzy_config.screen.context.ContextProvider';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { List } from 'java.util';
  import { Companion as me_fzzyhmstrs_fzzy_config_screen_context_position_Companion } from 'me.fzzyhmstrs.fzzy_config.screen.context.Position';

  class ContextAction {
    constructor(texts: Result, active: Supplier, forMenu: boolean, icon: Decorated, action: Function, $constructor_marker: DefaultConstructorMarker);
    get action(): Function<Position, boolean>;
    get active(): Supplier<boolean>;
    get forMenu(): boolean;
    get icon(): Decorated;
    get texts(): Result;
  }


  interface ContextActionWidget extends CustomButtonWidget {}
  class ContextActionWidget extends CustomButtonWidget {
    static readonly Companion: Companion;
    constructor(action: ContextAction, ref: Ref<Runnable>, position: Position, width: number);
    renderCustom(context: GuiGraphics, x: number, y: number, width: number, height: number, mouseX: number, mouseY: number, delta: number): void;
  }


  class ContextHandler {
    handleContext(var1: ContextType, var2: Position): boolean;
  }


  interface ContextInput extends StringRepresentable, Enum<ContextInput> {}
  class ContextInput extends StringRepresentable {
    static readonly Companion: me_fzzyhmstrs_fzzy_config_screen_context_contextinput_Companion;
    static readonly KEYBOARD: ContextInput;
    static readonly MOUSE: ContextInput;
    static get entries(): EnumEntries<ContextInput>;
    get serializedName(): string;
    static valueOf(value: string): ContextInput;
    static values(): ContextInput[];
  }


  class ContextProvider {
    static readonly Companion: me_fzzyhmstrs_fzzy_config_screen_context_contextprovider_Companion;
    provideContext(var1: ContextResultBuilder): void;
  }


  class FzzyKeybind {
    clone(): FzzyKeybind;
    compoundWith(other: FzzyKeybind): FzzyKeybind;
    containedKeybinds(): FzzyKeybind[];
    keybind(): MutableComponent;
    relevant(var1: number, var2: boolean, var3: boolean, var4: boolean): boolean;
  }


  interface FzzyKeybindSimple extends FzzyKeybind {}
  class FzzyKeybindSimple extends FzzyKeybind {
    constructor(inputCode: number, type: ContextInput, ctrl: TriState, shift: TriState, alt: TriState);

    constructor(inputCode: number, type: ContextInput, ctrl: boolean, shift: boolean, alt: boolean);
    clone(): FzzyKeybind;
    component1(): number;
    component2(): ContextInput;
    component3(): TriState;
    component4(): TriState;
    component5(): TriState;
    copy(inputCode: number, type: ContextInput, ctrl: TriState, shift: TriState, alt: TriState): FzzyKeybindSimple;
    static copy$default(fzzyKeybindSimple: FzzyKeybindSimple, n: number, contextInput: ContextInput, triState: TriState, triState2: TriState, triState3: TriState, n2: number, object: any): FzzyKeybindSimple;
    equals(other: any): boolean;
    get alt(): TriState;
    get ctrl(): TriState;
    get inputCode(): number;
    get shift(): TriState;
    get type(): ContextInput;
    hashCode(): number;
    isPressed(): boolean;
    keybind(): MutableComponent;
    relevant(inputCode: number, ctrl: boolean, shift: boolean, alt: boolean): boolean;
    toString(): string;
  }


  interface FzzyKeybindUnbound extends FzzyKeybind {}
  class FzzyKeybindUnbound extends FzzyKeybind {
    static readonly INSTANCE: FzzyKeybindUnbound;
    clone(): FzzyKeybind;
    compoundWith(other: FzzyKeybind): FzzyKeybind;
    containedKeybinds(): FzzyKeybind[];
    equals(other: any): boolean;
    hashCode(): number;
    keybind(): MutableComponent;
    relevant(inputCode: number, ctrl: boolean, shift: boolean, alt: boolean): boolean;
    toString(): string;
  }


  class Position {
    static readonly Companion: me_fzzyhmstrs_fzzy_config_screen_context_position_Companion;
    constructor(contextInput: ContextInput, mX: number, mY: number, x: number, y: number, width: number, height: number, screenWidth: number, screenHeight: number);
    component1(): ContextInput;
    component2(): number;
    component3(): number;
    component4(): number;
    component5(): number;
    component6(): number;
    component7(): number;
    component8(): number;
    component9(): number;
    copy(contextInput: ContextInput, mX: number, mY: number, x: number, y: number, width: number, height: number, screenWidth: number, screenHeight: number): Position;
    static copy$default(position: Position, contextInput: ContextInput, n: number, n2: number, n3: number, n4: number, n5: number, n6: number, n7: number, n8: number, n9: number, object: any): Position;
    equals(other: any): boolean;
    get contextInput(): ContextInput;
    get height(): number;
    get mX(): number;
    get mY(): number;
    get screenHeight(): number;
    get screenWidth(): number;
    get width(): number;
    get x(): number;
    get y(): number;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.screen.context.ContextAction' {
  import { Component } from 'net.minecraft.network.chat';
  import { Function, Supplier, UnaryOperator } from 'java.util.function';
  import { Position, ContextAction } from 'me.fzzyhmstrs.fzzy_config.screen.context';
  import { Boolean } from 'java.lang';
  import { Decorated } from 'me.fzzyhmstrs.fzzy_config.screen.decoration';

  class Builder {
    constructor(name: Component, action: Function<Position, boolean>);
    active(active: Supplier<boolean>): Builder;
    build(): ContextAction;
    icon(icon: Decorated): Builder;
    isForMenu(): boolean;
    narration(narration: Component): Builder;
    notForMenu(): Builder;
    withActive(operator: UnaryOperator<Supplier<boolean>>): Builder;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.screen.context.ContextActionWidget' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ContextAction } from 'me.fzzyhmstrs.fzzy_config.screen.context';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    getNeededWidth(action: ContextAction): number;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.screen.context.ContextInput' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Codec } from 'com.mojang.serialization';
  import { ContextInput } from 'me.fzzyhmstrs.fzzy_config.screen.context';
  import { TomlElement } from 'net.peanuuutz.tomlkt';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    fallback(): TomlElement;
    get cODEC(): Codec<ContextInput>;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.screen.context.ContextProvider' {
  import { ContextResultBuilder, Position } from 'me.fzzyhmstrs.fzzy_config.screen.context';

  class Companion {
    empty(position: Position): ContextResultBuilder;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.screen.context.FzzyKeybind' {
  import { FzzyKeybind } from 'me.fzzyhmstrs.fzzy_config.screen.context';

  class Builder {
    build(): FzzyKeybind;
    keyboard(keyCode: number, ctrl: boolean, shift: boolean, alt: boolean): Builder;
    keyboard(keyCode: number, ctrl: boolean, shift: boolean): Builder;
    keyboard(keyCode: number, ctrl: boolean): Builder;
    keyboard(keyCode: number): Builder;
    static keyboard$default(builder: Builder, n: number, bl: boolean, bl2: boolean, bl3: boolean, n2: number, object: any): Builder;
    mouse(button: number, ctrl: boolean, shift: boolean, alt: boolean): Builder;
    mouse(button: number, ctrl: boolean, shift: boolean): Builder;
    mouse(button: number, ctrl: boolean): Builder;
    mouse(button: number): Builder;
    static mouse$default(builder: Builder, n: number, bl: boolean, bl2: boolean, bl3: boolean, n2: number, object: any): Builder;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.screen.context.Position' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Position, ContextInput } from 'me.fzzyhmstrs.fzzy_config.screen.context';
  import { LayoutElement } from 'net.minecraft.client.gui.layouts';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    fromWidget(widget: LayoutElement, contextInput: ContextInput): Position;
    static fromWidget$default(companion: Companion, layoutElement: LayoutElement, contextInput: ContextInput, n: number, object: any): Position;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.screen.decoration' {
  import { LayoutElement } from 'net.minecraft.client.gui.layouts';
  import { Renderable, AbstractWidget } from 'net.minecraft.client.gui.components';
  import { Consumer } from 'java.util.function';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { TextureProvider } from 'me.fzzyhmstrs.fzzy_config.screen.widget';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface AbstractDecorationWidget extends LayoutElement, Renderable {}
  class AbstractDecorationWidget extends LayoutElement {
    get height(): number;
    get width(): number;
    get x(): number;
    get y(): number;
    set x(x: number);
    set y(y: number);
    visitWidgets(consumer2: Consumer<AbstractWidget>): void;
  }


  class Decorated {
    renderDecoration(var1: GuiGraphics, var2: number, var3: number, var4: number, var5: boolean, var6: boolean): void;
  }


  interface DecorationWidget extends AbstractDecorationWidget {}
  class DecorationWidget extends AbstractDecorationWidget {
    constructor(decoration: Decorated, offsetX: number, offsetY: number);

    constructor(decorated: Decorated, n: number, n2: number, n3: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(decoration: Decorated, offsetX: number);

    constructor(decoration: Decorated);

    constructor();
    get height(): number;
    get width(): number;
    render(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    setDeco(newDecoration: Decorated, newOffsetX: number, newOffsetY: number): void;
    setDeco(newDecoration: Decorated, newOffsetX: number): void;
    setDeco(newDecoration: Decorated): void;
    static setDeco$default(decorationWidget: DecorationWidget, decorated: Decorated, n: number, n2: number, n3: number, object: any): void;
  }


  interface SmallSpriteDecoration extends SpriteDecoration {}
  class SmallSpriteDecoration extends SpriteDecoration {
    constructor(tex: TextureProvider);

    constructor(id: ResourceLocation);
  }


  interface SpriteDecorated extends Decorated {}
  class SpriteDecorated extends Decorated {
    get h(): number;
    get w(): number;
    renderDecoration(context: GuiGraphics, x: number, y: number, delta: number, enabled: boolean, selected: boolean): void;
    textures(): TextureProvider;
  }


  interface SpriteDecoration extends SpriteDecorated {}
  class SpriteDecoration extends SpriteDecorated {
    constructor(tex: TextureProvider, w: number, h: number);

    constructor(textureProvider: TextureProvider, n: number, n2: number, n3: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(id: ResourceLocation, w: number, h: number);

    constructor(resourceLocation: ResourceLocation, n: number, n2: number, n3: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(tex: TextureProvider, w: number);

    constructor(tex: TextureProvider);

    constructor(id: ResourceLocation, w: number);

    constructor(id: ResourceLocation);
    get h(): number;
    get w(): number;
    textures(): TextureProvider;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.screen.decoration.Decorated' {
  import { Decorated } from 'me.fzzyhmstrs.fzzy_config.screen.decoration';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class DecoratedOffset {
    constructor(decorated: Decorated, offsetX: number, offsetY: number);

    constructor(decorated: Decorated, n: number, n2: number, n3: number, defaultConstructorMarker: DefaultConstructorMarker);
    get decorated(): Decorated;
    get offsetX(): number;
    get offsetY(): number;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.screen.entry' {
  import { Entry } from 'DynamicListWidget';
  import { DynamicListWidget } from 'me.fzzyhmstrs.fzzy_config.screen.widget';
  import { List } from 'java.util';
  import { SelectableElement } from 'DynamicListWidget.Entry';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { ValidatedKeybind } from 'me.fzzyhmstrs.fzzy_config.validation.misc';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { Companion } from 'me.fzzyhmstrs.fzzy_config.screen.entry.SidebarEntry';
  import { Result } from 'Translatable';
  import { DecoratedOffset } from 'me.fzzyhmstrs.fzzy_config.screen.decoration.Decorated';
  import { Runnable } from 'java.lang';

  interface ChangelogEntry extends Entry {}
  class ChangelogEntry extends Entry {
    constructor(parentElement: DynamicListWidget, changes: string, index: number);
    appendTitleNarrations(builder: NarrationElementOutput): void;
    children(): GuiEventListener[];
    init(): void;
    onResize(): void;
    renderBorder(context: GuiGraphics, x: number, y: number, width: number, height: number, mouseX: number, mouseY: number, hovered: boolean, focused: boolean, delta: number): void;
    renderEntry(context: GuiGraphics, x: number, y: number, width: number, height: number, mouseX: number, mouseY: number, hovered: boolean, focused: boolean, delta: number): void;
    renderHighlight(context: GuiGraphics, x: number, y: number, width: number, height: number, mouseX: number, mouseY: number, hovered: boolean, focused: boolean, delta: number): void;
    selectableChildren(): SelectableElement[];
  }


  interface InfoKeybindEntry extends Entry {}
  class InfoKeybindEntry extends Entry {
    constructor(parentElement: DynamicListWidget, index: number, scope: string, keybind: ValidatedKeybind);
    appendNarrations(builder: NarrationElementOutput): void;
    children(): GuiEventListener[];
    renderEntry(context: GuiGraphics, x: number, y: number, width: number, height: number, mouseX: number, mouseY: number, hovered: boolean, focused: boolean, delta: number): void;
    renderExtras(context: GuiGraphics, x: number, y: number, width: number, height: number, mouseX: number, mouseY: number, hovered: boolean, focused: boolean, delta: number): void;
    renderHighlight(context: GuiGraphics, x: number, y: number, width: number, height: number, mouseX: number, mouseY: number, hovered: boolean, focused: boolean, delta: number): void;
    selectableChildren(): SelectableElement[];
  }


  interface SearchMenuEntry extends Entry {}
  class SearchMenuEntry extends Entry {
    constructor(parentElement: DynamicListWidget, scope: string, widget: AbstractWidget);
    appendNarrations(builder: NarrationElementOutput): void;
    children(): GuiEventListener[];
    renderEntry(context: GuiGraphics, x: number, y: number, width: number, height: number, mouseX: number, mouseY: number, hovered: boolean, focused: boolean, delta: number): void;
    renderExtras(context: GuiGraphics, x: number, y: number, width: number, height: number, mouseX: number, mouseY: number, hovered: boolean, focused: boolean, delta: number): void;
    selectableChildren(): SelectableElement[];
  }


  interface SidebarEntry extends Entry {}
  class SidebarEntry extends Entry {
    static readonly Companion: Companion;
    constructor(parentElement: DynamicListWidget, scope: string, texts: Result, icon: DecoratedOffset, onPress: Runnable, layer: number);
    appendTitleNarrations(builder: NarrationElementOutput): void;
    children(): GuiEventListener[];
    renderBorder(context: GuiGraphics, x: number, y: number, width: number, height: number, mouseX: number, mouseY: number, hovered: boolean, focused: boolean, delta: number): void;
    renderEntry(context: GuiGraphics, x: number, y: number, width: number, height: number, mouseX: number, mouseY: number, hovered: boolean, focused: boolean, delta: number): void;
    selectableChildren(): SelectableElement[];
  }


  interface WidgetEntry<T extends NarratableEntry & GuiEventListener & LayoutElement = any> extends Entry {}
  class WidgetEntry<T extends NarratableEntry & GuiEventListener & LayoutElement = any> extends Entry {
    constructor(parentElement: DynamicListWidget, scope: string, texts: Result, height: number, widget: T);
    children(): GuiEventListener[];
    renderEntry(context: GuiGraphics, x: number, y: number, width: number, height: number, mouseX: number, mouseY: number, hovered: boolean, focused: boolean, delta: number): void;
    selectableChildren(): SelectableElement[];
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.screen.entry.SidebarEntry' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Result } from 'Translatable';
  import { CustomPressableWidget } from 'me.fzzyhmstrs.fzzy_config.screen.widget.custom';
  import { DecoratedOffset } from 'me.fzzyhmstrs.fzzy_config.screen.decoration.Decorated';
  import { Runnable } from 'java.lang';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    neededWidth(texts: Result, layer: number): number;
  }


  interface SidebarWidget extends CustomPressableWidget {}
  class SidebarWidget extends CustomPressableWidget {
    constructor(texts: Result, icon: DecoratedOffset, onPress: Runnable, layer: number);
    onPress(): void;
    renderBackground(context: GuiGraphics, x: number, y: number, width: number, height: number, mouseX: number, mouseY: number, delta: number): void;
    renderCustom(context: GuiGraphics, x: number, y: number, width: number, height: number, mouseX: number, mouseY: number, delta: number): void;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.screen.internal' {
  import { BaseUpdateManager, Updatable } from 'me.fzzyhmstrs.fzzy_config.updates';
  import { List } from 'java.util';
  import { BiFunction, Consumer } from 'java.util.function';
  import { DynamicListWidget } from 'me.fzzyhmstrs.fzzy_config.screen.widget';
  import { Integer } from 'java.lang';
  import { Entry } from 'DynamicListWidget';
  import { ConfigSet } from 'me.fzzyhmstrs.fzzy_config.impl';
  import { ForwardedUpdate } from 'ConfigScreenManager';
  import { PopupWidgetScreen } from 'me.fzzyhmstrs.fzzy_config.screen';
  import { Companion } from 'me.fzzyhmstrs.fzzy_config.screen.internal.SuggestionWindow';
  import { Suggestion } from 'com.mojang.brigadier.suggestion';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface ConfigBaseUpdateManager extends BaseUpdateManager {}
  class ConfigBaseUpdateManager extends BaseUpdateManager {
    forwardHandlerEntries(): BiFunction<DynamicListWidget, number, Entry>[];
    forwardsHandler(): void;
    getUpdatableEntry(key: string): Updatable;
    invalidatePush(): void;
    managerId(): string;
    pushUpdatableStates(scope: string): void;
    static pushUpdatableStates$default(configBaseUpdateManager: ConfigBaseUpdateManager, string: string, n: number, object: any): void;
    setUpdatableEntry(entry: Updatable): void;
  }


  interface ConfigSingleUpdateManager extends ConfigBaseUpdateManager {}
  class ConfigSingleUpdateManager extends ConfigBaseUpdateManager {
    constructor(configSet: ConfigSet, forwardedUpdates: ForwardedUpdate[], perms: number);
    apply(bl: boolean): void;
    forwardsCount(): number;
    getUpdatableEntry(key: string): Updatable;
    hasRestores(scope: string): boolean;
    managerId(): string;
    restore(scope: string): void;
    restoreCount(scope: string): number;
    setUpdatableEntry(entry: Updatable): void;
  }


  interface RestartScreen extends PopupWidgetScreen {}
  class RestartScreen extends PopupWidgetScreen {
    constructor();
    shouldCloseOnEsc(): boolean;
  }


  class SuggestionWindow {
    static readonly Companion: Companion;
    constructor(suggestions: Suggestion[], x: number, y: number, w: number, h: number, up: boolean, applier: Consumer<string>, closer: Consumer<SuggestionWindow>);
    isMouseOver(mouseX: number, mouseY: number): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, amount: number): boolean;
    render(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.screen.internal.SuggestionWindow' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { SuggestionWindow } from 'me.fzzyhmstrs.fzzy_config.screen.internal';
  import { Suggestions } from 'com.mojang.brigadier.suggestion';
  import { Consumer } from 'java.util.function';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    createSuggestionWindow(windowX: number, windowY: number, suggestions: Suggestions, text: string, cursor: number, applier: Consumer<string>, closer: Consumer<SuggestionWindow>): SuggestionWindow;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.screen.PopupController' {
  import { PopupWidget } from 'me.fzzyhmstrs.fzzy_config.screen.widget';
  import { PopupController } from 'me.fzzyhmstrs.fzzy_config.screen';
  import { Double, Runnable } from 'java.lang';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Companion {
    pop$fzzy_config(): void;
    popAll$fzzy_config(): void;
  }


  class DefaultImpls {
    static activeWidget($this: PopupController): PopupWidget;
    static postRender($this: PopupController, context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    static preRender($this: PopupController, context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    static resetHover($this: PopupController, mouseX: number, mouseY: number): void;
    static setPopup($this: PopupController, widget: PopupWidget, mouseX: number, mouseY: number): void;
    static setPopup$default(popupController: PopupController, popupWidget: PopupWidget, d: number, d2: number, n: number, object: any): void;
    static setPopupImmediate($this: PopupController, widget: PopupWidget, mouseX: number, mouseY: number): void;
    static setPopupImmediate$default(popupController: PopupController, popupWidget: PopupWidget, d: number, d2: number, n: number, object: any): void;
    static setPopupInternal($this: PopupController, widget: PopupWidget, mouseX: number, mouseY: number, setJustClosed: boolean): void;
    static setPopupInternal$default(popupController: PopupController, popupWidget: PopupWidget, d: number, d2: number, bl: boolean, n: number, object: any): void;
  }


  class PopupEntry {
    constructor(parent: PopupController, widget: PopupWidget, mouseX: number, mouseY: number, popAction: Runnable);

    constructor(popupController: PopupController, popupWidget: PopupWidget, d: number, d2: number, runnable: Runnable, n: number, defaultConstructorMarker: DefaultConstructorMarker);
    component1(): PopupController;
    component2(): PopupWidget;
    component3(): number;
    component4(): number;
    component5(): Runnable;
    copy(parent: PopupController, widget: PopupWidget, mouseX: number, mouseY: number, popAction: Runnable): PopupEntry;
    static copy$default(popupEntry: PopupEntry, popupController: PopupController, popupWidget: PopupWidget, d: number, d2: number, runnable: Runnable, n: number, object: any): PopupEntry;
    equals(other: any): boolean;
    get mouseX(): number;
    get mouseY(): number;
    get parent(): PopupController;
    get popAction(): Runnable;
    get widget(): PopupWidget;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.screen.PopupParentElement' {
  import { LastSelectable, PopupParentElement } from 'me.fzzyhmstrs.fzzy_config.screen';
  import { Optional } from 'java.util';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { PopupWidget } from 'me.fzzyhmstrs.fzzy_config.screen.widget';
  import { Double } from 'java.lang';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class DefaultImpls {
    static activeWidget($this: PopupParentElement): PopupWidget;
    static charTyped($this: PopupParentElement, chr: string, modifiers: number): boolean;
    static getChild($this: PopupParentElement): LastSelectable;
    static hoveredElement($this: PopupParentElement, mouseX: number, mouseY: number): Optional<GuiEventListener>;
    static keyReleased($this: PopupParentElement, keyCode: number, scanCode: number, modifiers: number): boolean;
    static mouseClicked($this: PopupParentElement, mouseX: number, mouseY: number, button: number): boolean;
    static mouseDragged($this: PopupParentElement, mouseX: number, mouseY: number, button: number, deltaX: number, deltaY: number): boolean;
    static mouseReleased($this: PopupParentElement, mouseX: number, mouseY: number, button: number): boolean;
    static mouseScrolled($this: PopupParentElement, mouseX: number, mouseY: number, horizontalAmount: number, verticalAmount: number): boolean;
    static popLast($this: PopupParentElement): void;
    static postRender($this: PopupParentElement, context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    static preRender($this: PopupParentElement, context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    static pushLast($this: PopupParentElement): void;
    static resetHover($this: PopupParentElement, mouseX: number, mouseY: number): void;
    static setPopup($this: PopupParentElement, widget: PopupWidget, mouseX: number, mouseY: number): void;
    static setPopupImmediate($this: PopupParentElement, widget: PopupWidget, mouseX: number, mouseY: number): void;
    static setPopupInternal($this: PopupParentElement, widget: PopupWidget, mouseX: number, mouseY: number, setJustClosed: boolean): void;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.screen.widget' {
  import { AbstractStringWidget, AbstractWidget, Tooltip } from 'net.minecraft.client.gui.components';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { Font, ComponentPath, GuiGraphics } from 'net.minecraft.client.gui';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { NarrationPriority } from 'NarratableEntry';
  import { FocusNavigationEvent } from 'net.minecraft.client.gui.navigation';
  import { List } from 'java.util';
  import { Supplier, Consumer } from 'java.util.function';
  import { OnInteractAction } from 'me.fzzyhmstrs.fzzy_config.screen.widget.OnClickTextFieldWidget';
  import { SuggestionWindowProvider, SuggestionWindowListener } from 'me.fzzyhmstrs.fzzy_config.screen';
  import { ChoiceValidator } from 'me.fzzyhmstrs.fzzy_config.validation.misc';
  import { EntryValidator } from 'me.fzzyhmstrs.fzzy_config.entry';
  import { SuggestionProvider } from 'me.fzzyhmstrs.fzzy_config.screen.widget.SuggestionBackedTextFieldWidget';
  import { SpriteDecoration, SmallSpriteDecoration } from 'me.fzzyhmstrs.fzzy_config.screen.decoration';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Companion } from 'me.fzzyhmstrs.fzzy_config.screen.widget.TooltipChild';
  import { Companion as me_fzzyhmstrs_fzzy_config_screen_widget_verticalsliderwidget_Companion } from 'me.fzzyhmstrs.fzzy_config.screen.widget.VerticalSliderWidget';
  import { Double } from 'java.lang';
  import { SoundManager } from 'net.minecraft.client.sounds';

  interface ClickableTextWidget extends AbstractStringWidget {}
  class ClickableTextWidget extends AbstractStringWidget {
    constructor(parent: Screen, message: Component, textRenderer: Font);
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
  }


  interface LabelWrappedWidget extends TooltipChild, AbstractWidget {}
  class LabelWrappedWidget extends TooltipChild {
    constructor(child2: AbstractWidget, label: Component, showLabel: boolean);

    constructor(abstractWidget: AbstractWidget, component: Component, bl: boolean, n: number, defaultConstructorMarker: DefaultConstructorMarker);
    charTyped(chr: string, modifiers: number): boolean;
    get height(): number;
    get tooltip(): Tooltip;
    get width(): number;
    isFocused(): boolean;
    isHovered(): boolean;
    isHoveredOrFocused(): boolean;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    keyReleased(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, deltaX: number, deltaY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, horizontalAmount: number, verticalAmount: number): boolean;
    narrationPriority(): NarrationPriority;
    nextFocusPath(navigation: FocusNavigationEvent): ComponentPath;
    provideTooltipLines(mouseX: number, mouseY: number, parentSelected: boolean, keyboardFocused: boolean): Component[];
    set height(height: number);
    set width(width: number);
    setFocused(focused: boolean): void;
    setX(x: number): void;
    setY(y: number): void;
  }


  interface OnClickTextFieldWidget extends AbstractStringWidget {}
  class OnClickTextFieldWidget extends AbstractStringWidget {
    constructor(textSupplier: Supplier<string>, onClick: OnInteractAction);
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    onClick(mouseX: number, mouseY: number): void;
  }


  class RepositioningWidget {
    onReposition(): void;
  }


  class Scalable {
    setHeight(var1: number): void;
    setWidth(var1: number): void;
  }


  interface SuggestionBackedTextFieldWidget extends SuggestionWindowProvider, ValidationBackedTextFieldWidget {}
  class SuggestionBackedTextFieldWidget extends SuggestionWindowProvider {
    constructor(width: number, height: number, wrappedValue: Supplier<string>, choiceValidator: ChoiceValidator<string>, validator: EntryValidator<string>, applier: Consumer<string>, suggestionProvider: SuggestionProvider, closePopup: boolean);

    constructor(width: number, height: number, wrappedValue: Supplier<string>, choiceValidator: ChoiceValidator<string>, validator: EntryValidator<string>, applier: Consumer<string>, suggestionProvider: SuggestionProvider);
    addListener(listener: SuggestionWindowListener): void;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, horizontalAmount: number, verticalAmount: number): boolean;
    pushChanges(): void;
    renderWidget(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }


  interface SuppliedTextWidget extends TooltipChild, AbstractStringWidget {}
  class SuppliedTextWidget extends TooltipChild {
    constructor(messageSupplier: Supplier<Component>, textRenderer: Font, width: number, height: number);

    constructor(messageSupplier: Supplier<Component>, textRenderer: Font);
    align(horizontalAlignment: number): SuppliedTextWidget;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    provideTooltipLines(mouseX: number, mouseY: number, parentSelected: boolean, keyboardFocused: boolean): Component[];
    supplyTooltipOnOverflow(tooltipText: Supplier<Component>): SuppliedTextWidget;
  }


  class TextureDeco {
    static readonly INSTANCE: TextureDeco;
    get cONTEXT_COPY(): SmallSpriteDecoration;
    get cONTEXT_FIND(): SmallSpriteDecoration;
    get cONTEXT_FORWARD(): SmallSpriteDecoration;
    get cONTEXT_PASTE(): SmallSpriteDecoration;
    get cONTEXT_RESTORE(): SmallSpriteDecoration;
    get cONTEXT_REVERT(): SmallSpriteDecoration;
    get cONTEXT_SAVE(): SmallSpriteDecoration;
    get dECO_ALERT(): SpriteDecoration;
    get dECO_BOOK(): SpriteDecoration;
    get dECO_BUTTON_CLICK(): SpriteDecoration;
    get dECO_CHOICE_LIST(): SpriteDecoration;
    get dECO_COMMAND(): SpriteDecoration;
    get dECO_FOLDER(): SpriteDecoration;
    get dECO_FRAME(): SpriteDecoration;
    get dECO_INGREDIENT(): SpriteDecoration;
    get dECO_LINK(): SpriteDecoration;
    get dECO_LIST(): SpriteDecoration;
    get dECO_LOCKED(): SpriteDecoration;
    get dECO_MAP(): SpriteDecoration;
    get dECO_OBJECT(): SpriteDecoration;
    get dECO_OPEN_SCREEN(): SpriteDecoration;
    get dECO_QUESTION(): SpriteDecoration;
    get dECO_TAG(): SpriteDecoration;
  }


  class TextureIds {
    static readonly INSTANCE: TextureIds;
    get aDD(): ResourceLocation;
    get aDD_HIGHLIGHTED(): ResourceLocation;
    get aDD_INACTIVE(): ResourceLocation;
    get aDD_LANG(): MutableComponent;
    get cONFIG(): ResourceLocation;
    get cONFIG_HIGHLIGHTED(): ResourceLocation;
    get cONFIG_INACTIVE(): ResourceLocation;
    get cONFIG_INACTIVE_LANG(): MutableComponent;
    get cONFIG_LANG(): MutableComponent;
    get cONTEXT_COPY(): TextureProvider;
    get cONTEXT_FIND(): TextureProvider;
    get cONTEXT_FORWARD(): TextureProvider;
    get cONTEXT_PASTE(): TextureProvider;
    get cONTEXT_RESTORE(): TextureProvider;
    get cONTEXT_REVERT(): TextureProvider;
    get cONTEXT_SAVE(): TextureProvider;
    get dASHED(): ResourceLocation;
    get dECO_ALERT(): ResourceLocation;
    get dECO_BOOK(): ResourceLocation;
    get dECO_BUTTON_CLICK(): ResourceLocation;
    get dECO_CHOICE_LIST(): ResourceLocation;
    get dECO_COMMAND(): ResourceLocation;
    get dECO_FOLDER(): ResourceLocation;
    get dECO_FRAME(): ResourceLocation;
    get dECO_INGREDIENT(): ResourceLocation;
    get dECO_LINK(): ResourceLocation;
    get dECO_LIST(): ResourceLocation;
    get dECO_LOCKED(): ResourceLocation;
    get dECO_MAP(): ResourceLocation;
    get dECO_OBJECT(): ResourceLocation;
    get dECO_OPEN_SCREEN(): ResourceLocation;
    get dECO_QUESTION(): ResourceLocation;
    get dECO_TAG(): ResourceLocation;
    get dELETE(): ResourceLocation;
    get dELETE_HIGHLIGHTED(): ResourceLocation;
    get dELETE_INACTIVE(): ResourceLocation;
    get dELETE_LANG(): MutableComponent;
    get eNTRY_ERROR(): ResourceLocation;
    get eNTRY_NO(): ResourceLocation;
    get eNTRY_NO_DISABLED(): ResourceLocation;
    get eNTRY_OK(): ResourceLocation;
    get eNTRY_OK_DISABLED(): ResourceLocation;
    get eNTRY_ONGOING(): ResourceLocation;
    get gOTO(): ResourceLocation;
    get gOTO_HIGHLIGHTED(): ResourceLocation;
    get gOTO_INACTIVE(): ResourceLocation;
    get gOTO_LANG(): MutableComponent;
    get gOTO_SET(): TextureSet;
    get gROUP_COLLAPSE(): ResourceLocation;
    get gROUP_COLLAPSE_HIGHLIGHTED(): ResourceLocation;
    get gROUP_EXPAND(): ResourceLocation;
    get gROUP_EXPAND_HIGHLIGHTED(): ResourceLocation;
    get iNCREMENT_DOWN(): ResourceLocation;
    get iNCREMENT_DOWN_DISABLED(): ResourceLocation;
    get iNCREMENT_DOWN_HIGHLIGHTED(): ResourceLocation;
    get iNCREMENT_UP(): ResourceLocation;
    get iNCREMENT_UP_DISABLED(): ResourceLocation;
    get iNCREMENT_UP_HIGHLIGHTED(): ResourceLocation;
    get iNFO(): ResourceLocation;
    get iNFO_HIGHLIGHTED(): ResourceLocation;
    get iNFO_INACTIVE(): ResourceLocation;
    get iNFO_LANG(): MutableComponent;
    get iNFO_SET(): TextureSet;
    get kEYBIND_ADD(): ResourceLocation;
    get kEYBIND_ADD_DISABLED(): ResourceLocation;
    get kEYBIND_ADD_HIGHLIGHTED(): ResourceLocation;
    get kEYBIND_ADD_LANG(): MutableComponent;
    get kEYBIND_CLEAR(): ResourceLocation;
    get kEYBIND_CLEAR_DISABLED(): ResourceLocation;
    get kEYBIND_CLEAR_HIGHLIGHTED(): ResourceLocation;
    get kEYBIND_CLEAR_LANG(): MutableComponent;
    get lIST_LANG(): MutableComponent;
    get mAP_ARROW(): MutableComponent;
    get mAP_LANG(): MutableComponent;
    get mENU(): ResourceLocation;
    get mENU_CLEAR_LANG(): MutableComponent;
    get mENU_DISABLED(): ResourceLocation;
    get mENU_HIGHLIGHTED(): ResourceLocation;
    get mENU_LANG(): MutableComponent;
    get rESTORE(): ResourceLocation;
    get rESTORE_HIGHLIGHTED(): ResourceLocation;
    get rESTORE_INACTIVE(): ResourceLocation;
    get rESTORE_LANG(): MutableComponent;
    get rESTORE_SET(): TextureSet;
    get sET_LANG(): MutableComponent;
  }


  class TextureProvider {
    get(var1: boolean, var2: boolean): ResourceLocation;
  }


  interface TextureSet extends TextureProvider {}
  class TextureSet extends TextureProvider {
    constructor(tex: ResourceLocation, disabled: ResourceLocation, highlighted: ResourceLocation);

    constructor(id: ResourceLocation);
    copy(tex: ResourceLocation, disabled: ResourceLocation, highlighted: ResourceLocation): TextureSet;
    static copy$default(textureSet: TextureSet, resourceLocation: ResourceLocation, resourceLocation2: ResourceLocation, resourceLocation3: ResourceLocation, n: number, object: any): TextureSet;
    equals(other: any): boolean;
    get(enabled: boolean, focused: boolean): ResourceLocation;
    hashCode(): number;
    toString(): string;
  }


  class TooltipChild {
    static readonly Companion: Companion;
    provideNarrationLines(): Component[];
    provideTooltipLines(mouseX: number, mouseY: number, parentSelected: boolean, keyboardFocused: boolean): Component[];
  }


  interface VerticalSliderWidget extends AbstractWidget {}
  class VerticalSliderWidget extends AbstractWidget {
    static readonly Companion: me_fzzyhmstrs_fzzy_config_screen_widget_verticalsliderwidget_Companion;
    constructor(wrappedValue: Supplier<number>, x: number, y: number, width: number, height: number, message: Component, valueApplier: Consumer<number>);
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    onClick(mouseX: number, mouseY: number): void;
    onRelease(mouseX: number, mouseY: number): void;
    playDownSound(soundManager: SoundManager): void;
    setFocused(focused: boolean): void;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.screen.widget.custom' {
  import { Companion, ActiveNarrationSupplier, Builder } from 'me.fzzyhmstrs.fzzy_config.screen.widget.custom.CustomButtonWidget';
  import { Component } from 'net.minecraft.network.chat';
  import { Consumer } from 'java.util.function';
  import { TooltipChild, TextureProvider } from 'me.fzzyhmstrs.fzzy_config.screen.widget';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { Companion as me_fzzyhmstrs_fzzy_config_screen_widget_custom_custompressablewidget_Companion } from 'me.fzzyhmstrs.fzzy_config.screen.widget.custom.CustomPressableWidget';

  interface CustomButtonWidget extends CustomPressableWidget {}
  class CustomButtonWidget extends CustomPressableWidget {
    static readonly Companion: Companion;
    constructor(n: number, n2: number, n3: number, n4: number, component: Component, consumer2: Consumer, activeNarrationSupplier: ActiveNarrationSupplier, consumer3: Consumer, tooltipChild: TooltipChild, textureProvider: TextureProvider, bl: boolean, n5: number, defaultConstructorMarker: DefaultConstructorMarker);
    static builder(message: Component, onPress: Consumer<CustomButtonWidget>): Builder;
    static builder(onPress: Consumer<CustomButtonWidget>): Builder;
    static get aCTIVE_ONLY_ACTIVE_NARRATION_SUPPLIER(): ActiveNarrationSupplier;
    static get dEFAULT_ACTIVE_NARRATION_SUPPLIER(): ActiveNarrationSupplier;
    get message(): Component;
    onPress(): void;
    provideTooltipLines(mouseX: number, mouseY: number, parentSelected: boolean, keyboardFocused: boolean): Component[];
    renderBackground(context: GuiGraphics, x: number, y: number, width: number, height: number, mouseX: number, mouseY: number, delta: number): void;
    renderCustom(context: GuiGraphics, x: number, y: number, width: number, height: number, mouseX: number, mouseY: number, delta: number): void;
  }


  interface CustomPressableWidget extends TooltipChild, AbstractWidget {}
  class CustomPressableWidget extends TooltipChild {
    static readonly Companion: me_fzzyhmstrs_fzzy_config_screen_widget_custom_custompressablewidget_Companion;
    constructor(x: number, y: number, width: number, height: number, message: Component);
    drawMessage(context: GuiGraphics, textRenderer: Font, x: number, y: number, width: number, height: number, color: number): void;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    onClick(mouseX: number, mouseY: number): void;
    onPress(): void;
    renderBackground(context: GuiGraphics, x: number, y: number, width: number, height: number, mouseX: number, mouseY: number, delta: number): void;
    renderCustom(context: GuiGraphics, x: number, y: number, width: number, height: number, mouseX: number, mouseY: number, delta: number): void;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.screen.widget.custom.CustomButtonWidget' {
  import { MutableComponent, Component } from 'net.minecraft.network.chat';
  import { Supplier, Consumer, Function } from 'java.util.function';
  import { CustomButtonWidget } from 'me.fzzyhmstrs.fzzy_config.screen.widget.custom';
  import { Tooltip } from 'net.minecraft.client.gui.components';
  import { Boolean } from 'java.lang';
  import { CreateNarration } from 'Button';
  import { NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { TooltipChild, TextureProvider } from 'me.fzzyhmstrs.fzzy_config.screen.widget';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class ActiveNarrationSupplier {
    createNarrationMessage(var1: boolean, var2: Supplier<MutableComponent>): MutableComponent;
  }


  class Builder {
    constructor(message: Component, onPress: Consumer<CustomButtonWidget>);

    constructor(onPress: Consumer<CustomButtonWidget>);
    active(active: boolean): Builder;
    activeSupplier(activeSupplier: Supplier<boolean>): Builder;
    build(): CustomButtonWidget;
    child(child2: TooltipChild): Builder;
    dimensions(x: number, y: number, width: number, height: number): Builder;
    height(height: number): Builder;
    messageSupplier(messageSupplier: Supplier<Component>): Builder;
    narrationAppender(narrationAppender: Consumer<NarrationElementOutput>): Builder;
    narrationSupplier(narrationSupplier: CreateNarration): Builder;
    narrationSupplier(narrationSupplier: ActiveNarrationSupplier): Builder;
    noMessage(): Builder;
    position(x: number, y: number): Builder;
    size(width: number, height: number): Builder;
    texture(tex: ResourceLocation): Builder;
    textures(textures: TextureProvider): Builder;
    textures(tex: ResourceLocation, disabled: ResourceLocation, highlighted: ResourceLocation): Builder;
    textures(tex: ResourceLocation, disabled: ResourceLocation, highlighted: ResourceLocation, highlightedDisabled: ResourceLocation): Builder;
    tooltip(tooltip: Tooltip): Builder;
    tooltip(tooltip: Component): Builder;
    tooltipSupplier(tooltipSupplier: Function<boolean, Component>): Builder;
    width(width: number): Builder;
  }


  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    builder(message: Component, onPress: Consumer<CustomButtonWidget>): Builder;
    builder(onPress: Consumer<CustomButtonWidget>): Builder;
    get aCTIVE_ONLY_ACTIVE_NARRATION_SUPPLIER(): ActiveNarrationSupplier;
    static get aCTIVE_ONLY_ACTIVE_NARRATION_SUPPLIER$annotations(): void;
    get dEFAULT_ACTIVE_NARRATION_SUPPLIER(): ActiveNarrationSupplier;
    static get dEFAULT_ACTIVE_NARRATION_SUPPLIER$annotations(): void;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.screen.widget.custom.CustomPressableWidget' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { TextureSet } from 'me.fzzyhmstrs.fzzy_config.screen.widget';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get dEFAULT_TEXTURES(): TextureSet;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.screen.widget.internal' {
  import { LayoutElement } from 'net.minecraft.client.gui.layouts';
  import { Renderable, AbstractWidget, EditBox } from 'net.minecraft.client.gui.components';
  import { Scalable } from 'me.fzzyhmstrs.fzzy_config.screen.widget';
  import { Companion } from 'me.fzzyhmstrs.fzzy_config.screen.widget.internal.DividerWidget';
  import { Consumer } from 'java.util.function';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { EnumMap } from 'java.util';
  import { ScreenDirection } from 'net.minecraft.client.gui.navigation';

  interface DividerWidget extends LayoutElement, Renderable, Scalable {}
  class DividerWidget extends LayoutElement {
    static readonly Companion: Companion;
    constructor(width: number);
    get height(): number;
    get width(): number;
    get x(): number;
    get y(): number;
    render(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    set height(height: number);
    set width(width: number);
    set x(x: number);
    set y(y: number);
    visitWidgets(consumer2: Consumer<AbstractWidget>): void;
  }


  interface NavigableTextFieldWidget extends EditBox {}
  class NavigableTextFieldWidget extends EditBox {
    constructor(textRenderer: Font, width: number, height: number, text: Component);
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    moveCursorTo(cursor: number, shiftKeyPressed: boolean): void;
    onClick(mouseX: number, mouseY: number): void;
    renderWidget(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }


  interface Neighbor extends GuiEventListener {}
  class Neighbor extends GuiEventListener {
    get neighbor(): EnumMap<ScreenDirection, Neighbor>;
    getNeighbor(direction: ScreenDirection): Neighbor;
    setNeighbor(direction: ScreenDirection, neighbor: Neighbor): void;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.screen.widget.internal.DividerWidget' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.screen.widget.OnClickTextFieldWidget' {
  import { OnClickTextFieldWidget } from 'me.fzzyhmstrs.fzzy_config.screen.widget';

  class OnInteractAction {
    interact(var1: OnClickTextFieldWidget, var2: boolean, var3: number, var4: number, var5: number): void;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.screen.widget.SuggestionBackedTextFieldWidget' {
  import { CompletableFuture } from 'java.util.concurrent';
  import { Suggestions } from 'com.mojang.brigadier.suggestion';
  import { ChoiceValidator } from 'me.fzzyhmstrs.fzzy_config.validation.misc';

  class SuggestionProvider {
    getSuggestions(var1: string, var2: number, var3: ChoiceValidator<string>): CompletableFuture<Suggestions>;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.screen.widget.TextureSet' {
  import { TextureProvider } from 'me.fzzyhmstrs.fzzy_config.screen.widget';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface Dual extends TextureProvider {}
  class Dual extends TextureProvider {
    constructor(tex: ResourceLocation, highlighted: ResourceLocation);
    copy(tex: ResourceLocation, highlighted: ResourceLocation): Dual;
    static copy$default(dual: Dual, resourceLocation: ResourceLocation, resourceLocation2: ResourceLocation, n: number, object: any): Dual;
    equals(other: any): boolean;
    get(enabled: boolean, focused: boolean): ResourceLocation;
    hashCode(): number;
    toString(): string;
  }


  interface Quad extends TextureProvider {}
  class Quad extends TextureProvider {
    constructor(tex: ResourceLocation, disabled: ResourceLocation, highlighted: ResourceLocation, disabledHighlighted: ResourceLocation);
    copy(tex: ResourceLocation, disabled: ResourceLocation, highlighted: ResourceLocation, disabledHighlighted: ResourceLocation): Quad;
    static copy$default(quad: Quad, resourceLocation: ResourceLocation, resourceLocation2: ResourceLocation, resourceLocation3: ResourceLocation, resourceLocation4: ResourceLocation, n: number, object: any): Quad;
    equals(other: any): boolean;
    get(enabled: boolean, focused: boolean): ResourceLocation;
    hashCode(): number;
    toString(): string;
  }


  interface Single extends TextureProvider {}
  class Single extends TextureProvider {
    constructor(tex: ResourceLocation);
    copy(tex: ResourceLocation): Single;
    static copy$default(single: Single, resourceLocation: ResourceLocation, n: number, object: any): Single;
    equals(other: any): boolean;
    get(enabled: boolean, focused: boolean): ResourceLocation;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.screen.widget.TooltipChild' {
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  class Companion {
    get eMPTY(): Component[];
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.screen.widget.VerticalSliderWidget' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.updates' {
  import { Companion } from 'me.fzzyhmstrs.fzzy_config.updates.BasicValidationProvider';
  import { Class } from 'java.lang';
  import { ValidatedField } from 'me.fzzyhmstrs.fzzy_config.validation';
  import { KCallable, KType } from 'kotlin.reflect';
  import { List } from 'java.util';
  import { Annotation } from 'java.lang.annotation';
  import { EntryKeyed } from 'me.fzzyhmstrs.fzzy_config.entry';
  import { Component } from 'net.minecraft.network.chat';
  import { Base } from 'me.fzzyhmstrs.fzzy_config.updates.UpdateManager';

  class BasicValidationProvider {
    static readonly Companion: Companion;
    static readonly intClass: Class;
    static readonly shortClass: Class;
    static readonly byteClass: Class;
    static readonly longClass: Class;
    static readonly doubleClass: Class;
    static readonly floatClass: Class;
    static readonly booleanClass: Class;
    static readonly triStateClass: Class;
    static readonly colorClass: Class;
    static readonly stringClass: Class;
    static readonly idClass: Class;
    static readonly tagClass: Class;
    static readonly itemClass: Class;
    static readonly blockClass: Class;
    static readonly entityClass: Class;
    static readonly fluidClass: Class;
    basicValidationStrategy(input: any, inputType: KCallable<any>, fieldName: string): ValidatedField<any>;
    basicValidationStrategy(input: any, inputType: KType, fieldName: string, annotations: Annotation[]): ValidatedField<any>;
  }


  interface Updatable extends EntryKeyed {}
  class Updatable extends EntryKeyed {
    get updateManager(): UpdateManager;
    isDefault(): boolean;
    peekState(): boolean;
    popState(): boolean;
    pushState(): void;
    restore(): void;
    revert(): void;
    set updateManager(var1: UpdateManager);
    update(updateMessage: Component): void;
  }


  class UpdateManager {
    static readonly Base: Base;
    addUpdateMessage(var1: Updatable, var2: Component): void;
    apply(var1: boolean): void;
    changeCount(): number;
    changeHistory(): string[];
    flush(): string[];
    forwardsCount(): number;
    forwardsHandler(): void;
    getUpdate(var1: string): Updatable;
    hasChangeHistory(): boolean;
    hasChanges(): boolean;
    hasForwards(): boolean;
    hasRestores(scope: string): boolean;
    hasUpdate(var1: string): boolean;
    restore(var1: string): void;
    restoreCount(var1: string): number;
    revert(): void;
    revertLast(): void;
    update(var1: Updatable, var2: Component): void;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.updates.BasicValidationProvider' {
  import { ValidatedField } from 'me.fzzyhmstrs.fzzy_config.validation';
  import { KType, KCallable } from 'kotlin.reflect';
  import { List } from 'java.util';
  import { Annotation } from 'java.lang.annotation';
  import { Restrict } from 'me.fzzyhmstrs.fzzy_config.validation.number.ValidatedInt';
  import { Restrict as me_fzzyhmstrs_fzzy_config_validation_number_validatedbyte_Restrict } from 'me.fzzyhmstrs.fzzy_config.validation.number.ValidatedByte';
  import { Restrict as me_fzzyhmstrs_fzzy_config_validation_number_validatedshort_Restrict } from 'me.fzzyhmstrs.fzzy_config.validation.number.ValidatedShort';
  import { Restrict as me_fzzyhmstrs_fzzy_config_validation_number_validatedlong_Restrict } from 'me.fzzyhmstrs.fzzy_config.validation.number.ValidatedLong';
  import { Restrict as me_fzzyhmstrs_fzzy_config_validation_number_validateddouble_Restrict } from 'me.fzzyhmstrs.fzzy_config.validation.number.ValidatedDouble';
  import { Restrict as me_fzzyhmstrs_fzzy_config_validation_number_validatedfloat_Restrict } from 'me.fzzyhmstrs.fzzy_config.validation.number.ValidatedFloat';
  import { BasicValidationProvider } from 'me.fzzyhmstrs.fzzy_config.updates';

  class Companion {
    complexStrategy(input: any, type: KType, fieldName: string, annotations: Annotation[]): ValidatedField<any>;
    getByteRestrict(annotations: Annotation[]): me_fzzyhmstrs_fzzy_config_validation_number_validatedbyte_Restrict;
    getDoubleRestrict(annotations: Annotation[]): me_fzzyhmstrs_fzzy_config_validation_number_validateddouble_Restrict;
    getFloatRestrict(annotations: Annotation[]): me_fzzyhmstrs_fzzy_config_validation_number_validatedfloat_Restrict;
    getIntRestrict(annotations: Annotation[]): Restrict;
    getLongRestrict(annotations: Annotation[]): me_fzzyhmstrs_fzzy_config_validation_number_validatedlong_Restrict;
    getShortRestrict(annotations: Annotation[]): me_fzzyhmstrs_fzzy_config_validation_number_validatedshort_Restrict;
  }


  class DefaultImpls {
    static basicValidationStrategy($this: BasicValidationProvider, input: any, inputType: KCallable<any>, fieldName: string): ValidatedField<any>;
    static basicValidationStrategy($this: BasicValidationProvider, input: any, inputType: KType, fieldName: string, annotations: Annotation[]): ValidatedField<any>;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.updates.UpdateManager' {
  import { BaseUpdateManager, UpdateManager } from 'me.fzzyhmstrs.fzzy_config.updates';

  interface Base extends BaseUpdateManager {}
  class Base extends BaseUpdateManager {
  }


  class DefaultImpls {
    static hasChanges($this: UpdateManager): boolean;
    static hasForwards($this: UpdateManager): boolean;
    static hasRestores($this: UpdateManager, scope: string): boolean;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.util' {
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { File } from 'java.io';
  import { Logger } from 'org.slf4j';
  import { Registrar } from 'me.fzzyhmstrs.fzzy_config.util.platform';
  import { Registry } from 'net.minecraft.core';
  import { BiConsumer, BooleanSupplier, Supplier, Consumer, Predicate } from 'java.util.function';
  import { Optional, List } from 'java.util';
  import { Integer, Enum, Boolean, Iterable, Throwable } from 'java.lang';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ExecutorService } from 'java.util.concurrent';
  import { EntryKeyed } from 'me.fzzyhmstrs.fzzy_config.entry';
  import { StringRepresentable } from 'net.minecraft.util';
  import { Companion } from 'me.fzzyhmstrs.fzzy_config.util.TriState';
  import { EnumEntries } from 'kotlin.enums';
  import { Companion as me_fzzyhmstrs_fzzy_config_util_validationresult_Companion, ErrorEntry } from 'me.fzzyhmstrs.fzzy_config.util.ValidationResult';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Type, Entry } from 'me.fzzyhmstrs.fzzy_config.util.ValidationResult.ErrorEntry';

  interface EnumTranslatable extends Translatable {}
  class EnumTranslatable extends Translatable {
    descriptionKey(): string;
    prefix(): string;
    prefixKey(): string;
    translation(fallback: string): MutableComponent;
    translationKey(): string;
  }


  class PlatformApi {
    buildRegistryTranslations<T>(var1: T, var2: string, var3: string, var4: boolean, var5: BiConsumer<string, string>): void;
    configDir(): File;
    createRegistrar<T>(var1: string, var2: Registry<T>): Registrar<T>;
    devLogger(var1: string): Logger;
    gameDir(): File;
    isClient(): boolean;
    isDev(): boolean;
    isModLoaded(var1: string): boolean;
    testVersion(var1: string, var2: string): Optional<number>;
  }


  class Ref<T = any> {
    constructor(value: T);
    get (): T;
    set (value: T);
    toString(): string;
  }


  class RenderUtil {
    static readonly INSTANCE: RenderUtil;
    drawNineSlice($this$drawNineSlice: GuiGraphics, id: ResourceLocation, x: number, y: number, width: number, height: number): void;
    drawNineSlice($this$drawNineSlice: GuiGraphics, id: ResourceLocation, x: number, y: number, width: number, height: number, color: number): void;
    drawNineSlice($this$drawNineSlice: GuiGraphics, id: ResourceLocation, x: number, y: number, width: number, height: number, alpha: number): void;
    drawTex($this$drawTex: GuiGraphics, id: ResourceLocation, x: number, y: number, width: number, height: number): void;
    drawTex($this$drawTex: GuiGraphics, id: ResourceLocation, x: number, y: number, width: number, height: number, color: number): void;
    drawTex($this$drawTex: GuiGraphics, id: ResourceLocation, x: number, y: number, width: number, height: number, alpha: number): void;
    drawTex($this$drawTex: GuiGraphics, id: ResourceLocation, x: number, y: number, u: number, v: number, width: number, height: number, texWidth: number, texHeight: number): void;
    renderBlur(context: GuiGraphics, x: number, y: number, delta: number): void;
  }


  class ThreadUtils {
    static readonly INSTANCE: ThreadUtils;
    get eXECUTOR$fzzy_config(): ExecutorService;
  }


  interface TranslatableEntry extends Translatable, EntryKeyed {}
  class TranslatableEntry extends Translatable {
    description(fallback: string): MutableComponent;
    descriptionKey(): string;
    get entryKey(): string;
    get translatableEntryKey(): string;
    prefix(fallback: string): MutableComponent;
    prefixKey(): string;
    set entryKey(key: string);
    set translatableEntryKey(var1: string);
    translation(fallback: string): MutableComponent;
    translationKey(): string;
  }


  interface TriState extends TriStateProvider, EnumTranslatable, StringRepresentable, Enum<TriState> {}
  class TriState extends TriStateProvider {
    static readonly Companion: Companion;
    static readonly DEFAULT: TriState;
    static readonly TRUE: TriState;
    static readonly FALSE: TriState;
    descriptionKey(): string;
    get asBoolean(): boolean;
    get boxed(): boolean;
    static get entries(): EnumEntries<TriState>;
    get serializedName(): string;
    hasPrefix(): boolean;
    orElse(value: boolean): boolean;
    orElseGet(supplier2: BooleanSupplier): boolean;
    orElseGet(supplier2: Supplier<boolean>): boolean;
    prefix(): string;
    prefixKey(): string;
    translationKey(): string;
    validate(input: boolean): boolean;
    static valueOf(value: string): TriState;
    static values(): TriState[];
  }


  interface TriStateProvider extends BooleanSupplier {}
  class TriStateProvider extends BooleanSupplier {
    get asBoolean(): boolean;
    get boxed(): boolean;
    orElse(var1: boolean): boolean;
    orElseGet(var1: BooleanSupplier): boolean;
    orElseGet(var1: Supplier<boolean>): boolean;
    validate(var1: boolean): boolean;
  }


  class ValidationResult<T = any> {
    static readonly Companion: me_fzzyhmstrs_fzzy_config_util_validationresult_Companion;
    constructor(storedVal: any, errorContext: ErrorEntry, $constructor_marker: DefaultConstructorMarker);
    consume<C>(t: Type<C>, c: Consumer<Entry<C>>): void;
    consume(c: Consumer<Entry<any>>): void;
    get (): T;
    get error(): string;
    get errorEntry(): ErrorEntry;
    has<C>(t: Type<C>): boolean;
    isCritical(): boolean;
    isError(): boolean;
    isValid(): boolean;
    iterate<C>(t: Type<C>): Iterable<Entry<C>>;
    iterate(): Iterable<Entry<any>>;
    log(writer: BiConsumer<string, Throwable>): ValidationResult<T>;
    log(): ValidationResult<T>;
    static log$default(validationResult: ValidationResult, biConsumer: BiConsumer, n: number, object: any): ValidationResult;
    logPlain(writer: BiConsumer<string, Throwable>): ValidationResult<T>;
    logPlain(): ValidationResult<T>;
    static logPlain$default(validationResult: ValidationResult, biConsumer: BiConsumer, n: number, object: any): ValidationResult;
    test<C>(t: Type<C>, p: Predicate<Entry<C>>): boolean;
    test(p: Predicate<Entry<any>>): void;
    toString(): string;
    writeError(errors: string[]): void;
    writeWarning(errors: string[]): void;
  }


  class Walkable {
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.util.EnumTranslatable' {
  import { EnumTranslatable } from 'me.fzzyhmstrs.fzzy_config.util';
  import { MutableComponent } from 'net.minecraft.network.chat';

  class DefaultImpls {
    static description($this: EnumTranslatable, fallback: string): MutableComponent;
    static descriptionKey($this: EnumTranslatable): string;
    static descriptionOrNull($this: EnumTranslatable, fallback: string): MutableComponent;
    static hasDescription($this: EnumTranslatable): boolean;
    static hasPrefix($this: EnumTranslatable): boolean;
    static hasTranslation($this: EnumTranslatable): boolean;
    static prefix($this: EnumTranslatable): string;
    static prefix($this: EnumTranslatable, fallback: string): MutableComponent;
    static prefixKey($this: EnumTranslatable): string;
    static prefixOrNull($this: EnumTranslatable, fallback: string): MutableComponent;
    static translation($this: EnumTranslatable, fallback: string): MutableComponent;
    static translationKey($this: EnumTranslatable): string;
    static translationOrNull($this: EnumTranslatable, fallback: string): MutableComponent;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.util.function' {
  import { Companion } from 'me.fzzyhmstrs.fzzy_config.util.function.CompositingSupplier';
  import { Predicate, Supplier, Function } from 'java.util.function';
  import { Boolean } from 'java.lang';

  class CompositingSupplier<T = any> {
    static readonly Companion: Companion;
  }


  interface ConstFunction<T = any, R = any> extends FunctionSupplier<T, R>, ConstSupplier<R> {}
  class ConstFunction<T = any, R = any> extends FunctionSupplier<T, R> {
    constructor(r: R);
    apply(t: T): R;
  }


  interface ConstPredicate<T = any> extends Predicate<T>, FunctionSupplier<T, boolean> {}
  class ConstPredicate<T = any> extends Predicate<T> {
    constructor(bl: boolean);
    apply(t: T): boolean;
    get (): boolean;
    test(t: T): boolean;
  }


  interface ConstSupplier<T = any> extends Supplier<T> {}
  class ConstSupplier<T = any> extends Supplier<T> {
    constructor(t: T);
    get (): T;
  }


  interface FunctionSupplier<T = any, R = any> extends Function<T, R>, Supplier<R> {}
  class FunctionSupplier<T = any, R = any> extends Function<T, R> {
  }


  interface SuppliedFunctionSupplier<T = any, R = any> extends FunctionSupplier<T, R> {}
  class SuppliedFunctionSupplier<T = any, R = any> extends FunctionSupplier<T, R> {
    constructor(t: Supplier<T>, func: Function<T, R>);
    apply(t: T): R;
    get (): R;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.util.function.CompositingSupplier' {
  import { Supplier, BiFunction } from 'java.util.function';

  class Companion {
    of<T>(one: T, two: T, compositingFunction: BiFunction<T, T, T>): Supplier<T>;
    of<T>(oneSupplier: Supplier<T>, twoSupplier: Supplier<T>, compositingFunction: BiFunction<T, T, T>): Supplier<T>;
    of<T>(oneSupplier: Supplier<T>, two: T, compositingFunction: BiFunction<T, T, T>): Supplier<T>;
    of<T>(one: T, twoSupplier: Supplier<T>, compositingFunction: BiFunction<T, T, T>): Supplier<T>;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.util.platform.impl' {
  import { Logger, Marker } from 'org.slf4j';
  import { Throwable } from 'java.lang';

  interface DevLogger extends Logger {}
  class DevLogger extends Logger {
    constructor(name: string);
    debug(msg: string): void;
    debug(format: string, arg: any): void;
    debug(format: string, arg1: any, arg2: any): void;
    debug(format: string, ...arguments: any[]): void;
    debug(msg: string, t: Throwable): void;
    debug(marker: Marker, msg: string): void;
    debug(marker: Marker, format: string, arg: any): void;
    debug(marker: Marker, format: string, arg1: any, arg2: any): void;
    debug(marker: Marker, format: string, ...arguments: any[]): void;
    debug(marker: Marker, msg: string, t: Throwable): void;
    error(msg: string): void;
    error(format: string, arg: any): void;
    error(format: string, arg1: any, arg2: any): void;
    error(format: string, ...arguments: any[]): void;
    error(msg: string, t: Throwable): void;
    error(marker: Marker, msg: string): void;
    error(marker: Marker, format: string, arg: any): void;
    error(marker: Marker, format: string, arg1: any, arg2: any): void;
    error(marker: Marker, format: string, ...arguments: any[]): void;
    error(marker: Marker, msg: string, t: Throwable): void;
    get name(): string;
    info(msg: string): void;
    info(format: string, arg: any): void;
    info(format: string, arg1: any, arg2: any): void;
    info(format: string, ...arguments: any[]): void;
    info(msg: string, t: Throwable): void;
    info(marker: Marker, msg: string): void;
    info(marker: Marker, format: string, arg: any): void;
    info(marker: Marker, format: string, arg1: any, arg2: any): void;
    info(marker: Marker, format: string, ...arguments: any[]): void;
    info(marker: Marker, msg: string, t: Throwable): void;
    isDebugEnabled(): boolean;
    isDebugEnabled(marker: Marker): boolean;
    isErrorEnabled(): boolean;
    isErrorEnabled(marker: Marker): boolean;
    isInfoEnabled(): boolean;
    isInfoEnabled(marker: Marker): boolean;
    isTraceEnabled(): boolean;
    isTraceEnabled(marker: Marker): boolean;
    isWarnEnabled(): boolean;
    isWarnEnabled(marker: Marker): boolean;
    trace(msg: string): void;
    trace(format: string, arg: any): void;
    trace(format: string, arg1: any, arg2: any): void;
    trace(format: string, ...arguments: any[]): void;
    trace(msg: string, t: Throwable): void;
    trace(marker: Marker, msg: string): void;
    trace(marker: Marker, format: string, arg: any): void;
    trace(marker: Marker, format: string, arg1: any, arg2: any): void;
    trace(marker: Marker, format: string, ...argArray: any[]): void;
    trace(marker: Marker, msg: string, t: Throwable): void;
    warn(msg: string): void;
    warn(format: string, arg: any): void;
    warn(format: string, ...arguments: any[]): void;
    warn(format: string, arg1: any, arg2: any): void;
    warn(msg: string, t: Throwable): void;
    warn(marker: Marker, msg: string): void;
    warn(marker: Marker, format: string, arg: any): void;
    warn(marker: Marker, format: string, arg1: any, arg2: any): void;
    warn(marker: Marker, format: string, ...arguments: any[]): void;
    warn(marker: Marker, msg: string, t: Throwable): void;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.util.platform.impl.RegistrarImpl' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { IEventBus } from 'net.neoforged.bus.api';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    resolveUnbound$fzzy_config(bus: IEventBus): void;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.util.platform' {
  import { Supplier, Predicate } from 'java.util.function';
  import { Registry, Holder, HolderOwner } from 'net.minecraft.core';
  import { TagKey } from 'net.minecraft.tags';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Stream } from 'java.util.stream';
  import { Either } from 'com.mojang.datafixers.util';
  import { Optional } from 'java.util';
  import { Kind } from 'Holder';

  class Registrar<T = any> {
    createTag(var1: string): TagKey<T>;
    createTag(var1: ResourceLocation): TagKey<T>;
    get registry(): Registry<T>;
    init(): void;
    register(var1: string, var2: Supplier<T>): RegistrySupplier<T>;
  }


  interface RegistrySupplier<T = any> extends Supplier<T>, Holder<T> {}
  class RegistrySupplier<T = any> extends Supplier<T> {
    canSerializeIn(owner: HolderOwner<T>): boolean;
    get entry(): Holder<T>;
    get id(): ResourceLocation;
    get registryKey(): ResourceKey<T>;
    is(id: ResourceLocation): boolean;
    is(key: ResourceKey<T>): boolean;
    is(predicate: Predicate<ResourceKey<T>>): boolean;
    is(tag: TagKey<T>): boolean;
    is(entry: Holder<T>): boolean;
    isBound(): boolean;
    kind(): Kind;
    tags(): Stream<TagKey<T>>;
    unwrap(): Either<ResourceKey<T>, T>;
    unwrapKey(): Optional<ResourceKey<T>>;
    value(): T;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.util.pos' {
  import { RootPos, SuppliedPos as me_fzzyhmstrs_fzzy_config_util_pos_pos_SuppliedPos, Companion as me_fzzyhmstrs_fzzy_config_util_pos_pos_Companion, ParentPos } from 'me.fzzyhmstrs.fzzy_config.util.pos.Pos';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Integer } from 'java.lang';
  import { Supplier } from 'java.util.function';
  import { Companion } from 'me.fzzyhmstrs.fzzy_config.util.pos.ImmutableOffsetSuppliedPos';
  import { Companion as me_fzzyhmstrs_fzzy_config_util_pos_relpos_Companion } from 'me.fzzyhmstrs.fzzy_config.util.pos.RelPos';
  import { Companion as me_fzzyhmstrs_fzzy_config_util_pos_suppliedpos_Companion } from 'me.fzzyhmstrs.fzzy_config.util.pos.SuppliedPos';

  interface AbsPos extends RootPos {}
  class AbsPos extends RootPos {
    constructor(p: number);

    constructor(n: number, n2: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor();
    dec(amount: number): void;
    get (): number;
    inc(amount: number): void;
    set (n: number);
    toString(): string;
  }


  interface DualSuppliedPos extends Pos {}
  class DualSuppliedPos extends Pos {
    constructor(parent: Supplier<number>, offset: Supplier<number>);
    dec(amount: number): void;
    get (): number;
    inc(amount: number): void;
    set (n: number);
    toString(): string;
  }


  interface ImmutableOffsetSuppliedPos extends me_fzzyhmstrs_fzzy_config_util_pos_pos_SuppliedPos {}
  class ImmutableOffsetSuppliedPos extends me_fzzyhmstrs_fzzy_config_util_pos_pos_SuppliedPos {
    static readonly Companion: Companion;
    constructor(parent: Pos, p: number, offset: Supplier<number>);
    dec(amount: number): void;
    get (): number;
    inc(amount: number): void;
    offset(): number;
    parent(): Pos;
    set (n: number);
    supplier(): Supplier<number>;
    toString(): string;
  }


  interface ImmutablePos extends RootPos {}
  class ImmutablePos extends RootPos {
    constructor(p: number);

    constructor(n: number, n2: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor();
    dec(amount: number): void;
    get (): number;
    inc(amount: number): void;
    set (n: number);
    toString(): string;
  }


  interface ImmutableSuppliedPos extends me_fzzyhmstrs_fzzy_config_util_pos_pos_SuppliedPos {}
  class ImmutableSuppliedPos extends me_fzzyhmstrs_fzzy_config_util_pos_pos_SuppliedPos {
    constructor(parent: Pos, offset: Supplier<number>);
    dec(amount: number): void;
    get (): number;
    inc(amount: number): void;
    offset(): number;
    parent(): Pos;
    set (n: number);
    supplier(): Supplier<number>;
    toString(): string;
  }


  interface OffsetSuppliedPos extends Pos {}
  class OffsetSuppliedPos extends Pos {
    constructor(p: number, offset: Supplier<number>);
    dec(amount: number): void;
    get (): number;
    inc(amount: number): void;
    set (n: number);
    toString(): string;
  }


  interface Pos extends Supplier<number> {}
  class Pos extends Supplier<number> {
    static readonly Companion: me_fzzyhmstrs_fzzy_config_util_pos_pos_Companion;
    dec(var1: number): void;
    div(other: Pos): number;
    get (): number;
    inc(var1: number): void;
    minus(other: Pos): number;
    plus(other: Pos): number;
    rem(other: Pos): number;
    set (var1: number);
    times(other: Pos): number;
  }


  interface ReferencePos extends Pos {}
  class ReferencePos extends Pos {
    constructor(reference: Supplier<number>);
    dec(amount: number): void;
    get (): number;
    inc(amount: number): void;
    set (n: number);
    toString(): string;
  }


  interface RelPos extends ParentPos {}
  class RelPos extends ParentPos {
    static readonly Companion: me_fzzyhmstrs_fzzy_config_util_pos_relpos_Companion;
    constructor(parent: Pos, p: number);

    constructor(pos: Pos, n: number, n2: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(parent: Pos);
    dec(amount: number): void;
    get (): number;
    inc(amount: number): void;
    offset(): number;
    parent(): Pos;
    set (n: number);
    toString(): string;
  }


  interface SuppliedPos extends me_fzzyhmstrs_fzzy_config_util_pos_pos_SuppliedPos {}
  class SuppliedPos extends me_fzzyhmstrs_fzzy_config_util_pos_pos_SuppliedPos {
    static readonly Companion: me_fzzyhmstrs_fzzy_config_util_pos_suppliedpos_Companion;
    constructor(parent: Pos, p: number, offset: Supplier<number>);
    dec(amount: number): void;
    get (): number;
    inc(amount: number): void;
    offset(): number;
    parent(): Pos;
    set (n: number);
    supplier(): Supplier<number>;
    toString(): string;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.util.pos.ImmutableOffsetSuppliedPos' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Pos } from 'me.fzzyhmstrs.fzzy_config.util.pos';
  import { Supplier } from 'java.util.function';
  import { Integer } from 'java.lang';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    optimized(parent: Pos, p: number, offset: Supplier<number>): Pos;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.util.pos.Pos' {
  import { ImmutablePos, Pos } from 'me.fzzyhmstrs.fzzy_config.util.pos';
  import { Supplier } from 'java.util.function';
  import { Integer } from 'java.lang';

  class Companion {
    get zERO(): ImmutablePos;
  }


  interface ParentPos extends Pos {}
  class ParentPos extends Pos {
    offset(): number;
    parent(): Pos;
  }


  interface RootPos extends Pos {}
  class RootPos extends Pos {
  }


  interface SuppliedPos extends ParentPos {}
  class SuppliedPos extends ParentPos {
    supplier(): Supplier<number>;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.util.pos.RelPos' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Pos } from 'me.fzzyhmstrs.fzzy_config.util.pos';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    optimized(parent: Pos, p: number): Pos;
    static optimized$default(companion: Companion, pos: Pos, n: number, n2: number, object: any): Pos;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.util.pos.SuppliedPos' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Pos } from 'me.fzzyhmstrs.fzzy_config.util.pos';
  import { Supplier } from 'java.util.function';
  import { Integer } from 'java.lang';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    optimized(parent: Pos, p: number, offset: Supplier<number>): Pos;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.util.TriState' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Codec } from 'com.mojang.serialization';
  import { TriState } from 'me.fzzyhmstrs.fzzy_config.util';
  import { Boolean } from 'java.lang';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get cODEC(): Codec<TriState>;
    of(bl: boolean): TriState;
    of(bl: boolean): TriState;
  }


  class WhenMappings {
    static readonly $EnumSwitchMapping$0: number[];
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.util.ValidationResult' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ValidationResult } from 'me.fzzyhmstrs.fzzy_config.util';
  import { Type, Builder, Mutable, Companion as me_fzzyhmstrs_fzzy_config_util_validationresult_errorentry_Companion, Entry } from 'me.fzzyhmstrs.fzzy_config.util.ValidationResult.ErrorEntry';
  import { UnaryOperator, Supplier, Predicate, Consumer, BiConsumer, Function } from 'java.util.function';
  import { Throwable, Iterable, Integer } from 'java.lang';
  import { DataResult } from 'com.mojang.serialization';
  import { List } from 'java.util';
  import { Logger } from 'org.slf4j';
  import { Level } from 'org.slf4j.event';
  import { Action } from 'me.fzzyhmstrs.fzzy_config.annotations';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    also<T>($this$also: ValidationResult<T>, newTest: boolean, error: string): ValidationResult<T>;
    also<T, C>($this$also: ValidationResult<T>, newTest: boolean, type: Type<C>, builder: UnaryOperator<Builder<C>>): ValidationResult<T>;
    also<T>($this$also: ValidationResult<T>, newTest: boolean, type: Type<string>, error: string, e: Throwable): ValidationResult<T>;
    static also$default(companion: Companion, validationResult: ValidationResult, bl: boolean, type: Type, string: string, throwable: Throwable, n: number, object: any): ValidationResult;
    attachTo<T>($this$attachTo: ValidationResult<T>, mutable: Mutable): ValidationResult<T>;
    bimap<N, T>($this$bimap: ValidationResult<T>, to: Function<ValidationResult<T>, ValidationResult<N>>): ValidationResult<N>;
    createMutable(header: string): Mutable;
    static createMutable$default(companion: Companion, string: string, n: number, object: any): Mutable;
    error<T>(storedVal: T, error: string): ValidationResult<T>;
    error<T>(storedVal: T, errorEntry: ErrorEntry): ValidationResult<T>;
    error<T, C>(storedVal: T, type: Type<C>, builder: UnaryOperator<Builder<C>>): ValidationResult<T>;
    error<T>(storedVal: T, type: Type<string>, error: string, e: Throwable): ValidationResult<T>;
    error<T>(storedVal: T, type: Type<string>, error: string): ValidationResult<T>;
    static error$default(companion: Companion, object: any, type: Type, string: string, throwable: Throwable, n: number, object2: any): ValidationResult;
    inmap<N, T>($this$inmap: ValidationResult<T>, to: Function<ValidationResult<T>, N>): ValidationResult<N>;
    map<N, T>($this$map: ValidationResult<T>, to: Function<T, N>): ValidationResult<N>;
    mapDataResult<T>(result: DataResult<T>, fallback: T): ValidationResult<T>;
    mapDataResult<T>(result: DataResult<T>): ValidationResult<T>;
    ofMutable<T>(storedVal: T, mutable: Mutable): ValidationResult<T>;
    outmap<N, T>($this$outmap: ValidationResult<T>, to: Function<T, ValidationResult<N>>): ValidationResult<N>;
    predicated<T>(storedVal: T, valid: boolean, error: string): ValidationResult<T>;
    predicated<T>(storedVal: T, valid: boolean, error: ErrorEntry): ValidationResult<T>;
    predicated<T>(storedVal: T, valid: boolean, error: Supplier<string>): ValidationResult<T>;
    predicated<T, C>(storedVal: T, valid: boolean, type: Type<C>, builder: UnaryOperator<Builder<C>>): ValidationResult<T>;
    predicated<T, C>(storedVal: T, valid: Predicate<T>, type: Type<C>, builder: UnaryOperator<Builder<C>>): ValidationResult<T>;
    report<T>($this$report: ValidationResult<T>, errorBuilder: string[]): ValidationResult<T>;
    report<T>($this$report: ValidationResult<T>, errorReporter: Consumer<string>): ValidationResult<T>;
    reportTo<T>($this$reportTo: ValidationResult<T>, errorReporter: BiConsumer<string, Throwable>): ValidationResult<T>;
    success<T>(storedVal: T): ValidationResult<T>;
    wrap<T>($this$wrap: ValidationResult<any>, newVal: T): ValidationResult<T>;
  }


  class ErrorEntry {
    static readonly Companion: me_fzzyhmstrs_fzzy_config_util_validationresult_errorentry_Companion;
    addError(var1: ErrorEntry): ErrorEntry;
    addError<C>(var1: Type<C>, var2: UnaryOperator<Builder<C>>): ErrorEntry;
    addError(builder: UnaryOperator<Builder<string>>): ErrorEntry;
    consumeAll(var1: Consumer<Entry<any>>): void;
    consumeType<C>(var1: Type<C>, var2: Consumer<Entry<C>>): void;
    static createEntryLogger(logger: Logger, level: Level): BiConsumer<string, Throwable>;
    static createLogger(logger: Logger, level: Level, errorsOnly: boolean): Consumer<Entry<any>>;
    get plainString(): string;
    get string(): string;
    hasType<C>(var1: Type<C>): boolean;
    isCritical(): boolean;
    isEmpty(): boolean;
    isError(): boolean;
    isLoggable(): boolean;
    iterateAll(): Iterable<Entry<any>>;
    iterateType<C>(var1: Type<C>): Iterable<Entry<C>>;
    log(writer: BiConsumer<string, Throwable>): void;
    logPlain(writer: BiConsumer<string, Throwable>): void;
    mutable(): Mutable;
    predicateAll(var1: Predicate<Entry<any>>): boolean;
    predicateType<C>(var1: Type<C>, var2: Predicate<Entry<C>>): boolean;
  }


  class Errors {
    static readonly INSTANCE: Errors;
    get aCCESS_VIOLATION(): Type<string>;
    get aCTION(): Type<Action>;
    get bASIC(): Type<string>;
    get dESERIALIZATION(): Type<string>;
    get fILE_STRUCTURE(): Type<string>;
    get iNVALID(): Type<string>;
    get oUT_OF_BOUNDS(): Type<string>;
    get pARSE(): Type<string>;
    get rESTART(): Type<Action>;
    get sERIALIZATION(): Type<string>;
    get vERSION(): Type<number>;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.util.ValidationResult.ErrorEntry' {
  import { Throwable } from 'java.lang';
  import { ErrorEntry } from 'me.fzzyhmstrs.fzzy_config.util.ValidationResult';
  import { ValidationResult } from 'me.fzzyhmstrs.fzzy_config.util';
  import { Consumer, BiConsumer, UnaryOperator } from 'java.util.function';
  import { Logger } from 'org.slf4j';
  import { Level } from 'org.slf4j.event';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Builder<C = any> {
    constructor(type: Type<C>);
    addError(child2: ErrorEntry): Builder<C>;
    addError(child2: ValidationResult<any>): Builder<C>;
    build(): ErrorEntry;
    content(content: C): Builder<C>;
    exception(e: Throwable): Builder<C>;
    header(header: string): Builder<C>;
    message(msg: string): Builder<C>;
  }


  class Companion {
    basic(error: string): ErrorEntry;
    builder<C>(type: Type<C>): Builder<C>;
    builder(): Builder<string>;
    createEntryLogger(logger: Logger, level: Level): BiConsumer<string, Throwable>;
    static createEntryLogger$default(companion: Companion, logger: Logger, level: Level, n: number, object: any): BiConsumer;
    createLogger(logger: Logger, level: Level, errorsOnly: boolean): Consumer<Entry<any>>;
    static createLogger$default(companion: Companion, logger: Logger, level: Level, bl: boolean, n: number, object: any): Consumer;
    empty(header: string): ErrorEntry;
    static empty$default(companion: Companion, string: string, n: number, object: any): ErrorEntry;
    get eNTRY_ERROR_LOGGER(): BiConsumer<string, Throwable>;
    get eNTRY_INFO_LOGGER(): BiConsumer<string, Throwable>;
    get eNTRY_WARN_LOGGER(): BiConsumer<string, Throwable>;
    get lOGGER(): Consumer<Entry<any>>;
  }


  class Entry<C = any> {
    get content(): C;
    get e(): Throwable;
    get type(): Type<C>;
    log(var1: BiConsumer<string, Throwable>): void;
  }


  class Mutable {
    constructor(entry: ErrorEntry);
    addError(result: ValidationResult<any>): Mutable;
    addError(other: ErrorEntry): Mutable;
    addError(other: Mutable): Mutable;
    addError<C>(type: Type<C>, builder: UnaryOperator<Builder<C>>): Mutable;
    addError(builder: UnaryOperator<Builder<string>>): Mutable;
    addError(type: Type<string>, error: string, e: Throwable): Mutable;
    static addError$default(mutable: Mutable, type: Type, string: string, throwable: Throwable, n: number, object: any): Mutable;
    get entry$fzzy_config(): ErrorEntry;
    report<T>(value: T, type: Type<string>, error: string, e: Throwable): T;
    static report$default(mutable: Mutable, object: any, type: Type, string: string, throwable: Throwable, n: number, object2: any): any;
    set entry$fzzy_config(errorEntry: ErrorEntry);
  }


  class Type<C = any> {
    constructor(name: string, isString: boolean, isLoggable: boolean, isError: boolean);

    constructor(string: string, bl: boolean, bl2: boolean, bl3: boolean, n: number, defaultConstructorMarker: DefaultConstructorMarker);
    create$fzzy_config(content: C, e: Throwable, msg: string): ErrorEntry;
    static create$fzzy_config$default(type: Type, object: any, throwable: Throwable, string: string, n: number, object2: any): ErrorEntry;
    get name(): string;
    isError(): boolean;
    isLoggable(): boolean;
    isString(): boolean;
    toString(): string;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.util.ValidationResult.ErrorEntry.Companion' {
  class WhenMappings {
    static readonly $EnumSwitchMapping$0: number[];
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.validation.collection' {
  import { ContainerObjectSelectionList } from 'net.minecraft.client.gui.components';
  import { MapEntry } from 'me.fzzyhmstrs.fzzy_config.validation.collection.MapListWidget';
  import { SuggestionWindowListener } from 'me.fzzyhmstrs.fzzy_config.screen';
  import { Map } from 'java.util';
  import { Entry } from 'me.fzzyhmstrs.fzzy_config.entry';
  import { BiFunction } from 'java.util.function';
  import { ChoiceValidator } from 'me.fzzyhmstrs.fzzy_config.validation.misc';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';

  interface MapListWidget<K = any, V = any> extends SuggestionWindowListener, ContainerObjectSelectionList<MapEntry> {}
  class MapListWidget<K = any, V = any> extends SuggestionWindowListener {
    constructor(entryMap: Map<Entry<K, any>, Entry<V, any>>, keySupplier: Entry<K, any>, valueSupplier: Entry<V, any>, entryValidator: BiFunction<MapListWidget<K, V>, MapEntry<K, V>, ChoiceValidator<K>>);
    get map(): Map<K, V>;
    get rowLeft(): number;
    get rowWidth(): number;
    getRawMap(skip: MapEntry<K, V>): Map<K, V>;
    static getRawMap$default(mapListWidget: MapListWidget, mapEntry: MapEntry, n: number, object: any): Map;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, horizontalAmount: number, verticalAmount: number): boolean;
    setSuggestionWindowElement(element: GuiEventListener): void;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.validation.collection.MapListWidget' {
  import { ChoiceValidator } from 'me.fzzyhmstrs.fzzy_config.validation.misc';
  import { Function } from 'java.util.function';
  import { Map } from 'java.util';
  import { ValidationResult } from 'me.fzzyhmstrs.fzzy_config.util';
  import { ValidationType } from 'me.fzzyhmstrs.fzzy_config.entry.EntryValidator';
  import { Entry } from 'ContainerObjectSelectionList';

  interface ExcludeSelfChoiceValidator<K = any, V = any> extends ChoiceValidator<K> {}
  class ExcludeSelfChoiceValidator<K = any, V = any> extends ChoiceValidator<K> {
    constructor(self: MapEntry<K, V>, disallowed: Function<MapEntry<K, V>, Map<K, V>>);
    validateEntry(input: K, type: ValidationType): ValidationResult<K>;
  }


  interface MapEntry<K = any, V = any> extends Entry<MapEntry> {}
  class MapEntry<K = any, V = any> extends Entry<MapEntry> {
    isValid(): boolean;
    setValid(bl: boolean): void;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.validation.minecraft' {
  import { ValidatedField } from 'me.fzzyhmstrs.fzzy_config.validation';
  import { DefaultedRegistry, Registry, Holder } from 'net.minecraft.core';
  import { Predicate, BiPredicate } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { TagKey } from 'net.minecraft.tags';
  import { EntryOpener } from 'me.fzzyhmstrs.fzzy_config.entry';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ValidationResult } from 'me.fzzyhmstrs.fzzy_config.util';
  import { TomlElement } from 'net.peanuuutz.tomlkt';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { ChoiceValidator } from 'me.fzzyhmstrs.fzzy_config.validation.misc';
  import { List } from 'java.util';

  class ValidatedRegistryType {
    static readonly INSTANCE: ValidatedRegistryType;
    static of<T>(registry: DefaultedRegistry<T>): ValidatedField<T>;
    static of<T>(defaultValue: T, registry: Registry<T>): ValidatedField<T>;
    static of<T>(defaultValue: T, registry: Registry<T>, predicate: Predicate<Holder<T>>): ValidatedField<T>;
    static of<T>(defaultValue: T, registry: Registry<T>, predicate: BiPredicate<ResourceLocation, Holder<T>>): ValidatedField<T>;
  }


  interface ValidatedTagKey<T = any> extends EntryOpener, ValidatedField<TagKey> {}
  class ValidatedTagKey<T = any> extends EntryOpener {
    constructor(defaultValue: TagKey<T>, predicate: Predicate<ResourceLocation>);

    constructor(tagKey: TagKey, predicate: Predicate, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(defaultValue: TagKey<T>);
    copyValue(input: TagKey<T>): TagKey<T>;
    deserialize(toml: TomlElement, fieldName: string): ValidationResult<TagKey<T>>;
    instanceEntry(): ValidatedField<TagKey<T>>;
    isValidEntry(input: any): boolean;
    open(args: string[]): void;
    serialize(input: TagKey<T>): ValidationResult<TomlElement>;
    toString(): string;
    widgetEntry(choicePredicate: ChoiceValidator<TagKey<T>>): AbstractWidget;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.validation.misc' {
  import { ValidatedField } from 'me.fzzyhmstrs.fzzy_config.validation';
  import { Boolean, Character, Double } from 'java.lang';
  import { ValidationResult, Expression } from 'me.fzzyhmstrs.fzzy_config.util';
  import { TomlElement } from 'net.peanuuutz.tomlkt';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { Companion, Condition } from 'me.fzzyhmstrs.fzzy_config.validation.misc.ValidatedCondition';
  import { Supplier, BooleanSupplier, Function, Consumer } from 'java.util.function';
  import { Vector, List, Set, Map } from 'java.util';
  import { Flag } from 'me.fzzyhmstrs.fzzy_config.entry.EntryFlag';
  import { Component } from 'net.minecraft.network.chat';
  import { EntryOpener, EntryValidator, Entry } from 'me.fzzyhmstrs.fzzy_config.entry';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ValidationType } from 'me.fzzyhmstrs.fzzy_config.entry.EntryValidator';
  import { UpdateManager } from 'me.fzzyhmstrs.fzzy_config.updates';
  import { Tuple, Companion as me_fzzyhmstrs_fzzy_config_validation_misc_validatedpair_Companion, LayoutStyle } from 'me.fzzyhmstrs.fzzy_config.validation.misc.ValidatedPair';

  interface ValidatedBoolean extends ValidatedField<boolean> {}
  class ValidatedBoolean extends ValidatedField<boolean> {
    constructor(defaultValue: boolean);

    constructor();
    deserialize(toml: TomlElement, fieldName: string): ValidationResult<boolean>;
    instanceEntry(): ValidatedBoolean;
    isValidEntry(input: any): boolean;
    serialize(input: boolean): ValidationResult<TomlElement>;
    toString(): string;
    widgetEntry(choicePredicate: ChoiceValidator<boolean>): AbstractWidget;
  }


  interface ValidatedCondition<T = any> extends ValidatedMapped<T, T> {}
  class ValidatedCondition<T = any> extends ValidatedMapped<T, T> {
    static readonly Companion: Companion;
    constructor(delegate: ValidatedField<T>, fallback: Supplier<T>);
    copyValue(input: T): T;
    get (): T;
    get conditions$fzzy_config(): Vector<Condition>;
    get unconditional(): T;
    hasFlag(flag: Flag): boolean;
    instanceEntry(): ValidatedField<T>;
    isDefault(): boolean;
    open(args: string[]): void;
    restore(): void;
    set conditions$fzzy_config(vector: Vector<Condition>);
    setFlag(flag: Flag): void;
    setFlag$fzzy_config(flag: number): void;
    toCondition(condition: Condition, fallback: Supplier<T>): ValidatedCondition<T>;
    toCondition(condition: ValidatedField<boolean>, fallback: Supplier<T>): ValidatedCondition<T>;
    toCondition(condition: Supplier<boolean>, failMessage: Component, fallback: Supplier<T>): ValidatedCondition<T>;
    toCondition(scope: string, failMessage: Component, fallback: Supplier<T>): ValidatedCondition<T>;
    toString(): string;
    widgetEntry(choicePredicate: ChoiceValidator<T>): AbstractWidget;
    withCondition(condition: Condition): ValidatedCondition<T>;
    withCondition(condition: Supplier<boolean>, failMessage: Component): ValidatedCondition<T>;
    withCondition(failMessage: Component, condition: BooleanSupplier): ValidatedCondition<T>;
    withCondition(condition: ValidatedField<boolean>): ValidatedCondition<T>;
    withCondition(scope: string, failMessage: Component): ValidatedCondition<T>;
    withFailTitle(singleFailText: Component, pluralFailText: Component): ValidatedCondition<T>;
    withFailTitle(singleFailText: Component): ValidatedCondition<T>;
    static withFailTitle$default(validatedCondition: ValidatedCondition, component: Component, component2: Component, n: number, object: any): ValidatedCondition;
  }


  interface ValidatedExpression extends Expression, EntryOpener, ValidatedField<string> {}
  class ValidatedExpression extends Expression {
    constructor(defaultValue: string, validVars: Set<string>, validator: EntryValidator<string>);

    constructor(string: string, set: Set, entryValidator: EntryValidator, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor();

    constructor(defaultValue: string, validVars: Set<string>);

    constructor(defaultValue: string);
    copyValue(input: string): string;
    correctEntry(input: string, type: ValidationType): ValidationResult<string>;
    deserialize(toml: TomlElement, fieldName: string): ValidationResult<string>;
    eval(vars: Map<string, number>): number;
    instanceEntry(): ValidatedExpression;
    isValidEntry(input: any): boolean;
    open(args: string[]): void;
    serialize(input: string): ValidationResult<TomlElement>;
    toString(): string;
    toString(): string;
    validateEntry(input: string, type: ValidationType): ValidationResult<string>;
    validateEntry(input: string, type: ValidationType): ValidationResult<string>;
    widgetEntry(choicePredicate: ChoiceValidator<string>): AbstractWidget;
  }


  interface ValidatedMapped<N = any, T = any> extends EntryOpener, ValidatedField<N> {}
  class ValidatedMapped<N = any, T = any> extends EntryOpener {
    constructor(delegate: ValidatedField<T>, to: Function<T, N>, from: Function<N, T>, defaultValue: N);

    constructor(validatedField: ValidatedField, functionParameter: Function, function2: Function, object: any, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(delegate: ValidatedField<T>, to: Function<T, N>, from: Function<N, T>);
    accept(input: N): void;
    addListener(listener: Consumer<ValidatedField<N>>): void;
    copyValue(input: N): N;
    correctEntry(input: N, type: ValidationType): ValidationResult<N>;
    deserialize(toml: TomlElement, fieldName: string): ValidationResult<N>;
    deserializeEntry(toml: TomlElement, errorBuilder: string[], fieldName: string, flags: number): ValidationResult<N>;
    deserializeEntry(toml: TomlElement, fieldName: string, flags: number): ValidationResult<N>;
    get (): N;
    get entryKey(): string;
    hasFlag(flag: Flag): boolean;
    instanceEntry(): ValidatedField<N>;
    isValidEntry(input: any): boolean;
    listenToEntry(listener: Consumer<Entry<N, any>>): void;
    open(args: string[]): void;
    serialize(input: N): ValidationResult<TomlElement>;
    serializeEntry(input: N, errorBuilder: string[], flags: number): TomlElement;
    serializeEntry(input: N, flags: number): ValidationResult<TomlElement>;
    set entryKey(key: string);
    setFlag(flag: Flag): void;
    setFlag$fzzy_config(flag: number): void;
    setUpdateManager(manager: UpdateManager): void;
    validateEntry(input: N, type: ValidationType): ValidationResult<N>;
    widgetEntry(choicePredicate: ChoiceValidator<N>): AbstractWidget;
  }


  interface ValidatedPair<A = any, B = any> extends ValidatedField<Tuple> {}
  class ValidatedPair<A = any, B = any> extends ValidatedField<Tuple> {
    static readonly Companion: me_fzzyhmstrs_fzzy_config_validation_misc_validatedpair_Companion;
    constructor(defaultValue: Tuple<A, B>, leftHandler: Entry<A, any>, rightHandler: Entry<B, any>, layoutStyle: LayoutStyle);

    constructor(tuple: Tuple, entry: Entry, entry2: Entry, layoutStyle: LayoutStyle, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(defaultValue: Tuple<A, B>, leftHandler: Entry<A, any>, rightHandler: Entry<B, any>);
    copyValue(input: Tuple<A, B>): Tuple<A, B>;
    correctEntry(input: Tuple<A, B>, type: ValidationType): ValidationResult<Tuple<A, B>>;
    deserialize(toml: TomlElement, fieldName: string): ValidationResult<Tuple<A, B>>;
    instanceEntry(): ValidatedPair<A, B>;
    isValidEntry(input: any): boolean;
    static of<A, E extends Entry<A, E>>(handler: Entry<A, E>, defaultValue: Tuple<A, A>, layoutStyle: LayoutStyle): ValidatedPair<A, A>;
    static of<A, E extends Entry<A, E>>(handler: Entry<A, E>, defaultValue: Tuple<A, A>): ValidatedPair<A, A>;
    static of<A, E extends Entry<A, E>>(handler: Entry<A, E>): ValidatedPair<A, A>;
    onLeftChanged(left: Entry<A, any>): void;
    onRightChanged(right: Entry<B, any>): void;
    serialize(input: Tuple<A, B>): ValidationResult<TomlElement>;
    toString(): string;
    validateEntry(input: Tuple<A, B>, type: ValidationType): ValidationResult<Tuple<A, B>>;
    widgetEntry(choicePredicate: ChoiceValidator<Tuple<A, B>>): AbstractWidget;
    static withLabels<F extends ValidatedPair<any, any>>($this$withLabels: F, leftLabel: Component, rightLabel: Component): F;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.validation.misc.ValidatedCondition' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Supplier } from 'java.util.function';
  import { Boolean } from 'java.lang';
  import { Component } from 'net.minecraft.network.chat';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
  }


  interface Condition extends Supplier<boolean> {}
  class Condition extends Supplier<boolean> {
    failMessage(): Component;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.validation.misc.ValidatedPair' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ValidatedPair } from 'me.fzzyhmstrs.fzzy_config.validation.misc';
  import { Entry } from 'me.fzzyhmstrs.fzzy_config.entry';
  import { Component } from 'net.minecraft.network.chat';
  import { Enum, Boolean } from 'java.lang';
  import { EnumEntries } from 'kotlin.enums';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    of<A, E extends Entry<A, E>>(handler: Entry<A, E>, defaultValue: Tuple<A, A>, layoutStyle: LayoutStyle): ValidatedPair<A, A>;
    of<A, E extends Entry<A, E>>(handler: Entry<A, E>, defaultValue: Tuple<A, A>): ValidatedPair<A, A>;
    of<A, E extends Entry<A, E>>(handler: Entry<A, E>): ValidatedPair<A, A>;
    static of$default(companion: Companion, entry: Entry, tuple: Tuple, layoutStyle: LayoutStyle, n: number, object: any): ValidatedPair;
    withLabels<F extends ValidatedPair<any, any>>($this$withLabels: F, leftLabel: Component, rightLabel: Component): F;
  }


  interface LayoutStyle extends Enum<LayoutStyle> {}
  class LayoutStyle extends Enum<LayoutStyle> {
    static readonly SIDE_BY_SIDE: LayoutStyle;
    static readonly STACKED: LayoutStyle;
    static get entries(): EnumEntries<LayoutStyle>;
    static valueOf(value: string): LayoutStyle;
    static values(): LayoutStyle[];
  }


  class Tuple<X = any, Y = any> {
    constructor(left: X, right: Y);
    component1(): X;
    component2(): Y;
    copy(left: X, right: Y): Tuple<X, Y>;
    static copy$default(tuple: Tuple, object: any, object2: any, n: number, object3: any): Tuple;
    equals(other: any): boolean;
    get left(): X;
    get right(): Y;
    hashCode(): number;
    lastSide(): boolean;
    toString(): string;
    withLeft(newLeft: X): Tuple<X, Y>;
    withRight(newRight: Y): Tuple<X, Y>;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.validation.number' {
  import { Byte, Double, Float, Integer, Long, Short } from 'java.lang';
  import { WidgetType } from 'ValidatedNumber';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ValidationResult } from 'me.fzzyhmstrs.fzzy_config.util';
  import { TomlElement } from 'net.peanuuutz.tomlkt';
  import { IntRange, LongRange } from 'kotlin.ranges';

  interface ValidatedByte extends ValidatedNumber<number> {}
  class ValidatedByte extends ValidatedNumber<number> {
    constructor(defaultValue: number, maxValue: number, minValue: number, widgetType: WidgetType);

    constructor(by: number, by2: number, by3: number, widgetType: WidgetType, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(minValue: number, maxValue: number, widgetType: WidgetType);

    constructor(by: number, by2: number, widgetType: WidgetType, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(defaultValue: number);

    constructor();

    constructor(defaultValue: number, maxValue: number, minValue: number);

    constructor(minValue: number, maxValue: number);
    deserialize(toml: TomlElement, fieldName: string): ValidationResult<number>;
    instanceEntry(): ValidatedByte;
    isValidEntry(input: any): boolean;
    serialize(input: number): ValidationResult<TomlElement>;
    toString(): string;
  }


  interface ValidatedDouble extends ValidatedNumber<number> {}
  class ValidatedDouble extends ValidatedNumber<number> {
    constructor(defaultValue: number, maxValue: number, minValue: number, widgetType: WidgetType);

    constructor(d: number, d2: number, d3: number, widgetType: WidgetType, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(minValue: number, maxValue: number, widgetType: WidgetType);

    constructor(d: number, d2: number, widgetType: WidgetType, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(defaultValue: number);

    constructor();

    constructor(defaultValue: number, maxValue: number, minValue: number);

    constructor(minValue: number, maxValue: number);
    deserialize(toml: TomlElement, fieldName: string): ValidationResult<number>;
    instanceEntry(): ValidatedDouble;
    isValidEntry(input: any): boolean;
    serialize(input: number): ValidationResult<TomlElement>;
    toString(): string;
  }


  interface ValidatedFloat extends ValidatedNumber<number> {}
  class ValidatedFloat extends ValidatedNumber<number> {
    constructor(defaultValue: number, maxValue: number, minValue: number, widgetType: WidgetType);

    constructor(f: number, f2: number, f3: number, widgetType: WidgetType, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(minValue: number, maxValue: number, widgetType: WidgetType);

    constructor(f: number, f2: number, widgetType: WidgetType, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(defaultValue: number);

    constructor();

    constructor(defaultValue: number, maxValue: number, minValue: number);

    constructor(minValue: number, maxValue: number);
    deserialize(toml: TomlElement, fieldName: string): ValidationResult<number>;
    instanceEntry(): ValidatedFloat;
    isValidEntry(input: any): boolean;
    serialize(input: number): ValidationResult<TomlElement>;
    toString(): string;
  }


  interface ValidatedInt extends ValidatedNumber<number> {}
  class ValidatedInt extends ValidatedNumber<number> {
    constructor(defaultValue: number, maxValue: number, minValue: number, widgetType: WidgetType);

    constructor(n: number, n2: number, n3: number, widgetType: WidgetType, n4: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(defaultValue: number, range: IntRange, widgetType: WidgetType);

    constructor(n: number, intRange: IntRange, widgetType: WidgetType, n2: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(range: IntRange, widgetType: WidgetType);

    constructor(intRange: IntRange, widgetType: WidgetType, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(minValue: number, maxValue: number, widgetType: WidgetType);

    constructor(n: number, n2: number, widgetType: WidgetType, n3: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(defaultValue: number);

    constructor();

    constructor(defaultValue: number, maxValue: number, minValue: number);

    constructor(defaultValue: number, range: IntRange);

    constructor(range: IntRange);

    constructor(minValue: number, maxValue: number);
    deserialize(toml: TomlElement, fieldName: string): ValidationResult<number>;
    instanceEntry(): ValidatedInt;
    isValidEntry(input: any): boolean;
    serialize(input: number): ValidationResult<TomlElement>;
    toString(): string;
  }


  interface ValidatedLong extends ValidatedNumber<Long> {}
  class ValidatedLong extends ValidatedNumber<Long> {
    constructor(defaultValue: number, maxValue: number, minValue: number, widgetType: WidgetType);

    constructor(l: number, l2: number, l3: number, widgetType: WidgetType, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(defaultValue: number, range: LongRange, widgetType: WidgetType);

    constructor(l: number, longRange: LongRange, widgetType: WidgetType, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(range: LongRange, widgetType: WidgetType);

    constructor(longRange: LongRange, widgetType: WidgetType, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(minValue: number, maxValue: number, widgetType: WidgetType);

    constructor(l: number, l2: number, widgetType: WidgetType, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(defaultValue: number);

    constructor();

    constructor(defaultValue: number, maxValue: number, minValue: number);

    constructor(defaultValue: number, range: LongRange);

    constructor(range: LongRange);

    constructor(minValue: number, maxValue: number);
    deserialize(toml: TomlElement, fieldName: string): ValidationResult<Long>;
    instanceEntry(): ValidatedLong;
    isValidEntry(input: any): boolean;
    serialize(input: number): ValidationResult<TomlElement>;
    toString(): string;
  }


  interface ValidatedShort extends ValidatedNumber<number> {}
  class ValidatedShort extends ValidatedNumber<number> {
    constructor(defaultValue: number, maxValue: number, minValue: number, widgetType: WidgetType);

    constructor(s: number, s2: number, s3: number, widgetType: WidgetType, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(minValue: number, maxValue: number, widgetType: WidgetType);

    constructor(s: number, s2: number, widgetType: WidgetType, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(defaultValue: number);

    constructor();

    constructor(defaultValue: number, maxValue: number, minValue: number);

    constructor(minValue: number, maxValue: number);
    deserialize(toml: TomlElement, fieldName: string): ValidationResult<number>;
    instanceEntry(): ValidatedShort;
    isValidEntry(input: any): boolean;
    serialize(input: number): ValidationResult<TomlElement>;
    toString(): string;
  }

}

declare module 'me.fzzyhmstrs.fzzy_config.validation' {
  import { ValidatedEnum, ValidatedColor } from 'me.fzzyhmstrs.fzzy_config.validation.misc';
  import { Enum, Class, Number } from 'java.lang';
  import { ValidatedIdentifier, ValidatedTagKey } from 'me.fzzyhmstrs.fzzy_config.validation.minecraft';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Color } from 'java.awt';
  import { ValidatedList, ValidatedSet } from 'me.fzzyhmstrs.fzzy_config.validation.collection';
  import { List, Set, Map } from 'java.util';
  import { Entry } from 'me.fzzyhmstrs.fzzy_config.entry';
  import { TagKey } from 'net.minecraft.tags';
  import { Registry, Holder } from 'net.minecraft.core';
  import { BiPredicate } from 'java.util.function';

  class Shorthand {
    static readonly INSTANCE: Shorthand;
    get shorthandValidationMap(): Map<Class<any>, ValidatedField<any>>;
    static validated<E extends Enum<E>>($this$validated: E): ValidatedEnum<E>;
    static validated<E extends Enum<any>>($this$validated: Class<E>): ValidatedEnum<E>;
    static validated($this$validated: ResourceLocation): ValidatedIdentifier;
    static validated($this$validated: Color, transparent: boolean): ValidatedColor;
    static validated<T>($this$validated: T[], handler: Entry<T, any>): ValidatedList<T>;
    static validated<T>($this$validated: Set<T>, handler: Entry<T, any>): ValidatedSet<T>;
    static validated<T extends Number>($this$validated: T[]): ValidatedList<T>;
    static validated<T extends Number>($this$validated: Set<T>): ValidatedSet<T>;
    static validated<T>($this$validated: TagKey<T>): ValidatedTagKey<T>;
    static validated$default(color: Color, bl: boolean, n: number, object: any): ValidatedColor;
    static validatedColor($this$validatedColor: number, transparent: boolean): ValidatedColor;
    static validatedColor$default(n: number, bl: boolean, n2: number, object: any): ValidatedColor;
    static validatedIds($this$validatedIds: TagKey<any>): ValidatedIdentifier;
    static validatedIds($this$validatedIds: Registry<any>): ValidatedIdentifier;
    static validatedIds<T>($this$validatedIds: Registry<T>, predicate: BiPredicate<ResourceLocation, Holder<T>>): ValidatedIdentifier;
    static validatedIds($this$validatedIds: ResourceLocation[]): ValidatedIdentifier;
    static validatedList($this$validatedList: ResourceLocation[], list: ResourceLocation[]): ValidatedList<ResourceLocation>;
    static validatedList($this$validatedList: Set<ResourceLocation>, list: ResourceLocation[]): ValidatedSet<ResourceLocation>;
    static validatedRegistry<T>($this$validatedRegistry: ResourceLocation[], registry: Registry<T>): ValidatedList<ResourceLocation>;
    static validatedRegistry<T>($this$validatedRegistry: ResourceLocation[], registry: Registry<T>, predicate: BiPredicate<ResourceLocation, Holder<T>>): ValidatedList<ResourceLocation>;
    static validatedRegistry<T>($this$validatedRegistry: Set<ResourceLocation>, registry: Registry<T>): ValidatedSet<ResourceLocation>;
    static validatedRegistry<T>($this$validatedRegistry: Set<ResourceLocation>, registry: Registry<T>, predicate: BiPredicate<ResourceLocation, Holder<T>>): ValidatedSet<ResourceLocation>;
    static validatedTag($this$validatedTag: ResourceLocation[], tagKey: TagKey<any>): ValidatedList<ResourceLocation>;
    static validatedTag($this$validatedTag: Set<ResourceLocation>, tagKey: TagKey<any>): ValidatedSet<ResourceLocation>;
  }

}