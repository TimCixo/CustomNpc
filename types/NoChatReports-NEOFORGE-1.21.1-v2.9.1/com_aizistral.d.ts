declare module 'com.aizistral.nochatreports.common.config' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Path } from 'java.nio.file';
  import { Class } from 'java.lang';
  import { Supplier } from 'java.util.function';
  import { FieldAttributes, TypeAdapter } from 'com.google.gson';
  import { ModMenuApi, ConfigScreenFactory } from 'com.terraformersmc.modmenu.api';
  import { SigningMode } from 'com.aizistral.nochatreports.common.core';
  import { Encryption, Encryptor } from 'com.aizistral.nochatreports.common.encryption';
  import { Optional } from 'java.util';
  import { ServerAddress } from 'net.minecraft.client.multiplayer.resolver';
  import { JsonReader, JsonWriter } from 'com.google.gson.stream';

  class ClothConfigIntegration {
    static readonly ACTIVE: boolean;
    static getConfigScreen(parent: Screen): Screen;
  }


  class JSONConfig {
    get default(): JSONConfig;
    get file(): Path;
    static loadConfig<T extends JSONConfig>(configClass: Class<T>, freshInstance: Supplier<T>, fileName: string): T;
    saveFile(): void;
    shouldSkipClass(theClass: Class<any>): boolean;
    shouldSkipField(field: FieldAttributes): boolean;
  }


  interface ModMenuIntegration extends ModMenuApi {}
  class ModMenuIntegration extends ModMenuApi {
    get modConfigScreenFactory(): ConfigScreenFactory<any>;
  }


  class NCRConfig {
    static get client(): NCRConfigClient;
    static get common(): NCRConfigCommon;
    static get encryption(): NCRConfigEncryption;
    static get serverPreferences(): NCRServerPreferences;
    static load(): void;
    static save(): void;
  }


  interface NCRConfigClient extends JSONConfig {}
  class NCRConfigClient extends JSONConfig {
    alwaysHideReportButton(): boolean;
    defaultSigningMode(): SigningMode;
    demandOnServer(): boolean;
    disableTelemetry(): boolean;
    enableMod(): boolean;
    get default(): NCRConfigClient;
    get verifiedIconOffsetX(): number;
    get verifiedIconOffsetY(): number;
    hideInsecureMessageIndicators(): boolean;
    hideModifiedMessageIndicators(): boolean;
    hideSigningRequestMessage(): boolean;
    hideSystemMessageIndicators(): boolean;
    hideWarningToast(): boolean;
    removeTelemetryButton(): boolean;
    setSkipRealmsWarning(skipRealmsWarning: boolean): void;
    showNCRButton(): boolean;
    showReloadButton(): boolean;
    showServerSafety(): boolean;
    skipRealmsWarning(): boolean;
    toggleMod(): void;
    verifiedIconEnabled(): boolean;
  }


  interface NCRConfigCommon extends JSONConfig {}
  class NCRConfigCommon extends JSONConfig {
    addQueryData(): boolean;
    convertToGameMessage(): boolean;
    demandOnClient(): boolean;
    demandOnClientMessage(): string;
    enableDebugLog(): boolean;
    get default(): NCRConfigCommon;
  }


  interface NCRConfigEncryption extends JSONConfig {}
  class NCRConfigEncryption extends JSONConfig {
    disableWarning(): void;
    get algorithm(): Encryption;
    get default(): NCRConfigEncryption;
    get encryptionKey(): string;
    get encryptionPassphrase(): string;
    get encryptor(): Optional<Encryptor<any>>;
    get lastMessage(): string;
    getEncryptionStartIndex(message: string): number;
    isEnabled(): boolean;
    isEnabledAndValid(): boolean;
    isValid(): boolean;
    isWarningDisabled(): boolean;
    set algorithm(encryption: Encryption);
    set encryptionKey(key: string);
    set encryptionPassphrase(pass: string);
    set lastMessage(lastMessage: string);
    setEncryptPublic(encryptPublic: boolean): void;
    shouldEncrypt(message: string): boolean;
    shouldEncryptPublic(): boolean;
    showEncryptionButton(): boolean;
    showEncryptionIndicators(): boolean;
    toggleEncryption(): void;
  }


  interface NCRServerPreferences extends JSONConfig {}
  class NCRServerPreferences extends JSONConfig {
    get default(): NCRServerPreferences;
    getMode(address: ServerAddress): SigningMode;
    getModeRaw(address: ServerAddress): SigningMode;
    getModeUnresolved(address: ServerAddress): SigningMode;
    hasMode(address: ServerAddress, mode: SigningMode): boolean;
    hasModeCurrent(mode: SigningMode): boolean;
    setMode(address: ServerAddress, mode: SigningMode): void;
  }


  interface ServerAddressAdapter extends TypeAdapter<ServerAddress> {}
  class ServerAddressAdapter extends TypeAdapter<ServerAddress> {
    static readonly INSTANCE: ServerAddressAdapter;
    read(reader: JsonReader): ServerAddress;
    write(writer: JsonWriter, address: ServerAddress): void;
  }

}

