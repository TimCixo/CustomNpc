declare module 'com.arcaryx.cobblemonintegrations.client' {
  import { List } from 'java.util';
  import { PokemonDrop, EvoItem } from 'com.arcaryx.cobblemonintegrations.data';

  class ClientCache {
    static readonly INSTANCE: ClientCache;
    static dropsCache: List;
    static evoItemsCache: List;
    filterDropsCache(): void;
    filterEvoItemsCache(): void;
    get dropsCache(): PokemonDrop[];
    get evoItemsCache(): EvoItem[];
    set dropsCache(list: PokemonDrop[]);
    set evoItemsCache(list: EvoItem[]);
  }


  class PlatformClient {
  }

}

declare module 'com.arcaryx.cobblemonintegrations.client.net.clienthandling' {
  import { PacketHandlerClient } from 'com.arcaryx.cobblemonintegrations.client.net';
  import { SyncDropsPacket, SyncEvoItemsPacket } from 'com.arcaryx.cobblemonintegrations.net.packets.client';
  import { Minecraft } from 'net.minecraft.client';

  interface SyncDropsHandler extends PacketHandlerClient<SyncDropsPacket> {}
  class SyncDropsHandler extends PacketHandlerClient<SyncDropsPacket> {
    static readonly INSTANCE: SyncDropsHandler;
    handle(packet: SyncDropsPacket, client: Minecraft): void;
  }


  interface SyncEvoItemsHandler extends PacketHandlerClient<SyncEvoItemsPacket> {}
  class SyncEvoItemsHandler extends PacketHandlerClient<SyncEvoItemsPacket> {
    static readonly INSTANCE: SyncEvoItemsHandler;
    handle(packet: SyncEvoItemsPacket, client: Minecraft): void;
  }

}

declare module 'com.arcaryx.cobblemonintegrations.client.net' {
  import { PacketHandler } from 'com.cobblemon.mod.common.api.net';
  import { Minecraft } from 'net.minecraft.client';

  interface PacketHandlerClient<T extends NetworkPacket<T> = any> extends PacketHandler<T> {}
  class PacketHandlerClient<T extends NetworkPacket<T> = any> extends PacketHandler<T> {
    handle(var1: T, var2: Minecraft): void;
  }

}

declare module 'com.arcaryx.cobblemonintegrations' {
  import { Logger } from 'org.apache.logging.log4j';
  import { Loader, Side } from 'com.arcaryx.cobblemonintegrations.util';
  import { NetworkManager } from 'com.arcaryx.cobblemonintegrations.net';
  import { MinecraftServer } from 'net.minecraft.server';

  class CobblemonIntegrations {
    static readonly INSTANCE: CobblemonIntegrations;
    static readonly MOD_ID: string;
    static platform: Platform;
    get lOGGER(): Logger;
    get platform(): Platform;
    init(): void;
    preInit(platform: Platform): void;
    set platform(platform: Platform);
  }


  class Platform {
    get loader(): Loader;
    get networkManager(): NetworkManager;
    isModInstalled(var1: string): boolean;
    server(): MinecraftServer;
    side(): Side;
  }

}

declare module 'com.arcaryx.cobblemonintegrations.config' {
  import { ConfigValue, EnumValue } from 'ModConfigSpec';
  import { ModConfigSpec } from 'net.neoforged.neoforge.common';
  import { PokedexEntryProgress } from 'com.cobblemon.mod.common.api.pokedex';
  import { PokemonHideMode } from 'com.arcaryx.cobblemonintegrations.jei';
  import { Boolean, Integer, Double } from 'java.lang';

