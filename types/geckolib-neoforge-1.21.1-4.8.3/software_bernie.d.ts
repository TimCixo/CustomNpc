declare module 'software.bernie.geckolib.animatable.client' {
  import { MutableObject } from 'org.apache.commons.lang3.mutable';
  import { BlockEntityWithoutLevelRenderer } from 'net.minecraft.client.renderer';
  import { HumanoidModel } from 'net.minecraft.client.model';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { EquipmentSlot, LivingEntity } from 'net.minecraft.world.entity';

  interface DeferredGeoRenderProvider extends GeoRenderProvider {}
  class DeferredGeoRenderProvider extends GeoRenderProvider {
    get geoItemRenderer(): BlockEntityWithoutLevelRenderer;
    get renderProvider(): MutableObject<GeoRenderProvider>;
    getGeoArmorRenderer<T extends LivingEntity>(livingEntity: T, itemStack: ItemStack, equipmentSlot: EquipmentSlot, original: HumanoidModel<T>): HumanoidModel<any>;
  }


  class GeoRenderProvider {
    static readonly DEFAULT: GeoRenderProvider;
    get geoItemRenderer(): BlockEntityWithoutLevelRenderer;
    getGeoArmorRenderer<T extends LivingEntity>(livingEntity: T, itemStack: ItemStack, equipmentSlot: EquipmentSlot, original: HumanoidModel<T>): HumanoidModel<any>;
    static of(itemStack: ItemStack): GeoRenderProvider;
    static of(item: Item): GeoRenderProvider;
  }

}

declare module 'software.bernie.geckolib.animatable' {
  import { ControllerRegistrar } from 'software.bernie.geckolib.animation.AnimatableManager';
  import { AnimatableInstanceCache } from 'software.bernie.geckolib.animatable.instance';
  import { SerializableDataTicket } from 'software.bernie.geckolib.constant.dataticket';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { EntityType, Entity } from 'net.minecraft.world.entity';
  import { Consumer } from 'java.util.function';
  import { GeoRenderProvider } from 'software.bernie.geckolib.animatable.client';

  class GeoAnimatable {
    animatableCacheOverride(): AnimatableInstanceCache;
    get animatableInstanceCache(): AnimatableInstanceCache;
    get boneResetTime(): number;
    getTick(var1: any): number;
    registerControllers(var1: ControllerRegistrar): void;
    shouldPlayAnimsWhileGamePaused(): boolean;
  }


  interface GeoBlockEntity extends GeoAnimatable {}
  class GeoBlockEntity extends GeoAnimatable {
    getAnimData<D>(dataTicket: SerializableDataTicket<D>): D;
    getTick(blockEntity: any): number;
    setAnimData<D>(dataTicket: SerializableDataTicket<D>, data: D): void;
    stopTriggeredAnim(controllerName: string, animName: string): void;
    triggerAnim(controllerName: string, animName: string): void;
  }


  interface GeoEntity extends GeoAnimatable {}
  class GeoEntity extends GeoAnimatable {
    getAnimData<D>(dataTicket: SerializableDataTicket<D>): D;
    getTick(entity: any): number;
    setAnimData<D>(dataTicket: SerializableDataTicket<D>, data: D): void;
    stopTriggeredAnim(controllerName: string, animName: string): void;
    triggerAnim(controllerName: string, animName: string): void;
  }


  interface GeoItem extends SingletonGeoAnimatable {}
  class GeoItem extends SingletonGeoAnimatable {
    animatableCacheOverride(): AnimatableInstanceCache;
    static getId(stack: ItemStack): number;
    static getOrAssignId(stack: ItemStack, level: ServerLevel): number;
    getTick(itemStack: any): number;
    isPerspectiveAware(): boolean;
    static registerSyncedAnimatable(animatable: GeoAnimatable): void;
  }


  interface GeoReplacedEntity extends SingletonGeoAnimatable {}
  class GeoReplacedEntity extends SingletonGeoAnimatable {
    createGeoRenderer(consumer: Consumer<GeoRenderProvider>): void;
    get renderProvider(): any;
    get replacingEntityType(): EntityType<any>;
    getAnimData<D>(entity: Entity, dataTicket: SerializableDataTicket<D>): D;
    getAnimData<D>(instanceId: number, dataTicket: SerializableDataTicket<D>): D;
    getTick(entity: any): number;
    setAnimData<D>(relatedEntity: Entity, dataTicket: SerializableDataTicket<D>, data: D): void;
    setAnimData<D>(relatedEntity: Entity, instanceId: number, dataTicket: SerializableDataTicket<D>, data: D): void;
    stopTriggeredAnim(relatedEntity: Entity, controllerName: string, animName: string): void;
    stopTriggeredAnim(relatedEntity: Entity, instanceId: number, controllerName: string, animName: string): void;
    triggerAnim(relatedEntity: Entity, controllerName: string, animName: string): void;
    triggerAnim<D>(relatedEntity: Entity, instanceId: number, controllerName: string, animName: string): void;
  }


  interface SingletonGeoAnimatable extends GeoAnimatable {}
  class SingletonGeoAnimatable extends GeoAnimatable {
    animatableCacheOverride(): AnimatableInstanceCache;
    createGeoRenderer(consumer: Consumer<GeoRenderProvider>): void;
    get renderProvider(): any;
    getAnimData<D>(instanceId: number, dataTicket: SerializableDataTicket<D>): D;
    static registerSyncedAnimatable(animatable: GeoAnimatable): void;
    setAnimData<D>(relatedEntity: Entity, instanceId: number, dataTicket: SerializableDataTicket<D>, data: D): void;
    stopTriggeredAnim(relatedEntity: Entity, instanceId: number, controllerName: string, animName: string): void;
    stopTriggeredArmorAnim(relatedEntity: Entity, instanceId: number, controllerName: string, animName: string): void;
    syncAnimData<D>(instanceId: number, dataTicket: SerializableDataTicket<D>, data: D, entityToTrack: Entity): void;
    triggerAnim<D>(relatedEntity: Entity, instanceId: number, controllerName: string, animName: string): void;
    triggerArmorAnim(relatedEntity: Entity, instanceId: number, controllerName: string, animName: string): void;
  }

}

declare module 'software.bernie.geckolib.animatable.GeoItem' {
  import { SingletonAnimatableInstanceCache } from 'software.bernie.geckolib.animatable.instance';
  import { GeoAnimatable } from 'software.bernie.geckolib.animatable';
  import { AnimatableManager } from 'software.bernie.geckolib.animation';
  import { ItemDisplayContext } from 'net.minecraft.world.item';

  interface ContextBasedAnimatableInstanceCache extends SingletonAnimatableInstanceCache {}
  class ContextBasedAnimatableInstanceCache extends SingletonAnimatableInstanceCache {
    constructor(animatable: GeoAnimatable);
    get currentContext(): ItemDisplayContext;
    getManagerForId(uniqueId: number): AnimatableManager<any>;
    getManagerForId<T extends GeoAnimatable>(var1: number): AnimatableManager<T>;
  }

}

declare module 'software.bernie.geckolib.animatable.instance' {
  import { GeoAnimatable } from 'software.bernie.geckolib.animatable';
  import { AnimatableManager } from 'software.bernie.geckolib.animation';
  import { DataTicket } from 'software.bernie.geckolib.constant.dataticket';

  class AnimatableInstanceCache {
    constructor(animatable: GeoAnimatable);
    addDataPoint<D>(uniqueId: number, dataTicket: DataTicket<D>, data: D): void;
    get renderProvider(): any;
    getDataPoint<D>(uniqueId: number, dataTicket: DataTicket<D>): D;
    getManagerForId<T extends GeoAnimatable>(var1: number): AnimatableManager<T>;
  }


  interface InstancedAnimatableInstanceCache extends AnimatableInstanceCache {}
  class InstancedAnimatableInstanceCache extends AnimatableInstanceCache {
    constructor(animatable: GeoAnimatable);
    getManagerForId(uniqueId: number): AnimatableManager<any>;
    getManagerForId<T extends GeoAnimatable>(var1: number): AnimatableManager<T>;
  }


  interface SingletonAnimatableInstanceCache extends AnimatableInstanceCache {}
  class SingletonAnimatableInstanceCache extends AnimatableInstanceCache {
    constructor(animatable: GeoAnimatable);
    getManagerForId(uniqueId: number): AnimatableManager<any>;
    getManagerForId<T extends GeoAnimatable>(var1: number): AnimatableManager<T>;
  }

}

declare module 'software.bernie.geckolib.animatable.stateless' {
  import { RawAnimation, AnimationController, AnimationState } from 'software.bernie.geckolib.animation';
  import { GeoAnimatable, GeoBlockEntity, GeoEntity, GeoReplacedEntity, SingletonGeoAnimatable } from 'software.bernie.geckolib.animatable';
  import { AnimationStateHandler } from 'software.bernie.geckolib.animation.AnimationController';
  import { Entity } from 'net.minecraft.world.entity';

  class StatelessAnimatable {
    handleClientAnimationPlay(animatable: GeoAnimatable, animatableId: number, animation: RawAnimation): void;
    handleClientAnimationStop(animatable: GeoAnimatable, animatableId: number, animName: string): void;
    playAndHoldAnimation(animation: string): void;
    playAnimation(animation: string): void;
    playAnimation(var1: RawAnimation): void;
    playLoopingAnimation(animation: string): void;
    stopAnimation(animation: RawAnimation): void;
    stopAnimation(var1: string): void;
  }


  interface StatelessAnimationController extends AnimationController<GeoAnimatable> {}
  class StatelessAnimationController extends AnimationController<GeoAnimatable> {
    constructor(animatable: GeoAnimatable, name: string, state: AnimationState<T>);
    get currentAnim(): RawAnimation;
    get stateHandler(): AnimationStateHandler<GeoAnimatable>;
    setCurrentAnimation(animation: RawAnimation): void;
  }


  interface StatelessGeoBlockEntity extends StatelessAnimatable, GeoBlockEntity {}
  class StatelessGeoBlockEntity extends StatelessAnimatable {
    playAnimation(animation: RawAnimation): void;
    playAnimation(animation: string): void;
    stopAnimation(animation: string): void;
    stopAnimation(animation: RawAnimation): void;
  }


  interface StatelessGeoEntity extends StatelessAnimatable, GeoEntity {}
  class StatelessGeoEntity extends StatelessAnimatable {
    playAnimation(animation: RawAnimation): void;
    playAnimation(animation: string): void;
    stopAnimation(animation: string): void;
    stopAnimation(animation: RawAnimation): void;
  }


  interface StatelessGeoObject extends StatelessAnimatable, GeoAnimatable {}
  class StatelessGeoObject extends StatelessAnimatable {
  }


  interface StatelessGeoReplacedEntity extends StatelessGeoSingletonAnimatable, GeoReplacedEntity {}
  class StatelessGeoReplacedEntity extends StatelessGeoSingletonAnimatable {
    playAndHoldAnimation(animation: string, relatedEntity: Entity): void;
    playAndHoldAnimation(animation: string, relatedEntity: Entity, instanceId: number): void;
    playAndHoldAnimation(animation: string): void;
    playAnimation(animation: string, relatedEntity: Entity): void;
    playAnimation(animation: RawAnimation, relatedEntity: Entity): void;
    playAnimation(animation: RawAnimation, relatedEntity: Entity, instanceId: number): void;
    playAnimation(animation: string, relatedEntity: Entity, instanceId: number): void;
    playAnimation(animation: string): void;
    playAnimation(animation: RawAnimation): void;
    playLoopingAnimation(animation: string, relatedEntity: Entity): void;
    playLoopingAnimation(animation: string, relatedEntity: Entity, instanceId: number): void;
    playLoopingAnimation(animation: string): void;
    stopAnimation(animation: RawAnimation, relatedEntity: Entity): void;
    stopAnimation(animation: string, relatedEntity: Entity): void;
    stopAnimation(animation: string, relatedEntity: Entity, instanceId: number): void;
    stopAnimation(animation: RawAnimation, relatedEntity: Entity, instanceId: number): void;
    stopAnimation(animation: RawAnimation): void;
    stopAnimation(animation: string): void;
  }


  interface StatelessGeoSingletonAnimatable extends StatelessAnimatable, SingletonGeoAnimatable {}
  class StatelessGeoSingletonAnimatable extends StatelessAnimatable {
    playAndHoldAnimation(animation: string, relatedEntity: Entity, instanceId: number): void;
    playAndHoldAnimation(animation: string): void;
    playAnimation(animation: string, relatedEntity: Entity, instanceId: number): void;
    playAnimation(animation: RawAnimation, relatedEntity: Entity, instanceId: number): void;
    playAnimation(animation: string): void;
    playAnimation(animation: RawAnimation): void;
    playLoopingAnimation(animation: string, relatedEntity: Entity, instanceId: number): void;
    playLoopingAnimation(animation: string): void;
    stopAnimation(animation: RawAnimation, relatedEntity: Entity, instanceId: number): void;
    stopAnimation(animation: string, relatedEntity: Entity, instanceId: number): void;
    stopAnimation(animation: RawAnimation): void;
    stopAnimation(animation: string): void;
  }

}

declare module 'software.bernie.geckolib.animation' {
  import { GeoAnimatable } from 'software.bernie.geckolib.animatable';
  import { Map, Queue, Collection, List } from 'java.util';
  import { BoneSnapshot } from 'software.bernie.geckolib.animation.state';
  import { DataTicket } from 'software.bernie.geckolib.constant.dataticket';
  import { AnimationStateHandler, SoundKeyframeHandler, ParticleKeyframeHandler, CustomKeyframeHandler, State } from 'software.bernie.geckolib.animation.AnimationController';
  import { Function } from 'java.util.function';
  import { Double, Enum } from 'java.lang';
  import { QueuedAnimation } from 'software.bernie.geckolib.animation.AnimationProcessor';
  import { BoneAnimationQueue, AnimationPoint } from 'software.bernie.geckolib.animation.keyframe';
  import { GeoModel } from 'software.bernie.geckolib.model';
  import { GeoBone, BakedGeoModel } from 'software.bernie.geckolib.cache.object';
  import { Double2DoubleFunction } from 'it.unimi.dsi.fastutil.doubles';
  import { JsonElement } from 'com.google.gson';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { LoopType } from 'software.bernie.geckolib.animation.Animation';
  import { Stage } from 'software.bernie.geckolib.animation.RawAnimation';

  class AnimatableManager<T extends GeoAnimatable = any> {
    constructor(animatable: GeoAnimatable);
    addController(controller: AnimationController): void;
    clearSnapshotCache(): void;
    get animationControllers(): Map<string, AnimationController<T>>;
    get boneSnapshotCollection(): Map<string, BoneSnapshot>;
    get firstTickTime(): number;
    get lastUpdateTime(): number;
    getData<D>(dataTicket: DataTicket<D>): D;
    isFirstTick(): boolean;
    removeController(name: string): void;
    setData<D>(dataTicket: DataTicket<D>, data: D): void;
    startedAt(time: number): void;
    stopTriggeredAnimation(animName: string): void;
    stopTriggeredAnimation(controllerName: string, animName: string): void;
    tryTriggerAnimation(animName: string): void;
    tryTriggerAnimation(controllerName: string, animName: string): void;
    updatedAt(updateTime: number): void;
  }


  class AnimationController<T extends GeoAnimatable = any> {
    constructor(animatable: T, animationHandler: AnimationStateHandler<T>);

    constructor(animatable: T, name: string, animationHandler: AnimationStateHandler<T>);

    constructor(animatable: T, transitionTickTime: number, animationHandler: AnimationStateHandler<T>);

