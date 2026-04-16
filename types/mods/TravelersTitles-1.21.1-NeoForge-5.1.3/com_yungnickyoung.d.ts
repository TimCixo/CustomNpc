declare module 'com.yungnickyoung.minecraft.travelerstitles.command' {
  import { DynamicCommandExceptionType } from 'com.mojang.brigadier.exceptions';
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack, CommandBuildContext } from 'net.minecraft.commands';
  import { CommandSelection } from 'Commands';
  import { Result } from 'ResourceOrTagKeyArgument';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { ServerLevel } from 'net.minecraft.server.level';

  class BiomeTitleCommand {
    static readonly BIOME_NOT_FOUND_EXCEPTION: DynamicCommandExceptionType;
    static readonly INVALID_BIOME_EXCEPTION: DynamicCommandExceptionType;
    static displayTitle(commandSource: CommandSourceStack, biomeResult: Result<Biome>): number;
    static register(dispatcher: CommandDispatcher<CommandSourceStack>, context: CommandBuildContext, environment: CommandSelection): void;
  }


  class DimensionTitleCommand {
    static displayTitle(commandSource: CommandSourceStack, world: ServerLevel): number;
    static register(dispatcher: CommandDispatcher<CommandSourceStack>, context: CommandBuildContext, environment: CommandSelection): void;
  }


  class ReloadConfigCommand {
    static register(dispatcher: CommandDispatcher<CommandSourceStack>, context: CommandBuildContext, environment: CommandSelection): void;
    static reloadConfig(commandSource: CommandSourceStack): number;
  }

}

declare module 'com.yungnickyoung.minecraft.travelerstitles.config' {
  import { ConfigValue, Builder } from 'ModConfigSpec';
  import { ModConfigSpec } from 'net.neoforged.neoforge.common';

  class ConfigBiomesNeoForge {
    readonly enabled: ConfigValue;
    readonly textFadeInTime: ConfigValue;
    readonly textDisplayTime: ConfigValue;
    readonly textFadeOutTime: ConfigValue;
    readonly textCooldownTime: ConfigValue;
    readonly textColor: ConfigValue;
    readonly textSize: ConfigValue;
    readonly renderShadow: ConfigValue;
    readonly textYOffset: ConfigValue;
    readonly textXOffset: ConfigValue;
    readonly biomeBlacklist: ConfigValue;
    readonly recentBiomeCacheSize: ConfigValue;
    readonly centerText: ConfigValue;
    readonly resetBiomeCacheOnDimensionChange: ConfigValue;
    readonly onlyUpdateAtSurface: ConfigValue;
    constructor(BUILDER: Builder);
  }


  class ConfigDimensionsNeoForge {
    readonly enabled: ConfigValue;
    readonly textFadeInTime: ConfigValue;
    readonly textDisplayTime: ConfigValue;
    readonly textFadeOutTime: ConfigValue;
    readonly textColor: ConfigValue;
    readonly textSize: ConfigValue;
    readonly renderShadow: ConfigValue;
    readonly textYOffset: ConfigValue;
    readonly textXOffset: ConfigValue;
    readonly dimensionBlacklist: ConfigValue;
    readonly centerText: ConfigValue;
    readonly onlyUpdateAtSurface: ConfigValue;
    constructor(BUILDER: Builder);
  }


  class ConfigSoundNeoForge {
    readonly biomeVolume: ConfigValue;
    readonly biomePitch: ConfigValue;
    readonly dimensionVolume: ConfigValue;
    readonly dimensionPitch: ConfigValue;
    readonly waystoneVolume: ConfigValue;
    readonly waystonePitch: ConfigValue;
    constructor(BUILDER: Builder);
  }


  class ConfigWaystonesNeoForge {
    readonly enabled: ConfigValue;
    readonly textFadeInTime: ConfigValue;
    readonly textDisplayTime: ConfigValue;
    readonly textFadeOutTime: ConfigValue;
    readonly textCooldownTime: ConfigValue;
    readonly textColor: ConfigValue;
    readonly textSize: ConfigValue;
    readonly renderShadow: ConfigValue;
    readonly textYOffset: ConfigValue;
    readonly textXOffset: ConfigValue;
    readonly recentWaystoneCacheSize: ConfigValue;
    readonly centerText: ConfigValue;
    readonly resetWaystoneCacheOnDimensionChange: ConfigValue;
    readonly range: ConfigValue;
    readonly waystonesOverrideBiomeTitle: ConfigValue;
    readonly onlyUpdateAtSurface: ConfigValue;
    constructor(BUILDER: Builder);
  }


