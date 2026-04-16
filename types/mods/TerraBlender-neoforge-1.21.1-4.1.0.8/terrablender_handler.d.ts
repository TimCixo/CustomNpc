declare module 'terrablender.handler' {
  import { ServerAboutToStartEvent } from 'net.neoforged.neoforge.event.server';

  class InitializationHandler {
    static onServerAboutToStart(event: ServerAboutToStartEvent): void;
  }

}