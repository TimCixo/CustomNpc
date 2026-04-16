declare module 'dev.ftb.mods.ftbquests.api.event' {
  import { Event } from 'dev.architectury.event';
  import { Consumer } from 'java.util.function';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Collection } from 'java.util';

  class CustomFilterDisplayItemsEvent {
    static readonly ADD_ITEMSTACK: Event;
    constructor(callback: Consumer<ItemStack>);
    add(stack: ItemStack): void;
    add(stacks: Collection<ItemStack>): void;
  }

}

declare module 'dev.ftb.mods.ftbquests.api' {
  import { API } from 'dev.ftb.mods.ftbquests.api.FTBQuestsAPI';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Matcher } from 'dev.ftb.mods.ftbquests.api.ItemFilterAdapter';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { Provider } from 'HolderLookup';
  import { TagKey } from 'net.minecraft.tags';
  import { TeamData, Chapter, Quest, QuestLink } from 'dev.ftb.mods.ftbquests.quest';
  import { UUID, Optional, Collection } from 'java.util';
  import { Team } from 'dev.ftb.mods.ftbteams.api';
  import { Entity } from 'net.minecraft.world.entity';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Consumer } from 'java.util.function';

  class FTBQuestsAPI {
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static _init(instance: API): void;
    static api(): API;
    static rl(path: string): ResourceLocation;
  }


  class FTBQuestsTags {
  }


  class ItemFilterAdapter {
    static readonly NO_MATCH: Matcher;
    doesItemMatch(var1: ItemStack, var2: ItemStack, var3: Provider): boolean;
    get name(): string;
    getMatcher(var1: ItemStack, var2: Provider): Matcher;
    hasItemTagFilter(): boolean;
    isFilterStack(var1: ItemStack): boolean;
    makeTagFilterStack(var1: TagKey<Item>): ItemStack;
  }


  class QuestFile {
    canEdit(): boolean;
    forAllChapters(var1: Consumer<Chapter>): void;
    forAllQuestLinks(var1: Consumer<QuestLink>): void;
    forAllQuests(var1: Consumer<Quest>): void;
    get allTeamData(): Collection<TeamData>;
    getNullableTeamData(var1: UUID): TeamData;
    getOrCreateTeamData(var1: UUID): TeamData;
    getOrCreateTeamData(var1: Team): TeamData;
    getOrCreateTeamData(var1: Entity): TeamData;
    getTeamData(var1: Player): Optional<TeamData>;
    isServerSide(): boolean;
  }

}

declare module 'dev.ftb.mods.ftbquests.api.FTBQuestsAPI' {
  import { BaseQuestFile } from 'dev.ftb.mods.ftbquests.quest';
  import { ItemFilterAdapter } from 'dev.ftb.mods.ftbquests.api';

  class API {
    getQuestFile(var1: boolean): BaseQuestFile;
    registerFilterAdapter(var1: ItemFilterAdapter): void;
  }

}

declare module 'dev.ftb.mods.ftbquests.api.FTBQuestsTags' {
  import { TagKey } from 'net.minecraft.tags';

  class Items {
    static readonly CHECK_NBT: TagKey;
  }


  class EntityTypes {
    static readonly NO_LOOT_CRATES: TagKey;
  }

}

declare module 'dev.ftb.mods.ftbquests.api.ItemFilterAdapter' {
  import { Predicate } from 'java.util.function';
  import { ItemStack } from 'net.minecraft.world.item';

  interface Matcher extends Predicate<ItemStack> {}
  class Matcher extends Predicate<ItemStack> {
  }

}

declare module 'dev.ftb.mods.ftbquests.block' {
  import { BaseEntityBlock, RenderShape, Block } from 'net.minecraft.world.level.block';
  import { Properties } from 'BlockBehaviour';
  import { BlockEntity, BlockEntityTicker, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level, BlockGetter, LevelReader } from 'net.minecraft.world.level';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { BlockEntitySupplier } from 'BlockEntityType';
  import { LootCrateOpenerBlockEntity, QuestBarrierBlockEntity, TaskScreenBlockEntity, TaskScreenAuxBlockEntity } from 'dev.ftb.mods.ftbquests.block.entity';
  import { BooleanProperty, DirectionProperty } from 'net.minecraft.world.level.block.state.properties';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { Player } from 'net.minecraft.world.entity.player';
  import { TooltipContext } from 'Item';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { BoundingBox } from 'net.minecraft.world.level.levelgen.structure';

  interface DetectorBlock extends BaseEntityBlock {}
  class DetectorBlock extends BaseEntityBlock {
    static readonly PROPS: Properties;
    constructor(props: Properties);
    getRenderShape(blockState: BlockState): RenderShape;
    neighborChanged(blockState: BlockState, level: Level, blockPos: BlockPos, block: Block, blockPos2: BlockPos, bl: boolean): void;
    newBlockEntity(blockPos: BlockPos, blockState: BlockState): BlockEntity;
    setPlacedBy(level: Level, pos: BlockPos, state: BlockState, entity: LivingEntity, stack: ItemStack): void;
  }


  interface LootCrateOpenerBlock extends BaseEntityBlock {}
  class LootCrateOpenerBlock extends BaseEntityBlock {
    static readonly PROPS: Properties;
    constructor(props: Properties);
    static blockEntityProvider(): BlockEntitySupplier<LootCrateOpenerBlockEntity>;
    getRenderShape(state: BlockState): RenderShape;
    newBlockEntity(blockPos: BlockPos, blockState: BlockState): BlockEntity;
    setPlacedBy(level: Level, blockPos: BlockPos, blockState: BlockState, livingEntity: LivingEntity, itemStack: ItemStack): void;
  }


  interface QuestBarrierBlock extends BaseEntityBlock {}
  class QuestBarrierBlock extends BaseEntityBlock {
    static readonly OPEN: BooleanProperty;
    static readonly PROPS: Properties;
    constructor(props: Properties);
    getCloneItemStack(levelReader: LevelReader, blockPos: BlockPos, blockState: BlockState): ItemStack;
    getCollisionShape(state: BlockState, bg: BlockGetter, pos: BlockPos, ctx: CollisionContext): VoxelShape;
    getRenderShape(state: BlockState): RenderShape;
    getShadeBrightness(blockState: BlockState, blockGetter: BlockGetter, blockPos: BlockPos): number;
    getTicker<T extends BlockEntity>(level: Level, blockState: BlockState, blockEntityType: BlockEntityType<T>): BlockEntityTicker<T>;
    getVisualShape(state: BlockState, blockGetter: BlockGetter, pos: BlockPos, ctx: CollisionContext): VoxelShape;
    newBlockEntity(blockPos: BlockPos, blockState: BlockState): BlockEntity;
    propagatesSkylightDown(state: BlockState, bg: BlockGetter, pos: BlockPos): boolean;
    static questBlockEntityProvider(): BlockEntitySupplier<QuestBarrierBlockEntity>;
    setPlacedBy(level: Level, pos: BlockPos, state: BlockState, entity: LivingEntity, stack: ItemStack): void;
    skipRendering(state: BlockState, state2: BlockState, dir: Direction): boolean;
  }


  interface StageBarrierBlock extends QuestBarrierBlock {}
  class StageBarrierBlock extends QuestBarrierBlock {
    constructor(props: Properties);
    newBlockEntity(blockPos: BlockPos, blockState: BlockState): BlockEntity;
    static stageBlockEntityProvider(): BlockEntitySupplier<QuestBarrierBlockEntity>;
  }


  interface TaskScreenBlock extends BaseEntityBlock {}
  class TaskScreenBlock extends BaseEntityBlock {
    static readonly FACING: DirectionProperty;
    static readonly PROPS: Properties;
    constructor(props: Properties, size: number);
    appendHoverText(itemStack: ItemStack, context: TooltipContext, list: Component[], tooltipFlag: TooltipFlag): void;
    static blockEntityAuxProvider(): BlockEntitySupplier<TaskScreenAuxBlockEntity>;
    static blockEntityProvider(): BlockEntitySupplier<TaskScreenBlockEntity>;
    get size(): number;
    getDestroyProgress(blockState: BlockState, player: Player, blockGetter: BlockGetter, blockPos: BlockPos): number;
    static getMultiblockBounds(corePos: BlockPos, size: number, facing: Direction): BoundingBox;
    getRenderShape(state: BlockState): RenderShape;
    getStateForPlacement(blockPlaceContext: BlockPlaceContext): BlockState;
    newBlockEntity(blockPos: BlockPos, blockState: BlockState): BlockEntity;
    onRemove(blockState: BlockState, level: Level, blockPos: BlockPos, newState: BlockState, isMoving: boolean): void;
    setPlacedBy(level: Level, blockPos: BlockPos, blockState: BlockState, livingEntity: LivingEntity, itemStack: ItemStack): void;
  }

}

declare module 'dev.ftb.mods.ftbquests.block.entity' {
  import { BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockPos, RegistryAccess } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level } from 'net.minecraft.world.level';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { Packet } from 'net.minecraft.network.protocol';
  import { ClientGamePacketListener } from 'net.minecraft.network.protocol.game';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ConfigGroup } from 'dev.ftb.mods.ftblibrary.config';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Optional, UUID } from 'java.util';
  import { TeleportData } from 'dev.ftb.mods.ftbquests.block.entity.BaseBarrierBlockEntity';
  import { Quest, TeamData } from 'dev.ftb.mods.ftbquests.quest';
  import { Nameable } from 'net.minecraft.world';
  import { Component } from 'net.minecraft.network.chat';
  import { Task } from 'dev.ftb.mods.ftbquests.quest.task';

  interface BaseBarrierBlockEntity extends EditableBlockEntity {}
  class BaseBarrierBlockEntity extends EditableBlockEntity {
    constructor(blockEntityType: BlockEntityType<any>, blockPos: BlockPos, blockState: BlockState);
    fillConfigGroup(): ConfigGroup;
    forceAppearanceUpdate(): void;
    get clientAppearance(): BlockState;
    get skin(): ItemStack;
    get updatePacket(): Packet<ClientGamePacketListener>;
    getUpdateTag(provider: Provider): CompoundTag;
    hasPermissionToEdit(player: Player): boolean;
    isInvisibleWhenOpen(): boolean;
    isOpen(var1: Player): boolean;
    loadAdditional(tag: CompoundTag, provider: Provider): void;
    optionalTeleportData(): Optional<TeleportData>;
    saveAdditional(compoundTag: CompoundTag, provider: Provider): void;
    set skin(skin: ItemStack);
    setChanged(): void;
    setInvisibleWhenOpen(invisibleWhenOpen: boolean): void;
    static tick(level: Level, blockPos: BlockPos, blockState: BlockState, blockEntity: BlockEntity): void;
    updateFromString(objStr: string): void;
  }


  interface DetectorBlockEntity extends BlockEntity {}
  class DetectorBlockEntity extends BlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
    loadAdditional(tag: CompoundTag, provider: Provider): void;
    onPowered(level: Level, pos: BlockPos): void;
    saveAdditional(tag: CompoundTag, provider: Provider): void;
    update(idStr: string): void;
  }


  interface EditableBlockEntity extends IEditable, BlockEntity {}
  class EditableBlockEntity extends IEditable {
    constructor(blockEntityType: BlockEntityType<any>, blockPos: BlockPos, blockState: BlockState);
    readPayload(tag: CompoundTag, registryAccess: RegistryAccess): void;
  }


  class IEditable {
    hasPermissionToEdit(var1: Player): boolean;
  }


  interface ITaskScreen extends IEditable {}
  class ITaskScreen extends IEditable {
    get coreScreen(): Optional<TaskScreenBlockEntity>;
    get skin(): ItemStack;
    get teamId(): UUID;
    isIndestructible(): boolean;
    isInputOnly(): boolean;
  }


  interface LootCrateOpenerBlockEntity extends BlockEntity {}
  class LootCrateOpenerBlockEntity extends BlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
    get outputCount(): number;
    get owner(): UUID;
    loadAdditional(compoundTag: CompoundTag, provider: Provider): void;
    set owner(owner: UUID);
  }


  interface QuestBarrierBlockEntity extends BaseBarrierBlockEntity {}
  class QuestBarrierBlockEntity extends BaseBarrierBlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
    get quest(): Quest;
    isOpen(player: Player): boolean;
    set quest(quest: Quest);
    updateFromString(objStr: string): void;
  }


  interface StageBarrierBlockEntity extends BaseBarrierBlockEntity {}
  class StageBarrierBlockEntity extends BaseBarrierBlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
    isOpen(player: Player): boolean;
  }


  interface TaskScreenAuxBlockEntity extends ITaskScreen, Nameable, BlockEntity {}
  class TaskScreenAuxBlockEntity extends ITaskScreen {
    constructor(blockPos: BlockPos, blockState: BlockState);
    get coreScreen(): Optional<TaskScreenBlockEntity>;
    get name(): Component;
    get skin(): ItemStack;
    get teamId(): UUID;
    hasPermissionToEdit(player: Player): boolean;
    isIndestructible(): boolean;
    isInputOnly(): boolean;
    loadAdditional(compoundTag: CompoundTag, provider: Provider): void;
    set coreScreen(coreScreen: TaskScreenBlockEntity);
  }


  interface TaskScreenBlockEntity extends ITaskScreen, EditableBlockEntity {}
  class TaskScreenBlockEntity extends ITaskScreen {
    fakeTextureUV: number[];
    constructor(blockPos: BlockPos, blockState: BlockState);
    fillConfigGroup(data: TeamData): ConfigGroup;
    get cachedTeamData(): TeamData;
    get coreScreen(): Optional<TaskScreenBlockEntity>;
    get fakeTextureUV(): number[];
    get inputModeIcon(): ItemStack;
    get skin(): ItemStack;
    get task(): Task;
    get teamId(): UUID;
    get updatePacket(): Packet<ClientGamePacketListener>;
    getUpdateTag(provider: Provider): CompoundTag;
    hasPermissionToEdit(player: Player): boolean;
    isIndestructible(): boolean;
    isInputOnly(): boolean;
    isTextShadow(): boolean;
    loadAdditional(compoundTag: CompoundTag, provider: Provider): void;
    removeAllAuxScreens(): void;
    set inputModeIcon(inputModeIcon: ItemStack);
    set skin(skin: ItemStack);
    set task(task: Task);
    set teamId(teamId: UUID);
    setIndestructible(indestructible: boolean): void;
    setInputOnly(inputOnly: boolean): void;
    setTextShadow(textShadow: boolean): void;
  }

}

declare module 'dev.ftb.mods.ftbquests.block.neoforge' {
  import { LootCrateOpenerBlockEntity, QuestBarrierBlockEntity, StageBarrierBlockEntity, TaskScreenAuxBlockEntity, TaskScreenBlockEntity } from 'dev.ftb.mods.ftbquests.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { IItemHandler } from 'net.neoforged.neoforge.items';
  import { ModelProperty, ModelData } from 'net.neoforged.neoforge.client.model.data';
  import { Connection } from 'net.minecraft.network';
  import { ClientboundBlockEntityDataPacket } from 'net.minecraft.network.protocol.game';
  import { Provider } from 'HolderLookup';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { IFluidHandler } from 'net.neoforged.neoforge.fluids.capability';
  import { IEnergyStorage } from 'net.neoforged.neoforge.energy';
  import { AABB } from 'net.minecraft.world.phys';

  interface NeoForgeLootCrateOpenerBlockEntity extends LootCrateOpenerBlockEntity {}
  class NeoForgeLootCrateOpenerBlockEntity extends LootCrateOpenerBlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
    get lootCrateHandler(): IItemHandler;
  }


  interface NeoForgeQuestBarrierBlockEntity extends QuestBarrierBlockEntity {}
  class NeoForgeQuestBarrierBlockEntity extends QuestBarrierBlockEntity {
    static readonly CAMOUFLAGE_STATE: ModelProperty;
    constructor(blockPos: BlockPos, blockState: BlockState);
    forceAppearanceUpdate(): void;
    get modelData(): ModelData;
    handleUpdateTag(tag: CompoundTag, lookupProvider: Provider): void;
    onDataPacket(net: Connection, pkt: ClientboundBlockEntityDataPacket, lookupProvider: Provider): void;
  }


  interface NeoForgeStageBarrierBlockEntity extends StageBarrierBlockEntity {}
  class NeoForgeStageBarrierBlockEntity extends StageBarrierBlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
    forceAppearanceUpdate(): void;
    get modelData(): ModelData;
    handleUpdateTag(tag: CompoundTag, lookupProvider: Provider): void;
    onDataPacket(net: Connection, pkt: ClientboundBlockEntityDataPacket, lookupProvider: Provider): void;
  }


  interface NeoForgeTaskScreenAuxBlockEntity extends TaskScreenAuxBlockEntity {}
  class NeoForgeTaskScreenAuxBlockEntity extends TaskScreenAuxBlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
    get energyHandler(): IEnergyStorage;
    get fluidHandler(): IFluidHandler;
    get itemHandler(): IItemHandler;
  }


  interface NeoForgeTaskScreenBlockEntity extends TaskScreenBlockEntity {}
  class NeoForgeTaskScreenBlockEntity extends TaskScreenBlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
    get energyHandler(): IEnergyStorage;
    get fluidHandler(): IFluidHandler;
    get itemHandler(): IItemHandler;
    get renderBoundingBox(): AABB;
  }

}

declare module 'dev.ftb.mods.ftbquests.block.QuestBarrierBlock' {
  import { MinecraftServer } from 'net.minecraft.server';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { TeleportData } from 'dev.ftb.mods.ftbquests.block.entity.BaseBarrierBlockEntity';

  class TeleportTicker {
    static addPending(player: ServerPlayer, teleportData: TeleportData): void;
    static tick(server: MinecraftServer): void;
  }

}

declare module 'dev.ftb.mods.ftbquests.block.TaskScreenBlock' {
  import { TaskScreenBlock } from 'dev.ftb.mods.ftbquests.block';
  import { Properties } from 'BlockBehaviour';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  interface Aux extends TaskScreenBlock {}
  class Aux extends TaskScreenBlock {
    constructor(props: Properties);
    newBlockEntity(blockPos: BlockPos, blockState: BlockState): BlockEntity;
  }

}

