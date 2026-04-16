declare module 'net.raphimc.immediatelyfast.compat' {
  import { List } from 'java.util';
  import { BooleanSupplier } from 'java.util.function';
  import { BooleanConsumer } from 'it.unimi.dsi.fastutil.booleans';
  import { ThreadLocal } from 'java.lang';

  class CoreShaderBlacklist {
    static get blacklist(): string[];
    static isBlacklisted(name: string): boolean;
  }


  class IrisCompat {
    static IRIS_LOADED: boolean;
    static isRenderingLevel: BooleanSupplier;
    static renderWithExtendedVertexFormat: BooleanConsumer;
    static skipExtension: ThreadLocal;
    static init(): void;
  }

}

declare module 'net.raphimc.immediatelyfast.feature.batching' {
  import { BufferSource } from 'MultiBufferSource';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Runnable } from 'java.lang';
  import { BiFunction } from 'java.util.function';
  import { BatchableBufferSource } from 'net.raphimc.immediatelyfast.feature.core';
  import { ByteBufferBuilder, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { SequencedMap } from 'java.util';
  import { RenderType } from 'net.minecraft.client.renderer';

  class BatchingBuffers {
    static beginHudBatching(drawContext: GuiGraphics): BufferSource;
    static endHudBatching(drawContext: GuiGraphics, prev: BufferSource): void;
    static get hudBatchingVertexConsumers(): BufferSource;
    static get nonBatchingEntityVertexConsumers(): BufferSource;
    static isHudBatching(): boolean;
    static runBatched(drawContext: GuiGraphics, runnable: Runnable): void;
    static tryForceDrawHudBuffers(): void;
  }


  class BatchingRenderLayers {
    static readonly TEXTURE: BiFunction;
    static readonly COLORED_TEXTURE: BiFunction;
  }


  interface HudBatchingBufferSource extends BatchableBufferSource {}
  class HudBatchingBufferSource extends BatchableBufferSource {
    constructor(fallbackBuffer: ByteBufferBuilder, layerBuffers: SequencedMap<RenderType, ByteBufferBuilder>);
    close(): void;
    drawDirect(layer: RenderType): void;
    endBatch(): void;
    endBatch(layer: RenderType): void;
    getBuffer(layer: RenderType): VertexConsumer;
    isCurrentlyDrawing(): boolean;
    setRenderingItem(renderingItem: boolean): void;
  }

}

declare module 'net.raphimc.immediatelyfast.feature.batching.BatchingBuffers' {
  import { RenderType } from 'net.minecraft.client.renderer';
  import { Runnable } from 'java.lang';

  interface WrappedRenderLayer extends RenderType {}
  class WrappedRenderLayer extends RenderType {
    constructor(renderLayer: RenderType, additionalStartAction: Runnable, additionalEndAction: Runnable);
  }

}

declare module 'net.raphimc.immediatelyfast.feature.core' {
  import { BufferSource } from 'MultiBufferSource';
  import { AutoCloseable } from 'java.lang';
  import { SequencedMap } from 'java.util';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { ByteBufferBuilder, VertexConsumer } from 'com.mojang.blaze3d.vertex';

  interface BatchableBufferSource extends AutoCloseable, BufferSource {}
  class BatchableBufferSource extends AutoCloseable {
    constructor();

    constructor(layerBuffers: SequencedMap<RenderType, ByteBufferBuilder>);

    constructor(fallbackBuffer: ByteBufferBuilder, layerBuffers: SequencedMap<RenderType, ByteBufferBuilder>);
    close(): void;
    drawDirect(layer: RenderType): void;
    endBatch(): void;
    endBatch(layer: RenderType): void;
    endLastBatch(): void;
    getBuffer(layer: RenderType): VertexConsumer;
    hasActiveLayers(): boolean;
  }


  class BufferAllocatorPool {
    static borrowBufferAllocator(): ByteBufferBuilder;
    static get size(): number;
    static onEndFrame(): void;
    static returnBufferAllocatorSafe(bufferAllocator: ByteBufferBuilder): void;
  }


