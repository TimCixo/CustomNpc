declare module 'net.irisshaders.batchedentityrendering.impl' {
  import { ByteBufferBuilder, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { BufferSource } from 'MultiBufferSource';
  import { WrappingMultiBufferSource } from 'net.irisshaders.iris.layer';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { Function } from 'java.util.function';
  import { List } from 'java.util';
  import { Enum } from 'java.lang';

  class BatchingDebugMessageHelper {
    static getDebugMessage(drawTracker: DrawCallTrackingRenderBuffers): string;
  }


  class BlendingStateHolder {
    get transparencyType(): TransparencyType;
    set transparencyType(var1: TransparencyType);
  }


  class BufferBuilderExt {
    splitStrip(): void;
  }


  class BufferSegmentRenderer {
    draw(segment: BufferSegment): void;
    drawInner(segment: BufferSegment): void;
  }


  interface ByteBufferBuilderHolder extends MemoryTrackingBuffer {}
  class ByteBufferBuilderHolder extends MemoryTrackingBuffer {
    constructor(builder: ByteBufferBuilder);
    delete(clearTime: number): boolean;
    deleteOrClear(clearTime: number): boolean;
    forceDelete(): void;
    freeAndDeleteBuffer(): void;
    get allocatedSize(): number;
    get buffer(): ByteBufferBuilder;
    get usedSize(): number;
    wasUsed(): void;
  }


  class DrawCallTrackingRenderBuffers {
    get drawCalls(): number;
    get renderTypes(): number;
    resetDrawCounts(): void;
  }


  class FlushableMultiBufferSource {
    flushNonTranslucentContent(): void;
    flushTranslucentContent(): void;
  }


  interface FullyBufferedMultiBufferSource extends MemoryTrackingBuffer, Groupable, WrappingMultiBufferSource, BufferSource {}
  class FullyBufferedMultiBufferSource extends MemoryTrackingBuffer {
    constructor();
    assertWrapStackEmpty(): void;
    endBatch(): void;
    endBatch(type: RenderType): void;
    endBatchWithType(transparencyType: TransparencyType): void;
    endGroup(): void;
    freeAndDeleteBuffer(): void;
    get allocatedSize(): number;
    get drawCalls(): number;
    get renderTypes(): number;
    get unflushableWrapper(): BufferSource;
    get usedSize(): number;
    getBuffer(renderType: RenderType): VertexConsumer;
    maybeStartGroup(): boolean;
    popWrappingFunction(): void;
    pushWrappingFunction(wrappingFunction: Function<RenderType, RenderType>): void;
    readyUp(): void;
    resetDrawCalls(): void;
    startGroup(): void;
    weAreOutOfMemory(): void;
  }


  class Groupable {
    endGroup(): void;
    maybeStartGroup(): boolean;
    startGroup(): void;
  }


  class MemoryTrackingBuffer {
    freeAndDeleteBuffer(): void;
    get allocatedSize(): number;
    get usedSize(): number;
  }


  class MemoryTrackingRenderBuffers {
    freeAndDeleteBuffers(): void;
    get entityBufferAllocatedSize(): number;
    get maxBegins(): number;
    get miscBufferAllocatedSize(): number;
  }


  interface OldFullyBufferedMultiBufferSource extends BufferSource {}
  class OldFullyBufferedMultiBufferSource extends BufferSource {
    constructor();
    endBatch(): void;
    endBatch(type: RenderType): void;
    getBuffer(renderType: RenderType): VertexConsumer;
  }


  class RenderBuffersExt {
    beginLevelRendering(): void;
    endLevelRendering(): void;
  }


  class RenderTypeUtil {
    static isTriangleStripDrawMode(renderType: RenderType): boolean;
  }


  interface SegmentedBufferBuilder extends MemoryTrackingBuffer {}
  class SegmentedBufferBuilder extends MemoryTrackingBuffer {
    constructor(parent: FullyBufferedMultiBufferSource);
    clearBuffers(clearTime: number): void;
    freeAndDeleteBuffer(): void;
    get allocatedSize(): number;
    get segments(): BufferSegment[];
    get usedSize(): number;
    getBuffer(renderType: RenderType): VertexConsumer;
    lastDitchAttempt(): void;
  }


  interface TransparencyType extends Enum<TransparencyType> {}
  class TransparencyType extends Enum<TransparencyType> {
    static readonly OPAQUE: TransparencyType;
    static readonly OPAQUE_DECAL: TransparencyType;
    static readonly GENERAL_TRANSPARENT: TransparencyType;
    static readonly DECAL: TransparencyType;
    static readonly WATER_MASK: TransparencyType;
    static readonly LINES: TransparencyType;
    static valueOf(name: string): TransparencyType;
    static values(): TransparencyType[];
  }


  class WrappableRenderType {
    unwrap(): RenderType;
  }

}

declare module 'net.irisshaders.batchedentityrendering.impl.ordering' {
  import { RenderType } from 'net.minecraft.client.renderer';
  import { TransparencyType } from 'net.irisshaders.batchedentityrendering.impl';
  import { List } from 'java.util';

  interface GraphTranslucencyRenderOrderManager extends RenderOrderManager {}
  class GraphTranslucencyRenderOrderManager extends RenderOrderManager {
    constructor();
    begin(renderType: RenderType): void;
    endGroup(): void;
    get renderOrder(): RenderType[];
    isInGroup(): boolean;
    maybeStartGroup(): boolean;
    reset(): void;
    resetType(type: TransparencyType): void;
    startGroup(): void;
  }


  class RenderOrderManager {
    begin(var1: RenderType): void;
    endGroup(): void;
    get renderOrder(): RenderType[];
    isInGroup(): boolean;
    maybeStartGroup(): boolean;
    reset(): void;
    resetType(var1: TransparencyType): void;
    startGroup(): void;
  }


  interface SimpleRenderOrderManager extends RenderOrderManager {}
  class SimpleRenderOrderManager extends RenderOrderManager {
    begin(type: RenderType): void;
    endGroup(): void;
    get renderOrder(): RenderType[];
    isInGroup(): boolean;
    maybeStartGroup(): boolean;
    reset(): void;
    resetType(type: TransparencyType): void;
    startGroup(): void;
  }


  interface TranslucencyRenderOrderManager extends RenderOrderManager {}
  class TranslucencyRenderOrderManager extends RenderOrderManager {
    constructor();
    begin(type: RenderType): void;
    endGroup(): void;
    get groupId(): number;
    get renderOrder(): RenderType[];
    isInGroup(): boolean;
    maybeStartGroup(): boolean;
    reset(): void;
    resetType(type: TransparencyType): void;
    startGroup(): void;
  }

}

declare module 'net.irisshaders.batchedentityrendering.impl.wrappers' {
  import { RenderType } from 'net.minecraft.client.renderer';
  import { WrappableRenderType, BlendingStateHolder, TransparencyType } from 'net.irisshaders.batchedentityrendering.impl';
  import { Optional } from 'java.util';

  interface TaggingRenderTypeWrapper extends WrappableRenderType, BlendingStateHolder, RenderType {}
  class TaggingRenderTypeWrapper extends WrappableRenderType {
    constructor(name: string, wrapped: RenderType, tag: number);
    equals(object: any): boolean;
    get transparencyType(): TransparencyType;
    hashCode(): number;
    isOutline(): boolean;
    outline(): Optional<RenderType>;
    set transparencyType(transparencyType: TransparencyType);
    toString(): string;
    unwrap(): RenderType;
  }

}

declare module 'net.irisshaders.batchedentityrendering.mixin' {
  import { SequencedMap, Map } from 'java.util';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { ByteBufferBuilder } from 'com.mojang.blaze3d.vertex';
  import { TransparencyStateShard, DepthTestStateShard } from 'RenderStateShard';
  import { BufferBuilderExt, MemoryTrackingBuffer, BlendingStateHolder, TransparencyType, RenderBuffersExt, MemoryTrackingRenderBuffers, DrawCallTrackingRenderBuffers } from 'net.irisshaders.batchedentityrendering.impl';
  import { BufferSource } from 'MultiBufferSource';

  class BufferSourceAccessor {
    get fixedBuffers(): SequencedMap<RenderType, ByteBufferBuilder>;
  }


  class CompositeStateAccessor {
    get depth(): DepthTestStateShard;
    get transparency(): TransparencyStateShard;
  }


  class MixinBannerRenderer {
  }


  interface MixinBufferBuilder_SegmentRendering extends BufferBuilderExt {}
  class MixinBufferBuilder_SegmentRendering extends BufferBuilderExt {
    splitStrip(): void;
  }


  interface MixinBufferSource extends MemoryTrackingBuffer {}
  class MixinBufferSource extends MemoryTrackingBuffer {
    freeAndDeleteBuffer(): void;
    get allocatedSize(): number;
    get usedSize(): number;
  }


  interface MixinByteBufferBuilder extends MemoryTrackingBuffer {}
  class MixinByteBufferBuilder extends MemoryTrackingBuffer {
    close(): void;
    freeAndDeleteBuffer(): void;
    get allocatedSize(): number;
    get usedSize(): number;
  }


  interface MixinCompositeRenderType extends BlendingStateHolder, RenderType {}
  class MixinCompositeRenderType extends BlendingStateHolder {
    get transparencyType(): TransparencyType;
    set transparencyType(type: TransparencyType);
  }


  class MixinDebugScreenOverlay {
  }


  class MixinFishingHookRenderer {
  }


  class MixinLevelRenderer {
  }


  class MixinLevelRenderer_EntityListSorting {
  }


  interface MixinRenderBuffers extends RenderBuffersExt, MemoryTrackingRenderBuffers, DrawCallTrackingRenderBuffers {}
  class MixinRenderBuffers extends RenderBuffersExt {
    beginLevelRendering(): void;
    endLevelRendering(): void;
    freeAndDeleteBuffers(): void;
    get drawCalls(): number;
    get entityBufferAllocatedSize(): number;
    get maxBegins(): number;
    get miscBufferAllocatedSize(): number;
    get renderTypes(): number;
    resetDrawCounts(): void;
  }


  interface MixinRenderType extends BlendingStateHolder {}
  class MixinRenderType extends BlendingStateHolder {
    get transparencyType(): TransparencyType;
    set transparencyType(transparencyType: TransparencyType);
  }


  class MixinSheets {
  }


  class OutlineBufferSourceAccessor {
    get outlineBufferSource(): BufferSource;
  }


  class RenderStateShardAccessor {
    static getCRUMBLING_TRANSPARENCY(): TransparencyStateShard;
    static getGLINT_TRANSPARENCY(): TransparencyStateShard;
    static getNO_TRANSPARENCY(): TransparencyStateShard;
  }


  class RenderTypeAccessor {
    shouldSortOnUpload(): boolean;
  }


  class SectionBufferBuilderPackAccessor {
    get buffers(): Map<RenderType, ByteBufferBuilder>;
  }

}

declare module 'net.irisshaders.iris.api.v0' {
  import { IntFunction } from 'java.util.function';
  import { ByteBuffer } from 'java.nio';
  import { VertexFormat } from 'com.mojang.blaze3d.vertex';

  class IrisApi {
    createTextVertexSink(var1: number, var2: IntFunction<ByteBuffer>): IrisTextVertexSink;
    get config(): IrisApiConfig;
    get mainScreenLanguageKey(): string;
    get minorApiRevision(): number;
    get sunPathRotation(): number;
    static getInstance(): IrisApi;
    isRenderingShadowPass(): boolean;
    isShaderPackInUse(): boolean;
    openMainIrisScreenObj(var1: any): any;
  }


  class IrisApiConfig {
    areShadersEnabled(): boolean;
    setShadersEnabledAndApply(var1: boolean): void;
  }


  class IrisApiInternal {
  }


  class IrisTextVertexSink {
    get underlyingByteBuffer(): ByteBuffer;
    get underlyingVertexFormat(): VertexFormat;
    quad(var1: number, var2: number, var3: number, var4: number, var5: number, var6: number, var7: number, var8: number, var9: number, var10: number, var11: number): void;
  }

}

declare module 'net.irisshaders.iris.api.v0.item' {
  import { Vector3f } from 'org.joml';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';

  class IrisItemLightProvider {
    static readonly DEFAULT_LIGHT_COLOR: Vector3f;
    getLightColor(player: Player, stack: ItemStack): Vector3f;
    getLightEmission(player: Player, stack: ItemStack): number;
  }

}

declare module 'net.irisshaders.iris' {
  import { NamespacedId } from 'net.irisshaders.iris.shaderpack.materialmap';
  import { Minecraft } from 'net.minecraft.client';
  import { Path } from 'java.nio.file';
  import { Map, Properties, Optional } from 'java.util';
  import { Profile } from 'net.irisshaders.iris.shaderpack.option';
  import { PipelineManager } from 'net.irisshaders.iris.pipeline';
  import { Exception, Throwable } from 'java.lang';
  import { ShaderPack } from 'net.irisshaders.iris.shaderpack';
  import { IrisConfig } from 'net.irisshaders.iris.config';
  import { ShaderpackDirectoryManager } from 'net.irisshaders.iris.shaderpack.discovery';
  import { UpdateInfo, BetaInfo } from 'net.irisshaders.iris.UpdateChecker';
  import { Component } from 'net.minecraft.network.chat';

  class BuildConfig {
    static readonly IS_SHARED_BETA: boolean;
    static readonly ACTIVATE_RENDERDOC: boolean;
    static readonly BETA_TAG: string;
    static readonly BETA_VERSION: number;
  }


  class DesktopBuildConfig {
    static readonly IS_SHARED_BETA: boolean;
  }


  class Iris {
    static readonly MODID: string;
    static readonly MODNAME: string;
    static readonly logger: IrisLogging;
    static lastDimension: NamespacedId;
    static testing: boolean;
    static clearShaderPackOptionQueue(): void;
    static duringRenderSystemInit(): void;
    static get backupVersionNumber(): string;
    static get currentDimension(): NamespacedId;
    static get currentPack(): Optional<ShaderPack>;
    static get currentPackName(): string;
    static get formattedVersion(): string;
    static get irisConfig(): IrisConfig;
    static get pipelineManager(): PipelineManager;
    static get releaseTarget(): string;
    static get shaderPackOptionQueue(): Map<string, string>;
    static get shaderpacksDirectory(): Path;
    static get shaderpacksDirectoryManager(): ShaderpackDirectoryManager;
    static get storedError(): Optional<Exception>;
    static get updateChecker(): UpdateChecker;
    static get version(): string;
    static handleKeybinds(minecraft: Minecraft): void;
    static isFallback(): boolean;
    static isPackInUseQuick(): boolean;
    static isValidShaderpack(pack: Path): boolean;
    static isValidToShowPack(pack: Path): boolean;
    static loadShaderpack(): void;
    static loadShaderpackWhenPossible(): void;
    static loadedIncompatiblePack(): boolean;
    onEarlyInitialize(): void;
    static onLoadingComplete(): void;
    static onRenderSystemInit(): void;
    static queueDefaultShaderPackOptionValues(): void;
    static queueShaderPackOptionsFromProfile(profile: Profile): void;
    static queueShaderPackOptionsFromProperties(properties: Properties): void;
    static reload(): void;
    static resetShaderPackOptionsOnNextReload(): void;
    static setDebug(enable: boolean): void;
    static shouldActivateWireframe(): boolean;
    static shouldResetShaderPackOptionsOnNextReload(): boolean;
    static toggleShaders(minecraft: Minecraft, enabled: boolean): void;
  }


  class IrisLogging {
    static readonly ENABLE_SPAM: boolean;
    constructor(loggerName: string);
    debug(debug: string): void;
    debug(debug: string, t: Throwable): void;
    error(error: string): void;
    error(error: string, ...o: any[]): void;
    error(error: string, t: Throwable): void;
    fatal(fatal: string): void;
    fatal(fatal: string, t: Throwable): void;
    info(info: string): void;
    info(info: string, ...o: any[]): void;
    warn(warning: string): void;
    warn(warning: string, ...object: any[]): void;
    warn(warning: string, t: Throwable): void;
    warn(o: Throwable): void;
  }


  class LaunchWarn {
    static main(args: string[]): void;
  }


  class UpdateChecker {
    constructor(currentVersion: string);
    checkForUpdates(irisConfig: IrisConfig): void;
    get betaInfo(): Optional<BetaInfo>;
    get updateInfo(): UpdateInfo;
    get updateLink(): Optional<string>;
    get updateMessage(): Optional<Component>;
  }

}

declare module 'net.irisshaders.iris.compat.dh' {
  import { IrisRenderingPipeline } from 'net.irisshaders.iris.pipeline';
  import { Matrix4f, Matrix3f, Matrix4fc } from 'org.joml';
  import { DhApiVec3f, DhApiVec3d } from 'com.seibel.distanthorizons.api.objects.math';
  import { GlFramebuffer } from 'net.irisshaders.iris.gl.framebuffer';
  import { IDhApiGenericObjectShaderProgram, IDhApiFramebuffer } from 'com.seibel.distanthorizons.api.interfaces.override.rendering';
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { Set, List } from 'java.util';
  import { ClassNode } from 'org.objectweb.asm.tree';
  import { ProgramSource } from 'net.irisshaders.iris.shaderpack.programs';
  import { CustomUniforms } from 'net.irisshaders.iris.uniforms.custom';
  import { CharSequence, Void } from 'java.lang';
  import { DhApiRenderParam, DhApiEventParam, DhApiCancelableEventParam } from 'com.seibel.distanthorizons.api.methods.events.sharedParameterObjects';
  import { DhApiRenderableBoxGroupShading, DhApiRenderableBox } from 'com.seibel.distanthorizons.api.objects.render';
  import { IDhApiRenderableBoxGroup } from 'com.seibel.distanthorizons.api.interfaces.render';
  import { EventParam } from 'DhApiBeforeGenericObjectRenderEvent';
  import { EventParam as dhapicolordepthtexturecreatedevent_EventParam } from 'DhApiColorDepthTextureCreatedEvent';
  import { EventParam as dhapibeforebufferrenderevent_EventParam } from 'DhApiBeforeBufferRenderEvent';

  class DHCompat {
    constructor(pipeline: IrisRenderingPipeline, renderDHShadow: boolean);
    static checkFrame(): boolean;
    clearPipeline(): void;
    get depthTex(): number;
    get depthTexNoTranslucent(): number;
    static get farPlane(): number;
    get instance(): any;
    static get nearPlane(): number;
    static get projection(): Matrix4f;
    static get renderDistance(): number;
    static hasRenderingEnabled(): boolean;
    static lastPackIncompatible(): boolean;
    static run(): void;
  }


  class DHCompatInternal {
    static readonly SHADERLESS: DHCompatInternal;
    shouldOverrideShadow: boolean;
    shouldOverride: boolean;
    constructor(pipeline: IrisRenderingPipeline, dhShadowEnabled: boolean);
    avoidRenderingClouds(): boolean;
    static checkFrame(): boolean;
    clear(): void;
    copyTranslucents(width: number, height: number): void;
    createDepthTex(width: number, height: number): void;
    get depthTexNoTranslucent(): number;
    static get dhBlockRenderDistance(): number;
    static get farPlane(): number;
    get genericFB(): GlFramebuffer;
    get genericShader(): IDhApiGenericObjectShaderProgram;
    static get nearPlane(): number;
    static get renderDistance(): number;
    get shadowFB(): GlFramebuffer;
    get shadowFBWrapper(): DhFrameBufferWrapper;
    get shadowShader(): IrisLodRenderProgram;
    get solidFB(): GlFramebuffer;
    get solidFBWrapper(): DhFrameBufferWrapper;
    get solidShader(): IrisLodRenderProgram;
    get storedDepthTex(): number;
    get translucentFB(): GlFramebuffer;
    get translucentShader(): IrisLodRenderProgram;
    incompatiblePack(): boolean;
    reconnectDHTextures(depthTex: number): void;
    setModelPos(modelPos: DhApiVec3f): void;
  }


  interface DhFrameBufferWrapper extends IDhApiFramebuffer {}
  class DhFrameBufferWrapper extends IDhApiFramebuffer {
    constructor(framebuffer: GlFramebuffer);
    addColorAttachment(i: number, i1: number): void;
    addDepthAttachment(i: number, b: boolean): void;
    bind(): void;
    destroy(): void;
    get id(): number;
    get status(): number;
    overrideThisFrame(): boolean;
  }


  interface DHMixinConfigPlugin extends IMixinConfigPlugin {}
  class DHMixinConfigPlugin extends IMixinConfigPlugin {
    acceptTargets(myTargets: Set<string>, otherTargets: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    onLoad(mixinPackage: string): void;
    postApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    preApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    shouldApplyMixin(targetClassName: string, mixinClassName: string): boolean;
  }


  interface IrisGenericRenderProgram extends IDhApiGenericObjectShaderProgram {}
  class IrisGenericRenderProgram extends IDhApiGenericObjectShaderProgram {
    readonly modelViewUniform: number;
    readonly modelViewInverseUniform: number;
    readonly projectionUniform: number;
    readonly projectionInverseUniform: number;
    readonly normalMatrix3fUniform: number;
    bind(renderParam: DhApiRenderParam): void;
    bindVertexBuffer(i: number): void;
    static createProgram(name: string, isShadowPass: boolean, translucent: boolean, source: ProgramSource, uniforms: CustomUniforms, pipeline: IrisRenderingPipeline): IrisGenericRenderProgram;
    fillDirectUniformData(dhApiRenderParam: DhApiRenderParam, iDhApiRenderableBoxGroup: IDhApiRenderableBoxGroup, dhApiRenderableBox: DhApiRenderableBox, dhApiVec3d: DhApiVec3d): void;
    fillIndirectUniformData(dhApiRenderParam: DhApiRenderParam, dhApiRenderableBoxGroupShading: DhApiRenderableBoxGroupShading, boxGroup: IDhApiRenderableBoxGroup, camPos: DhApiVec3d): void;
    fillSharedDirectUniformData(dhApiRenderParam: DhApiRenderParam, dhApiRenderableBoxGroupShading: DhApiRenderableBoxGroupShading, iDhApiRenderableBoxGroup: IDhApiRenderableBoxGroup, dhApiVec3d: DhApiVec3d): void;
    free(): void;
    get id(): number;
    overrideThisFrame(): boolean;
    setUniform(index: number, matrix: Matrix4f): void;
    setUniform(index: number, matrix: Matrix3f): void;
    tryGetUniformLocation2(name: CharSequence): number;
    unbind(): void;
  }


  class IrisLodRenderProgram {
    readonly modelOffsetUniform: number;
    readonly worldYOffsetUniform: number;
    readonly mircoOffsetUniform: number;
    readonly modelViewUniform: number;
    readonly modelViewInverseUniform: number;
    readonly projectionUniform: number;
    readonly projectionInverseUniform: number;
    readonly normalMatrix3fUniform: number;
    readonly clipDistanceUniform: number;
    bind(): void;
    static createProgram(name: string, isShadowPass: boolean, translucent: boolean, source: ProgramSource, uniforms: CustomUniforms, pipeline: IrisRenderingPipeline): IrisLodRenderProgram;
    fillUniformData(projection: Matrix4fc, modelView: Matrix4fc, worldYOffset: number, partialTicks: number): void;
    free(): void;
    setModelPos(modelPos: DhApiVec3f): void;
    setUniform(index: number, matrix: Matrix4fc): void;
    setUniform(index: number, matrix: Matrix3f): void;
    tryGetUniformLocation2(name: CharSequence): number;
    unbind(): void;
  }


  class LodRendererEvents {
    afterDistantHorizonsInit(event: DhApiEventParam<Void>): void;
    beforeCleanup(event: DhApiEventParam<DhApiRenderParam>): void;
    beforeClear(event: DhApiCancelableEventParam<DhApiRenderParam>): void;
    beforeClear(event: DhApiCancelableEventParam<DhApiRenderParam>): void;
    beforeRender(event: DhApiCancelableEventParam<DhApiRenderParam>): void;
    beforeRender(dhApiCancelableEventParam: DhApiCancelableEventParam<EventParam>): void;
    beforeRender(event: DhApiCancelableEventParam<DhApiRenderParam>): void;
    beforeRender(event: DhApiCancelableEventParam<DhApiRenderParam>): void;
    beforeRender(input: DhApiEventParam<dhapibeforebufferrenderevent_EventParam>): void;
    beforeRender(event: DhApiEventParam<DhApiRenderParam>): void;
    beforeRender(event: DhApiCancelableEventParam<DhApiRenderParam>): void;
    beforeSetup(dhApiEventParam: DhApiEventParam<DhApiRenderParam>): void;
    beforeSetup(event: DhApiEventParam<DhApiRenderParam>): void;
    onResize(input: DhApiEventParam<dhapicolordepthtexturecreatedevent_EventParam>): void;
    static setupEventHandlers(): void;
  }

}

declare module 'net.irisshaders.iris.compat.dh.mixin' {
  import { Frustum } from 'net.minecraft.client.renderer.culling';
  import { IDhApiShadowCullingFrustum } from 'com.seibel.distanthorizons.api.interfaces.override.rendering';
  import { Matrix4f } from 'org.joml';
  import { DhApiMat4f } from 'com.seibel.distanthorizons.api.objects.math';

  interface MixinAdvancedShadowCullingFrustum extends IDhApiShadowCullingFrustum, Frustum {}
  class MixinAdvancedShadowCullingFrustum extends IDhApiShadowCullingFrustum {
    constructor(matrix4f: Matrix4f, matrix4f2: Matrix4f);
    intersects(lodBlockPosMinX: number, lodBlockPosMinZ: number, lodBlockWidth: number, lodDetailLevel: number): boolean;
    update(worldMinBlockY: number, worldMaxBlockY: number, worldViewProjection: DhApiMat4f): void;
  }


  interface MixinBoxCullingFrustum extends IDhApiShadowCullingFrustum {}
  class MixinBoxCullingFrustum extends IDhApiShadowCullingFrustum {
    intersects(lodBlockPosMinX: number, lodBlockPosMinZ: number, lodBlockWidth: number, lodDetailLevel: number): boolean;
    update(worldMinBlockY: number, worldMaxBlockY: number, worldViewProjection: DhApiMat4f): void;
  }


  interface MixinCullEverythingFrustum extends IDhApiShadowCullingFrustum {}
  class MixinCullEverythingFrustum extends IDhApiShadowCullingFrustum {
    intersects(lodBlockPosMinX: number, lodBlockPosMinZ: number, lodBlockWidth: number, lodDetailLevel: number): boolean;
    update(worldMinBlockY: number, worldMaxBlockY: number, worldViewProjection: DhApiMat4f): void;
  }


  interface MixinNonCullingFrustum extends IDhApiShadowCullingFrustum {}
  class MixinNonCullingFrustum extends IDhApiShadowCullingFrustum {
    intersects(lodBlockPosMinX: number, lodBlockPosMinZ: number, lodBlockWidth: number, lodDetailLevel: number): boolean;
    update(worldMinBlockY: number, worldMaxBlockY: number, worldViewProjection: DhApiMat4f): void;
  }

}

declare module 'net.irisshaders.iris.compat' {
  import { Map } from 'java.util';
  import { MethodHandle } from 'java.lang.invoke';

  class SkipList {
    static shouldSkipList: Map;
    static readonly NONE: MethodHandle;
    static readonly NONE_FORCE: MethodHandle;
    static readonly ALWAYS: MethodHandle;
  }

}

declare module 'net.irisshaders.iris.compat.sodium.mixin' {
  import { ChunkBuildBuffers } from 'net.caffeinemc.mods.sodium.client.render.chunk.compile';
  import { BlockSensitiveBufferBuilder } from 'net.irisshaders.iris.vertices';
  import { VertexEncoderInterface, BlockContextHolder } from 'net.irisshaders.iris.vertices.sodium.terrain';
  import { Screen } from 'net.minecraft.client.gui.screens';

  class BlockRendererAccessor {
    get buffers(): ChunkBuildBuffers;
  }


  class CloudRendererAccessor {
  }


  class MixinAbstractBlockRenderContext {
  }


  interface MixinBakedChunkModelBuilder extends BlockSensitiveBufferBuilder {}
  class MixinBakedChunkModelBuilder extends BlockSensitiveBufferBuilder {
    beginBlock(block: number, renderType: number, blockEmission: number, localPosX: number, localPosY: number, localPosZ: number): void;
    endBlock(): void;
    ignoreMidBlock(b: boolean): void;
    overrideBlock(block: number): void;
    restoreBlock(): void;
  }


  class MixinBlockRenderer {
  }


  interface MixinChunkBuildBuffers extends BlockSensitiveBufferBuilder {}
  class MixinChunkBuildBuffers extends BlockSensitiveBufferBuilder {
    beginBlock(block: number, renderType: number, blockEmission: number, localPosX: number, localPosY: number, localPosZ: number): void;
    endBlock(): void;
    ignoreMidBlock(b: boolean): void;
    overrideBlock(block: number): void;
    restoreBlock(): void;
  }


  interface MixinChunkMeshBufferBuilder extends VertexEncoderInterface {}
  class MixinChunkMeshBufferBuilder extends VertexEncoderInterface {
    iris$setContextHolder(contextHolder: BlockContextHolder): void;
  }


  class MixinChunkMeshBuildTask {
  }


  interface MixinChunkVertexConsumer extends BlockSensitiveBufferBuilder {}
  class MixinChunkVertexConsumer extends BlockSensitiveBufferBuilder {
    beginBlock(block: number, renderType: number, blockEmission: number, localPosX: number, localPosY: number, localPosZ: number): void;
    endBlock(): void;
    ignoreMidBlock(b: boolean): void;
    overrideBlock(block: number): void;
    restoreBlock(): void;
  }


  class MixinCloudRenderer {
  }


  class MixinDefaultChunkRenderer {
  }


  class MixinDefaultFluidRenderer {
  }


  class MixinGlRenderDevice {
  }


  class MixinRenderRegionArenas {
  }


  class MixinRenderSectionManager {
  }


  class MixinRenderSectionManagerShadow {
  }


  class MixinShaderChunkRenderer {
  }


  class MixinSodiumGameOptionPages {
  }


  class MixinSodiumGameOptions {
  }


  interface MixinSodiumOptionsGUI extends Screen {}
  class MixinSodiumOptionsGUI extends Screen {
  }


  class MixinSodiumWorldRenderer {
  }

}

declare module 'net.irisshaders.iris.config' {
  import { Path } from 'java.nio.file';
  import { Optional } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';

  class IrisConfig {
    constructor(propertiesPath: Path, excluded: Path);
    areDebugOptionsEnabled(): boolean;
    areShadersEnabled(): boolean;
    get shaderPackName(): Optional<string>;
    initialize(): void;
    isInternal(): boolean;
    load(): void;
    save(): void;
    set shaderPackName(name: string);
    setDebugEnabled(enabled: boolean): void;
    setShadersEnabled(enabled: boolean): void;
    setUnknown(b: boolean): void;
    shouldAllowUnknownShaders(): boolean;
    shouldDisableUpdateMessage(): boolean;
    shouldSkip(value: ResourceLocation): boolean;
  }

}

declare module 'net.irisshaders.iris.fantastic' {
  import { ParticleRenderType } from 'net.minecraft.client.particle';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { OptionInstance, GraphicsStatus } from 'net.minecraft.client';

  class IrisParticleRenderTypes {
    static readonly OPAQUE_TERRAIN: ParticleRenderType;
  }


  interface ParticleRenderingPhase extends Enum<ParticleRenderingPhase> {}
  class ParticleRenderingPhase extends Enum<ParticleRenderingPhase> {
    static readonly EVERYTHING: ParticleRenderingPhase;
    static readonly OPAQUE: ParticleRenderingPhase;
    static readonly TRANSLUCENT: ParticleRenderingPhase;
    static valueOf(name: string): ParticleRenderingPhase;
    static values(): ParticleRenderingPhase[];
  }


  class PhasedParticleEngine {
    setParticleRenderingPhase(var1: ParticleRenderingPhase): void;
  }


  interface SupportedGraphicsMode extends Enum<SupportedGraphicsMode> {}
  class SupportedGraphicsMode extends Enum<SupportedGraphicsMode> {
    static readonly FAST: SupportedGraphicsMode;
    static readonly FANCY: SupportedGraphicsMode;
    static fromVanilla(status: OptionInstance<GraphicsStatus>): SupportedGraphicsMode;
    toVanilla(): GraphicsStatus;
    static valueOf(name: string): SupportedGraphicsMode;
    static values(): SupportedGraphicsMode[];
  }

}

declare module 'net.irisshaders.iris.features' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface FeatureFlags extends Enum<FeatureFlags> {}
  class FeatureFlags extends Enum<FeatureFlags> {
    static readonly SEPARATE_HARDWARE_SAMPLERS: FeatureFlags;
    static readonly HIGHER_SHADOWCOLOR: FeatureFlags;
    static readonly CUSTOM_IMAGES: FeatureFlags;
    static readonly PER_BUFFER_BLENDING: FeatureFlags;
    static readonly COMPUTE_SHADERS: FeatureFlags;
    static readonly TESSELLATION_SHADERS: FeatureFlags;
    static readonly ENTITY_TRANSLUCENT: FeatureFlags;
    static readonly REVERSED_CULLING: FeatureFlags;
    static readonly BLOCK_EMISSION_ATTRIBUTE: FeatureFlags;
    static readonly CAN_DISABLE_WEATHER: FeatureFlags;
    static readonly SSBO: FeatureFlags;
    static readonly UNKNOWN: FeatureFlags;
    get humanReadableName(): string;
    static getInvalidStatus(invalidFeatureFlags: FeatureFlags[]): string;
    static getValue(value: string): FeatureFlags;
    static isInvalid(name: string): boolean;
    isUsable(): boolean;
    static valueOf(name: string): FeatureFlags;
    static values(): FeatureFlags[];
  }

}

declare module 'net.irisshaders.iris.gl.blending' {
  import { Enum } from 'java.lang';
  import { Optional, List } from 'java.util';

  interface AlphaTestFunction extends Enum<AlphaTestFunction> {}
  class AlphaTestFunction extends Enum<AlphaTestFunction> {
    static readonly NEVER: AlphaTestFunction;
    static readonly LESS: AlphaTestFunction;
    static readonly EQUAL: AlphaTestFunction;
    static readonly LEQUAL: AlphaTestFunction;
    static readonly GREATER: AlphaTestFunction;
    static readonly NOTEQUAL: AlphaTestFunction;
    static readonly GEQUAL: AlphaTestFunction;
    static readonly ALWAYS: AlphaTestFunction;
    static fromGlId(glId: number): Optional<AlphaTestFunction>;
    static fromString(name: string): Optional<AlphaTestFunction>;
    get expression(): string;
    get glId(): number;
    static valueOf(name: string): AlphaTestFunction;
    static values(): AlphaTestFunction[];
  }


  class AlphaTests {
    static readonly OFF: AlphaTest;
    static readonly NON_ZERO_ALPHA: AlphaTest;
    static readonly ONE_TENTH_ALPHA: AlphaTest;
    static readonly VERTEX_ALPHA: AlphaTest;
  }


  interface BlendModeFunction extends Enum<BlendModeFunction> {}
  class BlendModeFunction extends Enum<BlendModeFunction> {
    static readonly ZERO: BlendModeFunction;
    static readonly ONE: BlendModeFunction;
    static readonly SRC_COLOR: BlendModeFunction;
    static readonly ONE_MINUS_SRC_COLOR: BlendModeFunction;
    static readonly DST_COLOR: BlendModeFunction;
    static readonly ONE_MINUS_DST_COLOR: BlendModeFunction;
    static readonly SRC_ALPHA: BlendModeFunction;
    static readonly ONE_MINUS_SRC_ALPHA: BlendModeFunction;
    static readonly DST_ALPHA: BlendModeFunction;
    static readonly ONE_MINUS_DST_ALPHA: BlendModeFunction;
    static readonly SRC_ALPHA_SATURATE: BlendModeFunction;
    static fromString(name: string): Optional<BlendModeFunction>;
    get glId(): number;
    static valueOf(name: string): BlendModeFunction;
    static values(): BlendModeFunction[];
  }


  class BlendModeOverride {
    static readonly OFF: BlendModeOverride;
    constructor(blendMode: BlendMode);
    apply(): void;
    static restore(): void;
  }


  class BlendModeStorage {
    static deferBlendFunc(srcRgb: number, dstRgb: number, srcAlpha: number, dstAlpha: number): void;
    static deferBlendModeToggle(enabled: boolean): void;
    static isBlendLocked(): boolean;
    static overrideBlend(override: BlendMode): void;
    static overrideBufferBlend(index: number, override: BlendMode): void;
    static restoreBlend(): void;
  }


  class BufferBlendOverride {
    constructor(drawBuffer: number, blendMode: BlendMode);
    apply(): void;
  }


  class ColorMask {
    constructor(red: boolean, green: boolean, blue: boolean, alpha: boolean);
    isAlphaMasked(): boolean;
    isBlueMasked(): boolean;
    isGreenMasked(): boolean;
    isRedMasked(): boolean;
  }


  class DepthColorStorage {
    static deferColorMask(red: boolean, green: boolean, blue: boolean, alpha: boolean): void;
    static deferDepthEnable(enabled: boolean): void;
    static disableDepthColor(): void;
    static isDepthColorLocked(): boolean;
    static unlockDepthColor(): void;
  }

}

declare module 'net.irisshaders.iris.gl' {
  import { Throwable, Enum, CharSequence, Integer } from 'java.lang';
  import { PrintStream } from 'java.io';
  import { List } from 'java.util';
  import { ByteBuffer, FloatBuffer, IntBuffer } from 'java.nio';
  import { Vector3i, Matrix4f } from 'org.joml';

  class BooleanStateExtended {
    setUnknownState(): void;
  }


  class GLDebug {
    accept(str: string): void;
    static disableDebugMessages(): number;
    static filterStackTrace(throwable: Throwable, offset: number): Throwable;
    static nameObject(id: number, object: number, name: string): void;
    static popGroup(): void;
    static pushGroup(id: number, name: string): void;
    static reloadDebugState(): void;
    static setupDebugMessageCallback(): number;
    static setupDebugMessageCallback(stream: PrintStream): number;
  }


  class GlResource {
    destroy(): void;
  }


  interface GlVersion extends Enum<GlVersion> {}
  class GlVersion extends Enum<GlVersion> {
    static readonly GL_11: GlVersion;
    static readonly GL_12: GlVersion;
    static readonly GL_30: GlVersion;
    static readonly GL_31: GlVersion;
    static readonly GL_33: GlVersion;
    static readonly GL_41: GlVersion;
    static valueOf(name: string): GlVersion;
    static values(): GlVersion[];
  }


  class IrisLimits {
    static readonly MAX_COLOR_BUFFERS: number;
    static readonly VK_CONFORMANCE: boolean;
  }


  class IrisRenderSystem {
    static backupAndDisableCullingState(b: boolean): void;
    static bindAttributeLocation(program: number, index: number, name: CharSequence): void;
    static bindBuffer(target: number, buffer: number): void;
    static bindBufferBase(target: number, index: number, buffer: number): void;
    static bindImageTexture(unit: number, texture: number, level: number, layered: boolean, layer: number, access: number, format: number): void;
    static bindSamplerToUnit(unit: number, sampler: number): void;
    static bindTextureForSetup(glType: number, glId: number): void;
    static bindTextureToUnit(target: number, unit: number, texture: number): void;
    static blendFuncSeparatei(buffer: number, srcRGB: number, dstRGB: number, srcAlpha: number, dstAlpha: number): void;
    static blitFramebuffer(source: number, dest: number, offsetX: number, offsetY: number, width: number, height: number, offsetX2: number, offsetY2: number, width2: number, height2: number, bufferChoice: number, filter: number): void;
    static bufferData(target: number, data: number[], usage: number): void;
    static bufferStorage(target: number, data: number[], usage: number): number;
    static bufferStorage(target: number, size: number, flags: number): void;
    static clearBufferSubData(glShaderStorageBuffer: number, glR8: number, offset: number, size: number, glRed: number, glByte: number, ints: number[]): void;
    static copyTexImage2D(target: number, level: number, internalFormat: number, x: number, y: number, width: number, height: number, border: number): void;
    static copyTexSubImage2D(destTexture: number, target: number, i: number, i1: number, i2: number, i3: number, i4: number, width: number, height: number): void;
    static createBuffers(): number;
    static createFramebuffer(): number;
    static createTexture(target: number): number;
    static deleteBuffers(glId: number): void;
    static destroySampler(glId: number): void;
    static detachShader(program: number, shader: number): void;
    static disableBufferBlend(buffer: number): void;
    static dispatchCompute(workX: number, workY: number, workZ: number): void;
    static dispatchCompute(workGroups: Vector3i): void;
    static dispatchComputeIndirect(offset: number): void;
    static drawBuffers(framebuffer: number, buffers: number[]): void;
    static enableBufferBlend(buffer: number): void;
    static framebufferTexture2D(fb: number, fbtarget: number, attachment: number, target: number, texture: number, levels: number): void;
    static genBuffers(buffers: number[]): void;
    static genSampler(): number;
    static generateMipmaps(texture: number, mipmapTarget: number): void;
    static get maxImageUnits(): number;
    static get vRAM(): number;
    static getActiveUniform(program: number, index: number, size: number, type: IntBuffer, name: IntBuffer): string;
    static getFloatv(pname: number, params: number[]): void;
    static getIntegerv(pname: number, params: number[]): void;
    static getProgramInfoLog(program: number): string;
    static getProgramiv(program: number, value: number, storage: number[]): void;
    static getShaderInfoLog(shader: number): string;
    static getTexParameteri(texture: number, target: number, pname: number): number;
    static getUniformBlockIndex(program: number, uniformBlockName: string): number;
    static initRenderer(): void;
    static memoryBarrier(barriers: number): void;
    static overridePolygonMode(): void;
    static readBuffer(framebuffer: number, buffer: number): void;
    static readPixels(x: number, y: number, width: number, height: number, format: number, type: number, pixels: number[]): void;
    static restoreCullingState(): void;
    static restorePlayerProjection(): void;
    static restorePolygonMode(): void;
    static samplerParameterf(sampler: number, pname: number, param: number): void;
    static samplerParameteri(sampler: number, pname: number, param: number): void;
    static samplerParameteriv(sampler: number, pname: number, params: number[]): void;
    static setPolygonMode(mode: number): void;
    static setShadowProjection(shadowProjection: Matrix4f): void;
    static supportsBufferBlending(): boolean;
    static supportsCompute(): boolean;
    static supportsImageLoadStore(): boolean;
    static supportsSSBO(): boolean;
    static supportsTesselation(): boolean;
    static texImage1D(texture: number, target: number, level: number, internalformat: number, width: number, border: number, format: number, type: number, pixels: ByteBuffer): void;
    static texImage2D(texture: number, target: number, level: number, internalformat: number, width: number, height: number, border: number, format: number, type: number, pixels: ByteBuffer): void;
    static texImage3D(texture: number, target: number, level: number, internalformat: number, width: number, height: number, depth: number, border: number, format: number, type: number, pixels: ByteBuffer): void;
    static texParameterf(texture: number, target: number, pname: number, param: number): void;
    static texParameteri(texture: number, target: number, pname: number, param: number): void;
    static texParameteriv(texture: number, target: number, pname: number, params: number[]): void;
    static texParameterivDirect(target: number, pname: number, params: number[]): void;
    static unbindAllSamplers(): void;
    static uniform1f(location: number, v0: number): void;
    static uniform2f(location: number, v0: number, v1: number): void;
    static uniform2i(location: number, v0: number, v1: number): void;
    static uniform3f(location: number, v0: number, v1: number, v2: number): void;
    static uniform3i(location: number, v0: number, v1: number, v2: number): void;
    static uniform4f(location: number, v0: number, v1: number, v2: number, v3: number): void;
    static uniform4i(location: number, v0: number, v1: number, v2: number, v3: number): void;
    static uniformBlockBinding(program: number, uniformBlockIndex: number, uniformBlockBinding: number): void;
    static uniformMatrix4fv(location: number, transpose: boolean, matrix: FloatBuffer): void;
    static vertexAttrib4f(index: number, v0: number, v1: number, v2: number, v3: number): void;
  }

}

declare module 'net.irisshaders.iris.gl.buffer' {
  import { Int2ObjectArrayMap } from 'it.unimi.dsi.fastutil.ints';

  class ShaderStorageBuffer {
    constructor(index: number, info: BuiltShaderStorageInfo);
    bind(): void;
    createStatic(): void;
    get id(): number;
    get index(): number;
    get size(): number;
    resizeIfRelative(width: number, height: number): void;
  }


  class ShaderStorageBufferHolder {
    constructor(overrides: Int2ObjectArrayMap<BuiltShaderStorageInfo>, width: number, height: number);
    destroyBuffers(): void;
    static forceDeleteBuffers(): void;
    getBufferIndex(index: number): number;
    hasResizedScreen(width: number, height: number): void;
    setupBuffers(): void;
  }

}

declare module 'net.irisshaders.iris.gl.framebuffer' {
  import { GlResource } from 'net.irisshaders.iris.gl';

  interface GlFramebuffer extends GlResource {}
  class GlFramebuffer extends GlResource {
    constructor();
    addColorAttachment(index: number, texture: number): void;
    addDepthAttachment(texture: number): void;
    bind(): void;
    bindAsDrawBuffer(): void;
    bindAsReadBuffer(): void;
    drawBuffers(buffers: number[]): void;
    get id(): number;
    get status(): number;
    getColorAttachment(index: number): number;
    hasDepthAttachment(): boolean;
    noDrawBuffers(): void;
    readBuffer(buffer: number): void;
  }

}

declare module 'net.irisshaders.iris.gl.image' {
  import { GlResource } from 'net.irisshaders.iris.gl';
  import { TextureType, PixelFormat, InternalTextureFormat, PixelType } from 'net.irisshaders.iris.gl.texture';
  import { IntSupplier } from 'java.util.function';

  interface GlImage extends GlResource {}
  class GlImage extends GlResource {
    constructor(name: string, samplerName: string, target: TextureType, format: PixelFormat, internalFormat: InternalTextureFormat, pixelType: PixelType, clear: boolean, width: number, height: number, depth: number);
    get format(): PixelFormat;
    get id(): number;
    get internalFormat(): InternalTextureFormat;
    get name(): string;
    get pixelType(): PixelType;
    get samplerName(): string;
    get target(): TextureType;
    shouldClear(): boolean;
    toString(): string;
    updateNewSize(width: number, height: number): void;
  }


  class ImageBinding {
    constructor(imageUnit: number, internalFormat: number, textureID: IntSupplier);
    update(): void;
  }


  class ImageHolder {
    addTextureImage(var1: IntSupplier, var2: InternalTextureFormat, var3: string): void;
    hasImage(var1: string): boolean;
  }


  class ImageLimits {
    static get (): ImageLimits;
    get maxImageUnits(): number;
  }

}

declare module 'net.irisshaders.iris.gl.image.GlImage' {
  import { GlImage } from 'net.irisshaders.iris.gl.image';
  import { PixelFormat, InternalTextureFormat, PixelType } from 'net.irisshaders.iris.gl.texture';

  interface Relative extends GlImage {}
  class Relative extends GlImage {
    constructor(name: string, samplerName: string, format: PixelFormat, internalFormat: InternalTextureFormat, pixelType: PixelType, clear: boolean, relativeWidth: number, relativeHeight: number, currentWidth: number, currentHeight: number);
    updateNewSize(width: number, height: number): void;
  }

}

declare module 'net.irisshaders.iris.gl.IrisRenderSystem' {
  interface DSACore extends DSAARB {}
  class DSACore extends DSAARB {
  }


  class DSAAccess {
    bindTextureToUnit(var1: number, var2: number, var3: number): void;
    blitFramebuffer(var1: number, var2: number, var3: number, var4: number, var5: number, var6: number, var7: number, var8: number, var9: number, var10: number, var11: number, var12: number): void;
    bufferStorage(var1: number, var2: number[], var3: number): number;
    copyTexSubImage2D(var1: number, var2: number, var3: number, var4: number, var5: number, var6: number, var7: number, var8: number, var9: number): void;
    createBuffers(): number;
    createFramebuffer(): number;
    createTexture(var1: number): number;
    drawBuffers(var1: number, var2: number[]): void;
    framebufferTexture2D(var1: number, var2: number, var3: number, var4: number, var5: number, var6: number): void;
    generateMipmaps(var1: number, var2: number): void;
    getTexParameteri(var1: number, var2: number, var3: number): number;
    readBuffer(var1: number, var2: number): void;
    texParameterf(var1: number, var2: number, var3: number, var4: number): void;
    texParameteri(var1: number, var2: number, var3: number, var4: number): void;
    texParameteriv(var1: number, var2: number, var3: number, var4: number[]): void;
  }


  interface DSAARB extends DSAUnsupported {}
  class DSAARB extends DSAUnsupported {
    bindTextureToUnit(target: number, unit: number, texture: number): void;
    blitFramebuffer(source: number, dest: number, offsetX: number, offsetY: number, width: number, height: number, offsetX2: number, offsetY2: number, width2: number, height2: number, bufferChoice: number, filter: number): void;
    bufferStorage(target: number, data: number[], usage: number): number;
    copyTexSubImage2D(destTexture: number, target: number, i: number, i1: number, i2: number, i3: number, i4: number, width: number, height: number): void;
    createBuffers(): number;
    createFramebuffer(): number;
    createTexture(target: number): number;
    drawBuffers(framebuffer: number, buffers: number[]): void;
    framebufferTexture2D(fb: number, fbtarget: number, attachment: number, target: number, texture: number, levels: number): void;
    generateMipmaps(texture: number, target: number): void;
    getTexParameteri(texture: number, target: number, pname: number): number;
    readBuffer(framebuffer: number, buffer: number): void;
    texParameterf(texture: number, target: number, pname: number, param: number): void;
    texParameteri(texture: number, target: number, pname: number, param: number): void;
    texParameteriv(texture: number, target: number, pname: number, params: number[]): void;
  }


  interface DSAUnsupported extends DSAAccess {}
  class DSAUnsupported extends DSAAccess {
    bindTextureToUnit(target: number, unit: number, texture: number): void;
    blitFramebuffer(source: number, dest: number, offsetX: number, offsetY: number, width: number, height: number, offsetX2: number, offsetY2: number, width2: number, height2: number, bufferChoice: number, filter: number): void;
    bufferStorage(target: number, data: number[], usage: number): number;
    copyTexSubImage2D(destTexture: number, target: number, i: number, i1: number, i2: number, i3: number, i4: number, width: number, height: number): void;
    createBuffers(): number;
    createFramebuffer(): number;
    createTexture(target: number): number;
    drawBuffers(framebuffer: number, buffers: number[]): void;
    framebufferTexture2D(fb: number, fbtarget: number, attachment: number, target: number, texture: number, levels: number): void;
    generateMipmaps(texture: number, target: number): void;
    getTexParameteri(texture: number, target: number, pname: number): number;
    readBuffer(framebuffer: number, buffer: number): void;
    texParameterf(texture: number, target: number, pname: number, param: number): void;
    texParameteri(texture: number, target: number, pname: number, param: number): void;
    texParameteriv(texture: number, target: number, pname: number, params: number[]): void;
  }

}

declare module 'net.irisshaders.iris.gl.program' {
  import { GlResource } from 'net.irisshaders.iris.gl';
  import { Vector2f, Vector3i } from 'org.joml';
  import { FilledIndirectPointer } from 'net.irisshaders.iris.shaderpack';
  import { Type } from 'Program';
  import { Builder } from 'net.irisshaders.iris.gl.program.ProgramUniforms';
  import { SamplerHolder, GlSampler } from 'net.irisshaders.iris.gl.sampler';
  import { ImageHolder } from 'net.irisshaders.iris.gl.image';
  import { ImmutableSet, ImmutableList } from 'com.google.common.collect';
  import { Integer } from 'java.lang';
  import { IntSupplier } from 'java.util.function';
  import { TextureType, InternalTextureFormat, TextureAccess } from 'net.irisshaders.iris.gl.texture';
  import { ValueUpdateNotifier } from 'net.irisshaders.iris.gl.state';
  import { Builder as net_irisshaders_iris_gl_program_programimages_Builder } from 'net.irisshaders.iris.gl.program.ProgramImages';
  import { Builder as net_irisshaders_iris_gl_program_programsamplers_Builder, CustomTextureSamplerInterceptor } from 'net.irisshaders.iris.gl.program.ProgramSamplers';
  import { Set } from 'java.util';
  import { Object2ObjectMap } from 'it.unimi.dsi.fastutil.objects';
  import { Uniform } from 'net.irisshaders.iris.gl.uniform';

  interface ComputeProgram extends GlResource {}
  class ComputeProgram extends GlResource {
    destroyInternal(): void;
    dispatch(width: number, height: number): void;
    get activeImages(): number;
    get programId(): number;
    getWorkGroups(width: number, height: number): Vector3i;
    setWorkGroupInfo(relativeWorkGroups: Vector2f, absoluteWorkGroups: Vector3i, indirectPointer: FilledIndirectPointer): void;
    static unbind(): void;
    use(): void;
  }


  class IrisProgramTypes {
    static GEOMETRY: Type;
    static TESS_CONTROL: Type;
    static TESS_EVAL: Type;
  }


  interface Program extends GlResource {}
  class Program extends GlResource {
    destroyInternal(): void;
    get activeImages(): number;
    get programId(): number;
    static unbind(): void;
    use(): void;
  }


  interface ProgramBuilder extends SamplerHolder, ImageHolder, Builder {}
  class ProgramBuilder extends SamplerHolder {
    addDefaultSampler(sampler: IntSupplier, ...names: string[]): boolean;
    addDefaultSampler(type: TextureType, texture: IntSupplier, notifier: ValueUpdateNotifier, sampler: GlSampler, ...names: string[]): boolean;
    addDynamicSampler(sampler: IntSupplier, ...names: string[]): boolean;
    addDynamicSampler(type: TextureType, texture: IntSupplier, sampler: GlSampler, ...names: string[]): boolean;
    addDynamicSampler(sampler: IntSupplier, notifier: ValueUpdateNotifier, ...names: string[]): boolean;
    addDynamicSampler(type: TextureType, texture: IntSupplier, notifier: ValueUpdateNotifier, sampler: GlSampler, ...names: string[]): boolean;
    addExternalSampler(textureUnit: number, ...names: string[]): void;
    addTextureImage(textureID: IntSupplier, internalFormat: InternalTextureFormat, name: string): void;
    static begin(name: string, vertexSource: string, geometrySource: string, fragmentSource: string, reservedTextureUnits: ImmutableSet<number>): ProgramBuilder;
    static beginCompute(name: string, source: string, reservedTextureUnits: ImmutableSet<number>): ProgramBuilder;
    bindAttributeLocation(index: number, name: string): void;
    build(): Program;
    buildCompute(): ComputeProgram;
    hasImage(name: string): boolean;
    hasSampler(name: string): boolean;
  }


  class ProgramImages {
    static builder(program: number): net_irisshaders_iris_gl_program_programimages_Builder;
    get activeImages(): number;
    update(): void;
  }


  class ProgramSamplers {
    static builder(program: number, reservedTextureUnits: Set<number>): net_irisshaders_iris_gl_program_programsamplers_Builder;
    static clearActiveSamplers(): void;
    static customTextureSamplerInterceptor(samplerHolder: SamplerHolder, customTextureIds: Object2ObjectMap<string, TextureAccess>): CustomTextureSamplerInterceptor;
    static customTextureSamplerInterceptor(samplerHolder: SamplerHolder, customTextureIds: Object2ObjectMap<string, TextureAccess>, flippedAtLeastOnceSnapshot: ImmutableSet<number>): CustomTextureSamplerInterceptor;
    removeListeners(): void;
    update(): void;
  }


  class ProgramUniforms {
    constructor(once: ImmutableList<Uniform>, perTick: ImmutableList<Uniform>, perFrame: ImmutableList<Uniform>, dynamic: ImmutableList<Uniform>, notifiersToReset: ImmutableList<ValueUpdateNotifier>);
    static builder(name: string, program: number): Builder;
    static clearActiveUniforms(): void;
    removeListeners(): void;
    update(): void;
  }

}

declare module 'net.irisshaders.iris.gl.program.ProgramImages' {
  import { ImageHolder } from 'net.irisshaders.iris.gl.image';
  import { IntSupplier } from 'java.util.function';
  import { InternalTextureFormat } from 'net.irisshaders.iris.gl.texture';
  import { ProgramImages } from 'net.irisshaders.iris.gl.program';

  interface Builder extends ImageHolder {}
  class Builder extends ImageHolder {
    addTextureImage(textureID: IntSupplier, internalFormat: InternalTextureFormat, name: string): void;
    build(): ProgramImages;
    hasImage(name: string): boolean;
  }

}

declare module 'net.irisshaders.iris.gl.program.ProgramSamplers' {
  import { SamplerHolder, GlSampler } from 'net.irisshaders.iris.gl.sampler';
  import { TextureType } from 'net.irisshaders.iris.gl.texture';
  import { IntSupplier } from 'java.util.function';
  import { ValueUpdateNotifier } from 'net.irisshaders.iris.gl.state';
  import { ProgramSamplers } from 'net.irisshaders.iris.gl.program';

  interface Builder extends SamplerHolder {}
  class Builder extends SamplerHolder {
    addDefaultSampler(type: TextureType, texture: IntSupplier, notifier: ValueUpdateNotifier, sampler: GlSampler, ...names: string[]): boolean;
    addDefaultSampler(sampler: IntSupplier, ...names: string[]): boolean;
    addDynamicSampler(type: TextureType, texture: IntSupplier, sampler: GlSampler, ...names: string[]): boolean;
    addDynamicSampler(type: TextureType, texture: IntSupplier, notifier: ValueUpdateNotifier, sampler: GlSampler, ...names: string[]): boolean;
    addDynamicSampler(texture: IntSupplier, ...names: string[]): boolean;
    addDynamicSampler(texture: IntSupplier, notifier: ValueUpdateNotifier, ...names: string[]): boolean;
    addExternalSampler(textureUnit: number, ...names: string[]): void;
    build(): ProgramSamplers;
    hasSampler(name: string): boolean;
  }


  interface CustomTextureSamplerInterceptor extends SamplerHolder {}
  class CustomTextureSamplerInterceptor extends SamplerHolder {
    addDefaultSampler(sampler: IntSupplier, ...names: string[]): boolean;
    addDefaultSampler(type: TextureType, texture: IntSupplier, notifier: ValueUpdateNotifier, sampler: GlSampler, ...names: string[]): boolean;
    addDynamicSampler(sampler: IntSupplier, ...names: string[]): boolean;
    addDynamicSampler(type: TextureType, texture: IntSupplier, sampler: GlSampler, ...names: string[]): boolean;
    addDynamicSampler(sampler: IntSupplier, notifier: ValueUpdateNotifier, ...names: string[]): boolean;
    addDynamicSampler(type: TextureType, texture: IntSupplier, notifier: ValueUpdateNotifier, sampler: GlSampler, ...names: string[]): boolean;
    addExternalSampler(textureUnit: number, ...names: string[]): void;
    hasSampler(name: string): boolean;
  }

}

declare module 'net.irisshaders.iris.gl.program.ProgramUniforms' {
  import { DynamicLocationalUniformHolder, UniformUpdateFrequency, Uniform, UniformType, UniformHolder } from 'net.irisshaders.iris.gl.uniform';
  import { OptionalInt } from 'java.util';
  import { ProgramUniforms } from 'net.irisshaders.iris.gl.program';
  import { ValueUpdateNotifier } from 'net.irisshaders.iris.gl.state';

  interface Builder extends DynamicLocationalUniformHolder {}
  class Builder extends DynamicLocationalUniformHolder {
    addDynamicUniform(uniform: Uniform, notifier: ValueUpdateNotifier): Builder;
    addUniform(updateFrequency: UniformUpdateFrequency, uniform: Uniform): Builder;
    buildUniforms(): ProgramUniforms;
    externallyManagedUniform(name: string, type: UniformType): UniformHolder;
    location(name: string, type: UniformType): OptionalInt;
  }

}

declare module 'net.irisshaders.iris.gl.sampler' {
  import { GlResource } from 'net.irisshaders.iris.gl';
  import { TextureType } from 'net.irisshaders.iris.gl.texture';
  import { IntSupplier } from 'java.util.function';
  import { ValueUpdateNotifier } from 'net.irisshaders.iris.gl.state';

  interface GlSampler extends GlResource {}
  class GlSampler extends GlResource {
    static readonly MIPPED_LINEAR_HW: GlSampler;
    static readonly LINEAR_HW: GlSampler;
    static readonly MIPPED_NEAREST_HW: GlSampler;
    static readonly NEAREST_HW: GlSampler;
    static readonly MIPPED_LINEAR: GlSampler;
    static readonly LINEAR: GlSampler;
    static readonly MIPPED_NEAREST: GlSampler;
    static readonly NEAREST: GlSampler;
    constructor(linear: boolean, mipmapped: boolean, shadow: boolean, hardwareShadow: boolean);
    get id(): number;
  }


  class SamplerBinding {
    constructor(type: TextureType, textureUnit: number, texture: IntSupplier, sampler: GlSampler, notifier: ValueUpdateNotifier);
    update(): void;
  }


  class SamplerHolder {
    addDefaultSampler(sampler: IntSupplier, ...names: string[]): boolean;
    addDefaultSampler(var1: TextureType, var2: IntSupplier, var3: ValueUpdateNotifier, var4: GlSampler, ...var5: string[]): boolean;
    addDynamicSampler(texture: IntSupplier, ...names: string[]): boolean;
    addDynamicSampler(var1: TextureType, var2: IntSupplier, var3: GlSampler, ...var4: string[]): boolean;
    addDynamicSampler(texture: IntSupplier, notifier: ValueUpdateNotifier, ...names: string[]): boolean;
    addDynamicSampler(var1: TextureType, var2: IntSupplier, var3: ValueUpdateNotifier, var4: GlSampler, ...var5: string[]): boolean;
    addExternalSampler(var1: number, ...var2: string[]): void;
    hasSampler(var1: string): boolean;
  }


  class SamplerLimits {
    static get (): SamplerLimits;
    get maxDrawBuffers(): number;
    get maxShaderStorageUnits(): number;
    get maxTextureUnits(): number;
  }

}

declare module 'net.irisshaders.iris.gl.shader' {
  import { GlResource } from 'net.irisshaders.iris.gl';
  import { RuntimeException, Exception, Enum, CharSequence } from 'java.lang';
  import { List, Set, Map } from 'java.util';
  import { ImmutableList } from 'com.google.common.collect';
  import { StringPair } from 'net.irisshaders.iris.helpers';
  import { Matcher } from 'java.util.regex';

  interface GlShader extends GlResource {}
  class GlShader extends GlResource {
    constructor(type: ShaderType, name: string, src: string);
    get handle(): number;
    get name(): string;
  }


  class ProgramCreator {
    static create(name: string, ...shaders: GlShader[]): number;
  }


  interface ShaderCompileException extends RuntimeException {}
  class ShaderCompileException extends RuntimeException {
    constructor(filename: string, error: string);

    constructor(filename: string, error: Exception);
    get error(): string;
    get filename(): string;
    get message(): string;
  }


  interface ShaderType extends Enum<ShaderType> {}
  class ShaderType extends Enum<ShaderType> {
    static readonly VERTEX: ShaderType;
    static readonly GEOMETRY: ShaderType;
    static readonly FRAGMENT: ShaderType;
    static readonly COMPUTE: ShaderType;
    static readonly TESSELATION_CONTROL: ShaderType;
    static readonly TESSELATION_EVAL: ShaderType;
    static valueOf(name: string): ShaderType;
    static values(): ShaderType[];
  }


  class ShaderWorkarounds {
    static safeShaderSource(glId: number, source: CharSequence): void;
  }


  class StandardMacros {
    static createStandardEnvironmentDefines(): ImmutableList<StringPair>;
    static formatVersionString(version: string): string;
    static get formattedIrisVersion(): string;
    static get glExtensions(): Set<string>;
    static get irisDefines(): string[];
    static get mcVersion(): string;
    static get osString(): string;
    static get renderStages(): Map<string, string>;
    static get renderer(): string;
    static get vendor(): string;
    static getGlVersion(name: number): string;
    static group(matcher: Matcher, name: string): string;
  }

}

declare module 'net.irisshaders.iris.gl.state' {
  import { Enum, Runnable } from 'java.lang';
  import { List } from 'java.util';
  import { VertexFormat } from 'com.mojang.blaze3d.vertex';

  interface FogMode extends Enum<FogMode> {}
  class FogMode extends Enum<FogMode> {
    static readonly OFF: FogMode;
    static readonly PER_VERTEX: FogMode;
    static readonly PER_FRAGMENT: FogMode;
    static valueOf(name: string): FogMode;
    static values(): FogMode[];
  }


  class ShaderAttributeInputs {
    constructor(format: VertexFormat, isFullbright: boolean, isLines: boolean, glint: boolean, text: boolean, ie: boolean);

    constructor(color: boolean, tex: boolean, overlay: boolean, light: boolean, normal: boolean);
    equals(obj: any): boolean;
    hasColor(): boolean;
    hasLight(): boolean;
    hasNormal(): boolean;
    hasOverlay(): boolean;
    hasTex(): boolean;
    hashCode(): number;
    isGlint(): boolean;
    isIE(): boolean;
    isNewLines(): boolean;
    isText(): boolean;
  }


  class StateUpdateNotifiers {
    static fogStartNotifier: ValueUpdateNotifier;
    static fogEndNotifier: ValueUpdateNotifier;
    static blendFuncNotifier: ValueUpdateNotifier;
    static bindTextureNotifier: ValueUpdateNotifier;
    static normalTextureChangeNotifier: ValueUpdateNotifier;
    static specularTextureChangeNotifier: ValueUpdateNotifier;
    static phaseChangeNotifier: ValueUpdateNotifier;
    static fallbackEntityNotifier: ValueUpdateNotifier;
  }


  class ValueUpdateNotifier {
    setListener(var1: Runnable): void;
  }

}

declare module 'net.irisshaders.iris.gl.texture' {
  import { Enum } from 'java.lang';
  import { List, Optional } from 'java.util';
  import { GlFramebuffer } from 'net.irisshaders.iris.gl.framebuffer';
  import { GlResource, GlVersion } from 'net.irisshaders.iris.gl';
  import { TextureFilteringData } from 'net.irisshaders.iris.shaderpack.texture';
  import { IntSupplier } from 'java.util.function';
  import { ByteBuffer } from 'java.nio';

  interface DepthBufferFormat extends Enum<DepthBufferFormat> {}
  class DepthBufferFormat extends Enum<DepthBufferFormat> {
    static readonly DEPTH: DepthBufferFormat;
    static readonly DEPTH16: DepthBufferFormat;
    static readonly DEPTH24: DepthBufferFormat;
    static readonly DEPTH32: DepthBufferFormat;
    static readonly DEPTH32F: DepthBufferFormat;
    static readonly DEPTH_STENCIL: DepthBufferFormat;
    static readonly DEPTH24_STENCIL8: DepthBufferFormat;
    static readonly DEPTH32F_STENCIL8: DepthBufferFormat;
    static fromGlEnum(glenum: number): DepthBufferFormat;
    static fromGlEnumOrDefault(glenum: number): DepthBufferFormat;
    get glFormat(): number;
    get glInternalFormat(): number;
    get glType(): number;
    isCombinedStencil(): boolean;
    static valueOf(name: string): DepthBufferFormat;
    static values(): DepthBufferFormat[];
  }


  class DepthCopyStrategy {
    copy(var1: GlFramebuffer, var2: number, var3: GlFramebuffer, var4: number, var5: number, var6: number): void;
    static fastest(combinedStencilRequired: boolean): DepthCopyStrategy;
    needsDestFramebuffer(): boolean;
  }


  interface GlTexture extends TextureAccess, GlResource {}
  class GlTexture extends TextureAccess {
    constructor(target: TextureType, sizeX: number, sizeY: number, sizeZ: number, internalFormat: number, format: number, pixelType: number, pixels: number[], filteringData: TextureFilteringData);
    bind(unit: number): void;
    get target(): TextureType;
    get textureId(): IntSupplier;
    get type(): TextureType;
  }


  interface InternalTextureFormat extends Enum<InternalTextureFormat> {}
  class InternalTextureFormat extends Enum<InternalTextureFormat> {
    static readonly RGBA: InternalTextureFormat;
    static readonly R8: InternalTextureFormat;
    static readonly RG8: InternalTextureFormat;
    static readonly RGB8: InternalTextureFormat;
    static readonly RGBA8: InternalTextureFormat;
    static readonly R8_SNORM: InternalTextureFormat;
    static readonly RG8_SNORM: InternalTextureFormat;
    static readonly RGB8_SNORM: InternalTextureFormat;
    static readonly RGBA8_SNORM: InternalTextureFormat;
    static readonly R16: InternalTextureFormat;
    static readonly RG16: InternalTextureFormat;
    static readonly RGB16: InternalTextureFormat;
    static readonly RGBA16: InternalTextureFormat;
    static readonly R16_SNORM: InternalTextureFormat;
    static readonly RG16_SNORM: InternalTextureFormat;
    static readonly RGB16_SNORM: InternalTextureFormat;
    static readonly RGBA16_SNORM: InternalTextureFormat;
    static readonly R16F: InternalTextureFormat;
    static readonly RG16F: InternalTextureFormat;
    static readonly RGB16F: InternalTextureFormat;
    static readonly RGBA16F: InternalTextureFormat;
    static readonly R32F: InternalTextureFormat;
    static readonly RG32F: InternalTextureFormat;
    static readonly RGB32F: InternalTextureFormat;
    static readonly RGBA32F: InternalTextureFormat;
    static readonly R8I: InternalTextureFormat;
    static readonly RG8I: InternalTextureFormat;
    static readonly RGB8I: InternalTextureFormat;
    static readonly RGBA8I: InternalTextureFormat;
    static readonly R8UI: InternalTextureFormat;
    static readonly RG8UI: InternalTextureFormat;
    static readonly RGB8UI: InternalTextureFormat;
    static readonly RGBA8UI: InternalTextureFormat;
    static readonly R16I: InternalTextureFormat;
    static readonly RG16I: InternalTextureFormat;
    static readonly RGB16I: InternalTextureFormat;
    static readonly RGBA16I: InternalTextureFormat;
    static readonly R16UI: InternalTextureFormat;
    static readonly RG16UI: InternalTextureFormat;
    static readonly RGB16UI: InternalTextureFormat;
    static readonly RGBA16UI: InternalTextureFormat;
    static readonly R32I: InternalTextureFormat;
    static readonly RG32I: InternalTextureFormat;
    static readonly RGB32I: InternalTextureFormat;
    static readonly RGBA32I: InternalTextureFormat;
    static readonly R32UI: InternalTextureFormat;
    static readonly RG32UI: InternalTextureFormat;
    static readonly RGB32UI: InternalTextureFormat;
    static readonly RGBA32UI: InternalTextureFormat;
    static readonly RGBA2: InternalTextureFormat;
    static readonly RGBA4: InternalTextureFormat;
    static readonly R3_G3_B2: InternalTextureFormat;
    static readonly RGB5_A1: InternalTextureFormat;
    static readonly RGB565: InternalTextureFormat;
    static readonly RGB10_A2: InternalTextureFormat;
    static readonly RGB10_A2UI: InternalTextureFormat;
    static readonly R11F_G11F_B10F: InternalTextureFormat;
    static readonly RGB9_E5: InternalTextureFormat;
    static fromString(name: string): Optional<InternalTextureFormat>;
    get glFormat(): number;
    get minimumGlVersion(): GlVersion;
    get pixelFormat(): PixelFormat;
    static valueOf(name: string): InternalTextureFormat;
    static values(): InternalTextureFormat[];
  }


  interface PixelFormat extends Enum<PixelFormat> {}
  class PixelFormat extends Enum<PixelFormat> {
    static readonly RED: PixelFormat;
    static readonly RG: PixelFormat;
    static readonly RGB: PixelFormat;
    static readonly BGR: PixelFormat;
    static readonly RGBA: PixelFormat;
    static readonly BGRA: PixelFormat;
    static readonly RED_INTEGER: PixelFormat;
    static readonly RG_INTEGER: PixelFormat;
    static readonly RGB_INTEGER: PixelFormat;
    static readonly BGR_INTEGER: PixelFormat;
    static readonly RGBA_INTEGER: PixelFormat;
    static readonly BGRA_INTEGER: PixelFormat;
    static fromString(name: string): Optional<PixelFormat>;
    get componentCount(): number;
    get glFormat(): number;
    get minimumGlVersion(): GlVersion;
    isInteger(): boolean;
    static valueOf(name: string): PixelFormat;
    static values(): PixelFormat[];
  }


  interface PixelType extends Enum<PixelType> {}
  class PixelType extends Enum<PixelType> {
    static readonly BYTE: PixelType;
    static readonly SHORT: PixelType;
    static readonly INT: PixelType;
    static readonly HALF_FLOAT: PixelType;
    static readonly FLOAT: PixelType;
    static readonly UNSIGNED_BYTE: PixelType;
    static readonly UNSIGNED_BYTE_3_3_2: PixelType;
    static readonly UNSIGNED_BYTE_2_3_3_REV: PixelType;
    static readonly UNSIGNED_SHORT: PixelType;
    static readonly UNSIGNED_SHORT_5_6_5: PixelType;
    static readonly UNSIGNED_SHORT_5_6_5_REV: PixelType;
    static readonly UNSIGNED_SHORT_4_4_4_4: PixelType;
    static readonly UNSIGNED_SHORT_4_4_4_4_REV: PixelType;
    static readonly UNSIGNED_SHORT_5_5_5_1: PixelType;
    static readonly UNSIGNED_SHORT_1_5_5_5_REV: PixelType;
    static readonly UNSIGNED_INT: PixelType;
    static readonly UNSIGNED_INT_8_8_8_8: PixelType;
    static readonly UNSIGNED_INT_8_8_8_8_REV: PixelType;
    static readonly UNSIGNED_INT_10_10_10_2: PixelType;
    static readonly UNSIGNED_INT_2_10_10_10_REV: PixelType;
    static readonly UNSIGNED_INT_10F_11F_11F_REV: PixelType;
    static readonly UNSIGNED_INT_5_9_9_9_REV: PixelType;
    static fromString(name: string): Optional<PixelType>;
    get byteSize(): number;
    get glFormat(): number;
    get minimumGlVersion(): GlVersion;
    static valueOf(name: string): PixelType;
    static values(): PixelType[];
  }


  class TextureAccess {
    get textureId(): IntSupplier;
    get type(): TextureType;
  }


  class TextureDefinition {
    get name(): string;
  }


  class TextureScaleOverride {
    readonly isXRelative: boolean;
    readonly isYRelative: boolean;
    relativeX: number;
    relativeY: number;
    sizeX: number;
    sizeY: number;
    constructor(xValue: string, yValue: string);
    getX(originalX: number): number;
    getY(originalY: number): number;
  }


  interface TextureType extends Enum<TextureType> {}
  class TextureType extends Enum<TextureType> {
    static readonly TEXTURE_1D: TextureType;
    static readonly TEXTURE_2D: TextureType;
    static readonly TEXTURE_3D: TextureType;
    static readonly TEXTURE_RECTANGLE: TextureType;
    apply(texture: number, sizeX: number, sizeY: number, sizeZ: number, internalFormat: number, format: number, pixelType: number, pixels: ByteBuffer): void;
    static fromString(name: string): Optional<TextureType>;
    get glType(): number;
    static valueOf(name: string): TextureType;
    static values(): TextureType[];
  }


  class TextureUploadHelper {
    static resetTextureUploadState(): void;
  }


  interface TextureWrapper extends TextureAccess {}
  class TextureWrapper extends TextureAccess {
    constructor(texture: IntSupplier, type: TextureType);
    get textureId(): IntSupplier;
    get type(): TextureType;
  }

}

declare module 'net.irisshaders.iris.gl.texture.DepthCopyStrategy' {
  import { DepthCopyStrategy } from 'net.irisshaders.iris.gl.texture';
  import { GlFramebuffer } from 'net.irisshaders.iris.gl.framebuffer';

  interface Gl43CopyImage extends DepthCopyStrategy {}
  class Gl43CopyImage extends DepthCopyStrategy {
    copy(sourceFb: GlFramebuffer, sourceTexture: number, destFb: GlFramebuffer, destTexture: number, width: number, height: number): void;
    needsDestFramebuffer(): boolean;
  }


  interface Gl30BlitFbCombinedDepthStencil extends DepthCopyStrategy {}
  class Gl30BlitFbCombinedDepthStencil extends DepthCopyStrategy {
    copy(sourceFb: GlFramebuffer, sourceTexture: number, destFb: GlFramebuffer, destTexture: number, width: number, height: number): void;
    needsDestFramebuffer(): boolean;
  }


  interface Gl20CopyTexture extends DepthCopyStrategy {}
  class Gl20CopyTexture extends DepthCopyStrategy {
    copy(sourceFb: GlFramebuffer, sourceTexture: number, destFb: GlFramebuffer, destTexture: number, width: number, height: number): void;
    needsDestFramebuffer(): boolean;
  }

}

declare module 'net.irisshaders.iris.gl.texture.TextureDefinition' {
  import { TextureDefinition, TextureType, InternalTextureFormat, PixelFormat, PixelType } from 'net.irisshaders.iris.gl.texture';

  interface RawDefinition extends TextureDefinition {}
  class RawDefinition extends TextureDefinition {
    constructor(path: string, target: TextureType, internalFormat: InternalTextureFormat, sizeX: number, sizeY: number, sizeZ: number, format: PixelFormat, pixelType: PixelType);
    get format(): PixelFormat;
    get internalFormat(): InternalTextureFormat;
    get pixelType(): PixelType;
    get sizeX(): number;
    get sizeY(): number;
    get sizeZ(): number;
    get target(): TextureType;
  }


  interface PNGDefinition extends TextureDefinition {}
  class PNGDefinition extends TextureDefinition {
    constructor(name: string);
  }

}

declare module 'net.irisshaders.iris.gl.uniform' {
  import { ValueUpdateNotifier } from 'net.irisshaders.iris.gl.state';
  import { IntSupplier, DoubleSupplier, Supplier, BooleanSupplier } from 'java.util.function';
  import { Vector2f, Vector2i, Vector3f, Vector4f, Vector4i, Matrix4fc, Vector3i, Vector3d } from 'org.joml';
  import { OptionalInt, List } from 'java.util';
  import { Enum } from 'java.lang';

  interface BooleanUniform extends IntUniform {}
  class BooleanUniform extends IntUniform {
  }


  interface DynamicLocationalUniformHolder extends LocationalUniformHolder, DynamicUniformHolder {}
  class DynamicLocationalUniformHolder extends LocationalUniformHolder {
    addDynamicUniform(var1: Uniform, var2: ValueUpdateNotifier): DynamicLocationalUniformHolder;
    uniform1f(name: string, value: FloatSupplier, notifier: ValueUpdateNotifier): DynamicLocationalUniformHolder;
    uniform1f(name: string, value: IntSupplier, notifier: ValueUpdateNotifier): DynamicLocationalUniformHolder;
    uniform1f(name: string, value: DoubleSupplier, notifier: ValueUpdateNotifier): DynamicLocationalUniformHolder;
    uniform1f(updateFrequency: UniformUpdateFrequency, name: string, value: FloatSupplier): LocationalUniformHolder;
    uniform1f(updateFrequency: UniformUpdateFrequency, name: string, value: IntSupplier): LocationalUniformHolder;
    uniform1f(updateFrequency: UniformUpdateFrequency, name: string, value: DoubleSupplier): LocationalUniformHolder;
    uniform1i(name: string, value: IntSupplier, notifier: ValueUpdateNotifier): DynamicLocationalUniformHolder;
    uniform1i(updateFrequency: UniformUpdateFrequency, name: string, value: IntSupplier): LocationalUniformHolder;
    uniform2f(name: string, value: Supplier<Vector2f>, notifier: ValueUpdateNotifier): DynamicLocationalUniformHolder;
    uniform2f(updateFrequency: UniformUpdateFrequency, name: string, value: Supplier<Vector2f>): LocationalUniformHolder;
    uniform2i(name: string, value: Supplier<Vector2i>, notifier: ValueUpdateNotifier): DynamicLocationalUniformHolder;
    uniform2i(updateFrequency: UniformUpdateFrequency, name: string, value: Supplier<Vector2i>): LocationalUniformHolder;
    uniform3f(name: string, value: Supplier<Vector3f>, notifier: ValueUpdateNotifier): DynamicUniformHolder;
    uniform3f(updateFrequency: UniformUpdateFrequency, name: string, value: Supplier<Vector3f>): LocationalUniformHolder;
    uniform4f(name: string, value: Supplier<Vector4f>, notifier: ValueUpdateNotifier): DynamicUniformHolder;
    uniform4f(updateFrequency: UniformUpdateFrequency, name: string, value: Supplier<Vector4f>): LocationalUniformHolder;
    uniform4fArray(name: string, value: Supplier<number[]>, notifier: ValueUpdateNotifier): DynamicUniformHolder;
    uniform4fArray(updateFrequency: UniformUpdateFrequency, name: string, value: Supplier<number[]>): LocationalUniformHolder;
    uniform4i(name: string, value: Supplier<Vector4i>, notifier: ValueUpdateNotifier): DynamicUniformHolder;
    uniformMatrix(name: string, value: Supplier<Matrix4fc>, notifier: ValueUpdateNotifier): DynamicUniformHolder;
    uniformMatrix(updateFrequency: UniformUpdateFrequency, name: string, value: Supplier<Matrix4fc>): LocationalUniformHolder;
  }


  interface DynamicUniformHolder extends UniformHolder {}
  class DynamicUniformHolder extends UniformHolder {
    uniform1f(var1: string, var2: FloatSupplier, var3: ValueUpdateNotifier): DynamicUniformHolder;
    uniform1f(var1: string, var2: IntSupplier, var3: ValueUpdateNotifier): DynamicUniformHolder;
    uniform1f(var1: string, var2: DoubleSupplier, var3: ValueUpdateNotifier): DynamicUniformHolder;
    uniform1f(var1: UniformUpdateFrequency, var2: string, var3: FloatSupplier): UniformHolder;
    uniform1f(var1: UniformUpdateFrequency, var2: string, var3: IntSupplier): UniformHolder;
    uniform1f(var1: UniformUpdateFrequency, var2: string, var3: DoubleSupplier): UniformHolder;
    uniform1i(var1: string, var2: IntSupplier, var3: ValueUpdateNotifier): DynamicUniformHolder;
    uniform1i(var1: UniformUpdateFrequency, var2: string, var3: IntSupplier): UniformHolder;
    uniform2f(var1: string, var2: Supplier<Vector2f>, var3: ValueUpdateNotifier): DynamicUniformHolder;
    uniform2f(var1: UniformUpdateFrequency, var2: string, var3: Supplier<Vector2f>): UniformHolder;
    uniform2i(var1: string, var2: Supplier<Vector2i>, var3: ValueUpdateNotifier): DynamicUniformHolder;
    uniform2i(var1: UniformUpdateFrequency, var2: string, var3: Supplier<Vector2i>): UniformHolder;
    uniform3f(var1: string, var2: Supplier<Vector3f>, var3: ValueUpdateNotifier): DynamicUniformHolder;
    uniform3f(var1: UniformUpdateFrequency, var2: string, var3: Supplier<Vector3f>): UniformHolder;
    uniform4f(var1: string, var2: Supplier<Vector4f>, var3: ValueUpdateNotifier): DynamicUniformHolder;
    uniform4f(var1: UniformUpdateFrequency, var2: string, var3: Supplier<Vector4f>): UniformHolder;
    uniform4fArray(var1: string, var2: Supplier<number[]>, var3: ValueUpdateNotifier): DynamicUniformHolder;
    uniform4fArray(var1: UniformUpdateFrequency, var2: string, var3: Supplier<number[]>): UniformHolder;
    uniform4i(var1: string, var2: Supplier<Vector4i>, var3: ValueUpdateNotifier): DynamicUniformHolder;
    uniformMatrix(var1: string, var2: Supplier<Matrix4fc>, var3: ValueUpdateNotifier): DynamicUniformHolder;
    uniformMatrix(var1: UniformUpdateFrequency, var2: string, var3: Supplier<Matrix4fc>): UniformHolder;
  }


  class FloatSupplier {
    get asFloat(): number;
  }


  interface FloatUniform extends Uniform {}
  class FloatUniform extends Uniform {
    update(): void;
  }


  interface IntUniform extends Uniform {}
  class IntUniform extends Uniform {
    update(): void;
  }


  interface LocationalUniformHolder extends UniformHolder {}
  class LocationalUniformHolder extends UniformHolder {
    addUniform(var1: UniformUpdateFrequency, var2: Uniform): LocationalUniformHolder;
    location(var1: string, var2: UniformType): OptionalInt;
    uniform1b(updateFrequency: UniformUpdateFrequency, name: string, value: BooleanSupplier): LocationalUniformHolder;
    uniform1f(updateFrequency: UniformUpdateFrequency, name: string, value: FloatSupplier): LocationalUniformHolder;
    uniform1f(updateFrequency: UniformUpdateFrequency, name: string, value: IntSupplier): LocationalUniformHolder;
    uniform1f(updateFrequency: UniformUpdateFrequency, name: string, value: DoubleSupplier): LocationalUniformHolder;
    uniform1i(updateFrequency: UniformUpdateFrequency, name: string, value: IntSupplier): LocationalUniformHolder;
    uniform2f(updateFrequency: UniformUpdateFrequency, name: string, value: Supplier<Vector2f>): LocationalUniformHolder;
    uniform2i(updateFrequency: UniformUpdateFrequency, name: string, value: Supplier<Vector2i>): LocationalUniformHolder;
    uniform3d(updateFrequency: UniformUpdateFrequency, name: string, value: Supplier<Vector3d>): LocationalUniformHolder;
    uniform3f(updateFrequency: UniformUpdateFrequency, name: string, value: Supplier<Vector3f>): LocationalUniformHolder;
    uniform3i(updateFrequency: UniformUpdateFrequency, name: string, value: Supplier<Vector3i>): LocationalUniformHolder;
    uniform4f(updateFrequency: UniformUpdateFrequency, name: string, value: Supplier<Vector4f>): LocationalUniformHolder;
    uniform4fArray(updateFrequency: UniformUpdateFrequency, name: string, value: Supplier<number[]>): LocationalUniformHolder;
    uniformMatrix(updateFrequency: UniformUpdateFrequency, name: string, value: Supplier<Matrix4fc>): LocationalUniformHolder;
    uniformMatrixFromArray(updateFrequency: UniformUpdateFrequency, name: string, value: Supplier<number[]>): LocationalUniformHolder;
    uniformTruncated3f(updateFrequency: UniformUpdateFrequency, name: string, value: Supplier<Vector4f>): LocationalUniformHolder;
  }


  interface MatrixFromFloatArrayUniform extends Uniform {}
  class MatrixFromFloatArrayUniform extends Uniform {
    update(): void;
  }


  interface MatrixUniform extends Uniform {}
  class MatrixUniform extends Uniform {
    update(): void;
    updateValue(): void;
  }


  class Uniform {
    get location(): number;
    get notifier(): ValueUpdateNotifier;
    update(): void;
  }


  class UniformHolder {
    externallyManagedUniform(var1: string, var2: UniformType): UniformHolder;
    uniform1b(var1: UniformUpdateFrequency, var2: string, var3: BooleanSupplier): UniformHolder;
    uniform1f(var1: UniformUpdateFrequency, var2: string, var3: FloatSupplier): UniformHolder;
    uniform1f(var1: UniformUpdateFrequency, var2: string, var3: IntSupplier): UniformHolder;
    uniform1f(var1: UniformUpdateFrequency, var2: string, var3: DoubleSupplier): UniformHolder;
    uniform1i(var1: UniformUpdateFrequency, var2: string, var3: IntSupplier): UniformHolder;
    uniform2f(var1: UniformUpdateFrequency, var2: string, var3: Supplier<Vector2f>): UniformHolder;
    uniform2i(var1: UniformUpdateFrequency, var2: string, var3: Supplier<Vector2i>): UniformHolder;
    uniform3d(var1: UniformUpdateFrequency, var2: string, var3: Supplier<Vector3d>): UniformHolder;
    uniform3f(var1: UniformUpdateFrequency, var2: string, var3: Supplier<Vector3f>): UniformHolder;
    uniform3i(var1: UniformUpdateFrequency, var2: string, var3: Supplier<Vector3i>): UniformHolder;
    uniform4f(var1: UniformUpdateFrequency, var2: string, var3: Supplier<Vector4f>): UniformHolder;
    uniform4fArray(var1: UniformUpdateFrequency, var2: string, var3: Supplier<number[]>): UniformHolder;
    uniformMatrix(var1: UniformUpdateFrequency, var2: string, var3: Supplier<Matrix4fc>): UniformHolder;
    uniformMatrixFromArray(var1: UniformUpdateFrequency, var2: string, var3: Supplier<number[]>): UniformHolder;
    uniformTruncated3f(var1: UniformUpdateFrequency, var2: string, var3: Supplier<Vector4f>): UniformHolder;
  }


  interface UniformType extends Enum<UniformType> {}
  class UniformType extends Enum<UniformType> {
    static readonly INT: UniformType;
    static readonly FLOAT: UniformType;
    static readonly MAT3: UniformType;
    static readonly MAT4: UniformType;
    static readonly VEC2: UniformType;
    static readonly VEC2I: UniformType;
    static readonly VEC3: UniformType;
    static readonly VEC3I: UniformType;
    static readonly VEC4: UniformType;
    static readonly VEC4I: UniformType;
    static valueOf(name: string): UniformType;
    static values(): UniformType[];
  }


  interface UniformUpdateFrequency extends Enum<UniformUpdateFrequency> {}
  class UniformUpdateFrequency extends Enum<UniformUpdateFrequency> {
    static readonly ONCE: UniformUpdateFrequency;
    static readonly PER_TICK: UniformUpdateFrequency;
    static readonly PER_FRAME: UniformUpdateFrequency;
    static readonly CUSTOM: UniformUpdateFrequency;
    static valueOf(name: string): UniformUpdateFrequency;
    static values(): UniformUpdateFrequency[];
  }


  interface Vector2IntegerJomlUniform extends Uniform {}
  class Vector2IntegerJomlUniform extends Uniform {
    update(): void;
  }


  interface Vector2Uniform extends Uniform {}
  class Vector2Uniform extends Uniform {
    update(): void;
  }


  interface Vector3IntegerUniform extends Uniform {}
  class Vector3IntegerUniform extends Uniform {
    update(): void;
  }


  interface Vector3Uniform extends Uniform {}
  class Vector3Uniform extends Uniform {
    update(): void;
  }


  interface Vector4ArrayUniform extends Uniform {}
  class Vector4ArrayUniform extends Uniform {
    update(): void;
  }


  interface Vector4IntegerJomlUniform extends Uniform {}
  class Vector4IntegerJomlUniform extends Uniform {
    update(): void;
  }


  interface Vector4Uniform extends Uniform {}
  class Vector4Uniform extends Uniform {
    update(): void;
  }

}

declare module 'net.irisshaders.iris.gui.debug' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Component } from 'net.minecraft.network.chat';
  import { Exception } from 'java.lang';
  import { AbstractScrollWidget } from 'net.minecraft.client.gui.components';
  import { Font } from 'net.minecraft.client.gui';

  interface DebugLoadFailedGridScreen extends Screen {}
  class DebugLoadFailedGridScreen extends Screen {
    constructor(parent: Screen, arg: Component, exception: Exception);
  }


  interface DebugTextWidget extends AbstractScrollWidget {}
  class DebugTextWidget extends AbstractScrollWidget {
    constructor(i: number, j: number, k: number, l: number, arg: Font, exception: Exception);
  }

}

