declare module 'dragomordor.simpletms.api' {
  import { List } from 'java.util';

  class MoveCaseHelper {
    static readonly INSTANCE: MoveCaseHelper;
    get sortedTMMoveNames(): string[];
    get sortedTRMoveNames(): string[];
    get tMSlotCount(): number;
    get tRSlotCount(): number;
    getMoveNameForSlot(slotIndex: number, isTR: boolean): string;
    getRowCount(isTR: boolean): number;
    getSlotCount(isTR: boolean): number;
    getSlotIndexForMove(moveName: string, isTR: boolean): number;
    getSortedMoveNames(isTR: boolean): string[];
    invalidateCache(): void;
  }

}

declare module 'dragomordor.simpletms.block.api' {
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Function1 } from 'kotlin.jvm.functions';
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';
  import { Unit } from 'kotlin';

  class PokemonSelectingBlock {
    canSelectPokemon(pokemon: Pokemon): boolean;
    openPartySelection(player: ServerPlayer, onPokemonSelected: Function1<Pokemon, Unit>): void;
  }

}

declare module 'dragomordor.simpletms.block.api.PokemonSelectingBlock' {
  import { PokemonSelectingBlock } from 'dragomordor.simpletms.block.api';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Function1 } from 'kotlin.jvm.functions';
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';
  import { Unit } from 'kotlin';

  class DefaultImpls {
    static canSelectPokemon($this: PokemonSelectingBlock, pokemon: Pokemon): boolean;
    static openPartySelection($this: PokemonSelectingBlock, player: ServerPlayer, onPokemonSelected: Function1<Pokemon, Unit>): void;
  }

}

declare module 'dragomordor.simpletms.block.custom' {
  import { BaseEntityBlock } from 'net.minecraft.world.level.block';
  import { Companion } from 'dragomordor.simpletms.block.custom.TMMachineBlock';
  import { Properties } from 'BlockBehaviour';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';

  interface TMMachineBlock extends BaseEntityBlock {}
  class TMMachineBlock extends BaseEntityBlock {
    static readonly Companion: Companion;
    constructor(properties: Properties);
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    playerWillDestroy(level: Level, pos: BlockPos, state: BlockState, player: Player): BlockState;
    setPlacedBy(level: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
  }

}

declare module 'dragomordor.simpletms.block.custom.TMMachineBlock' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { MapCodec } from 'com.mojang.serialization';
  import { TMMachineBlock } from 'dragomordor.simpletms.block.custom';
  import { EnumProperty, DoubleBlockHalf } from 'net.minecraft.world.level.block.state.properties';
  import { Direction } from 'net.minecraft.core';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get cODEC(): MapCodec<TMMachineBlock>;
    get fACING(): EnumProperty<Direction>;
    get hALF(): EnumProperty<DoubleBlockHalf>;
  }

}

declare module 'dragomordor.simpletms.block.entity' {
  import { RegistrySupplier } from 'dev.architectury.registry.registries';
  import { BlockEntityType } from 'net.minecraft.world.level.block.entity';

  class SimpleTMsBlockEntities {
    static readonly INSTANCE: SimpleTMsBlockEntities;
    get tM_MACHINE(): RegistrySupplier<BlockEntityType<TMMachineBlockEntity>>;
    register(): void;
  }

}

declare module 'dragomordor.simpletms.block' {
  import { RegistrySupplier } from 'dev.architectury.registry.registries';
  import { BlockItem } from 'net.minecraft.world.item';
  import { TMMachineBlock } from 'dragomordor.simpletms.block.custom';

  class SimpleTMsBlockItems {
    static readonly INSTANCE: SimpleTMsBlockItems;
    get tM_MACHINE(): RegistrySupplier<BlockItem>;
    register(): void;
  }


  class SimpleTMsBlocks {
    static readonly INSTANCE: SimpleTMsBlocks;
    get tM_MACHINE(): RegistrySupplier<TMMachineBlock>;
    register(): void;
  }

}

