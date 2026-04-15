declare module 'net.darkhax.bookshelf.common.api.block' {
  import { PathType } from 'net.minecraft.world.level.pathfinder';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';

  class IBlockHooks {
    getPathfindingType(state: BlockState, context: BlockGetter, pos: BlockPos): PathType;
  }

}

declare module 'net.darkhax.bookshelf.common.api.commands.args' {
  import { ArgumentTypeInfo } from 'net.minecraft.commands.synchronization';
  import { ArgTemplate } from 'net.darkhax.bookshelf.common.api.commands.args.ArgumentSerializer';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { BiFunction, Function, Supplier } from 'java.util.function';
  import { CommandBuildContext, CommandSourceStack } from 'net.minecraft.commands';
  import { JsonObject } from 'com.google.gson';
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { CommandContext } from 'com.mojang.brigadier.context';
  import { RequiredArgumentBuilder } from 'com.mojang.brigadier.builder';
  import { StringReader } from 'com.mojang.brigadier';
  import { Collection } from 'java.util';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Suggestions, SuggestionsBuilder } from 'com.mojang.brigadier.suggestion';
  import { Template } from 'net.darkhax.bookshelf.common.api.commands.args.SingletonArgumentInfo';
  import { TagKey } from 'net.minecraft.tags';
  import { Registry } from 'net.minecraft.core';

  interface ArgumentSerializer<T extends ArgumentType<any> = any, V = any> extends ArgumentTypeInfo<T, ArgTemplate> {}
  class ArgumentSerializer<T extends ArgumentType<any> = any, V = any> extends ArgumentTypeInfo<T, ArgTemplate> {
    constructor(codec: MapCodec<V>, stream: StreamCodec<FriendlyByteBuf, V>, mapFunc: BiFunction<CommandBuildContext, V, T>, toData: Function<T, V>);
    deserializeFromNetwork(buf: FriendlyByteBuf): ArgTemplate<T, V>;
    serializeToJson(template: ArgTemplate<T, V>, json: JsonObject): void;
    serializeToNetwork(template: ArgTemplate<T, V>, buf: FriendlyByteBuf): void;
    unpack(t: T): ArgTemplate<T, V>;
  }


  interface FontArgument extends ArgumentType<ResourceLocation> {}
  class FontArgument extends ArgumentType<ResourceLocation> {
    static readonly ARGUMENT: FontArgument;
    static readonly SERIALIZER: ArgumentTypeInfo;
    static argument(): RequiredArgumentBuilder<CommandSourceStack, ResourceLocation>;
    static argument(argName: string): RequiredArgumentBuilder<CommandSourceStack, ResourceLocation>;
    static get(context: CommandContext<CommandSourceStack>): ResourceLocation;
    static get(argName: string, context: CommandContext<CommandSourceStack>): ResourceLocation;
    get examples(): Collection<string>;
    listSuggestions<S>(context: CommandContext<S>, builder: SuggestionsBuilder): CompletableFuture<Suggestions>;
    parse(reader: StringReader): ResourceLocation;
  }


  interface SingletonArgumentInfo<T extends ArgumentType<any> = any> extends ArgumentTypeInfo<T, Template> {}
  class SingletonArgumentInfo<T extends ArgumentType<any> = any> extends ArgumentTypeInfo<T, Template> {
    deserializeFromNetwork(buffer: FriendlyByteBuf): Template<T>;
    static of<T extends ArgumentType<any>>(argSupplier: Supplier<T>): SingletonArgumentInfo<T>;
    serializeToJson(tTemplate: Template<T>, jsonObject: JsonObject): void;
    serializeToNetwork(tTemplate: Template<T>, friendlyByteBuf: FriendlyByteBuf): void;
    unpack(template: T): Template<T>;
  }


  interface TagArgument<T = any> extends ArgumentType<TagKey> {}
  class TagArgument<T = any> extends ArgumentType<TagKey> {
    static readonly SERIALIZER: ArgumentSerializer;
    static arg<T>(context: CommandBuildContext, registry: ResourceKey<Registry<T>>): TagArgument<T>;
    static get<T>(argName: string, context: CommandContext<CommandSourceStack>, registry: ResourceKey<Registry<T>>): TagKey<T>;
    get examples(): Collection<string>;
    listSuggestions<S>(context: CommandContext<S>, builder: SuggestionsBuilder): CompletableFuture<Suggestions>;
    parse(reader: StringReader): TagKey<T>;
  }

}

declare module 'net.darkhax.bookshelf.common.api.commands.args.ArgumentSerializer' {
  import { Template } from 'ArgumentTypeInfo';
  import { CommandBuildContext } from 'net.minecraft.commands';
  import { ArgumentTypeInfo } from 'net.minecraft.commands.synchronization';

  interface ArgTemplate<T extends ArgumentType<any> = any, V = any> extends Template<T> {}
  class ArgTemplate<T extends ArgumentType<any> = any, V = any> extends Template<T> {
    instantiate(ctx: CommandBuildContext): T;
    type(): ArgumentTypeInfo<T, any>;
  }

}

declare module 'net.darkhax.bookshelf.common.api.commands.args.SingletonArgumentInfo' {
  import { Template as argumenttypeinfo_Template } from 'ArgumentTypeInfo';
  import { CommandBuildContext } from 'net.minecraft.commands';
  import { ArgumentTypeInfo } from 'net.minecraft.commands.synchronization';

  interface Template<T extends ArgumentType<any> = any> extends argumenttypeinfo_Template<T> {}
  class Template<T extends ArgumentType<any> = any> extends argumenttypeinfo_Template<T> {
    instantiate(ctx: CommandBuildContext): T;
    type(): ArgumentTypeInfo<T, any>;
  }

}

declare module 'net.darkhax.bookshelf.common.api.commands' {
  import { Command } from 'com.mojang.brigadier';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface IEnumCommand extends Command<CommandSourceStack> {}
  class IEnumCommand extends Command<CommandSourceStack> {
    get commandName(): string;
    requiredPermissionLevel(): PermissionLevel;
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

declare module 'net.darkhax.bookshelf.common.api.data.codecs' {
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { Class } from 'java.lang';

  interface EnumStreamCodec<T extends Enum<T> = any> extends StreamCodec<FriendlyByteBuf, T> {}
  class EnumStreamCodec<T extends Enum<T> = any> extends StreamCodec<FriendlyByteBuf, T> {
    constructor(clazz: Class<T>);
    decode(buf: FriendlyByteBuf): T;
    encode(buf: FriendlyByteBuf, toWrite: T): void;
  }

}

declare module 'net.darkhax.bookshelf.common.api.data.codecs.map' {
  import { Codec, MapCodec } from 'com.mojang.serialization';
  import { RecordCodecBuilder } from 'com.mojang.serialization.codecs';
  import { Function, IntFunction, Supplier } from 'java.util.function';
  import { List, Set, Optional } from 'java.util';
  import { Wrapper } from 'WeightedEntry';
  import { SimpleWeightedRandomList } from 'net.minecraft.util.random';
  import { Class, Enum } from 'java.lang';
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
    static nullable<T>(codec: Codec<T>, fieldName: string): MapCodec<T>;
    static optional<T>(codec: Codec<T>, name: string, fallback: Optional<T>, writesDefault: boolean): MapCodec<Optional<T>>;
    static xor<T>(first: Codec<T>, second: Codec<T>): Codec<T>;
  }


  interface RegistryMapCodecHelper<T = any> extends MapCodecHelper<Holder> {}
  class RegistryMapCodecHelper<T = any> extends MapCodecHelper<Holder> {
    static create<T>(registry: Registry<T>): RegistryMapCodecHelper<T>;
    static create<T>(key: ResourceKey<Registry<T>>): RegistryMapCodecHelper<T>;
    tag(): MapCodecHelper<TagKey<T>>;
  }

}

declare module 'net.darkhax.bookshelf.common.api.data.codecs.stream' {
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { List } from 'java.util';
  import { ByteBuf } from 'io.netty.buffer';

  class StreamCodecs {
    static readonly STRING: StreamCodec;
    static readonly ITEM_STACK_LIST: StreamCodec;
    static readonly INGREDIENT_NON_EMPTY: StreamCodec;
    static list<B extends ByteBuf, V>(baseCodec: StreamCodec<B, V>): StreamCodec<B, V[]>;
  }

}

declare module 'net.darkhax.bookshelf.common.api.data.conditions' {
  import { Codec, MapCodec } from 'com.mojang.serialization';
  import { MapCodecHelper } from 'net.darkhax.bookshelf.common.api.data.codecs.map';
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

declare module 'net.darkhax.bookshelf.common.api.data.enchantment' {
  import { Enum } from 'java.lang';
  import { TagKey } from 'net.minecraft.tags';
  import { Enchantment } from 'net.minecraft.world.item.enchantment';
  import { ItemStack } from 'net.minecraft.world.item';
  import { List } from 'java.util';

