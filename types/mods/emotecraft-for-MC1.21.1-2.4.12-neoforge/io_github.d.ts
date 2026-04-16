declare module 'io.github.kosmx.emotes.api.events.client' {
  import { KeyframeAnimation } from 'dev.kosmx.playerAnim.core.data';
  import { Collection } from 'java.util';
  import { Event } from 'dev.kosmx.playerAnim.core.impl.event';

  class ClientEmoteAPI {
    static clientEmoteList(): Collection<KeyframeAnimation>;
    static playEmote(animation: KeyframeAnimation): boolean;
    static playEmote(animation: KeyframeAnimation, tick: number): boolean;
    static stopEmote(): boolean;
  }


  class ClientEmoteEvents {
    static readonly EMOTE_VERIFICATION: Event;
    static readonly EMOTE_PLAY: Event;
    static readonly EMOTE_STOP: Event;
    static readonly LOCAL_EMOTE_STOP: Event;
  }


  class ClientNetworkEvents {
    static readonly PACKET_SEND: Event;
  }

}

declare module 'io.github.kosmx.emotes.api.events.client.ClientEmoteEvents' {
  import { UUID } from 'java.util';
  import { KeyframeAnimation } from 'dev.kosmx.playerAnim.core.data';
  import { EventResult } from 'dev.kosmx.playerAnim.core.impl.event';

  class LocalEmoteStopEvent {
    onEmoteStop(): void;
  }


  class EmoteStopEvent {
    onEmoteStop(var1: UUID, var2: UUID): void;
  }


  class EmotePlayEvent {
    onEmotePlay(var1: KeyframeAnimation, var2: UUID): void;
  }


  class EmoteVerifier {
    verify(var1: KeyframeAnimation, var2: UUID): EventResult;
  }

}

declare module 'io.github.kosmx.emotes.api.events.client.ClientNetworkEvents' {
  import { EventResult } from 'dev.kosmx.playerAnim.core.impl.event';
  import { Builder } from 'io.github.kosmx.emotes.common.network.EmotePacket';

  class PacketSendEvent {
    onPacketSend(var1: Builder): EventResult;
  }

}

declare module 'io.github.kosmx.emotes.api.events.server' {
  import { UUID, HashMap, List } from 'java.util';
  import { KeyframeAnimation } from 'dev.kosmx.playerAnim.core.data';
  import { Pair, UUIDMap } from 'dev.kosmx.playerAnim.core.util';
  import { Integer } from 'java.lang';
  import { InputStream } from 'java.io';
  import { Event } from 'dev.kosmx.playerAnim.core.impl.event';

  class ServerEmoteAPI {
    static deserializeEmote(inputStream: InputStream, quarkName: string, format: string): KeyframeAnimation[];
    static forcePlayEmote(player: UUID, emote: KeyframeAnimation): void;
    static get hiddenEmotes(): UUIDMap<KeyframeAnimation>;
    static get loadedEmotes(): HashMap<UUID, KeyframeAnimation>;
    static get publicEmotes(): UUIDMap<KeyframeAnimation>;
    static getEmote(emoteID: UUID): KeyframeAnimation;
    static getPlayedEmote(player: UUID): Pair<KeyframeAnimation, number>;
    static isForcedEmote(player: UUID): boolean;
    static playEmote(player: UUID, emote: KeyframeAnimation, forced: boolean): void;
    static setPlayerPlayingEmote(player: UUID, emote: KeyframeAnimation): void;
  }


  class ServerEmoteEvents {
    static readonly EMOTE_VERIFICATION: Event;
    static readonly EMOTE_PLAY: Event;
    static readonly EMOTE_STOP_BY_USER: Event;
  }

}

declare module 'io.github.kosmx.emotes.api.events.server.ServerEmoteEvents' {
  import { UUID } from 'java.util';
  import { KeyframeAnimation } from 'dev.kosmx.playerAnim.core.data';
  import { EventResult } from 'dev.kosmx.playerAnim.core.impl.event';

  class EmoteStopEvent {
    onStopEmote(var1: UUID, var2: UUID): void;
  }


  class EmotePlayEvent {
    onEmotePlay(var1: KeyframeAnimation, var2: UUID): void;
  }


  class EmoteVerifier {
    verify(var1: KeyframeAnimation, var2: UUID): EventResult;
  }

}

declare module 'io.github.kosmx.emotes.api.proxy' {
  import { ByteBuffer } from 'java.nio';
  import { UUID, HashMap } from 'java.util';
  import { Builder } from 'io.github.kosmx.emotes.common.network.EmotePacket';
  import { Byte } from 'java.lang';
  import { Consumer } from 'java.util.function';
  import { Level } from 'java.util.logging';

  interface AbstractNetworkInstance extends INetworkInstance {}
  class AbstractNetworkInstance extends INetworkInstance {
    get remoteVersion(): number;
    get remoteVersions(): HashMap<number, number>;
    isServerTrackingPlayState(): boolean;
    maxDataSize(): number;
    receiveMessage(bytes: number[]): void;
    receiveMessage(bytes: number[], player: UUID): void;
    receiveMessage(byteBuffer: ByteBuffer, player: UUID): void;
    static safeGetBytesFromBuffer(byteBuffer: ByteBuffer): number[];
    sendC2SConfig(consumer: Consumer<Builder>): void;
    sendMessage(byteBuffer: ByteBuffer, target: UUID): void;
    sendMessage(builder: Builder, target: UUID): void;
    setVersions(map: HashMap<number, number>): void;
  }


  class EmotesProxyManager {
    static log(level: Level, msg: string): void;
    onDisconnectFromServer(var1: INetworkInstance): void;
    static registerProxyInstance(instance: INetworkInstance): boolean;
    static unregisterProxyInstance(instance: INetworkInstance): boolean;
  }


  class INetworkInstance {
    allowEmoteStreamC2S(): boolean;
    get remoteVersion(): number;
    get remoteVersions(): HashMap<number, number>;
    isActive(): boolean;
    isServerTrackingPlayState(): boolean;
    maxDataSize(): number;
    presenceResponse(): void;
    receiveMessage(byteBuffer: ByteBuffer, player: UUID): void;
    static safeGetBytesFromBuffer(byteBuffer: ByteBuffer): number[];
    safeProxy(): boolean;
    sendC2SConfig(consumer: Consumer<Builder>): void;
    sendConfigCallback(): void;
    sendMessage(var1: Builder, var2: UUID): void;
    sendPlayerID(): boolean;
    setVersions(var1: HashMap<number, number>): void;
    trustReceivedPlayer(): boolean;
  }

}

declare module 'io.github.kosmx.emotes.arch' {
  import { Component } from 'net.minecraft.network.chat';
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandBuildContext, CommandSourceStack } from 'net.minecraft.commands';
  import { CommandSelection } from 'Commands';

  class ClientCommands {
    static readonly FORCED: Component;
    static register<T>(dispatcher: CommandDispatcher<T>, registryAccess: CommandBuildContext): void;
  }


  class ServerCommands {
    static register(dispatcher: CommandDispatcher<CommandSourceStack>, registryAccess: CommandBuildContext, environment: CommandSelection): void;
  }

}

