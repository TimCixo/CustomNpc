declare module 'ludichat.cobbreeding' {
  import { Logger } from 'org.slf4j';
  import { HashMap, Map, List, Collection } from 'java.util';
  import { DeferredRegister } from 'dev.architectury.registry.registries';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { PacketRegisterInfo } from 'com.cobblemon.mod.common.net';
  import { ToggleBreedingPacket, ToggleNeuterPacket, ToggledNeuterPacket } from 'ludichat.cobbreeding.network';
  import { Post } from 'HatchEggEvent';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { Companion } from 'ludichat.cobbreeding.Config';
  import { Float, Iterable } from 'java.lang';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { SerializationConstructorMarker } from 'kotlinx.serialization.internal';
  import { CompositeEncoder } from 'kotlinx.serialization.encoding';
  import { SerialDescriptor } from 'kotlinx.serialization.descriptors';
  import { Lazy } from 'kotlin';
  import { BooleanProperty } from 'net.minecraft.world.level.block.state.properties';
  import { CustomPokemonPropertyType } from 'com.cobblemon.mod.common.api.properties';
  import { BooleanProperty as com_cobblemon_mod_common_pokemon_properties_BooleanProperty } from 'com.cobblemon.mod.common.pokemon.properties';
  import { Companion as ludichat_cobbreeding_neuterproperty_Companion } from 'ludichat.cobbreeding.NeuterProperty';
  import { Companion as ludichat_cobbreeding_pasturebreedingdata_Companion } from 'ludichat.cobbreeding.PastureBreedingData';
  import { NonNullList } from 'net.minecraft.core';
  import { Container } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';

  class Cobbreeding {
    static readonly INSTANCE: Cobbreeding;
    static readonly MOD_ID: string;
    static readonly VERSION: string;
    static readonly ENCRYPTION_KEY_PATH: string;
    static readonly LOGGER: Logger;
    static readonly EGG_ITEMS: HashMap;
    static config: Config;
    get bREEDING_PACKET_INFO(): PacketRegisterInfo<ToggleBreedingPacket>;
    get config(): Config;
    get iTEMS$common(): DeferredRegister<Item>;
    get nEUTERED_PACKET_INFO(): PacketRegisterInfo<ToggledNeuterPacket>;
    get nEUTER_PACKET_INFO(): PacketRegisterInfo<ToggleNeuterPacket>;
    get sHINY_ERROR_FLAG(): boolean;
    init(): void;
    invoke(p0: RegistryFriendlyByteBuf): ToggleBreedingPacket;
    invoke(p0: RegistryFriendlyByteBuf): ToggleNeuterPacket;
    invoke(p0: RegistryFriendlyByteBuf): ToggledNeuterPacket;
    loadConfig(): void;
    onHatch(event: Post): void;
    reloadConfig(): void;
    saveConfig(): void;
    set config(config: Config);
    set sHINY_ERROR_FLAG(bl: boolean);
  }


  class Config {
    static readonly Companion: Companion;
    constructor(minBreedingTimeInTicks: number, maxBreedingTimeInTicks: number, mirrorHerbTimeInTicks: number, eggHatchMultiplier: number, shinyMethod: Map<string, number>, hiddenAbilitiesEnabled: boolean, forcedAbilitiesEnabled: boolean, dittoAndDittoRandomEgg: boolean, dittoAndDittoAllowLegendary: boolean, dittoAndDittoAllowParadox: boolean, dittoAndDittoAllowUltraBeast: boolean, dittoAndDittoAllowUndiscovered: boolean, allowHoppersToPullFromPastureBlock: boolean, inheritedFeatures: string[], maxNumberOfActivatedPasturePerPlayer: number, pastureInventorySize: number, eggEncryptionEnabled: boolean, cobblemonSizeVariationsCompatEnabled: boolean);

    constructor(n: number, n2: number, n3: number, f: number, map: Map, bl: boolean, bl2: boolean, bl3: boolean, bl4: boolean, bl5: boolean, bl6: boolean, bl7: boolean, bl8: boolean, list: List, n4: number, n5: number, bl9: boolean, bl10: boolean, n6: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(seen0: number, minBreedingTimeInTicks: number, maxBreedingTimeInTicks: number, mirrorHerbTimeInTicks: number, eggHatchMultiplier: number, shinyMethod: Map, hiddenAbilitiesEnabled: boolean, forcedAbilitiesEnabled: boolean, dittoAndDittoRandomEgg: boolean, dittoAndDittoAllowLegendary: boolean, dittoAndDittoAllowParadox: boolean, dittoAndDittoAllowUltraBeast: boolean, dittoAndDittoAllowUndiscovered: boolean, allowHoppersToPullFromPastureBlock: boolean, inheritedFeatures: List, maxNumberOfActivatedPasturePerPlayer: number, pastureInventorySize: number, eggEncryptionEnabled: boolean, cobblemonSizeVariationsCompatEnabled: boolean, serializationConstructorMarker: SerializationConstructorMarker);

    constructor();
    static access$get$childSerializers$cp(): Lazy[];
    component1(): number;
    component10(): boolean;
    component11(): boolean;
    component12(): boolean;
    component13(): boolean;
    component14(): string[];
    component15(): number;
    component16(): number;
    component17(): boolean;
    component18(): boolean;
    component2(): number;
    component3(): number;
    component4(): number;
    component5(): Map<string, number>;
    component6(): boolean;
    component7(): boolean;
    component8(): boolean;
    component9(): boolean;
    copy(minBreedingTimeInTicks: number, maxBreedingTimeInTicks: number, mirrorHerbTimeInTicks: number, eggHatchMultiplier: number, shinyMethod: Map<string, number>, hiddenAbilitiesEnabled: boolean, forcedAbilitiesEnabled: boolean, dittoAndDittoRandomEgg: boolean, dittoAndDittoAllowLegendary: boolean, dittoAndDittoAllowParadox: boolean, dittoAndDittoAllowUltraBeast: boolean, dittoAndDittoAllowUndiscovered: boolean, allowHoppersToPullFromPastureBlock: boolean, inheritedFeatures: string[], maxNumberOfActivatedPasturePerPlayer: number, pastureInventorySize: number, eggEncryptionEnabled: boolean, cobblemonSizeVariationsCompatEnabled: boolean): Config;
    static copy$default(config: Config, n: number, n2: number, n3: number, f: number, map: Map, bl: boolean, bl2: boolean, bl3: boolean, bl4: boolean, bl5: boolean, bl6: boolean, bl7: boolean, bl8: boolean, list: List, n4: number, n5: number, bl9: boolean, bl10: boolean, n6: number, object: any): Config;
    equals(other: any): boolean;
    get allowHoppersToPullFromPastureBlock(): boolean;
    static get allowHoppersToPullFromPastureBlock$annotations(): void;
    get cobblemonSizeVariationsCompatEnabled(): boolean;
    static get cobblemonSizeVariationsCompatEnabled$annotations(): void;
    get dittoAndDittoAllowLegendary(): boolean;
    static get dittoAndDittoAllowLegendary$annotations(): void;
    get dittoAndDittoAllowParadox(): boolean;
    static get dittoAndDittoAllowParadox$annotations(): void;
    get dittoAndDittoAllowUltraBeast(): boolean;
    static get dittoAndDittoAllowUltraBeast$annotations(): void;
    get dittoAndDittoAllowUndiscovered(): boolean;
    static get dittoAndDittoAllowUndiscovered$annotations(): void;
    get dittoAndDittoRandomEgg(): boolean;
    static get dittoAndDittoRandomEgg$annotations(): void;
    get eggEncryptionEnabled(): boolean;
    static get eggEncryptionEnabled$annotations(): void;
    get eggHatchMultiplier(): number;
    static get eggHatchMultiplier$annotations(): void;
    get forcedAbilitiesEnabled(): boolean;
    static get forcedAbilitiesEnabled$annotations(): void;
    get hiddenAbilitiesEnabled(): boolean;
    static get hiddenAbilitiesEnabled$annotations(): void;
    get inheritedFeatures(): string[];
    static get inheritedFeatures$annotations(): void;
    get maxBreedingTimeInTicks(): number;
    static get maxBreedingTimeInTicks$annotations(): void;
    get maxNumberOfActivatedPasturePerPlayer(): number;
    static get maxNumberOfActivatedPasturePerPlayer$annotations(): void;
    get minBreedingTimeInTicks(): number;
    static get minBreedingTimeInTicks$annotations(): void;
    get mirrorHerbTimeInTicks(): number;
    static get mirrorHerbTimeInTicks$annotations(): void;
    get pastureInventorySize(): number;
    static get pastureInventorySize$annotations(): void;
    get shinyMethod(): Map<string, number>;
    static get shinyMethod$annotations(): void;
    hashCode(): number;
    set allowHoppersToPullFromPastureBlock(bl: boolean);
    set cobblemonSizeVariationsCompatEnabled(bl: boolean);
    set dittoAndDittoAllowLegendary(bl: boolean);
    set dittoAndDittoAllowParadox(bl: boolean);
    set dittoAndDittoAllowUltraBeast(bl: boolean);
    set dittoAndDittoAllowUndiscovered(bl: boolean);
    set dittoAndDittoRandomEgg(bl: boolean);
    set eggEncryptionEnabled(bl: boolean);
    set eggHatchMultiplier(f: number);
    set forcedAbilitiesEnabled(bl: boolean);
    set hiddenAbilitiesEnabled(bl: boolean);
    set inheritedFeatures(list: string[]);
    set maxBreedingTimeInTicks(n: number);
    set maxNumberOfActivatedPasturePerPlayer(n: number);
    set minBreedingTimeInTicks(n: number);
    set mirrorHerbTimeInTicks(n: number);
    set pastureInventorySize(n: number);
    set shinyMethod(map: Map<string, number>);
    toString(): string;
    static write$Self$common(self: Config, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
  }


  class CustomProperties {
    static readonly INSTANCE: CustomProperties;
    static readonly HAS_EGG: BooleanProperty;
    static readonly BREEDING_ACTIVATED: BooleanProperty;
  }


  interface NeuterProperty extends CustomPokemonPropertyType<com_cobblemon_mod_common_pokemon_properties_BooleanProperty> {}
  class NeuterProperty extends CustomPokemonPropertyType<com_cobblemon_mod_common_pokemon_properties_BooleanProperty> {
    static readonly Companion: ludichat_cobbreeding_neuterproperty_Companion;
    create(value: boolean): com_cobblemon_mod_common_pokemon_properties_BooleanProperty;
    examples(): Collection<string>;
    fromString(value: string): com_cobblemon_mod_common_pokemon_properties_BooleanProperty;
    get keys(): Iterable<string>;
    get needsKey(): boolean;
  }


  class PastureBreedingData {
    static readonly Companion: ludichat_cobbreeding_pasturebreedingdata_Companion;
    static readonly registry: Map;
    constructor(time: number, eggs: NonNullList<ItemStack>, requiredTicks: number);
    get eggs(): NonNullList<ItemStack>;
    get requiredTicks(): number;
    get time(): number;
    set eggs(nonNullList: NonNullList<ItemStack>);
    set requiredTicks(n: number);
    set time(l: number);
  }


  interface PastureInventory extends Container {}
  class PastureInventory extends Container {
    clearContent(): void;
    get containerSize(): number;
    get item(): ItemStack;
    get items(): NonNullList<ItemStack>;
    getItem(slot: number): ItemStack;
    isEmpty(): boolean;
    static of(items: NonNullList<ItemStack>): PastureInventory;
    static ofSize(size: number): PastureInventory;
    removeItem(slot: number, count: number): ItemStack;
    removeItemNoUpdate(): ItemStack;
    removeItemNoUpdate(slot: number): ItemStack;
    setChanged(): void;
    setItem(slot: number, stack: ItemStack): void;
    stillValid(player: Player): boolean;
  }

}

declare module 'ludichat.cobbreeding.commands.alias' {
  import { ICommand } from 'ludichat.cobbreeding.commands';
  import { LiteralArgumentBuilder } from 'com.mojang.brigadier.builder';
  import { CommandSourceStack } from 'net.minecraft.commands';

  interface GivePokemonEgg extends ICommand {}
  class GivePokemonEgg extends ICommand {
    static readonly INSTANCE: GivePokemonEgg;
    get (): any;
    get command(): LiteralArgumentBuilder<CommandSourceStack>;
  }


  interface HatchPokemonEgg extends ICommand {}
  class HatchPokemonEgg extends ICommand {
    static readonly INSTANCE: HatchPokemonEgg;
    get (): any;
    get command(): LiteralArgumentBuilder<CommandSourceStack>;
  }

}

declare module 'ludichat.cobbreeding.commands' {
  import { Permission, PermissionLevel } from 'com.cobblemon.mod.common.api.permission';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack, CommandBuildContext } from 'net.minecraft.commands';
  import { CommandSelection } from 'Commands';
  import { LiteralArgumentBuilder } from 'com.mojang.brigadier.builder';

  interface CobbreedingPermission extends Permission {}
  class CobbreedingPermission extends Permission {
    constructor(node: string, level: PermissionLevel);
    component2(): PermissionLevel;
    copy(node: string, level: PermissionLevel): CobbreedingPermission;
    static copy$default(cobbreedingPermission: CobbreedingPermission, string: string, permissionLevel: PermissionLevel, n: number, object: any): CobbreedingPermission;
    equals(other: any): boolean;
    get identifier(): ResourceLocation;
    get level(): PermissionLevel;
    get literal(): string;
    hashCode(): number;
    toString(): string;
  }


  class Commands {
    static readonly INSTANCE: Commands;
    register(dispatcher: CommandDispatcher<CommandSourceStack>, registry: CommandBuildContext, selection: CommandSelection): void;
  }


  class ICommand {
    get command(): LiteralArgumentBuilder<CommandSourceStack>;
    register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }

}

declare module 'ludichat.cobbreeding.commands.ICommand' {
  import { ICommand } from 'ludichat.cobbreeding.commands';
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack } from 'net.minecraft.commands';

  class DefaultImpls {
    static register($this: ICommand, dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }

}

declare module 'ludichat.cobbreeding.commands.main' {
  import { ICommand } from 'ludichat.cobbreeding.commands';
  import { LiteralArgumentBuilder } from 'com.mojang.brigadier.builder';
  import { CommandSourceStack } from 'net.minecraft.commands';

  interface CobbreedingCommand extends ICommand {}
  class CobbreedingCommand extends ICommand {
    static readonly INSTANCE: CobbreedingCommand;
    get command(): LiteralArgumentBuilder<CommandSourceStack>;
  }


  interface InfoCommand extends ICommand {}
  class InfoCommand extends ICommand {
    static readonly INSTANCE: InfoCommand;
    get command(): LiteralArgumentBuilder<CommandSourceStack>;
  }


  interface ReloadCommand extends ICommand {}
  class ReloadCommand extends ICommand {
    static readonly INSTANCE: ReloadCommand;
    get command(): LiteralArgumentBuilder<CommandSourceStack>;
  }

}

declare module 'ludichat.cobbreeding.commands.main.eggCommands' {
  import { ICommand } from 'ludichat.cobbreeding.commands';
  import { LiteralArgumentBuilder } from 'com.mojang.brigadier.builder';
  import { CommandSourceStack } from 'net.minecraft.commands';

  interface EggCommand extends ICommand {}
  class EggCommand extends ICommand {
    static readonly INSTANCE: EggCommand;
    get command(): LiteralArgumentBuilder<CommandSourceStack>;
  }


  interface EggDecryptCommand extends ICommand {}
  class EggDecryptCommand extends ICommand {
    static readonly INSTANCE: EggDecryptCommand;
    get command(): LiteralArgumentBuilder<CommandSourceStack>;
  }


  interface EggGiveCommand extends ICommand {}
  class EggGiveCommand extends ICommand {
    static readonly INSTANCE: EggGiveCommand;
    get command(): LiteralArgumentBuilder<CommandSourceStack>;
    get commandAlias$common(): LiteralArgumentBuilder<CommandSourceStack>;
    static get commandAlias$common$annotations(): void;
  }


  interface EggHatchCommand extends ICommand {}
  class EggHatchCommand extends ICommand {
    static readonly INSTANCE: EggHatchCommand;
    get command(): LiteralArgumentBuilder<CommandSourceStack>;
    get commandAlias$common(): LiteralArgumentBuilder<CommandSourceStack>;
    static get commandAlias$common$annotations(): void;
  }

}

declare module 'ludichat.cobbreeding.compat' {
  import { Function1 } from 'kotlin.jvm.functions';
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';
  import { Unit } from 'kotlin';

  class CobblemonSizeVariations {
    static readonly INSTANCE: CobblemonSizeVariations;
    static enable(event: Function1<Pokemon, Unit>): void;
    static get enabled(): boolean;
    static get enabled$annotations(): void;
    static get event(): Function1<Pokemon, Unit>;
    static get event$annotations(): void;
    static set event(function1: Function1<Pokemon, Unit>);
  }

}

declare module 'ludichat.cobbreeding.components' {
  import { RegistrySupplier, DeferredRegister } from 'dev.architectury.registry.registries';
  import { DataComponentType } from 'net.minecraft.core.component';

  class CobbreedingComponents {
    static readonly INSTANCE: CobbreedingComponents;
    static readonly NAME: RegistrySupplier;
    static readonly TIMER: RegistrySupplier;
    static readonly SECOND: RegistrySupplier;
    static readonly EGG_INFO: RegistrySupplier;
    static readonly POKEMON_PROPERTIES: RegistrySupplier;
    static readonly VERSION: RegistrySupplier;
    get cOMPONENT_TYPES$common(): DeferredRegister<DataComponentType<any>>;
  }

}

declare module 'ludichat.cobbreeding.Config' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Gson } from 'com.google.gson';
  import { KSerializer } from 'kotlinx.serialization';
  import { Config } from 'ludichat.cobbreeding';
  import { Map, List } from 'java.util';
  import { Float } from 'java.lang';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get gSON(): Gson;
    serializer(): KSerializer<Config>;
  }


  class Defaults {
    static readonly INSTANCE: Defaults;
    static readonly MIN_BREEDING_TIME_IN_TICKS: number;
    static readonly MAX_BREEDING_TIME_IN_TICKS: number;
    static readonly MIRROR_HERB_TIME_IN_TICKS: number;
    static readonly EGG_HATCH_MULTIPLIER: number;
    static readonly HIDDEN_ABILITIES_ENABLED: boolean;
    static readonly FORCED_ABILITIES_ENABLED: boolean;
    static readonly DITTO_AND_DITTO_RANDOM_EGG: boolean;
    static readonly DITTO_AND_DITTO_ALLOW_LEGENDARY: boolean;
    static readonly DITTO_AND_DITTO_ALLOW_PARADOX: boolean;
    static readonly DITTO_AND_DITTO_ALLOW_ULTRA_BEAST: boolean;
    static readonly DITTO_AND_DITTO_ALLOW_UNDISCOVERED: boolean;
    static readonly ALLOW_HOPPERS_TO_PULL_FROM_PASTURE_BLOCK: boolean;
    static readonly MAX_PASTURE: number;
    static readonly PASTURE_INVENTORY_SIZE: number;
    static readonly EGG_ENCRYPTION_ENABLED: boolean;
    static readonly COBBLEMON_SIZE_VARIATIONS_COMPAT_ENABLED: boolean;
    get iNHERITED_FEATURES(): string[];
    static get iNHERITED_FEATURES$annotations(): void;
    get sHINY_METHOD(): Map<string, number>;
  }

}