  interface EnchantmentLevel extends Enum<EnchantmentLevel> {}
  class EnchantmentLevel extends Enum<EnchantmentLevel> {
    static readonly HIGHEST: EnchantmentLevel;
    static readonly LOWEST: EnchantmentLevel;
    static readonly FIRST: EnchantmentLevel;
    static readonly CUMULATIVE: EnchantmentLevel;
    get(enchType: TagKey<Enchantment>, stack: ItemStack): number;
    static valueOf(name: string): EnchantmentLevel;
    static values(): EnchantmentLevel[];
  }

}

declare module 'net.darkhax.bookshelf.common.api.data.ingredient' {
  import { ItemStack } from 'net.minecraft.world.item';
  import { List } from 'java.util';

  class IngredientLogic<T extends IngredientLogic<T> = any> {
    get allMatchingStacks(): ItemStack[];
    requiresTesting(): boolean;
    test(var1: ItemStack): boolean;
  }

}

declare module 'net.darkhax.bookshelf.common.api.data' {
  class ISidedRecipeManager {
    bookshelf$setLogicalClient(): void;
    bookshelf$setLogicalServer(): void;
  }

}

declare module 'net.darkhax.bookshelf.common.api.entity.villager' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface MerchantTier extends Enum<MerchantTier> {}
  class MerchantTier extends Enum<MerchantTier> {
    static readonly NOVICE: MerchantTier;
    static readonly APPRENTICE: MerchantTier;
    static readonly JOURNEYMAN: MerchantTier;
    static readonly EXPERT: MerchantTier;
    static readonly MASTER: MerchantTier;
    get requiredExp(): number;
    static valueOf(name: string): MerchantTier;
    static values(): MerchantTier[];
  }

}

declare module 'net.darkhax.bookshelf.common.api.function' {
  import { Supplier, Consumer, Function } from 'java.util.function';
  import { Registry } from 'net.minecraft.core';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Level } from 'net.minecraft.world.level';
  import { Map } from 'java.util';
  import { RecipeHolder, RecipeType, Recipe } from 'net.minecraft.world.item.crafting';
  import { Entity, LivingEntity } from 'net.minecraft.world.entity';
  import { CompoundTag } from 'net.minecraft.nbt';

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


  class QuadConsumer<P1 = any, P2 = any, P3 = any, P4 = any> {
    accept(var1: P1, var2: P2, var3: P3, var4: P4): void;
    andThen(after: QuadConsumer<P1, P2, P3, P4>): QuadConsumer<P1, P2, P3, P4>;
  }


  interface ReloadableCache<T = any> extends Function<Level, T> {}
  class ReloadableCache<T = any> extends Function<Level, T> {
    static readonly EMPTY: ReloadableCache;
    apply(level: Level): T;
    apply(level: Level, consumer: Consumer<T>): void;
    static entity(entityData: CompoundTag, level: Level): ReloadableCache<Entity>;
    ifPresent(level: Level, consumer: Consumer<T>): void;
    invalidate(): void;
    isCached(): boolean;
    static living(entityData: CompoundTag, level: Level): ReloadableCache<LivingEntity>;
    map<R>(level: Level, mapper: Function<T, R>): R;
    static of<T>(supplier: Supplier<T>): ReloadableCache<T>;
    static of<T>(delegate: Function<Level, T>): ReloadableCache<T>;
    static of<T>(registry: ResourceKey<Registry<T>>, id: ResourceLocation, level: Level): ReloadableCache<T>;
    static of<T extends Recipe<any>>(type: RecipeType<T>, level: Level): ReloadableCache<Map<ResourceLocation, RecipeHolder<T>>>;
    static recipes<T extends Recipe<any>>(type: Supplier<RecipeType<T>>, level: Level): ReloadableCache<Map<ResourceLocation, RecipeHolder<T>>>;
  }


  interface SidedReloadableCache<T = any> extends Function<Level, T> {}
  class SidedReloadableCache<T = any> extends Function<Level, T> {
    constructor(client: ReloadableCache<T>, server: ReloadableCache<T>);
    apply(level: Level): T;
    apply(level: Level, consumer: Consumer<T>): void;
    getCache(level: Level): ReloadableCache<T>;
    ifPresent(level: Level, consumer: Consumer<T>): void;
    invalidate(level: Level): void;
    isCached(level: Level): boolean;
    map<R>(level: Level, mapper: Function<T, R>): R;
    static of<T>(cacheFunc: Function<Level, T>): SidedReloadableCache<T>;
    static recipes<T extends Recipe<any>>(type: Supplier<RecipeType<T>>): SidedReloadableCache<Map<ResourceLocation, RecipeHolder<T>>>;
  }


  class TriConsumer<P1 = any, P2 = any, P3 = any> {
    accept(var1: P1, var2: P2, var3: P3): void;
    andThen(after: TriConsumer<P1, P2, P3>): TriConsumer<P1, P2, P3>;
  }


  class TriFunction<P1 = any, P2 = any, P3 = any, R = any> {
    andThen(after: Function<R, R>): TriFunction<P1, P2, P3, R>;
    apply(var1: P1, var2: P2, var3: P3): R;
  }

}

declare module 'net.darkhax.bookshelf.common.api.item' {
  import { CreativeModeTab, ItemStack } from 'net.minecraft.world.item';
  import { Consumer } from 'java.util.function';

  class IItemHooks {
    addCreativeTabForms(tab: CreativeModeTab, displayItems: Consumer<ItemStack>): void;
  }

}

declare module 'net.darkhax.bookshelf.common.api.loot' {
  import { RegistryAccess } from 'net.minecraft.core';
  import { LootPoolEntryContainer } from 'net.minecraft.world.level.storage.loot.entries';
  import { Consumer } from 'java.util.function';
  import { ItemStack } from 'net.minecraft.world.item';
  import { List } from 'java.util';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';
  import { Either } from 'com.mojang.datafixers.util';
  import { ResourceKey } from 'net.minecraft.resources';

  class LootPoolEntryDescriber {
    getPotentialDrops(var1: RegistryAccess, var2: LootPoolEntryContainer, var3: Consumer<ItemStack>): void;
  }


  class LootPoolEntryDescriptions {
    static readonly EMPTY: LootPoolEntryDescriber;
    static readonly ITEM: LootPoolEntryDescriber;
    static readonly LOOT_TABLE: LootPoolEntryDescriber;
    static readonly DYNAMIC: LootPoolEntryDescriber;
    static readonly TAG: LootPoolEntryDescriber;
    static readonly COMPOSITE: LootPoolEntryDescriber;
    static readonly ITEM_STACK: LootPoolEntryDescriber;
    static getPotentialItems(registries: RegistryAccess, table: Either<ResourceKey<LootTable>, LootTable>, consumer: Consumer<ItemStack>): void;
    static getPotentialItems(registries: RegistryAccess, table: LootTable, consumer: Consumer<ItemStack>): void;
    static getPotentialItems(registries: RegistryAccess, entries: LootPoolEntryContainer[], collector: Consumer<ItemStack>): void;
    static getPotentialItems(registries: RegistryAccess, entry: LootPoolEntryContainer, collector: Consumer<ItemStack>): void;
    static getUniqueItems(registries: RegistryAccess, table: LootTable, stack: ItemStack): ItemStack[];
  }

}

declare module 'net.darkhax.bookshelf.common.api.menu.data' {
  import { ContainerData } from 'net.minecraft.world.inventory';
  import { BlockPos } from 'net.minecraft.core';

  interface BlockPosData extends ContainerData {}
  class BlockPosData extends ContainerData {
    constructor(pos: BlockPos);

    constructor(pos: BlockPos, mutable: boolean);
    get(slot: number): number;
    get count(): number;
    get pos(): BlockPos;
    static readPos(data: ContainerData): BlockPos;
    set(slot: number, value: number): void;
  }

}

declare module 'net.darkhax.bookshelf.common.api.menu.slot' {
  import { Slot } from 'net.minecraft.world.inventory';
  import { Container } from 'net.minecraft.world';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Predicate, BiConsumer } from 'java.util.function';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Pair } from 'com.mojang.datafixers.util';
  import { Player } from 'net.minecraft.world.entity.player';

  interface InputSlot extends Slot {}
  class InputSlot extends Slot {
    constructor(container: Container, slot: number, x: number, y: number, emptyTexture: ResourceLocation);

    constructor(container: Container, slot: number, x: number, y: number, emptyTexture: ResourceLocation, canPlace: Predicate<ItemStack>);
    get maxStackSize(): number;
    get noItemIcon(): Pair<ResourceLocation, ResourceLocation>;
    mayPlace(stack: ItemStack): boolean;
  }


  interface OutputSlot extends Slot {}
  class OutputSlot extends Slot {
    constructor(potContainer: Container, slot: number, x: number, y: number);

    constructor(potContainer: Container, slot: number, x: number, y: number, takeFunc: BiConsumer<Player, ItemStack>);
    mayPlace(stack: ItemStack): boolean;
    onTake(player: Player, stack: ItemStack): void;
  }

}

