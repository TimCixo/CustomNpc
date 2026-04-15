declare module 'noobanidus.mods.lootr.common.advancement' {
  import { SimpleCriterionTrigger } from 'net.minecraft.advancements.critereon';
  import { TriggerInstance } from 'noobanidus.mods.lootr.common.advancement.AdvancementTrigger';
  import { IAdvancementTrigger, IContainerTrigger, ITrigger, ILootedStatTrigger } from 'noobanidus.mods.lootr.common.api.advancement';
  import { Codec } from 'com.mojang.serialization';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Criterion } from 'net.minecraft.advancements';
  import { TriggerInstance as noobanidus_mods_lootr_common_advancement_containertrigger_TriggerInstance } from 'noobanidus.mods.lootr.common.advancement.ContainerTrigger';
  import { UUID } from 'java.util';
  import { TriggerInstance as noobanidus_mods_lootr_common_advancement_lootedstattrigger_TriggerInstance } from 'noobanidus.mods.lootr.common.advancement.LootedStatTrigger';

  interface AdvancementTrigger extends IAdvancementTrigger, SimpleCriterionTrigger<TriggerInstance> {}
  class AdvancementTrigger extends IAdvancementTrigger {
    codec(): Codec<TriggerInstance>;
    static completed(advancementId: ResourceLocation): Criterion<TriggerInstance>;
    trigger(player: ServerPlayer, advancementId: ResourceLocation): void;
  }


  interface ContainerTrigger extends IContainerTrigger, SimpleCriterionTrigger<noobanidus_mods_lootr_common_advancement_containertrigger_TriggerInstance> {}
  class ContainerTrigger extends IContainerTrigger {
    codec(): Codec<noobanidus_mods_lootr_common_advancement_containertrigger_TriggerInstance>;
    static looted(trigger: ITrigger): Criterion<noobanidus_mods_lootr_common_advancement_containertrigger_TriggerInstance>;
    trigger(player: ServerPlayer, condition: UUID): void;
  }


  interface LootedStatTrigger extends ILootedStatTrigger, SimpleCriterionTrigger<noobanidus_mods_lootr_common_advancement_lootedstattrigger_TriggerInstance> {}
  class LootedStatTrigger extends ILootedStatTrigger {
    codec(): Codec<noobanidus_mods_lootr_common_advancement_lootedstattrigger_TriggerInstance>;
    static looted(count: number): Criterion<noobanidus_mods_lootr_common_advancement_lootedstattrigger_TriggerInstance>;
    trigger(player: ServerPlayer): void;
  }

}

declare module 'noobanidus.mods.lootr.common.api.adapter' {
  import { Class } from 'java.lang';
  import { ResourceKey } from 'net.minecraft.resources';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';
  import { Direction, BlockPos } from 'net.minecraft.core';
  import { ItemStack } from 'net.minecraft.world.item';

  class AdapterMap<A extends ILootrAdapter<any> = any> {
    static readonly NONE_DATA_ADAPTER: ILootrDataAdapter;
    static readonly NONE_ITEM_FRAME_ADAPTER: ILootrItemFrameAdapter;
    constructor(none: A);
    getAdapter(type: any): A;
    register(adapter: A): void;
  }


  class ILootrAdapter<T = any> {
    get assignableClass(): Class<T>;
    priority(): number;
  }


  interface ILootrDataAdapter<T = any> extends ILootrAdapter<T> {}
  class ILootrDataAdapter<T = any> extends ILootrAdapter<T> {
    getLootSeed(var1: T): number;
    getLootTable(var1: T): ResourceKey<LootTable>;
    hasCopyableComponentsViaItem(entity: T): boolean;
    setLootTable(var1: T, var2: ResourceKey<LootTable>, var3: number): void;
  }


  interface ILootrItemFrameAdapter<T = any> extends ILootrAdapter<T> {}
  class ILootrItemFrameAdapter<T = any> extends ILootrAdapter<T> {
    getDirection(var1: T): Direction;
    getItem(var1: T): ItemStack;
    getPos(var1: T): BlockPos;
    getRotation(var1: T): number;
    isFixed(var1: T): boolean;
    isInvisible(var1: T): boolean;
  }

}

declare module 'noobanidus.mods.lootr.common.api.advancement' {
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { UUID } from 'java.util';
  import { CriterionTrigger } from 'net.minecraft.advancements';

  interface IAdvancementTrigger extends ITrigger {}
  class IAdvancementTrigger extends ITrigger {
    trigger(var1: ServerPlayer, var2: ResourceLocation): void;
  }


  interface IContainerTrigger extends ITrigger {}
  class IContainerTrigger extends ITrigger {
    trigger(var1: ServerPlayer, var2: UUID): void;
  }


  interface ILootedStatTrigger extends ITrigger {}
  class ILootedStatTrigger extends ITrigger {
    trigger(var1: ServerPlayer): void;
  }


  class ITrigger {
    get trigger(): CriterionTrigger<any>;
  }

}

declare module 'noobanidus.mods.lootr.common.api' {
  import { LootrBlockType, ILootrInfoProvider, LootFiller, ILootrSavedData, ILootrInfo } from 'noobanidus.mods.lootr.common.api.data';
  import { Player, Inventory } from 'net.minecraft.world.entity.player';
  import { Direction, BlockPos } from 'net.minecraft.core';
  import { Set, UUID, List } from 'java.util';
  import { MinecraftServer } from 'net.minecraft.server';
  import { ServerPlayer, ServerLevel, TicketType } from 'net.minecraft.server.level';
  import { ILootrInventory } from 'noobanidus.mods.lootr.common.api.data.inventory';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockGetter, Level, ChunkPos } from 'net.minecraft.world.level';
  import { ClientTextureType } from 'noobanidus.mods.lootr.common.api.client';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';
  import { Style, Component } from 'net.minecraft.network.chat';
  import { ILootrBlockEntity } from 'noobanidus.mods.lootr.common.api.data.blockentity';
  import { BlockEntity, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { ILootrEntity, ILootrCart } from 'noobanidus.mods.lootr.common.api.data.entity';
  import { Entity, EntityType } from 'net.minecraft.world.entity';
  import { TagKey } from 'net.minecraft.tags';
  import { Structure } from 'net.minecraft.world.level.levelgen.structure';
  import { ILootrFilter } from 'noobanidus.mods.lootr.common.api.filter';
  import { Pre, Post } from 'noobanidus.mods.lootr.common.api.processor.ILootrBlockEntityProcessor';
  import { Pre as noobanidus_mods_lootr_common_api_processor_ilootrentityprocessor_Pre, Post as noobanidus_mods_lootr_common_api_processor_ilootrentityprocessor_Post } from 'noobanidus.mods.lootr.common.api.processor.ILootrEntityProcessor';
  import { ILootrDataAdapter, ILootrItemFrameAdapter } from 'noobanidus.mods.lootr.common.api.adapter';
  import { ItemStack } from 'net.minecraft.world.item';
  import { DataComponentInput } from 'BlockEntity';
  import { SaveMode } from 'noobanidus.mods.lootr.common.api.config';
  import { Function } from 'java.util.function';
  import { Container } from 'net.minecraft.world';
  import { AbstractMinecartContainer } from 'net.minecraft.world.entity.vehicle';
  import { Logger } from 'org.apache.logging.log4j';
  import { Properties } from 'BlockBehaviour';
  import { AbstractContainerMenu } from 'net.minecraft.world.inventory';

  class BuiltInLootrTypes {
    static readonly TYPE_CHEST: string;
    static readonly TYPE_TRAPPED_CHEST: string;
    static readonly TYPE_BARREL: string;
    static readonly TYPE_SHULKER: string;
    static readonly TYPE_INVENTORY: string;
    static readonly TYPE_MINECART: string;
    static readonly TYPE_POT: string;
    static readonly TYPE_SAND: string;
    static readonly TYPE_GRAVEL: string;
    static readonly TYPE_ITEM_FRAME: string;
    static readonly TYPE_SIMPLE: string;
    static CHEST: ILootrType;
    static TRAPPED_CHEST: ILootrType;
    static BARREL: ILootrType;
    static SHULKER: ILootrType;
    static INVENTORY: ILootrType;
    static MINECART: ILootrType;
    static POT: ILootrType;
    static SAND: ILootrType;
    static GRAVEL: ILootrType;
    static ITEM_FRAME: ILootrType;
    static SIMPLE: ILootrType;
    static fromLegacy(type: LootrBlockType): ILootrType;
  }


  class IBrushable {
    IBrushable$brush(var1: number, var3: Player, var4: Direction): boolean;
    IBrushable$checkReset(): void;
  }


  interface IClientOpeners extends IOpeners {}
  class IClientOpeners extends IOpeners {
    clearOpeners(): boolean;
    get clientOpeners(): Set<UUID>;
    hasClientOpened(player: Player): boolean;
    hasClientOpened(uuid: UUID): boolean;
    isClientOpened(): boolean;
    setClientOpened(var1: boolean): void;
  }


  class ILootrAPI {
    award(provider: ILootrInfoProvider, player: ServerPlayer): void;
    award(var1: UUID, var2: ServerPlayer): void;
    canBrushablesSelfSupport(): boolean;
    canDestroyOrBreak(var1: Player): boolean;
    canItemFramesSelfSupport(): boolean;
    clearPlayerLoot(entity: ServerPlayer): boolean;
    clearPlayerLoot(var1: UUID): boolean;
    get blockEntityPostProcessors(): Post[];
    get blockEntityPreProcessors(): Pre[];
    get chatStyle(): Style;
    get currentTicks(): number;
    get decayDimensions(): Set<ResourceKey<Level>>;
    get decayStyle(): Style;
    get decayValue(): number;
    get decayWhitelist(): Set<ResourceKey<LootTable>>;
    get dimensionBlacklist(): Set<ResourceKey<Level>>;
    get dimensionWhitelist(): Set<ResourceKey<Level>>;
    get entityPostProcessors(): noobanidus_mods_lootr_common_api_processor_ilootrentityprocessor_Post[];
    get entityPreProcessors(): noobanidus_mods_lootr_common_api_processor_ilootrentityprocessor_Pre[];
    get fileSaveMode(): SaveMode;
    get filters(): ILootrFilter[];
    get invalidStyle(): Style;
    get lootModidBlacklist(): Set<string>;
    get lootTableBlacklist(): Set<ResourceKey<LootTable>>;
    get modidDecayWhitelist(): Set<string>;
    get modidDimensionBlacklist(): Set<string>;
    get modidDimensionWhitelist(): Set<string>;
    get notificationDelay(): number;
    get playerIds(): Set<UUID>;
    get refreshDimensions(): Set<ResourceKey<Level>>;
    get refreshModids(): Set<string>;
    get refreshStyle(): Style;
    get refreshValue(): number;
    get refreshWhitelist(): Set<ResourceKey<LootTable>>;
    get server(): MinecraftServer;
    get textureType(): ClientTextureType;
    getAdapter<T>(var1: T): ILootrDataAdapter<T>;
    getAnalogOutputSignal(var1: BlockState, var2: Level, var3: BlockPos, var4: number): number;
    getData(var1: ILootrInfoProvider): ILootrSavedData;
    getDecorationsAdapter(var1: BlockEntity): PotDecorationsAdapter;
    getDecorationsAdapter(var1: ItemStack): PotDecorationsAdapter;
    getDecorationsAdapter(var1: DataComponentInput): PotDecorationsAdapter;
    getDestroyProgress(var1: BlockState, var2: Player, var3: BlockGetter, var4: BlockPos, var5: number): number;
    getExplosionResistance(var1: Block, var2: number): number;
    getInvalidTableComponent(var1: ResourceKey<LootTable>): Component;
    getInventory(var1: ILootrInfoProvider, var2: ServerPlayer, var3: LootFiller): ILootrInventory;
    getInventory(provider: ILootrInfoProvider, player: ServerPlayer, builder: MenuBuilder): ILootrInventory;
    getInventory(var1: ILootrInfoProvider, var2: ServerPlayer, var3: LootFiller, var4: MenuBuilder): ILootrInventory;
    getItemFrameAdapter<T>(var1: T): ILootrItemFrameAdapter<T>;
    getLootSeed(var1: number): number;
    getRemainingDecayValue(var1: ILootrInfoProvider): number;
    getRemainingRefreshValue(var1: ILootrInfoProvider): number;
    getType(var1: string): ILootrType;
    handleProviderClientTick(var1: ILootrInfoProvider): void;
    handleProviderOpen(var1: ILootrInfoProvider, var2: ServerPlayer): void;
    handleProviderOpen(var1: ILootrInfoProvider, var2: ServerPlayer, var3: MenuBuilder): void;
    handleProviderSneak(var1: ILootrInfoProvider, var2: ServerPlayer): void;
    handleProviderTick(var1: ILootrInfoProvider): void;
    isAwarded(provider: ILootrInfoProvider, player: ServerPlayer): boolean;
    isAwarded(var1: UUID, var2: ServerPlayer): boolean;
    isBlastImmune(): boolean;
    isBlastResistant(): boolean;
    isBreakDisabled(): boolean;
    isBreakEnabled(): boolean;
    isCustomTrapped(): boolean;
    isDecayed(var1: ILootrInfoProvider): boolean;
    isDecaying(var1: ILootrInfoProvider): boolean;
    isDefaultTextures(): boolean;
    isDimensionBlocked(var1: ResourceKey<Level>): boolean;
    isDimensionDecaying(var1: ResourceKey<Level>): boolean;
    isDimensionRefreshing(var1: ResourceKey<Level>): boolean;
    isDisabled(): boolean;
    isFakePlayer(var1: Player): boolean;
    isFakePlayerBreakEnabled(): boolean;
    isLootTableBlacklisted(var1: ResourceKey<LootTable>): boolean;
    isMessageStylesEnabled(): boolean;
    isNewTextures(): boolean;
    isNotificationsEnabled(): boolean;
    isOldTextures(): boolean;
    isRefreshed(var1: ILootrInfoProvider): boolean;
    isRefreshing(var1: ILootrInfoProvider): boolean;
    isTaggedStructurePresent(var1: ServerLevel, var2: ChunkPos, var3: TagKey<Structure>, var4: BlockPos): boolean;
    isVanillaTextures(): boolean;
    isWorldBorderSafe(var1: Level, var2: BlockPos): boolean;
    isWorldBorderSafe(var1: Level, var2: ChunkPos): boolean;
    performPiecewiseCheck(): boolean;
    playerDestroyed(var1: Level, var2: Player, var3: BlockPos, var4: BlockEntity): void;
    refreshSections(): void;
    removeDecayed(var1: ILootrInfoProvider): void;
    removeRefreshed(var1: ILootrInfoProvider): void;
    replacementBlockState(var1: BlockState): BlockState;
    reportUnresolvedTables(): boolean;
    resolveBlockEntity<T extends BlockEntity>(var1: T): ILootrBlockEntity;
    resolveEntity<T extends Entity>(var1: T): ILootrEntity;
    setDecaying(var1: ILootrInfoProvider): void;
    setRefreshing(var1: ILootrInfoProvider): void;
    shouldBypassSpawnProtection(): boolean;
    shouldCheckWorldBorder(): boolean;
    shouldConvertElytras(): boolean;
    shouldConvertElytrasToChests(): boolean;
    shouldConvertElytrasToItemFrames(): boolean;
    shouldConvertMineshafts(): boolean;
    shouldConvertStructureItemFrames(): boolean;
    shouldDecayAll(): boolean;
    shouldDiscard(): boolean;
    shouldDisplayUnopenedParticles(): boolean;
    shouldDropPlayerLoot(): boolean;
    shouldNotify(var1: number): boolean;
    shouldPerformDecayWhileTicking(): boolean;
    shouldPerformRefreshWhileTicking(): boolean;
    shouldPowerComparators(): boolean;
    shouldRefreshAll(): boolean;
    shouldReplaceWhenDecayed(): boolean;
    shouldStartDecayWhileTicking(): boolean;
    shouldStartRefreshWhileTicking(): boolean;
    shouldWarnNoLootTables(): boolean;
  }


  interface ILootrBlockEntityConverter<T = any> extends Function<T, ILootrBlockEntity> {}
  class ILootrBlockEntityConverter<T = any> extends Function<T, ILootrBlockEntity> {
    apply(var1: T): ILootrBlockEntity;
    get blockEntityType(): BlockEntityType<any>;
  }


  interface ILootrEntityConverter<T = any> extends Function<T, ILootrEntity> {}
  class ILootrEntityConverter<T = any> extends Function<T, ILootrEntity> {
    apply(var1: T): ILootrEntity;
    get entityType(): EntityType<any>;
  }


  class ILootrType {
    callback(): void;
    canBeMarkedUnopened(): boolean;
    canDecay(): boolean;
    canDropContentsWhenBroken(): boolean;
    canRefresh(): boolean;
    displaysUnopenedParticle(): boolean;
    get defaultFiller(): LootFiller;
    get name(): string;
    get replacementBlock(): Block;
    get replacementEntity(): EntityType<any>;
    getContainer(info: ILootrInfo, level: ServerLevel): Container;
    isEntity(): boolean;
  }


  class IMarkChanged {
    markChanged(): void;
    markDataChanged(): void;
  }


  interface IOpeners extends IMarkChanged {}
  class IOpeners extends IMarkChanged {
    addActualOpener(uuid: UUID): boolean;
    addActualOpener(player: Player): boolean;
    addOpener(player: Player): boolean;
    addVisualOpener(uuid: UUID): boolean;
    addVisualOpener(player: Player): boolean;
    clearOpeners(): boolean;
    get actualOpeners(): Set<UUID>;
    get visualOpeners(): Set<UUID>;
    hasOpened(uuid: UUID): boolean;
    hasOpened(player: Player): boolean;
    hasServerOpened(uuid: UUID): boolean;
    hasServerOpened(player: Player): boolean;
    hasVisualOpened(uuid: UUID): boolean;
    hasVisualOpened(player: Player): boolean;
    removeVisualOpener(uuid: UUID): boolean;
    removeVisualOpener(player: Player): boolean;
  }


  class IPlatformAPI {
    copyEntityData(entity1: AbstractMinecartContainer, entity2: AbstractMinecartContainer): void;
    copyEntityData(adapter: ILootrDataAdapter<Entity>, entity1: Entity, entity3: ILootrEntity): void;
    copyEntityData(adapter: ILootrItemFrameAdapter<Entity>, entity1: Entity, entity3: ILootrEntity): void;
    copySpecificData(var1: BlockEntity): DataToCopy;
    performBlockClose(var1: ILootrBlockEntity, var2: ServerPlayer): void;
    performBlockClose(var1: ILootrBlockEntity): void;
    performBlockOpen(var1: ILootrBlockEntity, var2: ServerPlayer): void;
    performBlockOpen(var1: ILootrBlockEntity): void;
    performCartClose(cart: ILootrCart, player: ServerPlayer): void;
    performCartClose(cart: ILootrCart): void;
    performCartOpen(cart: ILootrCart, player: ServerPlayer): void;
    performCartOpen(cart: ILootrCart): void;
    performEntityClose(var1: ILootrEntity, var2: ServerPlayer): void;
    performEntityClose(var1: ILootrEntity): void;
    performEntityOpen(var1: ILootrEntity, var2: ServerPlayer): void;
    performEntityOpen(var1: ILootrEntity): void;
    performPotBreak(var1: ILootrBlockEntity, var2: ServerPlayer): void;
    refreshPlayerSection(var1: ServerPlayer): void;
    restoreSpecificData(var1: DataToCopy, var2: BlockEntity): void;
    shouldDoInitialSave(): boolean;
  }


  class IRedirect<T = any> {
    get redirect(): T;
  }


  class LootrAPI {
    static readonly LOG: Logger;
    static readonly MODID: string;
    static readonly NETWORK_VERSION: string;
    static readonly ELYTRA_CHEST: ResourceKey;
    static readonly TROPHY_REWARD: ResourceKey;
    static readonly ITEM_FRAME_EMPTY: ResourceKey;
    static readonly LOOTR_ENTITY_TICK_TICKET: TicketType;
    static readonly PROBLEMATIC_CHESTS: List;
    static INSTANCE: ILootrAPI;
    static shouldDiscardIdAndOpeners: boolean;
    static award(provider: ILootrInfoProvider, player: ServerPlayer): void;
    static award(id: UUID, player: ServerPlayer): void;
    static canBrushablesSelfSupport(): boolean;
    static canDestroyOrBreak(player: Player): boolean;
    static canItemFramesSelfSupport(): boolean;
    static clearPlayerLoot(entity: ServerPlayer): boolean;
    static clearPlayerLoot(id: UUID): boolean;
    static get blockEntityPostProcessors(): Post[];
    static get blockEntityPreProcessors(): Pre[];
    static get chatStyle(): Style;
    static get currentTicks(): number;
    static get decayDimensions(): Set<ResourceKey<Level>>;
    static get decayStyle(): Style;
    static get decayValue(): number;
    static get decayWhitelist(): Set<ResourceKey<LootTable>>;
    static get dimensionBlacklist(): Set<ResourceKey<Level>>;
    static get dimensionWhitelist(): Set<ResourceKey<Level>>;
    static get entityPostProcessors(): noobanidus_mods_lootr_common_api_processor_ilootrentityprocessor_Post[];
    static get entityPreProcessors(): noobanidus_mods_lootr_common_api_processor_ilootrentityprocessor_Pre[];
    static get fileSaveMode(): SaveMode;
    static get filters(): ILootrFilter[];
    static get invalidStyle(): Style;
    static get lootModidBlacklist(): Set<string>;
    static get lootTableBlacklist(): Set<ResourceKey<LootTable>>;
    static get modidDecayWhitelist(): Set<string>;
    static get modidDimensionBlacklist(): Set<string>;
    static get modidDimensionWhitelist(): Set<string>;
    static get notificationDelay(): number;
    static get playerIds(): Set<UUID>;
    static get refreshDimensions(): Set<ResourceKey<Level>>;
    static get refreshModids(): Set<string>;
    static get refreshStyle(): Style;
    static get refreshValue(): number;
    static get refreshWhitelist(): Set<ResourceKey<LootTable>>;
    static get server(): MinecraftServer;
    static get textureType(): ClientTextureType;
    static getAdapter<T>(type: T): ILootrDataAdapter<T>;
    static getAnalogOutputSignal(pBlockState: BlockState, pLevel: Level, pPos: BlockPos, defaultSignal: number): number;
    static getData(provider: ILootrInfoProvider): ILootrSavedData;
    static getDecorationsAdapter(blockEntity: BlockEntity): PotDecorationsAdapter;
    static getDecorationsAdapter(stack: ItemStack): PotDecorationsAdapter;
    static getDecorationsAdapter(container: DataComponentInput): PotDecorationsAdapter;
    static getDestroyProgress(state: BlockState, player: Player, level: BlockGetter, position: BlockPos, defaultProgress: number): number;
    static getExplosionResistance(block: Block, defaultResistance: number): number;
    static getInvalidTableComponent(lootTable: ResourceKey<LootTable>): Component;
    static getInventory(provider: ILootrInfoProvider, player: ServerPlayer, filler: LootFiller): ILootrInventory;
    static getInventory(provider: ILootrInfoProvider, player: ServerPlayer, builder: MenuBuilder): ILootrInventory;
    static getInventory(provider: ILootrInfoProvider, player: ServerPlayer): ILootrInventory;
    static getInventory(provider: ILootrInfoProvider, player: ServerPlayer, filler: LootFiller, builder: MenuBuilder): ILootrInventory;
    static getItemFrameAdapter<T>(type: T): ILootrItemFrameAdapter<T>;
    static getLootSeed(seed: number): number;
    static getRemainingDecayValue(provider: ILootrInfoProvider): number;
    static getRemainingRefreshValue(provider: ILootrInfoProvider): number;
    static getType(type: string): ILootrType;
    static handleProviderClientTick(provider: ILootrInfoProvider): void;
    static handleProviderOpen(provider: ILootrInfoProvider, player: ServerPlayer): void;
    static handleProviderSneak(provider: ILootrInfoProvider, player: ServerPlayer): void;
    static handleProviderTick(provider: ILootrInfoProvider): void;
    static isAwarded(provider: ILootrInfoProvider, player: ServerPlayer): boolean;
    static isAwarded(uuid: UUID, player: ServerPlayer): boolean;
    static isBlastImmune(): boolean;
    static isBlastResistant(): boolean;
    static isBreakDisabled(): boolean;
    static isBreakEnabled(): boolean;
    static isCustomTrapped(): boolean;
    static isDecayed(provider: ILootrInfoProvider): boolean;
    static isDecaying(provider: ILootrInfoProvider): boolean;
    static isDefaultTextures(): boolean;
    static isDimensionBlocked(dimension: ResourceKey<Level>): boolean;
    static isDisabled(): boolean;
    static isFakePlayer(player: Player): boolean;
    static isFakePlayerBreakEnabled(): boolean;
    static isLootTableBlacklisted(table: ResourceKey<LootTable>): boolean;
    static isMessageStylesEnabled(): boolean;
    static isNewTextures(): boolean;
    static isNotificationsEnabled(): boolean;
    static isOldTextures(): boolean;
    static isReady(): boolean;
    static isRefreshed(provider: ILootrInfoProvider): boolean;
    static isRefreshing(provider: ILootrInfoProvider): boolean;
    static isTaggedStructurePresent(level: ServerLevel, chunkPos: ChunkPos, tag: TagKey<Structure>, pos: BlockPos): boolean;
    static isVanillaTextures(): boolean;
    static isWorldBorderSafe(level: Level, pos: BlockPos): boolean;
    static isWorldBorderSafe(level: Level, pos: ChunkPos): boolean;
    static mc(path: string): ResourceLocation;
    static performPiecewiseCheck(): boolean;
    static playerDestroyed(level: Level, player: Player, blockPos: BlockPos, blockEntity: BlockEntity): void;
    static postProcess(level: ServerLevel, position: BlockPos, newBlockEntity: BlockEntity, newState: BlockState, lootTable: ResourceKey<LootTable>, lootTableSeed: number): void;
    static postProcess(level: ServerLevel, newBlockEntity: Entity, lootTable: ResourceKey<LootTable>, lootTableSeed: number): void;
    static preProcess(level: ServerLevel, position: BlockPos, oldBlockEntity: BlockEntity, newState: BlockState, lootTable: ResourceKey<LootTable>, lootTableSeed: number): void;
    static preProcess(level: ServerLevel, newBlockEntity: Entity, lootTable: ResourceKey<LootTable>, lootTableSeed: number): void;
    static refreshSections(): void;
    static removeDecayed(provider: ILootrInfoProvider): void;
    static removeRefreshed(provider: ILootrInfoProvider): void;
    static replacementBlockState(original: BlockState): BlockState;
    static reportUnresolvedTables(): boolean;
    static resolveBlockEntity<T extends BlockEntity>(blockEntity: T): ILootrBlockEntity;
    static resolveEntity<T extends Entity>(entity: T): ILootrEntity;
    static rl(path: string): ResourceLocation;
    static rl(namespace: string, path: string): ResourceLocation;
    static setDecaying(provider: ILootrInfoProvider): void;
    static setRefreshing(provider: ILootrInfoProvider): void;
    static shouldBypassSpawnProtection(): boolean;
    static shouldCheckWorldBorder(): boolean;
    static shouldConvertElytras(): boolean;
    static shouldConvertElytrasToChests(): boolean;
    static shouldConvertElytrasToItemFrames(): boolean;
    static shouldConvertMineshafts(): boolean;
    static shouldConvertStructureItemFrames(): boolean;
    static shouldDecayAll(): boolean;
    static shouldDiscard(): boolean;
    static shouldDisplayUnopenedParticles(): boolean;
    static shouldDropPlayerLoot(): boolean;
    static shouldNotify(remaining: number): boolean;
    static shouldPerformDecayWhileTicking(): boolean;
    static shouldPerformRefreshWhileTicking(): boolean;
    static shouldPowerComparators(): boolean;
    static shouldRefreshAll(): boolean;
    static shouldReplaceWhenDecayed(): boolean;
    static shouldStartDecayWhileTicking(): boolean;
    static shouldStartRefreshWhileTicking(): boolean;
    static shouldWarnNoLootTables(): boolean;
  }


  class LootrConstants {
    static readonly SHERDSAPI_POT_DECORATIONS: ResourceLocation;
    static readonly SHERDSAPI_SHERD_PATTERN: ResourceLocation;
    static readonly LOOTR_CHEST: ResourceLocation;
    static readonly LOOTR_TRAPPED_CHEST: ResourceLocation;
    static readonly LOOTR_SHULKER: ResourceLocation;
    static readonly LOOTR_BARREL: ResourceLocation;
    static readonly LOOTR_INVENTORY: ResourceLocation;
    static readonly LOOTR_CART: ResourceLocation;
    static readonly CHEST: ResourceLocation;
    static readonly TRAPPED_CHEST: ResourceLocation;
    static readonly SHULKER: ResourceLocation;
    static readonly SHULKER_BOX: ResourceLocation;
    static readonly BARREL: ResourceLocation;
    static readonly INVENTORY: ResourceLocation;
    static readonly MINECART: ResourceLocation;
    static readonly TROPHY: ResourceLocation;
    static readonly DECORATED_POT: ResourceLocation;
    static readonly BRUSHABLE_BLOCK: ResourceLocation;
    static readonly SUSPICIOUS_SAND: ResourceLocation;
    static readonly SUSPICIOUS_GRAVEL: ResourceLocation;
    static readonly ITEM_FRAME: ResourceLocation;
    static readonly UNOPENED_PARTICLE: ResourceLocation;
    static readonly SIMPLE: ResourceLocation;
    static readonly CAN_CONVERT: ResourceLocation;
    static readonly CAN_CONVERT_TAG: string;
    static readonly LOOTR_SPECIAL_CHEST: string;
    static readonly LOOTR_SPECIAL_BARREL: string;
    static readonly LOOTR_SPECIAL_TRAPPED_CHEST: string;
    static readonly LOOTR_SPECIAL_SHULKER: string;
    static readonly LOOTR_SPECIAL_INVENTORY: string;
    static readonly LOOTR_DATA_DIRECTORY: string;
    static readonly REGION_DIRECTORY: string;
    static readonly MCA_FILE_EXTENSION: string;
    static readonly CHEST_PROPERTIES: Properties;
    static readonly TRAPPED_CHEST_PROPERTIES: Properties;
    static readonly BARREL_PROPERTIES: Properties;
    static readonly INVENTORY_PROPERTIES: Properties;
    static readonly TROPHY_PROPERTIES: Properties;
    static readonly SHULKER_BOX_PROPERTIES: Properties;
    static readonly SUSPICIOUS_SAND_PROPERTIES: Properties;
    static readonly SUSPICIOUS_GRAVEL_PROPERTIES: Properties;
    static readonly DECORATED_POT_PROPERTIES: Properties;
  }


  class LootrOptional {
    static getBlockEntity(blockEntity: BlockEntity): ILootrBlockEntity;
  }


  class LootrTags {
  }


  class MenuBuilder {
    build(var1: number, var2: Inventory, var3: Container, var4: number): AbstractContainerMenu;
  }


  class NBTConstants {
    static readonly INSTANCE_ID: string;
    static readonly HAS_BEEN_OPENED: string;
    static readonly OPENERS: string;
    static readonly CUSTOM_SIZE: string;
    static readonly CUSTOM_INVENTORY: string;
  }


  class PlatformAPI {
    static INSTANCE: IPlatformAPI;
    static copyEntityData(entity1: AbstractMinecartContainer, entity2: AbstractMinecartContainer): void;
    static copyEntityData(adapter: ILootrDataAdapter<Entity>, entity1: Entity, entity2: ILootrEntity): void;
    static copyEntityData(adapter: ILootrItemFrameAdapter<Entity>, entity1: Entity, entity2: ILootrEntity): void;
    static copySpecificData(oldBlockEntity: BlockEntity): DataToCopy;
    static performBlockClose(blockEntity: ILootrBlockEntity, player: ServerPlayer): void;
    static performBlockClose(blockEntity: ILootrBlockEntity): void;
    static performBlockOpen(blockEntity: ILootrBlockEntity, player: ServerPlayer): void;
    static performBlockOpen(blockEntity: ILootrBlockEntity): void;
    static performCartClose(cart: ILootrCart, player: ServerPlayer): void;
    static performCartClose(cart: ILootrCart): void;
    static performCartOpen(cart: ILootrCart, player: ServerPlayer): void;
    static performCartOpen(cart: ILootrCart): void;
    static performEntityClose(entity: ILootrEntity, player: ServerPlayer): void;
    static performEntityClose(entity: ILootrEntity): void;
    static performEntityOpen(entity: ILootrEntity, player: ServerPlayer): void;
    static performEntityOpen(entity: ILootrEntity): void;
    static performPotBreak(lootrDecoratedPotBlockEntity: ILootrBlockEntity, player: ServerPlayer): void;
    static refreshPlayerSection(player: ServerPlayer): void;
    static restoreSpecificData(data: DataToCopy, newBlockEntity: BlockEntity): void;
    static shouldDoInitialSave(): boolean;
  }

}

