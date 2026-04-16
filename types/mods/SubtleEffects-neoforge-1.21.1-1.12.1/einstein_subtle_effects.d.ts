declare module 'einstein.subtle_effects.client.model.entity' {
  import { HumanoidModel } from 'net.minecraft.client.model';
  import { ModelLayerLocation, ModelPart } from 'net.minecraft.client.model.geom';
  import { LayerDefinition } from 'net.minecraft.client.model.geom.builders';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';

  interface EinsteinSolarSystemModel<T extends AbstractClientPlayer = any> extends HumanoidModel<T> {}
  class EinsteinSolarSystemModel<T extends AbstractClientPlayer = any> extends HumanoidModel<T> {
    static readonly MODEL_LAYER: ModelLayerLocation;
    constructor(rootPart: ModelPart);
    copyPropertiesTo(model: HumanoidModel<T>): void;
    static createLayer(): LayerDefinition;
    prepareMobModel(player: T, limbSwing: number, limbSwingAmount: number, partialTick: number): void;
    renderToBuffer(poseStack: PoseStack, consumer: VertexConsumer, packedLight: number, packedOverlay: number, color: number): void;
    setAllVisible(visible: boolean): void;
    setupAnim(player: T, limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }

}

declare module 'einstein.subtle_effects.client.renderer.entity' {
  import { RenderLayer } from 'net.minecraft.client.renderer.entity.layers';
  import { RenderLayerParent } from 'net.minecraft.client.renderer.entity';
  import { Context } from 'EntityRendererProvider';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { EinsteinSolarSystemModel } from 'einstein.subtle_effects.client.model.entity';
  import { AbstractClientPlayer } from 'net.minecraft.client.player';

  interface EinsteinSolarSystemLayer<T extends AbstractClientPlayer = any, V extends PlayerModel<T> = any> extends RenderLayer<T, V> {}
  class EinsteinSolarSystemLayer<T extends AbstractClientPlayer = any, V extends PlayerModel<T> = any> extends RenderLayer<T, V> {
    constructor(renderer: RenderLayerParent<any, any>, context: Context);
    get model(): EinsteinSolarSystemModel<T>;
    get renderLayerParent(): EinsteinSolarSystemRenderLayerParentImpl<T, V>;
    static getSpin(partialTicks: number, player: AbstractClientPlayer, speed: number): number;
    getTextureLocation(player: T): ResourceLocation;
    render(poseStack: PoseStack, bufferSource: MultiBufferSource, packedLight: number, player: T, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
    static shouldRender(player: AbstractClientPlayer): boolean;
  }

}

declare module 'einstein.subtle_effects.compat' {
  import { Supplier } from 'java.util.function';
  import { Map, List } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ColorHolder } from 'ValidatedColor';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { TextColor } from 'net.minecraft.network.chat';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ColdSeasonsType } from 'einstein.subtle_effects.configs';
  import { Entity } from 'net.minecraft.world.entity';

  class CompatHelper {
    static readonly PARTICLE_EFFECTS_MOD_ID: string;
    static readonly IS_SERENE_SEANSONS_LOADED: Supplier;
    static readonly IS_SOUL_FIRED_LOADED: Supplier;
    static readonly IS_ITEM_BORDERS_LOADED: Supplier;
    static readonly IS_LEGENDARY_TOOLTIPS_LOADED: Supplier;
    static readonly IS_END_REMASTERED_LOADED: Supplier;
    static readonly IS_PARTICLE_EFFECTS_LOADED: Supplier;
    static endRemLoc(path: string): ResourceLocation;
    static get defaultEyes(): Map<ResourceLocation, ColorHolder>;
  }


  class EndRemasteredCompat {
    static get allEyes(): ResourceLocation[];
    static getEyeColor(level: Level, pos: BlockPos): ColorHolder;
    static init(): void;
  }


  class ItemBordersCompat {
    static getManualBorderColor(level: Level, stack: ItemStack): TextColor;
    static getNBTBorderColor(stack: ItemStack): TextColor[];
  }


  class SereneSeasonsCompat {
    static isColdSeason(level: Level, seasonsConfig: ColdSeasonsType): boolean;
  }


  class SoulFiredCompat {
    static isOnSoulFire(entity: Entity): boolean;
  }

}

declare module 'einstein.subtle_effects.configs.blocks' {
  import { ConfigSection } from 'me.fzzyhmstrs.fzzy_config.config';
  import { ValidatedList } from 'me.fzzyhmstrs.fzzy_config.validation.collection';
  import { ValidatedInt, ValidatedDouble } from 'me.fzzyhmstrs.fzzy_config.validation.number';
  import { LavaSparksDisplayType } from 'einstein.subtle_effects.configs.blocks.SparksConfigs';
  import { SteamSpawnLogicType } from 'einstein.subtle_effects.configs.blocks.SteamConfigs';

  interface FallingBlocksConfigs extends ConfigSection {}
  class FallingBlocksConfigs extends ConfigSection {
    dustyBlocks: ValidatedList;
    whileFallingDust: boolean;
    whileFallingDustStartDistance: ValidatedInt;
    onLandDust: boolean;
    onLandSound: boolean;
    weakSupportDust: boolean;
    weakSupportDustDensity: ValidatedInt;
  }


  interface SparksConfigs extends ConfigSection {}
  class SparksConfigs extends ConfigSection {
    removeVanillaCampfireSparks: boolean;
    candleSparks: boolean;
    furnaceSparks: boolean;
    fireSparks: boolean;
    campfireSparks: boolean;
    torchSparks: boolean;
    lanternSparksDensity: ValidatedInt;
    lavaSparksDisplayType: LavaSparksDisplayType;
    lavaSparksDensity: ValidatedDouble;
    brewingStandSparks: boolean;
  }


  interface SteamConfigs extends ConfigSection {}
  class SteamConfigs extends ConfigSection {
    lavaFizzSteam: boolean;
    replaceCampfireFoodSmoke: boolean;
    spongeDryingOutSteam: boolean;
    replaceRainEvaporationSteam: boolean;
    lavaCauldronsEvaporateRain: boolean;
    spawnLogic: SteamSpawnLogicType;
    steamingWater: boolean;
    boilingWater: boolean;
    steamingWaterCauldron: boolean;
    boilingWaterCauldron: boolean;
    steamingThreshold: ValidatedInt;
    boilingThreshold: ValidatedInt;
  }


  interface UpdatedSmokeConfigs extends ConfigSection {}
  class UpdatedSmokeConfigs extends ConfigSection {
    candleSmoke: boolean;
    furnaceSmoke: boolean;
    fireSmoke: boolean;
    torchSmoke: boolean;
    campfireDowseSmoke: boolean;
  }

}

declare module 'einstein.subtle_effects.configs.blocks.SparksConfigs' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface LavaSparksDisplayType extends Enum<LavaSparksDisplayType> {}
  class LavaSparksDisplayType extends Enum<LavaSparksDisplayType> {
    static readonly OFF: LavaSparksDisplayType;
    static readonly ON: LavaSparksDisplayType;
    static readonly NOT_NETHER: LavaSparksDisplayType;
    prefix(): string;
    static valueOf(name: string): LavaSparksDisplayType;
    static values(): LavaSparksDisplayType[];
  }

}

declare module 'einstein.subtle_effects.configs.blocks.SteamConfigs' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface SteamSpawnLogicType extends Enum<SteamSpawnLogicType> {}
  class SteamSpawnLogicType extends Enum<SteamSpawnLogicType> {
    static readonly BRIGHTNESS: SteamSpawnLogicType;
    static readonly NEAR_LAVA: SteamSpawnLogicType;
    prefix(): string;
    static valueOf(name: string): SteamSpawnLogicType;
    static values(): SteamSpawnLogicType[];
  }

}