declare module 'net.darkhax.bookshelf.common.api.network' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { Type } from 'CustomPacketPayload';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { ServerPlayer, ServerLevel } from 'net.minecraft.server.level';
  import { MinecraftServer } from 'net.minecraft.server';
  import { PlayerList } from 'net.minecraft.server.players';

  interface AbstractPacket<T extends CustomPacketPayload = any> extends IPacket<T> {}
  class AbstractPacket<T extends CustomPacketPayload = any> extends IPacket<T> {
    constructor(id: ResourceLocation, codec: StreamCodec<RegistryFriendlyByteBuf, T>);

    constructor(id: ResourceLocation, codec: StreamCodec<RegistryFriendlyByteBuf, T>, direction: Destination);
    destination(): Destination;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, T>;
    type(): Type<T>;
  }


  interface Destination extends Enum<Destination> {}
  class Destination extends Enum<Destination> {
    static readonly SERVER_TO_CLIENT: Destination;
    static readonly CLIENT_TO_SERVER: Destination;
    static readonly BIDIRECTIONAL: Destination;
    handledByClient(): boolean;
    handledByServer(): boolean;
    static valueOf(name: string): Destination;
    static values(): Destination[];
  }


  class INetworkHandler {
    canSendPacket(recipient: ServerPlayer, payload: CustomPacketPayload): boolean;
    canSendPacket(recipient: ServerPlayer, packet: IPacket<any>): boolean;
    canSendPacket(var1: ServerPlayer, var2: ResourceLocation): boolean;
    register<T extends CustomPacketPayload>(var1: IPacket<T>): void;
    sendToPlayer<T extends CustomPacketPayload>(var1: ServerPlayer, var2: T): void;
    sendToServer<T extends CustomPacketPayload>(var1: T): void;
  }


  class IPacket<T extends CustomPacketPayload = any> {
    destination(): Destination;
    handle(var1: ServerPlayer, var2: boolean, var3: T): void;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, T>;
    toAllPlayers(level: ServerLevel, payload: T): void;
    toAllPlayers(server: MinecraftServer, payload: T): void;
    toAllPlayers(playerList: PlayerList, payload: T): void;
    toPlayer(recipient: ServerPlayer, payload: T): void;
    toServer(payload: T): void;
    type(): Type<T>;
  }

}

declare module 'net.darkhax.bookshelf.common.api' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface PhysicalSide extends Enum<PhysicalSide> {}
  class PhysicalSide extends Enum<PhysicalSide> {
    static readonly CLIENT: PhysicalSide;
    static readonly SERVER: PhysicalSide;
    isClient(): boolean;
    isServer(): boolean;
    static valueOf(name: string): PhysicalSide;
    static values(): PhysicalSide[];
  }

}

declare module 'net.darkhax.bookshelf.common.api.registry' {
  import { Register, RegisterItem, RegisterRecipeType, ArgumentRegister, ItemComponentRegister, RegisterPotPatterns, MenuRegister, RegisterPacket, RegisterVillagerTrades, RegisterParticleTypes, RegisterLootPoolAdditions, RegisterCatVariant, RegisterItemTab, RegisterIngredient, RegisterLootDescription, RegisterMenuScreen, RegisterParticleProviders, RegisterBlockEntityRenderer } from 'net.darkhax.bookshelf.common.api.registry.register';
  import { MobEffect } from 'net.minecraft.world.effect';
  import { Block } from 'net.minecraft.world.level.block';
  import { Builder } from 'EntityType';
  import { Item } from 'net.minecraft.world.item';
  import { Builder as blockentitytype_Builder } from 'BlockEntityType';
  import { RecipeSerializer } from 'net.minecraft.world.item.crafting';
  import { Attribute } from 'net.minecraft.world.entity.ai.attributes';
  import { Type } from 'ItemSubPredicate';
  import { CriterionTrigger } from 'net.minecraft.advancements';
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack, CommandBuildContext } from 'net.minecraft.commands';
  import { CommandSelection } from 'Commands';
  import { MapCodec } from 'com.mojang.serialization';
  import { ILoadCondition } from 'net.darkhax.bookshelf.common.api.data.conditions';
  import { LootPoolEntryContainer } from 'net.minecraft.world.level.storage.loot.entries';
  import { LootItemCondition } from 'net.minecraft.world.level.storage.loot.predicates';
  import { LootItemFunction } from 'net.minecraft.world.level.storage.loot.functions';
  import { Potion } from 'net.minecraft.world.item.alchemy';
  import { Builder as potionbrewing_Builder } from 'PotionBrewing';
  import { BiConsumer } from 'java.util.function';
  import { RenderType } from 'net.minecraft.client.renderer';

  class IContentProvider {
    bindBlockEntityRenderer(registry: RegisterBlockEntityRenderer): void;
    bindRenderLayers(registry: BiConsumer<Block, RenderType>): void;
    contentNamespace(): string;
    registerAttributes(registry: Register<Attribute>): void;
    registerBlockEntities(registry: Register<blockentitytype_Builder<any>>): void;
    registerBlocks(registry: Register<Block>): void;
    registerBrewing(registry: potionbrewing_Builder): void;
    registerCatVariants(registry: RegisterCatVariant): void;
    registerCommandArguments(registry: ArgumentRegister): void;
    registerCommands(dispatcher: CommandDispatcher<CommandSourceStack>, context: CommandBuildContext, selection: CommandSelection): void;
    registerCriteriaTriggers(registry: Register<CriterionTrigger<any>>): void;
    registerEntities(registry: Register<Builder<any>>): void;
    registerIngredientTypes(registry: RegisterIngredient): void;
    registerItemComponents(registry: ItemComponentRegister): void;
    registerItemSubPredicates(registry: Register<Type<any>>): void;
    registerItemTabs(registry: RegisterItemTab): void;
    registerItems(registry: Register<Item>): void;
    registerItems(registry: RegisterItem): void;
    registerLoadConditions(registry: Register<MapCodec<ILoadCondition>>): void;
    registerLootConditions(registry: Register<MapCodec<LootItemCondition>>): void;
    registerLootDescriptions(registry: RegisterLootDescription): void;
    registerLootEntryType(register: Register<MapCodec<LootPoolEntryContainer>>): void;
    registerLootFunctions(registry: Register<MapCodec<LootItemFunction>>): void;
    registerLootPoolAdditions(registry: RegisterLootPoolAdditions): void;
    registerMenuScreens(registry: RegisterMenuScreen): void;
    registerMenus(registry: MenuRegister): void;
    registerMobEffects(registry: Register<MobEffect>): void;
    registerPackets(registry: RegisterPacket): void;
    registerParticleFactories(registry: RegisterParticleProviders): void;
    registerParticleTypes(registry: RegisterParticleTypes): void;
    registerPotPatterns(registry: RegisterPotPatterns): void;
    registerPotions(registry: Register<Potion>): void;
    registerRecipeSerializers(registry: Register<RecipeSerializer<any>>): void;
    registerRecipeTypes(registry: RegisterRecipeType): void;
    registerTrades(registry: RegisterVillagerTrades): void;
  }

}

declare module 'net.darkhax.bookshelf.common.api.registry.register' {
  import { Class, Integer } from 'java.lang';
  import { ArgumentTypeInfo } from 'net.minecraft.commands.synchronization';
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { Template } from 'ArgumentTypeInfo';
  import { UnaryOperator } from 'java.util.function';
  import { Builder } from 'DataComponentType';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { MenuType, AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { ScreenFactory } from 'net.darkhax.bookshelf.common.api.registry.register.RegisterMenuScreen';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { VillagerProfession } from 'net.minecraft.world.entity.npc';
  import { ItemListing } from 'VillagerTrades';
  import { MerchantTier } from 'net.darkhax.bookshelf.common.api.entity.villager';
  import { Map, List } from 'java.util';
  import { Multimap } from 'com.google.common.collect';

  class ArgumentRegister {
    accept<A extends ArgumentType<any>, T extends Template<A>>(var1: string, var2: Class, var3: ArgumentTypeInfo<A, T>): void;
  }


  class ItemComponentRegister {
    accept<T>(var1: string, var2: UnaryOperator<Builder<T>>): void;
    accept<T>(var1: ResourceLocation, var2: UnaryOperator<Builder<T>>): void;
  }


  class RegisterMenuScreen {
    bind<M extends AbstractContainerMenu, U extends Screen>(type: MenuType<M>, factory: ScreenFactory<M, U>): void;
  }


  class RegisterVillagerTrades {
    addCommonWanderingTrade(trade: ItemListing): void;
    addRareWanderingTrade(trade: ItemListing): void;
    addTrade(profession: VillagerProfession, tier: number, trade: ItemListing): void;
    addTrade(profession: VillagerProfession, tier: MerchantTier, trade: ItemListing): void;
    addWanderingTrade(trade: ItemListing, isRare: boolean): void;
    get commonWanderingTrades(): ItemListing[];
    get rareWanderingTrades(): ItemListing[];
    get villagerTrades(): Map<VillagerProfession, Multimap<number, ItemListing>>;
  }

}

declare module 'net.darkhax.bookshelf.common.api.registry.register.MenuRegister' {
  import { Inventory } from 'net.minecraft.world.entity.player';