declare module 'dev.ftb.mods.ftbquests.client' {
  import { Enum } from 'java.lang';
  import { List, Optional, Collection, UUID, Date } from 'java.util';
  import { BaseQuestFile, TeamData, Quest, Chapter, QuestObjectBase, QuestObjectType } from 'dev.ftb.mods.ftbquests.quest';
  import { QuestScreen } from 'dev.ftb.mods.ftbquests.client.gui.quests';
  import { Env } from 'dev.architectury.utils';
  import { Provider } from 'HolderLookup';
  import { Entity } from 'net.minecraft.world.entity';
  import { PersistedData } from 'dev.ftb.mods.ftbquests.client.gui.quests.QuestScreen';
  import { Player } from 'net.minecraft.world.entity.player';
  import { TooltipList } from 'dev.ftb.mods.ftblibrary.util';
  import { TranslationKey } from 'dev.ftb.mods.ftbquests.quest.translation';
  import { ItemStackConfig, ConfigCallback } from 'dev.ftb.mods.ftblibrary.config';
  import { Widget } from 'dev.ftb.mods.ftblibrary.ui';
  import { MouseButton } from 'dev.ftb.mods.ftblibrary.ui.input';
  import { TextureAtlasSprite, TextureAtlas } from 'net.minecraft.client.renderer.texture';
  import { IQuestProxy } from 'dev.ftb.mods.ftbquests';
  import { LootCrate } from 'dev.ftb.mods.ftbquests.quest.loot';
  import { KeyMapping } from 'net.minecraft.client';
  import { Level } from 'net.minecraft.world.level';
  import { InteractionHand } from 'net.minecraft.world';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { ItemDisplayParameters } from 'CreativeModeTab';
  import { SNBTConfig, BooleanValue, EnumValue, IntValue, DoubleValue, StringValue } from 'dev.ftb.mods.ftblibrary.snbt.config';
  import { BlockEntityRendererProvider } from 'net.minecraft.client.renderer.blockentity';
  import { TaskScreenBlockEntity } from 'dev.ftb.mods.ftbquests.block.entity';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { TeamDataUpdate } from 'dev.ftb.mods.ftbquests.net';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Component } from 'net.minecraft.network.chat';
  import { Icon } from 'dev.ftb.mods.ftblibrary.icon';
  import { ToastReward } from 'dev.ftb.mods.ftbquests.quest.reward';
  import { GuiProvider, Provider as dev_ftb_mods_ftbquests_quest_reward_rewardtype_Provider } from 'dev.ftb.mods.ftbquests.quest.reward.RewardType';
  import { GuiProvider as dev_ftb_mods_ftbquests_quest_task_tasktype_GuiProvider, Provider as dev_ftb_mods_ftbquests_quest_task_tasktype_Provider } from 'dev.ftb.mods.ftbquests.quest.task.TaskType';
  import { ResourceManagerReloadListener, ResourceManager } from 'net.minecraft.server.packs.resources';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';

  interface AutoPinTarget extends Enum<AutoPinTarget> {}
  class AutoPinTarget extends Enum<AutoPinTarget> {
    static readonly QUEST_BOOK: AutoPinTarget;
    static readonly CHAPTER: AutoPinTarget;
    get id(): string;
    static valueOf(name: string): AutoPinTarget;
    static values(): AutoPinTarget[];
  }


  interface ClientQuestFile extends BaseQuestFile {}
  class ClientQuestFile extends BaseQuestFile {
    static INSTANCE: ClientQuestFile;
    selfTeamData: TeamData;
    static addTranslationWarning(list: TooltipList, key: TranslationKey): void;
    static canClientPlayerEdit(): boolean;
    canEdit(): boolean;
    clearCachedData(): void;
    deleteObject(id: number): void;
    static exists(): boolean;
    get fallbackLocale(): string;
    get locale(): string;
    get questScreen(): Optional<QuestScreen>;
    get side(): Env;
    getOrCreateTeamData(player: Entity): TeamData;
    hasEditorPermission(): boolean;
    holderLookup(): Provider;
    isChapterSelected(chapter: Chapter): boolean;
    isPlayerOnTeam(player: Player, teamData: TeamData): boolean;
    static isQuestPinned(id: number): boolean;
    moveChapterGroup(id: number, movingUp: boolean): boolean;
    static openBookToQuestObject(id: number): void;
    static openGui(): QuestScreen;
    static openGui(quest: Quest, focused: boolean): QuestScreen;
    refreshGui(): void;
    setEditorPermission(hasPermission: boolean): void;
    setPersistedScreenInfo(persistedData: PersistedData): void;
    static syncFromServer(newInstance: BaseQuestFile): void;
  }


  interface ConfigIconItemStack extends ItemStackConfig {}
  class ConfigIconItemStack extends ItemStackConfig {
    constructor();
    onClicked(clickedWidget: Widget, button: MouseButton, callback: ConfigCallback): void;
  }


  class EnergyTaskClientData {
    get emptyTexture(): TextureAtlasSprite;
    get fullTexture(): TextureAtlasSprite;
  }


  interface FTBQClientProxy extends IQuestProxy {}
  class FTBQClientProxy extends IQuestProxy {
    get knownLootCrates(): Collection<LootCrate>;
  }


  class FTBQuestsClient {
    static KEY_QUESTS: KeyMapping;
    static copyToClipboard(qo: QuestObjectBase): void;
    static createClientQuestFile(): BaseQuestFile;
    static creativeTabDisplayParams(): Optional<ItemDisplayParameters>;
    static get clientLevel(): Level;
    static get clientPlayer(): Player;
    static get clientPlayerData(): TeamData;
    static get clientQuestFile(): BaseQuestFile;
    static getTextureUV(state: BlockState, face: Direction): number[];
    static holderLookup(): Provider;
    static init(): void;
    static isClientDataLoaded(): boolean;
    static openBarrierConfigGui(pos: BlockPos): void;
    static openCustomIconGui(player: Player, hand: InteractionHand): void;
    static openGui(): void;
    static openTaskScreenConfigGui(pos: BlockPos): void;
    static rebuildCreativeTabs(): void;
  }


  class FTBQuestsClientConfig {
    static readonly KEY: string;
    static readonly CONFIG: SNBTConfig;
    static readonly UI: SNBTConfig;
    static readonly OLD_SCROLL_WHEEL: BooleanValue;
    static readonly SHOW_LOCK_ICON: BooleanValue;
    static readonly BACKSPACE_HISTORY: BooleanValue;
    static readonly CHAPTER_PANEL_PINNED: BooleanValue;
    static readonly NOTIFICATIONS: SNBTConfig;
    static readonly COMPLETION_STYLE: EnumValue;
    static readonly REWARD_STYLE: EnumValue;
    static readonly COMPLETION_SOUNDS: BooleanValue;
    static readonly PINNED: SNBTConfig;
    static readonly AUTO_PIN_FOLLOWS: EnumValue;
    static readonly PINNED_QUESTS_POS: EnumValue;
    static readonly PINNED_QUESTS_INSET_X: IntValue;
    static readonly PINNED_QUESTS_INSET_Y: IntValue;
    static readonly PINNED_QUESTS_SCALE: DoubleValue;
    static readonly XLATE: SNBTConfig;
    static readonly EDITING_LOCALE: StringValue;
    static readonly FALLBACK_LOCALE: StringValue;
    static readonly HILITE_MISSING: BooleanValue;
    static onEdited(ignoredClientSide: boolean): void;
    static openSettings(pauseGame: boolean): void;
    static setChapterPanelPinned(pinned: boolean): void;
  }


  class FTBQuestsClientEventHandler {
    static inputOnlySprite: TextureAtlasSprite;
    static tankSprite: TextureAtlasSprite;
    static feEnergyEmptySprite: TextureAtlasSprite;
    static feEnergyFullSprite: TextureAtlasSprite;
    static trEnergyEmptySprite: TextureAtlasSprite;
    static trEnergyFullSprite: TextureAtlasSprite;
    init(): void;
    static onTextureStitchPost(textureAtlas: TextureAtlas): void;
    static taskScreenRenderer(): BlockEntityRendererProvider<TaskScreenBlockEntity>;
  }


  class FTBQuestsNetClient {
    static changeChapterGroup(id: number, newGroupId: number): void;
    static claimReward(teamId: UUID, player: UUID, rewardId: number): void;
    static createObject(id: number, parent: number, type: QuestObjectType, nbt: CompoundTag, extra: CompoundTag, creator: UUID): void;
    static createOtherTeamData(dataUpdate: TeamDataUpdate): void;
    static deleteObject(id: number): void;
    static displayCustomToast(t: ToastReward): void;
    static displayItemRewardToast(stack: ItemStack, count: number, disableBlur: boolean): void;
    static displayRewardToast(id: number, text: Component, icon: Icon, disableBlur: boolean): void;
    static editObject(id: number, nbt: CompoundTag): void;
    static moveChapter(id: number, movingUp: boolean): void;
    static moveChapterGroup(id: number, movingUp: boolean): void;
    static moveQuest(id: number, chapter: number, x: number, y: number): void;
    static notifyPlayerOfCompletion(id: number): void;
    static objectCompleted(teamId: UUID, id: number, time: Date): void;
    static objectStarted(teamId: UUID, id: number, time: Date): void;
    static resetReward(teamId: UUID, player: UUID, rewardId: number): void;
    static setEditorPermission(hasPermission: boolean): void;
    static syncEditingMode(teamId: UUID, editingMode: boolean): void;
    static syncLock(id: UUID, lock: boolean): void;
    static syncRewardBlocking(teamId: UUID, rewardsBlocked: boolean): void;
    static syncTeamData(data: TeamData): void;
    static teamDataChanged(oldDataUpdate: TeamDataUpdate, newDataUpdate: TeamDataUpdate): void;
    static togglePinned(id: number, pinned: boolean): void;
    static updateTaskProgress(teamId: UUID, task: number, progress: number): void;
    static updateTeamData(teamId: UUID, name: string): void;
  }


  class GuiProviders {
    static defaultRewardGuiProvider(provider: dev_ftb_mods_ftbquests_quest_reward_rewardtype_Provider): GuiProvider;
    static defaultTaskGuiProvider(provider: dev_ftb_mods_ftbquests_quest_task_tasktype_Provider): dev_ftb_mods_ftbquests_quest_task_tasktype_GuiProvider;
    static setRewardGuiProviders(): void;
    static setTaskGuiProviders(): void;
  }


  interface NotificationStyle extends Enum<NotificationStyle> {}
  class NotificationStyle extends Enum<NotificationStyle> {
    static readonly TOAST: NotificationStyle;
    static readonly CHAT: NotificationStyle;
    static readonly ACTION_BAR: NotificationStyle;
    static readonly NONE: NotificationStyle;
    notifyCompletion(id: number): boolean;
    notifyReward(text: Component, icon: Icon): void;
    static valueOf(name: string): NotificationStyle;
    static values(): NotificationStyle[];
  }


  interface PinnedQuestsTracker extends Enum<PinnedQuestsTracker> {}
  class PinnedQuestsTracker extends Enum<PinnedQuestsTracker> {
    static readonly INSTANCE: PinnedQuestsTracker;
    refresh(): void;
    tick(file: ClientQuestFile): void;
    static valueOf(name: string): PinnedQuestsTracker;
    static values(): PinnedQuestsTracker[];
  }


  interface QuestFileCacheReloader extends ResourceManagerReloadListener {}
  class QuestFileCacheReloader extends ResourceManagerReloadListener {
    onResourceManagerReload(resourceManager: ResourceManager): void;
  }


  class RenderUtil {
    static readonly FULL_BRIGHT: number;
    static create(matrixStack: PoseStack, builder: VertexConsumer, x: number, y: number): RenderUtil;
    draw(): void;
    withColor(color: number): RenderUtil;
    withLighting(packedLightIn: number): RenderUtil;
    withSize(w: number, h: number): RenderUtil;
    withUV(u1: number, v1: number, u2: number, v2: number): RenderUtil;
  }

}

declare module 'dev.ftb.mods.ftbquests.client.config' {
  import { ConfigValue, ConfigCallback, ConfigGroup } from 'dev.ftb.mods.ftblibrary.config';
  import { Color4I } from 'dev.ftb.mods.ftblibrary.icon';
  import { Widget } from 'dev.ftb.mods.ftblibrary.ui';
  import { MouseButton } from 'dev.ftb.mods.ftblibrary.ui.input';
  import { Component } from 'net.minecraft.network.chat';
  import { StringValue, SNBTConfig } from 'dev.ftb.mods.ftblibrary.snbt.config';

  interface LocaleConfig extends ConfigValue<string> {}
  class LocaleConfig extends ConfigValue<string> {
    static readonly COLOR: Color4I;
    getColor(v: string): Color4I;
    getStringForGUI(v: string): Component;
    onClicked(clickedWidget: Widget, button: MouseButton, callback: ConfigCallback): void;
  }


  interface LocaleValue extends StringValue {}
  class LocaleValue extends StringValue {
    constructor(config: SNBTConfig, value: string, def: string);
    createClientConfig(group: ConfigGroup): void;
  }

}

