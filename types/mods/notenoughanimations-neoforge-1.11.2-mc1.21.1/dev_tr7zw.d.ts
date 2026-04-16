declare module 'dev.tr7zw.notenoughanimations.access' {
  import { ItemStack } from 'net.minecraft.world.item';
  import { LivingEntity, Pose } from 'net.minecraft.world.entity';
  import { DataHolder } from 'dev.tr7zw.notenoughanimations.versionless.animations';
  import { Supplier } from 'java.util.function';

  class ExtendedItemStackRenderState {
    get itemStack(): ItemStack;
    set itemStack(var1: ItemStack);
  }


  class ExtendedLivingRenderState {
    get entity(): LivingEntity;
    set entity(var1: LivingEntity);
  }


  class PlayerData {
    get itemSwapAnimationTimer(): number;
    get lastAnimationSwapTick(): number;
    get lastHeldItems(): ItemStack[];
    get lastRotations(): number[];
    get poseOverwrite(): Pose;
    get sideSword(): ItemStack;
    getData<T>(var1: DataHolder<T>, var2: Supplier<T>): T;
    isDisableBodyRotation(): boolean;
    isRotateBodyToHead(): boolean;
    isUpdated(var1: number): number;
    set itemSwapAnimationTimer(var1: number);
    set lastAnimationSwapTick(var1: number);
    set poseOverwrite(var1: Pose);
    set sideSword(var1: ItemStack);
    setDisableBodyRotation(var1: boolean): void;
    setRotateBodyToHead(var1: boolean): void;
    setUpdated(var1: number): void;
  }

}

declare module 'dev.tr7zw.notenoughanimations.animations.fullbody' {
  import { BasicAnimation, PoseOverwrite } from 'dev.tr7zw.notenoughanimations.api';
  import { AbstractClientPlayer } from 'net.minecraft.client.player';
  import { PlayerData } from 'dev.tr7zw.notenoughanimations.access';
  import { BodyPart, DataHolder } from 'dev.tr7zw.notenoughanimations.versionless.animations';
  import { PlayerModel } from 'net.minecraft.client.model';
  import { FallingData } from 'dev.tr7zw.notenoughanimations.animations.fullbody.FallingAnimation';

  interface ActionRotationLockAnimation extends BasicAnimation {}
  class ActionRotationLockAnimation extends BasicAnimation {
    apply(entity: AbstractClientPlayer, data: PlayerData, model: PlayerModel, part: BodyPart, delta: number, tickCounter: number): void;
    getBodyParts(entity: AbstractClientPlayer, data: PlayerData): BodyPart[];
    getPriority(entity: AbstractClientPlayer, data: PlayerData): number;
    isEnabled(): boolean;
    isValid(entity: AbstractClientPlayer, data: PlayerData): boolean;
  }


  interface BurningAnimation extends BasicAnimation {}
  class BurningAnimation extends BasicAnimation {
    apply(entity: AbstractClientPlayer, data: PlayerData, model: PlayerModel, part: BodyPart, delta: number, tickCounter: number): void;
    getBodyParts(entity: AbstractClientPlayer, data: PlayerData): BodyPart[];
    getPriority(entity: AbstractClientPlayer, data: PlayerData): number;
    isEnabled(): boolean;
    isValid(entity: AbstractClientPlayer, data: PlayerData): boolean;
  }


  interface CrawlingAnimation extends BasicAnimation {}
  class CrawlingAnimation extends BasicAnimation {
    apply(entity: AbstractClientPlayer, data: PlayerData, model: PlayerModel, part: BodyPart, delta: number, tickCounter: number): void;
    getBodyParts(entity: AbstractClientPlayer, data: PlayerData): BodyPart[];
    getPriority(entity: AbstractClientPlayer, data: PlayerData): number;
    isEnabled(): boolean;
    isValid(entity: AbstractClientPlayer, data: PlayerData): boolean;
  }


  interface FallingAnimation extends DataHolder<FallingData>, BasicAnimation {}
  class FallingAnimation extends DataHolder<FallingData> {
    apply(entity: AbstractClientPlayer, data: PlayerData, model: PlayerModel, part: BodyPart, delta: number, tickCounter: number): void;
    getBodyParts(entity: AbstractClientPlayer, data: PlayerData): BodyPart[];
    getPriority(entity: AbstractClientPlayer, data: PlayerData): number;
    isEnabled(): boolean;
    isValid(entity: AbstractClientPlayer, data: PlayerData): boolean;
  }