declare module 'dragomordor.simpletms.config' {
  import { Enum } from 'java.lang';
  import { EnumEntries } from 'kotlin.enums';
  import { Companion } from 'dragomordor.simpletms.config.SimpleTMsConfig';

  interface Category extends Enum<Category> {}
  class Category extends Enum<Category> {
    static readonly Learnable: Category;
    static readonly Usable: Category;
    static readonly DropRate: Category;
    static readonly Cooldown: Category;
    static readonly ItemProperties: Category;
    static readonly Experimental: Category;
    static get entries(): EnumEntries<Category>;
    static valueOf(value: string): Category;
    static values(): Category[];
  }


  class SimpleTMsConfig {
    static readonly Companion: Companion;
    get allowCustomMovesAndEditing(): boolean;
    get anyMovesLearnableTMs(): boolean;
    get anyMovesLearnableTRs(): boolean;
    get blankTMBaseDurability(): number;
    get blankTMCooldownTicks(): number;
    get blankTMsUsable(): boolean;
    get blankTRsUsable(): boolean;
    get dropAnyLevelMoveFromLevelList(): boolean;
    get dropAnyMove(): boolean;
    get dropFromEggMoveList(): boolean;
    get dropFromLegacyMoveList(): boolean;
    get dropFromLevelList(): boolean;
    get dropFromSpecialMoveList(): boolean;
    get dropFromTmMoveList(): boolean;
    get dropFromTutorMoveList(): boolean;
    get dropInBattle(): boolean;
    get dropOutsideOfBattle(): boolean;
    get dropPrimaryType(): boolean;
    get dropRateInBattle(): number;
    static get dropRateInBattle$annotations(): void;
    get dropRateOutsideOfBattle(): number;
    static get dropRateOutsideOfBattle$annotations(): void;
    get dropRateTMFractionInBattle(): number;
    static get dropRateTMFractionInBattle$annotations(): void;
    get dropRateTMFractionOutsideOfBattle(): number;
    static get dropRateTMFractionOutsideOfBattle$annotations(): void;
    get dropSecondaryType(): boolean;
    get eggMovesLearnable(): boolean;
    get legacyMovesLearnable(): boolean;
    get levelMovesLearnable(): boolean;
    get numberOfMovesToChooseFromInBattle(): number;
    get numberOfMovesToChooseFromOutsideBattle(): number;
    get primaryTypeMovesLearnable(): boolean;
    get secondaryTypeMovesLearnable(): boolean;
    get specialMovesLearnable(): boolean;
    get tmBaseDurability(): number;
    get tmCoolDownTicks(): number;
    get tmMovesLearnable(): boolean;
    get tmRepairable(): boolean;
    get tmsUsable(): boolean;
    get trStackSize(): number;
    get trsUsable(): boolean;
    get tutorMovesLearnable(): boolean;
    set allowCustomMovesAndEditing(bl: boolean);
    set anyMovesLearnableTMs(bl: boolean);
    set anyMovesLearnableTRs(bl: boolean);
    set blankTMBaseDurability(n: number);
    set blankTMCooldownTicks(n: number);
    set blankTMsUsable(bl: boolean);
    set blankTRsUsable(bl: boolean);
    set dropAnyLevelMoveFromLevelList(bl: boolean);
    set dropAnyMove(bl: boolean);
    set dropFromEggMoveList(bl: boolean);
    set dropFromLegacyMoveList(bl: boolean);
    set dropFromLevelList(bl: boolean);
    set dropFromSpecialMoveList(bl: boolean);
    set dropFromTmMoveList(bl: boolean);
    set dropFromTutorMoveList(bl: boolean);
    set dropInBattle(bl: boolean);
    set dropOutsideOfBattle(bl: boolean);
    set dropPrimaryType(bl: boolean);
    set dropRateInBattle(d: number);
    set dropRateOutsideOfBattle(d: number);
    set dropRateTMFractionInBattle(d: number);
    set dropRateTMFractionOutsideOfBattle(d: number);
    set dropSecondaryType(bl: boolean);
    set eggMovesLearnable(bl: boolean);
    set legacyMovesLearnable(bl: boolean);
    set levelMovesLearnable(bl: boolean);
    set numberOfMovesToChooseFromInBattle(n: number);
    set numberOfMovesToChooseFromOutsideBattle(n: number);
    set primaryTypeMovesLearnable(bl: boolean);
    set secondaryTypeMovesLearnable(bl: boolean);
    set specialMovesLearnable(bl: boolean);
    set tmBaseDurability(n: number);
    set tmCoolDownTicks(n: number);
    set tmMovesLearnable(bl: boolean);
    set tmRepairable(bl: boolean);
    set tmsUsable(bl: boolean);
    set trStackSize(n: number);
    set trsUsable(bl: boolean);
    set tutorMovesLearnable(bl: boolean);
  }

}

