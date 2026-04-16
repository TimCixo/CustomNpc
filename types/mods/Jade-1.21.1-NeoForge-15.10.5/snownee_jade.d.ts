declare module 'snownee.jade.addon.access' {
  import { IWailaPlugin, IWailaClientRegistration, ITooltip, IBlockComponentProvider, BlockAccessor, IEntityComponentProvider, EntityAccessor } from 'snownee.jade.api';
  import { IPluginConfig } from 'snownee.jade.api.config';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface AccessibilityPlugin extends IWailaPlugin {}
  class AccessibilityPlugin extends IWailaPlugin {
    registerClient(registration: IWailaClientRegistration): void;
    static replaceTitle(tooltip: ITooltip, key: string): void;
  }


  interface BlockAmountProvider extends IBlockComponentProvider {}
  class BlockAmountProvider extends IBlockComponentProvider {
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    isRequired(): boolean;
  }


  interface BlockDetailsBodyProvider extends IBlockComponentProvider {}
  class BlockDetailsBodyProvider extends IBlockComponentProvider {
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    isRequired(): boolean;
  }


  interface BlockDetailsProvider extends IBlockComponentProvider {}
  class BlockDetailsProvider extends IBlockComponentProvider {
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get defaultPriority(): number;
    get uid(): ResourceLocation;
  }


  interface EntityDetailsBodyProvider extends IEntityComponentProvider {}
  class EntityDetailsBodyProvider extends IEntityComponentProvider {
    appendTooltip(tooltip: ITooltip, accessor: EntityAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    isRequired(): boolean;
  }


  interface EntityDetailsProvider extends IEntityComponentProvider {}
  class EntityDetailsProvider extends IEntityComponentProvider {
    appendTooltip(tooltip: ITooltip, accessor: EntityAccessor, config: IPluginConfig): void;
    get defaultPriority(): number;
    get uid(): ResourceLocation;
  }


  interface EntityVariantProvider extends IEntityComponentProvider {}
  class EntityVariantProvider extends IEntityComponentProvider {
    appendTooltip(tooltip: ITooltip, accessor: EntityAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
  }


  interface HeldItemProvider extends IEntityComponentProvider {}
  class HeldItemProvider extends IEntityComponentProvider {
    appendTooltip(tooltip: ITooltip, accessor: EntityAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
  }


  interface SignProvider extends IBlockComponentProvider {}
  class SignProvider extends IBlockComponentProvider {
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
  }

}

declare module 'snownee.jade.addon.core' {
  import { Enum } from 'java.lang';
  import { ITooltip, BlockAccessor, IWailaPlugin, IWailaCommonRegistration, IWailaClientRegistration, IToggleableProvider, Accessor } from 'snownee.jade.api';
  import { IPluginConfig } from 'snownee.jade.api.config';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { MutableComponent, Component } from 'net.minecraft.network.chat';
  import { Direction, Vec3i, BlockPos } from 'net.minecraft.core';
  import { List } from 'java.util';
  import { DecimalFormat } from 'java.text';
  import { ForBlock, ForEntity } from 'snownee.jade.addon.core.DistanceProvider';
  import { ForBlock as snownee_jade_addon_core_modnameprovider_ForBlock, ForEntity as snownee_jade_addon_core_modnameprovider_ForEntity } from 'snownee.jade.addon.core.ModNameProvider';

  interface BlockFaceProvider extends Enum<BlockFaceProvider> {}
  class BlockFaceProvider extends Enum<BlockFaceProvider> {
    static readonly INSTANCE: BlockFaceProvider;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    static directionName(direction: Direction): MutableComponent;
    enabledByDefault(): boolean;
    get defaultPriority(): number;
    get uid(): ResourceLocation;
    static valueOf(name: string): BlockFaceProvider;
    static values(): BlockFaceProvider[];
  }


  interface CorePlugin extends IWailaPlugin {}
  class CorePlugin extends IWailaPlugin {
    register(registration: IWailaCommonRegistration): void;
    registerClient(registration: IWailaClientRegistration): void;
  }


  interface DistanceProvider extends IToggleableProvider {}
  class DistanceProvider extends IToggleableProvider {
    static readonly fmt: DecimalFormat;
    append(tooltip: ITooltip, accessor: Accessor<any>, pos: BlockPos, config: IPluginConfig): void;
    static display(i: number, colorIndex: number): Component;
    static distance(accessor: Accessor<any>): string;
    static get block(): ForBlock;
    get defaultPriority(): number;
    static get entity(): ForEntity;
    get uid(): ResourceLocation;
    isRequired(): boolean;
    static narrate(i: number): string;
    static xyz(tooltip: ITooltip, pos: Vec3i): void;
  }


  interface ModNameProvider extends IToggleableProvider {}
  class ModNameProvider extends IToggleableProvider {
    static get block(): snownee_jade_addon_core_modnameprovider_ForBlock;
    get defaultPriority(): number;
    static get entity(): snownee_jade_addon_core_modnameprovider_ForEntity;
    get uid(): ResourceLocation;
  }

}

declare module 'snownee.jade.addon.core.DistanceProvider' {
  import { DistanceProvider } from 'snownee.jade.addon.core';
  import { IBlockComponentProvider, ITooltip, BlockAccessor, IEntityComponentProvider, EntityAccessor } from 'snownee.jade.api';
  import { IPluginConfig } from 'snownee.jade.api.config';

  interface ForBlock extends IBlockComponentProvider, DistanceProvider {}
  class ForBlock extends IBlockComponentProvider {
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
  }


  interface ForEntity extends IEntityComponentProvider, DistanceProvider {}
  class ForEntity extends IEntityComponentProvider {
    appendTooltip(tooltip: ITooltip, accessor: EntityAccessor, config: IPluginConfig): void;
  }

}

declare module 'snownee.jade.addon.core.ModNameProvider' {
  import { ModNameProvider } from 'snownee.jade.addon.core';
  import { IBlockComponentProvider, ITooltip, BlockAccessor, IEntityComponentProvider, EntityAccessor } from 'snownee.jade.api';
  import { IPluginConfig } from 'snownee.jade.api.config';

  interface ForBlock extends IBlockComponentProvider, ModNameProvider {}
  class ForBlock extends IBlockComponentProvider {
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
  }


  interface ForEntity extends IEntityComponentProvider, ModNameProvider {}
  class ForEntity extends IEntityComponentProvider {
    appendTooltip(tooltip: ITooltip, accessor: EntityAccessor, config: IPluginConfig): void;
  }

}

declare module 'snownee.jade.addon.debug' {
  import { Enum } from 'java.lang';
  import { ITooltip, BlockAccessor, IWailaPlugin, IWailaClientRegistration, IToggleableProvider } from 'snownee.jade.api';
  import { IPluginConfig } from 'snownee.jade.api.config';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List } from 'java.util';
  import { ForBlock, ForEntity } from 'snownee.jade.addon.debug.RegistryNameProvider';

  interface BlockPropertiesProvider extends Enum<BlockPropertiesProvider> {}
  class BlockPropertiesProvider extends Enum<BlockPropertiesProvider> {
    static readonly INSTANCE: BlockPropertiesProvider;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    enabledByDefault(): boolean;
    get uid(): ResourceLocation;
    static valueOf(name: string): BlockPropertiesProvider;
    static values(): BlockPropertiesProvider[];
  }


  interface BlockStatesProvider extends Enum<BlockStatesProvider> {}
  class BlockStatesProvider extends Enum<BlockStatesProvider> {
    static readonly INSTANCE: BlockStatesProvider;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    enabledByDefault(): boolean;
    get defaultPriority(): number;
    get uid(): ResourceLocation;
    static valueOf(name: string): BlockStatesProvider;
    static values(): BlockStatesProvider[];
  }


  interface DebugPlugin extends IWailaPlugin {}
  class DebugPlugin extends IWailaPlugin {
    registerClient(registration: IWailaClientRegistration): void;
  }


  interface RegistryNameProvider extends IToggleableProvider {}
  class RegistryNameProvider extends IToggleableProvider {
    append(tooltip: ITooltip, id: string, config: IPluginConfig): boolean;
    static get block(): ForBlock;
    get defaultPriority(): number;
    static get entity(): ForEntity;
    get uid(): ResourceLocation;
    isRequired(): boolean;
  }

}

declare module 'snownee.jade.addon.debug.RegistryNameProvider' {
  import { RegistryNameProvider } from 'snownee.jade.addon.debug';
  import { IBlockComponentProvider, ITooltip, BlockAccessor, IEntityComponentProvider, EntityAccessor } from 'snownee.jade.api';
  import { IPluginConfig } from 'snownee.jade.api.config';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ForBlock extends IBlockComponentProvider, RegistryNameProvider {}
  class ForBlock extends IBlockComponentProvider {
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
  }


  interface ForEntity extends IEntityComponentProvider, RegistryNameProvider {}
  class ForEntity extends IEntityComponentProvider {
    appendTooltip(tooltip: ITooltip, accessor: EntityAccessor, config: IPluginConfig): void;
  }


  interface Mode extends Enum<Mode> {}
  class Mode extends Enum<Mode> {
    static readonly ON: Mode;
    static readonly OFF: Mode;
    static readonly ADVANCED_TOOLTIPS: Mode;
    static valueOf(name: string): Mode;
    static values(): Mode[];
  }

}

declare module 'snownee.jade.addon.harvest' {
  import { IBlockComponentProvider, ITooltip, BlockAccessor, IJadeProvider } from 'snownee.jade.api';
  import { ResourceManagerReloadListener, ResourceManager } from 'net.minecraft.server.packs.resources';
  import { Cache } from 'com.google.common.cache';
  import { Map, List, Collection } from 'java.util';
  import { ImmutableList } from 'com.google.common.collect';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos, Registry } from 'net.minecraft.core';
  import { IPluginConfig } from 'snownee.jade.api.config';
  import { IElement } from 'snownee.jade.api.ui';
  import { Block } from 'net.minecraft.world.level.block';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';

  interface HarvestToolProvider extends IBlockComponentProvider, ResourceManagerReloadListener {}
  class HarvestToolProvider extends IBlockComponentProvider {
    static readonly INSTANCE: HarvestToolProvider;
    readonly resultCache: Cache;
    static readonly TOOL_HANDLERS: Map;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get defaultPriority(): number;
    get shearableBlocks(): Block[];
    get uid(): ResourceLocation;
    getText(accessor: BlockAccessor, config: IPluginConfig): IElement[];
    static getTool(state: BlockState, world: Level, pos: BlockPos): ImmutableList<ItemStack>;
    onResourceManagerReload(resourceManager: ResourceManager): void;
    static registerHandler(handler: ToolHandler): void;
    set shearableBlocks(blocks: Collection<Block>);
  }


  class LootTableMineableCollector {
    constructor(lootRegistry: Registry<LootTable>, toolItem: ItemStack);
    static execute(lootRegistry: Registry<LootTable>, toolItem: ItemStack): Block[];
  }


  interface ShearsToolHandler extends SimpleToolHandler {}
  class ShearsToolHandler extends SimpleToolHandler {
    constructor();
    static get instance(): ShearsToolHandler;
    setShearableBlocks(blocks: Collection<Block>): void;
    test(state: BlockState, world: Level, pos: BlockPos): ItemStack;
  }


  interface SimpleToolHandler extends ToolHandler {}
  class SimpleToolHandler extends ToolHandler {
    addExtraBlock(block: Block): SimpleToolHandler;
    static create(uid: ResourceLocation, tools: Item[]): SimpleToolHandler;
    static create(uid: ResourceLocation, tools: Item[], skipInstaBreakingBlock: boolean): SimpleToolHandler;
    get tools(): ItemStack[];
    get uid(): ResourceLocation;
    test(state: BlockState, world: Level, pos: BlockPos): ItemStack;
  }


  interface ToolHandler extends IJadeProvider {}
  class ToolHandler extends IJadeProvider {
    get tools(): ItemStack[];
    test(var1: BlockState, var2: Level, var3: BlockPos): ItemStack;
  }

}

declare module 'snownee.jade.addon.universal' {
  import { IComponentProvider, IServerDataProvider, ITooltip, Accessor, IWailaPlugin, IWailaCommonRegistration, IWailaClientRegistration } from 'snownee.jade.api';
  import { ForBlock, ForEntity } from 'snownee.jade.addon.universal.EnergyStorageProvider';
  import { IPluginConfig } from 'snownee.jade.api.config';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ForBlock as snownee_jade_addon_universal_fluidstorageprovider_ForBlock, ForEntity as snownee_jade_addon_universal_fluidstorageprovider_ForEntity } from 'snownee.jade.addon.universal.FluidStorageProvider';
  import { List } from 'java.util';
  import { ViewGroup } from 'snownee.jade.api.view';
  import { ItemStack } from 'net.minecraft.world.item';
  import { AtomicLong } from 'java.util.concurrent.atomic';
  import { Stream } from 'java.util.stream';
  import { Cache } from 'com.google.common.cache';
  import { ForBlock as snownee_jade_addon_universal_itemstorageprovider_ForBlock, ForEntity as snownee_jade_addon_universal_itemstorageprovider_ForEntity } from 'snownee.jade.addon.universal.ItemStorageProvider';
  import { ForBlock as snownee_jade_addon_universal_progressprovider_ForBlock, ForEntity as snownee_jade_addon_universal_progressprovider_ForEntity } from 'snownee.jade.addon.universal.ProgressProvider';

  interface EnergyStorageProvider<T extends Accessor<any> = any> extends IComponentProvider<T>, IServerDataProvider<T> {}
  class EnergyStorageProvider<T extends Accessor<any> = any> extends IComponentProvider<T> {
    static append(tooltip: ITooltip, accessor: Accessor<any>, config: IPluginConfig): void;
    appendServerData(data: CompoundTag, accessor: T): void;
    appendTooltip(tooltip: ITooltip, accessor: T, config: IPluginConfig): void;
    static get block(): ForBlock;
    get defaultPriority(): number;
    static get entity(): ForEntity;
    get uid(): ResourceLocation;
    static putData(accessor: Accessor<any>): void;
    shouldRequestData(accessor: T): boolean;
  }


  interface FluidStorageProvider<T extends Accessor<any> = any> extends IComponentProvider<T>, IServerDataProvider<T> {}
  class FluidStorageProvider<T extends Accessor<any> = any> extends IComponentProvider<T> {
    static append(tooltip: ITooltip, accessor: Accessor<any>, config: IPluginConfig): void;
    appendServerData(data: CompoundTag, accessor: T): void;
    appendTooltip(tooltip: ITooltip, accessor: T, config: IPluginConfig): void;
    static get block(): snownee_jade_addon_universal_fluidstorageprovider_ForBlock;
    get defaultPriority(): number;
    static get entity(): snownee_jade_addon_universal_fluidstorageprovider_ForEntity;
    get uid(): ResourceLocation;
    static putData(accessor: Accessor<any>): void;
    shouldRequestData(accessor: T): boolean;
  }


  class ItemCollector<T = any> {
    static readonly MAX_SIZE: number;
    static readonly EMPTY: ItemCollector;
    version: number;
    lastTimeFinished: number;
    lastTimeIsEmpty: boolean;
    mergedResult: List;
    constructor(iterator: ItemIterator<T>);
    update(accessor: Accessor<any>): ViewGroup<ItemStack>[];
  }


  class ItemIterator<T = any> {
    static readonly version: AtomicLong;
    afterPopulate(count: number): void;
    find(accessor: Accessor<any>): T;
    get collectingProgress(): number;
    getVersion(container: T): number;
    isFinished(): boolean;
    populate(var1: T, var2: number): Stream<ItemStack>;
    reset(): void;
  }


  interface ItemStorageProvider<T extends Accessor<any> = any> extends IComponentProvider<T>, IServerDataProvider<T> {}
  class ItemStorageProvider<T extends Accessor<any> = any> extends IComponentProvider<T> {
    static readonly targetCache: Cache;
    static readonly containerCache: Cache;
    static append(tooltip: ITooltip, accessor: Accessor<any>, config: IPluginConfig): void;
    appendServerData(tag: CompoundTag, accessor: T): void;
    appendTooltip(tooltip: ITooltip, accessor: T, config: IPluginConfig): void;
    static get block(): snownee_jade_addon_universal_itemstorageprovider_ForBlock;
    get defaultPriority(): number;
    static get entity(): snownee_jade_addon_universal_itemstorageprovider_ForEntity;
    get uid(): ResourceLocation;
    static putData(accessor: Accessor<any>): void;
    shouldRequestData(accessor: T): boolean;
  }


  interface ProgressProvider<T extends Accessor<any> = any> extends IComponentProvider<T>, IServerDataProvider<T> {}
  class ProgressProvider<T extends Accessor<any> = any> extends IComponentProvider<T> {
    static append(tooltip: ITooltip, accessor: Accessor<any>, config: IPluginConfig): void;
    appendServerData(data: CompoundTag, accessor: T): void;
    appendTooltip(tooltip: ITooltip, accessor: T, config: IPluginConfig): void;
    static get block(): snownee_jade_addon_universal_progressprovider_ForBlock;
    get defaultPriority(): number;
    static get entity(): snownee_jade_addon_universal_progressprovider_ForEntity;
    get uid(): ResourceLocation;
    isRequired(): boolean;
    static putData(accessor: Accessor<any>): void;
    shouldRequestData(accessor: T): boolean;
  }


  interface UniversalPlugin extends IWailaPlugin {}
  class UniversalPlugin extends IWailaPlugin {
    register(registration: IWailaCommonRegistration): void;
    registerClient(registration: IWailaClientRegistration): void;
  }

}

declare module 'snownee.jade.addon.universal.EnergyStorageProvider' {
  import { EnergyStorageProvider } from 'snownee.jade.addon.universal';
  import { BlockAccessor, EntityAccessor, Accessor } from 'snownee.jade.api';
  import { Enum } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List } from 'java.util';
  import { ClientViewGroup, EnergyView, ViewGroup } from 'snownee.jade.api.view';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface ForBlock extends EnergyStorageProvider<BlockAccessor> {}
  class ForBlock extends EnergyStorageProvider<BlockAccessor> {
  }


  interface ForEntity extends EnergyStorageProvider<EntityAccessor> {}
  class ForEntity extends EnergyStorageProvider<EntityAccessor> {
  }


  interface Extension extends Enum<Extension> {}
  class Extension extends Enum<Extension> {
    static readonly INSTANCE: Extension;
    get defaultPriority(): number;
    get uid(): ResourceLocation;
    getClientGroups(accessor: Accessor<any>, groups: ViewGroup<CompoundTag>[]): ClientViewGroup<EnergyView>[];
    getGroups(accessor: Accessor<any>): ViewGroup<CompoundTag>[];
    shouldRequestData(accessor: Accessor<any>): boolean;
    static valueOf(name: string): Extension;
    static values(): Extension[];
  }

}

declare module 'snownee.jade.addon.universal.FluidStorageProvider' {
  import { FluidStorageProvider } from 'snownee.jade.addon.universal';
  import { BlockAccessor, EntityAccessor, Accessor } from 'snownee.jade.api';
  import { Enum } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List } from 'java.util';
  import { ClientViewGroup, FluidView, ViewGroup } from 'snownee.jade.api.view';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface ForBlock extends FluidStorageProvider<BlockAccessor> {}
  class ForBlock extends FluidStorageProvider<BlockAccessor> {
  }


  interface ForEntity extends FluidStorageProvider<EntityAccessor> {}
  class ForEntity extends FluidStorageProvider<EntityAccessor> {
  }


  interface Extension extends Enum<Extension> {}
  class Extension extends Enum<Extension> {
    static readonly INSTANCE: Extension;
    get defaultPriority(): number;
    get uid(): ResourceLocation;
    getClientGroups(accessor: Accessor<any>, groups: ViewGroup<CompoundTag>[]): ClientViewGroup<FluidView>[];
    getGroups(accessor: Accessor<any>): ViewGroup<CompoundTag>[];
    shouldRequestData(accessor: Accessor<any>): boolean;
    static valueOf(name: string): Extension;
    static values(): Extension[];
  }

}

declare module 'snownee.jade.addon.universal.ItemIterator' {
  import { ItemIterator } from 'snownee.jade.addon.universal';
  import { Stream } from 'java.util.stream';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Container } from 'net.minecraft.world';
  import { Function } from 'java.util.function';
  import { Accessor } from 'snownee.jade.api';

  interface SlotlessItemIterator<T = any> extends ItemIterator<T> {}
  class SlotlessItemIterator<T = any> extends ItemIterator<T> {
    populate(container: T, amount: number): Stream<ItemStack>;
  }


  interface ContainerItemIterator extends SlottedItemIterator<Container> {}
  class ContainerItemIterator extends SlottedItemIterator<Container> {
    constructor(fromIndex: number);

    constructor(containerFinder: Function<Accessor<any>, Container>, fromIndex: number);
  }


  interface SlottedItemIterator<T = any> extends ItemIterator<T> {}
  class SlottedItemIterator<T = any> extends ItemIterator<T> {
    constructor(containerFinder: Function<Accessor<any>, T>, fromIndex: number);
    get collectingProgress(): number;
    populate(container: T, amount: number): Stream<ItemStack>;
  }

}

declare module 'snownee.jade.addon.universal.ItemStorageProvider' {
  import { ItemStorageProvider } from 'snownee.jade.addon.universal';
  import { BlockAccessor, EntityAccessor, Accessor } from 'snownee.jade.api';
  import { Enum } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List } from 'java.util';
  import { ViewGroup, ClientViewGroup, ItemView } from 'snownee.jade.api.view';
  import { ItemStack } from 'net.minecraft.world.item';

  interface ForBlock extends ItemStorageProvider<BlockAccessor> {}
  class ForBlock extends ItemStorageProvider<BlockAccessor> {
  }


  interface ForEntity extends ItemStorageProvider<EntityAccessor> {}
  class ForEntity extends ItemStorageProvider<EntityAccessor> {
  }


  interface Extension extends Enum<Extension> {}
  class Extension extends Enum<Extension> {
    static readonly INSTANCE: Extension;
    get defaultPriority(): number;
    get uid(): ResourceLocation;
    getClientGroups(accessor: Accessor<any>, groups: ViewGroup<ItemStack>[]): ClientViewGroup<ItemView>[];
    getGroups(accessor: Accessor<any>): ViewGroup<ItemStack>[];
    shouldRequestData(accessor: Accessor<any>): boolean;
    static valueOf(name: string): Extension;
    static values(): Extension[];
  }

}

