declare module 'dev.cudzer.cobblemonsizevariation' {
  import { Logger } from 'org.slf4j';
  import { SizeDataManager } from 'dev.cudzer.cobblemonsizevariation.sizing';
  import { ISizer } from 'dev.cudzer.cobblemonsizevariation.sizing.algorithms';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { Path } from 'java.nio.file';
  import { NetworkManager } from 'com.cobblemon.mod.common';

  class CobblemonSizeVariation {
    static readonly MOD_ID: string;
    static readonly LOGGER: Logger;
    static sizeDataManager: SizeDataManager;
    static SIZER: ISizer;
    static platform: Platform;
    static dependencyChecker: ModDependencyChecker;
    static cobblemonSizeResource(path: string): ResourceLocation;
    static init(modPlatform: Platform): void;
    static registerCommands(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }


  class ModDependencyChecker {
    IsCobblemonRideOnInstalled: boolean;
    constructor(platform: Platform);
    checkDependencies(): void;
  }


  class Platform {
    get configDirectory(): Path;
    get networkManager(): NetworkManager;
    isModInstalled(var1: string): boolean;
  }

}

declare module 'dev.cudzer.cobblemonsizevariation.command' {
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class ChangeSizeCommand {
    static registerCommand(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }


  interface PartySlot extends Enum<PartySlot> {}
  class PartySlot extends Enum<PartySlot> {
    static readonly Slot1: PartySlot;
    static readonly Slot2: PartySlot;
    static readonly Slot3: PartySlot;
    static readonly Slot4: PartySlot;
    static readonly Slot5: PartySlot;
    static readonly Slot6: PartySlot;
    get displayText(): string;
    get slot(): number;
    static valueOf(name: string): PartySlot;
    static values(): PartySlot[];
  }

}

declare module 'dev.cudzer.cobblemonsizevariation.config' {
  import { HashMap } from 'java.util';
  import { Path } from 'java.nio.file';

  class ConfigKey {
    static readonly SIZE_MODIFICATION_CHANCE: string;
    static readonly PREVENT_SHOULDER_MOUNT_SIZE: string;
    static readonly PREVENT_RIDING_MIN_SIZE: string;
    static readonly PREVENT_RIDING_MAX_SIZE: string;
    static readonly SIZING_ALGORITHM: string;
    static readonly BIAS_SIZE_TOWARD_AVERAGE: string;
    static readonly SIZE_DEFINITION_NAME: string;
    static readonly SIZE_DEFINITION_MIN: string;
    static readonly SIZE_DEFINITION_MAX: string;
    static readonly SIZE_DEFINITION_COLOR: string;
    static readonly ENABLE_ESSENCE_RECIPES: string;
    static readonly PERMISSIONS: string;
    static readonly POKESIZER_PERM_NAME: string;
    static readonly POKESIZER_SELF_PERM_NAME: string;
  }


  class ModConfig {
    static preventShoulderMountSize: number;
    static preventRidingMinSize: number;
    static preventRidingMaxSize: number;
    static sizeModificationChance: number;
    static sizingAlgorithm: string;
    static biasSizeTowardAverage: boolean;
    static enableEssenceRecipes: boolean;
    static perms: HashMap;
    static getPermission(permKey: string): number;
    static init(platformConfigDirectory: Path): void;
  }

}

declare module 'dev.cudzer.cobblemonsizevariation.data' {
  import { SimpleJsonResourceReloadListener } from 'net.minecraft.server.packs.resources';
  import { Species } from 'com.cobblemon.mod.common.pokemon';
  import { Codec } from 'com.mojang.serialization';
  import { List } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface CustomSizeDataManager extends SimpleJsonResourceReloadListener {}
  class CustomSizeDataManager extends SimpleJsonResourceReloadListener {
    constructor();
    static getCustomSizeFile(species: Species): PokemonSize;
  }