declare module 'io.github.kosmx.emotes.arch.executor' {
  import { IPlayerEntity } from 'io.github.kosmx.emotes.main.mixinFunctions';
  import { UUID } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  class ClientMethods {
    static tick: number;
    get currentTick(): number;
    get mainPlayer(): IPlayerEntity;
    get perspective(): number;
    isAbstractClientEntity(entity: any): boolean;
    isPlayerBlocked(uuid: UUID): boolean;
    sendChatMessage(msg: Component): void;
    set perspective(p: number);
    toastExportMessage(level: number, text: Component, msg: string): void;
  }


  class Defaults {
  }

}

declare module 'io.github.kosmx.emotes.arch.gui.screen' {
  import { OptionsSubScreen } from 'net.minecraft.client.gui.screens.options';
  import { Screen } from 'net.minecraft.client.gui.screens';

  interface ConfigScreen extends OptionsSubScreen {}
  class ConfigScreen extends OptionsSubScreen {
    constructor(parent: Screen);
    removed(): void;
  }

}

declare module 'io.github.kosmx.emotes.arch.gui.widgets' {
  import { ObjectSelectionList } from 'net.minecraft.client.gui.components';
  import { EmoteEntry } from 'io.github.kosmx.emotes.arch.gui.widgets.EmoteListWidget';
  import { Minecraft } from 'net.minecraft.client';
  import { Iterable } from 'java.lang';
  import { EmoteHolder } from 'io.github.kosmx.emotes.main';
  import { Supplier } from 'java.util.function';

  interface EmoteListWidget extends ObjectSelectionList<EmoteEntry> {}
  class EmoteListWidget extends ObjectSelectionList<EmoteEntry> {
    constructor(minecraftClient: Minecraft, i: number, j: number, k: number, l: number);
    filter(string: Supplier<string>): void;
    get emptyEmotes(): Iterable<EmoteHolder>;
    get rowWidth(): number;
    setCompactMode(compactMode: boolean): void;
    setEmotes(list: Iterable<EmoteHolder>, showInvalid: boolean): void;
  }

}

declare module 'io.github.kosmx.emotes.arch.gui.widgets.EmoteListWidget' {
  import { Entry } from 'ObjectSelectionList';
  import { EmoteHolder } from 'io.github.kosmx.emotes.main';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';

  interface EmoteEntry extends Entry<EmoteEntry> {}
  class EmoteEntry extends Entry<EmoteEntry> {
    readonly emote: EmoteHolder;
    constructor(emote: EmoteHolder);
    get emote(): EmoteHolder;
    get narration(): Component;
    render(matrices: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, hovered: boolean, tickDelta: number): void;
  }

}

declare module 'io.github.kosmx.emotes.arch.mixin' {
  import { EmotesMixinConnection, EmotesMixinNetwork } from 'io.github.kosmx.emotes.arch.network';
  import { HashMap, UUID, Set } from 'java.util';
  import { Byte } from 'java.lang';
  import { Player } from 'net.minecraft.world.entity.player';
  import { IPlayerEntity } from 'io.github.kosmx.emotes.main.mixinFunctions';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { GameProfile } from 'com.mojang.authlib';
  import { KeyframeAnimation } from 'dev.kosmx.playerAnim.core.data';
  import { EmotePlayer } from 'io.github.kosmx.emotes.main.emotePlay';
  import { Vec3d } from 'dev.kosmx.playerAnim.core.util';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { ServerPlayerConnection, ServerCommonPacketListenerImpl, CommonListenerCookie } from 'net.minecraft.server.network';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { Int2ObjectMap } from 'it.unimi.dsi.fastutil.ints';
  import { Connection } from 'net.minecraft.network';
  import { MinecraftServer } from 'net.minecraft.server';
  import { IServerNetworkInstance } from 'io.github.kosmx.emotes.server.network';

  interface ConnectionHandlerMixin extends EmotesMixinConnection {}
  class ConnectionHandlerMixin extends EmotesMixinConnection {
    emotecraft$getRemoteVersions(): HashMap<number, number>;
    emotecraft$setVersions(map: HashMap<number, number>): void;
  }


  interface EmotePlayerMixin extends IPlayerEntity, Player {}
  class EmotePlayerMixin extends IPlayerEntity {
    clientLevel: ClientLevel;
    constructor(level: Level, blockPos: BlockPos, f: number, gameProfile: GameProfile);
    emotecraft$emotesGetPos(): Vec3d;
    emotecraft$getBodyYaw(): number;
    emotecraft$getEmote(): EmotePlayer;
    emotecraft$getPrevPos(): Vec3d;
    emotecraft$getViewYaw(): number;
    emotecraft$isForcedEmote(): boolean;
    emotecraft$isNotStanding(): boolean;
    emotecraft$playEmote(emote: KeyframeAnimation, t: number, isForced: boolean): void;
    emotecraft$setBodyYaw(newYaw: number): void;
    emotecraft$voidEmote(): void;
    emotes_getAge(): number;
    emotes_getAndIncreaseAge(): number;
    emotes_getUUID(): UUID;
    tick(ci: CallbackInfo): void;
  }


  class EntityTrackerAccessor {
    get playersTracking(): Set<ServerPlayerConnection>;
  }


  class KeyEventMixin {
  }


  interface PlayerMixin extends LivingEntity {}
  class PlayerMixin extends LivingEntity {
    isLocalPlayer(): boolean;
  }


  class ServerChunkCacheAccessor {
    get trackedEntity(): Int2ObjectMap<EntityTrackerAccessor>;
  }


  class ServerCommonPacketListenerAccessor {
    get connection(): Connection;
  }


  interface ServerPlayNetworkMixin extends EmotesMixinNetwork, ServerCommonPacketListenerImpl {}
  class ServerPlayNetworkMixin extends EmotesMixinNetwork {
    constructor(minecraftServer: MinecraftServer, connection: Connection, commonListenerCookie: CommonListenerCookie);
    emotecraft$getServerNetworkInstance(): IServerNetworkInstance;
  }


  class ServerPlayTrackerMixin {
  }

}

declare module 'io.github.kosmx.emotes.arch.mixin.emf' {
  class EMFAnimationEntityContextMixin {
  }

}