  class ClientMenuFactory<T extends AbstractContainerMenu = any> {
    create(var1: number, var2: Inventory): T;
  }

}

declare module 'net.darkhax.bookshelf.common.api.registry.register.RegisterLootPoolAdditions' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { LootPoolAddition } from 'net.darkhax.bookshelf.common.api.data.loot.modifiers';

  class RegisterFunc {
    register(var1: ResourceLocation, var2: number, var3: number, var4: LootPoolAddition): void;
  }

}

declare module 'net.darkhax.bookshelf.common.api.registry.register.RegisterMenuScreen' {
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';

  class ScreenFactory<T extends AbstractContainerMenu = any, U extends Screen = any> {
    create(var1: T, var2: Inventory, var3: Component): U;
  }

}

declare module 'net.darkhax.bookshelf.common.api.registry.register.RegisterParticleProviders' {
  import { ParticleProvider, SpriteSet } from 'net.minecraft.client.particle';
  import { SimpleParticleType } from 'net.minecraft.core.particles';

  class SimpleParticleProviderBuilder {
    build<T extends SpriteSet>(var1: T): ParticleProvider<SimpleParticleType>;
  }

}

declare module 'net.darkhax.bookshelf.common.api.service' {
  import { IPlatformHelper, IGameplayHelper } from 'net.darkhax.bookshelf.common.api.util';
  import { CachedSupplier } from 'net.darkhax.bookshelf.common.api.function';
  import { INetworkHandler } from 'net.darkhax.bookshelf.common.api.network';
  import { Class } from 'java.lang';
  import { List } from 'java.util';

  class Services {
    static readonly PLATFORM: IPlatformHelper;
    static readonly CONTENT_PROVIDERS: CachedSupplier;
    static readonly GAMEPLAY: IGameplayHelper;
    static readonly NETWORK: INetworkHandler;
    static load<T>(clazz: Class<T>): T;
    static loadMany<T>(clazz: Class<T>): T[];
  }

}

declare module 'net.darkhax.bookshelf.common.api.text.font' {
  import { Enum } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List } from 'java.util';
  import { MutableComponent } from 'net.minecraft.network.chat';

  interface BuiltinFonts extends Enum<BuiltinFonts> {}
  class BuiltinFonts extends Enum<BuiltinFonts> {
    static readonly DEFAULT: BuiltinFonts;
    static readonly ALT: BuiltinFonts;
    static readonly ILLAGER: BuiltinFonts;
    static readonly UNIFORM: BuiltinFonts;
    identifier(): ResourceLocation;
    static valueOf(name: string): BuiltinFonts;
    static values(): BuiltinFonts[];
  }


  class IFontEntry {
    description(): MutableComponent;
    displayName(): MutableComponent;
    identifier(): ResourceLocation;
    preview(): MutableComponent;
  }

}

declare module 'net.darkhax.bookshelf.common.api.text.format' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { MutableComponent, Component } from 'net.minecraft.network.chat';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class IPropertyFormat {
    format(property: Component, value: Component): MutableComponent;
    formatKey(): ResourceLocation;
  }


  interface PropertyFormat extends Enum<PropertyFormat> {}
  class PropertyFormat extends Enum<PropertyFormat> {
    static readonly RIGHT: PropertyFormat;
    static readonly CENTER: PropertyFormat;
    static readonly LEFT: PropertyFormat;
    static readonly SPACED: PropertyFormat;
    static readonly NONE: PropertyFormat;
    formatKey(): ResourceLocation;
    static valueOf(name: string): PropertyFormat;
    static values(): PropertyFormat[];
  }

}

declare module 'net.darkhax.bookshelf.common.api.text.unit' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { PropertyFormat } from 'net.darkhax.bookshelf.common.api.text.format';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class IUnit {
    abbreviated(): MutableComponent;
    format(amount: number): MutableComponent;
    format(amount: number, format: PropertyFormat): MutableComponent;
    plural(): MutableComponent;
    unitKey(): ResourceLocation;
    unitName(): MutableComponent;
  }


  interface Units extends Enum<Units> {}
  class Units extends Enum<Units> {
    static readonly TICK: Units;
    static readonly NANOSECOND: Units;
    static readonly MILLISECOND: Units;
    static readonly SECOND: Units;
    static readonly MINUTE: Units;
    static readonly HOUR: Units;
    static readonly DAY: Units;
    static readonly WEEK: Units;
    static readonly MONTH: Units;
    static readonly YEAR: Units;
    unitKey(): ResourceLocation;
    static valueOf(name: string): Units;
    static values(): Units[];
  }

}