    constructor(animatable2: T, name: string, transitionTickTime: number, animationHandler: AnimationStateHandler<T>);
    forceAnimationReset(): void;
    get animationSpeed(): number;
    get animationState(): State;
    get boneAnimationQueues(): Map<string, BoneAnimationQueue>;
    get currentAnimation(): QueuedAnimation;
    get currentRawAnimation(): RawAnimation;
    get name(): string;
    get stateHandler(): AnimationStateHandler<T>;
    get triggeredAnimation(): RawAnimation;
    hasAnimationFinished(): boolean;
    isPlayingTriggeredAnimation(): boolean;
    process(model: GeoModel<T>, state: AnimationState<T>, bones: Map<string, GeoBone>, snapshots: Map<string, BoneSnapshot>, seekTime: number, crashWhenCantFindBone: boolean): void;
    receiveTriggeredAnimations(): AnimationController<T>;
    set animationSpeed(speed: number);
    setAnimation(rawAnimation: RawAnimation): void;
    setAnimationSpeedHandler(speedModFunction: Function<T, number>): AnimationController<T>;
    setCustomInstructionKeyframeHandler(customInstructionHandler: CustomKeyframeHandler<T>): AnimationController<T>;
    setOverrideEasingType(easingTypeFunction: EasingType): AnimationController<T>;
    setOverrideEasingTypeFunction(easingType: Function<T, EasingType>): AnimationController<T>;
    setParticleKeyframeHandler(particleHandler: ParticleKeyframeHandler<T>): AnimationController<T>;
    setSoundKeyframeHandler(soundHandler: SoundKeyframeHandler<T>): AnimationController<T>;
    stop(): void;
    transitionLength(ticks: number): AnimationController<T>;
    triggerableAnim(name: string, animation: RawAnimation): AnimationController<T>;
    tryTriggerAnimation(animName: string): boolean;
  }


  class AnimationProcessor<T extends GeoAnimatable = any> {
    reloadAnimations: boolean;
    constructor(model: GeoModel<T>);
    buildAnimationQueue(animatable: T, rawAnimation: RawAnimation): Queue<QueuedAnimation>;
    get registeredBones(): Collection<GeoBone>;
    getBone(boneName: string): GeoBone;
    preAnimationSetup(animationState: AnimationState<T>, animTime: number): void;
    registerGeoBone(bone: GeoBone): void;
    setActiveModel(model: BakedGeoModel): void;
    tickAnimation(animatable: T, model: GeoModel<T>, animatableManager: AnimatableManager<T>, animTime: number, state: AnimationState<T>, crashWhenCantFindBone: boolean): void;
  }


  class AnimationState<T extends GeoAnimatable = any> {
    animationTick: number;
    constructor(animatable: T, limbSwing: number, limbSwingAmount: number, partialTick: number, isMoving: boolean);
    get animatable(): T;
    get animationTick(): number;
    get controller(): AnimationController<T>;
    get extraData(): Map<DataTicket<any>, any>;
    get limbSwing(): number;
    get limbSwingAmount(): number;
    get partialTick(): number;
    getData<D>(dataTicket: DataTicket<D>): D;
    isCurrentAnimation(animation: RawAnimation): boolean;
    isCurrentAnimationStage(name: string): boolean;
    isMoving(): boolean;
    resetCurrentAnimation(): void;
    setAndContinue(animation: RawAnimation): PlayState;
    setAnimation(animation: RawAnimation): void;
    setControllerSpeed(speed: number): void;
    setData<D>(dataTicket: DataTicket<D>, data: D): void;
    withController(controller: AnimationController<T>): AnimationState<T>;
  }


  interface ContextAwareAnimatableManager<T extends GeoAnimatable = any, C = any> extends AnimatableManager<T> {}
  class ContextAwareAnimatableManager<T extends GeoAnimatable = any, C = any> extends AnimatableManager<T> {
    constructor(animatable: GeoAnimatable);
    addController(controller: AnimationController): void;
    clearSnapshotCache(): void;
    get animationControllers(): Map<string, AnimationController<T>>;
    get boneSnapshotCollection(): Map<string, BoneSnapshot>;
    get currentContext(): C;
    get firstTickTime(): number;
    get lastUpdateTime(): number;
    getData<D>(dataTicket: DataTicket<D>): D;
    getManagerForContext(context: C): AnimatableManager<T>;
    isFirstTick(): boolean;
    removeController(name: string): void;
    setData<D>(dataTicket: DataTicket<D>, data: D): void;
    startedAt(time: number): void;
    stopTriggeredAnimation(animName: string): void;
    stopTriggeredAnimation(controllerName: string, animName: string): void;
    tryTriggerAnimation(animName: string): void;
    tryTriggerAnimation(controllerName: string, animName: string): void;
    updatedAt(updateTime: number): void;
  }


  class EasingType {
    static readonly EASING_TYPES: Map;
    static readonly LINEAR: EasingType;
    static readonly STEP: EasingType;
    static readonly EASE_IN_SINE: EasingType;
    static readonly EASE_OUT_SINE: EasingType;
    static readonly EASE_IN_OUT_SINE: EasingType;
    static readonly EASE_IN_QUAD: EasingType;
    static readonly EASE_OUT_QUAD: EasingType;
    static readonly EASE_IN_OUT_QUAD: EasingType;
    static readonly EASE_IN_CUBIC: EasingType;
    static readonly EASE_OUT_CUBIC: EasingType;
    static readonly EASE_IN_OUT_CUBIC: EasingType;
    static readonly EASE_IN_QUART: EasingType;
    static readonly EASE_OUT_QUART: EasingType;
    static readonly EASE_IN_OUT_QUART: EasingType;
    static readonly EASE_IN_QUINT: EasingType;
    static readonly EASE_OUT_QUINT: EasingType;
    static readonly EASE_IN_OUT_QUINT: EasingType;
    static readonly EASE_IN_EXPO: EasingType;
    static readonly EASE_OUT_EXPO: EasingType;
    static readonly EASE_IN_OUT_EXPO: EasingType;
    static readonly EASE_IN_CIRC: EasingType;
    static readonly EASE_OUT_CIRC: EasingType;
    static readonly EASE_IN_OUT_CIRC: EasingType;
    static readonly EASE_IN_BACK: EasingType;
    static readonly EASE_OUT_BACK: EasingType;
    static readonly EASE_IN_OUT_BACK: EasingType;
    static readonly EASE_IN_ELASTIC: EasingType;
    static readonly EASE_OUT_ELASTIC: EasingType;
    static readonly EASE_IN_OUT_ELASTIC: EasingType;
    static readonly EASE_IN_BOUNCE: EasingType;
    static readonly EASE_OUT_BOUNCE: EasingType;
    static readonly EASE_IN_OUT_BOUNCE: EasingType;
    static readonly CATMULLROM: EasingType;
    apply(animationPoint: AnimationPoint): number;
    apply(animationPoint: AnimationPoint, easingValue: number, lerpValue: number): number;
    static back(n: number): Double2DoubleFunction;
    static bounce(n: number): Double2DoubleFunction;
    buildTransformer(var1: number): Double2DoubleFunction;
    static catmullRom(n: number): number;
    static circle(n: number): number;
    static cubic(n: number): number;
    static easeIn(functionParameter: Double2DoubleFunction): Double2DoubleFunction;
    static easeInOut(functionParameter: Double2DoubleFunction): Double2DoubleFunction;
    static easeOut(functionParameter: Double2DoubleFunction): Double2DoubleFunction;
    static elastic(n: number): Double2DoubleFunction;
    static exp(n: number): number;
    static fromJson(json: JsonElement): EasingType;
    static fromString(name: string): EasingType;
    static lerpWithOverride(animationPoint: AnimationPoint, override: EasingType): number;
    static linear(functionParameter: Double2DoubleFunction): Double2DoubleFunction;
    static linear(n: number): number;
    static pow(n: number): Double2DoubleFunction;
    static quadratic(n: number): number;
    static register(name: string, easingType: EasingType): EasingType;
    static sine(n: number): number;
    static step(n: number): Double2DoubleFunction;
    static stepNonNegative(functionParameter: Double2DoubleFunction): Double2DoubleFunction;
    static stepPositive(functionParameter: Double2DoubleFunction): Double2DoubleFunction;
  }


  interface PlayState extends Enum<PlayState> {}
  class PlayState extends Enum<PlayState> {
    static readonly CONTINUE: PlayState;
    static readonly STOP: PlayState;
    static valueOf(name: string): PlayState;
    static values(): PlayState[];
  }


  class RawAnimation {
    static readonly STREAM_CODEC: StreamCodec;
    static begin(): RawAnimation;
    static copyOf(other: RawAnimation): RawAnimation;
    equals(obj: any): boolean;
    get animationStages(): Stage[];
    get stageCount(): number;
    hashCode(): number;
    then(animationName: string, loopType: LoopType): RawAnimation;
    thenLoop(animationName: string): RawAnimation;
    thenPlay(animationName: string): RawAnimation;
    thenPlayAndHold(animation: string): RawAnimation;
    thenPlayXTimes(animationName: string, playCount: number): RawAnimation;
    thenWait(ticks: number): RawAnimation;
  }

}

declare module 'software.bernie.geckolib.animation.Animation' {
  import { Map } from 'java.util';
  import { GeoAnimatable } from 'software.bernie.geckolib.animatable';
  import { AnimationController, Animation } from 'software.bernie.geckolib.animation';
  import { JsonElement } from 'com.google.gson';

  class LoopType {
    static readonly LOOP_TYPES: Map;
    static readonly DEFAULT: LoopType;
    static readonly PLAY_ONCE: LoopType;
    static readonly HOLD_ON_LAST_FRAME: LoopType;
    static readonly LOOP: LoopType;
    static fromJson(json: JsonElement): LoopType;
    static fromString(name: string): LoopType;
    get id(): string;
    static register(name: string, loopType: LoopType): LoopType;
    shouldPlayAgain(var1: GeoAnimatable, var2: AnimationController<GeoAnimatable>, var3: Animation): boolean;
  }

}

declare module 'software.bernie.geckolib.animation.AnimationController' {
  import { PlayState, AnimationState } from 'software.bernie.geckolib.animation';
  import { SoundKeyframeEvent, ParticleKeyframeEvent, CustomInstructionKeyframeEvent } from 'software.bernie.geckolib.animation.keyframe.event';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class AnimationStateHandler<A extends GeoAnimatable = any> {
    handle(var1: AnimationState<A>): PlayState;
  }


  class SoundKeyframeHandler<A extends GeoAnimatable = any> {
    handle(var1: SoundKeyframeEvent<A>): void;
  }


  class ParticleKeyframeHandler<A extends GeoAnimatable = any> {
    handle(var1: ParticleKeyframeEvent<A>): void;
  }


  class CustomKeyframeHandler<A extends GeoAnimatable = any> {
    handle(var1: CustomInstructionKeyframeEvent<A>): void;
  }


  interface State extends Enum<State> {}
  class State extends Enum<State> {
    static readonly RUNNING: State;
    static readonly TRANSITIONING: State;
    static readonly PAUSED: State;
    static readonly STOPPED: State;
    static valueOf(name: string): State;
    static values(): State[];
  }

}

declare module 'software.bernie.geckolib.animation.EasingType' {
  import { EasingType } from 'software.bernie.geckolib.animation';
  import { Double2DoubleFunction } from 'it.unimi.dsi.fastutil.doubles';
  import { Double } from 'java.lang';
  import { AnimationPoint } from 'software.bernie.geckolib.animation.keyframe';

  interface CatmullRomEasing extends EasingType {}
  class CatmullRomEasing extends EasingType {
    apply(animationPoint: AnimationPoint, easingValue: number, lerpValue: number): number;
    apply(animationPoint: AnimationPoint): number;
    buildTransformer(value: number): Double2DoubleFunction;
    static getPointOnSpline(delta: number, p0: number, p1: number, p2: number, p3: number): number;
  }

}

declare module 'software.bernie.geckolib.animation.keyframe' {
  import { LinkedList } from 'java.util';

  interface AnimationPointQueue extends LinkedList<AnimationPoint> {}
  class AnimationPointQueue extends LinkedList<AnimationPoint> {
  }

}

declare module 'software.bernie.geckolib.animation.keyframe.event.builtin' {
  import { SoundKeyframeHandler } from 'software.bernie.geckolib.animation.AnimationController';
  import { SoundKeyframeEvent } from 'software.bernie.geckolib.animation.keyframe.event';

  interface AutoPlayingSoundKeyframeHandler<A extends GeoAnimatable = any> extends SoundKeyframeHandler<A> {}
  class AutoPlayingSoundKeyframeHandler<A extends GeoAnimatable = any> extends SoundKeyframeHandler<A> {
    handle(event: SoundKeyframeEvent<A>): void;
  }

}

declare module 'software.bernie.geckolib.animation.keyframe.event' {
  import { CustomInstructionKeyframeData, ParticleKeyframeData, SoundKeyframeData } from 'software.bernie.geckolib.animation.keyframe.event.data';
  import { AnimationController } from 'software.bernie.geckolib.animation';

  interface CustomInstructionKeyframeEvent<T extends GeoAnimatable = any> extends KeyFrameEvent<T, CustomInstructionKeyframeData> {}
  class CustomInstructionKeyframeEvent<T extends GeoAnimatable = any> extends KeyFrameEvent<T, CustomInstructionKeyframeData> {
    constructor(entity: T, animationTick: number, controller: AnimationController<T>, customInstructionKeyframeData: CustomInstructionKeyframeData);
    get keyframeData(): CustomInstructionKeyframeData;
  }


  class KeyFrameEvent<T extends GeoAnimatable = any, E extends KeyFrameData = any> {
    constructor(animatable: T, animationTick: number, controller: AnimationController<T>, eventKeyFrame: E);
    get animatable(): T;
    get animationTick(): number;
    get controller(): AnimationController<T>;
    get keyframeData(): E;
  }


  interface ParticleKeyframeEvent<T extends GeoAnimatable = any> extends KeyFrameEvent<T, ParticleKeyframeData> {}
  class ParticleKeyframeEvent<T extends GeoAnimatable = any> extends KeyFrameEvent<T, ParticleKeyframeData> {
    constructor(animatable: T, animationTick: number, controller: AnimationController<T>, particleKeyFrameData: ParticleKeyframeData);
    get keyframeData(): ParticleKeyframeData;
  }


  interface SoundKeyframeEvent<T extends GeoAnimatable = any> extends KeyFrameEvent<T, SoundKeyframeData> {}
  class SoundKeyframeEvent<T extends GeoAnimatable = any> extends KeyFrameEvent<T, SoundKeyframeData> {
    constructor(entity: T, animationTick: number, controller: AnimationController<T>, keyFrameData: SoundKeyframeData);
    get keyframeData(): SoundKeyframeData;
  }

}

declare module 'software.bernie.geckolib.animation.keyframe.event.data' {
  import { Double } from 'java.lang';

  interface CustomInstructionKeyframeData extends KeyFrameData {}
  class CustomInstructionKeyframeData extends KeyFrameData {
    constructor(startTick: number, instructions: string);
    get instructions(): string;
    hashCode(): number;
  }


  class KeyFrameData {
    constructor(startTick: number);
    equals(obj: any): boolean;
    get startTick(): number;
    hashCode(): number;
  }


  interface ParticleKeyframeData extends KeyFrameData {}
  class ParticleKeyframeData extends KeyFrameData {
    constructor(startTick: number, effect: string, locator: string, script: string);
    get effect(): string;
    get locator(): string;
    hashCode(): number;
    script(): string;
  }


  interface SoundKeyframeData extends KeyFrameData {}
  class SoundKeyframeData extends KeyFrameData {
    constructor(startTick: number, sound: string);
    get sound(): string;
    hashCode(): number;
  }

}

declare module 'software.bernie.geckolib.animation.state' {
  import { GeoBone } from 'software.bernie.geckolib.cache.object';