declare module 'ludichat.cobbreeding.forge' {
  import { AddPackFindersEvent } from 'net.neoforged.neoforge.event';
  import { FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';
  import { NetworkManager } from 'com.cobblemon.mod.common';
  import { RegisterPayloadHandlersEvent } from 'net.neoforged.neoforge.network.event';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { NetworkPacket } from 'com.cobblemon.mod.common.api.net';

  class Cobbreeding {
    static readonly INSTANCE: Cobbreeding;
    onAddPackFindersEvent(event: AddPackFindersEvent): void;
    onClientSetup(event: FMLClientSetupEvent): void;
  }


  interface CobbreedingNeoforgeNetworkManager extends NetworkManager {}
  class CobbreedingNeoforgeNetworkManager extends NetworkManager {
    static readonly INSTANCE: CobbreedingNeoforgeNetworkManager;
    static readonly PROTOCOL_VERSION: string;
    registerMessages(event: RegisterPayloadHandlersEvent): void;
    sendPacketToPlayer(player: ServerPlayer, packet: NetworkPacket<any>): void;
    sendToServer(packet: NetworkPacket<any>): void;
  }

}

declare module 'ludichat.cobbreeding.gui' {
  import { ConfigBuilder } from 'me.shedaniel.clothconfig2.api';
  import { AbstractWidget, Tooltip } from 'net.minecraft.client.gui.components';
  import { BlockPos } from 'net.minecraft.core';
  import { SoundManager } from 'net.minecraft.client.sounds';
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';

