declare module 'vectorwing.farmersdelight.client.event' {
  import { FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';
  import { RegisterClientExtensionsEvent } from 'net.neoforged.neoforge.client.extensions.common';
  import { BlockEntityWithoutLevelRenderer } from 'net.minecraft.client.renderer';
  import { RegisterRecipeBookCategoriesEvent, RegisterClientTooltipComponentFactoriesEvent, RegisterGuiLayersEvent, RegisterMenuScreensEvent, RegisterParticleProvidersEvent } from 'net.neoforged.neoforge.client.event';
  import { RegisterRenderers } from 'EntityRenderersEvent';
  import { ItemTooltipEvent } from 'net.neoforged.neoforge.event.entity.player';

  class ClientSetupEvents {
    get customRenderer(): BlockEntityWithoutLevelRenderer;
    static init(event: FMLClientSetupEvent): void;
    static onRegisterRenderers(event: RegisterRenderers): void;
    static registerClientExtensions(event: RegisterClientExtensionsEvent): void;
    static registerCustomTooltipRenderers(event: RegisterClientTooltipComponentFactoriesEvent): void;
    static registerGuiLayers(event: RegisterGuiLayersEvent): void;
    static registerMenuScreens(event: RegisterMenuScreensEvent): void;
    static registerParticles(event: RegisterParticleProvidersEvent): void;
    static registerRecipeBookCategories(event: RegisterRecipeBookCategoriesEvent): void;
  }


  class TooltipEvents {
    static addTooltipToVanillaSoups(event: ItemTooltipEvent): void;
  }

}

declare module 'vectorwing.farmersdelight.client.gui' {
  import { SignEditScreen, AbstractContainerScreen, AbstractSignEditScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { SignBlockEntity } from 'net.minecraft.world.level.block.entity';
  import { RecipeBookComponent, RecipeUpdateListener } from 'net.minecraft.client.gui.screens.recipebook';
  import { RecipeHolder } from 'net.minecraft.world.item.crafting';
  import { List } from 'java.util';
  import { Slot } from 'net.minecraft.world.inventory';
  import { CookingPotMenu } from 'vectorwing.farmersdelight.common.block.entity.container';
  import { Inventory, Player } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { ClientTooltipComponent } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { CookingPotTooltipComponent } from 'vectorwing.farmersdelight.client.gui.CookingPotTooltip';
  import { Matrix4f } from 'org.joml';
  import { BufferSource } from 'MultiBufferSource';
  import { RegisterGuiLayersEvent } from 'net.neoforged.neoforge.client.event';
  import { FoodData } from 'net.minecraft.world.food';
  import { Minecraft } from 'net.minecraft.client';

  interface CanvasSignEditScreen extends SignEditScreen {}
  class CanvasSignEditScreen extends SignEditScreen {
    constructor(signBlockEntity: SignBlockEntity, isFront: boolean, isTextFilteringEnabled: boolean);
  }


  interface CookingPotRecipeBookComponent extends RecipeBookComponent {}
  class CookingPotRecipeBookComponent extends RecipeBookComponent {
    hide(): void;
    setupGhostRecipe(recipe: RecipeHolder<any>, slots: Slot[]): void;
  }


  interface CookingPotScreen extends RecipeUpdateListener, AbstractContainerScreen<CookingPotMenu> {}
  class CookingPotScreen extends RecipeUpdateListener {
    constructor(screenContainer: CookingPotMenu, inv: Inventory, titleIn: Component);
    get recipeBookComponent(): RecipeBookComponent;
    init(): void;
    mouseClicked(mouseX: number, mouseY: number, buttonId: number): boolean;
    recipesUpdated(): void;
    render(gui: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface CookingPotTooltip extends ClientTooltipComponent {}
  class CookingPotTooltip extends ClientTooltipComponent {
    constructor(tooltip: CookingPotTooltipComponent);
    get height(): number;
    getWidth(font: Font): number;
    renderImage(font: Font, mouseX: number, mouseY: number, gui: GuiGraphics): void;
    renderText(font: Font, x: number, y: number, matrix4f: Matrix4f, bufferSource: BufferSource): void;
  }


  interface HangingCanvasSignEditScreen extends AbstractSignEditScreen {}
  class HangingCanvasSignEditScreen extends AbstractSignEditScreen {
    constructor(signBlockEntity: SignBlockEntity, isFrontText: boolean, isTextFilteringEnabled: boolean);
  }


  class HUDOverlays {
    static healthIconsOffset: number;
    static foodIconsOffset: number;
    static drawComfortOverlay(player: Player, minecraft: Minecraft, graphics: GuiGraphics, left: number, top: number): void;
    static drawNourishmentOverlay(foodData: FoodData, minecraft: Minecraft, graphics: GuiGraphics, right: number, top: number, naturalHealing: boolean): void;
    static register(event: RegisterGuiLayersEvent): void;
  }

}

declare module 'vectorwing.farmersdelight.client.gui.HUDOverlays' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Minecraft, DeltaTracker } from 'net.minecraft.client';
  import { Player } from 'net.minecraft.world.entity.player';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Layer } from 'LayeredDraw';

  interface ComfortOverlay extends BaseOverlay {}
  class ComfortOverlay extends BaseOverlay {
    static readonly ID: ResourceLocation;
    render(minecraft: Minecraft, player: Player, guiGraphics: GuiGraphics, left: number, right: number, top: number, guiTicks: number): void;
    render(guiGraphics: GuiGraphics, deltaTracker: DeltaTracker): void;
    shouldRenderOverlay(mc: Minecraft, player: Player, guiGraphics: GuiGraphics, guiTicks: number): boolean;
  }


  interface NourishmentOverlay extends BaseOverlay {}
  class NourishmentOverlay extends BaseOverlay {
    static readonly ID: ResourceLocation;
    render(minecraft: Minecraft, player: Player, guiGraphics: GuiGraphics, left: number, right: number, top: number, guiTicks: number): void;
    render(guiGraphics: GuiGraphics, deltaTracker: DeltaTracker): void;
    shouldRenderOverlay(mc: Minecraft, player: Player, guiGraphics: GuiGraphics, guiTicks: number): boolean;
  }


  interface BaseOverlay extends Layer {}
  class BaseOverlay extends Layer {
    render(var1: Minecraft, var2: Player, var3: GuiGraphics, var4: number, var5: number, var6: number, var7: number): void;
    render(guiGraphics: GuiGraphics, deltaTracker: DeltaTracker): void;
    shouldRenderOverlay(minecraft: Minecraft, player: Player, guiGraphics: GuiGraphics, guiTicks: number): boolean;
  }

}

declare module 'vectorwing.farmersdelight.client.model' {
  import { BakedModelWrapper } from 'net.neoforged.neoforge.client.model';
  import { BakedModel } from 'net.minecraft.client.resources.model';
  import { ItemDisplayContext, ItemStack } from 'net.minecraft.world.item';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { List } from 'java.util';

  interface WrappedItemModel<T extends BakedModel = any> extends BakedModelWrapper<T> {}
  class WrappedItemModel<T extends BakedModel = any> extends BakedModelWrapper<T> {
    constructor(originalModel: T);
    applyTransform(cameraTransformType: ItemDisplayContext, poseStack: PoseStack, applyLeftHandTransform: boolean): BakedModel;
    getRenderPasses(itemStack: ItemStack, fabulous: boolean): BakedModel[];
    isCustomRenderer(): boolean;
  }

}

declare module 'vectorwing.farmersdelight.client.particle' {
  import { TextureSheetParticle, ParticleRenderType } from 'net.minecraft.client.particle';

  interface StarParticle extends TextureSheetParticle {}
  class StarParticle extends TextureSheetParticle {
    get renderType(): ParticleRenderType;
    getQuadSize(scaleFactor: number): number;
    tick(): void;
  }


  interface SteamParticle extends TextureSheetParticle {}
  class SteamParticle extends TextureSheetParticle {
    get renderType(): ParticleRenderType;
    tick(): void;
  }

}

declare module 'vectorwing.farmersdelight.client.particle.StarParticle' {
  import { ParticleProvider, SpriteSet, Particle } from 'net.minecraft.client.particle';
  import { SimpleParticleType } from 'net.minecraft.core.particles';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';

  interface Factory extends ParticleProvider<SimpleParticleType> {}
  class Factory extends ParticleProvider<SimpleParticleType> {
    constructor(sprite: SpriteSet);
    createParticle(typeIn: SimpleParticleType, level: ClientLevel, x: number, y: number, z: number, xSpeed: number, ySpeed: number, zSpeed: number): Particle;
  }

}

declare module 'vectorwing.farmersdelight.client.particle.SteamParticle' {
  import { ParticleProvider, SpriteSet, Particle } from 'net.minecraft.client.particle';
  import { SimpleParticleType } from 'net.minecraft.core.particles';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';

  interface Factory extends ParticleProvider<SimpleParticleType> {}
  class Factory extends ParticleProvider<SimpleParticleType> {
    constructor(sprite: SpriteSet);
    createParticle(typeIn: SimpleParticleType, level: ClientLevel, x: number, y: number, z: number, xSpeed: number, ySpeed: number, zSpeed: number): Particle;
  }

}

declare module 'vectorwing.farmersdelight.client.recipebook' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { RecipeBookCategories } from 'net.minecraft.client';
  import { RegisterRecipeBookCategoriesEvent } from 'net.neoforged.neoforge.client.event';

  interface CookingPotRecipeBookTab extends Enum<CookingPotRecipeBookTab> {}
  class CookingPotRecipeBookTab extends Enum<CookingPotRecipeBookTab> {
    static readonly MEALS: CookingPotRecipeBookTab;
    static readonly DRINKS: CookingPotRecipeBookTab;
    static readonly MISC: CookingPotRecipeBookTab;
    static findByName(name: string): CookingPotRecipeBookTab;
    get serializedName(): string;
    toString(): string;
    static valueOf(name: string): CookingPotRecipeBookTab;
    static values(): CookingPotRecipeBookTab[];
  }


  class RecipeCategories {
    static COOKING_SEARCH: RecipeBookCategories;
    static COOKING_MEALS: RecipeBookCategories;
    static COOKING_DRINKS: RecipeBookCategories;
    static COOKING_MISC: RecipeBookCategories;
    static init(event: RegisterRecipeBookCategoriesEvent): void;
  }

}

declare module 'vectorwing.farmersdelight.client.renderer' {
  import { SignRenderer, BlockEntityRenderer } from 'net.minecraft.client.renderer.blockentity';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Context } from 'BlockEntityRendererProvider';
  import { SignBlockEntity } from 'net.minecraft.world.level.block.entity';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource, BlockEntityWithoutLevelRenderer } from 'net.minecraft.client.renderer';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { Material } from 'net.minecraft.client.resources.model';
  import { DyeColor, ItemStack, ItemDisplayContext } from 'net.minecraft.world.item';
  import { CuttingBoardBlockEntity, SkilletBlockEntity, StoveBlockEntity } from 'vectorwing.farmersdelight.common.block.entity';

  interface CanvasSignRenderer extends SignRenderer {}
  class CanvasSignRenderer extends SignRenderer {
    static readonly TEXT_OFFSET: Vec3;
    constructor(context: Context);
    get customVerticalOffset(): number;
    getCanvasSignMaterial(dyeColor: DyeColor): Material;
    static isOutlineVisible(pos: BlockPos, textColor: number): boolean;
    render(blockEntity: SignBlockEntity, partialTick: number, poseStack: PoseStack, bufferSource: MultiBufferSource, packedLight: number, packedOverlay: number): void;
  }


  interface CuttingBoardRenderer extends BlockEntityRenderer<CuttingBoardBlockEntity> {}
  class CuttingBoardRenderer extends BlockEntityRenderer<CuttingBoardBlockEntity> {
    constructor(pContext: Context);
    render(cuttingBoardEntity: CuttingBoardBlockEntity, partialTicks: number, poseStack: PoseStack, buffer: MultiBufferSource, combinedLight: number, combinedOverlay: number): void;
    renderBlock(matrixStackIn: PoseStack, direction: Direction): void;
    renderItemCarved(matrixStackIn: PoseStack, direction: Direction, itemStack: ItemStack): void;
    renderItemLayingDown(matrixStackIn: PoseStack, direction: Direction): void;
  }


  interface HangingCanvasSignRenderer extends CanvasSignRenderer {}
  class HangingCanvasSignRenderer extends CanvasSignRenderer {
    constructor(context: Context);
    get customVerticalOffset(): number;
    get signModelRenderScale(): number;
    get signTextRenderScale(): number;
    getCanvasSignMaterial(dyeColor: DyeColor): Material;
    render(blockEntity: SignBlockEntity, partialTick: number, poseStack: PoseStack, bufferSource: MultiBufferSource, packedLight: number, packedOverlay: number): void;
  }


  interface SkilletItemRenderer extends BlockEntityWithoutLevelRenderer {}
  class SkilletItemRenderer extends BlockEntityWithoutLevelRenderer {
    constructor();
    renderByItem(stack: ItemStack, displayContext: ItemDisplayContext, poseStack: PoseStack, buffer: MultiBufferSource, packedLight: number, packedOverlay: number): void;
  }


  interface SkilletRenderer extends BlockEntityRenderer<SkilletBlockEntity> {}
  class SkilletRenderer extends BlockEntityRenderer<SkilletBlockEntity> {
    constructor(context: Context);
    render(skilletEntity: SkilletBlockEntity, partialTicks: number, poseStack: PoseStack, buffer: MultiBufferSource, combinedLight: number, combinedOverlay: number): void;
  }


  interface StoveRenderer extends BlockEntityRenderer<StoveBlockEntity> {}
  class StoveRenderer extends BlockEntityRenderer<StoveBlockEntity> {
    constructor(context: Context);
    render(stoveEntity: StoveBlockEntity, partialTicks: number, poseStack: PoseStack, buffer: MultiBufferSource, combinedLightIn: number, combinedOverlayIn: number): void;
  }

}

declare module 'vectorwing.farmersdelight.common.advancement' {
  import { SimpleCriterionTrigger } from 'net.minecraft.advancements.critereon';
  import { TriggerInstance } from 'vectorwing.farmersdelight.common.advancement.CuttingBoardTrigger';
  import { Codec } from 'com.mojang.serialization';
  import { ServerPlayer } from 'net.minecraft.server.level';

  interface CuttingBoardTrigger extends SimpleCriterionTrigger<TriggerInstance> {}
  class CuttingBoardTrigger extends SimpleCriterionTrigger<TriggerInstance> {
    codec(): Codec<TriggerInstance>;
    trigger(player: ServerPlayer): void;
  }

}

