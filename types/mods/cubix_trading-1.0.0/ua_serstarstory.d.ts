declare module 'ua.serstarstory.ct.blocks' {
  import { Companion } from 'ua.serstarstory.ct.blocks.BlockExchanger';
  import { BlockEntity, BlockEntityTicker, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level } from 'net.minecraft.world.level';
  import { TileExchanger } from 'ua.serstarstory.ct.tiles';
  import { Properties } from 'BlockBehaviour';
  import { Companion as ua_serstarstory_ct_blocks_blockmarket_Companion } from 'ua.serstarstory.ct.blocks.BlockMarket';
  import { BaseEntityBlock } from 'net.minecraft.world.level.block';
  import { Companion as ua_serstarstory_ct_blocks_tradingtexturedblock_Companion } from 'ua.serstarstory.ct.blocks.TradingTexturedBlock';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { ItemStack } from 'net.minecraft.world.item';

  interface BlockExchanger extends TradingTexturedBlock {}
  class BlockExchanger extends TradingTexturedBlock {
    static readonly Companion: Companion;
    static CODEC$lambda$0(it: Properties): BlockExchanger;
    getTicker<T extends BlockEntity>(level: Level, state: BlockState, blockEntityType: BlockEntityType<T>, p0: Level, p1: BlockPos, p2: BlockState, p3: TileExchanger): BlockEntityTicker<T>;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
  }


  interface BlockMarket extends TradingTexturedBlock {}
  class BlockMarket extends TradingTexturedBlock {
    static readonly Companion: ua_serstarstory_ct_blocks_blockmarket_Companion;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
  }


  interface TradingTexturedBlock extends BaseEntityBlock {}
  class TradingTexturedBlock extends BaseEntityBlock {
    static readonly Companion: ua_serstarstory_ct_blocks_tradingtexturedblock_Companion;
    constructor();
    newBlockEntity(var1: BlockPos, var2: BlockState): BlockEntity;
    setPlacedBy(level: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
  }

}

declare module 'ua.serstarstory.ct.blocks.BlockExchanger' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { MapCodec } from 'com.mojang.serialization';
  import { BlockExchanger } from 'ua.serstarstory.ct.blocks';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get cODEC(): MapCodec<BlockExchanger>;
  }

}

declare module 'ua.serstarstory.ct.blocks.BlockMarket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { MapCodec } from 'com.mojang.serialization';
  import { BlockMarket } from 'ua.serstarstory.ct.blocks';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get cODEC(): MapCodec<BlockMarket>;
  }

}

declare module 'ua.serstarstory.ct.blocks.TradingTexturedBlock' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { IntegerProperty } from 'net.minecraft.world.level.block.state.properties';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get tEXTURE_TYPE(): IntegerProperty;
  }

}

declare module 'ua.serstarstory.ct.client' {
  import { FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';
  import { RegisterMenuScreensEvent } from 'net.neoforged.neoforge.client.event';
  import { RegisterRenderers } from 'EntityRenderersEvent';
  import { IEventBus } from 'net.neoforged.bus.api';

  class ClientEventHandler {
    static readonly INSTANCE: ClientEventHandler;
    onClientSetup(event: FMLClientSetupEvent): void;
    onRegisterRenderers(event: RegisterRenderers): void;
    onRegisterScreens(event: RegisterMenuScreensEvent): void;
  }


  class ClientInit {
    static readonly INSTANCE: ClientInit;
    register(modEventBus: IEventBus): void;
  }

}

declare module 'ua.serstarstory.ct.client.gui.button' {
  import { Button } from 'net.minecraft.client.gui.components';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Function1 } from 'kotlin.jvm.functions';
  import { Unit } from 'kotlin';

  interface ThreeStateButton extends Button {}
  class ThreeStateButton extends Button {
    constructor(x: number, y: number, width: number, height: number, texture: ResourceLocation, ud: number, vd: number, uh: number, vh: number, ua: number, va: number, onPress: Function1<Button, Unit>);
    get activeState(): boolean;
    set activeState(bl: boolean);
  }

}

