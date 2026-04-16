declare module 'de.keksuccino.melody' {
  class Melody {
    static readonly VERSION: string;
    static readonly MOD_LOADER: string;
    static readonly MOD_ID: string;
    static init(): void;
  }


  class MelodyNeoForge {
    constructor();
  }

}

declare module 'de.keksuccino.melody.mixin' {
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { Set, List } from 'java.util';
  import { ClassNode } from 'org.objectweb.asm.tree';

  interface MelodyMixinPlugin extends IMixinConfigPlugin {}
  class MelodyMixinPlugin extends IMixinConfigPlugin {
    acceptTargets(myTargets: Set<string>, otherTargets: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    onLoad(mixinPackage: string): void;
    postApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    preApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    shouldApplyMixin(targetClassName: string, mixinClassName: string): boolean;
  }

}

declare module 'de.keksuccino.melody.mixin.mixins.common.client' {
  import { SoundEngine } from 'net.minecraft.client.sounds';

  class IMixinSoundEngine {
    get loadedMelody(): boolean;
  }


  class IMixinSoundManager {
    get soundEngineMelody(): SoundEngine;
  }


  class MixinSoundEngine {
  }

}

declare module 'de.keksuccino.melody.platform' {
  import { IPlatformCompatibilityLayer, IPlatformHelper } from 'de.keksuccino.melody.platform.services';
  import { List } from 'java.util';
  import { Key } from 'InputConstants';
  import { KeyMapping } from 'net.minecraft.client';
  import { Class } from 'java.lang';

  interface NeoForgeCompatibilityLayer extends IPlatformCompatibilityLayer {}
  class NeoForgeCompatibilityLayer extends IPlatformCompatibilityLayer {
  }


  interface NeoForgePlatformHelper extends IPlatformHelper {}
  class NeoForgePlatformHelper extends IPlatformHelper {
    get loadedModIds(): string[];
    get loaderVersion(): string;
    get platformDisplayName(): string;
    get platformName(): string;
    getKeyMappingKey(keyMapping: KeyMapping): Key;
    getModVersion(modId: string): string;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(modId: string): boolean;
    isOnClient(): boolean;
  }


  class Services {
    static readonly PLATFORM: IPlatformHelper;
    static readonly COMPAT: IPlatformCompatibilityLayer;
    static load<T>(clazz: Class<T>): T;
  }

}

declare module 'de.keksuccino.melody.platform.services' {
  import { List } from 'java.util';
  import { Key } from 'InputConstants';
  import { KeyMapping } from 'net.minecraft.client';

  class IPlatformCompatibilityLayer {
  }


  class IPlatformHelper {
    get environmentName(): string;
    get loadedModIds(): string[];
    get loaderVersion(): string;
    get platformDisplayName(): string;
    get platformName(): string;
    getKeyMappingKey(var1: KeyMapping): Key;
    getModVersion(var1: string): string;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(var1: string): boolean;
    isOnClient(): boolean;
  }

}

declare module 'de.keksuccino.melody.resources.audio' {
  import { Closeable } from 'java.io';
  import { SoundSource } from 'net.minecraft.sounds';
  import { Exception, Float, Runnable } from 'java.lang';
  import { BiConsumer } from 'java.util.function';
  import { List } from 'java.util';
  import { CompletableFuture } from 'java.util.concurrent';
  import { ALAudioClip } from 'de.keksuccino.melody.resources.audio.openal';
  import { SourceType } from 'de.keksuccino.melody.resources.audio.SimpleAudioFactory';

  interface AudioClip extends Closeable {}
  class AudioClip extends Closeable {
    get soundChannel(): SoundSource;
    get volume(): number;
    isClosed(): boolean;
    isPaused(): boolean;
    isPlaying(): boolean;
    pause(): void;
    play(): void;
    resume(): void;
    set soundChannel(var1: SoundSource);
    set volume(var1: number);
    stop(): void;
  }


  interface MelodyAudioException extends Exception {}
  class MelodyAudioException extends Exception {
    constructor();

    constructor(msg: string);
  }


  class MinecraftSoundSettingsObserver {
    static get soundEngineReloadListeners(): Runnable[];
    static get volumeListeners(): BiConsumer<SoundSource, number>[];
    static registerSoundEngineReloadListener(listener: Runnable): number;
    static registerVolumeListener(listener: BiConsumer<SoundSource, number>): number;
    static unregisterSoundEngineReloadListener(id: number): void;
    static unregisterVolumeListener(id: number): void;
  }


  class SimpleAudioFactory {
    static ogg(audioSource: string, sourceType: SourceType): CompletableFuture<ALAudioClip>;
    static wav(audioSource: string, sourceType: SourceType): CompletableFuture<ALAudioClip>;
  }

}

declare module 'de.keksuccino.melody.resources.audio.openal' {
  import { ByteBuffer } from 'java.nio';
  import { AudioFormat } from 'javax.sound.sampled';
  import { Integer, Exception } from 'java.lang';
  import { AudioClip } from 'de.keksuccino.melody.resources.audio';
  import { SoundSource } from 'net.minecraft.sounds';
  import { InputStream } from 'java.io';

  class ALAudioBuffer {
    constructor(dataBuffer: ByteBuffer, audioFormat: AudioFormat);
    delete(): void;
    deleteQuietly(): void;
    get source(): number;
    isValidOpenAlSource(): boolean;
    prepare(): boolean;
  }


  interface ALAudioClip extends AudioClip {}
  class ALAudioClip extends AudioClip {
    close(): void;
    closeQuietly(): void;
    static create(): ALAudioClip;
    get soundChannel(): SoundSource;
    get state(): number;
    get volume(): number;
    isClosed(): boolean;
    isLooping(): boolean;
    isPaused(): boolean;
    isPlaying(): boolean;
    isStopped(): boolean;
    isValidOpenAlSource(): boolean;
    static of(completeStaticDataBuffer: ALAudioBuffer): ALAudioClip;
    pause(): void;
    play(): void;
    resume(): void;
    set soundChannel(channel: SoundSource);
    set volume(volume: number);
    setLooping(looping: boolean): void;
    setStaticBuffer(completeDataBuffer: ALAudioBuffer): void;
    stop(): void;
    tryUpdateVolume(): void;
  }


  class ALErrorHandler {
    static checkAndPrintOpenAlError(): boolean;
    static checkOpenAlError(): void;
    static get openAlError(): string;
  }


  interface ALException extends Exception {}
  class ALException extends Exception {
    constructor();

    constructor(message: string);
  }


  class ALUtils {
    static getAudioFormatAsOpenAL(audioFormat: AudioFormat): number;
    static isOpenAlReady(): boolean;
    static readStreamIntoBuffer(audioInputStream: InputStream): ByteBuffer;
  }

}

declare module 'de.keksuccino.melody.resources.audio.SimpleAudioFactory' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface SourceType extends Enum<SourceType> {}
  class SourceType extends Enum<SourceType> {
    static readonly RESOURCE_LOCATION: SourceType;
    static readonly LOCAL_FILE: SourceType;
    static readonly WEB_FILE: SourceType;
    static valueOf(name: string): SourceType;
    static values(): SourceType[];
  }

}