  class ConfigGui {
    static readonly INSTANCE: ConfigGui;
    create(): ConfigBuilder;
  }


  interface PastureBreedingButton extends AbstractWidget {}
  class PastureBreedingButton extends AbstractWidget {
    constructor(x: number, y: number, width: number, height: number, blockPos: BlockPos);
    onClick(mouseX: number, mouseY: number): void;
    playDownSound(soundManager: SoundManager): void;
    setTooltip(tooltip: Tooltip): void;
  }


  interface ToggleNeuterButton extends AbstractWidget {}
  class ToggleNeuterButton extends AbstractWidget {
    constructor(x: number, y: number, width: number, height: number, pokemon: Pokemon);
    onClick(mouseX: number, mouseY: number): void;
    playDownSound(soundManager: SoundManager): void;
  }

}

declare module 'ludichat.cobbreeding.mixin' {
  import { Block } from 'net.minecraft.world.level.block';
  import { Properties } from 'BlockBehaviour';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { BlockEntity, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { PastureInventory } from 'ludichat.cobbreeding';
  import { WorldlyContainer } from 'net.minecraft.world';
  import { BlockPos, NonNullList, Direction } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { ItemStack } from 'net.minecraft.world.item';
  import { SoundlessWidget } from 'com.cobblemon.mod.common.client.gui.summary.widgets';
  import { Component } from 'net.minecraft.network.chat';

  class ItemStackMixin {
  }


  interface PastureBlockMixin extends Block {}
  class PastureBlockMixin extends Block {
    constructor(settings: Properties);
  }


  interface PastureGUIMixin extends Screen {}
  class PastureGUIMixin extends Screen {
    static BASE_WIDTH: number;
    static BASE_HEIGHT: number;
    onInit(ci: CallbackInfo): void;
  }


  interface PokemonPastureBlockEntityMixin extends PastureInventory, WorldlyContainer, BlockEntity {}
  class PokemonPastureBlockEntityMixin extends PastureInventory {
    constructor(type: BlockEntityType<any>, pos: BlockPos, blockState: BlockState);
    canPlaceItemThroughFace(slot: number, stack: ItemStack, direction: Direction): boolean;
    canTakeItemThroughFace(slot: number, stack: ItemStack, direction: Direction): boolean;
    get items(): NonNullList<ItemStack>;
    getSlotsForFace(direction: Direction): number[];
  }


  interface PokemonSummaryInfoWidgetMixin extends SoundlessWidget {}
  class PokemonSummaryInfoWidgetMixin extends SoundlessWidget {
    constructor(pX: number, pY: number, pWidth: number, pHeight: number, component: Component);
  }

}

declare module 'ludichat.cobbreeding.network' {
  import { NetworkPacket, ServerNetworkPacketHandler, ClientNetworkPacketHandler } from 'com.cobblemon.mod.common.api.net';
  import { Companion } from 'ludichat.cobbreeding.network.ToggleBreedingPacket';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { MinecraftServer } from 'net.minecraft.server';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Companion as ludichat_cobbreeding_network_toggledneuterpacket_Companion } from 'ludichat.cobbreeding.network.ToggledNeuterPacket';
  import { UUID } from 'java.util';
  import { Minecraft } from 'net.minecraft.client';
  import { Companion as ludichat_cobbreeding_network_toggleneuterpacket_Companion } from 'ludichat.cobbreeding.network.ToggleNeuterPacket';

