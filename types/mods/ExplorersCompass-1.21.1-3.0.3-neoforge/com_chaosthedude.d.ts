declare module 'com.chaosthedude.explorerscompass.client' {
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

  class ExplorersCompassClient {
    static clientInit(event: FMLClientSetupEvent): void;
    static registerOverlay(event: RegisterGuiLayersEvent): void;
    unclampedCall(stack: ItemStack, world: ClientLevel, entityLiving: LivingEntity, seed: number): number;
  }


  interface ExplorersCompassOverlay extends Layer {}
  class ExplorersCompassOverlay extends Layer {
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

declare module 'com.chaosthedude.explorerscompass.config' {
  import { General, Client } from 'com.chaosthedude.explorerscompass.config.ConfigHandler';
  import { ModConfigSpec } from 'net.neoforged.neoforge.common';

  class ConfigHandler {
    static readonly GENERAL: General;
    static readonly CLIENT: Client;
    static readonly GENERAL_SPEC: ModConfigSpec;
    static readonly CLIENT_SPEC: ModConfigSpec;
  }

}

declare module 'com.chaosthedude.explorerscompass.config.ConfigHandler' {
  import { BooleanValue, IntValue, ConfigValue, EnumValue } from 'ModConfigSpec';

  class General {
    readonly allowTeleport: BooleanValue;
    readonly displayCoordinates: BooleanValue;
    readonly maxRadius: IntValue;
    readonly structureBlacklist: ConfigValue;
    readonly maxSamples: IntValue;
  }


  class Client {
    readonly displayWithChatOpen: BooleanValue;
    readonly translateStructureNames: BooleanValue;
    readonly overlaySide: EnumValue;
    readonly overlayLineOffset: IntValue;
  }

}

declare module 'com.chaosthedude.explorerscompass' {
  import { Logger } from 'org.apache.logging.log4j';
  import { ExplorersCompassItem } from 'com.chaosthedude.explorerscompass.items';
  import { DataComponentType } from 'net.minecraft.core.component';
  import { List, Map } from 'java.util';
  import { ListMultimap } from 'com.google.common.collect';
  import { ModContainer } from 'net.neoforged.fml';

  class ExplorersCompass {
    static readonly MODID: string;
    static readonly LOGGER: Logger;
    static explorersCompass: ExplorersCompassItem;
    static readonly STRUCTURE_ID_COMPONENT: DataComponentType;
    static readonly COMPASS_STATE_COMPONENT: DataComponentType;
    static readonly FOUND_X_COMPONENT: DataComponentType;
    static readonly FOUND_Z_COMPONENT: DataComponentType;
    static readonly SEARCH_RADIUS_COMPONENT: DataComponentType;
    static readonly SAMPLES_COMPONENT: DataComponentType;
    static readonly DISPLAY_COORDS_COMPONENT: DataComponentType;
    static canTeleport: boolean;
    static allowedStructureKeys: List;
    static dimensionKeysForAllowedStructureKeys: ListMultimap;
    static structureKeysToTypeKeys: Map;
    static typeKeysToStructureKeys: ListMultimap;
    constructor(modContainer: ModContainer);
  }

}

declare module 'com.chaosthedude.explorerscompass.gui' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ExplorersCompassItem } from 'com.chaosthedude.explorerscompass.items';
  import { List } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { Entry } from 'ObjectSelectionList';
  import { Component } from 'net.minecraft.network.chat';
  import { ObjectSelectionList, Button, EditBox } from 'net.minecraft.client.gui.components';
  import { Minecraft } from 'net.minecraft.client';
  import { OnPress } from 'Button';

  interface ExplorersCompassScreen extends Screen {}
  class ExplorersCompassScreen extends Screen {
    constructor(level: Level, player: Player, stack: ItemStack, explorersCompass: ExplorersCompassItem, allowedStructureKeys: ResourceLocation[]);
    charTyped(typedChar: string, keyCode: number): boolean;
    keyPressed(par1: number, par2: number, par3: number): boolean;
    mouseScrolled(par1: number, par2: number, par3: number, par4: number): boolean;
    processSearchTerm(): void;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    searchForGroup(key: ResourceLocation): void;
    searchForStructure(key: ResourceLocation): void;
    selectStructure(entry: StructureSearchEntry): void;
    sortStructures(): ResourceLocation[];
    teleport(): void;
    tick(): void;
  }


  class GuiWrapper {
    static openGUI(level: Level, player: Player, stack: ItemStack): void;
  }


  interface StructureSearchEntry extends Entry<StructureSearchEntry> {}
  class StructureSearchEntry extends Entry<StructureSearchEntry> {
    constructor(structuresList: StructureSearchList, structureKey: ResourceLocation);
    get narration(): Component;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    render(guiGraphics: GuiGraphics, par1: number, par2: number, par3: number, par4: number, par5: number, par6: number, par7: number, par8: boolean, par9: number): void;
    searchForGroup(): void;
    searchForStructure(): void;
  }


  interface StructureSearchList extends ObjectSelectionList<StructureSearchEntry> {}
  class StructureSearchList extends ObjectSelectionList<StructureSearchEntry> {
    constructor(parentScreen: ExplorersCompassScreen, mc: Minecraft, width: number, height: number, y: number, itemHeight: number);
    get parentScreen(): ExplorersCompassScreen;
    get rowWidth(): number;
    hasSelection(): boolean;
    refreshList(): void;
    renderWidget(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    selectStructure(entry: StructureSearchEntry): void;
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

declare module 'com.chaosthedude.explorerscompass.items' {
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { InteractionResultHolder, InteractionHand } from 'net.minecraft.world';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List } from 'java.util';
  import { BlockPos } from 'net.minecraft.core';
  import { CompassState } from 'com.chaosthedude.explorerscompass.util';

  interface ExplorersCompassItem extends Item {}
  class ExplorersCompassItem extends Item {
    static readonly NAME: string;
    constructor();
    fail(stack: ItemStack, radius: number, samples: number): void;
    getDistanceToBiome(player: Player, stack: ItemStack): number;
    getFoundStructureX(stack: ItemStack): number;
    getFoundStructureZ(stack: ItemStack): number;
    getSamples(stack: ItemStack): number;
    getSearchRadius(stack: ItemStack): number;
    getState(stack: ItemStack): CompassState;
    getStructureKey(stack: ItemStack): ResourceLocation;
    isActive(stack: ItemStack): boolean;
    searchForStructure(level: Level, player: Player, categoryKey: ResourceLocation, structureKeys: ResourceLocation[], pos: BlockPos, stack: ItemStack): void;
    setDisplayCoordinates(stack: ItemStack, displayPosition: boolean): void;
    setFound(stack: ItemStack, structureKey: ResourceLocation, x: number, z: number, samples: number): void;
    setFoundStructureX(stack: ItemStack, x: number, player: Player): void;
    setFoundStructureZ(stack: ItemStack, z: number, player: Player): void;
    setInactive(stack: ItemStack, player: Player): void;
    setNotFound(stack: ItemStack, searchRadius: number, samples: number): void;
    setSamples(stack: ItemStack, samples: number, player: Player): void;
    setSearchRadius(stack: ItemStack, searchRadius: number, player: Player): void;
    setSearching(stack: ItemStack, structureKey: ResourceLocation, player: Player): void;
    setState(stack: ItemStack, pos: BlockPos, state: CompassState, player: Player): void;
    setStructureKey(stack: ItemStack, structureKey: ResourceLocation, player: Player): void;
    shouldCauseReequipAnimation(oldStack: ItemStack, newStack: ItemStack, slotChanged: boolean): boolean;
    shouldDisplayCoordinates(stack: ItemStack): boolean;
    succeed(stack: ItemStack, structureKey: ResourceLocation, x: number, z: number, samples: number, displayCoordinates: boolean): void;
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }

}

declare module 'com.chaosthedude.explorerscompass.registry' {
  import { RegisterEvent } from 'net.neoforged.neoforge.registries';

  class ExplorersCompassRegistry {
    static registerItems(e: RegisterEvent): void;
  }

}

declare module 'com.chaosthedude.explorerscompass.sorting' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Comparator } from 'java.util';

  interface DimensionSorting extends ISorting {}
  class DimensionSorting extends ISorting {
    compare(key1: ResourceLocation, key2: ResourceLocation): number;
    get localizedName(): string;
    getValue(key: ResourceLocation): any;
    next(): ISorting;
  }


  interface GroupSorting extends ISorting {}
  class GroupSorting extends ISorting {
    compare(key1: ResourceLocation, key2: ResourceLocation): number;
    get localizedName(): string;
    getValue(key: ResourceLocation): any;
    next(): ISorting;
  }


  interface ISorting extends Comparator<ResourceLocation> {}
  class ISorting extends Comparator<ResourceLocation> {
    compare(var1: ResourceLocation, var2: ResourceLocation): number;
    get localizedName(): string;
    getValue(var1: ResourceLocation): any;
    next(): ISorting;
  }


  interface NameSorting extends ISorting {}
  class NameSorting extends ISorting {
    compare(key1: ResourceLocation, key2: ResourceLocation): number;
    get localizedName(): string;
    getValue(key: ResourceLocation): any;
    next(): ISorting;
  }


  interface SourceSorting extends ISorting {}
  class SourceSorting extends ISorting {
    compare(key1: ResourceLocation, key2: ResourceLocation): number;
    get localizedName(): string;
    getValue(key: ResourceLocation): any;
    next(): ISorting;
  }

}

