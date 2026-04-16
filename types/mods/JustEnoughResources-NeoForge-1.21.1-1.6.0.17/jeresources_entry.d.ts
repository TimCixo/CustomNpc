declare module 'jeresources.entry' {
  import { Int2ObjectMap } from 'it.unimi.dsi.fastutil.ints';
  import { ItemListing } from 'VillagerTrades';
  import { TradeList } from 'jeresources.collection';
  import { List, Collection } from 'java.util';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { Integer } from 'java.lang';
  import { IFocus } from 'mezz.jei.api.recipe';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';
  import { Stream } from 'java.util.stream';
  import { LootDrop, PlantDrop } from 'jeresources.api.drop';
  import { Holder, HolderSet } from 'net.minecraft.core';
  import { Enchantment } from 'net.minecraft.world.item.enchantment';
  import { Supplier } from 'java.util.function';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { LightLevel } from 'jeresources.api.conditionals';
  import { BushBlock } from 'net.minecraft.world.level.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Property } from 'net.minecraft.world.level.block.state.properties';
  import { Villager, VillagerProfession, WanderingTrader } from 'net.minecraft.world.entity.npc';
  import { DistributionBase } from 'jeresources.api.distributions';
  import { Restriction } from 'jeresources.api.restrictions';

  class AbstractVillagerEntry<T extends AbstractVillager = any> {
    constructor(itemListings: Int2ObjectMap<ItemListing[]>);

    constructor();
    addITradeLists(itemListings: Int2ObjectMap<ItemListing[]>): void;
    clearEntity(): void;
    get displayName(): string;
    get inputs(): ItemStack[];
    get maxLevel(): number;
    get name(): string;
    get outputs(): ItemStack[];
    get pois(): ItemStack[];
    get villagerEntity(): T;
    getPossibleLevels(focus: IFocus<ItemStack>): number[];
    getVillagerTrades(level: number): TradeList;
    hasLevels(): boolean;
    hasPois(): boolean;
  }


  class DungeonEntry {
    constructor(name: string, lootTable: LootTable);
    amountOfItems(focus: IFocus<ItemStack>): number;
    containsItem(itemStack: ItemStack): boolean;
    get maxStacks(): number;
    get minStacks(): number;
    get name(): string;
    getChestDrop(ingredient: ItemStack): LootDrop;
    getItemStacks(focus: IFocus<ItemStack>): ItemStack[];
    getItemStacks(focuses: Stream<IFocus<ItemStack>>): ItemStack[];
    getItems(focus: IFocus<ItemStack>, slot: number, slots: number): ItemStack[];
  }


  class EnchantmentEntry {
    constructor(enchantment: Holder<Enchantment>);
    get enchantment(): Enchantment;
    get enchantmentHolder(): Holder<Enchantment>;
    get supportedItems(): HolderSet<Item>;
    get translatedWithLevels(): string;
  }


  class MobEntry {
    clearEntity(): void;
    static create(entity: Supplier<LivingEntity>, lightLevel: LightLevel, minExp: number, maxExp: number, biomes: string[], ...drops: LootDrop[]): MobEntry;
    static create(entity: Supplier<LivingEntity>, lightLevel: LightLevel, biomes: string[], ...drops: LootDrop[]): MobEntry;
    static create(entity: Supplier<LivingEntity>, lightLevel: LightLevel, exp: number, biomes: string[], ...drops: LootDrop[]): MobEntry;
    static create(entity: Supplier<LivingEntity>, lightLevel: LightLevel, exp: number, ...drops: LootDrop[]): MobEntry;
    static create(entity: Supplier<LivingEntity>, lightLevel: LightLevel, minExp: number, maxExp: number, ...drops: LootDrop[]): MobEntry;
    static create(entity: Supplier<LivingEntity>, lightLevel: LightLevel, ...drops: LootDrop[]): MobEntry;
    static create(entity: Supplier<LivingEntity>, ...drops: LootDrop[]): MobEntry;
    static create(entity: Supplier<LivingEntity>, lootTable: LootTable): MobEntry;
    static create(entity: Supplier<LivingEntity>): MobEntry;
    get drops(): LootDrop[];
    get dropsItemStacks(): ItemStack[];
    get entity(): LivingEntity;
    get exp(): string;
    get lightLevel(): LightLevel;
    get mobName(): string;
    get spawnEgg(): ItemStack;
    get translatedBiomes(): Stream<string>;
    hasMultipleBiomes(): boolean;
    hasSpawnEgg(): boolean;
    set drops(drops: Collection<LootDrop>);
  }


  class PlantEntry {
    constructor(itemStack: ItemStack, plant: BushBlock, ...drops: PlantDrop[]);

    constructor(itemStack: ItemStack, ...drops: PlantDrop[]);

    constructor(plant: T, ...drops: PlantDrop[]);
    add(entry: PlantDrop): void;
    get ageProperty(): Property<any>;
    get drops(): PlantDrop[];
    get lootDropStacks(): ItemStack[];
    get plant(): BushBlock;
    get plantItemStack(): ItemStack;
    get plantState(): BlockState;
    get soil(): BlockState;
    get totalWeight(): number;
    getDrop(itemStack: ItemStack): PlantDrop;
    static registerGrass(): PlantEntry;
    set ageProperty(ageProperty: Property<any>);
    set plantState(plantState: BlockState);
    set soil(soil: BlockState);
  }


  interface VillagerEntry extends AbstractVillagerEntry<Villager> {}
  class VillagerEntry extends AbstractVillagerEntry<Villager> {
    constructor(profession: VillagerProfession, itemListings: Int2ObjectMap<ItemListing[]>);
    get displayName(): string;
    get name(): string;
    get pois(): ItemStack[];
    get profession(): VillagerProfession;
    get villagerEntity(): Villager;
    hasLevels(): boolean;
    hasPois(): boolean;
  }


  interface WanderingTraderEntry extends AbstractVillagerEntry<WanderingTrader> {}
  class WanderingTraderEntry extends AbstractVillagerEntry<WanderingTrader> {
    constructor(itemListings: Int2ObjectMap<ItemListing[]>);
    get displayName(): string;
    get name(): string;
    get pois(): ItemStack[];
    get villagerEntity(): WanderingTrader;
    hasLevels(): boolean;
    hasPois(): boolean;
  }


  class WorldGenEntry {
    constructor(block: ItemStack, deepSlateBlock: ItemStack, distribution: DistributionBase, restriction: Restriction, silktouch: boolean, ...drops: LootDrop[]);

    constructor(block: ItemStack, distribution: DistributionBase, restriction: Restriction, silktouch: boolean, ...drops: LootDrop[]);

    constructor(block: ItemStack, distribution: DistributionBase, ...drops: LootDrop[]);

    constructor(block: ItemStack, deepSlateBlock: ItemStack, distribution: DistributionBase, ...drops: LootDrop[]);

    constructor(block: ItemStack, distribution: DistributionBase, silktouch: boolean, ...drops: LootDrop[]);

    constructor(block: ItemStack, deepSlateBlock: ItemStack, distribution: DistributionBase, silktouch: boolean, ...drops: LootDrop[]);

    constructor(block: ItemStack, distribution: DistributionBase, restriction: Restriction, ...drops: LootDrop[]);

    constructor(block: ItemStack, deepSlateBlock: ItemStack, distribution: DistributionBase, restriction: Restriction, ...drops: LootDrop[]);
    addDrops(...drops: LootDrop[]): void;
    addDrops(drops: Collection<LootDrop>): void;
    get averageBlockCountPerChunk(): number;
    get biomeRestrictions(): string[];
    get block(): ItemStack;
    get blockAndDrops(): ItemStack[];
    get blocks(): ItemStack[];
    get chances(): number[];
    get colour(): number;
    get deepSlateBlock(): ItemStack;
    get dimension(): string;
    get drops(): ItemStack[];
    get maxY(): number;
    get minY(): number;
    get restriction(): Restriction;
    getLootDrops(itemStack: ItemStack): LootDrop[];
    hasDeepSlateVariant(): boolean;
    isSilkTouchNeeded(): boolean;
    merge(entry: WorldGenEntry): void;
    toString(): string;
  }

}