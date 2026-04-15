declare module 'dev.ftb.mods.ftbteams.api.client' {
  import { UUID, Collection, Optional } from 'java.util';
  import { Team } from 'dev.ftb.mods.ftbteams.api';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';

  class ClientTeamManager {
    formatName(var1: UUID): Component;
    get managerId(): UUID;
    get teams(): Collection<Team>;
    getKnownPlayer(var1: UUID): Optional<KnownClientPlayer>;
    getTeamByID(var1: UUID): Optional<Team>;
    getTeamForPlayer(var1: Player): Optional<Team>;
    isValid(): boolean;
    knownClientPlayers(): Collection<KnownClientPlayer>;
    self(): KnownClientPlayer;
    selfTeam(): Team;
  }

}

declare module 'dev.ftb.mods.ftbteams.api' {
  import { MouseButton } from 'dev.ftb.mods.ftblibrary.ui.input';
  import { API } from 'dev.ftb.mods.ftbteams.api.FTBTeamsAPI';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { UUID, List, Map, Set, Collection, Optional } from 'java.util';
  import { TeamPropertyCollection, TeamProperty } from 'dev.ftb.mods.ftbteams.api.property';
  import { Component } from 'net.minecraft.network.chat';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Color4I, Icon } from 'dev.ftb.mods.ftblibrary.icon';
  import { MinecraftServer } from 'net.minecraft.server';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { Enum } from 'java.lang';
  import { Player } from 'net.minecraft.world.entity.player';

  class CustomPartyCreationHandler {
    createParty(var1: MouseButton): void;
  }


  class FTBTeamsAPI {
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static _init(instance: API): void;
    static api(): API;
    static rl(path: string): ResourceLocation;
  }


  class Team {
    createParty(var1: string, var2: Color4I): Team;
    get coloredName(): Component;
    get extraData(): CompoundTag;
    get id(): UUID;
    get members(): Set<UUID>;
    get messageHistory(): TeamMessage[];
    get name(): Component;
    get onlineMembers(): Collection<ServerPlayer>;
    get owner(): UUID;
    get properties(): TeamPropertyCollection;
    get shortName(): string;
    get teamId(): UUID;
    get teamInfo(): Component[];
    get typeTranslationKey(): string;
    getPlayersByRank(var1: TeamRank): Map<UUID, TeamRank>;
    getProperty<T>(var1: TeamProperty<T>): T;
    getRankForPlayer(var1: UUID): TeamRank;
    isClientTeam(): boolean;
    isPartyTeam(): boolean;
    isPlayerTeam(): boolean;
    isServerTeam(): boolean;
    isValid(): boolean;
    markDirty(): void;
    sendMessage(var1: UUID, var2: string): void;
    sendMessage(var1: UUID, var2: Component): void;
    setProperty<T>(var1: TeamProperty<T>, var2: T): void;
    syncOnePropertyToAll<T>(var1: MinecraftServer, var2: TeamProperty<T>, var3: T): void;
    syncOnePropertyToTeam<T>(var1: TeamProperty<T>, var2: T): void;
  }


  class TeamManager {
    arePlayersInSameTeam(var1: UUID, var2: UUID): boolean;
    createPartyTeam(var1: ServerPlayer, var2: string, var3: string, var4: Color4I): Team;
    createServerTeam(var1: CommandSourceStack, var2: string, var3: string, var4: Color4I, var5: UUID): Team;
    createServerTeam(commandSourceStack: CommandSourceStack, name: string, description: string, color: Color4I): Team;
    get extraData(): CompoundTag;
    get id(): UUID;
    get knownPlayerTeams(): Map<UUID, Team>;
    get server(): MinecraftServer;
    get teams(): Collection<Team>;
    getPlayerTeamForPlayerID(var1: UUID): Optional<Team>;
    getTeamByID(var1: UUID): Optional<Team>;
    getTeamByName(var1: string): Optional<Team>;
    getTeamForPlayer(var1: ServerPlayer): Optional<Team>;
    getTeamForPlayerID(var1: UUID): Optional<Team>;
    isChatRedirected(var1: ServerPlayer): boolean;
    markDirty(): void;
    setChatRedirected(var1: ServerPlayer, var2: boolean): void;
  }


  class TeamMessage {
    date(): number;
    sender(): UUID;
    text(): Component;
  }


  interface TeamRank extends Enum<TeamRank> {}
  class TeamRank extends Enum<TeamRank> {
    static readonly ENEMY: TeamRank;
    static readonly NONE: TeamRank;
    static readonly ALLY: TeamRank;
    static readonly INVITED: TeamRank;
    static readonly MEMBER: TeamRank;
    static readonly OFFICER: TeamRank;
    static readonly OWNER: TeamRank;
    get displayName(): Component;
    get icon(): Optional<Icon>;
    get power(): number;
    get serializedName(): string;
    isAllyOrBetter(): boolean;
    isAtLeast(rank: TeamRank): boolean;
    isEnemyOrWorse(): boolean;
    isInvitedOrBetter(): boolean;
    isMemberOrBetter(): boolean;
    isNoneOrBetter(): boolean;
    isOfficerOrBetter(): boolean;
    isOwner(): boolean;
    static valueOf(name: string): TeamRank;
    static values(): TeamRank[];
  }


  class TeamStagesHelper {
    static addTeamStage(team: Team, stage: string): boolean;
    static addTeamStages(team: Team, stages: Collection<string>): number;
    static getStages(team: Team): Collection<string>;
    static hasTeamStage(team: Team, stage: string): boolean;
    static hasTeamStage(player: Player, stage: string): boolean;
    static removeTeamStage(team: Team, stage: string): boolean;
    static removeTeamStages(team: Team, stages: Collection<string>): number;
  }

}