declare module 'snownee.jade.addon.universal.ProgressProvider' {
  import { ProgressProvider } from 'snownee.jade.addon.universal';
  import { BlockAccessor, EntityAccessor } from 'snownee.jade.api';

  interface ForBlock extends ProgressProvider<BlockAccessor> {}
  class ForBlock extends ProgressProvider<BlockAccessor> {
  }


  interface ForEntity extends ProgressProvider<EntityAccessor> {}
  class ForEntity extends ProgressProvider<EntityAccessor> {
  }

}

declare module 'snownee.jade.addon.vanilla' {
  import { Enum, Byte, Boolean, Integer } from 'java.lang';
  import { ITooltip, EntityAccessor, BlockAccessor, Accessor, IToggleableProvider, IWailaPlugin, IWailaClientRegistration, IWailaCommonRegistration } from 'snownee.jade.api';
  import { IPluginConfig } from 'snownee.jade.api.config';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { UUID, List } from 'java.util';
  import { Entity } from 'net.minecraft.world.entity';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IElement } from 'snownee.jade.api.ui';
  import { Data } from 'snownee.jade.addon.vanilla.BrewingStandProvider';
  import { ClientViewGroup, ItemView, ViewGroup } from 'snownee.jade.api.view';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Data as snownee_jade_addon_vanilla_furnaceprovider_Data } from 'snownee.jade.addon.vanilla.FurnaceProvider';
  import { ForBlock, ForEntity } from 'snownee.jade.addon.vanilla.MobSpawnerProvider';
  import { MutableComponent, Component } from 'net.minecraft.network.chat';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { MobEffectInstance } from 'net.minecraft.world.effect';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  interface AnimalOwnerProvider extends Enum<AnimalOwnerProvider> {}
  class AnimalOwnerProvider extends Enum<AnimalOwnerProvider> {
    static readonly INSTANCE: AnimalOwnerProvider;
    appendTooltip(tooltip: ITooltip, accessor: EntityAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    static getOwnerUUID(entity: Entity): UUID;
    shouldRequestData(accessor: EntityAccessor): boolean;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, string>;
    streamData(accessor: EntityAccessor): string;
    static valueOf(name: string): AnimalOwnerProvider;
    static values(): AnimalOwnerProvider[];
  }


  interface ArmorStandProvider extends Enum<ArmorStandProvider> {}
  class ArmorStandProvider extends Enum<ArmorStandProvider> {
    static readonly INSTANCE: ArmorStandProvider;
    appendTooltip(tooltip: ITooltip, accessor: EntityAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    static valueOf(name: string): ArmorStandProvider;
    static values(): ArmorStandProvider[];
  }


  interface BeehiveProvider extends Enum<BeehiveProvider> {}
  class BeehiveProvider extends Enum<BeehiveProvider> {
    static readonly INSTANCE: BeehiveProvider;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, number>;
    streamData(accessor: BlockAccessor): number;
    static valueOf(name: string): BeehiveProvider;
    static values(): BeehiveProvider[];
  }


  interface BlockDisplayProvider extends Enum<BlockDisplayProvider> {}
  class BlockDisplayProvider extends Enum<BlockDisplayProvider> {
    static readonly INSTANCE: BlockDisplayProvider;
    appendTooltip(tooltip: ITooltip, accessor: EntityAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    getIcon(accessor: EntityAccessor, config: IPluginConfig, currentIcon: IElement): IElement;
    isRequired(): boolean;
    static valueOf(name: string): BlockDisplayProvider;
    static values(): BlockDisplayProvider[];
  }


  interface BrewingStandProvider extends Enum<BrewingStandProvider> {}
  class BrewingStandProvider extends Enum<BrewingStandProvider> {
    static readonly INSTANCE: BrewingStandProvider;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, Data>;
    streamData(accessor: BlockAccessor): Data;
    static valueOf(name: string): BrewingStandProvider;
    static values(): BrewingStandProvider[];
  }


  interface CampfireProvider extends Enum<CampfireProvider> {}
  class CampfireProvider extends Enum<CampfireProvider> {
    static readonly INSTANCE: CampfireProvider;
    get uid(): ResourceLocation;
    getClientGroups(accessor: Accessor<any>, groups: ViewGroup<ItemStack>[]): ClientViewGroup<ItemView>[];
    getGroups(accessor: Accessor<any>): ViewGroup<ItemStack>[];
    static valueOf(name: string): CampfireProvider;
    static values(): CampfireProvider[];
  }


  interface ChiseledBookshelfProvider extends Enum<ChiseledBookshelfProvider> {}
  class ChiseledBookshelfProvider extends Enum<ChiseledBookshelfProvider> {
    static readonly INSTANCE: ChiseledBookshelfProvider;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get defaultPriority(): number;
    get uid(): ResourceLocation;
    getIcon(accessor: BlockAccessor, config: IPluginConfig, currentIcon: IElement): IElement;
    shouldRequestData(accessor: BlockAccessor): boolean;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, ItemStack>;
    streamData(accessor: BlockAccessor): ItemStack;
    static valueOf(name: string): ChiseledBookshelfProvider;
    static values(): ChiseledBookshelfProvider[];
  }


  interface CommandBlockProvider extends Enum<CommandBlockProvider> {}
  class CommandBlockProvider extends Enum<CommandBlockProvider> {
    static readonly INSTANCE: CommandBlockProvider;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    shouldRequestData(accessor: BlockAccessor): boolean;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, string>;
    streamData(accessor: BlockAccessor): string;
    static valueOf(name: string): CommandBlockProvider;
    static values(): CommandBlockProvider[];
  }


  interface CropProgressProvider extends Enum<CropProgressProvider> {}
  class CropProgressProvider extends Enum<CropProgressProvider> {
    static readonly INSTANCE: CropProgressProvider;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    getIcon(accessor: BlockAccessor, config: IPluginConfig, currentIcon: IElement): IElement;
    static valueOf(name: string): CropProgressProvider;
    static values(): CropProgressProvider[];
  }


  interface EnchantmentPowerProvider extends Enum<EnchantmentPowerProvider> {}
  class EnchantmentPowerProvider extends Enum<EnchantmentPowerProvider> {
    static readonly INSTANCE: EnchantmentPowerProvider;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get defaultPriority(): number;
    get uid(): ResourceLocation;
    static valueOf(name: string): EnchantmentPowerProvider;
    static values(): EnchantmentPowerProvider[];
  }


  interface EntityHealthAndArmorProvider extends Enum<EntityHealthAndArmorProvider> {}
  class EntityHealthAndArmorProvider extends Enum<EntityHealthAndArmorProvider> {
    static readonly INSTANCE: EntityHealthAndArmorProvider;
    appendTooltip(tooltip: ITooltip, accessor: EntityAccessor, config: IPluginConfig): void;
    get defaultPriority(): number;
    get uid(): ResourceLocation;
    isRequired(): boolean;
    static valueOf(name: string): EntityHealthAndArmorProvider;
    static values(): EntityHealthAndArmorProvider[];
  }


  interface FallingBlockProvider extends Enum<FallingBlockProvider> {}
  class FallingBlockProvider extends Enum<FallingBlockProvider> {
    static readonly INSTANCE: FallingBlockProvider;
    appendTooltip(tooltip: ITooltip, accessor: EntityAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    getIcon(accessor: EntityAccessor, config: IPluginConfig, currentIcon: IElement): IElement;
    isRequired(): boolean;
    static valueOf(name: string): FallingBlockProvider;
    static values(): FallingBlockProvider[];
  }


  interface FurnaceProvider extends Enum<FurnaceProvider> {}
  class FurnaceProvider extends Enum<FurnaceProvider> {
    static readonly INSTANCE: FurnaceProvider;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, snownee_jade_addon_vanilla_furnaceprovider_Data>;
    streamData(accessor: BlockAccessor): snownee_jade_addon_vanilla_furnaceprovider_Data;
    static valueOf(name: string): FurnaceProvider;
    static values(): FurnaceProvider[];
  }


  interface HopperLockProvider extends Enum<HopperLockProvider> {}
  class HopperLockProvider extends Enum<HopperLockProvider> {
    static readonly INSTANCE: HopperLockProvider;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get defaultPriority(): number;
    get uid(): ResourceLocation;
    isRequired(): boolean;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, boolean>;
    streamData(accessor: BlockAccessor): boolean;
    static valueOf(name: string): HopperLockProvider;
    static values(): HopperLockProvider[];
  }


  interface HorseStatsProvider extends Enum<HorseStatsProvider> {}
  class HorseStatsProvider extends Enum<HorseStatsProvider> {
    static readonly INSTANCE: HorseStatsProvider;
    appendTooltip(tooltip: ITooltip, accessor: EntityAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    static valueOf(name: string): HorseStatsProvider;
    static values(): HorseStatsProvider[];
  }


  interface ItemBERProvider extends Enum<ItemBERProvider> {}
  class ItemBERProvider extends Enum<ItemBERProvider> {
    static readonly INSTANCE: ItemBERProvider;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    getIcon(accessor: BlockAccessor, config: IPluginConfig, currentIcon: IElement): IElement;
    isRequired(): boolean;
    static valueOf(name: string): ItemBERProvider;
    static values(): ItemBERProvider[];
  }


  interface ItemDisplayProvider extends Enum<ItemDisplayProvider> {}
  class ItemDisplayProvider extends Enum<ItemDisplayProvider> {
    static readonly INSTANCE: ItemDisplayProvider;
    appendTooltip(tooltip: ITooltip, accessor: EntityAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    getIcon(accessor: EntityAccessor, config: IPluginConfig, currentIcon: IElement): IElement;
    isRequired(): boolean;
    static valueOf(name: string): ItemDisplayProvider;
    static values(): ItemDisplayProvider[];
  }


  interface ItemFrameProvider extends Enum<ItemFrameProvider> {}
  class ItemFrameProvider extends Enum<ItemFrameProvider> {
    static readonly INSTANCE: ItemFrameProvider;
    appendTooltip(tooltip: ITooltip, accessor: EntityAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    static valueOf(name: string): ItemFrameProvider;
    static values(): ItemFrameProvider[];
  }


  interface ItemTooltipProvider extends Enum<ItemTooltipProvider> {}
  class ItemTooltipProvider extends Enum<ItemTooltipProvider> {
    static readonly INSTANCE: ItemTooltipProvider;
    appendTooltip(tooltip: ITooltip, accessor: EntityAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    static valueOf(name: string): ItemTooltipProvider;
    static values(): ItemTooltipProvider[];
  }


  interface JukeboxProvider extends Enum<JukeboxProvider> {}
  class JukeboxProvider extends Enum<JukeboxProvider> {
    static readonly INSTANCE: JukeboxProvider;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    shouldRequestData(accessor: BlockAccessor): boolean;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, ItemStack>;
    streamData(accessor: BlockAccessor): ItemStack;
    static valueOf(name: string): JukeboxProvider;
    static values(): JukeboxProvider[];
  }


  interface LecternProvider extends Enum<LecternProvider> {}
  class LecternProvider extends Enum<LecternProvider> {
    static readonly INSTANCE: LecternProvider;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    shouldRequestData(accessor: BlockAccessor): boolean;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, ItemStack>;
    streamData(accessor: BlockAccessor): ItemStack;
    static valueOf(name: string): LecternProvider;
    static values(): LecternProvider[];
  }


  interface MobBreedingProvider extends Enum<MobBreedingProvider> {}
  class MobBreedingProvider extends Enum<MobBreedingProvider> {
    static readonly INSTANCE: MobBreedingProvider;
    appendTooltip(tooltip: ITooltip, accessor: EntityAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, number>;
    streamData(accessor: EntityAccessor): number;
    static valueOf(name: string): MobBreedingProvider;
    static values(): MobBreedingProvider[];
  }


  interface MobGrowthProvider extends Enum<MobGrowthProvider> {}
  class MobGrowthProvider extends Enum<MobGrowthProvider> {
    static readonly INSTANCE: MobGrowthProvider;
    appendTooltip(tooltip: ITooltip, accessor: EntityAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, number>;
    streamData(accessor: EntityAccessor): number;
    static valueOf(name: string): MobGrowthProvider;
    static values(): MobGrowthProvider[];
  }


  interface MobSpawnerCooldownProvider extends Enum<MobSpawnerCooldownProvider> {}
  class MobSpawnerCooldownProvider extends Enum<MobSpawnerCooldownProvider> {
    static readonly INSTANCE: MobSpawnerCooldownProvider;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    isRequired(): boolean;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, number>;
    streamData(accessor: BlockAccessor): number;
    static valueOf(name: string): MobSpawnerCooldownProvider;
    static values(): MobSpawnerCooldownProvider[];
  }


  interface MobSpawnerProvider extends IToggleableProvider {}
  class MobSpawnerProvider extends IToggleableProvider {
    static appendTooltip(tooltip: ITooltip, displayEntity: Entity, name: MutableComponent): void;
    static get block(): ForBlock;
    get defaultPriority(): number;
    static get entity(): ForEntity;
    get uid(): ResourceLocation;
  }


  interface NextEntityDropProvider extends Enum<NextEntityDropProvider> {}
  class NextEntityDropProvider extends Enum<NextEntityDropProvider> {
    static readonly INSTANCE: NextEntityDropProvider;
    static appendSeconds(tooltip: ITooltip, accessor: Accessor<any>, tagKey: string, translationKey: string): void;
    appendServerData(tag: CompoundTag, accessor: EntityAccessor): void;
    appendTooltip(tooltip: ITooltip, accessor: EntityAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    shouldRequestData(accessor: EntityAccessor): boolean;
    static valueOf(name: string): NextEntityDropProvider;
    static values(): NextEntityDropProvider[];
  }


  interface NoteBlockProvider extends Enum<NoteBlockProvider> {}
  class NoteBlockProvider extends Enum<NoteBlockProvider> {
    static readonly INSTANCE: NoteBlockProvider;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    static valueOf(name: string): NoteBlockProvider;
    static values(): NoteBlockProvider[];
  }


  interface PaintingProvider extends Enum<PaintingProvider> {}
  class PaintingProvider extends Enum<PaintingProvider> {
    static readonly INSTANCE: PaintingProvider;
    appendTooltip(tooltip: ITooltip, accessor: EntityAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    static valueOf(name: string): PaintingProvider;
    static values(): PaintingProvider[];
  }


  interface PlayerHeadProvider extends Enum<PlayerHeadProvider> {}
  class PlayerHeadProvider extends Enum<PlayerHeadProvider> {
    static readonly INSTANCE: PlayerHeadProvider;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    static valueOf(name: string): PlayerHeadProvider;
    static values(): PlayerHeadProvider[];
  }


  interface RedstoneProvider extends Enum<RedstoneProvider> {}
  class RedstoneProvider extends Enum<RedstoneProvider> {
    static readonly INSTANCE: RedstoneProvider;
    appendServerData(data: CompoundTag, accessor: BlockAccessor): void;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    static valueOf(name: string): RedstoneProvider;
    static values(): RedstoneProvider[];
  }


  interface StatusEffectsProvider extends Enum<StatusEffectsProvider> {}
  class StatusEffectsProvider extends Enum<StatusEffectsProvider> {
    static readonly INSTANCE: StatusEffectsProvider;
    appendTooltip(tooltip: ITooltip, accessor: EntityAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    static getEffectName(mobEffectInstance: MobEffectInstance): Component;
    shouldRequestData(accessor: EntityAccessor): boolean;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, MobEffectInstance[]>;
    streamData(accessor: EntityAccessor): MobEffectInstance[];
    static valueOf(name: string): StatusEffectsProvider;
    static values(): StatusEffectsProvider[];
  }


  interface TNTStabilityProvider extends Enum<TNTStabilityProvider> {}
  class TNTStabilityProvider extends Enum<TNTStabilityProvider> {
    static readonly INSTANCE: TNTStabilityProvider;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    static valueOf(name: string): TNTStabilityProvider;
    static values(): TNTStabilityProvider[];
  }


  interface TotalEnchantmentPowerProvider extends Enum<TotalEnchantmentPowerProvider> {}
  class TotalEnchantmentPowerProvider extends Enum<TotalEnchantmentPowerProvider> {
    static readonly INSTANCE: TotalEnchantmentPowerProvider;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get defaultPriority(): number;
    get uid(): ResourceLocation;
    static getPower(world: Level, pos: BlockPos): number;
    static valueOf(name: string): TotalEnchantmentPowerProvider;
    static values(): TotalEnchantmentPowerProvider[];
  }


  interface VanillaPlugin extends IWailaPlugin {}
  class VanillaPlugin extends IWailaPlugin {
    static CLIENT_REGISTRATION: IWailaClientRegistration;
    static getCorrespondingNormalChest(state: BlockState): BlockState;
    register(registration: IWailaCommonRegistration): void;
    registerClient(registration: IWailaClientRegistration): void;
  }


  interface VillagerProfessionProvider extends Enum<VillagerProfessionProvider> {}
  class VillagerProfessionProvider extends Enum<VillagerProfessionProvider> {
    static readonly INSTANCE: VillagerProfessionProvider;
    appendTooltip(tooltip: ITooltip, accessor: EntityAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    static valueOf(name: string): VillagerProfessionProvider;
    static values(): VillagerProfessionProvider[];
  }


  interface WaxedProvider extends Enum<WaxedProvider> {}
  class WaxedProvider extends Enum<WaxedProvider> {
    static readonly INSTANCE: WaxedProvider;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get defaultPriority(): number;
    get uid(): ResourceLocation;
    getIcon(accessor: BlockAccessor, config: IPluginConfig, currentIcon: IElement): IElement;
    static valueOf(name: string): WaxedProvider;
    static values(): WaxedProvider[];
  }


  interface ZombieVillagerProvider extends Enum<ZombieVillagerProvider> {}
  class ZombieVillagerProvider extends Enum<ZombieVillagerProvider> {
    static readonly INSTANCE: ZombieVillagerProvider;
    appendTooltip(tooltip: ITooltip, accessor: EntityAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    shouldRequestData(accessor: EntityAccessor): boolean;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, number>;
    streamData(accessor: EntityAccessor): number;
    static valueOf(name: string): ZombieVillagerProvider;
    static values(): ZombieVillagerProvider[];
  }

}

declare module 'snownee.jade.addon.vanilla.MobSpawnerProvider' {
  import { MobSpawnerProvider } from 'snownee.jade.addon.vanilla';
  import { IBlockComponentProvider, ITooltip, BlockAccessor, IEntityComponentProvider, EntityAccessor } from 'snownee.jade.api';
  import { IPluginConfig } from 'snownee.jade.api.config';
  import { Entity } from 'net.minecraft.world.entity';
  import { MutableComponent } from 'net.minecraft.network.chat';

  interface ForBlock extends IBlockComponentProvider, MobSpawnerProvider {}
  class ForBlock extends IBlockComponentProvider {
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    static appendTooltip(tooltip: ITooltip, displayEntity: Entity, name: MutableComponent): void;
  }


  interface ForEntity extends IEntityComponentProvider, MobSpawnerProvider {}
  class ForEntity extends IEntityComponentProvider {
    appendTooltip(tooltip: ITooltip, accessor: EntityAccessor, config: IPluginConfig): void;
    static appendTooltip(tooltip: ITooltip, displayEntity: Entity, name: MutableComponent): void;
  }

}

declare module 'snownee.jade.api' {
  import { Level, LevelAccessor } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CompoundTag, Tag } from 'net.minecraft.nbt';
  import { DynamicOps, MapDecoder, MapEncoder } from 'com.mojang.serialization';
  import { Optional, List } from 'java.util';
  import { StreamDecoder, StreamEncoder, StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Class, Enum, RuntimeException, Throwable } from 'java.lang';
  import { IElement, ScreenDirection } from 'snownee.jade.api.ui';
  import { Function, UnaryOperator, Predicate, Consumer } from 'java.util.function';
  import { BlockHitResult, EntityHitResult } from 'net.minecraft.world.phys';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { Entity, EntityType } from 'net.minecraft.world.entity';
  import { IPluginConfig } from 'snownee.jade.api.config';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Component } from 'net.minecraft.network.chat';
  import { Align } from 'snownee.jade.api.ui.IElement';
  import { PlatformWailaClientRegistration } from 'snownee.jade.api.platform';
  import { Builder } from 'snownee.jade.api.BlockAccessor';
  import { Builder as snownee_jade_api_entityaccessor_Builder } from 'snownee.jade.api.EntityAccessor';
  import { JadeAfterRenderCallback, JadeBeforeRenderCallback, JadeRayTraceCallback, JadeTooltipCollectedCallback, JadeItemModNameCallback, JadeBeforeTooltipCollectCallback } from 'snownee.jade.api.callback';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { IClientExtensionProvider, ItemView, FluidView, EnergyView, ProgressView, IServerExtensionProvider } from 'snownee.jade.api.view';
  import { StringRepresentable } from 'net.minecraft.util';

  class Accessor<T extends HitResult = any> {
    decodeFromNbt<D>(var1: StreamDecoder<RegistryFriendlyByteBuf, D>, var2: Tag): Optional<D>;
    encodeAsNbt<D>(var1: StreamEncoder<RegistryFriendlyByteBuf, D>, var2: D): Tag;
    get accessorType(): Class<Accessor<any>>;
    get hitResult(): T;
    get level(): Level;
    get pickedResult(): ItemStack;
    get player(): Player;
    get serverData(): CompoundTag;
    get target(): any;
    isServerConnected(): boolean;
    nbtOps(): DynamicOps<Tag>;
    readData<D>(var1: MapDecoder<D>): Optional<D>;
    showDetails(): boolean;
    tickRate(): number;
    verifyData(var1: CompoundTag): boolean;
    writeData<D>(var1: MapEncoder<D>, var2: D): void;
  }


  class AccessorClientHandler<T extends Accessor<any> = any> {
    gatherComponents(var1: T, var2: Function<IJadeProvider, ITooltip>): void;
    getIcon(var1: T): IElement;
    isEnabled(provider: IToggleableProvider): boolean;
    requestData(var1: T, var2: IServerDataProvider<T>[]): void;
    shouldDisplay(var1: T): boolean;
    shouldRequestData(var1: T): IServerDataProvider<T>[];
  }


  interface BlockAccessor extends Accessor<BlockHitResult> {}
  class BlockAccessor extends Accessor<BlockHitResult> {
    get accessorType(): Class<Accessor<any>>;
    get block(): Block;
    get blockEntity(): BlockEntity;
    get blockState(): BlockState;
    get fakeBlock(): ItemStack;
    get position(): BlockPos;
    get side(): Direction;
    isFakeBlock(): boolean;
  }


  interface EntityAccessor extends Accessor<EntityHitResult> {}
  class EntityAccessor extends Accessor<EntityHitResult> {
    get accessorType(): Class<Accessor<any>>;
    get entity(): Entity;
    get rawEntity(): Entity;
  }


  interface IBlockComponentProvider extends IComponentProvider<BlockAccessor> {}
  class IBlockComponentProvider extends IComponentProvider<BlockAccessor> {
  }


  interface IComponentProvider<T extends Accessor<any> = any> extends IToggleableProvider {}
  class IComponentProvider<T extends Accessor<any> = any> extends IToggleableProvider {
    appendTooltip(var1: ITooltip, var2: T, var3: IPluginConfig): void;
    getIcon(accessor: T, config: IPluginConfig, currentIcon: IElement): IElement;
  }


  interface IEntityComponentProvider extends IComponentProvider<EntityAccessor> {}
  class IEntityComponentProvider extends IComponentProvider<EntityAccessor> {
  }


  class IJadeProvider {
    get defaultPriority(): number;
    get uid(): ResourceLocation;
  }


  interface IServerDataProvider<T extends Accessor<any> = any> extends IJadeProvider {}
  class IServerDataProvider<T extends Accessor<any> = any> extends IJadeProvider {
    appendServerData(var1: CompoundTag, var2: T): void;
    shouldRequestData(accessor: T): boolean;
  }


  interface IToggleableProvider extends IJadeProvider {}
  class IToggleableProvider extends IJadeProvider {
    enabledByDefault(): boolean;
    isRequired(): boolean;
  }


  class ITooltip {
    add(component: Component): void;
    add(component: Component, tag: ResourceLocation): void;
    add(index: number, component: Component): void;
    add(index: number, component: Component, tag: ResourceLocation): void;
    add(element: IElement): void;
    add(index: number, elements: IElement[]): void;
    add(elements: IElement[]): void;
    add(var1: number, var2: IElement): void;
    addAll(components: Component[]): void;
    append(component: Component): void;
    append(component: Component, tag: ResourceLocation): void;
    append(element: IElement): void;
    append(index: number, elements: IElement[]): void;
    append(var1: number, var2: IElement): void;
    clear(): void;
    get(var1: ResourceLocation): IElement[];
    get(var1: number, var2: Align): IElement[];
    get message(): string;
    getMessage(var1: ResourceLocation): string;
    isEmpty(): boolean;
    remove(var1: ResourceLocation): boolean;
    replace(var1: ResourceLocation, var2: UnaryOperator<IElement[][]>): boolean;
    replace(var1: ResourceLocation, var2: Component): boolean;
    setLineMargin(var1: number, var2: ScreenDirection, var3: number): void;
    size(): number;
  }


  interface IWailaClientRegistration extends PlatformWailaClientRegistration {}
  class IWailaClientRegistration extends PlatformWailaClientRegistration {
    addAfterRenderCallback(callback: JadeAfterRenderCallback): void;
    addAfterRenderCallback(var1: number, var2: JadeAfterRenderCallback): void;
    addBeforeRenderCallback(callback: JadeBeforeRenderCallback): void;
    addBeforeRenderCallback(var1: number, var2: JadeBeforeRenderCallback): void;
    addBeforeTooltipCollectCallback(callback: JadeBeforeTooltipCollectCallback): void;
    addBeforeTooltipCollectCallback(var1: number, var2: JadeBeforeTooltipCollectCallback): void;
    addConfig(var1: ResourceLocation, var2: boolean): void;
    addConfig<T extends Enum<T>>(var1: ResourceLocation, var2: T): void;
    addConfig(var1: ResourceLocation, var2: string, var3: Predicate<string>): void;
    addConfig(var1: ResourceLocation, var2: number, var3: number, var4: number, var5: boolean): void;
    addConfig(var1: ResourceLocation, var2: number, var3: number, var4: number, var5: boolean): void;
    addConfigListener(var1: ResourceLocation, var2: Consumer<ResourceLocation>): void;
    addItemModNameCallback(callback: JadeItemModNameCallback): void;
    addItemModNameCallback(var1: number, var2: JadeItemModNameCallback): void;
    addRayTraceCallback(callback: JadeRayTraceCallback): void;
    addRayTraceCallback(var1: number, var2: JadeRayTraceCallback): void;
    addTooltipCollectedCallback(callback: JadeTooltipCollectedCallback): void;
    addTooltipCollectedCallback(var1: number, var2: JadeTooltipCollectedCallback): void;
    blockAccessor(): Builder;
    createPluginConfigScreen(var1: Screen, var2: Component): Screen;
    entityAccessor(): snownee_jade_api_entityaccessor_Builder;
    get serverData(): CompoundTag;
    getAccessorHandler(var1: Class<Accessor<any>>): AccessorClientHandler<Accessor<any>>;
    getBlockCamouflage(var1: LevelAccessor, var2: BlockPos): ItemStack;
    hideTarget(var1: Block): void;
    hideTarget(var1: EntityType<any>): void;
    isClientFeature(var1: ResourceLocation): boolean;
    isServerConnected(): boolean;
    isShowDetailsPressed(): boolean;
    markAsClientFeature(var1: ResourceLocation): void;
    markAsServerFeature(var1: ResourceLocation): void;
    maybeLowVisionUser(): boolean;
    registerAccessorHandler<T extends Accessor<any>>(var1: Class<T>, var2: AccessorClientHandler<T>): void;
    registerBlockComponent(var1: IComponentProvider<BlockAccessor>, var2: Class<Block>): void;
    registerBlockIcon(var1: IComponentProvider<BlockAccessor>, var2: Class<Block>): void;
    registerEnergyStorageClient(var1: IClientExtensionProvider<CompoundTag, EnergyView>): void;
    registerEntityComponent(var1: IComponentProvider<EntityAccessor>, var2: Class<Entity>): void;
    registerEntityIcon(var1: IComponentProvider<EntityAccessor>, var2: Class<Entity>): void;
    registerFluidStorageClient(var1: IClientExtensionProvider<CompoundTag, FluidView>): void;
    registerItemStorageClient(var1: IClientExtensionProvider<ItemStack, ItemView>): void;
    registerProgressClient(var1: IClientExtensionProvider<CompoundTag, ProgressView>): void;
    set serverData(var1: CompoundTag);
    setConfigCategoryOverride(var1: ResourceLocation, var2: Component): void;
    setConfigCategoryOverride(var1: ResourceLocation, var2: Component[]): void;
    shouldHide(var1: Entity): boolean;
    shouldHide(var1: BlockState): boolean;
    shouldPick(var1: Entity): boolean;
    shouldPick(var1: BlockState): boolean;
    usePickedResult(var1: Block): void;
    usePickedResult(var1: EntityType<any>): void;
  }


  class IWailaCommonRegistration {
    registerBlockDataProvider(var1: IServerDataProvider<BlockAccessor>, var2: Class<any>): void;
    registerEnergyStorage<T>(var1: IServerExtensionProvider<CompoundTag>, var2: Class<T>): void;
    registerEntityDataProvider(var1: IServerDataProvider<EntityAccessor>, var2: Class<Entity>): void;
    registerFluidStorage<T>(var1: IServerExtensionProvider<CompoundTag>, var2: Class<T>): void;
    registerItemStorage<T>(var1: IServerExtensionProvider<ItemStack>, var2: Class<T>): void;
    registerProgress<T>(var1: IServerExtensionProvider<CompoundTag>, var2: Class<T>): void;
  }


  class IWailaPlugin {
    register(registration: IWailaCommonRegistration): void;
    registerClient(registration: IWailaClientRegistration): void;
  }


  class JadeIds {
    static readonly ROOT: ResourceLocation;
    static readonly PACKET_RECEIVE_DATA: ResourceLocation;
    static readonly PACKET_SERVER_PING: ResourceLocation;
    static readonly PACKET_REQUEST_ENTITY: ResourceLocation;
    static readonly PACKET_REQUEST_BLOCK: ResourceLocation;
    static readonly PACKET_SHOW_OVERLAY: ResourceLocation;
    static readonly CORE_ROOT_ICON: ResourceLocation;
    static readonly CORE_OBJECT_NAME: ResourceLocation;
    static readonly CORE_MOD_NAME: ResourceLocation;
    static readonly CORE_DISTANCE: ResourceLocation;
    static readonly CORE_COORDINATES: ResourceLocation;
    static readonly CORE_REL_COORDINATES: ResourceLocation;
    static readonly CORE_BLOCK_FACE: ResourceLocation;
    static readonly DEBUG_REGISTRY_NAME: ResourceLocation;
    static readonly DEBUG_SPECIAL_REGISTRY_NAME: ResourceLocation;
    static readonly DEBUG_BLOCK_PROPERTIES: ResourceLocation;
    static readonly DEBUG_BLOCK_STATES: ResourceLocation;
    static readonly UNIVERSAL_ITEM_STORAGE: ResourceLocation;
    static readonly UNIVERSAL_ITEM_STORAGE_DEFAULT: ResourceLocation;
    static readonly UNIVERSAL_ITEM_STORAGE_DETAILED_AMOUNT: ResourceLocation;
    static readonly UNIVERSAL_ITEM_STORAGE_NORMAL_AMOUNT: ResourceLocation;
    static readonly UNIVERSAL_ITEM_STORAGE_SHOW_NAME_AMOUNT: ResourceLocation;
    static readonly UNIVERSAL_ITEM_STORAGE_ITEMS_PER_LINE: ResourceLocation;
    static readonly UNIVERSAL_FLUID_STORAGE: ResourceLocation;
    static readonly UNIVERSAL_FLUID_STORAGE_DEFAULT: ResourceLocation;
    static readonly UNIVERSAL_FLUID_STORAGE_DETAILED: ResourceLocation;
    static readonly UNIVERSAL_FLUID_STORAGE_STYLE: ResourceLocation;
    static readonly UNIVERSAL_ENERGY_STORAGE: ResourceLocation;
    static readonly UNIVERSAL_ENERGY_STORAGE_DEFAULT: ResourceLocation;
    static readonly UNIVERSAL_ENERGY_STORAGE_DETAILED: ResourceLocation;
    static readonly UNIVERSAL_ENERGY_STORAGE_STYLE: ResourceLocation;
    static readonly UNIVERSAL_PROGRESS: ResourceLocation;
    static readonly UNIVERSAL_HIDE_THINGS: ResourceLocation;
    static readonly MC_ANIMAL_OWNER: ResourceLocation;
    static readonly MC_ARMOR_STAND: ResourceLocation;
    static readonly MC_BEEHIVE: ResourceLocation;
    static readonly MC_BLOCK_DISPLAY: ResourceLocation;
    static readonly MC_BREAKING_PROGRESS: ResourceLocation;
    static readonly MC_BREWING_STAND: ResourceLocation;
    static readonly MC_CAMPFIRE: ResourceLocation;
    static readonly MC_CHISELED_BOOKSHELF: ResourceLocation;
    static readonly MC_COMMAND_BLOCK: ResourceLocation;
    static readonly MC_CROP_PROGRESS: ResourceLocation;
    static readonly MC_ENCHANTMENT_POWER: ResourceLocation;
    static readonly MC_ENTITY_ARMOR: ResourceLocation;
    static readonly MC_ENTITY_ARMOR_MAX_FOR_RENDER: ResourceLocation;
    static readonly MC_ENTITY_HEALTH: ResourceLocation;
    static readonly MC_ENTITY_HEALTH_MAX_FOR_RENDER: ResourceLocation;
    static readonly MC_ENTITY_HEALTH_ICONS_PER_LINE: ResourceLocation;
    static readonly MC_ENTITY_HEALTH_SHOW_FRACTIONS: ResourceLocation;
    static readonly MC_FALLING_BLOCK: ResourceLocation;
    static readonly MC_FURNACE: ResourceLocation;
    static readonly MC_HARVEST_TOOL: ResourceLocation;
    static readonly MC_HARVEST_TOOL_NEW_LINE: ResourceLocation;
    static readonly MC_EFFECTIVE_TOOL: ResourceLocation;
    static readonly MC_SHOW_UNBREAKABLE: ResourceLocation;
    static readonly MC_HARVEST_TOOL_CREATIVE: ResourceLocation;
    static readonly MC_HOPPER_LOCK: ResourceLocation;
    static readonly MC_HORSE_STATS: ResourceLocation;
    static readonly MC_ITEM_BER: ResourceLocation;
    static readonly MC_ITEM_DISPLAY: ResourceLocation;
    static readonly MC_ITEM_FRAME: ResourceLocation;
    static readonly MC_ITEM_TOOLTIP: ResourceLocation;
    static readonly MC_JUKEBOX: ResourceLocation;
    static readonly MC_LECTERN: ResourceLocation;
    static readonly MC_MOB_BREEDING: ResourceLocation;
    static readonly MC_MOB_GROWTH: ResourceLocation;
    static readonly MC_MOB_SPAWNER: ResourceLocation;
    static readonly MC_MOB_SPAWNER_COOLDOWN: ResourceLocation;
    static readonly MC_NEXT_ENTITY_DROP: ResourceLocation;
    static readonly MC_NOTE_BLOCK: ResourceLocation;
    static readonly MC_PAINTING: ResourceLocation;
    static readonly MC_PLAYER_HEAD: ResourceLocation;
    static readonly MC_POTION_EFFECTS: ResourceLocation;
    static readonly MC_REDSTONE: ResourceLocation;
    static readonly MC_TNT_STABILITY: ResourceLocation;
    static readonly MC_TOTAL_ENCHANTMENT_POWER: ResourceLocation;
    static readonly MC_VILLAGER_PROFESSION: ResourceLocation;
    static readonly MC_WAXED: ResourceLocation;
    static readonly MC_ZOMBIE_VILLAGER: ResourceLocation;
    static readonly ACCESS_SIGN: ResourceLocation;
    static readonly ACCESS_BLOCK_DETAILS: ResourceLocation;
    static readonly ACCESS_BLOCK_DETAILS_BODY: ResourceLocation;
    static readonly ACCESS_BLOCK_AMOUNT: ResourceLocation;
    static readonly ACCESS_ENTITY_DETAILS: ResourceLocation;
    static readonly ACCESS_ENTITY_DETAILS_BODY: ResourceLocation;
    static readonly ACCESS_ENTITY_VARIANT: ResourceLocation;
    static readonly ACCESS_HELD_ITEM: ResourceLocation;
    static ACCESS(path: string): ResourceLocation;
    static JADE(path: string): ResourceLocation;
    static isAccess(id: ResourceLocation): boolean;
  }


  interface SimpleStringRepresentable extends StringRepresentable {}
  class SimpleStringRepresentable extends StringRepresentable {
    get serializedName(): string;
  }


  interface StreamServerDataProvider<T extends Accessor<any> = any, D = any> extends IServerDataProvider<T> {}
  class StreamServerDataProvider<T extends Accessor<any> = any, D = any> extends IServerDataProvider<T> {
    appendServerData(data: CompoundTag, accessor: T): void;
    decodeFromData(accessor: T): Optional<D>;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, D>;
    streamData(var1: T): D;
  }


  class TooltipPosition {
    static readonly HEAD: number;
    static readonly BODY: number;
    static readonly TAIL: number;
  }


  interface TraceableException extends RuntimeException {}
  class TraceableException extends RuntimeException {
    constructor(cause: Throwable, namespace: string);
    static create(cause: Throwable, namespace: string): RuntimeException;
    get namespace(): string;
  }

}

declare module 'snownee.jade.api.BlockAccessor' {
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { BlockHitResult } from 'net.minecraft.world.phys';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { Supplier } from 'java.util.function';
  import { ItemStack } from 'net.minecraft.world.item';
  import { BlockAccessor } from 'snownee.jade.api';

  class Builder {
    blockEntity(blockEntity: BlockEntity): Builder;
    blockEntity(var1: Supplier<BlockEntity>): Builder;
    blockState(var1: BlockState): Builder;
    build(): BlockAccessor;
    fakeBlock(var1: ItemStack): Builder;
    from(var1: BlockAccessor): Builder;
    hit(var1: BlockHitResult): Builder;
    level(var1: Level): Builder;
    player(var1: Player): Builder;
    requireVerification(): Builder;
    serverConnected(var1: boolean): Builder;
    serverData(var1: CompoundTag): Builder;
    showDetails(var1: boolean): Builder;
  }

}

declare module 'snownee.jade.api.callback' {
  import { IBoxElement, TooltipRect } from 'snownee.jade.api.ui';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Accessor } from 'snownee.jade.api';
  import { MutableObject } from 'org.apache.commons.lang3.mutable';
  import { Theme } from 'snownee.jade.api.theme';
  import { ItemStack } from 'net.minecraft.world.item';
  import { HitResult } from 'net.minecraft.world.phys';

  class JadeAfterRenderCallback {
    afterRender(var1: IBoxElement, var2: TooltipRect, var3: GuiGraphics, var4: Accessor<any>): void;
  }


  class JadeBeforeRenderCallback {
    beforeRender(var1: IBoxElement, var2: TooltipRect, var3: GuiGraphics, var4: Accessor<any>): boolean;
  }


  class JadeBeforeTooltipCollectCallback {
    beforeCollecting(var1: MutableObject<Theme>, var2: Accessor<any>): boolean;
  }


  class JadeItemModNameCallback {
    gatherItemModName(var1: ItemStack): string;
  }


  class JadeRayTraceCallback {
    onRayTrace(var1: HitResult, var2: Accessor<any>, var3: Accessor<any>): Accessor<any>;
  }


  class JadeTooltipCollectedCallback {
    onTooltipCollected(var1: IBoxElement, var2: Accessor<any>): void;
  }

}

declare module 'snownee.jade.api.config' {
  import { List, Set } from 'java.util';
  import { Registry } from 'net.minecraft.core';
  import { Consumer } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IToggleableProvider } from 'snownee.jade.api';
  import { Enum } from 'java.lang';
  import { IConfigGeneral, IConfigOverlay, IConfigFormatting } from 'snownee.jade.api.config.IWailaConfig';

  class IgnoreList<T = any> {
    values: List;
    version: number;
    reload(registry: Registry<T>, consumer: Consumer<T>): void;
  }


  class IPluginConfig {
    get(var1: IToggleableProvider): boolean;
    get(var1: ResourceLocation): boolean;
    get keys(): Set<ResourceLocation>;
    getEnum<T extends Enum<T>>(var1: ResourceLocation): T;
    getFloat(var1: ResourceLocation): number;
    getInt(var1: ResourceLocation): number;
    getKeys(var1: string): Set<ResourceLocation>;
    getString(var1: ResourceLocation): string;
  }


  class IWailaConfig {
    static get(): IWailaConfig;
    get formatting(): IConfigFormatting;
    get general(): IConfigGeneral;
    get overlay(): IConfigOverlay;
    get plugin(): IPluginConfig;
  }

}

declare module 'snownee.jade.api.config.IWailaConfig' {
  import { Style, Component } from 'net.minecraft.network.chat';
  import { Theme } from 'snownee.jade.api.theme';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class IConfigFormatting {
    get itemModNameStyle(): Style;
    registryName(var1: string): Component;
    set itemModNameStyle(var1: Style);
  }


  class IConfigOverlay {
    static applyAlpha(color: number, alpha: number): number;
    applyTheme(var1: ResourceLocation): void;
    get alpha(): number;
    get anchorX(): number;
    get anchorY(): number;
    get animation(): boolean;
    get autoScaleThreshold(): number;
    get disappearingDelay(): number;
    get flipMainHand(): boolean;
    get iconMode(): IconMode;
    get overlayPosX(): number;
    get overlayPosY(): number;
    get overlayScale(): number;
    get square(): boolean;
    get theme(): Theme;
    set alpha(var1: number);
    set anchorX(var1: number);
    set anchorY(var1: number);
    set animation(var1: boolean);
    set disappearingDelay(var1: number);
    set flipMainHand(var1: boolean);
    set iconMode(var1: IconMode);
    set overlayPosX(var1: number);
    set overlayPosY(var1: number);
    set overlayScale(var1: number);
    set square(var1: boolean);
    shouldShowIcon(): boolean;
    tryFlip(var1: number): number;
  }


  class IConfigGeneral {
    get accessibilityModMemory(): boolean;
    get bossBarOverlapMode(): BossBarOverlapMode;
    get builtinCamouflage(): boolean;
    get displayBlocks(): boolean;
    get displayBosses(): boolean;
    get displayEntities(): boolean;
    get displayFluids(): FluidMode;
    get displayMode(): DisplayMode;
    get enableAccessibilityPlugin(): boolean;
    get extendedReach(): number;
    get perspectiveMode(): PerspectiveMode;
    get tTSMode(): TTSMode;
    isDebug(): boolean;
    set accessibilityModMemory(var1: boolean);
    set bossBarOverlapMode(var1: BossBarOverlapMode);
    set builtinCamouflage(var1: boolean);
    set displayBlocks(var1: boolean);
    set displayBosses(var1: boolean);
    set displayEntities(var1: boolean);
    set displayFluids(var1: boolean);
    set displayMode(var1: DisplayMode);
    set enableAccessibilityPlugin(var1: boolean);
    set extendedReach(var1: number);
    set perspectiveMode(var1: PerspectiveMode);
    set tTSMode(var1: TTSMode);
    setDebug(var1: boolean): void;
    setDisplayFluids(var1: FluidMode): void;
    setDisplayTooltip(var1: boolean): void;
    setHideFromGUIs(var1: boolean): void;
    setHideFromTabList(var1: boolean): void;
    setItemModNameTooltip(var1: boolean): void;
    shouldDisplayFluids(): boolean;
    shouldDisplayTooltip(): boolean;
    shouldEnableTextToSpeech(): boolean;
    shouldHideFromGUIs(): boolean;
    shouldHideFromTabList(): boolean;
    showItemModNameTooltip(): boolean;
    toggleTTS(): void;
  }


  interface HandlerDisplayStyle extends Enum<HandlerDisplayStyle> {}
  class HandlerDisplayStyle extends Enum<HandlerDisplayStyle> {
    static readonly PROGRESS_BAR: HandlerDisplayStyle;
    static readonly ICON: HandlerDisplayStyle;
    static readonly PLAIN_TEXT: HandlerDisplayStyle;
    static valueOf(name: string): HandlerDisplayStyle;
    static values(): HandlerDisplayStyle[];
  }


  interface PerspectiveMode extends Enum<PerspectiveMode> {}
  class PerspectiveMode extends Enum<PerspectiveMode> {
    static readonly CAMERA: PerspectiveMode;
    static readonly EYE: PerspectiveMode;
    static valueOf(name: string): PerspectiveMode;
    static values(): PerspectiveMode[];
  }


  interface BossBarOverlapMode extends Enum<BossBarOverlapMode> {}
  class BossBarOverlapMode extends Enum<BossBarOverlapMode> {
    static readonly NO_OPERATION: BossBarOverlapMode;
    static readonly HIDE_BOSS_BAR: BossBarOverlapMode;
    static readonly HIDE_TOOLTIP: BossBarOverlapMode;
    static readonly PUSH_DOWN: BossBarOverlapMode;
    static valueOf(name: string): BossBarOverlapMode;
    static values(): BossBarOverlapMode[];
  }


  interface FluidMode extends Enum<FluidMode> {}
  class FluidMode extends Enum<FluidMode> {
    static readonly NONE: FluidMode;
    static readonly ANY: FluidMode;
    static readonly SOURCE_ONLY: FluidMode;
    static readonly FALLBACK: FluidMode;
    static valueOf(name: string): FluidMode;
    static values(): FluidMode[];
  }


  interface DisplayMode extends Enum<DisplayMode> {}
  class DisplayMode extends Enum<DisplayMode> {
    static readonly HOLD_KEY: DisplayMode;
    static readonly TOGGLE: DisplayMode;
    static readonly LITE: DisplayMode;
    static valueOf(name: string): DisplayMode;
    static values(): DisplayMode[];
  }


  interface TTSMode extends Enum<TTSMode> {}
  class TTSMode extends Enum<TTSMode> {
    static readonly TOGGLE: TTSMode;
    static readonly PRESS: TTSMode;
    static valueOf(name: string): TTSMode;
    static values(): TTSMode[];
  }


  interface IconMode extends Enum<IconMode> {}
  class IconMode extends Enum<IconMode> {
    static readonly TOP: IconMode;
    static readonly CENTERED: IconMode;
    static readonly INLINE: IconMode;
    static readonly HIDE: IconMode;
    static valueOf(name: string): IconMode;
    static values(): IconMode[];
  }

}

declare module 'snownee.jade.api.EntityAccessor' {
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { EntityHitResult } from 'net.minecraft.world.phys';
  import { Supplier } from 'java.util.function';
  import { Entity } from 'net.minecraft.world.entity';
  import { EntityAccessor } from 'snownee.jade.api';

  class Builder {
    build(): EntityAccessor;
    entity(entity: Entity): Builder;
    entity(var1: Supplier<Entity>): Builder;
    from(var1: EntityAccessor): Builder;
    hit(hit: EntityHitResult): Builder;
    hit(var1: Supplier<EntityHitResult>): Builder;
    level(var1: Level): Builder;
    player(var1: Player): Builder;
    requireVerification(): Builder;
    serverConnected(var1: boolean): Builder;
    serverData(var1: CompoundTag): Builder;
    showDetails(var1: boolean): Builder;
  }

}

declare module 'snownee.jade.api.fluid' {
  import { Codec } from 'com.mojang.serialization';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { DataComponentPatch } from 'net.minecraft.core.component';

  class JadeFluidObject {
    static readonly CODEC: Codec;
    static blockVolume(): number;
    static bucketVolume(): number;
    static empty(): JadeFluidObject;
    get amount(): number;
    get components(): DataComponentPatch;
    get type(): Fluid;
    isEmpty(): boolean;
    static isSameFluidSameComponents(first: JadeFluidObject, second: JadeFluidObject): boolean;
    static of(fluid: Fluid): JadeFluidObject;
    static of(fluid: Fluid, amount: number): JadeFluidObject;
    static of(fluid: Fluid, amount: number, components: DataComponentPatch): JadeFluidObject;
  }

}

declare module 'snownee.jade.api.platform' {
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { Block } from 'net.minecraft.world.level.block';

  class CustomEnchantPower {
    getEnchantPowerBonus(var1: BlockState, var2: Level, var3: BlockPos): number;
  }


  class PlatformWailaClientRegistration {
    registerCustomEnchantPower(var1: Block, var2: CustomEnchantPower): void;
  }

}

declare module 'snownee.jade.api.theme' {
  import { Collection, Optional } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { BoxStyle, IBoxElement } from 'snownee.jade.api.ui';
  import { Boolean } from 'java.lang';

  class IThemeHelper {
    danger(var1: any): MutableComponent;
    failure(var1: any): MutableComponent;
    static get(): IThemeHelper;
    get normalColor(): number;
    get themes(): Collection<Theme>;
    getTheme(var1: ResourceLocation): Theme;
    info(var1: any): MutableComponent;
    isLightColorScheme(): boolean;
    modName(var1: any): MutableComponent;
    seconds(var1: number, var2: number): MutableComponent;
    success(var1: any): MutableComponent;
    theme(): Theme;
    title(var1: any): MutableComponent;
    warning(var1: any): MutableComponent;
  }


  class Theme {
    static readonly DEFAULT_THEME_ID: ResourceLocation;
    tooltipStyle: BoxStyle;
    nestedBoxStyle: BoxStyle;
    viewGroupStyle: BoxStyle;
    id: ResourceLocation;
    text: TextSetting;
    changeRoundCorner: boolean;
    changeOpacity: number;
    lightColorScheme: boolean;
    hidden: boolean;
    iconSlotSprite: ResourceLocation;
    iconSlotInflation: number;
    iconSlotSpriteCache: IBoxElement;
    constructor(tooltipStyle: BoxStyle, nestedBoxStyle: BoxStyle, viewGroupStyle: BoxStyle, text: TextSetting, changeRoundCorner: Optional<boolean>, changeOpacity: number, lightColorScheme: boolean, hidden: boolean, iconSlotSprite: Optional<ResourceLocation>, iconSlotInflation: number);
  }

}

declare module 'snownee.jade.api.ui' {
  import { Cloneable, Enum } from 'java.lang';
  import { Codec } from 'com.mojang.serialization';
  import { Optional, List } from 'java.util';
  import { GradientBorder } from 'snownee.jade.api.ui.BoxStyle';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { StyledElement } from 'snownee.jade.impl.ui';
  import { Vec2 } from 'net.minecraft.world.phys';
  import { Align } from 'snownee.jade.api.ui.IElement';
  import { ITooltip } from 'snownee.jade.api';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Format } from 'java.text';
  import { FormattedText, MutableComponent, Component } from 'net.minecraft.network.chat';
  import { FormattedCharSequence } from 'net.minecraft.util';
  import { JadeFluidObject } from 'snownee.jade.api.fluid';
  import { Rect2i } from 'net.minecraft.client.renderer';

  interface BoxStyle extends Cloneable {}
  class BoxStyle extends Cloneable {
    static readonly GRADIENT_BORDER_CODEC: Codec;
    static readonly SPRITE_BASE_CODEC: Codec;
    static readonly CODEC: Codec;
    readonly boxProgressOffset: number[];
    readonly padding: number[];
    boxProgressColors: ColorPalette;
    constructor(boxProgressOffset: Optional<number[]>, boxProgressColors: ColorPalette, padding: Optional<number[]>);
    borderWidth(): number;
    boxProgressOffset(dir: ScreenDirection): number;
    clone(): BoxStyle;
    static get nestedBox(): BoxStyle;
    static get transparent(): GradientBorder;
    static get viewGroup(): BoxStyle;
    static getSprite(sprite: ResourceLocation, padding: number[]): BoxStyle;
    hasRoundCorner(): boolean;
    padding(dir: ScreenDirection): number;
    render(var1: GuiGraphics, var2: StyledElement, var3: number, var4: number, var5: number, var6: number, var7: number): void;
  }


  class Color {
    static readonly CODEC: Codec;
    equals(o: any): boolean;
    get blue(): number;
    get green(): number;
    get hex(): string;
    get hue(): number;
    get lightness(): number;
    get opacity(): number;
    get red(): number;
    get saturation(): number;
    hashCode(): number;
    static hex(value: string): Color;
    static hsl(hue: number, saturation: number, lightness: number): Color;
    static hsl(hue: number, saturation: number, lightness: number, opacity: number): Color;
    static rgb(red: number, green: number, blue: number): Color;
    static rgb(red: number, green: number, blue: number, opacity: number): Color;
    static rgb(color: number): Color;
    toInt(): number;
    toString(): string;
    static valueOf(value: string): Color;
  }


  interface Element extends IElement {}
  class Element extends IElement {
    align(align: Align): IElement;
    clearCachedMessage(): IElement;
    get alignment(): Align;
    get cachedMessage(): string;
    get cachedSize(): Vec2;
    get translation(): Vec2;
    getTag(): ResourceLocation;
    message(message: string): IElement;
    size(size: Vec2): IElement;
    tag(tag: ResourceLocation): IElement;
    translate(translation: Vec2): IElement;
  }


  interface IBoxElement extends IElement, StyledElement {}
  class IBoxElement extends IElement {
    clearBoxProgress(): void;
    get boxProgress(): number;
    get style(): BoxStyle;
    get tooltip(): ITooltip;
    padding(var1: ScreenDirection): number;
    setBoxProgress(var1: MessageType, var2: number): void;
    setIcon(var1: IElement): void;
    setPadding(var1: ScreenDirection, var2: number): void;
  }


  class IDisplayHelper {
    blitSprite(var1: GuiGraphics, var2: ResourceLocation, var3: number, var4: number, var5: number, var6: number): void;
    blitSprite(var1: GuiGraphics, var2: ResourceLocation, var3: number, var4: number, var5: number, var6: number, var7: number): void;
    blitSprite(var1: GuiGraphics, var2: ResourceLocation, var3: number, var4: number, var5: number, var6: number, var7: number, var8: number, var9: number, var10: number): void;
    blitSprite(var1: GuiGraphics, var2: ResourceLocation, var3: number, var4: number, var5: number, var6: number, var7: number, var8: number, var9: number, var10: number, var11: number): void;
    drawBorder(var1: GuiGraphics, var2: number, var3: number, var4: number, var5: number, var6: number, var7: number, var8: boolean): void;
    drawGradientRect(var1: GuiGraphics, var2: number, var3: number, var4: number, var5: number, var6: number, var7: number): void;
    drawItem(var1: GuiGraphics, var2: number, var3: number, var4: ItemStack, var5: number, var6: string): void;
    drawText(var1: GuiGraphics, var2: string, var3: number, var4: number, var5: number): void;
    drawText(var1: GuiGraphics, var2: FormattedText, var3: number, var4: number, var5: number): void;
    drawText(var1: GuiGraphics, var2: FormattedCharSequence, var3: number, var4: number, var5: number): void;
    static get(): IDisplayHelper;
    humanReadableNumber(var1: number, var3: string, var4: boolean): string;
    humanReadableNumber(var1: number, var3: string, var4: boolean, var5: Format): string;
    opacity(): number;
    stripColor(var1: Component): MutableComponent;
  }


  class IElement {
    align(var1: Align): IElement;
    clearCachedMessage(): IElement;
    get alignment(): Align;
    get cachedMessage(): string;
    get cachedSize(): Vec2;
    get translation(): Vec2;
    getMessage(): string;
    getSize(): Vec2;
    getTag(): ResourceLocation;
    message(var1: string): IElement;
    render(var1: GuiGraphics, var2: number, var3: number, var4: number, var5: number): void;
    size(var1: Vec2): IElement;
    tag(var1: ResourceLocation): IElement;
    translate(var1: Vec2): IElement;
  }


  class IElementHelper {
    box(var1: ITooltip, var2: BoxStyle): IBoxElement;
    fluid(var1: JadeFluidObject): IElement;
    static get(): IElementHelper;
    item(var1: ItemStack): IElement;
    item(var1: ItemStack, var2: number): IElement;
    item(var1: ItemStack, var2: number, var3: string): IElement;
    progress(var1: number, var2: Component, var3: ProgressStyle, var4: BoxStyle, var5: boolean): IElement;
    progress(var1: number): IElement;
    progress(var1: number, var2: ResourceLocation, var3: ResourceLocation, var4: number, var5: number, var6: boolean): IElement;
    progressStyle(): ProgressStyle;
    smallItem(var1: ItemStack): IElement;
    spacer(var1: number, var2: number): IElement;
    sprite(var1: ResourceLocation, var2: number, var3: number): IElement;
    text(var1: Component): ITextElement;
    tooltip(): ITooltip;
  }


  interface ITextElement extends IElement {}
  class ITextElement extends IElement {
    scale(var1: number): ITextElement;
    zOffset(var1: number): ITextElement;
  }


  interface MessageType extends Enum<MessageType> {}
  class MessageType extends Enum<MessageType> {
    static readonly NORMAL: MessageType;
    static readonly INFO: MessageType;
    static readonly TITLE: MessageType;
    static readonly SUCCESS: MessageType;
    static readonly WARNING: MessageType;
    static readonly DANGER: MessageType;
    static readonly FAILURE: MessageType;
    static parse(s: string): MessageType;
    static valueOf(name: string): MessageType;
    static values(): MessageType[];
  }


  class ProgressStyle {
    color(color: number): ProgressStyle;
    color(var1: number, var2: number): ProgressStyle;
    direction(direction: ScreenDirection): ProgressStyle;
    direction(): ScreenDirection;
    fitContentX(fitContentX: boolean): ProgressStyle;
    fitContentX(): boolean;
    fitContentY(fitContentY: boolean): ProgressStyle;
    fitContentY(): boolean;
    overlay(overlay: IElement): ProgressStyle;
    render(var1: GuiGraphics, var2: number, var3: number, var4: number, var5: number, var6: number, var7: Component): void;
    textColor(var1: number): ProgressStyle;
  }


  interface ScreenDirection extends Enum<ScreenDirection> {}
  class ScreenDirection extends Enum<ScreenDirection> {
    static readonly UP: ScreenDirection;
    static readonly DOWN: ScreenDirection;
    static readonly LEFT: ScreenDirection;
    static readonly RIGHT: ScreenDirection;
    static fromIndex(index: number): ScreenDirection;
    isHorizontal(): boolean;
    isVertical(): boolean;
    static valueOf(name: string): ScreenDirection;
    static values(): ScreenDirection[];
  }


  class TooltipRect {
    readonly expectedRect: Rect2i;
    readonly rect: Rect2i;
    scale: number;
  }

}

declare module 'snownee.jade.api.ui.BoxStyle' {
  import { BoxStyle, ColorPalette } from 'snownee.jade.api.ui';
  import { Boolean } from 'java.lang';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { StyledElement } from 'snownee.jade.impl.ui';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Optional } from 'java.util';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { NineSlice } from 'GuiSpriteScaling';

  interface GradientBorder extends BoxStyle {}
  class GradientBorder extends BoxStyle {
    static readonly TRANSPARENT: GradientBorder;
    static readonly DEFAULT_NESTED_BOX: GradientBorder;
    static readonly DEFAULT_VIEW_GROUP: GradientBorder;
    bgColor: number;
    borderColor: number[];
    borderWidth: number;
    roundCorner: boolean;
    borderWidth(): number;
    clone(): GradientBorder;
    hasRoundCorner(): boolean;
    render(guiGraphics: GuiGraphics, element: StyledElement, x: number, y: number, w: number, h: number, alpha: number): void;
  }


  interface SpriteBase extends BoxStyle {}
  class SpriteBase extends BoxStyle {
    sprite: ResourceLocation;
    withIconSprite: ResourceLocation;
    constructor(boxProgressOffset: Optional<number[]>, boxProgressColors: ColorPalette, padding: Optional<number[]>, sprite: ResourceLocation, withIconSprite: Optional<ResourceLocation>);
    static blitNineSlicedSprite(guiGraphics: GuiGraphics, textureAtlasSprite: TextureAtlasSprite, nineSlice: NineSlice, i: number, j: number, k: number, l: number, m: number): void;
    static blitSprite(guiGraphics: GuiGraphics, resourceLocation: ResourceLocation, i: number, j: number, k: number, l: number, m: number): void;
    borderWidth(): number;
    clone(): SpriteBase;
    render(guiGraphics: GuiGraphics, element: StyledElement, x: number, y: number, w: number, h: number, alpha: number): void;
  }

}

declare module 'snownee.jade.api.ui.IElement' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Align extends Enum<Align> {}
  class Align extends Enum<Align> {
    static readonly LEFT: Align;
    static readonly RIGHT: Align;
    static readonly CENTER: Align;
    static valueOf(name: string): Align;
    static values(): Align[];
  }

}

declare module 'snownee.jade.api.view' {
  import { List, Optional } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { MessageType, IElement, ProgressStyle } from 'snownee.jade.api.ui';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Function, BiConsumer } from 'java.util.function';
  import { ITooltip, Accessor, IJadeProvider } from 'snownee.jade.api';
  import { JadeFluidObject } from 'snownee.jade.api.fluid';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Container } from 'net.minecraft.world';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { ByteBuf } from 'io.netty.buffer';
  import { Entry } from 'Map';

  class ClientViewGroup<T = any> {
    readonly views: List;
    title: Component;
    messageType: MessageType;
    boxProgress: number;
    extraData: CompoundTag;
    constructor(views: T[]);
    static map<IN, OUT>(groups: ViewGroup<IN>[], itemFactory: Function<IN, OUT>, clientGroupDecorator: BiConsumer<ViewGroup<IN>, ClientViewGroup<OUT>>): ClientViewGroup<OUT>[];
    renderHeader(tooltip: ITooltip): void;
    shouldRenderGroup(): boolean;
    static tooltip<T>(tooltip: ITooltip, groups: ClientViewGroup<T>[], renderGroup: boolean, consumer: BiConsumer<ITooltip, ClientViewGroup<T>>): void;
  }


  class EnergyView {
    current: string;
    max: string;
    ratio: number;
    overrideText: Component;
    static of(current: number, capacity: number): CompoundTag;
    static read(tag: CompoundTag, unit: string): EnergyView;
  }


  class FluidView {
    static readonly EMPTY_FLUID: Component;
    overlay: IElement;
    current: string;
    max: string;
    ratio: number;
    fluidName: Component;
    overrideText: Component;
    constructor(overlay: IElement);
    static readDefault(tag: CompoundTag): FluidView;
    static writeDefault(fluidObject: JadeFluidObject, capacity: number): CompoundTag;
  }


  interface HideThingsExtensionProvider<IN = any, OUT = any> extends IServerExtensionProvider<IN>, IClientExtensionProvider<IN, OUT> {}
  class HideThingsExtensionProvider<IN = any, OUT = any> extends IServerExtensionProvider<IN> {
    get uid(): ResourceLocation;
    getClientGroups(accessor: Accessor<any>, viewGroups: ViewGroup<IN>[]): ClientViewGroup<OUT>[];
    getGroups(accessor: Accessor<any>): ViewGroup<IN>[];
    static instance<IN, OUT>(): HideThingsExtensionProvider<IN, OUT>;
  }


  interface IClientExtensionProvider<IN = any, OUT = any> extends IJadeProvider {}
  class IClientExtensionProvider<IN = any, OUT = any> extends IJadeProvider {
    getClientGroups(var1: Accessor<any>, var2: ViewGroup<IN>[]): ClientViewGroup<OUT>[];
  }


  interface IServerExtensionProvider<T = any> extends IJadeProvider {}
  class IServerExtensionProvider<T = any> extends IJadeProvider {
    getGroups(var1: Accessor<any>): ViewGroup<T>[];
    shouldRequestData(accessor: Accessor<any>): boolean;
  }


  class ItemView {
    item: ItemStack;
    amountText: string;
    description: List;
    constructor(item: ItemStack);
    amountText(amountText: string): ItemView;
    description(description: IElement[]): ItemView;
    static groupOf(container: Container, accessor: Accessor<any>): ViewGroup<ItemStack>[];
    static groupOf(storage: any, accessor: Accessor<any>): ViewGroup<ItemStack>[];
  }


  class ItemViewUtils {
    static groupOf(container: Container, accessor: Accessor<any>): ViewGroup<ItemStack>[];
    static groupOf(container: Container, accessor: Accessor<any>, containerFinder: Function<Accessor<any>, Container>): ViewGroup<ItemStack>[];
    static groupOf(storage: any, accessor: Accessor<any>): ViewGroup<ItemStack>[];
    static groupOf(storage: any, accessor: Accessor<any>, storageFinder: Function<Accessor<any>, any>): ViewGroup<ItemStack>[];
  }


  class ProgressView {
    style: ProgressStyle;
    progress: number;
    text: Component;
    constructor(style: ProgressStyle);
    static create(progress: number): CompoundTag;
    static read(tag: CompoundTag): ProgressView;
  }


  class ViewGroup<T = any> {
    views: List;
    id: string;
    constructor(views: T[]);

    constructor(views: T[], id: Optional<string>, extraData: Optional<CompoundTag>);
    static codec<B extends ByteBuf, T>(viewCodec: StreamCodec<B, T>): StreamCodec<B, ViewGroup<T>>;
    get extraData(): CompoundTag;
    static listCodec<B extends ByteBuf, T>(viewCodec: StreamCodec<B, T>): StreamCodec<B, Entry<ResourceLocation, ViewGroup<T>[]>>;
    static read<T>(tag: CompoundTag, reader: Function<CompoundTag, T>): ViewGroup<T>;
    static readList<T>(tag: CompoundTag, key: string, reader: Function<CompoundTag, T>): ViewGroup<T>[];
    save(tag: CompoundTag, writer: Function<T, CompoundTag>): void;
    static saveList<T>(tag: CompoundTag, key: string, groups: ViewGroup<T>[], writer: Function<T, CompoundTag>): boolean;
    setProgress(progress: number): void;
  }

}

declare module 'snownee.jade.command' {
  import { LiteralArgumentBuilder } from 'com.mojang.brigadier.builder';
  import { Function, BiConsumer } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack } from 'net.minecraft.commands';

  class JadeClientCommand {
    static create<T>(literalFactory: Function<string, LiteralArgumentBuilder<T>>, sendSuccess: BiConsumer<T, Component>, sendFailure: BiConsumer<T, Component>): LiteralArgumentBuilder<T>;
  }


  class JadeServerCommand {
    static register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }

}

declare module 'snownee.jade.compat' {
  import { IModPlugin } from 'mezz.jei.api';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IRecipeRegistration } from 'mezz.jei.api.registration';
  import { IJeiRuntime } from 'mezz.jei.api.runtime';

  interface JEICompat extends IModPlugin {}
  class JEICompat extends IModPlugin {
    static readonly ID: ResourceLocation;
    get pluginUid(): ResourceLocation;
    static onKeyPressed(action: number): void;
    onRuntimeAvailable(runtime: IJeiRuntime): void;
    registerRecipes(registration: IRecipeRegistration): void;
  }

}

declare module 'snownee.jade.gui' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Button, Tooltip } from 'net.minecraft.client.gui.components';
  import { Component } from 'net.minecraft.network.chat';
  import { ComponentPath, GuiGraphics } from 'net.minecraft.client.gui';
  import { FocusNavigationEvent } from 'net.minecraft.client.gui.navigation';
  import { OptionsList, OptionsNav } from 'snownee.jade.gui.config';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { NarratableEntry } from 'net.minecraft.client.gui.narration';
  import { Optional, List } from 'java.util';
  import { Function } from 'java.util.function';
  import { Entry } from 'snownee.jade.gui.config.OptionsList';
  import { Runnable } from 'java.lang';

  interface BaseOptionsScreen extends Screen {}
  class BaseOptionsScreen extends Screen {
    saveButton: Button;
    constructor(parent: Screen, title: Component);
    addEntryWidget<T extends GuiEventListener & NarratableEntry>(widget: T): T;
    createOptions(): OptionsList;
    get optionsNav(): OptionsNav;
    getChildAt(mouseX: number, mouseY: number): Optional<GuiEventListener>;
    mouseClicked(mouseX: number, mouseY: number, p_94697_: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, deltaX: number, deltaY: number): boolean;
    nextFocusPath(event: FocusNavigationEvent): ComponentPath;
    onClose(): void;
    static processBuiltInVariables(component: Component): Component;
    removed(): void;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    shouldCloseOnEsc(): boolean;
  }


  interface CreditButton extends Button {}
  class CreditButton extends Button {
    showTranslators(): void;
  }


  interface HomeConfigScreen extends Screen {}
  class HomeConfigScreen extends Screen {
    constructor(parent: Screen);
    onClose(): void;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  class JadeFont {
    jade$setGlint(var1: number, var2: number): void;
    jade$setGlintStrength(var1: number, var2: number): void;
  }


  class MultilineTooltip {
    static create(components: Component[]): Tooltip;
    static create(components: Component[], narration: Component[]): Tooltip;
  }


  interface PluginsConfigScreen extends PreviewOptionsScreen {}
  class PluginsConfigScreen extends PreviewOptionsScreen {
    constructor(parent: Screen);
    createOptions(): OptionsList;
    static createPluginConfigScreen(parent: Screen, jumpTo: Function<OptionsList, Entry>, dontSave: boolean): Screen;
  }


  interface PreviewOptionsScreen extends BaseOptionsScreen {}
  class PreviewOptionsScreen extends BaseOptionsScreen {
    constructor(parent: Screen, title: Component);
    forcePreviewOverlay(): boolean;
    static isAdjustingPosition(): boolean;
    keyPressed(i: number, j: number, k: number): boolean;
    keyReleased(i: number, j: number, k: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, p_94697_: number): boolean;
    mouseDragged(d: number, e: number, i: number, f: number, g: number): boolean;
    mouseReleased(d: number, e: number, i: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, deltaX: number, deltaY: number): boolean;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    startAdjustingPosition(): void;
  }


  interface WailaConfigScreen extends PreviewOptionsScreen {}
  class WailaConfigScreen extends PreviewOptionsScreen {
    constructor(parent: Screen);
    createOptions(): OptionsList;
    static editIgnoreList(entry: Entry, fileName: string, defaultFactory: Runnable): Entry;
  }

}

declare module 'snownee.jade.gui.config' {
  import { ClientTooltipPositioner } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { Entry, Title } from 'snownee.jade.gui.config.OptionsList';
  import { Vector2ic } from 'org.joml';
  import { KeyMapping, Minecraft } from 'net.minecraft.client';
  import { AbstractWidget, Renderable, Button, ContainerObjectSelectionList, ObjectSelectionList } from 'net.minecraft.client.gui.components';
  import { Consumer, BiFunction, Predicate, Supplier, Function } from 'java.util.function';
  import { Font, GuiGraphics, ComponentPath } from 'net.minecraft.client.gui';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { Integer, Runnable, Float, Boolean, Enum } from 'java.lang';
  import { FormattedCharSequence } from 'net.minecraft.util';
  import { SoundManager } from 'net.minecraft.client.sounds';
  import { FocusNavigationEvent } from 'net.minecraft.client.gui.navigation';
  import { NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { Builder } from 'Button';
  import { Set, List } from 'java.util';
  import { OptionValue } from 'snownee.jade.gui.config.value';
  import { BaseOptionsScreen } from 'snownee.jade.gui';
  import { FloatUnaryOperator } from 'it.unimi.dsi.fastutil.floats';
  import { BooleanConsumer } from 'it.unimi.dsi.fastutil.booleans';
  import { Builder as cyclebutton_Builder } from 'CycleButton';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Entry as snownee_jade_gui_config_optionsnav_Entry } from 'snownee.jade.gui.config.OptionsNav';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';

  interface BelowOrAboveListEntryTooltipPositioner extends ClientTooltipPositioner {}
  class BelowOrAboveListEntryTooltipPositioner extends ClientTooltipPositioner {
    constructor(list: OptionsList, entry: Entry);
    positionTooltip(i: number, j: number, mouseX: number, mouseY: number, m: number, n: number): Vector2ic;
  }


  interface KeybindOptionButton extends OptionButton {}
  class KeybindOptionButton extends OptionButton {
    constructor(owner: OptionsList, keybind: KeyMapping);
    refresh(selectedKey: KeyMapping): void;
  }


  interface NotUglyEditBox extends Renderable, AbstractWidget {}
  class NotUglyEditBox extends Renderable {
    paddingLeft: number;
    paddingRight: number;
    paddingTop: number;
    responder: Consumer;
    constructor(font: Font, i: number, j: number, k: number, l: number, component: Component);

    constructor(font: Font, i: number, j: number, k: number, l: number, editBox: NotUglyEditBox, component: Component);
    canConsumeInput(): boolean;
    charTyped(c: string, i: number): boolean;
    deleteChars(i: number): void;
    deleteWords(i: number): void;
    get cursorPosition(): number;
    get highlighted(): string;
    get innerWidth(): number;
    get value(): string;
    getScreenX(i: number): number;
    getWordPosition(i: number): number;
    insertText(string: string): void;
    isBordered(): boolean;
    isMouseOver(d: number, e: number): boolean;
    isVisible(): boolean;
    keyPressed(i: number, j: number, k: number): boolean;
    moveCursor(i: number): void;
    moveCursorTo(i: number): void;
    moveCursorToEnd(): void;
    moveCursorToStart(): void;
    nextFocusPath(focusNavigationEvent: FocusNavigationEvent): ComponentPath;
    onClick(x: number, y: number): void;
    playDownSound(soundManager: SoundManager): void;
    renderWidget(guiGraphics: GuiGraphics, i: number, j: number, f: number): void;
    set cursorPosition(i: number);
    set value(string: string);
    setBordered(bl: boolean): void;
    setCanLoseFocus(bl: boolean): void;
    setEditable(bl: boolean): void;
    setFilter(predicate: Predicate<string>): void;
    setFocused(bl: boolean): void;
    setFormatter(biFunction: BiFunction<string, number, FormattedCharSequence>): void;
    setHighlightPos(i: number): void;
    setHint(component: Component): void;
    setMaxLength(i: number): void;
    setSuggestion(string: string): void;
    setTextColor(i: number): void;
    setTextColorUneditable(i: number): void;
    setVisible(bl: boolean): void;
    updateWidgetNarration(narrationElementOutput: NarrationElementOutput): void;
  }


  interface OptionButton extends Entry {}
  class OptionButton extends Entry {
    constructor(titleKey: string, button: Button);

    constructor(title: Component, button: Button);

    constructor(title: Component, builder: Builder);
    render(guiGraphics: GuiGraphics, index: number, rowTop: number, rowLeft: number, width: number, height: number, mouseX: number, mouseY: number, hovered: boolean, deltaTime: number): void;
  }


  interface OptionsList extends ContainerObjectSelectionList<Entry> {}
  class OptionsList extends ContainerObjectSelectionList<Entry> {
    static readonly OPTION_ON: Component;
    static readonly OPTION_OFF: Component;
    readonly forcePreview: Set;
    currentTitle: Title;
    invalidEntry: OptionValue;
    selectedKey: KeyMapping;
    constructor(owner: BaseOptionsScreen, client: Minecraft, width: number, height: number, y0: number, entryHeight: number, diskWriter: Runnable);

    constructor(owner: BaseOptionsScreen, client: Minecraft, width: number, height: number, y0: number, entryHeight: number);
    add<T extends Entry>(entry: T): T;
    choices(optionName: string, getter: Supplier<boolean>, setter: BooleanConsumer): OptionValue<boolean>;
    choices(optionName: string, getter: Supplier<boolean>, setter: BooleanConsumer, builderConsumer: Consumer<cyclebutton_Builder<boolean>>): OptionValue<boolean>;
    choices<T extends Enum<T>>(optionName: string, getter: Supplier<T>, setter: Consumer<T>): OptionValue<T>;
    choices<T extends Enum<T>>(optionName: string, getter: Supplier<T>, setter: Consumer<T>, builderConsumer: Consumer<cyclebutton_Builder<T>>): OptionValue<T>;
    choices<T>(optionName: string, getter: Supplier<T>, values: T[], setter: Consumer<T>, nameProvider: Function<T, Component>): OptionValue<T>;
    ensureVisible(entry: Entry): void;
    forceSetScrollAmount(scroll: number): void;
    get rowWidth(): number;
    getEntryAt(x: number, y: number): Entry;
    getRowBottom(i: number): number;
    getRowTop(i: number): number;
    input<T>(optionName: string, getter: Supplier<T>, setter: Consumer<T>, validator: Predicate<string>): OptionValue<T>;
    input<T>(optionName: string, getter: Supplier<T>, setter: Consumer<T>): OptionValue<T>;
    isFocused(): boolean;
    keyPressed(i: number, j: number, k: number): boolean;
    keybind(keybind: KeyMapping): void;
    mouseClicked(d: number, e: number, i: number): boolean;
    mouseDragged(d: number, e: number, i: number, f: number, g: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, deltaX: number, deltaY: number): boolean;
    nextFocusPath(event: FocusNavigationEvent): ComponentPath;
    removed(): void;
    renderWidget(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    resetMappingAndUpdateButtons(): void;
    save(): void;
    setDefaultParent(defaultParent: Entry): void;
    setScrollAmount(scroll: number): void;
    showOnTop(entry: Entry): void;
    slider(optionName: string, getter: Supplier<number>, setter: Consumer<number>): OptionValue<number>;
    slider(optionName: string, getter: Supplier<number>, setter: Consumer<number>, min: number, max: number, aligner: FloatUnaryOperator): OptionValue<number>;
    title(string: string): MutableComponent;
    updateOptionValue(key: ResourceLocation): void;
    updateSaveState(): void;
    updateSearch(search: string): void;
  }


  interface OptionsNav extends ObjectSelectionList<snownee_jade_gui_config_optionsnav_Entry> {}
  class OptionsNav extends ObjectSelectionList<snownee_jade_gui_config_optionsnav_Entry> {
    constructor(options: OptionsList, width: number, height: number, top: number, itemHeight: number);
    addEntry(entry: Title): void;
    get rowWidth(): number;
    nextFocusPath(event: FocusNavigationEvent): ComponentPath;
    refresh(): void;
    setFocused(listener: GuiEventListener): void;
  }

}

declare module 'snownee.jade.gui.config.OptionsList' {
  import { Entry as containerobjectselectionlist_Entry } from 'ContainerObjectSelectionList';
  import { MutableComponent, Component } from 'net.minecraft.network.chat';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { List } from 'java.util';
  import { NarratableEntry, NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { NarrationPriority } from 'NarratableEntry';

  interface Entry extends containerobjectselectionlist_Entry<Entry> {}
  class Entry extends containerobjectselectionlist_Entry<Entry> {
    constructor();
    addMessage(message: string): void;
    addMessageKey(key: string): void;
    addWidget(widget: AbstractWidget, offsetX: number): void;
    addWidget(widget: AbstractWidget, offsetX: number, offsetY: number): void;
    children(): AbstractWidget[];
    get description(): Component[];
    get descriptionOnShift(): Component[];
    get firstWidget(): AbstractWidget;
    get messages(): string[];
    get textWidth(): number;
    getTextX(width: number): number;
    static makeKey(key: string): string;
    static makeTitle(key: string): MutableComponent;
    narratables(): NarratableEntry[];
    parent(parent: Entry): Entry;
    parent(): Entry;
    render(guiGraphics: GuiGraphics, index: number, rowTop: number, rowLeft: number, width: number, height: number, mouseX: number, mouseY: number, hovered: boolean, deltaTime: number): void;
    root(): Entry;
    setDisabled(b: boolean): void;
  }


  interface Title extends Entry {}
  class Title extends Entry {
    narration: Component;
    constructor(key: string);

    constructor(title: MutableComponent);
    get textWidth(): number;
    get title(): MutableComponent;
    getTextX(width: number): number;
    narratables(): NarratableEntry[];
    narrationPriority(): NarrationPriority;
    render(guiGraphics: GuiGraphics, index: number, rowTop: number, rowLeft: number, width: number, height: number, mouseX: number, mouseY: number, hovered: boolean, deltaTime: number): void;
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
  }

}

declare module 'snownee.jade.gui.config.OptionsNav' {
  import { Entry as objectselectionlist_Entry } from 'ObjectSelectionList';
  import { OptionsNav } from 'snownee.jade.gui.config';
  import { Title } from 'snownee.jade.gui.config.OptionsList';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';

  interface Entry extends objectselectionlist_Entry<Entry> {}
  class Entry extends objectselectionlist_Entry<Entry> {
    constructor(parent: OptionsNav, title: Title);
    get narration(): Component;
    get title(): Title;
    keyPressed(i: number, j: number, k: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    onPress(): void;
    render(guiGraphics: GuiGraphics, index: number, rowTop: number, rowLeft: number, width: number, height: number, mouseX: number, mouseY: number, hovered: boolean, deltaTime: number): void;
  }

}

declare module 'snownee.jade.gui.config.value' {
  import { Builder } from 'CycleButton';
  import { Supplier, Consumer, Predicate } from 'java.util.function';
  import { Runnable, Float } from 'java.lang';
  import { Entry } from 'snownee.jade.gui.config.OptionsList';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';
  import { NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List } from 'java.util';
  import { FloatUnaryOperator } from 'it.unimi.dsi.fastutil.floats';

  interface CycleOptionValue<T = any> extends OptionValue<T> {}
  class CycleOptionValue<T = any> extends OptionValue<T> {
    constructor(optionName: string, cycleBtn: Builder<T>, getter: Supplier<T>, setter: Consumer<T>);
    setValue(value: T): void;
    updateValue(): void;
  }


  interface InputOptionValue<T = any> extends OptionValue<T> {}
  class InputOptionValue<T = any> extends OptionValue<T> {
    static readonly INTEGER: Predicate;
    static readonly FLOAT: Predicate;
    constructor(responder: Runnable, optionName: string, getter: Supplier<T>, setter: Consumer<T>, validator: Predicate<string>);
    isValidValue(): boolean;
    setValue(value: T): void;
    updateValue(): void;
  }


  interface OptionValue<T = any> extends Entry {}
  class OptionValue<T = any> extends Entry {
    serverFeature: boolean;
    constructor(optionName: string, getter: Supplier<T>, setter: Consumer<T>);
    appendDescription(description: Component): void;
    get descriptionOnShift(): Component[];
    get id(): ResourceLocation;
    get textWidth(): number;
    get title(): Component;
    get x(): number;
    getTextX(width: number): number;
    isValidValue(): boolean;
    parent(parent: Entry): Entry;
    parent(): Entry;
    render(guiGraphics: GuiGraphics, index: number, rowTop: number, rowLeft: number, width: number, height: number, mouseX: number, mouseY: number, hovered: boolean, deltaTime: number): void;
    save(): void;
    set id(id: ResourceLocation);
    setValue(var1: T): void;
    updateNarration(output: NarrationElementOutput): void;
    updateValue(): void;
  }


  interface SliderOptionValue extends OptionValue<number> {}
  class SliderOptionValue extends OptionValue<number> {
    constructor(optionName: string, getter: Supplier<number>, setter: Consumer<number>, min: number, max: number, aligner: FloatUnaryOperator);
    setValue(value: number): void;
    updateValue(): void;
  }

}

declare module 'snownee.jade.gui.config.value.SliderOptionValue' {
  import { AbstractSliderButton } from 'net.minecraft.client.gui.components';
  import { SliderOptionValue } from 'snownee.jade.gui.config.value';
  import { Component } from 'net.minecraft.network.chat';

  interface Slider extends AbstractSliderButton {}
  class Slider extends AbstractSliderButton {
    constructor(parent: SliderOptionValue, x: number, y: number, width: number, height: number, message: Component);
    static fromScaled(f: number, min: number, max: number): number;
    toScaled(): number;
  }

}

declare module 'snownee.jade.impl' {
  import { AccessorClientHandler, BlockAccessor, IServerDataProvider, IJadeProvider, ITooltip, IComponentProvider, EntityAccessor, Accessor, IWailaClientRegistration, IWailaCommonRegistration } from 'snownee.jade.api';
  import { List, Collection, Set, Map } from 'java.util';
  import { IElement, ScreenDirection } from 'snownee.jade.api.ui';
  import { Function, Consumer, Predicate, ToIntFunction, BiFunction, UnaryOperator } from 'java.util.function';
  import { Class, Enum } from 'java.lang';
  import { Block } from 'net.minecraft.world.level.block';
  import { Entity, EntityType } from 'net.minecraft.world.entity';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Component } from 'net.minecraft.network.chat';
  import { IClientExtensionProvider, ItemView, FluidView, EnergyView, ProgressView, IServerExtensionProvider } from 'snownee.jade.api.view';
  import { ItemStack } from 'net.minecraft.world.item';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { JadeAfterRenderCallback, JadeBeforeRenderCallback, JadeRayTraceCallback, JadeTooltipCollectedCallback, JadeItemModNameCallback, JadeBeforeTooltipCollectCallback } from 'snownee.jade.api.callback';
  import { Codec } from 'com.mojang.serialization';
  import { ImmutableList } from 'com.google.common.collect';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Align } from 'snownee.jade.api.ui.IElement';
  import { HierarchyLookup, PairHierarchyLookup, WrappedHierarchyLookup } from 'snownee.jade.impl.lookup';
  import { JsonConfig } from 'snownee.jade.util';
  import { IgnoreList } from 'snownee.jade.api.config';
  import { Registry, BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Builder } from 'snownee.jade.api.BlockAccessor';
  import { Builder as snownee_jade_api_entityaccessor_Builder } from 'snownee.jade.api.EntityAccessor';
  import { CustomEnchantPower } from 'snownee.jade.api.platform';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { LevelAccessor } from 'net.minecraft.world.level';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';

  interface BlockAccessorClientHandler extends AccessorClientHandler<BlockAccessor> {}
  class BlockAccessorClientHandler extends AccessorClientHandler<BlockAccessor> {
    gatherComponents(accessor: BlockAccessor, tooltipProvider: Function<IJadeProvider, ITooltip>): void;
    getIcon(accessor: BlockAccessor): IElement;
    requestData(accessor: BlockAccessor, providers: IServerDataProvider<BlockAccessor>[]): void;
    shouldDisplay(accessor: BlockAccessor): boolean;
    shouldRequestData(accessor: BlockAccessor): IServerDataProvider<BlockAccessor>[];
  }


  class CallbackContainer<T = any> {
    add(priority: number, callback: T): void;
    call(consumer: Consumer<T>): void;
    callbacks(): T[];
    sort(): void;
  }


  class ClientRegistrationSession {
    constructor(registration: WailaClientRegistration);
    addAfterRenderCallback(priority: number, callback: JadeAfterRenderCallback): void;
    addBeforeRenderCallback(priority: number, callback: JadeBeforeRenderCallback): void;
    addBeforeTooltipCollectCallback(priority: number, callback: JadeBeforeTooltipCollectCallback): void;
    addConfig(key: ResourceLocation, defaultValue: boolean): void;
    addConfig<T extends Enum<T>>(key: ResourceLocation, defaultValue: T): void;
    addConfig(key: ResourceLocation, defaultValue: string, validator: Predicate<string>): void;
    addConfig(key: ResourceLocation, defaultValue: number, min: number, max: number, slider: boolean): void;
    addConfig(key: ResourceLocation, defaultValue: number, min: number, max: number, slider: boolean): void;
    addConfigListener(key: ResourceLocation, listener: Consumer<ResourceLocation>): void;
    addItemModNameCallback(priority: number, callback: JadeItemModNameCallback): void;
    addRayTraceCallback(priority: number, callback: JadeRayTraceCallback): void;
    addTooltipCollectedCallback(priority: number, callback: JadeTooltipCollectedCallback): void;
    end(): void;
    isActive(): boolean;
    registerBlockComponent(provider: IComponentProvider<BlockAccessor>, blockClass: Class<Block>): void;
    registerBlockIcon(provider: IComponentProvider<BlockAccessor>, blockClass: Class<Block>): void;
    registerEnergyStorageClient(provider: IClientExtensionProvider<CompoundTag, EnergyView>): void;
    registerEntityComponent(provider: IComponentProvider<EntityAccessor>, entityClass: Class<Entity>): void;
    registerEntityIcon(provider: IComponentProvider<EntityAccessor>, entityClass: Class<Entity>): void;
    registerFluidStorageClient(provider: IClientExtensionProvider<CompoundTag, FluidView>): void;
    registerItemStorageClient(provider: IClientExtensionProvider<ItemStack, ItemView>): void;
    registerProgressClient(provider: IClientExtensionProvider<CompoundTag, ProgressView>): void;
    reset(): void;
    setConfigCategoryOverride(key: ResourceLocation, override: Component): void;
    setConfigCategoryOverride(key: ResourceLocation, overrides: Component[]): void;
  }


  class CommonRegistrationSession {
    constructor(registration: WailaCommonRegistration);
    end(): void;
    isActive(): boolean;
    registerBlockDataProvider(dataProvider: IServerDataProvider<BlockAccessor>, blockOrBlobkEntityClass: Class<any>): void;
    registerEnergyStorage<T>(provider: IServerExtensionProvider<CompoundTag>, clazz: Class<T>): void;
    registerEntityDataProvider(dataProvider: IServerDataProvider<EntityAccessor>, entityClass: Class<Entity>): void;
    registerFluidStorage<T>(provider: IServerExtensionProvider<CompoundTag>, clazz: Class<T>): void;
    registerItemStorage<T>(provider: IServerExtensionProvider<ItemStack>, clazz: Class<T>): void;
    registerProgress<T>(provider: IServerExtensionProvider<CompoundTag>, clazz: Class<T>): void;
    reset(): void;
  }


  interface EntityAccessorClientHandler extends AccessorClientHandler<EntityAccessor> {}
  class EntityAccessorClientHandler extends AccessorClientHandler<EntityAccessor> {
    gatherComponents(accessor: EntityAccessor, tooltipProvider: Function<IJadeProvider, ITooltip>): void;
    getIcon(accessor: EntityAccessor): IElement;
    requestData(accessor: EntityAccessor, providers: IServerDataProvider<EntityAccessor>[]): void;
    shouldDisplay(accessor: EntityAccessor): boolean;
    shouldRequestData(accessor: EntityAccessor): IServerDataProvider<EntityAccessor>[];
  }


  class ObjectDataCenter {
    static rateLimiter: number;
    static timeLastUpdate: number;
    static serverConnected: boolean;
    static get (): Accessor<any>;
    static get icon(): IElement;
    static get serverData(): CompoundTag;
    static isTimeElapsed(time: number): boolean;
    static requestServerData(): void;
    static resetTimer(): void;
    static set (accessor: Accessor<any>);
    static set serverData(tag: CompoundTag);
  }


  class PriorityStore<K = any, V = any> {
    constructor(defaultPriorityGetter: ToIntFunction<V>, keyGetter: Function<V, K>);
    byKey(id: K): number;
    byValue(value: V): number;
    configurable(configFile: string, keyCodec: Codec<K>): void;
    get sortedList(): ImmutableList<K>;
    put(provider: V): void;
    put(provider: V, priority: number): void;
    putUnsafe(key: K, priority: number): void;
    setSortingFunction(sortingFunction: BiFunction<PriorityStore<K, V>, Collection<K>, K[]>): void;
    sort(extraKeys: Set<K>): void;
  }


  interface Tooltip extends ITooltip {}
  class Tooltip extends ITooltip {
    readonly lines: List;
    sneakyDetails: boolean;
    add(index: number, element: IElement): void;
    add(component: Component): void;
    add(component: Component, tag: ResourceLocation): void;
    add(index: number, component: Component): void;
    add(index: number, component: Component, tag: ResourceLocation): void;
    add(element: IElement): void;
    add(index: number, elements: IElement[]): void;
    add(elements: IElement[]): void;
    append(index: number, element: IElement): void;
    append(component: Component): void;
    append(component: Component, tag: ResourceLocation): void;
    append(element: IElement): void;
    append(index: number, elements: IElement[]): void;
    clear(): void;
    static drawDebugBorder(guiGraphics: GuiGraphics, x: number, y: number, element: IElement): void;
    get(tag: ResourceLocation): IElement[];
    get(index: number, align: Align): IElement[];
    get message(): string;
    getMessage(tag: ResourceLocation): string;
    remove(tag: ResourceLocation): boolean;
    replace(tag: ResourceLocation, component: Component): boolean;
    replace(tag: ResourceLocation, operator: UnaryOperator<IElement[][]>): boolean;
    setLineMargin(index: number, side: ScreenDirection, margin: number): void;
    size(): number;
  }


  interface WailaClientRegistration extends IWailaClientRegistration {}
  class WailaClientRegistration extends IWailaClientRegistration {
    readonly blockIconProviders: HierarchyLookup;
    readonly blockComponentProviders: HierarchyLookup;
    readonly entityIconProviders: HierarchyLookup;
    readonly entityComponentProviders: HierarchyLookup;
    readonly hideBlocks: Set;
    readonly hideEntities: Set;
    readonly pickBlocks: Set;
    readonly pickEntities: Set;
    readonly afterRenderCallback: CallbackContainer;
    readonly beforeRenderCallback: CallbackContainer;
    readonly rayTraceCallback: CallbackContainer;
    readonly tooltipCollectedCallback: CallbackContainer;
    readonly itemModNameCallback: CallbackContainer;
    readonly beforeTooltipCollectCallback: CallbackContainer;
    readonly customEnchantPowers: Map;
    readonly itemStorageProviders: Map;
    readonly fluidStorageProviders: Map;
    readonly energyStorageProviders: Map;
    readonly progressProviders: Map;
    readonly clientFeatures: Set;
    readonly accessorHandlers: Map;
    addAfterRenderCallback(priority: number, callback: JadeAfterRenderCallback): void;
    addAfterRenderCallback(callback: JadeAfterRenderCallback): void;
    addBeforeRenderCallback(priority: number, callback: JadeBeforeRenderCallback): void;
    addBeforeRenderCallback(callback: JadeBeforeRenderCallback): void;
    addBeforeTooltipCollectCallback(priority: number, callback: JadeBeforeTooltipCollectCallback): void;
    addBeforeTooltipCollectCallback(callback: JadeBeforeTooltipCollectCallback): void;
    addConfig(key: ResourceLocation, defaultValue: boolean): void;
    addConfig<T extends Enum<T>>(key: ResourceLocation, defaultValue: T): void;
    addConfig(key: ResourceLocation, defaultValue: string, validator: Predicate<string>): void;
    addConfig(key: ResourceLocation, defaultValue: number, min: number, max: number, slider: boolean): void;
    addConfig(key: ResourceLocation, defaultValue: number, min: number, max: number, slider: boolean): void;
    addConfigListener(key: ResourceLocation, listener: Consumer<ResourceLocation>): void;
    addItemModNameCallback(priority: number, callback: JadeItemModNameCallback): void;
    addItemModNameCallback(callback: JadeItemModNameCallback): void;
    addRayTraceCallback(priority: number, callback: JadeRayTraceCallback): void;
    addRayTraceCallback(callback: JadeRayTraceCallback): void;
    addTooltipCollectedCallback(priority: number, callback: JadeTooltipCollectedCallback): void;
    addTooltipCollectedCallback(callback: JadeTooltipCollectedCallback): void;
    blockAccessor(): Builder;
    static createIgnoreListConfig<T>(file: string, registryKey: ResourceKey<Registry<T>>, defaultValues: string[]): JsonConfig<IgnoreList<T>>;
    createPluginConfigScreen(parent: Screen, jumpToCategory: Component): Screen;
    endSession(): void;
    entityAccessor(): snownee_jade_api_entityaccessor_Builder;
    get serverData(): CompoundTag;
    getAccessorHandler(clazz: Class<Accessor<any>>): AccessorClientHandler<Accessor<any>>;
    getBlockCamouflage(level: LevelAccessor, pos: BlockPos): ItemStack;
    getBlockIconProviders(block: Block, filter: Predicate<IComponentProvider<Accessor<any>>>): IComponentProvider<BlockAccessor>[];
    getBlockProviders(block: Block, filter: Predicate<IComponentProvider<Accessor<any>>>): IComponentProvider<BlockAccessor>[];
    getEntityIconProviders(entity: Entity, filter: Predicate<IComponentProvider<Accessor<any>>>): IComponentProvider<EntityAccessor>[];
    getEntityProviders(entity: Entity, filter: Predicate<IComponentProvider<Accessor<any>>>): IComponentProvider<EntityAccessor>[];
    hideTarget(block: Block): void;
    hideTarget(entityType: EntityType<any>): void;
    static instance(): WailaClientRegistration;
    isClientFeature(uid: ResourceLocation): boolean;
    isServerConnected(): boolean;
    isSessionActive(): boolean;
    isShowDetailsPressed(): boolean;
    loadComplete(): void;
    markAsClientFeature(uid: ResourceLocation): void;
    markAsServerFeature(uid: ResourceLocation): void;
    maybeLowVisionUser(): boolean;
    registerAccessorHandler<T extends Accessor<any>>(clazz: Class<T>, handler: AccessorClientHandler<T>): void;
    registerBlockComponent(provider: IComponentProvider<BlockAccessor>, blockClass: Class<Block>): void;
    registerBlockIcon(provider: IComponentProvider<BlockAccessor>, blockClass: Class<Block>): void;
    registerCustomEnchantPower(block: Block, customEnchantPower: CustomEnchantPower): void;
    registerEnergyStorageClient(provider: IClientExtensionProvider<CompoundTag, EnergyView>): void;
    registerEntityComponent(provider: IComponentProvider<EntityAccessor>, entityClass: Class<Entity>): void;
    registerEntityIcon(provider: IComponentProvider<EntityAccessor>, entityClass: Class<Entity>): void;
    registerFluidStorageClient(provider: IClientExtensionProvider<CompoundTag, FluidView>): void;
    registerItemStorageClient(provider: IClientExtensionProvider<ItemStack, ItemView>): void;
    registerProgressClient(provider: IClientExtensionProvider<CompoundTag, ProgressView>): void;
    reloadIgnoreLists(): void;
    set serverData(tag: CompoundTag);
    setConfigCategoryOverride(key: ResourceLocation, override: Component): void;
    setConfigCategoryOverride(key: ResourceLocation, overrides: Component[]): void;
    shouldHide(state: BlockState): boolean;
    shouldHide(entity: Entity): boolean;
    shouldPick(state: BlockState): boolean;
    shouldPick(entity: Entity): boolean;
    startSession(): void;
    usePickedResult(block: Block): void;
    usePickedResult(entityType: EntityType<any>): void;
  }


  interface WailaCommonRegistration extends IWailaCommonRegistration {}
  class WailaCommonRegistration extends IWailaCommonRegistration {
    readonly blockDataProviders: PairHierarchyLookup;
    readonly entityDataProviders: HierarchyLookup;
    readonly priorities: PriorityStore;
    readonly itemStorageProviders: WrappedHierarchyLookup;
    readonly fluidStorageProviders: WrappedHierarchyLookup;
    readonly energyStorageProviders: WrappedHierarchyLookup;
    readonly progressProviders: WrappedHierarchyLookup;
    endSession(): void;
    getBlockNBTProviders(block: Block, blockEntity: BlockEntity): IServerDataProvider<BlockAccessor>[];
    getEntityNBTProviders(entity: Entity): IServerDataProvider<EntityAccessor>[];
    static instance(): WailaCommonRegistration;
    isSessionActive(): boolean;
    loadComplete(): void;
    registerBlockDataProvider(dataProvider: IServerDataProvider<BlockAccessor>, blockOrBlobkEntityClass: Class<any>): void;
    registerEnergyStorage<T>(provider: IServerExtensionProvider<CompoundTag>, clazz: Class<T>): void;
    registerEntityDataProvider(dataProvider: IServerDataProvider<EntityAccessor>, entityClass: Class<Entity>): void;
    registerFluidStorage<T>(provider: IServerExtensionProvider<CompoundTag>, clazz: Class<T>): void;
    registerItemStorage<T>(provider: IServerExtensionProvider<ItemStack>, clazz: Class<T>): void;
    registerProgress<T>(provider: IServerExtensionProvider<CompoundTag>, clazz: Class<T>): void;
    startSession(): void;
  }

}

declare module 'snownee.jade.impl.BlockAccessorImpl' {
  import { Builder as snownee_jade_api_blockaccessor_Builder } from 'snownee.jade.api.BlockAccessor';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { BlockHitResult } from 'net.minecraft.world.phys';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Supplier } from 'java.util.function';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { ItemStack } from 'net.minecraft.world.item';
  import { BlockAccessor } from 'snownee.jade.api';

  interface Builder extends snownee_jade_api_blockaccessor_Builder {}
  class Builder extends snownee_jade_api_blockaccessor_Builder {
    blockEntity(blockEntity: Supplier<BlockEntity>): Builder;
    blockEntity(blockEntity: BlockEntity): snownee_jade_api_blockaccessor_Builder;
    blockState(blockState: BlockState): Builder;
    build(): BlockAccessor;
    fakeBlock(stack: ItemStack): Builder;
    from(accessor: BlockAccessor): Builder;
    hit(hit: BlockHitResult): Builder;
    level(level: Level): Builder;
    player(player: Player): Builder;
    requireVerification(): snownee_jade_api_blockaccessor_Builder;
    serverConnected(connected: boolean): Builder;
    serverData(serverData: CompoundTag): Builder;
    showDetails(showDetails: boolean): Builder;
  }

}

declare module 'snownee.jade.impl.config.entry' {
  import { Boolean, Float, Integer } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { OptionValue } from 'snownee.jade.gui.config.value';
  import { OptionsList } from 'snownee.jade.gui.config';
  import { BiConsumer, Consumer, Predicate } from 'java.util.function';

  interface BooleanConfigEntry extends ConfigEntry<boolean> {}
  class BooleanConfigEntry extends ConfigEntry<boolean> {
    constructor(id: ResourceLocation, defaultValue: boolean);
    createUI(options: OptionsList, optionName: string, setter: BiConsumer<ResourceLocation, any>): OptionValue<any>;
    isValidValue(value: any): boolean;
  }


  class ConfigEntry<T = any> {
    readonly id: ResourceLocation;
    constructor(id: ResourceLocation, defaultValue: T);
    addListener(listener: Consumer<ResourceLocation>): void;
    createUI(var1: OptionsList, var2: string, var3: BiConsumer<ResourceLocation, any>): OptionValue<any>;
    get defaultValue(): T;
    get id(): ResourceLocation;
    get value(): T;
    isSynced(): boolean;
    isValidValue(var1: any): boolean;
    notifyChange(): void;
    set value(value: any);
    setSynced(synced: boolean): void;
  }


  interface EnumConfigEntry<E extends Enum<E> = any> extends ConfigEntry<E> {}
  class EnumConfigEntry<E extends Enum<E> = any> extends ConfigEntry<E> {
    constructor(id: ResourceLocation, defaultValue: E);
    createUI(options: OptionsList, optionName: string, setter: BiConsumer<ResourceLocation, any>): OptionValue<any>;
    isValidValue(value: any): boolean;
    setValue(value: any): void;
  }


  interface FloatConfigEntry extends ConfigEntry<number> {}
  class FloatConfigEntry extends ConfigEntry<number> {
    constructor(id: ResourceLocation, defaultValue: number, min: number, max: number, slider: boolean);
    createUI(options: OptionsList, optionName: string, setter: BiConsumer<ResourceLocation, any>): OptionValue<any>;
    isValidValue(value: any): boolean;
    setValue(value: any): void;
  }


  interface IntConfigEntry extends ConfigEntry<number> {}
  class IntConfigEntry extends ConfigEntry<number> {
    constructor(id: ResourceLocation, defaultValue: number, min: number, max: number, slider: boolean);
    createUI(options: OptionsList, optionName: string, setter: BiConsumer<ResourceLocation, any>): OptionValue<any>;
    isValidValue(value: any): boolean;
    setValue(value: any): void;
  }


  interface StringConfigEntry extends ConfigEntry<string> {}
  class StringConfigEntry extends ConfigEntry<string> {
    constructor(id: ResourceLocation, defaultValue: string, validator: Predicate<string>);
    createUI(options: OptionsList, optionName: string, setter: BiConsumer<ResourceLocation, any>): OptionValue<any>;
    isValidValue(value: any): boolean;
  }

}

declare module 'snownee.jade.impl.config' {
  import { IPluginConfig, IWailaConfig } from 'snownee.jade.api.config';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ConfigEntry } from 'snownee.jade.impl.config.entry';
  import { Set, List } from 'java.util';
  import { IToggleableProvider } from 'snownee.jade.api';
  import { Enum } from 'java.lang';
  import { File } from 'java.io';
  import { JsonObject } from 'com.google.gson';
  import { Consumer } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';
  import { Category } from 'snownee.jade.impl.config.PluginConfig';
  import { Codec } from 'com.mojang.serialization';
  import { ConfigGeneral, ConfigOverlay, ConfigFormatting, ConfigHistory } from 'snownee.jade.impl.config.WailaConfig';

  interface PluginConfig extends IPluginConfig {}
  class PluginConfig extends IPluginConfig {
    static readonly INSTANCE: PluginConfig;
    static readonly CLIENT_FILE: string;
    static readonly SERVER_FILE: string;
    addConfig(entry: ConfigEntry<any>): void;
    addConfigListener(key: ResourceLocation, listener: Consumer<ResourceLocation>): void;
    applyServerConfigs(json: JsonObject): void;
    containsKey(uid: ResourceLocation): boolean;
    get(provider: IToggleableProvider): boolean;
    get(key: ResourceLocation): boolean;
    get file(): File;
    get keys(): Set<ResourceLocation>;
    get serverConfigs(): string;
    getEntry(key: ResourceLocation): ConfigEntry<any>;
    getEnum<T extends Enum<T>>(key: ResourceLocation): T;
    getFloat(key: ResourceLocation): number;
    getInt(key: ResourceLocation): number;
    getKeys(namespace: string): Set<ResourceLocation>;
    getListView(enableAccessibilityPlugins: boolean): Category[];
    static getPrimaryKey(key: ResourceLocation): ResourceLocation;
    getString(key: ResourceLocation): string;
    static isPrimaryKey(key: ResourceLocation): boolean;
    reload(): void;
    save(): void;
    set(key: ResourceLocation, value: any): boolean;
    setCategoryOverride(key: ResourceLocation, overrides: Component[]): void;
  }


  interface WailaConfig extends IWailaConfig {}
  class WailaConfig extends IWailaConfig {
    static readonly CODEC: Codec;
    constructor(general: ConfigGeneral, overlay: ConfigOverlay, formatting: ConfigFormatting, history: ConfigHistory);
    get formatting(): ConfigFormatting;
    get general(): ConfigGeneral;
    get history(): ConfigHistory;
    get overlay(): ConfigOverlay;
    get plugin(): IPluginConfig;
  }

}

declare module 'snownee.jade.impl.config.WailaConfig' {
  import { IConfigGeneral, DisplayMode, TTSMode, FluidMode, PerspectiveMode, BossBarOverlapMode, IConfigOverlay, IconMode, IConfigFormatting } from 'snownee.jade.api.config.IWailaConfig';
  import { Codec } from 'com.mojang.serialization';
  import { List } from 'java.util';
  import { ExtraOptions } from 'snownee.jade.impl.config.WailaConfig.ConfigGeneral';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Theme } from 'snownee.jade.api.theme';
  import { Style, Component } from 'net.minecraft.network.chat';

  interface ConfigGeneral extends IConfigGeneral {}
  class ConfigGeneral extends IConfigGeneral {
    static readonly CODEC: Codec;
    static readonly itemModNameTooltipDisabledByMods: List;
    previewOverlay: boolean;
    constructor(previewOverlay: boolean, displayTooltip: boolean, displayBlocks: boolean, displayEntities: boolean, displayBosses: boolean, displayMode: DisplayMode, enableTextToSpeech: boolean, ttsMode: TTSMode, fluidMode: FluidMode, perspectiveMode: PerspectiveMode, extendedReach: number, debug: boolean, itemModNameTooltip: boolean, bossBarOverlapMode: BossBarOverlapMode, builtinCamouflage: boolean, extraOptions: ExtraOptions);
    get accessibilityModMemory(): boolean;
    get bossBarOverlapMode(): BossBarOverlapMode;
    get builtinCamouflage(): boolean;
    get displayBlocks(): boolean;
    get displayBosses(): boolean;
    get displayEntities(): boolean;
    get displayFluids(): FluidMode;
    get displayMode(): DisplayMode;
    get enableAccessibilityPlugin(): boolean;
    get extendedReach(): number;
    get perspectiveMode(): PerspectiveMode;
    get tTSMode(): TTSMode;
    static init(): void;
    isDebug(): boolean;
    set accessibilityModMemory(accessibilityModMemory: boolean);
    set bossBarOverlapMode(mode: BossBarOverlapMode);
    set builtinCamouflage(builtinCamouflage: boolean);
    set displayBlocks(displayBlocks: boolean);
    set displayBosses(displayBosses: boolean);
    set displayEntities(displayEntities: boolean);
    set displayFluids(displayFluids: boolean);
    set displayMode(displayMode: DisplayMode);
    set enableAccessibilityPlugin(enableAccessibilityPlugin: boolean);
    set extendedReach(extendedReach: number);
    set perspectiveMode(perspectiveMode: PerspectiveMode);
    set tTSMode(ttsMode: TTSMode);
    setDebug(debug: boolean): void;
    setDisplayFluids(displayFluids: FluidMode): void;
    setDisplayTooltip(displayTooltip: boolean): void;
    setHideFromGUIs(hideFromGUIs: boolean): void;
    setHideFromTabList(hideFromTabList: boolean): void;
    setItemModNameTooltip(itemModNameTooltip: boolean): void;
    shouldDisplayFluids(): boolean;
    shouldDisplayTooltip(): boolean;
    shouldEnableTextToSpeech(): boolean;
    shouldHideFromGUIs(): boolean;
    shouldHideFromTabList(): boolean;
    showItemModNameTooltip(): boolean;
    toggleTTS(): void;
  }


  interface ConfigOverlay extends IConfigOverlay {}
  class ConfigOverlay extends IConfigOverlay {
    static readonly CODEC: Codec;
    activeTheme: ResourceLocation;
    constructor(activeTheme: ResourceLocation, overlayPosX: number, overlayPosY: number, overlayScale: number, overlayAnchorX: number, overlayAnchorY: number, overlaySquare: boolean, flipMainHand: boolean, autoScaleThreshold: number, alpha: number, iconMode: IconMode, animation: boolean, disappearingDelay: number);
    applyTheme(id: ResourceLocation): void;
    get alpha(): number;
    get anchorX(): number;
    get anchorY(): number;
    get animation(): boolean;
    get autoScaleThreshold(): number;
    get disappearingDelay(): number;
    get flipMainHand(): boolean;
    get iconMode(): IconMode;
    get overlayPosX(): number;
    get overlayPosY(): number;
    get overlayScale(): number;
    get square(): boolean;
    get theme(): Theme;
    set alpha(alpha: number);
    set anchorX(overlayAnchorX: number);
    set anchorY(overlayAnchorY: number);
    set animation(animation: boolean);
    set disappearingDelay(delay: number);
    set flipMainHand(overlaySquare: boolean);
    set iconMode(iconMode: IconMode);
    set overlayPosX(overlayPosX: number);
    set overlayPosY(overlayPosY: number);
    set overlayScale(overlayScale: number);
    set square(overlaySquare: boolean);
    shouldShowIcon(): boolean;
    tryFlip(f: number): number;
  }


  interface ConfigFormatting extends IConfigFormatting {}
  class ConfigFormatting extends IConfigFormatting {
    static readonly CODEC: Codec;
    constructor(itemModNameStyle: Style);
    get itemModNameStyle(): Style;
    registryName(name: string): Component;
    set itemModNameStyle(itemModNameStyle: Style);
  }


  class ConfigHistory {
    static readonly CODEC: Codec;
    hintOverlayToggle: boolean;
    hintNarratorToggle: boolean;
    themesHash: number;
    constructor(hintOverlayToggle: boolean, hintNarratorToggle: boolean, themesHash: number);
  }

}

