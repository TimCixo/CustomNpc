declare module 'me.flashyreese.mods.sodiumextra.client' {
  import { Minecraft, DeltaTracker } from 'net.minecraft.client';
  import { Logger } from 'org.slf4j';
  import { SodiumExtraGameOptions } from 'me.flashyreese.mods.sodiumextra.client.gui';
  import { CaffeineConfig } from 'net.caffeinemc.caffeineconfig';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class ClientTickHandler {
    get averageFps(): number;
    get highestFps(): number;
    get lowestFps(): number;
    onClientTick(client: Minecraft): void;
  }


  class SodiumExtraClientMod {
    static get clientTickHandler(): ClientTickHandler;
    static logger(): Logger;
    static mixinConfig(): CaffeineConfig;
    static onHudRender(guiGraphics: GuiGraphics, deltaTracker: DeltaTracker): void;
    static onTick(client: Minecraft): void;
    static options(): SodiumExtraGameOptions;
  }

}

declare module 'me.flashyreese.mods.sodiumextra.client.gui.options.control' {
  import { Control, ControlValueFormatter, ControlElement } from 'net.caffeinemc.mods.sodium.client.gui.options.control';
  import { Integer } from 'java.lang';
  import { Option } from 'net.caffeinemc.mods.sodium.client.gui.options';
  import { Dim2i } from 'net.caffeinemc.mods.sodium.client.util';

  interface SliderControlExtended extends Control<number> {}
  class SliderControlExtended extends Control<number> {
    constructor(option: Option<number>, min: number, max: number, interval: number, mode: ControlValueFormatter, displayIntValueWhileSliding: boolean);
    createElement(dim: Dim2i): ControlElement<number>;
    get maxWidth(): number;
    get option(): Option<number>;
  }

}

declare module 'me.flashyreese.mods.sodiumextra.client.gui.options.storage' {
  import { OptionStorage } from 'net.caffeinemc.mods.sodium.client.gui.options.storage';
  import { SodiumExtraGameOptions } from 'me.flashyreese.mods.sodiumextra.client.gui';

  interface SodiumExtraOptionsStorage extends OptionStorage<SodiumExtraGameOptions> {}
  class SodiumExtraOptionsStorage extends OptionStorage<SodiumExtraGameOptions> {
    get data(): SodiumExtraGameOptions;
    save(): void;
  }

}

declare module 'me.flashyreese.mods.sodiumextra.client.gui.scrollable_page' {
  import { AbstractWidget } from 'net.caffeinemc.mods.sodium.client.gui.widgets';
  import { ContainerEventHandler, GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { Dim2i } from 'net.caffeinemc.mods.sodium.client.util';
  import { GuiGraphics, ComponentPath } from 'net.minecraft.client.gui';
  import { Runnable } from 'java.lang';
  import { List } from 'java.util';
  import { FocusNavigationEvent, ScreenRectangle } from 'net.minecraft.client.gui.navigation';
  import { OptionPage } from 'net.caffeinemc.mods.sodium.client.gui.options';

  interface AbstractFrame extends ContainerEventHandler, AbstractWidget {}
  class AbstractFrame extends ContainerEventHandler {
    constructor(dim: Dim2i);
    applyScissor(guiGraphics: GuiGraphics, x: number, y: number, width: number, height: number, action: Runnable): void;
    buildFrame(): void;
    children(): GuiEventListener[];
    get focused(): GuiEventListener;
    get rectangle(): ScreenRectangle;
    isDragging(): boolean;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    nextFocusPath(navigation: FocusNavigationEvent): ComponentPath;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    set focused(focused: GuiEventListener);
    setDragging(dragging: boolean): void;
  }


  interface OptionPageScrollFrame extends AbstractFrame {}
  class OptionPageScrollFrame extends AbstractFrame {
    constructor(dim: Dim2i, page: OptionPage);
    buildFrame(): void;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, deltaX: number, deltaY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, horizontalAmount: number, verticalAmount: number): boolean;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    setupFrame(): void;
  }


  interface ScrollBarComponent extends AbstractWidget {}
  class ScrollBarComponent extends AbstractWidget {
    constructor(trackArea: Dim2i, frameLength: number, viewPortLength: number, onSetOffset: Runnable);

    constructor(scrollBarArea: Dim2i, frameLength: number, viewPortLength: number, onSetOffset: Runnable, extendedTrackArea: Dim2i);
    get offset(): number;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, deltaX: number, deltaY: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, horizontalAmount: number, verticalAmount: number): boolean;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    updateThumbPosition(): void;
  }

}