declare module 'net.irisshaders.iris.gui.debug.DebugTextWidget' {
  import { Font } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';

  class ContentBuilder {
    constructor(i: number);
    addHeader(arg: Font, arg2: Component): void;
    addLine(arg: Font, arg2: Component): void;
    addLine(arg: Font, arg2: Component, i: number): void;
    addSpacer(i: number): void;
    build(): Content;
  }

}

declare module 'net.irisshaders.iris.gui.element' {
  import { ContainerObjectSelectionList, AbstractSelectionList } from 'net.minecraft.client.gui.components';
  import { Minecraft } from 'net.minecraft.client';
  import { Element } from 'net.irisshaders.iris.gui.element.IrisElementRow';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { BaseEntry } from 'net.irisshaders.iris.gui.element.ShaderPackOptionList';
  import { ShaderPackScreen } from 'net.irisshaders.iris.gui.screen';
  import { NavigationController } from 'net.irisshaders.iris.gui';
  import { ShaderPack } from 'net.irisshaders.iris.shaderpack';
  import { Component } from 'net.minecraft.network.chat';
  import { AbstractElementWidget } from 'net.irisshaders.iris.gui.element.widget';
  import { BaseEntry as net_irisshaders_iris_gui_element_shaderpackselectionlist_BaseEntry, ShaderPackEntry, TopButtonRowEntry } from 'net.irisshaders.iris.gui.element.ShaderPackSelectionList';