declare module 'dev.ftb.mods.ftbteams.api.event' {
  import { Team, TeamManager } from 'dev.ftb.mods.ftbteams.api';
  import { TeamPropertyCollection, TeamProperty } from 'dev.ftb.mods.ftbteams.api.property';
  import { UUID, Optional, List, Collection } from 'java.util';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { PartyTeam } from 'dev.ftb.mods.ftbteams.data';
  import { GameProfile } from 'com.mojang.authlib';
  import { Consumer } from 'java.util.function';
  import { Event } from 'dev.architectury.event';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { Component } from 'net.minecraft.network.chat';
  import { CompoundTag } from 'net.minecraft.nbt';

  class ClientTeamPropertiesChangedEvent {
    constructor(t: Team, p: TeamPropertyCollection);
    get oldProperties(): TeamPropertyCollection;
    get team(): Team;
  }


  interface PlayerChangedTeamEvent extends TeamEvent {}
  class PlayerChangedTeamEvent extends TeamEvent {
    constructor(newTeam: Team, previousTeam: Team, playerId: UUID, player: ServerPlayer);
    get player(): ServerPlayer;
    get playerId(): UUID;
    get previousTeam(): Optional<Team>;
  }


  interface PlayerJoinedPartyTeamEvent extends TeamEvent {}
  class PlayerJoinedPartyTeamEvent extends TeamEvent {
    constructor(team: Team, previousTeam: Team, player: ServerPlayer);
    get player(): ServerPlayer;
    get previousTeam(): Team;
  }


  interface PlayerLeftPartyTeamEvent extends TeamEvent {}
  class PlayerLeftPartyTeamEvent extends TeamEvent {
    constructor(team: Team, playerTeam: Team, playerId: UUID, player: ServerPlayer, teamDeleted: boolean);
    get player(): ServerPlayer;
    get playerId(): UUID;
    get playerTeam(): Team;
    get teamDeleted(): boolean;
  }


  interface PlayerLoggedInAfterTeamEvent extends TeamEvent {}
  class PlayerLoggedInAfterTeamEvent extends TeamEvent {
    constructor(t: Team, p: ServerPlayer);
    get player(): ServerPlayer;
  }


  interface PlayerTransferredTeamOwnershipEvent extends TeamEvent {}
  class PlayerTransferredTeamOwnershipEvent extends TeamEvent {
    constructor(team: Team, prevOwner: ServerPlayer, newOwner: ServerPlayer);

    constructor(t: PartyTeam, from: ServerPlayer, toProfile: GameProfile);
    get from(): ServerPlayer;
    get to(): ServerPlayer;
    get toProfile(): GameProfile;
  }


  interface TeamAllyEvent extends TeamEvent {}
  class TeamAllyEvent extends TeamEvent {
    constructor(team: Team, players: GameProfile[], adding: boolean);
    get players(): Collection<GameProfile>;
    isAdding(): boolean;
  }


  class TeamCollectPropertiesEvent {
    constructor(c: Consumer<TeamProperty<any>>);
    add(property: TeamProperty<any>): void;
  }


  interface TeamCreatedEvent extends TeamEvent {}
  class TeamCreatedEvent extends TeamEvent {
    constructor(team: Team, creator: ServerPlayer, creatorId: UUID);
    get creator(): ServerPlayer;
    get creatorId(): UUID;
  }


  class TeamEvent {
    static readonly CREATED: Event;
    static readonly LOADED: Event;
    static readonly SAVED: Event;
    static readonly DELETED: Event;
    static readonly PLAYER_LOGGED_IN: Event;
    static readonly OWNERSHIP_TRANSFERRED: Event;
    static readonly COLLECT_PROPERTIES: Event;
    static readonly PROPERTIES_CHANGED: Event;
    static readonly PLAYER_CHANGED: Event;
    static readonly PLAYER_JOINED_PARTY: Event;
    static readonly PLAYER_LEFT_PARTY: Event;
    static readonly INFO: Event;
    static readonly ADD_ALLY: Event;
    static readonly REMOVE_ALLY: Event;
    static readonly CLIENT_PROPERTIES_CHANGED: Event;
    constructor(team: Team);
    get team(): Team;
  }


  interface TeamInfoEvent extends TeamEvent {}
  class TeamInfoEvent extends TeamEvent {
    constructor(t: Team, p: CommandSourceStack);
    add(component: Component): void;
    get source(): CommandSourceStack;
  }


  class TeamManagerEvent {
    static readonly CREATED: Event;
    static readonly LOADED: Event;
    static readonly SAVED: Event;
    static readonly DESTROYED: Event;
    constructor(t: TeamManager);
    get extraData(): CompoundTag;
    get manager(): TeamManager;
  }


  interface TeamPropertiesChangedEvent extends TeamEvent {}
  class TeamPropertiesChangedEvent extends TeamEvent {
    constructor(team: Team, prevProps: TeamPropertyCollection);
    get previousProperties(): TeamPropertyCollection;
  }

}

declare module 'dev.ftb.mods.ftbteams.api.FTBTeamsAPI' {
  import { TeamManager, CustomPartyCreationHandler, TeamMessage } from 'dev.ftb.mods.ftbteams.api';
  import { ClientTeamManager } from 'dev.ftb.mods.ftbteams.api.client';
  import { UUID } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  class API {
    createMessage(var1: UUID, var2: Component): TeamMessage;
    get clientManager(): ClientTeamManager;
    get customPartyCreationHandler(): CustomPartyCreationHandler;
    get manager(): TeamManager;
    isClientManagerLoaded(): boolean;
    isManagerLoaded(): boolean;
    set customPartyCreationHandler(var1: CustomPartyCreationHandler);
    setPartyCreationFromAPIOnly(var1: boolean): void;
  }

}

