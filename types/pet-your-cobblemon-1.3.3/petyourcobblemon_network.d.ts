declare module 'petyourcobblemon.network' {
  import { DeferredRegister } from 'net.neoforged.neoforge.registries';
  import { Supplier } from 'java.util.function';
  import { FMLCommonSetupEvent } from 'net.neoforged.fml.event.lifecycle';

  class PetyourcobblemonModVariables {
    static readonly ATTACHMENT_TYPES: DeferredRegister;
    static readonly PLAYER_VARIABLES: Supplier;
    static init(event: FMLCommonSetupEvent): void;
  }

}

declare module 'petyourcobblemon.network.PetyourcobblemonModVariables' {
  import { INBTSerializable } from 'net.neoforged.neoforge.common.util';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { Entity } from 'net.minecraft.world.entity';
  import { PlayerLoggedInEvent, PlayerRespawnEvent, PlayerChangedDimensionEvent, Clone } from 'PlayerEvent';

  interface PlayerVariables extends INBTSerializable<CompoundTag> {}
  class PlayerVariables extends INBTSerializable<CompoundTag> {
    isInteractionmode: boolean;
    deserializeNBT(lookupProvider: Provider, nbt: CompoundTag): void;
    serializeNBT(lookupProvider: Provider): CompoundTag;
    syncPlayerVariables(entity: Entity): void;
  }


  class EventBusVariableHandlers {
    static clonePlayer(event: Clone): void;
    static onPlayerChangedDimensionSyncPlayerVariables(event: PlayerChangedDimensionEvent): void;
    static onPlayerLoggedInSyncPlayerVariables(event: PlayerLoggedInEvent): void;
    static onPlayerRespawnedSyncPlayerVariables(event: PlayerRespawnEvent): void;
  }

}