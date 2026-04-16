declare module 'com.moepus.createbetterfps' {
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { Set, List } from 'java.util';
  import { ClassNode } from 'org.objectweb.asm.tree';

  class CreateBetterFps {
    static readonly MODID: string;
    constructor(modEventBus: IEventBus, modContainer: ModContainer);
  }


  interface MixinPlugin extends IMixinConfigPlugin {}
  class MixinPlugin extends IMixinConfigPlugin {
    acceptTargets(myTargets: Set<string>, otherTargets: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    onLoad(mixinPackage: string): void;
    postApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    preApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    shouldApplyMixin(targetClassName: string, mixinClassName: string): boolean;
  }

}

declare module 'com.moepus.createbetterfps.mixin' {
  import { CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { SuperByteBuffer } from 'net.createmod.catnip.render';
  import { MeshData } from 'com.mojang.blaze3d.vertex';

  class ShadedBlockSbbBuilderMixin {
    onEnd(cir: CallbackInfoReturnable<SuperByteBuffer>): void;
  }


  class SuperBufferFactoryMixin {
    onCreate(data: MeshData, cir: CallbackInfoReturnable<SuperByteBuffer>): void;
  }


  class SuperByteBufferBuilderMixin {
    onBuild(cir: CallbackInfoReturnable<SuperByteBuffer>): void;
  }

}

declare module 'com.moepus.createbetterfps.renderer' {
  import { VertexFormat, PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { Matrix4f, Quaternionfc, Matrix4fc, Matrix3fc, Vector3f } from 'org.joml';
  import { SuperByteBuffer, TemplateMesh, SpriteShiftEntry } from 'net.createmod.catnip.render';
  import { Color } from 'net.createmod.catnip.theme';
  import { BlockAndTintGetter } from 'net.minecraft.world.level';

  class BlockVertex {
    static readonly FORMAT: VertexFormat;
    static readonly STRIDE: number;
    static write(ptr: number, x: number, y: number, z: number, color: number, u: number, v: number, light: number, normal: number): void;
  }


  class EntityVertex {
    static readonly FORMAT: VertexFormat;
    static readonly STRIDE: number;
    static write(ptr: number, x: number, y: number, z: number, color: number, u: number, v: number, overlay: number, light: number, normal: number): void;
  }


  class IrisCompat {
    static readonly IS_IRIS_INSTALLED: boolean;
    static get shadowMV(): Matrix4f;
    static isShadowPass(): boolean;
  }


  class IrisEntityVertex {
    static readonly FORMAT: VertexFormat;
    static readonly STRIDE: number;
    static readonly ENTITY_ID_OFFSET: number;
    static readonly BLOCK_ENTITY_ID_OFFSET: number;
    static readonly ITEM_ID_OFFSET: number;
    static readonly MID_U_OFFSET: number;
    static readonly MID_V_OFFSET: number;
    static readonly TANGENT_OFFSET: number;
    static write(ptr: number, x: number, y: number, z: number, color: number, u: number, v: number, mid_u: number, mid_v: number, overlay: number, light: number, normal: number, tangent: number): void;
  }


  class IrisTerrainVertex {
    static readonly FORMAT: VertexFormat;
    static readonly STRIDE: number;
    static write(ptr: number, x: number, y: number, z: number, color: number, u: number, v: number, mid_u: number, mid_v: number, light: number, normal: number, tangent: number): void;
  }


  interface SodiumByteBuffer extends SuperByteBuffer {}
  class SodiumByteBuffer extends SuperByteBuffer {
    constructor(template: TemplateMesh, shadeSwapVertices: number[], invertFakeDiffuseNormal: boolean);

    constructor(template: TemplateMesh, shadeSwapVertices: number[]);

    constructor(template: TemplateMesh);
    color(r: number, g: number, b: number, a: number): SuperByteBuffer;
    color(r: number, g: number, b: number, a: number): SuperByteBuffer;
    color(color: number): SuperByteBuffer;
    color(c: Color): SuperByteBuffer;
    defaultRenderInto(input: PoseStack, builder: VertexConsumer): void;
    disableDiffuse(): SuperByteBuffer;
    get transforms(): PoseStack;
    static getLight(world: BlockAndTintGetter, lightPos: Vector3f): number;
    getLight(lightPos: Vector3f): number;
    isEmpty(): boolean;
    light(packedLight: number): SuperByteBuffer;
    mulNormal(normal: Matrix3fc): SuperByteBuffer;
    mulPose(pose: Matrix4fc): SuperByteBuffer;
    overlay(overlay: number): SuperByteBuffer;
    popPose(): SuperByteBuffer;
    pushPose(): SuperByteBuffer;
    renderInto(input: PoseStack, builder: VertexConsumer): void;
    renderIntoSodium(input: PoseStack, builder: VertexConsumer): boolean;
    reset(): SuperByteBuffer;
    rotate(quaternion: Quaternionfc): SuperByteBuffer;
    scale(factorX: number, factorY: number, factorZ: number): SuperByteBuffer;
    shiftUV(entry: SpriteShiftEntry): SuperByteBuffer;
    shiftUVScrolling(entry: SpriteShiftEntry, scrollV: number): SuperByteBuffer;
    shiftUVScrolling(entry: SpriteShiftEntry, scrollU: number, scrollV: number): SuperByteBuffer;
    shiftUVtoSheet(entry: SpriteShiftEntry, uTarget: number, vTarget: number, sheetSize: number): SuperByteBuffer;
    translate(x: number, y: number, z: number): SuperByteBuffer;
    useLevelLight(level: BlockAndTintGetter): SuperByteBuffer;
    useLevelLight(level: BlockAndTintGetter, lightTransform: Matrix4f): SuperByteBuffer;
  }

}