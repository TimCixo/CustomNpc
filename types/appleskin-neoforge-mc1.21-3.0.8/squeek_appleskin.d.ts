declare module 'squeek.appleskin.api.event' {
  import { Event, ICancellableEvent } from 'net.neoforged.bus.api';
  import { FoodProperties } from 'net.minecraft.world.food';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface FoodValuesEvent extends Event {}
  class FoodValuesEvent extends Event {
    defaultFoodProperties: FoodProperties;
    modifiedFoodProperties: FoodProperties;
    readonly itemStack: ItemStack;
    readonly player: Player;
    constructor(player: Player, itemStack: ItemStack, defaultFoodProperties: FoodProperties, modifiedFoodProperties: FoodProperties);
  }


  interface HUDOverlayEvent extends ICancellableEvent, Event {}
  class HUDOverlayEvent extends ICancellableEvent {
    x: number;
    y: number;
    guiGraphics: GuiGraphics;
  }


  interface TooltipOverlayEvent extends ICancellableEvent, Event {}
  class TooltipOverlayEvent extends ICancellableEvent {
    readonly defaultFood: FoodProperties;
    readonly modifiedFood: FoodProperties;
    readonly itemStack: ItemStack;
  }

}

declare module 'squeek.appleskin.api.event.HUDOverlayEvent' {
  import { HUDOverlayEvent } from 'squeek.appleskin.api.event';
  import { FoodProperties } from 'net.minecraft.world.food';
  import { ItemStack } from 'net.minecraft.world.item';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface HealthRestored extends HUDOverlayEvent {}
  class HealthRestored extends HUDOverlayEvent {
    readonly foodProperties: FoodProperties;
    readonly itemStack: ItemStack;
    readonly modifiedHealth: number;
    constructor(modifiedHealth: number, itemStack: ItemStack, foodProperties: FoodProperties, x: number, y: number, guiGraphics: GuiGraphics);
  }


  interface HungerRestored extends HUDOverlayEvent {}
  class HungerRestored extends HUDOverlayEvent {
    readonly foodProperties: FoodProperties;
    readonly itemStack: ItemStack;
    readonly currentFoodLevel: number;
    constructor(foodLevel: number, itemStack: ItemStack, foodProperties: FoodProperties, x: number, y: number, guiGraphics: GuiGraphics);
  }


  interface Saturation extends HUDOverlayEvent {}
  class Saturation extends HUDOverlayEvent {
    readonly saturationLevel: number;
    constructor(saturationLevel: number, x: number, y: number, guiGraphics: GuiGraphics);
  }


  interface Exhaustion extends HUDOverlayEvent {}
  class Exhaustion extends HUDOverlayEvent {
    readonly exhaustion: number;
    constructor(exhaustion: number, x: number, y: number, guiGraphics: GuiGraphics);
  }

}

declare module 'squeek.appleskin.api.event.TooltipOverlayEvent' {
  import { TooltipOverlayEvent } from 'squeek.appleskin.api.event';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ItemStack } from 'net.minecraft.world.item';
  import { FoodProperties } from 'net.minecraft.world.food';

  interface Render extends TooltipOverlayEvent {}
  class Render extends TooltipOverlayEvent {
    x: number;
    y: number;
    guiGraphics: GuiGraphics;
    constructor(itemStack: ItemStack, x: number, y: number, guiGraphics: GuiGraphics, defaultFood: FoodProperties, modifiedFood: FoodProperties);
  }


  interface Pre extends TooltipOverlayEvent {}
  class Pre extends TooltipOverlayEvent {
    constructor(itemStack: ItemStack, defaultFood: FoodProperties, modifiedFood: FoodProperties);
  }

}

declare module 'squeek.appleskin' {
  import { Logger } from 'org.apache.logging.log4j';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';
  import { BooleanValue, DoubleValue } from 'ModConfigSpec';
  import { ModConfigSpec } from 'net.neoforged.neoforge.common';

  class AppleSkin {
    static Log: Logger;
    constructor(modEventBus: IEventBus, container: ModContainer);
  }