declare module 'dev.ftb.mods.ftbteams.api.property' {
  import { BigInteger } from 'java.math';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Supplier, BiConsumer, Predicate } from 'java.util.function';
  import { Optional, List, Map, Set } from 'java.util';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { ConfigValue, ConfigGroup, NameMap } from 'dev.ftb.mods.ftblibrary.config';
  import { Boolean, Double, Integer, Enum } from 'java.lang';
  import { Tag } from 'net.minecraft.nbt';
  import { Color4I } from 'dev.ftb.mods.ftblibrary.icon';
  import { Component } from 'net.minecraft.network.chat';
  import { Pattern } from 'java.util.regex';
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { CommandContext } from 'com.mojang.brigadier.context';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { StringReader } from 'com.mojang.brigadier';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Suggestions, SuggestionsBuilder } from 'com.mojang.brigadier.suggestion';
  import { FromNet } from 'dev.ftb.mods.ftbteams.api.property.TeamPropertyType';

  interface BigIntegerProperty extends TeamProperty<BigInteger> {}
  class BigIntegerProperty extends TeamProperty<BigInteger> {
    constructor(id: ResourceLocation, def: Supplier<BigInteger>);

    constructor(id: ResourceLocation, def: BigInteger);
    config(config: ConfigGroup, value: TeamPropertyValue<BigInteger>): ConfigValue<any>;
    static fromNetwork(id: ResourceLocation, buf: RegistryFriendlyByteBuf): TeamProperty<BigInteger>;
    fromString(string: string): Optional<BigInteger>;
    get type(): TeamPropertyType<BigInteger>;
    readValue(buf: RegistryFriendlyByteBuf): BigInteger;
    write(buf: RegistryFriendlyByteBuf): void;
    writeValue(buf: RegistryFriendlyByteBuf, value: BigInteger): void;
  }


  interface BooleanProperty extends TeamProperty<boolean> {}
  class BooleanProperty extends TeamProperty<boolean> {
    constructor(id: ResourceLocation, def: Supplier<boolean>);

    constructor(id: ResourceLocation, def: boolean);
    config(config: ConfigGroup, value: TeamPropertyValue<boolean>): ConfigValue<any>;
    fromNBT(tag: Tag): Optional<boolean>;
    fromString(string: string): Optional<boolean>;
    get type(): TeamPropertyType<boolean>;
    readValue(buf: RegistryFriendlyByteBuf): boolean;
    toNBT(value: boolean): Tag;
    write(buf: RegistryFriendlyByteBuf): void;
    writeValue(buf: RegistryFriendlyByteBuf, value: boolean): void;
  }


  interface ColorProperty extends TeamProperty<Color4I> {}
  class ColorProperty extends TeamProperty<Color4I> {
    constructor(id: ResourceLocation, def: Supplier<Color4I>);

    constructor(id: ResourceLocation, def: Color4I);
    config(config: ConfigGroup, value: TeamPropertyValue<Color4I>): ConfigValue<any>;
    fromString(string: string): Optional<Color4I>;
    get type(): TeamPropertyType<Color4I>;
    toString(value: Color4I): string;
    toString(): string;
    write(buf: RegistryFriendlyByteBuf): void;
  }


  interface DoubleProperty extends TeamProperty<number> {}
  class DoubleProperty extends TeamProperty<number> {
    readonly minValue: number;
    readonly maxValue: number;
    constructor(id: ResourceLocation, def: Supplier<number>, min: number, max: number);

    constructor(id: ResourceLocation, def: number, min: number, max: number);

    constructor(id: ResourceLocation, def: Supplier<number>);
    config(config: ConfigGroup, value: TeamPropertyValue<number>): ConfigValue<any>;
    fromNBT(tag: Tag): Optional<number>;
    fromString(string: string): Optional<number>;
    get type(): TeamPropertyType<number>;
    readValue(buf: RegistryFriendlyByteBuf): number;
    toNBT(value: number): Tag;
    write(buf: RegistryFriendlyByteBuf): void;
    writeValue(buf: RegistryFriendlyByteBuf, value: number): void;
  }


  interface EnumProperty extends TeamProperty<string> {}
  class EnumProperty extends TeamProperty<string> {
    constructor(id: ResourceLocation, def: Supplier<string>, values: string[], names: Map<string, Component>);

    constructor(id: ResourceLocation, nameMap: NameMap<T>);
    config(config: ConfigGroup, value: TeamPropertyValue<string>): ConfigValue<any>;
    fromNBT(tag: Tag): Optional<string>;
    fromString(string: string): Optional<string>;
    get type(): TeamPropertyType<string>;
    toNBT(value: string): Tag;
    write(buf: RegistryFriendlyByteBuf): void;
  }


  interface IntProperty extends TeamProperty<number> {}
  class IntProperty extends TeamProperty<number> {
    readonly minValue: number;
    readonly maxValue: number;
    constructor(id: ResourceLocation, def: Supplier<number>, min: number, max: number);

    constructor(id: ResourceLocation, def: Supplier<number>);

    constructor(id: ResourceLocation, def: number, min: number, max: number);

    constructor(id: ResourceLocation, def: number);
    config(config: ConfigGroup, value: TeamPropertyValue<number>): ConfigValue<any>;
    fromNBT(tag: Tag): Optional<number>;
    fromString(string: string): Optional<number>;
    get type(): TeamPropertyType<number>;
    readValue(buf: RegistryFriendlyByteBuf): number;
    toNBT(value: number): Tag;
    write(buf: RegistryFriendlyByteBuf): void;
    writeValue(buf: RegistryFriendlyByteBuf, value: number): void;
  }


  interface PrivacyMode extends Enum<PrivacyMode> {}
  class PrivacyMode extends Enum<PrivacyMode> {
    static readonly ALLIES: PrivacyMode;
    static readonly PRIVATE: PrivacyMode;
    static readonly PUBLIC: PrivacyMode;
    get serializedName(): string;
    static valueOf(name: string): PrivacyMode;
    static values(): PrivacyMode[];
  }


  interface PrivacyProperty extends TeamProperty<PrivacyMode> {}
  class PrivacyProperty extends TeamProperty<PrivacyMode> {
    constructor(id: ResourceLocation, def: Supplier<PrivacyMode>);

    constructor(id: ResourceLocation, def: PrivacyMode);
    config(config: ConfigGroup, value: TeamPropertyValue<PrivacyMode>): ConfigValue<any>;
    fromString(string: string): Optional<PrivacyMode>;
    get type(): TeamPropertyType<PrivacyMode>;
    toString(value: PrivacyMode): string;
    toString(): string;
    write(buf: RegistryFriendlyByteBuf): void;
  }


  interface StringListProperty extends TeamProperty<List> {}
  class StringListProperty extends TeamProperty<List> {
    constructor(id: ResourceLocation, def: Supplier<string[]>);

    constructor(id: ResourceLocation, def: string[]);
    config(config: ConfigGroup, value: TeamPropertyValue<string[]>): ConfigValue<any>;
    fromNBT(tag: Tag): Optional<string[]>;
    fromString(string: string): Optional<string[]>;
    get type(): TeamPropertyType<string[]>;
    readValue(buf: RegistryFriendlyByteBuf): string[];
    toNBT(value: string[]): Tag;
    toString(value: string[]): string;
    toString(): string;
    write(buf: RegistryFriendlyByteBuf): void;
    writeValue(buf: RegistryFriendlyByteBuf, value: string[]): void;
  }


  interface StringMapProperty<T = any> extends TeamProperty<Map> {}
  class StringMapProperty<T = any> extends TeamProperty<Map> {
    fromNBT(tag: Tag): Optional<Map<string, T>>;
    fromString(string: string): Optional<Map<string, T>>;
    get type(): TeamPropertyType<Map<string, T>>;
    readValue(buf: RegistryFriendlyByteBuf): Map<string, T>;
    toNBT(value: Map<string, T>): Tag;
    toString(value: Map<string, T>): string;
    toString(): string;
    write(buf: RegistryFriendlyByteBuf): void;
    writeValue(buf: RegistryFriendlyByteBuf, value: Map<string, T>): void;
  }


  interface StringProperty extends TeamProperty<string> {}
  class StringProperty extends TeamProperty<string> {
    constructor(id: ResourceLocation, def: Supplier<string>, pattern: Pattern);

    constructor(id: ResourceLocation, def: Supplier<string>);

    constructor(id: ResourceLocation, def: string, pattern: Pattern);

    constructor(id: ResourceLocation, def: string);
    config(config: ConfigGroup, value: TeamPropertyValue<string>): ConfigValue<any>;
    fromString(string: string): Optional<string>;
    get type(): TeamPropertyType<string>;
    write(buf: RegistryFriendlyByteBuf): void;
  }


  interface StringSetProperty extends TeamProperty<Set> {}
  class StringSetProperty extends TeamProperty<Set> {
    constructor(id: ResourceLocation, def: Supplier<Set<string>>);

    constructor(id: ResourceLocation, def: Set<string>);
    config(config: ConfigGroup, value: TeamPropertyValue<Set<string>>): ConfigValue<any>;
    fromNBT(tag: Tag): Optional<Set<string>>;
    fromString(string: string): Optional<Set<string>>;
    get type(): TeamPropertyType<Set<string>>;
    readValue(buf: RegistryFriendlyByteBuf): Set<string>;
    toNBT(value: Set<string>): Tag;
    toString(value: Set<string>): string;
    toString(): string;
    write(buf: RegistryFriendlyByteBuf): void;
    writeValue(buf: RegistryFriendlyByteBuf, value: Set<string>): void;
  }


  class TeamProperties {
    static readonly DISPLAY_NAME: StringProperty;
    static readonly DESCRIPTION: StringProperty;
    static readonly COLOR: ColorProperty;
    static readonly FREE_TO_JOIN: BooleanProperty;
    static readonly MAX_MSG_HISTORY_SIZE: IntProperty;
    static readonly TEAM_STAGES: StringSetProperty;
  }


  class TeamProperty<T = any> {
    config(config: ConfigGroup, value: TeamPropertyValue<T>): ConfigValue<any>;
    createDefaultValue(): TeamPropertyValue<T>;
    createValueFromNBT(tag: Tag): TeamPropertyValue<T>;
    createValueFromNetwork(buf: RegistryFriendlyByteBuf): TeamPropertyValue<T>;
    equals(o: any): boolean;
    fromNBT(tag: Tag): Optional<T>;
    fromString(var1: string): Optional<T>;
    get defaultValue(): T;
    get id(): ResourceLocation;
    get type(): TeamPropertyType<T>;
    getTranslationKey(prefix: string): string;
    hashCode(): number;
    isPlayerEditable(): boolean;
    notPlayerEditable(): TeamProperty<T>;
    readValue(buf: RegistryFriendlyByteBuf): T;
    shouldSyncToAll(): boolean;
    syncToAll(): TeamProperty<T>;
    toNBT(value: T): Tag;
    toString(value: T): string;
    toString(): string;
    write(var1: RegistryFriendlyByteBuf): void;
    writeValue(buf: RegistryFriendlyByteBuf, value: T): void;
  }


  interface TeamPropertyArgument extends ArgumentType<TeamProperty> {}
  class TeamPropertyArgument extends ArgumentType<TeamProperty> {
    static create(): TeamPropertyArgument;
    static get(context: CommandContext<CommandSourceStack>, name: string): TeamProperty<any>;
    listSuggestions<S>(context: CommandContext<S>, builder: SuggestionsBuilder): CompletableFuture<Suggestions>;
    parse(reader: StringReader): TeamProperty<any>;
  }


  class TeamPropertyCollection {
    copy(): TeamPropertyCollection;
    copyIf(var1: Predicate<TeamProperty<any>>): TeamPropertyCollection;
    forEach<T>(var1: BiConsumer<TeamProperty<T>, TeamPropertyValue<T>>): void;
    get<T>(var1: TeamProperty<T>): T;
    set<T>(var1: TeamProperty<T>, var2: T): void;
    size(): number;
    updateFrom(var1: TeamPropertyCollection): void;
  }


  class TeamPropertyType<T = any> {
    static readonly BOOLEAN: TeamPropertyType;
    static readonly STRING: TeamPropertyType;
    static readonly STRING_LIST: TeamPropertyType;
    static readonly STRING_SET: TeamPropertyType;
    static readonly INT: TeamPropertyType;
    static readonly DOUBLE: TeamPropertyType;
    static readonly COLOR: TeamPropertyType;
    static readonly ENUM: TeamPropertyType;
    static readonly PRIVACY_MODE: TeamPropertyType;
    static readonly BIG_INTEGER: TeamPropertyType;
    static readonly INT_MAP: TeamPropertyType;
    static readonly BOOL_MAP: TeamPropertyType;
    static readonly STRING_MAP: TeamPropertyType;
    static read(buf: RegistryFriendlyByteBuf): TeamProperty<any>;
    static register<Y>(id: ResourceLocation, deserializer: FromNet<Y>): TeamPropertyType<Y>;
    static write(buf: RegistryFriendlyByteBuf, prop: TeamProperty<any>): void;
  }


  class TeamPropertyValue<T = any> {
    constructor(property: TeamProperty<T>, value: T);

    constructor(property: TeamProperty<T>);
    copy(): TeamPropertyValue<T>;
    static createDefaultValue<X>(property: TeamProperty<X>): TeamPropertyValue<X>;
    static fromNBT<X>(property: TeamProperty<X>, tag: Tag): TeamPropertyValue<X>;
    static fromNetwork<X>(property: TeamProperty<X>, buf: RegistryFriendlyByteBuf): TeamPropertyValue<X>;
    get property(): TeamProperty<T>;
    get value(): T;
    set value(value: T);
    toString(): string;
  }

}

