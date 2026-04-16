declare module 'net.silentchaos512.gems.block' {
  import { Block, StainedGlassBlock, FlowerBlock, DropExperienceBlock, FlowerPotBlock } from 'net.minecraft.world.level.block';
  import { Gems, IGem } from 'net.silentchaos512.gems.util';
  import { Properties } from 'BlockBehaviour';
  import { MutableComponent, Component } from 'net.minecraft.network.chat';
  import { Integer } from 'java.lang';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { LevelReader, Level, BlockGetter, ItemLike } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { State } from 'net.silentchaos512.gems.block.GemLampBlock';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { RandomSource } from 'net.minecraft.util';
  import { IntProvider } from 'net.minecraft.util.valueproviders';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { TooltipContext } from 'Item';
  import { List } from 'java.util';
  import { Supplier } from 'java.util.function';

  interface GemBlock extends IGemBlock, Block {}
  class GemBlock extends IGemBlock {
    constructor(gem: Gems, translationKey: string, properties: Properties);
    get gem(): Gems;
    get gemBlockName(): MutableComponent;
    get name(): MutableComponent;
  }


  interface GemGlassBlock extends IGemBlock, StainedGlassBlock {}
  class GemGlassBlock extends IGemBlock {
    constructor(gem: Gems, properties: Properties);
    get gem(): Gems;
    get gemBlockName(): MutableComponent;
    get name(): MutableComponent;
    getBeaconColorMultiplier(state: BlockState, world: LevelReader, pos: BlockPos, beaconPos: BlockPos): number;
  }


  interface GemLampBlock extends GemBlock {}
  class GemLampBlock extends GemBlock {
    constructor(gem: Gems, lampState: State, properties: Properties);
    neighborChanged(state: BlockState, worldIn: Level, pos: BlockPos, blockIn: Block, fromPos: BlockPos, p_220069_6_: boolean): void;
    onPlace(state: BlockState, worldIn: Level, pos: BlockPos, oldState: BlockState, p_220082_5_: boolean): void;
    tick(state: BlockState, world: ServerLevel, pos: BlockPos, random: RandomSource): void;
  }


  interface GemOreBlock extends IGemBlock, OreBlockSG {}
  class GemOreBlock extends IGemBlock {
    constructor(gem: Gems, harvestLevelIn: number, translationKey: string, properties: Properties);
    get gem(): Gems;
    get gemBlockName(): MutableComponent;
    get name(): MutableComponent;
  }


  interface GlowroseBlock extends IGemBlock, FlowerBlock {}
  class GlowroseBlock extends IGemBlock {
    constructor(gem: Gems, properties: Properties);
    get gem(): Gems;
    get gemBlockName(): MutableComponent;
    get name(): MutableComponent;
    getLightEmission(state: BlockState, level: BlockGetter, pos: BlockPos): number;
  }


  interface IGemBlock extends IGem {}
  class IGemBlock extends IGem {
    get gemBlockName(): MutableComponent;
  }


  interface OreBlockSG extends DropExperienceBlock {}
  class OreBlockSG extends DropExperienceBlock {
    constructor(droppedItemForTooltip: ItemLike, harvestLevelForTooltip: number, xpDrop: IntProvider, builder: Properties);
    appendHoverText(stack: ItemStack, tooltipContext: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    get droppedItemForTooltip(): ItemLike;
  }


  interface PottedGlowroseBlock extends FlowerPotBlock {}
  class PottedGlowroseBlock extends FlowerPotBlock {
    constructor(gem: Gems, flower: Supplier<GlowroseBlock>, properties: Properties);
    get name(): MutableComponent;
    getLightEmission(state: BlockState, level: BlockGetter, pos: BlockPos): number;
  }

}

declare module 'net.silentchaos512.gems.block.GemLampBlock' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface State extends Enum<State> {}
  class State extends Enum<State> {
    static readonly OFF: State;
    static readonly ON: State;
    static readonly INVERTED_ON: State;
    static readonly INVERTED_OFF: State;
    hasItem(): boolean;
    inverted(): boolean;
    lit(): boolean;
    static valueOf(name: string): State;
    static values(): State[];
    withPower(powered: boolean): State;
  }

}

