declare module 'com.craftix.medievalend' {
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';

  class MainEntrypointNeoforge {
    static readonly MODID: string;
    constructor(modEventBus: IEventBus, modContainer: ModContainer);
  }

}

declare module 'com.craftix.medievalend.shared.mixin' {
  class JigsawStructureMix {
  }


  class ServerPlayerMix {
  }

}