  class ImmediatelyFastConfig {
    font_atlas_resizing: boolean;
    map_atlas_generation: boolean;
    hud_batching: boolean;
    fast_text_lookup: boolean;
    fast_buffer_upload: boolean;
    dont_add_info_into_debug_hud: boolean;
    experimental_disable_error_checking: boolean;
    experimental_disable_resource_pack_conflict_handling: boolean;
    experimental_sign_text_buffering: boolean;
    experimental_screen_batching: boolean;
    debug_only_and_not_recommended_disable_universal_batching: boolean;
    debug_only_and_not_recommended_disable_mod_conflict_handling: boolean;
    debug_only_and_not_recommended_disable_hardware_conflict_handling: boolean;
    debug_only_print_additional_error_information: boolean;
    debug_only_use_last_usage_for_batch_ordering: boolean;
    debug_only_detailed_memory_leak_detection: boolean;
  }


  class ImmediatelyFastRuntimeConfig {
    hud_batching: boolean;
    font_atlas_resizing: boolean;
    fast_buffer_upload: boolean;
    experimental_screen_batching: boolean;
    constructor(config: ImmediatelyFastConfig);
  }

}

declare module 'net.raphimc.immediatelyfast.feature.map_atlas_generation' {
  import { AutoCloseable } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { DynamicTexture } from 'net.minecraft.client.renderer.texture';

  interface MapAtlasTexture extends AutoCloseable {}
  class MapAtlasTexture extends AutoCloseable {
    static readonly ATLAS_SIZE: number;
    static readonly MAP_SIZE: number;
    static readonly MAPS_PER_ATLAS: number;
    constructor(id: number);
    close(): void;
    get id(): number;
    get identifier(): ResourceLocation;
    get nextMapLocation(): number;
    get texture(): DynamicTexture;
  }

}

declare module 'net.raphimc.immediatelyfast.feature.sign_text_buffering' {
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { RenderTarget } from 'com.mojang.blaze3d.pipeline';
  import { AutoCloseable } from 'java.lang';
  import { Slot } from 'net.raphimc.immediatelyfast.feature.sign_text_buffering.SignAtlasFramebuffer';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ResourceManagerReloadListener, ResourceManager } from 'net.minecraft.server.packs.resources';
  import { Cache } from 'com.google.common.cache';
  import { RenderType } from 'net.minecraft.client.renderer';

  interface NoSetTextAnglesMatrixStack extends PoseStack {}
  class NoSetTextAnglesMatrixStack extends PoseStack {
  }


  interface SignAtlasFramebuffer extends AutoCloseable, RenderTarget {}
  class SignAtlasFramebuffer extends AutoCloseable {
    static readonly ATLAS_SIZE: number;
    constructor();
    clear(): void;
    close(): void;
    findSlot(width: number, height: number): Slot;
    get textureId(): ResourceLocation;
  }


  interface SignTextCache extends ResourceManagerReloadListener {}
  class SignTextCache extends ResourceManagerReloadListener {
    readonly signAtlasFramebuffer: SignAtlasFramebuffer;
    readonly slotCache: Cache;
    readonly renderLayer: RenderType;
    clearCache(): void;
    onResourceManagerReload(manager: ResourceManager): void;
  }

}

declare module 'net.raphimc.immediatelyfast.feature.sign_text_buffering.SignAtlasFramebuffer' {
  class Slot {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly parentSlot: Slot;
    subSlot1: Slot;
    subSlot2: Slot;
    occupied: boolean;
    constructor(parentSlot: Slot, x: number, y: number, width: number, height: number);
    findSlot(width: number, height: number): Slot;
    markFree(): void;
  }

}