declare module 'dev.ftb.mods.ftbquests.client.gui' {
  import { AbstractButtonListScreen, SimpleToast } from 'dev.ftb.mods.ftblibrary.ui.misc';
  import { Chapter, QuestObjectBase, Movable, QuestObject } from 'dev.ftb.mods.ftbquests.quest';
  import { QuestScreen, ViewQuestPanel } from 'dev.ftb.mods.ftbquests.client.gui.quests';
  import { Panel, ContextMenuItem, BaseScreen, Theme, WidgetType, Widget } from 'dev.ftb.mods.ftblibrary.ui';
  import { Collection, List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { Icon, Color4I } from 'dev.ftb.mods.ftblibrary.icon';
  import { Runnable } from 'java.lang';
  import { RewardTable } from 'dev.ftb.mods.ftbquests.quest.loot';
  import { Consumer, Function } from 'java.util.function';
  import { Key, MouseButton, KeyModifiers } from 'dev.ftb.mods.ftblibrary.ui.input';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ImageComponent } from 'dev.ftb.mods.ftblibrary.util.client';
  import { TooltipList } from 'dev.ftb.mods.ftblibrary.util';
  import { ListConfig, StringConfig, ConfigCallback, ConfigGroup } from 'dev.ftb.mods.ftblibrary.config';
  import { EditConfigScreen } from 'dev.ftb.mods.ftblibrary.config.ui';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ChoiceReward } from 'dev.ftb.mods.ftbquests.quest.reward';
  import { ConfigQuestObject } from 'dev.ftb.mods.ftbquests.util';
  import { SoundManager } from 'net.minecraft.client.sounds';

  interface ChangeChapterGroupScreen extends AbstractButtonListScreen {}
  class ChangeChapterGroupScreen extends AbstractButtonListScreen {
    constructor(chapter: Chapter, questScreen: QuestScreen);
    addButtons(panel: Panel): void;
  }


  class ContextMenuBuilder {
    build(gui: BaseScreen): ContextMenuItem[];
    static create(object: QuestObjectBase, screen: QuestScreen): ContextMenuBuilder;
    insertAtBottom(toAdd: Collection<ContextMenuItem>): ContextMenuBuilder;
    insertAtTop(toAdd: Collection<ContextMenuItem>): ContextMenuBuilder;
    openContextMenu(gui: BaseScreen): void;
    withDeletionFocus(m: Movable): ContextMenuBuilder;
  }


  interface CustomToast extends SimpleToast {}
  class CustomToast extends SimpleToast {
    constructor(title: Component, icon: Icon, description: Component);
    get icon(): Icon;
    get subtitle(): Component;
    get title(): Component;
  }


  interface EditRewardTableScreen extends AbstractButtonListScreen {}
  class EditRewardTableScreen extends AbstractButtonListScreen {
    constructor(parentScreen: Runnable, originalTable: RewardTable, callback: Consumer<RewardTable>);
    addButtons(panel: Panel): void;
    get theme(): Theme;
    keyPressed(key: Key): boolean;
    onClosedByKey(key: Key): boolean;
    onInit(): boolean;
  }


  interface EmergencyItemsScreen extends BaseScreen {}
  class EmergencyItemsScreen extends BaseScreen {
    constructor();
    addWidgets(): void;
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    get theme(): Theme;
    onClicked(button: MouseButton): void;
    onInit(): boolean;
    static resetCooldown(): void;
    tick(): void;
  }


  interface FTBQuestsTheme extends Theme {}
  class FTBQuestsTheme extends Theme {
    static readonly INSTANCE: FTBQuestsTheme;
    drawButton(graphics: GuiGraphics, x: number, y: number, w: number, h: number, type: WidgetType): void;
    drawContainerSlot(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    drawContextMenuBackground(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    drawGui(graphics: GuiGraphics, x: number, y: number, w: number, h: number, type: WidgetType): void;
    drawPanelBackground(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    drawScrollBar(graphics: GuiGraphics, x: number, y: number, w: number, h: number, type: WidgetType, vertical: boolean): void;
    drawScrollBarBackground(graphics: GuiGraphics, x: number, y: number, w: number, h: number, type: WidgetType): void;
    drawTextBox(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    getContentColor(type: WidgetType): Color4I;
  }


  interface ImageComponentWidget extends Widget {}
  class ImageComponentWidget extends Widget {
    constructor(viewQuestPanel: ViewQuestPanel, panel: Panel, component: ImageComponent, index: number);
    addMouseOverText(list: TooltipList): void;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    get component(): ImageComponent;
    mouseDoubleClicked(button: MouseButton): boolean;
    mousePressed(button: MouseButton): boolean;
  }


  class IRewardListenerScreen {
    static add(key: RewardKey, count: number): boolean;
    rewardReceived(var1: RewardKey, var2: number): void;
  }


  interface MultilineTextEditorScreen extends BaseScreen {}
  class MultilineTextEditorScreen extends BaseScreen {
    static readonly LINK_ICON: Icon;
    static readonly CLEAR_FORMATTING_ICON: Icon;
    constructor(title: Component, config: ListConfig<string, StringConfig>, callback: ConfigCallback);
    addWidgets(): void;
    alignWidgets(): void;
    charTyped(c: string, modifiers: KeyModifiers): boolean;
    drawBackground(matrixStack: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    get theme(): Theme;
    keyPressed(key: Key): boolean;
    keyReleased(key: Key): void;
    onInit(): boolean;
    tick(): void;
  }


  class QuestObjectUpdateListener {
    onQuestObjectUpdate(var1: any): void;
  }


  interface QuestsClientConfigScreen extends EditConfigScreen {}
  class QuestsClientConfigScreen extends EditConfigScreen {
    constructor(group: ConfigGroup, pause: boolean);
    doesGuiPauseGame(): boolean;
    get title(): Component;
  }


  class RewardKey {
    constructor(title: string, icon: Icon, disableBlur: boolean);

    constructor(title: string, icon: Icon, stack: ItemStack, disableBlur: boolean);
    disableBlur(): boolean;
    equals(o: any): boolean;
    get icon(): Icon;
    get title(): string;
    hashCode(): number;
  }


  interface RewardNotificationsScreen extends IRewardListenerScreen, BaseScreen {}
  class RewardNotificationsScreen extends IRewardListenerScreen {
    constructor();
    addWidgets(): void;
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    get theme(): Theme;
    onInit(): boolean;
    rewardReceived(key: RewardKey, count: number): void;
  }


  interface RewardTablesScreen extends AbstractButtonListScreen {}
  class RewardTablesScreen extends AbstractButtonListScreen {
    constructor(questScreen: QuestScreen);
    addButtons(panel: Panel): void;
    onClicked(button: MouseButton): void;
    onClosedByKey(key: Key): boolean;
    onInit(): boolean;
  }


  interface RewardToast extends SimpleToast {}
  class RewardToast extends SimpleToast {
    constructor(text: Component, icon: Icon);

    constructor(title: Component, text: Component, icon: Icon);
    get icon(): Icon;
    get subtitle(): Component;
    get title(): Component;
  }


  interface SelectChoiceRewardScreen extends AbstractButtonListScreen {}
  class SelectChoiceRewardScreen extends AbstractButtonListScreen {
    constructor(choiceReward: ChoiceReward);
    addButtons(panel: Panel): void;
    get theme(): Theme;
  }


  interface SelectQuestObjectScreen<T extends QuestObjectBase = any> extends AbstractButtonListScreen {}
  class SelectQuestObjectScreen<T extends QuestObjectBase = any> extends AbstractButtonListScreen {
    constructor(config: ConfigQuestObject<T>, callback: ConfigCallback);
    addButtons(panel: Panel): void;
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    onClosedByKey(key: Key): boolean;
    onInit(): boolean;
    withFormatter(formatter: Function<T, Component>): SelectQuestObjectScreen<T>;
  }


  interface ToastQuestObject extends SimpleToast {}
  class ToastQuestObject extends SimpleToast {
    constructor(q: QuestObject);
    get icon(): Icon;
    get subtitle(): Component;
    get title(): Component;
    isImportant(): boolean;
    playSound(handler: SoundManager): void;
  }

}

declare module 'dev.ftb.mods.ftbquests.client.gui.quests' {
  import { Button, Panel, Theme, Widget, BaseScreen, ContextMenuItem, WidgetType, ModalPanel, TextField } from 'dev.ftb.mods.ftblibrary.ui';
  import { Quest, ChapterImage, Movable, QuestLink, Chapter, QuestObjectBase, QuestObject } from 'dev.ftb.mods.ftbquests.quest';
  import { MouseButton, Key } from 'dev.ftb.mods.ftblibrary.ui.input';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Optional, Collection, List } from 'java.util';
  import { TooltipList } from 'dev.ftb.mods.ftblibrary.util';
  import { Component } from 'net.minecraft.network.chat';
  import { Position } from 'dev.ftb.mods.ftbquests.client.gui.quests.QuestPositionableButton';
  import { Icon } from 'dev.ftb.mods.ftblibrary.icon';
  import { PositionedIngredient } from 'dev.ftb.mods.ftblibrary.util.client';
  import { KeyReferenceScreen } from 'dev.ftb.mods.ftblibrary.ui.misc';
  import { Consumer } from 'java.util.function';
  import { ClientQuestFile } from 'dev.ftb.mods.ftbquests.client';
  import { PersistedData } from 'dev.ftb.mods.ftbquests.client.gui.quests.QuestScreen';
  import { Runnable } from 'java.lang';
  import { Reward } from 'dev.ftb.mods.ftbquests.quest.reward';
  import { Task, ItemTask } from 'dev.ftb.mods.ftbquests.quest.task';
  import { ItemStack } from 'net.minecraft.world.item';

  interface AddRewardButton extends Button {}
  class AddRewardButton extends Button {
    constructor(panel: Panel, q: Quest);
    drawBackground(matrixStack: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    onClicked(button: MouseButton): void;
  }


  interface AddTaskButton extends Button {}
  class AddTaskButton extends Button {
    constructor(panel: Panel, quest: Quest);
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    onClicked(button: MouseButton): void;
  }


  interface ChapterImageButton extends QuestPositionableButton, Button {}
  class ChapterImageButton extends QuestPositionableButton {
    constructor(panel: Panel, i: ChapterImage);
    addMouseOverText(list: TooltipList): void;
    addMouseOverText(list: TooltipList): void;
    addMouseOverText(list: TooltipList): void;
    checkMouseOver(mouseX: number, mouseY: number): boolean;
    collidesWith(x: number, y: number, w: number, h: number): boolean;
    compareTo(o: Widget): number;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    static get clipboardImage(): Optional<ChapterImage>;
    get name(): Component;
    get position(): Position;
    get title(): Component;
    mousePressed(button: MouseButton): boolean;
    moveAndDeleteFocus(): Movable;
    onClicked(button: MouseButton): void;
  }


  interface ChapterPanel extends Panel {}
  class ChapterPanel extends Panel {
    static readonly ARROW_COLLAPSED: Icon;
    static readonly ARROW_EXPANDED: Icon;
    constructor(panel: Panel);
    addWidgets(): void;
    alignWidgets(): void;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    get x(): number;
    onClosed(): void;
    setExpanded(b: boolean): void;
    shouldDraw(): boolean;
    tick(): void;
    updateMouseOver(mouseX: number, mouseY: number): void;
  }


  interface CollectRewardsButton extends TabButton {}
  class CollectRewardsButton extends TabButton {
    constructor(panel: Panel);
    addMouseOverText(list: TooltipList): void;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    onClicked(button: MouseButton): void;
  }


  interface EmergencyItemsButton extends TabButton {}
  class EmergencyItemsButton extends TabButton {
    constructor(panel: Panel);
    onClicked(button: MouseButton): void;
  }


  interface ExpandChaptersButton extends Widget {}
  class ExpandChaptersButton extends Widget {
    constructor(panel: QuestScreen);
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    updateMouseOver(mouseX: number, mouseY: number): void;
  }


  interface OpenGuidesButton extends TabButton {}
  class OpenGuidesButton extends TabButton {
    constructor(panel: Panel);
    onClicked(button: MouseButton): void;
  }


  interface OpenShopButton extends TabButton {}
  class OpenShopButton extends TabButton {
    constructor(panel: Panel);
    addMouseOverText(list: TooltipList): void;
    onClicked(button: MouseButton): void;
  }


  interface OtherButtonsPanel extends Panel {}
  class OtherButtonsPanel extends Panel {
    constructor(panel: Panel);
  }


  interface OtherButtonsPanelBottom extends OtherButtonsPanel {}
  class OtherButtonsPanelBottom extends OtherButtonsPanel {
    constructor(panel: Panel);
    addWidgets(): void;
    alignWidgets(): void;
  }


  interface OtherButtonsPanelTop extends OtherButtonsPanel {}
  class OtherButtonsPanelTop extends OtherButtonsPanel {
    constructor(panel: Panel);
    addWidgets(): void;
    alignWidgets(): void;
  }


  interface QuestButton extends QuestPositionableButton, Button {}
  class QuestButton extends QuestPositionableButton {
    constructor(panel: Panel, quest: Quest);
    addMouseOverText(list: TooltipList): void;
    checkMouseOver(mouseX: number, mouseY: number): boolean;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    get dependencies(): Collection<QuestButton>;
    get ingredientUnderMouse(): Optional<PositionedIngredient>;
    get position(): Position;
    isEnabled(): boolean;
    moveAndDeleteFocus(): Movable;
    onClicked(button: MouseButton): void;
    shouldDraw(): boolean;
    updateMouseOver(mouseX: number, mouseY: number): void;
  }


  interface QuestKeyReferenceScreen extends KeyReferenceScreen {}
  class QuestKeyReferenceScreen extends KeyReferenceScreen {
    constructor(...translationKeys: string[]);
  }


  interface QuestLinkButton extends QuestButton {}
  class QuestLinkButton extends QuestButton {
    constructor(questPanel: QuestPanel, link: QuestLink, quest: Quest);
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    get position(): Position;
  }


  interface QuestPanel extends Panel {}
  class QuestPanel extends Panel {
    constructor(panel: Panel);
    addWidgets(): void;
    alignWidgets(): void;
    checkMouseOver(mouseX: number, mouseY: number): boolean;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawOffsetBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    keyPressed(key: Key): boolean;
    mousePressed(button: MouseButton): boolean;
    mouseReleased(button: MouseButton): void;
    resetScroll(): void;
    scrollPanel(scroll: number): boolean;
    scrollTo(x: number, y: number): void;
    updateMinMax(): void;
    updateMouseOver(mouseX: number, mouseY: number): void;
    withPreservedPos(r: Consumer<QuestPanel>): void;
  }


  class QuestPositionableButton {
    get position(): Position;
    moveAndDeleteFocus(): Movable;
  }


  interface QuestScreen extends BaseScreen {}
  class QuestScreen extends BaseScreen {
    static readonly Z_LEVEL: number;
    readonly questPanel: QuestPanel;
    readonly otherButtonsBottomPanel: OtherButtonsPanelBottom;
    readonly otherButtonsTopPanel: OtherButtonsPanelTop;
    readonly viewQuestPanel: ViewQuestPanel;
    constructor(clientQuestFile: ClientQuestFile, persistedData: PersistedData);
    addInfoTooltip(list: TooltipList, object: QuestObjectBase): void;
    addMouseOverText(list: TooltipList): void;
    addMouseOverText(list: TooltipList): void;
    addObjectMenuItems(contextMenu: ContextMenuItem[], gui: Runnable, object: QuestObjectBase, deletionFocus: Movable): void;
    addWidgets(): void;
    addZoom(up: number): void;
    alignWidgets(): void;
    closeQuest(): void;
    static displayError(error: Component): void;
    doesGuiPauseGame(): boolean;
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawDefaultBackground(graphics: GuiGraphics): boolean;
    drawForeground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawIcon(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    get maxZLevel(): number;
    get persistedScreenData(): PersistedData;
    get questButtonSize(): number;
    get questButtonSpacing(): number;
    get selectedChapter(): Optional<Chapter>;
    get selectedQuests(): Collection<Quest>;
    get theme(): Theme;
    get viewedQuest(): Quest;
    get zoom(): number;
    handleClick(scheme: string, path: string): boolean;
    initiateMoving(movable: Movable): void;
    isChapterSelected(chapter: Chapter): boolean;
    isViewingQuest(): boolean;
    keyPressed(key: Key): boolean;
    onBack(): void;
    onClicked(button: Button, panel: Panel, mouseButton: MouseButton): void;
    onClosed(): void;
    onInit(): boolean;
    open(object: QuestObject, focus: boolean): void;
    refreshChapterPanel(): void;
    refreshQuestPanel(): void;
    refreshViewQuestPanel(): void;
    scrollTo(movable: Movable): void;
    selectChapter(chapter: Chapter): void;
    tick(): void;
    toggleSelected(movable: Movable): void;
    viewQuest(quest: Quest): void;
  }


  interface RewardButton extends Button {}
  class RewardButton extends Button {
    constructor(panel: Panel, reward: Reward);
    addMouseOverText(list: TooltipList): void;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    get ingredientUnderMouse(): Optional<PositionedIngredient>;
    get title(): Component;
    mousePressed(button: MouseButton): boolean;
    onClicked(button: MouseButton): void;
  }


  interface TabButton extends Button {}
  class TabButton extends Button {
    constructor(panel: Panel, title: Component, icon: Icon);
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
  }


  interface TaskButton extends Button {}
  class TaskButton extends Button {
    constructor(panel: Panel, task: Task);
    addMouseOverText(list: TooltipList): void;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawIcon(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    get ingredientUnderMouse(): Optional<PositionedIngredient>;
    mousePressed(button: MouseButton): boolean;
    onClicked(button: MouseButton): void;
  }


  interface TooltipContextMenuItem extends ContextMenuItem {}
  class TooltipContextMenuItem extends ContextMenuItem {
    constructor(title: Component, icon: Icon, callback: Consumer<Button>, ...tooltips: Component[]);
    addMouseOverText(list: TooltipList): void;
  }


  interface ValidItemsScreen extends BaseScreen {}
  class ValidItemsScreen extends BaseScreen {
    constructor(task: ItemTask, validItems: ItemStack[], canClick: boolean);
    addMouseOverText(list: TooltipList): void;
    addWidgets(): void;
    addWidgets(): void;
    alignWidgets(): void;
    doesGuiPauseGame(): boolean;
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawBackground(matrixStack: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    get theme(): Theme;
    get widgetType(): WidgetType;
    keyPressed(key: Key): boolean;
    onClicked(button: MouseButton): void;
    onClicked(button: MouseButton): void;
    onClosedByKey(key: Key): boolean;
    renderTitleInCenter(): boolean;
    renderTitleInCenter(): boolean;
  }


  interface ViewQuestPanel extends ModalPanel {}
  class ViewQuestPanel extends ModalPanel {
    static readonly PAGEBREAK_ICON: Icon;
    constructor(questScreen: QuestScreen);
    addMouseOverText(list: TooltipList): void;
    addMouseOverText(list: TooltipList): void;
    addWidgets(): void;
    alignWidgets(): void;
    canEdit(): boolean;
    checkMouseOver(mouseX: number, mouseY: number): boolean;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    editDescLine(clickedWidget: Widget, line: number, context: boolean, type: any): void;
    get viewedQuest(): Quest;
    keyReleased(key: Key): void;
    mousePressed(button: MouseButton): boolean;
    mouseScrolled(scroll: number): boolean;
    onClicked(mouseButton: MouseButton): void;
    onClicked(mouseButton: MouseButton): void;
    onClicked(mouseButton: MouseButton): void;
    onClosed(): void;
    resize(theme: Theme): TextField;
    resize(theme: Theme): TextField;
    set viewedQuest(newQuest: Quest);
    tick(): void;
  }

}

declare module 'dev.ftb.mods.ftbquests.client.gui.quests.AddTaskButton' {
  import { TooltipContextMenuItem } from 'dev.ftb.mods.ftbquests.client.gui.quests';
  import { Task } from 'dev.ftb.mods.ftbquests.quest.task';
  import { Consumer } from 'java.util.function';
  import { Button } from 'dev.ftb.mods.ftblibrary.ui';

  interface PasteTaskMenuItem extends TooltipContextMenuItem {}
  class PasteTaskMenuItem extends TooltipContextMenuItem {
    constructor(task: Task, callback: Consumer<Button>);
  }

}

declare module 'dev.ftb.mods.ftbquests.client.gui.quests.ChapterPanel' {
  import { ChapterPanel, QuestScreen } from 'dev.ftb.mods.ftbquests.client.gui.quests';
  import { ClientQuestFile } from 'dev.ftb.mods.ftbquests.client';
  import { MouseButton } from 'dev.ftb.mods.ftblibrary.ui.input';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Theme, Button } from 'dev.ftb.mods.ftblibrary.ui';
  import { TooltipList } from 'dev.ftb.mods.ftblibrary.util';
  import { Chapter, ChapterGroup } from 'dev.ftb.mods.ftbquests.quest';
  import { Component } from 'net.minecraft.network.chat';
  import { Icon } from 'dev.ftb.mods.ftblibrary.icon';
  import { Optional, List } from 'java.util';
  import { PositionedIngredient } from 'dev.ftb.mods.ftblibrary.util.client';

  interface ModpackButton extends ListButton {}
  class ModpackButton extends ListButton {
    constructor(panel: ChapterPanel, f: ClientQuestFile);
    addMouseOverText(list: TooltipList): void;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    getActualWidth(screen: QuestScreen): number;
    onClicked(button: MouseButton): void;
  }


  interface ChapterButton extends ListButton {}
  class ChapterButton extends ListButton {
    constructor(panel: ChapterPanel, c: Chapter);
    addMouseOverText(list: TooltipList): void;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    getActualWidth(screen: QuestScreen): number;
    onClicked(button: MouseButton): void;
  }


  interface ListButton extends Button {}
  class ListButton extends Button {
    readonly chapterPanel: ChapterPanel;
    constructor(panel: ChapterPanel, t: Component, i: Icon);
    addMouseOverText(list: TooltipList): void;
    get ingredientUnderMouse(): Optional<PositionedIngredient>;
    getActualWidth(screen: QuestScreen): number;
  }


  interface ChapterGroupButton extends ListButton {}
  class ChapterGroupButton extends ListButton {
    readonly group: ChapterGroup;
    readonly visibleChapters: List;
    constructor(panel: ChapterPanel, g: ChapterGroup);
    addMouseOverText(list: TooltipList): void;
    draw(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    getActualWidth(screen: QuestScreen): number;
    onClicked(button: MouseButton): void;
  }

}

declare module 'dev.ftb.mods.ftbquests.client.gui.quests.OtherButtonsPanelBottom' {
  import { TabButton } from 'dev.ftb.mods.ftbquests.client.gui.quests';
  import { Panel } from 'dev.ftb.mods.ftblibrary.ui';
  import { MouseButton } from 'dev.ftb.mods.ftblibrary.ui.input';

  interface EditSettingsButton extends TabButton {}
  class EditSettingsButton extends TabButton {
    constructor(panel: Panel);
    onClicked(button: MouseButton): void;
  }


  interface ToggleEditModeButton extends TabButton {}
  class ToggleEditModeButton extends TabButton {
    constructor(panel: Panel);
    onClicked(button: MouseButton): void;
  }

}

declare module 'dev.ftb.mods.ftbquests.client.gui.quests.OtherButtonsPanelTop' {
  import { TabButton } from 'dev.ftb.mods.ftbquests.client.gui.quests';
  import { Panel } from 'dev.ftb.mods.ftblibrary.ui';
  import { MouseButton } from 'dev.ftb.mods.ftblibrary.ui.input';

  interface AutopinButton extends TabButton {}
  class AutopinButton extends TabButton {
    constructor(panel: Panel);
    onClicked(button: MouseButton): void;
  }


  interface WikiButton extends TabButton {}
  class WikiButton extends TabButton {
    constructor(panel: Panel);
    onClicked(button: MouseButton): void;
  }

}

declare module 'dev.ftb.mods.ftbquests.client.gui.quests.QuestScreen' {
  class PersistedData {
  }

}

declare module 'dev.ftb.mods.ftbquests.client.gui.quests.ViewQuestPanel' {
  import { TextField, Panel, SimpleTextButton, Theme } from 'dev.ftb.mods.ftblibrary.ui';
  import { Component } from 'net.minecraft.network.chat';
  import { Quest } from 'dev.ftb.mods.ftbquests.quest';
  import { MouseButton } from 'dev.ftb.mods.ftblibrary.ui.input';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface DisabledButtonTextField extends TextField {}
  class DisabledButtonTextField extends TextField {
    constructor(panel: Panel, text: Component);
  }


  interface OpenInGuideButton extends SimpleTextButton {}
  class OpenInGuideButton extends SimpleTextButton {
    constructor(panel: Panel, q: Quest);
    drawBackground(graphics: GuiGraphics, theme: Theme, x: number, y: number, w: number, h: number): void;
    onClicked(button: MouseButton): void;
  }

}

declare module 'dev.ftb.mods.ftbquests.client.neoforge' {
  import { IDynamicBakedModel } from 'net.neoforged.neoforge.client.model';
  import { List } from 'java.util';
  import { BakedQuad, ItemTransforms, ItemOverrides } from 'net.minecraft.client.renderer.block.model';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Direction } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';
  import { ModelData } from 'net.neoforged.neoforge.client.model.data';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { ChunkRenderTypeSet } from 'net.neoforged.neoforge.client';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { ModifyBakingResult } from 'ModelEvent';

  interface CamouflagingModel extends IDynamicBakedModel {}
  class CamouflagingModel extends IDynamicBakedModel {
    get overrides(): ItemOverrides;
    get particleIcon(): TextureAtlasSprite;
    get transforms(): ItemTransforms;
    getQuads(state: BlockState, side: Direction, rand: RandomSource, modelData: ModelData, renderType: RenderType): BakedQuad[];
    getRenderTypes(state: BlockState, rand: RandomSource, data: ModelData): ChunkRenderTypeSet;
    isCustomRenderer(): boolean;
    isGui3d(): boolean;
    useAmbientOcclusion(): boolean;
    usesBlockLight(): boolean;
  }


  class ModelBakeEventHandler {
    static onModelBake(event: ModifyBakingResult): void;
  }

}

declare module 'dev.ftb.mods.ftbquests.command' {
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { ChangeProgress, QuestObjectBase } from 'dev.ftb.mods.ftbquests.quest';
  import { StringReader, CommandDispatcher } from 'com.mojang.brigadier';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Suggestions, SuggestionsBuilder } from 'com.mojang.brigadier.suggestion';
  import { CommandContext } from 'com.mojang.brigadier.context';
  import { Collection } from 'java.util';
  import { SimpleCommandExceptionType, DynamicCommandExceptionType } from 'com.mojang.brigadier.exceptions';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { Predicate } from 'java.util.function';

  interface ChangeProgressArgument extends ArgumentType<ChangeProgress> {}
  class ChangeProgressArgument extends ArgumentType<ChangeProgress> {
    static changeProgress(): ChangeProgressArgument;
    get examples(): Collection<string>;
    listSuggestions<S>(context: CommandContext<S>, builder: SuggestionsBuilder): CompletableFuture<Suggestions>;
    parse(reader: StringReader): ChangeProgress;
  }


  class FTBQuestsCommands {
    static readonly NO_FILE: SimpleCommandExceptionType;
    static readonly NO_OBJECT: DynamicCommandExceptionType;
    static readonly INVALID_ID: DynamicCommandExceptionType;
    static register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }


  interface QuestObjectArgument extends ArgumentType<QuestObjectBase> {}
  class QuestObjectArgument extends ArgumentType<QuestObjectBase> {
    constructor();

    constructor(filter: Predicate<QuestObjectBase>);
    get examples(): Collection<string>;
    listSuggestions<S>(context: CommandContext<S>, builder: SuggestionsBuilder): CompletableFuture<Suggestions>;
    parse(reader: StringReader): QuestObjectBase;
    static questObject(): QuestObjectArgument;
    static questObject(filter: Predicate<QuestObjectBase>): QuestObjectArgument;
  }

}

declare module 'dev.ftb.mods.ftbquests.events' {
  import { Event } from 'dev.architectury.event';
  import { CustomReward } from 'dev.ftb.mods.ftbquests.quest.reward';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { CustomTask } from 'dev.ftb.mods.ftbquests.quest.task';
  import { Date, List, Collection, Map } from 'java.util';
  import { TeamData, QuestObject } from 'dev.ftb.mods.ftbquests.quest';
  import { ThemeProperty } from 'dev.ftb.mods.ftbquests.quest.theme.property';

  class ClearFileCacheEvent {
    static readonly EVENT: Event;
  }


  class CustomRewardEvent {
    static readonly EVENT: Event;
    constructor(reward: CustomReward, player: ServerPlayer, notify: boolean);
    get notify(): boolean;
    get player(): ServerPlayer;
    get reward(): CustomReward;
  }


  class CustomTaskEvent {
    static readonly EVENT: Event;
    constructor(t: CustomTask);
    get task(): CustomTask;
  }


  interface ObjectCompletedEvent<T extends QuestObject = any> extends ObjectProgressEvent<T> {}
  class ObjectCompletedEvent<T extends QuestObject = any> extends ObjectProgressEvent<T> {
    static readonly GENERIC: Event;
    static readonly FILE: Event;
    static readonly CHAPTER: Event;
    static readonly QUEST: Event;
    static readonly TASK: Event;
  }


  class ObjectProgressEvent<T extends QuestObject = any> {
    get data(): TeamData;
    get notifiedPlayers(): ServerPlayer[];
    get object(): T;
    get onlineMembers(): ServerPlayer[];
    get time(): Date;
    isCancelable(): boolean;
  }


  interface ObjectStartedEvent<T extends QuestObject = any> extends ObjectProgressEvent<T> {}
  class ObjectStartedEvent<T extends QuestObject = any> extends ObjectProgressEvent<T> {
    static readonly GENERIC: Event;
    static readonly FILE: Event;
    static readonly CHAPTER: Event;
    static readonly QUEST: Event;
    static readonly TASK: Event;
  }


  class QuestProgressEventData<T extends QuestObject = any> {
    constructor(date: Date, teamData: TeamData, object: T, online: Collection<ServerPlayer>, notified: Collection<ServerPlayer>);
    get notifiedPlayers(): ServerPlayer[];
    get object(): T;
    get onlineMembers(): ServerPlayer[];
    get teamData(): TeamData;
    get time(): Date;
    notifyPlayers(id: number): void;
    setCompleted(id: number): void;
    setStarted(id: number): void;
    withObject<N extends QuestObject>(o: N): QuestProgressEventData<N>;
  }


  class ThemePropertyEvent {
    static readonly EVENT: Event;
    constructor(m: Map<string, ThemeProperty<any>>);
    register(property: ThemeProperty<any>): void;
  }

}

declare module 'dev.ftb.mods.ftbquests.events.ObjectCompletedEvent' {
  import { ObjectCompletedEvent, QuestProgressEventData } from 'dev.ftb.mods.ftbquests.events';
  import { BaseQuestFile, Chapter, Quest } from 'dev.ftb.mods.ftbquests.quest';
  import { Task } from 'dev.ftb.mods.ftbquests.quest.task';

  interface FileEvent extends ObjectCompletedEvent<BaseQuestFile> {}
  class FileEvent extends ObjectCompletedEvent<BaseQuestFile> {
    constructor(d: QuestProgressEventData<BaseQuestFile>);
    get file(): BaseQuestFile;
  }


  interface ChapterEvent extends ObjectCompletedEvent<Chapter> {}
  class ChapterEvent extends ObjectCompletedEvent<Chapter> {
    constructor(d: QuestProgressEventData<Chapter>);
    get chapter(): Chapter;
  }


  interface QuestEvent extends ObjectCompletedEvent<Quest> {}
  class QuestEvent extends ObjectCompletedEvent<Quest> {
    constructor(d: QuestProgressEventData<Quest>);
    get quest(): Quest;
  }


  interface TaskEvent extends ObjectCompletedEvent<Task> {}
  class TaskEvent extends ObjectCompletedEvent<Task> {
    constructor(d: QuestProgressEventData<Task>);
    get task(): Task;
  }

}

declare module 'dev.ftb.mods.ftbquests.events.ObjectStartedEvent' {
  import { ObjectStartedEvent, QuestProgressEventData } from 'dev.ftb.mods.ftbquests.events';
  import { BaseQuestFile, Chapter, Quest } from 'dev.ftb.mods.ftbquests.quest';
  import { Task } from 'dev.ftb.mods.ftbquests.quest.task';

  interface FileEvent extends ObjectStartedEvent<BaseQuestFile> {}
  class FileEvent extends ObjectStartedEvent<BaseQuestFile> {
    constructor(d: QuestProgressEventData<BaseQuestFile>);
    get file(): BaseQuestFile;
  }


  interface ChapterEvent extends ObjectStartedEvent<Chapter> {}
  class ChapterEvent extends ObjectStartedEvent<Chapter> {
    constructor(d: QuestProgressEventData<Chapter>);
    get chapter(): Chapter;
  }


  interface QuestEvent extends ObjectStartedEvent<Quest> {}
  class QuestEvent extends ObjectStartedEvent<Quest> {
    constructor(d: QuestProgressEventData<Quest>);
    get quest(): Quest;
  }


  interface TaskEvent extends ObjectStartedEvent<Task> {}
  class TaskEvent extends ObjectStartedEvent<Task> {
    constructor(d: QuestProgressEventData<Task>);
    get task(): Task;
  }

}

declare module 'dev.ftb.mods.ftbquests' {
  import { Collection, Optional, List } from 'java.util';
  import { LootCrate } from 'dev.ftb.mods.ftbquests.quest.loot';
  import { Logger } from 'org.apache.logging.log4j';
  import { RecipeModHelper } from 'dev.ftb.mods.ftbquests.integration';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Supplier } from 'java.util.function';
  import { DataComponentType } from 'net.minecraft.core.component';
  import { Enum } from 'java.lang';

  interface FTBQServerProxy extends IQuestProxy {}
  class FTBQServerProxy extends IQuestProxy {
    get knownLootCrates(): Collection<LootCrate>;
  }


  class FTBQuests {
    static readonly LOGGER: Logger;
    static instance: FTBQuests;
    static PROXY: IQuestProxy;
    constructor();
    static get recipeModHelper(): RecipeModHelper;
    static getComponent<T>(stack: ItemStack, componentType: Supplier<DataComponentType<T>>): Optional<T>;
    static getComponent<T>(stack: ItemStack, componentType: DataComponentType<T>): Optional<T>;
    static set recipeModHelper(recipeModHelper: RecipeModHelper);
    setup(): void;
  }


  interface FTBQuestsEventHandler extends Enum<FTBQuestsEventHandler> {}
  class FTBQuestsEventHandler extends Enum<FTBQuestsEventHandler> {
    static readonly INSTANCE: FTBQuestsEventHandler;
    static valueOf(name: string): FTBQuestsEventHandler;
    static values(): FTBQuestsEventHandler[];
  }


  class IQuestProxy {
    get knownLootCrates(): Collection<LootCrate>;
  }

}

declare module 'dev.ftb.mods.ftbquests.integration.item_filtering' {
  import { List, Optional, Collection } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ItemFilterAdapter } from 'dev.ftb.mods.ftbquests.api';
  import { Provider } from 'HolderLookup';
  import { Enum } from 'java.lang';
  import { ComponentMatchType } from 'dev.ftb.mods.ftbquests.integration.item_filtering.ItemMatchingSystem';

  class DisplayStacksCache {
    static clear(): void;
    static getCachedDisplayStacks(filterStack: ItemStack, adapter: ItemFilterAdapter, registryAccess: Provider): ItemStack[];
  }


  interface ItemMatchingSystem extends Enum<ItemMatchingSystem> {}
  class ItemMatchingSystem extends Enum<ItemMatchingSystem> {
    static readonly INSTANCE: ItemMatchingSystem;
    adapters(): Collection<ItemFilterAdapter>;
    doesItemMatch(filterStack: ItemStack, toCheck: ItemStack, matchType: ComponentMatchType, registryAccess: Provider): boolean;
    getAllMatchingStacks(filterStack: ItemStack, registryAccess: Provider): ItemStack[];
    getFilterAdapter(stack: ItemStack): Optional<ItemFilterAdapter>;
    isItemFilter(stack: ItemStack): boolean;
    registerFilterAdapter(adapter: ItemFilterAdapter): void;
    static valueOf(name: string): ItemMatchingSystem;
    static values(): ItemMatchingSystem[];
  }

}

declare module 'dev.ftb.mods.ftbquests.integration.item_filtering.ItemMatchingSystem' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ComponentMatchType extends Enum<ComponentMatchType> {}
  class ComponentMatchType extends Enum<ComponentMatchType> {
    static readonly NONE: ComponentMatchType;
    static readonly FUZZY: ComponentMatchType;
    static readonly STRICT: ComponentMatchType;
    static valueOf(name: string): ComponentMatchType;
    static values(): ComponentMatchType[];
  }

}

declare module 'dev.ftb.mods.ftbquests.integration' {
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Components } from 'dev.ftb.mods.ftbquests.integration.RecipeModHelper';
  import { QuestObjectBase } from 'dev.ftb.mods.ftbquests.quest';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Collection } from 'java.util';

  class PermissionsHelper {
    static readonly EDITOR_PERM: string;
    static hasEditorPermission(player: ServerPlayer, def: boolean): boolean;
  }


  class RecipeModHelper {
    get helperName(): string;
    isRecipeModAvailable(): boolean;
    refreshAll(var1: Components): void;
    refreshRecipes(var1: QuestObjectBase): void;
    showRecipes(var1: ItemStack): void;
    updateItemsDynamic(toRemove: Collection<ItemStack>, toAdd: Collection<ItemStack>): void;
  }

}

