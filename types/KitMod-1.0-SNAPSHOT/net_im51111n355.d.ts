declare module 'net.im51111n355.kitmod.client.graphics' {
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Component } from 'net.minecraft.network.chat';
  import { RegisterClientReloadListenersEvent } from 'net.neoforged.neoforge.client.event';
  import { ResourceManager } from 'net.minecraft.server.packs.resources';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ShaderInstance, RenderType } from 'net.minecraft.client.renderer';
  import { List } from 'java.util';

  class CharacterEvalResult {
    constructor(x: number, y: number, width: number, height: number, u0: number, u1: number, v0: number, v1: number);
    get height(): number;
    get u0(): number;
    get u1(): number;
    get v0(): number;
    get v1(): number;
    get width(): number;
    get x(): number;
    get y(): number;
  }


  interface GuiGraphicsScissorFixes extends GuiGraphics {}
  class GuiGraphicsScissorFixes extends GuiGraphics {
    constructor(underlying: GuiGraphics, associatedScreen: ReferenceSizeScreen);
    enableScissor(minX: number, minY: number, maxX: number, maxY: number): void;
    get associatedScreen(): ReferenceSizeScreen;
    get underlying(): GuiGraphics;
    guiHeight(): number;
    guiWidth(): number;
  }


  interface ReferenceSizeScreen extends Screen {}
  class ReferenceSizeScreen extends Screen {
    constructor(narrationTitle: Component);
    get refHeight(): number;
    get refWidth(): number;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    renderBackground(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    renderInRefEarly(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, pt: number): void;
    renderInRefLate(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, pt: number): void;
  }


  class RenderUtilsKt {
    static drawRoundedRectangle($this$drawRoundedRectangle: GuiGraphics, x: number, y: number, width: number, height: number, radius: number, color: number, fillMin: number, fillMax: number): void;
    static drawRoundedRectangle$default(guiGraphics: GuiGraphics, n: number, n2: number, n3: number, n4: number, n5: number, n6: number, f: number, f2: number, n7: number, object: any): void;
  }


  class SDFFontRegistration {
    static readonly INSTANCE: SDFFontRegistration;
    static PROXIMANOVA_BOLD: SDFFont;
    static PROXIMANOVA_REGULAR: SDFFont;
    static access$load($this: SDFFontRegistration, resourceManager: ResourceManager, font: ResourceLocation, knownSize: number, spread: number, correction: number, pageWidth: number, pageHeight: number): SDFFont;
    get pROXIMANOVA_BOLD(): SDFFont;
    get pROXIMANOVA_REGULAR(): SDFFont;
    onRegisterListeners(event: RegisterClientReloadListenersEvent): void;
    onResourceManagerReload(resourceManager: ResourceManager): void;
    set pROXIMANOVA_BOLD(sDFFont: SDFFont);
    set pROXIMANOVA_REGULAR(sDFFont: SDFFont);
  }


  class SDFGlyph {
    constructor(x: number, y: number, width: number, height: number, xOffset: number, yOffset: number, xAdvance: number);
    get height(): number;
    get width(): number;
    get x(): number;
    get xAdvance(): number;
    get xOffset(): number;
    get y(): number;
    get yOffset(): number;
  }


  class ShaderRegistration {
    static readonly INSTANCE: ShaderRegistration;
    static SOLID_ROUNDED_RECTANGLE_SHADER: ShaderInstance;
    static SDFFONT_SHADER: ShaderInstance;
    get (): any;
    get (): any;
    get sDFFONT_SHADER(): ShaderInstance;
    get sOLID_ROUNDED_RECTANGLE_RT(): RenderType;
    get sOLID_ROUNDED_RECTANGLE_SHADER(): ShaderInstance;
    getSDFFontRt(forPage: ResourceLocation): RenderType;
    set(value: any): void;
    set (value: any);
    set (value: any);
    set sDFFONT_SHADER(shaderInstance: ShaderInstance);
    set sOLID_ROUNDED_RECTANGLE_SHADER(shaderInstance: ShaderInstance);
  }


  class StrEvalResult {
    constructor(applyScale: number, expectedHeight: number, expectedWidth: number, spread: number, chars: CharacterEvalResult[]);
    get applyScale(): number;
    get chars(): CharacterEvalResult[];
    get expectedHeight(): number;
    get expectedWidth(): number;
    get spread(): number;
  }

}

declare module 'net.im51111n355.kitmod.client' {
  import { List, Map, UUID } from 'java.util';
  import { Kit } from 'net.im51111n355.kitmod.common.data';
  import { Long, Boolean } from 'java.lang';

