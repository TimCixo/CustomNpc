declare module 'com.cursee.monolib' {
  import { Logger } from 'org.slf4j';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { FMLModContainer } from 'net.neoforged.fml.javafmlmod';

  class Constants {
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static readonly MOD_VERSION: string;
    static readonly MOD_PUBLISHER: string;
    static readonly MOD_URL: string;
    static readonly LOG: Logger;
  }


  class MonoLib {
    static identifier(path: string): ResourceLocation;
    static init(): void;
  }


  class MonoLibClient {
    static init(): void;
  }


  class MonoLibClientNeoForge {
    constructor(modEventBus: IEventBus);
  }


  class MonoLibNeoForge {
    static EVENT_BUS: IEventBus;
    constructor(container: FMLModContainer);
  }

}

declare module 'com.cursee.monolib.core.command' {
  import { LiteralArgumentBuilder, ArgumentBuilder } from 'com.mojang.brigadier.builder';
  import { CommandSourceStack, CommandBuildContext } from 'net.minecraft.commands';
  import { Class, Enum } from 'java.lang';
  import { CommandContext } from 'com.mojang.brigadier.context';
  import { Command, CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSelection } from 'Commands';
  import { List } from 'java.util';

  class CommandHelper {
    static buildFromEnum<T extends Enum<T>>(parent: string, enumClass: Class<T>): LiteralArgumentBuilder<CommandSourceStack>;
    static buildFromEnum<T extends Enum<T>>(parent: ArgumentBuilder<CommandSourceStack, any>, enumClass: Class<T>): void;
    static getLowestLevel<T extends Enum<T>>(enumClass: Class<T>): PermissionLevel;
    static hasArgument<T>(argument: string, context: CommandContext<T>): boolean;
  }


  interface IEnumCommand extends Command<CommandSourceStack> {}
  class IEnumCommand extends Command<CommandSourceStack> {
    get commandName(): string;
    requiredPermissionLevel(): PermissionLevel;
  }


  class MonoLibCommands {
    static debug(): LiteralArgumentBuilder<CommandSourceStack>;
    static defineCommands(commandDispatcher: CommandDispatcher<CommandSourceStack>, commandContext: CommandBuildContext, commandEnvironment: CommandSelection): void;
    static hand(): LiteralArgumentBuilder<CommandSourceStack>;
    static help(): LiteralArgumentBuilder<CommandSourceStack>;
    static isPlayerOperator(source: CommandSourceStack): boolean;
    static questionMark(): LiteralArgumentBuilder<CommandSourceStack>;
    static showCommandHelp(source: CommandSourceStack): number;
  }


  interface PermissionLevel extends Enum<PermissionLevel> {}
  class PermissionLevel extends Enum<PermissionLevel> {
    static readonly PLAYER: PermissionLevel;
    static readonly MODERATOR: PermissionLevel;
    static readonly GAMEMASTER: PermissionLevel;
    static readonly ADMIN: PermissionLevel;
    static readonly OWNER: PermissionLevel;
    get (): number;
    test(source: CommandSourceStack): boolean;
    static valueOf(name: string): PermissionLevel;
    static values(): PermissionLevel[];
  }

}

declare module 'com.cursee.monolib.core.command.hand' {
  import { Enum } from 'java.lang';
  import { CommandContext } from 'com.mojang.brigadier.context';
  import { CommandSourceStack, CommandBuildContext } from 'net.minecraft.commands';
  import { LiteralArgumentBuilder } from 'com.mojang.brigadier.builder';
  import { List } from 'java.util';

  interface HandCommand extends Enum<HandCommand> {}
  class HandCommand extends Enum<HandCommand> {
    static readonly ID: HandCommand;
    static readonly STRING: HandCommand;
    static readonly INGREDIENT: HandCommand;
    static readonly STACK_JSON: HandCommand;
    static readonly SNBT: HandCommand;
    static readonly TAGS: HandCommand;
    static build(context: CommandBuildContext): LiteralArgumentBuilder<CommandSourceStack>;
    get commandName(): string;
    run(context: CommandContext<CommandSourceStack>): number;
    static valueOf(name: string): HandCommand;
    static values(): HandCommand[];
  }

}

declare module 'com.cursee.monolib.core.command.hand.HandCommand' {
  import { Component } from 'net.minecraft.network.chat';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ServerLevel } from 'net.minecraft.server.level';

  class ItemFormat {
    formatItem(var1: ItemStack, var2: ServerLevel): Component;
  }

}

declare module 'com.cursee.monolib.core' {
  import { File } from 'java.io';
  import { SimpleConfigEntry } from 'com.cursee.monolib.core.config';

  class CommonConfigHandler {
    static readonly IDENTIFIER: string;
    static readonly CONFIG_DIR_FILEPATH: string;
    static handle(file: File): void;
    static onLoad(): void;
  }


  class CommonConfigValues {
    static enable_debugging: boolean;
    static enable_jar_verification: boolean;
  }