  class BoneSnapshot {
    constructor(bone: GeoBone);
    static copy(snapshot: BoneSnapshot): BoneSnapshot;
    equals(obj: any): boolean;
    get bone(): GeoBone;
    get lastResetPositionTick(): number;
    get lastResetRotationTick(): number;
    get lastResetScaleTick(): number;
    get offsetX(): number;
    get offsetY(): number;
    get offsetZ(): number;
    get rotX(): number;
    get rotY(): number;
    get rotZ(): number;
    get scaleX(): number;
    get scaleY(): number;
    get scaleZ(): number;
    hashCode(): number;
    isPosAnimInProgress(): boolean;
    isRotAnimInProgress(): boolean;
    isScaleAnimInProgress(): boolean;
    startPosAnim(): void;
    startRotAnim(): void;
    startScaleAnim(): void;
    stopPosAnim(tick: number): void;
    stopRotAnim(tick: number): void;
    stopScaleAnim(tick: number): void;
    updateOffset(offsetX: number, offsetY: number, offsetZ: number): void;
    updateRotation(rotX: number, rotY: number, rotZ: number): void;
    updateScale(scaleX: number, scaleY: number, scaleZ: number): void;
  }

}

declare module 'software.bernie.geckolib.cache' {
  import { SavedData } from 'net.minecraft.world.level.saveddata';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';

  interface AnimatableIdCache extends SavedData {}
  class AnimatableIdCache extends SavedData {
    static getFreeId(level: ServerLevel): number;
    save(tag: CompoundTag, registryLookup: Provider): CompoundTag;
  }

}

declare module 'software.bernie.geckolib.cache.object' {
  import { Boolean, Double } from 'java.lang';
  import { BoneSnapshot } from 'software.bernie.geckolib.animation.state';
  import { List } from 'java.util';
  import { Matrix4f, Matrix3f, Vector3d } from 'org.joml';

  class GeoBone {
    constructor(parent: GeoBone, name: string, mirror: boolean, inflate: number, dontRender: boolean, reset: boolean);
    addRotationOffsetFromBone(source: GeoBone): void;
    equals(obj: any): boolean;
    get childBones(): GeoBone[];
    get cubes(): GeoCube[];
    get inflate(): number;
    get initialSnapshot(): BoneSnapshot;
    get localPosition(): Vector3d;
    get localSpaceMatrix(): Matrix4f;
    get mirror(): boolean;
    get modelPosition(): Vector3d;
    get modelRotationMatrix(): Matrix4f;
    get modelSpaceMatrix(): Matrix4f;
    get name(): string;
    get parent(): GeoBone;
    get pivotX(): number;
    get pivotY(): number;
    get pivotZ(): number;
    get posX(): number;
    get posY(): number;
    get posZ(): number;
    get positionVector(): Vector3d;
    get reset(): boolean;
    get rotX(): number;
    get rotY(): number;
    get rotZ(): number;
    get rotationVector(): Vector3d;
    get scaleVector(): Vector3d;
    get scaleX(): number;
    get scaleY(): number;
    get scaleZ(): number;
    get worldPosition(): Vector3d;
    get worldSpaceMatrix(): Matrix4f;
    get worldSpaceNormal(): Matrix3f;
    hasPositionChanged(): boolean;
    hasRotationChanged(): boolean;
    hasScaleChanged(): boolean;
    hashCode(): number;
    isHidden(): boolean;
    isHidingChildren(): boolean;
    isTrackingMatrices(): boolean;
    markPositionAsChanged(): void;
    markRotationAsChanged(): void;
    markScaleAsChanged(): void;
    resetStateChanges(): void;
    saveInitialSnapshot(): void;
    saveSnapshot(): BoneSnapshot;
    set localSpaceMatrix(matrix: Matrix4f);
    set modelPosition(pos: Vector3d);
    set modelSpaceMatrix(matrix: Matrix4f);
    set pivotX(value: number);
    set pivotY(value: number);
    set pivotZ(value: number);
    set posX(value: number);
    set posY(value: number);
    set posZ(value: number);
    set rotX(value: number);
    set rotY(value: number);
    set rotZ(value: number);
    set scaleX(value: number);
    set scaleY(value: number);
    set scaleZ(value: number);
    set worldSpaceMatrix(matrix: Matrix4f);
    set worldSpaceNormal(matrix: Matrix3f);
    setChildrenHidden(hideChildren: boolean): void;
    setHidden(hidden: boolean): void;
    setTrackingMatrices(trackingMatrices: boolean): void;
    shouldNeverRender(): boolean;
    updatePivot(pivotX: number, pivotY: number, pivotZ: number): void;
    updatePosition(posX: number, posY: number, posZ: number): void;
    updateRotation(xRot: number, yRot: number, zRot: number): void;
    updateScale(scaleX: number, scaleY: number, scaleZ: number): void;
  }

}

declare module 'software.bernie.geckolib.cache.texture' {
  import { SimpleTexture, AbstractTexture } from 'net.minecraft.client.renderer.texture';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ResourceManager } from 'net.minecraft.server.packs.resources';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { NativeImage } from 'com.mojang.blaze3d.platform';

  interface AnimatableTexture extends SimpleTexture {}
  class AnimatableTexture extends SimpleTexture {
    constructor(location: ResourceLocation);
    isAnimated(): boolean;
    load(manager: ResourceManager): void;
    static setAndUpdate(texturePath: ResourceLocation): void;
    static setAndUpdate(texturePath: ResourceLocation, frameTick: number): void;
    setAnimationFrame(tick: number): void;
  }


  interface AutoGlowingTexture extends GeoAbstractTexture {}
  class AutoGlowingTexture extends GeoAbstractTexture {
    static PRINT_DEBUG_IMAGES: boolean;
    constructor(originalLocation: ResourceLocation, location: ResourceLocation);
    static getEmissiveResource(baseResource: ResourceLocation): ResourceLocation;
    static getOutlineRenderType(texture: ResourceLocation): RenderType;
    static getRenderType(texture: ResourceLocation): RenderType;
  }


  interface GeoAbstractTexture extends AbstractTexture {}
  class GeoAbstractTexture extends AbstractTexture {
    static appendToPath(location: ResourceLocation, suffix: string): ResourceLocation;
    load(resourceManager: ResourceManager): void;
    static uploadSimple(texture: number, image: NativeImage, blur: boolean, clamp: boolean): void;
  }

}

declare module 'software.bernie.geckolib.constant.dataticket' {
  import { Class, Double, Float, Boolean, Integer, Enum } from 'java.lang';
  import { Map } from 'java.util';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { ResourceLocation } from 'net.minecraft.resources';

  class DataTicket<D = any> {
    constructor(id: string, objectType: Class<D>);
    getData<D>(dataMap: Map<DataTicket<any>, any>): D;
    hashCode(): number;
    id(): string;
    objectType(): Class<D>;
  }


  interface SerializableDataTicket<D = any> extends DataTicket<D> {}
  class SerializableDataTicket<D = any> extends DataTicket<D> {
    static readonly STREAM_CODEC: StreamCodec;
    constructor(id: string, objectType: Class<D>);
    static ofBoolean(id: ResourceLocation): SerializableDataTicket<boolean>;
    static ofDouble(id: ResourceLocation): SerializableDataTicket<number>;
    static ofEnum<E extends Enum<E>>(id: ResourceLocation, enumClass: Class<E>, buf: RegistryFriendlyByteBuf, buf: RegistryFriendlyByteBuf, data: E): SerializableDataTicket<E>;
    static ofFloat(id: ResourceLocation): SerializableDataTicket<number>;
    static ofInt(id: ResourceLocation): SerializableDataTicket<number>;
    static ofString(id: ResourceLocation): SerializableDataTicket<string>;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, D>;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, number>;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, number>;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, boolean>;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, number>;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, string>;
  }

}

declare module 'software.bernie.geckolib.constant' {
  import { DataTicket, SerializableDataTicket } from 'software.bernie.geckolib.constant.dataticket';
  import { RawAnimation, AnimationController, AnimationState } from 'software.bernie.geckolib.animation';
  import { GeoAnimatable } from 'software.bernie.geckolib.animatable';
  import { BiFunction, Function } from 'java.util.function';
  import { Boolean } from 'java.lang';
  import { LivingEntity, Mob, Entity } from 'net.minecraft.world.entity';

  class DataTickets {
    static readonly BLOCK_ENTITY: DataTicket;
    static readonly ITEMSTACK: DataTicket;
    static readonly ENTITY: DataTicket;
    static readonly EQUIPMENT_SLOT: DataTicket;
    static readonly ENTITY_MODEL_DATA: DataTicket;
    static readonly TICK: DataTicket;
    static readonly ITEM_RENDER_PERSPECTIVE: DataTicket;
    static readonly ANIM_STATE: SerializableDataTicket;
    static readonly ANIM: SerializableDataTicket;
    static readonly USE_TICKS: SerializableDataTicket;
    static readonly ACTIVE: SerializableDataTicket;
    static readonly OPEN: SerializableDataTicket;
    static readonly CLOSED: SerializableDataTicket;
    static readonly DIRECTION: SerializableDataTicket;
    static byName(id: string): SerializableDataTicket<any>;
    static registerSerializable<D>(ticket: SerializableDataTicket<D>): SerializableDataTicket<D>;
  }


  class DefaultAnimations {
    static readonly ITEM_ON_USE: RawAnimation;
    static readonly IDLE: RawAnimation;
    static readonly IDLE_FLYING: RawAnimation;
    static readonly LIVING: RawAnimation;
    static readonly SPAWN: RawAnimation;
    static readonly DIE: RawAnimation;
    static readonly INTERACT: RawAnimation;
    static readonly DEPLOY: RawAnimation;
    static readonly REST: RawAnimation;
    static readonly SIT: RawAnimation;
    static readonly WALK: RawAnimation;
    static readonly SWIM: RawAnimation;
    static readonly RUN: RawAnimation;
    static readonly DRIVE: RawAnimation;
    static readonly FLY: RawAnimation;
    static readonly CRAWL: RawAnimation;
    static readonly JUMP: RawAnimation;
    static readonly SNEAK: RawAnimation;
    static readonly DIVE: RawAnimation;
    static readonly ATTACK_CAST: RawAnimation;
    static readonly ATTACK_SWING: RawAnimation;
    static readonly ATTACK_THROW: RawAnimation;
    static readonly ATTACK_PUNCH: RawAnimation;
    static readonly ATTACK_BITE: RawAnimation;
    static readonly ATTACK_SLAM: RawAnimation;
    static readonly ATTACK_STOMP: RawAnimation;
    static readonly ATTACK_STRIKE: RawAnimation;
    static readonly ATTACK_FLYING_ATTACK: RawAnimation;
    static readonly ATTACK_SHOOT: RawAnimation;
    static readonly ATTACK_BLOCK: RawAnimation;
    static readonly ATTACK_CHARGE: RawAnimation;
    static readonly ATTACK_CHARGE_END: RawAnimation;
    static readonly ATTACK_POWERUP: RawAnimation;
    static basicPredicateController<T extends GeoAnimatable>(animatable: T, optionA: RawAnimation, optionB: RawAnimation, predicate: BiFunction<T, AnimationState<T>, boolean>): AnimationController<T>;
    static genericAttackAnimation<T extends LivingEntity>(animatable: T, attackAnimation: RawAnimation): AnimationController<T>;
    static genericDeathController<T extends LivingEntity>(animatable: T): AnimationController<T>;
    static genericFlyController<T extends GeoAnimatable>(animatable: T): AnimationController<T>;
    static genericFlyIdleController<T extends GeoAnimatable>(animatable: T): AnimationController<T>;
    static genericIdleController<T extends GeoAnimatable>(animatable: T): AnimationController<T>;
    static genericLivingController<T extends GeoAnimatable>(animatable: T): AnimationController<T>;
    static genericSwimController<T extends GeoAnimatable>(entity: T): AnimationController<T>;
    static genericSwimIdleController<T extends GeoAnimatable>(animatable: T): AnimationController<T>;
    static genericWalkController<T extends GeoAnimatable>(animatable: T): AnimationController<T>;
    static genericWalkFlyIdleController<T extends Mob>(entity: T): AnimationController<T>;
    static genericWalkIdleController<T extends GeoAnimatable>(animatable: T): AnimationController<T>;
    static genericWalkRunIdleController<T extends Entity>(entity: T): AnimationController<T>;
    static getSpawnController<T extends GeoAnimatable>(animatable: T, objectSupplier: Function<AnimationState<T>, any>, ticks: number): AnimationController<T>;
    static triggerOnlyController<T extends GeoAnimatable>(animatable: T): AnimationController<T>;
  }

}

declare module 'software.bernie.geckolib.event' {
  import { GeckoLibEvents } from 'software.bernie.geckolib.service';
  import { GeoBlockRenderer, GeoArmorRenderer, GeoEntityRenderer, GeoReplacedEntityRenderer, GeoItemRenderer, GeoObjectRenderer, GeoRenderer } from 'software.bernie.geckolib.renderer';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { BakedGeoModel } from 'software.bernie.geckolib.cache.object';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';

  interface GeckoLibEventsNeoForge extends GeckoLibEvents {}
  class GeckoLibEventsNeoForge extends GeckoLibEvents {
    fireArmorPostRender(renderer: GeoArmorRenderer<any>, poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number): void;
    fireArmorPreRender(renderer: GeoArmorRenderer<any>, poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number): boolean;
    fireBlockPostRender(renderer: GeoBlockRenderer<any>, poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number): void;
    fireBlockPreRender(renderer: GeoBlockRenderer<any>, poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number): boolean;
    fireCompileArmorRenderLayers(renderer: GeoArmorRenderer<any>): void;
    fireCompileBlockRenderLayers(renderer: GeoBlockRenderer<any>): void;
    fireCompileEntityRenderLayers(renderer: GeoEntityRenderer<any>): void;
    fireCompileItemRenderLayers(renderer: GeoItemRenderer<any>): void;
    fireCompileObjectRenderLayers(renderer: GeoObjectRenderer<any>): void;
    fireCompileReplacedEntityRenderLayers(renderer: GeoReplacedEntityRenderer<any, any>): void;
    fireEntityPostRender(renderer: GeoEntityRenderer<any>, poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number): void;
    fireEntityPreRender(renderer: GeoEntityRenderer<any>, poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number): boolean;
    fireItemPostRender(renderer: GeoItemRenderer<any>, poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number): void;
    fireItemPreRender(renderer: GeoItemRenderer<any>, poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number): boolean;
    fireObjectPostRender(renderer: GeoObjectRenderer<any>, poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number): void;
    fireObjectPreRender(renderer: GeoObjectRenderer<any>, poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number): boolean;
    fireReplacedEntityPostRender(renderer: GeoReplacedEntityRenderer<any, any>, poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number): void;
    fireReplacedEntityPreRender(renderer: GeoReplacedEntityRenderer<any, any>, poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number): boolean;
  }


  class GeoRenderEvent {
    get renderer(): GeoRenderer<any>;
  }

}

declare module 'software.bernie.geckolib.event.GeoRenderEvent' {
  import { Event } from 'net.neoforged.bus.api';
  import { GeoRenderEvent } from 'software.bernie.geckolib.event';
  import { GeoReplacedEntityRenderer, GeoObjectRenderer, GeoItemRenderer, GeoEntityRenderer, GeoBlockRenderer, GeoArmorRenderer } from 'software.bernie.geckolib.renderer';
  import { Entity as net_minecraft_world_entity_Entity, EquipmentSlot } from 'net.minecraft.world.entity';
  import { ItemStack } from 'net.minecraft.world.item';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';

  interface ReplacedEntity extends GeoRenderEvent, Event {}
  class ReplacedEntity extends GeoRenderEvent {
    constructor(renderer: GeoReplacedEntityRenderer<any, any>);
    get renderer(): GeoReplacedEntityRenderer<any, any>;
    get replacedEntity(): net_minecraft_world_entity_Entity;
  }