  interface FreezingAnimation extends BasicAnimation {}
  class FreezingAnimation extends BasicAnimation {
    apply(entity: AbstractClientPlayer, data: PlayerData, model: PlayerModel, part: BodyPart, delta: number, tickCounter: number): void;
    getBodyParts(entity: AbstractClientPlayer, data: PlayerData): BodyPart[];
    getPriority(entity: AbstractClientPlayer, data: PlayerData): number;
    isEnabled(): boolean;
    isValid(entity: AbstractClientPlayer, data: PlayerData): boolean;
  }


  interface HorseAnimation extends BasicAnimation {}
  class HorseAnimation extends BasicAnimation {
    apply(entity: AbstractClientPlayer, data: PlayerData, model: PlayerModel, part: BodyPart, delta: number, tickCounter: number): void;
    getBodyParts(entity: AbstractClientPlayer, data: PlayerData): BodyPart[];
    getPriority(entity: AbstractClientPlayer, data: PlayerData): number;
    isEnabled(): boolean;
    isValid(entity: AbstractClientPlayer, data: PlayerData): boolean;
  }


  interface LadderAnimation extends PoseOverwrite, BasicAnimation {}
  class LadderAnimation extends PoseOverwrite {
    apply(entity: AbstractClientPlayer, data: PlayerData, model: PlayerModel, part: BodyPart, delta: number, tickCounter: number): void;
    getBodyParts(entity: AbstractClientPlayer, data: PlayerData): BodyPart[];
    getPriority(entity: AbstractClientPlayer, data: PlayerData): number;
    isEnabled(): boolean;
    isValid(entity: AbstractClientPlayer, data: PlayerData): boolean;
    updateState(entity: AbstractClientPlayer, data: PlayerData, playerModel: PlayerModel): void;
  }


  interface PassengerAnimation extends BasicAnimation {}
  class PassengerAnimation extends BasicAnimation {
    apply(entity: AbstractClientPlayer, data: PlayerData, model: PlayerModel, part: BodyPart, delta: number, tickCounter: number): void;
    getBodyParts(entity: AbstractClientPlayer, data: PlayerData): BodyPart[];
    getPriority(entity: AbstractClientPlayer, data: PlayerData): number;
    isEnabled(): boolean;
    isValid(entity: AbstractClientPlayer, data: PlayerData): boolean;
  }

}

declare module 'dev.tr7zw.notenoughanimations.animations.fullbody.FallingAnimation' {
  class FallingData {
    lastY: number;
    fallingSpeed: number;
    constructor(y: number);
  }

}

declare module 'dev.tr7zw.notenoughanimations.animations.hands' {
  import { BasicAnimation } from 'dev.tr7zw.notenoughanimations.api';
  import { AbstractClientPlayer } from 'net.minecraft.client.player';
  import { PlayerData } from 'dev.tr7zw.notenoughanimations.access';
  import { BodyPart } from 'dev.tr7zw.notenoughanimations.versionless.animations';
  import { PlayerModel } from 'net.minecraft.client.model';
  import { EnumSet } from 'java.util';
  import { ArmPose } from 'HumanoidModel';

  interface BoatAnimation extends BasicAnimation {}
  class BoatAnimation extends BasicAnimation {
    apply(entity: AbstractClientPlayer, data: PlayerData, model: PlayerModel, part: BodyPart, delta: number, tickCounter: number): void;
    getBodyParts(entity: AbstractClientPlayer, data: PlayerData): BodyPart[];
    getPriority(entity: AbstractClientPlayer, data: PlayerData): number;
    isEnabled(): boolean;
    isValid(entity: AbstractClientPlayer, data: PlayerData): boolean;
  }


  interface ClampCrossbowAnimations extends VanillaProjectileWeaponAnimation {}
  class ClampCrossbowAnimations extends VanillaProjectileWeaponAnimation {
    apply(entity: AbstractClientPlayer, data: PlayerData, model: PlayerModel, part: BodyPart, delta: number, tickCounter: number): void;
    get twoHandedAnimations(): EnumSet<ArmPose>;
    isEnabled(): boolean;
  }


