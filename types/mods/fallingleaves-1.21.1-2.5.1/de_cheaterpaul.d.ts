declare module 'de.cheaterpaul.fallingleaves.config' {
  import { IntValue, BooleanValue, ConfigValue, Builder } from 'ModConfigSpec';

  class ClientConfig {
    readonly leafSize: IntValue;
    readonly leafLifespan: IntValue;
    readonly leafSpawnRate: IntValue;
    readonly snowSpawnRate: IntValue;
    readonly coniferLeafSpawnRate: IntValue;
    readonly dropFromPlayerPlacedBlocks: BooleanValue;
    readonly maxDecayingLeaves: IntValue;
    readonly minimumFreeSpaceBelow: IntValue;
    readonly disableWind: BooleanValue;
    readonly windlessDimension: ConfigValue;
    readonly disableSeasonalModifier: BooleanValue;
    readonly disableSnow: BooleanValue;
    readonly maxDecayingSnowParticles: IntValue;
    constructor(builder: Builder);
  }

}

declare module 'de.cheaterpaul.fallingleaves.data' {
  import { RegisterClientReloadListenersEvent, TextureAtlasStitchedEvent } from 'net.neoforged.neoforge.client.event';
  import { LeafTypeSettings, ParticleProvider } from 'de.cheaterpaul.fallingleaves.data.LeafTypeLoader';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { MutableSpriteSet } from 'ParticleEngine';
  import { LeafSettingsEntry } from 'de.cheaterpaul.fallingleaves.config';
  import { DataProvider, PackOutput, CachedOutput } from 'net.minecraft.data';
  import { CompletableFuture, Executor } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';
  import { SimpleJsonResourceReloadListener, PreparableReloadListener, ResourceManager } from 'net.minecraft.server.packs.resources';
  import { Collection } from 'java.util';
  import { TextureManager } from 'net.minecraft.client.renderer.texture';
  import { Void } from 'java.lang';
  import { PreparationBarrier } from 'PreparableReloadListener';
  import { ProfilerFiller } from 'net.minecraft.util.profiling';

  class LeafLoader {
    get spriteSet(): MutableSpriteSet;
    static getLeafSetting(location: ResourceLocation): LeafSettingsEntry;
    static getSnowParticleProvider(settings: LeafTypeSettings): ParticleProvider;
    static getSpriteForLeafType(leafType: ResourceLocation): LeafTypeSettings;
    lifeSpawnModifier(): number;
    static onReload(event: TextureAtlasStitchedEvent): void;
    static registerReloadListeners(event: RegisterClientReloadListenersEvent): void;
    sizeModifier(): number;
  }


  interface LeafSettingGenerator extends DataProvider {}
  class LeafSettingGenerator extends DataProvider {
    constructor(packOutput: PackOutput, holderLookup: CompletableFuture<Provider>);
    get name(): string;
    run(cache: CachedOutput): CompletableFuture<any>;
  }


  interface LeafSettingLoader extends SimpleJsonResourceReloadListener {}
  class LeafSettingLoader extends SimpleJsonResourceReloadListener {
    constructor();
    get aLlSettings(): Collection<LeafSettingsEntry>;
    getLeafSetting(loc: ResourceLocation): LeafSettingsEntry;
  }


  interface LeafTypeLoader extends PreparableReloadListener {}
  class LeafTypeLoader extends PreparableReloadListener {
    static readonly LEAVES_ATLAS: ResourceLocation;
    constructor(manager: TextureManager);
    close(): void;
    get name(): string;
    getSpriteSet(leafType: ResourceLocation): LeafTypeSettings;
    reload(stage: PreparationBarrier, resourceManager: ResourceManager, p_10640_: ProfilerFiller, p_10641_: ProfilerFiller, pBackgroundExecutor: Executor, p_10643_: Executor): CompletableFuture<Void>;
  }

}

declare module 'de.cheaterpaul.fallingleaves.data.LeafTypeLoader' {
  import { MutableSpriteSet } from 'ParticleEngine';

  interface LeafTypeSettings extends ParticleProvider {}
  class LeafTypeSettings extends ParticleProvider {
    constructor(spriteSet: MutableSpriteSet, leafType: LeafType);
    get leafType(): LeafType;
    get spriteSet(): MutableSpriteSet;
    lifeSpawnModifier(): number;
    sizeModifier(): number;
    snowSizeModifier(): number;
  }


  class ParticleProvider {
    get spriteSet(): MutableSpriteSet;
    lifeSpawnModifier(): number;
    sizeModifier(): number;
  }

}

declare module 'de.cheaterpaul.fallingleaves' {
  import { LeftClickBlock } from 'PlayerInteractEvent';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { BlockPos } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';
  import { LeafSettingsEntry, ClientConfig } from 'de.cheaterpaul.fallingleaves.config';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';
  import { GatherDataEvent } from 'net.neoforged.neoforge.data.event';

  class EventHandler {
    static onAttackLeavesBlock(e: LeftClickBlock): void;
    static spawnDecayingParticles(state: BlockState, level: ClientLevel, pos: BlockPos, random: RandomSource): void;
    static spawnLeaves(state: BlockState, level: ClientLevel, pos: BlockPos, random: RandomSource, leafSettings: LeafSettingsEntry): void;
    static spawnParticles(state: BlockState, level: ClientLevel, pos: BlockPos, random: RandomSource): void;
    static spawnSnow(state: BlockState, level: ClientLevel, pos: BlockPos, random: RandomSource, leafSettings: LeafSettingsEntry): void;
  }