  interface Object extends GeoRenderEvent, Event {}
  class Object extends GeoRenderEvent {
    constructor(renderer: GeoObjectRenderer<any>);
    get renderer(): GeoObjectRenderer<any>;
  }


  interface Item extends GeoRenderEvent, Event {}
  class Item extends GeoRenderEvent {
    constructor(renderer: GeoItemRenderer<any>);
    get itemStack(): ItemStack;
    get renderer(): GeoItemRenderer<any>;
  }


  interface Entity extends GeoRenderEvent, Event {}
  class Entity extends GeoRenderEvent {
    constructor(renderer: GeoEntityRenderer<any>);
    get entity(): net_minecraft_world_entity_Entity;
    get renderer(): GeoEntityRenderer<any>;
  }


  interface Block extends GeoRenderEvent, Event {}
  class Block extends GeoRenderEvent {
    constructor(renderer: GeoBlockRenderer<any>);
    get blockEntity(): BlockEntity;
    get renderer(): GeoBlockRenderer<any>;
  }


  interface Armor extends GeoRenderEvent, Event {}
  class Armor extends GeoRenderEvent {
    constructor(renderer: GeoArmorRenderer<any>);
    get entity(): net_minecraft_world_entity_Entity;
    get equipmentSlot(): EquipmentSlot;
    get itemStack(): ItemStack;
    get renderer(): GeoArmorRenderer<any>;
  }

}

declare module 'software.bernie.geckolib.event.GeoRenderEvent.ReplacedEntity' {
  import { ReplacedEntity } from 'software.bernie.geckolib.event.GeoRenderEvent';
  import { GeoReplacedEntityRenderer } from 'software.bernie.geckolib.renderer';
  import { GeoRenderLayer } from 'software.bernie.geckolib.renderer.layer';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { BakedGeoModel } from 'software.bernie.geckolib.cache.object';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { ICancellableEvent } from 'net.neoforged.bus.api';

  interface CompileRenderLayers extends ReplacedEntity {}
  class CompileRenderLayers extends ReplacedEntity {
    constructor(renderer: GeoReplacedEntityRenderer<any, any>);
    addLayer(renderLayer: GeoRenderLayer): void;
  }


  interface Post extends ReplacedEntity {}
  class Post extends ReplacedEntity {
    constructor(renderer: GeoReplacedEntityRenderer<any, any>, poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number);
    get bufferSource(): MultiBufferSource;
    get model(): BakedGeoModel;
    get packedLight(): number;
    get partialTick(): number;
    get poseStack(): PoseStack;
  }


  interface Pre extends ICancellableEvent, ReplacedEntity {}
  class Pre extends ICancellableEvent {
    constructor(renderer: GeoReplacedEntityRenderer<any, any>, poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number);
    get bufferSource(): MultiBufferSource;
    get model(): BakedGeoModel;
    get packedLight(): number;
    get partialTick(): number;
    get poseStack(): PoseStack;
  }

}

declare module 'software.bernie.geckolib.event.GeoRenderEvent.Object' {
  import { Object } from 'software.bernie.geckolib.event.GeoRenderEvent';
  import { GeoObjectRenderer } from 'software.bernie.geckolib.renderer';
  import { GeoRenderLayer } from 'software.bernie.geckolib.renderer.layer';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { BakedGeoModel } from 'software.bernie.geckolib.cache.object';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { ICancellableEvent } from 'net.neoforged.bus.api';

  interface CompileRenderLayers extends Object {}
  class CompileRenderLayers extends Object {
    constructor(renderer: GeoObjectRenderer<any>);
    addLayer(renderLayer: GeoRenderLayer): void;
  }


  interface Post extends Object {}
  class Post extends Object {
    constructor(renderer: GeoObjectRenderer<any>, poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number);
    get bufferSource(): MultiBufferSource;
    get model(): BakedGeoModel;
    get packedLight(): number;
    get partialTick(): number;
    get poseStack(): PoseStack;
  }


  interface Pre extends ICancellableEvent, Object {}
  class Pre extends ICancellableEvent {
    constructor(renderer: GeoObjectRenderer<any>, poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number);
    get bufferSource(): MultiBufferSource;
    get model(): BakedGeoModel;
    get packedLight(): number;
    get partialTick(): number;
    get poseStack(): PoseStack;
  }

}

declare module 'software.bernie.geckolib.event.GeoRenderEvent.Item' {
  import { Item } from 'software.bernie.geckolib.event.GeoRenderEvent';
  import { GeoItemRenderer } from 'software.bernie.geckolib.renderer';
  import { GeoRenderLayer } from 'software.bernie.geckolib.renderer.layer';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { BakedGeoModel } from 'software.bernie.geckolib.cache.object';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { ICancellableEvent } from 'net.neoforged.bus.api';

  interface CompileRenderLayers extends Item {}
  class CompileRenderLayers extends Item {
    constructor(renderer: GeoItemRenderer<any>);
    addLayer(renderLayer: GeoRenderLayer): void;
  }


  interface Post extends Item {}
  class Post extends Item {
    constructor(renderer: GeoItemRenderer<any>, poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number);
    get bufferSource(): MultiBufferSource;
    get model(): BakedGeoModel;
    get packedLight(): number;
    get partialTick(): number;
    get poseStack(): PoseStack;
  }


  interface Pre extends ICancellableEvent, Item {}
  class Pre extends ICancellableEvent {
    constructor(renderer: GeoItemRenderer<any>, poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number);
    get bufferSource(): MultiBufferSource;
    get model(): BakedGeoModel;
    get packedLight(): number;
    get partialTick(): number;
    get poseStack(): PoseStack;
  }

}

declare module 'software.bernie.geckolib.event.GeoRenderEvent.Entity' {
  import { Entity } from 'software.bernie.geckolib.event.GeoRenderEvent';
  import { GeoEntityRenderer } from 'software.bernie.geckolib.renderer';
  import { GeoRenderLayer } from 'software.bernie.geckolib.renderer.layer';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { BakedGeoModel } from 'software.bernie.geckolib.cache.object';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { ICancellableEvent } from 'net.neoforged.bus.api';

  interface CompileRenderLayers extends Entity {}
  class CompileRenderLayers extends Entity {
    constructor(renderer: GeoEntityRenderer<any>);
    addLayer(renderLayer: GeoRenderLayer): void;
  }


  interface Post extends Entity {}
  class Post extends Entity {
    constructor(renderer: GeoEntityRenderer<any>, poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number);
    get bufferSource(): MultiBufferSource;
    get model(): BakedGeoModel;
    get packedLight(): number;
    get partialTick(): number;
    get poseStack(): PoseStack;
  }


  interface Pre extends ICancellableEvent, Entity {}
  class Pre extends ICancellableEvent {
    constructor(renderer: GeoEntityRenderer<any>, poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number);
    get bufferSource(): MultiBufferSource;
    get model(): BakedGeoModel;
    get packedLight(): number;
    get partialTick(): number;
    get poseStack(): PoseStack;
  }

}

declare module 'software.bernie.geckolib.event.GeoRenderEvent.Block' {
  import { Block } from 'software.bernie.geckolib.event.GeoRenderEvent';
  import { GeoBlockRenderer } from 'software.bernie.geckolib.renderer';
  import { GeoRenderLayer } from 'software.bernie.geckolib.renderer.layer';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { BakedGeoModel } from 'software.bernie.geckolib.cache.object';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { ICancellableEvent } from 'net.neoforged.bus.api';

  interface CompileRenderLayers extends Block {}
  class CompileRenderLayers extends Block {
    constructor(renderer: GeoBlockRenderer<any>);
    addLayer(renderLayer: GeoRenderLayer): void;
  }


  interface Post extends Block {}
  class Post extends Block {
    constructor(renderer: GeoBlockRenderer<any>, poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number);
    get bufferSource(): MultiBufferSource;
    get model(): BakedGeoModel;
    get packedLight(): number;
    get partialTick(): number;
    get poseStack(): PoseStack;
  }


  interface Pre extends ICancellableEvent, Block {}
  class Pre extends ICancellableEvent {
    constructor(renderer: GeoBlockRenderer<any>, poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number);
    get bufferSource(): MultiBufferSource;
    get model(): BakedGeoModel;
    get packedLight(): number;
    get partialTick(): number;
    get poseStack(): PoseStack;
  }

}

declare module 'software.bernie.geckolib.event.GeoRenderEvent.Armor' {
  import { Armor } from 'software.bernie.geckolib.event.GeoRenderEvent';
  import { GeoArmorRenderer } from 'software.bernie.geckolib.renderer';
  import { GeoRenderLayer } from 'software.bernie.geckolib.renderer.layer';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { BakedGeoModel } from 'software.bernie.geckolib.cache.object';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { ICancellableEvent } from 'net.neoforged.bus.api';

  interface CompileRenderLayers extends Armor {}
  class CompileRenderLayers extends Armor {
    constructor(renderer: GeoArmorRenderer<any>);
    addLayer(renderLayer: GeoRenderLayer): void;
  }


  interface Post extends Armor {}
  class Post extends Armor {
    constructor(renderer: GeoArmorRenderer<any>, poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number);
    get bufferSource(): MultiBufferSource;
    get model(): BakedGeoModel;
    get packedLight(): number;
    get partialTick(): number;
    get poseStack(): PoseStack;
  }


  interface Pre extends ICancellableEvent, Armor {}
  class Pre extends ICancellableEvent {
    constructor(renderer: GeoArmorRenderer<any>, poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number);
    get bufferSource(): MultiBufferSource;
    get model(): BakedGeoModel;
    get packedLight(): number;
    get partialTick(): number;
    get poseStack(): PoseStack;
  }

}

declare module 'software.bernie.geckolib' {
  import { DataComponents } from 'DeferredRegister';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { Logger } from 'org.apache.logging.log4j';
  import { Supplier } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RuntimeException, Throwable } from 'java.lang';
  import { GeckoLibPlatform, GeckoLibNetworking } from 'software.bernie.geckolib.service';

  class GeckoLib {
    static readonly DATA_COMPONENTS_REGISTER: DataComponents;
    constructor(modBus: IEventBus);
  }


  class GeckoLibClient {
    static init(): void;
  }


  class GeckoLibConstants {
    static readonly LOGGER: Logger;
    static readonly MODID: string;
    static readonly STACK_ANIMATABLE_ID_COMPONENT: Supplier;
    static exception(resource: ResourceLocation, message: string): RuntimeException;
    static exception(resource: ResourceLocation, message: string, exception: Throwable): RuntimeException;
    static id(path: string): ResourceLocation;
    static init(): void;
  }


  class GeckoLibServices {
    static readonly PLATFORM: GeckoLibPlatform;
    static readonly NETWORK: GeckoLibNetworking;
  }

}

declare module 'software.bernie.geckolib.GeckoLibServices' {
  import { GeckoLibEvents, GeckoLibClient } from 'software.bernie.geckolib.service';

  class Client {
    static readonly EVENTS: GeckoLibEvents;
    static readonly ITEM_RENDERING: GeckoLibClient;
  }

}

declare module 'software.bernie.geckolib.loading' {
  import { BakedAnimations } from 'software.bernie.geckolib.loading.object';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ResourceManager } from 'net.minecraft.server.packs.resources';
  import { Model } from 'software.bernie.geckolib.loading.json.raw';
  import { JsonObject } from 'com.google.gson';

  class FileLoader {
    static getFileContents(location: ResourceLocation, manager: ResourceManager): string;
    static loadAnimationsFile(location: ResourceLocation, manager: ResourceManager): BakedAnimations;
    static loadFile(location: ResourceLocation, manager: ResourceManager): JsonObject;
    static loadModelFile(location: ResourceLocation, manager: ResourceManager): Model;
  }

}

declare module 'software.bernie.geckolib.loading.json' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface FormatVersion extends Enum<FormatVersion> {}
  class FormatVersion extends Enum<FormatVersion> {
    static readonly V_1_12_0: FormatVersion;
    static readonly V_1_14_0: FormatVersion;
    static readonly V_1_21_0: FormatVersion;
    static valueOf(name: string): FormatVersion;
    static values(): FormatVersion[];
  }

}

declare module 'software.bernie.geckolib.loading.json.raw.FaceUV' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Rotation extends Enum<Rotation> {}
  class Rotation extends Enum<Rotation> {
    static readonly NONE: Rotation;
    static readonly CLOCKWISE_90: Rotation;
    static readonly CLOCKWISE_180: Rotation;
    static readonly CLOCKWISE_270: Rotation;
    static fromValue(value: number): Rotation;
    rotateUvs(u: number, v: number, uWidth: number, vHeight: number): number[];
    static valueOf(name: string): Rotation;
    static values(): Rotation[];
  }

}

declare module 'software.bernie.geckolib.loading.json.raw.PolysUnion' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Type extends Enum<Type> {}
  class Type extends Enum<Type> {
    static readonly QUAD: Type;
    static readonly TRI: Type;
    static valueOf(name: string): Type;
    static values(): Type[];
  }

}

declare module 'software.bernie.geckolib.loading.json.typeadapter' {
  import { JsonDeserializer, JsonElement, JsonDeserializationContext, Gson } from 'com.google.gson';
  import { BakedAnimations } from 'software.bernie.geckolib.loading.object';
  import { ConcurrentMap } from 'java.util.concurrent';
  import { Type } from 'java.lang.reflect';
  import { Keyframes } from 'software.bernie.geckolib.animation.Animation';

  interface BakedAnimationsAdapter extends JsonDeserializer<BakedAnimations> {}
  class BakedAnimationsAdapter extends JsonDeserializer<BakedAnimations> {
    static COMPRESSION_CACHE: ConcurrentMap;
    deserialize(json: JsonElement, type: Type, context: JsonDeserializationContext): BakedAnimations;
  }


  interface KeyFramesAdapter extends JsonDeserializer<Keyframes> {}
  class KeyFramesAdapter extends JsonDeserializer<Keyframes> {
    static readonly GEO_GSON: Gson;
    deserialize(json: JsonElement, type: Type, context: JsonDeserializationContext): Keyframes;
  }

}

declare module 'software.bernie.geckolib.loading.math.function.generic' {
  import { MathFunction } from 'software.bernie.geckolib.loading.math.function';
  import { MathValue } from 'software.bernie.geckolib.loading.math';

  interface AbsFunction extends MathFunction {}
  class AbsFunction extends MathFunction {
    constructor(...values: MathValue[]);
    compute(): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
  }


  interface ACosFunction extends MathFunction {}
  class ACosFunction extends MathFunction {
    constructor(...values: MathValue[]);
    compute(): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
  }


  interface ASinFunction extends MathFunction {}
  class ASinFunction extends MathFunction {
    constructor(...values: MathValue[]);
    compute(): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
  }


  interface ATan2Function extends MathFunction {}
  class ATan2Function extends MathFunction {
    constructor(...values: MathValue[]);
    compute(): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
  }


  interface ATanFunction extends MathFunction {}
  class ATanFunction extends MathFunction {
    constructor(...values: MathValue[]);
    compute(): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
  }


  interface CosFunction extends MathFunction {}
  class CosFunction extends MathFunction {
    constructor(...values: MathValue[]);
    compute(): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
  }


  interface ExpFunction extends MathFunction {}
  class ExpFunction extends MathFunction {
    constructor(...values: MathValue[]);
    compute(): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
  }


  interface LogFunction extends MathFunction {}
  class LogFunction extends MathFunction {
    constructor(...values: MathValue[]);
    compute(): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
  }


  interface ModFunction extends MathFunction {}
  class ModFunction extends MathFunction {
    constructor(...values: MathValue[]);
    compute(): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
  }


  interface PowFunction extends MathFunction {}
  class PowFunction extends MathFunction {
    constructor(...values: MathValue[]);
    compute(): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
  }


  interface SinFunction extends MathFunction {}
  class SinFunction extends MathFunction {
    constructor(...values: MathValue[]);
    compute(): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
  }