declare module 'dev.ftb.mods.ftbteams.api.property.StringMapProperty' {
  import { StringMapProperty } from 'dev.ftb.mods.ftbteams.api.property';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Map } from 'java.util';
  import { Boolean, Integer } from 'java.lang';

  interface ToString extends StringMapProperty<string> {}
  class ToString extends StringMapProperty<string> {
    constructor(id: ResourceLocation, defaultValue: Map<string, string>);
  }


  interface ToBoolean extends StringMapProperty<boolean> {}
  class ToBoolean extends StringMapProperty<boolean> {
    constructor(id: ResourceLocation, defaultValue: Map<string, boolean>);
  }


  interface ToInteger extends StringMapProperty<number> {}
  class ToInteger extends StringMapProperty<number> {
    constructor(id: ResourceLocation, defaultValue: Map<string, number>);
  }

}

declare module 'dev.ftb.mods.ftbteams.api.property.TeamPropertyArgument' {
  import { ArgumentTypeInfo } from 'net.minecraft.commands.synchronization';
  import { TeamPropertyArgument } from 'dev.ftb.mods.ftbteams.api.property';
  import { Template } from 'dev.ftb.mods.ftbteams.api.property.TeamPropertyArgument.Info';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { JsonObject } from 'com.google.gson';

