declare module 'it.hurts.sskirillss.relics.api.events.base' {
  import { Event } from 'net.neoforged.bus.api';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { ItemStack } from 'net.minecraft.world.item';

  interface RelicEvent extends Event {}
  class RelicEvent extends Event {
    constructor(entity: LivingEntity, stack: ItemStack);
    get entity(): LivingEntity;
    get stack(): ItemStack;
  }

}

declare module 'it.hurts.sskirillss.relics.api.events.common' {
  import { PlayerContainerEvent } from 'net.neoforged.neoforge.event.entity.player';
  import { ICancellableEvent, Event } from 'net.neoforged.bus.api';
  import { Player } from 'net.minecraft.world.entity.player';
  import { AbstractContainerMenu, Slot, ClickAction } from 'net.minecraft.world.inventory';
  import { ItemStack } from 'net.minecraft.world.item';
  import { EntityEvent } from 'net.neoforged.neoforge.event.entity';
  import { Entity, LivingEntity } from 'net.minecraft.world.entity';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { LivingEvent } from 'net.neoforged.neoforge.event.entity.living';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface ContainerSlotClickEvent extends ICancellableEvent, PlayerContainerEvent {}
  class ContainerSlotClickEvent extends ICancellableEvent {
    constructor(player: Player, container: AbstractContainerMenu, slot: Slot, action: ClickAction, heldStack: ItemStack, slotStack: ItemStack);
    get action(): ClickAction;
    get heldStack(): ItemStack;
    get slot(): Slot;
    get slotStack(): ItemStack;
  }


  interface EntityBlockSpeedFactorEvent extends EntityEvent {}
  class EntityBlockSpeedFactorEvent extends EntityEvent {
    constructor(entity: Entity, state: BlockState, speedFactor: number);
    get speedFactor(): number;
    get state(): BlockState;
    set speedFactor(speedFactor: number);
  }


  interface FluidCollisionEvent extends ICancellableEvent, LivingEvent {}
  class FluidCollisionEvent extends ICancellableEvent {
    constructor(entity: LivingEntity, fluid: FluidState);
    get fluid(): FluidState;
  }


  interface LivingSlippingEvent extends LivingEvent {}
  class LivingSlippingEvent extends LivingEvent {
    constructor(entity: LivingEntity, state: BlockState, friction: number);
    get friction(): number;
    get state(): BlockState;
    set friction(friction: number);
  }


  interface TooltipDisplayEvent extends Event {}
  class TooltipDisplayEvent extends Event {
    constructor(stack: ItemStack, graphics: GuiGraphics, width: number, height: number, x: number, y: number);
    equals(o: any): boolean;
    get graphics(): GuiGraphics;
    get height(): number;
    get stack(): ItemStack;
    get width(): number;
    get x(): number;
    get y(): number;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.api.events.leveling' {
  import { RelicEvent } from 'it.hurts.sskirillss.relics.api.events.base';
  import { ICancellableEvent } from 'net.neoforged.bus.api';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { ItemStack } from 'net.minecraft.world.item';

  interface ExperienceAddEvent extends ICancellableEvent, RelicEvent {}
  class ExperienceAddEvent extends ICancellableEvent {
    constructor(entity: LivingEntity, stack: ItemStack, amount: number);
    get amount(): number;
    set amount(amount: number);
  }

}

declare module 'it.hurts.sskirillss.relics.badges.ability.base' {
  import { AbilityBadge } from 'it.hurts.sskirillss.relics.badges.base';
  import { CastType } from 'it.hurts.sskirillss.relics.items.relics.base.data.cast.misc';
  import { List } from 'java.util';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { ItemStack } from 'net.minecraft.world.item';

  interface CastTypeBadge extends AbilityBadge {}
  class CastTypeBadge extends AbilityBadge {
    constructor(type: CastType);
    get type(): CastType;
    getHint(stack: ItemStack, ability: string): MutableComponent[];
    getHint(stack: ItemStack): MutableComponent[];
    isVisible(stack: ItemStack, ability: string): boolean;
    isVisible(stack: ItemStack): boolean;
  }

}

declare module 'it.hurts.sskirillss.relics.badges.ability' {
  import { CastTypeBadge } from 'it.hurts.sskirillss.relics.badges.ability.base';
  import { AbilityBadge } from 'it.hurts.sskirillss.relics.badges.base';
  import { ItemStack } from 'net.minecraft.world.item';

  interface ChargeableBadge extends CastTypeBadge {}
  class ChargeableBadge extends CastTypeBadge {
    constructor();
  }


  interface CyclicalBadge extends CastTypeBadge {}
  class CyclicalBadge extends CastTypeBadge {
    constructor();
  }


  interface FlawlessAbilityBadge extends AbilityBadge {}
  class FlawlessAbilityBadge extends AbilityBadge {
    constructor();
    isVisible(stack: ItemStack, ability: string): boolean;
    isVisible(stack: ItemStack): boolean;
  }


  interface InstantaneousBadge extends CastTypeBadge {}
  class InstantaneousBadge extends CastTypeBadge {
    constructor();
  }


  interface InterruptibleBadge extends CastTypeBadge {}
  class InterruptibleBadge extends CastTypeBadge {
    constructor();
  }


  interface OblivionBadge extends AbilityBadge {}
  class OblivionBadge extends AbilityBadge {
    constructor();
  }


  interface SilenceBadge extends AbilityBadge {}
  class SilenceBadge extends AbilityBadge {
    constructor();
    isVisible(stack: ItemStack, ability: string): boolean;
    isVisible(stack: ItemStack): boolean;
  }


  interface ToggleableBadge extends CastTypeBadge {}
  class ToggleableBadge extends CastTypeBadge {
    constructor();
  }

}

declare module 'it.hurts.sskirillss.relics.badges.base' {
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { ItemStack } from 'net.minecraft.world.item';
  import { List } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface AbilityBadge extends AbstractBadge {}
  class AbilityBadge extends AbstractBadge {
    constructor(id: string);
    get iconTexture(): ResourceLocation;
    get outlineTexture(): ResourceLocation;
    getDescription(stack: ItemStack, ability: string): MutableComponent[];
    getDescription(stack: ItemStack): MutableComponent[];
    getHint(stack: ItemStack, ability: string): MutableComponent[];
    getHint(stack: ItemStack): MutableComponent[];
    getTitle(stack: ItemStack, ability: string): MutableComponent;
    getTitle(stack: ItemStack): MutableComponent;
    isVisible(stack: ItemStack, ability: string): boolean;
    isVisible(stack: ItemStack): boolean;
  }


  interface AbstractBadge extends AbilityBadge, RelicBadge {}
  class AbstractBadge extends AbilityBadge {
    constructor(id: string);
    get iconTexture(): ResourceLocation;
    get id(): string;
    get outlineTexture(): ResourceLocation;
  }


  interface RelicBadge extends AbstractBadge {}
  class RelicBadge extends AbstractBadge {
    constructor(id: string);
    get iconTexture(): ResourceLocation;
    get outlineTexture(): ResourceLocation;
    getDescription(stack: ItemStack): MutableComponent[];
    getDescription(stack: ItemStack, ability: string): MutableComponent[];
    getHint(stack: ItemStack): MutableComponent[];
    getHint(stack: ItemStack, ability: string): MutableComponent[];
    getTitle(stack: ItemStack): MutableComponent;
    getTitle(stack: ItemStack, ability: string): MutableComponent;
    isVisible(stack: ItemStack): boolean;
    isVisible(stack: ItemStack, ability: string): boolean;
  }

}

declare module 'it.hurts.sskirillss.relics.badges.relic' {
  import { RelicBadge } from 'it.hurts.sskirillss.relics.badges.base';
  import { ItemStack } from 'net.minecraft.world.item';