  class CobblemonIntegrationsConfig {
    static readonly INSTANCE: CobblemonIntegrationsConfig;
    static POKEMON_TOOLTIP: ConfigValue;
    static POKEDEX_HIDE_LEVEL: EnumValue;
    static POKEMON_HIDE_MODE: EnumValue;
    static APPLY_IN_PVP: ConfigValue;
    static ALLOW_WAYSTONE_TELEPORT: ConfigValue;
    static WAYSTONES_MIN_LEVEL: ConfigValue;
    static REQUIRE_TELEPORT_MOVE: ConfigValue;
    static WILD_AFFECTS_TEMPERATURE: ConfigValue;
    static CAPTURED_AFFECTS_TEMPERATURE: ConfigValue;
    static WILD_CAUSES_HARM: ConfigValue;
    static CAPTURED_CAUSES_HARM: ConfigValue;
    static CAPTURED_CAUSES_HARM_OTHER: ConfigValue;
    static SECONDARY_TYPE_HALF_STRENGTH: ConfigValue;
    static POKEMON_GIVE_WATER: ConfigValue;
    static REQUIRE_PRIMARY_TYPE: ConfigValue;
    static FILL_BOTTLE: ConfigValue;
    static FILL_CANTEEN: ConfigValue;
    static MIN_LEVEL_FOR_DIRTY: ConfigValue;
    static MIN_LEVEL_FOR_NORMAL: ConfigValue;
    static MIN_LEVEL_FOR_PURIFIED: ConfigValue;
    static TEMPERATURE_RANGE: ConfigValue;
    static TEMPERATURE_RANGE_PER_LEVEL: ConfigValue;
    static TEMPERATURE_STRENGTH: ConfigValue;
    static TEMPERATURE_STRENGTH_PER_LEVEL: ConfigValue;
    get aLLOW_WAYSTONE_TELEPORT(): ConfigValue<boolean>;
    get aPPLY_IN_PVP(): ConfigValue<boolean>;
    get cAPTURED_AFFECTS_TEMPERATURE(): ConfigValue<boolean>;
    get cAPTURED_CAUSES_HARM(): ConfigValue<boolean>;
    get cAPTURED_CAUSES_HARM_OTHER(): ConfigValue<boolean>;
    get fILL_BOTTLE(): ConfigValue<boolean>;
    get fILL_CANTEEN(): ConfigValue<boolean>;
    get mIN_LEVEL_FOR_DIRTY(): ConfigValue<number>;
    get mIN_LEVEL_FOR_NORMAL(): ConfigValue<number>;
    get mIN_LEVEL_FOR_PURIFIED(): ConfigValue<number>;
    get pOKEDEX_HIDE_LEVEL(): EnumValue<PokedexEntryProgress>;
    get pOKEMON_GIVE_WATER(): ConfigValue<boolean>;
    get pOKEMON_HIDE_MODE(): EnumValue<PokemonHideMode>;
    get pOKEMON_TOOLTIP(): ConfigValue<string>;
    get rEQUIRE_PRIMARY_TYPE(): ConfigValue<boolean>;
    get rEQUIRE_TELEPORT_MOVE(): ConfigValue<boolean>;
    get sECONDARY_TYPE_HALF_STRENGTH(): ConfigValue<boolean>;
    get sPEC(): ModConfigSpec;
    get tEMPERATURE_RANGE(): ConfigValue<number>;
    get tEMPERATURE_RANGE_PER_LEVEL(): ConfigValue<number>;
    get tEMPERATURE_STRENGTH(): ConfigValue<number>;
    get tEMPERATURE_STRENGTH_PER_LEVEL(): ConfigValue<number>;
    get wAYSTONES_MIN_LEVEL(): ConfigValue<number>;
    get wILD_AFFECTS_TEMPERATURE(): ConfigValue<boolean>;
    get wILD_CAUSES_HARM(): ConfigValue<boolean>;
    set aLLOW_WAYSTONE_TELEPORT(configValue: ConfigValue<boolean>);
    set aPPLY_IN_PVP(configValue: ConfigValue<boolean>);
    set cAPTURED_AFFECTS_TEMPERATURE(configValue: ConfigValue<boolean>);
    set cAPTURED_CAUSES_HARM(configValue: ConfigValue<boolean>);
    set cAPTURED_CAUSES_HARM_OTHER(configValue: ConfigValue<boolean>);
    set fILL_BOTTLE(configValue: ConfigValue<boolean>);
    set fILL_CANTEEN(configValue: ConfigValue<boolean>);
    set mIN_LEVEL_FOR_DIRTY(configValue: ConfigValue<number>);
    set mIN_LEVEL_FOR_NORMAL(configValue: ConfigValue<number>);
    set mIN_LEVEL_FOR_PURIFIED(configValue: ConfigValue<number>);
    set pOKEDEX_HIDE_LEVEL(enumValue: EnumValue<PokedexEntryProgress>);
    set pOKEMON_GIVE_WATER(configValue: ConfigValue<boolean>);
    set pOKEMON_HIDE_MODE(enumValue: EnumValue<PokemonHideMode>);
    set pOKEMON_TOOLTIP(configValue: ConfigValue<string>);
    set rEQUIRE_PRIMARY_TYPE(configValue: ConfigValue<boolean>);
    set rEQUIRE_TELEPORT_MOVE(configValue: ConfigValue<boolean>);
    set sECONDARY_TYPE_HALF_STRENGTH(configValue: ConfigValue<boolean>);
    set tEMPERATURE_RANGE(configValue: ConfigValue<number>);
    set tEMPERATURE_RANGE_PER_LEVEL(configValue: ConfigValue<number>);
    set tEMPERATURE_STRENGTH(configValue: ConfigValue<number>);
    set tEMPERATURE_STRENGTH_PER_LEVEL(configValue: ConfigValue<number>);
    set wAYSTONES_MIN_LEVEL(configValue: ConfigValue<number>);
    set wILD_AFFECTS_TEMPERATURE(configValue: ConfigValue<boolean>);
    set wILD_CAUSES_HARM(configValue: ConfigValue<boolean>);
  }

}

