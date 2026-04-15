declare module 'net.im51111n355.tabmod.client.graphics' {
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Component } from 'net.minecraft.network.chat';
  import { Function1 } from 'kotlin.jvm.functions';
  import { VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { Unit, Pair } from 'kotlin';
  import { Float } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ShaderInstance, RenderType } from 'net.minecraft.client.renderer';
  import { Function } from 'java.util.function';

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
    static applyFontTransformation($this$applyFontTransformation: GuiGraphics, font: Font, size: number, x: number, y: number, draw: Function1<number, Unit>): void;
    static doubleDraw($this$doubleDraw: GuiGraphics, first: ResourceLocation, second: ResourceLocation, x: number, y: number, width: number, height: number): void;
    static drawRoundedRectangle($this$drawRoundedRectangle: GuiGraphics, x: number, y: number, width: number, height: number, radius: number, color: number, fillMin: number, fillMax: number): void;
    static drawRoundedRectangle$default(guiGraphics: GuiGraphics, n: number, n2: number, n3: number, n4: number, n5: number, n6: number, f: number, f2: number, n7: number, object: any): void;
    static drawRoundedRectangleShaderSetup($this$drawRoundedRectangleShaderSetup: GuiGraphics, radius: number, fillMin: number, fillMax: number, width: number, height: number, draw: Function1<VertexConsumer, Unit>): void;
    static drawRoundedRectangleShaderSetup$default($this$drawRoundedRectangleShaderSetup_u24default: GuiGraphics, radius: number, fillMin: number, fillMax: number, width: number, height: number, draw: Function1, n: number, object: any): void;
  }


  class ShaderRegistration {
    static readonly INSTANCE: ShaderRegistration;
    static SOLID_ROUNDED_RECTANGLE_SHADER: ShaderInstance;
    static MASKED_POSITION_TEXTURE_SHADER: ShaderInstance;
    get (): any;
    get (): any;
    get mASKED_POSITION_TEXTURE_SHADER(): ShaderInstance;
    get mASKED_POSITION_TEX_RT(): Function<Pair<ResourceLocation, ResourceLocation>, RenderType>;
    get sOLID_ROUNDED_RECTANGLE_RT(): RenderType;
    get sOLID_ROUNDED_RECTANGLE_SHADER(): ShaderInstance;
    positionTexMasked(first: ResourceLocation, second: ResourceLocation): RenderType;
    set(value: any): void;
    set (value: any);
    set (value: any);
    set mASKED_POSITION_TEXTURE_SHADER(shaderInstance: ShaderInstance);
    set sOLID_ROUNDED_RECTANGLE_SHADER(shaderInstance: ShaderInstance);
  }

}

declare module 'net.im51111n355.tabmod.client' {
  class RenderTabManager {
    static readonly INSTANCE: RenderTabManager;
  }

}

declare module 'net.im51111n355.tabmod.client.screen.widget' {
  import { AbstractWidget } from 'net.minecraft.client.gui.components';

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

declare module 'net.im51111n355.tabmod.client.util' {
  import { BufferedImage } from 'java.awt.image';
  import { ResourceLocation } from 'net.minecraft.resources';

  class ClientProfilePicturePuller {
    static readonly INSTANCE: ClientProfilePicturePuller;
    pull(url: string, etag: string): BufferedImage;
  }


