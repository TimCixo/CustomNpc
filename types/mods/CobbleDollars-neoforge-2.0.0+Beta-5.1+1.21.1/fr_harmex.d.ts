declare module 'fr.harmex.cobbledollars.common.client' {
  import { ClientConfig } from 'fr.harmex.cobbledollars.common.client.config';
  import { CobbleDollarsOverlay } from 'fr.harmex.cobbledollars.common.client.gui';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { DeltaTracker } from 'net.minecraft.client';
  import { EntityType, Entity } from 'net.minecraft.world.entity';
  import { EntityRendererProvider } from 'net.minecraft.client.renderer.entity';

  class CobbleDollarsClient {
    static readonly INSTANCE: CobbleDollarsClient;
    static implementation: CobbleDollarsClientImplementation;
    static config: ClientConfig;
    beforeChatRender(guiGraphics: GuiGraphics, deltaTracker: DeltaTracker): void;
    get config(): ClientConfig;
    get implementation(): CobbleDollarsClientImplementation;
    get overlay(): CobbleDollarsOverlay;
    init(implementation: CobbleDollarsClientImplementation): void;
    loadConfig(): void;
    registerEntityRenderers(): void;
    saveConfig(): void;
    set config(clientConfig: ClientConfig);
    set implementation(cobbleDollarsClientImplementation: CobbleDollarsClientImplementation);
  }


  class CobbleDollarsClientImplementation {
    registerEntityRenderer<T extends Entity>(var1: EntityType<T>, var2: EntityRendererProvider<T>): void;
  }

}

declare module 'fr.harmex.cobbledollars.common.client.config' {
  import { Companion } from 'fr.harmex.cobbledollars.common.client.config.ClientConfig';
  import { OverlayPosition } from 'fr.harmex.cobbledollars.common.client.utils';
  import { Shop, Bank } from 'fr.harmex.cobbledollars.common.world.item.trading.shop';

  class ClientConfig {
    static readonly Companion: Companion;
    get overlayPosition(): OverlayPosition;
    set overlayPosition(overlayPosition: OverlayPosition);
  }


  class ClientShopConfig {
    static readonly INSTANCE: ClientShopConfig;
    get bank(): Bank;
    get defaultShop(): Shop;
    set bank(bank: Bank);
    set defaultShop(shop: Shop);
  }

}

declare module 'fr.harmex.cobbledollars.common.client.config.ClientConfig' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Gson } from 'com.google.gson';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get gSON(): Gson;
  }

}

declare module 'fr.harmex.cobbledollars.common.client.gui' {
  import { Gui, GuiGraphics } from 'net.minecraft.client.gui';
  import { DeltaTracker } from 'net.minecraft.client';

  interface CobbleDollarsOverlay extends Gui {}
  class CobbleDollarsOverlay extends Gui {
    constructor();
    render(guiGraphics: GuiGraphics, deltaTracker: DeltaTracker): void;
  }

}

declare module 'fr.harmex.cobbledollars.common.client.gui.CobbleDollarsOverlay' {
  class WhenMappings {
    static readonly $EnumSwitchMapping$0: number[];
  }

}

declare module 'fr.harmex.cobbledollars.common.client.gui.screen' {
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { BankMenu, ShopMenu } from 'fr.harmex.cobbledollars.common.world.inventory';
  import { ContainerListener, Container } from 'net.minecraft.world';
  import { SellButton, BuyButton, CategoryListWidget, OfferListWidget } from 'fr.harmex.cobbledollars.common.client.gui.screen.widget';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { BigInteger } from 'java.math';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { EditBox } from 'net.minecraft.client.gui.components';
  import { Minecraft } from 'net.minecraft.client';

  interface BankScreen extends ContainerListener, AbstractContainerScreen<BankMenu> {}
  class BankScreen extends ContainerListener {
    sellButton: SellButton;
    constructor(menu: BankMenu, playerInventory: Inventory, title: Component);
    canSell(): boolean;
    containerChanged(container: Container): void;
    get bgLocation(): ResourceLocation;
    get sellButton(): SellButton;
    get sellPrice(): BigInteger;
    get x(): number;
    get y(): number;
    onClose(): void;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    sell(): void;
    set sellButton(sellButton: SellButton);
    set sellPrice(bigInteger: BigInteger);
    set x(n: number);
    set y(n: number);
  }


  interface ClientConfigScreen extends Screen {}
  class ClientConfigScreen extends Screen {
    constructor(parent: Screen);
    isPauseScreen(): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    onClose(): void;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
  }


  interface ShopScreen extends AbstractContainerScreen<ShopMenu> {}
  class ShopScreen extends AbstractContainerScreen<ShopMenu> {
    editCategoryNameBox: EditBox;
    editOfferPriceBox: EditBox;
    editOfferStockBox: EditBox;
    searchCategoryBox: EditBox;
    searchOfferBox: EditBox;
    buyAmountBox: EditBox;
    buyButton: BuyButton;
    constructor(menu: ShopMenu, playerInventory: Inventory, title: Component);
    amountButtonClick(increment: boolean): void;
    buy(): void;
    canBuy(): boolean;
    get bgLocation(): ResourceLocation;
    get buyAmount(): number;
    get buyAmountBox(): EditBox;
    get buyButton(): BuyButton;
    get categoryList(): CategoryListWidget;
    get editCategoryNameBox(): EditBox;
    get editOfferPriceBox(): EditBox;
    get editOfferStockBox(): EditBox;
    get offerList(): OfferListWidget;
    get searchCategoryBox(): EditBox;
    get searchOfferBox(): EditBox;
    get shopSynced(): boolean;
    get stockLocation(): ResourceLocation;
    get x(): number;
    get y(): number;
    isEditMode(): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrollX: number, scrollY: number): boolean;
    onClose(): void;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    resize(minecraft: Minecraft, width: number, height: number): void;
    set buyAmount(n: number);
    set buyAmountBox(editBox: EditBox);
    set buyButton(buyButton: BuyButton);
    set editCategoryNameBox(editBox: EditBox);
    set editOfferPriceBox(editBox: EditBox);
    set editOfferStockBox(editBox: EditBox);
    set searchCategoryBox(editBox: EditBox);
    set searchOfferBox(editBox: EditBox);
    set shopSynced(bl: boolean);
    set x(n: number);
    set y(n: number);
    setEditMode(bl: boolean): void;
    syncShop(): void;
    syncShopToServer(): void;
    toggleEditCategoryNameBox(state: boolean): void;
    toggleEditOfferPriceBox(state: boolean): void;
    toggleEditOfferStockBox(state: boolean): void;
    updateBuyAmount(filter: string): void;
    updateWidgetPos(): void;
  }

}

declare module 'fr.harmex.cobbledollars.common.client.gui.screen.widget' {
  import { Button } from 'net.minecraft.client.gui.components';
  import { Companion } from 'fr.harmex.cobbledollars.common.client.gui.screen.widget.AmountButton';
  import { OnPress } from 'Button';
  import { SoundManager } from 'net.minecraft.client.sounds';
  import { Companion as fr_harmex_cobbledollars_common_client_gui_screen_widget_bankbutton_Companion } from 'fr.harmex.cobbledollars.common.client.gui.screen.widget.BankButton';
  import { Companion as fr_harmex_cobbledollars_common_client_gui_screen_widget_buybutton_Companion } from 'fr.harmex.cobbledollars.common.client.gui.screen.widget.BuyButton';
  import { ShopScreen, BankScreen } from 'fr.harmex.cobbledollars.common.client.gui.screen';
  import { Companion as fr_harmex_cobbledollars_common_client_gui_screen_widget_sellbutton_Companion } from 'fr.harmex.cobbledollars.common.client.gui.screen.widget.SellButton';
  import { Companion as fr_harmex_cobbledollars_common_client_gui_screen_widget_shopbutton_Companion } from 'fr.harmex.cobbledollars.common.client.gui.screen.widget.ShopButton';

  interface AmountButton extends Button {}
  class AmountButton extends Button {
    static readonly Companion: Companion;
    constructor(x: number, y: number, up: boolean, onPress: OnPress);
    playDownSound(handler: SoundManager): void;
  }


  interface BankButton extends Button {}
  class BankButton extends Button {
    static readonly Companion: fr_harmex_cobbledollars_common_client_gui_screen_widget_bankbutton_Companion;
    constructor(x: number, y: number, onPress: OnPress);
    playDownSound(handler: SoundManager): void;
  }