  class ConfiguredValues {
    static readonly ENABLE_DEBUGGING: SimpleConfigEntry;
    static readonly ENABLE_JAR_VERIFICATION: SimpleConfigEntry;
  }


  class MonoLibConfiguration {
    static debugging: boolean;
    static enableAntiRepostingCheck: boolean;
  }

}

declare module 'com.cursee.monolib.core.config' {
  import { Map, Set, List, Date } from 'java.util';
  import { File, OutputStream, Writer } from 'java.io';
  import { Long, Boolean, Double } from 'java.lang';

  class SimpleConfig {
    values: Map;
    constructor();

    constructor(defaults: SimpleConfig);
    contains(key: string): boolean;
    containsPrimitive(key: string): boolean;
    containsTable(key: string): boolean;
    containsTableArray(key: string): boolean;
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
    static getOrCreateClient(modId: string, ...references: SimpleConfigEntry<any>[]): SimpleConfig;
    static getOrCreateClient(modId: string, references: Set<SimpleConfigEntry<any>>): SimpleConfig;
    static getOrCreateCommon(modId: string, ...references: SimpleConfigEntry<any>[]): SimpleConfig;
    static getOrCreateCommon(modId: string, references: Set<SimpleConfigEntry<any>>): SimpleConfig;
    static getOrCreateDedicatedServer(modId: string, ...references: SimpleConfigEntry<any>[]): SimpleConfig;
    static getOrCreateDedicatedServer(modId: string, references: Set<SimpleConfigEntry<any>>): SimpleConfig;
    getString(key: string): string;
    getString(key: string, defaultValue: string): string;
    getTable(key: string): SimpleConfig;
    getTables(key: string): SimpleConfig[];
    isEmpty(): boolean;
    static read(file: File): SimpleConfig;
    static write(from: Map<string, any>, target: File): void;
    static writeWithReturn(from: Map<string, any>, target: File): SimpleConfig;
  }


  class SimpleConfigEntry<V = any> {
    constructor(key: string, value: V);
    get (): V;
    get key(): string;
    get value(): V;
    set value(value: V);
  }


  class SimpleConfigParser {
  }


  class SimpleConfigWriter {
    static writeObjectToFile(from: Map<string, any>, target: File): void;
    static writeObjectToFileWithReturn(from: Map<string, any>, target: File): SimpleConfig;
    static writeObjectToOutputStream(from: Map<string, any>, target: OutputStream): void;
    static writeObjectToOutputStreamWithReturn(from: Map<string, any>, file: File, target: OutputStream): SimpleConfig;
    static writeObjectToOutputStreamWriter(from: Map<string, any>, target: Writer): void;
    static writeObjectToOutputStreamWriterWithReturn(from: Map<string, any>, file: File, target: Writer): SimpleConfig;
  }

}

declare module 'com.cursee.monolib.core.event' {
  class NeoForgeModAnvilEvents {
  }

}

declare module 'com.cursee.monolib.core.event.NeoForgeModAnvilEvents' {
  import { BlockEvent } from 'net.neoforged.neoforge.event.level';
  import { IModBusEvent } from 'net.neoforged.fml.event';
  import { AnvilBlock } from 'net.minecraft.world.level.block';
  import { LevelAccessor, Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { FallingBlockEntity } from 'net.minecraft.world.entity.item';

  interface AnvilOnBrokenAfterFallEvent extends IModBusEvent, BlockEvent {}
  class AnvilOnBrokenAfterFallEvent extends IModBusEvent {
    constructor(anvilBlock: AnvilBlock, level: LevelAccessor, pos: BlockPos, state: BlockState, fallingBlock: FallingBlockEntity);
    get anvilBlock(): AnvilBlock;
    get fallingBlock(): FallingBlockEntity;
  }


  interface AnvilOnLandEvent extends IModBusEvent, BlockEvent {}
  class AnvilOnLandEvent extends IModBusEvent {
    constructor(anvilBlock: AnvilBlock, level: LevelAccessor, pos: BlockPos, state: BlockState, replaceable: BlockState, fallingBlock: FallingBlockEntity);
    get anvilBlock(): AnvilBlock;
    get fallingBlock(): FallingBlockEntity;
    get replaceable(): BlockState;
  }


  class Hooks {
    static onBrokenAfterFall(anvilBlock: AnvilBlock, level: Level, pos: BlockPos, fallingBlock: FallingBlockEntity): void;
    static onLand(anvilBlock: AnvilBlock, level: Level, pos: BlockPos, blockState: BlockState, replaceable: BlockState, fallingBlock: FallingBlockEntity): void;
  }

}

declare module 'com.cursee.monolib.core.function' {
  import { CompletableFuture } from 'java.util.concurrent';
  import { Supplier, Consumer } from 'java.util.function';
  import { Registry } from 'net.minecraft.core';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Map } from 'java.util';

  class AsyncFunction<T = any, R = any> {
    apply(var1: T): CompletableFuture<R>;
  }