  class KitClientState {
    static readonly INSTANCE: KitClientState;
    get kNOWN_KITS(): Kit[];
    get kNOWN_PERMISSIONS(): Map<UUID, boolean>;
    get lAST_COLLECTION_TIME(): Map<UUID, Long>;
  }

}

declare module 'net.im51111n355.kitmod.client.network' {
  import { S2CBuyResult, S2CGuiControl, S2CSyncKits } from 'net.im51111n355.kitmod.common.network.messages';
  import { IPayloadContext } from 'net.neoforged.neoforge.network.handling';

  class BuyResultHandler {
    static readonly INSTANCE: BuyResultHandler;
    handle(msg: S2CBuyResult, ctx: IPayloadContext): void;
  }


  class OpenKitGuiHandler {
    static readonly INSTANCE: OpenKitGuiHandler;
    handle(msg: S2CGuiControl, ctx: IPayloadContext): void;
  }


  class SyncKitsHandler {
    static readonly INSTANCE: SyncKitsHandler;
    handle(msg: S2CSyncKits, ctx: IPayloadContext): void;
  }

}

declare module 'net.im51111n355.kitmod.client.screen' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ReferenceSizeScreen } from 'net.im51111n355.kitmod.client.graphics';
  import { BuyResult, Kit } from 'net.im51111n355.kitmod.common.data';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class LockupState {
    constructor($constructor_marker: DefaultConstructorMarker);
  }


  interface ModalScreen extends ReferenceSizeScreen {}
  class ModalScreen extends ReferenceSizeScreen {
    constructor(cause: BuyResult);
    get cause(): BuyResult;
    get refHeight(): number;
    get refWidth(): number;
    isPauseScreen(): boolean;
    renderInRefEarly(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, pt: number): void;
  }


  interface SpecificKitScreen extends ReferenceSizeScreen {}
  class SpecificKitScreen extends ReferenceSizeScreen {
    constructor(kit: Kit);
    get kit(): Kit;
    get refHeight(): number;
    get refWidth(): number;
    handleResult(result: BuyResult): void;
    isPauseScreen(): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    renderInRefEarly(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, pt: number): void;
    shouldCloseOnEsc(): boolean;
  }

}

declare module 'net.im51111n355.kitmod.client.screen.LockupState' {
  import { LockupState } from 'net.im51111n355.kitmod.client.screen';
  import { BuyResult } from 'net.im51111n355.kitmod.common.data';

  interface Complete extends LockupState {}
  class Complete extends LockupState {
    constructor(result: BuyResult);
    get result(): BuyResult;
  }


  interface None extends LockupState {}
  class None extends LockupState {
    constructor();
  }


  interface Waiting extends LockupState {}
  class Waiting extends LockupState {
    constructor();
  }

}

declare module 'net.im51111n355.kitmod.client.screen.widget' {
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { SDFFont } from 'net.im51111n355.kitmod.client.graphics';
  import { Function1, Function0 } from 'kotlin.jvm.functions';
  import { Unit } from 'kotlin';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { List } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Kit } from 'net.im51111n355.kitmod.common.data';

  interface CustomButtonWidget extends AbstractWidget {}
  class CustomButtonWidget extends AbstractWidget {
    constructor(x: number, y: number, w: number, h: number, rounding: number, idleColor: number, hoverColor: number, blockedColor: number, fillMin: number, fillMax: number, fontSize: number, font: SDFFont, fontColor: number, tick: Function1<CustomButtonWidget, Unit>, label: string, onClick: Function0<Unit>, icon: ResourceLocation);

    constructor(n: number, n2: number, n3: number, n4: number, n5: number, n6: number, n7: number, n8: number, f: number, f2: number, n9: number, sDFFont: SDFFont, n10: number, function1: Function1, string: string, function0: Function0, resourceLocation: ResourceLocation, n11: number, defaultConstructorMarker: DefaultConstructorMarker);
    get blockedColor(): number;
    get enabled(): boolean;
    get fillMax(): number;
    get fillMin(): number;
    get font(): SDFFont;
    get fontColor(): number;
    get fontSize(): number;
    get hoverColor(): number;
    get icon(): ResourceLocation;
    get idleColor(): number;
    get label(): string;
    get onClick(): Function0<Unit>;
    get rounding(): number;
    get tick(): Function1<CustomButtonWidget, Unit>;
    set blockedColor(n: number);
    set enabled(bl: boolean);
    set fillMax(f: number);
    set fillMin(f: number);
    set font(sDFFont: SDFFont);
    set fontColor(n: number);
    set fontSize(n: number);
    set hoverColor(n: number);
    set icon(resourceLocation: ResourceLocation);
    set idleColor(n: number);
    set label(string: string);
    set onClick(function0: Function0<Unit>);
    set rounding(n: number);
    set tick(function1: Function1<CustomButtonWidget, Unit>);
  }


  interface InventoryViewWidget extends AbstractWidget {}
  class InventoryViewWidget extends AbstractWidget {
    constructor(placeX: number, placeY: number, list: ItemStack[]);
  }


  interface KitCardWidget extends AbstractWidget {}
  class KitCardWidget extends AbstractWidget {
    constructor(kit: Kit);
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
  }


  interface ModalNotificationWidget extends AbstractWidget {}
  class ModalNotificationWidget extends AbstractWidget {
    constructor(x: number, y: number);
  }


  interface ScrollStateWidget extends AbstractWidget {}
  class ScrollStateWidget extends AbstractWidget {
    constructor(x: number, y: number, associatedCardListWidget: WrappingCardListWidget<any>, fullHeight: number);
  }


  class WrappingCardListEvalExtras {
    constructor(contentHeight: number, contentWidth: number);
    get contentHeight(): number;
    get contentWidth(): number;
  }

}

