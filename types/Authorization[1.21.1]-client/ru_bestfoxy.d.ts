declare module 'ru.bestfoxy.authorization.common' {
  import { OperatingSystemMXBean } from 'com.sun.management';
  import { OS } from 'ru.bestfoxy.authorization.common.JVMHelper';

  class JVMHelper {
    static readonly OPERATING_SYSTEM_MXBEAN: OperatingSystemMXBean;
    static readonly OS_TYPE: OS;
    static readonly OS_ARCH: string;
    static readonly OS_BITS: number;
  }

}

declare module 'ru.bestfoxy.authorization.common.JVMHelper' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface OS extends Enum<OS> {}
  class OS extends Enum<OS> {
    static readonly WINDOWS: OS;
    static readonly LINUX: OS;
    static readonly MAC_OS_X: OS;
    get libraryEndPoint(): string;
    static getByName(name: string): OS;
    static valueOf(name: string): OS;
    static values(): OS[];
  }

}

declare module 'ru.bestfoxy.authorization' {
  import { Logger } from 'org.apache.logging.log4j';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';
  import { FMLCommonSetupEvent } from 'net.neoforged.fml.event.lifecycle';

  class Core {
    static instance: Core;
    static readonly LOGGER: Logger;
    constructor(modEventBus: IEventBus, modContainer: ModContainer);
    onCommonSetup(event: FMLCommonSetupEvent): void;
  }


  class References {
    static readonly MOD_ID: string;
  }

}

declare module 'ru.bestfoxy.authorization.mixins' {
  class MixinMain {
  }


  class MixinServerboundHelloPacket {
  }

}

declare module 'ru.bestfoxy' {
  class AuthorizationServer {
    static get instance(): AuthorizationServer;
    isPlayingFromMobile(name: string): boolean;
  }

}