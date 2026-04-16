declare module 'snownee.jade.addon.create' {
  import { Enum } from 'java.lang';
  import { ITooltip, BlockAccessor, EntityAccessor, Accessor, IWailaPlugin, IWailaCommonRegistration, IWailaClientRegistration, IBlockComponentProvider } from 'snownee.jade.api';
  import { IPluginConfig } from 'snownee.jade.api.config';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List } from 'java.util';
  import { IElement } from 'snownee.jade.api.ui';
  import { Entity } from 'net.minecraft.world.entity';
  import { ClientViewGroup, FluidView, ViewGroup, ItemView } from 'snownee.jade.api.view';
  import { ItemStack } from 'net.minecraft.world.item';
  import { HitResult } from 'net.minecraft.world.phys';

  interface BacktankProvider extends Enum<BacktankProvider> {}
  class BacktankProvider extends Enum<BacktankProvider> {
    static readonly INSTANCE: BacktankProvider;
    appendServerData(data: CompoundTag, accessor: BlockAccessor): void;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    static valueOf(name: string): BacktankProvider;
    static values(): BacktankProvider[];
  }


  interface BlazeBurnerProvider extends Enum<BlazeBurnerProvider> {}
  class BlazeBurnerProvider extends Enum<BlazeBurnerProvider> {
    static readonly INSTANCE: BlazeBurnerProvider;
    appendServerData(data: CompoundTag, accessor: BlockAccessor): void;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    static valueOf(name: string): BlazeBurnerProvider;
    static values(): BlazeBurnerProvider[];
  }


  interface ContraptionExactBlockProvider extends Enum<ContraptionExactBlockProvider> {}
  class ContraptionExactBlockProvider extends Enum<ContraptionExactBlockProvider> {
    static readonly INSTANCE: ContraptionExactBlockProvider;
    appendTooltip(tooltip: ITooltip, accessor: EntityAccessor, config: IPluginConfig): void;
    get defaultPriority(): number;
    get uid(): ResourceLocation;
    getIcon(accessor: EntityAccessor, config: IPluginConfig, currentIcon: IElement): IElement;
    setHit(entity: Entity, accessor: Accessor<any>): void;
    static valueOf(name: string): ContraptionExactBlockProvider;
    static values(): ContraptionExactBlockProvider[];
  }


  interface ContraptionFluidStorageProvider extends Enum<ContraptionFluidStorageProvider> {}
  class ContraptionFluidStorageProvider extends Enum<ContraptionFluidStorageProvider> {
    static readonly INSTANCE: ContraptionFluidStorageProvider;
    get uid(): ResourceLocation;
    getClientGroups(accessor: Accessor<any>, groups: ViewGroup<CompoundTag>[]): ClientViewGroup<FluidView>[];
    getGroups(accessor: Accessor<any>): ViewGroup<CompoundTag>[];
    static valueOf(name: string): ContraptionFluidStorageProvider;
    static values(): ContraptionFluidStorageProvider[];
  }


  interface ContraptionItemStorageProvider extends Enum<ContraptionItemStorageProvider> {}
  class ContraptionItemStorageProvider extends Enum<ContraptionItemStorageProvider> {
    static readonly INSTANCE: ContraptionItemStorageProvider;
    get uid(): ResourceLocation;
    getClientGroups(accessor: Accessor<any>, groups: ViewGroup<ItemStack>[]): ClientViewGroup<ItemView>[];
    getGroups(accessor: Accessor<any>): ViewGroup<ItemStack>[];
    static valueOf(name: string): ContraptionItemStorageProvider;
    static values(): ContraptionItemStorageProvider[];
  }


  interface CraftingBlueprintProvider extends Enum<CraftingBlueprintProvider> {}
  class CraftingBlueprintProvider extends Enum<CraftingBlueprintProvider> {
    static readonly INSTANCE: CraftingBlueprintProvider;
    appendTooltip(tooltip: ITooltip, accessor: EntityAccessor, config: IPluginConfig): void;
    static get results(): ItemStack[];
    get uid(): ResourceLocation;
    getClientGroups(accessor: Accessor<any>, groups: ViewGroup<ItemStack>[]): ClientViewGroup<ItemView>[];
    getGroups(accessor: Accessor<any>): ViewGroup<ItemStack>[];
    isRequired(): boolean;
    static valueOf(name: string): CraftingBlueprintProvider;
    static values(): CraftingBlueprintProvider[];
  }


  interface CreatePlugin extends IWailaPlugin {}
  class CreatePlugin extends IWailaPlugin {
    static readonly ID: string;
    static readonly CRAFTING_BLUEPRINT: ResourceLocation;
    static readonly PLACARD: ResourceLocation;
    static readonly BLAZE_BURNER: ResourceLocation;
    static readonly CONTRAPTION_INVENTORY: ResourceLocation;
    static readonly CONTRAPTION_EXACT_BLOCK: ResourceLocation;
    static readonly FILTER: ResourceLocation;
    static readonly HIDE_BOILER_TANKS: ResourceLocation;
    static readonly BACKTANK_CAPACITY: ResourceLocation;
    static readonly GOGGLES: ResourceLocation;
    static readonly REQUIRES_GOGGLES: ResourceLocation;
    static readonly GOGGLES_DETAILED: ResourceLocation;
    static readonly PACKAGE: ResourceLocation;
    static readonly TABLE_CLOTH: ResourceLocation;
    override(hitResult: HitResult, accessor: Accessor<any>, originalAccessor: Accessor<any>): Accessor<any>;
    register(registration: IWailaCommonRegistration): void;
    registerClient(registration: IWailaClientRegistration): void;
  }


  interface FilterProvider extends Enum<FilterProvider> {}
  class FilterProvider extends Enum<FilterProvider> {
    static readonly INSTANCE: FilterProvider;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    static valueOf(name: string): FilterProvider;
    static values(): FilterProvider[];
  }


  interface GogglesProvider extends IBlockComponentProvider {}
  class GogglesProvider extends IBlockComponentProvider {
    constructor();
    appendTooltip(tooltip1: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    enabledByDefault(): boolean;
    get uid(): ResourceLocation;
  }


  interface HideBoilerHandlerProvider extends Enum<HideBoilerHandlerProvider> {}
  class HideBoilerHandlerProvider extends Enum<HideBoilerHandlerProvider> {
    static readonly INSTANCE: HideBoilerHandlerProvider;
    get uid(): ResourceLocation;
    getClientGroups(accessor: Accessor<any>, groups: ViewGroup<CompoundTag>[]): ClientViewGroup<FluidView>[];
    getGroups(accessor: Accessor<any>): ViewGroup<CompoundTag>[];
    static valueOf(name: string): HideBoilerHandlerProvider;
    static values(): HideBoilerHandlerProvider[];
  }


  interface PackageProvider extends Enum<PackageProvider> {}
  class PackageProvider extends Enum<PackageProvider> {
    static readonly INSTANCE: PackageProvider;
    get uid(): ResourceLocation;
    getClientGroups(accessor: Accessor<any>, list: ViewGroup<ItemStack>[]): ClientViewGroup<ItemView>[];
    getGroups(accessor: Accessor<any>): ViewGroup<ItemStack>[];
    static valueOf(name: string): PackageProvider;
    static values(): PackageProvider[];
  }


  interface PlacardProvider extends Enum<PlacardProvider> {}
  class PlacardProvider extends Enum<PlacardProvider> {
    static readonly INSTANCE: PlacardProvider;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    get uid(): ResourceLocation;
    getIcon(accessor: BlockAccessor, config: IPluginConfig, currentIcon: IElement): IElement;
    static valueOf(name: string): PlacardProvider;
    static values(): PlacardProvider[];
  }


  interface TableClothProvider extends Enum<TableClothProvider> {}
  class TableClothProvider extends Enum<TableClothProvider> {
    static readonly INSTANCE: TableClothProvider;
    get uid(): ResourceLocation;
    getClientGroups(accessor: Accessor<any>, list: ViewGroup<ItemStack>[]): ClientViewGroup<ItemView>[];
    getGroups(accessor: Accessor<any>): ViewGroup<ItemStack>[];
    static valueOf(name: string): TableClothProvider;
    static values(): TableClothProvider[];
  }

}