declare module 'net.raphimc.immediatelyfast' {
  import { Logger } from 'org.slf4j';
  import { ImmediatelyFastConfig, ImmediatelyFastRuntimeConfig } from 'net.raphimc.immediatelyfast.feature.core';
  import { SignTextCache } from 'net.raphimc.immediatelyfast.feature.sign_text_buffering';
  import { Path } from 'java.nio.file';
  import { Optional } from 'java.util';

  class ImmediatelyFast {
    static readonly LOGGER: Logger;
    static VERSION: string;
    static config: ImmediatelyFastConfig;
    static runtimeConfig: ImmediatelyFastRuntimeConfig;
    static signTextCache: SignTextCache;
    static createRuntimeConfig(): void;
    static earlyInit(): void;
    static lateInit(): void;
    static loadConfig(): void;
    static onWorldJoin(): void;
    static windowInit(): void;
  }


  class PlatformCode {
    static checkModCompatibility(): void;
    static get configDirectory(): Path;
    static getModVersion(mod: string): Optional<string>;
  }

}

declare module 'net.raphimc.immediatelyfast.injection' {
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { Set, List } from 'java.util';
  import { ClassNode } from 'org.objectweb.asm.tree';

  interface ImmediatelyFastMixinPlugin extends IMixinConfigPlugin {}
  class ImmediatelyFastMixinPlugin extends IMixinConfigPlugin {
    acceptTargets(myTargets: Set<string>, otherTargets: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    onLoad(mixinPackage: string): void;
    postApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    preApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    shouldApplyMixin(targetClassName: string, mixinClassName: string): boolean;
  }

}

declare module 'net.raphimc.immediatelyfast.injection.interfaces' {
  import { MapAtlasTexture } from 'net.raphimc.immediatelyfast.feature.map_atlas_generation';

  class IMapRenderer {
    immediatelyFast$getAtlasMapping(var1: number): number;
    immediatelyFast$getMapAtlasTexture(var1: number): MapAtlasTexture;
  }


  class ISignText {
    immediatelyFast$setShouldCache(var1: boolean): void;
    immediatelyFast$shouldCache(): boolean;
  }

}

declare module 'net.raphimc.immediatelyfast.injection.mixins.core.compat.iris' {
  class MixinIris_ShadowRenderer {
  }

}

declare module 'net.raphimc.immediatelyfast.injection.mixins.core.compat' {
  class MixinGameRenderer {
  }


  class MixinTextDisplayEntityRenderer {
  }

}

declare module 'net.raphimc.immediatelyfast.injection.mixins.core' {
  import { BufferSource } from 'MultiBufferSource';
  import { SequencedMap } from 'java.util';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { ByteBufferBuilder } from 'com.mojang.blaze3d.vertex';

  class MixinDebugHud {
  }


  class MixinGameRenderer {
  }


  class MixinGlDebug {
  }


  class MixinMinecraftClient {
  }


  class MixinRenderLayer {
  }


  class MixinTextureManager {
  }


  class MixinVertexConsumerProvider {
    static immediateWithBuffers(layerBuffers: SequencedMap<RenderType, ByteBufferBuilder>, fallbackBuffer: ByteBufferBuilder): BufferSource;
  }


  class MixinWindow {
  }

}

declare module 'net.raphimc.immediatelyfast.injection.mixins.disable_error_checking' {
  class MixinGL11 {
    static glGetError(): number;
  }

}

declare module 'net.raphimc.immediatelyfast.injection.mixins.fast_buffer_upload' {
  class MixinVertexBuffer {
  }

}

declare module 'net.raphimc.immediatelyfast.injection.mixins.font_atlas_resizing' {
  class MixinGlyphAtlasTexture {
  }

}

declare module 'net.raphimc.immediatelyfast.injection.mixins.hud_batching.compat.journeymap' {
  class MixinJourneyMap_MiniMap {
  }

}

declare module 'net.raphimc.immediatelyfast.injection.mixins.hud_batching.compat' {
  import { BufferSource } from 'MultiBufferSource';

  class MixinBufferRenderer {
  }


  class MixinDebugHud {
  }


  class MixinDrawContext {
    bufferSource: BufferSource;
    flush(): void;
  }