declare module 'einstein.subtle_effects.configs' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { Config, ConfigGroup } from 'me.fzzyhmstrs.fzzy_config.config';
  import { SparksConfigs, UpdatedSmokeConfigs, SteamConfigs, FallingBlocksConfigs } from 'einstein.subtle_effects.configs.blocks';
  import { BlockDustDensity, BeaconParticlesDisplayType, AmethystSparkleDisplayType, EnderEyePlacedParticlesDisplayType, EndPortalFrameParticlesDisplayType } from 'einstein.subtle_effects.configs.ModBlockConfigs';
  import { ValidatedList, ValidatedMap } from 'me.fzzyhmstrs.fzzy_config.validation.collection';
  import { ValidatedDouble, ValidatedInt, ValidatedFloat } from 'me.fzzyhmstrs.fzzy_config.validation.number';
  import { SleepingConfigs, HumanoidConfigs, DustCloudsConfig, BurningEntityConfigs, ExplosivesConfigs } from 'einstein.subtle_effects.configs.entities';
  import { MinecartSparksDisplayType } from 'einstein.subtle_effects.configs.ModEntityConfigs';
  import { BiomeConfigs, GeyserConfigs, FireflyConfigs } from 'einstein.subtle_effects.configs.environment';
  import { ItemRarityConfigs, ProjectileConfigs } from 'einstein.subtle_effects.configs.items';
  import { Supplier } from 'java.util.function';
  import { ParticleOptions } from 'net.minecraft.core.particles';

  interface ColdSeasonsType extends Enum<ColdSeasonsType> {}
  class ColdSeasonsType extends Enum<ColdSeasonsType> {
    static readonly OFF: ColdSeasonsType;
    static readonly DEFAULT: ColdSeasonsType;
    static readonly WINTER_ONLY: ColdSeasonsType;
    prefix(): string;
    static valueOf(name: string): ColdSeasonsType;
    static values(): ColdSeasonsType[];
  }


  interface CommandBlockSpawnType extends Enum<CommandBlockSpawnType> {}
  class CommandBlockSpawnType extends Enum<CommandBlockSpawnType> {
    static readonly ON: CommandBlockSpawnType;
    static readonly OFF: CommandBlockSpawnType;
    static readonly NOT_CREATIVE: CommandBlockSpawnType;
    canTick(): boolean;
    prefix(): string;
    static valueOf(name: string): CommandBlockSpawnType;
    static values(): CommandBlockSpawnType[];
  }


  interface ModBlockConfigs extends Config {}
  class ModBlockConfigs extends Config {
    sparks: SparksConfigs;
    updatedSmoke: UpdatedSmokeConfigs;
    steam: SteamConfigs;
    fallingBlocks: FallingBlocksConfigs;
    dustyBlocksGroup: ConfigGroup;
    redstoneBlockDust: boolean;
    redstoneBlockDustDensity: BlockDustDensity;
    redstoneDustEmittingBlocks: ValidatedList;
    glowstoneBlockDust: boolean;
    glowstoneBlockDustDensity: BlockDustDensity;
    glowstoneDustEmittingBlocks: ValidatedList;
    netherOnlyGlowstoneBlockDust: boolean;
    beehivesHaveSleepingZs: boolean;
    torchflowerSmoke: SmokeType;
    torchflowerFlames: boolean;
    dragonEggParticles: boolean;
    replaceEndPortalSmoke: boolean;
    pumpkinCarvedParticles: boolean;
    workstationsGroup: ConfigGroup;
    anvilBreakParticles: boolean;
    anvilUseParticles: boolean;
    grindstoneUseParticles: boolean;
    smithingTableUseParticles: boolean;
    stonecutterUseParticles: boolean;
    cauldronUseParticles: boolean;
    cauldronCleanItemSounds: boolean;
    compostingCompostParticles: boolean;
    compostingItemParticles: boolean;
    commandBlockParticles: CommandBlockSpawnType;
    commandBlockParticlesDensity: ValidatedDouble;
    slimeBlockBounceSounds: boolean;
    beaconParticlesGroup: ConfigGroup;
    beaconParticlesDisplayType: BeaconParticlesDisplayType;
    beaconParticlesDensity: ValidatedInt;
    beaconParticlesSpeed: ValidatedFloat;
    respawnAnchorParticles: boolean;
    beehiveShearParticles: boolean;
    endPortalParticles: boolean;
    leavesDecayEffects: boolean;
    farmlandDestroyEffects: boolean;
    amethystGroup: ConfigGroup;
    amethystSparkleDisplayType: AmethystSparkleDisplayType;
    amethystSparkleEmittingBlocks: ValidatedList;
    amethystSparkleSounds: boolean;
    floweringAzaleaPetals: boolean;
    sculkGroup: ConfigGroup;
    sculkBlockSculkDust: boolean;
    sculkVeinSculkDust: boolean;
    sculkShriekerDestroySouls: boolean;
    sculkCatalystDestroySouls: boolean;
    calibratedSculkSensorAmethystSparkle: boolean;
    campfireSizzlingSoundVolume: ValidatedFloat;
    replacePowderSnowFlakes: boolean;
    lavaCauldronEffects: boolean;
    endPortalFrameGroup: ConfigGroup;
    enderEyePlacedRings: boolean;
    enderEyePlacedRingsDuration: ValidatedInt;
    enderEyePlacedParticlesDisplayType: EnderEyePlacedParticlesDisplayType;
    eyeColors: ValidatedMap;
    endPortalFrameParticlesDisplayType: EndPortalFrameParticlesDisplayType;
    endPortalFrameParticlesDensity: ValidatedFloat;
    replaceOminousVaultConnection: boolean;
    cobwebMovementSounds: boolean;
    constructor();
    onUpdateClient(): void;
  }


  interface ModEntityConfigs extends Config {}
  class ModEntityConfigs extends Config {
    sleeping: SleepingConfigs;
    humanoids: HumanoidConfigs;
    dustClouds: DustCloudsConfig;
    burning: BurningEntityConfigs;
    explosives: ExplosivesConfigs;
    attackedGroup: ConfigGroup;
    chickenFeathers: boolean;
    parrotFeathers: boolean;
    snowGolemSnowflakes: boolean;
    allayMagicDensity: ValidatedDouble;
    vexMagicDensity: ValidatedDouble;
    sheepShearFluff: boolean;
    improvedDragonFireballTrail: boolean;
    dragonsBreathClouds: boolean;
    commandBlockMinecartParticles: CommandBlockSpawnType;
    endCrystalParticles: boolean;
    minecartSparksDisplayType: MinecartSparksDisplayType;
    minecartSparksDensity: ValidatedFloat;
    slimeTrails: boolean;
    magmaCubeTrails: boolean;
    replaceSlimeSquishParticles: boolean;
    replaceOozingEffectParticles: boolean;
    replaceSpellCasterParticles: boolean;
    ironGolemCrackParticles: boolean;
    spectralArrowParticles: boolean;
    wardenDeathSoulParticles: boolean;
    freezingSnowFlakes: boolean;
    featherTicklingPandas: boolean;
    improvedPandaSneezes: boolean;
    villagerWorkAtWorkstationParticles: boolean;
    improvedBrownMooshroomFeedingEffects: boolean;
    improvedMooshroomShearingEffects: boolean;
    replaceBlazeSmoke: boolean;
    animalFeedingParticles: boolean;
    animalFeedingSoundVolume: ValidatedFloat;
    constructor();
    onUpdateClient(): void;
  }


  interface ModEnvironmentConfigs extends Config {}
  class ModEnvironmentConfigs extends Config {
    biomeColorRain: boolean;
    biomes: BiomeConfigs;
    geysers: GeyserConfigs;
    fireflies: FireflyConfigs;
    constructor();
    onUpdateClient(): void;
  }


  interface ModGeneralConfigs extends Config {}
  class ModGeneralConfigs extends Config {
    particleRenderingGroup: ConfigGroup;
    enableParticleCulling: boolean;
    particleRenderDistance: ValidatedInt;
    cullParticlesInUnloadedChunks: boolean;
    allowUsingBlendedRenderType: boolean;
    spellParticlesUseBlendedRenderType: boolean;
    particlesGroup: ConfigGroup;
    dripParticlesGroup: ConfigGroup;
    glowingLavaDrops: boolean;
    fluidDropsEvaporate: boolean;
    fluidDropsEvaporationVolume: ValidatedFloat;
    dropLandInFluidSplashes: boolean;
    dropLandSoundVolume: ValidatedFloat;
    lavaSparkSmoke: boolean;
    sparksScale: ValidatedFloat;
    poppingHearts: boolean;
    poppingBubbles: boolean;
    poppingBubblesVolume: ValidatedFloat;
    enchantmentParticlesGroup: ConfigGroup;
    glowingEnchantmentParticles: boolean;
    translucentEnchantmentParticles: boolean;
    disableRandomizedShading: boolean;
    potionParticleAlpha: ValidatedFloat;
    potionParticleAlphaNearPlayer: ValidatedFloat;
    mobSkullShaders: boolean;
    fireHeight: ValidatedFloat;
    fireResistanceDisablesFireRendering: boolean;
    nightVisionFading: boolean;
    nightVisionFadingTime: ValidatedInt;
    enableEasterEggs: boolean;
    constructor();
    onUpdateClient(): void;
  }


  interface ModItemConfigs extends Config {}
  class ModItemConfigs extends Config {
    itemRarity: ItemRarityConfigs;
    projectiles: ProjectileConfigs;
    axeGroup: ConfigGroup;
    axeStripParticles: boolean;
    axeScrapeParticlesDisplayType: ReplacedParticlesDisplayType;
    axeWaxOffParticlesDisplayType: ReplacedParticlesDisplayType;
    boneMealUsingParticles: boolean;
    flintAndSteelParticles: boolean;
    increasedItemBreakParticles: boolean;
    bucketsGroup: ConfigGroup;
    waterEvaporateFromBucketSteam: boolean;
    waterBucketUseParticles: boolean;
    lavaBucketUseParticles: boolean;
    powderSnowBucketUseParticles: boolean;
    lingeringPotionClouds: boolean;
    splashPotionClouds: boolean;
    constructor();
  }


  interface ReplacedParticlesDisplayType extends Enum<ReplacedParticlesDisplayType> {}
  class ReplacedParticlesDisplayType extends Enum<ReplacedParticlesDisplayType> {
    static readonly DEFAULT: ReplacedParticlesDisplayType;
    static readonly VANILLA: ReplacedParticlesDisplayType;
    static readonly BOTH: ReplacedParticlesDisplayType;
    prefix(): string;
    static valueOf(name: string): ReplacedParticlesDisplayType;
    static values(): ReplacedParticlesDisplayType[];
  }


  interface SmokeType extends Enum<SmokeType> {}
  class SmokeType extends Enum<SmokeType> {
    static readonly OFF: SmokeType;
    static readonly DEFAULT: SmokeType;
    static readonly UPDATED: SmokeType;
    get particle(): Supplier<ParticleOptions>;
    isEnabled(): boolean;
    prefix(): string;
    static valueOf(name: string): SmokeType;
    static values(): SmokeType[];
  }

}

declare module 'einstein.subtle_effects.configs.entities' {
  import { ConfigSection, ConfigGroup } from 'me.fzzyhmstrs.fzzy_config.config';
  import { SmokeType } from 'einstein.subtle_effects.configs';
  import { ValidatedFloat, ValidatedInt, ValidatedDouble } from 'me.fzzyhmstrs.fzzy_config.validation.number';
  import { FrostyBreathConfigs, PlayerConfigs } from 'einstein.subtle_effects.configs.entities.humanoids';
  import { PerspectiveDisplayType } from 'einstein.subtle_effects.configs.ModEntityConfigs';
  import { PotionRingsParticleType } from 'einstein.subtle_effects.configs.entities.HumanoidConfigs';

  interface BurningEntityConfigs extends ConfigSection {}
  class BurningEntityConfigs extends ConfigSection {
    smoke: SmokeType;
    flames: boolean;
    sparks: boolean;
    sounds: boolean;
    extinguishSteam: boolean;
  }


  interface DustCloudsConfig extends ConfigSection {}
  class DustCloudsConfig extends ConfigSection {
    scale: ValidatedFloat;
    alpha: ValidatedFloat;
    preventWhenRaining: boolean;
    flyIntoWall: boolean;
    lessViewBlocking: boolean;
    fallingGroup: ConfigGroup;
    playerFell: boolean;
    mobFell: boolean;
    landMaceAttack: boolean;
    runningGroup: ConfigGroup;
    playerRunning: boolean;
    mobRunning: boolean;
    playerRunningRequiresSpeed: boolean;
  }


  interface ExplosivesConfigs extends ConfigSection {}
  class ExplosivesConfigs extends ConfigSection {
    tntUpdateSmoke: boolean;
    tntFlamesDensity: ValidatedInt;
    tntSparks: boolean;
    creeperSmoke: SmokeType;
    creeperSparks: boolean;
  }


  interface HumanoidConfigs extends ConfigSection {}
  class HumanoidConfigs extends ConfigSection {
    frostyBreath: FrostyBreathConfigs;
    player: PlayerConfigs;
    drowningBubblesGroup: ConfigGroup;
    drowningBubblesDisplayType: PerspectiveDisplayType;
    drowningBubblesDensity: ValidatedInt;
    drowningBubbleAlpha: ValidatedFloat;
    forceDrowningBubblesToColumn: boolean;
    potionRingsGroup: ConfigGroup;
    potionRingsDisplayType: PerspectiveDisplayType;
    potionRingsParticleType: PotionRingsParticleType;
    NPCsHavePotionRings: boolean;
  }


  interface SleepingConfigs extends ConfigSection {}
  class SleepingConfigs extends ConfigSection {
    playerSnoreChance: ValidatedDouble;
    playerSnoreSoundVolume: ValidatedFloat;
    playersHaveSleepingZs: boolean;
    villagerSnoreChance: ValidatedDouble;
    villagerSnoreSoundVolume: ValidatedFloat;
    villagersHaveSleepingZs: boolean;
    foxesHaveSleepingZs: boolean;
    batsHaveSleepingZs: boolean;
    catsHaveSleepingZs: boolean;
    otherMobsHaveSleepingZs: boolean;
    displaySleepingZsOnlyWhenSnoring: boolean;
    adjustNameTagWhenSleeping: boolean;
  }

}

declare module 'einstein.subtle_effects.configs.entities.HumanoidConfigs' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface PotionRingsParticleType extends Enum<PotionRingsParticleType> {}
  class PotionRingsParticleType extends Enum<PotionRingsParticleType> {
    static readonly RINGS_ONLY: PotionRingsParticleType;
    static readonly DOTS_ONLY: PotionRingsParticleType;
    static readonly BOTH: PotionRingsParticleType;
    prefix(): string;
    static valueOf(name: string): PotionRingsParticleType;
    static values(): PotionRingsParticleType[];
  }

}

declare module 'einstein.subtle_effects.configs.entities.humanoids' {
  import { ConfigSection, ConfigGroup } from 'me.fzzyhmstrs.fzzy_config.config';
  import { PerspectiveDisplayType } from 'einstein.subtle_effects.configs.ModEntityConfigs';
  import { ValidatedFloat, ValidatedInt } from 'me.fzzyhmstrs.fzzy_config.validation.number';
  import { ColdSeasonsType } from 'einstein.subtle_effects.configs';
  import { ValidatedList } from 'me.fzzyhmstrs.fzzy_config.validation.collection';

  interface FrostyBreathConfigs extends ConfigSection {}
  class FrostyBreathConfigs extends ConfigSection {
    displayType: PerspectiveDisplayType;
    alpha: ValidatedFloat;
    waitTime: ValidatedInt;
    seasons: ColdSeasonsType;
    additionalBiomes: ValidatedList;
  }


  interface PlayerConfigs extends ConfigSection {}
  class PlayerConfigs extends ConfigSection {
    enableBreathingEffectsInCreative: boolean;
    stomachGrowlingGroup: ConfigGroup;
    stomachGrowlingThreshold: ValidatedInt;
    stomachGrowlingVolume: ValidatedFloat;
    stomachGrowlingWaitTime: ValidatedInt;
    heartBeatingGroup: ConfigGroup;
    heartBeatingThreshold: ValidatedInt;
    heartbeatVolume: ValidatedFloat;
    heartBeatingWaitTime: ValidatedInt;
  }

}

