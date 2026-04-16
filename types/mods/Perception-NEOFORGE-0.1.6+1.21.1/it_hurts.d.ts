declare module 'it.hurts.octostudios.perception.common.config' {
  import { OctoConfig } from 'it.hurts.octostudios.octolib.module.config.impl';

  interface PerceptionConfigData extends OctoConfig {}
  class PerceptionConfigData extends OctoConfig {
    equals(o: any): boolean;
    hashCode(): number;
    isEnabledExtendedConfigs(): boolean;
    isEnabledShakesModule(): boolean;
    isEnabledTrailsModule(): boolean;
    setEnabledExtendedConfigs(enabledExtendedConfigs: boolean): void;
    setEnabledShakesModule(enabledShakesModule: boolean): void;
    setEnabledTrailsModule(enabledTrailsModule: boolean): void;
    toString(): string;
  }

}

declare module 'it.hurts.octostudios.perception.common.init' {
  import { PerceptionConfigData } from 'it.hurts.octostudios.perception.common.config';
  import { ShakeConfig } from 'it.hurts.octostudios.perception.common.modules.shake.config';
  import { TrailConfig } from 'it.hurts.octostudios.perception.common.modules.trail.config';

  class ConfigRegistry {
    static PERCEPTION_CONFIG: PerceptionConfigData;
    static SHAKE_CONFIG: ShakeConfig;
    static TRAIL_CONFIG: TrailConfig;
    static registerCommon(): void;
  }

}

declare module 'it.hurts.octostudios.perception.common.misc' {
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

}

declare module 'it.hurts.octostudios.perception.common.mixin.shakes' {
  import { CallbackInfoReturnable, CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Float } from 'java.lang';
  import { BlockGetter } from 'net.minecraft.world.level';
  import { Entity } from 'net.minecraft.world.entity';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';

  class AbstractClientPlayerMixin {
    getFieldOfViewModifier(cir: CallbackInfoReturnable<number>): void;
  }


  class CameraMixin {
    onSetup(blockGetter: BlockGetter, entity: Entity, bl: boolean, bl2: boolean, partialTicks: number, ci: CallbackInfo): void;
  }


  class ClientLevelMixin {
    onPlaySound(x: number, y: number, z: number, soundEvent: SoundEvent, source: SoundSource, volume: number, pitch: number, distanceDelay: boolean, seed: number, ci: CallbackInfo): void;
  }


  class GameRendererMixin {
  }


  class PlayerMixin {
  }

}

declare module 'it.hurts.octostudios.perception.common.mixin.trails.particle' {
  class ParticleEngineMixin {
  }


  class ParticleMixin {
  }

}

declare module 'it.hurts.octostudios.perception.common.modules.base.config' {
  import { OctoConfig } from 'it.hurts.octostudios.octolib.module.config.impl';

  interface ModuleConfig extends OctoConfig {}
  class ModuleConfig extends OctoConfig {
    equals(o: any): boolean;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'it.hurts.octostudios.perception.common.modules.shake.config.data' {
  import { ShakeConfigDataBuilder } from 'it.hurts.octostudios.perception.common.modules.shake.config.data.ShakeConfigData';

  class FallShakeConfigData {
    constructor();

    constructor(intensity: number, minSpeed: number);
    equals(o: any): boolean;
    get intensity(): number;
    get minSpeed(): number;
    hashCode(): number;
    set intensity(intensity: number);
    set minSpeed(minSpeed: number);
    toString(): string;
  }


  class ShakeConfigData {
    constructor();

    constructor(rangeMultiplier: number, rotationAmplitude: number, offsetAmplitude: number, fovAmplitude: number, rotationSpeed: number, offsetSpeed: number, fovSpeed: number, duration: number, fadeInTime: number, fadeOutTime: number);
    static builder(): ShakeConfigDataBuilder;
    equals(o: any): boolean;
    get duration(): number;
    get fadeInTime(): number;
    get fadeOutTime(): number;
    get fovAmplitude(): number;
    get fovSpeed(): number;
    get offsetAmplitude(): number;
    get offsetSpeed(): number;
    get rangeMultiplier(): number;
    get rotationAmplitude(): number;
    get rotationSpeed(): number;
    hashCode(): number;
    set duration(duration: number);
    set fadeInTime(fadeInTime: number);
    set fadeOutTime(fadeOutTime: number);
    set fovAmplitude(fovAmplitude: number);
    set fovSpeed(fovSpeed: number);
    set offsetAmplitude(offsetAmplitude: number);
    set offsetSpeed(offsetSpeed: number);
    set rangeMultiplier(rangeMultiplier: number);
    set rotationAmplitude(rotationAmplitude: number);
    set rotationSpeed(rotationSpeed: number);
    toString(): string;
  }

}

declare module 'it.hurts.octostudios.perception.common.modules.shake.config.data.ShakeConfigData' {
  import { ShakeConfigData } from 'it.hurts.octostudios.perception.common.modules.shake.config.data';