declare module 'net.silentchaos512.gems.block.teleporter' {
  import { BaseEntityBlock } from 'net.minecraft.world.level.block';
  import { DirectionProperty, BooleanProperty } from 'net.minecraft.world.level.block.state.properties';
  import { Properties } from 'BlockBehaviour';
  import { Function, BiFunction } from 'java.util.function';
  import { BlockEntity, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { Gems } from 'net.silentchaos512.gems.util';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { IGemBlock } from 'net.silentchaos512.gems.block';
  import { DimPos } from 'net.silentchaos512.lib.util';

  interface AbstractTeleporterBlock extends BaseEntityBlock {}
  class AbstractTeleporterBlock extends BaseEntityBlock {
    static readonly FACING: DirectionProperty;
    static readonly TRIGGERED: BooleanProperty;
    constructor(properties: Properties, constructor: Function<Properties, AbstractTeleporterBlock>);
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
  }


  interface GemRedstoneTeleporterBlock extends GemTeleporterBlock {}
  class GemRedstoneTeleporterBlock extends GemTeleporterBlock {
    constructor(gem: Gems, properties: Properties);
    get gemBlockName(): MutableComponent;
  }


  interface GemTeleporterBlock extends IGemBlock, AbstractTeleporterBlock {}
  class GemTeleporterBlock extends IGemBlock {
    constructor(gem: Gems, properties: Properties);

    constructor(gem: Gems, properties: Properties, constructor: BiFunction<Gems, Properties, GemTeleporterBlock>, p: Properties);
    get gem(): Gems;
    get gemBlockName(): MutableComponent;
  }


  interface TeleporterAnchorBlock extends AbstractTeleporterBlock {}
  class TeleporterAnchorBlock extends AbstractTeleporterBlock {
    constructor(properties: Properties);
  }


  interface TeleporterBlockEntity extends BlockEntity {}
  class TeleporterBlockEntity extends BlockEntity {
    static readonly DESTINATION_TAG: string;
    constructor(type: BlockEntityType<any>, pos: BlockPos, blockState: BlockState);

    constructor(pos: BlockPos, blockState: BlockState);
    get destination(): DimPos;
    set destination(newDestination: DimPos);
  }

}

declare module 'net.silentchaos512.gems.client' {
  import { ModContainer } from 'net.neoforged.fml';

  class SilentGemsClient {
    constructor(modContainer: ModContainer);
  }

}

declare module 'net.silentchaos512.gems.core' {
  import { Post } from 'EntityTickEvent';

  class GemsEvents {
    static readonly COFFEE_TIMER_DELAY: number;
    static onEntityTick(event: Post): void;
  }

}

declare module 'net.silentchaos512.gems.data.client' {
  import { BlockStateProvider, ItemModelProvider } from 'net.neoforged.neoforge.client.model.generators';
  import { DataGenerator } from 'net.minecraft.data';
  import { ExistingFileHelper } from 'net.neoforged.neoforge.common.data';

  interface GemsBlockStateProvider extends BlockStateProvider {}
  class GemsBlockStateProvider extends BlockStateProvider {
    constructor(gen: DataGenerator, exFileHelper: ExistingFileHelper);
  }