declare module 'com.arcaryx.cobblemonintegrations.data' {
  import { Encodable } from 'com.cobblemon.mod.common.api.net';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Set, List } from 'java.util';
  import { ItemInteractionEvolution } from 'com.cobblemon.mod.common.pokemon.evolution.variants';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { ItemDrop } from 'com.arcaryx.cobblemonintegrations.data.PokemonDrop';

  interface EvoItem extends Encodable {}
  class EvoItem extends Encodable {
    constructor(species: ResourceLocation, aspects: Set<string>, evolution: ItemInteractionEvolution, evolutionJson: string, evoSpecies: ResourceLocation, evoAspects: Set<string>);

    constructor(buffer: RegistryFriendlyByteBuf);
    encode(buffer: RegistryFriendlyByteBuf): void;
    fixJson(): void;
    get aspects(): Set<string>;
    get evoAspects(): Set<string>;
    get evoSpecies(): ResourceLocation;
    get evolution(): ItemInteractionEvolution;
    get species(): ResourceLocation;
    set evolution(itemInteractionEvolution: ItemInteractionEvolution);
  }


  interface PokemonDrop extends Encodable {}
  class PokemonDrop extends Encodable {
    constructor(species: ResourceLocation, form: string, itemDrops: ItemDrop[]);

    constructor(buffer: RegistryFriendlyByteBuf);
    encode(buffer: RegistryFriendlyByteBuf): void;
    get form(): string;
    get itemDrops(): ItemDrop[];
    get species(): ResourceLocation;
  }

}

declare module 'com.arcaryx.cobblemonintegrations.data.PokemonDrop' {
  import { Encodable } from 'com.cobblemon.mod.common.api.net';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IntRange } from 'kotlin.ranges';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  interface ItemDrop extends Encodable {}
  class ItemDrop extends Encodable {
    constructor(item: ResourceLocation, chance: number, range: IntRange);

    constructor(buffer: RegistryFriendlyByteBuf);
    component1(): ResourceLocation;
    component2(): number;
    component3(): IntRange;
    copy(item: ResourceLocation, chance: number, range: IntRange): ItemDrop;
    static copy$default(itemDrop: ItemDrop, resourceLocation: ResourceLocation, f: number, intRange: IntRange, n: number, object: any): ItemDrop;
    encode(buffer: RegistryFriendlyByteBuf): void;
    equals(other: any): boolean;
    get chance(): number;
    get item(): ResourceLocation;
    get range(): IntRange;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'com.arcaryx.cobblemonintegrations.enhancedcelestials' {
  import { Level } from 'net.minecraft.world.level';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { PokemonEntity } from 'com.cobblemon.mod.common.entity.pokemon';
  import { Map } from 'java.util';
  import { Stat } from 'com.cobblemon.mod.common.api.pokemon.stats';
  import { Integer } from 'java.lang';
  import { Component } from 'net.minecraft.network.chat';
  import { AppendageCondition } from 'com.cobblemon.mod.common.api.spawning.condition';
  import { SpawnablePosition } from 'com.cobblemon.mod.common.api.spawning.position';
  import { EntityQueryRequirement } from 'com.cobblemon.mod.common.api.pokemon.requirement';
  import { Companion } from 'com.arcaryx.cobblemonintegrations.enhancedcelestials.LunarEventRequirement';
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';
  import { LivingEntity } from 'net.minecraft.world.entity';

  class EnhancedCelestialsHandler {
    static readonly INSTANCE: EnhancedCelestialsHandler;
    getLunarEventName(eventLocation: ResourceLocation, level: Level): Component;
    isOngoingLunarEvent(level: Level, lunarEvent: ResourceLocation): boolean;
    modifyBattleEVs(baseChanges: Map<Stat, number>, level: Level): void;
    modifyBattleExp(baseExp: number, level: Level): number;
    modifySpawn(pokemonEntity: PokemonEntity): void;
  }


  interface LunarEventCondition extends AppendageCondition {}
  class LunarEventCondition extends AppendageCondition {
    fits(spawnablePosition: SpawnablePosition): boolean;
    get lunarEvent(): ResourceLocation;
    set lunarEvent(resourceLocation: ResourceLocation);
  }


  interface LunarEventRequirement extends EntityQueryRequirement {}
  class LunarEventRequirement extends EntityQueryRequirement {
    static readonly Companion: Companion;
    check(pokemon: Pokemon): boolean;
    check(pokemon: Pokemon, queriedEntity: LivingEntity): boolean;
    get lunarEvent(): ResourceLocation;
    set lunarEvent(resourceLocation: ResourceLocation);
  }

}

declare module 'com.arcaryx.cobblemonintegrations.enhancedcelestials.LunarEventRequirement' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get aDAPTER_VARIANT(): string;
  }

}