  class BiVoidFunction<K = any, V = any> {
    apply(var1: K, var2: V): void;
  }


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
    static of<T>(registry: Registry<T>, namespace: string, path: string): CachedSupplier<T>;
    static of<T>(registry: Registry<T>, id: ResourceLocation): CachedSupplier<T>;
    static singleton<T>(singleton: T): CachedSupplier<T>;
  }


  class CheckedFunction<T = any, R = any> {
    apply(var1: T): R;
  }


  class IndexedConsumer<T = any> {
    accept(var1: number, var2: T): void;
  }


  class MapWrapper<K = any, V = any> {
    forAllEntries(functionParameter: BiVoidFunction<K, V>): void;
    forAllValues(functionParameter: VoidFunction<V>): void;
    root(): Map<K, V>;
  }


  class SupplierPair<A = any, B = any> {
    constructor(a: A, b: B);
    get a(): A;
    get aSupplier(): Supplier<A>;
    get b(): B;
    get bSupplier(): Supplier<B>;
  }


  class VoidFunction<T = any> {
    apply(var1: T): void;
  }

}

declare module 'com.cursee.monolib.core.function.example.wrapper' {
  import { Map } from 'java.util';
  import { Integer } from 'java.lang';

  class MapWrapperExample {
    static readonly INT_BY_STRING_MAP: Map;
    static main(args: string[]): void;
    root(): Map<string, number>;
  }

}

declare module 'com.cursee.monolib.core.registry' {
  import { Block } from 'net.minecraft.world.level.block';
  import { BiConsumer } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Item } from 'net.minecraft.world.item';
  import { IEventBus } from 'net.neoforged.bus.api';

  class ModBlocks {
    static readonly DEBUG_BLOCK: Block;
    static register(consumer: BiConsumer<Block, ResourceLocation>): void;
  }


  class ModItems {
    static readonly DEBUG_ITEM: Item;
    static register(consumer: BiConsumer<Item, ResourceLocation>): void;
  }


  class ModRegistryNeoForge {
    static register(modEventBus: IEventBus): void;
  }

}

declare module 'com.cursee.monolib.core.sailing' {
  import { Pair, Triplet } from 'oshi.util.tuples';
  import { Entity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ChatFormatting } from 'net.minecraft';

  class Sailing {
    static onEntityJoinLevel(entity: Entity, level: Level): void;
    static register(modName: string, modID: string, modVersion: string, minecraftVersion: string, publisherAuthorPair: Pair<string, string>, modURLTriplet: Triplet<string, string, string>): void;
    static register(modID: string, modName: string, modVersion: string, modPublisher: string, modURL: string): void;
    static sendMessage(player: Player, message: string, colour: ChatFormatting, insertNewLineBeforeMessage: boolean, url: string): void;
    static sendMessage(player: Player, message: string, color: ChatFormatting, url: string): void;
    static sendMessage(player: Player, message: string, color: ChatFormatting): void;
  }

}

declare module 'com.cursee.monolib.core.sailing.warden' {
  import { Rule } from 'com.cursee.monolib.core.sailing.warden.DomainRules';
  import { Map } from 'java.util';
  import { File } from 'java.io';

  class DomainRules {
    addRule(domain: string): void;
    addRule(rule: Rule): void;
    static builtin(): DomainRules;
    test(identifier: ZoneIdentifier): boolean;
    testDomain(domain: string): boolean;
  }


  class SailingWarden {
    static readonly UNSAFE_PATH_TO_UNSAFE_HOST_MAP: Map;
    static processDirectoryOrFilePathStrings(...filepathArguments: string[]): void;
  }


  class ZoneIdentifier {
    get host(): string;
    get referrer(): string;
    static of(file: File): ZoneIdentifier;
    toString(): string;
  }

}

declare module 'com.cursee.monolib.core.sailing.warden.DomainRules' {
  class Rule {
    constructor(domain: string);
  }

}

declare module 'com.cursee.monolib.core.serialization.codecs.map' {
  import { Codec, MapCodec } from 'com.mojang.serialization';
  import { RecordCodecBuilder } from 'com.mojang.serialization.codecs';
  import { Function, IntFunction, Supplier } from 'java.util.function';
  import { List, Set, Optional, Collection } from 'java.util';
  import { Wrapper } from 'WeightedEntry';
  import { SimpleWeightedRandomList } from 'net.minecraft.util.random';
  import { Iterable, Class, Enum } from 'java.lang';
  import { Holder, Registry } from 'net.minecraft.core';
  import { TagKey } from 'net.minecraft.tags';
  import { ResourceKey } from 'net.minecraft.resources';

