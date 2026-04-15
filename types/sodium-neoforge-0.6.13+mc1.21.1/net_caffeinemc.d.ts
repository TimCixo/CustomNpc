declare module 'net.caffeinemc.mods.sodium.api.blockentity' {
  import { BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';

  class BlockEntityRenderHandler {
    static readonly INSTANCE: BlockEntityRenderHandler;
    addRenderPredicate<T extends BlockEntity>(var1: BlockEntityType<T>, var2: BlockEntityRenderPredicate<T>): void;
    static instance(): BlockEntityRenderHandler;
    removeRenderPredicate<T extends BlockEntity>(var1: BlockEntityType<T>, var2: BlockEntityRenderPredicate<T>): boolean;
  }


  class BlockEntityRenderPredicate<T extends BlockEntity = any> {
    shouldRender(var1: BlockGetter, var2: BlockPos, var3: T): boolean;
  }

}

declare module 'net.caffeinemc.mods.sodium.api.internal' {
  import { Class } from 'java.lang';

  class DependencyInjection {
    static load<T>(apiClass: Class<T>, implClassName: string): T;
  }

}

declare module 'net.caffeinemc.mods.sodium.api.math' {
  import { Matrix3f, Matrix4f } from 'org.joml';
  import { Pose } from 'PoseStack';
  import { Direction } from 'net.minecraft.core';

  class MatrixHelper {
    static rotateZYX(matrices: Pose, angleZ: number, angleY: number, angleX: number): void;
    static transformNormal(mat: Matrix3f, skipNormalization: boolean, x: number, y: number, z: number): number;
    static transformNormal(mat: Matrix3f, skipNormalization: boolean, norm: number): number;
    static transformNormal(matrix: Matrix3f, skipNormalization: boolean, direction: Direction): number;
    static transformNormalX(mat: Matrix3f, x: number, y: number, z: number): number;
    static transformNormalY(mat: Matrix3f, x: number, y: number, z: number): number;
    static transformNormalZ(mat: Matrix3f, x: number, y: number, z: number): number;
    static transformPositionX(mat: Matrix4f, x: number, y: number, z: number): number;
    static transformPositionY(mat: Matrix4f, x: number, y: number, z: number): number;
    static transformPositionZ(mat: Matrix4f, x: number, y: number, z: number): number;
    static transformSafeNormal(mat: Matrix3f, x: number, y: number, z: number): number;
  }

}

declare module 'net.caffeinemc.mods.sodium.api.memory' {
  class MemoryIntrinsics {
    static copyMemory(src: number, dst: number, length: number): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.api.texture' {
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';

  class SpriteUtil {
    static readonly INSTANCE: SpriteUtil;
    hasAnimation(var1: TextureAtlasSprite): boolean;
    markSpriteActive(var1: TextureAtlasSprite): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.api.util' {
  import { Vector3fc, Vector3f } from 'org.joml';

  interface ColorABGR extends ColorU8 {}
  class ColorABGR extends ColorU8 {
    static fromNativeByteOrder(color: number): number;
    static mulRGB(color: number, factor: number): number;
    static mulRGB(color: number, factor: number): number;
    static pack(r: number, g: number, b: number): number;
    static pack(r: number, g: number, b: number, a: number): number;
    static pack(r: number, g: number, b: number, a: number): number;
    static toNativeByteOrder(color: number): number;
    static unpackAlpha(color: number): number;
    static unpackBlue(color: number): number;
    static unpackGreen(color: number): number;
    static unpackRed(color: number): number;
    static withAlpha(rgb: number, alpha: number): number;
    static withAlpha(rgb: number, alpha: number): number;
  }


  interface ColorARGB extends ColorU8 {}
  class ColorARGB extends ColorU8 {
    static fromABGR(color: number): number;
    static mulRGB(color: number, factor: number): number;
    static mulRGB(color: number, factor: number): number;
    static pack(r: number, g: number, b: number, a: number): number;
    static pack(r: number, g: number, b: number): number;
    static toABGR(color: number, alpha: number): number;
    static toABGR(color: number, alpha: number): number;
    static toABGR(color: number): number;
    static unpackAlpha(color: number): number;
    static unpackBlue(color: number): number;
    static unpackGreen(color: number): number;
    static unpackRed(color: number): number;
    static withAlpha(rgb: number, alpha: number): number;
  }


  class ColorMixer {
    static mix(start: number, end: number, weight: number): number;
    static mix(start: number, end: number, weight: number): number;
    static mix2d(m00: number, m01: number, m10: number, m11: number, x: number, y: number): number;
    static mul(color: number, factor: number): number;
    static mul(color: number, factor: number): number;
    static mulComponentWise(color0: number, color1: number): number;
  }


  class ColorU8 {
    static readonly COMPONENT_BITS: number;
    static readonly COMPONENT_MASK: number;
    static readonly COMPONENT_RANGE: number;
    static readonly COMPONENT_RANGE_INVERSE: number;
    static byteToNormalizedFloat(value: number): number;
    static normalizedFloatToByte(value: number): number;
  }


  class NormI8 {
    static flipPacked(norm: number): number;
    static isOpposite(normA: number, normB: number): boolean;
    static pack(normal: Vector3fc): number;
    static pack(x: number, y: number, z: number): number;
    static unpack(packed: number, output: Vector3f): Vector3f;
    static unpackX(norm: number): number;
    static unpackY(norm: number): number;
    static unpackZ(norm: number): number;
  }

}

declare module 'net.caffeinemc.mods.sodium.api.vertex.attributes.common' {
  import { Vector2f } from 'org.joml';

  class ColorAttribute {
    static get(ptr: number): number;
    static set(ptr: number, color: number): void;
  }


  class LightAttribute {
    static get(ptr: number): number;
    static set(ptr: number, light: number): void;
  }


  class NormalAttribute {
    static get(ptr: number): number;
    static set(ptr: number, normal: number): void;
  }


  class OverlayAttribute {
    static get(ptr: number): number;
    static set(ptr: number, overlay: number): void;
  }


  class PositionAttribute {
    static getX(ptr: number): number;
    static getY(ptr: number): number;
    static getZ(ptr: number): number;
    static put(ptr: number, x: number, y: number, z: number): void;
  }


  class TextureAttribute {
    static get(ptr: number): Vector2f;
    static getU(ptr: number): number;
    static getV(ptr: number): number;
    static put(ptr: number, vec: Vector2f): void;
    static put(ptr: number, u: number, v: number): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.api.vertex.buffer' {
  import { VertexConsumer, VertexFormat } from 'com.mojang.blaze3d.vertex';
  import { MemoryStack } from 'org.lwjgl.system';

  class VertexBufferWriter {
    canUseIntrinsics(): boolean;
    static copyInto(writer: VertexBufferWriter, stack: MemoryStack, ptr: number, count: number, format: VertexFormat): void;
    static of(consumer: VertexConsumer): VertexBufferWriter;
    push(var1: MemoryStack, var2: number, var4: number, var5: VertexFormat): void;
    static tryOf(consumer: VertexConsumer): VertexBufferWriter;
  }

}

declare module 'net.caffeinemc.mods.sodium.api.vertex.format.common' {
  import { VertexFormat } from 'com.mojang.blaze3d.vertex';
  import { Matrix4f } from 'org.joml';

  class ColorVertex {
    static readonly FORMAT: VertexFormat;
    static readonly STRIDE: number;
    static put(ptr: number, matrix: Matrix4f, x: number, y: number, z: number, color: number): void;
    static put(ptr: number, x: number, y: number, z: number, color: number): void;
  }


  class EntityVertex {
    static readonly FORMAT: VertexFormat;
    static readonly STRIDE: number;
    static write(ptr: number, x: number, y: number, z: number, color: number, u: number, v: number, overlay: number, light: number, normal: number): void;
  }


  class GlyphVertex {
    static readonly FORMAT: VertexFormat;
    static readonly STRIDE: number;
    static put(ptr: number, x: number, y: number, z: number, color: number, u: number, v: number, light: number): void;
  }


  class LineVertex {
    static readonly FORMAT: VertexFormat;
    static readonly STRIDE: number;
    static put(ptr: number, x: number, y: number, z: number, color: number, normal: number): void;
  }


  class ParticleVertex {
    static readonly FORMAT: VertexFormat;
    static readonly STRIDE: number;
    static put(ptr: number, x: number, y: number, z: number, u: number, v: number, color: number, light: number): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.api.vertex.format' {
  import { VertexFormat } from 'com.mojang.blaze3d.vertex';

  class VertexFormatExtensions {
    sodium$getGlobalId(): number;
  }


  class VertexFormatRegistry {
    static readonly INSTANCE: VertexFormatRegistry;
    allocateGlobalId(var1: VertexFormat): number;
    static instance(): VertexFormatRegistry;
  }

}

declare module 'net.caffeinemc.mods.sodium.api.vertex.serializer' {
  import { VertexFormat } from 'com.mojang.blaze3d.vertex';

  class VertexSerializer {
    serialize(var1: number, var3: number, var5: number): void;
  }


  class VertexSerializerRegistry {
    static readonly INSTANCE: VertexSerializerRegistry;
    get(var1: VertexFormat, var2: VertexFormat): VertexSerializer;
    static instance(): VertexSerializerRegistry;
    registerSerializer(var1: VertexFormat, var2: VertexFormat, var3: VertexSerializer): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.checks' {
  import { ResourceManager } from 'net.minecraft.server.packs.resources';

  class ResourcePackScanner {
    static checkIfCoreShaderLoaded(manager: ResourceManager): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.data.config' {
  import { MixinOption } from 'net.caffeinemc.mods.sodium.mixin';
  import { File } from 'java.io';

  class MixinConfig {
    get optionCount(): number;
    get optionOverrideCount(): number;
    getEffectiveOptionForMixin(mixinClassName: string): MixinOption;
    static load(file: File): MixinConfig;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gl.arena' {
  import { CommandList } from 'net.caffeinemc.mods.sodium.client.gl.device';
  import { StagingBuffer } from 'net.caffeinemc.mods.sodium.client.gl.arena.staging';
  import { GlBuffer } from 'net.caffeinemc.mods.sodium.client.gl.buffer';
  import { Stream } from 'java.util.stream';
  import { NativeBuffer } from 'net.caffeinemc.mods.sodium.client.util';

  class GlBufferArena {
    constructor(commands: CommandList, initialCapacity: number, stride: number, stagingBuffer: StagingBuffer);
    delete(commands: CommandList): void;
    ensureCapacity(commandList: CommandList, elementCount: number): void;
    free(entry: GlBufferSegment): void;
    get bufferObject(): GlBuffer;
    get deviceAllocatedMemory(): number;
    get deviceUsedMemory(): number;
    isEmpty(): boolean;
    upload(commandList: CommandList, stream: Stream<PendingUpload>): boolean;
  }


  class GlBufferSegment {
    constructor(arena: GlBufferArena, offset: number, length: number);
    delete(): void;
    get length(): number;
    get offset(): number;
  }


  class PendingBufferCopyCommand {
    get length(): number;
    get readOffset(): number;
    get writeOffset(): number;
    set length(length: number);
  }


  class PendingUpload {
    constructor(data: NativeBuffer);
    get dataBuffer(): NativeBuffer;
    get length(): number;
    get result(): GlBufferSegment;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gl.arena.staging' {
  import { CommandList, RenderDevice } from 'net.caffeinemc.mods.sodium.client.gl.device';
  import { ByteBuffer } from 'java.nio';
  import { GlBuffer } from 'net.caffeinemc.mods.sodium.client.gl.buffer';

  interface FallbackStagingBuffer extends StagingBuffer {}
  class FallbackStagingBuffer extends StagingBuffer {
    constructor(commandList: CommandList);
    delete(commandList: CommandList): void;
    enqueueCopy(commandList: CommandList, data: ByteBuffer, dst: GlBuffer, writeOffset: number): void;
    flip(): void;
    flush(commandList: CommandList): void;
    toString(): string;
  }


  interface MappedStagingBuffer extends StagingBuffer {}
  class MappedStagingBuffer extends StagingBuffer {
    constructor(commandList: CommandList);

    constructor(commandList: CommandList, capacity: number);
    delete(commandList: CommandList): void;
    enqueueCopy(commandList: CommandList, data: ByteBuffer, dst: GlBuffer, writeOffset: number): void;
    flip(): void;
    flush(commandList: CommandList): void;
    static isSupported(instance: RenderDevice): boolean;
    toString(): string;
  }


  class StagingBuffer {
    delete(var1: CommandList): void;
    enqueueCopy(var1: CommandList, var2: ByteBuffer, var3: GlBuffer, var4: number): void;
    flip(): void;
    flush(var1: CommandList): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gl.array' {
  import { GlObject } from 'net.caffeinemc.mods.sodium.client.gl';

  interface GlVertexArray extends GlObject {}
  class GlVertexArray extends GlObject {
    static readonly NULL_ARRAY_ID: number;
    constructor();
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gl.attribute' {
  import { Map } from 'java.util';
  import { VertexFormatAttribute } from 'net.caffeinemc.mods.sodium.client.render.vertex';
  import { Builder } from 'net.caffeinemc.mods.sodium.client.gl.attribute.GlVertexFormat';

  class GlVertexAttribute {
    constructor(format: GlVertexAttributeFormat, count: number, normalized: boolean, pointer: number, stride: number, intType: boolean);
    get count(): number;
    get format(): number;
    get pointer(): number;
    get size(): number;
    get stride(): number;
    isIntType(): boolean;
    isNormalized(): boolean;
  }


  interface GlVertexAttributeBinding extends GlVertexAttribute {}
  class GlVertexAttributeBinding extends GlVertexAttribute {
    constructor(index: number, attribute: GlVertexAttribute);
    get index(): number;
  }


  class GlVertexFormat {
    constructor(attributesKeyed: Map<VertexFormatAttribute, GlVertexAttribute>, bindings: GlVertexAttributeBinding[], stride: number);
    static builder(stride: number): Builder;
    get shaderBindings(): GlVertexAttributeBinding[];
    get stride(): number;
    getAttribute(name: VertexFormatAttribute): GlVertexAttribute;
    toString(): string;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gl.attribute.GlVertexFormat' {
  import { VertexFormatAttribute } from 'net.caffeinemc.mods.sodium.client.render.vertex';
  import { GlVertexFormat } from 'net.caffeinemc.mods.sodium.client.gl.attribute';

  class Builder {
    constructor(stride: number);
    addElement(attribute: VertexFormatAttribute, binding: number, pointer: number): Builder;
    build(): GlVertexFormat;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gl.buffer' {
  import { GlObject } from 'net.caffeinemc.mods.sodium.client.gl';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { ByteBuffer } from 'java.nio';
  import { EnumBitField } from 'net.caffeinemc.mods.sodium.client.gl.util';

  interface GlBuffer extends GlObject {}
  class GlBuffer extends GlObject {
    get activeMapping(): GlBufferMapping;
    set activeMapping(mapping: GlBufferMapping);
  }


  interface GlBufferMapFlags extends Enum<GlBufferMapFlags> {}
  class GlBufferMapFlags extends Enum<GlBufferMapFlags> {
    static readonly READ: GlBufferMapFlags;
    static readonly WRITE: GlBufferMapFlags;
    static readonly PERSISTENT: GlBufferMapFlags;
    static readonly INVALIDATE_BUFFER: GlBufferMapFlags;
    static readonly INVALIDATE_RANGE: GlBufferMapFlags;
    static readonly EXPLICIT_FLUSH: GlBufferMapFlags;
    static readonly COHERENT: GlBufferMapFlags;
    static readonly UNSYNCHRONIZED: GlBufferMapFlags;
    get bits(): number;
    static valueOf(name: string): GlBufferMapFlags;
    static values(): GlBufferMapFlags[];
  }


  class GlBufferMapping {
    constructor(buffer: GlBuffer, map: ByteBuffer);
    dispose(): void;
    get bufferObject(): GlBuffer;
    get memoryBuffer(): ByteBuffer;
    isDisposed(): boolean;
    write(data: ByteBuffer, writeOffset: number): void;
  }


  interface GlBufferStorageFlags extends Enum<GlBufferStorageFlags> {}
  class GlBufferStorageFlags extends Enum<GlBufferStorageFlags> {
    static readonly PERSISTENT: GlBufferStorageFlags;
    static readonly MAP_READ: GlBufferStorageFlags;
    static readonly MAP_WRITE: GlBufferStorageFlags;
    static readonly CLIENT_STORAGE: GlBufferStorageFlags;
    static readonly COHERENT: GlBufferStorageFlags;
    get bits(): number;
    static valueOf(name: string): GlBufferStorageFlags;
    static values(): GlBufferStorageFlags[];
  }


  interface GlBufferTarget extends Enum<GlBufferTarget> {}
  class GlBufferTarget extends Enum<GlBufferTarget> {
    static readonly ARRAY_BUFFER: GlBufferTarget;
    static readonly ELEMENT_BUFFER: GlBufferTarget;
    static readonly COPY_READ_BUFFER: GlBufferTarget;
    static readonly COPY_WRITE_BUFFER: GlBufferTarget;
    get bindingParameter(): number;
    get targetParameter(): number;
    static valueOf(name: string): GlBufferTarget;
    static values(): GlBufferTarget[];
  }


  interface GlBufferUsage extends Enum<GlBufferUsage> {}
  class GlBufferUsage extends Enum<GlBufferUsage> {
    static readonly STREAM_DRAW: GlBufferUsage;
    static readonly STREAM_READ: GlBufferUsage;
    static readonly STREAM_COPY: GlBufferUsage;
    static readonly STATIC_DRAW: GlBufferUsage;
    static readonly STATIC_READ: GlBufferUsage;
    static readonly STATIC_COPY: GlBufferUsage;
    static readonly DYNAMIC_DRAW: GlBufferUsage;
    static readonly DYNAMIC_READ: GlBufferUsage;
    static readonly DYNAMIC_COPY: GlBufferUsage;
    get id(): number;
    static valueOf(name: string): GlBufferUsage;
    static values(): GlBufferUsage[];
  }


  interface GlImmutableBuffer extends GlBuffer {}
  class GlImmutableBuffer extends GlBuffer {
    constructor(flags: EnumBitField<GlBufferStorageFlags>);
    get flags(): EnumBitField<GlBufferStorageFlags>;
  }


  interface GlMutableBuffer extends GlBuffer {}
  class GlMutableBuffer extends GlBuffer {
    get size(): number;
    set size(size: number);
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gl.device' {
  import { AutoCloseable } from 'java.lang';
  import { GlMutableBuffer, GlImmutableBuffer, GlBufferStorageFlags, GlBufferUsage, GlBuffer, GlBufferTarget, GlBufferMapping, GlBufferMapFlags } from 'net.caffeinemc.mods.sodium.client.gl.buffer';
  import { EnumBitField } from 'net.caffeinemc.mods.sodium.client.gl.util';
  import { GlTessellation, GlPrimitiveType, TessellationBinding, GlIndexType } from 'net.caffeinemc.mods.sodium.client.gl.tessellation';
  import { GlVertexArray } from 'net.caffeinemc.mods.sodium.client.gl.array';
  import { ByteBuffer } from 'java.nio';
  import { GlFence } from 'net.caffeinemc.mods.sodium.client.gl.sync';
  import { GLCapabilities } from 'org.lwjgl.opengl';
  import { DeviceFunctions } from 'net.caffeinemc.mods.sodium.client.gl.functions';

  interface CommandList extends AutoCloseable {}
  class CommandList extends AutoCloseable {
    allocateStorage(var1: GlMutableBuffer, var2: number, var4: GlBufferUsage): void;
    beginTessellating(var1: GlTessellation): DrawCommandList;
    bindBuffer(var1: GlBufferTarget, var2: GlBuffer): void;
    bindVertexArray(var1: GlVertexArray): void;
    close(): void;
    copyBufferSubData(var1: GlBuffer, var2: GlBuffer, var3: number, var5: number, var7: number): void;
    createFence(): GlFence;
    createImmutableBuffer(var1: number, var3: EnumBitField<GlBufferStorageFlags>): GlImmutableBuffer;
    createMutableBuffer(): GlMutableBuffer;
    createTessellation(var1: GlPrimitiveType, var2: TessellationBinding[]): GlTessellation;
    deleteBuffer(var1: GlBuffer): void;
    deleteTessellation(var1: GlTessellation): void;
    deleteVertexArray(var1: GlVertexArray): void;
    flush(): void;
    flushMappedRange(var1: GlBufferMapping, var2: number, var3: number): void;
    mapBuffer(var1: GlBuffer, var2: number, var4: number, var6: EnumBitField<GlBufferMapFlags>): GlBufferMapping;
    unbindVertexArray(): void;
    unmap(var1: GlBufferMapping): void;
    uploadData(var1: GlMutableBuffer, var2: ByteBuffer, var3: GlBufferUsage): void;
  }


  interface DrawCommandList extends AutoCloseable {}
  class DrawCommandList extends AutoCloseable {
    close(): void;
    endTessellating(): void;
    flush(): void;
    multiDrawElementsBaseVertex(var1: MultiDrawBatch, var2: GlIndexType): void;
  }


  interface GLRenderDevice extends RenderDevice {}
  class GLRenderDevice extends RenderDevice {
    createCommandList(): CommandList;
    get capabilities(): GLCapabilities;
    get deviceFunctions(): DeviceFunctions;
    get subTexelPrecisionBits(): number;
    makeActive(): void;
    makeInactive(): void;
  }


  class MultiDrawBatch {
    readonly pElementPointer: number;
    readonly pElementCount: number;
    readonly pBaseVertex: number;
    size: number;
    constructor(capacity: number);
    capacity(): number;
    clear(): void;
    delete(): void;
    get indexBufferSize(): number;
    isEmpty(): boolean;
    size(): number;
  }


  class RenderDevice {
    static readonly INSTANCE: RenderDevice;
    createCommandList(): CommandList;
    static enterManagedCode(): void;
    static exitManagedCode(): void;
    get capabilities(): GLCapabilities;
    get deviceFunctions(): DeviceFunctions;
    get subTexelPrecisionBits(): number;
    makeActive(): void;
    makeInactive(): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gl.functions' {
  import { Enum } from 'java.lang';
  import { RenderDevice } from 'net.caffeinemc.mods.sodium.client.gl.device';
  import { GlBufferTarget, GlBufferStorageFlags } from 'net.caffeinemc.mods.sodium.client.gl.buffer';
  import { EnumBitField } from 'net.caffeinemc.mods.sodium.client.gl.util';
  import { List } from 'java.util';

  interface BufferStorageFunctions extends Enum<BufferStorageFunctions> {}
  class BufferStorageFunctions extends Enum<BufferStorageFunctions> {
    static readonly NONE: BufferStorageFunctions;
    static readonly CORE: BufferStorageFunctions;
    static readonly ARB: BufferStorageFunctions;
    createBufferStorage(var1: GlBufferTarget, var2: number, var4: EnumBitField<GlBufferStorageFlags>): void;
    static pickBest(device: RenderDevice): BufferStorageFunctions;
    static valueOf(name: string): BufferStorageFunctions;
    static values(): BufferStorageFunctions[];
  }


  class DeviceFunctions {
    constructor(device: RenderDevice);
    get bufferStorageFunctions(): BufferStorageFunctions;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gl' {
  class GlObject {
    handle(): number;
    invalidateHandle(): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gl.shader' {
  import { GlObject } from 'net.caffeinemc.mods.sodium.client.gl';
  import { ShaderBindingContext } from 'net.caffeinemc.mods.sodium.client.render.chunk.shader';
  import { Builder } from 'net.caffeinemc.mods.sodium.client.gl.shader.GlProgram';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IntFunction } from 'java.util.function';
  import { GlUniform, GlUniformBlock } from 'net.caffeinemc.mods.sodium.client.gl.shader.uniform';
  import { List } from 'java.util';
  import { Builder as net_caffeinemc_mods_sodium_client_gl_shader_shaderconstants_Builder } from 'net.caffeinemc.mods.sodium.client.gl.shader.ShaderConstants';
  import { Enum } from 'java.lang';

  interface GlProgram<T = any> extends ShaderBindingContext, GlObject {}
  class GlProgram<T = any> extends ShaderBindingContext {
    bind(): void;
    bindUniform<U extends GlUniform<any>>(name: string, factory: IntFunction<U>): U;
    bindUniformBlock(name: string, bindingPoint: number): GlUniformBlock;
    bindUniformBlockOptional(name: string, bindingPoint: number): GlUniformBlock;
    bindUniformOptional<U extends GlUniform<any>>(name: string, factory: IntFunction<U>): U;
    static builder(name: ResourceLocation): Builder;
    delete(): void;
    get interface(): T;
    unbind(): void;
  }


  interface GlShader extends GlObject {}
  class GlShader extends GlObject {
    constructor(type: ShaderType, name: ResourceLocation, src: string);
    delete(): void;
    get name(): ResourceLocation;
  }


  class ShaderConstants {
    static builder(): net_caffeinemc_mods_sodium_client_gl_shader_shaderconstants_Builder;
    get defineStrings(): string[];
  }


  class ShaderLoader {
    static getShaderSource(name: ResourceLocation): string;
    static loadShader(type: ShaderType, name: ResourceLocation, constants: ShaderConstants): GlShader;
  }


  class ShaderParser {
    static parseShader(src: string, constants: ShaderConstants): string;
    static parseShader(src: string): string[];
  }


  interface ShaderType extends Enum<ShaderType> {}
  class ShaderType extends Enum<ShaderType> {
    static readonly VERTEX: ShaderType;
    static readonly GEOMETRY: ShaderType;
    static readonly TESS_CONTROL: ShaderType;
    static readonly TESS_EVALUATION: ShaderType;
    static readonly FRAGMENT: ShaderType;
    static fromGlShaderType(id: number): ShaderType;
    static valueOf(name: string): ShaderType;
    static values(): ShaderType[];
  }


  class ShaderWorkarounds {
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gl.shader.GlProgram' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { GlShader, GlProgram } from 'net.caffeinemc.mods.sodium.client.gl.shader';
  import { Function } from 'java.util.function';
  import { ShaderBindingContext } from 'net.caffeinemc.mods.sodium.client.render.chunk.shader';

  class Builder {
    constructor(name: ResourceLocation);
    attachShader(shader: GlShader): Builder;
    bindAttribute(name: string, index: number): Builder;
    bindFragmentData(name: string, index: number): Builder;
    link<U>(factory: Function<ShaderBindingContext, U>): GlProgram<U>;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gl.shader.ShaderConstants' {
  import { ShaderConstants } from 'net.caffeinemc.mods.sodium.client.gl.shader';
  import { List } from 'java.util';

  class Builder {
    add(name: string): void;
    add(name: string, value: string): void;
    addAll(defines: string[]): void;
    build(): ShaderConstants;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gl.shader.uniform' {
  import { GlBuffer } from 'net.caffeinemc.mods.sodium.client.gl.buffer';
  import { Float, Integer } from 'java.lang';
  import { Matrix4fc } from 'org.joml';

  class GlUniform<T = any> {
    set(var1: T): void;
  }


  class GlUniformBlock {
    constructor(uniformBlockBinding: number);
    bindBuffer(buffer: GlBuffer): void;
  }


  interface GlUniformFloat extends GlUniform<number> {}
  class GlUniformFloat extends GlUniform<number> {
    constructor(index: number);
    set(value: number): void;
    setFloat(value: number): void;
  }


  interface GlUniformFloat2v extends GlUniform<number[]> {}
  class GlUniformFloat2v extends GlUniform<number[]> {
    constructor(index: number);
    set(value: number[]): void;
    set(x: number, y: number): void;
  }


  interface GlUniformFloat3v extends GlUniform<number[]> {}
  class GlUniformFloat3v extends GlUniform<number[]> {
    constructor(index: number);
    set(value: number[]): void;
    set(x: number, y: number, z: number): void;
  }


  interface GlUniformFloat4v extends GlUniform<number[]> {}
  class GlUniformFloat4v extends GlUniform<number[]> {
    constructor(index: number);
    set(value: number[]): void;
  }


  interface GlUniformInt extends GlUniform<number> {}
  class GlUniformInt extends GlUniform<number> {
    constructor(index: number);
    set(value: number): void;
    setInt(value: number): void;
  }


  interface GlUniformMatrix4f extends GlUniform<Matrix4fc> {}
  class GlUniformMatrix4f extends GlUniform<Matrix4fc> {
    constructor(index: number);
    set(value: Matrix4fc): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gl.state' {
  import { GlVertexArray } from 'net.caffeinemc.mods.sodium.client.gl.array';
  import { GlBuffer, GlBufferTarget } from 'net.caffeinemc.mods.sodium.client.gl.buffer';

  class GlStateTracker {
    clear(): void;
    makeBufferActive(target: GlBufferTarget, buffer: GlBuffer): boolean;
    makeVertexArrayActive(array: GlVertexArray): boolean;
    notifyBufferDeleted(buffer: GlBuffer): void;
    notifyVertexArrayDeleted(vertexArray: GlVertexArray): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gl.sync' {
  class GlFence {
    constructor(id: number);
    delete(): void;
    isCompleted(): boolean;
    sync(): void;
    sync(timeout: number): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gl.tessellation' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { CommandList } from 'net.caffeinemc.mods.sodium.client.gl.device';
  import { GlVertexArray } from 'net.caffeinemc.mods.sodium.client.gl.array';

  interface GlAbstractTessellation extends GlTessellation {}
  class GlAbstractTessellation extends GlTessellation {
    get primitiveType(): GlPrimitiveType;
  }


  interface GlIndexType extends Enum<GlIndexType> {}
  class GlIndexType extends Enum<GlIndexType> {
    static readonly UNSIGNED_BYTE: GlIndexType;
    static readonly UNSIGNED_SHORT: GlIndexType;
    static readonly UNSIGNED_INT: GlIndexType;
    get formatId(): number;
    get stride(): number;
    static valueOf(name: string): GlIndexType;
    static values(): GlIndexType[];
  }


  interface GlPrimitiveType extends Enum<GlPrimitiveType> {}
  class GlPrimitiveType extends Enum<GlPrimitiveType> {
    static readonly POINTS: GlPrimitiveType;
    static readonly LINES: GlPrimitiveType;
    static readonly TRIANGLES: GlPrimitiveType;
    static readonly PATCHES: GlPrimitiveType;
    get id(): number;
    static valueOf(name: string): GlPrimitiveType;
    static values(): GlPrimitiveType[];
  }


  class GlTessellation {
    bind(var1: CommandList): void;
    delete(var1: CommandList): void;
    get primitiveType(): GlPrimitiveType;
    unbind(var1: CommandList): void;
  }


  interface GlVertexArrayTessellation extends GlAbstractTessellation {}
  class GlVertexArrayTessellation extends GlAbstractTessellation {
    constructor(array: GlVertexArray, primitiveType: GlPrimitiveType, bindings: TessellationBinding[]);
    bind(commandList: CommandList): void;
    delete(commandList: CommandList): void;
    init(commandList: CommandList): void;
    unbind(commandList: CommandList): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gl.util' {
  import { Enum } from 'java.lang';

  class EnumBit {
    get bits(): number;
  }


  class EnumBitField<T extends Enum<T> = any> {
    contains(flag: T): boolean;
    get bitField(): number;
    static of<T extends Enum<T>>(...values: T[]): EnumBitField<T>;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gui.console' {
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Console } from 'net.caffeinemc.mods.sodium.client.console';

  class ConsoleHooks {
    static render(graphics: GuiGraphics, currentTime: number): void;
  }


  class ConsoleRenderer {
    draw(context: GuiGraphics): void;
    update(console: Console, currentTime: number): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gui.options.binding.compat' {
  import { OptionBinding } from 'net.caffeinemc.mods.sodium.client.gui.options.binding';
  import { Options, OptionInstance } from 'net.minecraft.client';
  import { Boolean } from 'java.lang';

  interface VanillaBooleanOptionBinding extends OptionBinding<Options, boolean> {}
  class VanillaBooleanOptionBinding extends OptionBinding<Options, boolean> {
    constructor(option: OptionInstance<boolean>);
    getValue(storage: Options): boolean;
    setValue(storage: Options, value: boolean): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gui.options.binding' {
  import { BiConsumer, Function } from 'java.util.function';

  interface GenericBinding<S = any, T = any> extends OptionBinding<S, T> {}
  class GenericBinding<S = any, T = any> extends OptionBinding<S, T> {
    constructor(setter: BiConsumer<S, T>, getter: Function<S, T>);
    getValue(storage: S): T;
    setValue(storage: S, value: T): void;
  }


  class OptionBinding<S = any, T = any> {
    getValue(var1: S): T;
    setValue(var1: S, var2: T): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gui.options.control' {
  import { Option } from 'net.caffeinemc.mods.sodium.client.gui.options';
  import { Dim2i } from 'net.caffeinemc.mods.sodium.client.util';
  import { AbstractWidget } from 'net.caffeinemc.mods.sodium.client.gui.widgets';
  import { GuiGraphics, ComponentPath } from 'net.minecraft.client.gui';
  import { FocusNavigationEvent, ScreenRectangle } from 'net.minecraft.client.gui.navigation';
  import { Component } from 'net.minecraft.network.chat';
  import { Class, Integer, Boolean } from 'java.lang';

  class Control<T = any> {
    createElement(var1: Dim2i): ControlElement<T>;
    get maxWidth(): number;
    get option(): Option<T>;
  }


  interface ControlElement<T = any> extends AbstractWidget {}
  class ControlElement<T = any> extends AbstractWidget {
    constructor(option: Option<T>, dim: Dim2i);
    get contentWidth(): number;
    get dimensions(): Dim2i;
    get option(): Option<T>;
    get rectangle(): ScreenRectangle;
    nextFocusPath(event: FocusNavigationEvent): ComponentPath;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }


  class ControlValueFormatter {
    static biomeBlend(): ControlValueFormatter;
    static brightness(): ControlValueFormatter;
    format(var1: number): Component;
    static fpsLimit(): ControlValueFormatter;
    static guiScale(): ControlValueFormatter;
    static multiplier(): ControlValueFormatter;
    static number(): ControlValueFormatter;
    static percentage(): ControlValueFormatter;
    static quantityOrDisabled(name: string, disableText: string): ControlValueFormatter;
    static resolution(): ControlValueFormatter;
    static translateVariable(key: string): ControlValueFormatter;
  }


  interface CyclingControl<T extends Enum<T> = any> extends Control<T> {}
  class CyclingControl<T extends Enum<T> = any> extends Control<T> {
    constructor(option: Option<T>, enumType: Class<T>);

    constructor(option: Option<T>, enumType: Class<T>, names: Component[]);

    constructor(option: Option<T>, enumType: Class<T>, allowedValues: T[]);
    createElement(dim: Dim2i): ControlElement<T>;
    get maxWidth(): number;
    get option(): Option<T>;
  }


  interface SliderControl extends Control<number> {}
  class SliderControl extends Control<number> {
    constructor(option: Option<number>, min: number, max: number, interval: number, mode: ControlValueFormatter);
    createElement(dim: Dim2i): ControlElement<number>;
    get maxWidth(): number;
    get option(): Option<number>;
  }


  interface TickBoxControl extends Control<boolean> {}
  class TickBoxControl extends Control<boolean> {
    constructor(option: Option<boolean>);
    createElement(dim: Dim2i): ControlElement<boolean>;
    get maxWidth(): number;
    get option(): Option<boolean>;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gui.options' {
  import { Component } from 'net.minecraft.network.chat';
  import { Control } from 'net.caffeinemc.mods.sodium.client.gui.options.control';
  import { OptionStorage } from 'net.caffeinemc.mods.sodium.client.gui.options.storage';
  import { Collection, List } from 'java.util';
  import { Enum } from 'java.lang';
  import { Builder } from 'net.caffeinemc.mods.sodium.client.gui.options.OptionGroup';
  import { ImmutableList } from 'com.google.common.collect';

  class Option<T = any> {
    applyChanges(): void;
    get control(): Control<T>;
    get flags(): Collection<OptionFlag>;
    get impact(): OptionImpact;
    get name(): Component;
    get storage(): OptionStorage<any>;
    get tooltip(): Component;
    get value(): T;
    hasChanged(): boolean;
    isAvailable(): boolean;
    reset(): void;
    set value(var1: T);
  }


  interface OptionFlag extends Enum<OptionFlag> {}
  class OptionFlag extends Enum<OptionFlag> {
    static readonly REQUIRES_RENDERER_RELOAD: OptionFlag;
    static readonly REQUIRES_RENDERER_UPDATE: OptionFlag;
    static readonly REQUIRES_ASSET_RELOAD: OptionFlag;
    static readonly REQUIRES_VIDEOMODE_RELOAD: OptionFlag;
    static readonly REQUIRES_GAME_RESTART: OptionFlag;
    static valueOf(name: string): OptionFlag;
    static values(): OptionFlag[];
  }


  class OptionGroup {
    static createBuilder(): Builder;
    get options(): ImmutableList<Option<any>>;
  }


  interface OptionImpact extends Enum<OptionImpact> {}
  class OptionImpact extends Enum<OptionImpact> {
    static readonly LOW: OptionImpact;
    static readonly MEDIUM: OptionImpact;
    static readonly HIGH: OptionImpact;
    static readonly VARIES: OptionImpact;
    get localizedName(): Component;
    static valueOf(name: string): OptionImpact;
    static values(): OptionImpact[];
  }


  class OptionPage {
    constructor(name: Component, groups: ImmutableList<OptionGroup>);
    get groups(): ImmutableList<OptionGroup>;
    get name(): Component;
    get options(): ImmutableList<Option<any>>;
  }


  class TextProvider {
    get localizedName(): Component;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gui.options.OptionGroup' {
  import { Option, OptionGroup } from 'net.caffeinemc.mods.sodium.client.gui.options';

  class Builder {
    add(option: Option<any>): Builder;
    build(): OptionGroup;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gui.options.OptionImpl' {
  import { Component } from 'net.minecraft.network.chat';
  import { BiConsumer, Function, BooleanSupplier } from 'java.util.function';
  import { OptionBinding } from 'net.caffeinemc.mods.sodium.client.gui.options.binding';
  import { OptionImpl, OptionImpact, OptionFlag } from 'net.caffeinemc.mods.sodium.client.gui.options';
  import { Control } from 'net.caffeinemc.mods.sodium.client.gui.options.control';

  class Builder<S = any, T = any> {
    build(): OptionImpl<S, T>;
    setBinding(setter: BiConsumer<S, T>, getter: Function<S, T>): Builder<S, T>;
    setBinding(binding: OptionBinding<S, T>): Builder<S, T>;
    setControl(control: Function<OptionImpl<S, T>, Control<T>>): Builder<S, T>;
    setEnabled(value: BooleanSupplier): Builder<S, T>;
    setFlags(...flags: OptionFlag[]): Builder<S, T>;
    setImpact(impact: OptionImpact): Builder<S, T>;
    setName(name: Component): Builder<S, T>;
    setTooltip(tooltip: Component): Builder<S, T>;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gui.options.storage' {
  import { Options } from 'net.minecraft.client';
  import { SodiumGameOptions } from 'net.caffeinemc.mods.sodium.client.gui';

  interface MinecraftOptionsStorage extends OptionStorage<Options> {}
  class MinecraftOptionsStorage extends OptionStorage<Options> {
    get data(): Options;
    save(): void;
  }


  class OptionStorage<T = any> {
    get data(): T;
    save(): void;
  }


  interface SodiumOptionsStorage extends OptionStorage<SodiumGameOptions> {}
  class SodiumOptionsStorage extends OptionStorage<SodiumGameOptions> {
    get data(): SodiumGameOptions;
    save(): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gui.prompt' {
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { List } from 'java.util';
  import { FormattedText } from 'net.minecraft.network.chat';
  import { Action } from 'net.caffeinemc.mods.sodium.client.gui.prompt.ScreenPrompt';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { AbstractWidget } from 'net.caffeinemc.mods.sodium.client.gui.widgets';
  import { Dim2i } from 'net.caffeinemc.mods.sodium.client.util';

  interface ScreenPrompt extends GuiEventListener, Renderable {}
  class ScreenPrompt extends GuiEventListener {
    constructor(parent: ScreenPromptable, text: FormattedText[], width: number, height: number, action: Action);
    get widgets(): AbstractWidget[];
    init(): void;
    isFocused(): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    setFocused(focused: boolean): void;
  }


  class ScreenPromptable {
    get dimensions(): Dim2i;
    get prompt(): ScreenPrompt;
    set prompt(var1: ScreenPrompt);
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gui.screen' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Function } from 'java.util.function';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface ConfigCorruptedScreen extends Screen {}
  class ConfigCorruptedScreen extends Screen {
    constructor(prevScreen: Screen, nextScreen: Function<Screen, Screen>);
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gui' {
  import { OptionPage } from 'net.caffeinemc.mods.sodium.client.gui.options';
  import { QualitySettings, AdvancedSettings, PerformanceSettings, NotificationSettings, DebugSettings } from 'net.caffeinemc.mods.sodium.client.gui.SodiumGameOptions';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ScreenPromptable, ScreenPrompt } from 'net.caffeinemc.mods.sodium.client.gui.prompt';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { Dim2i } from 'net.caffeinemc.mods.sodium.client.util';

  class SodiumGameOptionPages {
    static advanced(): OptionPage;
    static general(): OptionPage;
    static performance(): OptionPage;
    static quality(): OptionPage;
  }


  class SodiumGameOptions {
    readonly quality: QualitySettings;
    readonly advanced: AdvancedSettings;
    readonly performance: PerformanceSettings;
    readonly notifications: NotificationSettings;
    debug: DebugSettings;
    static defaults(): SodiumGameOptions;
    isReadOnly(): boolean;
    static loadFromDisk(): SodiumGameOptions;
    setReadOnly(): void;
    static writeToDisk(config: SodiumGameOptions): void;
  }


  interface SodiumOptionsGUI extends ScreenPromptable, Screen {}
  class SodiumOptionsGUI extends ScreenPromptable {
    children(): GuiEventListener[];
    static createScreen(currentScreen: Screen): Screen;
    get dimensions(): Dim2i;
    get prompt(): ScreenPrompt;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    onClose(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    set prompt(prompt: ScreenPrompt);
    setPage(page: OptionPage): void;
    shouldCloseOnEsc(): boolean;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gui.SodiumGameOptions' {
  import { SortBehavior } from 'net.caffeinemc.mods.sodium.client.render.chunk.translucent_sorting';
  import { Enum } from 'java.lang';
  import { Component } from 'net.minecraft.network.chat';
  import { GraphicsStatus } from 'net.minecraft.client';
  import { List } from 'java.util';

  class QualitySettings {
    weatherQuality: GraphicsQuality;
    leavesQuality: GraphicsQuality;
    enableVignette: boolean;
  }


  class AdvancedSettings {
    enableMemoryTracing: boolean;
    useAdvancedStagingBuffers: boolean;
    cpuRenderAheadLimit: number;
  }


  class PerformanceSettings {
    chunkBuilderThreads: number;
    alwaysDeferChunkUpdates: boolean;
    animateOnlyVisibleTextures: boolean;
    useEntityCulling: boolean;
    useFogOcclusion: boolean;
    useBlockFaceCulling: boolean;
    useNoErrorGLContext: boolean;
  }


  class NotificationSettings {
    hasClearedDonationButton: boolean;
    hasSeenDonationPrompt: boolean;
  }


  class DebugSettings {
    terrainSortingEnabled: boolean;
    get sortBehavior(): SortBehavior;
  }


  interface GraphicsQuality extends Enum<GraphicsQuality> {}
  class GraphicsQuality extends Enum<GraphicsQuality> {
    static readonly DEFAULT: GraphicsQuality;
    static readonly FANCY: GraphicsQuality;
    static readonly FAST: GraphicsQuality;
    get localizedName(): Component;
    isFancy(graphicsStatus: GraphicsStatus): boolean;
    static valueOf(name: string): GraphicsQuality;
    static values(): GraphicsQuality[];
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gui.widgets' {
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { NarratableEntry, NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { NarrationPriority } from 'NarratableEntry';
  import { ComponentPath, GuiGraphics } from 'net.minecraft.client.gui';
  import { FocusNavigationEvent, ScreenRectangle } from 'net.minecraft.client.gui.navigation';
  import { Dim2i } from 'net.caffeinemc.mods.sodium.client.util';
  import { Component } from 'net.minecraft.network.chat';
  import { Runnable } from 'java.lang';
  import { Style } from 'net.caffeinemc.mods.sodium.client.gui.widgets.FlatButtonWidget';

  interface AbstractWidget extends Renderable, GuiEventListener, NarratableEntry {}
  class AbstractWidget extends Renderable {
    isFocused(): boolean;
    isHovered(): boolean;
    narrationPriority(): NarrationPriority;
    nextFocusPath(event: FocusNavigationEvent): ComponentPath;
    setFocused(focused: boolean): void;
    updateNarration(builder: NarrationElementOutput): void;
  }


  interface FlatButtonWidget extends Renderable, AbstractWidget {}
  class FlatButtonWidget extends Renderable {
    constructor(dim: Dim2i, label: Component, action: Runnable);
    get label(): Component;
    get rectangle(): ScreenRectangle;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    nextFocusPath(event: FocusNavigationEvent): ComponentPath;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    set label(text: Component);
    setEnabled(enabled: boolean): void;
    setSelected(selected: boolean): void;
    setStyle(style: Style): void;
    setVisible(visible: boolean): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.gui.widgets.FlatButtonWidget' {
  class Style {
    bgHovered: number;
    bgDefault: number;
    bgDisabled: number;
    textDefault: number;
    textDisabled: number;
    static defaults(): Style;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.model.color' {
  import { LevelSlice } from 'net.caffeinemc.mods.sodium.client.world';
  import { BlockPos } from 'net.minecraft.core';
  import { MutableBlockPos } from 'BlockPos';
  import { ModelQuadView } from 'net.caffeinemc.mods.sodium.client.model.quad';
  import { BlockColors, BlockColor } from 'net.minecraft.client.color.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Block } from 'net.minecraft.world.level.block';
  import { FluidState, Fluid } from 'net.minecraft.world.level.material';

  class ColorProvider<T = any> {
    getColors(var1: LevelSlice, var2: BlockPos, var3: MutableBlockPos, var4: T, var5: ModelQuadView, var6: number[]): void;
  }


  class ColorProviderRegistry {
    constructor(blockColors: BlockColors);
    getColorProvider(block: Block): ColorProvider<BlockState>;
    getColorProvider(fluid: Fluid): ColorProvider<FluidState>;
  }


  class DefaultColorProviders {
    static adapt(color: BlockColor): ColorProvider<BlockState>;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.model.color.DefaultColorProviders' {
  import { BlendedColorProvider } from 'net.caffeinemc.mods.sodium.client.model.quad.blender';
  import { ColorProvider } from 'net.caffeinemc.mods.sodium.client.model.color';

  interface FoliageColorProvider<T = any> extends BlendedColorProvider<T> {}
  class FoliageColorProvider<T = any> extends BlendedColorProvider<T> {
    static readonly BLOCKS: ColorProvider;
  }


  interface GrassColorProvider<T = any> extends BlendedColorProvider<T> {}
  class GrassColorProvider<T = any> extends BlendedColorProvider<T> {
    static readonly BLOCKS: ColorProvider;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.model.color.interop' {
  import { Reference2ReferenceMap, ReferenceSet } from 'it.unimi.dsi.fastutil.objects';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockColor, BlockColors } from 'net.minecraft.client.color.block';
  import { ItemColor } from 'net.minecraft.client.color.item';
  import { ItemStack } from 'net.minecraft.world.item';

  class BlockColorsExtension {
    static getOverridenVanillaBlocks(blockColors: BlockColors): ReferenceSet<Block>;
    static getProviders(blockColors: BlockColors): Reference2ReferenceMap<Block, BlockColor>;
    sodium$getOverridenVanillaBlocks(): ReferenceSet<Block>;
    sodium$getProviders(): Reference2ReferenceMap<Block, BlockColor>;
  }


  class ItemColorsExtension {
    sodium$getColorProvider(var1: ItemStack): ItemColor;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.model.light.data' {
  import { BlockAndTintGetter } from 'net.minecraft.world.level';
  import { SectionPos, Direction, BlockPos } from 'net.minecraft.core';

  interface ArrayLightDataCache extends LightDataAccess {}
  class ArrayLightDataCache extends LightDataAccess {
    constructor(level: BlockAndTintGetter);
    get(x: number, y: number, z: number): number;
    get(x: number, y: number, z: number, d1: Direction, d2: Direction): number;
    get(x: number, y: number, z: number, dir: Direction): number;
    get(pos: BlockPos, dir: Direction): number;
    get(pos: BlockPos): number;
    reset(origin: SectionPos): void;
  }


  interface HashLightDataCache extends LightDataAccess {}
  class HashLightDataCache extends LightDataAccess {
    constructor(level: BlockAndTintGetter);
    clearCache(): void;
    get(x: number, y: number, z: number): number;
    get(x: number, y: number, z: number, d1: Direction, d2: Direction): number;
    get(x: number, y: number, z: number, dir: Direction): number;
    get(pos: BlockPos, dir: Direction): number;
    get(pos: BlockPos): number;
  }


  class LightDataAccess {
    get(x: number, y: number, z: number, d1: Direction, d2: Direction): number;
    get(x: number, y: number, z: number, dir: Direction): number;
    get(pos: BlockPos, dir: Direction): number;
    get(pos: BlockPos): number;
    get(var1: number, var2: number, var3: number): number;
    get level(): BlockAndTintGetter;
    static getEmissiveLightmap(word: number): number;
    static getLightmap(word: number): number;
    static packAO(ao: number): number;
    static packBL(blockLight: number): number;
    static packEM(emissive: boolean): number;
    static packFC(fullCube: boolean): number;
    static packFO(opaque: boolean): number;
    static packLU(luminance: number): number;
    static packOP(opaque: boolean): number;
    static packSL(skyLight: number): number;
    static unpackAO(word: number): number;
    static unpackBL(word: number): number;
    static unpackEM(word: number): boolean;
    static unpackFC(word: number): boolean;
    static unpackFO(word: number): boolean;
    static unpackLU(word: number): number;
    static unpackOP(word: number): boolean;
    static unpackSL(word: number): number;
  }


  class QuadLightData {
    readonly br: number[];
    readonly lm: number[];
  }


  interface SingleBlockLightDataCache extends LightDataAccess {}
  class SingleBlockLightDataCache extends LightDataAccess {
    get(x: number, y: number, z: number): number;
    get(x: number, y: number, z: number, d1: Direction, d2: Direction): number;
    get(x: number, y: number, z: number, dir: Direction): number;
    get(pos: BlockPos, dir: Direction): number;
    get(pos: BlockPos): number;
    release(): void;
    reset(origin: BlockPos, blockView: BlockAndTintGetter): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.model.light.flat' {
  import { LightPipeline } from 'net.caffeinemc.mods.sodium.client.model.light';
  import { LightDataAccess, QuadLightData } from 'net.caffeinemc.mods.sodium.client.model.light.data';
  import { ModelQuadView } from 'net.caffeinemc.mods.sodium.client.model.quad';
  import { BlockPos, Direction } from 'net.minecraft.core';

  interface FlatLightPipeline extends LightPipeline {}
  class FlatLightPipeline extends LightPipeline {
    constructor(lightCache: LightDataAccess);
    calculate(quad: ModelQuadView, pos: BlockPos, out: QuadLightData, cullFace: Direction, lightFace: Direction, shade: boolean, enhanced: boolean): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.model.light' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { ModelQuadView } from 'net.caffeinemc.mods.sodium.client.model.quad';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { QuadLightData, LightDataAccess } from 'net.caffeinemc.mods.sodium.client.model.light.data';

  interface LightMode extends Enum<LightMode> {}
  class LightMode extends Enum<LightMode> {
    static readonly SMOOTH: LightMode;
    static readonly FLAT: LightMode;
    static valueOf(name: string): LightMode;
    static values(): LightMode[];
  }


  class LightPipeline {
    calculate(var1: ModelQuadView, var2: BlockPos, var3: QuadLightData, var4: Direction, var5: Direction, var6: boolean, var7: boolean): void;
  }


  class LightPipelineProvider {
    constructor(cache: LightDataAccess);
    getLighter(type: LightMode): LightPipeline;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.model.light.smooth' {
  import { LightDataAccess, QuadLightData } from 'net.caffeinemc.mods.sodium.client.model.light.data';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { LightPipeline } from 'net.caffeinemc.mods.sodium.client.model.light';
  import { ModelQuadView } from 'net.caffeinemc.mods.sodium.client.model.quad';

  class AoCompletionFlags {
    static readonly HAS_LIGHT_DATA: number;
    static readonly HAS_UNPACKED_LIGHT_DATA: number;
  }


  class AoFaceData {
    readonly lm: number[];
    readonly ao: number[];
    readonly bl: number[];
    readonly sl: number[];
    getBlendedBlockLight(w: number[]): number;
    getBlendedShade(w: number[]): number;
    getBlendedSkyLight(w: number[]): number;
    hasLightData(): boolean;
    hasUnpackedLightData(): boolean;
    initLightData(cache: LightDataAccess, pos: BlockPos, direction: Direction, offset: boolean): void;
    reset(): void;
    unpackLightData(): void;
  }


  interface AoNeighborInfo extends Enum<AoNeighborInfo> {}
  class AoNeighborInfo extends Enum<AoNeighborInfo> {
    static readonly DOWN: AoNeighborInfo;
    static readonly UP: AoNeighborInfo;
    static readonly NORTH: AoNeighborInfo;
    static readonly SOUTH: AoNeighborInfo;
    static readonly WEST: AoNeighborInfo;
    static readonly EAST: AoNeighborInfo;
    calculateCornerWeights(var1: number, var2: number, var3: number, var4: number[]): void;
    static get(direction: Direction): AoNeighborInfo;
    getDepth(var1: number, var2: number, var3: number): number;
    mapCorners(var1: number[], var2: number[], var3: number[], var4: number[]): void;
    static valueOf(name: string): AoNeighborInfo;
    static values(): AoNeighborInfo[];
  }


  interface SmoothLightPipeline extends LightPipeline {}
  class SmoothLightPipeline extends LightPipeline {
    constructor(cache: LightDataAccess);
    calculate(quad: ModelQuadView, pos: BlockPos, out: QuadLightData, cullFace: Direction, lightFace: Direction, shade: boolean, enhanced: boolean): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.model.quad' {
  import { ModelQuadFacing } from 'net.caffeinemc.mods.sodium.client.model.quad.properties';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { Direction } from 'net.minecraft.core';

  interface BakedQuadView extends ModelQuadView {}
  class BakedQuadView extends ModelQuadView {
    get faceNormal(): number;
    get normalFace(): ModelQuadFacing;
    hasAO(): boolean;
    hasShade(): boolean;
  }


  interface ModelQuad extends ModelQuadViewMutable {}
  class ModelQuad extends ModelQuadViewMutable {
    get colorIndex(): number;
    get faceNormal(): number;
    get flags(): number;
    get lightFace(): Direction;
    get sprite(): TextureAtlasSprite;
    getColor(idx: number): number;
    getLight(idx: number): number;
    getTexU(idx: number): number;
    getTexV(idx: number): number;
    getVertexNormal(idx: number): number;
    getX(idx: number): number;
    getY(idx: number): number;
    getZ(idx: number): number;
    set colorIndex(index: number);
    set faceNormal(normal: number);
    set flags(flags: number);
    set lightFace(direction: Direction);
    set sprite(sprite: TextureAtlasSprite);
    setColor(idx: number, color: number): void;
    setLight(idx: number, light: number): void;
    setNormal(idx: number, normal: number): void;
    setTexU(idx: number, u: number): void;
    setTexV(idx: number, v: number): void;
    setX(idx: number, x: number): void;
    setY(idx: number, y: number): void;
    setZ(idx: number, z: number): void;
  }


  class ModelQuadView {
    calculateNormal(): number;
    get colorIndex(): number;
    get faceNormal(): number;
    get flags(): number;
    get lightFace(): Direction;
    get sprite(): TextureAtlasSprite;
    getAccurateNormal(i: number): number;
    getColor(var1: number): number;
    getLight(var1: number): number;
    getTexU(var1: number): number;
    getTexV(var1: number): number;
    getVertexNormal(var1: number): number;
    getX(var1: number): number;
    getY(var1: number): number;
    getZ(var1: number): number;
    hasColor(): boolean;
  }


  interface ModelQuadViewMutable extends ModelQuadView {}
  class ModelQuadViewMutable extends ModelQuadView {
    setColor(var1: number, var2: number): void;
    setColorIndex(var1: number): void;
    setFaceNormal(var1: number): void;
    setFlags(var1: number): void;
    setLight(var1: number, var2: number): void;
    setLightFace(var1: Direction): void;
    setNormal(var1: number, var2: number): void;
    setSprite(var1: TextureAtlasSprite): void;
    setTexU(var1: number, var2: number): void;
    setTexV(var1: number, var2: number): void;
    setX(var1: number, var2: number): void;
    setY(var1: number, var2: number): void;
    setZ(var1: number, var2: number): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.model.quad.blender' {
  import { ColorProvider } from 'net.caffeinemc.mods.sodium.client.model.color';
  import { LevelSlice } from 'net.caffeinemc.mods.sodium.client.world';
  import { BlockPos } from 'net.minecraft.core';
  import { MutableBlockPos } from 'BlockPos';
  import { ModelQuadView } from 'net.caffeinemc.mods.sodium.client.model.quad';

  interface BlendedColorProvider<T = any> extends ColorProvider<T> {}
  class BlendedColorProvider<T = any> extends ColorProvider<T> {
    getColors(slice: LevelSlice, pos: BlockPos, scratchPos: MutableBlockPos, state: T, quad: ModelQuadView, output: number[]): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.model.quad.properties' {
  import { Enum } from 'java.lang';
  import { Direction } from 'net.minecraft.core';
  import { Vector3fc } from 'org.joml';
  import { List } from 'java.util';
  import { ModelQuadView } from 'net.caffeinemc.mods.sodium.client.model.quad';
  import { QuadView } from 'net.fabricmc.fabric.api.renderer.v1.mesh';

  interface ModelQuadFacing extends Enum<ModelQuadFacing> {}
  class ModelQuadFacing extends Enum<ModelQuadFacing> {
    static readonly POS_X: ModelQuadFacing;
    static readonly POS_Y: ModelQuadFacing;
    static readonly POS_Z: ModelQuadFacing;
    static readonly NEG_X: ModelQuadFacing;
    static readonly NEG_Y: ModelQuadFacing;
    static readonly NEG_Z: ModelQuadFacing;
    static readonly UNASSIGNED: ModelQuadFacing;
    static bitmapHasUnassigned(bitmap: number): boolean;
    static bitmapIsOpposingAligned(bitmap: number): boolean;
    static fromDirection(dir: Direction): ModelQuadFacing;
    static fromNormal(x: number, y: number, z: number): ModelQuadFacing;
    static fromPackedNormal(normal: number): ModelQuadFacing;
    get alignedNormal(): Vector3fc;
    get axis(): number;
    get opposite(): ModelQuadFacing;
    get packedAlignedNormal(): number;
    get sign(): number;
    isAligned(): boolean;
    static valueOf(name: string): ModelQuadFacing;
    static values(): ModelQuadFacing[];
  }


  class ModelQuadFlags {
    static readonly IS_PARTIAL: number;
    static readonly IS_PARALLEL: number;
    static readonly IS_ALIGNED: number;
    static readonly FLAG_BIT_COUNT: number;
    static contains(flags: number, mask: number): boolean;
    static getQuadFlags(quad: ModelQuadView, face: Direction): number;
  }


  interface ModelQuadOrientation extends Enum<ModelQuadOrientation> {}
  class ModelQuadOrientation extends Enum<ModelQuadOrientation> {
    static readonly NORMAL: ModelQuadOrientation;
    static readonly FLIP: ModelQuadOrientation;
    getVertexIndex(idx: number): number;
    static orientByBrightness(brightnesses: number[], lightmaps: number[]): ModelQuadOrientation;
    static orientByBrightness(brightnesses: number[], quad: QuadView): ModelQuadOrientation;
    static valueOf(name: string): ModelQuadOrientation;
    static values(): ModelQuadOrientation[];
  }


  interface ModelQuadWinding extends Enum<ModelQuadWinding> {}
  class ModelQuadWinding extends Enum<ModelQuadWinding> {
    static readonly CLOCKWISE: ModelQuadWinding;
    static readonly COUNTERCLOCKWISE: ModelQuadWinding;
    get indices(): number[];
    static valueOf(name: string): ModelQuadWinding;
    static values(): ModelQuadWinding[];
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk' {
  import { CommandList, RenderDevice } from 'net.caffeinemc.mods.sodium.client.gl.device';
  import { ChunkRenderListIterable, SortedRenderLists } from 'net.caffeinemc.mods.sodium.client.render.chunk.lists';
  import { TerrainRenderPass } from 'net.caffeinemc.mods.sodium.client.render.chunk.terrain';
  import { CameraTransform, Viewport } from 'net.caffeinemc.mods.sodium.client.render.viewport';
  import { Enum } from 'java.lang';
  import { List, Collection } from 'java.util';
  import { ChunkVertexType } from 'net.caffeinemc.mods.sodium.client.render.chunk.vertex.format';
  import { BlockEntityRenderPredicate } from 'net.caffeinemc.mods.sodium.api.blockentity';
  import { BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos, SectionPos } from 'net.minecraft.core';
  import { SectionBufferBuilderPool, SectionBufferBuilderPack } from 'net.minecraft.client.renderer';
  import { RenderRegion } from 'net.caffeinemc.mods.sodium.client.render.chunk.region';
  import { TranslucentData } from 'net.caffeinemc.mods.sodium.client.render.chunk.translucent_sorting.data';
  import { BuiltSectionInfo } from 'net.caffeinemc.mods.sodium.client.render.chunk.data';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { CancellationToken } from 'net.caffeinemc.mods.sodium.client.util.task';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { Vector3dc } from 'org.joml';
  import { Camera } from 'net.minecraft.client';
  import { ChunkBuilderMeshingTask, ChunkBuilderSortingTask } from 'net.caffeinemc.mods.sodium.client.render.chunk.compile.tasks';
  import { CameraMovement } from 'net.caffeinemc.mods.sodium.client.render.chunk.translucent_sorting.trigger';
  import { ChunkBuilder } from 'net.caffeinemc.mods.sodium.client.render.chunk.compile.executor';
  import { IndexType } from 'net.caffeinemc.mods.sodium.client.render.chunk.SharedQuadIndexBuffer';
  import { GlBuffer } from 'net.caffeinemc.mods.sodium.client.gl.buffer';
  import { GlIndexType } from 'net.caffeinemc.mods.sodium.client.gl.tessellation';

  class ChunkRenderer {
    delete(var1: CommandList): void;
    render(var1: ChunkRenderMatrices, var2: CommandList, var3: ChunkRenderListIterable, var4: TerrainRenderPass, var5: CameraTransform): void;
  }


  interface ChunkUpdateType extends Enum<ChunkUpdateType> {}
  class ChunkUpdateType extends Enum<ChunkUpdateType> {
    static readonly SORT: ChunkUpdateType;
    static readonly INITIAL_BUILD: ChunkUpdateType;
    static readonly REBUILD: ChunkUpdateType;
    static readonly IMPORTANT_REBUILD: ChunkUpdateType;
    static readonly IMPORTANT_SORT: ChunkUpdateType;
    get maximumQueueSize(): number;
    get taskEffort(): number;
    static getPromotionUpdateType(prev: ChunkUpdateType, next: ChunkUpdateType): ChunkUpdateType;
    isImportant(): boolean;
    static valueOf(name: string): ChunkUpdateType;
    static values(): ChunkUpdateType[];
  }


  interface DefaultChunkRenderer extends ShaderChunkRenderer {}
  class DefaultChunkRenderer extends ShaderChunkRenderer {
    constructor(device: RenderDevice, vertexType: ChunkVertexType);
    delete(commandList: CommandList): void;
    render(matrices: ChunkRenderMatrices, commandList: CommandList, renderLists: ChunkRenderListIterable, renderPass: TerrainRenderPass, camera: CameraTransform): void;
  }


  class ExtendedBlockEntityType<T extends BlockEntity = any> {
    static addRenderPredicate<T extends BlockEntity>(type: BlockEntityType<T>, predicate: BlockEntityRenderPredicate<T>): void;
    static removeRenderPredicate<T extends BlockEntity>(type: BlockEntityType<T>, predicate: BlockEntityRenderPredicate<T>): boolean;
    static shouldRender<T extends BlockEntity>(type: BlockEntityType<T>, blockGetter: BlockGetter, blockPos: BlockPos, entity: T): boolean;
    sodium$addRenderPredicate(var1: BlockEntityRenderPredicate<T>): void;
    sodium$getRenderPredicates(): BlockEntityRenderPredicate<T>;
    sodium$removeRenderPredicate(var1: BlockEntityRenderPredicate<T>): boolean;
  }


  class LocalSectionIndex {
    static decX(idx: number): number;
    static decY(idx: number): number;
    static decZ(idx: number): number;
    static incX(idx: number): number;
    static incY(idx: number): number;
    static incZ(idx: number): number;
    static pack(x: number, y: number, z: number): number;
    static unpackX(idx: number): number;
    static unpackY(idx: number): number;
    static unpackZ(idx: number): number;
  }


  interface NonStoringBuilderPool extends SectionBufferBuilderPool {}
  class NonStoringBuilderPool extends SectionBufferBuilderPool {
    constructor();
    acquire(): SectionBufferBuilderPack;
    get freeBufferCount(): number;
    isEmpty(): boolean;
    release(blockBufferBuilderStorage: SectionBufferBuilderPack): void;
  }


  class RenderSection {
    adjacentDown: RenderSection;
    adjacentUp: RenderSection;
    adjacentNorth: RenderSection;
    adjacentSouth: RenderSection;
    adjacentWest: RenderSection;
    adjacentEast: RenderSection;
    constructor(region: RenderRegion, chunkX: number, chunkY: number, chunkZ: number);
    addIncomingDirections(directions: number): void;
    delete(): void;
    get adjacentMask(): number;
    get animatedSprites(): TextureAtlasSprite[];
    get centerX(): number;
    get centerY(): number;
    get centerZ(): number;
    get chunkX(): number;
    get chunkY(): number;
    get chunkZ(): number;
    get culledBlockEntities(): BlockEntity[];
    get flags(): number;
    get globalBlockEntities(): BlockEntity[];
    get incomingDirections(): number;
    get lastSubmittedFrame(): number;
    get lastUploadFrame(): number;
    get lastVisibleFrame(): number;
    get originX(): number;
    get originY(): number;
    get originZ(): number;
    get pendingUpdate(): ChunkUpdateType;
    get position(): SectionPos;
    get region(): RenderRegion;
    get sectionIndex(): number;
    get taskCancellationToken(): CancellationToken;
    get translucentData(): TranslucentData;
    get visibilityData(): number;
    getAdjacent(direction: number): RenderSection;
    getSquaredDistance(pos: BlockPos): number;
    getSquaredDistance(x: number, y: number, z: number): number;
    isBuilt(): boolean;
    isDisposed(): boolean;
    prepareTrigger(isDirectTrigger: boolean): void;
    set incomingDirections(directions: number);
    set lastSubmittedFrame(lastSubmittedFrame: number);
    set lastUploadFrame(lastSortFrame: number);
    set lastVisibleFrame(frame: number);
    set pendingUpdate(type: ChunkUpdateType);
    set taskCancellationToken(token: CancellationToken);
    set translucentData(translucentData: TranslucentData);
    setAdjacentNode(direction: number, node: RenderSection): void;
    setInfo(info: BuiltSectionInfo): boolean;
    toString(): string;
  }


  class RenderSectionFlags {
    static readonly HAS_BLOCK_GEOMETRY: number;
    static readonly HAS_BLOCK_ENTITIES: number;
    static readonly HAS_ANIMATED_SPRITES: number;
    static readonly NONE: number;
  }


  class RenderSectionManager {
    constructor(level: ClientLevel, renderDistance: number, commandList: CommandList);
    cleanupAndFlip(): void;
    createRebuildTask(render: RenderSection, frame: number): ChunkBuilderMeshingTask;
    createSortTask(render: RenderSection, frame: number): ChunkBuilderSortingTask;
    destroy(): void;
    get builder(): ChunkBuilder;
    get debugStrings(): Collection<string>;
    get renderLists(): SortedRenderLists;
    get sectionsWithGlobalEntities(): Collection<RenderSection>;
    get totalSections(): number;
    get visibleChunkCount(): number;
    isSectionBuilt(x: number, y: number, z: number): boolean;
    isSectionVisible(x: number, y: number, z: number): boolean;
    markGraphDirty(): void;
    needsUpdate(): boolean;
    onChunkAdded(x: number, z: number): void;
    onChunkRemoved(x: number, z: number): void;
    onSectionAdded(x: number, y: number, z: number): void;
    onSectionRemoved(x: number, y: number, z: number): void;
    processGFNIMovement(movement: CameraMovement): void;
    renderLayer(matrices: ChunkRenderMatrices, pass: TerrainRenderPass, x: number, y: number, z: number): void;
    scheduleRebuild(x: number, y: number, z: number, important: boolean): void;
    scheduleSort(sectionPos: number, isDirectTrigger: boolean): void;
    tickVisibleRenders(): void;
    update(camera: Camera, viewport: Viewport, spectator: boolean): void;
    updateCameraState(cameraPosition: Vector3dc, camera: Camera): void;
    updateChunks(updateImmediately: boolean): void;
    uploadChunks(): void;
  }


  interface ShaderChunkRenderer extends ChunkRenderer {}
  class ShaderChunkRenderer extends ChunkRenderer {
    constructor(device: RenderDevice, vertexType: ChunkVertexType);
    delete(commandList: CommandList): void;
  }


  class SharedQuadIndexBuffer {
    constructor(commandList: CommandList, indexType: IndexType);
    delete(commandList: CommandList): void;
    ensureCapacity(commandList: CommandList, elementCount: number): void;
    get bufferObject(): GlBuffer;
    get indexFormat(): GlIndexType;
    get indexType(): IndexType;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.compile.buffers' {
  import { ChunkMeshBufferBuilder } from 'net.caffeinemc.mods.sodium.client.render.chunk.vertex.builder';
  import { ModelQuadFacing } from 'net.caffeinemc.mods.sodium.client.model.quad.properties';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { Material } from 'net.caffeinemc.mods.sodium.client.render.chunk.terrain.material';
  import { TranslucentGeometryCollector } from 'net.caffeinemc.mods.sodium.client.render.chunk.translucent_sorting';
  import { Builder } from 'net.caffeinemc.mods.sodium.client.render.chunk.data.BuiltSectionInfo';

  interface BakedChunkModelBuilder extends ChunkModelBuilder {}
  class BakedChunkModelBuilder extends ChunkModelBuilder {
    constructor(vertexBuffers: ChunkMeshBufferBuilder[]);
    addSprite(sprite: TextureAtlasSprite): void;
    asFallbackVertexConsumer(material: Material, collector: TranslucentGeometryCollector): VertexConsumer;
    begin(renderData: Builder, sectionIndex: number): void;
    destroy(): void;
    getVertexBuffer(facing: ModelQuadFacing): ChunkMeshBufferBuilder;
  }


  class ChunkModelBuilder {
    addSprite(var1: TextureAtlasSprite): void;
    asFallbackVertexConsumer(var1: Material, var2: TranslucentGeometryCollector): VertexConsumer;
    getVertexBuffer(var1: ModelQuadFacing): ChunkMeshBufferBuilder;
  }


  interface ChunkVertexConsumer extends VertexConsumer {}
  class ChunkVertexConsumer extends VertexConsumer {
    constructor(modelBuilder: ChunkModelBuilder);
    addVertex(x: number, y: number, z: number): VertexConsumer;
    potentiallyEndVertex(): VertexConsumer;
    setColor(red: number, green: number, blue: number, alpha: number): VertexConsumer;
    setColor(red: number, green: number, blue: number, alpha: number): VertexConsumer;
    setColor(argb: number): VertexConsumer;
    setData(material: Material, collector: TranslucentGeometryCollector): void;
    setLight(uv: number): VertexConsumer;
    setNormal(x: number, y: number, z: number): VertexConsumer;
    setOverlay(uv: number): VertexConsumer;
    setUv(u: number, v: number): VertexConsumer;
    setUv1(u: number, v: number): VertexConsumer;
    setUv2(u: number, v: number): VertexConsumer;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.compile' {
  import { RenderSection } from 'net.caffeinemc.mods.sodium.client.render.chunk';
  import { ChunkVertexType } from 'net.caffeinemc.mods.sodium.client.render.chunk.vertex.format';
  import { Builder } from 'net.caffeinemc.mods.sodium.client.render.chunk.data.BuiltSectionInfo';
  import { ChunkModelBuilder } from 'net.caffeinemc.mods.sodium.client.render.chunk.compile.buffers';
  import { Material } from 'net.caffeinemc.mods.sodium.client.render.chunk.terrain.material';
  import { TerrainRenderPass } from 'net.caffeinemc.mods.sodium.client.render.chunk.terrain';
  import { BuiltSectionMeshParts, BuiltSectionInfo } from 'net.caffeinemc.mods.sodium.client.render.chunk.data';
  import { BlockRenderCache } from 'net.caffeinemc.mods.sodium.client.render.chunk.compile.pipeline';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { TranslucentData, SortData, Sorter } from 'net.caffeinemc.mods.sodium.client.render.chunk.translucent_sorting.data';
  import { Map } from 'java.util';
  import { NativeBuffer } from 'net.caffeinemc.mods.sodium.client.util';
  import { DynamicTopoSorter } from 'net.caffeinemc.mods.sodium.client.render.chunk.translucent_sorting.data.DynamicTopoData';

  class BuilderTaskOutput {
    readonly render: RenderSection;
    readonly submitTime: number;
    constructor(render: RenderSection, buildTime: number);
    destroy(): void;
  }


  class ChunkBuildBuffers {
    constructor(vertexType: ChunkVertexType);
    createMesh(pass: TerrainRenderPass, forceUnassigned: boolean): BuiltSectionMeshParts;
    destroy(): void;
    get(material: Material): ChunkModelBuilder;
    get(pass: TerrainRenderPass): ChunkModelBuilder;
    init(renderData: Builder, sectionIndex: number): void;
  }


  class ChunkBuildContext {
    readonly buffers: ChunkBuildBuffers;
    readonly cache: BlockRenderCache;
    constructor(level: ClientLevel, vertexType: ChunkVertexType);
    cleanup(): void;
  }


  interface ChunkBuildOutput extends ChunkSortOutput {}
  class ChunkBuildOutput extends ChunkSortOutput {
    readonly info: BuiltSectionInfo;
    readonly translucentData: TranslucentData;
    readonly meshes: Map;
    constructor(render: RenderSection, buildTime: number, translucentData: TranslucentData, info: BuiltSectionInfo, meshes: Map<TerrainRenderPass, BuiltSectionMeshParts>);
    destroy(): void;
    getMesh(pass: TerrainRenderPass): BuiltSectionMeshParts;
  }


  interface ChunkSortOutput extends SortData, BuilderTaskOutput {}
  class ChunkSortOutput extends SortData {
    constructor(render: RenderSection, buildTime: number);

    constructor(render: RenderSection, buildTime: number, data: Sorter);
    copyResultFrom(sorter: Sorter): void;
    destroy(): void;
    get indexBuffer(): NativeBuffer;
    get topoSorter(): DynamicTopoSorter;
    isReusingUploadedIndexData(): boolean;
    markAsReusingUploadedData(): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.compile.executor' {
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { ChunkVertexType } from 'net.caffeinemc.mods.sodium.client.render.chunk.vertex.format';
  import { Consumer } from 'java.util.function';
  import { ChunkBuilderTask } from 'net.caffeinemc.mods.sodium.client.render.chunk.compile.tasks';
  import { BuilderTaskOutput, ChunkBuildContext } from 'net.caffeinemc.mods.sodium.client.render.chunk.compile';
  import { CancellationToken } from 'net.caffeinemc.mods.sodium.client.util.task';
  import { Collection } from 'java.util';
  import { Throwable } from 'java.lang';

  class ChunkBuilder {
    static readonly HIGH_EFFORT: number;
    static readonly LOW_EFFORT: number;
    static readonly EFFORT_PER_THREAD_PER_FRAME: number;
    constructor(level: ClientLevel, vertexType: ChunkVertexType);
    get busyThreadCount(): number;
    get highEffortSchedulingBudget(): number;
    get lowEffortSchedulingBudget(): number;
    get scheduledEffort(): number;
    get scheduledJobCount(): number;
    get totalThreadCount(): number;
    isBuildQueueEmpty(): boolean;
    scheduleTask<TASK extends ChunkBuilderTask<OUTPUT>, OUTPUT extends BuilderTaskOutput>(task: TASK, important: boolean, consumer: Consumer<ChunkJobResult<OUTPUT>>): ChunkJobTyped<TASK, OUTPUT>;
    shutdown(): void;
    tryStealTask(job: ChunkJob): void;
  }


  interface ChunkJob extends CancellationToken {}
  class ChunkJob extends CancellationToken {
    execute(var1: ChunkBuildContext): void;
    get effort(): number;
    isStarted(): boolean;
  }


  class ChunkJobCollector {
    constructor(collector: Consumer<ChunkJobResult<BuilderTaskOutput>>);

    constructor(highEffortBudget: number, lowEffortBudget: number, collector: Consumer<ChunkJobResult<BuilderTaskOutput>>);
    addSubmittedJob(job: ChunkJob): void;
    awaitCompletion(builder: ChunkBuilder): void;
    hasBudgetFor(effort: number, ignoreEffortCategory: boolean): boolean;
    onJobFinished(result: ChunkJobResult<BuilderTaskOutput>): void;
  }


  class ChunkJobQueue {
    add(job: ChunkJob, important: boolean): void;
    get effortSum(): number;
    isEmpty(): boolean;
    isRunning(): boolean;
    shutdown(): Collection<ChunkJob>;
    size(): number;
    stealJob(job: ChunkJob): boolean;
    waitForNextJob(): ChunkJob;
  }


  class ChunkJobResult<OUTPUT = any> {
    static exceptionally<OUTPUT>(throwable: Throwable): ChunkJobResult<OUTPUT>;
    static successfully<OUTPUT>(output: OUTPUT): ChunkJobResult<OUTPUT>;
    unwrap(): OUTPUT;
  }


  interface ChunkJobTyped<TASK extends ChunkBuilderTask<OUTPUT> = any, OUTPUT extends BuilderTaskOutput = any> extends ChunkJob {}
  class ChunkJobTyped<TASK extends ChunkBuilderTask<OUTPUT> = any, OUTPUT extends BuilderTaskOutput = any> extends ChunkJob {
    execute(context: ChunkBuildContext): void;
    get effort(): number;
    isCancelled(): boolean;
    isStarted(): boolean;
    setCancelled(): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.compile.pipeline' {
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { VoxelShape } from 'net.minecraft.world.phys.shapes';
  import { Minecraft } from 'net.minecraft.client';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { BlockModelShaper } from 'net.minecraft.client.renderer.block';
  import { ChunkRenderContext } from 'net.caffeinemc.mods.sodium.client.world.cloned';
  import { LevelSlice } from 'net.caffeinemc.mods.sodium.client.world';
  import { TranslucentGeometryCollector } from 'net.caffeinemc.mods.sodium.client.render.chunk.translucent_sorting';
  import { BakedModel } from 'net.minecraft.client.resources.model';
  import { Vector3fc } from 'org.joml';
  import { AbstractBlockRenderContext } from 'net.caffeinemc.mods.sodium.client.render.frapi.render';
  import { ColorProviderRegistry, ColorProvider } from 'net.caffeinemc.mods.sodium.client.model.color';
  import { LightPipelineProvider } from 'net.caffeinemc.mods.sodium.client.model.light';
  import { ChunkBuildBuffers } from 'net.caffeinemc.mods.sodium.client.render.chunk.compile';
  import { ChunkModelBuilder } from 'net.caffeinemc.mods.sodium.client.render.chunk.compile.buffers';
  import { Material } from 'net.caffeinemc.mods.sodium.client.render.chunk.terrain.material';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';

  class BlockOcclusionCache {
    constructor();
    shouldDrawFullBlockFluidSide(selfBlockState: BlockState, view: BlockGetter, selfPos: BlockPos, facing: Direction, fluid: FluidState, fluidShape: VoxelShape): boolean;
    shouldDrawSide(selfState: BlockState, view: BlockGetter, selfPos: BlockPos, facing: Direction): boolean;
  }


  class BlockRenderCache {
    constructor(minecraft: Minecraft, level: ClientLevel);
    cleanup(): void;
    get blockModels(): BlockModelShaper;
    get blockRenderer(): BlockRenderer;
    get fluidRenderer(): FluidRenderer;
    get worldSlice(): LevelSlice;
    init(context: ChunkRenderContext): void;
  }


  class BlockRenderContext {
    readonly collector: TranslucentGeometryCollector;
    constructor(slice: LevelSlice, collector: TranslucentGeometryCollector);
    collector(): TranslucentGeometryCollector;
    model(): BakedModel;
    origin(): Vector3fc;
    pos(): BlockPos;
    seed(): number;
    slice(): LevelSlice;
    state(): BlockState;
    update(pos: BlockPos, origin: BlockPos, state: BlockState, model: BakedModel, seed: number): void;
  }


  interface BlockRenderer extends AbstractBlockRenderContext {}
  class BlockRenderer extends AbstractBlockRenderContext {
    constructor(colorRegistry: ColorProviderRegistry, lighters: LightPipelineProvider);
    prepare(buffers: ChunkBuildBuffers, level: LevelSlice, collector: TranslucentGeometryCollector): void;
    release(): void;
    renderModel(model: BakedModel, state: BlockState, pos: BlockPos, origin: BlockPos): void;
  }


  class DefaultFluidRenderer {
    static readonly EPSILON: number;
    constructor(lighters: LightPipelineProvider);
    render(level: LevelSlice, blockState: BlockState, fluidState: FluidState, blockPos: BlockPos, offset: BlockPos, collector: TranslucentGeometryCollector, meshBuilder: ChunkModelBuilder, material: Material, colorProvider: ColorProvider<FluidState>, sprites: TextureAtlasSprite[]): void;
  }


  class FluidRenderer {
    render(var1: LevelSlice, var2: BlockState, var3: FluidState, var4: BlockPos, var5: BlockPos, var6: TranslucentGeometryCollector, var7: ChunkBuildBuffers): void;
  }


  class SpriteContentsExtension {
    sodium$hasTranslucentPixels(): boolean;
    sodium$hasTransparentPixels(): boolean;
  }


  class TextureAtlasSpriteExtension {
    sodium$hasUnknownImageContents(): boolean;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.compile.pipeline.BlockOcclusionCache.ShapeComparison' {
  import { Strategy } from 'Hash';
  import { ShapeComparison } from 'net.caffeinemc.mods.sodium.client.render.chunk.compile.pipeline.BlockOcclusionCache';

  interface ShapeComparisonStrategy extends Strategy<ShapeComparison> {}
  class ShapeComparisonStrategy extends Strategy<ShapeComparison> {
    equals(a: ShapeComparison, b: ShapeComparison): boolean;
    hashCode(value: ShapeComparison): number;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.compile.tasks' {
  import { ChunkBuildOutput, ChunkBuildContext, ChunkSortOutput } from 'net.caffeinemc.mods.sodium.client.render.chunk.compile';
  import { RenderSection } from 'net.caffeinemc.mods.sodium.client.render.chunk';
  import { Vector3dc, Vector3fc } from 'org.joml';
  import { ChunkRenderContext } from 'net.caffeinemc.mods.sodium.client.world.cloned';
  import { CancellationToken } from 'net.caffeinemc.mods.sodium.client.util.task';
  import { Sorter, CombinedCameraPos } from 'net.caffeinemc.mods.sodium.client.render.chunk.translucent_sorting.data';

  interface ChunkBuilderMeshingTask extends ChunkBuilderTask<ChunkBuildOutput> {}
  class ChunkBuilderMeshingTask extends ChunkBuilderTask<ChunkBuildOutput> {
    constructor(render: RenderSection, buildTime: number, absoluteCameraPos: Vector3dc, renderContext: ChunkRenderContext);
    execute(buildContext: ChunkBuildContext, cancellationToken: CancellationToken): ChunkBuildOutput;
    get effort(): number;
  }


  interface ChunkBuilderSortingTask extends ChunkBuilderTask<ChunkSortOutput> {}
  class ChunkBuilderSortingTask extends ChunkBuilderTask<ChunkSortOutput> {
    constructor(render: RenderSection, frame: number, absoluteCameraPos: Vector3dc, sorter: Sorter);
    static createTask(render: RenderSection, frame: number, absoluteCameraPos: Vector3dc): ChunkBuilderSortingTask;
    execute(context: ChunkBuildContext, cancellationToken: CancellationToken): ChunkSortOutput;
    get effort(): number;
  }


  interface ChunkBuilderTask<OUTPUT extends BuilderTaskOutput = any> extends CombinedCameraPos {}
  class ChunkBuilderTask<OUTPUT extends BuilderTaskOutput = any> extends CombinedCameraPos {
    constructor(render: RenderSection, time: number, absoluteCameraPos: Vector3dc);
    execute(var1: ChunkBuildContext, var2: CancellationToken): OUTPUT;
    get absoluteCameraPos(): Vector3dc;
    get effort(): number;
    get relativeCameraPos(): Vector3fc;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.data' {
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { NativeBuffer } from 'net.caffeinemc.mods.sodium.client.util';
  import { GlBufferSegment } from 'net.caffeinemc.mods.sodium.client.gl.arena';

  class BuiltSectionInfo {
    static readonly EMPTY: BuiltSectionInfo;
    readonly flags: number;
    readonly visibilityData: number;
    readonly globalBlockEntities: BlockEntity[];
    readonly culledBlockEntities: BlockEntity[];
    readonly animatedSprites: TextureAtlasSprite[];
  }


  class BuiltSectionMeshParts {
    constructor(buffer: NativeBuffer, vertexCounts: number[]);
    get vertexCounts(): number[];
    get vertexData(): NativeBuffer;
  }


  class SectionRenderDataStorage {
    constructor(storesIndices: boolean);
    delete(): void;
    getDataPointer(sectionIndex: number): number;
    onBufferResized(): void;
    onIndexBufferResized(): void;
    removeData(localSectionIndex: number): void;
    removeIndexData(localSectionIndex: number): void;
    removeVertexData(localSectionIndex: number): void;
    setIndexData(localSectionIndex: number, allocation: GlBufferSegment): void;
    setVertexData(localSectionIndex: number, allocation: GlBufferSegment, vertexCounts: number[]): void;
  }


  class SectionRenderDataUnsafe {
    static allocateHeap(count: number): number;
    static clear(pointer: number): void;
    static freeHeap(pointer: number): void;
    static getBaseElement(ptr: number): number;
    static getElementCount(ptr: number, facing: number): number;
    static getSliceMask(ptr: number): number;
    static getVertexOffset(ptr: number, facing: number): number;
    static heapPointer(ptr: number, index: number): number;
    static setBaseElement(ptr: number, value: number): void;
    static setElementCount(ptr: number, facing: number, value: number): void;
    static setSliceMask(ptr: number, value: number): void;
    static setVertexOffset(ptr: number, facing: number, value: number): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.data.BuiltSectionInfo' {
  import { TerrainRenderPass } from 'net.caffeinemc.mods.sodium.client.render.chunk.terrain';
  import { VisibilitySet } from 'net.minecraft.client.renderer.chunk';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BuiltSectionInfo } from 'net.caffeinemc.mods.sodium.client.render.chunk.data';

  class Builder {
    addBlockEntity(entity: BlockEntity, cull: boolean): void;
    addRenderPass(pass: TerrainRenderPass): void;
    addSprite(sprite: TextureAtlasSprite): void;
    build(): BuiltSectionInfo;
    setOcclusionData(data: VisibilitySet): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.lists' {
  import { RenderRegion } from 'net.caffeinemc.mods.sodium.client.render.chunk.region';
  import { SectionPos } from 'net.minecraft.core';
  import { RenderSection, ChunkUpdateType } from 'net.caffeinemc.mods.sodium.client.render.chunk';
  import { ByteIterator, ReversibleObjectArrayIterator } from 'net.caffeinemc.mods.sodium.client.util.iterator';
  import { Iterator, Map, ArrayDeque } from 'java.util';
  import { Visitor } from 'net.caffeinemc.mods.sodium.client.render.chunk.occlusion.OcclusionCuller';
  import { Viewport } from 'net.caffeinemc.mods.sodium.client.render.viewport';

  class ChunkRenderList {
    constructor(region: RenderRegion);
    add(render: RenderSection): void;
    get lastVisibleFrame(): number;
    get region(): RenderRegion;
    get sectionsWithEntitiesCount(): number;
    get sectionsWithGeometryCount(): number;
    get sectionsWithSpritesCount(): number;
    reset(frame: number): void;
    sectionsWithEntitiesIterator(): ByteIterator;
    sectionsWithGeometryIterator(reverse: boolean): ByteIterator;
    sectionsWithSpritesIterator(): ByteIterator;
    size(): number;
    sortSections(cameraPos: SectionPos, sortItems: number[]): void;
  }


  class ChunkRenderListIterable {
    iterator(var1: boolean): Iterator<ChunkRenderList>;
    iterator(): Iterator<ChunkRenderList>;
  }


  interface SortedRenderLists extends ChunkRenderListIterable {}
  class SortedRenderLists extends ChunkRenderListIterable {
    static empty(): SortedRenderLists;
    iterator(reverse: boolean): ReversibleObjectArrayIterator<ChunkRenderList>;
    iterator(): Iterator<ChunkRenderList>;
  }


  interface VisibleChunkCollector extends Visitor {}
  class VisibleChunkCollector extends Visitor {
    constructor(frame: number);
    createRenderLists(viewport: Viewport): SortedRenderLists;
    get rebuildLists(): Map<ChunkUpdateType, ArrayDeque<RenderSection>>;
    visit(section: RenderSection): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.map' {
  import { LongCollection } from 'it.unimi.dsi.fastutil.longs';
  import { ChunkEventHandler } from 'net.caffeinemc.mods.sodium.client.render.chunk.map.ChunkTracker';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';

  class ChunkStatus {
    static readonly FLAG_HAS_BLOCK_DATA: number;
    static readonly FLAG_HAS_LIGHT_DATA: number;
    static readonly FLAG_ALL: number;
  }


  interface ChunkTracker extends ClientChunkEventListener {}
  class ChunkTracker extends ClientChunkEventListener {
    static forEachChunk(queue: LongCollection, handler: ChunkEventHandler): void;
    forEachEvent(loadEventHandler: ChunkEventHandler, unloadEventHandler: ChunkEventHandler): void;
    get readyChunks(): LongCollection;
    onChunkStatusAdded(x: number, z: number, flags: number): void;
    onChunkStatusRemoved(x: number, z: number, flags: number): void;
    updateLoadDistance(loadDistance: number): void;
    updateMapCenter(chunkX: number, chunkZ: number): void;
  }


  class ChunkTrackerHolder {
    static get(level: ClientLevel): ChunkTracker;
    sodium$getTracker(): ChunkTracker;
  }


  class ClientChunkEventListener {
    onChunkStatusAdded(var1: number, var2: number, var3: number): void;
    onChunkStatusRemoved(var1: number, var2: number, var3: number): void;
    updateLoadDistance(var1: number): void;
    updateMapCenter(var1: number, var2: number): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.map.ChunkTracker' {
  class ChunkEventHandler {
    apply(var1: number, var2: number): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.occlusion' {
  import { Direction } from 'net.minecraft.core';
  import { Long2ReferenceMap } from 'it.unimi.dsi.fastutil.longs';
  import { RenderSection } from 'net.caffeinemc.mods.sodium.client.render.chunk';
  import { Level } from 'net.minecraft.world.level';
  import { Visitor } from 'net.caffeinemc.mods.sodium.client.render.chunk.occlusion.OcclusionCuller';
  import { Viewport } from 'net.caffeinemc.mods.sodium.client.render.viewport';
  import { VisibilitySet } from 'net.minecraft.client.renderer.chunk';

  class GraphDirection {
    static readonly DOWN: number;
    static readonly UP: number;
    static readonly NORTH: number;
    static readonly SOUTH: number;
    static readonly WEST: number;
    static readonly EAST: number;
    static readonly COUNT: number;
    static opposite(direction: number): number;
    static toEnum(direction: number): Direction;
    static x(direction: number): number;
    static y(direction: number): number;
    static z(direction: number): number;
  }


  class GraphDirectionSet {
    static readonly NONE: number;
    static readonly ALL: number;
    static contains(set: number, direction: number): boolean;
    static of(direction: number): number;
  }


  class OcclusionCuller {
    constructor(sections: Long2ReferenceMap<RenderSection>, level: Level);
    findVisible(visitor: Visitor, viewport: Viewport, searchDistance: number, useOcclusionCulling: boolean, frame: number): void;
    static isWithinFrustum(viewport: Viewport, section: RenderSection): boolean;
    static isWithinNearbySectionFrustum(viewport: Viewport, section: RenderSection): boolean;
  }


  class VisibilityEncoding {
    static readonly NULL: number;
    static bit(from: number, to: number): number;
    static encode(occlusionData: VisibilitySet): number;
    static getConnections(visibilityData: number, incoming: number): number;
    static getConnections(visibilityData: number): number;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.occlusion.OcclusionCuller' {
  import { RenderSection } from 'net.caffeinemc.mods.sodium.client.render.chunk';

  class Visitor {
    visit(var1: RenderSection): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.region' {
  import { StagingBuffer } from 'net.caffeinemc.mods.sodium.client.gl.arena.staging';
  import { CommandList } from 'net.caffeinemc.mods.sodium.client.gl.device';
  import { SectionRenderDataStorage } from 'net.caffeinemc.mods.sodium.client.render.chunk.data';
  import { TerrainRenderPass } from 'net.caffeinemc.mods.sodium.client.render.chunk.terrain';
  import { RenderSection } from 'net.caffeinemc.mods.sodium.client.render.chunk';
  import { DeviceResources } from 'net.caffeinemc.mods.sodium.client.render.chunk.region.RenderRegion';
  import { ChunkRenderList } from 'net.caffeinemc.mods.sodium.client.render.chunk.lists';
  import { Collection } from 'java.util';
  import { BuilderTaskOutput } from 'net.caffeinemc.mods.sodium.client.render.chunk.compile';

  class RenderRegion {
    static readonly REGION_WIDTH: number;
    static readonly REGION_HEIGHT: number;
    static readonly REGION_LENGTH: number;
    static readonly REGION_WIDTH_M: number;
    static readonly REGION_HEIGHT_M: number;
    static readonly REGION_LENGTH_M: number;
    static readonly REGION_WIDTH_SH: number;
    static readonly REGION_HEIGHT_SH: number;
    static readonly REGION_LENGTH_SH: number;
    static readonly REGION_SIZE: number;
    constructor(x: number, y: number, z: number, stagingBuffer: StagingBuffer);
    addSection(section: RenderSection): void;
    createResources(commandList: CommandList): DeviceResources;
    createStorage(pass: TerrainRenderPass): SectionRenderDataStorage;
    delete(commandList: CommandList): void;
    get chunkX(): number;
    get chunkY(): number;
    get chunkZ(): number;
    get originX(): number;
    get originY(): number;
    get originZ(): number;
    get renderList(): ChunkRenderList;
    get resources(): DeviceResources;
    get x(): number;
    get y(): number;
    get z(): number;
    getSection(id: number): RenderSection;
    getStorage(pass: TerrainRenderPass): SectionRenderDataStorage;
    isEmpty(): boolean;
    static key(x: number, y: number, z: number): number;
    refreshIndexedTesselation(commandList: CommandList): void;
    refreshTesselation(commandList: CommandList): void;
    removeSection(section: RenderSection): void;
    update(commandList: CommandList): void;
  }


  class RenderRegionManager {
    constructor(commandList: CommandList);
    createForChunk(chunkX: number, chunkY: number, chunkZ: number): RenderRegion;
    delete(commandList: CommandList): void;
    get loadedRegions(): Collection<RenderRegion>;
    get stagingBuffer(): StagingBuffer;
    update(): void;
    uploadResults(commandList: CommandList, results: Collection<BuilderTaskOutput>): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.region.RenderRegion' {
  import { CommandList } from 'net.caffeinemc.mods.sodium.client.gl.device';
  import { StagingBuffer } from 'net.caffeinemc.mods.sodium.client.gl.arena.staging';
  import { GlTessellation } from 'net.caffeinemc.mods.sodium.client.gl.tessellation';
  import { GlBuffer } from 'net.caffeinemc.mods.sodium.client.gl.buffer';
  import { GlBufferArena } from 'net.caffeinemc.mods.sodium.client.gl.arena';

  class DeviceResources {
    constructor(commandList: CommandList, stagingBuffer: StagingBuffer);
    delete(commandList: CommandList): void;
    deleteIndexedTessellation(commandList: CommandList): void;
    deleteTessellation(commandList: CommandList): void;
    get geometryArena(): GlBufferArena;
    get geometryBuffer(): GlBuffer;
    get indexArena(): GlBufferArena;
    get indexBuffer(): GlBuffer;
    get indexedTessellation(): GlTessellation;
    get tessellation(): GlTessellation;
    shouldDelete(): boolean;
    updateIndexedTessellation(commandList: CommandList, tessellation: GlTessellation): void;
    updateTessellation(commandList: CommandList, tessellation: GlTessellation): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.shader' {
  import { Enum } from 'java.lang';
  import { Function, IntFunction } from 'java.util.function';
  import { List } from 'java.util';
  import { Matrix4fc } from 'org.joml';
  import { GlUniform, GlUniformBlock } from 'net.caffeinemc.mods.sodium.client.gl.shader.uniform';

  interface ChunkFogMode extends Enum<ChunkFogMode> {}
  class ChunkFogMode extends Enum<ChunkFogMode> {
    static readonly NONE: ChunkFogMode;
    static readonly SMOOTH: ChunkFogMode;
    get defines(): string[];
    get factory(): Function<ShaderBindingContext, ChunkShaderFogComponent>;
    static valueOf(name: string): ChunkFogMode;
    static values(): ChunkFogMode[];
  }


  class ChunkShaderBindingPoints {
    static readonly ATTRIBUTE_POSITION: number;
    static readonly ATTRIBUTE_COLOR: number;
    static readonly ATTRIBUTE_TEXTURE: number;
    static readonly ATTRIBUTE_LIGHT_MATERIAL_INDEX: number;
    static readonly FRAG_COLOR: number;
  }


  class ChunkShaderFogComponent {
    setup(): void;
  }


  class ChunkShaderInterface {
    resetState(): void;
    setModelViewMatrix(var1: Matrix4fc): void;
    setProjectionMatrix(var1: Matrix4fc): void;
    setRegionOffset(var1: number, var2: number, var3: number): void;
    setupState(): void;
  }


  interface ChunkShaderTextureSlot extends Enum<ChunkShaderTextureSlot> {}
  class ChunkShaderTextureSlot extends Enum<ChunkShaderTextureSlot> {
    static readonly BLOCK: ChunkShaderTextureSlot;
    static readonly LIGHT: ChunkShaderTextureSlot;
    static valueOf(name: string): ChunkShaderTextureSlot;
    static values(): ChunkShaderTextureSlot[];
  }


  interface DefaultShaderInterface extends ChunkShaderInterface {}
  class DefaultShaderInterface extends ChunkShaderInterface {
    constructor(context: ShaderBindingContext, options: ChunkShaderOptions);
    resetState(): void;
    setModelViewMatrix(matrix: Matrix4fc): void;
    setProjectionMatrix(matrix: Matrix4fc): void;
    setRegionOffset(x: number, y: number, z: number): void;
    setupState(): void;
  }


  class ShaderBindingContext {
    bindUniform<U extends GlUniform<any>>(var1: string, var2: IntFunction<U>): U;
    bindUniformBlock(var1: string, var2: number): GlUniformBlock;
    bindUniformBlockOptional(var1: string, var2: number): GlUniformBlock;
    bindUniformOptional<U extends GlUniform<any>>(var1: string, var2: IntFunction<U>): U;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.shader.ChunkShaderFogComponent' {
  import { ChunkShaderFogComponent, ShaderBindingContext } from 'net.caffeinemc.mods.sodium.client.render.chunk.shader';

  interface Smooth extends ChunkShaderFogComponent {}
  class Smooth extends ChunkShaderFogComponent {
    constructor(context: ShaderBindingContext);
    setup(): void;
  }


  interface None extends ChunkShaderFogComponent {}
  class None extends ChunkShaderFogComponent {
    constructor(context: ShaderBindingContext);
    setup(): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.SharedQuadIndexBuffer' {
  import { Enum } from 'java.lang';
  import { ByteBuffer } from 'java.nio';
  import { GlIndexType } from 'net.caffeinemc.mods.sodium.client.gl.tessellation';
  import { List } from 'java.util';

  interface IndexType extends Enum<IndexType> {}
  class IndexType extends Enum<IndexType> {
    static readonly SHORT: IndexType;
    static readonly INTEGER: IndexType;
    createIndexBuffer(var1: ByteBuffer, var2: number): void;
    get bytesPerElement(): number;
    get format(): GlIndexType;
    get maxElementCount(): number;
    get maxPrimitiveCount(): number;
    static valueOf(name: string): IndexType;
    static values(): IndexType[];
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.terrain' {
  import { RenderType } from 'net.minecraft.client.renderer';

  class DefaultTerrainRenderPasses {
    static readonly SOLID: TerrainRenderPass;
    static readonly CUTOUT: TerrainRenderPass;
    static readonly TRANSLUCENT: TerrainRenderPass;
    static readonly ALL: TerrainRenderPass[];
  }


  class TerrainRenderPass {
    constructor(renderType: RenderType, isTranslucent: boolean, allowFragmentDiscard: boolean);
    endDrawing(): void;
    isTranslucent(): boolean;
    startDrawing(): void;
    supportsFragmentDiscard(): boolean;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.terrain.material' {
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { TerrainRenderPass } from 'net.caffeinemc.mods.sodium.client.render.chunk.terrain';
  import { AlphaCutoffParameter } from 'net.caffeinemc.mods.sodium.client.render.chunk.terrain.material.parameters';

  class DefaultMaterials {
    static readonly SOLID: Material;
    static readonly CUTOUT: Material;
    static readonly CUTOUT_MIPPED: Material;
    static readonly TRANSLUCENT: Material;
    static readonly TRIPWIRE: Material;
    static forBlockState(state: BlockState): Material;
    static forFluidState(state: FluidState): Material;
    static forRenderLayer(layer: RenderType): Material;
  }


  class Material {
    readonly pass: TerrainRenderPass;
    readonly packed: number;
    readonly alphaCutoff: AlphaCutoffParameter;
    readonly mipped: boolean;
    constructor(pass: TerrainRenderPass, alphaCutoff: AlphaCutoffParameter, mipped: boolean);
    bits(): number;
    isTranslucent(): boolean;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.terrain.material.parameters' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface AlphaCutoffParameter extends Enum<AlphaCutoffParameter> {}
  class AlphaCutoffParameter extends Enum<AlphaCutoffParameter> {
    static readonly ZERO: AlphaCutoffParameter;
    static readonly ONE_TENTH: AlphaCutoffParameter;
    static readonly HALF: AlphaCutoffParameter;
    static readonly ONE: AlphaCutoffParameter;
    static valueOf(name: string): AlphaCutoffParameter;
    static values(): AlphaCutoffParameter[];
  }


  class MaterialParameters {
    static readonly OFFSET_USE_MIP: number;
    static readonly OFFSET_ALPHA_CUTOFF: number;
    static pack(alphaCutoff: AlphaCutoffParameter, useMipmaps: boolean): number;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.translucent_sorting' {
  import { Vector3f, Vector3fc } from 'org.joml';
  import { Enum } from 'java.lang';
  import { SortMode, PriorityMode, DeferMode } from 'net.caffeinemc.mods.sodium.client.render.chunk.translucent_sorting.SortBehavior';
  import { List } from 'java.util';
  import { ModelQuadFacing } from 'net.caffeinemc.mods.sodium.client.model.quad.properties';
  import { SectionPos } from 'net.minecraft.core';
  import { Vertex } from 'net.caffeinemc.mods.sodium.client.render.chunk.vertex.format.ChunkVertexEncoder';
  import { TranslucentData, CombinedCameraPos } from 'net.caffeinemc.mods.sodium.client.render.chunk.translucent_sorting.data';
  import { BuiltSectionMeshParts } from 'net.caffeinemc.mods.sodium.client.render.chunk.data';

  interface AlignableNormal extends Vector3f {}
  class AlignableNormal extends Vector3f {
    equals(obj: any): boolean;
    static fromAligned(alignedDirection: number): AlignableNormal;
    static fromUnaligned(v: Vector3fc): AlignableNormal;
    get alignedDirection(): number;
    hashCode(): number;
    isAligned(): boolean;
    static queryRange(sortedDistances: number[], start: number, end: number): boolean;
  }


  interface SortBehavior extends Enum<SortBehavior> {}
  class SortBehavior extends Enum<SortBehavior> {
    static readonly OFF: SortBehavior;
    static readonly STATIC: SortBehavior;
    static readonly DYNAMIC_DEFER_ALWAYS: SortBehavior;
    static readonly DYNAMIC_DEFER_NEARBY_ONE_FRAME: SortBehavior;
    static readonly DYNAMIC_DEFER_NEARBY_ZERO_FRAMES: SortBehavior;
    static readonly DYNAMIC_DEFER_ALL_ONE_FRAME: SortBehavior;
    static readonly DYNAMIC_DEFER_ALL_ZERO_FRAMES: SortBehavior;
    get deferMode(): DeferMode;
    get priorityMode(): PriorityMode;
    get shortName(): string;
    get sortMode(): SortMode;
    static valueOf(name: string): SortBehavior;
    static values(): SortBehavior[];
  }


  interface SortType extends Enum<SortType> {}
  class SortType extends Enum<SortType> {
    static readonly EMPTY_SECTION: SortType;
    static readonly NO_TRANSLUCENT: SortType;
    static readonly NONE: SortType;
    static readonly STATIC_NORMAL_RELATIVE: SortType;
    static readonly STATIC_TOPO: SortType;
    static readonly DYNAMIC: SortType;
    static valueOf(name: string): SortType;
    static values(): SortType[];
  }


  class TQuad {
    extentsEqual(other: number[]): boolean;
    static extentsEqual(a: number[], b: number[]): boolean;
    static extentsIntersect(extentsA: number[], extentsB: number[]): boolean;
    static extentsIntersect(a: TQuad, b: TQuad): boolean;
    get accurateDotProduct(): number;
    get accurateNormal(): Vector3fc;
    get center(): Vector3fc;
    get extents(): number[];
    get facing(): ModelQuadFacing;
    get packedNormal(): number;
    get quantizedDotProduct(): number;
    get quantizedNormal(): Vector3fc;
    get vertexPositions(): number[];
    useQuantizedFacing(): ModelQuadFacing;
  }


  class TranslucentGeometryCollector {
    static readonly STATIC_TOPO_UNKNOWN_FALLBACK_LIMIT: number;
    constructor(sectionPos: SectionPos);
    appendQuad(packedNormal: number, vertices: Vertex[], facing: ModelQuadFacing): void;
    finishRendering(): SortType;
    getTranslucentData(oldData: TranslucentData, translucentMesh: BuiltSectionMeshParts, cameraPos: CombinedCameraPos): TranslucentData;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.translucent_sorting.bsp_tree' {
  import { RuntimeException } from 'java.lang';
  import { NativeBuffer } from 'net.caffeinemc.mods.sodium.client.util';
  import { Vector3fc } from 'org.joml';
  import { TQuad } from 'net.caffeinemc.mods.sodium.client.render.chunk.translucent_sorting';
  import { SectionPos } from 'net.minecraft.core';
  import { GeometryPlanes } from 'net.caffeinemc.mods.sodium.client.render.chunk.translucent_sorting.trigger';

  interface BSPBuildFailureException extends RuntimeException {}
  class BSPBuildFailureException extends RuntimeException {
  }


  class BSPNode {
    static buildBSP(quads: TQuad[], sectionPos: SectionPos, oldRoot: BSPNode, prepareNodeReuse: boolean): BSPResult;
    collectSortedQuads(nativeBuffer: NativeBuffer, cameraPos: Vector3fc): void;
  }


  interface BSPResult extends GeometryPlanes {}
  class BSPResult extends GeometryPlanes {
    get rootNode(): BSPNode;
    set rootNode(rootNode: BSPNode);
  }


  class BSPSortState {
  }


  class BSPWorkspace {
  }


  interface InnerBinaryPartitionBSPNode extends InnerPartitionBSPNode {}
  class InnerBinaryPartitionBSPNode extends InnerPartitionBSPNode {
  }


  interface InnerFixedDoubleBSPNode extends InnerPartitionBSPNode {}
  class InnerFixedDoubleBSPNode extends InnerPartitionBSPNode {
  }


  interface InnerMultiPartitionBSPNode extends InnerPartitionBSPNode {}
  class InnerMultiPartitionBSPNode extends InnerPartitionBSPNode {
  }


  interface InnerPartitionBSPNode extends BSPNode {}
  class InnerPartitionBSPNode extends BSPNode {
    static validateQuadCount(quadCount: number): void;
  }


  interface LeafDoubleBSPNode extends BSPNode {}
  class LeafDoubleBSPNode extends BSPNode {
  }


  interface LeafMultiBSPNode extends BSPNode {}
  class LeafMultiBSPNode extends BSPNode {
  }


  interface LeafSingleBSPNode extends BSPNode {}
  class LeafSingleBSPNode extends BSPNode {
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.translucent_sorting.data' {
  import { SortType, TQuad } from 'net.caffeinemc.mods.sodium.client.render.chunk.translucent_sorting';
  import { SectionPos } from 'net.minecraft.core';
  import { Vector3fc, Vector3dc } from 'org.joml';
  import { GeometryPlanes } from 'net.caffeinemc.mods.sodium.client.render.chunk.translucent_sorting.trigger';
  import { DynamicTopoSorter } from 'net.caffeinemc.mods.sodium.client.render.chunk.translucent_sorting.data.DynamicTopoData';
  import { NativeBuffer } from 'net.caffeinemc.mods.sodium.client.util';
  import { IntBuffer } from 'java.nio';
  import { IntConsumer } from 'java.util.function';
  import { Object2ReferenceOpenHashMap } from 'it.unimi.dsi.fastutil.objects';

  interface AnyOrderData extends SplitDirectionData {}
  class AnyOrderData extends SplitDirectionData {
    static fromMesh(vertexCounts: number[], quads: TQuad[], sectionPos: SectionPos): AnyOrderData;
    get sortType(): SortType;
    get sorter(): Sorter;
  }


  class CombinedCameraPos {
    get absoluteCameraPos(): Vector3dc;
    get relativeCameraPos(): Vector3fc;
  }


  interface DynamicBSPData extends DynamicData {}
  class DynamicBSPData extends DynamicData {
    static fromMesh(vertexCount: number, cameraPos: CombinedCameraPos, quads: TQuad[], sectionPos: SectionPos, oldData: TranslucentData): DynamicBSPData;
    get sorter(): Sorter;
  }


  interface DynamicData extends MixedDirectionData {}
  class DynamicData extends MixedDirectionData {
    discardGeometryPlanes(): void;
    get geometryPlanes(): GeometryPlanes;
    get initialCameraPos(): Vector3dc;
    get sortType(): SortType;
  }


  interface DynamicSorter extends Sorter {}
  class DynamicSorter extends Sorter {
    writeIndexBuffer(cameraPos: CombinedCameraPos, initial: boolean): void;
  }


  interface DynamicTopoData extends DynamicData {}
  class DynamicTopoData extends DynamicData {
    GFNITriggerEnabled(): boolean;
    applyTopoSortFailureCounterChange(sorter: DynamicTopoSorter): void;
    checkAndApplyDirectTriggerOff(sorter: DynamicTopoSorter): boolean;
    checkAndApplyDirectTriggerOn(sorter: DynamicTopoSorter): boolean;
    checkAndApplyGFNITriggerOff(sorter: DynamicTopoSorter): boolean;
    directTriggerEnabled(): boolean;
    static fromMesh(vertexCount: number, cameraPos: CombinedCameraPos, quads: TQuad[], sectionPos: SectionPos, geometryPlanes: GeometryPlanes): DynamicTopoData;
    get directTriggerKey(): number;
    get sorter(): Sorter;
    isMatchingSorter(sorter: DynamicTopoSorter): boolean;
    prepareTrigger(isDirectTrigger: boolean): void;
    set directTriggerKey(key: number);
  }


  interface MixedDirectionData extends PresentTranslucentData {}
  class MixedDirectionData extends PresentTranslucentData {
    get vertexCounts(): number[];
  }


  interface NoData extends TranslucentData {}
  class NoData extends TranslucentData {
    static forEmptySection(sectionPos: SectionPos): NoData;
    static forNoTranslucent(sectionPos: SectionPos): NoData;
    get sortType(): SortType;
  }


  class PresentSortData {
    get indexBuffer(): NativeBuffer;
    get intBuffer(): IntBuffer;
  }


  interface PresentTranslucentData extends TranslucentData {}
  class PresentTranslucentData extends TranslucentData {
    get quadCount(): number;
    get quadHash(): number;
    get sorter(): Sorter;
    get vertexCounts(): number[];
    set quadHash(hash: number);
  }


  interface SortData extends PresentSortData {}
  class SortData extends PresentSortData {
    isReusingUploadedIndexData(): boolean;
  }


  interface Sorter extends PresentSortData {}
  class Sorter extends PresentSortData {
    get indexBuffer(): NativeBuffer;
    writeIndexBuffer(var1: CombinedCameraPos, var2: boolean): void;
  }


  interface SplitDirectionData extends PresentTranslucentData {}
  class SplitDirectionData extends PresentTranslucentData {
    constructor(sectionPos: SectionPos, vertexCounts: number[], quadCount: number);
    get vertexCounts(): number[];
  }


  interface StaticNormalRelativeData extends SplitDirectionData {}
  class StaticNormalRelativeData extends SplitDirectionData {
    constructor(sectionPos: SectionPos, vertexCounts: number[], quadCount: number);
    static fromMesh(vertexCounts: number[], quads: TQuad[], sectionPos: SectionPos, isDoubleUnaligned: boolean): StaticNormalRelativeData;
    get sortType(): SortType;
    get sorter(): Sorter;
  }


  interface StaticSorter extends Sorter {}
  class StaticSorter extends Sorter {
    writeIndexBuffer(cameraPos: CombinedCameraPos, initial: boolean): void;
  }


  interface StaticTopoData extends MixedDirectionData {}
  class StaticTopoData extends MixedDirectionData {
    static fromMesh(vertexCount: number, quads: TQuad[], sectionPos: SectionPos): StaticTopoData;
    get sortType(): SortType;
    get sorter(): Sorter;
  }


  class TopoGraphSorting {
    static orthogonalQuadVisibleThrough(quadA: TQuad, quadB: TQuad): boolean;
    static topoGraphSort(indexConsumer: IntConsumer, allQuads: TQuad[], distancesByNormal: Object2ReferenceOpenHashMap<Vector3fc, number[]>, cameraPos: Vector3fc): boolean;
    static topoGraphSort(indexConsumer: IntConsumer, quads: TQuad[], quadCount: number, activeToRealIndex: number[], distancesByNormal: Object2ReferenceOpenHashMap<Vector3fc, number[]>, cameraPos: Vector3fc): boolean;
  }


  class TranslucentData {
    static readonly INDICES_PER_QUAD: number;
    static readonly VERTICES_PER_QUAD: number;
    static readonly BYTES_PER_INDEX: number;
    static readonly BYTES_PER_QUAD: number;
    readonly sectionPos: SectionPos;
    get sortType(): SortType;
    static indexBytesToQuadCount(indexBytes: number): number;
    prepareTrigger(isAngleTrigger: boolean): void;
    static quadCountToIndexBytes(quadCount: number): number;
    static vertexCountToQuadCount(vertexCount: number): number;
    static writeQuadVertexIndexes(intBuffer: IntBuffer, quadIndex: number): void;
    static writeQuadVertexIndexes(intBuffer: IntBuffer, quadIndexes: number[]): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.translucent_sorting.data.DynamicTopoData' {
  import { DynamicSorter } from 'net.caffeinemc.mods.sodium.client.render.chunk.translucent_sorting.data';
  import { IntConsumer } from 'java.util.function';

  interface DynamicTopoSorter extends IntConsumer, DynamicSorter {}
  class DynamicTopoSorter extends IntConsumer {
    accept(value: number): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.translucent_sorting.SortBehavior' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface SortMode extends Enum<SortMode> {}
  class SortMode extends Enum<SortMode> {
    static readonly NONE: SortMode;
    static readonly STATIC: SortMode;
    static readonly DYNAMIC: SortMode;
    static valueOf(name: string): SortMode;
    static values(): SortMode[];
  }


  interface PriorityMode extends Enum<PriorityMode> {}
  class PriorityMode extends Enum<PriorityMode> {
    static readonly NONE: PriorityMode;
    static readonly NEARBY: PriorityMode;
    static readonly ALL: PriorityMode;
    static valueOf(name: string): PriorityMode;
    static values(): PriorityMode[];
  }


  interface DeferMode extends Enum<DeferMode> {}
  class DeferMode extends Enum<DeferMode> {
    static readonly ALWAYS: DeferMode;
    static readonly ONE_FRAME: DeferMode;
    static readonly ZERO_FRAMES: DeferMode;
    static valueOf(name: string): DeferMode;
    static values(): DeferMode[];
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.translucent_sorting.trigger' {
  import { SectionTriggers } from 'net.caffeinemc.mods.sodium.client.render.chunk.translucent_sorting.trigger.SortTriggering';
  import { DynamicTopoData, TranslucentData, DynamicData } from 'net.caffeinemc.mods.sodium.client.render.chunk.translucent_sorting.data';
  import { SectionPos } from 'net.minecraft.core';
  import { Collection, List } from 'java.util';
  import { Object2ReferenceOpenHashMap } from 'it.unimi.dsi.fastutil.objects';
  import { Vector3fc, Vector3dc } from 'org.joml';
  import { TQuad, AlignableNormal } from 'net.caffeinemc.mods.sodium.client.render.chunk.translucent_sorting';
  import { BiConsumer } from 'java.util.function';
  import { Long, Boolean } from 'java.lang';
  import { DynamicTopoSorter } from 'net.caffeinemc.mods.sodium.client.render.chunk.translucent_sorting.data.DynamicTopoData';

  interface DirectTriggers extends SectionTriggers<DynamicTopoData> {}
  class DirectTriggers extends SectionTriggers<DynamicTopoData> {
    integrateSection(ts: SortTriggering, sectionPos: SectionPos, data: DynamicTopoData, movement: CameraMovement): void;
    processTriggers(ts: SortTriggering, movement: CameraMovement): void;
    removeSection(sectionPos: number, data: TranslucentData): void;
  }


  class GeometryPlanes {
    addAlignedPlane(sectionPos: SectionPos, direction: number, distance: number): void;
    addDoubleSidedPlane(sectionPos: SectionPos, axis: number, distance: number): void;
    addQuadPlane(sectionPos: SectionPos, quad: TQuad): void;
    addUnalignedPlane(sectionPos: SectionPos, normal: Vector3fc, distance: number): void;
    static fromQuadLists(sectionPos: SectionPos, quads: TQuad[]): GeometryPlanes;
    get aligned(): NormalPlanes[];
    get alignedOrCreate(): NormalPlanes[];
    get unaligned(): Collection<NormalPlanes>;
    get unalignedNormals(): Collection<Vector3fc>;
    get unalignedOrCreate(): Object2ReferenceOpenHashMap<Vector3fc, NormalPlanes>;
    prepareAndGetDistances(): Object2ReferenceOpenHashMap<Vector3fc, number[]>;
    prepareIntegration(): void;
  }


  interface GFNITriggers extends SectionTriggers<DynamicData> {}
  class GFNITriggers extends SectionTriggers<DynamicData> {
    integrateSection(ts: SortTriggering, pos: SectionPos, data: DynamicData, movement: CameraMovement): void;
    processTriggers(ts: SortTriggering, movement: CameraMovement): void;
    removeSection(sectionPos: number, data: TranslucentData): void;
  }


  class Group {
  }


  class NormalList {
    get normal(): AlignableNormal;
  }


  class NormalPlanes {
    constructor(sectionPos: SectionPos, normal: Vector3fc);

    constructor(sectionPos: SectionPos, alignedDirection: number);
    addPlaneMember(distance: number): boolean;
    prepareAndInsert(distancesByNormal: Object2ReferenceOpenHashMap<Vector3fc, number[]>): void;
    prepareIntegration(): void;
  }


  class SortTriggering {
    addDebugStrings(list: string[]): void;
    applyTriggerChanges(data: DynamicTopoData, topoSorter: DynamicTopoSorter, pos: SectionPos, cameraPos: Vector3dc): void;
    integrateTranslucentData(oldData: TranslucentData, newData: TranslucentData, cameraPos: Vector3dc, triggerSectionCallback: BiConsumer<Long, boolean>): void;
    removeSection(oldData: TranslucentData, sectionPos: number): void;
    triggerSections(triggerSectionCallback: BiConsumer<Long, boolean>, movement: CameraMovement): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.translucent_sorting.trigger.SortTriggering' {
  import { SortTriggering, CameraMovement } from 'net.caffeinemc.mods.sodium.client.render.chunk.translucent_sorting.trigger';
  import { TranslucentData } from 'net.caffeinemc.mods.sodium.client.render.chunk.translucent_sorting.data';
  import { SectionPos } from 'net.minecraft.core';

  class SectionTriggers<T extends DynamicData = any> {
    integrateSection(var1: SortTriggering, var2: SectionPos, var3: T, var4: CameraMovement): void;
    processTriggers(var1: SortTriggering, var2: CameraMovement): void;
    removeSection(var1: number, var3: TranslucentData): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.vertex.builder' {
  import { ChunkVertexType } from 'net.caffeinemc.mods.sodium.client.render.chunk.vertex.format';
  import { Vertex } from 'net.caffeinemc.mods.sodium.client.render.chunk.vertex.format.ChunkVertexEncoder';
  import { Material } from 'net.caffeinemc.mods.sodium.client.render.chunk.terrain.material';
  import { ByteBuffer } from 'java.nio';

  class ChunkMeshBufferBuilder {
    constructor(vertexType: ChunkVertexType, initialCapacity: number);
    count(): number;
    destroy(): void;
    isEmpty(): boolean;
    push(vertices: Vertex[], material: Material): void;
    push(vertices: Vertex[], materialBits: number): void;
    slice(): ByteBuffer;
    start(sectionIndex: number): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.vertex.format' {
  import { Vertex } from 'net.caffeinemc.mods.sodium.client.render.chunk.vertex.format.ChunkVertexEncoder';
  import { GlVertexFormat } from 'net.caffeinemc.mods.sodium.client.gl.attribute';

  class ChunkMeshFormats {
    static readonly COMPACT: ChunkVertexType;
  }


  class ChunkVertexEncoder {
    write(var1: number, var3: number, var4: Vertex[], var5: number): number;
  }


  class ChunkVertexType {
    get encoder(): ChunkVertexEncoder;
    get vertexFormat(): GlVertexFormat;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.vertex.format.ChunkVertexEncoder' {
  class Vertex {
    x: number;
    y: number;
    z: number;
    color: number;
    ao: number;
    u: number;
    v: number;
    light: number;
    static uninitializedQuad(): Vertex[];
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.chunk.vertex.format.impl' {
  import { ChunkVertexType, ChunkVertexEncoder } from 'net.caffeinemc.mods.sodium.client.render.chunk.vertex.format';
  import { GlVertexFormat } from 'net.caffeinemc.mods.sodium.client.gl.attribute';
  import { VertexFormatAttribute } from 'net.caffeinemc.mods.sodium.client.render.vertex';

  interface CompactChunkVertex extends ChunkVertexType {}
  class CompactChunkVertex extends ChunkVertexType {
    static readonly STRIDE: number;
    static readonly VERTEX_FORMAT: GlVertexFormat;
    static readonly POSITION_MAX_VALUE: number;
    static readonly TEXTURE_MAX_VALUE: number;
    get encoder(): ChunkVertexEncoder;
    get vertexFormat(): GlVertexFormat;
  }


  class DefaultChunkMeshAttributes {
    static readonly POSITION: VertexFormatAttribute;
    static readonly COLOR: VertexFormatAttribute;
    static readonly TEXTURE: VertexFormatAttribute;
    static readonly LIGHT_MATERIAL_INDEX: VertexFormatAttribute;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.frapi.helper' {
  import { Direction } from 'net.minecraft.core';
  import { QuadView, MutableQuadView } from 'net.fabricmc.fabric.api.renderer.v1.mesh';
  import { Axis } from 'Direction';
  import { Vector3f } from 'org.joml';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';

  class ColorHelper {
    static fromVanillaColor(color: number): number;
    static maxBrightness(b0: number, b1: number): number;
    static toVanillaColor(color: number): number;
  }


  class GeometryHelper {
    static isQuadParallelToFace(face: Direction, quad: QuadView): boolean;
    static lightFace(quad: QuadView): Direction;
    static longestAxis(vec: Vector3f): Axis;
    static longestAxis(normalX: number, normalY: number, normalZ: number): Axis;
  }


  class NormalHelper {
    static computeFaceNormal(saveTo: Vector3f, q: QuadView): void;
  }


  class TextureHelper {
    static bakeSprite(quad: MutableQuadView, sprite: TextureAtlasSprite, bakeFlags: number): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.frapi.mesh' {
  class EncodingFormat {
    static readonly HEADER_STRIDE: number;
    static readonly VERTEX_STRIDE: number;
    static readonly QUAD_STRIDE: number;
    static readonly QUAD_STRIDE_BYTES: number;
    static readonly TOTAL_STRIDE: number;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.frapi.render' {
  import { QuadEmitter, Mesh } from 'net.fabricmc.fabric.api.renderer.v1.mesh';
  import { Direction, BlockPos } from 'net.minecraft.core';
  import { ItemDisplayContext, ItemStack } from 'net.minecraft.world.item';
  import { BakedModelConsumer, QuadTransform } from 'RenderContext';
  import { BakedModel } from 'net.minecraft.client.resources.model';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { RenderContext } from 'net.fabricmc.fabric.api.renderer.v1.render';
  import { Consumer } from 'java.util.function';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { ItemColors } from 'net.minecraft.client.color.item';
  import { VanillaModelBufferer } from 'net.caffeinemc.mods.sodium.client.render.frapi.render.ItemRenderContext';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { BlockColors } from 'net.minecraft.client.color.block';
  import { BlockAndTintGetter } from 'net.minecraft.world.level';
  import { RandomSource } from 'net.minecraft.util';
  import { MutableQuadViewImpl } from 'net.caffeinemc.mods.sodium.client.render.frapi.mesh';
  import { Matrix4f, Matrix3f } from 'org.joml';
  import { VertexBufferWriter } from 'net.caffeinemc.mods.sodium.api.vertex.buffer';

  interface AbstractBlockRenderContext extends AbstractRenderContext {}
  class AbstractBlockRenderContext extends AbstractRenderContext {
    bakedModelConsumer(): BakedModelConsumer;
    bufferDefaultModel(model: BakedModel, state: BlockState): void;
    get emitter(): QuadEmitter;
    isFaceCulled(face: Direction): boolean;
    itemTransformationMode(): ItemDisplayContext;
  }


  interface AbstractRenderContext extends RenderContext {}
  class AbstractRenderContext extends RenderContext {
    hasTransform(): boolean;
    meshConsumer(): Consumer<Mesh>;
    popTransform(): void;
    pushTransform(transform: QuadTransform): void;
  }


  interface AmbientOcclusionMode extends Enum<AmbientOcclusionMode> {}
  class AmbientOcclusionMode extends Enum<AmbientOcclusionMode> {
    static readonly ENABLED: AmbientOcclusionMode;
    static readonly DEFAULT: AmbientOcclusionMode;
    static readonly DISABLED: AmbientOcclusionMode;
    static valueOf(name: string): AmbientOcclusionMode;
    static values(): AmbientOcclusionMode[];
  }


  interface ItemRenderContext extends AbstractRenderContext {}
  class ItemRenderContext extends AbstractRenderContext {
    constructor(colorMap: ItemColors, vanillaBufferer: VanillaModelBufferer);
    bakedModelConsumer(): BakedModelConsumer;
    bufferDefaultModel(model: BakedModel, state: BlockState): void;
    get emitter(): QuadEmitter;
    isFaceCulled(face: Direction): boolean;
    itemTransformationMode(): ItemDisplayContext;
    renderModel(itemStack: ItemStack, transformMode: ItemDisplayContext, invert: boolean, poseStack: PoseStack, bufferSource: MultiBufferSource, lightmap: number, overlay: number, model: BakedModel): void;
  }


  interface NonTerrainBlockRenderContext extends AbstractBlockRenderContext {}
  class NonTerrainBlockRenderContext extends AbstractBlockRenderContext {
    constructor(colorMap: BlockColors);
    renderModel(blockView: BlockAndTintGetter, model: BakedModel, state: BlockState, pos: BlockPos, poseStack: PoseStack, buffer: VertexConsumer, cull: boolean, random: RandomSource, seed: number, overlay: number): void;
  }


  class QuadEncoder {
    static writeQuadVertices(quad: MutableQuadViewImpl, vertexConsumer: VertexConsumer, overlay: number, matPosition: Matrix4f, trustedNormals: boolean, matNormal: Matrix3f): void;
    static writeQuadVertices(quad: MutableQuadViewImpl, writer: VertexBufferWriter, overlay: number, matPosition: Matrix4f, trustedNormals: boolean, matNormal: Matrix3f): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.frapi.render.ItemRenderContext' {
  import { BakedModel } from 'net.minecraft.client.resources.model';
  import { ItemStack } from 'net.minecraft.world.item';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';

  class VanillaModelBufferer {
    accept(var1: BakedModel, var2: ItemStack, var3: number, var4: number, var5: PoseStack, var6: VertexConsumer): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.frapi' {
  import { Renderer } from 'net.fabricmc.fabric.api.renderer.v1';
  import { RenderMaterial, MaterialFinder } from 'net.fabricmc.fabric.api.renderer.v1.material';
  import { MeshBuilder } from 'net.fabricmc.fabric.api.renderer.v1.mesh';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface SodiumRenderer extends Renderer {}
  class SodiumRenderer extends Renderer {
    static readonly INSTANCE: SodiumRenderer;
    static readonly STANDARD_MATERIAL: RenderMaterial;
    materialById(id: ResourceLocation): RenderMaterial;
    materialFinder(): MaterialFinder;
    meshBuilder(): MeshBuilder;
    registerMaterial(id: ResourceLocation, material: RenderMaterial): boolean;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.immediate' {
  import { ResourceProvider } from 'net.minecraft.server.packs.resources';
  import { Camera } from 'net.minecraft.client';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { Matrix4f } from 'org.joml';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';

  class CloudRenderer {
    constructor(resourceProvider: ResourceProvider);
    destroy(): void;
    reload(resourceProvider: ResourceProvider): void;
    render(camera: Camera, level: ClientLevel, projectionMatrix: Matrix4f, poseStack: PoseStack, ticks: number, tickDelta: number): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.immediate.CloudRenderer.CloudTextureData' {
  class Slice {
    constructor(radius: number);
    getCellColor(index: number): number;
    getCellFaces(index: number): number;
    getCellIndex(x: number, z: number): number;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.immediate.model' {
  import { VertexBufferWriter } from 'net.caffeinemc.mods.sodium.api.vertex.buffer';
  import { Pose } from 'PoseStack';
  import { ModelQuadView } from 'net.caffeinemc.mods.sodium.client.model.quad';
  import { Set } from 'java.util';
  import { Direction } from 'net.minecraft.core';

  class BakedModelEncoder {
    static shouldMultiplyAlpha(): boolean;
    static writeQuadVertices(writer: VertexBufferWriter, matrices: Pose, quad: ModelQuadView, color: number, light: number, overlay: number, colorize: boolean): void;
    static writeQuadVertices(writer: VertexBufferWriter, matrices: Pose, quad: ModelQuadView, r: number, g: number, b: number, a: number, brightnessTable: number[], colorize: boolean, light: number[], overlay: number): void;
  }


  class EntityRenderer {
    static prepareNormalsIfChanged(matrices: Pose): void;
    static renderCuboid(matrices: Pose, writer: VertexBufferWriter, cuboid: ModelCuboid, light: number, overlay: number, color: number): void;
  }


  class ModelCuboid {
    static readonly FACE_NEG_Y: number;
    static readonly FACE_POS_Y: number;
    static readonly FACE_NEG_X: number;
    static readonly FACE_NEG_Z: number;
    static readonly FACE_POS_X: number;
    static readonly FACE_POS_Z: number;
    readonly x1: number;
    readonly y1: number;
    readonly z1: number;
    readonly x2: number;
    readonly y2: number;
    readonly z2: number;
    readonly u0: number;
    readonly u1: number;
    readonly u2: number;
    readonly u3: number;
    readonly u4: number;
    readonly u5: number;
    readonly v0: number;
    readonly v1: number;
    readonly v2: number;
    readonly mirror: boolean;
    constructor(u: number, v: number, x1: number, y1: number, z1: number, sizeX: number, sizeY: number, sizeZ: number, extraX: number, extraY: number, extraZ: number, mirror: boolean, textureWidth: number, textureHeight: number, renderDirections: Set<Direction>);
    static getFaceIndex(dir: Direction): number;
    shouldDrawFace(faceIndex: number): boolean;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render' {
  import { Minecraft, Camera } from 'net.minecraft.client';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { Viewport } from 'net.caffeinemc.mods.sodium.client.render.viewport';
  import { RenderType, RenderBuffers } from 'net.minecraft.client.renderer';
  import { ChunkRenderMatrices } from 'net.caffeinemc.mods.sodium.client.render.chunk';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { Long2ObjectMap } from 'it.unimi.dsi.fastutil.longs';
  import { SortedSet, Collection } from 'java.util';
  import { BlockDestructionProgress } from 'net.minecraft.server.level';
  import { LocalBooleanRef } from 'com.llamalad7.mixinextras.sugar.ref';
  import { Consumer } from 'java.util.function';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { Entity } from 'net.minecraft.world.entity';

  class SodiumWorldRenderer {
    constructor(client: Minecraft);
    drawChunkLayer(renderLayer: RenderType, matrices: ChunkRenderMatrices, x: number, y: number, z: number): void;
    get chunksDebugString(): string;
    get debugStrings(): Collection<string>;
    get visibleChunkCount(): number;
    static instance(): SodiumWorldRenderer;
    static instanceNullable(): SodiumWorldRenderer;
    isBoxVisible(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): boolean;
    isEntityVisible(entity: Entity): boolean;
    isSectionReady(x: number, y: number, z: number): boolean;
    isTerrainRenderComplete(): boolean;
    iterateVisibleBlockEntities(blockEntityConsumer: Consumer<BlockEntity>): void;
    reload(): void;
    renderBlockEntities(matrices: PoseStack, bufferBuilders: RenderBuffers, blockBreakingProgressions: Long2ObjectMap<SortedSet<BlockDestructionProgress>>, camera: Camera, tickDelta: number, isGlowing: LocalBooleanRef): void;
    scheduleRebuildForBlockArea(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number, important: boolean): void;
    scheduleRebuildForChunk(x: number, y: number, z: number, important: boolean): void;
    scheduleRebuildForChunks(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number, important: boolean): void;
    scheduleTerrainUpdate(): void;
    setLevel(level: ClientLevel): void;
    setupTerrain(camera: Camera, viewport: Viewport, spectator: boolean, updateChunksImmediately: boolean): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.texture' {
  import { SpriteFinder } from 'net.fabricmc.fabric.api.renderer.v1.model';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';

  class SpriteContentsExtension {
    sodium$hasAnimation(): boolean;
    sodium$isActive(): boolean;
    sodium$setActive(var1: boolean): void;
  }


  class SpriteFinderCache {
    static forBlockAtlas(): SpriteFinder;
    static resetSpriteFinder(): void;
  }


  class SpriteUtil {
    static hasAnimation(sprite: TextureAtlasSprite): boolean;
    static markSpriteActive(sprite: TextureAtlasSprite): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.util' {
  class RenderAsserts {
    static validateCurrentThread(): boolean;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.vertex.buffer' {
  import { VertexBufferWriter } from 'net.caffeinemc.mods.sodium.api.vertex.buffer';

  interface BufferBuilderExtension extends VertexBufferWriter {}
  class BufferBuilderExtension extends VertexBufferWriter {
    sodium$duplicateVertex(): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.vertex.serializers.generated' {
  import { Bytecode } from 'net.caffeinemc.mods.sodium.client.render.vertex.serializers.generated.VertexSerializerFactory';
  import { VertexFormat } from 'com.mojang.blaze3d.vertex';
  import { Class } from 'java.lang';

  class VertexSerializerFactory {
    static define(bytecode: Bytecode): Class<any>;
    static generate(srcFormat: VertexFormat, dstFormat: VertexFormat, identifier: string): Bytecode;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.vertex.serializers.generated.VertexSerializerFactory' {
  class Bytecode {
    copy(): number[];
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.vertex' {
  import { VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { VertexBufferWriter } from 'net.caffeinemc.mods.sodium.api.vertex.buffer';

  class VertexConsumerTracker {
    static logBadConsumer(consumer: VertexConsumer): void;
  }


  class VertexConsumerUtils {
    static convertOrLog(consumer: VertexConsumer): VertexBufferWriter;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.viewport' {
  import { Frustum } from 'net.caffeinemc.mods.sodium.client.render.viewport.frustum';
  import { Vector3d } from 'org.joml';
  import { SectionPos, BlockPos } from 'net.minecraft.core';

  class CameraTransform {
    readonly intX: number;
    readonly intY: number;
    readonly intZ: number;
    readonly fracX: number;
    readonly fracY: number;
    readonly fracZ: number;
    readonly x: number;
    readonly y: number;
    readonly z: number;
    constructor(x: number, y: number, z: number);
  }


  class Viewport {
    constructor(frustum: Frustum, position: Vector3d);
    get blockCoord(): BlockPos;
    get chunkCoord(): SectionPos;
    get transform(): CameraTransform;
    isBoxVisible(intOriginX: number, intOriginY: number, intOriginZ: number, floatSizeX: number, floatSizeY: number, floatSizeZ: number): boolean;
  }


  class ViewportProvider {
    sodium$createViewport(): Viewport;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.render.viewport.frustum' {
  import { FrustumIntersection } from 'org.joml';

  class Frustum {
    testAab(var1: number, var2: number, var3: number, var4: number, var5: number, var6: number): boolean;
  }


  interface SimpleFrustum extends Frustum {}
  class SimpleFrustum extends Frustum {
    constructor(frustumIntersection: FrustumIntersection);
    testAab(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): boolean;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.services' {
  import { FluidRenderer } from 'net.caffeinemc.mods.sodium.client.render.chunk.compile.pipeline';
  import { ColorProviderRegistry } from 'net.caffeinemc.mods.sodium.client.model.color';
  import { LightPipelineProvider } from 'net.caffeinemc.mods.sodium.client.model.light';
  import { BlendedColorProvider } from 'net.caffeinemc.mods.sodium.client.model.quad.blender';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockAndTintGetter, BlockGetter, Level } from 'net.minecraft.world.level';
  import { BlockPos, Direction, SectionPos } from 'net.minecraft.core';
  import { ModelQuadView } from 'net.caffeinemc.mods.sodium.client.model.quad';
  import { AmbientOcclusionMode } from 'net.caffeinemc.mods.sodium.client.render.frapi.render';
  import { BakedModel } from 'net.minecraft.client.resources.model';
  import { RenderType, LevelRenderer } from 'net.minecraft.client.renderer';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { LocalPlayer } from 'net.minecraft.client.player';
  import { SodiumAuxiliaryLightManager, LevelSlice } from 'net.caffeinemc.mods.sodium.client.world';
  import { LevelChunk } from 'net.minecraft.world.level.chunk';
  import { Matrix4f } from 'org.joml';
  import { Camera } from 'net.minecraft.client';
  import { Frustum } from 'net.minecraft.client.renderer.culling';
  import { List } from 'java.util';
  import { Function } from 'java.util.function';
  import { VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { MixinOverride } from 'net.caffeinemc.mods.sodium.client.services.PlatformMixinOverrides';
  import { Iterable, Class } from 'java.lang';
  import { RandomSource } from 'net.minecraft.util';
  import { BakedQuad } from 'net.minecraft.client.renderer.block.model';
  import { Path } from 'java.nio.file';
  import { Long2ObjectMap } from 'it.unimi.dsi.fastutil.longs';

  class FluidRendererFactory {
    static readonly INSTANCE: FluidRendererFactory;
    createPlatformFluidRenderer(var1: ColorProviderRegistry, var2: LightPipelineProvider): FluidRenderer;
    get waterBlockColorProvider(): BlendedColorProvider<BlockState>;
    get waterColorProvider(): BlendedColorProvider<FluidState>;
    static getInstance(): FluidRendererFactory;
  }


  class PlatformBlockAccess {
    static readonly INSTANCE: PlatformBlockAccess;
    static getInstance(): PlatformBlockAccess;
    getLightEmission(var1: BlockState, var2: BlockAndTintGetter, var3: BlockPos): number;
    getNormalVectorShade(var1: ModelQuadView, var2: BlockAndTintGetter, var3: boolean): number;
    platformHasBlockData(): boolean;
    shouldBlockEntityGlow(var1: BlockEntity, var2: LocalPlayer): boolean;
    shouldOccludeFluid(var1: Direction, var2: BlockState, var3: FluidState): boolean;
    shouldShowFluidOverlay(var1: BlockState, var2: BlockAndTintGetter, var3: BlockPos, var4: FluidState): boolean;
    shouldSkipRender(var1: BlockGetter, var2: BlockState, var3: BlockState, var4: BlockPos, var5: BlockPos, var6: Direction): boolean;
    usesAmbientOcclusion(var1: BakedModel, var2: BlockState, var3: SodiumModelData, var4: RenderType, var5: BlockAndTintGetter, var6: BlockPos): AmbientOcclusionMode;
  }


  class PlatformLevelAccess {
    static readonly INSTANCE: PlatformLevelAccess;
    getBlockEntityData(var1: BlockEntity): any;
    static getInstance(): PlatformLevelAccess;
    getLightManager(var1: LevelChunk, var2: SectionPos): SodiumAuxiliaryLightManager;
  }


  class PlatformLevelRenderHooks {
    static readonly INSTANCE: PlatformLevelRenderHooks;
    static getInstance(): PlatformLevelRenderHooks;
    retrieveChunkMeshAppenders(var1: Level, var2: BlockPos): any[];
    runChunkLayerEvents(var1: RenderType, var2: LevelRenderer, var3: Matrix4f, var4: Matrix4f, var5: number, var6: Camera, var7: Frustum): void;
    runChunkMeshAppenders(var1: any[], var2: Function<RenderType, VertexConsumer>, var3: LevelSlice): void;
  }


  class PlatformMixinOverrides {
    static readonly INSTANCE: PlatformMixinOverrides;
    applyModOverrides(): MixinOverride[];
    static getInstance(): PlatformMixinOverrides;
  }


  class PlatformModelAccess {
    static readonly INSTANCE: PlatformModelAccess;
    get emptyModelData(): SodiumModelData;
    static getInstance(): PlatformModelAccess;
    getModelData(var1: LevelSlice, var2: BakedModel, var3: BlockState, var4: BlockPos, var5: SodiumModelData): SodiumModelData;
    getModelDataContainer(var1: Level, var2: SectionPos): SodiumModelDataContainer;
    getModelRenderTypes(var1: BlockAndTintGetter, var2: BakedModel, var3: BlockState, var4: BlockPos, var5: RandomSource, var6: SodiumModelData): Iterable<RenderType>;
    getQuads(var1: BlockAndTintGetter, var2: BlockPos, var3: BakedModel, var4: BlockState, var5: Direction, var6: RandomSource, var7: RenderType, var8: SodiumModelData): BakedQuad[];
  }


  class PlatformRuntimeInformation {
    static readonly INSTANCE: PlatformRuntimeInformation;
    get configDirectory(): Path;
    get gameDirectory(): Path;
    static getInstance(): PlatformRuntimeInformation;
    isDevelopmentEnvironment(): boolean;
    isModInLoadingList(var1: string): boolean;
    platformHasEarlyLoadingScreen(): boolean;
    platformUsesRefmap(): boolean;
    usesAlphaMultiplication(): boolean;
  }


  class Services {
    static load<T>(clazz: Class<T>): T;
  }


  class SodiumModelData {
    static readonly EMPTY: SodiumModelData;
  }


  class SodiumModelDataContainer {
    constructor(modelDataMap: Long2ObjectMap<SodiumModelData>);
    getModelData(pos: BlockPos): SodiumModelData;
    isEmpty(): boolean;
  }

}

declare module 'net.caffeinemc.mods.sodium.client' {
  import { SodiumGameOptions } from 'net.caffeinemc.mods.sodium.client.gui';
  import { Logger } from 'org.slf4j';

  class SodiumClientMod {
    static allowDebuggingOptions(): boolean;
    static get version(): string;
    static logger(): Logger;
    static onInitialization(version: string): void;
    static options(): SodiumGameOptions;
    static restoreDefaultOptions(): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.util' {
  import { Direction } from 'net.minecraft.core';
  import { Path } from 'java.nio.file';
  import { Function, Consumer } from 'java.util.function';
  import { Boolean } from 'java.lang';
  import { Collection } from 'java.util';
  import { ByteBuffer } from 'java.nio';
  import { NativeImage } from 'com.mojang.blaze3d.platform';

  class BitwiseMath {
    static greaterThan(a: number, b: number): number;
    static lessThan(a: number, b: number): number;
  }


  class DirectionUtil {
    static readonly ALL_DIRECTIONS: Direction[];
    static readonly HORIZONTAL_DIRECTIONS: Direction[];
    static getOpposite(dir: Direction): Direction;
  }


  class FileUtil {
    static writeTextRobustly(text: string, path: Path): void;
  }


  class FlawlessFrames {
    static get provider(): Function<string, Consumer<boolean>>;
    static isActive(): boolean;
  }


  class ListUtil {
    static updateList<T>(collection: Collection<T>, before: Collection<T>, after: Collection<T>): void;
  }


  class MathUtil {
    static align(num: number, alignment: number): number;
    static comparableIntToFloat(i: number): number;
    static floatToComparableInt(f: number): number;
    static isPowerOfTwo(n: number): boolean;
    static toMib(bytes: number): number;
  }


  class ModelQuadUtil {
    static readonly POSITION_INDEX: number;
    static readonly COLOR_INDEX: number;
    static readonly TEXTURE_INDEX: number;
    static readonly LIGHT_INDEX: number;
    static readonly NORMAL_INDEX: number;
    static readonly VERTEX_SIZE: number;
    static vertexOffset(vertexIndex: number): number;
  }


  class NativeBuffer {
    constructor(capacity: number);
    static copy(src: ByteBuffer): NativeBuffer;
    free(): void;
    get directBuffer(): ByteBuffer;
    get length(): number;
    static get totalAllocated(): number;
    static reclaim(forceGc: boolean): void;
  }


  class NativeImageHelper {
    static getPointerRGBA(nativeImage: NativeImage): number;
  }


  class TextureUtil {
    static get blockTextureId(): number;
    static get lightTextureId(): number;
  }


  class UInt32 {
    static downcast(x: number): number;
    static uncheckedDowncast(x: number): number;
    static upcast(x: number): number;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.util.collections' {
  class BitArray {
    constructor(capacity: number);
    capacity(): number;
    countSetBits(): number;
    fill(value: boolean): void;
    get(index: number): boolean;
    getAndSet(index: number): boolean;
    getAndUnset(index: number): boolean;
    nextSetBit(fromIndex: number): number;
    put(index: number, value: boolean): void;
    set(index: number): void;
    set(startIdx: number, endIdx: number): void;
    setAll(): void;
    unset(index: number): void;
    unset(startIdx: number, endIdx: number): void;
    unsetAll(): void;
  }


  class DoubleBufferedQueue<E = any> {
    flip(): boolean;
    read(): ReadQueue<E>;
    reset(): void;
    write(): WriteQueue<E>;
  }


  class ReadQueue<E = any> {
    dequeue(): E;
  }


  class WriteQueue<E = any> {
    enqueue(var1: E): void;
    ensureCapacity(var1: number): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.util.color' {
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ColorFetcher } from 'net.caffeinemc.mods.sodium.client.util.color.FastCubicSampler';
  import { Function } from 'java.util.function';

  class BoxBlur {
    static averageRGB(red: number, green: number, blue: number, multiplier: number): number;
    static blur(src: number[], tmp: number[], width: number, height: number, radius: number): void;
  }


  class ColorSRGB {
    static linearToSrgb(r: number, g: number, b: number, a: number): number;
    static srgbToLinear(c: number): number;
  }


  class FastCubicSampler {
    static sampleColor(pos: Vec3, colorFetcher: ColorFetcher, transformer: Function<Vec3, Vec3>): Vec3;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.util.color.BoxBlur' {
  class ColorBuffer {
    readonly data: number[];
    constructor(width: number, height: number);
    get(x: number, y: number): number;
    static getIndex(x: number, y: number, width: number): number;
    set(x: number, y: number, color: number): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.util.color.FastCubicSampler' {
  class ColorFetcher {
    fetch(var1: number, var2: number, var3: number): number;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.util.interval_tree' {
  import { Double, Iterable, Comparable } from 'java.lang';
  import { Bounded, Unbounded } from 'net.caffeinemc.mods.sodium.client.util.interval_tree.Interval';
  import { Comparator, AbstractSet, Set, Iterator } from 'java.util';
  import { TreeNodeIterator } from 'net.caffeinemc.mods.sodium.client.util.interval_tree.TreeNode';

  interface DoubleInterval extends Interval<number> {}
  class DoubleInterval extends Interval<number> {
    constructor();

    constructor(start: number, end: number, type: Bounded);

    constructor(value: number, type: Unbounded);
    get midpoint(): number;
    isEmpty(): boolean;
  }


  class Interval<T extends Comparable<T> = any> {
    static readonly sweepLeftToRight: Comparator;
    static readonly sweepRightToLeft: Comparator;
    constructor();

    constructor(start: T, end: T, type: Bounded);

    constructor(value: T, type: Unbounded);
    contains(query: T): boolean;
    equals(obj: any): boolean;
    get end(): T;
    get midpoint(): T;
    get start(): T;
    getIntersection(other: Interval<T>): Interval<T>;
    hashCode(): number;
    intersects(query: Interval<T>): boolean;
    isEmpty(): boolean;
    isEndInclusive(): boolean;
    isLeftOf(point: T, inclusive: boolean): boolean;
    isLeftOf(point: T): boolean;
    isLeftOf(other: Interval<T>): boolean;
    isRightOf(point: T, inclusive: boolean): boolean;
    isRightOf(point: T): boolean;
    isRightOf(other: Interval<T>): boolean;
    isStartInclusive(): boolean;
  }


  interface IntervalTree<T extends Comparable<T> = any> extends AbstractSet<Interval> {}
  class IntervalTree<T extends Comparable<T> = any> extends AbstractSet<Interval> {
    add(interval: Interval<T>): boolean;
    clear(): void;
    contains(o: any): boolean;
    hasNext(): boolean;
    iterator(): Iterator<Interval<T>>;
    next(): Interval<T>;
    query(interval: Interval<T>): Set<Interval<T>>;
    remove(interval: Interval<T>): boolean;
    remove(): void;
    size(): number;
  }


  interface TreeNode<T extends Comparable<T> = any> extends Iterable<Interval> {}
  class TreeNode<T extends Comparable<T> = any> extends Iterable<Interval> {
    constructor(interval: Interval<T>);
    static addInterval<T extends Comparable<T>>(tree: IntervalTree<T>, root: TreeNode<T>, interval: Interval<T>): TreeNode<T>;
    height(): number;
    iterator(): TreeNodeIterator;
    static removeInterval<T extends Comparable<T>>(tree: IntervalTree<T>, root: TreeNode<T>, interval: Interval<T>): TreeNode<T>;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.util.interval_tree.Interval' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Bounded extends Enum<Bounded> {}
  class Bounded extends Enum<Bounded> {
    static readonly OPEN: Bounded;
    static readonly CLOSED: Bounded;
    static readonly CLOSED_RIGHT: Bounded;
    static readonly CLOSED_LEFT: Bounded;
    static valueOf(name: string): Bounded;
    static values(): Bounded[];
  }


  interface Unbounded extends Enum<Unbounded> {}
  class Unbounded extends Enum<Unbounded> {
    static readonly OPEN_LEFT: Unbounded;
    static readonly CLOSED_LEFT: Unbounded;
    static readonly OPEN_RIGHT: Unbounded;
    static readonly CLOSED_RIGHT: Unbounded;
    static valueOf(name: string): Unbounded;
    static values(): Unbounded[];
  }

}

declare module 'net.caffeinemc.mods.sodium.client.util.interval_tree.TreeNode' {
  import { Iterator } from 'java.util';
  import { Interval } from 'net.caffeinemc.mods.sodium.client.util.interval_tree';

  interface TreeNodeIterator extends Iterator<Interval> {}
  class TreeNodeIterator extends Iterator<Interval> {
    hasNext(): boolean;
    next(): Interval<T>;
    remove(): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.util.iterator' {
  import { Iterator } from 'java.util';
  import { ObjectArrayList } from 'it.unimi.dsi.fastutil.objects';
  import { Iterable } from 'java.lang';

  interface ByteArrayIterator extends ByteIterator {}
  class ByteArrayIterator extends ByteIterator {
    constructor(elements: number[], lastIndex: number);
    hasNext(): boolean;
    nextByteAsInt(): number;
  }


  class ByteIterator {
    hasNext(): boolean;
    nextByteAsInt(): number;
  }


  interface ReversibleByteArrayIterator extends ByteIterator {}
  class ReversibleByteArrayIterator extends ByteIterator {
    constructor(elements: number[], size: number, reverse: boolean);
    hasNext(): boolean;
    nextByteAsInt(): number;
  }


  interface ReversibleObjectArrayIterator<T = any> extends Iterator<T> {}
  class ReversibleObjectArrayIterator<T = any> extends Iterator<T> {
    constructor(list: ObjectArrayList<T>, reverse: boolean);

    constructor(array: T[], start: number, end: number, reverse: boolean);
    hasNext(): boolean;
    next(): T;
  }


  interface WrappedIterator<T = any> extends Iterator<T> {}
  class WrappedIterator<T = any> extends Iterator<T> {
    static create<T>(iterable: Iterable<T>): WrappedIterator<T>;
    hasNext(): boolean;
    next(): T;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.util.iterator.WrappedIterator' {
  import { RuntimeException } from 'java.lang';

  interface Exception extends RuntimeException {}
  class Exception extends RuntimeException {
  }

}

declare module 'net.caffeinemc.mods.sodium.client.util.sorting' {
  import { VertexSorting } from 'com.mojang.blaze3d.vertex';
  import { Vector3f } from 'org.joml';

  class AbstractSort {
  }


  interface InsertionSort extends AbstractSort {}
  class InsertionSort extends AbstractSort {
    static insertionSort(indices: number[], fromIndex: number, toIndex: number, keys: number[]): void;
  }


  interface MergeSort extends AbstractSort {}
  class MergeSort extends AbstractSort {
    static mergeSort(keys: number[]): number[];
  }


  interface RadixSort extends AbstractSort {}
  class RadixSort extends AbstractSort {
    static readonly RADIX_SORT_THRESHOLD: number;
    static sort(keys: number[]): number[];
    static useRadixSort(length: number): boolean;
  }


  class VertexSorters {
    static sortByDistance(origin: Vector3f): VertexSorting;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.util.task' {
  class CancellationToken {
    isCancelled(): boolean;
    setCancelled(): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.world.biome' {
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { ChunkRenderContext } from 'net.caffeinemc.mods.sodium.client.world.cloned';
  import { Holder } from 'net.minecraft.core';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { ColorResolver } from 'net.minecraft.world.level';

  class BiomeColorMaps {
    static getFoliageColor(index: number): number;
    static getGrassColor(index: number): number;
    static getIndex(temperature: number, humidity: number): number;
  }


  class LevelBiomeSlice {
    getBiome(blockX: number, blockY: number, blockZ: number): Holder<Biome>;
    update(level: ClientLevel, context: ChunkRenderContext): void;
  }


  class LevelColorCache {
    constructor(biomeData: LevelBiomeSlice, blendRadius: number);
    getColor(resolver: ColorResolver, blockX: number, blockY: number, blockZ: number): number;
    update(context: ChunkRenderContext): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.world.biome.LevelBiomeSlice' {
  class BiasMap {
    getX(index: number): number;
    getY(index: number): number;
    getZ(index: number): number;
    set(index: number, x: number, y: number, z: number): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.client.world' {
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { Palette, PalettedContainerRO } from 'net.minecraft.world.level.chunk';
  import { SodiumWorldRenderer } from 'net.caffeinemc.mods.sodium.client.render';
  import { BlockAndTintGetter, Level, LightLayer, ColorResolver } from 'net.minecraft.world.level';
  import { RenderAttachedBlockView } from 'net.fabricmc.fabric.api.rendering.data.v1';
  import { FabricBlockView } from 'net.fabricmc.fabric.api.blockview.v2';
  import { ChunkRenderContext, ClonedChunkSectionCache } from 'net.caffeinemc.mods.sodium.client.world.cloned';
  import { SectionPos, BlockPos, Direction, Holder } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { LevelLightEngine } from 'net.minecraft.world.level.lighting';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { SodiumModelData } from 'net.caffeinemc.mods.sodium.client.services';
  import { Biome } from 'net.minecraft.world.level.biome';

  class BiomeSeedProvider {
    static getBiomeZoomSeed(level: ClientLevel): number;
    sodium$getBiomeZoomSeed(): number;
  }


  class BitStorageExtension {
    sodium$unpack<T>(var1: T[], var2: Palette<T>): void;
  }


  class LevelRendererExtension {
    sodium$getWorldRenderer(): SodiumWorldRenderer;
  }


  interface LevelSlice extends BlockAndTintGetter, RenderAttachedBlockView, FabricBlockView {}
  class LevelSlice extends BlockAndTintGetter {
    constructor(level: ClientLevel);
    copyData(context: ChunkRenderContext): void;
    get height(): number;
    get lightEngine(): LevelLightEngine;
    get minBuildHeight(): number;
    getBiomeFabric(pos: BlockPos): Holder<Biome>;
    getBlockEntity(pos: BlockPos): BlockEntity;
    getBlockEntity(blockX: number, blockY: number, blockZ: number): BlockEntity;
    getBlockEntityRenderAttachment(pos: BlockPos): any;
    getBlockEntityRenderData(pos: BlockPos): any;
    getBlockState(pos: BlockPos): BlockState;
    getBlockState(blockX: number, blockY: number, blockZ: number): BlockState;
    getBlockTint(pos: BlockPos, resolver: ColorResolver): number;
    getBrightness(type: LightLayer, pos: BlockPos): number;
    getFluidState(pos: BlockPos): FluidState;
    static getLocalBlockIndex(blockX: number, blockY: number, blockZ: number): number;
    static getLocalSectionIndex(sectionX: number, sectionY: number, sectionZ: number): number;
    getPlatformModelData(pos: BlockPos): SodiumModelData;
    getRawBrightness(pos: BlockPos, ambientDarkness: number): number;
    getShade(direction: Direction, shaded: boolean): number;
    hasBiomes(): boolean;
    static prepare(level: Level, pos: SectionPos, cache: ClonedChunkSectionCache): ChunkRenderContext;
    reset(): void;
  }


  class PalettedContainerROExtension<T = any> {
    static clone<T>(container: PalettedContainerRO<T>): PalettedContainerRO<T>;
    static of<T>(container: PalettedContainerRO<T>): PalettedContainerROExtension<T>;
    sodium$copy(): PalettedContainerRO<T>;
    sodium$unpack(var1: T[]): void;
    sodium$unpack(var1: T[], var2: number, var3: number, var4: number, var5: number, var6: number, var7: number): void;
  }


  class SodiumAuxiliaryLightManager {
  }

}

declare module 'net.caffeinemc.mods.sodium.client.world.cloned' {
  import { SectionPos, Holder } from 'net.minecraft.core';
  import { BoundingBox } from 'net.minecraft.world.level.levelgen.structure';
  import { List } from 'java.util';
  import { Level, LightLayer } from 'net.minecraft.world.level';
  import { LevelChunk, LevelChunkSection, PalettedContainerRO, DataLayer } from 'net.minecraft.world.level.chunk';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { Int2ReferenceMap } from 'it.unimi.dsi.fastutil.ints';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { SodiumModelDataContainer } from 'net.caffeinemc.mods.sodium.client.services';
  import { SodiumAuxiliaryLightManager } from 'net.caffeinemc.mods.sodium.client.world';

  class ChunkRenderContext {
    constructor(origin: SectionPos, sections: ClonedChunkSection[], volume: BoundingBox, renderers: any[]);
    get origin(): SectionPos;
    get renderers(): any[];
    get sections(): ClonedChunkSection[];
    get volume(): BoundingBox;
  }


  class ClonedChunkSection {
    constructor(level: Level, chunk: LevelChunk, section: LevelChunkSection, pos: SectionPos);
    get auxLightManager(): SodiumAuxiliaryLightManager;
    get biomeData(): PalettedContainerRO<Holder<Biome>>;
    get blockData(): PalettedContainerRO<BlockState>;
    get blockEntityMap(): Int2ReferenceMap<BlockEntity>;
    get blockEntityRenderDataMap(): Int2ReferenceMap<any>;
    get lastUsedTimestamp(): number;
    get modelMap(): SodiumModelDataContainer;
    get position(): SectionPos;
    getLightArray(lightType: LightLayer): DataLayer;
    set lastUsedTimestamp(timestamp: number);
  }


  class ClonedChunkSectionCache {
    constructor(level: Level);
    acquire(x: number, y: number, z: number): ClonedChunkSection;
    cleanup(): void;
    invalidate(x: number, y: number, z: number): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.desktop' {
  class LaunchWarn {
    static readonly WINDOW_TITLE: string;
    static main(args: string[]): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.desktop.utils.browse' {
  class BrowseUrlHandler {
    browseTo(var1: string): void;
    static createImplementation(): BrowseUrlHandler;
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.core.gui' {
  class LevelLoadStatusManagerMixin {
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.core' {
  import { NativeWindowHandle } from 'net.caffeinemc.mods.sodium.client.platform';
  import { CharSequence, Long } from 'java.lang';
  import { Operation } from 'com.llamalad7.mixinextras.injector.wrapoperation';

  class MinecraftMixin {
  }


  interface WindowMixin extends NativeWindowHandle {}
  class WindowMixin extends NativeWindowHandle {
    get win32Handle(): number;
    setAdditionalWindowHints(titleEncoded: number, width: number, height: CharSequence, title: number, monitor: number, original: Operation<Long>): number;
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.core.model.colors' {
  import { BlockColorsExtension, ItemColorsExtension } from 'net.caffeinemc.mods.sodium.client.model.color.interop';
  import { Reference2ReferenceMap, ReferenceSet } from 'it.unimi.dsi.fastutil.objects';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockColor } from 'net.minecraft.client.color.block';
  import { ItemColor } from 'net.minecraft.client.color.item';
  import { ItemStack } from 'net.minecraft.world.item';

  interface BlockColorsMixin extends BlockColorsExtension {}
  class BlockColorsMixin extends BlockColorsExtension {
    sodium$getOverridenVanillaBlocks(): ReferenceSet<Block>;
    sodium$getProviders(): Reference2ReferenceMap<Block, BlockColor>;
  }


  interface ItemColorsMixin extends ItemColorsExtension {}
  class ItemColorsMixin extends ItemColorsExtension {
    sodium$getColorProvider(stack: ItemStack): ItemColor;
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.core.model.quad' {
  import { BakedQuadView } from 'net.caffeinemc.mods.sodium.client.model.quad';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { ModelQuadFacing } from 'net.caffeinemc.mods.sodium.client.model.quad.properties';
  import { Direction } from 'net.minecraft.core';

  interface BakedQuadMixin extends BakedQuadView {}
  class BakedQuadMixin extends BakedQuadView {
    get colorIndex(): number;
    get faceNormal(): number;
    get flags(): number;
    get lightFace(): Direction;
    get normalFace(): ModelQuadFacing;
    get sprite(): TextureAtlasSprite;
    getColor(idx: number): number;
    getLight(idx: number): number;
    getTexU(idx: number): number;
    getTexV(idx: number): number;
    getVertexNormal(idx: number): number;
    getX(idx: number): number;
    getY(idx: number): number;
    getZ(idx: number): number;
    hasAO(): boolean;
    hasAmbientOcclusion(): boolean;
    hasShade(): boolean;
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.core.model' {
  class TextureAtlasSpriteMixin {
    uvShrinkRatio(): number;
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.core.render' {
  import { ExtendedBlockEntityType } from 'net.caffeinemc.mods.sodium.client.render.chunk';
  import { BlockEntityRenderPredicate } from 'net.caffeinemc.mods.sodium.api.blockentity';
  import { VertexFormatExtensions } from 'net.caffeinemc.mods.sodium.api.vertex.format';

  interface BlockEntityTypeMixin<T extends BlockEntity = any> extends ExtendedBlockEntityType<T> {}
  class BlockEntityTypeMixin<T extends BlockEntity = any> extends ExtendedBlockEntityType<T> {
    sodium$addRenderPredicate(predicate: BlockEntityRenderPredicate<T>): void;
    sodium$getRenderPredicates(): BlockEntityRenderPredicate<T>;
    sodium$removeRenderPredicate(predicate: BlockEntityRenderPredicate<T>): boolean;
  }


  class TextureAtlasMixin {
  }


  interface VertexFormatMixin extends VertexFormatExtensions {}
  class VertexFormatMixin extends VertexFormatExtensions {
    sodium$getGlobalId(): number;
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.core.render.frustum' {
  import { ViewportProvider, Viewport } from 'net.caffeinemc.mods.sodium.client.render.viewport';

  interface FrustumMixin extends ViewportProvider {}
  class FrustumMixin extends ViewportProvider {
    sodium$createViewport(): Viewport;
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.core.render.immediate.consumer' {
  import { VertexBufferWriter } from 'net.caffeinemc.mods.sodium.api.vertex.buffer';
  import { BufferBuilderExtension } from 'net.caffeinemc.mods.sodium.client.render.vertex.buffer';
  import { MemoryStack } from 'org.lwjgl.system';
  import { VertexFormat } from 'com.mojang.blaze3d.vertex';

  interface BufferBuilderMixin extends VertexBufferWriter, BufferBuilderExtension {}
  class BufferBuilderMixin extends VertexBufferWriter {
    push(stack: MemoryStack, src: number, count: number, format: VertexFormat): void;
    sodium$duplicateVertex(): void;
  }


  interface EntityOutlineGeneratorMixin extends VertexBufferWriter {}
  class EntityOutlineGeneratorMixin extends VertexBufferWriter {
    canUseIntrinsics(): boolean;
    push(stack: MemoryStack, ptr: number, count: number, format: VertexFormat): void;
  }


  interface SheetedDecalTextureGeneratorMixin extends VertexBufferWriter {}
  class SheetedDecalTextureGeneratorMixin extends VertexBufferWriter {
    canUseIntrinsics(): boolean;
    push(stack: MemoryStack, ptr: number, count: number, format: VertexFormat): void;
  }


  interface SpriteCoordinateExpanderMixin extends VertexBufferWriter {}
  class SpriteCoordinateExpanderMixin extends VertexBufferWriter {
    canUseIntrinsics(): boolean;
    push(stack: MemoryStack, ptr: number, count: number, format: VertexFormat): void;
  }


  class VertexMultiConsumerMixin {
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.core.render.immediate.consumer.VertexMultiConsumerMixin' {
  import { VertexBufferWriter } from 'net.caffeinemc.mods.sodium.api.vertex.buffer';
  import { MemoryStack } from 'org.lwjgl.system';
  import { VertexFormat } from 'com.mojang.blaze3d.vertex';

  interface MultipleMixin extends VertexBufferWriter {}
  class MultipleMixin extends VertexBufferWriter {
    canUseIntrinsics(): boolean;
    push(stack: MemoryStack, ptr: number, count: number, format: VertexFormat): void;
  }


  interface DoubleMixin extends VertexBufferWriter {}
  class DoubleMixin extends VertexBufferWriter {
    canUseIntrinsics(): boolean;
    push(stack: MemoryStack, ptr: number, count: number, format: VertexFormat): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.core.render.texture' {
  class TextureAtlasAccessor {
    get height(): number;
    get width(): number;
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.core.render.world' {
  import { LevelRendererExtension } from 'net.caffeinemc.mods.sodium.client.world';
  import { SodiumWorldRenderer } from 'net.caffeinemc.mods.sodium.client.render';
  import { BlockPos } from 'net.minecraft.core';
  import { Consumer } from 'java.util.function';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  interface LevelRendererMixin extends LevelRendererExtension {}
  class LevelRendererMixin extends LevelRendererExtension {
    countRenderedSections(): number;
    get sectionStatistics(): string;
    hasRenderedAllSections(): boolean;
    isSectionCompiled(pos: BlockPos): boolean;
    replaceBlockEntityIteration(blockEntityConsumer: Consumer<BlockEntity>, ci: CallbackInfo): void;
    setBlocksDirty(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): void;
    setSectionDirtyWithNeighbors(x: number, y: number, z: number): void;
    sodium$getWorldRenderer(): SodiumWorldRenderer;
  }


  class RenderBuffersMixin {
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.core.world.biome' {
  import { BiomeSeedProvider } from 'net.caffeinemc.mods.sodium.client.world';

  interface ClientLevelMixin extends BiomeSeedProvider {}
  class ClientLevelMixin extends BiomeSeedProvider {
    sodium$getBiomeZoomSeed(): number;
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.core.world.chunk' {
  import { PalettedContainerROExtension, BitStorageExtension } from 'net.caffeinemc.mods.sodium.client.world';
  import { PalettedContainer, PalettedContainerRO, Palette } from 'net.minecraft.world.level.chunk';

  interface PalettedContainerMixin<T = any> extends PalettedContainerROExtension<T> {}
  class PalettedContainerMixin<T = any> extends PalettedContainerROExtension<T> {
    copy(): PalettedContainer<T>;
    sodium$copy(): PalettedContainerRO<T>;
    sodium$unpack(values: T[]): void;
    sodium$unpack(values: T[], minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): void;
  }


  interface SimpleBitStorageMixin extends BitStorageExtension {}
  class SimpleBitStorageMixin extends BitStorageExtension {
    sodium$unpack<T>(out: T[], palette: Palette<T>): void;
  }


  interface ZeroBitStorageMixin extends BitStorageExtension {}
  class ZeroBitStorageMixin extends BitStorageExtension {
    sodium$unpack<T>(out: T[], palette: Palette<T>): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.core.world.map' {
  import { ChunkTrackerHolder, ChunkTracker } from 'net.caffeinemc.mods.sodium.client.render.chunk.map';

  class ClientChunkCacheMixin {
  }


  interface ClientLevelMixin extends ChunkTrackerHolder {}
  class ClientLevelMixin extends ChunkTrackerHolder {
    sodium$getTracker(): ChunkTracker;
  }


  class ClientPacketListenerMixin {
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.gui.hooks.console' {
  class GameRendererMixin {
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.gui.hooks.debug' {
  class DebugScreenOverlayMixin {
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.gui.hooks.settings' {
  import { Screen } from 'net.minecraft.client.gui.screens';

  interface OptionsScreenMixin extends Screen {}
  class OptionsScreenMixin extends Screen {
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.gui.screen' {
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { StoringChunkProgressListener } from 'net.minecraft.server.level.progress';

  class LevelLoadingScreenMixin {
    static renderChunks(graphics: GuiGraphics, tracker: StoringChunkProgressListener, mapX: number, mapY: number, mapScale: number, mapPadding: number): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.model' {
  import { List } from 'java.util';
  import { BakedQuad } from 'net.minecraft.client.renderer.block.model';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Direction } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';
  import { ModelData } from 'net.neoforged.neoforge.client.model.data';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { ChunkRenderTypeSet } from 'net.neoforged.neoforge.client';

  class MultiPartBakedModelMixin {
    getQuads(state: BlockState, direction: Direction, random: RandomSource, modelData: ModelData, renderType: RenderType): BakedQuad[];
    getRenderTypes(state: BlockState, random: RandomSource, data: ModelData): ChunkRenderTypeSet;
  }


  class WeightedBakedModelMixin {
    getQuads(state: BlockState, face: Direction, random: RandomSource, modelData: ModelData, renderType: RenderType): BakedQuad[];
    getRenderTypes(state: BlockState, rand: RandomSource, data: ModelData): ChunkRenderTypeSet;
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.options.overlays' {
  class GuiMixin {
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.options.render_layers' {
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Direction } from 'net.minecraft.core';

  class ItemBlockRenderTypesMixin {
  }


  interface LeavesBlockMixin extends Block {}
  class LeavesBlockMixin extends Block {
    constructor();
    skipRendering(state: BlockState, stateFrom: BlockState, direction: Direction): boolean;
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.options.weather' {
  class LevelRendererMixin {
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.render.compositing' {
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  class RenderTargetMixin {
    frameBufferId: number;
    width: number;
    height: number;
    blitToScreen(width: number, height: number, disableBlend: boolean, ci: CallbackInfo): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.render.entity' {
  import { PoseStack } from 'com.mojang.blaze3d.vertex';

  class CubeMixin {
    minX: number;
  }


  class ModelPartMixin {
    x: number;
    y: number;
    z: number;
    xScale: number;
    yScale: number;
    zScale: number;
    yRot: number;
    xRot: number;
    zRot: number;
    translateAndRotate(matrixStack: PoseStack): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.render.entity.cull' {
  class EntityRendererMixin<T extends Entity = any> {
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.render.entity.shadows' {
  class EntityRenderDispatcherMixin {
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.render.frapi' {
  import { FabricBakedModel } from 'net.fabricmc.fabric.api.renderer.v1.model';
  import { BlockAndTintGetter } from 'net.minecraft.world.level';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockPos } from 'net.minecraft.core';
  import { Supplier } from 'java.util.function';
  import { RandomSource } from 'net.minecraft.util';
  import { RenderContext } from 'net.fabricmc.fabric.api.renderer.v1.render';
  import { ItemStack } from 'net.minecraft.world.item';

  interface BakedModelMixin extends FabricBakedModel {}
  class BakedModelMixin extends FabricBakedModel {
    emitBlockQuads(blockView: BlockAndTintGetter, state: BlockState, pos: BlockPos, randomSupplier: Supplier<RandomSource>, context: RenderContext): void;
    emitItemQuads(stack: ItemStack, randomSupplier: Supplier<RandomSource>, context: RenderContext): void;
  }


  class ItemRendererAccessor {
    static sodium$hasAnimatedTexture(stack: ItemStack): boolean;
  }


  class ItemRendererMixin {
  }


  class ModelBlockRendererMixin {
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.render.gui.font' {
  class BakedGlyphMixin {
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.render.gui.outlines' {
  class LevelRendererMixin {
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.render.immediate.buffer_builder.intrinsics' {
  import { VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { Pose } from 'PoseStack';
  import { BakedQuad } from 'net.minecraft.client.renderer.block.model';

  interface BufferBuilderMixin extends VertexConsumer {}
  class BufferBuilderMixin extends VertexConsumer {
    putBulkData(matrices: Pose, bakedQuad: BakedQuad, r: number, g: number, b: number, a: number, light: number, overlay: number): void;
    putBulkData(matrices: Pose, bakedQuad: BakedQuad, brightnessTable: number[], r: number, g: number, b: number, a: number, light: number[], overlay: number, colorize: boolean): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.render.immediate.buffer_builder.sorting' {
  import { VertexSorting } from 'com.mojang.blaze3d.vertex';

  class MeshDataMixin {
  }


  class VertexSortingMixin {
    static byDistance(x: number, y: number, z: number): VertexSorting;
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.render.immediate' {
  import { Direction } from 'net.minecraft.core';

  class DirectionMixin {
    static getNearest(x: number, y: number, z: number): Direction;
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.render.immediate.matrix_stack' {
  import { VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { Matrix4f } from 'org.joml';
  import { Pose } from 'PoseStack';

  class PoseStackMixin {
    popPose(): void;
    pushPose(): void;
  }


  class VertexConsumerMixin {
    addVertex(var1: number, var2: number, var3: number): VertexConsumer;
    addVertex(matrix: Matrix4f, x: number, y: number, z: number): VertexConsumer;
    setNormal(var1: number, var2: number, var3: number): VertexConsumer;
    setNormal(pose: Pose, x: number, y: number, z: number): VertexConsumer;
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.render.model.block' {
  class ModelBlockRendererMixin {
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.render.model.item' {
  class ItemRendererMixin {
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.render.model' {
  class ItemBlockRenderTypesMixin {
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.render.particle' {
  import { Particle } from 'net.minecraft.client.particle';

  interface SingleQuadParticleMixin extends Particle {}
  class SingleQuadParticleMixin extends Particle {
    getQuadSize(var1: number): number;
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.render.world.clouds' {
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { Matrix4f } from 'org.joml';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  class LevelRendererMixin {
    renderClouds(poseStack: PoseStack, matrix4f: Matrix4f, projectionMatrix: Matrix4f, tickDelta: number, x: number, y: number, z: number, ci: CallbackInfo): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.render.world.sky' {
  class ClientLevelMixin {
  }


  class FogRendererMixin {
  }


  class LevelRendererMixin {
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.shader.uniform' {
  class ShaderInstanceMixin {
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.textures.animations.tracking' {
  import { List } from 'java.util';
  import { FrameInfo, AnimatedTexture, InterpolationData } from 'SpriteContents';
  import { SpriteContentsExtension } from 'net.caffeinemc.mods.sodium.client.render.texture';
  import { SpriteContents } from 'net.minecraft.client.renderer.texture';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { SingleQuadParticle } from 'net.minecraft.client.particle';
  import { VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { Camera } from 'net.minecraft.client';

  class AnimatedTextureAccessor {
    get frames(): FrameInfo[];
  }


  class GuiGraphicsMixin {
  }


  class ModelBlockRendererMixin {
  }


  class SpriteContentsFrameInfoAccessor {
    get time(): number;
  }


  interface SpriteContentsMixin extends SpriteContentsExtension {}
  class SpriteContentsMixin extends SpriteContentsExtension {
    sodium$hasAnimation(): boolean;
    sodium$isActive(): boolean;
    sodium$setActive(value: boolean): void;
  }


  class SpriteContentsTickerMixin {
    assignParent(spriteContents: SpriteContents, animation: AnimatedTexture, interpolation: InterpolationData, ci: CallbackInfo): void;
  }


  class TextureAtlasMixin {
  }


  interface TextureSheetParticleMixin extends SingleQuadParticle {}
  class TextureSheetParticleMixin extends SingleQuadParticle {
    render(vertexConsumer: VertexConsumer, camera: Camera, tickDelta: number): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.textures.animations.upload' {
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { List } from 'java.util';
  import { FrameInfo, AnimatedTexture } from 'SpriteContents';
  import { SpriteContents } from 'net.minecraft.client.renderer.texture';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  class SpriteContentsAccessor {
    get images(): NativeImage[];
  }


  class SpriteContentsAnimatedTextureAccessor {
    get frameRowSize(): number;
    get frames(): FrameInfo[];
  }


  class SpriteContentsFrameInfoAccessor {
    get index(): number;
    get time(): number;
  }


  class SpriteContentsInterpolationMixin {
    assignParent(parent: SpriteContents, ci: CallbackInfo): void;
  }


  class SpriteContentsTickerAccessor {
    get animationInfo(): AnimatedTexture;
    get frameIndex(): number;
    get frameTicks(): number;
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.textures.mipmaps' {
  class MipmapGeneratorMixin {
  }


  class SpriteContentsMixin {
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.textures' {
  import { NativeImage } from 'com.mojang.blaze3d.platform';

  class NativeImageAccessor {
    get pixels(): number;
  }


  class SpriteContentsInvoker {
    invokeUpload(var1: number, var2: number, var3: number, var4: number, var5: NativeImage[]): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.textures.scan' {
  import { SpriteContentsExtension, TextureAtlasSpriteExtension } from 'net.caffeinemc.mods.sodium.client.render.chunk.compile.pipeline';

  interface SpriteContentsMixin extends SpriteContentsExtension {}
  class SpriteContentsMixin extends SpriteContentsExtension {
    sodium$hasTransparentPixels: boolean;
    sodium$hasTranslucentPixels: boolean;
    sodium$hasTranslucentPixels(): boolean;
    sodium$hasTransparentPixels(): boolean;
  }


  interface TextureAtlasSpriteMixin extends TextureAtlasSpriteExtension {}
  class TextureAtlasSpriteMixin extends TextureAtlasSpriteExtension {
    sodium$hasUnknownImageContents(): boolean;
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.features.world.biome' {
  import { BiomeSpecialEffects } from 'net.minecraft.world.level.biome';

  class BiomeMixin {
    get foliageColor(): number;
    get modifiedSpecialEffects(): BiomeSpecialEffects;
    getGrassColor(x: number, z: number): number;
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin' {
  import { Collection, Set, List } from 'java.util';
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { ClassNode } from 'org.objectweb.asm.tree';

  class MixinOption {
    constructor(name: string, enabled: boolean, userDefined: boolean);
    addModOverride(enabled: boolean, modId: string): void;
    clearModsDefiningValue(): void;
    get definingMods(): Collection<string>;
    get name(): string;
    isEnabled(): boolean;
    isModDefined(): boolean;
    isOverridden(): boolean;
    isUserDefined(): boolean;
    setEnabled(enabled: boolean, userDefined: boolean): void;
  }


  interface SodiumMixinPlugin extends IMixinConfigPlugin {}
  class SodiumMixinPlugin extends IMixinConfigPlugin {
    acceptTargets(myTargets: Set<string>, otherTargets: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    onLoad(mixinPackage: string): void;
    postApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    preApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    shouldApplyMixin(targetClassName: string, mixinClassName: string): boolean;
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.platform.neoforge' {
  import { RenderContext } from 'net.fabricmc.fabric.api.renderer.v1.render';
  import { ModelData } from 'net.neoforged.neoforge.client.model.data';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { SodiumAuxiliaryLightManager } from 'net.caffeinemc.mods.sodium.client.world';
  import { ChunkRenderTypeSet } from 'net.neoforged.neoforge.client';
  import { BitSet } from 'java.util';
  import { BlockAndTintGetter, ChunkPos } from 'net.minecraft.world.level';
  import { SodiumModelData } from 'net.caffeinemc.mods.sodium.client.services';
  import { BlockPos } from 'net.minecraft.core';
  import { AuxiliaryLightManager } from 'net.neoforged.neoforge.common.world';

  interface AbstractBlockRenderContextMixin extends RenderContext {}
  class AbstractBlockRenderContextMixin extends RenderContext {
    get modelData(): ModelData;
    get renderType(): RenderType;
  }


  interface AuxiliaryLightManagerMixin extends SodiumAuxiliaryLightManager {}
  class AuxiliaryLightManagerMixin extends SodiumAuxiliaryLightManager {
  }


  class ChunkRenderTypeSetAccessor {
    static create(set: BitSet): ChunkRenderTypeSet;
    get bits(): BitSet;
  }


  class ClientHooksMixin {
  }


  class EntrypointMixin {
  }


  interface LevelSliceMixin extends BlockAndTintGetter {}
  class LevelSliceMixin extends BlockAndTintGetter {
    getAuxLightManager(pos: ChunkPos): AuxiliaryLightManager;
    getAuxLightManager(pos: BlockPos): AuxiliaryLightManager;
    static getLocalSectionIndex(sectionX: number, sectionY: number, sectionZ: number): number;
    getModelData(pos: BlockPos): ModelData;
    getPlatformModelData(pos: BlockPos): SodiumModelData;
    getShade(normalX: number, normalY: number, normalZ: number, shade: boolean): number;
  }


  interface ModelDataMixin extends SodiumModelData {}
  class ModelDataMixin extends SodiumModelData {
  }


  class ResourcePackLoaderMixin {
  }


  class SimpleBakedModelAccessor {
    get blockRenderTypes(): ChunkRenderTypeSet;
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.workarounds.context_creation' {
  class WindowMixin {
  }

}

declare module 'net.caffeinemc.mods.sodium.mixin.workarounds.event_loop' {
  class RenderSystemMixin {
  }

}

declare module 'net.caffeinemc.mods.sodium.neoforge.block' {
  import { PlatformBlockAccess, SodiumModelData } from 'net.caffeinemc.mods.sodium.client.services';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockAndTintGetter, BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { ModelQuadView } from 'net.caffeinemc.mods.sodium.client.model.quad';
  import { AmbientOcclusionMode } from 'net.caffeinemc.mods.sodium.client.render.frapi.render';
  import { BakedModel } from 'net.minecraft.client.resources.model';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { LocalPlayer } from 'net.minecraft.client.player';

  interface NeoForgeBlockAccess extends PlatformBlockAccess {}
  class NeoForgeBlockAccess extends PlatformBlockAccess {
    getLightEmission(state: BlockState, level: BlockAndTintGetter, pos: BlockPos): number;
    getNormalVectorShade(quad: ModelQuadView, level: BlockAndTintGetter, shade: boolean): number;
    platformHasBlockData(): boolean;
    shouldBlockEntityGlow(blockEntity: BlockEntity, player: LocalPlayer): boolean;
    shouldOccludeFluid(adjDirection: Direction, adjBlockState: BlockState, fluid: FluidState): boolean;
    shouldShowFluidOverlay(block: BlockState, level: BlockAndTintGetter, pos: BlockPos, fluidState: FluidState): boolean;
    shouldSkipRender(level: BlockGetter, selfState: BlockState, otherState: BlockState, selfPos: BlockPos, otherPos: BlockPos, facing: Direction): boolean;
    usesAmbientOcclusion(model: BakedModel, state: BlockState, data: SodiumModelData, renderType: RenderType, level: BlockAndTintGetter, pos: BlockPos): AmbientOcclusionMode;
  }

}

declare module 'net.caffeinemc.mods.sodium.neoforge' {
  import { PlatformMixinOverrides, PlatformRuntimeInformation } from 'net.caffeinemc.mods.sodium.client.services';
  import { List } from 'java.util';
  import { MixinOverride } from 'net.caffeinemc.mods.sodium.client.services.PlatformMixinOverrides';
  import { Path } from 'java.nio.file';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';

  interface ForgeMixinOverrides extends PlatformMixinOverrides {}
  class ForgeMixinOverrides extends PlatformMixinOverrides {
    applyModOverrides(): MixinOverride[];
  }


  interface NeoForgeRuntimeInformation extends PlatformRuntimeInformation {}
  class NeoForgeRuntimeInformation extends PlatformRuntimeInformation {
    get configDirectory(): Path;
    get gameDirectory(): Path;
    isDevelopmentEnvironment(): boolean;
    isModInLoadingList(modId: string): boolean;
    platformHasEarlyLoadingScreen(): boolean;
    platformUsesRefmap(): boolean;
    usesAlphaMultiplication(): boolean;
  }


  class SodiumForgeMod {
    constructor(bus: IEventBus, modContainer: ModContainer);
  }

}

declare module 'net.caffeinemc.mods.sodium.neoforge.level' {
  import { PlatformLevelAccess, PlatformLevelRenderHooks } from 'net.caffeinemc.mods.sodium.client.services';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { SodiumAuxiliaryLightManager, LevelSlice } from 'net.caffeinemc.mods.sodium.client.world';
  import { LevelChunk } from 'net.minecraft.world.level.chunk';
  import { SectionPos, BlockPos } from 'net.minecraft.core';
  import { RenderType, LevelRenderer } from 'net.minecraft.client.renderer';
  import { Matrix4f } from 'org.joml';
  import { Camera } from 'net.minecraft.client';
  import { Frustum } from 'net.minecraft.client.renderer.culling';
  import { List } from 'java.util';
  import { Level } from 'net.minecraft.world.level';
  import { Function } from 'java.util.function';
  import { VertexConsumer } from 'com.mojang.blaze3d.vertex';

  interface NeoForgeLevelAccess extends PlatformLevelAccess {}
  class NeoForgeLevelAccess extends PlatformLevelAccess {
    getBlockEntityData(blockEntity: BlockEntity): any;
    getLightManager(chunk: LevelChunk, pos: SectionPos): SodiumAuxiliaryLightManager;
  }


  interface NeoForgeLevelRenderHooks extends PlatformLevelRenderHooks {}
  class NeoForgeLevelRenderHooks extends PlatformLevelRenderHooks {
    retrieveChunkMeshAppenders(level: Level, origin: BlockPos): any[];
    runChunkLayerEvents(renderType: RenderType, levelRenderer: LevelRenderer, modelMatrix: Matrix4f, projectionMatrix: Matrix4f, renderTick: number, camera: Camera, frustum: Frustum): void;
    runChunkMeshAppenders(renderers: any[], typeToConsumer: Function<RenderType, VertexConsumer>, slice: LevelSlice): void;
  }

}

declare module 'net.caffeinemc.mods.sodium.neoforge.model' {
  import { PlatformModelAccess, SodiumModelData, SodiumModelDataContainer } from 'net.caffeinemc.mods.sodium.client.services';
  import { Iterable } from 'java.lang';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { BlockAndTintGetter, Level } from 'net.minecraft.world.level';
  import { BakedModel } from 'net.minecraft.client.resources.model';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockPos, Direction, SectionPos } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';
  import { List } from 'java.util';
  import { BakedQuad } from 'net.minecraft.client.renderer.block.model';
  import { LevelSlice } from 'net.caffeinemc.mods.sodium.client.world';

  interface NeoForgeModelAccess extends PlatformModelAccess {}
  class NeoForgeModelAccess extends PlatformModelAccess {
    get emptyModelData(): SodiumModelData;
    getModelData(slice: LevelSlice, model: BakedModel, state: BlockState, pos: BlockPos, originalData: SodiumModelData): SodiumModelData;
    getModelDataContainer(level: Level, sectionPos: SectionPos): SodiumModelDataContainer;
    getModelRenderTypes(level: BlockAndTintGetter, model: BakedModel, state: BlockState, pos: BlockPos, random: RandomSource, modelData: SodiumModelData): Iterable<RenderType>;
    getQuads(level: BlockAndTintGetter, pos: BlockPos, model: BakedModel, state: BlockState, face: Direction, random: RandomSource, renderType: RenderType, modelData: SodiumModelData): BakedQuad[];
  }

}

declare module 'net.caffeinemc.mods.sodium.neoforge.render.FluidRendererImpl' {
  import { FluidRendererFactory } from 'net.caffeinemc.mods.sodium.client.services';
  import { FluidRenderer } from 'net.caffeinemc.mods.sodium.client.render.chunk.compile.pipeline';
  import { ColorProviderRegistry } from 'net.caffeinemc.mods.sodium.client.model.color';
  import { LightPipelineProvider } from 'net.caffeinemc.mods.sodium.client.model.light';
  import { BlendedColorProvider } from 'net.caffeinemc.mods.sodium.client.model.quad.blender';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  interface ForgeFactory extends FluidRendererFactory {}
  class ForgeFactory extends FluidRendererFactory {
    createPlatformFluidRenderer(colorRegistry: ColorProviderRegistry, lightPipelineProvider: LightPipelineProvider): FluidRenderer;
    get waterBlockColorProvider(): BlendedColorProvider<BlockState>;
    get waterColorProvider(): BlendedColorProvider<FluidState>;
  }

}

declare module 'net.caffeinemc.mods.sodium.neoforge.render' {
  import { ColorProvider } from 'net.caffeinemc.mods.sodium.client.model.color';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { IClientFluidTypeExtensions } from 'net.neoforged.neoforge.client.extensions.common';

  class ForgeColorProviders {
    static adapt(handler: IClientFluidTypeExtensions): ColorProvider<FluidState>;
  }

}