declare module 'snownee.jade.addon.enderio' {
  import { IWailaPlugin, IWailaClientRegistration } from 'snownee.jade.api';

  interface EnderIOPlugin extends IWailaPlugin {}
  class EnderIOPlugin extends IWailaPlugin {
    static readonly ID: string;
    registerClient(registration: IWailaClientRegistration): void;
  }

}

declare module 'snownee.jade.addon.general' {
  import { IWailaPlugin, IWailaClientRegistration, Accessor } from 'snownee.jade.api';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { BiPredicate } from 'java.util.function';
  import { TagKey } from 'net.minecraft.tags';
  import { SimpleJsonResourceReloadListener } from 'net.minecraft.server.packs.resources';
  import { JadeRayTraceCallback, JadeTooltipCollectedCallback } from 'snownee.jade.api.callback';
  import { HitResult } from 'net.minecraft.world.phys';
  import { IBoxElement } from 'snownee.jade.api.ui';

  interface GeneralPlugin extends IWailaPlugin {}
  class GeneralPlugin extends IWailaPlugin {
    static readonly ID: string;
    static readonly EQUIPMENT_REQUIREMENT: ResourceLocation;
    static EQUIPMENT_CHECK_PREDICATE: BiPredicate;
    requirementTag: TagKey;
    registerClient(registration: IWailaClientRegistration): void;
  }