declare module 'io.github.kosmx.emotes.arch.network' {
  import { INetworkInstance } from 'io.github.kosmx.emotes.api.proxy';
  import { HashMap, UUID } from 'java.util';
  import { Byte } from 'java.lang';
  import { ByteBuffer } from 'java.nio';
  import { AbstractServerEmotePlay, IServerNetworkInstance, EmotePlayTracker } from 'io.github.kosmx.emotes.server.network';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ServerGamePacketListenerImpl, ConfigurationTask } from 'net.minecraft.server.network';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Type } from 'ConfigurationTask';
  import { Consumer } from 'java.util.function';
  import { Packet } from 'net.minecraft.network.protocol';
  import { Builder } from 'io.github.kosmx.emotes.common.network.EmotePacket';

  interface AbstractServerNetwork extends INetworkInstance {}
  class AbstractServerNetwork extends INetworkInstance {
    get remoteVersion(): number;
    get remoteVersions(): HashMap<number, number>;
    isActive(): boolean;
    isServerTrackingPlayState(): boolean;
    maxDataSize(): number;
    receiveStreamChunk(buffer: ByteBuffer): ByteBuffer;
    setVersions(map: HashMap<number, number>): void;
  }


  interface CommonServerNetworkHandler extends AbstractServerEmotePlay<Player> {}
  class CommonServerNetworkHandler extends AbstractServerEmotePlay<Player> {
    static instance: CommonServerNetworkHandler;
    static getHandler(handler: ServerGamePacketListenerImpl): IServerNetworkInstance;
    static init(): void;
    receiveMessage(bytes: number[], player: Player): void;
    receiveStreamMessage(bytes: number[], player: Player): void;
    receiveStreamMessage(player: ServerPlayer, handler: IServerNetworkInstance, buf: ByteBuffer): void;
  }


  interface ConfigTask extends ConfigurationTask {}
  class ConfigTask extends ConfigurationTask {
    static readonly TYPE: Type;
    start(consumer: Consumer<Packet<any>>): void;
    type(): Type;
  }


  class EmotesMixinConnection {
    emotecraft$getRemoteVersions(): HashMap<number, number>;
    emotecraft$setVersions(var1: HashMap<number, number>): void;
  }


  class EmotesMixinNetwork {
    emotecraft$getServerNetworkInstance(): IServerNetworkInstance;
  }


  interface ModdedServerPlayNetwork extends IServerNetworkInstance, AbstractServerNetwork {}
  class ModdedServerPlayNetwork extends IServerNetworkInstance {
    constructor(serverGamePacketListener: ServerGamePacketListenerImpl);
    disconnect(literal: string): void;
    get emoteTracker(): EmotePlayTracker;
    sendGeyserPacket(buffer: ByteBuffer): void;
    sendMessage(builder: Builder, target: UUID): void;
    sendPlayMessage(bytes: ByteBuffer): void;
    sendPlayStream(bytes: ByteBuffer): void;
  }

}

declare module 'io.github.kosmx.emotes.arch.screen.components' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { EmoteEntry } from 'io.github.kosmx.emotes.arch.gui.widgets.EmoteListWidget';

  interface EmoteSubScreen extends Screen {}
  class EmoteSubScreen extends Screen {
    onClose(): void;
    setSelected(entry: EmoteEntry): void;
  }

}

declare module 'io.github.kosmx.emotes.arch.screen' {
  import { EmoteSubScreen } from 'io.github.kosmx.emotes.arch.screen.components';
  import { Component } from 'net.minecraft.network.chat';
  import { EmoteListener } from 'io.github.kosmx.emotes.arch.screen.utils';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Key } from 'InputConstants';
  import { UUID } from 'java.util';

  interface EmoteMenu extends EmoteSubScreen {}
  class EmoteMenu extends EmoteSubScreen {
    static readonly OPEN_FOLDER: Component;
    static readonly RESET: Component;
    readonly watcher: EmoteListener;
    activeKeyTime: number;
    constructor(parent: Screen);
    static getKey(emoteID: UUID): Key;
    keyPressed(keyCode: number, scanCode: number, mod: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    removed(): void;
    tick(): void;
  }


  interface ExportMenu extends Screen {}
  class ExportMenu extends Screen {
    constructor(parent: Screen);
    init(): void;
    onClose(): void;
  }

}

declare module 'io.github.kosmx.emotes.arch.screen.ingame' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { EmoteSubScreen } from 'io.github.kosmx.emotes.arch.screen.components';

  interface FastMenuScreen extends Screen {}
  class FastMenuScreen extends Screen {
    constructor(parent: Screen);
    init(): void;
    isPauseScreen(): boolean;
    onClose(): void;
  }


  interface FullMenuScreen extends EmoteSubScreen {}
  class FullMenuScreen extends EmoteSubScreen {
    constructor(parent: Screen);
    isPauseScreen(): boolean;
  }

}

declare module 'io.github.kosmx.emotes.arch.screen.utils' {
  import { Closeable } from 'java.io';
  import { Path } from 'java.nio.file';
  import { Runnable } from 'java.lang';

  interface EmoteListener extends Closeable {}
  class EmoteListener extends Closeable {
    constructor(path: Path);
    blockWhileLoading(): void;
    close(): void;
    isFilesChanged(): boolean;
    isLoading(): boolean;
    isWatcherClosed(): boolean;
    load(onComplete: Runnable): void;
  }

}

declare module 'io.github.kosmx.emotes.arch.screen.widget' {
  import { AbstractWidget, Renderable } from 'net.minecraft.client.gui.components';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { Component } from 'net.minecraft.network.chat';

  interface AbstractFastChooseWidget extends AbstractWidget {}
  class AbstractFastChooseWidget extends AbstractWidget {
    isMouseOver(mouseX: number, mouseY: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, horizontalAmount: number, verticalAmount: number): boolean;
    renderWidget(matrices: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }


  interface IChooseWheel extends Renderable, GuiEventListener {}
  class IChooseWheel extends Renderable {
    static getWheel(widget: AbstractFastChooseWidget): IChooseWheel;
    isFocused(): boolean;
    setFocused(bl: boolean): void;
  }


  interface LegacyChooseWidget extends IChooseWheel {}
  class LegacyChooseWidget extends IChooseWheel {
    constructor(widget: AbstractFastChooseWidget);
    drawCenteredText(matrixStack: GuiGraphics, stringRenderable: Component, deg: number): void;
    drawCenteredText(matrices: GuiGraphics, stringRenderable: Component, x: number, y: number): void;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, horizontalAmount: number, verticalAmount: number): boolean;
    render(matrices: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }


  interface ModernChooseWheel extends IChooseWheel {}
  class ModernChooseWheel extends IChooseWheel {
    static fastMenuPage: number;
    constructor(widget: AbstractFastChooseWidget);
    isMouseOver(mouseX: number, mouseY: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, horizontalAmount: number, verticalAmount: number): boolean;
    render(matrices: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }

}

declare module 'io.github.kosmx.emotes.arch.screen.widget.IChooseWheel' {
  import { EmoteHolder } from 'io.github.kosmx.emotes.main';

  class IChooseElement {
    clearEmote(): void;
    get emote(): EmoteHolder;
    hasEmote(): boolean;
    set emote(var1: EmoteHolder);
  }

}

declare module 'io.github.kosmx.emotes.common' {
  import { ArrayList } from 'java.util';
  import { ConfigEntry } from 'io.github.kosmx.emotes.common.SerializableConfig';
  import { Consumer } from 'java.util.function';

  class CommonData {
    static isLoaded: boolean;
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static readonly networkingVersion: number;
    static readonly playEmoteID: string;
    static readonly emoteStreamID: string;
    static getIDAsString(channel: string): string;
  }


