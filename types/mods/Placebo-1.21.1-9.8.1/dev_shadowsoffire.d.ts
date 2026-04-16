declare module 'dev.shadowsoffire.placebo.block_entity' {
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockEntityType, BlockEntityTicker, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockEntitySupplier } from 'BlockEntityType';
  import { Set } from 'java.util';
  import { Block, EntityBlock } from 'net.minecraft.world.level.block';
  import { TickSide } from 'dev.shadowsoffire.placebo.block_entity.TickingBlockEntityType';

  class TickingBlockEntity {
    clientTick(level: Level, pos: BlockPos, state: BlockState): void;
    serverTick(level: Level, pos: BlockPos, state: BlockState): void;
  }


  interface TickingBlockEntityType<T extends BlockEntity = any> extends BlockEntityType<T> {}
  class TickingBlockEntityType<T extends BlockEntity = any> extends BlockEntityType<T> {
    constructor(pFactory: BlockEntitySupplier<T>, pValidBlocks: Set<Block>, side: TickSide);
    getTicker(client: boolean): BlockEntityTicker<T>;
  }


  interface TickingEntityBlock extends EntityBlock {}
  class TickingEntityBlock extends EntityBlock {
    getTicker<T extends BlockEntity>(pLevel: Level, pState: BlockState, type: BlockEntityType<T>): BlockEntityTicker<T>;
  }

}

declare module 'dev.shadowsoffire.placebo.block_entity.TickingBlockEntityType' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface TickSide extends Enum<TickSide> {}
  class TickSide extends Enum<TickSide> {
    static readonly CLIENT: TickSide;
    static readonly SERVER: TickSide;
    static readonly CLIENT_AND_SERVER: TickSide;
    ticksOnClient(): boolean;
    ticksOnServer(): boolean;
    static valueOf(name: string): TickSide;
    static values(): TickSide[];
  }

}

declare module 'dev.shadowsoffire.placebo.cap' {
  import { ItemStackHandler } from 'net.neoforged.neoforge.items';
  import { ItemStack } from 'net.minecraft.world.item';
  import { EnergyStorage } from 'net.neoforged.neoforge.energy';

  interface InternalItemHandler extends ItemStackHandler {}
  class InternalItemHandler extends ItemStackHandler {
    constructor(size: number);
    extractItemInternal(slot: number, amount: number, simulate: boolean): ItemStack;
    insertItemInternal(slot: number, stack: ItemStack, simulate: boolean): ItemStack;
  }


  interface ModifiableEnergyStorage extends EnergyStorage {}
  class ModifiableEnergyStorage extends EnergyStorage {
    constructor(capacity: number);

    constructor(capacity: number, maxTransfer: number);

    constructor(capacity: number, maxReceive: number, maxExtract: number);

    constructor(capacity: number, maxReceive: number, maxExtract: number, energy: number);
    setCapacity(capacity: number): void;
    setEnergy(energy: number): void;
    setMaxExtract(extract: number): void;
    setMaxReceive(receive: number): void;
    setTransferRate(transfer: number): void;
  }

}

declare module 'dev.shadowsoffire.placebo.codec' {
  import { Codec, DataResult, DynamicOps } from 'com.mojang.serialization';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Pair } from 'com.mojang.datafixers.util';
  import { BiMap } from 'com.google.common.collect';
  import { Supplier, Function } from 'java.util.function';
  import { Set, List } from 'java.util';
  import { Class, Enum } from 'java.lang';

  interface CodecMap<V extends CodecProvider<V> = any> extends Codec<V> {}
  class CodecMap<V extends CodecProvider<V> = any> extends Codec<V> {
    constructor(name: string);
    containsKey(key: ResourceLocation): boolean;
    decode<T>(ops: DynamicOps<T>, input: T): DataResult<Pair<V, T>>;
    encode<T>(input: V, ops: DynamicOps<T>, prefix: T): DataResult<T>;
    get defaultCodec(): Codec<V>;
    getKey(codec: Codec<any>): ResourceLocation;
    getValue(key: ResourceLocation): Codec<V>;
    isEmpty(): boolean;
    register(key: ResourceLocation, codec: Codec<V>): void;
    set defaultCodec(codec: Codec<V>);
  }


  class CodecProvider<R = any> {
    get codec(): Codec<R>;
  }


  interface MapBackedCodec<V extends CodecProvider<V> = any> extends Codec<V> {}
  class MapBackedCodec<V extends CodecProvider<V> = any> extends Codec<V> {
    constructor(name: string, registry: BiMap<ResourceLocation, Codec<V>>, defaultCodec: Supplier<Codec<V>>);

    constructor(name: string, registry: BiMap<ResourceLocation, Codec<V>>);
    decode<T>(ops: DynamicOps<T>, input: T): DataResult<Pair<V, T>>;
    encode<T>(input: V, ops: DynamicOps<T>, prefix: T): DataResult<T>;
  }


  class PlaceboCodecs {
    static enumCodec<E extends Enum<E>>(clazz: Class<E>): Codec<E>;
    static mapBacked<T extends CodecProvider<T>>(name: string, reg: BiMap<ResourceLocation, Codec<T>>): Codec<T>;
    static mapBackedDefaulted<T extends CodecProvider<T>>(name: string, reg: BiMap<ResourceLocation, Codec<T>>, defaultCodec: Codec<T>): Codec<T>;
    static setFromList<T>(listCodec: Codec<T[]>): Codec<Set<T>>;
    static setOf<T>(elementCodec: Codec<T>): Codec<Set<T>>;
    static stringResolverCodec<E>(to: Function<E, string>, from: Function<string, E>): Codec<E>;
  }

}

declare module 'dev.shadowsoffire.placebo.color' {
  import { TextColor } from 'net.minecraft.network.chat';

  interface GradientColor extends TextColor {}
  class GradientColor extends TextColor {
    static readonly RAINBOW_GRADIENT: number[];
    static readonly RAINBOW: GradientColor;
    constructor(gradient: number[], id: string, speed: number);

    constructor(gradient: number[], id: string);
    get value(): number;
  }

}

declare module 'dev.shadowsoffire.placebo.commands' {
  import { LiteralArgumentBuilder } from 'com.mojang.brigadier.builder';
  import { CommandSourceStack, CommandBuildContext } from 'net.minecraft.commands';
  import { DynamicCommandExceptionType } from 'com.mojang.brigadier.exceptions';
  import { ItemStack } from 'net.minecraft.world.item';
  import { RegistryOps } from 'net.minecraft.resources';
  import { JsonElement } from 'com.google.gson';
  import { CommandDispatcher } from 'com.mojang.brigadier';

  class GetDimensionTypeCommand {
    static register(builder: LiteralArgumentBuilder<CommandSourceStack>): void;
  }


  class HandToJsonCommand {
    static readonly NOT_FOUND: DynamicCommandExceptionType;
    static register(builder: LiteralArgumentBuilder<CommandSourceStack>): void;
    static toJsonStr(stack: ItemStack, ops: RegistryOps<JsonElement>): string;
  }


  class PlaceboCommand {
    static register(pDispatcher: CommandDispatcher<CommandSourceStack>, ctx: CommandBuildContext): void;
  }


  class SerializeLootTableCommand {
    static readonly NOT_FOUND: DynamicCommandExceptionType;
    static register(builder: LiteralArgumentBuilder<CommandSourceStack>): void;
  }

}

declare module 'dev.shadowsoffire.placebo.config' {
  import { Map, List, Set, Collection } from 'java.util';
  import { CharMatcher } from 'com.google.common.base';
  import { BufferedWriter, File } from 'java.io';
  import { Entry } from 'Map';
  import { Pattern } from 'java.util.regex';
  import { Enum } from 'java.lang';
  import { Type } from 'dev.shadowsoffire.placebo.config.Property';

  interface ConfigCategory extends Map<string, Property> {}
  class ConfigCategory extends Map<string, Property> {
    static readonly COMMENT_SEPARATOR: string;
    static readonly NEW_LINE: string;
    static readonly ALLOWED_CHARS: string;
    static readonly allowedProperties: CharMatcher;
    readonly parent: ConfigCategory;
    constructor(name: string);

    constructor(name: string, parent: ConfigCategory);
    clear(): void;
    containsKey(key: string): boolean;
    containsKey(key: any): boolean;
    containsValue(value: any): boolean;
    entrySet(): Set<Entry<string, Property>>;
    equals(obj: any): boolean;
    get(key: string): Property;
    get(key: any): Property;
    get children(): Set<ConfigCategory>;
    get comment(): string;
    get firstParent(): ConfigCategory;
    get languagekey(): string;
    get name(): string;
    get orderedValues(): Property[];
    get propertyOrder(): string[];
    get qualifiedName(): string;
    static getQualifiedName(name: string, parent: ConfigCategory): string;
    getValues(): Map<string, Property>;
    hasChanged(): boolean;
    isChild(): boolean;
    isEmpty(): boolean;
    keySet(): Set<string>;
    put(key: string, value: Property): Property;
    putAll(m: Map<string, Property>): void;
    remove(key: any): Property;
    removeChild(child: ConfigCategory): void;
    requiresMcRestart(): boolean;
    requiresWorldRestart(): boolean;
    set comment(comment: string);
    set propertyOrder(propertyOrder: string[]);
    setLanguageKey(languagekey: string): ConfigCategory;
    setRequiresMcRestart(requiresMcRestart: boolean): ConfigCategory;
    setRequiresWorldRestart(requiresWorldRestart: boolean): ConfigCategory;
    setShowInGui(showInGui: boolean): ConfigCategory;
    showInGui(): boolean;
    size(): number;
    values(): Collection<Property>;
    write(out: BufferedWriter, indent: number): void;
  }