declare module 'com.chaosthedude.explorerscompass.util' {
  import { Enum } from 'java.lang';
  import { List, Map } from 'java.util';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { MinecraftServer } from 'net.minecraft.server';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { ListMultimap } from 'com.google.common.collect';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { Structure } from 'net.minecraft.world.level.levelgen.structure';
  import { Holder, BlockPos } from 'net.minecraft.core';

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
    static isCompass(stack: ItemStack): boolean;
  }


  class PlayerUtils {
    static canTeleport(server: MinecraftServer, player: Player): boolean;
    static cheatModeEnabled(server: MinecraftServer, player: Player): boolean;
    static isOp(player: Player): boolean;
  }


  class RenderUtils {
    static drawConfiguredStringOnHUD(guiGraphics: GuiGraphics, string: string, xOffset: number, yOffset: number, color: number, relLineOffset: number): void;
    static drawStringLeft(guiGraphics: GuiGraphics, string: string, font: Font, x: number, y: number, color: number): void;
    static drawStringRight(guiGraphics: GuiGraphics, string: string, font: Font, x: number, y: number, color: number): void;
  }


  class StructureUtils {
    static dimensionKeysToString(dimensions: ResourceLocation[]): string;
    static getAllowedStructureKeys(level: ServerLevel): ResourceLocation[];
    static getGeneratingDimensionKeys(serverLevel: ServerLevel, structure: Structure): ResourceLocation[];
    static getGeneratingDimensionsForAllowedStructures(serverLevel: ServerLevel): ListMultimap<ResourceLocation, ResourceLocation>;
    static getHolderForStructure(level: ServerLevel, structure: Structure): Holder<Structure>;
    static getHorizontalDistanceToLocation(player: Player, x: number, z: number): number;
    static getHorizontalDistanceToLocation(startPos: BlockPos, x: number, z: number): number;
    static getKeyForStructure(level: ServerLevel, structure: Structure): ResourceLocation;
    static getPrettyStructureName(key: ResourceLocation): string;
    static getPrettyStructureSource(key: ResourceLocation): string;
    static getStructureForKey(level: ServerLevel, key: ResourceLocation): Structure;
    static getStructureKeysToTypeKeys(level: ServerLevel): Map<ResourceLocation, ResourceLocation>;
    static getTypeForStructure(level: ServerLevel, structure: Structure): ResourceLocation;
    static getTypeKeysToStructureKeys(level: ServerLevel): ListMultimap<ResourceLocation, ResourceLocation>;
    static structureIsBlacklisted(level: ServerLevel, structure: Structure): boolean;
    static structureIsHidden(level: ServerLevel, structure: Structure): boolean;
  }

}