  interface GemsItemModelProvider extends ItemModelProvider {}
  class GemsItemModelProvider extends ItemModelProvider {
    constructor(generator: DataGenerator, existingFileHelper: ExistingFileHelper);
  }

}

declare module 'net.silentchaos512.gems.data' {
  import { GatherDataEvent } from 'net.neoforged.neoforge.data.event';
  import { BlockTagsProvider, ExistingFileHelper, DatapackBuiltinEntriesProvider } from 'net.neoforged.neoforge.common.data';
  import { TagsProvider, EntityTypeTagsProvider, ItemTagsProvider } from 'net.minecraft.data.tags';
  import { DamageType } from 'net.minecraft.world.damagesource';
  import { PackOutput, DataGenerator } from 'net.minecraft.data';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';
  import { LootTableProvider } from 'net.minecraft.data.loot';
  import { List, Collection, Map } from 'java.util';
  import { SubProviderEntry } from 'LootTableProvider';
  import { MaterialsProviderBase } from 'net.silentchaos512.gear.api.data.material';
  import { HarvestTier } from 'net.silentchaos512.gear.api.property';
  import { Gems } from 'net.silentchaos512.gems.util';
  import { TraitsProviderBase, TraitBuilder } from 'net.silentchaos512.gear.api.data.trait';
  import { Function } from 'java.util.function';
  import { ConfiguredFeature } from 'net.minecraft.world.level.levelgen.feature';
  import { Block } from 'net.minecraft.world.level.block';
  import { RuleTest } from 'net.minecraft.world.level.levelgen.structure.templatesystem';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { PlacedFeature, PlacementModifier } from 'net.minecraft.world.level.levelgen.placement';
  import { Holder } from 'net.minecraft.core';
  import { BootstrapContext } from 'net.minecraft.data.worldgen';
  import { BiomeModifier } from 'net.neoforged.neoforge.common.world';

  class DataGenerators {
    static gatherData(event: GatherDataEvent): void;
  }


  interface GemsBlockTagsProvider extends BlockTagsProvider {}
  class GemsBlockTagsProvider extends BlockTagsProvider {
    constructor(event: GatherDataEvent);
  }


  interface GemsDamageTypeTagsProvider extends TagsProvider<DamageType> {}
  class GemsDamageTypeTagsProvider extends TagsProvider<DamageType> {
  }


  interface GemsEntityTypeTagsProvider extends EntityTypeTagsProvider {}
  class GemsEntityTypeTagsProvider extends EntityTypeTagsProvider {
    constructor(pOutput: PackOutput, pProvider: CompletableFuture<Provider>, existingFileHelper: ExistingFileHelper);
  }


  interface GemsItemTagsProvider extends ItemTagsProvider {}
  class GemsItemTagsProvider extends ItemTagsProvider {
    constructor(event: GatherDataEvent, blocks: BlockTagsProvider);
  }


  interface GemsLootTableProvider extends LootTableProvider {}
  class GemsLootTableProvider extends LootTableProvider {
    constructor(packOutput: PackOutput, lookupProvider: CompletableFuture<Provider>);
    get tables(): SubProviderEntry[];
  }


  interface GemsMaterialsProvider extends MaterialsProviderBase {}
  class GemsMaterialsProvider extends MaterialsProviderBase {
    constructor(generator: DataGenerator);
    static harvestTier(gem: Gems): HarvestTier;
  }


  interface GemsTraitsProvider extends TraitsProviderBase {}
  class GemsTraitsProvider extends TraitsProviderBase {
    constructor(generator: DataGenerator);
    get traits(): Collection<TraitBuilder>;
  }


  interface WorldGenGenerator extends DatapackBuiltinEntriesProvider {}
  class WorldGenGenerator extends DatapackBuiltinEntriesProvider {
    constructor(event: GatherDataEvent);
    static configuredFeature(name: ResourceLocation): ResourceKey<ConfiguredFeature<any, any>>;
    static holderFeature(ctx: BootstrapContext<PlacedFeature>, location: ResourceKey<ConfiguredFeature<any, any>>): Holder<ConfiguredFeature<any, any>>;
    static holderPlaced(ctx: BootstrapContext<BiomeModifier>, location: ResourceLocation): Holder<PlacedFeature>;
    static makeMap<T>(getter: Function<Gems, T>): Map<Gems, T>;
    static ore(block: Block, replacing: RuleTest, size: number): ConfiguredFeature<any, any>;
    static placed(feature: Holder<ConfiguredFeature<any, any>>, minHeight: number, maxHeight: number, count: number): PlacedFeature;
    static placements(minHeight: number, maxHeight: number, count: number): PlacementModifier[];
  }

}

declare module 'net.silentchaos512.gems.data.recipe' {
  import { LibRecipeProvider } from 'net.silentchaos512.lib.data.recipe';
  import { PackOutput } from 'net.minecraft.data';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';