  interface ConfigElement extends IConfigElement {}
  class ConfigElement extends IConfigElement {
    constructor(category: ConfigCategory);

    constructor(prop: Property);
    get (): any;
    get childElements(): IConfigElement[];
    get comment(): string;
    get default(): any;
    get defaults(): any[];
    get languageKey(): string;
    get list(): any[];
    get maxListLength(): number;
    get maxValue(): any;
    get minValue(): any;
    get name(): string;
    get qualifiedName(): string;
    get type(): ConfigGuiType;
    get validValues(): string[];
    get validValuesDisplay(): string[];
    get validationPattern(): Pattern;
    static getType(prop: Property): ConfigGuiType;
    hasSlidingControl(): boolean;
    isDefault(): boolean;
    isList(): boolean;
    isListLengthFixed(): boolean;
    isProperty(): boolean;
    listCategoriesFirst(categoriesFirst: boolean): ConfigElement;
    requiresMcRestart(): boolean;
    requiresWorldRestart(): boolean;
    set(aVal: any[]): void;
    set (value: any);
    setToDefault(): void;
    showInGui(): boolean;
  }


  class ConfigFlags {
  }


  interface ConfigGuiType extends Enum<ConfigGuiType> {}
  class ConfigGuiType extends Enum<ConfigGuiType> {
    static readonly STRING: ConfigGuiType;
    static readonly INTEGER: ConfigGuiType;
    static readonly BOOLEAN: ConfigGuiType;
    static readonly DOUBLE: ConfigGuiType;
    static readonly COLOR: ConfigGuiType;
    static readonly MOD_ID: ConfigGuiType;
    static readonly CONFIG_CATEGORY: ConfigGuiType;
    static valueOf(name: string): ConfigGuiType;
    static values(): ConfigGuiType[];
  }


  class Configuration {
    static readonly CATEGORY_GENERAL: string;
    static readonly CATEGORY_CLIENT: string;
    static readonly ALLOWED_CHARS: string;
    static readonly DEFAULT_ENCODING: string;
    static readonly CATEGORY_SPLITTER: string;
    static readonly allowedProperties: CharMatcher;
    defaultEncoding: string;
    isChild: boolean;
    constructor(file: File);

    constructor(modid: string);
    copyCategoryProps(fromConfig: Configuration, ctgys: string[]): void;
    get(category: string, key: string, defaultValue: boolean): Property;
    get(category: string, key: string, defaultValue: boolean, comment: string): Property;
    get(category: string, key: string, defaultValues: boolean[]): Property;
    get(category: string, key: string, defaultValues: boolean[], comment: string): Property;
    get(category: string, key: string, defaultValues: boolean[], comment: string, isListLengthFixed: boolean, maxListLength: number): Property;
    get(category: string, key: string, defaultValue: number): Property;
    get(category: string, key: string, defaultValue: number, comment: string): Property;
    get(category: string, key: string, defaultValue: number, comment: string, minValue: number, maxValue: number): Property;
    get(category: string, key: string, defaultValues: number[]): Property;
    get(category: string, key: string, defaultValues: number[], comment: string): Property;
    get(category: string, key: string, defaultValues: number[], comment: string, minValue: number, maxValue: number): Property;
    get(category: string, key: string, defaultValues: number[], comment: string, minValue: number, maxValue: number, isListLengthFixed: boolean, maxListLength: number): Property;
    get(category: string, key: string, defaultValue: number): Property;
    get(category: string, key: string, defaultValue: number, comment: string): Property;
    get(category: string, key: string, defaultValue: number, comment: string, minValue: number, maxValue: number): Property;
    get(category: string, key: string, defaultValues: number[]): Property;
    get(category: string, key: string, defaultValues: number[], comment: string): Property;
    get(category: string, key: string, defaultValues: number[], comment: string, minValue: number, maxValue: number): Property;
    get(category: string, key: string, defaultValues: number[], comment: string, minValue: number, maxValue: number, isListLengthFixed: boolean, maxListLength: number): Property;
    get(category: string, key: string, defaultValue: string): Property;
    get(category: string, key: string, defaultValue: string, comment: string): Property;
    get(category: string, key: string, defaultValue: string, comment: string, validationPattern: Pattern): Property;
    get(category: string, key: string, defaultValue: string, comment: string, validValues: string[]): Property;
    get(category: string, key: string, defaultValues: string[]): Property;
    get(category: string, key: string, defaultValues: string[], comment: string): Property;
    get(category: string, key: string, defaultValues: string[], comment: string, validationPattern: Pattern): Property;
    get(category: string, key: string, defaultValues: string[], comment: string, isListLengthFixed: boolean, maxListLength: number, validationPattern: Pattern): Property;
    get(category: string, key: string, defaultValue: string, comment: string, type: Type): Property;
    get(category: string, key: string, defaultValues: string[], comment: string, type: Type): Property;
    get categoryNames(): Set<string>;
    get configFile(): File;
    getBoolean(name: string, category: string, defaultValue: boolean, comment: string): boolean;
    getBoolean(name: string, category: string, defaultValue: boolean, comment: string, langKey: string): boolean;
    getCategory(category: string): ConfigCategory;
    getFloat(name: string, category: string, defaultValue: number, minValue: number, maxValue: number, comment: string): number;
    getFloat(name: string, category: string, defaultValue: number, minValue: number, maxValue: number, comment: string, langKey: string): number;
    getInt(name: string, category: string, defaultValue: number, minValue: number, maxValue: number, comment: string): number;
    getInt(name: string, category: string, defaultValue: number, minValue: number, maxValue: number, comment: string, langKey: string): number;
    getString(name: string, category: string, defaultValue: string, comment: string): string;
    getString(name: string, category: string, defaultValue: string, comment: string, langKey: string): string;
    getString(name: string, category: string, defaultValue: string, comment: string, pattern: Pattern): string;
    getString(name: string, category: string, defaultValue: string, comment: string, langKey: string, pattern: Pattern): string;
    getString(name: string, category: string, defaultValue: string, comment: string, validValues: string[]): string;
    getString(name: string, category: string, defaultValue: string, comment: string, validValues: string[], langKey: string): string;
    getStringList(name: string, category: string, defaultValues: string[], comment: string): string[];
    getStringList(name: string, category: string, defaultValue: string[], comment: string, validValues: string[]): string[];
    getStringList(name: string, category: string, defaultValue: string[], comment: string, validValues: string[], langKey: string): string[];
    hasCategory(category: string): boolean;
    hasChanged(): boolean;
    hasKey(category: string, key: string): boolean;
    load(): void;
    moveProperty(oldCategory: string, propName: string, newCategory: string): boolean;
    removeCategory(category: ConfigCategory): void;
    renameProperty(category: string, oldPropName: string, newPropName: string): boolean;
    save(): void;
    setCategoryComment(category: string, comment: string): Configuration;
    setCategoryLanguageKey(category: string, langKey: string): Configuration;
    setCategoryPropertyOrder(category: string, propOrder: string[]): Configuration;
    setCategoryRequiresMcRestart(category: string, requiresMcRestart: boolean): Configuration;
    setCategoryRequiresWorldRestart(category: string, requiresWorldRestart: boolean): Configuration;
    setComment(comment: string): void;
    setTitle(title: string): void;
    toString(): string;
    static writeComment(writer: BufferedWriter, comment: string): void;
  }


  class IConfigElement {
    get (): any;
    get childElements(): IConfigElement[];
    get comment(): string;
    get default(): any;
    get defaults(): any[];
    get languageKey(): string;
    get list(): any[];
    get maxListLength(): number;
    get maxValue(): any;
    get minValue(): any;
    get name(): string;
    get qualifiedName(): string;
    get type(): ConfigGuiType;
    get validValues(): string[];
    get validValuesDisplay(): string[];
    get validationPattern(): Pattern;
    hasSlidingControl(): boolean;
    isDefault(): boolean;
    isList(): boolean;
    isListLengthFixed(): boolean;
    isProperty(): boolean;
    requiresMcRestart(): boolean;
    requiresWorldRestart(): boolean;
    set(var1: any[]): void;
    set (var1: any);
    setToDefault(): void;
    showInGui(): boolean;
  }


  class Property {
    constructor(name: string, value: string, type: Type);

    constructor(name: string, value: string, type: Type, read: boolean);

    constructor(name: string, value: string, type: Type, validValues: string[]);

    constructor(name: string, value: string, type: Type, langKey: string);

    constructor(name: string, value: string, type: Type, read: boolean, langKey: string);

    constructor(name: string, value: string, type: Type, validValues: string[], langKey: string);

    constructor(name: string, values: string[], type: Type);