  interface Info extends ArgumentTypeInfo<TeamPropertyArgument, Template> {}
  class Info extends ArgumentTypeInfo<TeamPropertyArgument, Template> {
    deserializeFromNetwork(friendlyByteBuf: FriendlyByteBuf): Template;
    serializeToJson(template: Template, jsonObject: JsonObject): void;
    serializeToNetwork(template: Template, friendlyByteBuf: FriendlyByteBuf): void;
    unpack(argumentType: TeamPropertyArgument): Template;
  }

}

declare module 'dev.ftb.mods.ftbteams.api.property.TeamPropertyArgument.Info' {
  import { Template as argumenttypeinfo_Template } from 'ArgumentTypeInfo';
  import { TeamPropertyArgument } from 'dev.ftb.mods.ftbteams.api.property';
  import { CommandBuildContext } from 'net.minecraft.commands';
  import { ArgumentTypeInfo } from 'net.minecraft.commands.synchronization';

  interface Template extends argumenttypeinfo_Template<TeamPropertyArgument> {}
  class Template extends argumenttypeinfo_Template<TeamPropertyArgument> {
    instantiate(commandBuildContext: CommandBuildContext): TeamPropertyArgument;
    type(): ArgumentTypeInfo<TeamPropertyArgument, any>;
  }

}

declare module 'dev.ftb.mods.ftbteams.api.property.TeamPropertyType' {
  import { TeamProperty } from 'dev.ftb.mods.ftbteams.api.property';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class FromNet<Y = any> {
    apply(var1: ResourceLocation, var2: RegistryFriendlyByteBuf): TeamProperty<Y>;
  }

}

declare module 'dev.ftb.mods.ftbteams.client' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { KeyMapping } from 'net.minecraft.client';
  import { TeamPropertyCollection } from 'dev.ftb.mods.ftbteams.api.property';
  import { PlayerPermissions } from 'dev.ftb.mods.ftbteams.data';
  import { UUID } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { KnownClientPlayer } from 'dev.ftb.mods.ftbteams.api.client';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  class FTBTeamsClient {
    static readonly OPEN_GUI_ID: ResourceLocation;
    static openTeamsKey: KeyMapping;
    static init(): void;
    static isChatRedirected(): boolean;
    static openMyTeamGui(properties: TeamPropertyCollection, permissions: PlayerPermissions): void;
    static sendMessage(from: UUID, text: Component): void;
    static setChatRedirected(chatRedirected: boolean): void;
    static updatePresence(update: KnownClientPlayer): void;
    static updateSettings(id: UUID, properties: TeamPropertyCollection): void;
  }


  class KnownClientPlayerNet {
    static readonly STREAM_CODEC: StreamCodec;
    static fromNetwork(buf: FriendlyByteBuf): KnownClientPlayer;
    static write(kcp: KnownClientPlayer, buf: FriendlyByteBuf): void;
  }

}