  class MapCodecHelper<T = any> {
    constructor(elementCodec: Codec<T>, ...vargs: T[]);
    get<O>(fieldName: string, getter: Function<O, T>): RecordCodecBuilder<O, T>;
    get<O>(fieldName: string, getter: Function<O, T>, fallback: T): RecordCodecBuilder<O, T>;
    get (): Codec<T>;
    get array(): Codec<T[]>;
    get list(): Codec<T[]>;
    get set(): Codec<Set<T>>;
    get weighted(): Codec<Wrapper<T>>;
    get weightedList(): Codec<SimpleWeightedRandomList<T>>;
    getArray<O>(fieldName: string, getter: Function<O, T[]>): RecordCodecBuilder<O, T[]>;
    getArray<O>(fieldName: string, getter: Function<O, T[]>, ...fallback: T[]): RecordCodecBuilder<O, T[]>;
    getList<O>(fieldName: string, getter: Function<O, T[]>): RecordCodecBuilder<O, T[]>;
    getList<O>(fieldName: string, getter: Function<O, T[]>, fallback: T[]): RecordCodecBuilder<O, T[]>;
    getList<O>(fieldName: string, getter: Function<O, T[]>, ...fallback: T[]): RecordCodecBuilder<O, T[]>;
    getNullable(fieldName: string): MapCodec<T>;
    getNullable<O>(fieldName: string, getter: Function<O, T>): RecordCodecBuilder<O, T>;
    getOptional(fieldName: string): MapCodec<Optional<T>>;
    getOptional<O>(fieldName: string, getter: Function<O, Optional<T>>): RecordCodecBuilder<O, Optional<T>>;
    getOptional<O>(fieldName: string, getter: Function<O, Optional<T>>, fallback: Optional<T>): RecordCodecBuilder<O, Optional<T>>;
    getSet<O>(fieldName: string, getter: Function<O, Set<T>>): RecordCodecBuilder<O, Set<T>>;
    getSet<O>(fieldName: string, getter: Function<O, Set<T>>, fallback: Set<T>): RecordCodecBuilder<O, Set<T>>;
    getSet<O>(fieldName: string, getter: Function<O, Set<T>>, ...fallback: T[]): RecordCodecBuilder<O, Set<T>>;
    getWeighted<O>(fieldName: string, getter: Function<O, Wrapper<T>>): RecordCodecBuilder<O, Wrapper<T>>;
    getWeightedList<O>(fieldName: string, getter: Function<O, SimpleWeightedRandomList<T>>): RecordCodecBuilder<O, SimpleWeightedRandomList<T>>;
  }