  class PokemonSize {
    static CODEC: Codec;
    constructor(speciesList: string[], minSize: number, maxSize: number);
    get maxSize(): number;
    get minSize(): number;
    isPokemonIncluded(species: Species): boolean;
    setJsonLocation(jsonLocation: ResourceLocation): void;
  }

}

declare module 'dev.cudzer.cobblemonsizevariation.event' {
  class ModEvents {
    static registerEvents(): void;
  }

}

declare module 'dev.cudzer.cobblemonsizevariation.item' {
  import { DeferredRegister, RegistrySupplier } from 'dev.architectury.registry.registries';
  import { Item } from 'net.minecraft.world.item';
  import { Properties } from 'Item';
  import { SizeModification, SizeModificationType } from 'dev.cudzer.cobblemonsizevariation.item.SizeEssenceItem';

  class ModCreativeModeTab {
    static readonly CREATIVE_MODE_TAB: DeferredRegister;
    static readonly SIZE_VARIATION_TAB: RegistrySupplier;
    static register(): void;
  }


  class ModItems {
    static readonly ITEMS: DeferredRegister;
    static readonly TINY_ESSENCE: RegistrySupplier;
    static readonly NORMAL_ESSENCE: RegistrySupplier;
    static readonly HUGE_ESSENCE: RegistrySupplier;
    static readonly SHRINK_ESSENCE: RegistrySupplier;
    static readonly GROWTH_ESSENCE: RegistrySupplier;
    static register(): void;
  }


  interface SizeEssenceItem extends Item {}
  class SizeEssenceItem extends Item {
    constructor(properties: Properties, size: number, sizeModification: SizeModification, sizeModificationType: SizeModificationType);
    get sizeChange(): number;
    get sizeModification(): SizeModification;
    get sizeModificationType(): SizeModificationType;
  }

}

declare module 'dev.cudzer.cobblemonsizevariation.item.SizeEssenceItem' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface SizeModification extends Enum<SizeModification> {}
  class SizeModification extends Enum<SizeModification> {
    static readonly SET: SizeModification;
    static readonly ADDITION: SizeModification;
    static valueOf(name: string): SizeModification;
    static values(): SizeModification[];
  }


  interface SizeModificationType extends Enum<SizeModificationType> {}
  class SizeModificationType extends Enum<SizeModificationType> {
    static readonly SHRINK: SizeModificationType;
    static readonly GROW: SizeModificationType;
    static readonly SET: SizeModificationType;
    static valueOf(name: string): SizeModificationType;
    static values(): SizeModificationType[];
  }

}

declare module 'dev.cudzer.cobblemonsizevariation.mixin.client' {
  class PCGuiMixin {
  }


  class SummaryMixin {
  }

}

declare module 'dev.cudzer.cobblemonsizevariation.mixin' {
  class RecipeBlockerMixin {
  }

}

declare module 'dev.cudzer.cobblemonsizevariation.neoforge' {
  import { Platform } from 'dev.cudzer.cobblemonsizevariation';
  import { Path } from 'java.nio.file';
  import { NetworkManager } from 'com.cobblemon.mod.common';
  import { RegisterCommandsEvent } from 'net.neoforged.neoforge.event';
  import { RegisterPayloadHandlersEvent } from 'net.neoforged.neoforge.network.event';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { NetworkPacket } from 'com.cobblemon.mod.common.api.net';

  interface CobblemonSizeVariationNeoForge extends Platform {}
  class CobblemonSizeVariationNeoForge extends Platform {
    constructor();
    get configDirectory(): Path;
    get networkManager(): NetworkManager;
    isModInstalled(modId: string): boolean;
    onCommandRegistration(event: RegisterCommandsEvent): void;
  }


  interface ModNeoForgeNetworkManager extends NetworkManager {}
  class ModNeoForgeNetworkManager extends NetworkManager {
    static registerMessages(event: RegisterPayloadHandlersEvent): void;
    sendPacketToPlayer(serverPlayer: ServerPlayer, networkPacket: NetworkPacket<any>): void;
    sendToServer(networkPacket: NetworkPacket<any>): void;
  }

}

declare module 'dev.cudzer.cobblemonsizevariation.neoforge.events' {
  import { EntityInteract } from 'PlayerInteractEvent';

  class EntityInteractEvents {
    static onEntityInteract(event: EntityInteract): void;
  }

}

declare module 'dev.cudzer.cobblemonsizevariation.network.handler.client' {
  import { ClientNetworkPacketHandler } from 'com.cobblemon.mod.common.api.net';
  import { SizeChangedPacket } from 'dev.cudzer.cobblemonsizevariation.network';
  import { Minecraft } from 'net.minecraft.client';