declare module 'com.arcaryx.cobblemonintegrations.jade' {
  import { IBlockComponentProvider, ITooltip, BlockAccessor, IWailaPlugin, IWailaCommonRegistration, IWailaClientRegistration, IServerDataProvider } from 'snownee.jade.api';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IPluginConfig } from 'snownee.jade.api.config';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface BerryProvider extends IBlockComponentProvider {}
  class BerryProvider extends IBlockComponentProvider {
    static readonly INSTANCE: BerryProvider;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get iD(): ResourceLocation;
    get uid(): ResourceLocation;
  }


  interface CobblemonIntegrationsJadePlugin extends IWailaPlugin {}
  class CobblemonIntegrationsJadePlugin extends IWailaPlugin {
    register(registration: IWailaCommonRegistration): void;
    registerClient(registration: IWailaClientRegistration): void;
  }


  interface FossilAnalyzerProvider extends IBlockComponentProvider, IServerDataProvider<BlockAccessor> {}
  class FossilAnalyzerProvider extends IBlockComponentProvider {
    static readonly INSTANCE: FossilAnalyzerProvider;
    appendServerData(data: CompoundTag, accessor: BlockAccessor): void;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get iD(): ResourceLocation;
    get uid(): ResourceLocation;
  }


  interface HealerProvider extends IBlockComponentProvider {}
  class HealerProvider extends IBlockComponentProvider {
    static readonly INSTANCE: HealerProvider;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get iD(): ResourceLocation;
    get uid(): ResourceLocation;
  }

}

declare module 'com.arcaryx.cobblemonintegrations.jei' {
  import { Map } from 'java.util';
  import { Class, Enum } from 'java.lang';
  import { Requirement } from 'com.cobblemon.mod.common.api.pokemon.requirement';
  import { Function2 } from 'kotlin.jvm.functions';
  import { ITooltipBuilder } from 'mezz.jei.api.gui.builder';
  import { Unit } from 'kotlin';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { EnumEntries } from 'kotlin.enums';

