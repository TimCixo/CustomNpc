declare module 'petyourcobblemon.command' {
  import { RegisterCommandsEvent } from 'net.neoforged.neoforge.event';

  class InteractionmodeCommand {
    static registerCommand(event: RegisterCommandsEvent): void;
  }

}