  interface SqrtFunction extends MathFunction {}
  class SqrtFunction extends MathFunction {
    constructor(...values: MathValue[]);
    compute(): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
  }

}

declare module 'software.bernie.geckolib.loading.math.function.limit' {
  import { MathFunction } from 'software.bernie.geckolib.loading.math.function';
  import { MathValue } from 'software.bernie.geckolib.loading.math';

  interface ClampFunction extends MathFunction {}
  class ClampFunction extends MathFunction {
    constructor(...values: MathValue[]);
    compute(): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
  }


  interface MaxFunction extends MathFunction {}
  class MaxFunction extends MathFunction {
    constructor(...values: MathValue[]);
    compute(): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
  }


  interface MinFunction extends MathFunction {}
  class MinFunction extends MathFunction {
    constructor(...values: MathValue[]);
    compute(): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
  }

}

declare module 'software.bernie.geckolib.loading.math.function' {
  import { MathValue } from 'software.bernie.geckolib.loading.math';

  interface MathFunction extends MathValue {}
  class MathFunction extends MathValue {
    compute(): number;
    get (): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
    isMutable(...values: MathValue[]): boolean;
    isMutable(): boolean;
    toString(): string;
    validate(...inputs: MathValue[]): void;
  }

}

declare module 'software.bernie.geckolib.loading.math.function.MathFunction' {
  import { MathValue } from 'software.bernie.geckolib.loading.math';

  class Factory<T extends MathFunction = any> {
    create(...var1: MathValue[]): T;
  }

}

declare module 'software.bernie.geckolib.loading.math.function.misc' {
  import { MathFunction } from 'software.bernie.geckolib.loading.math.function';
  import { MathValue } from 'software.bernie.geckolib.loading.math';

  interface PiFunction extends MathFunction {}
  class PiFunction extends MathFunction {
    constructor(...values: MathValue[]);
    compute(): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
    isMutable(...values: MathValue[]): boolean;
    isMutable(): boolean;
  }


  interface ToDegFunction extends MathFunction {}
  class ToDegFunction extends MathFunction {
    constructor(...values: MathValue[]);
    compute(): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
  }


  interface ToRadFunction extends MathFunction {}
  class ToRadFunction extends MathFunction {
    constructor(...values: MathValue[]);
    compute(): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
  }

}

declare module 'software.bernie.geckolib.loading.math.function.random' {
  import { MathFunction } from 'software.bernie.geckolib.loading.math.function';
  import { MathValue } from 'software.bernie.geckolib.loading.math';

  interface DieRollFunction extends MathFunction {}
  class DieRollFunction extends MathFunction {
    constructor(...values: MathValue[]);
    compute(): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
    isMutable(...values: MathValue[]): boolean;
    isMutable(): boolean;
  }


  interface DieRollIntegerFunction extends MathFunction {}
  class DieRollIntegerFunction extends MathFunction {
    constructor(...values: MathValue[]);
    compute(): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
    isMutable(...values: MathValue[]): boolean;
    isMutable(): boolean;
  }


  interface RandomFunction extends MathFunction {}
  class RandomFunction extends MathFunction {
    constructor(...values: MathValue[]);
    compute(): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
    isMutable(...values: MathValue[]): boolean;
    isMutable(): boolean;
  }


  interface RandomIntegerFunction extends MathFunction {}
  class RandomIntegerFunction extends MathFunction {
    constructor(...values: MathValue[]);
    compute(): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
    isMutable(...values: MathValue[]): boolean;
    isMutable(): boolean;
  }

}

declare module 'software.bernie.geckolib.loading.math.function.round' {
  import { MathFunction } from 'software.bernie.geckolib.loading.math.function';
  import { MathValue } from 'software.bernie.geckolib.loading.math';

  interface CeilFunction extends MathFunction {}
  class CeilFunction extends MathFunction {
    constructor(...values: MathValue[]);
    compute(): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
  }


  interface FloorFunction extends MathFunction {}
  class FloorFunction extends MathFunction {
    constructor(...values: MathValue[]);
    compute(): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
  }


  interface HermiteBlendFunction extends MathFunction {}
  class HermiteBlendFunction extends MathFunction {
    constructor(...values: MathValue[]);
    compute(): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
  }


  interface LerpFunction extends MathFunction {}
  class LerpFunction extends MathFunction {
    constructor(...values: MathValue[]);
    compute(): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
  }


  interface LerpRotFunction extends MathFunction {}
  class LerpRotFunction extends MathFunction {
    constructor(...values: MathValue[]);
    compute(): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
  }


  interface RoundFunction extends MathFunction {}
  class RoundFunction extends MathFunction {
    constructor(...values: MathValue[]);
    compute(): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
  }


  interface TruncateFunction extends MathFunction {}
  class TruncateFunction extends MathFunction {
    constructor(...values: MathValue[]);
    compute(): number;
    get args(): MathValue[];
    get minArgs(): number;
    get name(): string;
  }

}

declare module 'software.bernie.geckolib.loading.math' {
  import { Factory } from 'software.bernie.geckolib.loading.math.function.MathFunction';
  import { MathFunction } from 'software.bernie.geckolib.loading.math.function';
  import { Variable } from 'software.bernie.geckolib.loading.math.value';
  import { DoubleSupplier, ToDoubleFunction } from 'java.util.function';
  import { JsonElement } from 'com.google.gson';
  import { List } from 'java.util';
  import { Either } from 'com.mojang.datafixers.util';
  import { AnimationState } from 'software.bernie.geckolib.animation';
  import { GeoAnimatable } from 'software.bernie.geckolib.animatable';
  import { Actor } from 'software.bernie.geckolib.loading.math.MolangQueries';

  class MathParser {
    static buildFunction<T extends MathFunction>(name: string, ...values: MathValue[]): T;
    static compileExpression(expression: string): MathValue;
    static compileMolang(expression: string): MathValue;
    static compileSymbols(chars: string[]): Either<string, MathValue[]>[];
    static decomposeExpression(expression: string): string[];
    static getVariableFor(name: string): Variable;
    static isFunctionRegistered(name: string): boolean;
    static isNumeric(string: string): boolean;
    static isOperativeSymbol(symbol: string): boolean;
    static isOperativeSymbol(symbol: string): boolean;
    static parseJson(element: JsonElement): MathValue;
    static parseSymbols(symbols: Either<string, MathValue[]>[]): MathValue;
    static registerFunction(name: string, factory: Factory<any>): void;
    static registerVariable(variable: Variable): void;
    static setVariable(name: string, value: DoubleSupplier): void;
  }


  interface MathValue extends DoubleSupplier {}
  class MathValue extends DoubleSupplier {
    get (): number;
    get asDouble(): number;
    isMutable(): boolean;
  }


  class MolangQueries {
    static readonly ACTOR_COUNT: string;
    static readonly ANIM_TIME: string;
    static readonly BLOCKING: string;
    static readonly BLOCK_STATE: string;
    static readonly BODY_X_ROTATION: string;
    static readonly BODY_Y_ROTATION: string;
    static readonly CAN_CLIMB: string;
    static readonly CAN_FLY: string;
    static readonly CAN_SWIM: string;
    static readonly CAN_WALK: string;
    static readonly CARDINAL_FACING: string;
    static readonly CARDINAL_FACING_2D: string;
    static readonly CARDINAL_PLAYER_FACING: string;
    static readonly CONTROLLER_SPEED: string;
    static readonly DAY: string;
    static readonly DEATH_TICKS: string;
    static readonly DISTANCE_FROM_CAMERA: string;
    static readonly EQUIPMENT_COUNT: string;
    static readonly FRAME_ALPHA: string;
    static readonly GET_ACTOR_INFO_ID: string;
    static readonly GROUND_SPEED: string;
    static readonly HAS_CAPE: string;
    static readonly HAS_COLLISION: string;
    static readonly HAS_GRAVITY: string;
    static readonly HAS_HEAD_GEAR: string;
    static readonly HAS_OWNER: string;
    static readonly HAS_PLAYER_RIDER: string;
    static readonly HAS_RIDER: string;
    static readonly HEAD_X_ROTATION: string;
    static readonly HEAD_Y_ROTATION: string;
    static readonly HEALTH: string;
    static readonly HURT_TIME: string;
    static readonly INVULNERABLE_TICKS: string;
    static readonly IS_ALIVE: string;
    static readonly IS_ANGRY: string;
    static readonly IS_BABY: string;
    static readonly IS_BREATHING: string;
    static readonly IS_ENCHANTED: string;
    static readonly IS_FIRE_IMMUNE: string;
    static readonly IS_FIRST_PERSON: string;
    static readonly IS_INVISIBLE: string;
    static readonly IS_IN_CONTACT_WITH_WATER: string;
    static readonly IS_IN_LAVA: string;
    static readonly IS_IN_WATER: string;
    static readonly IS_IN_WATER_OR_RAIN: string;
    static readonly IS_LEASHED: string;
    static readonly IS_MOVING: string;
    static readonly IS_ON_FIRE: string;
    static readonly IS_ON_GROUND: string;
    static readonly IS_POWERED: string;
    static readonly IS_RIDING: string;
    static readonly IS_SADDLED: string;
    static readonly IS_SILENT: string;
    static readonly IS_SLEEPING: string;
    static readonly IS_SNEAKING: string;
    static readonly IS_SPRINTING: string;
    static readonly IS_STACKABLE: string;
    static readonly IS_SWIMMING: string;
    static readonly IS_USING_ITEM: string;
    static readonly IS_WALL_CLIMBING: string;
    static readonly ITEM_MAX_USE_DURATION: string;
    static readonly LIFE_TIME: string;
    static readonly MAIN_HAND_ITEM_MAX_DURATION: string;
    static readonly MAIN_HAND_ITEM_USE_DURATION: string;
    static readonly MAX_DURABILITY: string;
    static readonly MAX_HEALTH: string;
    static readonly MOON_BRIGHTNESS: string;
    static readonly MOON_PHASE: string;
    static readonly MOVEMENT_DIRECTION: string;
    static readonly PLAYER_LEVEL: string;
    static readonly REMAINING_DURABILITY: string;
    static readonly RIDER_BODY_X_ROTATION: string;
    static readonly RIDER_BODY_Y_ROTATION: string;
    static readonly RIDER_HEAD_X_ROTATION: string;
    static readonly RIDER_HEAD_Y_ROTATION: string;
    static readonly SCALE: string;
    static readonly SLEEP_ROTATION: string;
    static readonly TIME_OF_DAY: string;
    static readonly TIME_STAMP: string;
    static readonly VERTICAL_SPEED: string;
    static readonly YAW_SPEED: string;
    static clearActor(): void;
    static isExistingVariable(name: string): boolean;
    static setActorVariable<T>(name: string, value: ToDoubleFunction<Actor<T>>): void;
    static updateActor(animationState: AnimationState<GeoAnimatable>, animTime: number): void;
  }

}

declare module 'software.bernie.geckolib.loading.math.Operator' {
  class Operation {
    compute(var1: number, var3: number): number;
  }

}

declare module 'software.bernie.geckolib.loading.math.value' {
  import { MathValue, Operator } from 'software.bernie.geckolib.loading.math';

  interface Calculation extends MathValue {}
  class Calculation extends MathValue {
    constructor(operator: Operator, argA: MathValue, argB: MathValue);
    argA(): MathValue;
    argB(): MathValue;
    get (): number;
    isMutable(): boolean;
    operator(): Operator;
    toString(): string;
  }

}

declare module 'software.bernie.geckolib.loading.object' {
  import { Map } from 'java.util';
  import { BakedGeoModel, GeoBone, GeoCube, GeoQuad } from 'software.bernie.geckolib.cache.object';
  import { ModelProperties, Cube, UVUnion } from 'software.bernie.geckolib.loading.json.raw';
  import { VertexSet } from 'software.bernie.geckolib.loading.object.BakedModelFactory';
  import { Direction } from 'net.minecraft.core';

  class BakedModelFactory {
    static readonly FACTORIES: Map;
    static readonly DEFAULT_FACTORY: BakedModelFactory;
    buildQuad(vertices: VertexSet, cube: Cube, uvUnion: UVUnion, textureWidth: number, textureHeight: number, mirror: boolean, direction: Direction): GeoQuad;
    buildQuads(uvUnion: UVUnion, vertices: VertexSet, cube: Cube, textureWidth: number, textureHeight: number, mirror: boolean): GeoQuad[];
    constructBone(var1: BoneStructure, var2: ModelProperties, var3: GeoBone): GeoBone;
    constructCube(var1: Cube, var2: ModelProperties, var3: GeoBone): GeoCube;
    constructGeoModel(var1: GeometryTree): BakedGeoModel;
    static getForNamespace(namespace: string): BakedModelFactory;
    static register(namespace: string, factory: BakedModelFactory): void;
  }

}

declare module 'software.bernie.geckolib.loading.object.BakedModelFactory' {
  import { BakedModelFactory, GeometryTree, BoneStructure } from 'software.bernie.geckolib.loading.object';
  import { BakedGeoModel, GeoBone, GeoCube } from 'software.bernie.geckolib.cache.object';
  import { ModelProperties, Cube } from 'software.bernie.geckolib.loading.json.raw';

  interface Builtin extends BakedModelFactory {}
  class Builtin extends BakedModelFactory {
    constructBone(boneStructure: BoneStructure, properties: ModelProperties, parent: GeoBone): GeoBone;
    constructCube(cube: Cube, properties: ModelProperties, bone: GeoBone): GeoCube;
    constructGeoModel(geometryTree: GeometryTree): BakedGeoModel;
  }

}

declare module 'software.bernie.geckolib.mixin.client' {
  import { ItemStack, ItemDisplayContext } from 'net.minecraft.world.item';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource, GameRenderer, LightTexture } from 'net.minecraft.client.renderer';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { HumanoidArmorLayer } from 'net.minecraft.client.renderer.entity.layers';
  import { EquipmentSlot } from 'net.minecraft.world.entity';
  import { DeltaTracker, Camera } from 'net.minecraft.client';
  import { Matrix4f } from 'org.joml';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { AbstractTexture } from 'net.minecraft.client.renderer.texture';

  class BlockEntityWithoutLevelRendererMixin {
    geckolib$renderGeckolibItem(stack: ItemStack, displayContext: ItemDisplayContext, poseStack: PoseStack, bufferSource: MultiBufferSource, packedLight: number, packedOverlay: number, ci: CallbackInfo): void;
  }


  class HumanoidArmorLayerMixin<T extends LivingEntity = any, M extends HumanoidModel<T> = any, A extends HumanoidModel<T> = any> {
    geckolib$wrapArmorPieceRender(renderLayer: HumanoidArmorLayer<T, M, A>, poseStack: PoseStack, bufferSource: MultiBufferSource, entity: T, equipmentSlot: EquipmentSlot, packedLight: number, baseModel: A, limbSwing: number, limbSwingAmount: number, partialTick: number, lerpedTickCount: number, netHeadYaw: number, headPitch: number): boolean;
  }


  class LevelRendererMixin {
    geckolib$captureRenderedEntities(deltaTracker: DeltaTracker, renderBlockOutline: boolean, camera: Camera, gameRenderer: GameRenderer, lightTexture: LightTexture, frustumMatrix: Matrix4f, projectionMatrix: Matrix4f, ci: CallbackInfo): void;
  }


  class TextureManagerMixin {
    register(var1: ResourceLocation, var2: AbstractTexture): void;
  }

}

declare module 'software.bernie.geckolib.mixin.common' {
  import { ItemStack } from 'net.minecraft.world.item';
  import { Operation } from 'com.llamalad7.mixinextras.injector.wrapoperation';
  import { Boolean } from 'java.lang';

  class AbstractContainerMenuMixin {
    geckolib$forceGeckolibIdSync(stack: ItemStack, other: ItemStack, original: Operation<boolean>): boolean;
    geckolib$forceGeckolibSlotChange(stack: ItemStack, other: ItemStack, original: Operation<boolean>): boolean;
    geckolib$removeGeckolibIdOnCopy(instance: ItemStack, count: number, original: Operation<ItemStack>): ItemStack;
  }


