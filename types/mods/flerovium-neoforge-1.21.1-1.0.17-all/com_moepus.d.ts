declare module 'com.moepus.flerovium' {
  import { Logger } from 'org.slf4j';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { Set, List } from 'java.util';
  import { ClassNode } from 'org.objectweb.asm.tree';

  class Config {
    entityBackFaceCulling: boolean;
    itemBackFaceCulling: boolean;
    reduceTerrainParticles: boolean;
    skipEntityTangentCompute: boolean;
  }


  class ConfigParser {
    static get config(): Config;
    static loadConfig(): void;
    static saveConfig(): void;
  }


  class Flerovium {
    static readonly MODID: string;
    static readonly LOGGER: Logger;
    static readonly config: Config;
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

declare module 'com.moepus.flerovium.functions.BlockBreaking' {
  import { VertexConsumer, PoseStack, VertexFormat } from 'com.mojang.blaze3d.vertex';
  import { Pose } from 'PoseStack';
  import { BakedQuad, ItemOverrides } from 'net.minecraft.client.renderer.block.model';
  import { BlockRenderDispatcher } from 'net.minecraft.client.renderer.block';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { BlockAndTintGetter } from 'net.minecraft.world.level';
  import { ModelData } from 'net.neoforged.neoforge.client.model.data';
  import { BakedModel } from 'net.minecraft.client.resources.model';
  import { List } from 'java.util';
  import { RandomSource } from 'net.minecraft.util';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';

  interface BlockBreakingDecalGenerator extends VertexConsumer {}
  class BlockBreakingDecalGenerator extends VertexConsumer {
    constructor(delegate: VertexConsumer, relX: number, blockY: number, blockZ: number);
    addVertex(x: number, y: number, z: number): VertexConsumer;
    putBulkData(pose: Pose, bakedQuad: BakedQuad, brightness: number[], red: number, green: number, blue: number, alpha: number, lightmap: number[], packedOverlay: number, readAlpha: boolean): void;
    setColor(red: number, green: number, blue: number, alpha: number): VertexConsumer;
    setNormal(normalX: number, normalY: number, normalZ: number): VertexConsumer;
    setUv(u: number, v: number): VertexConsumer;
    setUv1(u: number, v: number): VertexConsumer;
    setUv2(u: number, v: number): VertexConsumer;
  }


  class BlockBreakingRenderer {
    static renderBreakingTexture(blockRenderDispatcher: BlockRenderDispatcher, camPos: Vec3, state: BlockState, pos: BlockPos, level: BlockAndTintGetter, poseStack: PoseStack, consumer: VertexConsumer, modelData: ModelData): void;
  }


  class BlockVertex {
    static readonly FORMAT: VertexFormat;
    static readonly STRIDE: number;
    static write(ptr: number, x: number, y: number, z: number, color: number, u: number, v: number, light: number, normal: number): void;
  }


  interface WrappedModel extends BakedModel {}
  class WrappedModel extends BakedModel {
    constructor(original: BakedModel, faces: number);
    get overrides(): ItemOverrides;
    get particleIcon(): TextureAtlasSprite;
    getQuads(state: BlockState, direction: Direction, random: RandomSource): BakedQuad[];
    isCustomRenderer(): boolean;
    isGui3d(): boolean;
    useAmbientOcclusion(): boolean;
    usesBlockLight(): boolean;
  }

}

declare module 'com.moepus.flerovium.functions' {
  import { BakedModel, SimpleBakedModel } from 'net.minecraft.client.resources.model';
  import { List } from 'java.util';
  import { BakedQuad, ItemOverrides } from 'net.minecraft.client.renderer.block.model';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Direction } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { VertexFormat, PoseStack } from 'com.mojang.blaze3d.vertex';
  import { ItemStack } from 'net.minecraft.world.item';
  import { VertexBufferWriter } from 'net.caffeinemc.mods.sodium.api.vertex.buffer';
  import { ItemColors } from 'net.minecraft.client.color.item';
  import { Matrix4f, Matrix3f } from 'org.joml';

  interface DummyModel extends BakedModel {}
  class DummyModel extends BakedModel {
    get overrides(): ItemOverrides;
    get particleIcon(): TextureAtlasSprite;
    getQuads(blockState: BlockState, direction: Direction, randomSource: RandomSource): BakedQuad[];
    isCustomRenderer(): boolean;
    isGui3d(): boolean;
    useAmbientOcclusion(): boolean;
    usesBlockLight(): boolean;
  }


  class EntityVertex {
    static readonly FORMAT: VertexFormat;
    static readonly STRIDE: number;
    static write(ptr: number, x: number, y: number, z: number, color: number, u: number, v: number, overlay: number, light: number, normal: number): void;
  }


  class FastSimpleBakedModelRenderer {
    static readonly VERTEX_COUNT: number;
    static readonly BUFFER_VERTEX_COUNT: number;
    static readonly STRIDE: number;
    static render(model: SimpleBakedModel, faces: number, itemStack: ItemStack, packedLight: number, packedOverlay: number, poseStack: PoseStack, writer: VertexBufferWriter, itemColors: ItemColors): void;
  }


  class MathUtil {
    static readonly PACK_FACTOR: number[];
    static compose(lo: number, hi: number): number;
    static cullBackFace(viewX: number, viewY: number, viewZ: number, normal: number): boolean;
    static normal2Int(x: number, y: number, z: number): number;
    static packSafe(x: number, y: number, z: number, factor: number): number;
    static packSafe(x: number, y: number, z: number): number;
    static packUnsafe(x: number, y: number, z: number, factor: number): number;
    static packUnsafe(x: number, y: number, z: number): number;
  }


  class MatrixStuff {
    static rotateXY(dest: Matrix4f, sinX: number, cosX: number, sinY: number, cosY: number): void;
    static rotateXY(dest: Matrix3f, sinX: number, cosX: number, sinY: number, cosY: number): void;
  }

}

declare module 'com.moepus.flerovium.Iris' {
  import { ModelCuboid } from 'net.caffeinemc.mods.sodium.client.render.immediate.model';
  import { VertexFormat, PoseStack } from 'com.mojang.blaze3d.vertex';
  import { SimpleBakedModel } from 'net.minecraft.client.resources.model';
  import { ItemStack } from 'net.minecraft.world.item';
  import { VertexBufferWriter } from 'net.caffeinemc.mods.sodium.api.vertex.buffer';
  import { ItemColors } from 'net.minecraft.client.color.item';

  class IrisCompat {
    static readonly IS_IRIS_INSTALLED: boolean;
  }


  class IrisEntityRenderer {
    static emitQuads(buffer: number, cuboid: ModelCuboid, packedOverlayLight: number, cullMask: number, CUBE_VERTEX_XY: number[], CUBE_VERTEX_ZW: number[], CUBE_FACE_NORMAL: number[]): number;
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
    static write(ptr: number, xy: number, zc: number, uv: number, overlayLight: number, normal: number, mid_uv: number, tangent: number): void;
  }


  class IrisSimpleBakedItemRenderer {
    static render(model: SimpleBakedModel, faces: number, itemStack: ItemStack, packedLight: number, packedOverlay: number, poseStack: PoseStack, writer: VertexBufferWriter, itemColors: ItemColors): void;
  }


  class IrisTerrainVertex {
    static readonly FORMAT: VertexFormat;
    static readonly STRIDE: number;
    static write(ptr: number, x: number, y: number, z: number, color: number, u: number, v: number, mid_u: number, mid_v: number, light: number, normal: number, tangent: number): void;
  }

}

declare module 'com.moepus.flerovium.mixins.Block' {
  import { Frustum } from 'net.minecraft.client.renderer.culling';

  class CrumblingRendererMixin {
    get frustum(): Frustum;
  }

}

declare module 'com.moepus.flerovium.mixins.Entity' {
  import { CommonLevelAccessor } from 'net.minecraft.world.level';
  import { List } from 'java.util';
  import { VoxelShape } from 'net.minecraft.world.phys.shapes';
  import { Entity } from 'net.minecraft.world.entity';
  import { AABB } from 'net.minecraft.world.phys';

  interface ClientLevelMixin extends CommonLevelAccessor {}
  class ClientLevelMixin extends CommonLevelAccessor {
    getEntityCollisions(entity: Entity, aabb: AABB): VoxelShape[];
  }


  class ModelCuboidAccessor {
    get cullMask(): number;
  }

}

declare module 'com.moepus.flerovium.mixins.Item' {
  import { EntityRenderer } from 'net.minecraft.client.renderer.entity';
  import { ItemEntity } from 'net.minecraft.world.entity.item';
  import { BakedModel } from 'net.minecraft.client.resources.model';
  import { ItemStack, ItemDisplayContext } from 'net.minecraft.world.item';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Vector3f } from 'org.joml';
  import { IBakedModelExtension } from 'net.neoforged.neoforge.client.extensions';
  import { List } from 'java.util';
  import { RenderType } from 'net.minecraft.client.renderer';

  interface ItemEntityRenderMixin extends EntityRenderer<ItemEntity> {}
  class ItemEntityRenderMixin extends EntityRenderer<ItemEntity> {
  }


  class ItemRendererMixin {
    onRrenderModelLists(model: BakedModel, stack: ItemStack, light: number, overlay: number, poseStack: PoseStack, vertexConsumer: VertexConsumer, originalModel: BakedModel, itemDisplayContext: ItemDisplayContext): BakedModel;
    renderModelLists(model: BakedModel, itemStack: ItemStack, packedLight: number, packedOverlay: number, poseStack: PoseStack, vertexConsumer: VertexConsumer, ci: CallbackInfo): void;
  }


  class ItemTransformMixin {
    rotation: Vector3f;
    translation: Vector3f;
    scale: Vector3f;
    rightRotation: Vector3f;
    apply(doFlip: boolean, pose: PoseStack, ci: CallbackInfo): void;
    init(p_254427_: Vector3f, p_254496_: Vector3f, p_254022_: Vector3f, rightRotation: Vector3f, ci: CallbackInfo): void;
  }


  interface SimpleBakedModelMixin extends IBakedModelExtension {}
  class SimpleBakedModelMixin extends IBakedModelExtension {
    getRenderTypes(itemStack: ItemStack, fabulous: boolean): RenderType[];
  }

}

declare module 'com.moepus.flerovium.mixins.Particle' {
  import { Particle } from 'net.minecraft.client.particle';

  interface CampfireSmokeParticleMixin extends Particle {}
  class CampfireSmokeParticleMixin extends Particle {
  }


  class ParticleAccessor {
    isStoppedByCollision(): boolean;
  }


  class ParticleEngineMixin {
  }


  class ReduceTerrainParticlesMixin {
  }


  interface SingleQuadParticleMixin extends Particle {}
  class SingleQuadParticleMixin extends Particle {
  }

}

declare module 'com.moepus.flerovium.mixins.Sound' {
  class ClientLevelMixin {
  }


  class SoundEngineMixin {
  }

}