declare module 'fuzs.pickupnotifier.client.commands' {
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { BiConsumer } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';
  import { SharedSuggestionProvider } from 'net.minecraft.commands';

  class ModReloadCommand {
    static register<T extends SharedSuggestionProvider>(dispatcher: CommandDispatcher<T>, feedbackSender: BiConsumer<T, Component>): void;
  }

}

declare module 'fuzs.pickupnotifier.client.gui.entry' {
  import { Component } from 'net.minecraft.network.chat';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Minecraft } from 'net.minecraft.client';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ItemStack } from 'net.minecraft.world.item';

  class DisplayEntry {
    static readonly ENTRY_HEIGHT: number;
    get displayAmount(): number;
    getEntryWidth(minecraft: Minecraft): number;
    getRemainingTicksRelative(partialTicks: number): number;
    getTextComponent(player: Player): Component;
    mayDiscard(): boolean;
    mayMergeWith(var1: DisplayEntry, var2: boolean): boolean;
    mergeWith(other: DisplayEntry): void;
    render(minecraft: Minecraft, guiGraphics: GuiGraphics, posX: number, posY: number, alpha: number, scale: number): void;
    resetEntry(): void;
    tick(): void;
  }


  interface ExperienceDisplayEntry extends DisplayEntry {}
  class ExperienceDisplayEntry extends DisplayEntry {
    constructor(name: Component, amount: number);
    mayMergeWith(other: DisplayEntry, excludeNamed: boolean): boolean;
  }


  interface ItemDisplayEntry extends DisplayEntry {}
  class ItemDisplayEntry extends DisplayEntry {
    constructor(stack: ItemStack, amount: number);
    mayMergeWith(other: DisplayEntry, excludeNamed: boolean): boolean;
  }

}

declare module 'fuzs.pickupnotifier.client.gui' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface PositionPreset extends Enum<PositionPreset> {}
  class PositionPreset extends Enum<PositionPreset> {
    static readonly TOP_LEFT: PositionPreset;
    static readonly TOP_RIGHT: PositionPreset;
    static readonly BOTTOM_LEFT: PositionPreset;
    static readonly BOTTOM_RIGHT: PositionPreset;
    bottom(): boolean;
    getX(textureWidth: number, scaledWidth: number, offset: number): number;
    getY(textureHeight: number, scaledHeight: number, offset: number): number;
    mirrored(): boolean;
    static valueOf(name: string): PositionPreset;
    static values(): PositionPreset[];
  }

}

declare module 'fuzs.pickupnotifier.client.handler' {
  import { Minecraft, DeltaTracker } from 'net.minecraft.client';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { PickUpCollector } from 'fuzs.pickupnotifier.client.util';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { LocalPlayer } from 'net.minecraft.client.player';
  import { MultiPlayerGameMode } from 'net.minecraft.client.multiplayer';
  import { Connection } from 'net.minecraft.network';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Level } from 'net.minecraft.world.level';

  class AddEntriesHandler {
    static addItemEntry(minecraft: Minecraft, stack: ItemStack): void;
    static addPickUpEntry(minecraft: Minecraft, entityId: number, amount: number): void;
    static onEntityPickup(minecraft: Minecraft, entityId: number, playerId: number, amount: number): void;
  }


  class DrawEntriesHandler {
    static readonly INSTANCE: DrawEntriesHandler;
    addHandledEntity(itemId: number): void;
    get collector(): PickUpCollector;
    isItemEntityHandled(itemId: number): boolean;
    onClientTick(minecraft: Minecraft): void;
    onCopy(oldPlayer: LocalPlayer, newPlayer: LocalPlayer, multiPlayerGameMode: MultiPlayerGameMode, connection: Connection): void;
    onLoggedOut(player: LocalPlayer, multiPlayerGameMode: MultiPlayerGameMode, connection: Connection): void;
    onRenderGui(minecraft: Minecraft, guiGraphics: GuiGraphics, deltaTracker: DeltaTracker): void;
  }


  class ItemBlacklistManager {
    static readonly INSTANCE: ItemBlacklistManager;
    isItemAllowed(dimension: ResourceKey<Level>, item: Item): boolean;
    loadAll(directory: string): void;
  }

}

declare module 'fuzs.pickupnotifier.client' {
  import { ClientModConstructor } from 'fuzs.puzzleslib.api.client.core.v1';