declare module 'ua.serstarstory.ct.client.gui' {
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { ContainerExchangerCustomer, ContainerMarketOwner } from 'ua.serstarstory.ct.container';
  import { Companion } from 'ua.serstarstory.ct.client.gui.GuiExchangerCustomerBuy';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { Companion as ua_serstarstory_ct_client_gui_guimarketowner_Companion } from 'ua.serstarstory.ct.client.gui.GuiMarketOwner';
  import { EditBox } from 'net.minecraft.client.gui.components';

  interface GuiCT<T extends AbstractContainerMenu = any> extends AbstractContainerScreen<T> {}
  class GuiCT<T extends AbstractContainerMenu = any> extends AbstractContainerScreen<T> {
    constructor(container: T, inventory: Inventory, title: Component);
    isAdminAllowed(): boolean;
    receivedSyncUpdate(): void;
    setAdminAllowed(bl: boolean): void;
  }


  interface GuiExchangerCustomerBuy extends GuiCT<ContainerExchangerCustomer> {}
  class GuiExchangerCustomerBuy extends GuiCT<ContainerExchangerCustomer> {
    static readonly Companion: Companion;
    constructor(container: ContainerExchangerCustomer, inventory: Inventory, title: Component);
    receivedSyncUpdate(): void;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface GuiMarketOwner extends GuiCT<ContainerMarketOwner> {}
  class GuiMarketOwner extends GuiCT<ContainerMarketOwner> {
    static readonly Companion: ua_serstarstory_ct_client_gui_guimarketowner_Companion;
    constructor(container: ContainerMarketOwner, inventory: Inventory, title: Component);
    charTyped(codePoint: string, modifiers: number): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    receivedSyncUpdate(): void;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface GuiNumberBox extends EditBox {}
  class GuiNumberBox extends EditBox {
    constructor(fontRenderer: Font, x: number, y: number, width: number, height: number);
  }

}

declare module 'ua.serstarstory.ct.client.gui.GuiExchangerCustomerBuy' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
  }

}

declare module 'ua.serstarstory.ct.client.gui.GuiMarketOwner' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
  }

}

declare module 'ua.serstarstory.ct.client.render' {
  import { BlockEntityRenderer } from 'net.minecraft.client.renderer.blockentity';
  import { TileExchanger, TileMarket } from 'ua.serstarstory.ct.tiles';
  import { Context } from 'BlockEntityRendererProvider';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { Post } from 'RenderGuiEvent';

  interface TileExchangerRenderer extends BlockEntityRenderer<TileExchanger> {}
  class TileExchangerRenderer extends BlockEntityRenderer<TileExchanger> {
    constructor(context: Context);
    render(tile: TileExchanger, partialTicks: number, poseStack: PoseStack, bufferSource: MultiBufferSource, packedLight: number, packedOverlay: number): void;
  }


  interface TileMarketRenderer extends BlockEntityRenderer<TileMarket> {}
  class TileMarketRenderer extends BlockEntityRenderer<TileMarket> {
    constructor(context: Context);
    render(tile: TileMarket, partialTicks: number, poseStack: PoseStack, bufferSource: MultiBufferSource, packedLight: number, packedOverlay: number): void;
  }


  class TradePreviewListener {
    static readonly INSTANCE: TradePreviewListener;
    onRenderOverlay(event: Post): void;
  }

}

declare module 'ua.serstarstory.ct.container' {
  import { AbstractContainerMenu, MenuType, ClickType } from 'net.minecraft.world.inventory';
  import { Player, Inventory } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { BlockPos } from 'net.minecraft.core';
  import { IHasTextureTypes } from 'ua.serstarstory.ct.tiles';
  import { DeferredRegister, DeferredHolder } from 'net.neoforged.neoforge.registries';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { MenuProvider } from 'net.minecraft.world';
  import { Component } from 'net.minecraft.network.chat';
  import { Function3 } from 'kotlin.jvm.functions';
  import { Integer } from 'java.lang';

