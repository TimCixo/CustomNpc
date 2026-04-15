declare module 'com.cwg.mod.api.network' {
  import { Minecraft } from 'net.minecraft.client';
  import { MinecraftServer } from 'net.minecraft.server';
  import { ServerPlayer } from 'net.minecraft.server.level';

  interface ClientNetworkPacketHandler<T extends NetworkPacket<T> = any> extends PacketHandler<T> {}
  class ClientNetworkPacketHandler<T extends NetworkPacket<T> = any> extends PacketHandler<T> {
    handle(var1: T, var2: Minecraft): void;
  }


  class PacketHandler<T extends NetworkPacket<T> = any> {
  }


  interface ServerNetworkPacketHandler<T extends NetworkPacket<T> = any> extends PacketHandler<T> {}
  class ServerNetworkPacketHandler<T extends NetworkPacket<T> = any> extends PacketHandler<T> {
    handle(var1: T, var2: MinecraftServer, var3: ServerPlayer): void;
  }

}

declare module 'com.cwg.mod.api.permission' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Iterable, Enum } from 'java.lang';
  import { Companion } from 'com.cwg.mod.api.permission.PermissionLevel';
  import { EnumEntries } from 'kotlin.enums';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { CommandSourceStack } from 'net.minecraft.commands';

  interface CobblemonWikiGuiPermission extends Permission {}
  class CobblemonWikiGuiPermission extends Permission {
    constructor(node: string, level: PermissionLevel);
    component2(): PermissionLevel;
    copy(node: string, level: PermissionLevel): CobblemonWikiGuiPermission;
    static copy$default(cobblemonWikiGuiPermission: CobblemonWikiGuiPermission, string: string, permissionLevel: PermissionLevel, n: number, object: any): CobblemonWikiGuiPermission;
    equals(other: any): boolean;
    get identifier(): ResourceLocation;
    get level(): PermissionLevel;
    get literal(): string;
    hashCode(): number;
    toString(): string;
  }


  class CobblemonWikiGuiPermissions {
    static readonly INSTANCE: CobblemonWikiGuiPermissions;
    all(): Iterable<Permission>;
    static get pWIKI(): Permission;
    static get pWIKI$annotations(): void;
    static get pWIKIANOTHER(): Permission;
    static get pWIKIANOTHER$annotations(): void;
    static get rELOAD(): Permission;
    static get rELOAD$annotations(): void;
  }


  class Permission {
    get identifier(): ResourceLocation;
    get level(): PermissionLevel;
    get literal(): string;
  }


  interface PermissionLevel extends Enum<PermissionLevel> {}
  class PermissionLevel extends Enum<PermissionLevel> {
    static readonly Companion: Companion;
    static readonly NONE: PermissionLevel;
    static readonly SPAWN_PROTECTION_BYPASS: PermissionLevel;
    static readonly CHEAT_COMMANDS_AND_COMMAND_BLOCKS: PermissionLevel;
    static readonly MULTIPLAYER_MANAGEMENT: PermissionLevel;
    static readonly ALL_COMMANDS: PermissionLevel;
    static get entries(): EnumEntries<PermissionLevel>;
    get numericalValue(): number;
    static valueOf(value: string): PermissionLevel;
    static values(): PermissionLevel[];
  }


  class PermissionValidator {
    hasPermission(var1: ServerPlayer, var2: Permission): boolean;
    hasPermission(player: ServerPlayer, permission: string, level: number): boolean;
    hasPermission(var1: CommandSourceStack, var2: Permission): boolean;
    hasPermission(source: CommandSourceStack, permission: string, level: number): boolean;
    initialize(): void;
  }

}

declare module 'com.cwg.mod.api.permission.PermissionLevel' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { PermissionLevel } from 'com.cwg.mod.api.permission';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    byNumericValue(value: number): PermissionLevel;
  }

}

declare module 'com.cwg.mod.api.permission.PermissionValidator' {
  import { PermissionValidator } from 'com.cwg.mod.api.permission';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { CommandSourceStack } from 'net.minecraft.commands';

  class DefaultImpls {
    static hasPermission($this: PermissionValidator, player: ServerPlayer, permission: string, level: number): boolean;
    static hasPermission($this: PermissionValidator, source: CommandSourceStack, permission: string, level: number): boolean;
  }

}

declare module 'com.cwg.mod.client' {
  import { CobblemonWikiGuiClientImplementation } from 'com.cwg.mod';