  class SerializableConfig {
    readonly basics: ArrayList;
    readonly expert: ArrayList;
    static readonly staticConfigVersion: number;
    configVersion: number;
    readonly showDebug: ConfigEntry;
    readonly validateEmote: ConfigEntry;
    readonly validThreshold: ConfigEntry;
    readonly loadBuiltinEmotes: ConfigEntry;
    readonly loadEmotesServerSide: ConfigEntry;
    readonly enableQuark: ConfigEntry;
    readonly emotesDir: ConfigEntry;
    readonly autoFixEmoteStop: ConfigEntry;
    constructor();
    iterate(consumer: Consumer<ConfigEntry<any>>): void;
    iterateExpert(consumer: Consumer<ConfigEntry<any>>): void;
    iterateGeneral(consumer: Consumer<ConfigEntry<any>>): void;
  }

}

declare module 'io.github.kosmx.emotes.common.network' {
  import { ByteBuffer } from 'java.nio';
  import { UUID, List, HashMap } from 'java.util';
  import { Function, BiConsumer } from 'java.util.function';
  import { Integer, Enum } from 'java.lang';
  import { NetHashMap, NetData } from 'io.github.kosmx.emotes.common.network.objects';

  class CommonNetwork {
    static listSize<T>(elements: T[], sizer: Function<T, number>): number;
    static readBoolean(buf: ByteBuffer): boolean;
    static readList<T>(buf: ByteBuffer, reader: Function<ByteBuffer, T>): T[];
    static readString(buf: ByteBuffer): string;
    static readUUID(buf: ByteBuffer): UUID;
    static stringSize(str: string): number;
    static writeBoolean(buf: ByteBuffer, bool: boolean): void;
    static writeList<T>(buf: ByteBuffer, elements: T[], writter: BiConsumer<ByteBuffer, T>): void;
    static writeString(buf: ByteBuffer, str: string): void;
    static writeUUID(buf: ByteBuffer, uuid: UUID): void;
  }


  class EmotePacket {
    static readonly defaultVersions: HashMap;
    readonly subPackets: NetHashMap;
    readonly data: NetData;
    read(byteBuffer: ByteBuffer): NetData;
    write(): ByteBuffer;
  }


  class EmoteStreamHelper {
    receiveStream(rec: ByteBuffer): ByteBuffer;
    sendMessage(bytes: ByteBuffer): void;
  }


  class GeyserEmotePacket {
    get emoteID(): UUID;
    get runtimeEntityID(): number;
    read(bytes: number[]): void;
    set emoteID(emoteID: UUID);
    set runtimeEntityID(runtimeEntityID: number);
    write(): number[];
  }


  class PacketConfig {
    static readonly ANIMATION_FORMAT: number;
    static readonly NBS_CONFIG: number;
    static readonly ALLOW_EMOTE_SYNC: number;
    static readonly SERVER_TRACK_EMOTE_PLAY: number;
    static readonly ALLOW_EMOTE_STREAM: number;
  }


  interface PacketTask extends Enum<PacketTask> {}
  class PacketTask extends Enum<PacketTask> {
    static readonly UNKNOWN: PacketTask;
    static readonly STREAM: PacketTask;
    static readonly CONFIG: PacketTask;
    static readonly STOP: PacketTask;
    static readonly FILE: PacketTask;
    static getTaskFromID(b: number): PacketTask;
    static valueOf(name: string): PacketTask;
    static values(): PacketTask[];
  }

}

declare module 'io.github.kosmx.emotes.common.network.EmotePacket' {
  import { NetData } from 'io.github.kosmx.emotes.common.network.objects';
  import { HashMap, UUID } from 'java.util';
  import { Byte } from 'java.lang';
  import { EmotePacket } from 'io.github.kosmx.emotes.common.network';
  import { KeyframeAnimation } from 'dev.kosmx.playerAnim.core.data';

  class Builder {
    constructor(data: NetData);

    constructor();
    build(): EmotePacket;
    build(sizeLimit: number): EmotePacket;
    configureEmoteTick(tick: number): Builder;
    configureTarget(target: UUID): Builder;
    configureToConfigExchange(songEnabled: boolean): Builder;
    configureToSaveEmote(emoteData: KeyframeAnimation): Builder;
    configureToSendStop(emoteID: UUID, player: UUID): Builder;
    configureToSendStop(emoteID: UUID): Builder;
    configureToStreamEmote(emoteData: KeyframeAnimation, player: UUID): Builder;
    configureToStreamEmote(emoteData: KeyframeAnimation): Builder;
    copy(): Builder;
    copyAndGetData(): NetData;
    removePlayerID(): void;
    setSizeLimit(sizeLimit: number): Builder;
    setThreshold(t: number): Builder;
    setVersion(versions: HashMap<number, number>): Builder;
  }

}

declare module 'io.github.kosmx.emotes.common.network.objects' {
  import { HashMap, UUID } from 'java.util';
  import { Byte } from 'java.lang';
  import { ByteBuffer } from 'java.nio';
  import { PacketTask } from 'io.github.kosmx.emotes.common.network';
  import { KeyframeAnimation } from 'dev.kosmx.playerAnim.core.data';

  class AbstractNetworkPacket {
    calculateSize(var1: NetData): number;
    doWrite(var1: NetData): boolean;
    get iD(): number;
    get ver(): number;
    getVer(versions: HashMap<number, number>): number;
    read(var1: ByteBuffer, var2: NetData, var3: number): boolean;
    write(var1: ByteBuffer, var2: NetData): void;
  }


  interface DiscoveryPacket extends AbstractNetworkPacket {}
  class DiscoveryPacket extends AbstractNetworkPacket {
    calculateSize(config: NetData): number;
    doWrite(config: NetData): boolean;
    get iD(): number;
    get ver(): number;
    getVer(versions: HashMap<number, number>): number;
    read(buf: ByteBuffer, data: NetData, version: number): boolean;
    write(buf: ByteBuffer, data: NetData): void;
  }


  interface EmoteDataPacket extends AbstractNetworkPacket {}
  class EmoteDataPacket extends AbstractNetworkPacket {
    tick: number;
    calculateSize(config: NetData): number;
    doWrite(data: NetData): boolean;
    get iD(): number;
    get ver(): number;
    getVer(versions: HashMap<number, number>): number;
    read(buf: ByteBuffer, config: NetData, version: number): boolean;
    write(buf: ByteBuffer, config: NetData): void;
  }


  interface EmoteHeaderPacket extends AbstractNetworkPacket {}
  class EmoteHeaderPacket extends AbstractNetworkPacket {
    calculateSize(config: NetData): number;
    doWrite(config: NetData): boolean;
    get iD(): number;
    get ver(): number;
    getVer(versions: HashMap<number, number>): number;
    read(byteBuffer: ByteBuffer, config: NetData, version: number): boolean;
    static sumStrings(...strings: string[]): number;
    write(byteBuffer: ByteBuffer, config: NetData): void;
  }