declare module 'net.im51111n355.kitmod.client.util' {
  import { ResourceLocation } from 'net.minecraft.resources';

  class KitModAssets {
    static readonly INSTANCE: KitModAssets;
    get bOX(): ResourceLocation;
    get cARD_AGENT(): ResourceLocation;
    get cARD_BMODER(): ResourceLocation;
    get cARD_CRYSTALL(): ResourceLocation;
    get cARD_DEFAULT(): ResourceLocation;
    get cARD_DELUXE(): ResourceLocation;
    get cARD_PREMIUM(): ResourceLocation;
    get cARD_SHPION(): ResourceLocation;
    get cARD_VIP(): ResourceLocation;
    get fONT_PN_BOLD(): ResourceLocation;
    get fONT_PN_REGULAR(): ResourceLocation;
    get iCON_AGENT(): ResourceLocation;
    get iCON_BMODER(): ResourceLocation;
    get iCON_CRYSTALL(): ResourceLocation;
    get iCON_DEFAULT(): ResourceLocation;
    get iCON_DELUXE(): ResourceLocation;
    get iCON_PREMIUM(): ResourceLocation;
    get iCON_SHPION(): ResourceLocation;
    get iCON_TIME(): ResourceLocation;
    get iCON_VIP(): ResourceLocation;
    get iNVENTORY(): ResourceLocation;
    get mISC_ELEMENTS(): ResourceLocation;
    get mODAL(): ResourceLocation;
  }

}

declare module 'net.im51111n355.kitmod.common.data' {
  import { Enum, Integer, Long } from 'java.lang';
  import { EnumEntries } from 'kotlin.enums';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Companion } from 'net.im51111n355.kitmod.common.data.Kit';
  import { UUID, List, Map } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';

  interface BuyResult extends Enum<BuyResult> {}
  class BuyResult extends Enum<BuyResult> {
    static readonly FAIL_BALANCE: BuyResult;
    static readonly FAIL_DESYNC: BuyResult;
    static readonly FAIL_SPACE: BuyResult;
    static readonly FAIL_API: BuyResult;
    static readonly SUCCESS: BuyResult;
    static get entries(): EnumEntries<BuyResult>;
    get header(): string;
    get subtitle(): string;
    static valueOf(value: string): BuyResult;
    static values(): BuyResult[];
  }


  interface CardStyle extends Enum<CardStyle> {}
  class CardStyle extends Enum<CardStyle> {
    static readonly DEFAULT: CardStyle;
    static readonly VIP: CardStyle;
    static readonly PREMIUM: CardStyle;
    static readonly DELUXE: CardStyle;
    static readonly SHPION: CardStyle;
    static readonly AGENT: CardStyle;
    static readonly BMODER: CardStyle;
    static readonly CRYSTALL: CardStyle;
    get accentColor(): number;
    get card(): ResourceLocation;
    static get entries(): EnumEntries<CardStyle>;
    get icon(): ResourceLocation;
    static valueOf(value: string): CardStyle;
    static values(): CardStyle[];
  }


  class Kit {
    static readonly Companion: Companion;
    constructor(id: UUID, items: ItemStack[], cardStyle: CardStyle, name: string, visibility: boolean, price: number, permissionData: PermissionData);
    component1(): UUID;
    component2(): ItemStack[];
    component3(): CardStyle;
    component4(): string;
    component5(): boolean;
    component6(): number;
    component7(): PermissionData;
    copy(id: UUID, items: ItemStack[], cardStyle: CardStyle, name: string, visibility: boolean, price: number, permissionData: PermissionData): Kit;
    static copy$default(kit: Kit, uUID: UUID, list: List, cardStyle: CardStyle, string: string, bl: boolean, n: number, permissionData: PermissionData, n2: number, object: any): Kit;
    equals(other: any): boolean;
    get cardStyle(): CardStyle;
    get id(): UUID;
    get items(): ItemStack[];
    get name(): string;
    get permissionData(): PermissionData;
    get price(): number;
    get visibility(): boolean;
    hashCode(): number;
    toString(): string;
  }


  class UUIDTimingMapKt {
    static convert($this$convert: Map<UUID, Long>): Map<UUID, Long>;
  }

}