  class CobblemonWikiGuiClient {
    static readonly INSTANCE: CobblemonWikiGuiClient;
    static implementation: CobblemonWikiGuiClientImplementation;
    get implementation(): CobblemonWikiGuiClientImplementation;
    initialize(implementation: CobblemonWikiGuiClientImplementation): void;
    set implementation(cobblemonWikiGuiClientImplementation: CobblemonWikiGuiClientImplementation);
  }

}

declare module 'com.cwg.mod.client.net.data' {
  import { ClientNetworkPacketHandler } from 'com.cwg.mod.api.network';
  import { Minecraft } from 'net.minecraft.client';

  interface DataRegistrySyncPacketHandler<P = any, T extends DataRegistrySyncPacket<P, T> = any> extends ClientNetworkPacketHandler<T> {}
  class DataRegistrySyncPacketHandler<P = any, T extends DataRegistrySyncPacket<P, T> = any> extends ClientNetworkPacketHandler<T> {
    handle(packet: T, client: Minecraft): void;
  }

}

declare module 'com.cwg.mod.client.net.lang' {
  import { ClientNetworkPacketHandler } from 'com.cwg.mod.api.network';
  import { LangSyncPacket } from 'com.cwg.mod.net.messages.client.lang';
  import { Minecraft } from 'net.minecraft.client';

  interface LangSyncPacketHandler extends ClientNetworkPacketHandler<LangSyncPacket> {}
  class LangSyncPacketHandler extends ClientNetworkPacketHandler<LangSyncPacket> {
    static readonly INSTANCE: LangSyncPacketHandler;
    handle(packet: LangSyncPacket, client: Minecraft): void;
  }

}

declare module 'com.cwg.mod' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { KClass } from 'kotlin.reflect';
  import { ArgumentTypeInfo } from 'net.minecraft.commands.synchronization';
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { Template } from 'ArgumentTypeInfo';
  import { MinecraftServer } from 'net.minecraft.server';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { NetworkPacket } from 'com.cwg.mod.api.network';
  import { Iterable, Enum } from 'java.lang';
  import { List } from 'java.util';
  import { PacketRegisterInfo } from 'com.cwg.mod.net';
  import { LangSyncPacket } from 'com.cwg.mod.net.messages.client.lang';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { EnumEntries } from 'kotlin.enums';

  class CobblemonWikiGuiClientImplementation {
  }


  class CobblemonWikiGuiImplementation {
    environment(): Environment;
    get modAPI(): ModAPI;
    get networkManager(): NetworkManager;
    isModInstalled(var1: string): boolean;
    registerCommandArgument<A extends ArgumentType<any>, T extends Template<A>>(var1: ResourceLocation, var2: KClass<A>, var3: ArgumentTypeInfo<A, T>): void;
    registerPermissionValidator(): void;
    server(): MinecraftServer;
  }


  class CobblemonWikiGuiNetwork {
    static readonly INSTANCE: CobblemonWikiGuiNetwork;
    get c2sPayloads(): PacketRegisterInfo<any>[];
    get s2cPayloads(): PacketRegisterInfo<any>[];
    invoke(p0: RegistryFriendlyByteBuf): LangSyncPacket;
    sendPacket($this$sendPacket: ServerPlayer, packet: NetworkPacket<any>): void;
    sendPacketToPlayer(player: ServerPlayer, packet: NetworkPacket<any>): void;
    sendPacketToPlayers(players: Iterable<ServerPlayer>, packet: NetworkPacket<any>): void;
    sendToAllPlayers(packet: NetworkPacket<any>): void;
    sendToServer(packet: NetworkPacket<any>): void;
  }


  interface Environment extends Enum<Environment> {}
  class Environment extends Enum<Environment> {
    static readonly CLIENT: Environment;
    static readonly SERVER: Environment;
    static get entries(): EnumEntries<Environment>;
    static valueOf(value: string): Environment;
    static values(): Environment[];
  }


  interface ModAPI extends Enum<ModAPI> {}
  class ModAPI extends Enum<ModAPI> {
    static readonly FABRIC: ModAPI;
    static readonly NEOFORGE: ModAPI;
    static get entries(): EnumEntries<ModAPI>;
    static valueOf(value: string): ModAPI;
    static values(): ModAPI[];
  }


  class NetworkManager {
    sendPacketToPlayer(var1: ServerPlayer, var2: NetworkPacket<any>): void;
    sendToServer(var1: NetworkPacket<any>): void;
  }

}