  interface EmoteIconPacket extends AbstractNetworkPacket {}
  class EmoteIconPacket extends AbstractNetworkPacket {
    calculateSize(config: NetData): number;
    doWrite(config: NetData): boolean;
    get iD(): number;
    get ver(): number;
    getVer(versions: HashMap<number, number>): number;
    read(byteBuffer: ByteBuffer, config: NetData, version: number): boolean;
    write(byteBuffer: ByteBuffer, config: NetData): void;
  }


  class NetData {
    purpose: PacketTask;
    threshold: number;
    stopEmoteID: UUID;
    emoteData: KeyframeAnimation;
    tick: number;
    valid: boolean;
    wasEmoteData: boolean;
    writeSong: boolean;
    versionsUpdated: boolean;
    versions: HashMap;
    player: UUID;
    isForced: boolean;
    sizeLimit: number;
    copy(): NetData;
    prepareAndValidate(): boolean;
    toString(): string;
  }


  interface NetHashMap extends HashMap<number, AbstractNetworkPacket> {}
  class NetHashMap extends HashMap<number, AbstractNetworkPacket> {
    put(packet: AbstractNetworkPacket): void;
  }


  interface PlayerDataPacket extends AbstractNetworkPacket {}
  class PlayerDataPacket extends AbstractNetworkPacket {
    calculateSize(config: NetData): number;
    doWrite(config: NetData): boolean;
    get iD(): number;
    get ver(): number;
    getVer(versions: HashMap<number, number>): number;
    read(byteBuffer: ByteBuffer, config: NetData, version: number): boolean;
    write(byteBuffer: ByteBuffer, config: NetData): void;
  }


  interface SongPacket extends AbstractNetworkPacket {}
  class SongPacket extends AbstractNetworkPacket {
    calculateSize(config: NetData): number;
    doWrite(config: NetData): boolean;
    get iD(): number;
    get ver(): number;
    getVer(versions: HashMap<number, number>): number;
    read(byteBuffer: ByteBuffer, config: NetData, version: number): boolean;
    write(byteBuffer: ByteBuffer, config: NetData): void;
  }


  interface StopPacket extends AbstractNetworkPacket {}
  class StopPacket extends AbstractNetworkPacket {
    calculateSize(config: NetData): number;
    doWrite(config: NetData): boolean;
    get iD(): number;
    get ver(): number;
    getVer(versions: HashMap<number, number>): number;
    read(buf: ByteBuffer, config: NetData, version: number): boolean;
    write(buf: ByteBuffer, config: NetData): void;
  }

}

declare module 'io.github.kosmx.emotes.common.SerializableConfig' {
  import { List } from 'java.util';
  import { Float } from 'java.lang';

  class ConfigEntry<T = any> {
    readonly hasTooltip: boolean;
    constructor(name: string, oldconfig: string, defVal: T, hasTooltip: boolean, collection: ConfigEntry<any>[], hidden: boolean);

    constructor(name: string, oldconfig: string, defVal: T, hasTooltip: boolean, collection: ConfigEntry<any>[]);

    constructor(name: string, defVal: T, hasTooltip: boolean, collection: ConfigEntry<any>[]);

    constructor(name: string, defVal: T, collection: ConfigEntry<any>[], hidden: boolean);

    constructor(name: string, defVal: T, hasTooltip: boolean, collection: ConfigEntry<any>[], hidden: boolean);
    get (): T;
    get name(): string;
    get oldConfigName(): string;
    resetToDefault(): void;
    set (newValue: T);
    showEntry(): boolean;
  }


  interface FloatConfigEntry extends ConfigEntry<number> {}
  class FloatConfigEntry extends ConfigEntry<number> {
    readonly min: number;
    readonly max: number;
    readonly step: number;
    constructor(name: string, oldconfig: string, defVal: number, hasTooltip: boolean, collection: ConfigEntry<any>[], formatKey: string, min: number, max: number, step: number);

    constructor(name: string, defVal: number, hasTooltip: boolean, collection: ConfigEntry<any>[], formatKey: string, min: number, step: number, max: number);
    get configVal(): number;
    get formatKey(): string;
    get textVal(): number;
    set configVal(newVal: number);
  }


  interface ListConfigEntry<T = any> extends ConfigEntry<List> {}
  class ListConfigEntry<T = any> extends ConfigEntry<List> {
    constructor(name: string, oldconfig: string, defVal: T[], hasTooltip: boolean, collection: ConfigEntry<any>[], hidden: boolean);

    constructor(name: string, oldconfig: string, defVal: T[], hasTooltip: boolean, collection: ConfigEntry<any>[]);

    constructor(name: string, defVal: T[], hasTooltip: boolean, collection: ConfigEntry<any>[]);

    constructor(name: string, defVal: T[], collection: ConfigEntry<any>[], hidden: boolean);

    constructor(name: string, defVal: T[], hasTooltip: boolean, collection: ConfigEntry<any>[], hidden: boolean);
  }

}

declare module 'io.github.kosmx.emotes.common.tools' {
  import { Collection, Iterator } from 'java.util';
  import { Pair } from 'dev.kosmx.playerAnim.core.util';

  interface BiMap<L = any, R = any> extends Collection<Pair> {}
  class BiMap<L = any, R = any> extends Collection<Pair> {
    add(pair: Pair<L, R>): boolean;
    addAll(c: Collection<Pair<L, R>>): boolean;
    clear(): void;
    contains(o: any): boolean;
    containsAll(c: Collection<any>): boolean;
    containsL(l: L): boolean;
    containsR(r: R): boolean;
    equals(obj: any): boolean;
    getL(key: R): L;
    getR(key: L): R;
    hasNext(): boolean;
    hashCode(): number;
    isEmpty(): boolean;
    iterator(): Iterator<Pair<L, R>>;
    next(): Pair<L, R>;
    put(l: L, r: R): Pair<L, R>;
    remove(o: any): boolean;
    remove(): void;
    removeAll(c: Collection<any>): boolean;
    removeL(l: L): R;
    removeR(r: R): L;
    retainAll(c: Collection<any>): boolean;
    size(): number;
    toArray(): any[];
    toArray<T>(a: T[]): T[];
  }

}

declare module 'io.github.kosmx.emotes.executor' {
  import { SerializableConfig } from 'io.github.kosmx.emotes.common';
  import { Path } from 'java.nio.file';
  import { File } from 'java.io';
  import { Level } from 'java.util.logging';
  import { Throwable } from 'java.lang';

  class EmoteInstance {
    static instance: EmoteInstance;
    static config: SerializableConfig;
    get configPath(): Path;
    get externalEmoteDir(): File;
    get gameDirectory(): Path;
    get logger(): Logger;
    isClient(): boolean;
  }


  class Logger {
    log(level: Level, msg: string): void;
    log(level: Level, msg: string, throwable: Throwable): void;
    log(level: Level, msg: string, bl: boolean): void;
    log(level: Level, msg: string, throwable: Throwable, bl: boolean): void;
    writeLog(var1: Level, var2: string, var3: Throwable): void;
    writeLog(var1: Level, var2: string): void;
  }

}

declare module 'io.github.kosmx.emotes.executor.emotePlayer' {
  import { KeyframeAnimation } from 'dev.kosmx.playerAnim.core.data';
  import { UUID } from 'java.util';
  import { Vec3d } from 'dev.kosmx.playerAnim.core.util';