declare module 'einstein.subtle_effects.configs.environment' {
  import { ConfigSection, ConfigGroup } from 'me.fzzyhmstrs.fzzy_config.config';
  import { ValidatedInt, ValidatedFloat } from 'me.fzzyhmstrs.fzzy_config.validation.number';
  import { ValidatedList } from 'me.fzzyhmstrs.fzzy_config.validation.collection';
  import { ColdSeasonsType } from 'einstein.subtle_effects.configs';
  import { FireflyType } from 'einstein.subtle_effects.configs.environment.FireflyConfigs';

  interface BiomeConfigs extends ConfigSection {}
  class BiomeConfigs extends ConfigSection {
    biomeParticlesRadius: ValidatedInt;
    mushroomSporeBiomes: ValidatedList;
    mushroomSporeDensity: ValidatedInt;
    pollenBiomes: ValidatedList;
    pollenDensity: ValidatedInt;
    sculkDustBiomes: ValidatedList;
    sculkDustDensity: ValidatedInt;
  }


  interface FireflyConfigs extends ConfigSection {}
  class FireflyConfigs extends ConfigSection {
    firefliesEnabled: boolean;
    dimensionBlocklist: ValidatedList;
    biomesBlocklist: ValidatedList;
    biomesAllowlist: ValidatedList;
    spawnableBlocks: ValidatedList;
    defaultDensity: ValidatedInt;
    ignoredSeasons: ColdSeasonsType;
    fireflyType: FireflyType;
    fireflySoundVolume: ValidatedFloat;
    habitatBiomesGroup: ConfigGroup;
    onlyAllowInHabitatBiomes: boolean;
    habitatBiomes: ValidatedList;
    habitatBiomeDensity: ValidatedInt;
  }


  interface GeyserConfigs extends ConfigSection {}
  class GeyserConfigs extends ConfigSection {
    useUpdatedSmoke: boolean;
    flameGeysersGroup: ConfigGroup;
    flameGeyserSpawnChance: ValidatedInt;
    flameGeyserSoundVolume: ValidatedFloat;
    flameGeyserActiveTime: ValidatedInt;
    flameGeyserInactiveTime: ValidatedInt;
    smokeGeysersGroup: ConfigGroup;
    smokeGeyserSpawnChance: ValidatedInt;
    smokeGeyserSoundVolume: ValidatedFloat;
    smokeGeyserActiveTime: ValidatedInt;
    smokeGeyserInactiveTime: ValidatedInt;
    bubbleGeysersGroup: ConfigGroup;
    bubbleGeyserSpawnChance: ValidatedInt;
    bubbleGeyserSoundVolume: ValidatedFloat;
    bubbleGeyserActiveTime: ValidatedInt;
    bubbleGeyserInactiveTime: ValidatedInt;
  }

}

declare module 'einstein.subtle_effects.configs.environment.FireflyConfigs' {
  import { Enum } from 'java.lang';
  import { Supplier } from 'java.util.function';
  import { SimpleParticleType } from 'net.minecraft.core.particles';
  import { List } from 'java.util';

  interface FireflyType extends Enum<FireflyType> {}
  class FireflyType extends Enum<FireflyType> {
    static readonly ORIGINAL: FireflyType;
    static readonly VANILLA: FireflyType;
    get particle(): Supplier<SimpleParticleType>;
    prefix(): string;
    static valueOf(name: string): FireflyType;
    static values(): FireflyType[];
  }

}

declare module 'einstein.subtle_effects.configs.items' {
  import { ConfigSection, ConfigGroup } from 'me.fzzyhmstrs.fzzy_config.config';
  import { DisplayType, ParticleColorType } from 'einstein.subtle_effects.configs.items.ItemRarityConfigs';
  import { ValidatedMap } from 'me.fzzyhmstrs.fzzy_config.validation.collection';
  import { ValidatedFloat, ValidatedDouble, ValidatedInt } from 'me.fzzyhmstrs.fzzy_config.validation.number';
  import { ReplacedParticlesDisplayType } from 'einstein.subtle_effects.configs';

  interface ItemRarityConfigs extends ConfigSection {}
  class ItemRarityConfigs extends ConfigSection {
    particlesDisplayType: DisplayType;
    particleColorType: ParticleColorType;
    mixedColorName: boolean;
    useItemBorder: boolean;
    colorOverrides: ValidatedMap;
    particleMaxHeight: ValidatedFloat;
    particleMaxSpeed: ValidatedFloat;
    particleDensity: ValidatedDouble;
  }


  interface ProjectileConfigs extends ConfigSection {}
  class ProjectileConfigs extends ConfigSection {
    enderPearlTrail: boolean;
    xpBottleParticlesDisplayType: ReplacedParticlesDisplayType;
    xpBottleParticlesDensity: ValidatedInt;
    eggSmashSoundVolume: ValidatedFloat;
    eggSplatParticles: boolean;
    snowballGroup: ConfigGroup;
    snowballTrailDensity: ValidatedDouble;
    snowballPoofsHaveSnowflakes: boolean;
    snowballPoofSoundVolume: ValidatedFloat;
  }

}

declare module 'einstein.subtle_effects.configs.items.ItemRarityConfigs' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface DisplayType extends Enum<DisplayType> {}
  class DisplayType extends Enum<DisplayType> {
    static readonly OFF: DisplayType;
    static readonly ON: DisplayType;
    static readonly NOT_COMMON: DisplayType;
    prefix(): string;
    static valueOf(name: string): DisplayType;
    static values(): DisplayType[];
  }


  interface ParticleColorType extends Enum<ParticleColorType> {}
  class ParticleColorType extends Enum<ParticleColorType> {
    static readonly RARITY_COLOR: ParticleColorType;
    static readonly NAME_COLOR: ParticleColorType;
    static readonly ONLY_COLOR_OVERRIDES: ParticleColorType;
    prefix(): string;
    static valueOf(name: string): ParticleColorType;
    static values(): ParticleColorType[];
  }

}

declare module 'einstein.subtle_effects.configs.ModBlockConfigs' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface BlockDustDensity extends Enum<BlockDustDensity> {}
  class BlockDustDensity extends Enum<BlockDustDensity> {
    static readonly DEFAULT: BlockDustDensity;
    static readonly MINIMAL: BlockDustDensity;
    get perSideChance(): number;
    prefix(): string;
    static valueOf(name: string): BlockDustDensity;
    static values(): BlockDustDensity[];
  }


  interface BeaconParticlesDisplayType extends Enum<BeaconParticlesDisplayType> {}
  class BeaconParticlesDisplayType extends Enum<BeaconParticlesDisplayType> {
    static readonly OFF: BeaconParticlesDisplayType;
    static readonly ON: BeaconParticlesDisplayType;
    static readonly NOT_COLORED: BeaconParticlesDisplayType;
    prefix(): string;
    static valueOf(name: string): BeaconParticlesDisplayType;
    static values(): BeaconParticlesDisplayType[];
  }


  interface AmethystSparkleDisplayType extends Enum<AmethystSparkleDisplayType> {}
  class AmethystSparkleDisplayType extends Enum<AmethystSparkleDisplayType> {
    static readonly OFF: AmethystSparkleDisplayType;
    static readonly ON: AmethystSparkleDisplayType;
    static readonly CRYSTALS_ONLY: AmethystSparkleDisplayType;
    prefix(): string;
    static valueOf(name: string): AmethystSparkleDisplayType;
    static values(): AmethystSparkleDisplayType[];
  }


  interface EnderEyePlacedParticlesDisplayType extends Enum<EnderEyePlacedParticlesDisplayType> {}
  class EnderEyePlacedParticlesDisplayType extends Enum<EnderEyePlacedParticlesDisplayType> {
    static readonly DOTS: EnderEyePlacedParticlesDisplayType;
    static readonly VANILLA: EnderEyePlacedParticlesDisplayType;
    static readonly BOTH: EnderEyePlacedParticlesDisplayType;
    prefix(): string;
    static valueOf(name: string): EnderEyePlacedParticlesDisplayType;
    static values(): EnderEyePlacedParticlesDisplayType[];
  }


  interface EndPortalFrameParticlesDisplayType extends Enum<EndPortalFrameParticlesDisplayType> {}
  class EndPortalFrameParticlesDisplayType extends Enum<EndPortalFrameParticlesDisplayType> {
    static readonly OFF: EndPortalFrameParticlesDisplayType;
    static readonly DOTS: EndPortalFrameParticlesDisplayType;
    static readonly SMOKE: EndPortalFrameParticlesDisplayType;
    prefix(): string;
    static valueOf(name: string): EndPortalFrameParticlesDisplayType;
    static values(): EndPortalFrameParticlesDisplayType[];
  }

}

declare module 'einstein.subtle_effects.configs.ModEntityConfigs' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { Minecraft } from 'net.minecraft.client';

  interface MinecartSparksDisplayType extends Enum<MinecartSparksDisplayType> {}
  class MinecartSparksDisplayType extends Enum<MinecartSparksDisplayType> {
    static readonly OFF: MinecartSparksDisplayType;
    static readonly LAND_ON_RAIL: MinecartSparksDisplayType;
    static readonly DEFAULT: MinecartSparksDisplayType;
    prefix(): string;
    static valueOf(name: string): MinecartSparksDisplayType;
    static values(): MinecartSparksDisplayType[];
  }


  interface PerspectiveDisplayType extends Enum<PerspectiveDisplayType> {}
  class PerspectiveDisplayType extends Enum<PerspectiveDisplayType> {
    static readonly OFF: PerspectiveDisplayType;
    static readonly DEFAULT: PerspectiveDisplayType;
    static readonly THIRD_PERSON_ONLY: PerspectiveDisplayType;
    isEnabled(): boolean;
    prefix(): string;
    test(minecraft: Minecraft): boolean;
    static valueOf(name: string): PerspectiveDisplayType;
    static values(): PerspectiveDisplayType[];
  }

}

declare module 'einstein.subtle_effects.data' {
  import { ResourceManagerReloadListener, ResourceManager, SimpleJsonResourceReloadListener } from 'net.minecraft.server.packs.resources';
  import { Supplier } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';
  import { List, Map } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface BCWPPackManager extends ResourceManagerReloadListener, NamedReloadListener {}
  class BCWPPackManager extends ResourceManagerReloadListener {
    static readonly PACK_LOCATION: Supplier;
    static readonly PACK_ID: Supplier;
    static readonly PACK_NAME: Component;
    static readonly BIOME_COLORED_PARTICLES: List;
    get id(): ResourceLocation;
    static isPackLoaded(): boolean;
    onResourceManagerReload(manager: ResourceManager): void;
  }


  interface MobSkullShaderReloadListener extends NamedReloadListener, SimpleJsonResourceReloadListener {}
  class MobSkullShaderReloadListener extends NamedReloadListener {
    static readonly DIRECTORY: string;
    static readonly MOB_SKULL_SHADERS: Map;
    constructor();
    get id(): ResourceLocation;
  }


  class NamedReloadListener {
    get id(): ResourceLocation;
  }


  interface SparkProviderReloadListener extends NamedReloadListener, SimpleJsonResourceReloadListener {}
  class SparkProviderReloadListener extends NamedReloadListener {
    static readonly DIRECTORY: string;
    static readonly PROVIDERS: Map;
    constructor();
    get id(): ResourceLocation;
  }

}

declare module 'einstein.subtle_effects.data.SparkProviderData' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface PresetType extends Enum<PresetType> {}
  class PresetType extends Enum<PresetType> {
    static readonly CUSTOM: PresetType;
    static readonly CAMPFIRE: PresetType;
    static readonly FIRE: PresetType;
    static readonly TORCH: PresetType;
    static readonly WALL_TORCH: PresetType;
    static readonly CANDLE: PresetType;
    static readonly LANTERN: PresetType;
    static readonly FURNACE: PresetType;
    get serializedName(): string;
    static valueOf(name: string): PresetType;
    static values(): PresetType[];
  }

}