declare module 'com.cwg.mod.command' {
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack, CommandBuildContext } from 'net.minecraft.commands';
  import { CommandSelection } from 'Commands';
  import { CommandContext } from 'com.mojang.brigadier.context';

  class CobblemonWikiGuiCommands {
    static readonly INSTANCE: CobblemonWikiGuiCommands;
    register(dispatcher: CommandDispatcher<CommandSourceStack>, registry: CommandBuildContext, selection: CommandSelection): void;
  }


  class CobblemonWikiGuiReloadCommand {
    static readonly INSTANCE: CobblemonWikiGuiReloadCommand;
    execute(context: CommandContext<CommandSourceStack>): number;
    register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }


  class TestCommand {
    static readonly INSTANCE: TestCommand;
    register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }

}

declare module 'com.cwg.mod.config' {
  import { Companion } from 'com.cwg.mod.config.CobblemonWikiGuiConfig';
  import { Companion as com_cwg_mod_config_cobblemonwikiguilang_Companion } from 'com.cwg.mod.config.CobblemonWikiGuiLang';
  import { Map } from 'java.util';

  class CobblemonWikiGuiConfig {
    static readonly Companion: Companion;
    get version(): string;
    set version(string: string);
  }


  class CobblemonWikiGuiLang {
    static readonly Companion: com_cwg_mod_config_cobblemonwikiguilang_Companion;
    get abilities(): string;
    get anyRequirement(): string;
    get attackDefenceRatioAttackHigher(): string;
    get attackDefenceRatioDefenceHigher(): string;
    get attackDefenceRatioEqual(): string;
    get baseFriendship(): string;
    get basestats(): string;
    get biomeAntiCondition(): string;
    get biomeCondition(): string;
    get blocksTraveled(): string;
    get catchrate(): string;
    get defeat(): string;
    get drops(): string;
    get dynamax(): string;
    get effectiveness(): string;
    get eggGroups(): string;
    get eggMoves(): string;
    get evYield(): string;
    get evolutionMoves(): string;
    get evolutions(): string;
    get formChangeMoves(): string;
    get forms(): string;
    get friendship(): string;
    get goBackClick(): string;
    get heldItem(): string;
    get immune(): string;
    get level(): string;
    get moveSet(): string;
    get moveType(): string;
    get movesbylevel(): string;
    get noDrops(): string;
    get noEvolutionFound(): string;
    get noSpawnConditionFound(): string;
    get pokeInfo(): string;
    get recoil(): string;
    get resistant(): string;
    get rightClick(): string;
    get seeCondtions(): string;
    get seeEvolutions(): string;
    get spawnbiome(): string;
    get spawntime(): string;
    get statCompare(): string;
    get statEqual(): string;
    get structureAntiCondition(): string;
    get structureCondition(): string;
    get timeRange(): string;
    get tmMoves(): string;
    get tradeAny(): string;
    get tradeSpecific(): string;
    get tutorMoves(): string;
    get type(): string;
    get useItem(): string;
    get useMove(): string;
    get weakness(): string;
    set abilities(string: string);
    set anyRequirement(string: string);
    set attackDefenceRatioAttackHigher(string: string);
    set attackDefenceRatioDefenceHigher(string: string);
    set attackDefenceRatioEqual(string: string);
    set baseFriendship(string: string);
    set basestats(string: string);
    set biomeAntiCondition(string: string);
    set biomeCondition(string: string);
    set blocksTraveled(string: string);
    set catchrate(string: string);
    set defeat(string: string);
    set drops(string: string);
    set dynamax(string: string);
    set effectiveness(string: string);
    set eggGroups(string: string);
    set eggMoves(string: string);
    set evYield(string: string);
    set evolutionMoves(string: string);
    set evolutions(string: string);
    set formChangeMoves(string: string);
    set forms(string: string);
    set friendship(string: string);
    set goBackClick(string: string);
    set heldItem(string: string);
    set immune(string: string);
    set level(string: string);
    set moveSet(string: string);
    set moveType(string: string);
    set movesbylevel(string: string);
    set noDrops(string: string);
    set noEvolutionFound(string: string);
    set noSpawnConditionFound(string: string);
    set pokeInfo(string: string);
    set recoil(string: string);
    set resistant(string: string);
    set rightClick(string: string);
    set seeCondtions(string: string);
    set seeEvolutions(string: string);
    set spawnbiome(string: string);
    set spawntime(string: string);
    set statCompare(string: string);
    set statEqual(string: string);
    set structureAntiCondition(string: string);
    set structureCondition(string: string);
    set timeRange(string: string);
    set tmMoves(string: string);
    set tradeAny(string: string);
    set tradeSpecific(string: string);
    set tutorMoves(string: string);
    set type(string: string);
    set useItem(string: string);
    set useMove(string: string);
    set weakness(string: string);
    toMap(): Map<string, string>;
  }

}

