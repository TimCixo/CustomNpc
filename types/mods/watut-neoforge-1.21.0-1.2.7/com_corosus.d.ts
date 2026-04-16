declare module 'com.corosus.watut.client' {
  import { PreparableReloadListener, ResourceManager } from 'net.minecraft.server.packs.resources';
  import { TextureAtlas, TextureManager } from 'net.minecraft.client.renderer.texture';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { Comparator, List } from 'java.util';
  import { ParticleRenderType, Particle } from 'net.minecraft.client.particle';
  import { CompletableFuture, Executor } from 'java.util.concurrent';
  import { Void } from 'java.lang';
  import { PreparationBarrier } from 'PreparableReloadListener';
  import { ProfilerFiller } from 'net.minecraft.util.profiling';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { BufferSource } from 'MultiBufferSource';
  import { LightTexture } from 'net.minecraft.client.renderer';
  import { Camera } from 'net.minecraft.client';

  interface CustomParticleEngine extends PreparableReloadListener {}
  class CustomParticleEngine extends PreparableReloadListener {
    readonly textureAtlas: TextureAtlas;
    constructor(p_107299_: ClientLevel, p_107300_: TextureManager);
    add(p_107345_: Particle): void;
    close(): void;
    countParticles(): string;
    static makeParticleRenderTypeComparator(renderOrder: ParticleRenderType[]): Comparator<ParticleRenderType>;
    reload(p_107305_: PreparationBarrier, p_107306_: ResourceManager, p_107307_: ProfilerFiller, p_107308_: ProfilerFiller, p_107309_: Executor, p_107310_: Executor): CompletableFuture<Void>;
    render(p_107337_: PoseStack, p_107338_: BufferSource, p_107339_: LightTexture, p_107340_: Camera, p_107341_: number): void;
    render(lightTexture: LightTexture, camera: Camera, partialTick: number): void;
    render(lightTexture: LightTexture, camera: Camera, partialTick: number, pickupParticleMode: boolean): void;
    setLevel(p_107343_: ClientLevel): void;
    tick(): void;
  }

}

declare module 'com.corosus.watut.client.CustomParticleEngine' {
  import { SpriteSet, ParticleProvider } from 'net.minecraft.client.particle';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { RandomSource } from 'net.minecraft.util';
  import { List } from 'java.util';

  interface MutableSpriteSet extends SpriteSet {}
  class MutableSpriteSet extends SpriteSet {
    get(p_107413_: number, p_107414_: number): TextureAtlasSprite;
    get(p_233889_: RandomSource): TextureAtlasSprite;
    rebind(p_107416_: TextureAtlasSprite[]): void;
  }


  class SpriteParticleRegistration<T extends ParticleOptions = any> {
    create(var1: SpriteSet): ParticleProvider<T>;
  }

}