declare module 'dev.ftb.mods.ftbquests.integration.RecipeModHelper' {
  import { RecipeModHelper } from 'dev.ftb.mods.ftbquests.integration';
  import { QuestObjectBase } from 'dev.ftb.mods.ftbquests.quest';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface NoOp extends RecipeModHelper {}
  class NoOp extends RecipeModHelper {
    get helperName(): string;
    refreshAll(component: Components): void;
    refreshRecipes(object: QuestObjectBase): void;
    showRecipes(object: ItemStack): void;
  }


  interface Components extends Enum<Components> {}
  class Components extends Enum<Components> {
    static readonly QUESTS: Components;
    static readonly LOOT_CRATES: Components;
    static valueOf(name: string): Components;
    static values(): Components[];
  }

}

declare module 'dev.ftb.mods.ftbquests.item' {
  import { Item, ItemStack, TooltipFlag, BlockItem } from 'net.minecraft.world.item';
  import { InteractionResultHolder, InteractionHand, InteractionResult } from 'net.minecraft.world';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { TooltipContext } from 'Item';
  import { List, Optional } from 'java.util';
  import { Icon } from 'dev.ftb.mods.ftblibrary.icon';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { EntityType } from 'net.minecraft.world.entity';
  import { LootCrate } from 'dev.ftb.mods.ftbquests.quest.loot';
  import { Block } from 'net.minecraft.world.level.block';
  import { ScreenSize } from 'dev.ftb.mods.ftbquests.item.ScreenBlockItem';
  import { UseOnContext } from 'net.minecraft.world.item.context';
  import { BlockPos, GlobalPos } from 'net.minecraft.core';

  interface CustomIconItem extends Item {}
  class CustomIconItem extends Item {
    constructor();
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    static getIcon(stack: ItemStack): Icon;
    getName(stack: ItemStack): Component;
    static setFaceIcon(stack: ItemStack, value: ResourceLocation): void;
    static setFaceIcon(stack: ItemStack, value: EntityType<any>): void;
    static setIcon(stack: ItemStack, texture: ResourceLocation): void;
    use(level: Level, player: Player, interactionHand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface LootCrateItem extends Item {}
  class LootCrateItem extends Item {
    constructor();
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flag: TooltipFlag): void;
    static getCrate(stack: ItemStack, isClientSide: boolean): LootCrate;
    static getCrate(stack: ItemStack): LootCrate;
    getName(stack: ItemStack): Component;
    isFoil(stack: ItemStack): boolean;
    use(world: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface MissingItem extends Item {}
  class MissingItem extends Item {
    constructor();
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    getName(stack: ItemStack): Component;
  }


  interface QuestBarrierBlockItem extends BlockItem {}
  class QuestBarrierBlockItem extends BlockItem {
    constructor();
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flag: TooltipFlag): void;
  }


  interface QuestBookItem extends Item {}
  class QuestBookItem extends Item {
    constructor();
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    use(world: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface ScreenBlockItem extends BlockItem {}
  class ScreenBlockItem extends BlockItem {
    constructor(block: Block, size: ScreenSize);
    static getSize(stack: ItemStack): number;
  }


  interface StageBarrierBlockItem extends BlockItem {}
  class StageBarrierBlockItem extends BlockItem {
    constructor();
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flag: TooltipFlag): void;
  }


  interface TaskScreenConfiguratorItem extends Item {}
  class TaskScreenConfiguratorItem extends Item {
    constructor();
    appendHoverText(itemStack: ItemStack, context: TooltipContext, list: Component[], tooltipFlag: TooltipFlag): void;
    static readBlockPos(stack: ItemStack): Optional<GlobalPos>;
    static storeBlockPos(stack: ItemStack, level: Level, clickedPos: BlockPos): void;
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
    useOn(ctx: UseOnContext): InteractionResult;
  }

}

declare module 'dev.ftb.mods.ftbquests.item.ScreenBlockItem' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ScreenSize extends Enum<ScreenSize> {}
  class ScreenSize extends Enum<ScreenSize> {
    static readonly ONE_X_ONE: ScreenSize;
    static readonly THREE_X_THREE: ScreenSize;
    static readonly FIVE_X_FIVE: ScreenSize;
    static readonly SEVEN_X_SEVEN: ScreenSize;
    get size(): number;
    static valueOf(name: string): ScreenSize;
    static values(): ScreenSize[];
  }

}

declare module 'dev.ftb.mods.ftbquests.mixin' {
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { ServerboundClientInformationPacket } from 'net.minecraft.network.protocol.common';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  class ServerGamePacketListenerImplMixin {
    player: ServerPlayer;
    handleClientInformation(packet: ServerboundClientInformationPacket, ci: CallbackInfo): void;
  }

}

declare module 'dev.ftb.mods.ftbquests.neoforge' {
  import { IEventBus } from 'net.neoforged.bus.api';
  import { RegisterCapabilitiesEvent } from 'net.neoforged.neoforge.capabilities';
  import { TaskScreenRenderer } from 'dev.ftb.mods.ftbquests.client';
  import { Context } from 'BlockEntityRendererProvider';
  import { AABB } from 'net.minecraft.world.phys';
  import { TaskScreenBlockEntity } from 'dev.ftb.mods.ftbquests.block.entity';

  class ArgumentTypes {
  }


  class ClientSetup {
    static init(modEventBus: IEventBus): void;
  }


  class FTBQuestsNeoForge {
    constructor(modEventBus: IEventBus);
    static registerCaps(event: RegisterCapabilitiesEvent): void;
  }


  interface NeoForgeTaskScreenRenderer extends TaskScreenRenderer {}
  class NeoForgeTaskScreenRenderer extends TaskScreenRenderer {
    constructor(context: Context);
    getRenderBoundingBox(blockEntity: TaskScreenBlockEntity): AABB;
  }

}

declare module 'dev.ftb.mods.ftbquests.net.BlockConfigRequestMessage' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface BlockType extends Enum<BlockType> {}
  class BlockType extends Enum<BlockType> {
    static readonly TASK_SCREEN: BlockType;
    static readonly BARRIER: BlockType;
    static valueOf(name: string): BlockType;
    static values(): BlockType[];
  }

}

declare module 'dev.ftb.mods.ftbquests.net' {
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { PacketContext } from 'NetworkManager';
  import { MinecraftServer } from 'net.minecraft.server';

  interface ClaimAllRewardsMessage extends CustomPacketPayload {}
  class ClaimAllRewardsMessage extends CustomPacketPayload {
    static readonly TYPE: Type;
    static readonly INSTANCE: ClaimAllRewardsMessage;
    static readonly STREAM_CODEC: StreamCodec;
    static handle(message: ClaimAllRewardsMessage, context: PacketContext): void;
    type(): Type<ClaimAllRewardsMessage>;
  }


  interface ClearDisplayCacheMessage extends CustomPacketPayload {}
  class ClearDisplayCacheMessage extends CustomPacketPayload {
    static readonly TYPE: Type;
    static readonly STREAM_CODEC: StreamCodec;
    static clearForAll(server: MinecraftServer): void;
    static handle(message: ClearDisplayCacheMessage, context: PacketContext): void;
    type(): Type<ClearDisplayCacheMessage>;
  }


  interface ForceSaveMessage extends CustomPacketPayload {}
  class ForceSaveMessage extends CustomPacketPayload {
    static readonly TYPE: Type;
    static readonly INSTANCE: ForceSaveMessage;
    static readonly STREAM_CODEC: StreamCodec;
    static handle(message: ForceSaveMessage, context: PacketContext): void;
    type(): Type<ForceSaveMessage>;
  }


  class FTBQuestsNetHandler {
    static init(): void;
  }

}

declare module 'dev.ftb.mods.ftbquests.quest' {
  import { Enum, RuntimeException, Integer, Comparable, Long, Runnable } from 'java.lang';
  import { List, Optional, Collection, UUID, Comparator, Set, Map, Date } from 'java.util';
  import { CompoundTag, Tag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { RegistryFriendlyByteBuf, FriendlyByteBuf } from 'net.minecraft.network';
  import { QuestProgressEventData } from 'dev.ftb.mods.ftbquests.events';
  import { MutableComponent, Component } from 'net.minecraft.network.chat';
  import { Icon, Color4I, ImageIcon } from 'dev.ftb.mods.ftblibrary.icon';
  import { ConfigGroup, Tristate, ConfigCallback, NameMap } from 'dev.ftb.mods.ftblibrary.config';
  import { WeakReference } from 'java.lang.ref';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { TooltipList } from 'dev.ftb.mods.ftblibrary.util';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Task } from 'dev.ftb.mods.ftbquests.quest.task';
  import { Reward, RewardClaimType } from 'dev.ftb.mods.ftbquests.quest.reward';
  import { ProgressChange } from 'dev.ftb.mods.ftbquests.util';
  import { Widget } from 'dev.ftb.mods.ftblibrary.ui';
  import { MouseButton } from 'dev.ftb.mods.ftblibrary.ui.input';
  import { Components } from 'dev.ftb.mods.ftbquests.integration.RecipeModHelper';
  import { Stream } from 'java.util.stream';
  import { Pair } from 'com.mojang.datafixers.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { TranslationKey } from 'dev.ftb.mods.ftbquests.quest.translation';
  import { Consumer, Supplier } from 'java.util.function';
  import { ChatFormatting } from 'net.minecraft';
  import { PixelBuffer } from 'dev.ftb.mods.ftblibrary.math';
  import { LevelResource } from 'net.minecraft.world.level.storage';
  import { MinecraftServer } from 'net.minecraft.server';
  import { Env } from 'dev.architectury.utils';
  import { Path } from 'java.nio.file';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { PlayerLoggedInAfterTeamEvent, TeamCreatedEvent, PlayerChangedTeamEvent } from 'dev.ftb.mods.ftbteams.api.event';
  import { Player } from 'net.minecraft.world.entity.player';
  import { SNBTCompoundTag } from 'dev.ftb.mods.ftblibrary.snbt';
  import { LongSet } from 'it.unimi.dsi.fastutil.longs';

  interface ChangeProgress extends Enum<ChangeProgress> {}
  class ChangeProgress extends Enum<ChangeProgress> {
    static readonly RESET: ChangeProgress;
    static readonly COMPLETE: ChangeProgress;
    static valueOf(name: string): ChangeProgress;
    static values(): ChangeProgress[];
  }


  interface Chapter extends QuestObject {}
  class Chapter extends QuestObject {
    readonly file: BaseQuestFile;
    constructor(id: number, file: BaseQuestFile, group: ChapterGroup);