  interface IrisContainerObjectSelectionList<E extends Entry<E> = any> extends ContainerObjectSelectionList<E> {}
  class IrisContainerObjectSelectionList<E extends Entry<E> = any> extends ContainerObjectSelectionList<E> {
    constructor(client: Minecraft, width: number, height: number, top: number, bottom: number, left: number, right: number, itemHeight: number);
    select(entry: number): void;
  }


  class IrisElementRow {
    constructor(spacing: number);

    constructor();
    add(element: Element, width: number): IrisElementRow;
    children(): GuiEventListener[];
    get width(): number;
    keyPressed(keycode: number, scancode: number, modifiers: number): boolean;
    mouseClicked(mx: number, my: number, button: number): boolean;
    mouseReleased(mx: number, my: number, button: number): boolean;
    render(guiGraphics: GuiGraphics, x: number, y: number, height: number, mouseX: number, mouseY: number, tickDelta: number, rowHovered: boolean): void;
    renderRightAligned(guiGraphics: GuiGraphics, x: number, y: number, height: number, mouseX: number, mouseY: number, tickDelta: number, hovered: boolean): void;
    setWidth(element: Element, width: number): void;
  }


  interface IrisObjectSelectionList<E extends Entry<E> = any> extends AbstractSelectionList<E> {}
  class IrisObjectSelectionList<E extends Entry<E> = any> extends AbstractSelectionList<E> {
    constructor(client: Minecraft, width: number, height: number, top: number, bottom: number, left: number, right: number, itemHeight: number);
    select(entry: number): void;
    updateWidgetNarration(p0: NarrationElementOutput): void;
  }


  interface ShaderPackOptionList extends IrisContainerObjectSelectionList<BaseEntry> {}
  class ShaderPackOptionList extends IrisContainerObjectSelectionList<BaseEntry> {
    constructor(screen: ShaderPackScreen, navigation: NavigationController, pack: ShaderPack, client: Minecraft, width: number, height: number, top: number, bottom: number, left: number, right: number);
    addHeader(text: Component, backButton: boolean): void;
    addWidgets(columns: number, elements: AbstractElementWidget<any>[]): void;
    applyShaderPack(pack: ShaderPack): void;
    get navigation(): NavigationController;
    get rowWidth(): number;
    rebuild(): void;
    refresh(): void;
  }


  interface ShaderPackSelectionList extends IrisObjectSelectionList<net_irisshaders_iris_gui_element_shaderpackselectionlist_BaseEntry> {}
  class ShaderPackSelectionList extends IrisObjectSelectionList<net_irisshaders_iris_gui_element_shaderpackselectionlist_BaseEntry> {
    constructor(screen: ShaderPackScreen, client: Minecraft, width: number, height: number, top: number, bottom: number, left: number, right: number);
    addLabelEntries(...lines: Component[]): void;
    addPackEntry(index: number, name: string): void;
    close(): void;
    get applied(): ShaderPackEntry;
    get rowWidth(): number;
    get topButtonRow(): TopButtonRowEntry;
    keyPressed(pContainerEventHandler0: number, pInt1: number, pInt2: number): boolean;
    refresh(): void;
    renderWidget(pAbstractSelectionList0: GuiGraphics, pInt1: number, pInt2: number, pFloat3: number): void;
    select(name: string): void;
    select(entry: number): void;
    set applied(entry: ShaderPackEntry);
  }

}

declare module 'net.irisshaders.iris.gui.element.IrisElementRow' {
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { GuiGraphics, ComponentPath } from 'net.minecraft.client.gui';
  import { FocusNavigationEvent, ScreenRectangle } from 'net.minecraft.client.gui.navigation';
  import { Component } from 'net.minecraft.network.chat';
  import { Function } from 'java.util.function';
  import { Boolean } from 'java.lang';
  import { Icon } from 'net.irisshaders.iris.gui.GuiUtil';

  interface Element extends GuiEventListener {}
  class Element extends GuiEventListener {
    disabled: boolean;
    get rectangle(): ScreenRectangle;
    isFocused(): boolean;
    isHovered(): boolean;
    nextFocusPath(pGuiEventListener0: FocusNavigationEvent): ComponentPath;
    render(guiGraphics: GuiGraphics, x: number, y: number, width: number, height: number, mouseX: number, mouseY: number, tickDelta: number, hovered: boolean): void;
    renderLabel(var1: GuiGraphics, var2: number, var3: number, var4: number, var5: number, var6: number, var7: number, var8: number, var9: boolean): void;
    setFocused(focused: boolean): void;
  }


  interface TextButtonElement extends ButtonElement<TextButtonElement> {}
  class TextButtonElement extends ButtonElement<TextButtonElement> {
    text: Component;
    constructor(text: Component, onClick: Function<TextButtonElement, boolean>);
    renderLabel(guiGraphics: GuiGraphics, x: number, y: number, width: number, height: number, mouseX: number, mouseY: number, tickDelta: number, hovered: boolean): void;
  }


  interface IconButtonElement extends ButtonElement<IconButtonElement> {}
  class IconButtonElement extends ButtonElement<IconButtonElement> {
    readonly icon: Icon;
    readonly hoveredIcon: Icon;
    constructor(icon: Icon, hoveredIcon: Icon, onClick: Function<IconButtonElement, boolean>);

    constructor(icon: Icon, onClick: Function<IconButtonElement, boolean>);
    renderLabel(guiGraphics: GuiGraphics, x: number, y: number, width: number, height: number, mouseX: number, mouseY: number, tickDelta: number, hovered: boolean): void;
  }


  interface ButtonElement<T extends ButtonElement<T> = any> extends Element {}
  class ButtonElement<T extends ButtonElement<T> = any> extends Element {
    keyPressed(keycode: number, scancode: number, modifiers: number): boolean;
    mouseClicked(mx: number, my: number, button: number): boolean;
  }

}

declare module 'net.irisshaders.iris.gui.element.screen' {
  import { Button } from 'net.minecraft.client.gui.components';
  import { Component } from 'net.minecraft.network.chat';
  import { OnPress, CreateNarration } from 'Button';
  import { FloatSupplier } from 'net.irisshaders.iris.gl.uniform';
  import { Builder } from 'net.irisshaders.iris.gui.element.screen.IrisButton';

  interface IrisButton extends Button {}
  class IrisButton extends Button {
    constructor(pButton0: number, pInt1: number, pInt2: number, pInt3: number, pComponent4: Component, pButton$OnPress5: OnPress, pButton$CreateNarration6: CreateNarration, alpha: FloatSupplier);
    static iris$builder(pComponent0: Component, pButton$OnPress1: OnPress, alpha: FloatSupplier): Builder;
  }

}

declare module 'net.irisshaders.iris.gui.element.screen.IrisButton' {
  import { Component } from 'net.minecraft.network.chat';
  import { OnPress, CreateNarration } from 'Button';
  import { FloatSupplier } from 'net.irisshaders.iris.gl.uniform';
  import { Tooltip } from 'net.minecraft.client.gui.components';
  import { IrisButton } from 'net.irisshaders.iris.gui.element.screen';

  class Builder {
    constructor(pButton$Builder0: Component, pButton$OnPress1: OnPress, alpha: FloatSupplier);
    bounds(pButton$Builder0: number, pInt1: number, pInt2: number, pInt3: number): Builder;
    build(): IrisButton;
    createNarration(pButton$Builder0: CreateNarration): Builder;
    pos(pButton$Builder0: number, pInt1: number): Builder;
    size(pButton$Builder0: number, pInt1: number): Builder;
    tooltip(pButton$Builder0: Tooltip): Builder;
    width(pButton$Builder0: number): Builder;
  }

}

declare module 'net.irisshaders.iris.gui.element.ShaderPackOptionList' {
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { ShaderPackOptionList } from 'net.irisshaders.iris.gui.element';
  import { ShaderPackScreen } from 'net.irisshaders.iris.gui.screen';
  import { NavigationController } from 'net.irisshaders.iris.gui';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { NarratableEntry } from 'net.minecraft.client.gui.narration';
  import { AbstractElementWidget } from 'net.irisshaders.iris.gui.element.widget';
  import { Entry } from 'ContainerObjectSelectionList';

  interface HeaderEntry extends BaseEntry {}
  class HeaderEntry extends BaseEntry {
    static readonly BACK_BUTTON_TEXT: Component;
    static readonly RESET_BUTTON_TEXT_INACTIVE: MutableComponent;
    static readonly RESET_BUTTON_TEXT_ACTIVE: MutableComponent;
    static readonly RESET_HOLD_SHIFT_TOOLTIP: MutableComponent;
    static readonly RESET_TOOLTIP: MutableComponent;
    static readonly IMPORT_TOOLTIP: MutableComponent;
    static readonly EXPORT_TOOLTIP: MutableComponent;
    constructor(this$0: ShaderPackOptionList, screen: ShaderPackScreen, navigation: NavigationController, text: Component, hasBackButton: boolean);
    children(): GuiEventListener[];
    keyPressed(keycode: number, scancode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    narratables(): NarratableEntry[];
    render(guiGraphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, hovered: boolean, tickDelta: number): void;
  }


  interface ElementRowEntry extends BaseEntry {}
  class ElementRowEntry extends BaseEntry {
    constructor(screen: ShaderPackScreen, navigation: NavigationController, widgets: AbstractElementWidget<any>[]);
    children(): GuiEventListener[];
    getHoveredWidget(mouseX: number): number;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    narratables(): NarratableEntry[];
    render(guiGraphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, hovered: boolean, tickDelta: number): void;
  }


  interface BaseEntry extends Entry<BaseEntry> {}
  class BaseEntry extends Entry<BaseEntry> {
  }

}

declare module 'net.irisshaders.iris.gui.element.ShaderPackSelectionList' {
  import { ShaderPackSelectionList } from 'net.irisshaders.iris.gui.element';
  import { ScreenRectangle, FocusNavigationEvent } from 'net.minecraft.client.gui.navigation';
  import { GuiGraphics, ComponentPath } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';
  import { Entry } from 'AbstractSelectionList';

  interface ShaderPackEntry extends BaseEntry {}
  class ShaderPackEntry extends BaseEntry {
    constructor(index: number, list: ShaderPackSelectionList, packName: string);
    get packName(): string;
    get rectangle(): ScreenRectangle;
    isApplied(): boolean;
    isFocused(): boolean;
    isSelected(): boolean;
    keyPressed(keycode: number, pInt1: number, pInt2: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    nextFocusPath(pGuiEventListener0: FocusNavigationEvent): ComponentPath;
    render(guiGraphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, hovered: boolean, tickDelta: number): void;
  }


  interface TopButtonRowEntry extends BaseEntry {}
  class TopButtonRowEntry extends BaseEntry {
    allowEnableShadersButton: boolean;
    shadersEnabled: boolean;
    constructor(list: ShaderPackSelectionList, shadersEnabled: boolean);
    isFocused(): boolean;
    keyPressed(keycode: number, scancode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    nextFocusPath(pGuiEventListener0: FocusNavigationEvent): ComponentPath;
    render(guiGraphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, hovered: boolean, tickDelta: number): void;
    setShadersEnabled(shadersEnabled: boolean): void;
  }


  interface LabelEntry extends BaseEntry {}
  class LabelEntry extends BaseEntry {
    constructor(label: Component);
    render(guiGraphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, hovered: boolean, tickDelta: number): void;
  }


  interface BaseEntry extends Entry<BaseEntry> {}
  class BaseEntry extends Entry<BaseEntry> {
  }

}

declare module 'net.irisshaders.iris.gui.element.ShaderPackSelectionList.TopButtonRowEntry' {
  import { TextButtonElement } from 'net.irisshaders.iris.gui.element.IrisElementRow';
  import { Component } from 'net.minecraft.network.chat';
  import { Function } from 'java.util.function';
  import { Boolean } from 'java.lang';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface EnableShadersButtonElement extends TextButtonElement {}
  class EnableShadersButtonElement extends TextButtonElement {
    constructor(text: Component, onClick: Function<TextButtonElement, boolean>);
    renderLabel(guiGraphics: GuiGraphics, x: number, y: number, width: number, height: number, mouseX: number, mouseY: number, tickDelta: number, hovered: boolean): void;
  }

}

declare module 'net.irisshaders.iris.gui.element.widget' {
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { NarratableEntry, NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { ScreenRectangle, FocusNavigationEvent } from 'net.minecraft.client.gui.navigation';
  import { ShaderPackScreen } from 'net.irisshaders.iris.gui.screen';
  import { NavigationController } from 'net.irisshaders.iris.gui';
  import { GuiGraphics, ComponentPath } from 'net.minecraft.client.gui';
  import { NarrationPriority } from 'NarratableEntry';
  import { Optional } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { OptionMenuBooleanOptionElement, OptionMenuLinkElement, OptionMenuElement, OptionMenuElementScreen, OptionMenuContainer, OptionMenuProfileElement, OptionMenuStringOptionElement } from 'net.irisshaders.iris.shaderpack.option.menu';
  import { Class } from 'java.lang';
  import { WidgetProvider, ScreenDataProvider } from 'net.irisshaders.iris.gui.element.widget.OptionMenuConstructor';
  import { ElementWidgetScreenData } from 'net.irisshaders.iris.gui.element.screen';
  import { ShaderPackOptionList } from 'net.irisshaders.iris.gui.element';

  interface AbstractElementWidget<T extends OptionMenuElement = any> extends GuiEventListener, NarratableEntry {}
  class AbstractElementWidget<T extends OptionMenuElement = any> extends GuiEventListener {
    static readonly EMPTY: AbstractElementWidget;
    bounds: ScreenRectangle;
    constructor(element: T);
    get rectangle(): ScreenRectangle;
    init(screen: ShaderPackScreen, navigation: NavigationController): void;
    isFocused(): boolean;
    keyPressed(keycode: number, scancode: number, modifiers: number): boolean;
    mouseClicked(mx: number, my: number, button: number): boolean;
    mouseReleased(mx: number, my: number, button: number): boolean;
    narrationPriority(): NarrationPriority;
    nextFocusPath(pGuiEventListener0: FocusNavigationEvent): ComponentPath;
    render(var1: GuiGraphics, var2: number, var3: number, var4: number, var5: boolean): void;
    setFocused(focused: boolean): void;
    updateNarration(p0: NarrationElementOutput): void;
  }


  interface BaseOptionElementWidget<T extends OptionMenuElement = any> extends CommentedElementWidget<T> {}
  class BaseOptionElementWidget<T extends OptionMenuElement = any> extends CommentedElementWidget<T> {
    constructor(element: T);
    applyNextValue(): boolean;
    applyOriginalValue(): boolean;
    applyPreviousValue(): boolean;
    get commentBody(): Optional<Component>;
    get commentKey(): string;
    get commentTitle(): Optional<Component>;
    init(screen: ShaderPackScreen, navigation: NavigationController): void;
    isValueModified(): boolean;
    keyPressed(keycode: number, scancode: number, modifiers: number): boolean;
    mouseClicked(mx: number, my: number, button: number): boolean;
  }


  interface BooleanElementWidget extends BaseOptionElementWidget<OptionMenuBooleanOptionElement> {}
  class BooleanElementWidget extends BaseOptionElementWidget<OptionMenuBooleanOptionElement> {
    constructor(element: OptionMenuBooleanOptionElement);
    applyNextValue(): boolean;
    applyOriginalValue(): boolean;
    applyPreviousValue(): boolean;
    get commentKey(): string;
    get value(): string;
    init(screen: ShaderPackScreen, navigation: NavigationController): void;
    isValueModified(): boolean;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, tickDelta: number, hovered: boolean): void;
  }


  interface CommentedElementWidget<T extends OptionMenuElement = any> extends AbstractElementWidget<T> {}
  class CommentedElementWidget<T extends OptionMenuElement = any> extends AbstractElementWidget<T> {
    constructor(element: T);
    get commentBody(): Optional<Component>;
    get commentTitle(): Optional<Component>;
  }


  interface LinkElementWidget extends CommentedElementWidget<OptionMenuLinkElement> {}
  class LinkElementWidget extends CommentedElementWidget<OptionMenuLinkElement> {
    constructor(element: OptionMenuLinkElement);
    get commentBody(): Optional<Component>;
    get commentTitle(): Optional<Component>;
    init(screen: ShaderPackScreen, navigation: NavigationController): void;
    keyPressed(keyCode: number, pInt1: number, pInt2: number): boolean;
    mouseClicked(mx: number, my: number, button: number): boolean;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, tickDelta: number, hovered: boolean): void;
  }


  class OptionMenuConstructor {
    static constructAndApplyToScreen(container: OptionMenuContainer, packScreen: ShaderPackScreen, optionList: ShaderPackOptionList, navigation: NavigationController): void;
    static createScreenData(screen: OptionMenuElementScreen): ElementWidgetScreenData;
    static createWidget(element: OptionMenuElement): AbstractElementWidget<OptionMenuElement>;
    static registerScreen<T extends OptionMenuElementScreen>(screen: Class<T>, data: ScreenDataProvider<T>): void;
    static registerWidget<T extends OptionMenuElement>(element: Class<T>, widget: WidgetProvider<T>): void;
  }


  interface ProfileElementWidget extends BaseOptionElementWidget<OptionMenuProfileElement> {}
  class ProfileElementWidget extends BaseOptionElementWidget<OptionMenuProfileElement> {
    constructor(element: OptionMenuProfileElement);
    applyNextValue(): boolean;
    applyOriginalValue(): boolean;
    applyPreviousValue(): boolean;
    get commentKey(): string;
    get commentTitle(): Optional<Component>;
    init(screen: ShaderPackScreen, navigation: NavigationController): void;
    isValueModified(): boolean;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, tickDelta: number, hovered: boolean): void;
  }


  interface SliderElementWidget extends StringElementWidget {}
  class SliderElementWidget extends StringElementWidget {
    constructor(element: OptionMenuStringOptionElement);
    keyPressed(keycode: number, scancode: number, modifiers: number): boolean;
    mouseClicked(mx: number, my: number, button: number): boolean;
    mouseReleased(mx: number, my: number, button: number): boolean;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, tickDelta: number, hovered: boolean): void;
  }


  interface StringElementWidget extends BaseOptionElementWidget<OptionMenuStringOptionElement> {}
  class StringElementWidget extends BaseOptionElementWidget<OptionMenuStringOptionElement> {
    constructor(element: OptionMenuStringOptionElement);
    applyNextValue(): boolean;
    applyOriginalValue(): boolean;
    applyPreviousValue(): boolean;
    get commentKey(): string;
    get value(): string;
    init(screen: ShaderPackScreen, navigation: NavigationController): void;
    isValueModified(): boolean;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, tickDelta: number, hovered: boolean): void;
  }

}

declare module 'net.irisshaders.iris.gui.element.widget.OptionMenuConstructor' {
  import { AbstractElementWidget } from 'net.irisshaders.iris.gui.element.widget';
  import { ElementWidgetScreenData } from 'net.irisshaders.iris.gui.element.screen';

  class WidgetProvider<T extends OptionMenuElement = any> {
    create(var1: T): AbstractElementWidget<T>;
  }


  class ScreenDataProvider<T extends OptionMenuElementScreen = any> {
    create(var1: T): ElementWidgetScreenData;
  }

}