  class ItemStackMixin {
    geckolib$removeGeckolibIdOnCopy(instance: ItemStack, count: number, original: Operation<ItemStack>): ItemStack;
  }


  class LivingEntityMixin {
    geckolib$allowLazyStackIdParity(remoteStack: ItemStack, localStack: ItemStack, original: Operation<boolean>): boolean;
  }

}

declare module 'software.bernie.geckolib.model' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { AnimationState, Animation, AnimationProcessor } from 'software.bernie.geckolib.animation';
  import { GeoRenderer } from 'software.bernie.geckolib.renderer';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { BakedGeoModel, GeoBone } from 'software.bernie.geckolib.cache.object';
  import { Optional } from 'java.util';
  import { BiConsumer } from 'java.util.function';
  import { DataTicket } from 'software.bernie.geckolib.constant.dataticket';

  interface DefaultedBlockGeoModel<T extends GeoAnimatable = any> extends DefaultedGeoModel<T> {}
  class DefaultedBlockGeoModel<T extends GeoAnimatable = any> extends DefaultedGeoModel<T> {
    constructor(assetSubpath: ResourceLocation);
    withAltAnimations(altPath: ResourceLocation): DefaultedBlockGeoModel<T>;
    withAltModel(altPath: ResourceLocation): DefaultedBlockGeoModel<T>;
    withAltTexture(altPath: ResourceLocation): DefaultedBlockGeoModel<T>;
  }


  interface DefaultedEntityGeoModel<T extends GeoAnimatable = any> extends DefaultedGeoModel<T> {}
  class DefaultedEntityGeoModel<T extends GeoAnimatable = any> extends DefaultedGeoModel<T> {
    constructor(assetSubpath: ResourceLocation);

    constructor(assetSubpath: ResourceLocation, turnsHead: boolean);

    constructor(assetSubpath: ResourceLocation, headBone: string);
    setCustomAnimations(animatable: T, instanceId: number, animationState: AnimationState<T>): void;
    withAltAnimations(altPath: ResourceLocation): DefaultedEntityGeoModel<T>;
    withAltModel(altPath: ResourceLocation): DefaultedEntityGeoModel<T>;
    withAltTexture(altPath: ResourceLocation): DefaultedEntityGeoModel<T>;
  }


  interface DefaultedGeoModel<T extends GeoAnimatable = any> extends GeoModel<T> {}
  class DefaultedGeoModel<T extends GeoAnimatable = any> extends GeoModel<T> {
    constructor(assetSubpath: ResourceLocation);
    buildFormattedAnimationPath(basePath: ResourceLocation): ResourceLocation;
    buildFormattedModelPath(basePath: ResourceLocation): ResourceLocation;
    buildFormattedTexturePath(basePath: ResourceLocation): ResourceLocation;
    getAnimationResource(animatable: T): ResourceLocation;
    getModelResource(animatable: T): ResourceLocation;
    getTextureResource(animatable: T): ResourceLocation;
    withAltAnimations(altPath: ResourceLocation): DefaultedGeoModel<T>;
    withAltModel(altPath: ResourceLocation): DefaultedGeoModel<T>;
    withAltTexture(altPath: ResourceLocation): DefaultedGeoModel<T>;
  }


  interface DefaultedItemGeoModel<T extends GeoAnimatable = any> extends DefaultedGeoModel<T> {}
  class DefaultedItemGeoModel<T extends GeoAnimatable = any> extends DefaultedGeoModel<T> {
    constructor(assetSubpath: ResourceLocation);
    withAltAnimations(altPath: ResourceLocation): DefaultedItemGeoModel<T>;
    withAltModel(altPath: ResourceLocation): DefaultedItemGeoModel<T>;
    withAltTexture(altPath: ResourceLocation): DefaultedItemGeoModel<T>;
  }


  class GeoModel<T extends GeoAnimatable = any> {
    addAdditionalStateData(animatable: T, instanceId: number, dataConsumer: BiConsumer<DataTicket<T>, T>): void;
    applyMolangQueries(animationState: AnimationState<T>, animTime: number): void;
    crashIfBoneMissing(): boolean;
    get animationProcessor(): AnimationProcessor<T>;
    getAnimation(animatable: T, name: string): Animation;
    getAnimationResource(var1: T): ResourceLocation;
    getAnimationResourceFallbacks(animatable: T): ResourceLocation[];
    getBakedModel(location: ResourceLocation): BakedGeoModel;
    getBone(name: string): Optional<GeoBone>;
    getModelResource(animatable: T, renderer: GeoRenderer<T>): ResourceLocation;
    getModelResource(var1: T): ResourceLocation;
    getRenderType(animatable: T, texture: ResourceLocation): RenderType;
    getTextureResource(animatable: T, renderer: GeoRenderer<T>): ResourceLocation;
    getTextureResource(var1: T): ResourceLocation;
    handleAnimations(animatable: T, instanceId: number, animationState: AnimationState<T>, partialTick: number): void;
    setCustomAnimations(animatable: T, instanceId: number, animationState: AnimationState<T>): void;
  }

}

declare module 'software.bernie.geckolib.network' {
  import { GeckoLibNetworking } from 'software.bernie.geckolib.service';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { MultiloaderPacket } from 'software.bernie.geckolib.network.packet';
  import { Entity } from 'net.minecraft.world.entity';
  import { ServerLevel, ServerPlayer } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';

  interface GeckoLibNetworkingNeoForge extends GeckoLibNetworking {}
  class GeckoLibNetworkingNeoForge extends GeckoLibNetworking {
    static init(modBus: IEventBus): void;
    static init(): void;
    registerPacketInternal<B extends FriendlyByteBuf, P extends MultiloaderPacket>(payloadType: Type<P>, codec: StreamCodec<B, P>, isClientBound: boolean): void;
    sendToAllPlayersTrackingBlock(packet: MultiloaderPacket, level: ServerLevel, pos: BlockPos): void;
    sendToAllPlayersTrackingEntity(packet: MultiloaderPacket, trackingEntity: Entity): void;
    sendToPlayer(packet: MultiloaderPacket, player: ServerPlayer): void;
  }

}

declare module 'software.bernie.geckolib.network.packet' {
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Consumer } from 'java.util.function';
  import { Runnable } from 'java.lang';

  interface MultiloaderPacket extends CustomPacketPayload {}
  class MultiloaderPacket extends CustomPacketPayload {
    receiveMessage(var1: Player, var2: Consumer<Runnable>): void;
  }

}

declare module 'software.bernie.geckolib.platform' {
  import { GeckoLibClient, GeckoLibPlatform } from 'software.bernie.geckolib.service';
  import { HumanoidModel } from 'net.minecraft.client.model';
  import { ItemStack } from 'net.minecraft.world.item';
  import { EquipmentSlot, LivingEntity } from 'net.minecraft.world.entity';
  import { GeoModel } from 'software.bernie.geckolib.model';
  import { Path } from 'java.nio.file';
  import { Supplier, UnaryOperator } from 'java.util.function';
  import { DataComponentType } from 'net.minecraft.core.component';
  import { Builder } from 'DataComponentType';

  interface GeckoLibClientNeoForge extends GeckoLibClient {}
  class GeckoLibClientNeoForge extends GeckoLibClient {
    getArmorModelForItem<T extends LivingEntity>(animatable: T, stack: ItemStack, slot: EquipmentSlot, defaultModel: HumanoidModel<LivingEntity>): HumanoidModel<any>;
    getGeoModelForArmor(armour: ItemStack): GeoModel<any>;
    getGeoModelForItem(item: ItemStack): GeoModel<any>;
  }


  interface GeckoLibNeoForge extends GeckoLibPlatform {}
  class GeckoLibNeoForge extends GeckoLibPlatform {
    get gameDir(): Path;
    isDevelopmentEnvironment(): boolean;
    isPhysicalClient(): boolean;
    registerDataComponent<T>(id: string, builder: UnaryOperator<Builder<T>>): Supplier<DataComponentType<T>>;
  }

}