    constructor(id: number, file: BaseQuestFile, group: ChapterGroup, filename: string);
    addImage(image: ChapterImage): void;
    addQuest(quest: Quest): void;
    addQuestLink(link: QuestLink): void;
    clearCachedData(): void;
    consumeItems(): boolean;
    deleteChildren(): void;
    deleteSelf(): void;
    fillConfigGroup(config: ConfigGroup): void;
    get altIcon(): Icon;
    get altTitle(): MutableComponent;
    get autofocus(): Optional<Movable>;
    get children(): Collection<QuestObject>;
    get defaultMinWidth(): number;
    get defaultQuestShape(): string;
    get defaultQuestSize(): number;
    get filename(): string;
    get group(): ChapterGroup;
    get images(): ChapterImage[];
    get index(): number;
    get objectType(): QuestObjectType;
    get path(): Optional<string>;
    get progressionMode(): ProgressionMode;
    get questChapter(): Chapter;
    get questFile(): BaseQuestFile;
    get questLinks(): QuestLink[];
    get quests(): Quest[];
    get rawSubtitle(): string[];
    getRelativeProgressFromChildren(data: TeamData): number;
    static getRelativeProgressFromChildren(progressSum: number, count: number): number;
    hasAnyVisibleChildren(): boolean;
    hasGroup(): boolean;
    hasUnclaimedRewardsRaw(teamData: TeamData, player: UUID): boolean;
    hideQuestDetailsUntilStartable(): boolean;
    hideQuestUntilDepsComplete(): boolean;
    isAlwaysInvisible(): boolean;
    isAutofocus(id: number): boolean;
    isDefaultRepeatable(): boolean;
    isHideQuestUntilDepsVisible(): boolean;
    isHideTextUntilComplete(): boolean;
    isRequireSequentialTasks(): boolean;
    isVisible(data: TeamData): boolean;
    onCompleted(data: QuestProgressEventData<any>): void;
    onCreated(): void;
    onStarted(data: QuestProgressEventData<any>): void;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    removeImage(image: ChapterImage): void;
    removeQuest(quest: Quest): void;
    removeQuestLink(link: QuestLink): void;
    set autofocus(id: number);
    set defaultQuestShape(defaultQuestShape: string);
    set rawSubtitle(rawSubtitle: string[]);
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }


  interface ChapterGroup extends QuestObject {}
  class ChapterGroup extends QuestObject {
    constructor(id: number, file: BaseQuestFile);
    addChapter(chapter: Chapter): void;
    clearCachedData(): void;
    clearChapters(): void;
    deleteSelf(): void;
    editedFromGUI(): void;
    fillConfigGroup(config: ConfigGroup): void;
    get altIcon(): Icon;
    get altTitle(): Component;
    get chapters(): Chapter[];
    get children(): Collection<QuestObject>;
    get file(): BaseQuestFile;
    get objectType(): QuestObjectType;
    get questFile(): BaseQuestFile;
    getFirstVisibleChapter(data: TeamData): Chapter;
    getRelativeProgressFromChildren(data: TeamData): number;
    static getRelativeProgressFromChildren(progressSum: number, count: number): number;
    getVisibleChapters(data: TeamData): Chapter[];
    hasUnclaimedRewardsRaw(teamData: TeamData, player: UUID): boolean;
    isDefaultGroup(): boolean;
    isFirstGroup(): boolean;
    isGuiCollapsed(): boolean;
    isLastGroup(): boolean;
    isVisible(data: TeamData): boolean;
    moveChapterWithinGroup(chapter: Chapter, movingUp: boolean): boolean;
    onCompleted(data: QuestProgressEventData<any>): void;
    onCreated(): void;
    removeChapter(chapter: Chapter): void;
    sortChapters(c: Comparator<Chapter>): void;
    toggleCollapsed(): void;
  }


  interface ChapterImage extends Movable {}
  class ChapterImage extends Movable {
    static readonly FTBQ_IMAGE: string;
    static clipboard: WeakReference;
    static STREAM_CODEC: StreamCodec;
    constructor(c: Chapter);
    addHoverText(list: TooltipList): void;
    copy(newChapter: Chapter, newX: number, newY: number): ChapterImage;
    copyToClipboard(): void;
    drawMoved(graphics: GuiGraphics): void;
    fillConfigGroup(config: ConfigGroup): void;
    fixupAspectRatio(adjustWidth: boolean): void;
    static fromNet(parent: Chapter, buf: FriendlyByteBuf): ChapterImage;
    get alpha(): number;
    get chapter(): Chapter;
    get click(): string;
    get color(): Color4I;
    get height(): number;
    get image(): Icon;
    get movableID(): number;
    get order(): number;
    get rotation(): number;
    get shape(): string;
    get title(): Component;
    get width(): number;
    get x(): number;
    get y(): number;
    initiateMoveClientSide(to: Chapter, _x: number, _y: number): void;
    isAlignToCorner(): boolean;
    isAspectRatioOff(): boolean;
    static isImageInClipboard(): boolean;
    onMoved(x: number, y: number, chapterId: number): void;
    readData(nbt: CompoundTag): void;
    readNetData(buffer: FriendlyByteBuf): void;
    set image(image: Icon);
    setPosition(x: number, y: number): ChapterImage;
    shouldShowImage(teamData: TeamData): boolean;
    writeData(nbt: CompoundTag): CompoundTag;
    writeNetData(buffer: FriendlyByteBuf): void;
  }


  interface DefaultChapterGroup extends ChapterGroup {}
  class DefaultChapterGroup extends ChapterGroup {
    constructor(f: BaseQuestFile);
    get altIcon(): Icon;
    get altTitle(): Component;
  }


  interface DependencyDepthException extends RuntimeException {}
  class DependencyDepthException extends RuntimeException {
    readonly object: QuestObject;
    constructor(o: QuestObject);
  }


  interface DependencyLoopException extends RuntimeException {}
  class DependencyLoopException extends RuntimeException {
    readonly object: QuestObject;
    constructor(o: QuestObject);
  }


  interface DependencyRequirement extends Enum<DependencyRequirement> {}
  class DependencyRequirement extends Enum<DependencyRequirement> {
    static readonly ALL_COMPLETED: DependencyRequirement;
    static readonly ONE_COMPLETED: DependencyRequirement;
    static readonly ALL_STARTED: DependencyRequirement;
    static readonly ONE_STARTED: DependencyRequirement;
    get id(): string;
    needCompletion(): boolean;
    needOnlyOne(): boolean;
    static valueOf(name: string): DependencyRequirement;
    static values(): DependencyRequirement[];
  }


  class Excludable {
    get id(): number;
    isQuestObjectExcluded(var1: TeamData): boolean;
  }


  class Movable {
    copyToClipboard(): void;
    drawMoved(graphics: GuiGraphics): void;
    get chapter(): Chapter;
    get height(): number;
    get movableID(): number;
    get rotation(): number;
    get shape(): string;
    get title(): Component;
    get width(): number;
    get x(): number;
    get y(): number;
    initiateMoveClientSide(var1: Chapter, var2: number, var4: number): void;
    isAlignToCorner(): boolean;
    onMoved(var1: number, var3: number, var5: number): void;
  }


  interface ProgressionMode extends Enum<ProgressionMode> {}
  class ProgressionMode extends Enum<ProgressionMode> {
    static readonly DEFAULT: ProgressionMode;
    static readonly LINEAR: ProgressionMode;
    static readonly FLEXIBLE: ProgressionMode;
    get id(): string;
    static valueOf(name: string): ProgressionMode;
    static values(): ProgressionMode[];
  }


  interface Quest extends Movable, Excludable, QuestObject {}
  class Quest extends Movable {
    static readonly PAGEBREAK_CODE: string;
    constructor(id: number, chapter: Chapter);
    addDependency(object: QuestObject): void;
    addReward(reward: Reward): void;
    addTask(task: Task): void;
    allTasksCompleted(teamData: TeamData): boolean;
    areDependenciesComplete(teamData: TeamData): boolean;
    areDependenciesVisible(teamData: TeamData): boolean;
    buildDescriptionIndex(): Pair<number, number>[];
    canBeRepeated(): boolean;
    clearCachedData(): void;
    clearDependencies(): void;
    componentsToRefresh(): Set<Components>;
    copyToClipboard(): void;
    deleteChildren(): void;
    deleteSelf(): void;
    editedFromGUI(): void;
    fillConfigGroup(config: ConfigGroup): void;
    forceProgress(teamData: TeamData, progressChange: ProgressChange): void;
    get altIcon(): Icon;
    get altTitle(): Component;
    get chapter(): Chapter;
    get children(): Collection<QuestObject>;
    get dependants(): Collection<QuestObject>;
    get description(): Component[];
    get guidePage(): string;
    get height(): number;
    get hideTextUntilComplete(): Tristate;
    get iconScale(): number;
    get minRequiredDependencies(): number;
    get minWidth(): number;
    get movableID(): number;
    get objectType(): QuestObjectType;
    get parentID(): number;
    get progressionMode(): ProgressionMode;
    get questChapter(): Chapter;
    get questFile(): BaseQuestFile;
    get rawDescription(): string[];
    get rawSubtitle(): string;
    get relatedQuest(): Quest;
    get repeatCooldown(): number;
    get requireSequentialTasks(): boolean;
    get rewards(): Collection<Reward>;
    get shape(): string;
    get size(): number;
    get subtitle(): Component;
    get tasks(): Collection<Task>;
    get tasksAsList(): Task[];
    get width(): number;
    get x(): number;
    get y(): number;
    getRelativeProgressFromChildren(data: TeamData): number;
    static getRelativeProgressFromChildren(progressSum: number, count: number): number;
    hasDependencies(): boolean;
    hasDependency(object: QuestObject): boolean;
    hasUnclaimedRewardsRaw(teamData: TeamData, player: UUID): boolean;
    hideDetailsUntilStartable(): boolean;
    ignoreRewardBlocking(): boolean;
    initiateMoveClientSide(to: Chapter, x: number, y: number): void;
    isCompletedRaw(data: TeamData): boolean;
    isExclusiveQuest(): boolean;
    isOptional(): boolean;
    isOptionalForProgression(teamData: TeamData): boolean;
    isQuestObjectExcluded(teamData: TeamData): boolean;
    isSearchable(data: TeamData): boolean;
    isVisible(data: TeamData): boolean;
    moveRewardLeft(reward: Reward): void;
    moveRewardRight(reward: Reward): void;
    moveTaskLeft(task: Task): void;
    moveTaskRight(task: Task): void;
    onClicked(clicked: Widget, button: MouseButton, callback: ConfigCallback): void;
    onCompleted(data: QuestProgressEventData<any>): void;
    onCreated(): void;
    onMoved(newX: number, newY: number, newChapterId: number): void;
    onStarted(data: QuestProgressEventData<any>): void;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    removeDependency(object: QuestObject): void;
    removeInvalidDependencies(): void;
    removeReward(reward: Reward): void;
    removeTask(task: Task): void;
    resetProgressIfRepeatable(data: TeamData, player: UUID): boolean;
    set rawDescription(rawDescription: string[]);
    set rawSubtitle(rawSubtitle: string);
    set size(size: number);
    set x(x: number);
    set y(y: number);
    setRewardList(rewards: Reward[]): void;
    setTaskList(tasks: Task[]): void;
    shouldHideDependencyLines(): boolean;
    shouldHideDependentLines(): boolean;
    shouldHideLockIcon(): boolean;
    showInRecipeMod(): boolean;
    streamDependencies(): Stream<QuestObject>;
    verifyDependencies(autofix: boolean): boolean;
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
    writeRewards(tag: CompoundTag, provider: Provider): void;
    writeTasks(tag: CompoundTag, provider: Provider): void;
  }


  interface QuestLink extends Movable, Excludable, QuestObject {}
  class QuestLink extends Movable {
    constructor(id: number, chapter: Chapter, linkId: number);
    copyToClipboard(): void;
    deleteSelf(): void;
    editedFromGUI(): void;
    fillConfigGroup(config: ConfigGroup): void;
    get altIcon(): Icon;
    get altTitle(): Component;
    get chapter(): Chapter;
    get height(): number;
    get movableID(): number;
    get objectType(): QuestObjectType;
    get parentID(): number;
    get quest(): Optional<Quest>;
    get questFile(): BaseQuestFile;
    get relatedQuest(): Quest;
    get shape(): string;
    get width(): number;
    get x(): number;
    get y(): number;
    getRelativeProgressFromChildren(data: TeamData): number;
    static getRelativeProgressFromChildren(progressSum: number, count: number): number;
    initiateMoveClientSide(to: Chapter, x: number, y: number): void;
    isQuestObjectExcluded(teamData: TeamData): boolean;
    isVisible(data: TeamData): boolean;
    linksTo(quest: Quest): boolean;
    onCreated(): void;
    onMoved(newX: number, newY: number, newChapterId: number): void;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    setPosition(qx: number, qy: number): void;
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }


  interface QuestObject extends QuestObjectBase {}
  class QuestObject extends QuestObjectBase {
    constructor(id: number);
    cacheProgress(): boolean;
    fillConfigGroup(config: ConfigGroup): void;
    forceProgress(teamData: TeamData, progressChange: ProgressChange): void;
    get children(): Collection<QuestObject>;
    get relatedQuest(): Quest;
    getProgressColor(data: TeamData): Color4I;
    getProgressColor(data: TeamData, dim: boolean): Color4I;
    getRelativeProgressFromChildren(var1: TeamData): number;
    static getRelativeProgressFromChildren(progressSum: number, count: number): number;
    hasUnclaimedRewardsRaw(teamData: TeamData, player: UUID): boolean;
    isCompletedRaw(data: TeamData): boolean;
    isOptionalForProgression(teamData: TeamData): boolean;
    isSearchable(data: TeamData): boolean;
    isVisible(data: TeamData): boolean;
    onCompleted(data: QuestProgressEventData<any>): void;
    onStarted(data: QuestProgressEventData<any>): void;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }


  interface QuestObjectBase extends Comparable<QuestObjectBase> {}
  class QuestObjectBase extends Comparable<QuestObjectBase> {
    readonly id: number;
    constructor(id: number);
    clearCachedData(): void;
    compareTo(other: QuestObjectBase): number;
    componentsToRefresh(): Set<Components>;
    static copy<T extends QuestObjectBase>(orig: T, factory: Supplier<T>): T;
    createSubGroup(group: ConfigGroup): ConfigGroup;
    deleteChildren(): void;
    deleteSelf(): void;
    editedFromGUI(): void;
    editedFromGUIOnServer(): void;
    equals(object: any): boolean;
    fillConfigGroup(config: ConfigGroup): void;
    forceProgress(teamData: TeamData, progressChange: ProgressChange): void;
    forceProgressRaw(teamData: TeamData, progressChange: ProgressChange): void;
    get altIcon(): Icon;
    get altTitle(): Component;
    get codeString(): string;
    get icon(): Icon;
    get id(): number;
    get mutableTitle(): MutableComponent;
    get name(): Component;
    get objectType(): QuestObjectType;
    get parentID(): number;
    get path(): Optional<string>;
    get questChapter(): Chapter;
    get questFile(): BaseQuestFile;
    get rawTitle(): string;
    get tags(): Set<string>;
    get title(): Component;
    get title(): Component;
    static getCodeString(id: number): string;
    static getCodeString(object: QuestObjectBase): string;
    static getID(object: QuestObjectBase): number;
    getProtoTranslation(key: TranslationKey): string;
    hasTag(tag: string): boolean;
    hashCode(): number;
    holderLookup(): Provider;
    static isNull(object: QuestObjectBase): boolean;
    isValid(): boolean;
    static itemOrMissingFromNBT(tag: Tag, provider: Provider): ItemStack;
    modifyTranslatableListValue(translationKey: TranslationKey, setter: Consumer<string[]>): void;
    onCreated(): void;
    onEditButtonClicked(gui: Runnable): void;
    static parseCodeString(id: string): number;
    static parseHexId(id: string): Optional<Long>;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    set rawTitle(rawTitle: string);
    setRawIcon(rawIcon: ItemStack): void;
    static shouldSendNotifications(): boolean;
    static singleItemOrMissingFromNBT(tag: Tag, provider: Provider): ItemStack;
    static titleToID(s: string): Optional<string>;
    toString(): string;
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }


  interface QuestObjectType extends Enum<QuestObjectType> {}
  class QuestObjectType extends Enum<QuestObjectType> {
    static readonly NULL: QuestObjectType;
    static readonly FILE: QuestObjectType;
    static readonly CHAPTER: QuestObjectType;
    static readonly QUEST: QuestObjectType;
    static readonly TASK: QuestObjectType;
    static readonly REWARD: QuestObjectType;
    static readonly REWARD_TABLE: QuestObjectType;
    static readonly CHAPTER_GROUP: QuestObjectType;
    static readonly QUEST_LINK: QuestObjectType;
    decode(buf: FriendlyByteBuf): QuestObjectType;
    encode(buf: FriendlyByteBuf, type: QuestObjectType): void;
    get color(): ChatFormatting;
    get completedMessage(): Component;
    get id(): string;
    test(object: QuestObjectBase): boolean;
    static valueOf(name: string): QuestObjectType;
    static values(): QuestObjectType[];
  }


  interface QuestShape extends Icon {}
  class QuestShape extends Icon {
    static idMap: NameMap;
    static idMapWithDefault: NameMap;
    constructor(id: string);
    draw(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    equals(o: any): boolean;
    static get(id: string): QuestShape;
    get background(): ImageIcon;
    get outline(): ImageIcon;
    get shape(): ImageIcon;
    get shapePixels(): PixelBuffer;
    hashCode(): number;
    static map(): Map<string, QuestShape>;
    static reload(list: string[]): void;
    shouldDraw(): boolean;
    toString(): string;
  }


  interface ServerQuestFile extends BaseQuestFile {}
  class ServerQuestFile extends BaseQuestFile {
    static readonly FTBQUESTS_DATA: LevelResource;
    static INSTANCE: ServerQuestFile;
    readonly server: MinecraftServer;
    constructor(s: MinecraftServer);
    deleteObject(id: number): void;
    get currentPlayer(): ServerPlayer;
    get folder(): Path;
    get locale(): string;
    get side(): Env;
    holderLookup(): Provider;
    isLoading(): boolean;
    isPlayerOnTeam(player: Player, teamData: TeamData): boolean;
    load(): void;
    load(quests: boolean, progression: boolean): void;
    markDirty(): void;
    moveChapterGroup(id: number, movingUp: boolean): boolean;
    playerChangedTeam(event: PlayerChangedTeamEvent): void;
    playerLoggedIn(event: PlayerLoggedInAfterTeamEvent): void;
    saveNow(): void;
    teamCreated(event: TeamCreatedEvent): void;
    unload(): void;
    withPlayerContext(player: ServerPlayer, toDo: Runnable): void;
  }


  class TeamData {
    static readonly VERSION: number;
    static readonly AUTO_PIN_ID: number;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(teamId: UUID, file: BaseQuestFile);