declare module 'com.aizistral.nochatreports.common.core' {
  import { Optional, List } from 'java.util';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { Provider } from 'HolderLookup';
  import { Encryptor } from 'com.aizistral.nochatreports.common.encryption';
  import { Enum, Void, Runnable } from 'java.lang';
  import { CompletableFuture } from 'java.util.concurrent';
  import { ServerAddress } from 'net.minecraft.client.multiplayer.resolver';

  class EncryptionUtil {
    static recreate(provider: Provider, component: Component): Component;
    static tryDecrypt(provider: Provider, component: Component): Optional<Component>;
    static tryDecrypt(component: Component, encryptor: Encryptor<any>): boolean;
    static tryDecrypt(message: string, encryptor: Encryptor<any>): Optional<string>;
  }


  class ServerDataExtension {
    preventsChatReports(): boolean;
    setPreventsChatReports(var1: boolean): void;
  }


  interface ServerSafetyLevel extends Enum<ServerSafetyLevel> {}
  class ServerSafetyLevel extends Enum<ServerSafetyLevel> {
    static readonly SECURE: ServerSafetyLevel;
    static readonly SINGLEPLAYER: ServerSafetyLevel;
    static readonly UNINTRUSIVE: ServerSafetyLevel;
    static readonly INSECURE: ServerSafetyLevel;
    static readonly REALMS: ServerSafetyLevel;
    static readonly UNKNOWN: ServerSafetyLevel;
    static readonly UNDEFINED: ServerSafetyLevel;
    get tooltip(): MutableComponent;
    isSecure(): boolean;
    static valueOf(name: string): ServerSafetyLevel;
    static values(): ServerSafetyLevel[];
  }


  class ServerSafetyState {
    static allowChatSigning(): boolean;
    static get current(): ServerSafetyLevel;
    static get lastServer(): ServerAddress;
    static isDetermined(): boolean;
    static isInSingleplayer(): boolean;
    static isOnRealms(): boolean;
    static reset(): void;
    static scheduleResetAction(action: Runnable): void;
    static scheduleSigningAction(action: Runnable): void;
    static set lastServer(address: ServerAddress);
    static setAllowChatSigning(allow: boolean): CompletableFuture<Void>;
    static toggleChatSigning(): void;
    static updateCurrent(level: ServerSafetyLevel): void;
  }


  interface SigningMode extends Enum<SigningMode> {}
  class SigningMode extends Enum<SigningMode> {
    static readonly DEFAULT: SigningMode;
    static readonly NEVER: SigningMode;
    static readonly ALWAYS: SigningMode;
    static readonly PROMPT: SigningMode;
    static readonly ON_DEMAND: SigningMode;
    static readonly NEVER_FORCED: SigningMode;
    get name(): MutableComponent;
    get nameKey(): string;
    get tooltip(): MutableComponent;
    get tooltipKey(): string;
    isSelectable(): boolean;
    isSelectableGlobally(): boolean;
    next(): SigningMode;
    static nullable(mode: SigningMode): SigningMode;
    resolve(): SigningMode;
    static valueOf(name: string): SigningMode;
    static values(): SigningMode[];
  }

}

declare module 'com.aizistral.nochatreports.common.encryption' {
  import { List } from 'java.util';

  interface AESCFB8Encryption extends AESEncryption {}
  class AESCFB8Encryption extends AESEncryption {
    get randomProcessor(): AESCFB8Encryptor;
    getProcessor(key: string): AESCFB8Encryptor;
  }


  interface AESCFB8Encryptor extends AESEncryptor<AESCFB8Encryption> {}
  class AESCFB8Encryptor extends AESEncryptor<AESCFB8Encryption> {
  }


  interface AESECBEncryption extends AESEncryption {}
  class AESECBEncryption extends AESEncryption {
    get randomProcessor(): AESECBEncryptor;
    getProcessor(key: string): AESECBEncryptor;
  }