  interface CustomBowAnimation extends VanillaProjectileWeaponAnimation {}
  class CustomBowAnimation extends VanillaProjectileWeaponAnimation {
    apply(entity: AbstractClientPlayer, data: PlayerData, model: PlayerModel, part: BodyPart, delta: number, tickCounter: number): void;
    get twoHandedAnimations(): EnumSet<ArmPose>;
    isEnabled(): boolean;
  }


  interface EatDrinkAnimation extends BasicAnimation {}
  class EatDrinkAnimation extends BasicAnimation {
    apply(entity: AbstractClientPlayer, data: PlayerData, model: PlayerModel, part: BodyPart, delta: number, tickCounter: number): void;
    getBodyParts(entity: AbstractClientPlayer, data: PlayerData): BodyPart[];
    getPriority(entity: AbstractClientPlayer, data: PlayerData): number;
    isEnabled(): boolean;
    isValid(entity: AbstractClientPlayer, data: PlayerData): boolean;
  }


  interface HugAnimation extends BasicAnimation {}
  class HugAnimation extends BasicAnimation {
    apply(entity: AbstractClientPlayer, data: PlayerData, model: PlayerModel, part: BodyPart, delta: number, tickCounter: number): void;
    getBodyParts(entity: AbstractClientPlayer, data: PlayerData): BodyPart[];
    getPriority(entity: AbstractClientPlayer, data: PlayerData): number;
    isEnabled(): boolean;
    isValid(entity: AbstractClientPlayer, data: PlayerData): boolean;
  }


  interface ItemSwapAnimation extends BasicAnimation {}
  class ItemSwapAnimation extends BasicAnimation {
    apply(entity: AbstractClientPlayer, data: PlayerData, model: PlayerModel, part: BodyPart, delta: number, tickCounter: number): void;
    getBodyParts(entity: AbstractClientPlayer, data: PlayerData): BodyPart[];
    getPriority(entity: AbstractClientPlayer, data: PlayerData): number;
    isEnabled(): boolean;
    isValid(entity: AbstractClientPlayer, data: PlayerData): boolean;
  }


  interface LookAtItemAnimation extends BasicAnimation {}
  class LookAtItemAnimation extends BasicAnimation {
    apply(entity: AbstractClientPlayer, data: PlayerData, model: PlayerModel, part: BodyPart, delta: number, tickCounter: number): void;
    getBodyParts(entity: AbstractClientPlayer, data: PlayerData): BodyPart[];
    getPriority(entity: AbstractClientPlayer, data: PlayerData): number;
    isEnabled(): boolean;
    isValid(entity: AbstractClientPlayer, data: PlayerData): boolean;
  }


  interface MapHoldingAnimation extends BasicAnimation {}
  class MapHoldingAnimation extends BasicAnimation {
    apply(entity: AbstractClientPlayer, data: PlayerData, model: PlayerModel, part: BodyPart, delta: number, tickCounter: number): void;
    getBodyParts(entity: AbstractClientPlayer, data: PlayerData): BodyPart[];
    getPriority(entity: AbstractClientPlayer, data: PlayerData): number;
    isEnabled(): boolean;
    isValid(entity: AbstractClientPlayer, data: PlayerData): boolean;
  }


  interface NarutoRunningAnimation extends BasicAnimation {}
  class NarutoRunningAnimation extends BasicAnimation {
    apply(entity: AbstractClientPlayer, data: PlayerData, model: PlayerModel, part: BodyPart, delta: number, tickCounter: number): void;
    getBodyParts(entity: AbstractClientPlayer, data: PlayerData): BodyPart[];
    getPriority(entity: AbstractClientPlayer, data: PlayerData): number;
    isEnabled(): boolean;
    isValid(entity: AbstractClientPlayer, data: PlayerData): boolean;
  }


  interface PetAnimation extends BasicAnimation {}
  class PetAnimation extends BasicAnimation {
    apply(entity: AbstractClientPlayer, data: PlayerData, model: PlayerModel, part: BodyPart, delta: number, tickCounter: number): void;
    getBodyParts(entity: AbstractClientPlayer, data: PlayerData): BodyPart[];
    getPriority(entity: AbstractClientPlayer, data: PlayerData): number;
    isEnabled(): boolean;
    isValid(entity: AbstractClientPlayer, data: PlayerData): boolean;
  }


  interface VanillaProjectileWeaponAnimation extends BasicAnimation {}
  class VanillaProjectileWeaponAnimation extends BasicAnimation {
    getBodyParts(entity: AbstractClientPlayer, data: PlayerData): BodyPart[];
    getPriority(entity: AbstractClientPlayer, data: PlayerData): number;
    isValid(entity: AbstractClientPlayer, data: PlayerData): boolean;
  }

}