  class MixinFramebuffer {
  }


  class MixinRenderSystem {
  }

}

declare module 'net.raphimc.immediatelyfast.injection.mixins.hud_batching.compat.xaerominimap' {
  class MixinXaerosMinimap_ClientEvents {
  }

}

declare module 'net.raphimc.immediatelyfast.injection.mixins.hud_batching.consumer' {
  import { BufferSource } from 'MultiBufferSource';

  class MixinDrawContext {
    bufferSource: BufferSource;
  }

}

declare module 'net.raphimc.immediatelyfast.injection.mixins.hud_batching' {
  class MixinGameRenderer {
  }


  class MixinItemRenderer {
  }


  class MixinLayeredDrawer {
  }

}

declare module 'net.raphimc.immediatelyfast.injection.mixins.map_atlas_generation' {
  import { IMapRenderer } from 'net.raphimc.immediatelyfast.injection.interfaces';
  import { MapAtlasTexture } from 'net.raphimc.immediatelyfast.feature.map_atlas_generation';

  interface MixinMapRenderer extends IMapRenderer {}
  class MixinMapRenderer extends IMapRenderer {
    immediatelyFast$getAtlasMapping(mapId: number): number;
    immediatelyFast$getMapAtlasTexture(id: number): MapAtlasTexture;
  }


  class MixinMapRenderer_MapTexture {
  }

}

declare module 'net.raphimc.immediatelyfast.injection.mixins.screen_batching.compat' {
  class MixinChatScreen {
  }

}

declare module 'net.raphimc.immediatelyfast.injection.mixins.screen_batching' {
  class MixinHandledScreen {
  }

}

declare module 'net.raphimc.immediatelyfast.injection.mixins.sign_text_buffering' {
  import { ISignText } from 'net.raphimc.immediatelyfast.injection.interfaces';

  class MixinSignBlockEntityRenderer {
  }


  interface MixinSignText extends ISignText {}
  class MixinSignText extends ISignText {
    equals(o: any): boolean;
    hashCode(): number;
    immediatelyFast$setShouldCache(shouldCache: boolean): void;
    immediatelyFast$shouldCache(): boolean;
  }

}

declare module 'net.raphimc.immediatelyfast.neoforge' {
  class ImmediatelyFastNeoForge {
  }

}

declare module 'net.raphimc.immediatelyfast.neoforge.injection.mixins.core' {
  class MixinNeoForgeRenderTypes {
  }

}

declare module 'net.raphimc.immediatelyfast.neoforge.injection.mixins.hud_batching.compat.appleskin' {
  class MixinAppleSkin_HUDOverlayHandler {
  }

}

declare module 'net.raphimc.immediatelyfast.neoforge.injection.mixins.hud_batching.compat.ftbchunks' {
  class MixinFTBChunks_FTBChunksClient {
  }

}

declare module 'net.raphimc.immediatelyfast.neoforge.injection.mixins.hud_batching' {
  class MixinGuiLayerManager {
  }

}

declare module 'net.raphimc.immediatelyfast.neoforge.injection.mixins.screen_batching' {
  class MixinClientHooks {
  }

}

declare module 'net.raphimc.immediatelyfastapi' {
  class ApiAccess {
    get batching(): BatchingAccess;
    get config(): ConfigAccess;
    get runtimeConfig(): ConfigAccess;
  }


  class BatchingAccess {
    beginHudBatching(): void;
    endHudBatching(): void;
    forceDrawBuffers(): void;
    hasDataToDraw(): boolean;
    isHudBatching(): boolean;
  }


  class ConfigAccess {
    getBoolean(var1: string, var2: boolean): boolean;
    getInt(var1: string, var2: number): number;
    getLong(var1: string, var2: number): number;
    getString(var1: string, var2: string): string;
  }


  class ImmediatelyFastApi {
    static get apiImpl(): ApiAccess;
    static set apiImpl(impl: ApiAccess);
  }

}