  interface BuyButton extends Button {}
  class BuyButton extends Button {
    static readonly Companion: fr_harmex_cobbledollars_common_client_gui_screen_widget_buybutton_Companion;
    static readonly WIDTH: number;
    static readonly HEIGHT: number;
    constructor(x: number, y: number, shopScreen: ShopScreen, onPress: OnPress);
    get shopScreen(): ShopScreen;
    playDownSound(handler: SoundManager): void;
  }


  interface SellButton extends Button {}
  class SellButton extends Button {
    static readonly Companion: fr_harmex_cobbledollars_common_client_gui_screen_widget_sellbutton_Companion;
    static readonly WIDTH: number;
    static readonly HEIGHT: number;
    constructor(x: number, y: number, bankScreen: BankScreen, onPress: OnPress);
    get bankScreen(): BankScreen;
    playDownSound(handler: SoundManager): void;
  }


  interface ShopButton extends Button {}
  class ShopButton extends Button {
    static readonly Companion: fr_harmex_cobbledollars_common_client_gui_screen_widget_shopbutton_Companion;
    constructor(x: number, y: number, onPress: OnPress);
    playDownSound(handler: SoundManager): void;
  }

}

declare module 'fr.harmex.cobbledollars.common.client.gui.screen.widget.AmountButton' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
  }

}

declare module 'fr.harmex.cobbledollars.common.client.gui.screen.widget.BankButton' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
  }

}

declare module 'fr.harmex.cobbledollars.common.client.gui.screen.widget.BuyButton' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get tEXTURE_LOCATION(): ResourceLocation;
  }

}

declare module 'fr.harmex.cobbledollars.common.client.gui.screen.widget.SellButton' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get tEXTURE_LOCATION(): ResourceLocation;
  }

}

declare module 'fr.harmex.cobbledollars.common.client.gui.screen.widget.ShopButton' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
  }

}

declare module 'fr.harmex.cobbledollars.common.client.renderer.entity' {
  import { MobRenderer } from 'net.minecraft.client.renderer.entity';
  import { CobbleMerchant } from 'fr.harmex.cobbledollars.common.world.entity';
  import { VillagerModel } from 'net.minecraft.client.model';
  import { Companion } from 'fr.harmex.cobbledollars.common.client.renderer.entity.CobbleMerchantRenderer';
  import { Context } from 'EntityRendererProvider';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface CobbleMerchantRenderer extends MobRenderer<CobbleMerchant, VillagerModel> {}
  class CobbleMerchantRenderer extends MobRenderer<CobbleMerchant, VillagerModel> {
    static readonly Companion: Companion;
    constructor(context: Context);
    getTextureLocation(entity: CobbleMerchant): ResourceLocation;
  }

}

declare module 'fr.harmex.cobbledollars.common.client.renderer.entity.CobbleMerchantRenderer' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
  }

}

declare module 'fr.harmex.cobbledollars.common.client.utils' {
  import { Enum, Integer } from 'java.lang';
  import { EnumEntries } from 'kotlin.enums';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { BigInteger } from 'java.math';
  import { StringRepresentable } from 'net.minecraft.util';
  import { Companion } from 'fr.harmex.cobbledollars.common.client.utils.OverlayPosition';
  import { MutableComponent } from 'net.minecraft.network.chat';

  interface Context extends Enum<Context> {}
  class Context extends Enum<Context> {
    static readonly PLAYER: Context;
    static readonly SHOP: Context;
    static readonly BANK: Context;
    static get entries(): EnumEntries<Context>;
    static valueOf(value: string): Context;
    static values(): Context[];
  }


  class GuiUtilsKt {
    static readonly TEXTURE_WIDTH: number;
    static readonly TEXTURE_HEIGHT: number;
    static get cROSS_LOCATION(): ResourceLocation;
    static renderCobbleDollarsElement($this$renderCobbleDollarsElement: GuiGraphics, x: number, y: number, drawAmount: boolean, amount: BigInteger, animationUp: boolean, context: Context, color: number): void;
    static renderCobbleDollarsElement$default(guiGraphics: GuiGraphics, n: number, n2: number, bl: boolean, bigInteger: BigInteger, bl2: boolean, context: Context, n3: number, n4: number, object: any): void;
    static tick(): void;
  }


  interface OverlayPosition extends StringRepresentable, Enum<OverlayPosition> {}
  class OverlayPosition extends StringRepresentable {
    static readonly Companion: Companion;
    static readonly DISABLED: OverlayPosition;
    static readonly TOP_LEFT: OverlayPosition;
    static readonly TOP_RIGHT: OverlayPosition;
    static readonly BOTTOM_LEFT: OverlayPosition;
    static readonly BOTTOM_RIGHT: OverlayPosition;
    get displayName(): MutableComponent;
    static get entries(): EnumEntries<OverlayPosition>;
    get key(): string;
    get serializedName(): string;
    static valueOf(value: string): OverlayPosition;
    static values(): OverlayPosition[];
  }

}

declare module 'fr.harmex.cobbledollars.common.client.utils.OverlayPosition' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { EnumCodec } from 'StringRepresentable';
  import { OverlayPosition } from 'fr.harmex.cobbledollars.common.client.utils';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    byName(name: string): OverlayPosition;
    get cODEC(): EnumCodec<OverlayPosition>;
  }

}

declare module 'fr.harmex.cobbledollars.common' {
  import { NetworkManager } from 'com.cobblemon.mod.common';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { KClass } from 'kotlin.reflect';
  import { ArgumentTypeInfo } from 'net.minecraft.commands.synchronization';
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { Template } from 'ArgumentTypeInfo';

  class CobbleDollarsImplementation {
    get networkManager(): NetworkManager;
    isModLoaded(var1: string): boolean;
    registerCommandArgument<A extends ArgumentType<any>, T extends Template<A>>(var1: ResourceLocation, var2: KClass<A>, var3: ArgumentTypeInfo<A, T>): void;
    registerEntityAttributes(): void;
    registerEntityDataSerializers(): void;
    registerEntityTypes(): void;
    registerItems(): void;
    registerMenus(): void;
    registerVillagers(): void;
  }

}

declare module 'fr.harmex.cobbledollars.common.command.arguments' {
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { BigInteger } from 'java.math';
  import { Companion } from 'fr.harmex.cobbledollars.common.command.arguments.BigIntegerArgumentType';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { StringReader } from 'com.mojang.brigadier';
  import { Collection } from 'java.util';

  interface BigIntegerArgumentType extends ArgumentType<BigInteger> {}
  class BigIntegerArgumentType extends ArgumentType<BigInteger> {
    static readonly Companion: Companion;
    constructor(min: BigInteger, max: BigInteger);

    constructor(bigInteger: BigInteger, bigInteger2: BigInteger, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor();
    get examples(): Collection<string>;
    get max(): BigInteger;
    get min(): BigInteger;
    parse(reader: StringReader): BigInteger;
  }

}

declare module 'fr.harmex.cobbledollars.common.command.arguments.BigIntegerArgumentType' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Collection } from 'java.util';
  import { Dynamic2CommandExceptionType } from 'com.mojang.brigadier.exceptions';
  import { BigIntegerArgumentType } from 'fr.harmex.cobbledollars.common.command.arguments';
  import { BigInteger } from 'java.math';
  import { CommandContext } from 'com.mojang.brigadier.context';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    bigInt(): BigIntegerArgumentType;
    bigInt(min: BigInteger): BigIntegerArgumentType;
    bigInt(min: number): BigIntegerArgumentType;
    bigInt(min: BigInteger, max: BigInteger): BigIntegerArgumentType;
    bigInt(min: number, max: BigInteger): BigIntegerArgumentType;
    bigInt(min: BigInteger, max: number): BigIntegerArgumentType;
    bigInt(min: number, max: number): BigIntegerArgumentType;
    get bIG_INT_TOO_BIG(): Dynamic2CommandExceptionType;
    get bIG_INT_TOO_SMALL(): Dynamic2CommandExceptionType;
    get eXAMPLES(): Collection<string>;
    getBigInteger(context: CommandContext<any>, name: string): BigInteger;
  }

}

declare module 'fr.harmex.cobbledollars.common.command' {
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack, CommandBuildContext } from 'net.minecraft.commands';
  import { CommandSelection } from 'Commands';

  class CobbleDollarsCommands {
    static readonly INSTANCE: CobbleDollarsCommands;
    register(dispatcher: CommandDispatcher<CommandSourceStack>, buildContext: CommandBuildContext, commandSelection: CommandSelection): void;
  }

}