declare module 'dev.tr7zw.notenoughanimations.animations.vanilla' {
  import { BasicAnimation, PoseOverwrite } from 'dev.tr7zw.notenoughanimations.api';
  import { AbstractClientPlayer } from 'net.minecraft.client.player';
  import { PlayerData } from 'dev.tr7zw.notenoughanimations.access';
  import { BodyPart } from 'dev.tr7zw.notenoughanimations.versionless.animations';
  import { PlayerModel } from 'net.minecraft.client.model';

  interface DeathAnimation extends BasicAnimation {}
  class DeathAnimation extends BasicAnimation {
    apply(entity: AbstractClientPlayer, data: PlayerData, model: PlayerModel, part: BodyPart, delta: number, tickCounter: number): void;
    getBodyParts(entity: AbstractClientPlayer, data: PlayerData): BodyPart[];
    getPriority(entity: AbstractClientPlayer, data: PlayerData): number;
    isEnabled(): boolean;
    isValid(entity: AbstractClientPlayer, data: PlayerData): boolean;
  }


  interface ElytraAnimation extends PoseOverwrite, BasicAnimation {}
  class ElytraAnimation extends PoseOverwrite {
    apply(entity: AbstractClientPlayer, data: PlayerData, model: PlayerModel, part: BodyPart, delta: number, tickCounter: number): void;
    getBodyParts(entity: AbstractClientPlayer, data: PlayerData): BodyPart[];
    getPriority(entity: AbstractClientPlayer, data: PlayerData): number;
    isEnabled(): boolean;
    isValid(entity: AbstractClientPlayer, data: PlayerData): boolean;
    updateState(entity: AbstractClientPlayer, data: PlayerData, playerModel: PlayerModel): void;
  }


  interface RiptideAnimation extends BasicAnimation {}
  class RiptideAnimation extends BasicAnimation {
    apply(entity: AbstractClientPlayer, data: PlayerData, model: PlayerModel, part: BodyPart, delta: number, tickCounter: number): void;
    getBodyParts(entity: AbstractClientPlayer, data: PlayerData): BodyPart[];
    getPriority(entity: AbstractClientPlayer, data: PlayerData): number;
    isEnabled(): boolean;
    isValid(entity: AbstractClientPlayer, data: PlayerData): boolean;
  }


  interface SleepAnimation extends BasicAnimation {}
  class SleepAnimation extends BasicAnimation {
    apply(entity: AbstractClientPlayer, data: PlayerData, model: PlayerModel, part: BodyPart, delta: number, tickCounter: number): void;
    getBodyParts(entity: AbstractClientPlayer, data: PlayerData): BodyPart[];
    getPriority(entity: AbstractClientPlayer, data: PlayerData): number;
    isEnabled(): boolean;
    isValid(entity: AbstractClientPlayer, data: PlayerData): boolean;
  }


  interface SwimAnimation extends BasicAnimation {}
  class SwimAnimation extends BasicAnimation {
    apply(entity: AbstractClientPlayer, data: PlayerData, model: PlayerModel, part: BodyPart, delta: number, tickCounter: number): void;
    getBodyParts(entity: AbstractClientPlayer, data: PlayerData): BodyPart[];
    getPriority(entity: AbstractClientPlayer, data: PlayerData): number;
    isEnabled(): boolean;
    isValid(entity: AbstractClientPlayer, data: PlayerData): boolean;
  }


  interface VanillaShieldAnimation extends BasicAnimation {}
  class VanillaShieldAnimation extends BasicAnimation {
    apply(entity: AbstractClientPlayer, data: PlayerData, model: PlayerModel, part: BodyPart, delta: number, tickCounter: number): void;
    getBodyParts(entity: AbstractClientPlayer, data: PlayerData): BodyPart[];
    getPriority(entity: AbstractClientPlayer, data: PlayerData): number;
    isEnabled(): boolean;
    isValid(entity: AbstractClientPlayer, data: PlayerData): boolean;
  }