  class TabModAssets {
    static readonly INSTANCE: TabModAssets;
    get aVATAR_MASK(): ResourceLocation;
    get dEFAULT_PROFILE_PICTURE(): ResourceLocation;
    get iCON_CONFIRMED(): ResourceLocation;
    get lOGO(): ResourceLocation;
    get pING_1(): ResourceLocation;
    get pING_2(): ResourceLocation;
    get pING_3(): ResourceLocation;
    get pING_4(): ResourceLocation;
    get pING_5(): ResourceLocation;
    get pING_BG(): ResourceLocation;
  }

}

declare module 'net.im51111n355.tabmod.common.data' {
  import { Enum, Comparable } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { EnumEntries } from 'kotlin.enums';
  import { Companion } from 'net.im51111n355.tabmod.common.data.TabPlayerEntry';
  import { Companion as net_im51111n355_tabmod_common_data_tabprofilepicturedata_Companion } from 'net.im51111n355.tabmod.common.data.TabProfilePictureData';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  interface TabPermissions extends Enum<TabPermissions> {}
  class TabPermissions extends Enum<TabPermissions> {
    static readonly FOUNDER: TabPermissions;
    static readonly H_ADMIN: TabPermissions;
    static readonly S_ADMIN: TabPermissions;
    static readonly ADMIN: TabPermissions;
    static readonly JR_ADMIN: TabPermissions;
    static readonly S_MOD: TabPermissions;
    static readonly MOD: TabPermissions;
    static readonly JR_MOD: TabPermissions;
    static readonly HELPER: TabPermissions;
    static readonly BUILDER: TabPermissions;
    static readonly BMODER_PLUS: TabPermissions;
    static readonly BMODER: TabPermissions;
    static readonly AGENT: TabPermissions;
    static readonly SPY: TabPermissions;
    static readonly DELUXE: TabPermissions;
    static readonly PREMIUM: TabPermissions;
    static readonly VIP: TabPermissions;
    static readonly PLAYER: TabPermissions;
    get backgroundColor(): number;
    get badgeColor(): number;
    get displayName(): string;
    static get entries(): EnumEntries<TabPermissions>;
    get groupName(): string;
    get hasIcon(): boolean;
    get icon(): ResourceLocation;
    static valueOf(value: string): TabPermissions;
    static values(): TabPermissions[];
  }


  interface TabPlayerEntry extends Comparable<TabPlayerEntry> {}
  class TabPlayerEntry extends Comparable<TabPlayerEntry> {
    static readonly Companion: Companion;
    constructor(username: string, isConfirmed: boolean, group: TabPermissions, profilePictureData: TabProfilePictureData);
    compare(a: T, b: T): number;
    compare(a: T, b: T): number;
    compareTo(other: TabPlayerEntry): number;
    component1(): string;
    component2(): boolean;
    component3(): TabPermissions;
    component4(): TabProfilePictureData;
    copy(username: string, isConfirmed: boolean, group: TabPermissions, profilePictureData: TabProfilePictureData): TabPlayerEntry;
    static copy$default(tabPlayerEntry: TabPlayerEntry, string: string, bl: boolean, tabPermissions: TabPermissions, tabProfilePictureData: TabProfilePictureData, n: number, object: any): TabPlayerEntry;
    equals(other: any): boolean;
    get group(): TabPermissions;
    get profilePictureData(): TabProfilePictureData;
    get username(): string;
    hashCode(): number;
    isConfirmed(): boolean;
    toString(): string;
  }


  class TabProfilePictureData {
    static readonly Companion: net_im51111n355_tabmod_common_data_tabprofilepicturedata_Companion;
    constructor($constructor_marker: DefaultConstructorMarker);
  }

}

declare module 'net.im51111n355.tabmod.common.data.TabPlayerEntry' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { TabPlayerEntry } from 'net.im51111n355.tabmod.common.data';
  import { Comparator } from 'java.util';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get cOMPARATOR(): Comparator<TabPlayerEntry>;
    get sTREAM_CODEC(): StreamCodec<RegistryFriendlyByteBuf, TabPlayerEntry>;
  }

}

declare module 'net.im51111n355.tabmod.common.data.TabProfilePictureData' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { TabProfilePictureData } from 'net.im51111n355.tabmod.common.data';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get sTREAM_CODEC(): StreamCodec<RegistryFriendlyByteBuf, TabProfilePictureData>;
  }


  interface NotSet extends TabProfilePictureData {}
  class NotSet extends TabProfilePictureData {
    static readonly INSTANCE: NotSet;
  }


  interface Set extends TabProfilePictureData {}
  class Set extends TabProfilePictureData {
    constructor(etag: string, url: string);
    component1(): string;
    component2(): string;
    copy(etag: string, url: string): Set;
    static copy$default(set: Set, string: string, string2: string, n: number, object: any): Set;
    equals(other: any): boolean;
    get etag(): string;
    get url(): string;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'net.im51111n355.tabmod.common.network' {
  class NetworkRegistration {
    static readonly INSTANCE: NetworkRegistration;
  }

}

declare module 'net.im51111n355.tabmod.common.util' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class ExternalDataState<T = any> {
    constructor($constructor_marker: DefaultConstructorMarker);
  }

}

declare module 'net.im51111n355.tabmod.common.util.ExternalDataState' {
  import { ExternalDataState } from 'net.im51111n355.tabmod.common.util';