declare module 'fr.harmex.cobbledollars.common.command.permission' {
  import { Permission, PermissionLevel } from 'com.cobblemon.mod.common.api.permission';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Iterable } from 'java.lang';

  interface CobbleDollarsPermission extends Permission {}
  class CobbleDollarsPermission extends Permission {
    constructor(node: string, level: PermissionLevel);
    component2(): PermissionLevel;
    copy(node: string, level: PermissionLevel): CobbleDollarsPermission;
    static copy$default(cobbleDollarsPermission: CobbleDollarsPermission, string: string, permissionLevel: PermissionLevel, n: number, object: any): CobbleDollarsPermission;
    equals(other: any): boolean;
    get identifier(): ResourceLocation;
    get level(): PermissionLevel;
    get literal(): string;
    hashCode(): number;
    toString(): string;
  }


  class CobbleDollarsPermissions {
    static readonly INSTANCE: CobbleDollarsPermissions;
    all(): Iterable<Permission>;
    get cOBBLE_DOLLARS(): Permission;
    get cOBBLE_DOLLARS_GIVE(): Permission;
    get cOBBLE_DOLLARS_LEADERBOARD(): Permission;
    get cOBBLE_DOLLARS_LEADERBOARD_UPDATE(): Permission;
    get cOBBLE_DOLLARS_PAY(): Permission;
    get cOBBLE_DOLLARS_QUERY(): Permission;
    get cOBBLE_DOLLARS_RELOAD(): Permission;
    get cOBBLE_DOLLARS_REMOVE(): Permission;
    get cOBBLE_DOLLARS_SET(): Permission;
    get cOBBLE_MERCHANT(): Permission;
    get cOBBLE_MERCHANT_EDIT(): Permission;
    get cOBBLE_MERCHANT_OPEN(): Permission;
    get cOBBLE_MERCHANT_OPEN_BANK(): Permission;
    get cOBBLE_MERCHANT_OPEN_SHOP(): Permission;
  }

}

declare module 'fr.harmex.cobbledollars.common.config' {
  import { Companion } from 'fr.harmex.cobbledollars.common.config.BankConfig';
  import { Bank, Shop } from 'fr.harmex.cobbledollars.common.world.item.trading.shop';
  import { Companion as fr_harmex_cobbledollars_common_config_commonconfig_Companion } from 'fr.harmex.cobbledollars.common.config.CommonConfig';
  import { Companion as fr_harmex_cobbledollars_common_config_shopconfig_Companion } from 'fr.harmex.cobbledollars.common.config.ShopConfig';
  import { ItemStack } from 'net.minecraft.world.item';

  class BankConfig {
    static readonly Companion: Companion;
    static readonly PATH: string;
    constructor();
    get bank(): Bank;
    set bank(bank: Bank);
  }


  class CommonConfig {
    static readonly Companion: fr_harmex_cobbledollars_common_config_commonconfig_Companion;
    static readonly PATH: string;
    get cobbleDollarsIncomeMultiplier(): number;
    get earnCobbleDollarsFromNPC(): boolean;
    get earnCobbleDollarsFromWildPokemon(): boolean;
    get playerDataSaveFrequency(): number;
    set cobbleDollarsIncomeMultiplier(d: number);
    set earnCobbleDollarsFromNPC(bl: boolean);
    set earnCobbleDollarsFromWildPokemon(bl: boolean);
    set playerDataSaveFrequency(n: number);
  }


  class ShopConfig {
    static readonly Companion: fr_harmex_cobbledollars_common_config_shopconfig_Companion;
    static readonly PATH: string;
    constructor();
    get defaultShop(): Shop;
    set defaultShop(shop: Shop);
    stick(): ItemStack;
  }

}

declare module 'fr.harmex.cobbledollars.common.config.BankConfig' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Gson } from 'com.google.gson';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get gSON(): Gson;
    load(): void;
    save(): void;
  }

}

declare module 'fr.harmex.cobbledollars.common.config.CommonConfig' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Gson } from 'com.google.gson';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get gSON(): Gson;
    load(): void;
    save(): void;
  }

}

declare module 'fr.harmex.cobbledollars.common.config.ShopConfig' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Gson } from 'com.google.gson';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get gSON(): Gson;
    load(): void;
    save(): void;
  }

}

declare module 'fr.harmex.cobbledollars.common.implementation' {
  import { GtsEconomy } from 'org.pokesplash.gts.api.economy';
  import { Companion } from 'fr.harmex.cobbledollars.common.implementation.GTSImplementation';
  import { UUID } from 'java.util';

  interface GTSImplementation extends GtsEconomy {}
  class GTSImplementation extends GtsEconomy {
    static readonly Companion: Companion;
    add(playerUUID: UUID, amount: number): boolean;
    balance(playerUUID: UUID): number;
    remove(playerUUID: UUID, amount: number): boolean;
  }

}

declare module 'fr.harmex.cobbledollars.common.implementation.GTSImplementation' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { MinecraftServer } from 'net.minecraft.server';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get server(): MinecraftServer;
    set server(minecraftServer: MinecraftServer);
  }

}

declare module 'fr.harmex.cobbledollars.common.mixin' {
  import { CobbleDollarsPlayer } from 'fr.harmex.cobbledollars.common.utils';
  import { BigInteger } from 'java.math';
  import { CobbleDollarsShopHolder } from 'fr.harmex.cobbledollars.common.world.item.trading';
  import { Shop } from 'fr.harmex.cobbledollars.common.world.item.trading.shop';
  import { UUID, Set } from 'java.util';
  import { Player } from 'net.minecraft.world.entity.player';

  interface PlayerMixin extends CobbleDollarsPlayer {}
  class PlayerMixin extends CobbleDollarsPlayer {
    cobbleDollars$getCobbleDollars(): BigInteger;
    cobbleDollars$setCobbleDollars(amount: BigInteger): void;
  }


  class ServerPlayerMixin {
  }


  interface VillagerMixin extends CobbleDollarsShopHolder {}
  class VillagerMixin extends CobbleDollarsShopHolder {
    get merchantUUID(): UUID;
    get shop(): Shop;
    get tradingPlayers(): Set<Player>;
    set merchantUUID(uuid: UUID);
    set shop(shop: Shop);
    set tradingPlayers(players: Set<Player>);
  }


  class VillagerProfessionLayerMixin<T extends LivingEntity = any> {
  }


  class ZombieMixin {
  }


  interface ZombieVillagerMixin extends CobbleDollarsShopHolder {}
  class ZombieVillagerMixin extends CobbleDollarsShopHolder {
    get merchantUUID(): UUID;
    get shop(): Shop;
    get tradingPlayers(): Set<Player>;
    set merchantUUID(uuid: UUID);
    set shop(shop: Shop);
    set tradingPlayers(players: Set<Player>);
  }

}

declare module 'fr.harmex.cobbledollars.common.network' {
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { NetworkPacket } from 'com.cobblemon.mod.common.api.net';
  import { Iterable } from 'java.lang';
  import { List } from 'java.util';
  import { PacketRegisterInfo } from 'com.cobblemon.mod.common.net';
  import { SyncShopConfigPacket, SyncShopPacket, SyncBankPacket, UpdateStockPacket } from 'fr.harmex.cobbledollars.common.network.packets.s2c';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { BuyPacket, SellPacket, OpenShopPacket, OpenBankPacket, UpdateMerchantShopPacket, CloseShopPacket } from 'fr.harmex.cobbledollars.common.network.packets.c2s';

  class CobbleDollarsNetwork {
    static readonly INSTANCE: CobbleDollarsNetwork;
    get c2sPayloads(): PacketRegisterInfo<any>[];
    get s2cPayloads(): PacketRegisterInfo<any>[];
    invoke(p0: RegistryFriendlyByteBuf): SyncShopConfigPacket;
    invoke(p0: RegistryFriendlyByteBuf): SyncShopPacket;
    invoke(p0: RegistryFriendlyByteBuf): SyncBankPacket;
    invoke(p0: RegistryFriendlyByteBuf): UpdateStockPacket;
    invoke(p0: RegistryFriendlyByteBuf): BuyPacket;
    invoke(p0: RegistryFriendlyByteBuf): SellPacket;
    invoke(p0: RegistryFriendlyByteBuf): OpenShopPacket;
    invoke(p0: RegistryFriendlyByteBuf): OpenBankPacket;
    invoke(p0: RegistryFriendlyByteBuf): UpdateMerchantShopPacket;
    invoke(p0: RegistryFriendlyByteBuf): CloseShopPacket;
    sendPacket($this$sendPacket: ServerPlayer, packet: NetworkPacket<any>): void;
    sendPacketToPlayer(player: ServerPlayer, packet: NetworkPacket<any>): void;
    sendPacketToPlayers(players: Iterable<ServerPlayer>, packet: NetworkPacket<any>): void;
    sendToAllPlayers(packet: NetworkPacket<any>): void;
    sendToServer(packet: NetworkPacket<any>): void;
  }

}