declare module 'net.im51111n355.kitmod.common.data.Kit' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { Kit } from 'net.im51111n355.kitmod.common.data';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get sTREAM_CODEC(): StreamCodec<RegistryFriendlyByteBuf, Kit>;
  }

}

declare module 'net.im51111n355.kitmod.common.network.messages' {
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { Companion } from 'net.im51111n355.kitmod.common.network.messages.S2CBuyResult';
  import { BuyResult } from 'net.im51111n355.kitmod.common.data';
  import { Type } from 'CustomPacketPayload';

  interface S2CBuyResult extends CustomPacketPayload {}
  class S2CBuyResult extends CustomPacketPayload {
    static readonly Companion: Companion;
    constructor(result: BuyResult);
    get result(): BuyResult;
    type(): Type<S2CBuyResult>;
  }

}

declare module 'net.im51111n355.kitmod.common.network.messages.S2CBuyResult' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { S2CBuyResult } from 'net.im51111n355.kitmod.common.network.messages';
  import { Type } from 'CustomPacketPayload';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get sTREAM_CODEC(): StreamCodec<FriendlyByteBuf, S2CBuyResult>;
    get tYPE(): Type<S2CBuyResult>;
  }

}

declare module 'net.im51111n355.kitmod.common.network' {
  class NetworkRegistration {
    static readonly INSTANCE: NetworkRegistration;
  }

}

declare module 'net.im51111n355.kitmod' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Function0 } from 'kotlin.jvm.functions';
  import { Unit } from 'kotlin';

  class KitMod {
    static readonly INSTANCE: KitMod;
    static readonly MOD_ID: string;
  }


  class KitModKt {
    static readonly INCLUDE_SERVER: boolean;
    static ifClient(func: Function0<Unit>): void;
    static ifServer(func: Function0<Unit>): void;
    static ifServer<T>(func: Function0<T>): T;
    static kitModResource(path: string): ResourceLocation;
    static mcResource(path: string): ResourceLocation;
  }

}

declare module 'net.im51111n355.kitmod.server.adapter' {
  import { JsonSerializer, JsonDeserializer, JsonElement, JsonSerializationContext, JsonDeserializationContext } from 'com.google.gson';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Type } from 'java.lang.reflect';

  interface ItemStackAdapter extends JsonSerializer<ItemStack>, JsonDeserializer<ItemStack> {}
  class ItemStackAdapter extends JsonSerializer<ItemStack> {
    static readonly INSTANCE: ItemStackAdapter;
    deserialize(json: JsonElement, typeOfT: Type, context: JsonDeserializationContext): ItemStack;
    serialize(src: ItemStack, typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }

}

declare module 'net.im51111n355.kitmod.server.command' {
  import { LiteralArgumentBuilder } from 'com.mojang.brigadier.builder';
  import { CommandSourceStack } from 'net.minecraft.commands';

  class CommandRegistration {
    static readonly INSTANCE: CommandRegistration;
  }


  class UserKitCommand {
    static readonly INSTANCE: UserKitCommand;
    create(): LiteralArgumentBuilder<CommandSourceStack>;
  }

}

declare module 'net.im51111n355.kitmod.server.network' {
  import { C2SBuyKit } from 'net.im51111n355.kitmod.common.network.messages';
  import { IPayloadContext } from 'net.neoforged.neoforge.network.handling';
  import { Kit, BuyResult } from 'net.im51111n355.kitmod.common.data';
  import { ServerPlayer } from 'net.minecraft.server.level';

