declare module 'toni.sodiumextras' {
  import { Marker, Logger } from 'org.apache.logging.log4j';
  import { ModConfigSpec } from 'net.neoforged.neoforge.common';
  import { EnumValue, IntValue, BooleanValue, DoubleValue, ConfigValue } from 'ModConfigSpec';
  import { Options } from 'net.minecraft.client';
  import { FullScreenMode } from 'toni.sodiumextras.EmbyConfig';
  import { ModConfigEvent } from 'net.neoforged.fml.event.config';
  import { Pair } from 'it.unimi.dsi.fastutil';
  import { Class } from 'java.lang';
  import { ChatFormatting } from 'net.minecraft';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List } from 'java.util';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Entity } from 'net.minecraft.world.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { FpsHistory } from 'toni.sodiumextras.foundation.fps';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';

  class EmbyConfig {
    static readonly IT: Marker;
    static readonly SPECS: ModConfigSpec;
    static readonly fullScreen: EnumValue;
    static readonly fpsDisplayMode: EnumValue;
    static readonly fpsDisplayGravity: EnumValue;
    static readonly fpsDisplaySystemMode: EnumValue;
    static readonly fpsDisplayMargin: IntValue;
    static readonly fpsDisplayShadow: BooleanValue;
    static fpsDisplayMarginCache: number;
    static fpsDisplayShadowCache: boolean;
    static readonly fog: BooleanValue;
    static readonly cloudsHeight: IntValue;
    static readonly chunkFadeSpeed: EnumValue;
    static fogCache: boolean;
    static cloudsHeightCache: number;
    static readonly darknessMode: EnumValue;
    static readonly darknessOnOverworld: BooleanValue;
    static readonly darknessOnNether: BooleanValue;
    static readonly darknessNetherFogBright: DoubleValue;
    static readonly darknessOnEnd: BooleanValue;
    static readonly darknessEndFogBright: DoubleValue;
    static readonly darknessByDefault: BooleanValue;
    static readonly darknessDimensionWhiteList: ConfigValue;
    static readonly darknessOnNoSkyLight: BooleanValue;
    static readonly darknessBlockLightOnly: BooleanValue;
    static readonly darknessAffectedByMoonPhase: BooleanValue;
    static readonly darknessNewMoonBright: DoubleValue;
    static readonly darknessFullMoonBright: DoubleValue;
    static darknessOnOverworldCache: boolean;
    static darknessOnNetherCache: boolean;
    static darknessNetherFogBrightCache: number;
    static darknessOnEndCache: boolean;
    static darknessEndFogBrightCache: number;
    static darknessByDefaultCache: boolean;
    static darknessOnNoSkyLightCache: boolean;
    static darknessBlockLightOnlyCache: boolean;
    static darknessAffectedByMoonPhaseCache: boolean;
    static darknessNewMoonBrightCache: number;
    static darknessFullMoonBrightCache: number;
    static readonly hideJREI: BooleanValue;
    static readonly fontShadows: BooleanValue;
    static hideJREICache: boolean;
    static fontShadowsCache: boolean;
    static readonly tileEntityDistanceCulling: BooleanValue;
    static readonly tileEntityCullingDistanceX: IntValue;
    static readonly tileEntityCullingDistanceY: IntValue;
    static readonly entityDistanceCulling: BooleanValue;
    static readonly entityCullingDistanceX: IntValue;
    static readonly entityCullingDistanceY: IntValue;
    static readonly entityWhitelist: ConfigValue;
    static readonly tileEntityWhitelist: ConfigValue;
    static tileEntityDistanceCullingCache: boolean;
    static tileEntityCullingDistanceXCache: number;
    static tileEntityCullingDistanceYCache: number;
    static entityDistanceCullingCache: boolean;
    static entityCullingDistanceXCache: number;
    static entityCullingDistanceYCache: number;
    static readonly borderlessAttachModeF11: EnumValue;
    static readonly fastLanguageReload: BooleanValue;
    static fastLanguageReloadCache: boolean;
    static dynLightsOnEntitiesCache: boolean;
    static dynLightsOnTileEntitiesCache: boolean;
    static dynLightsUpdateOnPositionChangeCache: boolean;
    static isLoaded(): boolean;
    static setFullScreenMode(opts: Options, value: FullScreenMode): void;
    static updateCache(ignored: ModConfigEvent): void;
  }


  class EmbyTools {
    static benchEnd(): void;
    static benchStart(): void;
    static bytesToMB(input: number): number;
    static colorByLow(usage: number): ChatFormatting;
    static colorByPercent(usage: number): ChatFormatting;
    static getColorARGB(a: number, r: number, g: number, b: number): number;
    static getLastValue<T>(value: T[]): T;
    static invokeMethod(clazz: Class<any>, methodName: string, from: any, ...values: any[]): void;
    static isEntityWithinDistance(player: Player, entity: Entity, maxHeight: number, maxDistanceSquare: number): boolean;
    static isEntityWithinDistance(bePos: BlockPos, camVec: Vec3, maxHeight: number, maxDistanceSquare: number): boolean;
    static isEntityWithinDistance(entity: Entity, cameraX: number, cameraY: number, cameraZ: number, maxHeight: number, maxDistanceSquare: number): boolean;
    static isModInstalled(modid: string): boolean;
    static isWhitelisted(entityOrTile: ResourceLocation, configValue: ConfigValue<string[]>): boolean;
    static ramUsed(): number;
    static resourceLocationPair(res: string): Pair<string, string>;
    static setValueInField(clazz: Class<any>, fieldName: string, from: any, value: any): void;
    static tintByLower(usage: number): string;
    static tintByPercent(usage: number): string;
  }


  class SodiumExtras {
    static readonly ID: string;
    static readonly LOGGER: Logger;
    static fpsHistory: FpsHistory;
    constructor(modEventBus: IEventBus, modContainer: ModContainer);
  }

}

