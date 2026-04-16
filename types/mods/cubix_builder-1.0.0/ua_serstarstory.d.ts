declare module 'ua.serstarstory.cb' {
  import { Items } from 'DeferredRegister';
  import { DeferredItem } from 'net.neoforged.neoforge.registries';
  import { ItemBuilderWandBase } from 'ua.serstarstory.cb.items';
  import { Companion } from 'ua.serstarstory.cb.CubixBuilder';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';

  class AEItemsRegistry {
    static readonly INSTANCE: AEItemsRegistry;
    get aE_ADVANCED_WAND(): DeferredItem<ItemBuilderWandBase>;
    get aE_BASE_WAND(): DeferredItem<ItemBuilderWandBase>;
    get aE_HYBRID_WAND(): DeferredItem<ItemBuilderWandBase>;
    get aE_ULTIMATE_WAND(): DeferredItem<ItemBuilderWandBase>;
    get iTEMS(): Items;
  }


  class CubixBuilder {
    static readonly Companion: Companion;
    static readonly MODID: string;
    static readonly SERVER: boolean;
    static readonly DEV: boolean;
    constructor(modEventBus: IEventBus, modContainer: ModContainer);
  }


  class CubixBuilderClient {
    constructor(modEventBus: IEventBus, modContainer: ModContainer);
  }


  class ItemsRegistry {
    static readonly INSTANCE: ItemsRegistry;
    get aDVANCED_WAND(): DeferredItem<ItemBuilderWandBase>;
    get bASE_WAND(): DeferredItem<ItemBuilderWandBase>;
    get hYBRID_WAND(): DeferredItem<ItemBuilderWandBase>;
    get iTEMS(): Items;
    get uLTIMATE_WAND(): DeferredItem<ItemBuilderWandBase>;
  }

}

declare module 'ua.serstarstory.cb.client' {
  import { RegisterMenuScreensEvent } from 'net.neoforged.neoforge.client.event';
  import { Block } from 'RenderHighlightEvent';
  import { IEventBus } from 'net.neoforged.bus.api';

  class ClientEventHandler {
    static readonly INSTANCE: ClientEventHandler;
    onBlockHighlight(event: Block): void;
    onRegisterScreens(event: RegisterMenuScreensEvent): void;
  }


  class ClientInit {
    static readonly INSTANCE: ClientInit;
    register(modEventBus: IEventBus): void;
  }

}

declare module 'ua.serstarstory.cb.client.gui' {
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { ContainerBuilderWandAEItem, ContainerBuilderWandItem } from 'ua.serstarstory.cb.container';
  import { Companion } from 'ua.serstarstory.cb.client.gui.GuiBuilderWandAEItem';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Companion as ua_serstarstory_cb_client_gui_guibuilderwanditem_Companion } from 'ua.serstarstory.cb.client.gui.GuiBuilderWandItem';

  interface GuiBuilderWandAEItem extends AbstractContainerScreen<ContainerBuilderWandAEItem> {}
  class GuiBuilderWandAEItem extends AbstractContainerScreen<ContainerBuilderWandAEItem> {
    static readonly Companion: Companion;
    constructor(container: ContainerBuilderWandAEItem, inventory: Inventory, title: Component);
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface GuiBuilderWandItem extends AbstractContainerScreen<ContainerBuilderWandItem> {}
  class GuiBuilderWandItem extends AbstractContainerScreen<ContainerBuilderWandItem> {
    static readonly Companion: ua_serstarstory_cb_client_gui_guibuilderwanditem_Companion;
    constructor(container: ContainerBuilderWandItem, inventory: Inventory, title: Component);
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }

}

declare module 'ua.serstarstory.cb.client.gui.GuiBuilderWandAEItem' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
  }

}

declare module 'ua.serstarstory.cb.client.gui.GuiBuilderWandItem' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
  }

}

declare module 'ua.serstarstory.cb.config' {
  import { ModConfigSpec } from 'net.neoforged.neoforge.common';