declare module 'com.corosus.watut.client.screen' {
  import { Function } from 'java.util.function';
  import { ByteBuffer } from 'java.nio';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Class } from 'java.lang';
  import { Field, Method } from 'java.lang.reflect';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { BufferBuilder, Tesselator, PoseStack } from 'com.mojang.blaze3d.vertex';
  import { TextureManager, DynamicTexture } from 'net.minecraft.client.renderer.texture';
  import { ParticleRenderType } from 'net.minecraft.client.particle';
  import { AtomicBoolean } from 'java.util.concurrent.atomic';
  import { MainTarget } from 'com.mojang.blaze3d.pipeline';

  class ByteBufferProcessor {
    constructor(processingFunction: Function<ByteBuffer, ByteBuffer>);
    get processedBuffer(): ByteBuffer;
    hasProcessedBuffers(): boolean;
    hasWork(): boolean;
    shutdown(): void;
    submitForProcessing(buffer: ByteBuffer): void;
  }


  class RenderHelper {
    static performingOwnRender: boolean;
    static cursor: ResourceLocation;
    static guiMap: Class;
    static improvedFramebuffer: Class;
    static xaeroWorldMapTextureID: number;
    static guiMapPrimaryScaleFBO: Field;
    static colorTextureId: Field;
    static irisConfig: Class;
    static iris: Class;
    static getIrisConfig: Method;
    static areShadersEnabled: Method;
    static processor: ByteBufferProcessor;
    static bindVanillaRenderTargetAndSetupProjectionMatrix(): void;
    static compress(inputBuffer: ByteBuffer): ByteBuffer;
    static compressGZIP(inputBuffer: ByteBuffer): ByteBuffer;
    static decompress(screenData: ScreenData, compressedBuffer: ByteBuffer, expectedSize: number): ByteBuffer;
    static decompress2(screenData: ScreenData, compressedBuffer: ByteBuffer, expectedSize: number): ByteBuffer;
    static decompressGZIP(compressedBuffer: ByteBuffer): ByteBuffer;
    static get pixelDataFromFrameBuffer(): ByteBuffer;
    static guiRender(guiGraphics: GuiGraphics): void;
    static isShadersEnabled(): boolean;
    static isXaeroGuiMap(screen: Screen): boolean;
    static renderWithTooltipEnd(pGuiGraphics: GuiGraphics, pMouseX: number, pMouseY: number, pPartialTick: number): void;
    static unbindVanillaRenderTarget(): void;
    static useDynamicGUISystem(): boolean;
    static validatePixelByteBuffer(byteBuffer: ByteBuffer, expectedSize: number, expectedAlignment: number): boolean;
  }


  class ScreenData {
    begin(tesselator: Tesselator, textureManager: TextureManager): BufferBuilder;
    closeImage(): void;
    freeTexturePixelData(): void;
    get decompressionBuffer(): ByteBuffer;
    get gameTicksSinceFirstPacket(): number;
    get gameTicksSinceLastScreenReceiveAndRender(): number;
    get gameTicksSinceLastScreenSend(): number;
    get height(): number;
    get image(): DynamicTexture;
    get isBufferReady(): AtomicBoolean;
    get lastIndexReceived(): number;
    get lastScreen(): Screen;
    get particleRenderType(): ParticleRenderType;
    get texturePixelData(): ByteBuffer;
    get texturePixelDataPartial(): number[];
    get width(): number;
    initClient(): void;
    isNeedsNewRenderToPixelData(): boolean;
    markNeedsNewRenderFromPixelData(needsNewRender: boolean): void;
    needsNewRenderFromPixelData(): boolean;
    set decompressionBuffer(decompressionBuffer: ByteBuffer);
    set gameTicksSinceFirstPacket(gameTicksSinceFirstPacket: number);
    set gameTicksSinceLastScreenReceiveAndRender(gameTicksSinceLastScreenReceiveAndRender: number);
    set gameTicksSinceLastScreenSend(gameTicksSinceLastScreenSend: number);
    set height(height: number);
    set image(image: DynamicTexture);
    set lastIndexReceived(lastIndexReceived: number);
    set lastScreen(lastScreen: Screen);
    set particleRenderType(particleRenderType: ParticleRenderType);
    set texturePixelData(texturePixelData: ByteBuffer);
    set texturePixelDataPartial(texturePixelDataPartial: number[]);
    set width(width: number);
    setNeedsNewRenderToPixelData(needsNewRenderToPixelData: boolean): void;
    toString(): string;
  }


  class ScreenParticleRenderer {
    static isRenderingParticleGUI: boolean;
    static isRenderingParticleGUI2: boolean;
    width: number;
    height: number;
    static defaultWidthScaledDown: number;
    static defaultHeightScaledDown: number;
    static bytesPerPixel: number;
    widthScaledDown: number;
    heightScaledDown: number;
    needsInit: boolean;
    bind(): void;
    bindScaledDown(): void;
    checkSetup(): void;
    static get instance(): ScreenParticleRenderer;
    get mainRenderTarget(): MainTarget;
    get mainRenderTargetScaledDown(): MainTarget;
    innerBlit(pose: PoseStack, atlasLocation: ResourceLocation, x1: number, x2: number, y1: number, y2: number, blitOffset: number, minU: number, maxU: number, minV: number, maxV: number): void;
    innerBlitCustomShader(pose: PoseStack, p_281399_: number, p_283222_: number, p_283615_: number, p_283430_: number, p_281729_: number, p_283247_: number, p_282598_: number, p_282883_: number, p_283017_: number): void;
    innerBlitCustomShader2(textureID: number, pose: PoseStack, p_281399_: number, p_283222_: number, p_283615_: number, p_283430_: number, p_281729_: number, p_283247_: number, p_282598_: number, p_282883_: number, p_283017_: number): void;
    innerBlitCustomShaderHorizontal(pose: PoseStack, p_281399_: number, p_283222_: number, p_283615_: number, p_283430_: number, p_281729_: number, p_283247_: number, p_282598_: number, p_282883_: number, p_283017_: number): void;
    innerBlitCustomShaderVertical(pose: PoseStack, p_281399_: number, p_283222_: number, p_283615_: number, p_283430_: number, p_281729_: number, p_283247_: number, p_282598_: number, p_282883_: number, p_283017_: number): void;
    resize(width: number, height: number): void;
    resizeScaledDown(width: number, height: number): void;
    set mainRenderTarget(mainRenderTarget: MainTarget);
    setup(): void;
    unbind(): void;
    unbindScaledDown(): void;
  }

}

declare module 'com.corosus.watut.command' {
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack } from 'net.minecraft.commands';

  class CommandWatutReloadJSON {
    static get commandName(): string;
    static register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }

}

