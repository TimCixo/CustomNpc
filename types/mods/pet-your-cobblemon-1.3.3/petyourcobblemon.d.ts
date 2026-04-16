declare module 'petyourcobblemon' {
  import { Logger } from 'org.apache.logging.log4j';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { IPayloadHandler } from 'net.neoforged.neoforge.network.handling';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { Runnable } from 'java.lang';
  import { Post } from 'ServerTickEvent';

  class PetyourcobblemonMod {
    static readonly LOGGER: Logger;
    static readonly MODID: string;
    constructor(modEventBus: IEventBus);
    static addNetworkMessage<T extends CustomPacketPayload>(id: Type<T>, reader: StreamCodec<FriendlyByteBuf, T>, handler: IPayloadHandler<T>): void;
    static queueServerWork(tick: number, action: Runnable): void;
    tick(event: Post): void;
  }

}