  class CubixBuilderConfig {
    static readonly INSTANCE: CubixBuilderConfig;
    get sPEC(): ModConfigSpec;
  }

}

declare module 'ua.serstarstory.cb.config.CubixBuilderConfig' {
  import { AEWandConfig, WandConfig } from 'ua.serstarstory.cb.config.data';
  import { ConfigValue } from 'ModConfigSpec';
  import { List } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';

  class AEWand {
    static readonly INSTANCE: AEWand;
    static base: AEWandConfig;
    static advanced: AEWandConfig;
    static hybrid: AEWandConfig;
    static ultimate: AEWandConfig;
    get advanced(): AEWandConfig;
    get base(): AEWandConfig;
    get hybrid(): AEWandConfig;
    get ultimate(): AEWandConfig;
    set advanced(aEWandConfig: AEWandConfig);
    set base(aEWandConfig: AEWandConfig);
    set hybrid(aEWandConfig: AEWandConfig);
    set ultimate(aEWandConfig: AEWandConfig);
  }


  class General {
    static readonly INSTANCE: General;
    static blacklist: ConfigValue;
    get blacklist(): ConfigValue<string[]>;
    isBlackListed(stack: ItemStack): boolean;
    set blacklist(configValue: ConfigValue<string[]>);
  }


  class Wand {
    static readonly INSTANCE: Wand;
    static base: WandConfig;
    static advanced: WandConfig;
    static hybrid: WandConfig;
    static ultimate: WandConfig;
    get advanced(): WandConfig;
    get base(): WandConfig;
    get hybrid(): WandConfig;
    get ultimate(): WandConfig;
    set advanced(wandConfig: WandConfig);
    set base(wandConfig: WandConfig);
    set hybrid(wandConfig: WandConfig);
    set ultimate(wandConfig: WandConfig);
  }

}

declare module 'ua.serstarstory.cb.config.data' {
  import { IntValue, LongValue } from 'ModConfigSpec';

  class AEWandConfig {
    constructor(maxBlocks: IntValue, maxBytes: LongValue);
    component1(): IntValue;
    component2(): LongValue;
    copy(maxBlocks: IntValue, maxBytes: LongValue): AEWandConfig;
    static copy$default(aEWandConfig: AEWandConfig, intValue: IntValue, longValue: LongValue, n: number, object: any): AEWandConfig;
    equals(other: any): boolean;
    get maxBlocks(): IntValue;
    get maxBytes(): LongValue;
    hashCode(): number;
    toString(): string;
  }


  class WandConfig {
    constructor(maxBlocks: IntValue, maxStored: IntValue);
    component1(): IntValue;
    component2(): IntValue;
    copy(maxBlocks: IntValue, maxStored: IntValue): WandConfig;
    static copy$default(wandConfig: WandConfig, intValue: IntValue, intValue2: IntValue, n: number, object: any): WandConfig;
    equals(other: any): boolean;
    get maxBlocks(): IntValue;
    get maxStored(): IntValue;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'ua.serstarstory.cb.container' {
  import { DeferredRegister, DeferredHolder } from 'net.neoforged.neoforge.registries';
  import { MenuType } from 'net.minecraft.world.inventory';

  class ContainersRegistry {
    static readonly INSTANCE: ContainersRegistry;
    get aE_BUILDER_WAND(): DeferredHolder<MenuType<any>, MenuType<ContainerBuilderWandAEItem>>;
    get bUILDER_WAND(): DeferredHolder<MenuType<any>, MenuType<ContainerBuilderWandItem>>;
    get cONTAINERS(): DeferredRegister<MenuType<any>>;
  }

}

declare module 'ua.serstarstory.cb.container.slots' {
  import { Slot } from 'net.minecraft.world.inventory';
  import { Container } from 'net.minecraft.world';
  import { ItemStack } from 'net.minecraft.world.item';

  interface SlotInvValid extends Slot {}
  class SlotInvValid extends Slot {
    constructor(inv: Container, id: number, x: number, y: number);
    mayPlace(stack: ItemStack): boolean;
  }