declare module 'toni.sodiumextras.EmbyConfig' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface FullScreenMode extends Enum<FullScreenMode> {}
  class FullScreenMode extends Enum<FullScreenMode> {
    static readonly WINDOWED: FullScreenMode;
    static readonly BORDERLESS: FullScreenMode;
    static readonly FULLSCREEN: FullScreenMode;
    static get vanillaConfig(): FullScreenMode;
    isBorderless(): boolean;
    static nextBorderless(current: FullScreenMode): FullScreenMode;
    static nextFullscreen(current: FullScreenMode): FullScreenMode;
    static nextOf(current: FullScreenMode): FullScreenMode;
    static valueOf(name: string): FullScreenMode;
    static values(): FullScreenMode[];
  }


  interface FPSDisplayMode extends Enum<FPSDisplayMode> {}
  class FPSDisplayMode extends Enum<FPSDisplayMode> {
    static readonly OFF: FPSDisplayMode;
    static readonly SIMPLE: FPSDisplayMode;
    static readonly ADVANCED: FPSDisplayMode;
    off(): boolean;
    static valueOf(name: string): FPSDisplayMode;
    static values(): FPSDisplayMode[];
  }


  interface FPSDisplayGravity extends Enum<FPSDisplayGravity> {}
  class FPSDisplayGravity extends Enum<FPSDisplayGravity> {
    static readonly LEFT: FPSDisplayGravity;
    static readonly CENTER: FPSDisplayGravity;
    static readonly RIGHT: FPSDisplayGravity;
    static valueOf(name: string): FPSDisplayGravity;
    static values(): FPSDisplayGravity[];
  }


  interface FPSDisplaySystemMode extends Enum<FPSDisplaySystemMode> {}
  class FPSDisplaySystemMode extends Enum<FPSDisplaySystemMode> {
    static readonly OFF: FPSDisplaySystemMode;
    static readonly ON: FPSDisplaySystemMode;
    static readonly GPU: FPSDisplaySystemMode;
    static readonly RAM: FPSDisplaySystemMode;
    gpu(): boolean;
    off(): boolean;
    ram(): boolean;
    static valueOf(name: string): FPSDisplaySystemMode;
    static values(): FPSDisplaySystemMode[];
  }


  interface ChunkFadeSpeed extends Enum<ChunkFadeSpeed> {}
  class ChunkFadeSpeed extends Enum<ChunkFadeSpeed> {
    static readonly OFF: ChunkFadeSpeed;
    static readonly FAST: ChunkFadeSpeed;
    static readonly SLOW: ChunkFadeSpeed;
    static valueOf(name: string): ChunkFadeSpeed;
    static values(): ChunkFadeSpeed[];
  }


  interface DarknessMode extends Enum<DarknessMode> {}
  class DarknessMode extends Enum<DarknessMode> {
    static readonly PITCH_BLACK: DarknessMode;
    static readonly TOTAL_DARKNESS: DarknessMode;
    static readonly DARK: DarknessMode;
    static readonly DIM: DarknessMode;
    static readonly OFF: DarknessMode;
    static valueOf(name: string): DarknessMode;
    static values(): DarknessMode[];
  }


  interface AttachMode extends Enum<AttachMode> {}
  class AttachMode extends Enum<AttachMode> {
    static readonly ATTACH: AttachMode;
    static readonly REPLACE: AttachMode;
    static readonly OFF: AttachMode;
    static valueOf(name: string): AttachMode;
    static values(): AttachMode[];
  }


  interface DynLightsSpeed extends Enum<DynLightsSpeed> {}
  class DynLightsSpeed extends Enum<DynLightsSpeed> {
    static readonly OFF: DynLightsSpeed;
    static readonly SLOW: DynLightsSpeed;
    static readonly NORMAL: DynLightsSpeed;
    static readonly FAST: DynLightsSpeed;
    static readonly SUPERFAST: DynLightsSpeed;
    static readonly FASTESTS: DynLightsSpeed;
    static readonly REALTIME: DynLightsSpeed;
    get delay(): number;
    off(): boolean;
    static valueOf(name: string): DynLightsSpeed;
    static values(): DynLightsSpeed[];
  }

}