  interface AESECBEncryptor extends AESEncryptor<AESECBEncryption> {}
  class AESECBEncryptor extends AESEncryptor<AESECBEncryption> {
  }


  interface AESEncryption extends Encryption {}
  class AESEncryption extends Encryption {
    get defaultKey(): string;
    get mode(): string;
    get padding(): string;
    get randomKey(): string;
    getPassphraseKey(passphrase: string): string;
    requiresIV(): boolean;
    supportsPassphrases(): boolean;
    validateKey(key: string): boolean;
  }


  interface AESEncryptor<T extends AESEncryption = any> extends Encryptor<T> {}
  class AESEncryptor<T extends AESEncryption = any> extends Encryptor<T> {
    decrypt(message: string): string;
    encrypt(message: string): string;
    get algorithm(): T;
    get key(): string;
  }


  interface AESGCMEncryption extends AESEncryption {}
  class AESGCMEncryption extends AESEncryption {
    get randomProcessor(): AESGCMEncryptor;
    getProcessor(key: string): AESGCMEncryptor;
  }


  interface AESGCMEncryptor extends AESEncryptor<AESGCMEncryption> {}
  class AESGCMEncryptor extends AESEncryptor<AESGCMEncryption> {
  }


  interface CaesarEncryption extends Encryption {}
  class CaesarEncryption extends Encryption {
    get defaultKey(): string;
    get randomKey(): string;
    get randomProcessor(): CaesarEncryptor;
    getPassphraseKey(passphrase: string): string;
    getProcessor(key: string): CaesarEncryptor;
    supportsPassphrases(): boolean;
    validateKey(key: string): boolean;
  }


  interface CaesarEncryptor extends Encryptor<CaesarEncryption> {}
  class CaesarEncryptor extends Encryptor<CaesarEncryption> {
    decrypt(message: string): string;
    encrypt(message: string): string;
    get algorithm(): CaesarEncryption;
    get key(): string;
  }


  class Encryption {
    static readonly AES_CFB8: AESCFB8Encryption;
    static readonly AES_GCM: AESGCMEncryption;
    static readonly AES_ECB: AESECBEncryption;
    static readonly CAESAR: CaesarEncryption;
    get defaultKey(): string;
    get iD(): string;
    get name(): string;
    get randomKey(): string;
    get randomProcessor(): Encryptor<any>;
    static get registered(): Encryption[];
    getPassphraseKey(var1: string): string;
    getProcessor(var1: string): Encryptor<any>;
    supportsPassphrases(): boolean;
    validateKey(var1: string): boolean;
  }


  class Encryptor<T extends Encryption = any> {
    decrypt(var1: string): string;
    encrypt(var1: string): string;
    get algorithm(): T;
    get key(): string;
  }

}