  interface ToggleBreedingPacket extends NetworkPacket<ToggleBreedingPacket> {}
  class ToggleBreedingPacket extends NetworkPacket<ToggleBreedingPacket> {
    static readonly Companion: Companion;
    encode(buffer: RegistryFriendlyByteBuf): void;
    get id(): ResourceLocation;
  }


  interface ToggleBreedingPacketPacketHandler extends ServerNetworkPacketHandler<ToggleBreedingPacket> {}
  class ToggleBreedingPacketPacketHandler extends ServerNetworkPacketHandler<ToggleBreedingPacket> {
    static readonly INSTANCE: ToggleBreedingPacketPacketHandler;
    handle(packet: ToggleBreedingPacket, server: MinecraftServer, player: ServerPlayer): void;
  }


  interface ToggledNeuterPacket extends NetworkPacket<ToggledNeuterPacket> {}
  class ToggledNeuterPacket extends NetworkPacket<ToggledNeuterPacket> {
    static readonly Companion: ludichat_cobbreeding_network_toggledneuterpacket_Companion;
    constructor(pokemonId: UUID, value: boolean);
    encode(buffer: RegistryFriendlyByteBuf): void;
    get id(): ResourceLocation;
    get pokemonId(): UUID;
    get value(): boolean;
  }


