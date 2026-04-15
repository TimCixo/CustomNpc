declare module 'jeresources.platform' {
  import { List } from 'java.util';
  import { LootPool, LootTable } from 'net.minecraft.world.level.storage.loot';
  import { LootPoolEntryContainer } from 'net.minecraft.world.level.storage.loot.entries';
  import { LootItemCondition } from 'net.minecraft.world.level.storage.loot.predicates';
  import { NumberProvider } from 'net.minecraft.world.level.storage.loot.providers.number';
  import { PackResources } from 'net.minecraft.server.packs';
  import { CommonProxy } from 'jeresources.proxy';
  import { IJERAPI } from 'jeresources.api';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Path } from 'java.nio.file';
  import { Class } from 'java.lang';

  class ILootTableHelper {
    getBonusRolls(pool: LootPool): NumberProvider;
    getLootConditions(pool: LootPool): LootItemCondition[];
    getLootEntries(pool: LootPool): LootPoolEntryContainer[];
    getPools(table: LootTable): LootPool[];
    getRolls(pool: LootPool): NumberProvider;
  }


  class IModInfo {
    get name(): string;
    get packResources(): PackResources[];
  }


  class IModList {
    get mods(): IModInfo[];
    isLoaded(var1: string): boolean;
  }


  class IPlatformHelper {
    get configDir(): Path;
    get lootTableHelper(): ILootTableHelper;
    get modsList(): IModList;
    get platformName(): string;
    get proxy(): CommonProxy;
    injectApi(var1: IJERAPI): void;
    isClient(): boolean;
    isCorrectToolForBlock(var1: Block, var2: BlockState, var3: BlockGetter, var4: BlockPos, var5: Player): boolean;
  }


  class Services {
    static readonly PLATFORM: IPlatformHelper;
    static load<T>(serviceClass: Class<T>): T;
  }

}