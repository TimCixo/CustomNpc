declare module 'com.anthonyhilyard.legendarytooltips.client' {
  class LegendaryTooltipsClient {
    static init(): void;
  }

}

declare module 'com.anthonyhilyard.legendarytooltips.compat' {
  import { ItemStack } from 'net.minecraft.world.item';
  import { LocalPlayer } from 'net.minecraft.client.player';

  class RelicsHandler {
    static hasTooltipDecor(itemStack: ItemStack, player: LocalPlayer): boolean;
  }

}

declare module 'com.anthonyhilyard.legendarytooltips.config' {
  import { ResourceManagerReloadListener, ResourceManager } from 'net.minecraft.server.packs.resources';

  interface FrameResourceParser extends ResourceManagerReloadListener {}
  class FrameResourceParser extends ResourceManagerReloadListener {
    static readonly INSTANCE: FrameResourceParser;
    onResourceManagerReload(resourceManager: ResourceManager): void;
  }

}

declare module 'com.anthonyhilyard.legendarytooltips' {
  import { Logger } from 'org.apache.logging.log4j';
  import { KeyMapping, DeltaTracker } from 'net.minecraft.client';
  import { GatherResult, ColorExtResult } from 'RenderTooltipEvents';
  import { ItemStack } from 'net.minecraft.world.item';
  import { List } from 'java.util';
  import { Either } from 'com.mojang.datafixers.util';
  import { FormattedText } from 'net.minecraft.network.chat';
  import { TooltipComponent } from 'net.minecraft.world.inventory.tooltip';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { ClientTooltipComponent } from 'net.minecraft.client.gui.screens.inventory.tooltip';

  class LegendaryTooltips {
    static readonly MODID: string;
    static readonly LOGGER: Logger;
    static readonly NUM_FRAMES: number;
    static readonly scrollTooltips: KeyMapping;
    static scrollTooltipsKeyDown: boolean;
    static init(): void;
    static onGatherComponentsEvent(itemStack: ItemStack, screenWidth: number, screenHeight: number, tooltipElements: Either<FormattedText, TooltipComponent>[], maxWidth: number, index: number): GatherResult;
    static onPostTooltipEvent(stack: ItemStack, graphics: GuiGraphics, x: number, y: number, font: Font, width: number, height: number, components: ClientTooltipComponent[], comparison: boolean, index: number): void;
    static onRenderTick(tracker: DeltaTracker): void;
    static onTooltipColorEvent(stack: ItemStack, graphics: GuiGraphics, x: number, y: number, font: Font, backgroundStart: number, backgroundEnd: number, borderStart: number, borderEnd: number, components: ClientTooltipComponent[], comparison: boolean, index: number): ColorExtResult;
  }

}

declare module 'com.anthonyhilyard.legendarytooltips.mixin' {
  import { Player } from 'net.minecraft.world.entity.player';
  import { Holder } from 'net.minecraft.core';
  import { Attribute, AttributeModifier } from 'net.minecraft.world.entity.ai.attributes';
  import { Consumer } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { Set, List } from 'java.util';
  import { ClassNode } from 'org.objectweb.asm.tree';
  import { AbstractContainerEventHandler, GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { CallbackInfo, CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Boolean } from 'java.lang';

  class BakedGlyphMixin {
  }


  class GuiGraphicsMixin {
  }


  class ItemStackMixin {
    getAttributeBaseValueProxy(player: Player, holder: Holder<Attribute>, consumer: Consumer<Component>, player2: Player, holder2: Holder<Attribute>, attributeModifier: AttributeModifier): number;
  }


  class KeyboardHandlerMixin {
  }


  interface MixinConfig extends IMixinConfigPlugin {}
  class MixinConfig extends IMixinConfigPlugin {
    acceptTargets(myTargets: Set<string>, otherTargets: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    onLoad(mixinPackage: string): void;
    postApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    preApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    shouldApplyMixin(targetClassName: string, mixinClassName: string): boolean;
  }


  class MouseHandlerMixin {
  }


  interface ScreenMixin extends AbstractContainerEventHandler {}
  class ScreenMixin extends AbstractContainerEventHandler {
    children(): GuiEventListener[];
    keyPressed(i: number, j: number, k: number, info: CallbackInfoReturnable<boolean>): void;
    screenClosed(info: CallbackInfo): void;
  }

}

declare module 'com.anthonyhilyard.legendarytooltips.mixin.emi' {
  class EmiRenderHelperMixin {
  }

}

declare module 'com.anthonyhilyard.legendarytooltips.neoforge.client' {
  class LegendaryTooltipsNeoForgeClient {
    constructor();
  }

}

declare module 'com.anthonyhilyard.legendarytooltips.neoforge.mixin' {
  class AttributeUtilMixin {
  }

}

declare module 'com.anthonyhilyard.legendarytooltips.tooltip' {
  import { TooltipComponent } from 'net.minecraft.world.inventory.tooltip';
  import { ClientTooltipComponent } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Font, GuiGraphics } from 'net.minecraft.client.gui';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { List } from 'java.util';
  import { FrameDefinition } from 'LegendaryTooltipsConfig';

  interface ItemModelComponent extends TooltipComponent, ClientTooltipComponent {}
  class ItemModelComponent extends TooltipComponent {
    static readonly PADDING: number;
    constructor(itemStack: ItemStack);
    get height(): number;
    static get renderHeight(): number;
    static get renderWidth(): number;
    getWidth(p_169952_: Font): number;
    static registerFactory(): void;
    renderImage(font: Font, x: number, y: number, graphics: GuiGraphics): void;
    static updateTimer(partialTick: number): void;
  }


  class TooltipDecor {
    static readonly DEFAULT_BORDERS: ResourceLocation;
    static drawBorder(poseStack: PoseStack, x: number, y: number, width: number, height: number, item: ItemStack, components: ClientTooltipComponent[], font: Font, frameDefinition: FrameDefinition, comparison: boolean, index: number): void;
    static drawSeparator(poseStack: PoseStack, x: number, y: number, width: number, color: number): void;
    static drawShadow(poseStack: PoseStack, x: number, y: number, width: number, height: number): void;
    static resetTimer(): void;
    static setCurrentTooltipBackgroundEnd(color: number): void;
    static setCurrentTooltipBackgroundStart(color: number): void;
    static setCurrentTooltipBorderEnd(color: number): void;
    static setCurrentTooltipBorderStart(color: number): void;
    static updateTimer(deltaTime: number): void;
  }

}