declare module 'net.darkhax.bookshelf.common.api.util' {
  import { LiteralArgumentBuilder, ArgumentBuilder } from 'com.mojang.brigadier.builder';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { Class, Enum, Boolean, Integer, Iterable } from 'java.lang';
  import { PermissionLevel } from 'net.darkhax.bookshelf.common.api.commands';
  import { CommandContext } from 'com.mojang.brigadier.context';
  import { Supplier, Predicate, BiFunction, Function } from 'java.util.function';
  import { Entity } from 'net.minecraft.world.entity';
  import { HolderSet, Registry, BlockPos, Direction, NonNullList } from 'net.minecraft.core';
  import { Provider } from 'HolderLookup';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { TagKey } from 'net.minecraft.tags';
  import { ListTag } from 'net.minecraft.nbt';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Optional, Set, Random, Map, Collection, Iterator } from 'java.util';
  import { ByteBuf } from 'io.netty.buffer';
  import { RecipeSerializer, Recipe } from 'net.minecraft.world.item.crafting';
  import { MapCodec } from 'com.mojang.serialization';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { Either } from 'com.mojang.datafixers.util';
  import { RandomSource } from 'net.minecraft.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { Container } from 'net.minecraft.world';
  import { Builder } from 'BlockEntityType';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { MenuType, AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { ScreenFactory } from 'net.darkhax.bookshelf.common.api.registry.register.RegisterMenuScreen';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Level } from 'net.minecraft.world.level';
  import { Builder as creativemodetab_Builder } from 'CreativeModeTab';
  import { Path } from 'java.nio.file';
  import { File } from 'java.io';
  import { PhysicalSide, ModEntry } from 'net.darkhax.bookshelf.common.api';
  import { ClientMenuFactory } from 'net.darkhax.bookshelf.common.api.registry.register.MenuRegister';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { Matrix4f } from 'org.joml';
  import { DecimalFormat } from 'java.text';
  import { Vec3, AABB } from 'net.minecraft.world.phys';
  import { VoxelShape } from 'net.minecraft.world.phys.shapes';
  import { MutableComponent, Component, HoverEvent } from 'net.minecraft.network.chat';

  class CommandHelper {
    static buildFromEnum<T extends Enum<T>>(parent: string, enumClass: Class<T>): LiteralArgumentBuilder<CommandSourceStack>;
    static buildFromEnum<T extends Enum<T>>(parent: ArgumentBuilder<CommandSourceStack, any>, enumClass: Class<T>): void;
    static getArgument<T, C>(argument: string, context: CommandContext<C>, argType: Class<T>, fallback: Supplier<T>): T;
    static getBooleanArg(argName: string, ctx: CommandContext<CommandSourceStack>, fallback: Supplier<boolean>): boolean;
    static getBooleanArg(argName: string, ctx: CommandContext<CommandSourceStack>): boolean;
    static getEntity(argName: string, ctx: CommandContext<CommandSourceStack>, fallback: Supplier<Entity>): Entity;
    static getEntityOrSender(argName: string, ctx: CommandContext<CommandSourceStack>): Entity;
    static getLowestLevel<T extends Enum<T>>(enumClass: Class<T>): PermissionLevel;
    static hasArgument<T>(argument: string, context: CommandContext<T>): boolean;
    static hasArgument<T, C>(argument: string, context: CommandContext<C>, argType: Class<T>): boolean;
  }


  class DataHelper {
    static containerSubList(list: ListTag, slots: Predicate<number>): ListTag;
    static getTagOrEmpty<T>(provider: Provider, registryKey: ResourceKey<Registry<T>>, tag: TagKey<T>): HolderSet<T>;
    static optionalStream<B extends ByteBuf, V>(streamCodec: StreamCodec<B, V>): StreamCodec<B, Optional<V>>;
    static recipeSerializer<T extends Recipe<any>>(codec: MapCodec<T>, stream: StreamCodec<RegistryFriendlyByteBuf, T>): RecipeSerializer<T>;
    static subList(list: ListTag, from: number, to: number): ListTag;
  }


  class FunctionHelper {
    static test<T>(input: Optional<T>, test: Predicate<T>): boolean;
    static unpack<T>(either: Either<T, T>): T;
  }


  class IGameplayHelper {
    static readonly RNG: RandomSource;
    addItem(stack: ItemStack, inventory: NonNullList<ItemStack>, slots: number[]): ItemStack;
    bindMenu<M extends AbstractContainerMenu, U extends Screen>(var1: MenuType<M>, var2: ScreenFactory<M, U>): void;
    blockEntityBuilder<T extends BlockEntity>(var1: BiFunction<BlockPos, BlockState, T>, ...var2: Block[]): Builder<T>;
    dropRemainders(level: Level, pos: BlockPos, old: ItemStack): void;
    getContainer(level: ServerLevel, pos: BlockPos): Container;
    getCraftingRemainder(input: ItemStack): ItemStack;
    inventoryInsert(level: ServerLevel, pos: BlockPos, side: Direction, stack: ItemStack): ItemStack;
    tabBuilder(): creativemodetab_Builder;
  }


  class IPlatformHelper {
    get configDirectory(): File;
    get configPath(): Path;
    get gameDirectory(): File;
    get gamePath(): Path;
    get loadedMods(): Set<ModEntry>;
    get modsDirectory(): File;
    get modsPath(): Path;
    get name(): string;
    get physicalSide(): PhysicalSide;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(var1: string): boolean;
    isPhysicalClient(): boolean;
    isTestingEnvironment(): boolean;
    unsafeRegisterMenu<T extends AbstractContainerMenu>(var1: ResourceLocation, var2: ClientMenuFactory<T>): void;
  }


  class IRenderHelper {
    static readonly GET: IRenderHelper;
    blockSprite(texturePath: ResourceLocation): TextureAtlasSprite;
    renderBox(builder: VertexConsumer, stack: PoseStack, sprite: TextureAtlasSprite, light: number, overlay: number, color: number[]): void;
    renderBox(builder: VertexConsumer, stack: PoseStack, sprite: TextureAtlasSprite, light: number, overlay: number, x1: number, x2: number, y1: number, y2: number, z1: number, z2: number, color: number[]): void;
    renderBox(builder: VertexConsumer, pos: Matrix4f, sprite: TextureAtlasSprite, light: number, overlay: number, x1: number, x2: number, y1: number, y2: number, z1: number, z2: number, color: number[]): void;
    renderFace(builder: VertexConsumer, pos: Matrix4f, sprite: TextureAtlasSprite, side: Direction, light: number, overlay: number, x1: number, x2: number, y1: number, y2: number, z1: number, z2: number, color: number[]): void;
    renderFluidBox(var1: PoseStack, var2: FluidState, var3: Level, var4: BlockPos, var5: MultiBufferSource, var6: number, var7: number): void;
    unpackARGB(color: number): number[];
  }


  class MathsHelper {
    static readonly RANDOM: Random;
    static readonly RANDOM_SOURCE: RandomSource;
    static readonly DECIMAL_2: DecimalFormat;
    static average(...values: number[]): number;
    static boundsForPixels(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): AABB;
    static createHorizontalShapes(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): Map<Direction, VoxelShape>;
    static decodeBytesFromInt(data: number[]): number[];
    static distance(first: Vec3, second: Vec3): number;
    static encodeBytesToInt(bytes: number[]): number[];
    static inRange(min: number, max: number, value: number): boolean;
    static nextInt(rng: Random, min: number, max: number): number;
    static nextInt(rng: RandomSource, min: number, max: number): number;
    static percentChance(chance: number): boolean;
    static percentage(value: number, total: number): number;
    static pixelSize(pixels: number): number;
    static randomOffset(startPos: BlockPos, rng: RandomSource, rangeX: number, rangeY: number, rangeZ: number): BlockPos;
    static randomOffsetHorizontal(startPos: BlockPos, rng: RandomSource, range: number): BlockPos;
    static rotateShape(facing: Direction, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): VoxelShape;
    static round(value: number, places: number): number;
  }


  class TextHelper {
    static addUnique(components: Collection<Component>, toAdd: Component): boolean;
    static applyFont(text: Component, font: ResourceLocation): Component;
    static copyText(text: string): MutableComponent;
    static formatCollection<T>(collection: Collection<T>): string;
    static formatCollection<T>(collection: Collection<T>, formatter: Function<T, string>, delimiter: string): string;
    static formatDuration(ticks: number): MutableComponent;
    static formatDuration(ticks: number, level: Level): MutableComponent;
    static formatDuration(ticks: number, includeHover: boolean, level: Level): MutableComponent;
    static formatDuration(ticks: number, showTicksOnHover: boolean, tickRate: number): MutableComponent;
    static fromResourceLocation(prefix: string, suffix: string, location: ResourceLocation, ...args: any[]): MutableComponent;
    static get registeredFonts(): Set<ResourceLocation>;
    static getPossibleMatches(input: string, candidates: Iterable<string>): Set<string>;
    static getPossibleMatches(input: string, candidates: Iterable<string>, threshold: number): Set<string>;
    static getTagName(tag: TagKey<any>): string;
    static hoverEvent(entity: Entity): HoverEvent;
    static join(separator: Component, ...toJoin: Component[]): MutableComponent;
    static join(separator: Component, toJoin: Collection<Component>): MutableComponent;
    static join(separator: Component, toJoin: Iterator<Component>): MutableComponent;
    static joinUnique(separator: Component, toJoin: Collection<Component>): MutableComponent;
    static lookupTranslation(key: string, ...args: any[], s: string, o: any[]): MutableComponent;
    static lookupTranslation(key: string, fallback: MutableComponent, ...args: any[], s: string, o: any[]): MutableComponent;
    static lookupTranslation(key: string, fallback: BiFunction<string, any[], MutableComponent>, ...args: any[]): MutableComponent;
    static lookupTranslationWithAlias(id: ResourceLocation, ...keys: string[]): MutableComponent;
    static lookupTranslationWithAlias(keys: string[], ...params: any[]): MutableComponent;
    static mutable(component: Component): MutableComponent;
    static setCopyText(component: MutableComponent, copy: string): MutableComponent;
    static withHover(base: Component, hover: Component): MutableComponent;
    static withHover(base: Component, hover: Entity): MutableComponent;
    static withHover(base: Component, hover: ItemStack): MutableComponent;
    static withHover(base: Component, hover: HoverEvent): MutableComponent;
  }


  class TickAccumulator {
    constructor(defaultValue: number);
    get ticks(): number;
    reset(): void;
    set ticks(ticks: number);
    tick(amount: number): void;
    tickDown(level: Level): void;
    tickUp(level: Level): void;
  }

}

declare module 'net.darkhax.bookshelf.common.impl' {
  import { IContentProvider } from 'net.darkhax.bookshelf.common.api.registry';
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack, CommandBuildContext } from 'net.minecraft.commands';
  import { CommandSelection } from 'Commands';
  import { ArgumentRegister, RegisterIngredient, Register, RegisterLootDescription } from 'net.darkhax.bookshelf.common.api.registry.register';
  import { MapCodec } from 'com.mojang.serialization';
  import { ILoadCondition } from 'net.darkhax.bookshelf.common.api.data.conditions';
  import { Type } from 'ItemSubPredicate';
  import { CriterionTrigger } from 'net.minecraft.advancements';
  import { LootPoolEntryContainer } from 'net.minecraft.world.level.storage.loot.entries';
  import { Logger } from 'org.slf4j';
  import { Gson } from 'com.google.gson';
  import { WeakReference } from 'java.lang.ref';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface BookshelfContent extends IContentProvider {}
  class BookshelfContent extends IContentProvider {
    contentNamespace(): string;
    registerCommandArguments(register: ArgumentRegister): void;
    registerCommands(dispatcher: CommandDispatcher<CommandSourceStack>, context: CommandBuildContext, selection: CommandSelection): void;
    registerCriteriaTriggers(registry: Register<CriterionTrigger<any>>): void;
    registerIngredientTypes(registry: RegisterIngredient): void;
    registerItemSubPredicates(registry: Register<Type<any>>): void;
    registerLoadConditions(registry: Register<MapCodec<ILoadCondition>>): void;
    registerLootDescriptions(registry: RegisterLootDescription): void;
    registerLootEntryType(register: Register<MapCodec<LootPoolEntryContainer>>): void;
  }


  class BookshelfMod {
    static get instance(): BookshelfMod;
    init(): void;
  }


  class Constants {
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static readonly LOG: Logger;
    static readonly GSON_PRETTY: Gson;
    static SERVER_RECIPE_MANAGER: WeakReference;
    static SERVER_REVISION: number;
    static CLIENT_RECIPE_MANAGER: WeakReference;
    static CLIENT_REVISION: number;
    static id(path: string): ResourceLocation;
  }

}