declare module 'snownee.jade.impl.config.WailaConfig.ConfigGeneral' {
  import { MapCodec } from 'com.mojang.serialization';

  class ExtraOptions {
    static readonly CODEC: MapCodec;
    accessibilityModMemory: boolean;
    enableAccessibilityPlugin: boolean;
    constructor(hideFromTabList: boolean, hideFromGUIs: boolean, accessibilityModMemory: boolean, enableAccessibilityPlugin: boolean);
    accessibilityModMemory(): boolean;
    enableAccessibilityPlugin(): boolean;
    hideFromGUIs(): boolean;
    hideFromTabList(): boolean;
    setAccessibilityModMemory(accessibilityModMemory: boolean): void;
    setEnableAccessibilityPlugin(enableAccessibilityPlugin: boolean): void;
    setHideFromGUIs(hideFromGUIs: boolean): void;
    setHideFromTabList(hideFromTabList: boolean): void;
  }

}

declare module 'snownee.jade.impl.EntityAccessorImpl' {
  import { Builder as snownee_jade_api_entityaccessor_Builder } from 'snownee.jade.api.EntityAccessor';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Supplier } from 'java.util.function';
  import { EntityHitResult } from 'net.minecraft.world.phys';
  import { Entity } from 'net.minecraft.world.entity';
  import { EntityAccessor } from 'snownee.jade.api';

  interface Builder extends snownee_jade_api_entityaccessor_Builder {}
  class Builder extends snownee_jade_api_entityaccessor_Builder {
    showDetails: boolean;
    build(): EntityAccessor;
    entity(entity: Supplier<Entity>): Builder;
    entity(entity: Entity): snownee_jade_api_entityaccessor_Builder;
    from(accessor: EntityAccessor): Builder;
    hit(hit: Supplier<EntityHitResult>): Builder;
    hit(hit: EntityHitResult): snownee_jade_api_entityaccessor_Builder;
    level(level: Level): Builder;
    player(player: Player): Builder;
    requireVerification(): snownee_jade_api_entityaccessor_Builder;
    serverConnected(connected: boolean): Builder;
    serverData(serverData: CompoundTag): Builder;
    showDetails(showDetails: boolean): Builder;
  }

}