declare module 'com.corosus.watut.config' {
  import { IConfigCategory } from 'com.corosus.modconfig';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Vector3f } from 'org.joml';
  import { ItemStack } from 'net.minecraft.world.item';
  import { EquipmentSlot } from 'net.minecraft.world.entity';
  import { List } from 'java.util';

  class Adjustment {
    get matchingHandX(): string;
    get matchingHandY(): string;
    get matchingHandZ(): string;
    get otherHandX(): string;
    get otherHandY(): string;
    get otherHandZ(): string;
    set matchingHandX(matchingHandX: string);
    set matchingHandY(matchingHandY: string);
    set matchingHandZ(matchingHandZ: string);
    set otherHandX(otherHandX: string);
    set otherHandY(otherHandY: string);
    set otherHandZ(otherHandZ: string);
    toString(): string;
  }


  interface ConfigClient extends IConfigCategory {}
  class ConfigClient extends IConfigCategory {
    static dummySetting: boolean;
    static sendMouseInfo: boolean;
    static sendTypingSpeed: boolean;
    static sendActiveGui: boolean;
    static sendIdleState: boolean;
    static showIdleStatesInPlayerList: boolean;
    static showIdleStatesInPlayerAboveHead: boolean;
    static showPlayerAnimations: boolean;
    static showPlayerAnimation_Typing: boolean;
    static showPlayerAnimation_Idle: boolean;
    static showPlayerAnimation_Gui: boolean;
    static showPlayerActiveNonChatGui: boolean;
    static showPlayerActiveChatGui: boolean;
    static showPlayerActiveGuiIfNotExactMatch: boolean;
    static screenTypingVisible: boolean;
    static screenTypingRelativePosition_X: number;
    static screenTypingRelativePosition_Y: number;
    static screenTypingCharacterLimit: number;
    static screenTypingMultiplePlayersText: string;
    static screenTypingText: string;
    static playScreenOpenSounds: boolean;
    static playMouseClickSounds: boolean;
    static particleSizeScale: number;
    static tickReceiveAndRenderRateOfGUIUpdates: number;
    static dontSendDetailedGUIInfo: boolean;
    static dontSendItemInfo: boolean;
    static showGuisForYourOwnPlayerIn3rdPerson: boolean;
    get category(): string;
    get configFileName(): string;
    get name(): string;
    get registryName(): string;
    hookUpdatedValues(): void;
  }


  interface ConfigCommon extends IConfigCategory {}
  class ConfigCommon extends IConfigCategory {
    static announceIdleStatesInChat: boolean;
    static ticksToMarkPlayerIdle: number;
    get category(): string;
    get configFileName(): string;
    get name(): string;
    get registryName(): string;
    hookUpdatedValues(): void;
  }


  interface ConfigServerControlledSyncedToClient extends IConfigCategory {}
  class ConfigServerControlledSyncedToClient extends IConfigCategory {
    static dummySetting: boolean;
    static dynamicGuiUseOldSimpleGUIVisual: boolean;
    static dynamicGuiTickSendRateOfGUIUpdates: number;
    static dynamicGuiDontSendConstantGUIUpdates: boolean;
    static dynamicGuiBlurLevel: number;
    static dynamicGuiSizeRadiusInPixelsToShow: number;
    static dynamicGuiShowClientsEntireScreen: boolean;
    static dynamicGuiDisableBackgroundRendering: boolean;
    static showItemsBeingTransferredBetweenPlayerAndContainer: boolean;
    static distanceRequiredToShowGUIInfo: number;
    static showIdleStatesInPlayerList: boolean;
    static showIdleStatesInPlayerAboveHead: boolean;
    static showPlayerAnimations: boolean;
    static showPlayerAnimation_Typing: boolean;
    static showPlayerAnimation_Idle: boolean;
    static showPlayerAnimation_Gui: boolean;
    static showPlayerActiveNonChatGui: boolean;
    static showPlayerActiveChatGui: boolean;
    static screenTypingVisible: boolean;
    static playScreenOpenSounds: boolean;
    static playMouseClickSounds: boolean;
    get category(): string;
    get configFileName(): string;
    get name(): string;
    get registryName(): string;
    hookUpdatedValues(): void;
  }


  class ConfigServerSyncHelper {
    static get instance(): ConfigServerSyncHelper;
    get syncableConfigOnServer(): CompoundTag;
    updateSyncableConfigOnClient(nbt: CompoundTag): void;
  }


  class CustomArmCorrections {
    static get heldItemArmAdjustmentLists(): HeldItemArmAdjustmentLists;
    static getAdjustmentForArm(stackMainArm: ItemStack, stackotherHandArm: ItemStack, equipmentSlot: EquipmentSlot): Vector3f;
    static loadJsonConfigs(): boolean;
  }


  class HeldItemArmAdjustment {
    get adjustment(): Adjustment;
    get filters(): string[];
    get only_if_mod_installed(): string;
    set adjustment(adjustment: Adjustment);
    set filters(filters: string[]);
    set only_if_mod_installed(only_if_mod_installed: string);
    toString(): string;
  }


  class HeldItemArmAdjustmentLists {
    get heldItemArmAdjustments(): HeldItemArmAdjustment[];
    set heldItemArmAdjustments(held_item_arm_adjustments: HeldItemArmAdjustment[]);
    toString(): string;
  }

}