declare module 'fr.harmex.cobbledollars.common.network.handlers.client' {
  import { ClientNetworkPacketHandler } from 'com.cobblemon.mod.common.api.net';
  import { SyncBankPacket, SyncShopConfigPacket, SyncShopPacket, UpdateStockPacket } from 'fr.harmex.cobbledollars.common.network.packets.s2c';
  import { Minecraft } from 'net.minecraft.client';

  interface SyncBankHandler extends ClientNetworkPacketHandler<SyncBankPacket> {}
  class SyncBankHandler extends ClientNetworkPacketHandler<SyncBankPacket> {
    static readonly INSTANCE: SyncBankHandler;
    handle(packet: SyncBankPacket, client: Minecraft): void;
  }


  interface SyncShopConfigHandler extends ClientNetworkPacketHandler<SyncShopConfigPacket> {}
  class SyncShopConfigHandler extends ClientNetworkPacketHandler<SyncShopConfigPacket> {
    static readonly INSTANCE: SyncShopConfigHandler;
    handle(packet: SyncShopConfigPacket, client: Minecraft): void;
  }


  interface SyncShopHandler extends ClientNetworkPacketHandler<SyncShopPacket> {}
  class SyncShopHandler extends ClientNetworkPacketHandler<SyncShopPacket> {
    static readonly INSTANCE: SyncShopHandler;
    handle(packet: SyncShopPacket, client: Minecraft): void;
  }


  interface UpdateStockHandler extends ClientNetworkPacketHandler<UpdateStockPacket> {}
  class UpdateStockHandler extends ClientNetworkPacketHandler<UpdateStockPacket> {
    static readonly INSTANCE: UpdateStockHandler;
    handle(packet: UpdateStockPacket, client: Minecraft): void;
  }

}

declare module 'fr.harmex.cobbledollars.common.network.handlers.server' {
  import { ServerNetworkPacketHandler } from 'com.cobblemon.mod.common.api.net';
  import { BuyPacket, CloseShopPacket, OpenBankPacket, OpenShopPacket, SellPacket, UpdateMerchantShopPacket } from 'fr.harmex.cobbledollars.common.network.packets.c2s';
  import { MinecraftServer } from 'net.minecraft.server';
  import { ServerPlayer } from 'net.minecraft.server.level';

  interface BuyHandler extends ServerNetworkPacketHandler<BuyPacket> {}
  class BuyHandler extends ServerNetworkPacketHandler<BuyPacket> {
    static readonly INSTANCE: BuyHandler;
    handle(packet: BuyPacket, server: MinecraftServer, player: ServerPlayer): void;
  }


  interface CloseShopHandler extends ServerNetworkPacketHandler<CloseShopPacket> {}
  class CloseShopHandler extends ServerNetworkPacketHandler<CloseShopPacket> {
    static readonly INSTANCE: CloseShopHandler;
    handle(packet: CloseShopPacket, server: MinecraftServer, player: ServerPlayer): void;
  }


  interface OpenBankHandler extends ServerNetworkPacketHandler<OpenBankPacket> {}
  class OpenBankHandler extends ServerNetworkPacketHandler<OpenBankPacket> {
    static readonly INSTANCE: OpenBankHandler;
    handle(packet: OpenBankPacket, server: MinecraftServer, player: ServerPlayer): void;
  }


  interface OpenShopHandler extends ServerNetworkPacketHandler<OpenShopPacket> {}
  class OpenShopHandler extends ServerNetworkPacketHandler<OpenShopPacket> {
    static readonly INSTANCE: OpenShopHandler;
    handle(packet: OpenShopPacket, server: MinecraftServer, player: ServerPlayer): void;
  }


  interface SellHandler extends ServerNetworkPacketHandler<SellPacket> {}
  class SellHandler extends ServerNetworkPacketHandler<SellPacket> {
    static readonly INSTANCE: SellHandler;
    handle(packet: SellPacket, server: MinecraftServer, player: ServerPlayer): void;
  }


  interface UpdateMerchantShopHandler extends ServerNetworkPacketHandler<UpdateMerchantShopPacket> {}
  class UpdateMerchantShopHandler extends ServerNetworkPacketHandler<UpdateMerchantShopPacket> {
    static readonly INSTANCE: UpdateMerchantShopHandler;
    handle(packet: UpdateMerchantShopPacket, server: MinecraftServer, player: ServerPlayer): void;
  }

}