declare module 'noobanidus.mods.lootr.common.api.client' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { Acceptor } from 'noobanidus.mods.lootr.common.api.client.ILootrFabricModelProvider';

  interface ClientTextureType extends Enum<ClientTextureType> {}
  class ClientTextureType extends Enum<ClientTextureType> {
    static readonly NEW: ClientTextureType;
    static readonly VANILLA: ClientTextureType;
    static readonly OLD: ClientTextureType;
    static valueOf(name: string): ClientTextureType;
    static values(): ClientTextureType[];
  }


  class ILootrFabricModelProvider {
    provideModels(var1: Acceptor): void;
  }

}

declare module 'noobanidus.mods.lootr.common.api.client.ILootrFabricModelProvider' {
  import { ResourceLocation } from 'net.minecraft.resources';

  class Acceptor {
    acceptBarrelModel(modelName: ResourceLocation, modelOpenedLocation: ResourceLocation, modelUnopenedLocation: ResourceLocation, modelVanillaLocation: ResourceLocation): void;
    acceptBrushableModel(var1: ResourceLocation, var2: ResourceLocation, var3: ResourceLocation, var4: ResourceLocation, var5: ResourceLocation, var6: ResourceLocation): void;
    acceptCustomModel(var1: ResourceLocation, var2: ResourceLocation, var3: ResourceLocation, var4: ResourceLocation): void;
  }

}

declare module 'noobanidus.mods.lootr.common.api.command' {
  import { Block } from 'net.minecraft.world.level.block';

  class ILootrCommandExtension {
    get block(): Block;
    get id(): string;
  }

}

declare module 'noobanidus.mods.lootr.common.api.config' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface SaveMode extends Enum<SaveMode> {}
  class SaveMode extends Enum<SaveMode> {
    static readonly ALWAYS: SaveMode;
    static readonly SMART: SaveMode;
    static readonly WHEN_OPENED: SaveMode;
    static fromString(name: string): SaveMode;
    toString(): string;
    static valueOf(name: string): SaveMode;
    static values(): SaveMode[];
  }

}