declare module 'com.corosus.watut' {
  import { Player } from 'net.minecraft.world.entity.player';
  import { List, UUID, HashMap } from 'java.util';
  import { TextureAtlas, TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { PlayerGuiState, PlayerChatState } from 'com.corosus.watut.PlayerStatus';
  import { Particle } from 'net.minecraft.client.particle';
  import { Lerpables } from 'com.corosus.watut.math';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ScreenData } from 'com.corosus.watut.client.screen';
  import { BlockPos } from 'net.minecraft.core';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { CustomParticleEngine } from 'com.corosus.watut.client';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Pair } from 'com.ibm.icu.impl';
  import { Float } from 'java.lang';
  import { PlayerTabOverlay } from 'net.minecraft.client.gui.components';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { PlayerInfo } from 'net.minecraft.client.multiplayer';
  import { EntityModel } from 'net.minecraft.client.model';
  import { Entity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { ItemStack } from 'net.minecraft.world.item';
  import { AbstractContainerMenu, ClickType } from 'net.minecraft.world.inventory';
  import { Pair as com_mojang_datafixers_util_Pair } from 'com.mojang.datafixers.util';
  import { ShaderInstance } from 'net.minecraft.client.renderer';
  import { Uniform } from 'com.mojang.blaze3d.shaders';
  import { ResourceProvider } from 'net.minecraft.server.packs.resources';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { VertexFormat } from 'com.mojang.blaze3d.vertex';
  import { SpriteSetPlayer } from 'com.corosus.watut.spritesets';
  import { PlayerList } from 'net.minecraft.server.players';

  class FakePlayerHelper {
    static isFakePlayer(object: Player): boolean;
  }


  class InventorySnapshot {
    itemStackList: List;
  }


  class ParticleRegistry {
    static inventory: SpriteInfo;
    static chest: SpriteInfo;
    static crafting: SpriteInfo;
    static escape: SpriteInfo;
    static sign: SpriteInfo;
    static book: SpriteInfo;
    static enchanting_table: SpriteInfo;
    static anvil: SpriteInfo;
    static beacon: SpriteInfo;
    static brewing_stand: SpriteInfo;
    static dispenser: SpriteInfo;
    static furnace: SpriteInfo;
    static grindstone: SpriteInfo;
    static hopper: SpriteInfo;
    static horse: SpriteInfo;
    static loom: SpriteInfo;
    static villager: SpriteInfo;
    static command_block: SpriteInfo;
    static chat_idle: SpriteInfo;
    static chat_typing: SpriteInfo;
    static idle: SpriteInfo;
    static particles: List;
    static add(name: string): SpriteInfo;
    static add(name: string, frames: number, tickDelay: number): SpriteInfo;
    static textureAtlasUpload(textureAtlas: TextureAtlas): void;
  }


  class PlayerStatus {
    lerpTicks: number;
    lerpTicksPrev: number;
    lerpTicksMax: number;
    lastPartialTick: number;
    yRotHeadWhileOverriding: number;
    xRotHeadWhileOverriding: number;
    yRotHeadBeforeOverriding: number;
    xRotHeadBeforeOverriding: number;
    constructor(playerGuiState: PlayerGuiState, uuid: UUID);
    get inventorySnapshotCarried(): InventorySnapshot;
    get inventorySnapshotContainer(): InventorySnapshot;
    get inventorySnapshotPlayer(): InventorySnapshot;
    get lastBlockOpened(): BlockPos;
    get lastTypeDiff(): number;
    get lastTypeString(): string;
    get lastTypeStringForAmp(): string;
    get lastTypeTime(): number;
    get lastTypeTimeForAmp(): number;
    get lerpPrev(): Lerpables;
    get lerpTarget(): Lerpables;
    get nbtCache(): CompoundTag;
    get particle(): Particle;
    get particleIdle(): Particle;
    get playerChatState(): PlayerChatState;
    get playerGuiState(): PlayerGuiState;
    get screenData(): ScreenData;
    get screenPosPercentX(): number;
    get screenPosPercentY(): number;
    get ticksSinceLastAction(): number;
    get ticksToMarkPlayerIdleSyncedForClient(): number;
    get typingAmplifier(): number;
    get typingAmplifierSmooth(): number;
    get uuid(): UUID;
    getPartialLerp(partialTick: number): number;
    isCarriedItemFromPlayerInventory(): boolean;
    isFlagForRemoval(): boolean;
    isIdle(): boolean;
    isLerping(): boolean;
    isPlayerGuiDontSendDetailedGUIInfo(): boolean;
    isPlayerGuiDontSendItemInfo(): boolean;
    isPressing(): boolean;
    reset(): void;
    resetParticles(): void;
    set inventorySnapshotCarried(inventorySnapshotCarried: InventorySnapshot);
    set inventorySnapshotContainer(inventorySnapshotContainer: InventorySnapshot);
    set inventorySnapshotPlayer(inventorySnapshotPlayer: InventorySnapshot);
    set lastBlockOpened(lastBlockOpened: BlockPos);
    set lastTypeDiff(lastTypeDiff: number);
    set lastTypeString(lastTypeString: string);
    set lastTypeStringForAmp(lastTypeStringForAmp: string);
    set lastTypeTime(lastTypeTime: number);
    set lastTypeTimeForAmp(lastTypeTimeForAmp: number);
    set lerpPrev(lerpPrev: Lerpables);
    set lerpTarget(lerpTarget: Lerpables);
    set nbtCache(nbtCache: CompoundTag);
    set particle(particle: Particle);
    set particleIdle(particleIdle: Particle);
    set playerChatState(playerChatState: PlayerChatState);
    set playerGuiState(playerGuiState: PlayerGuiState);
    set screenData(screenData: ScreenData);
    set screenPosPercentX(screenPosPercentX: number);
    set screenPosPercentY(screenPosPercentY: number);
    set ticksSinceLastAction(ticksSinceLastAction: number);
    set ticksToMarkPlayerIdleSyncedForClient(ticksToMarkPlayerIdleSyncedForClient: number);
    set typingAmplifier(typingAmplifier: number);
    set typingAmplifierSmooth(typingAmplifierSmooth: number);
    set uuid(uuid: UUID);
    setCarriedItemFromPlayerInventory(carriedItemFromPlayerInventory: boolean): void;
    setFlagForRemoval(flagForRemoval: boolean): void;
    setNewLerp(ticks: number): void;
    setPlayerGuiDontSendDetailedGUIInfo(playerGuiDontSendDetailedGUIInfo: boolean): void;
    setPlayerGuiDontSendItemInfo(playerGuiDontSendItemInfo: boolean): void;
    setPressing(pressing: boolean): void;
    tick(): void;
  }


  class PlayerStatusManager {
    lookupPlayerToStatus: HashMap;
    calculateViewVector(pXRot: number, pYRot: number): Vec3;
    get statusLocal(): PlayerStatus;
    getBodyAngle(player: Player): Vec3;
    getStatus(player: Player): PlayerStatus;
    getStatus(uuid: UUID): PlayerStatus;
    getStatus(uuid: UUID, local: boolean): PlayerStatus;
    playerLoggedIn(player: Player): void;
    setMouse(uuid: UUID, x: number, y: number, pressed: boolean): void;
    tickPlayer(player: Player): void;
    tickPlayerClient(player: Player): void;
  }


  interface PlayerStatusManagerClient extends PlayerStatusManager {}
  class PlayerStatusManagerClient extends PlayerStatusManager {
    lookupPlayerToStatusPrev: HashMap;
    static positionTexBlur: ShaderInstanceBlur;
    static positionTexBlurHorizontal: ShaderInstanceBlur;
    static positionTexBlurVertical: ShaderInstanceBlur;
    static particle: ShaderInstanceBlur;
    checkIfTyping(input: string, player: Player): boolean;
    checkPrev(uuid: UUID): void;
    get mousePos(): Pair<number, number>;
    static get particleEngine(): CustomParticleEngine;
    get statusLocal(): PlayerStatus;
    get statusPrevLocal(): PlayerStatus;
    get typingPlayers(): string;
    getParticlePosition(player: Player): Vec3;
    getStatusPrev(player: Player): PlayerStatus;
    getStatusPrev(uuid: UUID): PlayerStatus;
    getStatusPrev(uuid: UUID, local: boolean): PlayerStatus;
    isGuiFocusedOnTextBox(screen: Screen): boolean;
    isGuiForceTypeFocused(screen: Screen): boolean;
    onAction(): void;
    onGuiRender(): void;
    onKey(): void;
    onMouse(pressedAnything: boolean): void;
    receiveAny(uuid: UUID, data: CompoundTag): void;
    receiveItemMove(data: CompoundTag): void;
    receiveServerConfig(nbt: CompoundTag): void;
    renderPingIconHook(playerTabOverlay: PlayerTabOverlay, pGuiGraphics: GuiGraphics, p_281809_: number, p_282801_: number, pY: number, pPlayerInfo: PlayerInfo): boolean;
    sendChatStatus(playerStatus: PlayerChatState): void;
    sendChatStatus(playerStatus: PlayerChatState, force: boolean): void;
    sendGuiStatus(playerStatus: PlayerGuiState): void;
    sendGuiStatus(playerStatus: PlayerGuiState, force: boolean): void;
    sendIdle(status: PlayerStatus): void;
    sendMouse(pos: Pair<number, number>, pressed: boolean): void;
    sendScreenRenderData(status: PlayerStatus): void;
    sendTyping(status: PlayerStatus): void;
    setPoseTarget(uuid: UUID, becauseMousePress: boolean): void;
    setupRotationsHook(model: EntityModel, pEntity: Entity, pLimbSwing: number, pLimbSwingAmount: number, pAgeInTicks: number, pNetHeadYaw: number, pHeadPitch: number): void;
    shouldAnimate(player: Player): boolean;
    tickGame(): void;
    tickLocalPlayerClient(player: Player): void;
    tickOtherPlayerClient(player: Player): void;
    tickPlayerClient(player: Player): void;
    tickSyncing(player: Player): void;
    updateNearbyPlayerListAndCheckIfNewPlayerNear(): boolean;
  }


  interface PlayerStatusManagerServer extends PlayerStatusManager {}
  class PlayerStatusManagerServer extends PlayerStatusManager {
    broadcast(msg: string): void;
    doClickPost(abstractContainerMenu: AbstractContainerMenu, pSlotId: number, pButton: number, pClickType: ClickType, player: Player): void;
    doClickPre(abstractContainerMenu: AbstractContainerMenu, pSlotId: number, pButton: number, pClickType: ClickType, player: Player): void;
    get serverConfigNBT(): CompoundTag;
    getMatchingItem(itemStack: ItemStack, itemStackList: ItemStack[]): ItemStack;
    getSimpleItemStack(itemStack: ItemStack): ItemStack;
    handleIdleState(player: Player, idleTicks: number): void;
    makeNewInventorySnapshot(abstractContainerMenu: AbstractContainerMenu, player: Player): void;
    playerLoggedIn(player: Player): void;
    processInventorySnapshots(pre: ItemStack[], post: ItemStack[]): com_mojang_datafixers_util_Pair<ItemStack[], ItemStack[]>;
    receiveAny(player: Player, data: CompoundTag): void;
    sendItemMove(player: Player, level: Level, itemStack: ItemStack, fromX: number, fromY: number, fromZ: number, toX: number, toY: number, toZ: number): void;
    sendItemMove(player: Player, level: Level, itemStack: ItemStack, fromX: number, fromY: number, fromZ: number, toX: number, toY: number, toZ: number): void;
    sendItemMove(player: Player, itemStack: ItemStack, toContainer: boolean): void;
    syncServerConfigToAllPlayers(): void;
    tickPlayer(player: Player): void;
    useBlock(player: Player, pos: BlockPos): void;
  }


  interface ShaderInstanceBlur extends ShaderInstance {}
  class ShaderInstanceBlur extends ShaderInstance {
    readonly RESOLUTION: Uniform;
    readonly RADIUS: Uniform;
    readonly BLUR_LEVEL: Uniform;
    constructor(p_173336_: ResourceProvider, shaderLocation: ResourceLocation, p_173338_: VertexFormat);

    constructor(p_173336_: ResourceProvider, shaderLocation: string, p_173338_: VertexFormat);
  }


  class SpriteInfo {
    constructor(name: string, size: number, tickDelay: number);
    get name(): string;
    get resLocationName(): ResourceLocation;
    get sprite(): TextureAtlasSprite;
    get spriteSet(): SpriteSetPlayer;
    getResLocationName(index: number): ResourceLocation;
    isSpriteSet(): boolean;
    set sprite(sprite: TextureAtlasSprite);
    setSpriteSetPlayer(spriteSetPlayer: SpriteSetPlayer): void;
    setupSprites(textureAtlas: TextureAtlas): void;
  }


  class WatutMod {
    static readonly MODID: string;
    static configJSONName: string;
    constructor();
    static dbg(obj: any): void;
    static generateJsonConfigFile(filename: string): void;
    get farPlane(): number;
    get playerList(): PlayerList;
    static get playerStatusManagerClient(): PlayerStatusManagerClient;
    static get playerStatusManagerServer(): PlayerStatusManagerServer;
    static getContentsFromResourceLocation(resourceLocation: ResourceLocation): string;
    static instance(): WatutMod;
    isModInstalled(var1: string): boolean;
    loadConfigs(): void;
  }


  class WatutModClient {
    static get player(): Player;
  }


  class WatutNetworking {
    static NBTDataPlayerUUID: string;
    static NBTDataPlayerGuiStatus: string;
    static NBTDataPlayerGuiDontSendDetailedGUIInfo: string;
    static NBTDataPlayerGuiDontSendItemInfo: string;
    static NBTDataPlayerChatStatus: string;
    static NBTDataPlayerTypingAmp: string;
    static NBTDataPlayerScreenCompressedPixelData: string;
    static NBTDataPlayerScreenCompressedPixelDataPacketCount: string;
    static NBTDataPlayerScreenCompressedPixelDataPacketIndex: string;
    static NBTDataPlayerScreenCompressedPixelDataSize: string;
    static NBTDataPlayerScreenWidth: string;
    static NBTDataPlayerScreenHeight: string;
    static NBTDataPlayerIdleTicks: string;
    static NBTDataPlayerTicksToGoIdle: string;
    static NBTDataPlayerMouseX: string;
    static NBTDataPlayerMouseY: string;
    static NBTDataPlayerMousePressed: string;
    static NBTDataItemTransferItemStack: string;
    static NBTDataItemTransferFromX: string;
    static NBTDataItemTransferFromY: string;
    static NBTDataItemTransferFromZ: string;
    static NBTDataItemTransferToX: string;
    static NBTDataItemTransferToY: string;
    static NBTDataItemTransferToZ: string;
    static NBTDataServerConfig: string;
    listQueue: List;
    lastTickProcessed: number;
    constructor();
    clientSendToServer(var1: CompoundTag): void;
    clientSendToServerAddToQueue(data: CompoundTag): void;
    static instance(): WatutNetworking;
    process1ItemFromQueue(level: Level): void;
    serverSendToClientAll(var1: CompoundTag): void;
    serverSendToClientNear(var1: CompoundTag, var2: Vec3, var3: number, var5: Level): void;
    serverSendToClientPlayer(var1: CompoundTag, var2: Player): void;
  }

}