  class IEmotePlayer {
    get data(): KeyframeAnimation;
    getTick(): number;
    isLoopStarted(): boolean;
    isRunning(): boolean;
    static isRunningEmote(emotePlayer: IEmotePlayer): boolean;
    tick(): void;
  }


  class IEmotePlayerEntity {
    emoteStartPlayCallback(): void;
    emoteTick(): void;
    emoteTickCallback(): void;
    emotecraft$emotesGetPos(): Vec3d;
    emotecraft$getBodyYaw(): number;
    emotecraft$getEmote(): IEmotePlayer;
    emotecraft$getPrevPos(): Vec3d;
    emotecraft$getViewYaw(): number;
    emotecraft$isForcedEmote(): boolean;
    emotecraft$isNotStanding(): boolean;
    emotecraft$playEmote(var1: KeyframeAnimation, var2: number, var3: boolean): void;
    emotecraft$playerEntersInvalidPose(): void;
    emotecraft$setBodyYaw(var1: number): void;
    emotes_getUUID(): UUID;
    isMainPlayer(): boolean;
    isPlayingEmote(): boolean;
    stopEmote(var1: UUID): void;
    stopEmote(): void;
  }

}

declare module 'io.github.kosmx.emotes.inline' {
  import { ClientMethods } from 'io.github.kosmx.emotes.arch.executor';

  class TmpGetters {
    static get clientMethods(): ClientMethods;
  }

}

declare module 'io.github.kosmx.emotes.main.config' {
  import { SerializableConfig } from 'io.github.kosmx.emotes.common';
  import { ConfigEntry } from 'io.github.kosmx.emotes.common.SerializableConfig';
  import { BiMap } from 'io.github.kosmx.emotes.common.tools';
  import { ConfigSerializer, Serializer } from 'io.github.kosmx.emotes.server.config';
  import { JsonElement, JsonDeserializationContext, JsonSerializationContext, GsonBuilder } from 'com.google.gson';
  import { Type } from 'java.lang.reflect';
  import { UUID } from 'java.util';

  interface ClientConfig extends SerializableConfig {}
  class ClientConfig extends SerializableConfig {
    readonly dark: ConfigEntry;
    readonly oldChooseWheel: ConfigEntry;
    readonly enablePerspective: ConfigEntry;
    readonly frontAsTPPerspective: ConfigEntry;
    readonly showIcons: ConfigEntry;
    readonly enableNSFW: ConfigEntry;
    readonly checkPose: ConfigEntry;
    readonly alwaysOpenEmoteScreen: ConfigEntry;
    readonly alwaysValidate: ConfigEntry;
    readonly enablePlayerSafety: ConfigEntry;
    readonly stopThreshold: ConfigEntry;
    readonly yRatio: ConfigEntry;
    readonly showHiddenConfig: ConfigEntry;
    readonly neverRemoveBadIcon: ConfigEntry;
    readonly exportBuiltin: ConfigEntry;
    emoteKeyMap: BiMap;
    fastMenuEmotes: UUID[][];
    readonly hideWarningMessage: ConfigEntry;
    constructor();
    get configVal(): number;
    get configVal(): number;
    get textVal(): number;
    set configVal(newVal: number);
    set configVal(newVal: number);
    setConfigVal(newVal: number): void;
  }


  interface ClientConfigSerializer extends ConfigSerializer {}
  class ClientConfigSerializer extends ConfigSerializer {
    deserialize(json: JsonElement, typeOfT: Type, context: JsonDeserializationContext): SerializableConfig;
    serialize(config: SerializableConfig, typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }


  interface ClientSerializer extends Serializer {}
  class ClientSerializer extends Serializer {
    registerTypeAdapters(builder: GsonBuilder): void;
  }


  class EmoteFixer {
    constructor(version: number);
    getEmoteID(element: JsonElement): UUID;
  }

}

declare module 'io.github.kosmx.emotes.main' {
  import { Supplier } from 'java.util.function';
  import { UUID } from 'java.util';
  import { KeyframeAnimation } from 'dev.kosmx.playerAnim.core.data';
  import { Component } from 'net.minecraft.network.chat';
  import { AtomicInteger } from 'java.util.concurrent.atomic';
  import { UUIDMap } from 'dev.kosmx.playerAnim.core.util';
  import { DynamicTexture } from 'net.minecraft.client.renderer.texture';
  import { INetworkInstance } from 'io.github.kosmx.emotes.api.proxy';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { InputStream } from 'java.io';
  import { Iterable } from 'java.lang';
  import { IEmotePlayerEntity } from 'io.github.kosmx.emotes.executor.emotePlayer';
  import { Key } from 'InputConstants';

  interface EmoteHolder extends Supplier<UUID> {}
  class EmoteHolder extends Supplier<UUID> {
    readonly emote: KeyframeAnimation;
    readonly name: Component;
    readonly description: Component;
    readonly author: Component;
    hash: AtomicInteger;
    static list: UUIDMap;
    nativeIcon: DynamicTexture;
    fromInstance: INetworkInstance;
    constructor(emote: KeyframeAnimation);

    constructor(emote: KeyframeAnimation, name: Component, description: Component, author: Component, hash: number);
    static addEmoteToList(emotes: Iterable<KeyframeAnimation>): void;
    static addEmoteToList(emote: KeyframeAnimation): EmoteHolder;
    static addEmoteToList(hold: EmoteHolder): void;
    assignIcon(inputStream: InputStream): void;
    static canRunEmote(player: IEmotePlayerEntity): boolean;
    static clearEmotes(): void;
    equals(o: any): boolean;
    get (): UUID;
    get emote(): KeyframeAnimation;
    get iconIdentifier(): ResourceLocation;
    get uuid(): UUID;
    static getEmoteFromUuid(uuid: UUID): EmoteHolder;
    static getNonNull(emote: UUID): EmoteHolder;
    static handleKeyPress(key: Key): void;
    hashCode(): number;
    static playEmote(emote: KeyframeAnimation, player: IEmotePlayerEntity): boolean;
    static playEmote(emote: KeyframeAnimation, player: IEmotePlayerEntity, emoteHolder: EmoteHolder): boolean;
    playEmote(playerEntity: IEmotePlayerEntity): boolean;
  }


  class MainClientInit {
    static init(): void;
    static loadEmotes(): void;
    static playDebugEmote(): void;
  }


  class MainLoader {
    static main(args: string[]): void;
    static tick(): void;
  }

}

declare module 'io.github.kosmx.emotes.main.EmoteHolder' {
  import { EmoteHolder } from 'io.github.kosmx.emotes.main';
  import { UUID } from 'java.util';

  interface Empty extends EmoteHolder {}
  class Empty extends EmoteHolder {
    constructor(uuid: UUID);
  }

}

declare module 'io.github.kosmx.emotes.main.emotePlay' {
  import { KeyframeAnimationPlayer } from 'dev.kosmx.playerAnim.api.layered';
  import { IEmotePlayer } from 'io.github.kosmx.emotes.executor.emotePlayer';
  import { KeyframeAnimation } from 'dev.kosmx.playerAnim.core.data';
  import { Consumer } from 'java.util.function';
  import { Note } from 'Layer';