declare module 'me.flashyreese.mods.sodiumextra.client.gui' {
  import { SodiumExtraOptionsStorage } from 'me.flashyreese.mods.sodiumextra.client.gui.options.storage';
  import { MinecraftOptionsStorage } from 'net.caffeinemc.mods.sodium.client.gui.options.storage';
  import { OptionPage } from 'net.caffeinemc.mods.sodium.client.gui.options';
  import { AnimationSettings, ParticleSettings, DetailSettings, RenderSettings, ExtraSettings } from 'me.flashyreese.mods.sodiumextra.client.gui.SodiumExtraGameOptions';
  import { File } from 'java.io';
  import { Minecraft, DeltaTracker } from 'net.minecraft.client';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class SodiumExtraGameOptionPages {
    static readonly sodiumExtraOpts: SodiumExtraOptionsStorage;
    static readonly vanillaOpts: MinecraftOptionsStorage;
    static animation(): OptionPage;
    static detail(): OptionPage;
    static extra(): OptionPage;
    static particle(): OptionPage;
    static render(): OptionPage;
  }


  class SodiumExtraGameOptions {
    readonly animationSettings: AnimationSettings;
    readonly particleSettings: ParticleSettings;
    readonly detailSettings: DetailSettings;
    readonly renderSettings: RenderSettings;
    readonly extraSettings: ExtraSettings;
    static load(file: File): SodiumExtraGameOptions;
    writeChanges(): void;
  }


  class SodiumExtraHud {
    onHudRender(guiGraphics: GuiGraphics, deltaTracker: DeltaTracker): void;
    onStartTick(client: Minecraft): void;
  }

}

declare module 'me.flashyreese.mods.sodiumextra.client.gui.SodiumExtraGameOptions' {
  import { Map, List } from 'java.util';
  import { Enum } from 'java.lang';
  import { Component } from 'net.minecraft.network.chat';

  class AnimationSettings {
    animation: boolean;
    water: boolean;
    lava: boolean;
    fire: boolean;
    portal: boolean;
    blockAnimations: boolean;
    sculkSensor: boolean;
  }


  class ParticleSettings {
    particles: boolean;
    rainSplash: boolean;
    blockBreak: boolean;
    blockBreaking: boolean;
    otherMap: Map;
  }


  class DetailSettings {
    sky: boolean;
    sun: boolean;
    moon: boolean;
    stars: boolean;
    rainSnow: boolean;
    biomeColors: boolean;
    skyColors: boolean;
  }


  class RenderSettings {
    fogDistance: number;
    fogStart: number;
    multiDimensionFogControl: boolean;
    dimensionFogDistanceMap: Map;
    lightUpdates: boolean;
    itemFrame: boolean;
    armorStand: boolean;
    painting: boolean;
    piston: boolean;
    beaconBeam: boolean;
    limitBeaconBeamHeight: boolean;
    enchantingTableBook: boolean;
    itemFrameNameTag: boolean;
    playerNameTag: boolean;
  }


  class ExtraSettings {
    overlayCorner: OverlayCorner;
    textContrast: TextContrast;
    showFps: boolean;
    showFPSExtended: boolean;
    showCoords: boolean;
    reduceResolutionOnMac: boolean;
    useAdaptiveSync: boolean;
    cloudHeight: number;
    cloudDistance: number;
    toasts: boolean;
    advancementToast: boolean;
    recipeToast: boolean;
    systemToast: boolean;
    tutorialToast: boolean;
    instantSneak: boolean;
    preventShaders: boolean;
    steadyDebugHud: boolean;
    steadyDebugHudRefreshInterval: number;
  }


  interface VerticalSyncOption extends Enum<VerticalSyncOption> {}
  class VerticalSyncOption extends Enum<VerticalSyncOption> {
    static readonly OFF: VerticalSyncOption;
    static readonly ON: VerticalSyncOption;
    static readonly ADAPTIVE: VerticalSyncOption;
    static get availableOptions(): VerticalSyncOption[];
    get localizedName(): Component;
    static valueOf(name: string): VerticalSyncOption;
    static values(): VerticalSyncOption[];
  }