declare module 'com.corosus.watut.loader.neoforge' {
  import { TextureAtlasStitchedEvent, RegisterClientCommandsEvent } from 'net.neoforged.neoforge.client.event';
  import { Post } from 'ClientTickEvent';
  import { Post as inputevent_mousebutton_Post } from 'InputEvent.MouseButton';
  import { Key } from 'InputEvent';
  import { WatutMod, WatutNetworking } from 'com.corosus.watut';
  import { ModContainer } from 'net.neoforged.fml';
  import { RegisterPayloadHandlersEvent } from 'net.neoforged.neoforge.network.event';
  import { PlayerList } from 'net.minecraft.server.players';
  import { Post as playertickevent_Post } from 'PlayerTickEvent';
  import { PlayerLoggedInEvent } from 'PlayerEvent';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { BiConsumer } from 'java.util.function';
  import { Player } from 'net.minecraft.world.entity.player';
  import { PacketBase } from 'com.corosus.watut.network';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Level } from 'net.minecraft.world.level';

  class ClientEvents {
    getRegisteredParticles(event: TextureAtlasStitchedEvent): void;
    onGameTick(event: Post): void;
    onKey(event: Key): void;
    onMouse(event: inputevent_mousebutton_Post): void;
    onRegisterCommandsClient(event: RegisterClientCommandsEvent): void;
  }


  interface WatutModNeoForge extends WatutMod {}
  class WatutModNeoForge extends WatutMod {
    constructor(container: ModContainer);
    get farPlane(): number;
    get playerList(): PlayerList;
    isModInstalled(modID: string): boolean;
    onPlayerJoin(event: PlayerLoggedInEvent): void;
    onPlayerTick(event: playertickevent_Post): void;
    registerPackets(event: RegisterPayloadHandlersEvent): void;
  }


  interface WatutNetworkingNeoForge extends WatutNetworking {}
  class WatutNetworkingNeoForge extends WatutNetworking {
    clientSendToServer(data: CompoundTag): void;
    static register(...args: any[]): void;
    static registerClientboundPacket<T extends PacketBase, B extends FriendlyByteBuf>(type: Type<T>, codec: StreamCodec<B, T>, handler: BiConsumer<T, Player>, ...args: any[]): void;
    static registerServerboundPacket<T extends PacketBase, B extends FriendlyByteBuf>(type: Type<T>, codec: StreamCodec<B, T>, handler: BiConsumer<T, Player>, ...args: any[]): void;
    serverSendToClientAll(data: CompoundTag): void;
    serverSendToClientNear(data: CompoundTag, pos: Vec3, dist: number, level: Level): void;
    serverSendToClientPlayer(data: CompoundTag, player: Player): void;
  }

}