  class EvoRequirementsHelper {
    static readonly INSTANCE: EvoRequirementsHelper;
    static readonly LANG_ENTRY: string;
    anyRequirement(evoRequirement: Requirement, tooltip: ITooltipBuilder): void;
    areaRequirement(evoRequirement: Requirement, tooltip: ITooltipBuilder): void;
    attackDefenceRatioRequirement(evoRequirement: Requirement, tooltip: ITooltipBuilder): void;
    battleCriticalHitsRequirement(evoRequirement: Requirement, tooltip: ITooltipBuilder): void;
    biomeRequirement(evoRequirement: Requirement, tooltip: ITooltipBuilder): void;
    blocksTraveledRequirement(evoRequirement: Requirement, tooltip: ITooltipBuilder): void;
    damageTakenRequirement(evoRequirement: Requirement, tooltip: ITooltipBuilder): void;
    defeatRequirement(evoRequirement: Requirement, tooltip: ITooltipBuilder): void;
    friendshipRequirement(evoRequirement: Requirement, tooltip: ITooltipBuilder): void;
    get reqHandlers(): Map<Class<Requirement>, Function2<Requirement, ITooltipBuilder, Unit>>;
    heldItemRequirement(evoRequirement: Requirement, tooltip: ITooltipBuilder): void;
    invoke(p0: Requirement, p1: ITooltipBuilder): void;
    invoke(p0: Requirement, p1: ITooltipBuilder): void;
    invoke(p0: Requirement, p1: ITooltipBuilder): void;
    invoke(p0: Requirement, p1: ITooltipBuilder): void;
    invoke(p0: Requirement, p1: ITooltipBuilder): void;
    invoke(p0: Requirement, p1: ITooltipBuilder): void;
    invoke(p0: Requirement, p1: ITooltipBuilder): void;
    invoke(p0: Requirement, p1: ITooltipBuilder): void;
    invoke(p0: Requirement, p1: ITooltipBuilder): void;
    invoke(p0: Requirement, p1: ITooltipBuilder): void;
    invoke(p0: Requirement, p1: ITooltipBuilder): void;
    invoke(p0: Requirement, p1: ITooltipBuilder): void;
    invoke(p0: Requirement, p1: ITooltipBuilder): void;
    invoke(p0: Requirement, p1: ITooltipBuilder): void;
    invoke(p0: Requirement, p1: ITooltipBuilder): void;
    invoke(p0: Requirement, p1: ITooltipBuilder): void;
    invoke(p0: Requirement, p1: ITooltipBuilder): void;
    invoke(p0: Requirement, p1: ITooltipBuilder): void;
    invoke(p0: Requirement, p1: ITooltipBuilder): void;
    invoke(p0: Requirement, p1: ITooltipBuilder): void;
    invoke(p0: Requirement, p1: ITooltipBuilder): void;
    invoke(p0: Requirement, p1: ITooltipBuilder): void;
    invoke(p0: Requirement, p1: ITooltipBuilder): void;
    invoke(p0: Requirement, p1: ITooltipBuilder): void;
    levelRequirement(evoRequirement: Requirement, tooltip: ITooltipBuilder): void;
    lunarEventRequirement(evoRequirement: Requirement, tooltip: ITooltipBuilder): void;
    moonPhaseRequirement(evoRequirement: Requirement, tooltip: ITooltipBuilder): void;
    moveSetRequirement(evoRequirement: Requirement, tooltip: ITooltipBuilder): void;
    moveTypeRequirement(evoRequirement: Requirement, tooltip: ITooltipBuilder): void;
    partyMemberRequirement(evoRequirement: Requirement, tooltip: ITooltipBuilder): void;
    pokemonPropertiesRequirement(evoRequirement: Requirement, tooltip: ITooltipBuilder): void;
    recoilRequirement(evoRequirement: Requirement, tooltip: ITooltipBuilder): void;
    seasonRequirement(evoRequirement: Requirement, tooltip: ITooltipBuilder): void;
    structureRequirement(evoRequirement: Requirement, tooltip: ITooltipBuilder): void;
    timeRangeRequirement(evoRequirement: Requirement, tooltip: ITooltipBuilder): void;
    tooltipComponent(requirementName: string, ...args: any[]): MutableComponent;
    useMoveRequirement(evoRequirement: Requirement, tooltip: ITooltipBuilder): void;
    weatherRequirement(evoRequirement: Requirement, tooltip: ITooltipBuilder): void;
    worldRequirement(evoRequirement: Requirement, tooltip: ITooltipBuilder): void;
  }


  interface PokemonHideMode extends Enum<PokemonHideMode> {}
  class PokemonHideMode extends Enum<PokemonHideMode> {
    static readonly NAME: PokemonHideMode;
    static readonly POKEMON: PokemonHideMode;
    static readonly BOTH: PokemonHideMode;
    static get entries(): EnumEntries<PokemonHideMode>;
    static valueOf(value: string): PokemonHideMode;
    static values(): PokemonHideMode[];
  }

}

declare module 'com.arcaryx.cobblemonintegrations.jei.EvoRequirementsHelper' {
  class WhenMappings {
    static readonly $EnumSwitchMapping$0: number[];
    static readonly $EnumSwitchMapping$1: number[];
  }

}

declare module 'com.arcaryx.cobblemonintegrations.mixin.cobblemon' {
  import { JsonElement, JsonSerializationContext } from 'com.google.gson';
  import { ItemPredicate } from 'net.minecraft.advancements.critereon';
  import { Type } from 'java.lang.reflect';

  class CampfireBlockEntityAccessor {
    cobblemonintegrations$getCookingProgress(): number;
  }


  class LegacyItemConditionWrapperAdapterMixin {
    serialize(src: ItemPredicate, typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }


  class PokemonBattleMixin {
  }


  class TagSeasonResolverMixin {
  }

}

declare module 'com.arcaryx.cobblemonintegrations.mixin.jade' {
  import { IServerDataProvider } from 'snownee.jade.api';

  interface ItemStorageProviderMixin<T extends Accessor<any> = any> extends IServerDataProvider<T> {}
  class ItemStorageProviderMixin<T extends Accessor<any> = any> extends IServerDataProvider<T> {
  }

}

declare module 'com.arcaryx.cobblemonintegrations.neoforge.client' {
  import { PlatformClient } from 'com.arcaryx.cobblemonintegrations.client';