  class ShakeConfigDataBuilder {
    amplitude(rotationAmplitude: number, offsetAmplitude: number, fovAmplitude: number): ShakeConfigDataBuilder;
    amplitude(amplitude: number): ShakeConfigDataBuilder;
    build(): ShakeConfigData;
    duration(duration: number): ShakeConfigDataBuilder;
    fadeInTime(fadeInTime: number): ShakeConfigDataBuilder;
    fadeOutTime(fadeOutTime: number): ShakeConfigDataBuilder;
    fovAmplitude(fovAmplitude: number): ShakeConfigDataBuilder;
    fovSpeed(fovSpeed: number): ShakeConfigDataBuilder;
    offsetAmplitude(offsetAmplitude: number): ShakeConfigDataBuilder;
    offsetSpeed(offsetSpeed: number): ShakeConfigDataBuilder;
    rangeMultiplier(rangeMultiplier: number): ShakeConfigDataBuilder;
    rotationAmplitude(rotationAmplitude: number): ShakeConfigDataBuilder;
    rotationSpeed(rotationSpeed: number): ShakeConfigDataBuilder;
    speed(rotationSpeed: number, offsetSpeed: number, fovSpeed: number): ShakeConfigDataBuilder;
    speed(speed: number): ShakeConfigDataBuilder;
    toString(): string;
  }

}

declare module 'it.hurts.octostudios.perception.common.modules.shake.config' {
  import { ModuleConfig } from 'it.hurts.octostudios.perception.common.modules.base.config';
  import { FallShakeConfigData, ShakeConfigData } from 'it.hurts.octostudios.perception.common.modules.shake.config.data';
  import { Map } from 'java.util';

  interface ShakeConfig extends ModuleConfig {}
  class ShakeConfig extends ModuleConfig {
    equals(o: any): boolean;
    get fallShakes(): FallShakeConfigData;
    get soundShakes(): Map<string, ShakeConfigData>;
    hashCode(): number;
    set fallShakes(fallShakes: FallShakeConfigData);
    set soundShakes(soundShakes: Map<string, ShakeConfigData>);
    toString(): string;
  }

}

declare module 'it.hurts.octostudios.perception.common.modules.shake.data.base' {
  import { Vec3 } from 'net.minecraft.world.phys';

  class ShakeSource {
    get pos(): Vec3;
  }

}

declare module 'it.hurts.octostudios.perception.common.modules.shake.data' {
  import { ShakeSource } from 'it.hurts.octostudios.perception.common.modules.shake.data.base';
  import { Entity } from 'net.minecraft.world.entity';
  import { Vec3 } from 'net.minecraft.world.phys';

  interface EntityShakeSource extends ShakeSource {}
  class EntityShakeSource extends ShakeSource {
    constructor(source: Entity);
    equals(o: any): boolean;
    get pos(): Vec3;
    get source(): Entity;
    hashCode(): number;
    toString(): string;
  }


  interface PositionShakeSource extends ShakeSource {}
  class PositionShakeSource extends ShakeSource {
    constructor(source: Vec3);
    equals(o: any): boolean;
    get pos(): Vec3;
    get source(): Vec3;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'it.hurts.octostudios.perception.common.modules.shake' {
  import { ShakeBuilder } from 'it.hurts.octostudios.perception.common.modules.shake.Shake';
  import { ShakeSource } from 'it.hurts.octostudios.perception.common.modules.shake.data.base';
  import { Entity } from 'net.minecraft.world.entity';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Vector3f } from 'org.joml';
  import { Function, Supplier } from 'java.util.function';
  import { Float, Integer, Boolean } from 'java.lang';
  import { UUID, Map } from 'java.util';

