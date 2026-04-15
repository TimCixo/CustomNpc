declare module 'dev.tr7zw.entityculling.access' {
  import { Component } from 'net.minecraft.network.chat';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { AABB } from 'net.minecraft.world.phys';

  class EntityRendererInter<T extends Entity = any> {
    entityCullingGetCullingBox(var1: T): AABB;
    entityCullingIgnoresCulling(var1: T): boolean;
    shadowRenderNameTag(var1: T, var2: Component, var3: PoseStack, var4: MultiBufferSource, var5: number, var6: number): void;
    shadowShouldShowName(var1: T): boolean;
  }

}

declare module 'dev.tr7zw.entityculling.config' {
  import { Screen } from 'net.minecraft.client.gui.screens';

  class ConfigScreenProvider {
    static createConfigScreen(parent: Screen): Screen;
  }

}

declare module 'dev.tr7zw.entityculling' {
  import { Runnable, Boolean } from 'java.lang';
  import { OcclusionCullingInstance, DataProvider } from 'com.logisticscraft.occlusionculling';
  import { Set, List, Map } from 'java.util';
  import { BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { EntityType, Entity } from 'net.minecraft.world.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { Vec3, AABB } from 'net.minecraft.world.phys';
  import { EntityCullingVersionlessBase } from 'dev.tr7zw.entityculling.versionless';
  import { Function } from 'java.util.function';
  import { EntityRenderer } from 'net.minecraft.client.renderer.entity';

  interface CullTask extends Runnable {}
  class CullTask extends Runnable {
    requestCull: boolean;
    disableEntityCulling: boolean;
    disableBlockEntityCulling: boolean;
    lastTime: number;
    constructor(culling: OcclusionCullingInstance, blockEntityWhitelist: Set<BlockEntityType<any>>, entityWhistelist: Set<EntityType<any>>);
    run(): void;
    setBlockEntities(blockEntities: Map<BlockPos, BlockEntity>): void;
    setCameraMC(cameraMC: Vec3): void;
    setEntitiesForRendering(entitiesForRendering: Entity[]): void;
    setIngame(ingame: boolean): void;
  }


  class EntityCullingBootstrap {
    constructor();
  }


  interface EntityCullingMod extends EntityCullingModBase {}
  class EntityCullingMod extends EntityCullingModBase {
    initModloader(): void;
    onInitializeClient(): void;
    setupAABB(entity: BlockEntity, pos: BlockPos): AABB;
  }


  interface EntityCullingModBase extends EntityCullingVersionlessBase {}
  class EntityCullingModBase extends EntityCullingVersionlessBase {
    static instance: EntityCullingModBase;
    blockEntityWhitelist: Set;
    entityWhitelist: Set;
    tickCullWhistelist: Set;
    cullTask: CullTask;
    lastTickTime: number;
    addDynamicBlockEntityWhitelist(functionParameter: Function<BlockEntity, boolean>): void;
    addDynamicEntityWhitelist(functionParameter: Function<Entity, boolean>): void;
    clientTick(): void;
    isDynamicWhitelisted(entity: BlockEntity): boolean;
    isDynamicWhitelisted(entity: Entity): boolean;
    onInitialize(): void;
    setupAABB(var1: BlockEntity, var2: BlockPos): AABB;
    worldTick(): void;
  }


  class NMSCullingHelper {
    static getCullingBox(entity: Entity): AABB;
    static getRenderOffset(entityRenderer: EntityRenderer, entity: Entity, tickDelta: number): Vec3;
    static ignoresCulling(entity: Entity): boolean;
  }


  interface Provider extends DataProvider {}
  class Provider extends DataProvider {
    cleanup(): void;
    isOpaqueFullCube(x: number, y: number, z: number): boolean;
    prepareChunk(chunkX: number, chunkZ: number): boolean;
  }

}

declare module 'dev.tr7zw.entityculling.mixin' {
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { CallbackInfo, CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockEntityRenderer } from 'net.minecraft.client.renderer.blockentity';
  import { Entity } from 'net.minecraft.world.entity';
  import { Cullable } from 'dev.tr7zw.entityculling.versionless.access';
  import { List } from 'java.util';
  import { EntityRendererInter } from 'dev.tr7zw.entityculling.access';
  import { Component } from 'net.minecraft.network.chat';
  import { AABB } from 'net.minecraft.world.phys';

