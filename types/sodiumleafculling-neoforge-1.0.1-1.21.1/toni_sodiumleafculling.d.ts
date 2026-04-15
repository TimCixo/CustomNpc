declare module 'toni.sodiumleafculling' {
  import { BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { Enum } from 'java.lang';
  import { Component } from 'net.minecraft.network.chat';
  import { List } from 'java.util';

  class LeafCulling {
    static isFacingAir(view: BlockGetter, pos: BlockPos, facing: Direction): boolean;
    static shouldCullSide(view: BlockGetter, pos: BlockPos, facing: Direction, depth: number): boolean;
    static surroundedByLeaves(view: BlockGetter, pos: BlockPos): boolean;
  }


  interface LeafCullingQuality extends Enum<LeafCullingQuality> {}
  class LeafCullingQuality extends Enum<LeafCullingQuality> {
    static readonly NONE: LeafCullingQuality;
    static readonly HOLLOW: LeafCullingQuality;
    static readonly SOLID: LeafCullingQuality;
    static readonly SOLID_AGGRESSIVE: LeafCullingQuality;
    get localizedName(): Component;
    isSolid(): boolean;
    static valueOf(name: string): LeafCullingQuality;
    static values(): LeafCullingQuality[];
  }


  class PerformanceSettingsAccessor {
    sodiumleafculling$getQuality(): LeafCullingQuality;
    sodiumleafculling$setQuality(var1: LeafCullingQuality): void;
  }


  class SodiumLeafCulling {
  }

}

declare module 'toni.sodiumleafculling.mixins' {
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { LevelSlice } from 'net.caffeinemc.mods.sodium.client.world';
  import { BlockPos } from 'net.minecraft.core';
  import { PerformanceSettingsAccessor, LeafCullingQuality } from 'toni.sodiumleafculling';

  class AbstractBlockRenderContextAccessor {
    get pos(): BlockPos;
    get slice(): LevelSlice;
    get state(): BlockState;
  }


  class BlockOcclusionCacheMixin {
  }


  class BlockRendererMixin {
  }


  interface PerformanceSettingsMixin extends PerformanceSettingsAccessor {}
  class PerformanceSettingsMixin extends PerformanceSettingsAccessor {
    leafCullingQuality: LeafCullingQuality;
    sodiumleafculling$getQuality(): LeafCullingQuality;
    sodiumleafculling$setQuality(value: LeafCullingQuality): void;
  }


  class SodiumGameOptionPagesMixin {
  }

}