declare module 'com.chaosthedude.naturescompass.client' {
  import { FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { RegisterGuiLayersEvent } from 'net.neoforged.neoforge.client.event';
  import { Layer } from 'LayeredDraw';
  import { Minecraft, DeltaTracker } from 'net.minecraft.client';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class NaturesCompassClient {
    static clientInit(event: FMLClientSetupEvent): void;
    static registerOverlay(event: RegisterGuiLayersEvent): void;
    unclampedCall(stack: ItemStack, world: ClientLevel, entityLiving: LivingEntity, seed: number): number;
  }


  interface NaturesCompassOverlay extends Layer {}
  class NaturesCompassOverlay extends Layer {
    static readonly mc: Minecraft;
    render(guiGraphics: GuiGraphics, deltaTracker: DeltaTracker): void;
  }


  interface OverlaySide extends Enum<OverlaySide> {}
  class OverlaySide extends Enum<OverlaySide> {
    static readonly LEFT: OverlaySide;
    static readonly RIGHT: OverlaySide;
    static fromString(str: string): OverlaySide;
    static valueOf(name: string): OverlaySide;
    static values(): OverlaySide[];
  }

}

declare module 'com.chaosthedude.naturescompass.config' {
  import { General, Client } from 'com.chaosthedude.naturescompass.config.ConfigHandler';
  import { ModConfigSpec } from 'net.neoforged.neoforge.common';

  class ConfigHandler {
    static readonly GENERAL: General;
    static readonly CLIENT: Client;
    static readonly GENERAL_SPEC: ModConfigSpec;
    static readonly CLIENT_SPEC: ModConfigSpec;
  }

}

declare module 'com.chaosthedude.naturescompass.config.ConfigHandler' {
  import { BooleanValue, IntValue, ConfigValue, EnumValue } from 'ModConfigSpec';

  class General {
    readonly allowTeleport: BooleanValue;
    readonly displayCoordinates: BooleanValue;
    readonly radiusModifier: IntValue;
    readonly sampleSpaceModifier: IntValue;
    readonly biomeBlacklist: ConfigValue;
    readonly maxSamples: IntValue;
  }