  interface SlotWand extends Slot {}
  class SlotWand extends Slot {
    constructor(inv: Container, id: number, x: number, y: number);
    mayPlace(stack: ItemStack): boolean;
  }

}

declare module 'ua.serstarstory.cb.CubixBuilder' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { DeferredRegister } from 'net.neoforged.neoforge.registries';
  import { CreativeModeTab } from 'net.minecraft.world.item';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get cREATIVE_MODE_TABS(): DeferredRegister<CreativeModeTab>;
  }

}

declare module 'ua.serstarstory.cb.ext' {
  import { Function0 } from 'kotlin.jvm.functions';
  import { Unit } from 'kotlin';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ItemStack } from 'net.minecraft.world.item';

  class SideUtilsKt {
    static runClient(block: Function0<Unit>): void;
    static runClientValue<T>(serverValue: T, block: Function0<T>): T;
    static runClientValue<T>(block: Function0<T>): T;
    static runServer(block: Function0<Unit>): void;
    static runServerValue<T>(clientValue: T, block: Function0<T>): T;
    static runServerValue<T>(block: Function0<T>): T;
  }


  class UtilsKt {
    static ifEmpty($this$ifEmpty: ItemStack, block: Function0<Unit>): ItemStack;
    static isSameItemPrecise($this$isSameItemPrecise: ItemStack, other: ItemStack): boolean;
    static resource($this$resource: string): ResourceLocation;
  }

}

declare module 'ua.serstarstory.cb.hack' {
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockItem } from 'net.minecraft.world.item';
  import { BlockPlaceContext, UseOnContext } from 'net.minecraft.world.item.context';
  import { BlockHitResult } from 'net.minecraft.world.phys';

  class BlockItemCBHack {
    static readonly INSTANCE: BlockItemCBHack;
    getBlockToPlace(item: BlockItem, context: BlockPlaceContext): BlockState;
  }


  class ItemUseContextCBHack {
    static readonly INSTANCE: ItemUseContextCBHack;
    getRayTraceResult(context: UseOnContext): BlockHitResult;
  }

}

declare module 'ua.serstarstory.cb.items' {
  import { Companion } from 'ua.serstarstory.cb.items.ItemBuilderWandAE';
  import { Properties } from 'Item';
  import { AEWandConfig } from 'ua.serstarstory.cb.config.data';
  import { InteractionResultHolder, InteractionHand } from 'net.minecraft.world';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Provider } from 'HolderLookup';
  import { Enum } from 'java.lang';
  import { EnumEntries } from 'kotlin.enums';

  interface ItemBuilderWandAE extends ItemBuilderWandBase {}
  class ItemBuilderWandAE extends ItemBuilderWandBase {
    static readonly Companion: Companion;
    constructor(properties: Properties, config: AEWandConfig);
    get config(): AEWandConfig;
    getCellStack(wand: ItemStack, registries: Provider): ItemStack;
    getStoredCount(wand: ItemStack): number;
    getStoredStack(wand: ItemStack, registries: Provider): ItemStack;
    isItemValid(wand: ItemStack, stack: ItemStack, registries: Provider): boolean;
    openGui(player: ServerPlayer, hand: InteractionHand): void;
    setCellStack(wand: ItemStack, stack: ItemStack, registries: Provider): void;
    setStoredCount(wand: ItemStack, count: number): void;
    setStoredStack(wand: ItemStack, stack: ItemStack, registries: Provider): void;
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  class PotentialBlock {
    constructor(x: number, y: number, z: number, state: PotentialBlockState);
    component1(): number;
    component2(): number;
    component3(): number;
    component4(): PotentialBlockState;
    copy(x: number, y: number, z: number, state: PotentialBlockState): PotentialBlock;
    static copy$default(potentialBlock: PotentialBlock, n: number, n2: number, n3: number, potentialBlockState: PotentialBlockState, n4: number, object: any): PotentialBlock;
    equals(other: any): boolean;
    get state(): PotentialBlockState;
    get x(): number;
    get y(): number;
    get z(): number;
    hashCode(): number;
    toString(): string;
  }


  interface PotentialBlockState extends Enum<PotentialBlockState> {}
  class PotentialBlockState extends Enum<PotentialBlockState> {
    static readonly ALLOW: PotentialBlockState;
    static readonly DENY: PotentialBlockState;
    get a(): number;
    get b(): number;
    static get entries(): EnumEntries<PotentialBlockState>;
    get g(): number;
    get r(): number;
    static valueOf(value: string): PotentialBlockState;
    static values(): PotentialBlockState[];
  }

}