  interface GemsRecipeProvider extends LibRecipeProvider {}
  class GemsRecipeProvider extends LibRecipeProvider {
    constructor(packOutput: PackOutput, provider: CompletableFuture<Provider>);
  }

}

declare module 'net.silentchaos512.gems.gear.trait' {
  import { TraitEffect, TraitEffectType, TraitActionContext } from 'net.silentchaos512.gear.api.traits';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { Collection } from 'java.util';

  interface CriticalStrikeTraitEffect extends TraitEffect {}
  class CriticalStrikeTraitEffect extends TraitEffect {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(damageMultiplier: number, activationChance: number);
    get extraWikiLines(): Collection<string>;
    onAttackEntity(context: TraitActionContext, target: LivingEntity, baseValue: number): number;
    type(): TraitEffectType<any>;
  }

}

declare module 'net.silentchaos512.gems' {
  import { Common } from 'net.silentchaos512.gems.GemsConfig';
  import { ModConfigSpec } from 'net.neoforged.neoforge.common';
  import { Random } from 'java.util';
  import { RandomSource } from 'net.minecraft.util';
  import { Logger } from 'org.apache.logging.log4j';
  import { TextUtil } from 'net.silentchaos512.gems.util';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';
  import { ResourceLocation } from 'net.minecraft.resources';

  class GemsConfig {
    static readonly COMMON: Common;
    static readonly COMMON_SPEC: ModConfigSpec;
  }


  class SilentGems {
    static readonly MOD_ID: string;
    static readonly RANDOM: Random;
    static readonly RANDOM_SOURCE: RandomSource;
    static readonly LOGGER: Logger;
    static readonly TEXT: TextUtil;
    constructor(modEventBus: IEventBus, modContainer: ModContainer);
    static get version(): string;
    static getId(path: string): ResourceLocation;
    static getIdWithDefaultNamespace(name: string): ResourceLocation;
    static isDevBuild(): boolean;
    static shortenId(id: ResourceLocation): string;
  }

}

declare module 'net.silentchaos512.gems.GemsConfig' {
  import { IntValue } from 'ModConfigSpec';

  class Common {
    readonly glowroseNormalLight: IntValue;
    readonly glowrosePottedLight: IntValue;
  }

}

declare module 'net.silentchaos512.gems.item' {
  import { BlockItem, ItemStack, Item, TooltipFlag } from 'net.minecraft.world.item';
  import { Block } from 'net.minecraft.world.level.block';
  import { Properties, TooltipContext } from 'Item';
  import { Component } from 'net.minecraft.network.chat';
  import { IGem, Gems } from 'net.silentchaos512.gems.util';
  import { Builder } from 'FoodProperties';
  import { ItemLike, Level } from 'net.minecraft.world.level';
  import { LivingEntity, TamableAnimal } from 'net.minecraft.world.entity';
  import { List } from 'java.util';
  import { Function } from 'java.util.function';
  import { InteractionResult } from 'net.minecraft.world';
  import { UseOnContext } from 'net.minecraft.world.item.context';
  import { Cat, Wolf } from 'net.minecraft.world.entity.animal';

  interface GemBlockItem extends BlockItem {}
  class GemBlockItem extends BlockItem {
    constructor(blockIn: Block, builder: Properties);
    get description(): Component;
    getName(stack: ItemStack): Component;
  }


  interface GemItem extends IGem, Item {}
  class GemItem extends IGem {
    constructor(gem: Gems, translationKey: string, properties: Properties);
    get description(): Component;
    get gem(): Gems;
    getName(stack: ItemStack): Component;
  }


  interface GemsFoodItem extends Item {}
  class GemsFoodItem extends Item {
    constructor(foodBuilder: Builder, returnItem: ItemLike, properties: Properties);
    finishUsingItem(stack: ItemStack, worldIn: Level, entityLiving: LivingEntity): ItemStack;
  }