declare module 'dev.ftb.mods.ftbteams.client.gui' {
  import { GameProfile } from 'com.mojang.authlib';
  import { BaseScreen, Theme, NordButton } from 'dev.ftb.mods.ftblibrary.ui';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { TooltipList } from 'dev.ftb.mods.ftblibrary.util';
  import { MouseButton, Key } from 'dev.ftb.mods.ftblibrary.ui.input';
  import { NordColors } from 'dev.ftb.mods.ftblibrary.ui.misc';
  import { KnownClientPlayer } from 'dev.ftb.mods.ftbteams.api.client';
  import { TeamPropertyCollection } from 'dev.ftb.mods.ftbteams.api.property';
  import { PlayerPermissions } from 'dev.ftb.mods.ftbteams.data';

  interface AllyScreen extends BaseInvitationScreen {}
  class AllyScreen extends BaseInvitationScreen {
    constructor();
    isEnabled(): boolean;
    setInvited(profile: GameProfile, invited: boolean): void;
  }


  interface BaseInvitationScreen extends InvitationSetup, BaseScreen {}
  class BaseInvitationScreen extends InvitationSetup {
    constructor(title: Component);
    addWidgets(): void;
    alignWidgets(): void;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawForeground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    isInvited(profile: GameProfile): boolean;
    onInit(): boolean;
    setInvited(profile: GameProfile, invited: boolean): void;
  }


  interface CreatePartyButton extends NordButton {}
  class CreatePartyButton extends NordButton {
    addMouseOverText(list: TooltipList): void;
    onClicked(button: MouseButton): void;
  }


  interface CreatePartyScreen extends NordColors, InvitationSetup, BaseScreen {}
  class CreatePartyScreen extends NordColors {
    constructor();
    addWidgets(): void;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawForeground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    isInvited(profile: GameProfile): boolean;
    keyPressed(key: Key): boolean;
    onClicked(mouseButton: MouseButton): void;
    renderTitleInCenter(): boolean;
    setInvited(profile: GameProfile, invited: boolean): void;
  }


  class InvitationSetup {
    isInvited(var1: GameProfile): boolean;
    setInvited(var1: GameProfile, var2: boolean): void;
  }


  interface InvitedButton extends NordButton {}
  class InvitedButton extends NordButton {
    readonly screen: InvitationSetup;
    readonly player: KnownClientPlayer;
    drawIcon(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    onClicked(button: MouseButton): void;
  }


  interface InviteScreen extends BaseInvitationScreen {}
  class InviteScreen extends BaseInvitationScreen {
    constructor();
    isEnabled(): boolean;
  }


  interface MemberButton extends NordButton {}
  class MemberButton extends NordButton {
    drawIcon(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    onClicked(button: MouseButton): void;
  }


  interface MyTeamScreen extends NordColors, BaseScreen {}
  class MyTeamScreen extends NordColors {
    constructor(properties: TeamPropertyCollection, permissions: PlayerPermissions);
    addMouseOverText(list: TooltipList): void;
    addMouseOverText(list: TooltipList): void;
    addWidgets(): void;
    alignWidgets(): void;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawForeground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    keyPressed(key: Key): boolean;
    onInit(): boolean;
    playClickSound(): void;
    playClickSound(): void;
    refreshChat(): void;
    static refreshIfOpen(): void;
  }

}

declare module 'dev.ftb.mods.ftbteams.data' {
  import { UUID, List, Map, Set, Collection } from 'java.util';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { TeamRank, Team, TeamMessage } from 'dev.ftb.mods.ftbteams.api';
  import { SNBTCompoundTag } from 'dev.ftb.mods.ftblibrary.snbt';
  import { Provider } from 'HolderLookup';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { TeamProperty, TeamPropertyCollection } from 'dev.ftb.mods.ftbteams.api.property';
  import { Component } from 'net.minecraft.network.chat';
  import { MinecraftServer } from 'net.minecraft.server';
  import { Color4I } from 'dev.ftb.mods.ftblibrary.icon';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { BooleanSupplier } from 'java.util.function';
  import { CommandDispatcher, StringReader } from 'com.mojang.brigadier';
  import { GameProfile } from 'com.mojang.authlib';
  import { KnownClientPlayer } from 'dev.ftb.mods.ftbteams.api.client';
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { SimpleCommandExceptionType, DynamicCommandExceptionType, Dynamic2CommandExceptionType } from 'com.mojang.brigadier.exceptions';
  import { CommandContext } from 'com.mojang.brigadier.context';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Suggestions, SuggestionsBuilder } from 'com.mojang.brigadier.suggestion';
  import { Enum } from 'java.lang';
  import { ChatFormatting } from 'net.minecraft';

  interface AbstractTeam extends AbstractTeamBase {}
  class AbstractTeam extends AbstractTeamBase {
    constructor(manager: TeamManagerImpl, id: UUID);
    declineInvitation(source: CommandSourceStack): number;
    deserializeNBT(tag: CompoundTag, provider: Provider): void;
    get onlineMembers(): ServerPlayer[];
    get owner(): UUID;
    get teamInfo(): Component[];
    getOnlineRanked(rank: TeamRank): ServerPlayer[];
    markDirty(): void;
    sendMessage(senderId: UUID, message: string): void;
    sendMessage(from: UUID, text: Component): void;
    serializeNBT(provider: Provider): SNBTCompoundTag;
    settings<T>(source: CommandSourceStack, key: TeamProperty<T>, value: string): number;
    syncOnePropertyToAll<T>(server: MinecraftServer, property: TeamProperty<T>, value: T): void;
    syncOnePropertyToTeam<T>(property: TeamProperty<T>, value: T): void;
    updatePropertiesFrom(newProperties: TeamPropertyCollection): void;
  }


