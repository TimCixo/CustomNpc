declare module 'toni.sodiumoptionsmodcompat.integration.continuity' {
  import { OptionPage } from 'net.caffeinemc.mods.sodium.client.gui.options';
  import { OptionIdentifier } from 'toni.sodiumoptionsapi.api';
  import { OptionStorage } from 'net.caffeinemc.mods.sodium.client.gui.options.storage';
  import { ContinuityConfig } from 'me.pepperbell.continuity.client.config';

  interface ContinuityOptionPage extends OptionPage {}
  class ContinuityOptionPage extends OptionPage {
    static readonly ID: OptionIdentifier;
    constructor();
  }


  interface ContinuityOptionsStorage extends OptionStorage<ContinuityConfig> {}
  class ContinuityOptionsStorage extends OptionStorage<ContinuityConfig> {
    static readonly INSTANCE: ContinuityOptionsStorage;
    get data(): ContinuityConfig;
    save(): void;
  }

}

declare module 'toni.sodiumoptionsmodcompat.integration.dynamicfps' {
  import { OptionStorage } from 'net.caffeinemc.mods.sodium.client.gui.options.storage';
  import { DynamicFPSConfig, Config } from 'dynamic_fps.impl.config';

  interface DynamicFpsGeneralStorage extends OptionStorage<DynamicFPSConfig> {}
  class DynamicFpsGeneralStorage extends OptionStorage<DynamicFPSConfig> {
    static readonly INSTANCE: DynamicFpsGeneralStorage;
    get data(): DynamicFPSConfig;
    save(): void;
  }


  interface DynamicFpsPowerStorage extends OptionStorage<Config> {}
  class DynamicFpsPowerStorage extends OptionStorage<Config> {
    constructor(config: Config);
    get data(): Config;
    save(): void;
  }

}

declare module 'toni.sodiumoptionsmodcompat.integration.dynamicfps.pages' {
  import { OptionPage } from 'net.caffeinemc.mods.sodium.client.gui.options';
  import { OptionIdentifier } from 'toni.sodiumoptionsapi.api';

  interface DynamicFpsGeneralPage extends OptionPage {}
  class DynamicFpsGeneralPage extends OptionPage {
    static readonly ID: OptionIdentifier;
    constructor();
  }


  interface DynamicFpsPowerPage extends OptionPage {}
  class DynamicFpsPowerPage extends OptionPage {
    constructor(powerStateName: string);
  }

}

declare module 'toni.sodiumoptionsmodcompat.integration.emf' {
  import { OptionPage } from 'net.caffeinemc.mods.sodium.client.gui.options';
  import { OptionIdentifier } from 'toni.sodiumoptionsapi.api';
  import { OptionStorage } from 'net.caffeinemc.mods.sodium.client.gui.options.storage';
  import { EMFConfig } from 'traben.entity_model_features.config';

  interface EmfModelsOptionPage extends OptionPage {}
  class EmfModelsOptionPage extends OptionPage {
    static readonly ID: OptionIdentifier;
    constructor();
  }


  interface EmfOptionsStorage extends OptionStorage<EMFConfig> {}
  class EmfOptionsStorage extends OptionStorage<EMFConfig> {
    static readonly INSTANCE: EmfOptionsStorage;
    get data(): EMFConfig;
    save(): void;
  }

}

declare module 'toni.sodiumoptionsmodcompat.integration.etf' {
  import { OptionPage } from 'net.caffeinemc.mods.sodium.client.gui.options';
  import { OptionIdentifier } from 'toni.sodiumoptionsapi.api';
  import { OptionStorage } from 'net.caffeinemc.mods.sodium.client.gui.options.storage';
  import { ETFConfig } from 'traben.entity_texture_features.config';

  interface EtfMiscOptionPage extends OptionPage {}
  class EtfMiscOptionPage extends OptionPage {
    static readonly ID: OptionIdentifier;
    constructor();
  }


  interface EtfOptionsStorage extends OptionStorage<ETFConfig> {}
  class EtfOptionsStorage extends OptionStorage<ETFConfig> {
    static readonly INSTANCE: EtfOptionsStorage;
    get data(): ETFConfig;
    save(): void;
  }


  interface EtfTexturesOptionPage extends OptionPage {}
  class EtfTexturesOptionPage extends OptionPage {
    static readonly ID: OptionIdentifier;
    constructor();
  }

}

declare module 'toni.sodiumoptionsmodcompat.integration' {
  class Integrations {
    static init(): void;
  }

}

declare module 'toni.sodiumoptionsmodcompat.mixin' {
  import { Config } from 'dynamic_fps.impl.config';

  class DynamicFPSConfigAccessor {
    static getConfig(): Config;
  }

}

declare module 'toni.sodiumoptionsmodcompat' {
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { Set, List } from 'java.util';
  import { ClassNode } from 'org.objectweb.asm.tree';
  import { Logger } from 'org.apache.logging.log4j';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';
  import { FMLCommonSetupEvent, FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';

  interface MixinPlugin extends IMixinConfigPlugin {}
  class MixinPlugin extends IMixinConfigPlugin {
    acceptTargets(myTargets: Set<string>, otherTargets: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    isModLoaded(mod: string): boolean;
    onLoad(mixinPackage: string): void;
    postApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    preApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    shouldApplyMixin(targetClassName: string, mixinClassName: string): boolean;
  }


  class SodiumOptionsModCompat {
    static readonly MODNAME: string;
    static readonly ID: string;
    static readonly LOGGER: Logger;
    constructor(modEventBus: IEventBus, modContainer: ModContainer);
    clientSetup(event: FMLClientSetupEvent): void;
    commonSetup(event: FMLCommonSetupEvent): void;
    onInitialize(): void;
    onInitializeClient(): void;
  }

}

declare module 'toni.sodiumoptionsmodcompat.utils' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Component } from 'net.minecraft.network.chat';
  import { Level } from 'net.minecraft.world.level';
  import { Entity } from 'net.minecraft.world.entity';

  class PlatformUtils {
    static getModName(modId: string): string;
    static isFabric(): boolean;
    static isForge(): boolean;
    static isForgelike(): boolean;
    static isModLoaded(modid: string): boolean;
    static isNeo(): boolean;
  }


  class VersionUtils {
    static level(entity: Entity): Level;
    static resource(modid: string, path: string): ResourceLocation;
    static resource(path: string): ResourceLocation;
    static text(str: string): Component;
  }

}