    constructor(name: string, values: string[], type: Type, langKey: string);
    get boolean(): boolean;
    get booleanList(): boolean[];
    get comment(): string;
    get default(): string;
    get defaults(): string[];
    get double(): number;
    get doubleList(): number[];
    get int(): number;
    get intList(): number[];
    get languageKey(): string;
    get long(): number;
    get maxListLength(): number;
    get maxValue(): string;
    get minValue(): string;
    get name(): string;
    get string(): string;
    get stringList(): string[];
    get type(): Type;
    get validValues(): string[];
    get validationPattern(): Pattern;
    getBoolean(_default: boolean): boolean;
    getDouble(_default: number): number;
    getInt(_default: number): number;
    getLong(_default: number): number;
    hasChanged(): boolean;
    isBooleanList(): boolean;
    isBooleanValue(): boolean;
    isDefault(): boolean;
    isDoubleList(): boolean;
    isDoubleValue(): boolean;
    isIntList(): boolean;
    isIntValue(): boolean;
    isList(): boolean;
    isListLengthFixed(): boolean;
    isLongValue(): boolean;
    requiresMcRestart(): boolean;
    requiresWorldRestart(): boolean;
    set(value: string): void;
    set(values: string[]): void;
    set(values: boolean[]): void;
    set(values: number[]): void;
    set(values: number[]): void;
    set(value: number): void;
    set(value: number): void;
    set(value: boolean): void;
    set(value: number): void;
    set comment(comment: string);
    set languageKey(langKey: string);
    set maxListLength(max: number);
    set maxValue(maxValue: number);
    set minValue(minValue: number);
    set name(name: string);
    set validValues(validValues: string[]);
    set validationPattern(validationPattern: Pattern);
    setDefaultValue(defaultValue: string): Property;
    setDefaultValue(defaultValue: number): Property;
    setDefaultValue(defaultValue: number): Property;
    setDefaultValue(defaultValue: boolean): Property;
    setDefaultValues(defaultValues: string[]): Property;
    setDefaultValues(defaultValues: number[]): Property;
    setDefaultValues(defaultValues: number[]): Property;
    setDefaultValues(defaultValues: boolean[]): Property;
    setIsListLengthFixed(isListLengthFixed: boolean): Property;
    setMaxValue(maxValue: number): Property;
    setMinValue(minValue: number): Property;
    setRequiresMcRestart(requiresMcRestart: boolean): Property;
    setRequiresWorldRestart(requiresWorldRestart: boolean): Property;
    setShowInGui(showInGui: boolean): Property;
    setToDefault(): Property;
    setValue(value: string): Property;
    setValue(value: number): Property;
    setValue(value: boolean): Property;
    setValue(value: number): Property;
    setValues(values: string[]): Property;
    setValues(values: boolean[]): Property;
    setValues(values: number[]): Property;
    setValues(values: number[]): Property;
    showInGui(): boolean;
    wasRead(): boolean;
  }

}

declare module 'dev.shadowsoffire.placebo.config.ConfigFlags' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Loadability extends Enum<Loadability> {}
  class Loadability extends Enum<Loadability> {
    static readonly LOCKED: Loadability;
    static readonly RELOADABLE: Loadability;
    static readonly RESTARTABLE: Loadability;
    get name(): string;
    static valueOf(name: string): Loadability;
    static values(): Loadability[];
  }


  interface Type extends Enum<Type> {}
  class Type extends Enum<Type> {
    static readonly COMMON: Type;
    static readonly SYNCED: Type;
    static readonly SERVER: Type;
    static readonly CLIENT: Type;
    get name(): string;
    static valueOf(name: string): Type;
    static values(): Type[];
  }

}

declare module 'dev.shadowsoffire.placebo.config.Configuration' {
  import { Reader, InputStream } from 'java.io';

  interface UnicodeInputStreamReader extends Reader {}
  class UnicodeInputStreamReader extends Reader {
    constructor(source: InputStream, encoding: string);
    close(): void;
    get encoding(): string;
    read(cbuf: string[], off: number, len: number): number;
  }

}

declare module 'dev.shadowsoffire.placebo.config.Property' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Type extends Enum<Type> {}
  class Type extends Enum<Type> {
    static readonly STRING: Type;
    static readonly INTEGER: Type;
    static readonly BOOLEAN: Type;
    static readonly DOUBLE: Type;
    static readonly COLOR: Type;
    static readonly MOD_ID: Type;
    get iD(): string;
    static tryParse(id: string): Type;
    static valueOf(name: string): Type;
    static values(): Type[];
  }

}

declare module 'dev.shadowsoffire.placebo.datagen' {
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { Registry, Holder } from 'net.minecraft.core';
  import { RegistryBootstrap } from 'RegistrySetBuilder';
  import { List, Map } from 'java.util';
  import { ICondition } from 'net.neoforged.neoforge.common.conditions';
  import { DataProviderFactory } from 'dev.shadowsoffire.placebo.datagen.DataGenBuilder';
  import { DataProvider, PackOutput } from 'net.minecraft.data';
  import { BiFunction } from 'java.util.function';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';
  import { ExistingFileHelper } from 'net.neoforged.neoforge.common.data';
  import { Factory } from 'DataProvider';
  import { GatherDataEvent } from 'net.neoforged.neoforge.data.event';
  import { RecipeProvider } from 'net.minecraft.data.recipes';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { Potion } from 'net.minecraft.world.item.alchemy';

  class DataGenBuilder {
    build(event: GatherDataEvent): void;
    conditions(key: ResourceKey<any>, conditions: ICondition[]): DataGenBuilder;
    conditions(key: ResourceKey<any>, ...conditions: ICondition[]): DataGenBuilder;
    conditions(conditions: Map<ResourceKey<any>, ICondition[]>): DataGenBuilder;
    static create(...modids: string[]): DataGenBuilder;
    provider<T extends DataProvider>(factory: DataProviderFactory<T>): DataGenBuilder;
    provider<T extends DataProvider>(factory: BiFunction<PackOutput, CompletableFuture<Provider>, T>, output: PackOutput, registries: CompletableFuture<Provider>, fileHelper: ExistingFileHelper): DataGenBuilder;
    provider<T extends DataProvider>(factory: Factory<T>, output: PackOutput, registries: CompletableFuture<Provider>, fileHelper: ExistingFileHelper): DataGenBuilder;
    registry<R>(key: ResourceKey<Registry<R>>, bootstrap: RegistryBootstrap<R>): DataGenBuilder;
  }


  interface LegacyRecipeProvider extends RecipeProvider {}
  class LegacyRecipeProvider extends RecipeProvider {
    constructor(output: PackOutput, registries: CompletableFuture<Provider>, modid: string);
    addShaped(key: ResourceLocation, group: string, output: any, width: number, height: number, ...input: any[]): void;
    addShaped(key: ResourceLocation, output: any, width: number, height: number, ...input: any[]): void;
    addShaped(output: any, width: number, height: number, ...input: any[]): void;
    addShapeless(key: ResourceLocation, group: string, output: any, ...inputs: any[]): void;
    addShapeless(key: ResourceLocation, output: any, ...inputs: any[]): void;
    addShapeless(output: any, ...inputs: any[]): void;
    static potionIngredient(type: Holder<Potion>): Ingredient;
  }

}

declare module 'dev.shadowsoffire.placebo.datagen.DataGenBuilder' {
  import { PackOutput } from 'net.minecraft.data';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';
  import { ExistingFileHelper } from 'net.neoforged.neoforge.common.data';

  class DataProviderFactory<T extends DataProvider = any> {
    create(var1: PackOutput, var2: CompletableFuture<Provider>, var3: ExistingFileHelper): T;
  }

}

declare module 'dev.shadowsoffire.placebo.events' {
  import { Event } from 'net.neoforged.bus.api';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { FallingBlockEntity } from 'net.minecraft.world.entity.item';
  import { ResourceManager } from 'net.minecraft.server.packs.resources';
  import { LogicalSide } from 'net.neoforged.fml';

  interface AnvilLandEvent extends Event {}
  class AnvilLandEvent extends Event {
    constructor(level: Level, pos: BlockPos, newState: BlockState, oldState: BlockState, entity: FallingBlockEntity);
    get entity(): FallingBlockEntity;
    get level(): Level;
    get newState(): BlockState;
    get oldState(): BlockState;
    get pos(): BlockPos;
  }


  interface ResourceReloadEvent extends Event {}
  class ResourceReloadEvent extends Event {
    constructor(resourceManager: ResourceManager, side: LogicalSide);
    get resourceManager(): ResourceManager;
    get side(): LogicalSide;
  }

}

declare module 'dev.shadowsoffire.placebo.json' {
  import { JsonElement, JsonDeserializer, JsonSerializer, JsonSerializationContext, JsonDeserializationContext } from 'com.google.gson';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Logger } from 'org.apache.logging.log4j';
  import { ConditionalOps } from 'net.neoforged.neoforge.common.conditions';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Codec } from 'com.mojang.serialization';
  import { Type } from 'java.lang.reflect';
  import { IntrusiveBase } from 'WeightedEntry';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Weight } from 'net.minecraft.util.random';
  import { LivingEntity, EquipmentSlot } from 'net.minecraft.world.entity';

  class JsonUtil {
    static checkAndLogEmpty(e: JsonElement, id: ResourceLocation, type: string, logger: Logger): boolean;
    static checkConditions(e: JsonElement, id: ResourceLocation, type: string, logger: Logger, ops: ConditionalOps<JsonElement>): boolean;
  }


  interface NBTAdapter extends JsonDeserializer<CompoundTag>, JsonSerializer<CompoundTag> {}
  class NBTAdapter extends JsonDeserializer<CompoundTag> {
    static readonly INSTANCE: NBTAdapter;
    static readonly EITHER_CODEC: Codec;
    deserialize(json: JsonElement, typeOfT: Type, context: JsonDeserializationContext): CompoundTag;
    serialize(src: CompoundTag, typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }


  class OptionalStackCodec {
    static readonly INSTANCE: Codec;
  }


  interface WeightedItemStack extends IntrusiveBase {}
  class WeightedItemStack extends IntrusiveBase {
    static readonly CODEC: Codec;
    static readonly LIST_CODEC: Codec;
    constructor(stack: ItemStack, weight: Weight, dropChance: number);
    apply(entity: LivingEntity, slot: EquipmentSlot): void;
    get stack(): ItemStack;
    toString(): string;
  }

}