declare module 'fr.harmex.cobbledollars.common.network.packets.c2s' {
  import { NetworkPacket } from 'com.cobblemon.mod.common.api.net';
  import { Companion } from 'fr.harmex.cobbledollars.common.network.packets.c2s.BuyPacket';
  import { Offer, Shop } from 'fr.harmex.cobbledollars.common.world.item.trading.shop';
  import { UUID } from 'java.util';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Iterable, Boolean } from 'java.lang';
  import { Level } from 'net.minecraft.world.level';
  import { Function1 } from 'kotlin.jvm.functions';
  import { Type } from 'CustomPacketPayload';
  import { Companion as fr_harmex_cobbledollars_common_network_packets_c2s_closeshoppacket_Companion } from 'fr.harmex.cobbledollars.common.network.packets.c2s.CloseShopPacket';
  import { Companion as fr_harmex_cobbledollars_common_network_packets_c2s_openbankpacket_Companion } from 'fr.harmex.cobbledollars.common.network.packets.c2s.OpenBankPacket';
  import { Companion as fr_harmex_cobbledollars_common_network_packets_c2s_openshoppacket_Companion } from 'fr.harmex.cobbledollars.common.network.packets.c2s.OpenShopPacket';
  import { Companion as fr_harmex_cobbledollars_common_network_packets_c2s_sellpacket_Companion } from 'fr.harmex.cobbledollars.common.network.packets.c2s.SellPacket';
  import { Companion as fr_harmex_cobbledollars_common_network_packets_c2s_updatemerchantshoppacket_Companion } from 'fr.harmex.cobbledollars.common.network.packets.c2s.UpdateMerchantShopPacket';

  interface BuyPacket extends NetworkPacket<BuyPacket> {}
  class BuyPacket extends NetworkPacket<BuyPacket> {
    static readonly Companion: Companion;
    constructor(offer: Offer, categoryIndex: number, offerIndex: number, amount: number, hasMerchant: boolean, merchantUUID: UUID);
    encode(buffer: RegistryFriendlyByteBuf): void;
    get amount(): number;
    get categoryIndex(): number;
    get hasMerchant(): boolean;
    get id(): ResourceLocation;
    get merchantUUID(): UUID;
    get offer(): Offer;
    get offerIndex(): number;
    sendToAllPlayers(): void;
    sendToPlayer(player: ServerPlayer): void;
    sendToPlayers(players: Iterable<ServerPlayer>): void;
    sendToPlayersAround(x: number, y: number, z: number, distance: number, worldKey: ResourceKey<Level>, exclusionCondition: Function1<ServerPlayer, boolean>): void;
    sendToServer(): void;
    type(): Type<BuyPacket>;
  }


  interface CloseShopPacket extends NetworkPacket<CloseShopPacket> {}
  class CloseShopPacket extends NetworkPacket<CloseShopPacket> {
    static readonly Companion: fr_harmex_cobbledollars_common_network_packets_c2s_closeshoppacket_Companion;
    constructor(merchantUUID: UUID);
    encode(buffer: RegistryFriendlyByteBuf): void;
    get id(): ResourceLocation;
    get merchantUUID(): UUID;
    sendToAllPlayers(): void;
    sendToPlayer(player: ServerPlayer): void;
    sendToPlayers(players: Iterable<ServerPlayer>): void;
    sendToPlayersAround(x: number, y: number, z: number, distance: number, worldKey: ResourceKey<Level>, exclusionCondition: Function1<ServerPlayer, boolean>): void;
    sendToServer(): void;
    type(): Type<CloseShopPacket>;
  }


  interface OpenBankPacket extends NetworkPacket<OpenBankPacket> {}
  class OpenBankPacket extends NetworkPacket<OpenBankPacket> {
    static readonly Companion: fr_harmex_cobbledollars_common_network_packets_c2s_openbankpacket_Companion;
    constructor(merchantUUID: UUID);
    encode(buffer: RegistryFriendlyByteBuf): void;
    get id(): ResourceLocation;
    get merchantUUID(): UUID;
    sendToAllPlayers(): void;
    sendToPlayer(player: ServerPlayer): void;
    sendToPlayers(players: Iterable<ServerPlayer>): void;
    sendToPlayersAround(x: number, y: number, z: number, distance: number, worldKey: ResourceKey<Level>, exclusionCondition: Function1<ServerPlayer, boolean>): void;
    sendToServer(): void;
    type(): Type<OpenBankPacket>;
  }


  interface OpenShopPacket extends NetworkPacket<OpenShopPacket> {}
  class OpenShopPacket extends NetworkPacket<OpenShopPacket> {
    static readonly Companion: fr_harmex_cobbledollars_common_network_packets_c2s_openshoppacket_Companion;
    constructor(merchantUUID: UUID);
    encode(buffer: RegistryFriendlyByteBuf): void;
    get id(): ResourceLocation;
    get merchantUUID(): UUID;
    sendToAllPlayers(): void;
    sendToPlayer(player: ServerPlayer): void;
    sendToPlayers(players: Iterable<ServerPlayer>): void;
    sendToPlayersAround(x: number, y: number, z: number, distance: number, worldKey: ResourceKey<Level>, exclusionCondition: Function1<ServerPlayer, boolean>): void;
    sendToServer(): void;
    type(): Type<OpenShopPacket>;
  }


  interface SellPacket extends NetworkPacket<SellPacket> {}
  class SellPacket extends NetworkPacket<SellPacket> {
    static readonly Companion: fr_harmex_cobbledollars_common_network_packets_c2s_sellpacket_Companion;
    encode(buffer: RegistryFriendlyByteBuf): void;
    get id(): ResourceLocation;
    sendToAllPlayers(): void;
    sendToPlayer(player: ServerPlayer): void;
    sendToPlayers(players: Iterable<ServerPlayer>): void;
    sendToPlayersAround(x: number, y: number, z: number, distance: number, worldKey: ResourceKey<Level>, exclusionCondition: Function1<ServerPlayer, boolean>): void;
    sendToServer(): void;
    type(): Type<SellPacket>;
  }


  interface UpdateMerchantShopPacket extends NetworkPacket<UpdateMerchantShopPacket> {}
  class UpdateMerchantShopPacket extends NetworkPacket<UpdateMerchantShopPacket> {
    static readonly Companion: fr_harmex_cobbledollars_common_network_packets_c2s_updatemerchantshoppacket_Companion;
    constructor(shop: Shop, merchantUUID: UUID);
    encode(buffer: RegistryFriendlyByteBuf): void;
    get id(): ResourceLocation;
    get merchantUUID(): UUID;
    get shop(): Shop;
    sendToAllPlayers(): void;
    sendToPlayer(player: ServerPlayer): void;
    sendToPlayers(players: Iterable<ServerPlayer>): void;
    sendToPlayersAround(x: number, y: number, z: number, distance: number, worldKey: ResourceKey<Level>, exclusionCondition: Function1<ServerPlayer, boolean>): void;
    sendToServer(): void;
    type(): Type<UpdateMerchantShopPacket>;
  }

}

declare module 'fr.harmex.cobbledollars.common.network.packets.c2s.BuyPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { BuyPacket } from 'fr.harmex.cobbledollars.common.network.packets.c2s';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): BuyPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'fr.harmex.cobbledollars.common.network.packets.c2s.CloseShopPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { CloseShopPacket } from 'fr.harmex.cobbledollars.common.network.packets.c2s';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): CloseShopPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'fr.harmex.cobbledollars.common.network.packets.c2s.OpenBankPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { OpenBankPacket } from 'fr.harmex.cobbledollars.common.network.packets.c2s';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): OpenBankPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'fr.harmex.cobbledollars.common.network.packets.c2s.OpenShopPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { OpenShopPacket } from 'fr.harmex.cobbledollars.common.network.packets.c2s';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): OpenShopPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'fr.harmex.cobbledollars.common.network.packets.c2s.SellPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { SellPacket } from 'fr.harmex.cobbledollars.common.network.packets.c2s';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buf: RegistryFriendlyByteBuf): SellPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'fr.harmex.cobbledollars.common.network.packets.c2s.UpdateMerchantShopPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { UpdateMerchantShopPacket } from 'fr.harmex.cobbledollars.common.network.packets.c2s';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): UpdateMerchantShopPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'fr.harmex.cobbledollars.common.network.packets.s2c' {
  import { NetworkPacket } from 'com.cobblemon.mod.common.api.net';
  import { Companion } from 'fr.harmex.cobbledollars.common.network.packets.s2c.SyncBankPacket';
  import { UUID } from 'java.util';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Iterable, Boolean } from 'java.lang';
  import { Level } from 'net.minecraft.world.level';
  import { Function1 } from 'kotlin.jvm.functions';
  import { Type } from 'CustomPacketPayload';
  import { Companion as fr_harmex_cobbledollars_common_network_packets_s2c_syncshopconfigpacket_Companion } from 'fr.harmex.cobbledollars.common.network.packets.s2c.SyncShopConfigPacket';
  import { Shop, Bank } from 'fr.harmex.cobbledollars.common.world.item.trading.shop';
  import { Companion as fr_harmex_cobbledollars_common_network_packets_s2c_syncshoppacket_Companion } from 'fr.harmex.cobbledollars.common.network.packets.s2c.SyncShopPacket';
  import { Companion as fr_harmex_cobbledollars_common_network_packets_s2c_updatestockpacket_Companion } from 'fr.harmex.cobbledollars.common.network.packets.s2c.UpdateStockPacket';

  interface SyncBankPacket extends NetworkPacket<SyncBankPacket> {}
  class SyncBankPacket extends NetworkPacket<SyncBankPacket> {
    static readonly Companion: Companion;
    constructor(containerId: number, merchantUUID: UUID);
    encode(buffer: RegistryFriendlyByteBuf): void;
    get containerId(): number;
    get id(): ResourceLocation;
    get merchantUUID(): UUID;
    sendToAllPlayers(): void;
    sendToPlayer(player: ServerPlayer): void;
    sendToPlayers(players: Iterable<ServerPlayer>): void;
    sendToPlayersAround(x: number, y: number, z: number, distance: number, worldKey: ResourceKey<Level>, exclusionCondition: Function1<ServerPlayer, boolean>): void;
    sendToServer(): void;
    type(): Type<SyncBankPacket>;
  }


  interface SyncShopConfigPacket extends NetworkPacket<SyncShopConfigPacket> {}
  class SyncShopConfigPacket extends NetworkPacket<SyncShopConfigPacket> {
    static readonly Companion: fr_harmex_cobbledollars_common_network_packets_s2c_syncshopconfigpacket_Companion;
    constructor(shop: Shop, bank: Bank);
    encode(buffer: RegistryFriendlyByteBuf): void;
    get bank(): Bank;
    get id(): ResourceLocation;
    get shop(): Shop;
    sendToAllPlayers(): void;
    sendToPlayer(player: ServerPlayer): void;
    sendToPlayers(players: Iterable<ServerPlayer>): void;
    sendToPlayersAround(x: number, y: number, z: number, distance: number, worldKey: ResourceKey<Level>, exclusionCondition: Function1<ServerPlayer, boolean>): void;
    sendToServer(): void;
    type(): Type<SyncShopConfigPacket>;
  }


  interface SyncShopPacket extends NetworkPacket<SyncShopPacket> {}
  class SyncShopPacket extends NetworkPacket<SyncShopPacket> {
    static readonly Companion: fr_harmex_cobbledollars_common_network_packets_s2c_syncshoppacket_Companion;
    constructor(containerId: number, shop: Shop, hasMerchant: boolean, merchantUUID: UUID, isEditMode: boolean);
    encode(buffer: RegistryFriendlyByteBuf): void;
    get containerId(): number;
    get hasMerchant(): boolean;
    get id(): ResourceLocation;
    get merchantUUID(): UUID;
    get shop(): Shop;
    isEditMode(): boolean;
    sendToAllPlayers(): void;
    sendToPlayer(player: ServerPlayer): void;
    sendToPlayers(players: Iterable<ServerPlayer>): void;
    sendToPlayersAround(x: number, y: number, z: number, distance: number, worldKey: ResourceKey<Level>, exclusionCondition: Function1<ServerPlayer, boolean>): void;
    sendToServer(): void;
    type(): Type<SyncShopPacket>;
  }


  interface UpdateStockPacket extends NetworkPacket<UpdateStockPacket> {}
  class UpdateStockPacket extends NetworkPacket<UpdateStockPacket> {
    static readonly Companion: fr_harmex_cobbledollars_common_network_packets_s2c_updatestockpacket_Companion;
    constructor(categoryIndex: number, offerIndex: number, newStock: number, merchantUUID: UUID);
    encode(buffer: RegistryFriendlyByteBuf): void;
    get categoryIndex(): number;
    get id(): ResourceLocation;
    get merchantUUID(): UUID;
    get newStock(): number;
    get offerIndex(): number;
    sendToAllPlayers(): void;
    sendToPlayer(player: ServerPlayer): void;
    sendToPlayers(players: Iterable<ServerPlayer>): void;
    sendToPlayersAround(x: number, y: number, z: number, distance: number, worldKey: ResourceKey<Level>, exclusionCondition: Function1<ServerPlayer, boolean>): void;
    sendToServer(): void;
    type(): Type<UpdateStockPacket>;
  }

}