declare module 'dragomordor.simpletms.config.SimpleTMsConfig' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Gson } from 'com.google.gson';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get gSON(): Gson;
  }

}

declare module 'dragomordor.simpletms.events' {
  interface ClientEventListeners extends EventHandler {}
  class ClientEventListeners extends EventHandler {
    static readonly INSTANCE: ClientEventListeners;
    registerListeners(): void;
  }


  interface CobblemonPokemonSpeciesListener extends EventHandler {}
  class CobblemonPokemonSpeciesListener extends EventHandler {
    static readonly INSTANCE: CobblemonPokemonSpeciesListener;
    registerListeners(): void;
  }


  class EventHandler {
    registerListeners(): void;
  }

}

declare module 'dragomordor.simpletms.item.custom' {
  import { SimpleTMsItem } from 'dragomordor.simpletms.item';
  import { PokemonAndMoveSelectingItemNonBattle, PokemonSelectingItemNonBattle } from 'dragomordor.simpletms.item.api';
  import { Properties, TooltipContext } from 'Item';
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';
  import { Move } from 'com.cobblemon.mod.common.api.moves';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { InteractionResultHolder, InteractionHand } from 'net.minecraft.world';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  interface BlankTmItem extends PokemonAndMoveSelectingItemNonBattle, SimpleTMsItem {}
  class BlankTmItem extends PokemonAndMoveSelectingItemNonBattle {
    constructor(isTR: boolean, settings: Properties);
    appendHoverText(itemStack: ItemStack, tooltipContext: TooltipContext, list: Component[], tooltipFlag: TooltipFlag): void;
    applyToPokemon(player: ServerPlayer, stack: ItemStack, pokemon: Pokemon, move: Move): void;
    canUseOnMove(move: Move): boolean;
    canUseOnMove(pokemon: Pokemon, move: Move): boolean;
    canUseOnPokemon(pokemon: Pokemon): boolean;
    interactGeneral(player: ServerPlayer, stack: ItemStack): InteractionResultHolder<ItemStack>;
    interactWithSpecific(player: ServerPlayer, stack: ItemStack, pokemon: Pokemon): InteractionResultHolder<ItemStack>;
    isTR(): boolean;
    moveSetAndBenchedMoveList(pokemon: Pokemon): Move[];
    use(world: Level, user: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
    use(player: ServerPlayer, stack: ItemStack): InteractionResultHolder<ItemStack>;
  }