declare module 'com.corosus.watut.math' {
  import { PlayerStatus } from 'com.corosus.watut';

  class Lerpables {
    head: ModelPartData;
    body: ModelPartData;
    rightArm: ModelPartData;
    leftArm: ModelPartData;
    rightLeg: ModelPartData;
    leftLeg: ModelPartData;
  }


  class ModelPartData {
    x: number;
    y: number;
    z: number;
    xRot: number;
    yRot: number;
    zRot: number;
    xScale: number;
    yScale: number;
    zScale: number;
    copyOld(): ModelPartData;
    copyPartialLerp(playerStatus: PlayerStatus, modelPartDataPrev: ModelPartData, partialTick: number): ModelPartData;
  }

}

declare module 'com.corosus.watut.mixin' {
  import { NonNullList } from 'net.minecraft.core';

  class AbstractContainerMenuDoClick {
    readonly slots: NonNullList;
  }


  class BlockBehaviorUse {
  }


  class PlayerLoggedIn {
  }


  class PlayerTick {
  }

}

declare module 'com.corosus.watut.mixin.client' {
  import { Optional } from 'java.util';
  import { Resource } from 'net.minecraft.server.packs.resources';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { PlayerTabOverlay } from 'net.minecraft.client.gui.components';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { PlayerInfo } from 'net.minecraft.client.multiplayer';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  class GameRendererReloadShaders {
    getResource(resourceLocation: ResourceLocation): Optional<Resource>;
  }