declare module 'fr.harmex.cobbledollars.common.network.packets.s2c.SyncBankPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { SyncBankPacket } from 'fr.harmex.cobbledollars.common.network.packets.s2c';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): SyncBankPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'fr.harmex.cobbledollars.common.network.packets.s2c.SyncShopConfigPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { SyncShopConfigPacket } from 'fr.harmex.cobbledollars.common.network.packets.s2c';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): SyncShopConfigPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'fr.harmex.cobbledollars.common.network.packets.s2c.SyncShopPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { SyncShopPacket } from 'fr.harmex.cobbledollars.common.network.packets.s2c';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): SyncShopPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'fr.harmex.cobbledollars.common.network.packets.s2c.UpdateStockPacket' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { UpdateStockPacket } from 'fr.harmex.cobbledollars.common.network.packets.s2c';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    decode(buffer: RegistryFriendlyByteBuf): UpdateStockPacket;
    get iD(): ResourceLocation;
  }

}

declare module 'fr.harmex.cobbledollars.common.utils.adapters' {
  import { TypeAdapter } from 'com.google.gson';
  import { Bank, Shop } from 'fr.harmex.cobbledollars.common.world.item.trading.shop';
  import { JsonWriter, JsonReader } from 'com.google.gson.stream';
  import { OverlayPosition } from 'fr.harmex.cobbledollars.common.client.utils';

  interface BankAdapter extends TypeAdapter<Bank> {}
  class BankAdapter extends TypeAdapter<Bank> {
    read(reader: JsonReader): Bank;
    write(writer: JsonWriter, bank: Bank): void;
  }


  interface OverlayPositionAdapter extends TypeAdapter<OverlayPosition> {}
  class OverlayPositionAdapter extends TypeAdapter<OverlayPosition> {
    read(reader: JsonReader): OverlayPosition;
    write(writer: JsonWriter, overlayPosition: OverlayPosition): void;
  }


  interface ShopAdapter extends TypeAdapter<Shop> {}
  class ShopAdapter extends TypeAdapter<Shop> {
    read(reader: JsonReader): Shop;
    write(writer: JsonWriter, shop: Shop): void;
  }

}

declare module 'fr.harmex.cobbledollars.common.utils' {
  import { BigInteger } from 'java.math';

  class CobbleDollarsPlayer {
    cobbleDollars$getCobbleDollars(): BigInteger;
    cobbleDollars$setCobbleDollars(var1: BigInteger): void;
  }

}

declare module 'fr.harmex.cobbledollars.common.utils.extensions' {
  import { BigInteger } from 'java.math';
  import { StringReader } from 'com.mojang.brigadier';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { Tag, CompoundTag } from 'net.minecraft.nbt';
  import { Shop, Bank, Category, Offer } from 'fr.harmex.cobbledollars.common.world.item.trading.shop';
  import { RegistryAccess } from 'net.minecraft.core';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { CobbleDollarsShopHolder } from 'fr.harmex.cobbledollars.common.world.item.trading';
  import { File } from 'java.io';
  import { UUID, Map } from 'java.util';
  import { MinecraftServer } from 'net.minecraft.server';
  import { JsonObject } from 'com.google.gson';
  import { ServerPlayer } from 'net.minecraft.server.level';

  class BigIntegerExtensionsKt {
    static clamp($this$clamp: BigInteger, min: BigInteger, max: BigInteger): BigInteger;
    static format($this$format: BigInteger, dollarSign: boolean): MutableComponent;
    static format$default(bigInteger: BigInteger, bl: boolean, n: number, object: any): MutableComponent;
    static formatFull($this$formatFull: BigInteger, dollarSign: boolean): MutableComponent;
    static formatFull$default(bigInteger: BigInteger, bl: boolean, n: number, object: any): MutableComponent;
    static readBigInt($this$readBigInt: StringReader): BigInteger;
  }


  class CompoundTagExtensionKt {
    static getBigInt($this$getBigInt: CompoundTag, key: string): BigInteger;
    static getShop($this$getShop: CompoundTag, registryAccess: RegistryAccess): Shop;
    static putBigInt($this$putBigInt: CompoundTag, key: string, value: BigInteger): void;
    static putShop($this$putShop: CompoundTag, shop: Shop, registryAccess: RegistryAccess): Tag;
  }


  class FriendlyByteBufExtensionKt {
    static readBank($this$readBank: FriendlyByteBuf): Bank;
    static readBigInt($this$readBigInt: FriendlyByteBuf): BigInteger;
    static readCategory($this$readCategory: FriendlyByteBuf): Category;
    static readOffer($this$readOffer: FriendlyByteBuf): Offer;
    static readShop($this$readShop: FriendlyByteBuf): Shop;
    static writeBank($this$writeBank: FriendlyByteBuf, bank: Bank): void;
    static writeBigInt($this$writeBigInt: FriendlyByteBuf, bigInt: BigInteger): FriendlyByteBuf;
    static writeCategory($this$writeCategory: FriendlyByteBuf, category: Category): void;
    static writeOffer($this$writeOffer: FriendlyByteBuf, offer: Offer): void;
    static writeShop($this$writeShop: FriendlyByteBuf, shop: Shop): void;
  }


  class PlayerExtensionKt {
    static addOfflineCobbleDollars($this$addOfflineCobbleDollars: UUID, server: MinecraftServer, amount: BigInteger): boolean;
    static addOfflineCobbleDollarsLegacy($this$addOfflineCobbleDollarsLegacy: UUID, server: MinecraftServer, amount: BigInteger): boolean;
    static canBuy($this$canBuy: Player, price: BigInteger): boolean;
    static earnOfflineCobbleDollars($this$earnOfflineCobbleDollars: ServerPlayer): void;
    static getAccountFile($this$getAccountFile: UUID, server: MinecraftServer): File;
    static getAllPlayerCobbleDollars($this$getAllPlayerCobbleDollars: MinecraftServer): Map<string, BigInteger>;
    static getCobbleDollars($this$cobbleDollars: Player): BigInteger;
    static getMaxAmountObtainable($this$getMaxAmountObtainable: Player, itemStack: ItemStack): number;
    static getMaxAmountPurchasable($this$getMaxAmountPurchasable: Player, unitPrice: BigInteger): number;
    static getOfflineCobbleDollars($this$getOfflineCobbleDollars: UUID, server: MinecraftServer): BigInteger;
    static getOfflineCobbleDollarsLegacy($this$getOfflineCobbleDollarsLegacy: UUID, server: MinecraftServer): BigInteger;
    static loadJson($this$loadJson: File): JsonObject;
    static loginCobbleDollarsAccount($this$loginCobbleDollarsAccount: ServerPlayer): void;
    static logoutCobbleDollarsAccount($this$logoutCobbleDollarsAccount: ServerPlayer): void;
    static openBank($this$openBank: Player, cobbleMerchant: CobbleDollarsShopHolder): void;
    static openBank($this$openBank: Player): void;
    static openBank$default(player: Player, cobbleDollarsShopHolder: CobbleDollarsShopHolder, n: number, object: any): void;
    static openShop($this$openShop: Player, cobbleMerchant: CobbleDollarsShopHolder, isEditMode: boolean): void;
    static openShop($this$openShop: Player, cobbleMerchant: CobbleDollarsShopHolder): void;
    static openShop($this$openShop: Player): void;
    static openShop$default(player: Player, cobbleDollarsShopHolder: CobbleDollarsShopHolder, bl: boolean, n: number, object: any): void;
    static setCobbleDollars($this$cobbleDollars: Player, value: BigInteger): void;
    static updateCobbleDollarsAccount($this$updateCobbleDollarsAccount: ServerPlayer): void;
  }

}