declare module 'dev.shadowsoffire.placebo.loot' {
  import { LootPoolSingletonContainer, LootPoolEntryType } from 'net.minecraft.world.level.storage.loot.entries';
  import { MapCodec } from 'com.mojang.serialization';
  import { ItemStack } from 'net.minecraft.world.item';
  import { List } from 'java.util';
  import { LootItemCondition } from 'net.minecraft.world.level.storage.loot.predicates';
  import { LootItemFunction } from 'net.minecraft.world.level.storage.loot.functions';
  import { ItemLike } from 'net.minecraft.world.level';

  interface StackLootEntry extends LootPoolSingletonContainer {}
  class StackLootEntry extends LootPoolSingletonContainer {
    static readonly CODEC: MapCodec;
    static readonly TYPE: LootPoolEntryType;
    constructor(stack: ItemStack, min: number, max: number, weight: number, quality: number, conditions: LootItemCondition[], functions: LootItemFunction[]);

    constructor(stack: ItemStack, min: number, max: number, weight: number, quality: number);

    constructor(item: ItemLike, min: number, max: number, weight: number, quality: number);

    constructor(stack: ItemStack);
    get type(): LootPoolEntryType;
  }

}

declare module 'dev.shadowsoffire.placebo.menu' {
  import { Player, Inventory } from 'net.minecraft.world.entity.player';
  import { SlotItemHandler } from 'net.neoforged.neoforge.items';
  import { InternalItemHandler, ModifiableEnergyStorage } from 'dev.shadowsoffire.placebo.cap';
  import { Predicate, BiPredicate, IntSupplier, IntConsumer, BooleanSupplier, Consumer } from 'java.util.function';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Slot, MenuType, AbstractContainerMenu, DataSlot } from 'net.minecraft.world.inventory';
  import { MenuSupplier } from 'MenuType';
  import { IContainerFactory } from 'net.neoforged.neoforge.network';
  import { PosFactory } from 'dev.shadowsoffire.placebo.menu.MenuUtil';
  import { InteractionResult, MenuProvider } from 'net.minecraft.world';
  import { BlockPos } from 'net.minecraft.core';
  import { QuickMoveMenu } from 'dev.shadowsoffire.placebo.menu.QuickMoveHandler';
  import { Integer } from 'java.lang';
  import { BooleanConsumer } from 'it.unimi.dsi.fastutil.booleans';
  import { List } from 'java.util';
  import { Level } from 'net.minecraft.world.level';
  import { Component } from 'net.minecraft.network.chat';

  interface BlockEntityMenu<T extends BlockEntity = any> extends PlaceboContainerMenu {}
  class BlockEntityMenu<T extends BlockEntity = any> extends PlaceboContainerMenu {
    stillValid(pPlayer: Player): boolean;
  }


  interface FilteredSlot extends SlotItemHandler {}
  class FilteredSlot extends SlotItemHandler {
    constructor(handler: InternalItemHandler, index: number, x: number, y: number, filter: Predicate<ItemStack>);

    constructor(handler: InternalItemHandler, index: number, x: number, y: number);
    mayPickup(playerIn: Player): boolean;
    mayPlace(stack: ItemStack): boolean;
    remove(amount: number): ItemStack;
  }


  class IDataUpdateListener {
    dataUpdated(var1: number, var2: number): void;
  }


  interface LockedSlot extends Slot {}
  class LockedSlot extends Slot {
    constructor(inv: Inventory, index: number, x: number, y: number);
    mayPickup(player: Player): boolean;
    mayPlace(stack: ItemStack): boolean;
  }


  class MenuUtil {
    static bufType<T extends AbstractContainerMenu>(factory: IContainerFactory<T>): MenuType<T>;
    static openGui<M extends AbstractContainerMenu>(player: Player, pos: BlockPos, factory: PosFactory<M>): InteractionResult;
    static posType<T extends AbstractContainerMenu>(factory: PosFactory<T>): MenuType<T>;
    static type<T extends AbstractContainerMenu>(factory: MenuSupplier<T>): MenuType<T>;
  }


  interface PlaceboContainerMenu extends QuickMoveMenu, AbstractContainerMenu {}
  class PlaceboContainerMenu extends QuickMoveMenu {
    addDataListener(listener: IDataUpdateListener): void;
    addSlotListener(listener: SlotUpdateListener): void;
    dataChanged(pContainerMenu: AbstractContainerMenu, pDataSlotIndex: number, pValue: number): void;
    dataChanged(pContainerMenu: AbstractContainerMenu, pDataSlotIndex: number, pValue: number): void;
    moveItemStackTo(pStack: ItemStack, pStartIndex: number, pEndIndex: number, pReverseDirection: boolean): boolean;
    quickMoveStack(pPlayer: Player, pIndex: number): ItemStack;
    setData(pId: number, pData: number): void;
    slotChanged(pContainerToSend: AbstractContainerMenu, pDataSlotIndex: number, pStack: ItemStack): void;
    slotChanged(pContainerToSend: AbstractContainerMenu, pDataSlotIndex: number, pStack: ItemStack): void;
  }


  class QuickMoveHandler {
    quickMoveStack(container: QuickMoveMenu, player: Player, index: number): ItemStack;
    registerRule(req: BiPredicate<ItemStack, number>, startIdx: number, endIdx: number, reversed: boolean): void;
    registerRule(req: BiPredicate<ItemStack, number>, startIdx: number, endIdx: number): void;
  }


  class SimpleDataSlots {
    addData(getter: IntSupplier, setter: IntConsumer): void;
    addData(getter: BooleanSupplier, setter: BooleanConsumer, v: number): void;
    addEnergy(energy: ModifiableEnergyStorage): void;
    addSlot(slot: DataSlot): void;
    get slots(): DataSlot[];
    register(consumer: Consumer<DataSlot>): void;
  }


  interface SimplerMenuProvider<M extends AbstractContainerMenu = any> extends MenuProvider {}
  class SimplerMenuProvider<M extends AbstractContainerMenu = any> extends MenuProvider {
    constructor(level: Level, pos: BlockPos, factory: PosFactory<M>);
    createMenu(pContainerId: number, pInventory: Inventory, pPlayer: Player): AbstractContainerMenu;
    get displayName(): Component;
  }


  class SlotUpdateListener {
    slotUpdated(var1: number, var2: ItemStack): void;
  }

}

declare module 'dev.shadowsoffire.placebo.menu.MenuUtil' {
  import { IContainerFactory } from 'net.neoforged.neoforge.network';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { BlockPos } from 'net.minecraft.core';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  interface PosFactory<T extends AbstractContainerMenu = any> extends IContainerFactory<T> {}
  class PosFactory<T extends AbstractContainerMenu = any> extends IContainerFactory<T> {
    create(var1: number, var2: Inventory, var3: BlockPos): T;
    create(id: number, inv: Inventory, buf: RegistryFriendlyByteBuf): T;
  }

}

declare module 'dev.shadowsoffire.placebo.menu.QuickMoveHandler' {
  import { ItemStack } from 'net.minecraft.world.item';
  import { Slot } from 'net.minecraft.world.inventory';

  class QuickMoveMenu {
    getSlot(var1: number): Slot;
    moveItemStackTo(var1: ItemStack, var2: number, var3: number, var4: boolean): boolean;
    onQuickMove(original: ItemStack, remaining: ItemStack, slot: Slot): void;
  }

}

declare module 'dev.shadowsoffire.placebo.menu.SimpleDataSlots' {
  import { DataSlot } from 'net.minecraft.world.inventory';
  import { SimpleDataSlots } from 'dev.shadowsoffire.placebo.menu';
  import { IntSupplier, IntConsumer, Consumer } from 'java.util.function';
  import { ModifiableEnergyStorage } from 'dev.shadowsoffire.placebo.cap';

  interface LambdaDataSlot extends DataSlot {}
  class LambdaDataSlot extends DataSlot {
    constructor(this$0: SimpleDataSlots, getter: IntSupplier, setter: IntConsumer);
    get (): number;
    set (pValue: number);
  }


  interface EnergyDataSlot extends LambdaDataSlot {}
  class EnergyDataSlot extends LambdaDataSlot {
    constructor(this$0: SimpleDataSlots, energy: ModifiableEnergyStorage);
  }


  class IDataAutoRegister {
    registerSlots(var1: Consumer<DataSlot>): void;
  }

}

declare module 'dev.shadowsoffire.placebo.mixin' {
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { FallingBlockEntity } from 'net.minecraft.world.entity.item';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { CachedObjectSource } from 'dev.shadowsoffire.placebo.util.CachedObject';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Function, ToIntFunction } from 'java.util.function';
  import { ItemStack } from 'net.minecraft.world.item';

  class AnvilBlockMixin {
    onLand(level: Level, pos: BlockPos, newState: BlockState, oldState: BlockState, entity: FallingBlockEntity, ci: CallbackInfo): void;
  }


  interface ItemStackMixin extends CachedObjectSource {}
  class ItemStackMixin extends CachedObjectSource {
    getOrCreate<T>(id: ResourceLocation, deserializer: Function<ItemStack, T>, hasher: ToIntFunction<ItemStack>): T;
    static getOrCreate<T>(stack: ItemStack, id: ResourceLocation, deserializer: Function<ItemStack, T>, hasher: ToIntFunction<ItemStack>): T;
  }

}

declare module 'dev.shadowsoffire.placebo.mixin.client' {
  import { DrawsOnLeft } from 'dev.shadowsoffire.placebo.util';

  interface AbstractContainerScreenMixin extends DrawsOnLeft {}
  class AbstractContainerScreenMixin extends DrawsOnLeft {
  }