declare module 'net.irisshaders.iris.gui' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Optional } from 'java.util';
  import { Path } from 'java.nio.file';
  import { DialogType } from 'net.irisshaders.iris.gui.FileDialogUtil';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { OptionMenuContainer } from 'net.irisshaders.iris.shaderpack.option.menu';
  import { ShaderPackOptionList } from 'net.irisshaders.iris.gui.element';
  import { Button } from 'net.minecraft.client.gui.components';
  import { OnPress } from 'Button';

  interface FeatureMissingErrorScreen extends Screen {}
  class FeatureMissingErrorScreen extends Screen {
    constructor(parent: Screen, title: Component, message: Component);
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }


  class FileDialogUtil {
    static fileSelectDialog(dialog: DialogType, title: string, origin: Path, filterLabel: string, ...filters: string[]): CompletableFuture<Optional<Path>>;
  }


  class GuiUtil {
    static readonly IRIS_WIDGETS_TEX: ResourceLocation;
    static bindIrisWidgetsTexture(): void;
    static drawButton(guiGraphics: GuiGraphics, x: number, y: number, width: number, height: number, hovered: boolean, disabled: boolean): void;
    static drawPanel(guiGraphics: GuiGraphics, x: number, y: number, width: number, height: number): void;
    static drawTextPanel(font: Font, guiGraphics: GuiGraphics, text: Component, x: number, y: number): void;
    static playButtonClickSound(): void;
    static shortenText(font: Font, text: MutableComponent, width: number): MutableComponent;
    static translateOrDefault(defaultText: MutableComponent, translationDesc: string, ...format: any[]): MutableComponent;
  }


  class NavigationController {
    constructor(container: OptionMenuContainer);
    back(): void;
    get currentScreen(): string;
    hasHistory(): boolean;
    open(screen: string): void;
    rebuild(): void;
    refresh(): void;
    setActiveOptionList(optionList: ShaderPackOptionList): void;
  }


  interface OldImageButton extends Button {}
  class OldImageButton extends Button {
    constructor(pImageButton0: number, pInt1: number, pInt2: number, pInt3: number, pInt4: number, pInt5: number, pResourceLocation6: ResourceLocation, pButton$OnPress7: OnPress);

    constructor(pImageButton0: number, pInt1: number, pInt2: number, pInt3: number, pInt4: number, pInt5: number, pInt6: number, pResourceLocation7: ResourceLocation, pButton$OnPress8: OnPress);

    constructor(pImageButton0: number, pInt1: number, pInt2: number, pInt3: number, pInt4: number, pInt5: number, pInt6: number, pResourceLocation7: ResourceLocation, pInt8: number, pInt9: number, pButton$OnPress10: OnPress);

    constructor(pImageButton0: number, pInt1: number, pInt2: number, pInt3: number, pInt4: number, pInt5: number, pInt6: number, pResourceLocation7: ResourceLocation, pInt8: number, pInt9: number, pButton$OnPress10: OnPress, pComponent11: Component);
    renderTexture(pAbstractWidget0: GuiGraphics, pResourceLocation1: ResourceLocation, pInt2: number, pInt3: number, pInt4: number, pInt5: number, pInt6: number, pInt7: number, pInt8: number, pInt9: number, pInt10: number): void;
    renderWidget(pImageButton0: GuiGraphics, pInt1: number, pInt2: number, pFloat3: number): void;
  }

}

declare module 'net.irisshaders.iris.gui.FileDialogUtil' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface DialogType extends Enum<DialogType> {}
  class DialogType extends Enum<DialogType> {
    static readonly SAVE: DialogType;
    static readonly OPEN: DialogType;
    static valueOf(name: string): DialogType;
    static values(): DialogType[];
  }

}

declare module 'net.irisshaders.iris.gui.GuiUtil' {
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class Icon {
    static readonly SEARCH: Icon;
    static readonly CLOSE: Icon;
    static readonly REFRESH: Icon;
    static readonly EXPORT: Icon;
    static readonly EXPORT_COLORED: Icon;
    static readonly IMPORT: Icon;
    static readonly IMPORT_COLORED: Icon;
    constructor(u: number, v: number, width: number, height: number);
    draw(guiGraphics: GuiGraphics, x: number, y: number): void;
    get height(): number;
    get width(): number;
  }

}

declare module 'net.irisshaders.iris.gui.option' {
  import { ColorSpace } from 'net.irisshaders.iris.pathways.colorspace';
  import { OptionInstance, Minecraft, Options } from 'net.minecraft.client';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { TooltipSupplier, CaptionBasedToString, ValueSet } from 'OptionInstance';
  import { Consumer } from 'java.util.function';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';

  class IrisVideoSettings {
    static shadowDistance: number;
    static colorSpace: ColorSpace;
    static readonly RENDER_DISTANCE: OptionInstance;
    static getOverriddenShadowDistance(base: number): number;
    static isShadowDistanceSliderEnabled(): boolean;
  }


  class ShaderPackSelectionButtonOption {
    constructor(parent: Screen, client: Minecraft);
  }


  interface ShadowDistanceOption<T = any> extends OptionInstance<T> {}
  class ShadowDistanceOption<T = any> extends OptionInstance<T> {
    constructor(string: string, arg: TooltipSupplier<T>, arg2: CaptionBasedToString<T>, arg3: ValueSet<T>, object: T, consumer: Consumer<T>);
    createButton(options: Options, x: number, y: number, width: number): AbstractWidget;
  }

}

declare module 'net.irisshaders.iris.gui.screen' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Set, List } from 'java.util';
  import { SmoothedFloat } from 'net.irisshaders.iris.uniforms.transforms';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Path } from 'java.nio.file';
  import { Component } from 'net.minecraft.network.chat';
  import { AbstractElementWidget } from 'net.irisshaders.iris.gui.element.widget';
  import { Button } from 'net.minecraft.client.gui.components';

  class HudHideable {
  }


  interface ShaderPackScreen extends HudHideable, Screen {}
  class ShaderPackScreen extends HudHideable {
    static readonly TOP_LAYER_RENDER_QUEUE: Set;
    readonly blurTransition: SmoothedFloat;
    readonly listTransition: SmoothedFloat;
    readonly buttonTransition: SmoothedFloat;
    constructor(parent: Screen);
    applyChanges(): void;
    displayNotification(component: Component): void;
    get bottomRowOption(): Button;
    importPackOptions(settingFile: Path): void;
    isDisplayingComment(): boolean;
    keyPressed(key: number, j: number, k: number): boolean;
    mouseClicked(d: number, e: number, i: number): boolean;
    onClose(): void;
    onFilesDrop(paths: Path[]): void;
    onOptionMenuFilesDrop(paths: Path[]): void;
    onPackListFilesDrop(paths: Path[]): void;
    refreshForChangedPack(): void;
    refreshScreenSwitchButton(): void;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    setElementHoveredStatus(widget: AbstractElementWidget<any>, hovered: boolean): void;
    tick(): void;
  }

}

declare module 'net.irisshaders.iris.helpers' {
  import { ChainedJsonException } from 'net.minecraft.server';
  import { ShaderCompileException } from 'net.irisshaders.iris.gl.shader';
  import { Vector3d } from 'org.joml';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Enum } from 'java.lang';
  import { BooleanSupplier } from 'java.util.function';
  import { List } from 'java.util';

  class ColorSRGB {
    static linearToSrgb(r: number, g: number, b: number, a: number): number;
    static srgbToLinear(c: number): number;
  }


  class EntityState {
    static interposeItemId(newValue: number): void;
    static restoreItemId(): void;
  }


  interface FakeChainedJsonException extends ChainedJsonException {}
  class FakeChainedJsonException extends ChainedJsonException {
    constructor(e: ShaderCompileException);
    get trueException(): ShaderCompileException;
  }


  class JomlConversions {
    static fromVec3(vec: Vec3): Vector3d;
  }


  interface OptionalBoolean extends Enum<OptionalBoolean> {}
  class OptionalBoolean extends Enum<OptionalBoolean> {
    static readonly DEFAULT: OptionalBoolean;
    static readonly FALSE: OptionalBoolean;
    static readonly TRUE: OptionalBoolean;
    orElse(defaultValue: boolean): boolean;
    orElseGet(defaultValue: BooleanSupplier): boolean;
    static valueOf(name: string): OptionalBoolean;
    static values(): OptionalBoolean[];
  }


  class VertexBufferHelper {
    restoreBinding(): void;
    saveBinding(): void;
  }

}

declare module 'net.irisshaders.iris.layer' {
  import { RenderStateShard, MultiBufferSource, RenderType } from 'net.minecraft.client.renderer';
  import { Groupable, WrappableRenderType, BlendingStateHolder, TransparencyType } from 'net.irisshaders.batchedentityrendering.impl';
  import { Function } from 'java.util.function';
  import { VertexConsumer, MeshData } from 'com.mojang.blaze3d.vertex';
  import { WorldRenderingPhase } from 'net.irisshaders.iris.pipeline';
  import { Optional } from 'java.util';

  interface BlockEntityRenderStateShard extends RenderStateShard {}
  class BlockEntityRenderStateShard extends RenderStateShard {
    static readonly INSTANCE: BlockEntityRenderStateShard;
  }


  interface BufferSourceWrapper extends MultiBufferSource, Groupable {}
  class BufferSourceWrapper extends MultiBufferSource {
    constructor(bufferSource: MultiBufferSource, typeChanger: Function<RenderType, RenderType>);
    endGroup(): void;
    get original(): MultiBufferSource;
    getBuffer(renderType: RenderType): VertexConsumer;
    maybeStartGroup(): boolean;
    startGroup(): void;
  }


  interface EntityRenderStateShard extends RenderStateShard {}
  class EntityRenderStateShard extends RenderStateShard {
    static readonly INSTANCE: EntityRenderStateShard;
  }


  class GbufferPrograms {
    static beginBlockEntities(): void;
    static beginEntities(): void;
    static beginOutline(): void;
    static endBlockEntities(): void;
    static endEntities(): void;
    static endOutline(): void;
    static get currentPhase(): WorldRenderingPhase;
    static init(): void;
    static runFallbackEntityListener(): void;
    static runPhaseChangeNotifier(): void;
    static setOverridePhase(phase: WorldRenderingPhase): void;
  }


  interface InnerWrappedRenderType extends WrappableRenderType, BlendingStateHolder, RenderType {}
  class InnerWrappedRenderType extends WrappableRenderType {
    constructor(name: string, wrapped: RenderType, extra: RenderStateShard);
    clearRenderState(): void;
    draw(meshData: MeshData): void;
    equals(object: any): boolean;
    get transparencyType(): TransparencyType;
    hashCode(): number;
    isOutline(): boolean;
    outline(): Optional<RenderType>;
    set transparencyType(transparencyType: TransparencyType);
    setupRenderState(): void;
    toString(): string;
    unwrap(): RenderType;
    static wrapExactlyOnce(name: string, wrapped: RenderType, extra: RenderStateShard): InnerWrappedRenderType;
  }


  interface IsOutlineRenderStateShard extends RenderStateShard {}
  class IsOutlineRenderStateShard extends RenderStateShard {
    static readonly INSTANCE: IsOutlineRenderStateShard;
  }


  interface LightningRenderStateShard extends RenderStateShard {}
  class LightningRenderStateShard extends RenderStateShard {
    static readonly INSTANCE: LightningRenderStateShard;
    constructor();
  }


  interface OuterWrappedRenderType extends WrappableRenderType, BlendingStateHolder, RenderType {}
  class OuterWrappedRenderType extends WrappableRenderType {
    constructor(name: string, wrapped: RenderType, extra: RenderStateShard);
    clearRenderState(): void;
    draw(meshData: MeshData): void;
    equals(object: any): boolean;
    get transparencyType(): TransparencyType;
    hashCode(): number;
    isOutline(): boolean;
    outline(): Optional<RenderType>;
    set transparencyType(transparencyType: TransparencyType);
    setupRenderState(): void;
    toString(): string;
    unwrap(): RenderType;
    static wrapExactlyOnce(name: string, wrapped: RenderType, extra: RenderStateShard): OuterWrappedRenderType;
  }


  class WrappingMultiBufferSource {
    assertWrapStackEmpty(): void;
    popWrappingFunction(): void;
    pushWrappingFunction(var1: Function<RenderType, RenderType>): void;
  }

}

declare module 'net.irisshaders.iris.mixin.bettermipmaps' {
  class MixinMipmapGenerator {
  }


  class MixinTextureAtlasSprite {
  }

}

declare module 'net.irisshaders.iris.mixin' {
  import { OptionalLong, Set, List, SortedSet } from 'java.util';
  import { PostChain, RenderType, MultiBufferSource, RenderBuffers } from 'net.minecraft.client.renderer';
  import { PoseStack, VertexFormat } from 'com.mojang.blaze3d.vertex';
  import { Camera } from 'net.minecraft.client';
  import { BlendState, ColorMask, DepthState, TextureState } from 'GlStateManager';
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { ClassNode } from 'org.objectweb.asm.tree';
  import { EntityRenderDispatcher } from 'net.minecraft.client.renderer.entity';
  import { Matrix4f } from 'org.joml';
  import { Frustum } from 'net.minecraft.client.renderer.culling';
  import { Entity } from 'net.minecraft.world.entity';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { Long2ObjectMap } from 'it.unimi.dsi.fastutil.longs';
  import { BlockDestructionProgress } from 'net.minecraft.server.level';
  import { DynamicTexture } from 'net.minecraft.client.renderer.texture';
  import { ExtendedBiome, BiomeAmbienceInterface, LocalPlayerInterface, ShaderInstanceInterface } from 'net.irisshaders.iris.mixinterface';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { CallbackInfoReturnable, CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Float, CharSequence } from 'java.lang';
  import { BooleanStateExtended } from 'net.irisshaders.iris.gl';
  import { MojangBufferAccessor } from 'net.irisshaders.iris.vertices';
  import { IrisItemLightProvider } from 'net.irisshaders.iris.api.v0.item';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Blaze3dRenderTargetExt } from 'net.irisshaders.iris.targets';
  import { MethodHandle } from 'java.lang.invoke';
  import { ResourceProvider } from 'net.minecraft.server.packs.resources';
  import { Supplier } from 'java.util.function';
  import { TheEndPortalBlockEntity } from 'net.minecraft.world.level.block.entity';
  import { VertexBufferHelper } from 'net.irisshaders.iris.helpers';
  import { Type } from 'Program';

  class DimensionTypeAccessor {
    get ambientLight(): number;
    get fixedTime(): OptionalLong;
  }


  class GameRendererAccessor {
    get blurEffect(): PostChain;
    get panoramicMode(): boolean;
    get renderHand(): boolean;
    invokeBobHurt(var1: PoseStack, var2: number): void;
    invokeBobView(var1: PoseStack, var2: number): void;
    invokeGetFov(var1: Camera, var2: number, var3: boolean): number;
    shouldRenderBlockOutlineA(): boolean;
  }


  class GlStateManagerAccessor {
    static getActiveTexture(): number;
    static getBLEND(): BlendState;
    static getCOLOR_MASK(): ColorMask;
    static getDEPTH(): DepthState;
    static getTEXTURES(): TextureState[];
  }


  interface IrisMixinPlugin extends IMixinConfigPlugin {}
  class IrisMixinPlugin extends IMixinConfigPlugin {
    acceptTargets(myTargets: Set<string>, otherTargets: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    onLoad(mixinPackage: string): void;
    postApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    preApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    shouldApplyMixin(targetClassName: string, mixinClassName: string): boolean;
  }


  class LevelRendererAccessor {
    get destructionProgress(): Long2ObjectMap<SortedSet<BlockDestructionProgress>>;
    get entityRenderDispatcher(): EntityRenderDispatcher;
    get level(): ClientLevel;
    get renderBuffers(): RenderBuffers;
    invokeDoesMobEffectBlockSky(var1: Camera): boolean;
    invokeRenderEntity(var1: Entity, var2: number, var4: number, var6: number, var8: number, var9: PoseStack, var10: MultiBufferSource): void;
    invokeRenderSectionLayer(var1: RenderType, var2: number, var4: number, var6: number, var8: Matrix4f, var9: Matrix4f): void;
    invokeSetupRender(var1: Camera, var2: Frustum, var3: boolean, var4: boolean): void;
    set renderBuffers(var1: RenderBuffers);
    setShouldRegenerateClouds(var1: boolean): void;
    shouldRegenerateClouds(): boolean;
  }


  class LightTextureAccessor {
    get lightTexture(): DynamicTexture;
  }


  interface MixinBiome extends ExtendedBiome {}
  class MixinBiome extends ExtendedBiome {
    get biomeCategory(): number;
    get downfall(): number;
    set biomeCategory(biomeCategory: number);
  }


  interface MixinBiomeAmbientSoundsHandler extends BiomeAmbienceInterface {}
  class MixinBiomeAmbientSoundsHandler extends BiomeAmbienceInterface {
    get constantMood(): number;
  }


  class MixinBiomes {
  }


  class MixinBlockStateBehavior {
    get block(): Block;
    getShadeBrightness(pBlockBehaviour$BlockStateBase0: BlockGetter, pBlockPos1: BlockPos, cir: CallbackInfoReturnable<number>): void;
  }


  interface MixinBooleanState extends BooleanStateExtended {}
  class MixinBooleanState extends BooleanStateExtended {
    enabled: boolean;
    setUnknownState(): void;
  }


  interface MixinByteBufferBuilder extends MojangBufferAccessor {}
  class MixinByteBufferBuilder extends MojangBufferAccessor {
    get pointer(): number;
  }


  class MixinChainedJsonException {
  }


  class MixinChunkBorderRenderer {
  }


  class MixinClientLanguage {
  }


  class MixinClientPacketListener {
  }


  class MixinDebugScreenOverlay {
  }


  class MixinEntityRenderDispatcher {
  }


  class MixinFogRenderer {
  }


  class MixinGameRenderer {
  }


  class MixinGameRenderer_NightVisionCompat {
  }


  class MixinGlStateManager {
  }


  class MixinGlStateManager_BlendOverride {
  }


  class MixinGlStateManager_DepthColorOverride {
  }


  class MixinGlStateManager_FramebufferBinding {
  }


  interface MixinItem extends IrisItemLightProvider {}
  class MixinItem extends IrisItemLightProvider {
  }


  class MixinItemBlockRenderTypes {
  }


  class MixinItemInHandRenderer {
  }


  class MixinLevelRenderer {
  }


  class MixinLevelRenderer_SkipRendering {
  }


  class MixinLevelRenderer_Sky {
  }


  class MixinLightningBoltRenderer {
  }


  class MixinLightTexture {
  }


  interface MixinLocalPlayer extends LocalPlayerInterface {}
  class MixinLocalPlayer extends LocalPlayerInterface {
    get currentConstantMood(): number;
  }


  class MixinMaxFpsCrashFix {
  }


  class MixinMinecraft_Images {
  }


  class MixinMinecraft_Keybinds {
  }


  class MixinMinecraft_PipelineManagement {
    iris$trackLastDimensionOnLeave(arg: Screen, ci: CallbackInfo): void;
  }


  class MixinModelViewBobbing {
  }


  class MixinOptions_Entrypoint {
  }


  class MixinParticleEngine {
  }


  class MixinProgram {
  }


  class MixinProgramManager {
  }


  class MixinProgramType {
  }


  class MixinQuickPlayDev {
  }


  class MixinRenderSystem {
  }


  interface MixinRenderTarget extends Blaze3dRenderTargetExt {}
  class MixinRenderTarget extends Blaze3dRenderTargetExt {
    frameBufferId: number;
    iris$getColorBufferVersion(): number;
    iris$getDepthBufferVersion(): number;
  }


  class MixinRenderType {
  }


  class MixinScreenEffectRenderer {
  }


  interface MixinShaderInstance extends ShaderInstanceInterface {}
  class MixinShaderInstance extends ShaderInstanceInterface {
    get id(): number;
    iris$createExtraShaders(provider: ResourceProvider, name: string): void;
    iris$redirectBindAttributeLocation(i: number, j: number, charSequence: CharSequence): void;
    iris$setupGeometryShader(resourceProvider: ResourceProvider, string: string, vertexFormat: VertexFormat, ci: CallbackInfo): void;
    iris$shouldSkipThis(): boolean;
    setShouldSkip(s: MethodHandle): void;
  }


  class MixinSystemReport {
    setDetail(var1: string, var2: Supplier<string>): void;
  }


  class MixinTheEndPortalRenderer {
    iris$onRender(entity: TheEndPortalBlockEntity, tickDelta: number, poseStack: PoseStack, multiBufferSource: MultiBufferSource, light: number, overlay: number, ci: CallbackInfo): void;
  }


  interface MixinTitleScreen extends Screen {}
  class MixinTitleScreen extends Screen {
    iris$firstInit(ci: CallbackInfo): void;
  }


  class MixinTweakFarPlane {
    get depthFar(): number;
  }


  class MixinUniform {
  }


  interface MixinVertexBuffer extends VertexBufferHelper {}
  class MixinVertexBuffer extends VertexBufferHelper {
    bind(): void;
    restoreBinding(): void;
    saveBinding(): void;
  }


  class MixinWindow {
  }


  class ProgramTypeAccessor {
    static createProgramType(name: string, ordinal: number, typeName: string, extension: string, glId: number): Type;
  }

}

declare module 'net.irisshaders.iris.mixin.entity_render_context' {
  import { RenderLayer } from 'net.minecraft.client.renderer.entity.layers';
  import { RenderLayerParent } from 'net.minecraft.client.renderer.entity';

  class MixinBlockEntityRenderDispatcher {
  }


  class MixinCapeLayer {
  }


  interface MixinElytraLayer<T extends LivingEntity = any, M extends EntityModel<T> = any> extends RenderLayer<T, M> {}
  class MixinElytraLayer<T extends LivingEntity = any, M extends EntityModel<T> = any> extends RenderLayer<T, M> {
    constructor(pRenderLayer0: RenderLayerParent<T, M>);
  }


  class MixinEnderDragonRenderer {
  }


  class MixinEntityRenderDispatcher {
  }


  class MixinEntityRenderer<T extends Entity = any> {
  }


  class MixinHorseArmorLayer {
  }


  interface MixinHumanoidArmorLayer<T extends LivingEntity = any, M extends HumanoidModel<T> = any, A extends HumanoidModel<T> = any> extends RenderLayer<T, M> {}
  class MixinHumanoidArmorLayer<T extends LivingEntity = any, M extends HumanoidModel<T> = any, A extends HumanoidModel<T> = any> extends RenderLayer<T, M> {
    constructor(pRenderLayer0: RenderLayerParent<T, M>);
  }


  class MixinItemRenderer {
  }

}

declare module 'net.irisshaders.iris.mixin.fabulous' {
  class MixinDisableFabulousGraphics {
  }

}

declare module 'net.irisshaders.iris.mixin.fantastic' {
  import { SimpleAnimatedParticle, ParticleRenderType } from 'net.minecraft.client.particle';
  import { Frustum } from 'net.minecraft.client.renderer.culling';

  interface MixinFireworkSparkParticle extends SimpleAnimatedParticle {}
  class MixinFireworkSparkParticle extends SimpleAnimatedParticle {
    get renderType(): ParticleRenderType;
  }


  class MixinLevelRenderer {
    get frustum(): Frustum;
  }


  class MixinParticleEngine {
  }


  class MixinStationaryItemParticle {
  }


  class MixinTerrainParticle {
  }

}

declare module 'net.irisshaders.iris.mixin.forge' {
  import { ShaderInstanceInterface } from 'net.irisshaders.iris.mixinterface';
  import { ResourceProvider } from 'net.minecraft.server.packs.resources';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { VertexFormat } from 'com.mojang.blaze3d.vertex';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { ShaderInstance } from 'net.minecraft.client.renderer';

  class MixinGameClientEvents {
  }


  class MixinGooBlock {
  }


  class MixinHumanoidArmorLayer {
  }


  class MixinItemBlockRenderTypes {
  }


  class MixinRenderFlame {
  }


  class MixinRenderMekasuit {
  }


  class MixinRenderSPS {
  }


  interface MixinShaderInstance extends ShaderInstanceInterface {}
  class MixinShaderInstance extends ShaderInstanceInterface {
    iris$setupGeometryShader(resourceProvider: ResourceProvider, shaderLocation: ResourceLocation, p_173338_: VertexFormat, ci: CallbackInfo): void;
  }


  class MixinShadowRenderer {
  }


  class MixinVBOIE {
    static get vboShader(): ShaderInstance;
  }

}

declare module 'net.irisshaders.iris.mixin.gui' {
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { DeltaTracker } from 'net.minecraft.client';
  import { Operation } from 'com.llamalad7.mixinextras.injector.wrapoperation';
  import { Void } from 'java.lang';
  import { Screen } from 'net.minecraft.client.gui.screens';

  class MixinGui {
    iris$handleHudHidingScreens(guiGraphics: GuiGraphics, deltaTracker: DeltaTracker, original: Operation<Void>): void;
  }


  interface MixinVideoSettingsScreen extends Screen {}
  class MixinVideoSettingsScreen extends Screen {
  }

}

declare module 'net.irisshaders.iris.mixin.integrationtest' {
  import { Args } from 'org.spongepowered.asm.mixin.injection.invoke.arg';

  class MixinRenderTarget_StencilBufferTest {
    init(args: Args): void;
    init2(args: Args): void;
  }

}

declare module 'net.irisshaders.iris.mixin.rendertype' {
  import { TransparencyStateShard } from 'RenderStateShard';

  class RenderStateShardAccessor {
    get name(): string;
    static getTranslucentTransparency(): TransparencyStateShard;
  }


  class RenderTypeAccessor {
    shouldSortOnUpload(): boolean;
  }

}

declare module 'net.irisshaders.iris.mixin.shadows' {
  import { CullingDataCache } from 'net.irisshaders.iris.shadows';

  class MixinBeaconRenderer {
  }


  interface MixinLevelRenderer extends CullingDataCache {}
  class MixinLevelRenderer extends CullingDataCache {
    restoreState(): void;
    saveState(): void;
  }


  class MixinPreventRebuildNearInShadowPass {
  }

}

declare module 'net.irisshaders.iris.mixin.sky' {
  class MixinClientLevelData_DisableVoidPlane {
  }


  class MixinDimensionSpecialEffects {
  }


  class MixinLevelRenderer_SunMoonToggle {
  }


  class MixinOptions_CloudsOverride {
  }

}

declare module 'net.irisshaders.iris.mixin.statelisteners' {
  class BooleanStateAccessor {
    isEnabled(): boolean;
  }


  class MixinGlStateManager {
  }


  class MixinRenderSystem {
  }

}

declare module 'net.irisshaders.iris.mixin.state_tracking' {
  class MixinPostChain {
  }


  class MixinRenderTarget {
  }

}

declare module 'net.irisshaders.iris.mixin.texture' {
  import { SpriteContentsExtension } from 'net.irisshaders.iris.pbr';
  import { Ticker, AnimatedTexture, FrameInfo } from 'SpriteContents';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List, Map } from 'java.util';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';

  class AnimationMetadataSectionAccessor {
    get frameHeight(): number;
    get frameWidth(): number;
    set frameHeight(var1: number);
    set frameWidth(var1: number);
  }


  class MixinAbstractTexture {
  }


  class MixinGlStateManager {
  }


  class MixinResourceLocation {
  }


  interface MixinSpriteContents extends SpriteContentsExtension {}
  class MixinSpriteContents extends SpriteContentsExtension {
    get createdTicker(): Ticker;
  }


  class MixinTextureManager {
  }


  class SimpleTextureAccessor {
    get location(): ResourceLocation;
  }


  class SpriteContentsAccessor {
    get animatedTexture(): AnimatedTexture;
  }


  class SpriteContentsAnimatedTextureAccessor {
    get frames(): FrameInfo[];
    invokeUploadFrame(var1: number, var2: number, var3: number): void;
  }


  class SpriteContentsFrameInfoAccessor {
    get index(): number;
    get time(): number;
  }


  class SpriteContentsTickerAccessor {
    get animationInfo(): AnimatedTexture;
    get frame(): number;
    get subFrame(): number;
    set frame(var1: number);
    set subFrame(var1: number);
  }


  class TextureAtlasAccessor {
    callGetHeight(): number;
    callGetWidth(): number;
    get mipLevel(): number;
    get texturesByName(): Map<ResourceLocation, TextureAtlasSprite>;
  }

}

declare module 'net.irisshaders.iris.mixin.texture.pbr' {
  import { SpriteContentsExtension, PBRSpriteHolder, TextureAtlasExtension, PBRAtlasHolder } from 'net.irisshaders.iris.pbr.texture';
  import { AbstractTexture } from 'net.minecraft.client.renderer.texture';

  class MixinDirectoryLister {
  }


  interface MixinSpriteContents extends SpriteContentsExtension {}
  class MixinSpriteContents extends SpriteContentsExtension {
    get orCreatePBRHolder(): PBRSpriteHolder;
    get pBRHolder(): PBRSpriteHolder;
  }


  interface MixinTextureAtlas extends TextureAtlasExtension, AbstractTexture {}
  class MixinTextureAtlas extends TextureAtlasExtension {
    get orCreatePBRHolder(): PBRAtlasHolder;
    get pBRHolder(): PBRAtlasHolder;
  }

}

declare module 'net.irisshaders.iris.mixin.vertices.block_rendering' {
  import { VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { Pose } from 'PoseStack';
  import { BakedQuad } from 'net.minecraft.client.renderer.block.model';

  interface MixinBufferBuilder_SeparateAo extends VertexConsumer {}
  class MixinBufferBuilder_SeparateAo extends VertexConsumer {
    putBulkData(matrixEntry: Pose, quad: BakedQuad, brightnesses: number[], red: number, green: number, blue: number, alpha: number, lights: number[], overlay: number, useQuadColorData: boolean): void;
  }


  class MixinChunkRebuildTask {
  }


  class MixinClientLevel {
  }

}

declare module 'net.irisshaders.iris.mixin.vertices.immediate' {
  class MixinBufferSource {
  }


  class MixinLevelRenderer {
  }

}

declare module 'net.irisshaders.iris.mixin.vertices' {
  import { VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { BlockSensitiveBufferBuilder } from 'net.irisshaders.iris.vertices';

  interface MixinBufferBuilder extends VertexConsumer, BlockSensitiveBufferBuilder {}
  class MixinBufferBuilder extends VertexConsumer {
    beginBlock(block: number, renderType: number, blockEmission: number, localPosX: number, localPosY: number, localPosZ: number): void;
    endBlock(): void;
    setNormal(var1: number, var2: number, var3: number): VertexConsumer;
  }


  class MixinVertexFormat {
  }


  class MixinVertexFormatElement {
  }

}

declare module 'net.irisshaders.iris.mixinterface' {
  import { ResourceProvider } from 'net.minecraft.server.packs.resources';
  import { MethodHandle } from 'java.lang.invoke';

  class BiomeAmbienceInterface {
    get constantMood(): number;
  }


  class ExtendedBiome {
    get biomeCategory(): number;
    get downfall(): number;
    set biomeCategory(var1: number);
  }


  class LocalPlayerInterface {
    get currentConstantMood(): number;
  }


  class ShaderInstanceInterface {
    iris$createExtraShaders(var1: ResourceProvider, var2: string): void;
    setShouldSkip(var1: MethodHandle): void;
  }

}

declare module 'net.irisshaders.iris.parsing' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { TypedFunction, Type, FunctionContext, FunctionReturn, FunctionResolver, AbstractTypedFunction } from 'kroppeb.stareval.function';
  import { Parameter } from 'kroppeb.stareval.function.TypedFunction';
  import { Expression } from 'kroppeb.stareval.expression';
  import { JOMLVector, ArrayVector } from 'net.irisshaders.iris.parsing.VectorType';
  import { TriConsumer, QuadConsumer, ObjectObject2BooleanFunction } from 'net.irisshaders.iris.parsing.IrisFunctions';
  import { ParserOptions } from 'kroppeb.stareval.parser';
  import { ObjectType, Primitive } from 'kroppeb.stareval.function.Type';
  import { Supplier } from 'java.util.function';

  interface BiomeCategories extends Enum<BiomeCategories> {}
  class BiomeCategories extends Enum<BiomeCategories> {
    static readonly NONE: BiomeCategories;
    static readonly TAIGA: BiomeCategories;
    static readonly EXTREME_HILLS: BiomeCategories;
    static readonly JUNGLE: BiomeCategories;
    static readonly MESA: BiomeCategories;
    static readonly PLAINS: BiomeCategories;
    static readonly SAVANNA: BiomeCategories;
    static readonly ICY: BiomeCategories;
    static readonly THE_END: BiomeCategories;
    static readonly BEACH: BiomeCategories;
    static readonly FOREST: BiomeCategories;
    static readonly OCEAN: BiomeCategories;
    static readonly DESERT: BiomeCategories;
    static readonly RIVER: BiomeCategories;
    static readonly SWAMP: BiomeCategories;
    static readonly MUSHROOM: BiomeCategories;
    static readonly NETHER: BiomeCategories;
    static readonly MOUNTAIN: BiomeCategories;
    static readonly UNDERGROUND: BiomeCategories;
    static valueOf(name: string): BiomeCategories;
    static values(): BiomeCategories[];
  }


  interface BooleanVectorizedFunction extends TypedFunction {}
  class BooleanVectorizedFunction extends TypedFunction {
    constructor(inner: TypedFunction, size: number);
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    get parameters(): Parameter[];
    get returnType(): Type;
  }


  class IrisFunctions {
    static readonly functions: FunctionResolver;
    static add<T extends TypedFunction>(name: string, functionParameter: T): void;
    static addBinaryOpJOML<T>(name: string, type: JOMLVector<T>, functionParameter: TriConsumer<T, T, T>, params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    static addBinaryToBooleanOpJOML<T>(name: string, type: JOMLVector<T>, inverted: boolean, functionParameter: ObjectObject2BooleanFunction<T, T>, params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    static addTernaryOpJOML<T>(name: string, type: JOMLVector<T>, functionParameter: QuadConsumer<T, T, T, T>, params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    get parameters(): Parameter[];
    get returnType(): Type;
    static main(args: string[]): void;
  }


  class IrisOptions {
    static readonly options: ParserOptions;
  }


  interface MatrixType<T = any> extends ObjectType {}
  class MatrixType<T = any> extends ObjectType {
    static readonly MAT4: MatrixType;
    static MAT2: MatrixType;
    static MAT3: MatrixType;
    constructor(name: string, supplier: Supplier<T>);
    toString(): string;
  }


  class SmoothFloat {
    updateAndGet(value: number, halfLifeUp: number, halfLifeDown: number): number;
  }


  interface VectorConstructor extends AbstractTypedFunction {}
  class VectorConstructor extends AbstractTypedFunction {
    constructor(inner: Type, size: number);
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    get returnType(): ArrayVector;
  }


  interface VectorizedFunction extends TypedFunction {}
  class VectorizedFunction extends TypedFunction {
    constructor(inner: TypedFunction, size: number);
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    get parameters(): Parameter[];
    get returnType(): Type;
  }


  interface VectorType extends ObjectType {}
  class VectorType extends ObjectType {
    static readonly VEC2: JOMLVector;
    static readonly VEC3: JOMLVector;
    static readonly VEC4: JOMLVector;
    static readonly I_VEC2: JOMLVector;
    static readonly I_VEC3: JOMLVector;
    static readonly I_VEC4: JOMLVector;
    static readonly B_VEC2: VectorType;
    static readonly B_VEC3: VectorType;
    static readonly B_VEC4: VectorType;
    static readonly AllArrayVectorTypes: ArrayVector[];
    static readonly AllVectorTypes: VectorType[];
    static of(primitive: Primitive, size: number): VectorType;
  }

}

declare module 'net.irisshaders.iris.parsing.BooleanVectorizedFunction' {
  import { Expression, VariableExpression } from 'kroppeb.stareval.expression';
  import { FunctionContext, FunctionReturn } from 'kroppeb.stareval.function';
  import { Collection } from 'java.util';

  interface ElementAccessExpression extends Expression {}
  class ElementAccessExpression extends Expression {
    evaluateTo(context: FunctionContext, functionReturn: FunctionReturn): void;
    listVariables(variables: Collection<VariableExpression>): void;
  }

}

declare module 'net.irisshaders.iris.parsing.IrisFunctions' {
  class TriConsumer<T = any, U = any, V = any> {
    accept(var1: T, var2: U, var3: V): void;
  }


  class QuadConsumer<T = any, U = any, V = any, W = any> {
    accept(var1: T, var2: U, var3: V, var4: W): void;
  }


  class ObjectObject2BooleanFunction<T = any, U = any> {
    apply(var1: T, var2: U): boolean;
  }

}

declare module 'net.irisshaders.iris.parsing.VectorizedFunction' {
  import { Expression, VariableExpression } from 'kroppeb.stareval.expression';
  import { FunctionContext, FunctionReturn } from 'kroppeb.stareval.function';
  import { Collection } from 'java.util';

  interface ElementAccessExpression extends Expression {}
  class ElementAccessExpression extends Expression {
    evaluateTo(context: FunctionContext, functionReturn: FunctionReturn): void;
    listVariables(variables: Collection<VariableExpression>): void;
  }

}

declare module 'net.irisshaders.iris.parsing.VectorType' {
  import { VectorType } from 'net.irisshaders.iris.parsing';
  import { Supplier } from 'java.util.function';
  import { Type, FunctionReturn } from 'kroppeb.stareval.function';
  import { IntObjectObjectObjectConsumer } from 'net.irisshaders.iris.parsing.VectorType.ArrayVector';

  interface JOMLVector<T = any> extends VectorType {}
  class JOMLVector<T = any> extends VectorType {
    constructor(name: string, supplier: Supplier<T>);
    create(): T;
    toString(): string;
  }


  interface ArrayVector extends VectorType {}
  class ArrayVector extends VectorType {
    constructor(inner: Type, size: number);
    createObject(): any;
    equals(o: any): boolean;
    getValue(vector: any, index: number, functionReturn: FunctionReturn): void;
    hashCode(): number;
    map<T1, T2>(item1: T1, item2: T2, functionReturn: FunctionReturn, mapper: IntObjectObjectObjectConsumer<T1, T2, FunctionReturn>): void;
    setValue(vector: any, index: number, functionReturn: FunctionReturn): void;
    toString(): string;
  }

}

declare module 'net.irisshaders.iris.parsing.VectorType.ArrayVector' {
  class IntObjectObjectObjectConsumer<TB = any, TC = any, TD = any> {
    accept(var1: number, var2: TB, var3: TC, var4: TD): void;
  }

}

declare module 'net.irisshaders.iris.pathways' {
  import { IntSupplier, Function } from 'java.util.function';
  import { InternalTextureFormat } from 'net.irisshaders.iris.gl.texture';
  import { InteractionHand } from 'net.minecraft.world';
  import { Matrix4fc } from 'org.joml';
  import { Camera } from 'net.minecraft.client';
  import { GameRenderer, ShaderInstance, RenderType } from 'net.minecraft.client.renderer';
  import { WorldRenderingPipeline } from 'net.irisshaders.iris.pipeline';
  import { FullyBufferedMultiBufferSource } from 'net.irisshaders.batchedentityrendering.impl';
  import { VertexFormat } from 'com.mojang.blaze3d.vertex';
  import { Mode } from 'VertexFormat';
  import { Runnable } from 'java.lang';

  class CenterDepthSampler {
    constructor(depthSupplier: IntSupplier, halfLife: number);
    destroy(): void;
    get centerDepthTexture(): number;
    sampleCenterDepth(): void;
    setUsage(usage: boolean): void;
    setupColorTexture(texture: number, format: InternalTextureFormat): void;
  }


  class FullScreenQuadRenderer {
    static readonly INSTANCE: FullScreenQuadRenderer;
    begin(): void;
    end(): void;
    render(): void;
    renderQuad(): void;
  }


  class HandRenderer {
    static readonly INSTANCE: HandRenderer;
    static readonly DEPTH: number;
    get bufferSource(): FullyBufferedMultiBufferSource;
    isActive(): boolean;
    isAnyHandTranslucent(): boolean;
    isHandTranslucent(hand: InteractionHand): boolean;
    isRenderingSolid(): boolean;
    renderSolid(modelMatrix: Matrix4fc, tickDelta: number, camera: Camera, gameRenderer: GameRenderer, pipeline: WorldRenderingPipeline): void;
    renderTranslucent(modelMatrix: Matrix4fc, tickDelta: number, camera: Camera, gameRenderer: GameRenderer, pipeline: WorldRenderingPipeline): void;
  }


  class HorizonRenderer {
    constructor();
    destroy(): void;
    renderHorizon(modelView: Matrix4fc, projection: Matrix4fc, shader: ShaderInstance): void;
  }


  interface LightningHandler extends RenderType {}
  class LightningHandler extends RenderType {
    static readonly IRIS_LIGHTNING: RenderType;
    static readonly MEKANISM_FLAME: Function;
    static readonly MEKASUIT: RenderType;
    static readonly SPS: Function;
    constructor(pRenderType0: string, pVertexFormat1: VertexFormat, pVertexFormat$Mode2: Mode, pInt3: number, pBoolean4: boolean, pBoolean5: boolean, pRunnable6: Runnable, pRunnable7: Runnable);
  }

}

declare module 'net.irisshaders.iris.pathways.colorspace' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ColorSpace extends Enum<ColorSpace> {}
  class ColorSpace extends Enum<ColorSpace> {
    static readonly SRGB: ColorSpace;
    static readonly DCI_P3: ColorSpace;
    static readonly DISPLAY_P3: ColorSpace;
    static readonly REC2020: ColorSpace;
    static readonly ADOBE_RGB: ColorSpace;
    static valueOf(name: string): ColorSpace;
    static values(): ColorSpace[];
  }


  interface ColorSpaceComputeConverter extends ColorSpaceConverter {}
  class ColorSpaceComputeConverter extends ColorSpaceConverter {
    constructor(width: number, height: number, colorSpace: ColorSpace);
    process(targetImage: number): void;
    rebuildProgram(width: number, height: number, colorSpace: ColorSpace): void;
  }


  class ColorSpaceConverter {
    process(var1: number): void;
    rebuildProgram(var1: number, var2: number, var3: ColorSpace): void;
  }


  interface ColorSpaceFragmentConverter extends ColorSpaceConverter {}
  class ColorSpaceFragmentConverter extends ColorSpaceConverter {
    constructor(width: number, height: number, colorSpace: ColorSpace);
    process(targetImage: number): void;
    rebuildProgram(width: number, height: number, colorSpace: ColorSpace): void;
  }

}

declare module 'net.irisshaders.iris.pbr.format' {
  import { List } from 'java.util';
  import { PBRType } from 'net.irisshaders.iris.pbr.texture';
  import { AbstractTexture } from 'net.minecraft.client.renderer.texture';
  import { CustomMipmapGenerator } from 'net.irisshaders.iris.pbr.mipmap';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ResourceManager } from 'net.minecraft.server.packs.resources';
  import { Factory } from 'net.irisshaders.iris.pbr.format.TextureFormat';