  class Shake {
    static builder(source: ShakeSource): ShakeBuilder;
    static builder(entity: Entity): ShakeBuilder;
    static builder(position: Vec3): ShakeBuilder;
    equals(o: any): boolean;
    get currentTickOffset(): Vector3f;
    get currentTickRotation(): Vector3f;
    get distanceAmplitudeEasing(): Function<number, number>;
    get distanceSpeedEasing(): Function<number, number>;
    get duration(): number;
    get elapsedTime(): number;
    get fadeInTime(): number;
    get fadeOutTime(): number;
    get fovAmplitude(): number;
    get fovFadeInEasing(): Function<number, number>;
    get fovFadeOutEasing(): Function<number, number>;
    get fovSpeed(): number;
    get frequency(): Vec3;
    get lastTickOffset(): Vector3f;
    get lastTickRotation(): Vector3f;
    get offsetAmplitude(): number;
    get offsetFadeInEasing(): Function<number, number>;
    get offsetFadeOutEasing(): Function<number, number>;
    get offsetSpeed(): number;
    get rangeMultiplier(): number;
    get removeCondition(): boolean;
    get rotationAmplitude(): number;
    get rotationFadeInEasing(): Function<number, number>;
    get rotationFadeOutEasing(): Function<number, number>;
    get rotationSpeed(): number;
    get source(): ShakeSource;
    get uuid(): UUID;
    getCumulativeFovAmplitude(player: Player): number;
    getCumulativeFovSpeed(player: Player): number;
    getCumulativeOffsetAmplitude(player: Player): number;
    getCumulativeOffsetSpeed(player: Player): number;
    getCumulativeRotationAmplitude(player: Player): number;
    getCumulativeRotationSpeed(player: Player): number;
    getShakeFOV(player: Player, partialTicks: number): number;
    getShakeOffset(player: Player, partialTicks: number): Vector3f;
    getShakeRotation(player: Player, partialTicks: number): Vector3f;
    hashCode(): number;
    isFinished(): boolean;
    set distanceAmplitudeEasing(distanceAmplitudeEasing: Function<number, number>);
    set distanceSpeedEasing(distanceSpeedEasing: Function<number, number>);
    set duration(duration: Supplier<number>);
    set elapsedTime(elapsedTime: number);
    set fadeInTime(fadeInTime: Supplier<number>);
    set fadeOutTime(fadeOutTime: Supplier<number>);
    set fovAmplitude(fovAmplitude: Supplier<number>);
    set fovFadeInEasing(fovFadeInEasing: Function<number, number>);
    set fovFadeOutEasing(fovFadeOutEasing: Function<number, number>);
    set fovSpeed(fovSpeed: Supplier<number>);
    set offsetAmplitude(offsetAmplitude: Supplier<number>);
    set offsetFadeInEasing(offsetFadeInEasing: Function<number, number>);
    set offsetFadeOutEasing(offsetFadeOutEasing: Function<number, number>);
    set offsetSpeed(offsetSpeed: Supplier<number>);
    set rangeMultiplier(rangeMultiplier: Supplier<number>);
    set removeCondition(removeCondition: Supplier<boolean>);
    set rotationAmplitude(rotationAmplitude: Supplier<number>);
    set rotationFadeInEasing(rotationFadeInEasing: Function<number, number>);
    set rotationFadeOutEasing(rotationFadeOutEasing: Function<number, number>);
    set rotationSpeed(rotationSpeed: Supplier<number>);
    set source(source: ShakeSource);
    set uuid(uuid: UUID);
    toString(): string;
    update(player: Player): void;
  }


  class ShakeManager {
    static readonly SHAKES: Map;
    static add(shake: Shake): void;
  }

}

declare module 'it.hurts.octostudios.perception.common.modules.shake.Shake' {
  import { Supplier, Function } from 'java.util.function';
  import { Float, Integer, Boolean } from 'java.lang';
  import { UUID } from 'java.util';
  import { Shake } from 'it.hurts.octostudios.perception.common.modules.shake';