  class MapCodecs {
    static readonly BOOLEAN: MapCodecHelper;
    static readonly BYTE: MapCodecHelper;
    static readonly SHORT: MapCodecHelper;
    static readonly INT: MapCodecHelper;
    static readonly FLOAT: MapCodecHelper;
    static readonly LONG: MapCodecHelper;
    static readonly DOUBLE: MapCodecHelper;
    static readonly STRING: MapCodecHelper;
    static readonly UUID: MapCodecHelper;
    static readonly GAME_EVENT: MapCodecHelper;
    static readonly SOUND_EVENT: MapCodecHelper;
    static readonly FLUID: MapCodecHelper;
    static readonly MOB_EFFECT: MapCodecHelper;
    static readonly BLOCK: MapCodecHelper;
    static readonly ENTITY_TYPE: MapCodecHelper;
    static readonly ITEM: MapCodecHelper;
    static readonly POTION: MapCodecHelper;
    static readonly PARTICLE_TYPE: MapCodecHelper;
    static readonly BLOCK_ENTITY_TYPE: MapCodecHelper;
    static readonly CUSTOM_STAT: MapCodecHelper;
    static readonly CHUNK_STATUS: MapCodecHelper;
    static readonly RULE_TEST: MapCodecHelper;
    static readonly RULE_BLOCK_ENTITY_MODIFIER: MapCodecHelper;
    static readonly POS_RULE_TEST: MapCodecHelper;
    static readonly MENU: MapCodecHelper;
    static readonly RECIPE_TYPE: MapCodecHelper;
    static readonly RECIPE_SERIALIZER: MapCodecHelper;
    static readonly ATTRIBUTE: MapCodecHelper;
    static readonly POSITION_SOURCE_TYPE: MapCodecHelper;
    static readonly COMMAND_ARGUMENT_TYPE: MapCodecHelper;
    static readonly STAT_TYPE: MapCodecHelper;
    static readonly VILLAGER_TYPE: MapCodecHelper;
    static readonly VILLAGER_PROFESSION: MapCodecHelper;
    static readonly POINT_OF_INTEREST_TYPE: MapCodecHelper;
    static readonly MEMORY_MODULE_TYPE: MapCodecHelper;
    static readonly SENSOR_TYPE: MapCodecHelper;
    static readonly SCHEDULE: MapCodecHelper;
    static readonly ACTIVITY: MapCodecHelper;
    static readonly LOOT_POOL_ENTRY_TYPE: MapCodecHelper;
    static readonly LOOT_FUNCTION_TYPE: MapCodecHelper;
    static readonly LOOT_CONDITION_TYPE: MapCodecHelper;
    static readonly LOOT_NUMBER_PROVIDER_TYPE: MapCodecHelper;
    static readonly LOOT_NBT_PROVIDER_TYPE: MapCodecHelper;
    static readonly LOOT_SCORE_PROVIDER_TYPE: MapCodecHelper;
    static readonly FLOAT_PROVIDER_TYPE: MapCodecHelper;
    static readonly INT_PROVIDER_TYPE: MapCodecHelper;
    static readonly HEIGHT_PROVIDER_TYPE: MapCodecHelper;
    static readonly BLOCK_PREDICATE_TYPE: MapCodecHelper;
    static readonly CARVER: MapCodecHelper;
    static readonly FEATURE: MapCodecHelper;
    static readonly STRUCTURE_PLACEMENT: MapCodecHelper;
    static readonly STRUCTURE_PIECE: MapCodecHelper;
    static readonly STRUCTURE_TYPE: MapCodecHelper;
    static readonly PLACEMENT_MODIFIER_TYPE: MapCodecHelper;
    static readonly BLOCKSTATE_PROVIDER_TYPE: MapCodecHelper;
    static readonly FOLIAGE_PLACER_TYPE: MapCodecHelper;
    static readonly TRUNK_PLACER_TYPE: MapCodecHelper;
    static readonly ROOT_PLACER_TYPE: MapCodecHelper;
    static readonly TREE_DECORATOR_TYPE: MapCodecHelper;
    static readonly FEATURE_SIZE_TYPE: MapCodecHelper;
    static readonly BIOME_SOURCE: MapCodecHelper;
    static readonly CHUNK_GENERATOR: MapCodecHelper;
    static readonly MATERIAL_CONDITION: MapCodecHelper;
    static readonly MATERIAL_RULE: MapCodecHelper;
    static readonly DENSITY_FUNCTION_TYPE: MapCodecHelper;
    static readonly BLOCK_TYPE: MapCodecHelper;
    static readonly STRUCTURE_PROCESSOR: MapCodecHelper;
    static readonly STRUCTURE_POOL_ELEMENT: MapCodecHelper;
    static readonly POOL_ALIAS_BINDING_TYPE: MapCodecHelper;
    static readonly CAT_VARIANT: MapCodecHelper;
    static readonly FROG_VARIANT: MapCodecHelper;
    static readonly INSTRUMENT: MapCodecHelper;
    static readonly DECORATED_POT_PATTERN: MapCodecHelper;
    static readonly CREATIVE_MODE_TAB: MapCodecHelper;
    static readonly TRIGGER_TYPES: MapCodecHelper;
    static readonly NUMBER_FORMAT_TYPE: MapCodecHelper;
    static readonly ARMOR_MATERIAL: MapCodecHelper;
    static readonly DATA_COMPONENT_TYPE: MapCodecHelper;
    static readonly ENTITY_SUB_PREDICATE_TYPE: MapCodecHelper;
    static readonly ITEM_SUB_PREDICATE_TYPE: MapCodecHelper;
    static readonly MAP_DECORATION_TYPE: MapCodecHelper;
    static readonly ENCHANTMENT_EFFECT_COMPONENT_TYPE: MapCodecHelper;
    static readonly ENCHANTMENT_LEVEL_BASED_VALUE_TYPE: MapCodecHelper;
    static readonly ENCHANTMENT_ENTITY_EFFECT_TYPE: MapCodecHelper;
    static readonly ENCHANTMENT_LOCATION_BASED_EFFECT_TYPE: MapCodecHelper;
    static readonly ENCHANTMENT_VALUE_EFFECT_TYPE: MapCodecHelper;
    static readonly ENCHANTMENT_PROVIDER_TYPE: MapCodecHelper;
    static readonly ITEM_RARITY: MapCodecHelper;
    static readonly ATTRIBUTE_OPERATION: MapCodecHelper;
    static readonly DIRECTION: MapCodecHelper;
    static readonly AXIS: MapCodecHelper;
    static readonly PLANE: MapCodecHelper;
    static readonly MOB_CATEGORY: MapCodecHelper;
    static readonly DYE_COLOR: MapCodecHelper;
    static readonly SOUND_SOURCE: MapCodecHelper;
    static readonly DIFFICULTY: MapCodecHelper;
    static readonly EQUIPMENT_SLOT: MapCodecHelper;
    static readonly MIRROR: MapCodecHelper;
    static readonly ROTATION: MapCodecHelper;
    static readonly RESOURCE_LOCATION: MapCodecHelper;
    static readonly COMPOUND_TAG: MapCodecHelper;
    static readonly ITEM_STACK: MapCodecHelper;
    static readonly ITEM_STACK_STRICT: MapCodecHelper;
    static readonly TEXT: MapCodecHelper;
    static readonly BLOCK_POS: MapCodecHelper;
    static readonly INGREDIENT: MapCodecHelper;
    static readonly INGREDIENT_NONEMPTY: MapCodecHelper;
    static readonly BLOCK_STATE_MAP_CODEC: MapCodec;
    static readonly BLOCK_STATE: MapCodecHelper;
    static readonly ATTRIBUTE_MODIFIER: MapCodecHelper;
    static readonly EFFECT_INSTANCE: MapCodecHelper;
    static readonly VECTOR_3F: MapCodecHelper;
    static readonly LOAD_CONDITION: MapCodecHelper;
    static enumerable<T extends Enum<T>>(enumClass: Class<T>): Codec<T>;
    static fallback<T>(codec: Codec<T>, name: string, fallbackSupplier: Supplier<T>): MapCodec<T>;
    static fallback<T>(codec: Codec<T>, name: string, fallbackSupplier: Supplier<T>, writesDefault: boolean): MapCodec<T>;
    static flexibleArray<T>(codec: Codec<T>, arrayBuilder: IntFunction<T[]>): Codec<T[]>;
    static flexibleList<T>(codec: Codec<T>): Codec<T[]>;
    static flexibleSet<T>(codec: Codec<T>): Codec<Set<T>>;
    static formatCollection<T>(collection: Collection<T>): string;
    static formatCollection<T>(collection: Collection<T>, formatter: Function<T, string>, delimiter: string): string;
    static getPossibleMatches(input: string, candidates: Iterable<string>, threshold: number): Set<string>;
    static nullable<T>(codec: Codec<T>, fieldName: string): MapCodec<T>;
    static optional<T>(codec: Codec<T>, name: string, fallback: Optional<T>, writesDefault: boolean): MapCodec<Optional<T>>;
  }


