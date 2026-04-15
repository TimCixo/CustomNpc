declare module 'net.mehvahdjukaar.fastpaintings' {
  import { Logger } from 'org.apache.logging.log4j';
  import { Supplier } from 'java.util.function';
  import { ModConfigHolder } from 'net.mehvahdjukaar.moonlight.api.platform.configs';
  import { SoundType, EntityBlock, Block } from 'net.minecraft.world.level.block';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Enum } from 'java.lang';
  import { List, Map } from 'java.util';
  import { WaterBlock } from 'net.mehvahdjukaar.moonlight.api.block';
  import { Properties } from 'BlockBehaviour';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level, LevelReader, BlockGetter, LevelAccessor, BlockAndTintGetter } from 'net.minecraft.world.level';
  import { BlockPos, Holder, Direction } from 'net.minecraft.core';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Builder } from 'LootParams';
  import { PaintingVariant, Painting } from 'net.minecraft.world.entity.decoration';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { IExtraModelDataProvider, ModelDataKey, CustomBakedModel, ExtraModelData, CustomModelLoader, CustomGeometry } from 'net.mehvahdjukaar.moonlight.api.client.model';
  import { VariantHolder } from 'net.minecraft.world.entity';
  import { ClientboundBlockEntityDataPacket } from 'net.minecraft.network.protocol.game';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { Builder as extramodeldata_Builder } from 'ExtraModelData';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { BakedModel } from 'net.minecraft.client.resources.model';
  import { BakedQuad, ItemOverrides, ItemTransforms } from 'net.minecraft.client.renderer.block.model';
  import { RandomSource } from 'net.minecraft.util';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { JsonObject, JsonDeserializationContext } from 'com.google.gson';

  class FastPaintings {
    static readonly MOD_ID: string;
    static readonly LOGGER: Logger;
    static readonly SPECIAL_DROP: Supplier;
    static readonly CONFIG: ModConfigHolder;
    static readonly PAINTING: SoundType;
    static readonly PAINTING_BLOCK: Supplier;
    static readonly PAINTING_TILE: Supplier;
    static init(): void;
    static res(name: string): ResourceLocation;
  }


  class FastPaintingsClient {
    static readonly PAINTING_SHEET: ResourceLocation;
    static init(): void;
    static setup(): void;
  }


  interface NBTDropMode extends Enum<NBTDropMode> {}
  class NBTDropMode extends Enum<NBTDropMode> {
    static readonly OFF: NBTDropMode;
    static readonly ALWAYS: NBTDropMode;
    static readonly WHEN_PLACED_WITH_NBT: NBTDropMode;
    static valueOf(name: string): NBTDropMode;
    static values(): NBTDropMode[];
  }


  interface PaintingBlock extends EntityBlock, WaterBlock {}
  class PaintingBlock extends EntityBlock {
    constructor(properties: Properties);
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    getCloneItemStack(level: LevelReader, pos: BlockPos, state: BlockState): ItemStack;
    getCollisionShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getDrops(state: BlockState, params: Builder): ItemStack[];
    static getMaster(state: BlockState, pos: BlockPos, level: BlockAndTintGetter): PaintingBlockEntity;
    static getPaintingItem(level: LevelReader, variant: Holder<PaintingVariant>, wasPlacedWithNbt: boolean): ItemStack;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, collisionContext: CollisionContext): VoxelShape;
    static isMaster(state: BlockState): boolean;
    isPossibleToRespawnInThis(blockState: BlockState): boolean;
    neighborChanged(state: BlockState, level: Level, pos: BlockPos, block: Block, fromPos: BlockPos, isMoving: boolean): void;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    playerWillDestroy(level: Level, pos: BlockPos, state: BlockState, player: Player): BlockState;
    skipRendering(state: BlockState, adjacentBlockState: BlockState, direction: Direction): boolean;
    static tryConverting(entity: Painting, stack: ItemStack): boolean;
    updateShape(stateIn: BlockState, updateDir: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }


  interface PaintingBlockEntity extends IExtraModelDataProvider, VariantHolder<Holder>, BlockEntity {}
  class PaintingBlockEntity extends IExtraModelDataProvider {
    static readonly MIMIC_KEY: ModelDataKey;
    constructor(blockPos: BlockPos, blockState: BlockState);
    addExtraModelData(builder: extramodeldata_Builder): void;
    get paintingDropLocation(): Vec3;
    get updatePacket(): ClientboundBlockEntityDataPacket;
    get variant(): Holder<PaintingVariant>;
    getUpdateTag(registries: Provider): CompoundTag;
    isPlacedWithNbt(): boolean;
    set variant(variant: Holder<PaintingVariant>);
    setPlacedWithNbt(bool: boolean): void;
  }


  interface PaintingBlockModel extends CustomBakedModel {}
  class PaintingBlockModel extends CustomBakedModel {
    static readonly BACK_TEXTURE: ResourceLocation;
    constructor(paintingModels: Map<string, BakedModel>);
    get overrides(): ItemOverrides;
    get transforms(): ItemTransforms;
    getBlockParticle(data: ExtraModelData): TextureAtlasSprite;
    getBlockQuads(state: BlockState, side: Direction, rand: RandomSource, renderType: RenderType, data: ExtraModelData): BakedQuad[];
    getIndex(top: boolean, bottom: boolean, left: boolean, right: boolean): number;
    getModelData(originalTileData: ExtraModelData, pos: BlockPos, state: BlockState, level: BlockAndTintGetter): ExtraModelData;
    isCustomRenderer(): boolean;
    isGui3d(): boolean;
    useAmbientOcclusion(): boolean;
    usesBlockLight(): boolean;
  }


  interface PaintingBlockModelLoader extends CustomModelLoader {}
  class PaintingBlockModelLoader extends CustomModelLoader {
    deserialize(json: JsonObject, context: JsonDeserializationContext): CustomGeometry;
  }

}

declare module 'net.mehvahdjukaar.fastpaintings.mixins' {
  import { Entity, EntityType } from 'net.minecraft.world.entity';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Level, ItemLike } from 'net.minecraft.world.level';
  import { Operation } from 'com.llamalad7.mixinextras.injector.wrapoperation';
  import { Boolean } from 'java.lang';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Holder } from 'net.minecraft.core';
  import { PaintingVariant, Painting } from 'net.minecraft.world.entity.decoration';
  import { ItemEntity } from 'net.minecraft.world.entity.item';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';

  interface HangingentityMixin extends Entity {}
  class HangingentityMixin extends Entity {
    tick(ci: CallbackInfo): void;
  }


  class PaintingItemMixin {
    fastPaintings$convertImmediately(instance: Level, entity: Entity, original: Operation<boolean>, stack: ItemStack): boolean;
  }


  interface PaintingMixin extends Entity {}
  class PaintingMixin extends Entity {
    constructor(entityType: EntityType<any>, level: Level);
    fastPaintings$betterDrop(instance: Painting, itemLike: ItemLike, original: Operation<ItemEntity>): ItemEntity;
    get variant(): Holder<PaintingVariant>;
  }


  class PaintingRendererHackMixin {
    cancelFirstRenderTick(entity: Painting, entityYaw: number, partialTicks: number, matrixStack: PoseStack, buffer: MultiBufferSource, packedLight: number, ci: CallbackInfo): void;
  }

}

declare module 'net.mehvahdjukaar.fastpaintings.neoforge' {
  import { IEventBus } from 'net.neoforged.bus.api';

  class FastPaintingsForge {
    constructor(busEvent: IEventBus);
  }

}