  interface AbstractTeamBase extends Team {}
  class AbstractTeamBase extends Team {
    addMember(id: UUID, rank: TeamRank): void;
    addMessage(message: TeamMessage): void;
    addMessages(messages: Collection<TeamMessage>): void;
    createParty(description: string, color: Color4I): Team;
    equals(o: any): boolean;
    get color(): number;
    get coloredName(): Component;
    get description(): string;
    get displayName(): string;
    get extraData(): CompoundTag;
    get id(): UUID;
    get maxMessageHistorySize(): number;
    get members(): Set<UUID>;
    get messageHistory(): TeamMessage[];
    get name(): Component;
    get properties(): TeamPropertyCollection;
    get shortName(): string;
    get teamId(): UUID;
    get type(): TeamType;
    get typeTranslationKey(): string;
    getPlayersByRank(minRank: TeamRank): Map<UUID, TeamRank>;
    getProperty<T>(property: TeamProperty<T>): T;
    getRankForPlayer(playerId: UUID): TeamRank;
    hashCode(): number;
    invalidateTeam(): void;
    isAllyOrBetter(profile: UUID): boolean;
    isFreeToJoin(): boolean;
    isInvited(profile: UUID): boolean;
    isMember(uuid: UUID): boolean;
    isOfficerOrBetter(profile: UUID): boolean;
    isValid(): boolean;
    markDirty(): void;
    removeMember(id: UUID): void;
    setProperty<T>(property: TeamProperty<T>, value: T): void;
    toString(): string;
  }


  interface ClientTeam extends AbstractTeamBase {}
  class ClientTeam extends AbstractTeamBase {
    static readonly STREAM_CODEC: StreamCodec;
    static copyOf(team: AbstractTeam): ClientTeam;
    get onlineMembers(): Collection<ServerPlayer>;
    get owner(): UUID;
    get teamInfo(): Component[];
    get type(): TeamType;
    static invalidTeam(team: AbstractTeam): ClientTeam;
    isClientTeam(): boolean;
    isPartyTeam(): boolean;
    isPlayerTeam(): boolean;
    isServerTeam(): boolean;
    isValid(): boolean;
    sendMessage(senderId: UUID, message: string): void;
    sendMessage(senderId: UUID, message: Component): void;
    setFullSyncRequired(fullSyncSupplier: BooleanSupplier): void;
    setMessageHistory(messages: TeamMessage[]): void;
    syncOnePropertyToAll<T>(server: MinecraftServer, property: TeamProperty<T>, value: T): void;
    syncOnePropertyToTeam<T>(property: TeamProperty<T>, value: T): void;
    toBeRemoved(): boolean;
    updateProperties(newProps: TeamPropertyCollection): void;
  }


  class FTBTeamsCommands {
    register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }


  class FTBTUtils {
    static readonly NO_PROFILE: GameProfile;
    static canPlayerUseCommand(player: ServerPlayer, command: string): boolean;
    static getDefaultPartyName(server: MinecraftServer, playerId: UUID, player: ServerPlayer): string;
    static getPlayerByUUID(server: MinecraftServer, id: UUID): ServerPlayer;
    static normalize(profile: GameProfile): GameProfile;
    static randomColor(): Color4I;
  }


  interface PartyTeam extends AbstractTeam {}
  class PartyTeam extends AbstractTeam {
    constructor(manager: TeamManagerImpl, id: UUID);
    addAlly(source: CommandSourceStack, players: Collection<GameProfile>): number;
    demote(from: ServerPlayer, players: Collection<GameProfile>): number;
    deserializeNBT(tag: CompoundTag, provider: Provider): void;
    forceDisband(from: CommandSourceStack): number;
    get owner(): UUID;
    get type(): TeamType;
    getRankForPlayer(playerId: UUID): TeamRank;
    invite(inviter: ServerPlayer, profiles: Collection<GameProfile>): number;
    isOwner(profile: UUID): boolean;
    isPartyTeam(): boolean;
    join(player: ServerPlayer): number;
    join(player: ServerPlayer, playerProfile: GameProfile): number;
    kick(from: CommandSourceStack, players: Collection<GameProfile>): number;
    leave(id: UUID): number;
    listAllies(source: CommandSourceStack): number;
    promote(from: ServerPlayer, players: Collection<GameProfile>): number;
    removeAlly(source: CommandSourceStack, players: Collection<GameProfile>): number;
    transferOwnership(from: CommandSourceStack, toProfiles: Collection<GameProfile>): number;
    transferOwnership(from: CommandSourceStack, toProfile: GameProfile): number;
  }


  interface PlayerTeam extends AbstractTeam {}
  class PlayerTeam extends AbstractTeam {
    constructor(manager: TeamManagerImpl, id: UUID);
    createClientPlayer(): KnownClientPlayer;
    createParty(playerId: UUID, player: ServerPlayer, name: string, description: string, color: number, invited: Set<GameProfile>): Team;
    createParty(description: string, color: Color4I): Team;
    deserializeNBT(tag: CompoundTag, provider: Provider): void;
    get effectiveTeam(): AbstractTeam;
    get onlineMembers(): ServerPlayer[];
    get player(): ServerPlayer;
    get playerName(): string;
    get teamId(): UUID;
    get type(): TeamType;
    getRankForPlayer(playerId: UUID): TeamRank;
    hasTeam(): boolean;
    isOnline(): boolean;
    isPlayerTeam(): boolean;
    set effectiveTeam(effectiveTeam: AbstractTeam);
    set playerName(playerName: string);
    setOnline(online: boolean): void;
    updatePresence(): void;
  }


  interface ServerTeam extends AbstractTeam {}
  class ServerTeam extends AbstractTeam {
    constructor(manager: TeamManagerImpl, id: UUID);
    delete(source: CommandSourceStack): number;
    get type(): TeamType;
    isServerTeam(): boolean;
  }