declare module 'noobanidus.mods.lootr.common.api.data' {
  import { SavedData } from 'net.minecraft.world.level.saveddata';
  import { Factory } from 'SavedData';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { UUID, Set, List } from 'java.util';
  import { UUIDPair } from 'noobanidus.mods.lootr.common.api.data.AdvancementData';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Container } from 'net.minecraft.world';
  import { LootFillerState } from 'noobanidus.mods.lootr.common.api.data.LootFiller';
  import { ResourceKey } from 'net.minecraft.resources';
  import { LootTable, LootParams } from 'net.minecraft.world.level.storage.loot';
  import { LootrInfoType } from 'noobanidus.mods.lootr.common.api.data.ILootrInfo';
  import { ILootrType, IClientOpeners, IRedirect, IOpeners, IMarkChanged } from 'noobanidus.mods.lootr.common.api';
  import { Block } from 'net.minecraft.world.level.block';
  import { EntityType, Entity } from 'net.minecraft.world.entity';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { BlockPos, NonNullList } from 'net.minecraft.core';
  import { Component } from 'net.minecraft.network.chat';
  import { Level } from 'net.minecraft.world.level';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { RandomizableContainerBlockEntity } from 'net.minecraft.world.level.block.entity';
  import { AbstractMinecartContainer } from 'net.minecraft.world.entity.vehicle';
  import { IContainerTrigger } from 'noobanidus.mods.lootr.common.api.advancement';
  import { ILootrInventory } from 'noobanidus.mods.lootr.common.api.data.inventory';
  import { Enum } from 'java.lang';
  import { Supplier } from 'java.util.function';

  interface AdvancementData extends SavedData {}
  class AdvancementData extends SavedData {
    static readonly FACTORY: Factory;
    add(first: UUID, second: UUID): void;
    add(pair: UUIDPair): void;
    contains(first: UUID, second: UUID): boolean;
    contains(pair: UUIDPair): boolean;
    static load(compound: CompoundTag, provider: Provider): AdvancementData;
    save(pCompound: CompoundTag, provider: Provider): CompoundTag;
  }


  interface DefaultBrushableLootFiller extends LootFiller {}
  class DefaultBrushableLootFiller extends LootFiller {
    static get instance(): DefaultBrushableLootFiller;
    unpackLootTable(provider: ILootrInfoProvider, player: Player, inventory: Container): void;
  }


  interface DefaultLootFiller extends LootFiller {}
  class DefaultLootFiller extends LootFiller {
    static get fillerState(): LootFillerState;
    static get instance(): DefaultLootFiller;
    static performFill(provider: ILootrInfoProvider, player: Player, lootTableKey: ResourceKey<LootTable>, lootTable: LootTable, container: Container, parameters: LootParams, seed: number): void;
    static set fillerState(newState: LootFillerState);
    unpackLootTable(provider: ILootrInfoProvider, player: Player, inventory: Container): void;
  }


  interface EmptyLootFiller extends LootFiller {}
  class EmptyLootFiller extends LootFiller {
    static readonly INSTANCE: EmptyLootFiller;
    unpackLootTable(provider: ILootrInfoProvider, player: Player, inventory: Container): void;
  }


  class ILootrInfo {
    static readonly WARNED_CLASSES: Set;
    buildInitialInventory(): NonNullList<ItemStack>;
    canBeMarkedUnopened(): boolean;
    canDecay(): boolean;
    canDropContentsWhenBroken(): boolean;
    canPlayerOpen(player: ServerPlayer): boolean;
    canRefresh(): boolean;
    static generateInfoKey(id: UUID): string;
    get defaultFiller(): LootFiller;
    get defaultLevel(): Level;
    get infoBlockType(): LootrBlockType;
    get infoContainer(): Container;
    get infoContainerSize(): number;
    get infoDimension(): ResourceKey<Level>;
    get infoDisplayName(): Component;
    get infoKey(): string;
    get infoLevel(): Level;
    get infoLootSeed(): number;
    get infoLootTable(): ResourceKey<LootTable>;
    get infoNewType(): ILootrType;
    get infoPos(): BlockPos;
    get infoReferenceInventory(): NonNullList<ItemStack>;
    get infoType(): LootrInfoType;
    get infoUUID(): UUID;
    get infoVec(): Vec3;
    get replacementBlock(): Block;
    get replacementEntity(): EntityType<any>;
    hasBeenOpened(): boolean;
    informPlayerCannotOpen(player: ServerPlayer): void;
    isEntity(): boolean;
    isInfoReferenceInventory(): boolean;
    isPhysicallyOpen(): boolean;
    static loadInfoFromTag(tag: CompoundTag, provider: Provider): ILootrInfo;
    saveInfoToTag(tag: CompoundTag, provider: Provider): void;
  }


  interface ILootrInfoProvider extends ILootrInfo, IClientOpeners {}
  class ILootrInfoProvider extends ILootrInfo {
    get actualOpeners(): Set<UUID>;
    get particleCenter(): Vec3;
    get particleXBounds(): number[];
    get particleYOffset(): number;
    get particleZBounds(): number[];
    get physicalOpenerCount(): number;
    get trigger(): IContainerTrigger;
    get visualOpeners(): Set<UUID>;
    hasLootAvailable(player: ServerPlayer): boolean;
    markDataChanged(): void;
    static of(pos: BlockPos, level: Level): ILootrInfoProvider;
    static of(blockEntity: RandomizableContainerBlockEntity, id: UUID): ILootrInfoProvider;
    static of(blockEntity: RandomizableContainerBlockEntity, id: UUID, customInventory: NonNullList<ItemStack>): ILootrInfoProvider;
    static of(minecart: AbstractMinecartContainer): ILootrInfoProvider;
    static of(id: UUID, pos: BlockPos, containerSize: number, lootTable: ResourceKey<LootTable>, lootSeed: number, displayName: Component, dimension: ResourceKey<Level>, customInventory: NonNullList<ItemStack>, type: LootrInfoType, blockType: LootrBlockType): ILootrInfoProvider;
    static of(id: UUID, pos: BlockPos, containerSize: number, lootTable: ResourceKey<LootTable>, lootSeed: number, displayName: Component, dimension: ResourceKey<Level>, customInventory: NonNullList<ItemStack>, type: ILootrType): ILootrInfoProvider;
    performClose(player: ServerPlayer): void;
    performClose(): void;
    performDecay(): void;
    performOpen(player: ServerPlayer): void;
    performOpen(): void;
    performRefresh(): void;
    performTrigger(player: ServerPlayer): void;
    performUpdate(player: ServerPlayer): void;
    performUpdate(): void;
  }


  interface ILootrSavedData extends IRedirect<ILootrInfo>, ILootrInfo, IOpeners, IMarkChanged {}
  class ILootrSavedData extends IRedirect<ILootrInfo> {
    clearInventories(player: ServerPlayer): boolean;
    clearInventories(var1: UUID): boolean;
    createInventory(var1: ILootrInfoProvider, var2: ServerPlayer, var3: LootFiller): ILootrInventory;
    get infoBlockType(): LootrBlockType;
    get infoContainer(): Container;
    get infoContainerSize(): number;
    get infoDimension(): ResourceKey<Level>;
    get infoDisplayName(): Component;
    get infoKey(): string;
    get infoLevel(): Level;
    get infoLootSeed(): number;
    get infoLootTable(): ResourceKey<LootTable>;
    get infoNewType(): ILootrType;
    get infoPos(): BlockPos;
    get infoReferenceInventory(): NonNullList<ItemStack>;
    get infoType(): LootrInfoType;
    get infoUUID(): UUID;
    get infoVec(): Vec3;
    getInventory(player: ServerPlayer): ILootrInventory;
    getInventory(var1: UUID): ILootrInventory;
    getOrCreateInventory(provider: ILootrInfoProvider, player: ServerPlayer, filler: LootFiller): ILootrInventory;
    isInfoReferenceInventory(): boolean;
    refresh(): void;
    update(var1: ILootrInfo): void;
  }


  class LootFiller {
    fill(provider: ILootrInfoProvider, player: Player, lootTableKey: ResourceKey<LootTable>, lootTable: LootTable, container: Container, parameters: LootParams, seed: number): void;
    unpackLootTable(var1: ILootrInfoProvider, var2: Player, var3: Container): void;
  }


  interface LootrBlockType extends Enum<LootrBlockType> {}
  class LootrBlockType extends Enum<LootrBlockType> {
    static readonly CHEST: LootrBlockType;
    static readonly TRAPPED_CHEST: LootrBlockType;
    static readonly BARREL: LootrBlockType;
    static readonly SHULKER: LootrBlockType;
    static readonly INVENTORY: LootrBlockType;
    static readonly ENTITY: LootrBlockType;
    get block(): Block;
    static valueOf(name: string): LootrBlockType;
    static values(): LootrBlockType[];
  }


  interface SimpleLootrEntityInstance extends SimpleLootrInstance {}
  class SimpleLootrEntityInstance extends SimpleLootrInstance {
    constructor(entityInstance: Entity, visualOpenersSupplier: Supplier<Set<UUID>>, size: number);
    get infoUUID(): UUID;
  }


  class SimpleLootrInstance {
    constructor(visualOpenersSupplier: Supplier<Set<UUID>>, size: number);
    fillUpdateTag(result: CompoundTag, provider: Provider, isClientSide: boolean): void;
    get clientOpeners(): Set<UUID>;
    get infoContainerSize(): number;
    get infoKey(): string;
    get infoUUID(): UUID;
    get items(): NonNullList<ItemStack>;
    hasBeenOpened(): boolean;
    isClientOpened(): boolean;
    isSavingToItem(): boolean;
    loadAdditional(compound: CompoundTag, provder: Provider): void;
    saveAdditional(compound: CompoundTag, provider: Provider, isClientSide: boolean): void;
    setClientOpened(opened: boolean): void;
    setHasBeenOpened(): void;
    setSavingToItem(saving: boolean): void;
  }


  interface TickingData extends SavedData {}
  class TickingData extends SavedData {
    static readonly FACTORY: Factory;
    constructor();
    getValue(id: UUID): number;
    isComplete(id: UUID): boolean;
    static load(pCompound: CompoundTag, provider: Provider): TickingData;
    remove(id: UUID): void;
    save(pCompound: CompoundTag, provider: Provider): CompoundTag;
    setValue(id: UUID, decayAmount: number): void;
    tick(): void;
  }

}

declare module 'noobanidus.mods.lootr.common.api.data.AdvancementData' {
  import { UUID } from 'java.util';
  import { Provider } from 'HolderLookup';
  import { CompoundTag } from 'net.minecraft.nbt';

  class UUIDPair {
    constructor(first: UUID, second: UUID);
    deserializeNBT(provider: Provider, nbt: CompoundTag): void;
    equals(o: any): boolean;
    static fromNBT(provider: Provider, tag: CompoundTag): UUIDPair;
    get first(): UUID;
    get second(): UUID;
    hashCode(): number;
    serializeNBT(provider: Provider): CompoundTag;
  }

}

declare module 'noobanidus.mods.lootr.common.api.data.blockentity' {
  import { ILootrInfoProvider } from 'noobanidus.mods.lootr.common.api.data';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { LootrInfoType } from 'noobanidus.mods.lootr.common.api.data.ILootrInfo';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { ResourceKey } from 'net.minecraft.resources';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';

  interface ILootrBlockEntity extends ILootrInfoProvider {}
  class ILootrBlockEntity extends ILootrInfoProvider {
    asBlockEntity(): BlockEntity;
    canPlayerOpen(player: ServerPlayer): boolean;
    defaultTick(level: Level, pos: BlockPos, state: BlockState): void;
    get infoType(): LootrInfoType;
    hasLootTable(): boolean;
    informPlayerCannotOpen(player: ServerPlayer): void;
    performClose(player: ServerPlayer): void;
    performClose(): void;
    performDecay(): void;
    performOpen(player: ServerPlayer): void;
    performOpen(): void;
    performUpdate(player: ServerPlayer): void;
    performUpdate(): void;
    setLootTableInternal(lootTable: ResourceKey<LootTable>, seed: number): void;
    static ticker<T extends BlockEntity>(level: Level, pos: BlockPos, state: BlockState, blockEntity: T): void;
    updatePacketViaForce(): void;
    updatePacketViaForce(entity: BlockEntity): void;
  }


  class LockMessageSuppression {
    static isSuppressed(): boolean;
    static setSuppressableLock(suppress: boolean): void;
  }

}

declare module 'noobanidus.mods.lootr.common.api.data.entity' {
  import { ILootrInfoProvider } from 'noobanidus.mods.lootr.common.api.data';
  import { LootrInfoType } from 'noobanidus.mods.lootr.common.api.data.ILootrInfo';
  import { Entity } from 'net.minecraft.world.entity';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Vec3 } from 'net.minecraft.world.phys';

  interface ILootrCart extends ILootrEntity {}
  class ILootrCart extends ILootrEntity {
  }


  interface ILootrEntity extends ILootrInfoProvider {}
  class ILootrEntity extends ILootrInfoProvider {
    asEntity(): Entity;
    get infoType(): LootrInfoType;
    get particleCenter(): Vec3;
    performClose(player: ServerPlayer): void;
    performClose(): void;
    performDecay(): void;
    performOpen(player: ServerPlayer): void;
    performOpen(): void;
  }

}

declare module 'noobanidus.mods.lootr.common.api.data.ILootrInfo' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface LootrInfoType extends Enum<LootrInfoType> {}
  class LootrInfoType extends Enum<LootrInfoType> {
    static readonly CONTAINER_BLOCK_ENTITY: LootrInfoType;
    static readonly CONTAINER_ENTITY: LootrInfoType;
    static valueOf(name: string): LootrInfoType;
    static values(): LootrInfoType[];
  }

}

declare module 'noobanidus.mods.lootr.common.api.data.inventory' {
  import { Container, MenuProvider } from 'net.minecraft.world';
  import { ILootrInfo, ILootrSavedData } from 'noobanidus.mods.lootr.common.api.data';
  import { Component } from 'net.minecraft.network.chat';
  import { NonNullList } from 'net.minecraft.core';
  import { ItemStack } from 'net.minecraft.world.item';
  import { MenuBuilder } from 'noobanidus.mods.lootr.common.api';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';

  interface ILootrInventory extends Container, MenuProvider {}
  class ILootrInventory extends Container {
    get displayName(): Component;
    get info(): ILootrInfo;
    get inventoryContents(): NonNullList<ItemStack>;
    saveToTag(var1: Provider): CompoundTag;
    set info(var1: ILootrSavedData);
    setMenuBuilder(var1: MenuBuilder): void;
  }

}

declare module 'noobanidus.mods.lootr.common.api.filter' {
  import { ObjectArrayList } from 'it.unimi.dsi.fastutil.objects';
  import { ItemStack } from 'net.minecraft.world.item';
  import { LootFillerState } from 'noobanidus.mods.lootr.common.api.data.LootFiller';
  import { LootContext } from 'net.minecraft.world.level.storage.loot';
  import { RandomSource } from 'net.minecraft.util';
  import { List } from 'java.util';

  class ILootrFilter {
    get name(): string;
    get priority(): number;
    mutate(var1: ObjectArrayList<ItemStack>, var2: LootFillerState, var3: LootContext, var4: RandomSource): boolean;
    mutate(toMutate: ObjectArrayList<ItemStack>, state: LootFillerState, context: LootContext): boolean;
  }


  class ILootrFilterProvider {
    get filters(): ILootrFilter[];
  }

}

declare module 'noobanidus.mods.lootr.common.api.LootrTags' {
  import { LootrTags } from 'noobanidus.mods.lootr.common.api';
  import { TagKey } from 'net.minecraft.tags';
  import { BlockEntity as net_minecraft_world_level_block_entity_BlockEntity, BlockEntityType } from 'net.minecraft.world.level.block.entity';

  interface Structure extends LootrTags {}
  class Structure extends LootrTags {
    static STRUCTURE_BLACKLIST: TagKey;
    static STRUCTURE_WHITELIST: TagKey;
    static REFRESH_STRUCTURES: TagKey;
    static DECAY_STRUCTURES: TagKey;
  }


  interface BlockEntity extends LootrTags {}
  class BlockEntity extends LootrTags {
    static LOOTR_OBJECT: TagKey;
    static TRAPPED: TagKey;
    static CUSTOM_INELIGIBLE: TagKey;
    static CONVERT_BLACKLIST: TagKey;
    static isTagged(blockEntity: net_minecraft_world_level_block_entity_BlockEntity, tag: TagKey<BlockEntityType<any>>): boolean;
  }


  interface Entity extends LootrTags {}
  class Entity extends LootrTags {
    static CONVERT_CARTS: TagKey;
    static CONVERT_ITEM_FRAMES: TagKey;
    static CONVERT_ENTITIES: TagKey;
    static CONVERT_BLACKLIST: TagKey;
    static MINECARTS: TagKey;
    static ITEM_FRAMES: TagKey;
    static CONTAINERS: TagKey;
  }


  interface Items extends LootrTags {}
  class Items extends LootrTags {
    static CHESTS: TagKey;
    static TRAPPED_CHESTS: TagKey;
    static SHULKERS: TagKey;
    static BARRELS: TagKey;
    static GRAVELS: TagKey;
    static SANDS: TagKey;
    static POTS: TagKey;
    static CONTAINERS: TagKey;
    static ITEM_FRAME_CONVERT_BLACKLIST: TagKey;
  }


  interface Blocks extends LootrTags {}
  class Blocks extends LootrTags {
    static readonly CONVERT_CHESTS: TagKey;
    static readonly CONVERT_TRAPPED_CHESTS: TagKey;
    static readonly CONVERT_SHULKERS: TagKey;
    static readonly CONVERT_BARRELS: TagKey;
    static readonly CONVERT_GRAVELS: TagKey;
    static readonly CONVERT_SANDS: TagKey;
    static readonly CONVERT_POTS: TagKey;
    static readonly CONVERT_BLOCK: TagKey;
    static readonly CONVERT_BLACKLIST: TagKey;
    static readonly CHESTS: TagKey;
    static readonly TRAPPED_CHESTS: TagKey;
    static readonly SHULKERS: TagKey;
    static readonly BARRELS: TagKey;
    static readonly GRAVELS: TagKey;
    static readonly SANDS: TagKey;
    static readonly POTS: TagKey;
    static readonly CONTAINERS: TagKey;
    static readonly CUSTOM_ELIGIBLE: TagKey;
    static readonly CATS_CAN_BLOCK: TagKey;
    static readonly NON_BLOCKING: TagKey;
    static readonly INTERACT_WHITELIST_BLOCKS: TagKey;
    static readonly INTERACT_WHITELIST: TagKey;
  }

}

declare module 'noobanidus.mods.lootr.common.api.network' {
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';

  interface ILootrPacket extends CustomPacketPayload {}
  class ILootrPacket extends CustomPacketPayload {
  }

}

declare module 'noobanidus.mods.lootr.common.api.processor' {
  import { ServerLevel } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { ResourceKey } from 'net.minecraft.resources';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';

  class ILootrBlockEntityProcessor {
  }


  class ILootrEntityProcessor {
  }


  class ILootrProcessor<T = any> {
    process(var1: ServerLevel, var2: BlockPos, var3: T, var4: BlockState, var5: ResourceKey<LootTable>, var6: number): void;
  }

}

declare module 'noobanidus.mods.lootr.common.api.processor.ILootrBlockEntityProcessor' {
  import { Post as noobanidus_mods_lootr_common_api_processor_ilootrprocessor_Post, Pre as noobanidus_mods_lootr_common_api_processor_ilootrprocessor_Pre } from 'noobanidus.mods.lootr.common.api.processor.ILootrProcessor';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';

  interface Post extends noobanidus_mods_lootr_common_api_processor_ilootrprocessor_Post<BlockEntity> {}
  class Post extends noobanidus_mods_lootr_common_api_processor_ilootrprocessor_Post<BlockEntity> {
  }


  interface Pre extends noobanidus_mods_lootr_common_api_processor_ilootrprocessor_Pre<BlockEntity> {}
  class Pre extends noobanidus_mods_lootr_common_api_processor_ilootrprocessor_Pre<BlockEntity> {
  }

}

declare module 'noobanidus.mods.lootr.common.api.processor.ILootrEntityProcessor' {
  import { Post as noobanidus_mods_lootr_common_api_processor_ilootrprocessor_Post, Pre as noobanidus_mods_lootr_common_api_processor_ilootrprocessor_Pre } from 'noobanidus.mods.lootr.common.api.processor.ILootrProcessor';
  import { Entity } from 'net.minecraft.world.entity';

  interface Post extends noobanidus_mods_lootr_common_api_processor_ilootrprocessor_Post<Entity> {}
  class Post extends noobanidus_mods_lootr_common_api_processor_ilootrprocessor_Post<Entity> {
  }


  interface Pre extends noobanidus_mods_lootr_common_api_processor_ilootrprocessor_Pre<Entity> {}
  class Pre extends noobanidus_mods_lootr_common_api_processor_ilootrprocessor_Pre<Entity> {
  }

}

declare module 'noobanidus.mods.lootr.common.api.processor.ILootrProcessor' {
  class Pre<T = any> {
  }


  class Post<T = any> {
  }

}

declare module 'noobanidus.mods.lootr.common.api.registry' {
  import { Block } from 'net.minecraft.world.level.block';
  import { Item, CreativeModeTab } from 'net.minecraft.world.item';
  import { EntityType } from 'net.minecraft.world.entity';
  import { ItemFrame } from 'net.minecraft.world.entity.decoration';
  import { BlockEntityType, ChestBlockEntity } from 'net.minecraft.world.level.block.entity';
  import { IAdvancementTrigger, IContainerTrigger, ILootedStatTrigger } from 'noobanidus.mods.lootr.common.api.advancement';
  import { LootItemConditionType } from 'net.minecraft.world.level.storage.loot.predicates';
  import { Stat } from 'net.minecraft.stats';
  import { SimpleParticleType } from 'net.minecraft.core.particles';
  import { LootrConstants } from 'noobanidus.mods.lootr.common.api';
  import { Properties } from 'BlockBehaviour';

  class ILootrRegistry {
    get advancementTrigger(): IAdvancementTrigger;
    get barrelBlock(): Block;
    get barrelBlockEntity(): BlockEntityType<any>;
    get barrelItem(): Item;
    get barrelTrigger(): IContainerTrigger;
    get brushableBlockEntity(): BlockEntityType<any>;
    get cartTrigger(): IContainerTrigger;
    get chestBlock(): Block;
    get chestBlockEntity(): BlockEntityType<ChestBlockEntity>;
    get chestItem(): Item;
    get chestTrigger(): IContainerTrigger;
    get decoratedPotBlock(): Block;
    get decoratedPotBlockEntity(): BlockEntityType<any>;
    get decoratedPotItem(): Item;
    get gravelTrigger(): IContainerTrigger;
    get inventoryBlock(): Block;
    get inventoryBlockEntity(): BlockEntityType<ChestBlockEntity>;
    get inventoryItem(): Item;
    get itemFrame(): EntityType<ItemFrame>;
    get itemFrameTrigger(): IContainerTrigger;
    get lootCount(): LootItemConditionType;
    get lootedStat(): Stat<any>;
    get minecart(): EntityType<any>;
    get potTrigger(): IContainerTrigger;
    get sandTrigger(): IContainerTrigger;
    get shulker(): Block;
    get shulkerBlock(): Block;
    get shulkerBlockEntity(): BlockEntityType<any>;
    get shulkerItem(): Item;
    get shulkerTrigger(): IContainerTrigger;
    get statTrigger(): ILootedStatTrigger;
    get suspiciousGravelBlock(): Block;
    get suspiciousGravelItem(): Item;
    get suspiciousSandBlock(): Block;
    get suspiciousSandItem(): Item;
    get tab(): CreativeModeTab;
    get trappedChestBlock(): Block;
    get trappedChestBlockEntity(): BlockEntityType<ChestBlockEntity>;
    get trappedChestItem(): Item;
    get trophyBlock(): Block;
    get trophyItem(): Item;
    get unopenedParticleType(): SimpleParticleType;
  }


