declare module 'jeresources.compatibility.api' {
  import { IJERAPI, IMobRegistry, IWorldGenRegistry, IPlantRegistry, IDungeonRegistry } from 'jeresources.api';
  import { Level } from 'net.minecraft.world.level';

  interface JERAPI extends IJERAPI {}
  class JERAPI extends IJERAPI {
    static commit(initWorldGen: boolean): void;
    get dungeonRegistry(): IDungeonRegistry;
    static get instance(): IJERAPI;
    get level(): Level;
    get mobRegistry(): IMobRegistry;
    get plantRegistry(): IPlantRegistry;
    get worldGenRegistry(): IWorldGenRegistry;
    static init(): void;
  }

}

declare module 'jeresources.compatibility' {
  import { Optional } from 'java.util';
  import { Level } from 'net.minecraft.world.level';

  class CompatBase {
    static get level(): Level;
    static get serverLevel(): Optional<Level>;
    init(var1: boolean): void;
  }


  class Compatibility {
    static init(): void;
  }

}

declare module 'jeresources.compatibility.minecraft' {
  import { CompatBase } from 'jeresources.compatibility';
  import { LivingEntity, Entity } from 'net.minecraft.world.entity';
  import { LightLevel } from 'jeresources.api.conditionals';
  import { IMobRenderHook } from 'jeresources.api.render';

  interface MinecraftCompat extends CompatBase {}
  class MinecraftCompat extends CompatBase {
    init(worldGen: boolean): void;
  }


  class MobCompat {
    static getExperience(entity: LivingEntity): ExperienceRange;
    static getLightLevel(entity: Entity): LightLevel;
  }


  class RenderHooks {
    static readonly ENDER_DRAGON: IMobRenderHook;
    static readonly BAT: IMobRenderHook;
    static readonly ELDER_GUARDIAN: IMobRenderHook;
    static readonly SQUID: IMobRenderHook;
    static readonly GIANT: IMobRenderHook;
    static readonly SHULKER: IMobRenderHook;
    static readonly GROUP_FISH: IMobRenderHook;
  }

}