declare module 'einstein.subtle_effects.init' {
  import { Settings } from 'einstein.subtle_effects.init.ModAnimalFedEffectSettings';
  import { EntityType } from 'net.minecraft.world.entity';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { Supplier, UnaryOperator } from 'java.util.function';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Map, Collection } from 'java.util';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos, Registry } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';
  import { ModGeneralConfigs, ModBlockConfigs, ModEntityConfigs, ModEnvironmentConfigs, ModItemConfigs } from 'einstein.subtle_effects.configs';
  import { ValidatedList } from 'me.fzzyhmstrs.fzzy_config.validation.collection';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { ValidatedDouble } from 'me.fzzyhmstrs.fzzy_config.validation.number';
  import { ParticleRenderType } from 'net.minecraft.client.particle';

  class ModAnimalFedEffectSettings {
    static readonly DEFAULT_VALUE: Settings;
    static getSetting(type: EntityType<any>): Settings;
    static init(): void;
    static register(type: EntityType<any>, y: number, z: number): void;
    static register(type: EntityType<any>, y: number, z: number, sound: SoundEvent): void;
    static register(type: EntityType<any>, y: number, z: number, sound: Supplier<SoundEvent>): void;
    static register(type: EntityType<any>, sound: SoundEvent): void;
    static register(type: EntityType<any>, sound: Supplier<SoundEvent>): void;
    static register(type: EntityType<any>, offset: Vec3, sound: Supplier<SoundEvent>): void;
    static register(type: EntityType<any>, offset: Vec3, sound: Supplier<SoundEvent>, stackReplacer: UnaryOperator<ItemStack>): void;
  }


  class ModBlockTickers {
    static readonly REGISTERED: Map;
    static readonly REGISTERED_SPECIAL: Map;
    static init(state: BlockState, state: BlockState, level: Level, pos: BlockPos, random: RandomSource, state: BlockState, state: BlockState, level: Level, pos: BlockPos, random: RandomSource, state: BlockState, level: Level, pos: BlockPos, random: RandomSource, state: BlockState, level: Level, pos: BlockPos, random: RandomSource, state: BlockState, level: Level, pos: BlockPos, random: RandomSource, state: BlockState, level: Level, pos: BlockPos, random: RandomSource, state: BlockState, level: Level, pos: BlockPos, random: RandomSource, state: BlockState, level: Level, pos: BlockPos, random: RandomSource, state: BlockState, level: Level, pos: BlockPos, random: RandomSource, state: BlockState, state: BlockState, level: Level, pos: BlockPos, random: RandomSource, state: BlockState, state: BlockState, level: Level, pos: BlockPos, random: RandomSource, state: BlockState, state: BlockState, level: Level, pos: BlockPos, random: RandomSource, state: BlockState, state: BlockState, level: Level, pos: BlockPos, random: RandomSource, state: BlockState, state: BlockState, level: Level, pos: BlockPos, random: RandomSource, state: BlockState, level: Level, pos: BlockPos, random: RandomSource, state: BlockState, level: Level, pos: BlockPos, random: RandomSource, state: BlockState, level: Level, pos: BlockPos, random: RandomSource, state: BlockState, level: Level, pos: BlockPos, random: RandomSource, state: BlockState, level: Level, pos: BlockPos, random: RandomSource, state: BlockState, state: BlockState, level: Level, pos: BlockPos, random: RandomSource, state: BlockState, level: Level, pos: BlockPos, random: RandomSource): void;
  }


  class ModConfigs {
    static readonly BASE_KEY: string;
    static readonly GENERAL: ModGeneralConfigs;
    static readonly BLOCKS: ModBlockConfigs;
    static readonly ENTITIES: ModEntityConfigs;
    static readonly ENVIRONMENT: ModEnvironmentConfigs;
    static readonly ITEMS: ModItemConfigs;
    static biomeList(...biomeIds: string[]): ValidatedList<ResourceLocation>;
    static init(): void;
    static registryList<T>(registryKey: ResourceKey<Registry<T>>, defaultIds: Collection<ResourceLocation>): ValidatedList<ResourceLocation>;
    static registryList<T>(registryKey: ResourceKey<Registry<T>>, ...defaultIds: string[]): ValidatedList<ResourceLocation>;
  }


  class ModDamageListeners {
    static readonly REGISTERED: Map;
    static init(): void;
  }


  class ModEntityTickers {
    static init(): void;
    static shouldSpawn(random: RandomSource, chanceConfig: ValidatedDouble): boolean;
  }


  class ModParticleRenderTypes {
    static readonly BLENDED: ParticleRenderType;
    static get blendedOrTransparent(): ParticleRenderType;
    static init(): void;
  }


  class ModParticles {
    static readonly SNORING: Supplier;
    static readonly FALLING_SNORING: Supplier;
    static readonly LONG_SPARK: Supplier;
    static readonly SHORT_SPARK: Supplier;
    static readonly FLOATING_SPARK: Supplier;
    static readonly METAL_SPARK: Supplier;
    static readonly SNOW: Supplier;
    static readonly SNOWBALL_TRAIL: Supplier;
    static readonly FREEZING: Supplier;
    static readonly CHICKEN_FEATHER: Supplier;
    static readonly BLUE_PARROT_FEATHER: Supplier;
    static readonly GRAY_PARROT_FEATHER: Supplier;
    static readonly GREEN_PARROT_FEATHER: Supplier;
    static readonly RED_BLUE_PARROT_FEATHER: Supplier;
    static readonly YELLOW_BLUE_PARROT_FEATHER: Supplier;
    static readonly ALLAY_MAGIC: Supplier;
    static readonly VEX_MAGIC: Supplier;
    static readonly SMALL_DUST_CLOUD: Supplier;
    static readonly LARGE_DUST_CLOUD: Supplier;
    static readonly SHEEP_FLUFF: Supplier;
    static readonly MUSHROOM_SPORE: Supplier;
    static readonly FIREFLY: Supplier;
    static readonly VANILLA_FIREFLY: Supplier;
    static readonly FIREFLY_EMITTER: Supplier;
    static readonly SMOKE: Supplier;
    static readonly POLLEN: Supplier;
    static readonly COMMAND_BLOCK: Supplier;
    static readonly ITEM_RARITY: Supplier;
    static readonly BEACON: Supplier;
    static readonly COMPOST: Supplier;
    static readonly STEAM: Supplier;
    static readonly END_PORTAL: Supplier;
    static readonly END_CRYSTAL: Supplier;
    static readonly SCULK_DUST: Supplier;
    static readonly SLIME_TRAIL: Supplier;
    static readonly MAGMA_CUBE_TRAIL: Supplier;
    static readonly SPELL_CASTER_MAGIC: Supplier;
    static readonly AMETHYST_SPARKLE: Supplier;
    static readonly AZALEA_PETAL: Supplier;
    static readonly FROSTY_BREATH: Supplier;
    static readonly EXPERIENCE: Supplier;
    static readonly HEART_POP: Supplier;
    static readonly POTION_RING: Supplier;
    static readonly POTION_DOT: Supplier;
    static readonly POTION_EMITTER: Supplier;
    static readonly IRON_GOLEM: Supplier;
    static readonly DROWNING_BUBBLE: Supplier;
    static readonly DROWNING_BUBBLE_POP: Supplier;
    static readonly EGG_SPLAT: Supplier;
    static readonly ENDER_EYE_PLACED_RING: Supplier;
    static readonly BLOCK_NO_MOMENTUM: Supplier;
    static readonly LAVA_SPLASH: Supplier;
    static readonly OMINOUS_VAULT_CONNECTION: Supplier;
    static readonly GEYSER_SPOUT: Supplier;
    static readonly SNEEZE: Supplier;
    static readonly GEYSER_SMOKE: Supplier;
    static readonly POTION_CLOUD: Supplier;
    static readonly POTION_POOF_CLOUD: Supplier;
    static init(): void;
  }


  class ModPayloads {
    static init(): void;
    static initClientHandlers(): void;
  }


  class ModSounds {
    static readonly VILLAGER_SNORE: Supplier;
    static readonly PLAYER_SNORE: Supplier;
    static readonly PLAYER_STOMACH_GROWL: Supplier;
    static readonly PLAYER_HEARTBEAT: Supplier;
    static readonly EGG_BREAK: Supplier;
    static readonly SNOWBALL_POOF: Supplier;
    static readonly COW_EAT: Supplier;
    static readonly CHICKEN_EAT: Supplier;
    static readonly OCELOT_EAT: Supplier;
    static readonly SHEEP_EAT: Supplier;
    static readonly AXOLOTL_EAT: Supplier;
    static readonly BEE_EAT: Supplier;
    static readonly TADPOLE_EAT: Supplier;
    static readonly RABBIT_EAT: Supplier;
    static readonly TURTLE_EAT: Supplier;
    static readonly HOGLIN_EAT: Supplier;
    static readonly AMETHYST_CLUSTER_CHIME: Supplier;
    static readonly CAMPFIRE_SIZZLE: Supplier;
    static readonly DRIP_WATER: Supplier;
    static readonly DRIP_LAVA: Supplier;
    static readonly DRIP_WATER_INTO_FLUID: Supplier;
    static readonly DRIP_LAVA_INTO_FLUID: Supplier;
    static readonly CAULDRON_CLEAN_ITEM: Supplier;
    static readonly GEYSER_WHOOSH: Supplier;
    static readonly GEYSER_HISS: Supplier;
    static readonly FIREFLY_BUZZ: Supplier;
    static init(): void;
  }

}

declare module 'einstein.subtle_effects.mixin.client.block' {
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockPos } from 'net.minecraft.core';
  import { Entity } from 'net.minecraft.world.entity';
  import { BaseEntityBlock } from 'net.minecraft.world.level.block';
  import { LevelAccessor } from 'net.minecraft.world.level';

  class AbstractCandleBlockMixin {
  }


  class AbstractCauldronBlockAccessor {
    getFillHeight(var1: BlockState): number;
    isEntityInside(var1: BlockState, var2: BlockPos, var3: Entity): boolean;
  }


  class AbstractCauldronBlockMixin {
  }


  class AmethystClusterBlockAccessor {
    get aABBOffset(): number;
    get height(): number;
  }


  class BaseFireBlockMixin {
  }


  class BeehiveBlockMixin {
  }


  class CampfireBlockMixin {
  }


  class ClientComposterBlockMixin {
  }


  class EndPortalBlockMixin {
  }


  class FurnaceBlockMixin {
  }


  class PowderSnowBlockMixin {
  }


  class PumpkinBlockMixin {
  }


  interface SculkShriekerAndCatalystBlockMixin extends BaseEntityBlock {}
  class SculkShriekerAndCatalystBlockMixin extends BaseEntityBlock {
    destroy(level: LevelAccessor, pos: BlockPos, state: BlockState): void;
  }


  class SlimeBlockMixin {
  }


  class TorchBlockMixin {
  }

}

declare module 'einstein.subtle_effects.mixin.client.block.entity' {
  class CampfireBlockEntityMixin {
  }


  class VaultBlockEntityClientMixin {
  }

}

declare module 'einstein.subtle_effects.mixin.client' {
  import { Level } from 'net.minecraft.world.level';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Supplier } from 'java.util.function';
  import { Map } from 'java.util';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { FrustumGetter } from 'einstein.subtle_effects.util';
  import { Frustum } from 'net.minecraft.client.renderer.culling';
  import { LocalPlayer } from 'net.minecraft.client.player';
  import { GameRenderer } from 'net.minecraft.client.renderer';
  import { Options } from 'net.minecraft.client';

  interface ClientLevelMixin extends Level {}
  class ClientLevelMixin extends Level {
  }


  class FluidTypeMixin {
  }


  class GameRendererAccessor {
    loadShaderEffect(var1: ResourceLocation): void;
  }


  class GameRendererMixin {
  }


  class ItemBordersConfigAccessor {
    get manualBorders(): Supplier<Map<string, any>>;
  }


  class LavaFluidMixin {
    isSame(var1: Fluid): boolean;
  }


  interface LevelRendererMixin extends FrustumGetter {}
  class LevelRendererMixin extends FrustumGetter {
    subtleEffects$getCullingFrustum(): Frustum;
  }


  class MinecraftMixin {
    player: LocalPlayer;
    gameRenderer: GameRenderer;
    options: Options;
  }


  class ScreenEffectRendererMixin {
  }


  class WaterFluidMixin {
  }

}