  interface LootrProperties extends LootrConstants {}
  class LootrProperties extends LootrConstants {
    static readonly CHEST_PROPERTIES: Properties;
    static readonly BARREL_PROPERTIES: Properties;
    static readonly TRAPPED_CHEST_PROPERTIES: Properties;
    static readonly SHULKER_BOX_PROPERTIES: Properties;
    static readonly SUSPICIOUS_SAND_PROPERTIES: Properties;
    static readonly SUSPICIOUS_GRAVEL_PROPERTIES: Properties;
    static readonly DECORATED_POT_PROPERTIES: Properties;
  }


  class LootrRegistry {
    static INSTANCE: ILootrRegistry;
    static get advancementTrigger(): IAdvancementTrigger;
    static get barrelBlock(): Block;
    static get barrelBlockEntity(): BlockEntityType<any>;
    static get barrelItem(): Item;
    static get barrelTrigger(): IContainerTrigger;
    static get brushableBlockEntity(): BlockEntityType<any>;
    static get cartTrigger(): IContainerTrigger;
    static get chestBlock(): Block;
    static get chestBlockEntity(): BlockEntityType<ChestBlockEntity>;
    static get chestItem(): Item;
    static get chestTrigger(): IContainerTrigger;
    static get decoratedPotBlock(): Block;
    static get decoratedPotBlockEntity(): BlockEntityType<any>;
    static get decoratedPotItem(): Item;
    static get gravelTrigger(): IContainerTrigger;
    static get inventoryBlock(): Block;
    static get inventoryBlockEntity(): BlockEntityType<ChestBlockEntity>;
    static get inventoryItem(): Item;
    static get itemFrame(): EntityType<ItemFrame>;
    static get itemFrameTrigger(): IContainerTrigger;
    static get lootCount(): LootItemConditionType;
    static get lootedStat(): Stat<any>;
    static get minecart(): EntityType<any>;
    static get potTrigger(): IContainerTrigger;
    static get sandTrigger(): IContainerTrigger;
    static get shulkerBlock(): Block;
    static get shulkerBlockEntity(): BlockEntityType<any>;
    static get shulkerItem(): Item;
    static get shulkerTrigger(): IContainerTrigger;
    static get statTrigger(): ILootedStatTrigger;
    static get suspiciousGravelBlock(): Block;
    static get suspiciousGravelItem(): Item;
    static get suspiciousSandBlock(): Block;
    static get suspiciousSandItem(): Item;
    static get tab(): CreativeModeTab;
    static get trappedChestBlock(): Block;
    static get trappedChestBlockEntity(): BlockEntityType<ChestBlockEntity>;
    static get trappedChestItem(): Item;
    static get trophyBlock(): Block;
    static get trophyItem(): Item;
    static get unopenedParticleType(): SimpleParticleType;
    static isReady(): boolean;
  }

}

declare module 'noobanidus.mods.lootr.common.api.replacement' {
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Property } from 'net.minecraft.world.level.block.state.properties';
  import { Comparable } from 'java.lang';
  import { Function } from 'java.util.function';
  import { Block } from 'net.minecraft.world.level.block';
  import { TagKey } from 'net.minecraft.tags';

  class BlockReplacementMap {
    clear(): void;
    getReplacement(state: BlockState): BlockState;
    register(provider: ILootrBlockReplacementProvider): void;
    static safeReplace<V extends Comparable<V>>(state: BlockState, original: BlockState, property: Property<V>): BlockState;
    sort(): void;
  }


  interface ILootrBlockReplacementProvider extends Function<Block, Block> {}
  class ILootrBlockReplacementProvider extends Function<Block, Block> {
    apply(block: Block): Block;
    copyTypeSpecificProperties(from: BlockState, to: BlockState): BlockState;
    get applicableTag(): TagKey<Block>;
    get block(): Block;
    get priority(): number;
  }

}

declare module 'noobanidus.mods.lootr.common.block.entity' {
  import { BlockEntity, RandomizableContainerBlockEntity, ChestBlockEntity } from 'net.minecraft.world.level.block.entity';
  import { Level, ChunkPos, BlockGetter } from 'net.minecraft.world.level';
  import { MinecraftServer } from 'net.minecraft.server';
  import { ILootrBlockEntity } from 'noobanidus.mods.lootr.common.api.data.blockentity';
  import { BlockPos, NonNullList, Direction } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { LootrBlockType } from 'noobanidus.mods.lootr.common.api.data';
  import { ILootrType, IBrushable, PotDecorationsAdapter } from 'noobanidus.mods.lootr.common.api';
  import { UUID, Set } from 'java.util';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ClientboundBlockEntityDataPacket } from 'net.minecraft.network.protocol.game';
  import { ResourceKey } from 'net.minecraft.resources';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';
  import { Component } from 'net.minecraft.network.chat';
  import { IContainerTrigger } from 'noobanidus.mods.lootr.common.api.advancement';
  import { ServerLevel, ServerPlayer } from 'net.minecraft.server.level';
  import { RandomizableContainer } from 'net.minecraft.world';
  import { BlockContainerSingleItem } from 'ContainerSingleItem';
  import { WobbleStyle } from 'DecoratedPotBlockEntity';
  import { AnimationStatus } from 'ShulkerBoxBlockEntity';
  import { AABB } from 'net.minecraft.world.phys';

  class BlockEntityTicker {
    static addEntity(entity: BlockEntity, level: Level, chunkPos: ChunkPos): void;
    static isValidEntityFull(entity: BlockEntity): boolean;
    static onServerTick(server: MinecraftServer): void;
  }


  interface LootrBarrelBlockEntity extends ILootrBlockEntity, RandomizableContainerBlockEntity {}
  class LootrBarrelBlockEntity extends ILootrBlockEntity {
    constructor(pWorldPosition: BlockPos, pBlockState: BlockState);
    get clientOpeners(): Set<UUID>;
    get containerSize(): number;
    get infoBlockType(): LootrBlockType;
    get infoContainerSize(): number;
    get infoDimension(): ResourceKey<Level>;
    get infoDisplayName(): Component;
    get infoKey(): string;
    get infoLevel(): Level;
    get infoLootSeed(): number;
    get infoLootTable(): ResourceKey<LootTable>;
    get infoNewType(): ILootrType;
    get infoPos(): BlockPos;
    get infoReferenceInventory(): NonNullList<ItemStack>;
    get infoUUID(): UUID;
    get particleYOffset(): number;
    get physicalOpenerCount(): number;
    get trigger(): IContainerTrigger;
    get updatePacket(): ClientboundBlockEntityDataPacket;
    getUpdateTag(provider: Provider): CompoundTag;
    hasBeenOpened(): boolean;
    isClientOpened(): boolean;
    isInfoReferenceInventory(): boolean;
    isPhysicallyOpen(): boolean;
    loadAdditional(compound: CompoundTag, provider: Provider): void;
    markChanged(): void;
    recheckOpen(): void;
    saveToItem(itemstack: ItemStack, provider: Provider): void;
    setClientOpened(opened: boolean): void;
    startOpen(pPlayer: Player): void;
    stopOpen(pPlayer: Player): void;
    unpackLootTable(player: Player): void;
  }


  interface LootrBrushableBlockEntity extends ILootrBlockEntity, IBrushable, BlockEntity {}
  class LootrBrushableBlockEntity extends ILootrBlockEntity {
    constructor(blockPos: BlockPos, blockState: BlockState);
    IBrushable$brush(l: number, player: Player, direction: Direction): boolean;
    IBrushable$checkReset(): void;
    static fall(level: ServerLevel, blockPos: BlockPos, blockState: BlockState, brushableBlockEntity: LootrBrushableBlockEntity): void;
    get brushingPlayer(): Player;
    get clientOpeners(): Set<UUID>;
    get hitDirection(): Direction;
    get infoBlockType(): LootrBlockType;
    get infoContainerSize(): number;
    get infoDimension(): ResourceKey<Level>;
    get infoDisplayName(): Component;
    get infoKey(): string;
    get infoLevel(): Level;
    get infoLootSeed(): number;
    get infoLootTable(): ResourceKey<LootTable>;
    get infoNewType(): ILootrType;
    get infoPos(): BlockPos;
    get infoReferenceInventory(): NonNullList<ItemStack>;
    get infoUUID(): UUID;
    get item(): ItemStack;
    get trigger(): IContainerTrigger;
    get updatePacket(): ClientboundBlockEntityDataPacket;
    getItem(player: Player): ItemStack;
    getUpdateTag(provider: Provider): CompoundTag;
    hasBeenOpened(): boolean;
    isBrushingPlayer(player: Player): boolean;
    isClientOpened(): boolean;
    isInfoReferenceInventory(): boolean;
    isPhysicallyOpen(): boolean;
    markChanged(): void;
    removeComponentsFromTag(compoundTag: CompoundTag): void;
    setClientOpened(opened: boolean): void;
    setLootTableInternal(lootTable: ResourceKey<LootTable>, seed: number): void;
  }


  interface LootrChestBlockEntity extends ILootrBlockEntity, ChestBlockEntity {}
  class LootrChestBlockEntity extends ILootrBlockEntity {
    constructor(pWorldPosition: BlockPos, pBlockState: BlockState);
    defaultTick(level: Level, pos: BlockPos, state: BlockState): void;
    get clientOpeners(): Set<UUID>;
    get infoBlockType(): LootrBlockType;
    get infoContainerSize(): number;
    get infoDimension(): ResourceKey<Level>;
    get infoDisplayName(): Component;
    get infoKey(): string;
    get infoLevel(): Level;
    get infoLootSeed(): number;
    get infoLootTable(): ResourceKey<LootTable>;
    get infoNewType(): ILootrType;
    get infoPos(): BlockPos;
    get infoReferenceInventory(): NonNullList<ItemStack>;
    get infoUUID(): UUID;
    get physicalOpenerCount(): number;
    get trigger(): IContainerTrigger;
    get updatePacket(): ClientboundBlockEntityDataPacket;
    static getOpenCount(pLevel: BlockGetter, pPos: BlockPos): number;
    getOpenNess(pPartialTicks: number): number;
    getUpdateTag(provider: Provider): CompoundTag;
    hasBeenOpened(): boolean;
    isClientOpened(): boolean;
    isInfoReferenceInventory(): boolean;
    isPhysicallyOpen(): boolean;
    loadAdditional(compound: CompoundTag, provider: Provider): void;
    markChanged(): void;
    recheckOpen(): void;
    saveToItem(itemstack: ItemStack, provider: Provider): void;
    setClientOpened(opened: boolean): void;
    startOpen(pPlayer: Player): void;
    stopOpen(pPlayer: Player): void;
    triggerEvent(pId: number, pType: number): boolean;
    unpackLootTable(player: Player): void;
  }


  interface LootrDecoratedPotBlockEntity extends RandomizableContainer, BlockContainerSingleItem, ILootrBlockEntity, BlockEntity {}
  class LootrDecoratedPotBlockEntity extends RandomizableContainer {
    wobbleStartedAtTick: number;
    lastWobbleStyle: WobbleStyle;
    constructor(blockPos: BlockPos, blockState: BlockState);
    dropContent(player: ServerPlayer): boolean;
    get clientOpeners(): Set<UUID>;
    get containerBlockEntity(): BlockEntity;
    get decorations(): PotDecorationsAdapter;
    get direction(): Direction;
    get infoBlockType(): LootrBlockType;
    get infoContainerSize(): number;
    get infoDimension(): ResourceKey<Level>;
    get infoDisplayName(): Component;
    get infoKey(): string;
    get infoLevel(): Level;
    get infoLootSeed(): number;
    get infoLootTable(): ResourceKey<LootTable>;
    get infoNewType(): ILootrType;
    get infoPos(): BlockPos;
    get infoReferenceInventory(): NonNullList<ItemStack>;
    get infoUUID(): UUID;
    get lootTable(): ResourceKey<LootTable>;
    get lootTableSeed(): number;
    get particleXBounds(): number[];
    get particleYOffset(): number;
    get particleZBounds(): number[];
    get potAsItem(): ItemStack;
    get theItem(): ItemStack;
    get trigger(): IContainerTrigger;
    get updatePacket(): ClientboundBlockEntityDataPacket;
    getUpdateTag(provider: Provider): CompoundTag;
    hasBeenOpened(): boolean;
    isClientOpened(): boolean;
    isInfoReferenceInventory(): boolean;
    isPhysicallyOpen(): boolean;
    markChanged(): void;
    performOpen(player: ServerPlayer): void;
    performOpen(): void;
    popItem(player: ServerPlayer): ItemStack;
    removeComponentsFromTag(compoundTag: CompoundTag): void;
    set lootTable(resourceKey: ResourceKey<LootTable>);
    set lootTableSeed(l: number);
    set theItem(itemStack: ItemStack);
    setClientOpened(opened: boolean): void;
    setFromItem(itemStack: ItemStack): void;
    splitTheItem(i: number): ItemStack;
    triggerEvent(i: number, j: number): boolean;
    wobble(wobbleStyle: WobbleStyle): void;
  }


  interface LootrInventoryBlockEntity extends LootrChestBlockEntity {}
  class LootrInventoryBlockEntity extends LootrChestBlockEntity {
    constructor(pWorldPosition: BlockPos, pBlockState: BlockState);
    get infoBlockType(): LootrBlockType;
    get infoNewType(): ILootrType;
    get infoReferenceInventory(): NonNullList<ItemStack>;
    isInfoReferenceInventory(): boolean;
    loadAdditional(compound: CompoundTag, provider: Provider): void;
    setCustomInventory(customInventory: NonNullList<ItemStack>): void;
  }


  interface LootrShulkerBlockEntity extends ILootrBlockEntity, RandomizableContainerBlockEntity {}
  class LootrShulkerBlockEntity extends ILootrBlockEntity {
    constructor(pWorldPosition: BlockPos, pBlockState: BlockState);
    defaultTick(level: Level, pos: BlockPos, state: BlockState): void;
    get animationStatus(): AnimationStatus;
    get clientOpeners(): Set<UUID>;
    get containerSize(): number;
    get infoBlockType(): LootrBlockType;
    get infoContainerSize(): number;
    get infoDimension(): ResourceKey<Level>;
    get infoDisplayName(): Component;
    get infoKey(): string;
    get infoLevel(): Level;
    get infoLootSeed(): number;
    get infoLootTable(): ResourceKey<LootTable>;
    get infoNewType(): ILootrType;
    get infoPos(): BlockPos;
    get infoReferenceInventory(): NonNullList<ItemStack>;
    get infoUUID(): UUID;
    get particleYOffset(): number;
    get physicalOpenerCount(): number;
    get trigger(): IContainerTrigger;
    get updatePacket(): ClientboundBlockEntityDataPacket;
    getBoundingBox(pState: BlockState): AABB;
    getProgress(pPartialTicks: number): number;
    getUpdateTag(provider: Provider): CompoundTag;
    hasBeenOpened(): boolean;
    isClientOpened(): boolean;
    isClosed(): boolean;
    isInfoReferenceInventory(): boolean;
    isPhysicallyOpen(): boolean;
    loadAdditional(compound: CompoundTag, provider: Provider): void;
    markChanged(): void;
    saveToItem(itemstack: ItemStack, provider: Provider): void;
    setClientOpened(opened: boolean): void;
    startOpen(pPlayer: Player): void;
    stopOpen(pPlayer: Player): void;
    triggerEvent(pEvent: number, pCount: number): boolean;
    unpackLootTable(player: Player): void;
  }


  interface LootrTrappedChestBlockEntity extends LootrChestBlockEntity {}
  class LootrTrappedChestBlockEntity extends LootrChestBlockEntity {
    constructor(pWorldPosition: BlockPos, pBlockState: BlockState);
    get infoBlockType(): LootrBlockType;
  }

}

declare module 'noobanidus.mods.lootr.common.block.entity.BlockEntityTicker' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ChunkLoadStatus extends Enum<ChunkLoadStatus> {}
  class ChunkLoadStatus extends Enum<ChunkLoadStatus> {
    static readonly UNLOADED: ChunkLoadStatus;
    static readonly SURROUNDING_CHUNKS_NOT_LOADED: ChunkLoadStatus;
    static readonly NOT_FULLY_LOADED: ChunkLoadStatus;
    static readonly COMPLETE: ChunkLoadStatus;
    static valueOf(name: string): ChunkLoadStatus;
    static values(): ChunkLoadStatus[];
  }

}

declare module 'noobanidus.mods.lootr.common.block.entity.LootrBarrelBlockEntity' {
  import { ILootrBlockEntityConverter } from 'noobanidus.mods.lootr.common.api';
  import { LootrBarrelBlockEntity } from 'noobanidus.mods.lootr.common.block.entity';
  import { ILootrBlockEntity } from 'noobanidus.mods.lootr.common.api.data.blockentity';
  import { BlockEntityType } from 'net.minecraft.world.level.block.entity';

  interface DefaultBlockEntityConverter extends ILootrBlockEntityConverter<LootrBarrelBlockEntity> {}
  class DefaultBlockEntityConverter extends ILootrBlockEntityConverter<LootrBarrelBlockEntity> {
    apply(blockEntity: LootrBarrelBlockEntity): ILootrBlockEntity;
    get blockEntityType(): BlockEntityType<any>;
  }

}

declare module 'noobanidus.mods.lootr.common.block.entity.LootrBrushableBlockEntity' {
  import { ILootrBlockEntityConverter } from 'noobanidus.mods.lootr.common.api';
  import { LootrBrushableBlockEntity } from 'noobanidus.mods.lootr.common.block.entity';
  import { ILootrBlockEntity } from 'noobanidus.mods.lootr.common.api.data.blockentity';
  import { BlockEntityType } from 'net.minecraft.world.level.block.entity';

  interface DefaultBlockEntityConverter extends ILootrBlockEntityConverter<LootrBrushableBlockEntity> {}
  class DefaultBlockEntityConverter extends ILootrBlockEntityConverter<LootrBrushableBlockEntity> {
    apply(blockEntity: LootrBrushableBlockEntity): ILootrBlockEntity;
    get blockEntityType(): BlockEntityType<any>;
  }

}

declare module 'noobanidus.mods.lootr.common.block.entity.LootrChestBlockEntity' {
  import { ILootrBlockEntityConverter } from 'noobanidus.mods.lootr.common.api';
  import { LootrChestBlockEntity } from 'noobanidus.mods.lootr.common.block.entity';
  import { ILootrBlockEntity } from 'noobanidus.mods.lootr.common.api.data.blockentity';
  import { BlockEntityType } from 'net.minecraft.world.level.block.entity';

