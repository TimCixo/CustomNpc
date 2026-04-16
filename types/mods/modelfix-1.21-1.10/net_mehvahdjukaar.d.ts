declare module 'net.mehvahdjukaar.modelfix.mixins' {
  import { SpriteContents } from 'net.minecraft.client.renderer.texture';
  import { CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { List } from 'java.util';
  import { BlockElement } from 'net.minecraft.client.renderer.block.model';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Float } from 'java.lang';

  class ItemModelMixin {
    increaseSide(spriteContents: SpriteContents, string: string, tintIndex: number, cir: CallbackInfoReturnable<BlockElement[]>): void;
  }


  class TextureAtlasSpriteMixin {
    atlasLocation(): ResourceLocation;
    cancelShrink(cir: CallbackInfoReturnable<number>): void;
  }

}

declare module 'net.mehvahdjukaar.modelfix' {
  import { Logger } from 'org.apache.logging.log4j';
  import { Supplier } from 'java.util.function';
  import { ConfigSpec } from 'net.mehvahdjukaar.modelfix.moonlight_configs';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List } from 'java.util';
  import { Span, SpanFacing } from 'ItemModelGenerator';
  import { CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { BlockElement } from 'net.minecraft.client.renderer.block.model';

  class ModelFix {
    static readonly MOD_ID: string;
    static readonly LOGGER: Logger;
    static expansion: Supplier;
    static indent: Supplier;
    static shrinkMult: Supplier;
    static config: ConfigSpec;
    static init(fabric: boolean): void;
    static makeScreen(screen: Screen): Screen;
  }


  class ModelFixGeom {
    static createOrExpandSpan(listSpans: Span[], spanFacing: SpanFacing, pixelX: number, pixelY: number): void;
    static enlargeFaces(cir: CallbackInfoReturnable<BlockElement[]>): void;
    static getShrinkRatio(atlasLocation: ResourceLocation, defaultValue: number, returnValue: number): number;
  }


  class PlatStuff {
    static isModStateValid(): boolean;
  }

}

declare module 'net.mehvahdjukaar.modelfix.moonlight_configs' {
  import { Collection, List } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Component } from 'net.minecraft.network.chat';
  import { Path } from 'java.nio.file';
  import { InputStream } from 'java.io';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Enum } from 'java.lang';

  class ConfigSpec {
    static addTrackedSpec(spec: ConfigSpec): void;
    forceLoad(): void;
    get configType(): ConfigType;
    get fileName(): string;
    get fullPath(): Path;
    get id(): ResourceLocation;
    get modId(): string;
    get readableName(): Component;
    static get trackedSpecs(): Collection<ConfigSpec>;
    static getConfigSpec(configId: ResourceLocation): ConfigSpec;
    static getReadableName(name: string): string;
    hasConfigScreen(): boolean;
    isLoaded(): boolean;
    isSynced(): boolean;
    loadFromBytes(var1: InputStream): void;
    makeScreen(parent: Screen): Screen;
    makeScreen(var1: Screen, var2: ResourceLocation): Screen;
  }


  interface ConfigType extends Enum<ConfigType> {}
  class ConfigType extends Enum<ConfigType> {
    static readonly COMMON: ConfigType;
    static readonly COMMON_SYNCED: ConfigType;
    static readonly CLIENT: ConfigType;
    isSynced(): boolean;
    static valueOf(name: string): ConfigType;
    static values(): ConfigType[];
  }

}

declare module 'net.mehvahdjukaar.modelfix.moonlight_configs.ConfigSpec' {
  import { RuntimeException, Exception } from 'java.lang';
  import { ConfigSpec } from 'net.mehvahdjukaar.modelfix.moonlight_configs';

  interface ConfigLoadingException extends RuntimeException {}
  class ConfigLoadingException extends RuntimeException {
    constructor(config: ConfigSpec, cause: Exception);
  }

}

declare module 'net.mehvahdjukaar.modelfix.moonlight_configs.neoforge.ConfigBuilderImpl' {
  import { Supplier } from 'java.util.function';

  interface ValueWrapper<T = any, C = any> extends Supplier<T> {}
  class ValueWrapper<T = any, C = any> extends Supplier<T> {
    clearCache(): void;
    get (): T;
  }

}

declare module 'net.mehvahdjukaar.modelfix.moonlight_configs.neoforge' {
  import { ConfigSpec, ConfigType } from 'net.mehvahdjukaar.modelfix.moonlight_configs';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ModConfigSpec } from 'net.neoforged.neoforge.common';
  import { Runnable } from 'java.lang';
  import { List } from 'java.util';
  import { ConfigValue } from 'ModConfigSpec';
  import { ValueWrapper } from 'net.mehvahdjukaar.modelfix.moonlight_configs.neoforge.ConfigBuilderImpl';
  import { Path } from 'java.nio.file';
  import { ModConfig } from 'net.neoforged.fml.config';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ModConfigEvent } from 'net.neoforged.fml.event.config';
  import { InputStream } from 'java.io';

  interface ConfigSpecWrapper extends ConfigSpec {}
  class ConfigSpecWrapper extends ConfigSpec {
    constructor(name: ResourceLocation, spec: ModConfigSpec, type: ConfigType, onChange: Runnable, requireRestart: ConfigValue<any>[], specialValues: ValueWrapper<any, any>[]);
    forceLoad(): void;
    get fullPath(): Path;
    get modConfig(): ModConfig;
    get spec(): ModConfigSpec;
    hasConfigScreen(): boolean;
    isLoaded(): boolean;
    loadFromBytes(stream: InputStream): void;
    makeScreen(parent: Screen, background: ResourceLocation): Screen;
    makeScreen(parent: Screen): Screen;
    onConfigChange(event: ModConfigEvent): void;
    requiresGameRestart(value: ConfigValue<any>): boolean;
  }

}

declare module 'net.mehvahdjukaar.modelfix.neoforge' {
  class ModelFixForge {
    constructor();
  }

}