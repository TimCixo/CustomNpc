declare module 'com.connectivity.command' {
  import { CommandContext } from 'com.mojang.brigadier.context';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { LiteralArgumentBuilder, RequiredArgumentBuilder } from 'com.mojang.brigadier.builder';
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { ICommandCallbackBuilder } from 'com.connectivity.command.IMCCommand';
  import { Player } from 'net.minecraft.world.entity.player';

  interface CommandNetworkStatsClientFake extends IMCOPCommand {}
  class CommandNetworkStatsClientFake extends IMCOPCommand {
    static readonly NETWORKSTATS_CLIENT_FAKE_COMMAND: string;
    build(): LiteralArgumentBuilder<CommandSourceStack>;
    get name(): string;
    onExecute(context: CommandContext<CommandSourceStack>): number;
  }


  interface CommandNetworkStatsPlayers extends IMCOPCommand {}
  class CommandNetworkStatsPlayers extends IMCOPCommand {
    static readonly NETWORKSTATS_PLAYER_SUMMARY_COMMAND: string;
    build(): LiteralArgumentBuilder<CommandSourceStack>;
    get name(): string;
    onExecute(context: CommandContext<CommandSourceStack>): number;
  }


  interface CommandNetworkStatsPrintPacket extends IMCOPCommand {}
  class CommandNetworkStatsPrintPacket extends IMCOPCommand {
    static readonly NETWORKSTATS_PRINT_PACKET_COMMAND: string;
    build(): LiteralArgumentBuilder<CommandSourceStack>;
    get name(): string;
    onExecute(context: CommandContext<CommandSourceStack>): number;
  }


  interface CommandNetworkStatsSinglePlayer extends IMCOPCommand {}
  class CommandNetworkStatsSinglePlayer extends IMCOPCommand {
    static readonly NETWORKSTATS_SINGLE_PLAYER_COMMAND: string;
    build(): LiteralArgumentBuilder<CommandSourceStack>;
    get name(): string;
    onExecute(context: CommandContext<CommandSourceStack>): number;
  }


  interface CommandNetworkStatsTotal extends IMCOPCommand {}
  class CommandNetworkStatsTotal extends IMCOPCommand {
    static readonly NETWORKSTATS_SUMMARY_COMMAND: string;
    build(): LiteralArgumentBuilder<CommandSourceStack>;
    get name(): string;
    onExecute(context: CommandContext<CommandSourceStack>): number;
  }


  class IMCCommand {
    static readonly OP_PERM_LEVEL: number;
    build(): LiteralArgumentBuilder<CommandSourceStack>;
    checkPreCondition(context: CommandContext<CommandSourceStack>): boolean;
    checkPreConditionAndExecute(context: CommandContext<CommandSourceStack>): number;
    executePreConditionCheck(): ICommandCallbackBuilder<CommandSourceStack>;
    get name(): string;
    static isPlayerOped(player: Player): boolean;
    static newArgument<T>(name: string, type: ArgumentType<T>): RequiredArgumentBuilder<CommandSourceStack, T>;
    static newLiteral(name: string): LiteralArgumentBuilder<CommandSourceStack>;
    onExecute(var1: CommandContext<CommandSourceStack>): number;
  }


  interface IMCOPCommand extends IMCCommand {}
  class IMCOPCommand extends IMCCommand {
    checkPreCondition(context: CommandContext<CommandSourceStack>): boolean;
  }

}

declare module 'com.connectivity.command.IMCCommand' {
  import { Command } from 'com.mojang.brigadier';
  import { CommandSourceStack } from 'net.minecraft.commands';

  class ICommandCallbackBuilder<S = any> {
    then(var1: Command<CommandSourceStack>): Command<S>;
  }

}

declare module 'com.connectivity.config' {
  import { ICommonConfig } from 'com.cupboard.config';
  import { Set } from 'java.util';
  import { JsonObject } from 'com.google.gson';
  import { DecimalFormat } from 'java.text';

  interface CommonConfiguration extends ICommonConfig {}
  class CommonConfiguration extends ICommonConfig {
    disableLoginLimits: boolean;
    disablePacketLimits: boolean;
    debugPrintMessages: boolean;
    showFullResourceLocationException: boolean;
    disableChatVerificationDisconnect: boolean;
    logintimeout: number;
    packetHistoryMinutes: number;
    disconnectTimeout: number;
    proxyWhitelist: Set;
    enableMalformedTrafficDetection: boolean;
    deserialize(data: JsonObject): void;
    serialize(): JsonObject;
  }