  class BuyKitHandler {
    static readonly INSTANCE: BuyKitHandler;
    static access$complete($this: BuyKitHandler, player: ServerPlayer, reason: BuyResult): void;
    static access$give($this: BuyKitHandler, kit: Kit, player: ServerPlayer): void;
    handle(msg: C2SBuyKit, ctx: IPayloadContext): void;
  }

}

declare module 'net.im51111n355.kitmod.server' {
  import { Function1 } from 'kotlin.jvm.functions';
  import { Kit } from 'net.im51111n355.kitmod.common.data';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Map, UUID, List } from 'java.util';
  import { Long } from 'java.lang';

  class ServerKitState {
    static readonly INSTANCE: ServerKitState;
    addNew(kit: Kit): void;
    edit(id: number, func: Function1<Kit, Kit>): boolean;
    get kits(): Kit[];
    getPlayerTiming(player: ServerPlayer): Map<UUID, Long>;
    loadConfig(): void;
    remove(id: number): boolean;
    saveConfig(): void;
    saveTiming(): void;
    syncKitsTo(player: ServerPlayer): void;
    updateTiming(player: ServerPlayer, kit: Kit): void;
  }

}

declare module 'net.im51111n355.kitmod.server.util.crystal' {
  import { Continuation } from 'kotlin.coroutines';
  import { Boolean } from 'java.lang';

  class AsyncCrystalAPI {
    static readonly INSTANCE: AsyncCrystalAPI;
    static access$getImpl$p(): RealCrystalBackend;
    useMoney(player: string, amount: number, item: string, $completion: Continuation<boolean>): any;
  }


  interface FakeCrystalBackend extends ICrystalBackend {}
  class FakeCrystalBackend extends ICrystalBackend {
    constructor(defaultBalance: number);
    get defaultBalance(): number;
    useMoney(player: string, amount: number, item: string): boolean;
  }


  class ICrystalBackend {
    useMoney(var1: string, var2: number, var3: string): boolean;
  }


  interface RealCrystalBackend extends ICrystalBackend {}
  class RealCrystalBackend extends ICrystalBackend {
    useMoney(player: string, amount: number, item: string): boolean;
  }

}

declare module 'net.im51111n355.kitmod.server.util' {
  import { Class } from 'java.lang';
  import { MinecraftServer } from 'net.minecraft.server';
  import { CoroutineScope } from 'kotlinx.coroutines';

  class JavaArrayClass {
    static permissionDynamicContextKeyArrayClass: Class;
  }


  class ServerConfig {
    static readonly INSTANCE: ServerConfig;
    get config(): ServerConfigData;
  }


  class ServerConfigData {
    constructor(serverId: number, secretKey: string);
    component1(): number;
    component2(): string;
    copy(serverId: number, secretKey: string): ServerConfigData;
    static copy$default(serverConfigData: ServerConfigData, n: number, string: string, n2: number, object: any): ServerConfigData;
    equals(other: any): boolean;
    get secretKey(): string;
    get serverId(): number;
    hashCode(): number;
    toString(): string;
  }


  class ServerTracker {
    static readonly INSTANCE: ServerTracker;
    scope(): CoroutineScope;
    server(): MinecraftServer;
  }

}

declare module 'net.im51111n355.kitmod.server.util.permission' {
  import { ServerPlayer } from 'net.minecraft.server.level';

  class KitModPermissions {
    static readonly INSTANCE: KitModPermissions;
    hasPermission($this$hasPermission: ServerPlayer, str: string): boolean;
    playerHasPermission(player: ServerPlayer, str: string): boolean;
  }


  class PermissionConstants {
    static readonly INSTANCE: PermissionConstants;
    static readonly VIEW: string;
    static readonly VIEW_HIDDEN: string;
    static readonly CREATE: string;
    static readonly SETITEMS: string;
    static readonly SETPRICE: string;
    static readonly SETPERMISSION: string;
    static readonly SETSTYLE: string;
    static readonly SETVISIBILITY: string;
    static readonly SETNAME: string;
    static readonly REMPRICE: string;
    static readonly REMPERMISSION: string;
    static readonly DELETE: string;
  }

}

declare module 'net.im51111n355.kitmod.server.util.ServerTracker' {
  import { MinecraftServer } from 'net.minecraft.server';
  import { CoroutineScope } from 'kotlinx.coroutines';

  class ServerAndExtra {
    constructor(server: MinecraftServer, scope: CoroutineScope);
    get scope(): CoroutineScope;
    get server(): MinecraftServer;
  }

}