    constructor(teamId: UUID, file: BaseQuestFile, name: string);
    addProgress(task: Task, progress: number): void;
    areDependenciesComplete(quest: Quest): boolean;
    areDependenciesVisible(quest: Quest): boolean;
    areRewardsBlocked(): boolean;
    canStartTasks(quest: Quest): boolean;
    checkAutoCompletion(quest: Quest): void;
    claimReward(player: ServerPlayer, reward: Reward, notify: boolean, when: number): void;
    claimReward(player: ServerPlayer, reward: Reward, notify: boolean): void;
    clearCachedProgress(): void;
    clearRepeatCooldown(q: Quest): void;
    copyData(from: TeamData): void;
    deleteReward(reward: Reward): void;
    deserializeNBT(nbt: SNBTCompoundTag): void;
    static get(player: Player): TeamData;
    get file(): BaseQuestFile;
    get name(): string;
    get onlineMembers(): Collection<ServerPlayer>;
    get teamId(): UUID;
    getCanEdit(player: Player): boolean;
    getCannotStartReason(quest: Quest): Component;
    getClaimType(player: UUID, reward: Reward): RewardClaimType;
    getCompletedTime(questId: number): Optional<Date>;
    getCompletionCount(quest: Quest): number;
    getMilliSecondsUntilRepeatable(quest: Quest): number;
    getPinnedQuestIds(player: Player): LongSet;
    getProgress(taskId: number): number;
    getProgress(task: Task): number;
    getRelativeProgress(object: QuestObject): number;
    getRewardClaimTime(player: UUID, reward: Reward): Optional<Date>;
    getStartedTime(questId: number): Optional<Date>;
    hasUnclaimedRewards(player: UUID, object: QuestObject): boolean;
    isCompleted(object: QuestObject): boolean;
    isExcludedByOtherQuestline(qo: QuestObject): boolean;
    isLocked(): boolean;
    isQuestPinned(player: Player, id: number): boolean;
    isRewardBlocked(reward: Reward): boolean;
    isRewardClaimed(player: UUID, reward: Reward): boolean;
    isStarted(object: QuestObject): boolean;
    markDirty(): void;
    markRewardAsClaimed(player: UUID, reward: Reward, date: number): boolean;
    markTaskCompleted(task: Task): void;
    mergeClaimedRewards(from: TeamData): void;
    mergeData(from: TeamData): void;
    resetProgress(task: Task): void;
    resetReward(player: UUID, reward: Reward): boolean;
    saveIfChanged(): void;
    serializeNBT(): SNBTCompoundTag;
    set name(name: string);
    setCanEdit(player: Player, newCanEdit: boolean): boolean;
    setCompleted(id: number, time: Date): boolean;
    setLocked(newLocked: boolean): boolean;
    setProgress(task: Task, progress: number): void;
    setQuestPinned(player: Player, id: number, pinned: boolean): void;
    setRewardsBlocked(rewardsBlocked: boolean): boolean;
    setStarted(questId: number, time: Date): boolean;
    toString(): string;
  }

}

declare module 'dev.ftb.mods.ftbquests.quest.loot' {
  import { Entity } from 'net.minecraft.world.entity';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { FriendlyByteBuf, RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { Map, Collection, List, Optional, Set } from 'java.util';
  import { Color4I, Icon } from 'dev.ftb.mods.ftblibrary.icon';
  import { ConfigGroup } from 'dev.ftb.mods.ftblibrary.config';
  import { ItemStack } from 'net.minecraft.world.item';
  import { QuestObjectBase, BaseQuestFile, Quest, QuestObjectType } from 'dev.ftb.mods.ftbquests.quest';
  import { Component } from 'net.minecraft.network.chat';
  import { RandomSource } from 'net.minecraft.util';
  import { Provider } from 'HolderLookup';
  import { Runnable, Comparable } from 'java.lang';
  import { TooltipList } from 'dev.ftb.mods.ftblibrary.util';
  import { Components } from 'dev.ftb.mods.ftbquests.integration.RecipeModHelper';
  import { Supplier } from 'java.util.function';
  import { Reward } from 'dev.ftb.mods.ftbquests.quest.reward';

  class EntityWeight {
    passive: number;
    monster: number;
    boss: number;
    getWeight(entity: Entity): number;
    readData(nbt: CompoundTag): void;
    readNetData(data: FriendlyByteBuf): void;
    writeData(nbt: CompoundTag): void;
    writeNetData(data: FriendlyByteBuf): void;
  }


  class LootCrate {
    constructor(table: RewardTable, initFromTable: boolean);
    static allCrateStacks(isClientSide: boolean): Collection<ItemStack>;
    createStack(): ItemStack;
    fillConfigGroup(config: ConfigGroup): void;
    get color(): Color4I;
    get drops(): EntityWeight;
    get itemName(): string;
    get stringID(): string;
    get table(): RewardTable;
    static getLootCrates(isClient: boolean): Map<string, LootCrate>;
    initFromTable(): void;
    isGlow(): boolean;
    readData(nbt: CompoundTag): void;
    readNetData(data: FriendlyByteBuf): void;
    writeData(nbt: CompoundTag): void;
    writeNetData(data: FriendlyByteBuf): void;
  }


  interface RewardTable extends QuestObjectBase {}
  class RewardTable extends QuestObjectBase {
    constructor(id: number, file: BaseQuestFile);

    constructor(id: number, file: BaseQuestFile, filename: string);
    addMouseOverText(list: TooltipList, includeWeight: boolean, includeEmpty: boolean): void;
    addReward(weightedReward: WeightedReward): void;
    clearCachedData(): void;
    componentsToRefresh(): Set<Components>;
    copy(): RewardTable;
    static copy<T extends QuestObjectBase>(orig: T, factory: Supplier<T>): T;
    static createRewardForTable(id: number, type: string, file: BaseQuestFile): QuestObjectBase;
    deleteSelf(): void;
    editedFromGUI(): void;
    editedFromGUIOnServer(): void;
    fillConfigGroup(config: ConfigGroup): void;
    generateWeightedRandomRewards(random: RandomSource, nAttempts: number, includeEmpty: boolean): Collection<WeightedReward>;
    get altIcon(): Icon;
    get altTitle(): Component;
    get fakeQuest(): Quest;
    get file(): BaseQuestFile;
    get filename(): string;
    get lootCrate(): LootCrate;
    get objectType(): QuestObjectType;
    get path(): Optional<string>;
    get questFile(): BaseQuestFile;
    get weightedRewards(): WeightedReward[];
    getTitleOrElse(def: Component): Component;
    getTotalWeight(includeEmpty: boolean): number;
    static isFakeQuestId(id: number): boolean;
    makeWeightedItemReward(stack: ItemStack, weight: number): WeightedReward;
    onCreated(): void;
    onEditButtonClicked(gui: Runnable): void;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    removeReward(weightedReward: WeightedReward): void;
    shouldShowTooltip(): boolean;
    toggleLootCrate(): LootCrate;
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }


  interface WeightedReward extends Comparable<WeightedReward> {}
  class WeightedReward extends Comparable<WeightedReward> {
    constructor(reward: Reward, weight: number);
    static chanceString(weight: number, totalWeight: number, empty: boolean): string;
    static chanceString(weight: number, totalWeight: number): string;
    compareTo(o: WeightedReward): number;
    copy(): WeightedReward;
    get reward(): Reward;
    get weight(): number;
    set weight(weight: number);
  }

}

declare module 'dev.ftb.mods.ftbquests.quest.reward' {
  import { Quest, QuestObjectBase, QuestObjectType, BaseQuestFile, Chapter, TeamData } from 'dev.ftb.mods.ftbquests.quest';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { ConfigGroup } from 'dev.ftb.mods.ftblibrary.config';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { Icon } from 'dev.ftb.mods.ftblibrary.icon';
  import { TooltipList } from 'dev.ftb.mods.ftblibrary.util';
  import { Button, Widget } from 'dev.ftb.mods.ftblibrary.ui';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { List, UUID, Map, Optional, Set } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { RandomSource } from 'net.minecraft.util';
  import { Pattern } from 'java.util.regex';
  import { PositionedIngredient } from 'dev.ftb.mods.ftblibrary.util.client';
  import { RewardTable } from 'dev.ftb.mods.ftbquests.quest.loot';
  import { ProgressChange } from 'dev.ftb.mods.ftbquests.util';
  import { Components } from 'dev.ftb.mods.ftbquests.integration.RecipeModHelper';
  import { Enum } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Provider as dev_ftb_mods_ftbquests_quest_reward_rewardtype_Provider, GuiProvider } from 'dev.ftb.mods.ftbquests.quest.reward.RewardType';
  import { Supplier } from 'java.util.function';

  interface AdvancementReward extends Reward {}
  class AdvancementReward extends Reward {
    constructor(id: number, quest: Quest);
    claim(player: ServerPlayer, notify: boolean): void;
    fillConfigGroup(config: ConfigGroup): void;
    get altIcon(): Icon;
    get altTitle(): Component;
    get type(): RewardType;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }


  interface AllTableReward extends LootReward {}
  class AllTableReward extends LootReward {
    constructor(id: number, parent: Quest);
    claim(player: ServerPlayer, notify: boolean): void;
    get type(): RewardType;
  }


  interface ChoiceReward extends RandomReward {}
  class ChoiceReward extends RandomReward {
    constructor(id: number, quest: Quest);
    addMouseOverText(list: TooltipList): void;
    automatedClaimPre(blockEntity: BlockEntity, items: ItemStack[], random: RandomSource, playerId: UUID, player: ServerPlayer): boolean;
    claim(player: ServerPlayer, notify: boolean): void;
    get excludeFromClaimAll(): boolean;
    get type(): RewardType;
    onButtonClicked(button: Button, canClick: boolean): void;
  }


  interface CommandReward extends Reward {}
  class CommandReward extends Reward {
    static readonly PATTERN: Pattern;
    constructor(id: number, quest: Quest);
    claim(player: ServerPlayer, notify: boolean): void;
    fillConfigGroup(config: ConfigGroup): void;
    static format(template: string, parameters: Map<string, any>): string;
    get altTitle(): MutableComponent;
    get type(): RewardType;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }


  interface CurrencyReward extends Reward {}
  class CurrencyReward extends Reward {
    constructor(id: number, q: Quest);

    constructor(id: number, q: Quest, coinAmount: number);
    claim(player: ServerPlayer, notify: boolean): void;
    fillConfigGroup(config: ConfigGroup): void;
    get altTitle(): Component;
    get coinAmount(): number;
    get type(): RewardType;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }


  interface CustomReward extends Reward {}
  class CustomReward extends Reward {
    constructor(id: number, quest: Quest);
    claim(player: ServerPlayer, notify: boolean): void;
    get type(): RewardType;
  }


  interface ItemReward extends Reward {}
  class ItemReward extends Reward {
    constructor(id: number, quest: Quest, is: ItemStack);

    constructor(id: number, quest: Quest, is: ItemStack, count: number);

    constructor(id: number, quest: Quest);
    automatedClaimPost(blockEntity: BlockEntity, playerId: UUID, player: ServerPlayer): void;
    automatedClaimPre(blockEntity: BlockEntity, items: ItemStack[], random: RandomSource, playerId: UUID, player: ServerPlayer): boolean;
    claim(player: ServerPlayer, notify: boolean): void;
    fillConfigGroup(config: ConfigGroup): void;
    get altIcon(): Icon;
    get altTitle(): MutableComponent;
    get buttonText(): string;
    get count(): number;
    get item(): ItemStack;
    get type(): RewardType;
    getIngredient(widget: Widget): Optional<PositionedIngredient>;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }


  interface LootReward extends RandomReward {}
  class LootReward extends RandomReward {
    constructor(id: number, quest: Quest);
    addMouseOverText(list: TooltipList): void;
    automatedClaimPost(blockEntity: BlockEntity, playerId: UUID, player: ServerPlayer): void;
    automatedClaimPre(blockEntity: BlockEntity, items: ItemStack[], random: RandomSource, playerId: UUID, player: ServerPlayer): boolean;
    claim(player: ServerPlayer, notify: boolean): void;
    get excludeFromClaimAll(): boolean;
    get type(): RewardType;
    onButtonClicked(button: Button, canClick: boolean): void;
  }


  interface RandomReward extends Reward {}
  class RandomReward extends Reward {
    constructor(id: number, parent: Quest);
    addMouseOverText(list: TooltipList): void;
    automatedClaimPost(blockEntity: BlockEntity, playerId: UUID, player: ServerPlayer): void;
    automatedClaimPre(blockEntity: BlockEntity, items: ItemStack[], random: RandomSource, playerId: UUID, player: ServerPlayer): boolean;
    claim(player: ServerPlayer, notify: boolean): void;
    fillConfigGroup(config: ConfigGroup): void;
    get altIcon(): Icon;
    get altTitle(): Component;
    get excludeFromClaimAll(): boolean;
    get table(): RewardTable;
    get type(): RewardType;
    getIngredient(widget: Widget): Optional<PositionedIngredient>;
    isClaimAllHardcoded(): boolean;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    set table(table: RewardTable);
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }


  interface Reward extends QuestObjectBase {}
  class Reward extends QuestObjectBase {
    constructor(id: number, q: Quest);
    addAnyProtoTranslations(tag: CompoundTag): void;
    addMouseOverText(list: TooltipList): void;
    addTitleInMouseOverText(): boolean;
    automatedClaimPost(blockEntity: BlockEntity, playerId: UUID, player: ServerPlayer): void;
    automatedClaimPre(blockEntity: BlockEntity, items: ItemStack[], random: RandomSource, playerId: UUID, player: ServerPlayer): boolean;
    claim(var1: ServerPlayer, var2: boolean): void;
    componentsToRefresh(): Set<Components>;
    createSubGroup(group: ConfigGroup): ConfigGroup;
    deleteChildren(): void;
    deleteSelf(): void;
    editedFromGUI(): void;
    fillConfigGroup(config: ConfigGroup): void;
    forceProgress(teamData: TeamData, progressChange: ProgressChange): void;
    get altIcon(): Icon;
    get altTitle(): Component;
    get autoClaimType(): RewardAutoClaim;
    get buttonText(): string;
    get excludeFromClaimAll(): boolean;
    get objectType(): QuestObjectType;
    get parentID(): number;
    get quest(): Quest;
    get questChapter(): Chapter;
    get questFile(): BaseQuestFile;
    get type(): RewardType;
    getIngredient(widget: Widget): Optional<PositionedIngredient>;
    ignoreRewardBlocking(): boolean;
    isClaimAllHardcoded(): boolean;
    isTeamReward(): boolean;
    onButtonClicked(button: Button, canClick: boolean): void;
    onCreated(): void;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }


  interface RewardAutoClaim extends Enum<RewardAutoClaim> {}
  class RewardAutoClaim extends Enum<RewardAutoClaim> {
    static readonly DEFAULT: RewardAutoClaim;
    static readonly DISABLED: RewardAutoClaim;
    static readonly ENABLED: RewardAutoClaim;
    static readonly NO_TOAST: RewardAutoClaim;
    static readonly INVISIBLE: RewardAutoClaim;
    static valueOf(name: string): RewardAutoClaim;
    static values(): RewardAutoClaim[];
  }


  interface RewardClaimType extends Enum<RewardClaimType> {}
  class RewardClaimType extends Enum<RewardClaimType> {
    static readonly CAN_CLAIM: RewardClaimType;
    static readonly CANT_CLAIM: RewardClaimType;
    static readonly CLAIMED: RewardClaimType;
    canClaim(): boolean;
    cantClaim(): boolean;
    isClaimed(): boolean;
    static valueOf(name: string): RewardClaimType;
    static values(): RewardClaimType[];
  }


  class RewardType {
    intId: number;
    constructor(typeId: ResourceLocation, provider: dev_ftb_mods_ftbquests_quest_reward_rewardtype_Provider, iconSupplier: Supplier<Icon>, availableByDefault: boolean);

    constructor(typeId: ResourceLocation, provider: dev_ftb_mods_ftbquests_quest_reward_rewardtype_Provider, iconSupplier: Supplier<Icon>);
    static createReward(id: number, quest: Quest, typeId: string): Reward;
    createReward(id: number, quest: Quest): Reward;
    get displayName(): Component;
    get excludeFromListRewards(): boolean;
    get guiProvider(): GuiProvider;
    get iconSupplier(): Icon;
    get typeForNBT(): string;
    get typeId(): ResourceLocation;
    makeExtraNBT(): CompoundTag;
    set displayName(name: Component);
    set excludeFromListRewards(v: boolean);
    set guiProvider(p: GuiProvider);
  }


  class RewardTypes {
    static readonly TYPES: Map;
    static readonly ITEM: RewardType;
    static readonly CHOICE: RewardType;
    static readonly ALL_TABLE: RewardType;
    static readonly RANDOM: RewardType;
    static readonly LOOT: RewardType;
    static readonly COMMAND: RewardType;
    static readonly CUSTOM: RewardType;
    static readonly XP: RewardType;
    static readonly XP_LEVELS: RewardType;
    static readonly ADVANCEMENT: RewardType;
    static readonly TOAST: RewardType;
    static readonly STAGE: RewardType;
    static readonly CURRENCY: RewardType;
    static init(): void;
    static register(name: ResourceLocation, typeProvider: dev_ftb_mods_ftbquests_quest_reward_rewardtype_Provider, iconSupplier: Supplier<Icon>, availableByDefault: boolean): RewardType;
    static register(name: ResourceLocation, typeProvider: dev_ftb_mods_ftbquests_quest_reward_rewardtype_Provider, iconSupplier: Supplier<Icon>): RewardType;
  }


  interface StageReward extends Reward {}
  class StageReward extends Reward {
    constructor(id: number, quest: Quest, stage: string);

    constructor(id: number, quest: Quest);
    claim(player: ServerPlayer, notify: boolean): void;
    fillConfigGroup(config: ConfigGroup): void;
    get altTitle(): MutableComponent;
    get type(): RewardType;
    ignoreRewardBlocking(): boolean;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }


  interface ToastReward extends Reward {}
  class ToastReward extends Reward {
    constructor(id: number, quest: Quest);
    claim(player: ServerPlayer, notify: boolean): void;
    fillConfigGroup(config: ConfigGroup): void;
    get description(): string;
    get type(): RewardType;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }


  interface XPLevelsReward extends Reward {}
  class XPLevelsReward extends Reward {
    constructor(id: number, quest: Quest, x: number);

    constructor(id: number, quest: Quest);
    claim(player: ServerPlayer, notify: boolean): void;
    fillConfigGroup(config: ConfigGroup): void;
    get altTitle(): MutableComponent;
    get buttonText(): string;
    get type(): RewardType;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }


  interface XPReward extends Reward {}
  class XPReward extends Reward {
    constructor(id: number, quest: Quest, xp: number);

    constructor(id: number, quest: Quest);
    claim(player: ServerPlayer, notify: boolean): void;
    fillConfigGroup(config: ConfigGroup): void;
    get altTitle(): MutableComponent;
    get buttonText(): string;
    get type(): RewardType;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }

}

declare module 'dev.ftb.mods.ftbquests.quest.reward.RewardType' {
  import { Reward } from 'dev.ftb.mods.ftbquests.quest.reward';
  import { Quest } from 'dev.ftb.mods.ftbquests.quest';
  import { Panel } from 'dev.ftb.mods.ftblibrary.ui';
  import { Consumer } from 'java.util.function';

  class Provider {
    create(var1: number, var3: Quest): Reward;
  }


  class GuiProvider {
    openCreationGui(var1: Panel, var2: Quest, var3: Consumer<Reward>): void;
  }

}

declare module 'dev.ftb.mods.ftbquests.quest.task' {
  import { Quest, TeamData, QuestObject, QuestObjectType, BaseQuestFile, Chapter } from 'dev.ftb.mods.ftbquests.quest';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { ItemStack } from 'net.minecraft.world.item';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { ConfigGroup, Tristate } from 'dev.ftb.mods.ftblibrary.config';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { Icon } from 'dev.ftb.mods.ftblibrary.icon';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Predicate, Supplier } from 'java.util.function';
  import { Check } from 'dev.ftb.mods.ftbquests.quest.task.CustomTask';
  import { Button, Widget } from 'dev.ftb.mods.ftblibrary.ui';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { Level } from 'net.minecraft.world.level';
  import { EnergyTaskClientData } from 'dev.ftb.mods.ftbquests.client';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { FluidStack } from 'dev.architectury.fluid';
  import { DataComponentMap, DataComponentPatch } from 'net.minecraft.core.component';
  import { Optional, List, Set, Map } from 'java.util';
  import { PositionedIngredient } from 'dev.ftb.mods.ftblibrary.util.client';
  import { TooltipList } from 'dev.ftb.mods.ftblibrary.util';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { StructureBlockEntity } from 'net.minecraft.world.level.block.entity';
  import { Player } from 'net.minecraft.world.entity.player';
  import { HitResult } from 'net.minecraft.world.phys';
  import { QuestProgressEventData } from 'dev.ftb.mods.ftbquests.events';
  import { ProgressChange } from 'dev.ftb.mods.ftbquests.util';
  import { Components } from 'dev.ftb.mods.ftbquests.integration.RecipeModHelper';
  import { GuiProvider, Provider as dev_ftb_mods_ftbquests_quest_task_tasktype_Provider } from 'dev.ftb.mods.ftbquests.quest.task.TaskType';