declare module 'com.chaosthedude.explorerscompass.worker' {
  import { ConcentricRingsStructurePlacement, StructurePlacement, RandomSpreadStructurePlacement } from 'net.minecraft.world.level.levelgen.structure.placement';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { List } from 'java.util';
  import { Structure } from 'net.minecraft.world.level.levelgen.structure';
  import { IWorker } from 'WorldWorkerManager';

  interface ConcentricRingsSearchWorker extends StructureSearchWorker<ConcentricRingsStructurePlacement> {}
  class ConcentricRingsSearchWorker extends StructureSearchWorker<ConcentricRingsStructurePlacement> {
    constructor(level: ServerLevel, player: Player, stack: ItemStack, startPos: BlockPos, placement: ConcentricRingsStructurePlacement, structureSet: Structure[], managerId: string);
    doWork(): boolean;
    hasWork(): boolean;
    shouldLogRadius(): boolean;
  }


  interface GenericSearchWorker extends StructureSearchWorker<StructurePlacement> {}
  class GenericSearchWorker extends StructureSearchWorker<StructurePlacement> {
    chunkX: number;
    chunkZ: number;
    length: number;
    nextLength: number;
    direction: Direction;
    constructor(level: ServerLevel, player: Player, stack: ItemStack, startPos: BlockPos, placement: StructurePlacement, structureSet: Structure[], managerId: string);
    doWork(): boolean;
    shouldLogRadius(): boolean;
  }


  interface RandomSpreadSearchWorker extends StructureSearchWorker<RandomSpreadStructurePlacement> {}
  class RandomSpreadSearchWorker extends StructureSearchWorker<RandomSpreadStructurePlacement> {
    constructor(level: ServerLevel, player: Player, stack: ItemStack, startPos: BlockPos, placement: RandomSpreadStructurePlacement, structureSet: Structure[], managerId: string);
    doWork(): boolean;
    hasWork(): boolean;
    shouldLogRadius(): boolean;
  }


  class SearchWorkerManager {
    clear(): void;
    createWorkers(level: ServerLevel, player: Player, stack: ItemStack, structures: Structure[], startPos: BlockPos): void;
    pop(): void;
    start(): boolean;
    stop(): void;
  }


  interface StructureSearchWorker<T extends StructurePlacement = any> extends IWorker {}
  class StructureSearchWorker<T extends StructurePlacement = any> extends IWorker {
    constructor(level: ServerLevel, player: Player, stack: ItemStack, startPos: BlockPos, placement: T, structureSet: Structure[], managerId: string);
    doWork(): boolean;
    hasWork(): boolean;
    start(): void;
    stop(): void;
  }

}