declare module 'einstein.subtle_effects.mixin.client.entity' {
  import { SoundEvent } from 'net.minecraft.sounds';
  import { EntityTickersGetter } from 'einstein.subtle_effects.util';
  import { Int2ObjectMap } from 'it.unimi.dsi.fastutil.ints';
  import { EntityTicker } from 'einstein.subtle_effects.ticking.tickers.entity';
  import { Entity, EntityType } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { ModelPart } from 'net.minecraft.client.model.geom';
  import { Animal } from 'net.minecraft.world.entity.animal';
  import { DyeColor } from 'net.minecraft.world.item';

  class AbstractHorseAccessor {
    get eatSound(): SoundEvent;
  }


  class AreaEffectCloudMixin {
    isWaiting(): boolean;
  }


  class BlazeMixin {
  }


  interface ClientEntityMixin extends EntityTickersGetter {}
  class ClientEntityMixin extends EntityTickersGetter {
    subtleEffects$getTickers(): Int2ObjectMap<EntityTicker<any>>;
  }


  interface ClientLivingEntityMixin<T extends Entity = any> extends Entity {}
  class ClientLivingEntityMixin<T extends Entity = any> extends Entity {
    hurtTime: number;
    deathTime: number;
    constructor(type: EntityType<T>, level: Level);
  }


  class EntityAccessor {
    doWaterSplashingEffects(): void;
    playExtinguishedSound(): void;
  }


  class EntityRendererMixin<T extends Entity = any> {
  }


  class HumanoidModelMixin<T extends LivingEntity = any> {
    head: ModelPart;
    hat: ModelPart;
  }


  class MinecartFurnaceMixin {
  }


  class MooshroomMixin {
  }


  interface PandaMixin extends Animal {}
  class PandaMixin extends Animal {
  }


  class PrimedTNTMixin {
  }


  interface SheepMixin extends Animal {}
  class SheepMixin extends Animal {
    get color(): DyeColor;
    readyForShearing(): boolean;
  }


  class SlimeMixin {
  }


  class SnowballMixin {
  }


  class SpellCasterIllagerMixin {
  }


  class ThrownEggMixin {
  }

}

declare module 'einstein.subtle_effects.mixin.client.item' {
  import { Fluid } from 'net.minecraft.world.level.material';

  class AxeItemMixin {
  }


  class BoneMealItemMixin {
  }


  class BucketItemAccessor {
    get content(): Fluid;
  }


  class BucketItemMixin {
  }


  class FlintAndSteelItemMixin {
  }


  class SolidBucketItemMixin {
  }

}

declare module 'einstein.subtle_effects.mixin.client.particle.bubbles' {
  import { TextureSheetParticle, SpriteSet } from 'net.minecraft.client.particle';
  import { BubbleSetter } from 'einstein.subtle_effects.util';

  class BubbleColumnUpParticleProviderMixin {
  }


  interface BubbleParticleMixin extends BubbleSetter, TextureSheetParticle {}
  class BubbleParticleMixin extends BubbleSetter {
    subtleEffects$setupBubble(sprites: SpriteSet, playsSound: boolean): void;
  }


  class BubbleParticleProviderMixin {
  }


  class WaterCurrentDownParticleProviderMixin {
  }

}

declare module 'einstein.subtle_effects.mixin.client.particle' {
  import { TextureSheetParticle, Particle, ParticleRenderType } from 'net.minecraft.client.particle';
  import { LifetimeAlpha } from 'Particle';
  import { HeartParticleAccessor, ParticleAccessor } from 'einstein.subtle_effects.util';
  import { List } from 'java.util';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { Camera } from 'net.minecraft.client';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';

  interface DripParticleMixin extends TextureSheetParticle {}
  class DripParticleMixin extends TextureSheetParticle {
  }


  interface FallAndLandParticleMixin extends Particle {}
  class FallAndLandParticleMixin extends Particle {
  }


  class FlyTowardsPositionParticleAccessor {
    setGlowing(var1: boolean): void;
    setLifetimeAlpha(var1: LifetimeAlpha): void;
  }


  interface HeartParticleMixin extends HeartParticleAccessor, TextureSheetParticle {}
  class HeartParticleMixin extends HeartParticleAccessor {
    subtleEffects$setHeart(): void;
    tick(): void;
  }


  class LavaParticleMixin {
  }


  class ParticleEngineAccessor {
    static getRenderOrder(): ParticleRenderType[];
    static setRenderOrder(renderOrder: ParticleRenderType[]): void;
  }


  class ParticleEngineMixin {
  }


  interface ParticleMixin extends ParticleAccessor {}
  class ParticleMixin extends ParticleAccessor {
    get alpha(): number;
    get x(): number;
    get y(): number;
    get z(): number;
    set alpha(var1: number);
    setGravity(var1: number): void;
    setHasPhysics(var1: boolean): void;
    subtleEffects$force(): void;
    subtleEffects$wasForced(): boolean;
  }


  interface SpellParticleMixin extends TextureSheetParticle {}
  class SpellParticleMixin extends TextureSheetParticle {
    constructor(level: ClientLevel, x: number, y: number, z: number, xSpeed: number, ySpeed: number, zSpeed: number);
    render(consumer: VertexConsumer, camera: Camera, partialTick: number): void;
  }


  class SpriteSetAccessor {
    get sprites(): TextureAtlasSprite[];
  }

}

declare module 'einstein.subtle_effects.mixin.client.particle.FlyTowardsPositionParticleAccessor' {
  class EnchantProviderMixin {
  }

}

declare module 'einstein.subtle_effects.mixin.client.particle.HeartParticleMixin' {
  class ProviderMixin {
  }

}

declare module 'einstein.subtle_effects.mixin.common' {
  import { Animal } from 'net.minecraft.world.entity.animal';
  import { Entity, EntityType } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { Slot } from 'net.minecraft.world.inventory';

  interface AbstractHorseMixin extends Animal {}
  class AbstractHorseMixin extends Animal {
  }


  class AnimalMixin {
  }


  class BeehiveBlockEntityMixin {
  }


  class CommonComposterMixin {
  }


  interface CommonLivingEntityMixin extends Entity {}
  class CommonLivingEntityMixin extends Entity {
    constructor(type: EntityType<any>, level: Level);
  }


  class CommonMooshroomMixin {
  }


  class FallingBlockEntityMixin {
  }


  class FarmBlockMixin {
  }


  class FoodOnAStickItemMixin {
  }


  class LeavesBlockMixin {
  }


  class LlamaMixin {
  }


  class MaceItemMixin {
  }


  class MobMixin {
  }


  class NeoForgeStonecutterMenu$2Mixin {
  }


  class StonecutterMenuAccessor {
    get inputSlot(): Slot;
  }


  class ThrownExperienceBottleMixin {
  }


  class WorkAtComposterMixin {
  }


  class WorkAtPoiMixin {
  }

}

declare module 'einstein.subtle_effects.mixin.common.CommonComposterMixin' {
  import { WorldlyContainer } from 'net.minecraft.world';

  interface InputContainerMixin extends WorldlyContainer {}
  class InputContainerMixin extends WorldlyContainer {
  }

}

declare module 'einstein.subtle_effects.networking.clientbound.ClientBoundBlockDestroyEffectsPayload' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface TypeConfig extends Enum<TypeConfig> {}
  class TypeConfig extends Enum<TypeConfig> {
    static readonly LEAVES_DECAY: TypeConfig;
    static readonly FARMLAND_DESTROY: TypeConfig;
    static valueOf(name: string): TypeConfig;
    static values(): TypeConfig[];
  }

}

declare module 'einstein.subtle_effects.networking.clientbound.ClientBoundEntityFellPayload' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface TypeConfig extends Enum<TypeConfig> {}
  class TypeConfig extends Enum<TypeConfig> {
    static readonly ENTITY: TypeConfig;
    static readonly PLAYER: TypeConfig;
    static readonly MACE: TypeConfig;
    static readonly ELYTRA: TypeConfig;
    static valueOf(name: string): TypeConfig;
    static values(): TypeConfig[];
  }

}

declare module 'einstein.subtle_effects.networking.clientbound' {
  import { ClientLevel } from 'net.minecraft.client.multiplayer';

  class ClientPacketHandlers {
    static handle(level: ClientLevel, payload: ClientBoundEntityFellPayload): void;
    static handle(level: ClientLevel, payload: ClientBoundEntitySpawnSprintingDustCloudsPayload): void;
    static handle(level: ClientLevel, payload: ClientBoundSpawnSnoreParticlePayload): void;
    static handle(level: ClientLevel, payload: ClientBoundBlockDestroyEffectsPayload): void;
    static handle(level: ClientLevel, payload: ClientBoundXPBottleEffectsPayload): void;
    static handle(level: ClientLevel, payload: ClientBoundFallingBlockLandPayload): void;
    static handle(level: ClientLevel, payload: ClientBoundCompostItemPayload): void;
    static handle(level: ClientLevel, payload: ClientBoundStonecutterUsedPayload): void;
    static handle(level: ClientLevel, payload: ClientBoundVillagerWorkPayload): void;
    static handle(level: ClientLevel, payload: ClientBoundMooshroomShearedPayload): void;
    static handle(level: ClientLevel, payload: ClientBoundAnimalFedPayload): void;
  }

}

declare module 'einstein.subtle_effects.particle' {
  import { TextureSheetParticle, SpriteSet, ParticleRenderType, TerrainParticle, BubbleParticle, BubblePopParticle, SuspendedParticle, SplashParticle, SmokeParticle } from 'net.minecraft.client.particle';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { Direction } from 'net.minecraft.core';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { Camera } from 'net.minecraft.client';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { List } from 'java.util';
  import { ColorParticleOption } from 'net.minecraft.core.particles';
  import { SparkType } from 'einstein.subtle_effects.util';
  import { RandomSource } from 'net.minecraft.util';
  import { Integer } from 'java.lang';

  interface AllayMagicParticle extends TextureSheetParticle {}
  class AllayMagicParticle extends TextureSheetParticle {
    constructor(level: ClientLevel, x: number, y: number, z: number, xSpeed: number, ySpeed: number, zSpeed: number, sprites: SpriteSet);
    get renderType(): ParticleRenderType;
    getQuadSize(partialTicks: number): number;
    tick(): void;
  }


  interface BaseAnimatedParticle extends TextureSheetParticle {}
  class BaseAnimatedParticle extends TextureSheetParticle {
    constructor(level: ClientLevel, x: number, y: number, z: number, animation: ParticleAnimation);
    get renderType(): ParticleRenderType;
    tick(): void;
  }


  interface BeaconParticle extends SparkParticle {}
  class BeaconParticle extends SparkParticle {
    getQuadSize(partialTicks: number): number;
    tick(): void;
  }


  interface CommandBlockParticle extends TextureSheetParticle {}
  class CommandBlockParticle extends TextureSheetParticle {
    constructor(level: ClientLevel, sprites: SpriteSet, x: number, y: number, z: number, xSpeed: number, ySpeed: number, zSpeed: number, direction: Direction);
    get renderType(): ParticleRenderType;
    getLightColor(partialTick: number): number;
    move(x: number, y: number, z: number): void;
    tick(): void;
  }


  interface CustomTerrainParticle extends TerrainParticle {}
  class CustomTerrainParticle extends TerrainParticle {
    static readonly COMPOST_TEXTURE: ResourceLocation;
    constructor(level: ClientLevel, x: number, y: number, z: number, xSpeed: number, ySpeed: number, zSpeed: number, renderType: ParticleRenderType);
    get renderType(): ParticleRenderType;
  }


  interface DrowningBubbleParticle extends BubbleParticle {}
  class DrowningBubbleParticle extends BubbleParticle {
    constructor(level: ClientLevel, x: number, y: number, z: number, xSpeed: number, ySpeed: number, zSpeed: number);
    get renderType(): ParticleRenderType;
  }


  interface DrowningBubblePopParticle extends BubblePopParticle {}
  class DrowningBubblePopParticle extends BubblePopParticle {
    constructor(level: ClientLevel, x: number, y: number, z: number, xSpeed: number, ySpeed: number, zSpeed: number, sprites: SpriteSet);
    get renderType(): ParticleRenderType;
  }