  interface TeamArgument extends ArgumentType<TeamArgumentProvider> {}
  class TeamArgument extends ArgumentType<TeamArgumentProvider> {
    static readonly ALREADY_IN_PARTY: SimpleCommandExceptionType;
    static readonly PLAYER_IN_PARTY: DynamicCommandExceptionType;
    static readonly NOT_IN_PARTY: SimpleCommandExceptionType;
    static readonly TEAM_NOT_FOUND: DynamicCommandExceptionType;
    static readonly CANT_EDIT: DynamicCommandExceptionType;
    static readonly NOT_MEMBER: Dynamic2CommandExceptionType;
    static readonly NOT_OFFICER: Dynamic2CommandExceptionType;
    static readonly NOT_INVITED: DynamicCommandExceptionType;
    static readonly OWNER_CANT_LEAVE: SimpleCommandExceptionType;
    static readonly CANT_KICK_OWNER: SimpleCommandExceptionType;
    static readonly API_OVERRIDE: SimpleCommandExceptionType;
    static readonly NAME_TOO_SHORT: SimpleCommandExceptionType;
    static readonly NO_PERMISSION: SimpleCommandExceptionType;
    static readonly TEAM_ALREADY_EXISTS: DynamicCommandExceptionType;
    static create(): TeamArgument;
    static create(type: TeamType): TeamArgument;
    static get(context: CommandContext<CommandSourceStack>, name: string): Team;
    listSuggestions<S>(commandContext: CommandContext<S>, builder: SuggestionsBuilder): CompletableFuture<Suggestions>;
    parse(reader: StringReader): TeamArgumentProvider;
  }


  class TeamArgumentProvider {
    getTeam(var1: CommandSourceStack): Team;
  }


  interface TeamType extends Enum<TeamType> {}
  class TeamType extends Enum<TeamType> {
    static readonly PLAYER: TeamType;
    static readonly PARTY: TeamType;
    static readonly SERVER: TeamType;
    createTeam(manager: TeamManagerImpl, id: UUID): AbstractTeam;
    get color(): ChatFormatting;
    get serializedName(): string;
    matches(team: Team): boolean;
    static valueOf(name: string): TeamType;
    static values(): TeamType[];
  }

}

declare module 'dev.ftb.mods.ftbteams.data.TeamArgument' {
  import { ArgumentTypeInfo } from 'net.minecraft.commands.synchronization';
  import { TeamArgument } from 'dev.ftb.mods.ftbteams.data';
  import { Template } from 'dev.ftb.mods.ftbteams.data.TeamArgument.Info';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { JsonObject } from 'com.google.gson';

  interface Info extends ArgumentTypeInfo<TeamArgument, Template> {}
  class Info extends ArgumentTypeInfo<TeamArgument, Template> {
    deserializeFromNetwork(buf: FriendlyByteBuf): Template;
    serializeToJson(template: Template, jsonObject: JsonObject): void;
    serializeToNetwork(template: Template, buf: FriendlyByteBuf): void;
    unpack(argumentType: TeamArgument): Template;
  }

}

declare module 'dev.ftb.mods.ftbteams.data.TeamArgument.Info' {
  import { Template as argumenttypeinfo_Template } from 'ArgumentTypeInfo';
  import { TeamArgument, TeamType } from 'dev.ftb.mods.ftbteams.data';
  import { CommandBuildContext } from 'net.minecraft.commands';
  import { ArgumentTypeInfo } from 'net.minecraft.commands.synchronization';

  interface Template extends argumenttypeinfo_Template<TeamArgument> {}
  class Template extends argumenttypeinfo_Template<TeamArgument> {
    constructor(teamType: TeamType);
    instantiate(commandBuildContext: CommandBuildContext): TeamArgument;
    type(): ArgumentTypeInfo<TeamArgument, any>;
  }

}

declare module 'dev.ftb.mods.ftbteams' {
  import { Logger } from 'org.apache.logging.log4j';

  class FTBTeams {
    static readonly LOGGER: Logger;
    constructor();
  }

}

declare module 'dev.ftb.mods.ftbteams.neoforge' {
  import { DeferredRegister, DeferredHolder } from 'net.neoforged.neoforge.registries';
  import { IEventBus } from 'net.neoforged.bus.api';

  class ArgumentTypes {
    static readonly COMMAND_ARGUMENT_TYPES: DeferredRegister;
    static readonly TEAM_ARGUMENT: DeferredHolder;
    static readonly TEAM_PROPERTY_ARGUMENT: DeferredHolder;
  }


  class FTBTeamsNeoForge {
    constructor(modEventBus: IEventBus);
  }

}

declare module 'dev.ftb.mods.ftbteams.net' {
  import { Enum } from 'java.lang';
  import { Type } from 'CustomPacketPayload';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { PacketContext } from 'NetworkManager';
  import { List } from 'java.util';

  class FTBTeamsNet {
    static register(): void;
  }


  interface ToggleChatRedirectionMessage extends Enum<ToggleChatRedirectionMessage> {}
  class ToggleChatRedirectionMessage extends Enum<ToggleChatRedirectionMessage> {
    static readonly INSTANCE: ToggleChatRedirectionMessage;
    static handle(ignored: ToggleChatRedirectionMessage, packetContext: PacketContext): void;
    type(): Type<CustomPacketPayload>;
    static valueOf(name: string): ToggleChatRedirectionMessage;
    static values(): ToggleChatRedirectionMessage[];
  }

}

declare module 'dev.ftb.mods.ftbteams.net.PlayerGUIOperationMessage' {
  import { Enum } from 'java.lang';
  import { KnownClientPlayer } from 'dev.ftb.mods.ftbteams.api.client';
  import { List } from 'java.util';

  interface Operation extends Enum<Operation> {}
  class Operation extends Enum<Operation> {
    static readonly PROMOTE: Operation;
    static readonly DEMOTE: Operation;
    static readonly LEAVE: Operation;
    static readonly KICK: Operation;
    static readonly TRANSFER_OWNER: Operation;
    static readonly INVITE: Operation;
    static readonly ADD_ALLY: Operation;
    static readonly REMOVE_ALLY: Operation;
    sendMessage(target: KnownClientPlayer): void;
    static valueOf(name: string): Operation;
    static values(): Operation[];
  }

}