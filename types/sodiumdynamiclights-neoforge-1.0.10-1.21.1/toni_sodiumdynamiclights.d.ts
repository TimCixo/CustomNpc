declare module 'toni.sodiumdynamiclights.accessor' {
  import { DynamicLightHandler } from 'dev.lambdaurora.lambdynlights.api';
  import { Component } from 'net.minecraft.network.chat';
  import { EntityType, Entity } from 'net.minecraft.world.entity';
  import { BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';

  class DynamicLightHandlerHolder<T = any> {
    static cast<T extends Entity>(entityType: EntityType<T>): DynamicLightHandlerHolder<T>;
    static cast<T extends BlockEntity>(entityType: BlockEntityType<T>): DynamicLightHandlerHolder<T>;
    sodiumdynamiclights$getDynamicLightHandler(): DynamicLightHandler<T>;
    sodiumdynamiclights$getName(): Component;
    sodiumdynamiclights$getSetting(): boolean;
    sodiumdynamiclights$setDynamicLightHandler(var1: DynamicLightHandler<T>): void;
  }


  class WorldRendererAccessor {
    sodiumdynamiclights$scheduleChunkRebuild(var1: number, var2: number, var3: number, var4: boolean): void;
  }

}

declare module 'toni.sodiumdynamiclights' {
  import { ModConfigSpec } from 'net.neoforged.neoforge.common';
  import { EnumValue, BooleanValue } from 'ModConfigSpec';
  import { HashMap, Optional, List } from 'java.util';
  import { Boolean, Enum } from 'java.lang';
  import { Component } from 'net.minecraft.network.chat';
  import { Level } from 'net.minecraft.world.level';
  import { LevelRenderer } from 'net.minecraft.client.renderer';
  import { Logger } from 'org.slf4j';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';
  import { FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';
  import { PackType } from 'net.minecraft.server.packs';
  import { SimplePreparableReloadListener } from 'net.minecraft.server.packs.resources';
  import { AddReloadListenerEvent } from 'net.neoforged.neoforge.event';
  import { BlockPos } from 'net.minecraft.core';
  import { Entity, LivingEntity } from 'net.minecraft.world.entity';
  import { Predicate } from 'java.util.function';
  import { LongOpenHashSet } from 'it.unimi.dsi.fastutil.longs';
  import { ItemStack } from 'net.minecraft.world.item';

  class DynamicLightsConfig {
    static readonly SPECS: ModConfigSpec;
    static readonly DYNAMIC_LIGHTS_MODE: EnumValue;
    static readonly ENTITIES_LIGHT_SOURCE: BooleanValue;
    static readonly SELF_LIGHT_SOURCE: BooleanValue;
    static readonly BLOCK_ENTITIES_LIGHT_SOURCE: BooleanValue;
    static readonly WATER_SENSITIVE_CHECK: BooleanValue;
    static readonly CREEPER_LIGHTING_MODE: EnumValue;
    static readonly TNT_LIGHTING_MODE: EnumValue;
    static readonly ENTITIES_SETTINGS: HashMap;
    get blockEntitiesLightSource(): BooleanValue;
    get creeperLightingMode(): EnumValue<ExplosiveLightingMode>;
    get dynamicLightsMode(): DynamicLightsMode;
    get entitiesLightSource(): BooleanValue;
    get lightSettings(): HashMap<string, boolean>;
    get selfLightSource(): BooleanValue;
    get tntLightingMode(): EnumValue<ExplosiveLightingMode>;
    get waterSensitiveCheck(): BooleanValue;
  }


  interface DynamicLightsMode extends Enum<DynamicLightsMode> {}
  class DynamicLightsMode extends Enum<DynamicLightsMode> {
    static readonly OFF: DynamicLightsMode;
    static readonly SLOW: DynamicLightsMode;
    static readonly FAST: DynamicLightsMode;
    static readonly REALTIME: DynamicLightsMode;
    static byId(id: string): Optional<DynamicLightsMode>;
    get delay(): number;
    get name(): string;
    get translatedText(): Component;
    hasDelay(): boolean;
    isEnabled(): boolean;
    next(): DynamicLightsMode;
    static valueOf(name: string): DynamicLightsMode;
    static values(): DynamicLightsMode[];
  }


  class DynamicLightSource {
    sdl$dynamicLightTick(): void;
    sdl$getDynamicLightLevel(): Level;
    sdl$getDynamicLightX(): number;
    sdl$getDynamicLightY(): number;
    sdl$getDynamicLightZ(): number;
    sdl$getLuminance(): number;
    sdl$isDynamicLightEnabled(): boolean;
    sdl$resetDynamicLight(): void;
    sdl$setDynamicLightEnabled(enabled: boolean): void;
    sdl$shouldUpdateDynamicLight(): boolean;
    sodiumdynamiclights$scheduleTrackedChunksRebuild(var1: LevelRenderer): void;
    sodiumdynamiclights$updateDynamicLight(var1: LevelRenderer): boolean;
  }


  interface ExplosiveLightingMode extends Enum<ExplosiveLightingMode> {}
  class ExplosiveLightingMode extends Enum<ExplosiveLightingMode> {
    static readonly OFF: ExplosiveLightingMode;
    static readonly SIMPLE: ExplosiveLightingMode;
    static readonly FANCY: ExplosiveLightingMode;
    static byId(id: string): Optional<ExplosiveLightingMode>;
    get name(): string;
    get translatedText(): Component;
    isEnabled(): boolean;
    next(): ExplosiveLightingMode;
    static valueOf(name: string): ExplosiveLightingMode;
    static values(): ExplosiveLightingMode[];
  }


  class SodiumDynamicLights {
    static readonly NAMESPACE: string;
    readonly logger: Logger;
    readonly config: DynamicLightsConfig;
    constructor(modEventBus: IEventBus, modContainer: ModContainer);
    addLightSource(lightSource: DynamicLightSource): void;
    static addReloadListeners(event: AddReloadListenerEvent): void;
    clearLightSources(): void;
    clientSetup(event: FMLClientSetupEvent): void;
    containsLightSource(lightSource: DynamicLightSource): boolean;
    static get (): SodiumDynamicLights;
    get lastUpdateCount(): number;
    get lightSourcesCount(): number;
    getDynamicLightLevel(pos: BlockPos): number;
    getLightmapWithDynamicLight(pos: BlockPos, lightmap: number): number;
    getLightmapWithDynamicLight(entity: Entity, lightmap: number): number;
    getLightmapWithDynamicLight(dynamicLightLevel: number, lightmap: number): number;
    static getLivingEntityLuminanceFromItems(entity: LivingEntity): number;
    static getLuminanceFromItemStack(stack: ItemStack, submergedInWater: boolean): number;
    log(info: string): void;
    static maxDynamicLightLevel(pos: BlockPos, lightSource: DynamicLightSource, currentLightLevel: number): number;
    onInitializeClient(): void;
    static registerReloadListener(type: PackType, listener: SimplePreparableReloadListener): void;
    removeBlockEntitiesLightSource(): void;
    removeCreeperLightSources(): void;
    removeEntitiesLightSource(): void;
    removeLightSource(lightSource: DynamicLightSource): void;
    removeLightSources(filter: Predicate<DynamicLightSource>): void;
    removeTntLightSources(): void;
    static scheduleChunkRebuild(renderer: LevelRenderer, chunkPos: BlockPos): void;
    static scheduleChunkRebuild(renderer: LevelRenderer, chunkPos: number): void;
    static scheduleChunkRebuild(renderer: LevelRenderer, x: number, y: number, z: number): void;
    updateAll(renderer: LevelRenderer): void;
    static updateTrackedChunks(chunkPos: BlockPos, old: LongOpenHashSet, newPos: LongOpenHashSet): void;
    static updateTracking(lightSource: DynamicLightSource): void;
    warn(info: string): void;
  }

}

declare module 'toni.sodiumdynamiclights.mixin' {
  import { DynamicLightHandlerHolder, WorldRendererAccessor } from 'toni.sodiumdynamiclights.accessor';
  import { DynamicLightHandler } from 'dev.lambdaurora.lambdynlights.api';
  import { Component } from 'net.minecraft.network.chat';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockPos } from 'net.minecraft.core';

  interface BlockEntityTypeMixin<T extends BlockEntity = any> extends DynamicLightHandlerHolder<T> {}
  class BlockEntityTypeMixin<T extends BlockEntity = any> extends DynamicLightHandlerHolder<T> {
    sodiumdynamiclights$getDynamicLightHandler(): DynamicLightHandler<T>;
    sodiumdynamiclights$getName(): Component;
    sodiumdynamiclights$getSetting(): boolean;
    sodiumdynamiclights$setDynamicLightHandler(handler: DynamicLightHandler<T>): void;
  }


  class ClientLevelMixin {
  }


  interface CommonLevelRendererMixin extends WorldRendererAccessor {}
  class CommonLevelRendererMixin extends WorldRendererAccessor {
    sodiumdynamiclights$scheduleChunkRebuild(var1: number, var2: number, var3: number, var4: boolean): void;
  }


  class DebugScreenOverlayMixin {
  }


  class EntityRendererMixin<T extends Entity = any> {
  }


  interface EntityTypeMixin<T extends Entity = any> extends DynamicLightHandlerHolder<T> {}
  class EntityTypeMixin<T extends Entity = any> extends DynamicLightHandlerHolder<T> {
    get description(): Component;
    sodiumdynamiclights$getDynamicLightHandler(): DynamicLightHandler<T>;
    sodiumdynamiclights$getName(): Component;
    sodiumdynamiclights$getSetting(): boolean;
    sodiumdynamiclights$setDynamicLightHandler(handler: DynamicLightHandler<T>): void;
  }


  class LevelMixin {
    getBlockEntity(var1: BlockPos): BlockEntity;
    isClientSide(): boolean;
  }


  class MinecraftClientMixin {
  }


  class WorldRendererMixin {
  }

}

declare module 'toni.sodiumdynamiclights.mixin.fabric' {
  class AoCalculatorMixin {
  }

}

declare module 'toni.sodiumdynamiclights.mixin.lightsource' {
  import { Entity, EntityType, LivingEntity } from 'net.minecraft.world.entity';
  import { DynamicLightSource } from 'toni.sodiumdynamiclights';
  import { Level, ChunkPos } from 'net.minecraft.world.level';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { LevelRenderer } from 'net.minecraft.client.renderer';
  import { BlockPos } from 'net.minecraft.core';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  interface AbstractHurtingProjectileEntityMixin extends DynamicLightSource, Entity {}
  class AbstractHurtingProjectileEntityMixin extends DynamicLightSource {
    constructor(type: EntityType<any>, level: Level);
    sdl$dynamicLightTick(): void;
    sdl$getLuminance(): number;
  }


  interface AbstractMinecartEntityMixin extends DynamicLightSource, Entity {}
  class AbstractMinecartEntityMixin extends DynamicLightSource {
    constructor(type: EntityType<any>, level: Level);
    get displayBlockState(): BlockState;
    sdl$dynamicLightTick(): void;
    sdl$getLuminance(): number;
  }


  interface BlockAttachedEntityMixin extends DynamicLightSource, Entity {}
  class BlockAttachedEntityMixin extends DynamicLightSource {
    constructor(type: EntityType<any>, level: Level);
    tick(): void;
  }


  interface BlockEntityMixin extends DynamicLightSource {}
  class BlockEntityMixin extends DynamicLightSource {
    sdl$dynamicLightTick(): void;
    sdl$getDynamicLightLevel(): Level;
    sdl$getDynamicLightX(): number;
    sdl$getDynamicLightY(): number;
    sdl$getDynamicLightZ(): number;
    sdl$getLuminance(): number;
    sdl$resetDynamicLight(): void;
    sdl$shouldUpdateDynamicLight(): boolean;
    sodiumdynamiclights$scheduleTrackedChunksRebuild(renderer: LevelRenderer): void;
    sodiumdynamiclights$updateDynamicLight(renderer: LevelRenderer): boolean;
  }


  interface EntityMixin extends DynamicLightSource {}
  class EntityMixin extends DynamicLightSource {
    level: Level;
    chunkPosition(): ChunkPos;
    get eyeY(): number;
    get onPos(): BlockPos;
    get type(): EntityType<any>;
    get x(): number;
    get y(): number;
    get z(): number;
    isOnFire(): boolean;
    isRemoved(): boolean;
    onRemove(ci: CallbackInfo): void;
    onTick(ci: CallbackInfo): void;
    sdl$dynamicLightTick(): void;
    sdl$getDynamicLightLevel(): Level;
    sdl$getDynamicLightX(): number;
    sdl$getDynamicLightY(): number;
    sdl$getDynamicLightZ(): number;
    sdl$getLuminance(): number;
    sdl$resetDynamicLight(): void;
    sdl$shouldUpdateDynamicLight(): boolean;
    sodiumdynamiclights$scheduleTrackedChunksRebuild(renderer: LevelRenderer): void;
    sodiumdynamiclights$updateDynamicLight(renderer: LevelRenderer): boolean;
  }


  interface LivingEntityMixin extends DynamicLightSource, Entity {}
  class LivingEntityMixin extends DynamicLightSource {
    constructor(type: EntityType<any>, level: Level);
    sdl$dynamicLightTick(): void;
    sdl$getLuminance(): number;
  }


  interface PlayerEntityMixin extends DynamicLightSource, LivingEntity {}
  class PlayerEntityMixin extends DynamicLightSource {
    isSpectator(): boolean;
    sdl$dynamicLightTick(): void;
    sdl$getLuminance(): number;
  }


  interface PrimedTntEntityMixin extends DynamicLightSource, Entity {}
  class PrimedTntEntityMixin extends DynamicLightSource {
    constructor(type: EntityType<any>, level: Level);
    get fuse(): number;
    sdl$dynamicLightTick(): void;
    sdl$getLuminance(): number;
  }

}

declare module 'toni.sodiumdynamiclights.mixin.sodium' {
  class ArrayLightDataCacheMixin {
  }


  class FlatLightPipelineMixin {
  }


  class LightDataAccessMixin {
  }


  class SodiumOptionsGuiMixin {
  }

}

declare module 'toni.sodiumdynamiclights.util' {
  import { OptionPage } from 'net.caffeinemc.mods.sodium.client.gui.options';
  import { SodiumOptionsStorage } from 'net.caffeinemc.mods.sodium.client.gui.options.storage';
  import { ThreadLocal } from 'java.lang';
  import { BlockPos } from 'net.minecraft.core';

  interface DynamicLightingPage extends OptionPage {}
  class DynamicLightingPage extends OptionPage {
    static readonly mixinsOptionsStorage: SodiumOptionsStorage;
    constructor();
  }


  class SodiumDynamicLightHandler {
    static readonly POS: ThreadLocal;
    static getLightmap(pos: BlockPos, word: number, lightmap: number): number;
  }

}