  interface MoveLearnItem extends PokemonSelectingItemNonBattle, SimpleTMsItem {}
  class MoveLearnItem extends PokemonSelectingItemNonBattle {
    constructor(moveName: string, isTR: boolean, isCustomMove: boolean, settings: Properties);
    appendHoverText(itemStack: ItemStack, tooltipContext: TooltipContext, list: Component[], tooltipFlag: TooltipFlag): void;
    applyToPokemon(player: ServerPlayer, stack: ItemStack, pokemon: Pokemon): InteractionResultHolder<ItemStack>;
    canUseOnPokemon(pokemon: Pokemon): boolean;
    get moveName$common(): string;
    getName(itemStack: ItemStack): Component;
    interactGeneral(player: ServerPlayer, stack: ItemStack): InteractionResultHolder<ItemStack>;
    isTR$common(): boolean;
    isValidRepairItem(itemStack: ItemStack, itemStack2: ItemStack): boolean;
    use(world: Level, user: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
    use(player: ServerPlayer, stack: ItemStack): InteractionResultHolder<ItemStack>;
  }

}

declare module 'dragomordor.simpletms.item.custom.BlankTmItem' {
  import { Companion } from 'dragomordor.simpletms.item.custom.BlankTmItem.FailureMessage';
  import { Component } from 'net.minecraft.network.chat';

  class FailureMessage {
    static readonly Companion: Companion;
    static message: Component;
  }

}

declare module 'dragomordor.simpletms.item.custom.BlankTmItem.FailureMessage' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Component } from 'net.minecraft.network.chat';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get failureMessage(): Component;
    get message(): Component;
    set failureMessage(message: Component);
    set message(component: Component);
  }

}

declare module 'dragomordor.simpletms.item.group' {
  import { ResourceKey } from 'net.minecraft.resources';
  import { CreativeModeTab } from 'net.minecraft.world.item';
  import { Function1 } from 'kotlin.jvm.functions';
  import { ItemGroupHolder } from 'dragomordor.simpletms.item.group.SimpleTMsItemGroups';

  class SimpleTMsItemGroups {
    static readonly INSTANCE: SimpleTMsItemGroups;
    static get cUSTOM_TM_ITEMS(): CreativeModeTab;
    static get cUSTOM_TM_ITEMS$annotations(): void;
    static get cUSTOM_TM_ITEMs_KEY(): ResourceKey<CreativeModeTab>;
    static get cUSTOM_TM_ITEMs_KEY$annotations(): void;
    static get cUSTOM_TR_ITEMS(): CreativeModeTab;
    static get cUSTOM_TR_ITEMS$annotations(): void;
    static get cUSTOM_TR_ITEMs_KEY(): ResourceKey<CreativeModeTab>;
    static get cUSTOM_TR_ITEMs_KEY$annotations(): void;
    static get tM_ITEMS(): CreativeModeTab;
    static get tM_ITEMS$annotations(): void;
    static get tM_ITEMs_KEY(): ResourceKey<CreativeModeTab>;
    static get tM_ITEMs_KEY$annotations(): void;
    static get tM_STORAGE_ITEMS_KEY(): ResourceKey<CreativeModeTab>;
    static get tM_STORAGE_ITEMS_KEY$annotations(): void;
    static get tR_ITEMS(): CreativeModeTab;
    static get tR_ITEMS$annotations(): void;
    static get tR_ITEMs_KEY(): ResourceKey<CreativeModeTab>;
    static get tR_ITEMs_KEY$annotations(): void;
    static get tR_STORAGE_ITEMS(): CreativeModeTab;
    static get tR_STORAGE_ITEMS$annotations(): void;
    register(consumer: Function1<ItemGroupHolder, CreativeModeTab>): void;
  }

}