  class TTConfigNeoForge {
    static readonly BUILDER: Builder;
    static readonly SPEC: ModConfigSpec;
    static readonly biomes: ConfigBiomesNeoForge;
    static readonly dimensions: ConfigDimensionsNeoForge;
    static readonly waystones: ConfigWaystonesNeoForge;
    static readonly sound: ConfigSoundNeoForge;
  }

}

declare module 'com.yungnickyoung.minecraft.travelerstitles.mixin' {
  import { Player } from 'net.minecraft.world.entity.player';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { GameProfile } from 'com.mojang.authlib';

  class EntityChangeDimensionMixin {
  }


  interface LocalPlayerTickMixin extends Player {}
  class LocalPlayerTickMixin extends Player {
    constructor($$0: Level, $$1: BlockPos, $$2: number, $$3: GameProfile);
  }


  class MinecraftClientTickMixin {
  }

}

declare module 'com.yungnickyoung.minecraft.travelerstitles.module' {
  import { AutoRegisterCommand, AutoRegisterSoundEvent } from 'com.yungnickyoung.minecraft.yungsapi.api.autoregister';
  import { Biomes, Dimensions, Sound, Waystones } from 'com.yungnickyoung.minecraft.travelerstitles.module.ConfigModule';
  import { ModContainer } from 'net.neoforged.fml';
  import { Load } from 'LevelEvent';
  import { ModConfigEvent } from 'net.neoforged.fml.event.config';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { RegisterGuiLayersEvent } from 'net.neoforged.neoforge.client.event';
  import { TagKey } from 'net.minecraft.tags';

  class CommandModule {
    static BIOME_TITLE_COMMAND: AutoRegisterCommand;
    static DIMENSION_TITLE_COMMAND: AutoRegisterCommand;
    static RELOAD_CONFIG_COMMAND: AutoRegisterCommand;
  }


  class CompatModule {
    static isWaystonesLoaded: boolean;
    static init(): void;
  }


  class ConfigModule {
    readonly biomes: Biomes;
    readonly dimensions: Dimensions;
    readonly sound: Sound;
    readonly waystones: Waystones;
    static updateRenderersFromConfig(): void;
  }


  class ConfigModuleNeoForge {
    static bakeConfig(): void;
    static configChanged(event: ModConfigEvent): void;
    static init(container: ModContainer): void;
    static onWorldLoad(event: Load): void;
  }


  class RenderGuiNeoForge {
    static init(eventBus: IEventBus): void;
    static onClientTick(event: RegisterGuiLayersEvent): void;
  }


  class SoundModule {
    static BIOME: AutoRegisterSoundEvent;
    static DIMENSION: AutoRegisterSoundEvent;
    static WAYSTONE: AutoRegisterSoundEvent;
  }


  class TagModule {
    static readonly IS_UNDERGROUND: TagKey;
  }

}

declare module 'com.yungnickyoung.minecraft.travelerstitles.module.ConfigModule' {
  import { List } from 'java.util';

  class Biomes {
    enabled: boolean;
    textFadeInTime: number;
    textDisplayTime: number;
    textFadeOutTime: number;
    textCooldownTime: number;
    textColor: string;
    textSize: number;
    renderShadow: boolean;
    textYOffset: number;
    textXOffset: number;
    biomeBlacklist: List;
    recentBiomeCacheSize: number;
    centerText: boolean;
    resetBiomeCacheOnDimensionChange: boolean;
    onlyUpdateAtSurface: boolean;
  }


  class Dimensions {
    enabled: boolean;
    textFadeInTime: number;
    textDisplayTime: number;
    textFadeOutTime: number;
    textColor: string;
    textSize: number;
    renderShadow: boolean;
    textYOffset: number;
    textXOffset: number;
    dimensionBlacklist: List;
    centerText: boolean;
    onlyUpdateAtSurface: boolean;
  }


  class Sound {
    biomeVolume: number;
    biomePitch: number;
    dimensionVolume: number;
    dimensionPitch: number;
    waystoneVolume: number;
    waystonePitch: number;
  }


  class Waystones {
    enabled: boolean;
    textFadeInTime: number;
    textDisplayTime: number;
    textFadeOutTime: number;
    textCooldownTime: number;
    textColor: string;
    textSize: number;
    renderShadow: boolean;
    textYOffset: number;
    textXOffset: number;
    recentWaystoneCacheSize: number;
    centerText: boolean;
    resetWaystoneCacheOnDimensionChange: boolean;
    range: number;
    waystonesOverrideBiomeTitle: boolean;
    onlyUpdateAtSurface: boolean;
  }

}

