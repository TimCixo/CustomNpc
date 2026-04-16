declare module 'net.p3pp3rf1y.sophisticatedbackpacks.api' {
  import { Player } from 'net.minecraft.world.entity.player';
  import { BlockPos } from 'net.minecraft.core';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Level } from 'net.minecraft.world.level';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { IEnergyStorage } from 'net.neoforged.neoforge.energy';
  import { Entity } from 'net.minecraft.world.entity';
  import { IStorageFluidHandler } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { ITrackedContentsItemHandler } from 'net.p3pp3rf1y.sophisticatedcore.inventory';
  import { IItemHandler } from 'net.neoforged.neoforge.items';

  class IAttackEntityResponseUpgrade {
    onAttackEntity(var1: Player): boolean;
  }


  class IBlockClickResponseUpgrade {
    onBlockClick(var1: Player, var2: BlockPos): boolean;
  }


  class IBlockPickResponseUpgrade {
    pickBlock(var1: Player, var2: ItemStack): boolean;
  }


  class IBlockToolSwapUpgrade {
    canProcessBlockInteract(): boolean;
    onBlockInteract(var1: Level, var2: BlockPos, var3: BlockState, var4: Player): boolean;
  }


  class IEnergyStorageUpgradeWrapper {
    wrapStorage(var1: IEnergyStorage): IEnergyStorage;
  }


  class IEntityToolSwapUpgrade {
    canProcessEntityInteract(): boolean;
    onEntityInteract(var1: Level, var2: Entity, var3: Player): boolean;
  }


  class IFluidHandlerWrapperUpgrade {
    wrapHandler(var1: IStorageFluidHandler, var2: ItemStack): IStorageFluidHandler;
  }


  class IInventoryWrapperUpgrade {
    wrapInventory(var1: ITrackedContentsItemHandler): ITrackedContentsItemHandler;
  }


  class IItemHandlerInteractionUpgrade {
    onHandlerInteract(var1: IItemHandler, var2: Player): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.backpack' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { UUID, Set, Collection, Optional, List, Map } from 'java.util';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Item, ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { Block, EntityBlock, SimpleWaterloggedBlock } from 'net.minecraft.world.level.block';
  import { BooleanProperty, DirectionProperty } from 'net.minecraft.world.level.block.state.properties';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level, LevelAccessor, BlockGetter, Explosion } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { BlockEntity, BlockEntityTicker, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { InteractionResult, InteractionResultHolder, InteractionHand } from 'net.minecraft.world';
  import { BlockHitResult } from 'net.minecraft.world.phys';
  import { RightClickBlock } from 'PlayerInteractEvent';
  import { Entity, EquipmentSlot, LivingEntity, SlotAccess } from 'net.minecraft.world.entity';
  import { RandomSource } from 'net.minecraft.util';
  import { IControllableStorage, ControllerBlockEntityBase } from 'net.p3pp3rf1y.sophisticatedcore.controller';
  import { Provider } from 'HolderLookup';
  import { ClientboundBlockEntityDataPacket } from 'net.minecraft.network.protocol.game';
  import { Connection } from 'net.minecraft.network';
  import { IBackpackWrapper } from 'net.p3pp3rf1y.sophisticatedbackpacks.backpack.wrapper';
  import { IItemHandler } from 'net.neoforged.neoforge.items';
  import { IFluidHandler } from 'net.neoforged.neoforge.fluids.capability';
  import { IEnergyStorage } from 'net.neoforged.neoforge.energy';
  import { IStorageWrapper, IStashStorageItem } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { ItemBase } from 'net.p3pp3rf1y.sophisticatedcore.util';
  import { IntSupplier, Supplier, UnaryOperator, Consumer, Function } from 'java.util.function';
  import { Properties, TooltipContext } from 'Item';
  import { Component } from 'net.minecraft.network.chat';
  import { TooltipComponent } from 'net.minecraft.world.inventory.tooltip';
  import { UseOnContext, BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { StashResult } from 'IStashStorageItem';
  import { Slot, ClickAction } from 'net.minecraft.world.inventory';
  import { SavedData } from 'net.minecraft.world.level.saveddata';
  import { Load } from 'LevelEvent';
  import { Pattern, Matcher } from 'java.util.regex';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { ItemEntity } from 'net.minecraft.world.entity.item';

  class AccessLogRecord {
    constructor(backpackItemRegistryName: ResourceLocation, backpackUuid: UUID, playerName: string, backpackName: string, clothColor: number, trimColor: number, accessTime: number, columnsTaken: number);
    static deserializeFromNBT(nbt: CompoundTag): AccessLogRecord;
    get accessTime(): number;
    get backpackItemRegistryName(): ResourceLocation;
    get backpackName(): string;
    get backpackUuid(): UUID;
    get clothColor(): number;
    get columnsTaken(): number;
    get playerName(): string;
    get trimColor(): number;
    serializeToNBT(): CompoundTag;
  }


  class BackpackAccessLogger {
    static get allBackpackLogs(): Collection<AccessLogRecord>;
    static get backpackUuids(): Set<UUID>;
    static get playerNames(): Set<string>;
    static getBackpackLog(backpackUuid: UUID): Optional<AccessLogRecord>;
    static getBackpackLogsForPlayer(playerName: string): Collection<AccessLogRecord>;
    static logPlayerAccess(player: Player, backpackItem: Item, backpackUuid: UUID, backpackName: string, clothColor: number, trimColor: number, columnsTaken: number): void;
  }


  interface BackpackBlock extends EntityBlock, SimpleWaterloggedBlock, Block {}
  class BackpackBlock extends EntityBlock {
    static readonly LEFT_TANK: BooleanProperty;
    static readonly RIGHT_TANK: BooleanProperty;
    static readonly BATTERY: BooleanProperty;
    static readonly FACING: DirectionProperty;
    constructor();

    constructor(explosionResistance: number);
    animateTick(state: BlockState, level: Level, pos: BlockPos, rand: RandomSource): void;
    canEntityDestroy(state: BlockState, world: BlockGetter, pos: BlockPos, entity: Entity): boolean;
    entityInside(state: BlockState, level: Level, pos: BlockPos, entity: Entity): void;
    getAnalogOutputSignal(blockState: BlockState, level: Level, pos: BlockPos): number;
    getExplosionResistance(state: BlockState, world: BlockGetter, pos: BlockPos, explosion: Explosion): number;
    getFluidState(state: BlockState): FluidState;
    getShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getTicker<T extends BlockEntity>(level: Level, state: BlockState, blockEntityType: BlockEntityType<T>): BlockEntityTicker<T>;
    hasAnalogOutputSignal(state: BlockState): boolean;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onRemove(state: BlockState, level: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    static playerInteract(event: RightClickBlock): void;
    playerWillDestroy(level: Level, pos: BlockPos, state: BlockState, player: Player): BlockState;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, level: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useWithoutItem(state: BlockState, level: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface BackpackBlockEntity extends IControllableStorage, BlockEntity {}
  class BackpackBlockEntity extends IControllableStorage {
    static readonly BACKPACK_DATA_TAG: string;
    constructor(pos: BlockPos, state: BlockState);
    canConnectStorages(): boolean;
    get backpackWrapper(): IBackpackWrapper;
    get controllerPos(): Optional<BlockPos>;
    get storageBlockLevel(): Level;
    get storageBlockPos(): BlockPos;
    get storageWrapper(): IStorageWrapper;
    get updatePacket(): ClientboundBlockEntityDataPacket;
    getExternalEnergyStorage(direction: Direction): IEnergyStorage;
    getExternalFluidHandler(direction: Direction): IFluidHandler;
    getExternalItemHandler(direction: Direction): IItemHandler;
    getUpdateTag(registries: Provider): CompoundTag;
    loadAdditional(tag: CompoundTag, registries: Provider): void;
    onChunkUnloaded(): void;
    onDataPacket(net: Connection, pkt: ClientboundBlockEntityDataPacket, registries: Provider): void;
    onLoad(): void;
    refreshRenderState(): void;
    registerController(controllerBlockEntity: ControllerBlockEntityBase): void;
    removeControllerPos(): void;
    static serverTick(level: Level, blockPos: BlockPos, backpackBlockEntity: BackpackBlockEntity): void;
    set controllerPos(controllerPos: BlockPos);
    setBackpack(backpack: ItemStack): void;
    setRemoved(): void;
    unregisterController(): void;
  }


  interface BackpackItem extends IStashStorageItem, ItemBase {}
  class BackpackItem extends IStashStorageItem {
    constructor(numberOfSlots: IntSupplier, numberOfUpgradeSlots: IntSupplier, blockSupplier: Supplier<BackpackBlock>);

    constructor(numberOfSlots: IntSupplier, numberOfUpgradeSlots: IntSupplier, blockSupplier: Supplier<BackpackBlock>, updateProperties: UnaryOperator<Properties>);
    addCreativeTabItems(itemConsumer: Consumer<ItemStack>): void;
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], tooltipFlag: TooltipFlag): void;
    canFitInsideContainerItems(): boolean;
    createEntity(level: Level, entity: Entity, itemstack: ItemStack): Entity;
    get numberOfSlots(): number;
    get numberOfUpgradeSlots(): number;
    getEquipmentSlot(stack: ItemStack): EquipmentSlot;
    getInventoryTooltip(stack: ItemStack): Optional<TooltipComponent>;
    getItemStashable(registries: Provider, storageStack: ItemStack, stack: ItemStack): StashResult;
    getTooltipImage(stack: ItemStack): Optional<TooltipComponent>;
    hasCustomEntity(stack: ItemStack): boolean;
    inventoryTick(stack: ItemStack, level: Level, entity: Entity, itemSlot: number, isSelected: boolean): void;
    makesPiglinsNeutral(stack: ItemStack, wearer: LivingEntity): boolean;
    onDroppedByPlayer(item: ItemStack, player: Player): boolean;
    overrideOtherStackedOnMe(storageStack: ItemStack, otherStack: ItemStack, slot: Slot, action: ClickAction, player: Player, carriedAccess: SlotAccess): boolean;
    overrideStackedOnOther(storageStack: ItemStack, slot: Slot, action: ClickAction, player: Player): boolean;
    static setColors(backpackStack: ItemStack, mainColor: number, accentColor: number): void;
    shouldCauseReequipAnimation(oldStack: ItemStack, newStack: ItemStack, slotChanged: boolean): boolean;
    stash(storageStack: ItemStack, stack: ItemStack, simulate: boolean): ItemStack;
    tryPlace(player: Player, direction: Direction, blockItemUseContext: BlockPlaceContext): InteractionResult;
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
    useOn(context: UseOnContext): InteractionResult;
  }


  class BackpackItemClient {
    static getTooltipImage(stack: ItemStack): TooltipComponent;
  }


  interface BackpackStorage extends SavedData {}
  class BackpackStorage extends SavedData {
    static get (): BackpackStorage;
    get accessLogs(): Map<UUID, AccessLogRecord>;
    getOrCreateBackpackContents(backpackUuid: UUID): CompoundTag;
    static load(nbt: CompoundTag, registries: Provider): BackpackStorage;
    static onClientWorldLoad(evt: Load): void;
    putAccessLog(alr: AccessLogRecord): void;
    removeBackpackContents(backpackUuid: UUID): void;
    removeNonPlayerBackpackContents(onlyWithEmptyInventory: boolean): number;
    removeUpdatedBackpackSettingsFlag(backpackUuid: UUID): boolean;
    save(compound: CompoundTag, registries: Provider): CompoundTag;
    setBackpackContents(backpackUuid: UUID, contents: CompoundTag): void;
  }


  class BackpackTemplates {
    static readonly EXPORT_TEMPLATE_NAMESPACE_PATTERN: Pattern;
    static readonly EXPORT_TEMPLATE_PATH_PATTERN: Pattern;
    static readonly INVALID_CHARACTER: Function;
    static exportTemplate(player: ServerPlayer, templateName: ResourceLocation, contentNbt: CompoundTag): void;
    static findNonMatchingCharacters(matcher: Matcher, input: string): string;
    static get templateNames(): Set<ResourceLocation>;
    static getBackpackTemplate(templateName: ResourceLocation): Optional<CompoundTag>;
    static getBackpackTemplateNoDatapack(templateName: ResourceLocation): Optional<CompoundTag>;
    static getTemplateNames(includeDatapackTemplates: boolean): Set<ResourceLocation>;
    static removeBackpackTemplate(templateName: ResourceLocation): void;
    static setBackpackTemplate(templateName: ResourceLocation, wrapper: IBackpackWrapper): void;
    static setBackpackTemplate(templateName: ResourceLocation, backpackItemRegistryName: ResourceLocation, contents: CompoundTag): void;
  }


  interface BackpackTemplateStorage extends SavedData {}
  class BackpackTemplateStorage extends SavedData {
    static get (): BackpackTemplateStorage;
    get backpackTemplates(): Map<ResourceLocation, CompoundTag>;
    getBackpackTemplate(templateName: ResourceLocation): Optional<CompoundTag>;
    static load(nbt: CompoundTag, registries: Provider): BackpackTemplateStorage;
    static onClientWorldLoad(evt: Load): void;
    removeBackpackTemplate(templateName: ResourceLocation): void;
    save(compound: CompoundTag, registries: Provider): CompoundTag;
    setBackpackTemplate(templateName: ResourceLocation, contents: CompoundTag): void;
  }


  class DatapackBackpackTemplateManager {
    static get backpackTemplates(): Map<ResourceLocation, CompoundTag>;
    static getBackpackTemplate(templateName: ResourceLocation): Optional<CompoundTag>;
  }


  class UUIDDeduplicator {
    static checkForDuplicateBackpacksAndRemoveTheirUUID(player: Player, backpackUuid: UUID, backpack: ItemStack): void;
    static dedupeBackpackItemEntityInArea(newBackpackItemEntity: ItemEntity): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.backpack.DatapackBackpackTemplateManager' {
  import { SimplePreparableReloadListener } from 'net.minecraft.server.packs.resources';
  import { Map } from 'java.util';

  interface Loader extends SimplePreparableReloadListener<Map> {}
  class Loader extends SimplePreparableReloadListener<Map> {
    static readonly INSTANCE: Loader;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.backpack.wrapper' {
  import { IStorageFluidHandler, IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { FluidStack } from 'net.neoforged.neoforge.fluids';
  import { FluidAction } from 'IFluidHandler';
  import { TagKey } from 'net.minecraft.tags';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { ItemStack } from 'net.minecraft.world.item';
  import { InventoryHandler, ITrackedContentsItemHandler } from 'net.p3pp3rf1y.sophisticatedcore.inventory';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Runnable, Integer } from 'java.lang';
  import { RenderInfo } from 'net.p3pp3rf1y.sophisticatedcore.renderdata';
  import { Supplier, Consumer, IntConsumer } from 'java.util.function';
  import { SettingsHandler, ISettingsCategory } from 'net.p3pp3rf1y.sophisticatedcore.settings';
  import { BackpackMainSettingsCategory } from 'net.p3pp3rf1y.sophisticatedbackpacks.settings';
  import { Optional, UUID } from 'java.util';
  import { IFluidHandlerItem } from 'net.neoforged.neoforge.fluids.capability';
  import { IEnergyStorage } from 'net.neoforged.neoforge.energy';
  import { UpgradeHandler } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { SortBy } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { Component } from 'net.minecraft.network.chat';

  interface BackpackFluidHandler extends IStorageFluidHandler {}
  class BackpackFluidHandler extends IStorageFluidHandler {
    constructor(backpackWrapper: IStorageWrapper);
    drain(resourceTag: TagKey<Fluid>, maxDrain: number, action: FluidAction, ignoreInOutLimit: boolean): FluidStack;
    drain(resource: FluidStack, action: FluidAction, ignoreInOutLimit: boolean): FluidStack;
    drain(resource: FluidStack, action: FluidAction): FluidStack;
    drain(maxDrain: number, action: FluidAction, ignoreInOutLimit: boolean): FluidStack;
    drain(maxDrain: number, action: FluidAction): FluidStack;
    fill(resource: FluidStack, action: FluidAction, ignoreInOutLimit: boolean): number;
    fill(resource: FluidStack, action: FluidAction): number;
    get container(): ItemStack;
    get tanks(): number;
    getFluidInTank(tank: number): FluidStack;
    getTankCapacity(tank: number): number;
    isFluidValid(tank: number, stack: FluidStack): boolean;
  }


  interface BackpackInventoryHandler extends InventoryHandler {}
  class BackpackInventoryHandler extends InventoryHandler {
    constructor(numberOfInventorySlots: number, storageWrapper: IStorageWrapper, contentsNbt: CompoundTag, saveHandler: Runnable, slotLimit: number);
  }


  interface BackpackRenderInfo extends RenderInfo {}
  class BackpackRenderInfo extends RenderInfo {
    constructor(backpack: ItemStack, getSaveHandler: Supplier<Runnable>);
  }


  interface BackpackSettingsHandler extends SettingsHandler {}
  class BackpackSettingsHandler extends SettingsHandler {
    static readonly SETTINGS_TAG: string;
    constructor(backpackWrapper: IStorageWrapper, backpackContentsNbt: CompoundTag, markBackpackContentsDirty: Runnable);
    copyTo(settingsHandler: SettingsHandler): void;
    get globalSettingsCategory(): BackpackMainSettingsCategory;
    get globalSettingsCategoryName(): string;
    instantiateGlobalSettingsCategory(categoryNbt: CompoundTag, saveNbt: Consumer<CompoundTag>): ISettingsCategory<any>;
  }


  interface BackpackWrapper extends IBackpackWrapper {}
  class BackpackWrapper extends IBackpackWrapper {
    static readonly DEFAULT_MAIN_COLOR: number;
    static readonly DEFAULT_ACCENT_COLOR: number;
    constructor(backpackStack: ItemStack);
    cloneBackpack(): ItemStack;
    copyDataTo(otherStorageWrapper: IStorageWrapper): void;
    fillFromTemplate(): void;
    fillWithLoot(player: Player): void;
    fillWithLoot(level: Level, pos: BlockPos): void;
    fillWithLoot(level: Level, pos: BlockPos, player: Player): void;
    fillWithLootAndExtraItems(level: Level, pos: BlockPos): void;
    static fromExistingData(stack: ItemStack): Optional<IBackpackWrapper>;
    static fromStack(stack: ItemStack): IBackpackWrapper;
    get accentColor(): number;
    get backpack(): ItemStack;
    get columnsTaken(): number;
    get contentsUuid(): Optional<UUID>;
    get displayName(): Component;
    get energyStorage(): Optional<IEnergyStorage>;
    get fluidHandler(): Optional<IStorageFluidHandler>;
    get inventoryForInputOutput(): ITrackedContentsItemHandler;
    get inventoryForUpgradeProcessing(): ITrackedContentsItemHandler;
    get inventoryHandler(): InventoryHandler;
    get itemFluidHandler(): Optional<IFluidHandlerItem>;
    get mainColor(): number;
    get numberOfSlotRows(): number;
    get openTabId(): Optional<number>;
    get renderInfo(): BackpackRenderInfo;
    get settingsHandler(): BackpackSettingsHandler;
    get sortBy(): SortBy;
    get storageType(): string;
    get upgradeHandler(): UpgradeHandler;
    get wrappedStorageStack(): ItemStack;
    isItemValid(slot: number, stack: ItemStack): boolean;
    onContentsNbtUpdated(): void;
    refreshInventoryForInputOutput(): void;
    refreshInventoryForUpgradeProcessing(): void;
    registerOnInventoryHandlerRefreshListener(onInventoryHandlerRefresh: Runnable): void;
    registerOnInventoryInputOutputHandlerRefreshListener(onInventoryForInputOutputHandlerRefresh: Runnable): void;
    registerOnSlotsChangeListener(onSlotsChange: IntConsumer): void;
    removeContentsUUIDTag(): void;
    removeContentsUuid(): void;
    removeOpenTabId(): void;
    set contentsUuid(storageUuid: UUID);
    set openTabId(openTabId: number);
    set sortBy(sortBy: SortBy);
    setBackpackStack(backpack: ItemStack): IBackpackWrapper;
    setColors(mainColor: number, accentColor: number): void;
    setColumnsTaken(columnsTaken: number, hasChanged: boolean): void;
    setContentsChangeHandler(contentsChangeHandler: Runnable): void;
    setInventorySlotChangeHandler(slotChangeHandler: Runnable): void;
    setLoot(lootTableName: ResourceLocation, lootFactor: number): void;
    setPersistent(persistent: boolean): void;
    setSlotNumbers(numberOfInventorySlots: number, numberOfUpgradeSlots: number): void;
    setTemplate(templateName: ResourceLocation): void;
    setUpgradeCachesInvalidatedHandler(handler: Runnable): void;
    sort(): void;
    unregisterOnInventoryHandlerRefreshListener(): void;
    unregisterOnSlotsChangeListener(): void;
  }


  interface EmptyEnergyStorage extends IEnergyStorage {}
  class EmptyEnergyStorage extends IEnergyStorage {
    static readonly INSTANCE: EmptyEnergyStorage;
    canExtract(): boolean;
    canReceive(): boolean;
    extractEnergy(maxExtract: number, simulate: boolean): number;
    get energyStored(): number;
    get maxEnergyStored(): number;
    receiveEnergy(maxReceive: number, simulate: boolean): number;
  }


  interface IBackpackWrapper extends IStorageWrapper {}
  class IBackpackWrapper extends IStorageWrapper {
    cloneBackpack(): ItemStack;
    copyDataTo(var1: IStorageWrapper): void;
    fillFromTemplate(): void;
    fillWithLootAndExtraItems(level: Level, pos: BlockPos): void;
    get backpack(): ItemStack;
    get itemFluidHandler(): Optional<IFluidHandlerItem>;
    get settingsHandler(): BackpackSettingsHandler;
    registerOnInventoryHandlerRefreshListener(onInventoryHandlerRefresh: Runnable): void;
    registerOnSlotsChangeListener(onSlotsChange: IntConsumer): void;
    removeContentsUUIDTag(): void;
    removeContentsUuid(): void;
    setBackpackStack(var1: ItemStack): IBackpackWrapper;
    setContentsUuid(var1: UUID): void;
    setLoot(var1: ResourceLocation, var2: number): void;
    setSlotNumbers(var1: number, var2: number): void;
    setTemplate(var1: ResourceLocation): void;
    unregisterOnInventoryHandlerRefreshListener(): void;
    unregisterOnSlotsChangeListener(): void;
  }


  class InventoryModificationHandler {
    constructor(backpackWrapper: IStorageWrapper);
    get modifiedInventoryHandler(): ITrackedContentsItemHandler;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.backpack.wrapper.IBackpackWrapper' {
  import { NoopStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.util';
  import { IBackpackWrapper, BackpackSettingsHandler } from 'net.p3pp3rf1y.sophisticatedbackpacks.backpack.wrapper';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { UUID } from 'java.util';

  interface Noop extends IBackpackWrapper, NoopStorageWrapper {}
  class Noop extends IBackpackWrapper {
    static readonly INSTANCE: Noop;
    cloneBackpack(): ItemStack;
    copyDataTo(otherStorageWrapper: IStorageWrapper): void;
    fillFromTemplate(): void;
    get backpack(): ItemStack;
    get settingsHandler(): BackpackSettingsHandler;
    setBackpackStack(backpackStack: ItemStack): IBackpackWrapper;
    setContentsUuid(storageUuid: UUID): void;
    setLoot(lootTableName: ResourceLocation, lootPercentage: number): void;
    setSlotNumbers(numberOfInventorySlots: number, numberOfUpgradeSlots: number): void;
    setTemplate(templateName: ResourceLocation): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.client' {
  import { ModelLayerLocation } from 'net.minecraft.client.model.geom';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { RegisterClientReloadListenersEvent, RegisterKeyMappingsEvent } from 'net.neoforged.neoforge.client.event';
  import { RegisterLayerDefinitions } from 'EntityRenderersEvent';
  import { InteractionKeyMappingTriggered } from 'InputEvent';
  import { BlockEntityWithoutLevelRenderer } from 'net.minecraft.client.renderer';
  import { KeyMapping } from 'net.minecraft.client';
  import { Map } from 'java.util';
  import { Pre } from 'ScreenEvent.KeyPressed';
  import { Pre as screenevent_mousebuttonpressed_Pre } from 'ScreenEvent.MouseButtonPressed';
  import { Post } from 'ClientTickEvent';

  class ClientEventHandler {
    static readonly BACKPACK_LAYER: ModelLayerLocation;
    get customRenderer(): BlockEntityWithoutLevelRenderer;
    static handleBlockPick(event: InteractionKeyMappingTriggered): void;
    static registerHandlers(modBus: IEventBus): void;
    static registerLayer(event: RegisterLayerDefinitions): void;
    static registerReloadListener(event: RegisterClientReloadListenersEvent): void;
  }


  class KeybindHandler {
    static readonly BACKPACK_TOGGLE_UPGRADE_5: KeyMapping;
    static readonly BACKPACK_TOGGLE_UPGRADE_4: KeyMapping;
    static readonly BACKPACK_TOGGLE_UPGRADE_3: KeyMapping;
    static readonly BACKPACK_TOGGLE_UPGRADE_2: KeyMapping;
    static readonly BACKPACK_TOGGLE_UPGRADE_1: KeyMapping;
    static readonly UPGRADE_SLOT_TOGGLE_KEYBINDS: Map;
    static readonly TOOL_SWAP_KEYBIND: KeyMapping;
    static readonly INVENTORY_INTERACTION_KEYBIND: KeyMapping;
    static readonly BACKPACK_OPEN_KEYBIND: KeyMapping;
    static handleGuiKeyPress(event: Pre): void;
    static handleGuiMouseKeyPress(event: screenevent_mousebuttonpressed_Pre): void;
    static handleKeyInputEvent(event: Post): void;
    static register(): void;
    static registerKeyMappings(event: RegisterKeyMappingsEvent): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.client.gui' {
  import { StorageScreenBase, SettingsScreen } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { BackpackContainer } from 'net.p3pp3rf1y.sophisticatedbackpacks.common.gui';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { SettingsContainerMenu } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { Toggle } from 'ButtonDefinition';
  import { TranslationHelper } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';

  interface BackpackScreen extends IBackpackScreen, StorageScreenBase<BackpackContainer> {}
  class BackpackScreen extends IBackpackScreen {
    constructor(screenContainer: BackpackContainer, inv: Inventory, titleIn: Component);
    static constructScreen(screenContainer: BackpackContainer, inv: Inventory, title: Component): BackpackScreen;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface BackpackSettingsScreen extends SettingsScreen {}
  class BackpackSettingsScreen extends SettingsScreen {
    constructor(screenContainer: SettingsContainerMenu<any>, inv: Inventory, titleIn: Component);
    static constructScreen(settingsContainer: SettingsContainerMenu<any>, playerInventory: Inventory, title: Component): BackpackSettingsScreen;
  }


  class IBackpackScreen {
  }


  class SBPButtonDefinitions {
    static readonly BACKPACK_CONTENTS_FILTER_TYPE: Toggle;
    static readonly SHIFT_CLICK_TARGET: Toggle;
    static readonly REFILL_CRAFTING_GRID: Toggle;
  }


  interface SBPTranslationHelper extends TranslationHelper {}
  class SBPTranslationHelper extends TranslationHelper {
    static readonly INSTANCE: SBPTranslationHelper;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.client.init' {
  import { Block, Item } from 'RegisterColorHandlersEvent';

  class ModBlockColors {
    static registerBlockColorHandlers(event: Block): void;
  }


  class ModItemColors {
    static registerItemColorHandlers(event: Item): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.client.render' {
  import { BlockEntityRenderer, BlockEntityRenderDispatcher } from 'net.minecraft.client.renderer.blockentity';
  import { BackpackBlockEntity } from 'net.p3pp3rf1y.sophisticatedbackpacks.backpack';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource, BlockEntityWithoutLevelRenderer } from 'net.minecraft.client.renderer';
  import { IUnbakedGeometry, IGeometryBakingContext } from 'net.neoforged.neoforge.client.model.geometry';
  import { BakedModel, ModelBaker, Material, ModelState, UnbakedModel } from 'net.minecraft.client.resources.model';
  import { Function } from 'java.util.function';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { ItemOverrides } from 'net.minecraft.client.renderer.block.model';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { EntityModelSet, ModelPart } from 'net.minecraft.client.model.geom';
  import { ItemStack, ItemDisplayContext, Item } from 'net.minecraft.world.item';
  import { RenderLayer } from 'net.minecraft.client.renderer.entity.layers';
  import { RenderLayerParent } from 'net.minecraft.client.renderer.entity';
  import { LivingEntity, EquipmentSlot } from 'net.minecraft.world.entity';
  import { EntityModel, AgeableListModel } from 'net.minecraft.client.model';
  import { LayerDefinition } from 'net.minecraft.client.model.geom.builders';
  import { RenderInfo } from 'net.p3pp3rf1y.sophisticatedcore.renderdata';
  import { FluidStack } from 'net.neoforged.neoforge.fluids';
  import { ClientStorageContentsTooltipBase } from 'net.p3pp3rf1y.sophisticatedcore.client.render';
  import { BackpackContentsTooltip } from 'net.p3pp3rf1y.sophisticatedbackpacks.backpack.BackpackItem';
  import { Load } from 'LevelEvent';
  import { Font, GuiGraphics } from 'net.minecraft.client.gui';
  import { Context } from 'BlockEntityRendererProvider';

  interface BackpackBlockEntityRenderer extends BlockEntityRenderer<BackpackBlockEntity> {}
  class BackpackBlockEntityRenderer extends BlockEntityRenderer<BackpackBlockEntity> {
    render(backpackBlockEntity: BackpackBlockEntity, partialTicks: number, poseStack: PoseStack, buffer: MultiBufferSource, combinedLight: number, combinedOverlay: number): void;
  }


  interface BackpackDynamicModel extends IUnbakedGeometry<BackpackDynamicModel> {}
  class BackpackDynamicModel extends IUnbakedGeometry<BackpackDynamicModel> {
    bake(context: IGeometryBakingContext, baker: ModelBaker, spriteGetter: Function<Material, TextureAtlasSprite>, modelTransform: ModelState, overrides: ItemOverrides): BakedModel;
    resolveParents(modelGetter: Function<ResourceLocation, UnbakedModel>, context: IGeometryBakingContext): void;
  }


  interface BackpackItemStackRenderer extends BlockEntityWithoutLevelRenderer {}
  class BackpackItemStackRenderer extends BlockEntityWithoutLevelRenderer {
    constructor(blockEntityRenderDispatcher: BlockEntityRenderDispatcher, entityModelSet: EntityModelSet);
    renderByItem(stack: ItemStack, transformType: ItemDisplayContext, matrixStack: PoseStack, buffer: MultiBufferSource, combinedLight: number, combinedOverlay: number): void;
  }


  interface BackpackLayerRenderer<T extends LivingEntity = any, M extends EntityModel<T> = any> extends RenderLayer<T, M> {}
  class BackpackLayerRenderer<T extends LivingEntity = any, M extends EntityModel<T> = any> extends RenderLayer<T, M> {
    constructor(entityRendererIn: RenderLayerParent<T, M>);
    render(poseStack: PoseStack, buffer: MultiBufferSource, packedLight: number, entity: T, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
    static renderBackpack<T extends LivingEntity, M extends EntityModel<T>>(parentModel: M, livingEntity: LivingEntity, matrixStack: PoseStack, buffer: MultiBufferSource, packedLight: number, backpack: ItemStack, wearsArmor: boolean, model: IBackpackModel): void;
  }


  interface BackpackModel extends IBackpackModel, AgeableListModel<LivingEntity> {}
  class BackpackModel extends IBackpackModel {
    static readonly CHILD_Y_OFFSET: number;
    static readonly CHILD_Z_OFFSET: number;
    static readonly CHILD_SCALE: number;
    readonly cloth: ModelPart;
    readonly border: ModelPart;
    readonly fabric: ModelPart;
    readonly leftTankGlass: ModelPart;
    readonly rightTankGlass: ModelPart;
    constructor(part: ModelPart);
    static createBodyLayer(): LayerDefinition;
    get renderEquipmentSlot(): EquipmentSlot;
    render<L extends LivingEntity, M extends EntityModel<L>>(parentModel: M, livingEntity: LivingEntity, poseStack: PoseStack, buffer: MultiBufferSource, packedLight: number, clothColor: number, borderColor: number, backpackItem: Item, renderInfo: RenderInfo): void;
    renderBatteryCharge(matrixStack: PoseStack, buffer: MultiBufferSource, packedLight: number, chargeRatio: number): void;
    renderFluid(matrixStack: PoseStack, buffer: MultiBufferSource, packedLight: number, fluidStack: FluidStack, fill: number, left: boolean): void;
    renderToBuffer(matrixStack: PoseStack, buffer: VertexConsumer, packedLight: number, packedOverlay: number, color: number): void;
    setupAnim(entityIn: LivingEntity, limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
    translateRotateAndScale<L extends LivingEntity, M extends EntityModel<L>>(parentModel: M, livingEntity: LivingEntity, poseStack: PoseStack, wearsArmor: boolean): void;
  }


  class BackpackModelManager {
    static getBackpackModel(backpackItem: Item): IBackpackModel;
    static initModels(): void;
    static registerBackpackModelProvider(provider: IBackpackModelProvider): void;
  }


  interface ClientBackpackContentsTooltip extends ClientStorageContentsTooltipBase {}
  class ClientBackpackContentsTooltip extends ClientStorageContentsTooltipBase {
    constructor(tooltip: BackpackContentsTooltip);
    static onWorldLoad(event: Load): void;
    renderImage(font: Font, leftX: number, topY: number, guiGraphics: GuiGraphics): void;
  }


  class IBackpackModel {
    get renderEquipmentSlot(): EquipmentSlot;
    render<L extends LivingEntity, M extends EntityModel<L>>(var1: M, var2: LivingEntity, var3: PoseStack, var4: MultiBufferSource, var5: number, var6: number, var7: number, var8: Item, var9: RenderInfo): void;
    renderBatteryCharge(var1: PoseStack, var2: MultiBufferSource, var3: number, var4: number): void;
    renderFluid(var1: PoseStack, var2: MultiBufferSource, var3: number, var4: FluidStack, var5: number, var6: boolean): void;
    translateRotateAndScale<L extends LivingEntity, M extends EntityModel<L>>(var1: M, var2: LivingEntity, var3: PoseStack, var4: boolean): void;
  }


  class IBackpackModelProvider {
    getBackpackModel(var1: Item): IBackpackModel;
    initModels(): void;
    initModels(var1: Context): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.client.render.BackpackDynamicModel' {
  import { IGeometryLoader } from 'net.neoforged.neoforge.client.model.geometry';
  import { BackpackDynamicModel } from 'net.p3pp3rf1y.sophisticatedbackpacks.client.render';
  import { JsonObject, JsonDeserializationContext } from 'com.google.gson';

  interface Loader extends IGeometryLoader<BackpackDynamicModel> {}
  class Loader extends IGeometryLoader<BackpackDynamicModel> {
    static readonly INSTANCE: Loader;
    read(modelContents: JsonObject, deserializationContext: JsonDeserializationContext): BackpackDynamicModel;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.command' {
  import { ItemArgument } from 'net.minecraft.commands.arguments.item';
  import { CommandBuildContext, CommandSourceStack } from 'net.minecraft.commands';
  import { Stream } from 'java.util.stream';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { Registry } from 'net.minecraft.core';
  import { Optional, Collection } from 'java.util';
  import { RegistryLookup } from 'HolderLookup';
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { StringReader } from 'com.mojang.brigadier';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Suggestions, SuggestionsBuilder } from 'com.mojang.brigadier.suggestion';
  import { CommandContext } from 'com.mojang.brigadier.context';
  import { UuidArgument } from 'net.minecraft.commands.arguments';
  import { IEventBus } from 'net.neoforged.bus.api';

  interface BackpackItemArgumentType extends ItemArgument {}
  class BackpackItemArgumentType extends ItemArgument {
    constructor(context: CommandBuildContext);
    get examples(): Collection<string>;
    static item(context: CommandBuildContext): BackpackItemArgumentType;
    listRegistries(): Stream<ResourceKey<Registry<any>>>;
    lookup<T>(resourceKey: ResourceKey<Registry<T>>): Optional<RegistryLookup<T>>;
  }


  interface BackpackPlayerArgumentType extends ArgumentType<string> {}
  class BackpackPlayerArgumentType extends ArgumentType<string> {
    get examples(): Collection<string>;
    listSuggestions<S>(context: CommandContext<S>, builder: SuggestionsBuilder): CompletableFuture<Suggestions>;
    parse(reader: StringReader): string;
    static playerName(): BackpackPlayerArgumentType;
  }


  interface BackpackTemplateArgumentType extends ArgumentType<ResourceLocation> {}
  class BackpackTemplateArgumentType extends ArgumentType<ResourceLocation> {
    constructor(includeDatapackTemplates: boolean);
    get examples(): Collection<string>;
    static getId(context: CommandContext<CommandSourceStack>, name: string): ResourceLocation;
    listSuggestions<S>(context: CommandContext<S>, builder: SuggestionsBuilder): CompletableFuture<Suggestions>;
    parse(reader: StringReader): ResourceLocation;
    static templateName(): BackpackTemplateArgumentType;
    static templateName(includeDatapackTemplates: boolean): BackpackTemplateArgumentType;
  }


  interface BackpackUpgradeItemArgumentType extends ItemArgument {}
  class BackpackUpgradeItemArgumentType extends ItemArgument {
    constructor(context: CommandBuildContext);
    get examples(): Collection<string>;
    static item(context: CommandBuildContext): BackpackUpgradeItemArgumentType;
    listRegistries(): Stream<ResourceKey<Registry<any>>>;
    lookup<T>(resourceKey: ResourceKey<Registry<T>>): Optional<RegistryLookup<T>>;
  }


  interface BackpackUUIDArgumentType extends UuidArgument {}
  class BackpackUUIDArgumentType extends UuidArgument {
    static backpackUuid(): BackpackUUIDArgumentType;
    listSuggestions<S>(context: CommandContext<S>, builder: SuggestionsBuilder): CompletableFuture<Suggestions>;
  }


  class DynamicCommand {
  }


  class GiveCommand {
  }


  class ListCommand {
  }


  class RemoveNonPlayerCommand {
  }


  class SBPCommand {
    static init(modBus: IEventBus): void;
  }


  class TemplateCommand {
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.common' {
  import { IEventBus } from 'net.neoforged.bus.api';
  import { Creeper, Monster } from 'net.minecraft.world.entity.monster';
  import { Level } from 'net.minecraft.world.level';
  import { Post } from 'EntityTickEvent';

  class CommonEventHandler {
    registerHandlers(modBus: IEventBus): void;
  }


  class EntityBackpackAdditionHandler {
    static onLivingUpdate(event: Post): void;
    static removeBackpackUuid(entity: Monster, level: Level): void;
    static removeBeneficialEffects(creeper: Creeper): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.common.gui' {
  import { StorageContainerMenuBase, ISyncedContainer, SettingsContainerMenu } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { IBackpackWrapper } from 'net.p3pp3rf1y.sophisticatedbackpacks.backpack.wrapper';
  import { Player, Inventory } from 'net.minecraft.world.entity.player';
  import { Optional } from 'java.util';
  import { BlockPos } from 'net.minecraft.core';
  import { Entity } from 'net.minecraft.world.entity';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { ContextType } from 'net.p3pp3rf1y.sophisticatedbackpacks.common.gui.BackpackContext';
  import { Component } from 'net.minecraft.network.chat';
  import { Level } from 'net.minecraft.world.level';

  interface BackpackContainer extends ISyncedContainer, StorageContainerMenuBase<IBackpackWrapper> {}
  class BackpackContainer extends ISyncedContainer {
    constructor(windowId: number, player: Player, backpackContext: BackpackContext);
    detectSettingsChangeAndReload(): boolean;
    static fromBuffer(windowId: number, playerInventory: Inventory, buffer: FriendlyByteBuf): BackpackContainer;
    get backpackContext(): BackpackContext;
    get blockPosition(): Optional<BlockPos>;
    get entity(): Optional<Entity>;
    openSettings(): void;
    stillValid(player: Player): boolean;
  }


  class BackpackContext {
    static readonly SUBBACKPACK_DISPLAY_NAME_PREFIX: string;
    addToBuffer(var1: FriendlyByteBuf): void;
    canInteractWith(var1: Player): boolean;
    static fromBuffer(buffer: FriendlyByteBuf, level: Level): BackpackContext;
    get backpackSlotIndex(): number;
    get parentBackpackContext(): BackpackContext;
    get type(): ContextType;
    getBackpackPosition(playerEntity: Player): BlockPos;
    getBackpackWrapper(var1: Player): IBackpackWrapper;
    getDisplayName(player: Player): Component;
    getOwnerPlayer(player: Player): Optional<Entity>;
    getParentBackpackWrapper(var1: Player): Optional<IStorageWrapper>;
    getSubBackpackContext(var1: number, var2: boolean): BackpackContext;
    onUpgradeChanged(var1: Player): void;
    saveBackpackStack(): void;
    shouldLockBackpackSlot(var1: Player): boolean;
    shouldSaveAfterOpen(): boolean;
    toBuffer(buffer: FriendlyByteBuf): void;
    wasOpenFromInventory(): boolean;
  }


  interface BackpackSettingsContainerMenu extends IContextAwareContainer, SettingsContainerMenu<IBackpackWrapper> {}
  class BackpackSettingsContainerMenu extends IContextAwareContainer {
    broadcastChanges(): void;
    detectSettingsChangeAndReload(): void;
    static fromBuffer(windowId: number, playerInventory: Inventory, buffer: FriendlyByteBuf): BackpackSettingsContainerMenu;
    get backpackContext(): BackpackContext;
  }


  class IContextAwareContainer {
    get backpackContext(): BackpackContext;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.common.gui.BackpackContainer' {
  import { StorageUpgradeSlot } from 'StorageContainerMenuBase';
  import { UpgradeHandler } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';

  interface BackpackUpgradeSlot extends StorageUpgradeSlot {}
  class BackpackUpgradeSlot extends StorageUpgradeSlot {
    constructor(upgradeHandler: UpgradeHandler, slotIndex: number);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.common.gui.BackpackContext' {
  import { Enum } from 'java.lang';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { List, Optional } from 'java.util';
  import { BackpackContext } from 'net.p3pp3rf1y.sophisticatedbackpacks.common.gui';
  import { BlockPos } from 'net.minecraft.core';
  import { Player } from 'net.minecraft.world.entity.player';
  import { IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { IBackpackWrapper } from 'net.p3pp3rf1y.sophisticatedbackpacks.backpack.wrapper';
  import { Entity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { Component } from 'net.minecraft.network.chat';

  interface ContextType extends Enum<ContextType> {}
  class ContextType extends Enum<ContextType> {
    static readonly BLOCK_BACKPACK: ContextType;
    static readonly BLOCK_SUB_BACKPACK: ContextType;
    static readonly ITEM_BACKPACK: ContextType;
    static readonly ITEM_SUB_BACKPACK: ContextType;
    static readonly ANOTHER_PLAYER_BACKPACK: ContextType;
    static readonly ANOTHER_PLAYER_SUB_BACKPACK: ContextType;
    static fromBuffer(buffer: FriendlyByteBuf): ContextType;
    toBuffer(buffer: FriendlyByteBuf): void;
    static valueOf(name: string): ContextType;
    static values(): ContextType[];
  }


  interface Block extends BackpackContext {}
  class Block extends BackpackContext {
    constructor(pos: BlockPos);
    addToBuffer(buffer: FriendlyByteBuf): void;
    canInteractWith(player: Player): boolean;
    static fromBuffer(buffer: FriendlyByteBuf): BackpackContext;
    static fromBuffer(buffer: FriendlyByteBuf, level: Level): BackpackContext;
    get backpackSlotIndex(): number;
    get parentBackpackContext(): BackpackContext;
    get type(): ContextType;
    getBackpackPosition(playerEntity: Player): BlockPos;
    getBackpackWrapper(player: Player): IBackpackWrapper;
    getOwnerPlayer(player: Player): Optional<Entity>;
    getParentBackpackWrapper(player: Player): Optional<IStorageWrapper>;
    getSubBackpackContext(subBackpackSlotIndex: number, saveAfterOpen: boolean): BackpackContext;
    onUpgradeChanged(player: Player): void;
    shouldLockBackpackSlot(player: Player): boolean;
  }


  interface BlockSubBackpack extends Block {}
  class BlockSubBackpack extends Block {
    constructor(pos: BlockPos, subBackpackSlotIndex: number, saveAfterOpen: boolean);
    addToBuffer(buffer: FriendlyByteBuf): void;
    static fromBuffer(buffer: FriendlyByteBuf): BackpackContext;
    static fromBuffer(buffer: FriendlyByteBuf, level: Level): BackpackContext;
    get parentBackpackContext(): BackpackContext;
    get type(): ContextType;
    getBackpackWrapper(player: Player): IBackpackWrapper;
    getDisplayName(player: Player): Component;
    getParentBackpackWrapper(player: Player): Optional<IStorageWrapper>;
    onUpgradeChanged(player: Player): void;
    saveBackpackStack(): void;
    shouldSaveAfterOpen(): boolean;
  }


  interface ItemSubBackpack extends Item {}
  class ItemSubBackpack extends Item {
    constructor(handlerName: string, identifier: string, backpackSlotIndex: number, parentOpenFromInventory: boolean, subBackpackSlotIndex: number, saveAfterOpen: boolean);
    addToBuffer(buffer: FriendlyByteBuf): void;
    static fromBuffer(buffer: FriendlyByteBuf): BackpackContext;
    static fromBuffer(buffer: FriendlyByteBuf, level: Level): BackpackContext;
    get parentBackpackContext(): BackpackContext;
    get type(): ContextType;
    getBackpackWrapper(player: Player): IBackpackWrapper;
    getDisplayName(player: Player): Component;
    getParentBackpackWrapper(player: Player): Optional<IStorageWrapper>;
    onUpgradeChanged(player: Player): void;
    saveBackpackStack(): void;
    shouldSaveAfterOpen(): boolean;
  }


  interface Item extends BackpackContext {}
  class Item extends BackpackContext {
    constructor(handlerName: string, backpackSlotIndex: number);

    constructor(handlerName: string, identifier: string, backpackSlotIndex: number);

    constructor(handlerName: string, identifier: string, backpackSlotIndex: number, openFromInventory: boolean);
    addToBuffer(buffer: FriendlyByteBuf): void;
    canInteractWith(player: Player): boolean;
    static fromBuffer(buffer: FriendlyByteBuf): BackpackContext;
    static fromBuffer(buffer: FriendlyByteBuf, level: Level): BackpackContext;
    get backpackSlotIndex(): number;
    get parentBackpackContext(): BackpackContext;
    get type(): ContextType;
    getBackpackWrapper(player: Player): IBackpackWrapper;
    getParentBackpackWrapper(player: Player): Optional<IStorageWrapper>;
    getSubBackpackContext(subBackpackSlotIndex: number, saveAfterOpen: boolean): BackpackContext;
    onUpgradeChanged(player: Player): void;
    shouldLockBackpackSlot(player: Player): boolean;
    wasOpenFromInventory(): boolean;
  }


  interface AnotherPlayer extends Item {}
  class AnotherPlayer extends Item {
    constructor(handlerName: string, identifier: string, backpackSlotIndex: number, otherPlayer: Player);
    addToBuffer(buffer: FriendlyByteBuf): void;
    canInteractWith(player: Player): boolean;
    static fromBuffer(buffer: FriendlyByteBuf, level: Level): BackpackContext;
    static fromBuffer(buffer: FriendlyByteBuf): BackpackContext;
    get type(): ContextType;
    getBackpackWrapper(player: Player): IBackpackWrapper;
    getDisplayName(player: Player): Component;
    getOwnerPlayer(player: Player): Optional<Entity>;
    getSubBackpackContext(subBackpackSlotIndex: number, saveAfterOpen: boolean): BackpackContext;
    shouldLockBackpackSlot(player: Player): boolean;
  }


  interface AnotherPlayerSubBackpack extends AnotherPlayer {}
  class AnotherPlayerSubBackpack extends AnotherPlayer {
    constructor(otherPlayer: Player, handlerName: string, identifier: string, backpackSlotIndex: number, subBackpackSlotIndex: number, saveAfterOpen: boolean);
    addToBuffer(buffer: FriendlyByteBuf): void;
    static fromBuffer(buffer: FriendlyByteBuf, level: Level): BackpackContext;
    static fromBuffer(buffer: FriendlyByteBuf): BackpackContext;
    get parentBackpackContext(): BackpackContext;
    get type(): ContextType;
    getBackpackWrapper(player: Player): IBackpackWrapper;
    getDisplayName(player: Player): Component;
    getParentBackpackWrapper(player: Player): Optional<IStorageWrapper>;
    onUpgradeChanged(player: Player): void;
    saveBackpackStack(): void;
    shouldSaveAfterOpen(): boolean;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.compat.accessories' {
  import { ICompat } from 'net.p3pp3rf1y.sophisticatedcore.compat';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { Function } from 'java.util.function';
  import { AccessoriesContainer } from 'io.wispforest.accessories.api';
  import { AccessoryRenderer } from 'io.wispforest.accessories.api.client';
  import { ItemStack } from 'net.minecraft.world.item';
  import { SlotReference } from 'io.wispforest.accessories.api.slot';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { EntityModel } from 'net.minecraft.client.model';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';

  interface AccessoriesCompat extends ICompat {}
  class AccessoriesCompat extends ICompat {
    static getFromAccessoriesStorage<T>(livingEntity: LivingEntity, identifier: string, getFromStorage: Function<AccessoriesContainer, T>, defaultValue: T): T;
    setup(): void;
  }


  class AccessoriesCompatClient {
    static registerRenderers(): void;
  }


  interface BackpackAccessoryRenderer extends AccessoryRenderer {}
  class BackpackAccessoryRenderer extends AccessoryRenderer {
    render<M extends LivingEntity>(stack: ItemStack, reference: SlotReference, poseStack: PoseStack, model: EntityModel<M>, multiBufferSource: MultiBufferSource, light: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.compat.chipped' {
  import { ICompat } from 'net.p3pp3rf1y.sophisticatedcore.compat';
  import { DeferredHolder, RegisterEvent } from 'net.neoforged.neoforge.registries';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { UpgradeContainerType } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { BlockTransformationUpgradeWrapper, BlockTransformationUpgradeContainer } from 'net.p3pp3rf1y.sophisticatedcore.compat.chipped';

  interface ChippedCompat extends ICompat {}
  class ChippedCompat extends ICompat {
    static readonly BOTANIST_WORKBENCH_UPGRADE: DeferredHolder;
    static readonly GLASSBLOWER_UPGRADE: DeferredHolder;
    static readonly CARPENTERS_TABLE_UPGRADE: DeferredHolder;
    static readonly LOOM_TABLE_UPGRADE: DeferredHolder;
    static readonly MASON_TABLE_UPGRADE: DeferredHolder;
    static readonly ALCHEMY_BENCH_UPGRADE: DeferredHolder;
    static readonly TINKERING_TABLE_UPGRADE: DeferredHolder;
    init(modBus: IEventBus): void;
    registerContainers(event: RegisterEvent): void;
    setup(): void;
  }


  class ChippedCompatClient {
    static registerUpgradeTab(itemId: ResourceLocation, containerType: UpgradeContainerType<BlockTransformationUpgradeWrapper, BlockTransformationUpgradeContainer>): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.compat' {
  class CompatModIds {
    static readonly BOTANIA: string;
    static readonly CURIOS: string;
    static readonly QUARK: string;
    static readonly CHIPPED: string;
    static readonly SAWMILL: string;
    static readonly ACCESSORIES: string;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.compat.curios' {
  import { ICurioRenderer } from 'top.theillusivec4.curios.api.client';
  import { ItemStack } from 'net.minecraft.world.item';
  import { SlotContext } from 'top.theillusivec4.curios.api';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { RenderLayerParent } from 'net.minecraft.client.renderer.entity';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { EntityModel } from 'net.minecraft.client.model';
  import { ICompat } from 'net.p3pp3rf1y.sophisticatedcore.compat';
  import { Function } from 'java.util.function';
  import { ICurioStacksHandler } from 'top.theillusivec4.curios.api.type.inventory';

  interface BackpackCurioRenderer extends ICurioRenderer {}
  class BackpackCurioRenderer extends ICurioRenderer {
    render<T extends LivingEntity, M extends EntityModel<T>>(stack: ItemStack, slotContext: SlotContext, matrixStack: PoseStack, renderLayerParent: RenderLayerParent<T, M>, renderTypeBuffer: MultiBufferSource, light: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface CuriosCompat extends ICompat {}
  class CuriosCompat extends ICompat {
    static getFromCuriosSlotStackHandler<T>(livingEntity: LivingEntity, identifier: string, getFromHandler: Function<ICurioStacksHandler, T>, defaultValue: T): T;
    setup(): void;
  }


  class CuriosCompatClient {
    static registerRenderers(): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.compat.recipeviewers.common' {
  import { List } from 'java.util';
  import { RecipeHolder, CraftingRecipe, ShapedRecipe } from 'net.minecraft.world.item.crafting';
  import { BiFunction } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';

  class DyeRecipesMaker {
    static get recipes(): RecipeHolder<CraftingRecipe>[];
    static getRecipes<R>(transformRecipe: BiFunction<ResourceLocation, ShapedRecipe, R>): R[];
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.compat.recipeviewers.common.subtypes' {
  import { PropertyBasedSubtypeInterpreter } from 'net.p3pp3rf1y.sophisticatedcore.compat.recipeviewers.common.subtypes';

  interface BackpackSubtypeInterpreter extends PropertyBasedSubtypeInterpreter {}
  class BackpackSubtypeInterpreter extends PropertyBasedSubtypeInterpreter {
    constructor();
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.compat.recipeviewers.emi' {
  import { EmiPlugin, EmiRegistry } from 'dev.emi.emi.api';
  import { Consumer } from 'java.util.function';
  import { WorkstationRegistration } from 'net.p3pp3rf1y.sophisticatedbackpacks.compat.recipeviewers.emi.BackpackEmiPlugin';

  interface BackpackEmiPlugin extends EmiPlugin {}
  class BackpackEmiPlugin extends EmiPlugin {
    static addAdditionalWorkstations(additionalWorkstations: Consumer<WorkstationRegistration>): void;
    register(registry: EmiRegistry): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.compat.recipeviewers.emi.BackpackEmiPlugin' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Block } from 'net.minecraft.world.level.block';
  import { Item } from 'net.minecraft.world.item';
  import { EmiRecipeCategory } from 'dev.emi.emi.api.recipe';
  import { EmiStack } from 'dev.emi.emi.api.stack';

  class WorkstationRegistration {
    addWorkstation(id: ResourceLocation, icon: Block, workstation: Item): void;
    addWorkstation(category: EmiRecipeCategory, workstation: Item): void;
    addWorkstation(category: EmiRecipeCategory, workstation: EmiStack): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.compat.recipeviewers.jei' {
  import { IModPlugin } from 'mezz.jei.api';
  import { Consumer } from 'java.util.function';
  import { IRecipeCatalystRegistration, ISubtypeRegistration, IGuiHandlerRegistration, IRecipeRegistration, IRecipeTransferRegistration } from 'mezz.jei.api.registration';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List } from 'java.util';
  import { Rect2i } from 'net.minecraft.client.renderer';
  import { BackpackScreen, BackpackSettingsScreen } from 'net.p3pp3rf1y.sophisticatedbackpacks.client.gui';
  import { Class } from 'java.lang';
  import { BackpackContainer } from 'net.p3pp3rf1y.sophisticatedbackpacks.common.gui';
  import { RecipeType } from 'mezz.jei.api.recipe';
  import { RecipeHolder, CraftingRecipe, SmithingRecipe } from 'net.minecraft.world.item.crafting';

  interface BackpackJeiPlugin extends IModPlugin {}
  class BackpackJeiPlugin extends IModPlugin {
    static addAdditionalCatalystRegistrar(additionalCatalystRegistrar: Consumer<IRecipeCatalystRegistration>): void;
    get containerClass(): Class<BackpackContainer>;
    get containerClass(): Class<BackpackContainer>;
    get pluginUid(): ResourceLocation;
    get recipeType(): RecipeType<RecipeHolder<CraftingRecipe>>;
    get recipeType(): RecipeType<RecipeHolder<SmithingRecipe>>;
    getGuiExtraAreas(gui: BackpackScreen): Rect2i[];
    getGuiExtraAreas(gui: BackpackSettingsScreen): Rect2i[];
    registerGuiHandlers(registration: IGuiHandlerRegistration): void;
    registerItemSubtypes(registration: ISubtypeRegistration): void;
    registerRecipeCatalysts(registration: IRecipeCatalystRegistration): void;
    registerRecipeTransferHandlers(registration: IRecipeTransferRegistration): void;
    registerRecipes(registration: IRecipeRegistration): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.compat.recipeviewers.rei' {
  import { REIClientPlugin } from 'me.shedaniel.rei.api.client.plugins';
  import { Consumer } from 'java.util.function';
  import { WorkstationRegistration } from 'net.p3pp3rf1y.sophisticatedbackpacks.compat.recipeviewers.rei.BackpackReiClientPlugin';
  import { ExclusionZones, ScreenRegistry } from 'me.shedaniel.rei.api.client.registry.screen';
  import { TransferHandlerRegistry } from 'me.shedaniel.rei.api.client.registry.transfer';
  import { CategoryRegistry } from 'me.shedaniel.rei.api.client.registry.category';
  import { DisplayRegistry } from 'me.shedaniel.rei.api.client.registry.display';
  import { REIServerPlugin } from 'me.shedaniel.rei.api.common.plugins';
  import { ItemComparatorRegistry } from 'me.shedaniel.rei.api.common.entry.comparison';

  interface BackpackReiClientPlugin extends REIClientPlugin {}
  class BackpackReiClientPlugin extends REIClientPlugin {
    static addAdditionalWorkstations(additionalWorkstations: Consumer<WorkstationRegistration>): void;
    registerCategories(registry: CategoryRegistry): void;
    registerDisplays(registry: DisplayRegistry): void;
    registerExclusionZones(zones: ExclusionZones): void;
    registerScreens(registry: ScreenRegistry): void;
    registerTransferHandlers(registry: TransferHandlerRegistry): void;
  }


  interface BackpackReiCommonPlugin extends REIServerPlugin {}
  class BackpackReiCommonPlugin extends REIServerPlugin {
    get priority(): number;
    registerItemComparators(registry: ItemComparatorRegistry): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.compat.recipeviewers.rei.BackpackReiClientPlugin' {
  import { CategoryIdentifier } from 'me.shedaniel.rei.api.common.category';
  import { Display } from 'me.shedaniel.rei.api.common.display';
  import { Item } from 'net.minecraft.world.item';

  class WorkstationRegistration {
    addWorkstations(id: CategoryIdentifier<Display>, ...workstations: Item[]): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.compat.sawmill' {
  import { ICompat } from 'net.p3pp3rf1y.sophisticatedcore.compat';
  import { DeferredHolder, RegisterEvent } from 'net.neoforged.neoforge.registries';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { UpgradeContainerType } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { Wrapper } from 'SawmillUpgradeItem';
  import { SawmillUpgradeContainer } from 'net.p3pp3rf1y.sophisticatedcore.compat.sawmill';

  interface SawmillCompat extends ICompat {}
  class SawmillCompat extends ICompat {
    static readonly SAWMILL_UPGRADE: DeferredHolder;
    init(modBus: IEventBus): void;
    registerContainers(event: RegisterEvent): void;
    setup(): void;
  }


  class SawmillCompatClient {
    static registerUpgradeTab(containerType: UpgradeContainerType<Wrapper, SawmillUpgradeContainer>): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks' {
  import { Server, Common } from 'net.p3pp3rf1y.sophisticatedbackpacks.Config';
  import { ModConfigSpec } from 'net.neoforged.neoforge.common';
  import { Logger } from 'org.apache.logging.log4j';
  import { CommonEventHandler } from 'net.p3pp3rf1y.sophisticatedbackpacks.common';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { Dist } from 'net.neoforged.api.distmarker';
  import { ModContainer } from 'net.neoforged.fml';
  import { ResourceLocation } from 'net.minecraft.resources';

  class Config {
    static readonly SERVER: Server;
    static readonly SERVER_SPEC: ModConfigSpec;
    static readonly COMMON: Common;
    static readonly COMMON_SPEC: ModConfigSpec;
  }


  class SophisticatedBackpacks {
    static readonly MOD_ID: string;
    static readonly LOGGER: Logger;
    readonly commonEventHandler: CommonEventHandler;
    constructor(modBus: IEventBus, dist: Dist, container: ModContainer);
    static getRL(regName: string): ResourceLocation;
    static getRegistryName(regName: string): string;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.Config' {
  import { DisallowedItems, NoInteractionBlocks, NoConnectionBlocks, BackpackConfig, InceptionUpgradeConfig, EntityBackpackAdditionsConfig, NerfsConfig, MaxUgradesPerStorageConfig } from 'net.p3pp3rf1y.sophisticatedbackpacks.Config.Server';
  import { FilteredUpgradeConfig } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { MagnetUpgradeConfig } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.magnet';
  import { VoidUpgradeConfig } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.voiding';
  import { CookingUpgradeConfig, AutoCookingUpgradeConfig } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.cooking';
  import { BooleanValue } from 'ModConfigSpec';
  import { TankUpgradeConfig } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.tank';
  import { BatteryUpgradeConfig } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.battery';
  import { StackUpgradeConfig } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.stack';
  import { PumpUpgradeConfig } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.pump';
  import { XpPumpUpgradeConfig } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.xppump';
  import { JukeboxUpgradeConfig } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.jukebox';
  import { AlchemyUpgradeConfig } from 'net.p3pp3rf1y.sophisticatedcore.upgrades.alchemy';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { Reloading, Loading } from 'ModConfigEvent';

  class Server {
    readonly disallowedItems: DisallowedItems;
    readonly noInteractionBlocks: NoInteractionBlocks;
    readonly noConnectionBlocks: NoConnectionBlocks;
    readonly leatherBackpack: BackpackConfig;
    readonly copperBackpack: BackpackConfig;
    readonly ironBackpack: BackpackConfig;
    readonly goldBackpack: BackpackConfig;
    readonly diamondBackpack: BackpackConfig;
    readonly netheriteBackpack: BackpackConfig;
    readonly compactingUpgrade: FilteredUpgradeConfig;
    readonly advancedCompactingUpgrade: FilteredUpgradeConfig;
    readonly depositUpgrade: FilteredUpgradeConfig;
    readonly advancedDepositUpgrade: FilteredUpgradeConfig;
    readonly feedingUpgrade: FilteredUpgradeConfig;
    readonly advancedFeedingUpgrade: FilteredUpgradeConfig;
    readonly filterUpgrade: FilteredUpgradeConfig;
    readonly advancedFilterUpgrade: FilteredUpgradeConfig;
    readonly magnetUpgrade: MagnetUpgradeConfig;
    readonly advancedMagnetUpgrade: MagnetUpgradeConfig;
    readonly pickupUpgrade: FilteredUpgradeConfig;
    readonly advancedPickupUpgrade: FilteredUpgradeConfig;
    readonly refillUpgrade: FilteredUpgradeConfig;
    readonly advancedRefillUpgrade: FilteredUpgradeConfig;
    readonly restockUpgrade: FilteredUpgradeConfig;
    readonly advancedRestockUpgrade: FilteredUpgradeConfig;
    readonly voidUpgrade: VoidUpgradeConfig;
    readonly advancedVoidUpgrade: VoidUpgradeConfig;
    readonly smeltingUpgrade: CookingUpgradeConfig;
    readonly smokingUpgrade: CookingUpgradeConfig;
    readonly blastingUpgrade: CookingUpgradeConfig;
    readonly autoSmeltingUpgrade: AutoCookingUpgradeConfig;
    readonly autoSmokingUpgrade: AutoCookingUpgradeConfig;
    readonly autoBlastingUpgrade: AutoCookingUpgradeConfig;
    readonly inceptionUpgrade: InceptionUpgradeConfig;
    readonly entityBackpackAdditions: EntityBackpackAdditionsConfig;
    readonly itemFluidHandlerEnabled: BooleanValue;
    readonly allowOpeningOtherPlayerBackpacks: BooleanValue;
    readonly itemDisplayDisabled: BooleanValue;
    readonly tickDedupeLogicDisabled: BooleanValue;
    readonly canBePlacedInContainerItems: BooleanValue;
    readonly toolSwapperUpgrade: FilteredUpgradeConfig;
    readonly tankUpgrade: TankUpgradeConfig;
    readonly batteryUpgrade: BatteryUpgradeConfig;
    readonly stackUpgrade: StackUpgradeConfig;
    readonly pumpUpgrade: PumpUpgradeConfig;
    readonly xpPumpUpgrade: XpPumpUpgradeConfig;
    readonly advancedJukeboxUpgrade: JukeboxUpgradeConfig;
    readonly alchemyUpgrade: AlchemyUpgradeConfig;
    readonly advancedAlchemyUpgrade: AlchemyUpgradeConfig;
    readonly nerfsConfig: NerfsConfig;
    readonly maxUpgradesPerStorage: MaxUgradesPerStorageConfig;
    initListeners(modBus: IEventBus): void;
    onConfigLoad(event: Loading): void;
    onConfigReload(event: Reloading): void;
  }


  class Common {
    readonly chestLootEnabled: BooleanValue;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.Config.Server' {
  import { Item } from 'net.minecraft.world.item';
  import { IUpgradeCountLimitConfig, UpgradeGroup } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { BooleanValue, IntValue, DoubleValue, ConfigValue, Builder } from 'ModConfigSpec';
  import { Holder } from 'net.minecraft.core';
  import { MobEffect } from 'net.minecraft.world.effect';
  import { Block } from 'net.minecraft.world.level.block';
  import { Optional } from 'java.util';
  import { EntityType } from 'net.minecraft.world.entity';

  class DisallowedItems {
    isItemDisallowed(item: Item): boolean;
  }


  interface MaxUgradesPerStorageConfig extends IUpgradeCountLimitConfig {}
  class MaxUgradesPerStorageConfig extends IUpgradeCountLimitConfig {
    clearCache(): void;
    getMaxUpgradesInGroupPerStorage(storageType: string, upgradeGroup: UpgradeGroup): number;
    getMaxUpgradesPerStorage(storageType: string, upgradeRegistryName: ResourceLocation): number;
  }


  class NerfsConfig {
    readonly tooManyBackpacksSlowness: BooleanValue;
    readonly maxNumberOfBackpacks: IntValue;
    readonly slownessLevelsPerAdditionalBackpack: DoubleValue;
    readonly onlyWornBackpackTriggersUpgrades: BooleanValue;
    readonly nerfEffect: ConfigValue;
    constructor(builder: Builder);
    get effect(): Holder<MobEffect>;
  }


  class NoInteractionBlocks {
    isBlockInteractionDisallowed(block: Block): boolean;
  }


  class NoConnectionBlocks {
    isBlockConnectionDisallowed(block: Block): boolean;
  }


  class BackpackConfig {
    readonly inventorySlotCount: IntValue;
    readonly upgradeSlotCount: IntValue;
    constructor(builder: Builder, backpackPrefix: string, inventorySlotCountDefault: number, upgradeSlotCountDefault: number);
  }


  class InceptionUpgradeConfig {
    readonly upgradesUseInventoriesOfBackpacksInBackpack: BooleanValue;
    readonly upgradesInContainedBackpacksAreFunctional: BooleanValue;
    constructor(builder: Builder);
  }


  class EntityBackpackAdditionsConfig {
    readonly chance: DoubleValue;
    readonly addLoot: BooleanValue;
    readonly buffWithPotionEffects: BooleanValue;
    readonly buffHealth: BooleanValue;
    readonly equipWithArmor: BooleanValue;
    readonly playJukebox: BooleanValue;
    readonly dropToFakePlayers: BooleanValue;
    readonly backpackDropChance: DoubleValue;
    readonly lootingChanceIncreasePerLevel: DoubleValue;
    readonly leatherWeight: IntValue;
    readonly copperWeight: IntValue;
    readonly ironWeight: IntValue;
    readonly goldWeight: IntValue;
    readonly diamondWeight: IntValue;
    readonly netheriteWeight: IntValue;
    readonly minBackpackTierMidDifficulty: IntValue;
    readonly minBackpackTierHighDifficulty: IntValue;
    readonly localDifficultyEffectsBackpackSpawns: BooleanValue;
    readonly entityLootTableList: ConfigValue;
    readonly discBlockList: ConfigValue;
    constructor(builder: Builder);
    canWearBackpack(entityType: EntityType<any>): boolean;
    getLootTableName(entityType: EntityType<any>): Optional<ResourceLocation>;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.crafting' {
  import { StorageDyeRecipeBase, IWrapperRecipe } from 'net.p3pp3rf1y.sophisticatedcore.crafting';
  import { CraftingBookCategory, RecipeSerializer, ShapedRecipe, CraftingInput, SmithingTransformRecipe, SmithingRecipeInput, Ingredient } from 'net.minecraft.world.item.crafting';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { Provider } from 'HolderLookup';
  import { SmithingTransformRecipeBuilder, RecipeOutput } from 'net.minecraft.data.recipes';
  import { Function } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface BackpackDyeRecipe extends StorageDyeRecipeBase {}
  class BackpackDyeRecipe extends StorageDyeRecipeBase {
    constructor(category: CraftingBookCategory);
    get serializer(): RecipeSerializer<any>;
  }


  interface BackpackUpgradeRecipe extends IWrapperRecipe<ShapedRecipe>, ShapedRecipe {}
  class BackpackUpgradeRecipe extends IWrapperRecipe<ShapedRecipe> {
    constructor(compose: ShapedRecipe);
    assemble(inv: CraftingInput, registries: Provider): ItemStack;
    get compose(): ShapedRecipe;
    get serializer(): RecipeSerializer<any>;
    isSpecial(): boolean;
  }


  interface BasicBackpackRecipe extends IWrapperRecipe<ShapedRecipe>, ShapedRecipe {}
  class BasicBackpackRecipe extends IWrapperRecipe<ShapedRecipe> {
    constructor(compose: ShapedRecipe);
    assemble(inv: CraftingInput, registries: Provider): ItemStack;
    get compose(): ShapedRecipe;
    get serializer(): RecipeSerializer<any>;
  }


  interface SmithingBackpackUpgradeRecipe extends IWrapperRecipe<SmithingTransformRecipe>, SmithingTransformRecipe {}
  class SmithingBackpackUpgradeRecipe extends IWrapperRecipe<SmithingTransformRecipe> {
    constructor(compose: SmithingTransformRecipe);
    assemble(inv: SmithingRecipeInput, registryAccess: Provider): ItemStack;
    get compose(): SmithingTransformRecipe;
    get serializer(): RecipeSerializer<any>;
    isSpecial(): boolean;
  }


  interface SmithingBackpackUpgradeRecipeBuilder extends SmithingTransformRecipeBuilder {}
  class SmithingBackpackUpgradeRecipeBuilder extends SmithingTransformRecipeBuilder {
    constructor(factory: Function<SmithingTransformRecipe, SmithingTransformRecipe>, template: Ingredient, base: Ingredient, addition: Ingredient, result: Item);
    save(recipeOutput: RecipeOutput, id: ResourceLocation): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.crafting.BackpackUpgradeRecipe' {
  import { RecipeWrapperSerializer } from 'net.p3pp3rf1y.sophisticatedcore.crafting';
  import { ShapedRecipe } from 'net.minecraft.world.item.crafting';
  import { BackpackUpgradeRecipe } from 'net.p3pp3rf1y.sophisticatedbackpacks.crafting';

  interface Serializer extends RecipeWrapperSerializer<ShapedRecipe, BackpackUpgradeRecipe> {}
  class Serializer extends RecipeWrapperSerializer<ShapedRecipe, BackpackUpgradeRecipe> {
    constructor();
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.crafting.BasicBackpackRecipe' {
  import { RecipeWrapperSerializer } from 'net.p3pp3rf1y.sophisticatedcore.crafting';
  import { ShapedRecipe } from 'net.minecraft.world.item.crafting';
  import { BasicBackpackRecipe } from 'net.p3pp3rf1y.sophisticatedbackpacks.crafting';

  interface Serializer extends RecipeWrapperSerializer<ShapedRecipe, BasicBackpackRecipe> {}
  class Serializer extends RecipeWrapperSerializer<ShapedRecipe, BasicBackpackRecipe> {
    constructor();
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.crafting.SmithingBackpackUpgradeRecipe' {
  import { RecipeWrapperSerializer } from 'net.p3pp3rf1y.sophisticatedcore.crafting';
  import { SmithingTransformRecipe } from 'net.minecraft.world.item.crafting';
  import { SmithingBackpackUpgradeRecipe } from 'net.p3pp3rf1y.sophisticatedbackpacks.crafting';

  interface Serializer extends RecipeWrapperSerializer<SmithingTransformRecipe, SmithingBackpackUpgradeRecipe> {}
  class Serializer extends RecipeWrapperSerializer<SmithingTransformRecipe, SmithingBackpackUpgradeRecipe> {
    constructor();
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.data' {
  import { LootItemFunction, LootItemFunctionType } from 'net.minecraft.world.level.storage.loot.functions';
  import { MapCodec } from 'com.mojang.serialization';
  import { ItemStack } from 'net.minecraft.world.item';
  import { LootContext, LootTable } from 'net.minecraft.world.level.storage.loot';
  import { Builder } from 'net.p3pp3rf1y.sophisticatedbackpacks.data.CopyBackpackDataFunction';
  import { GatherDataEvent } from 'net.neoforged.neoforge.data.event';
  import { ItemTagsProvider } from 'net.minecraft.data.tags';
  import { PackOutput } from 'net.minecraft.data';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';
  import { TagLookup } from 'TagsProvider';
  import { Block } from 'net.minecraft.world.level.block';
  import { ExistingFileHelper, GlobalLootModifierProvider } from 'net.neoforged.neoforge.common.data';
  import { LootTableSubProvider, LootTableProvider, BlockLootSubProvider } from 'net.minecraft.data.loot';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Set } from 'java.util';
  import { BiConsumer } from 'java.util.function';
  import { Builder as loottable_Builder } from 'LootTable';
  import { LootItemCondition, LootItemConditionType } from 'net.minecraft.world.level.storage.loot.predicates';
  import { Builder as net_p3pp3rf1y_sophisticatedbackpacks_data_sblootenabledcondition_Builder } from 'net.p3pp3rf1y.sophisticatedbackpacks.data.SBLootEnabledCondition';
  import { RecipeProvider } from 'net.minecraft.data.recipes';

  interface CopyBackpackDataFunction extends LootItemFunction {}
  class CopyBackpackDataFunction extends LootItemFunction {
    static readonly CODEC: MapCodec;
    apply(stack: ItemStack, lootContext: LootContext): ItemStack;
    static builder(): Builder;
    get type(): LootItemFunctionType<CopyBackpackDataFunction>;
  }


  class DataGenerators {
    static gatherData(evt: GatherDataEvent): void;
  }


  interface ItemTagProvider extends ItemTagsProvider {}
  class ItemTagProvider extends ItemTagsProvider {
    constructor(packOutput: PackOutput, lookupProvider: CompletableFuture<Provider>, blockTagProvider: CompletableFuture<TagLookup<Block>>, existingFileHelper: ExistingFileHelper);
  }


  interface SBInjectLootSubProvider extends LootTableSubProvider {}
  class SBInjectLootSubProvider extends LootTableSubProvider {
    static readonly ABANDONED_MINESHAFT: ResourceKey;
    static readonly BASTION_TREASURE: ResourceKey;
    static readonly DESERT_PYRAMID: ResourceKey;
    static readonly END_CITY_TREASURE: ResourceKey;
    static readonly NETHER_BRIDGE: ResourceKey;
    static readonly SHIPWRECK_TREASURE: ResourceKey;
    static readonly SIMPLE_DUNGEON: ResourceKey;
    static readonly WOODLAND_MANSION: ResourceKey;
    static readonly SPAWN_BONUS_CHEST: ResourceKey;
    static readonly ALL_TABLES: Set;
    constructor(registries: Provider);
    generate(tables: BiConsumer<ResourceKey<LootTable>, loottable_Builder>): void;
  }


  interface SBLootEnabledCondition extends LootItemCondition {}
  class SBLootEnabledCondition extends LootItemCondition {
    static readonly CODEC: MapCodec;
    static builder(): net_p3pp3rf1y_sophisticatedbackpacks_data_sblootenabledcondition_Builder;
    get type(): LootItemConditionType;
    test(lootContext: LootContext): boolean;
  }


  interface SBLootModifierProvider extends GlobalLootModifierProvider {}
  class SBLootModifierProvider extends GlobalLootModifierProvider {
  }


  interface SBLootTableProvider extends LootTableProvider {}
  class SBLootTableProvider extends LootTableProvider {
  }


  interface SBPBlockLootSubProvider extends BlockLootSubProvider {}
  class SBPBlockLootSubProvider extends BlockLootSubProvider {
    generate(): void;
  }


  interface SBPRecipeProvider extends RecipeProvider {}
  class SBPRecipeProvider extends RecipeProvider {
    constructor(packOutput: PackOutput, registries: CompletableFuture<Provider>);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.data.CopyBackpackDataFunction' {
  import { Builder as lootitemfunction_Builder } from 'LootItemFunction';
  import { LootItemFunction } from 'net.minecraft.world.level.storage.loot.functions';

  interface Builder extends lootitemfunction_Builder {}
  class Builder extends lootitemfunction_Builder {
    build(): LootItemFunction;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.data.SBLootEnabledCondition' {
  import { Builder as lootitemcondition_Builder } from 'LootItemCondition';
  import { LootItemCondition } from 'net.minecraft.world.level.storage.loot.predicates';

  interface Builder extends lootitemcondition_Builder {}
  class Builder extends lootitemcondition_Builder {
    build(): LootItemCondition;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.data.SBLootModifierProvider' {
  import { LootModifier, IGlobalLootModifier } from 'net.neoforged.neoforge.common.loot';
  import { MapCodec } from 'com.mojang.serialization';

  interface InjectLootModifier extends LootModifier {}
  class InjectLootModifier extends LootModifier {
    static readonly CODEC: MapCodec;
    codec(): MapCodec<IGlobalLootModifier>;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.init' {
  import { Supplier } from 'java.util.function';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { DeferredRegister, DeferredHolder, RegisterEvent } from 'net.neoforged.neoforge.registries';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { TagKey } from 'net.minecraft.tags';
  import { UpgradeContainerType } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { RegisterPayloadHandlersEvent } from 'net.neoforged.neoforge.network.event';

  class ModBlocks {
    static readonly BACKPACK: Supplier;
    static readonly COPPER_BACKPACK: Supplier;
    static readonly IRON_BACKPACK: Supplier;
    static readonly GOLD_BACKPACK: Supplier;
    static readonly DIAMOND_BACKPACK: Supplier;
    static readonly NETHERITE_BACKPACK: Supplier;
    static readonly BACKPACK_TILE_TYPE: Supplier;
    static registerHandlers(modBus: IEventBus): void;
  }


  class ModCompat {
    static register(): void;
  }


  class ModDataComponents {
    static readonly LOOT_TABLE: Supplier;
    static readonly LOOT_FACTOR: Supplier;
    static readonly COLUMNS_TAKEN: Supplier;
    static readonly ITEM_NAME: Supplier;
    static readonly FILTER_BY_INVENTORY: Supplier;
    static readonly INVENTORY_ORDER: Supplier;
    static readonly TARGET_SLOTS: Supplier;
    static readonly SHOULD_SWAP_WEAPON: Supplier;
    static readonly TOOL_SWAP_MODE: Supplier;
    static readonly TEMPLATE_NAME: Supplier;
    static register(modBus: IEventBus): void;
  }


  class ModItems {
    static readonly ITEMS: DeferredRegister;
    static readonly CREATIVE_MODE_TABS: DeferredRegister;
    static readonly LOOT_FUNCTION_TYPES: DeferredRegister;
    static readonly LOOT_CONDITION_TYPES: DeferredRegister;
    static readonly LOOT_MODIFIERS: DeferredRegister;
    static readonly BACKPACK: DeferredHolder;
    static readonly COPPER_BACKPACK: DeferredHolder;
    static readonly IRON_BACKPACK: DeferredHolder;
    static readonly GOLD_BACKPACK: DeferredHolder;
    static readonly DIAMOND_BACKPACK: DeferredHolder;
    static readonly NETHERITE_BACKPACK: DeferredHolder;
    static readonly BACKPACK_UPGRADE_TAG_NAME: ResourceLocation;
    static readonly BACKPACK_UPGRADE_TAG: TagKey;
    static readonly PICKUP_UPGRADE: DeferredHolder;
    static readonly ADVANCED_PICKUP_UPGRADE: DeferredHolder;
    static readonly FILTER_UPGRADE: DeferredHolder;
    static readonly ADVANCED_FILTER_UPGRADE: DeferredHolder;
    static readonly MAGNET_UPGRADE: DeferredHolder;
    static readonly ADVANCED_MAGNET_UPGRADE: DeferredHolder;
    static readonly FEEDING_UPGRADE: DeferredHolder;
    static readonly ADVANCED_FEEDING_UPGRADE: DeferredHolder;
    static readonly COMPACTING_UPGRADE: DeferredHolder;
    static readonly ADVANCED_COMPACTING_UPGRADE: DeferredHolder;
    static readonly VOID_UPGRADE: DeferredHolder;
    static readonly ADVANCED_VOID_UPGRADE: DeferredHolder;
    static readonly RESTOCK_UPGRADE: DeferredHolder;
    static readonly ADVANCED_RESTOCK_UPGRADE: DeferredHolder;
    static readonly DEPOSIT_UPGRADE: DeferredHolder;
    static readonly ADVANCED_DEPOSIT_UPGRADE: DeferredHolder;
    static readonly REFILL_UPGRADE: DeferredHolder;
    static readonly ADVANCED_REFILL_UPGRADE: DeferredHolder;
    static readonly INCEPTION_UPGRADE: DeferredHolder;
    static readonly EVERLASTING_UPGRADE: DeferredHolder;
    static readonly SMELTING_UPGRADE: DeferredHolder;
    static readonly AUTO_SMELTING_UPGRADE: DeferredHolder;
    static readonly SMOKING_UPGRADE: DeferredHolder;
    static readonly AUTO_SMOKING_UPGRADE: DeferredHolder;
    static readonly BLASTING_UPGRADE: DeferredHolder;
    static readonly AUTO_BLASTING_UPGRADE: DeferredHolder;
    static readonly CRAFTING_UPGRADE: DeferredHolder;
    static readonly STONECUTTER_UPGRADE: DeferredHolder;
    static readonly STACK_UPGRADE_STARTER_TIER: DeferredHolder;
    static readonly STACK_UPGRADE_TIER_1: DeferredHolder;
    static readonly STACK_UPGRADE_TIER_2: DeferredHolder;
    static readonly STACK_UPGRADE_TIER_3: DeferredHolder;
    static readonly STACK_UPGRADE_TIER_4: DeferredHolder;
    static readonly STACK_DOWNGRADE_TIER_1: DeferredHolder;
    static readonly STACK_DOWNGRADE_TIER_2: DeferredHolder;
    static readonly STACK_DOWNGRADE_TIER_3: DeferredHolder;
    static readonly STACK_UPGRADE_OMEGA_TIER: DeferredHolder;
    static readonly JUKEBOX_UPGRADE: DeferredHolder;
    static readonly ADVANCED_JUKEBOX_UPGRADE: DeferredHolder;
    static readonly TOOL_SWAPPER_UPGRADE: DeferredHolder;
    static readonly ADVANCED_TOOL_SWAPPER_UPGRADE: DeferredHolder;
    static readonly TANK_UPGRADE: DeferredHolder;
    static readonly BATTERY_UPGRADE: DeferredHolder;
    static readonly PUMP_UPGRADE: DeferredHolder;
    static readonly ADVANCED_PUMP_UPGRADE: DeferredHolder;
    static readonly XP_PUMP_UPGRADE: DeferredHolder;
    static readonly ANVIL_UPGRADE: DeferredHolder;
    static readonly SMITHING_UPGRADE: DeferredHolder;
    static readonly INFINITY_UPGRADE: DeferredHolder;
    static readonly SURVIVAL_INFINITY_UPGRADE: DeferredHolder;
    static readonly ALCHEMY_UPGRADE: DeferredHolder;
    static readonly ADVANCED_ALCHEMY_UPGRADE: DeferredHolder;
    static readonly UPGRADE_BASE: Supplier;
    static readonly CREATIVE_TAB: Supplier;
    static readonly BACKPACK_CONTAINER_TYPE: Supplier;
    static readonly SETTINGS_CONTAINER_TYPE: Supplier;
    static readonly EVERLASTING_BACKPACK_ITEM_ENTITY: Supplier;
    static readonly BACKPACK_DYE_RECIPE_SERIALIZER: Supplier;
    static readonly BACKPACK_UPGRADE_RECIPE_SERIALIZER: Supplier;
    static readonly SMITHING_BACKPACK_UPGRADE_RECIPE_SERIALIZER: Supplier;
    static readonly BASIC_BACKPACK_RECIPE_SERIALIZER: Supplier;
    static readonly COPY_BACKPACK_DATA: Supplier;
    static readonly LOOT_ENABLED_CONDITION: Supplier;
    static readonly INJECT_LOOT: Supplier;
    static readonly PICKUP_BASIC_TYPE: UpgradeContainerType;
    static readonly PICKUP_ADVANCED_TYPE: UpgradeContainerType;
    static readonly MAGNET_BASIC_TYPE: UpgradeContainerType;
    static readonly MAGNET_ADVANCED_TYPE: UpgradeContainerType;
    static readonly FEEDING_TYPE: UpgradeContainerType;
    static readonly ADVANCED_FEEDING_TYPE: UpgradeContainerType;
    static readonly COMPACTING_TYPE: UpgradeContainerType;
    static readonly ADVANCED_COMPACTING_TYPE: UpgradeContainerType;
    static readonly VOID_TYPE: UpgradeContainerType;
    static readonly ADVANCED_VOID_TYPE: UpgradeContainerType;
    static readonly RESTOCK_TYPE: UpgradeContainerType;
    static readonly ADVANCED_RESTOCK_TYPE: UpgradeContainerType;
    static readonly DEPOSIT_TYPE: UpgradeContainerType;
    static readonly ADVANCED_DEPOSIT_TYPE: UpgradeContainerType;
    static readonly REFILL_TYPE: UpgradeContainerType;
    static readonly ADVANCED_REFILL_TYPE: UpgradeContainerType;
    static readonly SMELTING_TYPE: UpgradeContainerType;
    static readonly AUTO_SMELTING_TYPE: UpgradeContainerType;
    static readonly SMOKING_TYPE: UpgradeContainerType;
    static readonly AUTO_SMOKING_TYPE: UpgradeContainerType;
    static readonly BLASTING_TYPE: UpgradeContainerType;
    static readonly AUTO_BLASTING_TYPE: UpgradeContainerType;
    static readonly CRAFTING_TYPE: UpgradeContainerType;
    static readonly INCEPTION_TYPE: UpgradeContainerType;
    static readonly STONECUTTER_TYPE: UpgradeContainerType;
    static readonly JUKEBOX_TYPE: UpgradeContainerType;
    static readonly ADVANCED_JUKEBOX_TYPE: UpgradeContainerType;
    static readonly TOOL_SWAPPER_TYPE: UpgradeContainerType;
    static readonly TANK_TYPE: UpgradeContainerType;
    static readonly BATTERY_TYPE: UpgradeContainerType;
    static readonly PUMP_TYPE: UpgradeContainerType;
    static readonly ADVANCED_PUMP_TYPE: UpgradeContainerType;
    static readonly XP_PUMP_TYPE: UpgradeContainerType;
    static readonly ANVIL_TYPE: UpgradeContainerType;
    static readonly SMITHING_TYPE: UpgradeContainerType;
    static readonly ALCHEMY_TYPE: UpgradeContainerType;
    static readonly ADVANCED_ALCHEMY_TYPE: UpgradeContainerType;
    static registerCauldronInteractions(): void;
    static registerContainers(event: RegisterEvent): void;
    static registerDispenseBehavior(): void;
    static registerHandlers(modBus: IEventBus): void;
  }


  class ModItemsClient {
    static init(modBus: IEventBus): void;
  }


  class ModPayloads {
    static registerPayloads(event: RegisterPayloadHandlersEvent): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.registry' {
  import { JsonObject, JsonElement } from 'com.google.gson';
  import { Set } from 'java.util';
  import { Function } from 'java.util.function';
  import { SimpleJsonResourceReloadListener } from 'net.minecraft.server.packs.resources';

  class IRegistryDataLoader {
    clear(): void;
    get name(): string;
    parse(var1: JsonObject, var2: string): void;
  }


  class JsonHelper {
    static setFromJson<V>(element: JsonElement, getElement: Function<JsonElement, V>): Set<V>;
  }


  interface RegistryLoader extends SimpleJsonResourceReloadListener {}
  class RegistryLoader extends SimpleJsonResourceReloadListener {
    constructor();
    static registerParser(parser: IRegistryDataLoader): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.registry.tool' {
  import { Level } from 'net.minecraft.world.level';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockPos } from 'net.minecraft.core';
  import { JsonElement } from 'com.google.gson';
  import { Optional, List } from 'java.util';
  import { Predicate, Function } from 'java.util.function';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { TagKey } from 'net.minecraft.tags';
  import { Entity } from 'net.minecraft.world.entity';

  class BlockContext {
    constructor(level: Level, state: BlockState, block: Block, pos: BlockPos);
    get block(): Block;
    get level(): Level;
    get pos(): BlockPos;
    get state(): BlockState;
  }


  class IMatcherFactory<T = any> {
    appliesTo(var1: JsonElement): boolean;
    getPredicate(var1: JsonElement): Optional<Predicate<T>>;
  }


  class ItemMatcherFactory {
    constructor(typeName: string);
    appliesTo(jsonElement: JsonElement): boolean;
    getPredicate(jsonElement: JsonElement): Optional<Predicate<ItemStack>>;
  }


  interface ItemTagMatcher extends Predicate<ItemStack> {}
  class ItemTagMatcher extends Predicate<ItemStack> {
    constructor(itemTag: TagKey<Item>);
    test(stack: ItemStack): boolean;
  }


  class Matchers {
    appliesTo(jsonElement: JsonElement): boolean;
    static get blockMatcherFactories(): IMatcherFactory<BlockContext>[];
    static get entityMatcherFactories(): IMatcherFactory<Entity>[];
    static getItemMatcher(jsonElement: JsonElement): Optional<Predicate<ItemStack>>;
    getPredicate(jsonElement: JsonElement): Optional<Predicate<BlockContext>>;
  }


  interface ModMatcher<V = any, R extends Registry<V> = any, C = any> extends Predicate<C> {}
  class ModMatcher<V = any, R extends Registry<V> = any, C = any> extends Predicate<C> {
    constructor(registry: R, modId: string, getObjectFromContext: Function<C, V>);
    test(context: C): boolean;
  }


  class SwordRegistry {
    static isSword(stack: ItemStack): boolean;
  }


  class ToolRegistry {
    static addModWithMapping(modId: string): void;
    static isToolForBlock(stack: ItemStack, block: Block, level: Level, blockState: BlockState, pos: BlockPos): boolean;
    static isToolForEntity(stack: ItemStack, entity: Entity): boolean;
  }


  interface TypedMatcherFactory<T = any> extends IMatcherFactory<T> {}
  class TypedMatcherFactory<T = any> extends IMatcherFactory<T> {
    appliesTo(jsonElement: JsonElement): boolean;
    getPredicate(jsonElement: JsonElement): Optional<Predicate<T>>;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.registry.tool.SwordRegistry' {
  import { IRegistryDataLoader } from 'net.p3pp3rf1y.sophisticatedbackpacks.registry';
  import { JsonObject } from 'com.google.gson';

  interface SwordsLoader extends IRegistryDataLoader {}
  class SwordsLoader extends IRegistryDataLoader {
    clear(): void;
    get name(): string;
    parse(json: JsonObject, modId: string): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.registry.tool.ToolRegistry' {
  import { EntityType, Entity } from 'net.minecraft.world.entity';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockContext } from 'net.p3pp3rf1y.sophisticatedbackpacks.registry.tool';

  interface EntityToolsLoader extends ToolsLoaderBase<EntityType, Entity> {}
  class EntityToolsLoader extends ToolsLoaderBase<EntityType, Entity> {
    constructor();
  }


  interface BlockToolsLoader extends ToolsLoaderBase<Block, BlockContext> {}
  class BlockToolsLoader extends ToolsLoaderBase<Block, BlockContext> {
    constructor();
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.settings' {
  import { MainSettingsCategory, MainSettingsContainer, MainSettingsTab } from 'net.p3pp3rf1y.sophisticatedcore.settings.main';
  import { MainSetting, StorageSettingsTabControlBase } from 'net.p3pp3rf1y.sophisticatedcore.settings';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Consumer } from 'java.util.function';
  import { SettingsContainerMenu } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { SettingsScreen, Tab } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';

  interface BackpackMainSettingsCategory extends MainSettingsCategory<BackpackMainSettingsCategory> {}
  class BackpackMainSettingsCategory extends MainSettingsCategory<BackpackMainSettingsCategory> {
    static readonly SOPHISTICATED_BACKPACK_SETTINGS_PLAYER_TAG: string;
    static readonly ANOTHER_PLAYER_CAN_OPEN: MainSetting;
    static readonly NAME: string;
    constructor(categoryNbt: CompoundTag, saveNbt: Consumer<CompoundTag>);
  }


  interface BackpackMainSettingsContainer extends MainSettingsContainer {}
  class BackpackMainSettingsContainer extends MainSettingsContainer {
    constructor(settingsContainer: SettingsContainerMenu<any>, categoryName: string, category: MainSettingsCategory<any>);
    canAnotherPlayerOpen(): boolean;
    toggleAnotherPlayerCanOpen(): void;
  }


  interface BackpackMainSettingsTab extends MainSettingsTab<BackpackMainSettingsContainer> {}
  class BackpackMainSettingsTab extends MainSettingsTab<BackpackMainSettingsContainer> {
    constructor(container: BackpackMainSettingsContainer, position: Position, screen: SettingsScreen);
  }


  interface BackpackSettingsTabControl extends StorageSettingsTabControlBase {}
  class BackpackSettingsTabControl extends StorageSettingsTabControlBase {
    constructor(screen: SettingsScreen, position: Position);
  }


  interface BackToBackpackTab extends Tab {}
  class BackToBackpackTab extends Tab {
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.upgrades.anvil' {
  import { UpgradeContainerBase, UpgradeContainerType } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Runnable } from 'java.lang';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { IUpgradeWrapper, UpgradeItemBase, UpgradeType, UpgradeWrapperBase } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { Slot } from 'net.minecraft.world.inventory';
  import { List } from 'java.util';
  import { UpgradeConflictDefinition } from 'IUpgradeItem';
  import { UpgradeSettingsTab, StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { TextureBlitData, Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { ItemStack } from 'net.minecraft.world.item';
  import { StatefulComponentItemHandler } from 'net.p3pp3rf1y.sophisticatedcore.inventory';

  interface AnvilUpgradeContainer extends UpgradeContainerBase<AnvilUpgradeWrapper, AnvilUpgradeContainer> {}
  class AnvilUpgradeContainer extends UpgradeContainerBase<AnvilUpgradeWrapper, AnvilUpgradeContainer> {
    constructor(player: Player, upgradeContainerId: number, upgradeWrapper: AnvilUpgradeWrapper, type: UpgradeContainerType<AnvilUpgradeWrapper, AnvilUpgradeContainer>);
    allowsPickupAll(slot: Slot): boolean;
    get cost(): number;
    get itemName(): string;
    handlePacket(data: CompoundTag): void;
    isProcessingOnTakeLogic(): boolean;
    mergeIntoStorageFirst(slot: Slot): boolean;
    set itemName(name: string);
    setNameChangeListener(nameChangeListener: Runnable): void;
    setShiftClickIntoStorage(shiftClickIntoStorage: boolean): void;
    setUpgradeWrapper(updatedUpgradeWrapper: IUpgradeWrapper): void;
    shouldShiftClickIntoStorage(): boolean;
  }


  interface AnvilUpgradeItem extends UpgradeItemBase<AnvilUpgradeWrapper> {}
  class AnvilUpgradeItem extends UpgradeItemBase<AnvilUpgradeWrapper> {
    constructor();
    get type(): UpgradeType<AnvilUpgradeWrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
  }


  interface AnvilUpgradeTab extends UpgradeSettingsTab<AnvilUpgradeContainer> {}
  class AnvilUpgradeTab extends UpgradeSettingsTab<AnvilUpgradeContainer> {
    static readonly EDIT_ITEM_NAME_BACKGROUND_DISABLED: TextureBlitData;
    static readonly EDIT_ITEM_NAME_BACKGROUND: TextureBlitData;
    static readonly PLUS_SIGN: TextureBlitData;
    static readonly ARROW: TextureBlitData;
    static readonly RED_CROSS: TextureBlitData;
    constructor(upgradeContainer: AnvilUpgradeContainer, position: Position, screen: StorageScreenBase<any>);
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
  }


  interface AnvilUpgradeWrapper extends UpgradeWrapperBase<AnvilUpgradeWrapper, AnvilUpgradeItem> {}
  class AnvilUpgradeWrapper extends UpgradeWrapperBase<AnvilUpgradeWrapper, AnvilUpgradeItem> {
    canBeDisabled(): boolean;
    get inventory(): StatefulComponentItemHandler;
    get itemName(): string;
    isItemValid(slot: number, stack: ItemStack): boolean;
    set itemName(itemName: string);
    setShiftClickIntoStorage(shiftClickIntoStorage: boolean): void;
    shouldShiftClickIntoStorage(): boolean;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.upgrades.deposit' {
  import { FilterLogic, FilterAttributes, FilterLogicContainer, FilterLogicControl, UpgradeItemBase, UpgradeType, UpgradeWrapperBase, IFilteredUpgrade } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Consumer, Supplier, IntSupplier } from 'java.util.function';
  import { DeferredHolder } from 'net.neoforged.neoforge.registries';
  import { DataComponentType } from 'net.minecraft.core.component';
  import { IItemHandler } from 'net.neoforged.neoforge.items';
  import { IServerUpdater, UpgradeContainerBase, UpgradeContainerType } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { Slot } from 'net.minecraft.world.inventory';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Toggle } from 'ButtonDefinition';
  import { NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { Player } from 'net.minecraft.world.entity.player';
  import { UpgradeConflictDefinition } from 'IUpgradeItem';
  import { UpgradeSettingsTab } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { IItemHandlerInteractionUpgrade } from 'net.p3pp3rf1y.sophisticatedbackpacks.api';
  import { IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';

  interface DepositFilterLogic extends FilterLogic {}
  class DepositFilterLogic extends FilterLogic {
    constructor(upgrade: ItemStack, saveHandler: Consumer<ItemStack>, filterSlotCount: number, contentsComponent: DeferredHolder<DataComponentType<any>, DataComponentType<FilterAttributes>>);
    get depositFilterType(): DepositFilterType;
    matchesFilter(stack: ItemStack): boolean;
    set depositFilterType(depositFilterType: DepositFilterType);
    setInventory(inventory: IItemHandler): void;
  }


  interface DepositFilterLogicContainer extends FilterLogicContainer<DepositFilterLogic> {}
  class DepositFilterLogicContainer extends FilterLogicContainer<DepositFilterLogic> {
    constructor(filterLogic: Supplier<DepositFilterLogic>, serverUpdater: IServerUpdater, addSlot: Consumer<Slot>);
    get depositFilterType(): DepositFilterType;
    handlePacket(data: CompoundTag): boolean;
    set depositFilterType(depositFilterType: DepositFilterType);
  }


  interface DepositFilterLogicControl extends FilterLogicControl<DepositFilterLogic, DepositFilterLogicContainer> {}
  class DepositFilterLogicControl extends FilterLogicControl<DepositFilterLogic, DepositFilterLogicContainer> {
    static readonly DEPOSIT_FILTER_TYPE: Toggle;
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
  }


  interface DepositFilterType extends Enum<DepositFilterType> {}
  class DepositFilterType extends Enum<DepositFilterType> {
    static readonly ALLOW: DepositFilterType;
    static readonly BLOCK: DepositFilterType;
    static readonly INVENTORY: DepositFilterType;
    static fromName(name: string): DepositFilterType;
    get serializedName(): string;
    next(): DepositFilterType;
    static valueOf(name: string): DepositFilterType;
    static values(): DepositFilterType[];
  }


  interface DepositUpgradeContainer extends UpgradeContainerBase<DepositUpgradeWrapper, DepositUpgradeContainer> {}
  class DepositUpgradeContainer extends UpgradeContainerBase<DepositUpgradeWrapper, DepositUpgradeContainer> {
    constructor(player: Player, containerId: number, wrapper: DepositUpgradeWrapper, type: UpgradeContainerType<DepositUpgradeWrapper, DepositUpgradeContainer>);
    get filterLogicContainer(): DepositFilterLogicContainer;
    handlePacket(data: CompoundTag): void;
  }


  interface DepositUpgradeItem extends UpgradeItemBase<DepositUpgradeWrapper> {}
  class DepositUpgradeItem extends UpgradeItemBase<DepositUpgradeWrapper> {
    constructor(filterSlotCount: IntSupplier);
    get filterSlotCount(): number;
    get type(): UpgradeType<DepositUpgradeWrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
  }


  interface DepositUpgradeTab extends UpgradeSettingsTab<DepositUpgradeContainer> {}
  class DepositUpgradeTab extends UpgradeSettingsTab<DepositUpgradeContainer> {
  }


  interface DepositUpgradeWrapper extends IFilteredUpgrade, IItemHandlerInteractionUpgrade, UpgradeWrapperBase<DepositUpgradeWrapper, DepositUpgradeItem> {}
  class DepositUpgradeWrapper extends IFilteredUpgrade {
    constructor(backpackWrapper: IStorageWrapper, upgrade: ItemStack, upgradeSaveHandler: Consumer<ItemStack>);
    get filterLogic(): DepositFilterLogic;
    onHandlerInteract(itemHandler: IItemHandler, player: Player): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.upgrades.deposit.DepositFilterLogicControl' {
  import { DepositFilterLogicControl, DepositFilterLogicContainer } from 'net.p3pp3rf1y.sophisticatedbackpacks.upgrades.deposit';
  import { StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';

  interface Advanced extends DepositFilterLogicControl {}
  class Advanced extends DepositFilterLogicControl {
    constructor(screen: StorageScreenBase<any>, position: Position, filterLogicContainer: DepositFilterLogicContainer, slotsPerRow: number);
  }


  interface Basic extends DepositFilterLogicControl {}
  class Basic extends DepositFilterLogicControl {
    constructor(screen: StorageScreenBase<any>, position: Position, filterLogicContainer: DepositFilterLogicContainer, slotsPerRow: number);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.upgrades.deposit.DepositUpgradeTab' {
  import { DepositUpgradeTab, DepositUpgradeContainer } from 'net.p3pp3rf1y.sophisticatedbackpacks.upgrades.deposit';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';

  interface Advanced extends DepositUpgradeTab {}
  class Advanced extends DepositUpgradeTab {
    constructor(upgradeContainer: DepositUpgradeContainer, position: Position, screen: StorageScreenBase<any>);
  }


  interface Basic extends DepositUpgradeTab {}
  class Basic extends DepositUpgradeTab {
    constructor(upgradeContainer: DepositUpgradeContainer, position: Position, screen: StorageScreenBase<any>);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.upgrades.everlasting' {
  import { ItemEntity } from 'net.minecraft.world.entity.item';
  import { EntityType } from 'net.minecraft.world.entity';
  import { Level, Explosion } from 'net.minecraft.world.level';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { UpgradeItemBase, UpgradeType } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { Wrapper } from 'net.p3pp3rf1y.sophisticatedbackpacks.upgrades.everlasting.EverlastingUpgradeItem';
  import { List } from 'java.util';
  import { UpgradeConflictDefinition } from 'IUpgradeItem';

  interface EverlastingBackpackItemEntity extends ItemEntity {}
  class EverlastingBackpackItemEntity extends ItemEntity {
    constructor(type: EntityType<ItemEntity>, level: Level);
    fireImmune(): boolean;
    ignoreExplosion(explosion: Explosion): boolean;
    isInWater(): boolean;
    isInvulnerableTo(source: DamageSource): boolean;
    tick(): void;
  }


  interface EverlastingUpgradeItem extends UpgradeItemBase<Wrapper> {}
  class EverlastingUpgradeItem extends UpgradeItemBase<Wrapper> {
    static readonly TYPE: UpgradeType;
    static readonly UPGRADE_CONFLICT_DEFINITIONS: List;
    constructor();
    get type(): UpgradeType<Wrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.upgrades.everlasting.EverlastingUpgradeItem' {
  import { UpgradeWrapperBase } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { EverlastingUpgradeItem } from 'net.p3pp3rf1y.sophisticatedbackpacks.upgrades.everlasting';
  import { IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Consumer } from 'java.util.function';

  interface Wrapper extends UpgradeWrapperBase<Wrapper, EverlastingUpgradeItem> {}
  class Wrapper extends UpgradeWrapperBase<Wrapper, EverlastingUpgradeItem> {
    constructor(backpackWrapper: IStorageWrapper, upgrade: ItemStack, upgradeSaveHandler: Consumer<ItemStack>);
    canBeDisabled(): boolean;
    hideSettingsTab(): boolean;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.upgrades.inception' {
  import { IEnergyStorage } from 'net.neoforged.neoforge.energy';
  import { IStorageFluidHandler, IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { ItemStack } from 'net.minecraft.world.item';
  import { FluidStack } from 'net.neoforged.neoforge.fluids';
  import { FluidAction } from 'IFluidHandler';
  import { TagKey } from 'net.minecraft.tags';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { ITrackedContentsItemHandler, ItemStackKey, InventoryHandler } from 'net.p3pp3rf1y.sophisticatedcore.inventory';
  import { Set, List, Collection } from 'java.util';
  import { Consumer } from 'java.util.function';
  import { Runnable, Class, Enum } from 'java.lang';
  import { UpgradeContainerBase, UpgradeContainerType, UpgradeSlotChangeResult } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { UpgradeItemBase, UpgradeType, UpgradeWrapperBase, IUpgradeAccessModifier, IUpgradeWrapperAccessor } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { UpgradeConflictDefinition } from 'IUpgradeItem';
  import { UpgradeSettingsTab, StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { IInventoryWrapperUpgrade, IFluidHandlerWrapperUpgrade, IEnergyStorageUpgradeWrapper } from 'net.p3pp3rf1y.sophisticatedbackpacks.api';

  interface InceptionEnergyStorage extends IEnergyStorage {}
  class InceptionEnergyStorage extends IEnergyStorage {
    constructor(wrappedEnergyStorage: IEnergyStorage, inventoryOrder: InventoryOrder, subBackpacksHandler: SubBackpacksHandler);
    canExtract(): boolean;
    canReceive(): boolean;
    extractEnergy(maxExtract: number, simulate: boolean): number;
    get energyStored(): number;
    get maxEnergyStored(): number;
    receiveEnergy(maxReceive: number, simulate: boolean): number;
  }


  interface InceptionFluidHandler extends IStorageFluidHandler {}
  class InceptionFluidHandler extends IStorageFluidHandler {
    constructor(wrappedFluidHandler: IStorageFluidHandler, backpack: ItemStack, inventoryOrder: InventoryOrder, subBackpacksHandler: SubBackpacksHandler);
    drain(resourceTag: TagKey<Fluid>, maxDrain: number, action: FluidAction, ignoreInOutLimit: boolean): FluidStack;
    drain(resource: FluidStack, action: FluidAction, ignoreInOutLimit: boolean): FluidStack;
    drain(resource: FluidStack, action: FluidAction): FluidStack;
    drain(maxDrain: number, action: FluidAction, ignoreInOutLimit: boolean): FluidStack;
    drain(maxDrain: number, action: FluidAction): FluidStack;
    fill(resource: FluidStack, action: FluidAction, ignoreInOutLimit: boolean): number;
    fill(resource: FluidStack, action: FluidAction): number;
    get container(): ItemStack;
    get tanks(): number;
    getFluidInTank(tank: number): FluidStack;
    getTankCapacity(tank: number): number;
    isFluidValid(tank: number, stack: FluidStack): boolean;
  }


  interface InceptionInventoryHandler extends ITrackedContentsItemHandler {}
  class InceptionInventoryHandler extends ITrackedContentsItemHandler {
    constructor(wrappedInventoryHandler: ITrackedContentsItemHandler, inventoryOrder: InventoryOrder, subBackpacksHandler: SubBackpacksHandler);
    extractItem(slot: number, amount: number, simulate: boolean): ItemStack;
    extractItem(stack: ItemStack, simulate: boolean): ItemStack;
    get slots(): number;
    get trackedStacks(): Set<ItemStackKey>;
    getSlotLimit(slot: number): number;
    getStackInSlot(slot: number): ItemStack;
    hasEmptySlots(): boolean;
    insertItem(slot: number, stack: ItemStack, simulate: boolean): ItemStack;
    insertItem(slot: number, stack: ItemStack, simulate: boolean): ItemStack;
    insertItem(stack: ItemStack, simulate: boolean): ItemStack;
    isInsertBlocked(): boolean;
    isItemValid(slot: number, stack: ItemStack): boolean;
    registerTrackingListeners(onAddStackKey: Consumer<ItemStackKey>, onRemoveStackKey: Consumer<ItemStackKey>, onAddFirstEmptySlot: Runnable, onRemoveLastEmptySlot: Runnable): void;
    setStackInSlot(slot: number, stack: ItemStack): void;
    unregisterStackKeyListeners(): void;
  }


  interface InceptionUpgradeContainer extends UpgradeContainerBase<InceptionUpgradeWrapper, InceptionUpgradeContainer> {}
  class InceptionUpgradeContainer extends UpgradeContainerBase<InceptionUpgradeWrapper, InceptionUpgradeContainer> {
    constructor(player: Player, upgradeContainerId: number, upgradeWrapper: InceptionUpgradeWrapper, type: UpgradeContainerType<InceptionUpgradeWrapper, InceptionUpgradeContainer>);
    get inventoryOrder(): InventoryOrder;
    handlePacket(data: CompoundTag): void;
    set inventoryOrder(inventoryOrder: InventoryOrder);
  }


  interface InceptionUpgradeItem extends UpgradeItemBase<InceptionUpgradeWrapper> {}
  class InceptionUpgradeItem extends UpgradeItemBase<InceptionUpgradeWrapper> {
    static readonly TYPE: UpgradeType;
    static readonly UPGRADE_CONFLICT_DEFINITIONS: List;
    constructor();
    canAddUpgradeTo(storageWrapper: IStorageWrapper, upgradeStack: ItemStack, firstLevelStorage: boolean, isClientSide: boolean): UpgradeSlotChangeResult;
    canRemoveUpgradeFrom(storageWrapper: IStorageWrapper, isClientSide: boolean): UpgradeSlotChangeResult;
    canSwapUpgradeFor(upgradeStackToPut: ItemStack, upgradeSlot: number, storageWrapper: IStorageWrapper, isClientSide: boolean): UpgradeSlotChangeResult;
    get type(): UpgradeType<InceptionUpgradeWrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
  }


  interface InceptionUpgradeTab extends UpgradeSettingsTab<InceptionUpgradeContainer> {}
  class InceptionUpgradeTab extends UpgradeSettingsTab<InceptionUpgradeContainer> {
    static readonly TYPE: UpgradeContainerType;
    constructor(upgradeContainer: InceptionUpgradeContainer, position: Position, screen: StorageScreenBase<any>);
  }


  interface InceptionUpgradeWrapper extends IInventoryWrapperUpgrade, IUpgradeAccessModifier, IFluidHandlerWrapperUpgrade, IEnergyStorageUpgradeWrapper, UpgradeWrapperBase<InceptionUpgradeWrapper, InceptionUpgradeItem> {}
  class InceptionUpgradeWrapper extends IInventoryWrapperUpgrade {
    constructor(backpackWrapper: IStorageWrapper, upgrade: ItemStack, upgradeSaveHandler: Consumer<ItemStack>);
    get inventoryOrder(): InventoryOrder;
    hideSettingsTab(): boolean;
    set inventoryOrder(inventoryOrder: InventoryOrder);
    wrapAccessor(upgradeWrapperAccessor: IUpgradeWrapperAccessor): IUpgradeWrapperAccessor;
    wrapHandler(fluidHandler: IStorageFluidHandler, backpack: ItemStack): IStorageFluidHandler;
    wrapInventory(inventory: ITrackedContentsItemHandler): ITrackedContentsItemHandler;
    wrapStorage(energyStorage: IEnergyStorage): IEnergyStorage;
  }


  interface InceptionWrapperAccessor extends IUpgradeWrapperAccessor {}
  class InceptionWrapperAccessor extends IUpgradeWrapperAccessor {
    constructor(backpackWrapper: IStorageWrapper, subBackpacksHandler: SubBackpacksHandler);
    clearCache(): void;
    getWrappersThatImplement<T>(upgradeClass: Class<T>): T[];
    getWrappersThatImplementFromMainStorage<T>(upgradeClass: Class<T>): T[];
    onBeforeDeconstruct(): void;
  }


  interface InventoryOrder extends Enum<InventoryOrder> {}
  class InventoryOrder extends Enum<InventoryOrder> {
    static readonly MAIN_FIRST: InventoryOrder;
    static readonly INCEPTED_FIRST: InventoryOrder;
    static fromName(name: string): InventoryOrder;
    get serializedName(): string;
    next(): InventoryOrder;
    static valueOf(name: string): InventoryOrder;
    static values(): InventoryOrder[];
  }


  class SubBackpacksHandler {
    constructor(inventoryHandler: InventoryHandler);
    addBeforeRefreshListener(listener: Consumer<Collection<IStorageWrapper>>): void;
    addRefreshListener(listener: Consumer<Collection<IStorageWrapper>>): void;
    get subBackpacks(): Collection<IStorageWrapper>;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.upgrades.refill' {
  import { UpgradeContainerBase, UpgradeContainerType } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { Player } from 'net.minecraft.world.entity.player';
  import { FilterLogicContainer, FilterLogic, UpgradeItemBase, UpgradeType, UpgradeWrapperBase, IFilteredUpgrade, ITickableUpgrade } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { TargetSlot } from 'net.p3pp3rf1y.sophisticatedbackpacks.upgrades.refill.RefillUpgradeWrapper';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { IntSupplier, Consumer } from 'java.util.function';
  import { List, Map } from 'java.util';
  import { UpgradeConflictDefinition } from 'IUpgradeItem';
  import { UpgradeSettingsTab } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { IBlockPickResponseUpgrade } from 'net.p3pp3rf1y.sophisticatedbackpacks.api';
  import { Codec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Integer } from 'java.lang';
  import { Entity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';

  interface RefillUpgradeContainer extends UpgradeContainerBase<RefillUpgradeWrapper, RefillUpgradeContainer> {}
  class RefillUpgradeContainer extends UpgradeContainerBase<RefillUpgradeWrapper, RefillUpgradeContainer> {
    constructor(player: Player, containerId: number, wrapper: RefillUpgradeWrapper, type: UpgradeContainerType<RefillUpgradeWrapper, RefillUpgradeContainer>);
    allowsTargetSlotSelection(): boolean;
    get filterLogicContainer(): FilterLogicContainer<FilterLogic>;
    getTargetSlot(slot: number): TargetSlot;
    handlePacket(data: CompoundTag): void;
    setTargetSlot(slot: number, targetSlot: TargetSlot): void;
  }


  interface RefillUpgradeItem extends UpgradeItemBase<RefillUpgradeWrapper> {}
  class RefillUpgradeItem extends UpgradeItemBase<RefillUpgradeWrapper> {
    constructor(filterSlotCount: IntSupplier, targetSlotSelection: boolean, supportsBlockPick: boolean);
    allowsTargetSlotSelection(): boolean;
    get filterSlotCount(): number;
    get type(): UpgradeType<RefillUpgradeWrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
    supportsBlockPick(): boolean;
  }


  interface RefillUpgradeTab extends UpgradeSettingsTab<RefillUpgradeContainer> {}
  class RefillUpgradeTab extends UpgradeSettingsTab<RefillUpgradeContainer> {
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface RefillUpgradeWrapper extends IFilteredUpgrade, ITickableUpgrade, IBlockPickResponseUpgrade, UpgradeWrapperBase<RefillUpgradeWrapper, RefillUpgradeItem> {}
  class RefillUpgradeWrapper extends IFilteredUpgrade {
    static readonly TARGET_SLOTS_CODEC: Codec;
    static readonly TARGET_SLOTS_STREAM_CODEC: StreamCodec;
    constructor(backpackWrapper: IStorageWrapper, upgrade: ItemStack, upgradeSaveHandler: Consumer<ItemStack>);
    allowsTargetSlotSelection(): boolean;
    get filterLogic(): FilterLogic;
    get targetSlots(): Map<number, TargetSlot>;
    pickBlock(player: Player, filter: ItemStack): boolean;
    setTargetSlot(slot: number, targetSlot: TargetSlot): void;
    tick(entity: Entity, level: Level, pos: BlockPos): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.upgrades.refill.RefillUpgradeTab' {
  import { RefillUpgradeTab, RefillUpgradeContainer } from 'net.p3pp3rf1y.sophisticatedbackpacks.upgrades.refill';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';

  interface Advanced extends RefillUpgradeTab {}
  class Advanced extends RefillUpgradeTab {
    constructor(upgradeContainer: RefillUpgradeContainer, position: Position, screen: StorageScreenBase<any>, slotsInRow: number);
  }


  interface Basic extends RefillUpgradeTab {}
  class Basic extends RefillUpgradeTab {
    constructor(upgradeContainer: RefillUpgradeContainer, position: Position, screen: StorageScreenBase<any>, slotsInRow: number);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.upgrades.refill.RefillUpgradeWrapper' {
  import { Enum } from 'java.lang';
  import { Component } from 'net.minecraft.network.chat';
  import { List } from 'java.util';

  interface TargetSlot extends Enum<TargetSlot> {}
  class TargetSlot extends Enum<TargetSlot> {
    static readonly ANY: TargetSlot;
    static readonly MAIN_HAND: TargetSlot;
    static readonly OFF_HAND: TargetSlot;
    static readonly TOOLBAR_1: TargetSlot;
    static readonly TOOLBAR_2: TargetSlot;
    static readonly TOOLBAR_3: TargetSlot;
    static readonly TOOLBAR_4: TargetSlot;
    static readonly TOOLBAR_5: TargetSlot;
    static readonly TOOLBAR_6: TargetSlot;
    static readonly TOOLBAR_7: TargetSlot;
    static readonly TOOLBAR_8: TargetSlot;
    static readonly TOOLBAR_9: TargetSlot;
    static fromName(name: string): TargetSlot;
    get acronym(): Component;
    get description(): Component;
    get serializedName(): string;
    next(): TargetSlot;
    previous(): TargetSlot;
    static valueOf(name: string): TargetSlot;
    static values(): TargetSlot[];
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.upgrades.restock' {
  import { UpgradeItemBase, UpgradeType, ContentsFilteredUpgradeContainer, UpgradeWrapperBase, IContentsFilteredUpgrade, ContentsFilterLogic } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { IntSupplier, Consumer } from 'java.util.function';
  import { List } from 'java.util';
  import { UpgradeConflictDefinition } from 'IUpgradeItem';
  import { UpgradeSettingsTab } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { IItemHandlerInteractionUpgrade } from 'net.p3pp3rf1y.sophisticatedbackpacks.api';
  import { IStorageWrapper } from 'net.p3pp3rf1y.sophisticatedcore.api';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IItemHandler } from 'net.neoforged.neoforge.items';
  import { Player } from 'net.minecraft.world.entity.player';

  interface RestockUpgradeItem extends UpgradeItemBase<RestockUpgradeWrapper> {}
  class RestockUpgradeItem extends UpgradeItemBase<RestockUpgradeWrapper> {
    constructor(filterSlotCount: IntSupplier);
    get filterSlotCount(): number;
    get type(): UpgradeType<RestockUpgradeWrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
  }


  interface RestockUpgradeTab extends UpgradeSettingsTab<ContentsFilteredUpgradeContainer> {}
  class RestockUpgradeTab extends UpgradeSettingsTab<ContentsFilteredUpgradeContainer> {
  }


  interface RestockUpgradeWrapper extends IContentsFilteredUpgrade, IItemHandlerInteractionUpgrade, UpgradeWrapperBase<RestockUpgradeWrapper, RestockUpgradeItem> {}
  class RestockUpgradeWrapper extends IContentsFilteredUpgrade {
    constructor(backpackWrapper: IStorageWrapper, upgrade: ItemStack, upgradeSaveHandler: Consumer<ItemStack>);
    get filterLogic(): ContentsFilterLogic;
    onHandlerInteract(itemHandler: IItemHandler, player: Player): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.upgrades.restock.RestockUpgradeTab' {
  import { RestockUpgradeTab, RestockUpgradeWrapper } from 'net.p3pp3rf1y.sophisticatedbackpacks.upgrades.restock';
  import { ContentsFilteredUpgradeContainer, ContentsFilterType } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { Toggle } from 'ButtonDefinition';

  interface Advanced extends RestockUpgradeTab {}
  class Advanced extends RestockUpgradeTab {
    constructor(upgradeContainer: ContentsFilteredUpgradeContainer<RestockUpgradeWrapper>, position: Position, screen: StorageScreenBase<any>, contentsFilterButton: Toggle<ContentsFilterType>);
  }


  interface Basic extends RestockUpgradeTab {}
  class Basic extends RestockUpgradeTab {
    constructor(upgradeContainer: ContentsFilteredUpgradeContainer<RestockUpgradeWrapper>, position: Position, screen: StorageScreenBase<any>, contentsFilterButton: Toggle<ContentsFilterType>);
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.upgrades.smithing' {
  import { UpgradeContainerBase, ICraftingContainer, UpgradeContainerType } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Runnable } from 'java.lang';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { IUpgradeWrapper, UpgradeItemBase, UpgradeType, UpgradeWrapperBase } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { Slot } from 'net.minecraft.world.inventory';
  import { List } from 'java.util';
  import { Container } from 'net.minecraft.world';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RecipeType } from 'net.minecraft.world.item.crafting';
  import { UpgradeConflictDefinition } from 'IUpgradeItem';
  import { UpgradeSettingsTab, StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { TextureBlitData, Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ItemStack } from 'net.minecraft.world.item';
  import { StatefulComponentItemHandler } from 'net.p3pp3rf1y.sophisticatedcore.inventory';

  interface SmithingUpgradeContainer extends ICraftingContainer, UpgradeContainerBase<SmithingUpgradeWrapper, SmithingUpgradeContainer> {}
  class SmithingUpgradeContainer extends ICraftingContainer {
    constructor(player: Player, upgradeContainerId: number, upgradeWrapper: SmithingUpgradeWrapper, type: UpgradeContainerType<SmithingUpgradeWrapper, SmithingUpgradeContainer>);
    allowsPickupAll(slot: Slot): boolean;
    get additionalSlot(): Slot;
    get baseSlot(): Slot;
    get craftMatrix(): Container;
    get recipeSlots(): Slot[];
    get recipeType(): RecipeType<any>;
    get resultSlot(): Slot;
    get templateSlot(): Slot;
    handlePacket(data: CompoundTag): void;
    mergeIntoStorageFirst(slot: Slot): boolean;
    setOnResultChangedHandler(onResultChanged: Runnable): void;
    setRecipeUsed(recipeId: ResourceLocation): void;
    setShiftClickIntoStorage(shiftClickIntoStorage: boolean): void;
    setUpgradeWrapper(updatedUpgradeWrapper: IUpgradeWrapper): void;
    shouldRefillCraftingGrid(): boolean;
    shouldShiftClickIntoStorage(): boolean;
  }


  interface SmithingUpgradeItem extends UpgradeItemBase<SmithingUpgradeWrapper> {}
  class SmithingUpgradeItem extends UpgradeItemBase<SmithingUpgradeWrapper> {
    constructor();
    get type(): UpgradeType<SmithingUpgradeWrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
  }


  interface SmithingUpgradeTab extends UpgradeSettingsTab<SmithingUpgradeContainer> {}
  class SmithingUpgradeTab extends UpgradeSettingsTab<SmithingUpgradeContainer> {
    static readonly ARROW: TextureBlitData;
    static readonly RED_CROSS: TextureBlitData;
    constructor(upgradeContainer: SmithingUpgradeContainer, position: Position, screen: StorageScreenBase<any>);
    renderTooltip(screen: Screen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    tick(): void;
  }


  interface SmithingUpgradeWrapper extends UpgradeWrapperBase<SmithingUpgradeWrapper, SmithingUpgradeItem> {}
  class SmithingUpgradeWrapper extends UpgradeWrapperBase<SmithingUpgradeWrapper, SmithingUpgradeItem> {
    canBeDisabled(): boolean;
    get inventory(): StatefulComponentItemHandler;
    isItemValid(slot: number, stack: ItemStack): boolean;
    setShiftClickIntoStorage(shiftClickIntoStorage: boolean): void;
    shouldShiftClickIntoStorage(): boolean;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.upgrades.toolswapper' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { UpgradeContainerBase, UpgradeContainerType } from 'net.p3pp3rf1y.sophisticatedcore.common.gui';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { FilterLogicContainer, FilterLogic, UpgradeItemBase, UpgradeType, UpgradeWrapperBase } from 'net.p3pp3rf1y.sophisticatedcore.upgrades';
  import { UpgradeConflictDefinition } from 'IUpgradeItem';
  import { UpgradeSettingsTab, StorageScreenBase } from 'net.p3pp3rf1y.sophisticatedcore.client.gui';
  import { Toggle } from 'ButtonDefinition';
  import { Position } from 'net.p3pp3rf1y.sophisticatedcore.client.gui.utils';
  import { IBlockClickResponseUpgrade, IAttackEntityResponseUpgrade, IBlockToolSwapUpgrade, IEntityToolSwapUpgrade } from 'net.p3pp3rf1y.sophisticatedbackpacks.api';
  import { BlockPos } from 'net.minecraft.core';
  import { Level } from 'net.minecraft.world.level';
  import { Entity } from 'net.minecraft.world.entity';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  interface ToolSwapMode extends Enum<ToolSwapMode> {}
  class ToolSwapMode extends Enum<ToolSwapMode> {
    static readonly ANY: ToolSwapMode;
    static readonly ONLY_TOOLS: ToolSwapMode;
    static readonly NO_SWAP: ToolSwapMode;
    static fromName(name: string): ToolSwapMode;
    get serializedName(): string;
    next(): ToolSwapMode;
    static valueOf(name: string): ToolSwapMode;
    static values(): ToolSwapMode[];
  }


  interface ToolSwapperUpgradeContainer extends UpgradeContainerBase<ToolSwapperUpgradeWrapper, ToolSwapperUpgradeContainer> {}
  class ToolSwapperUpgradeContainer extends UpgradeContainerBase<ToolSwapperUpgradeWrapper, ToolSwapperUpgradeContainer> {
    constructor(player: Player, upgradeContainerId: number, upgradeWrapper: ToolSwapperUpgradeWrapper, type: UpgradeContainerType<ToolSwapperUpgradeWrapper, ToolSwapperUpgradeContainer>);
    get filterLogicContainer(): FilterLogicContainer<FilterLogic>;
    get toolSwapMode(): ToolSwapMode;
    handlePacket(data: CompoundTag): void;
    set toolSwapMode(toolSwapMode: ToolSwapMode);
    setSwapWeapon(shouldSwapWeapon: boolean): void;
    shouldSwapWeapon(): boolean;
  }


  interface ToolSwapperUpgradeItem extends UpgradeItemBase<ToolSwapperUpgradeWrapper> {}
  class ToolSwapperUpgradeItem extends UpgradeItemBase<ToolSwapperUpgradeWrapper> {
    static readonly UPGRADE_CONFLICT_DEFINITIONS: List;
    constructor(hasSettingsTab: boolean, swapToolOnKeyPress: boolean);
    get type(): UpgradeType<ToolSwapperUpgradeWrapper>;
    get upgradeConflicts(): UpgradeConflictDefinition[];
    hasSettingsTab(): boolean;
    shouldSwapToolOnKeyPress(): boolean;
  }


  interface ToolSwapperUpgradeTab extends UpgradeSettingsTab<ToolSwapperUpgradeContainer> {}
  class ToolSwapperUpgradeTab extends UpgradeSettingsTab<ToolSwapperUpgradeContainer> {
    static readonly SWAP_WEAPON: Toggle;
    static readonly SWAP_TOOLS: Toggle;
    constructor(upgradeContainer: ToolSwapperUpgradeContainer, position: Position, screen: StorageScreenBase<any>);
  }


  interface ToolSwapperUpgradeWrapper extends IBlockClickResponseUpgrade, IAttackEntityResponseUpgrade, IBlockToolSwapUpgrade, IEntityToolSwapUpgrade, UpgradeWrapperBase<ToolSwapperUpgradeWrapper, ToolSwapperUpgradeItem> {}
  class ToolSwapperUpgradeWrapper extends IBlockClickResponseUpgrade {
    canProcessBlockInteract(): boolean;
    canProcessEntityInteract(): boolean;
    get filterLogic(): FilterLogic;
    get toolSwapMode(): ToolSwapMode;
    hideSettingsTab(): boolean;
    onAttackEntity(player: Player): boolean;
    onBlockClick(player: Player, pos: BlockPos): boolean;
    onBlockInteract(level: Level, pos: BlockPos, blockState: BlockState, player: Player): boolean;
    onEntityInteract(level: Level, entity: Entity, player: Player): boolean;
    set toolSwapMode(toolSwapMode: ToolSwapMode);
    setSwapWeapon(shouldSwapWeapon: boolean): void;
    shouldSwapWeapon(): boolean;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.util' {
  import { UseOnContext } from 'net.minecraft.world.item.context';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { Level } from 'net.minecraft.world.level';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Set, Optional } from 'java.util';
  import { Function } from 'java.util.function';
  import { SlotCountGetter, SlotStackGetter } from 'net.p3pp3rf1y.sophisticatedbackpacks.util.PlayerInventoryHandler';
  import { RenderInfo, BackpackInventorySlotConsumer } from 'net.p3pp3rf1y.sophisticatedbackpacks.util.PlayerInventoryProvider';

  class InventoryInteractionHelper {
    static tryInventoryInteraction(context: UseOnContext): boolean;
    static tryInventoryInteraction(pos: BlockPos, level: Level, backpack: ItemStack, face: Direction, player: Player): boolean;
  }


  class PlayerInventoryHandler {
    static readonly SINGLE_IDENTIFIER: Set;
    constructor(identifiersGetter: Function<Player, Set<string>>, slotCountGetter: SlotCountGetter, slotStackGetter: SlotStackGetter, visibleInGui: boolean, ownRenderer: boolean, accessibleByAnotherPlayer: boolean);
    getIdentifiers(player: Player): Set<string>;
    getSlotCount(player: Player, identifier: string): number;
    getStackInSlot(player: Player, identifier: string, slot: number): ItemStack;
    hasItsOwnRenderer(): boolean;
    isAccessibleByAnotherPlayer(): boolean;
    isVisibleInGui(): boolean;
  }


  class PlayerInventoryProvider {
    static readonly MAIN_INVENTORY: string;
    static readonly OFFHAND_INVENTORY: string;
    static readonly ARMOR_INVENTORY: string;
    addPlayerInventoryHandler(name: string, identifiersGetter: Function<Player, Set<string>>, slotCountGetter: SlotCountGetter, slotStackGetter: SlotStackGetter, visibleInGui: boolean, rendered: boolean, ownRenderer: boolean, accessibleByAnotherPlayer: boolean): void;
    static get (): PlayerInventoryProvider;
    getBackpackFromRendered(player: Player): Optional<RenderInfo>;
    getPlayerInventoryHandler(name: string): Optional<PlayerInventoryHandler>;
    runOnBackpacks(player: Player, backpackInventorySlotConsumer: BackpackInventorySlotConsumer): void;
    runOnBackpacks(player: Player, backpackInventorySlotConsumer: BackpackInventorySlotConsumer, onlyAccessibleByAnotherPlayer: boolean): void;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.util.PlayerInventoryHandler' {
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';

  class SlotCountGetter {
    getSlotCount(var1: Player, var2: string): number;
  }


  class SlotStackGetter {
    getStackInSlot(var1: Player, var2: string, var3: number): ItemStack;
  }

}

declare module 'net.p3pp3rf1y.sophisticatedbackpacks.util.PlayerInventoryProvider' {
  import { ItemStack } from 'net.minecraft.world.item';

  class RenderInfo {
    constructor(backpack: ItemStack, isArmorSlot: boolean);
    get backpack(): ItemStack;
    isArmorSlot(): boolean;
  }


  class BackpackInventorySlotConsumer {
    accept(var1: ItemStack, var2: string, var3: string, var4: number): boolean;
  }

}