declare module 'ua.serstarstory.cb.items.ItemBuilderWandAE' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
  }

}

declare module 'ua.serstarstory.cb.network' {
  import { IEventBus } from 'net.neoforged.bus.api';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';

  class CBNetworkManager {
    static readonly INSTANCE: CBNetworkManager;
    register(modEventBus: IEventBus): void;
    sendToServer(packet: CustomPacketPayload): void;
  }

}

declare module 'ua.serstarstory.cb.network.packets' {
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { Companion } from 'ua.serstarstory.cb.network.packets.OpenGuiPacket';
  import { InteractionHand } from 'net.minecraft.world';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { Type } from 'CustomPacketPayload';

  interface OpenGuiPacket extends CustomPacketPayload {}
  class OpenGuiPacket extends CustomPacketPayload {
    static readonly Companion: Companion;
    constructor(hand: InteractionHand);

    constructor(buffer: RegistryFriendlyByteBuf);
    get hand(): InteractionHand;
    type(): Type<OpenGuiPacket>;
  }

}

declare module 'ua.serstarstory.cb.network.packets.OpenGuiPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Type } from 'CustomPacketPayload';
  import { OpenGuiPacket } from 'ua.serstarstory.cb.network.packets';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { IPayloadContext } from 'net.neoforged.neoforge.network.handling';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get sTREAM_CODEC(): StreamCodec<RegistryFriendlyByteBuf, OpenGuiPacket>;
    get tYPE(): Type<OpenGuiPacket>;
    handle(packet: OpenGuiPacket, context: IPayloadContext): void;
  }

}

declare module 'ua.serstarstory.cb.utils' {
  import { StorageCell } from 'appeng.api.storage.cells';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Function0, Function3 } from 'kotlin.jvm.functions';
  import { Unit, Pair } from 'kotlin';
  import { KeyCounter, AEItemKey } from 'appeng.api.stacks';
  import { Long, Integer } from 'java.lang';
  import { CellValidator } from 'ua.serstarstory.cb.utils.AE2Utils';
  import { MenuProvider } from 'net.minecraft.world';
  import { Component } from 'net.minecraft.network.chat';
  import { Inventory, Player } from 'net.minecraft.world.entity.player';
  import { AbstractContainerMenu } from 'net.minecraft.world.inventory';

  class AE2Utils {
    static readonly INSTANCE: AE2Utils;
    getCellInventory(stack: ItemStack, onSave: Function0<Unit>): StorageCell;
    static getCellInventory$default(aE2Utils: AE2Utils, itemStack: ItemStack, function0: Function0, n: number, object: any): StorageCell;
    getSingleStoredItem(cell: StorageCell): Pair<AEItemKey, Long>;
    getStoredStacks(cell: StorageCell): KeyCounter;
    getValidator(maxBytes: number): CellValidator;
  }


  interface OpenBuilderWandContainerContext extends MenuProvider {}
  class OpenBuilderWandContainerContext extends MenuProvider {
    constructor(displayName: Component, factory: Function3<number, Inventory, Player, AbstractContainerMenu>);
    createMenu(id: number, inventory: Inventory, player: Player): AbstractContainerMenu;
    get displayName(): Component;
  }

}

declare module 'ua.serstarstory.cb.utils.AE2Utils' {
  import { ItemStack } from 'net.minecraft.world.item';

  class CellValidator {
    constructor(maxBytes: number);
    isCellValid(stack: ItemStack): boolean;
  }

}