declare module 'com.aizistral.nochatreports.common.gui' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { GuiGraphics, Font, ComponentPath } from 'net.minecraft.client.gui';
  import { ImageButton, Tooltip, WidgetTooltipHolder, WidgetSprites, Button } from 'net.minecraft.client.gui.components';
  import { OnPress } from 'Button';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Supplier } from 'java.util.function';
  import { List } from 'java.util';
  import { FormattedCharSequence } from 'net.minecraft.util';
  import { Minecraft } from 'net.minecraft.client';
  import { ClientTooltipPositioner } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { ScreenRectangle } from 'net.minecraft.client.gui.navigation';

  interface AdaptiveWarningScreen extends Screen {}
  class AdaptiveWarningScreen extends Screen {
    constructor(title: Component, content: Component, check: Component, previous: Screen);
    render(graphics: GuiGraphics, i: number, j: number, f: number): void;
  }


  interface AdvancedImageButton extends ImageButton {}
  class AdvancedImageButton extends ImageButton {
    constructor(x: number, y: number, xSize: number, ySize: number, sprites: SwitchableSprites, onPress: OnPress, name: Component, parent: Screen);
    get currentTexture(): ResourceLocation;
    get spritesIndex(): number;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    setTooltip(tooltip: Tooltip): void;
    useSprites(index: number): void;
  }


  interface AdvancedTooltip extends Tooltip {}
  class AdvancedTooltip extends Tooltip {
    constructor(message: Component, narration: Component);

    constructor(message: Component);

    constructor(message: Supplier<Component>);
    doCustomRender(screen: Screen, graphics: GuiGraphics, x: number, y: number, positioner: ClientTooltipPositioner): void;
    get message(): Component;
    hasCustomRender(): boolean;
    setMaxWidth(maxWidth: number): AdvancedTooltip;
    setRenderWithoutGap(render: boolean): AdvancedTooltip;
    static splitTooltip(minecraft: Minecraft, component: Component, maxWidth: number): FormattedCharSequence[];
    toCharSequence(minecraft: Minecraft): FormattedCharSequence[];
  }


  interface AdvancedWidgetTooltipHolder extends WidgetTooltipHolder {}
  class AdvancedWidgetTooltipHolder extends WidgetTooltipHolder {
    constructor();

    constructor(tooltip: Tooltip);
    doCustomRender(screen: Screen, graphics: GuiGraphics, x: number, y: number, positioner: ClientTooltipPositioner): void;
    hasCustomRender(): boolean;
    refreshTooltipForNextRenderPass(hovered: boolean, focused: boolean, screenRectangle: ScreenRectangle): void;
  }


  interface EncryptionButton extends AdvancedImageButton {}
  class EncryptionButton extends AdvancedImageButton {
    constructor(x: number, y: number, xSize: number, ySize: number, useSprites: number, onPress: OnPress, name: Component, parent: Screen);
    mouseClicked(x: number, y: number, i: number): boolean;
    openEncryptionConfig(): void;
  }


  interface EncryptionConfigScreen extends Screen {}
  class EncryptionConfigScreen extends Screen {
    constructor(previous: Screen);
    onClose(): void;
    render(graphics: GuiGraphics, i: number, j: number, f: number): void;
  }


  interface EncryptionWarningScreen extends TriageWarningScreen {}
  class EncryptionWarningScreen extends TriageWarningScreen {
    constructor(previous: Screen);
    static seenOnThisSession(): boolean;
  }


  class FontHelper {
    static wrap(font: Font, str: string, wrapWidth: number): string[];
  }


  class GUIShenanigans {
    static getLeaf(path: ComponentPath): ComponentPath;
    static getSprites(path: string): WidgetSprites;
    static getSprites(path: string, hasHovered: boolean): WidgetSprites;
    static getSprites(path: string, hasHovered: boolean, hasDisabled: boolean): WidgetSprites;
  }


  interface InvisibleButton extends Button {}
  class InvisibleButton extends Button {
    constructor();
    render(graphics: GuiGraphics, i: number, j: number, f: number): void;
  }


  interface RealmsWarningScreen extends TriageWarningScreen {}
  class RealmsWarningScreen extends TriageWarningScreen {
    constructor(previous: Screen, realms: Screen);
    static shouldShow(): boolean;
  }


  class SwitchableSprites {
    get(index: number): WidgetSprites;
    get current(): WidgetSprites;
    get default(): WidgetSprites;
    get index(): number;
    static of(def: WidgetSprites, ...sprites: WidgetSprites[]): SwitchableSprites;
    set index(index: number);
  }


  class TooltipHelper {
    static get ctrl(): MutableComponent;
  }


  interface TriageWarningScreen extends AdaptiveWarningScreen {}
  class TriageWarningScreen extends AdaptiveWarningScreen {
    constructor(title: Component, content: Component, check: Component, wikiLink: string, previous: Screen);
  }


  interface UnsafeServerScreen extends AdaptiveWarningScreen {}
  class UnsafeServerScreen extends AdaptiveWarningScreen {
    constructor(previous: Screen);
    static hideThisSession(): boolean;
    static setHideThisSession(hide: boolean): void;
  }

}

declare module 'com.aizistral.nochatreports.common.mixins.client' {
  import { ParseResults } from 'com.mojang.brigadier';
  import { SharedSuggestionProvider } from 'net.minecraft.commands';
  import { OptionsSubScreen } from 'net.minecraft.client.gui.screens.options';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Entry } from 'ServerSelectionList';
  import { ServerDataExtension } from 'com.aizistral.nochatreports.common.core';

  class AccessorClientPacketListener {
    invokeParseCommand(var1: string): ParseResults<SharedSuggestionProvider>;
  }


  class MixinChatComponent {
  }


  class MixinChatListener {
  }


  interface MixinChatOptionsScreen extends OptionsSubScreen {}
  class MixinChatOptionsScreen extends OptionsSubScreen {
    constructor();
  }


  interface MixinChatScreen extends Screen {}
  class MixinChatScreen extends Screen {
    normalizeChatMessage(var1: string): string;
    onBeforeMessage(original: string, info: CallbackInfoReturnable<string>): void;
    setFocused(listener: GuiEventListener): void;
    tick(): void;
  }


  class MixinClientPacketListener {
  }


  class MixinConnectScreen {
  }


  class MixinGuiMessageTag {
  }


  class MixinGuiMessageTagIcon {
  }


  interface MixinJoinMultiplayerScreen extends Screen {}
  class MixinJoinMultiplayerScreen extends Screen {
  }


  class MixinMinecraft {
  }


  interface MixinOnlineServerEntry extends Entry {}
  class MixinOnlineServerEntry extends Entry {
  }


  class MixinOptions {
  }


  class MixinPlayerEntry {
  }


  class MixinRealmsConnect {
  }


  class MixinRowHelper {
  }


  interface MixinServerData extends ServerDataExtension {}
  class MixinServerData extends ServerDataExtension {
    preventsChatReports(): boolean;
    setPreventsChatReports(prevents: boolean): void;
  }


  class MixinServerStatusPinger$1 {
  }


  interface MixinTitleScreen extends Screen {}
  class MixinTitleScreen extends Screen {
  }


  class MixinToastComponent {
  }


  class MixinYggdrasilUserApiService {
  }

}