  interface RegistryMapCodecHelper<T = any> extends MapCodecHelper<Holder> {}
  class RegistryMapCodecHelper<T = any> extends MapCodecHelper<Holder> {
    static create<T>(registry: Registry<T>): RegistryMapCodecHelper<T>;
    static create<T>(key: ResourceKey<Registry<T>>): RegistryMapCodecHelper<T>;
    tag(): MapCodecHelper<TagKey<T>>;
  }

}

declare module 'com.cursee.monolib.core.serialization.conditions' {
  import { Codec, MapCodec } from 'com.mojang.serialization';
  import { MapCodecHelper } from 'com.cursee.monolib.core.serialization.codecs.map';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { JsonElement, JsonObject } from 'com.google.gson';

  class ILoadCondition {
    allowLoading(): boolean;
    get type(): ConditionType;
  }


  class LoadConditions {
    static readonly LOAD_CONDITION_TAG: string;
    static readonly CONDITION_CODEC: Codec;
    static readonly CODEC_HELPER: MapCodecHelper;
    static canLoad(rawJson: JsonObject): boolean;
    static getConditions(conditionData: JsonElement): ILoadCondition[];
    static getType(id: ResourceLocation): ConditionType;
    static register<T extends ILoadCondition>(id: ResourceLocation, codec: MapCodec<T>): ConditionType;
  }

}

declare module 'com.cursee.monolib.core.util.config' {
  import { LinkedHashMap, Set, Optional, List, LinkedList } from 'java.util';
  import { Class, Integer, Float, Boolean } from 'java.lang';
  import { Pair } from 'oshi.util.tuples';
  import { Path } from 'java.nio.file';

  class ISimpleConfig {
    get(key: string): any;
    getArrayOfBoolean(key: string): boolean[];
    getArrayOfFloat(key: string): number[];
    getArrayOfInt(key: string): number[];
    getArrayOfString(key: string): string[];
    getBoolean(key: string): boolean;
    getFloat(key: string): number;
    getInt(key: string): number;
    getOptional<T>(key: string, clazz: Class<T>): Optional<T>;
    getOrDefault<T>(key: string, defaultValue: T): T;
    getString(key: string): string;
    hasKey(s: string): boolean;
    identifier(): string;
    keys(): Set<string>;
    putEntry(key: string, value: any, replaceExisting: boolean): void;
    values(): LinkedHashMap<string, any>;
  }


  interface SimpleConfig extends ISimpleConfig {}
  class SimpleConfig extends ISimpleConfig {
    constructor(identifier: string);

    constructor(identifier: string, defaults: LinkedHashMap<string, any>);

    constructor(identifier: string, defaults: LinkedList<Pair<string, any>>);
    identifier(): string;
    load(path: Path): SimpleConfig;
    load(defaults: string[]): SimpleConfig;
    save(path: Path): void;
    values(): LinkedHashMap<string, any>;
  }


  class SimpleConfigIO {
    static formatValue(value: any): string;
    static load(config: SimpleConfig, path: Path): SimpleConfig;
    static load(config: SimpleConfig, tomlString: string[]): SimpleConfig;
    static parseValue(raw: string): any;
    static save(config: SimpleConfig, path: Path): void;
  }

}

declare module 'com.cursee.monolib.core.util' {
  class QuadFunction<I = any, J = any, K = any, L = any, R = any> {
    apply(var1: I, var2: J, var3: K, var4: L): R;
  }


  class QuintFunction<I = any, J = any, K = any, L = any, M = any, R = any> {
    apply(var1: I, var2: J, var3: K, var4: L, var5: M): R;
  }