declare module 'snownee.jade.impl.lookup' {
  import { Class } from 'java.lang';
  import { IdMapper } from 'net.minecraft.core';
  import { List, Collection, Comparator } from 'java.util';
  import { Stream } from 'java.util.stream';
  import { Entry } from 'Map';
  import { PriorityStore } from 'snownee.jade.impl';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IJadeProvider, Accessor } from 'snownee.jade.api';
  import { BiPredicate } from 'java.util.function';

  interface HierarchyLookup<T extends IJadeProvider = any> extends IHierarchyLookup<T> {}
  class HierarchyLookup<T extends IJadeProvider = any> extends IHierarchyLookup<T> {
    constructor(baseClass: Class<any>);

    constructor(baseClass: Class<any>, singleton: boolean);
    entries(): Stream<Entry<Class<any>, Collection<T>>>;
    get(clazz: Class<any>): T[];
    idMapped(): void;
    idMapper(): IdMapper<T>;
    invalidate(): void;
    isClassAcceptable(clazz: Class<any>): boolean;
    isEmpty(): boolean;
    loadComplete(priorityStore: PriorityStore<ResourceLocation, IJadeProvider>): void;
    register(clazz: Class<any>, provider: T): void;
  }


  class IHierarchyLookup<T extends IJadeProvider = any> {
    static readonly COMPARATOR: Comparator;
    cast(): IHierarchyLookup<T>;
    createIdMapper(): IdMapper<T>;
    entries(): Stream<Entry<Class<any>, Collection<T>>>;
    get(obj: any): T[];
    get(var1: Class<any>): T[];
    idMapped(): void;
    idMapper(): IdMapper<T>;
    invalidate(): void;
    isClassAcceptable(var1: Class<any>): boolean;
    isEmpty(): boolean;
    loadComplete(var1: PriorityStore<ResourceLocation, IJadeProvider>): void;
    mappedIds(): ResourceLocation[];
    register(var1: Class<any>, var2: T): void;
    remapIds(ids: ResourceLocation[]): void;
  }


  interface PairHierarchyLookup<T extends IJadeProvider = any> extends IHierarchyLookup<T> {}
  class PairHierarchyLookup<T extends IJadeProvider = any> extends IHierarchyLookup<T> {
    readonly first: IHierarchyLookup;
    readonly second: IHierarchyLookup;
    constructor(first: IHierarchyLookup<T>, second: IHierarchyLookup<T>);
    entries(): Stream<Entry<Class<any>, Collection<T>>>;
    get(clazz: Class<any>): T[];
    getMerged<ANY>(first: any, second: any): ANY[];
    idMapped(): void;
    idMapper(): IdMapper<T>;
    invalidate(): void;
    isClassAcceptable(clazz: Class<any>): boolean;
    isEmpty(): boolean;
    loadComplete(priorityStore: PriorityStore<ResourceLocation, IJadeProvider>): void;
    register(clazz: Class<any>, provider: T): void;
  }


  interface WrappedHierarchyLookup<T extends IJadeProvider = any> extends HierarchyLookup<T> {}
  class WrappedHierarchyLookup<T extends IJadeProvider = any> extends HierarchyLookup<T> {
    readonly overrides: List;
    constructor();
    entries(): Stream<Entry<Class<any>, Collection<T>>>;
    static forAccessor<T extends IJadeProvider>(): WrappedHierarchyLookup<T>;
    hitsAny(accessor: Accessor<any>, predicate: BiPredicate<T, Accessor<any>>): boolean;
    invalidate(): void;
    isClassAcceptable(clazz: Class<any>): boolean;
    isEmpty(): boolean;
    loadComplete(priorityStore: PriorityStore<ResourceLocation, IJadeProvider>): void;
    register(clazz: Class<any>, provider: T): void;
    wrappedGet(accessor: Accessor<any>): T[];
  }

}