declare module 'fr.harmex.cobbledollars.common.world.cobbledollars' {
  import { BigInteger } from 'java.math';

  class CobbleDollarsAccount {
    constructor(playerName: string, balance: BigInteger);
    component1(): string;
    component2(): BigInteger;
    copy(playerName: string, balance: BigInteger): CobbleDollarsAccount;
    static copy$default(cobbleDollarsAccount: CobbleDollarsAccount, string: string, bigInteger: BigInteger, n: number, object: any): CobbleDollarsAccount;
    equals(other: any): boolean;
    get balance(): BigInteger;
    get playerName(): string;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'fr.harmex.cobbledollars.common.world' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { MinecraftServer } from 'net.minecraft.server';

  class CobbleDollarsStructures {
    static readonly INSTANCE: CobbleDollarsStructures;
    get desertVillagersPoolLocation(): ResourceLocation;
    get plainsVillagersPoolLocation(): ResourceLocation;
    get savannaVillagersPoolLocation(): ResourceLocation;
    get snowyVillagersPoolLocation(): ResourceLocation;
    get taigaVillagersPoolLocation(): ResourceLocation;
    register(server: MinecraftServer): void;
  }

}

declare module 'fr.harmex.cobbledollars.common.world.entity' {
  import { CobbleDollarsShopHolder } from 'fr.harmex.cobbledollars.common.world.item.trading';
  import { Shop } from 'fr.harmex.cobbledollars.common.world.item.trading.shop';
  import { UUID, Set } from 'java.util';
  import { Player } from 'net.minecraft.world.entity.player';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { PlatformRegistry } from 'com.cobblemon.mod.common.platform';
  import { Registry } from 'net.minecraft.core';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { EntityType, LivingEntity, PathfinderMob, SpawnGroupData, MobSpawnType } from 'net.minecraft.world.entity';
  import { Function2 } from 'kotlin.jvm.functions';
  import { Builder } from 'AttributeSupplier';
  import { Unit } from 'kotlin';
  import { VillagerDataHolder, Npc, VillagerData } from 'net.minecraft.world.entity.npc';
  import { Companion } from 'fr.harmex.cobbledollars.common.world.entity.CobbleMerchant';
  import { Level, ServerLevelAccessor } from 'net.minecraft.world.level';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { DifficultyInstance } from 'net.minecraft.world';

  interface ClientSideCobbleDollarsShopHolder extends CobbleDollarsShopHolder {}
  class ClientSideCobbleDollarsShopHolder extends CobbleDollarsShopHolder {
    constructor(shop: Shop, merchantUUID: UUID, tradingPlayers: Set<Player>);

    constructor(shop: Shop, uUID: UUID, set: Set, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor();
    component1(): Shop;
    component2(): UUID;
    component3(): Set<Player>;
    copy(shop: Shop, merchantUUID: UUID, tradingPlayers: Set<Player>): ClientSideCobbleDollarsShopHolder;
    static copy$default(clientSideCobbleDollarsShopHolder: ClientSideCobbleDollarsShopHolder, shop: Shop, uUID: UUID, set: Set, n: number, object: any): ClientSideCobbleDollarsShopHolder;
    equals(other: any): boolean;
    get merchantUUID(): UUID;
    get shop(): Shop;
    get tradingPlayers(): Set<Player>;
    hashCode(): number;
    set merchantUUID(uUID: UUID);
    set shop(shop: Shop);
    set tradingPlayers(set: Set<Player>);
    toString(): string;
  }


  interface CobbleDollarsEntities extends PlatformRegistry<Registry, ResourceKey, EntityType> {}
  class CobbleDollarsEntities extends PlatformRegistry<Registry, ResourceKey, EntityType> {
    static readonly INSTANCE: CobbleDollarsEntities;
    static readonly COBBLE_MERCHANT_KEY: ResourceLocation;
    static readonly COBBLE_MERCHANT: EntityType;
    get registry(): Registry<EntityType<any>>;
    get resourceKey(): ResourceKey<Registry<EntityType<any>>>;
    registerAttributes(consumer: Function2<EntityType<LivingEntity>, Builder, Unit>): void;
  }


  class CobbleDollarsEntity {
    get shop(): Shop;
    set shop(var1: Shop);
  }


  interface CobbleMerchant extends CobbleDollarsShopHolder, VillagerDataHolder, Npc, PathfinderMob {}
  class CobbleMerchant extends CobbleDollarsShopHolder {
    static readonly Companion: Companion;
    constructor(type: EntityType<CobbleMerchant>, level: Level);

    constructor(entityType: EntityType, level: Level, n: number, defaultConstructorMarker: DefaultConstructorMarker);
    addAdditionalSaveData(compound: CompoundTag): void;
    finalizeSpawn(level: ServerLevelAccessor, difficulty: DifficultyInstance, spawnType: MobSpawnType, spawnGroupData: SpawnGroupData): SpawnGroupData;
    get merchantUUID(): UUID;
    get shop(): Shop;
    get tradingPlayers(): Set<Player>;
    get villagerData(): VillagerData;
    invoke(p0: VillagerData): void;
    readAdditionalSaveData(compound: CompoundTag): void;
    removeWhenFarAway(distanceToClosestPlayer: number): boolean;
    set merchantUUID(uUID: UUID);
    set shop(shop: Shop);
    set tradingPlayers(set: Set<Player>);
    set villagerData(villagerData: VillagerData);
  }

}

declare module 'fr.harmex.cobbledollars.common.world.entity.CobbleMerchant' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { EntityDataAccessor } from 'net.minecraft.network.syncher';
  import { VillagerData } from 'net.minecraft.world.entity.npc';
  import { Builder } from 'AttributeSupplier';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    createAttributes(): Builder;
    get dATA_VILLAGER_DATA(): EntityDataAccessor<VillagerData>;
  }

}

declare module 'fr.harmex.cobbledollars.common.world.entity.villager' {
  import { PlatformRegistry } from 'com.cobblemon.mod.common.platform';
  import { Registry } from 'net.minecraft.core';
  import { ResourceKey } from 'net.minecraft.resources';
  import { PoiType } from 'net.minecraft.world.entity.ai.village.poi';
  import { VillagerProfession } from 'net.minecraft.world.entity.npc';

  interface CobbleDollarsPoiTypes extends PlatformRegistry<Registry, ResourceKey, PoiType> {}
  class CobbleDollarsPoiTypes extends PlatformRegistry<Registry, ResourceKey, PoiType> {
    static readonly INSTANCE: CobbleDollarsPoiTypes;
    static readonly COBBLE_MERCHANT_KEY: ResourceKey;
    static readonly COBBLE_MERCHANT: PoiType;
    get registry(): Registry<PoiType>;
    get resourceKey(): ResourceKey<Registry<PoiType>>;
  }


  interface CobbleDollarsProfessions extends PlatformRegistry<Registry, ResourceKey, VillagerProfession> {}
  class CobbleDollarsProfessions extends PlatformRegistry<Registry, ResourceKey, VillagerProfession> {
    static readonly INSTANCE: CobbleDollarsProfessions;
    static readonly COBBLE_MERCHANT: VillagerProfession;
    get registry(): Registry<VillagerProfession>;
    get resourceKey(): ResourceKey<Registry<VillagerProfession>>;
  }

}