  interface VanillaSingleHandedAnimation extends BasicAnimation {}
  class VanillaSingleHandedAnimation extends BasicAnimation {
    apply(entity: AbstractClientPlayer, data: PlayerData, model: PlayerModel, part: BodyPart, delta: number, tickCounter: number): void;
    getBodyParts(entity: AbstractClientPlayer, data: PlayerData): BodyPart[];
    getPriority(entity: AbstractClientPlayer, data: PlayerData): number;
    isEnabled(): boolean;
    isValid(entity: AbstractClientPlayer, data: PlayerData): boolean;
  }


  interface VanillaTwoHandedAnimation extends BasicAnimation {}
  class VanillaTwoHandedAnimation extends BasicAnimation {
    apply(entity: AbstractClientPlayer, data: PlayerData, model: PlayerModel, part: BodyPart, delta: number, tickCounter: number): void;
    getBodyParts(entity: AbstractClientPlayer, data: PlayerData): BodyPart[];
    getPriority(entity: AbstractClientPlayer, data: PlayerData): number;
    isEnabled(): boolean;
    isValid(entity: AbstractClientPlayer, data: PlayerData): boolean;
  }

}

declare module 'dev.tr7zw.notenoughanimations.api' {
  import { AbstractClientPlayer } from 'net.minecraft.client.player';
  import { PlayerData } from 'dev.tr7zw.notenoughanimations.access';
  import { BodyPart } from 'dev.tr7zw.notenoughanimations.versionless.animations';
  import { PlayerModel } from 'net.minecraft.client.model';

  class BasicAnimation {
    apply(var1: AbstractClientPlayer, var2: PlayerData, var3: PlayerModel, var4: BodyPart, var5: number, var6: number): void;
    cleanup(): void;
    getBodyParts(var1: AbstractClientPlayer, var2: PlayerData): BodyPart[];
    getPriority(var1: AbstractClientPlayer, var2: PlayerData): number;
    isEnabled(): boolean;
    isValid(var1: AbstractClientPlayer, var2: PlayerData): boolean;
    prepare(entity: AbstractClientPlayer, data: PlayerData, model: PlayerModel, delta: number, swing: number): void;
  }


  class NotEnoughAnimationsApi {
    static refreshEnabledAnimations(): void;
    static registerAnimation(animation: BasicAnimation): void;
  }


  class PoseOverwrite {
    updateState(var1: AbstractClientPlayer, var2: PlayerData, var3: PlayerModel): void;
  }

}

declare module 'dev.tr7zw.notenoughanimations.config' {
  import { Screen } from 'net.minecraft.client.gui.screens';

  class ConfigScreenProvider {
    static createConfigScreen(parent: Screen): Screen;
  }

}

declare module 'dev.tr7zw.notenoughanimations.logic' {
  import { AbstractClientPlayer } from 'net.minecraft.client.player';
  import { PlayerModel, EntityModel } from 'net.minecraft.client.model';
  import { BasicAnimation } from 'dev.tr7zw.notenoughanimations.api';
  import { DataHolder } from 'dev.tr7zw.notenoughanimations.versionless.animations';
  import { HeldItemState } from 'dev.tr7zw.notenoughanimations.logic.HeldItemHandler';
  import { LivingEntity, HumanoidArm } from 'net.minecraft.world.entity';
  import { ItemStack } from 'net.minecraft.world.item';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  class AnimationProvider {
    constructor();
    addAnimation(animation: BasicAnimation): void;
    applyAnimations(entity: AbstractClientPlayer, model: PlayerModel, delta: number, swing: number): void;
    preUpdate(livingEntity: AbstractClientPlayer, playerModel: PlayerModel): void;
    refreshEnabledAnimations(): void;
  }


  interface HeldItemHandler extends DataHolder<HeldItemState> {}
  class HeldItemHandler extends DataHolder<HeldItemState> {
    onLoad(): void;
    onRenderItem(entity: LivingEntity, model: EntityModel<any>, itemStack: ItemStack, arm: HumanoidArm, matrices: PoseStack, vertexConsumers: MultiBufferSource, light: number, info: CallbackInfo): void;
  }


  class PlayerTransformer {
    static readonly ENTRY_SIZE: number;
    static readonly ENTRY_AMOUNT: number;
    nextTick(): void;
    preUpdate(livingEntity: AbstractClientPlayer, playerModel: PlayerModel, swing: number, info: CallbackInfo): void;
    renderingFirstPersonArm(flag: boolean): void;
    setDeltaTick(delta: number): void;
    updateModel(entity: AbstractClientPlayer, model: PlayerModel, swing: number, info: CallbackInfo): void;
  }

}