declare module 'snownee.jade.impl.template' {
  import { BlockAccessor, IBlockComponentProvider, IComponentProvider, ITooltip, EntityAccessor, IEntityComponentProvider, IServerDataProvider } from 'snownee.jade.api';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IElement } from 'snownee.jade.api.ui';
  import { IPluginConfig } from 'snownee.jade.api.config';
  import { BiFunction, BiConsumer, Predicate } from 'java.util.function';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface TemplateBlockComponentProvider extends IBlockComponentProvider, TemplateComponentProvider<BlockAccessor> {}
  class TemplateBlockComponentProvider extends IBlockComponentProvider {
    constructor(uid: ResourceLocation);

    constructor(uid: ResourceLocation, required: boolean, enabledByDefault: boolean, defaultPriority: number);
  }


  interface TemplateBlockServerDataProvider extends TemplateServerDataProvider<BlockAccessor> {}
  class TemplateBlockServerDataProvider extends TemplateServerDataProvider<BlockAccessor> {
    constructor(uid: ResourceLocation);
  }


  interface TemplateComponentProvider<T extends Accessor<any> = any> extends IComponentProvider<T> {}
  class TemplateComponentProvider<T extends Accessor<any> = any> extends IComponentProvider<T> {
    appendTooltip(tooltip: ITooltip, accessor: T, config: IPluginConfig): void;
    enabledByDefault(): boolean;
    get defaultPriority(): number;
    get uid(): ResourceLocation;
    getIcon(accessor: T, config: IPluginConfig, currentIcon: IElement): IElement;
    isRequired(): boolean;
    setIconFunction(iconFunction: BiFunction<T, IElement, IElement>): void;
    setTooltipFunction(tooltipFunction: BiConsumer<ITooltip, T>): void;
  }


  interface TemplateEntityComponentProvider extends IEntityComponentProvider, TemplateComponentProvider<EntityAccessor> {}
  class TemplateEntityComponentProvider extends IEntityComponentProvider {
    constructor(uid: ResourceLocation);

    constructor(uid: ResourceLocation, required: boolean, enabledByDefault: boolean, defaultPriority: number);
  }


  interface TemplateEntityServerDataProvider extends TemplateServerDataProvider<EntityAccessor> {}
  class TemplateEntityServerDataProvider extends TemplateServerDataProvider<EntityAccessor> {
    constructor(uid: ResourceLocation);
  }


  interface TemplateServerDataProvider<T extends Accessor<any> = any> extends IServerDataProvider<T> {}
  class TemplateServerDataProvider<T extends Accessor<any> = any> extends IServerDataProvider<T> {
    appendServerData(data: CompoundTag, accessor: T): void;
    get uid(): ResourceLocation;
    setDataFunction(dataFunction: BiConsumer<CompoundTag, T>): void;
    setShouldRequestData(shouldRequestData: Predicate<T>): void;
    shouldRequestData(accessor: T): boolean;
  }

}