  interface EmotePlayer extends IEmotePlayer, KeyframeAnimationPlayer {}
  class EmotePlayer extends IEmotePlayer {
    constructor(emote: KeyframeAnimation, noteConsumer: Consumer<Note>, t: number);
    isRunning(): boolean;
    static isRunningEmote(emote: EmotePlayer): boolean;
    static isRunningEmote(emotePlayer: IEmotePlayer): boolean;
    tick(): void;
  }

}

declare module 'io.github.kosmx.emotes.main.mixinFunctions' {
  import { IEmotePlayerEntity } from 'io.github.kosmx.emotes.executor.emotePlayer';
  import { Supplier } from 'java.util.function';
  import { EmotePlayer } from 'io.github.kosmx.emotes.main.emotePlay';
  import { UUID } from 'java.util';

  interface IPlayerEntity extends IEmotePlayerEntity {}
  class IPlayerEntity extends IEmotePlayerEntity {
    static readonly FPPerspective: number;
    static readonly TPBPerspective: Supplier;
    emoteTick(): void;
    emotecraft$getEmote(): EmotePlayer;
    emotecraft$playerEntersInvalidPose(): void;
    emotecraft$voidEmote(): void;
    emotes_getAge(): number;
    emotes_getAndIncreaseAge(): number;
    initEmotePerspective(emotePlayer: EmotePlayer): void;
    initEmotePlay(): void;
    isMainPlayer(): boolean;
    isPlayingEmote(): boolean;
    stopEmote(): void;
    stopEmote(emoteID: UUID): void;
  }

}

declare module 'io.github.kosmx.emotes.main.network' {
  import { ClientEmoteAPI } from 'io.github.kosmx.emotes.api.events.client';
  import { EmoteHolder } from 'io.github.kosmx.emotes.main';
  import { KeyframeAnimation } from 'dev.kosmx.playerAnim.core.data';
  import { UUID } from 'java.util';
  import { Pair } from 'dev.kosmx.playerAnim.core.util';
  import { Integer } from 'java.lang';
  import { EmotesProxyManager, INetworkInstance } from 'io.github.kosmx.emotes.api.proxy';
  import { Builder } from 'io.github.kosmx.emotes.common.network.EmotePacket';

  interface ClientEmotePlay extends ClientEmoteAPI {}
  class ClientEmotePlay extends ClientEmoteAPI {
    static checkQueue(): void;
    static clientRepeatLocalEmote(emote: KeyframeAnimation, tick: number, target: UUID): void;
    static clientStartLocalEmote(emoteHolder: EmoteHolder): void;
    static clientStartLocalEmote(emote: KeyframeAnimation): boolean;
    static clientStartLocalEmote(emote: KeyframeAnimation, tick: number): boolean;
    static clientStopLocalEmote(): boolean;
    static clientStopLocalEmote(emoteData: KeyframeAnimation): boolean;
    static getEmoteForUUID(uuid: UUID): Pair<KeyframeAnimation, number>;
    static init(): void;
    static isEmoteAllowed(emoteData: KeyframeAnimation, player: UUID): boolean;
    static isForcedEmote(): boolean;
  }


  interface ClientPacketManager extends EmotesProxyManager {}
  class ClientPacketManager extends EmotesProxyManager {
    static init(): void;
    static isAvailableProxy(): boolean;
    static isRemoteAvailable(): boolean;
    static isRemoteTracking(): boolean;
    onDisconnectFromServer(networkInstance: INetworkInstance): void;
    static send(packetBuilder: Builder, target: UUID): void;
  }

}

declare module 'io.github.kosmx.emotes.main.network.ClientEmotePlay' {
  class QueueEntry {
  }

}

declare module 'io.github.kosmx.emotes.neoforge' {
  import { Post } from 'ClientTickEvent';
  import { Key } from 'InputEvent';
  import { LoggingOut, LoggingIn } from 'ClientPlayerNetworkEvent';
  import { RegisterKeyMappingsEvent, RegisterClientCommandsEvent } from 'net.neoforged.neoforge.client.event';
  import { Logger } from 'org.slf4j';
  import { ModContainer } from 'net.neoforged.fml';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { RegisterCommandsEvent } from 'net.neoforged.neoforge.event';
  import { Level } from 'java.util.logging';
  import { Throwable } from 'java.lang';

  class ClientInit {
    static endClientTick(event: Post): void;
    static keyBindingRegister(event: RegisterKeyMappingsEvent): void;
    static keyListenerEvent(event: Key): void;
    static onConnect(event: LoggingIn): void;
    static onDisconnect(event: LoggingOut): void;
  }


  class ForgeWrapper {
    static readonly logger: Logger;
    constructor(container: ModContainer, modEventBus: IEventBus);
    clientCommandRegister(event: RegisterClientCommandsEvent): void;
    commandRegister(event: RegisterCommandsEvent): void;
    static log(level: Level, msg: string): void;
    static log(level: Level, msg: string, t: Throwable): void;
  }

}

declare module 'io.github.kosmx.emotes.neoforge.executor' {
  import { EmoteInstance, Logger } from 'io.github.kosmx.emotes.executor';
  import { Path } from 'java.nio.file';

  interface ForgeEmotesMain extends EmoteInstance {}
  class ForgeEmotesMain extends EmoteInstance {
    get gameDirectory(): Path;
    get logger(): Logger;
    isClient(): boolean;
  }

}

declare module 'io.github.kosmx.emotes.neoforge.network' {
  import { RegisterPayloadHandlersEvent, RegisterConfigurationTasksEvent } from 'net.neoforged.neoforge.network.event';

  class ForgeNetwork {
    static registerNetworkConfigTask(event: RegisterConfigurationTasksEvent): void;
    static registerPlay(event: RegisterPayloadHandlersEvent): void;
  }

}

declare module 'io.github.kosmx.emotes' {
  import { INetworkInstance } from 'io.github.kosmx.emotes.api.proxy';
  import { IEmotePlayerEntity } from 'io.github.kosmx.emotes.executor.emotePlayer';
  import { UUID } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { ResourceLocation } from 'net.minecraft.resources';

  class PlatformTools {
    static fromJson(json: string): Component;
    static fromJson(obj: any): Component;
    static get clientNetworkController(): INetworkInstance;
    static getPlayerFromUUID(uuid: UUID): IEmotePlayerEntity;
    static newIdentifier(id: string): ResourceLocation;
    static openExternalEmotesDir(): void;
  }

}

declare module 'io.github.kosmx.emotes.server.config' {
  import { JsonDeserializer, JsonSerializer, JsonElement, JsonDeserializationContext, JsonSerializationContext, Gson } from 'com.google.gson';
  import { SerializableConfig } from 'io.github.kosmx.emotes.common';
  import { Type } from 'java.lang.reflect';