declare module 'toni.sodiumextras.foundation.darkness.accessors' {
  class TextureAccess {
    embPlus$enableUploadHook(): void;
  }

}

declare module 'toni.sodiumextras.foundation.darkness' {
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Minecraft } from 'net.minecraft.client';
  import { GameRenderer } from 'net.minecraft.client.renderer';

  class DarknessPlus {
    static readonly MIN: number;
    static enabled: boolean;
    static darken(c: number, blockIndex: number, skyIndex: number): number;
    static getDarkFogColor(vanilla: Vec3, factor: number): Vec3;
    static luminance(r: number, g: number, b: number): number;
    static updateLuminance(tickDelta: number, client: Minecraft, gameRenderer: GameRenderer, prevFlicker: number): void;
  }

}

declare module 'toni.sodiumextras.foundation.embeddium' {
  import { Option, OptionGroup } from 'net.caffeinemc.mods.sodium.client.gui.options';
  import { FullScreenMode } from 'toni.sodiumextras.EmbyConfig';
  import { MinecraftOptionsStorage, SodiumOptionsStorage } from 'net.caffeinemc.mods.sodium.client.gui.options.storage';
  import { List } from 'java.util';

  class EmbPlusOptions {
    static getFullscreenOption(options: MinecraftOptionsStorage): Option<FullScreenMode>;
    static setFPSOptions(groups: OptionGroup[], sodiumOpts: SodiumOptionsStorage): void;
    static setPerformanceOptions(groups: OptionGroup[], sodiumOpts: SodiumOptionsStorage): void;
    static setQualityPlusOptions(groups: OptionGroup[], sodiumOpts: SodiumOptionsStorage): void;
  }

}