declare module 'dragomordor.simpletms.item.group.SimpleTMsItemGroups' {
  import { ResourceKey } from 'net.minecraft.resources';
  import { CreativeModeTab, ItemStack } from 'net.minecraft.world.item';
  import { Function0 } from 'kotlin.jvm.functions';
  import { DisplayItemsGenerator } from 'CreativeModeTab';
  import { Component } from 'net.minecraft.network.chat';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class ItemGroupHolder {
    constructor(key: ResourceKey<CreativeModeTab>, displayIconProvider: Function0<ItemStack>, entryCollector: DisplayItemsGenerator, displayName: Component);

    constructor(resourceKey: ResourceKey, function0: Function0, displayItemsGenerator: DisplayItemsGenerator, component: Component, n: number, defaultConstructorMarker: DefaultConstructorMarker);
    component1(): ResourceKey<CreativeModeTab>;
    component2(): Function0<ItemStack>;
    component3(): DisplayItemsGenerator;
    component4(): Component;
    copy(key: ResourceKey<CreativeModeTab>, displayIconProvider: Function0<ItemStack>, entryCollector: DisplayItemsGenerator, displayName: Component): ItemGroupHolder;
    static copy$default(itemGroupHolder: ItemGroupHolder, resourceKey: ResourceKey, function0: Function0, displayItemsGenerator: DisplayItemsGenerator, component: Component, n: number, object: any): ItemGroupHolder;
    equals(other: any): boolean;
    get displayIconProvider(): Function0<ItemStack>;
    get displayName(): Component;
    get entryCollector(): DisplayItemsGenerator;
    get key(): ResourceKey<CreativeModeTab>;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'dragomordor.simpletms.item' {
  import { Item } from 'net.minecraft.world.item';
  import { Properties } from 'Item';

  interface SimpleTMsItem extends Item {}
  class SimpleTMsItem extends Item {
    constructor(settings: Properties);
  }

}

declare module 'dragomordor.simpletms.loot' {
  class SimpleTMsLootTables {
    static readonly INSTANCE: SimpleTMsLootTables;
  }

}

declare module 'dragomordor.simpletms.neoforge' {
  class SimpleTMs {
    static readonly INSTANCE: SimpleTMs;
  }


  class SimpleTMsClient {
    static readonly INSTANCE: SimpleTMsClient;
    init(): void;
  }

}

declare module 'dragomordor.simpletms' {
  import { Logger } from 'org.slf4j';
  import { SimpleTMsConfig } from 'dragomordor.simpletms.config';

  class SimpleTMs {
    static readonly INSTANCE: SimpleTMs;
    static readonly MOD_ID: string;
    static readonly VERSION: string;
    static readonly CONFIG_PATH: string;
    static readonly LOGGER: Logger;
    static config: SimpleTMsConfig;
    get config(): SimpleTMsConfig;
    init(): void;
    preinit(): void;
    set config(simpleTMsConfig: SimpleTMsConfig);
  }


  class SimpleTMsClient {
    static readonly INSTANCE: SimpleTMsClient;
    init(): void;
  }

}

declare module 'dragomordor.simpletms.ui' {
  import { Enum } from 'java.lang';
  import { EnumEntries } from 'kotlin.enums';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { Companion } from 'dragomordor.simpletms.ui.MoveCaseScreen';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { Minecraft } from 'net.minecraft.client';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Set } from 'java.util';
  import { RegistrySupplier } from 'dev.architectury.registry.registries';
  import { MenuType } from 'net.minecraft.world.inventory';
  import { Companion as dragomordor_simpletms_ui_tmmachinescreen_Companion } from 'dragomordor.simpletms.ui.TMMachineScreen';

  class ClientFilterStorage {
    static readonly INSTANCE: ClientFilterStorage;
    get machineOwnershipFilter(): OwnershipFilter;
    get machinePokemonFilter(): PokemonFilterData;
    get machineSearchQuery(): string;
    get machineTypeFilter(): MoveTypeFilter;
    get tMCaseFilterMode(): FilterMode;
    get tMCasePokemonFilter(): PokemonFilterData;
    get tMCaseSearchQuery(): string;
    get tRCaseFilterMode(): FilterMode;
    get tRCasePokemonFilter(): PokemonFilterData;
    get tRCaseSearchQuery(): string;
    getCaseFilterMode(isTR: boolean): FilterMode;
    getCasePokemonFilter(isTR: boolean): PokemonFilterData;
    getCaseSearchQuery(isTR: boolean): string;
    isCasePokemonFilterEnabled(isTR: boolean): boolean;
    isMachinePokemonFilterEnabled(): boolean;
    isTMCasePokemonFilterEnabled(): boolean;
    isTRCasePokemonFilterEnabled(): boolean;
    resetAll(): void;
    set machineOwnershipFilter(filter: OwnershipFilter);
    set machinePokemonFilter(filter: PokemonFilterData);
    set machineSearchQuery(query: string);
    set machineTypeFilter(filter: MoveTypeFilter);
    set tMCaseFilterMode(mode: FilterMode);
    set tMCasePokemonFilter(filter: PokemonFilterData);
    set tMCaseSearchQuery(query: string);
    set tRCaseFilterMode(mode: FilterMode);
    set tRCasePokemonFilter(filter: PokemonFilterData);
    set tRCaseSearchQuery(query: string);
    setCaseFilterMode(isTR: boolean, mode: FilterMode): void;
    setCasePokemonFilter(isTR: boolean, filter: PokemonFilterData): void;
    setCasePokemonFilterEnabled(isTR: boolean, enabled: boolean): void;
    setCaseSearchQuery(isTR: boolean, query: string): void;
    setMachinePokemonFilterEnabled(enabled: boolean): void;
    setTMCasePokemonFilterEnabled(enabled: boolean): void;
    setTRCasePokemonFilterEnabled(enabled: boolean): void;
  }


  interface FilterMode extends Enum<FilterMode> {}
  class FilterMode extends Enum<FilterMode> {
    static readonly ALL: FilterMode;
    static readonly OWNED_ONLY: FilterMode;
    static readonly MISSING_ONLY: FilterMode;
    static get entries(): EnumEntries<FilterMode>;
    static valueOf(value: string): FilterMode;
    static values(): FilterMode[];
  }


  interface MoveCaseScreen extends AbstractContainerScreen<MoveCaseMenu> {}
  class MoveCaseScreen extends AbstractContainerScreen<MoveCaseMenu> {
    static readonly Companion: Companion;
    constructor(menu: MoveCaseMenu, playerInventory: Inventory, title: Component);
    charTyped(codePoint: string, modifiers: number): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrollX: number, scrollY: number): boolean;
    onPokemonSelected(filterData: PokemonFilterData): void;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    resize(minecraft: Minecraft, width: number, height: number): void;
  }