declare module 'snownee.jade.impl.theme' {
  import { SimpleJsonResourceReloadListener } from 'net.minecraft.server.packs.resources';
  import { IThemeHelper, Theme } from 'snownee.jade.api.theme';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { MutableObject } from 'org.apache.commons.lang3.mutable';
  import { Style, MutableComponent } from 'net.minecraft.network.chat';
  import { Collection } from 'java.util';

  interface ThemeHelper extends IThemeHelper, SimpleJsonResourceReloadListener {}
  class ThemeHelper extends IThemeHelper {
    static readonly INSTANCE: ThemeHelper;
    static readonly ID: ResourceLocation;
    static readonly theme: MutableObject;
    constructor();
    static colorStyle(color: number): Style;
    danger(componentOrString: any): MutableComponent;
    failure(componentOrString: any): MutableComponent;
    get themes(): Collection<Theme>;
    getTheme(id: ResourceLocation): Theme;
    info(componentOrString: any): MutableComponent;
    modName(componentOrString: any): MutableComponent;
    seconds(ticks: number, tickRate: number): MutableComponent;
    success(componentOrString: any): MutableComponent;
    theme(): Theme;
    title(componentOrString: any): MutableComponent;
    warning(componentOrString: any): MutableComponent;
  }

}

declare module 'snownee.jade.impl.Tooltip' {
  import { List } from 'java.util';
  import { IElement } from 'snownee.jade.api.ui';
  import { Align } from 'snownee.jade.api.ui.IElement';
  import { Vec2 } from 'net.minecraft.world.phys';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class Line {
    marginTop: number;
    marginBottom: number;
    alignedElements(align: Align): IElement[];
    markDirty(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, maxX: number, maxY: number): void;
    size(): Vec2;
    sort(): void;
    sortedElements(): IElement[];
  }

}