  class TriFunction<I = any, J = any, K = any, R = any> {
    apply(var1: I, var2: J, var3: K): R;
  }

}

declare module 'com.cursee.monolib.mixin' {
  import { Map } from 'java.util';
  import { ParsedArgument } from 'com.mojang.brigadier.context';
  import { ImmutableList } from 'com.google.common.collect';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { FallingBlockEntity } from 'net.minecraft.world.entity.item';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  class AccessorCommandContext {
    monolib$getArguments(): Map<string, ParsedArgument>;
  }


  class AccessorWeightedRandomList<E = any> {
    monolib$getEntries(): ImmutableList<E>;
    monolib$getTotalWeight(): number;
  }


  class MinecraftMixin {
  }


  class NeoForgeAnvilBlockMixin {
    monolib$onBrokenAfterFall(level: Level, pos: BlockPos, fallingBlock: FallingBlockEntity, ci: CallbackInfo): void;
    monolib$onLand(level: Level, pos: BlockPos, state: BlockState, replaceableState: BlockState, fallingBlock: FallingBlockEntity, ci: CallbackInfo): void;
  }


  class NeoForgeTitleScreenMixin {
  }

}

declare module 'com.cursee.monolib.platform' {
  import { IPlatformHelper, IRegisterHelper } from 'com.cursee.monolib.platform.services';
  import { BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BiFunction, Function } from 'java.util.function';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Block } from 'net.minecraft.world.level.block';
  import { Context } from 'BlockEntityRendererProvider';
  import { BlockEntityRenderer } from 'net.minecraft.client.renderer.blockentity';
  import { EntityType, MobCategory, Entity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { Context as entityrendererprovider_Context } from 'EntityRendererProvider';
  import { EntityRenderer } from 'net.minecraft.client.renderer.entity';
  import { MenuType, AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { Integer, Class } from 'java.lang';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { FeatureFlagSet } from 'net.minecraft.world.flag';
  import { TriFunction } from 'com.cursee.monolib.core.util';
  import { Component } from 'net.minecraft.network.chat';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';

  interface NeoForgePlatformHelper extends IPlatformHelper {}
  class NeoForgePlatformHelper extends IPlatformHelper {
    get gameDirectory(): string;
    get platformName(): string;
    isClientSide(): boolean;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(modId: string): boolean;
  }


  interface NeoForgeRegisterHelper extends IRegisterHelper {}
  class NeoForgeRegisterHelper extends IRegisterHelper {
    createBlockEntityType<T extends BlockEntity>(blockEntityConstructor: BiFunction<BlockPos, BlockState, T>, ...validBlocks: Block[]): BlockEntityType<T>;
    createEntityType<T extends Entity>(key: string, entityConstructor: BiFunction<EntityType<T>, Level, T>, mobCategory: MobCategory): EntityType<T>;
    createMenuType<T extends AbstractContainerMenu>(menuConstructor: BiFunction<number, Inventory, T>, flagSet: FeatureFlagSet): MenuType<T>;
    registerBlockEntityRenderer<BE extends BlockEntity, T extends BlockEntityType<BE>, R extends BlockEntityRenderer<BE>>(blockEntityType: T, blockEntityRendererConstructor: Function<Context, R>): void;
    registerEntityRenderer<E extends Entity, T extends EntityType<E>, R extends EntityRenderer<E>>(entityType: T, entityRendererConstructor: Function<entityrendererprovider_Context, R>): void;
    registerScreen<M extends AbstractContainerMenu, S extends AbstractContainerScreen<M>>(menuType: MenuType<M>, screenConstructor: TriFunction<M, Inventory, Component, S>): void;
  }


  class Services {
    static readonly PLATFORM: IPlatformHelper;
    static readonly REGISTER: IRegisterHelper;
    static load<T>(clazz: Class<T>): T;
  }

}

declare module 'com.cursee.monolib.platform.services' {
  import { BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BiFunction, Function } from 'java.util.function';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Block } from 'net.minecraft.world.level.block';
  import { Context } from 'BlockEntityRendererProvider';
  import { BlockEntityRenderer } from 'net.minecraft.client.renderer.blockentity';
  import { EntityType, MobCategory, Entity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { Context as entityrendererprovider_Context } from 'EntityRendererProvider';
  import { EntityRenderer } from 'net.minecraft.client.renderer.entity';
  import { MenuType, AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { Integer } from 'java.lang';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { FeatureFlagSet } from 'net.minecraft.world.flag';
  import { TriFunction } from 'com.cursee.monolib.core.util';
  import { Component } from 'net.minecraft.network.chat';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';

  class IPlatformHelper {
    get environmentName(): string;
    get gameDirectory(): string;
    get platformName(): string;
    isClientSide(): boolean;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(var1: string): boolean;
  }


  class IRegisterHelper {
    createBlockEntityType<T extends BlockEntity>(var1: BiFunction<BlockPos, BlockState, T>, ...var2: Block[]): BlockEntityType<T>;
    createEntityType<T extends Entity>(var1: string, var2: BiFunction<EntityType<T>, Level, T>, var3: MobCategory): EntityType<T>;
    createMenuType<T extends AbstractContainerMenu>(var1: BiFunction<number, Inventory, T>, var2: FeatureFlagSet): MenuType<T>;
    registerBlockEntityRenderer<BE extends BlockEntity, T extends BlockEntityType<BE>, R extends BlockEntityRenderer<BE>>(var1: T, var2: Function<Context, R>): void;
    registerEntityRenderer<E extends Entity, T extends EntityType<E>, R extends EntityRenderer<E>>(var1: T, var2: Function<entityrendererprovider_Context, R>): void;
    registerScreen<M extends AbstractContainerMenu, S extends AbstractContainerScreen<M>>(var1: MenuType<M>, var2: TriFunction<M, Inventory, Component, S>): void;
  }

}

declare module 'com.cursee.monolib.util.toml' {
  import { AtomicInteger } from 'java.util.concurrent.atomic';
  import { Errors } from 'com.cursee.monolib.util.toml.Results';
  import { TimeZone, Map, List, Date, Set } from 'java.util';
  import { Key } from 'com.cursee.monolib.util.toml.Keys';
  import { File, InputStream, Reader, OutputStream, Writer } from 'java.io';
  import { Long, Boolean, Double } from 'java.lang';
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
    constructor(timeZone: TimeZone, showFractionalSeconds: boolean);
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
    static readonly INVALID: Identifier;
    get name(): string;
    isKey(): boolean;
    isTable(): boolean;
    isTableArray(): boolean;
  }


  class IdentifierConverter {
    static readonly IDENTIFIER_CONVERTER: IdentifierConverter;
    convert(s: string, index: AtomicInteger, context: Context): Identifier;
  }


  class IndentationPolicy {
    constructor(keyIndentation: number, tableIndentation: number, arrayDelimiterPadding: number);
  }


  interface InlineTableValueReader extends ValueReader {}
  class InlineTableValueReader extends ValueReader {
    canRead(s: string): boolean;
    read(s: string, sharedIndex: AtomicInteger, context: Context): any;
  }


  class Keys {
    static split(key: string): Key[];
  }


  interface LiteralStringValueReader extends ValueReader {}
  class LiteralStringValueReader extends ValueReader {
    canRead(s: string): boolean;
    read(s: string, index: AtomicInteger, context: Context): any;
  }


  interface MapValueWriter extends ValueWriter {}
  class MapValueWriter extends ValueWriter {
    static readonly MAP_VALUE_WRITER: ValueWriter;
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
    readonly errors: Errors;
    constructor();
    addValue(key: string, value: any, line: AtomicInteger): void;
    consume(): Map<string, any>;
    startTableArray(identifier: Identifier, line: AtomicInteger): void;
    startTables(id: Identifier, line: AtomicInteger): void;
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
    read(file: File): Toml;
    read(inputStream: InputStream): Toml;
    read(reader: Reader): Toml;
    read(otherToml: Toml): Toml;
    read(tomlString: string): Toml;
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
    static readonly VALUE_READERS: ValueReaders;
    convert(value: string, index: AtomicInteger, context: Context): any;
  }


  class ValueWriter {
    canWrite(var1: any): boolean;
    isPrimitiveType(): boolean;
    write(var1: any, var2: WriterContext): void;
  }


  class ValueWriters {
    static readonly WRITERS: ValueWriters;
    findWriterFor(value: any): ValueWriter;
  }


  class WriterContext {
    constructor(indentationPolicy: IndentationPolicy, datePolicy: DatePolicy, output: Writer);
  }

}

declare module 'com.cursee.monolib.util.toml.Container' {
  import { Container } from 'com.cursee.monolib.util.toml';

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

declare module 'com.cursee.monolib.util.toml.Keys' {
  class Key {
    readonly name: string;
    readonly index: number;
    readonly path: string;
  }

}

declare module 'com.cursee.monolib.util.toml.Results' {
  import { AtomicInteger } from 'java.util.concurrent.atomic';
  import { Identifier } from 'com.cursee.monolib.util.toml';

  class Errors {
    add(other: Errors): void;
    hasErrors(): boolean;
    heterogenous(key: string, line: number): void;
    invalidTextAfterIdentifier(identifier: Identifier, text: string, line: number): void;
    keyDuplicatesTable(key: string, line: AtomicInteger): void;
    tableDuplicatesKey(table: string, line: AtomicInteger): void;
    toString(): string;
  }

}

declare module 'com.cursee.monolib.util.toml.TomlWriter' {
  import { TimeZone } from 'java.util';
  import { TomlWriter } from 'com.cursee.monolib.util.toml';

  class Builder {
    build(): TomlWriter;
    indentTablesBy(spaces: number): Builder;
    indentValuesBy(spaces: number): Builder;
    padArrayDelimitersBy(spaces: number): Builder;
    showFractionalSeconds(): Builder;
    timeZone(timeZone: TimeZone): Builder;
  }

}