  interface PickUpNotifierClient extends ClientModConstructor {}
  class PickUpNotifierClient extends ClientModConstructor {
    onClientSetup(): void;
    onConstructMod(): void;
  }

}

declare module 'fuzs.pickupnotifier.client.util' {
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { ArrayList, Optional } from 'java.util';
  import { DisplayEntry } from 'fuzs.pickupnotifier.client.gui.entry';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';

  class DisplayEntryRenderHelper {
    static renderGuiItemDecorations(guiGraphics: GuiGraphics, font: Font, count: number, xPosition: number, yPosition: number): void;
    static renderTooltipInternal(guiGraphics: GuiGraphics, posX: number, posY: number, width: number, height: number, alpha: number): void;
  }


  interface PickUpCollector extends ArrayList<DisplayEntry> {}
  class PickUpCollector extends ArrayList<DisplayEntry> {
    add(entry: DisplayEntry, maxSize: number): void;
    findDuplicate(entry: DisplayEntry, excludeNamed: boolean): Optional<DisplayEntry>;
    getTotalFade(partialTicks: number): number;
    refresh(entry: DisplayEntry): void;
    tick(): void;
  }


  class TransparencyBuffer {
    static blit(poseStack: PoseStack, x: number, y: number, width: number, height: number, uOffset: number, vOffset: number, uWidth: number, vHeight: number, textureWidth: number, textureHeight: number): void;
    static drawExtraFramebuffer(guiGraphics: GuiGraphics): void;
    static postInject(): void;
    static preInject(alpha: number): void;
    static prepareExtraFramebuffer(): void;
    static resizeDisplay(): void;
  }

}

declare module 'fuzs.pickupnotifier.config' {
  import { ConfigCore, ValueCallback } from 'fuzs.puzzleslib.api.config.v3';
  import { GeneralConfig, BehaviorConfig, DisplayConfig } from 'fuzs.pickupnotifier.config.ClientConfig';
  import { Builder } from 'ModConfigSpec';

  interface ClientConfig extends ConfigCore {}
  class ClientConfig extends ConfigCore {
    readonly general: GeneralConfig;
    readonly behavior: BehaviorConfig;
    readonly display: DisplayConfig;
  }


  interface ServerConfig extends ConfigCore {}
  class ServerConfig extends ConfigCore {
    partialPickUps: boolean;
    backpackCompat: boolean;
    addToBuilder(builder: Builder, callback: ValueCallback): void;
  }

}

declare module 'fuzs.pickupnotifier.config.ClientConfig' {
  import { ConfigCore, ValueCallback } from 'fuzs.puzzleslib.api.config.v3';
  import { Builder } from 'ModConfigSpec';
  import { ChatFormatting } from 'net.minecraft';
  import { PositionPreset } from 'fuzs.pickupnotifier.client.gui';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface GeneralConfig extends ConfigCore {}
  class GeneralConfig extends ConfigCore {
    forceClient: boolean;
    includeItems: boolean;
    includeExperience: boolean;
    includeArrows: boolean;
    experienceValue: boolean;
    disableInCreative: boolean;
    addToBuilder(builder: Builder, callback: ValueCallback): void;
  }


  interface BehaviorConfig extends ConfigCore {}
  class BehaviorConfig extends ConfigCore {
    combineEntries: CombineEntries;
    displayTime: number;
    move: boolean;
    moveTime: number;
    fadeAway: boolean;
    addToBuilder(builder: Builder, callback: ValueCallback): void;
  }


  interface DisplayConfig extends ConfigCore {}
  class DisplayConfig extends ConfigCore {
    drawSprite: boolean;
    textColor: ChatFormatting;
    ignoreRarity: boolean;
    position: PositionPreset;
    offsetX: number;
    offsetY: number;
    maxHeight: number;
    scale: number;
    displayAmount: DisplayAmount;
    inventoryCount: boolean;
    displaySingleCount: boolean;
    entryBackground: EntryBackground;
    displayItemName: boolean;
    addToBuilder(builder: Builder, callback: ValueCallback): void;
  }