  class ChatComponentMixin {
    placebo_unEscapeChatLogNewlines(old: string): string;
  }

}

declare module 'dev.shadowsoffire.placebo.network' {
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { RegisterPayloadHandlersEvent } from 'net.neoforged.neoforge.network.event';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf, ConnectionProtocol } from 'net.minecraft.network';
  import { IPayloadContext } from 'net.neoforged.neoforge.network.handling';
  import { List, Optional } from 'java.util';
  import { PacketFlow } from 'net.minecraft.network.protocol';
  import { HandlerThread } from 'net.neoforged.neoforge.network.registration';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';

  class PayloadHelper {
    static registerPayload<T extends CustomPacketPayload>(prov: PayloadProvider<T>): void;
    registerProviders(event: RegisterPayloadHandlersEvent): void;
  }


  class PayloadProvider<T extends CustomPacketPayload = any> {
    get codec(): StreamCodec<RegistryFriendlyByteBuf, T>;
    get flow(): Optional<PacketFlow>;
    get handlerThread(): HandlerThread;
    get supportedProtocols(): ConnectionProtocol[];
    get type(): Type<T>;
    get version(): string;
    handle(var1: T, var2: IPayloadContext): void;
    isOptional(): boolean;
  }


  class VanillaPacketDispatcher {
    static dispatchTEToNearbyPlayers(tile: BlockEntity): void;
    static dispatchTEToNearbyPlayers(world: Level, pos: BlockPos): void;
  }

}

declare module 'dev.shadowsoffire.placebo.patreon' {
  import { Post } from 'PlayerTickEvent';
  import { KeyMapping } from 'net.minecraft.client';
  import { Set, UUID } from 'java.util';
  import { Post as clienttickevent_Post } from 'ClientTickEvent';
  import { Key } from 'InputEvent';
  import { ModelLayerLocation } from 'net.minecraft.client.model.geom';
  import { FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';
  import { WingType } from 'dev.shadowsoffire.placebo.patreon.PatreonUtils';

  class PatreonPreview {
    static readonly PARTICLES: boolean;
    static readonly WINGS: boolean;
    static tick(e: Post): void;
  }


  class PatreonUtils {
  }


  class TrailsManager {
    static readonly TOGGLE: KeyMapping;
    static readonly DISABLED: Set;
    static clientTick(e: clienttickevent_Post): void;
    static init(): void;
    static keys(e: Key): void;
  }


  class WingsManager {
    static readonly TOGGLE: KeyMapping;
    static readonly DISABLED: Set;
    static readonly WING_LOC: ModelLayerLocation;
    static getType(id: UUID): WingType;
    static init(e: FMLClientSetupEvent): void;
    static keys(e: Key): void;
  }

}

declare module 'dev.shadowsoffire.placebo.patreon.PatreonUtils' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface WingType extends Enum<WingType> {}
  class WingType extends Enum<WingType> {
    static readonly ANGEL: WingType;
    static readonly ARMORED: WingType;
    static readonly BAT: WingType;
    static readonly BLAZE: WingType;
    static readonly BONE: WingType;
    static readonly BRANCH: WingType;
    static readonly CLOUD: WingType;
    static readonly DEMON: WingType;
    static readonly FAIRY: WingType;
    static readonly FLY: WingType;
    static readonly LACEWING: WingType;
    static readonly MECHANICAL: WingType;
    static readonly MONARCH: WingType;
    static readonly PIXIE: WingType;
    static readonly SPACE: WingType;
    static readonly SPOOKY: WingType;
    static valueOf(name: string): WingType;
    static values(): WingType[];
  }


  interface PatreonParticleType extends Enum<PatreonParticleType> {}
  class PatreonParticleType extends Enum<PatreonParticleType> {
    static readonly ASH: PatreonParticleType;
    static readonly CAMPFIRE_SMOKE: PatreonParticleType;
    static readonly CLOUD: PatreonParticleType;
    static readonly DMG_HEART: PatreonParticleType;
    static readonly DRAGON_BREATH: PatreonParticleType;
    static readonly ELECTRIC_SPARK: PatreonParticleType;
    static readonly END_ROD: PatreonParticleType;
    static readonly FIRE: PatreonParticleType;
    static readonly FIREWORK: PatreonParticleType;
    static readonly GLOW: PatreonParticleType;
    static readonly GROWTH: PatreonParticleType;
    static readonly HEART: PatreonParticleType;
    static readonly SCULK_SOUL: PatreonParticleType;
    static readonly SLIME: PatreonParticleType;
    static readonly SNOW: PatreonParticleType;
    static readonly SOUL: PatreonParticleType;
    static readonly SOUL_FIRE: PatreonParticleType;
    static readonly WITCH: PatreonParticleType;
    static valueOf(name: string): PatreonParticleType;
    static values(): PatreonParticleType[];
  }

}

declare module 'dev.shadowsoffire.placebo.patreon.wings' {
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { AbstractClientPlayer } from 'net.minecraft.client.player';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { PlayerModel, EntityModel } from 'net.minecraft.client.model';
  import { ModelPart } from 'net.minecraft.client.model.geom';
  import { LayerDefinition } from 'net.minecraft.client.model.geom.builders';
  import { RenderLayer } from 'net.minecraft.client.renderer.entity.layers';
  import { RenderLayerParent } from 'net.minecraft.client.renderer.entity';

  class IWingModel {
    render(var1: PoseStack, var2: MultiBufferSource, var3: number, var4: AbstractClientPlayer, var5: number, var6: ResourceLocation, var7: PlayerModel<AbstractClientPlayer>): void;
  }


  interface Wing extends IWingModel, EntityModel<AbstractClientPlayer> {}
  class Wing extends IWingModel {
    static INSTANCE: Wing;
    constructor(baked: ModelPart);
    static createLayer(): LayerDefinition;
    render(stack: PoseStack, buf: MultiBufferSource, packedLightIn: number, player: AbstractClientPlayer, partialTicks: number, texture: ResourceLocation, model: PlayerModel<AbstractClientPlayer>): void;
    renderToBuffer(matrixStack: PoseStack, buffer: VertexConsumer, packedLight: number, packedOverlay: number, color: number): void;
    setRotationAngle(modelRenderer: ModelPart, x: number, y: number, z: number): void;
    setupAnim(entity: AbstractClientPlayer, limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface WingLayer extends RenderLayer<AbstractClientPlayer, PlayerModel> {}
  class WingLayer extends RenderLayer<AbstractClientPlayer, PlayerModel> {
    constructor(playerModelIn: RenderLayerParent<AbstractClientPlayer, PlayerModel<AbstractClientPlayer>>);
    render(stack: PoseStack, buf: MultiBufferSource, packedLightIn: number, player: AbstractClientPlayer, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }

}

declare module 'dev.shadowsoffire.placebo.payloads.ButtonClickPayload' {
  import { PayloadProvider } from 'dev.shadowsoffire.placebo.network';
  import { ButtonClickPayload } from 'dev.shadowsoffire.placebo.payloads';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf, ConnectionProtocol } from 'net.minecraft.network';
  import { IPayloadContext } from 'net.neoforged.neoforge.network.handling';
  import { List, Optional } from 'java.util';
  import { PacketFlow } from 'net.minecraft.network.protocol';

  interface Provider extends PayloadProvider<ButtonClickPayload> {}
  class Provider extends PayloadProvider<ButtonClickPayload> {
    get codec(): StreamCodec<RegistryFriendlyByteBuf, ButtonClickPayload>;
    get flow(): Optional<PacketFlow>;
    get supportedProtocols(): ConnectionProtocol[];
    get type(): Type<ButtonClickPayload>;
    get version(): string;
    handle(msg: ButtonClickPayload, ctx: IPayloadContext): void;
  }


  class IButtonContainer {
    onButtonClick(var1: number): void;
  }

}

declare module 'dev.shadowsoffire.placebo.payloads.PatreonDisablePayload' {
  import { Enum } from 'java.lang';
  import { List, Optional } from 'java.util';
  import { PayloadProvider } from 'dev.shadowsoffire.placebo.network';
  import { PatreonDisablePayload } from 'dev.shadowsoffire.placebo.payloads';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf, ConnectionProtocol } from 'net.minecraft.network';
  import { IPayloadContext } from 'net.neoforged.neoforge.network.handling';
  import { PacketFlow } from 'net.minecraft.network.protocol';

  interface CosmeticType extends Enum<CosmeticType> {}
  class CosmeticType extends Enum<CosmeticType> {
    static readonly TRAILS: CosmeticType;
    static readonly WINGS: CosmeticType;
    static valueOf(name: string): CosmeticType;
    static values(): CosmeticType[];
  }


  interface Provider extends PayloadProvider<PatreonDisablePayload> {}
  class Provider extends PayloadProvider<PatreonDisablePayload> {
    get codec(): StreamCodec<RegistryFriendlyByteBuf, PatreonDisablePayload>;
    get flow(): Optional<PacketFlow>;
    get supportedProtocols(): ConnectionProtocol[];
    get type(): Type<PatreonDisablePayload>;
    get version(): string;
    handle(msg: PatreonDisablePayload, ctx: IPayloadContext): void;
  }

}

declare module 'dev.shadowsoffire.placebo' {
  import { Logger } from 'org.apache.logging.log4j';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { FMLCommonSetupEvent, FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';
  import { RegisterEvent } from 'net.neoforged.neoforge.registries';
  import { RegisterCommandsEvent, AddReloadListenerEvent } from 'net.neoforged.neoforge.event';
  import { ServerAboutToStartEvent } from 'net.neoforged.neoforge.event.server';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RegisterKeyMappingsEvent, RegisterClientReloadListenersEvent } from 'net.neoforged.neoforge.client.event';
  import { AddLayers } from 'EntityRenderersEvent';
  import { PotionBrewing } from 'net.minecraft.world.item.alchemy';
  import { Post } from 'ClientTickEvent';
  import { Pre } from 'ScreenEvent.MouseScrolled';
  import { MouseScrollingEvent } from 'InputEvent';
  import { ItemTooltipEvent } from 'net.neoforged.neoforge.event.entity.player';