  interface ContainerCT<T extends BlockEntity = any> extends AbstractContainerMenu {}
  class ContainerCT<T extends BlockEntity = any> extends AbstractContainerMenu {
    constructor(type: MenuType<any>, id: number, player: Player, inv: T);
    bindPlayerInventory(inventoryPlayer: Inventory, offsetX: number, offsetY: number): void;
    broadcastChanges(): void;
    clicked(slotId: number, button: number, clickType: ClickType, player: Player): void;
    get inv(): T;
    quickMoveStack(player: Player, index: number): ItemStack;
    stillValid(player: Player): boolean;
  }


  interface ContainerItemSkinSelector extends ContainerSkinSelector {}
  class ContainerItemSkinSelector extends ContainerSkinSelector {
    constructor(id: number, playerInventory: Inventory, buffer: RegistryFriendlyByteBuf);
  }


  interface ContainerMarketCustomerBuy extends ContainerMarketCustomer {}
  class ContainerMarketCustomerBuy extends ContainerMarketCustomer {
    constructor(id: number, playerInventory: Inventory, buffer: RegistryFriendlyByteBuf);
  }


  interface ContainerMarketCustomerSell extends ContainerMarketCustomer {}
  class ContainerMarketCustomerSell extends ContainerMarketCustomer {
    constructor(id: number, playerInventory: Inventory, buffer: RegistryFriendlyByteBuf);
  }


  interface ContainerSkinSelector extends AbstractContainerMenu {}
  class ContainerSkinSelector extends AbstractContainerMenu {
    constructor(type: MenuType<any>, id: number, playerInventory: Inventory, isItemSelector: boolean, slot: number, blockPos: BlockPos);

    constructor(type: MenuType<any>, id: number, playerInventory: Inventory, buffer: RegistryFriendlyByteBuf);
    currentTextureType(): number;
    get blockPos(): BlockPos;
    get currentStack(): ItemStack;
    get textureTile(): IHasTextureTypes;
    isItemSelector(): boolean;
    quickMoveStack(player: Player, index: number): ItemStack;
    stillValid(player: Player): boolean;
  }


  class ContainersRegistry {
    static readonly INSTANCE: ContainersRegistry;
    get cONTAINERS(): DeferredRegister<MenuType<any>>;
    get eXCHANGER_CUSTOMER(): DeferredHolder<MenuType<any>, MenuType<ContainerExchangerCustomer>>;
    get eXCHANGER_OWNER(): DeferredHolder<MenuType<any>, MenuType<ContainerExchangerOwner>>;
    get iTEM_SKIN_SELECTOR(): DeferredHolder<MenuType<any>, MenuType<ContainerItemSkinSelector>>;
    get mARKET_CUSTOMER_BUY(): DeferredHolder<MenuType<any>, MenuType<ContainerMarketCustomerBuy>>;
    get mARKET_CUSTOMER_SELL(): DeferredHolder<MenuType<any>, MenuType<ContainerMarketCustomerSell>>;
    get mARKET_OWNER(): DeferredHolder<MenuType<any>, MenuType<ContainerMarketOwner>>;
    get tILE_SKIN_SELECTOR(): DeferredHolder<MenuType<any>, MenuType<ContainerTileSkinSelector>>;
  }


  interface ContainerTileSkinSelector extends ContainerSkinSelector {}
  class ContainerTileSkinSelector extends ContainerSkinSelector {
    constructor(id: number, playerInventory: Inventory, buffer: RegistryFriendlyByteBuf);
  }


  class ContainerUtilsKt {
    static tileFromBuffer<T extends BlockEntity>(playerInventory: Inventory, buffer: RegistryFriendlyByteBuf): T;
  }


  interface OpenTradingContainerContext extends MenuProvider {}
  class OpenTradingContainerContext extends MenuProvider {
    constructor(displayName: Component, factory: Function3<number, Inventory, Player, AbstractContainerMenu>);
    createMenu(id: number, inventory: Inventory, player: Player): AbstractContainerMenu;
    get displayName(): Component;
  }

}

declare module 'ua.serstarstory.ct.container.slots' {
  import { Slot } from 'net.minecraft.world.inventory';
  import { Container } from 'net.minecraft.world';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';

  interface SlotDisabled extends Slot {}
  class SlotDisabled extends Slot {
    constructor(inv: Container, id: number, x: number, y: number);
    mayPickup(player: Player): boolean;
    mayPlace(stack: ItemStack): boolean;
  }