  class Client {
    readonly displayWithChatOpen: BooleanValue;
    readonly fixBiomeNames: BooleanValue;
    readonly overlaySide: EnumValue;
    readonly overlayLineOffset: IntValue;
  }

}

declare module 'com.chaosthedude.naturescompass.gui' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { Entry } from 'ObjectSelectionList';
  import { Component } from 'net.minecraft.network.chat';
  import { ObjectSelectionList, Button, EditBox } from 'net.minecraft.client.gui.components';
  import { Minecraft } from 'net.minecraft.client';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { NaturesCompassItem } from 'com.chaosthedude.naturescompass.items';
  import { List } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ISorting } from 'com.chaosthedude.naturescompass.sorting';
  import { OnPress } from 'Button';

  interface BiomeInfoScreen extends Screen {}
  class BiomeInfoScreen extends Screen {
    constructor(parentScreen: NaturesCompassScreen, biome: Biome);
    init(): void;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface BiomeSearchEntry extends Entry<BiomeSearchEntry> {}
  class BiomeSearchEntry extends Entry<BiomeSearchEntry> {
    constructor(biomesList: BiomeSearchList, biome: Biome);
    get narration(): Component;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    render(guiGraphics: GuiGraphics, index: number, top: number, left: number, width: number, height: number, par6: number, par7: number, par8: boolean, par9: number): void;
    searchForBiome(): void;
    viewInfo(): void;
  }


  interface BiomeSearchList extends ObjectSelectionList<BiomeSearchEntry> {}
  class BiomeSearchList extends ObjectSelectionList<BiomeSearchEntry> {
    constructor(parentScreen: NaturesCompassScreen, mc: Minecraft, width: number, height: number, y: number, itemHeight: number);
    get parentScreen(): NaturesCompassScreen;
    get rowWidth(): number;
    hasSelection(): boolean;
    refreshList(): void;
    renderWidget(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    selectBiome(entry: BiomeSearchEntry): void;
  }


  class GuiWrapper {
    static openGUI(level: Level, player: Player, stack: ItemStack): void;
  }


  interface NaturesCompassScreen extends Screen {}
  class NaturesCompassScreen extends Screen {
    level: Level;
    constructor(level: Level, player: Player, stack: ItemStack, natureCompass: NaturesCompassItem, allowedBiomes: ResourceLocation[]);
    charTyped(typedChar: string, keyCode: number): boolean;
    get sortingCategory(): ISorting<any>;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseScrolled(par1: number, par2: number, par3: number, par4: number): boolean;
    processSearchTerm(): void;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    searchForBiome(biome: Biome): void;
    selectBiome(entry: BiomeSearchEntry): void;
    sortBiomes(): Biome[];
    teleport(): void;
    tick(): void;
  }


  interface TransparentButton extends Button {}
  class TransparentButton extends Button {
    constructor(x: number, y: number, width: number, height: number, label: Component, onPress: OnPress);
    renderWidget(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface TransparentTextField extends EditBox {}
  class TransparentTextField extends EditBox {
    constructor(font: Font, x: number, y: number, width: number, height: number, label: Component);
    renderWidget(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    setBordered(enableBackgroundDrawing: boolean): void;
    setEditable(enabled: boolean): void;
    setFocused(isFocused: boolean): void;
    setHighlightPos(position: number): void;
    setLabel(label: Component): void;
    setLabelColor(labelColor: number): void;
    setMaxLength(length: number): void;
    setTextColor(color: number): void;
    setTextColorUneditable(color: number): void;
  }

}

declare module 'com.chaosthedude.naturescompass.items' {
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { InteractionResultHolder, InteractionHand } from 'net.minecraft.world';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { BlockPos } from 'net.minecraft.core';
  import { CompassState } from 'com.chaosthedude.naturescompass.util';

  interface NaturesCompassItem extends Item {}
  class NaturesCompassItem extends Item {
    static readonly NAME: string;
    constructor();
    fail(stack: ItemStack, player: Player, radius: number, samples: number): void;
    getBiomeKey(stack: ItemStack): ResourceLocation;
    getDistanceToBiome(player: Player, stack: ItemStack): number;
    getFoundBiomeX(stack: ItemStack): number;
    getFoundBiomeZ(stack: ItemStack): number;
    getSamples(stack: ItemStack): number;
    getSearchRadius(stack: ItemStack): number;
    getState(stack: ItemStack): CompassState;
    isActive(stack: ItemStack): boolean;
    searchForBiome(level: ServerLevel, player: Player, biomeKey: ResourceLocation, pos: BlockPos, stack: ItemStack): void;
    setBiomeKey(stack: ItemStack, biomeKey: ResourceLocation, player: Player): void;
    setDisplayCoordinates(stack: ItemStack, displayPosition: boolean): void;
    setFound(stack: ItemStack, x: number, z: number, samples: number, player: Player): void;
    setFoundBiomeX(stack: ItemStack, x: number, player: Player): void;
    setFoundBiomeZ(stack: ItemStack, z: number, player: Player): void;
    setInactive(stack: ItemStack, player: Player): void;
    setNotFound(stack: ItemStack, player: Player, searchRadius: number, samples: number): void;
    setSamples(stack: ItemStack, samples: number, player: Player): void;
    setSearchRadius(stack: ItemStack, searchRadius: number, player: Player): void;
    setSearching(stack: ItemStack, biomeKey: ResourceLocation, player: Player): void;
    setState(stack: ItemStack, pos: BlockPos, state: CompassState, player: Player): void;
    shouldCauseReequipAnimation(oldStack: ItemStack, newStack: ItemStack, slotChanged: boolean): boolean;
    shouldDisplayCoordinates(stack: ItemStack): boolean;
    succeed(stack: ItemStack, player: Player, x: number, z: number, samples: number, displayCoordinates: boolean): void;
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }

}

declare module 'com.chaosthedude.naturescompass' {
  import { PermissionNode } from 'net.neoforged.neoforge.server.permission.nodes';
  import { Logger } from 'org.apache.logging.log4j';
  import { NaturesCompassItem } from 'com.chaosthedude.naturescompass.items';
  import { DataComponentType } from 'net.minecraft.core.component';
  import { List } from 'java.util';
  import { ListMultimap } from 'com.google.common.collect';
  import { ModContainer } from 'net.neoforged.fml';
  import { Nodes } from 'PermissionGatherEvent';

  class NaturesCompass {
    static readonly MODID: string;
    static readonly TELEPORT_PERMISSION: PermissionNode;
    static readonly LOGGER: Logger;
    static naturesCompass: NaturesCompassItem;
    static readonly BIOME_ID: DataComponentType;
    static readonly COMPASS_STATE: DataComponentType;
    static readonly FOUND_X: DataComponentType;
    static readonly FOUND_Z: DataComponentType;
    static readonly SEARCH_RADIUS: DataComponentType;
    static readonly SAMPLES: DataComponentType;
    static readonly DISPLAY_COORDS: DataComponentType;
    static canTeleport: boolean;
    static allowedBiomes: List;
    static dimensionKeysForAllowedBiomeKeys: ListMultimap;
    static instance: NaturesCompass;
    constructor(modContainer: ModContainer);
    registerNodes(event: Nodes): void;
  }

}

declare module 'com.chaosthedude.naturescompass.registry' {
  import { RegisterEvent } from 'net.neoforged.neoforge.registries';

  class NaturesCompassRegistry {
    static register(event: RegisterEvent): void;
  }

}

declare module 'com.chaosthedude.naturescompass.sorting' {
  import { Biome } from 'net.minecraft.world.level.biome';
  import { Comparator } from 'java.util';
  import { Float } from 'java.lang';

  interface DimensionSorting extends ISorting<string> {}
  class DimensionSorting extends ISorting<string> {
    compare(biome1: Biome, biome2: Biome): number;
    get localizedName(): string;
    getValue(biome: Biome): string;
    next(): ISorting<any>;
  }


  interface ISorting<T = any> extends Comparator<Biome> {}
  class ISorting<T = any> extends Comparator<Biome> {
    compare(var1: Biome, var2: Biome): number;
    get localizedName(): string;
    getValue(var1: Biome): T;
    next(): ISorting<any>;
  }


  interface NameSorting extends ISorting<string> {}
  class NameSorting extends ISorting<string> {
    compare(biome1: Biome, biome2: Biome): number;
    get localizedName(): string;
    getValue(biome: Biome): string;
    next(): ISorting<any>;
  }


  interface RainfallSorting extends ISorting<number> {}
  class RainfallSorting extends ISorting<number> {
    compare(biome1: Biome, biome2: Biome): number;
    get localizedName(): string;
    getValue(biome: Biome): number;
    next(): ISorting<any>;
  }


  interface SourceSorting extends ISorting<string> {}
  class SourceSorting extends ISorting<string> {
    compare(biome1: Biome, biome2: Biome): number;
    get localizedName(): string;
    getValue(biome: Biome): string;
    next(): ISorting<any>;
  }


  interface TagsSorting extends ISorting<string> {}
  class TagsSorting extends ISorting<string> {
    compare(biome1: Biome, biome2: Biome): number;
    get localizedName(): string;
    getValue(biome: Biome): string;
    next(): ISorting<any>;
  }


  interface TemperatureSorting extends ISorting<number> {}
  class TemperatureSorting extends ISorting<number> {
    compare(biome1: Biome, biome2: Biome): number;
    get localizedName(): string;
    getValue(biome: Biome): number;
    next(): ISorting<any>;
  }

}

declare module 'com.chaosthedude.naturescompass.util' {
  import { IWorker } from 'WorldWorkerManager';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { BlockPos, Registry } from 'net.minecraft.core';
  import { Optional, List } from 'java.util';
  import { Level } from 'net.minecraft.world.level';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ListMultimap } from 'com.google.common.collect';
  import { Enum } from 'java.lang';
  import { MinecraftServer } from 'net.minecraft.server';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';

  interface BiomeSearchWorker extends IWorker {}
  class BiomeSearchWorker extends IWorker {
    constructor(level: ServerLevel, player: Player, stack: ItemStack, biome: Biome, startPos: BlockPos);
    doWork(): boolean;
    hasWork(): boolean;
    start(): void;
    stop(): void;
  }


  class BiomeUtils {
    static biomeKeyIsBlacklisted(level: Level, biomeKey: ResourceLocation): boolean;
    static biomeKeyIsHidden(level: Level, biomeKey: ResourceLocation): boolean;
    static dimensionKeysToString(dimensions: ResourceLocation[]): string;
    static getAllowedBiomeKeys(level: Level): ResourceLocation[];
    static getBiomeForKey(level: Level, key: ResourceLocation): Optional<Biome>;
    static getBiomeName(level: Level, biome: Biome): string;
    static getBiomeName(level: Level, key: ResourceLocation): string;
    static getBiomeNameForDisplay(level: Level, biome: ResourceLocation): string;
    static getBiomeNameForDisplay(level: Level, biome: Biome): string;
    static getBiomeRegistry(level: Level): Optional<Registry<Biome>>;
    static getBiomeSize(world: Level): number;
    static getBiomeSource(level: Level, biome: Biome): string;
    static getBiomeTags(level: Level, biome: Biome): string;
    static getDistanceToBiome(player: Player, biomeX: number, biomeZ: number): number;
    static getDistanceToBiome(startPos: BlockPos, biomeX: number, biomeZ: number): number;
    static getGeneratingDimensionKeys(serverLevel: ServerLevel, biome: Biome): ResourceLocation[];
    static getGeneratingDimensionsForAllowedBiomes(serverLevel: ServerLevel): ListMultimap<ResourceLocation, ResourceLocation>;
    static getKeyForBiome(level: Level, biome: Biome): Optional<ResourceLocation>;
  }


  interface CompassState extends Enum<CompassState> {}
  class CompassState extends Enum<CompassState> {
    static readonly INACTIVE: CompassState;
    static readonly SEARCHING: CompassState;
    static readonly FOUND: CompassState;
    static readonly NOT_FOUND: CompassState;
    static fromID(id: number): CompassState;
    get iD(): number;
    static valueOf(name: string): CompassState;
    static values(): CompassState[];
  }


  class ItemUtils {
    static getHeldItem(player: Player, item: Item): ItemStack;
    static getHeldNatureCompass(player: Player): ItemStack;
  }


  class PlayerUtils {
    static canTeleport(server: MinecraftServer, player: Player): boolean;
    static cheatModeEnabled(server: MinecraftServer, player: Player): boolean;
    static hasPermission(player: Player): boolean;
    static isOp(player: Player): boolean;
  }


  class RenderUtils {
    static drawConfiguredStringOnHUD(guiGraphics: GuiGraphics, string: string, xOffset: number, yOffset: number, color: number, relLineOffset: number): void;
    static drawStringLeft(guiGraphics: GuiGraphics, string: string, font: Font, x: number, y: number, color: number): void;
    static drawStringRight(guiGraphics: GuiGraphics, string: string, font: Font, x: number, y: number, color: number): void;
  }

}