  class ModConfig {
    static readonly CATEGORY_CLIENT: string;
    static readonly SHOW_FOOD_VALUES_IN_TOOLTIP: BooleanValue;
    static SHOW_FOOD_VALUES_IN_TOOLTIP_DEFAULT: boolean;
    static readonly ALWAYS_SHOW_FOOD_VALUES_TOOLTIP: BooleanValue;
    static ALWAYS_SHOW_FOOD_VALUES_TOOLTIP_DEFAULT: boolean;
    static readonly SHOW_SATURATION_OVERLAY: BooleanValue;
    static SHOW_SATURATION_OVERLAY_DEFAULT: boolean;
    static readonly SHOW_FOOD_VALUES_OVERLAY: BooleanValue;
    static SHOW_FOOD_VALUES_OVERLAY_DEFAULT: boolean;
    static readonly SHOW_FOOD_VALUES_OVERLAY_WHEN_OFFHAND: BooleanValue;
    static SHOW_FOOD_VALUES_OVERLAY_WHEN_OFFHAND_DEFAULT: boolean;
    static readonly SHOW_FOOD_EXHAUSTION_UNDERLAY: BooleanValue;
    static SHOW_FOOD_EXHAUSTION_UNDERLAY_DEFAULT: boolean;
    static readonly SHOW_FOOD_DEBUG_INFO: BooleanValue;
    static SHOW_FOOD_DEBUG_INFO_DEFAULT: boolean;
    static readonly SHOW_FOOD_HEALTH_HUD_OVERLAY: BooleanValue;
    static SHOW_FOOD_HEALTH_HUD_OVERLAY_DEFAULT: boolean;
    static readonly SHOW_VANILLA_ANIMATION_OVERLAY: BooleanValue;
    static SHOW_VANILLA_ANIMATION_OVERLAY_DEFAULT: boolean;
    static readonly MAX_HUD_OVERLAY_FLASH_ALPHA: DoubleValue;
    static MAX_HUD_OVERLAY_FLASH_ALPHA_DEFAULT: number;
    static readonly SPEC: ModConfigSpec;
  }


  class ModInfo {
    static readonly MODID: string;
    static readonly MODID_LOWER: string;
    static readonly GUI_FACTORY_CLASS: string;
  }

}

declare module 'squeek.appleskin.client' {
  import { DebugText } from 'CustomizeGuiOverlayEvent';
  import { RegisterGuiLayersEvent, RegisterClientTooltipComponentFactoriesEvent } from 'net.neoforged.neoforge.client.event';
  import { Player } from 'net.minecraft.world.entity.player';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Post } from 'ClientTickEvent';
  import { GatherComponents } from 'RenderTooltipEvent';

  class DebugInfoHandler {
    static init(): void;
    onTextRender(textEvent: DebugText): void;
  }


  class HUDOverlayHandler {
    static disableAlpha(alpha: number): void;
    static drawExhaustionOverlay(exhaustion: number, player: Player, guiGraphics: GuiGraphics, right: number, top: number, alpha: number): void;
    static drawHealthOverlay(health: number, modifiedHealth: number, player: Player, guiGraphics: GuiGraphics, right: number, top: number, alpha: number, guiTicks: number): void;
    static drawHungerOverlay(hungerRestored: number, foodLevel: number, player: Player, guiGraphics: GuiGraphics, right: number, top: number, alpha: number, useRottenTextures: boolean, guiTicks: number): void;
    static drawSaturationOverlay(saturationGained: number, saturationLevel: number, player: Player, guiGraphics: GuiGraphics, right: number, top: number, alpha: number, guiTicks: number): void;
    static enableAlpha(alpha: number): void;
    static onClientTick(event: Post): void;
    static register(event: RegisterGuiLayersEvent): void;
    static resetFlash(): void;
  }


  class TooltipOverlayHandler {
    gatherTooltips(event: GatherComponents): void;
    static init(): void;
    static register(event: RegisterClientTooltipComponentFactoriesEvent): void;
  }

}