  interface Errored<T = any> extends ExternalDataState<T> {}
  class Errored<T = any> extends ExternalDataState<T> {
    constructor();
    get iat(): number;
  }


  interface Present<T = any> extends ExternalDataState<T> {}
  class Present<T = any> extends ExternalDataState<T> {
    constructor(value: T);
    get value(): T;
  }


  interface Waiting<T = any> extends ExternalDataState<T> {}
  class Waiting<T = any> extends ExternalDataState<T> {
    constructor();
  }

}

declare module 'net.im51111n355.tabmod.server' {
  import { List } from 'java.util';
  import { ServerPlayer } from 'net.minecraft.server.level';

  class PEXPermissionProvider {
    static readonly INSTANCE: PEXPermissionProvider;
    getUserGroups(player: ServerPlayer): string[];
    getUserPrimaryGroup(player: ServerPlayer): string;
  }


  class ServerTabManager {
    static readonly INSTANCE: ServerTabManager;
  }

}

declare module 'net.im51111n355.tabmod.server.util' {
  import { TabProfilePictureData } from 'net.im51111n355.tabmod.common.data';
  import { MinecraftServer } from 'net.minecraft.server';
  import { CoroutineScope } from 'kotlinx.coroutines';

  class IngameUserAvatar {
    constructor(avatarUrl: string, info: IngameUserAvatarInfo);
    component1(): string;
    component2(): IngameUserAvatarInfo;
    copy(avatarUrl: string, info: IngameUserAvatarInfo): IngameUserAvatar;
    static copy$default(ingameUserAvatar: IngameUserAvatar, string: string, ingameUserAvatarInfo: IngameUserAvatarInfo, n: number, object: any): IngameUserAvatar;
    equals(other: any): boolean;
    get avatarUrl(): string;
    get info(): IngameUserAvatarInfo;
    hashCode(): number;
    toString(): string;
  }


  class IngameUserAvatarInfo {
    constructor(login: string, realName: string, isConfirmed: boolean);
    component1(): string;
    component2(): string;
    component3(): boolean;
    copy(login: string, realName: string, isConfirmed: boolean): IngameUserAvatarInfo;
    static copy$default(ingameUserAvatarInfo: IngameUserAvatarInfo, string: string, string2: string, bl: boolean, n: number, object: any): IngameUserAvatarInfo;
    equals(other: any): boolean;
    get login(): string;
    get realName(): string;
    hashCode(): number;
    isConfirmed(): boolean;
    toString(): string;
  }


  class ServerProfileDataPuller {
    static readonly INSTANCE: ServerProfileDataPuller;
    getAvatarData(name: string): ServerProfileResult;
  }


  class ServerProfileResult {
    constructor(profilePictureData: TabProfilePictureData, isConfirmed: boolean);
    component1(): TabProfilePictureData;
    component2(): boolean;
    copy(profilePictureData: TabProfilePictureData, isConfirmed: boolean): ServerProfileResult;
    static copy$default(serverProfileResult: ServerProfileResult, tabProfilePictureData: TabProfilePictureData, bl: boolean, n: number, object: any): ServerProfileResult;
    equals(other: any): boolean;
    get profilePictureData(): TabProfilePictureData;
    hashCode(): number;
    isConfirmed(): boolean;
    toString(): string;
  }


  class ServerTracker {
    static readonly INSTANCE: ServerTracker;
    scope(): CoroutineScope;
    server(): MinecraftServer;
  }

}

declare module 'net.im51111n355.tabmod.server.util.ServerTracker' {
  import { MinecraftServer } from 'net.minecraft.server';
  import { CoroutineScope } from 'kotlinx.coroutines';

  class ServerAndExtra {
    constructor(server: MinecraftServer, scope: CoroutineScope);
    get scope(): CoroutineScope;
    get server(): MinecraftServer;
  }

}

declare module 'net.im51111n355.tabmod' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Function0 } from 'kotlin.jvm.functions';
  import { Unit } from 'kotlin';

  class TabMod {
    static readonly INSTANCE: TabMod;
    static readonly MOD_ID: string;
  }


  class TabModKt {
    static readonly INCLUDE_SERVER: boolean;
    static ifClient(func: Function0<Unit>): void;
    static ifServer(func: Function0<Unit>): void;
    static ifServer<T>(func: Function0<T>): T;
    static mcResource(path: string): ResourceLocation;
    static tabModResource(path: string): ResourceLocation;
  }

}