  interface DefaultBlockEntityConverter extends ILootrBlockEntityConverter<LootrChestBlockEntity> {}
  class DefaultBlockEntityConverter extends ILootrBlockEntityConverter<LootrChestBlockEntity> {
    apply(blockEntity: LootrChestBlockEntity): ILootrBlockEntity;
    get blockEntityType(): BlockEntityType<any>;
  }

}

declare module 'noobanidus.mods.lootr.common.block.entity.LootrDecoratedPotBlockEntity' {
  import { ILootrBlockEntityConverter } from 'noobanidus.mods.lootr.common.api';
  import { LootrDecoratedPotBlockEntity } from 'noobanidus.mods.lootr.common.block.entity';
  import { ILootrBlockEntity } from 'noobanidus.mods.lootr.common.api.data.blockentity';
  import { BlockEntityType } from 'net.minecraft.world.level.block.entity';

  interface DefaultBlockEntityConverter extends ILootrBlockEntityConverter<LootrDecoratedPotBlockEntity> {}
  class DefaultBlockEntityConverter extends ILootrBlockEntityConverter<LootrDecoratedPotBlockEntity> {
    apply(blockEntity: LootrDecoratedPotBlockEntity): ILootrBlockEntity;
    get blockEntityType(): BlockEntityType<any>;
  }

}

declare module 'noobanidus.mods.lootr.common.block.entity.LootrInventoryBlockEntity' {
  import { ILootrBlockEntityConverter } from 'noobanidus.mods.lootr.common.api';
  import { LootrInventoryBlockEntity } from 'noobanidus.mods.lootr.common.block.entity';
  import { ILootrBlockEntity } from 'noobanidus.mods.lootr.common.api.data.blockentity';
  import { BlockEntityType } from 'net.minecraft.world.level.block.entity';

  interface DefaultBlockEntityConverter extends ILootrBlockEntityConverter<LootrInventoryBlockEntity> {}
  class DefaultBlockEntityConverter extends ILootrBlockEntityConverter<LootrInventoryBlockEntity> {
    apply(blockEntity: LootrInventoryBlockEntity): ILootrBlockEntity;
    get blockEntityType(): BlockEntityType<any>;
  }

}

declare module 'noobanidus.mods.lootr.common.block.entity.LootrShulkerBlockEntity' {
  import { ILootrBlockEntityConverter } from 'noobanidus.mods.lootr.common.api';
  import { LootrShulkerBlockEntity } from 'noobanidus.mods.lootr.common.block.entity';
  import { ILootrBlockEntity } from 'noobanidus.mods.lootr.common.api.data.blockentity';
  import { BlockEntityType } from 'net.minecraft.world.level.block.entity';

  interface DefaultBlockEntityConverter extends ILootrBlockEntityConverter<LootrShulkerBlockEntity> {}
  class DefaultBlockEntityConverter extends ILootrBlockEntityConverter<LootrShulkerBlockEntity> {
    apply(blockEntity: LootrShulkerBlockEntity): ILootrBlockEntity;
    get blockEntityType(): BlockEntityType<any>;
  }

}

declare module 'noobanidus.mods.lootr.common.block.entity.LootrTrappedChestBlockEntity' {
  import { ILootrBlockEntityConverter } from 'noobanidus.mods.lootr.common.api';
  import { LootrTrappedChestBlockEntity } from 'noobanidus.mods.lootr.common.block.entity';
  import { ILootrBlockEntity } from 'noobanidus.mods.lootr.common.api.data.blockentity';
  import { BlockEntityType } from 'net.minecraft.world.level.block.entity';

  interface DefaultBlockEntityConverter extends ILootrBlockEntityConverter<LootrTrappedChestBlockEntity> {}
  class DefaultBlockEntityConverter extends ILootrBlockEntityConverter<LootrTrappedChestBlockEntity> {
    apply(blockEntity: LootrTrappedChestBlockEntity): ILootrBlockEntity;
    get blockEntityType(): BlockEntityType<any>;
  }

}

declare module 'noobanidus.mods.lootr.common.block' {
  import { BarrelBlock, BrushableBlock, Block, RenderShape, ChestBlock, DecoratedPotBlock, ShulkerBoxBlock, Rotation, Mirror } from 'net.minecraft.world.level.block';
  import { Properties } from 'BlockBehaviour';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level, BlockGetter, LevelAccessor, LevelReader } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { InteractionResult, MenuProvider } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BlockHitResult } from 'net.minecraft.world.phys';
  import { BlockEntity, BlockEntityTicker, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { RandomSource } from 'net.minecraft.util';
  import { ItemStack, TooltipFlag, DyeColor } from 'net.minecraft.world.item';
  import { IntegerProperty } from 'net.minecraft.world.level.block.state.properties';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { TooltipContext } from 'Item';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  interface LootrBarrelBlock extends BarrelBlock {}
  class LootrBarrelBlock extends BarrelBlock {
    constructor(p_49046_: Properties);
    get explosionResistance(): number;
    getAnalogOutputSignal(pBlockState: BlockState, pLevel: Level, pPos: BlockPos): number;
    getDestroyProgress(pBlockState: BlockState, pPlayer: Player, pLevel: BlockGetter, pPos: BlockPos): number;
    getTicker<T extends BlockEntity>(pLevel: Level, pState: BlockState, pBlockEntityType: BlockEntityType<T>): BlockEntityTicker<T>;
    hasAnalogOutputSignal(pState: BlockState): boolean;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onRemove(pState: BlockState, pLevel: Level, pPos: BlockPos, pNewState: BlockState, pIsMoving: boolean): void;
    playerDestroy(level: Level, player: Player, blockPos: BlockPos, blockState: BlockState, blockEntity: BlockEntity, itemStack: ItemStack): void;
    tick(pState: BlockState, pLevel: ServerLevel, pPos: BlockPos, pRandom: RandomSource): void;
    triggerEvent(state: BlockState, world: Level, pos: BlockPos, id: number, param: number): boolean;
    useWithoutItem(state: BlockState, level: Level, pos: BlockPos, player: Player, trace: BlockHitResult): InteractionResult;
  }


  interface LootrBrushableBlock extends BrushableBlock {}
  class LootrBrushableBlock extends BrushableBlock {
    static readonly DUSTED: IntegerProperty;
    constructor(pseudoReplacement: Block, soundEvent: SoundEvent, soundEvent2: SoundEvent, properties: Properties);
    getRenderShape(blockState: BlockState): RenderShape;
    newBlockEntity(blockPos: BlockPos, blockState: BlockState): BlockEntity;
    onPlace(blockState: BlockState, level: Level, blockPos: BlockPos, blockState2: BlockState, bl: boolean): void;
    tick(blockState: BlockState, serverLevel: ServerLevel, blockPos: BlockPos, randomSource: RandomSource): void;
    updateShape(blockState: BlockState, direction: Direction, blockState2: BlockState, levelAccessor: LevelAccessor, blockPos: BlockPos, blockPos2: BlockPos): BlockState;
  }


  interface LootrChestBlock extends ChestBlock {}
  class LootrChestBlock extends ChestBlock {
    constructor(properties: Properties);
    get explosionResistance(): number;
    getAnalogOutputSignal(pBlockState: BlockState, pLevel: Level, pPos: BlockPos): number;
    getDestroyProgress(pState: BlockState, pPlayer: Player, pLevel: BlockGetter, pPos: BlockPos): number;
    getFluidState(state: BlockState): FluidState;
    getMenuProvider(state: BlockState, worldIn: Level, pos: BlockPos): MenuProvider;
    getShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    getTicker<T extends BlockEntity>(pLevel: Level, pState: BlockState, pBlockEntityType: BlockEntityType<T>): BlockEntityTicker<T>;
    hasAnalogOutputSignal(pState: BlockState): boolean;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    playerDestroy(level: Level, player: Player, blockPos: BlockPos, blockState: BlockState, blockEntity: BlockEntity, itemStack: ItemStack): void;
    tick(pState: BlockState, pLevel: ServerLevel, pPos: BlockPos, pRandom: RandomSource): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useWithoutItem(state: BlockState, level: Level, pos: BlockPos, player: Player, trace: BlockHitResult): InteractionResult;
  }


  interface LootrDecoratedPotBlock extends DecoratedPotBlock {}
  class LootrDecoratedPotBlock extends DecoratedPotBlock {
    constructor(properties: Properties);
    getCloneItemStack(levelReader: LevelReader, blockPos: BlockPos, blockState: BlockState): ItemStack;
    getTicker<T extends BlockEntity>(pLevel: Level, pState: BlockState, pBlockEntityType: BlockEntityType<T>): BlockEntityTicker<T>;
    newBlockEntity(blockPos: BlockPos, blockState: BlockState): BlockEntity;
    playerWillDestroy(level: Level, blockPos: BlockPos, blockState: BlockState, player: Player): BlockState;
  }


  interface LootrInventoryBlock extends ChestBlock {}
  class LootrInventoryBlock extends ChestBlock {
    constructor(properties: Properties);
    get explosionResistance(): number;
    getAnalogOutputSignal(pBlockState: BlockState, pLevel: Level, pPos: BlockPos): number;
    getDestroyProgress(p_60466_: BlockState, p_60467_: Player, p_60468_: BlockGetter, p_60469_: BlockPos): number;
    getDirectSignal(pBlockState: BlockState, pBlockAccess: BlockGetter, pPos: BlockPos, pSide: Direction): number;
    getFluidState(state: BlockState): FluidState;
    getMenuProvider(state: BlockState, worldIn: Level, pos: BlockPos): MenuProvider;
    getShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getSignal(pBlockState: BlockState, pBlockAccess: BlockGetter, pPos: BlockPos, pSide: Direction): number;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    getTicker<T extends BlockEntity>(pLevel: Level, pState: BlockState, pBlockEntityType: BlockEntityType<T>): BlockEntityTicker<T>;
    hasAnalogOutputSignal(pState: BlockState): boolean;
    isSignalSource(pState: BlockState): boolean;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    playerDestroy(level: Level, player: Player, blockPos: BlockPos, blockState: BlockState, blockEntity: BlockEntity, itemStack: ItemStack): void;
    tick(pState: BlockState, pLevel: ServerLevel, pPos: BlockPos, pRandom: RandomSource): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useWithoutItem(state: BlockState, level: Level, pos: BlockPos, player: Player, trace: BlockHitResult): InteractionResult;
  }


  interface LootrShulkerBlock extends ShulkerBoxBlock {}
  class LootrShulkerBlock extends ShulkerBoxBlock {
    constructor(pProperties: Properties);
    appendHoverText(p_56193_: ItemStack, p_339693_: TooltipContext, p_56195_: Component[], p_56196_: TooltipFlag): void;
    get color(): DyeColor;
    get explosionResistance(): number;
    getAnalogOutputSignal(pBlockState: BlockState, pLevel: Level, pPos: BlockPos): number;
    getDestroyProgress(p_60466_: BlockState, p_60467_: Player, p_60468_: BlockGetter, p_60469_: BlockPos): number;
    getShape(pState: BlockState, pLevel: BlockGetter, pPos: BlockPos, pContext: CollisionContext): VoxelShape;
    getTicker<T extends BlockEntity>(pLevel: Level, pState: BlockState, pBlockEntityType: BlockEntityType<T>): BlockEntityTicker<T>;
    hasAnalogOutputSignal(pState: BlockState): boolean;
    newBlockEntity(pPos: BlockPos, pState: BlockState): BlockEntity;
    onRemove(pState: BlockState, pLevel: Level, pPos: BlockPos, pNewState: BlockState, pIsMoving: boolean): void;
    playerDestroy(level: Level, player: Player, blockPos: BlockPos, blockState: BlockState, blockEntity: BlockEntity, itemStack: ItemStack): void;
    playerWillDestroy(pLevel: Level, pPos: BlockPos, pState: BlockState, pPlayer: Player): BlockState;
    useWithoutItem(state: BlockState, level: Level, pos: BlockPos, player: Player, trace: BlockHitResult): InteractionResult;
  }


  interface LootrTrappedChestBlock extends ChestBlock {}
  class LootrTrappedChestBlock extends ChestBlock {
    constructor(properties: Properties);
    get explosionResistance(): number;
    getAnalogOutputSignal(pBlockState: BlockState, pLevel: Level, pPos: BlockPos): number;
    getDestroyProgress(p_60466_: BlockState, p_60467_: Player, p_60468_: BlockGetter, p_60469_: BlockPos): number;
    getDirectSignal(pBlockState: BlockState, pBlockAccess: BlockGetter, pPos: BlockPos, pSide: Direction): number;
    getMenuProvider(state: BlockState, worldIn: Level, pos: BlockPos): MenuProvider;
    getShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getSignal(pBlockState: BlockState, pBlockAccess: BlockGetter, pPos: BlockPos, pSide: Direction): number;
    getTicker<T extends BlockEntity>(pLevel: Level, pState: BlockState, pBlockEntityType: BlockEntityType<T>): BlockEntityTicker<T>;
    isSignalSource(pState: BlockState): boolean;
    newBlockEntity(pPos: BlockPos, pState: BlockState): BlockEntity;
    playerDestroy(level: Level, player: Player, blockPos: BlockPos, blockState: BlockState, blockEntity: BlockEntity, itemStack: ItemStack): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useWithoutItem(state: BlockState, level: Level, pos: BlockPos, player: Player, trace: BlockHitResult): InteractionResult;
  }


  interface TrophyBlock extends Block {}
  class TrophyBlock extends Block {
    constructor(properties: Properties);
    getShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(p_60528_: BlockState, p_60529_: Mirror): BlockState;
    rotate(p_60530_: BlockState, p_60531_: Rotation): BlockState;
  }

}

declare module 'noobanidus.mods.lootr.common.block.LootrDecoratedPotBlock' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface CollisionState extends Enum<CollisionState> {}
  class CollisionState extends Enum<CollisionState> {
    static readonly PLAYER_OPEN: CollisionState;
    static readonly PLAYER_CLOSED: CollisionState;
    static readonly ITEM_ENTITY: CollisionState;
    static readonly OTHER: CollisionState;
    static valueOf(name: string): CollisionState;
    static values(): CollisionState[];
  }

}

declare module 'noobanidus.mods.lootr.common.chunk' {
  import { LevelAccessor, ChunkPos, Level } from 'net.minecraft.world.level';
  import { LevelChunk } from 'net.minecraft.world.level.chunk';
  import { Set } from 'java.util';
  import { ResourceKey } from 'net.minecraft.resources';

  class LoadedChunks {
    static clear(): void;
    static getLoadedChunks(dimension: ResourceKey<Level>): Set<ChunkPos>;
    static onChunkLoad(level: LevelAccessor, chunk: LevelChunk): void;
    static onChunkUnload(level: LevelAccessor, chunk: LevelChunk): void;
  }

}

declare module 'noobanidus.mods.lootr.common.client.block' {
  import { BlockEntityRenderer } from 'net.minecraft.client.renderer.blockentity';
  import { LootrBrushableBlockEntity, LootrDecoratedPotBlockEntity } from 'noobanidus.mods.lootr.common.block.entity';
  import { Context } from 'BlockEntityRendererProvider';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { AABB } from 'net.minecraft.world.phys';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ModelLayerLocation } from 'net.minecraft.client.model.geom';
  import { LayerDefinition } from 'net.minecraft.client.model.geom.builders';

  interface LootrBrushableBlockRenderer extends BlockEntityRenderer<LootrBrushableBlockEntity> {}
  class LootrBrushableBlockRenderer extends BlockEntityRenderer<LootrBrushableBlockEntity> {
    constructor(arg: Context);
    getRenderBoundingBox(blockEntity: LootrBrushableBlockEntity): AABB;
    render(arg: LootrBrushableBlockEntity, f: number, arg2: PoseStack, arg3: MultiBufferSource, k: number, l: number): void;
  }


  interface LootrDecoratedPotRenderer extends BlockEntityRenderer<LootrDecoratedPotBlockEntity> {}
  class LootrDecoratedPotRenderer extends BlockEntityRenderer<LootrDecoratedPotBlockEntity> {
    static readonly DECORATED_POT_SHEET: ResourceLocation;
    static readonly OPEN_POT_LAYER: ModelLayerLocation;
    constructor(context: Context);
    static createBodyLayer(): LayerDefinition;
    render(decoratedPotBlockEntity: LootrDecoratedPotBlockEntity, f: number, poseStack: PoseStack, multiBufferSource: MultiBufferSource, i: number, j: number): void;
  }

}

declare module 'noobanidus.mods.lootr.common.client' {
  import { Player } from 'net.minecraft.world.entity.player';
  import { BlockPos } from 'net.minecraft.core';
  import { ILootrInfoProvider } from 'noobanidus.mods.lootr.common.api.data';

  class ClientHooks {
    static clearCache(position: BlockPos): void;
    static get player(): Player;
    static performBreakEffect(entityId: number, pos: BlockPos): void;
    static performUnopenedParticles(provider: ILootrInfoProvider): void;
    static refreshSection(): void;
  }

}

declare module 'noobanidus.mods.lootr.common.client.entity' {
  import { MinecartRenderer, ItemFrameRenderer } from 'net.minecraft.client.renderer.entity';
  import { Context } from 'EntityRendererProvider';
  import { ModelLayerLocation } from 'net.minecraft.client.model.geom';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { LootrItemFrame } from 'noobanidus.mods.lootr.common.entity';
  import { ModelResourceLocation } from 'net.minecraft.client.resources.model';

  interface LootrChestCartRenderer<T extends LootrChestMinecartEntity = any> extends MinecartRenderer<T> {}
  class LootrChestCartRenderer<T extends LootrChestMinecartEntity = any> extends MinecartRenderer<T> {
    constructor(p_174300_: Context, p_174301_: ModelLayerLocation);
    render(pEntity: T, pEntityYaw: number, pPartialTicks: number, pMatrixStack: PoseStack, pBuffer: MultiBufferSource, pPackedLight: number): void;
  }


  interface LootrItemFrameRenderer extends ItemFrameRenderer<LootrItemFrame> {}
  class LootrItemFrameRenderer extends ItemFrameRenderer<LootrItemFrame> {
    static readonly FRAME_LOCATION: ModelResourceLocation;
    static readonly FRAME_OPEN_LOCATION: ModelResourceLocation;
    constructor(context: Context);
    render(entity: LootrItemFrame, entityYaw: number, partialTicks: number, poseStack: PoseStack, buffer: MultiBufferSource, packedLight: number): void;
  }

}

declare module 'noobanidus.mods.lootr.common.client.item' {
  import { BlockEntityWithoutLevelRenderer, MultiBufferSource } from 'net.minecraft.client.renderer';
  import { BlockEntityRenderDispatcher } from 'net.minecraft.client.renderer.blockentity';
  import { EntityModelSet } from 'net.minecraft.client.model.geom';
  import { ItemStack, ItemDisplayContext } from 'net.minecraft.world.item';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { LootrChestMinecartEntity } from 'noobanidus.mods.lootr.common.entity';

  interface LootrChestItemRenderer extends BlockEntityWithoutLevelRenderer {}
  class LootrChestItemRenderer extends BlockEntityWithoutLevelRenderer {
    constructor(pBlockEntityRenderDispatcher: BlockEntityRenderDispatcher, pEntityModelSet: EntityModelSet);

    constructor();
    static get instance(): LootrChestItemRenderer;
    renderByItem(p_108830_: ItemStack, p_270899_: ItemDisplayContext, p_108832_: PoseStack, p_108833_: MultiBufferSource, p_108834_: number, p_108835_: number): void;
    renderByMinecart(entity: LootrChestMinecartEntity, matrixStack: PoseStack, buffer: MultiBufferSource, combinedLight: number): void;
  }