declare module 'toni.sodiumextras.foundation.embeddium.pages' {
  import { OptionPage } from 'net.caffeinemc.mods.sodium.client.gui.options';

  interface EntityCullingPage extends OptionPage {}
  class EntityCullingPage extends OptionPage {
    constructor();
  }


  interface OthersPage extends OptionPage {}
  class OthersPage extends OptionPage {
    constructor();
  }


  interface TrueDarknessPage extends OptionPage {}
  class TrueDarknessPage extends OptionPage {
    constructor();
  }

}

declare module 'toni.sodiumextras.foundation.entitydistance' {
  class IWhitelistCheck {
    embPlus$isAllowed(): boolean;
  }

}

declare module 'toni.sodiumextras.foundation.fps.accessors' {
  class IUsageGPU {
    embPlus$getSyncGpu(): number;
  }

}

declare module 'toni.sodiumextras.foundation.fps' {
  import { Pre } from 'RenderGuiEvent';
  import { Minecraft } from 'net.minecraft.client';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';
  import { ChatFormatting } from 'net.minecraft';

  class DebugOverlayEvent {
    static onRenderOverlay(event: Pre): void;
    static renderFPSChar(mc: Minecraft, graphics: GuiGraphics): void;
  }


  class FPSDisplay {
    add(param: number): FPSDisplay;
    add(param: string): FPSDisplay;
    add(component: Component): FPSDisplay;
    add(formatting: ChatFormatting): FPSDisplay;
    append(param: string): FPSDisplay;
    append(component: Component): FPSDisplay;
    append(formatting: ChatFormatting): FPSDisplay;
    isEmpty(): boolean;
    release(): void;
    split(): void;
    toString(): string;
  }


  class FpsHistory {
    add(fps: number): void;
    get average(): number;
    get maximum(): number;
    get minimum(): number;
  }

}

declare module 'toni.sodiumextras.foundation.fps.DebugOverlayEvent' {
  class AverageQueue {
  }

}

declare module 'toni.sodiumextras.mixins.impl.borderless.accessors' {
  class MainWindowAccessor {
    setDirty(var1: boolean): void;
  }

}

declare module 'toni.sodiumextras.mixins.impl.borderless' {
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  class BorderlessWindowMixin {
  }


  class KeyboardF11Mixin {
    redirect$handleFullScreenToggle(pWindowPointer: number, pKey: number, pScanCode: number, pAction: number, pModifiers: number, ci: CallbackInfo): void;
  }

}

declare module 'toni.sodiumextras.mixins.impl.cloudheight' {
  class CloudHeightMixin {
  }

}

declare module 'toni.sodiumextras.mixins.impl.darkness.accessors' {
  class LightTextureAccessor {
    get flicker(): number;
    isDirty(): boolean;
  }

}

declare module 'toni.sodiumextras.mixins.impl.darkness' {
  import { Minecraft } from 'net.minecraft.client';
  import { TextureAccess } from 'toni.sodiumextras.foundation.darkness.accessors';

  class DimensionEffectsMixin {
  }


  class GameRendererMixin {
    get minecraft(): Minecraft;
  }


  class LightMapTexManagerMixin {
  }


  interface NativeImageTextureMixin extends TextureAccess {}
  class NativeImageTextureMixin extends TextureAccess {
    embPlus$enableUploadHook(): void;
  }

}

declare module 'toni.sodiumextras.mixins.impl.darkness.DimensionEffectsMixin' {
  class EndMixin {
  }


  class NetherMixin {
  }

}