  interface CobblemonIntegrationsNeoForgeClient extends PlatformClient {}
  class CobblemonIntegrationsNeoForgeClient extends PlatformClient {
    static readonly INSTANCE: CobblemonIntegrationsNeoForgeClient;
    init(): void;
  }

}

declare module 'com.arcaryx.cobblemonintegrations.neoforge' {
  import { Platform } from 'com.arcaryx.cobblemonintegrations';
  import { Loader, Side } from 'com.arcaryx.cobblemonintegrations.util';
  import { NetworkManagerNeoForge } from 'com.arcaryx.cobblemonintegrations.neoforge.net';
  import { MinecraftServer } from 'net.minecraft.server';

  interface CobblemonIntegrationsNeoForge extends Platform {}
  class CobblemonIntegrationsNeoForge extends Platform {
    static readonly INSTANCE: CobblemonIntegrationsNeoForge;
    get loader(): Loader;
    get networkManager(): NetworkManagerNeoForge;
    isModInstalled(modId: string): boolean;
    preInit(): void;
    server(): MinecraftServer;
    side(): Side;
  }


  class CobblemonIntegrationsNeoForgeEntrypoint {
    constructor();
  }

}

declare module 'com.arcaryx.cobblemonintegrations.neoforge.event' {
  import { EntityInteract } from 'PlayerInteractEvent';
  import { NewRegistry } from 'DataPackRegistryEvent';

  class EventHandlerNeoForge {
    static readonly INSTANCE: EventHandlerNeoForge;
    onEntityInteract(event: EntityInteract): void;
    register(): void;
  }


  class ModEventsHandlerNeoForge {
    static readonly INSTANCE: ModEventsHandlerNeoForge;
    onRegisterDatapack(event: NewRegistry): void;
    register(): void;
  }

}

declare module 'com.arcaryx.cobblemonintegrations.neoforge.net' {
  import { NetworkManager } from 'com.arcaryx.cobblemonintegrations.net';
  import { RegisterPayloadHandlersEvent } from 'net.neoforged.neoforge.network.event';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { NetworkPacket } from 'com.cobblemon.mod.common.api.net';
  import { PacketRegisterInfo } from 'com.cobblemon.mod.common.net';
  import { PayloadRegistrar } from 'net.neoforged.neoforge.network.registration';

  interface NetworkManagerNeoForge extends NetworkManager {}
  class NetworkManagerNeoForge extends NetworkManager {
    static readonly INSTANCE: NetworkManagerNeoForge;
    static readonly PROTOCOL_VERSION: string;
    registerMessages(event: RegisterPayloadHandlersEvent): void;
    sendToPlayer(player: ServerPlayer, packet: NetworkPacket<any>): void;
    sendToServer(packet: NetworkPacket<any>): void;
  }


  class PacketInfoNeoForge<T extends NetworkPacket<T> = any> {
    constructor(info: PacketRegisterInfo<T>);
    get info(): PacketRegisterInfo<T>;
    registerToClient(registrar: PayloadRegistrar): void;
    registerToServer(registrar: PayloadRegistrar): void;
  }

}

declare module 'com.arcaryx.cobblemonintegrations.net' {
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { NetworkPacket, PacketHandler } from 'com.cobblemon.mod.common.api.net';
  import { MinecraftServer } from 'net.minecraft.server';

  class NetworkManager {
    sendToPlayer(var1: ServerPlayer, var2: NetworkPacket<any>): void;
    sendToServer(var1: NetworkPacket<any>): void;
  }


  interface PacketHandlerServer<T extends NetworkPacket<T> = any> extends PacketHandler<T> {}
  class PacketHandlerServer<T extends NetworkPacket<T> = any> extends PacketHandler<T> {
    handle(var1: T, var2: MinecraftServer, var3: ServerPlayer): void;
  }

}

declare module 'com.arcaryx.cobblemonintegrations.net.packets.client' {
  import { NetworkPacket } from 'com.cobblemon.mod.common.api.net';
  import { Companion } from 'com.arcaryx.cobblemonintegrations.net.packets.client.SyncDropsPacket';
  import { List } from 'java.util';
  import { PokemonDrop, EvoItem } from 'com.arcaryx.cobblemonintegrations.data';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { Companion as com_arcaryx_cobblemonintegrations_net_packets_client_syncevoitemspacket_Companion } from 'com.arcaryx.cobblemonintegrations.net.packets.client.SyncEvoItemsPacket';