declare module 'net.darkhax.bookshelf.common.impl.command' {
  import { LiteralArgumentBuilder } from 'com.mojang.brigadier.builder';
  import { CommandSourceStack, CommandBuildContext } from 'net.minecraft.commands';
  import { Enum } from 'java.lang';
  import { CommandContext } from 'com.mojang.brigadier.context';
  import { PermissionLevel } from 'net.darkhax.bookshelf.common.api.commands';
  import { List } from 'java.util';

  class BlockTagToItemTagCommand {
    static build(context: CommandBuildContext): LiteralArgumentBuilder<CommandSourceStack>;
  }


  interface DebugCommands extends Enum<DebugCommands> {}
  class DebugCommands extends Enum<DebugCommands> {
    static readonly MISSING_TAG_NAMES: DebugCommands;
    static readonly MISSING_BLOCK_DROPS: DebugCommands;
    static readonly LOOT_POOL_HASH: DebugCommands;
    static readonly SIMPLE_TABLES: DebugCommands;
    static build(context: CommandBuildContext): LiteralArgumentBuilder<CommandSourceStack>;
    get commandName(): string;
    requiredPermissionLevel(): PermissionLevel;
    run(context: CommandContext<CommandSourceStack>): number;
    static valueOf(name: string): DebugCommands;
    static values(): DebugCommands[];
  }


  class EnchantCommand {
    static build(context: CommandBuildContext): LiteralArgumentBuilder<CommandSourceStack>;
  }


  interface HandCommand extends Enum<HandCommand> {}
  class HandCommand extends Enum<HandCommand> {
    static readonly ID: HandCommand;
    static readonly STRING: HandCommand;
    static readonly INGREDIENT: HandCommand;
    static readonly STACK_JSON: HandCommand;
    static readonly STACK_NBT: HandCommand;
    static readonly COMPONENTS: HandCommand;
    static readonly TAGS: HandCommand;
    static build(context: CommandBuildContext): LiteralArgumentBuilder<CommandSourceStack>;
    get commandName(): string;
    run(context: CommandContext<CommandSourceStack>): number;
    static valueOf(name: string): HandCommand;
    static values(): HandCommand[];
  }


  class RenameCommand {
    static build(context: CommandBuildContext): LiteralArgumentBuilder<CommandSourceStack>;
  }


  class StructureCommand {
    static build(): LiteralArgumentBuilder<CommandSourceStack>;
  }


  class TranslateCommand {
    static build(context: CommandBuildContext): LiteralArgumentBuilder<CommandSourceStack>;
  }

}

declare module 'net.darkhax.bookshelf.common.impl.command.DebugCommands' {
  import { MinecraftServer } from 'net.minecraft.server';
  import { StringJoiner } from 'java.util';

  class DebugTask {
    getDebugOutput(var1: MinecraftServer, var2: StringJoiner): void;
  }

}

declare module 'net.darkhax.bookshelf.common.impl.command.HandCommand' {
  import { Component } from 'net.minecraft.network.chat';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ServerLevel } from 'net.minecraft.server.level';

  class ItemFormat {
    formatItem(var1: ItemStack, var2: ServerLevel): Component;
  }

}

declare module 'net.darkhax.bookshelf.common.impl.data.conditions' {
  import { ILoadCondition, ConditionType } from 'net.darkhax.bookshelf.common.api.data.conditions';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { CachedSupplier } from 'net.darkhax.bookshelf.common.api.function';
  import { MapCodec } from 'com.mojang.serialization';
  import { List, Set } from 'java.util';
  import { Registry } from 'net.minecraft.core';

  interface And extends ILoadCondition {}
  class And extends ILoadCondition {
    static readonly TYPE_ID: ResourceLocation;
    static readonly TYPE: CachedSupplier;
    static readonly CODEC: MapCodec;
    allowLoading(): boolean;
    get conditions(): ILoadCondition[];
    get type(): ConditionType;
  }


  interface ModLoaded extends ILoadCondition {}
  class ModLoaded extends ILoadCondition {
    static readonly TYPE_ID: ResourceLocation;
    static readonly TYPE: CachedSupplier;
    static CODEC: MapCodec;
    allowLoading(): boolean;
    get requiredMods(): Set<string>;
    get type(): ConditionType;
  }


  interface Not extends ILoadCondition {}
  class Not extends ILoadCondition {
    static readonly TYPE_ID: ResourceLocation;
    static readonly TYPE: CachedSupplier;
    static readonly CODEC: MapCodec;
    allowLoading(): boolean;
    get conditions(): ILoadCondition[];
    get type(): ConditionType;
  }


  interface OnPlatform extends ILoadCondition {}
  class OnPlatform extends ILoadCondition {
    static readonly TYPE_ID: ResourceLocation;
    static readonly TYPE: CachedSupplier;
    static readonly CODEC: MapCodec;
    allowLoading(): boolean;
    get requiredPlatform(): string;
    get type(): ConditionType;
  }


  interface Or extends ILoadCondition {}
  class Or extends ILoadCondition {
    static readonly TYPE_ID: ResourceLocation;
    static readonly TYPE: CachedSupplier;
    static readonly CODEC: MapCodec;
    allowLoading(): boolean;
    get conditions(): ILoadCondition[];
    get type(): ConditionType;
  }


  interface RegistryContains<T = any> extends ILoadCondition {}
  class RegistryContains<T = any> extends ILoadCondition {
    static readonly BLOCK: ResourceLocation;
    static readonly ITEM: ResourceLocation;
    static readonly ENTITY: ResourceLocation;
    static readonly BLOCK_ENTITY: ResourceLocation;
    allowLoading(): boolean;
    get requiredEntries(): Set<ResourceLocation>;
    get type(): ConditionType;
    static of<RT>(typeId: ResourceLocation, registry: Registry<RT>): MapCodec<RegistryContains<RT>>;
  }

}

declare module 'net.darkhax.bookshelf.common.impl.data.criterion.trigger' {
  import { SimpleCriterionTrigger } from 'net.minecraft.advancements.critereon';
  import { Instance } from 'net.darkhax.bookshelf.common.impl.data.criterion.trigger.AdvancementTrigger';
  import { Codec } from 'com.mojang.serialization';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { AdvancementHolder } from 'net.minecraft.advancements';

  interface AdvancementTrigger extends SimpleCriterionTrigger<Instance> {}
  class AdvancementTrigger extends SimpleCriterionTrigger<Instance> {
    static readonly TRIGGER: AdvancementTrigger;
    codec(): Codec<Instance>;
    trigger(player: ServerPlayer, advancement: AdvancementHolder): void;
  }

}

declare module 'net.darkhax.bookshelf.common.impl.data.ingredient' {
  import { IngredientLogic } from 'net.darkhax.bookshelf.common.api.data.ingredient';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { List } from 'java.util';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { ItemStack } from 'net.minecraft.world.item';
  import { TagKey } from 'net.minecraft.tags';
  import { Block } from 'net.minecraft.world.level.block';
  import { CachedSupplier } from 'net.darkhax.bookshelf.common.api.function';

  interface AllOfIngredient extends IngredientLogic<AllOfIngredient> {}
  class AllOfIngredient extends IngredientLogic<AllOfIngredient> {
    static readonly CODEC: MapCodec;
    static readonly STREAM: StreamCodec;
    constructor(ingredients: Ingredient[]);
    test(stack: ItemStack): boolean;
  }


  interface BlockTagIngredient extends IngredientLogic<BlockTagIngredient> {}
  class BlockTagIngredient extends IngredientLogic<BlockTagIngredient> {
    static readonly CODEC: MapCodec;
    static readonly STREAM: StreamCodec;
    constructor(blockTags: TagKey<Block>[]);
    get allMatchingStacks(): ItemStack[];
    test(stack: ItemStack): boolean;
  }


  interface EitherIngredient extends IngredientLogic<EitherIngredient> {}
  class EitherIngredient extends IngredientLogic<EitherIngredient> {
    static readonly CODEC: MapCodec;
    static readonly STREAM: StreamCodec;
    constructor(ingredients: Ingredient[]);
    test(stack: ItemStack): boolean;
  }