  class BlockEntityRenderDispatcherMixin {
    getRenderer<E extends BlockEntity>(var1: E): BlockEntityRenderer;
    render<E extends BlockEntity>(blockEntity: E, f: number, poseStack: PoseStack, multiBufferSource: MultiBufferSource, info: CallbackInfo): void;
  }


  class ClientWorldMixin {
    tickEntity(entity: Entity, info: CallbackInfo): void;
  }


  interface CullableMixin extends Cullable {}
  class CullableMixin extends Cullable {
    isCulled(): boolean;
    isForcedVisible(): boolean;
    isOutOfCamera(): boolean;
    setCulled(value: boolean): void;
    setOutOfCamera(value: boolean): void;
    setTimeout(): void;
  }


  class DebugHudMixin {
    getLeftText(callback: CallbackInfoReturnable<string[]>): string[];
  }


  class DebugScreenEntriesAccessor {
  }


  class DisplayAccessor {
    invokeSetHeight(var1: number): void;
    invokeSetWidth(var1: number): void;
  }


  interface EntityRendererMixin<T extends Entity = any> extends EntityRendererInter<T> {}
  class EntityRendererMixin<T extends Entity = any> extends EntityRendererInter<T> {
    entityCullingGetCullingBox(entity: T): AABB;
    entityCullingIgnoresCulling(entity: T): boolean;
    renderNameTag(var1: T, var2: Component, var3: PoseStack, var4: MultiBufferSource, var5: number, var6: number): void;
    shadowRenderNameTag(entity: T, component: Component, poseStack: PoseStack, multiBufferSource: MultiBufferSource, light: number, delta: number): void;
    shadowShouldShowName(entity: T): boolean;
    shouldShowName(var1: T): boolean;
  }


  class LivingEntityRendererAccessor {
  }


  class WorldRendererMixin {
  }

}

declare module 'dev.tr7zw.entityculling.versionless.access' {
  class Cullable {
    isCulled(): boolean;
    isForcedVisible(): boolean;
    isOutOfCamera(): boolean;
    setCulled(var1: boolean): void;
    setOutOfCamera(var1: boolean): void;
    setTimeout(): void;
  }

}

declare module 'dev.tr7zw.entityculling.versionless' {
  import { Set } from 'java.util';
  import { Logger } from 'org.apache.logging.log4j';
  import { OcclusionCullingInstance } from 'com.logisticscraft.occlusionculling';

  class Config {
    configVersion: number;
    renderNametagsThroughWalls: boolean;
    blockEntityWhitelist: Set;
    entityWhitelist: Set;
    tracingDistance: number;
    debugMode: boolean;
    sleepDelay: number;
    hitboxLimit: number;
    captureRate: number;
    tickCulling: boolean;
    tickCullingWhitelist: Set;
    disableF3: boolean;
    skipEntityCulling: boolean;
    skipBlockEntityCulling: boolean;
    blockEntityFrustumCulling: boolean;
    forceDisplayCulling: boolean;
  }


  class ConfigUpgrader {
    static upgradeConfig(config: Config): boolean;
  }


  class EntityCullingVersionlessBase {
    static readonly LOGGER: Logger;
    culling: OcclusionCullingInstance;
    debugHitboxes: boolean;
    static enabled: boolean;
    config: Config;
    renderedBlockEntities: number;
    skippedBlockEntities: number;
    renderedEntities: number;
    skippedEntities: number;
    tickedEntities: number;
    skippedEntityTicks: number;
    initModloader(): void;
    onInitialize(): void;
    writeConfig(): void;
  }

}