  interface TextContrast extends Enum<TextContrast> {}
  class TextContrast extends Enum<TextContrast> {
    static readonly NONE: TextContrast;
    static readonly BACKGROUND: TextContrast;
    static readonly SHADOW: TextContrast;
    get localizedName(): Component;
    static valueOf(name: string): TextContrast;
    static values(): TextContrast[];
  }


  interface OverlayCorner extends Enum<OverlayCorner> {}
  class OverlayCorner extends Enum<OverlayCorner> {
    static readonly TOP_LEFT: OverlayCorner;
    static readonly TOP_RIGHT: OverlayCorner;
    static readonly BOTTOM_LEFT: OverlayCorner;
    static readonly BOTTOM_RIGHT: OverlayCorner;
    get localizedName(): Component;
    static valueOf(name: string): OverlayCorner;
    static values(): OverlayCorner[];
  }

}

declare module 'me.flashyreese.mods.sodiumextra.client.render.vertex.formats' {
  import { VertexFormat } from 'com.mojang.blaze3d.vertex';
  import { Matrix4f } from 'org.joml';

  class TextureColorVertex {
    static readonly FORMAT: VertexFormat;
    static readonly STRIDE: number;
    static write(ptr: number, matrix: Matrix4f, x: number, y: number, z: number, color: number, u: number, v: number): void;
    static write(ptr: number, x: number, y: number, z: number, color: number, u: number, v: number): void;
  }


  class TextureVertex {
    static readonly FORMAT: VertexFormat;
    static readonly STRIDE: number;
    static write(ptr: number, matrix: Matrix4f, x: number, y: number, z: number, u: number, v: number): void;
    static write(ptr: number, x: number, y: number, z: number, u: number, v: number): void;
  }


  class WeatherVertex {
    static readonly FORMAT: VertexFormat;
    static readonly STRIDE: number;
    static put(ptr: number, x: number, y: number, z: number, u: number, v: number, color: number, light: number): void;
    static put(ptr: number, x: number, y: number, z: number, u: number, v: number, color: number, lightU: number, lightV: number): void;
  }

}

declare module 'me.flashyreese.mods.sodiumextra.common.util' {
  import { ControlValueFormatter } from 'net.caffeinemc.mods.sodium.client.gui.options.control';

  interface ControlValueFormatterExtended extends ControlValueFormatter {}
  class ControlValueFormatterExtended extends ControlValueFormatter {
    static fogDistance(): ControlValueFormatter;
    static resolution(): ControlValueFormatter;
    static ticks(): ControlValueFormatter;
  }


  class Utils {
    static packLight(lightU: number, lightV: number): number;
    static packPosition(x: number, z: number): number;
    static unpackIntegers(packedValue: number): number[];
  }

}

declare module 'me.flashyreese.mods.sodiumextra.compat' {
  import { VertexFormat } from 'com.mojang.blaze3d.vertex';
  import { VertexSerializer } from 'net.caffeinemc.mods.sodium.api.vertex.serializer';

  class IrisCompat {
    static get terrainFormat(): VertexFormat;
    static isIrisPresent(): boolean;
    static isRenderingShadowPass(): boolean;
  }


