declare module 'net.caffeinemc.caffeineconfig' {
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { Set, List, Map, Collection } from 'java.util';
  import { ClassNode } from 'org.objectweb.asm.tree';
  import { Builder } from 'net.caffeinemc.caffeineconfig.CaffeineConfig';
  import { Logger } from 'org.slf4j';

  interface AbstractCaffeineConfigMixinPlugin extends IMixinConfigPlugin {}
  class AbstractCaffeineConfigMixinPlugin extends IMixinConfigPlugin {
    acceptTargets(myTargets: Set<string>, otherTargets: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    onLoad(mixinPackage: string): void;
    postApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    preApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    shouldApplyMixin(targetClassName: string, mixinClassName: string): boolean;
  }


  class CaffeineConfig {
    addMixinOption(mixin: string, enabled: boolean, overrideable: boolean): void;
    static builder(modName: string): Builder;
    get logger(): Logger;
    get modName(): string;
    get optionCount(): number;
    get optionOverrideCount(): number;
    get options(): Map<string, Option>;
    getEffectiveOptionForMixin(mixinClassName: string): Option;
    getParent(option: Option): Option;
  }


  interface CaffeineConfigNeoForge extends CaffeineConfigPlatform {}
  class CaffeineConfigNeoForge extends CaffeineConfigPlatform {
    applyModOverrides(config: CaffeineConfig, jsonKey: string): void;
  }


  class CaffeineConfigPlatform {
    applyModOverrides(var1: CaffeineConfig, var2: string): void;
  }


  class Option {
    get definingMods(): Collection<string>;
    get name(): string;
    isEnabled(): boolean;
    isEnabledRecursive(config: CaffeineConfig): boolean;
    isModDefined(): boolean;
    isOverridden(): boolean;
    isOverrideable(): boolean;
    isUserDefined(): boolean;
  }

}

declare module 'net.caffeinemc.caffeineconfig.CaffeineConfig' {
  import { Logger } from 'org.slf4j';
  import { CaffeineConfig } from 'net.caffeinemc.caffeineconfig';
  import { Path } from 'java.nio.file';

  class Builder {
    addMixinOption(mixin: string, enabled: boolean): Builder;
    addMixinOption(mixin: string, enabled: boolean, overrideable: boolean): Builder;
    addOptionDependency(option: string, dependency: string, requiredValue: boolean): Builder;
    build(path: Path): CaffeineConfig;
    withInfoUrl(url: string): Builder;
    withLogger(logger: Logger): Builder;
    withSettingsKey(key: string): Builder;
  }

}