  interface ItemWithFlavorText extends Item {}
  class ItemWithFlavorText extends Item {
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, tooltipContext: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
  }


  interface PetSummonerItem extends ItemWithFlavorText {}
  class PetSummonerItem extends ItemWithFlavorText {
    constructor(petFactory: Function<Level, TamableAnimal>, properties: Properties);
    static getCat(world: Level): Cat;
    static getDog(world: Level): Wolf;
    isFoil(stack: ItemStack): boolean;
    useOn(context: UseOnContext): InteractionResult;
  }


  interface SparklingBoneMealItem extends ItemWithFlavorText {}
  class SparklingBoneMealItem extends ItemWithFlavorText {
    constructor(properties: Properties);
    useOn(context: UseOnContext): InteractionResult;
  }


  interface TeleporterLinker extends Item {}
  class TeleporterLinker extends Item {
    constructor(properties: Properties);
    useOn(context: UseOnContext): InteractionResult;
  }

}

declare module 'net.silentchaos512.gems.setup' {
  import { DeferredRegister, DeferredHolder, DeferredBlock, DeferredItem } from 'net.neoforged.neoforge.registries';
  import { Supplier, Predicate } from 'java.util.function';
  import { Blocks, DataComponents, Items } from 'DeferredRegister';
  import { Item } from 'RegisterColorHandlersEvent';
  import { Collection } from 'java.util';
  import { Item as net_minecraft_world_item_Item } from 'net.minecraft.world.item';
  import { DataResource } from 'net.silentchaos512.gear.api.util';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { Class } from 'java.lang';
  import { Block } from 'net.minecraft.world.level.block';

  class GemsAttachmentTypes {
    static readonly REGISTRAR: DeferredRegister;
    static readonly COFFEE_TIMER: Supplier;
  }


  class GemsBlockEntityTypes {
    static readonly BLOCK_ENTITY_TYPES: DeferredRegister;
    static readonly TELEPORTER: DeferredHolder;
  }


  class GemsBlocks {
    static readonly BLOCKS: Blocks;
    static readonly TELEPORTER_ANCHOR: DeferredBlock;
    static readonly CHAOS_ORE: DeferredBlock;
    static readonly DEEPSLATE_CHAOS_ORE: DeferredBlock;
    static readonly SILVER_ORE: DeferredBlock;
    static readonly DEEPSLATE_SILVER_ORE: DeferredBlock;
    static readonly CHAOS_ESSENCE_BLOCK: DeferredBlock;
    static readonly SILVER_BLOCK: DeferredBlock;
  }


  class GemsClientProxy {
    static onItemColors(event: Item): void;
  }


  class GemsContainers {
    static readonly CONTAINERS: DeferredRegister;
  }


  class GemsCreativeTabs {
    static readonly CREATIVE_TABS: DeferredRegister;
    static readonly TAB: DeferredHolder;
  }


  class GemsDataComponents {
    static readonly DATA_COMPONENTS: DataComponents;
    static readonly LINKED_POS: Supplier;
  }


  class GemsItems {
    static readonly ITEMS: Items;
    static readonly RAW_SILVER: DeferredItem;
    static readonly SILVER_INGOT: DeferredItem;
    static readonly SILVER_NUGGET: DeferredItem;
    static readonly SILVER_ROD: DeferredItem;
    static readonly CHAOS_ESSENCE: DeferredItem;
    static readonly REINFORCED_GOLD_ROD: DeferredItem;
    static readonly REINFORCED_SILVER_ROD: DeferredItem;
    static readonly TELEPORTER_LINKER: DeferredItem;
    static readonly SPARKLING_BONE_MEAL: DeferredItem;
    static readonly SUMMON_KITTY: DeferredItem;
    static readonly SUMMON_PUPPY: DeferredItem;
    static readonly POTATO_ON_A_STICK: DeferredItem;
    static readonly SUGAR_COOKIE: DeferredItem;
    static readonly CUP_OF_COFFEE: DeferredItem;
    static readonly UNCOOKED_MEATY_STEW: DeferredItem;
    static readonly MEATY_STEW: DeferredItem;
    static readonly UNCOOKED_FISHY_STEW: DeferredItem;
    static readonly FISHY_STEW: DeferredItem;
    static readonly IRON_POTATO: DeferredItem;
    static get simpleModelItems(): Collection<DeferredItem<net_minecraft_world_item_Item>>;
  }


