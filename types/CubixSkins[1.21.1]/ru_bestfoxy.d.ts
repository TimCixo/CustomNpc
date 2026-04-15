declare module 'ru.bestfoxy.cubixskins.client.resource' {
  import { MinecraftProfileTextures } from 'com.mojang.authlib.minecraft';
  import { GameProfile } from 'com.mojang.authlib';

  class SkinManagerCustom {
    static getTextures(gameProfile: GameProfile): MinecraftProfileTextures;
  }

}

declare module 'ru.bestfoxy.cubixskins' {
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';
  import { FMLCommonSetupEvent } from 'net.neoforged.fml.event.lifecycle';

  class Core {
    static instance: Core;
    constructor(modEventBus: IEventBus, modContainer: ModContainer);
    onCommonSetup(event: FMLCommonSetupEvent): void;
  }


  class References {
    static readonly MOD_ID: string;
  }

}

declare module 'ru.bestfoxy.cubixskins.mixins' {
  class MixinSkinManager {
  }

}