  interface SlotFake extends Slot {}
  class SlotFake extends Slot {
    constructor(inv: Container, id: number, x: number, y: number);
    mayPickup(player: Player): boolean;
    mayPlace(stack: ItemStack): boolean;
  }


  interface SlotInvValid extends Slot {}
  class SlotInvValid extends Slot {
    constructor(inv: Container, id: number, x: number, y: number);
    mayPlace(stack: ItemStack): boolean;
  }

}

declare module 'ua.serstarstory.ct' {
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';

  class CubixTradingClient {
    constructor(modEventBus: IEventBus, modContainer: ModContainer);
  }

}

declare module 'ua.serstarstory.ct.ext' {
  import { Function0 } from 'kotlin.jvm.functions';
  import { Unit } from 'kotlin';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ItemStack } from 'net.minecraft.world.item';

  class FormatUtilsKt {
    static formattedString($this$formattedString: number): string;
  }


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

declare module 'ua.serstarstory.ct.items' {
  import { Item, ItemStack, BlockItem } from 'net.minecraft.world.item';
  import { InteractionResultHolder, InteractionHand, InteractionResult } from 'net.minecraft.world';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { UseOnContext } from 'net.minecraft.world.item.context';
  import { Companion } from 'ua.serstarstory.ct.items.TradingBlockItem';
  import { Block } from 'net.minecraft.world.level.block';
  import { Properties } from 'Item';

  interface ItemSkinSelector extends Item {}
  class ItemSkinSelector extends Item {
    constructor();
    getTextureType(stack: ItemStack): number;
    onItemUseFirst(stack: ItemStack, context: UseOnContext): InteractionResult;
    setTextureType(stack: ItemStack, mode: number): void;
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface TradingBlockItem extends BlockItem {}
  class TradingBlockItem extends BlockItem {
    static readonly Companion: Companion;
    constructor(block: Block, properties: Properties);
  }

}

declare module 'ua.serstarstory.ct.items.TradingBlockItem' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ItemStack } from 'net.minecraft.world.item';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    getTextureType(stack: ItemStack): number;
    setTextureType(stack: ItemStack, value: number): void;
  }

}

declare module 'ua.serstarstory.ct.network' {
  import { IEventBus } from 'net.neoforged.bus.api';
  import { SyncGuiPacket } from 'ua.serstarstory.ct.network.packets';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';

  class CTNetworkManager {
    static readonly INSTANCE: CTNetworkManager;
    get manager(): any;
    register(modEventBus: IEventBus): void;
    sendTo(packet: SyncGuiPacket, player: ServerPlayer): void;
    sendToServer(packet: CustomPacketPayload): void;
  }

}

declare module 'ua.serstarstory.ct.network.packets' {
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { Companion } from 'ua.serstarstory.ct.network.packets.ChangeMarketModePacket';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { Type } from 'CustomPacketPayload';
  import { Companion as ua_serstarstory_ct_network_packets_processactionpacket_Companion } from 'ua.serstarstory.ct.network.packets.ProcessActionPacket';
  import { Companion as ua_serstarstory_ct_network_packets_syncguipacket_Companion } from 'ua.serstarstory.ct.network.packets.SyncGuiPacket';
  import { BlockPos } from 'net.minecraft.core';
  import { IGuiSyncTile } from 'ua.serstarstory.ct.tiles';
  import { ServerPlayer } from 'net.minecraft.server.level';

  interface ChangeMarketModePacket extends CustomPacketPayload {}
  class ChangeMarketModePacket extends CustomPacketPayload {
    static readonly Companion: Companion;
    constructor(buyMode: boolean, price: number);

    constructor(buffer: RegistryFriendlyByteBuf);
    get buyMode(): boolean;
    get price(): number;
    type(): Type<ChangeMarketModePacket>;
  }


  interface ProcessActionPacket extends CustomPacketPayload {}
  class ProcessActionPacket extends CustomPacketPayload {
    static readonly Companion: ua_serstarstory_ct_network_packets_processactionpacket_Companion;
    constructor(action: number, value: number);