declare module 'com.cwg.mod.config.CobblemonWikiGuiConfig' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Gson } from 'com.google.gson';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get gSON(): Gson;
  }

}

declare module 'com.cwg.mod.config.CobblemonWikiGuiLang' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Gson } from 'com.google.gson';
  import { CobblemonWikiGuiLang } from 'com.cwg.mod.config';
  import { Map } from 'java.util';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    fromMap(map: Map<string, string>): CobblemonWikiGuiLang;
    get gSON(): Gson;
  }

}

declare module 'com.cwg.mod.gui' {
  import { CobblemonWikiGuiLang } from 'com.cwg.mod.config';
  import { SimpleGui } from 'eu.pb4.sgui.api.gui';
  import { FormData } from 'com.cobblemon.mod.common.pokemon';
  import { ServerPlayer } from 'net.minecraft.server.level';

  class EvolutionsGui {
    static readonly INSTANCE: EvolutionsGui;
    get lang(): CobblemonWikiGuiLang;
    open(species: FormData, player: ServerPlayer, page: number): SimpleGui;
    static open$default(evolutionsGui: EvolutionsGui, formData: FormData, serverPlayer: ServerPlayer, n: number, n2: number, object: any): SimpleGui;
  }


  class PokeWikiGui {
    static readonly INSTANCE: PokeWikiGui;
    get lang(): CobblemonWikiGuiLang;
    open(formData: FormData, playerEntity: ServerPlayer): SimpleGui;
  }


  class SpawnConditionGui {
    static readonly INSTANCE: SpawnConditionGui;
    get lang(): CobblemonWikiGuiLang;
    open(species: FormData, player: ServerPlayer, page: number): SimpleGui;
    static open$default(spawnConditionGui: SpawnConditionGui, formData: FormData, serverPlayer: ServerPlayer, n: number, n2: number, object: any): SimpleGui;
  }

}

declare module 'com.cwg.mod.helper' {
  import { GuiElement, GuiElementBuilder } from 'eu.pb4.sgui.api.elements';
  import { LineType } from 'com.cwg.mod.helper.GuiHelper';
  import { SimpleGui } from 'eu.pb4.sgui.api.gui';
  import { ItemStack } from 'net.minecraft.world.item';
  import { FormData } from 'com.cobblemon.mod.common.pokemon';

  class GuiHelper {
    static readonly INSTANCE: GuiHelper;
    createEmptyButton(stack: ItemStack): GuiElementBuilder;
    createPokemonButton(formData: FormData): GuiElementBuilder;
    get rED_PANE(): GuiElement;
    setLine(lineType: LineType, gui: SimpleGui, rowOrColumnPos: number, startIndex: number, endIndex: number, guiElement: GuiElement): void;
  }

}

declare module 'com.cwg.mod.helper.GuiHelper' {
  import { Enum } from 'java.lang';
  import { EnumEntries } from 'kotlin.enums';

  interface LineType extends Enum<LineType> {}
  class LineType extends Enum<LineType> {
    static readonly HORIZONTAL: LineType;
    static readonly VERTICAL: LineType;
    static get entries(): EnumEntries<LineType>;
    static valueOf(value: string): LineType;
    static values(): LineType[];
  }


  class WhenMappings {
    static readonly $EnumSwitchMapping$0: number[];
  }

}

declare module 'com.cwg.mod.neoforge.client' {
  import { CobblemonWikiGuiClientImplementation } from 'com.cwg.mod';

  interface CobblemonWikiGuiNeoForgeClient extends CobblemonWikiGuiClientImplementation {}
  class CobblemonWikiGuiNeoForgeClient extends CobblemonWikiGuiClientImplementation {
    static readonly INSTANCE: CobblemonWikiGuiNeoForgeClient;
    init(): void;
  }

}

declare module 'com.cwg.mod.neoforge' {
  import { CobblemonWikiGuiImplementation, ModAPI, Environment } from 'com.cwg.mod';
  import { CobblemonWikiGuiNeoForgeNetworkManager } from 'com.cwg.mod.neoforge.net';
  import { FMLCommonSetupEvent } from 'net.neoforged.fml.event.lifecycle';
  import { OnDatapackSyncEvent } from 'net.neoforged.neoforge.event';
  import { PlayerLoggedInEvent, PlayerLoggedOutEvent } from 'PlayerEvent';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { KClass } from 'kotlin.reflect';
  import { ArgumentTypeInfo } from 'net.minecraft.commands.synchronization';
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { Template } from 'ArgumentTypeInfo';
  import { MinecraftServer } from 'net.minecraft.server';