  interface SizeChangeHandler extends ClientNetworkPacketHandler<SizeChangedPacket> {}
  class SizeChangeHandler extends ClientNetworkPacketHandler<SizeChangedPacket> {
    handle(sizeChangedPacket: SizeChangedPacket, minecraft: Minecraft): void;
  }

}

declare module 'dev.cudzer.cobblemonsizevariation.network' {
  import { List } from 'java.util';
  import { PacketRegisterInfo } from 'com.cobblemon.mod.common.net';
  import { SingleUpdatePacket } from 'com.cobblemon.mod.common.net.messages.client.pokemon.update';
  import { Double } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Function0 } from 'kotlin.jvm.functions';
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class ModNetwork {
    static s2cPayloads: List;
    static generateS2CPacketInfoList(): PacketRegisterInfo<any>[];
  }


  interface SizeChangedPacket extends SingleUpdatePacket<number, SizeChangedPacket> {}
  class SizeChangedPacket extends SingleUpdatePacket<number, SizeChangedPacket> {
    static readonly ID: ResourceLocation;
    constructor(pokemon: Function0<Pokemon>, value: number);
    static decode(buffer: RegistryFriendlyByteBuf): SizeChangedPacket;
    encodeValue(buffer: RegistryFriendlyByteBuf): void;
    get id(): ResourceLocation;
    set(pokemon: Pokemon, aDouble: number): void;
  }

}

declare module 'dev.cudzer.cobblemonsizevariation.sizing.algorithms' {
  import { SizeDefinition } from 'dev.cudzer.cobblemonsizevariation.sizing';
  import { Size } from 'dev.cudzer.cobblemonsizevariation.config';
  import { JsonElement } from 'com.google.gson';
  import { Path } from 'java.nio.file';

  interface BasicSizer extends ISizer {}
  class BasicSizer extends ISizer {
    constructor(sizeDefinition: SizeDefinition);
    static createConfig(sizeFile: Path): JsonElement;
    get maxSizeModifier(): number;
    get minSizeModifier(): number;
    get size(): number;
    getSize(min: number, max: number): number;
    getSizeInformation(size: number): Size;
  }


  interface GenIXSizer extends ISizer {}
  class GenIXSizer extends ISizer {
    constructor(definition: SizeDefinition);
    static createConfig(sizeFile: Path): JsonElement;
    get maxSizeModifier(): number;
    get minSizeModifier(): number;
    get size(): number;
    getSize(min: number, max: number): number;
    getSizeInformation(size: number): Size;
  }


  class ISizer {
    get maxSizeModifier(): number;
    get minSizeModifier(): number;
    get size(): number;
    getSize(var1: number, var2: number): number;
    getSizeInformation(var1: number): Size;
  }

}

declare module 'dev.cudzer.cobblemonsizevariation.sizing' {
  import { List } from 'java.util';
  import { Codec } from 'com.mojang.serialization';
  import { Size } from 'dev.cudzer.cobblemonsizevariation.config';

  class SizeDataManager {
    sizeDefinitions: List;
    getDefinition(name: string): SizeDefinition;
    init(): void;
  }


  class SizeDefinition {
    static CODEC: Codec;
    constructor(name: string, minSizeModifier: string, maxSizeModifier: string, sizes: Size[]);
    get maxSizeModifier(): string;
    get minSizeModifier(): string;
    get sizes(): Size[];
  }

}

declare module 'dev.cudzer.cobblemonsizevariation.utils' {
  import { Path } from 'java.nio.file';
  import { JsonObject, Gson } from 'com.google.gson';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Level } from 'net.minecraft.world.level';
  import { InteractionHand } from 'net.minecraft.world';
  import { PokemonEntity } from 'com.cobblemon.mod.common.entity.pokemon';

  class FileUtils {
    static createFile(gson: Gson, content: JsonObject, file: Path): JsonObject;
    static get sizePath(): Path;
    static getSizeFile(fileName: string): Path;
  }


  class PokemonUtils {
    static buildSizeText(context: GuiGraphics, scaleMultiplier: number, x: number, y: number): void;
  }


  class SizeItemInteractions {
    static handleEntityInteract(player: Player, level: Level, hand: InteractionHand, target: PokemonEntity): boolean;
  }

}