  class TextureFormat {
    canInterpolateValues(var1: PBRType): boolean;
    get defines(): string[];
    getMipmapGenerator(var1: PBRType): CustomMipmapGenerator;
    setupTextureParameters(pbrType: PBRType, texture: AbstractTexture): void;
    version(): string;
  }


  class TextureFormatLoader {
    static readonly LOCATION: ResourceLocation;
    static get format(): TextureFormat;
    static reload(resourceManager: ResourceManager): void;
  }


  class TextureFormatRegistry {
    static readonly INSTANCE: TextureFormatRegistry;
    getFactory(name: string): Factory;
    register(name: string, factory: Factory): void;
  }

}

declare module 'net.irisshaders.iris.pbr.format.TextureFormat' {
  import { TextureFormat } from 'net.irisshaders.iris.pbr.format';

  class Factory {
    createFormat(var1: string, var2: string): TextureFormat;
  }

}

declare module 'net.irisshaders.iris.pbr.loader' {
  import { TextureAtlas, AbstractTexture, SimpleTexture } from 'net.minecraft.client.renderer.texture';
  import { ChannelMipmapGenerator } from 'net.irisshaders.iris.pbr.mipmap';
  import { ResourceManager } from 'net.minecraft.server.packs.resources';
  import { PBRTextureConsumer } from 'net.irisshaders.iris.pbr.loader.PBRTextureLoader';
  import { Class } from 'java.lang';

  interface AtlasPBRLoader extends PBRTextureLoader<TextureAtlas> {}
  class AtlasPBRLoader extends PBRTextureLoader<TextureAtlas> {
    static readonly LINEAR_MIPMAP_GENERATOR: ChannelMipmapGenerator;
    load(atlas: TextureAtlas, resourceManager: ResourceManager, pbrTextureConsumer: PBRTextureConsumer): void;
  }


  class PBRTextureLoader<T extends AbstractTexture = any> {
    load(var1: T, var2: ResourceManager, var3: PBRTextureConsumer): void;
  }


  class PBRTextureLoaderRegistry {
    static readonly INSTANCE: PBRTextureLoaderRegistry;
    getLoader<T extends AbstractTexture>(clazz: Class<T>): PBRTextureLoader<T>;
    register<T extends AbstractTexture>(clazz: Class<T>, loader: PBRTextureLoader<T>): void;
  }


  interface SimplePBRLoader extends PBRTextureLoader<SimpleTexture> {}
  class SimplePBRLoader extends PBRTextureLoader<SimpleTexture> {
    load(texture: SimpleTexture, resourceManager: ResourceManager, pbrTextureConsumer: PBRTextureConsumer): void;
  }

}

declare module 'net.irisshaders.iris.pbr.loader.AtlasPBRLoader' {
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';

  interface PBRTextureAtlasSprite extends TextureAtlasSprite {}
  class PBRTextureAtlasSprite extends TextureAtlasSprite {
    get baseSprite(): TextureAtlasSprite;
  }

}

declare module 'net.irisshaders.iris.pbr.loader.PBRTextureLoader' {
  import { AbstractTexture } from 'net.minecraft.client.renderer.texture';

  class PBRTextureConsumer {
    acceptNormalTexture(var1: AbstractTexture): void;
    acceptSpecularTexture(var1: AbstractTexture): void;
  }

}

declare module 'net.irisshaders.iris.pbr.mipmap' {
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { BlendFunction } from 'net.irisshaders.iris.pbr.mipmap.ChannelMipmapGenerator';
  import { IntUnaryOperator } from 'java.util.function';

  interface AbstractMipmapGenerator extends CustomMipmapGenerator {}
  class AbstractMipmapGenerator extends CustomMipmapGenerator {
    blend(var1: number, var2: number, var3: number, var4: number): number;
    generateMipLevels(image: NativeImage[], mipLevel: number): NativeImage[];
  }


  interface ChannelMipmapGenerator extends AbstractMipmapGenerator {}
  class ChannelMipmapGenerator extends AbstractMipmapGenerator {
    constructor(redFunc: BlendFunction, greenFunc: BlendFunction, blueFunc: BlendFunction, alphaFunc: BlendFunction);
    blend(c0: number, c1: number, c2: number, c3: number): number;
  }


  class CustomMipmapGenerator {
    generateMipLevels(var1: NativeImage[], var2: number): NativeImage[];
  }


  interface DiscreteBlendFunction extends BlendFunction {}
  class DiscreteBlendFunction extends BlendFunction {
    constructor(typeFunc: IntUnaryOperator);
    blend(v0: number, v1: number, v2: number, v3: number): number;
    static selectTargetType(t0: number, t1: number, t2: number, t3: number): number;
  }


  interface LinearBlendFunction extends BlendFunction {}
  class LinearBlendFunction extends BlendFunction {
    static readonly INSTANCE: LinearBlendFunction;
    blend(v0: number, v1: number, v2: number, v3: number): number;
  }

}

declare module 'net.irisshaders.iris.pbr.mipmap.ChannelMipmapGenerator' {
  class BlendFunction {
    blend(var1: number, var2: number, var3: number, var4: number): number;
  }

}

declare module 'net.irisshaders.iris.pbr.mipmap.CustomMipmapGenerator' {
  import { CustomMipmapGenerator } from 'net.irisshaders.iris.pbr.mipmap';

  class Provider {
    get mipmapGenerator(): CustomMipmapGenerator;
  }

}

declare module 'net.irisshaders.iris.pbr' {
  import { Ticker } from 'SpriteContents';
  import { TextureInfo } from 'net.irisshaders.iris.pbr.TextureInfoCache';
  import { IntBuffer } from 'java.nio';
  import { AbstractTexture } from 'net.minecraft.client.renderer.texture';

  class SpriteContentsExtension {
    get createdTicker(): Ticker;
  }


  class TextureInfoCache {
    static readonly INSTANCE: TextureInfoCache;
    getInfo(id: number): TextureInfo;
    onDeleteTexture(id: number): void;
    onTexImage2D(target: number, level: number, internalformat: number, width: number, height: number, border: number, format: number, type: number, pixels: IntBuffer): void;
  }


  class TextureTracker {
    static readonly INSTANCE: TextureTracker;
    getTexture(id: number): AbstractTexture;
    onDeleteTexture(id: number): void;
    onSetShaderTexture(unit: number, id: number): void;
    trackTexture(id: number, texture: AbstractTexture): void;
  }

}

declare module 'net.irisshaders.iris.pbr.texture' {
  import { AbstractTexture, TextureAtlas, Dumpable, TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { Ticker } from 'SpriteContents';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { PBRTextureAtlasSprite } from 'net.irisshaders.iris.pbr.loader.AtlasPBRLoader';
  import { ResourceManager } from 'net.minecraft.server.packs.resources';
  import { Path } from 'java.nio.file';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class PBRAtlasHolder {
    cycleAnimationFrames(): void;
    get normalAtlas(): PBRAtlasTexture;
    get specularAtlas(): PBRAtlasTexture;
    set normalAtlas(atlas: PBRAtlasTexture);
    set specularAtlas(atlas: PBRAtlasTexture);
  }


  interface PBRAtlasTexture extends PBRDumpable, AbstractTexture {}
  class PBRAtlasTexture extends PBRDumpable {
    constructor(atlasTexture: TextureAtlas, type: PBRType);
    addSprite(sprite: PBRTextureAtlasSprite): void;
    clear(): void;
    close(): void;
    cycleAnimationFrames(): void;
    dumpContents(id: ResourceLocation, path: Path): void;
    get atlasId(): ResourceLocation;
    get defaultDumpLocation(): ResourceLocation;
    get type(): PBRType;
    getSprite(id: ResourceLocation): PBRTextureAtlasSprite;
    load(manager: ResourceManager): void;
    static syncAnimation(source: Ticker, target: Ticker): void;
    tryUpload(atlasWidth: number, atlasHeight: number, mipLevel: number): boolean;
    upload(atlasWidth: number, atlasHeight: number, mipLevel: number): void;
  }


  interface PBRDumpable extends Dumpable {}
  class PBRDumpable extends Dumpable {
    get defaultDumpLocation(): ResourceLocation;
  }


  class PBRSpriteHolder {
    close(): void;
    get normalSprite(): TextureAtlasSprite;
    get specularSprite(): TextureAtlasSprite;
    set normalSprite(sprite: TextureAtlasSprite);
    set specularSprite(sprite: TextureAtlasSprite);
  }


  class PBRTextureHolder {
    normalTexture(): AbstractTexture;
    specularTexture(): AbstractTexture;
  }


  class PBRTextureManager {
    static readonly INSTANCE: PBRTextureManager;
    clear(): void;
    close(): void;
    dumpTextures(path: Path): void;
    getHolder(id: number): PBRTextureHolder;
    getOrLoadHolder(id: number): PBRTextureHolder;
    init(): void;
    static notifyPBRTexturesChanged(): void;
    onDeleteTexture(id: number): void;
  }


  interface PBRType extends Enum<PBRType> {}
  class PBRType extends Enum<PBRType> {
    static readonly NORMAL: PBRType;
    static readonly SPECULAR: PBRType;
    appendSuffix(path: string): string;
    static fromFileLocation(location: string): PBRType;
    get defaultValue(): number;
    get suffix(): string;
    static removeSuffix(path: string): string;
    static valueOf(name: string): PBRType;
    static values(): PBRType[];
  }


  class SpriteContentsExtension {
    get orCreatePBRHolder(): PBRSpriteHolder;
    get pBRHolder(): PBRSpriteHolder;
  }


  class TextureAtlasExtension {
    get orCreatePBRHolder(): PBRAtlasHolder;
    get pBRHolder(): PBRAtlasHolder;
  }

}

declare module 'net.irisshaders.iris.pbr.TextureInfoCache' {
  class TextureInfo {
    get height(): number;
    get id(): number;
    get internalFormat(): number;
    get width(): number;
  }

}

declare module 'net.irisshaders.iris.pbr.util' {
  import { NativeImage } from 'com.mojang.blaze3d.platform';

  class ImageManipulationUtil {
    static scaleBilinear(image: NativeImage, newWidth: number, newHeight: number): NativeImage;
    static scaleNearestNeighbor(image: NativeImage, newWidth: number, newHeight: number): NativeImage;
  }


  class TextureExporter {
    static exportTexture(directory: string, filename: string, textureId: number, level: number, width: number, height: number): void;
    static exportTextures(directory: string, filename: string, textureId: number, mipLevel: number, width: number, height: number): void;
  }


  class TextureManipulationUtil {
    static fillWithColor(textureId: number, maxLevel: number, rgba: number): void;
  }

}

declare module 'net.irisshaders.iris.pipeline' {
  import { Enum, Integer, Boolean } from 'java.lang';
  import { List, Set, EnumMap, OptionalInt, Optional } from 'java.util';
  import { PackDirectives, ParticleRenderingSettings, CloudSetting } from 'net.irisshaders.iris.shaderpack.properties';
  import { ProgramSource, ProgramSet } from 'net.irisshaders.iris.shaderpack.programs';
  import { RenderTargets, BufferFlipper } from 'net.irisshaders.iris.targets';
  import { ShaderStorageBufferHolder } from 'net.irisshaders.iris.gl.buffer';
  import { TextureAccess, TextureType } from 'net.irisshaders.iris.gl.texture';
  import { FrameUpdateNotifier } from 'net.irisshaders.iris.uniforms';
  import { CenterDepthSampler } from 'net.irisshaders.iris.pathways';
  import { Supplier, Function } from 'java.util.function';
  import { ShadowRenderTargets } from 'net.irisshaders.iris.shadows';
  import { TextureStage, CustomTextureData } from 'net.irisshaders.iris.shaderpack.texture';
  import { Object2ObjectMap } from 'it.unimi.dsi.fastutil.objects';
  import { GlImage, ImageHolder } from 'net.irisshaders.iris.gl.image';
  import { ImmutableMap, ImmutableSet } from 'com.google.common.collect';
  import { CustomUniforms } from 'net.irisshaders.iris.uniforms.custom';
  import { ColorSpace } from 'net.irisshaders.iris.pathways.colorspace';
  import { Tri } from 'net.irisshaders.iris.helpers';
  import { SamplerHolder } from 'net.irisshaders.iris.gl.sampler';
  import { LevelRendererAccessor } from 'net.irisshaders.iris.mixin';
  import { Camera } from 'net.minecraft.client';
  import { FeatureFlags } from 'net.irisshaders.iris.features';
  import { ShaderMap, SodiumPrograms } from 'net.irisshaders.iris.pipeline.programs';
  import { DHCompat } from 'net.irisshaders.iris.compat.dh';
  import { GlFramebuffer } from 'net.irisshaders.iris.gl.framebuffer';
  import { NamespacedId } from 'net.irisshaders.iris.shaderpack.materialmap';
  import { RenderType } from 'net.minecraft.client.renderer';

  interface CompositePass extends Enum<CompositePass> {}
  class CompositePass extends Enum<CompositePass> {
    static readonly BEGIN: CompositePass;
    static readonly PREPARE: CompositePass;
    static readonly DEFERRED: CompositePass;
    static readonly COMPOSITE: CompositePass;
    static valueOf(name: string): CompositePass;
    static values(): CompositePass[];
  }


  class CompositeRenderer {
    constructor(pipeline: WorldRenderingPipeline, compositePass: CompositePass, packDirectives: PackDirectives, sources: ProgramSource[], computes: ComputeSource[][], renderTargets: RenderTargets, holder: ShaderStorageBufferHolder, noiseTexture: TextureAccess, updateNotifier: FrameUpdateNotifier, centerDepthSampler: CenterDepthSampler, bufferFlipper: BufferFlipper, shadowTargetsSupplier: Supplier<ShadowRenderTargets>, textureStage: TextureStage, customTextureIds: Object2ObjectMap<string, TextureAccess>, irisCustomTextures: Object2ObjectMap<string, TextureAccess>, customImages: Set<GlImage>, explicitPreFlips: ImmutableMap<number, boolean>, customUniforms: CustomUniforms);
    destroy(): void;
    get flippedAtLeastOnceFinal(): ImmutableSet<number>;
    recalculateSizes(): void;
    renderAll(): void;
  }


  class CustomTextureManager {
    constructor(packDirectives: PackDirectives, customTextureDataMap: EnumMap<TextureStage, Object2ObjectMap<string, CustomTextureData>>, irisCustomTextureDataMap: Object2ObjectMap<string, CustomTextureData>, customNoiseTextureData: CustomTextureData);
    destroy(): void;
    get customTextureIdMap(): EnumMap<TextureStage, Object2ObjectMap<string, TextureAccess>>;
    get irisCustomTextures(): Object2ObjectMap<string, TextureAccess>;
    get noiseTexture(): TextureAccess;
    getCustomTextureIdMap(stage: TextureStage): Object2ObjectMap<string, TextureAccess>;
  }


  class FinalPassRenderer {
    constructor(pipeline: WorldRenderingPipeline, pack: ProgramSet, renderTargets: RenderTargets, noiseTexture: TextureAccess, holder: ShaderStorageBufferHolder, updateNotifier: FrameUpdateNotifier, flippedBuffers: ImmutableSet<number>, centerDepthSampler: CenterDepthSampler, shadowTargetsSupplier: Supplier<ShadowRenderTargets>, customTextureIds: Object2ObjectMap<string, TextureAccess>, irisCustomTextures: Object2ObjectMap<string, TextureAccess>, customImages: Set<GlImage>, flippedAtLeastOnce: ImmutableSet<number>, customUniforms: CustomUniforms);
    destroy(): void;
    recalculateSwapPassSize(): void;
    renderFinalPass(): void;
  }


  interface IrisRenderingPipeline extends WorldRenderingPipeline, ShaderRenderingPipeline {}
  class IrisRenderingPipeline extends WorldRenderingPipeline {
    isBeforeTranslucent: boolean;
    constructor(programSet: ProgramSet);
    addDebugText(messages: string[]): void;
    addGbufferOrShadowSamplers(samplers: SamplerHolder, images: ImageHolder, flipped: Supplier<ImmutableSet<number>>, isShadowPass: boolean, hasTexture: boolean, hasLightmap: boolean, hasOverlay: boolean): void;
    allowConcurrentCompute(): boolean;
    beginHand(): void;
    beginLevelRendering(): void;
    beginTranslucents(): void;
    bindDefault(): void;
    bindDefaultShadow(): void;
    createDHFramebuffer(sources: ProgramSource, trans: boolean): GlFramebuffer;
    createDHFramebufferShadow(sources: ProgramSource): GlFramebuffer;
    destroy(): void;
    finalizeGameRendering(): void;
    finalizeLevelRendering(): void;
    get cloudSetting(): CloudSetting;
    get currentNormalTexture(): number;
    get currentSpecularTexture(): number;
    get customUniforms(): CustomUniforms;
    get dHCloudSetting(): CloudSetting;
    get dHCompat(): DHCompat;
    get dHGenericShader(): Optional<ProgramSource>;
    get dHShadowShader(): Optional<ProgramSource>;
    get dHTerrainShader(): Optional<ProgramSource>;
    get dHWaterShader(): Optional<ProgramSource>;
    get flippedAfterPrepare(): ImmutableSet<number>;
    get flippedAfterTranslucent(): ImmutableSet<number>;
    get flippedBeforeShadow(): ImmutableSet<number>;
    get forcedShadowRenderDistanceChunksForDisplay(): OptionalInt;
    get frameUpdateNotifier(): FrameUpdateNotifier;
    get particleRenderingSettings(): ParticleRenderingSettings;
    get phase(): WorldRenderingPhase;
    get shaderMap(): ShaderMap;
    get sodiumPrograms(): SodiumPrograms;
    get sunPathRotation(): number;
    get textureMap(): Object2ObjectMap<Tri<string, TextureType, TextureStage>, string>;
    hasFeature(flag: FeatureFlags): boolean;
    hasShadowRenderTargets(): boolean;
    onSetShaderTexture(id: number): void;
    process(target: number): void;
    rebuildProgram(width: number, height: number, colorSpace: ColorSpace): void;
    removePhaseIfNeeded(): void;
    renderShadows(worldRenderer: LevelRendererAccessor, playerCamera: Camera): void;
    set phase(phase: WorldRenderingPhase);
    setIsMainBound(bound: boolean): void;
    setOverridePhase(phase: WorldRenderingPhase): void;
    shouldDisableDirectionalShading(): boolean;
    shouldDisableFrustumCulling(): boolean;
    shouldDisableOcclusionCulling(): boolean;
    shouldDisableVanillaEntityShadows(): boolean;
    shouldOverrideShaders(): boolean;
    shouldRenderMoon(): boolean;
    shouldRenderSkyDisc(): boolean;
    shouldRenderStars(): boolean;
    shouldRenderSun(): boolean;
    shouldRenderUnderwaterOverlay(): boolean;
    shouldRenderVignette(): boolean;
    shouldRenderWeather(): boolean;
    shouldRenderWeatherParticles(): boolean;
    shouldWriteRainAndSnowToDepthBuffer(): boolean;
    skipAllRendering(): boolean;
  }


  class PipelineManager {
    constructor(pipelineFactory: Function<NamespacedId, WorldRenderingPipeline>);
    destroyPipeline(): void;
    get pipeline(): Optional<WorldRenderingPipeline>;
    get pipelineNullable(): WorldRenderingPipeline;
    get versionCounterForSodiumShaderReload(): number;
    preparePipeline(currentDimension: NamespacedId): WorldRenderingPipeline;
  }


  interface ShaderRenderingPipeline extends WorldRenderingPipeline {}
  class ShaderRenderingPipeline extends WorldRenderingPipeline {
    get frameUpdateNotifier(): FrameUpdateNotifier;
    get shaderMap(): ShaderMap;
    shouldOverrideShaders(): boolean;
  }


  interface VanillaRenderingPipeline extends WorldRenderingPipeline {}
  class VanillaRenderingPipeline extends WorldRenderingPipeline {
    constructor();
    addDebugText(messages: string[]): void;
    allowConcurrentCompute(): boolean;
    beginHand(): void;
    beginLevelRendering(): void;
    beginTranslucents(): void;
    destroy(): void;
    finalizeGameRendering(): void;
    finalizeLevelRendering(): void;
    get cloudSetting(): CloudSetting;
    get currentNormalTexture(): number;
    get currentSpecularTexture(): number;
    get dHCompat(): DHCompat;
    get forcedShadowRenderDistanceChunksForDisplay(): OptionalInt;
    get frameUpdateNotifier(): FrameUpdateNotifier;
    get particleRenderingSettings(): ParticleRenderingSettings;
    get phase(): WorldRenderingPhase;
    get sodiumPrograms(): SodiumPrograms;
    get sunPathRotation(): number;
    get textureMap(): Object2ObjectMap<Tri<string, TextureType, TextureStage>, string>;
    hasFeature(flags: FeatureFlags): boolean;
    onSetShaderTexture(id: number): void;
    renderShadows(worldRenderer: LevelRendererAccessor, camera: Camera): void;
    set phase(phase: WorldRenderingPhase);
    setIsMainBound(mainBound: boolean): void;
    setOverridePhase(phase: WorldRenderingPhase): void;
    shouldDisableDirectionalShading(): boolean;
    shouldDisableFrustumCulling(): boolean;
    shouldDisableOcclusionCulling(): boolean;
    shouldDisableVanillaEntityShadows(): boolean;
    shouldRenderMoon(): boolean;
    shouldRenderSkyDisc(): boolean;
    shouldRenderStars(): boolean;
    shouldRenderSun(): boolean;
    shouldRenderUnderwaterOverlay(): boolean;
    shouldRenderVignette(): boolean;
    shouldRenderWeather(): boolean;
    shouldRenderWeatherParticles(): boolean;
    shouldWriteRainAndSnowToDepthBuffer(): boolean;
  }


  interface WorldRenderingPhase extends Enum<WorldRenderingPhase> {}
  class WorldRenderingPhase extends Enum<WorldRenderingPhase> {
    static readonly NONE: WorldRenderingPhase;
    static readonly SKY: WorldRenderingPhase;
    static readonly SUNSET: WorldRenderingPhase;
    static readonly CUSTOM_SKY: WorldRenderingPhase;
    static readonly SUN: WorldRenderingPhase;
    static readonly MOON: WorldRenderingPhase;
    static readonly STARS: WorldRenderingPhase;
    static readonly VOID: WorldRenderingPhase;
    static readonly TERRAIN_SOLID: WorldRenderingPhase;
    static readonly TERRAIN_CUTOUT_MIPPED: WorldRenderingPhase;
    static readonly TERRAIN_CUTOUT: WorldRenderingPhase;
    static readonly ENTITIES: WorldRenderingPhase;
    static readonly BLOCK_ENTITIES: WorldRenderingPhase;
    static readonly DESTROY: WorldRenderingPhase;
    static readonly OUTLINE: WorldRenderingPhase;
    static readonly DEBUG: WorldRenderingPhase;
    static readonly HAND_SOLID: WorldRenderingPhase;
    static readonly TERRAIN_TRANSLUCENT: WorldRenderingPhase;
    static readonly TRIPWIRE: WorldRenderingPhase;
    static readonly PARTICLES: WorldRenderingPhase;
    static readonly CLOUDS: WorldRenderingPhase;
    static readonly RAIN_SNOW: WorldRenderingPhase;
    static readonly WORLD_BORDER: WorldRenderingPhase;
    static readonly HAND_TRANSLUCENT: WorldRenderingPhase;
    static fromTerrainRenderType(renderType: RenderType): WorldRenderingPhase;
    static valueOf(name: string): WorldRenderingPhase;
    static values(): WorldRenderingPhase[];
  }


  class WorldRenderingPipeline {
    addDebugText(var1: string[]): void;
    allowConcurrentCompute(): boolean;
    beginHand(): void;
    beginLevelRendering(): void;
    beginTranslucents(): void;
    destroy(): void;
    finalizeGameRendering(): void;
    finalizeLevelRendering(): void;
    get cloudSetting(): CloudSetting;
    get currentNormalTexture(): number;
    get currentSpecularTexture(): number;
    get dHCompat(): DHCompat;
    get forcedShadowRenderDistanceChunksForDisplay(): OptionalInt;
    get frameUpdateNotifier(): FrameUpdateNotifier;
    get particleRenderingSettings(): ParticleRenderingSettings;
    get phase(): WorldRenderingPhase;
    get sodiumPrograms(): SodiumPrograms;
    get sunPathRotation(): number;
    get textureMap(): Object2ObjectMap<Tri<string, TextureType, TextureStage>, string>;
    hasFeature(var1: FeatureFlags): boolean;
    onSetShaderTexture(var1: number): void;
    renderShadows(var1: LevelRendererAccessor, var2: Camera): void;
    set phase(var1: WorldRenderingPhase);
    setIsMainBound(var1: boolean): void;
    setOverridePhase(var1: WorldRenderingPhase): void;
    shouldDisableDirectionalShading(): boolean;
    shouldDisableFrustumCulling(): boolean;
    shouldDisableOcclusionCulling(): boolean;
    shouldDisableVanillaEntityShadows(): boolean;
    shouldRenderMoon(): boolean;
    shouldRenderSkyDisc(): boolean;
    shouldRenderStars(): boolean;
    shouldRenderSun(): boolean;
    shouldRenderUnderwaterOverlay(): boolean;
    shouldRenderVignette(): boolean;
    shouldRenderWeather(): boolean;
    shouldRenderWeatherParticles(): boolean;
    shouldWriteRainAndSnowToDepthBuffer(): boolean;
  }

}

declare module 'net.irisshaders.iris.pipeline.fallback' {
  import { ShaderAttributeInputs, FogMode } from 'net.irisshaders.iris.gl.state';
  import { AlphaTest } from 'net.irisshaders.iris.gl.blending';

  class ShaderSynthesizer {
    static fsh(inputs: ShaderAttributeInputs, fogMode: FogMode, alphaTest: AlphaTest, intensityTex: boolean, isLeash: boolean): string;
    static vsh(hasChunkOffset: boolean, inputs: ShaderAttributeInputs, fogMode: FogMode, entityLighting: boolean, isLeash: boolean): string;
  }

}

declare module 'net.irisshaders.iris.pipeline.programs' {
  import { ShaderInstance } from 'net.minecraft.client.renderer';
  import { ShaderInstanceInterface } from 'net.irisshaders.iris.mixinterface';
  import { ResourceProvider } from 'net.minecraft.server.packs.resources';
  import { VertexFormat } from 'com.mojang.blaze3d.vertex';
  import { GlFramebuffer } from 'net.irisshaders.iris.gl.framebuffer';
  import { BlendModeOverride, AlphaTest, BufferBlendOverride } from 'net.irisshaders.iris.gl.blending';
  import { Consumer, BiConsumer, Supplier, Function } from 'java.util.function';
  import { DynamicLocationalUniformHolder } from 'net.irisshaders.iris.gl.uniform';
  import { SamplerHolder } from 'net.irisshaders.iris.gl.sampler';
  import { ImageHolder } from 'net.irisshaders.iris.gl.image';
  import { IrisRenderingPipeline, WorldRenderingPipeline } from 'net.irisshaders.iris.pipeline';
  import { List } from 'java.util';
  import { CustomUniforms } from 'net.irisshaders.iris.uniforms.custom';
  import { Uniform, Program } from 'com.mojang.blaze3d.shaders';
  import { MethodHandle } from 'java.lang.invoke';
  import { GlUniform } from 'net.caffeinemc.mods.sodium.client.gl.shader.uniform';
  import { Matrix3fc, Matrix4fc } from 'org.joml';
  import { ProgramSource, ProgramSet, ProgramFallbackResolver } from 'net.irisshaders.iris.shaderpack.programs';
  import { ProgramId } from 'net.irisshaders.iris.shaderpack.loading';
  import { ShaderAttributeInputs, FogMode } from 'net.irisshaders.iris.gl.state';
  import { FrameUpdateNotifier } from 'net.irisshaders.iris.uniforms';
  import { ImmutableSet } from 'com.google.common.collect';
  import { Integer, Enum } from 'java.lang';
  import { RenderTargets } from 'net.irisshaders.iris.targets';
  import { ShadowRenderTargets } from 'net.irisshaders.iris.shadows';
  import { GlProgram } from 'net.caffeinemc.mods.sodium.client.gl.shader';
  import { ChunkShaderInterface, ShaderBindingContext } from 'net.caffeinemc.mods.sodium.client.render.chunk.shader';
  import { TerrainRenderPass } from 'net.caffeinemc.mods.sodium.client.render.chunk.terrain';
  import { Pass } from 'net.irisshaders.iris.pipeline.programs.SodiumPrograms';

  interface ExtendedShader extends ShaderInstanceInterface, ShaderInstance {}
  class ExtendedShader extends ShaderInstanceInterface {
    constructor(resourceFactory: ResourceProvider, name: string, vertexFormat: VertexFormat, usesTessellation: boolean, writingToBeforeTranslucent: GlFramebuffer, writingToAfterTranslucent: GlFramebuffer, blendModeOverride: BlendModeOverride, alphaTest: AlphaTest, uniformCreator: Consumer<DynamicLocationalUniformHolder>, samplerCreator: BiConsumer<SamplerHolder, ImageHolder>, isIntensity: boolean, parent: IrisRenderingPipeline, bufferBlendOverrides: BufferBlendOverride[], customUniforms: CustomUniforms);
    apply(): void;
    applyImport(bl: boolean, string: string): string;
    attachToProgram(): void;
    clear(): void;
    get geometry(): Program;
    get tessControl(): Program;
    get tessEval(): Program;
    getUniform(name: string): Uniform;
    hasActiveImages(): boolean;
    iris$createExtraShaders(factory: ResourceProvider, name: string): void;
    setShouldSkip(s: MethodHandle): void;
  }


  interface FallbackShader extends ShaderInstance {}
  class FallbackShader extends ShaderInstance {
    constructor(resourceFactory: ResourceProvider, string: string, vertexFormat: VertexFormat, writingToBeforeTranslucent: GlFramebuffer, writingToAfterTranslucent: GlFramebuffer, blendModeOverride: BlendModeOverride, alphaValue: number, parent: IrisRenderingPipeline);
    apply(): void;
    clear(): void;
  }


  interface GlUniformMatrix3f extends GlUniform<Matrix3fc> {}
  class GlUniformMatrix3f extends GlUniform<Matrix3fc> {
    constructor(index: number);
    set(value: Matrix3fc): void;
  }


  class ShaderAccess {
    static readonly IE_FORMAT: VertexFormat;
    static get iEVBOShader(): ShaderInstance;
    static get mekanismFlameShader(): ShaderInstance;
    static get mekasuitShader(): ShaderInstance;
    static get particleTranslucentShader(): ShaderInstance;
    static get sPSShader(): ShaderInstance;
  }


  class ShaderCreator {
    static create(pipeline: WorldRenderingPipeline, name: string, source: ProgramSource, programId: ProgramId, writingToBeforeTranslucent: GlFramebuffer, writingToAfterTranslucent: GlFramebuffer, fallbackAlpha: AlphaTest, vertexFormat: VertexFormat, inputs: ShaderAttributeInputs, updateNotifier: FrameUpdateNotifier, parent: IrisRenderingPipeline, flipped: Supplier<ImmutableSet<number>>, fogMode: FogMode, isIntensity: boolean, isFullbright: boolean, isShadowPass: boolean, isLines: boolean, customUniforms: CustomUniforms): ExtendedShader;
    static createFallback(name: string, writingToBeforeTranslucent: GlFramebuffer, writingToAfterTranslucent: GlFramebuffer, alpha: AlphaTest, vertexFormat: VertexFormat, blendModeOverride: BlendModeOverride, parent: IrisRenderingPipeline, fogMode: FogMode, entityLighting: boolean, isGlint: boolean, isText: boolean, intensityTex: boolean, isFullbright: boolean): FallbackShader;
  }


