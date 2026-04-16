declare module 'dev.tonimatas.packetfixer.common' {
  class Config {
    static get chunkPacketData(): number;
    static get decoderSize(): number;
    static get nbtMaxSize(): number;
    static get packetSize(): number;
    static get stringSize(): number;
    static get timeout(): number;
    static get varInt21Size(): number;
    static get varIntSize(): number;
    static get varLong(): number;
    static isForceUnlimitedNbtEnabled(): boolean;
    static runProperties(): void;
  }


  class Messages {
    static get payloadMessage(): string;
  }

}

declare module 'dev.tonimatas.packetfixer.mixins.v1_20_5_fabric' {
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { Set, List } from 'java.util';
  import { ClassNode } from 'org.objectweb.asm.tree';

  class ByteBufCodecsMixin {
  }


  class ClientboundCustomPayloadPacketMixin {
  }


  class ClientboundCustomQueryPacketMixin {
  }


  class ClientboundLevelChunkPacketDataMixin {
  }


  class CompressionDecoderMixin {
  }


  class CompressionEncoderMixin {
  }


  class ConnectionMixin {
  }


  class FriendlyByteBufMixin {
  }


  interface MixinPlugin extends IMixinConfigPlugin {}
  class MixinPlugin extends IMixinConfigPlugin {
    acceptTargets(set: Set<string>, set1: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    onLoad(s: string): void;
    postApply(s: string, classNode: ClassNode, s1: string, iMixinInfo: IMixinInfo): void;
    preApply(s: string, classNode: ClassNode, s1: string, iMixinInfo: IMixinInfo): void;
    shouldApplyMixin(s: string, s1: string): boolean;
  }


  class NbtAccounterMixin {
  }


  class PayloadHelperMixin {
  }


  class ServerboundCustomPayloadPacketMixin {
  }


  class ServerboundCustomQueryPacketMixin {
  }


  class ServerCommonPacketListenerImplMixin {
  }


  class ServerConnectionListenerMixin {
  }


  class ServerGamePacketListenerImplMixin {
  }


  class ServerLoginPacketListenerImplMixin {
  }


  class Varint21FrameDecoderMixin {
  }


  class Varint21LengthFieldPrependerMixin {
  }


  class VarIntMixin {
  }


  class VarLongMixin {
  }

}

declare module 'dev.tonimatas.packetfixer.mixins.v1_20_5_neoforge' {
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { Set, List } from 'java.util';
  import { ClassNode } from 'org.objectweb.asm.tree';

  class ByteBufCodecsMixin {
  }


  class ClientboundCustomPayloadPacketMixin {
  }


  class ClientboundCustomQueryPacketMixin {
  }


  class ClientboundLevelChunkPacketDataMixin {
  }


  class CompressionDecoderMixin {
  }


  class CompressionEncoderMixin {
  }


  class ConnectionMixin {
  }


  class FriendlyByteBufMixin {
  }


  interface MixinPlugin extends IMixinConfigPlugin {}
  class MixinPlugin extends IMixinConfigPlugin {
    acceptTargets(set: Set<string>, set1: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    onLoad(s: string): void;
    postApply(s: string, classNode: ClassNode, s1: string, iMixinInfo: IMixinInfo): void;
    preApply(s: string, classNode: ClassNode, s1: string, iMixinInfo: IMixinInfo): void;
    shouldApplyMixin(s: string, s1: string): boolean;
  }


  class NbtAccounterMixin {
  }


  class ServerboundCustomPayloadPacketMixin {
  }


  class ServerboundCustomQueryPacketMixin {
  }


  class ServerCommonPacketListenerImplMixin {
  }


  class ServerGamePacketListenerImplMixin {
  }


  class ServerLoginPacketListenerImplMixin {
  }


  class Varint21FrameDecoderMixin {
  }


  class Varint21LengthFieldPrependerMixin {
  }


  class VarIntMixin {
  }


  class VarLongMixin {
  }

}

declare module 'dev.tonimatas.packetfixer' {
  class NeoPacketFixerMod {
  }

}