  interface ModelVertexToTerrainSerializer extends VertexSerializer {}
  class ModelVertexToTerrainSerializer extends VertexSerializer {
    serialize(src: number, dst: number, vertexCount: number): void;
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.adaptive_sync' {
  class MixinWindow {
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.animation' {
  import { AbstractTexture, TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { Ticker } from 'TextureAtlasSprite';

  interface MixinSpriteAtlasTexture extends AbstractTexture {}
  class MixinSpriteAtlasTexture extends AbstractTexture {
    sodiumExtra$tickAnimatedSprites(instance: TextureAtlasSprite): Ticker;
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.biome_colors' {
  class MixinBiomeColors {
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.cloud' {
  import { DimensionSpecialEffects } from 'net.minecraft.client.renderer';
  import { SkyType } from 'DimensionSpecialEffects';

  interface MixinDimensionEffectsOverworld extends DimensionSpecialEffects {}
  class MixinDimensionEffectsOverworld extends DimensionSpecialEffects {
    constructor(cloudsHeight: number, alternateSkyColor: boolean, skyType: SkyType, brightenLighting: boolean, darkened: boolean);
    get cloudHeight(): number;
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.compat' {
  class MixinSodiumOptionsGUI {
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.core' {
  class MixinGui {
  }


  class MixinMinecraftClient {
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.fog' {
  class MixinFogRenderer {
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.fog_falloff' {
  class MixinFogRenderer {
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.gui' {
  class MinecraftClientAccessor {
    static getFPS(): number;
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.instant_sneak' {
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  class MixinCamera {
    noLerp(ci: CallbackInfo): void;
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.light_updates' {
  import { BlockPos } from 'net.minecraft.core';
  import { CallbackInfo, CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Integer } from 'java.lang';

  class MixinLevelLightEngine {
    checkBlock(pos: BlockPos, ci: CallbackInfo): void;
    doLightUpdates(cir: CallbackInfoReturnable<number>): void;
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.optimizations.beacon_beam_rendering' {
  import { Frustum } from 'net.minecraft.client.renderer.culling';
  import { BeaconBlockEntity } from 'net.minecraft.world.level.block.entity';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  class LevelRendererAccessor {
    get cullingFrustum(): Frustum;
  }


  class MixinBeaconRenderer {
    render(beaconBlockEntity: BeaconBlockEntity, f: number, poseStack: PoseStack, multiBufferSource: MultiBufferSource, i: number, j: number, ci: CallbackInfo): void;
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.optimizations.draw_helpers' {
  import { RenderType } from 'net.minecraft.client.renderer';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { ResourceLocation } from 'net.minecraft.resources';

  class MixinGuiGraphics {
    drawTexturedQuad(texture: ResourceLocation, x1: number, x2: number, y1: number, y2: number, z: number, u1: number, u2: number, v1: number, v2: number, ci: CallbackInfo): void;
    drawTexturedQuad(texture: ResourceLocation, x1: number, x2: number, y1: number, y2: number, z: number, u1: number, u2: number, v1: number, v2: number, red: number, green: number, blue: number, alpha: number, ci: CallbackInfo): void;
    fill(type: RenderType, x1: number, y1: number, x2: number, y2: number, z: number, color: number, ci: CallbackInfo): void;
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.optimizations.fast_weather' {
  import { LightTexture } from 'net.minecraft.client.renderer';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  class MixinLevelRenderer {
    sodiumExtra$renderWeather(lightTexture: LightTexture, tickDelta: number, cameraX: number, cameraY: number, cameraZ: number, ci: CallbackInfo): void;
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.particle' {
  import { IntList } from 'it.unimi.dsi.fastutil.ints';
  import { CallbackInfo, CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Particle } from 'net.minecraft.client.particle';
  import { Camera } from 'net.minecraft.client';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { ParticleOptions } from 'net.minecraft.core.particles';

  class MixinFireworkParticle {
    addExplosionParticle(x: number, y: number, z: number, velocityX: number, velocityY: number, velocityZ: number, colors: IntList, targetColors: IntList, trail: boolean, flicker: boolean, ci: CallbackInfo): void;
    tick(instance: Particle, red: number, green: number, blue: number): void;
  }


  class MixinLevelRenderer {
    tickRainSplashing(camera: Camera, callbackInfo: CallbackInfo): void;
  }


  class MixinParticleEngine {
    addBlockBreakParticles(pos: BlockPos, state: BlockState, ci: CallbackInfo): void;
    addBlockBreakingParticles(pos: BlockPos, direction: Direction, ci: CallbackInfo): void;
    addParticle(particleOptions: ParticleOptions, d: number, e: number, f: number, g: number, h: number, i: number, cir: CallbackInfoReturnable<Particle>): void;
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.prevent_shaders' {
  class MixinGameRenderer {
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.profiler' {
  import { EntityRenderer } from 'net.minecraft.client.renderer.entity';
  import { Entity } from 'net.minecraft.world.entity';

  class MixinBlockEntityRenderDispatcher {
  }


  class MixinEntityRenderDispatcher {
    getRenderer<T extends Entity>(var1: T): EntityRenderer<T>;
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.reduce_resolution_on_mac' {
  class MixinWindow {
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.render.block.entity' {
  import { BeaconBlockEntity, EnchantingTableBlockEntity } from 'net.minecraft.world.level.block.entity';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { PistonMovingBlockEntity } from 'net.minecraft.world.level.block.piston';

  class MixinBeaconRenderer {
    render(beaconBlockEntity: BeaconBlockEntity, f: number, poseStack: PoseStack, multiBufferSource: MultiBufferSource, i: number, j: number, ci: CallbackInfo): void;
  }


  class MixinEnchantingTableBlockEntityRenderer {
    render(enchantingTableBlockEntity: EnchantingTableBlockEntity, f: number, poseStack: PoseStack, multiBufferSource: MultiBufferSource, i: number, j: number, ci: CallbackInfo): void;
  }


  class MixinPistonBlockEntityRenderer {
    render(pistonMovingBlockEntity: PistonMovingBlockEntity, f: number, poseStack: PoseStack, multiBufferSource: MultiBufferSource, i: number, j: number, ci: CallbackInfo): void;
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.render.entity' {
  import { ItemFrame, Painting } from 'net.minecraft.world.entity.decoration';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { EntityRenderer, RenderLayerParent } from 'net.minecraft.client.renderer.entity';

  class MixinItemFrameEntityRenderer {
    render(itemFrame: ItemFrame, f: number, g: number, poseStack: PoseStack, multiBufferSource: MultiBufferSource, i: number, ci: CallbackInfo): void;
  }


  interface MixinLivingEntityRenderer<T extends LivingEntity = any, M extends EntityModel<T> = any> extends RenderLayerParent<T, M>, EntityRenderer<T> {}
  class MixinLivingEntityRenderer<T extends LivingEntity = any, M extends EntityModel<T> = any> extends RenderLayerParent<T, M> {
  }


  class MixinPaintingEntityRenderer {
    render(painting: Painting, f: number, g: number, poseStack: PoseStack, multiBufferSource: MultiBufferSource, i: number, ci: CallbackInfo): void;
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.sky' {
  import { VertexBuffer, PoseStack } from 'com.mojang.blaze3d.vertex';
  import { Matrix4f } from 'org.joml';
  import { ShaderInstance } from 'net.minecraft.client.renderer';
  import { Operation } from 'com.llamalad7.mixinextras.injector.wrapoperation';
  import { Void } from 'java.lang';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  class MixinLevelRenderer {
    preRenderEndSky(stack: PoseStack, ci: CallbackInfo): void;
    redirectSetSkyShader(instance: VertexBuffer, viewMatrix: Matrix4f, projectionMatrix: Matrix4f, program: ShaderInstance, original: Operation<Void>): void;
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.sky_colors' {
  class MixinBiome {
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.sodium.accessibility' {
  class MixinSodiumGameOptionPages {
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.sodium.cloud' {
  class MixinCloudRenderer {
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.sodium.fog' {
  class MixinOcclusionCuller {
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.sodium.scrollable_page' {
  import { Screen } from 'net.minecraft.client.gui.screens';

  interface MixinSodiumOptionsGUI extends Screen {}
  class MixinSodiumOptionsGUI extends Screen {
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.sodium.vsync' {
  class MixinSodiumGameOptionsPages {
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin' {
  import { AbstractCaffeineConfigMixinPlugin } from 'net.caffeinemc.caffeineconfig';

  interface SodiumExtraMixinConfigPlugin extends AbstractCaffeineConfigMixinPlugin {}
  class SodiumExtraMixinConfigPlugin extends AbstractCaffeineConfigMixinPlugin {
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.stars' {
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { Operation } from 'com.llamalad7.mixinextras.injector.wrapoperation';
  import { Float } from 'java.lang';

  class MixinLevelRenderer {
    redirectGetStarBrightness(instance: ClientLevel, f: number, original: Operation<number>): number;
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.steady_debug_hud' {
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { DebugScreenOverlay } from 'net.minecraft.client.gui.components';
  import { List } from 'java.util';

  class MixinDebugScreenOverlay {
    preRender(guiGraphics: GuiGraphics, ci: CallbackInfo): void;
    sodiumExtra$redirectDrawLeftText(instance: DebugScreenOverlay, guiGraphics: GuiGraphics, text: string[], left: boolean): void;
    sodiumExtra$redirectDrawRightText(instance: DebugScreenOverlay, guiGraphics: GuiGraphics, text: string[], left: boolean): void;
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.sun_moon' {
  import { DimensionSpecialEffects } from 'net.minecraft.client.renderer';
  import { Operation } from 'com.llamalad7.mixinextras.injector.wrapoperation';

  class MixinLevelRenderer {
    redirectGetFogColorOverride(instance: DimensionSpecialEffects, skyAngle: number, tickDelta: number, original: Operation<number[]>): number[];
  }

}

declare module 'me.flashyreese.mods.sodiumextra.mixin.toasts' {
  import { Toast } from 'net.minecraft.client.gui.components.toasts';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  class MixinToastManager {
    goodByeToasts(toast: Toast, ci: CallbackInfo): void;
  }

}