  interface AbstractBooleanTask extends Task {}
  class AbstractBooleanTask extends Task {
    constructor(id: number, quest: Quest);
    canSubmit(var1: TeamData, var2: ServerPlayer): boolean;
    formatMaxProgress(): string;
    formatProgress(teamData: TeamData, progress: number): string;
    submitTask(teamData: TeamData, player: ServerPlayer, craftedItem: ItemStack): void;
    submitTask(teamData: TeamData, player: ServerPlayer): void;
  }


  interface AdvancementTask extends AbstractBooleanTask {}
  class AdvancementTask extends AbstractBooleanTask {
    constructor(id: number, quest: Quest);
    autoSubmitOnPlayerTick(): number;
    canSubmit(teamData: TeamData, player: ServerPlayer): boolean;
    fillConfigGroup(config: ConfigGroup): void;
    get altIcon(): Icon;
    get altTitle(): Component;
    get type(): TaskType;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }


  interface BiomeTask extends AbstractBooleanTask {}
  class BiomeTask extends AbstractBooleanTask {
    constructor(id: number, quest: Quest);
    autoSubmitOnPlayerTick(): number;
    canSubmit(teamData: TeamData, player: ServerPlayer): boolean;
    checkOnLogin(): boolean;
    fillConfigGroup(config: ConfigGroup): void;
    get altTitle(): MutableComponent;
    get type(): TaskType;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }


  interface CheckmarkTask extends AbstractBooleanTask {}
  class CheckmarkTask extends AbstractBooleanTask {
    constructor(id: number, quest: Quest);
    canSubmit(teamData: TeamData, player: ServerPlayer): boolean;
    checkOnLogin(): boolean;
    drawGUI(teamData: TeamData, graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    get type(): TaskType;
  }


  interface CustomTask extends Task {}
  class CustomTask extends Task {
    static readonly PREDICATE: Predicate;
    constructor(id: number, quest: Quest);
    autoSubmitOnPlayerTick(): number;
    checkOnLogin(): boolean;
    get maxProgress(): number;
    get type(): TaskType;
    onButtonClicked(button: Button, canClick: boolean): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    set maxProgress(maxProgress: number);
    setCheck(check: Check): void;
    setCheckTimer(checkTimer: number): void;
    setEnableButton(enableButton: boolean): void;
    submitTask(teamData: TeamData, player: ServerPlayer, craftedItem: ItemStack): void;
    submitTask(teamData: TeamData, player: ServerPlayer): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }


  interface DimensionTask extends AbstractBooleanTask {}
  class DimensionTask extends AbstractBooleanTask {
    constructor(id: number, quest: Quest);
    autoSubmitOnPlayerTick(): number;
    canSubmit(teamData: TeamData, player: ServerPlayer): boolean;
    fillConfigGroup(config: ConfigGroup): void;
    get altTitle(): MutableComponent;
    get type(): TaskType;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    withDimension(dimension: ResourceKey<Level>): DimensionTask;
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }


  interface EnergyTask extends ISingleLongValueTask, Task {}
  class EnergyTask extends ISingleLongValueTask {
    constructor(id: number, quest: Quest);
    consumesResources(): boolean;
    fillConfigGroup(config: ConfigGroup): void;
    get altTitle(): MutableComponent;
    get clientData(): EnergyTaskClientData;
    get maxInput(): number;
    get maxProgress(): number;
    get value(): number;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    set value(v: number);
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }


  interface FluidTask extends Task {}
  class FluidTask extends Task {
    static readonly TANK_TEXTURE: ResourceLocation;
    constructor(id: number, quest: Quest);
    canInsertItem(): boolean;
    consumesResources(): boolean;
    fillConfigGroup(config: ConfigGroup): void;
    formatMaxProgress(): string;
    formatProgress(teamData: TeamData, progress: number): string;
    get altIcon(): Icon;
    get altTitle(): MutableComponent;
    get fluid(): Fluid;
    get fluidDataComponentPatch(): DataComponentPatch;
    get fluidDataComponents(): DataComponentMap;
    get maxProgress(): number;
    get type(): TaskType;
    getIngredient(widget: Widget): Optional<PositionedIngredient>;
    static getVolumeString(a: number): string;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    set fluid(fluidStack: FluidStack);
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }


  class ISingleLongValueTask {
    get defaultConfigValue(): number;
    get maxConfigValue(): number;
    get minConfigValue(): number;
    setValue(var1: number): void;
  }


  interface ItemTask extends Predicate<ItemStack>, Task {}
  class ItemTask extends Predicate<ItemStack> {
    constructor(id: number, quest: Quest);
    addMouseOverHeader(list: TooltipList, teamData: TeamData, advanced: boolean): void;
    addMouseOverText(list: TooltipList, teamData: TeamData): void;
    canInsertItem(): boolean;
    consumesResources(): boolean;
    fillConfigGroup(config: ConfigGroup): void;
    get altIcon(): Icon;
    get altTitle(): MutableComponent;
    get itemStack(): ItemStack;
    get maxProgress(): number;
    get type(): TaskType;
    get validDisplayItems(): ItemStack[];
    insert(teamData: TeamData, stack: ItemStack, simulate: boolean): ItemStack;
    isOnlyFromCrafting(): boolean;
    isTaskScreenOnly(): boolean;
    onButtonClicked(button: Button, canClick: boolean): void;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    setConsumeItems(consumeItems: Tristate): void;
    setStackAndCount(stack: ItemStack, count: number): ItemTask;
    submitItemsOnInventoryChange(): boolean;
    submitTask(teamData: TeamData, player: ServerPlayer, craftedItem: ItemStack): void;
    submitTask(teamData: TeamData, player: ServerPlayer): void;
    test(stack: ItemStack): boolean;
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }


  interface KillTask extends Task {}
  class KillTask extends Task {
    constructor(id: number, quest: Quest);
    clearCachedData(): void;
    fillConfigGroup(config: ConfigGroup): void;
    get altIcon(): Icon;
    get altTitle(): MutableComponent;
    get maxProgress(): number;
    get type(): TaskType;
    kill(teamData: TeamData, e: LivingEntity): void;
    onButtonClicked(button: Button, canClick: boolean): void;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }


  interface LocationTask extends AbstractBooleanTask {}
  class LocationTask extends AbstractBooleanTask {
    constructor(id: number, quest: Quest);
    autoSubmitOnPlayerTick(): number;
    canSubmit(teamData: TeamData, player: ServerPlayer): boolean;
    fillConfigGroup(config: ConfigGroup): void;
    get type(): TaskType;
    initFromStructure(structure: StructureBlockEntity): void;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }


  interface ObservationTask extends AbstractBooleanTask {}
  class ObservationTask extends AbstractBooleanTask {
    constructor(id: number, quest: Quest);
    canSubmit(teamData: TeamData, player: ServerPlayer): boolean;
    checkOnLogin(): boolean;
    fillConfigGroup(config: ConfigGroup): void;
    get altTitle(): Component;
    get timer(): number;
    get type(): TaskType;
    observe(player: Player, result: HitResult): boolean;
    onButtonClicked(button: Button, canClick: boolean): void;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    setToObserve(toObserve: string): void;
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }


  interface StageTask extends AbstractBooleanTask {}
  class StageTask extends AbstractBooleanTask {
    constructor(id: number, quest: Quest);
    autoSubmitOnPlayerTick(): number;
    canSubmit(teamData: TeamData, player: ServerPlayer): boolean;
    static checkStages(player: ServerPlayer): void;
    fillConfigGroup(config: ConfigGroup): void;
    get altTitle(): MutableComponent;
    get type(): TaskType;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }


  interface StatTask extends Task {}
  class StatTask extends Task {
    constructor(id: number, quest: Quest);
    autoSubmitOnPlayerTick(): number;
    fillConfigGroup(config: ConfigGroup): void;
    formatMaxProgress(): string;
    formatProgress(teamData: TeamData, progress: number): string;
    get altTitle(): MutableComponent;
    get maxProgress(): number;
    get type(): TaskType;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    submitTask(teamData: TeamData, player: ServerPlayer, craftedItem: ItemStack): void;
    submitTask(teamData: TeamData, player: ServerPlayer): void;
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }


  interface StructureTask extends AbstractBooleanTask {}
  class StructureTask extends AbstractBooleanTask {
    constructor(id: number, quest: Quest);
    autoSubmitOnPlayerTick(): number;
    canSubmit(teamData: TeamData, player: ServerPlayer): boolean;
    checkOnLogin(): boolean;
    fillConfigGroup(config: ConfigGroup): void;
    get altTitle(): MutableComponent;
    get type(): TaskType;
    static maybeRequestStructureSync(): void;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    static syncKnownStructureList(data: string[]): void;
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }


  interface Task extends QuestObject {}
  class Task extends QuestObject {
    constructor(id: number, quest: Quest);
    addMouseOverHeader(list: TooltipList, teamData: TeamData, advanced: boolean): void;
    addMouseOverText(list: TooltipList, teamData: TeamData): void;
    addTitleInMouseOverText(): boolean;
    autoSubmitOnPlayerTick(): number;
    cacheProgress(): boolean;
    canInsertItem(): boolean;
    checkOnLogin(): boolean;
    componentsToRefresh(): Set<Components>;
    consumesResources(): boolean;
    createSubGroup(group: ConfigGroup): ConfigGroup;
    deleteChildren(): void;
    deleteSelf(): void;
    drawGUI(teamData: TeamData, graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    editedFromGUI(): void;
    fillConfigGroup(config: ConfigGroup): void;
    forceProgress(teamData: TeamData, progressChange: ProgressChange): void;
    formatMaxProgress(): string;
    formatProgress(teamData: TeamData, progress: number): string;
    get altIcon(): Icon;
    get altTitle(): Component;
    get buttonText(): MutableComponent;
    get maxProgress(): number;
    get objectType(): QuestObjectType;
    get parentID(): number;
    get quest(): Quest;
    get questChapter(): Chapter;
    get questFile(): BaseQuestFile;
    get relatedQuest(): Quest;
    get type(): TaskType;
    getIngredient(widget: Widget): Optional<PositionedIngredient>;
    getRelativeProgressFromChildren(data: TeamData): number;
    static getRelativeProgressFromChildren(progressSum: number, count: number): number;
    hideProgressNumbers(): boolean;
    isOptionalForProgression(teamData: TeamData): boolean;
    onButtonClicked(button: Button, canClick: boolean): void;
    onCompleted(data: QuestProgressEventData<any>): void;
    onCreated(): void;
    onStarted(data: QuestProgressEventData<any>): void;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    submitItemsOnInventoryChange(): boolean;
    submitTask(teamData: TeamData, player: ServerPlayer, craftedItem: ItemStack): void;
    submitTask(teamData: TeamData, player: ServerPlayer): void;
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
  }


  class TaskType {
    internalId: number;
    static createTask(id: number, quest: Quest, typeId: string): Task;
    createTask(id: number, quest: Quest): Task;
    get displayName(): Component;
    get guiProvider(): GuiProvider;
    get iconSupplier(): Icon;
    get typeForNBT(): string;
    get typeId(): ResourceLocation;
    makeExtraNBT(): CompoundTag;
    set displayName(name: Component);
    set guiProvider(p: GuiProvider);
  }


  class TaskTypes {
    static readonly TYPES: Map;
    static readonly ITEM: TaskType;
    static readonly CUSTOM: TaskType;
    static readonly XP: TaskType;
    static readonly DIMENSION: TaskType;
    static readonly STAT: TaskType;
    static readonly KILL: TaskType;
    static readonly LOCATION: TaskType;
    static readonly CHECKMARK: TaskType;
    static readonly ADVANCEMENT: TaskType;
    static readonly OBSERVATION: TaskType;
    static readonly BIOME: TaskType;
    static readonly STRUCTURE: TaskType;
    static readonly STAGE: TaskType;
    static readonly FLUID: TaskType;
    static init(): void;
    static register(name: ResourceLocation, provider: dev_ftb_mods_ftbquests_quest_task_tasktype_Provider, iconSupplier: Supplier<Icon>): TaskType;
  }


  interface XPTask extends ISingleLongValueTask, Task {}
  class XPTask extends ISingleLongValueTask {
    constructor(id: number, quest: Quest);
    static addPlayerXP(player: Player, amount: number): void;
    consumesResources(): boolean;
    fillConfigGroup(config: ConfigGroup): void;
    formatMaxProgress(): string;
    formatProgress(teamData: TeamData, progress: number): string;
    get altTitle(): MutableComponent;
    get maxProgress(): number;
    get type(): TaskType;
    static getExperienceForLevel(level: number): number;
    static getLevelForExperience(targetXp: number): number;
    static getPlayerXP(player: Player): number;
    readData(nbt: CompoundTag, provider: Provider): void;
    readNetData(buffer: RegistryFriendlyByteBuf): void;
    setValue(v: number): void;
    submitTask(teamData: TeamData, player: ServerPlayer, craftedItem: ItemStack): void;
    submitTask(teamData: TeamData, player: ServerPlayer): void;
    writeData(nbt: CompoundTag, provider: Provider): void;
    writeNetData(buffer: RegistryFriendlyByteBuf): void;
    static xpBarCap(level: number): number;
  }

}

declare module 'dev.ftb.mods.ftbquests.quest.task.CustomTask' {
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { MinecraftServer } from 'net.minecraft.server';

  class Check {
    check(var1: Data, var2: ServerPlayer): void;
  }


  class TaskSync {
    static tick(server: MinecraftServer): void;
  }

}

declare module 'dev.ftb.mods.ftbquests.quest.task.neoforge' {
  import { EnergyTask, TaskType } from 'dev.ftb.mods.ftbquests.quest.task';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Quest } from 'dev.ftb.mods.ftbquests.quest';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { EnergyTaskClientData } from 'dev.ftb.mods.ftbquests.client';
  import { Enum } from 'java.lang';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { List } from 'java.util';

  interface ForgeEnergyTask extends EnergyTask {}
  class ForgeEnergyTask extends EnergyTask {
    static TYPE: TaskType;
    static readonly EMPTY_TEXTURE: ResourceLocation;
    static readonly FULL_TEXTURE: ResourceLocation;
    constructor(id: number, quest: Quest);
    get altTitle(): MutableComponent;
    get clientData(): EnergyTaskClientData;
    get type(): TaskType;
  }


  interface ForgeEnergyTaskClientData extends Enum<ForgeEnergyTaskClientData> {}
  class ForgeEnergyTaskClientData extends Enum<ForgeEnergyTaskClientData> {
    static readonly INSTANCE: ForgeEnergyTaskClientData;
    get emptyTexture(): TextureAtlasSprite;
    get fullTexture(): TextureAtlasSprite;
    static valueOf(name: string): ForgeEnergyTaskClientData;
    static values(): ForgeEnergyTaskClientData[];
  }

}

declare module 'dev.ftb.mods.ftbquests.quest.task.ObservationTask' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ObserveType extends Enum<ObserveType> {}
  class ObserveType extends Enum<ObserveType> {
    static readonly BLOCK: ObserveType;
    static readonly BLOCK_TAG: ObserveType;
    static readonly BLOCK_STATE: ObserveType;
    static readonly BLOCK_ENTITY: ObserveType;
    static readonly BLOCK_ENTITY_TYPE: ObserveType;
    static readonly ENTITY_TYPE: ObserveType;
    static readonly ENTITY_TYPE_TAG: ObserveType;
    static valueOf(name: string): ObserveType;
    static values(): ObserveType[];
  }

}

declare module 'dev.ftb.mods.ftbquests.quest.task.TaskType' {
  import { Task } from 'dev.ftb.mods.ftbquests.quest.task';
  import { Quest } from 'dev.ftb.mods.ftbquests.quest';
  import { Panel } from 'dev.ftb.mods.ftblibrary.ui';
  import { BiConsumer } from 'java.util.function';
  import { CompoundTag } from 'net.minecraft.nbt';

  class Provider {
    create(var1: number, var3: Quest): Task;
  }


  class GuiProvider {
    openCreationGui(var1: Panel, var2: Quest, var3: BiConsumer<Task, CompoundTag>): void;
  }

}

declare module 'dev.ftb.mods.ftbquests.quest.theme.property' {
  import { Color4I, Icon } from 'dev.ftb.mods.ftblibrary.icon';
  import { Double, Integer } from 'java.lang';
  import { QuestObjectBase } from 'dev.ftb.mods.ftbquests.quest';

  interface ColorProperty extends ThemeProperty<Color4I> {}
  class ColorProperty extends ThemeProperty<Color4I> {
    constructor(n: string);
    parse(string: string): Color4I;
  }


  interface DoubleProperty extends ThemeProperty<number> {}
  class DoubleProperty extends ThemeProperty<number> {
    constructor(name: string, min: number, max: number);

    constructor(n: string);
    parse(string: string): number;
  }


  interface IconProperty extends ThemeProperty<Icon> {}
  class IconProperty extends ThemeProperty<Icon> {
    readonly builtin: Icon;
    constructor(n: string, b: Icon);

    constructor(n: string);
    parse(string: string): Icon;
  }


  interface IntProperty extends ThemeProperty<number> {}
  class IntProperty extends ThemeProperty<number> {
    readonly min: number;
    readonly max: number;
    constructor(name: string, min: number, max: number);

    constructor(n: string);
    parse(string: string): number;
  }


  interface StringProperty extends ThemeProperty<string> {}
  class StringProperty extends ThemeProperty<string> {
    constructor(n: string);
    parse(string: string): string;
  }