declare module 'software.bernie.geckolib.renderer' {
  import { HumanoidModel } from 'net.minecraft.client.model';
  import { GeoModel } from 'software.bernie.geckolib.model';
  import { Entity, EquipmentSlot, EntityType, Mob } from 'net.minecraft.world.entity';
  import { ItemStack, ItemDisplayContext } from 'net.minecraft.world.item';
  import { RenderType, MultiBufferSource, BlockEntityWithoutLevelRenderer } from 'net.minecraft.client.renderer';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List } from 'java.util';
  import { GeoRenderLayer } from 'software.bernie.geckolib.renderer.layer';
  import { GeoBone, BakedGeoModel } from 'software.bernie.geckolib.cache.object';
  import { Color } from 'software.bernie.geckolib.util';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { ModelPart, EntityModelSet } from 'net.minecraft.client.model.geom';
  import { BlockEntityRenderer, BlockEntityRenderDispatcher } from 'net.minecraft.client.renderer.blockentity';
  import { BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { EntityRenderer } from 'net.minecraft.client.renderer.entity';
  import { Context } from 'EntityRendererProvider';

  interface GeoArmorRenderer<T extends Item = any> extends GeoRenderer<T>, HumanoidModel {}
  class GeoArmorRenderer<T extends Item = any> extends GeoRenderer<T> {
    constructor(armorItem: I);

    constructor(model: GeoModel<T>);
    actuallyRender(poseStack: PoseStack, animatable: T, model: BakedGeoModel, renderType: RenderType, bufferSource: MultiBufferSource, buffer: VertexConsumer, isReRender: boolean, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
    addRenderLayer(renderLayer: GeoRenderLayer<T>): GeoArmorRenderer<T>;
    applyBoneVisibilityByPart(currentSlot: EquipmentSlot, currentPart: ModelPart, model: HumanoidModel<any>): void;
    doArmourPostRenderCleanup(): void;
    doPostRenderCleanup(): void;
    fireCompileRenderLayersEvent(): void;
    firePostRenderEvent(poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number): void;
    firePreRenderEvent(poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number): boolean;
    get animatable(): T;
    get currentEntity(): Entity;
    get currentSlot(): EquipmentSlot;
    get currentStack(): ItemStack;
    get geoModel(): GeoModel<T>;
    get renderLayers(): GeoRenderLayer<T>[];
    getBodyBone(model: GeoModel<T>): GeoBone;
    getHeadBone(model: GeoModel<T>): GeoBone;
    getInstanceId(animatable: T): number;
    getLeftArmBone(model: GeoModel<T>): GeoBone;
    getLeftBootBone(model: GeoModel<T>): GeoBone;
    getLeftLegBone(model: GeoModel<T>): GeoBone;
    getRenderColor(animatable: T, partialTick: number, packedLight: number): Color;
    getRenderType(animatable: T, texture: ResourceLocation, bufferSource: MultiBufferSource, partialTick: number): RenderType;
    getRightArmBone(model: GeoModel<T>): GeoBone;
    getRightBootBone(model: GeoModel<T>): GeoBone;
    getRightLegBone(model: GeoModel<T>): GeoBone;
    preRender(poseStack: PoseStack, animatable: T, model: BakedGeoModel, bufferSource: MultiBufferSource, buffer: VertexConsumer, isReRender: boolean, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
    prepForRender(entity: Entity, stack: ItemStack, slot: EquipmentSlot, baseModel: HumanoidModel<any>): void;
    prepForRender(entity: Entity, stack: ItemStack, slot: EquipmentSlot, baseModel: HumanoidModel<any>, bufferSource: MultiBufferSource, partialTick: number, limbSwing: number, limbSwingAmount: number, netHeadYaw: number, headPitch: number): void;
    renderRecursively(poseStack: PoseStack, animatable: T, bone: GeoBone, renderType: RenderType, bufferSource: MultiBufferSource, buffer: VertexConsumer, isReRender: boolean, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
    renderToBuffer(poseStack: PoseStack, buffer: VertexConsumer, packedLight: number, packedOverlay: number, colour: number): void;
    scaleModelForBaby(poseStack: PoseStack, animatable: T, partialTick: number, isReRender: boolean): void;
    setAllVisible(visible: boolean): void;
    updateAnimatedTextureFrame(animatable: T): void;
    withScale(scale: number): GeoArmorRenderer<T>;
    withScale(scaleWidth: number, scaleHeight: number): GeoArmorRenderer<T>;
  }


  interface GeoBlockRenderer<T extends BlockEntity = any> extends GeoRenderer<T>, BlockEntityRenderer<T> {}
  class GeoBlockRenderer<T extends BlockEntity = any> extends GeoRenderer<T> {
    constructor(blockEntityType: BlockEntityType<T>);

    constructor(model: GeoModel<T>);
    actuallyRender(poseStack: PoseStack, animatable: T, model: BakedGeoModel, renderType: RenderType, bufferSource: MultiBufferSource, buffer: VertexConsumer, isReRender: boolean, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
    addRenderLayer(renderLayer: GeoRenderLayer<T>): GeoBlockRenderer<T>;
    doPostRenderCleanup(): void;
    fireCompileRenderLayersEvent(): void;
    firePostRenderEvent(poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number): void;
    firePreRenderEvent(poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number): boolean;
    get animatable(): T;
    get geoModel(): GeoModel<T>;
    get renderLayers(): GeoRenderLayer<T>[];
    getInstanceId(animatable: T): number;
    preRender(poseStack: PoseStack, animatable: T, model: BakedGeoModel, bufferSource: MultiBufferSource, buffer: VertexConsumer, isReRender: boolean, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
    render(animatable: T, partialTick: number, poseStack: PoseStack, bufferSource: MultiBufferSource, packedLight: number, packedOverlay: number): void;
    renderRecursively(poseStack: PoseStack, animatable: T, bone: GeoBone, renderType: RenderType, bufferSource: MultiBufferSource, buffer: VertexConsumer, isReRender: boolean, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
    updateAnimatedTextureFrame(animatable: T): void;
    withScale(scale: number): GeoBlockRenderer<T>;
    withScale(scaleWidth: number, scaleHeight: number): GeoBlockRenderer<T>;
  }


  interface GeoEntityRenderer<T extends Entity = any> extends GeoRenderer<T>, EntityRenderer<T> {}
  class GeoEntityRenderer<T extends Entity = any> extends GeoRenderer<T> {
    constructor(context: Context, entityType: EntityType<T>);

    constructor(renderManager: Context, model: GeoModel<T>);
    actuallyRender(poseStack: PoseStack, animatable: T, model: BakedGeoModel, renderType: RenderType, bufferSource: MultiBufferSource, buffer: VertexConsumer, isReRender: boolean, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
    addRenderLayer(renderLayer: GeoRenderLayer<T>): GeoEntityRenderer<T>;
    applyRenderLayers(poseStack: PoseStack, animatable: T, model: BakedGeoModel, renderType: RenderType, bufferSource: MultiBufferSource, buffer: VertexConsumer, partialTick: number, packedLight: number, packedOverlay: number): void;
    doPostRenderCleanup(): void;
    fireCompileRenderLayersEvent(): void;
    firePostRenderEvent(poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number): void;
    firePreRenderEvent(poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number): boolean;
    get animatable(): T;
    get geoModel(): GeoModel<T>;
    get renderLayers(): GeoRenderLayer<T>[];
    getInstanceId(animatable: T): number;
    getNameRenderCutoffDistance(animatable: T): number;
    getPackedOverlay(animatable: T, u: number, partialTick: number): number;
    getRenderColor(animatable: T, partialTick: number, packedLight: number): Color;
    getRenderType(animatable: T, texture: ResourceLocation, bufferSource: MultiBufferSource, partialTick: number): RenderType;
    getTextureLocation(animatable: T): ResourceLocation;
    isShaking(animatable: T): boolean;
    preRender(poseStack: PoseStack, animatable: T, model: BakedGeoModel, bufferSource: MultiBufferSource, buffer: VertexConsumer, isReRender: boolean, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
    render(entity: T, entityYaw: number, partialTick: number, poseStack: PoseStack, bufferSource: MultiBufferSource, packedLight: number): void;
    renderFinal(poseStack: PoseStack, animatable: T, model: BakedGeoModel, bufferSource: MultiBufferSource, buffer: VertexConsumer, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
    renderLeash<E extends Entity, M extends Mob>(mob: M, partialTick: number, poseStack: PoseStack, bufferSource: MultiBufferSource, leashHolder: E): void;
    renderRecursively(poseStack: PoseStack, animatable: T, bone: GeoBone, renderType: RenderType, bufferSource: MultiBufferSource, buffer: VertexConsumer, isReRender: boolean, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
    shouldShowName(animatable: T): boolean;
    updateAnimatedTextureFrame(animatable: T): void;
    withScale(scale: number): GeoEntityRenderer<T>;
    withScale(scaleWidth: number, scaleHeight: number): GeoEntityRenderer<T>;
  }


  interface GeoItemRenderer<T extends Item = any> extends GeoRenderer<T>, BlockEntityWithoutLevelRenderer {}
  class GeoItemRenderer<T extends Item = any> extends GeoRenderer<T> {
    constructor(item: I);

    constructor(model: GeoModel<T>);

    constructor(dispatcher: BlockEntityRenderDispatcher, modelSet: EntityModelSet, model: GeoModel<T>);
    actuallyRender(poseStack: PoseStack, animatable: T, model: BakedGeoModel, renderType: RenderType, bufferSource: MultiBufferSource, buffer: VertexConsumer, isReRender: boolean, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
    addRenderLayer(renderLayer: GeoRenderLayer<T>): GeoItemRenderer<T>;
    doPostRenderCleanup(): void;
    fireCompileRenderLayersEvent(): void;
    firePostRenderEvent(poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number): void;
    firePreRenderEvent(poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number): boolean;
    get animatable(): T;
    get currentItemStack(): ItemStack;
    get geoModel(): GeoModel<T>;
    get renderLayers(): GeoRenderLayer<T>[];
    getInstanceId(animatable: T): number;
    getTextureLocation(animatable: T): ResourceLocation;
    preRender(poseStack: PoseStack, animatable: T, model: BakedGeoModel, bufferSource: MultiBufferSource, buffer: VertexConsumer, isReRender: boolean, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
    renderByItem(stack: ItemStack, transformType: ItemDisplayContext, poseStack: PoseStack, bufferSource: MultiBufferSource, packedLight: number, packedOverlay: number): void;
    renderRecursively(poseStack: PoseStack, animatable: T, bone: GeoBone, renderType: RenderType, bufferSource: MultiBufferSource, buffer: VertexConsumer, isReRender: boolean, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
    setupLightingForGuiRender(): void;
    updateAnimatedTextureFrame(animatable: T): void;
    useAlternateGuiLighting(): GeoItemRenderer<T>;
    withScale(scale: number): GeoItemRenderer<T>;
    withScale(scaleWidth: number, scaleHeight: number): GeoItemRenderer<T>;
  }


  interface GeoObjectRenderer<T extends GeoAnimatable = any> extends GeoRenderer<T> {}
  class GeoObjectRenderer<T extends GeoAnimatable = any> extends GeoRenderer<T> {
    constructor(model: GeoModel<T>);
    actuallyRender(poseStack: PoseStack, animatable: T, model: BakedGeoModel, renderType: RenderType, bufferSource: MultiBufferSource, buffer: VertexConsumer, isReRender: boolean, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
    addRenderLayer(renderLayer: GeoRenderLayer<T>): GeoObjectRenderer<T>;
    doPostRenderCleanup(): void;
    fireCompileRenderLayersEvent(): void;
    firePostRenderEvent(poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number): void;
    firePreRenderEvent(poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number): boolean;
    get animatable(): T;
    get geoModel(): GeoModel<T>;
    get renderLayers(): GeoRenderLayer<T>[];
    getTextureLocation(animatable: T): ResourceLocation;
    preRender(poseStack: PoseStack, animatable: T, model: BakedGeoModel, bufferSource: MultiBufferSource, buffer: VertexConsumer, isReRender: boolean, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
    render(poseStack: PoseStack, animatable: T, bufferSource: MultiBufferSource, renderType: RenderType, buffer: VertexConsumer, packedLight: number, partialTick: number): void;
    renderRecursively(poseStack: PoseStack, animatable: T, bone: GeoBone, renderType: RenderType, bufferSource: MultiBufferSource, buffer: VertexConsumer, isReRender: boolean, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
    updateAnimatedTextureFrame(animatable: T): void;
    withScale(scale: number): GeoObjectRenderer<T>;
    withScale(scaleWidth: number, scaleHeight: number): GeoObjectRenderer<T>;
  }


  interface GeoReplacedEntityRenderer<E extends Entity = any, T extends GeoAnimatable = any> extends GeoRenderer<T>, EntityRenderer<E> {}
  class GeoReplacedEntityRenderer<E extends Entity = any, T extends GeoAnimatable = any> extends GeoRenderer<T> {
    constructor(renderManager: Context, model: GeoModel<T>, animatable: T);
    actuallyRender(poseStack: PoseStack, animatable: T, model: BakedGeoModel, renderType: RenderType, bufferSource: MultiBufferSource, buffer: VertexConsumer, isReRender: boolean, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
    addRenderLayer(renderLayer: GeoRenderLayer<T>): GeoReplacedEntityRenderer<E, T>;
    applyRenderLayers(poseStack: PoseStack, animatable: T, model: BakedGeoModel, renderType: RenderType, bufferSource: MultiBufferSource, buffer: VertexConsumer, partialTick: number, packedLight: number, packedOverlay: number): void;
    doPostRenderCleanup(): void;
    fireCompileRenderLayersEvent(): void;
    firePostRenderEvent(poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number): void;
    firePreRenderEvent(poseStack: PoseStack, model: BakedGeoModel, bufferSource: MultiBufferSource, partialTick: number, packedLight: number): boolean;
    get animatable(): T;
    get currentEntity(): E;
    get geoModel(): GeoModel<T>;
    get renderLayers(): GeoRenderLayer<T>[];
    getInstanceId(animatable: T): number;
    getNameRenderCutoffDistance(entity: E, animatable: T): number;
    getPackedOverlay(animatable: T, u: number, partialTick: number): number;
    getRenderType(animatable: T, texture: ResourceLocation, bufferSource: MultiBufferSource, partialTick: number): RenderType;
    getTextureLocation(entity: E): ResourceLocation;
    isShaking(animatable: T): boolean;
    postRender(poseStack: PoseStack, animatable: T, model: BakedGeoModel, bufferSource: MultiBufferSource, buffer: VertexConsumer, isReRender: boolean, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
    preRender(poseStack: PoseStack, animatable: T, model: BakedGeoModel, bufferSource: MultiBufferSource, buffer: VertexConsumer, isReRender: boolean, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
    render(entity: E, entityYaw: number, partialTick: number, poseStack: PoseStack, bufferSource: MultiBufferSource, packedLight: number): void;
    renderFinal(poseStack: PoseStack, animatable: T, model: BakedGeoModel, bufferSource: MultiBufferSource, buffer: VertexConsumer, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
    renderLeash<H extends Entity, M extends Mob>(mob: M, partialTick: number, poseStack: PoseStack, bufferSource: MultiBufferSource, leashHolder: H): void;
    renderRecursively(poseStack: PoseStack, animatable: T, bone: GeoBone, renderType: RenderType, bufferSource: MultiBufferSource, buffer: VertexConsumer, isReRender: boolean, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
    shouldShowName(entity: E): boolean;
    updateAnimatedTextureFrame(animatable: T): void;
    withScale(scale: number): GeoReplacedEntityRenderer<E, T>;
    withScale(scaleWidth: number, scaleHeight: number): GeoReplacedEntityRenderer<E, T>;
  }

}

declare module 'software.bernie.geckolib.renderer.layer' {
  import { GeoRenderer } from 'software.bernie.geckolib.renderer';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { BakedGeoModel, GeoBone } from 'software.bernie.geckolib.cache.object';
  import { RenderType, MultiBufferSource } from 'net.minecraft.client.renderer';
  import { BiFunction, Supplier } from 'java.util.function';
  import { ItemStack } from 'net.minecraft.world.item';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { TriConsumer } from 'org.apache.logging.log4j.util';
  import { Float } from 'java.lang';
  import { List } from 'java.util';
  import { GeoModel } from 'software.bernie.geckolib.model';

  interface AutoGlowingGeoLayer<T extends GeoAnimatable = any> extends GeoRenderLayer<T> {}
  class AutoGlowingGeoLayer<T extends GeoAnimatable = any> extends GeoRenderLayer<T> {
    constructor(renderer: GeoRenderer<T>);
    render(poseStack: PoseStack, animatable: T, bakedModel: BakedGeoModel, renderType: RenderType, bufferSource: MultiBufferSource, buffer: VertexConsumer, partialTick: number, packedLight: number, packedOverlay: number): void;
  }


  interface BlockAndItemGeoLayer<T extends GeoAnimatable = any> extends GeoRenderLayer<T> {}
  class BlockAndItemGeoLayer<T extends GeoAnimatable = any> extends GeoRenderLayer<T> {
    constructor(renderer: GeoRenderer<T>);

    constructor(renderer: GeoRenderer<T>, stackForBone: BiFunction<GeoBone, T, ItemStack>, blockForBone: BiFunction<GeoBone, T, BlockState>);
    renderForBone(poseStack: PoseStack, animatable: T, bone: GeoBone, renderType: RenderType, bufferSource: MultiBufferSource, buffer: VertexConsumer, partialTick: number, packedLight: number, packedOverlay: number): void;
  }


  interface BoneFilterGeoLayer<T extends GeoAnimatable = any> extends GeoRenderLayer<T> {}
  class BoneFilterGeoLayer<T extends GeoAnimatable = any> extends GeoRenderLayer<T> {
    constructor(renderer: GeoRenderer<T>);

    constructor(renderer: GeoRenderer<T>, checkAndApply: TriConsumer<GeoBone, T, number>);
    preRender(poseStack: PoseStack, animatable: T, bakedModel: BakedGeoModel, renderType: RenderType, bufferSource: MultiBufferSource, buffer: VertexConsumer, partialTick: number, packedLight: number, packedOverlay: number): void;
  }


  interface FastBoneFilterGeoLayer<T extends GeoAnimatable = any> extends BoneFilterGeoLayer<T> {}
  class FastBoneFilterGeoLayer<T extends GeoAnimatable = any> extends BoneFilterGeoLayer<T> {
    constructor(renderer: GeoRenderer<T>);

    constructor(renderer: GeoRenderer<T>, boneSupplier: Supplier<string[]>);

    constructor(renderer: GeoRenderer<T>, boneSupplier: Supplier<string[]>, checkAndApply: TriConsumer<GeoBone, T, number>);
    preRender(poseStack: PoseStack, animatable: T, bakedModel: BakedGeoModel, renderType: RenderType, bufferSource: MultiBufferSource, buffer: VertexConsumer, partialTick: number, packedLight: number, packedOverlay: number): void;
  }


  class GeoRenderLayer<T extends GeoAnimatable = any> {
    constructor(entityRendererIn: GeoRenderer<T>);
    get geoModel(): GeoModel<T>;
    get renderer(): GeoRenderer<T>;
    getDefaultBakedModel(animatable: T): BakedGeoModel;
    preRender(poseStack: PoseStack, animatable: T, bakedModel: BakedGeoModel, renderType: RenderType, bufferSource: MultiBufferSource, buffer: VertexConsumer, partialTick: number, packedLight: number, packedOverlay: number): void;
    render(poseStack: PoseStack, animatable: T, bakedModel: BakedGeoModel, renderType: RenderType, bufferSource: MultiBufferSource, buffer: VertexConsumer, partialTick: number, packedLight: number, packedOverlay: number): void;
    renderForBone(poseStack: PoseStack, animatable: T, bone: GeoBone, renderType: RenderType, bufferSource: MultiBufferSource, buffer: VertexConsumer, partialTick: number, packedLight: number, packedOverlay: number): void;
  }


  class GeoRenderLayersContainer<T extends GeoAnimatable = any> {
    constructor(renderer: GeoRenderer<T>);
    addLayer(layer: GeoRenderLayer<T>): void;
    fireCompileRenderLayersEvent(): void;
    get renderLayers(): GeoRenderLayer<T>[];
  }


  interface ItemArmorGeoLayer<T extends LivingEntity = any> extends GeoRenderLayer<T> {}
  class ItemArmorGeoLayer<T extends LivingEntity = any> extends GeoRenderLayer<T> {
    constructor(geoRenderer: GeoRenderer<T>);
    preRender(poseStack: PoseStack, animatable: T, bakedModel: BakedGeoModel, renderType: RenderType, bufferSource: MultiBufferSource, buffer: VertexConsumer, partialTick: number, packedLight: number, packedOverlay: number): void;
    renderForBone(poseStack: PoseStack, animatable: T, bone: GeoBone, renderType: RenderType, bufferSource: MultiBufferSource, buffer: VertexConsumer, partialTick: number, packedLight: number, packedOverlay: number): void;
  }

}

declare module 'software.bernie.geckolib.renderer.specialty' {
  import { GeoArmorRenderer, GeoBlockRenderer, GeoEntityRenderer, GeoItemRenderer } from 'software.bernie.geckolib.renderer';
  import { GeoModel } from 'software.bernie.geckolib.model';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { BakedGeoModel, GeoBone, GeoQuad } from 'software.bernie.geckolib.cache.object';
  import { MultiBufferSource, RenderType } from 'net.minecraft.client.renderer';
  import { Matrix4f, Vector3f } from 'org.joml';
  import { Context } from 'EntityRendererProvider';

  interface DyeableGeoArmorRenderer<T extends Item = any> extends GeoArmorRenderer<T> {}
  class DyeableGeoArmorRenderer<T extends Item = any> extends GeoArmorRenderer<T> {
    constructor(model: GeoModel<T>);
    preRender(poseStack: PoseStack, animatable: T, model: BakedGeoModel, bufferSource: MultiBufferSource, buffer: VertexConsumer, isReRender: boolean, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
    renderCubesOfBone(poseStack: PoseStack, bone: GeoBone, buffer: VertexConsumer, packedLight: number, packedOverlay: number, colour: number): void;
  }


  interface DynamicGeoBlockRenderer<T extends BlockEntity = any> extends GeoBlockRenderer<T> {}
  class DynamicGeoBlockRenderer<T extends BlockEntity = any> extends GeoBlockRenderer<T> {
    constructor(model: GeoModel<T>);
    createVerticesOfQuad(quad: GeoQuad, poseState: Matrix4f, normal: Vector3f, buffer: VertexConsumer, packedLight: number, packedOverlay: number, colour: number): void;
    postRender(poseStack: PoseStack, animatable: T, model: BakedGeoModel, bufferSource: MultiBufferSource, buffer: VertexConsumer, isReRender: boolean, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
    renderRecursively(poseStack: PoseStack, animatable: T, bone: GeoBone, renderType: RenderType, bufferSource: MultiBufferSource, buffer: VertexConsumer, isReRender: boolean, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
  }


  interface DynamicGeoEntityRenderer<T extends Entity = any> extends GeoEntityRenderer<T> {}
  class DynamicGeoEntityRenderer<T extends Entity = any> extends GeoEntityRenderer<T> {
    constructor(renderManager: Context, model: GeoModel<T>);
    createVerticesOfQuad(quad: GeoQuad, poseState: Matrix4f, normal: Vector3f, buffer: VertexConsumer, packedLight: number, packedOverlay: number, colour: number): void;
    postRender(poseStack: PoseStack, animatable: T, model: BakedGeoModel, bufferSource: MultiBufferSource, buffer: VertexConsumer, isReRender: boolean, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
    renderRecursively(poseStack: PoseStack, animatable: T, bone: GeoBone, renderType: RenderType, bufferSource: MultiBufferSource, buffer: VertexConsumer, isReRender: boolean, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
  }


  interface DynamicGeoItemRenderer<T extends Item = any> extends GeoItemRenderer<T> {}
  class DynamicGeoItemRenderer<T extends Item = any> extends GeoItemRenderer<T> {
    constructor(model: GeoModel<T>);
    createVerticesOfQuad(quad: GeoQuad, poseState: Matrix4f, normal: Vector3f, buffer: VertexConsumer, packedLight: number, packedOverlay: number, colour: number): void;
    postRender(poseStack: PoseStack, animatable: T, model: BakedGeoModel, bufferSource: MultiBufferSource, buffer: VertexConsumer, isReRender: boolean, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
    renderRecursively(poseStack: PoseStack, animatable: T, bone: GeoBone, renderType: RenderType, bufferSource: MultiBufferSource, buffer: VertexConsumer, isReRender: boolean, partialTick: number, packedLight: number, packedOverlay: number, colour: number): void;
  }

}

declare module 'software.bernie.geckolib.resource' {
  import { MetadataSectionSerializer } from 'net.minecraft.server.packs.metadata';
  import { List } from 'java.util';
  import { Pixel } from 'software.bernie.geckolib.resource.GeoGlowingTextureMeta';
  import { NativeImage } from 'com.mojang.blaze3d.platform';

  class GeoGlowingTextureMeta {
    static readonly DESERIALIZER: MetadataSectionSerializer;
    constructor(pixels: Pixel[]);
    createImageMask(originalImage: NativeImage, newImage: NativeImage): void;
    static fromExistingImage(glowLayer: NativeImage): GeoGlowingTextureMeta;
  }

}

declare module 'software.bernie.geckolib.service' {
  import { HumanoidModel } from 'net.minecraft.client.model';
  import { ItemStack } from 'net.minecraft.world.item';
  import { EquipmentSlot, LivingEntity, Entity } from 'net.minecraft.world.entity';
  import { GeoModel } from 'software.bernie.geckolib.model';
  import { GeoBlockRenderer, GeoArmorRenderer, GeoEntityRenderer, GeoReplacedEntityRenderer, GeoItemRenderer, GeoObjectRenderer } from 'software.bernie.geckolib.renderer';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { BakedGeoModel } from 'software.bernie.geckolib.cache.object';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { MultiloaderPacket } from 'software.bernie.geckolib.network.packet';
  import { ServerLevel, ServerPlayer } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { SerializableDataTicket } from 'software.bernie.geckolib.constant.dataticket';
  import { Class } from 'java.lang';
  import { GeoAnimatable } from 'software.bernie.geckolib.animatable';
  import { Path } from 'java.nio.file';
  import { Supplier, UnaryOperator } from 'java.util.function';
  import { DataComponentType } from 'net.minecraft.core.component';
  import { Builder } from 'DataComponentType';

  class GeckoLibClient {
    getArmorModelForItem<T extends LivingEntity>(var1: T, var2: ItemStack, var3: EquipmentSlot, var4: HumanoidModel<LivingEntity>): HumanoidModel<any>;
    getGeoModelForArmor(var1: ItemStack): GeoModel<any>;
    getGeoModelForItem(var1: ItemStack): GeoModel<any>;
  }


  class GeckoLibEvents {
    fireArmorPostRender(var1: GeoArmorRenderer<any>, var2: PoseStack, var3: BakedGeoModel, var4: MultiBufferSource, var5: number, var6: number): void;
    fireArmorPreRender(var1: GeoArmorRenderer<any>, var2: PoseStack, var3: BakedGeoModel, var4: MultiBufferSource, var5: number, var6: number): boolean;
    fireBlockPostRender(var1: GeoBlockRenderer<any>, var2: PoseStack, var3: BakedGeoModel, var4: MultiBufferSource, var5: number, var6: number): void;
    fireBlockPreRender(var1: GeoBlockRenderer<any>, var2: PoseStack, var3: BakedGeoModel, var4: MultiBufferSource, var5: number, var6: number): boolean;
    fireCompileArmorRenderLayers(var1: GeoArmorRenderer<any>): void;
    fireCompileBlockRenderLayers(var1: GeoBlockRenderer<any>): void;
    fireCompileEntityRenderLayers(var1: GeoEntityRenderer<any>): void;
    fireCompileItemRenderLayers(var1: GeoItemRenderer<any>): void;
    fireCompileObjectRenderLayers(var1: GeoObjectRenderer<any>): void;
    fireCompileReplacedEntityRenderLayers(var1: GeoReplacedEntityRenderer<any, any>): void;
    fireEntityPostRender(var1: GeoEntityRenderer<any>, var2: PoseStack, var3: BakedGeoModel, var4: MultiBufferSource, var5: number, var6: number): void;
    fireEntityPreRender(var1: GeoEntityRenderer<any>, var2: PoseStack, var3: BakedGeoModel, var4: MultiBufferSource, var5: number, var6: number): boolean;
    fireItemPostRender(var1: GeoItemRenderer<any>, var2: PoseStack, var3: BakedGeoModel, var4: MultiBufferSource, var5: number, var6: number): void;
    fireItemPreRender(var1: GeoItemRenderer<any>, var2: PoseStack, var3: BakedGeoModel, var4: MultiBufferSource, var5: number, var6: number): boolean;
    fireObjectPostRender(var1: GeoObjectRenderer<any>, var2: PoseStack, var3: BakedGeoModel, var4: MultiBufferSource, var5: number, var6: number): void;
    fireObjectPreRender(var1: GeoObjectRenderer<any>, var2: PoseStack, var3: BakedGeoModel, var4: MultiBufferSource, var5: number, var6: number): boolean;
    fireReplacedEntityPostRender(var1: GeoReplacedEntityRenderer<any, any>, var2: PoseStack, var3: BakedGeoModel, var4: MultiBufferSource, var5: number, var6: number): void;
    fireReplacedEntityPreRender(var1: GeoReplacedEntityRenderer<any, any>, var2: PoseStack, var3: BakedGeoModel, var4: MultiBufferSource, var5: number, var6: number): boolean;
  }


  class GeckoLibNetworking {
    static init(): void;
    registerPacketInternal<B extends FriendlyByteBuf, P extends MultiloaderPacket>(var1: Type<P>, var2: StreamCodec<B, P>, var3: boolean): void;
    sendToAllPlayersTrackingBlock(var1: MultiloaderPacket, var2: ServerLevel, var3: BlockPos): void;
    sendToAllPlayersTrackingEntity(var1: MultiloaderPacket, var2: Entity): void;
    sendToPlayer(var1: MultiloaderPacket, var2: ServerPlayer): void;
    stopTriggeredBlockEntityAnim(pos: BlockPos, level: ServerLevel, controllerName: string, animName: string): void;
    stopTriggeredEntityAnim(entity: Entity, isReplacedEntity: boolean, controllerName: string, animName: string): void;
    stopTriggeredSingletonAnim(animatableClass: Class<any>, entityToTrack: Entity, instanceId: number, controllerName: string, animName: string): void;
    stopTriggeredSingletonAnim(animatable: GeoAnimatable, entityToTrack: Entity, instanceId: number, controllerName: string, animName: string): void;
    syncBlockEntityAnimData<D>(pos: BlockPos, dataTicket: SerializableDataTicket<D>, data: D, level: ServerLevel): void;
    syncEntityAnimData<D>(entity: Entity, isReplacedEntity: boolean, dataTicket: SerializableDataTicket<D>, data: D): void;
    syncSingletonAnimData<D>(instanceId: number, dataTicket: SerializableDataTicket<D>, data: D, entityToTrack: Entity): void;
    syncSingletonAnimData<D>(animatableClass: Class<any>, instanceId: number, dataTicket: SerializableDataTicket<D>, data: D, entityToTrack: Entity): void;
    syncSingletonAnimData<D>(animatable: GeoAnimatable, instanceId: number, dataTicket: SerializableDataTicket<D>, data: D, entityToTrack: Entity): void;
    triggerBlockEntityAnim(pos: BlockPos, controllerName: string, animName: string, level: ServerLevel): void;
    triggerEntityAnim(entity: Entity, isReplacedEntity: boolean, controllerName: string, animName: string): void;
    triggerSingletonAnim(animatableClassName: string, entityToTrack: Entity, instanceId: number, controllerName: string, animName: string): void;
    triggerSingletonAnim(animatableClass: Class<any>, entityToTrack: Entity, instanceId: number, controllerName: string, animName: string): void;
    triggerSingletonAnim(animatable: GeoAnimatable, entityToTrack: Entity, instanceId: number, controllerName: string, animName: string): void;
  }


  class GeckoLibPlatform {
    get gameDir(): Path;
    isDevelopmentEnvironment(): boolean;
    isPhysicalClient(): boolean;
    registerDataComponent<T>(var1: string, var2: UnaryOperator<Builder<T>>): Supplier<DataComponentType<T>>;
  }

}

declare module 'software.bernie.geckolib.util' {
  import { Player } from 'net.minecraft.world.entity.player';
  import { Level } from 'net.minecraft.world.level';
  import { RuntimeException, Class, Long, Boolean, Float, Double, Integer } from 'java.lang';
  import { Map, List } from 'java.util';
  import { AnimatableInstanceCache } from 'software.bernie.geckolib.animatable.instance';
  import { GeoAnimatable } from 'software.bernie.geckolib.animatable';
  import { LoopType } from 'software.bernie.geckolib.animation.Animation';
  import { EasingType } from 'software.bernie.geckolib.animation';
  import { BakedModelFactory } from 'software.bernie.geckolib.loading.object';
  import { SerializableDataTicket } from 'software.bernie.geckolib.constant.dataticket';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { ItemStack } from 'net.minecraft.world.item';
  import { EquipmentSlot, LivingEntity, Entity, EntityType } from 'net.minecraft.world.entity';
  import { BiConsumer, Function } from 'java.util.function';
  import { HumanoidModel } from 'net.minecraft.client.model';
  import { PatchedDataComponentMap } from 'net.minecraft.core.component';
  import { JsonArray, JsonDeserializationContext, JsonElement, JsonObject } from 'com.google.gson';
  import { GeoBone, GeoCube } from 'software.bernie.geckolib.cache.object';
  import { Matrix4f, Vector3f } from 'org.joml';
  import { IntIntPair } from 'it.unimi.dsi.fastutil.ints';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ModelPart } from 'net.minecraft.client.model.geom';
  import { Direction } from 'net.minecraft.core';
  import { GeoModel } from 'software.bernie.geckolib.model';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';

  class ClientUtil {
    static get clientPlayer(): Player;
    static get level(): Level;
  }


  interface CompoundException extends RuntimeException {}
  class CompoundException extends RuntimeException {
    constructor(message: string);
    get localizedMessage(): string;
    toString(): string;
    withMessage(message: string): CompoundException;
  }


  class GeckoLibUtil {
    static readonly SYNCED_ANIMATABLES: Map;
    static addCustomBakedModelFactory(namespace: string, factory: BakedModelFactory): void;
    static addCustomEasingType(name: string, easingType: EasingType): EasingType;
    static addCustomLoopType(name: string, loopType: LoopType): LoopType;
    static addDataTicket<D>(dataTicket: SerializableDataTicket<D>): SerializableDataTicket<D>;
    static createInstanceCache(animatable: GeoAnimatable): AnimatableInstanceCache;
    static createInstanceCache(animatable: GeoAnimatable, singletonObject: boolean): AnimatableInstanceCache;
    static getSyncedAnimatable(syncedAnimatableId: string): GeoAnimatable;
    static getSyncedSingletonAnimatableId(animatable: GeoAnimatable): string;
    static registerSyncedAnimatable(animatable: GeoAnimatable): void;
  }


  class InternalUtil {
    static areComponentsMatchingIgnoringGeckoLibId(map1: PatchedDataComponentMap, map2: PatchedDataComponentMap): boolean;
    static tryRenderGeoArmorPiece<T extends LivingEntity, M extends HumanoidModel<T>, A extends HumanoidModel<T>>(poseStack: PoseStack, bufferSource: MultiBufferSource, entity: T, stack: ItemStack, equipmentSlot: EquipmentSlot, parentModel: M, baseModel: A, partialTick: number, packedLight: number, limbSwing: number, limbSwingAmount: number, lerpedTickCount: number, netHeadYaw: number, headPitch: number, partVisibilitySetter: BiConsumer<A, EquipmentSlot>): boolean;
  }


  class JsonUtil {
    static getOptionalBoolean(obj: JsonObject, elementName: string): boolean;
    static getOptionalDouble(obj: JsonObject, elementName: string): number;
    static getOptionalFloat(obj: JsonObject, elementName: string): number;
    static getOptionalInteger(obj: JsonObject, elementName: string): number;
    static getOptionalLong(obj: JsonObject, elementName: string): Long;
    static jsonArrayToDoubleArray(array: JsonArray): number[];
    static jsonArrayToList<T>(array: JsonArray, elementTransformer: Function<JsonElement, T>): T[];
    static jsonArrayToObjectArray<T>(array: JsonArray, context: JsonDeserializationContext, objectClass: Class<T>): T[];
    static jsonObjToMap<T>(obj: JsonObject, context: JsonDeserializationContext, objectType: Class<T>): Map<string, T>;
  }


  class RenderUtil {
    static arrayToVec(array: number[]): Vec3;
    static booleanToFloat(input: boolean): number;
    static faceRotation(poseStack: PoseStack, animatable: Entity, partialTick: number): void;
    static fixInvertedFlatCube(cube: GeoCube, normal: Vector3f): void;
    static get currentSystemTick(): number;
    static get currentTick(): number;
    static getDirectionAngle(direction: Direction): number;
    static getGeoModelForArmor(stack: ItemStack): GeoModel<any>;
    static getGeoModelForBlock(blockEntity: BlockEntity): GeoModel<any>;
    static getGeoModelForEntity(entity: Entity): GeoModel<any>;
    static getGeoModelForEntityType(entityType: EntityType<any>): GeoModel<any>;
    static getGeoModelForItem(item: ItemStack): GeoModel<any>;
    static getReplacedAnimatable(entityType: EntityType<any>): GeoAnimatable;
    static getTextureDimensions(texture: ResourceLocation): IntIntPair;
    static invertAndMultiplyMatrices(baseMatrix: Matrix4f, inputMatrix: Matrix4f): Matrix4f;
    static lerpYaw(delta: number, start: number, end: number): number;
    static matchModelPartRot(from: ModelPart, to: GeoBone): void;
    static prepMatrixForBone(poseStack: PoseStack, bone: GeoBone): void;
    static rotateMatrixAroundBone(poseStack: PoseStack, bone: GeoBone): void;
    static rotateMatrixAroundCube(poseStack: PoseStack, cube: GeoCube): void;
    static scaleMatrixForBone(poseStack: PoseStack, bone: GeoBone): void;
    static translateAndRotateMatrixForBone(poseStack: PoseStack, bone: GeoBone): void;
    static translateAwayFromPivotPoint(poseStack: PoseStack, cube: GeoCube): void;
    static translateAwayFromPivotPoint(poseStack: PoseStack, bone: GeoBone): void;
    static translateMatrix(matrix: Matrix4f, vector: Vector3f): Matrix4f;
    static translateMatrixToBone(poseStack: PoseStack, bone: GeoBone): void;
    static translateToPivotPoint(poseStack: PoseStack, cube: GeoCube): void;
    static translateToPivotPoint(poseStack: PoseStack, bone: GeoBone): void;
  }

}