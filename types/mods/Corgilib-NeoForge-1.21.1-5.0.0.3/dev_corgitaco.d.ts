declare module 'dev.corgitaco.corgilib.neoforge' {
  import { IEventBus } from 'net.neoforged.bus.api';

  class CorgiLibNeoForge {
    constructor(modEventBus: IEventBus);
  }

}

declare module 'dev.corgitaco.corgilib.neoforge.datagen' {
  class NeoForgeDatagen {
  }

}

declare module 'dev.corgitaco.corgilib.neoforge.network' {
  import { RegisterPayloadHandlersEvent } from 'net.neoforged.neoforge.network.event';

  class NeoForgeNetworkHandler {
    static register(event: RegisterPayloadHandlersEvent): void;
  }

}

declare module 'dev.corgitaco.corgilib.neoforge.platform' {
  import { ModPlatform, PlatformNetwork } from 'corgitaco.corgilib.platform';
  import { List, Map, Collection } from 'java.util';
  import { Path } from 'java.nio.file';
  import { Supplier } from 'java.util.function';
  import { Registry } from 'net.minecraft.core';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Codec } from 'com.mojang.serialization';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Packet } from 'corgitaco.corgilib.network';

  interface NeoForgePlatform extends ModPlatform {}
  class NeoForgePlatform extends ModPlatform {
    static readonly NEW_REGISTRIES: List;
    static readonly CACHED: Map;
    static readonly DATAPACK_REGISTRIES: List;
    configDir(): Path;
    createSimpleBuiltin<T>(registryKey: ResourceKey<Registry<T>>): Supplier<Registry<T>>;
    get modIDS(): Collection<string>;
    get platformName(): string;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(modId: string): boolean;
    register<T>(registry: Registry<T>, location: string, value: Supplier<T>): Supplier<T>;
    registerDatapackRegistry<T>(key: ResourceKey<Registry<T>>, codec: Supplier<Codec<T>>): void;
  }


  interface NeoForgePlatformNetwork extends PlatformNetwork {}
  class NeoForgePlatformNetwork extends PlatformNetwork {
    sendToClient<P extends Packet>(player: ServerPlayer, packet: P): void;
    sendToServer<P extends Packet>(packet: P): void;
  }

}