  class GemsTags {
  }


  class GemsTraits {
    static readonly BARRIER_JACKET: DataResource;
    static readonly BOOSTER: DataResource;
    static readonly CLOAKING: DataResource;
    static readonly CRITICAL_STRIKE: DataResource;
    static readonly ENDERBANE: DataResource;
    static readonly FRACTAL: DataResource;
    static readonly FREEZE_RESISTANT: DataResource;
    static readonly HASTY: DataResource;
    static readonly HEARTY: DataResource;
    static readonly LEAPING: DataResource;
    static readonly NEPTUNES_BLESSING: DataResource;
    static readonly POWER: DataResource;
    static readonly STEP_UP: DataResource;
    static readonly TWINKLETOES: DataResource;
  }


  class Registration {
    static getBlocks<T extends Block>(clazz: Class<T>): Collection<T>;
    static getItems<T extends net_minecraft_world_item_Item>(clazz: Class<T>): Collection<T>;
    static getItems(predicate: Predicate<net_minecraft_world_item_Item>): Collection<net_minecraft_world_item_Item>;
    static register(modEventBus: IEventBus): void;
  }

}

declare module 'net.silentchaos512.gems.setup.GemsContainers' {
  import { RegisterMenuScreensEvent } from 'net.neoforged.neoforge.client.event';

  class Events {
    static registerScreens(event: RegisterMenuScreensEvent): void;
  }

}

declare module 'net.silentchaos512.gems.setup.GemsTags' {
  import { TagKey } from 'net.minecraft.tags';

  class DamageTypes {
    static readonly NEPTUNES_BLESSING_PROTECTS: TagKey;
  }


  class EntityTypes {
    static readonly COFFEE_PRODUCERS: TagKey;
    static readonly END_MONSTERS: TagKey;
  }


  class Items {
    static readonly INGOTS_SILVER: TagKey;
    static readonly ORES_CHAOS: TagKey;
    static readonly ORES_SILVER: TagKey;
    static readonly NUGGETS_SILVER: TagKey;
    static readonly RODS_SILVER: TagKey;
    static readonly GEM_ORES: TagKey;
    static readonly GEMS: TagKey;
    static readonly GLOWROSES: TagKey;
    static readonly STEW_FISH: TagKey;
    static readonly STEW_MEAT: TagKey;
    static readonly FLOWER_BASKET_CAN_STORE: TagKey;
    static readonly GEM_BAG_CAN_STORE: TagKey;
  }


  class Blocks {
    static readonly ORES_CHAOS: TagKey;
    static readonly ORES_SILVER: TagKey;
    static readonly GEM_ORES: TagKey;
    static readonly GLOWROSES: TagKey;
  }

}

declare module 'net.silentchaos512.gems.setup.GemsTraits' {
  import { DeferredRegister } from 'net.neoforged.neoforge.registries';
  import { Supplier } from 'java.util.function';

  class EffectTypes {
    static readonly REGISTRAR: DeferredRegister;
    static readonly CRITICAL_STRIKE: Supplier;
  }

}

declare module 'net.silentchaos512.gems.util' {
  import { Enum } from 'java.lang';
  import { Rarity, Item } from 'net.minecraft.world.item';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { TagKey } from 'net.minecraft.tags';
  import { Block, FlowerPotBlock } from 'net.minecraft.world.level.block';
  import { Function } from 'java.util.function';
  import { IntrinsicTagAppender } from 'IntrinsicHolderTagsProvider';
  import { OreConfigDefaults } from 'net.silentchaos512.gems.world';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Level, ItemLike } from 'net.minecraft.world.level';
  import { GemOreBlock, GemBlock, GemGlassBlock, GemLampBlock, GlowroseBlock } from 'net.silentchaos512.gems.block';
  import { State } from 'net.silentchaos512.gems.block.GemLampBlock';
  import { DeferredBlock } from 'net.neoforged.neoforge.registries';
  import { GemTeleporterBlock } from 'net.silentchaos512.gems.block.teleporter';
  import { GemItem } from 'net.silentchaos512.gems.item';
  import { List } from 'java.util';
  import { Color } from 'net.silentchaos512.lib.util';
  import { ChatFormatting } from 'net.minecraft';