declare module 'com.yungnickyoung.minecraft.travelerstitles.render' {
  import { LinkedList } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Predicate } from 'java.util.function';
  import { Player } from 'net.minecraft.world.entity.player';

  class TitleRenderer<T = any> {
    readonly recentEntries: LinkedList;
    displayedTitle: Component;
    displayedSubTitle: Component;
    titleTimer: number;
    cooldownTimer: number;
    maxRecentListSize: number;
    enabled: boolean;
    titleFadeInTicks: number;
    titleDisplayTime: number;
    titleFadeOutTicks: number;
    titleTextcolor: number;
    titleDefaultTextColor: string;
    showTextShadow: boolean;
    titleTextSize: number;
    titleXOffset: number;
    titleYOffset: number;
    isTextCentered: boolean;
    constructor(maxRecentListSize: number, enabled: boolean, fadeInTicks: number, displayTicks: number, fadeOutTicks: number, textColor: string, showTextShadow: boolean, textSize: number, xOffset: number, yOffset: number, centerText: boolean);
    addRecentEntry(entry: T): void;
    clearTimer(): void;
    displayTitle(titleText: Component, subtitleText: Component): void;
    matchesAnyRecentEntry(entryMatchPredicate: Predicate<T>): boolean;
    renderText(partialTicks: number, guiGraphics: GuiGraphics): void;
    setColor(textColor: string): void;
    tick(): void;
  }


  class TitleRenderManager {
    readonly biomeTitleRenderer: TitleRenderer;
    readonly dimensionTitleRenderer: TitleRenderer;
    constructor();
    clientTick(): void;
    playerChangedDimension(entity: any): void;
    playerTick(player: Player): void;
    renderTitles(guiGraphics: GuiGraphics, partialTicks: number): void;
  }

}

declare module 'com.yungnickyoung.minecraft.travelerstitles.services' {
  import { Player } from 'net.minecraft.world.entity.player';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Waystones } from 'com.yungnickyoung.minecraft.travelerstitles.module.ConfigModule';
  import { Class } from 'java.lang';

  class IConfigReloader {
    reloadConfig(): void;
  }


  class IModulesLoader {
    loadModules(): void;
  }


  class IPlatformHelper {
    get platformName(): string;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(var1: string): boolean;
  }


  class IWaystonesCompatHelper {
    clientTick(): void;
    init(): void;
    isRendering(): boolean;
    renderText(var1: number, var2: GuiGraphics): void;
    reset(): void;
    updateRendererFromConfig(var1: Waystones): void;
    updateWaystoneTitle(var1: Player): boolean;
  }


  interface NeoForgeConfigReloader extends IConfigReloader {}
  class NeoForgeConfigReloader extends IConfigReloader {
    reloadConfig(): void;
  }


  interface NeoForgeModulesLoader extends IModulesLoader {}
  class NeoForgeModulesLoader extends IModulesLoader {
    loadModules(): void;
  }


  interface NeoForgePlatformHelper extends IPlatformHelper {}
  class NeoForgePlatformHelper extends IPlatformHelper {
    get platformName(): string;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(modId: string): boolean;
  }


  interface NeoForgeWaystonesCompatHelper extends IWaystonesCompatHelper {}
  class NeoForgeWaystonesCompatHelper extends IWaystonesCompatHelper {
    constructor();
    clientTick(): void;
    init(): void;
    isRendering(): boolean;
    renderText(partialTicks: number, guiGraphics: GuiGraphics): void;
    reset(): void;
    updateRendererFromConfig(config: Waystones): void;
    updateWaystoneTitle(player: Player): boolean;
  }


  class Services {
    static readonly PLATFORM: IPlatformHelper;
    static readonly MODULES: IModulesLoader;
    static readonly CONFIG_RELOADER: IConfigReloader;
    static readonly WAYSTONES: IWaystonesCompatHelper;
    static load<T>(clazz: Class<T>): T;
  }

}

declare module 'com.yungnickyoung.minecraft.travelerstitles' {
  import { Logger } from 'org.apache.logging.log4j';
  import { ConfigModule } from 'com.yungnickyoung.minecraft.travelerstitles.module';
  import { TitleRenderManager } from 'com.yungnickyoung.minecraft.travelerstitles.render';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';

  class TravelersTitlesCommon {
    static readonly MOD_ID: string;
    static readonly LOGGER: Logger;
    static readonly CONFIG: ConfigModule;
    static titleManager: TitleRenderManager;
    static init(): void;
  }


  class TravelersTitlesNeoForge {
    static loadingContextEventBus: IEventBus;
    constructor(eventBus: IEventBus, container: ModContainer);
  }

}