  class Placebo {
    static readonly MODID: string;
    static readonly LOGGER: Logger;
    constructor(bus: IEventBus);
    static loc(path: string): ResourceLocation;
    register(e: RegisterEvent): void;
    registerCommands(e: RegisterCommandsEvent): void;
    serverReload(e: AddReloadListenerEvent): void;
    serverStart(e: ServerAboutToStartEvent): void;
    setup(e: FMLCommonSetupEvent): void;
  }


  class PlaceboClient {
    static ticks: number;
    static addLayers(e: AddLayers): void;
    static clientResource(e: RegisterClientReloadListenersEvent): void;
    static get brewingRegistry(): PotionBrewing;
    static get colorTicks(): number;
    static get tooltipScrollIndex(): number;
    static getTooltipScrollIndex(size: number): number;
    static keys(e: RegisterKeyMappingsEvent): void;
    static scroll(e: Pre): void;
    static scroll2(e: MouseScrollingEvent): void;
    static setup(e: FMLClientSetupEvent): void;
    static tick(e: Post): void;
    static tooltip(e: ItemTooltipEvent): void;
  }


  class PlaceboConfig {
    static clearWandererNormalTrades: boolean;
    static clearWandererRareTrades: boolean;
    static load(): void;
  }

}

declare module 'dev.shadowsoffire.placebo.reload' {
  import { Supplier, Consumer, Predicate } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Optional, Set, Collection } from 'java.util';
  import { SimpleJsonResourceReloadListener } from 'net.minecraft.server.packs.resources';
  import { Logger } from 'org.apache.logging.log4j';
  import { Codec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { ByteBuf } from 'io.netty.buffer';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { AbstractBiMap } from 'dev.shadowsoffire.placebo.util';
  import { CodecProvider } from 'dev.shadowsoffire.placebo.codec';
  import { RandomSource } from 'net.minecraft.util';

  interface DynamicHolder<R extends CodecProvider<R> = any> extends Supplier<R> {}
  class DynamicHolder<R extends CodecProvider<R> = any> extends Supplier<R> {
    static readonly EMPTY: ResourceLocation;
    equals(obj: any): boolean;
    get (): R;
    get id(): ResourceLocation;
    get optional(): Optional<R>;
    hashCode(): number;
    is(id: ResourceLocation): boolean;
    isBound(): boolean;
    toString(): string;
  }


  interface DynamicRegistry<R extends CodecProvider<R> = any> extends SimpleJsonResourceReloadListener {}
  class DynamicRegistry<R extends CodecProvider<R> = any> extends SimpleJsonResourceReloadListener {
    constructor(logger: Logger, path: string, synced: boolean, subtypes: boolean);
    addCallback(callback: RegistryCallback<R>): boolean;
    elementCodec(): Codec<R>;
    emptyHolder(): DynamicHolder<R>;
    get keys(): Set<ResourceLocation>;
    get path(): string;
    get values(): Collection<R>;
    getKey(value: R): ResourceLocation;
    getOrDefault(key: ResourceLocation, defValue: R): R;
    getValue(key: ResourceLocation): R;
    holder(id: ResourceLocation): DynamicHolder<R>;
    holder(value: R): DynamicHolder<R>;
    holderCodec(): Codec<DynamicHolder<R>>;
    holderStreamCodec(): StreamCodec<ByteBuf, DynamicHolder<R>>;
    registerCodec(key: ResourceLocation, codec: Codec<R>, streamCodec: StreamCodec<RegistryFriendlyByteBuf, R>): void;
    registerCodec(key: ResourceLocation, codec: Codec<R>): void;
    registerToBus(): void;
    removeCallback(callback: RegistryCallback<R>): boolean;
    validateExistingHolders(): void;
  }


  interface DynRegBiMap<R extends CodecProvider<R> = any> extends AbstractBiMap<ResourceLocation, R> {}
  class DynRegBiMap<R extends CodecProvider<R> = any> extends AbstractBiMap<ResourceLocation, R> {
    constructor();
  }


  class RegistryCallback<R extends CodecProvider<R> = any> {
    static beginOnly<R extends CodecProvider<R>>(beginReload: Consumer<DynamicRegistry<R>>): RegistryCallback<R>;
    beginReload(var1: DynamicRegistry<R>): void;
    static create<R extends CodecProvider<R>>(beginReload: Consumer<DynamicRegistry<R>>, onReload: Consumer<DynamicRegistry<R>>): RegistryCallback<R>;
    onReload(var1: DynamicRegistry<R>): void;
    static reloadOnly<R extends CodecProvider<R>>(onReload: Consumer<DynamicRegistry<R>>): RegistryCallback<R>;
  }


  class ReloadListenerPayloads {
  }


  interface WeightedDynamicRegistry<V extends CodecProvider<V> & ILuckyWeighted = any> extends DynamicRegistry<V> {}
  class WeightedDynamicRegistry<V extends CodecProvider<V> & ILuckyWeighted = any> extends DynamicRegistry<V> {
    constructor(logger: Logger, path: string, synced: boolean, subtypes: boolean);
    getRandomItem(rand: RandomSource): V;
    getRandomItem(rand: RandomSource, luck: number): V;
    getRandomItem(rand: RandomSource, luck: number, ...filters: Predicate<V>[]): V;
  }

}

declare module 'dev.shadowsoffire.placebo.reload.DynamicRegistry' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { DynamicRegistry } from 'dev.shadowsoffire.placebo.reload';
  import { Consumer } from 'java.util.function';
  import { CodecProvider } from 'dev.shadowsoffire.placebo.codec';

  class SyncManagement {
  }


  class DataGenPopulator<R extends CodecProvider<R> = any> {
    register(id: ResourceLocation, object: R): DataGenPopulator<R>;
    static runScoped<R extends CodecProvider<R>>(registry: DynamicRegistry<R>, consumer: Consumer<DataGenPopulator<R>>): void;
  }

}

declare module 'dev.shadowsoffire.placebo.reload.RegistryCallback' {
  import { RegistryCallback, DynamicRegistry } from 'dev.shadowsoffire.placebo.reload';
  import { Consumer } from 'java.util.function';

  interface Delegated<R extends CodecProvider<R> = any> extends RegistryCallback<R> {}
  class Delegated<R extends CodecProvider<R> = any> extends RegistryCallback<R> {
    constructor(beginReload: Consumer<DynamicRegistry<R>>, onReload: Consumer<DynamicRegistry<R>>);
    beginReload(manager: DynamicRegistry<R>): void;
    onReload(manager: DynamicRegistry<R>): void;
  }

}

declare module 'dev.shadowsoffire.placebo.reload.ReloadListenerPayloads.End' {
  import { PayloadProvider } from 'dev.shadowsoffire.placebo.network';
  import { End } from 'dev.shadowsoffire.placebo.reload.ReloadListenerPayloads';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf, ConnectionProtocol } from 'net.minecraft.network';
  import { IPayloadContext } from 'net.neoforged.neoforge.network.handling';
  import { List, Optional } from 'java.util';
  import { PacketFlow } from 'net.minecraft.network.protocol';

  interface Provider extends PayloadProvider<End> {}
  class Provider extends PayloadProvider<End> {
    get codec(): StreamCodec<RegistryFriendlyByteBuf, End>;
    get flow(): Optional<PacketFlow>;
    get supportedProtocols(): ConnectionProtocol[];
    get type(): Type<End>;
    get version(): string;
    handle(msg: End, ctx: IPayloadContext): void;
  }

}

declare module 'dev.shadowsoffire.placebo.reload.ReloadListenerPayloads.Content' {
  import { PayloadProvider } from 'dev.shadowsoffire.placebo.network';
  import { Content } from 'dev.shadowsoffire.placebo.reload.ReloadListenerPayloads';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf, ConnectionProtocol } from 'net.minecraft.network';
  import { IPayloadContext } from 'net.neoforged.neoforge.network.handling';
  import { List, Optional } from 'java.util';
  import { PacketFlow } from 'net.minecraft.network.protocol';

  interface Provider<V extends CodecProvider<V> = any> extends PayloadProvider<Content> {}
  class Provider<V extends CodecProvider<V> = any> extends PayloadProvider<Content> {
    get codec(): StreamCodec<RegistryFriendlyByteBuf, Content<any>>;
    get flow(): Optional<PacketFlow>;
    get supportedProtocols(): ConnectionProtocol[];
    get type(): Type<Content<any>>;
    get version(): string;
    handle(msg: Content<any>, ctx: IPayloadContext): void;
  }

}

declare module 'dev.shadowsoffire.placebo.reload.ReloadListenerPayloads.Start' {
  import { PayloadProvider } from 'dev.shadowsoffire.placebo.network';
  import { Start } from 'dev.shadowsoffire.placebo.reload.ReloadListenerPayloads';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf, ConnectionProtocol } from 'net.minecraft.network';
  import { IPayloadContext } from 'net.neoforged.neoforge.network.handling';
  import { List, Optional } from 'java.util';
  import { PacketFlow } from 'net.minecraft.network.protocol';

  interface Provider extends PayloadProvider<Start> {}
  class Provider extends PayloadProvider<Start> {
    get codec(): StreamCodec<RegistryFriendlyByteBuf, Start>;
    get flow(): Optional<PacketFlow>;
    get supportedProtocols(): ConnectionProtocol[];
    get type(): Type<Start>;
    get version(): string;
    handle(msg: Start, ctx: IPayloadContext): void;
  }

}