declare module 'snownee.jade.impl.ui' {
  import { Element, IBoxElement, BoxStyle, MessageType, IElement, TooltipRect, ScreenDirection, IElementHelper, ITextElement, ProgressStyle } from 'snownee.jade.api.ui';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Vec2 } from 'net.minecraft.world.phys';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Tooltip } from 'snownee.jade.impl';
  import { Theme } from 'snownee.jade.api.theme';
  import { Component, FormattedText } from 'net.minecraft.network.chat';
  import { ItemStack } from 'net.minecraft.world.item';
  import { JadeFluidObject } from 'snownee.jade.api.fluid';
  import { ITooltip } from 'snownee.jade.api';

  interface ArmorElement extends Element {}
  class ArmorElement extends Element {
    static readonly ARMOR: ResourceLocation;
    static readonly HALF_ARMOR: ResourceLocation;
    static readonly EMPTY_ARMOR: ResourceLocation;
    constructor(armor: number);
    getMessage(): string;
    getSize(): Vec2;
    render(guiGraphics: GuiGraphics, x: number, y: number, maxX: number, maxY: number): void;
    showText(): boolean;
  }


  interface BoxElement extends IBoxElement, Element {}
  class BoxElement extends IBoxElement {
    constructor(tooltip: Tooltip, style: BoxStyle);
    clearBoxProgress(): void;
    get boxProgress(): number;
    get icon(): IElement;
    get style(): BoxStyle;
    get tooltip(): Tooltip;
    getMessage(): string;
    getSize(): Vec2;
    padding(direction: ScreenDirection): number;
    render(guiGraphics: GuiGraphics, x: number, y: number, maxX: number, maxY: number): void;
    set icon(icon: IElement);
    setBoxProgress(type: MessageType, progress: number): void;
    setPadding(direction: ScreenDirection, value: number): void;
    setThemeIcon(icon: IElement, theme: Theme): void;
    updateExpectedRect(rect: TooltipRect): void;
    updateRect(rect: TooltipRect): void;
  }


  interface CompoundElement extends Element {}
  class CompoundElement extends Element {
    constructor(large: IElement, small: IElement);
    getSize(): Vec2;
    render(guiGraphics: GuiGraphics, x: number, y: number, maxX: number, maxY: number): void;
  }


  interface ElementHelper extends IElementHelper {}
  class ElementHelper extends IElementHelper {
    static readonly INSTANCE: ElementHelper;
    static readonly DEFAULT_PROGRESS: ResourceLocation;
    static readonly DEFAULT_PROGRESS_BASE: ResourceLocation;
    static readonly SMALL_ITEM_SIZE: Vec2;
    static readonly SMALL_ITEM_OFFSET: Vec2;
    box(tooltip: ITooltip, boxStyle: BoxStyle): IBoxElement;
    currentUid(): ResourceLocation;
    fluid(fluid: JadeFluidObject): IElement;
    item(stack: ItemStack): IElement;
    item(stack: ItemStack, scale: number): IElement;
    item(stack: ItemStack, scale: number, text: string): IElement;
    progress(progress: number, text: Component, style: ProgressStyle, boxStyle: BoxStyle, canDecrease: boolean): IElement;
    progress(progress: number): IElement;
    progress(progress: number, baseSprite: ResourceLocation, progressSprite: ResourceLocation, width: number, height: number, canDecrease: boolean): IElement;
    progressStyle(): ProgressStyle;
    setCurrentUid(uid: ResourceLocation): void;
    smallItem(stack: ItemStack): IElement;
    spacer(width: number, height: number): IElement;
    sprite(sprite: ResourceLocation, width: number, height: number): IElement;
    text(component: Component): ITextElement;
    tooltip(): ITooltip;
  }


  interface FluidStackElement extends Element {}
  class FluidStackElement extends Element {
    constructor(fluid: JadeFluidObject);
    getMessage(): string;
    getSize(): Vec2;
    render(guiGraphics: GuiGraphics, x: number, y: number, maxX: number, maxY: number): void;
  }


  interface HealthElement extends Element {}
  class HealthElement extends Element {
    static readonly HEART: ResourceLocation;
    static readonly HEART_BLINKING: ResourceLocation;
    static readonly HALF_HEART: ResourceLocation;
    static readonly HALF_HEART_BLINKING: ResourceLocation;
    static readonly EMPTY_HEART: ResourceLocation;
    static readonly EMPTY_HEART_BLINKING: ResourceLocation;
    constructor(maxHealth: number, health: number);
    getMessage(): string;
    getSize(): Vec2;
    render(guiGraphics: GuiGraphics, x: number, y: number, maxX: number, maxY: number): void;
    showText(): boolean;
  }


  interface HorizontalLineElement extends Element {}
  class HorizontalLineElement extends Element {
    color: number;
    getSize(): Vec2;
    render(guiGraphics: GuiGraphics, x: number, y: number, maxX: number, maxY: number): void;
  }


  interface ItemStackElement extends Element {}
  class ItemStackElement extends Element {
    static readonly EMPTY: ItemStackElement;
    get item(): ItemStack;
    getMessage(): string;
    getSize(): Vec2;
    static of(stack: ItemStack): ItemStackElement;
    static of(stack: ItemStack, scale: number): ItemStackElement;
    static of(stack: ItemStack, scale: number, text: string): ItemStackElement;
    render(guiGraphics: GuiGraphics, x: number, y: number, maxX: number, maxY: number): void;
  }


  interface ProgressElement extends StyledElement, Element {}
  class ProgressElement extends StyledElement {
    constructor(progress: number, text: Component, style: ProgressStyle, boxStyle: BoxStyle, canDecrease: boolean);
    get icon(): IElement;
    get style(): BoxStyle;
    getMessage(): string;
    getSize(): Vec2;
    render(guiGraphics: GuiGraphics, x: number, y: number, maxX: number, maxY: number): void;
  }


  interface SimpleProgressStyle extends ProgressStyle {}
  class SimpleProgressStyle extends ProgressStyle {
    autoTextColor: boolean;
    color: number;
    color2: number;
    textColor: number;
    vertical: boolean;
    constructor();
    color(color: number, color2: number): ProgressStyle;
    color(color: number): ProgressStyle;
    direction(direction: ScreenDirection): ProgressStyle;
    direction(): ScreenDirection;
    render(guiGraphics: GuiGraphics, x: number, y: number, width: number, height: number, progress: number, text: Component): void;
    textColor(color: number): ProgressStyle;
  }


  interface SlimProgressStyle extends ProgressStyle {}
  class SlimProgressStyle extends ProgressStyle {
    color: number;
    color(color: number, color2: number): ProgressStyle;
    color(color: number): ProgressStyle;
    direction(direction: ScreenDirection): ProgressStyle;
    direction(): ScreenDirection;
    render(guiGraphics: GuiGraphics, x: number, y: number, w: number, h: number, progress: number, text: Component): void;
    textColor(color: number): ProgressStyle;
  }


  interface SpacerElement extends Element {}
  class SpacerElement extends Element {
    constructor(dimension: Vec2);
    getSize(): Vec2;
    render(guiGraphics: GuiGraphics, x: number, y: number, maxX: number, maxY: number): void;
  }


  interface SpecialTextElement extends TextElement {}
  class SpecialTextElement extends TextElement {
    constructor(text: FormattedText);
    getSize(): Vec2;
    render(guiGraphics: GuiGraphics, x: number, y: number, maxX: number, maxY: number): void;
    scale(scale: number): ITextElement;
    toSpecial(): SpecialTextElement;
    zOffset(zOffset: number): ITextElement;
  }


  interface SpriteElement extends Element {}
  class SpriteElement extends Element {
    constructor(sprite: ResourceLocation, width: number, height: number);
    getSize(): Vec2;
    render(guiGraphics: GuiGraphics, x: number, y: number, maxX: number, maxY: number): void;
  }


  interface StyledElement extends IElement {}
  class StyledElement extends IElement {
    get icon(): IElement;
    get style(): BoxStyle;
  }


  interface TextElement extends ITextElement, Element {}
  class TextElement extends ITextElement {
    readonly text: FormattedText;
    constructor(component: Component);

    constructor(text: FormattedText);
    getMessage(): string;
    getSize(): Vec2;
    render(guiGraphics: GuiGraphics, x: number, y: number, maxX: number, maxY: number): void;
    scale(scale: number): ITextElement;
    toSpecial(): SpecialTextElement;
    zOffset(zOffset: number): ITextElement;
  }

}

