declare module 'jeresources.util' {
  import { Set, List, Map } from 'java.util';
  import { Class, Throwable } from 'java.lang';
  import { ItemStack, DyeColor } from 'net.minecraft.world.item';
  import { Component } from 'net.minecraft.network.chat';
  import { Function, BooleanSupplier, Supplier, Predicate } from 'java.util.function';
  import { Stream } from 'java.util.stream';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { Level, BlockGetter } from 'net.minecraft.world.level';
  import { Holder, BlockPos, Registry } from 'net.minecraft.core';
  import { DimensionType } from 'net.minecraft.world.level.dimension';
  import { ClientLevel, ClientChunkCache } from 'net.minecraft.client.multiplayer';
  import { ClientLevelData } from 'ClientLevel';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Player } from 'net.minecraft.world.entity.player';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';
  import { Entity, LivingEntity, EntityType } from 'net.minecraft.world.entity';
  import { LevelChunk } from 'net.minecraft.world.level.chunk';
  import { ChunkStatus } from 'net.minecraft.world.level.chunk.status';
  import { LevelLightEngine } from 'net.minecraft.world.level.lighting';
  import { MapItemSavedData, MapId } from 'net.minecraft.world.level.saveddata.maps';
  import { Scoreboard } from 'net.minecraft.world.scores';
  import { RecipeManager } from 'net.minecraft.world.item.crafting';
  import { GuiGraphics, Font as net_minecraft_client_gui_Font } from 'net.minecraft.client.gui';
  import { FormattedCharSequence } from 'net.minecraft.util';
  import { Holder as reloadableserverregistries_Holder } from 'ReloadableServerRegistries';
  import { LootTable, LootPool } from 'net.minecraft.world.level.storage.loot';
  import { LootPoolEntryContainer } from 'net.minecraft.world.level.storage.loot.entries';
  import { LootItemCondition } from 'net.minecraft.world.level.storage.loot.predicates';
  import { LootDrop, PlantDrop } from 'jeresources.api.drop';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { BushBlock } from 'net.minecraft.world.level.block';
  import { Restriction } from 'jeresources.api.restrictions';
  import { WorldGenEntry } from 'jeresources.entry';
  import { Sheep } from 'net.minecraft.world.entity.animal';
  import { VillagerRegistry } from 'jeresources.registry';
  import { PoiType } from 'net.minecraft.world.entity.ai.village.poi';

  class ClassScraper {
    static getGeneralizations(classObject: Class): Set<Class>;
    static getSuperInterfaces(childInterfaces: Class[]): Set<Class>;
  }


  class CollectionHelper {
    static create(...itemStacks: ItemStack[]): ItemStack[];
    static create(...strings: string[]): string[];
    static create(functionParameter: Function<string, Component>, strings: Stream<string>): Component[];
  }


  class DimensionHelper {
    static getDimensionName(worldRegistryKey: ResourceKey<Level>): string;
    static getType(dimensionTypeRegistryKey: ResourceKey<DimensionType>): Holder<DimensionType>;
  }


  interface FakeClientLevel extends ClientLevel {}
  class FakeClientLevel extends ClientLevel {
    static readonly clientLevelData: ClientLevelData;
    constructor();
    destroyBlockProgress(breakerId: number, pos: BlockPos, progress: number): void;
    gatherStats(): string;
    get chunkSource(): ClientChunkCache;
    get freeMapId(): MapId;
    get level(): BlockGetter;
    get lightEngine(): LevelLightEngine;
    get recipeManager(): RecipeManager;
    get scoreboard(): Scoreboard;
    getChunk(x: number, z: number, chunkStatus: ChunkStatus, requireChunk: boolean): LevelChunk;
    getEntity(p_73045_1_: number): Entity;
    getMapData(mapId: MapId): MapItemSavedData;
    hasChunk(p_217354_1_: number, p_217354_2_: number): boolean;
    levelEvent(player: Player, type: number, pos: BlockPos, data: number): void;
    playSound(player: Player, x: number, y: number, z: number, soundIn: SoundEvent, source: SoundSource, volume: number, pitch: number): void;
    playSound(p_184133_1_: Player, p_184133_2_: BlockPos, p_184133_3_: SoundEvent, source: SoundSource, p_184133_5_: number, p_184133_6_: number): void;
    sendBlockUpdated(pos: BlockPos, oldState: BlockState, newState: BlockState, flags: number): void;
    setMapData(mapId: MapId, mapData: MapItemSavedData): void;
    tick(booleanSupplier: BooleanSupplier, bool: boolean): void;
  }


  class Font {
    static readonly small: Font;
    static readonly normal: Font;
    static get mCFont(): net_minecraft_client_gui_Font;
    getStringWidth(line: FormattedCharSequence): number;
    getStringWidth(line: string): number;
    print(guiGraphics: GuiGraphics, line: string, x: number, y: number): void;
    print(guiGraphics: GuiGraphics, line: FormattedCharSequence, x: number, y: number): void;
    print(guiGraphics: GuiGraphics, number: number, x: number, y: number): void;
    print(guiGraphics: GuiGraphics, line: FormattedCharSequence, x: number, y: number, color: number): void;
    print(guiGraphics: GuiGraphics, line: FormattedCharSequence, x: number, y: number, color: number, shadow: boolean): void;
    splitPrint(guiGraphics: GuiGraphics, line: string, x: number, y: number, maxWidth: number): void;
    splitPrint(guiGraphics: GuiGraphics, line: FormattedCharSequence, x: number, y: number, maxWidth: number): void;
  }


  class LogHelper {
    static debug(message: string, ...params: any[]): void;
    static error(message: string, ...params: any[]): void;
    static info(message: string, ...params: any[]): void;
    static trace(message: string, ...params: any[]): void;
    static warn(message: string, t: Throwable): void;
    static warn(message: string, ...params: any[]): void;
  }


  class LootTableFetcher {
    constructor();

    constructor(reloadableServerRegistries: reloadableserverregistries_Holder);
    getLootTable(lootTableKey: ResourceKey<LootTable>): LootTable;
  }


  class LootTableHelper {
    static get allChestLootTablesResourceKeys(): ResourceKey<LootTable>[];
    static get allMobLootTables(): Map<ResourceKey<LootTable>, Supplier<LivingEntity>>;
    static get lootTableFetcher(): LootTableFetcher;
    static getLootConditions(pool: LootPool): LootItemCondition[];
    static getLootEntries(pool: LootPool): LootPoolEntryContainer[];
    static getPools(table: LootTable): LootPool[];
    static toDrops(table: LootTable): LootDrop[];
    static toDrops(lootTableKey: ResourceKey<LootTable>): LootDrop[];
  }


  class MapKeys {
    static getKey(state: BlockState, serverLevel: ServerLevel, pos: BlockPos): string;
    static getKey(drop: ItemStack): string;
    static getKey(plant: BushBlock): string;
    static getKey(dropItem: LootDrop): string;
    static getKey(drop: ItemStack, restriction: Restriction): string;
    static getKey(entry: WorldGenEntry): string;
  }


  class MobHelper {
    static getExpandedName(entity: LivingEntity): string;
  }


  class MobTableBuilder {
    add(resourceLocation: ResourceKey<LootTable>, entityType: EntityType<any>): void;
    addSheep(resourceLocation: ResourceKey<LootTable>, entityType: EntityType<Sheep>, dye: DyeColor): void;
    get mobTables(): Map<ResourceKey<LootTable>, Supplier<LivingEntity>>;
  }


  class PlantHelper {
    static get seeds(): PlantDrop[];
    static getPlant(bushBlock: BushBlock, world: BlockGetter, pos: BlockPos): BlockState;
  }


  class ReflectionHelper {
    static findClass(name: string): Class;
    static isInstanceOf(clazz: Class, checkClass: Class): boolean;
  }


  class RegistryHelper {
    static getHolder<T>(registry: ResourceKey<Registry<T>>, key: ResourceKey<T>): Holder<T>;
    static getObject<T>(registry: ResourceKey<Registry<T>>, key: ResourceKey<T>): T;
    static getRegistry<T>(key: ResourceKey<Registry<T>>): Registry<T>;
  }


  class RenderHelper {
    static drawLine(guiGraphics: GuiGraphics, xBegin: number, yBegin: number, xEnd: number, yEnd: number, color: number): void;
    static drawTexture(guiGraphics: GuiGraphics, x: number, y: number, u: number, v: number, width: number, height: number, resource: ResourceLocation): void;
    static drawTexturedModalRect(guiGraphics: GuiGraphics, x: number, y: number, u: number, v: number, width: number, height: number, zLevel: number): void;
    static get guiScaleFactor(): number;
    static getGLTranslation(guiGraphics: GuiGraphics, scale: number): number[];
    static renderBlock(guiGraphics: GuiGraphics, block: BlockState, x: number, y: number, z: number, rotate: number, scale: number): void;
    static renderChest(guiGraphics: GuiGraphics, x: number, y: number, rotate: number, scale: number, lidAngle: number): void;
    static renderEntity(guiGraphics: GuiGraphics, x: number, y: number, scale: number, yaw: number, pitch: number, livingEntity: LivingEntity): void;
    static scissor(guiGraphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    static stopScissor(): void;
  }


  class TranslationHelper {
    static canTranslate(key: string): boolean;
    static getLocalPageInfo(page: number, lastPage: number): string;
    static translateAndFormat(key: string, ...params: any[]): string;
    static tryDimensionTranslate(dimension: string): string;
  }


  class VillagersHelper {
    static getPoiBlocks(poiType: PoiType): Set<BlockState>;
    static getPoiBlocks(heldJobSite: Predicate<Holder<PoiType>>): Set<BlockState>;
    static initRegistry(reg: VillagerRegistry): void;
  }

}