  interface MoveTypeFilter extends Enum<MoveTypeFilter> {}
  class MoveTypeFilter extends Enum<MoveTypeFilter> {
    static readonly ALL: MoveTypeFilter;
    static readonly TM_ONLY: MoveTypeFilter;
    static readonly TR_ONLY: MoveTypeFilter;
    static get entries(): EnumEntries<MoveTypeFilter>;
    static valueOf(value: string): MoveTypeFilter;
    static values(): MoveTypeFilter[];
  }


  interface OwnershipFilter extends Enum<OwnershipFilter> {}
  class OwnershipFilter extends Enum<OwnershipFilter> {
    static readonly ALL: OwnershipFilter;
    static readonly OWNED_ONLY: OwnershipFilter;
    static readonly MISSING_ONLY: OwnershipFilter;
    static get entries(): EnumEntries<OwnershipFilter>;
    static valueOf(value: string): OwnershipFilter;
    static values(): OwnershipFilter[];
  }


  class PokemonFilterData {
    constructor(speciesId: string, formName: string, displayName: string, learnableMoves: Set<string>);
    component1(): string;
    component2(): string;
    component3(): string;
    component4(): Set<string>;
    copy(speciesId: string, formName: string, displayName: string, learnableMoves: Set<string>): PokemonFilterData;
    static copy$default(pokemonFilterData: PokemonFilterData, string: string, string2: string, string3: string, set: Set, n: number, object: any): PokemonFilterData;
    equals(other: any): boolean;
    get displayName(): string;
    get formName(): string;
    get learnableMoves(): Set<string>;
    get speciesId(): string;
    hashCode(): number;
    toString(): string;
  }