  interface ShaderKey extends Enum<ShaderKey> {}
  class ShaderKey extends Enum<ShaderKey> {
    static readonly BASIC: ShaderKey;
    static readonly BASIC_COLOR: ShaderKey;
    static readonly TEXTURED: ShaderKey;
    static readonly TEXTURED_COLOR: ShaderKey;
    static readonly SPS: ShaderKey;
    static readonly SKY_BASIC: ShaderKey;
    static readonly SKY_BASIC_COLOR: ShaderKey;
    static readonly SKY_TEXTURED: ShaderKey;
    static readonly SKY_TEXTURED_COLOR: ShaderKey;
    static readonly CLOUDS: ShaderKey;
    static readonly CLOUDS_SODIUM: ShaderKey;
    static readonly TERRAIN_SOLID: ShaderKey;
    static readonly TERRAIN_CUTOUT: ShaderKey;
    static readonly TERRAIN_TRANSLUCENT: ShaderKey;
    static readonly MOVING_BLOCK: ShaderKey;
    static readonly ENTITIES_ALPHA: ShaderKey;
    static readonly ENTITIES_SOLID: ShaderKey;
    static readonly ENTITIES_SOLID_DIFFUSE: ShaderKey;
    static readonly ENTITIES_SOLID_BRIGHT: ShaderKey;
    static readonly ENTITIES_CUTOUT: ShaderKey;
    static readonly ENTITIES_CUTOUT_DIFFUSE: ShaderKey;
    static readonly ENTITIES_TRANSLUCENT: ShaderKey;
    static readonly ENTITIES_EYES: ShaderKey;
    static readonly ENTITIES_EYES_TRANS: ShaderKey;
    static readonly HAND_CUTOUT: ShaderKey;
    static readonly HAND_CUTOUT_BRIGHT: ShaderKey;
    static readonly HAND_CUTOUT_DIFFUSE: ShaderKey;
    static readonly HAND_TEXT: ShaderKey;
    static readonly HAND_TEXT_INTENSITY: ShaderKey;
    static readonly HAND_TRANSLUCENT: ShaderKey;
    static readonly HAND_WATER_BRIGHT: ShaderKey;
    static readonly HAND_WATER_DIFFUSE: ShaderKey;
    static readonly LIGHTNING: ShaderKey;
    static readonly LEASH: ShaderKey;
    static readonly TEXT_BG: ShaderKey;
    static readonly PARTICLES: ShaderKey;
    static readonly PARTICLES_TRANS: ShaderKey;
    static readonly WEATHER: ShaderKey;
    static readonly CRUMBLING: ShaderKey;
    static readonly TEXT: ShaderKey;
    static readonly TEXT_INTENSITY: ShaderKey;
    static readonly TEXT_BE: ShaderKey;
    static readonly TEXT_INTENSITY_BE: ShaderKey;
    static readonly BLOCK_ENTITY: ShaderKey;
    static readonly BLOCK_ENTITY_BRIGHT: ShaderKey;
    static readonly BLOCK_ENTITY_DIFFUSE: ShaderKey;
    static readonly BE_TRANSLUCENT: ShaderKey;
    static readonly BEACON: ShaderKey;
    static readonly GLINT: ShaderKey;
    static readonly LINES: ShaderKey;
    static readonly IE_COMPAT: ShaderKey;
    static readonly MEKANISM_FLAME: ShaderKey;
    static readonly SHADOW_TERRAIN_CUTOUT: ShaderKey;
    static readonly SHADOW_TRANSLUCENT: ShaderKey;
    static readonly SHADOW_ENTITIES_CUTOUT: ShaderKey;
    static readonly SHADOW_BLOCK: ShaderKey;
    static readonly SHADOW_BEACON_BEAM: ShaderKey;
    static readonly SHADOW_BASIC: ShaderKey;
    static readonly SHADOW_BASIC_COLOR: ShaderKey;
    static readonly SHADOW_TEX: ShaderKey;
    static readonly SHADOW_TEX_COLOR: ShaderKey;
    static readonly SHADOW_CLOUDS: ShaderKey;
    static readonly SHADOW_LINES: ShaderKey;
    static readonly SHADOW_LEASH: ShaderKey;
    static readonly SHADOW_LIGHTNING: ShaderKey;
    static readonly SHADOW_PARTICLES: ShaderKey;
    static readonly SHADOW_TEXT: ShaderKey;
    static readonly SHADOW_TEXT_BG: ShaderKey;
    static readonly SHADOW_TEXT_INTENSITY: ShaderKey;
    static readonly IE_COMPAT_SHADOW: ShaderKey;
    static readonly MEKANISM_FLAME_SHADOW: ShaderKey;
    get alphaTest(): AlphaTest;
    get fogMode(): FogMode;
    get name(): string;
    get program(): ProgramId;
    get vertexFormat(): VertexFormat;
    hasDiffuseLighting(): boolean;
    isGlint(): boolean;
    isIntensity(): boolean;
    isShadow(): boolean;
    isText(): boolean;
    shouldIgnoreLightmap(): boolean;
    static valueOf(name: string): ShaderKey;
    static values(): ShaderKey[];
  }


  class ShaderMap {
    constructor(factory: Function<ShaderKey, ShaderInstance>);
    getShader(id: ShaderKey): ShaderInstance;
  }


  class SodiumPrograms {
    constructor(pipeline: IrisRenderingPipeline, programSet: ProgramSet, resolver: ProgramFallbackResolver, renderTargets: RenderTargets, shadowRenderTargets: Supplier<ShadowRenderTargets>, customUniforms: CustomUniforms);
    getFramebuffer(pass: TerrainRenderPass): GlFramebuffer;
    getProgram(pass: TerrainRenderPass): GlProgram<ChunkShaderInterface>;
  }


  interface SodiumShader extends ChunkShaderInterface {}
  class SodiumShader extends ChunkShaderInterface {
    constructor(pipeline: IrisRenderingPipeline, pass: Pass, context: ShaderBindingContext, handle: number, blendModeOverride: BlendModeOverride, bufferBlendOverrides: BufferBlendOverride[], customUniforms: CustomUniforms, flipState: Supplier<ImmutableSet<number>>, alphaTest: number, containsTessellation: boolean);
    resetState(): void;
    setModelViewMatrix(matrix: Matrix4fc): void;
    setProjectionMatrix(matrix: Matrix4fc): void;
    setRegionOffset(x: number, y: number, z: number): void;
    setupState(): void;
  }

}

declare module 'net.irisshaders.iris.pipeline.programs.ShaderKey' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface LightingModel extends Enum<LightingModel> {}
  class LightingModel extends Enum<LightingModel> {
    static readonly FULLBRIGHT: LightingModel;
    static readonly LIGHTMAP: LightingModel;
    static readonly DIFFUSE: LightingModel;
    static readonly DIFFUSE_LM: LightingModel;
    static valueOf(name: string): LightingModel;
    static values(): LightingModel[];
  }

}

declare module 'net.irisshaders.iris.pipeline.programs.SodiumPrograms' {
  import { Enum } from 'java.lang';
  import { ProgramId } from 'net.irisshaders.iris.shaderpack.loading';
  import { List } from 'java.util';

  interface Pass extends Enum<Pass> {}
  class Pass extends Enum<Pass> {
    static readonly SHADOW: Pass;
    static readonly SHADOW_CUTOUT: Pass;
    static readonly SHADOW_TRANS: Pass;
    static readonly TERRAIN: Pass;
    static readonly TERRAIN_CUTOUT: Pass;
    static readonly TRANSLUCENT: Pass;
    get originalId(): ProgramId;
    static valueOf(name: string): Pass;
    static values(): Pass[];
  }

}

declare module 'net.irisshaders.iris.pipeline.transform.parameter' {
  import { Patch, PatchShaderType } from 'net.irisshaders.iris.pipeline.transform';
  import { TextureStage } from 'net.irisshaders.iris.shaderpack.texture';
  import { Object2ObjectMap } from 'it.unimi.dsi.fastutil.objects';
  import { Tri } from 'net.irisshaders.iris.helpers';
  import { TextureType } from 'net.irisshaders.iris.gl.texture';
  import { JobParameters } from 'io.github.douira.glsl_transformer.ast.transform';
  import { AlphaTest } from 'net.irisshaders.iris.gl.blending';
  import { ShaderAttributeInputs } from 'net.irisshaders.iris.gl.state';

  interface ComputeParameters extends TextureStageParameters {}
  class ComputeParameters extends TextureStageParameters {
    constructor(patch: Patch, stage: TextureStage, textureMap: Object2ObjectMap<Tri<string, TextureType, TextureStage>, string>);
  }


  interface DHParameters extends Parameters {}
  class DHParameters extends Parameters {
    constructor(patch: Patch, textureMap: Object2ObjectMap<Tri<string, TextureType, TextureStage>, string>);
    get textureStage(): TextureStage;
  }


  interface GeometryInfoParameters extends Parameters {}
  class GeometryInfoParameters extends Parameters {
    readonly hasGeometry: boolean;
    readonly hasTesselation: boolean;
    constructor(patch: Patch, textureMap: Object2ObjectMap<Tri<string, TextureType, TextureStage>, string>, hasGeometry: boolean, hasTesselation: boolean);
    equals(obj: any): boolean;
    hashCode(): number;
  }


  interface Parameters extends JobParameters {}
  class Parameters extends JobParameters {
    readonly patch: Patch;
    type: PatchShaderType;
    name: string;
    constructor(patch: Patch, textureMap: Object2ObjectMap<Tri<string, TextureType, TextureStage>, string>);
    equals(obj: any): boolean;
    get alphaTest(): AlphaTest;
    get textureMap(): Object2ObjectMap<Tri<string, TextureType, TextureStage>, string>;
    get textureStage(): TextureStage;
    hashCode(): number;
  }


  interface SodiumParameters extends Parameters {}
  class SodiumParameters extends Parameters {
    readonly alpha: AlphaTest;
    constructor(patch: Patch, textureMap: Object2ObjectMap<Tri<string, TextureType, TextureStage>, string>, alpha: AlphaTest);
    equals(obj: any): boolean;
    get alphaTest(): AlphaTest;
    get textureStage(): TextureStage;
    hashCode(): number;
  }


  interface TextureStageParameters extends Parameters {}
  class TextureStageParameters extends Parameters {
    constructor(patch: Patch, stage: TextureStage, textureMap: Object2ObjectMap<Tri<string, TextureType, TextureStage>, string>);
    equals(obj: any): boolean;
    get textureStage(): TextureStage;
    hashCode(): number;
  }


  interface VanillaParameters extends GeometryInfoParameters {}
  class VanillaParameters extends GeometryInfoParameters {
    readonly alpha: AlphaTest;
    readonly inputs: ShaderAttributeInputs;
    readonly hasChunkOffset: boolean;
    constructor(patch: Patch, textureMap: Object2ObjectMap<Tri<string, TextureType, TextureStage>, string>, alpha: AlphaTest, isLines: boolean, hasChunkOffset: boolean, inputs: ShaderAttributeInputs, hasGeometry: boolean, hasTesselation: boolean);
    equals(obj: any): boolean;
    get alphaTest(): AlphaTest;
    get textureStage(): TextureStage;
    hashCode(): number;
    isLines(): boolean;
  }

}

declare module 'net.irisshaders.iris.pipeline.transform' {
  import { Enum } from 'java.lang';
  import { List, Map } from 'java.util';
  import { ShaderType } from 'net.irisshaders.iris.gl.shader';
  import { ProgramPrintBuilder } from 'net.irisshaders.iris.pipeline.transform.ShaderPrinter';
  import { AlphaTest } from 'net.irisshaders.iris.gl.blending';
  import { ShaderAttributeInputs } from 'net.irisshaders.iris.gl.state';
  import { Object2ObjectMap } from 'it.unimi.dsi.fastutil.objects';
  import { Tri } from 'net.irisshaders.iris.helpers';
  import { TextureType } from 'net.irisshaders.iris.gl.texture';
  import { TextureStage } from 'net.irisshaders.iris.shaderpack.texture';
  import { TranslationUnit } from 'io.github.douira.glsl_transformer.ast.node';
  import { Root } from 'io.github.douira.glsl_transformer.ast.query';

  interface Patch extends Enum<Patch> {}
  class Patch extends Enum<Patch> {
    static readonly VANILLA: Patch;
    static readonly DH_TERRAIN: Patch;
    static readonly DH_GENERIC: Patch;
    static readonly SODIUM: Patch;
    static readonly COMPOSITE: Patch;
    static readonly COMPUTE: Patch;
    static valueOf(name: string): Patch;
    static values(): Patch[];
  }


  interface PatchShaderType extends Enum<PatchShaderType> {}
  class PatchShaderType extends Enum<PatchShaderType> {
    static readonly VERTEX: PatchShaderType;
    static readonly GEOMETRY: PatchShaderType;
    static readonly TESS_CONTROL: PatchShaderType;
    static readonly TESS_EVAL: PatchShaderType;
    static readonly FRAGMENT: PatchShaderType;
    static readonly COMPUTE: PatchShaderType;
    static fromGlShaderType(glShaderType: ShaderType): PatchShaderType[];
    static valueOf(name: string): PatchShaderType;
    static values(): PatchShaderType[];
  }


  class ShaderPrinter {
    static deleteIfClearing(): void;
    static printProgram(name: string): ProgramPrintBuilder;
    static resetPrintState(): void;
  }


  class TransformPatcher {
    parseTranslationUnit(rootInstance: Root, input: string): TranslationUnit;
    static patchComposite(name: string, vertex: string, geometry: string, fragment: string, stage: TextureStage, textureMap: Object2ObjectMap<Tri<string, TextureType, TextureStage>, string>): Map<PatchShaderType, string>;
    static patchCompute(name: string, compute: string, stage: TextureStage, textureMap: Object2ObjectMap<Tri<string, TextureType, TextureStage>, string>): string;
    static patchDHGeneric(name: string, vertex: string, tessControl: string, tessEval: string, geometry: string, fragment: string, textureMap: Object2ObjectMap<Tri<string, TextureType, TextureStage>, string>): Map<PatchShaderType, string>;
    static patchDHTerrain(name: string, vertex: string, tessControl: string, tessEval: string, geometry: string, fragment: string, textureMap: Object2ObjectMap<Tri<string, TextureType, TextureStage>, string>): Map<PatchShaderType, string>;
    static patchSodium(name: string, vertex: string, geometry: string, tessControl: string, tessEval: string, fragment: string, alpha: AlphaTest, textureMap: Object2ObjectMap<Tri<string, TextureType, TextureStage>, string>): Map<PatchShaderType, string>;
    static patchVanilla(name: string, vertex: string, geometry: string, tessControl: string, tessEval: string, fragment: string, alpha: AlphaTest, isLines: boolean, hasChunkOffset: boolean, inputs: ShaderAttributeInputs, textureMap: Object2ObjectMap<Tri<string, TextureType, TextureStage>, string>): Map<PatchShaderType, string>;
  }

}

declare module 'net.irisshaders.iris.pipeline.transform.ShaderPrinter' {
  import { PatchShaderType } from 'net.irisshaders.iris.pipeline.transform';
  import { Map } from 'java.util';

  class ProgramPrintBuilder {
    constructor(name: string);
    addJson(json: string): ProgramPrintBuilder;
    addSource(type: PatchShaderType, source: string): ProgramPrintBuilder;
    addSources(sources: Map<PatchShaderType, string>): ProgramPrintBuilder;
    print(): void;
    setName(name: string): ProgramPrintBuilder;
  }

}

declare module 'net.irisshaders.iris.pipeline.transform.transformer' {
  import { AutoHintedMatcher, Matcher } from 'io.github.douira.glsl_transformer.ast.query.match';
  import { ASTParser } from 'io.github.douira.glsl_transformer.ast.transform';
  import { TranslationUnit } from 'io.github.douira.glsl_transformer.ast.node';
  import { Root } from 'io.github.douira.glsl_transformer.ast.query';
  import { Parameters, VanillaParameters, SodiumParameters } from 'net.irisshaders.iris.pipeline.transform.parameter';
  import { Type } from 'io.github.douira.glsl_transformer.util';
  import { StorageType } from 'StorageQualifier';
  import { Map } from 'java.util';
  import { PatchShaderType } from 'net.irisshaders.iris.pipeline.transform';
  import { Object2IntMap, Object2ObjectMap } from 'it.unimi.dsi.fastutil.objects';
  import { TextureStage } from 'net.irisshaders.iris.shaderpack.texture';
  import { Tri } from 'net.irisshaders.iris.helpers';
  import { TextureType } from 'net.irisshaders.iris.gl.texture';

  class CommonTransformer {
    static readonly glTextureMatrix0: AutoHintedMatcher;
    static readonly glTextureMatrix1: AutoHintedMatcher;
    static readonly glTextureMatrix2: AutoHintedMatcher;
    static readonly sampler: Matcher;
    static addIfNotExists(root: Root, t: ASTParser, tree: TranslationUnit, name: string, type: Type, storageType: StorageType): void;
    static addIfNotExists(root: Root, t: ASTParser, tree: TranslationUnit, name: string, type: Type, storageType: StorageType, location: number): void;
    static applyIntelHd4000Workaround(root: Root): void;
    static patchMultiTexCoord3(t: ASTParser, tree: TranslationUnit, root: Root, parameters: Parameters): void;
    static replaceGlMultiTexCoordBounded(t: ASTParser, root: Root, minimum: number, maximum: number): void;
    static transform(t: ASTParser, tree: TranslationUnit, root: Root, parameters: Parameters, core: boolean): void;
    static upgradeStorageQualifiers(t: ASTParser, tree: TranslationUnit, root: Root, parameters: Parameters): void;
  }


  class CompatibilityTransformer {
    static transformEach(t: ASTParser, tree: TranslationUnit, root: Root, parameters: Parameters): void;
    static transformFragmentCore(t: ASTParser, tree: TranslationUnit, root: Root, parameters: Parameters): void;
    static transformGrouped(t: ASTParser, trees: Map<PatchShaderType, TranslationUnit>, parameters: Parameters): void;
  }


  class CompositeCoreTransformer {
    static transform(t: ASTParser, tree: TranslationUnit, root: Root, parameters: Parameters): void;
  }


  class CompositeDepthTransformer {
    static transform(t: ASTParser, tree: TranslationUnit, root: Root): void;
  }


  class CompositeTransformer {
    static transform(t: ASTParser, tree: TranslationUnit, root: Root, parameters: Parameters): void;
  }


  class DHGenericTransformer {
    static injectVertInit(t: ASTParser, tree: TranslationUnit, root: Root, parameters: Parameters): void;
    static transform(t: ASTParser, tree: TranslationUnit, root: Root, parameters: Parameters): void;
  }


  class DHTerrainTransformer {
    static injectVertInit(t: ASTParser, tree: TranslationUnit, root: Root, parameters: Parameters): void;
    static transform(t: ASTParser, tree: TranslationUnit, root: Root, parameters: Parameters): void;
  }


  class EntityPatcher {
    static patchEntityId(t: ASTParser, tree: TranslationUnit, root: Root, parameters: VanillaParameters): void;
    static patchOverlayColor(t: ASTParser, tree: TranslationUnit, root: Root, parameters: VanillaParameters): void;
  }


  class LayoutTransformer {
    static transformGrouped(t: ASTParser, trees: Map<PatchShaderType, TranslationUnit>, parameters: Parameters): void;
    static transformIn(map: Object2IntMap<string>, t: ASTParser, tree: TranslationUnit, root: Root, parameters: Parameters): void;
    static transformOut(t: ASTParser, tree: TranslationUnit, root: Root, parameters: Parameters): Object2IntMap<string>;
  }


  class SodiumCoreTransformer {
    static transform(t: ASTParser, tree: TranslationUnit, root: Root, parameters: SodiumParameters): void;
  }


  class SodiumTransformer {
    static injectVertInit(t: ASTParser, tree: TranslationUnit, root: Root, parameters: SodiumParameters, needsNormal: boolean): void;
    static replaceMCEntity(t: ASTParser, tree: TranslationUnit, root: Root): void;
    static replaceMidTexCoord(t: ASTParser, tree: TranslationUnit, root: Root, textureScale: number): void;
    static transform(t: ASTParser, tree: TranslationUnit, root: Root, parameters: SodiumParameters): void;
  }


  class TextureTransformer {
    static transform(t: ASTParser, tree: TranslationUnit, root: Root, stage: TextureStage, textureMap: Object2ObjectMap<Tri<string, TextureType, TextureStage>, string>): void;
  }


  class VanillaCoreTransformer {
    static transform(t: ASTParser, tree: TranslationUnit, root: Root, parameters: VanillaParameters): void;
  }


  class VanillaTransformer {
    static transform(t: ASTParser, tree: TranslationUnit, root: Root, parameters: VanillaParameters): void;
  }

}

declare module 'net.irisshaders.iris.platform' {
  import { ShaderStateShard } from 'RenderStateShard';
  import { Supplier } from 'java.util.function';
  import { ShaderInstance } from 'net.minecraft.client.renderer';
  import { Path } from 'java.nio.file';
  import { KeyMapping } from 'net.minecraft.client';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockAndTintGetter } from 'net.minecraft.world.level';
  import { Direction, BlockPos } from 'net.minecraft.core';
  import { List } from 'java.util';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';
  import { RegisterKeyMappingsEvent } from 'net.neoforged.neoforge.client.event';

  interface Bypass extends ShaderStateShard {}
  class Bypass extends ShaderStateShard {
    constructor(original: Supplier<ShaderInstance>);
  }


  interface IrisForgeHelpers extends IrisPlatformHelpers {}
  class IrisForgeHelpers extends IrisPlatformHelpers {
    compareVersions(currentVersion: string, semanticVersion: string): number;
    get configDir(): Path;
    get gameDir(): Path;
    get version(): string;
    getBlockAppearance(level: BlockAndTintGetter, state: BlockState, cullFace: Direction, pos: BlockPos): BlockState;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(modId: string): boolean;
    registerKeyBinding(keyMapping: KeyMapping): KeyMapping;
    useELS(): boolean;
  }


  class IrisForgeMod {
    static KEYLIST: List;
    constructor(bus: IEventBus, modContainer: ModContainer);
    registerKeys(event: RegisterKeyMappingsEvent): void;
  }


  class IrisPlatformHelpers {
    static readonly INSTANCE: IrisPlatformHelpers;
    compareVersions(var1: string, var2: string): number;
    get configDir(): Path;
    get gameDir(): Path;
    get version(): string;
    getBlockAppearance(var1: BlockAndTintGetter, var2: BlockState, var3: Direction, var4: BlockPos): BlockState;
    static getInstance(): IrisPlatformHelpers;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(var1: string): boolean;
    registerKeyBinding(var1: KeyMapping): KeyMapping;
    useELS(): boolean;
  }

}

declare module 'net.irisshaders.iris.samplers' {
  import { ImageHolder, GlImage } from 'net.irisshaders.iris.gl.image';
  import { Supplier } from 'java.util.function';
  import { ImmutableSet } from 'com.google.common.collect';
  import { Integer } from 'java.lang';
  import { RenderTargets } from 'net.irisshaders.iris.targets';
  import { ShadowRenderTargets } from 'net.irisshaders.iris.shadows';
  import { Set } from 'java.util';
  import { SamplerHolder } from 'net.irisshaders.iris.gl.sampler';
  import { WorldRenderingPipeline } from 'net.irisshaders.iris.pipeline';
  import { TextureAccess } from 'net.irisshaders.iris.gl.texture';
  import { AbstractTexture } from 'net.minecraft.client.renderer.texture';
  import { Object2ObjectMap } from 'it.unimi.dsi.fastutil.objects';

  class IrisImages {
    static addCustomImages(images: ImageHolder, customImages: Set<GlImage>): void;
    static addRenderTargetImages(images: ImageHolder, flipped: Supplier<ImmutableSet<number>>, renderTargets: RenderTargets): void;
    static addShadowColorImages(images: ImageHolder, shadowRenderTargets: ShadowRenderTargets, flipped: ImmutableSet<number>): void;
    static hasRenderTargetImages(images: ImageHolder, targets: RenderTargets): boolean;
    static hasShadowImages(images: ImageHolder): boolean;
  }


  class IrisSamplers {
    static readonly ALBEDO_TEXTURE_UNIT: number;
    static readonly OVERLAY_TEXTURE_UNIT: number;
    static readonly LIGHTMAP_TEXTURE_UNIT: number;
    static readonly WORLD_RESERVED_TEXTURE_UNITS: ImmutableSet;
    static readonly SODIUM_RESERVED_TEXTURE_UNITS: ImmutableSet;
    static readonly COMPOSITE_RESERVED_TEXTURE_UNITS: ImmutableSet;
    static addCompositeSamplers(samplers: SamplerHolder, renderTargets: RenderTargets): void;
    static addCustomImages(images: SamplerHolder, customImages: Set<GlImage>): void;
    static addCustomTextures(samplers: SamplerHolder, irisCustomTextures: Object2ObjectMap<string, TextureAccess>): void;
    static addLevelSamplers(samplers: SamplerHolder, pipeline: WorldRenderingPipeline, whitePixel: AbstractTexture, hasTexture: boolean, hasLightmap: boolean, hasOverlay: boolean): void;
    static addNoiseSampler(samplers: SamplerHolder, sampler: TextureAccess): void;
    static addRenderTargetSamplers(samplers: SamplerHolder, flipped: Supplier<ImmutableSet<number>>, renderTargets: RenderTargets, isFullscreenPass: boolean, pipeline: WorldRenderingPipeline): void;
    static addShadowSamplers(samplers: SamplerHolder, shadowRenderTargets: ShadowRenderTargets, flipped: ImmutableSet<number>, separateHardwareSamplers: boolean): boolean;
    static addWorldDepthSamplers(samplers: SamplerHolder, renderTargets: RenderTargets): void;
    static hasPBRSamplers(samplers: SamplerHolder): boolean;
    static hasShadowSamplers(samplers: SamplerHolder): boolean;
    static initRenderer(): void;
  }

}

declare module 'net.irisshaders.iris.shaderpack' {
  import { NamespacedId, BlockEntry, TagEntry, BlockRenderType } from 'net.irisshaders.iris.shaderpack.materialmap';
  import { Int2ObjectLinkedOpenHashMap, Int2ObjectArrayMap } from 'it.unimi.dsi.fastutil.ints';
  import { List, Map, Set, EnumMap } from 'java.util';
  import { Object2IntFunction, Object2ObjectMap } from 'it.unimi.dsi.fastutil.objects';
  import { ImmutableList } from 'com.google.common.collect';
  import { StringPair } from 'net.irisshaders.iris.helpers';
  import { Path } from 'java.nio.file';
  import { Builder } from 'CustomUniforms';
  import { CustomTextureData, TextureStage } from 'net.irisshaders.iris.shaderpack.texture';
  import { TextureDefinition } from 'net.irisshaders.iris.gl.texture';
  import { ProgramSet } from 'net.irisshaders.iris.shaderpack.programs';
  import { ShaderPackOptions } from 'net.irisshaders.iris.shaderpack.option';
  import { OptionMenuContainer } from 'net.irisshaders.iris.shaderpack.option.menu';
  import { FeatureFlags } from 'net.irisshaders.iris.features';
  import { BuiltShaderStorageInfo } from 'net.irisshaders.iris.gl.buffer';

  class DimensionId {
    static readonly OVERWORLD: NamespacedId;
    static readonly NETHER: NamespacedId;
    static readonly END: NamespacedId;
  }


  class IdMap {
    equals(o: any): boolean;
    get blockProperties(): Int2ObjectLinkedOpenHashMap<BlockEntry[]>;
    get blockRenderTypeMap(): Map<NamespacedId, BlockRenderType>;
    get entityIdMap(): Object2IntFunction<NamespacedId>;
    get itemIdMap(): Object2IntFunction<NamespacedId>;
    get tagEntries(): Int2ObjectLinkedOpenHashMap<TagEntry[]>;
    hashCode(): number;
  }


  class IrisDefines {
    static createIrisReplacements(): ImmutableList<StringPair>;
  }


  class LanguageMap {
    constructor(root: Path);
    get languages(): Set<string>;
    getTranslations(language: string): Map<string, string>;
  }


  class ShaderPack {
    readonly customUniforms: Builder;
    constructor(root: Path, environmentDefines: ImmutableList<StringPair>, isZip: boolean);

    constructor(root: Path, changedConfigs: Map<string, string>, environmentDefines: ImmutableList<StringPair>, isZip: boolean);
    get bufferObjects(): Int2ObjectArrayMap<BuiltShaderStorageInfo>;
    get customNoiseTexture(): CustomTextureData;
    get customTextureDataMap(): EnumMap<TextureStage, Object2ObjectMap<string, CustomTextureData>>;
    get idMap(): IdMap;
    get irisCustomImages(): ImageInformation[];
    get irisCustomTextureDataMap(): Object2ObjectMap<string, CustomTextureData>;
    get languageMap(): LanguageMap;
    get menuContainer(): OptionMenuContainer;
    get profileInfo(): string;
    get shaderPackOptions(): ShaderPackOptions;
    getProgramSet(dimension: NamespacedId): ProgramSet;
    hasFeature(feature: FeatureFlags): boolean;
    readTexture(root: Path, definition: TextureDefinition): CustomTextureData;
  }

}

declare module 'net.irisshaders.iris.shaderpack.discovery' {
  import { Path } from 'java.nio.file';
  import { List } from 'java.util';
  import { URI } from 'java.net';

  class ShaderpackDirectoryManager {
    constructor(root: Path);
    copyPackIntoDirectory(name: string, source: Path): void;
    enumerate(): string[];
    get directoryUri(): URI;
  }

}

declare module 'net.irisshaders.iris.shaderpack.include' {
  import { Optional, List } from 'java.util';
  import { Path, NoSuchFileException } from 'java.nio.file';
  import { ImmutableList, ImmutableMap } from 'com.google.common.collect';
  import { Integer } from 'java.lang';
  import { LineTransform } from 'net.irisshaders.iris.shaderpack.transform.line';
  import { Function } from 'java.util.function';
  import { RusticError } from 'net.irisshaders.iris.shaderpack.error';
  import { Builder } from 'ImmutableList';

  class AbsolutePackPath {
    equals(o: any): boolean;
    static fromAbsolutePath(absolutePath: string): AbsolutePackPath;
    get pathString(): string;
    hashCode(): number;
    parent(): Optional<AbsolutePackPath>;
    resolve(path: string): AbsolutePackPath;
    resolved(root: Path): Path;
    toString(): string;
  }


  interface FileIncludeException extends NoSuchFileException {}
  class FileIncludeException extends NoSuchFileException {
    constructor(message: string);
  }


  class FileNode {
    constructor(path: AbsolutePackPath, lines: ImmutableList<string>);
    get includes(): ImmutableMap<number, AbsolutePackPath>;
    get lines(): ImmutableList<string>;
    get path(): AbsolutePackPath;
    map(transform: LineTransform): FileNode;
  }


  class IncludeGraph {
    constructor(root: Path, startingPaths: ImmutableList<AbsolutePackPath>, isZip: boolean);
    computeWeaklyConnectedComponents(): IncludeGraph[];
    get failures(): ImmutableMap<AbsolutePackPath, RusticError>;
    get nodes(): ImmutableMap<AbsolutePackPath, FileNode>;
    map(transformProvider: Function<AbsolutePackPath, LineTransform>): IncludeGraph;
  }


  class IncludeProcessor {
    constructor(graph: IncludeGraph);
    getIncludedFile(path: AbsolutePackPath): ImmutableList<string>;
  }


  class ShaderPackSourceNames {
    static readonly POTENTIAL_STARTS: ImmutableList;
    static findPresentSources(starts: Builder<AbsolutePackPath>, packRoot: Path, directory: AbsolutePackPath, candidates: ImmutableList<string>): boolean;
  }

}

declare module 'net.irisshaders.iris.shaderpack.loading' {
  import { Enum } from 'java.lang';
  import { List, Optional } from 'java.util';
  import { BlendModeOverride } from 'net.irisshaders.iris.gl.blending';

  interface ProgramArrayId extends Enum<ProgramArrayId> {}
  class ProgramArrayId extends Enum<ProgramArrayId> {
    static readonly Setup: ProgramArrayId;
    static readonly Begin: ProgramArrayId;
    static readonly ShadowComposite: ProgramArrayId;
    static readonly Prepare: ProgramArrayId;
    static readonly Deferred: ProgramArrayId;
    static readonly Composite: ProgramArrayId;
    get group(): ProgramGroup;
    get numPrograms(): number;
    get sourcePrefix(): string;
    static valueOf(name: string): ProgramArrayId;
    static values(): ProgramArrayId[];
  }


  interface ProgramGroup extends Enum<ProgramGroup> {}
  class ProgramGroup extends Enum<ProgramGroup> {
    static readonly Setup: ProgramGroup;
    static readonly Begin: ProgramGroup;
    static readonly Shadow: ProgramGroup;
    static readonly ShadowComposite: ProgramGroup;
    static readonly Prepare: ProgramGroup;
    static readonly Gbuffers: ProgramGroup;
    static readonly Deferred: ProgramGroup;
    static readonly Composite: ProgramGroup;
    static readonly Final: ProgramGroup;
    static readonly Dh: ProgramGroup;
    get baseName(): string;
    static valueOf(name: string): ProgramGroup;
    static values(): ProgramGroup[];
  }


  interface ProgramId extends Enum<ProgramId> {}
  class ProgramId extends Enum<ProgramId> {
    static readonly Shadow: ProgramId;
    static readonly ShadowSolid: ProgramId;
    static readonly ShadowCutout: ProgramId;
    static readonly ShadowWater: ProgramId;
    static readonly ShadowEntities: ProgramId;
    static readonly ShadowLightning: ProgramId;
    static readonly ShadowBlock: ProgramId;
    static readonly Basic: ProgramId;
    static readonly Line: ProgramId;
    static readonly Textured: ProgramId;
    static readonly TexturedLit: ProgramId;
    static readonly SkyBasic: ProgramId;
    static readonly SkyTextured: ProgramId;
    static readonly Clouds: ProgramId;
    static readonly Terrain: ProgramId;
    static readonly TerrainSolid: ProgramId;
    static readonly TerrainCutout: ProgramId;
    static readonly DamagedBlock: ProgramId;
    static readonly Block: ProgramId;
    static readonly BlockTrans: ProgramId;
    static readonly BeaconBeam: ProgramId;
    static readonly Item: ProgramId;
    static readonly Entities: ProgramId;
    static readonly EntitiesTrans: ProgramId;
    static readonly Lightning: ProgramId;
    static readonly Particles: ProgramId;
    static readonly ParticlesTrans: ProgramId;
    static readonly EntitiesGlowing: ProgramId;
    static readonly ArmorGlint: ProgramId;
    static readonly SpiderEyes: ProgramId;
    static readonly Hand: ProgramId;
    static readonly Weather: ProgramId;
    static readonly Water: ProgramId;
    static readonly HandWater: ProgramId;
    static readonly DhTerrain: ProgramId;
    static readonly DhWater: ProgramId;
    static readonly DhGeneric: ProgramId;
    static readonly DhShadow: ProgramId;
    static readonly Final: ProgramId;
    get blendModeOverride(): BlendModeOverride;
    get fallback(): Optional<ProgramId>;
    get group(): ProgramGroup;
    get sourceName(): string;
    static valueOf(name: string): ProgramId;
    static values(): ProgramId[];
  }

}

declare module 'net.irisshaders.iris.shaderpack.materialmap' {
  import { Object2IntMap, Object2IntFunction } from 'it.unimi.dsi.fastutil.objects';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Int2ObjectLinkedOpenHashMap } from 'it.unimi.dsi.fastutil.ints';
  import { List, Map, Optional } from 'java.util';
  import { Block } from 'net.minecraft.world.level.block';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { Enum } from 'java.lang';
  import { ChunkVertexType } from 'net.caffeinemc.mods.sodium.client.render.chunk.vertex.format';

  class BlockMaterialMapping {
    static convertBlockToRenderType(type: BlockRenderType): RenderType;
    static createBlockStateIdMap(blockPropertiesMap: Int2ObjectLinkedOpenHashMap<BlockEntry[]>, tagPropertiesMap: Int2ObjectLinkedOpenHashMap<TagEntry[]>): Object2IntMap<BlockState>;
    static createBlockTypeMap(blockPropertiesMap: Map<NamespacedId, BlockRenderType>): Map<Block, BlockRenderType>;
  }


  interface BlockRenderType extends Enum<BlockRenderType> {}
  class BlockRenderType extends Enum<BlockRenderType> {
    static readonly SOLID: BlockRenderType;
    static readonly CUTOUT: BlockRenderType;
    static readonly CUTOUT_MIPPED: BlockRenderType;
    static readonly TRANSLUCENT: BlockRenderType;
    static fromString(name: string): Optional<BlockRenderType>;
    static valueOf(name: string): BlockRenderType;
    static values(): BlockRenderType[];
  }


  class Entry {
  }


  class LegacyIdMap {
    static addLegacyValues(blockIdMap: Int2ObjectLinkedOpenHashMap<BlockEntry[]>): void;
  }


  class NamespacedId {
    constructor(combined: string);

    constructor(namespace: string, name: string);
    equals(o: any): boolean;
    get name(): string;
    get namespace(): string;
    hashCode(): number;
    toString(): string;
  }


  class WorldRenderingSettings {
    static readonly INSTANCE: WorldRenderingSettings;
    clearReloadRequired(): void;
    get ambientOcclusionLevel(): number;
    get blockStateIds(): Object2IntMap<BlockState>;
    get blockTypeIds(): Map<Block, BlockRenderType>;
    get entityIds(): Object2IntFunction<NamespacedId>;
    get itemIds(): Object2IntFunction<NamespacedId>;
    get vertexFormat(): ChunkVertexType;
    hasVillagerConversionId(): boolean;
    isReloadRequired(): boolean;
    set ambientOcclusionLevel(ambientOcclusionLevel: number);
    set blockStateIds(blockStateIds: Object2IntMap<BlockState>);
    set blockTypeIds(blockTypeIds: Map<Block, BlockRenderType>);
    set entityIds(entityIds: Object2IntFunction<NamespacedId>);
    set itemIds(itemIds: Object2IntFunction<NamespacedId>);
    set vertexFormat(chunkVertexFormat: ChunkVertexType);
    setDisableDirectionalShading(disableDirectionalShading: boolean): void;
    setSeparateEntityDraws(separateEntityDraws: boolean): void;
    setUseSeparateAo(useSeparateAo: boolean): void;
    setVoxelizeLightBlocks(voxelizeLightBlocks: boolean): void;
    shouldDisableDirectionalShading(): boolean;
    shouldSeparateEntityDraws(): boolean;
    shouldUseSeparateAo(): boolean;
    shouldVoxelizeLightBlocks(): boolean;
  }

}

declare module 'net.irisshaders.iris.shaderpack.option' {
  import { Optional, Set, List, Properties, Map, LinkedHashMap } from 'java.util';
  import { ImmutableSet, ImmutableList, ImmutableMap } from 'com.google.common.collect';
  import { Integer, Enum } from 'java.lang';
  import { IntList } from 'it.unimi.dsi.fastutil.ints';
  import { AbsolutePackPath, IncludeGraph } from 'net.irisshaders.iris.shaderpack.include';
  import { LineTransform } from 'net.irisshaders.iris.shaderpack.transform.line';
  import { OptionValues } from 'net.irisshaders.iris.shaderpack.option.values';
  import { Builder } from 'net.irisshaders.iris.shaderpack.option.OptionSet';
  import { BiConsumer } from 'java.util.function';
  import { OutputStream, Writer } from 'java.io';
  import { ProfileResult } from 'net.irisshaders.iris.shaderpack.option.ProfileSet';

  class BaseOption {
    get comment(): Optional<string>;
    get name(): string;
    get type(): OptionType;
  }


  interface BooleanOption extends BaseOption {}
  class BooleanOption extends BaseOption {
    constructor(type: OptionType, name: string, comment: string, defaultValue: boolean);
    get defaultValue(): boolean;
    toString(): string;
  }


  class MergedBooleanOption {
    constructor(location: OptionLocation, option: BooleanOption);
    get locations(): ImmutableSet<OptionLocation>;
    get option(): BooleanOption;
    merge(other: MergedBooleanOption): MergedBooleanOption;
  }