  interface SyncDropsPacket extends NetworkPacket<SyncDropsPacket> {}
  class SyncDropsPacket extends NetworkPacket<SyncDropsPacket> {
    static readonly Companion: Companion;
    constructor(pokemonDrops: PokemonDrop[]);
    encode(buffer: RegistryFriendlyByteBuf): void;
    get id(): ResourceLocation;
    get pokemonDrops(): PokemonDrop[];
  }


  interface SyncEvoItemsPacket extends NetworkPacket<SyncEvoItemsPacket> {}
  class SyncEvoItemsPacket extends NetworkPacket<SyncEvoItemsPacket> {
    static readonly Companion: com_arcaryx_cobblemonintegrations_net_packets_client_syncevoitemspacket_Companion;
    constructor(evoItems: EvoItem[]);
    encode(buffer: RegistryFriendlyByteBuf): void;
    get evoItems(): EvoItem[];
    get id(): ResourceLocation;
  }

}

declare module 'com.arcaryx.cobblemonintegrations.net.packets.client.SyncDropsPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { SyncDropsPacket } from 'com.arcaryx.cobblemonintegrations.net.packets.client';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): SyncDropsPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'com.arcaryx.cobblemonintegrations.net.packets.client.SyncEvoItemsPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { SyncEvoItemsPacket } from 'com.arcaryx.cobblemonintegrations.net.packets.client';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): SyncEvoItemsPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'com.arcaryx.cobblemonintegrations.net.packets.server' {
  import { NetworkPacket } from 'com.cobblemon.mod.common.api.net';
  import { Companion } from 'com.arcaryx.cobblemonintegrations.net.packets.server.WaystonesInteractPacket';
  import { UUID } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  interface WaystonesInteractPacket extends NetworkPacket<WaystonesInteractPacket> {}
  class WaystonesInteractPacket extends NetworkPacket<WaystonesInteractPacket> {
    static readonly Companion: Companion;
    constructor(pokemonId: UUID);
    encode(buffer: RegistryFriendlyByteBuf): void;
    get id(): ResourceLocation;
    get pokemonId(): UUID;
  }

}

declare module 'com.arcaryx.cobblemonintegrations.net.packets.server.WaystonesInteractPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { WaystonesInteractPacket } from 'com.arcaryx.cobblemonintegrations.net.packets.server';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): WaystonesInteractPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'com.arcaryx.cobblemonintegrations.net.serverhandling' {
  import { PacketHandlerServer } from 'com.arcaryx.cobblemonintegrations.net';
  import { WaystonesInteractPacket } from 'com.arcaryx.cobblemonintegrations.net.packets.server';
  import { MinecraftServer } from 'net.minecraft.server';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Component } from 'net.minecraft.network.chat';
  import { AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { Inventory, Player } from 'net.minecraft.world.entity.player';
  import { Collection } from 'java.util';
  import { Waystone } from 'net.blay09.mods.waystones.api';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  interface WaystonesInteractHandler extends PacketHandlerServer<WaystonesInteractPacket> {}
  class WaystonesInteractHandler extends PacketHandlerServer<WaystonesInteractPacket> {
    static readonly INSTANCE: WaystonesInteractHandler;
    createMenu(windowId: number, playerInventory: Inventory, player: Player): AbstractContainerMenu;
    get displayName(): Component;
    get screenStreamCodec(): StreamCodec<RegistryFriendlyByteBuf, Collection<Waystone>>;
    getScreenOpeningData(serverPlayer: ServerPlayer): Collection<Waystone>;
    handle(packet: WaystonesInteractPacket, server: MinecraftServer, player: ServerPlayer): void;
  }

}

declare module 'com.arcaryx.cobblemonintegrations.registry.registries' {
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { NetworkPacket } from 'com.cobblemon.mod.common.api.net';
  import { Iterable } from 'java.lang';
  import { List } from 'java.util';
  import { PacketRegisterInfo } from 'com.cobblemon.mod.common.net';
  import { SyncDropsPacket, SyncEvoItemsPacket } from 'com.arcaryx.cobblemonintegrations.net.packets.client';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { WaystonesInteractPacket } from 'com.arcaryx.cobblemonintegrations.net.packets.server';