    constructor(buffer: RegistryFriendlyByteBuf);
    get action(): number;
    get value(): number;
    type(): Type<ProcessActionPacket>;
  }


  interface SyncGuiPacket extends CustomPacketPayload {}
  class SyncGuiPacket extends CustomPacketPayload {
    static readonly Companion: ua_serstarstory_ct_network_packets_syncguipacket_Companion;
    constructor(blockPos: BlockPos, payload: number[]);

    constructor(buffer: RegistryFriendlyByteBuf);

    constructor(blockPos: BlockPos, tile: IGuiSyncTile, issuer: ServerPlayer);
    get blockPos(): BlockPos;
    type(): Type<SyncGuiPacket>;
  }

}

declare module 'ua.serstarstory.ct.network.packets.ChangeMarketModePacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Type } from 'CustomPacketPayload';
  import { ChangeMarketModePacket } from 'ua.serstarstory.ct.network.packets';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { IPayloadContext } from 'net.neoforged.neoforge.network.handling';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get sTREAM_CODEC(): StreamCodec<RegistryFriendlyByteBuf, ChangeMarketModePacket>;
    get tYPE(): Type<ChangeMarketModePacket>;
    handle(packet: ChangeMarketModePacket, context: IPayloadContext): void;
  }

}

declare module 'ua.serstarstory.ct.network.packets.ProcessActionPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Type } from 'CustomPacketPayload';
  import { ProcessActionPacket } from 'ua.serstarstory.ct.network.packets';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { IPayloadContext } from 'net.neoforged.neoforge.network.handling';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get sTREAM_CODEC(): StreamCodec<RegistryFriendlyByteBuf, ProcessActionPacket>;
    get tYPE(): Type<ProcessActionPacket>;
    handle(packet: ProcessActionPacket, context: IPayloadContext): void;
  }

}

declare module 'ua.serstarstory.ct.network.packets.SyncGuiPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Type } from 'CustomPacketPayload';
  import { SyncGuiPacket } from 'ua.serstarstory.ct.network.packets';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { IPayloadContext } from 'net.neoforged.neoforge.network.handling';
  import { IGuiSyncTile } from 'ua.serstarstory.ct.tiles';
  import { ServerPlayer } from 'net.minecraft.server.level';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get sTREAM_CODEC(): StreamCodec<RegistryFriendlyByteBuf, SyncGuiPacket>;
    get tYPE(): Type<SyncGuiPacket>;
    handle(packet: SyncGuiPacket, context: IPayloadContext): void;
    serialize(tile: IGuiSyncTile, issuer: ServerPlayer): number[];
  }

}

declare module 'ua.serstarstory.ct.proxy' {
  import { Blocks, Items } from 'DeferredRegister';
  import { DeferredBlock, DeferredItem } from 'net.neoforged.neoforge.registries';
  import { Block } from 'net.minecraft.world.level.block';
  import { Item } from 'net.minecraft.world.item';

  class BlocksRegistry {
    static readonly INSTANCE: BlocksRegistry;
    get bLOCKS(): Blocks;
    get eXCHANGER(): DeferredBlock<Block>;
    get mARKET(): DeferredBlock<Block>;
  }


  class ItemsRegistry {
    static readonly INSTANCE: ItemsRegistry;
    get eXCHANGER(): DeferredItem<Item>;
    get iTEMS(): Items;
    get mARKET(): DeferredItem<Item>;
    get sKIN_SELECTOR(): DeferredItem<Item>;
  }

}

declare module 'ua.serstarstory.ct.tiles' {
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { UUID, List } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { DeferredRegister, DeferredHolder } from 'net.neoforged.neoforge.registries';
  import { BlockEntityType } from 'net.minecraft.world.level.block.entity';

  class IGuiSyncTile {
    readGuiData(var1: FriendlyByteBuf): void;
    writeGuiData(var1: FriendlyByteBuf, var2: ServerPlayer): void;
  }


  class IHasTextureTypes {
    get textureType(): number;
    setTextureType(var1: number, var2: Player): void;
  }


  class ITradingBlockTile {
    get drops(): ItemStack[];
    onPlacedBy(var1: UUID, var2: string): void;
    openDefaultMenu(var1: ServerPlayer): void;
  }


