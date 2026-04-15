declare module 'net.mehvahdjukaar.moonlight.api.block' {
  import { BlockEntity, RandomizableContainerBlockEntity } from 'net.minecraft.world.level.block.entity';
  import { IExtraModelDataProvider, ModelDataKey } from 'net.mehvahdjukaar.moonlight.api.client.model';
  import { Builder } from 'net.mehvahdjukaar.moonlight.api.client.model.ExtraModelData';
  import { Vec3, AABB } from 'net.minecraft.world.phys';
  import { Level, BlockGetter, LevelAccessor, LevelReader, Explosion } from 'net.minecraft.world.level';
  import { BlockPos, Direction, NonNullList } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { DyeColor, ItemStack } from 'net.minecraft.world.item';
  import { ItemInteractionResult, InteractionHand, WorldlyContainer } from 'net.minecraft.world';
  import { Player, Inventory } from 'net.minecraft.world.entity.player';
  import { TagKey } from 'net.minecraft.tags';
  import { Entity } from 'net.minecraft.world.entity';
  import { FireSoundType } from 'net.mehvahdjukaar.moonlight.api.block.ILightable';
  import { UUID, Optional, List } from 'java.util';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { BlockStateBase, Properties } from 'BlockBehaviour';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { PistonMovingBlockEntity } from 'net.minecraft.world.level.block.piston';
  import { Rotation, Block, SoundType, LiquidBlock, StairBlock, SimpleWaterloggedBlock } from 'net.minecraft.world.level.block';
  import { SoftFluidStack, SoftFluidTank } from 'net.mehvahdjukaar.moonlight.api.fluids';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { Provider } from 'HolderLookup';
  import { ClientboundBlockEntityDataPacket } from 'net.minecraft.network.protocol.game';
  import { AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { Builder as lootparams_Builder } from 'LootParams';
  import { MapCodec } from 'com.mojang.serialization';
  import { Supplier } from 'java.util.function';
  import { FlowingFluid, FluidState } from 'net.minecraft.world.level.material';
  import { BooleanProperty } from 'net.minecraft.world.level.block.state.properties';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';

  interface DynamicRenderedBlockTile extends IExtraModelDataProvider, BlockEntity {}
  class DynamicRenderedBlockTile extends IExtraModelDataProvider {
    static readonly IS_FANCY: ModelDataKey;
    addExtraModelData(builder: Builder): void;
    isNeverFancy(): boolean;
    onFancyChanged(fancy: boolean): void;
    rendersFancy(): boolean;
    shouldRenderFancy(cameraPos: Vec3): boolean;
  }


  interface DynamicRenderedItemDisplayTile extends IExtraModelDataProvider, ItemDisplayTile {}
  class DynamicRenderedItemDisplayTile extends IExtraModelDataProvider {
    static readonly IS_FANCY: ModelDataKey;
    addExtraModelData(builder: Builder): void;
    isNeverFancy(): boolean;
    onFancyChanged(fancy: boolean): void;
    rendersFancy(): boolean;
    shouldRenderFancy(cameraPos: Vec3): boolean;
    shouldRenderFancy(): boolean;
  }


  class IBeeGrowable {
    getPollinated(var1: Level, var2: BlockPos, var3: BlockState): boolean;
    isPlantFullyGrown(state: BlockState, pos: BlockPos, level: Level): boolean;
  }


  class IBlockHolder {
    get heldBlock(): BlockState;
    getHeldBlock(var1: number): BlockState;
    set heldBlock(state: BlockState);
    setHeldBlock(var1: BlockState, var2: number): boolean;
  }


  class IColored {
    get color(): DyeColor;
    supportsBlankColor(): boolean;
  }


  class IFlammable {
    getFireSpreadSpeed(var1: BlockState, var2: BlockGetter, var3: BlockPos, var4: Direction): number;
    getFlammability(var1: BlockState, var2: BlockGetter, var3: BlockPos, var4: Direction): number;
  }


  class IGlowable {
    isGlowing(): boolean;
    setGlowing(var1: boolean): void;
    tryGlowingWithItem(level: Level, pos: BlockPos, player: Player, stack: ItemStack): ItemInteractionResult;
  }


  class ILightable {
    static readonly FLINT_AND_STEELS: TagKey;
    canBeExtinguishedBy(item: ItemStack): boolean;
    extinguish(player: Entity, state: BlockState, pos: BlockPos, world: LevelAccessor): boolean;
    interactWithEntity(level: Level, state: BlockState, projectile: Entity, pos: BlockPos): boolean;
    interactWithPlayerItem(state: BlockState, level: Level, pos: BlockPos, player: Player, hand: InteractionHand, stack: ItemStack): ItemInteractionResult;
    isLitUp(var1: BlockState, var2: BlockGetter, var3: BlockPos): boolean;
    lightUp(player: Entity, state: BlockState, pos: BlockPos, world: LevelAccessor, fireSourceType: FireSoundType): boolean;
    lightableInteractWithEntity(level: Level, state: BlockState, projectile: Entity, pos: BlockPos): boolean;
    lightableInteractWithPlayerItem(state: BlockState, level: Level, pos: BlockPos, player: Player, hand: InteractionHand, stack: ItemStack): ItemInteractionResult;
    playExtinguishSound(world: LevelAccessor, pos: BlockPos): void;
    playLightUpSound(world: LevelAccessor, pos: BlockPos, type: FireSoundType): void;
    setLitUp(state: BlockState, world: LevelAccessor, pos: BlockPos, lit: boolean): void;
    setLitUp(var1: BlockState, var2: LevelAccessor, var3: BlockPos, var4: Entity, var5: boolean): void;
    spawnSmokeParticles(state: BlockState, pos: BlockPos, world: LevelAccessor): void;
    tryExtinguish(player: Entity, state: BlockState, pos: BlockPos, world: LevelAccessor): boolean;
    tryLightUp(player: Entity, state: BlockState, pos: BlockPos, world: LevelAccessor, fireSourceType: FireSoundType): boolean;
  }


  class IOnePlayerInteractable {
    get playerWhoMayEdit(): UUID;
    isEditingPlayer(myPos: BlockPos, player: Player): boolean;
    isOtherPlayerEditing(myPos: BlockPos, otherThan: Player): boolean;
    set playerWhoMayEdit(var1: UUID);
    tryOpeningEditGui(player: ServerPlayer, pos: BlockPos, stack: ItemStack, hitFace: Direction): boolean;
    tryOpeningEditGui(player: ServerPlayer, pos: BlockPos, stack: ItemStack, hitFace: Direction, hitPos: Vec3): boolean;
  }


  class IOneUserInteractable {
    canBeUsedBy(myPos: BlockPos, player: Entity): boolean;
    get currentUser(): UUID;
    isCloseEnoughToUse(e: Entity, myPos: BlockPos): boolean;
    set currentUser(var1: UUID);
  }


  class IOptionalEntityBlock {
    shouldHaveBlockEntity(var1: BlockStateBase): boolean;
  }


  class IOwnerProtected {
    get owner(): UUID;
    isAccessibleBy(player: Player): boolean;
    isNotOwnedBy(player: Player): boolean;
    isOwnedBy(player: Player): boolean;
    isPublic(): boolean;
    loadOwner(tag: CompoundTag): void;
    saveOwner(tag: CompoundTag): void;
    set owner(var1: UUID);
  }


  class IPistonMotionReact {
    moveTick(level: Level, pos: BlockPos, movedState: BlockState, aabb: AABB, tile: PistonMovingBlockEntity): void;
    onMagnetMoved(level: Level, blockPos: BlockPos, direction: Direction, blockState: BlockState, blockEntity: BlockEntity): void;
    onMoved(level: Level, pos: BlockPos, movedState: BlockState, direction: Direction, extending: boolean): void;
    ticksWhileMoved(): boolean;
  }


  class IRecolorable {
    isDefaultColor(var1: Level, var2: BlockPos, var3: BlockState): boolean;
    tryRecolor(var1: Level, var2: BlockPos, var3: BlockState, var4: DyeColor): boolean;
  }


  class IRotatable {
    getRotatedState(var1: BlockState, var2: LevelAccessor, var3: BlockPos, var4: Rotation, var5: Direction, var6: Vec3): Optional<BlockState>;
    onRotated(newState: BlockState, oldState: BlockState, world: LevelAccessor, pos: BlockPos, rotation: Rotation, axis: Direction, hit: Vec3): void;
    rotateOverAxis(state: BlockState, world: LevelAccessor, pos: BlockPos, rotation: Rotation, axis: Direction, hit: Vec3): Optional<Direction>;
  }


  class ISoftFluidConsumer {
    tryAcceptingFluid(var1: Level, var2: BlockState, var3: BlockPos, var4: SoftFluidStack): boolean;
  }


  class ISoftFluidProvider {
    consumeProvidedFluid(var1: Level, var2: BlockState, var3: BlockPos): void;
    getProvidedFluid(var1: Level, var2: BlockState, var3: BlockPos): SoftFluidStack;
  }


  class ISoftFluidTankProvider {
    canInteractWithSoftFluidTank(): boolean;
    get softFluidTank(): SoftFluidTank;
  }


  interface ItemDisplayTile extends WorldlyContainer, RandomizableContainerBlockEntity {}
  class ItemDisplayTile extends WorldlyContainer {
    canPlaceItem(index: number, stack: ItemStack): boolean;
    canPlaceItemThroughFace(index: number, stack: ItemStack, direction: Direction): boolean;
    canTakeItemThroughFace(index: number, stack: ItemStack, direction: Direction): boolean;
    createMenu(id: number, player: Inventory): AbstractContainerMenu;
    createMenu(i: number, inventory: Inventory, player: Player): AbstractContainerMenu;
    get addItemSound(): SoundEvent;
    get containerSize(): number;
    get displayedItem(): ItemStack;
    get maxStackSize(): number;
    get updatePacket(): ClientboundBlockEntityDataPacket;
    getSlotsForFace(side: Direction): number[];
    getUpdateTag(registries: Provider): CompoundTag;
    interactWithPlayerItem(player: Player, handIn: InteractionHand, stack: ItemStack): ItemInteractionResult;
    interactWithPlayerItem(player: Player, handIn: InteractionHand, handItem: ItemStack, slot: number): ItemInteractionResult;
    needsToUpdateClientWhenChanged(): boolean;
    onItemAdded(player: Player, stack: ItemStack, slot: number): void;
    onItemRemoved(player: Player, stack: ItemStack, slot: number): void;
    saveAdditional(compound: CompoundTag, registries: Provider): void;
    set displayedItem(stack: ItemStack);
    setChanged(): void;
    setItems(stacks: NonNullList<ItemStack>): void;
    updateClientVisualsOnLoad(): void;
    updateTileOnInventoryChanged(): void;
  }


  class IWashable {
    tryWash(var1: Level, var2: BlockPos, var3: BlockState, var4: Vec3): boolean;
  }


  class IWaxable {
    isWaxed(): boolean;
    setWaxed(var1: boolean): void;
    tryWaxingWithItem(level: Level, pos: BlockPos, player: Player, stack: ItemStack): ItemInteractionResult;
  }


  interface MimicBlock extends Block {}
  class MimicBlock extends Block {
    getCloneItemStack(level: LevelReader, pos: BlockPos, state: BlockState): ItemStack;
    getDestroyProgress(state: BlockState, player: Player, worldIn: BlockGetter, pos: BlockPos): number;
    getDrops(state: BlockState, builder: lootparams_Builder): ItemStack[];
    getExplosionResistance(state: BlockState, world: BlockGetter, pos: BlockPos, explosion: Explosion): number;
    getSoundType(state: BlockState, world: LevelReader, pos: BlockPos, entity: Entity): SoundType;
  }


  interface MimicBlockTile extends IBlockHolder, IExtraModelDataProvider, BlockEntity {}
  class MimicBlockTile extends IBlockHolder {
    static readonly MIMIC_KEY: ModelDataKey;
    addExtraModelData(builder: Builder): void;
    get heldBlock(): BlockState;
    get updatePacket(): ClientboundBlockEntityDataPacket;
    getHeldBlock(index: number): BlockState;
    getUpdateTag(registries: Provider): CompoundTag;
    saveAdditional(tag: CompoundTag, registries: Provider): void;
    set heldBlock(state: BlockState);
    setHeldBlock(state: BlockState, index: number): boolean;
  }


  interface ModLiquidBlock extends LiquidBlock {}
  class ModLiquidBlock extends LiquidBlock {
    static readonly CODEC: MapCodec;
    constructor(supplier: Supplier<FlowingFluid>, arg: Properties);
    codec(): MapCodec;
    get flowingFluid(): FlowingFluid;
  }


  interface ModStairBlock extends StairBlock {}
  class ModStairBlock extends StairBlock {
    static readonly CODEC: MapCodec;
    constructor(baseBlock: Supplier<Block>, settings: Properties);
    codec(): MapCodec<ModStairBlock>;
    get baseBlock(): Block;
  }


  interface OpenableContainerBlockTile extends WorldlyContainer, RandomizableContainerBlockEntity {}
  class OpenableContainerBlockTile extends WorldlyContainer {
    get containerSize(): number;
    get items(): NonNullList<ItemStack>;
    getSlotsForFace(side: Direction): number[];
    isUnused(): boolean;
    recheckOpen(): void;
    startOpen(player: Player): void;
    stopOpen(player: Player): void;
  }


  interface WaterBlock extends SimpleWaterloggedBlock, Block {}
  class WaterBlock extends SimpleWaterloggedBlock {
    static readonly WATERLOGGED: BooleanProperty;
    getFluidState(state: BlockState): FluidState;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.block.ILightable' {
  import { LevelAccessor } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';

  class FireSoundType {
    static readonly FLINT_AND_STEEL: FireSoundType;
    static readonly FIRE_CHANGE: FireSoundType;
    static readonly FLAMING_ARROW: FireSoundType;
    play(var1: LevelAccessor, var2: BlockPos): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.client.anim' {
  import { Supplier } from 'java.util.function';
  import { Config } from 'net.mehvahdjukaar.moonlight.api.client.anim.PendulumAnimation';
  import { Vector3f } from 'org.joml';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Entity } from 'net.minecraft.world.entity';

  interface PendulumAnimation extends SwingAnimation {}
  class PendulumAnimation extends SwingAnimation {
    constructor(config: Supplier<Config>, axisGetter: Supplier<Vector3f>);
    addImpulse(vel: number): void;
    addPositiveImpulse(vel: number): void;
    getAngle(partialTicks: number): number;
    hit(eVel: Vec3, eMass: number): boolean;
    hitByEntity(entity: Entity): boolean;
    reset(): void;
    tick(inWater: boolean): void;
  }


  interface SwayingAnimation extends SwingAnimation {}
  class SwayingAnimation extends SwingAnimation {
    constructor(getRotationAxis: Supplier<Vector3f>);
    addImpulse(vel: number): void;
    addPositiveImpulse(vel: number): void;
    getAngle(partialTicks: number): number;
    hit(mot: Vec3, eMass: number): boolean;
    hitByEntity(entity: Entity): boolean;
    reset(): void;
    tick(inWater: boolean): void;
  }


  class SwingAnimation {
    addImpulse(var1: number): void;
    addPositiveImpulse(var1: number): void;
    getAngle(var1: number): number;
    hit(var1: Vec3, var2: number): boolean;
    hitByEntity(var1: Entity): boolean;
    reset(): void;
    tick(var1: boolean): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.client.anim.PendulumAnimation' {
  import { Codec } from 'com.mojang.serialization';

  class Config {
    static readonly CODEC: Codec;
    constructor(minAngle: number, maxAngle: number, damping: number, frequency: number, collisionHitbox: boolean, collisionMass: number, collisionForce: number);

    constructor();
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.client' {
  import { Supplier, Predicate } from 'java.util.function';
  import { ShaderInstance, MultiBufferSource, ItemInHandRenderer, BlockEntityWithoutLevelRenderer } from 'net.minecraft.client.renderer';
  import { ItemLike, Level, BlockAndTintGetter } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Direction, BlockPos } from 'net.minecraft.core';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { ItemStack, ItemDisplayContext } from 'net.minecraft.world.item';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { DeltaTracker, Camera, Minecraft } from 'net.minecraft.client';
  import { InteractionHand } from 'net.minecraft.world';
  import { HumanoidArm, LivingEntity } from 'net.minecraft.world.entity';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { AbstractClientPlayer } from 'net.minecraft.client.player';
  import { HumanoidModel, EntityModel, HeadedModel } from 'net.minecraft.client.model';
  import { HandMode } from 'net.mehvahdjukaar.moonlight.api.client.ItemRenderExtension';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { FogMode } from 'FogRenderer';
  import { FogShape } from 'com.mojang.blaze3d.shaders';
  import { Vector3f } from 'org.joml';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { TriResult } from 'net.mehvahdjukaar.moonlight.api.misc';

  interface CoreShaderContainer extends Supplier<ShaderInstance> {}
  class CoreShaderContainer extends Supplier<ShaderInstance> {
    constructor(vanillaFallback: Supplier<ShaderInstance>);
    assign(instance: ShaderInstance): void;
    get (): ShaderInstance;
  }


  interface ICustomItemRendererProvider extends ItemLike {}
  class ICustomItemRendererProvider extends ItemLike {
    get rendererFactory(): Supplier<ItemStackRenderer>;
  }


  class IScreenProvider {
    openScreen(level: Level, player: Player, direction: Direction): void;
    openScreen(level: Level, player: Player, direction: Direction, hitPos: Vec3): void;
    sendOpenGuiPacket(player: ServerPlayer, hitFace: Direction): void;
    sendOpenGuiPacket(player: ServerPlayer, hitFace: Direction, hitPos: Vec3): void;
  }


  class ItemRenderExtension {
    animateItemFirstPerson(entity: Player, stack: ItemStack, hand: InteractionHand, arm: HumanoidArm, poseStack: PoseStack, partialTicks: number, pitch: number, attackAnim: number, handHeight: number): boolean;
    get handMode(): HandMode;
    get itemRenderer(): ItemStackRenderer;
    poseLeftArm<T extends LivingEntity>(stack: ItemStack, model: HumanoidModel<T>, entity: T, mainHand: HumanoidArm): boolean;
    poseRightArm<T extends LivingEntity>(stack: ItemStack, model: HumanoidModel<T>, entity: T, mainHand: HumanoidArm): boolean;
    renderFirstPersonItem(player: AbstractClientPlayer, stack: ItemStack, hand: InteractionHand, arm: HumanoidArm, poseStack: PoseStack, partialTicks: number, pitch: number, attackAnim: number, equipAnim: number, buffer: MultiBufferSource, light: number, renderer: ItemInHandRenderer): boolean;
    renderHelmetOverlay(stack: ItemStack, player: Player, guiGraphics: GuiGraphics, deltaTracker: DeltaTracker): void;
    renderThirdPersonItem<T extends Player, M extends EntityModel<T> & HeadedModel>(parentModel: M, entity: LivingEntity, stack: ItemStack, humanoidArm: HumanoidArm, poseStack: PoseStack, bufferSource: MultiBufferSource, light: number): boolean;
  }


  interface ItemStackRenderer extends BlockEntityWithoutLevelRenderer {}
  class ItemStackRenderer extends BlockEntityWithoutLevelRenderer {
    renderByItem(var1: ItemStack, var2: ItemDisplayContext, var3: PoseStack, var4: MultiBufferSource, var5: number, var6: number): void;
  }


  class ModFluidRenderProperties {
    constructor(still: ResourceLocation, flowing: ResourceLocation, tint: number);

    constructor(still: ResourceLocation, flowing: ResourceLocation);
    get flowingTexture(): ResourceLocation;
    get overlayTexture(): ResourceLocation;
    get stillTexture(): ResourceLocation;
    get tintColor(): number;
    getFlowingTexture(state: FluidState, getter: BlockAndTintGetter, pos: BlockPos): ResourceLocation;
    getOverlayTexture(state: FluidState, getter: BlockAndTintGetter, pos: BlockPos): ResourceLocation;
    getRenderOverlayTexture(mc: Minecraft): ResourceLocation;
    getStillTexture(state: FluidState, getter: BlockAndTintGetter, pos: BlockPos): ResourceLocation;
    getTintColor(state: FluidState, getter: BlockAndTintGetter, pos: BlockPos): number;
    modifyFogColor(camera: Camera, partialTick: number, level: ClientLevel, renderDistance: number, darkenWorldAmount: number, fluidFogColor: Vector3f): Vector3f;
    modifyFogRender(camera: Camera, mode: FogMode, renderDistance: number, partialTick: number, nearDistance: number, farDistance: number, shape: FogShape): void;
  }


  class TextureCache {
    static add(block: ItemLike, t: string): void;
    static clear(): void;
    static getCached(block: ItemLike, texturePredicate: Predicate<string>): string;
    static getCachedTexture(block: ItemLike, texturePredicate: Predicate<string>): TriResult<string>;
    static registerSpecialTextureForBlock(block: ItemLike, id: string, texturePath: ResourceLocation): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.client.gui' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Button } from 'net.minecraft.client.gui.components';
  import { Screen } from 'net.minecraft.client.gui.screens';

  class MediaButton {
    static readonly YOUTUBE: ResourceLocation;
    static readonly TWITTER: ResourceLocation;
    static readonly DISCORD: ResourceLocation;
    static readonly PATREON: ResourceLocation;
    static readonly KO_FI: ResourceLocation;
    static readonly CURSEFORGE: ResourceLocation;
    static readonly GITHUB: ResourceLocation;
    static readonly AKLIZ: ResourceLocation;
    static readonly YES: ResourceLocation;
    static readonly NO: ResourceLocation;
    static akliz(parent: Screen, x: number, y: number, url: string, tooltip: string): Button;
    static akliz(parent: Screen, x: number, y: number, url: string): Button;
    static create(parent: Screen, x: number, y: number, texture: ResourceLocation, url: string, tooltip: string): Button;
    static create(iconW: number, iconH: number, texture: ResourceLocation, parent: Screen, x: number, y: number, url: string, tooltip: string): Button;
    static curseForge(parent: Screen, x: number, y: number, url: string): Button;
    static discord(parent: Screen, x: number, y: number, url: string): Button;
    static github(parent: Screen, x: number, y: number, url: string): Button;
    static koFi(parent: Screen, x: number, y: number, url: string): Button;
    static patreon(parent: Screen, x: number, y: number, url: string): Button;
    static twitter(parent: Screen, x: number, y: number, url: string): Button;
    static youtube(parent: Screen, x: number, y: number, url: string): Button;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.client.ItemRenderExtension' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface HandMode extends Enum<HandMode> {}
  class HandMode extends Enum<HandMode> {
    static readonly DEFAULT: HandMode;
    static readonly TWO_HANDED: HandMode;
    static readonly SINGLE_HANDED: HandMode;
    static valueOf(name: string): HandMode;
    static values(): HandMode[];
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.client.model' {
  import { List, Map } from 'java.util';
  import { BakedQuad } from 'net.minecraft.client.renderer.block.model';
  import { Matrix4f } from 'org.joml';
  import { IntUnaryOperator, Function, BiFunction } from 'java.util.function';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { BakedModel, ModelBaker, Material, ModelState } from 'net.minecraft.client.resources.model';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Direction, BlockPos } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { BlockAndTintGetter } from 'net.minecraft.world.level';
  import { ItemStack } from 'net.minecraft.world.item';
  import { JsonObject, JsonDeserializationContext, JsonElement } from 'com.google.gson';
  import { Builder } from 'net.mehvahdjukaar.moonlight.api.client.model.ExtraModelData';
  import { Class } from 'java.lang';

  class BakedQuadsTransformer {
    applyingAmbientOcclusion(var1: boolean): BakedQuadsTransformer;
    applyingColor(ABGRcolor: number): BakedQuadsTransformer;
    applyingColor(var1: IntUnaryOperator): BakedQuadsTransformer;
    applyingEmissivity(var1: number): BakedQuadsTransformer;
    applyingLightMap(var1: number): BakedQuadsTransformer;
    applyingShade(var1: boolean): BakedQuadsTransformer;
    applyingSprite(var1: TextureAtlasSprite): BakedQuadsTransformer;
    applyingTintIndex(var1: number): BakedQuadsTransformer;
    applyingTransform(var1: Matrix4f): BakedQuadsTransformer;
    static create(): BakedQuadsTransformer;
    transform(var1: BakedQuad): BakedQuad;
    transformAll(quads: BakedQuad[]): BakedQuad[];
  }


  interface CustomBakedModel extends BakedModel {}
  class CustomBakedModel extends BakedModel {
    get particleIcon(): TextureAtlasSprite;
    getBlockParticle(var1: ExtraModelData): TextureAtlasSprite;
    getBlockQuads(var1: BlockState, var2: Direction, var3: RandomSource, var4: RenderType, var5: ExtraModelData): BakedQuad[];
    getModelData(tileData: ExtraModelData, pos: BlockPos, state: BlockState, level: BlockAndTintGetter): ExtraModelData;
    getModelData(originalData: ExtraModelData, stack: ItemStack): ExtraModelData;
    getQuads(blockState: BlockState, direction: Direction, randomSource: RandomSource): BakedQuad[];
  }


  class CustomGeometry {
    bake(var1: ModelBaker, var2: Function<Material, TextureAtlasSprite>, var3: ModelState): BakedModel;
  }


  class CustomModelLoader {
    deserialize(var1: JsonObject, var2: JsonDeserializationContext): CustomGeometry;
    static parseModel(j: JsonElement, modelBaker: ModelBaker, spriteGetter: Function<Material, TextureAtlasSprite>, transform: ModelState): BakedModel;
  }


  class ExtraModelData {
    static readonly EMPTY: ExtraModelData;
    static builder(): Builder;
    get<T>(var1: ModelDataKey<T>): T;
    isEmpty(): boolean;
    values(): Map<ModelDataKey<any>, any>;
  }


  class IExtraModelDataProvider {
    addExtraModelData(builder: Builder): void;
    afterDataPacket(oldData: ExtraModelData): void;
    get extraModelData(): ExtraModelData;
    requestModelReload(): void;
  }


  class ModelDataKey<T = any> {
    constructor(type: Class<T>);
    equals(obj: any): boolean;
    hashCode(): number;
  }


  interface NestedModelLoader extends CustomModelLoader {}
  class NestedModelLoader extends CustomModelLoader {
    constructor(modelPath: string, bakedModelFactory: BiFunction<BakedModel, ModelState, CustomBakedModel>);
    deserialize(json: JsonObject, context: JsonDeserializationContext): CustomGeometry;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.client.model.ExtraModelData' {
  import { ModelDataKey, ExtraModelData } from 'net.mehvahdjukaar.moonlight.api.client.model';

  class ClassLoadingBs {
  }


  class Builder {
    build(): ExtraModelData;
    with<A>(var1: ModelDataKey<A>, var2: A): Builder;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.client.model.neoforge' {
  import { IUnbakedGeometry, IGeometryBakingContext } from 'net.neoforged.neoforge.client.model.geometry';
  import { CustomGeometry } from 'net.mehvahdjukaar.moonlight.api.client.model';
  import { BakedModel, ModelBaker, Material, ModelState } from 'net.minecraft.client.resources.model';
  import { Function } from 'java.util.function';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { ItemOverrides } from 'net.minecraft.client.renderer.block.model';

  interface GeometryWrapper extends IUnbakedGeometry<GeometryWrapper> {}
  class GeometryWrapper extends IUnbakedGeometry<GeometryWrapper> {
    constructor(owner: CustomGeometry);
    bake(iGeometryBakingContext: IGeometryBakingContext, bakery: ModelBaker, spriteGetter: Function<Material, TextureAtlasSprite>, modelState: ModelState, itemOverrides: ItemOverrides): BakedModel;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.client.neoforge' {
  import { FluidType } from 'net.neoforged.neoforge.fluids';
  import { Properties } from 'net.mehvahdjukaar.moonlight.api.fluids.ModFlowingFluid';
  import { ModFlowingFluid } from 'net.mehvahdjukaar.moonlight.api.fluids';
  import { RegisterClientExtensionsEvent } from 'net.neoforged.neoforge.client.extensions.common';

  class ForgeFluidTypeHelper {
    static create(properties: Properties, fluid: ModFlowingFluid): FluidType;
    static registerFluidExtensions(event: RegisterClientExtensionsEvent): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.client.renderer' {
  import { EntityRenderer } from 'net.minecraft.client.renderer.entity';
  import { Context } from 'EntityRendererProvider';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';

  interface FallingBlockRendererGeneric<T extends FallingBlockEntity = any> extends EntityRenderer<T> {}
  class FallingBlockRendererGeneric<T extends FallingBlockEntity = any> extends EntityRenderer<T> {
    constructor(context: Context);
    getTextureLocation(pEntity: T): ResourceLocation;
    render(entity: T, pEntityYaw: number, pPartialTicks: number, poseStack: PoseStack, buffer: MultiBufferSource, pPackedLight: number): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.client.texture_renderer' {
  import { AbstractTexture, Dumpable, Tickable } from 'net.minecraft.client.renderer.texture';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Consumer, Supplier } from 'java.util.function';
  import { ResourceManager } from 'net.minecraft.server.packs.resources';
  import { RenderTarget } from 'com.mojang.blaze3d.pipeline';
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { List } from 'java.util';
  import { Path } from 'java.nio.file';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface FrameBufferBackedDynamicTexture extends Dumpable, AbstractTexture {}
  class FrameBufferBackedDynamicTexture extends Dumpable {
    constructor(resourceLocation: ResourceLocation, width: number, height: number, textureDrawingFunction: Consumer<FrameBufferBackedDynamicTexture>);

    constructor(resourceLocation: ResourceLocation, size: number, textureDrawingFunction: Consumer<FrameBufferBackedDynamicTexture>);
    bindWrite(): void;
    close(): void;
    download(): void;
    dumpContents(resourceLocation: ResourceLocation, path: Path): void;
    get frameBuffer(): RenderTarget;
    get height(): number;
    get id(): number;
    get pixels(): NativeImage;
    get textureLocation(): ResourceLocation;
    get width(): number;
    initialize(): void;
    isInitialized(): boolean;
    load(manager: ResourceManager): void;
    markForUpdate(): void;
    redraw(): void;
    releaseId(): void;
    saveTextureToFile(texturesDir: Path): Path[];
    saveTextureToFile(texturesDir: Path, name: string): Path[];
    unMarkForUpdate(): void;
    upload(): void;
  }


  class RenderedTexturesManager {
    static clearCache(): void;
    static drawAsInGUI(tex: FrameBufferBackedDynamicTexture, drawFunction: Consumer<GuiGraphics>): void;
    static drawItem(tex: FrameBufferBackedDynamicTexture, stack: ItemStack): void;
    static drawNormalized(tex: FrameBufferBackedDynamicTexture, drawFunction: Consumer<PoseStack>): void;
    static drawTexture(tex: FrameBufferBackedDynamicTexture, texture: ResourceLocation): void;
    static requestFlatItemStackTexture(res: ResourceLocation, stack: ItemStack, size: number): FrameBufferBackedDynamicTexture;
    static requestFlatItemTexture(item: Item, size: number): FrameBufferBackedDynamicTexture;
    static requestFlatItemTexture(item: Item, size: number, postProcessing: Consumer<NativeImage>): FrameBufferBackedDynamicTexture;
    static requestFlatItemTexture(id: ResourceLocation, item: Item, size: number, postProcessing: Consumer<NativeImage>): FrameBufferBackedDynamicTexture;
    static requestFlatItemTexture(id: ResourceLocation, item: Item, size: number, postProcessing: Consumer<NativeImage>, updateEachFrame: boolean): FrameBufferBackedDynamicTexture;
    static requestTexture<T extends FrameBufferBackedDynamicTexture>(id: ResourceLocation, textureSupplier: Supplier<T>): T;
    static requestTexture(id: ResourceLocation, textureSize: number, textureDrawingFunction: Consumer<FrameBufferBackedDynamicTexture>, updateEachFrame: boolean): FrameBufferBackedDynamicTexture;
  }


  interface TickableFrameBufferBackedDynamicTexture extends Tickable, FrameBufferBackedDynamicTexture {}
  class TickableFrameBufferBackedDynamicTexture extends Tickable {
    constructor(resourceLocation: ResourceLocation, width: number, height: number, textureDrawingFunction: Consumer<FrameBufferBackedDynamicTexture>);

    constructor(resourceLocation: ResourceLocation, size: number, textureDrawingFunction: Consumer<FrameBufferBackedDynamicTexture>);
    markForUpdate(): void;
    tick(): void;
    unMarkForUpdate(): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.client.util' {
  import { Camera } from 'net.minecraft.client';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { Vec3, AABB } from 'net.minecraft.world.phys';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { Level } from 'net.minecraft.world.level';
  import { Supplier, BooleanSupplier } from 'java.util.function';
  import { ParticleOptions } from 'net.minecraft.core.particles';
  import { UniformInt } from 'net.minecraft.util.valueproviders';
  import { VoxelShape } from 'net.minecraft.world.phys.shapes';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Quaternionf, Vector3f } from 'org.joml';
  import { Pair } from 'com.mojang.datafixers.util';
  import { List } from 'java.util';
  import { FormattedCharSequence, RandomSource } from 'net.minecraft.util';
  import { Float } from 'java.lang';
  import { Font, GuiGraphics } from 'net.minecraft.client.gui';
  import { FormattedText, Style } from 'net.minecraft.network.chat';
  import { Provider } from 'HolderLookup';
  import { RenderProperties } from 'net.mehvahdjukaar.moonlight.api.client.util.TextUtil';
  import { BufferSource } from 'MultiBufferSource';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { DyeColor } from 'net.minecraft.world.item';
  import { BakedQuad } from 'net.minecraft.client.renderer.block.model';
  import { BakedModel } from 'net.minecraft.client.resources.model';

  class LOD {
    static readonly BUFFER: number;
    static readonly VERY_NEAR_DIST: number;
    static readonly NEAR_DIST: number;
    static readonly NEAR_MED_DIST: number;
    static readonly MEDIUM_DIST: number;
    static readonly FAR_DIST: number;
    static readonly MAX: LOD;
    constructor(camera: Camera, pos: BlockPos);

    constructor(cameraPos: Vec3, pos: BlockPos);
    static at(be: BlockEntity): LOD;
    static at(objPos: BlockPos): LOD;
    static at(camera: Camera, objPos: BlockPos): LOD;
    static at(camera: Camera, objCenter: Vec3): LOD;
    static getRelativeAngle(cameraPos: Vec3, pos: BlockPos): number;
    static getRelativeAngle(cameraPos: Vec3, pos: BlockPos, dir: Direction, offset: number): number;
    isFar(): boolean;
    isMedium(): boolean;
    isNear(): boolean;
    isNearMed(): boolean;
    static isOutOfFocus(cameraPos: Vec3, pos: BlockPos, blockYaw: number): boolean;
    static isOutOfFocus(cameraPos: Vec3, pos: BlockPos, blockYaw: number, degMargin: number, dir: Direction, offset: number): boolean;
    static isOutOfFocus(relativeAngle: number, blockYaw: number, degMargin: number): boolean;
    isPlaneCulled(normalVec: Vec3): boolean;
    isPlaneCulled(normalVec: Vec3, offset: Vec3): boolean;
    isPlaneCulled(facing: Direction, offset: number, radius: number, cosTolerance: number): boolean;
    isPlaneCulled(facing: Direction, offset: number, cosTolerance: number): boolean;
    isPlaneCulled(planeNormal: Vec3, offset: number, cosTolerance: number): boolean;
    isPlaneCulled(planeNormal: Vec3, offset: number, radius: number, cosTolerance: number): boolean;
    isPlaneCulled(facing: Direction, offset: number): boolean;
    isPlaneCulled(planeNormal: Vec3, offset: Vec3, cosTolerance: number): boolean;
    isPlaneCulled(planeNormal: Vec3, offset: Vec3, discRadius: number, cosTolerance: number): boolean;
    static isScoping(): boolean;
    isVeryNear(): boolean;
    static sq(v: number): number;
    within(maxDist: number): boolean;
  }


  class ParticleUtil {
    static spawnBreakParticles(shape: VoxelShape, pPos: BlockPos, pState: BlockState, level: Level): void;
    static spawnParticleInASphere(level: Level, x: number, y: number, z: number, type: Supplier<ParticleOptions>, amount: number, speed: number, angleVariation: number, speedVariation: number): void;
    static spawnParticleOnBlockShape(level: Level, pos: BlockPos, particleOptions: ParticleOptions, uniformInt: UniformInt, maxSpeed: number): void;
    static spawnParticleOnBoundingBox(bb: AABB, level: Level, particleOptions: ParticleOptions, uniformInt: UniformInt, maxSpeed: number): void;
    static spawnParticleOnFace(level: Level, pos: BlockPos, direction: Direction, particleOptions: ParticleOptions, minSpeed: number, maxSpeed: number, perpendicular: boolean): void;
    static spawnParticlesOnBlockFaces(level: Level, pos: BlockPos, particleOptions: ParticleOptions, uniformInt: UniformInt, minSpeed: number, maxSpeed: number, perpendicular: boolean): void;
  }


  class RotHlpr {
    static readonly Y180: Quaternionf;
    static readonly Y90: Quaternionf;
    static readonly Y45: Quaternionf;
    static readonly YN45: Quaternionf;
    static readonly YN90: Quaternionf;
    static readonly YN180: Quaternionf;
    static readonly X180: Quaternionf;
    static readonly X90: Quaternionf;
    static readonly X22: Quaternionf;
    static readonly XN22: Quaternionf;
    static readonly XN90: Quaternionf;
    static readonly XN180: Quaternionf;
    static readonly Z180: Quaternionf;
    static readonly Z135: Quaternionf;
    static readonly Z90: Quaternionf;
    static readonly ZN45: Quaternionf;
    static readonly ZN90: Quaternionf;
    static readonly ZN180: Quaternionf;
    static rot(dir: Direction): Quaternionf;
    static rot(rot: number): Quaternionf;
  }


  class TextUtil {
    static fitLinesToBox(font: Font, text: FormattedText, width: number, height: number): Pair<FormattedCharSequence[], number>;
    static parseText(s: string, provider: Provider): FormattedText;
    static parseText(s: string): FormattedText;
    static renderAllLines(charSequences: FormattedCharSequence[], ySeparation: number, font: Font, poseStack: PoseStack, buffer: MultiBufferSource, properties: RenderProperties): void;
    static renderGuiLine(properties: RenderProperties, string: string, font: Font, graphics: GuiGraphics, buffer: BufferSource, cursorPos: number, selectionPos: number, isSelected: boolean, blink: boolean, yOffset: number): void;
    static renderGuiLine(properties: RenderProperties, string: string, font: Font, graphics: GuiGraphics, cursorPos: number, selectionPos: number, isSelected: boolean, blink: boolean, yOffset: number, textLineHeight: number): void;
    static renderGuiText(properties: RenderProperties, guiLines: string[], font: Font, graphics: GuiGraphics, buffer: BufferSource, cursorPos: number, selectionPos: number, currentLine: number, blink: boolean, lineSpacing: number): void;
    static renderGuiText(properties: RenderProperties, guiLines: string[], font: Font, graphics: GuiGraphics, cursorPos: number, selectionPos: number, currentLine: number, blink: boolean, lineSpacing: number): void;
    static renderLine(formattedCharSequences: FormattedCharSequence, font: Font, yOffset: number, poseStack: PoseStack, buffer: MultiBufferSource, properties: RenderProperties): void;
    static renderProperties(dyeColor: DyeColor, glowing: boolean, combinedLight: number, style: Style, normal: Vector3f, isVeryNear: BooleanSupplier): RenderProperties;
    static renderProperties(dyeColor: DyeColor, glowing: boolean, darkColorMult: number, combinedLight: number, style: Style, normal: Vector3f, isVeryNear: BooleanSupplier): RenderProperties;
  }


  class VertexUtil {
    static addCube(builder: VertexConsumer, poseStack: PoseStack, width: number, height: number, light: number, color: number): void;
    static addCube(builder: VertexConsumer, poseStack: PoseStack, uOff: number, vOff: number, width: number, height: number, light: number, color: number): void;
    static addCube(builder: VertexConsumer, poseStack: PoseStack, uOff: number, vOff: number, w: number, h: number, combinedLightIn: number, color: number, alpha: number, up: boolean, down: boolean, wrap: boolean): void;
    static addCube(builder: VertexConsumer, poseStack: PoseStack, minU: number, minV: number, maxU: number, maxV: number, w: number, h: number, combinedLightIn: number, color: number, alpha: number, up: boolean, down: boolean, wrap: boolean): void;
    static addQuad(builder: VertexConsumer, poseStack: PoseStack, x0: number, y0: number, x1: number, y1: number, lu: number, lv: number): void;
    static addQuad(builder: VertexConsumer, poseStack: PoseStack, x0: number, y0: number, x1: number, y1: number, r: number, g: number, b: number, a: number, lu: number, lv: number): void;
    static addQuad(builder: VertexConsumer, poseStack: PoseStack, x0: number, y0: number, x1: number, y1: number, u0: number, v0: number, u1: number, v1: number, r: number, g: number, b: number, a: number, lu: number, lv: number): void;
    static getAllModelQuads(model: BakedModel, state: BlockState, rand: RandomSource): BakedQuad[];
    static lightU(light: number): number;
    static lightV(light: number): number;
    static vert(builder: VertexConsumer, poseStack: PoseStack, x: number, y: number, z: number, u: number, v: number, r: number, g: number, b: number, a: number, lu: number, lv: number, nx: number, ny: number, nz: number): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.entity' {
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { FallingBlockEntity, ItemEntity } from 'net.minecraft.world.entity.item';
  import { EntityType, MoverType, Entity } from 'net.minecraft.world.entity';
  import { Level, ItemLike } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { ThrowableItemProjectile } from 'net.minecraft.world.entity.projectile';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ParticleOptions } from 'net.minecraft.core.particles';
  import { Emitter, Builder } from 'net.mehvahdjukaar.moonlight.api.entity.ParticleTrailEmitter';
  import { Consumer } from 'java.util.function';
  import { IVillagerBrainEvent } from 'net.mehvahdjukaar.moonlight.api.events';
  import { MemoryModuleType } from 'net.minecraft.world.entity.ai.memory';

  class IControllableVehicle {
    onInputUpdate(var1: boolean, var2: boolean, var3: boolean, var4: boolean, var5: boolean, var6: boolean): void;
  }


  class IExtraClientSpawnData {
    readSpawnData(var1: RegistryFriendlyByteBuf): void;
    writeSpawnData(var1: RegistryFriendlyByteBuf): void;
  }


  interface ImprovedFallingBlockEntity extends FallingBlockEntity {}
  class ImprovedFallingBlockEntity extends FallingBlockEntity {
    constructor(type: EntityType<FallingBlockEntity>, level: Level);

    constructor(type: EntityType<FallingBlockEntity>, level: Level, pos: BlockPos, blockState: BlockState, saveDataToItem: boolean);
    addAdditionalSaveData(tag: CompoundTag): void;
    causeFallDamage(pFallDistance: number, pMultiplier: number, pSource: DamageSource): boolean;
    static fall(type: EntityType<FallingBlockEntity>, level: Level, pos: BlockPos, state: BlockState, saveDataToItem: boolean): ImprovedFallingBlockEntity;
    readAdditionalSaveData(tag: CompoundTag): void;
    setBlockState(state: BlockState): void;
    setCancelDrop(cancelDrop: boolean): void;
    setSaveTileDataToItem(b: boolean): void;
    spawnAtLocation(itemIn: ItemLike, offset: number): ItemEntity;
  }


  interface ImprovedProjectileEntity extends ThrowableItemProjectile {}
  class ImprovedProjectileEntity extends ThrowableItemProjectile {
    addAdditionalSaveData(tag: CompoundTag): void;
    canHarmOwner(): boolean;
    get defaultShootVelocity(): number;
    hasLeftOwner(): boolean;
    hasReachedEndOfLife(): boolean;
    isNoPhysics(): boolean;
    move(moverType: MoverType, movement: Vec3): void;
    reachedEndOfLife(): void;
    readAdditionalSaveData(tag: CompoundTag): void;
    setNoPhysics(noPhysics: boolean): void;
    shoot(x: number, y: number, z: number, velocity: number, inaccuracy: number): void;
    shootFromRotation(shooter: Entity, x: number, y: number, z: number, velocity: number, inaccuracy: number): void;
    spawnTrailParticles(): void;
    tick(): void;
  }


  class ParticleTrailEmitter {
    static builder(): Builder;
    tick(obj: Entity, particleOptions: ParticleOptions): void;
    tick(obj: Entity, particleOptions: ParticleOptions, followSpeed: boolean, position: Vec3, velocity: Vec3): void;
    tick(obj: Entity, emitter: Emitter): void;
  }


  class VillagerAIHooks {
    static addBrainModification(eventConsumer: Consumer<IVillagerBrainEvent>): void;
    static registerMemory(memoryModuleType: MemoryModuleType<any>): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.entity.ParticleTrailEmitter' {
  import { ParticleTrailEmitter } from 'net.mehvahdjukaar.moonlight.api.entity';
  import { Vec3 } from 'net.minecraft.world.phys';

  class Builder {
    build(): ParticleTrailEmitter;
    maxParticlesPerTick(max: number): Builder;
    minParticlesPerTick(min: number): Builder;
    minSpeed(speed: number): Builder;
    spacing(spacing: number): Builder;
  }


  class Emitter {
    emitParticle(var1: Vec3, var2: Vec3): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.events' {
  import { Map, List, Collection, Optional } from 'java.util';
  import { LangBuilder } from 'net.mehvahdjukaar.moonlight.api.resources.assets';
  import { Villager } from 'net.minecraft.world.entity.npc';
  import { MemoryModuleType, ExpirableValue } from 'net.minecraft.world.entity.ai.memory';
  import { Activity } from 'net.minecraft.world.entity.schedule';
  import { ImmutableList } from 'com.google.common.collect';
  import { Pair } from 'com.mojang.datafixers.util';
  import { Integer } from 'java.lang';
  import { BehaviorControl, Behavior } from 'net.minecraft.world.entity.ai.behavior';
  import { SensorType, Sensor } from 'net.minecraft.world.entity.ai.sensing';
  import { VillagerBrainEventInternal } from 'net.mehvahdjukaar.moonlight.core.misc';

  interface AfterLanguageLoadEvent extends SimpleEvent {}
  class AfterLanguageLoadEvent extends SimpleEvent {
    constructor(lines: Map<string, string>, info: string[]);
    addEntries(builder: LangBuilder): void;
    addEntry(key: string, translation: string): void;
    get allEntries(): Collection<string>;
    get extraLanguageLines(): Map<string, string>;
    get languageInfo(): Collection<string>;
    getEntry(key: string): string;
    isDefault(): boolean;
  }


  interface IVillagerBrainEvent extends SimpleEvent {}
  class IVillagerBrainEvent extends SimpleEvent {
    addOrReplaceActivity(var1: Activity, var2: ImmutableList<Pair<number, BehaviorControl<Villager>>>): void;
    addSensor(var1: SensorType<Sensor<Villager>>): void;
    addTaskToActivity<P extends Pair<number, Behavior<Villager>>>(var1: Activity, var2: P): boolean;
    get internal(): VillagerBrainEventInternal;
    get memories(): Map<MemoryModuleType<any>, Optional<ExpirableValue<any>>>;
    get villager(): Villager;
    scheduleActivity(var1: Activity, var2: number, var3: number): void;
  }


  class SimpleEvent {
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.events.neoforge' {
  import { Event, ICancellableEvent } from 'net.neoforged.bus.api';
  import { IDropItemOnDeathEvent, IFireConsumeBlockEvent, ILightningStruckBlockEvent, IVillagerBrainEvent } from 'net.mehvahdjukaar.moonlight.api.events';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BlockEvent } from 'net.neoforged.neoforge.event.level';
  import { Level, LevelAccessor } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { LightningBolt } from 'net.minecraft.world.entity';
  import { Brain } from 'net.minecraft.world.entity.ai';
  import { Villager } from 'net.minecraft.world.entity.npc';
  import { Map, Optional } from 'java.util';
  import { MemoryModuleType, ExpirableValue } from 'net.minecraft.world.entity.ai.memory';
  import { Activity } from 'net.minecraft.world.entity.schedule';
  import { ImmutableList } from 'com.google.common.collect';
  import { Pair } from 'com.mojang.datafixers.util';
  import { Integer } from 'java.lang';
  import { BehaviorControl, Behavior } from 'net.minecraft.world.entity.ai.behavior';
  import { SensorType, Sensor } from 'net.minecraft.world.entity.ai.sensing';
  import { VillagerBrainEventInternal } from 'net.mehvahdjukaar.moonlight.core.misc';

  interface DropItemOnDeathEvent extends IDropItemOnDeathEvent, ICancellableEvent, Event {}
  class DropItemOnDeathEvent extends IDropItemOnDeathEvent {
    constructor(itemStack: ItemStack, player: Player, beforeDrop: boolean);
    static create(itemStack: ItemStack, player: Player, beforeDrop: boolean): IDropItemOnDeathEvent;
    get itemStack(): ItemStack;
    get player(): Player;
    get returnItemStack(): ItemStack;
    isBeforeDrop(): boolean;
    isCanceled(): boolean;
    set returnItemStack(stack: ItemStack);
    setCanceled(cancelled: boolean): void;
  }


  interface FireConsumeBlockEvent extends IFireConsumeBlockEvent, BlockEvent {}
  class FireConsumeBlockEvent extends IFireConsumeBlockEvent {
    constructor(world: Level, pos: BlockPos, state: BlockState, chance: number, age: number, face: Direction, wasTurnedToFire: boolean);
    get age(): number;
    get chance(): number;
    get face(): Direction;
    get finalState(): BlockState;
    set finalState(state: BlockState);
    wasReplacedByFire(): boolean;
  }


  interface LightningStruckBlockEvent extends ILightningStruckBlockEvent, BlockEvent {}
  class LightningStruckBlockEvent extends ILightningStruckBlockEvent {
    constructor(state: BlockState, level: LevelAccessor, pos: BlockPos, entity: LightningBolt);
    get entity(): LightningBolt;
  }


  interface VillagerBrainEvent extends IVillagerBrainEvent, Event {}
  class VillagerBrainEvent extends IVillagerBrainEvent {
    constructor(brain: Brain<Villager>, villager: Villager);
    addOrReplaceActivity(activity: Activity, activityPackage: ImmutableList<Pair<number, BehaviorControl<Villager>>>): void;
    addSensor(newSensor: SensorType<Sensor<Villager>>): void;
    addTaskToActivity<P extends Pair<number, Behavior<Villager>>>(activity: Activity, task: P): boolean;
    get internal(): VillagerBrainEventInternal;
    get memories(): Map<MemoryModuleType<any>, Optional<ExpirableValue<any>>>;
    get villager(): Villager;
    scheduleActivity(activity: Activity, startTime: number, endTime: number): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.fluids' {
  import { DynamicHolder, HolderReference, Triplet } from 'net.mehvahdjukaar.moonlight.api.misc';
  import { Iterable, Integer } from 'java.lang';
  import { Category } from 'net.mehvahdjukaar.moonlight.api.fluids.FluidContainerList';
  import { Codec } from 'com.mojang.serialization';
  import { List, Optional, Collection, Iterator, Map, Set } from 'java.util';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Level } from 'net.minecraft.world.level';
  import { Consumer } from 'java.util.function';
  import { FlowingFluid, Fluid } from 'net.minecraft.world.level.material';
  import { Properties } from 'net.mehvahdjukaar.moonlight.api.fluids.ModFlowingFluid';
  import { ModFluidRenderProperties } from 'net.mehvahdjukaar.moonlight.api.client';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Holder, HolderSet, HolderGetter, Registry, RegistryAccess } from 'net.minecraft.core';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Component } from 'net.minecraft.network.chat';
  import { DataComponentType } from 'net.minecraft.core.component';
  import { TintMethod } from 'net.mehvahdjukaar.moonlight.api.fluids.SoftFluid';
  import { Pair } from 'com.mojang.datafixers.util';
  import { Provider, RegistryLookup } from 'HolderLookup';
  import { Reference } from 'Holder';
  import { Entry } from 'Map';

  class BuiltInSoftFluids {
    static readonly EMPTY: DynamicHolder;
    static readonly WATER: DynamicHolder;
    static readonly LAVA: DynamicHolder;
    static readonly HONEY: DynamicHolder;
    static readonly MILK: DynamicHolder;
    static readonly MUSHROOM_STEW: DynamicHolder;
    static readonly BEETROOT_SOUP: DynamicHolder;
    static readonly RABBIT_STEW: DynamicHolder;
    static readonly SUS_STEW: DynamicHolder;
    static readonly POTION: DynamicHolder;
    static readonly DRAGON_BREATH: DynamicHolder;
    static readonly XP: DynamicHolder;
    static readonly SLIME: DynamicHolder;
    static readonly GHAST_TEAR: DynamicHolder;
    static readonly MAGMA_CREAM: DynamicHolder;
    static readonly POWDERED_SNOW: DynamicHolder;
  }


  interface FluidContainerList extends Iterable<Category> {}
  class FluidContainerList extends Iterable<Category> {
    static readonly CODEC: Codec;
    constructor(categoryList: Category[]);

    constructor();
    get categories(): Category[];
    get possibleEmpty(): Collection<Item>;
    get possibleFilled(): Collection<Item>;
    getCategoryFromEmpty(emptyContainer: Item): Optional<Category>;
    getCategoryFromFilled(filledContainer: Item): Optional<Category>;
    getEmpty(filledContainer: Item): Optional<Item>;
    getFilled(emptyContainer: Item): Optional<Item>;
    iterator(): Iterator<Category>;
  }


  class FoodProvider {
    static readonly CODEC: Codec;
    static readonly EMPTY: FoodProvider;
    static readonly CUSTOM_PROVIDERS: Map;
    consume(player: Player, world: Level, nbtApplier: Consumer<ItemStack>): boolean;
    static create(item: Item, divider: number): FoodProvider;
    get divider(): number;
    get foodItem(): Item;
    isEmpty(): boolean;
  }


  class MLBuiltinSoftFluids {
    static readonly EMPTY: HolderReference;
    static readonly WATER: HolderReference;
    static readonly LAVA: HolderReference;
    static readonly HONEY: HolderReference;
    static readonly MILK: HolderReference;
    static readonly MUSHROOM_STEW: HolderReference;
    static readonly BEETROOT_SOUP: HolderReference;
    static readonly RABBIT_STEW: HolderReference;
    static readonly SUS_STEW: HolderReference;
    static readonly POTION: HolderReference;
    static readonly DRAGON_BREATH: HolderReference;
    static readonly XP: HolderReference;
    static readonly SLIME: HolderReference;
    static readonly GHAST_TEAR: HolderReference;
    static readonly MAGMA_CREAM: HolderReference;
    static readonly POWDERED_SNOW: HolderReference;
  }


  interface ModFlowingFluid extends FlowingFluid {}
  class ModFlowingFluid extends FlowingFluid {
    createRenderProperties(): ModFluidRenderProperties;
    get flowing(): Fluid;
    get source(): Fluid;
    isSame(fluidIn: Fluid): boolean;
    static properties(): Properties;
  }


  class SoftFluid {
    readonly isGenerated: boolean;
    static readonly BOTTLE_COUNT: number;
    static readonly BOWL_COUNT: number;
    static readonly BUCKET_COUNT: number;
    static readonly WATER_BUCKET_COUNT: number;
    static readonly HOLDER_CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    static readonly TRANSLATABLE_COMPONENT: Codec;
    static readonly CODEC: Codec;
    constructor(fluid: Holder<Fluid>);
    afterInit(): void;
    get averageTextureTintColor(): number;
    get containerList(): FluidContainerList;
    get emissivity(): number;
    get equivalentFluids(): HolderSet<Fluid>;
    get flowingTexture(): ResourceLocation;
    get foodProvider(): FoodProvider;
    get luminosity(): number;
    get preservedComponents(): HolderSet<DataComponentType<any>>;
    get stillTexture(): ResourceLocation;
    get textureOverride(): ResourceLocation;
    get tintColor(): number;
    get tintMethod(): TintMethod;
    get translatedName(): Component;
    get vanillaFluid(): Holder<Fluid>;
    getEmptyContainer(filledContainer: Item): Optional<Item>;
    getFilledContainer(emptyContainer: Item): Optional<Item>;
    static getFluidSpecificAttributes(fluid: Fluid): Pair<number, Component>;
    static getRenderingData(useTexturesFrom: ResourceLocation): Triplet<ResourceLocation, ResourceLocation, number>;
    isColored(): boolean;
    isEmptyFluid(): boolean;
    isEnabled(): boolean;
    isEquivalent(fluid: Holder<Fluid>): boolean;
    isFood(): boolean;
  }


  class SoftFluidRegistry {
    static readonly KEY: ResourceKey;
    static empty(): SoftFluid;
    static get(registryAccess: RegistryAccess): Registry<SoftFluid>;
    static get(provider: Provider): RegistryLookup<SoftFluid>;
    static get(level: Level): Registry<SoftFluid>;
    static get empty(): Holder<SoftFluid>;
    static get entries(): Set<Entry<ResourceKey<SoftFluid>, SoftFluid>>;
    static get holders(): Collection<Reference<SoftFluid>>;
    static get values(): Collection<SoftFluid>;
    static getEmpty(pr: Provider): Holder<SoftFluid>;
    static getEmpty(reg: HolderGetter<SoftFluid>): Holder<SoftFluid>;
    static getHolder(id: ResourceLocation): Holder<SoftFluid>;
    static getOptionalHolder(id: ResourceLocation): Optional<Reference<SoftFluid>>;
    static getRegistry(registryAccess: RegistryAccess): Registry<SoftFluid>;
    static hackyGetEmpty(): Holder<SoftFluid>;
    static hackyGetRegistry(): Registry<SoftFluid>;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.fluids.FluidContainerList' {
  import { Codec } from 'com.mojang.serialization';
  import { Item } from 'net.minecraft.world.item';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { List, Optional } from 'java.util';

  class Category {
    static readonly CODEC: Codec;
    get amount(): number;
    get capacity(): number;
    get emptyContainer(): Item;
    get emptySound(): SoundEvent;
    get fillSound(): SoundEvent;
    get filledItems(): Item[];
    get firstFilled(): Optional<Item>;
    isEmpty(): boolean;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.fluids.ModFlowingFluid' {
  import { PathType } from 'net.minecraft.world.level.pathfinder';
  import { Rarity } from 'net.minecraft.world.item';
  import { Map } from 'java.util';
  import { SoundEvent } from 'net.minecraft.sounds';

  class Properties {
    descriptionId: string;
    motionScale: number;
    canPushEntity: boolean;
    canSwim: boolean;
    canDrown: boolean;
    fallDistanceModifier: number;
    canExtinguish: boolean;
    supportsBoating: boolean;
    canConvertToSource: boolean;
    pathType: PathType;
    adjacentPathType: PathType;
    canHydrate: boolean;
    lightLevel: number;
    density: number;
    temperature: number;
    viscosity: number;
    rarity: Rarity;
    sounds: Map;
    adjacentPathType(adjacentPathType: PathType): Properties;
    canDrown(canDrown: boolean): Properties;
    canExtinguish(canExtinguish: boolean): Properties;
    canHydrate(canHydrate: boolean): Properties;
    canPushEntity(canPushEntity: boolean): Properties;
    canSwim(canSwim: boolean): Properties;
    density(density: number): Properties;
    descriptionId(descriptionId: string): Properties;
    fallDistanceModifier(fallDistanceModifier: number): Properties;
    lightLevel(lightLevel: number): Properties;
    motionScale(motionScale: number): Properties;
    pathType(pathType: PathType): Properties;
    rarity(rarity: Rarity): Properties;
    setCanConvertToSource(canConvertToSource: boolean): Properties;
    sound(soundActionId: string, sound: SoundEvent): Properties;
    supportsBoating(supportsBoating: boolean): Properties;
    temperature(temperature: number): Properties;
    viscosity(viscosity: number): Properties;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.fluids.SoftFluid' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface TintMethod extends Enum<TintMethod> {}
  class TintMethod extends Enum<TintMethod> {
    static readonly NO_TINT: TintMethod;
    static readonly FLOWING: TintMethod;
    static readonly STILL_AND_FLOWING: TintMethod;
    appliesToFlowing(): boolean;
    appliesToStill(): boolean;
    get serializedName(): string;
    static valueOf(name: string): TintMethod;
    static values(): TintMethod[];
  }


  interface Capacity extends Enum<Capacity> {}
  class Capacity extends Enum<Capacity> {
    static readonly BOTTLE: Capacity;
    static readonly BOWL: Capacity;
    static readonly BUCKET: Capacity;
    static readonly BLOCK: Capacity;
    get serializedName(): string;
    get value(): number;
    static valueOf(name: string): Capacity;
    static values(): Capacity[];
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.integration.configured' {
  import { ConfigScreen, ModConfigSelectionScreen } from 'com.mrcrayfish.configured.client.screen';
  import { ForgeConfigHolder } from 'net.mehvahdjukaar.moonlight.api.platform.configs.neoforge';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IConfigEntry, IModConfig, ConfigType } from 'com.mrcrayfish.configured.api';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Factory } from 'net.mehvahdjukaar.moonlight.api.integration.configured.CustomConfigScreen';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { BiFunction, Function } from 'java.util.function';
  import { ModConfigHolder } from 'net.mehvahdjukaar.moonlight.api.platform.configs';
  import { Map, Set } from 'java.util';

  interface CustomConfigScreen extends ConfigScreen {}
  class CustomConfigScreen extends ConfigScreen {
    readonly mlConfig: ForgeConfigHolder;
    readonly mainIcon: ItemStack;
    get enabledKeyword(): string;
    get subScreenFactory(): Factory;
    getChangedConfigs(entry: IConfigEntry): number;
    getIcon(...path: string[]): ItemStack;
    onSave(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    tick(): void;
  }


  interface CustomConfigSelectScreen extends ModConfigSelectionScreen {}
  class CustomConfigSelectScreen extends ModConfigSelectionScreen {
    static readonly ON_ICON: ResourceLocation;
    static readonly OFF_ICON: ResourceLocation;
    constructor(modId: string, mainIcon: ItemStack, displayName: string, parent: Screen, configScreenFactory: BiFunction<CustomConfigSelectScreen, IModConfig, CustomConfigScreen>, ...specs: ModConfigHolder[]);

    constructor(modId: string, mainIcon: ItemStack, displayName: string, parent: Screen, configScreenFactory: BiFunction<CustomConfigSelectScreen, IModConfig, CustomConfigScreen>, configMap: Map<ConfigType, Set<IModConfig>>);
    static ensureNotNull(background: ResourceLocation): ResourceLocation;
    get mainIcon(): ItemStack;
    get modId(): string;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    static registerConfigScreen(modId: string, screenSelectFactory: Function<Screen, CustomConfigSelectScreen>): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.integration.configured.CustomConfigScreen' {
  import { CustomConfigScreen } from 'net.mehvahdjukaar.moonlight.api.integration.configured';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Component } from 'net.minecraft.network.chat';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { IModConfig } from 'com.mrcrayfish.configured.api';

  class Factory {
    create(var1: string, var2: ItemStack, var3: Component, var4: Screen, var5: IModConfig): CustomConfigScreen;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.integration' {
  import { INamedSupplier } from 'net.mehvahdjukaar.moonlight.api.util';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { MapItemSavedData } from 'net.minecraft.world.level.saveddata.maps';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Integer } from 'java.lang';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';

  class HardcodedBlockTypes {
    static readonly BURNT: INamedSupplier;
    static init(): void;
  }


  class IrisCompat {
    static isIrisShaderFuckerActive(): boolean;
  }


  class MapAtlasCompat {
    static getMapIdFromAtlas(atlas: ItemStack, level: Level, data: any): number;
    static getSavedDataFromAtlas(atlas: ItemStack, level: Level, player: Player): MapItemSavedData;
    static isAtlas(item: Item): boolean;
    static scaleDecoration(poseStack: PoseStack): void;
    static scaleDecorationText(poseStack: PoseStack, textWidth: number, textScale: number): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.item.additional_placements' {
  import { Block, SoundType } from 'net.minecraft.world.level.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockPlaceContext, UseOnContext } from 'net.minecraft.world.item.context';
  import { InteractionResult } from 'net.minecraft.world';
  import { FoodProperties } from 'net.minecraft.world.food';
  import { Consumer } from 'java.util.function';
  import { Event } from 'net.mehvahdjukaar.moonlight.api.item.additional_placements.AdditionalItemPlacementsAPI';
  import { Item, BlockItem, ItemStack } from 'net.minecraft.world.item';
  import { Properties } from 'Item';
  import { Map } from 'java.util';
  import { LivingEntity } from 'net.minecraft.world.entity';

  class AdditionalItemPlacement {
    constructor(placeable: Block);
    static get blockPlacer(): BlockPlacerItem;
    get placedBlock(): Block;
    overrideGetPlacementState(pContext: BlockPlaceContext): BlockState;
    overridePlace(pContext: BlockPlaceContext): InteractionResult;
    overrideUpdatePlacementContext(context: BlockPlaceContext): BlockPlaceContext;
    overrideUseOn(pContext: UseOnContext, foodProperties: FoodProperties): InteractionResult;
    toString(): string;
  }


  class AdditionalItemPlacementsAPI {
    static addRegistration(eventConsumer: Consumer<Event>): void;
    static getBehavior(item: Item): AdditionalItemPlacement;
    static hasBehavior(item: Item): boolean;
    static registerPlacement(target: Item, placement: AdditionalItemPlacement): void;
    static registerSimplePlacement(target: Item, toPlace: Block): void;
    static unregisterPlacement(target: Item): void;
  }


  interface BlockPlacerItem extends BlockItem {}
  class BlockPlacerItem extends BlockItem {
    constructor(pBlock: Block, pProperties: Properties);
    canPlace(pContext: BlockPlaceContext, pState: BlockState): boolean;
    static get (): BlockPlacerItem;
    get block(): Block;
    get descriptionId(): string;
    getFoodProperties(stack: ItemStack, entity: LivingEntity): FoodProperties;
    mimicGetPlacementState(pContext: BlockPlaceContext, toPlace: Block): BlockState;
    mimicPlace(pContext: BlockPlaceContext, toPlace: Block, overrideSound: SoundType): InteractionResult;
    mimicUseOn(pContext: UseOnContext, toPlace: Block, foodProperties: FoodProperties): InteractionResult;
    registerBlocks(pBlockToItemMap: Map<Block, Item>, pItem: Item): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.item.additional_placements.AdditionalItemPlacementsAPI' {
  import { Item } from 'net.minecraft.world.item';
  import { AdditionalItemPlacement } from 'net.mehvahdjukaar.moonlight.api.item.additional_placements';
  import { Block } from 'net.minecraft.world.level.block';

  class Event {
    register(var1: Item, var2: AdditionalItemPlacement): void;
    registerSimple(target: Item, toPlace: Block): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.item' {
  import { BlockItem, Item, ItemStack, BucketItem } from 'net.minecraft.world.item';
  import { Block } from 'net.minecraft.world.level.block';
  import { Properties } from 'Item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { InteractionHand } from 'net.minecraft.world';
  import { HumanoidArm, LivingEntity } from 'net.minecraft.world.entity';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { AbstractClientPlayer } from 'net.minecraft.client.player';
  import { MultiBufferSource, ItemInHandRenderer } from 'net.minecraft.client.renderer';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { HumanoidModel, EntityModel, HeadedModel } from 'net.minecraft.client.model';
  import { Supplier } from 'java.util.function';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { WoodType } from 'net.mehvahdjukaar.moonlight.api.set.wood';

  interface BlockTypeBasedBlockItem<T extends BlockType = any> extends BlockItem {}
  class BlockTypeBasedBlockItem<T extends BlockType = any> extends BlockItem {
    constructor(pBlock: Block, pProperties: Properties, blockType: T);
    get blockType(): T;
  }


  interface BlockTypeBasedItem<T extends BlockType = any> extends Item {}
  class BlockTypeBasedItem<T extends BlockType = any> extends Item {
    constructor(pProperties: Properties, blockType: T);
    get blockType(): T;
  }


  class IFirstPersonAnimationProvider {
    animateItemFirstPerson(var1: Player, var2: ItemStack, var3: InteractionHand, var4: HumanoidArm, var5: PoseStack, var6: number, var7: number, var8: number, var9: number): void;
    static attachToItem(target: Item, object: IFirstPersonAnimationProvider): void;
    static get(target: Item): IFirstPersonAnimationProvider;
  }


  class IFirstPersonSpecialItemRenderer {
    static attachToItem(target: Item, object: IFirstPersonSpecialItemRenderer): void;
    static get(target: Item): IFirstPersonSpecialItemRenderer;
    renderFirstPersonItem(var1: AbstractClientPlayer, var2: ItemStack, var3: InteractionHand, var4: HumanoidArm, var5: PoseStack, var6: number, var7: number, var8: number, var9: number, var10: MultiBufferSource, var11: number, var12: ItemInHandRenderer): boolean;
  }


  class IItemDecoratorRenderer {
    render(var1: GuiGraphics, var2: Font, var3: ItemStack, var4: number, var5: number): boolean;
  }


  class ILeftClickReact {
    onLeftClick(var1: ItemStack, var2: Player, var3: InteractionHand): boolean;
  }


  class IThirdPersonAnimationProvider {
    static attachToItem(target: Item, object: IThirdPersonAnimationProvider): void;
    static get(target: Item): IThirdPersonAnimationProvider;
    isTwoHanded(): boolean;
    poseLeftArm<T extends LivingEntity>(var1: ItemStack, var2: HumanoidModel<T>, var3: T, var4: HumanoidArm): boolean;
    poseRightArm<T extends LivingEntity>(var1: ItemStack, var2: HumanoidModel<T>, var3: T, var4: HumanoidArm): boolean;
  }


  class IThirdPersonSpecialItemRenderer {
    static attachToItem(target: Item, object: IThirdPersonSpecialItemRenderer): void;
    static get(target: Item): IThirdPersonSpecialItemRenderer;
    renderThirdPersonItem<T extends Player, M extends EntityModel<T> & HeadedModel>(var1: M, var2: LivingEntity, var3: ItemStack, var4: HumanoidArm, var5: PoseStack, var6: MultiBufferSource, var7: number): void;
  }


  interface ModBucketItem extends BucketItem {}
  class ModBucketItem extends BucketItem {
    constructor(fluid: Supplier<Fluid>, properties: Properties);
    get fluid(): Fluid;
  }


  interface WoodBasedBlockItem extends BlockTypeBasedBlockItem<WoodType> {}
  class WoodBasedBlockItem extends BlockTypeBasedBlockItem<WoodType> {
    constructor(blockIn: Block, builder: Properties, woodType: WoodType);
  }


  interface WoodBasedItem extends BlockTypeBasedItem<WoodType> {}
  class WoodBasedItem extends BlockTypeBasedItem<WoodType> {
    constructor(builder: Properties, woodType: WoodType);
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.map.client' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RenderType, MultiBufferSource } from 'net.minecraft.client.renderer';
  import { Function } from 'java.util.function';
  import { MLMapDecoration, MLMapDecorationType } from 'net.mehvahdjukaar.moonlight.api.map.decoration';
  import { Holder } from 'net.minecraft.core';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { MapItemSavedData } from 'net.minecraft.world.level.saveddata.maps';

  class MapDecorationClientManager {
    static readonly LOCATION_MAP_MARKERS: ResourceLocation;
    static readonly MAP_MARKERS_RENDER_TYPE: RenderType;
    static getRenderer<E extends MLMapDecoration>(decoration: E): MapDecorationRenderer<E>;
    static getRenderer<E extends MLMapDecoration, T extends MLMapDecorationType<E, any>>(type: T): MapDecorationRenderer<E>;
    static getRenderer<E extends MLMapDecoration>(type: Holder<MLMapDecorationType<any, any>>): MapDecorationRenderer<E>;
    static registerCustomRenderer<T extends MLMapDecoration>(typeFactoryId: ResourceLocation, renderer: Function<ResourceLocation, MapDecorationRenderer<T>>): void;
    static render<T extends MLMapDecoration>(decoration: T, matrixStack: PoseStack, vertexBuilder: VertexConsumer, buffer: MultiBufferSource, mapData: MapItemSavedData, isOnFrame: boolean, light: number, index: number): boolean;
  }


  class MapDecorationRenderer<T extends MLMapDecoration = any> {
    constructor(texture: ResourceLocation);
    render(decoration: T, matrixStack: PoseStack, vertexBuilder: VertexConsumer, buffer: MultiBufferSource, mapData: MapItemSavedData, isOnFrame: boolean, light: number, index: number): boolean;
    render(decoration: T, matrixStack: PoseStack, vertexBuilder: VertexConsumer, buffer: MultiBufferSource, mapData: MapItemSavedData, isOnFrame: boolean, light: number, index: number, rendersText: boolean): boolean;
    renderDecorationSprite(matrixStack: PoseStack, buffer: MultiBufferSource, vertexBuilder: VertexConsumer, light: number, index: number, color: number, alpha: number, outline: boolean): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.map.decoration' {
  import { Optional } from 'java.util';
  import { RuleTest } from 'net.minecraft.world.level.levelgen.structure.templatesystem';
  import { Component } from 'net.minecraft.network.chat';
  import { HolderSet, BlockPos, Holder } from 'net.minecraft.core';
  import { Structure } from 'net.minecraft.world.level.levelgen.structure';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { BlockGetter } from 'net.minecraft.world.level';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Codec, MapCodec } from 'com.mojang.serialization';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { Boolean, Float } from 'java.lang';
  import { P7 } from 'Products';
  import { Mu, Instance } from 'RecordCodecBuilder';
  import { MapItemSavedData } from 'net.minecraft.world.level.saveddata.maps';
  import { TriFunction } from 'net.mehvahdjukaar.moonlight.api.misc';

  interface MLJsonMapDecorationType extends MLMapDecorationType<MLMapDecoration, SimpleMapMarker> {}
  class MLJsonMapDecorationType extends MLMapDecorationType<MLMapDecoration, SimpleMapMarker> {
    constructor(target: Optional<RuleTest>);

    constructor(target: Optional<RuleTest>, name: Optional<Component>, rotation: number, mapColor: number);

    constructor(target: Optional<RuleTest>, name: Optional<Component>, rotation: number, mapColor: number, structure: Optional<HolderSet<Structure>>);
    createMarkerFromWorld(reader: BlockGetter, pos: BlockPos): SimpleMapMarker;
    get associatedStructure(): Optional<HolderSet<Structure>>;
    get customFactoryID(): ResourceLocation;
    get defaultMapColor(): number;
    get displayName(): Optional<Component>;
    get rotation(): number;
    get target(): Optional<RuleTest>;
    isFromWorld(): boolean;
  }


  class MLMapDecoration {
    static readonly CODEC: StreamCodec;
    constructor(type: Holder<MLMapDecorationType<any, any>>, x: number, y: number, rot: number, displayName: Optional<Component>);
    equals(obj: any): boolean;
    get displayName(): Component;
    get rot(): number;
    get type(): Holder<MLMapDecorationType<any, any>>;
    get x(): number;
    get y(): number;
    hashCode(): number;
  }


  interface MLMapDecorationType<D extends MLMapDecoration = any, M extends MLMapMarker<D> = any> extends MLJsonMapDecorationType, MLSpecialMapDecorationType {}
  class MLMapDecorationType<D extends MLMapDecoration = any, M extends MLMapMarker<D> = any> extends MLJsonMapDecorationType {
    static readonly DIRECT_CODEC: Codec;
    static readonly CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    createMarkerFromWorld(var1: BlockGetter, var2: BlockPos): M;
    get associatedStructure(): Optional<HolderSet<Structure>>;
    get customFactoryID(): ResourceLocation;
    get decorationCodec(): StreamCodec<RegistryFriendlyByteBuf, D>;
    get defaultMapColor(): number;
    get markerCodec(): MapCodec<M>;
  }


  class MLMapMarker<D extends MLMapDecoration = any> {
    static readonly REFERENCE_CODEC: Codec;
    static readonly HAS_SMALL_TEXTURE_FLAG: number;
    constructor(type: Holder<MLMapDecorationType<any, any>>, pos: BlockPos, rotation: number, component: Optional<Component>, shouldRefresh: Optional<boolean>, shouldSave: Optional<boolean>, preventsExtending: boolean);
    static baseCodecGroup<T extends MLMapMarker<any>>(instance: Instance<T>): P7<Mu<T>, Holder<MLMapDecorationType<any, any>>, BlockPos, number, Optional<Component>, Optional<boolean>, Optional<boolean>, boolean>;
    createDecorationFromMarker(data: MapItemSavedData): D;
    equals(o: any): boolean;
    get displayName(): Optional<Component>;
    get flags(): number;
    get markerUniqueId(): string;
    get pos(): BlockPos;
    get rotation(): number;
    get type(): Holder<MLMapDecorationType<any, any>>;
    hasFlag(flag: number): boolean;
    hashCode(): number;
    preventsExtending(): boolean;
    shouldRefreshFromWorld(): boolean;
    shouldSave(): boolean;
  }


  interface MLSpecialMapDecorationType<D extends MLMapDecoration = any, M extends MLMapMarker<D> = any> extends MLMapDecorationType<D, M> {}
  class MLSpecialMapDecorationType<D extends MLMapDecoration = any, M extends MLMapMarker<D> = any> extends MLMapDecorationType<D, M> {
    factoryID: ResourceLocation;
    createMarkerFromWorld(reader: BlockGetter, pos: BlockPos): M;
    static fromWorldCustomMarker<D extends MLMapDecoration, M extends MLMapMarker<D>>(markerCodec: MapCodec<M>, decorationCodec: StreamCodec<RegistryFriendlyByteBuf, D>, markerFromWorldFactory: TriFunction<Holder<MLMapDecorationType<any, any>>, BlockGetter, BlockPos, M>): MLSpecialMapDecorationType<D, M>;
    static fromWorldSimple(markerFromWorldFactory: TriFunction<Holder<MLMapDecorationType<any, any>>, BlockGetter, BlockPos, SimpleMapMarker>): MLSpecialMapDecorationType<MLMapDecoration, SimpleMapMarker>;
    get customFactoryID(): ResourceLocation;
    isFromWorld(): boolean;
    static standaloneCustomMarker<D extends MLMapDecoration, M extends MLMapMarker<D>>(markerCodec: MapCodec<M>, decorationCode: StreamCodec<RegistryFriendlyByteBuf, D>): MLSpecialMapDecorationType<D, M>;
  }


  interface SimpleMapMarker extends MLMapMarker<MLMapDecoration> {}
  class SimpleMapMarker extends MLMapMarker<MLMapDecoration> {
    static readonly DIRECT_CODEC: MapCodec;
    constructor(type: Holder<MLMapDecorationType<any, any>>, pos: BlockPos, rotation: number, name: Optional<Component>);

    constructor(type: Holder<MLMapDecorationType<any, any>>, pos: BlockPos, rotation: number, name: Optional<Component>, shouldRefresh: Optional<boolean>, shouldSave: Optional<boolean>, preventsExtending: boolean);
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.map' {
  import { Map, Set, Optional, List } from 'java.util';
  import { MLMapDecoration, MLMapMarker, MLSpecialMapDecorationType, MLMapDecorationType } from 'net.mehvahdjukaar.moonlight.api.map.decoration';
  import { Type, DirtyCounter } from 'CustomMapData';
  import { LevelAccessor, Level } from 'net.minecraft.world.level';
  import { BlockPos, Holder, Registry, RegistryAccess } from 'net.minecraft.core';
  import { MapItemSavedData, MapId, MapDecorationType } from 'net.minecraft.world.level.saveddata.maps';
  import { Consumer, Supplier, BiFunction } from 'java.util.function';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { HolderReference, TriFunction } from 'net.mehvahdjukaar.moonlight.api.misc';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Structure } from 'net.minecraft.world.level.levelgen.structure';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Component } from 'net.minecraft.network.chat';

  class ExpandedMapData {
    ml$addCustomMarker<M extends MLMapMarker<any>>(var1: M): void;
    ml$copy(): MapItemSavedData;
    ml$getCustomData(): Map<Type<any, any>, CustomMapData<any, any>>;
    ml$getCustomDecorations(): Map<string, MLMapDecoration>;
    ml$getCustomMarkers(): Map<string, MLMapMarker<any>>;
    ml$getVanillaDecorationSize(): number;
    ml$removeCustomMarker(var1: string): boolean;
    ml$resetCustomDecoration(): void;
    ml$setCustomDataDirty<H extends DirtyCounter>(var1: Type<any, any>, var2: Consumer<H>): void;
    ml$setCustomDecorationsDirty(): void;
    ml$toggleCustomDecoration(var1: LevelAccessor, var2: BlockPos): boolean;
  }


  class MapDataRegistry {
    static readonly REGISTRY_KEY: ResourceKey;
    static readonly MAP_DECORATION_REGISTRY_KEY: ResourceKey;
    static readonly GENERIC_STRUCTURE_MARKER: HolderReference;
    static addDynamicClientMarkersEvent(event: BiFunction<MapId, MapItemSavedData, Set<MLMapMarker<any>>>): void;
    static addDynamicServerMarkersEvent(event: TriFunction<Player, MapId, MapItemSavedData, Set<MLMapMarker<any>>>): void;
    static get defaultType(): MLMapDecorationType<any, any>;
    static get mapDataRegistry(): Registry<Type<any, any>>;
    static getAssociatedType(structure: Holder<Structure>): MLMapDecorationType<any, any>;
    static getDecorationFoStructure(level: Level, structure: Holder<Structure>): Holder<MLMapDecorationType<any, any>>;
    static getHolder(id: ResourceLocation): Holder<MLMapDecorationType<any, any>>;
    static getMapDecorationRegistry(registryAccess: RegistryAccess): Registry<MLMapDecorationType<any, any>>;
    static getOptional(id: ResourceLocation): Optional<MLMapDecorationType<any, any>>;
    static getOrDefault(id: ResourceLocation): MLMapDecorationType<any, any>;
    static getRegistry(registryAccess: RegistryAccess): Registry<MLMapDecorationType<any, any>>;
    static registerCustomMapSavedData<P, T extends CustomMapData<any, P>>(type: Type<P, T>): Type<P, T>;
    static registerCustomMapSavedData<P, T extends CustomMapData<any, P>>(id: ResourceLocation, factory: Supplier<T>, patchCodec: StreamCodec<RegistryFriendlyByteBuf, P>): Type<P, T>;
    static registerSpecialMapDecorationTypeFactory(factoryId: ResourceLocation, decorationTypeFactory: Supplier<MLSpecialMapDecorationType<any, any>>): void;
  }


  class MapHelper {
    static addCustomTargetDecorationToItem(stack: ItemStack, pos: BlockPos, type: Holder<MLMapDecorationType<any, any>>, mapColor: number): void;
    static addSimpleDecorationToMap(data: MapItemSavedData, type: Holder<MLMapDecorationType<any, any>>, pos: BlockPos, rotation: number, name: Component): boolean;
    static addTargetDecorationToItem(level: Level, stack: ItemStack, pos: BlockPos, id: ResourceLocation, mapColor: number): void;
    static addTargetDecorationToItem(stack: ItemStack, pos: BlockPos, id: ResourceLocation, mapColor: number): void;
    static addVanillaTargetDecorationToItem(stack: ItemStack, pos: BlockPos, type: Holder<MapDecorationType>, mapColor: number): void;
    static getMapData(stack: ItemStack, level: Level, player: Player): MapItemSavedData;
    static getMarkersAtPos(reader: LevelAccessor, pos: BlockPos): MLMapMarker<any>[];
    static removeAllCustomMarkers(level: Level, stack: ItemStack, player: Player): boolean;
    static toggleMarkersAtPos(level: Level, pos: BlockPos, stack: ItemStack, player: Player): boolean;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.misc' {
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Function, Supplier, Predicate, Consumer } from 'java.util.function';
  import { Function7, Function8, Function9, Either, Pair } from 'com.mojang.datafixers.util';
  import { LinkedList, Optional, Collection, Iterator, Set, Map, AbstractList, RandomAccess, List, AbstractSet } from 'java.util';
  import { MapCodec, Codec, DataResult, DynamicOps } from 'com.mojang.serialization';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Timing } from 'net.mehvahdjukaar.moonlight.api.misc.ConcurrentStopwatch';
  import { Registry, Holder, HolderOwner, HolderGetter, IdMap, RegistryAccess, BlockPos } from 'net.minecraft.core';
  import { TagKey } from 'net.minecraft.tags';
  import { Stream } from 'java.util.stream';
  import { Kind } from 'Holder';
  import { Entity, EntityType } from 'net.minecraft.world.entity';
  import { Level, LevelReader } from 'net.minecraft.world.level';
  import { Provider } from 'HolderLookup';
  import { Opt } from 'net.mehvahdjukaar.moonlight.api.misc.HolderRef';
  import { Container, InteractionHand } from 'net.minecraft.world';
  import { SimplePlacer, ExclusivePlacer } from 'net.mehvahdjukaar.moonlight.api.misc.InvPlacer';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Inventory, Player } from 'net.minecraft.world.entity.player';
  import { Task, Tree } from 'net.mehvahdjukaar.moonlight.api.misc.IProgressTracker';
  import { Entry } from 'Map';
  import { ByteBuf } from 'io.netty.buffer';
  import { SoundType } from 'net.minecraft.world.level.block';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { SimpleJsonResourceReloadListener } from 'net.minecraft.server.packs.resources';
  import { JsonElement } from 'com.google.gson';
  import { Logger } from 'java.util.logging';
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { ClassNode } from 'org.objectweb.asm.tree';
  import { Slot } from 'net.mehvahdjukaar.moonlight.api.misc.SlotProvider';
  import { Class, Integer } from 'java.lang';
  import { BlockEntity, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { FriendlyByteBuf, RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { SavedData } from 'net.minecraft.world.level.saveddata';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { Scope } from 'net.mehvahdjukaar.moonlight.api.misc.WorldSavedDataType';

  class BiggerStreamCodecs {
    static composite<B, C, T1, T2, T3, T4, T5, T6, T7>(codec1: StreamCodec<B, T1>, getter1: Function<C, T1>, codec2: StreamCodec<B, T2>, getter2: Function<C, T2>, codec3: StreamCodec<B, T3>, getter3: Function<C, T3>, codec4: StreamCodec<B, T4>, getter4: Function<C, T4>, codec5: StreamCodec<B, T5>, getter5: Function<C, T5>, codec6: StreamCodec<B, T6>, getter6: Function<C, T6>, codec7: StreamCodec<B, T7>, getter7: Function<C, T7>, factory: Function7<T1, T2, T3, T4, T5, T6, T7, C>, object: B, object: B, object2: C): StreamCodec<B, C>;
    static composite<B, C, T1, T2, T3, T4, T5, T6, T7, T8>(codec1: StreamCodec<B, T1>, getter1: Function<C, T1>, codec2: StreamCodec<B, T2>, getter2: Function<C, T2>, codec3: StreamCodec<B, T3>, getter3: Function<C, T3>, codec4: StreamCodec<B, T4>, getter4: Function<C, T4>, codec5: StreamCodec<B, T5>, getter5: Function<C, T5>, codec6: StreamCodec<B, T6>, getter6: Function<C, T6>, codec7: StreamCodec<B, T7>, getter7: Function<C, T7>, codec8: StreamCodec<B, T8>, getter8: Function<C, T8>, factory: Function8<T1, T2, T3, T4, T5, T6, T7, T8, C>, object: B, object: B, object2: C): StreamCodec<B, C>;
    static composite<B, C, T1, T2, T3, T4, T5, T6, T7, T8, T9>(codec1: StreamCodec<B, T1>, getter1: Function<C, T1>, codec2: StreamCodec<B, T2>, getter2: Function<C, T2>, codec3: StreamCodec<B, T3>, getter3: Function<C, T3>, codec4: StreamCodec<B, T4>, getter4: Function<C, T4>, codec5: StreamCodec<B, T5>, getter5: Function<C, T5>, codec6: StreamCodec<B, T6>, getter6: Function<C, T6>, codec7: StreamCodec<B, T7>, getter7: Function<C, T7>, codec8: StreamCodec<B, T8>, getter8: Function<C, T8>, codec9: StreamCodec<B, T9>, getter9: Function<C, T9>, factory: Function9<T1, T2, T3, T4, T5, T6, T7, T8, T9, C>, object: B, object: B, object2: C): StreamCodec<B, C>;
    static composite<B, C, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(codec1: StreamCodec<B, T1>, getter1: Function<C, T1>, codec2: StreamCodec<B, T2>, getter2: Function<C, T2>, codec3: StreamCodec<B, T3>, getter3: Function<C, T3>, codec4: StreamCodec<B, T4>, getter4: Function<C, T4>, codec5: StreamCodec<B, T5>, getter5: Function<C, T5>, codec6: StreamCodec<B, T6>, getter6: Function<C, T6>, codec7: StreamCodec<B, T7>, getter7: Function<C, T7>, codec8: StreamCodec<B, T8>, getter8: Function<C, T8>, codec9: StreamCodec<B, T9>, getter9: Function<C, T9>, codec10: StreamCodec<B, T10>, getter10: Function<C, T10>, factory: Function9<T1, T2, T3, T4, T5, T6, T7, T8, T9, C>, object: B, object: B, object2: C): StreamCodec<B, C>;
  }


  interface CircularList<T = any> extends LinkedList<T> {}
  class CircularList<T = any> extends LinkedList<T> {
    constructor(size: number);
    addFirst(t: T): void;
    addLast(t: T): void;
  }


  interface CodecMapRegistry<T = any> extends MapRegistry<MapCodec> {}
  class CodecMapRegistry<T = any> extends MapRegistry<MapCodec> {
    constructor(name: string);
    register<B extends T>(name: ResourceLocation, value: MapCodec<B>): MapCodec<B>;
    register<B extends T>(name: string, value: MapCodec<B>): MapCodec<B>;
  }


  class ConcurrentStopwatch {
    clear(): void;
    elapsedMillis(): number;
    elapsedNanos(): number;
    elapsedSeconds(): number;
    measure(): Timing;
    toString(): string;
  }


  interface DataObjectReference<T = any> extends DynamicHolder<T> {}
  class DataObjectReference<T = any> extends DynamicHolder<T> {
    constructor(id: string, registry: ResourceKey<Registry<T>>);

    constructor(location: ResourceLocation, registry: ResourceKey<Registry<T>>);

    constructor(key: ResourceKey<T>);
    get holder(): Holder<T>;
    get unchecked(): T;
  }


  interface DynamicHolder<T = any> extends Supplier<T>, Holder<T> {}
  class DynamicHolder<T = any> extends Supplier<T> {
    canSerializeIn(owner: HolderOwner<T>): boolean;
    static clearCache(): void;
    equals(o: any): boolean;
    get (): T;
    get iD(): ResourceLocation;
    get key(): ResourceKey<T>;
    get registeredName(): string;
    hashCode(): number;
    is(location: ResourceLocation): boolean;
    is(resourceKey: ResourceKey<T>): boolean;
    is(predicate: Predicate<ResourceKey<T>>): boolean;
    is(other: Holder<T>): boolean;
    is(tagKey: TagKey<T>): boolean;
    isBound(): boolean;
    kind(): Kind;
    static of<A>(id: string, registry: ResourceKey<Registry<A>>): DynamicHolder<A>;
    static of<A>(location: ResourceLocation, registry: ResourceKey<Registry<A>>): DynamicHolder<A>;
    static of<A>(key: ResourceKey<A>): DynamicHolder<A>;
    tags(): Stream<TagKey<T>>;
    toString(): string;
    unwrap(): Either<ResourceKey<T>, T>;
    unwrapKey(): Optional<ResourceKey<T>>;
    value(): T;
  }


  interface FrequencyOrderedCollection<T = any> extends Collection<T> {}
  class FrequencyOrderedCollection<T = any> extends Collection<T> {
    add(obj: T): boolean;
    add(obj: T, count: number): boolean;
    addAll(c: Collection<T>): boolean;
    clear(): void;
    contains(obj: any): boolean;
    containsAll(c: Collection<any>): boolean;
    get first(): T;
    get last(): T;
    isEmpty(): boolean;
    iterator(): Iterator<T>;
    remove(obj: T, count: number): boolean;
    remove(obj: any): boolean;
    removeAll(c: Collection<any>): boolean;
    removeAllOccurrences(obj: T): boolean;
    retainAll(c: Collection<any>): boolean;
    size(): number;
    toArray(): any[];
    toArray<U>(a: U[], size: number): U[];
  }


  class HolderRef<T = any> {
    static clearCache(): void;
    equals(o: any): boolean;
    get(entity: Entity): T;
    get(level: Level): T;
    get(level: LevelReader): T;
    get(r: Provider): T;
    get iD(): ResourceLocation;
    get key(): ResourceKey<T>;
    get registeredName(): string;
    getHolder(entity: Entity): Holder<T>;
    getHolder(level: Level): Holder<T>;
    getHolder(level: LevelReader): Holder<T>;
    getHolder(r: Provider): Holder<T>;
    hashCode(): number;
    is(object: T, r: Provider): boolean;
    is(object: T, level: LevelReader): boolean;
    is(tag: TagKey<T>, r: Provider): boolean;
    is(tag: TagKey<T>, level: LevelReader): boolean;
    is(location: ResourceLocation): boolean;
    is(resourceKey: ResourceKey<T>): boolean;
    is(predicate: Predicate<ResourceKey<T>>): boolean;
    is(other: Holder<T>): boolean;
    lookup(lookup: HolderGetter<T>): Holder<T>;
    static of<A>(id: string, registry: ResourceKey<Registry<A>>): HolderRef<A>;
    static of<A>(location: ResourceLocation, registry: ResourceKey<Registry<A>>): HolderRef<A>;
    static of<A>(key: ResourceKey<A>): HolderRef<A>;
    static optional<A>(location: ResourceLocation, registry: ResourceKey<Registry<A>>): OptHolderRef<A>;
    static optional<A>(key: ResourceKey<A>): OptHolderRef<A>;
    toString(): string;
    static wrap<A>(obj: A, registry: ResourceKey<Registry<A>>): HolderRef<A>;
  }


  interface HolderReference<A = any> extends HolderRef<A> {}
  class HolderReference<A = any> extends HolderRef<A> {
    static of<A>(id: string, registry: ResourceKey<Registry<A>>): HolderReference<A>;
    static of<A>(location: ResourceLocation, registry: ResourceKey<Registry<A>>): HolderReference<A>;
    static of<A>(key: ResourceKey<A>): HolderReference<A>;
    static optional<A>(location: ResourceLocation, registry: ResourceKey<Registry<A>>): Opt<A>;
    static optional<A>(key: ResourceKey<A>): Opt<A>;
  }


  class IAttachmentType<A = any, T = any> {
    getOrCreate(var1: T): A;
    getOrNull(var1: T): A;
    set(var1: T, var2: A): void;
    sync(var1: T): void;
  }


  class IContainerProvider {
    get container(): Container;
  }


  class InvPlacer {
    static readonly EXISTING: SimplePlacer;
    static readonly EMPTY: SimplePlacer;
    static readonly ANY: SimplePlacer;
    static readonly DEFAULT: InvPlacer;
    static readonly DROP: InvPlacer;
    static exclusiveSequence(): ExclusivePlacer;
    static existingOrAny(): InvPlacer;
    static hand(hand: InteractionHand): SimplePlacer;
    static hand(hand: InteractionHand, predicate: Predicate<ItemStack>): SimplePlacer;
    static handNotEmpty(hand: InteractionHand): SimplePlacer;
    static handOrExistingOrAny(hand: InteractionHand): InvPlacer;
    static handOrExistingOrAnyAvoidEmptyHand(hand: InteractionHand): InvPlacer;
    static of(slots: SlotProvider): SimplePlacer;
    static of(slots: SlotProvider, predicate: Predicate<ItemStack>): SimplePlacer;
    or(other: InvPlacer): InvPlacer;
    place(var1: ItemStack, var2: Inventory, var3: Player): boolean;
    static slot(slot: number): SimplePlacer;
  }


  class IProgressTracker {
    static createTree(totalSteps: number): Tree;
    subtask(var1: number): Task;
  }


  interface MapRegistry<T = any> extends IdMap<T>, Codec<T> {}
  class MapRegistry<T = any> extends IdMap<T> {
    constructor(name: string);
    byId(id: number): T;
    clear(): void;
    contains(id: number): boolean;
    containsKey(name: ResourceLocation): boolean;
    decode<U>(ops: DynamicOps<U>, json: U): DataResult<Pair<T, U>>;
    dispatch<E>(type: Function<E, T>): Codec<E>;
    encode<U>(object: T, ops: DynamicOps<U>, prefix: U): DataResult<U>;
    get entries(): Set<Entry<ResourceLocation, T>>;
    get streamCodec(): StreamCodec<ByteBuf, T>;
    get values(): Set<T>;
    getId(value: T): number;
    getKey(value: T): ResourceLocation;
    getValue(name: ResourceLocation): T;
    getValue(name: string): T;
    getValueOrDefault(parse: ResourceLocation, defaultType: T): T;
    isEmpty(): boolean;
    iterator(): Iterator<T>;
    keySet(): Set<ResourceLocation>;
    static ofCodec<B>(name: string): CodecMapRegistry<B>;
    static ofCodec<B>(): CodecMapRegistry<B>;
    register<B extends T>(name: ResourceLocation, value: B): T;
    register<B extends T>(name: string, value: B): T;
    size(): number;
  }


  interface ModSoundType extends SoundType {}
  class ModSoundType extends SoundType {
    constructor(volumeIn: number, pitchIn: number, breakSoundIn: Supplier<SoundEvent>, stepSoundIn: Supplier<SoundEvent>, placeSoundIn: Supplier<SoundEvent>, hitSoundIn: Supplier<SoundEvent>, fallSoundIn: Supplier<SoundEvent>);
    get breakSound(): SoundEvent;
    get fallSound(): SoundEvent;
    get hitSound(): SoundEvent;
    get placeSound(): SoundEvent;
    get stepSound(): SoundEvent;
  }


  interface OptHolderRef<T = any> extends HolderRef<T> {}
  class OptHolderRef<T = any> extends HolderRef<T> {
    asOptional(r: Provider): Optional<T>;
    asOptionalHolder(r: Provider): Optional<Holder<T>>;
    get(r: Provider): T;
    get(level: Level): T;
    get(entity: Entity): T;
    getHolder(r: Provider): Holder<T>;
    getHolder(level: Level): Holder<T>;
    getHolder(entity: Entity): Holder<T>;
    ifPresent(r: Provider, consumer: Consumer<T>): void;
    is(object: T, r: Provider): boolean;
    is(tag: TagKey<T>, r: Provider): boolean;
    is(location: ResourceLocation): boolean;
    isPresent(r: Provider): boolean;
    isPresent(level: LevelReader): boolean;
    lookup(lookup: HolderGetter<T>): Holder<T>;
    static of<A>(location: ResourceLocation, registry: ResourceKey<Registry<A>>): OptHolderRef<A>;
    static of<A>(key: ResourceKey<A>): OptHolderRef<A>;
    static of<A>(id: string, registry: ResourceKey<Registry<A>>): HolderRef<A>;
  }


  interface OptionalHolder<T = any> extends DynamicHolder<T> {}
  class OptionalHolder<T = any> extends DynamicHolder<T> {
    asOptional(): Optional<Holder<T>>;
    asOptionalValue(): Optional<T>;
    get (): T;
    is(tagKey: TagKey<T>): boolean;
    is(location: ResourceLocation): boolean;
    isEmpty(): boolean;
    isPresent(): boolean;
    static of<A>(location: ResourceLocation, registry: ResourceKey<Registry<A>>): OptionalHolder<A>;
    static of<A>(key: ResourceKey<A>): OptionalHolder<A>;
    static of<A>(id: string, registry: ResourceKey<Registry<A>>): OptionalHolder<A>;
    tags(): Stream<TagKey<T>>;
    value(): T;
  }


  interface OptRegSupplier<A = any> extends RegSupplier<A> {}
  class OptRegSupplier<A = any> extends RegSupplier<A> {
    asOptionalHolder(): Optional<Holder<A>>;
    canSerializeIn(owner: HolderOwner<A>): boolean;
    get (): A;
    get holder(): Holder<A>;
    get id(): ResourceLocation;
    get key(): ResourceKey<A>;
    ifPresent(consumer: Consumer<A>): void;
    is(location: ResourceLocation): boolean;
    is(resourceKey: ResourceKey<A>): boolean;
    is(predicate: Predicate<ResourceKey<A>>): boolean;
    is(tag: TagKey<A>): boolean;
    is(holder: Holder<A>): boolean;
    isBound(): boolean;
    isPresent(): boolean;
    kind(): Kind;
    static of<A>(location: ResourceLocation, registry: Registry<A>): OptRegSupplier<A>;
    static of<A>(location: ResourceLocation, registry: ResourceKey<Registry<A>>): OptRegSupplier<A>;
    tags(): Stream<TagKey<A>>;
    unwrap(): Either<ResourceKey<A>, A>;
    unwrapKey(): Optional<ResourceKey<A>>;
    value(): A;
    static wrap<A>(obj: A, registry: ResourceKey<Registry<A>>): OptRegSupplier<A>;
    static wrap<A>(obj: A, registry: Registry<A>): OptRegSupplier<A>;
  }


  interface PathSearchTrie<T = any> extends SearchTrie<string, T> {}
  class PathSearchTrie<T = any> extends SearchTrie<string, T> {
    insert(path: string, object: T): void;
    listFolders(path: string): Collection<string>;
    remove(path: string): boolean;
    search(path: string): Collection<T>;
  }


  class QuadConsumer<K = any, V = any, S = any, T = any> {
    accept(var1: K, var2: V, var3: S, var4: T): void;
  }


  class Registrator<T = any> {
    register(var1: ResourceLocation, var2: T): void;
    register(name: string, instance: T): void;
  }


  interface RegistryAccessJsonReloadListener extends SimpleJsonResourceReloadListener {}
  class RegistryAccessJsonReloadListener extends SimpleJsonResourceReloadListener {
    parse(var1: Map<ResourceLocation, JsonElement>, var2: RegistryAccess): void;
    static runReloads(access: RegistryAccess): void;
  }


  interface RegSupplier<T = any> extends Supplier<T>, Holder<T> {}
  class RegSupplier<T = any> extends Supplier<T> {
    get (): T;
    get holder(): Holder<T>;
    get id(): ResourceLocation;
    get key(): ResourceKey<T>;
    is(other: T): boolean;
  }


  interface ResourceLocationSearchTrie extends PathSearchTrie<ResourceLocation> {}
  class ResourceLocationSearchTrie extends PathSearchTrie<ResourceLocation> {
    static getResPath(objectToAdd: ResourceLocation): string;
    insert(objectToAdd: ResourceLocation): void;
    insertPath(fullPath: string): void;
    remove(object: ResourceLocation): boolean;
    remove(path: string): boolean;
  }


  interface RollingBuffer<T = any> extends RandomAccess, AbstractList<T> {}
  class RollingBuffer<T = any> extends RandomAccess {
    constructor(capacity: number);
    add(element: T): boolean;
    add(index: number, element: T): void;
    addFirst(e: T): void;
    addLast(e: T): void;
    capacity(): number;
    clear(): void;
    fillAll(element: T): void;
    get(index: number): T;
    get first(): T;
    get last(): T;
    isFull(): boolean;
    push(element: T): void;
    remove(index: number): T;
    removeFirst(): T;
    removeLast(): T;
    set(index: number, element: T): T;
    size(): number;
    toString(): string;
  }


  class SearchTrie<K = any, O = any> {
    clear(): void;
    insert(paths: K[], object: O): void;
    listKeys(path: K[]): Collection<K>;
    printTrie(): void;
    printTrie(logger: Logger): void;
    remove(path: K[]): boolean;
    search(paths: K[]): Collection<O>;
  }


  class SidedInstance<T = any> {
    get(ra: Provider): T;
    invalidate(ra: Provider): void;
    static of<T>(factory: Function<Provider, T>): SidedInstance<T>;
    set(ra: Provider, instance: T): void;
  }


  interface SimpleMixinPlugin extends IMixinConfigPlugin {}
  class SimpleMixinPlugin extends IMixinConfigPlugin {
    acceptTargets(myTargets: Set<string>, otherTargets: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    onLoad(mixinPackage: string): void;
    postApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    preApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    shouldApplyMixin(targetClassName: string, mixinClassName: string): boolean;
  }


  class SlotProvider {
    static readonly ALL: SlotProvider;
    static readonly OFF_HAND: SlotProvider;
    static readonly MAIN_HAND: SlotProvider;
    getSlots(var1: Inventory): Iterator<Slot>;
    static hand(hand: InteractionHand): SlotProvider;
    static single(slot: number): SlotProvider;
  }


  interface StreamCodecMapRegistry<T = any> extends MapRegistry<StreamCodec> {}
  class StreamCodecMapRegistry<T = any> extends MapRegistry<StreamCodec> {
    constructor(name: string);
  }


  class TField<C = any, T = any> {
    constructor(field: Class<C>, name: string);
    get(obj: C): T;
    static of<C, T>(clazz: Class<C>, name: string): TField<C, T>;
    set(obj: C, value: T): void;
  }


  class ThrowingSupplier<T = any> {
    get (): T;
  }


  class TileOrEntityTarget {
    get entityId(): number;
    get pos(): BlockPos;
    getBlockEntityOrThrow<T extends BlockEntity>(level: Level, type: BlockEntityType<T>): T;
    getEntityOrThrow<T extends Entity>(level: Level, type: EntityType<T>): T;
    getTarget(level: Level): any;
    map<T>(level: Level, a: Function<BlockEntity, T>, b: Function<Entity, T>): T;
    static of(be: BlockEntity): TileOrEntityTarget;
    static of(entity: Entity): TileOrEntityTarget;
    static orThrow(object: any): TileOrEntityTarget;
    static read(buf: FriendlyByteBuf): TileOrEntityTarget;
    toString(): string;
    write(buf: FriendlyByteBuf): void;
  }


  class TMethod<C = any, T = any> {
    constructor(clazz: Class<C>, name: string, ...parameterTypes: Class<any>[]);
    invoke(obj: C, ...args: any[]): T;
    static of<C, T>(clazz: Class<C>, name: string, ...parameterTypes: Class<any>[]): TMethod<C, T>;
  }


  class TriFunction<T = any, U = any, V = any, R = any> {
    andThen<W>(after: Function<R, W>): TriFunction<T, U, V, W>;
    apply(var1: T, var2: U, var3: V): R;
  }


  class TriResult<T = any> {
    static fail<T>(): TriResult<T>;
    get object(): T;
    isFail(): boolean;
    isPass(): boolean;
    isSuccess(): boolean;
    orElse(other: T): T;
    static pass<T>(): TriResult<T>;
    static success<T>(type: T): TriResult<T>;
  }


  interface WeakHashSet<T = any> extends AbstractSet<T> {}
  class WeakHashSet<T = any> extends AbstractSet<T> {
    add(obj: T): boolean;
    contains(obj: any): boolean;
    iterator(): Iterator<T>;
    remove(obj: any): boolean;
    size(): number;
  }


  interface WorldSavedData extends SavedData {}
  class WorldSavedData extends SavedData {
    get type(): WorldSavedDataType<WorldSavedData>;
    onReassigned(level: Level): void;
    save(tag: CompoundTag, registries: Provider): CompoundTag;
    setDirty(dirty: boolean): void;
    sync(): void;
  }


  class WorldSavedDataType<D extends WorldSavedData = any> {
    static readonly STREAM_CODEC: StreamCodec;
    static readonly CODEC: Codec;
    constructor(id: ResourceLocation, overworldToDataConstructor: Function<ServerLevel, D>, codec: Codec<D>, streamCodec: StreamCodec<RegistryFriendlyByteBuf, D>);

    constructor(id: ResourceLocation, overworldToDataConstructor: Function<ServerLevel, D>, codec: Codec<D>, streamCodec: StreamCodec<RegistryFriendlyByteBuf, D>, scope: Scope);
    get codec(): Codec<D>;
    get name(): string;
    get streamCodec(): StreamCodec<RegistryFriendlyByteBuf, D>;
    getData(level: Level): D;
    isSyncable(): boolean;
    setData(level: Level, data: D): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.misc.ConcurrentStopwatch' {
  import { AutoCloseable } from 'java.lang';

  interface Timing extends AutoCloseable {}
  class Timing extends AutoCloseable {
    close(): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.misc.fake_level' {
  import { Level } from 'net.minecraft.world.level';
  import { Scoreboard } from 'net.minecraft.world.scores';
  import { ChunkSource, ChunkGenerator } from 'net.minecraft.world.level.chunk';
  import { MinecraftServer, ServerScoreboard } from 'net.minecraft.server';
  import { Player } from 'net.minecraft.world.entity.player';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';
  import { BlockPos, Holder, Direction, RegistryAccess } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Entity } from 'net.minecraft.world.entity';
  import { TickRateManager } from 'net.minecraft.world';
  import { MapItemSavedData, MapId } from 'net.minecraft.world.level.saveddata.maps';
  import { RecipeManager } from 'net.minecraft.world.item.crafting';
  import { LevelTickAccess } from 'net.minecraft.world.ticks';
  import { Block } from 'net.minecraft.world.level.block';
  import { Fluid, FluidState } from 'net.minecraft.world.level.material';
  import { GameEvent } from 'net.minecraft.world.level.gameevent';
  import { Vec3, AABB } from 'net.minecraft.world.phys';
  import { Context } from 'GameEvent';
  import { List } from 'java.util';
  import { PotionBrewing } from 'net.minecraft.world.item.alchemy';
  import { FeatureFlagSet } from 'net.minecraft.world.flag';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { BiFunction, Supplier, BooleanSupplier } from 'java.util.function';
  import { ServerLevel, ServerChunkCache } from 'net.minecraft.server.level';
  import { LevelStorageAccess } from 'LevelStorageSource';
  import { DataFixer } from 'com.mojang.datafixers';
  import { StructureTemplateManager } from 'net.minecraft.world.level.levelgen.structure.templatesystem';
  import { Executor } from 'java.util.concurrent';
  import { ChunkProgressListener } from 'net.minecraft.server.level.progress';
  import { ChunkStatusUpdateListener, PersistentEntitySectionManager, LevelCallback, EntityPersistentStorage, EntityAccess } from 'net.minecraft.world.level.entity';
  import { DimensionDataStorage } from 'net.minecraft.world.level.storage';
  import { Class, Iterable } from 'java.lang';
  import { VoxelShape } from 'net.minecraft.world.phys.shapes';
  import { ProgressListener } from 'net.minecraft.util';
  import { TagKey } from 'net.minecraft.tags';
  import { Structure } from 'net.minecraft.world.level.levelgen.structure';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';

  interface FakeLevel extends Level {}
  class FakeLevel extends Level {
    destroyBlockProgress(entityId: number, pos: BlockPos, progress: number): void;
    enabledFeatures(): FeatureFlagSet;
    gameEvent(gameEvent: Holder<GameEvent>, pos: Vec3, context: Context): void;
    gatherChunkSourceStats(): string;
    get blockTicks(): LevelTickAccess<Block>;
    get chunkSource(): ChunkSource;
    get fluidTicks(): LevelTickAccess<Fluid>;
    get freeMapId(): MapId;
    get recipeManager(): RecipeManager;
    get scoreboard(): Scoreboard;
    get server(): MinecraftServer;
    getEntity(id: number): Entity;
    getMapData(mapId: MapId): MapItemSavedData;
    getShade(direction: Direction, shaded: boolean): number;
    getUncachedNoiseBiome(x: number, y: number, z: number): Holder<Biome>;
    levelEvent(player: Player, eventId: number, pos: BlockPos, data: number): void;
    playSeededSound(player: Player, d: number, e: number, f: number, holder: Holder<SoundEvent>, soundSource: SoundSource, g: number, h: number, l: number): void;
    playSeededSound(player: Player, x: number, y: number, z: number, soundEvent: SoundEvent, soundSource: SoundSource, p_220369_: number, p_220370_: number, p_220371_: number): void;
    playSeededSound(player: Player, entity: Entity, holder: Holder<SoundEvent>, soundSource: SoundSource, f: number, g: number, l: number): void;
    playSound(player: Player, x: number, y: number, z: number, sound: SoundEvent, category: SoundSource, volume: number, pitch: number): void;
    playSound(player: Player, entity: Entity, sound: SoundEvent, category: SoundSource, volume: number, pitch: number): void;
    players(): Player[];
    potionBrewing(): PotionBrewing;
    sendBlockUpdated(pos: BlockPos, oldState: BlockState, newState: BlockState, flags: number): void;
    setMapData(mapId: MapId, mapData: MapItemSavedData): void;
    tickRateManager(): TickRateManager;
  }


  class FakeLevelManager {
    static get(id: string, original: Level, clientConstr: BiFunction<string, RegistryAccess, FakeLevel>, serverConstr: BiFunction<string, ServerLevel, FakeServerLevel>): Level;
    static getClient<T extends FakeLevel>(id: string, original: Level, constructor: BiFunction<string, RegistryAccess, FakeLevel>): T;
    static getDefault(original: Level): Level;
    static getDefaultClient(original: Level): FakeLevel;
    static getDefaultServer(original: ServerLevel): FakeServerLevel;
    static getServer<T extends FakeServerLevel>(id: string, original: ServerLevel, constructor: BiFunction<string, ServerLevel, FakeServerLevel>): T;
    static invalidate(level: Level): boolean;
    static invalidate(name: string): void;
    static invalidateAll(): void;
  }


  interface FakeServerLevel extends ServerLevel {}
  class FakeServerLevel extends ServerLevel {
    constructor(name: string, original: ServerLevel);
    static createDummyChunkCache(level: ServerLevel, levelStorageAccess: LevelStorageAccess, fixerUpper: DataFixer, structureManager: StructureTemplateManager, dispatcher: Executor, generator: ChunkGenerator, viewDistance: number, simulationDistance: number, sync: boolean, progressListener: ChunkProgressListener, chunkStatusListener: ChunkStatusUpdateListener, dataStorage: Supplier<DimensionDataStorage>): ServerChunkCache;
    static createDummyEntityManager<A extends EntityAccess>(entityClass: Class<A>, callbacks: LevelCallback, permanentStorage: EntityPersistentStorage): PersistentEntitySectionManager<A>;
    destroyBlockProgress(breakerId: number, pos: BlockPos, progress: number): void;
    findNearestMapStructure(structureTag: TagKey<Structure>, pos: BlockPos, radius: number, skipExistingChunks: boolean): BlockPos;
    gameEvent(gameEvent: Holder<GameEvent>, pos: BlockPos, context: Context): void;
    get scoreboard(): ServerScoreboard;
    get sharedSpawnAngle(): number;
    get sharedSpawnPos(): BlockPos;
    getBlockCollisions(entity: Entity, collisionBox: AABB): Iterable<VoxelShape>;
    getBlockEntity(pos: BlockPos): BlockEntity;
    getBlockState(pos: BlockPos): BlockState;
    getEntity(id: number): Entity;
    getEntityCollisions(entity: Entity, collisionBox: AABB): VoxelShape[];
    getFluidState(pos: BlockPos): FluidState;
    getMapData(mapId: MapId): MapItemSavedData;
    globalLevelEvent(id: number, pos: BlockPos, data: number): void;
    levelEvent(player: Player, type: number, pos: BlockPos, data: number): void;
    noCollision(entity: Entity): boolean;
    playSeededSound(player: Player, entity: Entity, sound: Holder<SoundEvent>, category: SoundSource, volume: number, pitch: number, seed: number): void;
    playSeededSound(player: Player, x: number, y: number, z: number, sound: SoundEvent, source: SoundSource, volume: number, pitch: number, seed: number): void;
    playSeededSound(player: Player, x: number, y: number, z: number, sound: Holder<SoundEvent>, source: SoundSource, volume: number, pitch: number, seed: number): void;
    playSound(player: Player, x: number, y: number, z: number, soundIn: SoundEvent, category: SoundSource, volume: number, pitch: number): void;
    playSound(player: Player, entity: Entity, soundEvent: SoundEvent, category: SoundSource, volume: number, pitch: number): void;
    save(progress: ProgressListener, flush: boolean, skipSave: boolean): void;
    setBlock(pos: BlockPos, state: BlockState, flags: number, recursionLeft: number): boolean;
    setBlockEntity(blockEntity: BlockEntity): void;
    setChunkForced(chunkX: number, chunkZ: number, add: boolean): boolean;
    setDefaultSpawnPos(pos: BlockPos, angle: number): void;
    setMapData(mapId: MapId, mapData: MapItemSavedData): void;
    tick(hasTimeLeft: BooleanSupplier): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.misc.fake_level.FakeLevel' {
  import { LevelEntityGetter, EntityTypeTest } from 'net.minecraft.world.level.entity';
  import { UUID } from 'java.util';
  import { Iterable } from 'java.lang';
  import { AbortableIterationConsumer } from 'net.minecraft.util';
  import { AABB } from 'net.minecraft.world.phys';
  import { Consumer } from 'java.util.function';

  interface DummyLevelEntityGetter<T extends EntityAccess = any> extends LevelEntityGetter<T> {}
  class DummyLevelEntityGetter<T extends EntityAccess = any> extends LevelEntityGetter<T> {
    get(id: number): T;
    get(pUuid: UUID): T;
    get<U extends T>(tuEntityTypeTest: EntityTypeTest<T, U>, uAbortableIterationConsumer: AbortableIterationConsumer<U>): void;
    get(boundingBox: AABB, tConsumer: Consumer<T>): void;
    get<U extends T>(tuEntityTypeTest: EntityTypeTest<T, U>, bounds: AABB, uAbortableIterationConsumer: AbortableIterationConsumer<U>): void;
    get all(): Iterable<T>;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.misc.fake_level.FakeLevelManager' {
  import { Level } from 'net.minecraft.world.level';

  class ILevelLike {
    cast(): Level;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.misc.fake_level.FakeServerLevel' {
  import { ServerLevelData } from 'net.minecraft.world.level.storage';
  import { UUID } from 'java.util';
  import { GameType, GameRules, ChunkPos } from 'net.minecraft.world.level';
  import { Settings } from 'WorldBorder';
  import { TimerQueue } from 'net.minecraft.world.level.timers';
  import { MinecraftServer } from 'net.minecraft.server';
  import { BlockPos } from 'net.minecraft.core';
  import { Difficulty } from 'net.minecraft.world';
  import { ChunkProgressListener } from 'net.minecraft.server.level.progress';
  import { ChunkStatus } from 'net.minecraft.world.level.chunk.status';

  interface ReadOlyServerLevelData extends ServerLevelData {}
  class ReadOlyServerLevelData extends ServerLevelData {
    readonly name: string;
    readonly wrapped: ServerLevelData;
    constructor(name: string, wrapped: ServerLevelData);
    get clearWeatherTime(): number;
    get dayTime(): number;
    get difficulty(): Difficulty;
    get gameRules(): GameRules;
    get gameTime(): number;
    get gameType(): GameType;
    get levelName(): string;
    get rainTime(): number;
    get scheduledEvents(): TimerQueue<MinecraftServer>;
    get spawnAngle(): number;
    get spawnPos(): BlockPos;
    get thunderTime(): number;
    get wanderingTraderId(): UUID;
    get wanderingTraderSpawnChance(): number;
    get wanderingTraderSpawnDelay(): number;
    get worldBorder(): Settings;
    isAllowCommands(): boolean;
    isDifficultyLocked(): boolean;
    isHardcore(): boolean;
    isInitialized(): boolean;
    isRaining(): boolean;
    isThundering(): boolean;
    set clearWeatherTime(time: number);
    set dayTime(time: number);
    set gameTime(time: number);
    set gameType(type: GameType);
    set rainTime(time: number);
    set thunderTime(time: number);
    set wanderingTraderId(id: UUID);
    set wanderingTraderSpawnChance(chance: number);
    set wanderingTraderSpawnDelay(delay: number);
    set worldBorder(serializer: Settings);
    setInitialized(initialized: boolean): void;
    setRaining(raining: boolean): void;
    setSpawn(spawnPoint: BlockPos, spawnAngle: number): void;
    setThundering(thundering: boolean): void;
  }


  interface DummyProgressListener extends ChunkProgressListener {}
  class DummyProgressListener extends ChunkProgressListener {
    onStatusChange(chunkPos: ChunkPos, chunkStatus: ChunkStatus): void;
    start(): void;
    stop(): void;
    updateSpawnPos(center: ChunkPos): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.misc.HolderRef' {
  import { OptHolderRef } from 'net.mehvahdjukaar.moonlight.api.misc';

  interface Opt<T = any> extends OptHolderRef<T> {}
  class Opt<T = any> extends OptHolderRef<T> {
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.misc.InvPlacer' {
  import { InvPlacer, SlotProvider } from 'net.mehvahdjukaar.moonlight.api.misc';
  import { Predicate } from 'java.util.function';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Stage } from 'net.mehvahdjukaar.moonlight.api.misc.InvPlacer.ExclusivePlacer';
  import { Inventory, Player } from 'net.minecraft.world.entity.player';

  interface ExclusivePlacer extends InvPlacer {}
  class ExclusivePlacer extends InvPlacer {
    place(stack: ItemStack, inventory: Inventory, player: Player): boolean;
    stage(provider: SlotProvider, predicate: Predicate<ItemStack>): ExclusivePlacer;
    stage(provider: SlotProvider): ExclusivePlacer;
    stage(stage: Stage): ExclusivePlacer;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.misc.InvPlacer.ExclusivePlacer' {
  import { SlotProvider } from 'net.mehvahdjukaar.moonlight.api.misc';
  import { Predicate } from 'java.util.function';
  import { ItemStack } from 'net.minecraft.world.item';

  class Stage {
    predicate(): Predicate<ItemStack>;
    slotProvider(): SlotProvider;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.misc.IProgressTracker' {
  import { IProgressTracker } from 'net.mehvahdjukaar.moonlight.api.misc';

  interface Tree extends Task {}
  class Tree extends Task {
    constructor(totalSteps: number);
    countLeaves(): number;
    get progress(): number;
    step(): void;
    subtask(totalSteps: number): Task;
  }


  interface Task extends IProgressTracker {}
  class Task extends IProgressTracker {
    step(): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.misc.SlotProvider' {
  import { ItemStack } from 'net.minecraft.world.item';
  import { Inventory, Player } from 'net.minecraft.world.entity.player';

  class Slot {
    add(var1: ItemStack, var2: Inventory, var3: Player): boolean;
    get stack(): ItemStack;
    static invSlot(inv: Inventory, slot: number): Slot;
    static offHandSlot(inv: Inventory, offHandSlot: number): Slot;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.misc.WorldSavedDataType' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Scope extends Enum<Scope> {}
  class Scope extends Enum<Scope> {
    static readonly SINGLE_OVERWORLD: Scope;
    static readonly PER_LEVEL: Scope;
    static valueOf(name: string): Scope;
    static values(): Scope[];
  }

}

declare module 'net.mehvahdjukaar.moonlight.api' {
  import { Supplier, Function } from 'java.util.function';
  import { Double, Boolean } from 'java.lang';
  import { Registry } from 'net.minecraft.core';
  import { TagKey } from 'net.minecraft.tags';

  class ModSharedVariables {
    static getBool(name: string): boolean;
    static getDouble(name: string): number;
    static getString(name: string): string;
    static invokeFunction(name: string): any;
    static registerBool(name: string, supp: Supplier<boolean>): void;
    static registerDouble(name: string, supp: Supplier<number>): void;
    static registerFunction(name: string, supp: Function<any, any>): void;
    static registerString(name: string, supp: Supplier<string>): void;
  }


  class MoonlightRegistry {
    static readonly VILLAGER_TRADES_REGISTRY: Registry;
    static readonly WORLD_SAVED_DATA_TYPE_REGISTRY: Registry;
    static readonly CAVE_MODIFIER: Supplier;
    static readonly HEIGHT_RANGE: Supplier;
    static readonly BLOCK_PLACER: Supplier;
    static readonly LAZY_ITEM: Supplier;
    static readonly CONFIG_ITEM: Supplier;
    static readonly LAZY_PROPERTY: Supplier;
    static readonly GRIND_TRIGGER: Supplier;
    static readonly ICONDITION_LOOT_CONDITION: Supplier;
    static readonly RESOURCE_CONDITION_LOOT_ITEM_CONDITION: Supplier;
    static readonly PATTERN_MATCH_CONDITION: Supplier;
    static readonly SPAWN_BOX_BLOCK: Supplier;
    static readonly STRUCTURE_BLOCK: Supplier;
    static readonly SPAWN_BOX_BLOCK_ENTITY: Supplier;
    static readonly SPAWN_BOX_PIECE: Supplier;
    static readonly SPAWN_BOX_POOL_ELEMENT: Supplier;
    static readonly BOTTLE_TYPE: Supplier;
    static readonly CUSTOM_MAP_DECORATIONS: Supplier;
    static readonly CUSTOM_VILLAGER_SCHEDULE: Supplier;
    static init(): void;
  }


  class MoonlightTags {
    static readonly SHEARABLE_TAG: TagKey;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.platform.configs' {
  import { Enum } from 'java.lang';
  import { List, Collection } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Component } from 'net.minecraft.network.chat';
  import { Path } from 'java.nio.file';
  import { InputStream } from 'java.io';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ServerPlayer } from 'net.minecraft.server.level';

  interface ConfigType extends Enum<ConfigType> {}
  class ConfigType extends Enum<ConfigType> {
    static readonly COMMON: ConfigType;
    static readonly COMMON_SYNCED: ConfigType;
    static readonly CLIENT: ConfigType;
    get defaultName(): string;
    isSynced(): boolean;
    static valueOf(name: string): ConfigType;
    static values(): ConfigType[];
  }


  class ModConfigHolder {
    static addTrackedSpec(spec: ModConfigHolder): void;
    forceLoad(): void;
    get configType(): ConfigType;
    get fileName(): string;
    get fullPath(): Path;
    get id(): ResourceLocation;
    get modId(): string;
    get readableName(): Component;
    static get trackedSpecs(): Collection<ModConfigHolder>;
    static getConfigSpec(configId: ResourceLocation): ModConfigHolder;
    hasConfigScreen(): boolean;
    isLoaded(): boolean;
    isSynced(): boolean;
    loadFromBytes(var1: InputStream, var2: boolean): void;
    makeScreen(parent: Screen): Screen;
    makeScreen(var1: Screen, var2: ResourceLocation): Screen;
    sendChangedConfigToServer(): void;
    sendSyncedConfigsToAllPlayers(): void;
    syncConfigsToPlayer(player: ServerPlayer): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.platform.configs.ModConfigHolder' {
  import { RuntimeException, Exception } from 'java.lang';
  import { ModConfigHolder } from 'net.mehvahdjukaar.moonlight.api.platform.configs';

  interface ConfigLoadingException extends RuntimeException {}
  class ConfigLoadingException extends RuntimeException {
    constructor(config: ModConfigHolder, cause: Exception);
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.platform.configs.neoforge.ConfigBuilderImpl' {
  import { Supplier } from 'java.util.function';

  interface ValueWrapper<T = any, C = any> extends Supplier<T> {}
  class ValueWrapper<T = any, C = any> extends Supplier<T> {
    clearCache(): void;
    get (): T;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.platform.configs.neoforge' {
  import { ModConfigHolder } from 'net.mehvahdjukaar.moonlight.api.platform.configs';
  import { ModConfig } from 'net.neoforged.fml.config';
  import { Path } from 'java.nio.file';
  import { ModConfigSpec } from 'net.neoforged.neoforge.common';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { PlayerLoggedOutEvent } from 'PlayerEvent';
  import { ModConfigEvent } from 'net.neoforged.fml.event.config';
  import { InputStream } from 'java.io';

  interface ForgeConfigHolder extends ModConfigHolder {}
  class ForgeConfigHolder extends ModConfigHolder {
    acceptEditableConfigs(modConfig: ModConfig, bytes: number[]): void;
    forceLoad(): void;
    get fullPath(): Path;
    get modConfig(): ModConfig;
    get spec(): ModConfigSpec;
    static getFromForgeConfig(config: ModConfig): ForgeConfigHolder;
    hasConfigScreen(): boolean;
    isLoaded(): boolean;
    loadFromBytes(stream: InputStream, readOnly: boolean): void;
    makeScreen(parent: Screen, background: ResourceLocation): Screen;
    makeScreen(parent: Screen): Screen;
    onConfigChange(event: ModConfigEvent): void;
    onPlayerLoggedOut(event: PlayerLoggedOutEvent): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.platform.network' {
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { TypeAndCodec } from 'CustomPacketPayload';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { StreamDecoder } from 'net.minecraft.network.codec';
  import { Context } from 'net.mehvahdjukaar.moonlight.api.platform.network.Message';

  interface Message extends CustomPacketPayload {}
  class Message extends CustomPacketPayload {
    handle(var1: Context): void;
    static makeType<T extends Message>(id: ResourceLocation, decoder: StreamDecoder<RegistryFriendlyByteBuf, T>): TypeAndCodec<RegistryFriendlyByteBuf, T>;
    write(var1: RegistryFriendlyByteBuf): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.platform.network.Message' {
  import { Player } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class Context {
    disconnect(var1: Component): void;
    get direction(): NetworkDir;
    get player(): Player;
    reply(var1: CustomPacketPayload): void;
  }


  interface NetworkDir extends Enum<NetworkDir> {}
  class NetworkDir extends Enum<NetworkDir> {
    static readonly SERVER_BOUND: NetworkDir;
    static readonly CLIENT_BOUND: NetworkDir;
    get opposite(): NetworkDir;
    static valueOf(name: string): NetworkDir;
    static values(): NetworkDir[];
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.resources.assets' {
  import { Block } from 'net.minecraft.world.level.block';
  import { Registry } from 'net.minecraft.core';
  import { Item } from 'net.minecraft.world.item';
  import { EntityType } from 'net.minecraft.world.entity';
  import { JsonElement } from 'com.google.gson';
  import { Map } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { AfterLanguageLoadEvent } from 'net.mehvahdjukaar.moonlight.api.events';
  import { BlockType } from 'net.mehvahdjukaar.moonlight.api.set';
  import { ResourceLocation } from 'net.minecraft.resources';

  class LangBuilder {
    static addDynamicEntry(lang: AfterLanguageLoadEvent, key: string, type: BlockType, item: Item): void;
    static addDynamicEntry(lang: AfterLanguageLoadEvent, key: string, type: BlockType, block: Block): void;
    static addDynamicEntry(lang: AfterLanguageLoadEvent, key: string, type: BlockType, entityType: EntityType<any>): void;
    addEntry(block: Block, translation: string): void;
    addEntry<T>(reg: Registry<T>, entry: T, translation: string): void;
    addEntry(item: Item, translation: string): void;
    addEntry(entityType: EntityType<any>, translation: string): void;
    addGenericEntry(key: string, translation: string): void;
    addSimpleEntry<T>(reg: Registry<T>, entry: T): void;
    build(): JsonElement;
    entries(): Map<string, string>;
    static getReadableComponent(key: string, ...arguments: string[]): Component;
    static getReadableName(name: string): string;
  }


  class SimpleModelBuilder {
    constructor(parent: ResourceLocation);
    build(): JsonElement;
    texture(name: string, texture: ResourceLocation): SimpleModelBuilder;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.resources' {
  import { ResourceManager, Resource } from 'net.minecraft.server.packs.resources';
  import { BlockType } from 'net.mehvahdjukaar.moonlight.api.set';
  import { WoodType } from 'net.mehvahdjukaar.moonlight.api.set.wood';
  import { LeavesType } from 'net.mehvahdjukaar.moonlight.api.set.leaves';
  import { TextModification } from 'net.mehvahdjukaar.moonlight.api.resources.BlockTypeResTransformer';
  import { Predicate, Function, BiFunction, UnaryOperator, Consumer } from 'java.util.function';
  import { ItemLike } from 'net.minecraft.world.level';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { Recipe, RecipeHolder, Ingredient } from 'net.minecraft.world.item.crafting';
  import { Class, Enum } from 'java.lang';
  import { RecipeFactory } from 'net.mehvahdjukaar.moonlight.api.resources.RecipeTemplate';
  import { TriFunction } from 'net.mehvahdjukaar.moonlight.api.misc';
  import { List, Set, Collection } from 'java.util';
  import { NonNullList } from 'net.minecraft.core';
  import { TagKey, TagBuilder, TagEntry } from 'net.minecraft.tags';
  import { JsonElement, JsonObject } from 'com.google.gson';
  import { InputStream } from 'java.io';
  import { Block } from 'net.minecraft.world.level.block';
  import { Path } from 'java.nio.file';
  import { PackType } from 'net.minecraft.server.packs';
  import { DynamicTexturePack, ResourceSink } from 'net.mehvahdjukaar.moonlight.api.resources.pack';
  import { OverrideAppender } from 'net.mehvahdjukaar.moonlight.api.resources.RPUtils';

  class BlockTypeResTransformer<T extends BlockType = any> {
    IDReplaceBlock(blockName: string): BlockTypeResTransformer<T>;
    IDReplaceType(oldTypeName: string): BlockTypeResTransformer<T>;
    addModifier(modifier: TextModification<T>): BlockTypeResTransformer<T>;
    andThen(other: BlockTypeResTransformer<T>): BlockTypeResTransformer<T>;
    static create<T extends BlockType>(modId: string, manager: ResourceManager): BlockTypeResTransformer<T>;
    static leaves(modId: string, manager: ResourceManager): BlockTypeResTransformer<LeavesType>;
    replaceBlockType(oldTypeName: string): BlockTypeResTransformer<T>;
    static replaceFullGenericType(text: string, newBlockType: BlockType, newBlockId: ResourceLocation, oldTypeName: string, oldTypeNamespace: string, folderDepth: number): string;
    static replaceFullGenericType(text: string, blockType: BlockType, blockId: ResourceLocation, oldTypeName: string, oldNamespace: string, folderName: string): string;
    replaceGenericType(oldTypeName: string, entryClass: string): BlockTypeResTransformer<T>;
    replaceItemType(oldTypeName: string): BlockTypeResTransformer<T>;
    replaceSimpleType(oldTypeName: string): BlockTypeResTransformer<T>;
    replaceString(from: string, to: string): BlockTypeResTransformer<T>;
    static replaceType(text: string, blockType: BlockType, blockId: ResourceLocation, oldTypeName: string, oldNamespace: string): string;
    static replaceTypeNoNamespace(text: string, blockType: BlockType, blockId: ResourceLocation, oldTypeName: string): string;
    replaceWithTextureFromChild(target: string, textureFromChild: string, s: string): BlockTypeResTransformer<T>;
    replaceWithTextureFromChild(target: string, textureFromChild: string, texturePredicate: Predicate<string>, w: T): BlockTypeResTransformer<T>;
    replaceWithTextureFromChild(target: string, childProvider: Function<T, ItemLike>, texturePredicate: Predicate<string>): BlockTypeResTransformer<T>;
    setIDModifier(modifier: TextModification<T>): BlockTypeResTransformer<T>;
    transform(resource: StaticResource, blockId: ResourceLocation, type: T): StaticResource;
    static wood(modId: string, manager: ResourceManager): BlockTypeResTransformer<WoodType>;
  }


  class RecipeConverter {
    static createSimilar<T extends BlockType, R extends Recipe<any>>(recipe: R, originalMat: T, destinationMat: T, unlockItem: Item, id: string): R;
  }


  class RecipeTemplate {
    static convertIngredients<R extends Recipe<any>>(or: NonNullList<Ingredient>, typeChanger: UnaryOperator<ItemStack>): Ingredient[];
    static convertIngredients<R extends Recipe<any>>(or: NonNullList<Ingredient>, from: BlockType, to: BlockType, recipe: R, oldType: BlockType, newType: BlockType): Ingredient[];
    static convertItemStack<T extends BlockType>(original: ItemStack, from: T, to: T): ItemStack;
    static makeSimilarRecipe<T extends BlockType, R extends Recipe<any>>(original: R, originalMat: T, destinationMat: T, baseID: string): RecipeHolder<any>;
    static makeSimilarRecipe<T extends BlockType, R extends Recipe<any>>(original: R, originalMat: T, destinationMat: T, baseID: ResourceLocation): RecipeHolder<any>;
    static register<R extends Recipe<any>>(type: Class<R>, factory: BiFunction<R, UnaryOperator<ItemStack>, R>): void;
    static register<R extends Recipe<any>>(type: Class<R>, factory: TriFunction<R, BlockType, BlockType, R>): void;
    static registerSimple<R extends Recipe<any>>(type: Class<R>, factory: RecipeFactory<R>, r: R, f: BlockType, t: BlockType): void;
  }


  interface ResType extends Enum<ResType> {}
  class ResType extends Enum<ResType> {
    static readonly GENERIC: ResType;
    static readonly TAGS: ResType;
    static readonly LOOT_TABLES: ResType;
    static readonly BLOCK_LOOT_TABLES: ResType;
    static readonly RECIPES: ResType;
    static readonly ENCHANTMENTS: ResType;
    static readonly ADVANCEMENTS: ResType;
    static readonly CONFIGURED_FEATURES: ResType;
    static readonly STRUCTURE: ResType;
    static readonly STRUCTURE_SET: ResType;
    static readonly TEMPLATE_POOL: ResType;
    static readonly LANG: ResType;
    static readonly TEXTURES: ResType;
    static readonly BLOCK_TEXTURES: ResType;
    static readonly ITEM_TEXTURES: ResType;
    static readonly ENTITY_TEXTURES: ResType;
    static readonly PARTICLE_TEXTURES: ResType;
    static readonly MCMETA: ResType;
    static readonly BLOCK_MCMETA: ResType;
    static readonly ITEM_MCMETA: ResType;
    static readonly MODELS: ResType;
    static readonly BLOCK_MODELS: ResType;
    static readonly ITEM_MODELS: ResType;
    static readonly BLOCKSTATES: ResType;
    static readonly PARTICLES: ResType;
    static readonly MOB_EFFECT_TEXTURES: ResType;
    static readonly JSON: ResType;
    static readonly PNG: ResType;
    getPath(relativeLocation: ResourceLocation): ResourceLocation;
    getPath(relativeLocation: string): ResourceLocation;
    static getTagPath(tag: TagKey<any>): ResourceLocation;
    static valueOf(name: string): ResType;
    static values(): ResType[];
  }


  class RPUtils {
    static appendModelOverride(manager: ResourceManager, pack: DynamicTexturePack, modelRes: ResourceLocation, modelConsumer: Consumer<OverrideAppender>): void;
    static appendModelOverride(manager: ResourceManager, pack: ResourceSink, modelRes: ResourceLocation, modelConsumer: Consumer<OverrideAppender>): void;
    static deserializeJson(stream: InputStream): JsonObject;
    static findAllResourcesInJsonRecursive(element: JsonElement): Set<string>;
    static findAllResourcesInJsonRecursive(element: JsonElement, filter: Predicate<string>): Set<string>;
    static findFirstBlockTextureLocation(manager: ResourceManager, block: Block): ResourceLocation;
    static findFirstBlockTextureLocation(manager: ResourceManager, block: Block, texturePredicate: Predicate<string>): ResourceLocation;
    static findFirstItemTextureLocation(manager: ResourceManager, block: Item): ResourceLocation;
    static findFirstItemTextureLocation(manager: ResourceManager, item: Item, texturePredicate: Predicate<string>): ResourceLocation;
    static findFirstResourceInJsonRecursive(element: JsonElement): string;
    static getResourcePath(path: Path, k: ResourceLocation, packType: PackType): Path;
    static makeModelOverride(manager: ResourceManager, modelRes: ResourceLocation, modelConsumer: Consumer<OverrideAppender>): JsonElement;
    static makeSimilarRecipe<T extends BlockType>(original: Recipe<any>, originalMat: T, destinationMat: T, baseID: string): RecipeHolder<any>;
    static makeSimilarRecipe<T extends BlockType>(original: Recipe<any>, originalMat: T, destinationMat: T, baseID: ResourceLocation): RecipeHolder<any>;
    static readRecipe(manager: ResourceManager, location: string): Recipe<any>;
    static readRecipe(manager: ResourceManager, location: ResourceLocation): Recipe<any>;
    static readRecipe(element: JsonElement): Recipe<any>;
    static serializeJson(json: JsonElement): string;
    static writeRecipe<T extends Recipe<any>>(recipe: T): JsonElement;
    static writeResource(id: ResourceLocation, bytes: number[], path: Path, packType: PackType): void;
  }


  interface SimpleTagBuilder extends TagBuilder {}
  class SimpleTagBuilder extends TagBuilder {
    add(entry: TagEntry): TagBuilder;
    add(str: string): SimpleTagBuilder;
    add(entry: ResourceLocation): SimpleTagBuilder;
    addAll(entries: Collection<TagEntry>): SimpleTagBuilder;
    addEntries(entries: Collection<any>): SimpleTagBuilder;
    addEntry(entry: any): SimpleTagBuilder;
    addFromJson(oldTag: JsonObject): void;
    addOptional(elementLocation: ResourceLocation): TagBuilder;
    addOptionalTag(pId: ResourceLocation): SimpleTagBuilder;
    addTag(pId: ResourceLocation): SimpleTagBuilder;
    addTag(tagKey: TagKey<any>): SimpleTagBuilder;
    addTag(otherBuilder: SimpleTagBuilder): SimpleTagBuilder;
    get id(): ResourceLocation;
    get tagString(): string;
    merge(otherBuilder: SimpleTagBuilder): void;
    static of(location: ResourceLocation): SimpleTagBuilder;
    static of(key: TagKey<any>): SimpleTagBuilder;
    serializeToJson(): JsonElement;
  }


  class StaticResource {
    readonly data: number[];
    readonly location: ResourceLocation;
    readonly sourceName: string;
    asString(): string;
    static create(data: number[], location: ResourceLocation): StaticResource;
    static getOrFail(manager: ResourceManager, location: ResourceLocation): StaticResource;
    static getOrLog(manager: ResourceManager, location: ResourceLocation): StaticResource;
    static getOrThrow(manager: ResourceManager, location: ResourceLocation): StaticResource;
    static of(original: Resource, location: ResourceLocation): StaticResource;
    toJson(): JsonObject;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.resources.BlockTypeResTransformer' {
  import { TriFunction } from 'net.mehvahdjukaar.moonlight.api.misc';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface TextModification<T extends BlockType = any> extends TriFunction<string, ResourceLocation, T, string> {}
  class TextModification<T extends BlockType = any> extends TriFunction<string, ResourceLocation, T, string> {
    apply(var1: string, var2: ResourceLocation, var3: T): string;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.resources.pack' {
  import { PackResources, PackLocationInfo, PackType, PackSelectionConfig, AbstractPackResources } from 'net.minecraft.server.packs';
  import { Path } from 'java.nio.file';
  import { Component } from 'net.minecraft.network.chat';
  import { Set, Map, Collection } from 'java.util';
  import { ResourceOutput } from 'PackResources';
  import { IoSupplier, ResourceManager } from 'net.minecraft.server.packs.resources';
  import { InputStream, FileNotFoundException } from 'java.io';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { MetadataSectionSerializer } from 'net.minecraft.server.packs.metadata';
  import { Executor } from 'java.util.concurrent';
  import { Position, Metadata } from 'Pack';
  import { StaticResource, ResType, SimpleTagBuilder } from 'net.mehvahdjukaar.moonlight.api.resources';
  import { JsonElement } from 'com.google.gson';
  import { Block } from 'net.minecraft.world.level.block';
  import { Builder } from 'LootTable';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';
  import { RecipeHolder, Recipe } from 'net.minecraft.world.item.crafting';
  import { TextureImage } from 'net.mehvahdjukaar.moonlight.api.resources.textures';
  import { LangBuilder } from 'net.mehvahdjukaar.moonlight.api.resources.assets';
  import { IProgressTracker, ThrowingSupplier } from 'net.mehvahdjukaar.moonlight.api.misc';
  import { Pack } from 'net.minecraft.server.packs.repository';
  import { AfterLanguageLoadEvent, EarlyPackReloadEvent } from 'net.mehvahdjukaar.moonlight.api.events';
  import { Supplier, Consumer, Function, BiConsumer } from 'java.util.function';
  import { Logger } from 'org.apache.logging.log4j';
  import { Registry } from 'net.minecraft.core';
  import { BlockType } from 'net.mehvahdjukaar.moonlight.api.set';
  import { OverrideAppender } from 'net.mehvahdjukaar.moonlight.api.resources.RPUtils';
  import { Enchantment } from 'net.minecraft.world.item.enchantment';
  import { Item } from 'net.minecraft.world.item';

  interface AbstractCachedEditableResources extends PackResources, IEditablePackResources {}
  class AbstractCachedEditableResources extends PackResources {
    constructor(path: Path, locationInfo: PackLocationInfo, packType: PackType, description: Component);
    addNamespaces(...namespaces: string[]): void;
    addRootResource(name: string, resource: number[]): void;
    close(): void;
    getMetadataSection<T>(serializer: MetadataSectionSerializer<T>): T;
    getNamespaces(type: PackType): Set<string>;
    getResource(packType: PackType, location: ResourceLocation): IoSupplier<InputStream>;
    getRootResource(...strings: string[]): IoSupplier<InputStream>;
    listResources(packType: PackType, namespace: string, path: string, resourceOutput: ResourceOutput): void;
    location(): PackLocationInfo;
  }


  interface CachePathPackResources extends AbstractCachedEditableResources {}
  class CachePathPackResources extends AbstractCachedEditableResources {
    constructor(location: PackLocationInfo, type: PackType, path: Path);
    addResource(id: ResourceLocation, bytes: number[]): void;
    clearAllResources(): boolean;
    commitChanges(): void;
    commitChanges(executor: Executor): void;
    get packType(): PackType;
    initializeIfValid(): boolean;
    isEmpty(): boolean;
    removeResource(id: ResourceLocation): void;
    removeRootResource(name: string): void;
  }


  interface CacheZipPackResources extends AbstractCachedEditableResources {}
  class CacheZipPackResources extends AbstractCachedEditableResources {
    constructor(location: PackLocationInfo, type: PackType, path: Path);
    addResource(id: ResourceLocation, bytes: number[]): void;
    clearAllResources(): boolean;
    commitChanges(): void;
    commitChanges(executor: Executor): void;
    get packType(): PackType;
    initializeIfValid(): boolean;
    isEmpty(): boolean;
    removeResource(id: ResourceLocation): void;
    removeRootResource(name: string): void;
    writeZipPreferStored(files: Map<ResourceLocation, number[]>, outputZip: Path): void;
  }


  interface DynamicClientResourceProvider extends DynamicResourcesProvider {}
  class DynamicClientResourceProvider extends DynamicResourcesProvider {
  }


  interface DynamicDataPack extends DynamicResourcePack {}
  class DynamicDataPack extends DynamicResourcePack {
    constructor(name: ResourceLocation, position: Position, fixed: boolean, hidden: boolean);

    constructor(name: ResourceLocation);
  }


  interface DynamicResourcePack extends InMemoryPackResources {}
  class DynamicResourcePack extends InMemoryPackResources {
    readonly mainNamespace: string;
    readonly resourcePackName: ResourceLocation;
    addAndCloseTexture(path: ResourceLocation, image: TextureImage): void;
    addAndCloseTexture(path: ResourceLocation, image: TextureImage, isOnAtlas: boolean): void;
    addBlockModel(modelLocation: ResourceLocation, model: JsonElement): void;
    addBlockState(modelLocation: ResourceLocation, model: JsonElement): void;
    addBytes(location: ResourceLocation, bytes: number[], resType: ResType): void;
    addItemModel(modelLocation: ResourceLocation, model: JsonElement): void;
    addJson(location: ResourceLocation, json: JsonElement, resType: ResType): void;
    addLang(langName: ResourceLocation, language: JsonElement): void;
    addLang(langName: ResourceLocation, builder: LangBuilder): void;
    addLootTable(block: Block, table: Builder): void;
    addLootTable(id: ResourceLocation, table: LootTable): void;
    addRecipe(holder: RecipeHolder<any>): void;
    addRecipe(recipe: Recipe<any>, id: ResourceLocation): void;
    addRecipeNoAdvancement(recipe: Recipe<any>, id: ResourceLocation): void;
    addResource(resource: StaticResource): void;
    addResource(id: ResourceLocation, bytes: number[]): void;
    addSimpleBlockLootTable(block: Block): void;
    addTag(builder: SimpleTagBuilder, type: ResourceKey<any>): void;
    clearAllContent(): void;
    clearNonStatic(): void;
    get title(): Component;
    id(): ResourceLocation;
    makeFileNotFoundException(path: string): FileNotFoundException;
    markNotClearable(texturePath: ResourceLocation): void;
    openFull(location: PackLocationInfo, metadata: Metadata): PackResources;
    openPrimary(location: PackLocationInfo): PackResources;
    registerPack(): void;
    removeResource(res: ResourceLocation): void;
    setClearOnReload(canBeCleared: boolean): void;
    setGenerateDebugResources(generateDebugResources: boolean): void;
    toString(): string;
    unMarkNotClearable(staticResources: ResourceLocation): void;
  }


  interface DynamicResourcesProvider extends SimplePackProvider {}
  class DynamicResourcesProvider extends SimplePackProvider {
    constructor(name: ResourceLocation, packType: PackType, generationPolicy: PackGenerationStrategy);
    addSupportedNamespaces(...namespace: string[]): void;
    canUseExternalResourcePacks(): boolean;
    createPack(): Pack;
    createSelectionConfig(): PackSelectionConfig;
    get locationInfo(): PackLocationInfo;
    get name(): ResourceLocation;
    get packResources(): IEditablePackResources;
    get packType(): PackType;
    needsToRegenerate(): boolean;
    openFull(location: PackLocationInfo, metadata: Metadata): PackResources;
    openPrimary(location: PackLocationInfo): PackResources;
    prepare(): void;
    reload(manager: ResourceManager, reporter: IProgressTracker): void;
    toString(): string;
  }


  interface DynamicServerResourceProvider extends DynamicResourcesProvider {}
  class DynamicServerResourceProvider extends DynamicResourcesProvider {
  }


  interface DynamicTexturePack extends DynamicResourcePack {}
  class DynamicTexturePack extends DynamicResourcePack {
    constructor(name: ResourceLocation, position: Position, fixed: boolean, hidden: boolean);

    constructor(name: ResourceLocation);
    registerPack(): void;
  }


  interface DynClientResourcesGenerator extends DynResourceGenerator<DynamicTexturePack> {}
  class DynClientResourcesGenerator extends DynResourceGenerator<DynamicTexturePack> {
    addDynamicTranslations(languageEvent: AfterLanguageLoadEvent): void;
    addTextureIfNotPresent(manager: ResourceManager, relativePath: string, textureSupplier: Supplier<TextureImage>): void;
    addTextureIfNotPresent(manager: ResourceManager, relativePath: string, textureSupplier: Supplier<TextureImage>, isOnAtlas: boolean): void;
    alreadyHasTextureAtLocation(manager: ResourceManager, res: ResourceLocation): boolean;
  }


  class DynResourceGenerator<T extends DynamicResourcePack = any> {
    readonly dynamicPack: T;
    addResourceIfNotPresent(manager: ResourceManager, resource: StaticResource): void;
    addSimilarJsonResource(manager: ResourceManager, resource: StaticResource, keyword: string, replaceWith: string): void;
    addSimilarJsonResource(manager: ResourceManager, resource: StaticResource, textTransform: Function<string, string>): void;
    addSimilarJsonResource(manager: ResourceManager, resource: StaticResource, textTransform: Function<string, string>, pathTransform: Function<string, string>): void;
    additionalNamespaces(): Collection<string>;
    alreadyHasAssetAtLocation(manager: ResourceManager, res: ResourceLocation, type: ResType): boolean;
    alreadyHasAssetAtLocation(manager: ResourceManager, res: ResourceLocation): boolean;
    generateDebugResources(): boolean;
    get logger(): Logger;
    get modId(): string;
    get pack(): T;
    onEarlyReload(event: EarlyPackReloadEvent, localReporter: IProgressTracker): void;
    regenerateDynamicAssets(manager: ResourceManager): void;
    regenerateDynamicAssets(executor: Consumer<ResourceGenTask>): void;
    register(): void;
    runsOnEveryReload(): boolean;
    shouldClearOnReload(): boolean;
  }


  interface DynServerResourcesGenerator extends DynResourceGenerator<DynamicDataPack> {}
  class DynServerResourcesGenerator extends DynResourceGenerator<DynamicDataPack> {
  }


  interface FastSearchFilePackResources extends AbstractPackResources {}
  class FastSearchFilePackResources extends AbstractPackResources {
    close(): void;
    getNamespaces(packType: PackType): Set<string>;
    getResource(packType: PackType, location: ResourceLocation): IoSupplier<InputStream>;
    getRootResource(...elements: string[]): IoSupplier<InputStream>;
    listResources(packType: PackType, namespace: string, path: string, output: ResourceOutput): void;
  }


  interface FastSearchPathPackResources extends AbstractPackResources {}
  class FastSearchPathPackResources extends AbstractPackResources {
    constructor(location: PackLocationInfo, root: Path, packType: PackType);
    close(): void;
    getNamespaces(packType: PackType): Set<string>;
    getResource(packType: PackType, location: ResourceLocation): IoSupplier<InputStream>;
    static getResource(location: ResourceLocation, path: Path): IoSupplier<InputStream>;
    getRootResource(...elements: string[]): IoSupplier<InputStream>;
    listResources(packType: PackType, namespace: string, path: string, output: ResourceOutput): void;
  }


  interface GlobalCachedStrategy extends PackGenerationStrategy {}
  class GlobalCachedStrategy extends PackGenerationStrategy {
    createPackResources(info: PackLocationInfo, type: PackType): IEditablePackResources;
    needsRegeneration(packType: PackType): boolean;
    static refreshState(packType: PackType, loadedPacks: Collection<PackResources>): void;
    toString(): string;
    static writeNewState(packType: PackType): void;
  }


  class IDebugDumpable {
    dumpToDisk(var1: Path): void;
  }


  interface IEditablePackResources extends PackResources {}
  class IEditablePackResources extends PackResources {
    addNamespaces(...var1: string[]): void;
    addResource(var1: ResourceLocation, var2: number[]): void;
    addRootResource(var1: string, var2: number[]): void;
    clearAllResources(): boolean;
    commitChanges(executor: Executor): void;
    commitChanges(): void;
    get packType(): PackType;
    initializeIfValid(): boolean;
    isEmpty(): boolean;
    removeResource(var1: ResourceLocation): void;
    removeRootResource(var1: string): void;
  }


  interface InMemoryPackResources extends IEditablePackResources, IDebugDumpable, AbstractPackResources {}
  class InMemoryPackResources extends IEditablePackResources {
    addNamespaces(...namespaces: string[]): void;
    addResource(id: ResourceLocation, bytes: number[]): void;
    addRootResource(name: string, resource: number[]): void;
    clearAllResources(): boolean;
    close(): void;
    dumpToDisk(path: Path): void;
    get packType(): PackType;
    getMetadataSection<T>(serializer: MetadataSectionSerializer<T>): T;
    getNamespaces(packType: PackType): Set<string>;
    getResource(type: PackType, id: ResourceLocation): IoSupplier<InputStream>;
    getRootResource(...strings: string[]): IoSupplier<InputStream>;
    isEmpty(): boolean;
    isHidden(): boolean;
    listResources(packType: PackType, namespace: string, id: string, output: ResourceOutput): void;
    removeResource(id: ResourceLocation): void;
    removeRootResource(name: string): void;
  }


  class PackGenerationStrategy {
    static readonly REGEN_ON_EVERY_RELOAD: PackGenerationStrategy;
    static readonly NO_OP: PackGenerationStrategy;
    static readonly CACHED: PackGenerationStrategy;
    static readonly CACHED_ZIPPED: PackGenerationStrategy;
    createPackResources(var1: PackLocationInfo, var2: PackType): IEditablePackResources;
    needsRegeneration(var1: PackType): boolean;
    static runOnce(): PackGenerationStrategy;
  }


  interface ResourceGenTask extends BiConsumer<ResourceManager, ResourceSink> {}
  class ResourceGenTask extends BiConsumer<ResourceManager, ResourceSink> {
    accept(var1: ResourceManager, var2: ResourceSink): void;
  }


  class ResourceSink {
    constructor(packNamespace: string, packId: string);
    static acceptSinks(pack: IEditablePackResources, sinks: Collection<ResourceSink>): void;
    addAndCloseTexture(path: ResourceLocation, image: TextureImage): void;
    addAndCloseTexture(path: ResourceLocation, image: TextureImage, isOnAtlas: boolean): void;
    addAndCloseTexture(path: ResourceLocation, image: Supplier<TextureImage>): void;
    addBlockModel(modelLocation: ResourceLocation, model: JsonElement): void;
    addBlockState(modelLocation: ResourceLocation, model: JsonElement): void;
    addBlockTypeSwapRecipe<T extends BlockType>(manager: ResourceManager, originalRecipeId: ResourceLocation, originalMat: T, destinationMat: T, baseID: ResourceLocation): void;
    addBytes(location: ResourceLocation, bytes: number[], resType: ResType): void;
    addItemModel(modelLocation: ResourceLocation, model: JsonElement): void;
    addJson(location: ResourceLocation, json: JsonElement, resType: ResType): void;
    addJsonUnlessPresent(manager: ResourceManager, path: ResourceLocation, jsonSupplier: ThrowingSupplier<JsonElement>): void;
    addLang(langName: ResourceLocation, language: JsonElement): void;
    addLang(langName: ResourceLocation, builder: LangBuilder): void;
    addLootTable(block: Block, table: Builder): void;
    addLootTable(id: ResourceLocation, table: LootTable): void;
    addRecipe(holder: RecipeHolder<any>): void;
    addRecipe(recipe: Recipe<any>, id: ResourceLocation): void;
    addRecipeNoAdvancement(recipe: Recipe<any>, id: ResourceLocation): void;
    addResource(resource: StaticResource): void;
    addResourceIfNotPresent(manager: ResourceManager, resource: StaticResource): void;
    addSimilarJsonResource(manager: ResourceManager, resource: StaticResource, keyword: string, replaceWith: string): void;
    addSimilarJsonResource(manager: ResourceManager, resource: StaticResource, textTransform: Function<string, string>): void;
    addSimilarJsonResource(manager: ResourceManager, resource: StaticResource, textTransform: Function<string, string>, pathTransform: Function<string, string>): void;
    addSimpleBlockLootTable(block: Block): void;
    addTag(builder: SimpleTagBuilder, reg: ResourceKey<Registry<any>>): void;
    addTexture(path: ResourceLocation, image: TextureImage, onAtlas: boolean): void;
    addTexture(path: ResourceLocation, texture: TextureImage): void;
    addTextureIfNotPresent(manager: ResourceManager, relativePath: string, textureSupplier: Supplier<TextureImage>): void;
    addTextureIfNotPresent(manager: ResourceManager, relativePath: string, textureSupplier: Supplier<TextureImage>, isOnAtlas: boolean): void;
    addTextureIfNotPresent(manager: ResourceManager, res: ResourceLocation, textureSupplier: Supplier<TextureImage>): void;
    addTextureUnlessPresent(manager: ResourceManager, res: ResourceLocation, textureSupplier: ThrowingSupplier<TextureImage>): void;
    alreadyHasAssetAtLocation(manager: ResourceManager, res: ResourceLocation, type: ResType): boolean;
    alreadyHasAssetAtLocation(manager: ResourceManager, res: ResourceLocation): boolean;
    alreadyHasTextureAtLocation(manager: ResourceManager, res: ResourceLocation): boolean;
    appendItemToEnchantment(manager: ResourceManager, ench: ResourceKey<Enchantment>, ...items: Item[]): void;
    appendModelOverride(manager: ResourceManager, modelRes: ResourceLocation, modelConsumer: Consumer<OverrideAppender>): void;
    copyResource(manager: ResourceManager, from: ResourceLocation, to: ResourceLocation, lenient: boolean): void;
    markNotClearable(path: ResourceLocation): void;
  }


  class SimplePackProvider {
    createPack(): Pack;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.resources.pack.FastSearchFilePackResources' {
  import { AutoCloseable } from 'java.lang';

  interface SharedZipFileAccess extends AutoCloseable {}
  class SharedZipFileAccess extends AutoCloseable {
    close(): void;
    toString(): string;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.resources.recipe.neoforge' {
  import { Supplier } from 'java.util.function';
  import { Codec } from 'com.mojang.serialization';
  import { JsonObject } from 'com.google.gson';
  import { IContext } from 'ICondition';

  class ModIngredientTypes {
    static readonly BLOCK_TYPE_SWAP: Supplier;
    static register(): void;
  }


  class ResourceConditionsBridge {
    static readonly LIST_CODEC: Codec;
    static readonly SINGLE_OR_LIST: Codec;
    static init(): void;
    static matchesForgeConditions(obj: JsonObject, context: IContext, conditionKey: string): boolean;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.resources.RecipeTemplate' {
  import { CraftingBookCategory, Ingredient } from 'net.minecraft.world.item.crafting';
  import { ItemStack } from 'net.minecraft.world.item';
  import { NonNullList } from 'net.minecraft.core';

  class RecipeFactory<R extends Recipe<any> = any> {
    create(var1: string, var2: CraftingBookCategory, var3: ItemStack, var4: NonNullList<Ingredient>): R;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.resources.RPUtils' {
  import { ItemOverride } from 'net.minecraft.client.renderer.block.model';

  class OverrideAppender {
    add(var1: ItemOverride): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.resources.textures' {
  import { Builder } from 'net.mehvahdjukaar.moonlight.api.resources.textures.ImageTransformer';
  import { Set, List, Collection, Iterator } from 'java.util';
  import { Float, Comparable, Integer, AutoCloseable } from 'java.lang';
  import { BaseColor, RGBColor, LABColor, HCLColor } from 'net.mehvahdjukaar.moonlight.api.util.math.colors';
  import { AnimationMetadataSection, AnimationFrame } from 'net.minecraft.client.resources.metadata.animation';
  import { McMetaFile } from 'net.mehvahdjukaar.moonlight.core.misc';
  import { Rotation } from 'net.minecraft.world.level.block';
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { ResourceManager } from 'net.minecraft.server.packs.resources';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { BiConsumer, IntUnaryOperator, Consumer } from 'java.util.function';
  import { Builder as net_mehvahdjukaar_moonlight_api_resources_textures_texturecollager_Builder } from 'net.mehvahdjukaar.moonlight.api.resources.textures.TextureCollager';
  import { ThrowingRunnable, FramePixelConsumer } from 'net.mehvahdjukaar.moonlight.api.resources.textures.TextureImage';
  import { ImmutableList } from 'com.google.common.collect';

  class ImageTransformer {
    apply(original: TextureImage, target: TextureImage): void;
    static builder(originalW: number, originalH: number, targetW: number, targetH: number): Builder;
  }


  interface Palette extends Set<PaletteColor> {}
  class Palette extends Set<PaletteColor> {
    static readonly BASE_TOLERANCE: number;
    add(color: PaletteColor): boolean;
    addAll(colors: Collection<PaletteColor>): boolean;
    calculateAverage(): PaletteColor;
    changeSizeMatchingLuminanceSpan(targetLuminanceSpan: number): void;
    clear(): void;
    contains(o: any): boolean;
    containsAll(c: Collection<any>): boolean;
    copy(): Palette;
    static empty(): Palette;
    expandMatchingLuminanceRange(minLuminance: number, maxLuminance: number): void;
    static fromAnimatedImage(image: TextureImage): Palette[];
    static fromAnimatedImage(image: TextureImage, mask: TextureImage): Palette[];
    static fromAnimatedImage(textureImage: TextureImage, textureMask: TextureImage, tolerance: number): Palette[];
    static fromArc<T extends BaseColor<T>>(light: T, dark: T, size: number): Palette;
    static fromImage(image: TextureImage): Palette;
    static fromImage(image: TextureImage, mask: TextureImage): Palette;
    static fromImage(textureImage: TextureImage, textureMask: TextureImage, tolerance: number): Palette;
    get(index: number): PaletteColor;
    get averageLuminanceStep(): number;
    get centerColor(): PaletteColor;
    get centerLuminance(): number;
    get darkest(): PaletteColor;
    get lightest(): PaletteColor;
    get luminanceSpan(): number;
    get luminanceStepVariationCoeff(): number;
    get luminanceSteps(): number[];
    get values(): PaletteColor[];
    getColorAtSlope(slope: number): PaletteColor;
    getColorClosestTo(target: PaletteColor): PaletteColor;
    getDarkest(offset: number): PaletteColor;
    getLightest(offset: number): PaletteColor;
    hasColor(rgba: number): boolean;
    hasColor(color: PaletteColor): boolean;
    hasColor(color: PaletteColor, tolerance: number): boolean;
    increaseDown(): PaletteColor;
    increaseInner(): PaletteColor;
    increaseUp(): PaletteColor;
    indexOf(color: PaletteColor): number;
    isEmpty(): boolean;
    iterator(): Iterator<PaletteColor>;
    matchLuminanceStep(newLuminanceStep: number): void;
    matchSize(targetSize: number): void;
    matchSize(targetSize: number, targetLumStep: number): void;
    static merge(...palettes: Palette[]): Palette;
    static ofColors<C extends BaseColor<C>>(colors: Collection<C>): Palette;
    reduce(): PaletteColor;
    reduceAndAverage(): PaletteColor;
    reduceDown(): PaletteColor;
    reduceUp(): PaletteColor;
    remove(index: number): PaletteColor;
    remove(color: PaletteColor): boolean;
    remove(o: any): boolean;
    removeAll(colors: Collection<any>): boolean;
    removeLeastUsed(): PaletteColor;
    resampleWithOneMore(jitterFraction: number): void;
    retainAll(c: Collection<any>): boolean;
    set(index: number, color: PaletteColor): void;
    size(): number;
    toArray(): any[];
    toArray<T>(a: T[]): T[];
    updateTolerance(tolerance: number): void;
  }


  interface PaletteColor extends Comparable<PaletteColor> {}
  class PaletteColor extends Comparable<PaletteColor> {
    constructor(color: number);

    constructor(color: BaseColor<any>, occurrence: number);

    constructor(color: BaseColor<any>);
    compareTo(o: PaletteColor): number;
    distanceTo(color: PaletteColor): number;
    equals(o: any): boolean;
    get darkened(): PaletteColor;
    get lightened(): PaletteColor;
    get occurrence(): number;
    hashCode(): number;
    hcl(): HCLColor;
    lab(): LABColor;
    luminance(): number;
    rgb(): RGBColor;
    set occurrence(occurrence: number);
    toString(): string;
    value(): number;
  }


  class PixelContext {
    constructor(image: TextureImage);
    blendValue(value: number): void;
    frameIndex(): number;
    frameX(): number;
    frameY(): number;
    get value(): number;
    set value(value: number);
    x(): number;
    y(): number;
  }


  class Respriter {
    static masked(imageToRecolor: TextureImage, colorMask: TextureImage): Respriter;
    static of(imageToRecolor: TextureImage): Respriter;
    static ofPalette(imageToRecolor: TextureImage, colorsToSwap: Palette[]): Respriter;
    static ofPalette(imageToRecolor: TextureImage, colorsToSwap: Palette): Respriter;
    recolor(targetPalettes: Palette[]): TextureImage;
    recolor(targetPalette: Palette): TextureImage;
    recolorWithAnimation(targetPalettes: Palette[], targetAnimationData: AnimationMetadataSection): TextureImage;
    recolorWithAnimation(targetPalettes: Palette[], targetAnimationData: McMetaFile): TextureImage;
    recolorWithAnimationOf(textureImage: TextureImage): TextureImage;
  }


  class Sampler2D {
    static bilinear(base: Sampler2D): Sampler2D;
    static clamp(base: Sampler2D, width: number, height: number): Sampler2D;
    static flippedX(base: Sampler2D, width: number): Sampler2D;
    static flippedY(base: Sampler2D, height: number): Sampler2D;
    static nearest(base: Sampler2D): Sampler2D;
    static offset(base: Sampler2D, ox: number, oy: number): Sampler2D;
    static paletted(base: Sampler2D, palette: Palette): Sampler2D;
    static rotate(base: Sampler2D, rotation: Rotation, width: number, height: number): Sampler2D;
    sample(var1: number, var2: number): number;
    static scale(base: Sampler2D, sx: number, sy: number): Sampler2D;
    static wrap(base: Sampler2D, width: number, height: number): Sampler2D;
  }


  class SpriteUtils {
    static averageColor(image: NativeImage): RGBColor;
    static extrapolateSignBlockPalette(planksTexture: TextureImage): Palette[];
    static extrapolateSignBlockPalette(palette: Palette): void;
    static extrapolateWoodItemPalette(planksTexture: TextureImage): Palette;
    static extrapolateWoodItemPalette(palette: Palette): void;
    static forEachPixel(image: NativeImage, functionParameter: BiConsumer<number, number>): void;
    static getLuminance(r: number, g: number, b: number): number;
    static grayscaleImage(image: NativeImage): void;
    static mergeSimilarColors(image: NativeImage, tolerance: number): void;
    static parsePaletteStrip(manager: ResourceManager, fullTexturePath: ResourceLocation, expectColors: number): number[];
    static readImage(manager: ResourceManager, resourceLocation: ResourceLocation): NativeImage;
    static reduceColors(image: NativeImage, sizeFn: IntUnaryOperator): void;
    static savePaletteStrip(manager: ResourceManager, colors: number[]): TextureImage;
  }


  class TextureCollager {
    apply(source: TextureImage, destination: TextureImage): void;
    static builder(originFrameW: number, originFrameH: number, targetFrameW: number, targetFrameH: number): net_mehvahdjukaar_moonlight_api_resources_textures_texturecollager_Builder;
  }


  interface TextureImage extends AutoCloseable, Sampler2D {}
  class TextureImage extends AutoCloseable {
    applyOverlay(...overlays: TextureImage[]): void;
    applyOverlayOnExisting(...overlays: TextureImage[]): void;
    blendFramePixel(frameIndex: number, x: number, y: number, color: number): void;
    blendPixel(x: number, y: number, color: number): void;
    clear(): void;
    close(): void;
    createAnimationTemplate(length: number, useDataFrom: McMetaFile): TextureImage;
    createAnimationTemplate(length: number, useDataFrom: AnimationMetadataSection): TextureImage;
    createAnimationTemplate(length: number, frameData: AnimationFrame[], frameTime: number, interpolate: boolean): TextureImage;
    static createNew(width: number, height: number): TextureImage;
    static createNew(width: number, height: number, metadata: McMetaFile): TextureImage;
    static createNew(width: number, height: number, animation: AnimationMetadataSection): TextureImage;
    createResized(widthScale: number, heightScale: number): TextureImage;
    createRotated(rotation: Rotation): TextureImage;
    crop(mask: TextureImage): void;
    crop(mask: TextureImage, discardInner: boolean): void;
    doAndClose(action: ThrowingRunnable): void;
    forEachFrame(e: FramePixelConsumer): void;
    forEachFramePixel(framePixelConsumer: FramePixelConsumer): void;
    forEachPixel(consumer: Consumer<PixelContext>): void;
    frameCount(): number;
    frameHeight(): number;
    frameSampler(frameIndex: number): Sampler2D;
    frameWidth(): number;
    get averageColor(): RGBColor;
    get image(): NativeImage;
    get mcMeta(): McMetaFile;
    get metadata(): AnimationMetadataSection;
    getFramePixel(frameIndex: number, x: number, y: number): number;
    getFrameStartX(frameIndex: number): number;
    getFrameStartY(frameIndex: number): number;
    getPixel(x: number, y: number): number;
    imageHeight(): number;
    imageWidth(): number;
    isAllocated(): boolean;
    makeCopy(): TextureImage;
    makeCopyWithMetadata(mcMetaFile: McMetaFile): TextureImage;
    static of(image: NativeImage): TextureImage;
    static of(image: NativeImage, metadata: McMetaFile): TextureImage;
    static of(image: NativeImage, animation: AnimationMetadataSection): TextureImage;
    static open(manager: ResourceManager, relativePath: ResourceLocation): TextureImage;
    removeAlpha(backgroundColor: number): void;
    sample(x: number, y: number): number;
    setFramePixel(frameIndex: number, x: number, y: number, color: number): void;
    setPixel(x: number, y: number, color: number): void;
    splitFrames(): ImmutableList<NativeImage>;
    toGrayscale(): void;
    toString(): string;
  }


  class TextureOps {
    static applyMask(img: TextureImage, mask: TextureImage): void;
    static applyMaskInverted(img: TextureImage, mask: TextureImage): void;
    static applyOverlay(img: TextureImage, ...overlays: TextureImage[]): void;
    static applyOverlayOnExisting(img: TextureImage, ...overlays: TextureImage[]): void;
    static createRotated(img: TextureImage, rotation: Rotation): TextureImage;
    static createScaled(img: TextureImage, widthScale: number, heightScale: number): TextureImage;
    static createSingleFrameAnimation(img: TextureImage, animationData: McMetaFile): TextureImage;
    static createSingleFrameAnimation(img: TextureImage, length: number, animationData: McMetaFile): TextureImage;
    static grayscale(img: TextureImage): void;
    static makeOpaque(img: TextureImage, backgroundColor: number): void;
    static tileTexture(image: TextureImage, toTileOn: TextureImage, xOff: number, yOff: number): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.resources.textures.ImageTransformer' {
  import { ImageTransformer } from 'net.mehvahdjukaar.moonlight.api.resources.textures';

  class Builder {
    build(): ImageTransformer;
    copyRect(startX: number, startY: number, width: number, height: number, targetX: number, targetY: number): Builder;
    copyRect(startX: number, startY: number, width: number, height: number, targetX: number, targetY: number, targetW: number, targetH: number): Builder;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.resources.textures.TextureCollager' {
  import { TextureCollager, Palette } from 'net.mehvahdjukaar.moonlight.api.resources.textures';
  import { Rotation } from 'net.minecraft.world.level.block';
  import { List } from 'java.util';

  class Builder {
    constructor(originalW: number, originalH: number, targetW: number, targetH: number);
    bilinearScaling(): Builder;
    blended(): Builder;
    build(): TextureCollager;
    copyFrom(x: number, y: number, w: number, h: number): Builder;
    flippedX(): Builder;
    flippedY(): Builder;
    paletted(palettes: Palette[]): Builder;
    rotated(r: Rotation): Builder;
    to(x: number, y: number, w: number, h: number): Builder;
    to(x: number, y: number): Builder;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.resources.textures.TextureImage' {
  import { TriConsumer } from 'org.apache.logging.log4j.util';
  import { Integer } from 'java.lang';

  class ThrowingRunnable {
    run(): void;
  }


  interface FramePixelConsumer extends TriConsumer<number, number, number> {}
  class FramePixelConsumer extends TriConsumer<number, number, number> {
    accept(var1: number, var2: number, var3: number): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.set' {
  import { List, Set, EnumMap, Map, Collection, Iterator } from 'java.util';
  import { DyeColor, Item } from 'net.minecraft.world.item';
  import { Block, SoundType } from 'net.minecraft.world.level.block';
  import { HolderSet, Registry, IdMap } from 'net.minecraft.core';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Stream } from 'java.util.stream';
  import { Class } from 'java.lang';
  import { SetFinder } from 'net.mehvahdjukaar.moonlight.api.set.BlockType';
  import { BlockTypeRegistryCallback } from 'net.mehvahdjukaar.moonlight.api.set.BlockSetAPI';
  import { Consumer } from 'java.util.function';
  import { Registrator } from 'net.mehvahdjukaar.moonlight.api.misc';
  import { ItemLike } from 'net.minecraft.world.level';
  import { Entry } from 'Map';
  import { Codec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { ByteBuf } from 'io.netty.buffer';
  import { AfterLanguageLoadEvent } from 'net.mehvahdjukaar.moonlight.api.events';
  import { INamedSupplier } from 'net.mehvahdjukaar.moonlight.api.util';

  class BlocksColorAPI {
    static readonly SORTED_COLORS: List;
    static changeColor(old: Block, newColor: DyeColor): Block;
    static changeColor(old: Item, newColor: DyeColor): Item;
    static get blockKeys(): Set<string>;
    static get itemKeys(): Set<string>;
    static getBlockHolderSet(key: string): HolderSet<Block>;
    static getColor(block: Block): DyeColor;
    static getColor(item: Item): DyeColor;
    static getColoredBlock(key: string, color: DyeColor): Block;
    static getColoredItem(key: string, color: DyeColor): Item;
    static getItemHolderSet(key: string): HolderSet<Item>;
    static getKey(block: Block): string;
    static getKey(item: Item): string;
    static isDefaultColor(block: Block): boolean;
    static isDefaultColor(item: Item): boolean;
    static ordered<T>(map: Map<DyeColor, T>): Stream<T>;
    static registerBlockColorSet(key: ResourceLocation, blocks: EnumMap<DyeColor, Block>, defaultBlock: Block): void;
    static registerItemColorSet(key: ResourceLocation, items: EnumMap<DyeColor, Item>, defaultItem: Item): void;
  }


  class BlockSetAPI {
    static addBlockTypeFinder<T extends BlockType>(type: Class<T>, blockFinder: SetFinder<T>): void;
    static addBlockTypeRemover<T extends BlockType>(type: Class<T>, id: ResourceLocation): void;
    static addDynamicBlockRegistration<T extends BlockType>(registrationFunction: BlockTypeRegistryCallback<Block, T>, blockType: Class<T>): void;
    static addDynamicItemRegistration<T extends BlockType>(registrationFunction: BlockTypeRegistryCallback<Item, T>, blockType: Class<T>): void;
    static addDynamicRegistration<T extends BlockType, E>(registrationFunction: BlockTypeRegistryCallback<E, T>, blockType: Class<T>, registry: Registry<E>): void;
    static addDynamicRegistration<E>(myModId: string, registrationFunction: Consumer<Registrator<E>>, registry: Registry<E>): void;
    static changeBlockType(current: Block, originalMat: BlockType, destinationMat: BlockType): Block;
    static changeItemType(current: Item, originalMat: BlockType, destinationMat: BlockType): Item;
    static changeType(current: any, originalMat: BlockType, destinationMat: BlockType): any;
    static get registries(): Collection<BlockTypeRegistry<any>>;
    static getBlockSet<T extends BlockType>(type: Class<T>): BlockTypeRegistry<T>;
    static getBlockTypeOf<T extends BlockType>(itemLike: ItemLike, typeClass: Class<T>): T;
    static getTypeRegistry<T extends BlockType>(typeClass: Class<T>): BlockTypeRegistry<T>;
    static registerBlockSetDefinition<T extends BlockType>(typeRegistry: BlockTypeRegistry<T>): void;
  }


  class BlockType {
    readonly id: ResourceLocation;
    addChild(genericName: string, obj: any): void;
    static changeBlockType<T extends BlockType>(current: Block, originalMat: T, destinationMat: T): Block;
    static changeItemType<T extends BlockType>(current: Item, originalMat: T, destinationMat: T): Item;
    static changeType<T extends BlockType>(current: any, originalMat: T, destinationMat: T): any;
    createFullIdWith(modIdOrEmpty: string, folderOrEmpty: string, shortenedIdOrEmpty: string, prefixOrEmpty: string, suffix: string): string;
    createPathWith(shortenedId: string, suffix: string): string;
    createPathWith(shortenedId: string, prefix: string, suffix: string): string;
    get appendableId(): string;
    get children(): Set<Entry<string, any>>;
    get id(): ResourceLocation;
    get namespace(): string;
    get readableName(): string;
    get registry<T extends BlockType>(): BlockTypeRegistry<T>;
    get sound(): SoundType;
    get translationKey(): string;
    get typeName(): string;
    getAppendableIdWith(suffix: string): string;
    getAppendableIdWith(prefix: string, suffix: string): string;
    getBlockOfThis(key: string): Block;
    getChild(key: string): any;
    getChildKey(child: any): string;
    getItemOfThis(key: string): Item;
    getVariantId(baseName: string): string;
    getVariantId(baseName: string, prefix: boolean): string;
    getVariantId(postfix: string, prefix: string): string;
    hasChild(key: string): boolean;
    hasChildren(...keys: string[]): boolean;
    isVanilla(): boolean;
    mainChild(): ItemLike;
    removeChild(childKey: string): void;
    toString(): string;
  }


  interface BlockTypeRegistry<T extends BlockType = any> extends IdMap<T> {}
  class BlockTypeRegistry<T extends BlockType = any> extends IdMap<T> {
    addFinder(finder: SetFinder<T>): void;
    addRemover(id: ResourceLocation): void;
    addTypeTranslations(language: AfterLanguageLoadEvent): void;
    buildAll(): void;
    byId(id: number): T;
    finalizeAndFreeze(): void;
    get(res: ResourceLocation): T;
    get codec(): Codec<T>;
    get defaultType(): T;
    get finders(): Collection<SetFinder<T>>;
    static get registryCodec(): Codec<BlockTypeRegistry<any>>;
    static get registryStreamCodec(): StreamCodec<ByteBuf, BlockTypeRegistry<any>>;
    get streamCodec(): StreamCodec<ByteBuf, T>;
    get streamCodecExplicit(): StreamCodec<ByteBuf, T>;
    get type(): Class<T>;
    get values(): Collection<T>;
    getBlockTypeOf(itemLike: ItemLike): T;
    getFromNBT(name: string): T;
    getId(value: T): number;
    getKey(input: T): ResourceLocation;
    getOrDefault(res: ResourceLocation): T;
    isFrozen(): boolean;
    iterator(): Iterator<T>;
    makeFutureHolder(id: ResourceLocation): INamedSupplier<T>;
    priority(): number;
    size(): number;
    typeName(): string;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.set.BlockSetAPI' {
  import { Registrator } from 'net.mehvahdjukaar.moonlight.api.misc';
  import { Collection } from 'java.util';

  class BlockTypeRegistryCallback<E = any, T extends BlockType = any> {
    accept(var1: Registrator<E>, var2: Collection<T>): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.set.BlockType' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { BlockTypeRegistry } from 'net.mehvahdjukaar.moonlight.api.set';
  import { Supplier } from 'java.util.function';
  import { ItemLike } from 'net.minecraft.world.level';
  import { INamedSupplier } from 'net.mehvahdjukaar.moonlight.api.util';
  import { Optional } from 'java.util';

  interface SetFinderBuilder<T extends BlockType = any> extends SetFinder<T> {}
  class SetFinderBuilder<T extends BlockType = any> extends SetFinder<T> {
    constructor(id: ResourceLocation, reg: BlockTypeRegistry<T>);
    build(): INamedSupplier<T>;
    child(childType: string, child: Supplier<ItemLike>): SetFinderBuilder<T>;
    childBlock(childType: string, childName: ResourceLocation): SetFinderBuilder<T>;
    childBlock(childType: string, childName: string): SetFinderBuilder<T>;
    childBlockAffix(childType: string, prefix: string, suffix: string): SetFinderBuilder<T>;
    childBlockSuffix(childType: string, suffix: string): SetFinderBuilder<T>;
    childItem(childType: string, childName: ResourceLocation): SetFinderBuilder<T>;
    childItem(childType: string, childName: string): SetFinderBuilder<T>;
    childItemAffix(childType: string, prefix: string, suffix: string): SetFinderBuilder<T>;
    childItemSuffix(childType: string, suffix: string): SetFinderBuilder<T>;
  }


  interface SetFinder<T extends BlockType = any> extends Supplier<Optional> {}
  class SetFinder<T extends BlockType = any> extends Supplier<Optional> {
    get (): Optional<T>;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.set.leaves' {
  import { BlockType, BlockTypeRegistry } from 'net.mehvahdjukaar.moonlight.api.set';
  import { Codec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Block } from 'net.minecraft.world.level.block';
  import { WoodType } from 'net.mehvahdjukaar.moonlight.api.set.wood';
  import { ItemLike } from 'net.minecraft.world.level';
  import { Collection, Optional } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Finder } from 'net.mehvahdjukaar.moonlight.api.set.leaves.LeavesType';

  interface LeavesType extends BlockType {}
  class LeavesType extends BlockType {
    static CODEC: Codec;
    static STREAM_CODEC: StreamCodec;
    readonly leaves: Block;
    get associatedWoodType(): WoodType;
    get translationKey(): string;
    get woodType(): WoodType;
    initializeChildrenBlocks(): void;
    initializeChildrenItems(): void;
    mainChild(): ItemLike;
  }


  interface LeavesTypeRegistry extends BlockTypeRegistry<LeavesType> {}
  class LeavesTypeRegistry extends BlockTypeRegistry<LeavesType> {
    static readonly INSTANCE: LeavesTypeRegistry;
    static OAK_TYPE: LeavesType;
    constructor();
    addLeavesToWoodMapping(leavesTypeId: ResourceLocation, woodTypeId: ResourceLocation): void;
    addLeavesToWoodMapping(leavedId: string, woodId: string): void;
    addLeavesToWoodMapping(modId: string, leavesTypeName: string, woodTypeName: string): void;
    addSimpleFinder(typeId: ResourceLocation): Finder;
    addSimpleFinder(typeId: string): Finder;
    addSimpleFinder(namespace: string, name: string): Finder;
    detectTypeFromBlock(baseBlock: Block, baseId: ResourceLocation): Optional<LeavesType>;
    finalizeAndFreeze(): void;
    static fromNBT(name: string): LeavesType;
    get defaultType(): LeavesType;
    static get types(): Collection<LeavesType>;
    getEquivalentWoodType(leavesType: LeavesType): WoodType;
    static getValue(leavesTypeId: ResourceLocation): LeavesType;
    static getValue(leavesTypeId: string): LeavesType;
    priority(): number;
  }


  class VanillaLeavesTypes {
    static readonly OAK: LeavesType;
    static readonly SPRUCE: LeavesType;
    static readonly BIRCH: LeavesType;
    static readonly JUNGLE: LeavesType;
    static readonly ACACIA: LeavesType;
    static readonly CHERRY: LeavesType;
    static readonly DARK_OAK: LeavesType;
    static readonly MANGROVE: LeavesType;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.set.leaves.LeavesType' {
  import { SetFinderBuilder } from 'net.mehvahdjukaar.moonlight.api.set.BlockType';
  import { LeavesType } from 'net.mehvahdjukaar.moonlight.api.set.leaves';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Supplier } from 'java.util.function';
  import { Block } from 'net.minecraft.world.level.block';
  import { WoodType } from 'net.mehvahdjukaar.moonlight.api.set.wood';
  import { Optional } from 'java.util';

  interface Finder extends SetFinderBuilder<LeavesType> {}
  class Finder extends SetFinderBuilder<LeavesType> {
    constructor(id: ResourceLocation);

    constructor(id: ResourceLocation, leaves: Supplier<Block>, wood: Supplier<WoodType>);

    constructor(id: ResourceLocation, leaves: Supplier<Block>);
    addChild(childType: string, childName: string): void;
    addChild(childType: string, childName: ResourceLocation): void;
    equivalentWood(id: string): Finder;
    get (): Optional<LeavesType>;
    leaves(planksFinder: Supplier<Block>): Finder;
    leaves(id: ResourceLocation): Finder;
    leaves(leavesName: string): Finder;
    leavesAffix(prefix: string, suffix: string): Finder;
    leavesSuffix(suffix: string): Finder;
    static simple(modId: string, leavesTypeName: string, leavesName: string): Finder;
    static simple(modId: string, leavesTypeName: string, leavesName: string, woodTypeID: string): Finder;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.set.wood' {
  import { BlockType, BlockTypeRegistry } from 'net.mehvahdjukaar.moonlight.api.set';
  import { Codec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Supplier } from 'java.util.function';
  import { Block } from 'net.minecraft.world.level.block';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ItemLike } from 'net.minecraft.world.level';
  import { WoodType as net_minecraft_world_level_block_state_properties_WoodType } from 'net.minecraft.world.level.block.state.properties';
  import { Type } from 'Boat';
  import { MapColor } from 'net.minecraft.world.level.material';
  import { Properties } from 'BlockBehaviour';
  import { Set, Collection, Optional } from 'java.util';
  import { Finder } from 'net.mehvahdjukaar.moonlight.api.set.wood.WoodType';

  class VanillaWoodChildKeys {
    static readonly PLANKS: string;
    static readonly LOG: string;
    static readonly LEAVES: string;
    static readonly WOOD: string;
    static readonly STRIPPED_LOG: string;
    static readonly STRIPPED_WOOD: string;
    static readonly SAPLING: string;
    static readonly FENCE: string;
    static readonly BUTTON: string;
    static readonly PRESSURE_PLATE: string;
    static readonly DOOR: string;
    static readonly TRAPDOOR: string;
    static readonly SIGN: string;
    static readonly STAIRS: string;
    static readonly SLAB: string;
    static readonly FENCE_GATE: string;
    static readonly HANGING_SIGN: string;
    static readonly WALL_HANGING_SIGN: string;
    static readonly WALL_SIGN: string;
    static readonly BOAT: string;
    static readonly CHEST_BOAT: string;
    static readonly STICK: string;
  }


  class VanillaWoodTypes {
    static readonly OAK: WoodType;
    static readonly SPRUCE: WoodType;
    static readonly BIRCH: WoodType;
    static readonly JUNGLE: WoodType;
    static readonly ACACIA: WoodType;
    static readonly CHERRY: WoodType;
    static readonly DARK_OAK: WoodType;
    static readonly MANGROVE: WoodType;
    static readonly BAMBOO: WoodType;
    static readonly CRIMSON: WoodType;
    static readonly WARPED: WoodType;
  }


  interface WoodType extends BlockType {}
  class WoodType extends BlockType {
    static CODEC: Codec;
    static STREAM_CODEC: StreamCodec;
    static ENTITY_SERIALIZER: Supplier;
    readonly planks: Block;
    readonly log: Block;
    constructor(id: ResourceLocation, baseBlock: Block, logBlock: Block);
    canBurn(): boolean;
    copyProperties(): Properties;
    get color(): MapColor;
    get texturePath(): string;
    get translationKey(): string;
    initializeChildrenBlocks(): void;
    initializeChildrenItems(): void;
    mainChild(): ItemLike;
    toVanilla(): net_minecraft_world_level_block_state_properties_WoodType;
    toVanillaBoat(): Type;
    toVanillaBoatOrOak(): Type;
    toVanillaOrOak(): net_minecraft_world_level_block_state_properties_WoodType;
  }


  interface WoodTypeRegistry extends BlockTypeRegistry<WoodType> {}
  class WoodTypeRegistry extends BlockTypeRegistry<WoodType> {
    static readonly INSTANCE: WoodTypeRegistry;
    static readonly OAK_TYPE: WoodType;
    static IGNORED_MODS: Set;
    constructor();
    addSimpleFinder(woodTypeId: ResourceLocation): Finder;
    addSimpleFinder(nameWoodType: string): Finder;
    addSimpleFinder(namespace: string, nameWoodType: string): Finder;
    detectTypeFromBlock(baseBlock: Block, baseId: ResourceLocation): Optional<WoodType>;
    static fromNBT(name: string): WoodType;
    static fromVanilla(vanillaType: net_minecraft_world_level_block_state_properties_WoodType): WoodType;
    get defaultType(): WoodType;
    static get types(): Collection<WoodType>;
    getFromVanilla(woodType: net_minecraft_world_level_block_state_properties_WoodType): WoodType;
    static getValue(woodTypeId: ResourceLocation): WoodType;
    static getValue(woodTypeId: string): WoodType;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.set.wood.WoodType' {
  import { SetFinderBuilder } from 'net.mehvahdjukaar.moonlight.api.set.BlockType';
  import { WoodType } from 'net.mehvahdjukaar.moonlight.api.set.wood';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Supplier } from 'java.util.function';
  import { Block } from 'net.minecraft.world.level.block';
  import { Optional } from 'java.util';

  interface Finder extends SetFinderBuilder<WoodType> {}
  class Finder extends SetFinderBuilder<WoodType> {
    constructor(id: ResourceLocation);

    constructor(id: ResourceLocation, planks: Supplier<Block>, log: Supplier<Block>);
    addChild(childType: string, childName: string): void;
    addChild(childType: string, childName: ResourceLocation): void;
    get (): Optional<WoodType>;
    log(logFinder: Supplier<Block>): Finder;
    log(id: ResourceLocation): Finder;
    log(nameLog: string): Finder;
    logAffix(prefix: string, suffix: string): Finder;
    logSuffix(suffix: string): Finder;
    planks(planksFinder: Supplier<Block>): Finder;
    planks(id: ResourceLocation): Finder;
    planks(planksName: string): Finder;
    planksAffix(prefix: string, suffix: string): Finder;
    planksSuffix(suffix: string): Finder;
    static simple(modId: string, woodTypeName: string, planksName: string, logName: string): Finder;
    static simple(woodTypeName: ResourceLocation, planksName: ResourceLocation, logName: ResourceLocation): Finder;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.trades' {
  import { SimpleJsonResourceReloadListener } from 'net.minecraft.server.packs.resources';
  import { Provider } from 'HolderLookup';
  import { List } from 'java.util';
  import { ItemListing } from 'VillagerTrades';
  import { VillagerProfession } from 'net.minecraft.world.entity.npc';
  import { EntityType, Entity } from 'net.minecraft.world.entity';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { MapCodec, Codec } from 'com.mojang.serialization';
  import { MerchantOffer } from 'net.minecraft.world.item.trading';
  import { RandomSource } from 'net.minecraft.util';

  interface ItemListingManager extends SimpleJsonResourceReloadListener {}
  class ItemListingManager extends SimpleJsonResourceReloadListener {
    constructor(provider: Provider);
    static getSpecialListings(entityType: EntityType<any>, level: number, provider: Provider): ItemListing[];
    static getSpecialListings(entityType: EntityType<any>, level: number): ItemListing[];
    static getVillagerListings(profession: VillagerProfession, level: number): ItemListing[];
    static init(): void;
    static registerSerializer(id: ResourceLocation, trade: MapCodec<ModItemListing>): void;
    static registerSimple(id: ResourceLocation, instance: ItemListing, level: number): void;
  }


  interface ModItemListing extends ItemListing {}
  class ModItemListing extends ItemListing {
    static readonly CODEC: Codec;
    static defaultXp(buying: boolean, villagerLevel: number): number;
    get codec(): MapCodec<ModItemListing>;
    get level(): number;
  }


  interface NoOpListing extends ModItemListing {}
  class NoOpListing extends ModItemListing {
    static readonly CODEC: MapCodec;
    get codec(): MapCodec<ModItemListing>;
    getOffer(trader: Entity, random: RandomSource): MerchantOffer;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.util.codec' {
  import { MapCodec, DynamicOps, DataResult, MapLike, RecordBuilder, Codec } from 'com.mojang.serialization';
  import { Stream } from 'java.util.stream';
  import { Optional } from 'java.util';
  import { BiPredicate, Function, BiFunction } from 'java.util.function';
  import { Pair, Function7, Function8, Function9, Function10, Either, Function3, Function4, Function5 } from 'com.mojang.datafixers.util';
  import { P17, Function17, P18, Function18, P19, Function19, P20, Function20 } from 'net.mehvahdjukaar.moonlight.api.util.codec.BiggerCodecs';
  import { Kind1, App, K1, Applicative } from 'com.mojang.datafixers.kinds';
  import { Mu } from 'Kind1';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { OptionalFieldCodec } from 'com.mojang.serialization.codecs';
  import { HolderSet, Registry, Holder } from 'net.minecraft.core';
  import { ResourceKey } from 'net.minecraft.resources';
  import { C2, C3, C4, C5 } from 'net.mehvahdjukaar.moonlight.api.util.codec.PostProcessCodecs';

  interface AlternativeMapCodec<A = any> extends MapCodec<A> {}
  class AlternativeMapCodec<A = any> extends MapCodec<A> {
    constructor(first: MapCodec<A>, second: MapCodec<A>, defaultValue: A);
    static alias<B>(codec: Codec<B>, primaryName: string, alias: string): MapCodec<B>;
    decode<T>(ops: DynamicOps<T>, input: MapLike<T>): DataResult<A>;
    encode<T>(input: A, ops: DynamicOps<T>, prefix: RecordBuilder<T>): RecordBuilder<T>;
    equals(obj: any): boolean;
    hashCode(): number;
    keys<T>(ops: DynamicOps<T>): Stream<T>;
    static optionalAlias<B>(codec: Codec<B>, primaryName: string, alias: string): MapCodec<Optional<B>>;
    toString(): string;
  }


  interface BestAlternativeCodec<A = any, B extends A = any, C extends A = any> extends Codec<A> {}
  class BestAlternativeCodec<A = any, B extends A = any, C extends A = any> extends Codec<A> {
    constructor(first: Codec<B>, second: Codec<C>, chooseFirst: BiPredicate<B, C>);
    decode<T>(ops: DynamicOps<T>, input: T): DataResult<Pair<A, T>>;
    encode<T>(input: A, ops: DynamicOps<T>, prefix: T): DataResult<T>;
    toString(): string;
  }


  class BiggerCodecs {
    static ap17<F extends K1, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, R>(instance: Applicative<F, any>, func: App<F, Function17<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, R>>, t1: App<F, T1>, t2: App<F, T2>, t3: App<F, T3>, t4: App<F, T4>, t5: App<F, T5>, t6: App<F, T6>, t7: App<F, T7>, t8: App<F, T8>, t9: App<F, T9>, t10: App<F, T10>, t11: App<F, T11>, t12: App<F, T12>, t13: App<F, T13>, t14: App<F, T14>, t15: App<F, T15>, t16: App<F, T16>, t17: App<F, T17>): App<F, R>;
    static ap18<F extends K1, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, R>(instance: Applicative<F, any>, func: App<F, Function18<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, R>>, t1: App<F, T1>, t2: App<F, T2>, t3: App<F, T3>, t4: App<F, T4>, t5: App<F, T5>, t6: App<F, T6>, t7: App<F, T7>, t8: App<F, T8>, t9: App<F, T9>, t10: App<F, T10>, t11: App<F, T11>, t12: App<F, T12>, t13: App<F, T13>, t14: App<F, T14>, t15: App<F, T15>, t16: App<F, T16>, t17: App<F, T17>, t18: App<F, T18>): App<F, R>;
    static ap19<F extends K1, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, R>(instance: Applicative<F, any>, func: App<F, Function19<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, R>>, t1: App<F, T1>, t2: App<F, T2>, t3: App<F, T3>, t4: App<F, T4>, t5: App<F, T5>, t6: App<F, T6>, t7: App<F, T7>, t8: App<F, T8>, t9: App<F, T9>, t10: App<F, T10>, t11: App<F, T11>, t12: App<F, T12>, t13: App<F, T13>, t14: App<F, T14>, t15: App<F, T15>, t16: App<F, T16>, t17: App<F, T17>, t18: App<F, T18>, t19: App<F, T19>): App<F, R>;
    static ap20<F extends K1, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, R>(instance: Applicative<F, any>, func: App<F, Function20<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, R>>, t1: App<F, T1>, t2: App<F, T2>, t3: App<F, T3>, t4: App<F, T4>, t5: App<F, T5>, t6: App<F, T6>, t7: App<F, T7>, t8: App<F, T8>, t9: App<F, T9>, t10: App<F, T10>, t11: App<F, T11>, t12: App<F, T12>, t13: App<F, T13>, t14: App<F, T14>, t15: App<F, T15>, t16: App<F, T16>, t17: App<F, T17>, t18: App<F, T18>, t19: App<F, T19>, t20: App<F, T20>): App<F, R>;
    static group<Mu extends Mu, F extends K1, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17>(kind: Kind1<F, Mu>, t1: App<F, T1>, t2: App<F, T2>, t3: App<F, T3>, t4: App<F, T4>, t5: App<F, T5>, t6: App<F, T6>, t7: App<F, T7>, t8: App<F, T8>, t9: App<F, T9>, t10: App<F, T10>, t11: App<F, T11>, t12: App<F, T12>, t13: App<F, T13>, t14: App<F, T14>, t15: App<F, T15>, t16: App<F, T16>, t17: App<F, T17>): P17<F, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17>;
    static group<Mu extends Mu, F extends K1, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18>(kind: Kind1<F, Mu>, t1: App<F, T1>, t2: App<F, T2>, t3: App<F, T3>, t4: App<F, T4>, t5: App<F, T5>, t6: App<F, T6>, t7: App<F, T7>, t8: App<F, T8>, t9: App<F, T9>, t10: App<F, T10>, t11: App<F, T11>, t12: App<F, T12>, t13: App<F, T13>, t14: App<F, T14>, t15: App<F, T15>, t16: App<F, T16>, t17: App<F, T17>, t18: App<F, T18>): P18<F, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18>;
    static group<Mu extends Mu, F extends K1, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19>(kind: Kind1<F, Mu>, t1: App<F, T1>, t2: App<F, T2>, t3: App<F, T3>, t4: App<F, T4>, t5: App<F, T5>, t6: App<F, T6>, t7: App<F, T7>, t8: App<F, T8>, t9: App<F, T9>, t10: App<F, T10>, t11: App<F, T11>, t12: App<F, T12>, t13: App<F, T13>, t14: App<F, T14>, t15: App<F, T15>, t16: App<F, T16>, t17: App<F, T17>, t18: App<F, T18>, t19: App<F, T19>): P19<F, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19>;
    static group<Mu extends Mu, F extends K1, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20>(kind: Kind1<F, Mu>, t1: App<F, T1>, t2: App<F, T2>, t3: App<F, T3>, t4: App<F, T4>, t5: App<F, T5>, t6: App<F, T6>, t7: App<F, T7>, t8: App<F, T8>, t9: App<F, T9>, t10: App<F, T10>, t11: App<F, T11>, t12: App<F, T12>, t13: App<F, T13>, t14: App<F, T14>, t15: App<F, T15>, t16: App<F, T16>, t17: App<F, T17>, t18: App<F, T18>, t19: App<F, T19>, t20: App<F, T20>): P20<F, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20>;
  }


  class BiggerStreamCodecs {
    static composite<B, C, T1, T2, T3, T4, T5, T6, T7>(codec1: StreamCodec<B, T1>, getter1: Function<C, T1>, codec2: StreamCodec<B, T2>, getter2: Function<C, T2>, codec3: StreamCodec<B, T3>, getter3: Function<C, T3>, codec4: StreamCodec<B, T4>, getter4: Function<C, T4>, codec5: StreamCodec<B, T5>, getter5: Function<C, T5>, codec6: StreamCodec<B, T6>, getter6: Function<C, T6>, codec7: StreamCodec<B, T7>, getter7: Function<C, T7>, factory: Function7<T1, T2, T3, T4, T5, T6, T7, C>, object: B, object: B, object2: C): StreamCodec<B, C>;
    static composite<B, C, T1, T2, T3, T4, T5, T6, T7, T8>(codec1: StreamCodec<B, T1>, getter1: Function<C, T1>, codec2: StreamCodec<B, T2>, getter2: Function<C, T2>, codec3: StreamCodec<B, T3>, getter3: Function<C, T3>, codec4: StreamCodec<B, T4>, getter4: Function<C, T4>, codec5: StreamCodec<B, T5>, getter5: Function<C, T5>, codec6: StreamCodec<B, T6>, getter6: Function<C, T6>, codec7: StreamCodec<B, T7>, getter7: Function<C, T7>, codec8: StreamCodec<B, T8>, getter8: Function<C, T8>, factory: Function8<T1, T2, T3, T4, T5, T6, T7, T8, C>, object: B, object: B, object2: C): StreamCodec<B, C>;
    static composite<B, C, T1, T2, T3, T4, T5, T6, T7, T8, T9>(codec1: StreamCodec<B, T1>, getter1: Function<C, T1>, codec2: StreamCodec<B, T2>, getter2: Function<C, T2>, codec3: StreamCodec<B, T3>, getter3: Function<C, T3>, codec4: StreamCodec<B, T4>, getter4: Function<C, T4>, codec5: StreamCodec<B, T5>, getter5: Function<C, T5>, codec6: StreamCodec<B, T6>, getter6: Function<C, T6>, codec7: StreamCodec<B, T7>, getter7: Function<C, T7>, codec8: StreamCodec<B, T8>, getter8: Function<C, T8>, codec9: StreamCodec<B, T9>, getter9: Function<C, T9>, factory: Function9<T1, T2, T3, T4, T5, T6, T7, T8, T9, C>, object: B, object: B, object2: C): StreamCodec<B, C>;
    static composite<B, C, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(codec1: StreamCodec<B, T1>, getter1: Function<C, T1>, codec2: StreamCodec<B, T2>, getter2: Function<C, T2>, codec3: StreamCodec<B, T3>, getter3: Function<C, T3>, codec4: StreamCodec<B, T4>, getter4: Function<C, T4>, codec5: StreamCodec<B, T5>, getter5: Function<C, T5>, codec6: StreamCodec<B, T6>, getter6: Function<C, T6>, codec7: StreamCodec<B, T7>, getter7: Function<C, T7>, codec8: StreamCodec<B, T8>, getter8: Function<C, T8>, codec9: StreamCodec<B, T9>, getter9: Function<C, T9>, codec10: StreamCodec<B, T10>, getter10: Function<C, T10>, factory: Function10<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, C>, object: B, object: B, object2: C): StreamCodec<B, C>;
  }


  interface EitherLeftCodec<A = any, B = any> extends Codec<Either> {}
  class EitherLeftCodec<A = any, B = any> extends Codec<Either> {
    constructor(leftCodec: Codec<A>);
    decode<T>(dynamicOps: DynamicOps<T>, t: T): DataResult<Pair<Either<A, B>, T>>;
    encode<T>(abEither: Either<A, B>, dynamicOps: DynamicOps<T>, t: T): DataResult<T>;
    toString(): string;
  }


  interface LenientCodecWithLog<A = any> extends OptionalFieldCodec<A> {}
  class LenientCodecWithLog<A = any> extends OptionalFieldCodec<A> {
    decode<T>(ops: DynamicOps<T>, input: MapLike<T>): DataResult<Optional<A>>;
    static of<A>(elementCodec: Codec<A>, name: string, defaultValue: A): MapCodec<A>;
    static of<A>(elementCodec: Codec<A>, name: string): MapCodec<Optional<A>>;
    toString(): string;
  }


  interface LenientHolderSetCodec<E = any> extends Codec<HolderSet> {}
  class LenientHolderSetCodec<E = any> extends Codec<HolderSet> {
    static create<E>(registryKey: ResourceKey<Registry<E>>, holderCodec: Codec<Holder<E>>, disallowInline: boolean): Codec<HolderSet<E>>;
    decode<T>(dynamicOps: DynamicOps<T>, object: T): DataResult<Pair<HolderSet<E>, T>>;
    encode<T>(input: HolderSet<E>, ops: DynamicOps<T>, prefix: T): DataResult<T>;
    toString(): string;
  }


  class PostProcessCodecs {
    static of<A, B>(base: Codec<A>, extra: MapCodec<B>, func: BiFunction<A, B, A>): C2<A, B>;
    static of<A, B, C>(base: Codec<A>, e1: MapCodec<B>, e2: MapCodec<C>, f: Function3<A, B, C, A>): C3<A, B, C>;
    static of<A, B, C, D>(base: Codec<A>, e1: MapCodec<B>, e2: MapCodec<C>, e3: MapCodec<D>, f: Function4<A, B, C, D, A>): C4<A, B, C, D>;
    static of<A, B, C, D, E>(base: Codec<A>, e1: MapCodec<B>, e2: MapCodec<C>, e3: MapCodec<D>, e4: MapCodec<E>, f: Function5<A, B, C, D, E, A>): C5<A, B, C, D, E>;
  }


  interface UnionCodec<A = any, B = any> extends Codec<A> {}
  class UnionCodec<A = any, B = any> extends Codec<A> {
    constructor(codec: Codec<A>, otherType: Codec<B>, applyFunc: BiFunction<A, B, A>);
    decode<T>(ops: DynamicOps<T>, input: T): DataResult<Pair<A, T>>;
    encode<T>(input: A, ops: DynamicOps<T>, prefix: T): DataResult<T>;
    toString(): string;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.util.codec.BiggerCodecs' {
  import { Function11, Function9, Function8 } from 'com.mojang.datafixers.util';

  class Function20<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any, T17 = any, T18 = any, T19 = any, T20 = any, R = any> {
    apply(var1: T1, var2: T2, var3: T3, var4: T4, var5: T5, var6: T6, var7: T7, var8: T8, var9: T9, var10: T10, var11: T11, var12: T12, var13: T13, var14: T14, var15: T15, var16: T16, var17: T17, var18: T18, var19: T19, var20: T20): R;
    curry11(): Function11<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, Function9<T12, T13, T14, T15, T16, T17, T18, T19, T20, R>>;
  }


  class Function19<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any, T17 = any, T18 = any, T19 = any, R = any> {
    apply(var1: T1, var2: T2, var3: T3, var4: T4, var5: T5, var6: T6, var7: T7, var8: T8, var9: T9, var10: T10, var11: T11, var12: T12, var13: T13, var14: T14, var15: T15, var16: T16, var17: T17, var18: T18, var19: T19): R;
    curry11(): Function11<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, Function8<T12, T13, T14, T15, T16, T17, T18, T19, R>>;
  }


  class Function18<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any, T17 = any, T18 = any, R = any> {
    apply(var1: T1, var2: T2, var3: T3, var4: T4, var5: T5, var6: T6, var7: T7, var8: T8, var9: T9, var10: T10, var11: T11, var12: T12, var13: T13, var14: T14, var15: T15, var16: T16, var17: T17, var18: T18): R;
    curry9(): Function9<T1, T2, T3, T4, T5, T6, T7, T8, T9, Function9<T10, T11, T12, T13, T14, T15, T16, T17, T18, R>>;
  }


  class Function17<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any, T17 = any, R = any> {
    apply(var1: T1, var2: T2, var3: T3, var4: T4, var5: T5, var6: T6, var7: T7, var8: T8, var9: T9, var10: T10, var11: T11, var12: T12, var13: T13, var14: T14, var15: T15, var16: T16, var17: T17): R;
    curry9(): Function9<T1, T2, T3, T4, T5, T6, T7, T8, T9, Function8<T10, T11, T12, T13, T14, T15, T16, T17, R>>;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.util.codec.PostProcessCodecs' {
  import { Codec, MapCodec, DataResult, DynamicOps } from 'com.mojang.serialization';
  import { BiFunction } from 'java.util.function';
  import { Pair, Function3, Function4, Function5 } from 'com.mojang.datafixers.util';

  interface C2<A = any, B = any> extends Codec<A> {}
  class C2<A = any, B = any> extends Codec<A> {
    constructor(base: Codec<A>, extra: MapCodec<B>, applyFunc: BiFunction<A, B, A>);
    decode<T>(ops: DynamicOps<T>, input: T): DataResult<Pair<A, T>>;
    encode<T>(input: A, ops: DynamicOps<T>, prefix: T): DataResult<T>;
    toString(): string;
  }


  interface C3<A = any, B = any, C = any> extends Codec<A> {}
  class C3<A = any, B = any, C = any> extends Codec<A> {
    constructor(base: Codec<A>, extra1: MapCodec<B>, extra2: MapCodec<C>, applyFunc: Function3<A, B, C, A>);
    decode<T>(ops: DynamicOps<T>, input: T): DataResult<Pair<A, T>>;
    encode<T>(input: A, ops: DynamicOps<T>, prefix: T): DataResult<T>;
    toString(): string;
  }


  interface C4<A = any, B = any, C = any, D = any> extends Codec<A> {}
  class C4<A = any, B = any, C = any, D = any> extends Codec<A> {
    constructor(base: Codec<A>, extra1: MapCodec<B>, extra2: MapCodec<C>, extra3: MapCodec<D>, applyFunc: Function4<A, B, C, D, A>);
    decode<T>(ops: DynamicOps<T>, input: T): DataResult<Pair<A, T>>;
    encode<T>(input: A, ops: DynamicOps<T>, prefix: T): DataResult<T>;
    toString(): string;
  }


  interface C5<A = any, B = any, C = any, D = any, E = any> extends Codec<A> {}
  class C5<A = any, B = any, C = any, D = any, E = any> extends Codec<A> {
    constructor(base: Codec<A>, extra1: MapCodec<B>, extra2: MapCodec<C>, extra3: MapCodec<D>, extra4: MapCodec<E>, applyFunc: Function5<A, B, C, D, E, A>);
    decode<T>(ops: DynamicOps<T>, input: T): DataResult<Pair<A, T>>;
    encode<T>(input: A, ops: DynamicOps<T>, prefix: T): DataResult<T>;
    toString(): string;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.util' {
  import { DefaultDispenseItemBehavior, DispenseItemBehavior } from 'net.minecraft.core.dispenser';
  import { Consumer, Supplier } from 'java.util.function';
  import { Event, Priority, AdditionalDispenserBehavior } from 'net.mehvahdjukaar.moonlight.api.util.DispenserHelper';
  import { RegistryAccess, BlockPos, Direction, Holder, Registry, HolderSet } from 'net.minecraft.core';
  import { Item, ItemStack, CreativeModeTab } from 'net.minecraft.world.item';
  import { ItemLike, BlockGetter, Level } from 'net.minecraft.world.level';
  import { BlockEntity, RandomizableContainerBlockEntity, BlockEntityType, BlockEntityTicker } from 'net.minecraft.world.level.block.entity';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { FluidState, Fluid } from 'net.minecraft.world.level.material';
  import { Player } from 'net.minecraft.world.entity.player';
  import { GameProfile } from 'com.mojang.authlib';
  import { Entity, EntityType } from 'net.minecraft.world.entity';
  import { Path } from 'java.nio.file';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Enum, Comparable, Class, Iterable } from 'java.lang';
  import { Component } from 'net.minecraft.network.chat';
  import { SoftFluidStack, SoftFluid } from 'net.mehvahdjukaar.moonlight.api.fluids';
  import { List, Map } from 'java.util';
  import { Codec, MapCodec } from 'com.mojang.serialization';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { InteractionHand } from 'net.minecraft.world';
  import { InvPlacer, TriFunction } from 'net.mehvahdjukaar.moonlight.api.misc';
  import { RandomSource } from 'net.minecraft.util';
  import { Block } from 'net.minecraft.world.level.block';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { DamageType } from 'net.minecraft.world.damagesource';
  import { ConfiguredFeature } from 'net.minecraft.world.level.levelgen.feature';
  import { RecipeSerializer } from 'net.minecraft.world.item.crafting';
  import { MLMapDecorationType } from 'net.mehvahdjukaar.moonlight.api.map.decoration';
  import { Potion } from 'net.minecraft.world.item.alchemy';
  import { MobEffect } from 'net.minecraft.world.effect';
  import { StatType } from 'net.minecraft.stats';
  import { TagKey } from 'net.minecraft.tags';
  import { RegistryLookup } from 'HolderLookup';
  import { Properties } from 'BlockBehaviour';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Property } from 'net.minecraft.world.level.block.state.properties';
  import { BaseMapCodec } from 'com.mojang.serialization.codecs';
  import { LenientListCodec } from 'net.mehvahdjukaar.moonlight.api.util.codec';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  class DispenserHelper {
    static readonly PLACE_BLOCK_BEHAVIOR: DefaultDispenseItemBehavior;
    static addListener(listener: Consumer<Event>, priority: Priority): void;
    get registryAccess(): RegistryAccess;
    register(i: Item, behavior: DispenseItemBehavior): void;
    static registerCustomBehavior(behavior: AdditionalDispenserBehavior): void;
    static registerPlaceBlockBehavior(block: ItemLike): void;
    static reload(registryAccess: RegistryAccess, isClient: boolean): void;
  }


  interface DummyBlockGetter extends BlockGetter {}
  class DummyBlockGetter extends BlockGetter {
    static readonly INSTANCE: BlockGetter;
    get height(): number;
    get minBuildHeight(): number;
    getBlockEntity(pos: BlockPos): BlockEntity;
    getBlockState(pos: BlockPos): BlockState;
    getFluidState(pos: BlockPos): FluidState;
  }


  class FakePlayerManager {
    static get(id: GameProfile, entity: Entity): Player;
    static get(id: GameProfile, level: Level): Player;
    static get(id: GameProfile, copyPosFrom: Entity, copyRotFrom: Entity): Player;
    static getDefault(copyPosFrom: Entity, copyRotFrom: Entity): Player;
    static getDefault(level: Level): Player;
    static getDefault(entity: Entity): Player;
  }


  class FastCachedWriter {
    clear(): void;
    writeFast(filePath: Path, bytes: number[]): void;
  }


  class FilesHelper {
    static fastCacheWriter(): FastCachedWriter;
    static fastRemove(path: Path): boolean;
  }


  interface INamedSupplier<T = any> extends Supplier<T> {}
  class INamedSupplier<T = any> extends Supplier<T> {
    get (): T;
    get id(): ResourceLocation;
    get orThrow(): T;
    static memoize<T>(id: ResourceLocation, supp: Supplier<T>): INamedSupplier<T>;
  }


  interface PotionBottleType extends Enum<PotionBottleType> {}
  class PotionBottleType extends Enum<PotionBottleType> {
    static readonly REGULAR: PotionBottleType;
    static readonly SPLASH: PotionBottleType;
    static readonly LINGERING: PotionBottleType;
    static get(potionItem: Item): PotionBottleType;
    get defaultItem(): ItemStack;
    get serializedName(): string;
    get translatedName(): Component;
    static getOrDefault(filledContainer: Item): PotionBottleType;
    static getOrDefault(stack: SoftFluidStack): PotionBottleType;
    static valueOf(name: string): PotionBottleType;
    static values(): PotionBottleType[];
  }


  class Utils {
    static readonly MOD_LOADED_CODEC: Codec;
    static readonly AABB_CODEC: Codec;
    static addItemOrDrop(player: Player, stack: ItemStack, placer: InvPlacer): void;
    static addItemOrDrop(player: Player, stack: ItemStack): void;
    static addStackToExisting(player: Player, stack: ItemStack, avoidEmptyHands: boolean): void;
    static awardAdvancement(sp: ServerPlayer, name: ResourceLocation): void;
    static awardAdvancement(sp: ServerPlayer, name: ResourceLocation, unlockProp: string): void;
    static copyPropertySafe(blockBehaviour: Block): Properties;
    static enumStreamCodec<T extends Enum<T>>(enumClass: Class<T>): StreamCodec<FriendlyByteBuf, T>;
    static findFirstInRegistry<T>(registry: Registry<T>, ...ids: ResourceLocation[]): T;
    static findFirstInRegistry<T>(registry: Registry<T>, ids: Iterable<ResourceLocation>): T;
    static getID(object: Block): ResourceLocation;
    static getID(object: EntityType<any>): ResourceLocation;
    static getID(object: Biome): ResourceLocation;
    static getID(type: DamageType): ResourceLocation;
    static getID(object: ConfiguredFeature<any, any>): ResourceLocation;
    static getID(object: Item): ResourceLocation;
    static getID(object: Fluid): ResourceLocation;
    static getID(object: BlockEntityType<any>): ResourceLocation;
    static getID(object: RecipeSerializer<any>): ResourceLocation;
    static getID(object: SoftFluid): ResourceLocation;
    static getID(object: MLMapDecorationType<any, any>): ResourceLocation;
    static getID(object: Potion): ResourceLocation;
    static getID(object: MobEffect): ResourceLocation;
    static getID(object: CreativeModeTab): ResourceLocation;
    static getID(object: StatType<any>): ResourceLocation;
    static getID(object: any): ResourceLocation;
    static getId(object: Holder<any>): ResourceLocation;
    static getTicker<E extends BlockEntity, A extends BlockEntity>(type: BlockEntityType<A>, targetType: BlockEntityType<E>, ticker: BlockEntityTicker<E>): BlockEntityTicker<A>;
    static getTicker<E extends BlockEntity, A extends BlockEntity>(type: BlockEntityType<A>, targetType: BlockEntityType<E>, tickFunc: Consumer<A>): BlockEntityTicker<A>;
    static getXPinaBottle(bottleCount: number, rand: RandomSource): number;
    static hackyFindRegistryOf<T>(holder: Holder<T>, registryKey: ResourceKey<Registry<T>>): RegistryLookup<T>;
    static hackyGetRegistry<T>(key: ResourceKey<Registry<T>>): Registry<T>;
    static hackyGetRegistryAccess(): RegistryAccess;
    static idWithOptionalNamespace(id: string, namespace: string): ResourceLocation;
    static isMethodImplemented(original: Class<any>, subclass: Class<any>, name: string): boolean;
    static isTagged<T>(entry: T, registry: Registry<T>, tag: TagKey<T>): boolean;
    static lenientHomogeneousList<E>(registryKey: ResourceKey<Registry<E>>): Codec<HolderSet<E>>;
    static lenientListCodec<A>(elementCodec: Codec<A>): LenientListCodec<A>;
    static lenientListOrSingleCodec<A>(elementCodec: Codec<A>): Codec<A[]>;
    static loadTileFromItem(tile: BlockEntity, stack: ItemStack): void;
    static mayPerformBlockAction(player: Player, pos: BlockPos, stack: ItemStack): boolean;
    static memoize<T, U, D, R>(memoBiFunction: TriFunction<T, U, D, R>, object: T, object2: U, object3: D): TriFunction<T, U, D, R>;
    static openGuiIfPossible(be: BlockEntity, player: ServerPlayer, stack: ItemStack, hitFace: Direction): boolean;
    static openGuiIfPossible(be: BlockEntity, player: ServerPlayer, stack: ItemStack, hitFace: Direction, hitPos: Vec3): boolean;
    static optionalMapCodec<K, V, C extends BaseMapCodec<K, V> & Codec<Map<K, V>>>(keyCodec: Codec<K>, elementCodec: Codec<V>): C;
    static optionalRegistryCodec<T>(reg: Registry<T>, defaultValue: T): Codec<T>;
    static optionalRegistryListCodec<T>(reg: Registry<T>): Codec<T[]>;
    static readBlockState(compound: CompoundTag, level: Level): BlockState;
    static replaceProperty<T extends Comparable<T>, A extends Property<T>>(from: BlockState, to: BlockState, property: A): BlockState;
    static safeOptFieldOf<A>(c: Codec<A>, name: string, defaultValue: Supplier<A>): MapCodec<A>;
    static saveTileToItem(tile: BlockEntity): ItemStack;
    static spawnItemWithTileData(player: Player, tile: RandomizableContainerBlockEntity): void;
    static swapItem(player: Player, hand: InteractionHand, oldItem: ItemStack, newItem: ItemStack, bothSides: boolean): void;
    static swapItem(player: Player, hand: InteractionHand, oldItem: ItemStack, newItem: ItemStack): void;
    static swapItem(player: Player, hand: InteractionHand, newItem: ItemStack): void;
    static swapItemNBT(player: Player, hand: InteractionHand, oldItem: ItemStack, newItem: ItemStack): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.util.DispenserHelper' {
  import { DispenseItemBehavior, BlockSource, OptionalDispenseItemBehavior } from 'net.minecraft.core.dispenser';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { ItemLike } from 'net.minecraft.world.level';
  import { RegistryAccess } from 'net.minecraft.core';

  interface AdditionalDispenserBehavior extends DispenseItemBehavior {}
  class AdditionalDispenserBehavior extends DispenseItemBehavior {
    dispense(source: BlockSource, stack: ItemStack): ItemStack;
  }


  interface Priority extends Enum<Priority> {}
  class Priority extends Enum<Priority> {
    static readonly LOW: Priority;
    static readonly NORMAL: Priority;
    static readonly HIGH: Priority;
    static valueOf(name: string): Priority;
    static values(): Priority[];
  }


  class Event {
    get registryAccess(): RegistryAccess;
    register(var1: Item, var2: DispenseItemBehavior): void;
    register(behavior: AdditionalDispenserBehavior): void;
    registerPlaceBlock(i: ItemLike): void;
  }


  interface PlaceBlockDispenseBehavior extends OptionalDispenseItemBehavior {}
  class PlaceBlockDispenseBehavior extends OptionalDispenseItemBehavior {
    execute(source: BlockSource, stack: ItemStack): ItemStack;
  }


  interface FillFluidHolderBehavior extends AdditionalDispenserBehavior {}
  class FillFluidHolderBehavior extends AdditionalDispenserBehavior {
    constructor(item: Item);
  }


  interface PlaceBlockBehavior extends AdditionalDispenserBehavior {}
  class PlaceBlockBehavior extends AdditionalDispenserBehavior {
    constructor(item: Item);
  }


  interface AddItemToInventoryBehavior extends AdditionalDispenserBehavior {}
  class AddItemToInventoryBehavior extends AdditionalDispenserBehavior {
    constructor(item: Item);
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.util.math' {
  import { IntVec2iConsumer } from 'net.mehvahdjukaar.moonlight.api.util.math.CircularGridUtils';
  import { Iterator, List } from 'java.util';
  import { Codec, DataResult } from 'com.mojang.serialization';
  import { Vector3f } from 'org.joml';
  import { Enum, Float } from 'java.lang';
  import { Vec2, Vec3, BlockHitResult, AABB } from 'net.minecraft.world.phys';
  import { Direction, BlockPos, Vec3i } from 'net.minecraft.core';
  import { Rotation } from 'net.minecraft.world.level.block';
  import { RandomSource } from 'net.minecraft.util';
  import { BaseColor } from 'net.mehvahdjukaar.moonlight.api.util.math.colors';
  import { VoxelShape } from 'net.minecraft.world.phys.shapes';
  import { Entity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';

  class CircularGridUtils {
    static forEachInDisk(centerX: number, centerY: number, radius: number, consumer: IntVec2iConsumer): void;
    static forEachInDisk(centerX: number, centerY: number, radius: number, gridScale: number, consumer: IntVec2iConsumer): void;
    static forEachInRing(cx: number, cy: number, R: number, gridScale: number, consumer: IntVec2iConsumer): void;
    static forEachInRing(cx: number, cy: number, R: number, consumer: IntVec2iConsumer): void;
    static iterateInRing(cx: number, cy: number, R: number): Iterator<Vec2i>;
    static iterateInRing(cx: number, cy: number, R: number, gridScale: number): Iterator<Vec2i>;
  }


  class ColorUtils {
    static readonly CODEC: Codec;
    static readonly MINECRAFT_LIGHT_POWER: number;
    static readonly MINECRAFT_AMBIENT_LIGHT: number;
    static getShading(normal: Vector3f): number;
    static isValidString(s: string): boolean;
    static isValidStringOrError(s: string): DataResult<string>;
    static lerp(c0: number, c1: number, t: number): number;
    static multiply(color: number, amount: number): number;
    static pack(rgb: number[]): number;
    static shadeColor(normal: Vector3f, color: number): number;
    static swapFormat(argb: number): number;
    static unpack(color: number): number[];
  }


  interface Direction2D extends Enum<Direction2D> {}
  class Direction2D extends Enum<Direction2D> {
    static readonly UP: Direction2D;
    static readonly DOWN: Direction2D;
    static readonly RIGHT: Direction2D;
    static readonly LEFT: Direction2D;
    clockwise(): Direction2D;
    static closest(vec: Vec2): Direction2D;
    static closest(vec: Vec2i): Direction2D;
    counterClockwise(): Direction2D;
    static from3D(dir: Direction, facingRot: Rotation): Direction2D;
    get opposite(): Direction2D;
    get serializedName(): string;
    get step(): Vec2i;
    static valueOf(name: string): Direction2D;
    static values(): Direction2D[];
  }


  class MthUtils {
    static readonly PHI: number;
    static V3itoV3(v: Vec3i): Vec3;
    static averageAngles(...angles: number[]): number;
    static changeBasis(newX: Vec3, newY: Vec3, newZ: Vec3, rot: Vec3): Vec3;
    static changeBasisN(newBasisYVector: Vec3, rot: Vec3): Vec3;
    static clampDegrees(angle: number, first: number, second: number): number;
    static collideWithSweptAABB(entity: Entity, movement: Vec3, maxStep: number): BlockHitResult;
    static collideWithSweptAABB(myPos: Vec3, myBox: AABB, movement: Vec3, level: Level, maxStep: number): BlockHitResult;
    static collideWithSweptAABB(myPos: Vec3, myBox: AABB, movement: Vec3, level: Level): BlockHitResult;
    static getNormalFrom3DData(direction: number): Vec3;
    static getPitch(vec3: Vec3): number;
    static getRoll(vec3: Vec3): number;
    static getYaw(vec3: Vec3): number;
    hasNext(): boolean;
    static isWithinRectangle(x: number, y: number, width: number, height: number, mouseX: number, mouseY: number): boolean;
    static iterateCylinderFromCenter(center: BlockPos, radius: number, height: number): Iterator<BlockPos>;
    static lambertW0(x: number): number;
    static lambertW1(x: number): number;
    static lerpColorScale<T extends BaseColor<T>>(palette: T[], phase: number): T;
    static moveVoxelShape(source: VoxelShape, v: Vec3): VoxelShape;
    next(): BlockPos;
    static nextWeighted(rand: RandomSource, max: number, bias: number): number;
    static nextWeighted(rand: RandomSource, max: number, bias: number, min: number): number;
    static nextWeighted(rand: RandomSource, max: number): number;
    static normalizedExponent(t: number, curve: number): number;
    static polarToCartesian(a: number, r: number): number[];
    static relativePos(pos: BlockPos, normal: Direction, left: number, top: number, forward: number): BlockPos;
    static rotateVec3(vec: Vec3, dir: Direction): Vec3;
    static rotateVoxelShape(source: VoxelShape, direction: Direction): VoxelShape;
    static sha256Digest(tokens: string[]): string;
    static signedAngleDiff(to: number, from: number): number;
    static wrapRad(pValue: number): number;
    static wrapRad(pValue: number): number;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.util.math.CircularGridUtils' {
  class IntVec2iConsumer {
    accept(var1: number, var2: number): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.util.math.colors' {
  import { List } from 'java.util';

  class BaseColor<T extends BaseColor<T> = any> {
    asHCL(): HCLColor;
    asHCLV(): HCLVColor;
    asHSL(): HSLColor;
    asHSV(): HSVColor;
    asLAB(): LABColor;
    asLUV(): LUVColor;
    asRGB(): RGBColor;
    asXYZ(): XYZColor;
    distTo(other: T): number;
    fromRGB(var1: RGBColor): T;
    static mixColors<C extends BaseColor<C>>(colors: C[]): C;
    static mixColors<C extends BaseColor<C>>(...colors: C[]): C;
    mixWith(color: T): T;
    mixWith(color: T, bias: number): T;
    multiply(var1: number, var2: number, var3: number, var4: number): T;
    static weightedAverageAngles(a: number, b: number, bias: number): number;
  }


  class ColorSpaces {
    static HCLVtoLUV(color: HCLVColor): LUVColor;
    static HCLtoLAB(color: HCLColor): LABColor;
    static HSLtoRGB(color: HSLColor): RGBColor;
    static HSVtoRGB(color: HSVColor): RGBColor;
    static LABtoHCL(color: LABColor): HCLColor;
    static LABtoXYZ(color: LABColor): XYZColor;
    static LUVtoHCLV(color: LUVColor): HCLVColor;
    static LUVtoXYZ(color: LUVColor): XYZColor;
    static RGBtoHSL(color: RGBColor): HSLColor;
    static RGBtoHSV(color: RGBColor): HSVColor;
    static RGBtoXYZ(color: RGBColor): XYZColor;
    static XYZtoLAB(color: XYZColor): LABColor;
    static XYZtoLUV(color: XYZColor): LUVColor;
    static XYZtoRGB(color: XYZColor): RGBColor;
  }


  interface HCLColor extends BaseColor<HCLColor> {}
  class HCLColor extends BaseColor<HCLColor> {
    constructor(h: number, c: number, l: number, a: number);
    alpha(): number;
    asHCL(): HCLColor;
    asRGB(): RGBColor;
    static averageColors(...colors: HCLColor[]): HCLColor;
    chroma(): number;
    distTo(other: HCLColor): number;
    fromRGB(rgb: RGBColor): HCLColor;
    hue(): number;
    luminance(): number;
    mixWith(color: HCLColor, bias: number): HCLColor;
    multiply(hue: number, chroma: number, luminance: number, alpha: number): HCLColor;
    toString(): string;
    withAlpha(alpha: number): HCLColor;
    withChroma(chroma: number): HCLColor;
    withHue(hue: number): HCLColor;
    withLuminance(luminance: number): HCLColor;
  }


  interface HCLVColor extends BaseColor<HCLVColor> {}
  class HCLVColor extends BaseColor<HCLVColor> {
    constructor(h: number, c: number, l: number, a: number);
    alpha(): number;
    asHCLV(): HCLVColor;
    asRGB(): RGBColor;
    static averageColors(...colors: HCLVColor[]): HCLVColor;
    chroma(): number;
    distTo(other: HCLVColor): number;
    fromRGB(rgb: RGBColor): HCLVColor;
    hue(): number;
    luminance(): number;
    mixWith(color: HCLVColor, bias: number): HCLVColor;
    multiply(hue: number, chroma: number, luminance: number, alpha: number): HCLVColor;
    toString(): string;
    withAlpha(alpha: number): HCLVColor;
    withChroma(chroma: number): HCLVColor;
    withHue(hue: number): HCLVColor;
    withLuminance(luminance: number): HCLVColor;
  }


  interface HSLColor extends BaseColor<HSLColor> {}
  class HSLColor extends BaseColor<HSLColor> {
    constructor(h: number, s: number, l: number, a: number);
    alpha(): number;
    asHSL(): HSLColor;
    asRGB(): RGBColor;
    static averageColors(...colors: HSLColor[]): HSLColor;
    distTo(other: HSLColor): number;
    fromRGB(rgb: RGBColor): HSLColor;
    hue(): number;
    lightness(): number;
    mixWith(color: HSLColor, bias: number): HSLColor;
    multiply(hue: number, saturation: number, lightness: number, alpha: number): HSLColor;
    saturation(): number;
    toString(): string;
    withAlpha(alpha: number): HSLColor;
    withHue(hue: number): HSLColor;
    withLightness(lightness: number): HSLColor;
    withSaturation(saturation: number): HSLColor;
  }


  interface HSVColor extends BaseColor<HSVColor> {}
  class HSVColor extends BaseColor<HSVColor> {
    constructor(h: number, s: number, b: number, a: number);
    alpha(): number;
    asHSV(): HSVColor;
    asRGB(): RGBColor;
    static averageColors(...colors: HSVColor[]): HSVColor;
    distTo(other: HSVColor): number;
    fromRGB(rgb: RGBColor): HSVColor;
    hue(): number;
    mixWith(color: HSVColor, bias: number): HSVColor;
    multiply(hue: number, saturation: number, value: number, alpha: number): HSVColor;
    saturation(): number;
    toString(): string;
    value(): number;
    withAlpha(alpha: number): HSVColor;
    withHue(hue: number): HSVColor;
    withSaturation(saturation: number): HSVColor;
    withValue(value: number): HSVColor;
  }


  interface LABColor extends BaseColor<LABColor> {}
  class LABColor extends BaseColor<LABColor> {
    constructor(l: number, a: number, b: number, alpha: number);
    a(): number;
    alpha(): number;
    asLAB(): LABColor;
    asRGB(): RGBColor;
    static averageColors(...colors: LABColor[]): LABColor;
    b(): number;
    fromRGB(rgb: RGBColor): LABColor;
    luminance(): number;
    mixWith(color: LABColor, bias: number): LABColor;
    multiply(luminance: number, a: number, b: number, alpha: number): LABColor;
    toString(): string;
    withA(a: number): LABColor;
    withAlpha(alpha: number): LABColor;
    withB(b: number): LABColor;
    withLuminance(luminance: number): LABColor;
  }


  interface LUVColor extends BaseColor<LUVColor> {}
  class LUVColor extends BaseColor<LUVColor> {
    constructor(l: number, u: number, v: number, alpha: number);
    alpha(): number;
    asLUV(): LUVColor;
    asRGB(): RGBColor;
    static averageColors(...colors: LUVColor[]): LUVColor;
    fromRGB(rgb: RGBColor): LUVColor;
    luminance(): number;
    mixWith(color: LUVColor, bias: number): LUVColor;
    multiply(luminance: number, u: number, v: number, alpha: number): LUVColor;
    toString(): string;
    u(): number;
    v(): number;
    withAlpha(alpha: number): LUVColor;
    withLuminance(luminance: number): LUVColor;
    withU(u: number): LUVColor;
    withV(v: number): LUVColor;
  }


  interface RGBColor extends BaseColor<RGBColor> {}
  class RGBColor extends BaseColor<RGBColor> {
    constructor(value: number);

    constructor(r: number, g: number, b: number, a: number);
    alpha(): number;
    asRGB(): RGBColor;
    static averageColors(...colors: RGBColor[]): RGBColor;
    blue(): number;
    static combine(alpha: number, blue: number, green: number, red: number): number;
    fromRGB(rgb: RGBColor): RGBColor;
    static getA(abgr: number): number;
    static getB(agbgr: number): number;
    static getG(agbgr: number): number;
    static getR(abgr: number): number;
    green(): number;
    mixWith(color: RGBColor, bias: number): RGBColor;
    multiply(red: number, green: number, blue: number, alpha: number): RGBColor;
    red(): number;
    toInt(): number;
    toString(): string;
    withAlpha(alpha: number): RGBColor;
    withBlue(blue: number): RGBColor;
    withGreen(green: number): RGBColor;
    withRed(red: number): RGBColor;
  }


  interface XYZColor extends BaseColor<XYZColor> {}
  class XYZColor extends BaseColor<XYZColor> {
    constructor(x: number, y: number, z: number, a: number);
    alpha(): number;
    asRGB(): RGBColor;
    asXYZ(): XYZColor;
    fromRGB(rgb: RGBColor): XYZColor;
    multiply(x: number, y: number, z: number, alpha: number): XYZColor;
    toString(): string;
    withAlpha(alpha: number): XYZColor;
    withX(x: number): XYZColor;
    withY(y: number): XYZColor;
    withZ(z: number): XYZColor;
    x(): number;
    y(): number;
    z(): number;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.util.math.kmeans' {
  import { List, LinkedList } from 'java.util';
  import { ColorPoint } from 'net.mehvahdjukaar.moonlight.api.util.math.kmeans.DataSet';
  import { Palette } from 'net.mehvahdjukaar.moonlight.api.resources.textures';
  import { Double } from 'java.lang';

  class DataSet<A = any> {
    constructor(colors: T[]);
    calculateCentroid(clusterNo: number): IDataEntry<A>;
    calculateClusterSSE(centroid: IDataEntry<A>, clusterNo: number): number;
    calculateTotalSSE(centroids: IDataEntry<A>[]): number;
    calculateWeighedCentroid(): IDataEntry<A>;
    static fromPalette(palette: Palette): DataSet<ColorPoint>;
    get colorPoints(): IDataEntry<A>[];
    get lastCentroids(): IDataEntry<A>[];
    randomFromDataSet(): IDataEntry<A>;
    recomputeCentroids(clusterSize: number): IDataEntry<A>[];
  }


  class IDataEntry<T = any> {
    average(var1: IDataEntry<T>[]): IDataEntry<T>;
    cast(): T;
    distTo(var1: IDataEntry<T>): number;
    get clusterNo(): number;
    set clusterNo(var1: number);
  }


  class KMeans {
    static kMeans<A>(data: DataSet<A>, K: number): void;
    static kMeansPP<A>(data: DataSet<A>, K: number): LinkedList<IDataEntry<A>>;
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.util.math.kmeans.DataSet' {
  import { IDataEntry } from 'net.mehvahdjukaar.moonlight.api.util.math.kmeans';
  import { PaletteColor } from 'net.mehvahdjukaar.moonlight.api.resources.textures';
  import { List } from 'java.util';

  interface ColorPoint extends IDataEntry<ColorPoint> {}
  class ColorPoint extends IDataEntry<ColorPoint> {
    constructor(color: PaletteColor);
    average(others: IDataEntry<ColorPoint>[]): IDataEntry<ColorPoint>;
    cast(): ColorPoint;
    distTo(a: IDataEntry<ColorPoint>): number;
    get clusterNo(): number;
    get color(): PaletteColor;
    set clusterNo(clusterNo: number);
  }

}

declare module 'net.mehvahdjukaar.moonlight.api.worldgen' {
  import { WeightedRandomList } from 'net.minecraft.util.random';
  import { SpawnerData } from 'MobSpawnSettings';
  import { StructureManager } from 'net.minecraft.world.level';
  import { Structure } from 'net.minecraft.world.level.levelgen.structure';
  import { BlockPos } from 'net.minecraft.core';
  import { LongSet } from 'it.unimi.dsi.fastutil.longs';
  import { MobCategory } from 'net.minecraft.world.entity';

  interface ISpawnBoxStructure extends ISpecialSpawnsStructure {}
  class ISpawnBoxStructure extends ISpecialSpawnsStructure {
    ml$getSpawnBoxSettings(): SpawnBoxSettings;
    ml$getSpecialSpawns(structureManager: StructureManager, structure: Structure, pos: BlockPos, chunkPosReferences: LongSet, category: MobCategory): WeightedRandomList<SpawnerData>;
    ml$setSpawnBoxSettings(settings: SpawnBoxSettings): void;
  }


  class ISpecialSpawnsStructure {
    ml$getSpecialSpawns(var1: StructureManager, var2: Structure, var3: BlockPos, var4: LongSet, var5: MobCategory): WeightedRandomList<SpawnerData>;
  }

}

declare module 'net.mehvahdjukaar.moonlight.core.client' {
  import { Camera, Minecraft } from 'net.minecraft.client';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { BlockPos } from 'net.minecraft.core';
  import { RenderType, MultiBufferSource } from 'net.minecraft.client.renderer';
  import { CoreShaderContainer } from 'net.mehvahdjukaar.moonlight.api.client';
  import { Function } from 'java.util.function';
  import { ParticleRenderType } from 'net.minecraft.client.particle';
  import { VertexFormat, PoseStack } from 'com.mojang.blaze3d.vertex';
  import { Mode } from 'VertexFormat';
  import { Runnable, Void, Iterable } from 'java.lang';
  import { SimplePreparableReloadListener } from 'net.minecraft.server.packs.resources';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { BlockEntityRenderer } from 'net.minecraft.client.renderer.blockentity';
  import { SpawnBoxBlockEntity } from 'net.mehvahdjukaar.moonlight.core.worldgen';
  import { Context } from 'BlockEntityRendererProvider';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface DummyCamera extends Camera {}
  class DummyCamera extends Camera {
    setPosition(pX: number, pY: number, pZ: number): void;
    setPosition(pPos: Vec3): void;
    setPosition(pPos: BlockPos): void;
    setRotation(yRot: number, xRot: number): void;
  }


  interface MLRenderTypes extends RenderType {}
  class MLRenderTypes extends RenderType {
    static TEXT_COLOR_SHADER: CoreShaderContainer;
    static PARTICLE_TRANSLUCENT_SHADER: CoreShaderContainer;
    static readonly COLOR_TEXT: Function;
    static readonly TEXT_MIP: Function;
    static readonly ENTITY_SOLID_MIP: Function;
    static readonly ENTITY_CUTOUT_MIP: Function;
    static readonly PARTICLE_ADDITIVE_TRANSLUCENCY_RENDER_TYPE: ParticleRenderType;
    constructor(pName: string, pFormat: VertexFormat, pMode: Mode, pBufferSize: number, pAffectsCrumbling: boolean, pSortOnUpload: boolean, pSetupState: Runnable, pClearState: Runnable);
  }


  interface SimpleSpecialModelsLoader extends SimplePreparableReloadListener<Void> {}
  class SimpleSpecialModelsLoader extends SimplePreparableReloadListener<Void> {
    get specialModels(): Iterable<ResourceLocation>;
  }


  interface SpawnBoxBlockEntityRenderer extends BlockEntityRenderer<SpawnBoxBlockEntity> {}
  class SpawnBoxBlockEntityRenderer extends BlockEntityRenderer<SpawnBoxBlockEntity> {
    constructor(context: Context);
    get viewDistance(): number;
    render(blockEntity: SpawnBoxBlockEntity, partialTick: number, poseStack: PoseStack, buffer: MultiBufferSource, packedLight: number, packedOverlay: number): void;
    shouldRenderOffScreen(blockEntity: SpawnBoxBlockEntity): boolean;
  }


  interface SpawnBoxScreen extends Screen {}
  class SpawnBoxScreen extends Screen {
    constructor(tile: SpawnBoxBlockEntity);
    charTyped(codePoint: string, modifiers: number): boolean;
    isPauseScreen(): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    onClose(): void;
    static open(spawnBoxBlockEntity: SpawnBoxBlockEntity): void;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    renderBackground(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    resize(minecraft: Minecraft, width: number, height: number): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.core' {
  import { Supplier } from 'java.util.function';
  import { ModConfigHolder } from 'net.mehvahdjukaar.moonlight.api.platform.configs';
  import { Logger } from 'org.apache.logging.log4j';
  import { ThreadLocal } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Frozen } from 'RegistryAccess';
  import { RegistryAccess } from 'net.minecraft.core';
  import { Set, List } from 'java.util';
  import { Event } from 'net.mehvahdjukaar.moonlight.api.util.DispenserHelper';
  import { ShadeFix } from 'net.mehvahdjukaar.moonlight.core.ClientConfigs';
  import { Vector3f } from 'org.joml';
  import { SimplePackProvider, DynamicResourcesProvider, DynamicResourcePack } from 'net.mehvahdjukaar.moonlight.api.resources.pack';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { TooltipContext } from 'Item';
  import { Component } from 'net.minecraft.network.chat';
  import { ShaderEvent } from 'ClientHelper';

  class ClientConfigs {
    static readonly MERGE_PACKS: Supplier;
    static readonly LAZY_MAP_DATA: Supplier;
    static readonly MAPS_MIPMAP: Supplier;
    static readonly FIX_SHADE: Supplier;
    static readonly DEBUG_RENDERS: Supplier;
    static readonly TAGS_TOOLTIP: Supplier;
    static readonly BLOCKTYPES_DEBUG: Supplier;
    static readonly CONFIG: ModConfigHolder;
    static init(): void;
  }


  class CommonConfigs {
    static readonly EXTRA_DEBUG: Supplier;
    static readonly EXTRA_CHILDREN_DEBUG: Supplier;
    static readonly GLOBAL_DATAPACKS_DIR: Supplier;
    static readonly FASTER_CACHE_SEARCH: Supplier;
    static readonly MULTI_THREADED_GENERATION: Supplier;
    static readonly CONFIG: ModConfigHolder;
    static init(): void;
  }


  class CompatHandler {
    static readonly MAP_ATLASES: boolean;
    static readonly MODERNFIX: boolean;
    static readonly YACL: boolean;
    static readonly CLOTH_CONFIG: boolean;
    static readonly IRIS: boolean;
    static readonly DIAGONALFENCES: boolean;
    static readonly POLYMER: boolean;
  }


  class Moonlight {
    static readonly MOD_ID: string;
    static readonly LOGGER: Logger;
    static readonly HAS_BEEN_INIT: boolean;
    static readonly EARLY_REGISTRY_ACCESS: ThreadLocal;
    static addDependent(modId: string): void;
    static assertAfterInitPhase(): void;
    static assertInitPhase(): void;
    static beforeServerStart(ra: RegistryAccess): void;
    static commonInit(): void;
    static crashIfInDev(message: string): void;
    static crashIfInDev(): void;
    static get dependents(): Set<string>;
    static isDependant(modId: string): boolean;
    static isInitPhase(): boolean;
    static isVerboseLogging(): boolean;
    static logIfInDev(s: string): void;
    static onDataSyncToPlayer(player: ServerPlayer, joined: boolean): void;
    static onPlayerCloned(oldPlayer: Player, newPlayer: Player, wasDeath: boolean): void;
    static registerBuiltinFluidBehavior(event: Event): void;
    static res(name: string): ResourceLocation;
    static setServerRegistryAccess(registryAccess: Frozen): void;
    static setVerboseLogging(b: boolean): void;
  }


  class MoonlightClient {
    static fixShade: ShadeFix;
    static readonly NEW_L_0: Vector3f;
    static readonly NEW_L_1: Vector3f;
    static afterTextureReload(): void;
    static initClient(): void;
    static isClientThread(): boolean;
    static isMapMipMap(): boolean;
    static maybeMergeLegacyPack(pack: DynamicResourcePack): boolean;
    static mergePackSupplier(provider: DynamicResourcesProvider): SimplePackProvider;
    static onItemTooltip(stack: ItemStack, tooltipContext: TooltipContext, tooltipFlag: TooltipFlag, list: Component[]): void;
    static registerShaders(event: ShaderEvent): void;
    static setMipMap(b: boolean): void;
    static setupClient(): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.core.ClientConfigs' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { TooltipFlag } from 'net.minecraft.world.item';

  interface ShadeFix extends Enum<ShadeFix> {}
  class ShadeFix extends Enum<ShadeFix> {
    static readonly FALSE: ShadeFix;
    static readonly NO_GUI: ShadeFix;
    static readonly TRUE: ShadeFix;
    static valueOf(name: string): ShadeFix;
    static values(): ShadeFix[];
  }


  interface TooltipMode extends Enum<TooltipMode> {}
  class TooltipMode extends Enum<TooltipMode> {
    static readonly OFF: TooltipMode;
    static readonly ON: TooltipMode;
    static readonly ADVANCED_ONLY: TooltipMode;
    isOn(flag: TooltipFlag): boolean;
    static valueOf(name: string): TooltipMode;
    static values(): TooltipMode[];
  }

}

declare module 'net.mehvahdjukaar.moonlight.core.commands' {
  import { ArgumentBuilder } from 'com.mojang.brigadier.builder';
  import { CommandSourceStack, CommandBuildContext } from 'net.minecraft.commands';
  import { Entity } from 'net.minecraft.world.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Level } from 'net.minecraft.world.level';
  import { Command, CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandContext } from 'com.mojang.brigadier.context';
  import { DebugConfig } from 'net.mehvahdjukaar.moonlight.core.commands.DebugRenderersCommand';
  import { CommandSelection } from 'Commands';

  class BackCommand {
    static onTeleported(entity: Entity, oldPos: BlockPos, oldDim: ResourceKey<Level>): void;
    static register(context: CommandBuildContext): ArgumentBuilder<CommandSourceStack, any>;
  }


  interface BlockStateStatsCommand extends Command<CommandSourceStack> {}
  class BlockStateStatsCommand extends Command<CommandSourceStack> {
    static register(dispatcher: CommandBuildContext): ArgumentBuilder<CommandSourceStack, any>;
    run(context: CommandContext<CommandSourceStack>): number;
  }


  class ChangeDimensionCommand {
    static register(context: CommandBuildContext): ArgumentBuilder<CommandSourceStack, any>;
  }


  class DebugRenderersCommand {
    static readonly DEBUG_PATHFINDING: DebugConfig;
    static readonly DEBUG_GOAL_SELECTOR: DebugConfig;
    static readonly DEBUG_STRUCTURES_BB: DebugConfig;
    static DEBUG_NEIGHBOR_UPDATES: boolean;
    static DEBUG_WATER: boolean;
    static DEBUG_HEIGHTMAP: boolean;
    static DEBUG_COLLISION: boolean;
    static DEBUG_SUPPORT: boolean;
    static DEBUG_LIGHT: boolean;
    static DEBUG_WORLD_GEN_ATTEMPTS: boolean;
    static DEBUG_SOLID_FACES: boolean;
    static DEBUG_GAME_EVENTS: boolean;
    static DEBUG_SKY_LIGHT_SECTIONS: boolean;
    static DEBUG_BREEZE: boolean;
    static register(context: CommandBuildContext): ArgumentBuilder<CommandSourceStack, any>;
  }


  interface IUsedToRollTheDice extends Command<CommandSourceStack> {}
  class IUsedToRollTheDice extends Command<CommandSourceStack> {
    static register(dispatcher: CommandBuildContext): ArgumentBuilder<CommandSourceStack, any>;
    run(context: CommandContext<CommandSourceStack>): number;
  }


  class MapMarkerCommand {
    static addMapMarker(context: CommandContext<CommandSourceStack>): number;
    static register(context: CommandBuildContext): ArgumentBuilder<CommandSourceStack, any>;
  }


  class ModCommands {
    static init(): void;
    static register(dispatcher: CommandDispatcher<CommandSourceStack>, context: CommandBuildContext, selection: CommandSelection): void;
  }


  class RandomTeleportCommand {
    static register(context: CommandBuildContext): ArgumentBuilder<CommandSourceStack, any>;
  }


  class RegistryCommand {
    static register(): ArgumentBuilder<CommandSourceStack, any>;
  }

}

declare module 'net.mehvahdjukaar.moonlight.core.commands.DebugRenderersCommand' {
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { Registry, RegistryAccess, Holder } from 'net.minecraft.core';
  import { Level } from 'net.minecraft.world.level';

  class DebugConfig<T = any> {
    constructor(registryKey: ResourceKey<Registry<T>>);
    isActive(key: ResourceLocation): boolean;
    isActive(element: T, level: Level): boolean;
    isActive(element: T, access: RegistryAccess): boolean;
    isActive(holder: Holder<T>): boolean;
  }

}

declare module 'net.mehvahdjukaar.moonlight.core.criteria_triggers' {
  import { SimpleCriterionTrigger } from 'net.minecraft.advancements.critereon';
  import { Instance } from 'net.mehvahdjukaar.moonlight.core.criteria_triggers.GrindItemTrigger';
  import { Codec } from 'com.mojang.serialization';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { ItemStack } from 'net.minecraft.world.item';

  interface GrindItemTrigger extends SimpleCriterionTrigger<Instance> {}
  class GrindItemTrigger extends SimpleCriterionTrigger<Instance> {
    codec(): Codec<Instance>;
    trigger(playerEntity: ServerPlayer, stack: ItemStack): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.core.databuddy' {
  import { Type } from 'ModConfig';
  import { Function } from 'java.util.function';
  import { Builder } from 'ModConfigSpec';
  import { ConfigObject } from 'net.mehvahdjukaar.moonlight.core.databuddy.ConfigHelper';
  import { Codec } from 'com.mojang.serialization';
  import { Supplier } from 'com.google.common.base';

  class ConfigHelper {
    static defineObject<T>(builder: Builder, name: string, codec: Codec<T>, defaultSupplier: Supplier<T>): ConfigObject<T>;
    static register<T>(modid: string, configType: Type, configFactory: Function<Builder, T>): T;
    static register<T>(modid: string, configType: Type, configFactory: Function<Builder, T>, configName: string): T;
  }

}

declare module 'net.mehvahdjukaar.moonlight.core.databuddy.ConfigHelper' {
  import { Supplier } from 'java.util.function';
  import { DynamicOps, DataResult } from 'com.mojang.serialization';
  import { Number, Boolean } from 'java.lang';
  import { List } from 'java.util';
  import { Stream } from 'java.util.stream';
  import { Pair } from 'com.mojang.datafixers.util';

  interface ConfigObject<T = any> extends Supplier<T> {}
  class ConfigObject<T = any> extends Supplier<T> {
    get (): T;
    set (value: T);
  }


  interface TomlConfigOps extends DynamicOps<any> {}
  class TomlConfigOps extends DynamicOps<any> {
    static readonly INSTANCE: TomlConfigOps;
    compressMaps(): boolean;
    convertTo<U>(outOps: DynamicOps<U>, input: any): U;
    createBoolean(value: boolean): any;
    createList(input: Stream<any>): any;
    createMap(map: Stream<Pair<any, any>>): any;
    createNumeric(i: Number): any;
    createString(value: string): any;
    empty(): any;
    getBooleanValue(input: any): DataResult<boolean>;
    getMapValues(input: any): DataResult<Stream<Pair<any, any>>>;
    getNumberValue(input: any): DataResult<Number>;
    getStream(input: any): DataResult<Stream<any>>;
    getStringValue(input: any): DataResult<string>;
    mergeToList(list: any, values: any[]): DataResult<any>;
    mergeToList(list: any, value: any): DataResult<any>;
    mergeToMap(map: any, key: any, value: any): DataResult<any>;
    remove(input: any, key: string): any;
    toString(): string;
  }

}

declare module 'net.mehvahdjukaar.moonlight.core.fake_player' {
  import { Player } from 'net.minecraft.world.entity.player';
  import { Level, LevelAccessor } from 'net.minecraft.world.level';
  import { GameProfile } from 'com.mojang.authlib';
  import { Component } from 'net.minecraft.network.chat';
  import { Stat } from 'net.minecraft.stats';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { MinecraftServer } from 'net.minecraft.server';
  import { AbstractClientPlayer } from 'net.minecraft.client.player';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { EntityDimensions, Pose } from 'net.minecraft.world.entity';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { BlockPos } from 'net.minecraft.core';

  interface FakeGenericPlayer extends Player {}
  class FakeGenericPlayer extends Player {
    constructor(level: Level, gameProfile: GameProfile);
    awardStat(stat: Stat, increment: number): void;
    canHarmPlayer(other: Player): boolean;
    die(damageSource: DamageSource): void;
    displayClientMessage(chatComponent: Component, actionBar: boolean): void;
    static get(level: Level, username: GameProfile): FakeGenericPlayer;
    get server(): MinecraftServer;
    isCreative(): boolean;
    isInvulnerableTo(source: DamageSource): boolean;
    isSpectator(): boolean;
    tick(): void;
    static unloadLevel(level: LevelAccessor): void;
  }


  interface FakeLocalPlayer extends AbstractClientPlayer {}
  class FakeLocalPlayer extends AbstractClientPlayer {
    constructor(pClientLevel: ClientLevel, pGameProfile: GameProfile);
    blockPosition(): BlockPos;
    get server(): MinecraftServer;
    getDefaultDimensions(pose: Pose): EntityDimensions;
    playSound(pSound: SoundEvent, pVolume: number, pPitch: number): void;
    position(): Vec3;
    setXRot(pXRot: number): void;
    setYRot(pYRot: number): void;
    tick(): void;
  }


  class FPClientAccess {
    static get(level: Level, id: GameProfile): Player;
    static unloadLevel(level: LevelAccessor): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.core.integration' {
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { MapItemSavedData } from 'net.minecraft.world.level.saveddata.maps';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';

  class IrisCompat {
    static isIrisShaderStuffActive(): boolean;
  }


  class MapAtlasCompat {
    static getSavedDataFromAtlas(atlas: ItemStack, level: Level, player: Player): MapItemSavedData;
    static isAtlas(item: Item): boolean;
    static scaleDecoration(poseStack: PoseStack): void;
    static scaleDecorationText(poseStack: PoseStack, textWidth: number, textScale: number): void;
  }


  class ModernFixCompat {
    static areLazyResourcesOn(): boolean;
  }


  class PolymerCompat {
    static isPolymerObj(obj: any): boolean;
  }

}

declare module 'net.mehvahdjukaar.moonlight.core.integration.neoforge' {
  import { CustomConfigScreen, CustomConfigSelectScreen } from 'net.mehvahdjukaar.moonlight.api.integration.configured';
  import { IModConfig } from 'com.mrcrayfish.configured.api';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Component } from 'net.minecraft.network.chat';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Factory } from 'net.mehvahdjukaar.moonlight.api.integration.configured.CustomConfigScreen';

  interface ModConfigScreen extends CustomConfigScreen {}
  class ModConfigScreen extends CustomConfigScreen {
    constructor(parent: CustomConfigSelectScreen, config: IModConfig);

    constructor(modId: string, mainIcon: ItemStack, title: Component, parent: Screen, config: IModConfig);
    get subScreenFactory(): Factory;
    onSave(): void;
  }


  interface ModConfigSelectScreen extends CustomConfigSelectScreen {}
  class ModConfigSelectScreen extends CustomConfigSelectScreen {
    constructor(parent: Screen);
  }

}

declare module 'net.mehvahdjukaar.moonlight.core.loot' {
  import { LootPoolSingletonContainer, LootPoolEntryType } from 'net.minecraft.world.level.storage.loot.entries';
  import { MapCodec } from 'com.mojang.serialization';
  import { Consumer } from 'java.util.function';
  import { ItemStack } from 'net.minecraft.world.item';
  import { LootContext } from 'net.minecraft.world.level.storage.loot';
  import { Builder } from 'LootPoolSingletonContainer';
  import { LootItemCondition, LootItemConditionType } from 'net.minecraft.world.level.storage.loot.predicates';
  import { Set } from 'java.util';
  import { LootContextParam } from 'net.minecraft.world.level.storage.loot.parameters';

  interface ConfigItemPoolEntry extends LootPoolSingletonContainer {}
  class ConfigItemPoolEntry extends LootPoolSingletonContainer {
    static readonly CODEC: MapCodec;
    createItemStack(stackConsumer: Consumer<ItemStack>, lootContext: LootContext): void;
    get type(): LootPoolEntryType;
    static lootTableOptionalItem(itemRes: string): Builder<any>;
  }


  interface OptionalItemPoolEntry extends LootPoolSingletonContainer {}
  class OptionalItemPoolEntry extends LootPoolSingletonContainer {
    static readonly CODEC: MapCodec;
    createItemStack(stackConsumer: Consumer<ItemStack>, lootContext: LootContext): void;
    get type(): LootPoolEntryType;
    static lootTableOptionalItem(itemRes: string): Builder<any>;
  }


  interface OptionalPropertyCondition extends LootItemCondition {}
  class OptionalPropertyCondition extends LootItemCondition {
    static readonly CODEC: MapCodec;
    get referencedContextParams(): Set<LootContextParam<any>>;
    get type(): LootItemConditionType;
    test(lootContext: LootContext): boolean;
  }

}

declare module 'net.mehvahdjukaar.moonlight.core.map' {
  import { Registry, Holder, RegistryAccess, BlockPos } from 'net.minecraft.core';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { Type } from 'CustomMapData';
  import { CustomMapData } from 'net.mehvahdjukaar.moonlight.api.map';
  import { MLMapDecorationType, MLSpecialMapDecorationType, MLMapDecoration, MLMapMarker } from 'net.mehvahdjukaar.moonlight.api.map.decoration';
  import { Supplier, BiFunction } from 'java.util.function';
  import { Structure } from 'net.minecraft.world.level.levelgen.structure';
  import { Level, LevelAccessor } from 'net.minecraft.world.level';
  import { Collection, Set, Optional, List } from 'java.util';
  import { Entry } from 'Map';
  import { Player } from 'net.minecraft.world.entity.player';
  import { MapId, MapItemSavedData } from 'net.minecraft.world.level.saveddata.maps';
  import { TriFunction } from 'net.mehvahdjukaar.moonlight.api.misc';

  class MapDataInternal {
    static readonly CUSTOM_MAP_DATA_REGISTRY: Registry;
    static readonly MAP_DECORATION_REGISTRY_KEY: ResourceKey;
    static readonly GENERIC_STRUCTURE_ID: ResourceLocation;
    static addDynamicClientMarkersEvent(event: BiFunction<MapId, MapItemSavedData, Set<MLMapMarker<any>>>): void;
    static addDynamicServerMarkersEvent(event: TriFunction<Player, MapId, MapItemSavedData, Set<MLMapMarker<any>>>): void;
    static createCustomType(factoryID: ResourceLocation): MLSpecialMapDecorationType<any, any>;
    static get entries(): Set<Entry<ResourceKey<MLMapDecorationType<any, any>>, MLMapDecorationType<any, any>>>;
    static get genericStructure(): MLMapDecorationType<any, any>;
    static get mapDataRegistry(): Registry<Type<any, any>>;
    static get values(): Collection<MLMapDecorationType<any, any>>;
    static getAssociatedType(structure: Holder<Structure>): MLMapDecorationType<any, any>;
    static getDecorationFoStructure(level: Level, structure: Holder<Structure>): Holder<MLMapDecorationType<any, any>>;
    static getDynamicClient(mapId: MapId, data: MapItemSavedData): Set<MLMapMarker<any>>;
    static getDynamicServer(player: Player, mapId: MapId, data: MapItemSavedData): Set<MLMapMarker<any>>;
    static getHolder(id: ResourceLocation): Holder<MLMapDecorationType<any, any>>;
    static getMapDecorationRegistry(registryAccess: RegistryAccess): Registry<MLMapDecorationType<any, any>>;
    static getMarkersFromWorld(reader: LevelAccessor, pos: BlockPos): MLMapMarker<any>[];
    static getOptional(id: ResourceLocation): Optional<MLMapDecorationType<any, any>>;
    static getOrDefault(id: string): MLMapDecorationType<MLMapDecoration, any>;
    static getOrDefault(id: ResourceLocation): MLMapDecorationType<any, any>;
    static getRegistry(registryAccess: RegistryAccess): Registry<MLMapDecorationType<any, any>>;
    static hackyGetRegistry(): Registry<MLMapDecorationType<any, any>>;
    static init(): void;
    static registerCustomMapSavedData<P, T extends CustomMapData<any, P>>(type: Type<P, T>): Type<P, T>;
    static registerCustomType(id: ResourceLocation, decorationType: Supplier<MLSpecialMapDecorationType<any, any>>): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.core.misc' {
  import { MultiPackResourceManager, ResourceManager, ReloadInstance } from 'net.minecraft.server.packs.resources';
  import { PackType, PackResources } from 'net.minecraft.server.packs';
  import { List, Optional, Map } from 'java.util';
  import { Predicate, Consumer, Supplier } from 'java.util.function';
  import { PackRepository } from 'net.minecraft.server.packs.repository';
  import { AdditionalItemPlacement } from 'net.mehvahdjukaar.moonlight.api.item.additional_placements';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { Type, DirtyCounter, DirtyDataPatch } from 'CustomMapData';
  import { MLMapDecoration } from 'net.mehvahdjukaar.moonlight.api.map.decoration';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Provider } from 'HolderLookup';
  import { Executor, CompletableFuture } from 'java.util.concurrent';
  import { IProgressTracker } from 'net.mehvahdjukaar.moonlight.api.misc';
  import { Brain } from 'net.minecraft.world.entity.ai';
  import { Villager } from 'net.minecraft.world.entity.npc';
  import { MemoryModuleType, ExpirableValue } from 'net.minecraft.world.entity.ai.memory';
  import { Activity } from 'net.minecraft.world.entity.schedule';
  import { ImmutableList } from 'com.google.common.collect';
  import { Pair } from 'com.mojang.datafixers.util';
  import { Integer } from 'java.lang';
  import { BehaviorControl, Behavior } from 'net.minecraft.world.entity.ai.behavior';
  import { SensorType, Sensor } from 'net.minecraft.world.entity.ai.sensing';

  class AntiRepostWarning {
    static run(): void;
  }


  interface FilteredResManager extends MultiPackResourceManager {}
  class FilteredResManager extends MultiPackResourceManager {
    constructor(packType: PackType, list: PackResources[]);
    static excluding(original: ResourceManager, packType: PackType, ...packs: string[], p: PackResources): FilteredResManager;
    static excluding(original: ResourceManager, packType: PackType, predicate: Predicate<PackResources>): FilteredResManager;
    static excluding(original: PackRepository, packType: PackType, ...packs: string[]): FilteredResManager;
    static including(original: ResourceManager, packType: PackType, ...packs: string[], p: PackResources): FilteredResManager;
    static including(original: ResourceManager, packType: PackType, predicate: Predicate<PackResources>): FilteredResManager;
    static including(original: PackRepository, packType: PackType, ...packs: string[]): FilteredResManager;
    static isDynamicPackResource(p: PackResources): boolean;
    static isModResourcePack(pack: PackResources): boolean;
    static vanilla(manager: ResourceManager, type: PackType, p: PackResources): ResourceManager;
  }


  class IExtendedItem {
    moonlight$getAdditionalBehavior(): AdditionalItemPlacement;
    moonlight$getClientAnimationExtension(): any;
    moonlight$setAdditionalBehavior(var1: AdditionalItemPlacement): void;
    moonlight$setClientAnimationExtension(var1: any): void;
  }


  class IExtendedPistonTile {
    tickMovedBlock(var1: Level, var2: BlockPos): void;
  }


  class IHoldingPlayerExtension {
    moonlight$setCustomDataDirty<H extends DirtyCounter>(var1: Type<any, any>, var2: Consumer<H>): void;
    moonlight$setCustomMarkersDirty(): void;
  }


  class IMapDataPacketExtension {
    moonlight$getCustomDecorations(): Optional<MLMapDecoration[]>;
    moonlight$getDimension(): ResourceLocation;
    moonlight$getDirtyCustomData(): Optional<DirtyDataPatch<any, any>[]>;
    moonlight$getMapCenterX(): number;
    moonlight$getMapCenterZ(): number;
    moonlight$setCustomDecorations(var1: Optional<MLMapDecoration[]>): void;
    moonlight$setDimension(var1: ResourceLocation): void;
    moonlight$setDirtyCustomData(var1: Optional<DirtyDataPatch<any, any>[]>): void;
    moonlight$setMapCenter(var1: number, var2: number): void;
  }


  class LoaderCondition {
    test(var1: Provider): boolean;
  }


  interface ReloadInstanceWrapper extends ReloadInstance {}
  class ReloadInstanceWrapper extends ReloadInstance {
    constructor(factory: Supplier<ReloadInstance>, type: PackType, manager: ResourceManager, backgroundExecutor: Executor, mainExecutor: Executor);
    checkExceptions(): void;
    done(): CompletableFuture<any>;
    static executeEarlyReloadBlocking(type: PackType, manager: ResourceManager, progressTracker: IProgressTracker): void;
    get actualProgress(): number;
    static wrap(factory: Supplier<ReloadInstance>, type: PackType, manager: ResourceManager, backgroundExecutor: Executor, mainExecutor: Executor): ReloadInstance;
  }


  class VillagerBrainEventInternal {
    constructor(brain: Brain<Villager>, villager: Villager);
    addOrReplaceActivity(activity: Activity, activityPackage: ImmutableList<Pair<number, BehaviorControl<Villager>>>): void;
    addSensor(newSensor: SensorType<Sensor<Villager>>): void;
    addTaskToActivity<P extends Pair<number, Behavior<Villager>>>(activity: Activity, task: P): boolean;
    get memories(): Map<MemoryModuleType<any>, Optional<ExpirableValue<any>>>;
    get villager(): Villager;
    scheduleActivity(activity: Activity, startTime: number, endTime: number): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.core.misc.neoforge' {
  import { DeferredRegister, DeferredHolder } from 'net.neoforged.neoforge.registries';

  class ModLootModifiers {
    static readonly LOOT_MODIFIERS: DeferredRegister;
    static readonly ADD_ITEM_GLM: DeferredHolder;
    static readonly REPLACE_ITEM_GLM: DeferredHolder;
    static register(): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.core.misc.neoforge.ModLootModifiers' {
  import { LootModifier, IGlobalLootModifier } from 'net.neoforged.neoforge.common.loot';
  import { MapCodec } from 'com.mojang.serialization';
  import { LootItemCondition } from 'net.minecraft.world.level.storage.loot.predicates';
  import { ItemStack } from 'net.minecraft.world.item';

  interface ReplaceItemModifier extends LootModifier {}
  class ReplaceItemModifier extends LootModifier {
    static readonly CODEC: MapCodec;
    codec(): MapCodec<IGlobalLootModifier>;
  }


  interface AddItemModifier extends LootModifier {}
  class AddItemModifier extends LootModifier {
    static readonly CODEC: MapCodec;
    constructor(conditionsIn: LootItemCondition[], addedItemStack: ItemStack);
    codec(): MapCodec<IGlobalLootModifier>;
  }

}

declare module 'net.mehvahdjukaar.moonlight.core.mixins.accessor' {
  import { Map, Set } from 'java.util';
  import { SensorType, Sensor } from 'net.minecraft.world.entity.ai.sensing';
  import { Integer } from 'java.lang';
  import { Activity } from 'net.minecraft.world.entity.schedule';
  import { Behavior } from 'net.minecraft.world.entity.ai.behavior';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { DispenseItemBehavior } from 'net.minecraft.core.dispenser';
  import { NonNullList } from 'net.minecraft.core';

  class BrainAccessor<E extends LivingEntity = any> {
    get availableBehaviorsByPriority(): Map<number, Map<Activity, Set<Behavior<E>>>>;
    get sensors(): Map<SensorType<Sensor<E>>, Sensor<E>>;
  }


  class DispenserBlockAccessor {
    static getDispenserRegistry(): Map<Item, DispenseItemBehavior>;
  }


  class DispenserBlockEntityAccessor {
    get items(): NonNullList<ItemStack>;
  }

}

declare module 'net.mehvahdjukaar.moonlight.core.mixins' {
  import { CallbackInfo, CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Block } from 'net.minecraft.world.level.block';
  import { Item, ItemStack, ItemDisplayContext } from 'net.minecraft.world.item';
  import { IExtendedItem, IHoldingPlayerExtension, IMapDataPacketExtension, IExtendedPistonTile } from 'net.mehvahdjukaar.moonlight.core.misc';
  import { GoalSelectorDebugRenderer, PathfindingRenderer, StructureRenderer, BreezeDebugRenderer, LightSectionDebugRenderer, GameEventListenerRenderer } from 'net.minecraft.client.renderer.debug';
  import { SimpleDebugRenderer } from 'DebugRenderer';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { BufferSource } from 'MultiBufferSource';
  import { AbstractTexture, Dumpable, DynamicTexture } from 'net.minecraft.client.renderer.texture';
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { Operation } from 'com.llamalad7.mixinextras.injector.wrapoperation';
  import { Void } from 'java.lang';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Path } from 'java.nio.file';
  import { LivingEntity, Mob, HumanoidArm, Entity, EntityType } from 'net.minecraft.world.entity';
  import { UseOnContext } from 'net.minecraft.world.item.context';
  import { Player } from 'net.minecraft.world.entity.player';
  import { MapItemSavedData, MapId } from 'net.minecraft.world.level.saveddata.maps';
  import { Packet } from 'net.minecraft.network.protocol';
  import { Type, DirtyCounter, DirtyDataPatch } from 'CustomMapData';
  import { Consumer } from 'java.util.function';
  import { Iterator, List, Map, Optional } from 'java.util';
  import { AbstractClientPlayer, LocalPlayer } from 'net.minecraft.client.player';
  import { InteractionHand } from 'net.minecraft.world';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { AdditionalItemPlacement } from 'net.mehvahdjukaar.moonlight.api.item.additional_placements';
  import { PoolElementStructurePiece, BoundingBox } from 'net.minecraft.world.level.levelgen.structure';
  import { MutableObject } from 'org.apache.commons.lang3.mutable';
  import { VoxelShape } from 'net.minecraft.world.phys.shapes';
  import { LevelHeightAccessor, LevelAccessor, BlockGetter, Level, WorldGenLevel, StructureManager, ChunkPos } from 'net.minecraft.world.level';
  import { RandomState } from 'net.minecraft.world.level.levelgen';
  import { PoolAliasLookup } from 'net.minecraft.world.level.levelgen.structure.pools.alias';
  import { LiquidSettings } from 'net.minecraft.world.level.levelgen.structure.templatesystem';
  import { ISpawnBoxStructure, SpawnBoxSettings } from 'net.mehvahdjukaar.moonlight.api.worldgen';
  import { SavedData } from 'net.minecraft.world.level.saveddata';
  import { ExpandedMapData, CustomMapData } from 'net.mehvahdjukaar.moonlight.api.map';
  import { MLMapDecoration, MLMapMarker } from 'net.mehvahdjukaar.moonlight.api.map.decoration';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { SimpleMixinPlugin } from 'net.mehvahdjukaar.moonlight.api.misc';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { IBlockHolder } from 'net.mehvahdjukaar.moonlight.api.block';
  import { ItemInHandLayer } from 'net.minecraft.client.renderer.entity.layers';
  import { PackType, PackResources } from 'net.minecraft.server.packs';
  import { Stream } from 'java.util.stream';
  import { ChunkGenerator } from 'net.minecraft.world.level.chunk';
  import { RandomSource } from 'net.minecraft.util';
  import { AgeableListModel } from 'net.minecraft.client.model';
  import { ThrowableItemProjectile } from 'net.minecraft.world.entity.projectile';
  import { AbstractVillager } from 'net.minecraft.world.entity.npc';

  class BeeGoalMixin {
    moonlight$tickBeeGrowable(ci: CallbackInfo, i: number, blockPos: BlockPos, blockState: BlockState, block: Block, blockState2: BlockState): void;
  }


  class BlockBehaviorMixin {
  }


  interface BlockItemMixin extends IExtendedItem, Item {}
  class BlockItemMixin extends IExtendedItem {
  }


  class BlockStateBaseMixin {
    get block(): Block;
  }


  class ChunkGeneratorMixin {
  }


  class ClientPacketListenerMixin {
  }


  class DebugPacketsMixin {
  }


  class DebugRendererMixin {
    goalSelectorRenderer: GoalSelectorDebugRenderer;
    neighborsUpdateRenderer: SimpleDebugRenderer;
    pathfindingRenderer: PathfindingRenderer;
    structureRenderer: StructureRenderer;
    waterDebugRenderer: SimpleDebugRenderer;
    heightMapRenderer: SimpleDebugRenderer;
    collisionBoxRenderer: SimpleDebugRenderer;
    supportBlockRenderer: SimpleDebugRenderer;
    lightDebugRenderer: SimpleDebugRenderer;
    breezeDebugRenderer: BreezeDebugRenderer;
    skyLightSectionDebugRenderer: LightSectionDebugRenderer;
    gameEventListenerRenderer: GameEventListenerRenderer;
    solidFaceRenderer: SimpleDebugRenderer;
    worldGenAttemptRenderer: SimpleDebugRenderer;
    supp$renderVanillaDebug(poseStack: PoseStack, bufferSource: BufferSource, camX: number, camY: number, camZ: number, ci: CallbackInfo): void;
  }


  interface DynamicTextureMixin extends Dumpable, AbstractTexture {}
  class DynamicTextureMixin extends Dumpable {
    dumpContents(pResourceLocation: ResourceLocation, pPath: Path): void;
    forceMipMap(instance: NativeImage, a: number, b: number, c: number, autoClose: boolean, op: Operation<Void>): void;
    forceMipMap(a: number, b: number, c: number, op: Operation<Void>): void;
  }


  interface EntityMixin extends LivingEntity {}
  class EntityMixin extends LivingEntity {
    fixSpawnAnimX(instance: Mob, v: number): number;
  }


  interface FixBlockPlaceContextMixin extends UseOnContext {}
  class FixBlockPlaceContextMixin extends UseOnContext {
    moonlight$fixNotAccountingForNullPlayer1(cir: CallbackInfoReturnable<Direction>): void;
    moonlight$fixNotAccountingForNullPlayer2(cir: CallbackInfoReturnable<Direction>): void;
    moonlight$fixNotAccountingForNullPlayer3(cir: CallbackInfoReturnable<Direction[]>): void;
  }


  class GrindstoneMenuMixin {
  }


  class GrindstoneMenuSlotMixin {
  }


  interface HoldingPlayerMixin extends IHoldingPlayerExtension {}
  class HoldingPlayerMixin extends IHoldingPlayerExtension {
    player: Player;
    addExtraPacketData(packet: Packet<any>, mapId: MapId): Packet<any>;
    checkLocked(mapId: MapId, cir: CallbackInfoReturnable<Packet<any>>): void;
    initializeDirty(mapItemSavedData: MapItemSavedData, player: Player, ci: CallbackInfo): void;
    lockData(x: number, z: number, ci: CallbackInfo): void;
    moonlight$setCustomDataDirty<H extends DirtyCounter>(type: Type<any, any>, dirtySetter: Consumer<H>): void;
    moonlight$setCustomMarkersDirty(): void;
    sanityCheck(x: number, z: number, ci: CallbackInfo): void;
  }


  class InventoryMixin {
    player: Player;
    ml$fireDropEvent(ci: CallbackInfo, var1: Iterator, list: ItemStack[], i: number): void;
    ml$restoreNotDropped(ci: CallbackInfo, var1: Iterator, list: ItemStack[], i: number): void;
  }


  class ItemInHandRendererMixin {
    moonlight$animateItem(player: AbstractClientPlayer, partialTicks: number, pitch: number, hand: InteractionHand, swingProgress: number, stack: ItemStack, handHeight: number, poseStack: PoseStack, buffer: MultiBufferSource, combinedLight: number, ci: CallbackInfo): void;
    moonlight$renderSpecial(player: AbstractClientPlayer, partialTicks: number, pitch: number, hand: InteractionHand, swingProgress: number, stack: ItemStack, equippedProgress: number, poseStack: PoseStack, buffer: MultiBufferSource, combinedLight: number, ci: CallbackInfo, arm: HumanoidArm): void;
  }


  interface ItemMixin extends IExtendedItem {}
  class ItemMixin extends IExtendedItem {
    moonlight$getAdditionalBehavior(): AdditionalItemPlacement;
    moonlight$getClientAnimationExtension(): any;
    moonlight$setAdditionalBehavior(placementOverride: AdditionalItemPlacement): void;
    moonlight$setClientAnimationExtension(obj: any): void;
  }


  class JigsawPlacementMixin {
    ml$AddSpawnBoxPieces(piece: PoolElementStructurePiece, free: MutableObject<VoxelShape>, depth: number, useExpansionHack: boolean, level: LevelHeightAccessor, random: RandomState, poolAliasLookup: PoolAliasLookup, liquidSettings: LiquidSettings, ci: CallbackInfo): void;
  }


  class JigsawReplacementProcessorMixin {
  }


  interface JigsawStructureMixin extends ISpawnBoxStructure {}
  class JigsawStructureMixin extends ISpawnBoxStructure {
    ml$getSpawnBoxSettings(): SpawnBoxSettings;
    ml$setSpawnBoxSettings(settings: SpawnBoxSettings): void;
  }


  class LevelChunkMixin {
  }


  class LightingMixin {
  }


  interface LightningEntityMixin extends Entity {}
  class LightningEntityMixin extends Entity {
  }


  interface MapDataMixin extends ExpandedMapData, SavedData {}
  class MapDataMixin extends ExpandedMapData {
    scale: number;
    centerX: number;
    centerZ: number;
    moonlight$customDecorations: Map;
    readonly moonlight$customData: Map;
    checkCustomDeco(world: BlockGetter, x: number, z: number, ci: CallbackInfo): void;
    initCustomData(i: number, j: number, b: number, bl: boolean, bl2: boolean, bl3: boolean, resourceKey: ResourceKey<Level>, ci: CallbackInfo): void;
    locked(cir: CallbackInfoReturnable<MapItemSavedData>): void;
    ml$addCustomMarker<M extends MLMapMarker<any>>(marker: M): void;
    ml$copy(): MapItemSavedData;
    ml$getCustomData(): Map<Type<any, any>, CustomMapData<any, any>>;
    ml$getCustomDecorations(): Map<string, MLMapDecoration>;
    ml$getCustomMarkers(): Map<string, MLMapMarker<any>>;
    ml$getVanillaDecorationSize(): number;
    ml$isExplorationMap(original: boolean): boolean;
    ml$removeCustomMarker(key: string): boolean;
    ml$resetCustomDecoration(): void;
    ml$setCustomDataDirty<H extends DirtyCounter>(type: Type<any, any>, dirtySetter: Consumer<H>): void;
    ml$setCustomDecorationsDirty(): void;
    ml$toggleCustomDecoration(world: LevelAccessor, pos: BlockPos): boolean;
    save(tag: CompoundTag, registries: Provider, cir: CallbackInfoReturnable<CompoundTag>): void;
    scaled(cir: CallbackInfoReturnable<MapItemSavedData>): void;
    tickCarriedBy(player: Player, stack: ItemStack, ci: CallbackInfo): void;
  }


  class MapInstanceMixin {
    forceMipMap(instance: DynamicTexture, op: Operation<Void>): void;
  }


  interface MapItemDataPacketMixin extends IMapDataPacketExtension {}
  class MapItemDataPacketMixin extends IMapDataPacketExtension {
    moonlight$getCustomDecorations(): Optional<MLMapDecoration[]>;
    moonlight$getDimension(): ResourceLocation;
    moonlight$getDirtyCustomData(): Optional<DirtyDataPatch<any, any>[]>;
    moonlight$getMapCenterX(): number;
    moonlight$getMapCenterZ(): number;
    moonlight$setCustomDecorations(deco: Optional<MLMapDecoration[]>): void;
    moonlight$setDimension(dim: ResourceLocation): void;
    moonlight$setDirtyCustomData(tag: Optional<DirtyDataPatch<any, any>[]>): void;
    moonlight$setMapCenter(x: number, z: number): void;
  }


  class MapItemMixin {
  }


  class MapRendererMixin {
  }


  class MinecraftMixin {
    player: LocalPlayer;
  }


  interface MixinPlugin extends SimpleMixinPlugin {}
  class MixinPlugin extends SimpleMixinPlugin {
  }


  interface PistonBlockEntityMixin extends IBlockHolder, IExtendedPistonTile, BlockEntity {}
  class PistonBlockEntityMixin extends IBlockHolder {
    get heldBlock(): BlockState;
    getHeldBlock(var1: number): BlockState;
    onFinishedShortPulse(ci: CallbackInfo): void;
    set heldBlock(state: BlockState);
    setHeldBlock(var1: BlockState, var2: number): boolean;
    tickMovedBlock(level: Level, pos: BlockPos): void;
  }


  class PlaceStructureCommandMixin {
  }


  interface PlayerItemInHandLayerMixin<T extends Player = any, M extends EntityModel<T> & HeadedModel = any> extends ItemInHandLayer<T, M> {}
  class PlayerItemInHandLayerMixin<T extends Player = any, M extends EntityModel<T> & HeadedModel = any> extends ItemInHandLayer<T, M> {
    poseRightArm(entity: LivingEntity, stack: ItemStack, itemDisplayContext: ItemDisplayContext, humanoidArm: HumanoidArm, poseStack: PoseStack, multiBufferSource: MultiBufferSource, light: number, ci: CallbackInfo): void;
  }


  class ReloadableClientResourcesMixin {
    type: PackType;
    listPacks(): Stream<PackResources>;
  }


  interface ServerLevelMixin extends Level {}
  class ServerLevelMixin extends Level {
  }


  class ServerPlayerMixin {
  }


  class ShearItemMixin {
    m$mineBlock(original: boolean, state: BlockState): boolean;
  }


  class TeleportCommandMixin {
  }


  class TemplateStructurePieceMixin {
    ml$processBoxes(level: WorldGenLevel, structureManager: StructureManager, generator: ChunkGenerator, random: RandomSource, box: BoundingBox, chunkPos: ChunkPos, pos: BlockPos, ci: CallbackInfo): void;
  }


  interface ThirdPersonRendererMixin<T extends LivingEntity = any> extends AgeableListModel<T> {}
  class ThirdPersonRendererMixin<T extends LivingEntity = any> extends AgeableListModel<T> {
    poseLeftArm(entity: T, ci: CallbackInfo): void;
    poseRightArm(entity: T, ci: CallbackInfo): void;
    setupAnim(entity: T, limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, ci: CallbackInfo): void;
  }


  interface ThrownPotionMixin extends ThrowableItemProjectile {}
  class ThrownPotionMixin extends ThrowableItemProjectile {
    constructor(entityType: EntityType<ThrowableItemProjectile>, level: Level);
    moonlight$extinguishILightables(pos: BlockPos, ci: CallbackInfo, state: BlockState): void;
  }


  interface VillagerMixin extends AbstractVillager {}
  class VillagerMixin extends AbstractVillager {
  }


  class WorldLoaderMixin {
  }

}

declare module 'net.mehvahdjukaar.moonlight.core.mixins.compat' {
  import { IMagnetMoveAction } from 'org.violetmoon.quark.api';

  interface PistonReactQuarkMixin extends IMagnetMoveAction {}
  class PistonReactQuarkMixin extends IMagnetMoveAction {
  }

}

declare module 'net.mehvahdjukaar.moonlight.core.mixins.neoforge' {
  import { ContextAwareReloadListener } from 'net.neoforged.neoforge.resource';
  import { IContext } from 'ICondition';
  import { BaseFireBlock } from 'net.minecraft.world.level.block';
  import { Consumer } from 'java.util.function';
  import { IClientItemExtensions, IClientFluidTypeExtensions } from 'net.neoforged.neoforge.client.extensions.common';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { BlockEntityWithoutLevelRenderer, RenderType } from 'net.minecraft.client.renderer';
  import { IDynamicBakedModel } from 'net.neoforged.neoforge.client.model';
  import { CustomBakedModel, ExtraModelData, CustomModelLoader, IExtraModelDataProvider } from 'net.mehvahdjukaar.moonlight.api.client.model';
  import { List } from 'java.util';
  import { BakedQuad } from 'net.minecraft.client.renderer.block.model';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Direction, BlockPos } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';
  import { ModelData } from 'net.neoforged.neoforge.client.model.data';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { BlockAndTintGetter } from 'net.minecraft.world.level';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IGeometryLoader } from 'net.neoforged.neoforge.client.model.geometry';
  import { GeometryWrapper } from 'net.mehvahdjukaar.moonlight.api.client.model.neoforge';
  import { JsonObject, JsonDeserializationContext } from 'com.google.gson';
  import { IEntityWithComplexSpawn } from 'net.neoforged.neoforge.entity';
  import { IBlockEntityExtension } from 'net.neoforged.neoforge.common.extensions';
  import { Connection } from 'net.minecraft.network';
  import { ClientboundBlockEntityDataPacket } from 'net.minecraft.network.protocol.game';
  import { Provider } from 'HolderLookup';
  import { FlowingFluid } from 'net.minecraft.world.level.material';
  import { FluidType } from 'net.neoforged.neoforge.fluids';

  class ClientLanguagesMixin {
  }


  interface ConditionHackMixin extends ContextAwareReloadListener {}
  class ConditionHackMixin extends ContextAwareReloadListener {
  }


  class ConfigTrackerMixin {
  }


  class ContextAwareReloadListenerAccessor {
    invokeGetContext(): IContext;
  }


  interface FireBlockMixin extends BaseFireBlock {}
  class FireBlockMixin extends BaseFireBlock {
  }


  class ItemMixin {
    get customRenderer(): BlockEntityWithoutLevelRenderer;
    initializeClient(consumer: Consumer<IClientItemExtensions>, ci: CallbackInfo): void;
  }


  class MinecraftServerMixin {
  }


  interface SelfCustomBakedModel extends IDynamicBakedModel, CustomBakedModel {}
  class SelfCustomBakedModel extends IDynamicBakedModel {
    get particleIcon(): TextureAtlasSprite;
    getModelData(level: BlockAndTintGetter, pos: BlockPos, state: BlockState, modelData: ModelData): ModelData;
    getModelData(tileData: ExtraModelData, pos: BlockPos, state: BlockState, level: BlockAndTintGetter): ExtraModelData;
    getModelData(originalData: ExtraModelData, stack: ItemStack): ExtraModelData;
    getParticleIcon(data: ModelData): TextureAtlasSprite;
    getQuads(state: BlockState, side: Direction, rand: RandomSource, modelData: ModelData, type: RenderType): BakedQuad[];
    getQuads(state: BlockState, side: Direction, rand: RandomSource): BakedQuad[];
  }


  interface SelfCustomModelLoaderMixin extends CustomModelLoader, IGeometryLoader<GeometryWrapper> {}
  class SelfCustomModelLoaderMixin extends CustomModelLoader {
    read(jsonObject: JsonObject, context: JsonDeserializationContext): GeometryWrapper;
  }


  interface SelfEntitySpawnDataMixin extends IEntityWithComplexSpawn {}
  class SelfEntitySpawnDataMixin extends IEntityWithComplexSpawn {
  }


  interface SelfExtraModelDataProvider extends IBlockEntityExtension, IExtraModelDataProvider {}
  class SelfExtraModelDataProvider extends IBlockEntityExtension {
    get modelData(): ModelData;
    onDataPacket(net: Connection, pkt: ClientboundBlockEntityDataPacket, registries: Provider): void;
    requestModelReload(): void;
  }


  interface SelfModFlowingFluidMixin extends FlowingFluid {}
  class SelfModFlowingFluidMixin extends FlowingFluid {
    get fluidType(): FluidType;
  }


  interface SelfModFluidRendererPropertiesMixin extends IClientFluidTypeExtensions {}
  class SelfModFluidRendererPropertiesMixin extends IClientFluidTypeExtensions {
  }

}

declare module 'net.mehvahdjukaar.moonlight.core.network' {
  import { Message } from 'net.mehvahdjukaar.moonlight.api.platform.network';
  import { TypeAndCodec, Type } from 'CustomPacketPayload';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { Context } from 'net.mehvahdjukaar.moonlight.api.platform.network.Message';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { TileOrEntityTarget } from 'net.mehvahdjukaar.moonlight.api.misc';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Kind } from 'net.mehvahdjukaar.moonlight.core.network.ClientBoundParticleAroundBlockMessage';
  import { RegisterMessagesEvent } from 'NetworkHelper';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface ClientBoundFinalizeFluidsMessage extends Message {}
  class ClientBoundFinalizeFluidsMessage extends Message {
    static readonly TYPE: TypeAndCodec;
    constructor();

    constructor(pBuffer: RegistryFriendlyByteBuf);
    handle(context: Context): void;
    type(): Type<CustomPacketPayload>;
    write(buf: RegistryFriendlyByteBuf): void;
  }


  interface ClientBoundOnPistonMovedBlockMessage extends Message {}
  class ClientBoundOnPistonMovedBlockMessage extends Message {
    static readonly TYPE: TypeAndCodec;
    readonly pos: BlockPos;
    constructor(buffer: RegistryFriendlyByteBuf);

    constructor(pos: BlockPos, movedState: BlockState, direction: Direction, extending: boolean);
    handle(context: Context): void;
    type(): Type<CustomPacketPayload>;
    write(buffer: RegistryFriendlyByteBuf): void;
  }


  interface ClientBoundOpenScreenMessage extends Message {}
  class ClientBoundOpenScreenMessage extends Message {
    static readonly TYPE: TypeAndCodec;
    readonly target: TileOrEntityTarget;
    constructor(buffer: RegistryFriendlyByteBuf);

    constructor(target: TileOrEntityTarget, hitFace: Direction, hitPos: Vec3);
    handle(context: Context): void;
    type(): Type<CustomPacketPayload>;
    write(buffer: RegistryFriendlyByteBuf): void;
  }


  interface ClientBoundParticleAroundBlockMessage extends Message {}
  class ClientBoundParticleAroundBlockMessage extends Message {
    static readonly TYPE: TypeAndCodec;
    readonly type: Kind;
    readonly pos: BlockPos;
    constructor(buffer: RegistryFriendlyByteBuf);

    constructor(pos: BlockPos, type: Kind);
    handle(context: Context): void;
    type(): Type<CustomPacketPayload>;
    write(buffer: RegistryFriendlyByteBuf): void;
  }


  interface ClientBoundSendLoginMessage extends Message {}
  class ClientBoundSendLoginMessage extends Message {
    static readonly TYPE: TypeAndCodec;
    constructor(buf: RegistryFriendlyByteBuf);

    constructor();
    handle(context: Context): void;
    type(): Type<CustomPacketPayload>;
    write(buf: RegistryFriendlyByteBuf): void;
  }


  interface ClientBoundSyncWorldDataMessage<D extends WorldSavedData = any> extends Message {}
  class ClientBoundSyncWorldDataMessage<D extends WorldSavedData = any> extends Message {
    static readonly TYPE: TypeAndCodec;
    constructor(data: D);
    handle(context: Context): void;
    type(): Type<CustomPacketPayload>;
    write(buf: RegistryFriendlyByteBuf): void;
  }


  class ModNetworking {
    static init(): void;
    static loaderDependent(event: RegisterMessagesEvent): void;
  }


  interface SyncConfigsMessage extends Message {}
  class SyncConfigsMessage extends Message {
    static readonly TYPE: TypeAndCodec;
    readonly configId: ResourceLocation;
    readonly configData: number[];
    constructor(buf: RegistryFriendlyByteBuf);

    constructor(configFileData: number[], configId: ResourceLocation);
    handle(context: Context): void;
    type(): Type<CustomPacketPayload>;
    write(buf: RegistryFriendlyByteBuf): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.core.network.ClientBoundParticleAroundBlockMessage' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Kind extends Enum<Kind> {}
  class Kind extends Enum<Kind> {
    static readonly WAX_ON: Kind;
    static readonly GLOW_ON: Kind;
    static valueOf(name: string): Kind;
    static values(): Kind[];
  }

}

declare module 'net.mehvahdjukaar.moonlight.core.pack' {
  import { DynResourceGenerator, DynamicResourcesProvider, SimplePackProvider, DynamicResourcePack } from 'net.mehvahdjukaar.moonlight.api.resources.pack';
  import { PackType, PackResources, PackLocationInfo } from 'net.minecraft.server.packs';
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { List, Set } from 'java.util';
  import { Mode } from 'net.mehvahdjukaar.moonlight.core.pack.ImageMerger';
  import { IoSupplier } from 'net.minecraft.server.packs.resources';
  import { InputStream } from 'java.io';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ResourceOutput } from 'PackResources';
  import { MetadataSectionSerializer } from 'net.minecraft.server.packs.metadata';
  import { Pack } from 'net.minecraft.server.packs.repository';
  import { Metadata } from 'Pack';

  class DynamicResourcesInternals {
    static addGenerator(generator: DynResourceGenerator<any>): void;
    static clearAfterReload(targetType: PackType): void;
    static init(): void;
    static registerProvider(provider: DynamicResourcesProvider): void;
  }


  class ImageMerger {
    static mergeSquare(images: NativeImage[], mode: Mode, backgroundColor: number): NativeImage;
  }


  interface MergedDynamicClientResourcesProvider extends PackResources, SimplePackProvider {}
  class MergedDynamicClientResourcesProvider extends PackResources {
    constructor(info: PackLocationInfo);
    add(provider: DynamicResourcesProvider): void;
    addLegacy(dynPack: DynamicResourcePack): void;
    close(): void;
    createPack(): Pack;
    getMetadataSection<T>(serializer: MetadataSectionSerializer<T>): T;
    getNamespaces(type: PackType): Set<string>;
    getResource(packType: PackType, location: ResourceLocation): IoSupplier<InputStream>;
    getRootResource(...strings: string[]): IoSupplier<InputStream>;
    listResources(packType: PackType, namespace: string, path: string, resourceOutput: ResourceOutput): void;
    location(): PackLocationInfo;
    openFull(location: PackLocationInfo, metadata: Metadata): PackResources;
    openPrimary(location: PackLocationInfo): PackResources;
    size(): number;
  }

}

declare module 'net.mehvahdjukaar.moonlight.core.pack.ImageMerger' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Mode extends Enum<Mode> {}
  class Mode extends Enum<Mode> {
    static readonly MIN_AREA_NO_UPSCALE: Mode;
    static readonly NO_UPSCALE_CENTER: Mode;
    static valueOf(name: string): Mode;
    static values(): Mode[];
  }

}

declare module 'net.mehvahdjukaar.moonlight.core.set' {
  import { SimplePreparableReloadListener } from 'net.minecraft.server.packs.resources';
  import { List, Set } from 'java.util';
  import { DyeColor, Item } from 'net.minecraft.world.item';
  import { Block } from 'net.minecraft.world.level.block';
  import { HolderSet } from 'net.minecraft.core';
  import { Codec, DynamicOps } from 'com.mojang.serialization';
  import { Stream } from 'java.util.stream';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Entry } from 'Map';
  import { BlockAndItem } from 'net.mehvahdjukaar.moonlight.api.misc';

  interface BlocksColorInternal extends SimplePreparableReloadListener<List> {}
  class BlocksColorInternal extends SimplePreparableReloadListener<List> {
    static readonly INSTANCE: BlocksColorInternal;
    static readonly VANILLA_COLORS: List;
    static readonly MODDED_COLORS: List;
    changeColor(old: Block, newColor: DyeColor): Block;
    changeColor(old: Item, newColor: DyeColor): Item;
    get blockKeys(): Set<string>;
    get itemKeys(): Set<string>;
    getBlockHolderSet(key: string): HolderSet<Block>;
    getColor(block: Block): DyeColor;
    getColor(item: Item): DyeColor;
    getColoredBlock(key: string, color: DyeColor): Block;
    getColoredItem(key: string, color: DyeColor): Item;
    getItemHolderSet(key: string): HolderSet<Item>;
    getKey(block: Block): string;
    getKey(item: Item): string;
    setup(): void;
  }


  class ColorSetModification {
    static readonly CODEC: Codec;
    entrySet(): Set<Entry<DyeColor, BlockAndItem>>;
    get id(): ResourceLocation;
    hasBlocks(): boolean;
    hasItems(): boolean;
    keys<T>(ops: DynamicOps<T>): Stream<T>;
    replace(): boolean;
  }


  class DebugBlockTypes {
    static writeToFile(): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.core.set.BlocksColorInternal' {
  class State {
  }

}

declare module 'net.mehvahdjukaar.moonlight.core.worldgen' {
  import { PlacementFilter, PlacementModifierType } from 'net.minecraft.world.level.levelgen.placement';
  import { MapCodec, DynamicOps, DataResult, MapLike, RecordBuilder } from 'com.mojang.serialization';
  import { JigsawStructure } from 'net.minecraft.world.level.levelgen.structure.structures';
  import { Stream } from 'java.util.stream';
  import { Block, EntityBlock, GameMasterBlock, Rotation } from 'net.minecraft.world.level.block';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockPos, Vec3i, Direction } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { IScreenProvider } from 'net.mehvahdjukaar.moonlight.api.client';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ClientboundBlockEntityDataPacket } from 'net.minecraft.network.protocol.game';
  import { Provider } from 'HolderLookup';
  import { Level, WorldGenLevel, StructureManager } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { StructurePoolElement, StructurePoolElementType } from 'net.minecraft.world.level.levelgen.structure.pools';
  import { StructureTemplateManager, LiquidSettings } from 'net.minecraft.world.level.levelgen.structure.templatesystem';
  import { List } from 'java.util';
  import { StructureBlockInfo } from 'StructureTemplate';
  import { RandomSource } from 'net.minecraft.util';
  import { BoundingBox, PoolElementStructurePiece, StructureStart } from 'net.minecraft.world.level.levelgen.structure';
  import { ChunkGenerator } from 'net.minecraft.world.level.chunk';
  import { StructurePieceSerializationContext, StructurePieceType } from 'net.minecraft.world.level.levelgen.structure.pieces';

  interface CaveFilter extends PlacementFilter {}
  class CaveFilter extends PlacementFilter {
    static readonly CODEC: MapCodec;
    type(): PlacementModifierType<any>;
  }


  interface HeightRangeFilter extends PlacementFilter {}
  class HeightRangeFilter extends PlacementFilter {
    static readonly CODEC: MapCodec;
    type(): PlacementModifierType<any>;
  }


  interface JigsawCodecWithExtra extends MapCodec<JigsawStructure> {}
  class JigsawCodecWithExtra extends MapCodec<JigsawStructure> {
    constructor(original: MapCodec<JigsawStructure>);
    decode<T>(dynamicOps: DynamicOps<T>, mapLike: MapLike<T>): DataResult<JigsawStructure>;
    encode<T>(jigsawStructure: JigsawStructure, dynamicOps: DynamicOps<T>, recordBuilder: RecordBuilder<T>): RecordBuilder<T>;
    keys<T>(dynamicOps: DynamicOps<T>): Stream<T>;
  }


  interface SpawnBoxBlock extends EntityBlock, GameMasterBlock, Block {}
  class SpawnBoxBlock extends EntityBlock {
    constructor();
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
  }


  interface SpawnBoxBlockEntity extends IScreenProvider, BlockEntity {}
  class SpawnBoxBlockEntity extends IScreenProvider {
    constructor(pos: BlockPos, state: BlockState);
    get boxOffset(): BlockPos;
    get finalState(): string;
    get showBoundingBox(): boolean;
    get size(): Vec3i;
    get targetName(): string;
    get updatePacket(): ClientboundBlockEntityDataPacket;
    getUpdateTag(registries: Provider): CompoundTag;
    openScreen(level: Level, player: Player, direction: Direction, hitPos: Vec3): void;
    openScreen(level: Level, player: Player, direction: Direction): void;
    static readBoxName(nbt: CompoundTag): string;
    static readBoxSize(tag: CompoundTag): Vec3i;
    static readOffsetPos(tag: CompoundTag): BlockPos;
    set boxOffset(pos: BlockPos);
    set finalState(state: string);
    set showBoundingBox(show: boolean);
    set targetName(name: string);
    setBoxSize(size: Vec3i): void;
  }


  interface SpawnBoxPoolElement extends StructurePoolElement {}
  class SpawnBoxPoolElement extends StructurePoolElement {
    static readonly CODEC: MapCodec;
    constructor(size: Vec3i, offset: Vec3i, targetName: string);
    get targetName(): string;
    get type(): StructurePoolElementType<any>;
    getBoundingBox(structureTemplateManager: StructureTemplateManager, spawnBoxPos: BlockPos, rotation: Rotation): BoundingBox;
    getShuffledJigsawBlocks(structureTemplateManager: StructureTemplateManager, pos: BlockPos, rotation: Rotation, random: RandomSource): StructureBlockInfo[];
    getSize(structureTemplateManager: StructureTemplateManager, rotation: Rotation): Vec3i;
    place(structureTemplateManager: StructureTemplateManager, worldGenLevel: WorldGenLevel, structureManager: StructureManager, chunkGenerator: ChunkGenerator, blockPos: BlockPos, blockPos2: BlockPos, rotation: Rotation, boundingBox: BoundingBox, randomSource: RandomSource, liquidSettings: LiquidSettings, bl: boolean): boolean;
  }


  interface SpawnBoxStructurePiece extends PoolElementStructurePiece {}
  class SpawnBoxStructurePiece extends PoolElementStructurePiece {
    constructor(structureTemplateManager: StructureTemplateManager, poolElement: SpawnBoxPoolElement, blockPos: BlockPos, groundLevelDelta: number, rotation: Rotation, liquidSettings: LiquidSettings);

    constructor(context: StructurePieceSerializationContext, tag: CompoundTag);
    get type(): StructurePieceType;
    static getNamedBoxesAt(structureStart: StructureStart, pos: BlockPos): string;
    static getSpawnBoxPieces(parentPiece: PoolElementStructurePiece, structureTemplateManager: StructureTemplateManager, liquidSettings: LiquidSettings): SpawnBoxStructurePiece[];
    place(level: WorldGenLevel, structureManager: StructureManager, generator: ChunkGenerator, random: RandomSource, box: BoundingBox, pos: BlockPos, keepJigsaws: boolean): void;
  }

}

declare module 'net.mehvahdjukaar.moonlight.core.worldgen.CaveFilter' {
  import { PlacementModifierType } from 'net.minecraft.world.level.levelgen.placement';
  import { CaveFilter } from 'net.mehvahdjukaar.moonlight.core.worldgen';
  import { MapCodec } from 'com.mojang.serialization';

  interface Type extends PlacementModifierType<CaveFilter> {}
  class Type extends PlacementModifierType<CaveFilter> {
    codec(): MapCodec<CaveFilter>;
  }

}

declare module 'net.mehvahdjukaar.moonlight.neoforge' {
  import { Class, Iterable } from 'java.lang';
  import { UnaryOperator } from 'java.util.function';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ExtendPoiTypesEvent } from 'net.neoforged.neoforge.common.world.poi';
  import { RegisterCapabilitiesEvent } from 'net.neoforged.neoforge.capabilities';
  import { IContext } from 'ICondition';
  import { AddReloadListenerEvent, OnDatapackSyncEvent } from 'net.neoforged.neoforge.event';
  import { ServerAboutToStartEvent, ServerStoppingEvent } from 'net.neoforged.neoforge.event.server';
  import { PlayerLoggedInEvent, Clone } from 'PlayerEvent';
  import { Unload } from 'LevelEvent';
  import { ResourceKey } from 'net.minecraft.resources';
  import { PoiType } from 'net.minecraft.world.entity.ai.village.poi';
  import { Block } from 'net.minecraft.world.level.block';
  import { ItemTooltipEvent } from 'net.neoforged.neoforge.event.entity.player';
  import { FMLLoadCompleteEvent } from 'net.neoforged.fml.event.lifecycle';
  import { TextureAtlasStitchedEvent, MovementInputUpdateEvent } from 'net.neoforged.neoforge.client.event';

  class ConfigHacks {
    static init(): void;
    static replaceStaticField<T>(ownerClass: Class<any>, fieldName: string, operator: UnaryOperator<T>): T;
  }


  class MoonlightForge {
    static readonly MOD_ID: string;
    constructor(bus: IEventBus);
    static addOldPoiEvent(event: ExtendPoiTypesEvent): void;
    static addPoi(poi: ResourceKey<PoiType>, blocks: Iterable<Block>): void;
    static beforeServerStart(event: ServerAboutToStartEvent): void;
    static get conditionContext(): IContext;
    static get currentBus(): IEventBus;
    static onDataSync(event: OnDatapackSyncEvent): void;
    static onDimensionUnload(event: Unload): void;
    static onPlayerClone(event: Clone): void;
    static onPlayerLoggedIn(event: PlayerLoggedInEvent): void;
    static onResourceReload(event: AddReloadListenerEvent): void;
    static onServerShuttingDown(event: ServerStoppingEvent): void;
    static registerCapabilities(event: RegisterCapabilitiesEvent): void;
    static startRegistering(bus: IEventBus): void;
  }


  class MoonlightForgeClient {
    static afterLoad(event: FMLLoadCompleteEvent): void;
    static init(modEventBus: IEventBus): void;
    static itemTooltipEvent(event: ItemTooltipEvent): void;
    static onInputUpdate(event: MovementInputUpdateEvent): void;
    static onTextureStitch(event: TextureAtlasStitchedEvent): void;
  }

}