  class MergedStringOption {
    constructor(location: OptionLocation, option: StringOption);
    get locations(): ImmutableSet<OptionLocation>;
    get option(): StringOption;
    merge(other: MergedStringOption): MergedStringOption;
  }


  class OptionAnnotatedSource {
    constructor(source: string);

    constructor(lines: ImmutableList<string>);
    apply(values: OptionValues): string;
    asTransform(values: OptionValues): LineTransform;
    get booleanDefineReferences(): ImmutableMap<string, IntList>;
    get booleanOptions(): ImmutableMap<number, BooleanOption>;
    get diagnostics(): ImmutableMap<number, string>;
    get stringOptions(): ImmutableMap<number, StringOption>;
    getOptionSet(filePath: AbsolutePackPath, booleanDefineReferences: Set<string>): OptionSet;
  }


  class OptionSet {
    static builder(): Builder;
    get booleanOptions(): ImmutableMap<string, MergedBooleanOption>;
    get stringOptions(): ImmutableMap<string, MergedStringOption>;
    isBooleanOption(name: string): boolean;
  }


  class OptionTests {
    static main(args: string[]): void;
  }


  interface OptionType extends Enum<OptionType> {}
  class OptionType extends Enum<OptionType> {
    static readonly DEFINE: OptionType;
    static readonly CONST: OptionType;
    static valueOf(name: string): OptionType;
    static values(): OptionType[];
  }


  interface OrderBackedProperties extends Properties {}
  class OrderBackedProperties extends Properties {
    forEach(action: BiConsumer<any, any>): void;
    put(key: any, value: any): any;
    store(out: OutputStream, comments: string): void;
    store(out: Writer, comments: string): void;
  }


  class Profile {
    readonly name: string;
    readonly precedence: number;
    readonly optionValues: Map;
    readonly disabledPrograms: List;
    matches(options: OptionSet, values: OptionValues): boolean;
  }


  class ProfileSet {
    constructor(orderedProfiles: LinkedHashMap<string, Profile>);
    forEach(action: BiConsumer<string, Profile>): void;
    static fromTree(tree: Map<string, string[]>, optionSet: OptionSet): ProfileSet;
    scan(options: OptionSet, values: OptionValues): ProfileResult;
    size(): number;
  }


  class ShaderPackOptions {
    constructor(graph: IncludeGraph, changedConfigs: Map<string, string>);
    get includes(): IncludeGraph;
    get optionSet(): OptionSet;
    get optionValues(): OptionValues;
  }


  interface StringOption extends BaseOption {}
  class StringOption extends BaseOption {
    static create(type: OptionType, name: string, comment: string, defaultValue: string): StringOption;
    get allowedValues(): ImmutableList<string>;
    get defaultValue(): string;
  }

}

declare module 'net.irisshaders.iris.shaderpack.option.menu' {
  import { BooleanOption, ShaderPackOptions, ProfileSet, OptionSet, StringOption } from 'net.irisshaders.iris.shaderpack.option';
  import { ShaderProperties } from 'net.irisshaders.iris.shaderpack.properties';
  import { OptionValues } from 'net.irisshaders.iris.shaderpack.option.values';
  import { Map, List, Optional } from 'java.util';
  import { Integer } from 'java.lang';

  interface OptionMenuBooleanOptionElement extends OptionMenuOptionElement {}
  class OptionMenuBooleanOptionElement extends OptionMenuOptionElement {
    readonly option: BooleanOption;
    constructor(elementString: string, container: OptionMenuContainer, shaderProperties: ShaderProperties, values: OptionValues, option: BooleanOption);
  }


  class OptionMenuContainer {
    readonly mainScreen: OptionMenuElementScreen;
    readonly subScreens: Map;
    constructor(shaderProperties: ShaderProperties, shaderPackOptions: ShaderPackOptions, profiles: ProfileSet);
    get profiles(): ProfileSet;
    notifyOptionAdded(optionId: string, option: OptionMenuOptionElement): void;
    queueForUnusedOptionDump(index: number, elementList: OptionMenuElement[]): void;
  }


  class OptionMenuElement {
    static readonly EMPTY: OptionMenuElement;
    static create(elementString: string, container: OptionMenuContainer, shaderProperties: ShaderProperties, shaderPackOptions: ShaderPackOptions): OptionMenuElement;
  }


  class OptionMenuElementScreen {
    readonly elements: List;
    constructor(container: OptionMenuContainer, shaderProperties: ShaderProperties, shaderPackOptions: ShaderPackOptions, elementStrings: string[], columnCount: Optional<number>);
    get columnCount(): number;
  }


  interface OptionMenuLinkElement extends OptionMenuElement {}
  class OptionMenuLinkElement extends OptionMenuElement {
    readonly targetScreenId: string;
    constructor(targetScreenId: string);
  }


  interface OptionMenuMainElementScreen extends OptionMenuElementScreen {}
  class OptionMenuMainElementScreen extends OptionMenuElementScreen {
    constructor(container: OptionMenuContainer, shaderProperties: ShaderProperties, shaderPackOptions: ShaderPackOptions, elementStrings: string[], columnCount: Optional<number>);
  }


  interface OptionMenuOptionElement extends OptionMenuElement {}
  class OptionMenuOptionElement extends OptionMenuElement {
    readonly slider: boolean;
    readonly container: OptionMenuContainer;
    readonly optionId: string;
    constructor(elementString: string, container: OptionMenuContainer, shaderProperties: ShaderProperties, packAppliedValues: OptionValues);
    get appliedOptionValues(): OptionValues;
    get pendingOptionValues(): OptionValues;
  }


  interface OptionMenuProfileElement extends OptionMenuElement {}
  class OptionMenuProfileElement extends OptionMenuElement {
    readonly profiles: ProfileSet;
    readonly options: OptionSet;
    constructor(profiles: ProfileSet, options: OptionSet, packAppliedValues: OptionValues);
    get pendingOptionValues(): OptionValues;
  }


  interface OptionMenuStringOptionElement extends OptionMenuOptionElement {}
  class OptionMenuStringOptionElement extends OptionMenuOptionElement {
    readonly option: StringOption;
    constructor(elementString: string, container: OptionMenuContainer, shaderProperties: ShaderProperties, values: OptionValues, option: StringOption);
  }


  interface OptionMenuSubElementScreen extends OptionMenuElementScreen {}
  class OptionMenuSubElementScreen extends OptionMenuElementScreen {
    readonly screenId: string;
    constructor(screenId: string, container: OptionMenuContainer, shaderProperties: ShaderProperties, shaderPackOptions: ShaderPackOptions, elementStrings: string[], columnCount: Optional<number>);
  }

}

declare module 'net.irisshaders.iris.shaderpack.option.OptionSet' {
  import { OptionSet, OptionLocation, BooleanOption, MergedBooleanOption, StringOption, MergedStringOption } from 'net.irisshaders.iris.shaderpack.option';

  class Builder {
    addAll(other: OptionSet): void;
    addBooleanOption(location: OptionLocation, option: BooleanOption): void;
    addBooleanOption(proposed: MergedBooleanOption): void;
    addStringOption(location: OptionLocation, option: StringOption): void;
    addStringOption(proposed: MergedStringOption): void;
    build(): OptionSet;
  }

}

declare module 'net.irisshaders.iris.shaderpack.option.Profile' {
  import { Profile } from 'net.irisshaders.iris.shaderpack.option';

  class Builder {
    constructor(name: string);
    addAll(other: Profile): Builder;
    build(): Profile;
    disableProgram(programId: string): Builder;
    option(optionId: string, value: string): Builder;
  }

}

declare module 'net.irisshaders.iris.shaderpack.option.ProfileSet' {
  import { Optional } from 'java.util';
  import { Profile } from 'net.irisshaders.iris.shaderpack.option';

  class ProfileResult {
    readonly current: Optional;
    readonly next: Profile;
    readonly previous: Profile;
  }

}

declare module 'net.irisshaders.iris.shaderpack.option.values' {
  import { OptionalBoolean } from 'net.irisshaders.iris.helpers';
  import { Optional, Map } from 'java.util';
  import { OptionSet } from 'net.irisshaders.iris.shaderpack.option';
  import { Boolean } from 'java.lang';

  interface ImmutableOptionValues extends OptionValues {}
  class ImmutableOptionValues extends OptionValues {
    get optionSet(): OptionSet;
    get optionsChanged(): number;
    getBooleanValue(name: string): OptionalBoolean;
    getStringValue(name: string): Optional<string>;
    mutableCopy(): MutableOptionValues;
    toImmutable(): ImmutableOptionValues;
  }


  interface MutableOptionValues extends OptionValues {}
  class MutableOptionValues extends OptionValues {
    constructor(options: OptionSet, values: Map<string, string>);
    addAll(values: Map<string, string>): void;
    get booleanValues(): Map<string, boolean>;
    get optionSet(): OptionSet;
    get options(): OptionSet;
    get optionsChanged(): number;
    get stringValues(): Map<string, string>;
    getBooleanValue(name: string): OptionalBoolean;
    getStringValue(name: string): Optional<string>;
    mutableCopy(): MutableOptionValues;
    toImmutable(): ImmutableOptionValues;
  }


  class OptionValues {
    get optionSet(): OptionSet;
    get optionsChanged(): number;
    getBooleanValue(var1: string): OptionalBoolean;
    getBooleanValueOrDefault(name: string): boolean;
    getStringValue(var1: string): Optional<string>;
    getStringValueOrDefault(name: string): string;
    mutableCopy(): MutableOptionValues;
    toImmutable(): ImmutableOptionValues;
  }

}

declare module 'net.irisshaders.iris.shaderpack.parsing' {
  import { OptionValues } from 'net.irisshaders.iris.shaderpack.option.values';
  import { Type } from 'net.irisshaders.iris.shaderpack.parsing.CommentDirective';
  import { Optional, List } from 'java.util';
  import { ComputeSource } from 'net.irisshaders.iris.shaderpack.programs';
  import { ConstDirective } from 'net.irisshaders.iris.shaderpack.parsing.ConstDirectiveParser';
  import { Runnable } from 'java.lang';
  import { Consumer, IntConsumer } from 'java.util.function';
  import { FloatConsumer } from 'it.unimi.dsi.fastutil.floats';
  import { BooleanConsumer } from 'it.unimi.dsi.fastutil.booleans';
  import { Vector2f, Vector3i, Vector4f } from 'org.joml';

  class BooleanParser {
    static parse(expression: string, valueLookup: OptionValues): boolean;
  }


  class CommentDirective {
    get directive(): string;
    get location(): number;
    get type(): Type;
  }


  class CommentDirectiveParser {
    static findDirective(haystack: string, type: Type): Optional<CommentDirective>;
  }


  class ComputeDirectiveParser {
    static setComputeWorkGroups(source: ComputeSource, directive: ConstDirective): void;
    static setComputeWorkGroupsRelative(source: ComputeSource, directive: ConstDirective): void;
  }


  class ConstDirectiveParser {
    static findDirectiveInLine(line: string): Optional<ConstDirective>;
    static findDirectives(source: string): ConstDirective[];
  }


  class DirectiveHolder {
    acceptCommentFloatDirective(var1: string, var2: FloatConsumer): void;
    acceptCommentIntDirective(var1: string, var2: IntConsumer): void;
    acceptCommentStringDirective(var1: string, var2: Consumer<string>): void;
    acceptConstBooleanDirective(var1: string, var2: BooleanConsumer): void;
    acceptConstFloatDirective(var1: string, var2: FloatConsumer): void;
    acceptConstIVec3Directive(var1: string, var2: Consumer<Vector3i>): void;
    acceptConstIntDirective(var1: string, var2: IntConsumer): void;
    acceptConstStringDirective(var1: string, var2: Consumer<string>): void;
    acceptConstVec2Directive(var1: string, var2: Consumer<Vector2f>): void;
    acceptConstVec4Directive(var1: string, var2: Consumer<Vector4f>): void;
    acceptUniformDirective(var1: string, var2: Runnable): void;
  }


  interface DispatchingDirectiveHolder extends DirectiveHolder {}
  class DispatchingDirectiveHolder extends DirectiveHolder {
    acceptCommentFloatDirective(name: string, consumer: FloatConsumer): void;
    acceptCommentIntDirective(name: string, consumer: IntConsumer): void;
    acceptCommentStringDirective(name: string, consumer: Consumer<string>): void;
    acceptConstBooleanDirective(name: string, consumer: BooleanConsumer): void;
    acceptConstFloatDirective(name: string, consumer: FloatConsumer): void;
    acceptConstIVec3Directive(name: string, consumer: Consumer<Vector3i>): void;
    acceptConstIntDirective(name: string, consumer: IntConsumer): void;
    acceptConstStringDirective(name: string, consumer: Consumer<string>): void;
    acceptConstVec2Directive(name: string, consumer: Consumer<Vector2f>): void;
    acceptConstVec4Directive(name: string, consumer: Consumer<Vector4f>): void;
    acceptUniformDirective(name: string, onDetected: Runnable): void;
    processDirective(directive: ConstDirective): void;
  }


  class ParsedString {
    constructor(text: string);
    currentlyContains(text: string): boolean;
    isEnd(): boolean;
    takeComments(): boolean;
    takeLiteral(token: string): boolean;
    takeNumber(): string;
    takeRest(): string;
    takeSomeWhitespace(): boolean;
    takeWord(): string;
    takeWordOrNumber(): string;
  }

}

declare module 'net.irisshaders.iris.shaderpack.parsing.CommentDirective' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Type extends Enum<Type> {}
  class Type extends Enum<Type> {
    static readonly DRAWBUFFERS: Type;
    static readonly RENDERTARGETS: Type;
    static valueOf(name: string): Type;
    static values(): Type[];
  }

}

declare module 'net.irisshaders.iris.shaderpack.parsing.ConstDirectiveParser' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Type extends Enum<Type> {}
  class Type extends Enum<Type> {
    static readonly INT: Type;
    static readonly FLOAT: Type;
    static readonly VEC2: Type;
    static readonly IVEC3: Type;
    static readonly VEC4: Type;
    static readonly BOOL: Type;
    static valueOf(name: string): Type;
    static values(): Type[];
  }


  class ConstDirective {
    get key(): string;
    get type(): Type;
    get value(): string;
    toString(): string;
  }

}

declare module 'net.irisshaders.iris.shaderpack.preprocessor' {
  import { DefaultPreprocessorListener, Source } from 'org.anarres.cpp';
  import { Iterable } from 'java.lang';
  import { StringPair } from 'net.irisshaders.iris.helpers';
  import { Pattern } from 'java.util.regex';
  import { ShaderPackOptions } from 'net.irisshaders.iris.shaderpack.option';

  interface GlslCollectingListener extends DefaultPreprocessorListener {}
  class GlslCollectingListener extends DefaultPreprocessorListener {
    static readonly VERSION_MARKER: string;
    static readonly EXTENSION_MARKER: string;
    collectLines(): string;
    handleWarning(source: Source, line: number, column: number, msg: string): void;
  }


  class JcppProcessor {
    static glslPreprocessSource(source: string, environmentDefines: Iterable<StringPair>): string;
  }


  interface PropertiesCommentListener extends DefaultPreprocessorListener {}
  class PropertiesCommentListener extends DefaultPreprocessorListener {
    handleError(source: Source, line: number, column: number, msg: string): void;
  }


  class PropertiesPreprocessor {
    static readonly BACKSLASH_MATCHER: Pattern;
    static preprocessSource(source: string, shaderPackOptions: ShaderPackOptions, environmentDefines: Iterable<StringPair>): string;
    static preprocessSource(source: string, environmentDefines: Iterable<StringPair>): string;
  }


  interface PropertyCollectingListener extends DefaultPreprocessorListener {}
  class PropertyCollectingListener extends DefaultPreprocessorListener {
    static readonly PROPERTY_MARKER: string;
    collectLines(): string;
    handleError(source: Source, line: number, column: number, msg: string): void;
    handleWarning(source: Source, line: number, column: number, msg: string): void;
  }

}

declare module 'net.irisshaders.iris.shaderpack.programs' {
  import { ShaderProperties, IndirectPointer, PackDirectives, ProgramDirectives } from 'net.irisshaders.iris.shaderpack.properties';
  import { Optional } from 'java.util';
  import { Vector2f, Vector3i } from 'org.joml';
  import { ProgramId, ProgramArrayId } from 'net.irisshaders.iris.shaderpack.loading';
  import { AbsolutePackPath } from 'net.irisshaders.iris.shaderpack.include';
  import { Function } from 'java.util.function';
  import { ShaderPack } from 'net.irisshaders.iris.shaderpack';
  import { BlendModeOverride } from 'net.irisshaders.iris.gl.blending';

  class ComputeSource {
    constructor(name: string, source: string, parent: ProgramSet, properties: ShaderProperties);
    get indirectPointer(): IndirectPointer;
    get name(): string;
    get parent(): ProgramSet;
    get source(): Optional<string>;
    get workGroupRelative(): Vector2f;
    get workGroups(): Vector3i;
    isValid(): boolean;
    requireValid(): Optional<ComputeSource>;
    set workGroupRelative(workGroupRelative: Vector2f);
    set workGroups(workGroups: Vector3i);
  }


  class ProgramFallbackResolver {
    constructor(programs: ProgramSet);
    has(id: ProgramId): boolean;
    resolve(id: ProgramId): Optional<ProgramSource>;
    resolveNullable(id: ProgramId): ProgramSource;
  }


  interface ProgramSet extends ProgramSetInterface {}
  class ProgramSet extends ProgramSetInterface {
    constructor(directory: AbsolutePackPath, sourceProvider: Function<AbsolutePackPath, string>, shaderProperties: ShaderProperties, pack: ShaderPack);
    get(programId: ProgramId): Optional<ProgramSource>;
    get finalCompute(): ComputeSource[];
    get pack(): ShaderPack;
    get packDirectives(): PackDirectives;
    get setup(): ComputeSource[];
    get shadowCompute(): ComputeSource[];
    getComposite(programArrayId: ProgramArrayId): ProgramSource[];
    getCompute(programArrayId: ProgramArrayId): ComputeSource[][];
  }


  class ProgramSetInterface {
  }


  class ProgramSource {
    constructor(name: string, vertexSource: string, geometrySource: string, tessControlSource: string, tessEvalSource: string, fragmentSource: string, parent: ProgramSet, properties: ShaderProperties, defaultBlendModeOverride: BlendModeOverride);
    get directives(): ProgramDirectives;
    get fragmentSource(): Optional<string>;
    get geometrySource(): Optional<string>;
    get name(): string;
    get parent(): ProgramSet;
    get tessControlSource(): Optional<string>;
    get tessEvalSource(): Optional<string>;
    get vertexSource(): Optional<string>;
    isValid(): boolean;
    requireValid(): Optional<ProgramSource>;
    withDirectiveOverride(overrideDirectives: ProgramDirectives): ProgramSource;
  }

}

declare module 'net.irisshaders.iris.shaderpack.programs.ProgramSetInterface' {
  import { ProgramSetInterface } from 'net.irisshaders.iris.shaderpack.programs';

  interface Empty extends ProgramSetInterface {}
  class Empty extends ProgramSetInterface {
    static readonly INSTANCE: ProgramSetInterface;
  }

}

declare module 'net.irisshaders.iris.shaderpack.properties' {
  import { Enum, Integer, Boolean, Float } from 'java.lang';
  import { List, Set, Optional } from 'java.util';
  import { Object2ObjectMap } from 'it.unimi.dsi.fastutil.objects';
  import { Tri, OptionalBoolean } from 'net.irisshaders.iris.helpers';
  import { TextureType } from 'net.irisshaders.iris.gl.texture';
  import { TextureStage } from 'net.irisshaders.iris.shaderpack.texture';
  import { DirectiveHolder } from 'net.irisshaders.iris.shaderpack.parsing';
  import { ImmutableMap, ImmutableList, ImmutableSet } from 'com.google.common.collect';
  import { Vector2i } from 'org.joml';
  import { DepthSamplingSettings, SamplingSettings } from 'net.irisshaders.iris.shaderpack.properties.PackShadowDirectives';
  import { Int2ObjectMap } from 'it.unimi.dsi.fastutil.ints';
  import { ProgramSource } from 'net.irisshaders.iris.shaderpack.programs';
  import { BlendModeOverride, AlphaTest, BufferBlendInformation } from 'net.irisshaders.iris.gl.blending';
  import { ViewportData } from 'net.irisshaders.iris.gl.framebuffer';

  interface CloudSetting extends Enum<CloudSetting> {}
  class CloudSetting extends Enum<CloudSetting> {
    static readonly DEFAULT: CloudSetting;
    static readonly FAST: CloudSetting;
    static readonly FANCY: CloudSetting;
    static readonly OFF: CloudSetting;
    static valueOf(name: string): CloudSetting;
    static values(): CloudSetting[];
  }


  class PackDirectives {
    constructor(supportedRenderTargets: Set<number>, properties: ShaderProperties);
    acceptDirectivesFrom(directives: DirectiveHolder): void;
    get ambientOcclusionLevel(): number;
    get centerDepthHalfLife(): number;
    get cloudSetting(): CloudSetting;
    get concurrentCompute(): boolean;
    get dHCloudSetting(): CloudSetting;
    get drynessHalfLife(): number;
    get eyeBrightnessHalfLife(): number;
    get fallbackTex(): number;
    get noiseTextureResolution(): number;
    get particleRenderingSettings(): ParticleRenderingSettings;
    get renderTargetDirectives(): PackRenderTargetDirectives;
    get shadowDirectives(): PackShadowDirectives;
    get sunPathRotation(): number;
    get textureMap(): Object2ObjectMap<Tri<string, TextureType, TextureStage>, string>;
    get wetnessHalfLife(): number;
    getExplicitFlips(pass: string): ImmutableMap<number, boolean>;
    getTextureScaleOverride(index: number, dimensionX: number, dimensionY: number): Vector2i;
    isOldHandLight(): boolean;
    isOldLighting(): boolean;
    isPrepareBeforeShadow(): boolean;
    rainDepth(): boolean;
    shouldRenderMoon(): boolean;
    shouldRenderSkyDisc(): boolean;
    shouldRenderStars(): boolean;
    shouldRenderSun(): boolean;
    shouldRenderWeather(): boolean;
    shouldRenderWeatherParticles(): boolean;
    shouldUseFrustumCulling(): boolean;
    shouldUseOcclusionCulling(): boolean;
    shouldUseSeparateAo(): boolean;
    shouldUseSeparateEntityDraws(): boolean;
    shouldVoxelizeLightBlocks(): boolean;
    skipAllRendering(): boolean;
    supportsColorCorrection(): boolean;
    underwaterOverlay(): boolean;
    vignette(): boolean;
  }


  class PackShadowDirectives {
    static readonly MAX_SHADOW_COLOR_BUFFERS_IRIS: number;
    static readonly MAX_SHADOW_COLOR_BUFFERS_OF: number;
    constructor(properties: ShaderProperties);

    constructor(shadowDirectives: PackShadowDirectives);
    acceptDirectives(directives: DirectiveHolder): void;
    get colorSamplingSettings(): Int2ObjectMap<SamplingSettings>;
    get cullingState(): ShadowCullState;
    get depthSamplingSettings(): ImmutableList<DepthSamplingSettings>;
    get distance(): number;
    get distanceRenderMul(): number;
    get entityShadowDistanceMul(): number;
    get farPlane(): number;
    get fov(): number;
    get intervalSize(): number;
    get nearPlane(): number;
    get resolution(): number;
    get voxelDistance(): number;
    isDhShadowEnabled(): OptionalBoolean;
    isDistanceRenderMulExplicit(): boolean;
    isShadowEnabled(): OptionalBoolean;
    shouldRenderBlockEntities(): boolean;
    shouldRenderEntities(): boolean;
    shouldRenderLightBlockEntities(): boolean;
    shouldRenderPlayer(): boolean;
    shouldRenderTerrain(): boolean;
    shouldRenderTranslucent(): boolean;
    toString(): string;
  }


  interface ParticleRenderingSettings extends Enum<ParticleRenderingSettings> {}
  class ParticleRenderingSettings extends Enum<ParticleRenderingSettings> {
    static readonly UNSET: ParticleRenderingSettings;
    static readonly BEFORE: ParticleRenderingSettings;
    static readonly MIXED: ParticleRenderingSettings;
    static readonly AFTER: ParticleRenderingSettings;
    static fromString(name: string): ParticleRenderingSettings;
    static valueOf(name: string): ParticleRenderingSettings;
    static values(): ParticleRenderingSettings[];
  }


  class ProgramDirectives {
    constructor(source: ProgramSource, properties: ShaderProperties, supportedRenderTargets: Set<number>, defaultBlendOverride: BlendModeOverride);
    get alphaTestOverride(): Optional<AlphaTest>;
    get blendModeOverride(): Optional<BlendModeOverride>;
    get bufferBlendOverrides(): BufferBlendInformation[];
    get drawBuffers(): number[];
    get explicitFlips(): ImmutableMap<number, boolean>;
    get mipmappedBuffers(): ImmutableSet<number>;
    get viewportScale(): ViewportData;
    hasUnknownDrawBuffers(): boolean;
    withOverriddenDrawBuffers(drawBuffersOverride: number[]): ProgramDirectives;
  }


  interface ShadowCullState extends Enum<ShadowCullState> {}
  class ShadowCullState extends Enum<ShadowCullState> {
    static readonly DEFAULT: ShadowCullState;
    static readonly ADVANCED: ShadowCullState;
    static readonly REVERSED: ShadowCullState;
    static readonly DISTANCE: ShadowCullState;
    static valueOf(name: string): ShadowCullState;
    static values(): ShadowCullState[];
  }

}

declare module 'net.irisshaders.iris.shaderpack.properties.PackShadowDirectives' {
  import { Vector4f } from 'org.joml';
  import { InternalTextureFormat } from 'net.irisshaders.iris.gl.texture';

  interface DepthSamplingSettings extends SamplingSettings {}
  class DepthSamplingSettings extends SamplingSettings {
    get hardwareFiltering(): boolean;
    toString(): string;
  }


  class SamplingSettings {
    get clear(): boolean;
    get clearColor(): Vector4f;
    get format(): InternalTextureFormat;
    get mipmap(): boolean;
    get nearest(): boolean;
    toString(): string;
  }

}

declare module 'net.irisshaders.iris.shaderpack.texture' {
  import { Enum } from 'java.lang';
  import { Optional, List } from 'java.util';

  class CustomTextureData {
  }


  class TextureFilteringData {
    constructor(blur: boolean, clamp: boolean);
    shouldBlur(): boolean;
    shouldClamp(): boolean;
  }


  interface TextureStage extends Enum<TextureStage> {}
  class TextureStage extends Enum<TextureStage> {
    static readonly SETUP: TextureStage;
    static readonly BEGIN: TextureStage;
    static readonly SHADOWCOMP: TextureStage;
    static readonly PREPARE: TextureStage;
    static readonly GBUFFERS_AND_SHADOW: TextureStage;
    static readonly DEFERRED: TextureStage;
    static readonly COMPOSITE_AND_FINAL: TextureStage;
    static parse(name: string): Optional<TextureStage>;
    static valueOf(name: string): TextureStage;
    static values(): TextureStage[];
  }

}

declare module 'net.irisshaders.iris.shaderpack.texture.CustomTextureData' {
  import { TextureFilteringData, CustomTextureData } from 'net.irisshaders.iris.shaderpack.texture';
  import { InternalTextureFormat, PixelFormat, PixelType } from 'net.irisshaders.iris.gl.texture';

  interface RawDataRect extends RawData2D {}
  class RawDataRect extends RawData2D {
    constructor(content: number[], filteringData: TextureFilteringData, internalFormat: InternalTextureFormat, pixelFormat: PixelFormat, pixelType: PixelType, sizeX: number, sizeY: number);
  }


  interface RawData3D extends RawData {}
  class RawData3D extends RawData {
    constructor(content: number[], filteringData: TextureFilteringData, internalFormat: InternalTextureFormat, pixelFormat: PixelFormat, pixelType: PixelType, sizeX: number, sizeY: number, sizeZ: number);
    get sizeX(): number;
    get sizeY(): number;
    get sizeZ(): number;
  }


  interface RawData2D extends RawData {}
  class RawData2D extends RawData {
    constructor(content: number[], filteringData: TextureFilteringData, internalFormat: InternalTextureFormat, pixelFormat: PixelFormat, pixelType: PixelType, sizeX: number, sizeY: number);
    get sizeX(): number;
    get sizeY(): number;
  }


  interface RawData1D extends RawData {}
  class RawData1D extends RawData {
    constructor(content: number[], filteringData: TextureFilteringData, internalFormat: InternalTextureFormat, pixelFormat: PixelFormat, pixelType: PixelType, sizeX: number);
    get sizeX(): number;
  }


  interface RawData extends CustomTextureData {}
  class RawData extends CustomTextureData {
    get content(): number[];
    get filteringData(): TextureFilteringData;
    get internalFormat(): InternalTextureFormat;
    get pixelFormat(): PixelFormat;
    get pixelType(): PixelType;
  }


  interface ResourceData extends CustomTextureData {}
  class ResourceData extends CustomTextureData {
    constructor(namespace: string, location: string);
    get location(): string;
    get namespace(): string;
  }


  interface LightmapMarker extends CustomTextureData {}
  class LightmapMarker extends CustomTextureData {
    equals(obj: any): boolean;
    hashCode(): number;
  }


  interface PngData extends CustomTextureData {}
  class PngData extends CustomTextureData {
    constructor(filteringData: TextureFilteringData, content: number[]);
    get content(): number[];
    get filteringData(): TextureFilteringData;
  }

}

declare module 'net.irisshaders.iris.shaderpack.transform.line' {
  import { ImmutableList } from 'com.google.common.collect';

  class LineTransform {
    static apply(lines: ImmutableList<string>, transform: LineTransform): ImmutableList<string>;
    transform(var1: number, var2: string): string;
  }

}

declare module 'net.irisshaders.iris.shaderpack.transform' {
  import { InjectionPoint } from 'net.irisshaders.iris.shaderpack.transform.Transformations';

  interface StringTransformations extends Transformations {}
  class StringTransformations extends Transformations {
    constructor(base: string);
    contains(content: string): boolean;
    define(key: string, value: string): void;
    get prefix(): string;
    injectLine(at: InjectionPoint, line: string): void;
    replaceExact(from: string, to: string): void;
    replaceRegex(regex: string, to: string): void;
    set prefix(prefix: string);
    toString(): string;
  }


  class Transformations {
    contains(var1: string): boolean;
    define(var1: string, var2: string): void;
    get prefix(): string;
    injectLine(var1: InjectionPoint, var2: string): void;
    replaceExact(var1: string, var2: string): void;
    replaceRegex(var1: string, var2: string): void;
    set prefix(var1: string);
  }

}

declare module 'net.irisshaders.iris.shaderpack.transform.Transformations' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface InjectionPoint extends Enum<InjectionPoint> {}
  class InjectionPoint extends Enum<InjectionPoint> {
    static readonly DEFINES: InjectionPoint;
    static readonly BEFORE_CODE: InjectionPoint;
    static readonly END: InjectionPoint;
    static valueOf(name: string): InjectionPoint;
    static values(): InjectionPoint[];
  }

}

declare module 'net.irisshaders.iris.shadows' {
  import { WorldRenderingPipeline, IrisRenderingPipeline } from 'net.irisshaders.iris.pipeline';
  import { PackDirectives, PackShadowDirectives } from 'net.irisshaders.iris.shaderpack.properties';
  import { ProgramSource } from 'net.irisshaders.iris.shaderpack.programs';
  import { ShaderStorageBufferHolder } from 'net.irisshaders.iris.gl.buffer';
  import { TextureAccess, InternalTextureFormat } from 'net.irisshaders.iris.gl.texture';
  import { FrameUpdateNotifier } from 'net.irisshaders.iris.uniforms';
  import { Object2ObjectMap } from 'it.unimi.dsi.fastutil.objects';
  import { Set, List } from 'java.util';
  import { GlImage } from 'net.irisshaders.iris.gl.image';
  import { ImmutableMap, ImmutableSet } from 'com.google.common.collect';
  import { Integer, Boolean } from 'java.lang';
  import { CustomUniforms } from 'net.irisshaders.iris.uniforms.custom';
  import { Matrix4f } from 'org.joml';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { Frustum } from 'net.minecraft.client.renderer.culling';
  import { LevelRendererAccessor } from 'net.irisshaders.iris.mixin';
  import { Camera } from 'net.minecraft.client';
  import { RenderBuffers } from 'net.minecraft.client.renderer';
  import { BlockEntityRenderFunction } from 'net.irisshaders.iris.shadows.ShadowRenderingState';
  import { RenderTarget, DepthTexture } from 'net.irisshaders.iris.targets';
  import { GlFramebuffer } from 'net.irisshaders.iris.gl.framebuffer';
  import { IntList } from 'it.unimi.dsi.fastutil.ints';
  import { GlSampler } from 'net.irisshaders.iris.gl.sampler';

  class CullingDataCache {
    restoreState(): void;
    saveState(): void;
  }


  class ShadowCompositeRenderer {
    constructor(pipeline: WorldRenderingPipeline, packDirectives: PackDirectives, sources: ProgramSource[], computes: ComputeSource[][], renderTargets: ShadowRenderTargets, holder: ShaderStorageBufferHolder, noiseTexture: TextureAccess, updateNotifier: FrameUpdateNotifier, customTextureIds: Object2ObjectMap<string, TextureAccess>, customImages: Set<GlImage>, explicitPreFlips: ImmutableMap<number, boolean>, irisCustomTextures: Object2ObjectMap<string, TextureAccess>, customUniforms: CustomUniforms);
    destroy(): void;
    get flippedAtLeastOnceFinal(): ImmutableSet<number>;
    renderAll(): void;
  }


  class ShadowMatrices {
    static readonly NEAR: number;
    static readonly FAR: number;
    static createBaselineModelViewMatrix(target: PoseStack, shadowAngle: number, sunPathRotation: number, nearPlane: number, farPlane: number): void;
    static createModelViewMatrix(target: PoseStack, shadowAngle: number, shadowIntervalSize: number, sunPathRotation: number, cameraX: number, cameraY: number, cameraZ: number, nearPlane: number, farPlane: number): void;
    static createOrthoMatrix(halfPlaneLength: number, nearPlane: number, farPlane: number): Matrix4f;
    static createPerspectiveMatrix(fov: number): Matrix4f;
    static snapModelViewToGrid(target: PoseStack, shadowIntervalSize: number, cameraX: number, cameraY: number, cameraZ: number): void;
  }


  class ShadowRenderer {
    static ACTIVE: boolean;
    static visibleBlockEntities: List;
    static renderDistance: number;
    static MODELVIEW: Matrix4f;
    static PROJECTION: Matrix4f;
    static FRUSTUM: Frustum;
    constructor(pipeline: IrisRenderingPipeline, shadow: ProgramSource, directives: PackDirectives, shadowRenderTargets: ShadowRenderTargets, compositeRenderer: ShadowCompositeRenderer, customUniforms: CustomUniforms, separateHardwareSamplers: boolean);
    addDebugText(messages: string[]): void;
    static createShadowModelView(sunPathRotation: number, intervalSize: number, nearPlane: number, farPlane: number): PoseStack;
    destroy(): void;
    renderBlockEntities(bufferSource: RenderBuffers, modelView: PoseStack, camera: Camera, cameraX: number, cameraY: number, cameraZ: number, tickDelta: number, hasEntityFrustum: boolean, lightsOnly: boolean): number;
    renderShadows(levelRenderer: LevelRendererAccessor, playerCamera: Camera): void;
    setUsesImages(usesImages: boolean): void;
    setupShadowViewport(): void;
  }


  class ShadowRenderingState {
    static areShadowsCurrentlyBeingRendered(): boolean;
    static get renderDistance(): number;
    static renderBlockEntities(shadowRenderer: ShadowRenderer, bufferSource: RenderBuffers, modelView: PoseStack, camera: Camera, cameraX: number, cameraY: number, cameraZ: number, tickDelta: number, hasEntityFrustum: boolean, lightsOnly: boolean): number;
    static setBlockEntityRenderFunction(functionParameter: BlockEntityRenderFunction): void;
  }


  class ShadowRenderTargets {
    constructor(pipeline: WorldRenderingPipeline, resolution: number, shadowDirectives: PackShadowDirectives);
    copyPreTranslucentDepth(): void;
    createColorFramebuffer(stageWritesToMain: ImmutableSet<number>, drawBuffers: number[]): GlFramebuffer;
    createColorFramebufferWithDepth(stageWritesToMain: ImmutableSet<number>, drawBuffers: number[]): GlFramebuffer;
    createDHFramebuffer(stageWritesToAlt: ImmutableSet<number>, drawBuffers: number[]): GlFramebuffer;
    createFramebufferWritingToAlt(drawBuffers: number[]): GlFramebuffer;
    createFramebufferWritingToMain(drawBuffers: number[]): GlFramebuffer;
    createIfEmpty(index: number): void;
    createShadowFramebuffer(stageWritesToAlt: ImmutableSet<number>, drawBuffers: number[]): GlFramebuffer;
    destroy(): void;
    flip(target: number): void;
    get(index: number): RenderTarget;
    get buffersToBeCleared(): IntList;
    get depthSourceFb(): GlFramebuffer;
    get depthTexture(): DepthTexture;
    get depthTextureNoTranslucents(): DepthTexture;
    get numColorTextures(): number;
    get renderTargetCount(): number;
    get resolution(): number;
    getColorTextureFormat(index: number): InternalTextureFormat;
    getColorTextureId(i: number): number;
    getOrCreate(index: number): RenderTarget;
    getSamplerFor(i: number): GlSampler;
    isFlipped(target: number): boolean;
    isFullClearRequired(): boolean;
    isHardwareFiltered(i: number): boolean;
    onFullClear(): void;
    snapshot(): ImmutableSet<number>;
  }

}

