declare module 'jeresources.neoforge.config' {
  import { ModConfigSpec } from 'net.neoforged.neoforge.common';
  import { Path } from 'java.nio.file';
  import { Loading, Reloading } from 'ModConfigEvent';
  import { IntValue, BooleanValue, ConfigValue } from 'ModConfigSpec';

  class Config {
    static instance: Config;
    static readonly COMMON: ModConfigSpec;
    loadConfig(spec: ModConfigSpec, path: Path): void;
    onFileChange(configEvent: Reloading): void;
    onLoad(configEvent: Loading): void;
  }


  class ConfigValues {
    static itemsPerColumn: IntValue;
    static itemsPerRow: IntValue;
    static diyData: BooleanValue;
    static showDevData: BooleanValue;
    static enchantsBlacklist: ConfigValue;
    static hiddenTabs: ConfigValue;
    static dimensionsBlacklist: ConfigValue;
    static disableLootManagerReloading: BooleanValue;
    static build(): ModConfigSpec;
    static pushChanges(): void;
  }

}

declare module 'jeresources.neoforge.event' {
  import { RegisterCommandsEvent } from 'net.neoforged.neoforge.event';

  class Commands {
    registerCommand(event: RegisterCommandsEvent): void;
  }

}

declare module 'jeresources.neoforge' {
  import { CommonProxy } from 'jeresources.proxy';
  import { ModContainer, ModList as net_neoforged_fml_ModList } from 'net.neoforged.fml';
  import { Dist } from 'net.neoforged.api.distmarker';
  import { ILootTableHelper, IModInfo, IModList, IPlatformHelper } from 'jeresources.platform';
  import { NumberProvider } from 'net.minecraft.world.level.storage.loot.providers.number';
  import { LootPool } from 'net.minecraft.world.level.storage.loot';
  import { IModFileInfo } from 'net.neoforged.neoforgespi.language';
  import { List } from 'java.util';
  import { PackResources } from 'net.minecraft.server.packs';
  import { IJERAPI } from 'jeresources.api';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Path } from 'java.nio.file';

  class JEResources {
    static PROXY: CommonProxy;
    constructor(container: ModContainer, dist: Dist);
  }


  interface LootTableHelper extends ILootTableHelper {}
  class LootTableHelper extends ILootTableHelper {
    getBonusRolls(pool: LootPool): NumberProvider;
    getRolls(pool: LootPool): NumberProvider;
    static instance(): ILootTableHelper;
  }


  interface ModInfo extends IModInfo {}
  class ModInfo extends IModInfo {
    constructor(modFile: IModFileInfo);
    get name(): string;
    get packResources(): PackResources[];
  }


  interface ModList extends IModList {}
  class ModList extends IModList {
    constructor(modList: net_neoforged_fml_ModList);
    get mods(): IModInfo[];
    isLoaded(modId: string): boolean;
  }


  interface NeoForgePlatformHelper extends IPlatformHelper {}
  class NeoForgePlatformHelper extends IPlatformHelper {
    get configDir(): Path;
    get lootTableHelper(): ILootTableHelper;
    get modsList(): IModList;
    get platformName(): string;
    get proxy(): CommonProxy;
    injectApi(instance: IJERAPI): void;
    isClient(): boolean;
    isCorrectToolForBlock(block: Block, blockState: BlockState, level: BlockGetter, blockPos: BlockPos, player: Player): boolean;
  }

}