  interface LootrDecoratedPotItemRenderer extends BlockEntityWithoutLevelRenderer {}
  class LootrDecoratedPotItemRenderer extends BlockEntityWithoutLevelRenderer {
    constructor(pBlockEntityRenderDispatcher: BlockEntityRenderDispatcher, pEntityModelSet: EntityModelSet);

    constructor();
    static get instance(): LootrDecoratedPotItemRenderer;
    renderByItem(p_108830_: ItemStack, p_270899_: ItemDisplayContext, p_108832_: PoseStack, p_108833_: MultiBufferSource, p_108834_: number, p_108835_: number): void;
    renderByMinecart(entity: LootrChestMinecartEntity, matrixStack: PoseStack, buffer: MultiBufferSource, combinedLight: number): void;
  }


  interface LootrShulkerItemRenderer extends BlockEntityWithoutLevelRenderer {}
  class LootrShulkerItemRenderer extends BlockEntityWithoutLevelRenderer {
    constructor(pBlockEntityRenderDispatcher: BlockEntityRenderDispatcher, pEntityModelSet: EntityModelSet);

    constructor();
    static get instance(): LootrShulkerItemRenderer;
    renderByItem(p_108830_: ItemStack, p_270899_: ItemDisplayContext, p_108832_: PoseStack, p_108833_: MultiBufferSource, p_108834_: number, p_108835_: number): void;
  }


  interface LootrTrappedChestItemRenderer extends BlockEntityWithoutLevelRenderer {}
  class LootrTrappedChestItemRenderer extends BlockEntityWithoutLevelRenderer {
    constructor(pBlockEntityRenderDispatcher: BlockEntityRenderDispatcher, pEntityModelSet: EntityModelSet);

    constructor();
    static get instance(): LootrTrappedChestItemRenderer;
    renderByItem(p_108830_: ItemStack, p_270899_: ItemDisplayContext, p_108832_: PoseStack, p_108833_: MultiBufferSource, p_108834_: number, p_108835_: number): void;
  }

}

declare module 'noobanidus.mods.lootr.common.client.particle' {
  import { TextureSheetParticle, ParticleRenderType } from 'net.minecraft.client.particle';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';

  interface UnopenedParticle extends TextureSheetParticle {}
  class UnopenedParticle extends TextureSheetParticle {
    constructor(level: ClientLevel, x: number, y: number, z: number, xSpeed: number, ySpeed: number, zSpeed: number);
    get renderType(): ParticleRenderType;
    tick(): void;
  }

}

declare module 'noobanidus.mods.lootr.common.command' {
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { Block } from 'net.minecraft.world.level.block';
  import { ResourceKey } from 'net.minecraft.resources';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { LiteralArgumentBuilder } from 'com.mojang.brigadier.builder';
  import { MinecraftServer } from 'net.minecraft.server';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { List, Set } from 'java.util';
  import { ChunkPos } from 'net.minecraft.world.level';
  import { Runnable } from 'java.lang';

  class CommandLootr {
    static builder(builder: LiteralArgumentBuilder<CommandSourceStack>): LiteralArgumentBuilder<CommandSourceStack>;
    static createBlock(c: CommandSourceStack, block: Block, incomingTable: ResourceKey<LootTable>): void;
    static register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }


  class CustomConvertJob {
    static start(server: MinecraftServer, level: ServerLevel, positions: ChunkPos[], src: CommandSourceStack): void;
  }


  class IOUtil {
    static cullSavedDataAsync(server: MinecraftServer, savedDataFiles: Set<string>): void;
    static waitUntilIOWorkerComplete(): void;
    static withIOWorker(task: Runnable): void;
  }

}

declare module 'noobanidus.mods.lootr.common.config' {
  class ConfigManagerBase {
  }

}

declare module 'noobanidus.mods.lootr.common.data' {
  import { DimensionDataStorage } from 'net.minecraft.world.level.storage';
  import { ILootrInfoProvider, LootFiller, ILootrSavedData, ILootrInfo } from 'noobanidus.mods.lootr.common.api.data';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { UUID, Set } from 'java.util';
  import { ILootrInventory } from 'noobanidus.mods.lootr.common.api.data.inventory';
  import { Player } from 'net.minecraft.world.entity.player';
  import { SavedData } from 'net.minecraft.world.level.saveddata';
  import { Supplier } from 'java.util.function';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { File } from 'java.io';

  class DataStorage {
    static readonly ADVANCEMENTS: string;
    static readonly DECAYS: string;
    static readonly REFRESHES: string;
    static award(provider: ILootrInfoProvider, player: ServerPlayer): void;
    static award(id: UUID, player: ServerPlayer): void;
    static clearInventories(player: Player): boolean;
    static clearInventories(id: UUID): boolean;
    static cullInventories(): number;
    static doTick(): void;
    static get allLootrFiles(): Set<string>;
    static get dataStorage(): DimensionDataStorage;
    static getData(provider: ILootrInfoProvider): LootrSavedData;
    static getDecayValue(provider: ILootrInfoProvider): number;
    static getInventory(provider: ILootrInfoProvider, player: ServerPlayer, filler: LootFiller): ILootrInventory;
    static getRefreshValue(provider: ILootrInfoProvider): number;
    static isAwarded(provider: ILootrInfoProvider, player: ServerPlayer): boolean;
    static isAwarded(uuid: UUID, player: ServerPlayer): boolean;
    static isDecayed(provider: ILootrInfoProvider): boolean;
    static isRefreshed(provider: ILootrInfoProvider): boolean;
    static removeDecayed(provider: ILootrInfoProvider): void;
    static removeRefreshed(provider: ILootrInfoProvider): void;
    static setDecaying(provider: ILootrInfoProvider): void;
    static setRefreshing(provider: ILootrInfoProvider): void;
  }


  interface LootrSavedData extends ILootrSavedData, SavedData {}
  class LootrSavedData extends ILootrSavedData {
    addActualOpener(uuid: UUID): boolean;
    addActualOpener(player: Player): boolean;
    addVisualOpener(uuid: UUID): boolean;
    addVisualOpener(player: Player): boolean;
    canBeCulled(): boolean;
    clearInventories(id: UUID): boolean;
    clearInventories(player: ServerPlayer): boolean;
    createInventory(provider: ILootrInfoProvider, player: ServerPlayer, filler: LootFiller): LootrInventory;
    static fromInfo(info: ILootrInfo): Supplier<LootrSavedData>;
    get actualOpeners(): Set<UUID>;
    get redirect(): ILootrInfo;
    get visualOpeners(): Set<UUID>;
    getInventory(id: UUID): LootrInventory;
    getInventory(player: ServerPlayer): ILootrInventory;
    hasBeenOpened(): boolean;
    isPhysicallyOpen(): boolean;
    static load(compound: CompoundTag, provider: Provider): LootrSavedData;
    markChanged(): void;
    markDataChanged(): void;
    refresh(): void;
    removeVisualOpener(uuid: UUID): boolean;
    removeVisualOpener(player: Player): boolean;
    save(compound: CompoundTag, provider: Provider): CompoundTag;
    save(pFile: File, provider: Provider): void;
    update(info: ILootrInfo): void;
  }

}

declare module 'noobanidus.mods.lootr.common.debug' {
  class TagChecker {
    static checkTags(): void;
  }

}

declare module 'noobanidus.mods.lootr.common.entity' {
  import { AbstractMinecartContainer } from 'net.minecraft.world.entity.vehicle';
  import { ILootrEntity } from 'noobanidus.mods.lootr.common.api.data.entity';
  import { EntityType, Entity, SlotAccess } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player, Inventory } from 'net.minecraft.world.entity.player';
  import { Set, UUID } from 'java.util';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { Type } from 'AbstractMinecart';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { RemovalReason } from 'Entity';
  import { InteractionResult, InteractionHand } from 'net.minecraft.world';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { BlockPos, NonNullList, Direction } from 'net.minecraft.core';
  import { ResourceKey } from 'net.minecraft.resources';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';
  import { Component } from 'net.minecraft.network.chat';
  import { LootrBlockType } from 'noobanidus.mods.lootr.common.api.data';
  import { ILootrType } from 'noobanidus.mods.lootr.common.api';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { IContainerTrigger } from 'noobanidus.mods.lootr.common.api.advancement';
  import { ItemFrame } from 'net.minecraft.world.entity.decoration';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface LootrChestMinecartEntity extends ILootrEntity, AbstractMinecartContainer {}
  class LootrChestMinecartEntity extends ILootrEntity {
    constructor(type: EntityType<LootrChestMinecartEntity>, world: Level);

    constructor(worldIn: Level, x: number, y: number, z: number);
    createMenu(id: number, playerInventoryIn: Inventory): AbstractContainerMenu;
    get clientOpeners(): Set<UUID>;
    get containerSize(): number;
    get defaultDisplayBlockState(): BlockState;
    get defaultDisplayOffset(): number;
    get infoBlockType(): LootrBlockType;
    get infoContainerSize(): number;
    get infoDimension(): ResourceKey<Level>;
    get infoDisplayName(): Component;
    get infoKey(): string;
    get infoLevel(): Level;
    get infoLootSeed(): number;
    get infoLootTable(): ResourceKey<LootTable>;
    get infoNewType(): ILootrType;
    get infoPos(): BlockPos;
    get infoReferenceInventory(): NonNullList<ItemStack>;
    get infoUUID(): UUID;
    get infoVec(): Vec3;
    get minecartType(): Type;
    get particleXBounds(): number[];
    get particleYOffset(): number;
    get particleZBounds(): number[];
    get pickResult(): ItemStack;
    get trigger(): IContainerTrigger;
    hasBeenOpened(): boolean;
    interact(player: Player, hand: InteractionHand): InteractionResult;
    isClientOpened(): boolean;
    isInfoReferenceInventory(): boolean;
    isInvulnerableTo(source: DamageSource): boolean;
    isPhysicallyOpen(): boolean;
    markChanged(): void;
    remove(reason: RemovalReason): void;
    setClientOpened(opened: boolean): void;
    startOpen(player: Player): void;
    startSeenByPlayer(pPlayer: ServerPlayer): void;
    tick(): void;
    unpackChestVehicleLootTable(p_219950_: Player): void;
  }


  interface LootrItemFrame extends ILootrEntity, ItemFrame {}
  class LootrItemFrame extends ILootrEntity {
    constructor(entityType: EntityType<ItemFrame>, level: Level);

    constructor(level: Level, pos: BlockPos, facingDirection: Direction);
    addAdditionalSaveData(compound: CompoundTag): void;
    dropItem(entity: Entity): void;
    get analogOutput(): number;
    get clientOpeners(): Set<UUID>;
    get infoBlockType(): LootrBlockType;
    get infoContainerSize(): number;
    get infoDimension(): ResourceKey<Level>;
    get infoDisplayName(): Component;
    get infoKey(): string;
    get infoLevel(): Level;
    get infoLootSeed(): number;
    get infoLootTable(): ResourceKey<LootTable>;
    get infoNewType(): ILootrType;
    get infoPos(): BlockPos;
    get infoReferenceInventory(): NonNullList<ItemStack>;
    get infoUUID(): UUID;
    get item(): ItemStack;
    get particleCenter(): Vec3;
    get particleXBounds(): number[];
    get particleYOffset(): number;
    get particleZBounds(): number[];
    get pickResult(): ItemStack;
    getSlot(slot: number): SlotAccess;
    hasBeenOpened(): boolean;
    hasFramedMap(): boolean;
    hurt(source: DamageSource, amount: number): boolean;
    interact(player: Player, hand: InteractionHand): InteractionResult;
    isClientOpened(): boolean;
    isInfoReferenceInventory(): boolean;
    isInvulnerableTo(source: DamageSource): boolean;
    isPhysicallyOpen(): boolean;
    lootrSetItem(stack: ItemStack): void;
    markChanged(): void;
    readAdditionalSaveData(compound: CompoundTag): void;
    setClientOpened(opened: boolean): void;
    setItem(stack: ItemStack, updateNeighbours: boolean): void;
    startSeenByPlayer(pPlayer: ServerPlayer): void;
    survives(): boolean;
    tick(): void;
  }

}

declare module 'noobanidus.mods.lootr.common.entity.LootrChestMinecartEntity' {
  import { ILootrEntityConverter } from 'noobanidus.mods.lootr.common.api';
  import { LootrChestMinecartEntity } from 'noobanidus.mods.lootr.common.entity';
  import { ILootrEntity } from 'noobanidus.mods.lootr.common.api.data.entity';
  import { EntityType } from 'net.minecraft.world.entity';

  interface DefaultConverter extends ILootrEntityConverter<LootrChestMinecartEntity> {}
  class DefaultConverter extends ILootrEntityConverter<LootrChestMinecartEntity> {
    apply(entity: LootrChestMinecartEntity): ILootrEntity;
    get entityType(): EntityType<any>;
  }

}

declare module 'noobanidus.mods.lootr.common.entity.LootrItemFrame' {
  import { ILootrEntityConverter } from 'noobanidus.mods.lootr.common.api';
  import { LootrItemFrame } from 'noobanidus.mods.lootr.common.entity';
  import { ILootrEntity } from 'noobanidus.mods.lootr.common.api.data.entity';
  import { EntityType } from 'net.minecraft.world.entity';

  interface DefaultConverter extends ILootrEntityConverter<LootrItemFrame> {}
  class DefaultConverter extends ILootrEntityConverter<LootrItemFrame> {
    apply(entity: LootrItemFrame): ILootrEntity;
    get entityType(): EntityType<any>;
  }

}

declare module 'noobanidus.mods.lootr.common.impl.adapter' {
  import { ILootrDataAdapter, ILootrItemFrameAdapter } from 'noobanidus.mods.lootr.common.api.adapter';
  import { BrushableBlockEntity, DecoratedPotBlockEntity, RandomizableContainerBlockEntity } from 'net.minecraft.world.level.block.entity';
  import { Class } from 'java.lang';
  import { ResourceKey } from 'net.minecraft.resources';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';
  import { ItemFrame } from 'net.minecraft.world.entity.decoration';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Direction, BlockPos } from 'net.minecraft.core';
  import { MinecartChest } from 'net.minecraft.world.entity.vehicle';

  interface BrushableBlockEntityAdapter extends ILootrDataAdapter<BrushableBlockEntity> {}
  class BrushableBlockEntityAdapter extends ILootrDataAdapter<BrushableBlockEntity> {
    get assignableClass(): Class<BrushableBlockEntity>;
    getLootSeed(entity: BrushableBlockEntity): number;
    getLootTable(entity: BrushableBlockEntity): ResourceKey<LootTable>;
    setLootTable(entity: BrushableBlockEntity, table: ResourceKey<LootTable>, seed: number): void;
  }


  interface DecoratedPotBlockEntityAdapter extends ILootrDataAdapter<DecoratedPotBlockEntity> {}
  class DecoratedPotBlockEntityAdapter extends ILootrDataAdapter<DecoratedPotBlockEntity> {
    get assignableClass(): Class<DecoratedPotBlockEntity>;
    getLootSeed(entity: DecoratedPotBlockEntity): number;
    getLootTable(entity: DecoratedPotBlockEntity): ResourceKey<LootTable>;
    hasCopyableComponentsViaItem(entity: DecoratedPotBlockEntity): boolean;
    setLootTable(entity: DecoratedPotBlockEntity, table: ResourceKey<LootTable>, seed: number): void;
  }


  interface ItemFrameAdapter extends ILootrItemFrameAdapter<ItemFrame> {}
  class ItemFrameAdapter extends ILootrItemFrameAdapter<ItemFrame> {
    get assignableClass(): Class<ItemFrame>;
    getDirection(entity: ItemFrame): Direction;
    getItem(entity: ItemFrame): ItemStack;
    getPos(entity: ItemFrame): BlockPos;
    getRotation(object: ItemFrame): number;
    isFixed(object: ItemFrame): boolean;
    isInvisible(object: ItemFrame): boolean;
  }


  interface MinecartChestAdapter extends ILootrDataAdapter<MinecartChest> {}
  class MinecartChestAdapter extends ILootrDataAdapter<MinecartChest> {
    get assignableClass(): Class<MinecartChest>;
    getLootSeed(entity: MinecartChest): number;
    getLootTable(entity: MinecartChest): ResourceKey<LootTable>;
    setLootTable(entity: MinecartChest, table: ResourceKey<LootTable>, seed: number): void;
  }


  interface RandomizableContainerBlockEntityAdapter extends ILootrDataAdapter<RandomizableContainerBlockEntity> {}
  class RandomizableContainerBlockEntityAdapter extends ILootrDataAdapter<RandomizableContainerBlockEntity> {
    get assignableClass(): Class<RandomizableContainerBlockEntity>;
    getLootSeed(entity: RandomizableContainerBlockEntity): number;
    getLootTable(entity: RandomizableContainerBlockEntity): ResourceKey<LootTable>;
    priority(): number;
    setLootTable(entity: RandomizableContainerBlockEntity, table: ResourceKey<LootTable>, seed: number): void;
  }

}

declare module 'noobanidus.mods.lootr.common.impl.command' {
  import { ILootrCommandExtension } from 'noobanidus.mods.lootr.common.api.command';
  import { Block } from 'net.minecraft.world.level.block';

  interface BarrelCommandType extends ILootrCommandExtension {}
  class BarrelCommandType extends ILootrCommandExtension {
    get block(): Block;
    get id(): string;
  }


  interface ChestCommandType extends ILootrCommandExtension {}
  class ChestCommandType extends ILootrCommandExtension {
    get block(): Block;
    get id(): string;
  }


  interface GravelCommandType extends ILootrCommandExtension {}
  class GravelCommandType extends ILootrCommandExtension {
    get block(): Block;
    get id(): string;
  }


  interface PotCommandType extends ILootrCommandExtension {}
  class PotCommandType extends ILootrCommandExtension {
    get block(): Block;
    get id(): string;
  }


  interface SandCommandType extends ILootrCommandExtension {}
  class SandCommandType extends ILootrCommandExtension {
    get block(): Block;
    get id(): string;
  }


  interface ShulkerCommandType extends ILootrCommandExtension {}
  class ShulkerCommandType extends ILootrCommandExtension {
    get block(): Block;
    get id(): string;
  }


  interface TrappedChestCommandType extends ILootrCommandExtension {}
  class TrappedChestCommandType extends ILootrCommandExtension {
    get block(): Block;
    get id(): string;
  }

}

declare module 'noobanidus.mods.lootr.common.impl' {
  import { List } from 'java.util';
  import { ILootrFabricModelProvider } from 'noobanidus.mods.lootr.common.api.client';
  import { ILootrCommandExtension } from 'noobanidus.mods.lootr.common.api.command';

  class LootrServiceRegistry {
    constructor();
    static clearReplacements(): void;
    static get commandExtensions(): ILootrCommandExtension[];
    static get commandExtensionsString(): string;
    static get instance(): LootrServiceRegistry;
    static get modelAppenders(): ILootrFabricModelProvider[];
  }

}

declare module 'noobanidus.mods.lootr.common.impl.replacement' {
  import { ILootrBlockReplacementProvider } from 'noobanidus.mods.lootr.common.api.replacement';
  import { TagKey } from 'net.minecraft.tags';
  import { Block } from 'net.minecraft.world.level.block';