  class SimpleTMsMenuTypes {
    static readonly INSTANCE: SimpleTMsMenuTypes;
    get mOVE_CASE_MENU(): RegistrySupplier<MenuType<MoveCaseMenu>>;
    get tM_MACHINE_MENU(): RegistrySupplier<MenuType<TMMachineMenu>>;
    register(): void;
  }


  class SimpleTMsScreens {
    static readonly INSTANCE: SimpleTMsScreens;
    register(): void;
  }


  interface TMMachineScreen extends AbstractContainerScreen<TMMachineMenu> {}
  class TMMachineScreen extends AbstractContainerScreen<TMMachineMenu> {
    static readonly Companion: dragomordor_simpletms_ui_tmmachinescreen_Companion;
    constructor(menu: TMMachineMenu, playerInventory: Inventory, title: Component);
    charTyped(codePoint: string, modifiers: number): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrollX: number, scrollY: number): boolean;
    onPokemonSelected(speciesId: string, formName: string, displayName: string, learnableMoves: Set<string>): void;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    resize(minecraft: Minecraft, width: number, height: number): void;
  }

}

declare module 'dragomordor.simpletms.ui.MoveCaseScreen' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
  }


  class WhenMappings {
    static readonly $EnumSwitchMapping$0: number[];
  }

}

declare module 'dragomordor.simpletms.ui.TMMachineScreen' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
  }


  class WhenMappings {
    static readonly $EnumSwitchMapping$0: number[];
    static readonly $EnumSwitchMapping$1: number[];
  }

}