declare module 'com.aizistral.nochatreports.common.mixins.common' {
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { ServerDataExtension } from 'com.aizistral.nochatreports.common.core';

  class MixinFriendlyByteBuf {
    readUtf(): string;
    writeUtf(var1: string): FriendlyByteBuf;
  }


  interface MixinServerStatus extends ServerDataExtension {}
  class MixinServerStatus extends ServerDataExtension {
    preventsChatReports(): boolean;
    setPreventsChatReports(prevents: boolean): void;
  }

}

declare module 'com.aizistral.nochatreports.common.mixins.server' {
  class MixinDedicatedServer {
  }


  class MixinPlayerList {
  }


  class MixinServerboundChatCommandSignedPacket {
  }


  class MixinServerboundChatPacket {
  }


  class MixinServerboundChatSessionUpdatePacket {
  }

}

declare module 'com.aizistral.nochatreports.common' {
  import { Logger } from 'org.apache.logging.log4j';
  import { PlatformProvider } from 'com.aizistral.nochatreports.common.platform';

  class NCRClient {
    static areSigningKeysPresent(): boolean;
    static resendLastChatMessage(): void;
    static setSigningKeysPresent(present: boolean): void;
  }


  class NCRCore {
    static readonly LOGGER: Logger;
    static awaken(platformProvider: PlatformProvider): void;
    static get provider(): PlatformProvider;
  }

}

declare module 'com.aizistral.nochatreports.common.platform.events' {
  class ClientEvents {
    static readonly PLAY_READY: PlatformEvent;
    static readonly DISCONNECT: PlatformEvent;
  }


  class PlatformEvent<T = any> {
    invoker(): T;
    register(callback: T): void;
  }

}

declare module 'com.aizistral.nochatreports.common.platform.events.particular' {
  import { Minecraft } from 'net.minecraft.client';
  import { ClientPacketListener } from 'net.minecraft.client.multiplayer';

  class Disconnect {
    handle(var1: Minecraft): void;
  }


  class PlayReady {
    handle(var1: ClientPacketListener, var2: Minecraft): void;
  }

}

declare module 'com.aizistral.nochatreports.common.platform' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { Path } from 'java.nio.file';

  interface Platform extends Enum<Platform> {}
  class Platform extends Enum<Platform> {
    static readonly FABRIC: Platform;
    static readonly FORGE: Platform;
    static valueOf(name: string): Platform;
    static values(): Platform[];
  }


  class PlatformProvider {
    get configDir(): Path;
    get minecraftDir(): Path;
    isOnClient(): boolean;
    isOnDedicatedServer(): boolean;
  }


  class PlatformUtils {
    static get platform(): Platform;
  }

}

declare module 'com.aizistral.nochatreports.neoforge.mixins.client' {
  class MixinClientConnection {
  }


  class MixinClientPacketListener {
  }

}

declare module 'com.aizistral.nochatreports.neoforge' {
  import { PlatformProvider } from 'com.aizistral.nochatreports.common.platform';
  import { Path } from 'java.nio.file';

  interface NoChatReports extends PlatformProvider {}
  class NoChatReports extends PlatformProvider {
    constructor();
    get configDir(): Path;
    get minecraftDir(): Path;
    isOnClient(): boolean;
    isOnDedicatedServer(): boolean;
  }

}

declare module 'com.aizistral.nochatreports.neoforge.NoChatReports' {
  import { LoggingIn } from 'ClientPlayerNetworkEvent';

  class Events {
    static onPlayReady(event: LoggingIn): void;
  }

}