  interface DustCloudParticle extends TextureSheetParticle {}
  class DustCloudParticle extends TextureSheetParticle {
    get renderType(): ParticleRenderType;
    render(consumer: VertexConsumer, camera: Camera, partialTicks: number): void;
    tick(): void;
  }


  interface EggSplatParticle extends FlatPlaneParticle {}
  class EggSplatParticle extends FlatPlaneParticle {
    get renderType(): ParticleRenderType;
    tick(): void;
  }


  interface EndCrystalParticle extends GlowingSuspendedParticle {}
  class EndCrystalParticle extends GlowingSuspendedParticle {
    constructor(level: ClientLevel, sprites: SpriteSet, x: number, y: number, z: number);
    get renderType(): ParticleRenderType;
  }


  interface EnderEyePlacedRingParticle extends FlatPlaneParticle {}
  class EnderEyePlacedRingParticle extends FlatPlaneParticle {
    static readonly DEFAULT_COLOR: number;
    static readonly SIZE: number;
    get renderType(): ParticleRenderType;
  }


  interface EndPortalParticle extends GlowingSuspendedParticle {}
  class EndPortalParticle extends GlowingSuspendedParticle {
    constructor(level: ClientLevel, sprites: SpriteSet, x: number, y: number, z: number, xSpeed: number, ySpeed: number, zSpeed: number);
    get renderType(): ParticleRenderType;
  }


  interface ExperienceParticle extends TextureSheetParticle {}
  class ExperienceParticle extends TextureSheetParticle {
    get renderType(): ParticleRenderType;
    render(buffer: VertexConsumer, camera: Camera, partialTicks: number): void;
  }


  interface FeatherParticle extends TextureSheetParticle {}
  class FeatherParticle extends TextureSheetParticle {
    get renderType(): ParticleRenderType;
    tick(): void;
  }


  interface FireflyParticle extends BaseAnimatedParticle {}
  class FireflyParticle extends BaseAnimatedParticle {
    constructor(level: ClientLevel, animation: ParticleAnimation, x: number, y: number, z: number);
    getLightColor(partialTick: number): number;
    tick(): void;
  }


  interface FlatPlaneParticle extends TextureSheetParticle {}
  class FlatPlaneParticle extends TextureSheetParticle {
    render(consumer: VertexConsumer, camera: Camera, partialTicks: number): void;
  }


  interface GeyserSpoutParticle extends FlatPlaneParticle {}
  class GeyserSpoutParticle extends FlatPlaneParticle {
    get renderType(): ParticleRenderType;
    tick(): void;
  }


  interface GlowingSuspendedParticle extends SuspendedParticle {}
  class GlowingSuspendedParticle extends SuspendedParticle {
    constructor(level: ClientLevel, sprites: SpriteSet, x: number, y: number, z: number, xSpeed: number, ySpeed: number, zSpeed: number);
  }


  interface HeartPopParticle extends TextureSheetParticle {}
  class HeartPopParticle extends TextureSheetParticle {
    constructor(level: ClientLevel, x: number, y: number, z: number, ySpeed: number, sprites: SpriteSet);
    get renderType(): ParticleRenderType;
    getQuadSize(partialTicks: number): number;
    tick(): void;
  }


  interface ItemRarityParticle extends TextureSheetParticle {}
  class ItemRarityParticle extends TextureSheetParticle {
    get renderType(): ParticleRenderType;
    tick(): void;
  }


  interface LavaSplashParticle extends SplashParticle {}
  class LavaSplashParticle extends SplashParticle {
    constructor(level: ClientLevel, x: number, y: number, z: number, xSpeed: number, ySpeed: number, zSpeed: number, sprites: SpriteSet);
    pickSprite(sprite: SpriteSet): void;
  }


  class ParticleAnimation {
    constructor(sprites: SpriteSet, loopCount: number);

    constructor(sprites: SpriteSet, firstFrameDelay: number, loopCount: number);
    get animationLifetime(): number;
    get spriteForFrame(): TextureAtlasSprite;
    get sprites(): SpriteSet;
    tick(): void;
  }


  interface PotionCloudParticle extends FlatPlaneParticle {}
  class PotionCloudParticle extends FlatPlaneParticle {
    get renderType(): ParticleRenderType;
    render(consumer: VertexConsumer, camera: Camera, partialTicks: number): void;
  }


  interface PotionDotParticle extends TextureSheetParticle {}
  class PotionDotParticle extends TextureSheetParticle {
    get renderType(): ParticleRenderType;
    move(x: number, y: number, z: number): void;
    tick(): void;
  }


  interface PotionRingParticle extends FlatPlaneParticle {}
  class PotionRingParticle extends FlatPlaneParticle {
    get renderType(): ParticleRenderType;
    move(x: number, y: number, z: number): void;
    tick(): void;
  }


  interface SculkDustParticle extends GlowingSuspendedParticle {}
  class SculkDustParticle extends GlowingSuspendedParticle {
    constructor(level: ClientLevel, sprites: SpriteSet, x: number, y: number, z: number);
  }


  interface SheepFluffParticle extends FeatherParticle {}
  class SheepFluffParticle extends FeatherParticle {
    render(buffer: VertexConsumer, renderInfo: Camera, partialTicks: number): void;
  }


  interface SlimeTrailParticle extends FlatPlaneParticle {}
  class SlimeTrailParticle extends FlatPlaneParticle {
    get renderType(): ParticleRenderType;
    tick(): void;
  }


  interface SneezeParticle extends TextureSheetParticle {}
  class SneezeParticle extends TextureSheetParticle {
    get renderType(): ParticleRenderType;
    render(consumer: VertexConsumer, camera: Camera, partialTicks: number): void;
    tick(): void;
  }


  interface SnoringParticle extends SmokeParticle {}
  class SnoringParticle extends SmokeParticle {
  }


  interface SnowParticle extends TextureSheetParticle {}
  class SnowParticle extends TextureSheetParticle {
    get renderType(): ParticleRenderType;
    tick(): void;
  }


  interface SparkParticle extends TextureSheetParticle {}
  class SparkParticle extends TextureSheetParticle {
    static readonly DEFAULT_COLORS: List;
    static readonly SOUL_COLORS: List;
    static readonly BLAZE_COLORS: List;
    static create(sparkType: SparkType, random: RandomSource): ColorParticleOption;
    static create(sparkType: SparkType, random: RandomSource, colors: number[]): ColorParticleOption;
    static createSoul(sparkType: SparkType, random: RandomSource): ColorParticleOption;
    get renderType(): ParticleRenderType;
    getLightColor(partialTick: number): number;
    getQuadSize(partialTicks: number): number;
  }


  interface SteamParticle extends SmokeParticle {}
  class SteamParticle extends SmokeParticle {
    get renderType(): ParticleRenderType;
    tick(): void;
  }


  interface VanillaFireflyParticle extends TextureSheetParticle {}
  class VanillaFireflyParticle extends TextureSheetParticle {
    get renderType(): ParticleRenderType;
    getLightColor(partialTick: number): number;
    tick(): void;
  }

}

declare module 'einstein.subtle_effects.particle.emitter' {
  import { NoRenderParticle } from 'net.minecraft.client.particle';

  interface AbstractParticleEmitter extends NoRenderParticle {}
  class AbstractParticleEmitter extends NoRenderParticle {
    tick(): void;
  }


  interface FireFlyEmitter extends AbstractParticleEmitter {}
  class FireFlyEmitter extends AbstractParticleEmitter {
  }


  interface PotionEmitter extends NoRenderParticle {}
  class PotionEmitter extends NoRenderParticle {
    tick(): void;
  }

}

declare module 'einstein.subtle_effects.particle.provider' {
  import { Provider } from 'LargeSmokeParticle';
  import { SpriteSet, Particle } from 'net.minecraft.client.particle';
  import { SimpleParticleType, ColorParticleOption, BlockParticleOption } from 'net.minecraft.core.particles';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { MobEffectProvider } from 'SpellParticle';
  import { Provider as smokeparticle_Provider } from 'SmokeParticle';
  import { Provider as terrainparticle_Provider } from 'TerrainParticle';

  interface GeyserSmokeParticleProvider extends Provider {}
  class GeyserSmokeParticleProvider extends Provider {
    constructor(sprites: SpriteSet);
    createParticle(type: SimpleParticleType, level: ClientLevel, x: number, y: number, z: number, xSpeed: number, ySpeed: number, zSpeed: number): Particle;
  }


  interface PotionPoofCloudProvider extends MobEffectProvider {}
  class PotionPoofCloudProvider extends MobEffectProvider {
    constructor(sprites: SpriteSet);
    createParticle(option: ColorParticleOption, level: ClientLevel, x: number, y: number, z: number, xSpeed: number, ySpeed: number, zSpeed: number): Particle;
  }


  interface SmokeParticleProvider extends smokeparticle_Provider {}
  class SmokeParticleProvider extends smokeparticle_Provider {
    constructor(sprites: SpriteSet);
    createParticle(type: SimpleParticleType, level: ClientLevel, x: number, y: number, z: number, xSpeed: number, ySpeed: number, zSpeed: number): Particle;
  }


  interface SpellCasterMagicProvider extends MobEffectProvider {}
  class SpellCasterMagicProvider extends MobEffectProvider {
    constructor(sprites: SpriteSet);
    createParticle(option: ColorParticleOption, level: ClientLevel, x: number, y: number, z: number, xSpeed: number, ySpeed: number, zSpeed: number): Particle;
  }


  interface TerrainNoMomentumParticleProvider extends terrainparticle_Provider {}
  class TerrainNoMomentumParticleProvider extends terrainparticle_Provider {
    createParticle(options: BlockParticleOption, level: ClientLevel, x: number, y: number, z: number, xSpeed: number, ySpeed: number, zSpeed: number): Particle;
  }

}

declare module 'einstein.subtle_effects.platform' {
  import { NetworkHelper, ParticleHelper, IPlatformHelper, RegistryHelper } from 'einstein.subtle_effects.platform.services';
  import { Map } from 'java.util';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { BiConsumer, Consumer, Supplier, Function } from 'java.util.function';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { ServerLevel, ServerPlayer } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { TextColor } from 'net.minecraft.network.chat';
  import { Rarity } from 'net.minecraft.world.item';
  import { Platform } from 'einstein.subtle_effects.platform.services.IPlatformHelper';
  import { DeferredRegister } from 'net.neoforged.neoforge.registries';
  import { ParticleType, ParticleOptions } from 'net.minecraft.core.particles';
  import { SpriteSet, ParticleProvider } from 'net.minecraft.client.particle';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { Class } from 'java.lang';

  interface NeoForgeNetworkHelper extends NetworkHelper {}
  class NeoForgeNetworkHelper extends NetworkHelper {
    static readonly PAYLOAD_DATA: Map;
    registerClientHandler<T extends CustomPacketPayload>(type: Type<T>, handler: BiConsumer<ClientLevel, T>): void;
    registerToClient<T extends CustomPacketPayload>(type: Type<T>, streamCodec: StreamCodec<RegistryFriendlyByteBuf, T>): void;
    sendToClientsTracking<T extends CustomPacketPayload>(level: ServerLevel, pos: BlockPos, packet: T): void;
    sendToClientsTracking<T extends CustomPacketPayload>(exceptPlayer: ServerPlayer, level: ServerLevel, pos: BlockPos, packet: T): void;
    sendToClientsTracking<T extends CustomPacketPayload>(exceptPlayer: ServerPlayer, level: ServerLevel, pos: BlockPos, packet: T, skippedPlayerConsumer: Consumer<ServerPlayer>): void;
  }


  interface NeoForgeParticleHelper extends ParticleHelper {}
  class NeoForgeParticleHelper extends ParticleHelper {
    getRarityColor(rarity: Rarity): TextColor;
  }


  interface NeoForgePlatformHelper extends IPlatformHelper {}
  class NeoForgePlatformHelper extends IPlatformHelper {
    get platform(): Platform;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(modId: string): boolean;
  }