declare module 'dragomordor.simpletms.util' {
  import { Companion } from 'dragomordor.simpletms.util.FailureMessage';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Color } from 'java.awt';
  import { Companion as dragomordor_simpletms_util_movelearnitemdefinition_Companion } from 'dragomordor.simpletms.util.MoveLearnItemDefinition';
  import { SerializationConstructorMarker } from 'kotlinx.serialization.internal';
  import { CompositeEncoder } from 'kotlinx.serialization.encoding';
  import { SerialDescriptor } from 'kotlinx.serialization.descriptors';
  import { TagKey } from 'net.minecraft.tags';

  class FailureMessage {
    static readonly Companion: Companion;
    static message: Component;
  }


  class MiscUtilsKt {
    static fromLang(prefixOrModid: string, subKey: string, ...objects: any[]): MutableComponent;
    static interpolateColor(value: number, min: number, max: number, startColor: Color, endColor: Color): Color;
    static simpletmsResource(path: string): ResourceLocation;
  }


  class MoveLearnItemDefinition {
    static readonly Companion: dragomordor_simpletms_util_movelearnitemdefinition_Companion;
    constructor(moveName: string);

    constructor(seen0: number, moveName: string, serializationConstructorMarker: SerializationConstructorMarker);
    component1(): string;
    copy(moveName: string): MoveLearnItemDefinition;
    static copy$default(moveLearnItemDefinition: MoveLearnItemDefinition, string: string, n: number, object: any): MoveLearnItemDefinition;
    equals(other: any): boolean;
    get moveName(): string;
    hashCode(): number;
    toString(): string;
    static write$Self$common(self: MoveLearnItemDefinition, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
  }


  class SimpleTMsTags {
    static readonly INSTANCE: SimpleTMsTags;
    static readonly TM_ITEMS: TagKey;
    static readonly TR_ITEMS: TagKey;
    static readonly TYPE_NORMAL_TM: TagKey;
    static readonly TYPE_NORMAL_TR: TagKey;
    static readonly TYPE_FIGHTING_TM: TagKey;
    static readonly TYPE_FIGHTING_TR: TagKey;
    static readonly TYPE_FLYING_TM: TagKey;
    static readonly TYPE_FLYING_TR: TagKey;
    static readonly TYPE_POISON_TM: TagKey;
    static readonly TYPE_POISON_TR: TagKey;
    static readonly TYPE_GROUND_TM: TagKey;
    static readonly TYPE_GROUND_TR: TagKey;
    static readonly TYPE_ROCK_TM: TagKey;
    static readonly TYPE_ROCK_TR: TagKey;
    static readonly TYPE_BUG_TM: TagKey;
    static readonly TYPE_BUG_TR: TagKey;
    static readonly TYPE_GHOST_TM: TagKey;
    static readonly TYPE_GHOST_TR: TagKey;
    static readonly TYPE_STEEL_TM: TagKey;
    static readonly TYPE_STEEL_TR: TagKey;
    static readonly TYPE_FIRE_TM: TagKey;
    static readonly TYPE_FIRE_TR: TagKey;
    static readonly TYPE_WATER_TM: TagKey;
    static readonly TYPE_WATER_TR: TagKey;
    static readonly TYPE_GRASS_TM: TagKey;
    static readonly TYPE_GRASS_TR: TagKey;
    static readonly TYPE_ELECTRIC_TM: TagKey;
    static readonly TYPE_ELECTRIC_TR: TagKey;
    static readonly TYPE_PSYCHIC_TM: TagKey;
    static readonly TYPE_PSYCHIC_TR: TagKey;
    static readonly TYPE_ICE_TM: TagKey;
    static readonly TYPE_ICE_TR: TagKey;
    static readonly TYPE_DRAGON_TM: TagKey;
    static readonly TYPE_DRAGON_TR: TagKey;
    static readonly TYPE_DARK_TM: TagKey;
    static readonly TYPE_DARK_TR: TagKey;
    static readonly TYPE_FAIRY_TM: TagKey;
    static readonly TYPE_FAIRY_TR: TagKey;
    static readonly TYPE_COSMIC_TM: TagKey;
    static readonly TYPE_COSMIC_TR: TagKey;
    static readonly TYPE_CRYSTAL_TM: TagKey;
    static readonly TYPE_CRYSTAL_TR: TagKey;
    static readonly TYPE_DIGITAL_TM: TagKey;
    static readonly TYPE_DIGITAL_TR: TagKey;
    static readonly TYPE_LIGHT_TM: TagKey;
    static readonly TYPE_LIGHT_TR: TagKey;
    static readonly TYPE_NUCLEAR_TM: TagKey;
    static readonly TYPE_NUCLEAR_TR: TagKey;
    static readonly TYPE_PLASTIC_TM: TagKey;
    static readonly TYPE_PLASTIC_TR: TagKey;
    static readonly TYPE_UNKNOWN_TM: TagKey;
    static readonly TYPE_UNKNOWN_TR: TagKey;
    static readonly TYPE_SHADOW_TM: TagKey;
    static readonly TYPE_SHADOW_TR: TagKey;
    static readonly TYPE_SLIME_TM: TagKey;
    static readonly TYPE_SLIME_TR: TagKey;
    static readonly TYPE_SOUND_TM: TagKey;
    static readonly TYPE_SOUND_TR: TagKey;
    static readonly TYPE_WIND_TM: TagKey;
    static readonly TYPE_WIND_TR: TagKey;
    static readonly CATEGORY_PHYSICAL_TM: TagKey;
    static readonly CATEGORY_PHYSICAL_TR: TagKey;
    static readonly CATEGORY_STATUS_TM: TagKey;
    static readonly CATEGORY_STATUS_TR: TagKey;
    static readonly CATEGORY_SPECIAL_TM: TagKey;
    static readonly CATEGORY_SPECIAL_TR: TagKey;
    static readonly TM_TR_CASE_ITEMS: TagKey;
  }

}

declare module 'dragomordor.simpletms.util.FailureMessage' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Component } from 'net.minecraft.network.chat';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get failureMessage(): Component;
    get message(): Component;
    set failureMessage(message: Component);
    set message(component: Component);
  }

}

declare module 'dragomordor.simpletms.util.MoveLearnItemDefinition' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { MoveLearnItemDefinition } from 'dragomordor.simpletms.util';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<MoveLearnItemDefinition>;
  }

}