  interface ToggledNeuterPacketHandler extends ClientNetworkPacketHandler<ToggledNeuterPacket> {}
  class ToggledNeuterPacketHandler extends ClientNetworkPacketHandler<ToggledNeuterPacket> {
    static readonly INSTANCE: ToggledNeuterPacketHandler;
    handle(packet: ToggledNeuterPacket, client: Minecraft): void;
  }


  interface ToggleNeuterPacket extends NetworkPacket<ToggleNeuterPacket> {}
  class ToggleNeuterPacket extends NetworkPacket<ToggleNeuterPacket> {
    static readonly Companion: ludichat_cobbreeding_network_toggleneuterpacket_Companion;
    constructor(pokemonId: UUID);
    encode(buffer: RegistryFriendlyByteBuf): void;
    get id(): ResourceLocation;
    get pokemonId(): UUID;
  }


  interface ToggleNeuterPacketHandler extends ServerNetworkPacketHandler<ToggleNeuterPacket> {}
  class ToggleNeuterPacketHandler extends ServerNetworkPacketHandler<ToggleNeuterPacket> {
    static readonly INSTANCE: ToggleNeuterPacketHandler;
    handle(packet: ToggleNeuterPacket, server: MinecraftServer, player: ServerPlayer): void;
  }

}

declare module 'ludichat.cobbreeding.network.ToggleBreedingPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ToggleBreedingPacket } from 'ludichat.cobbreeding.network';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): ToggleBreedingPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'ludichat.cobbreeding.network.ToggledNeuterPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ToggledNeuterPacket } from 'ludichat.cobbreeding.network';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): ToggledNeuterPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'ludichat.cobbreeding.network.ToggleNeuterPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ToggleNeuterPacket } from 'ludichat.cobbreeding.network';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): ToggleNeuterPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'ludichat.cobbreeding.NeuterProperty' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';
  import { PokemonEntity } from 'com.cobblemon.mod.common.entity.pokemon';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    applyToPokemon(pokemon: Pokemon, value: boolean): void;
    applyToPokemonEntity(pokemon: PokemonEntity, value: boolean): void;
    get(pokemon: Pokemon): boolean;
    matchPokemon(pokemon: Pokemon, value: boolean): boolean;
    matchPokemonEntity(pokemon: PokemonEntity, value: boolean): boolean;
  }

}