declare module 'dev.shadowsoffire.placebo.reload.WeightedDynamicRegistry' {
  import { Wrapper } from 'WeightedEntry';
  import { Set } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Predicate } from 'java.util.function';
  import { Level } from 'net.minecraft.world.level';

  class ILuckyWeighted {
    get quality(): number;
    get weight(): number;
    wrap<T extends ILuckyWeighted>(luck: number): Wrapper<T>;
    static wrap<T extends ILuckyWeighted>(item: T, luck: number): Wrapper<T>;
  }


  class IDimensional {
    static createPredicate<T extends IDimensional>(dimId: ResourceLocation): Predicate<T>;
    get dimensions(): Set<ResourceLocation>;
    static matches<T extends IDimensional>(level: Level): Predicate<T>;
  }

}

declare module 'dev.shadowsoffire.placebo.screen' {
  import { AbstractContainerScreen, MenuAccess } from 'net.minecraft.client.gui.screens.inventory';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component, FormattedText } from 'net.minecraft.network.chat';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { Matrix4f } from 'org.joml';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { DisplayMode } from 'Font';

  interface PlaceboContainerScreen<T extends AbstractContainerMenu = any> extends MenuAccess<T>, AbstractContainerScreen<T> {}
  class PlaceboContainerScreen<T extends AbstractContainerMenu = any> extends MenuAccess<T> {
    constructor(pMenu: T, pPlayerInventory: Inventory, pTitle: Component);
    render(graphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
  }


  class ScreenUtil {
    static getHeight(height: number, current: number, max: number): number;
  }


  class TickableText {
    constructor(message: string, color: number, newline: boolean, tickRate: number);

    constructor(message: string, color: number);
    causesNewLine(): boolean;
    get maxUsefulTicks(): number;
    getWidth(font: Font): number;
    isDone(): boolean;
    render(font: Font, graphics: GuiGraphics, x: number, y: number): void;
    reset(): void;
    setTicks(ticks: number): TickableText;
    tick(): void;
    static tickList(texts: TickableText[]): void;
  }


  class TickableTextList {
    constructor(font: Font, maxWidth: number);
    addLine(text: FormattedText, tickRate: number): void;
    addLine(text: FormattedText): void;
    clear(): void;
    continueLine(text: FormattedText, tickRate: number): void;
    get lineSpacing(): number;
    get maxWidth(): number;
    get ticks(): number;
    get width(): number;
    render(x: number, y: number, color: number, dropShadow: boolean, matrix: Matrix4f, buffer: MultiBufferSource, mode: DisplayMode, bgColor: number, packedLight: number): void;
    render(gfx: GuiGraphics, x: number, y: number, color: number, dropShadow: boolean): void;
    render(gfx: GuiGraphics, x: number, y: number): void;
    set lineSpacing(lineSpacing: number);
    set maxWidth(maxWidth: number);
    set ticks(ticks: number);
    setLine(index: number, text: FormattedText, tickRate: number): void;
    tick(): void;
  }

}

declare module 'dev.shadowsoffire.placebo.systems.gear.GearSet' {
  import { Predicate } from 'java.util.function';
  import { GearSet } from 'dev.shadowsoffire.placebo.systems.gear';
  import { Codec } from 'com.mojang.serialization';

  interface SetPredicate extends Predicate<GearSet> {}
  class SetPredicate extends Predicate<GearSet> {
    static readonly CODEC: Codec;
    constructor(key: string);
    test(t: GearSet): boolean;
    toString(): string;
  }

}

declare module 'dev.shadowsoffire.placebo.systems.gear' {
  import { WeightedDynamicRegistry } from 'dev.shadowsoffire.placebo.reload';
  import { RandomSource } from 'net.minecraft.util';
  import { List } from 'java.util';
  import { SetPredicate } from 'dev.shadowsoffire.placebo.systems.gear.GearSet';

  interface GearSetRegistry extends WeightedDynamicRegistry<GearSet> {}
  class GearSetRegistry extends WeightedDynamicRegistry<GearSet> {
    static readonly INSTANCE: GearSetRegistry;
    constructor();
    getRandomSet(rand: RandomSource, luck: number, armorSets: SetPredicate[]): GearSet;
  }

}

declare module 'dev.shadowsoffire.placebo.systems.mixes.JsonMix' {
  import { Enum } from 'java.lang';
  import { MapCodec } from 'com.mojang.serialization';
  import { JsonMix } from 'dev.shadowsoffire.placebo.systems.mixes';
  import { List } from 'java.util';

  interface Type extends Enum<Type> {}
  class Type extends Enum<Type> {
    static readonly CONTAINER: Type;
    static readonly POTION: Type;
    codec(): MapCodec<JsonMix<any>>;
    static valueOf(name: string): Type;
    static values(): Type[];
  }

}

declare module 'dev.shadowsoffire.placebo.systems.mixes' {
  import { DynamicRegistry } from 'dev.shadowsoffire.placebo.reload';

  interface MixRegistry extends DynamicRegistry<JsonMix> {}
  class MixRegistry extends DynamicRegistry<JsonMix> {
    static readonly INSTANCE: MixRegistry;
    constructor();
    static applyMixes(): void;
  }

}

declare module 'dev.shadowsoffire.placebo.systems.wanderer' {
  import { BasicItemListing } from 'net.neoforged.neoforge.common';
  import { Codec } from 'com.mojang.serialization';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Builder } from 'dev.shadowsoffire.placebo.systems.wanderer.BasicWandererTrade';
  import { ItemListing } from 'VillagerTrades';
  import { CodecProvider } from 'dev.shadowsoffire.placebo.codec';
  import { DynamicRegistry } from 'dev.shadowsoffire.placebo.reload';
  import { WandererTradesEvent } from 'net.neoforged.neoforge.event.village';

  interface BasicWandererTrade extends WandererTrade, BasicItemListing {}
  class BasicWandererTrade extends WandererTrade {
    static CODEC: Codec;
    constructor(price: ItemStack, price2: ItemStack, forSale: ItemStack, maxTrades: number, xp: number, priceMult: number, rare: boolean);
    static builder(): Builder;
    get codec(): Codec<WandererTrade>;
    isRare(): boolean;
  }


  interface WandererTrade extends ItemListing, CodecProvider<WandererTrade> {}
  class WandererTrade extends ItemListing {
    isRare(): boolean;
  }


  interface WandererTradesRegistry extends DynamicRegistry<WandererTrade> {}
  class WandererTradesRegistry extends DynamicRegistry<WandererTrade> {
    static readonly INSTANCE: WandererTradesRegistry;
    constructor();
    static replaceTrades(e: WandererTradesEvent): void;
  }

}

declare module 'dev.shadowsoffire.placebo.systems.wanderer.BasicWandererTrade' {
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { BasicWandererTrade } from 'dev.shadowsoffire.placebo.systems.wanderer';

  class Builder {
    build(): BasicWandererTrade;
    forSale(forSale: ItemStack): Builder;
    forSale(output: Item, count: number): Builder;
    maxTrades(maxTrades: number): Builder;
    price(price: ItemStack): Builder;
    price(price: Item, count: number): Builder;
    price2(price2: ItemStack): Builder;
    price2(price: Item, count: number): Builder;
    priceMult(priceMult: number): Builder;
    rare(): Builder;
    xp(xp: number): Builder;
  }

}

declare module 'dev.shadowsoffire.placebo.tabs' {
  import { CreativeModeTab } from 'net.minecraft.world.item';
  import { BuildCreativeModeTabContentsEvent } from 'net.neoforged.neoforge.event';
  import { ItemLike } from 'net.minecraft.world.level';
  import { Supplier } from 'java.util.function';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Holder } from 'net.minecraft.core';

  class ITabFiller {
    static delegating(i: Supplier<ItemLike>): ITabFiller;
    fillItemCategory(var1: CreativeModeTab, var2: BuildCreativeModeTabContentsEvent): void;
    static simple(i: ItemLike): ITabFiller;
  }


  class TabFillingRegistry {
    static fillTabs(e: BuildCreativeModeTabContentsEvent): void;
    static register(filler: ITabFiller, ...tabs: ResourceKey<CreativeModeTab>[]): void;
    static register(tab: ResourceKey<CreativeModeTab>, ...fillers: ITabFiller[]): void;
    static register(tab: ResourceKey<CreativeModeTab>, ...items: Supplier<ItemLike>[]): void;
    static register(tab: ResourceKey<CreativeModeTab>, ...items: Holder<ItemLike>[]): void;
    static registerSimple(item: ItemLike, ...tabs: ResourceKey<CreativeModeTab>[]): void;
    static registerSimple(tab: ResourceKey<CreativeModeTab>, ...items: ItemLike[]): void;
  }

}