  interface ConfigSerializer extends JsonDeserializer<SerializableConfig>, JsonSerializer<SerializableConfig> {}
  class ConfigSerializer extends JsonDeserializer<SerializableConfig> {
    deserialize(json: JsonElement, typeOfT: Type, context: JsonDeserializationContext): SerializableConfig;
    serialize(config: SerializableConfig, typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }


  class Serializer {
    static serializer: Gson;
    static INSTANCE: Serializer;
    constructor();
    static get config(): SerializableConfig;
    initializeSerializer(): void;
    static saveConfig(): void;
    static saveConfig(config: SerializableConfig): void;
  }

}

declare module 'io.github.kosmx.emotes.server.geyser' {
  import { BiMap } from 'io.github.kosmx.emotes.common.tools';
  import { UUID } from 'java.util';

  class EmoteMappings {
    constructor(map: BiMap<UUID, UUID>);
    getBeEmote(javaEmote: UUID): UUID;
    getJavaEmote(beEmote: UUID): UUID;
  }

}

declare module 'io.github.kosmx.emotes.server.network' {
  import { ServerEmoteAPI } from 'io.github.kosmx.emotes.api.events.server';
  import { Path } from 'java.nio.file';
  import { INetworkInstance, AbstractNetworkInstance } from 'io.github.kosmx.emotes.api.proxy';
  import { NetData } from 'io.github.kosmx.emotes.common.network.objects';
  import { GeyserEmotePacket } from 'io.github.kosmx.emotes.common.network';
  import { List, HashMap } from 'java.util';
  import { ByteBuffer } from 'java.nio';
  import { Byte, Integer } from 'java.lang';
  import { Builder } from 'io.github.kosmx.emotes.common.network.EmotePacket';
  import { KeyframeAnimation } from 'dev.kosmx.playerAnim.core.data';
  import { Pair } from 'dev.kosmx.playerAnim.core.util';

  interface AbstractServerEmotePlay<P = any> extends ServerEmoteAPI {}
  class AbstractServerEmotePlay<P = any> extends ServerEmoteAPI {
    constructor();
    static get instance(): AbstractServerEmotePlay;
    getS2CConfigPacket(trackPlayState: boolean): Builder;
    getServerEmotes(compatibilityMap: HashMap<number, number>): ByteBuffer[];
    initMappings(configPath: Path): void;
    playerEntersInvalidPose(player: P): void;
    playerStartTracking(tracked: P, tracker: P): void;
    presenceResponse(instance: AbstractNetworkInstance, trackPlayState: boolean): void;
    receiveBEEmote(player: P, emotePacket: GeyserEmotePacket): void;
    receiveGeyserMessage(player: P, data: number[]): void;
    receiveMessage(bytes: number[], player: P, instance: INetworkInstance): void;
    receiveMessage(data: NetData, player: P, instance: INetworkInstance): void;
  }


  class EmotePlayTracker {
    get playedEmote(): Pair<KeyframeAnimation, number>;
    isForced(): boolean;
    setPlayedEmote(data: KeyframeAnimation, isForced: boolean): void;
  }


  interface IServerNetworkInstance extends INetworkInstance {}
  class IServerNetworkInstance extends INetworkInstance {
    closeConnection(): void;
    disconnect(var1: string): void;
    get emoteTracker(): EmotePlayTracker;
    sendGeyserPacket(var1: ByteBuffer): void;
    trackPlayState(): boolean;
  }

}

declare module 'io.github.kosmx.emotes.server.serializer' {
  import { JsonSerializer, JsonDeserializer, JsonElement, JsonSerializationContext, JsonDeserializationContext } from 'com.google.gson';
  import { BiMap } from 'io.github.kosmx.emotes.common.tools';
  import { UUID, List } from 'java.util';
  import { Type } from 'java.lang.reflect';
  import { UUIDMap } from 'dev.kosmx.playerAnim.core.util';
  import { KeyframeAnimation, AnimationFormat } from 'dev.kosmx.playerAnim.core.data';
  import { Path } from 'java.nio.file';
  import { InputStream, OutputStream } from 'java.io';

  interface BiMapSerializer extends JsonSerializer<BiMap>, JsonDeserializer<BiMap> {}
  class BiMapSerializer extends JsonSerializer<BiMap> {
    deserialize(json: JsonElement, typeOfT: Type, context: JsonDeserializationContext): BiMap<UUID, UUID>;
    serialize(src: BiMap<UUID, UUID>, typeOfSrc: Type, context: JsonSerializationContext): JsonElement;
  }


  class EmoteSerializer {
    static serializeEmotes(emotes: UUIDMap<KeyframeAnimation>, externalEmotes: Path): void;
    static serializeExternalEmote(file: Path): KeyframeAnimation[];
  }


  class UniversalEmoteSerializer {
    static readers: List;
    static serverEmotes: UUIDMap;
    static hiddenServerEmotes: UUIDMap;
    static getEmote(uuid: UUID): KeyframeAnimation;
    static loadEmotes(): void;
    static readData(inputStream: InputStream, filename: string, format: string): KeyframeAnimation[];
    static readData(inputStream: InputStream, filename: string): KeyframeAnimation[];
    static writeKeyframeAnimation(stream: OutputStream, emote: KeyframeAnimation, format: AnimationFormat): void;
  }

}

declare module 'io.github.kosmx.emotes.server.serializer.type' {
  import { List } from 'java.util';
  import { KeyframeAnimation, AnimationFormat } from 'dev.kosmx.playerAnim.core.data';
  import { InputStream, OutputStream, BufferedReader } from 'java.io';
  import { RuntimeException, Exception } from 'java.lang';

  interface BinaryFormat extends ISerializer {}
  class BinaryFormat extends ISerializer {
    get formatType(): AnimationFormat;
    read(stream: InputStream, filename: string): KeyframeAnimation[];
    write(emote: KeyframeAnimation, stream: OutputStream): void;
  }


  interface EmoteSerializerException extends RuntimeException {}
  class EmoteSerializerException extends RuntimeException {
    constructor(msg: string, type: string);

    constructor(msg: string, type: string, exception: Exception);
    get type(): string;
  }


  class IReader {
    get formatExtension(): string;
    get formatType(): AnimationFormat;
    read(var1: InputStream, var2: string): KeyframeAnimation[];
    streamReader(stream: InputStream): BufferedReader;
  }


  interface ISerializer extends IReader {}
  class ISerializer extends IReader {
    write(var1: KeyframeAnimation, var2: OutputStream): void;
  }


  interface JsonEmoteWrapper extends ISerializer {}
  class JsonEmoteWrapper extends ISerializer {
    get formatExtension(): string;
    get formatType(): AnimationFormat;
    read(inputStream: InputStream, filename: string): KeyframeAnimation[];
    write(emote: KeyframeAnimation, outputStream: OutputStream): void;
  }


  interface QuarkReaderWrapper extends IReader {}
  class QuarkReaderWrapper extends IReader {
    get formatType(): AnimationFormat;
    read(inputStream: InputStream, filename: string): KeyframeAnimation[];
  }

}