  class ShakeBuilder {
    amplitude(rotationAmplitude: Supplier<number>, offsetAmplitude: Supplier<number>, fovAmplitude: Supplier<number>): ShakeBuilder;
    amplitude(amplitude: Supplier<number>): ShakeBuilder;
    amplitude(rotationAmplitude: number, offsetAmplitude: number, fovAmplitude: number): ShakeBuilder;
    amplitude(amplitude: number): ShakeBuilder;
    build(): Shake;
    distanceAmplitudeEasing(distanceAmplitudeEasing: Function<number, number>): ShakeBuilder;
    distanceSpeedEasing(distanceSpeedEasing: Function<number, number>): ShakeBuilder;
    duration(duration: Supplier<number>): ShakeBuilder;
    duration(duration: number): ShakeBuilder;
    fadeInTime(fadeInTime: Supplier<number>): ShakeBuilder;
    fadeInTime(fadeInTime: number): ShakeBuilder;
    fadeOutTime(fadeOutTime: Supplier<number>): ShakeBuilder;
    fadeOutTime(fadeOutTime: number): ShakeBuilder;
    fovAmplitude(amplitude: Supplier<number>): ShakeBuilder;
    fovAmplitude(amplitude: number): ShakeBuilder;
    fovFadeInEasing(fovFadeInEasing: Function<number, number>): ShakeBuilder;
    fovFadeOutEasing(fovFadeOutEasing: Function<number, number>): ShakeBuilder;
    fovSpeed(speed: Supplier<number>): ShakeBuilder;
    fovSpeed(speed: number): ShakeBuilder;
    offsetAmplitude(amplitude: Supplier<number>): ShakeBuilder;
    offsetAmplitude(amplitude: number): ShakeBuilder;
    offsetFadeInEasing(offsetFadeInEasing: Function<number, number>): ShakeBuilder;
    offsetFadeOutEasing(offsetFadeOutEasing: Function<number, number>): ShakeBuilder;
    offsetSpeed(speed: Supplier<number>): ShakeBuilder;
    offsetSpeed(speed: number): ShakeBuilder;
    rangeMultiplier(radius: Supplier<number>): ShakeBuilder;
    rangeMultiplier(rangeMultiplier: number): ShakeBuilder;
    removeCondition(removeCondition: Supplier<boolean>): ShakeBuilder;
    rotationAmplitude(amplitude: Supplier<number>): ShakeBuilder;
    rotationAmplitude(amplitude: number): ShakeBuilder;
    rotationFadeInEasing(rotationFadeInEasing: Function<number, number>): ShakeBuilder;
    rotationFadeOutEasing(rotationFadeOutEasing: Function<number, number>): ShakeBuilder;
    rotationSpeed(speed: Supplier<number>): ShakeBuilder;
    rotationSpeed(speed: number): ShakeBuilder;
    speed(rotationSpeed: Supplier<number>, offsetSpeed: Supplier<number>, fovSpeed: Supplier<number>): ShakeBuilder;
    speed(speed: Supplier<number>): ShakeBuilder;
    speed(rotationSpeed: number, offsetSpeed: number, fovSpeed: number): ShakeBuilder;
    speed(speed: number): ShakeBuilder;
    toString(): string;
    uuid(uuid: UUID): ShakeBuilder;
  }

}

declare module 'it.hurts.octostudios.perception.common.modules.trail.config.data' {
  import { Vector3f } from 'org.joml';

  class TrailConfigData {
    constructor();

    constructor(size: number, maxPoints: number, minSpeed: number, updateFrequency: number, fadeInColor: string, fadeOutColor: string, positionOffset: Vector3f, backwardShift: number, motionShift: number);
    equals(o: any): boolean;
    get backwardShift(): number;
    get fadeInColor(): string;
    get fadeOutColor(): string;
    get maxPoints(): number;
    get minSpeed(): number;
    get motionShift(): number;
    get positionOffset(): Vector3f;
    get size(): number;
    get updateFrequency(): number;
    hashCode(): number;
    set backwardShift(backwardShift: number);
    set fadeInColor(fadeInColor: string);
    set fadeOutColor(fadeOutColor: string);
    set maxPoints(maxPoints: number);
    set minSpeed(minSpeed: number);
    set motionShift(motionShift: number);
    set positionOffset(positionOffset: Vector3f);
    set size(size: number);
    set updateFrequency(updateFrequency: number);
    toString(): string;
  }

}

declare module 'it.hurts.octostudios.perception.common.modules.trail.config' {
  import { ModuleConfig } from 'it.hurts.octostudios.perception.common.modules.base.config';
  import { Map } from 'java.util';
  import { TrailConfigData } from 'it.hurts.octostudios.perception.common.modules.trail.config.data';