declare module 'squeek.appleskin.client.HUDOverlayHandler' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Minecraft, DeltaTracker } from 'net.minecraft.client';
  import { Player } from 'net.minecraft.world.entity.player';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { QueriedFoodResult } from 'squeek.appleskin.helpers.FoodHelper';
  import { Layer } from 'LayeredDraw';

  interface HealthOverlay extends Overlay {}
  class HealthOverlay extends Overlay {
    static readonly ID: ResourceLocation;
    render(mc: Minecraft, player: Player, guiGraphics: GuiGraphics, left: number, right: number, top: number, guiTicks: number): void;
    render(guiGraphics: GuiGraphics, deltaTracker: DeltaTracker): void;
    shouldRenderOverlay(mc: Minecraft, player: Player, guiGraphics: GuiGraphics, guiTicks: number): boolean;
  }


  interface HungerOverlay extends Overlay {}
  class HungerOverlay extends Overlay {
    static readonly ID: ResourceLocation;
    render(mc: Minecraft, player: Player, guiGraphics: GuiGraphics, left: number, right: number, top: number, guiTicks: number): void;
    render(guiGraphics: GuiGraphics, deltaTracker: DeltaTracker): void;
    shouldRenderOverlay(mc: Minecraft, player: Player, guiGraphics: GuiGraphics, guiTicks: number): boolean;
  }


  interface SaturationOverlay extends Overlay {}
  class SaturationOverlay extends Overlay {
    static readonly ID: ResourceLocation;
    render(mc: Minecraft, player: Player, guiGraphics: GuiGraphics, left: number, right: number, top: number, guiTicks: number): void;
    render(guiGraphics: GuiGraphics, deltaTracker: DeltaTracker): void;
    shouldRenderOverlay(mc: Minecraft, player: Player, guiGraphics: GuiGraphics, guiTicks: number): boolean;
  }


  interface ExhaustionOverlay extends Overlay {}
  class ExhaustionOverlay extends Overlay {
    static readonly ID: ResourceLocation;
    render(mc: Minecraft, player: Player, guiGraphics: GuiGraphics, left: number, right: number, top: number, guiTicks: number): void;
    render(guiGraphics: GuiGraphics, deltaTracker: DeltaTracker): void;
    shouldRenderOverlay(mc: Minecraft, player: Player, guiGraphics: GuiGraphics, guiTicks: number): boolean;
  }


  class HeldFoodCache {
    lastGuiTick: number;
    result(guiTick: number, player: Player): QueriedFoodResult;
  }


  interface Overlay extends Layer {}
  class Overlay extends Layer {
    render(var1: Minecraft, var2: Player, var3: GuiGraphics, var4: number, var5: number, var6: number, var7: number): void;
    render(guiGraphics: GuiGraphics, deltaTracker: DeltaTracker): void;
    shouldRenderOverlay(mc: Minecraft, player: Player, guiGraphics: GuiGraphics, guiTicks: number): boolean;
  }

}

declare module 'squeek.appleskin.client.TooltipOverlayHandler' {
  import { TooltipComponent } from 'net.minecraft.world.inventory.tooltip';
  import { ClientTooltipComponent } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { Font, GuiGraphics } from 'net.minecraft.client.gui';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface FoodTooltip extends TooltipComponent {}
  class FoodTooltip extends TooltipComponent {
  }


  interface FoodTooltipRenderer extends ClientTooltipComponent {}
  class FoodTooltipRenderer extends ClientTooltipComponent {
    get height(): number;
    getWidth(font: Font): number;
    renderImage(font: Font, x: number, y: number, guiGraphics: GuiGraphics): void;
  }


  interface FoodOutline extends Enum<FoodOutline> {}
  class FoodOutline extends Enum<FoodOutline> {
    static readonly NEGATIVE: FoodOutline;
    static readonly EXTRA: FoodOutline;
    static readonly NORMAL: FoodOutline;
    static readonly PARTIAL: FoodOutline;
    static readonly MISSING: FoodOutline;
    static get(modifiedFoodHunger: number, defaultFoodHunger: number, i: number): FoodOutline;
    setShaderColor(guiGraphics: GuiGraphics): void;
    static valueOf(name: string): FoodOutline;
    static values(): FoodOutline[];
  }

}

declare module 'squeek.appleskin.helpers' {
  import { FoodProperties } from 'net.minecraft.world.food';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { QueriedFoodResult } from 'squeek.appleskin.helpers.FoodHelper';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { FoodType, HeartType } from 'squeek.appleskin.helpers.TextureHelper';