declare module 'dev.tr7zw.notenoughanimations.logic.HeldItemHandler' {
  import { Vec3 } from 'net.minecraft.world.phys';
  import { LivingEntity } from 'net.minecraft.world.entity';

  class HeldItemState {
    lanternLastTick: number;
    lanternPos: Vec3;
    lanternVelocity: Vec3;
    lastLanternVelocity: Vec3;
    smoothedHandPos: Vec3;
    constructor(entity: LivingEntity);
  }

}

declare module 'dev.tr7zw.notenoughanimations.mixins' {
  import { RenderLayer } from 'net.minecraft.client.renderer.entity.layers';
  import { RenderLayerParent, LivingEntityRenderer } from 'net.minecraft.client.renderer.entity';
  import { PlayerData } from 'dev.tr7zw.notenoughanimations.access';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Pose } from 'net.minecraft.world.entity';
  import { DataHolder } from 'dev.tr7zw.notenoughanimations.versionless.animations';
  import { Supplier } from 'java.util.function';
  import { HumanoidModel, PlayerModel } from 'net.minecraft.client.model';
  import { AbstractClientPlayer } from 'net.minecraft.client.player';
  import { Context } from 'EntityRendererProvider';

  class ClientLevelMixin {
  }


  interface ItemInHandLayerMixin<T extends LivingEntity = any, M extends EntityModel<T> = any> extends RenderLayer<T, M> {}
  class ItemInHandLayerMixin<T extends LivingEntity = any, M extends EntityModel<T> = any> extends RenderLayer<T, M> {
    constructor(renderLayerParent: RenderLayerParent<T, M>);
  }


  class ItemInHandRendererMixin {
  }


  class ItemStackRenderStateMixin {
  }


  class LevelRendererMixin {
  }


  class LivingEntityMixin {
  }


  class LivingEntityRendererMixin {
  }


  class LivingRenderStateMixin {
  }


  interface PlayerEntityMixin extends PlayerData {}
  class PlayerEntityMixin extends PlayerData {
    get itemSwapAnimationTimer(): number;
    get lastAnimationSwapTick(): number;
    get lastHeldItems(): ItemStack[];
    get lastRotations(): number[];
    get poseOverwrite(): Pose;
    get sideSword(): ItemStack;
    getData<T>(holder: DataHolder<T>, builder: Supplier<T>): T;
    isDisableBodyRotation(): boolean;
    isRotateBodyToHead(): boolean;
    isUpdated(frameId: number): number;
    set itemSwapAnimationTimer(count: number);
    set lastAnimationSwapTick(count: number);
    set lastRotations(lastRotations: number[]);
    set poseOverwrite(state: Pose);
    set sideSword(sideSword: ItemStack);
    setDisableBodyRotation(disableBodyRotation: boolean): void;
    setRotateBodyToHead(rotateBodyToHead: boolean): void;
    setUpdated(frameId: number): void;
    tick(info: CallbackInfo): void;
  }


  interface PlayerEntityModelMixin<T extends LivingEntity = any> extends HumanoidModel<T> {}
  class PlayerEntityModelMixin<T extends LivingEntity = any> extends HumanoidModel<T> {
    constructor();
    setupAnim(livingEntity: T, limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, info: CallbackInfo): void;
    setupAnimEnd(livingEntity: T, limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, info: CallbackInfo): void;
    setupAnimHEAD(livingEntity: T, limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, info: CallbackInfo): void;
  }


  class PlayerModelAccessor {
    get slim(): boolean;
  }


  interface PlayerRendererMixin extends LivingEntityRenderer<AbstractClientPlayer, PlayerModel> {}
  class PlayerRendererMixin extends LivingEntityRenderer<AbstractClientPlayer, PlayerModel> {
    constructor(context: Context, entityModel: PlayerModel<AbstractClientPlayer>, f: number);
    onCreate(info: CallbackInfo): void;
  }

}

declare module 'dev.tr7zw.notenoughanimations' {
  import { NEABaseMod } from 'dev.tr7zw.notenoughanimations.versionless';
  import { PlayerTransformer, HeldItemHandler, AnimationProvider } from 'dev.tr7zw.notenoughanimations.logic';

  class NEABootstrap {
    constructor();
  }


  interface NEAnimationsLoader extends NEABaseMod {}
  class NEAnimationsLoader extends NEABaseMod {
    static INSTANCE: NEAnimationsLoader;
    playerTransformer: PlayerTransformer;
    heldItemHandler: HeldItemHandler;
    animationProvider: AnimationProvider;
    clientTick(): void;
    onEnable(): void;
  }