  class ThemeProperties {
    static readonly BACKGROUND: IconProperty;
    static readonly CHAPTER_PANEL_BACKGROUND: IconProperty;
    static readonly KEY_REFERENCE_BACKGROUND: IconProperty;
    static readonly EXTRA_QUEST_SHAPES: StringProperty;
    static readonly SELECTED_HILITE_1: ColorProperty;
    static readonly SELECTED_HILITE_2: ColorProperty;
    static readonly TEXT_COLOR: ColorProperty;
    static readonly HOVER_TEXT_COLOR: ColorProperty;
    static readonly DISABLED_TEXT_COLOR: ColorProperty;
    static readonly WIDGET_BORDER: ColorProperty;
    static readonly WIDGET_BACKGROUND: ColorProperty;
    static readonly SYMBOL_IN: ColorProperty;
    static readonly SYMBOL_OUT: ColorProperty;
    static readonly BUTTON: IconProperty;
    static readonly PANEL: IconProperty;
    static readonly DISABLED_BUTTON: IconProperty;
    static readonly HOVER_BUTTON: IconProperty;
    static readonly CONTEXT_MENU: IconProperty;
    static readonly SCROLL_BAR_BACKGROUND: IconProperty;
    static readonly SCROLL_BAR: IconProperty;
    static readonly CONTAINER_SLOT: IconProperty;
    static readonly TEXT_BOX: IconProperty;
    static readonly CHECK_ICON: IconProperty;
    static readonly ADD_ICON: IconProperty;
    static readonly ALERT_ICON: IconProperty;
    static readonly SUPPORT_ICON: IconProperty;
    static readonly WIKI_ICON: IconProperty;
    static readonly WIKI_URL: StringProperty;
    static readonly PIN_ICON_ON: IconProperty;
    static readonly PIN_ICON_OFF: IconProperty;
    static readonly EDITOR_ICON_ON: IconProperty;
    static readonly EDITOR_ICON_OFF: IconProperty;
    static readonly HIDDEN_ICON: IconProperty;
    static readonly LINK_ICON: IconProperty;
    static readonly SAVE_ICON: IconProperty;
    static readonly SETTINGS_ICON: IconProperty;
    static readonly PREFS_ICON: IconProperty;
    static readonly CLOSE_ICON: IconProperty;
    static readonly EMERGENCY_ITEMS_ICON: IconProperty;
    static readonly GUIDE_ICON: IconProperty;
    static readonly MODPACK_ICON: IconProperty;
    static readonly REWARD_TABLE_ICON: IconProperty;
    static readonly SHOP_ICON: IconProperty;
    static readonly COLLECT_REWARDS_ICON: IconProperty;
    static readonly DELETE_ICON: IconProperty;
    static readonly RELOAD_ICON: IconProperty;
    static readonly DOWNLOAD_ICON: IconProperty;
    static readonly EDIT_ICON: IconProperty;
    static readonly MOVE_UP_ICON: IconProperty;
    static readonly MOVE_DOWN_ICON: IconProperty;
    static readonly LOCK_ICON: IconProperty;
    static readonly ICON: IconProperty;
    static readonly FULL_SCREEN_QUEST: IntProperty;
    static readonly TASKS_TEXT_COLOR: ColorProperty;
    static readonly REWARDS_TEXT_COLOR: ColorProperty;
    static readonly QUEST_VIEW_BACKGROUND: IconProperty;
    static readonly QUEST_VIEW_BORDER: ColorProperty;
    static readonly QUEST_VIEW_TITLE: ColorProperty;
    static readonly QUEST_COMPLETED_COLOR: ColorProperty;
    static readonly QUEST_STARTED_COLOR: ColorProperty;
    static readonly QUEST_NOT_STARTED_COLOR: ColorProperty;
    static readonly QUEST_LOCKED_COLOR: ColorProperty;
    static readonly DEPENDENCY_LINE_TEXTURE: IconProperty;
    static readonly DEPENDENCY_LINE_COMPLETED_COLOR: ColorProperty;
    static readonly DEPENDENCY_LINE_UNCOMPLETED_COLOR: ColorProperty;
    static readonly DEPENDENCY_LINE_UNAVAILABLE_COLOR: ColorProperty;
    static readonly DEPENDENCY_LINE_REQUIRES_COLOR: ColorProperty;
    static readonly DEPENDENCY_LINE_REQUIRED_FOR_COLOR: ColorProperty;
    static readonly DEPENDENCY_LINE_SELECTED_SPEED: DoubleProperty;
    static readonly DEPENDENCY_LINE_UNSELECTED_SPEED: DoubleProperty;
    static readonly DEPENDENCY_LINE_THICKNESS: DoubleProperty;
    static readonly QUEST_SPACING: DoubleProperty;
    static readonly PINNED_QUEST_SIZE: DoubleProperty;
    static readonly LEFT_ARROW: IconProperty;
    static readonly RIGHT_ARROW: IconProperty;
    static readonly CHECKMARK_TASK_ACTIVE: IconProperty;
    static readonly CHECKMARK_TASK_INACTIVE: IconProperty;
  }


  class ThemeProperty<T = any> {
    constructor(name: string, defaultValue: T);
    equals(o: any): boolean;
    get(object: QuestObjectBase): T;
    get (): T;
    get defaultValue(): T;
    get name(): string;
    hashCode(): number;
    parse(var1: string): T;
    toString(): string;
  }

}

declare module 'dev.ftb.mods.ftbquests.quest.theme.property.ThemeProperties' {
  import { Icon, Color4I } from 'dev.ftb.mods.ftblibrary.icon';
  import { ColorProperty } from 'dev.ftb.mods.ftbquests.quest.theme.property';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface CheckIcon extends Icon {}
  class CheckIcon extends Icon {
    constructor(out: Color4I, inParameter: Color4I);

    constructor(out: ColorProperty, inParameter: ColorProperty);
    draw(graphics: GuiGraphics, x: number, y: number, w: number, h: number): void;
    equals(o: any): boolean;
    hashCode(): number;
  }

}

declare module 'dev.ftb.mods.ftbquests.quest.theme' {
  import { QuestObjectBase } from 'dev.ftb.mods.ftbquests.quest';
  import { List, Map } from 'java.util';
  import { ThemeProperty } from 'dev.ftb.mods.ftbquests.quest.theme.property';
  import { Comparable } from 'java.lang';
  import { ThemeSelector } from 'dev.ftb.mods.ftbquests.quest.theme.selector';
  import { ResourceManagerReloadListener, ResourceManager } from 'net.minecraft.server.packs.resources';

  class QuestTheme {
    static instance: QuestTheme;
    static currentObject: QuestObjectBase;
    readonly selectors: List;
    defaults: SelectorProperties;
    clearCache(): void;
    get<T>(property: ThemeProperty<T>): T;
    get<T>(property: ThemeProperty<T>, object: QuestObjectBase): T;
    replaceVariables(value: string, iteration: number): string;
  }


  interface SelectorProperties extends Comparable<SelectorProperties> {}
  class SelectorProperties extends Comparable<SelectorProperties> {
    readonly selector: ThemeSelector;
    readonly properties: Map;
    constructor(s: ThemeSelector);
    compareTo(o: SelectorProperties): number;
  }


  interface ThemeLoader extends ResourceManagerReloadListener {}
  class ThemeLoader extends ResourceManagerReloadListener {
    static readonly THEME_TXT: string;
    static loadTheme(resourceManager: ResourceManager): void;
    onResourceManagerReload(resourceManager: ResourceManager): void;
  }

}

declare module 'dev.ftb.mods.ftbquests.quest.theme.selector' {
  import { QuestObjectBase, QuestObjectType } from 'dev.ftb.mods.ftbquests.quest';
  import { List } from 'java.util';
  import { Comparable, Enum } from 'java.lang';

  interface AllSelector extends ThemeSelector {}
  class AllSelector extends ThemeSelector {
    static readonly INSTANCE: AllSelector;
    equals(o: any): boolean;
    get type(): ThemeSelectorType;
    hashCode(): number;
    matches(object: QuestObjectBase): boolean;
    toString(): string;
  }


  interface AndSelector extends ThemeSelector {}
  class AndSelector extends ThemeSelector {
    readonly selectors: List;
    compareTo(o: ThemeSelector): number;
    equals(o: any): boolean;
    get type(): ThemeSelectorType;
    hashCode(): number;
    matches(object: QuestObjectBase): boolean;
    toString(): string;
  }


  interface DirectParentSelector extends ThemeSelector {}
  class DirectParentSelector extends ThemeSelector {
    readonly parent: ThemeSelector;
    readonly child: ThemeSelector;
    constructor(s: ThemeSelector, c: ThemeSelector);
    equals(o: any): boolean;
    get type(): ThemeSelectorType;
    hashCode(): number;
    matches(object: QuestObjectBase): boolean;
    toString(): string;
  }


  interface IDSelector extends ThemeSelector {}
  class IDSelector extends ThemeSelector {
    readonly id: number;
    constructor(i: number);
    equals(o: any): boolean;
    get type(): ThemeSelectorType;
    hashCode(): number;
    matches(object: QuestObjectBase): boolean;
    toString(): string;
  }


  interface IndirectParentSelector extends ThemeSelector {}
  class IndirectParentSelector extends ThemeSelector {
    readonly parent: ThemeSelector;
    readonly child: ThemeSelector;
    constructor(s: ThemeSelector, c: ThemeSelector);
    equals(o: any): boolean;
    get type(): ThemeSelectorType;
    hashCode(): number;
    matches(object: QuestObjectBase): boolean;
    toString(): string;
  }


  interface NotSelector extends ThemeSelector {}
  class NotSelector extends ThemeSelector {
    readonly selector: ThemeSelector;
    constructor(s: ThemeSelector);
    compareTo(o: ThemeSelector): number;
    equals(o: any): boolean;
    get type(): ThemeSelectorType;
    hashCode(): number;
    matches(object: QuestObjectBase): boolean;
    toString(): string;
  }


  interface TagSelector extends ThemeSelector {}
  class TagSelector extends ThemeSelector {
    readonly tag: string;
    constructor(t: string);
    equals(o: any): boolean;
    get type(): ThemeSelectorType;
    hashCode(): number;
    matches(quest: QuestObjectBase): boolean;
    toString(): string;
  }


  interface ThemeSelector extends Comparable<ThemeSelector> {}
  class ThemeSelector extends Comparable<ThemeSelector> {
    compareTo(o: ThemeSelector): number;
    get type(): ThemeSelectorType;
    matches(var1: QuestObjectBase): boolean;
  }


  interface ThemeSelectorType extends Enum<ThemeSelectorType> {}
  class ThemeSelectorType extends Enum<ThemeSelectorType> {
    static readonly ID: ThemeSelectorType;
    static readonly DIRECT_PARENT: ThemeSelectorType;
    static readonly TAG: ThemeSelectorType;
    static readonly INDIRECT_PARENT: ThemeSelectorType;
    static readonly TYPE: ThemeSelectorType;
    static readonly AND: ThemeSelectorType;
    static readonly NOT: ThemeSelectorType;
    static readonly ALL: ThemeSelectorType;
    static valueOf(name: string): ThemeSelectorType;
    static values(): ThemeSelectorType[];
  }


  interface TypeSelector extends ThemeSelector {}
  class TypeSelector extends ThemeSelector {
    readonly type: QuestObjectType;
    constructor(t: QuestObjectType);
    compareTo(o: ThemeSelector): number;
    equals(o: any): boolean;
    get type(): ThemeSelectorType;
    hashCode(): number;
    matches(object: QuestObjectBase): boolean;
    toString(): string;
  }

}

declare module 'dev.ftb.mods.ftbquests.quest.translation' {
  import { Enum } from 'java.lang';
  import { Either } from 'com.mojang.datafixers.util';
  import { List, Optional } from 'java.util';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { BaseQuestFile, QuestObjectBase } from 'dev.ftb.mods.ftbquests.quest';
  import { Path } from 'java.nio.file';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { StreamCodec } from 'net.minecraft.network.codec';

  interface TranslationKey extends Enum<TranslationKey> {}
  class TranslationKey extends Enum<TranslationKey> {
    static readonly TITLE: TranslationKey;
    static readonly QUEST_SUBTITLE: TranslationKey;
    static readonly QUEST_DESC: TranslationKey;
    static readonly CHAPTER_SUBTITLE: TranslationKey;
    get name(): string;
    get translationKey(): string;
    isListVal(): boolean;
    validate(either: Either<string, string[]>): Either<string, string[]>;
    static valueOf(name: string): TranslationKey;
    static values(): TranslationKey[];
  }


  class TranslationManager {
    static readonly DEFAULT_FALLBACK_LOCALE: string;
    addInitialTranslation(extra: CompoundTag, locale: string, translationKey: TranslationKey, value: string): void;
    addTranslation(object: QuestObjectBase, locale: string, subKey: TranslationKey, message: string): void;
    addTranslation(object: QuestObjectBase, locale: string, subKey: TranslationKey, message: string[]): void;
    getStringListTranslation(object: QuestObjectBase, locale: string, subKey: TranslationKey): Optional<string[]>;
    getStringTranslation(object: QuestObjectBase, locale: string, subKey: TranslationKey): Optional<string>;
    hasMissingTranslation(object: QuestObjectBase, key: TranslationKey): boolean;
    loadFromNBT(file: BaseQuestFile, langFolder: Path): void;
    processInitialTranslation(extra: CompoundTag, object: QuestObjectBase): void;
    removeAllTranslations(obj: QuestObjectBase): void;
    saveToNBT(langFolder: Path, force: boolean): void;
    sendTableToPlayer(player: ServerPlayer, locale: string): void;
    sendTranslationsToPlayer(player: ServerPlayer): void;
    static syncTable(player: ServerPlayer, language: string): void;
    syncTableFromServer(locale: string, table: TranslationTable): void;
  }


  class TranslationTable {
    static readonly STREAM_CODEC: StreamCodec;
    constructor();
    contains(key: string): boolean;
    static fromNBT(tag: CompoundTag): TranslationTable;
    getStringListTranslation(key: string): Optional<string[]>;
    getStringTranslation(key: string): Optional<string>;
    put(key: string, message: string): void;
    put(key: string, message: string[]): void;
    remove(key: string): void;
    saveToNBT(): CompoundTag;
    size(): number;
  }

}

declare module 'dev.ftb.mods.ftbquests.registry' {
  import { DeferredRegister, RegistrySupplier } from 'dev.architectury.registry.registries';
  import { BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockEntitySupplier } from 'BlockEntityType';
  import { Collection, List } from 'java.util';
  import { Block } from 'net.minecraft.world.level.block';
  import { Supplier } from 'java.util.function';
  import { Properties } from 'Item';

  class ModBlockEntityTypes {
    static readonly BLOCK_ENTITIES: DeferredRegister;
    static readonly BARRIER: RegistrySupplier;
    static readonly STAGE_BARRIER: RegistrySupplier;
    static readonly DETECTOR: RegistrySupplier;
    static readonly LOOT_CRATE_OPENER: RegistrySupplier;
    static readonly CORE_TASK_SCREEN: RegistrySupplier;
    static readonly AUX_TASK_SCREEN: RegistrySupplier;
    static register<T extends BlockEntity>(id: string, factory: BlockEntitySupplier<T>, blocks: Collection<RegistrySupplier<Block>>): RegistrySupplier<BlockEntityType<T>>;
    static register<T extends BlockEntity>(id: string, factory: BlockEntitySupplier<T>, block: Supplier<Block>): RegistrySupplier<BlockEntityType<T>>;
    static register(): void;
  }


  class ModBlocks {
    static readonly BLOCKS: DeferredRegister;
    static readonly BARRIER: RegistrySupplier;
    static readonly STAGE_BARRIER: RegistrySupplier;
    static readonly DETECTOR: RegistrySupplier;
    static readonly LOOT_CRATE_OPENER: RegistrySupplier;
    static readonly TASK_SCREEN_1: RegistrySupplier;
    static readonly TASK_SCREEN_3: RegistrySupplier;
    static readonly TASK_SCREEN_5: RegistrySupplier;
    static readonly TASK_SCREEN_7: RegistrySupplier;
    static readonly AUX_SCREEN: RegistrySupplier;
    static register(): void;
  }


  class ModDataComponents {
    static readonly COMPONENT_TYPES: DeferredRegister;
    static CUSTOM_ICON: RegistrySupplier;
    static ENTITY_FACE_ICON: RegistrySupplier;
    static LOOT_CRATE: RegistrySupplier;
    static LOOT_CRATE_ITEMS: RegistrySupplier;
    static SCREEN_POS: RegistrySupplier;
    static MISSING_ITEM_DESC: RegistrySupplier;
    static TASK_SCREEN_SAVED: RegistrySupplier;
    static BARRIER_SAVED: RegistrySupplier;
    static register(): void;
  }


  class ModItems {
    static readonly ITEMS: DeferredRegister;
    static readonly BOOK: RegistrySupplier;
    static readonly LOOTCRATE: RegistrySupplier;
    static readonly TASK_SCREEN_CONFIGURATOR: RegistrySupplier;
    static readonly MISSING_ITEM: RegistrySupplier;
    static readonly CUSTOM_ICON: RegistrySupplier;
    static readonly BARRIER: RegistrySupplier;
    static readonly STAGE_BARRIER: RegistrySupplier;
    static readonly DETECTOR: RegistrySupplier;
    static readonly LOOT_CRATE_OPENER: RegistrySupplier;
    static readonly TASK_SCREEN_1: RegistrySupplier;
    static readonly TASK_SCREEN_3: RegistrySupplier;
    static readonly TASK_SCREEN_5: RegistrySupplier;
    static readonly TASK_SCREEN_7: RegistrySupplier;
    static readonly BASE_ITEMS: List;
    static defaultProps(): Properties;
    static register(): void;
  }

}

declare module 'dev.ftb.mods.ftbquests.util' {
  import { ConfigValue, ConfigCallback } from 'dev.ftb.mods.ftblibrary.config';
  import { Predicate, Function, BiConsumer } from 'java.util.function';
  import { QuestObjectBase } from 'dev.ftb.mods.ftbquests.quest';
  import { Component } from 'net.minecraft.network.chat';
  import { Widget } from 'dev.ftb.mods.ftblibrary.ui';
  import { MouseButton } from 'dev.ftb.mods.ftblibrary.ui.input';
  import { TooltipList } from 'dev.ftb.mods.ftblibrary.util';
  import { MinecraftServer } from 'net.minecraft.server';
  import { List, Collection, UUID, Date } from 'java.util';
  import { InputStream, File } from 'java.io';
  import { ContainerListener, AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { ItemStack } from 'net.minecraft.world.item';
  import { PacketContext } from 'NetworkManager';
  import { Player } from 'net.minecraft.world.entity.player';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { Icon } from 'dev.ftb.mods.ftblibrary.icon';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Provider } from 'HolderLookup';
  import { ListTag } from 'net.minecraft.nbt';

  interface ConfigQuestObject<T extends QuestObjectBase = any> extends ConfigValue<T> {}
  class ConfigQuestObject<T extends QuestObjectBase = any> extends ConfigValue<T> {
    readonly predicate: Predicate;
    constructor(predicate: Predicate<QuestObjectBase>, formatter: Function<T, Component>);

    constructor(predicate: Predicate<QuestObjectBase>);
    addInfo(list: TooltipList): void;
    static formatEntry(qo: QuestObjectBase): Component;
    getStringForGUI(value: T): Component;
    onClicked(clickedWidget: Widget, button: MouseButton, callback: ConfigCallback): void;
  }


  class DeferredInventoryDetection {
    static tick(server: MinecraftServer): void;
  }


  class FileUtils {
    static delete(file: File): void;
    static read(inParameter: InputStream): string[];
    static readFile(file: File): string[];
  }


  interface FTBQuestsInventoryListener extends ContainerListener {}
  class FTBQuestsInventoryListener extends ContainerListener {
    readonly player: ServerPlayer;
    constructor(p: ServerPlayer);
    dataChanged(abstractContainerMenu: AbstractContainerMenu, i: number, j: number): void;
    static detect(player: ServerPlayer, craftedItem: ItemStack, sourceTask: number): void;
    slotChanged(menu: AbstractContainerMenu, index: number, stack: ItemStack): void;
  }


  class NetUtils {
    static canEdit(context: PacketContext): boolean;
    static canEdit(player: Player): boolean;
    static read<T>(buffer: FriendlyByteBuf, list: Collection<T>, reader: Function<FriendlyByteBuf, T>): void;
    static readIcon(buffer: FriendlyByteBuf): Icon;
    static readStrings(buffer: FriendlyByteBuf, list: Collection<string>): void;
    static write<T>(buffer: FriendlyByteBuf, list: Collection<T>, writer: BiConsumer<FriendlyByteBuf, T>): void;
    static writeIcon(buffer: FriendlyByteBuf, icon: Icon): void;
    static writeStrings(buffer: FriendlyByteBuf, list: Collection<string>): void;
  }


  class PlayerInventorySummary {
    static build(player: ServerPlayer): void;
    static getRelevantItems(stack: ItemStack): Collection<ItemStack>;
  }


  class ProgressChange {
    static STREAM_CODEC: StreamCodec;
    constructor(origin: QuestObjectBase, playerId: UUID);
    static createServerSide(origin: number, reset: boolean, playerId: UUID, notifications: boolean): ProgressChange;
    get date(): Date;
    get playerId(): UUID;
    maybeForceProgress(teamId: UUID): void;
    setReset(reset: boolean): ProgressChange;
    shouldNotify(): boolean;
    shouldReset(): boolean;
    withNotifications(): ProgressChange;
  }


  class TextUtils {
    static fromListTag(tag: ListTag): string[];
    static isComponentEmpty(c: Component): boolean;
    static parseRawText(str: string, provider: Provider): Component;
  }

}