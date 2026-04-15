declare module 'jeresources.registry' {
  import { Map, List, Set } from 'java.util';
  import { DungeonEntry, EnchantmentEntry, MobEntry, PlantEntry, AbstractVillagerEntry, WorldGenEntry } from 'jeresources.entry';
  import { ItemStack } from 'net.minecraft.world.item';
  import { PlantDrop, LootDrop } from 'jeresources.api.drop';

  class DungeonRegistry {
    static categoryToLocalKeyMap: Map;
    constructor();
    static addCategoryMapping(category: string, name: string): boolean;
    clear(): void;
    get dungeons(): DungeonEntry[];
    static get instance(): DungeonRegistry;
    getNumStacks(entry: DungeonEntry): string;
    registerDungeonEntry(entry: DungeonEntry): void;
  }


  class EnchantmentRegistry {
    constructor();
    static get instance(): EnchantmentRegistry;
    getEnchantments(itemStack: ItemStack): Set<EnchantmentEntry>;
    removeAll(excludedEnchants: string[]): void;
  }


  class MobRegistry {
    clear(): void;
    clearEntities(): void;
    static get instance(): MobRegistry;
    get mobs(): MobEntry[];
    registerMob(entry: MobEntry): boolean;
  }


  class PlantRegistry {
    constructor();
    addDrops(itemStack: ItemStack, drops: PlantDrop[]): void;
    clear(): void;
    get allPlants(): PlantEntry[];
    static get instance(): PlantRegistry;
    registerPlant(entry: PlantEntry): boolean;
  }


  class VillagerRegistry {
    addVillagerEntry(entry: AbstractVillagerEntry<any>): void;
    clear(): void;
    clearEntities(): void;
    static get instance(): VillagerRegistry;
    get villagers(): AbstractVillagerEntry[];
  }


  class WorldGenRegistry {
    addDrops(block: ItemStack, ...drops: LootDrop[]): void;
    clear(): void;
    static get instance(): WorldGenRegistry;
    get worldGen(): WorldGenEntry[];
    registerEntry(entry: WorldGenEntry): void;
  }

}