  class ConfigValues {
    static readonly PERCENT_FORMAT: DecimalFormat;
  }

}

declare module 'com.connectivity' {
  import { Logger } from 'org.apache.logging.log4j';
  import { CupboardConfig } from 'com.cupboard.config';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';
  import { FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';
  import { RegisterCommandsEvent } from 'net.neoforged.neoforge.event';

  class Connectivity {
    static readonly MODID: string;
    static readonly LOGGER: Logger;
    static config: CupboardConfig;
    constructor(modEventBus: IEventBus, modContainer: ModContainer);
    clientSetup(event: FMLClientSetupEvent): void;
    onCommandsRegister(event: RegisterCommandsEvent): void;
  }

}

declare module 'com.connectivity.event' {
  import { Post } from 'ClientTickEvent';
  import { Post as servertickevent_Post } from 'ServerTickEvent';

  class ClientEventHandler {
    static on(command: string): void;
    static onClientTick(event: Post): void;
  }


  class EventHandler {
    static onServerTick(event: servertickevent_Post): void;
  }

}

declare module 'com.connectivity.logging' {
  import { JsonSerializer, JsonElement, JsonSerializationContext, JsonDeserializer, JsonDeserializationContext, TypeAdapterFactory, TypeAdapter, Gson, FieldAttributes } from 'com.google.gson';
  import { BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { Type } from 'java.lang.reflect';
  import { ByteBuf } from 'io.netty.buffer';
  import { EntityType } from 'net.minecraft.world.entity';
  import { TypeToken } from 'com.google.gson.reflect';
  import { JsonWriter, JsonReader } from 'com.google.gson.stream';
  import { Optional } from 'java.util';
  import { Reference } from 'Holder';
  import { Iterable, Class } from 'java.lang';
  import { Recipe } from 'net.minecraft.world.item.crafting';

  interface BlockEntityTypeHandler extends JsonSerializer<BlockEntityType> {}
  class BlockEntityTypeHandler extends JsonSerializer<BlockEntityType> {
    serialize(src: BlockEntityType, typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }


  interface ByteArraySerializer extends JsonSerializer<number[]> {}
  class ByteArraySerializer extends JsonSerializer<number[]> {
    serialize(src: number[], typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }


  interface ByteBufferTypeHandler<T = any> extends JsonSerializer<ByteBuf>, JsonDeserializer<ByteBuf> {}
  class ByteBufferTypeHandler<T = any> extends JsonSerializer<ByteBuf> {
    static calculateEntropy(input: string): number;
    deserialize(json: JsonElement, typeOfT: Type, context: JsonDeserializationContext): ByteBuf;
    serialize(src: ByteBuf, typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }


  interface DoubleArraySerializer extends JsonSerializer<number[]> {}
  class DoubleArraySerializer extends JsonSerializer<number[]> {
    serialize(src: number[], typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }


  interface EntityTypeHandler<T = any> extends JsonSerializer<EntityType>, JsonDeserializer<EntityType> {}
  class EntityTypeHandler<T = any> extends JsonSerializer<EntityType> {
    deserialize(json: JsonElement, typeOfT: Type, context: JsonDeserializationContext): EntityType;
    serialize(src: EntityType, typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }


  interface FloatArraySerializer extends JsonSerializer<number[]> {}
  class FloatArraySerializer extends JsonSerializer<number[]> {
    serialize(src: number[], typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }


  interface GsonErrorHandling extends TypeAdapterFactory {}
  class GsonErrorHandling extends TypeAdapterFactory {
    static countOccurrences(input: string, target: string): number;
    create<T>(gson: Gson, type: TypeToken<T>, out: JsonWriter, value: T, inParameter: JsonReader): TypeAdapter<T>;
  }


  interface GsonOptionalTypeHandler<T = any> extends JsonSerializer<Optional>, JsonDeserializer<Optional> {}
  class GsonOptionalTypeHandler<T = any> extends JsonSerializer<Optional> {
    deserialize(json: JsonElement, typeOfT: Type, context: JsonDeserializationContext): Optional<T>;
    serialize(src: Optional<T>, typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }


  interface HolderReferenceTypeHandler<T = any> extends JsonSerializer<Reference>, JsonDeserializer<Reference> {}
  class HolderReferenceTypeHandler<T = any> extends JsonSerializer<Reference> {
    deserialize(json: JsonElement, typeOfT: Type, context: JsonDeserializationContext): Reference;
    serialize(src: Reference, typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }


  interface IntArraySerializer extends JsonSerializer<number[]> {}
  class IntArraySerializer extends JsonSerializer<number[]> {
    serialize(src: number[], typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }


  interface IterableTypeHandler<T = any> extends JsonSerializer<Iterable>, JsonDeserializer<Iterable> {}
  class IterableTypeHandler<T = any> extends JsonSerializer<Iterable> {
    deserialize(json: JsonElement, typeOfT: Type, context: JsonDeserializationContext): Iterable;
    serialize(src: Iterable, typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }


  interface LongArraySerializer extends JsonSerializer<number[]> {}
  class LongArraySerializer extends JsonSerializer<number[]> {
    serialize(src: number[], typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }


  class PacketLogging {
    static get gson(): Gson;
    static logPacket(packet: any): void;
    static logPacket(packet: any, warning: string): void;
    shouldSkipClass(clazz: Class<any>): boolean;
    shouldSkipField(f: FieldAttributes): boolean;
  }


  interface RecipeTypeHandler extends JsonSerializer<Recipe> {}
  class RecipeTypeHandler extends JsonSerializer<Recipe> {
    serialize(src: Recipe, typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }

}

declare module 'com.connectivity.mixin' {
  import { ChunkAccess, UpgradeData, LevelChunkSection } from 'net.minecraft.world.level.chunk';
  import { ChunkPos, LevelHeightAccessor } from 'net.minecraft.world.level';
  import { Registry } from 'net.minecraft.core';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { BlendingData } from 'net.minecraft.world.level.levelgen.blending';
  import { ByteToMessageDecoder } from 'io.netty.handler.codec';
  import { Component } from 'net.minecraft.network.chat';
  import { ChannelHandlerContext } from 'io.netty.channel';
  import { Throwable } from 'java.lang';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { Set, List } from 'java.util';
  import { ClassNode } from 'org.objectweb.asm.tree';
  import { IModifyAbleNbtAccounter } from 'com.connectivity.networkstats';
  import { Connection } from 'net.minecraft.network';

  class AdvancedPacketErrorLogging {
  }


  interface ChunkSectionReadSkipMixin extends ChunkAccess {}
  class ChunkSectionReadSkipMixin extends ChunkAccess {
    constructor(p_187621_: ChunkPos, p_187622_: UpgradeData, p_187623_: LevelHeightAccessor, p_187624_: Registry<Biome>, p_187625_: number, p_187626_: LevelChunkSection[], p_187627_: BlendingData);
  }


  class ClientBoundCustomPayloadPacketLMixin {
  }


  class ClientboundCustomQueryPacketMixin {
  }


  class ClientBoundLevelChunkPacketDataLimitMixin {
  }


  class ClientPacketListenerMixin {
  }


  interface CompressionDecoderMixin extends ByteToMessageDecoder {}
  class CompressionDecoderMixin extends ByteToMessageDecoder {
  }


  class CompressionEncoderMixin {
  }


  class ConnectionMixin {
    disconnect(var1: Component): void;
    on(context: ChannelHandlerContext, throwable: Throwable, ci: CallbackInfo): void;
  }


  class ConnectionTimeoutMixin {
  }


  class FriendlyByteBufLimitMixin {
  }


  interface MixinConfig extends IMixinConfigPlugin {}
  class MixinConfig extends IMixinConfigPlugin {
    acceptTargets(myTargets: Set<string>, otherTargets: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    onLoad(mixinPackage: string): void;
    postApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    preApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    shouldApplyMixin(targetClassName: string, mixinClassName: string): boolean;
  }


  interface NbtAccounterMixin extends IModifyAbleNbtAccounter {}
  class NbtAccounterMixin extends IModifyAbleNbtAccounter {
    quota: number;
    get originalQuota(): number;
    setQuota(newQuota: number): void;
  }


  class NetworkSystemMixin {
  }


  class PacketDecoderMixin<T extends PacketListener = any> {
  }


  class PacketEncoderMixin {
  }


  class PacketUtilsMixin {
  }


  class ResourceLocationExceptionMixin {
  }


  class ServerboundCustomQueryAnswerPacketMixin {
  }


  class ServerLoginNetHandlerMixin {
    loginTimeout(old: number): number;
  }


  class ServerPlayNetHandlerMixin {
    connection: Connection;
    playTimeout(old: number): number;
  }

}

declare module 'com.connectivity.mixin.malformedtraffic' {
  import { ChannelHandlerContext } from 'io.netty.channel';
  import { Throwable } from 'java.lang';

  class ChannelHandler {
    channelActive(ctx: ChannelHandlerContext): void;
    channelInactive(ctx: ChannelHandlerContext): void;
    channelRead(ctx: ChannelHandlerContext, msg: any): void;
    exceptionCaught(ctx: ChannelHandlerContext, cause: Throwable): void;
  }


  class PlayerLoginHook {
  }

}

declare module 'com.connectivity.mixin.networkstats' {
  import { INamedPacket } from 'com.connectivity.networkstats';
  import { PacketType } from 'net.minecraft.network.protocol';
  import { ServerboundCustomQueryAnswerPacket, ClientboundCustomQueryPacket } from 'net.minecraft.network.protocol.login';
  import { ServerboundCustomPayloadPacket, ClientboundCustomPayloadPacket } from 'net.minecraft.network.protocol.common';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { CustomQueryPayload } from 'net.minecraft.network.protocol.login.custom';

  interface BundlePacketNameMixin extends INamedPacket {}
  class BundlePacketNameMixin extends INamedPacket {
    get name(): string;
    set name(name: string);
    type(): PacketType<any>;
  }


  interface CCustomPayloadLoginPacketNameMixin extends INamedPacket {}
  class CCustomPayloadLoginPacketNameMixin extends INamedPacket {
    get name(): string;
    set name(name: string);
    type(): PacketType<ServerboundCustomQueryAnswerPacket>;
  }


  interface CCustomPayloadPacketNameMixin extends INamedPacket {}
  class CCustomPayloadPacketNameMixin extends INamedPacket {
    get name(): string;
    payload(): CustomPacketPayload;
    set name(name: string);
    type(): PacketType<ServerboundCustomPayloadPacket>;
  }


  class NettyPacketEncoderMixin {
  }


  interface SCustomPayloadLoginPacketNameMixin extends INamedPacket {}
  class SCustomPayloadLoginPacketNameMixin extends INamedPacket {
    get name(): string;
    payload(): CustomQueryPayload;
    set name(name: string);
    type(): PacketType<ClientboundCustomQueryPacket>;
  }


  interface SCustomPayloadPlayPacketNameMixin extends INamedPacket {}
  class SCustomPayloadPlayPacketNameMixin extends INamedPacket {
    get name(): string;
    payload(): CustomPacketPayload;
    set name(name: string);
    type(): PacketType<ClientboundCustomPayloadPacket>;
  }

}

declare module 'com.connectivity.networkstats' {
  import { AtomicInteger } from 'java.util.concurrent.atomic';
  import { AttributeKey } from 'io.netty.util';
  import { ChannelHandlerContext, Channel } from 'io.netty.channel';
  import { Packet } from 'net.minecraft.network.protocol';
  import { PlayerPacketDataEntry, PacketData } from 'com.connectivity.networkstats.NetworkStatGatherer';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { List } from 'java.util';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { Player } from 'net.minecraft.world.entity.player';

  class IModifyAbleNbtAccounter {
    get originalQuota(): number;
    setQuota(var1: number): void;
  }


  class INamedPacket {
    get name(): string;
    set name(var1: string);
  }


  class MalformedTrafficTracker {
    static readonly ACTIVE_CHANNELS: AtomicInteger;
    static readonly FROZEN: AttributeKey;
    static freezeChannel(ctx: ChannelHandlerContext, secondsTimeout: number): void;
    static freezeTimeoutSeconds(): number;
    static isBlocked(ctx: ChannelHandlerContext): boolean;
    static onLogin(channel: Channel): void;
    static recordError(ctx: ChannelHandlerContext): void;
    static removedBlocked(identifier: string): void;
  }


  class NetworkStatGatherer {
    static add(remoteAddress: string, packet: Packet, packetSize: number): void;
    static getDataByPacket(minutes: number): PacketData[];
    static getDataForPlayer(playerEntity: ServerPlayer, minutes: number): PlayerPacketDataEntry;
    static printPacketsFittingName(source: CommandSourceStack, name: string): void;
    static reportAllPlayerSummary(source: CommandSourceStack, minutes: number, startIndex: number): void;
    static reportClientStatsSummary(playerEntity: Player, minutes: number, startIndex: number): void;
    static reportPlayerSummary(source: CommandSourceStack, playerEntity: ServerPlayer, minutes: number, startIndex: number): void;
    static reportStatsSummary(source: CommandSourceStack, minutes: number, startIndex: number): void;
    static saveData(): void;
  }

}