  interface NEAnimationsMod extends NEAnimationsLoader {}
  class NEAnimationsMod extends NEAnimationsLoader {
    onInitializeClient(): void;
  }

}

declare module 'dev.tr7zw.notenoughanimations.renderlayer' {
  import { RenderLayer } from 'net.minecraft.client.renderer.entity.layers';
  import { AbstractClientPlayer } from 'net.minecraft.client.player';
  import { PlayerModel } from 'net.minecraft.client.model';
  import { RenderLayerParent } from 'net.minecraft.client.renderer.entity';
  import { Player } from 'net.minecraft.world.entity.player';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';

  interface SwordRenderLayer extends RenderLayer<AbstractClientPlayer, PlayerModel> {}
  class SwordRenderLayer extends RenderLayer<AbstractClientPlayer, PlayerModel> {
    constructor(renderLayerParent: RenderLayerParent<AbstractClientPlayer, PlayerModel<AbstractClientPlayer>>);
    render(poseStack: PoseStack, multiBufferSource: MultiBufferSource, light: number, player: AbstractClientPlayer, paramFloat1: number, paramFloat2: number, paramFloat3: number, paramFloat4: number, paramFloat5: number, paramFloat6: number): void;
    static update(player: Player): void;
  }

}

declare module 'dev.tr7zw.notenoughanimations.util' {
  import { Set, Collection } from 'java.util';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { ArmPose } from 'HumanoidModel';
  import { AbstractClientPlayer } from 'net.minecraft.client.player';
  import { BodyPart, DataHolder } from 'dev.tr7zw.notenoughanimations.versionless.animations';
  import { InteractionHand } from 'net.minecraft.world';
  import { PlayerModel } from 'net.minecraft.client.model';
  import { HumanoidArm, Entity } from 'net.minecraft.world.entity';
  import { Player } from 'net.minecraft.world.entity.player';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { Matrix4f } from 'org.joml';
  import { RenderStateData } from 'dev.tr7zw.notenoughanimations.util.RenderStateHolder';

  class AnimationUtil {
    static applyArmTransforms(model: PlayerModel, arm: HumanoidArm, pitch: number, yaw: number, roll: number): void;
    static applyTransforms(model: PlayerModel, bodyPart: BodyPart, pitch: number, yaw: number, roll: number): void;
    static getArmPose(abstractClientPlayerEntity: AbstractClientPlayer, hand: InteractionHand): ArmPose;
    static interpolateRotation(start: number, end: number, amount: number): number;
    static interpolateRotation2(start: number, end: number, amount: number): number;
    static isChargedCrossbow(item: ItemStack): boolean;
    static isSwingingArm(player: AbstractClientPlayer, arm: BodyPart): boolean;
    static isUsingBothHands(pose: ArmPose): boolean;
    static legacyWrapDegrees(f: number): number;
    static lerpAngle(delta: number, start: number, end: number): number;
    static minMaxHeadRotation(livingEntity: Player, model: PlayerModel): void;
    static parseItemList(list: Collection<string>): Set<Item>;
    static setHeadYRot(model: PlayerModel, value: number): void;
    static wrapDegrees(angle: number): number;
    static wrapDegrees2(angle: number): number;
  }


  class MapRenderer {
    static addVertex(cons: VertexConsumer, matrix4f: Matrix4f, x: number, y: number, z: number, u: number, v: number, lightmapUV: number): void;
    static renderFirstPersonMap(matrices: PoseStack, vertexConsumers: MultiBufferSource, light: number, stack: ItemStack, small: boolean, leftHanded: boolean): void;
  }


  class NMSWrapper {
    static hasCustomModel(itemStack: ItemStack): boolean;
    static onGround(entity: Entity): boolean;
  }


  interface RenderStateHolder extends DataHolder<RenderStateData> {}
  class RenderStateHolder extends DataHolder<RenderStateData> {
    static readonly INSTANCE: RenderStateHolder;
  }

}

declare module 'dev.tr7zw.notenoughanimations.util.RenderStateHolder' {
  class RenderStateData {
  }

}