  class TilesRegistry {
    static readonly INSTANCE: TilesRegistry;
    get eXCHANGER(): DeferredHolder<BlockEntityType<any>, BlockEntityType<TileExchanger>>;
    get mARKET(): DeferredHolder<BlockEntityType<any>, BlockEntityType<TileMarket>>;
    get tILES(): DeferredRegister<BlockEntityType<any>>;
  }

}

declare module 'ua.serstarstory.ct.utils' {
  import { Player } from 'net.minecraft.world.entity.player';
  import { UUID } from 'java.util';
  import { Double } from 'java.lang';
  import { ItemStack } from 'net.minecraft.world.item';

  class BukkitUtils {
    static readonly INSTANCE: BukkitUtils;
    isAdmin(player: Player): boolean;
    isAdmin(player: UUID): boolean;
  }


  class MinimalPriceProvider {
    static getMinPrice(stack: ItemStack): number;
  }

}

declare module 'ua.serstarstory.ct.utils.economy' {
  interface EconomyManager extends IEconomyProvider {}
  class EconomyManager extends IEconomyProvider {
    static readonly INSTANCE: EconomyManager;
    deposit(player: string, amount: number): boolean;
    getBalance(player: string): number;
    has(player: string, amount: number): boolean;
    withdraw(player: string, amount: number): boolean;
  }


  class IEconomyProvider {
    deposit(var1: string, var2: number): boolean;
    getBalance(var1: string): number;
    has(var1: string, var2: number): boolean;
    withdraw(var1: string, var2: number): boolean;
  }


  interface TestEconomyProvider extends IEconomyProvider {}
  class TestEconomyProvider extends IEconomyProvider {
    deposit(player: string, amount: number): boolean;
    getBalance(player: string): number;
    has(player: string, amount: number): boolean;
    withdraw(player: string, amount: number): boolean;
  }


  interface VaultEconomyProvider extends IEconomyProvider {}
  class VaultEconomyProvider extends IEconomyProvider {
    constructor();
    deposit(player: string, amount: number): boolean;
    getBalance(player: string): number;
    has(player: string, amount: number): boolean;
    withdraw(player: string, amount: number): boolean;
  }


  interface VaultEconomyProviderHack extends IEconomyProvider {}
  class VaultEconomyProviderHack extends IEconomyProvider {
    static readonly INSTANCE: VaultEconomyProviderHack;
    deposit(player: string, amount: number): boolean;
    getBalance(player: string): number;
    has(player: string, amount: number): boolean;
    withdraw(player: string, amount: number): boolean;
  }

}

declare module 'ua.serstarstory.ct.utils.economy.EconomyManager' {
  import { Companion } from 'ua.serstarstory.ct.utils.economy.EconomyManager.Init';
  import { IEconomyProvider } from 'ua.serstarstory.ct.utils.economy';

  class Init {
    static readonly Companion: Companion;
    static provider: IEconomyProvider;
  }

}

declare module 'ua.serstarstory.ct.utils.economy.EconomyManager.Init' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { IEconomyProvider } from 'ua.serstarstory.ct.utils.economy';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get provider(): IEconomyProvider;
    init(enableTest: boolean): void;
    set provider(iEconomyProvider: IEconomyProvider);
  }

}

declare module 'ua.serstarstory.ct.utils.economy.VaultEconomyProviderHack' {
  import { Companion } from 'ua.serstarstory.ct.utils.economy.VaultEconomyProviderHack.Init';

  class Init {
    static readonly Companion: Companion;
  }

}

declare module 'ua.serstarstory.ct.utils.economy.VaultEconomyProviderHack.Init' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { IEconomyProvider } from 'ua.serstarstory.ct.utils.economy';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get vault(): IEconomyProvider;
  }

}

declare module 'ua.serstarstory.ct.utils.economy.VaultEconomyProviderHack.Init.Companion' {
  import { ClassLoader, Class } from 'java.lang';

  interface PublicClassLoader extends ClassLoader {}
  class PublicClassLoader extends ClassLoader {
    constructor(parent: ClassLoader);
    define(array: number[]): Class<any>;
  }

}