  interface FalseIngredient extends IngredientLogic<FalseIngredient> {}
  class FalseIngredient extends IngredientLogic<FalseIngredient> {
    static readonly SINGLETON: FalseIngredient;
    static readonly CODEC: MapCodec;
    static readonly STREAM: StreamCodec;
    static readonly INSTANCE: CachedSupplier;
    test(stack: ItemStack): boolean;
  }


  interface ModIdIngredient extends IngredientLogic<ModIdIngredient> {}
  class ModIdIngredient extends IngredientLogic<ModIdIngredient> {
    static readonly CODEC: MapCodec;
    static readonly STREAM: StreamCodec;
    constructor(modIds: string[]);
    test(stack: ItemStack): boolean;
  }

}

declare module 'net.darkhax.bookshelf.common.impl.data.loot.entries' {
  import { LootPoolSingletonContainer, LootPoolEntryType } from 'net.minecraft.world.level.storage.loot.entries';
  import { MapCodec } from 'com.mojang.serialization';
  import { ItemStack } from 'net.minecraft.world.item';
  import { List } from 'java.util';
  import { LootItemCondition } from 'net.minecraft.world.level.storage.loot.predicates';
  import { LootItemFunction } from 'net.minecraft.world.level.storage.loot.functions';

  interface LootItemStack extends LootPoolSingletonContainer {}
  class LootItemStack extends LootPoolSingletonContainer {
    static readonly CODEC: MapCodec;
    get baseStack(): ItemStack;
    get type(): LootPoolEntryType;
    static of(baseStack: ItemStack, weight: number): LootItemStack;
    static of(baseStack: ItemStack, weight: number, quality: number, conditions: LootItemCondition[], functions: LootItemFunction[]): LootItemStack;
  }

}

declare module 'net.darkhax.bookshelf.common.impl.data.loot.modifiers' {
  import { Codec, DataResult, DynamicOps } from 'com.mojang.serialization';
  import { Pair } from 'com.mojang.datafixers.util';
  import { Integer } from 'java.lang';
  import { Supplier } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';

  interface FingerprintCodec<T = any> extends Codec<T> {}
  class FingerprintCodec<T = any> extends Codec<T> {
    constructor(delegate: Codec<T>);
    decode<T1>(ops: DynamicOps<T1>, input: T1): DataResult<Pair<T, T1>>;
    encode<T1>(input: T, ops: DynamicOps<T1>, prefix: T1): DataResult<T1>;
  }


  class ILootPoolHooks {
    bookshelf$getHash(): number;
    bookshelf$matches(toMatch: number): boolean;
    bookshelf$setHash(var1: number): void;
  }


  class LootModificationHandler {
    static readonly HANDLER: Supplier;
    processLootTable(tableId: ResourceLocation, table: LootTable): void;
  }

}

declare module 'net.darkhax.bookshelf.common.impl.resources' {
  import { Supplier } from 'java.util.function';

  class ExtendedText {
    static INSTANCE: Supplier;
    get(key: string): string;
    has(key: string): boolean;
  }

}

declare module 'net.darkhax.bookshelf.common.mixin.access.block' {
  import { Component } from 'net.minecraft.network.chat';
  import { BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { BlockEntityRendererProvider } from 'net.minecraft.client.renderer.blockentity';
  import { ItemLike } from 'net.minecraft.world.level';

  class AccessorBannerBlockEntity {
    setName(var1: Component): void;
  }


  class AccessorBaseContainerBlockEntity {
    bookshelf$name(var1: Component): void;
  }


  class AccessorBlockEntityRenderers {
    static bookshelf$register(type: BlockEntityType, renderProvider: BlockEntityRendererProvider): void;
  }


  class AccessorCropBlock {
    bookshelf$getSeed(): ItemLike;
  }

}

declare module 'net.darkhax.bookshelf.common.mixin.access.client' {
  import { Map } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { FontSet, FontManager } from 'net.minecraft.client.gui.font';

  class AccessorFontManager {
    bookshelf$getFonts(): Map<ResourceLocation, FontSet>;
  }


  class AccessorMinecraft {
    bookshelf$getFontManager(): FontManager;
  }

}

declare module 'net.darkhax.bookshelf.common.mixin.access.client.gui' {
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';

  class AccessorAbstractWidget {
    static bookshelf$renderScrollingString(guiGraphics: GuiGraphics, font: Font, text: Component, minX: number, minY: number, maxX: number, maxY: number, color: number): void;
  }

}

declare module 'net.darkhax.bookshelf.common.mixin.access.entity' {
  import { HoverEvent } from 'net.minecraft.network.chat';

  class AccessorEntity {
    bookshelf$createHoverEvent(): HoverEvent;
  }

}

declare module 'net.darkhax.bookshelf.common.mixin.access.level' {
  import { Multimap } from 'com.google.common.collect';
  import { RecipeType, RecipeHolder } from 'net.minecraft.world.item.crafting';

  class AccessorRecipeManager {
    bookshelf$byTypeMap(): Multimap<RecipeType<any>, RecipeHolder<any>>;
  }

}

declare module 'net.darkhax.bookshelf.common.mixin.access.loot' {
  import { List, Optional } from 'java.util';
  import { LootPoolEntryContainer, LootItem } from 'net.minecraft.world.level.storage.loot.entries';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Holder } from 'net.minecraft.core';
  import { Item } from 'net.minecraft.world.item';
  import { LootItemCondition } from 'net.minecraft.world.level.storage.loot.predicates';
  import { LootItemFunction } from 'net.minecraft.world.level.storage.loot.functions';
  import { NumberProvider } from 'net.minecraft.world.level.storage.loot.providers.number';
  import { LootPool, LootTable } from 'net.minecraft.world.level.storage.loot';
  import { Either } from 'com.mojang.datafixers.util';
  import { TagKey } from 'net.minecraft.tags';

  class AccessorCompositeEntryBase {
    bookshelf$children(): LootPoolEntryContainer[];
  }


  class AccessorDynamicLoot {
    bookshelf$name(): ResourceLocation;
  }


  class AccessorLootItem {
    static bookshelf$create(item: Holder<Item>, weight: number, quality: number, conditions: LootItemCondition[], functions: LootItemFunction[]): LootItem;
    bookshelf$item(): Holder<Item>;
  }


  class AccessorLootPool {
    bookshelf$bonusRolls(): NumberProvider;
    bookshelf$conditions(): LootItemCondition[];
    bookshelf$entries(): LootPoolEntryContainer[];
    bookshelf$rolls(): NumberProvider;
    bookshelf$setEntries(var1: LootPoolEntryContainer[]): void;
    functions(): LootItemFunction[];
  }


  class AccessorLootPoolSingletonContainer {
    bookshelf$quality(): number;
    bookshelf$weight(): number;
  }


  class AccessorLootTable {
    bookshelf$functions(): LootItemFunction[];
    bookshelf$pools(): LootPool[];
    bookshelf$randomSequence(): Optional<ResourceLocation>;
  }


  class AccessorNestedLootTable {
    bookshelf$contents(): Either<ResourceKey<LootTable>, LootTable>;
  }


  class AccessorTagEntry {
    bookshelf$expand(): boolean;
    bookshelf$tag(): TagKey<Item>;
  }

}

declare module 'net.darkhax.bookshelf.common.mixin.access.particles' {
  import { SimpleParticleType } from 'net.minecraft.core.particles';

  class AccessSimpleParticleType {
    static init(overrideLimit: boolean): SimpleParticleType;
  }

}

declare module 'net.darkhax.bookshelf.common.mixin.patch.advancement' {
  import { AdvancementProgress, AdvancementHolder } from 'net.minecraft.advancements';

  class MixinCriteriaTriggers {
  }


  class MixinItemSubPredicates {
  }


  class MixinPlayerAdvancements {
    getOrStartProgress(var1: AdvancementHolder): AdvancementProgress;
  }

}

declare module 'net.darkhax.bookshelf.common.mixin.patch.block' {
  class MixinBlock {
  }


  class MixinBlockEntityType {
  }


  class MixinDecoratedPotPatterns {
  }


  class MixinItemBlockRenderTypes {
  }

}

declare module 'net.darkhax.bookshelf.common.mixin.patch.client' {
  import { Minecraft } from 'net.minecraft.client';
  import { Connection } from 'net.minecraft.network';
  import { CommonListenerCookie } from 'net.minecraft.client.multiplayer';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  class MixinClientPacketListener {
    onInit(mc: Minecraft, connection: Connection, cookie: CommonListenerCookie, ci: CallbackInfo): void;
  }

}

declare module 'net.darkhax.bookshelf.common.mixin.patch.commands' {
  import { Class } from 'java.lang';
  import { ArgumentTypeInfo } from 'net.minecraft.commands.synchronization';
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { Template } from 'ArgumentTypeInfo';