declare module 'snownee.jade' {
  import { Logger } from 'org.slf4j';
  import { JsonConfig } from 'snownee.jade.util';
  import { SystemToastId } from 'SystemToast';
  import { KeyMapping } from 'net.minecraft.client';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { TooltipContext } from 'Item';
  import { List } from 'java.util';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { Accessor } from 'snownee.jade.api';
  import { HitResult } from 'net.minecraft.world.phys';
  import { IBoxElement, TooltipRect, IElementHelper, IDisplayHelper } from 'snownee.jade.api.ui';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { IWailaConfig } from 'snownee.jade.api.config';
  import { IThemeHelper } from 'snownee.jade.api.theme';

  class Jade {
    static readonly ID: string;
    static readonly LOGGER: Logger;
    static readonly CONFIG: JsonConfig;
    static FROZEN: boolean;
    static loadComplete(): void;
  }


  class JadeClient {
    static readonly JADE_PLEASE_WAIT: SystemToastId;
    static openConfig: KeyMapping;
    static showOverlay: KeyMapping;
    static toggleLiquid: KeyMapping;
    static showDetails: KeyMapping;
    static narrate: KeyMapping;
    static showRecipes: KeyMapping;
    static showUses: KeyMapping;
    static appendModName(tooltip: Component[], stack: ItemStack, tooltipContext: TooltipContext, flag: TooltipFlag): void;
    static builtInOverrides(hitResult: HitResult, accessor: Accessor<any>, originalAccessor: Accessor<any>): Accessor<any>;
    static drawBreakingProgress(rootElement: IBoxElement, rect: TooltipRect, guiGraphics: GuiGraphics, accessor: Accessor<any>): void;
    static format(s: string, ...objects: any[]): MutableComponent;
    static hideModNameIn(context: TooltipContext): void;
    static init(): void;
    static limitMobEffectFog(hitResult: HitResult, accessor: Accessor<any>, originalAccessor: Accessor<any>): Accessor<any>;
    static onGui(screen: Screen): void;
    static onKeyPressed(action: number): void;
    static pleaseWait(): void;
  }


  class JadeInternals {
    static get displayHelper(): IDisplayHelper;
    static get elementHelper(): IElementHelper;
    static get themeHelper(): IThemeHelper;
    static get wailaConfig(): IWailaConfig;
  }

}

declare module 'snownee.jade.mixin' {
  import { ItemAbility } from 'net.neoforged.neoforge.common';
  import { Component } from 'net.minecraft.network.chat';
  import { JadeFont } from 'snownee.jade.gui';

  class AbstractFurnaceBlockEntityAccess {
    get cookingProgress(): number;
    get cookingTotalTime(): number;
  }


  class CanItemPerformAbilityAccess {
    get ability(): ItemAbility;
  }


  class EntityAccess {
    callGetTypeName(): Component;
  }


  interface FontMixin extends JadeFont {}
  class FontMixin extends JadeFont {
    jade$setGlint(glint1: number, glint2: number): void;
    jade$setGlintStrength(glint1Strength: number, glint2Strength: number): void;
  }


  class SessionSearchTreesMixin {
  }


  class StringRenderOutputMixin {
  }

}

declare module 'snownee.jade.network' {
  import { Runnable } from 'java.lang';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { ServerPlayer } from 'net.minecraft.server.level';

  class ClientPayloadContext {
    execute(var1: Runnable): void;
  }


  class ServerPayloadContext {
    execute(runnable: Runnable): void;
    player(): ServerPlayer;
    sendPacket(payload: CustomPacketPayload): void;
  }

}

declare module 'snownee.jade.overlay' {
  import { Entity } from 'net.minecraft.world.entity';
  import { ItemStack } from 'net.minecraft.world.item';
  import { LevelAccessor, BlockGetter, Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { Accessor, ITooltip } from 'snownee.jade.api';
  import { HitResult, BlockHitResult, EntityHitResult, Vec3, AABB } from 'net.minecraft.world.phys';
  import { IDisplayHelper, TooltipRect, IElement } from 'snownee.jade.api.ui';
  import { DecimalFormat, Format } from 'java.text';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { JadeFluidObject } from 'snownee.jade.api.fluid';
  import { FormattedText, MutableComponent, Component } from 'net.minecraft.network.chat';
  import { FormattedCharSequence } from 'net.minecraft.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { BoxElement } from 'snownee.jade.impl.ui';
  import { Predicate } from 'java.util.function';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { ProgressTracker } from 'snownee.jade.track';

  class DatapackBlockManager {
    static getFakeBlock(level: LevelAccessor, pos: BlockPos): ItemStack;
    static onEntityJoin(entity: Entity): void;
    static onEntityLeave(entity: Entity): void;
    static override(hitResult: HitResult, accessor: Accessor<any>, originalAccessor: Accessor<any>): Accessor<any>;
  }


  interface DisplayHelper extends IDisplayHelper {}
  class DisplayHelper extends IDisplayHelper {
    static readonly INSTANCE: DisplayHelper;
    static dfCommas: DecimalFormat;
    static readonly dfCommasArray: DecimalFormat[];
    blitSprite(guiGraphics: GuiGraphics, resourceLocation: ResourceLocation, i: number, j: number, k: number, l: number): void;
    blitSprite(guiGraphics: GuiGraphics, resourceLocation: ResourceLocation, i: number, j: number, k: number, l: number, m: number): void;
    blitSprite(guiGraphics: GuiGraphics, resourceLocation: ResourceLocation, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number): void;
    blitSprite(guiGraphics: GuiGraphics, resourceLocation: ResourceLocation, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number, q: number): void;
    drawBorder(guiGraphics: GuiGraphics, minX: number, minY: number, maxX: number, maxY: number, width: number, color: number, corner: boolean): void;
    drawFluid(guiGraphics: GuiGraphics, xPosition: number, yPosition: number, fluid: JadeFluidObject, width: number, height: number, capacityMb: number): void;
    drawGradientProgress(guiGraphics: GuiGraphics, left: number, top: number, width: number, height: number, progress: number, progressColor: number): void;
    drawGradientRect(guiGraphics: GuiGraphics, left: number, top: number, width: number, height: number, startColor: number, endColor: number): void;
    drawGradientRect(guiGraphics: GuiGraphics, left: number, top: number, width: number, height: number, startColor: number, endColor: number, horizontal: boolean): void;
    drawItem(guiGraphics: GuiGraphics, x: number, y: number, stack: ItemStack, scale: number, text: string): void;
    drawText(guiGraphics: GuiGraphics, text: string, x: number, y: number, color: number): void;
    drawText(guiGraphics: GuiGraphics, text: FormattedText, x: number, y: number, color: number): void;
    drawText(guiGraphics: GuiGraphics, text: FormattedCharSequence, x: number, y: number, color: number): void;
    static fill(guiGraphics: GuiGraphics, minX: number, minY: number, maxX: number, maxY: number, color: number): void;
    static fill(guiGraphics: GuiGraphics, renderType: RenderType, minX: number, minY: number, maxX: number, maxY: number, color: number): void;
    static font(): Font;
    humanReadableNumber(number: number, unit: string, milli: boolean): string;
    humanReadableNumber(number: number, unit: string, milli: boolean, formatter: Format): string;
    opacity(): number;
    stripColor(component: Component): MutableComponent;
  }


  class OverlayRenderer {
    static readonly rect: TooltipRect;
    static ticks: number;
    static shown: boolean;
    static alpha: number;
    static clearState(): void;
    static renderOverlay(root: BoxElement, guiGraphics: GuiGraphics): void;
    static renderOverlay478757(guiGraphics: GuiGraphics, delta: number): void;
    static shouldShow(): boolean;
    static shouldShowImmediately(box: BoxElement): boolean;
  }


  class RayTracing {
    static readonly INSTANCE: RayTracing;
    static ENTITY_FILTER: Predicate;
    fire(): void;
    get icon(): IElement;
    get target(): HitResult;
    static getEntityHitResult(worldIn: Level, projectile: Entity, startVec: Vec3, endVec: Vec3, boundingBox: AABB, filter: Predicate<Entity>): EntityHitResult;
    static isEmptyElement(element: IElement): boolean;
    rayTrace(entity: Entity, blockReach: number, entityReach: number): HitResult;
    static wrapBlock(level: BlockGetter, hit: BlockHitResult, context: CollisionContext): BlockState;
  }


  class WailaTickHandler {
    rootElement: BoxElement;
    progressTracker: ProgressTracker;
    static clearLastNarration(): void;
    static instance(): WailaTickHandler;
    static narrate(tooltip: ITooltip, dedupe: boolean): void;
    tickClient(): void;
  }

}

declare module 'snownee.jade.track' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Class } from 'java.lang';
  import { Supplier } from 'java.util.function';

  interface HealthTrackInfo extends TrackInfo {}
  class HealthTrackInfo extends TrackInfo {
    constructor(health: number);
    get lastHealth(): number;
    isBlinking(): boolean;
    setHealth(health: number): void;
    tick(): void;
    update(pTicks: number): void;
  }


  class ProgressTracker {
    clear(): void;
    getOrCreate<T extends TrackInfo>(tag: ResourceLocation, type: Class<T>, supplier: Supplier<T>): T;
    tick(): void;
  }


  interface ProgressTrackInfo extends TrackInfo {}
  class ProgressTrackInfo extends TrackInfo {
    constructor(canDecrease: boolean, progress: number, width: number);
    get smoothProgress(): number;
    get width(): number;
    setExpectedWidth(expectedWidth: number): void;
    setProgress(progress: number): void;
    tick(): void;
    update(pTicks: number): void;
  }


  class TrackInfo {
    tick(): void;
    update(var1: number): void;
  }

}

declare module 'snownee.jade.util' {
  import { Optional, List, Collection, UUID } from 'java.util';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { RegisterClientCommandsEvent } from 'net.neoforged.neoforge.client.event';
  import { KeyMapping, Minecraft } from 'net.minecraft.client';
  import { BlockAccessor, IServerDataProvider, EntityAccessor, Accessor, ITooltip, IJadeProvider } from 'snownee.jade.api';
  import { IElement } from 'snownee.jade.api.ui';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { ResourceManagerReloadListener, ResourceManager } from 'net.minecraft.server.packs.resources';
  import { Rect2i } from 'net.minecraft.client.renderer';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { JadeFluidObject } from 'snownee.jade.api.fluid';
  import { BiConsumer, Function, Supplier, Consumer } from 'java.util.function';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { Integer, Boolean, Float, Runnable, Throwable } from 'java.lang';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Key } from 'InputConstants';
  import { GameType, Level } from 'net.minecraft.world.level';
  import { ClientViewGroup, ViewGroup, IClientExtensionProvider, IServerExtensionProvider } from 'snownee.jade.api.view';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { Entry } from 'Map';
  import { BlockCapability, EntityCapability } from 'net.neoforged.neoforge.capabilities';
  import { LootItemCondition } from 'net.minecraft.world.level.storage.loot.predicates';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { File } from 'java.io';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BlockPos, RegistryAccess, Registry } from 'net.minecraft.core';
  import { ItemCollector, ItemIterator } from 'snownee.jade.addon.universal';
  import { Cache } from 'com.google.common.cache';
  import { Container } from 'net.minecraft.world';
  import { IItemHandler } from 'net.neoforged.neoforge.items';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Block } from 'net.minecraft.world.level.block';
  import { EntityType, Entity } from 'net.minecraft.world.entity';
  import { BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { MutableComponent, Component } from 'net.minecraft.network.chat';
  import { VillagerProfession } from 'net.minecraft.world.entity.npc';
  import { BlockHitResult, EntityHitResult } from 'net.minecraft.world.phys';
  import { FluidStack } from 'net.neoforged.neoforge.fluids';
  import { WrappedHierarchyLookup } from 'snownee.jade.impl.lookup';
  import { Codec, MapDecoder, MapEncoder } from 'com.mojang.serialization';
  import { IgnoreList } from 'snownee.jade.api.config';
  import { GlyphInfo } from 'com.mojang.blaze3d.font';
  import { IFluidHandler } from 'net.neoforged.neoforge.fluids.capability';
  import { FluidCollectingResult } from 'snownee.jade.util.JadeForgeUtils';
  import { Gson } from 'com.google.gson';

  class ClientProxy {
    static hasJEI: boolean;
    static hasREI: boolean;
    static hasFastScroll: boolean;
    static hasAccessibilityMod: boolean;
    static elementFromLiquid(blockState: BlockState): IElement;
    static get bossBarRect(): Rect2i;
    static get gameMode(): GameType;
    static getBoundKeyOf(keyMapping: KeyMapping): Key;
    static getFluidSpriteAndColor(fluid: JadeFluidObject, consumer: BiConsumer<TextureAtlasSprite, number>): void;
    static getModName(namespace: string): Optional<string>;
    static hasAccessibilityMod(): boolean;
    static init(modBus: IEventBus): void;
    static isShowDetailsPressed(): boolean;
    static mapToClientGroups<IN, OUT>(accessor: Accessor<any>, key: ResourceLocation, codec: StreamCodec<RegistryFriendlyByteBuf, Entry<ResourceLocation, ViewGroup<IN>[]>>, mapper: Function<ResourceLocation, IClientExtensionProvider<IN, OUT>>, tooltip: ITooltip): ClientViewGroup<OUT>[];
    static onRenderTick(guiGraphics: GuiGraphics, tickDelta: number): void;
    static registerCommands(event: RegisterClientCommandsEvent): void;
    static registerDetailsKeyBinding(): KeyMapping;
    static registerKeyBinding(desc: string, defaultKey: number): KeyMapping;
    static registerReloadListener(listener: ResourceManagerReloadListener): void;
    static renderItemDecorationsExtra(guiGraphics: GuiGraphics, font: Font, stack: ItemStack, x: number, y: number, text: string): void;
    static requestBlockData(accessor: BlockAccessor, providers: IServerDataProvider<BlockAccessor>[]): void;
    static requestEntityData(accessor: EntityAccessor, providers: IServerDataProvider<EntityAccessor>[]): void;
    static shouldRegisterRecipeViewerKeys(): boolean;
    static shouldShowAfterGui(mc: Minecraft, screen: Screen): boolean;
    static shouldShowBeforeGui(mc: Minecraft, screen: Screen): boolean;
    static shouldShowWithGui(mc: Minecraft, screen: Screen): boolean;
  }


  class CommonProxy {
    constructor(modBus: IEventBus);
    static blockVolume(): number;
    static bucketVolume(): number;
    static containerGroup(container: Container, accessor: Accessor<any>): ViewGroup<ItemStack>[];
    static containerGroup(container: Container, accessor: Accessor<any>, containerFinder: Function<Accessor<any>, Container>): ViewGroup<ItemStack>[];
    static createItemCollector(accessor: Accessor<any>, containerCache: Cache<any, ItemCollector<any>>): ItemCollector<any>;
    static findContainer(accessor: Accessor<any>): Container;
    static findItemHandler(accessor: Accessor<any>): IItemHandler;
    static get configDirectory(): File;
    static get platformIdentifier(): string;
    static getBlockPickedResult(state: BlockState, player: Player, hitResult: BlockHitResult): ItemStack;
    static getDefaultStorage<T>(accessor: Accessor<any>, blockCapability: BlockCapability<T, any>, entityCapability: EntityCapability<T, any>): T;
    static getEnchantPowerBonus(state: BlockState, world: Level, pos: BlockPos): number;
    static getEntityPickedResult(entity: Entity, player: Player, hitResult: EntityHitResult): ItemStack;
    static getFluidName(fluid: JadeFluidObject): Component;
    static getId(block: Block): ResourceLocation;
    static getId(entityType: EntityType<any>): ResourceLocation;
    static getId(blockEntityType: BlockEntityType<any>): ResourceLocation;
    static getLastKnownUsername(uuid: UUID): string;
    static getModIdFromItem(stack: ItemStack): string;
    static getPartEntity(parent: Entity, index: number): Entity;
    static getPartEntityIndex(entity: Entity): number;
    static getProfessionName(profession: VillagerProfession): MutableComponent;
    static getServerExtensionData<T>(accessor: Accessor<any>, lookup: WrappedHierarchyLookup<IServerExtensionProvider<T>>): Entry<ResourceLocation, ViewGroup<T>[]>;
    static hasDefaultEnergyStorage(accessor: Accessor<any>): boolean;
    static hasDefaultFluidStorage(accessor: Accessor<any>): boolean;
    static hasDefaultItemStorage(accessor: Accessor<any>): boolean;
    static hasDefaultStorage<T>(accessor: Accessor<any>, blockCapability: BlockCapability<T, any>, entityCapability: EntityCapability<T, any>): boolean;
    static isBoss(entity: Entity): boolean;
    static isCorrectConditions(conditions: LootItemCondition[], toolItem: ItemStack): boolean;
    static isCorrectToolForDrops(state: BlockState, player: Player, level: Level, pos: BlockPos): boolean;
    static isDevEnv(): boolean;
    static isModLoaded(modid: string): boolean;
    static isMultipartEntity(target: Entity): boolean;
    static isPhysicallyClient(): boolean;
    static registerTagsUpdatedListener(listener: BiConsumer<RegistryAccess, boolean>): void;
    static showOrHideFromServer(players: Collection<ServerPlayer>, show: boolean): number;
    static storageGroup(storage: any, accessor: Accessor<any>): ViewGroup<ItemStack>[];
    static storageGroup(storage: any, accessor: Accessor<any>, storageFinder: Function<Accessor<any>, any>): ViewGroup<ItemStack>[];
    static toFluidStack(fluid: JadeFluidObject): FluidStack;
    static wrapEnergyStorage(accessor: Accessor<any>): ViewGroup<CompoundTag>[];
    static wrapFluidStorage(accessor: Accessor<any>): ViewGroup<CompoundTag>[];
    static wrapPartEntityParent(target: Entity): Entity;
  }


  class DumpGenerator {
    static generateInfoDump(): string;
  }


  class FluidTextHelper {
    static getUnicodeMillibuckets(amount: number, simplify: boolean): string;
  }


  class JadeCodecs {
    static readonly TEXT_SETTING: Codec;
    static readonly THEME: Codec;
    static readonly OPTIONAL_INT: Codec;
    static createFromEmptyMap<T>(codec: Codec<T>): T;
    static floatArrayCodec(size: number, codec: Codec<number>): Codec<number[]>;
    static ignoreList<T>(registryKey: ResourceKey<Registry<T>>): Codec<IgnoreList<T>>;
    static intArrayCodec(size: number, codec: Codec<number>): Codec<number[]>;
    static nullableClone(array: number[]): Optional<number[]>;
    static nullableClone(array: number[]): Optional<number[]>;
  }


  interface JadeFont extends Font {}
  class JadeFont extends Font {
    constructor(font: Font);
    static isTooLarge(glyphInfo: GlyphInfo, lineHeight: number): boolean;
  }


  class JadeForgeUtils {
    static fromFluidHandler(fluidHandler: IFluidHandler): ViewGroup<CompoundTag>[];
    static fromFluidHandlerStream(fluidHandler: IFluidHandler): FluidCollectingResult;
    static fromFluidStack(fluidStack: FluidStack): JadeFluidObject;
    static fromItemHandler(storage: IItemHandler, fromIndex: number): ItemIterator<IItemHandler>;
    static fromItemHandler(storage: IItemHandler, fromIndex: number, containerFinder: Function<Accessor<any>, IItemHandler>): ItemIterator<IItemHandler>;
  }


  class JsonConfig<T = any> {
    static readonly GSON: Gson;
    constructor(fileName: string, codec: Codec<T>, onUpdate: Runnable, defaultFactory: Supplier<T>);

    constructor(fileName: string, codec: Codec<T>, onUpdate: Runnable);
    get (): T;
    get file(): File;
    invalidate(): void;
    save(): void;
    write(t: T, invalidate: boolean): void;
  }


  interface ModIdentification extends ResourceManagerReloadListener {}
  class ModIdentification extends ResourceManagerReloadListener {
    static readonly INSTANCE: ModIdentification;
    static getModName(namespace: string): Optional<string>;
    static getModName(id: ResourceLocation): string;
    static getModName(block: Block): string;
    static getModName(stack: ItemStack): string;
    static getModName(entity: Entity): string;
    static invalidateCache(): void;
    onResourceManagerReload(manager: ResourceManager): void;
  }


  class ServerDataUtil {
    static read<T>(data: CompoundTag, codec: MapDecoder<T>): Optional<T>;
    static write<T>(data: CompoundTag, codec: MapEncoder<T>, value: T): void;
  }


  class SmoothChasingValue {
    value: number;
    get speed(): number;
    getTarget(): number;
    isMoving(): boolean;
    set(value: number): SmoothChasingValue;
    start(value: number): SmoothChasingValue;
    target(target: number): SmoothChasingValue;
    tick(pTicks: number): void;
    withSpeed(speed: number): SmoothChasingValue;
  }


  class WailaExceptionHandler {
    static handleErr(e: Throwable, provider: IJadeProvider, tooltip: Consumer<Component>): void;
  }

}

declare module 'snownee.jade.util.JadeForgeUtils' {
  import { Stream } from 'java.util.stream';

  class FluidCollectingResult {
    stream: Stream;
    emptyCapacity: number;
    tanks: number;
    emptyTanks: number;
  }

}

declare module 'snownee.jade.util.JsonConfig' {
  import { Supplier } from 'java.util.function';

  class CachedSupplier<T = any> {
    constructor(supplier: Supplier<T>);
    get (): T;
    invalidate(): void;
  }

}