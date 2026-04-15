declare module 'com.eifel.mfx.event' {
  import { PlayerLoggedInEvent } from 'PlayerEvent';

  class MFXSystemListener {
    onLogin(event: PlayerLoggedInEvent): void;
  }

}

declare module 'com.eifel.mfx' {
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';
  import { FMLCommonSetupEvent } from 'net.neoforged.fml.event.lifecycle';
  import { ModConfigSpec } from 'net.neoforged.neoforge.common';

  class MFX {
    static instance: MFX;
    static readonly MOD_ID: string;
    constructor(modEventBus: IEventBus, modContainer: ModContainer);
    onCommonSetup(ev: FMLCommonSetupEvent): void;
  }


  class MFXConfig {
    static readonly CONFIG: MFXConfig;
    static readonly CONFIG_SPEC: ModConfigSpec;
    static reload(): void;
  }

}