declare module 'vectorwing.farmersdelight.common.block' {
  import { BaseEntityBlock, SimpleWaterloggedBlock, RenderShape, Block, Rotation, Mirror, BushBlock, BonemealableBlock, CropBlock, CeilingHangingSignBlock, EntityBlock, LiquidBlockContainer, FarmBlock, IronBarsBlock, StandingSignBlock, HayBlock, HorizontalDirectionalBlock, WallSignBlock, WallHangingSignBlock, FlowerBlock, DoublePlantBlock } from 'net.minecraft.world.level.block';
  import { MapCodec } from 'com.mojang.serialization';
  import { DirectionProperty, BooleanProperty, IntegerProperty, EnumProperty } from 'net.minecraft.world.level.block.state.properties';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { ImmutableMap } from 'com.google.common.collect';
  import { Properties } from 'BlockBehaviour';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockGetter, Level, LevelAccessor, LevelReader } from 'net.minecraft.world.level';
  import { BlockPos, Direction, Holder } from 'net.minecraft.core';
  import { InteractionResult, ItemInteractionResult, InteractionHand } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BlockHitResult } from 'net.minecraft.world.phys';
  import { FluidState, Fluid } from 'net.minecraft.world.level.material';
  import { BlockPlaceContext, UseOnContext } from 'net.minecraft.world.item.context';
  import { BlockEntity, BlockEntityTicker, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { RandomSource } from 'net.minecraft.util';
  import { Entity, LivingEntity, Mob } from 'net.minecraft.world.entity';
  import { ItemStack, DyeColor, Item } from 'net.minecraft.world.item';
  import { CanvasSign } from 'vectorwing.farmersdelight.common.block.state';
  import { Supplier } from 'java.util.function';
  import { PathComputationType, PathType } from 'net.minecraft.world.level.pathfinder';
  import { List } from 'java.util';
  import { ItemAbility, IShearable } from 'net.neoforged.neoforge.common';
  import { TriState } from 'net.neoforged.neoforge.common.util';
  import { MobEffect } from 'net.minecraft.world.effect';

  interface BasketBlock extends SimpleWaterloggedBlock, BaseEntityBlock {}
  class BasketBlock extends SimpleWaterloggedBlock {
    static readonly CODEC: MapCodec;
    static readonly FACING: DirectionProperty;
    static readonly ENABLED: BooleanProperty;
    static readonly WATERLOGGED: BooleanProperty;
    static readonly OUT_SHAPE: VoxelShape;
    static readonly RENDER_SHAPE: VoxelShape;
    static readonly COLLISION_SHAPE_FACING: ImmutableMap;
    constructor(properties: Properties);
    getAnalogOutputSignal(state: BlockState, level: Level, pos: BlockPos): number;
    getFluidState(state: BlockState): FluidState;
    getInteractionShape(state: BlockState, level: BlockGetter, pos: BlockPos): VoxelShape;
    getOcclusionShape(state: BlockState, level: BlockGetter, pos: BlockPos): VoxelShape;
    getRenderShape(state: BlockState): RenderShape;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    getTicker<T extends BlockEntity>(level: Level, state: BlockState, blockEntityType: BlockEntityType<T>): BlockEntityTicker<T>;
    hasAnalogOutputSignal(state: BlockState): boolean;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    neighborChanged(state: BlockState, level: Level, pos: BlockPos, block: Block, fromPos: BlockPos, isMoving: boolean): void;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    rotate(state: BlockState, rotation: Rotation): BlockState;
    updateShape(state: BlockState, facing: Direction, facingState: BlockState, level: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useShapeForLightOcclusion(state: BlockState): boolean;
    useWithoutItem(state: BlockState, level: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface BuddingBushBlock extends BushBlock {}
  class BuddingBushBlock extends BushBlock {
    static readonly CODEC: MapCodec;
    static readonly MAX_AGE: number;
    static readonly AGE: IntegerProperty;
    constructor(properties: Properties);
    canGrowPastMaxAge(): boolean;
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    entityInside(state: BlockState, level: Level, pos: BlockPos, entity: Entity): void;
    get ageProperty(): IntegerProperty;
    get maxAge(): number;
    getCloneItemStack(level: LevelReader, pos: BlockPos, state: BlockState): ItemStack;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForAge(age: number): BlockState;
    growPastMaxAge(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
    static hasSufficientLight(level: LevelReader, pos: BlockPos): boolean;
    isMaxAge(state: BlockState): boolean;
    isRandomlyTicking(state: BlockState): boolean;
    randomTick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
  }


  interface BuddingTomatoBlock extends BonemealableBlock, BuddingBushBlock {}
  class BuddingTomatoBlock extends BonemealableBlock {
    constructor(properties: Properties);
    canGrowPastMaxAge(): boolean;
    growPastMaxAge(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
    isBonemealSuccess(level: Level, random: RandomSource, pos: BlockPos, state: BlockState): boolean;
    isValidBonemealTarget(level: LevelReader, pos: BlockPos, state: BlockState): boolean;
    performBonemeal(level: ServerLevel, random: RandomSource, pos: BlockPos, state: BlockState): void;
    updateShape(state: BlockState, facing: Direction, facingState: BlockState, level: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }


  interface CabbageBlock extends CropBlock {}
  class CabbageBlock extends CropBlock {
    constructor(properties: Properties);
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
  }


  interface CabinetBlock extends BaseEntityBlock {}
  class CabinetBlock extends BaseEntityBlock {
    static readonly CODEC: MapCodec;
    static readonly FACING: DirectionProperty;
    static readonly OPEN: BooleanProperty;
    constructor(properties: Properties);
    getAnalogOutputSignal(blockState: BlockState, level: Level, pos: BlockPos): number;
    getRenderShape(state: BlockState): RenderShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    hasAnalogOutputSignal(state: BlockState): boolean;
    mirror(state: BlockState, mirrorIn: Mirror): BlockState;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    rotate(state: BlockState, rot: Rotation): BlockState;
    tick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
    useWithoutItem(state: BlockState, level: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface CanvasRugBlock extends Block {}
  class CanvasRugBlock extends Block {
    constructor(properties: Properties);
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    propagatesSkylightDown(state: BlockState, reader: BlockGetter, pos: BlockPos): boolean;
  }


  interface CeilingHangingCanvasSignBlock extends CanvasSign, CeilingHangingSignBlock {}
  class CeilingHangingCanvasSignBlock extends CanvasSign {
    constructor(backgroundColor: DyeColor);
    get backgroundColor(): DyeColor;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    setPlacedBy(level: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
  }


  interface CookingPotBlock extends SimpleWaterloggedBlock, EntityBlock, Block {}
  class CookingPotBlock extends SimpleWaterloggedBlock {
    static readonly CODEC: MapCodec;
    static readonly FACING: DirectionProperty;
    static readonly SUPPORT: EnumProperty;
    static readonly WATERLOGGED: BooleanProperty;
    constructor(properties: Properties);
    animateTick(state: BlockState, level: Level, pos: BlockPos, random: RandomSource): void;
    getAnalogOutputSignal(blockState: BlockState, level: Level, pos: BlockPos): number;
    getCloneItemStack(level: LevelReader, pos: BlockPos, state: BlockState): ItemStack;
    getCollisionShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getFluidState(state: BlockState): FluidState;
    getRenderShape(pState: BlockState): RenderShape;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    getTicker<T extends BlockEntity>(level: Level, state: BlockState, blockEntity: BlockEntityType<T>): BlockEntityTicker<T>;
    hasAnalogOutputSignal(state: BlockState): boolean;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    updateShape(state: BlockState, facing: Direction, facingState: BlockState, level: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useItemOn(heldStack: ItemStack, state: BlockState, level: Level, pos: BlockPos, player: Player, hand: InteractionHand, result: BlockHitResult): ItemInteractionResult;
  }


  interface CuttingBoardBlock extends SimpleWaterloggedBlock, BaseEntityBlock {}
  class CuttingBoardBlock extends SimpleWaterloggedBlock {
    static readonly CODEC: MapCodec;
    static readonly FACING: DirectionProperty;
    static readonly WATERLOGGED: BooleanProperty;
    constructor(properties: Properties);
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    getAnalogOutputSignal(state: BlockState, level: Level, pos: BlockPos): number;
    getFluidState(state: BlockState): FluidState;
    getRenderShape(pState: BlockState): RenderShape;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    hasAnalogOutputSignal(state: BlockState): boolean;
    isPossibleToRespawnInThis(state: BlockState): boolean;
    mirror(pState: BlockState, pMirror: Mirror): BlockState;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    rotate(pState: BlockState, pRot: Rotation): BlockState;
    static spawnCuttingParticles(level: Level, pos: BlockPos, stack: ItemStack, count: number): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, level: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useItemOn(stack: ItemStack, state: BlockState, level: Level, pos: BlockPos, player: Player, hand: InteractionHand, hit: BlockHitResult): ItemInteractionResult;
  }


  interface FeastBlock extends Block {}
  class FeastBlock extends Block {
    static readonly FACING: DirectionProperty;
    static readonly SERVINGS: IntegerProperty;
    readonly servingItem: Supplier;
    readonly hasLeftovers: boolean;
    constructor(properties: Properties, servingItem: Supplier<Item>, hasLeftovers: boolean);
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    get maxServings(): number;
    get servingsProperty(): IntegerProperty;
    getAnalogOutputSignal(blockState: BlockState, level: Level, pos: BlockPos): number;
    getServingItem(state: BlockState): ItemStack;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    hasAnalogOutputSignal(state: BlockState): boolean;
    isPathfindable(state: BlockState, type: PathComputationType): boolean;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, level: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useItemOn(heldStack: ItemStack, state: BlockState, level: Level, pos: BlockPos, player: Player, hand: InteractionHand, hit: BlockHitResult): ItemInteractionResult;
  }


  interface HoneyGlazedHamBlock extends FeastBlock {}
  class HoneyGlazedHamBlock extends FeastBlock {
    constructor(properties: Properties, servingItem: Supplier<Item>, hasLeftovers: boolean);
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
  }


  interface MushroomColonyBlock extends BonemealableBlock, BushBlock {}
  class MushroomColonyBlock extends BonemealableBlock {
    static readonly CODEC: MapCodec;
    static readonly PLACING_LIGHT_LEVEL: number;
    readonly mushroomType: Holder;
    static readonly COLONY_AGE: IntegerProperty;
    constructor(mushroomType: Holder<Item>, properties: Properties);
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    get ageProperty(): IntegerProperty;
    get maxAge(): number;
    getCloneItemStack(level: LevelReader, pos: BlockPos, state: BlockState): ItemStack;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    isBonemealSuccess(level: Level, random: RandomSource, pos: BlockPos, state: BlockState): boolean;
    isValidBonemealTarget(level: LevelReader, pos: BlockPos, state: BlockState): boolean;
    performBonemeal(level: ServerLevel, random: RandomSource, pos: BlockPos, state: BlockState): void;
    randomTick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
    useItemOn(heldStack: ItemStack, state: BlockState, level: Level, pos: BlockPos, player: Player, hand: InteractionHand, hit: BlockHitResult): ItemInteractionResult;
  }


  interface OnionBlock extends CropBlock {}
  class OnionBlock extends CropBlock {
    constructor(properties: Properties);
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
  }


  interface OrganicCompostBlock extends Block {}
  class OrganicCompostBlock extends Block {
    static COMPOSTING: IntegerProperty;
    constructor(properties: Properties);
    animateTick(state: BlockState, level: Level, pos: BlockPos, random: RandomSource): void;
    get maxCompostingStage(): number;
    getAnalogOutputSignal(blockState: BlockState, level: Level, pos: BlockPos): number;
    hasAnalogOutputSignal(state: BlockState): boolean;
    isRandomlyTicking(state: BlockState): boolean;
    randomTick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
  }


  interface PieBlock extends Block {}
  class PieBlock extends Block {
    static readonly FACING: DirectionProperty;
    static readonly BITES: IntegerProperty;
    readonly pieSlice: Supplier;
    constructor(properties: Properties, pieSlice: Supplier<Item>);
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    get maxBites(): number;
    get pieSliceItem(): ItemStack;
    getAnalogOutputSignal(blockState: BlockState, level: Level, pos: BlockPos): number;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    hasAnalogOutputSignal(state: BlockState): boolean;
    isPathfindable(state: BlockState, type: PathComputationType): boolean;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, level: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useItemOn(heldStack: ItemStack, state: BlockState, level: Level, pos: BlockPos, player: Player, hand: InteractionHand, hit: BlockHitResult): ItemInteractionResult;
  }


  interface RiceBaleBlock extends Block {}
  class RiceBaleBlock extends Block {
    static readonly FACING: DirectionProperty;
    constructor(properties: Properties);
    fallOn(level: Level, state: BlockState, pos: BlockPos, entityIn: Entity, fallDistance: number): void;
    getFireSpreadSpeed(state: BlockState, world: BlockGetter, pos: BlockPos, face: Direction): number;
    getFlammability(state: BlockState, world: BlockGetter, pos: BlockPos, face: Direction): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirrorIn: Mirror): BlockState;
    rotate(state: BlockState, rot: Rotation): BlockState;
  }


  interface RiceBlock extends BonemealableBlock, LiquidBlockContainer, BushBlock {}
  class RiceBlock extends BonemealableBlock {
    static readonly CODEC: MapCodec;
    static readonly AGE: IntegerProperty;
    static readonly SUPPORTING: BooleanProperty;
    constructor(properties: Properties);
    canPlaceLiquid(player: Player, level: BlockGetter, pos: BlockPos, state: BlockState, fluidIn: Fluid): boolean;
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    get ageProperty(): IntegerProperty;
    get maxAge(): number;
    getCloneItemStack(level: LevelReader, pos: BlockPos, state: BlockState): ItemStack;
    getFluidState(state: BlockState): FluidState;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    isBonemealSuccess(level: Level, rand: RandomSource, pos: BlockPos, state: BlockState): boolean;
    isSupportingRiceUpper(topState: BlockState): boolean;
    isValidBonemealTarget(level: LevelReader, pos: BlockPos, state: BlockState): boolean;
    performBonemeal(level: ServerLevel, rand: RandomSource, pos: BlockPos, state: BlockState): void;
    placeLiquid(level: LevelAccessor, pos: BlockPos, state: BlockState, fluidStateIn: FluidState): boolean;
    randomTick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, level: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    withAge(age: number): BlockState;
  }


  interface RicePaniclesBlock extends CropBlock {}
  class RicePaniclesBlock extends CropBlock {
    static readonly RICE_AGE: IntegerProperty;
    constructor(properties: Properties);
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    get ageProperty(): IntegerProperty;
    get maxAge(): number;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
  }


  interface RiceRollMedleyBlock extends FeastBlock {}
  class RiceRollMedleyBlock extends FeastBlock {
    static readonly ROLL_SERVINGS: IntegerProperty;
    readonly riceRollServings: List;
    constructor(properties: Properties);
    get maxServings(): number;
    get servingsProperty(): IntegerProperty;
    getServingItem(state: BlockState): ItemStack;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
  }


  interface RichSoilBlock extends Block {}
  class RichSoilBlock extends Block {
    constructor(properties: Properties);
    canSustainPlant(state: BlockState, world: BlockGetter, pos: BlockPos, facing: Direction, plantState: BlockState): TriState;
    getToolModifiedState(state: BlockState, context: UseOnContext, toolAction: ItemAbility, simulate: boolean): BlockState;
    randomTick(state: BlockState, level: ServerLevel, pos: BlockPos, rand: RandomSource): void;
  }


  interface RichSoilFarmlandBlock extends FarmBlock {}
  class RichSoilFarmlandBlock extends FarmBlock {
    constructor(properties: Properties);
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    canSustainPlant(state: BlockState, world: BlockGetter, pos: BlockPos, facing: Direction, plantState: BlockState): TriState;
    fallOn(level: Level, state: BlockState, pos: BlockPos, entity: Entity, fallDistance: number): void;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    isFertile(state: BlockState, world: BlockGetter, pos: BlockPos): boolean;
    randomTick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
    tick(state: BlockState, level: ServerLevel, pos: BlockPos, rand: RandomSource): void;
    static turnToRichSoil(entity: Entity, state: BlockState, level: Level, pos: BlockPos): void;
  }


  interface RoastChickenBlock extends FeastBlock {}
  class RoastChickenBlock extends FeastBlock {
    constructor(properties: Properties, servingItem: Supplier<Item>, hasLeftovers: boolean);
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
  }


  interface RopeBlock extends IronBarsBlock {}
  class RopeBlock extends IronBarsBlock {
    static readonly TIED_TO_BELL: BooleanProperty;
    constructor(properties: Properties);
    canBeReplaced(state: BlockState, useContext: BlockPlaceContext): boolean;
    getBlockSupportShape(pState: BlockState, pReader: BlockGetter, pPos: BlockPos): VoxelShape;
    getCollisionShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    isPathfindable(state: BlockState, type: PathComputationType): boolean;
    updateShape(state: BlockState, facing: Direction, facingState: BlockState, level: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useWithoutItem(state: BlockState, level: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface SafetyNetBlock extends SimpleWaterloggedBlock, Block {}
  class SafetyNetBlock extends SimpleWaterloggedBlock {
    static readonly WATERLOGGED: BooleanProperty;
    constructor(properties: Properties);
    fallOn(level: Level, state: BlockState, pos: BlockPos, entityIn: Entity, fallDistance: number): void;
    getFluidState(state: BlockState): FluidState;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    updateEntityAfterFallOn(level: BlockGetter, entityIn: Entity): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, level: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }


  interface SandyShrubBlock extends IShearable, BonemealableBlock, BushBlock {}
  class SandyShrubBlock extends IShearable {
    static readonly CODEC: MapCodec;
    constructor(properties: Properties);
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    isBonemealSuccess(level: Level, random: RandomSource, pos: BlockPos, state: BlockState): boolean;
    isValidBonemealTarget(level: LevelReader, pos: BlockPos, state: BlockState): boolean;
    performBonemeal(level: ServerLevel, random: RandomSource, pos: BlockPos, state: BlockState): void;
  }


  interface ShepherdsPieBlock extends FeastBlock {}
  class ShepherdsPieBlock extends FeastBlock {
    constructor(properties: Properties, servingItem: Supplier<Item>, hasLeftovers: boolean);
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
  }


  interface SkilletBlock extends SimpleWaterloggedBlock, BaseEntityBlock {}
  class SkilletBlock extends SimpleWaterloggedBlock {
    static readonly CODEC: MapCodec;
    static readonly MINIMUM_COOKING_TIME: number;
    static readonly FACING: DirectionProperty;
    static readonly SUPPORT: BooleanProperty;
    static readonly WATERLOGGED: BooleanProperty;
    constructor(properties: Properties);
    animateTick(stateIn: BlockState, level: Level, pos: BlockPos, rand: RandomSource): void;
    getCloneItemStack(level: LevelReader, pos: BlockPos, state: BlockState): ItemStack;
    getCollisionShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getFluidState(state: BlockState): FluidState;
    getRenderShape(pState: BlockState): RenderShape;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    static getSkilletCookingTime(originalCookingTime: number, fireAspectLevel: number): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    getTicker<T extends BlockEntity>(level: Level, state: BlockState, blockEntity: BlockEntityType<T>): BlockEntityTicker<T>;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    updateShape(state: BlockState, facing: Direction, facingState: BlockState, level: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useItemOn(stack: ItemStack, state: BlockState, level: Level, pos: BlockPos, player: Player, hand: InteractionHand, hit: BlockHitResult): ItemInteractionResult;
  }


  interface StandingCanvasSignBlock extends CanvasSign, StandingSignBlock {}
  class StandingCanvasSignBlock extends CanvasSign {
    constructor(backgroundColor: DyeColor);
    get backgroundColor(): DyeColor;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    setPlacedBy(level: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
  }


  interface StoveBlock extends BaseEntityBlock {}
  class StoveBlock extends BaseEntityBlock {
    static readonly CODEC: MapCodec;
    static readonly LIT: BooleanProperty;
    static readonly FACING: DirectionProperty;
    constructor(properties: Properties);
    animateTick(stateIn: BlockState, level: Level, pos: BlockPos, rand: RandomSource): void;
    extinguish(state: BlockState, level: Level, pos: BlockPos): void;
    getBlockPathType(state: BlockState, world: BlockGetter, pos: BlockPos, entity: Mob): PathType;
    getRenderShape(pState: BlockState): RenderShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    getTicker<T extends BlockEntity>(level: Level, state: BlockState, blockEntityType: BlockEntityType<T>): BlockEntityTicker<T>;
    mirror(pState: BlockState, pMirror: Mirror): BlockState;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    rotate(pState: BlockState, pRot: Rotation): BlockState;
    stepOn(level: Level, pos: BlockPos, state: BlockState, entity: Entity): void;
  }


  interface StrawBaleBlock extends HayBlock {}
  class StrawBaleBlock extends HayBlock {
    constructor(properties: Properties);
    getFireSpreadSpeed(state: BlockState, world: BlockGetter, pos: BlockPos, face: Direction): number;
    getFlammability(state: BlockState, world: BlockGetter, pos: BlockPos, face: Direction): number;
  }


  interface TatamiBlock extends Block {}
  class TatamiBlock extends Block {
    static readonly FACING: DirectionProperty;
    static readonly PAIRED: BooleanProperty;
    constructor(properties: Properties);
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirrorIn: Mirror): BlockState;
    rotate(state: BlockState, rot: Rotation): BlockState;
    setPlacedBy(level: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, level: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }


  interface TatamiHalfMatBlock extends HorizontalDirectionalBlock {}
  class TatamiHalfMatBlock extends HorizontalDirectionalBlock {
    static readonly CODEC: MapCodec;
    constructor(properties: Properties);
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, level: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }


  interface TatamiMatBlock extends HorizontalDirectionalBlock {}
  class TatamiMatBlock extends HorizontalDirectionalBlock {
    static readonly CODEC: MapCodec;
    static readonly PART: EnumProperty;
    constructor(properties: Properties);
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    getRenderShape(state: BlockState): RenderShape;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    playerWillDestroy(level: Level, pos: BlockPos, state: BlockState, player: Player): BlockState;
    setPlacedBy(level: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, level: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }


  interface TomatoVineBlock extends CropBlock {}
  class TomatoVineBlock extends CropBlock {
    static readonly VINE_AGE: IntegerProperty;
    static readonly ROPELOGGED: BooleanProperty;
    constructor(properties: Properties);
    attemptRopeClimb(level: ServerLevel, pos: BlockPos, random: RandomSource): void;
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    static destroyAndPlaceRope(level: Level, pos: BlockPos): void;
    get ageProperty(): IntegerProperty;
    get maxAge(): number;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForAge(age: number): BlockState;
    hasGoodCropConditions(level: LevelReader, pos: BlockPos): boolean;
    isLadder(state: BlockState, level: LevelReader, pos: BlockPos, entity: LivingEntity): boolean;
    isRandomlyTicking(state: BlockState): boolean;
    performBonemeal(level: ServerLevel, random: RandomSource, pos: BlockPos, state: BlockState): void;
    playerDestroy(level: Level, player: Player, pos: BlockPos, state: BlockState, blockEntity: BlockEntity, stack: ItemStack): void;
    randomTick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
    tick(state: BlockState, level: ServerLevel, pos: BlockPos, random: RandomSource): void;
    updateShape(state: BlockState, facing: Direction, facingState: BlockState, level: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useWithoutItem(state: BlockState, level: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface WallCanvasSignBlock extends CanvasSign, WallSignBlock {}
  class WallCanvasSignBlock extends CanvasSign {
    constructor(properties: Properties, backgroundColor: DyeColor);
    get backgroundColor(): DyeColor;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    setPlacedBy(level: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
  }


  interface WallHangingCanvasSignBlock extends CanvasSign, WallHangingSignBlock {}
  class WallHangingCanvasSignBlock extends CanvasSign {
    constructor(properties: Properties, backgroundColor: DyeColor);
    get backgroundColor(): DyeColor;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    setPlacedBy(level: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
  }


  interface WildCropBlock extends BonemealableBlock, FlowerBlock {}
  class WildCropBlock extends BonemealableBlock {
    constructor(suspiciousStewEffect: Holder<MobEffect>, effectDuration: number, properties: Properties);
    canBeReplaced(state: BlockState, useContext: BlockPlaceContext): boolean;
    getFireSpreadSpeed(state: BlockState, world: BlockGetter, pos: BlockPos, face: Direction): number;
    getFlammability(state: BlockState, world: BlockGetter, pos: BlockPos, face: Direction): number;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    isBonemealSuccess(level: Level, rand: RandomSource, pos: BlockPos, state: BlockState): boolean;
    isValidBonemealTarget(level: LevelReader, pos: BlockPos, state: BlockState): boolean;
    performBonemeal(level: ServerLevel, random: RandomSource, pos: BlockPos, state: BlockState): void;
  }


  interface WildRiceBlock extends SimpleWaterloggedBlock, BonemealableBlock, DoublePlantBlock {}
  class WildRiceBlock extends SimpleWaterloggedBlock {
    static readonly WATERLOGGED: BooleanProperty;
    constructor(properties: Properties);
    canBeReplaced(state: BlockState, useContext: BlockPlaceContext): boolean;
    canPlaceLiquid(player: Player, level: BlockGetter, pos: BlockPos, state: BlockState, fluidIn: Fluid): boolean;
    canSurvive(state: BlockState, level: LevelReader, pos: BlockPos): boolean;
    getFluidState(state: BlockState): FluidState;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    isBonemealSuccess(level: Level, rand: RandomSource, pos: BlockPos, state: BlockState): boolean;
    isValidBonemealTarget(level: LevelReader, pos: BlockPos, state: BlockState): boolean;
    performBonemeal(level: ServerLevel, random: RandomSource, pos: BlockPos, state: BlockState): void;
    setPlacedBy(level: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, level: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }

}

declare module 'vectorwing.farmersdelight.common.block.CuttingBoardBlock' {
  import { RightClickBlock } from 'PlayerInteractEvent';

  class ToolCarvingEvent {
    static onSneakPlaceTool(event: RightClickBlock): void;
  }

}

declare module 'vectorwing.farmersdelight.common.block.entity' {
  import { Container, MenuProvider, Nameable } from 'net.minecraft.world';
  import { VoxelShape } from 'net.minecraft.world.phys.shapes';
  import { BooleanSupplier } from 'java.util.function';
  import { Level } from 'net.minecraft.world.level';
  import { List, Map, Optional } from 'java.util';
  import { ItemEntity } from 'net.minecraft.world.entity.item';
  import { ItemStack } from 'net.minecraft.world.item';
  import { RandomizableContainerBlockEntity, SignBlockEntity, BlockEntityType, HangingSignBlockEntity, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockPos, NonNullList } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { RegisterCapabilitiesEvent } from 'net.neoforged.neoforge.capabilities';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { Player, Inventory } from 'net.minecraft.world.entity.player';
  import { RecipeCraftingHolder, AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { RecipeHolder, CampfireCookingRecipe } from 'net.minecraft.world.item.crafting';
  import { Vec3, Vec2 } from 'net.minecraft.world.phys';
  import { ItemStackHandler, IItemHandler } from 'net.neoforged.neoforge.items';
  import { Component } from 'net.minecraft.network.chat';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { ClientboundBlockEntityDataPacket } from 'net.minecraft.network.protocol.game';

  interface Basket extends Container {}
  class Basket extends Container {
    static readonly COLLECTION_AREA_SHAPES: VoxelShape[];
    static canMergeItems(stack1: ItemStack, stack2: ItemStack): boolean;
    collectItem(itemEntity: ItemEntity): boolean;
    collectItems(level: Level, facingIndex: number): boolean;
    get levelX(): number;
    get levelY(): number;
    get levelZ(): number;
    getFacingCollectionArea(facingIndex: number): VoxelShape;
    getItemsToCollect(level: Level, facingIndex: number): ItemEntity[];
    insert(stack: ItemStack): ItemStack;
    insert(slot: number, stack: ItemStack): ItemStack;
    isOnCooldown(): boolean;
    isOnCustomCooldown(): boolean;
    setCooldown(var1: number): void;
    tryTransfer(var1: BooleanSupplier): void;
  }


  interface BasketBlockEntity extends Basket, RandomizableContainerBlockEntity {}
  class BasketBlockEntity extends Basket {
    constructor(pos: BlockPos, state: BlockState);
    get containerSize(): number;
    get levelX(): number;
    get levelY(): number;
    get levelZ(): number;
    isOnCooldown(): boolean;
    isOnCustomCooldown(): boolean;
    static pushItemsTick(level: Level, pos: BlockPos, state: BlockState, blockEntity: BasketBlockEntity): void;
    static registerCapabilities(event: RegisterCapabilitiesEvent): void;
    removeItem(index: number, count: number): ItemStack;
    saveAdditional(compound: CompoundTag, registries: Provider): void;
    setCooldown(ticks: number): void;
    setItem(index: number, stack: ItemStack): void;
    tryTransfer(transfer: BooleanSupplier): void;
  }


  interface CabinetBlockEntity extends RandomizableContainerBlockEntity {}
  class CabinetBlockEntity extends RandomizableContainerBlockEntity {
    constructor(pos: BlockPos, state: BlockState);
    get containerSize(): number;
    loadAdditional(compound: CompoundTag, registries: Provider): void;
    recheckOpen(): void;
    static registerCapabilities(event: RegisterCapabilitiesEvent): void;
    saveAdditional(compound: CompoundTag, registries: Provider): void;
    startOpen(pPlayer: Player): void;
    stopOpen(pPlayer: Player): void;
  }


  interface CanvasSignBlockEntity extends SignBlockEntity {}
  class CanvasSignBlockEntity extends SignBlockEntity {
    constructor(pos: BlockPos, state: BlockState);
    get type(): BlockEntityType<any>;
    isValidBlockState(state: BlockState): boolean;
  }


  interface CookingPotBlockEntity extends MenuProvider, HeatableBlockEntity, Nameable, RecipeCraftingHolder, SyncedBlockEntity {}
  class CookingPotBlockEntity extends MenuProvider {
    static readonly MEAL_DISPLAY_SLOT: number;
    static readonly CONTAINER_SLOT: number;
    static readonly OUTPUT_SLOT: number;
    static readonly INVENTORY_SIZE: number;
    static readonly INGREDIENT_REMAINDER_OVERRIDES: Map;
    constructor(pos: BlockPos, state: BlockState);
    static animationTick(level: Level, pos: BlockPos, state: BlockState, cookingPot: CookingPotBlockEntity): void;
    awardUsedRecipes(player: Player, items: ItemStack[]): void;
    static cookingTick(level: Level, pos: BlockPos, state: BlockState, cookingPot: CookingPotBlockEntity): void;
    createMenu(id: number, player: Inventory, entity: Player): AbstractContainerMenu;
    get(index: number): number;
    get asItem(): ItemStack;
    get container(): ItemStack;
    get count(): number;
    get customName(): Component;
    get displayName(): Component;
    get droppableInventory(): NonNullList<ItemStack>;
    get inventory(): ItemStackHandler;
    get meal(): ItemStack;
    get name(): Component;
    get recipeUsed(): RecipeHolder<any>;
    static getContainerFromItem(cookingPotStack: ItemStack): ItemStack;
    static getMealFromItem(cookingPotStack: ItemStack): ItemStack;
    getUpdateTag(registries: Provider): CompoundTag;
    getUsedRecipesAndPopExperience(level: Level, pos: Vec3): RecipeHolder<any>[];
    isContainerValid(containerItem: ItemStack): boolean;
    isHeated(): boolean;
    isHeated(level: Level, pos: BlockPos): boolean;
    loadAdditional(compound: CompoundTag, registries: Provider): void;
    static registerCapabilities(event: RegisterCapabilitiesEvent): void;
    removeComponentsFromTag(tag: CompoundTag): void;
    saveAdditional(compound: CompoundTag, registries: Provider): void;
    set(index: number, value: number): void;
    set recipeUsed(recipe: RecipeHolder<any>);
    setRemoved(): void;
    static takeServingFromItem(cookingPotStack: ItemStack): void;
    useHeldItemOnMeal(container: ItemStack): ItemStack;
    writeMeal(compound: CompoundTag, registries: Provider): CompoundTag;
  }


  interface CuttingBoardBlockEntity extends SyncedBlockEntity {}
  class CuttingBoardBlockEntity extends SyncedBlockEntity {
    constructor(pos: BlockPos, state: BlockState);
    addItem(itemStack: ItemStack): boolean;
    carveToolOnBoard(tool: ItemStack): boolean;
    get inventory(): IItemHandler;
    get storedItem(): ItemStack;
    getSlotLimit(slot: number): number;
    isEmpty(): boolean;
    isItemCarvingBoard(): boolean;
    loadAdditional(compound: CompoundTag, registries: Provider): void;
    playProcessingSound(sound: SoundEvent, tool: ItemStack, boardItem: ItemStack): void;
    playSound(sound: SoundEvent, volume: number, pitch: number): void;
    processStoredItemUsingTool(toolStack: ItemStack, player: Player): boolean;
    static registerCapabilities(event: RegisterCapabilitiesEvent): void;
    removeItem(): ItemStack;
    saveAdditional(compound: CompoundTag, registries: Provider): void;
    setRemoved(): void;
  }


  interface HangingCanvasSignBlockEntity extends HangingSignBlockEntity {}
  class HangingCanvasSignBlockEntity extends HangingSignBlockEntity {
    constructor(pos: BlockPos, state: BlockState);
    get maxTextLineWidth(): number;
    get textLineHeight(): number;
    get type(): BlockEntityType<any>;
    isValidBlockState(state: BlockState): boolean;
  }


  class HeatableBlockEntity {
    isHeated(level: Level, pos: BlockPos): boolean;
    requiresDirectHeat(): boolean;
  }


  interface SkilletBlockEntity extends HeatableBlockEntity, SyncedBlockEntity {}
  class SkilletBlockEntity extends HeatableBlockEntity {
    constructor(pos: BlockPos, state: BlockState);
    addItemToCook(addedStack: ItemStack, player: Player): ItemStack;
    static animationTick(level: Level, pos: BlockPos, state: BlockState, skillet: SkilletBlockEntity): void;
    static cookingTick(level: Level, pos: BlockPos, state: BlockState, skillet: SkilletBlockEntity): void;
    get inventory(): IItemHandler;
    get skilletAsItem(): ItemStack;
    get storedStack(): ItemStack;
    hasStoredStack(): boolean;
    isCooking(): boolean;
    isHeated(): boolean;
    isHeated(level: Level, pos: BlockPos): boolean;
    loadAdditional(compound: CompoundTag, registries: Provider): void;
    removeItem(): ItemStack;
    saveAdditional(compound: CompoundTag, registries: Provider): void;
    setRemoved(): void;
    setSkilletItem(stack: ItemStack): void;
  }


  interface StoveBlockEntity extends SyncedBlockEntity {}
  class StoveBlockEntity extends SyncedBlockEntity {
    constructor(pos: BlockPos, state: BlockState);
    addItem(itemStackIn: ItemStack, recipe: RecipeHolder<CampfireCookingRecipe>, slot: number): boolean;
    static animationTick(level: Level, pos: BlockPos, state: BlockState, stove: StoveBlockEntity): void;
    static cookingTick(level: Level, pos: BlockPos, state: BlockState, stove: StoveBlockEntity): void;
    get inventory(): ItemStackHandler;
    get nextEmptySlot(): number;
    getMatchingRecipe(stack: ItemStack): Optional<RecipeHolder<CampfireCookingRecipe>>;
    getSlotLimit(slot: number): number;
    getStoveItemOffset(index: number): Vec2;
    getUpdateTag(registries: Provider): CompoundTag;
    isStoveBlockedAbove(): boolean;
    loadAdditional(tag: CompoundTag, registries: Provider): void;
    saveAdditional(compound: CompoundTag, registries: Provider): void;
  }


  interface SyncedBlockEntity extends BlockEntity {}
  class SyncedBlockEntity extends BlockEntity {
    constructor(tileEntityTypeIn: BlockEntityType<any>, pos: BlockPos, state: BlockState);
    get updatePacket(): ClientboundBlockEntityDataPacket;
    getUpdateTag(registries: Provider): CompoundTag;
  }

}

declare module 'vectorwing.farmersdelight.common.block.entity.container' {
  import { SlotItemHandler, IItemHandler, ItemStackHandler } from 'net.neoforged.neoforge.items';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player, Inventory, StackedContents } from 'net.minecraft.world.entity.player';
  import { RecipeBookMenu, ContainerData, RecipeBookType } from 'net.minecraft.world.inventory';
  import { RecipeWrapper } from 'net.neoforged.neoforge.items.wrapper';
  import { CookingPotRecipe } from 'vectorwing.farmersdelight.common.crafting';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { CookingPotBlockEntity } from 'vectorwing.farmersdelight.common.block.entity';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { Pair } from 'com.mojang.datafixers.util';
  import { RecipeHolder } from 'net.minecraft.world.item.crafting';

  interface CookingPotMealSlot extends SlotItemHandler {}
  class CookingPotMealSlot extends SlotItemHandler {
    constructor(inventoryIn: IItemHandler, index: number, xPosition: number, yPosition: number);
    mayPickup(playerIn: Player): boolean;
    mayPlace(stack: ItemStack): boolean;
  }


  interface CookingPotMenu extends RecipeBookMenu<RecipeWrapper, CookingPotRecipe> {}
  class CookingPotMenu extends RecipeBookMenu<RecipeWrapper, CookingPotRecipe> {
    static readonly EMPTY_CONTAINER_SLOT_BOWL: ResourceLocation;
    readonly blockEntity: CookingPotBlockEntity;
    readonly inventory: ItemStackHandler;
    constructor(windowId: number, playerInventory: Inventory, data: FriendlyByteBuf);

    constructor(windowId: number, playerInventory: Inventory, blockEntity: CookingPotBlockEntity, cookingPotDataIn: ContainerData);
    clearCraftingContent(): void;
    fillCraftSlotsStackedContents(helper: StackedContents): void;
    get cookProgressionScaled(): number;
    get gridHeight(): number;
    get gridWidth(): number;
    get noItemIcon(): Pair<ResourceLocation, ResourceLocation>;
    get recipeBookType(): RecipeBookType;
    get resultSlotIndex(): number;
    get size(): number;
    isHeated(): boolean;
    quickMoveStack(playerIn: Player, index: number): ItemStack;
    recipeMatches(recipe: RecipeHolder<CookingPotRecipe>): boolean;
    shouldMoveToInventory(slot: number): boolean;
    stillValid(playerIn: Player): boolean;
  }


  interface CookingPotResultSlot extends SlotItemHandler {}
  class CookingPotResultSlot extends SlotItemHandler {
    readonly tileEntity: CookingPotBlockEntity;
    constructor(player: Player, tile: CookingPotBlockEntity, inventoryIn: IItemHandler, index: number, xPosition: number, yPosition: number);
    mayPlace(stack: ItemStack): boolean;
    onTake(thePlayer: Player, stack: ItemStack): void;
    remove(amount: number): ItemStack;
  }

}

declare module 'vectorwing.farmersdelight.common.block.entity.dispenser' {
  import { OptionalDispenseItemBehavior, BlockSource } from 'net.minecraft.core.dispenser';
  import { Item, ItemStack } from 'net.minecraft.world.item';

  interface CuttingBoardDispenseBehavior extends OptionalDispenseItemBehavior {}
  class CuttingBoardDispenseBehavior extends OptionalDispenseItemBehavior {
    static readonly INSTANCE: CuttingBoardDispenseBehavior;
    dispense(source: BlockSource, stack: ItemStack): ItemStack;
    static registerBehaviour(item: Item, behavior: CuttingBoardDispenseBehavior): void;
    tryDispenseStackOnCuttingBoard(source: BlockSource, stack: ItemStack): boolean;
  }

}

declare module 'vectorwing.farmersdelight.common.block.entity.inventory' {
  import { InvWrapper } from 'net.neoforged.neoforge.items.wrapper';
  import { Basket } from 'vectorwing.farmersdelight.common.block.entity';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IItemHandler } from 'net.neoforged.neoforge.items';
  import { Direction } from 'net.minecraft.core';

  interface BasketInvWrapper extends InvWrapper {}
  class BasketInvWrapper extends InvWrapper {
    constructor(basket: Basket);
    insertItem(slot: number, stack: ItemStack, simulate: boolean): ItemStack;
  }


  interface CookingPotItemHandler extends IItemHandler {}
  class CookingPotItemHandler extends IItemHandler {
    constructor(itemHandler: IItemHandler, side: Direction);
    extractItem(slot: number, amount: number, simulate: boolean): ItemStack;
    get slots(): number;
    getSlotLimit(slot: number): number;
    getStackInSlot(slot: number): ItemStack;
    insertItem(slot: number, stack: ItemStack, simulate: boolean): ItemStack;
    isItemValid(slot: number, stack: ItemStack): boolean;
  }

}

declare module 'vectorwing.farmersdelight.common.block.state' {
  import { DyeColor } from 'net.minecraft.world.item';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class CanvasSign {
    get backgroundColor(): DyeColor;
    isDarkBackground(): boolean;
  }


  interface CookingPotSupport extends Enum<CookingPotSupport> {}
  class CookingPotSupport extends Enum<CookingPotSupport> {
    static readonly NONE: CookingPotSupport;
    static readonly TRAY: CookingPotSupport;
    static readonly HANDLE: CookingPotSupport;
    get serializedName(): string;
    toString(): string;
    static valueOf(name: string): CookingPotSupport;
    static values(): CookingPotSupport[];
  }

}

declare module 'vectorwing.farmersdelight.common' {
  import { FMLCommonSetupEvent } from 'net.neoforged.fml.event.lifecycle';
  import { ModConfigSpec } from 'net.neoforged.neoforge.common';
  import { BooleanValue, DoubleValue, ConfigValue, IntValue } from 'ModConfigSpec';
  import { EnumProxy } from 'net.neoforged.fml.common.asm.enumextension';
  import { FoodProperties } from 'net.minecraft.world.food';
  import { Map } from 'java.util';
  import { MobEffectInstance } from 'net.minecraft.world.effect';

  class CommonSetup {
    static init(event: FMLCommonSetupEvent): void;
    static registerDispenserBehaviors(): void;
    static registerItemSetAdditions(): void;
  }


  class Configuration {
    static COMMON_CONFIG: ModConfigSpec;
    static CLIENT_CONFIG: ModConfigSpec;
    static readonly CATEGORY_SETTINGS: string;
    static ENABLE_VANILLA_CROP_CRATES: BooleanValue;
    static FARMERS_BUY_FD_CROPS: BooleanValue;
    static WANDERING_TRADER_SELLS_FD_ITEMS: BooleanValue;
    static RICH_SOIL_BOOST_CHANCE: DoubleValue;
    static CUTTING_BOARD_FORTUNE_BONUS: DoubleValue;
    static ENABLE_ROPE_REELING: BooleanValue;
    static CANVAS_SIGN_DARK_BACKGROUND_LIST: ConfigValue;
    static readonly CATEGORY_FARMING: string;
    static DEFAULT_TOMATO_VINE_ROPE: ConfigValue;
    static ENABLE_TOMATO_VINE_CLIMBING_TAGGED_ROPES: BooleanValue;
    static readonly CATEGORY_RECIPE_BOOK: string;
    static ENABLE_RECIPE_BOOK_COOKING_POT: BooleanValue;
    static readonly CATEGORY_OVERRIDES: string;
    static VANILLA_SOUP_EXTRA_EFFECTS: BooleanValue;
    static RABBIT_STEW_BUFF: BooleanValue;
    static DISPENSER_TOOLS_CUTTING_BOARD: BooleanValue;
    static readonly CATEGORY_OVERRIDES_STACK_SIZE: string;
    static ENABLE_STACKABLE_SOUP_ITEMS: BooleanValue;
    static SOUP_ITEM_LIST: ConfigValue;
    static readonly CATEGORY_WORLD: string;
    static GENERATE_FD_CHEST_LOOT: BooleanValue;
    static GENERATE_VILLAGE_COMPOST_HEAPS: BooleanValue;
    static GENERATE_VILLAGE_FARM_FD_CROPS: BooleanValue;
    static GENERATE_WILD_CABBAGES: BooleanValue;
    static CHANCE_WILD_CABBAGES: IntValue;
    static GENERATE_WILD_BEETROOTS: BooleanValue;
    static CHANCE_WILD_BEETROOTS: IntValue;
    static GENERATE_WILD_POTATOES: BooleanValue;
    static CHANCE_WILD_POTATOES: IntValue;
    static GENERATE_WILD_ONIONS: BooleanValue;
    static CHANCE_WILD_ONIONS: IntValue;
    static GENERATE_WILD_CARROTS: BooleanValue;
    static CHANCE_WILD_CARROTS: IntValue;
    static GENERATE_WILD_TOMATOES: BooleanValue;
    static CHANCE_WILD_TOMATOES: IntValue;
    static GENERATE_WILD_RICE: BooleanValue;
    static CHANCE_WILD_RICE: IntValue;
    static GENERATE_BROWN_MUSHROOM_COLONIES: BooleanValue;
    static CHANCE_BROWN_MUSHROOM_COLONIES: IntValue;
    static GENERATE_RED_MUSHROOM_COLONIES: BooleanValue;
    static CHANCE_RED_MUSHROOM_COLONIES: IntValue;
    static readonly CATEGORY_CLIENT: string;
    static NOURISHED_HUNGER_OVERLAY: BooleanValue;
    static COMFORT_HEALTH_OVERLAY: BooleanValue;
    static FOOD_EFFECT_TOOLTIP: BooleanValue;
  }


  class EnumParameters {
    static readonly PROXY_COOKING_SEARCH: EnumProxy;
    static readonly PROXY_COOKING_MEALS: EnumProxy;
    static readonly PROXY_COOKING_DRINKS: EnumProxy;
    static readonly PROXY_COOKING_MISC: EnumProxy;
  }


  class FoodValues {
    static readonly BRIEF_DURATION: number;
    static readonly SHORT_DURATION: number;
    static readonly MEDIUM_DURATION: number;
    static readonly LONG_DURATION: number;
    static readonly CABBAGE: FoodProperties;
    static readonly TOMATO: FoodProperties;
    static readonly ONION: FoodProperties;
    static readonly APPLE_CIDER: FoodProperties;
    static readonly FRIED_EGG: FoodProperties;
    static readonly TOMATO_SAUCE: FoodProperties;
    static readonly WHEAT_DOUGH: FoodProperties;
    static readonly RAW_PASTA: FoodProperties;
    static readonly PIE_CRUST: FoodProperties;
    static readonly PUMPKIN_SLICE: FoodProperties;
    static readonly CABBAGE_LEAF: FoodProperties;
    static readonly MINCED_BEEF: FoodProperties;
    static readonly BEEF_PATTY: FoodProperties;
    static readonly CHICKEN_CUTS: FoodProperties;
    static readonly COOKED_CHICKEN_CUTS: FoodProperties;
    static readonly BACON: FoodProperties;
    static readonly COOKED_BACON: FoodProperties;
    static readonly COD_SLICE: FoodProperties;
    static readonly COOKED_COD_SLICE: FoodProperties;
    static readonly SALMON_SLICE: FoodProperties;
    static readonly COOKED_SALMON_SLICE: FoodProperties;
    static readonly MUTTON_CHOPS: FoodProperties;
    static readonly COOKED_MUTTON_CHOPS: FoodProperties;
    static readonly HAM: FoodProperties;
    static readonly SMOKED_HAM: FoodProperties;
    static readonly POPSICLE: FoodProperties;
    static readonly COOKIES: FoodProperties;
    static readonly CAKE_SLICE: FoodProperties;
    static readonly PIE_SLICE: FoodProperties;
    static readonly FRUIT_SALAD: FoodProperties;
    static readonly GLOW_BERRY_CUSTARD: FoodProperties;
    static readonly MIXED_SALAD: FoodProperties;
    static readonly NETHER_SALAD: FoodProperties;
    static readonly BARBECUE_STICK: FoodProperties;
    static readonly EGG_SANDWICH: FoodProperties;
    static readonly CHICKEN_SANDWICH: FoodProperties;
    static readonly HAMBURGER: FoodProperties;
    static readonly BACON_SANDWICH: FoodProperties;
    static readonly MUTTON_WRAP: FoodProperties;
    static readonly DUMPLINGS: FoodProperties;
    static readonly STUFFED_POTATO: FoodProperties;
    static readonly CABBAGE_ROLLS: FoodProperties;
    static readonly SALMON_ROLL: FoodProperties;
    static readonly COD_ROLL: FoodProperties;
    static readonly KELP_ROLL: FoodProperties;
    static readonly KELP_ROLL_SLICE: FoodProperties;
    static readonly COOKED_RICE: FoodProperties;
    static readonly BONE_BROTH: FoodProperties;
    static readonly BEEF_STEW: FoodProperties;
    static readonly VEGETABLE_SOUP: FoodProperties;
    static readonly FISH_STEW: FoodProperties;
    static readonly CHICKEN_SOUP: FoodProperties;
    static readonly FRIED_RICE: FoodProperties;
    static readonly PUMPKIN_SOUP: FoodProperties;
    static readonly BAKED_COD_STEW: FoodProperties;
    static readonly NOODLE_SOUP: FoodProperties;
    static readonly BACON_AND_EGGS: FoodProperties;
    static readonly RATATOUILLE: FoodProperties;
    static readonly STEAK_AND_POTATOES: FoodProperties;
    static readonly PASTA_WITH_MEATBALLS: FoodProperties;
    static readonly PASTA_WITH_MUTTON_CHOP: FoodProperties;
    static readonly MUSHROOM_RICE: FoodProperties;
    static readonly ROASTED_MUTTON_CHOPS: FoodProperties;
    static readonly VEGETABLE_NOODLES: FoodProperties;
    static readonly SQUID_INK_PASTA: FoodProperties;
    static readonly GRILLED_SALMON: FoodProperties;
    static readonly ROAST_CHICKEN: FoodProperties;
    static readonly STUFFED_PUMPKIN: FoodProperties;
    static readonly HONEY_GLAZED_HAM: FoodProperties;
    static readonly SHEPHERDS_PIE: FoodProperties;
    static readonly DOG_FOOD: FoodProperties;
    static readonly VANILLA_SOUP_EFFECTS: Map;
    static readonly RABBIT_STEW_BUFF: FoodProperties;
    static comfort(duration: number): MobEffectInstance;
    static nourishment(duration: number): MobEffectInstance;
  }

}

declare module 'vectorwing.farmersdelight.common.crafting.condition' {
  import { ICondition } from 'net.neoforged.neoforge.common.conditions';
  import { MapCodec } from 'com.mojang.serialization';
  import { IContext } from 'ICondition';

  interface VanillaCrateEnabledCondition extends ICondition {}
  class VanillaCrateEnabledCondition extends ICondition {
    static readonly CODEC: MapCodec;
    codec(): MapCodec<ICondition>;
    test(context: IContext): boolean;
  }

}

declare module 'vectorwing.farmersdelight.common.crafting' {
  import { Recipe, Ingredient, RecipeSerializer, RecipeType, CustomRecipe, CraftingBookCategory, CraftingInput } from 'net.minecraft.world.item.crafting';
  import { RecipeWrapper } from 'net.neoforged.neoforge.items.wrapper';
  import { CookingPotRecipeBookTab } from 'vectorwing.farmersdelight.client.recipebook';
  import { NonNullList } from 'net.minecraft.core';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Provider } from 'HolderLookup';
  import { Level } from 'net.minecraft.world.level';
  import { ChanceResult } from 'vectorwing.farmersdelight.common.crafting.ingredient';
  import { Optional, List } from 'java.util';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { RandomSource } from 'net.minecraft.util';

  interface CookingPotRecipe extends Recipe<RecipeWrapper> {}
  class CookingPotRecipe extends Recipe<RecipeWrapper> {
    static readonly INPUT_SLOTS: number;
    constructor(group: string, tab: CookingPotRecipeBookTab, inputItems: NonNullList<Ingredient>, output: ItemStack, container: ItemStack, experience: number, cookTime: number);
    assemble(inv: RecipeWrapper, provider: Provider): ItemStack;
    canCraftInDimensions(width: number, height: number): boolean;
    equals(o: any): boolean;
    get containerOverride(): ItemStack;
    get cookTime(): number;
    get experience(): number;
    get group(): string;
    get ingredients(): NonNullList<Ingredient>;
    get outputContainer(): ItemStack;
    get recipeBookTab(): CookingPotRecipeBookTab;
    get serializer(): RecipeSerializer<any>;
    get toastSymbol(): ItemStack;
    get type(): RecipeType<any>;
    getResultItem(provider: Provider): ItemStack;
    hashCode(): number;
    matches(inv: RecipeWrapper, level: Level): boolean;
  }


  interface CuttingBoardRecipe extends Recipe<CuttingBoardRecipeInput> {}
  class CuttingBoardRecipe extends Recipe<CuttingBoardRecipeInput> {
    static readonly MAX_RESULTS: number;
    constructor(group: string, input: Ingredient, tool: Ingredient, results: NonNullList<ChanceResult>, soundEvent: Optional<SoundEvent>);
    assemble(inv: CuttingBoardRecipeInput, provider: Provider): ItemStack;
    canCraftInDimensions(width: number, height: number): boolean;
    equals(o: any): boolean;
    get group(): string;
    get ingredients(): NonNullList<Ingredient>;
    get results(): ItemStack[];
    get rollableResults(): NonNullList<ChanceResult>;
    get serializer(): RecipeSerializer<any>;
    get soundEvent(): Optional<SoundEvent>;
    get tool(): Ingredient;
    get type(): RecipeType<any>;
    getResultItem(provider: Provider): ItemStack;
    hashCode(): number;
    isSpecial(): boolean;
    matches(input: CuttingBoardRecipeInput, level: Level): boolean;
    rollResults(rand: RandomSource, fortuneLevel: number): ItemStack[];
  }


  interface DoughRecipe extends CustomRecipe {}
  class DoughRecipe extends CustomRecipe {
    constructor(category: CraftingBookCategory);
    assemble(container: CraftingInput, registryAccess: Provider): ItemStack;
    canCraftInDimensions(width: number, height: number): boolean;
    get serializer(): RecipeSerializer<any>;
    getRemainingItems(container: CraftingInput): NonNullList<ItemStack>;
    matches(container: CraftingInput, level: Level): boolean;
  }


  interface FoodServingRecipe extends CustomRecipe {}
  class FoodServingRecipe extends CustomRecipe {
    constructor(category: CraftingBookCategory);
    assemble(input: CraftingInput, access: Provider): ItemStack;
    canCraftInDimensions(width: number, height: number): boolean;
    get serializer(): RecipeSerializer<any>;
    getRemainingItems(input: CraftingInput): NonNullList<ItemStack>;
    matches(input: CraftingInput, level: Level): boolean;
  }

}

declare module 'vectorwing.farmersdelight.common.crafting.CookingPotRecipe' {
  import { RecipeSerializer } from 'net.minecraft.world.item.crafting';
  import { CookingPotRecipe } from 'vectorwing.farmersdelight.common.crafting';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { MapCodec } from 'com.mojang.serialization';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  interface Serializer extends RecipeSerializer<CookingPotRecipe> {}
  class Serializer extends RecipeSerializer<CookingPotRecipe> {
    static readonly STREAM_CODEC: StreamCodec;
    codec(): MapCodec<CookingPotRecipe>;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, CookingPotRecipe>;
  }

}

declare module 'vectorwing.farmersdelight.common.crafting.CuttingBoardRecipe' {
  import { RecipeSerializer } from 'net.minecraft.world.item.crafting';
  import { CuttingBoardRecipe } from 'vectorwing.farmersdelight.common.crafting';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { MapCodec } from 'com.mojang.serialization';

  interface Serializer extends RecipeSerializer<CuttingBoardRecipe> {}
  class Serializer extends RecipeSerializer<CuttingBoardRecipe> {
    static readonly STREAM_CODEC: StreamCodec;
    codec(): MapCodec<CuttingBoardRecipe>;
    static fromNetwork(buffer: RegistryFriendlyByteBuf): CuttingBoardRecipe;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, CuttingBoardRecipe>;
    static toNetwork(buffer: RegistryFriendlyByteBuf, recipe: CuttingBoardRecipe): void;
  }

}

declare module 'vectorwing.farmersdelight.common.crafting.ingredient' {
  import { ICustomIngredient, IngredientType } from 'net.neoforged.neoforge.common.crafting';
  import { MapCodec } from 'com.mojang.serialization';
  import { ItemAbility } from 'net.neoforged.neoforge.common';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Stream } from 'java.util.stream';

  interface ItemAbilityIngredient extends ICustomIngredient {}
  class ItemAbilityIngredient extends ICustomIngredient {
    static readonly CODEC: MapCodec;
    constructor(itemAbility: ItemAbility);
    get itemAbility(): ItemAbility;
    get items(): Stream<ItemStack>;
    get type(): IngredientType<any>;
    isSimple(): boolean;
    test(stack: ItemStack): boolean;
  }

}

declare module 'vectorwing.farmersdelight.common.effect' {
  import { MobEffect } from 'net.minecraft.world.effect';
  import { LivingEntity } from 'net.minecraft.world.entity';

  interface ComfortEffect extends MobEffect {}
  class ComfortEffect extends MobEffect {
    constructor();
    applyEffectTick(entity: LivingEntity, amplifier: number): boolean;
    shouldApplyEffectTickThisTick(duration: number, amplifier: number): boolean;
  }


  interface NourishmentEffect extends MobEffect {}
  class NourishmentEffect extends MobEffect {
    constructor();
    applyEffectTick(entity: LivingEntity, amplifier: number): boolean;
    shouldApplyEffectTickThisTick(duration: number, amplifier: number): boolean;
  }

}

declare module 'vectorwing.farmersdelight.common.entity' {
  import { ThrowableItemProjectile } from 'net.minecraft.world.entity.projectile';
  import { EntityType, LivingEntity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';

  interface RottenTomatoEntity extends ThrowableItemProjectile {}
  class RottenTomatoEntity extends ThrowableItemProjectile {
    constructor(entityType: EntityType<RottenTomatoEntity>, level: Level);

    constructor(level: Level, entity: LivingEntity);

    constructor(level: Level, x: number, y: number, z: number);
    handleEntityEvent(id: number): void;
  }

}

declare module 'vectorwing.farmersdelight.common.event' {
  import { Finish } from 'LivingEntityUseItemEvent';
  import { ModifyDefaultComponentsEvent } from 'net.neoforged.neoforge.event';
  import { VillagerTradesEvent, WandererTradesEvent } from 'net.neoforged.neoforge.event.village';
  import { BasicItemListing } from 'net.neoforged.neoforge.common';
  import { ItemLike } from 'net.minecraft.world.level';

  class CommonEvents {
    static handleVanillaSoupEffects(event: Finish): void;
  }


  class CommonModBusEvents {
    static onModifyDefaultComponents(event: ModifyDefaultComponentsEvent): void;
  }


  class VillagerEvents {
    static emeraldForItemsTrade(item: ItemLike, count: number, maxTrades: number, xp: number): BasicItemListing;
    static itemForEmeraldTrade(item: ItemLike, maxTrades: number, xp: number): BasicItemListing;
    static onVillagerTrades(event: VillagerTradesEvent): void;
    static onWandererTrades(event: WandererTradesEvent): void;
  }

}

declare module 'vectorwing.farmersdelight.common.item.component' {
  import { Codec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { ItemStack } from 'net.minecraft.world.item';

  class ItemStackWrapper {
    static readonly EMPTY: ItemStackWrapper;
    static readonly CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(stack: ItemStack);
    equals(object: any): boolean;
    get stack(): ItemStack;
    hashCode(): number;
  }

}

declare module 'vectorwing.farmersdelight.common.item' {
  import { Item, ItemStack, TooltipFlag, BlockItem, UseAnim, DiggerItem, Tier, ItemNameBlockItem, ProjectileItem, Tiers } from 'net.minecraft.world.item';
  import { Properties, TooltipContext } from 'Item';
  import { Level } from 'net.minecraft.world.level';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { List, Optional, Set } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { Block } from 'net.minecraft.world.level.block';
  import { TooltipComponent } from 'net.minecraft.world.inventory.tooltip';
  import { InteractionResult, InteractionHand, InteractionResultHolder } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { RecipeType, RecipeHolder, CampfireCookingRecipe } from 'net.minecraft.world.item.crafting';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockPos, Holder, Position, Direction } from 'net.minecraft.core';
  import { Enchantment } from 'net.minecraft.world.item.enchantment';
  import { ItemAbility } from 'net.neoforged.neoforge.common';
  import { UseOnContext, BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { Projectile } from 'net.minecraft.world.entity.projectile';
  import { ItemAttributeModifiers } from 'net.minecraft.world.item.component';

  interface ConsumableItem extends Item {}
  class ConsumableItem extends Item {
    constructor(properties: Properties);

    constructor(properties: Properties, hasFoodEffectTooltip: boolean);

    constructor(properties: Properties, hasFoodEffectTooltip: boolean, hasCustomTooltip: boolean);
    affectConsumer(stack: ItemStack, level: Level, consumer: LivingEntity): void;
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], isAdvanced: TooltipFlag): void;
    finishUsingItem(stack: ItemStack, level: Level, consumer: LivingEntity): ItemStack;
  }


  interface CookingPotItem extends BlockItem {}
  class CookingPotItem extends BlockItem {
    constructor(block: Block, properties: Properties);
    getBarColor(stack: ItemStack): number;
    getBarWidth(stack: ItemStack): number;
    getTooltipImage(stack: ItemStack): Optional<TooltipComponent>;
    isBarVisible(stack: ItemStack): boolean;
  }


  interface DogFoodItem extends ConsumableItem {}
  class DogFoodItem extends ConsumableItem {
    static readonly EFFECTS: List;
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], isAdvanced: TooltipFlag): void;
    interactLivingEntity(stack: ItemStack, playerIn: Player, target: LivingEntity, hand: InteractionHand): InteractionResult;
  }


  interface DrinkableItem extends ConsumableItem {}
  class DrinkableItem extends ConsumableItem {
    constructor(properties: Properties);

    constructor(properties: Properties, hasFoodEffectTooltip: boolean);

    constructor(properties: Properties, hasPotionEffectTooltip: boolean, hasCustomTooltip: boolean);
    getUseAnimation(stack: ItemStack): UseAnim;
    getUseDuration(stack: ItemStack, entity: LivingEntity): number;
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface FuelBlockItem extends BlockItem {}
  class FuelBlockItem extends BlockItem {
    readonly burnTime: number;
    constructor(block: Block, properties: Properties);

    constructor(block: Block, properties: Properties, burnTime: number);
    getBurnTime(stack: ItemStack, recipeType: RecipeType<any>): number;
  }


  interface FuelItem extends Item {}
  class FuelItem extends Item {
    readonly burnTime: number;
    constructor(properties: Properties);

    constructor(properties: Properties, burnTime: number);
    getBurnTime(stack: ItemStack, recipeType: RecipeType<any>): number;
  }


  interface HorseFeedItem extends Item {}
  class HorseFeedItem extends Item {
    static readonly EFFECTS: List;
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], isAdvanced: TooltipFlag): void;
    interactLivingEntity(stack: ItemStack, playerIn: Player, target: LivingEntity, hand: InteractionHand): InteractionResult;
  }


  interface HotCocoaItem extends DrinkableItem {}
  class HotCocoaItem extends DrinkableItem {
    constructor(properties: Properties);
    affectConsumer(stack: ItemStack, level: Level, consumer: LivingEntity): void;
  }


  interface KnifeItem extends DiggerItem {}
  class KnifeItem extends DiggerItem {
    static readonly KNIFE_ACTIONS: Set;
    constructor(tier: Tier, properties: Properties);
    canAttackBlock(state: BlockState, level: Level, pos: BlockPos, player: Player): boolean;
    canPerformAction(stack: ItemStack, toolAction: ItemAbility): boolean;
    hurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): boolean;
    isPrimaryItemFor(stack: ItemStack, enchantment: Holder<Enchantment>): boolean;
    postHurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): void;
    supportsEnchantment(stack: ItemStack, enchantment: Holder<Enchantment>): boolean;
    useOn(context: UseOnContext): InteractionResult;
  }


  interface MelonJuiceItem extends DrinkableItem {}
  class MelonJuiceItem extends DrinkableItem {
    constructor(properties: Properties);
    affectConsumer(stack: ItemStack, level: Level, consumer: LivingEntity): void;
  }


  interface MilkBottleItem extends DrinkableItem {}
  class MilkBottleItem extends DrinkableItem {
    constructor(properties: Properties);
    affectConsumer(stack: ItemStack, level: Level, consumer: LivingEntity): void;
  }


  interface MushroomColonyItem extends BlockItem {}
  class MushroomColonyItem extends BlockItem {
    constructor(blockIn: Block, properties: Properties);
  }


  interface PopsicleItem extends ConsumableItem {}
  class PopsicleItem extends ConsumableItem {
    constructor(properties: Properties);
    affectConsumer(stack: ItemStack, level: Level, consumer: LivingEntity): void;
  }


  interface RiceItem extends ItemNameBlockItem {}
  class RiceItem extends ItemNameBlockItem {
    constructor(block: Block, properties: Properties);
    useOn(context: UseOnContext): InteractionResult;
  }


  interface RopeItem extends FuelBlockItem {}
  class RopeItem extends FuelBlockItem {
    constructor(block: Block, properties: Properties);
    updatePlacementContext(context: BlockPlaceContext): BlockPlaceContext;
  }


  interface RottenTomatoItem extends ProjectileItem, Item {}
  class RottenTomatoItem extends ProjectileItem {
    constructor(properties: Properties);
    asProjectile(level: Level, position: Position, itemStack: ItemStack, direction: Direction): Projectile;
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface SkilletItem extends BlockItem {}
  class SkilletItem extends BlockItem {
    static readonly SKILLET_TIER: Tiers;
    constructor(block: Block, properties: Properties);
    canAttackBlock(state: BlockState, level: Level, pos: BlockPos, player: Player): boolean;
    static createAttributes(tier: Tier, attackDamage: number, attackSpeed: number): ItemAttributeModifiers;
    finishUsingItem(stack: ItemStack, level: Level, entity: LivingEntity): ItemStack;
    get enchantmentValue(): number;
    static getCookingRecipe(stack: ItemStack, level: Level): Optional<RecipeHolder<CampfireCookingRecipe>>;
    getUseDuration(stack: ItemStack, entity: LivingEntity): number;
    hurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): boolean;
    isPrimaryItemFor(stack: ItemStack, enchantment: Holder<Enchantment>): boolean;
    isValidRepairItem(toRepair: ItemStack, repair: ItemStack): boolean;
    mineBlock(stack: ItemStack, level: Level, state: BlockState, pos: BlockPos, entity: LivingEntity): boolean;
    onUseTick(level: Level, entity: LivingEntity, stack: ItemStack, count: number): void;
    place(context: BlockPlaceContext): InteractionResult;
    postHurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): void;
    releaseUsing(stack: ItemStack, level: Level, entity: LivingEntity, timeLeft: number): void;
    supportsEnchantment(stack: ItemStack, enchantment: Holder<Enchantment>): boolean;
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }

}

declare module 'vectorwing.farmersdelight.common.item.DogFoodItem' {
  import { EntityInteract } from 'PlayerInteractEvent';

  class DogFoodEvent {
    static onDogFoodApplied(event: EntityInteract): void;
  }

}

declare module 'vectorwing.farmersdelight.common.item.enchantment' {
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { Vec3 } from 'net.minecraft.world.phys';

  class BackstabbingEnchantment {
    static getBackstabbingDamagePerLevel(amount: number, level: number): number;
    static isLookingBehindTarget(target: LivingEntity, attackerLocation: Vec3): boolean;
  }

}

declare module 'vectorwing.farmersdelight.common.item.enchantment.BackstabbingEnchantment' {
  import { LivingIncomingDamageEvent } from 'net.neoforged.neoforge.event.entity.living';

  class BackstabbingEvent {
    static onKnifeBackstab(event: LivingIncomingDamageEvent): void;
  }

}

declare module 'vectorwing.farmersdelight.common.item.HorseFeedItem' {
  import { EntityInteract } from 'PlayerInteractEvent';

  class HorseFeedEvent {
    static onHorseFeedApplied(event: EntityInteract): void;
  }

}

declare module 'vectorwing.farmersdelight.common.item.KnifeItem' {
  import { LivingKnockBackEvent } from 'net.neoforged.neoforge.event.entity.living';
  import { RightClickBlock } from 'PlayerInteractEvent';

  class KnifeEvents {
    static onCakeInteraction(event: RightClickBlock): void;
    static onKnifeKnockback(event: LivingKnockBackEvent): void;
  }

}

declare module 'vectorwing.farmersdelight.common.item.SkilletItem' {
  import { Pre } from 'LivingDamageEvent';

  class SkilletEvents {
    static playSkilletAttackSound(event: Pre): void;
  }

}

declare module 'vectorwing.farmersdelight.common.loot.function' {
  import { LootItemConditionalFunction, LootItemFunctionType } from 'net.minecraft.world.level.storage.loot.functions';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { MapCodec } from 'com.mojang.serialization';
  import { Builder } from 'LootItemConditionalFunction';

  interface CopySkilletFunction extends LootItemConditionalFunction {}
  class CopySkilletFunction extends LootItemConditionalFunction {
    static readonly ID: ResourceLocation;
    static readonly CODEC: MapCodec;
    static builder(): Builder<any>;
    get type(): LootItemFunctionType<CopySkilletFunction>;
  }


  interface SmokerCookFunction extends LootItemConditionalFunction {}
  class SmokerCookFunction extends LootItemConditionalFunction {
    static readonly ID: ResourceLocation;
    static readonly CODEC: MapCodec;
    get type(): LootItemFunctionType<SmokerCookFunction>;
  }

}

declare module 'vectorwing.farmersdelight.common.loot.modifier' {
  import { LootModifier, IGlobalLootModifier, AddTableLootModifier } from 'net.neoforged.neoforge.common.loot';
  import { Supplier } from 'java.util.function';
  import { MapCodec } from 'com.mojang.serialization';

  interface AddItemModifier extends LootModifier {}
  class AddItemModifier extends LootModifier {
    static readonly CODEC: Supplier;
    codec(): MapCodec<IGlobalLootModifier>;
  }


  interface FDAddTableLootModifier extends AddTableLootModifier {}
  class FDAddTableLootModifier extends AddTableLootModifier {
    static readonly CODEC: Supplier;
  }


  interface PastrySlicingModifier extends LootModifier {}
  class PastrySlicingModifier extends LootModifier {
    static readonly CODEC: Supplier;
    static readonly MAX_CAKE_BITES: number;
    static readonly MAX_PIE_BITES: number;
    codec(): MapCodec<IGlobalLootModifier>;
  }


  interface ReplaceItemModifier extends LootModifier {}
  class ReplaceItemModifier extends LootModifier {
    static readonly CODEC: Supplier;
    codec(): MapCodec<IGlobalLootModifier>;
  }

}

declare module 'vectorwing.farmersdelight.common.mixin' {
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { CallbackInfoReturnable, CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Boolean } from 'java.lang';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { DispenserBlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockSource } from 'net.minecraft.core.dispenser';
  import { ItemStack } from 'net.minecraft.world.item';

  class CampfireBaleMixin {
    isFDSmokeSource(state: BlockState, cir: CallbackInfoReturnable<boolean>): void;
  }


  class CanvasSignEditScreenMixin {
  }


  class CuttingBoardDispenserMixin {
    onCuttingBoardDispenseFromInject(level: ServerLevel, state: BlockState, pos: BlockPos, ci: CallbackInfo, dispenser: DispenserBlockEntity, source: BlockSource, slot: number, stack: ItemStack): void;
  }


  class HideBlockBreakProgressMixin {
  }


  class KeepRichSoilGiantTreeMixin {
  }


  class KeepRichSoilTreeMixin {
  }


  class KeepRichSoilUntrampledMixin {
  }

}

declare module 'vectorwing.farmersdelight.common.registry' {
  import { DeferredRegister, DeferredHolder } from 'net.neoforged.neoforge.registries';
  import { Supplier } from 'java.util.function';
  import { Material } from 'net.minecraft.client.resources.model';
  import { Map, LinkedHashSet } from 'java.util';
  import { DyeColor, Item, Tier } from 'net.minecraft.world.item';
  import { ResourceKey } from 'net.minecraft.resources';
  import { DamageSource, DamageType } from 'net.minecraft.world.damagesource';
  import { Level } from 'net.minecraft.world.level';
  import { DataComponents } from 'DeferredRegister';
  import { EnchantmentEffectComponents } from 'vectorwing.farmersdelight.common.utility.RegistryUtils';
  import { Holder } from 'net.minecraft.core';
  import { Properties } from 'Item';
  import { FoodProperties } from 'net.minecraft.world.food';
  import { RecipeType, Recipe } from 'net.minecraft.world.item.crafting';

  class ModAdvancements {
    static readonly TRIGGERS: DeferredRegister;
    static readonly USE_CUTTING_BOARD: Supplier;
  }


  class ModAtlases {
    static readonly BLANK_CANVAS_SIGN_MATERIAL: Material;
    static readonly BLANK_HANGING_CANVAS_SIGN_MATERIAL: Material;
    static readonly DYED_CANVAS_SIGN_MATERIALS: Map;
    static readonly DYED_HANGING_CANVAS_SIGN_MATERIALS: Map;
    static createCanvasSignMaterial(dyeType: DyeColor): Material;
    static createHangingCanvasSignMaterial(dyeType: DyeColor): Material;
    static getCanvasSignMaterial(dyeColor: DyeColor): Material;
    static getHangingCanvasSignMaterial(dyeColor: DyeColor): Material;
  }


  class ModBiomeFeatures {
    static readonly FEATURES: DeferredRegister;
    static readonly WILD_RICE: Supplier;
    static readonly WILD_CROP: Supplier;
  }


  class ModBiomeModifiers {
    static BIOME_MODIFIER_SERIALIZERS: DeferredRegister;
    static ADD_FEATURES_BY_FILTER: Supplier;
  }


  class ModBlockEntityTypes {
    static readonly TILES: DeferredRegister;
    static readonly STOVE: Supplier;
    static readonly COOKING_POT: Supplier;
    static readonly BASKET: DeferredHolder;
    static readonly CUTTING_BOARD: Supplier;
    static readonly SKILLET: Supplier;
    static readonly CABINET: Supplier;
    static readonly CANVAS_SIGN: Supplier;
    static readonly HANGING_CANVAS_SIGN: Supplier;
  }


  class ModBlocks {
    static readonly BLOCKS: DeferredRegister;
    static readonly STOVE: Supplier;
    static readonly COOKING_POT: Supplier;
    static readonly SKILLET: Supplier;
    static readonly BASKET: Supplier;
    static readonly CUTTING_BOARD: Supplier;
    static readonly CARROT_CRATE: Supplier;
    static readonly POTATO_CRATE: Supplier;
    static readonly BEETROOT_CRATE: Supplier;
    static readonly CABBAGE_CRATE: Supplier;
    static readonly TOMATO_CRATE: Supplier;
    static readonly ONION_CRATE: Supplier;
    static readonly RICE_BALE: Supplier;
    static readonly RICE_BAG: Supplier;
    static readonly STRAW_BALE: Supplier;
    static readonly ROPE: Supplier;
    static readonly SAFETY_NET: Supplier;
    static readonly OAK_CABINET: Supplier;
    static readonly SPRUCE_CABINET: Supplier;
    static readonly BIRCH_CABINET: Supplier;
    static readonly JUNGLE_CABINET: Supplier;
    static readonly ACACIA_CABINET: Supplier;
    static readonly DARK_OAK_CABINET: Supplier;
    static readonly MANGROVE_CABINET: Supplier;
    static readonly CHERRY_CABINET: Supplier;
    static readonly BAMBOO_CABINET: Supplier;
    static readonly CRIMSON_CABINET: Supplier;
    static readonly WARPED_CABINET: Supplier;
    static readonly CANVAS_RUG: Supplier;
    static readonly TATAMI: Supplier;
    static readonly FULL_TATAMI_MAT: Supplier;
    static readonly HALF_TATAMI_MAT: Supplier;
    static readonly CANVAS_SIGN: Supplier;
    static readonly WHITE_CANVAS_SIGN: Supplier;
    static readonly ORANGE_CANVAS_SIGN: Supplier;
    static readonly MAGENTA_CANVAS_SIGN: Supplier;
    static readonly LIGHT_BLUE_CANVAS_SIGN: Supplier;
    static readonly YELLOW_CANVAS_SIGN: Supplier;
    static readonly LIME_CANVAS_SIGN: Supplier;
    static readonly PINK_CANVAS_SIGN: Supplier;
    static readonly GRAY_CANVAS_SIGN: Supplier;
    static readonly LIGHT_GRAY_CANVAS_SIGN: Supplier;
    static readonly CYAN_CANVAS_SIGN: Supplier;
    static readonly PURPLE_CANVAS_SIGN: Supplier;
    static readonly BLUE_CANVAS_SIGN: Supplier;
    static readonly BROWN_CANVAS_SIGN: Supplier;
    static readonly GREEN_CANVAS_SIGN: Supplier;
    static readonly RED_CANVAS_SIGN: Supplier;
    static readonly BLACK_CANVAS_SIGN: Supplier;
    static readonly CANVAS_WALL_SIGN: Supplier;
    static readonly WHITE_CANVAS_WALL_SIGN: Supplier;
    static readonly ORANGE_CANVAS_WALL_SIGN: Supplier;
    static readonly MAGENTA_CANVAS_WALL_SIGN: Supplier;
    static readonly LIGHT_BLUE_CANVAS_WALL_SIGN: Supplier;
    static readonly YELLOW_CANVAS_WALL_SIGN: Supplier;
    static readonly LIME_CANVAS_WALL_SIGN: Supplier;
    static readonly PINK_CANVAS_WALL_SIGN: Supplier;
    static readonly GRAY_CANVAS_WALL_SIGN: Supplier;
    static readonly LIGHT_GRAY_CANVAS_WALL_SIGN: Supplier;
    static readonly CYAN_CANVAS_WALL_SIGN: Supplier;
    static readonly PURPLE_CANVAS_WALL_SIGN: Supplier;
    static readonly BLUE_CANVAS_WALL_SIGN: Supplier;
    static readonly BROWN_CANVAS_WALL_SIGN: Supplier;
    static readonly GREEN_CANVAS_WALL_SIGN: Supplier;
    static readonly RED_CANVAS_WALL_SIGN: Supplier;
    static readonly BLACK_CANVAS_WALL_SIGN: Supplier;
    static readonly HANGING_CANVAS_SIGN: Supplier;
    static readonly WHITE_HANGING_CANVAS_SIGN: Supplier;
    static readonly ORANGE_HANGING_CANVAS_SIGN: Supplier;
    static readonly MAGENTA_HANGING_CANVAS_SIGN: Supplier;
    static readonly LIGHT_BLUE_HANGING_CANVAS_SIGN: Supplier;
    static readonly YELLOW_HANGING_CANVAS_SIGN: Supplier;
    static readonly LIME_HANGING_CANVAS_SIGN: Supplier;
    static readonly PINK_HANGING_CANVAS_SIGN: Supplier;
    static readonly GRAY_HANGING_CANVAS_SIGN: Supplier;
    static readonly LIGHT_GRAY_HANGING_CANVAS_SIGN: Supplier;
    static readonly CYAN_HANGING_CANVAS_SIGN: Supplier;
    static readonly PURPLE_HANGING_CANVAS_SIGN: Supplier;
    static readonly BLUE_HANGING_CANVAS_SIGN: Supplier;
    static readonly BROWN_HANGING_CANVAS_SIGN: Supplier;
    static readonly GREEN_HANGING_CANVAS_SIGN: Supplier;
    static readonly RED_HANGING_CANVAS_SIGN: Supplier;
    static readonly BLACK_HANGING_CANVAS_SIGN: Supplier;
    static readonly HANGING_CANVAS_WALL_SIGN: Supplier;
    static readonly WHITE_HANGING_CANVAS_WALL_SIGN: Supplier;
    static readonly ORANGE_HANGING_CANVAS_WALL_SIGN: Supplier;
    static readonly MAGENTA_HANGING_CANVAS_WALL_SIGN: Supplier;
    static readonly LIGHT_BLUE_HANGING_CANVAS_WALL_SIGN: Supplier;
    static readonly YELLOW_HANGING_CANVAS_WALL_SIGN: Supplier;
    static readonly LIME_HANGING_CANVAS_WALL_SIGN: Supplier;
    static readonly PINK_HANGING_CANVAS_WALL_SIGN: Supplier;
    static readonly GRAY_HANGING_CANVAS_WALL_SIGN: Supplier;
    static readonly LIGHT_GRAY_HANGING_CANVAS_WALL_SIGN: Supplier;
    static readonly CYAN_HANGING_CANVAS_WALL_SIGN: Supplier;
    static readonly PURPLE_HANGING_CANVAS_WALL_SIGN: Supplier;
    static readonly BLUE_HANGING_CANVAS_WALL_SIGN: Supplier;
    static readonly BROWN_HANGING_CANVAS_WALL_SIGN: Supplier;
    static readonly GREEN_HANGING_CANVAS_WALL_SIGN: Supplier;
    static readonly RED_HANGING_CANVAS_WALL_SIGN: Supplier;
    static readonly BLACK_HANGING_CANVAS_WALL_SIGN: Supplier;
    static readonly BROWN_MUSHROOM_COLONY: Supplier;
    static readonly RED_MUSHROOM_COLONY: Supplier;
    static readonly ORGANIC_COMPOST: Supplier;
    static readonly RICH_SOIL: Supplier;
    static readonly RICH_SOIL_FARMLAND: Supplier;
    static readonly APPLE_PIE: Supplier;
    static readonly SWEET_BERRY_CHEESECAKE: Supplier;
    static readonly CHOCOLATE_PIE: Supplier;
    static readonly SANDY_SHRUB: Supplier;
    static readonly WILD_CABBAGES: Supplier;
    static readonly WILD_ONIONS: Supplier;
    static readonly WILD_TOMATOES: Supplier;
    static readonly WILD_CARROTS: Supplier;
    static readonly WILD_POTATOES: Supplier;
    static readonly WILD_BEETROOTS: Supplier;
    static readonly WILD_RICE: Supplier;
    static readonly CABBAGE_CROP: Supplier;
    static readonly ONION_CROP: Supplier;
    static readonly BUDDING_TOMATO_CROP: Supplier;
    static readonly TOMATO_CROP: Supplier;
    static readonly RICE_CROP: Supplier;
    static readonly RICE_CROP_PANICLES: Supplier;
    static readonly ROAST_CHICKEN_BLOCK: Supplier;
    static readonly STUFFED_PUMPKIN_BLOCK: Supplier;
    static readonly HONEY_GLAZED_HAM_BLOCK: Supplier;
    static readonly SHEPHERDS_PIE_BLOCK: Supplier;
    static readonly RICE_ROLL_MEDLEY_BLOCK: Supplier;
  }


  class ModConditionCodecs {
    static readonly CONDITION_CODECS: DeferredRegister;
    static readonly VANILLA_CRATE_ENABLED: Supplier;
  }


  class ModCreativeTabs {
    static readonly CREATIVE_TABS: DeferredRegister;
    static readonly TAB_FARMERS_DELIGHT: Supplier;
  }


  class ModDamageTypes {
    static readonly STOVE_BURN: ResourceKey;
    static getSimpleDamageSource(level: Level, type: ResourceKey<DamageType>): DamageSource;
  }


  class ModDataComponents {
    static readonly DATA_COMPONENTS: DataComponents;
    static readonly ENCHANTMENT_EFFECT_COMPONENTS: EnchantmentEffectComponents;
    static readonly MEAL: DeferredHolder;
    static readonly CONTAINER: DeferredHolder;
    static readonly COOKING_TIME_LENGTH: DeferredHolder;
    static readonly SKILLET_INGREDIENT: DeferredHolder;
    static readonly BACKSTABBING: DeferredHolder;
  }


  class ModEffects {
    static readonly EFFECTS: DeferredRegister;
    static readonly NOURISHMENT: Holder;
    static readonly COMFORT: Holder;
  }


  class ModEntityTypes {
    static readonly ENTITIES: DeferredRegister;
    static readonly ROTTEN_TOMATO: Supplier;
  }


  class ModIngredientTypes {
    static readonly INGREDIENT_TYPES: DeferredRegister;
    static readonly ITEM_ABILITY_INGREDIENT: Supplier;
  }


  class ModItems {
    static readonly ITEMS: DeferredRegister;
    static CREATIVE_TAB_ITEMS: LinkedHashSet;
    static readonly STOVE: Supplier;
    static readonly COOKING_POT: Supplier;
    static readonly SKILLET: Supplier;
    static readonly CUTTING_BOARD: Supplier;
    static readonly BASKET: Supplier;
    static readonly CARROT_CRATE: Supplier;
    static readonly POTATO_CRATE: Supplier;
    static readonly BEETROOT_CRATE: Supplier;
    static readonly CABBAGE_CRATE: Supplier;
    static readonly TOMATO_CRATE: Supplier;
    static readonly ONION_CRATE: Supplier;
    static readonly RICE_BALE: Supplier;
    static readonly RICE_BAG: Supplier;
    static readonly STRAW_BALE: Supplier;
    static readonly SAFETY_NET: Supplier;
    static readonly OAK_CABINET: Supplier;
    static readonly SPRUCE_CABINET: Supplier;
    static readonly BIRCH_CABINET: Supplier;
    static readonly JUNGLE_CABINET: Supplier;
    static readonly ACACIA_CABINET: Supplier;
    static readonly DARK_OAK_CABINET: Supplier;
    static readonly MANGROVE_CABINET: Supplier;
    static readonly CHERRY_CABINET: Supplier;
    static readonly BAMBOO_CABINET: Supplier;
    static readonly CRIMSON_CABINET: Supplier;
    static readonly WARPED_CABINET: Supplier;
    static readonly TATAMI: Supplier;
    static readonly FULL_TATAMI_MAT: Supplier;
    static readonly HALF_TATAMI_MAT: Supplier;
    static readonly CANVAS_RUG: Supplier;
    static readonly ORGANIC_COMPOST: Supplier;
    static readonly RICH_SOIL: Supplier;
    static readonly RICH_SOIL_FARMLAND: Supplier;
    static readonly ROPE: Supplier;
    static readonly CANVAS_SIGN: Supplier;
    static readonly HANGING_CANVAS_SIGN: Supplier;
    static readonly WHITE_CANVAS_SIGN: Supplier;
    static readonly WHITE_HANGING_CANVAS_SIGN: Supplier;
    static readonly LIGHT_GRAY_CANVAS_SIGN: Supplier;
    static readonly LIGHT_GRAY_HANGING_CANVAS_SIGN: Supplier;
    static readonly GRAY_CANVAS_SIGN: Supplier;
    static readonly GRAY_HANGING_CANVAS_SIGN: Supplier;
    static readonly BLACK_CANVAS_SIGN: Supplier;
    static readonly BLACK_HANGING_CANVAS_SIGN: Supplier;
    static readonly BROWN_CANVAS_SIGN: Supplier;
    static readonly BROWN_HANGING_CANVAS_SIGN: Supplier;
    static readonly RED_CANVAS_SIGN: Supplier;
    static readonly RED_HANGING_CANVAS_SIGN: Supplier;
    static readonly ORANGE_CANVAS_SIGN: Supplier;
    static readonly ORANGE_HANGING_CANVAS_SIGN: Supplier;
    static readonly YELLOW_CANVAS_SIGN: Supplier;
    static readonly YELLOW_HANGING_CANVAS_SIGN: Supplier;
    static readonly LIME_CANVAS_SIGN: Supplier;
    static readonly LIME_HANGING_CANVAS_SIGN: Supplier;
    static readonly GREEN_CANVAS_SIGN: Supplier;
    static readonly GREEN_HANGING_CANVAS_SIGN: Supplier;
    static readonly CYAN_CANVAS_SIGN: Supplier;
    static readonly CYAN_HANGING_CANVAS_SIGN: Supplier;
    static readonly LIGHT_BLUE_CANVAS_SIGN: Supplier;
    static readonly LIGHT_BLUE_HANGING_CANVAS_SIGN: Supplier;
    static readonly BLUE_CANVAS_SIGN: Supplier;
    static readonly BLUE_HANGING_CANVAS_SIGN: Supplier;
    static readonly PURPLE_CANVAS_SIGN: Supplier;
    static readonly PURPLE_HANGING_CANVAS_SIGN: Supplier;
    static readonly MAGENTA_CANVAS_SIGN: Supplier;
    static readonly MAGENTA_HANGING_CANVAS_SIGN: Supplier;
    static readonly PINK_CANVAS_SIGN: Supplier;
    static readonly PINK_HANGING_CANVAS_SIGN: Supplier;
    static readonly FLINT_KNIFE: Supplier;
    static readonly IRON_KNIFE: Supplier;
    static readonly DIAMOND_KNIFE: Supplier;
    static readonly NETHERITE_KNIFE: Supplier;
    static readonly GOLDEN_KNIFE: Supplier;
    static readonly STRAW: Supplier;
    static readonly CANVAS: Supplier;
    static readonly TREE_BARK: Supplier;
    static readonly SANDY_SHRUB: Supplier;
    static readonly WILD_CABBAGES: Supplier;
    static readonly WILD_ONIONS: Supplier;
    static readonly WILD_TOMATOES: Supplier;
    static readonly WILD_CARROTS: Supplier;
    static readonly WILD_POTATOES: Supplier;
    static readonly WILD_BEETROOTS: Supplier;
    static readonly WILD_RICE: Supplier;
    static readonly BROWN_MUSHROOM_COLONY: Supplier;
    static readonly RED_MUSHROOM_COLONY: Supplier;
    static readonly CABBAGE: Supplier;
    static readonly TOMATO: Supplier;
    static readonly ONION: Supplier;
    static readonly RICE_PANICLE: Supplier;
    static readonly RICE: Supplier;
    static readonly CABBAGE_SEEDS: Supplier;
    static readonly TOMATO_SEEDS: Supplier;
    static readonly ROTTEN_TOMATO: Supplier;
    static readonly FRIED_EGG: Supplier;
    static readonly MILK_BOTTLE: Supplier;
    static readonly HOT_COCOA: Supplier;
    static readonly APPLE_CIDER: Supplier;
    static readonly MELON_JUICE: Supplier;
    static readonly TOMATO_SAUCE: Supplier;
    static readonly WHEAT_DOUGH: Supplier;
    static readonly RAW_PASTA: Supplier;
    static readonly PUMPKIN_SLICE: Supplier;
    static readonly CABBAGE_LEAF: Supplier;
    static readonly MINCED_BEEF: Supplier;
    static readonly BEEF_PATTY: Supplier;
    static readonly CHICKEN_CUTS: Supplier;
    static readonly COOKED_CHICKEN_CUTS: Supplier;
    static readonly BACON: Supplier;
    static readonly COOKED_BACON: Supplier;
    static readonly COD_SLICE: Supplier;
    static readonly COOKED_COD_SLICE: Supplier;
    static readonly SALMON_SLICE: Supplier;
    static readonly COOKED_SALMON_SLICE: Supplier;
    static readonly MUTTON_CHOPS: Supplier;
    static readonly COOKED_MUTTON_CHOPS: Supplier;
    static readonly HAM: Supplier;
    static readonly SMOKED_HAM: Supplier;
    static readonly PIE_CRUST: Supplier;
    static readonly APPLE_PIE: Supplier;
    static readonly SWEET_BERRY_CHEESECAKE: Supplier;
    static readonly CHOCOLATE_PIE: Supplier;
    static readonly CAKE_SLICE: Supplier;
    static readonly APPLE_PIE_SLICE: Supplier;
    static readonly SWEET_BERRY_CHEESECAKE_SLICE: Supplier;
    static readonly CHOCOLATE_PIE_SLICE: Supplier;
    static readonly SWEET_BERRY_COOKIE: Supplier;
    static readonly HONEY_COOKIE: Supplier;
    static readonly MELON_POPSICLE: Supplier;
    static readonly GLOW_BERRY_CUSTARD: Supplier;
    static readonly FRUIT_SALAD: Supplier;
    static readonly MIXED_SALAD: Supplier;
    static readonly NETHER_SALAD: Supplier;
    static readonly BARBECUE_STICK: Supplier;
    static readonly EGG_SANDWICH: Supplier;
    static readonly CHICKEN_SANDWICH: Supplier;
    static readonly HAMBURGER: Supplier;
    static readonly BACON_SANDWICH: Supplier;
    static readonly MUTTON_WRAP: Supplier;
    static readonly DUMPLINGS: Supplier;
    static readonly STUFFED_POTATO: Supplier;
    static readonly CABBAGE_ROLLS: Supplier;
    static readonly SALMON_ROLL: Supplier;
    static readonly COD_ROLL: Supplier;
    static readonly KELP_ROLL: Supplier;
    static readonly KELP_ROLL_SLICE: Supplier;
    static readonly COOKED_RICE: Supplier;
    static readonly BONE_BROTH: Supplier;
    static readonly BEEF_STEW: Supplier;
    static readonly CHICKEN_SOUP: Supplier;
    static readonly VEGETABLE_SOUP: Supplier;
    static readonly FISH_STEW: Supplier;
    static readonly FRIED_RICE: Supplier;
    static readonly PUMPKIN_SOUP: Supplier;
    static readonly BAKED_COD_STEW: Supplier;
    static readonly NOODLE_SOUP: Supplier;
    static readonly BACON_AND_EGGS: Supplier;
    static readonly PASTA_WITH_MEATBALLS: Supplier;
    static readonly PASTA_WITH_MUTTON_CHOP: Supplier;
    static readonly MUSHROOM_RICE: Supplier;
    static readonly ROASTED_MUTTON_CHOPS: Supplier;
    static readonly VEGETABLE_NOODLES: Supplier;
    static readonly STEAK_AND_POTATOES: Supplier;
    static readonly RATATOUILLE: Supplier;
    static readonly SQUID_INK_PASTA: Supplier;
    static readonly GRILLED_SALMON: Supplier;
    static readonly ROAST_CHICKEN_BLOCK: Supplier;
    static readonly ROAST_CHICKEN: Supplier;
    static readonly STUFFED_PUMPKIN_BLOCK: Supplier;
    static readonly STUFFED_PUMPKIN: Supplier;
    static readonly HONEY_GLAZED_HAM_BLOCK: Supplier;
    static readonly HONEY_GLAZED_HAM: Supplier;
    static readonly SHEPHERDS_PIE_BLOCK: Supplier;
    static readonly SHEPHERDS_PIE: Supplier;
    static readonly RICE_ROLL_MEDLEY_BLOCK: Supplier;
    static readonly DOG_FOOD: Supplier;
    static readonly HORSE_FEED: Supplier;
    static basicItem(): Properties;
    static bowlFoodItem(food: FoodProperties): Properties;
    static drinkItem(): Properties;
    static foodItem(food: FoodProperties): Properties;
    static knifeItem(tier: Tier): Properties;
    static registerWithTab(name: string, supplier: Supplier<Item>): Supplier<Item>;
  }


  class ModLootFunctions {
    static readonly LOOT_FUNCTIONS: DeferredRegister;
    static readonly COPY_SKILLET: Supplier;
    static readonly SMOKER_COOK: Supplier;
  }


  class ModLootModifiers {
    static readonly LOOT_MODIFIERS: DeferredRegister;
    static readonly ADD_ITEM: Supplier;
    static readonly REPLACE_ITEM: Supplier;
    static readonly ADD_LOOT_TABLE: Supplier;
    static readonly PASTRY_SLICING: Supplier;
  }


  class ModMaterials {
    static readonly FLINT: Tier;
  }


  class ModMenuTypes {
    static readonly MENU_TYPES: DeferredRegister;
    static readonly COOKING_POT: Supplier;
  }


  class ModParticleTypes {
    static readonly PARTICLE_TYPES: DeferredRegister;
    static readonly STAR: Supplier;
    static readonly STEAM: Supplier;
  }


  class ModPlacementModifiers {
    static readonly PLACEMENT_MODIFIERS: DeferredRegister;
    static readonly BIOME_TAG: Supplier;
  }


  class ModRecipeSerializers {
    static readonly RECIPE_SERIALIZERS: DeferredRegister;
    static readonly COOKING: Supplier;
    static readonly CUTTING: Supplier;
    static readonly FOOD_SERVING: Supplier;
    static readonly DOUGH: Supplier;
  }


  class ModRecipeTypes {
    static readonly RECIPE_TYPES: DeferredRegister;
    static readonly COOKING: Supplier;
    static readonly CUTTING: Supplier;
    static registerRecipeType<T extends Recipe<any>>(identifier: string): RecipeType<T>;
  }


  class ModSounds {
    static readonly SOUNDS: DeferredRegister;
    static readonly BLOCK_STOVE_CRACKLE: Supplier;
    static readonly BLOCK_COOKING_POT_BOIL: Supplier;
    static readonly BLOCK_COOKING_POT_BOIL_SOUP: Supplier;
    static readonly BLOCK_CUTTING_BOARD_KNIFE: Supplier;
    static readonly BLOCK_CABINET_OPEN: Supplier;
    static readonly BLOCK_CABINET_CLOSE: Supplier;
    static readonly BLOCK_SKILLET_SIZZLE: Supplier;
    static readonly BLOCK_SKILLET_ADD_FOOD: Supplier;
    static readonly ITEM_SKILLET_ATTACK_STRONG: Supplier;
    static readonly ITEM_SKILLET_ATTACK_WEAK: Supplier;
    static readonly ITEM_TOMATO_PICK_FROM_BUSH: Supplier;
    static readonly ENTITY_ROTTEN_TOMATO_THROW: Supplier;
    static readonly ENTITY_ROTTEN_TOMATO_HIT: Supplier;
  }

}

declare module 'vectorwing.farmersdelight.common.tag' {
  import { TagKey } from 'net.minecraft.tags';

  class CommonTags {
    static readonly MINEABLE_WITH_KNIFE: TagKey;
    static readonly STORAGE_BLOCKS_CARROT: TagKey;
    static readonly STORAGE_BLOCKS_POTATO: TagKey;
    static readonly STORAGE_BLOCKS_BEETROOT: TagKey;
    static readonly STORAGE_BLOCKS_CABBAGE: TagKey;
    static readonly STORAGE_BLOCKS_TOMATO: TagKey;
    static readonly STORAGE_BLOCKS_ONION: TagKey;
    static readonly STORAGE_BLOCKS_RICE: TagKey;
    static readonly STORAGE_BLOCKS_RICE_PANICLE: TagKey;
    static readonly STORAGE_BLOCKS_STRAW: TagKey;
    static readonly CROPS_CABBAGE: TagKey;
    static readonly CROPS_TOMATO: TagKey;
    static readonly CROPS_ONION: TagKey;
    static readonly CROPS_RICE: TagKey;
    static readonly CROPS_GRAIN: TagKey;
    static readonly FOODS_CABBAGE: TagKey;
    static readonly FOODS_TOMATO: TagKey;
    static readonly FOODS_ONION: TagKey;
    static readonly FOODS_LEAFY_GREEN: TagKey;
    static readonly FOODS_DOUGH: TagKey;
    static readonly FOODS_PASTA: TagKey;
    static readonly FOODS_MILK: TagKey;
    static readonly FOODS_RAW_BACON: TagKey;
    static readonly FOODS_RAW_BEEF: TagKey;
    static readonly FOODS_RAW_CHICKEN: TagKey;
    static readonly FOODS_RAW_PORK: TagKey;
    static readonly FOODS_RAW_MUTTON: TagKey;
    static readonly FOODS_SAFE_RAW_FISH: TagKey;
    static readonly FOODS_RAW_COD: TagKey;
    static readonly FOODS_RAW_SALMON: TagKey;
    static readonly FOODS_COOKED_BACON: TagKey;
    static readonly FOODS_COOKED_BEEF: TagKey;
    static readonly FOODS_COOKED_CHICKEN: TagKey;
    static readonly FOODS_COOKED_PORK: TagKey;
    static readonly FOODS_COOKED_MUTTON: TagKey;
    static readonly FOODS_COOKED_EGG: TagKey;
    static readonly FOODS_COOKED_COD: TagKey;
    static readonly FOODS_COOKED_SALMON: TagKey;
    static readonly TOOLS_KNIFE: TagKey;
    static readonly STORAGE_BLOCKS_ITEM_CARROT: TagKey;
    static readonly STORAGE_BLOCKS_ITEM_POTATO: TagKey;
    static readonly STORAGE_BLOCKS_ITEM_BEETROOT: TagKey;
    static readonly STORAGE_BLOCKS_ITEM_CABBAGE: TagKey;
    static readonly STORAGE_BLOCKS_ITEM_TOMATO: TagKey;
    static readonly STORAGE_BLOCKS_ITEM_ONION: TagKey;
    static readonly STORAGE_BLOCKS_ITEM_RICE: TagKey;
    static readonly STORAGE_BLOCKS_ITEM_RICE_PANICLE: TagKey;
    static readonly STORAGE_BLOCKS_ITEM_STRAW: TagKey;
  }


  class CompatibilityTags {
    static readonly CREATE: string;
    static readonly CREATE_PASSIVE_BOILER_HEATERS: TagKey;
    static readonly CREATE_BRITTLE: TagKey;
    static readonly CREATE_UPRIGHT_ON_BELT: TagKey;
    static readonly CREATE_CA: string;
    static readonly CREATE_CA_PLANT_FOODS: TagKey;
    static readonly CREATE_CA_PLANTS: TagKey;
    static readonly ORIGINS: string;
    static readonly ORIGINS_MEAT: TagKey;
    static readonly SERENE_SEASONS: string;
    static readonly SERENE_SEASONS_AUTUMN_CROPS_BLOCK: TagKey;
    static readonly SERENE_SEASONS_SPRING_CROPS_BLOCK: TagKey;
    static readonly SERENE_SEASONS_SUMMER_CROPS_BLOCK: TagKey;
    static readonly SERENE_SEASONS_WINTER_CROPS_BLOCK: TagKey;
    static readonly SERENE_SEASONS_UNBREAKABLE_FERTILE_CROPS: TagKey;
    static readonly SERENE_SEASONS_AUTUMN_CROPS: TagKey;
    static readonly SERENE_SEASONS_SPRING_CROPS: TagKey;
    static readonly SERENE_SEASONS_SUMMER_CROPS: TagKey;
    static readonly SERENE_SEASONS_WINTER_CROPS: TagKey;
    static readonly TINKERS_CONSTRUCT: string;
    static readonly TINKERS_CONSTRUCT_SEEDS: TagKey;
  }


  class ModTags {
    static readonly MINEABLE_WITH_KNIFE: TagKey;
    static readonly TERRAIN: TagKey;
    static readonly STRAW_BLOCKS: TagKey;
    static readonly WILD_CROPS: TagKey;
    static readonly ROPES: TagKey;
    static readonly HEAT_SOURCES: TagKey;
    static readonly HEAT_CONDUCTORS: TagKey;
    static readonly TRAY_HEAT_SOURCES: TagKey;
    static readonly COMPOST_ACTIVATORS: TagKey;
    static readonly MUSHROOM_COLONY_GROWABLE_ON: TagKey;
    static readonly UNAFFECTED_BY_RICH_SOIL: TagKey;
    static readonly DROPS_CAKE_SLICE: TagKey;
    static readonly CAMPFIRE_SIGNAL_SMOKE: TagKey;
    static readonly KNIFE_ENCHANTABLE: TagKey;
    static readonly MEALS: TagKey;
    static readonly DRINKS: TagKey;
    static readonly FEASTS: TagKey;
    static readonly WILD_CROPS_ITEM: TagKey;
    static readonly STRAW_HARVESTERS: TagKey;
    static readonly CABBAGE_ROLL_INGREDIENTS: TagKey;
    static readonly OFFHAND_EQUIPMENT: TagKey;
    static readonly KNIVES: TagKey;
    static readonly CANVAS_SIGNS: TagKey;
    static readonly HANGING_CANVAS_SIGNS: TagKey;
    static readonly WOODEN_CABINETS: TagKey;
    static readonly CABINETS: TagKey;
    static readonly SERVING_CONTAINERS: TagKey;
    static readonly FLAT_ON_CUTTING_BOARD: TagKey;
    static readonly DOG_FOOD_USERS: TagKey;
    static readonly HORSE_FEED_USERS: TagKey;
    static readonly HORSE_FEED_TEMPTED: TagKey;
  }

}

declare module 'vectorwing.farmersdelight.common.utility' {
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { IItemHandler, IItemHandlerModifiable } from 'net.neoforged.neoforge.items';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Function, Consumer } from 'java.util.function';
  import { List, Random } from 'java.util';
  import { Recipe } from 'net.minecraft.world.item.crafting';
  import { EnchantmentEffectComponents } from 'vectorwing.farmersdelight.common.utility.RegistryUtils';
  import { MutableComponent, Component } from 'net.minecraft.network.chat';

  class ClientRenderUtils {
    static isCursorInsideBounds(iconX: number, iconY: number, iconWidth: number, iconHeight: number, cursorX: number, cursorY: number): boolean;
  }


  class ItemUtils {
    static dropItems(level: Level, pos: BlockPos, inventory: IItemHandler): void;
    static isInventoryEmpty(inventory: IItemHandler): boolean;
    static spawnItemEntity(level: Level, stack: ItemStack, x: number, y: number, z: number, xMotion: number, yMotion: number, zMotion: number): void;
  }


  class ListUtils {
    static mapArrayIndexSet<F, T, L extends T[]>(array: F[], mapper: Function<F, T>, list: L): L;
  }


  class MathUtils {
    static readonly RAND: Random;
    static calcRedstoneFromItemHandler(handler: IItemHandlerModifiable): number;
  }


  class RecipeUtils {
    static getResultItem(recipe: Recipe<any>): ItemStack;
  }


  class RegistryUtils {
    static createEnchantmentEffectComponents(modid: string): EnchantmentEffectComponents;
  }


  class TextUtils {
    static addFoodEffectTooltip(stack: ItemStack, tooltipAdder: Consumer<Component>, durationFactor: number, tickRate: number): void;
    static getTranslation(key: string, ...args: any[]): MutableComponent;
  }

}

declare module 'vectorwing.farmersdelight.common.utility.RegistryUtils' {
  import { DeferredRegister, DeferredHolder } from 'net.neoforged.neoforge.registries';
  import { DataComponentType } from 'net.minecraft.core.component';
  import { UnaryOperator } from 'java.util.function';
  import { Builder } from 'DataComponentType';

  interface EnchantmentEffectComponents extends DeferredRegister<DataComponentType> {}
  class EnchantmentEffectComponents extends DeferredRegister<DataComponentType> {
    registerComponentType<D>(name: string, builder: UnaryOperator<Builder<D>>): DeferredHolder<DataComponentType<any>, DataComponentType<D>>;
  }

}

declare module 'vectorwing.farmersdelight.common.world.feature' {
  import { Feature, FeaturePlaceContext } from 'net.minecraft.world.level.levelgen.feature';
  import { WildCropConfiguration } from 'vectorwing.farmersdelight.common.world.configuration';
  import { Codec } from 'com.mojang.serialization';
  import { RandomPatchConfiguration } from 'net.minecraft.world.level.levelgen.feature.configurations';

  interface WildCropFeature extends Feature<WildCropConfiguration> {}
  class WildCropFeature extends Feature<WildCropConfiguration> {
    constructor(codec: Codec<WildCropConfiguration>);
    place(context: FeaturePlaceContext<WildCropConfiguration>): boolean;
  }


  interface WildRiceFeature extends Feature<RandomPatchConfiguration> {}
  class WildRiceFeature extends Feature<RandomPatchConfiguration> {
    constructor(configFactoryIn: Codec<RandomPatchConfiguration>);
    place(context: FeaturePlaceContext<RandomPatchConfiguration>): boolean;
  }

}

declare module 'vectorwing.farmersdelight.common.world.filter' {
  import { PlacementFilter, PlacementModifierType } from 'net.minecraft.world.level.levelgen.placement';
  import { MapCodec } from 'com.mojang.serialization';
  import { TagKey } from 'net.minecraft.tags';
  import { Biome } from 'net.minecraft.world.level.biome';

  interface BiomeTagFilter extends PlacementFilter {}
  class BiomeTagFilter extends PlacementFilter {
    static readonly CODEC: MapCodec;
    static biomeIsInTag(biomeTag: TagKey<Biome>): BiomeTagFilter;
    type(): PlacementModifierType<any>;
  }

}

declare module 'vectorwing.farmersdelight.common.world' {
  import { ServerAboutToStartEvent } from 'net.neoforged.neoforge.event.server';
  import { Registry } from 'net.minecraft.core';
  import { StructureTemplatePool } from 'net.minecraft.world.level.levelgen.structure.pools';
  import { StructureProcessorList } from 'net.minecraft.world.level.levelgen.structure.templatesystem';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';

  class VillageStructures {
    static addBuildingToPool(templatePoolRegistry: Registry<StructureTemplatePool>, processorListRegistry: Registry<StructureProcessorList>, poolRL: ResourceLocation, nbtPieceRL: string, weight: number): void;
    static addNewVillageBuilding(event: ServerAboutToStartEvent): void;
  }


  class WildCropGeneration {
    static FEATURE_PATCH_SANDY_SHRUB: ResourceKey;
    static FEATURE_PATCH_WILD_CABBAGES: ResourceKey;
    static FEATURE_PATCH_WILD_ONIONS: ResourceKey;
    static FEATURE_PATCH_WILD_TOMATOES: ResourceKey;
    static FEATURE_PATCH_WILD_CARROTS: ResourceKey;
    static FEATURE_PATCH_WILD_POTATOES: ResourceKey;
    static FEATURE_PATCH_WILD_BEETROOTS: ResourceKey;
    static FEATURE_PATCH_WILD_RICE: ResourceKey;
    static FEATURE_PATCH_BROWN_MUSHROOM_COLONIES: ResourceKey;
    static FEATURE_PATCH_RED_MUSHROOM_COLONIES: ResourceKey;
    static PATCH_WILD_CABBAGES: ResourceKey;
    static PATCH_WILD_ONIONS: ResourceKey;
    static PATCH_WILD_TOMATOES: ResourceKey;
    static PATCH_WILD_CARROTS: ResourceKey;
    static PATCH_WILD_POTATOES: ResourceKey;
    static PATCH_WILD_BEETROOTS: ResourceKey;
    static PATCH_WILD_RICE: ResourceKey;
    static PATCH_BROWN_MUSHROOM_COLONIES: ResourceKey;
    static PATCH_RED_MUSHROOM_COLONIES: ResourceKey;
    static load(): void;
  }

}

declare module 'vectorwing.farmersdelight.data.advancement' {
  import { AdvancementGenerator } from 'AdvancementProvider';
  import { Provider } from 'HolderLookup';
  import { Consumer } from 'java.util.function';
  import { AdvancementHolder } from 'net.minecraft.advancements';
  import { ExistingFileHelper } from 'net.neoforged.neoforge.common.data';

  interface FDAdvancementGenerator extends AdvancementGenerator {}
  class FDAdvancementGenerator extends AdvancementGenerator {
    generate(registries: Provider, consumer: Consumer<AdvancementHolder>, existingFileHelper: ExistingFileHelper): void;
  }

}

declare module 'vectorwing.farmersdelight.data' {
  import { AdvancementProvider, ExistingFileHelper, BlockTagsProvider, DataMapProvider } from 'net.neoforged.neoforge.common.data';
  import { PackOutput } from 'net.minecraft.data';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';
  import { BlockStateProvider, ModelFile, ConfiguredModel, ItemModelProvider } from 'net.neoforged.neoforge.client.model.generators';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Block } from 'net.minecraft.world.level.block';
  import { Function, Predicate } from 'java.util.function';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Property, IntegerProperty } from 'net.minecraft.world.level.block.state.properties';
  import { List, Collection, Set } from 'java.util';
  import { Integer } from 'java.lang';
  import { FeastBlock } from 'vectorwing.farmersdelight.common.block';
  import { TagsProvider, EnchantmentTagsProvider, EntityTypeTagsProvider, ItemTagsProvider } from 'net.minecraft.data.tags';
  import { DamageType } from 'net.minecraft.world.damagesource';
  import { GatherDataEvent } from 'net.neoforged.neoforge.data.event';
  import { Item } from 'net.minecraft.world.item';
  import { TagLookup } from 'TagsProvider';
  import { BootstrapContext } from 'net.minecraft.data.worldgen';
  import { Enchantment } from 'net.minecraft.world.item.enchantment';
  import { RecipeProvider } from 'net.minecraft.data.recipes';

  interface Advancements extends AdvancementProvider {}
  class Advancements extends AdvancementProvider {
    constructor(output: PackOutput, lookupProvider: CompletableFuture<Provider>, existingFileHelper: ExistingFileHelper);
  }


  interface BlockStates extends BlockStateProvider {}
  class BlockStates extends BlockStateProvider {
    constructor(output: PackOutput, existingFileHelper: ExistingFileHelper);
    cabinetBlock(block: Block, woodType: string): void;
    crateBlock(block: Block, cropName: string): void;
    cubeRandomRotation(block: Block, suffix: string): ConfiguredModel[];
    customDirectionalBlock(block: Block, modelFunc: Function<BlockState, ModelFile>, ...ignored: Property<any>[]): void;
    customHorizontalBlock(block: Block, modelFunc: Function<BlockState, ModelFile>, ...ignored: Property<any>[]): void;
    customStageBlock(block: Block, parent: ResourceLocation, textureKey: string, ageProperty: IntegerProperty, suffixes: number[], ...ignored: Property<any>[]): void;
    doublePlantBlock(block: Block): void;
    existingModel(block: Block): ModelFile;
    existingModel(path: string): ModelFile;
    feastBlock(block: FeastBlock): void;
    pieBlock(block: Block): void;
    resourceBlock(path: string): ResourceLocation;
    stageBlock(block: Block, ageProperty: IntegerProperty, ...ignored: Property<any>[]): void;
    wildCropBlock(block: Block): void;
    wildCropBlock(block: Block, isBushCrop: boolean): void;
  }


  interface BlockTags extends BlockTagsProvider {}
  class BlockTags extends BlockTagsProvider {
    constructor(output: PackOutput, lookupProvider: CompletableFuture<Provider>, existingFileHelper: ExistingFileHelper);
  }


  interface DamageTypeTags extends TagsProvider<DamageType> {}
  class DamageTypeTags extends TagsProvider<DamageType> {
    constructor(output: PackOutput, lookupProvider: CompletableFuture<Provider>, modId: string, existingFileHelper: ExistingFileHelper);
  }


  class DataGenerators {
    static gatherData(event: GatherDataEvent): void;
  }


  interface DataMaps extends DataMapProvider {}
  class DataMaps extends DataMapProvider {
  }


  interface EnchantmentTags extends EnchantmentTagsProvider {}
  class EnchantmentTags extends EnchantmentTagsProvider {
    constructor(output: PackOutput, lookupProvider: CompletableFuture<Provider>, existingFileHelper: ExistingFileHelper);
  }


  interface EntityTags extends EntityTypeTagsProvider {}
  class EntityTags extends EntityTypeTagsProvider {
    constructor(output: PackOutput, lookupProvider: CompletableFuture<Provider>, existingFileHelper: ExistingFileHelper);
  }


  interface ItemModels extends ItemModelProvider {}
  class ItemModels extends ItemModelProvider {
    static readonly GENERATED: string;
    static readonly HANDHELD: string;
    static readonly MUG: ResourceLocation;
    constructor(output: PackOutput, existingFileHelper: ExistingFileHelper);
    blockBasedModel(item: Item, suffix: string): void;
    itemGeneratedModel(item: Item, texture: ResourceLocation): void;
    itemHandheldModel(item: Item, texture: ResourceLocation): void;
    itemMugModel(item: Item, texture: ResourceLocation): void;
    resourceBlock(path: string): ResourceLocation;
    resourceItem(path: string): ResourceLocation;
    static takeAll<T>(src: Set<T>, ...items: T[]): Collection<T>;
    static takeAll<T>(src: Set<T>, pred: Predicate<T>): Collection<T>;
  }


  interface ItemTags extends ItemTagsProvider {}
  class ItemTags extends ItemTagsProvider {
    constructor(output: PackOutput, provider: CompletableFuture<Provider>, blockTagProvider: CompletableFuture<TagLookup<Block>>, existingFileHelper: ExistingFileHelper);
    registerCommonTags(): void;
    registerCompatibilityTags(): void;
  }


  class ModEnchantments {
    static readonly BACKSTABBING: ResourceKey;
    static bootstrap(context: BootstrapContext<Enchantment>): void;
  }


  interface Recipes extends RecipeProvider {}
  class Recipes extends RecipeProvider {
    constructor(output: PackOutput, registries: CompletableFuture<Provider>);
  }

}

declare module 'vectorwing.farmersdelight.data.builder' {
  import { RecipeBuilder, RecipeOutput } from 'net.minecraft.data.recipes';
  import { ItemLike } from 'net.minecraft.world.level';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { TagKey } from 'net.minecraft.tags';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { CookingPotRecipeBookTab } from 'vectorwing.farmersdelight.client.recipebook';
  import { Criterion } from 'net.minecraft.advancements';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { SoundEvent } from 'net.minecraft.sounds';

  interface CookingPotRecipeBuilder extends RecipeBuilder {}
  class CookingPotRecipeBuilder extends RecipeBuilder {
    constructor(result: ItemLike, count: number, cookingTime: number, experience: number, container: ItemLike);

    constructor(resultIn: ItemStack, cookingTime: number, experience: number, container: ItemLike);
    addIngredient(tagIn: TagKey<Item>): CookingPotRecipeBuilder;
    addIngredient(itemIn: ItemLike): CookingPotRecipeBuilder;
    addIngredient(itemIn: ItemLike, quantity: number): CookingPotRecipeBuilder;
    addIngredient(ingredientIn: Ingredient): CookingPotRecipeBuilder;
    addIngredient(ingredientIn: Ingredient, quantity: number): CookingPotRecipeBuilder;
    build(output: RecipeOutput): void;
    build(outputIn: RecipeOutput, save: string): void;
    static cookingPotRecipe(mainResult: ItemLike, count: number, cookingTime: number, experience: number): CookingPotRecipeBuilder;
    static cookingPotRecipe(mainResult: ItemLike, count: number, cookingTime: number, experience: number, container: ItemLike): CookingPotRecipeBuilder;
    get result(): Item;
    group(p_176495_: string): RecipeBuilder;
    save(output: RecipeOutput, id: ResourceLocation): void;
    setRecipeBookTab(tab: CookingPotRecipeBookTab): CookingPotRecipeBuilder;
    unlockedBy(criterionName: string, criterionTrigger: Criterion<any>): CookingPotRecipeBuilder;
    unlockedByAnyIngredient(...items: ItemLike[]): CookingPotRecipeBuilder;
    unlockedByItems(criterionName: string, ...items: ItemLike[]): CookingPotRecipeBuilder;
  }


  interface CuttingBoardRecipeBuilder extends RecipeBuilder {}
  class CuttingBoardRecipeBuilder extends RecipeBuilder {
    addResult(result: ItemLike): CuttingBoardRecipeBuilder;
    addResult(result: ItemLike, count: number): CuttingBoardRecipeBuilder;
    addResultWithChance(result: ItemLike, chance: number): CuttingBoardRecipeBuilder;
    addResultWithChance(result: ItemLike, chance: number, count: number): CuttingBoardRecipeBuilder;
    addSound(soundEvent: SoundEvent): CuttingBoardRecipeBuilder;
    build(output: RecipeOutput): void;
    build(outputIn: RecipeOutput, save: string): void;
    build(output: RecipeOutput, id: ResourceLocation): void;
    static cuttingRecipe(ingredient: Ingredient, tool: Ingredient, mainResult: ItemLike, count: number): CuttingBoardRecipeBuilder;
    static cuttingRecipe(ingredient: Ingredient, tool: Ingredient, mainResult: ItemLike, count: number, chance: number): CuttingBoardRecipeBuilder;
    static cuttingRecipe(ingredient: Ingredient, tool: Ingredient, mainResult: ItemLike): CuttingBoardRecipeBuilder;
    get result(): Item;
    group(p_176495_: string): RecipeBuilder;
    save(output: RecipeOutput, id: ResourceLocation): void;
    unlockedBy(p_176496_: string, p_301065_: Criterion<any>): RecipeBuilder;
  }

}

declare module 'vectorwing.farmersdelight.data.loot' {
  import { BlockLootSubProvider } from 'net.minecraft.data.loot';
  import { Provider } from 'HolderLookup';

  interface FDBlockLoot extends BlockLootSubProvider {}
  class FDBlockLoot extends BlockLootSubProvider {
    constructor(holder: Provider);
  }

}

declare module 'vectorwing.farmersdelight.data.recipe' {
  import { RecipeOutput } from 'net.minecraft.data.recipes';
  import { ItemLike } from 'net.minecraft.world.level';
  import { TagKey } from 'net.minecraft.tags';
  import { Item } from 'net.minecraft.world.item';

  class CookingRecipes {
    static readonly FAST_COOKING: number;
    static readonly NORMAL_COOKING: number;
    static readonly SLOW_COOKING: number;
    static readonly SMALL_EXP: number;
    static readonly MEDIUM_EXP: number;
    static readonly LARGE_EXP: number;
    static register(output: RecipeOutput): void;
  }


  class CraftingRecipes {
    static canvasSignDyeing(output: RecipeOutput, canvasSign: ItemLike, hangingCanvasSign: ItemLike, dyeTag: TagKey<Item>): void;
    static register(output: RecipeOutput): void;
  }


  class CuttingRecipes {
    static register(output: RecipeOutput): void;
  }


  class SmeltingRecipes {
    static register(output: RecipeOutput): void;
  }

}

declare module 'vectorwing.farmersdelight.data.tools' {
  import { DataProvider, PackOutput, CachedOutput } from 'net.minecraft.data';
  import { ExistingFileHelper } from 'net.neoforged.neoforge.common.data';
  import { CompletableFuture } from 'java.util.concurrent';

  interface StructureUpdater extends DataProvider {}
  class StructureUpdater extends DataProvider {
    constructor(basePath: string, modid: string, helper: ExistingFileHelper, output: PackOutput);
    get name(): string;
    run(cache: CachedOutput): CompletableFuture<any>;
  }

}

declare module 'vectorwing.farmersdelight' {
  import { Logger } from 'org.apache.logging.log4j';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';

  class FarmersDelight {
    static readonly MODID: string;
    static readonly LOGGER: Logger;
    constructor(modEventBus: IEventBus, modContainer: ModContainer);
  }

}

declare module 'vectorwing.farmersdelight.integration.crafttweaker.actions' {
  import { ActionRecipeBase } from 'com.blamejared.crafttweaker.api.action.recipe';
  import { IRecipeManager } from 'com.blamejared.crafttweaker.api.recipe.manager.base';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { Logger } from 'org.apache.logging.log4j';

  interface ActionRemoveCuttingBoardRecipe<T extends Recipe<any> = any> extends ActionRecipeBase<T> {}
  class ActionRemoveCuttingBoardRecipe<T extends Recipe<any> = any> extends ActionRecipeBase<T> {
    constructor(manager: IRecipeManager<T>, outputs: IItemStack[]);
    apply(): void;
    describe(): string;
    validate(logger: Logger): boolean;
  }

}

declare module 'vectorwing.farmersdelight.integration.crafttweaker' {
  import { IIngredient } from 'com.blamejared.crafttweaker.api.ingredient';
  import { ItemAbility } from 'net.neoforged.neoforge.common';
  import { ItemAbilityIngredient } from 'vectorwing.farmersdelight.common.crafting.ingredient';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { IngredientTransformers } from 'com.blamejared.crafttweaker.api.ingredient.transformer';
  import { IngredientConditions } from 'com.blamejared.crafttweaker.api.ingredient.condition';
  import { ICraftTweakerPlugin, IRecipeComponentRegistrationHandler } from 'com.blamejared.crafttweaker.api.plugin';
  import { Logger } from 'org.apache.logging.log4j';

  class CTCookingPotRecipeBookTab {
  }


  interface CTItemAbilityIngredient extends IIngredient {}
  class CTItemAbilityIngredient extends IIngredient {
    static readonly PREFIX: string;
    constructor(itemAbility: ItemAbility);

    constructor(ingredient: ItemAbilityIngredient);
    asVanillaIngredient(): Ingredient;
    conditions(): IngredientConditions;
    get commandString(): string;
    get items(): IItemStack[];
    matches(stack: IItemStack): boolean;
    transformers(): IngredientTransformers;
  }


  interface FarmersDelightCrTPlugin extends ICraftTweakerPlugin {}
  class FarmersDelightCrTPlugin extends ICraftTweakerPlugin {
    static readonly LOGGER_CT: Logger;
    registerRecipeComponents(handler: IRecipeComponentRegistrationHandler): void;
  }

}

declare module 'vectorwing.farmersdelight.integration.crafttweaker.CTItemAbilityIngredient' {
  import { IIngredient } from 'com.blamejared.crafttweaker.api.ingredient';
  import { ItemAbility } from 'net.neoforged.neoforge.common';

  class ExpandItemAbility {
    static asIIngredient(internal: ItemAbility): IIngredient;
  }

}

declare module 'vectorwing.farmersdelight.integration.crafttweaker.handlers' {
  import { IRecipeHandler } from 'com.blamejared.crafttweaker.api.recipe.handler';
  import { CookingPotRecipe, CuttingBoardRecipe } from 'vectorwing.farmersdelight.common.crafting';
  import { IRecipeManager } from 'com.blamejared.crafttweaker.api.recipe.manager.base';
  import { RegistryAccess } from 'net.minecraft.core';
  import { RecipeHolder, Recipe } from 'net.minecraft.world.item.crafting';
  import { Optional } from 'java.util';
  import { IDecomposedRecipe, IRecipeComponent } from 'com.blamejared.crafttweaker.api.recipe.component';

  interface CookingPotRecipeHandler extends IRecipeHandler<CookingPotRecipe> {}
  class CookingPotRecipeHandler extends IRecipeHandler<CookingPotRecipe> {
    decompose(manager: IRecipeManager<CookingPotRecipe>, registryAccess: RegistryAccess, recipe: CookingPotRecipe): Optional<IDecomposedRecipe>;
    doesConflict<U extends Recipe<any>>(manager: IRecipeManager<CookingPotRecipe>, firstRecipe: CookingPotRecipe, secondRecipe: U): boolean;
    dumpToCommandString(manager: IRecipeManager<CookingPotRecipe>, registryAccess: RegistryAccess, recipe: RecipeHolder<CookingPotRecipe>): string;
    recompose(manager: IRecipeManager<CookingPotRecipe>, registryAccess: RegistryAccess, recipe: IDecomposedRecipe): Optional<CookingPotRecipe>;
  }


  interface CuttingBoardRecipeHandler extends IRecipeHandler<CuttingBoardRecipe> {}
  class CuttingBoardRecipeHandler extends IRecipeHandler<CuttingBoardRecipe> {
    decompose(manager: IRecipeManager<CuttingBoardRecipe>, registryAccess: RegistryAccess, recipe: CuttingBoardRecipe): Optional<IDecomposedRecipe>;
    doesConflict<U extends Recipe<any>>(manager: IRecipeManager<CuttingBoardRecipe>, firstRecipe: CuttingBoardRecipe, secondRecipe: U): boolean;
    dumpToCommandString(manager: IRecipeManager<CuttingBoardRecipe>, registryAccess: RegistryAccess, recipe: RecipeHolder<CuttingBoardRecipe>): string;
    recompose(manager: IRecipeManager<CuttingBoardRecipe>, registryAccess: RegistryAccess, recipe: IDecomposedRecipe): Optional<CuttingBoardRecipe>;
  }


  class RecipeHandlerUtils {
    static readonly SOUND_COMPONENT: IRecipeComponent;
    static readonly COOKING_TAB_COMPONENT: IRecipeComponent;
    static readonly TOOL_COMPONENT: IRecipeComponent;
    static readonly CONTAINER_COMPONENT: IRecipeComponent;
  }

}

declare module 'vectorwing.farmersdelight.integration.crafttweaker.managers' {
  import { IRecipeManager } from 'com.blamejared.crafttweaker.api.recipe.manager.base';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { IIngredient } from 'com.blamejared.crafttweaker.api.ingredient';
  import { CookingPotRecipeBookTab } from 'vectorwing.farmersdelight.client.recipebook';
  import { RecipeType } from 'net.minecraft.world.item.crafting';
  import { CookingPotRecipe, CuttingBoardRecipe } from 'vectorwing.farmersdelight.common.crafting';
  import { Percentaged } from 'com.blamejared.crafttweaker.api.util.random';

  interface CookingPotRecipeManager extends IRecipeManager {}
  class CookingPotRecipeManager extends IRecipeManager {
    addRecipe(name: string, output: IItemStack, inputs: IIngredient[], cookingPotRecipeBookTab: CookingPotRecipeBookTab, container: IItemStack, experience: number, cookTime: number): void;
    get recipeType(): RecipeType<CookingPotRecipe>;
  }


  interface CuttingBoardRecipeManager extends IRecipeManager {}
  class CuttingBoardRecipeManager extends IRecipeManager {
    addRecipe(name: string, input: IIngredient, results: Percentaged<IItemStack>, tool: IIngredient, sound: string): void;
    get recipeType(): RecipeType<CuttingBoardRecipe>;
    removeRecipe(outputs: IItemStack[]): void;
  }

}

declare module 'vectorwing.farmersdelight.integration.jei.category' {
  import { IRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { RecipeHolder } from 'net.minecraft.world.item.crafting';
  import { IGuiHelper } from 'mezz.jei.api.helpers';
  import { RecipeType, IFocusGroup } from 'mezz.jei.api.recipe';
  import { CookingPotRecipe, CuttingBoardRecipe } from 'vectorwing.farmersdelight.common.crafting';
  import { Component } from 'net.minecraft.network.chat';
  import { IDrawable } from 'mezz.jei.api.gui.drawable';
  import { IRecipeLayoutBuilder } from 'mezz.jei.api.gui.builder';
  import { IRecipeSlotsView } from 'mezz.jei.api.gui.ingredient';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { DecompositionDummy } from 'vectorwing.farmersdelight.integration.jei.resource';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface CookingRecipeCategory extends IRecipeCategory<RecipeHolder> {}
  class CookingRecipeCategory extends IRecipeCategory<RecipeHolder> {
    constructor(helper: IGuiHelper);
    draw(holder: RecipeHolder<CookingPotRecipe>, recipeSlotsView: IRecipeSlotsView, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get background(): IDrawable;
    get icon(): IDrawable;
    get recipeType(): RecipeType<RecipeHolder<CookingPotRecipe>>;
    get title(): Component;
    getTooltipStrings(holder: RecipeHolder<CookingPotRecipe>, recipeSlotsView: IRecipeSlotsView, mouseX: number, mouseY: number): Component[];
    setRecipe(builder: IRecipeLayoutBuilder, holder: RecipeHolder<CookingPotRecipe>, focusGroup: IFocusGroup): void;
  }


  interface CuttingRecipeCategory extends IRecipeCategory<RecipeHolder> {}
  class CuttingRecipeCategory extends IRecipeCategory<RecipeHolder> {
    static readonly OUTPUT_GRID_X: number;
    static readonly OUTPUT_GRID_Y: number;
    constructor(helper: IGuiHelper);
    draw(holder: RecipeHolder<CuttingBoardRecipe>, recipeSlotsView: IRecipeSlotsView, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get background(): IDrawable;
    get icon(): IDrawable;
    get recipeType(): RecipeType<RecipeHolder<CuttingBoardRecipe>>;
    get title(): Component;
    setRecipe(builder: IRecipeLayoutBuilder, holder: RecipeHolder<CuttingBoardRecipe>, focusGroup: IFocusGroup): void;
  }


  interface DecompositionRecipeCategory extends IRecipeCategory<DecompositionDummy> {}
  class DecompositionRecipeCategory extends IRecipeCategory<DecompositionDummy> {
    static readonly UID: ResourceLocation;
    constructor(helper: IGuiHelper);
    draw(recipe: DecompositionDummy, recipeSlotsView: IRecipeSlotsView, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get background(): IDrawable;
    get icon(): IDrawable;
    get recipeType(): RecipeType<DecompositionDummy>;
    get title(): Component;
    getTooltipStrings(recipe: DecompositionDummy, recipeSlotsView: IRecipeSlotsView, mouseX: number, mouseY: number): Component[];
    setRecipe(builder: IRecipeLayoutBuilder, recipe: DecompositionDummy, focusGroup: IFocusGroup): void;
  }

}

declare module 'vectorwing.farmersdelight.integration.jei' {
  import { List } from 'java.util';
  import { RecipeHolder, CraftingRecipe } from 'net.minecraft.world.item.crafting';
  import { CookingPotRecipe, CuttingBoardRecipe } from 'vectorwing.farmersdelight.common.crafting';
  import { RecipeType } from 'mezz.jei.api.recipe';
  import { IModPlugin } from 'mezz.jei.api';
  import { IRecipeCategoryRegistration, IRecipeRegistration, IRecipeCatalystRegistration, IGuiHandlerRegistration, IRecipeTransferRegistration } from 'mezz.jei.api.registration';
  import { ResourceLocation } from 'net.minecraft.resources';

  class FDRecipes {
    constructor();
    get cookingPotRecipes(): RecipeHolder<CookingPotRecipe>[];
    get cuttingBoardRecipes(): RecipeHolder<CuttingBoardRecipe>[];
    get specialWheatDoughRecipe(): RecipeHolder<CraftingRecipe>[];
  }


  class FDRecipeTypes {
    static readonly COOKING: RecipeType;
    static readonly CUTTING: RecipeType;
    static readonly DECOMPOSITION: RecipeType;
  }


  interface JEIPlugin extends IModPlugin {}
  class JEIPlugin extends IModPlugin {
    get pluginUid(): ResourceLocation;
    registerCategories(registry: IRecipeCategoryRegistration): void;
    registerGuiHandlers(registration: IGuiHandlerRegistration): void;
    registerRecipeCatalysts(registration: IRecipeCatalystRegistration): void;
    registerRecipeTransferHandlers(registration: IRecipeTransferRegistration): void;
    registerRecipes(registration: IRecipeRegistration): void;
  }

}

declare module 'vectorwing.farmersdelight.integration.jei.resource' {
  import { List } from 'java.util';
  import { RecipeHolder, CraftingRecipe } from 'net.minecraft.world.item.crafting';

  class DecompositionDummy {
  }


  class DoughRecipeMaker {
    static createRecipe(): RecipeHolder<CraftingRecipe>[];
  }

}