declare module 'dev.shadowsoffire.placebo.util' {
  import { ForwardingMap, BiMap } from 'com.google.common.collect';
  import { Serializable } from 'java.io';
  import { Map, Set, List } from 'java.util';
  import { BiFunction, Function, ToIntFunction } from 'java.util.function';
  import { Entry } from 'Map';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ItemStack } from 'net.minecraft.world.item';
  import { DataComponentType } from 'net.minecraft.core.component';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { Matrix4f } from 'org.joml';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { FormattedText, Component, TextColor } from 'net.minecraft.network.chat';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Task } from 'dev.shadowsoffire.placebo.util.PlaceboTaskQueue';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { SimplePreparableReloadListener } from 'net.minecraft.server.packs.resources';
  import { Unit } from 'net.minecraft.util';
  import { Runnable } from 'java.lang';

  interface AbstractBiMap<K = any, V = any> extends BiMap<K, V>, Serializable, ForwardingMap<K, V> {}
  class AbstractBiMap<K = any, V = any> extends BiMap<K, V> {
    constructor(forward: Map<K, V>, backward: Map<V, K>);
    clear(): void;
    containsValue(value: any): boolean;
    entrySet(): Set<Entry<K, V>>;
    forcePut(key: K, value: V): V;
    hasNext(): boolean;
    inverse(): BiMap<V, K>;
    keySet(): Set<K>;
    next(): Entry<K, V>;
    put(key: K, value: V): V;
    putAll(map: Map<K, V>): void;
    remove(key: any): V;
    remove(): void;
    replaceAll(functionParameter: BiFunction<K, V, V>): void;
    values(): Set<V>;
  }


  class CachedObject<T = any> {
    static readonly HAS_NEVER_BEEN_INITIALIZED: number;
    constructor(id: ResourceLocation, deserializer: Function<ItemStack, T>, hasher: ToIntFunction<ItemStack>);
    get(stack: ItemStack): T;
    static hashComponents(...types: DataComponentType<any>[]): ToIntFunction<ItemStack>;
    reset(): void;
  }


  class ClientUtil {
    static colorBlit(pMatrixStack: PoseStack, pX: number, pY: number, pUOffset: number, pVOffset: number, pUWidth: number, pVHeight: number, color: number): void;
    static colorBlit(pMatrixStack: PoseStack, pX: number, pY: number, pBlitOffset: number, pWidth: number, pHeight: number, pSprite: TextureAtlasSprite, color: number): void;
    static colorBlit(pPoseStack: PoseStack, pX: number, pY: number, pWidth: number, pHeight: number, pUOffset: number, pVOffset: number, pUWidth: number, pVHeight: number, pTextureWidth: number, pTextureHeight: number, color: number): void;
    static innerBlit(pMatrixStack: PoseStack, pX1: number, pX2: number, pY1: number, pY2: number, pBlitOffset: number, pUWidth: number, pVHeight: number, pUOffset: number, pVOffset: number, pTextureWidth: number, pTextureHeight: number, color: number): void;
    static innerBlit(pMatrix: Matrix4f, pX1: number, pX2: number, pY1: number, pY2: number, pBlitOffset: number, pMinU: number, pMaxU: number, pMinV: number, pMaxV: number, color: number): void;
  }


  class DrawsOnLeft {
    __ths(): AbstractContainerScreen<any>;
    static draw(screen: AbstractContainerScreen<any>, gfx: GuiGraphics, list: Component[], y: number): void;
    drawOnLeft(gfx: GuiGraphics, list: FormattedText[], y: number): void;
    drawOnLeft(gfx: GuiGraphics, list: FormattedText[], y: number, maxWidth: number): void;
  }


  class EnchantmentUtils {
    static chargeExperience(player: Player, cost: number): boolean;
    static getExperience(player: Player): number;
    static getExperienceDifference(start: number, target: number): number;
    static getExperienceForLevel(level: number): number;
    static getLevelForExperience(experience: number): number;
    static getTotalExperienceForLevel(level: number): number;
  }


  class LinearEquation {
    constructor(src: Vec3, dest: Vec3);
    get dest(): Vec3;
    get src(): Vec3;
    step(step: number): Vec3;
  }


  class PlaceboTaskQueue {
    static submitDelayedTask(id: ResourceLocation, delay: number, task: Task): void;
    static submitTask(id: ResourceLocation, task: Task): void;
  }


  class PlaceboUtil {
    static addLore(stack: ItemStack, lore: Component): void;
    static asList<T>(...objs: T[]): T[];
    static makeStack(thing: any): ItemStack;
    static registerCustomColor<T extends TextColor>(color: T): void;
    static toMutable<T>(list: T[]): T[];
    static toStackArray(...args: any[]): ItemStack[];
    static tryHarvestBlock(player: ServerPlayer, pos: BlockPos): boolean;
  }


  interface RunnableReloader extends SimplePreparableReloadListener<Unit> {}
  class RunnableReloader extends SimplePreparableReloadListener<Unit> {
    constructor(r: Runnable);
    static of(r: Runnable): RunnableReloader;
  }


  class SpecialTooltipItem {
  }

}

declare module 'dev.shadowsoffire.placebo.util.AbstractBiMap' {
  import { AbstractBiMap } from 'dev.shadowsoffire.placebo.util';
  import { Iterator } from 'java.util';
  import { ForwardingMapEntry } from 'com.google.common.collect';

  interface Inverse<K = any, V = any> extends AbstractBiMap<K, V> {}
  class Inverse<K = any, V = any> extends AbstractBiMap<K, V> {
  }


  interface TransformedIterator<F = any, T = any> extends Iterator<T> {}
  class TransformedIterator<F = any, T = any> extends Iterator<T> {
    hasNext(): boolean;
    next(): T;
    remove(): void;
  }


  interface BiMapEntry extends ForwardingMapEntry<K, V> {}
  class BiMapEntry extends ForwardingMapEntry<K, V> {
    setValue(value: V): V;
  }

}

declare module 'dev.shadowsoffire.placebo.util.CachedObject' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Function, ToIntFunction } from 'java.util.function';
  import { ItemStack } from 'net.minecraft.world.item';

  class CachedObjectSource {
    getOrCreate<T>(var1: ResourceLocation, var2: Function<ItemStack, T>, var3: ToIntFunction<ItemStack>): T;
    static getOrCreate<T>(stack: ItemStack, id: ResourceLocation, deserializer: Function<ItemStack, T>, hasher: ToIntFunction<ItemStack>): T;
  }

}

declare module 'dev.shadowsoffire.placebo.util.data' {
  import { DataProvider, PackOutput, CachedOutput } from 'net.minecraft.data';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';
  import { DynamicRegistry } from 'dev.shadowsoffire.placebo.reload';
  import { GatherDataEvent } from 'net.neoforged.neoforge.data.event';
  import { DataProviderFactory } from 'dev.shadowsoffire.placebo.datagen.DataGenBuilder';
  import { CodecProvider } from 'dev.shadowsoffire.placebo.codec';
  import { BiFunction } from 'java.util.function';
  import { Factory } from 'DataProvider';
  import { JsonElement } from 'com.google.gson';
  import { Codec } from 'com.mojang.serialization';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface DynamicRegistryProvider<R extends CodecProvider<R> = any> extends DataProvider {}
  class DynamicRegistryProvider<R extends CodecProvider<R> = any> extends DataProvider {
    constructor(output: PackOutput, registries: CompletableFuture<Provider>, registry: DynamicRegistry<R>);

    constructor(event: GatherDataEvent, registry: DynamicRegistry<R>);
    generate(): void;
    run(pOutput: CachedOutput): CompletableFuture<any>;
    static runSilently<R extends CodecProvider<R>, T extends DynamicRegistryProvider<R>>(factory: DataProviderFactory<T>): DataProviderFactory<T>;
    static runSilently<R extends CodecProvider<R>, T extends DynamicRegistryProvider<R>>(factory: BiFunction<PackOutput, CompletableFuture<Provider>, T>): DataProviderFactory<T>;
    static runSilently<R extends CodecProvider<R>, T extends DynamicRegistryProvider<R>>(factory: Factory<T>): DataProviderFactory<T>;
  }


  class RuntimeDatagenHelpers {
    static toJson<T>(object: T, codec: Codec<T>): JsonElement;
    static toJson<T extends CodecProvider<T>>(object: T): JsonElement;
    static write<T>(object: T, codec: Codec<T>, type: string, key: ResourceLocation): void;
    static write<T extends CodecProvider<T>>(object: T, type: string, key: ResourceLocation): void;
    static write(json: JsonElement, type: string, key: ResourceLocation): void;
  }

}

declare module 'dev.shadowsoffire.placebo.util.Offset' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface AnchorPoint extends Enum<AnchorPoint> {}
  class AnchorPoint extends Enum<AnchorPoint> {
    static readonly TOP_LEFT: AnchorPoint;
    static readonly TOP_CENTER: AnchorPoint;
    static readonly TOP_RIGHT: AnchorPoint;
    static readonly MIDDLE_LEFT: AnchorPoint;
    static readonly MIDDLE_CENTER: AnchorPoint;
    static readonly MIDDLE_RIGHT: AnchorPoint;
    static readonly BOTTOM_LEFT: AnchorPoint;
    static readonly BOTTOM_CENTER: AnchorPoint;
    static readonly BOTTOM_RIGHT: AnchorPoint;
    get serializedName(): string;
    getX(width: number): number;
    getY(height: number): number;
    static parse(s: string): AnchorPoint;
    static valueOf(name: string): AnchorPoint;
    static values(): AnchorPoint[];
  }

}

declare module 'dev.shadowsoffire.placebo.util.PlaceboTaskQueue' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class Task {
    execute(): Status;
  }


  interface Status extends Enum<Status> {}
  class Status extends Enum<Status> {
    static readonly RUNNING: Status;
    static readonly COMPLETED: Status;
    isCompleted(): boolean;
    static valueOf(name: string): Status;
    static values(): Status[];
  }

}