  class CobblemonIntegrationsNetwork {
    static readonly INSTANCE: CobblemonIntegrationsNetwork;
    get c2sPayloads(): PacketRegisterInfo<any>[];
    get s2cPayloads(): PacketRegisterInfo<any>[];
    invoke(p0: RegistryFriendlyByteBuf): SyncDropsPacket;
    invoke(p0: RegistryFriendlyByteBuf): SyncEvoItemsPacket;
    invoke(p0: RegistryFriendlyByteBuf): WaystonesInteractPacket;
    sendPacketToPlayers(players: Iterable<ServerPlayer>, packet: NetworkPacket<any>): void;
    sendToAllPlayers(packet: NetworkPacket<any>): void;
    sendToPlayer(player: ServerPlayer, packet: NetworkPacket<any>): void;
    sendToServer(packet: NetworkPacket<any>): void;
  }

}

declare module 'com.arcaryx.cobblemonintegrations.sereneseasons' {
  import { AppendageCondition } from 'com.cobblemon.mod.common.api.spawning.condition';
  import { List } from 'java.util';
  import { SpawnablePosition } from 'com.cobblemon.mod.common.api.spawning.position';
  import { EntityQueryRequirement } from 'com.cobblemon.mod.common.api.pokemon.requirement';
  import { Companion } from 'com.arcaryx.cobblemonintegrations.sereneseasons.SereneSeasonRequirement';
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { CobblemonSeason } from 'com.cobblemon.mod.common.pokemon.feature';

  interface SereneSeasonCondition extends AppendageCondition {}
  class SereneSeasonCondition extends AppendageCondition {
    fits(spawnablePosition: SpawnablePosition): boolean;
    get sereneSeasons(): string[];
    set sereneSeasons(list: string[]);
  }


  interface SereneSeasonRequirement extends EntityQueryRequirement {}
  class SereneSeasonRequirement extends EntityQueryRequirement {
    static readonly Companion: Companion;
    check(pokemon: Pokemon): boolean;
    check(pokemon: Pokemon, queriedEntity: LivingEntity): boolean;
    get sereneSeasons(): string[];
    set sereneSeasons(list: string[]);
  }


  class SereneSeasonsHandler {
    static readonly INSTANCE: SereneSeasonsHandler;
    getCurrentSeasonAsCobblemonSeason(level: Level): CobblemonSeason;
    getSeasonListComponent(allowedSeasons: string[]): MutableComponent;
    isCurrentSeasonInAllowed(level: Level, allowedSeasons: string[]): boolean;
  }

}

declare module 'com.arcaryx.cobblemonintegrations.sereneseasons.SereneSeasonRequirement' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get aDAPTER_VARIANT(): string;
  }

}

declare module 'com.arcaryx.cobblemonintegrations.toughasnails' {
  import { ItemStack } from 'net.minecraft.world.item';
  import { PokemonEntity } from 'com.cobblemon.mod.common.entity.pokemon';
  import { Player } from 'net.minecraft.world.entity.player';
  import { InteractionHand } from 'net.minecraft.world';

  class ToughAsNailsHandler {
    static readonly INSTANCE: ToughAsNailsHandler;
    init(): void;
    interactPokemon(target: PokemonEntity, player: Player, hand: InteractionHand): ItemStack;
  }

}

declare module 'com.arcaryx.cobblemonintegrations.toughasnails.ToughAsNailsHandler' {
  class WhenMappings {
    static readonly $EnumSwitchMapping$0: number[];
  }

}

declare module 'com.arcaryx.cobblemonintegrations.util' {
  import { Enum } from 'java.lang';
  import { EnumEntries } from 'kotlin.enums';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { MinecraftServer } from 'net.minecraft.server';
  import { List } from 'java.util';

  interface Loader extends Enum<Loader> {}
  class Loader extends Enum<Loader> {
    static readonly FABRIC: Loader;
    static readonly NEOFORGE: Loader;
    static get entries(): EnumEntries<Loader>;
    static valueOf(value: string): Loader;
    static values(): Loader[];
  }


  class MiscUtilsKt {
    static blendColor(color1: number, color2: number, ratio: number): number;
    static minecraftResource(path: string): ResourceLocation;
    static modResource(path: string): ResourceLocation;
    static server(): MinecraftServer;
  }


  interface Side extends Enum<Side> {}
  class Side extends Enum<Side> {
    static readonly CLIENT: Side;
    static readonly SERVER: Side;
    static get entries(): EnumEntries<Side>;
    static valueOf(value: string): Side;
    static values(): Side[];
  }


  class TextUtilsKt {
    static translateText(entry: string, ...args: any[]): string;
    static wrapString(input: string, maxLength: number): string[];
  }

}

declare module 'com.arcaryx.cobblemonintegrations.waystones' {
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';

  class WaystonesHandler {
    static readonly INSTANCE: WaystonesHandler;
    canUseTeleport(pokemon: Pokemon): boolean;
    init(): void;
  }

}