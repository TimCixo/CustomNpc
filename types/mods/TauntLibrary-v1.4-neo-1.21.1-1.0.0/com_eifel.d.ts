declare module 'com.eifel.cubixban.core' {
  import { FMLCommonSetupEvent, FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';

  class CubixBan {
    static readonly INSTANCE: CubixBan;
    onClientSetup(e: FMLClientSetupEvent): void;
    onCommonSetup(e: FMLCommonSetupEvent): void;
  }

}

declare module 'com.eifel.cubixban.entry' {
  import { Runnable } from 'java.lang';

  interface ComputerThread extends Runnable {}
  class ComputerThread extends Runnable {
    run(): void;
  }

}

declare module 'com.eifel.cubixban.event' {
  import { ExecutorService } from 'java.util.concurrent';
  import { LoggingIn } from 'ClientPlayerNetworkEvent';

  class ClientEvents {
    static readonly INSTANCE: ClientEvents;
    get executor(): ExecutorService;
    static onPlayerConnected(event: LoggingIn): void;
    set executor(executorService: ExecutorService);
  }

}

declare module 'com.eifel.cubixban' {
  class Info {
    static readonly INSTANCE: Info;
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static readonly MOD_VERSION: string;
  }

}

declare module 'com.eifel.cubixban.network' {
  class NetworkManager {
    static readonly INSTANCE: NetworkManager;
  }

}

declare module 'com.eifel.cubixban.util' {
  import { Random } from 'java.util';
  import { MinecraftServer } from 'net.minecraft.server';

  class UtilitiesKt {
    static get random(): Random;
    static get server(): MinecraftServer;
    static set random(random: Random);
  }

}