  interface TargetModifierLoader extends JadeRayTraceCallback, JadeTooltipCollectedCallback, SimpleJsonResourceReloadListener {}
  class TargetModifierLoader extends JadeRayTraceCallback {
    constructor();
    static getTargetIdentifier(accessor: Accessor<any>): any;
    onRayTrace(hitResult: HitResult, accessor: Accessor<any>, originalAccessor: Accessor<any>): Accessor<any>;
    onTooltipCollected(rootElement: IBoxElement, accessor: Accessor<any>): void;
    reload(): void;
  }

}

declare module 'snownee.jade.addon' {
  import { Logger } from 'org.slf4j';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { IWailaPlugin, IWailaClientRegistration, IWailaCommonRegistration } from 'snownee.jade.api';
  import { Map } from 'java.util';

  class JadeAddons {
    static readonly ID: string;
    static readonly NAME: string;
    static readonly LOGGER: Logger;
    constructor(eventBus: IEventBus);
    static seconds(sec: number): MutableComponent;
  }


  interface JadeAddonsBase extends IWailaPlugin {}
  class JadeAddonsBase extends IWailaPlugin {
    static readonly PLUGIN_LOADERS: Map;
    static client: IWailaClientRegistration;
    constructor();
    register(registration: IWailaCommonRegistration): void;
    registerClient(registration: IWailaClientRegistration): void;
  }


  class JadeAddonsClient {
    static init(): void;
  }

}

declare module 'snownee.jade.addon.lootr' {
  import { Enum } from 'java.lang';
  import { ITooltip, BlockAccessor, EntityAccessor, StreamServerDataProvider, Accessor, IWailaPlugin, IWailaCommonRegistration, IWailaClientRegistration } from 'snownee.jade.api';
  import { IPluginConfig } from 'snownee.jade.api.config';
  import { List } from 'java.util';
  import { Data } from 'snownee.jade.addon.lootr.LootrInfoProvider';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ClientViewGroup, ItemView, ViewGroup } from 'snownee.jade.api.view';
  import { ItemStack } from 'net.minecraft.world.item';

  interface LootrBlockInfoProvider extends Enum<LootrBlockInfoProvider> {}
  class LootrBlockInfoProvider extends Enum<LootrBlockInfoProvider> {
    static readonly INSTANCE: LootrBlockInfoProvider;
    appendTooltip(tooltip: ITooltip, accessor: BlockAccessor, config: IPluginConfig): void;
    static valueOf(name: string): LootrBlockInfoProvider;
    static values(): LootrBlockInfoProvider[];
  }


  interface LootrEntityInfoProvider extends Enum<LootrEntityInfoProvider> {}
  class LootrEntityInfoProvider extends Enum<LootrEntityInfoProvider> {
    static readonly INSTANCE: LootrEntityInfoProvider;
    appendTooltip(tooltip: ITooltip, accessor: EntityAccessor, config: IPluginConfig): void;
    static valueOf(name: string): LootrEntityInfoProvider;
    static values(): LootrEntityInfoProvider[];
  }


  interface LootrInfoProvider<A extends Accessor<any> = any> extends StreamServerDataProvider<A, Data> {}
  class LootrInfoProvider<A extends Accessor<any> = any> extends StreamServerDataProvider<A, Data> {
    appendTooltip(tooltip: ITooltip, accessor: A): void;
    get uid(): ResourceLocation;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, Data>;
    streamData(accessor: A): Data;
  }


  interface LootrInventoryProvider extends Enum<LootrInventoryProvider> {}
  class LootrInventoryProvider extends Enum<LootrInventoryProvider> {
    static readonly INSTANCE: LootrInventoryProvider;
    get uid(): ResourceLocation;
    getClientGroups(accessor: Accessor<any>, groups: ViewGroup<ItemStack>[]): ClientViewGroup<ItemView>[];
    getGroups(accessor: Accessor<any>): ViewGroup<ItemStack>[];
    static valueOf(name: string): LootrInventoryProvider;
    static values(): LootrInventoryProvider[];
  }


  interface LootrPlugin extends IWailaPlugin {}
  class LootrPlugin extends IWailaPlugin {
    static readonly ID: string;
    static readonly INFO: ResourceLocation;
    static readonly INVENTORY: ResourceLocation;
    register(registration: IWailaCommonRegistration): void;
    registerClient(registration: IWailaClientRegistration): void;
  }

}

declare module 'snownee.jade.addon.mixin.create' {
  import { List } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Component } from 'net.minecraft.network.chat';

  class BacktankBlockEntityAccess {
    get capacityEnchantLevel(): number;
  }


  class BlueprintOverlayRendererAccess {
    static getResults(): ItemStack[];
  }


  class FilterItemAccess {
    callMakeSummary(var1: ItemStack): Component[];
  }

}