declare module 'fr.harmex.cobbledollars.common.world.inventory' {
  import { AbstractContainerMenu, MenuType } from 'net.minecraft.world.inventory';
  import { Inventory, Player } from 'net.minecraft.world.entity.player';
  import { CobbleDollarsShopHolder } from 'fr.harmex.cobbledollars.common.world.item.trading';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { SimpleContainer } from 'net.minecraft.world';
  import { ItemStack } from 'net.minecraft.world.item';
  import { PlatformRegistry } from 'com.cobblemon.mod.common.platform';
  import { Registry } from 'net.minecraft.core';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Shop } from 'fr.harmex.cobbledollars.common.world.item.trading.shop';

  interface BankMenu extends AbstractContainerMenu {}
  class BankMenu extends AbstractContainerMenu {
    constructor(containerId: number, playerInventory: Inventory, player: Player, cobbleMerchant: CobbleDollarsShopHolder);

    constructor(n: number, inventory: Inventory, player: Player, cobbleDollarsShopHolder: CobbleDollarsShopHolder, n2: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(containerId: number, playerInventory: Inventory, player: Player);

    constructor(containerId: number, playerInventory: Inventory);
    get bankContainer(): SimpleContainer;
    get cobbleMerchant(): CobbleDollarsShopHolder;
    quickMoveStack(player: Player, index: number): ItemStack;
    removed(player: Player): void;
    set cobbleMerchant(cobbleDollarsShopHolder: CobbleDollarsShopHolder);
    stillValid(player: Player): boolean;
  }


  interface CobbleDollarsMenus extends PlatformRegistry<Registry, ResourceKey, MenuType> {}
  class CobbleDollarsMenus extends PlatformRegistry<Registry, ResourceKey, MenuType> {
    static readonly INSTANCE: CobbleDollarsMenus;
    static readonly SHOP: MenuType;
    static readonly BANK: MenuType;
    get registry(): Registry<MenuType<any>>;
    get resourceKey(): ResourceKey<Registry<MenuType<any>>>;
  }


  interface ShopMenu extends AbstractContainerMenu {}
  class ShopMenu extends AbstractContainerMenu {
    constructor(containerId: number, playerInventory: Inventory, player: Player, cobbleMerchant: CobbleDollarsShopHolder);

    constructor(n: number, inventory: Inventory, player: Player, cobbleDollarsShopHolder: CobbleDollarsShopHolder, n2: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(containerId: number, playerInventory: Inventory, player: Player);

    constructor(containerId: number, playerInventory: Inventory);
    get cobbleMerchant(): CobbleDollarsShopHolder;
    get hasMerchant(): boolean;
    get shop(): Shop;
    quickMoveStack(player: Player, index: number): ItemStack;
    set cobbleMerchant(cobbleDollarsShopHolder: CobbleDollarsShopHolder);
    set hasMerchant(bl: boolean);
    set shop(shop: Shop);
    stillValid(player: Player): boolean;
  }

}

declare module 'fr.harmex.cobbledollars.common.world.item' {
  import { PlatformRegistry } from 'com.cobblemon.mod.common.platform';
  import { Registry } from 'net.minecraft.core';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Item, SpawnEggItem } from 'net.minecraft.world.item';

  interface CobbleDollarsItems extends PlatformRegistry<Registry, ResourceKey, Item> {}
  class CobbleDollarsItems extends PlatformRegistry<Registry, ResourceKey, Item> {
    static readonly INSTANCE: CobbleDollarsItems;
    static readonly COBBLE_MERCHANT_SPAWN_EGG: SpawnEggItem;
    get registry(): Registry<Item>;
    get resourceKey(): ResourceKey<Registry<Item>>;
  }

}

declare module 'fr.harmex.cobbledollars.common.world.item.trading' {
  import { Shop } from 'fr.harmex.cobbledollars.common.world.item.trading.shop';
  import { UUID, Set } from 'java.util';
  import { Player } from 'net.minecraft.world.entity.player';

  class CobbleDollarsShopHolder {
    get merchantUUID(): UUID;
    get shop(): Shop;
    get tradingPlayers(): Set<Player>;
    set merchantUUID(var1: UUID);
    set shop(var1: Shop);
    set tradingPlayers(var1: Set<Player>);
  }

}

declare module 'fr.harmex.cobbledollars.common.world.item.trading.shop' {
  import { ArrayList } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Integer } from 'java.lang';
  import { BigInteger } from 'java.math';
  import { Companion } from 'fr.harmex.cobbledollars.common.world.item.trading.shop.Offer';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Minecraft } from 'net.minecraft.client';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface Bank extends ArrayList<Offer> {}
  class Bank extends ArrayList<Offer> {
    constructor();

    constructor(offers: ArrayList<Offer>);

    constructor(...offer: Offer[]);
    contains(itemStack: ItemStack): boolean;
    get(itemStack: ItemStack): Offer;
  }


  class Category {
    constructor(name: string, offers: ArrayList<Offer>);
    add(item: ItemStack, price: BigInteger): boolean;
    add(offer: Offer): boolean;
    addOffer(offer: Offer, index: number): void;
    static addOffer$default(category: Category, offer: Offer, n: number, n2: number, object: any): void;
    copy(): Category;
    del(item: ItemStack, price: BigInteger): boolean;
    del(offer: Offer): boolean;
    static del$default(category: Category, itemStack: ItemStack, bigInteger: BigInteger, n: number, object: any): boolean;
    delOffer(offer: Offer, index: number): void;
    static delOffer$default(category: Category, offer: Offer, n: number, n2: number, object: any): void;
    get name(): string;
    get offers(): ArrayList<Offer>;
    moveOffer(offer: Offer, to: number): void;
    set name(string: string);
  }


  class Offer {
    static readonly Companion: Companion;
    constructor(item: ItemStack, price: BigInteger, stock: number);

    constructor(itemStack: ItemStack, bigInteger: BigInteger, n: number, n2: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(item: ItemStack, price: number, stock: number);

    constructor(itemStack: ItemStack, n: number, n2: number, n3: number, defaultConstructorMarker: DefaultConstructorMarker);
    copy(): Offer;
    equals(other: any): boolean;
    equalsWithoutStock(other: Offer): boolean;
    get item(): ItemStack;
    get price(): BigInteger;
    get stock(): number;
    getDisplayName(player: Player): MutableComponent;
    getHoverName(player: Player): Component;
    hashCode(): number;
    isItem(itemStack: ItemStack): boolean;
    renderTooltip(minecraft: Minecraft, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    set item(itemStack: ItemStack);
    set price(bigInteger: BigInteger);
    set stock(n: number);
  }

}

declare module 'fr.harmex.cobbledollars.common.world.item.trading.shop.Offer' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Offer } from 'fr.harmex.cobbledollars.common.world.item.trading.shop';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    hashItemAndPrice(offer: Offer): number;
  }

}

declare module 'fr.harmex.cobbledollars.neoforge.client' {
  import { CobbleDollarsClientImplementation } from 'fr.harmex.cobbledollars.common.client';
  import { EntityType, Entity } from 'net.minecraft.world.entity';
  import { EntityRendererProvider } from 'net.minecraft.client.renderer.entity';

  interface CobbleDollarsNeoForgeClient extends CobbleDollarsClientImplementation {}
  class CobbleDollarsNeoForgeClient extends CobbleDollarsClientImplementation {
    static readonly INSTANCE: CobbleDollarsNeoForgeClient;
    init(): void;
    registerEntityRenderer<T extends Entity>(type: EntityType<T>, factory: EntityRendererProvider<T>): void;
  }

}

declare module 'fr.harmex.cobbledollars.neoforge' {
  import { CobbleDollarsImplementation } from 'fr.harmex.cobbledollars.common';
  import { FMLCommonSetupEvent } from 'net.neoforged.fml.event.lifecycle';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { KClass } from 'kotlin.reflect';
  import { ArgumentTypeInfo } from 'net.minecraft.commands.synchronization';
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { Template } from 'ArgumentTypeInfo';

  interface CobbleDollarsNeoForge extends CobbleDollarsImplementation {}
  class CobbleDollarsNeoForge extends CobbleDollarsImplementation {
    static readonly INSTANCE: CobbleDollarsNeoForge;
    get networkManager(): CobbleDollarsNeoForgeNetworkManager;
    init(event: FMLCommonSetupEvent): void;
    isModLoaded(modID: string): boolean;
    registerCommandArgument<A extends ArgumentType<any>, T extends Template<A>>(location: ResourceLocation, argumentClass: KClass<A>, serializer: ArgumentTypeInfo<A, T>): void;
    registerEntityAttributes(): void;
    registerEntityDataSerializers(): void;
    registerEntityTypes(): void;
    registerItems(): void;
    registerMenus(): void;
    registerVillagers(): void;
  }

}