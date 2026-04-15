declare module 'io.github.jamalam360.rightclickharvest' {
  import { ConfigExtensions, ConfigManager } from 'io.github.jamalam360.jamlib.config';
  import { HungerLevel, ExperienceType } from 'io.github.jamalam360.rightclickharvest.Config';
  import { List } from 'java.util';
  import { Link } from 'ConfigExtensions';
  import { Logger } from 'org.slf4j';
  import { TagKey } from 'net.minecraft.tags';
  import { Direction } from 'net.minecraft.core';
  import { InteractionResult, InteractionHand } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Level } from 'net.minecraft.world.level';
  import { BlockHitResult } from 'net.minecraft.world.phys';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface Config extends ConfigExtensions<Config> {}
  class Config extends ConfigExtensions<Config> {
    requireHoe: boolean;
    harvestInRadius: boolean;
    hungerLevel: HungerLevel;
    experienceType: ExperienceType;
    showServerWarning: boolean;
    hasUserBeenWarnedForNotUsingHoe: boolean;
    get links(): Link[];
  }


  class RightClickHarvest {
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static readonly LOGGER: Logger;
    static readonly CONFIG: ConfigManager;
    static readonly BLACKLIST: TagKey;
    static readonly HOE_NEVER_REQUIRED: TagKey;
    static readonly RADIUS_HARVEST_BLACKLIST: TagKey;
    static readonly LOW_TIER_HOES: TagKey;
    static readonly MID_TIER_HOES: TagKey;
    static readonly HIGH_TIER_HOES: TagKey;
    static readonly CARDINAL_DIRECTIONS: Direction[];
    static id(path: string): ResourceLocation;
    static init(): void;
    static onBlockUse(player: Player, level: Level, hand: InteractionHand, hitResult: BlockHitResult, initialCall: boolean): InteractionResult;
  }


  class RightClickHarvestClient {
    static init(): void;
  }


  class ServerLangProvider {
    static getRequireHoeConfigByLanguage(lang: string): string;
    static getUseHoeMessageByLanguage(lang: string): string;
  }

}

declare module 'io.github.jamalam360.rightclickharvest.Config' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface HungerLevel extends Enum<HungerLevel> {}
  class HungerLevel extends Enum<HungerLevel> {
    static readonly NONE: HungerLevel;
    static readonly LOW: HungerLevel;
    static readonly NORMAL: HungerLevel;
    static readonly HIGH: HungerLevel;
    static valueOf(name: string): HungerLevel;
    static values(): HungerLevel[];
  }


  interface ExperienceType extends Enum<ExperienceType> {}
  class ExperienceType extends Enum<ExperienceType> {
    static readonly NONE: ExperienceType;
    static readonly COST: ExperienceType;
    static readonly REWARD: ExperienceType;
    static valueOf(name: string): ExperienceType;
    static values(): ExperienceType[];
  }

}

declare module 'io.github.jamalam360.rightclickharvest.mixin' {
  import { IntegerProperty } from 'net.minecraft.world.level.block.state.properties';

  class CropBlockAccessor {
    invokeGetAgeProperty(): IntegerProperty;
  }

}

declare module 'io.github.jamalam360.rightclickharvest.neoforge' {
  class RightClickHarvestNeoForge {
    constructor();
  }


  class RightClickHarvestNeoForgeClient {
    constructor();
  }


  class RightClickHarvestNeoForgeEvents {
  }

}

declare module 'io.github.jamalam360.rightclickharvest.neoforge.RightClickHarvestNeoForgeEvents' {
  import { Event } from 'net.neoforged.bus.api';
  import { HarvestContext } from 'io.github.jamalam360.rightclickharvest';

  interface AfterHarvest extends Event {}
  class AfterHarvest extends Event {
    get context(): HarvestContext;
  }

}