  interface CobblemonWikiGuiNeoForge extends CobblemonWikiGuiImplementation {}
  class CobblemonWikiGuiNeoForge extends CobblemonWikiGuiImplementation {
    constructor();
    environment(): Environment;
    get modAPI(): ModAPI;
    get networkManager(): CobblemonWikiGuiNeoForgeNetworkManager;
    initialize(event: FMLCommonSetupEvent): void;
    isModInstalled(id: string): boolean;
    onDatapackSync(event: OnDatapackSyncEvent): void;
    onLogin(event: PlayerLoggedInEvent): void;
    onLogout(event: PlayerLoggedOutEvent): void;
    registerCommandArgument<A extends ArgumentType<any>, T extends Template<A>>(identifier: ResourceLocation, argumentClass: KClass<A>, serializer: ArgumentTypeInfo<A, T>): void;
    registerPermissionValidator(): void;
    server(): MinecraftServer;
  }

}

declare module 'com.cwg.mod.neoforge.net' {
  import { PacketRegisterInfo } from 'com.cwg.mod.net';
  import { PayloadRegistrar } from 'net.neoforged.neoforge.network.registration';

  class NeoForgePacketInfo<T extends NetworkPacket<T> = any> {
    constructor(info: PacketRegisterInfo<T>);
    get info(): PacketRegisterInfo<T>;
    registerToClient(registrar: PayloadRegistrar): void;
    registerToServer(registrar: PayloadRegistrar): void;
  }

}

declare module 'com.cwg.mod.net.messages.client.data' {
  import { NetworkPacket } from 'com.cwg.mod.api.network';
  import { Collection, ArrayList } from 'java.util';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  interface DataRegistrySyncPacket<T = any, N extends NetworkPacket<N> = any> extends NetworkPacket<N> {}
  class DataRegistrySyncPacket<T = any, N extends NetworkPacket<N> = any> extends NetworkPacket<N> {
    constructor(registryEntries: Collection<T>);
    decodeBuffer$common(buffer: RegistryFriendlyByteBuf): void;
    decodeEntry(var1: RegistryFriendlyByteBuf): T;
    encode(buffer: RegistryFriendlyByteBuf): void;
    encodeEntry(var1: RegistryFriendlyByteBuf, var2: T): void;
    get buffer(): RegistryFriendlyByteBuf;
    get entries$common(): ArrayList<T>;
    set buffer(registryFriendlyByteBuf: RegistryFriendlyByteBuf);
    synchronizeDecoded(var1: Collection<T>): void;
  }

}

declare module 'com.cwg.mod.net.messages.client.lang' {
  import { NetworkPacket } from 'com.cwg.mod.api.network';
  import { Companion } from 'com.cwg.mod.net.messages.client.lang.LangSyncPacket';
  import { Map } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  interface LangSyncPacket extends NetworkPacket<LangSyncPacket> {}
  class LangSyncPacket extends NetworkPacket<LangSyncPacket> {
    static readonly Companion: Companion;
    constructor(langStrings: Map<string, string>);
    encode(buffer: RegistryFriendlyByteBuf): void;
    get id(): ResourceLocation;
    get langStrings(): Map<string, string>;
  }

}

declare module 'com.cwg.mod.net.messages.client.lang.LangSyncPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { LangSyncPacket } from 'com.cwg.mod.net.messages.client.lang';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): LangSyncPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'com.cwg.mod.net' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Function1 } from 'kotlin.jvm.functions';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { PacketHandler } from 'com.cwg.mod.api.network';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Type } from 'CustomPacketPayload';

  class PacketRegisterInfo<T extends NetworkPacket<T> = any> {
    constructor(id: ResourceLocation, decoder: Function1<RegistryFriendlyByteBuf, T>, handler: PacketHandler<T>, codec: StreamCodec<RegistryFriendlyByteBuf, T>);

    constructor(resourceLocation: ResourceLocation, function1: Function1, packetHandler: PacketHandler, streamCodec: StreamCodec, n: number, defaultConstructorMarker: DefaultConstructorMarker);
    get codec(): StreamCodec<RegistryFriendlyByteBuf, T>;
    get decoder(): Function1<RegistryFriendlyByteBuf, T>;
    get handler(): PacketHandler<T>;
    get id(): ResourceLocation;
    get payloadId(): Type<T>;
  }

}