  class FoodHelper {
    static EMPTY_FOOD_PROPERTIES: FoodProperties;
    static REGEN_EXHAUSTION_INCREMENT: number;
    static MAX_EXHAUSTION: number;
    static canConsume(player: Player, foodProperties: FoodProperties): boolean;
    static getDefaultFoodValues(itemStack: ItemStack, player: Player): FoodProperties;
    static getEstimatedHealthIncrement(player: Player, foodProperties: FoodProperties): number;
    static getEstimatedHealthIncrement(foodLevel: number, saturationLevel: number, exhaustionLevel: number): number;
    static isFood(itemStack: ItemStack, player: Player): boolean;
    static isRotten(foodProperties: FoodProperties): boolean;
    static query(itemStack: ItemStack, player: Player): QueriedFoodResult;
  }


  class HungerHelper {
    static getMaxExhaustion(player: Player): number;
  }


  class KeyHelper {
    static isCtrlKeyDown(): boolean;
    static isShiftKeyDown(): boolean;
  }


  class TextureHelper {
    static readonly MOD_ICONS: ResourceLocation;
    static readonly HUNGER_OUTLINE_SPRITE: ResourceLocation;
    static readonly FOOD_EMPTY_HUNGER_TEXTURE: ResourceLocation;
    static readonly FOOD_HALF_HUNGER_TEXTURE: ResourceLocation;
    static readonly FOOD_FULL_HUNGER_TEXTURE: ResourceLocation;
    static readonly FOOD_EMPTY_TEXTURE: ResourceLocation;
    static readonly FOOD_HALF_TEXTURE: ResourceLocation;
    static readonly FOOD_FULL_TEXTURE: ResourceLocation;
    static readonly HEART_CONTAINER: ResourceLocation;
    static readonly HEART_HARDCORE_CONTAINER: ResourceLocation;
    static readonly HEART_FULL: ResourceLocation;
    static readonly HEART_HARDCORE_FULL: ResourceLocation;
    static readonly HEART_HALF: ResourceLocation;
    static readonly HEART_HARDCORE_HALF: ResourceLocation;
    static getFoodTexture(isRotten: boolean, type: FoodType): ResourceLocation;
    static getHeartTexture(hardcore: boolean, type: HeartType): ResourceLocation;
  }

}

declare module 'squeek.appleskin.helpers.FoodHelper' {
  import { FoodProperties } from 'net.minecraft.world.food';
  import { ItemStack } from 'net.minecraft.world.item';

  class QueriedFoodResult {
    defaultFoodProperties: FoodProperties;
    modifiedFoodProperties: FoodProperties;
    readonly itemStack: ItemStack;
    constructor(defaultFoodProperties: FoodProperties, modifiedFoodProperties: FoodProperties, itemStack: ItemStack);
  }

}

declare module 'squeek.appleskin.helpers.TextureHelper' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface FoodType extends Enum<FoodType> {}
  class FoodType extends Enum<FoodType> {
    static readonly EMPTY: FoodType;
    static readonly HALF: FoodType;
    static readonly FULL: FoodType;
    static valueOf(name: string): FoodType;
    static values(): FoodType[];
  }


  interface HeartType extends Enum<HeartType> {}
  class HeartType extends Enum<HeartType> {
    static readonly CONTAINER: HeartType;
    static readonly FULL: HeartType;
    static readonly HALF: HeartType;
    static valueOf(name: string): HeartType;
    static values(): HeartType[];
  }

}

declare module 'squeek.appleskin.network' {
  import { RegisterPayloadHandlersEvent } from 'net.neoforged.neoforge.network.event';
  import { Pre } from 'EntityTickEvent';
  import { PlayerLoggedInEvent } from 'PlayerEvent';

  class SyncHandler {
    onLivingTickEvent(event: Pre): void;
    onPlayerLoggedIn(event: PlayerLoggedInEvent): void;
    static register(event: RegisterPayloadHandlersEvent): void;
  }

}

declare module 'squeek.appleskin.util' {
  class IntPoint {
    x: number;
    y: number;
  }

}