  class GuiRender {
  }


  class KeyboardHandlerKeyPress {
  }


  class MinecraftTick {
  }


  class MouseHandlerOnPress {
  }


  class NativeImageAccessor {
    pixels(): number;
  }


  class ParticleEngineMixin {
  }


  class ParticleEngineMixinFabric {
  }


  class PostChainResize {
  }


  class RenderPingIconInject {
    renderPingIcon(playerTabOverlay: PlayerTabOverlay, pGuiGraphics: GuiGraphics, p_281809_: number, p_282801_: number, pY: number, pPlayerInfo: PlayerInfo): void;
  }


  class ScreenRenderBackground {
  }


  class ScreenRenderWithTooltip {
  }


  class SetupRotationsInject<T extends LivingEntity = any> {
    setupAnim(pEntity: T, pLimbSwing: number, pLimbSwingAmount: number, pAgeInTicks: number, pNetHeadYaw: number, pHeadPitch: number, ci: CallbackInfo): void;
  }


  class TextureAtlasUpload {
  }

}

declare module 'com.corosus.watut.network' {
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';

  interface PacketBase extends CustomPacketPayload {}
  class PacketBase extends CustomPacketPayload {
  }

}

declare module 'com.corosus.watut.particle' {
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { SpriteSetPlayer } from 'com.corosus.watut.spritesets';
  import { ParticleRenderType, TextureSheetParticle } from 'net.minecraft.client.particle';
  import { VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { Camera } from 'net.minecraft.client';
  import { HashSet } from 'java.util';
  import { BakedModel } from 'net.minecraft.client.resources.model';
  import { ItemStack } from 'net.minecraft.world.item';
  import { RenderBuffers } from 'net.minecraft.client.renderer';
  import { EntityRenderDispatcher } from 'net.minecraft.client.renderer.entity';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';

  interface ParticleAnimated extends ParticleRotating {}
  class ParticleAnimated extends ParticleRotating {
    constructor(pLevel: ClientLevel, pX: number, pY: number, pZ: number, pSprites: SpriteSetPlayer);
    setSize(pWidth: number, pHeight: number): void;
    tick(): void;
  }


  interface ParticleDynamic extends ParticleRotating {}
  class ParticleDynamic extends ParticleRotating {
    particleRenderType: ParticleRenderType;
    constructor(pLevel: ClientLevel, pX: number, pY: number, pZ: number, particleRenderType: ParticleRenderType);

    constructor(pLevel: ClientLevel, pX: number, pY: number, pZ: number, particleRenderType: ParticleRenderType, brightness: number);
    get renderType(): ParticleRenderType;
    render(pBuffer: VertexConsumer, pRenderInfo: Camera, pPartialTicks: number): void;
    setSize(pWidth: number, pHeight: number): void;
    tick(): void;
  }


  interface ParticleItem extends ParticleRotating {}
  class ParticleItem extends ParticleRotating {
    static itemBlacklist: HashSet;
    bakedModel: BakedModel;
    itemStack: ItemStack;
    xFrom: number;
    yFrom: number;
    zFrom: number;
    xTo: number;
    yTo: number;
    zTo: number;
    constructor(pLevel: ClientLevel, brightness: number, itemStack: ItemStack, renderBuffers: RenderBuffers, entityRenderDispatcher: EntityRenderDispatcher, xFrom: number, yFrom: number, zFrom: number, xTo: number, yTo: number, zTo: number);
    get renderType(): ParticleRenderType;
    render(pBuffer: VertexConsumer, pRenderInfo: Camera, pPartialTicks: number): void;
    setSize(pWidth: number, pHeight: number): void;
    tick(): void;
  }


  interface ParticleRotating extends TextureSheetParticle {}
  class ParticleRotating extends TextureSheetParticle {
    useCustomRotation: boolean;
    prevRotationYaw: number;
    rotationYaw: number;
    prevRotationPitch: number;
    rotationPitch: number;
    prevRotationRoll: number;
    rotationRoll: number;
    brightness: number;
    despawnCountdown: number;
    static CUSTOM: ParticleRenderType;
    static PARTICLE_SHEET_TRANSLUCENT_NO_FACE_CULL: ParticleRenderType;
    static TERRAIN_SHEET_TRANSLUCENT_NO_FACE_CULL: ParticleRenderType;
    constructor(pLevel: ClientLevel, pX: number, pY: number, pZ: number);
    get brightness(): number;
    get colorBlue(): number;
    get colorGreen(): number;
    get colorRed(): number;
    get renderType(): ParticleRenderType;
    keepAlive(): void;
    render(pBuffer: VertexConsumer, pRenderInfo: Camera, pPartialTicks: number): void;
    set brightness(brightness: number);
    setAlpha(alpha: number): void;
    setPosPrev(pX: number, pY: number, pZ: number): void;
    setQuadSize(size: number): void;
    tick(): void;
  }


  interface ParticleStatic extends ParticleRotating {}
  class ParticleStatic extends ParticleRotating {
    constructor(pLevel: ClientLevel, pX: number, pY: number, pZ: number, sprite: TextureAtlasSprite);

    constructor(pLevel: ClientLevel, pX: number, pY: number, pZ: number, sprite: TextureAtlasSprite, brightness: number);
    setSize(pWidth: number, pHeight: number): void;
    tick(): void;
  }


  interface ParticleStaticLoD extends ParticleRotating {}
  class ParticleStaticLoD extends ParticleRotating {
    constructor(pLevel: ClientLevel, pX: number, pY: number, pZ: number, pSprites: SpriteSetPlayer);

    constructor(pLevel: ClientLevel, pX: number, pY: number, pZ: number, pSprites: SpriteSetPlayer, brightness: number);
    setParticleFromDistanceToCamera(distanceToCamera: number): void;
    setSize(pWidth: number, pHeight: number): void;
    tick(): void;
  }


  interface ParticleStaticPartial extends ParticleRotating {}
  class ParticleStaticPartial extends ParticleRotating {
    customU1: number;
    customV1: number;
    constructor(pLevel: ClientLevel, pX: number, pY: number, pZ: number, sprite: TextureAtlasSprite, brightness: number, subSizeX: number, subSizeY: number);
    setSize(pWidth: number, pHeight: number): void;
    tick(): void;
  }

}

declare module 'com.corosus.watut.PlayerStatus' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface PlayerGuiState extends Enum<PlayerGuiState> {}
  class PlayerGuiState extends Enum<PlayerGuiState> {
    static readonly NONE: PlayerGuiState;
    static readonly CHAT_SCREEN: PlayerGuiState;
    static readonly INVENTORY: PlayerGuiState;
    static readonly CRAFTING: PlayerGuiState;
    static readonly ESCAPE: PlayerGuiState;
    static readonly EDIT_SIGN: PlayerGuiState;
    static readonly EDIT_BOOK: PlayerGuiState;
    static readonly CHEST: PlayerGuiState;
    static readonly ENCHANTING_TABLE: PlayerGuiState;
    static readonly ANVIL: PlayerGuiState;
    static readonly BEACON: PlayerGuiState;
    static readonly BREWING_STAND: PlayerGuiState;
    static readonly DISPENSER: PlayerGuiState;
    static readonly FURNACE: PlayerGuiState;
    static readonly GRINDSTONE: PlayerGuiState;
    static readonly HOPPER: PlayerGuiState;
    static readonly HORSE: PlayerGuiState;
    static readonly LOOM: PlayerGuiState;
    static readonly VILLAGER: PlayerGuiState;
    static readonly COMMAND_BLOCK: PlayerGuiState;
    static readonly MISC: PlayerGuiState;
    static canPreventIdleInGui(playerGuiState: PlayerGuiState): boolean;
    static get(intValue: number): PlayerGuiState;
    static isPointingGui(playerGuiState: PlayerGuiState): boolean;
    static isSoundMakerGui(playerGuiState: PlayerGuiState): boolean;
    static isTypingGui(playerGuiState: PlayerGuiState): boolean;
    static valueOf(name: string): PlayerGuiState;
    static values(): PlayerGuiState[];
  }


  interface PlayerChatState extends Enum<PlayerChatState> {}
  class PlayerChatState extends Enum<PlayerChatState> {
    static readonly NONE: PlayerChatState;
    static readonly CHAT_FOCUSED: PlayerChatState;
    static readonly CHAT_TYPING: PlayerChatState;
    static get(intValue: number): PlayerChatState;
    static valueOf(name: string): PlayerChatState;
    static values(): PlayerChatState[];
  }

}

declare module 'com.corosus.watut.spritesets' {
  import { SpriteSet } from 'net.minecraft.client.particle';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { RandomSource } from 'net.minecraft.util';
  import { List } from 'java.util';

  interface SpriteSetPlayer extends SpriteSet {}
  class SpriteSetPlayer extends SpriteSet {
    constructor(tickDelay: number, frames: number);
    get(pAge: number, pLifetime: number): TextureAtlasSprite;
    get(pRandom: RandomSource): TextureAtlasSprite;
    get frames(): number;
    get list(): TextureAtlasSprite[];
    set list(list: TextureAtlasSprite[]);
  }

}