  class FallingLeavesMod {
    static readonly MOD_ID: string;
    static readonly DEFAULT: ResourceLocation;
    static readonly CONIFER: ResourceLocation;
    static readonly PALMS: ResourceLocation;
    static readonly MAHOGANY: ResourceLocation;
    static readonly MAPLE: ResourceLocation;
    static readonly SNOW: ResourceLocation;
    static readonly CONFIG: ClientConfig;
    constructor(modBus: IEventBus, container: ModContainer);
    static gatherData(event: GatherDataEvent): void;
  }

}

declare module 'de.cheaterpaul.fallingleaves.math' {
  import { Random } from 'java.util';

  class FloatFunction {
    apply(var1: number): number;
  }


  class SmoothNoise {
    constructor(tickInterval: number, initial: number, nextNoise: FloatFunction);
    get leftNoise(): number;
    get lerp(): number;
    get noise(): number;
    get rightNoise(): number;
    static smoothstep(t: number): number;
    tick(): void;
  }


  class TriangularDistribution {
    readonly a: number;
    readonly b: number;
    readonly c: number;
    constructor(a: number, b: number, c: number, rng: Random);
    sample(): number;
  }

}

declare module 'de.cheaterpaul.fallingleaves.mixin' {
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { Reason } from 'ReceivingLevelScreen';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  class LeafTickMixin {
    getStateForPlacement(var1: BlockPlaceContext): BlockState;
  }


  class MinecraftClientMixin {
    joinWorld(p_91157_: ClientLevel, p_341652_: Reason, ci: CallbackInfo): void;
  }


  class NativeImageAccessor {
    get pixels(): number;
  }


  class ParticleEngineMixin {
  }


  class ParticleManagerMixin {
    tick(ci: CallbackInfo): void;
  }

}

declare module 'de.cheaterpaul.fallingleaves.modcompat' {
  import { Level } from 'net.minecraft.world.level';
  import { Builder } from 'ModConfigSpec';
  import { Loading, Reloading } from 'ModConfigEvent';
  import { Pair } from 'org.apache.commons.lang3.tuple';
  import { Enum, Float } from 'java.lang';

  class SereneSeasons {
    static getModifier(level: Level): number;
    static onLoad(event: Loading): void;
    static onLoad(event: Reloading): void;
    static registerConfig(builder: Builder): void;
    static setup(): boolean;
  }


  class SereneSeasonsConfig {
    constructor(builder: Builder);
    create(string: string): Pair<Enum<any>, number>;
    exists(string: string): boolean;
    getModifier(level: Level): number;
    updateCache(): void;
  }

}

declare module 'de.cheaterpaul.fallingleaves.util' {
  import { TextureSheetParticle, ParticleRenderType } from 'net.minecraft.client.particle';
  import { VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { Camera } from 'net.minecraft.client';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { BlockPos } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';
  import { LeafSettingsEntry } from 'de.cheaterpaul.fallingleaves.config';
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { ModelData } from 'net.neoforged.neoforge.client.model.data';
  import { Map } from 'java.util';
  import { TextureAtlasStitchedEvent } from 'net.neoforged.neoforge.client.event';

  interface FallingLeafParticle extends TextureSheetParticle {}
  class FallingLeafParticle extends TextureSheetParticle {
    static readonly LEAVES_SHEET: ParticleRenderType;
    get renderType(): ParticleRenderType;
    move(pX: number, pY: number, pZ: number): void;
    render(pBuffer: VertexConsumer, pRenderInfo: Camera, pPartialTicks: number): void;
    tick(): void;
  }


  class LeafUtil {
    static averageColor(image: NativeImage): number[];
    static getBlockTextureColor(state: BlockState, level: ClientLevel, pos: BlockPos, modelData: ModelData): number[];
    static isLeafBlock(block: BlockState, useBlockTags: boolean): boolean;
    static trySpawnLeafParticle(state: BlockState, level: ClientLevel, pos: BlockPos, random: RandomSource, leafSettings: LeafSettingsEntry): void;
    static trySpawnSnowParticle(state: BlockState, level: ClientLevel, pos: BlockPos, random: RandomSource, leafSettings: LeafSettingsEntry): void;
  }


  class TextureCache {
    static readonly INST: Map;
    static onReload(event: TextureAtlasStitchedEvent): void;
  }


  class Wind {
    static windX: number;
    static windZ: number;
    static debug(): void;
    static init(): void;
    static tick(world: ClientLevel): void;
  }

}

declare module 'de.cheaterpaul.fallingleaves.util.FallingLeafParticle' {
  import { ParticleProvider, Particle } from 'net.minecraft.client.particle';
  import { SimpleParticleType } from 'net.minecraft.core.particles';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { ParticleProvider as de_cheaterpaul_fallingleaves_data_leaftypeloader_ParticleProvider } from 'de.cheaterpaul.fallingleaves.data.LeafTypeLoader';

  interface LeavesParticleFactory extends ParticleProvider<SimpleParticleType> {}
  class LeavesParticleFactory extends ParticleProvider<SimpleParticleType> {
    createParticle(parameters: SimpleParticleType, world: ClientLevel, x: number, y: number, z: number, r: number, g: number, b: number): Particle;
    createParticle(parameters: SimpleParticleType, world: ClientLevel, x: number, y: number, z: number, r: number, g: number, b: number, spriteSet: de_cheaterpaul_fallingleaves_data_leaftypeloader_ParticleProvider): Particle;
  }

}