declare module 'com.telepathicgrunt.wits.commands' {
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack } from 'net.minecraft.commands';

  class WITSCommand {
    static createCommand(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }

}

declare module 'com.telepathicgrunt.wits.neoforge' {
  class WITSForge {
    constructor();
  }

}

declare module 'com.telepathicgrunt.wits' {
  class WITS {
    static readonly MODID: string;
    static init(): void;
  }

}