  class Const {
    static readonly TOKEN_ENCHANTER_MOD_ID: string;
  }


  interface Gems extends Enum<Gems> {}
  class Gems extends Enum<Gems> {
    static readonly RUBY: Gems;
    static readonly CARNELIAN: Gems;
    static readonly TOPAZ: Gems;
    static readonly CITRINE: Gems;
    static readonly HELIODOR: Gems;
    static readonly MOLDAVITE: Gems;
    static readonly PERIDOT: Gems;
    static readonly TURQUOISE: Gems;
    static readonly KYANITE: Gems;
    static readonly SAPPHIRE: Gems;
    static readonly IOLITE: Gems;
    static readonly ALEXANDRITE: Gems;
    static readonly AMMOLITE: Gems;
    static readonly ROSE_QUARTZ: Gems;
    static readonly BLACK_DIAMOND: Gems;
    static readonly WHITE_DIAMOND: Gems;
    static readonly GARNET: Gems;
    static readonly AQUAMARINE: Gems;
    static readonly TANZANITE: Gems;
    static readonly OPAL: Gems;
    static readonly PEARL: Gems;
    generateIncorrectForToolTag(tagProvider: Function<TagKey<Block>, IntrinsicTagAppender<Block>>): void;
    get block(): GemBlock;
    get blockItemTag(): TagKey<Item>;
    get blockTag(): TagKey<Block>;
    get bricks(): GemBlock;
    get chiseledStone(): GemBlock;
    get color(): number;
    get colorArray(): number[];
    get deepslateOre(): GemOreBlock;
    get displayName(): Component;
    get endOre(): GemOreBlock;
    get glass(): GemGlassBlock;
    get glowrose(): GlowroseBlock;
    get glowroseItemTag(): TagKey<Item>;
    get glowroseTag(): TagKey<Block>;
    get harvestTierLevelHint(): string;
    get incorrectForToolTag(): TagKey<Block>;
    get item(): GemItem;
    get itemTag(): TagKey<Item>;
    get modOresItemTag(): TagKey<Item>;
    get modOresTag(): TagKey<Block>;
    get name(): string;
    get netherOre(): GemOreBlock;
    get ore(): GemOreBlock;
    get oreItemTag(): TagKey<Item>;
    get oreTag(): TagKey<Block>;
    get polishedStone(): GemBlock;
    get pottedGlowrose(): FlowerPotBlock;
    get rarity(): Rarity;
    get redstoneTeleporter(): DeferredBlock<GemTeleporterBlock>;
    get shard(): GemItem;
    get smallBricks(): GemBlock;
    get smoothStone(): GemBlock;
    get teleporter(): DeferredBlock<GemTeleporterBlock>;
    get tiles(): GemBlock;
    getLamp(state: State): GemLampBlock;
    getOreConfigDefaults(level: ResourceKey<Level>): OreConfigDefaults;
    static registerBlocks(): void;
    static registerItems(): void;
    static valueOf(name: string): Gems;
    static values(): Gems[];
  }


  class IGem {
    get gem(): Gems;
  }


  class TextUtil {
    constructor(modId: string);
    static itemSub(item: ItemLike, suffix: string, ...params: any[]): MutableComponent;
    misc(suffix: string, ...params: any[]): MutableComponent;
    translate(prefix: string, suffix: string, ...params: any[]): MutableComponent;
    static withColor(text: MutableComponent, color: number): MutableComponent;
    static withColor(text: MutableComponent, color: Color): MutableComponent;
    static withColor(text: MutableComponent, color: ChatFormatting): MutableComponent;
  }

}