declare module 'ludichat.cobbreeding.PastureBreedingData' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
  }

}

declare module 'ludichat.cobbreeding.utils' {
  import { File } from 'java.io';
  import { UUID, List } from 'java.util';
  import { SecretKey } from 'javax.crypto';
  import { Pair } from 'kotlin';

  class CobbreedingFile {
    static readonly INSTANCE: CobbreedingFile;
    static addCompoundTag(file: File, key: string, posValue: number[], uuidValue: UUID): void;
    static generateAESKey(encryptionFile: File, keySize: number): void;
    static generateAESKey$default(file: File, n: number, n2: number, object: any): void;
    static get encryptionKey(): SecretKey;
    static getNumberOfActivatedPastures(file: File): number;
    static getUuid(file: File, key: string): UUID;
    static removeCompoundTag(file: File, key: string): void;
  }


  class MutablePair<A = any, B = any> {
    constructor(first: A, second: B);
    get first(): A;
    get second(): B;
    set first(a: A);
    set second(b: B);
    toPair(): Pair<A, B>;
  }


  class MutablePairKt {
    static toMutablePair<A, B>($this$toMutablePair: Pair<A, B>): MutablePair<A, B>;
  }


  class SemVer {
    constructor(components: string[]);
    compareTo(ver: number): number;
    compareTo(ver: string): number;
    compareTo(ver: SemVer): number;
    get components(): string[];
    get major(): number;
    get minor(): number;
    get others(): string[];
    get patch(): number;
  }


  class SemVerKt {
    static toSemVer($this$toSemVer: string): SemVer;
  }

}