declare module 'net.irisshaders.iris.shadows.frustum.advanced' {
  import { Frustum } from 'net.minecraft.client.renderer.culling';
  import { Frustum as net_caffeinemc_mods_sodium_client_render_viewport_frustum_Frustum } from 'net.caffeinemc.mods.sodium.client.render.viewport.frustum';
  import { ViewportProvider, Viewport } from 'net.caffeinemc.mods.sodium.client.render.viewport';
  import { Matrix4fc, Vector3f, Vector4f } from 'org.joml';
  import { BoxCuller } from 'net.irisshaders.iris.shadows.frustum';
  import { AABB } from 'net.minecraft.world.phys';

  interface AdvancedShadowCullingFrustum extends net_caffeinemc_mods_sodium_client_render_viewport_frustum_Frustum, ViewportProvider, Frustum {}
  class AdvancedShadowCullingFrustum extends net_caffeinemc_mods_sodium_client_render_viewport_frustum_Frustum {
    x: number;
    y: number;
    z: number;
    constructor(modelViewProjection: Matrix4fc, shadowProjection: Matrix4fc, shadowLightVectorFromOrigin: Vector3f, boxCuller: BoxCuller);
    canDetermineInvisible(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): boolean;
    checkCornerVisibilityBool(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): boolean;
    fastAabbTest(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): number;
    isVisible(aabb: AABB): boolean;
    prepare(cameraX: number, cameraY: number, cameraZ: number): void;
    sodium$createViewport(): Viewport;
    testAab(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): boolean;
  }


  class BaseClippingPlanes {
    constructor(modelViewProjection: Matrix4fc);
    get planes(): Vector4f[];
  }


  interface ReversedAdvancedShadowCullingFrustum extends net_caffeinemc_mods_sodium_client_render_viewport_frustum_Frustum, AdvancedShadowCullingFrustum {}
  class ReversedAdvancedShadowCullingFrustum extends net_caffeinemc_mods_sodium_client_render_viewport_frustum_Frustum {
    constructor(modelViewProjection: Matrix4fc, shadowProjection: Matrix4fc, shadowLightVectorFromOrigin: Vector3f, voxelCuller: BoxCuller, distanceCuller: BoxCuller);
    fastAabbTest(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): number;
    isVisible(aabb: AABB): boolean;
    prepare(cameraX: number, cameraY: number, cameraZ: number): void;
    testAab(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): boolean;
  }

}

declare module 'net.irisshaders.iris.shadows.frustum' {
  import { AABB } from 'net.minecraft.world.phys';
  import { Frustum } from 'net.minecraft.client.renderer.culling';
  import { ViewportProvider, Viewport } from 'net.caffeinemc.mods.sodium.client.render.viewport';
  import { Frustum as net_caffeinemc_mods_sodium_client_render_viewport_frustum_Frustum } from 'net.caffeinemc.mods.sodium.client.render.viewport.frustum';

  class BoxCuller {
    constructor(maxDistance: number);
    isCulled(aabb: AABB): boolean;
    isCulled(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): boolean;
    isCulledSodium(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): boolean;
    setPosition(cameraX: number, cameraY: number, cameraZ: number): void;
    toString(): string;
  }


  interface CullEverythingFrustum extends ViewportProvider, net_caffeinemc_mods_sodium_client_render_viewport_frustum_Frustum, Frustum {}
  class CullEverythingFrustum extends ViewportProvider {
    constructor();
    canDetermineInvisible(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): boolean;
    isVisible(box: AABB): boolean;
    prepare(d: number, e: number, f: number): void;
    sodium$createViewport(): Viewport;
    testAab(v: number, v1: number, v2: number, v3: number, v4: number, v5: number): boolean;
  }


  class FrustumHolder {
    get cullingInfo(): string;
    get distanceInfo(): string;
    get frustum(): Frustum;
    setInfo(frustum: Frustum, distanceInfo: string, cullingInfo: string): FrustumHolder;
  }

}

declare module 'net.irisshaders.iris.shadows.frustum.fallback' {
  import { Frustum } from 'net.minecraft.client.renderer.culling';
  import { Frustum as net_caffeinemc_mods_sodium_client_render_viewport_frustum_Frustum } from 'net.caffeinemc.mods.sodium.client.render.viewport.frustum';
  import { ViewportProvider, Viewport } from 'net.caffeinemc.mods.sodium.client.render.viewport';
  import { BoxCuller } from 'net.irisshaders.iris.shadows.frustum';
  import { AABB } from 'net.minecraft.world.phys';

  interface BoxCullingFrustum extends net_caffeinemc_mods_sodium_client_render_viewport_frustum_Frustum, ViewportProvider, Frustum {}
  class BoxCullingFrustum extends net_caffeinemc_mods_sodium_client_render_viewport_frustum_Frustum {
    constructor(boxCuller: BoxCuller);
    canDetermineInvisible(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): boolean;
    isVisible(box: AABB): boolean;
    prepare(cameraX: number, cameraY: number, cameraZ: number): void;
    sodium$createViewport(): Viewport;
    testAab(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): boolean;
  }


  interface NonCullingFrustum extends ViewportProvider, net_caffeinemc_mods_sodium_client_render_viewport_frustum_Frustum, Frustum {}
  class NonCullingFrustum extends ViewportProvider {
    constructor();
    canDetermineInvisible(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): boolean;
    isVisible(box: AABB): boolean;
    prepare(d: number, e: number, f: number): void;
    sodium$createViewport(): Viewport;
    testAab(v: number, v1: number, v2: number, v3: number, v4: number, v5: number): boolean;
  }

}

declare module 'net.irisshaders.iris.shadows.ShadowRenderingState' {
  import { ShadowRenderer } from 'net.irisshaders.iris.shadows';
  import { RenderBuffers } from 'net.minecraft.client.renderer';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { Camera } from 'net.minecraft.client';

  class BlockEntityRenderFunction {
    renderBlockEntities(var1: ShadowRenderer, var2: RenderBuffers, var3: PoseStack, var4: Camera, var5: number, var7: number, var9: number, var11: number, var12: boolean, var13: boolean): number;
  }

}

declare module 'net.irisshaders.iris.targets.backed' {
  import { DynamicTexture } from 'net.minecraft.client.renderer.texture';
  import { TextureAccess, TextureType } from 'net.irisshaders.iris.gl.texture';
  import { PngData } from 'net.irisshaders.iris.shaderpack.texture.CustomTextureData';
  import { IntSupplier } from 'java.util.function';
  import { GlResource } from 'net.irisshaders.iris.gl';

  interface NativeImageBackedCustomTexture extends TextureAccess, DynamicTexture {}
  class NativeImageBackedCustomTexture extends TextureAccess {
    constructor(textureData: PngData);
    get textureId(): IntSupplier;
    get type(): TextureType;
    upload(): void;
  }


  interface NativeImageBackedNoiseTexture extends TextureAccess, DynamicTexture {}
  class NativeImageBackedNoiseTexture extends TextureAccess {
    constructor(size: number);
    get textureId(): IntSupplier;
    get type(): TextureType;
    upload(): void;
  }


  interface NativeImageBackedSingleColorTexture extends DynamicTexture {}
  class NativeImageBackedSingleColorTexture extends DynamicTexture {
    constructor(red: number, green: number, blue: number, alpha: number);

    constructor(rgba: number);
  }


  interface NoiseTexture extends GlResource {}
  class NoiseTexture extends GlResource {
    constructor(width: number, height: number);
    get textureId(): number;
  }


  interface SingleColorTexture extends GlResource {}
  class SingleColorTexture extends GlResource {
    constructor(red: number, green: number, blue: number, alpha: number);
    get textureId(): number;
  }

}

declare module 'net.irisshaders.iris.targets' {
  import { IntIterator } from 'it.unimi.dsi.fastutil.ints';
  import { ImmutableSet, ImmutableList } from 'com.google.common.collect';
  import { Integer } from 'java.lang';
  import { Vector4f } from 'org.joml';
  import { IntSupplier } from 'java.util.function';
  import { GlFramebuffer } from 'net.irisshaders.iris.gl.framebuffer';
  import { PackRenderTargetDirectives, PackShadowDirectives, PackDirectives } from 'net.irisshaders.iris.shaderpack.properties';
  import { ShadowRenderTargets } from 'net.irisshaders.iris.shadows';
  import { GlResource } from 'net.irisshaders.iris.gl';
  import { DepthBufferFormat, InternalTextureFormat } from 'net.irisshaders.iris.gl.texture';
  import { Builder } from 'net.irisshaders.iris.targets.RenderTarget';
  import { Map } from 'java.util';
  import { RenderTargetSettings } from 'PackRenderTargetDirectives';

  class Blaze3dRenderTargetExt {
    iris$getColorBufferVersion(): number;
    iris$getDepthBufferVersion(): number;
  }


  class BufferFlipper {
    flip(target: number): void;
    get flippedBuffers(): IntIterator;
    isFlipped(target: number): boolean;
    snapshot(): ImmutableSet<number>;
  }


  class ClearPass {
    constructor(color: Vector4f, viewportX: IntSupplier, viewportY: IntSupplier, framebuffer: GlFramebuffer, clearFlags: number);
    execute(defaultClearColor: Vector4f): void;
    get framebuffer(): GlFramebuffer;
  }


  class ClearPassCreator {
    static createClearPasses(renderTargets: RenderTargets, fullClear: boolean, renderTargetDirectives: PackRenderTargetDirectives): ImmutableList<ClearPass>;
    static createShadowClearPasses(renderTargets: ShadowRenderTargets, fullClear: boolean, renderTargetDirectives: PackShadowDirectives): ImmutableList<ClearPass>;
  }


  class ClearPassInformation {
    constructor(vector4f: Vector4f, width: number, height: number);
    equals(obj: any): boolean;
    get color(): Vector4f;
    get height(): number;
    get width(): number;
  }


  interface DepthTexture extends GlResource {}
  class DepthTexture extends GlResource {
    constructor(name: string, width: number, height: number, format: DepthBufferFormat);
    get textureId(): number;
  }


  class RenderTarget {
    constructor(builder: Builder);
    static builder(): Builder;
    destroy(): void;
    get altTexture(): number;
    get height(): number;
    get internalFormat(): InternalTextureFormat;
    get mainTexture(): number;
    get width(): number;
  }


  class RenderTargets {
    constructor(width: number, height: number, depthTexture: number, depthBufferVersion: number, depthFormat: DepthBufferFormat, renderTargets: Map<number, RenderTargetSettings>, packDirectives: PackDirectives);
    copyPreHandDepth(): void;
    copyPreTranslucentDepth(): void;
    createClearFramebuffer(alt: boolean, clearBuffers: number[]): GlFramebuffer;
    createColorFramebuffer(stageWritesToMain: ImmutableSet<number>, drawBuffers: number[]): GlFramebuffer;
    createColorFramebufferWithDepth(stageWritesToMain: ImmutableSet<number>, drawBuffers: number[]): GlFramebuffer;
    createDHFramebuffer(stageWritesToAlt: ImmutableSet<number>, drawBuffers: number[]): GlFramebuffer;
    createFramebufferWritingToAlt(drawBuffers: number[]): GlFramebuffer;
    createFramebufferWritingToMain(drawBuffers: number[]): GlFramebuffer;
    createGbufferFramebuffer(stageWritesToAlt: ImmutableSet<number>, drawBuffers: number[]): GlFramebuffer;
    createIfUnsure(index: number): void;
    destroy(): void;
    destroyFramebuffer(framebuffer: GlFramebuffer): void;
    get(index: number): RenderTarget;
    get currentHeight(): number;
    get currentWidth(): number;
    get depthTexture(): number;
    get depthTextureNoHand(): DepthTexture;
    get depthTextureNoTranslucents(): DepthTexture;
    get renderTargetCount(): number;
    getOrCreate(index: number): RenderTarget;
    isFullClearRequired(): boolean;
    onFullClear(): void;
    resizeIfNeeded(newDepthBufferVersion: number, newDepthTextureId: number, newWidth: number, newHeight: number, newDepthFormat: DepthBufferFormat, packDirectives: PackDirectives): boolean;
  }

}

declare module 'net.irisshaders.iris.targets.RenderTarget' {
  import { InternalTextureFormat, PixelFormat, PixelType } from 'net.irisshaders.iris.gl.texture';
  import { RenderTarget } from 'net.irisshaders.iris.targets';

  class Builder {
    build(): RenderTarget;
    setDimensions(width: number, height: number): Builder;
    setInternalFormat(format: InternalTextureFormat): Builder;
    setName(name: string): Builder;
    setPixelFormat(pixelFormat: PixelFormat): Builder;
    setPixelType(pixelType: PixelType): Builder;
  }

}

declare module 'net.irisshaders.iris.uniforms' {
  import { Object2IntMap } from 'it.unimi.dsi.fastutil.objects';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { UniformHolder, DynamicUniformHolder } from 'net.irisshaders.iris.gl.uniform';
  import { Vector3d, Vector3f, Vector3i, Matrix4fc, Matrix4f, Vector4f } from 'org.joml';
  import { FogMode } from 'net.irisshaders.iris.gl.state';
  import { IdMap } from 'net.irisshaders.iris.shaderpack';
  import { PackDirectives } from 'net.irisshaders.iris.shaderpack.properties';
  import { Runnable } from 'java.lang';
  import { Timer, FrameCounter } from 'net.irisshaders.iris.uniforms.SystemTimeUniforms';

  class BiomeUniforms {
    static addBiomeUniforms(uniforms: UniformHolder): void;
    static get biomeMap(): Object2IntMap<ResourceKey<Biome>>;
  }


  class CameraUniforms {
    static addCameraUniforms(uniforms: UniformHolder, notifier: FrameUpdateNotifier): void;
    static get unshiftedCameraPosition(): Vector3d;
    static getCameraPositionFract(originalPos: Vector3d): Vector3f;
    static getCameraPositionInt(originalPos: Vector3d): Vector3i;
  }


  class CapturedRenderingState {
    static readonly INSTANCE: CapturedRenderingState;
    get cloudTime(): number;
    get currentAlphaTest(): number;
    get currentRenderedBlockEntity(): number;
    get currentRenderedEntity(): number;
    get currentRenderedItem(): number;
    get darknessLightFactor(): number;
    get fogColor(): Vector3d;
    get fogDensity(): number;
    get gbufferModelView(): Matrix4fc;
    get gbufferProjection(): Matrix4fc;
    get realTickDelta(): number;
    get tickDelta(): number;
    set cloudTime(cloudTime: number);
    set currentAlphaTest(alphaTest: number);
    set currentRenderedItem(item: number);
    set darknessLightFactor(factor: number);
    set fogDensity(fogDensity: number);
    set gbufferModelView(gbufferModelView: Matrix4fc);
    set gbufferProjection(gbufferProjection: Matrix4f);
    set realTickDelta(tickDelta: number);
    set tickDelta(tickDelta: number);
    setCurrentBlockEntity(entity: number): void;
    setCurrentEntity(entity: number): void;
    setFogColor(red: number, green: number, blue: number): void;
  }


  class CelestialUniforms {
    constructor(sunPathRotation: number);
    addCelestialUniforms(uniforms: UniformHolder): void;
    get shadowLightPosition(): Vector4f;
    get shadowLightPositionInWorldSpace(): Vector4f;
    static get sunAngle(): number;
    static isDay(): boolean;
  }


  class CommonUniforms {
    static addCommonUniforms(uniforms: DynamicUniformHolder, idMap: IdMap, directives: PackDirectives, updateNotifier: FrameUpdateNotifier, fogMode: FogMode): void;
    static addDynamicUniforms(uniforms: DynamicUniformHolder, fogMode: FogMode): void;
    static addNonDynamicUniforms(uniforms: UniformHolder, idMap: IdMap, directives: PackDirectives, updateNotifier: FrameUpdateNotifier): void;
    static generalCommonUniforms(uniforms: UniformHolder, updateNotifier: FrameUpdateNotifier, directives: PackDirectives): void;
  }


  class ExternallyManagedUniforms {
    static addExternallyManagedUniforms(uniformHolder: UniformHolder): void;
    static addExternallyManagedUniforms116(uniformHolder: UniformHolder): void;
    static addExternallyManagedUniforms117(uniformHolder: UniformHolder): void;
  }


  class FogUniforms {
    static addFogUniforms(uniforms: DynamicUniformHolder, fogMode: FogMode): void;
  }


  class FrameUpdateNotifier {
    addListener(onNewFrame: Runnable): void;
    onNewFrame(): void;
  }


  class HardcodedCustomUniforms {
    static addHardcodedCustomUniforms(holder: UniformHolder, updateNotifier: FrameUpdateNotifier): void;
  }


  class IdMapUniforms {
    static addIdMapUniforms(notifier: FrameUpdateNotifier, uniforms: UniformHolder, idMap: IdMap, isOldHandLight: boolean): void;
  }


  class IrisExclusiveUniforms {
    static addIrisExclusiveUniforms(uniforms: UniformHolder): void;
  }


  class IrisInternalUniforms {
    static addFogUniforms(uniforms: DynamicUniformHolder, fogMode: FogMode): void;
  }


  class IrisTimeUniforms {
    static addTimeUniforms(uniforms: UniformHolder): void;
    static updateTime(): void;
  }


  class MatrixUniforms {
    static addMatrixUniforms(uniforms: UniformHolder, directives: PackDirectives): void;
  }


  class SystemTimeUniforms {
    static readonly TIMER: Timer;
    static readonly COUNTER: FrameCounter;
    static addSystemTimeUniforms(uniforms: UniformHolder): void;
  }


  class VanillaUniforms {
    static addVanillaUniforms(uniforms: DynamicUniformHolder): void;
  }


  class ViewportUniforms {
    static addViewportUniforms(uniforms: UniformHolder): void;
  }


  class WorldTimeUniforms {
    static addWorldTimeUniforms(uniforms: UniformHolder): void;
  }

}

declare module 'net.irisshaders.iris.uniforms.BiomeUniforms' {
  class ToFloatFunction<T = any> {
    applyAsFloat(var1: T): number;
  }

}

declare module 'net.irisshaders.iris.uniforms.builtin' {
  import { UniformHolder } from 'net.irisshaders.iris.gl.uniform';

  class BuiltinReplacementUniforms {
    static addBuiltinReplacementUniforms(uniforms: UniformHolder): void;
  }

}

declare module 'net.irisshaders.iris.uniforms.CameraUniforms' {
  import { Vector3d } from 'org.joml';

  class CameraPositionTracker {
    get currentCameraPosition(): Vector3d;
    get currentCameraPositionY(): number;
    get previousCameraPosition(): Vector3d;
    get previousCameraPositionUnshifted(): Vector3d;
  }

}

declare module 'net.irisshaders.iris.uniforms.custom.cached' {
  import { UniformUpdateFrequency, FloatSupplier } from 'net.irisshaders.iris.gl.uniform';
  import { BooleanSupplier, Supplier, IntSupplier } from 'java.util.function';
  import { FunctionReturn, Type, FunctionContext } from 'kroppeb.stareval.function';
  import { VariableExpression, Expression } from 'kroppeb.stareval.expression';
  import { Vector2f, Vector3f, Matrix4fc, Matrix4f, Vector4f, Vector2i, Vector3i } from 'org.joml';
  import { VectorType, MatrixType } from 'net.irisshaders.iris.parsing';

  interface BooleanCachedUniform extends CachedUniform {}
  class BooleanCachedUniform extends CachedUniform {
    constructor(name: string, updateFrequency: UniformUpdateFrequency, supplier: BooleanSupplier);
    get type(): Type;
    push(location: number): void;
    writeTo(functionReturn: FunctionReturn): void;
  }


  interface CachedUniform extends VariableExpression {}
  class CachedUniform extends VariableExpression {
    constructor(name: string, updateFrequency: UniformUpdateFrequency);
    evaluateTo(context: FunctionContext, functionReturn: FunctionReturn): void;
    static forExpression(name: string, type: Type, expression: Expression, context: FunctionContext): CachedUniform;
    get name(): string;
    get type(): Type;
    get updateFrequency(): UniformUpdateFrequency;
    markUnchanged(): void;
    push(var1: number): void;
    pushIfChanged(location: number): void;
    update(): void;
    writeTo(var1: FunctionReturn): void;
  }


  interface Float2VectorCachedUniform extends VectorCachedUniform<Vector2f> {}
  class Float2VectorCachedUniform extends VectorCachedUniform<Vector2f> {
    constructor(name: string, updateFrequency: UniformUpdateFrequency, supplier: Supplier<Vector2f>);
    get type(): VectorType;
    push(location: number): void;
  }


  interface Float3VectorCachedUniform extends VectorCachedUniform<Vector3f> {}
  class Float3VectorCachedUniform extends VectorCachedUniform<Vector3f> {
    constructor(name: string, updateFrequency: UniformUpdateFrequency, supplier: Supplier<Vector3f>);
    get type(): VectorType;
    push(location: number): void;
  }


  interface Float4MatrixCachedUniform extends VectorCachedUniform<Matrix4fc> {}
  class Float4MatrixCachedUniform extends VectorCachedUniform<Matrix4fc> {
    constructor(name: string, updateFrequency: UniformUpdateFrequency, supplier: Supplier<Matrix4fc>);
    get type(): MatrixType<Matrix4f>;
    push(location: number): void;
  }


  interface Float4VectorCachedUniform extends VectorCachedUniform<Vector4f> {}
  class Float4VectorCachedUniform extends VectorCachedUniform<Vector4f> {
    constructor(name: string, updateFrequency: UniformUpdateFrequency, supplier: Supplier<Vector4f>);
    get type(): VectorType;
    push(location: number): void;
  }


  interface FloatCachedUniform extends CachedUniform {}
  class FloatCachedUniform extends CachedUniform {
    constructor(name: string, updateFrequency: UniformUpdateFrequency, supplier: FloatSupplier);
    get type(): Type;
    push(location: number): void;
    writeTo(functionReturn: FunctionReturn): void;
  }


  interface Int2VectorCachedUniform extends VectorCachedUniform<Vector2i> {}
  class Int2VectorCachedUniform extends VectorCachedUniform<Vector2i> {
    constructor(name: string, updateFrequency: UniformUpdateFrequency, supplier: Supplier<Vector2i>);
    get type(): VectorType;
    push(location: number): void;
    writeTo(functionReturn: FunctionReturn): void;
  }


  interface Int3VectorCachedUniform extends VectorCachedUniform<Vector3i> {}
  class Int3VectorCachedUniform extends VectorCachedUniform<Vector3i> {
    constructor(name: string, updateFrequency: UniformUpdateFrequency, supplier: Supplier<Vector3i>);
    get type(): VectorType;
    push(location: number): void;
  }


  interface IntCachedUniform extends CachedUniform {}
  class IntCachedUniform extends CachedUniform {
    constructor(name: string, updateFrequency: UniformUpdateFrequency, supplier: IntSupplier);
    get type(): Type;
    push(location: number): void;
    writeTo(functionReturn: FunctionReturn): void;
  }


  interface VectorCachedUniform<T = any> extends CachedUniform {}
  class VectorCachedUniform<T = any> extends CachedUniform {
    constructor(name: string, updateFrequency: UniformUpdateFrequency, cache: T, supplier: Supplier<T>);
    get type(): Type;
    writeTo(functionReturn: FunctionReturn): void;
  }

}

declare module 'net.irisshaders.iris.uniforms.custom' {
  import { ImmutableMap } from 'com.google.common.collect';
  import { CachedUniform } from 'net.irisshaders.iris.uniforms.custom.cached';
  import { Type } from 'kroppeb.stareval.function';
  import { Collection } from 'java.util';

  class CustomUniformFixedInputUniformsHolder {
    constructor(inputVariables: ImmutableMap<string, CachedUniform>);
    containsKey(name: string): boolean;
    get all(): Collection<CachedUniform>;
    getType(name: string): Type;
    getUniform(name: string): CachedUniform;
    updateAll(): void;
  }

}

declare module 'net.irisshaders.iris.uniforms.custom.CustomUniformFixedInputUniformsHolder' {
  import { UniformHolder, UniformUpdateFrequency, FloatSupplier, UniformType } from 'net.irisshaders.iris.gl.uniform';
  import { IntSupplier, DoubleSupplier, BooleanSupplier, Supplier } from 'java.util.function';
  import { Vector2f, Vector2i, Vector3f, Vector3i, Vector4f, Vector3d, Matrix4fc } from 'org.joml';
  import { CustomUniformFixedInputUniformsHolder } from 'net.irisshaders.iris.uniforms.custom';

  interface Builder extends UniformHolder {}
  class Builder extends UniformHolder {
    build(): CustomUniformFixedInputUniformsHolder;
    externallyManagedUniform(name: string, type: UniformType): UniformHolder;
    uniform1b(updateFrequency: UniformUpdateFrequency, name: string, value: BooleanSupplier): Builder;
    uniform1f(updateFrequency: UniformUpdateFrequency, name: string, value: FloatSupplier): Builder;
    uniform1f(updateFrequency: UniformUpdateFrequency, name: string, value: IntSupplier): Builder;
    uniform1f(updateFrequency: UniformUpdateFrequency, name: string, value: DoubleSupplier): Builder;
    uniform1i(updateFrequency: UniformUpdateFrequency, name: string, value: IntSupplier): Builder;
    uniform2f(updateFrequency: UniformUpdateFrequency, name: string, value: Supplier<Vector2f>): Builder;
    uniform2i(updateFrequency: UniformUpdateFrequency, name: string, value: Supplier<Vector2i>): Builder;
    uniform3d(updateFrequency: UniformUpdateFrequency, name: string, value: Supplier<Vector3d>): UniformHolder;
    uniform3f(updateFrequency: UniformUpdateFrequency, name: string, value: Supplier<Vector3f>): Builder;
    uniform3i(updateFrequency: UniformUpdateFrequency, name: string, value: Supplier<Vector3i>): Builder;
    uniform4f(updateFrequency: UniformUpdateFrequency, name: string, value: Supplier<Vector4f>): UniformHolder;
    uniform4fArray(updateFrequency: UniformUpdateFrequency, name: string, value: Supplier<number[]>): UniformHolder;
    uniformMatrix(updateFrequency: UniformUpdateFrequency, name: string, value: Supplier<Matrix4fc>): UniformHolder;
    uniformMatrixFromArray(updateFrequency: UniformUpdateFrequency, name: string, value: Supplier<number[]>): UniformHolder;
    uniformTruncated3f(updateFrequency: UniformUpdateFrequency, name: string, value: Supplier<Vector4f>): Builder;
  }

}

declare module 'net.irisshaders.iris.uniforms.IrisExclusiveUniforms' {
  import { UniformHolder } from 'net.irisshaders.iris.gl.uniform';

  class WorldInfoUniforms {
    static addWorldInfoUniforms(uniforms: UniformHolder): void;
  }

}

declare module 'net.irisshaders.iris.uniforms.SystemTimeUniforms' {
  import { IntSupplier } from 'java.util.function';

  interface FrameCounter extends IntSupplier {}
  class FrameCounter extends IntSupplier {
    beginFrame(): void;
    get asInt(): number;
    reset(): void;
  }


  class Timer {
    constructor();
    beginFrame(frameStartTime: number): void;
    get frameTimeCounter(): number;
    get lastFrameTime(): number;
    reset(): void;
  }

}

declare module 'net.irisshaders.iris.uniforms.transforms' {
  import { FloatSupplier } from 'net.irisshaders.iris.gl.uniform';
  import { FrameUpdateNotifier } from 'net.irisshaders.iris.uniforms';
  import { Supplier } from 'java.util.function';
  import { Vector2f, Vector2i } from 'org.joml';

  interface SmoothedFloat extends FloatSupplier {}
  class SmoothedFloat extends FloatSupplier {
    constructor(halfLifeUp: number, halfLifeDown: number, unsmoothed: FloatSupplier, updateNotifier: FrameUpdateNotifier);
    get asFloat(): number;
  }


  interface SmoothedVec2f extends Supplier<Vector2f> {}
  class SmoothedVec2f extends Supplier<Vector2f> {
    constructor(halfLifeUp: number, halfLifeDown: number, unsmoothed: Supplier<Vector2i>, updateNotifier: FrameUpdateNotifier);
    get (): Vector2f;
  }

}

declare module 'net.irisshaders.iris.UpdateChecker' {
  import { Map } from 'java.util';

  class UpdateInfo {
    semanticVersion: string;
    updateInfo: Map;
    modHost: string;
    modDownload: string;
    installer: string;
  }


  class BetaInfo {
    betaTag: string;
    betaVersion: number;
  }

}

declare module 'net.irisshaders.iris.vertices' {
  import { QuadView, TriView } from 'net.irisshaders.iris.vertices.views';
  import { Mode } from 'VertexFormat';
  import { VertexFormat, VertexFormatElement } from 'com.mojang.blaze3d.vertex';
  import { ThreadLocal } from 'java.lang';
  import { Vector2f, Vector4f, Vector3f } from 'org.joml';

  class BlockSensitiveBufferBuilder {
    beginBlock(var1: number, var2: number, var3: number, var4: number, var5: number, var6: number): void;
    endBlock(): void;
    ignoreMidBlock(var1: boolean): void;
    overrideBlock(var1: number): void;
    restoreBlock(): void;
  }


  interface BufferBuilderPolygonView extends QuadView {}
  class BufferBuilderPolygonView extends QuadView {
    setup(pointer: number, writeOffsets: number[], stride: number, vertexAmount: number): void;
    u(index: number): number;
    v(index: number): number;
    x(index: number): number;
    y(index: number): number;
    z(index: number): number;
  }


  class ExtendedDataHelper {
    static readonly BLOCK_RENDER_TYPE: number;
    static readonly FLUID_RENDER_TYPE: number;
    static computeMidBlock(x: number, y: number, z: number, localPosX: number, localPosY: number, localPosZ: number): number;
    static packMidBlock(x: number, y: number, z: number): number;
  }


  class ExtendingBufferBuilder {
    iris$beginWithoutExtending(var1: Mode, var2: VertexFormat): void;
  }


  class ImmediateState {
    static readonly skipExtension: ThreadLocal;
    static isRenderingLevel: boolean;
    static usingTessellation: boolean;
    static renderWithExtendedVertexFormat: boolean;
    static bypass: boolean;
    static mergeRendering: boolean;
  }


  class IrisExtendedBufferBuilder {
    iris$currentBlock(): number;
    iris$currentLocalPosX(): number;
    iris$currentLocalPosY(): number;
    iris$currentLocalPosZ(): number;
    iris$currentRenderType(): number;
    iris$extending(): boolean;
    iris$format(): VertexFormat;
    iris$incrementVertexCount(): void;
    iris$injectNormalAndUV1(): boolean;
    iris$isTerrain(): boolean;
    iris$mode(): Mode;
    iris$resetVertexCount(): void;
    iris$vertexCount(): number;
  }


  class IrisVertexFormats {
    static readonly ENTITY_ELEMENT: VertexFormatElement;
    static readonly ENTITY_ID_ELEMENT: VertexFormatElement;
    static readonly MID_TEXTURE_ELEMENT: VertexFormatElement;
    static readonly TANGENT_ELEMENT: VertexFormatElement;
    static readonly MID_BLOCK_ELEMENT: VertexFormatElement;
    static readonly TERRAIN: VertexFormat;
    static readonly ENTITY: VertexFormat;
    static readonly GLYPH: VertexFormat;
    static readonly CLOUDS: VertexFormat;
  }


  class MojangBufferAccessor {
    get pointer(): number;
  }


  class NormalHelper {
    static computeFaceNormal(saveTo: Vector3f, q: QuadView): void;
    static computeFaceNormalFlipped(saveTo: Vector3f, q: QuadView): void;
    static computeFaceNormalManual(saveTo: Vector3f, x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, x3: number, y3: number, z3: number): void;
    static computeFaceNormalTri(saveTo: Vector3f, t: TriView): void;
    static computeTangent(normalX: number, normalY: number, normalZ: number, t: TriView): number;
    static computeTangent(normalX: number, normalY: number, normalZ: number, x0: number, y0: number, z0: number, u0: number, v0: number, x1: number, y1: number, z1: number, u1: number, v1: number, x2: number, y2: number, z2: number, u2: number, v2: number): number;
    static computeTangent(output: Vector4f, normalX: number, normalY: number, normalZ: number, x0: number, y0: number, z0: number, u0: number, v0: number, x1: number, y1: number, z1: number, u1: number, v1: number, x2: number, y2: number, z2: number, u2: number, v2: number): number;
    static computeTangentSmooth(normalX: number, normalY: number, normalZ: number, t: TriView): number;
    static invertPackedNormal(packed: number): number;
    static octahedronEncode(output: Vector2f, x: number, y: number, z: number): void;
    static tangentEncode(output: Vector2f, tangent: Vector4f): void;
  }


  class NormI8 {
    static pack(normal: Vector3f): number;
    static pack(normal: Vector3f, w: number): number;
    static pack(x: number, y: number, z: number, w: number): number;
    static packColor(x: number, y: number, z: number, w: number): number;
    static toByte(v: number): number;
    static unpackW(norm: number): number;
    static unpackX(norm: number): number;
    static unpackY(norm: number): number;
    static unpackZ(norm: number): number;
  }

}

declare module 'net.irisshaders.iris.vertices.IrisTextVertexSinkImpl' {
  import { QuadView } from 'net.irisshaders.iris.vertices.views';

  interface TextQuadView extends QuadView {}
  class TextQuadView extends QuadView {
    setup(writePointer: number, stride: number): void;
    u(index: number): number;
    v(index: number): number;
    x(index: number): number;
    y(index: number): number;
    z(index: number): number;
  }

}

declare module 'net.irisshaders.iris.vertices.sodium' {
  import { Matrix4f } from 'org.joml';
  import { VertexSerializer } from 'net.caffeinemc.mods.sodium.api.vertex.serializer';
  import { QuadView } from 'net.irisshaders.iris.vertices.views';

  class CloudVertex {
    static readonly STRIDE: number;
    static put(ptr: number, matrix: Matrix4f, x: number, y: number, z: number, color: number, normal: number): void;
    static put(ptr: number, x: number, y: number, z: number, color: number, normal: number): void;
  }


  interface EntityToTerrainVertexSerializer extends VertexSerializer {}
  class EntityToTerrainVertexSerializer extends VertexSerializer {
    serialize(src: number, dst: number, vertexCount: number): void;
  }


  interface GlyphExtVertexSerializer extends VertexSerializer {}
  class GlyphExtVertexSerializer extends VertexSerializer {
    serialize(src: number, dst: number, vertexCount: number): void;
  }


  interface IrisEntityToTerrainVertexSerializer extends VertexSerializer {}
  class IrisEntityToTerrainVertexSerializer extends VertexSerializer {
    serialize(src: number, dst: number, vertexCount: number): void;
  }


  interface ModelToEntityVertexSerializer extends VertexSerializer {}
  class ModelToEntityVertexSerializer extends VertexSerializer {
    serialize(src: number, dst: number, vertexCount: number): void;
  }


  interface QuadViewEntity extends QuadView {}
  class QuadViewEntity extends QuadView {
    setup(writePointer: number, stride: number): void;
    u(index: number): number;
    v(index: number): number;
    x(index: number): number;
    y(index: number): number;
    z(index: number): number;
  }

}

declare module 'net.irisshaders.iris.vertices.sodium.terrain' {
  import { ChunkVertexType, ChunkVertexEncoder } from 'net.caffeinemc.mods.sodium.client.render.chunk.vertex.format';
  import { VertexFormatAttribute } from 'net.caffeinemc.mods.sodium.client.render.vertex';
  import { GlVertexFormat } from 'net.caffeinemc.mods.sodium.client.gl.attribute';
  import { Vertex } from 'ChunkVertexEncoder';

  class BlockContextHolder {
    get blockEmission(): number;
    get blockId(): number;
    get localPosX(): number;
    get localPosY(): number;
    get localPosZ(): number;
    get renderType(): number;
    ignoreMidBlock(): boolean;
    overrideBlock(block: number): void;
    restoreBlock(): void;
    setBlockData(blockId: number, renderType: number, blockEmission: number, localPosX: number, localPosY: number, localPosZ: number): void;
    setIgnoreMidBlock(ignoreMidBlock: boolean): void;
  }


  class FormatAnalyzer {
    static createFormat(blockId: boolean, normal: boolean, midUV: boolean, midBlock: boolean): ChunkVertexType;
  }


  class IrisChunkMeshAttributes {
    static readonly MID_TEX_COORD: VertexFormatAttribute;
    static readonly TANGENT: VertexFormatAttribute;
    static readonly NORMAL: VertexFormatAttribute;
    static readonly BLOCK_ID: VertexFormatAttribute;
    static readonly MID_BLOCK: VertexFormatAttribute;
  }


  class IrisModelVertexFormats {
  }


  class VertexEncoderInterface {
    iris$setContextHolder(var1: BlockContextHolder): void;
  }


  interface XHFPModelVertexType extends ChunkVertexType {}
  class XHFPModelVertexType extends ChunkVertexType {
    constructor(format: GlVertexFormat, blockIdOffset: number, normalOffset: number, midUvOffset: number, midBlockOffset: number);
    static encodeOld(u: number, v: number): number;
    get encoder(): ChunkVertexEncoder;
    get vertexFormat(): GlVertexFormat;
  }


  interface XHFPTerrainVertex extends ChunkVertexEncoder, VertexEncoderInterface {}
  class XHFPTerrainVertex extends ChunkVertexEncoder {
    constructor(blockIdOffset: number, normalOffset: number, midUvOffset: number, midBlockOffset: number, stride: number);
    iris$setContextHolder(holder: BlockContextHolder): void;
    write(ptr: number, material: number, vertices: Vertex[], section: number): number;
  }

}

declare module 'net.irisshaders.iris.vertices.views' {
  class PolygonView {
    u(var1: number): number;
    v(var1: number): number;
    x(var1: number): number;
    y(var1: number): number;
    z(var1: number): number;
  }


  interface QuadView extends TriView {}
  class QuadView extends TriView {
  }


  interface TriView extends PolygonView {}
  class TriView extends PolygonView {
  }

}