  interface BarrelReplacementProvider extends ILootrBlockReplacementProvider {}
  class BarrelReplacementProvider extends ILootrBlockReplacementProvider {
    get applicableTag(): TagKey<Block>;
    get block(): Block;
  }


  interface ChestReplacementProvider extends ILootrBlockReplacementProvider {}
  class ChestReplacementProvider extends ILootrBlockReplacementProvider {
    get applicableTag(): TagKey<Block>;
    get block(): Block;
    get priority(): number;
  }


  interface GravelReplacementProvider extends ILootrBlockReplacementProvider {}
  class GravelReplacementProvider extends ILootrBlockReplacementProvider {
    get applicableTag(): TagKey<Block>;
    get block(): Block;
  }


  interface PotReplacementProvider extends ILootrBlockReplacementProvider {}
  class PotReplacementProvider extends ILootrBlockReplacementProvider {
    get applicableTag(): TagKey<Block>;
    get block(): Block;
  }


  interface SandReplacementProvider extends ILootrBlockReplacementProvider {}
  class SandReplacementProvider extends ILootrBlockReplacementProvider {
    get applicableTag(): TagKey<Block>;
    get block(): Block;
  }


  interface ShulkerReplacementProvider extends ILootrBlockReplacementProvider {}
  class ShulkerReplacementProvider extends ILootrBlockReplacementProvider {
    get applicableTag(): TagKey<Block>;
    get block(): Block;
  }


  interface TrappedChestReplacementProvider extends ILootrBlockReplacementProvider {}
  class TrappedChestReplacementProvider extends ILootrBlockReplacementProvider {
    get applicableTag(): TagKey<Block>;
    get block(): Block;
    get priority(): number;
  }

}

declare module 'noobanidus.mods.lootr.common.impl.type' {
  import { ILootrType } from 'noobanidus.mods.lootr.common.api';
  import { Block } from 'net.minecraft.world.level.block';
  import { EntityType } from 'net.minecraft.world.entity';
  import { LootFiller, ILootrInfo } from 'noobanidus.mods.lootr.common.api.data';
  import { Container } from 'net.minecraft.world';
  import { ServerLevel } from 'net.minecraft.server.level';

  interface BarrelLootrType extends ILootrType {}
  class BarrelLootrType extends ILootrType {
    callback(): void;
    get name(): string;
    get replacementBlock(): Block;
    get replacementEntity(): EntityType<any>;
  }


  interface BrushableLootrType extends ILootrType {}
  class BrushableLootrType extends ILootrType {
    canBeMarkedUnopened(): boolean;
    canDecay(): boolean;
    canDropContentsWhenBroken(): boolean;
    canRefresh(): boolean;
    displaysUnopenedParticle(): boolean;
    get defaultFiller(): LootFiller;
    get replacementEntity(): EntityType<any>;
  }


  interface ChestLootrType extends ILootrType {}
  class ChestLootrType extends ILootrType {
    callback(): void;
    get name(): string;
    get replacementBlock(): Block;
    get replacementEntity(): EntityType<any>;
  }


  interface GravelLootrType extends BrushableLootrType {}
  class GravelLootrType extends BrushableLootrType {
    callback(): void;
    get name(): string;
    get replacementBlock(): Block;
  }


  interface InventoryLootrType extends ILootrType {}
  class InventoryLootrType extends ILootrType {
    callback(): void;
    get name(): string;
    get replacementBlock(): Block;
    get replacementEntity(): EntityType<any>;
  }


  interface ItemFrameLootrType extends ILootrType {}
  class ItemFrameLootrType extends ILootrType {
    callback(): void;
    canDecay(): boolean;
    canRefresh(): boolean;
    get name(): string;
    get replacementBlock(): Block;
    get replacementEntity(): EntityType<any>;
    isEntity(): boolean;
  }


  interface MinecartLootrType extends ILootrType {}
  class MinecartLootrType extends ILootrType {
    callback(): void;
    get name(): string;
    get replacementBlock(): Block;
    get replacementEntity(): EntityType<any>;
    isEntity(): boolean;
  }


  interface PotLootrType extends ILootrType {}
  class PotLootrType extends ILootrType {
    callback(): void;
    canDecay(): boolean;
    canRefresh(): boolean;
    get name(): string;
    get replacementBlock(): Block;
    get replacementEntity(): EntityType<any>;
  }


  interface SandLootrType extends BrushableLootrType {}
  class SandLootrType extends BrushableLootrType {
    callback(): void;
    get name(): string;
    get replacementBlock(): Block;
  }


  interface ShulkerLootrType extends ILootrType {}
  class ShulkerLootrType extends ILootrType {
    callback(): void;
    get name(): string;
    get replacementBlock(): Block;
    get replacementEntity(): EntityType<any>;
  }


  interface SimpleLootrType extends ILootrType {}
  class SimpleLootrType extends ILootrType {
    callback(): void;
    get name(): string;
    get replacementBlock(): Block;
    get replacementEntity(): EntityType<any>;
    getContainer(info: ILootrInfo, level: ServerLevel): Container;
  }


  interface TrappedChestLootrType extends ILootrType {}
  class TrappedChestLootrType extends ILootrType {
    callback(): void;
    get name(): string;
    get replacementBlock(): Block;
    get replacementEntity(): EntityType<any>;
  }

}

declare module 'noobanidus.mods.lootr.common.integration.digsite_workshop' {
  class IModdedBrushItem {
    lootr$getBrushingSpeed(): number;
  }

}

declare module 'noobanidus.mods.lootr.common.integration.jade' {
  import { IWailaPlugin, IWailaClientRegistration } from 'snownee.jade.api';

  interface LootrWailaPlugin extends IWailaPlugin {}
  class LootrWailaPlugin extends IWailaPlugin {
    registerClient(registration: IWailaClientRegistration): void;
  }

}

declare module 'noobanidus.mods.lootr.common.integration.sherdsapi' {
  import { PotDecorationsAdapter } from 'noobanidus.mods.lootr.common.api';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { DataComponentInput } from 'BlockEntity';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ResourceLocation } from 'net.minecraft.resources';

  class SherdsIntegration {
    static getAdapterFrom(blockEntity: BlockEntity): PotDecorationsAdapter;
    static getAdapterFrom(stack: DataComponentInput): PotDecorationsAdapter;
    static getAdapterFrom(stack: ItemStack): PotDecorationsAdapter;
    static getCustomSideTexture(item: ItemStack): ResourceLocation;
  }

}

declare module 'noobanidus.mods.lootr.common.loot.conditions.LootCount' {
  import { Enum, Integer } from 'java.lang';
  import { List } from 'java.util';

  interface Operand extends Enum<Operand> {}
  class Operand extends Enum<Operand> {
    static readonly EQUALS: Operand;
    static readonly NOT_EQUALS: Operand;
    static readonly LESS_THAN: Operand;
    static readonly GREATER_THAN: Operand;
    static readonly LESS_THAN_EQUALS: Operand;
    static readonly GREATER_THAN_EQUALS: Operand;
    get precedence(): number;
    get serializedName(): string;
    test(integer: number, integer2: number): boolean;
    static valueOf(name: string): Operand;
    static values(): Operand[];
  }

}

declare module 'noobanidus.mods.lootr.common.mixin.accessor' {
  import { NonNullList, BlockPos } from 'net.minecraft.core';
  import { ItemStack } from 'net.minecraft.world.item';
  import { LockCode } from 'net.minecraft.world';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';
  import { Iterable } from 'java.lang';
  import { ChunkHolder } from 'net.minecraft.server.level';
  import { Map, Optional } from 'java.util';
  import { SavedData } from 'net.minecraft.world.level.saveddata';
  import { EntityDataAccessor } from 'net.minecraft.network.syncher';
  import { LevelStorageAccess } from 'LevelStorageSource';

  class AccessorMixinBaseContainerBlockEntity {
    get lockKey(): LockCode;
    invokeGetItems(): NonNullList<ItemStack>;
    set lockKey(var1: LockCode);
  }


  class AccessorMixinBlock {
    lootr$spawnDestroyParticles(var1: Level, var2: Player, var3: BlockPos, var4: BlockState): void;
  }


  class AccessorMixinBrushableBlockEntity {
    lootr$getLootTable(): ResourceKey<LootTable>;
    lootr$getLootTableSeed(): number;
  }


  class AccessorMixinChunkMap {
    lootr$getChunks(): Iterable<ChunkHolder>;
  }


  class AccessorMixinDimensionDataStorage {
    get cache(): Map<string, SavedData>;
  }


  class AccessorMixinFallingBlockEntity {
    lootr$setBlockState(var1: BlockState): void;
  }


  class AccessorMixinItemFrame {
    static lootr$getDataItem(): EntityDataAccessor<ItemStack>;
    lootr$isFixed(): boolean;
    lootr$onItemChanged(var1: ItemStack): void;
  }


  class AccessorMixinLootTable {
    get randomSequence(): Optional<ResourceLocation>;
  }


  class AccessorMixinMinecraftServer {
    Lootr$getStorageSource(): LevelStorageAccess;
  }

}

declare module 'noobanidus.mods.lootr.common.mixin.brushing' {
  class MixinBrushItem {
  }

}

declare module 'noobanidus.mods.lootr.common.mixin.cat' {
  class MixinCatSitOnBlockGoal {
  }

}

declare module 'noobanidus.mods.lootr.common.mixin.chest_blocking' {
  class MixinChestBlock {
  }

}

declare module 'noobanidus.mods.lootr.common.mixin.elytra' {
  class MixinEndCityPieces$EndCityPiece {
  }

}

declare module 'noobanidus.mods.lootr.common.mixin.falling' {
  class MixinFallingBlockEntity {
  }

}

declare module 'noobanidus.mods.lootr.common.mixin.filter' {
  class MixinLootTable {
  }

}

declare module 'noobanidus.mods.lootr.common.mixin.lock' {
  class MixinBaseContainerBlockEntity {
  }

}

declare module 'noobanidus.mods.lootr.common.mixin.poi' {
  class MixinPoiType {
  }


  class MixinPoiTypes {
  }

}

declare module 'noobanidus.mods.lootr.common.mixin.structure_saving' {
  class MixinStructureTemplate {
  }

}

declare module 'noobanidus.mods.lootr.common.mixin.ticker' {
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Operation } from 'com.llamalad7.mixinextras.injector.wrapoperation';
  import { Boolean, Void } from 'java.lang';
  import { ResourceKey } from 'net.minecraft.resources';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';
  import { Level } from 'net.minecraft.world.level';
  import { RandomizableContainer } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  class MixinBrushableBlockEntity {
    lootr$tryLoadLootTable(instance: CompoundTag, string: string, i: number, original: Operation<boolean>): boolean;
  }


  class MixinLevelChunk {
  }


  class MixinRandomizableContainer {
    get level(): Level;
    get lootTable(): ResourceKey<LootTable>;
    lootr$setLootTable(instance: RandomizableContainer, table: ResourceKey<LootTable>, original: Operation<Void>): void;
    lootr$tryLoadLootTable(instance: RandomizableContainer, l: number, original: Operation<Void>): void;
    lootr$unpackLootTable(player: Player, ci: CallbackInfo): void;
  }


  class MixinStructureTemplate {
  }

}

declare module 'noobanidus.mods.lootr.neoforge.block' {
  import { ModelData } from 'net.neoforged.neoforge.client.model.data';

  class ModelDataConstants {
    static readonly OPENED_MODEL_DATA: ModelData;
    static readonly CLOSED_MODEL_DATA: ModelData;
  }

}

declare module 'noobanidus.mods.lootr.neoforge.client.block' {
  import { IUnbakedGeometry, IGeometryBakingContext } from 'net.neoforged.neoforge.client.model.geometry';
  import { UnbakedModel, BakedModel, ModelBaker, Material, ModelState } from 'net.minecraft.client.resources.model';
  import { Function } from 'java.util.function';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { ItemOverrides } from 'net.minecraft.client.renderer.block.model';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ChestRenderer, BlockEntityRenderer } from 'net.minecraft.client.renderer.blockentity';
  import { Context } from 'BlockEntityRendererProvider';
  import { LootrShulkerBlockEntity } from 'noobanidus.mods.lootr.common.block.entity';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';

  interface BarrelModel extends IUnbakedGeometry<BarrelModel> {}
  class BarrelModel extends IUnbakedGeometry<BarrelModel> {
    constructor(opened: UnbakedModel, unopened: UnbakedModel, vanilla: UnbakedModel, old_unopened: UnbakedModel, old_opened: UnbakedModel);
    bake(context: IGeometryBakingContext, bakery: ModelBaker, spriteGetter: Function<Material, TextureAtlasSprite>, modelTransform: ModelState, overrides: ItemOverrides): BakedModel;
    resolveParents(modelGetter: Function<ResourceLocation, UnbakedModel>, context: IGeometryBakingContext): void;
  }


  interface BrushableModel extends IUnbakedGeometry<BrushableModel> {}
  class BrushableModel extends IUnbakedGeometry<BrushableModel> {
    constructor(opened: UnbakedModel, stage_0: UnbakedModel, stage_1: UnbakedModel, stage_2: UnbakedModel, stage_3: UnbakedModel);
    bake(context: IGeometryBakingContext, bakery: ModelBaker, spriteGetter: Function<Material, TextureAtlasSprite>, modelTransform: ModelState, overrides: ItemOverrides): BakedModel;
    resolveParents(modelGetter: Function<ResourceLocation, UnbakedModel>, context: IGeometryBakingContext): void;
  }


  interface CustomModel extends IUnbakedGeometry<CustomModel> {}
  class CustomModel extends IUnbakedGeometry<CustomModel> {
    constructor(opened: UnbakedModel, unopened: UnbakedModel, vanilla: UnbakedModel);
    bake(context: IGeometryBakingContext, bakery: ModelBaker, spriteGetter: Function<Material, TextureAtlasSprite>, modelTransform: ModelState, overrides: ItemOverrides): BakedModel;
    resolveParents(modelGetter: Function<ResourceLocation, UnbakedModel>, context: IGeometryBakingContext): void;
  }


  interface LootrChestBlockRenderer<T extends LootrChestBlockEntity = any> extends ChestRenderer<T> {}
  class LootrChestBlockRenderer<T extends LootrChestBlockEntity = any> extends ChestRenderer<T> {
    static readonly MATERIAL: Material;
    static readonly MATERIAL2: Material;
    static readonly MATERIAL3: Material;
    static readonly MATERIAL4: Material;
    static readonly OLD_MATERIAL: Material;
    static readonly OLD_MATERIAL2: Material;
    static readonly OLD_MATERIAL3: Material;
    static readonly OLD_MATERIAL4: Material;
    constructor(p_173607_: Context);
  }


  interface LootrShulkerBlockRenderer extends BlockEntityRenderer<LootrShulkerBlockEntity> {}
  class LootrShulkerBlockRenderer extends BlockEntityRenderer<LootrShulkerBlockEntity> {
    static readonly MATERIAL: Material;
    static readonly MATERIAL2: Material;
    static readonly MATERIAL3: Material;
    static readonly MATERIAL4: Material;
    constructor(context: Context);
    render(pBlockEntity: LootrShulkerBlockEntity, pPartialTicks: number, pMatrixStack: PoseStack, pBuffer: MultiBufferSource, pCombinedLight: number, pCombinedOverlay: number): void;
  }

}

declare module 'noobanidus.mods.lootr.neoforge.client.block.BarrelModel' {
  import { IGeometryLoader } from 'net.neoforged.neoforge.client.model.geometry';
  import { BarrelModel } from 'noobanidus.mods.lootr.neoforge.client.block';
  import { JsonObject, JsonDeserializationContext } from 'com.google.gson';

  interface Loader extends IGeometryLoader<BarrelModel> {}
  class Loader extends IGeometryLoader<BarrelModel> {
    static readonly INSTANCE: Loader;
    read(modelContents: JsonObject, deserializationContext: JsonDeserializationContext): BarrelModel;
  }

}

declare module 'noobanidus.mods.lootr.neoforge.client.block.BrushableModel' {
  import { IGeometryLoader } from 'net.neoforged.neoforge.client.model.geometry';
  import { BrushableModel } from 'noobanidus.mods.lootr.neoforge.client.block';
  import { JsonObject, JsonDeserializationContext } from 'com.google.gson';

  interface Loader extends IGeometryLoader<BrushableModel> {}
  class Loader extends IGeometryLoader<BrushableModel> {
    static readonly INSTANCE: Loader;
    read(modelContents: JsonObject, deserializationContext: JsonDeserializationContext): BrushableModel;
  }

}

declare module 'noobanidus.mods.lootr.neoforge.client.block.CustomModel' {
  import { IGeometryLoader } from 'net.neoforged.neoforge.client.model.geometry';
  import { CustomModel } from 'noobanidus.mods.lootr.neoforge.client.block';
  import { JsonObject, JsonDeserializationContext } from 'com.google.gson';

  interface Loader extends IGeometryLoader<CustomModel> {}
  class Loader extends IGeometryLoader<CustomModel> {
    static readonly BARREL_INSTANCE: Loader;
    static readonly INSTANCE: Loader;
    read(modelContents: JsonObject, deserializationContext: JsonDeserializationContext): CustomModel;
  }

}