  interface NeoForgeRegistryHelper extends RegistryHelper {}
  class NeoForgeRegistryHelper extends RegistryHelper {
    static readonly PARTICLE_TYPES: DeferredRegister;
    static readonly SOUND_EVENTS: DeferredRegister;
    static readonly PARTICLE_PROVIDERS: Map;
    registerParticle<T extends ParticleType<any>>(name: string, particle: Supplier<T>): Supplier<T>;
    registerParticleProvider<T extends ParticleType<V>, V extends ParticleOptions>(particle: Supplier<T>, provider: Function<SpriteSet, ParticleProvider<V>>): void;
    registerSound(name: string): Supplier<SoundEvent>;
  }


  class Services {
    static readonly PLATFORM: IPlatformHelper;
    static readonly REGISTRY: RegistryHelper;
    static readonly PARTICLE_HELPER: ParticleHelper;
    static readonly NETWORK: NetworkHelper;
    static load<T>(clazz: Class<T>): T;
  }

}

declare module 'einstein.subtle_effects.platform.NeoForgeNetworkHelper' {
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { BiConsumer } from 'java.util.function';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class PayloadData<T extends CustomPacketPayload = any> {
    readonly streamCodec: StreamCodec;
    handler: BiConsumer;
    constructor(streamCodec: StreamCodec<RegistryFriendlyByteBuf, T>);
  }

}

declare module 'einstein.subtle_effects.platform.services' {
  import { Platform, Environment } from 'einstein.subtle_effects.platform.services.IPlatformHelper';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { BiConsumer, Consumer, Supplier, Function } from 'java.util.function';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { ServerLevel, ServerPlayer } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { List } from 'java.util';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { SpriteSet, ParticleProvider } from 'net.minecraft.client.particle';
  import { TextColor } from 'net.minecraft.network.chat';
  import { Rarity } from 'net.minecraft.world.item';
  import { ParticleType, ParticleOptions } from 'net.minecraft.core.particles';
  import { SoundEvent } from 'net.minecraft.sounds';

  class IPlatformHelper {
    get environmentName(): Environment;
    get platform(): Platform;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(var1: string): boolean;
  }


  class NetworkHelper {
    registerClientHandler<T extends CustomPacketPayload>(var1: Type<T>, var2: BiConsumer<ClientLevel, T>): void;
    registerToClient<T extends CustomPacketPayload>(var1: Type<T>, var2: StreamCodec<RegistryFriendlyByteBuf, T>): void;
    sendToClientsTracking<T extends CustomPacketPayload>(var1: ServerLevel, var2: BlockPos, var3: T): void;
    sendToClientsTracking<T extends CustomPacketPayload>(var1: ServerPlayer, var2: ServerLevel, var3: BlockPos, var4: T): void;
    sendToClientsTracking<T extends CustomPacketPayload>(var1: ServerPlayer, var2: ServerLevel, var3: BlockPos, var4: T, var5: Consumer<ServerPlayer>): void;
  }


  class ParticleHelper {
    getRarityColor(rarity: Rarity): TextColor;
    getSpritesFromSet(spriteSet: SpriteSet): TextureAtlasSprite[];
  }


  class RegistryHelper {
    registerParticle<T extends ParticleType<any>>(var1: string, var2: Supplier<T>): Supplier<T>;
    registerParticleProvider<T extends ParticleType<V>, V extends ParticleOptions>(var1: Supplier<T>, var2: Function<SpriteSet, ParticleProvider<V>>): void;
    registerSound(var1: string): Supplier<SoundEvent>;
  }

}

declare module 'einstein.subtle_effects.platform.services.IPlatformHelper' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Environment extends Enum<Environment> {}
  class Environment extends Enum<Environment> {
    static readonly DEVELOPMENT: Environment;
    static readonly PRODUCTION: Environment;
    get name(): string;
    static valueOf(name: string): Environment;
    static values(): Environment[];
  }


  interface Platform extends Enum<Platform> {}
  class Platform extends Enum<Platform> {
    static readonly FABRIC: Platform;
    static readonly FORGE: Platform;
    static readonly NEOFORGE: Platform;
    get name(): string;
    isForgeLike(): boolean;
    static valueOf(name: string): Platform;
    static values(): Platform[];
  }

}

declare module 'einstein.subtle_effects' {
  import { Logger } from 'org.slf4j';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Minecraft } from 'net.minecraft.client';
  import { Level } from 'net.minecraft.world.level';
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandBuildContext, SharedSuggestionProvider } from 'net.minecraft.commands';
  import { IEventBus } from 'net.neoforged.bus.api';

  class SubtleEffects {
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static readonly LOGGER: Logger;
    static init(): void;
    static loc(path: string): ResourceLocation;
  }


  class SubtleEffectsClient {
    static clientSetup(): void;
    static clientTick(minecraft: Minecraft, level: Level): void;
    static registerClientCommands<T extends SharedSuggestionProvider>(dispatcher: CommandDispatcher<T>, buildContext: CommandBuildContext): void;
  }


  class SubtleEffectsNeoForge {
    constructor(modEventBus: IEventBus);
  }


  class SubtleEffectsNeoForgeClient {
    constructor(modEventBus: IEventBus);
  }

}

declare module 'einstein.subtle_effects.ticking.biome_particles' {
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ValidatedList } from 'me.fzzyhmstrs.fzzy_config.validation.collection';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ValidatedInt } from 'me.fzzyhmstrs.fzzy_config.validation.number';
  import { Supplier, BiPredicate } from 'java.util.function';
  import { ParticleOptions } from 'net.minecraft.core.particles';
  import { BlockPos } from 'net.minecraft.core';
  import { List } from 'java.util';
  import { Biome } from 'net.minecraft.world.level.biome';

  class BiomeParticleManager {
    static clear(): void;
    static init(): void;
    static tickBiomeParticles(level: Level, player: Player): void;
  }


  class BiomeParticleSettings {
    constructor(biomesConfig: ValidatedList<ResourceLocation>, density: ValidatedInt, maxSpawnHeight: number, particle: Supplier<ParticleOptions>, spawnConditions: BiPredicate<Level, BlockPos>, ignoreHeight: boolean);
    checkSpawnConditions(level: Level, pos: BlockPos): boolean;
    clear(): void;
    get biomes(): Biome[];
    get density(): number;
    get maxSpawnHeight(): number;
    get particle(): Supplier<ParticleOptions>;
    ignoreHeight(): boolean;
    update(level: Level): void;
  }

}

declare module 'einstein.subtle_effects.ticking' {
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { RandomSource } from 'net.minecraft.util';
  import { Map, List } from 'java.util';
  import { Block } from 'net.minecraft.world.level.block';

  class FireflyManager {
    static tick(level: Level, pos: BlockPos, state: BlockState, random: RandomSource): void;
  }


  class GeyserManager {
    static readonly ACTIVE_GEYSERS: Map;
    static readonly INACTIVE_GEYSERS: Map;
    static readonly VALID_BLOCKS: List;
    static readonly BUBBLE_GEYSER_BLOCKS: List;
    static tick(level: Level, state: BlockState, pos: BlockPos): void;
  }


  class SparkProviderManager {
    static tick(level: Level, random: RandomSource, block: Block, state: BlockState, pos: BlockPos): void;
  }

}

declare module 'einstein.subtle_effects.ticking.tickers.entity' {
  import { LivingEntity, Entity, EntityType } from 'net.minecraft.world.entity';
  import { Ticker } from 'einstein.subtle_effects.ticking.tickers';
  import { List } from 'java.util';
  import { Predicate, Function, Supplier } from 'java.util.function';
  import { Boolean } from 'java.lang';
  import { EntityProvider } from 'einstein.subtle_effects.util';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { IronGolem } from 'net.minecraft.world.entity.animal';
  import { ItemEntity } from 'net.minecraft.world.entity.item';
  import { AbstractMinecart } from 'net.minecraft.world.entity.vehicle';
  import { ParticleType } from 'net.minecraft.core.particles';
  import { FloatParticleOptions } from 'einstein.subtle_effects.particle.option';
  import { Witch } from 'net.minecraft.world.entity.monster';

  interface DrowningTicker extends EntityTicker<LivingEntity> {}
  class DrowningTicker extends EntityTicker<LivingEntity> {
    constructor(entity: LivingEntity);
    entityTick(): void;
  }


  interface EntityCauldronTicker extends EntityTicker<Entity> {}
  class EntityCauldronTicker extends EntityTicker<Entity> {
    constructor(entity: Entity);
    entityTick(): void;
  }


  interface EntityFireTicker extends EntityTicker<Entity> {}
  class EntityFireTicker extends EntityTicker<Entity> {
    constructor(entity: Entity);
    entityTick(): void;
  }


  interface EntityTicker<T extends Entity = any> extends Ticker {}
  class EntityTicker<T extends Entity = any> extends Ticker {
    constructor(entity: T, checkVisibility: boolean);

    constructor(entity: T);
    get id(): number;
    remove(): void;
    set id(id: number);
    tick(): void;
  }


  class EntityTickerManager {
    static readonly REGISTERED: List;
    static readonly INNER_RANGE: number;
    static readonly OUTER_RANGE: number;
    static clear(level: Level): void;
    static createTickersForEntity<T extends Entity>(entity: T): void;
    static isEntityInRange<T extends Entity>(entity: T, range: number): boolean;
    static register<T extends Entity>(predicate: Predicate<Entity>, functionParameter: Function<T, EntityTicker<T>>): void;
    static registerSimple<T extends Entity>(type: EntityType<T>, checkVisibility: boolean, isEnabled: Supplier<boolean>, provider: EntityProvider<T>): void;
    static registerSimple<T extends Entity>(predicate: Predicate<Entity>, checkVisibility: boolean, provider: EntityProvider<T>): void;
  }


  interface FrostyBreathTicker extends EntityTicker<LivingEntity> {}
  class FrostyBreathTicker extends EntityTicker<LivingEntity> {
    constructor(entity: LivingEntity);
    entityTick(): void;
  }


  interface HeartbeatTicker extends EntityTicker<Player> {}
  class HeartbeatTicker extends EntityTicker<Player> {
    constructor(entity: Player);
    entityTick(): void;
  }


  interface HumanoidPotionRingTicker<T extends LivingEntity = any> extends EntityTicker<T> {}
  class HumanoidPotionRingTicker<T extends LivingEntity = any> extends EntityTicker<T> {
    constructor(entity: T);
    entityTick(): void;
  }


  interface IronGolemTicker extends EntityTicker<IronGolem> {}
  class IronGolemTicker extends EntityTicker<IronGolem> {
    constructor(entity: IronGolem);
    entityTick(): void;
  }


  interface ItemRarityTicker extends EntityTicker<ItemEntity> {}
  class ItemRarityTicker extends EntityTicker<ItemEntity> {
    constructor(entity: ItemEntity);
    entityTick(): void;
  }


  interface MinecartSparksTicker extends EntityTicker<AbstractMinecart> {}
  class MinecartSparksTicker extends EntityTicker<AbstractMinecart> {
    constructor(entity: AbstractMinecart);
    entityTick(): void;
  }


  interface MobSkullShaderTicker extends EntityTicker<Player> {}
  class MobSkullShaderTicker extends EntityTicker<Player> {
    constructor(entity: Player);
    entityTick(): void;
  }


  interface SimpleTicker<T extends Entity = any> extends EntityTicker<T> {}
  class SimpleTicker<T extends Entity = any> extends EntityTicker<T> {
    constructor(entity: T, provider: EntityProvider<T>, checkVisibility: boolean);
    entityTick(): void;
  }


  interface SlimeTrailTicker<T extends Slime = any> extends EntityTicker<T> {}
  class SlimeTrailTicker<T extends Slime = any> extends EntityTicker<T> {
    constructor(entity: T, type: Supplier<ParticleType<FloatParticleOptions>>);
    entityTick(): void;
  }


  interface StomachGrowlingTicker extends EntityTicker<Player> {}
  class StomachGrowlingTicker extends EntityTicker<Player> {
    constructor(entity: Player);
    entityTick(): void;
  }


  interface WitchPotionRingTicker extends HumanoidPotionRingTicker<Witch> {}
  class WitchPotionRingTicker extends HumanoidPotionRingTicker<Witch> {
    constructor(entity: Witch);
  }

}