  interface FlawlessRelicBadge extends RelicBadge {}
  class FlawlessRelicBadge extends RelicBadge {
    constructor();
    isVisible(stack: ItemStack): boolean;
    isVisible(stack: ItemStack, ability: string): boolean;
  }

}

declare module 'it.hurts.sskirillss.relics.blocks' {
  import { Block, HorizontalDirectionalBlock, EntityBlock } from 'net.minecraft.world.level.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level, BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { Entity } from 'net.minecraft.world.entity';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { Properties } from 'BlockBehaviour';
  import { BlockEntityTicker, BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { Builder } from 'StateDefinition';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';

  interface PhantomBlock extends Block {}
  class PhantomBlock extends Block {
    constructor();
    fallOn(level: Level, state: BlockState, pos: BlockPos, entity: Entity, fallDistance: number): void;
    getCollisionShape(state: BlockState, world: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    onPlace(state: BlockState, level: Level, pos: BlockPos, oldState: BlockState, movedByPiston: boolean): void;
    stepOn(level: Level, pos: BlockPos, state: BlockState, entity: Entity): void;
    updateEntityAfterFallOn(level: BlockGetter, entity: Entity): void;
  }


  interface ResearchingTableBlock extends EntityBlock, HorizontalDirectionalBlock {}
  class ResearchingTableBlock extends EntityBlock {
    constructor(properties: Properties);
    createBlockStateDefinition(builder: Builder<Block, BlockState>): void;
    getShape(state: BlockState, reader: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    getTicker<T extends BlockEntity>(level: Level, state: BlockState, type: BlockEntityType<T>): BlockEntityTicker<T>;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onRemove(state: BlockState, worldIn: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
  }

}

declare module 'it.hurts.sskirillss.relics.client.gui.layers' {
  import { Layer } from 'LayeredDraw';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { DeltaTracker } from 'net.minecraft.client';

  interface ActiveAbilitiesLayer extends Layer {}
  class ActiveAbilitiesLayer extends Layer {
    render(guiGraphics: GuiGraphics, deltaTracker: DeltaTracker): void;
  }


  interface InfoTileLayer extends Layer {}
  class InfoTileLayer extends Layer {
    render(guiGraphics: GuiGraphics, deltaTracker: DeltaTracker): void;
  }


  interface LeafyRingHideLayer extends Layer {}
  class LeafyRingHideLayer extends Layer {
    render(guiGraphics: GuiGraphics, deltaTracker: DeltaTracker): void;
  }


  interface PhantomBootBridgeLayer extends Layer {}
  class PhantomBootBridgeLayer extends Layer {
    render(guiGraphics: GuiGraphics, deltaTracker: DeltaTracker): void;
  }

}

declare module 'it.hurts.sskirillss.relics.client.handlers' {
  import { Post, Pre } from 'RenderPlayerEvent';
  import { Post as playertickevent_Post } from 'PlayerTickEvent';
  import { ItemTooltipEvent } from 'net.neoforged.neoforge.event.entity.player';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { RenderArmEvent } from 'net.neoforged.neoforge.client.event';

  class ArmorRenderHandler {
    static handlePostRenderPlayerLow(event: Post): void;
    static handlePreRenderPlayerHigh(event: Pre): void;
    static handlePreRenderPlayerLowest(event: Pre): void;
  }


  class DescriptionHandler {
    static drawProgressBar(style: string): MutableComponent;
    static onItemTooltip(event: ItemTooltipEvent): void;
    static onPlayerTick(event: playertickevent_Post): void;
  }


  class HandRenderHandler {
    static onRenderHand(event: RenderArmEvent): void;
  }

}

declare module 'it.hurts.sskirillss.relics.client.models.effects' {
  import { HumanoidModel } from 'net.minecraft.client.model';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { ModelLayerLocation, ModelPart } from 'net.minecraft.client.model.geom';
  import { LayerDefinition } from 'net.minecraft.client.model.geom.builders';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';

  interface StunStarModel extends HumanoidModel<LivingEntity> {}
  class StunStarModel extends HumanoidModel<LivingEntity> {
    static readonly TEXTURE: ModelLayerLocation;
    constructor(root: ModelPart);
    static createBodyLayer(): LayerDefinition;
    renderToBuffer(poseStack: PoseStack, vertexConsumer: VertexConsumer, packedLight: number, packedOverlay: number, seed: number): void;
  }

}

declare module 'it.hurts.sskirillss.relics.client.models.entities' {
  import { EntityModel } from 'net.minecraft.client.model';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';

  interface DissectionModel<T extends Entity = any> extends EntityModel<T> {}
  class DissectionModel<T extends Entity = any> extends EntityModel<T> {
    constructor();
    renderToBuffer(poseStack: PoseStack, buffer: VertexConsumer, packedLight: number, packedOverlay: number, seed: number): void;
    setupAnim(entity: T, limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface ShadowGlaiveModel<T extends Entity = any> extends EntityModel<T> {}
  class ShadowGlaiveModel<T extends Entity = any> extends EntityModel<T> {
    constructor();
    renderToBuffer(poseStack: PoseStack, buffer: VertexConsumer, packedLight: number, packedOverlay: number, seed: number): void;
    setupAnim(entity: T, limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface SolidSnowballModel<T extends Entity = any> extends EntityModel<T> {}
  class SolidSnowballModel<T extends Entity = any> extends EntityModel<T> {
    constructor();
    renderToBuffer(poseStack: PoseStack, buffer: VertexConsumer, packedLight: number, packedOverlay: number, seed: number): void;
    setupAnim(entity: T, limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface SporeModel<T extends Entity = any> extends EntityModel<T> {}
  class SporeModel<T extends Entity = any> extends EntityModel<T> {
    constructor();
    renderToBuffer(poseStack: PoseStack, buffer: VertexConsumer, packedLight: number, packedOverlay: number, seed: number): void;
    setupAnim(entity: T, limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface StalactiteModel<T extends Entity = any> extends EntityModel<T> {}
  class StalactiteModel<T extends Entity = any> extends EntityModel<T> {
    constructor();
    renderToBuffer(poseStack: PoseStack, buffer: VertexConsumer, packedLight: number, packedOverlay: number, seed: number): void;
    setupAnim(entity: T, limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }

}

declare module 'it.hurts.sskirillss.relics.client.models.items' {
  import { HumanoidModel } from 'net.minecraft.client.model';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { Item } from 'net.minecraft.world.item';
  import { ModelLayerLocation, ModelPart } from 'net.minecraft.client.model.geom';
  import { ModelSide } from 'it.hurts.sskirillss.relics.client.models.items.utils';

  interface CurioModel extends HumanoidModel<LivingEntity> {}
  class CurioModel extends HumanoidModel<LivingEntity> {
    constructor(item: Item);
    static constructRoot(item: Item): ModelPart;
    get item(): Item;
    get root(): ModelPart;
    getById(id: string): ModelPart;
    static getLayerLocation(item: Item): ModelLayerLocation;
  }


  interface FPRCurioModel extends CurioModel {}
  class FPRCurioModel extends CurioModel {
    constructor(item: Item);
  }


  interface SidedCurioModel extends CurioModel {}
  class SidedCurioModel extends CurioModel {
    constructor(item: Item);
    get side(): ModelSide;
    get slot(): number;
    set slot(slot: number);
  }


  interface SidedFPRCurioModel extends SidedCurioModel {}
  class SidedFPRCurioModel extends SidedCurioModel {
    constructor(item: Item);
  }

}

declare module 'it.hurts.sskirillss.relics.client.models.items.utils' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ModelSide extends Enum<ModelSide> {}
  class ModelSide extends Enum<ModelSide> {
    static readonly RIGHT: ModelSide;
    static readonly LEFT: ModelSide;
    get id(): string;
    get opposite(): ModelSide;
    static valueOf(name: string): ModelSide;
    static values(): ModelSide[];
  }

}

declare module 'it.hurts.sskirillss.relics.client.models.layers' {
  import { RenderLayer } from 'net.minecraft.client.renderer.entity.layers';
  import { RenderLayerParent } from 'net.minecraft.client.renderer.entity';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';

  interface WingsLayer<T extends LivingEntity = any, M extends EntityModel<T> = any> extends RenderLayer<T, M> {}
  class WingsLayer<T extends LivingEntity = any, M extends EntityModel<T> = any> extends RenderLayer<T, M> {
    constructor(pRenderer: RenderLayerParent<T, M>);
    render(pPoseStack: PoseStack, pBuffer: MultiBufferSource, pPackedLight: number, pLivingEntity: T, pLimbSwing: number, pLimbSwingAmount: number, pPartialTicks: number, pAgeInTicks: number, pNetHeadYaw: number, pHeadPitch: number): void;
  }

}

declare module 'it.hurts.sskirillss.relics.client.models.parts' {
  import { HumanoidModel } from 'net.minecraft.client.model';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { ModelLayerLocation, ModelPart } from 'net.minecraft.client.model.geom';
  import { LayerDefinition } from 'net.minecraft.client.model.geom.builders';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';

  interface HaloModel extends HumanoidModel<LivingEntity> {}
  class HaloModel extends HumanoidModel<LivingEntity> {
    static readonly LAYER_LOCATION: ModelLayerLocation;
    constructor(root: ModelPart);
    static createBodyLayer(): LayerDefinition;
    renderToBuffer(p_102034_: PoseStack, p_102035_: VertexConsumer, p_102036_: number, p_102037_: number, p_350361_: number): void;
  }


  interface WingsModel extends HumanoidModel<LivingEntity> {}
  class WingsModel extends HumanoidModel<LivingEntity> {
    static readonly LAYER_LOCATION: ModelLayerLocation;
    constructor(root: ModelPart);
    static createBodyLayer(): LayerDefinition;
    renderToBuffer(p_102034_: PoseStack, p_102035_: VertexConsumer, p_102036_: number, p_102037_: number, p_350361_: number): void;
  }

}

declare module 'it.hurts.sskirillss.relics.client.particles' {
  import { TextureSheetParticle, ParticleRenderType } from 'net.minecraft.client.particle';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { Constructor } from 'it.hurts.sskirillss.relics.client.particles.BasicColoredParticle';
  import { VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { Camera } from 'net.minecraft.client';

  interface BasicColoredParticle extends TextureSheetParticle {}
  class BasicColoredParticle extends TextureSheetParticle {
    static readonly RENDERER_NO_DEPTH: ParticleRenderType;
    constructor(world: ClientLevel, x: number, y: number, z: number, velocityX: number, velocityY: number, velocityZ: number, constructor: Constructor);
    get renderType(): ParticleRenderType;
    render(buffer: VertexConsumer, renderInfo: Camera, partialTicks: number): void;
    tick(): void;
  }

}

declare module 'it.hurts.sskirillss.relics.client.particles.BasicColoredParticle' {
  import { ConstructorBuilder } from 'it.hurts.sskirillss.relics.client.particles.BasicColoredParticle.Constructor';
  import { Color } from 'java.awt';
  import { ParticleType, ParticleOptions } from 'net.minecraft.core.particles';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { ParticleProvider, SpriteSet, Particle } from 'net.minecraft.client.particle';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';

  class Constructor {
    static builder(): ConstructorBuilder;
    equals(o: any): boolean;
    get color(): Color;
    get diameter(): number;
    get lifetime(): number;
    get roll(): number;
    get scaleModifier(): number;
    hashCode(): number;
    isPhysical(): boolean;
    isVisibleThroughWalls(): boolean;
    set color(color: Color);
    set diameter(diameter: number);
    set lifetime(lifetime: number);
    set roll(roll: number);
    set scaleModifier(scaleModifier: number);
    setPhysical(physical: boolean): void;
    setVisibleThroughWalls(visibleThroughWalls: boolean): void;
    toString(): string;
  }


  interface Type extends ParticleType<Options> {}
  class Type extends ParticleType<Options> {
    constructor();
    codec(): MapCodec<Options>;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, Options>;
  }


  interface Factory extends ParticleProvider<Options> {}
  class Factory extends ParticleProvider<Options> {
    constructor(sprites: SpriteSet);
    createParticle(options: Options, world: ClientLevel, xPos: number, yPos: number, zPos: number, xVelocity: number, yVelocity: number, zVelocity: number): Particle;
  }


  interface Options extends ParticleOptions {}
  class Options extends ParticleOptions {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(data: Constructor);
    get data(): Constructor;
    get type(): ParticleType<Options>;
  }

}

declare module 'it.hurts.sskirillss.relics.client.particles.BasicColoredParticle.Constructor' {
  import { Constructor } from 'it.hurts.sskirillss.relics.client.particles.BasicColoredParticle';

  class ConstructorBuilder {
    build(): Constructor;
    color(color: number): ConstructorBuilder;
    color(r: number, g: number, b: number, a: number): ConstructorBuilder;
    color(r: number, g: number, b: number): ConstructorBuilder;
    color(r: number, g: number, b: number, a: number): ConstructorBuilder;
    color(r: number, g: number, b: number): ConstructorBuilder;
    diameter(diameter: number): ConstructorBuilder;
    lifetime(lifetime: number): ConstructorBuilder;
    physical(physical: boolean): ConstructorBuilder;
    roll(roll: number): ConstructorBuilder;
    scaleModifier(scaleModifier: number): ConstructorBuilder;
    toString(): string;
    visibleThroughWalls(visibleThroughWalls: boolean): ConstructorBuilder;
  }

}

declare module 'it.hurts.sskirillss.relics.client.renderer.entities' {
  import { EntityRenderer } from 'net.minecraft.client.renderer.entity';
  import { BlockSimulationEntity, DissectionEntity, RelicExperienceOrbEntity, ShadowGlaiveEntity, SolidSnowballEntity, SporeEntity, StalactiteEntity } from 'it.hurts.sskirillss.relics.entities';
  import { Context } from 'EntityRendererProvider';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Frustum } from 'net.minecraft.client.renderer.culling';

  interface BlockSimulationRenderer extends EntityRenderer<BlockSimulationEntity> {}
  class BlockSimulationRenderer extends EntityRenderer<BlockSimulationEntity> {
    constructor(pContext: Context);
    getTextureLocation(pEntity: BlockSimulationEntity): ResourceLocation;
    render(pEntity: BlockSimulationEntity, pEntityYaw: number, pPartialTicks: number, pMatrixStack: PoseStack, pBuffer: MultiBufferSource, pPackedLight: number): void;
  }


  interface DissectionRenderer extends EntityRenderer<DissectionEntity> {}
  class DissectionRenderer extends EntityRenderer<DissectionEntity> {
    constructor(renderManager: Context);
    getTextureLocation(entity: DissectionEntity): ResourceLocation;
    render(entityIn: DissectionEntity, entityYaw: number, partialTicks: number, matrixStackIn: PoseStack, bufferIn: MultiBufferSource, packedLightIn: number): void;
  }


  interface NullRenderer<T extends Entity = any> extends EntityRenderer<T> {}
  class NullRenderer<T extends Entity = any> extends EntityRenderer<T> {
    constructor(manager: Context);
    getTextureLocation(entity: T): ResourceLocation;
    shouldRender(entity: T, clipping: Frustum, x: number, y: number, z: number): boolean;
  }


  interface RelicExperienceOrbRenderer extends EntityRenderer<RelicExperienceOrbEntity> {}
  class RelicExperienceOrbRenderer extends EntityRenderer<RelicExperienceOrbEntity> {
    constructor(context: Context);
    getTextureLocation(entity: RelicExperienceOrbEntity): ResourceLocation;
    render(entity: RelicExperienceOrbEntity, yaw: number, pitch: number, poseStack: PoseStack, buffer: MultiBufferSource, light: number): void;
  }


  interface ShadowGlaiveRenderer extends EntityRenderer<ShadowGlaiveEntity> {}
  class ShadowGlaiveRenderer extends EntityRenderer<ShadowGlaiveEntity> {
    constructor(renderManager: Context);
    getTextureLocation(entity: ShadowGlaiveEntity): ResourceLocation;
    render(entity: ShadowGlaiveEntity, entityYaw: number, partialTicks: number, matrixStackIn: PoseStack, bufferIn: MultiBufferSource, packedLightIn: number): void;
  }


  interface SolidSnowballRenderer extends EntityRenderer<SolidSnowballEntity> {}
  class SolidSnowballRenderer extends EntityRenderer<SolidSnowballEntity> {
    constructor(renderManager: Context);
    getTextureLocation(entity: SolidSnowballEntity): ResourceLocation;
    render(entityIn: SolidSnowballEntity, entityYaw: number, partialTicks: number, matrixStackIn: PoseStack, bufferIn: MultiBufferSource, packedLightIn: number): void;
  }


  interface SporeRenderer extends EntityRenderer<SporeEntity> {}
  class SporeRenderer extends EntityRenderer<SporeEntity> {
    constructor(renderManager: Context);
    getTextureLocation(entity: SporeEntity): ResourceLocation;
    render(entityIn: SporeEntity, entityYaw: number, partialTicks: number, poseStack: PoseStack, bufferIn: MultiBufferSource, packedLightIn: number): void;
  }


  interface StalactiteRenderer extends EntityRenderer<StalactiteEntity> {}
  class StalactiteRenderer extends EntityRenderer<StalactiteEntity> {
    constructor(renderManager: Context);
    getTextureLocation(entity: StalactiteEntity): ResourceLocation;
    render(entityIn: StalactiteEntity, entityYaw: number, partialTicks: number, matrixStackIn: PoseStack, bufferIn: MultiBufferSource, packedLightIn: number): void;
  }

}

declare module 'it.hurts.sskirillss.relics.client.renderer.items.items' {
  import { ICurioRenderer } from 'top.theillusivec4.curios.api.client';
  import { ItemStack } from 'net.minecraft.world.item';
  import { SlotContext } from 'top.theillusivec4.curios.api';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { RenderLayerParent } from 'net.minecraft.client.renderer.entity';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { EntityModel } from 'net.minecraft.client.model';

  interface CurioRenderer extends ICurioRenderer {}
  class CurioRenderer extends ICurioRenderer {
    render<T extends LivingEntity, M extends EntityModel<T>>(stack: ItemStack, slotContext: SlotContext, matrixStack: PoseStack, renderLayerParent: RenderLayerParent<T, M>, renderTypeBuffer: MultiBufferSource, light: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }

}

declare module 'it.hurts.sskirillss.relics.client.renderer.tiles' {
  import { BlockEntityRenderer } from 'net.minecraft.client.renderer.blockentity';
  import { ResearchingTableTile } from 'it.hurts.sskirillss.relics.tiles';
  import { Context } from 'BlockEntityRendererProvider';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';

  interface ResearchingTableRenderer extends BlockEntityRenderer<ResearchingTableTile> {}
  class ResearchingTableRenderer extends BlockEntityRenderer<ResearchingTableTile> {
    constructor(context: Context);
    render(tileEntity: ResearchingTableTile, partialTicks: number, matrixStack: PoseStack, buffer: MultiBufferSource, combinedLight: number, combinedOverlay: number): void;
  }

}

declare module 'it.hurts.sskirillss.relics.client.screen.base' {
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ItemStack } from 'net.minecraft.world.item';
  import { DescriptionTab } from 'it.hurts.sskirillss.relics.client.screen.description.general.misc';
  import { IRelicItem } from 'it.hurts.sskirillss.relics.items.relics.base';

  class IAutoScaledScreen {
    get autoScale(): number;
  }


  class IHoverableWidget {
    onHovered(var1: GuiGraphics, var2: number, var3: number): void;
  }


  class IRelicScreenProvider {
    get container(): number;
    get slot(): number;
    get stack(): ItemStack;
  }


  class ITabbedDescriptionScreen {
    get tab(): DescriptionTab;
    updateCache(relic: IRelicItem): void;
  }


  class ITickingWidget {
    onTick(): void;
  }

}

declare module 'it.hurts.sskirillss.relics.client.screen.description.ability' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { IAutoScaledScreen, IRelicScreenProvider, ITabbedDescriptionScreen } from 'it.hurts.sskirillss.relics.client.screen.base';
  import { ItemStack } from 'net.minecraft.world.item';
  import { UpgradeAbilityActionWidget, RerollAbilityActionWidget, ResetAbilityActionWidget } from 'it.hurts.sskirillss.relics.client.screen.description.ability.widgets';
  import { Player } from 'net.minecraft.world.entity.player';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { DescriptionTab } from 'it.hurts.sskirillss.relics.client.screen.description.general.misc';

  interface AbilityDescriptionScreen extends IAutoScaledScreen, IRelicScreenProvider, ITabbedDescriptionScreen, Screen {}
  class AbilityDescriptionScreen extends IAutoScaledScreen {
    readonly screen: Screen;
    readonly container: number;
    readonly slot: number;
    stack: ItemStack;
    upgradeButton: UpgradeAbilityActionWidget;
    rerollButton: RerollAbilityActionWidget;
    resetButton: ResetAbilityActionWidget;
    constructor(player: Player, container: number, slot: number, screen: Screen);
    get autoScale(): number;
    get container(): number;
    get page(): number;
    get selectedAbility(): string;
    get slot(): number;
    get stack(): ItemStack;
    get tab(): DescriptionTab;
    isPauseScreen(): boolean;
    keyPressed(pKeyCode: number, pScanCode: number, pModifiers: number): boolean;
    onClose(): void;
    rebuildWidgets(): void;
    render(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
    renderBackground(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
    set page(page: number);
    set selectedAbility(ability: string);
    tick(): void;
  }

}

declare module 'it.hurts.sskirillss.relics.client.screen.description.ability.widgets' {
  import { AbstractDescriptionWidget } from 'it.hurts.sskirillss.relics.client.screen.description.general.widgets.base';
  import { IHoverableWidget, ITickingWidget } from 'it.hurts.sskirillss.relics.client.screen.base';
  import { AbilityDescriptionScreen } from 'it.hurts.sskirillss.relics.client.screen.description.ability';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { SoundManager } from 'net.minecraft.client.sounds';
  import { ExperienceDescriptionScreen } from 'it.hurts.sskirillss.relics.client.screen.description.experience';
  import { AbstractAbilityActionWidget } from 'it.hurts.sskirillss.relics.client.screen.description.ability.widgets.base';

  interface AbilityCardWidget extends IHoverableWidget, ITickingWidget, AbstractDescriptionWidget {}
  class AbilityCardWidget extends IHoverableWidget {
    constructor(x: number, y: number, screen: AbilityDescriptionScreen, ability: string);
    isLocked(): boolean;
    onHovered(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    onPress(): void;
    onTick(): void;
    playDownSound(handler: SoundManager): void;
    renderWidget(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
  }


  interface AbilityPageWidget extends AbstractDescriptionWidget {}
  class AbilityPageWidget extends AbstractDescriptionWidget {
    constructor(x: number, y: number, screen: AbilityDescriptionScreen, step: number);
    get screen(): AbilityDescriptionScreen;
    get step(): number;
    onPress(): void;
    renderWidget(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
  }


  interface BigAbilityCardWidget extends IHoverableWidget, ITickingWidget, AbstractDescriptionWidget {}
  class BigAbilityCardWidget extends IHoverableWidget {
    constructor(x: number, y: number, screen: AbilityDescriptionScreen);
    onHovered(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    onTick(): void;
    playDownSound(handler: SoundManager): void;
    renderWidget(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
  }


  interface ExperienceSourcePageWidget extends AbstractDescriptionWidget {}
  class ExperienceSourcePageWidget extends AbstractDescriptionWidget {
    constructor(x: number, y: number, screen: ExperienceDescriptionScreen, step: number);
    get screen(): ExperienceDescriptionScreen;
    get step(): number;
    onPress(): void;
    renderWidget(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
  }


  interface RerollAbilityActionWidget extends AbstractAbilityActionWidget {}
  class RerollAbilityActionWidget extends AbstractAbilityActionWidget {
    constructor(x: number, y: number, screen: AbilityDescriptionScreen);
    isLocked(): boolean;
    onHovered(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    onPress(): void;
    playDownSound(handler: SoundManager): void;
    renderWidget(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
  }


  interface ResetAbilityActionWidget extends AbstractAbilityActionWidget {}
  class ResetAbilityActionWidget extends AbstractAbilityActionWidget {
    constructor(x: number, y: number, screen: AbilityDescriptionScreen);
    isLocked(): boolean;
    onHovered(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    playDownSound(handler: SoundManager): void;
  }


  interface UpgradeAbilityActionWidget extends AbstractAbilityActionWidget {}
  class UpgradeAbilityActionWidget extends AbstractAbilityActionWidget {
    constructor(x: number, y: number, screen: AbilityDescriptionScreen);
    isLocked(): boolean;
    onHovered(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    playDownSound(handler: SoundManager): void;
    renderWidget(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
  }

}

declare module 'it.hurts.sskirillss.relics.client.screen.description.ability.widgets.base' {
  import { AbstractDescriptionWidget } from 'it.hurts.sskirillss.relics.client.screen.description.general.widgets.base';
  import { IHoverableWidget, ITickingWidget } from 'it.hurts.sskirillss.relics.client.screen.base';
  import { Operation } from 'it.hurts.sskirillss.relics.network.packets.leveling.PacketRelicTweak';
  import { AbilityDescriptionScreen } from 'it.hurts.sskirillss.relics.client.screen.description.ability';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface AbstractAbilityActionWidget extends IHoverableWidget, ITickingWidget, AbstractDescriptionWidget {}
  class AbstractAbilityActionWidget extends IHoverableWidget {
    constructor(x: number, y: number, operation: Operation, screen: AbilityDescriptionScreen);
    get ability(): string;
    get operation(): Operation;
    get screen(): AbilityDescriptionScreen;
    isLocked(): boolean;
    onPress(): void;
    onTick(): void;
    renderWidget(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
  }

}

declare module 'it.hurts.sskirillss.relics.client.screen.description.experience' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { IAutoScaledScreen, IRelicScreenProvider, ITabbedDescriptionScreen } from 'it.hurts.sskirillss.relics.client.screen.base';
  import { ItemStack } from 'net.minecraft.world.item';
  import { UpgradeExperienceActionWidget, ResetExperienceActionWidget } from 'it.hurts.sskirillss.relics.client.screen.description.experience.widgets';
  import { Player } from 'net.minecraft.world.entity.player';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { DescriptionTab } from 'it.hurts.sskirillss.relics.client.screen.description.general.misc';

  interface ExperienceDescriptionScreen extends IAutoScaledScreen, IRelicScreenProvider, ITabbedDescriptionScreen, Screen {}
  class ExperienceDescriptionScreen extends IAutoScaledScreen {
    readonly screen: Screen;
    readonly container: number;
    readonly slot: number;
    stack: ItemStack;
    upgradeButton: UpgradeExperienceActionWidget;
    resetButton: ResetExperienceActionWidget;
    constructor(player: Player, container: number, slot: number, screen: Screen);
    get autoScale(): number;
    get container(): number;
    get page(): number;
    get selectedSource(): string;
    get slot(): number;
    get stack(): ItemStack;
    get tab(): DescriptionTab;
    isPauseScreen(): boolean;
    keyPressed(pKeyCode: number, pScanCode: number, pModifiers: number): boolean;
    onClose(): void;
    rebuildWidgets(): void;
    render(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
    renderBackground(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
    set page(page: number);
    set selectedSource(source: string);
    tick(): void;
  }

}

declare module 'it.hurts.sskirillss.relics.client.screen.description.experience.widgets.base' {
  import { AbstractDescriptionWidget } from 'it.hurts.sskirillss.relics.client.screen.description.general.widgets.base';
  import { IHoverableWidget, ITickingWidget } from 'it.hurts.sskirillss.relics.client.screen.base';
  import { Operation } from 'it.hurts.sskirillss.relics.network.packets.leveling.PacketRelicTweak';
  import { ExperienceDescriptionScreen } from 'it.hurts.sskirillss.relics.client.screen.description.experience';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface AbstractExperienceActionWidget extends IHoverableWidget, ITickingWidget, AbstractDescriptionWidget {}
  class AbstractExperienceActionWidget extends IHoverableWidget {
    constructor(x: number, y: number, operation: Operation, screen: ExperienceDescriptionScreen);
    get operation(): Operation;
    get screen(): ExperienceDescriptionScreen;
    get source(): string;
    isLocked(): boolean;
    onTick(): void;
    renderWidget(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
  }

}

declare module 'it.hurts.sskirillss.relics.client.screen.description.experience.widgets' {
  import { AbstractDescriptionWidget } from 'it.hurts.sskirillss.relics.client.screen.description.general.widgets.base';
  import { ITickingWidget, IHoverableWidget } from 'it.hurts.sskirillss.relics.client.screen.base';
  import { ExperienceDescriptionScreen } from 'it.hurts.sskirillss.relics.client.screen.description.experience';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { SoundManager } from 'net.minecraft.client.sounds';
  import { AbstractExperienceActionWidget } from 'it.hurts.sskirillss.relics.client.screen.description.experience.widgets.base';

  interface BigExperienceCardWidget extends ITickingWidget, AbstractDescriptionWidget {}
  class BigExperienceCardWidget extends ITickingWidget {
    constructor(x: number, y: number, screen: ExperienceDescriptionScreen);
    onTick(): void;
    playDownSound(handler: SoundManager): void;
    renderWidget(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
  }


  interface ExperienceGemWidget extends ITickingWidget, IHoverableWidget, AbstractDescriptionWidget {}
  class ExperienceGemWidget extends ITickingWidget {
    constructor(x: number, y: number, screen: ExperienceDescriptionScreen, source: string);
    isLocked(): boolean;
    onHovered(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    onPress(): void;
    onTick(): void;
    playDownSound(handler: SoundManager): void;
    renderWidget(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
  }


  interface ResetExperienceActionWidget extends AbstractExperienceActionWidget {}
  class ResetExperienceActionWidget extends AbstractExperienceActionWidget {
    constructor(x: number, y: number, screen: ExperienceDescriptionScreen);
    isLocked(): boolean;
    onHovered(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    playDownSound(handler: SoundManager): void;
  }


  interface UpgradeExperienceActionWidget extends AbstractExperienceActionWidget {}
  class UpgradeExperienceActionWidget extends AbstractExperienceActionWidget {
    constructor(x: number, y: number, screen: ExperienceDescriptionScreen);
    isLocked(): boolean;
    onHovered(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    playDownSound(handler: SoundManager): void;
  }

}

declare module 'it.hurts.sskirillss.relics.client.screen.description.general.misc' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface DescriptionTab extends Enum<DescriptionTab> {}
  class DescriptionTab extends Enum<DescriptionTab> {
    static readonly RELIC: DescriptionTab;
    static readonly ABILITY: DescriptionTab;
    static readonly EXPERIENCE: DescriptionTab;
    static valueOf(name: string): DescriptionTab;
    static values(): DescriptionTab[];
  }

}

declare module 'it.hurts.sskirillss.relics.client.screen.description.general.particles.base' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Color } from 'java.awt';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class ParticleData {
    constructor(texture: ResourceLocation, color: Color, xStart: number, yStart: number, scale: number, lifeTime: number);
    equals(o: any): boolean;
    get color(): Color;
    get deltaX(): number;
    get deltaY(): number;
    get lifeTime(): number;
    get maxLifeTime(): number;
    get roll(): number;
    get scale(): number;
    get texture(): ResourceLocation;
    get x(): number;
    get xO(): number;
    get xStart(): number;
    get y(): number;
    get yO(): number;
    get yStart(): number;
    get z(): number;
    hashCode(): number;
    render(var1: Screen, var2: GuiGraphics, var3: number, var4: number, var5: number): void;
    set deltaX(deltaX: number);
    set deltaY(deltaY: number);
    set lifeTime(lifeTime: number);
    set roll(roll: number);
    set scale(scale: number);
    set x(x: number);
    set xO(xO: number);
    set y(y: number);
    set yO(yO: number);
    set z(z: number);
    tick(screen: Screen): void;
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.client.screen.description.general.widgets' {
  import { AbstractBadgeWidget, AbstractDescriptionWidget, AbstractPlateWidget } from 'it.hurts.sskirillss.relics.client.screen.description.general.widgets.base';
  import { IRelicScreenProvider, IHoverableWidget, ITickingWidget } from 'it.hurts.sskirillss.relics.client.screen.base';
  import { AbilityBadge, RelicBadge } from 'it.hurts.sskirillss.relics.badges.base';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { SoundManager } from 'net.minecraft.client.sounds';
  import { ItemStack } from 'net.minecraft.world.item';
  import { DescriptionTab } from 'it.hurts.sskirillss.relics.client.screen.description.general.misc';

  interface AbilityBadgeWidget extends AbstractBadgeWidget {}
  class AbilityBadgeWidget extends AbstractBadgeWidget {
    constructor(x: number, y: number, provider: IRelicScreenProvider, badge: AbilityBadge, ability: string);
    get badge(): AbilityBadge;
    onHovered(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
  }


  interface LogoWidget extends IHoverableWidget, ITickingWidget, AbstractDescriptionWidget {}
  class LogoWidget extends IHoverableWidget {
    constructor(x: number, y: number, provider: IRelicScreenProvider);
    get provider(): IRelicScreenProvider;
    onHovered(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    onTick(): void;
    playDownSound(handler: SoundManager): void;
    renderWidget(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
  }


  interface LuckPlateWidget extends AbstractPlateWidget {}
  class LuckPlateWidget extends AbstractPlateWidget {
    constructor(x: number, y: number, provider: IRelicScreenProvider);
    getValue(stack: ItemStack): string;
    onHovered(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    onTick(): void;
  }


  interface PlayerExperiencePlateWidget extends AbstractPlateWidget {}
  class PlayerExperiencePlateWidget extends AbstractPlateWidget {
    constructor(x: number, y: number, provider: IRelicScreenProvider);
    getValue(stack: ItemStack): string;
    onHovered(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    onTick(): void;
    renderContent(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
  }


  interface PointsFixWidget extends IHoverableWidget, AbstractDescriptionWidget {}
  class PointsFixWidget extends IHoverableWidget {
    constructor(x: number, y: number, provider: IRelicScreenProvider);
    get provider(): IRelicScreenProvider;
    onHovered(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    onPress(): void;
    renderWidget(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
  }


  interface PointsPlateWidget extends AbstractPlateWidget {}
  class PointsPlateWidget extends AbstractPlateWidget {
    constructor(x: number, y: number, provider: IRelicScreenProvider);
    getValue(stack: ItemStack): string;
    onHovered(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    onTick(): void;
  }


  interface RelicBadgeWidget extends AbstractBadgeWidget {}
  class RelicBadgeWidget extends AbstractBadgeWidget {
    constructor(x: number, y: number, provider: IRelicScreenProvider, badge: RelicBadge);
    get badge(): RelicBadge;
    onHovered(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
  }


  interface TabWidget extends IHoverableWidget, AbstractDescriptionWidget {}
  class TabWidget extends IHoverableWidget {
    constructor(x: number, y: number, source: IRelicScreenProvider, tab: DescriptionTab, target: IRelicScreenProvider);
    get source(): IRelicScreenProvider;
    get tab(): DescriptionTab;
    get target(): IRelicScreenProvider;
    isLocked(): boolean;
    onHovered(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    onPress(): void;
    playDownSound(handler: SoundManager): void;
    renderWidget(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
  }

}

declare module 'it.hurts.sskirillss.relics.client.screen.description.general.widgets.base' {
  import { IHoverableWidget, IRelicScreenProvider, ITickingWidget } from 'it.hurts.sskirillss.relics.client.screen.base';
  import { AbstractBadge } from 'it.hurts.sskirillss.relics.badges.base';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { SoundManager } from 'net.minecraft.client.sounds';
  import { AbstractButton } from 'net.minecraft.client.gui.components';
  import { Minecraft } from 'net.minecraft.client';
  import { ItemStack } from 'net.minecraft.world.item';

  interface AbstractBadgeWidget extends IHoverableWidget, AbstractDescriptionWidget {}
  class AbstractBadgeWidget extends IHoverableWidget {
    constructor(x: number, y: number, provider: IRelicScreenProvider, badge: AbstractBadge);
    get badge(): AbstractBadge;
    get provider(): IRelicScreenProvider;
    playDownSound(handler: SoundManager): void;
    renderWidget(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
  }


  interface AbstractDescriptionWidget extends AbstractButton {}
  class AbstractDescriptionWidget extends AbstractButton {
    readonly minecraft: Minecraft;
    constructor(x: number, y: number, width: number, height: number);
    isLocked(): boolean;
    onPress(): void;
    playDownSound(handler: SoundManager): void;
  }


  interface AbstractPlateWidget extends IHoverableWidget, ITickingWidget, AbstractDescriptionWidget {}
  class AbstractPlateWidget extends IHoverableWidget {
    constructor(x: number, y: number, provider: IRelicScreenProvider, icon: string);
    get icon(): string;
    get provider(): IRelicScreenProvider;
    getValue(var1: ItemStack): string;
    playDownSound(handler: SoundManager): void;
    renderContent(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    renderWidget(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
  }

}

declare module 'it.hurts.sskirillss.relics.client.screen.description.misc' {
  import { CacheEntry } from 'it.hurts.sskirillss.relics.client.screen.description.misc.DescriptionCache';
  import { IRelicItem } from 'it.hurts.sskirillss.relics.items.relics.base';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Screen } from 'net.minecraft.client.gui.screens';

  class DescriptionCache {
    static getEntry(relic: IRelicItem): CacheEntry;
    static getSelectedAbility(stack: ItemStack): string;
    static getSelectedExperienceSource(stack: ItemStack): string;
    static setEntry(relic: IRelicItem, cache: CacheEntry): void;
    static setSelectedAbility(stack: ItemStack, ability: string): void;
    static setSelectedExperienceSource(stack: ItemStack, source: string): void;
  }


  class DescriptionTextures {
    static readonly PLATE_BACKGROUND: ResourceLocation;
    static readonly PLATE_OUTLINE: ResourceLocation;
    static readonly SPACE_BACKGROUND: ResourceLocation;
    static readonly TOP_BACKGROUND: ResourceLocation;
    static readonly BOTTOM_BACKGROUND: ResourceLocation;
    static readonly ACTION_BUTTON_OUTLINE: ResourceLocation;
    static readonly STAT_DELIMITER: ResourceLocation;
    static readonly TAB: ResourceLocation;
    static readonly TAB_OUTLINE: ResourceLocation;
    static readonly BIG_STAR_HOLE: ResourceLocation;
    static readonly BIG_STAR_ACTIVE: ResourceLocation;
    static readonly BIG_STAR_INACTIVE: ResourceLocation;
    static readonly SMALL_CARD_LOCK_BACKGROUND: ResourceLocation;
    static readonly SMALL_CARD_RESEARCH_BACKGROUND: ResourceLocation;
    static readonly SMALL_CARD_FRAME_UNLOCKED_ACTIVE: ResourceLocation;
    static readonly SMALL_CARD_FRAME_UNLOCKED_INACTIVE: ResourceLocation;
    static readonly SMALL_CARD_FRAME_LOCKED_ACTIVE: ResourceLocation;
    static readonly SMALL_CARD_FRAME_LOCKED_INACTIVE: ResourceLocation;
    static readonly SMALL_CARD_FRAME_OUTLINE: ResourceLocation;
    static readonly RESEARCH_BACKGROUND: ResourceLocation;
    static readonly RESEARCH_FOG: ResourceLocation;
    static readonly BIG_CARD_BACKGROUND: ResourceLocation;
    static readonly BIG_CARD_FRAME_UNLOCKED_ACTIVE: ResourceLocation;
    static readonly BIG_CARD_FRAME_UNLOCKED_INACTIVE: ResourceLocation;
    static readonly BIG_CARD_FRAME_LOCKED_ACTIVE: ResourceLocation;
    static readonly BIG_CARD_FRAME_LOCKED_INACTIVE: ResourceLocation;
    static readonly BIG_CARD_FRAME_OUTLINE: ResourceLocation;
    static readonly CHAINS_INACTIVE: ResourceLocation;
    static readonly SMALL_STAR_HOLE: ResourceLocation;
    static readonly SMALL_STAR_ACTIVE: ResourceLocation;
    static readonly SMALL_STAR_INACTIVE: ResourceLocation;
    static readonly PAGE_ARROW_UP: ResourceLocation;
    static readonly PAGE_ARROW_DOWN: ResourceLocation;
    static readonly PAGE_COUNTER: ResourceLocation;
    static readonly LOCK_INACTIVE: ResourceLocation;
    static readonly UPGRADE: ResourceLocation;
    static readonly RESEARCH: ResourceLocation;
    static readonly RELIC_EXPERIENCE_BACKGROUND: ResourceLocation;
    static readonly RELIC_EXPERIENCE_FILLER: ResourceLocation;
    static readonly RELIC_EXPERIENCE_OUTLINE: ResourceLocation;
    static readonly PLATE_PLAYER_EXPERIENCE_BACKGROUND: ResourceLocation;
    static readonly PLATE_PLAYER_EXPERIENCE_FILLER: ResourceLocation;
    static readonly LOGO: ResourceLocation;
    static readonly HINT_BACKGROUND: ResourceLocation;
    static readonly HINT_OUTLINE: ResourceLocation;
    static readonly TIP_BACKGROUND: ResourceLocation;
    static readonly TIP_OUTLINE: ResourceLocation;
    static readonly BULB: ResourceLocation;
    static readonly BULB_BROKEN: ResourceLocation;
    static readonly BULB_GLOWING: ResourceLocation;
    static readonly BULB_BURNING: ResourceLocation;
    static getAbilityCardTexture(stack: ItemStack, ability: string): ResourceLocation;
  }


  class DescriptionUtils {
    static readonly TEXT_COLOR: number;
    static drawTooltipBackground(guiGraphics: GuiGraphics, width: number, height: number, x: number, y: number): void;
    static gatherRelicStack(player: Player, slot: number): ItemStack;
    static openCachedScreen(relic: IRelicItem, player: Player, slot: number, screen: Screen): void;
  }

}

declare module 'it.hurts.sskirillss.relics.client.screen.description.misc.DescriptionCache' {
  import { DescriptionTab } from 'it.hurts.sskirillss.relics.client.screen.description.general.misc';
  import { Map } from 'java.util';
  import { Integer } from 'java.lang';
  import { CacheEntryBuilder } from 'it.hurts.sskirillss.relics.client.screen.description.misc.DescriptionCache.CacheEntry';

  class CacheEntry {
    constructor();

    constructor(selectedPage: DescriptionTab, selectionIndices: Map<DescriptionTab, number>);
    static builder(): CacheEntryBuilder;
    get selectedPage(): DescriptionTab;
    getSelectionIndex(page: DescriptionTab): number;
    toBuilder(): CacheEntryBuilder;
  }

}

declare module 'it.hurts.sskirillss.relics.client.screen.description.misc.DescriptionCache.CacheEntry' {
  import { DescriptionTab } from 'it.hurts.sskirillss.relics.client.screen.description.general.misc';
  import { Map } from 'java.util';
  import { Integer } from 'java.lang';
  import { CacheEntry } from 'it.hurts.sskirillss.relics.client.screen.description.misc.DescriptionCache';

  class CacheEntryBuilder {
    build(): CacheEntry;
    selectedPage(selectedPage: DescriptionTab): CacheEntryBuilder;
    selectionIndex(page: DescriptionTab, index: number): CacheEntryBuilder;
    selectionIndices(selectionIndices: Map<DescriptionTab, number>): CacheEntryBuilder;
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.client.screen.description.relic.particles' {
  import { ParticleData } from 'it.hurts.sskirillss.relics.client.screen.description.general.particles.base';
  import { Color } from 'java.awt';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface ChainParticleData extends ParticleData {}
  class ChainParticleData extends ParticleData {
    constructor(color: Color, xStart: number, yStart: number, scale: number, lifeTime: number);
    render(screen: Screen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    tick(screen: Screen): void;
  }


  interface ExperienceParticleData extends ParticleData {}
  class ExperienceParticleData extends ParticleData {
    constructor(color: Color, xStart: number, yStart: number, scale: number, lifeTime: number);
    render(screen: Screen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    tick(screen: Screen): void;
  }


  interface SparkParticleData extends ParticleData {}
  class SparkParticleData extends ParticleData {
    constructor(color: Color, xStart: number, yStart: number, scale: number, lifeTime: number);
    render(screen: Screen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    tick(screen: Screen): void;
  }

}

declare module 'it.hurts.sskirillss.relics.client.screen.description.relic' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { IAutoScaledScreen, IRelicScreenProvider, ITabbedDescriptionScreen } from 'it.hurts.sskirillss.relics.client.screen.base';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { DescriptionTab } from 'it.hurts.sskirillss.relics.client.screen.description.general.misc';

  interface RelicDescriptionScreen extends IAutoScaledScreen, IRelicScreenProvider, ITabbedDescriptionScreen, Screen {}
  class RelicDescriptionScreen extends IAutoScaledScreen {
    readonly screen: Screen;
    readonly container: number;
    readonly slot: number;
    stack: ItemStack;
    constructor(player: Player, container: number, slot: number, screen: Screen);
    get autoScale(): number;
    get container(): number;
    get slot(): number;
    get stack(): ItemStack;
    get tab(): DescriptionTab;
    isPauseScreen(): boolean;
    keyPressed(pKeyCode: number, pScanCode: number, pModifiers: number): boolean;
    onClose(): void;
    rebuildWidgets(): void;
    render(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
    renderBackground(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
    tick(): void;
  }

}

declare module 'it.hurts.sskirillss.relics.client.screen.description.relic.widgets' {
  import { AbstractDescriptionWidget } from 'it.hurts.sskirillss.relics.client.screen.description.general.widgets.base';
  import { IHoverableWidget, ITickingWidget, IRelicScreenProvider } from 'it.hurts.sskirillss.relics.client.screen.base';
  import { RelicDescriptionScreen } from 'it.hurts.sskirillss.relics.client.screen.description.relic';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { SoundManager } from 'net.minecraft.client.sounds';

  interface BigRelicCardWidget extends IHoverableWidget, AbstractDescriptionWidget {}
  class BigRelicCardWidget extends IHoverableWidget {
    constructor(x: number, y: number, screen: RelicDescriptionScreen);
    onHovered(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    playDownSound(handler: SoundManager): void;
    renderWidget(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
  }


  interface RelicExperienceWidget extends IHoverableWidget, ITickingWidget, AbstractDescriptionWidget {}
  class RelicExperienceWidget extends IHoverableWidget {
    constructor(x: number, y: number, screen: IRelicScreenProvider);
    onHovered(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    onTick(): void;
    playDownSound(handler: SoundManager): void;
    renderWidget(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
  }

}

declare module 'it.hurts.sskirillss.relics.client.screen.description.research' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { IAutoScaledScreen, IRelicScreenProvider } from 'it.hurts.sskirillss.relics.client.screen.base';
  import { ItemStack } from 'net.minecraft.world.item';
  import { StarData } from 'it.hurts.sskirillss.relics.items.relics.base.data.research';
  import { Player } from 'net.minecraft.world.entity.player';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Vec2 } from 'net.minecraft.world.phys';

  interface AbilityResearchScreen extends IAutoScaledScreen, IRelicScreenProvider, Screen {}
  class AbilityResearchScreen extends IAutoScaledScreen {
    readonly screen: Screen;
    readonly container: number;
    readonly slot: number;
    stack: ItemStack;
    readonly ability: string;
    backgroundHeight: number;
    backgroundWidth: number;
    x: number;
    y: number;
    selectedStar: StarData;
    constructor(player: Player, container: number, slot: number, screen: Screen, ability: string);
    addLink(start: number, end: number): void;
    get autoScale(): number;
    get container(): number;
    get slot(): number;
    get stack(): ItemStack;
    getAngle(from: Vec2, to: Vec2): number;
    getOccupiedConnectionsCount(star: StarData): number;
    getScaledPos(pos: Vec2): Vec2;
    getTotalConnectionsCount(star: StarData): number;
    isPauseScreen(): boolean;
    keyPressed(pKeyCode: number, pScanCode: number, pModifiers: number): boolean;
    mouseClicked(pMouseX: number, pMouseY: number, pButton: number): boolean;
    mouseReleased(pMouseX: number, pMouseY: number, pButton: number): boolean;
    onClose(): void;
    rebuildWidgets(): void;
    removeLink(start: number, end: number): void;
    render(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
    renderBackground(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
    tick(): void;
  }

}

declare module 'it.hurts.sskirillss.relics.client.screen.description.research.misc' {
  import { BurnPointBuilder } from 'it.hurts.sskirillss.relics.client.screen.description.research.misc.BurnPoint';
  import { Pair } from 'org.apache.commons.lang3.tuple';
  import { Integer } from 'java.lang';
  import { Consumer } from 'java.util.function';

  class BurnPoint {
    static builder(x: number, y: number, scale: number): BurnPointBuilder;
    equals(o: any): boolean;
    get lifeTime(): number;
    get link(): Pair<number, number>;
    get maxLifeTime(): number;
    get maxScale(): number;
    get scale(): number;
    get scaleO(): number;
    get ticker(): Consumer<BurnPoint>;
    get x(): number;
    get y(): number;
    hashCode(): number;
    set(other: BurnPoint): BurnPoint;
    set lifeTime(lifeTime: number);
    set link(link: Pair<number, number>);
    set maxLifeTime(maxLifeTime: number);
    set maxScale(maxScale: number);
    set scale(scale: number);
    set scaleO(scaleO: number);
    set ticker(ticker: Consumer<BurnPoint>);
    set x(x: number);
    set y(y: number);
    tick(): void;
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.client.screen.description.research.misc.BurnPoint' {
  import { Pair } from 'org.apache.commons.lang3.tuple';
  import { Integer } from 'java.lang';
  import { Consumer } from 'java.util.function';
  import { BurnPoint } from 'it.hurts.sskirillss.relics.client.screen.description.research.misc';

  class BurnPointBuilder {
    build(): BurnPoint;
    lifeTime(lifeTime: number): BurnPointBuilder;
    link(link: Pair<number, number>): BurnPointBuilder;
    maxLifeTime(maxLifeTime: number): BurnPointBuilder;
    maxScale(maxScale: number): BurnPointBuilder;
    scale(scale: number): BurnPointBuilder;
    scaleO(scaleO: number): BurnPointBuilder;
    ticker(ticker: Consumer<BurnPoint>): BurnPointBuilder;
    toString(): string;
    x(x: number): BurnPointBuilder;
    y(y: number): BurnPointBuilder;
  }

}

declare module 'it.hurts.sskirillss.relics.client.screen.description.research.particles' {
  import { ParticleData } from 'it.hurts.sskirillss.relics.client.screen.description.general.particles.base';
  import { Color } from 'java.awt';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface ResearchParticleData extends ParticleData {}
  class ResearchParticleData extends ParticleData {
    constructor(color: Color, xStart: number, yStart: number, scale: number, lifeTime: number, verticalAcceleration: number);
    render(screen: Screen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    tick(screen: Screen): void;
  }


  interface SmokeParticleData extends ParticleData {}
  class SmokeParticleData extends ParticleData {
    constructor(xStart: number, yStart: number, scale: number, lifeTime: number, fadeInPercentage: number);
    render(screen: Screen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    tick(screen: Screen): void;
  }

}

declare module 'it.hurts.sskirillss.relics.client.screen.description.research.widgets' {
  import { AbstractDescriptionWidget } from 'it.hurts.sskirillss.relics.client.screen.description.general.widgets.base';
  import { IHoverableWidget, ITickingWidget } from 'it.hurts.sskirillss.relics.client.screen.base';
  import { AbilityResearchScreen } from 'it.hurts.sskirillss.relics.client.screen.description.research';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { SoundManager } from 'net.minecraft.client.sounds';
  import { StarData } from 'it.hurts.sskirillss.relics.items.relics.base.data.research';

  interface HintWidget extends IHoverableWidget, ITickingWidget, AbstractDescriptionWidget {}
  class HintWidget extends IHoverableWidget {
    constructor(x: number, y: number, screen: AbilityResearchScreen);
    onHovered(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    onPress(): void;
    onTick(): void;
    playDownSound(handler: SoundManager): void;
    renderWidget(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
  }


  interface StarWidget extends ITickingWidget, AbstractDescriptionWidget {}
  class StarWidget extends ITickingWidget {
    constructor(x: number, y: number, screen: AbilityResearchScreen, star: StarData);
    get star(): StarData;
    isLocked(): boolean;
    onPress(): void;
    onTick(): void;
    playDownSound(handler: SoundManager): void;
    renderWidget(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
  }


  interface TipWidget extends IHoverableWidget, ITickingWidget, AbstractDescriptionWidget {}
  class TipWidget extends IHoverableWidget {
    constructor(x: number, y: number, screen: AbilityResearchScreen);
    onHovered(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    onTick(): void;
    playDownSound(handler: SoundManager): void;
    renderWidget(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
  }

}

declare module 'it.hurts.sskirillss.relics.client.screen.utils' {
  import { Map, List } from 'java.util';
  import { Class } from 'java.lang';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ParticleData } from 'it.hurts.sskirillss.relics.client.screen.description.general.particles.base';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { Component, MutableComponent, Style } from 'net.minecraft.network.chat';
  import { FormattedCharSequence } from 'net.minecraft.util';

  class ParticleStorage {
    static addParticle(screen: Screen, ...data: ParticleData[]): void;
    static addParticle(clazz: Class<Screen>, ...data: ParticleData[]): void;
    static get particlesData(): Map<Class<Screen>, ParticleData[]>;
    static getParticles(screen: Screen): ParticleData[];
    static getParticles(clazz: Class<Screen>): ParticleData[];
  }


  class ScreenUtils {
    static readonly ALT_FONT: ResourceLocation;
    static readonly ILLAGER_ALT_FONT: ResourceLocation;
    static drawCenteredString(guiGraphics: GuiGraphics, font: Font, text: Component, x: number, y: number, color: number, dropShadow: boolean): void;
    static drawCenteredString(guiGraphics: GuiGraphics, font: Font, text: Component, x: number, y: number, color: number, dropShadow: boolean): void;
    static drawCenteredString(guiGraphics: GuiGraphics, font: Font, text: string, x: number, y: number, color: number, dropShadow: boolean): void;
    static drawCenteredString(guiGraphics: GuiGraphics, font: Font, text: FormattedCharSequence, x: number, y: number, color: number, dropShadow: boolean): void;
    static drawTexturedTooltipBorder(guiGraphics: GuiGraphics, texture: ResourceLocation, width: number, height: number, x: number, y: number): void;
    static galactizate(input: MutableComponent, percentage: number, seed: number): MutableComponent;
    static illageriate(input: MutableComponent, percentage: number, seed: number): MutableComponent;
    static isHovered(x: number, y: number, width: number, height: number, mouseX: number, mouseY: number): boolean;
    static obfuscate(input: MutableComponent, percentage: number, seed: number): MutableComponent;
    static stylize(input: MutableComponent, percentage: number, style: Style, seed: number): MutableComponent;
    static stylizeWithReplacement(input: string, percentage: number, style: Style, seed: number): MutableComponent;
    static stylizeWithReplacement(input: MutableComponent, percentage: number, style: Style, seed: number): MutableComponent;
  }

}

declare module 'it.hurts.sskirillss.relics.client.tooltip' {
  import { TooltipDisplayEvent } from 'it.hurts.sskirillss.relics.api.events.common';
  import { Color } from 'RenderTooltipEvent';

  class TooltipBorderHandler {
    static onTooltipColorEvent(event: Color): void;
    static onTooltipDisplay(event: TooltipDisplayEvent): void;
  }

}

declare module 'it.hurts.sskirillss.relics.commands.arguments' {
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { CommandContext } from 'com.mojang.brigadier.context';
  import { StringReader } from 'com.mojang.brigadier';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Suggestions, SuggestionsBuilder } from 'com.mojang.brigadier.suggestion';

  interface RelicAbilityArgument extends ArgumentType<string> {}
  class RelicAbilityArgument extends ArgumentType<string> {
    static ability(): RelicAbilityArgument;
    static getAbility(context: CommandContext<any>, name: string): string;
    listSuggestions<S>(context: CommandContext<S>, builder: SuggestionsBuilder): CompletableFuture<Suggestions>;
    parse(reader: StringReader): string;
  }


  interface RelicAbilityStatArgument extends ArgumentType<string> {}
  class RelicAbilityStatArgument extends ArgumentType<string> {
    static abilityStat(): RelicAbilityStatArgument;
    static getAbilityStat(context: CommandContext<any>, name: string): string;
    listSuggestions<S>(context: CommandContext<S>, builder: SuggestionsBuilder): CompletableFuture<Suggestions>;
    parse(reader: StringReader): string;
  }

}

declare module 'it.hurts.sskirillss.relics.commands' {
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack } from 'net.minecraft.commands';

  class RelicsCommand {
    static register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }

}

declare module 'it.hurts.sskirillss.relics.commands.RelicsCommand' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface CommandAction extends Enum<CommandAction> {}
  class CommandAction extends Enum<CommandAction> {
    static readonly SET: CommandAction;
    static readonly ADD: CommandAction;
    static readonly TAKE: CommandAction;
    static valueOf(name: string): CommandAction;
    static values(): CommandAction[];
  }

}

declare module 'it.hurts.sskirillss.relics.components.AbilitiesComponent' {
  import { AbilityComponent, AbilitiesComponent } from 'it.hurts.sskirillss.relics.components';
  import { Map } from 'java.util';

  class AbilitiesComponentBuilder {
    abilities(abilities: Map<string, AbilityComponent>): AbilitiesComponentBuilder;
    ability(abilityKey: string, abilityValue: AbilityComponent): AbilitiesComponentBuilder;
    build(): AbilitiesComponent;
    clearAbilities(): AbilitiesComponentBuilder;
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.components.AbilityComponent' {
  import { StatComponent, ResearchComponent, LockComponent, AbilityExtenderComponent, AbilityComponent } from 'it.hurts.sskirillss.relics.components';
  import { Map } from 'java.util';

  class AbilityComponentBuilder {
    build(): AbilityComponent;
    clearStats(): AbilityComponentBuilder;
    extender(extender: AbilityExtenderComponent): AbilityComponentBuilder;
    lock(lock: LockComponent): AbilityComponentBuilder;
    points(points: number): AbilityComponentBuilder;
    research(research: ResearchComponent): AbilityComponentBuilder;
    stat(statKey: string, statValue: StatComponent): AbilityComponentBuilder;
    stats(stats: Map<string, StatComponent>): AbilityComponentBuilder;
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.components.AbilityExtenderComponent' {
  import { AbilityExtenderComponent } from 'it.hurts.sskirillss.relics.components';

  class AbilityExtenderComponentBuilder {
    build(): AbilityExtenderComponent;
    cooldown(cooldown: number): AbilityExtenderComponentBuilder;
    cooldownCap(cooldownCap: number): AbilityExtenderComponentBuilder;
    ticking(ticking: boolean): AbilityExtenderComponentBuilder;
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.components.DataComponent' {
  import { AbilitiesComponent, LevelingComponent, DataComponent } from 'it.hurts.sskirillss.relics.components';

  class DataComponentBuilder {
    abilities(abilities: AbilitiesComponent): DataComponentBuilder;
    build(): DataComponent;
    leveling(leveling: LevelingComponent): DataComponentBuilder;
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.components.LevelingComponent' {
  import { LevelingComponent } from 'it.hurts.sskirillss.relics.components';

  class LevelingComponentBuilder {
    build(): LevelingComponent;
    experience(experience: number): LevelingComponentBuilder;
    level(level: number): LevelingComponentBuilder;
    luck(luck: number): LevelingComponentBuilder;
    points(points: number): LevelingComponentBuilder;
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.components.LockComponent' {
  import { LockComponent } from 'it.hurts.sskirillss.relics.components';

  class LockComponentBuilder {
    build(): LockComponent;
    toString(): string;
    unlocks(unlocks: number): LockComponentBuilder;
  }

}

declare module 'it.hurts.sskirillss.relics.components.ResearchComponent' {
  import { Map, List } from 'java.util';
  import { Integer } from 'java.lang';
  import { ResearchComponent } from 'it.hurts.sskirillss.relics.components';

  class ResearchComponentBuilder {
    build(): ResearchComponent;
    links(links: Map<string, number[]>): ResearchComponentBuilder;
    researched(researched: boolean): ResearchComponentBuilder;
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.components.StatComponent' {
  import { StatComponent } from 'it.hurts.sskirillss.relics.components';

  class StatComponentBuilder {
    build(): StatComponent;
    initialValue(initialValue: number): StatComponentBuilder;
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.config.data' {
  import { Map, List } from 'java.util';
  import { AbilitiesData, AbilityData, LevelingData, StatData } from 'it.hurts.sskirillss.relics.items.relics.base.data.leveling';
  import { IRelicItem } from 'it.hurts.sskirillss.relics.items.relics.base';
  import { LootData } from 'it.hurts.sskirillss.relics.items.relics.base.data.loot';
  import { OctoConfig } from 'it.hurts.octostudios.octolib.module.config.impl';
  import { RelicData } from 'it.hurts.sskirillss.relics.items.relics.base.data';
  import { UpgradeOperation } from 'it.hurts.sskirillss.relics.items.relics.base.data.leveling.misc';

  class AbilitiesConfigData {
    constructor();

    constructor(abilities: Map<string, AbilityConfigData>);
    equals(o: any): boolean;
    get abilities(): Map<string, AbilityConfigData>;
    hashCode(): number;
    set abilities(abilities: Map<string, AbilityConfigData>);
    toData(relic: IRelicItem): AbilitiesData;
    toString(): string;
  }


  class AbilityConfigData {
    constructor();

    constructor(requiredPoints: number, requiredLevel: number, maxLevel: number, stats: Map<string, StatConfigData>);
    equals(o: any): boolean;
    get maxLevel(): number;
    get requiredLevel(): number;
    get requiredPoints(): number;
    get stats(): Map<string, StatConfigData>;
    hashCode(): number;
    set maxLevel(maxLevel: number);
    set requiredLevel(requiredLevel: number);
    set requiredPoints(requiredPoints: number);
    set stats(stats: Map<string, StatConfigData>);
    toData(relic: IRelicItem, ability: string): AbilityData;
    toString(): string;
  }


  class LevelingConfigData {
    constructor();

    constructor(initialCost: number, maxLevel: number, step: number);
    equals(o: any): boolean;
    get initialCost(): number;
    get maxLevel(): number;
    get step(): number;
    hashCode(): number;
    set initialCost(initialCost: number);
    set maxLevel(maxLevel: number);
    set step(step: number);
    toData(relic: IRelicItem): LevelingData;
    toString(): string;
  }


  class LootConfigData {
    constructor();

    constructor(entries: LootEntryConfigData[]);
    equals(o: any): boolean;
    get entries(): LootEntryConfigData[];
    hashCode(): number;
    set entries(entries: LootEntryConfigData[]);
    toData(relic: IRelicItem): LootData;
    toString(): string;
  }


  class LootEntryConfigData {
    constructor();

    constructor(dimensions: string[], biomes: string[], tables: string[], weight: number);
    equals(o: any): boolean;
    get biomes(): string[];
    get dimensions(): string[];
    get tables(): string[];
    get weight(): number;
    hashCode(): number;
    set biomes(biomes: string[]);
    set dimensions(dimensions: string[]);
    set tables(tables: string[]);
    set weight(weight: number);
    toString(): string;
  }


  interface RelicConfigData extends OctoConfig {}
  class RelicConfigData extends OctoConfig {
    constructor(relic: IRelicItem);

    constructor();
    equals(o: any): boolean;
    get abilitiesData(): AbilitiesConfigData;
    get levelingData(): LevelingConfigData;
    get lootData(): LootConfigData;
    get relic(): IRelicItem;
    hashCode(): number;
    onLoadObject(object: any): void;
    set abilitiesData(abilitiesData: AbilitiesConfigData);
    set levelingData(levelingData: LevelingConfigData);
    set lootData(lootData: LootConfigData);
    set relic(relic: IRelicItem);
    toData(relic: IRelicItem): RelicData;
    toString(): string;
  }


  class StatConfigData {
    constructor();

    constructor(minInitialValue: number, maxInitialValue: number, minThresholdValue: number, maxThresholdValue: number, upgradeOperation: UpgradeOperation, upgradeModifier: number);
    equals(o: any): boolean;
    get maxInitialValue(): number;
    get maxThresholdValue(): number;
    get minInitialValue(): number;
    get minThresholdValue(): number;
    get upgradeModifier(): number;
    get upgradeOperation(): UpgradeOperation;
    hashCode(): number;
    set maxInitialValue(maxInitialValue: number);
    set maxThresholdValue(maxThresholdValue: number);
    set minInitialValue(minInitialValue: number);
    set minThresholdValue(minThresholdValue: number);
    set upgradeModifier(upgradeModifier: number);
    set upgradeOperation(upgradeOperation: UpgradeOperation);
    toData(relic: IRelicItem, ability: string, stat: string): StatData;
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.config' {
  import { OctoConfig } from 'it.hurts.octostudios.octolib.module.config.impl';

  interface LootConfigData extends OctoConfig {}
  class LootConfigData extends OctoConfig {
    equals(o: any): boolean;
    get relicGenChance(): number;
    hashCode(): number;
    set relicGenChance(relicGenChance: number);
    toString(): string;
  }


  interface RelicsConfigData extends OctoConfig {}
  class RelicsConfigData extends OctoConfig {
    equals(o: any): boolean;
    hashCode(): number;
    isEnabledExtendedConfigs(): boolean;
    setEnabledExtendedConfigs(enabledExtendedConfigs: boolean): void;
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.effects' {
  import { MobEffect } from 'net.minecraft.world.effect';

  interface AntiHealEffect extends MobEffect {}
  class AntiHealEffect extends MobEffect {
    constructor();
  }


  interface BleedingEffect extends MobEffect {}
  class BleedingEffect extends MobEffect {
    constructor();
  }


  interface ConfusionEffect extends MobEffect {}
  class ConfusionEffect extends MobEffect {
    constructor();
  }


  interface ImmortalityEffect extends MobEffect {}
  class ImmortalityEffect extends MobEffect {
    constructor();
  }


  interface ParalysisEffect extends MobEffect {}
  class ParalysisEffect extends MobEffect {
    constructor();
  }


  interface StunEffect extends MobEffect {}
  class StunEffect extends MobEffect {
    constructor();
  }


  interface VanishingEffect extends MobEffect {}
  class VanishingEffect extends MobEffect {
    constructor();
  }

}

declare module 'it.hurts.sskirillss.relics.effects.AntiHealEffect' {
  import { LivingHealEvent } from 'net.neoforged.neoforge.event.entity.living';

  class Events {
    static onLivingHeal(event: LivingHealEvent): void;
  }

}

declare module 'it.hurts.sskirillss.relics.effects.BleedingEffect' {
  import { Post } from 'EntityTickEvent';

  class Events {
    static onLivingUpdate(event: Post): void;
  }

}

declare module 'it.hurts.sskirillss.relics.effects.ConfusionEffect' {
  import { MovementInputUpdateEvent } from 'net.neoforged.neoforge.client.event';

  class ClientEvents {
    static onMovementInput(event: MovementInputUpdateEvent): void;
  }

}

declare module 'it.hurts.sskirillss.relics.effects.ImmortalityEffect' {
  import { LivingIncomingDamageEvent } from 'net.neoforged.neoforge.event.entity.living';

  class Events {
    static onLivingIncomingDamage(event: LivingIncomingDamageEvent): void;
  }

}

declare module 'it.hurts.sskirillss.relics.effects.ParalysisEffect' {
  import { MovementInputUpdateEvent } from 'net.neoforged.neoforge.client.event';

  class ClientEvents {
    static onMovementInput(event: MovementInputUpdateEvent): void;
  }

}

declare module 'it.hurts.sskirillss.relics.effects.StunEffect' {
  import { InteractionKeyMappingTriggered } from 'InputEvent';
  import { Block } from 'RenderHighlightEvent';
  import { Pre } from 'RenderLivingEvent';

  class ClientEvents {
    static onBlockHighlight(event: Block): void;
    static onEntityRender(event: Pre<any, any>): void;
    static onMouseInput(event: InteractionKeyMappingTriggered): void;
  }

}

declare module 'it.hurts.sskirillss.relics.effects.VanishingEffect' {
  import { Pre } from 'RenderLivingEvent';
  import { RenderHandEvent } from 'net.neoforged.neoforge.client.event';

  class ClientEvents {
    static onEntityRender(event: Pre<any, any>): void;
    static onHandRender(event: RenderHandEvent): void;
  }

}

declare module 'it.hurts.sskirillss.relics.entities' {
  import { Entity, EntityType, LivingEntity, EntityDimensions, Pose } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ThrowableProjectile, ThrowableItemProjectile } from 'net.minecraft.world.entity.projectile';
  import { ITargetableEntity } from 'it.hurts.sskirillss.relics.entities.misc';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { List, UUID, Set } from 'java.util';
  import { BlockPos } from 'net.minecraft.core';
  import { SoundSource } from 'net.minecraft.sounds';
  import { FluidType } from 'net.neoforged.neoforge.fluids';
  import { EntityDataAccessor } from 'net.minecraft.network.syncher';
  import { ItemStack } from 'net.minecraft.world.item';

  interface BlockSimulationEntity extends Entity {}
  class BlockSimulationEntity extends Entity {
    constructor(pEntityType: EntityType<any>, level: Level);

    constructor(level: Level, state: BlockState);
    get blockState(): BlockState;
    isPushedByFluid(): boolean;
    set blockState(state: BlockState);
    tick(): void;
  }


  interface ChairEntity extends Entity {}
  class ChairEntity extends Entity {
    constructor(pEntityType: EntityType<any>, level: Level);
    getPassengerRidingPosition(pEntity: Entity): Vec3;
    tick(): void;
  }


  interface DeathEssenceEntity extends ITargetableEntity, ThrowableProjectile {}
  class DeathEssenceEntity extends ITargetableEntity {
    constructor(type: EntityType<DeathEssenceEntity>, worldIn: Level);
    addAdditionalSaveData(tag: CompoundTag): void;
    get damage(): number;
    get target(): LivingEntity;
    isNoGravity(): boolean;
    readAdditionalSaveData(tag: CompoundTag): void;
    set damage(heal: number);
    set target(target: LivingEntity);
    tick(): void;
  }


  interface DissectionEntity extends Entity {}
  class DissectionEntity extends Entity {
    entities: List;
    blacklist: List;
    locked: boolean;
    pair: UUID;
    constructor(pEntityType: EntityType<any>, level: Level);

    constructor(level: Level);
    get lifeTime(): number;
    get maxLifeTime(): number;
    get pair(): DissectionEntity;
    isMaster(): boolean;
    isPushedByFluid(): boolean;
    onRemovedFromLevel(): void;
    set lifeTime(amount: number);
    set maxLifeTime(maxLifeTime: number);
    set pair(entity: Entity);
    setMaster(isMaster: boolean): void;
    tick(): void;
  }


  interface LifeEssenceEntity extends ITargetableEntity, ThrowableProjectile {}
  class LifeEssenceEntity extends ITargetableEntity {
    constructor(type: EntityType<LifeEssenceEntity>, worldIn: Level);
    addAdditionalSaveData(tag: CompoundTag): void;
    get heal(): number;
    get target(): LivingEntity;
    isNoGravity(): boolean;
    readAdditionalSaveData(tag: CompoundTag): void;
    set heal(heal: number);
    set target(target: LivingEntity);
    tick(): void;
  }


  interface RelicExperienceOrbEntity extends Entity {}
  class RelicExperienceOrbEntity extends Entity {
    constructor(type: EntityType<RelicExperienceOrbEntity>, level: Level);
    get blockPosBelowThatAffectsMyMovement(): BlockPos;
    get experience(): number;
    static get maxExperience(): number;
    get soundSource(): SoundSource;
    get stage(): number;
    getDimensions(pPose: Pose): EntityDimensions;
    isAttackable(): boolean;
    isPushedByFluid(type: FluidType): boolean;
    onSyncedDataUpdated(pKey: EntityDataAccessor<any>): void;
    set experience(experience: number);
    shouldRenderAtSqrDistance(pDistance: number): boolean;
    tick(): void;
  }


  interface ShadowGlaiveEntity extends ITargetableEntity, ThrowableProjectile {}
  class ShadowGlaiveEntity extends ITargetableEntity {
    constructor(type: EntityType<ShadowGlaiveEntity>, level: Level);
    addAdditionalSaveData(tag: CompoundTag): void;
    addBounces(bounces: number): void;
    get bouncedTargets(): Set<string>;
    get bounces(): number;
    get chance(): number;
    get damage(): number;
    get maxBounces(): number;
    get target(): LivingEntity;
    isPushedByFluid(): boolean;
    locateNearestTargets(): LivingEntity[];
    readAdditionalSaveData(tag: CompoundTag): void;
    set bounces(bounces: number);
    set chance(chance: number);
    set damage(damage: number);
    set maxBounces(maxBounces: number);
    set target(target: LivingEntity);
    tick(): void;
  }


  interface ShockwaveEntity extends ThrowableProjectile {}
  class ShockwaveEntity extends ThrowableProjectile {
    constructor(pEntityType: EntityType<ThrowableProjectile>, pLevel: Level);

    constructor(level: Level, radius: number, damage: number);
    get damage(): number;
    get poses(): BlockPos[];
    get radius(): number;
    get step(): number;
    isPushedByFluid(): boolean;
    set damage(damage: number);
    set poses(poses: BlockPos[]);
    set radius(radius: number);
    set step(step: number);
    tick(): void;
  }


  interface SolidSnowballEntity extends ThrowableProjectile {}
  class SolidSnowballEntity extends ThrowableProjectile {
    constructor(pEntityType: EntityType<ThrowableProjectile>, pLevel: Level);

    constructor(level: Level);
    get size(): number;
    isPushedByFluid(): boolean;
    onRemovedFromLevel(): void;
    set size(amount: number);
    tick(): void;
  }


  interface SporeEntity extends ITargetableEntity, ThrowableProjectile {}
  class SporeEntity extends ITargetableEntity {
    constructor(entityType: EntityType<ThrowableProjectile>, level: Level);
    addAdditionalSaveData(tag: CompoundTag): void;
    get damage(): number;
    get relicStack(): ItemStack;
    get target(): LivingEntity;
    isPushedByFluid(): boolean;
    locateNearestTargets(): LivingEntity[];
    onRemovedFromLevel(): void;
    readAdditionalSaveData(tag: CompoundTag): void;
    set damage(damage: number);
    set relicStack(stack: ItemStack);
    set target(target: LivingEntity);
    tick(): void;
  }


  interface StalactiteEntity extends ThrowableProjectile {}
  class StalactiteEntity extends ThrowableProjectile {
    constructor(pEntityType: EntityType<ThrowableProjectile>, pLevel: Level);

    constructor(level: Level, damage: number, stun: number);
    get damage(): number;
    get stun(): number;
    isPushedByFluid(): boolean;
    set damage(damage: number);
    set stun(stun: number);
    tick(): void;
  }


  interface ThrownRelicExperienceBottle extends ThrowableItemProjectile {}
  class ThrownRelicExperienceBottle extends ThrowableItemProjectile {
    constructor(type: EntityType<ThrownRelicExperienceBottle>, level: Level);
  }

}

declare module 'it.hurts.sskirillss.relics.entities.DeathEssenceEntity' {
  import { EntityTrailProvider } from 'it.hurts.octostudios.octolib.module.particle.trail';
  import { DeathEssenceEntity } from 'it.hurts.sskirillss.relics.entities';
  import { Vec3 } from 'net.minecraft.world.phys';

  interface TrailProvider extends EntityTrailProvider<DeathEssenceEntity> {}
  class TrailProvider extends EntityTrailProvider<DeathEssenceEntity> {
    constructor(entity: DeathEssenceEntity);
    get trailFadeInColor(): number;
    get trailFadeOutColor(): number;
    get trailMaxLength(): number;
    get trailScale(): number;
    get trailUpdateFrequency(): number;
    getTrailPosition(partialTicks: number): Vec3;
    isTrailAlive(): boolean;
    isTrailGrowing(): boolean;
  }

}

declare module 'it.hurts.sskirillss.relics.entities.LifeEssenceEntity' {
  import { EntityTrailProvider } from 'it.hurts.octostudios.octolib.module.particle.trail';
  import { LifeEssenceEntity } from 'it.hurts.sskirillss.relics.entities';
  import { Vec3 } from 'net.minecraft.world.phys';

  interface TrailProvider extends EntityTrailProvider<LifeEssenceEntity> {}
  class TrailProvider extends EntityTrailProvider<LifeEssenceEntity> {
    constructor(entity: LifeEssenceEntity);
    get trailFadeInColor(): number;
    get trailFadeOutColor(): number;
    get trailMaxLength(): number;
    get trailScale(): number;
    get trailUpdateFrequency(): number;
    getTrailPosition(partialTicks: number): Vec3;
    isTrailAlive(): boolean;
    isTrailGrowing(): boolean;
  }

}

declare module 'it.hurts.sskirillss.relics.entities.misc' {
  import { LivingEntity } from 'net.minecraft.world.entity';

  class ITargetableEntity {
    get target(): LivingEntity;
    set target(var1: LivingEntity);
  }

}

declare module 'it.hurts.sskirillss.relics.entities.ShadowGlaiveEntity' {
  import { EntityTrailProvider } from 'it.hurts.octostudios.octolib.module.particle.trail';
  import { ShadowGlaiveEntity } from 'it.hurts.sskirillss.relics.entities';
  import { Vec3 } from 'net.minecraft.world.phys';

  interface TrailProvider extends EntityTrailProvider<ShadowGlaiveEntity> {}
  class TrailProvider extends EntityTrailProvider<ShadowGlaiveEntity> {
    constructor(entity: ShadowGlaiveEntity);
    get trailFadeInColor(): number;
    get trailFadeOutColor(): number;
    get trailMaxLength(): number;
    get trailScale(): number;
    get trailUpdateFrequency(): number;
    getTrailPosition(partialTicks: number): Vec3;
    isTrailAlive(): boolean;
    isTrailGrowing(): boolean;
  }

}

declare module 'it.hurts.sskirillss.relics.entities.SporeEntity' {
  import { EntityTrailProvider } from 'it.hurts.octostudios.octolib.module.particle.trail';
  import { SporeEntity } from 'it.hurts.sskirillss.relics.entities';
  import { Vec3 } from 'net.minecraft.world.phys';

  interface TrailProvider extends EntityTrailProvider<SporeEntity> {}
  class TrailProvider extends EntityTrailProvider<SporeEntity> {
    constructor(entity: SporeEntity);
    get trailFadeInColor(): number;
    get trailFadeOutColor(): number;
    get trailMaxLength(): number;
    get trailScale(): number;
    get trailUpdateFrequency(): number;
    getTrailPosition(partialTicks: number): Vec3;
    isTrailAlive(): boolean;
    isTrailGrowing(): boolean;
  }

}

declare module 'it.hurts.sskirillss.relics.init' {
  import { DeferredRegister, DeferredHolder, NewRegistryEvent } from 'net.neoforged.neoforge.registries';
  import { Supplier } from 'java.util.function';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { RegisterCommandsEvent, BuildCreativeModeTabContentsEvent, ModifyDefaultComponentsEvent } from 'net.neoforged.neoforge.event';
  import { RelicsConfigData, LootConfigData } from 'it.hurts.sskirillss.relics.config';
  import { KeyMapping } from 'net.minecraft.client';
  import { RegisterKeyMappingsEvent, RegisterParticleProvidersEvent, RegisterShadersEvent, RegisterClientTooltipComponentFactoriesEvent, RegisterGuiLayersEvent } from 'net.neoforged.neoforge.client.event';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Registry } from 'net.minecraft.core';
  import { ShaderInstance } from 'net.minecraft.client.renderer';
  import { ShaderStateShard } from 'RenderStateShard';
  import { FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';
  import { RegisterLayerDefinitions, AddLayers, RegisterRenderers } from 'EntityRenderersEvent';

  class BadgeRegistry {
    static readonly BADGES: DeferredRegister;
    static readonly SILENCE: Supplier;
    static readonly OBLIVION: Supplier;
    static readonly FLAWLESS_ABILITY: Supplier;
    static readonly INSTANTANEOUS: Supplier;
    static readonly INTERRUPTIBLE: Supplier;
    static readonly CYCLICAL: Supplier;
    static readonly TOGGLEABLE: Supplier;
    static readonly CHARGEABLE: Supplier;
    static readonly FLAWLESS_RELIC: Supplier;
    static register(bus: IEventBus): void;
  }


  class BlockRegistry {
    static readonly ITEMS: DeferredRegister;
    static readonly RESEARCHING_TABLE: DeferredHolder;
    static readonly PHANTOM_BLOCK: DeferredHolder;
    static register(bus: IEventBus): void;
  }


  class CommandRegistry {
    static readonly RELIC_ABILITY: DeferredHolder;
    static readonly RELIC_ABILITY_STAT: DeferredHolder;
    static register(bus: IEventBus): void;
    static registerCommands(event: RegisterCommandsEvent): void;
  }


  class ConfigRegistry {
    static readonly RELICS_CONFIG: RelicsConfigData;
    static readonly LOOT_CONFIG: LootConfigData;
    static register(): void;
  }


  class CreativeTabRegistry {
    static readonly CREATIVE_TABS: DeferredRegister;
    static readonly RELICS_TAB: DeferredHolder;
    static fillCreativeTabs(event: BuildCreativeModeTabContentsEvent): void;
    static register(bus: IEventBus): void;
  }


  class DataComponentRegistry {
    static readonly DATA_COMPONENTS: DeferredRegister;
    static readonly DATA: DeferredHolder;
    static readonly CHARGE: DeferredHolder;
    static readonly TOGGLED: DeferredHolder;
    static readonly TIME: DeferredHolder;
    static readonly COOLDOWN: DeferredHolder;
    static readonly COUNT: DeferredHolder;
    static readonly PROGRESS: DeferredHolder;
    static readonly TARGET: DeferredHolder;
    static readonly SPEED: DeferredHolder;
    static readonly RADIUS: DeferredHolder;
    static readonly HEIGHT: DeferredHolder;
    static readonly WORLD_POSITION: DeferredHolder;
    static readonly PORTAL: DeferredHolder;
    static readonly BLOCK_STATE: DeferredHolder;
    static readonly MODE: DeferredHolder;
    static modifyComponents(event: ModifyDefaultComponentsEvent): void;
    static register(bus: IEventBus): void;
  }


  class DispenserBehaviorRegistry {
    static register(): void;
  }


  class EffectRegistry {
    static readonly EFFECTS: DeferredRegister;
    static readonly IMMORTALITY: DeferredHolder;
    static readonly CONFUSION: DeferredHolder;
    static readonly PARALYSIS: DeferredHolder;
    static readonly VANISHING: DeferredHolder;
    static readonly ANTI_HEAL: DeferredHolder;
    static readonly BLEEDING: DeferredHolder;
    static readonly STUN: DeferredHolder;
    static register(bus: IEventBus): void;
  }


  class EntityRegistry {
    static readonly SHADOW_GLAIVE: DeferredHolder;
    static readonly BLOCK_SIMULATION: DeferredHolder;
    static readonly SHOCKWAVE: DeferredHolder;
    static readonly LIFE_ESSENCE: DeferredHolder;
    static readonly DEATH_ESSENCE: DeferredHolder;
    static readonly STALACTITE: DeferredHolder;
    static readonly DISSECTION: DeferredHolder;
    static readonly SPORE: DeferredHolder;
    static readonly SOLID_SNOWBALL: DeferredHolder;
    static readonly RELIC_EXPERIENCE_ORB: DeferredHolder;
    static readonly THROWN_RELIC_EXPERIENCE_BOTTLE: DeferredHolder;
    static readonly CHAIR: DeferredHolder;
    static register(bus: IEventBus): void;
  }


  class HotkeyRegistry {
    static readonly ACTIVE_ABILITIES_LIST: KeyMapping;
    static readonly RESEARCH_RELIC: KeyMapping;
    static onKeybindingRegistry(event: RegisterKeyMappingsEvent): void;
  }


  class ItemRegistry {
    static readonly ITEMS: DeferredRegister;
    static readonly SOLID_SNOWBALL: DeferredHolder;
    static readonly RELIC_EXPERIENCE_BOTTLE: DeferredHolder;
    static readonly REFLECTION_NECKLACE: DeferredHolder;
    static readonly MAGMA_WALKER: DeferredHolder;
    static readonly AQUA_WALKER: DeferredHolder;
    static readonly MIDNIGHT_ROBE: DeferredHolder;
    static readonly DROWNED_BELT: DeferredHolder;
    static readonly JELLYFISH_NECKLACE: DeferredHolder;
    static readonly HUNTER_BELT: DeferredHolder;
    static readonly RAGE_GLOVE: DeferredHolder;
    static readonly ICE_SKATES: DeferredHolder;
    static readonly BASTION_RING: DeferredHolder;
    static readonly CHORUS_INHIBITOR: DeferredHolder;
    static readonly SPACE_DISSECTOR: DeferredHolder;
    static readonly HOLY_LOCKET: DeferredHolder;
    static readonly ENDER_HAND: DeferredHolder;
    static readonly ELYTRA_BOOSTER: DeferredHolder;
    static readonly MAGIC_MIRROR: DeferredHolder;
    static readonly ICE_BREAKER: DeferredHolder;
    static readonly BLAZING_FLASK: DeferredHolder;
    static readonly SPORE_SACK: DeferredHolder;
    static readonly SHADOW_GLAIVE: DeferredHolder;
    static readonly ROLLER_SKATES: DeferredHolder;
    static readonly INFINITY_HAM: DeferredHolder;
    static readonly LEATHER_BELT: DeferredHolder;
    static readonly WOOL_MITTEN: DeferredHolder;
    static readonly AMPHIBIAN_BOOT: DeferredHolder;
    static readonly LEAFY_RING: DeferredHolder;
    static readonly PHANTOM_BOOT: DeferredHolder;
    static readonly SPRINGY_BOOT: DeferredHolder;
    static register(bus: IEventBus): void;
  }


  class LootCodecRegistry {
    static readonly CODECS: DeferredRegister;
    static readonly RELIC_LOOT: DeferredHolder;
    static register(bus: IEventBus): void;
  }


  class ParticleRegistry {
    static readonly PARTICLES: DeferredRegister;
    static readonly BASIC_COLORED: DeferredHolder;
    static onParticleRegistry(event: RegisterParticleProvidersEvent): void;
    static register(bus: IEventBus): void;
  }


  class RegistryRegistry {
    static readonly RELIC_CONTAINER_REGISTRY_KEY: ResourceKey;
    static readonly RELIC_CONTAINER_REGISTRY: Registry;
    static readonly BADGE_REGISTRY_KEY: ResourceKey;
    static readonly BADGE_REGISTRY: Registry;
    static registerRegistries(event: NewRegistryEvent): void;
  }


  class RelicContainerRegistry {
    static readonly RELIC_CONTAINERS: DeferredRegister;
    static readonly CURIOS: Supplier;
    static readonly INVENTORY: Supplier;
    static register(bus: IEventBus): void;
  }


  class RelicsCoreShaders {
    static REVEAL_SHADER: ShaderInstance;
    static REVEAL_SHADER_SHARD: ShaderStateShard;
    static register(event: RegisterShadersEvent): void;
  }


  class RemoteRegistry {
    static entityRenderers(event: RegisterRenderers): void;
    static onOverlayRegistry(event: RegisterGuiLayersEvent): void;
    static onPlayerRendererRegister(event: AddLayers): void;
    static onTooltipRegistry(event: RegisterClientTooltipComponentFactoriesEvent): void;
    static registerLayers(event: RegisterLayerDefinitions): void;
    static setupClient(event: FMLClientSetupEvent): void;
  }


  class SoundRegistry {
    static readonly SOUNDS: DeferredRegister;
    static readonly RICOCHET: DeferredHolder;
    static readonly THROW: DeferredHolder;
    static readonly ARROW_RAIN: DeferredHolder;
    static readonly SPURT: DeferredHolder;
    static readonly POWERED_ARROW: DeferredHolder;
    static readonly LEAP: DeferredHolder;
    static readonly SPRING_BOING: DeferredHolder;
    static readonly TABLE_UPGRADE: DeferredHolder;
    static readonly TABLE_REROLL: DeferredHolder;
    static readonly TABLE_RESET: DeferredHolder;
    static readonly ABILITY_LOCKED: DeferredHolder;
    static readonly ABILITY_COOLDOWN: DeferredHolder;
    static readonly ABILITY_CAST: DeferredHolder;
    static readonly CONNECT_STARS: DeferredHolder;
    static readonly DISCONNECT_STARS: DeferredHolder;
    static readonly FINISH_RESEARCH: DeferredHolder;
    static register(bus: IEventBus): void;
  }


  class TileRegistry {
    static readonly RESEARCHING_TABLE: DeferredHolder;
    static register(bus: IEventBus): void;
  }

}

declare module 'it.hurts.sskirillss.relics.items' {
  import { BlockItem, Item, ProjectileItem, ItemStack } from 'net.minecraft.world.item';
  import { ICreativeTabContent, CreativeContentConstructor } from 'it.hurts.sskirillss.relics.items.misc';
  import { Block } from 'net.minecraft.world.level.block';
  import { Properties } from 'Item';
  import { InteractionResultHolder, InteractionHand } from 'net.minecraft.world';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Projectile } from 'net.minecraft.world.entity.projectile';
  import { Position, Direction } from 'net.minecraft.core';
  import { Entity } from 'net.minecraft.world.entity';

  interface BlockItemBase extends ICreativeTabContent, BlockItem {}
  class BlockItemBase extends ICreativeTabContent {
    constructor(block: Block, properties: Properties);
    gatherCreativeTabContent(constructor: CreativeContentConstructor): void;
  }


  interface ItemBase extends Item {}
  class ItemBase extends Item {
    constructor(properties: Properties);
  }


  interface RelicExperienceBottleItem extends ProjectileItem, ItemBase {}
  class RelicExperienceBottleItem extends ProjectileItem {
    constructor();
    asProjectile(p_338868_: Level, p_338766_: Position, p_338321_: ItemStack, p_338772_: Direction): Projectile;
    isFoil(stack: ItemStack): boolean;
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface SolidSnowballItem extends ItemBase {}
  class SolidSnowballItem extends ItemBase {
    constructor();
    inventoryTick(stack: ItemStack, level: Level, entity: Entity, slotId: number, isSelected: boolean): void;
    use(level: Level, player: Player, usedHand: InteractionHand): InteractionResultHolder<ItemStack>;
  }

}

declare module 'it.hurts.sskirillss.relics.items.misc' {
  import { CreativeModeTab, ItemStack } from 'net.minecraft.world.item';
  import { TabVisibility } from 'CreativeModeTab';
  import { ItemLike } from 'net.minecraft.world.level';
  import { List } from 'java.util';
  import { CreativeContentData } from 'it.hurts.sskirillss.relics.items.misc.CreativeContentConstructor';

  class CreativeContentConstructor {
    entry(tab: CreativeModeTab, visibility: TabVisibility, ...items: ItemStack[]): void;
    entry(tab: CreativeModeTab, visibility: TabVisibility, ...items: ItemLike[]): void;
    get entries(): CreativeContentData[];
  }


  class ICreativeTabContent {
    gatherCreativeTabContent(var1: CreativeContentConstructor): void;
  }

}

declare module 'it.hurts.sskirillss.relics.items.misc.CreativeContentConstructor' {
  import { CreativeModeTab, ItemStack } from 'net.minecraft.world.item';
  import { TabVisibility } from 'CreativeModeTab';
  import { List } from 'java.util';

  class CreativeContentData {
    constructor(tab: CreativeModeTab, visibility: TabVisibility, stacks: ItemStack[]);
    get stacks(): ItemStack[];
    get tab(): CreativeModeTab;
    get visibility(): TabVisibility;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.back' {
  import { RelicItem, IRenderableCurio } from 'it.hurts.sskirillss.relics.items.relics.base';
  import { RelicData } from 'it.hurts.sskirillss.relics.items.relics.base.data';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CastType, CastStage } from 'it.hurts.sskirillss.relics.items.relics.base.data.cast.misc';
  import { Level } from 'net.minecraft.world.level';
  import { Entity, LivingEntity } from 'net.minecraft.world.entity';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { SlotContext } from 'top.theillusivec4.curios.api';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { RenderLayerParent } from 'net.minecraft.client.renderer.entity';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { EntityModel } from 'net.minecraft.client.model';
  import { LayerDefinition } from 'net.minecraft.client.model.geom.builders';
  import { List } from 'java.util';
  import { ContainerSlotClickEvent } from 'it.hurts.sskirillss.relics.api.events.common';

  interface ElytraBoosterItem extends IRenderableCurio, RelicItem {}
  class ElytraBoosterItem extends IRenderableCurio {
    castActiveAbility(stack: ItemStack, player: Player, ability: string, type: CastType, stage: CastStage): void;
    constructDefaultRelicData(): RelicData;
    constructLayerDefinition(): LayerDefinition;
    getBreathCapacity(stack: ItemStack): number;
    getTexture(stack: ItemStack): ResourceLocation;
    headParts(): string[];
    inventoryTick(stack: ItemStack, level: Level, entity: Entity, slot: number, isSelected: boolean): void;
    static onSlotClick(event: ContainerSlotClickEvent): void;
    render<T extends LivingEntity, M extends EntityModel<T>>(stack: ItemStack, slotContext: SlotContext, matrixStack: PoseStack, renderLayerParent: RenderLayerParent<T, M>, renderTypeBuffer: MultiBufferSource, light: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface MidnightRobeItem extends IRenderableCurio, RelicItem {}
  class MidnightRobeItem extends IRenderableCurio {
    bodyParts(): string[];
    constructDefaultRelicData(): RelicData;
    constructLayerDefinition(): LayerDefinition;
    curioTick(slotContext: SlotContext, stack: ItemStack): void;
    headParts(): string[];
    onUnequip(slotContext: SlotContext, newStack: ItemStack, stack: ItemStack): void;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.back.MidnightRobeItem' {
  import { LivingIncomingDamageEvent } from 'net.neoforged.neoforge.event.entity.living';

  class ServerEvents {
    static onLivingHurt(event: LivingIncomingDamageEvent): void;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.base.data.cast' {
  import { CastDataBuilder } from 'it.hurts.sskirillss.relics.items.relics.base.data.cast.CastData';
  import { List, Map } from 'java.util';
  import { RelicContainer } from 'it.hurts.sskirillss.relics.items.relics.base.data.cast.containers.base';
  import { CastType, PredicateType } from 'it.hurts.sskirillss.relics.items.relics.base.data.cast.misc';
  import { Pair } from 'org.apache.commons.lang3.tuple';
  import { BiFunction } from 'java.util.function';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Boolean } from 'java.lang';

  class CastData {
    static builder(): CastDataBuilder;
    equals(o: any): boolean;
    get containers(): RelicContainer[];
    get predicates(): Map<string, Pair<PredicateType, BiFunction<Player, ItemStack, boolean>>>;
    get type(): CastType;
    hashCode(): number;
    set containers(containers: RelicContainer[]);
    set predicates(predicates: Map<string, Pair<PredicateType, BiFunction<Player, ItemStack, boolean>>>);
    set type(type: CastType);
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.base.data.cast.CastData' {
  import { PredicateType, CastType } from 'it.hurts.sskirillss.relics.items.relics.base.data.cast.misc';
  import { BiFunction } from 'java.util.function';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Boolean } from 'java.lang';
  import { RelicContainer } from 'it.hurts.sskirillss.relics.items.relics.base.data.cast.containers.base';
  import { List, Map } from 'java.util';
  import { Pair } from 'org.apache.commons.lang3.tuple';
  import { CastData } from 'it.hurts.sskirillss.relics.items.relics.base.data.cast';

  class CastDataBuilder {
    build(): CastData;
    container(...containers: RelicContainer[]): CastDataBuilder;
    containers(containers: RelicContainer[]): CastDataBuilder;
    predicate(id: string, type: PredicateType, predicate: BiFunction<Player, ItemStack, boolean>): CastDataBuilder;
    predicates(predicates: Map<string, Pair<PredicateType, BiFunction<Player, ItemStack, boolean>>>): CastDataBuilder;
    toString(): string;
    type(type: CastType): CastDataBuilder;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.base.data.cast.containers.base' {
  import { Function } from 'java.util.function';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { List } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { AbilityReference } from 'it.hurts.sskirillss.relics.system.casts.abilities';

  class RelicContainer {
    gatherAbilities(): Function<LivingEntity, AbilityReference[]>;
    gatherRelics(): Function<LivingEntity, ItemStack[]>;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.base.data.cast.containers' {
  import { RelicContainer } from 'it.hurts.sskirillss.relics.items.relics.base.data.cast.containers.base';
  import { Function } from 'java.util.function';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { List } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { AbilityReference } from 'it.hurts.sskirillss.relics.system.casts.abilities';

  interface CuriosRelicContainer extends RelicContainer {}
  class CuriosRelicContainer extends RelicContainer {
    gatherAbilities(): Function<LivingEntity, AbilityReference[]>;
    gatherRelics(): Function<LivingEntity, ItemStack[]>;
  }


  interface InventoryRelicContainer extends RelicContainer {}
  class InventoryRelicContainer extends RelicContainer {
    gatherAbilities(): Function<LivingEntity, AbilityReference[]>;
    gatherRelics(): Function<LivingEntity, ItemStack[]>;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.base.data.cast.misc' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface CastStage extends Enum<CastStage> {}
  class CastStage extends Enum<CastStage> {
    static readonly START: CastStage;
    static readonly TICK: CastStage;
    static readonly END: CastStage;
    get id(): number;
    static valueOf(name: string): CastStage;
    static values(): CastStage[];
  }


  interface CastType extends Enum<CastType> {}
  class CastType extends Enum<CastType> {
    static readonly NONE: CastType;
    static readonly INSTANTANEOUS: CastType;
    static readonly INTERRUPTIBLE: CastType;
    static readonly CYCLICAL: CastType;
    static readonly TOGGLEABLE: CastType;
    static readonly CHARGEABLE: CastType;
    get id(): number;
    static valueOf(name: string): CastType;
    static values(): CastType[];
  }


  interface PredicateType extends Enum<PredicateType> {}
  class PredicateType extends Enum<PredicateType> {
    static readonly CAST: PredicateType;
    static readonly VISIBILITY: PredicateType;
    static valueOf(name: string): PredicateType;
    static values(): PredicateType[];
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.base.data.leveling' {
  import { AbilitiesConfigData, AbilityConfigData, LevelingConfigData, StatConfigData } from 'it.hurts.sskirillss.relics.config.data';
  import { AbilitiesDataBuilder } from 'it.hurts.sskirillss.relics.items.relics.base.data.leveling.AbilitiesData';
  import { Map } from 'java.util';
  import { AbilityDataBuilder } from 'it.hurts.sskirillss.relics.items.relics.base.data.leveling.AbilityData';
  import { Function3 } from 'com.mojang.datafixers.util';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { CastData } from 'it.hurts.sskirillss.relics.items.relics.base.data.cast';
  import { ResearchData } from 'it.hurts.sskirillss.relics.items.relics.base.data.research';
  import { LevelingDataBuilder } from 'it.hurts.sskirillss.relics.items.relics.base.data.leveling.LevelingData';
  import { LevelingSourceDataBuilder } from 'it.hurts.sskirillss.relics.items.relics.base.data.leveling.LevelingSourceData';
  import { Pair } from 'org.apache.commons.lang3.tuple';
  import { UpgradeOperation, GemShape, GemColor } from 'it.hurts.sskirillss.relics.items.relics.base.data.leveling.misc';
  import { Integer, Double, Number } from 'java.lang';
  import { Function } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { LevelingSourcesDataBuilder } from 'it.hurts.sskirillss.relics.items.relics.base.data.leveling.LevelingSourcesData';
  import { StatDataBuilder } from 'it.hurts.sskirillss.relics.items.relics.base.data.leveling.StatData';

  class AbilitiesData {
    static builder(): AbilitiesDataBuilder;
    equals(o: any): boolean;
    get abilities(): Map<string, AbilityData>;
    hashCode(): number;
    set abilities(abilities: Map<string, AbilityData>);
    toConfigData(): AbilitiesConfigData;
    toString(): string;
  }


  class AbilityData {
    static builder(id: string): AbilityDataBuilder;
    equals(o: any): boolean;
    get castData(): CastData;
    get icon(): Function3<Player, ItemStack, string, string>;
    get id(): string;
    get maxLevel(): number;
    get requiredLevel(): number;
    get requiredPoints(): number;
    get researchData(): ResearchData;
    get stats(): Map<string, StatData>;
    hashCode(): number;
    set castData(castData: CastData);
    set icon(icon: Function3<Player, ItemStack, string, string>);
    set maxLevel(maxLevel: number);
    set requiredLevel(requiredLevel: number);
    set requiredPoints(requiredPoints: number);
    set researchData(researchData: ResearchData);
    set stats(stats: Map<string, StatData>);
    toConfigData(): AbilityConfigData;
    toString(): string;
  }


  class LevelingData {
    constructor(initialCost: number, maxLevel: number, step: number);

    constructor(initialCost: number, maxLevel: number, step: number, sources: LevelingSourcesData);
    static builder(): LevelingDataBuilder;
    equals(o: any): boolean;
    get initialCost(): number;
    get maxLevel(): number;
    get sources(): LevelingSourcesData;
    get step(): number;
    hashCode(): number;
    set initialCost(initialCost: number);
    set maxLevel(maxLevel: number);
    set sources(sources: LevelingSourcesData);
    set step(step: number);
    toConfigData(): LevelingConfigData;
    toString(): string;
  }


  class LevelingSourceData {
    static abilityBuilder(id: string, ability: string): LevelingSourceDataBuilder;
    static abilityBuilder(ability: string): LevelingSourceDataBuilder;
    equals(o: any): boolean;
    static genericBuilder(id: string): LevelingSourceDataBuilder;
    get color(): GemColor;
    get cost(): number;
    get icon(): Function<ItemStack, ResourceLocation>;
    get id(): string;
    get initialValue(): number;
    get maxLevel(): number;
    get requiredAbility(): string;
    get requiredLevel(): number;
    get shape(): GemShape;
    get translationPath(): Function<ItemStack, string>;
    get upgradeModifier(): Pair<UpgradeOperation, number>;
    hashCode(): number;
    set color(color: GemColor);
    set cost(cost: number);
    set icon(icon: Function<ItemStack, ResourceLocation>);
    set initialValue(initialValue: number);
    set maxLevel(maxLevel: number);
    set requiredAbility(requiredAbility: string);
    set requiredLevel(requiredLevel: number);
    set shape(shape: GemShape);
    set translationPath(translationPath: Function<ItemStack, string>);
    set upgradeModifier(upgradeModifier: Pair<UpgradeOperation, number>);
    toString(): string;
  }


  class LevelingSourcesData {
    constructor(sources: Map<string, LevelingSourceData>);
    static builder(): LevelingSourcesDataBuilder;
    equals(o: any): boolean;
    get sources(): Map<string, LevelingSourceData>;
    hashCode(): number;
    set sources(sources: Map<string, LevelingSourceData>);
    toString(): string;
  }


  class StatData {
    static builder(id: string): StatDataBuilder;
    equals(o: any): boolean;
    get formatValue(): Function<number, Number>;
    get id(): string;
    get initialValue(): Pair<number, number>;
    get thresholdValue(): Pair<number, number>;
    get upgradeModifier(): Pair<UpgradeOperation, number>;
    hashCode(): number;
    set formatValue(formatValue: Function<number, Number>);
    set initialValue(initialValue: Pair<number, number>);
    set thresholdValue(thresholdValue: Pair<number, number>);
    set upgradeModifier(upgradeModifier: Pair<UpgradeOperation, number>);
    toConfigData(): StatConfigData;
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.base.data.leveling.AbilitiesData' {
  import { AbilityData, AbilitiesData } from 'it.hurts.sskirillss.relics.items.relics.base.data.leveling';
  import { Map } from 'java.util';

  class AbilitiesDataBuilder {
    abilities(abilities: Map<string, AbilityData>): AbilitiesDataBuilder;
    ability(ability: AbilityData): AbilitiesDataBuilder;
    build(): AbilitiesData;
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.base.data.leveling.AbilityData' {
  import { ResearchData } from 'it.hurts.sskirillss.relics.items.relics.base.data.research';
  import { CastData } from 'it.hurts.sskirillss.relics.items.relics.base.data.cast';
  import { StatData, AbilityData } from 'it.hurts.sskirillss.relics.items.relics.base.data.leveling';
  import { Function3 } from 'com.mojang.datafixers.util';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Map } from 'java.util';

  class AbilityDataBuilder {
    active(data: CastData): AbilityDataBuilder;
    build(): AbilityData;
    icon(icon: Function3<Player, ItemStack, string, string>): AbilityDataBuilder;
    maxLevel(maxLevel: number): AbilityDataBuilder;
    requiredLevel(requiredLevel: number): AbilityDataBuilder;
    requiredPoints(requiredPoints: number): AbilityDataBuilder;
    research(data: ResearchData): AbilityDataBuilder;
    stat(stat: StatData): AbilityDataBuilder;
    stats(stats: Map<string, StatData>): AbilityDataBuilder;
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.base.data.leveling.LevelingData' {
  import { LevelingSourcesData, LevelingData } from 'it.hurts.sskirillss.relics.items.relics.base.data.leveling';

  class LevelingDataBuilder {
    build(): LevelingData;
    initialCost(initialCost: number): LevelingDataBuilder;
    maxLevel(maxLevel: number): LevelingDataBuilder;
    sources(sources: LevelingSourcesData): LevelingDataBuilder;
    step(step: number): LevelingDataBuilder;
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.base.data.leveling.LevelingSourceData' {
  import { UpgradeOperation, GemShape, GemColor } from 'it.hurts.sskirillss.relics.items.relics.base.data.leveling.misc';
  import { Function } from 'java.util.function';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { LevelingSourceData } from 'it.hurts.sskirillss.relics.items.relics.base.data.leveling';

  class LevelingSourceDataBuilder {
    abilityIcon(ability: string): LevelingSourceDataBuilder;
    build(): LevelingSourceData;
    color(color: GemColor): LevelingSourceDataBuilder;
    cost(cost: number): LevelingSourceDataBuilder;
    gem(shape: GemShape, color: GemColor): LevelingSourceDataBuilder;
    genericIcon(icon: string): LevelingSourceDataBuilder;
    initialValue(initialValue: number): LevelingSourceDataBuilder;
    manualIcon(icon: Function<ItemStack, ResourceLocation>): LevelingSourceDataBuilder;
    maxLevel(maxLevel: number): LevelingSourceDataBuilder;
    requiredAbility(requiredAbility: string): LevelingSourceDataBuilder;
    requiredLevel(requiredLevel: number): LevelingSourceDataBuilder;
    shape(shape: GemShape): LevelingSourceDataBuilder;
    toString(): string;
    translationPath(translationPath: Function<ItemStack, string>): LevelingSourceDataBuilder;
    upgradeModifier(operation: UpgradeOperation, step: number): LevelingSourceDataBuilder;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.base.data.leveling.LevelingSourcesData' {
  import { LevelingSourceData, LevelingSourcesData } from 'it.hurts.sskirillss.relics.items.relics.base.data.leveling';
  import { Map } from 'java.util';

  class LevelingSourcesDataBuilder {
    build(): LevelingSourcesData;
    source(source: LevelingSourceData): LevelingSourcesDataBuilder;
    sources(sources: Map<string, LevelingSourceData>): LevelingSourcesDataBuilder;
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.base.data.leveling.misc' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface GemColor extends Enum<GemColor> {}
  class GemColor extends Enum<GemColor> {
    static readonly RED: GemColor;
    static readonly ORANGE: GemColor;
    static readonly YELLOW: GemColor;
    static readonly GREEN: GemColor;
    static readonly CYAN: GemColor;
    static readonly BLUE: GemColor;
    static readonly PURPLE: GemColor;
    static valueOf(name: string): GemColor;
    static values(): GemColor[];
  }


  interface GemShape extends Enum<GemShape> {}
  class GemShape extends Enum<GemShape> {
    static readonly SQUARE: GemShape;
    static readonly OVAL: GemShape;
    static valueOf(name: string): GemShape;
    static values(): GemShape[];
  }


  interface UpgradeOperation extends Enum<UpgradeOperation> {}
  class UpgradeOperation extends Enum<UpgradeOperation> {
    static readonly ADD: UpgradeOperation;
    static readonly MULTIPLY_BASE: UpgradeOperation;
    static readonly MULTIPLY_TOTAL: UpgradeOperation;
    static valueOf(name: string): UpgradeOperation;
    static values(): UpgradeOperation[];
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.base.data.leveling.StatData' {
  import { UpgradeOperation } from 'it.hurts.sskirillss.relics.items.relics.base.data.leveling.misc';
  import { Function } from 'java.util.function';
  import { Double, Number } from 'java.lang';
  import { StatData } from 'it.hurts.sskirillss.relics.items.relics.base.data.leveling';

  class StatDataBuilder {
    build(): StatData;
    formatValue(formatValue: Function<number, Number>): StatDataBuilder;
    initialValue(min: number, max: number): StatDataBuilder;
    thresholdValue(min: number, max: number): StatDataBuilder;
    toString(): string;
    upgradeModifier(operation: UpgradeOperation, step: number): StatDataBuilder;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.base.data.loot' {
  import { LootConfigData } from 'it.hurts.sskirillss.relics.config.data';
  import { LootDataBuilder } from 'it.hurts.sskirillss.relics.items.relics.base.data.loot.LootData';
  import { List } from 'java.util';
  import { LootEntryBuilder } from 'it.hurts.sskirillss.relics.items.relics.base.data.loot.LootEntry';

  class LootData {
    static builder(): LootDataBuilder;
    equals(o: any): boolean;
    get entries(): LootEntry[];
    hashCode(): number;
    set entries(entries: LootEntry[]);
    toConfigData(): LootConfigData;
    toString(): string;
  }


  class LootEntry {
    constructor(dimensions: string[], biomes: string[], tables: string[], weight: number);
    static builder(): LootEntryBuilder;
    equals(o: any): boolean;
    get biomes(): string[];
    get dimensions(): string[];
    get tables(): string[];
    get weight(): number;
    hashCode(): number;
    set biomes(biomes: string[]);
    set dimensions(dimensions: string[]);
    set tables(tables: string[]);
    set weight(weight: number);
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.base.data.loot.LootData' {
  import { LootEntry, LootData } from 'it.hurts.sskirillss.relics.items.relics.base.data.loot';
  import { List } from 'java.util';

  class LootDataBuilder {
    build(): LootData;
    entries(entries: LootEntry[]): LootDataBuilder;
    entry(...entries: LootEntry[]): LootDataBuilder;
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.base.data.loot.LootEntry' {
  import { List } from 'java.util';
  import { LootEntry } from 'it.hurts.sskirillss.relics.items.relics.base.data.loot';

  class LootEntryBuilder {
    biome(...biomes: string[]): LootEntryBuilder;
    biomes(biomes: string[]): LootEntryBuilder;
    build(): LootEntry;
    dimension(...dimensions: string[]): LootEntryBuilder;
    dimensions(dimensions: string[]): LootEntryBuilder;
    table(...table: string[]): LootEntryBuilder;
    tables(tables: string[]): LootEntryBuilder;
    toString(): string;
    weight(weight: number): LootEntryBuilder;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.base.data.loot.misc' {
  import { LootEntry } from 'it.hurts.sskirillss.relics.items.relics.base.data.loot';

  class LootEntries {
    static readonly WILDCARD: LootEntry;
    static readonly OVERWORLD: LootEntry;
    static readonly NETHER_LIKE: LootEntry;
    static readonly THE_NETHER: LootEntry;
    static readonly END_LIKE: LootEntry;
    static readonly THE_END: LootEntry;
    static readonly DESERT: LootEntry;
    static readonly SAVANNA: LootEntry;
    static readonly FOREST: LootEntry;
    static readonly MOUNTAIN: LootEntry;
    static readonly AQUATIC: LootEntry;
    static readonly TROPIC: LootEntry;
    static readonly TAIGA: LootEntry;
    static readonly PLAINS: LootEntry;
    static readonly SWAMP: LootEntry;
    static readonly FROST: LootEntry;
    static readonly CAVE: LootEntry;
    static readonly SCULK: LootEntry;
    static readonly VILLAGE: LootEntry;
    static readonly BASTION: LootEntry;
    static readonly MINESHAFT: LootEntry;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.base.data' {
  import { RelicAttributeModifierBuilder, Modifier } from 'it.hurts.sskirillss.relics.items.relics.base.data.RelicAttributeModifier';
  import { List, Map } from 'java.util';
  import { RelicDataBuilder } from 'it.hurts.sskirillss.relics.items.relics.base.data.RelicData';
  import { AbilitiesData, LevelingData } from 'it.hurts.sskirillss.relics.items.relics.base.data.leveling';
  import { StyleData } from 'it.hurts.sskirillss.relics.items.relics.base.data.style';
  import { LootData } from 'it.hurts.sskirillss.relics.items.relics.base.data.loot';
  import { RelicSlotModifierBuilder } from 'it.hurts.sskirillss.relics.items.relics.base.data.RelicSlotModifier';
  import { Multimap } from 'com.google.common.collect';
  import { Integer } from 'java.lang';

  class RelicAttributeModifier {
    static builder(): RelicAttributeModifierBuilder;
    equals(o: any): boolean;
    get attributes(): Modifier[];
    hashCode(): number;
    set attributes(attributes: Modifier[]);
    toString(): string;
  }


  class RelicData {
    static builder(): RelicDataBuilder;
    equals(o: any): boolean;
    get abilities(): AbilitiesData;
    get leveling(): LevelingData;
    get loot(): LootData;
    get style(): StyleData;
    hashCode(): number;
    set abilities(abilities: AbilitiesData);
    set leveling(leveling: LevelingData);
    set loot(loot: LootData);
    set style(style: StyleData);
    toString(): string;
  }


  class RelicSlotModifier {
    static builder(): RelicSlotModifierBuilder;
    equals(o: any): boolean;
    get modifiers(): Multimap<string, number>;
    hashCode(): number;
    set modifiers(modifiers: Multimap<string, number>);
    toString(): string;
  }


  class RelicStorage {
    static readonly RELICS: Map;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.base.data.RelicAttributeModifier' {
  import { Collection } from 'java.util';
  import { RelicAttributeModifier } from 'it.hurts.sskirillss.relics.items.relics.base.data';
  import { Holder } from 'net.minecraft.core';
  import { Attribute } from 'net.minecraft.world.entity.ai.attributes';
  import { Operation } from 'AttributeModifier';

  class RelicAttributeModifierBuilder {
    attribute(attribute: Modifier): RelicAttributeModifierBuilder;
    attributes(attributes: Collection<Modifier>): RelicAttributeModifierBuilder;
    build(): RelicAttributeModifier;
    clearAttributes(): RelicAttributeModifierBuilder;
    toString(): string;
  }


  class Modifier {
    constructor(attribute: Holder<Attribute>, multiplier: number, operation: Operation);

    constructor(attribute: Holder<Attribute>, multiplier: number);
    equals(o: any): boolean;
    get attribute(): Holder<Attribute>;
    get multiplier(): number;
    get operation(): Operation;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.base.data.RelicData' {
  import { AbilitiesData, LevelingData } from 'it.hurts.sskirillss.relics.items.relics.base.data.leveling';
  import { StyleData } from 'it.hurts.sskirillss.relics.items.relics.base.data.style';
  import { LootData } from 'it.hurts.sskirillss.relics.items.relics.base.data.loot';
  import { RelicData } from 'it.hurts.sskirillss.relics.items.relics.base.data';

  class RelicDataBuilder {
    abilities(abilities: AbilitiesData): RelicDataBuilder;
    build(): RelicData;
    leveling(leveling: LevelingData): RelicDataBuilder;
    loot(loot: LootData): RelicDataBuilder;
    style(style: StyleData): RelicDataBuilder;
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.base.data.RelicSlotModifier' {
  import { Multimap } from 'com.google.common.collect';
  import { Integer } from 'java.lang';
  import { RelicSlotModifier } from 'it.hurts.sskirillss.relics.items.relics.base.data';

  class RelicSlotModifierBuilder {
    build(): RelicSlotModifier;
    modifier(id: string, count: number): RelicSlotModifierBuilder;
    modifiers(modifiers: Multimap<string, number>): RelicSlotModifierBuilder;
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.base.data.research' {
  import { List, Map } from 'java.util';
  import { ResearchDataBuilder } from 'it.hurts.sskirillss.relics.items.relics.base.data.research.ResearchData';
  import { Integer } from 'java.lang';
  import { Multimap } from 'com.google.common.collect';
  import { Vec2 } from 'net.minecraft.world.phys';

  class ResearchData {
    static builder(): ResearchDataBuilder;
    equals(o: any): boolean;
    get links(): Multimap<number, number>;
    get stars(): Map<number, StarData>;
    getConnectedStars(star: StarData): StarData[];
    hashCode(): number;
    set links(links: Multimap<number, number>);
    set stars(stars: Map<number, StarData>);
    toString(): string;
  }


  class StarData {
    constructor(index: number, x: number, y: number);
    equals(o: any): boolean;
    get index(): number;
    get pos(): Vec2;
    get x(): number;
    get y(): number;
    hashCode(): number;
    set index(index: number);
    set x(x: number);
    set y(y: number);
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.base.data.research.ResearchData' {
  import { Map } from 'java.util';
  import { Integer } from 'java.lang';
  import { StarData, ResearchData } from 'it.hurts.sskirillss.relics.items.relics.base.data.research';
  import { Multimap } from 'com.google.common.collect';

  class ResearchDataBuilder {
    build(): ResearchData;
    link(first: number, second: number): ResearchDataBuilder;
    links(links: Multimap<number, number>): ResearchDataBuilder;
    star(index: number, x: number, y: number): ResearchDataBuilder;
    stars(stars: Map<number, StarData>): ResearchDataBuilder;
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.base.data.style' {
  import { BeamsDataBuilder } from 'it.hurts.sskirillss.relics.items.relics.base.data.style.BeamsData';
  import { StyleDataBuilder } from 'it.hurts.sskirillss.relics.items.relics.base.data.style.StyleData';
  import { BiFunction } from 'java.util.function';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { TooltipDataBuilder } from 'it.hurts.sskirillss.relics.items.relics.base.data.style.TooltipData';

  class BeamsData {
    static builder(): BeamsDataBuilder;
    equals(o: any): boolean;
    get endColor(): number;
    get startColor(): number;
    hashCode(): number;
    set endColor(endColor: number);
    set startColor(startColor: number);
    toString(): string;
  }


  class StyleData {
    static builder(): StyleDataBuilder;
    equals(o: any): boolean;
    get beams(): BiFunction<Player, ItemStack, BeamsData>;
    get tooltip(): BiFunction<Player, ItemStack, TooltipData>;
    hashCode(): number;
    set beams(beams: BiFunction<Player, ItemStack, BeamsData>);
    set tooltip(tooltip: BiFunction<Player, ItemStack, TooltipData>);
    toString(): string;
  }


  class TooltipData {
    static builder(): TooltipDataBuilder;
    equals(o: any): boolean;
    get backgroundBottom(): number;
    get backgroundTop(): number;
    get borderBottom(): number;
    get borderTop(): number;
    get icon(): string;
    hashCode(): number;
    isTextured(): boolean;
    set backgroundBottom(backgroundBottom: number);
    set backgroundTop(backgroundTop: number);
    set borderBottom(borderBottom: number);
    set borderTop(borderTop: number);
    set icon(icon: string);
    setTextured(textured: boolean): void;
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.base.data.style.BeamsData' {
  import { BeamsData } from 'it.hurts.sskirillss.relics.items.relics.base.data.style';

  class BeamsDataBuilder {
    build(): BeamsData;
    endColor(endColor: number): BeamsDataBuilder;
    startColor(startColor: number): BeamsDataBuilder;
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.base.data.style.StyleData' {
  import { TooltipData, BeamsData, StyleData } from 'it.hurts.sskirillss.relics.items.relics.base.data.style';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { BiFunction } from 'java.util.function';

  class StyleDataBuilder {
    beams(beams: BeamsData, player: Player, stack: ItemStack): StyleDataBuilder;
    beams(beams: BiFunction<Player, ItemStack, BeamsData>): StyleDataBuilder;
    build(): StyleData;
    toString(): string;
    tooltip(tooltip: TooltipData, player: Player, stack: ItemStack): StyleDataBuilder;
    tooltip(tooltip: BiFunction<Player, ItemStack, TooltipData>): StyleDataBuilder;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.base.data.style.TooltipData' {
  import { TooltipData } from 'it.hurts.sskirillss.relics.items.relics.base.data.style';

  class TooltipDataBuilder {
    backgroundBottom(backgroundBottom: number): TooltipDataBuilder;
    backgroundTop(backgroundTop: number): TooltipDataBuilder;
    borderBottom(borderBottom: number): TooltipDataBuilder;
    borderTop(borderTop: number): TooltipDataBuilder;
    build(): TooltipData;
    icon(icon: string): TooltipDataBuilder;
    textured(textured: boolean): TooltipDataBuilder;
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.base' {
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { RelicData, RelicAttributeModifier, RelicSlotModifier } from 'it.hurts.sskirillss.relics.items.relics.base.data';
  import { RelicConfigData } from 'it.hurts.sskirillss.relics.config.data';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CastType, CastStage, PredicateType } from 'it.hurts.sskirillss.relics.items.relics.base.data.cast.misc';
  import { AbilitiesData, AbilityData, StatData, LevelingData, LevelingSourcesData, LevelingSourceData } from 'it.hurts.sskirillss.relics.items.relics.base.data.leveling';
  import { ResearchData } from 'it.hurts.sskirillss.relics.items.relics.base.data.research';
  import { LootData } from 'it.hurts.sskirillss.relics.items.relics.base.data.loot';
  import { StyleData } from 'it.hurts.sskirillss.relics.items.relics.base.data.style';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { CastData } from 'it.hurts.sskirillss.relics.items.relics.base.data.cast';
  import { Map, List } from 'java.util';
  import { Pair } from 'org.apache.commons.lang3.tuple';
  import { BiFunction } from 'java.util.function';
  import { Boolean, Integer } from 'java.lang';
  import { DataComponent, LevelingComponent, AbilitiesComponent, AbilityComponent, AbilityExtenderComponent, LockComponent, ResearchComponent, StatComponent } from 'it.hurts.sskirillss.relics.components';
  import { Multimap } from 'com.google.common.collect';
  import { ItemBase } from 'it.hurts.sskirillss.relics.items';
  import { ICurioItem } from 'top.theillusivec4.curios.api.type.capability';
  import { ICreativeTabContent, CreativeContentConstructor } from 'it.hurts.sskirillss.relics.items.misc';
  import { Properties, TooltipContext } from 'Item';
  import { Holder } from 'net.minecraft.core';
  import { Attribute, AttributeModifier } from 'net.minecraft.world.entity.ai.attributes';
  import { SlotContext } from 'top.theillusivec4.curios.api';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Component } from 'net.minecraft.network.chat';

  class IRelicItem {
    addAbilityCooldown(stack: ItemStack, ability: string, amount: number): void;
    addAbilityLevel(stack: ItemStack, ability: string, points: number): void;
    addLockUnlocks(stack: ItemStack, ability: string, unlocks: number): void;
    addRelicExperience(stack: ItemStack, amount: number): boolean;
    addRelicExperience(entity: LivingEntity, stack: ItemStack, amount: number): boolean;
    addRelicLevel(stack: ItemStack, amount: number): void;
    addRelicLevelingPoints(stack: ItemStack, amount: number): void;
    addRelicLuck(stack: ItemStack, amount: number): void;
    addResearchLink(stack: ItemStack, ability: string, from: number, to: number): void;
    addStatInitialValue(stack: ItemStack, ability: string, stat: string, value: number): void;
    canBeUpgraded(stack: ItemStack, ability: string): boolean;
    canPlayerSeeAbility(player: Player, stack: ItemStack, ability: string): boolean;
    canPlayerUseAbility(player: Player, stack: ItemStack, ability: string): boolean;
    castActiveAbility(stack: ItemStack, player: Player, ability: string, type: CastType, stage: CastStage): void;
    constructDefaultConfigData(config: RelicConfigData): RelicConfigData;
    constructDefaultRelicData(): RelicData;
    dropRelicExperience(level: Level, pos: Vec3, amount: number): void;
    get abilitiesData(): AbilitiesData;
    get configRoute(): string;
    get item(): Item;
    get levelingData(): LevelingData;
    get levelingSourcesData(): LevelingSourcesData;
    get lootData(): LootData;
    get luckModifier(): number;
    get maxLockUnlocks(): number;
    get maxLuck(): number;
    get maxQuality(): number;
    get relicData(): RelicData;
    get styleData(): StyleData;
    getAbilitiesComponent(stack: ItemStack): AbilitiesComponent;
    getAbilityCastData(ability: string): CastData;
    getAbilityComponent(stack: ItemStack, ability: string): AbilityComponent;
    getAbilityCooldown(stack: ItemStack, ability: string): number;
    getAbilityCooldownCap(stack: ItemStack, ability: string): number;
    getAbilityData(ability: string): AbilityData;
    getAbilityExtenderComponent(stack: ItemStack, ability: string): AbilityExtenderComponent;
    getAbilityLevel(stack: ItemStack, ability: string): number;
    getAbilityMaxLevel(stack: ItemStack, ability: string): number;
    getAbilityPredicates(ability: string): Map<string, Pair<PredicateType, BiFunction<Player, ItemStack, boolean>>>;
    getAbilityPredicates(ability: string, type: PredicateType): Map<string, BiFunction<Player, ItemStack, boolean>>;
    getAbilityQuality(stack: ItemStack, ability: string): number;
    getCorrectResearchLinks(stack: ItemStack, ability: string): Multimap<number, number>;
    getDataComponent(stack: ItemStack): DataComponent;
    getIncorrectResearchLinks(stack: ItemStack, ability: string): Multimap<number, number>;
    getLevelingComponent(stack: ItemStack): LevelingComponent;
    getLevelingSourceData(source: string): LevelingSourceData;
    getLevelingSourceLevel(stack: ItemStack, source: string): number;
    getLevelingSourceValue(stack: ItemStack, source: string): number;
    getLockComponent(stack: ItemStack, ability: string): LockComponent;
    getLockUnlocks(stack: ItemStack, ability: string): number;
    getRelativeStatValue(ability: string, stat: string, value: number, points: number): number;
    getRelicAttributeModifiers(stack: ItemStack): RelicAttributeModifier;
    getRelicExperience(stack: ItemStack): number;
    getRelicExperienceLeftForLevelUp(stack: ItemStack, level: number): number;
    getRelicLevel(stack: ItemStack): number;
    getRelicLevelFromExperience(experience: number): number;
    getRelicLevelingPoints(stack: ItemStack): number;
    getRelicLuck(stack: ItemStack): number;
    getRelicQuality(stack: ItemStack): number;
    getRerollPlayerExperienceCost(stack: ItemStack, ability: string): number;
    getResearchComponent(stack: ItemStack, ability: string): ResearchComponent;
    getResearchData(ability: string): ResearchData;
    getResearchHintPlayerExperienceCost(ability: string): number;
    getResearchLinks(stack: ItemStack, ability: string): Multimap<number, number>;
    getResetPlayerExperienceCost(stack: ItemStack, ability: string): number;
    getSlotModifiers(stack: ItemStack): RelicSlotModifier;
    getStatComponent(stack: ItemStack, ability: string, stat: string): StatComponent;
    getStatData(ability: string, stat: string): StatData;
    getStatInitialValue(stack: ItemStack, ability: string, stat: string): number;
    getStatQuality(stack: ItemStack, ability: string, stat: string): number;
    getStatValue(stack: ItemStack, ability: string, stat: string, points: number): number;
    getStatValue(stack: ItemStack, ability: string, stat: string): number;
    getStatValueByQuality(ability: string, stat: string, quality: number): number;
    getTotalRelicExperienceBetweenLevels(from: number, to: number): number;
    getTotalRelicExperienceForLevel(level: number): number;
    getUpgradePlayerExperienceCost(stack: ItemStack, ability: string): number;
    hasUnlockedAbility(stack: ItemStack): boolean;
    hasUnlockedUpgradeableAbility(stack: ItemStack): boolean;
    isAbilityEnabled(stack: ItemStack, ability: string): boolean;
    isAbilityFlawless(stack: ItemStack, ability: string): boolean;
    isAbilityMaxLevel(stack: ItemStack, ability: string): boolean;
    isAbilityMaxQuality(stack: ItemStack, ability: string): boolean;
    isAbilityOnCooldown(stack: ItemStack, ability: string): boolean;
    isAbilityRerollEnabled(stack: ItemStack, ability: string): boolean;
    isAbilityResearched(stack: ItemStack, ability: string): boolean;
    isAbilityResetEnabled(stack: ItemStack, ability: string): boolean;
    isAbilityTicking(stack: ItemStack, ability: string): boolean;
    isAbilityUnlocked(stack: ItemStack, ability: string): boolean;
    isAbilityUpgradeEnabled(stack: ItemStack, ability: string): boolean;
    isEnoughLevel(stack: ItemStack, ability: string): boolean;
    isLevelingSourceEnabled(stack: ItemStack, source: string): boolean;
    isLevelingSourceUnlocked(stack: ItemStack, source: string): boolean;
    isLockUnlocked(stack: ItemStack, ability: string): boolean;
    isRelicFlawless(stack: ItemStack): boolean;
    isRelicMaxLevel(stack: ItemStack): boolean;
    isRelicMaxQuality(stack: ItemStack): boolean;
    isSomethingWrongWithLevelingPoints(stack: ItemStack): boolean;
    mayPlayerReroll(player: Player, stack: ItemStack, ability: string): boolean;
    mayPlayerReset(player: Player, stack: ItemStack, ability: string): boolean;
    mayPlayerUpgrade(player: Player, stack: ItemStack, ability: string): boolean;
    mayReroll(stack: ItemStack, ability: string): boolean;
    mayResearch(stack: ItemStack, ability: string): boolean;
    mayReset(stack: ItemStack, ability: string): boolean;
    mayUnlock(stack: ItemStack, ability: string): boolean;
    mayUpgrade(stack: ItemStack, ability: string): boolean;
    randomizeAbilityStats(stack: ItemStack, ability: string, luck: number): AbilityComponent;
    randomizeStat(stack: ItemStack, ability: string, stat: string, quality: number): StatComponent;
    randomizeStat(stack: ItemStack, ability: string, stat: string): StatComponent;
    removeResearchLink(stack: ItemStack, ability: string, from: number, to: number): void;
    reroll(player: Player, stack: ItemStack, ability: string): boolean;
    reset(player: Player, stack: ItemStack, ability: string): boolean;
    set relicData(data: RelicData);
    setAbilitiesComponent(stack: ItemStack, component: AbilitiesComponent): void;
    setAbilityComponent(stack: ItemStack, ability: string, component: AbilityComponent): void;
    setAbilityCooldown(stack: ItemStack, ability: string, amount: number): void;
    setAbilityCooldownCap(stack: ItemStack, ability: string, amount: number): void;
    setAbilityExtenderComponent(stack: ItemStack, ability: string, component: AbilityExtenderComponent): void;
    setAbilityLevel(stack: ItemStack, ability: string, points: number): void;
    setAbilityResearched(stack: ItemStack, ability: string, researched: boolean): void;
    setAbilityTicking(stack: ItemStack, ability: string, ticking: boolean): void;
    setDataComponent(stack: ItemStack, component: DataComponent): void;
    setLevelingComponent(stack: ItemStack, component: LevelingComponent): void;
    setLockComponent(stack: ItemStack, ability: string, component: LockComponent): void;
    setLockUnlocks(stack: ItemStack, ability: string, unlocks: number): void;
    setRelicExperience(stack: ItemStack, experience: number): void;
    setRelicLevel(stack: ItemStack, level: number): void;
    setRelicLevelingPoints(stack: ItemStack, amount: number): void;
    setRelicLuck(stack: ItemStack, amount: number): void;
    setResearchComponent(stack: ItemStack, ability: string, component: ResearchComponent): void;
    setStatComponent(stack: ItemStack, ability: string, stat: string, component: StatComponent): void;
    setStatInitialValue(stack: ItemStack, ability: string, stat: string, value: number): void;
    spreadRelicExperience(entity: LivingEntity, stack: ItemStack, experience: number): void;
    spreadRelicExperience(entity: LivingEntity, stack: ItemStack, experience: number, percentage: number): void;
    testAbilityPredicate(player: Player, stack: ItemStack, ability: string, predicate: string): boolean;
    testAbilityPredicates(player: Player, stack: ItemStack, ability: string, type: PredicateType): boolean;
    testAbilityResearch(stack: ItemStack, ability: string): boolean;
    testAbilityResearchPercentage(stack: ItemStack, ability: string): number;
    tickActiveAbilitySelection(stack: ItemStack, player: Player, ability: string): void;
    upgrade(player: Player, stack: ItemStack, ability: string): boolean;
  }


  interface RelicItem extends ICurioItem, IRelicItem, ICreativeTabContent, ItemBase {}
  class RelicItem extends ICurioItem {
    constructor(properties: Properties);

    constructor();
    canEquip(slotContext: SlotContext, stack: ItemStack): boolean;
    canEquipFromUse(slotContext: SlotContext, stack: ItemStack): boolean;
    gatherCreativeTabContent(constructor: CreativeContentConstructor): void;
    get configRoute(): string;
    getAttributeModifiers(slotContext: SlotContext, id: ResourceLocation, stack: ItemStack): Multimap<Holder<Attribute>, AttributeModifier>;
    getAttributesTooltip(tooltips: Component[], context: TooltipContext, stack: ItemStack): Component[];
    shouldCauseReequipAnimation(oldStack: ItemStack, newStack: ItemStack, slotChanged: boolean): boolean;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.belt' {
  import { RelicItem, IRenderableCurio } from 'it.hurts.sskirillss.relics.items.relics.base';
  import { RelicData, RelicSlotModifier, RelicAttributeModifier } from 'it.hurts.sskirillss.relics.items.relics.base.data';
  import { SlotContext } from 'top.theillusivec4.curios.api';
  import { ItemStack } from 'net.minecraft.world.item';
  import { LayerDefinition } from 'net.minecraft.client.model.geom.builders';
  import { List } from 'java.util';
  import { ExperienceAddEvent } from 'it.hurts.sskirillss.relics.api.events.leveling';

  interface DrownedBeltItem extends IRenderableCurio, RelicItem {}
  class DrownedBeltItem extends IRenderableCurio {
    constructDefaultRelicData(): RelicData;
    constructLayerDefinition(): LayerDefinition;
    curioTick(slotContext: SlotContext, stack: ItemStack): void;
    getRelicAttributeModifiers(stack: ItemStack): RelicAttributeModifier;
    getSlotModifiers(stack: ItemStack): RelicSlotModifier;
    headParts(): string[];
    onUnequip(slotContext: SlotContext, newStack: ItemStack, stack: ItemStack): void;
  }


  interface HunterBeltItem extends IRenderableCurio, RelicItem {}
  class HunterBeltItem extends IRenderableCurio {
    constructDefaultRelicData(): RelicData;
    constructLayerDefinition(): LayerDefinition;
    getSlotModifiers(stack: ItemStack): RelicSlotModifier;
    headParts(): string[];
  }


  interface LeatherBeltItem extends IRenderableCurio, RelicItem {}
  class LeatherBeltItem extends IRenderableCurio {
    constructDefaultRelicData(): RelicData;
    constructLayerDefinition(): LayerDefinition;
    getSlotModifiers(stack: ItemStack): RelicSlotModifier;
    headParts(): string[];
    static onExperienceAdded(event: ExperienceAddEvent): void;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.belt.DrownedBeltItem' {
  import { LivingIncomingDamageEvent } from 'net.neoforged.neoforge.event.entity.living';
  import { Start, Stop } from 'LivingEntityUseItemEvent';

  class Events {
    static onEntityHurt(event: LivingIncomingDamageEvent): void;
    static onItemUseFinish(event: Stop): void;
    static onItemUseStart(event: Start): void;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.belt.HunterBeltItem' {
  import { LivingIncomingDamageEvent } from 'net.neoforged.neoforge.event.entity.living';

  class HunterBeltEvents {
    static onLivingDamage(event: LivingIncomingDamageEvent): void;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics' {
  import { RelicItem } from 'it.hurts.sskirillss.relics.items.relics.base';
  import { RelicData } from 'it.hurts.sskirillss.relics.items.relics.base.data';
  import { ItemStack, UseAnim } from 'net.minecraft.world.item';
  import { Level } from 'net.minecraft.world.level';
  import { Entity, LivingEntity } from 'net.minecraft.world.entity';
  import { InteractionResultHolder, InteractionHand } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { SlotContext } from 'top.theillusivec4.curios.api';
  import { CreativeContentConstructor } from 'it.hurts.sskirillss.relics.items.misc';
  import { FoodProperties } from 'net.minecraft.world.food';
  import { Optional } from 'java.util';
  import { TooltipComponent } from 'net.minecraft.world.inventory.tooltip';

  interface BlazingFlaskItem extends RelicItem {}
  class BlazingFlaskItem extends RelicItem {
    canEquipFromUse(slotContext: SlotContext, stack: ItemStack): boolean;
    constructDefaultRelicData(): RelicData;
    getFireAround(stack: ItemStack, level: Level): number;
    getFireAround(stack: ItemStack, center: Vec3, level: Level): number;
    inventoryTick(stack: ItemStack, level: Level, entity: Entity, slot: number, isSelected: boolean): void;
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface InfiniteHamItem extends RelicItem {}
  class InfiniteHamItem extends RelicItem {
    constructor();
    addPieces(stack: ItemStack, amount: number): void;
    canEquipFromUse(slotContext: SlotContext, stack: ItemStack): boolean;
    constructDefaultRelicData(): RelicData;
    finishUsingItem(stack: ItemStack, level: Level, entity: LivingEntity): ItemStack;
    gatherCreativeTabContent(constructor: CreativeContentConstructor): void;
    get maxPieces(): number;
    getFoodProperties(stack: ItemStack, entity: LivingEntity): FoodProperties;
    getPieces(stack: ItemStack): number;
    getTooltipImage(stack: ItemStack): Optional<TooltipComponent>;
    getUseAnimation(stack: ItemStack): UseAnim;
    getUseDuration(stack: ItemStack, entity: LivingEntity): number;
    inventoryTick(stack: ItemStack, level: Level, entityIn: Entity, itemSlot: number, isSelected: boolean): void;
    isFoil(stack: ItemStack): boolean;
    setPieces(stack: ItemStack, amount: number): void;
    use(world: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface MagicMirrorItem extends RelicItem {}
  class MagicMirrorItem extends RelicItem {
    canEquipFromUse(slotContext: SlotContext, stack: ItemStack): boolean;
    constructDefaultRelicData(): RelicData;
    finishUsingItem(stack: ItemStack, world: Level, entity: LivingEntity): ItemStack;
    getUseAnimation(pStack: ItemStack): UseAnim;
    getUseDuration(pStack: ItemStack, entity: LivingEntity): number;
    onUseTick(level: Level, entity: LivingEntity, stack: ItemStack, count: number): void;
    use(worldIn: Level, playerIn: Player, handIn: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface ShadowGlaiveItem extends RelicItem {}
  class ShadowGlaiveItem extends RelicItem {
    constructDefaultRelicData(): RelicData;
  }


  interface SpaceDissectorItem extends RelicItem {}
  class SpaceDissectorItem extends RelicItem {
    canEquipFromUse(slotContext: SlotContext, stack: ItemStack): boolean;
    constructDefaultRelicData(): RelicData;
    getUseAnimation(pStack: ItemStack): UseAnim;
    getUseDuration(pStack: ItemStack, entity: LivingEntity): number;
    onUseTick(level: Level, entity: LivingEntity, stack: ItemStack, count: number): void;
    releaseUsing(stack: ItemStack, world: Level, pLivingEntity: LivingEntity, pTimeCharged: number): void;
    use(world: Level, player: Player, handIn: InteractionHand): InteractionResultHolder<ItemStack>;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.charm' {
  import { RelicItem } from 'it.hurts.sskirillss.relics.items.relics.base';
  import { RelicData } from 'it.hurts.sskirillss.relics.items.relics.base.data';
  import { ItemStack } from 'net.minecraft.world.item';
  import { SlotContext } from 'top.theillusivec4.curios.api';

  interface SporeSackItem extends RelicItem {}
  class SporeSackItem extends RelicItem {
    addCharges(stack: ItemStack, charges: number): void;
    constructDefaultRelicData(): RelicData;
    curioTick(slotContext: SlotContext, stack: ItemStack): void;
    getCharges(stack: ItemStack): number;
    isToggled(stack: ItemStack): boolean;
    setCharges(stack: ItemStack, charges: number): void;
    setToggled(stack: ItemStack, isToggled: boolean): void;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.feet' {
  import { RelicItem, IRenderableCurio } from 'it.hurts.sskirillss.relics.items.relics.base';
  import { RelicData, RelicAttributeModifier } from 'it.hurts.sskirillss.relics.items.relics.base.data';
  import { SlotContext } from 'top.theillusivec4.curios.api';
  import { ItemStack } from 'net.minecraft.world.item';
  import { CurioModel } from 'it.hurts.sskirillss.relics.client.models.items';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { RenderLayerParent } from 'net.minecraft.client.renderer.entity';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { LivingEntity, Entity } from 'net.minecraft.world.entity';
  import { EntityModel } from 'net.minecraft.client.model';
  import { LayerDefinition } from 'net.minecraft.client.model.geom.builders';
  import { List } from 'java.util';
  import { Level } from 'net.minecraft.world.level';
  import { FluidCollisionEvent } from 'it.hurts.sskirillss.relics.api.events.common';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CastType, CastStage } from 'it.hurts.sskirillss.relics.items.relics.base.data.cast.misc';
  import { LivingIncomingDamageEvent } from 'net.neoforged.neoforge.event.entity.living';

  interface AmphibianBootItem extends IRenderableCurio, RelicItem {}
  class AmphibianBootItem extends IRenderableCurio {
    bodyParts(): string[];
    constructDefaultRelicData(): RelicData;
    constructLayerDefinition(): LayerDefinition;
    curioTick(slotContext: SlotContext, stack: ItemStack): void;
    getModel(stack: ItemStack): CurioModel;
    onUnequip(slotContext: SlotContext, newStack: ItemStack, stack: ItemStack): void;
    render<T extends LivingEntity, M extends EntityModel<T>>(stack: ItemStack, slotContext: SlotContext, matrixStack: PoseStack, renderLayerParent: RenderLayerParent<T, M>, renderTypeBuffer: MultiBufferSource, light: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface AquaWalkerItem extends IRenderableCurio, RelicItem {}
  class AquaWalkerItem extends IRenderableCurio {
    bodyParts(): string[];
    constructDefaultRelicData(): RelicData;
    constructLayerDefinition(): LayerDefinition;
    getModel(stack: ItemStack): CurioModel;
    inventoryTick(stack: ItemStack, level: Level, entity: Entity, slot: number, isSelected: boolean): void;
    static onFluidCollide(event: FluidCollisionEvent): void;
    render<T extends LivingEntity, M extends EntityModel<T>>(stack: ItemStack, slotContext: SlotContext, matrixStack: PoseStack, renderLayerParent: RenderLayerParent<T, M>, renderTypeBuffer: MultiBufferSource, light: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface IceBreakerItem extends RelicItem {}
  class IceBreakerItem extends RelicItem {
    castActiveAbility(stack: ItemStack, player: Player, ability: string, type: CastType, stage: CastStage): void;
    constructDefaultRelicData(): RelicData;
    curioTick(slotContext: SlotContext, stack: ItemStack): void;
    getRelicAttributeModifiers(stack: ItemStack): RelicAttributeModifier;
    onUnequip(slotContext: SlotContext, newStack: ItemStack, stack: ItemStack): void;
  }


  interface IceSkatesItem extends RelicItem {}
  class IceSkatesItem extends RelicItem {
    constructDefaultRelicData(): RelicData;
    curioTick(slotContext: SlotContext, stack: ItemStack): void;
    onUnequip(slotContext: SlotContext, newStack: ItemStack, stack: ItemStack): void;
  }


  interface MagmaWalkerItem extends IRenderableCurio, RelicItem {}
  class MagmaWalkerItem extends IRenderableCurio {
    bodyParts(): string[];
    constructDefaultRelicData(): RelicData;
    constructLayerDefinition(): LayerDefinition;
    getModel(stack: ItemStack): CurioModel;
    inventoryTick(stack: ItemStack, level: Level, entity: Entity, slot: number, isSelected: boolean): void;
    static onFluidCollide(event: FluidCollisionEvent): void;
    static onLivingAttack(event: LivingIncomingDamageEvent): void;
    render<T extends LivingEntity, M extends EntityModel<T>>(stack: ItemStack, slotContext: SlotContext, matrixStack: PoseStack, renderLayerParent: RenderLayerParent<T, M>, renderTypeBuffer: MultiBufferSource, light: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface PhantomBootItem extends IRenderableCurio, RelicItem {}
  class PhantomBootItem extends IRenderableCurio {
    addTime(stack: ItemStack, time: number): void;
    bodyParts(): string[];
    castActiveAbility(stack: ItemStack, player: Player, ability: string, type: CastType, stage: CastStage): void;
    constructDefaultRelicData(): RelicData;
    constructLayerDefinition(): LayerDefinition;
    curioTick(slotContext: SlotContext, stack: ItemStack): void;
    getMaxTime(stack: ItemStack): number;
    getModel(stack: ItemStack): CurioModel;
    getTime(stack: ItemStack): number;
    isToggled(stack: ItemStack): boolean;
    render<T extends LivingEntity, M extends EntityModel<T>>(stack: ItemStack, slotContext: SlotContext, matrixStack: PoseStack, renderLayerParent: RenderLayerParent<T, M>, renderTypeBuffer: MultiBufferSource, light: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
    setTime(stack: ItemStack, time: number): void;
    setToggled(stack: ItemStack, toggled: boolean): void;
  }


  interface RollerSkatesItem extends RelicItem {}
  class RollerSkatesItem extends RelicItem {
    constructDefaultRelicData(): RelicData;
    curioTick(slotContext: SlotContext, stack: ItemStack): void;
    onUnequip(slotContext: SlotContext, newStack: ItemStack, stack: ItemStack): void;
  }


  interface SpringyBootItem extends IRenderableCurio, RelicItem {}
  class SpringyBootItem extends IRenderableCurio {
    bodyParts(): string[];
    castActiveAbility(stack: ItemStack, player: Player, ability: string, type: CastType, stage: CastStage): void;
    constructDefaultRelicData(): RelicData;
    constructLayerDefinition(): LayerDefinition;
    getModel(stack: ItemStack): CurioModel;
    render<T extends LivingEntity, M extends EntityModel<T>>(stack: ItemStack, slotContext: SlotContext, matrixStack: PoseStack, renderLayerParent: RenderLayerParent<T, M>, renderTypeBuffer: MultiBufferSource, light: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.feet.AmphibianBootItem' {
  import { LivingBreatheEvent } from 'net.neoforged.neoforge.event.entity.living';

  class Events {
    static onLivingBreath(event: LivingBreatheEvent): void;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.feet.IceBreakerItem' {
  import { LivingSlippingEvent } from 'it.hurts.sskirillss.relics.api.events.common';

  class Events {
    static onLivingSlipping(event: LivingSlippingEvent): void;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.feet.RollerSkatesItem' {
  import { LivingSlippingEvent, EntityBlockSpeedFactorEvent } from 'it.hurts.sskirillss.relics.api.events.common';

  class Events {
    static onLivingSlipping(event: LivingSlippingEvent): void;
    static onSpeedFactor(event: EntityBlockSpeedFactorEvent): void;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.hands' {
  import { RelicItem, IRenderableCurio } from 'it.hurts.sskirillss.relics.items.relics.base';
  import { RelicData } from 'it.hurts.sskirillss.relics.items.relics.base.data';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CastType, CastStage } from 'it.hurts.sskirillss.relics.items.relics.base.data.cast.misc';
  import { CurioModel } from 'it.hurts.sskirillss.relics.client.models.items';
  import { SlotContext } from 'top.theillusivec4.curios.api';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { RenderLayerParent } from 'net.minecraft.client.renderer.entity';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { EntityModel } from 'net.minecraft.client.model';
  import { LayerDefinition } from 'net.minecraft.client.model.geom.builders';
  import { List } from 'java.util';

  interface EnderHandItem extends IRenderableCurio, RelicItem {}
  class EnderHandItem extends IRenderableCurio {
    bodyParts(): string[];
    castActiveAbility(stack: ItemStack, player: Player, ability: string, type: CastType, stage: CastStage): void;
    constructDefaultRelicData(): RelicData;
    constructLayerDefinition(): LayerDefinition;
    getModel(stack: ItemStack): CurioModel;
    render<T extends LivingEntity, M extends EntityModel<T>>(stack: ItemStack, slotContext: SlotContext, matrixStack: PoseStack, renderLayerParent: RenderLayerParent<T, M>, renderTypeBuffer: MultiBufferSource, light: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface RageGloveItem extends IRenderableCurio, RelicItem {}
  class RageGloveItem extends IRenderableCurio {
    bodyParts(): string[];
    castActiveAbility(stack: ItemStack, player: Player, ability: string, type: CastType, stage: CastStage): void;
    constructDefaultRelicData(): RelicData;
    constructLayerDefinition(): LayerDefinition;
    curioTick(slotContext: SlotContext, stack: ItemStack): void;
    getModel(stack: ItemStack): CurioModel;
    onUnequip(slotContext: SlotContext, newStack: ItemStack, stack: ItemStack): void;
    render<T extends LivingEntity, M extends EntityModel<T>>(stack: ItemStack, slotContext: SlotContext, matrixStack: PoseStack, renderLayerParent: RenderLayerParent<T, M>, renderTypeBuffer: MultiBufferSource, light: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface WoolMittenItem extends RelicItem {}
  class WoolMittenItem extends RelicItem {
    constructDefaultRelicData(): RelicData;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.hands.RageGloveItem' {
  import { LivingIncomingDamageEvent } from 'net.neoforged.neoforge.event.entity.living';

  class Events {
    static onLivingHurt(event: LivingIncomingDamageEvent): void;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.hands.WoolMittenItem' {
  import { RightClickBlock } from 'PlayerInteractEvent';

  class Events {
    static onBlockClick(event: RightClickBlock): void;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.InfiniteHamItem' {
  import { LivingIncomingDamageEvent } from 'net.neoforged.neoforge.event.entity.living';
  import { ContainerSlotClickEvent } from 'it.hurts.sskirillss.relics.api.events.common';

  class InfinityHamEvents {
    static onLivingDamage(event: LivingIncomingDamageEvent): void;
    static onSlotClick(event: ContainerSlotClickEvent): void;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.MagicMirrorItem' {
  import { LivingIncomingDamageEvent } from 'net.neoforged.neoforge.event.entity.living';
  import { ComputeFovModifierEvent } from 'net.neoforged.neoforge.client.event';

  class ServerEvents {
    static onLivingHurt(event: LivingIncomingDamageEvent): void;
  }


  class ClientEvents {
    static onFovUpdate(event: ComputeFovModifierEvent): void;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.necklace' {
  import { RelicItem, IRenderableCurio } from 'it.hurts.sskirillss.relics.items.relics.base';
  import { RelicData } from 'it.hurts.sskirillss.relics.items.relics.base.data';
  import { Mode } from 'it.hurts.sskirillss.relics.items.relics.necklace.HolyLocketItem';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CastType, CastStage } from 'it.hurts.sskirillss.relics.items.relics.base.data.cast.misc';
  import { SlotContext } from 'top.theillusivec4.curios.api';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { RenderLayerParent } from 'net.minecraft.client.renderer.entity';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { EntityModel } from 'net.minecraft.client.model';
  import { LayerDefinition } from 'net.minecraft.client.model.geom.builders';
  import { List } from 'java.util';

  interface HolyLocketItem extends RelicItem {}
  class HolyLocketItem extends RelicItem {
    castActiveAbility(stack: ItemStack, player: Player, ability: string, type: CastType, stage: CastStage): void;
    constructDefaultRelicData(): RelicData;
    cycleMode(stack: ItemStack, steps: number): void;
    getMode(stack: ItemStack): Mode;
    setMode(stack: ItemStack, mode: Mode): void;
  }


  interface JellyfishNecklaceItem extends IRenderableCurio, RelicItem {}
  class JellyfishNecklaceItem extends IRenderableCurio {
    constructDefaultRelicData(): RelicData;
    constructLayerDefinition(): LayerDefinition;
    curioTick(slotContext: SlotContext, stack: ItemStack): void;
    headParts(): string[];
    onUnequip(slotContext: SlotContext, newStack: ItemStack, stack: ItemStack): void;
    render<T extends LivingEntity, M extends EntityModel<T>>(stack: ItemStack, slotContext: SlotContext, matrixStack: PoseStack, renderLayerParent: RenderLayerParent<T, M>, renderTypeBuffer: MultiBufferSource, light: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface ReflectionNecklaceItem extends IRenderableCurio, RelicItem {}
  class ReflectionNecklaceItem extends IRenderableCurio {
    constructDefaultRelicData(): RelicData;
    constructLayerDefinition(): LayerDefinition;
    curioTick(slotContext: SlotContext, stack: ItemStack): void;
    headParts(): string[];
    render<T extends LivingEntity, M extends EntityModel<T>>(stack: ItemStack, slotContext: SlotContext, matrixStack: PoseStack, renderLayerParent: RenderLayerParent<T, M>, renderTypeBuffer: MultiBufferSource, light: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.necklace.HolyLocketItem' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { LivingDeathEvent, LivingHealEvent, LivingIncomingDamageEvent } from 'net.neoforged.neoforge.event.entity.living';

  interface Mode extends Enum<Mode> {}
  class Mode extends Enum<Mode> {
    static readonly HOLINESS: Mode;
    static readonly WICKEDNESS: Mode;
    static byIndex(index: number): Mode;
    cycle(steps: number): Mode;
    get index(): number;
    static valueOf(name: string): Mode;
    static values(): Mode[];
  }


  class HolyLocketEvents {
    static onLivingDamage(event: LivingIncomingDamageEvent): void;
    static onLivingDeath(event: LivingDeathEvent): void;
    static onLivingHeal(event: LivingHealEvent): void;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.necklace.ReflectionNecklaceItem' {
  import { LivingIncomingDamageEvent } from 'net.neoforged.neoforge.event.entity.living';

  class ReflectionNecklaceServerEvents {
    static onEntityHurt(event: LivingIncomingDamageEvent): void;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.ring' {
  import { RelicItem } from 'it.hurts.sskirillss.relics.items.relics.base';
  import { RelicData } from 'it.hurts.sskirillss.relics.items.relics.base.data';
  import { SlotContext } from 'top.theillusivec4.curios.api';
  import { ItemStack } from 'net.minecraft.world.item';
  import { BlockPos } from 'net.minecraft.core';
  import { Player } from 'net.minecraft.world.entity.player';

  interface BastionRingItem extends RelicItem {}
  class BastionRingItem extends RelicItem {
    constructDefaultRelicData(): RelicData;
    curioTick(slotContext: SlotContext, stack: ItemStack): void;
    makesPiglinsNeutral(slotContext: SlotContext, stack: ItemStack): boolean;
  }


  interface ChorusInhibitorItem extends RelicItem {}
  class ChorusInhibitorItem extends RelicItem {
    constructDefaultRelicData(): RelicData;
    curioTick(slotContext: SlotContext, stack: ItemStack): void;
    getEyesPos(player: Player, stack: ItemStack): BlockPos;
  }


  interface LeafyRingItem extends RelicItem {}
  class LeafyRingItem extends RelicItem {
    addCurrentProgress(stack: ItemStack, progress: number): void;
    constructDefaultRelicData(): RelicData;
    curioTick(slotContext: SlotContext, stack: ItemStack): void;
    get maxProgress(): number;
    getCurrentProgress(stack: ItemStack): number;
    isHiding(stack: ItemStack): boolean;
    setCurrentProgress(stack: ItemStack, progress: number): void;
    setHiding(stack: ItemStack, hiding: boolean): void;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.ring.BastionRingItem' {
  import { LivingDeathEvent } from 'net.neoforged.neoforge.event.entity.living';

  class Events {
    static onLivingDeath(event: LivingDeathEvent): void;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.ring.ChorusInhibitorItem' {
  import { ChorusFruit } from 'EntityTeleportEvent';

  class Events {
    static onChorusTeleport(event: ChorusFruit): void;
  }

}

declare module 'it.hurts.sskirillss.relics.items.relics.ShadowGlaiveItem' {
  import { Post } from 'LivingDamageEvent';

  class ShadowGlaiveEvents {
    static onLivingHurt(event: Post): void;
  }

}

declare module 'it.hurts.sskirillss.relics.level' {
  import { LootModifier, IGlobalLootModifier } from 'net.neoforged.neoforge.common.loot';
  import { Supplier } from 'java.util.function';
  import { List } from 'java.util';
  import { LootItemCondition } from 'net.minecraft.world.level.storage.loot.predicates';
  import { MapCodec } from 'com.mojang.serialization';
  import { IRelicItem } from 'it.hurts.sskirillss.relics.items.relics.base';

  interface RelicLootModifier extends LootModifier {}
  class RelicLootModifier extends LootModifier {
    static readonly CODEC: Supplier;
    static readonly LOOT_ENTRIES: List;
    constructor(conditionsIn: LootItemCondition[]);
    codec(): MapCodec<IGlobalLootModifier>;
    static processRelicCache(relic: IRelicItem): void;
  }

}

declare module 'it.hurts.sskirillss.relics.level.RelicLootModifier' {
  import { List } from 'java.util';
  import { Item } from 'net.minecraft.world.item';
  import { ServerStartedEvent } from 'net.neoforged.neoforge.event.server';

  class LootEntryCache {
    constructor(dimensions: MatcherEntry[], biomes: MatcherEntry[], tables: MatcherEntry[], weight: number, item: Item);
    equals(o: any): boolean;
    get biomes(): MatcherEntry[];
    get dimensions(): MatcherEntry[];
    get item(): Item;
    get tables(): MatcherEntry[];
    get weight(): number;
    hashCode(): number;
    set biomes(biomes: MatcherEntry[]);
    set dimensions(dimensions: MatcherEntry[]);
    set item(item: Item);
    set tables(tables: MatcherEntry[]);
    set weight(weight: number);
    toString(): string;
  }


  class Events {
    static onServerStarted(event: ServerStartedEvent): void;
  }

}

declare module 'it.hurts.sskirillss.relics.mixin' {
  import { Level, BlockGetter } from 'net.minecraft.world.level';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockPos } from 'net.minecraft.core';
  import { Entity, LivingEntity } from 'net.minecraft.world.entity';
  import { CallbackInfo, CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Boolean, Float, Double, Integer } from 'java.lang';
  import { Font, GuiGraphics } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { ClientTooltipComponent, ClientTooltipPositioner } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { Pre } from 'RenderTooltipEvent';
  import { Vector2ic } from 'org.joml';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { TooltipContext } from 'Item';
  import { Component } from 'net.minecraft.network.chat';

  class AbstractChestedHorseMixin {
  }


  class AbstractContainerMenuMixin {
  }


  class BlockMixin {
    onEntityFall(level: Level, state: BlockState, pos: BlockPos, entity: Entity, fallDistance: number, ci: CallbackInfo): void;
    onEntityFall(getter: BlockGetter, entity: Entity, ci: CallbackInfo): void;
  }


  class CameraMixin {
    onRotationUpdate(yaw: number, pitch: number, ci: CallbackInfo): void;
  }


  class EnderManMixin {
  }


  class EntityMixin {
    fluidCollision(original: Vec3): Vec3;
    getBlockSpeedFactor(cir: CallbackInfoReturnable<number>): void;
    setWet(info: CallbackInfoReturnable<boolean>): void;
  }


  class GameDataMixin {
  }


  class GuiGraphicsMixin {
    onTooltipRender(font: Font, tooltip: ClientTooltipComponent[], x: number, y: number, positioner: ClientTooltipPositioner, info: CallbackInfo, event: Pre, width: number, height: number, postWidth: number, postHeight: number, postPos: Vector2ic): void;
    renderItem(entity: LivingEntity, level: Level, stack: ItemStack, x: number, y: number, seed: number, guiOffset: number, ci: CallbackInfo): void;
    renderItemDecorations(font: Font, stack: ItemStack, x: number, y: number, text: string, ci: CallbackInfo): void;
  }


  class ItemMixin {
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flag: TooltipFlag, ci: CallbackInfo): void;
    inventoryTick(stack: ItemStack, level: Level, entity: Entity, slot: number, isSelected: boolean, ci: CallbackInfo): void;
    onVerifyComponentsAfterLoad(stack: ItemStack, ci: CallbackInfo): void;
  }


  class KeyboardHandlerMixin {
    onKeyPress(windowPointer: number, key: number, scanCode: number, action: number, modifiers: number, ci: CallbackInfo): void;
  }


  class LivingEntityMixin {
  }


  class MouseHandlerMixin {
    onKeyPress(ci: CallbackInfo): void;
  }


  class ParticleEngineMixin {
  }


  class PiglinAiMixin {
  }


  class PowderSnowBlockMixin {
    boilSnow(state: BlockState, level: Level, pos: BlockPos, entity: Entity, ci: CallbackInfo): void;
  }


  class ScreenMixin {
    render(pGuiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number, ci: CallbackInfo): void;
    tick(ci: CallbackInfo): void;
  }


  class WindowMixin {
    getGuiScale(cir: CallbackInfoReturnable<number>): void;
    getGuiScaledHeight(cir: CallbackInfoReturnable<number>): void;
    getGuiScaledWidth(cir: CallbackInfoReturnable<number>): void;
  }

}

declare module 'it.hurts.sskirillss.relics.mixin.compat.sophisticatedbackpacks' {
  import { Entity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';

  class FeedingUpgradeWrapperMixin {
    tick(entity: Entity, level: Level, pos: BlockPos, ci: CallbackInfo): void;
  }


  class UpgradeWrapperBaseAccessor {
    get storageWrapper(): IStorageWrapper;
  }

}

declare module 'it.hurts.sskirillss.relics.network' {
  import { RegisterPayloadHandlersEvent } from 'net.neoforged.neoforge.network.event';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Entity } from 'net.minecraft.world.entity';

  class NetworkHandler {
    static onRegisterPayloadHandler(event: RegisterPayloadHandlersEvent): void;
    static sendToClient<MSG extends CustomPacketPayload>(message: MSG, player: ServerPlayer): void;
    static sendToClientsTrackingEntity<MSG extends CustomPacketPayload>(message: MSG, entity: Entity): void;
    static sendToClientsTrackingEntityAndSelf<MSG extends CustomPacketPayload>(message: MSG, entity: Entity): void;
    static sendToServer<MSG extends CustomPacketPayload>(message: MSG): void;
  }

}

declare module 'it.hurts.sskirillss.relics.network.packets.abilities' {
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { CastType, CastStage } from 'it.hurts.sskirillss.relics.items.relics.base.data.cast.misc';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { IPayloadContext } from 'net.neoforged.neoforge.network.handling';

  interface SpellCastPacket extends CustomPacketPayload {}
  class SpellCastPacket extends CustomPacketPayload {
    static readonly TYPE: Type;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(type: CastType, stage: CastStage, ability: CompoundTag);
    equals(o: any): boolean;
    get ability(): CompoundTag;
    get stage(): CastStage;
    getType(): CastType;
    handle(ctx: IPayloadContext): void;
    hashCode(): number;
    toString(): string;
    type(): Type<CustomPacketPayload>;
  }

}

declare module 'it.hurts.sskirillss.relics.network.packets.capability' {
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { IPayloadContext } from 'net.neoforged.neoforge.network.handling';

  interface CapabilitySyncPacket extends CustomPacketPayload {}
  class CapabilitySyncPacket extends CustomPacketPayload {
    static readonly TYPE: Type;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(data: CompoundTag);
    equals(o: any): boolean;
    get data(): CompoundTag;
    handle(ctx: IPayloadContext): boolean;
    hashCode(): number;
    toString(): string;
    type(): Type<CustomPacketPayload>;
  }

}

declare module 'it.hurts.sskirillss.relics.network.packets.leveling' {
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { IPayloadContext } from 'net.neoforged.neoforge.network.handling';
  import { Operation } from 'it.hurts.sskirillss.relics.network.packets.leveling.PacketRelicTweak';

  interface FixLevelingPoints extends CustomPacketPayload {}
  class FixLevelingPoints extends CustomPacketPayload {
    static readonly TYPE: Type;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(container: number, slot: number);
    equals(o: any): boolean;
    get container(): number;
    get slot(): number;
    handle(ctx: IPayloadContext): void;
    hashCode(): number;
    toString(): string;
    type(): Type<CustomPacketPayload>;
  }


  interface PacketRelicTweak extends CustomPacketPayload {}
  class PacketRelicTweak extends CustomPacketPayload {
    static readonly TYPE: Type;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(container: number, slot: number, ability: string, operation: Operation);

    constructor(container: number, slot: number, ability: string, operation: Operation, withShift: boolean);
    equals(o: any): boolean;
    get ability(): string;
    get container(): number;
    get operation(): Operation;
    get slot(): number;
    handle(ctx: IPayloadContext): void;
    hashCode(): number;
    isWithShift(): boolean;
    toString(): string;
    type(): Type<CustomPacketPayload>;
  }

}

declare module 'it.hurts.sskirillss.relics.network.packets.leveling.PacketRelicTweak' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Operation extends Enum<Operation> {}
  class Operation extends Enum<Operation> {
    static readonly RESET: Operation;
    static readonly UPGRADE: Operation;
    static readonly REROLL: Operation;
    get id(): number;
    static valueOf(name: string): Operation;
    static values(): Operation[];
  }

}

declare module 'it.hurts.sskirillss.relics.network.packets.lock' {
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { IPayloadContext } from 'net.neoforged.neoforge.network.handling';

  interface PacketAbilityUnlock extends CustomPacketPayload {}
  class PacketAbilityUnlock extends CustomPacketPayload {
    static readonly TYPE: Type;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(container: number, slot: number, ability: string, unlocks: number);
    equals(o: any): boolean;
    get ability(): string;
    get container(): number;
    get slot(): number;
    get unlocks(): number;
    handle(ctx: IPayloadContext): void;
    hashCode(): number;
    toString(): string;
    type(): Type<CustomPacketPayload>;
  }

}

declare module 'it.hurts.sskirillss.relics.network.packets' {
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IPayloadContext } from 'net.neoforged.neoforge.network.handling';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Action } from 'it.hurts.sskirillss.relics.network.packets.PacketSyncEntityEffects';

  interface PacketItemActivation extends CustomPacketPayload {}
  class PacketItemActivation extends CustomPacketPayload {
    static readonly TYPE: Type;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(stack: ItemStack);
    equals(o: any): boolean;
    get stack(): ItemStack;
    handle(ctx: IPayloadContext): void;
    hashCode(): number;
    toString(): string;
    type(): Type<CustomPacketPayload>;
  }


  interface PacketPlayerMotion extends CustomPacketPayload {}
  class PacketPlayerMotion extends CustomPacketPayload {
    static readonly TYPE: Type;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(motionX: number, motionY: number, motionZ: number);
    equals(o: any): boolean;
    get motionX(): number;
    get motionY(): number;
    get motionZ(): number;
    handle(ctx: IPayloadContext): void;
    hashCode(): number;
    toString(): string;
    type(): Type<CustomPacketPayload>;
  }


  interface PacketSyncEntityEffects extends CustomPacketPayload {}
  class PacketSyncEntityEffects extends CustomPacketPayload {
    static readonly TYPE: Type;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(data: CompoundTag, action: Action, entity: number);
    equals(o: any): boolean;
    get action(): Action;
    get data(): CompoundTag;
    get entity(): number;
    handle(ctx: IPayloadContext): void;
    hashCode(): number;
    toString(): string;
    type(): Type<CustomPacketPayload>;
  }

}

declare module 'it.hurts.sskirillss.relics.network.packets.PacketSyncEntityEffects' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Action extends Enum<Action> {}
  class Action extends Enum<Action> {
    static readonly ADD: Action;
    static readonly REMOVE: Action;
    static readonly UPDATE: Action;
    get id(): number;
    static valueOf(name: string): Action;
    static values(): Action[];
  }

}

declare module 'it.hurts.sskirillss.relics.network.packets.research' {
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Operation } from 'it.hurts.sskirillss.relics.network.packets.research.PacketManageLink';
  import { IPayloadContext } from 'net.neoforged.neoforge.network.handling';
  import { ItemStack } from 'net.minecraft.world.item';

  interface PacketManageLink extends CustomPacketPayload {}
  class PacketManageLink extends CustomPacketPayload {
    static readonly TYPE: Type;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(container: number, slot: number, ability: string, operation: Operation, from: number, to: number);
    equals(o: any): boolean;
    get ability(): string;
    get container(): number;
    get from(): number;
    get operation(): Operation;
    get slot(): number;
    get to(): number;
    handle(ctx: IPayloadContext): void;
    hashCode(): number;
    toString(): string;
    type(): Type<CustomPacketPayload>;
  }


  interface PacketResearchHint extends CustomPacketPayload {}
  class PacketResearchHint extends CustomPacketPayload {
    static readonly TYPE: Type;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(container: number, slot: number, ability: string, amount: number);
    equals(o: any): boolean;
    get ability(): string;
    get amount(): number;
    get container(): number;
    get slot(): number;
    handle(ctx: IPayloadContext): void;
    hashCode(): number;
    research(stack: ItemStack, amount: number): void;
    toString(): string;
    type(): Type<CustomPacketPayload>;
  }

}

declare module 'it.hurts.sskirillss.relics.network.packets.research.PacketManageLink' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Operation extends Enum<Operation> {}
  class Operation extends Enum<Operation> {
    static readonly ADD: Operation;
    static readonly REMOVE: Operation;
    get id(): number;
    static valueOf(name: string): Operation;
    static values(): Operation[];
  }

}

declare module 'it.hurts.sskirillss.relics.network.packets.sync' {
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { IPayloadContext } from 'net.neoforged.neoforge.network.handling';

  interface S2CEntityMotionPacket extends CustomPacketPayload {}
  class S2CEntityMotionPacket extends CustomPacketPayload {
    static readonly TYPE: Type;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(id: number, motion: Vec3);

    constructor(id: number, x: number, y: number, z: number);
    equals(o: any): boolean;
    get id(): number;
    get x(): number;
    get y(): number;
    get z(): number;
    handle(ctx: IPayloadContext): void;
    hashCode(): number;
    toString(): string;
    type(): Type<CustomPacketPayload>;
  }


  interface S2CEntityTargetPacket extends CustomPacketPayload {}
  class S2CEntityTargetPacket extends CustomPacketPayload {
    static readonly TYPE: Type;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(sourceId: number, targetId: number);
    equals(o: any): boolean;
    get sourceId(): number;
    get targetId(): number;
    handle(ctx: IPayloadContext): void;
    hashCode(): number;
    toString(): string;
    type(): Type<CustomPacketPayload>;
  }

}

declare module 'it.hurts.sskirillss.relics' {
  import { Logger } from 'org.apache.logging.log4j';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';

  class Relics {
    static readonly LOGGER: Logger;
    constructor(bus: IEventBus, container: ModContainer);
  }

}

declare module 'it.hurts.sskirillss.relics.system.casts.abilities' {
  import { Map } from 'java.util';
  import { Boolean } from 'java.lang';
  import { SlotReference } from 'it.hurts.sskirillss.relics.system.casts.slots.base';
  import { CompoundTag } from 'net.minecraft.nbt';

  class AbilityCache {
    constructor();

    constructor(predicates: Map<string, boolean>, iconShakeDelta: number);
    equals(o: any): boolean;
    get iconShakeDelta(): number;
    get predicates(): Map<string, boolean>;
    hashCode(): number;
    set iconShakeDelta(iconShakeDelta: number);
    set predicates(predicates: Map<string, boolean>);
    toString(): string;
  }


  class AbilityReference {
    constructor();

    constructor(id: string, slot: SlotReference);
    deserializeNBT(tag: CompoundTag): AbilityReference;
    equals(o: any): boolean;
    get id(): string;
    get slot(): SlotReference;
    hashCode(): number;
    serializeNBT(): CompoundTag;
    set id(id: string);
    set slot(slot: SlotReference);
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.system.casts.handlers' {
  import { LinkedHashMap } from 'java.util';
  import { Post } from 'PlayerTickEvent';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class CacheHandler {
    static readonly REFERENCES: LinkedHashMap;
    static onPlayerTick(event: Post): void;
  }


  class HUDRenderHandler {
    static readonly CARD_FRAME_ACTIVE: ResourceLocation;
    static readonly CARD_FRAME_INACTIVE: ResourceLocation;
    static readonly CARD_POINTER_ACTIVE: ResourceLocation;
    static readonly CARD_POINTER_INACTIVE: ResourceLocation;
    static readonly ARROW_RIGHT: ResourceLocation;
    static readonly ARROW_LEFT: ResourceLocation;
    static readonly ARROW_RIGHT_OUTLINE: ResourceLocation;
    static readonly ARROW_LEFT_OUTLINE: ResourceLocation;
    static readonly STATE_TOGGLEABLE: ResourceLocation;
    static readonly STATE_CYCLICAL: ResourceLocation;
    static render(guiGraphics: GuiGraphics, partialTicks: number): void;
  }

}

declare module 'it.hurts.sskirillss.relics.system.casts.handlers.HUDRenderHandler' {
  import { Pre } from 'InputEvent.MouseButton';
  import { Post } from 'PlayerTickEvent';
  import { MouseScrollingEvent } from 'InputEvent';

  class CastEvents {
    static onKeyPressed(event: Pre): void;
    static onPlayerTick(event: Post): void;
  }


  class GeneralEvents {
    static onMouseScroll(event: MouseScrollingEvent): void;
    static onPlayerTick(event: Post): void;
  }

}

declare module 'it.hurts.sskirillss.relics.system.casts.slots.base' {
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CompoundTag } from 'net.minecraft.nbt';

  class SlotReference {
    deserializeNBT(tag: CompoundTag): SlotReference;
    equals(o: any): boolean;
    gatherStack(player: Player): ItemStack;
    hashCode(): number;
    serializeNBT(): CompoundTag;
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.system.casts.slots' {
  import { SlotReference } from 'it.hurts.sskirillss.relics.system.casts.slots.base';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface CurioSlotReference extends SlotReference {}
  class CurioSlotReference extends SlotReference {
    constructor();

    constructor(index: number, type: string);
    deserializeNBT(tag: CompoundTag): SlotReference;
    equals(o: any): boolean;
    gatherStack(player: Player): ItemStack;
    get index(): number;
    get type(): string;
    hashCode(): number;
    serializeNBT(): CompoundTag;
    set index(index: number);
    set type(type: string);
    toString(): string;
  }


  interface InventorySlotReference extends SlotReference {}
  class InventorySlotReference extends SlotReference {
    constructor();

    constructor(index: number);
    deserializeNBT(tag: CompoundTag): SlotReference;
    equals(o: any): boolean;
    gatherStack(player: Player): ItemStack;
    get index(): number;
    hashCode(): number;
    serializeNBT(): CompoundTag;
    set index(index: number);
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.tiles.base' {
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { Window } from 'com.mojang.blaze3d.platform';

  class IHasHUDInfo {
    renderHUDInfo(var1: PoseStack, var2: Window): void;
  }

}

declare module 'it.hurts.sskirillss.relics.tiles' {
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level } from 'net.minecraft.world.level';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { ClientboundBlockEntityDataPacket } from 'net.minecraft.network.protocol.game';
  import { ItemStack } from 'net.minecraft.world.item';

  interface ResearchingTableTile extends BlockEntity {}
  class ResearchingTableTile extends BlockEntity {
    ticksExisted: number;
    constructor(pos: BlockPos, state: BlockState);
    get stack(): ItemStack;
    get updatePacket(): ClientboundBlockEntityDataPacket;
    getUpdateTag(provider: Provider): CompoundTag;
    set stack(stack: ItemStack);
    static tick(level: Level, pos: BlockPos, state: BlockState, tile: ResearchingTableTile): void;
  }

}

declare module 'it.hurts.sskirillss.relics.utils.data' {
  import { Pair } from 'org.apache.commons.lang3.tuple';
  import { Integer, Long, Enum } from 'java.lang';
  import { List } from 'java.util';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { Color } from 'java.awt';
  import { Supplier } from 'java.util.function';
  import { Codec } from 'com.mojang.serialization';
  import { Entity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { Vec3 } from 'net.minecraft.world.phys';

  class AnimationData {
    static builder(): AnimationData;
    static construct(texHeight: number, patternHeight: number, frameTime: number): AnimationData;
    equals(o: any): boolean;
    frame(index: number, time: number): AnimationData;
    get frames(): Pair<number, number>[];
    get length(): number;
    getFrameByTime(time: number): Pair<number, number>;
    hashCode(): number;
    toString(): string;
  }


  class GUIRenderer {
    alpha(alpha: number): GUIRenderer;
    anchor(anchor: SpriteAnchor): GUIRenderer;
    animation(animation: AnimationData): GUIRenderer;
    static begin(texture: ResourceLocation, pose: PoseStack): GUIRenderer;
    blue(blue: number): GUIRenderer;
    color(red: number, green: number, blue: number, alpha: number): GUIRenderer;
    color(red: number, green: number, blue: number, alpha: number): GUIRenderer;
    color(color: Color): GUIRenderer;
    color(color: number): GUIRenderer;
    end(): void;
    green(green: number): GUIRenderer;
    mirror(...mirror: SpriteMirror[]): GUIRenderer;
    patternHeight(patternHeight: number): GUIRenderer;
    patternSize(patternWidth: number, patternHeight: number): GUIRenderer;
    patternWidth(patternWidth: number): GUIRenderer;
    pos(posX: number, posY: number): GUIRenderer;
    posX(posX: number): GUIRenderer;
    posY(posY: number): GUIRenderer;
    red(red: number): GUIRenderer;
    scale(scale: number): GUIRenderer;
    texHeight(texHeight: number): GUIRenderer;
    texOff(texOffX: number, texOffY: number): GUIRenderer;
    texOffX(texOffX: number): GUIRenderer;
    texOffY(texOffY: number): GUIRenderer;
    texSize(texWidth: number, texHeight: number): GUIRenderer;
    texWidth(texWidth: number): GUIRenderer;
    time(time: Supplier<Long>): GUIRenderer;
  }


  class GUIScissors {
    static begin(x: number, y: number, width: number, height: number): void;
    static end(): void;
  }


  interface SpriteAnchor extends Enum<SpriteAnchor> {}
  class SpriteAnchor extends Enum<SpriteAnchor> {
    static readonly TOP_LEFT: SpriteAnchor;
    static readonly TOP_CENTER: SpriteAnchor;
    static readonly TOP_RIGHT: SpriteAnchor;
    static readonly CENTER_LEFT: SpriteAnchor;
    static readonly CENTER: SpriteAnchor;
    static readonly CENTER_RIGHT: SpriteAnchor;
    static readonly BOTTOM_LEFT: SpriteAnchor;
    static readonly BOTTOM_CENTER: SpriteAnchor;
    static readonly BOTTOM_RIGHT: SpriteAnchor;
    static valueOf(name: string): SpriteAnchor;
    static values(): SpriteAnchor[];
  }


  interface SpriteMirror extends Enum<SpriteMirror> {}
  class SpriteMirror extends Enum<SpriteMirror> {
    static readonly HORIZONTAL: SpriteMirror;
    static readonly VERTICAL: SpriteMirror;
    static valueOf(name: string): SpriteMirror;
    static values(): SpriteMirror[];
  }


  class WorldPosition {
    static readonly CODEC: Codec;
    constructor(entity: Entity);

    constructor(level: ResourceKey<Level>, pos: Vec3);
    equals(o: any): boolean;
    get level(): ResourceKey<Level>;
    get pos(): Vec3;
    hashCode(): number;
    set level(level: ResourceKey<Level>);
    set pos(pos: Vec3);
    toString(): string;
  }

}

declare module 'it.hurts.sskirillss.relics.utils' {
  import { Entity, LivingEntity } from 'net.minecraft.world.entity';
  import { Vec3, EntityHitResult } from 'net.minecraft.world.phys';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { List, Random } from 'java.util';
  import { Integer, Class, Float } from 'java.lang';
  import { Predicate } from 'java.util.function';
  import { Holder, BlockPos } from 'net.minecraft.core';
  import { Attribute } from 'net.minecraft.world.entity.ai.attributes';
  import { Operation } from 'AttributeModifier';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { Stream } from 'java.util.stream';
  import { RandomSource } from 'net.minecraft.util';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Level } from 'net.minecraft.world.level';
  import { Pair } from 'org.apache.commons.lang3.tuple';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { ParticleOptions } from 'net.minecraft.core.particles';
  import { Color } from 'java.awt';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { Vector2f } from 'org.joml';
  import { AnimationData } from 'it.hurts.sskirillss.relics.utils.data';
  import { BlockEntityTicker, BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';

  class Easing {
    static easeInBack(progress: number): number;
    static easeInBounce(progress: number): number;
    static easeInCirc(progress: number): number;
    static easeInCubic(progress: number): number;
    static easeInElastic(progress: number): number;
    static easeInExpo(progress: number): number;
    static easeInOutBack(progress: number): number;
    static easeInOutBounce(progress: number): number;
    static easeInOutCirc(progress: number): number;
    static easeInOutCubic(progress: number): number;
    static easeInOutElastic(progress: number): number;
    static easeInOutExpo(progress: number): number;
    static easeInOutQuad(progress: number): number;
    static easeInOutQuart(progress: number): number;
    static easeInOutQuint(progress: number): number;
    static easeInOutSine(progress: number): number;
    static easeInQuad(progress: number): number;
    static easeInQuart(progress: number): number;
    static easeInQuint(progress: number): number;
    static easeInSine(progress: number): number;
    static easeOutBack(progress: number): number;
    static easeOutBounce(progress: number): number;
    static easeOutCirc(progress: number): number;
    static easeOutCubic(progress: number): number;
    static easeOutElastic(progress: number): number;
    static easeOutExpo(progress: number): number;
    static easeOutQuad(progress: number): number;
    static easeOutQuart(progress: number): number;
    static easeOutQuint(progress: number): number;
    static easeOutSine(progress: number): number;
    static linear(progress: number): number;
  }


  class EntityUtils {
    static addItem(player: Player, stack: ItemStack): void;
    static applyAttribute(entity: LivingEntity, stack: ItemStack, attributeHolder: Holder<Attribute>, value: number, operation: Operation): void;
    static calculateExperienceLevelLoss(player: Player, experience: number): number;
    static findEquippedCurio(entity: Entity, item: Item): ItemStack;
    static findEquippedCurios(entity: Entity, item: Item): ItemStack[];
    static gatherPotentialTargets<T extends LivingEntity>(seeker: Entity, type: Class<T>, radius: number): Stream<T>;
    static getEquippedRelics(entity: LivingEntity): ItemStack[];
    static getExperienceForLevel(level: number): number;
    static getLevelFromTotalExperience(totalXP: number): number;
    static getPlayerTotalExperience(player: Player): number;
    static getSlotWithItem(player: Player, item: Item): number;
    static getSlotsWithItem(player: Player, item: Item): number[];
    static getTotalExperienceForLevel(level: number): number;
    static hurt(entity: LivingEntity, source: DamageSource, amount: number): boolean;
    static isAlliedTo(source: Entity, target: Entity): boolean;
    static moveTowardsPosition(entity: Entity, targetPos: Vec3, speed: number): void;
    static rayTraceEntity(shooter: Entity, filter: Predicate<Entity>, distance: number): EntityHitResult;
    static removeAttribute(entity: LivingEntity, stack: ItemStack, attributeHolder: Holder<Attribute>, operation: Operation): void;
    static resetAttribute(entity: LivingEntity, stack: ItemStack, attributeHolder: Holder<Attribute>, value: number, operation: Operation): void;
  }


  class MathUtils {
    static clamp(value: number, min: number, max: number): number;
    static clamp(value: number, min: number, max: number): number;
    static clamp(value: number, min: number, max: number): number;
    static multicast(random: RandomSource, chance: number, chanceMultiplier: number): number;
    static multicast(random: RandomSource, chance: number, maxIterations: number): number;
    static multicast(random: RandomSource, chance: number): number;
    static randomBetween(random: Random, min: number, max: number): number;
    static randomBetween(random: Random, min: number, max: number): number;
    static randomBetween(random: Random, min: number, max: number): number;
    static randomFloat(random: RandomSource): number;
    static round(value: number, steps: number): number;
  }


  class NBTUtils {
    static clearTag(stack: ItemStack, tag: string): void;
    static getBoolean(stack: ItemStack, tag: string, defaultValue: boolean): boolean;
    static getCompound(stack: ItemStack, tag: string, defaultValue: CompoundTag): CompoundTag;
    static getDouble(stack: ItemStack, tag: string, defaultValue: number): number;
    static getFloat(stack: ItemStack, tag: string, defaultValue: number): number;
    static getInt(stack: ItemStack, tag: string, defaultValue: number): number;
    static getList<T>(stack: ItemStack, tag: string, type: Class<T>): T[];
    static getLong(stack: ItemStack, tag: string, defaultValue: number): number;
    static getOrCreateTag(stack: ItemStack): CompoundTag;
    static getString(stack: ItemStack, tag: string, defaultValue: string): string;
    static packBundledPosition(pos: Vec3, level: Level): CompoundTag;
    static parseBundledPosition(world: Level, tag: CompoundTag): Pair<ServerLevel, Vec3>;
    static parseLevel(world: Level, value: string): ServerLevel;
    static parsePosition(value: string): Vec3;
    static setBoolean(stack: ItemStack, tag: string, value: boolean): void;
    static setCompound(stack: ItemStack, tag: string, value: CompoundTag): void;
    static setDouble(stack: ItemStack, tag: string, value: number): void;
    static setFloat(stack: ItemStack, tag: string, value: number): void;
    static setInt(stack: ItemStack, tag: string, value: number): void;
    static setList(stack: ItemStack, tag: string, list: any[]): void;
    static setLong(stack: ItemStack, tag: string, value: number): void;
    static setString(stack: ItemStack, tag: string, value: string): void;
    static writeLevel(level: Level): string;
    static writePosition(vec: Vec3): string;
  }


  class ParticleUtils {
    static constructSimpleSpark(color: Color, diameter: number, lifetime: number, scaleModifier: number): ParticleOptions;
    static createBall(particle: ParticleOptions, vec: Vec3, world: Level, size: number, speed: number): void;
    static createCyl(particle: ParticleOptions, center: Vec3, level: Level, radius: number, step: number): void;
    static createCyl(particle: ParticleOptions, center: Vec3, level: Level, radius: number, step: number, spherical: boolean): void;
    static createLine(particle: ParticleOptions, level: Level, start: Vec3, end: Vec3, amount: number, motion: Vec3): void;
    static createLine(particle: ParticleOptions, level: Level, start: Vec3, end: Vec3, amount: number): void;
  }


  class Reference {
    static readonly MODID: string;
  }


  class RelicUtils {
  }


  class RenderUtils {
    static drawOutlinedText(guiGraphics: GuiGraphics, text: MutableComponent, x: number, y: number, textColor: number, outlineColor: number): void;
    static renderAnimatedTextureFromCenter(matrix: PoseStack, centerX: number, centerY: number, texWidth: number, texHeight: number, patternWidth: number, patternHeight: number, scale: number, animation: AnimationData): void;
    static renderAnimatedTextureFromCenter(matrix: PoseStack, centerX: number, centerY: number, texWidth: number, texHeight: number, patternWidth: number, patternHeight: number, scale: number, animation: AnimationData, ticks: number): void;
    static renderFlatBeam(guiGraphics: GuiGraphics, partialTicks: number, length: number, width: number, startColor: number, endColor: number): void;
    static renderRevealingPanel(matrices: PoseStack, x: number, y: number, sizeX: number, sizeY: number, points: Vector2f[], revealRadiuses: number[], noiseSpreads: number[], time: number): void;
    static renderTextureFromCenter(matrix: PoseStack, centerX: number, centerY: number, width: number, height: number, scale: number): void;
    static renderTextureFromCenter(matrix: PoseStack, centerX: number, centerY: number, texOffX: number, texOffY: number, texWidth: number, texHeight: number, width: number, height: number, scale: number): void;
  }


  class TickerUtils {
    static getTicker<A extends BlockEntity, T extends BlockEntity>(innerType: BlockEntityType<T>, targetType: BlockEntityType<A>, ticker: BlockEntityTicker<A>): BlockEntityTicker<T>;
  }


  class WorldUtils {
    static getBlockSphere(center: BlockPos, radius: number): BlockPos[];
    static getGroundHeight(entity: Entity, position: Vec3, iterations: number): number;
  }

}

declare module 'it.hurts.sskirillss.relics.utils.RelicUtils' {
  import { List } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Level } from 'net.minecraft.world.level';

  class Levelgen {
    static readonly AQUATIC: List;
    static readonly NETHER: List;
    static readonly COLD: List;
    static readonly DESERT: List;
    static readonly CAVE: List;
    static readonly VILLAGE: List;
  }


  class Owner {
    static getOwner(stack: ItemStack, world: Level): Player;
    static getOwnerUUID(stack: ItemStack): string;
    static setOwnerUUID(stack: ItemStack, uuid: string): void;
  }

}