  interface CombineEntries extends Enum<CombineEntries> {}
  class CombineEntries extends Enum<CombineEntries> {
    static readonly ALWAYS: CombineEntries;
    static readonly NEVER: CombineEntries;
    static readonly EXCLUDE_NAMED: CombineEntries;
    static valueOf(name: string): CombineEntries;
    static values(): CombineEntries[];
  }


  interface EntryBackground extends Enum<EntryBackground> {}
  class EntryBackground extends Enum<EntryBackground> {
    static readonly NONE: EntryBackground;
    static readonly CHAT: EntryBackground;
    static readonly TOOLTIP: EntryBackground;
    static valueOf(name: string): EntryBackground;
    static values(): EntryBackground[];
  }


  interface DisplayAmount extends Enum<DisplayAmount> {}
  class DisplayAmount extends Enum<DisplayAmount> {
    static readonly OFF: DisplayAmount;
    static readonly SPRITE: DisplayAmount;
    static readonly TEXT: DisplayAmount;
    static readonly BOTH: DisplayAmount;
    sprite(): boolean;
    text(): boolean;
    static valueOf(name: string): DisplayAmount;
    static values(): DisplayAmount[];
  }

}

declare module 'fuzs.pickupnotifier.mixin.client' {
  import { ClientCommonPacketListenerImpl } from 'net.minecraft.client.multiplayer';
  import { ClientboundTakeItemEntityPacket } from 'net.minecraft.network.protocol.game';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  interface ClientPacketListenerMixin extends ClientCommonPacketListenerImpl {}
  class ClientPacketListenerMixin extends ClientCommonPacketListenerImpl {
    handleTakeItemEntity(packet: ClientboundTakeItemEntityPacket, callback: CallbackInfo): void;
  }


  class MinecraftMixin {
  }

}

declare module 'fuzs.pickupnotifier.neoforge.client' {
  import { ModContainer } from 'net.neoforged.fml';

  class PickUpNotifierNeoForgeClient {
    constructor(modContainer: ModContainer);
  }

}

declare module 'fuzs.pickupnotifier.neoforge.handler' {
  import { Pre, Post } from 'ItemEntityPickupEvent';

  class NeoForgeItemPickupHandler {
    static onEntityItemPickup$1(evt: Pre): void;
    static onEntityItemPickup$2(evt: Pre): void;
    static onPlayerItemPickup(evt: Post): void;
  }

}

declare module 'fuzs.pickupnotifier.neoforge' {
  import { ModContainer } from 'net.neoforged.fml';

  class PickUpNotifierNeoForge {
    constructor(modContainer: ModContainer);
  }

}

declare module 'fuzs.pickupnotifier.network' {
  import { WritableMessage } from 'fuzs.puzzleslib.api.network.v2';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { MessageHandler } from 'MessageV2';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';

  interface S2CTakeItemMessage extends WritableMessage<S2CTakeItemMessage> {}
  class S2CTakeItemMessage extends WritableMessage<S2CTakeItemMessage> {
    constructor(itemId: number, amount: number);

    constructor(buf: FriendlyByteBuf);
    handle(packet: S2CTakeItemMessage, player: Player, gameInstance: any): void;
    makeHandler(): MessageHandler<S2CTakeItemMessage>;
    write(buf: FriendlyByteBuf): void;
  }


  interface S2CTakeItemStackMessage extends WritableMessage<S2CTakeItemStackMessage> {}
  class S2CTakeItemStackMessage extends WritableMessage<S2CTakeItemStackMessage> {
    constructor(itemStack: ItemStack);

    constructor(buf: FriendlyByteBuf);
    handle(message: S2CTakeItemStackMessage, player: Player, gameInstance: any): void;
    makeHandler(): MessageHandler<S2CTakeItemStackMessage>;
    write(buf: FriendlyByteBuf): void;
  }

}

declare module 'fuzs.pickupnotifier' {
  import { ModConstructor } from 'fuzs.puzzleslib.api.core.v1';
  import { Logger } from 'org.slf4j';
  import { NetworkHandler } from 'fuzs.puzzleslib.api.network.v3';
  import { ConfigHolder } from 'fuzs.puzzleslib.api.config.v3';

  interface PickUpNotifier extends ModConstructor {}
  class PickUpNotifier extends ModConstructor {
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static readonly LOGGER: Logger;
    static readonly NETWORK: NetworkHandler;
    static readonly CONFIG: ConfigHolder;
  }

}