declare module 'einstein.subtle_effects.ticking.tickers.entity.sleeping' {
  import { Bat } from 'net.minecraft.world.entity.ambient';
  import { Cat, Fox } from 'net.minecraft.world.entity.animal';
  import { Player } from 'net.minecraft.world.entity.player';
  import { EntityTicker } from 'einstein.subtle_effects.ticking.tickers.entity';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { AbstractVillager } from 'net.minecraft.world.entity.npc';

  interface BatSleepingTicker extends SleepingTicker<Bat> {}
  class BatSleepingTicker extends SleepingTicker<Bat> {
    constructor(entity: Bat);
  }


  interface CatSleepingTicker extends SleepingTicker<Cat> {}
  class CatSleepingTicker extends SleepingTicker<Cat> {
    constructor(cat: Cat);
  }


  interface FoxSleepingTicker extends SleepingTicker<Fox> {}
  class FoxSleepingTicker extends SleepingTicker<Fox> {
    constructor(entity: Fox);
  }


  interface PlayerSleepingTicker extends SleepingTicker<Player> {}
  class PlayerSleepingTicker extends SleepingTicker<Player> {
    constructor(player: Player);
  }


  interface SleepingTicker<T extends LivingEntity = any> extends EntityTicker<T> {}
  class SleepingTicker<T extends LivingEntity = any> extends EntityTicker<T> {
    constructor(entity: T);

    constructor(entity: T, doesSnore: boolean, breathDelay: number, snoreSound: SoundEvent, snoreVolume: number);
    entityTick(): void;
  }


  interface VillagerSleepingTicker extends SleepingTicker<AbstractVillager> {}
  class VillagerSleepingTicker extends SleepingTicker<AbstractVillager> {
    constructor(villager: AbstractVillager);
  }

}

declare module 'einstein.subtle_effects.ticking.tickers.geyser' {
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';
  import { Ticker } from 'einstein.subtle_effects.ticking.tickers';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { Block } from 'net.minecraft.world.level.block';

  interface BubbleGeyserTicker extends GeyserTicker {}
  class BubbleGeyserTicker extends GeyserTicker {
    constructor(level: Level, pos: BlockPos, random: RandomSource);
  }


  interface FlameGeyserTicker extends GeyserTicker {}
  class FlameGeyserTicker extends GeyserTicker {
    constructor(level: Level, pos: BlockPos, random: RandomSource);
  }


  interface GeyserTicker extends Ticker {}
  class GeyserTicker extends Ticker {
    constructor(type: GeyserType, level: Level, pos: BlockPos, random: RandomSource);
    static checkLocation(type: GeyserType, level: Level, pos: BlockPos, checkHeight: number): boolean;
    static isNotFaceSturdyOrFluidEmpty(type: GeyserType, level: Level, pos: BlockPos): boolean;
    remove(): void;
    tick(): void;
    static trySpawn(type: GeyserType, level: Level, pos: BlockPos, random: RandomSource): void;
  }


  interface GeyserType extends Enum<GeyserType> {}
  class GeyserType extends Enum<GeyserType> {
    static readonly FLAME: GeyserType;
    static readonly SMOKE: GeyserType;
    static readonly BUBBLE: GeyserType;
    get serializedName(): string;
    get spawnableBlocks(): Block[];
    static valueOf(name: string): GeyserType;
    static values(): GeyserType[];
  }


  interface SmokeGeyserTicker extends GeyserTicker {}
  class SmokeGeyserTicker extends GeyserTicker {
    constructor(level: Level, pos: BlockPos, random: RandomSource);
  }

}

declare module 'einstein.subtle_effects.ticking.tickers' {
  import { Runnable } from 'java.lang';
  import { Level } from 'net.minecraft.world.level';

  interface ScheduledTicker extends Ticker {}
  class ScheduledTicker extends Ticker {
    constructor(lifeTime: number, runnable: Runnable);
    tick(): void;
  }


  class Ticker {
    isRemoved(): boolean;
    remove(): void;
    tick(): void;
  }


  class TickerManager {
    static add(ticker: Ticker): void;
    static clear(level: Level): void;
    static schedule(tickDelay: number, runnable: Runnable): void;
    static scheduleNext(runnable: Runnable): void;
    static tick(): void;
  }

}

declare module 'einstein.subtle_effects.util' {
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';
  import { SpriteSet, Particle } from 'net.minecraft.client.particle';
  import { Int2ObjectMap } from 'it.unimi.dsi.fastutil.ints';
  import { EntityTicker } from 'einstein.subtle_effects.ticking.tickers.entity';
  import { Frustum } from 'net.minecraft.client.renderer.culling';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { List } from 'java.util';
  import { Integer, Enum } from 'java.lang';
  import { ParticleOptions, ParticleType, ColorParticleOption, DustParticleOptions } from 'net.minecraft.core.particles';
  import { Predicate, BiPredicate, Supplier } from 'java.util.function';
  import { LivingEntity, Entity } from 'net.minecraft.world.entity';
  import { TypeConfig } from 'einstein.subtle_effects.networking.clientbound.ClientBoundEntityFellPayload';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Gson } from 'com.google.gson';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';
  import { CameraType } from 'net.minecraft.client';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { ColorHolder } from 'ValidatedColor';

  class BlockTickerProvider {
    apply(var1: BlockState, var2: Level, var3: BlockPos, var4: RandomSource): void;
  }


  class BubbleSetter {
    subtleEffects$setupBubble(var1: SpriteSet, var2: boolean): void;
  }


  class EntityProvider<T extends Entity = any> {
    apply(var1: T, var2: Level, var3: RandomSource): void;
  }


  class EntityTickersGetter {
    subtleEffects$getTickers(): Int2ObjectMap<EntityTicker<any>>;
  }


  class FrustumGetter {
    subtleEffects$getCullingFrustum(): Frustum;
  }


  class HeartParticleAccessor {
    subtleEffects$setHeart(): void;
  }


  class MathUtil {
    static nextDouble(random: RandomSource, max: number): number;
    static nextNonAbsDouble(random: RandomSource): number;
    static nextNonAbsDouble(random: RandomSource, max: number): number;
    static nextNonAbsDouble(random: RandomSource, min: number, max: number): number;
    static nextSign(random: RandomSource): number;
  }


  class ParticleAccessor {
    get alpha(): number;
    get x(): number;
    get y(): number;
    get z(): number;
    set alpha(var1: number);
    setGravity(var1: number): void;
    setHasPhysics(var1: boolean): void;
    subtleEffects$force(): void;
    subtleEffects$wasForced(): boolean;
  }


  class ParticleSpawnUtil {
    static spawnBucketParticles(level: Level, pos: BlockPos, stack: ItemStack): void;
    static spawnBucketParticles(level: Level, pos: BlockPos, particle: ParticleOptions): void;
    static spawnCmdBlockParticles(level: Level, pos: Vec3, random: RandomSource, directionValidator: BiPredicate<Direction, Vec3>): void;
    static spawnCompostParticles(level: Level, pos: BlockPos, particle: ParticleOptions, xSpeed: number, ySpeed: number, zSpeed: number): void;
    static spawnCreatureMovementDustClouds(entity: LivingEntity, level: Level, random: RandomSource, YSpeedModifier: number): void;
    static spawnCreatureMovementDustCloudsNoConfig(entity: LivingEntity, level: Level, random: RandomSource, YSpeedModifier: number): void;
    static spawnEndPortalParticles(level: Level, pos: BlockPos, random: RandomSource, particle: ParticleOptions, count: number): void;
    static spawnEnderEyePlacementParticles(pos: BlockPos, random: RandomSource, level: Level, color: number): void;
    static spawnEntityFaceParticle(options: ParticleOptions, entity: LivingEntity, level: Level, random: RandomSource, offset: Vec3, partialTick: number): void;
    static spawnEntityFaceParticle(options: ParticleOptions, entity: LivingEntity, level: Level, random: RandomSource, offset: Vec3, speed: Vec3, partialTick: number): void;
    static spawnEntityFaceParticle(options: ParticleOptions, entity: LivingEntity, level: Level, offset: Vec3, speed: Vec3, partialTick: number): void;
    static spawnEntityFellParticles(entity: LivingEntity, y: number, distance: number, fallDamage: number, config: boolean): void;
    static spawnEntityHeadParticle(options: ParticleOptions, entity: LivingEntity, level: Level, pos: Vec3, speed: Vec3, partialTick: number): void;
    static spawnFallDustClouds(entity: LivingEntity, distance: number, fallDamage: number, config: TypeConfig): void;
    static spawnGrindstoneUsedParticles(level: Level, pos: BlockPos, state: BlockState, random: RandomSource): void;
    static spawnHammeringWorkstationParticles(pos: BlockPos, random: RandomSource, level: Level): void;
    static spawnHeatedWaterParticles(level: Level, pos: BlockPos, random: RandomSource, isFalling: boolean, height: number, steamConfig: boolean, boilingConfig: boolean): void;
    static spawnParticlesAroundBlock(particle: ParticleOptions, level: Level, pos: BlockPos, random: RandomSource, perSideChance: number): void;
    static spawnParticlesAroundBlock(particle: ParticleOptions, level: Level, pos: BlockPos, random: RandomSource, offset: number, predicate: Predicate<Direction>): void;
    static spawnParticlesAroundShape(particle: ParticleOptions, level: Level, pos: BlockPos, state: BlockState, count: number, particleSpeed: Supplier<Vec3>, offset: number): void;
    static spawnParticlesAroundShape(particle: ParticleOptions, level: Level, pos: BlockPos, state: BlockState, predicate: Predicate<Direction>, count: number, particleSpeed: Supplier<Vec3>, offset: number): void;
    static spawnParticlesOnSide(particle: ParticleOptions, offset: number, direction: Direction, level: Level, pos: BlockPos, random: RandomSource, xSpeed: number, ySpeed: number, zSpeed: number): void;
    static spawnSparks(level: Level, random: RandomSource, pos: BlockPos, sparkType: SparkType, box: Box, maxSpeeds: Vec3, count: number, colors: number[]): void;
    static spawnStonecutterParticles(level: Level, stack: ItemStack, pos: BlockPos, state: BlockState): void;
  }


  interface SparkType extends Enum<SparkType> {}
  class SparkType extends Enum<SparkType> {
    static readonly SHORT_LIFE: SparkType;
    static readonly LONG_LIFE: SparkType;
    static readonly FLOATING: SparkType;
    static readonly METAL: SparkType;
    get serializedName(): string;
    get type(): Supplier<ParticleType<ColorParticleOption>>;
    static valueOf(name: string): SparkType;
    static values(): SparkType[];
  }


  class Util {
    static readonly BREATH_DELAY: number;
    static readonly SNORE_DELAY: number;
    static readonly MAX_Z_COUNT: number;
    static readonly PARTICLE_LIGHT_COLOR: number;
    static readonly GLOWSTONE_DUST_PARTICLES: DustParticleOptions;
    static readonly COLORLESS_RAIN_TEXTURE: ResourceLocation;
    static readonly GSON: Gson;
    static readonly VANILLA_EYE: ResourceLocation;
    static applyHelmetShader(stack: ItemStack, cameraType: CameraType): void;
    static getCauldronFillHeight(state: BlockState): number;
    static getCauldronFluid(state: BlockState): Fluid;
    static getCauldronParticle(state: BlockState): ParticleOptions;
    static getEyeColorHolder(level: Level, pos: BlockPos): ColorHolder;
    static getParticleForFluid(fluid: Fluid): ParticleOptions;
    static isChunkLoaded(level: Level, blockX: number, blockZ: number): boolean;
    static isSolidOrNotEmpty(level: Level, pos: BlockPos): boolean;
    static playClientSound(entity: Entity, sound: SoundEvent, source: SoundSource, volume: number, pitch: number): void;
    static playClientSound(pos: BlockPos, sound: SoundEvent, source: SoundSource, volume: number, pitch: number): void;
    static randomizeColor(random: RandomSource, color: number, multiplier: number): number;
    static setColorFromHex(particle: Particle, hexColor: number): void;
    static setRandomizedColor(particle: Particle, random: RandomSource, r: number, g: number, b: number): void;
    static toColorHolder(color: number): ColorHolder;
  }

}