declare module 'noobanidus.mods.lootr.neoforge.config' {
  import { ConfigManagerBase } from 'noobanidus.mods.lootr.common.config';
  import { BooleanValue, IntValue, ConfigValue } from 'ModConfigSpec';
  import { ModConfigSpec } from 'net.neoforged.neoforge.common';
  import { Reloading, Loading } from 'ModConfigEvent';
  import { ModConfigEvent } from 'net.neoforged.fml.event.config';
  import { Set } from 'java.util';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Level } from 'net.minecraft.world.level';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';
  import { ILootrInfoProvider } from 'noobanidus.mods.lootr.common.api.data';

  interface ConfigManager extends ConfigManagerBase {}
  class ConfigManager extends ConfigManagerBase {
    static readonly REPORT_UNRESOLVED_TABLES: BooleanValue;
    static readonly RANDOMISE_SEED: BooleanValue;
    static readonly DISABLE: BooleanValue;
    static readonly MAXIMUM_AGE: IntValue;
    static readonly SAVE_MODE: ConfigValue;
    static readonly CONVERT_MINESHAFTS: BooleanValue;
    static readonly CONVERT_ELYTRAS_TO_CHESTS: BooleanValue;
    static readonly CONVERT_ELYTRAS_TO_ITEM_FRAMES: BooleanValue;
    static readonly CONVERT_ITEM_FRAMES: BooleanValue;
    static readonly PERFORM_PIECEWISE_CHECK: BooleanValue;
    static readonly BYPASS_SPAWN_PROTECTION: BooleanValue;
    static readonly DISABLE_BREAK: BooleanValue;
    static readonly ENABLE_BREAK: BooleanValue;
    static readonly ENABLE_FAKE_PLAYER_BREAK: BooleanValue;
    static readonly CHECK_WORLD_BORDER: BooleanValue;
    static readonly BRUSHABLES_SELF_SUPPORT: BooleanValue;
    static readonly ITEM_FRAMES_SELF_SUPPORT: BooleanValue;
    static readonly DIMENSION_WHITELIST: ConfigValue;
    static readonly DIMENSION_BLACKLIST: ConfigValue;
    static readonly LOOT_TABLE_BLACKLIST: ConfigValue;
    static readonly PROBLEMATIC_LOOT_TABLES: ConfigValue;
    static readonly LOOT_MODID_BLACKLIST: ConfigValue;
    static readonly MODID_DIMENSION_WHITELIST: ConfigValue;
    static readonly MODID_DIMENSION_BLACKLIST: ConfigValue;
    static readonly DECAY_VALUE: IntValue;
    static readonly DECAY_ALL: BooleanValue;
    static readonly PERFORM_DECAY_WHILE_TICKING: BooleanValue;
    static readonly START_DECAY_WHILE_TICKING: BooleanValue;
    static readonly DECAY_MODIDS: ConfigValue;
    static readonly DECAY_LOOT_TABLES: ConfigValue;
    static readonly DECAY_DIMENSIONS: ConfigValue;
    static readonly REPLACE_WHEN_DECAYED: BooleanValue;
    static readonly REFRESH_VALUE: IntValue;
    static readonly REFRESH_ALL: BooleanValue;
    static readonly PERFORM_REFRESH_WHILE_TICKING: BooleanValue;
    static readonly START_REFRESH_WHILE_TICKING: BooleanValue;
    static readonly REFRESH_MODIDS: ConfigValue;
    static readonly REFRESH_LOOT_TABLES: ConfigValue;
    static readonly REFRESH_DIMENSIONS: ConfigValue;
    static readonly POWER_COMPARATORS: BooleanValue;
    static readonly BLAST_RESISTANT: BooleanValue;
    static readonly BLAST_IMMUNE: BooleanValue;
    static readonly SHOULD_DROP_PLAYER_LOOT: BooleanValue;
    static readonly NOTIFICATION_DELAY: IntValue;
    static readonly DISABLE_NOTIFICATIONS: BooleanValue;
    static readonly DISABLE_MESSAGE_STYLES: BooleanValue;
    static readonly TRAPPED_CUSTOM: BooleanValue;
    static readonly SHOULD_WARN_NO_LOOT_TABLE_AT_GENERATION: BooleanValue;
    static readonly VANILLA_TEXTURES: BooleanValue;
    static readonly NEW_TEXTURES: BooleanValue;
    static readonly UNOPENED_PARTICLES: BooleanValue;
    static COMMON_CONFIG: ModConfigSpec;
    static CLIENT_CONFIG: ModConfigSpec;
    static configEvent(event: ModConfigEvent): void;
    static get decayDimensions(): Set<ResourceKey<Level>>;
    static get decayMods(): Set<string>;
    static get decayingTables(): Set<ResourceKey<LootTable>>;
    static get dimensionBlacklist(): Set<ResourceKey<Level>>;
    static get dimensionModidBlacklist(): Set<string>;
    static get dimensionModidWhitelist(): Set<string>;
    static get dimensionWhitelist(): Set<ResourceKey<Level>>;
    static get lootBlacklist(): Set<ResourceKey<LootTable>>;
    static get lootModids(): Set<string>;
    static get refreshDimensions(): Set<ResourceKey<Level>>;
    static get refreshMods(): Set<string>;
    static get refreshingTables(): Set<ResourceKey<LootTable>>;
    static isDecaying(provider: ILootrInfoProvider): boolean;
    static isDimensionBlocked(key: ResourceKey<Level>): boolean;
    static isDimensionDecaying(key: ResourceKey<Level>): boolean;
    static isDimensionRefreshing(key: ResourceKey<Level>): boolean;
    static isLootTableBlacklisted(table: ResourceKey<LootTable>): boolean;
    static isNewTextures(): boolean;
    static isRefreshing(provider: ILootrInfoProvider): boolean;
    static isVanillaTextures(): boolean;
    static loadConfig(event: Loading): void;
    static reloadConfig(event: Reloading): void;
    static shouldNotify(remaining: number): boolean;
    static shouldPerformPiecewiseCheck(): boolean;
  }

}

declare module 'noobanidus.mods.lootr.neoforge.event' {
  import { AdvancementEarnEvent } from 'AdvancementEvent';
  import { BreakEvent } from 'BlockEvent';
  import { EntityJoinLevelEvent } from 'net.neoforged.neoforge.event.entity';
  import { Load, Unload } from 'ChunkEvent';
  import { ServerAboutToStartEvent, ServerStoppedEvent } from 'net.neoforged.neoforge.event.server';
  import { TagsUpdatedEvent, AddPackFindersEvent } from 'net.neoforged.neoforge.event';
  import { Post } from 'ServerTickEvent';

  class HandleAdvancement {
    static onAdvancement(event: AdvancementEarnEvent): void;
  }


  class HandleBreak {
    static onBlockBreak(event: BreakEvent): void;
  }


  class HandleCart {
    static onEntityJoin(event: EntityJoinLevelEvent): void;
  }


  class HandleChunk {
    static onChunkLoad(event: Load): void;
    static onChunkUnload(event: Unload): void;
    static onServerStarted(event: ServerAboutToStartEvent): void;
    static onServerStopped(event: ServerStoppedEvent): void;
  }


  class HandleDebug {
    static handleTagUpdate(event: TagsUpdatedEvent): void;
  }


  class HandleResourcePacks {
    static onResourcePacks(event: AddPackFindersEvent): void;
  }


  class HandleTick {
    static onServerTick(event: Post): void;
  }

}

declare module 'noobanidus.mods.lootr.neoforge.gen.compat' {
  import { BlockTagsProvider, ExistingFileHelper } from 'net.neoforged.neoforge.common.data';
  import { List } from 'java.util';
  import { DataGenerator } from 'net.minecraft.data';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';
  import { GatherDataEvent } from 'net.neoforged.neoforge.data.event';

  interface LootrCompatBlockTagProvider extends BlockTagsProvider {}
  class LootrCompatBlockTagProvider extends BlockTagsProvider {
    constructor(compatModid: string, barrelBlockIds: string[], chestBlockIds: string[], trappedBlockIds: string[], shulkerBoxIds: string[], generator: DataGenerator, lookupProvider: CompletableFuture<Provider>, existingFileHelper: ExistingFileHelper);
    get name(): string;
  }


  class LootrCompatDataGenerators {
    static gatherData(event: GatherDataEvent): void;
  }

}

declare module 'noobanidus.mods.lootr.neoforge.gen' {
  import { AdvancementGenerator } from 'AdvancementProvider';
  import { Provider } from 'HolderLookup';
  import { Consumer } from 'java.util.function';
  import { AdvancementHolder } from 'net.minecraft.advancements';
  import { ExistingFileHelper, SpriteSourceProvider, BlockTagsProvider, LanguageProvider, ParticleDescriptionProvider } from 'net.neoforged.neoforge.common.data';
  import { PackOutput } from 'net.minecraft.data';
  import { CompletableFuture } from 'java.util.concurrent';
  import { IntrinsicHolderTagsProvider, EntityTypeTagsProvider, ItemTagsProvider } from 'net.minecraft.data.tags';
  import { BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { GatherDataEvent } from 'net.neoforged.neoforge.data.event';
  import { TagLookup } from 'TagsProvider';
  import { Block } from 'net.minecraft.world.level.block';
  import { LootTableProvider } from 'net.minecraft.data.loot';
  import { Structure } from 'net.minecraft.world.level.levelgen.structure';

  interface LootrAdvancementGenerator extends AdvancementGenerator {}
  class LootrAdvancementGenerator extends AdvancementGenerator {
    generate(arg: Provider, consumer: Consumer<AdvancementHolder>, existingFileHelper: ExistingFileHelper): void;
  }


  interface LootrAtlasGenerator extends SpriteSourceProvider {}
  class LootrAtlasGenerator extends SpriteSourceProvider {
    constructor(output: PackOutput, lookupProvider: CompletableFuture<Provider>, fileHelper: ExistingFileHelper);
  }


  interface LootrBlockEntityTagsProvider extends IntrinsicHolderTagsProvider<BlockEntityType> {}
  class LootrBlockEntityTagsProvider extends IntrinsicHolderTagsProvider<BlockEntityType> {
    constructor(arg: PackOutput, completableFuture: CompletableFuture<Provider>, existingFileHelper: ExistingFileHelper);
    get name(): string;
  }


  interface LootrBlockTagProvider extends BlockTagsProvider {}
  class LootrBlockTagProvider extends BlockTagsProvider {
    constructor(output: PackOutput, lookupProvider: CompletableFuture<Provider>, existingFileHelper: ExistingFileHelper);
    get name(): string;
  }


  class LootrDataGenerators {
    static gatherData(event: GatherDataEvent): void;
  }


  class LootrDataPackGenerators {
    static onGatherData(event: GatherDataEvent): void;
  }


  interface LootrEntityTagsProvider extends EntityTypeTagsProvider {}
  class LootrEntityTagsProvider extends EntityTypeTagsProvider {
    constructor(arg: PackOutput, completableFuture: CompletableFuture<Provider>, existingFileHelper: ExistingFileHelper);
    get name(): string;
  }


  interface LootrItemTagsProvider extends ItemTagsProvider {}
  class LootrItemTagsProvider extends ItemTagsProvider {
    constructor(output: PackOutput, lookup: CompletableFuture<Provider>, blockTags: CompletableFuture<TagLookup<Block>>, existingFileHelper: ExistingFileHelper);
    get name(): string;
  }


  interface LootrLangProvider extends LanguageProvider {}
  class LootrLangProvider extends LanguageProvider {
    constructor(output: PackOutput);
  }


  class LootrLootTableProvider {
    static create(output: PackOutput, provider: CompletableFuture<Provider>): LootTableProvider;
  }


  interface LootrParticleProvider extends ParticleDescriptionProvider {}
  class LootrParticleProvider extends ParticleDescriptionProvider {
  }


  interface LootrStructureTagsProvider extends IntrinsicHolderTagsProvider<Structure> {}
  class LootrStructureTagsProvider extends IntrinsicHolderTagsProvider<Structure> {
    constructor(arg: PackOutput, completableFuture: CompletableFuture<Provider>, existingFileHelper: ExistingFileHelper);
    get name(): string;
  }

}

declare module 'noobanidus.mods.lootr.neoforge.gen.LootrLootTableProvider' {
  import { LootTableSubProvider, BlockLootSubProvider } from 'net.minecraft.data.loot';
  import { Provider } from 'HolderLookup';
  import { BiConsumer } from 'java.util.function';
  import { ResourceKey } from 'net.minecraft.resources';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';
  import { Builder } from 'LootTable';

  interface ChestLootTables extends LootTableSubProvider {}
  class ChestLootTables extends LootTableSubProvider {
    constructor(provider: Provider);
    generate(consumer: BiConsumer<ResourceKey<LootTable>, Builder>): void;
  }


  interface LootrBlockLootTables extends BlockLootSubProvider {}
  class LootrBlockLootTables extends BlockLootSubProvider {
    generate(biConsumer: BiConsumer<ResourceKey<LootTable>, Builder>): void;
  }

}

declare module 'noobanidus.mods.lootr.neoforge.gen.optionals' {
  import { DataGenerator } from 'net.minecraft.data';
  import { Path } from 'java.nio.file';
  import { Component } from 'net.minecraft.network.chat';
  import { GatherDataEvent } from 'net.neoforged.neoforge.data.event';

  class LootrNoAdvancementGenerator {
    static gatherData(event: GatherDataEvent): void;
    static makeGenerator(path: Path, description: Component): DataGenerator;
  }


  class LootrNoSuspiciousGenerator {
  }

}

declare module 'noobanidus.mods.lootr.neoforge.gen.optionals.LootrNoAdvancementGenerator' {
  import { AdvancementGenerator } from 'AdvancementProvider';
  import { Provider } from 'HolderLookup';
  import { Consumer } from 'java.util.function';
  import { AdvancementHolder } from 'net.minecraft.advancements';
  import { ExistingFileHelper } from 'net.neoforged.neoforge.common.data';

  interface LootrAdvancementGenerator extends AdvancementGenerator {}
  class LootrAdvancementGenerator extends AdvancementGenerator {
    generate(arg: Provider, consumer: Consumer<AdvancementHolder>, existingFileHelper: ExistingFileHelper): void;
  }

}

declare module 'noobanidus.mods.lootr.neoforge.gen.optionals.LootrNoSuspiciousGenerator' {
  import { BlockTagsProvider, ExistingFileHelper } from 'net.neoforged.neoforge.common.data';
  import { PackOutput } from 'net.minecraft.data';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';

  interface LootrBlockTagProvider extends BlockTagsProvider {}
  class LootrBlockTagProvider extends BlockTagsProvider {
    constructor(output: PackOutput, lookupProvider: CompletableFuture<Provider>, existingFileHelper: ExistingFileHelper);
    get name(): string;
  }

}

declare module 'noobanidus.mods.lootr.neoforge.init' {
  import { DeferredHolder } from 'net.neoforged.neoforge.registries';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModelProperty } from 'net.neoforged.neoforge.client.model.data';
  import { Stat } from 'net.minecraft.stats';

  class ModAdvancements {
    static readonly ADVANCEMENT: DeferredHolder;
    static readonly CHEST: DeferredHolder;
    static readonly BARREL: DeferredHolder;
    static readonly CART: DeferredHolder;
    static readonly SHULKER: DeferredHolder;
    static readonly STAT: DeferredHolder;
    static readonly GRAVEL: DeferredHolder;
    static readonly SAND: DeferredHolder;
    static readonly POT: DeferredHolder;
    static readonly ITEM_FRAME: DeferredHolder;
    static register(bus: IEventBus): void;
  }


  class ModBlockEntities {
    static readonly LOOTR_CHEST: DeferredHolder;
    static readonly LOOTR_TRAPPED_CHEST: DeferredHolder;
    static readonly LOOTR_BARREL: DeferredHolder;
    static readonly LOOTR_INVENTORY: DeferredHolder;
    static readonly LOOTR_SHULKER: DeferredHolder;
    static readonly LOOTR_BRUSHABLE_BLOCK: DeferredHolder;
    static readonly LOOTR_DECORATED_POT: DeferredHolder;
    static register(bus: IEventBus): void;
  }


  class ModBlockProperties {
    static readonly OPENED: ModelProperty;
  }


  class ModBlocks {
    static readonly BARREL: DeferredHolder;
    static readonly CHEST: DeferredHolder;
    static readonly TRAPPED_CHEST: DeferredHolder;
    static readonly INVENTORY: DeferredHolder;
    static readonly SHULKER: DeferredHolder;
    static readonly SUSPICIOUS_SAND: DeferredHolder;
    static readonly SUSPICIOUS_GRAVEL: DeferredHolder;
    static readonly DECORATED_POT: DeferredHolder;
    static readonly TROPHY: DeferredHolder;
    static register(bus: IEventBus): void;
  }


  class ModEntities {
    static readonly LOOTR_MINECART_ENTITY: DeferredHolder;
    static readonly ITEM_FRAME: DeferredHolder;
    static register(bus: IEventBus): void;
  }


  class ModItems {
    static readonly CHEST: DeferredHolder;
    static readonly TRAPPED_CHEST: DeferredHolder;
    static readonly BARREL: DeferredHolder;
    static readonly INVENTORY: DeferredHolder;
    static readonly SHULKER: DeferredHolder;
    static readonly SUSPICIOUS_SAND: DeferredHolder;
    static readonly SUSPICIOUS_GRAVEL: DeferredHolder;
    static readonly DECORATED_POT: DeferredHolder;
    static readonly TROPHY: DeferredHolder;
    static register(bus: IEventBus): void;
  }


  class ModLoot {
    static readonly LOOT_COUNT: DeferredHolder;
    static register(bus: IEventBus): void;
  }


  class ModParticles {
    static readonly UNOPENED_PARTICLE: DeferredHolder;
    static register(bus: IEventBus): void;
  }


  class ModStats {
    static readonly LOOTED_LOCATION: DeferredHolder;
    static LOOTED_STAT: Stat;
    static load(): void;
    static register(bus: IEventBus): void;
  }


  class ModTabs {
    static readonly LOOTR: DeferredHolder;
    static register(bus: IEventBus): void;
  }

}

declare module 'noobanidus.mods.lootr.neoforge' {
  import { ModContainer } from 'net.neoforged.fml';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RegisterCommandsEvent } from 'net.neoforged.neoforge.event';

  class Lootr {
    constructor(modContainer: ModContainer, modBus: IEventBus);
    onCommands(event: RegisterCommandsEvent): void;
    static rl(path: string): ResourceLocation;
  }


  class LootrClient {
    constructor(modContainer: ModContainer, modBus: IEventBus);
  }

}

declare module 'noobanidus.mods.lootr.neoforge.mixin.integration.digsite_workshop' {
  import { IModdedBrushItem } from 'noobanidus.mods.lootr.common.integration.digsite_workshop';

  interface MixinModdedBrushItem extends IModdedBrushItem {}
  class MixinModdedBrushItem extends IModdedBrushItem {
    lootr$getBrushingSpeed(): number;
  }

}

declare module 'noobanidus.mods.lootr.neoforge.mixin.self' {
  import { IBlockEntityExtension } from 'net.neoforged.neoforge.common.extensions';
  import { ModelData } from 'net.neoforged.neoforge.client.model.data';

  interface MixinLootrBarrelBlockEntity extends IBlockEntityExtension {}
  class MixinLootrBarrelBlockEntity extends IBlockEntityExtension {
    get modelData(): ModelData;
  }


  interface MixinLootrBrushableBlockEntity extends IBlockEntityExtension {}
  class MixinLootrBrushableBlockEntity extends IBlockEntityExtension {
    get modelData(): ModelData;
  }

}

declare module 'noobanidus.mods.lootr.neoforge.network.client' {
  import { BlockPos } from 'net.minecraft.core';

  class ClientHandlers {
    static handleCloseCart(entityId: number): void;
    static handleCloseContainer(pos: BlockPos): void;
    static handleOpenCart(entityId: number): void;
    static handleOpenContainer(pos: BlockPos): void;
    static handleRefresh(): void;
  }

}

declare module 'noobanidus.mods.lootr.neoforge.network' {
  import { ILootrPacket } from 'noobanidus.mods.lootr.common.api.network';
  import { IPayloadContext } from 'net.neoforged.neoforge.network.handling';
  import { RegisterPayloadHandlersEvent } from 'net.neoforged.neoforge.network.event';

  interface ILootrNeoForgePacket extends ILootrPacket {}
  class ILootrNeoForgePacket extends ILootrPacket {
    handle(var1: IPayloadContext): void;
  }


  class PacketHandler {
    static onRegisterPayloads(event: RegisterPayloadHandlersEvent): void;
  }

}

declare module 'noobanidus.mods.lootr.neoforge.setup' {
  import { RegisterAdditional, RegisterGeometryLoaders } from 'ModelEvent';
  import { RegisterRenderers, RegisterLayerDefinitions } from 'EntityRenderersEvent';
  import { RegisterClientExtensionsEvent } from 'net.neoforged.neoforge.client.extensions.common';
  import { BlockEntityWithoutLevelRenderer } from 'net.minecraft.client.renderer';
  import { RegisterParticleProvidersEvent } from 'net.neoforged.neoforge.client.event';

  class ClientSetup {
    get customRenderer(): BlockEntityWithoutLevelRenderer;
    get customRenderer(): BlockEntityWithoutLevelRenderer;
    get customRenderer(): BlockEntityWithoutLevelRenderer;
    get customRenderer(): BlockEntityWithoutLevelRenderer;
    static modelAdditional(event: RegisterAdditional): void;
    static modelRegister(event: RegisterGeometryLoaders): void;
    static registerClientExtensions(event: RegisterClientExtensionsEvent): void;
    static registerLayersEvent(event: RegisterLayerDefinitions): void;
    static registerParticles(event: RegisterParticleProvidersEvent): void;
    static registerRenderers(event: RegisterRenderers): void;
  }

}