declare module 'dev.tr7zw.notenoughanimations.versionless.animations' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface BodyPart extends Enum<BodyPart> {}
  class BodyPart extends Enum<BodyPart> {
    static readonly LEFT_ARM: BodyPart;
    static readonly RIGHT_ARM: BodyPart;
    static readonly LEFT_LEG: BodyPart;
    static readonly RIGHT_LEG: BodyPart;
    static readonly BODY: BodyPart;
    static readonly HEAD: BodyPart;
    static valueOf(name: string): BodyPart;
    static values(): BodyPart[];
  }


  interface BowAnimation extends Enum<BowAnimation> {}
  class BowAnimation extends Enum<BowAnimation> {
    static readonly VANILLA: BowAnimation;
    static readonly CUSTOM_V1: BowAnimation;
    static valueOf(name: string): BowAnimation;
    static values(): BowAnimation[];
  }


  class DataHolder<T = any> {
  }


  interface HoldUpModes extends Enum<HoldUpModes> {}
  class HoldUpModes extends Enum<HoldUpModes> {
    static readonly CONFIG: HoldUpModes;
    static readonly ALL: HoldUpModes;
    static readonly NONE: HoldUpModes;
    static readonly CONFIG_INVERTED: HoldUpModes;
    static valueOf(name: string): HoldUpModes;
    static values(): HoldUpModes[];
  }


  interface HoldUpTarget extends Enum<HoldUpTarget> {}
  class HoldUpTarget extends Enum<HoldUpTarget> {
    static readonly NONE: HoldUpTarget;
    static readonly CAMERA: HoldUpTarget;
    static valueOf(name: string): HoldUpTarget;
    static values(): HoldUpTarget[];
  }

}

declare module 'dev.tr7zw.notenoughanimations.versionless.config' {
  import { Set } from 'java.util';
  import { RotationLock } from 'dev.tr7zw.notenoughanimations.versionless';
  import { HoldUpModes, HoldUpTarget, BowAnimation } from 'dev.tr7zw.notenoughanimations.versionless.animations';

  class Config {
    configVersion: number;
    animationSmoothingSpeed: number;
    holdingItems: Set;
    enableAnimationSmoothing: boolean;
    enableInWorldMapRendering: boolean;
    enableOffhandHiding: boolean;
    enableRotationLocking: boolean;
    enableLadderAnimation: boolean;
    ladderAnimationAmplifier: number;
    ladderAnimationArmHeight: number;
    ladderAnimationArmSpeed: number;
    enableRotateToLadder: boolean;
    enableEatDrinkAnimation: boolean;
    enableRowBoatAnimation: boolean;
    enableHorseAnimation: boolean;
    enableHorseLegAnimation: boolean;
    dontHoldItemsInBed: boolean;
    freezeArmsInBed: boolean;
    rotationLock: RotationLock;
    limitRotationLockToFP: boolean;
    showLastUsedSword: boolean;
    sheathSwords: Set;
    enableCrawlingAnimation: boolean;
    holdUpItemsMode: HoldUpModes;
    holdUpTarget: HoldUpTarget;
    holdUpCameraOffset: number;
    holdUpOnlySelf: boolean;
    holdUpItemOffset: number;
    itemSwapAnimation: boolean;
    tweakElytraAnimation: boolean;
    petAnimation: boolean;
    fallingAnimation: boolean;
    freezingAnimation: boolean;
    huggingAnimation: boolean;
    narutoRunning: boolean;
    disableLegSmoothing: boolean;
    bowAnimation: BowAnimation;
    customBowRotationLock: boolean;
    clampCrossbowAnimations: boolean;
    burningAnimation: boolean;
    hideItemsForTheseBows: Set;
    mapHolding: Set;
    animateLanterns: boolean;
    lanternItems: Set;
  }


  class ConfigUpgrader {
    static upgradeConfig(config: Config): boolean;
  }

}

declare module 'dev.tr7zw.notenoughanimations.versionless' {
  import { Logger } from 'org.apache.logging.log4j';
  import { Config } from 'dev.tr7zw.notenoughanimations.versionless.config';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class NEABaseMod {
    static readonly LOGGER: Logger;
    static config: Config;
    writeConfig(): void;
  }


  interface RotationLock extends Enum<RotationLock> {}
  class RotationLock extends Enum<RotationLock> {
    static readonly NONE: RotationLock;
    static readonly FIXED: RotationLock;
    static readonly SMOOTH: RotationLock;
    static valueOf(name: string): RotationLock;
    static values(): RotationLock[];
  }

}