declare module 'com.cwg.mod.permission' {
  import { PermissionValidator, Permission } from 'com.cwg.mod.api.permission';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { CommandSourceStack } from 'net.minecraft.commands';

  interface LaxPermissionValidator extends PermissionValidator {}
  class LaxPermissionValidator extends PermissionValidator {
    hasPermission(player: ServerPlayer, permission: Permission): boolean;
    hasPermission(source: CommandSourceStack, permission: Permission): boolean;
    hasPermission(player: ServerPlayer, permission: string, level: number): boolean;
    hasPermission(source: CommandSourceStack, permission: string, level: number): boolean;
    initialize(): void;
  }

}

declare module 'com.cwg.mod.util' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { CommandContext } from 'com.mojang.brigadier.context';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { UUID, Map, List } from 'java.util';
  import { ArgumentBuilder, LiteralArgumentBuilder } from 'com.mojang.brigadier.builder';
  import { Function1 } from 'kotlin.jvm.functions';
  import { Boolean, Runnable, Integer } from 'java.lang';
  import { LiteralCommandNode } from 'com.mojang.brigadier.tree';
  import { IntProgression } from 'kotlin.ranges';
  import { MinecraftServer } from 'net.minecraft.server';
  import { Component } from 'net.minecraft.network.chat';
  import { Permission } from 'com.cwg.mod.api.permission';

  class CobblemonBiome {
    constructor(identifier: ResourceLocation, biome: Biome);
    component1(): ResourceLocation;
    component2(): Biome;
    copy(identifier: ResourceLocation, biome: Biome): CobblemonBiome;
    static copy$default(cobblemonBiome: CobblemonBiome, resourceLocation: ResourceLocation, biome: Biome, n: number, object: any): CobblemonBiome;
    equals(other: any): boolean;
    get biome(): Biome;
    get identifier(): ResourceLocation;
    hashCode(): number;
    toString(): string;
  }


  class CommandContextExtensionsKt {
    static player($this$player: CommandContext<CommandSourceStack>, argumentName: string): ServerPlayer;
    static player$default(commandContext: CommandContext, string: string, n: number, object: any): ServerPlayer;
    static resourceLocation($this$resourceLocation: CommandContext<CommandSourceStack>, argumentName: string): ResourceLocation;
    static string($this$string: CommandContext<CommandSourceStack>, argumentName: string): string;
    static uuid($this$uuid: CommandContext<CommandSourceStack>, argumentName: string): UUID;
  }


  class CommandUtilKt {
    static alias<S>($this$alias: LiteralCommandNode<S>, alias: string): LiteralArgumentBuilder<S>;
    static appendRequirement<T extends ArgumentBuilder<CommandSourceStack, T>>($this$appendRequirement: ArgumentBuilder<CommandSourceStack, T>, requirement: Function1<CommandSourceStack, boolean>): T;
  }


  class ConstantsKt {
    static get dayCycleMap(): Map<string, IntProgression[]>;
  }


  class DistributionUtilKt {
    static ifDedicatedServer(action: Runnable): void;
    static ifServer(runnable: Runnable): void;
    static server(): MinecraftServer;
  }


  class Helper {
    static readonly INSTANCE: Helper;
  }


  class MiscUtilKt {
    static bold($this$bold: Component): Component;
    static cobblemonWikiResource(path: string): ResourceLocation;
  }


  class PermissionUtilKt {
    static permission<T extends ArgumentBuilder<CommandSourceStack, T>>($this$permission: ArgumentBuilder<CommandSourceStack, T>, permission: Permission, appendRequirement: boolean): T;
    static permission$default(argumentBuilder: ArgumentBuilder, permission: Permission, bl: boolean, n: number, object: any): ArgumentBuilder;
    static requiresWithPermission<T extends ArgumentBuilder<CommandSourceStack, T>>($this$requiresWithPermission: ArgumentBuilder<CommandSourceStack, T>, permission: Permission, predicate: Function1<CommandSourceStack, boolean>): T;
  }


  class Type {
    constructor(damageTaken: Map<string, number>);
    component1(): Map<string, number>;
    copy(damageTaken: Map<string, number>): Type;
    static copy$default(type: Type, map: Map, n: number, object: any): Type;
    equals(other: any): boolean;
    get damageTaken(): Map<string, number>;
    hashCode(): number;
    toString(): string;
  }

}