  interface TrailConfig extends ModuleConfig {}
  class TrailConfig extends ModuleConfig {
    equals(o: any): boolean;
    get entityTrails(): Map<string, TrailConfigData>;
    get particleTrails(): Map<string, TrailConfigData>;
    hashCode(): number;
    set entityTrails(entityTrails: Map<string, TrailConfigData>);
    set particleTrails(particleTrails: Map<string, TrailConfigData>);
    toString(): string;
  }

}

declare module 'it.hurts.octostudios.perception.common.modules.trail.misc' {
  import { EntityTrailProvider } from 'it.hurts.octostudios.octolib.module.particle.trail';
  import { Entity } from 'net.minecraft.world.entity';
  import { TrailConfigData } from 'it.hurts.octostudios.perception.common.modules.trail.config.data';

  class TrailProviderFactory {
    static create(entity: Entity, data: TrailConfigData): EntityTrailProvider<any>;
  }

}

declare module 'it.hurts.octostudios.perception.common.modules.trail.misc.wrapper' {
  import { TrailWrapper } from 'it.hurts.octostudios.perception.common.modules.trail.misc.wrapper.base';
  import { Arrow, FireworkRocketEntity, ThrownPotion } from 'net.minecraft.world.entity.projectile';
  import { TrailConfigData } from 'it.hurts.octostudios.perception.common.modules.trail.config.data';
  import { ExperienceOrb } from 'net.minecraft.world.entity';

  interface ArrowTrailWrapper extends TrailWrapper<Arrow> {}
  class ArrowTrailWrapper extends TrailWrapper<Arrow> {
    constructor(entity: Arrow, data: TrailConfigData);
    get trailFadeInColor(): number;
  }


  interface ExperienceOrbTrailWrapper extends TrailWrapper<ExperienceOrb> {}
  class ExperienceOrbTrailWrapper extends TrailWrapper<ExperienceOrb> {
    constructor(entity: ExperienceOrb, data: TrailConfigData);
    get trailScale(): number;
  }


  interface FireworkRocketTrailWrapper extends TrailWrapper<FireworkRocketEntity> {}
  class FireworkRocketTrailWrapper extends TrailWrapper<FireworkRocketEntity> {
    constructor(entity: FireworkRocketEntity, data: TrailConfigData);
    get trailFadeInColor(): number;
  }


  interface ThrownPotionTrailWrapper extends TrailWrapper<ThrownPotion> {}
  class ThrownPotionTrailWrapper extends TrailWrapper<ThrownPotion> {
    constructor(entity: ThrownPotion, data: TrailConfigData);
    get trailFadeInColor(): number;
  }

}

declare module 'it.hurts.octostudios.perception.common.modules.trail.misc.wrapper.base' {
  import { EntityTrailProvider } from 'it.hurts.octostudios.octolib.module.particle.trail';
  import { TrailConfigData } from 'it.hurts.octostudios.perception.common.modules.trail.config.data';
  import { Vec3 } from 'net.minecraft.world.phys';

  interface TrailWrapper<T extends Entity = any> extends EntityTrailProvider<T> {}
  class TrailWrapper<T extends Entity = any> extends EntityTrailProvider<T> {
    constructor(entity: T, data: TrailConfigData);
    get data(): TrailConfigData;
    get trailFadeInColor(): number;
    get trailFadeOutColor(): number;
    get trailMaxLength(): number;
    get trailScale(): number;
    get trailUpdateFrequency(): number;
    getTrailPosition(partialTicks: number): Vec3;
    isTrailAlive(): boolean;
    isTrailGrowing(): boolean;
    set data(data: TrailConfigData);
  }

}

declare module 'it.hurts.octostudios.perception.common' {
  class Perception {
    static readonly MODID: string;
    static init(): void;
  }


  class PerceptionClient {
    static init(): void;
  }

}

declare module 'it.hurts.octostudios.perception.neoforge' {
  import { IEventBus } from 'net.neoforged.bus.api';

  class PerceptionNeoForge {
    constructor(modBus: IEventBus);
  }


  class PerceptionNeoForgeClient {
    constructor(modBus: IEventBus);
  }

}