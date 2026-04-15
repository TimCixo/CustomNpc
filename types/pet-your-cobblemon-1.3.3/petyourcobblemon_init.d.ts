declare module 'petyourcobblemon.init' {
  import { KeyMapping } from 'net.minecraft.client';
  import { RegisterKeyMappingsEvent } from 'net.neoforged.neoforge.client.event';

  class PetyourcobblemonModKeyMappings {
    static readonly TOGGLEINTERACTMODE: KeyMapping;
    static registerKeyMappings(event: RegisterKeyMappingsEvent): void;
  }

}

declare module 'petyourcobblemon.init.PetyourcobblemonModKeyMappings' {
  import { Post } from 'ClientTickEvent';

  class KeyEventListener {
    static onClientTick(event: Post): void;
  }

}