  class MixinArgumentTypeInfos {
    accept<A extends ArgumentType<any>, T extends Template<A>>(id: string, argumentClass: Class, info: ArgumentTypeInfo<A, T>): void;
  }


  class MixinCommands {
  }

}

declare module 'net.darkhax.bookshelf.common.mixin.patch.component' {
  import { UnaryOperator } from 'java.util.function';
  import { Builder } from 'DataComponentType';
  import { ResourceLocation } from 'net.minecraft.resources';

  class MixinDataComponents {
    accept<T>(name: string, builder: UnaryOperator<Builder<T>>): void;
    accept<T>(id: ResourceLocation, builder: UnaryOperator<Builder<T>>): void;
  }

}

declare module 'net.darkhax.bookshelf.common.mixin.patch.effect' {
  class MixinEffects {
  }

}

declare module 'net.darkhax.bookshelf.common.mixin.patch.entity' {
  class MixinAttributes {
  }


  class MixinEntityType {
  }

}

declare module 'net.darkhax.bookshelf.common.mixin.patch.gui' {
  class MixinMenuType {
  }

}

declare module 'net.darkhax.bookshelf.common.mixin.patch.gui.screens' {
  class MixinMenuScreens {
  }

}

declare module 'net.darkhax.bookshelf.common.mixin.patch.item' {
  class MixinCreativeModeTab {
  }


  class MixinItems {
  }


  class MixinRecipeSerializer {
  }


  class MixinRecipeType {
  }

}

declare module 'net.darkhax.bookshelf.common.mixin.patch.level' {
  import { ISidedRecipeManager } from 'net.darkhax.bookshelf.common.api.data';

  interface MixinRecipeManager extends ISidedRecipeManager {}
  class MixinRecipeManager extends ISidedRecipeManager {
    bookshelf$setLogicalClient(): void;
    bookshelf$setLogicalServer(): void;
  }


  class MixinWalkNodeEvaluator {
  }

}

declare module 'net.darkhax.bookshelf.common.mixin.patch.locale' {
  import { CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Boolean } from 'java.lang';

  class MixinClientLanguage {
    getOrDefault(key: string, fallback: string, cbi: CallbackInfoReturnable<string>): void;
    has(key: string, cbi: CallbackInfoReturnable<boolean>): void;
  }

}

declare module 'net.darkhax.bookshelf.common.mixin.patch.loot' {
  import { ILootPoolHooks } from 'net.darkhax.bookshelf.common.impl.data.loot.modifiers';
  import { Codec } from 'com.mojang.serialization';
  import { Integer } from 'java.lang';

  class MixinLootDataType {
  }


  class MixinLootItemConditions {
  }


  class MixinLootItemFunctions {
  }


  interface MixinLootPool extends ILootPoolHooks {}
  class MixinLootPool extends ILootPoolHooks {
    static CODEC: Codec;
    bookshelf$getHash(): number;
    bookshelf$setHash(fingerprint: number): void;
  }


  class MixinLootPoolEntries {
  }

}

declare module 'net.darkhax.bookshelf.common.mixin.patch' {
  class MixinCatVariant {
  }

}

declare module 'net.darkhax.bookshelf.common.mixin.patch.packs' {
  class MixinSimpleJsonResourceReloadListener {
  }

}

declare module 'net.darkhax.bookshelf.common.mixin.patch.potions' {
  class MixinPotionBrewing {
  }


  class MixinPotions {
  }

}

declare module 'net.darkhax.bookshelf.common.mixin.patch.registries' {
  class MixinBuiltInRegistries {
  }

}

declare module 'net.darkhax.bookshelf.common.mixin.patch.server' {
  class MixinReloadableServerResources {
  }

}

declare module 'net.darkhax.bookshelf.neoforge.impl.data' {
  import { ICustomIngredient, IngredientType } from 'net.neoforged.neoforge.common.crafting';
  import { Supplier } from 'java.util.function';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Stream } from 'java.util.stream';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { IngredientLogic } from 'net.darkhax.bookshelf.common.api.data.ingredient';

  interface NeoForgeIngredient<T extends IngredientLogic<T> = any> extends ICustomIngredient {}
  class NeoForgeIngredient<T extends IngredientLogic<T> = any> extends ICustomIngredient {
    constructor(logic: T, type: Supplier<IngredientType<any>>);
    get items(): Stream<ItemStack>;
    get type(): IngredientType<any>;
    isSimple(): boolean;
    static makeIngredientType<T extends IngredientLogic<T>>(id: ResourceLocation, codec: MapCodec<T>, stream: StreamCodec<RegistryFriendlyByteBuf, T>): IngredientType<NeoForgeIngredient<T>>;
    test(stack: ItemStack): boolean;
  }

}

declare module 'net.darkhax.bookshelf.neoforge.impl' {
  import { IEventBus } from 'net.neoforged.bus.api';

  class NeoForgeMod {
    constructor(eventBus: IEventBus);
  }


  class NeoForgeModClient {
    constructor(bus: IEventBus);
  }

}

declare module 'net.darkhax.bookshelf.neoforge.impl.network' {
  import { INetworkHandler, IPacket } from 'net.darkhax.bookshelf.common.api.network';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { RegisterPayloadHandlersEvent } from 'net.neoforged.neoforge.network.event';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface NeoForgeNetworkHandler extends INetworkHandler {}
  class NeoForgeNetworkHandler extends INetworkHandler {
    canSendPacket(recipient: ServerPlayer, payloadId: ResourceLocation): boolean;
    canSendPacket(recipient: ServerPlayer, payload: CustomPacketPayload): boolean;
    register<T extends CustomPacketPayload>(packet: IPacket<T>): void;
    registerPayloadHandlers(event: RegisterPayloadHandlersEvent): void;
    sendToPlayer<T extends CustomPacketPayload>(recipient: ServerPlayer, payload: T): void;
    sendToServer<T extends CustomPacketPayload>(payload: T): void;
  }

}

declare module 'net.darkhax.bookshelf.neoforge.impl.util' {
  import { IGameplayHelper, IPlatformHelper, IRenderHelper } from 'net.darkhax.bookshelf.common.api.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { Builder } from 'BlockEntityType';
  import { BiFunction } from 'java.util.function';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { MenuType, AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { ScreenFactory } from 'net.darkhax.bookshelf.common.api.registry.register.RegisterMenuScreen';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Builder as creativemodetab_Builder } from 'CreativeModeTab';
  import { Path } from 'java.nio.file';
  import { PhysicalSide, ModEntry } from 'net.darkhax.bookshelf.common.api';
  import { Set } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ClientMenuFactory } from 'net.darkhax.bookshelf.common.api.registry.register.MenuRegister';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { Level } from 'net.minecraft.world.level';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';

  interface NeoForgeGameplayHelper extends IGameplayHelper {}
  class NeoForgeGameplayHelper extends IGameplayHelper {
    bindMenu<M extends AbstractContainerMenu, U extends Screen>(type: MenuType<M>, factory: ScreenFactory<M, U>): void;
    blockEntityBuilder<T extends BlockEntity>(factory: BiFunction<BlockPos, BlockState, T>, ...validBlocks: Block[]): Builder<T>;
    getCraftingRemainder(input: ItemStack): ItemStack;
    inventoryInsert(level: ServerLevel, pos: BlockPos, side: Direction, stack: ItemStack): ItemStack;
    tabBuilder(): creativemodetab_Builder;
  }


  interface NeoForgePlatformHelper extends IPlatformHelper {}
  class NeoForgePlatformHelper extends IPlatformHelper {
    get configPath(): Path;
    get gamePath(): Path;
    get loadedMods(): Set<ModEntry>;
    get modsPath(): Path;
    get name(): string;
    get physicalSide(): PhysicalSide;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(modId: string): boolean;
    isTestingEnvironment(): boolean;
    unsafeRegisterMenu<T extends AbstractContainerMenu>(id: ResourceLocation, clientFactory: ClientMenuFactory<T>): void;
  }


  interface NeoForgeRenderHelper extends IRenderHelper {}
  class NeoForgeRenderHelper extends IRenderHelper {
    renderFluidBox(pose: PoseStack, fluidState: FluidState, level: Level, pos: BlockPos, bufferSource: MultiBufferSource, light: number, overlay: number): void;
  }

}

declare module 'net.darkhax.bookshelf.neoforge.mixin.access.gui.screen' {
  import { MenuType, AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { ScreenConstructor } from 'MenuScreens';
  import { Screen } from 'net.minecraft.client.gui.screens';

  class AccessorMenuScreens {
    static register<M extends AbstractContainerMenu, U extends Screen>(type: MenuType<M>, factory: ScreenConstructor<M, U>): void;
  }

}