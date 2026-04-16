declare module 'net.doctorx.cobblemonalatia' {
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';
  import { ServerStartingEvent } from 'net.neoforged.neoforge.event.server';
  import { ConfigValue } from 'ModConfigSpec';
  import { Set } from 'java.util';

  class CobblemonAlatiasFakemonPack {
    static readonly MOD_ID: string;
    constructor(modEventBus: IEventBus, modContainer: ModContainer);
    onServerStarting(event: ServerStartingEvent): void;
  }


  class Config {
    static readonly MAGIC_NUMBER_INTRODUCTION: ConfigValue;
    static logDirtBlock: boolean;
    static magicNumber: number;
    static magicNumberIntroduction: string;
    static items: Set;
  }

}

declare module 'net.doctorx.cobblemonalatia.CobblemonAlatiasFakemonPack' {
  import { FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';

  class ClientModEvents {
    static onClientSetup(event: FMLClientSetupEvent): void;
  }

}

declare module 'net.doctorx.cobblemonalatia.item' {
  import { Items } from 'DeferredRegister';
  import { DeferredItem } from 'net.neoforged.neoforge.registries';
  import { IEventBus } from 'net.neoforged.bus.api';

  class ModItems {
    static readonly ITEMS: Items;
    static readonly GLASS_VASE: DeferredItem;
    static readonly DA_VINCI_NOTES: DeferredItem;
    static register(eventBus: IEventBus): void;
  }

}