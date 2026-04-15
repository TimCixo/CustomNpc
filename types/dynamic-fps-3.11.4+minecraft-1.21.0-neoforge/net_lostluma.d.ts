declare module 'net.lostluma.dynamic_fps.impl.neoforge' {
  import { IEventBus } from 'net.neoforged.bus.api';
  import { Pre } from 'RenderGuiEvent';
  import { RegisterKeyMappingsEvent } from 'net.neoforged.neoforge.client.event';

  class DynamicFPSNeoForgeMod {
    constructor(modEventBus: IEventBus);
    registerKeyMappings(event: RegisterKeyMappingsEvent): void;
    renderGuiOverlay(event: Pre): void;
  }

}

declare module 'net.lostluma.dynamic_fps.impl.neoforge.service' {
  import { ModCompat, Platform } from 'dynamic_fps.impl.service';
  import { Path } from 'java.nio.file';
  import { Optional } from 'java.util';
  import { Version } from 'dynamic_fps.impl.util';
  import { StartTickEvent } from 'dynamic_fps.impl.service.Platform';

  interface NeoForgeModCompat extends ModCompat {}
  class NeoForgeModCompat extends ModCompat {
    disableOverlayOptimization(): boolean;
    isDisabled(): boolean;
  }


  interface NeoForgePlatform extends Platform {}
  class NeoForgePlatform extends Platform {
    get cacheDir(): Path;
    get configDir(): Path;
    get name(): string;
    getModVersion(modId: string): Optional<Version>;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(modId: string): boolean;
    registerStartTickEvent(event: StartTickEvent): void;
  }

}