declare module 'toni.sodiumextras.mixins.impl.entitydistance' {
  import { Frustum } from 'net.minecraft.client.renderer.culling';
  import { CallbackInfoReturnable, CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Boolean } from 'java.lang';
  import { Entity } from 'net.minecraft.world.entity';
  import { IWhitelistCheck } from 'toni.sodiumextras.foundation.entitydistance';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Camera } from 'net.minecraft.client';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { BlockEntity, BlockEntityType } from 'net.minecraft.world.level.block.entity';

  class EntityDispatcherMixin {
    inject$shouldRender<E extends Entity>(entity: E, clippingHelper: Frustum, cameraX: number, cameraY: number, cameraZ: number, cir: CallbackInfoReturnable<boolean>): void;
  }


  interface EntityTypeMixin extends IWhitelistCheck {}
  class EntityTypeMixin extends IWhitelistCheck {
    embPlus$isAllowed(): boolean;
    embPlus$resourceLocation(): ResourceLocation;
  }


  class TileDispatcherMixin {
    camera: Camera;
    render<E extends BlockEntity>(tile: E, val: number, matrix: PoseStack, bufferSource: MultiBufferSource, ci: CallbackInfo): void;
  }


  interface TileEntityTypeMixin extends IWhitelistCheck {}
  class TileEntityTypeMixin extends IWhitelistCheck {
    embPlus$isAllowed(): boolean;
    static getKey(pBlockEntityType: BlockEntityType<any>): ResourceLocation;
  }

}

declare module 'toni.sodiumextras.mixins.impl.fontshadow' {
  import { Matrix4f } from 'org.joml';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { DisplayMode } from 'Font';
  import { CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Float } from 'java.lang';
  import { FormattedCharSequence } from 'net.minecraft.util';

  class FontMixin {
    inject$renderText(pText: string, pX: number, pY: number, pColor: number, pDropShadow: boolean, pMatrix: Matrix4f, pBuffer: MultiBufferSource, pDisplayMode: DisplayMode, pBackgroundColor: number, pPackedLightCoords: number, cir: CallbackInfoReturnable<number>): void;
    inject$renderText(pText: FormattedCharSequence, pX: number, pY: number, pColor: number, pDropShadow: boolean, pMatrix: Matrix4f, pBuffer: MultiBufferSource, pDisplayMode: DisplayMode, pBackgroundColor: number, pPackedLightCoords: number, cir: CallbackInfoReturnable<number>): void;
  }

}

declare module 'toni.sodiumextras.mixins.impl.fontshadow.FontMixin' {
  import { Style } from 'net.minecraft.network.chat';
  import { CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Boolean } from 'java.lang';

  class StringRenderOutputMixin {
    inject$accept(pPositionInCurrentSequence: number, pStyle: Style, pCodePoint: number, cir: CallbackInfoReturnable<boolean>): void;
  }

}

declare module 'toni.sodiumextras.mixins.impl.fps' {
  import { IUsageGPU } from 'toni.sodiumextras.foundation.fps.accessors';
  import { MultiPlayerGameMode } from 'net.minecraft.client.multiplayer';

  interface GpuUsageMixin extends IUsageGPU {}
  class GpuUsageMixin extends IUsageGPU {
    gameMode: MultiPlayerGameMode;
    embPlus$getSyncGpu(): number;
  }

}

declare module 'toni.sodiumextras.mixins.impl.language' {
  import { OptionsSubScreen } from 'net.minecraft.client.gui.screens.options';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Options, Minecraft } from 'net.minecraft.client';
  import { Component } from 'net.minecraft.network.chat';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Void } from 'java.lang';
  import { Operation } from 'com.llamalad7.mixinextras.injector.wrapoperation';

  interface LanguageMixin extends OptionsSubScreen {}
  class LanguageMixin extends OptionsSubScreen {
    constructor(screen: Screen, options: Options, component: Component);
    redirect$resourcesReload(instance: Minecraft, original: Operation<CompletableFuture<Void>>): CompletableFuture<Void>;
  }

}

declare module 'toni.sodiumextras.mixins.impl.sodium' {
  class EmbOptionsMixin {
  }


  class EmbPagesMixin {
  }

}

declare module 'toni.sodiumextras.mixins.impl.togglefog' {
  class FogMixin {
  }

}