declare module 'dev.architectury.core.block' {
  import { LiquidBlock } from 'net.minecraft.world.level.block';
  import { Supplier } from 'java.util.function';
  import { FlowingFluid } from 'net.minecraft.world.level.material';
  import { Properties } from 'BlockBehaviour';

  interface ArchitecturyLiquidBlock extends LiquidBlock {}
  class ArchitecturyLiquidBlock extends LiquidBlock {
    constructor(fluid: Supplier<FlowingFluid>, properties: Properties);
  }

}

declare module 'dev.architectury.core.fluid' {
  import { BaseFlowingFluid, FluidType, FluidStack as net_neoforged_neoforge_fluids_FluidStack } from 'net.neoforged.neoforge.fluids';
  import { Fluid, FluidState } from 'net.minecraft.world.level.material';
  import { Item, Rarity, ItemStack } from 'net.minecraft.world.item';
  import { LevelReader, BlockAndTintGetter, BlockGetter } from 'net.minecraft.world.level';
  import { Optional } from 'java.util';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { FluidStack } from 'dev.architectury.fluid';
  import { Component } from 'net.minecraft.network.chat';
  import { LiquidBlock } from 'net.minecraft.world.level.block';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { BlockPos } from 'net.minecraft.core';
  import { Properties } from 'FluidType';
  import { Consumer, Supplier } from 'java.util.function';
  import { IClientFluidTypeExtensions } from 'net.neoforged.neoforge.client.extensions.common';
  import { SoundAction } from 'net.neoforged.neoforge.common';
  import { Player } from 'net.minecraft.world.entity.player';
  import { RegistrySupplier } from 'dev.architectury.registry.registries';

  interface ArchitecturyFlowingFluid extends BaseFlowingFluid {}
  class ArchitecturyFlowingFluid extends BaseFlowingFluid {
    get bucket(): Item;
    get flowing(): Fluid;
    get pickupSound(): Optional<SoundEvent>;
    get source(): Fluid;
    getTickDelay(level: LevelReader): number;
    isSame(fluid: Fluid): boolean;
  }


  class ArchitecturyFluidAttributes {
    canConvertToSource(): boolean;
    get block(): LiquidBlock;
    get bucketItem(): Item;
    get color(): number;
    get density(): number;
    get dropOff(): number;
    get emptySound(): SoundEvent;
    get explosionResistance(): number;
    get fillSound(): SoundEvent;
    get flowingFluid(): Fluid;
    get flowingTexture(): ResourceLocation;
    get luminosity(): number;
    get name(): Component;
    get overlayTexture(): ResourceLocation;
    get rarity(): Rarity;
    get slopeFindDistance(): number;
    get sourceFluid(): Fluid;
    get sourceTexture(): ResourceLocation;
    get temperature(): number;
    get tickDelay(): number;
    get translationKey(): string;
    get viscosity(): number;
    getColor(var1: FluidStack, var2: BlockAndTintGetter, var3: BlockPos): number;
    getColor(state: FluidState, level: BlockAndTintGetter, pos: BlockPos): number;
    getColor(stack: FluidStack): number;
    getDensity(var1: FluidStack, var2: BlockAndTintGetter, var3: BlockPos): number;
    getDensity(stack: FluidStack): number;
    getDropOff(var1: LevelReader): number;
    getEmptySound(var1: FluidStack, var2: BlockAndTintGetter, var3: BlockPos): SoundEvent;
    getEmptySound(stack: FluidStack): SoundEvent;
    getFillSound(var1: FluidStack, var2: BlockAndTintGetter, var3: BlockPos): SoundEvent;
    getFillSound(stack: FluidStack): SoundEvent;
    getFlowingTexture(var1: FluidStack, var2: BlockAndTintGetter, var3: BlockPos): ResourceLocation;
    getFlowingTexture(state: FluidState, level: BlockAndTintGetter, pos: BlockPos): ResourceLocation;
    getFlowingTexture(stack: FluidStack): ResourceLocation;
    getLuminosity(var1: FluidStack, var2: BlockAndTintGetter, var3: BlockPos): number;
    getLuminosity(stack: FluidStack): number;
    getName(stack: FluidStack): Component;
    getOverlayTexture(state: FluidState, level: BlockAndTintGetter, pos: BlockPos): ResourceLocation;
    getOverlayTexture(stack: FluidStack): ResourceLocation;
    getRarity(var1: FluidStack, var2: BlockAndTintGetter, var3: BlockPos): Rarity;
    getRarity(stack: FluidStack): Rarity;
    getSlopeFindDistance(var1: LevelReader): number;
    getSourceTexture(var1: FluidStack, var2: BlockAndTintGetter, var3: BlockPos): ResourceLocation;
    getSourceTexture(state: FluidState, level: BlockAndTintGetter, pos: BlockPos): ResourceLocation;
    getSourceTexture(stack: FluidStack): ResourceLocation;
    getTemperature(var1: FluidStack, var2: BlockAndTintGetter, var3: BlockPos): number;
    getTemperature(stack: FluidStack): number;
    getTickDelay(var1: LevelReader): number;
    getTranslationKey(var1: FluidStack): string;
    getViscosity(var1: FluidStack, var2: BlockAndTintGetter, var3: BlockPos): number;
    getViscosity(stack: FluidStack): number;
    isLighterThanAir(var1: FluidStack, var2: BlockAndTintGetter, var3: BlockPos): boolean;
    isLighterThanAir(stack: FluidStack): boolean;
    isLighterThanAir(): boolean;
  }


  interface ArchitecturyFluidAttributesForge extends FluidType {}
  class ArchitecturyFluidAttributesForge extends FluidType {
    constructor(builder: Properties, fluid: Fluid, attributes: ArchitecturyFluidAttributes);
    canConvertToSource(stack: net_neoforged_neoforge_fluids_FluidStack): boolean;
    canConvertToSource(state: FluidState, reader: LevelReader, pos: BlockPos): boolean;
    convertSafe(stack: net_neoforged_neoforge_fluids_FluidStack): FluidStack;
    convertSafe(state: FluidState): FluidStack;
    get description(): Component;
    get descriptionId(): string;
    get flowingTexture(): ResourceLocation;
    get overlayTexture(): ResourceLocation;
    get rarity(): Rarity;
    get stillTexture(): ResourceLocation;
    get tintColor(): number;
    getBucket(stack: net_neoforged_neoforge_fluids_FluidStack): ItemStack;
    getDensity(stack: net_neoforged_neoforge_fluids_FluidStack): number;
    getDensity(state: FluidState, level: BlockAndTintGetter, pos: BlockPos): number;
    getDescription(stack: net_neoforged_neoforge_fluids_FluidStack): Component;
    getDescriptionId(stack: net_neoforged_neoforge_fluids_FluidStack): string;
    getFlowingTexture(state: FluidState, getter: BlockAndTintGetter, pos: BlockPos): ResourceLocation;
    getFlowingTexture(stack: net_neoforged_neoforge_fluids_FluidStack): ResourceLocation;
    getLightLevel(stack: net_neoforged_neoforge_fluids_FluidStack): number;
    getLightLevel(state: FluidState, level: BlockAndTintGetter, pos: BlockPos): number;
    getOverlayTexture(state: FluidState, getter: BlockAndTintGetter, pos: BlockPos): ResourceLocation;
    getOverlayTexture(stack: net_neoforged_neoforge_fluids_FluidStack): ResourceLocation;
    getRarity(stack: net_neoforged_neoforge_fluids_FluidStack): Rarity;
    getSound(action: SoundAction): SoundEvent;
    getSound(stack: net_neoforged_neoforge_fluids_FluidStack, action: SoundAction): SoundEvent;
    getSound(player: Player, getter: BlockGetter, pos: BlockPos, action: SoundAction): SoundEvent;
    getStillTexture(state: FluidState, getter: BlockAndTintGetter, pos: BlockPos): ResourceLocation;
    getStillTexture(stack: net_neoforged_neoforge_fluids_FluidStack): ResourceLocation;
    getTemperature(stack: net_neoforged_neoforge_fluids_FluidStack): number;
    getTemperature(state: FluidState, level: BlockAndTintGetter, pos: BlockPos): number;
    getTintColor(state: FluidState, getter: BlockAndTintGetter, pos: BlockPos): number;
    getTintColor(stack: net_neoforged_neoforge_fluids_FluidStack): number;
    getViscosity(stack: net_neoforged_neoforge_fluids_FluidStack): number;
    getViscosity(state: FluidState, level: BlockAndTintGetter, pos: BlockPos): number;
    initializeClient(consumer: Consumer<IClientFluidTypeExtensions>): void;
  }


  interface SimpleArchitecturyFluidAttributes extends ArchitecturyFluidAttributes {}
  class SimpleArchitecturyFluidAttributes extends ArchitecturyFluidAttributes {
    block(block: RegistrySupplier<LiquidBlock>): SimpleArchitecturyFluidAttributes;
    block(block: Supplier<Optional<LiquidBlock>>): SimpleArchitecturyFluidAttributes;
    blockSupplier(block: Supplier<RegistrySupplier<LiquidBlock>>): SimpleArchitecturyFluidAttributes;
    bucketItem(bucketItem: RegistrySupplier<Item>): SimpleArchitecturyFluidAttributes;
    bucketItem(bucketItem: Supplier<Optional<Item>>): SimpleArchitecturyFluidAttributes;
    bucketItemSupplier(bucketItem: Supplier<RegistrySupplier<Item>>): SimpleArchitecturyFluidAttributes;
    canConvertToSource(): boolean;
    color(color: number): SimpleArchitecturyFluidAttributes;
    convertToSource(canConvertToSource: boolean): SimpleArchitecturyFluidAttributes;
    density(density: number): SimpleArchitecturyFluidAttributes;
    dropOff(dropOff: number): SimpleArchitecturyFluidAttributes;
    emptySound(emptySound: SoundEvent): SimpleArchitecturyFluidAttributes;
    explosionResistance(explosionResistance: number): SimpleArchitecturyFluidAttributes;
    fillSound(fillSound: SoundEvent): SimpleArchitecturyFluidAttributes;
    flowingTexture(flowingTexture: ResourceLocation): SimpleArchitecturyFluidAttributes;
    get flowingFluid(): Fluid;
    get sourceFluid(): Fluid;
    get translationKey(): string;
    getBlock(): LiquidBlock;
    getBucketItem(): Item;
    getColor(stack: FluidStack, level: BlockAndTintGetter, pos: BlockPos): number;
    getColor(state: FluidState, level: BlockAndTintGetter, pos: BlockPos): number;
    getColor(stack: FluidStack): number;
    getDensity(stack: FluidStack, level: BlockAndTintGetter, pos: BlockPos): number;
    getDensity(stack: FluidStack): number;
    getDropOff(level: LevelReader): number;
    getEmptySound(stack: FluidStack, level: BlockAndTintGetter, pos: BlockPos): SoundEvent;
    getEmptySound(stack: FluidStack): SoundEvent;
    getExplosionResistance(): number;
    getFillSound(stack: FluidStack, level: BlockAndTintGetter, pos: BlockPos): SoundEvent;
    getFillSound(stack: FluidStack): SoundEvent;
    getFlowingTexture(stack: FluidStack, level: BlockAndTintGetter, pos: BlockPos): ResourceLocation;
    getFlowingTexture(state: FluidState, level: BlockAndTintGetter, pos: BlockPos): ResourceLocation;
    getFlowingTexture(stack: FluidStack): ResourceLocation;
    getLuminosity(stack: FluidStack, level: BlockAndTintGetter, pos: BlockPos): number;
    getLuminosity(stack: FluidStack): number;
    getOverlayTexture(state: FluidState, level: BlockAndTintGetter, pos: BlockPos): ResourceLocation;
    getOverlayTexture(stack: FluidStack): ResourceLocation;
    getRarity(stack: FluidStack, level: BlockAndTintGetter, pos: BlockPos): Rarity;
    getRarity(stack: FluidStack): Rarity;
    getSlopeFindDistance(level: LevelReader): number;
    getSourceTexture(stack: FluidStack, level: BlockAndTintGetter, pos: BlockPos): ResourceLocation;
    getSourceTexture(state: FluidState, level: BlockAndTintGetter, pos: BlockPos): ResourceLocation;
    getSourceTexture(stack: FluidStack): ResourceLocation;
    getTemperature(stack: FluidStack, level: BlockAndTintGetter, pos: BlockPos): number;
    getTemperature(stack: FluidStack): number;
    getTickDelay(level: LevelReader): number;
    getTranslationKey(stack: FluidStack): string;
    getViscosity(stack: FluidStack, level: BlockAndTintGetter, pos: BlockPos): number;
    getViscosity(stack: FluidStack): number;
    isLighterThanAir(stack: FluidStack, level: BlockAndTintGetter, pos: BlockPos): boolean;
    isLighterThanAir(stack: FluidStack): boolean;
    isLighterThanAir(): boolean;
    lighterThanAir(lighterThanAir: boolean): SimpleArchitecturyFluidAttributes;
    luminosity(luminosity: number): SimpleArchitecturyFluidAttributes;
    static of(flowingFluid: Supplier<Fluid>, sourceFluid: Supplier<Fluid>): SimpleArchitecturyFluidAttributes;
    static ofSupplier(flowingFluid: Supplier<Supplier<Fluid>>, sourceFluid: Supplier<Supplier<Fluid>>): SimpleArchitecturyFluidAttributes;
    overlayTexture(overlayTexture: ResourceLocation): SimpleArchitecturyFluidAttributes;
    rarity(rarity: Rarity): SimpleArchitecturyFluidAttributes;
    slopeFindDistance(slopeFindDistance: number): SimpleArchitecturyFluidAttributes;
    sourceTexture(sourceTexture: ResourceLocation): SimpleArchitecturyFluidAttributes;
    temperature(temperature: number): SimpleArchitecturyFluidAttributes;
    tickDelay(tickDelay: number): SimpleArchitecturyFluidAttributes;
    viscosity(viscosity: number): SimpleArchitecturyFluidAttributes;
  }

}

declare module 'dev.architectury.core.fluid.ArchitecturyFlowingFluid' {
  import { ArchitecturyFlowingFluid, ArchitecturyFluidAttributes } from 'dev.architectury.core.fluid';
  import { FluidState } from 'net.minecraft.world.level.material';

  interface Flowing extends ArchitecturyFlowingFluid {}
  class Flowing extends ArchitecturyFlowingFluid {
    constructor(attributes: ArchitecturyFluidAttributes);
    getAmount(state: FluidState): number;
    isSource(state: FluidState): boolean;
  }


  interface Source extends ArchitecturyFlowingFluid {}
  class Source extends ArchitecturyFlowingFluid {
    constructor(attributes: ArchitecturyFluidAttributes);
    getAmount(state: FluidState): number;
    isSource(state: FluidState): boolean;
  }

}

declare module 'dev.architectury.core.item' {
  import { BucketItem, MobBucketItem, SpawnEggItem, ItemStack } from 'net.minecraft.world.item';
  import { Supplier } from 'java.util.function';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { Properties } from 'Item';
  import { EntityType, Mob } from 'net.minecraft.world.entity';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { RegistrySupplier } from 'dev.architectury.registry.registries';
  import { DispenseItemBehavior, BlockSource } from 'net.minecraft.core.dispenser';

  interface ArchitecturyBucketItem extends BucketItem {}
  class ArchitecturyBucketItem extends BucketItem {
    constructor(fluid: Supplier<Fluid>, properties: Properties);
    get containedFluid(): Fluid;
  }


  interface ArchitecturyMobBucketItem extends MobBucketItem {}
  class ArchitecturyMobBucketItem extends MobBucketItem {
    constructor(entity: Supplier<EntityType<any>>, fluid: Supplier<Fluid>, sound: Supplier<SoundEvent>, properties: Properties);
  }


  interface ArchitecturySpawnEggItem extends SpawnEggItem {}
  class ArchitecturySpawnEggItem extends SpawnEggItem {
    constructor(entityType: RegistrySupplier<EntityType<Mob>>, backgroundColor: number, highlightColor: number, properties: Properties);

    constructor(entityType: RegistrySupplier<EntityType<Mob>>, backgroundColor: number, highlightColor: number, properties: Properties, dispenseItemBehavior: DispenseItemBehavior);
    execute(source: BlockSource, stack: ItemStack): ItemStack;
    getType(itemStack: ItemStack): EntityType<any>;
  }

}

declare module 'dev.architectury.event' {
  import { Boolean, Class } from 'java.lang';
  import { InteractionResultHolder, InteractionResult } from 'net.minecraft.world';
  import { Function, Consumer } from 'java.util.function';
  import { List } from 'java.util';
  import { Method } from 'java.lang.reflect';

  class CompoundEventResult<T = any> {
    asMinecraft(): InteractionResultHolder<T>;
    static interrupt<T>(value: boolean, object: T): CompoundEventResult<T>;
    static interruptDefault<T>(object: T): CompoundEventResult<T>;
    static interruptFalse<T>(object: T): CompoundEventResult<T>;
    static interruptTrue<T>(object: T): CompoundEventResult<T>;
    interruptsFurtherEvaluation(): boolean;
    isEmpty(): boolean;
    isFalse(): boolean;
    isPresent(): boolean;
    isTrue(): boolean;
    object(): T;
    static pass<T>(): CompoundEventResult<T>;
    result(): EventResult;
    value(): boolean;
  }


  class Event<T = any> {
    clearListeners(): void;
    invoker(): T;
    isRegistered(var1: T): boolean;
    register(var1: T): void;
    unregister(var1: T): void;
  }


  class EventActor<T = any> {
    act(var1: T): EventResult;
  }


  class EventFactory {
    static attachToForge<T>(event: Event<Consumer<T>>): Event<Consumer<T>>;
    static attachToForgeEventActor<T>(event: Event<EventActor<T>>): Event<EventActor<T>>;
    static attachToForgeEventActorCancellable<T>(event: Event<EventActor<T>>): Event<EventActor<T>>;
    static createCompoundEventResult<T>(...typeGetter: T[]): Event<T>;
    static createCompoundEventResult<T>(clazz: Class<T>, proxy: any, method: Method, args: any[]): Event<T>;
    static createConsumerLoop<T>(...typeGetter: T[]): Event<Consumer<T>>;
    static createConsumerLoop<T>(clazz: Class<T>, proxy: any, method: Method, args: any[]): Event<Consumer<T>>;
    static createEventActorLoop<T>(...typeGetter: T[]): Event<EventActor<T>>;
    static createEventActorLoop<T>(clazz: Class<T>, proxy: any, method: Method, args: any[]): Event<EventActor<T>>;
    static createEventResult<T>(...typeGetter: T[]): Event<T>;
    static createEventResult<T>(clazz: Class<T>, proxy: any, method: Method, args: any[]): Event<T>;
    static createLoop<T>(...typeGetter: T[]): Event<T>;
    static createLoop<T>(clazz: Class<T>, proxy: any, method: Method, args: any[]): Event<T>;
    static of<T>(functionParameter: Function<T[], T>): Event<T>;
  }


  class EventHandler {
    static init(): void;
  }


  class EventResult {
    asMinecraft(): InteractionResult;
    static interrupt(value: boolean): EventResult;
    static interruptDefault(): EventResult;
    static interruptFalse(): EventResult;
    static interruptTrue(): EventResult;
    interruptsFurtherEvaluation(): boolean;
    isEmpty(): boolean;
    isFalse(): boolean;
    isPresent(): boolean;
    isTrue(): boolean;
    static pass(): EventResult;
    value(): boolean;
  }

}

declare module 'dev.architectury.event.events.client' {
  import { Event } from 'dev.architectury.event';
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { ClientCommandSourceStack } from 'dev.architectury.event.events.client.ClientCommandRegistrationEvent';
  import { CommandBuildContext } from 'net.minecraft.commands';
  import { LiteralArgumentBuilder, RequiredArgumentBuilder } from 'com.mojang.brigadier.builder';
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { RecipeManager } from 'net.minecraft.world.item.crafting';
  import { ResourceProvider } from 'net.minecraft.server.packs.resources';
  import { ShadersSink } from 'dev.architectury.event.events.client.ClientReloadShadersEvent';
  import { AdditionalContexts } from 'dev.architectury.event.events.client.ClientTooltipEvent';

  class ClientChatEvent {
    static readonly SEND: Event;
    static readonly RECEIVED: Event;
  }


  class ClientCommandRegistrationEvent {
    static readonly EVENT: Event;
    static argument<T>(name: string, type: ArgumentType<T>): RequiredArgumentBuilder<ClientCommandSourceStack, T>;
    static literal(name: string): LiteralArgumentBuilder<ClientCommandSourceStack>;
    register(var1: CommandDispatcher<ClientCommandSourceStack>, var2: CommandBuildContext): void;
  }


  class ClientGuiEvent {
    static readonly RENDER_HUD: Event;
    static readonly DEBUG_TEXT_LEFT: Event;
    static readonly DEBUG_TEXT_RIGHT: Event;
    static readonly INIT_PRE: Event;
    static readonly INIT_POST: Event;
    static readonly RENDER_PRE: Event;
    static readonly RENDER_POST: Event;
    static readonly RENDER_CONTAINER_BACKGROUND: Event;
    static readonly RENDER_CONTAINER_FOREGROUND: Event;
    static readonly SET_SCREEN: Event;
  }


  class ClientLifecycleEvent {
    static readonly CLIENT_STARTED: Event;
    static readonly CLIENT_STOPPING: Event;
    static readonly CLIENT_LEVEL_LOAD: Event;
    static readonly CLIENT_SETUP: Event;
  }


  class ClientPlayerEvent {
    static readonly CLIENT_PLAYER_JOIN: Event;
    static readonly CLIENT_PLAYER_QUIT: Event;
    static readonly CLIENT_PLAYER_RESPAWN: Event;
  }


  class ClientRawInputEvent {
    static readonly MOUSE_SCROLLED: Event;
    static readonly MOUSE_CLICKED_PRE: Event;
    static readonly MOUSE_CLICKED_POST: Event;
    static readonly KEY_PRESSED: Event;
  }


  class ClientRecipeUpdateEvent {
    static readonly EVENT: Event;
    update(var1: RecipeManager): void;
  }


  class ClientReloadShadersEvent {
    static readonly EVENT: Event;
    reload(var1: ResourceProvider, var2: ShadersSink): void;
  }


  class ClientScreenInputEvent {
    static readonly MOUSE_SCROLLED_PRE: Event;
    static readonly MOUSE_SCROLLED_POST: Event;
    static readonly MOUSE_CLICKED_PRE: Event;
    static readonly MOUSE_CLICKED_POST: Event;
    static readonly MOUSE_RELEASED_PRE: Event;
    static readonly MOUSE_RELEASED_POST: Event;
    static readonly MOUSE_DRAGGED_PRE: Event;
    static readonly MOUSE_DRAGGED_POST: Event;
    static readonly CHAR_TYPED_PRE: Event;
    static readonly CHAR_TYPED_POST: Event;
    static readonly KEY_PRESSED_PRE: Event;
    static readonly KEY_PRESSED_POST: Event;
    static readonly KEY_RELEASED_PRE: Event;
    static readonly KEY_RELEASED_POST: Event;
  }


  class ClientSystemMessageEvent {
    static readonly RECEIVED: Event;
  }


  class ClientTickEvent<T = any> {
    static readonly CLIENT_PRE: Event;
    static readonly CLIENT_POST: Event;
    static readonly CLIENT_LEVEL_PRE: Event;
    static readonly CLIENT_LEVEL_POST: Event;
    tick(var1: T): void;
  }


  class ClientTooltipEvent {
    static readonly ITEM: Event;
    static readonly RENDER_PRE: Event;
    static readonly RENDER_MODIFY_POSITION: Event;
    static readonly RENDER_MODIFY_COLOR: Event;
    static additionalContexts(): AdditionalContexts;
  }

}

declare module 'dev.architectury.event.events.client.ClientChatEvent' {
  import { EventResult, CompoundEventResult } from 'dev.architectury.event';
  import { Component } from 'net.minecraft.network.chat';
  import { Bound } from 'ChatType';

  class Send {
    send(var1: string, var2: Component): EventResult;
  }


  class Received {
    process(var1: Bound, var2: Component): CompoundEventResult<Component>;
  }

}

declare module 'dev.architectury.event.events.client.ClientCommandRegistrationEvent' {
  import { SharedSuggestionProvider } from 'net.minecraft.commands';
  import { Supplier } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';
  import { LocalPlayer } from 'net.minecraft.client.player';
  import { Vec3, Vec2 } from 'net.minecraft.world.phys';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';

  interface ClientCommandSourceStack extends SharedSuggestionProvider {}
  class ClientCommandSourceStack extends SharedSuggestionProvider {
    arch$getLevel(): ClientLevel;
    arch$getPlayer(): LocalPlayer;
    arch$getPosition(): Vec3;
    arch$getRotation(): Vec2;
    arch$sendFailure(var1: Component): void;
    arch$sendSuccess(var1: Supplier<Component>, var2: boolean): void;
  }

}

declare module 'dev.architectury.event.events.client.ClientGuiEvent' {
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { DeltaTracker } from 'net.minecraft.client';
  import { List } from 'java.util';
  import { EventResult, CompoundEventResult } from 'dev.architectury.event';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ScreenAccess } from 'dev.architectury.hooks.client.screen';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';

  class RenderHud {
    renderHud(var1: GuiGraphics, var2: DeltaTracker): void;
  }


  class DebugText {
    gatherText(var1: string[]): void;
  }


  class ScreenInitPre {
    init(var1: Screen, var2: ScreenAccess): EventResult;
  }


  class ScreenInitPost {
    init(var1: Screen, var2: ScreenAccess): void;
  }


  class ScreenRenderPre {
    render(var1: Screen, var2: GuiGraphics, var3: number, var4: number, var5: DeltaTracker): EventResult;
  }


  class ScreenRenderPost {
    render(var1: Screen, var2: GuiGraphics, var3: number, var4: number, var5: DeltaTracker): void;
  }


  class ContainerScreenRenderBackground {
    render(var1: AbstractContainerScreen<any>, var2: GuiGraphics, var3: number, var4: number, var5: number): void;
  }


  class ContainerScreenRenderForeground {
    render(var1: AbstractContainerScreen<any>, var2: GuiGraphics, var3: number, var4: number, var5: number): void;
  }


  class SetScreen {
    modifyScreen(var1: Screen): CompoundEventResult<Screen>;
  }

}

declare module 'dev.architectury.event.events.client.ClientLifecycleEvent' {
  import { InstanceState, LevelState } from 'dev.architectury.event.events.common.LifecycleEvent';
  import { Minecraft } from 'net.minecraft.client';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';

  interface ClientState extends InstanceState<Minecraft> {}
  class ClientState extends InstanceState<Minecraft> {
  }


  interface ClientLevelState extends LevelState<ClientLevel> {}
  class ClientLevelState extends LevelState<ClientLevel> {
  }

}

declare module 'dev.architectury.event.events.client.ClientPlayerEvent' {
  import { LocalPlayer } from 'net.minecraft.client.player';

  class ClientPlayerJoin {
    join(var1: LocalPlayer): void;
  }


  class ClientPlayerQuit {
    quit(var1: LocalPlayer): void;
  }


  class ClientPlayerRespawn {
    respawn(var1: LocalPlayer, var2: LocalPlayer): void;
  }

}

declare module 'dev.architectury.event.events.client.ClientRawInputEvent' {
  import { EventResult } from 'dev.architectury.event';
  import { Minecraft } from 'net.minecraft.client';

  class MouseScrolled {
    mouseScrolled(var1: Minecraft, var2: number, var4: number): EventResult;
  }


  class MouseClicked {
    mouseClicked(var1: Minecraft, var2: number, var3: number, var4: number): EventResult;
  }


  class KeyPressed {
    keyPressed(var1: Minecraft, var2: number, var3: number, var4: number, var5: number): EventResult;
  }

}

declare module 'dev.architectury.event.events.client.ClientReloadShadersEvent' {
  import { ShaderInstance } from 'net.minecraft.client.renderer';
  import { Consumer } from 'java.util.function';

  class ShadersSink {
    registerShader(var1: ShaderInstance, var2: Consumer<ShaderInstance>): void;
  }

}

declare module 'dev.architectury.event.events.client.ClientScreenInputEvent' {
  import { EventResult } from 'dev.architectury.event';
  import { Minecraft } from 'net.minecraft.client';
  import { Screen } from 'net.minecraft.client.gui.screens';

  class MouseScrolled {
    mouseScrolled(var1: Minecraft, var2: Screen, var3: number, var5: number, var7: number, var9: number): EventResult;
  }


  class MouseClicked {
    mouseClicked(var1: Minecraft, var2: Screen, var3: number, var5: number, var7: number): EventResult;
  }


  class MouseReleased {
    mouseReleased(var1: Minecraft, var2: Screen, var3: number, var5: number, var7: number): EventResult;
  }


  class MouseDragged {
    mouseDragged(var1: Minecraft, var2: Screen, var3: number, var5: number, var7: number, var8: number, var10: number): EventResult;
  }


  class KeyTyped {
    charTyped(var1: Minecraft, var2: Screen, var3: string, var4: number): EventResult;
  }


  class KeyPressed {
    keyPressed(var1: Minecraft, var2: Screen, var3: number, var4: number, var5: number): EventResult;
  }


  class KeyReleased {
    keyReleased(var1: Minecraft, var2: Screen, var3: number, var4: number, var5: number): EventResult;
  }

}

declare module 'dev.architectury.event.events.client.ClientSystemMessageEvent' {
  import { CompoundEventResult } from 'dev.architectury.event';
  import { Component } from 'net.minecraft.network.chat';

  class Received {
    process(var1: Component): CompoundEventResult<Component>;
  }

}

declare module 'dev.architectury.event.events.client.ClientTickEvent' {
  import { ClientTickEvent } from 'dev.architectury.event.events.client';
  import { Minecraft } from 'net.minecraft.client';

  interface Client extends ClientTickEvent<Minecraft> {}
  class Client extends ClientTickEvent<Minecraft> {
  }


  interface ClientLevel extends ClientTickEvent<ClientLevel> {}
  class ClientLevel extends ClientTickEvent<ClientLevel> {
  }

}

declare module 'dev.architectury.event.events.client.ClientTooltipEvent' {
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { TooltipContext } from 'Item';
  import { EventResult } from 'dev.architectury.event';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ClientTooltipComponent } from 'net.minecraft.client.gui.screens.inventory.tooltip';

  class AdditionalContexts {
    get item(): ItemStack;
    set item(var1: ItemStack);
  }


  class Item {
    append(var1: ItemStack, var2: Component[], var3: TooltipContext, var4: TooltipFlag): void;
  }


  class Render {
    renderTooltip(var1: GuiGraphics, var2: ClientTooltipComponent[], var3: number, var4: number): EventResult;
  }


  class RenderModifyPosition {
    renderTooltip(var1: GuiGraphics, var2: PositionContext): void;
  }


  class RenderModifyColor {
    renderTooltip(var1: GuiGraphics, var2: number, var3: number, var4: ColorContext): void;
  }


  class ColorContext {
    get backgroundColor(): number;
    get outlineGradientBottomColor(): number;
    get outlineGradientTopColor(): number;
    set backgroundColor(var1: number);
    set outlineGradientBottomColor(var1: number);
    set outlineGradientTopColor(var1: number);
  }


  class PositionContext {
    get tooltipX(): number;
    get tooltipY(): number;
    set tooltipX(var1: number);
    set tooltipY(var1: number);
  }

}

declare module 'dev.architectury.event.events.common' {
  import { Event } from 'dev.architectury.event';
  import { ParseResults, CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack, CommandBuildContext } from 'net.minecraft.commands';
  import { Throwable } from 'java.lang';
  import { CommandSelection } from 'Commands';

  class BlockEvent {
    static readonly BREAK: Event;
    static readonly PLACE: Event;
    static readonly FALLING_LAND: Event;
  }


  class ChatEvent {
    static readonly DECORATE: Event;
    static readonly RECEIVED: Event;
  }


  class ChunkEvent {
    static readonly SAVE_DATA: Event;
    static readonly LOAD_DATA: Event;
  }


  class CommandPerformEvent {
    static readonly EVENT: Event;
    constructor(results: ParseResults<CommandSourceStack>, throwable: Throwable);
    get results(): ParseResults<CommandSourceStack>;
    get throwable(): Throwable;
    set results(results: ParseResults<CommandSourceStack>);
    set throwable(throwable: Throwable);
  }


  class CommandRegistrationEvent {
    static readonly EVENT: Event;
    register(var1: CommandDispatcher<CommandSourceStack>, var2: CommandBuildContext, var3: CommandSelection): void;
  }


  class EntityEvent {
    static readonly LIVING_DEATH: Event;
    static readonly LIVING_HURT: Event;
    static readonly LIVING_CHECK_SPAWN: Event;
    static readonly ADD: Event;
    static readonly ENTER_SECTION: Event;
    static readonly ANIMAL_TAME: Event;
  }


  class ExplosionEvent {
    static readonly PRE: Event;
    static readonly DETONATE: Event;
  }


  class InteractionEvent {
    static readonly LEFT_CLICK_BLOCK: Event;
    static readonly RIGHT_CLICK_BLOCK: Event;
    static readonly RIGHT_CLICK_ITEM: Event;
    static readonly CLIENT_LEFT_CLICK_AIR: Event;
    static readonly CLIENT_RIGHT_CLICK_AIR: Event;
    static readonly INTERACT_ENTITY: Event;
    static readonly FARMLAND_TRAMPLE: Event;
  }


  class LifecycleEvent {
    static readonly SERVER_BEFORE_START: Event;
    static readonly SERVER_STARTING: Event;
    static readonly SERVER_STARTED: Event;
    static readonly SERVER_STOPPING: Event;
    static readonly SERVER_STOPPED: Event;
    static readonly SERVER_LEVEL_LOAD: Event;
    static readonly SERVER_LEVEL_UNLOAD: Event;
    static readonly SERVER_LEVEL_SAVE: Event;
    static readonly SETUP: Event;
  }


  class LightningEvent {
    static readonly STRIKE: Event;
  }


  class LootEvent {
    static readonly MODIFY_LOOT_TABLE: Event;
  }


  class PlayerEvent {
    static readonly PLAYER_JOIN: Event;
    static readonly PLAYER_QUIT: Event;
    static readonly PLAYER_RESPAWN: Event;
    static readonly PLAYER_ADVANCEMENT: Event;
    static readonly PLAYER_CLONE: Event;
    static readonly CRAFT_ITEM: Event;
    static readonly SMELT_ITEM: Event;
    static readonly PICKUP_ITEM_PRE: Event;
    static readonly PICKUP_ITEM_POST: Event;
    static readonly CHANGE_DIMENSION: Event;
    static readonly DROP_ITEM: Event;
    static readonly OPEN_MENU: Event;
    static readonly CLOSE_MENU: Event;
    static readonly FILL_BUCKET: Event;
    static readonly ATTACK_ENTITY: Event;
  }


  class TickEvent<T = any> {
    static readonly SERVER_PRE: Event;
    static readonly SERVER_POST: Event;
    static readonly SERVER_LEVEL_PRE: Event;
    static readonly SERVER_LEVEL_POST: Event;
    static readonly PLAYER_PRE: Event;
    static readonly PLAYER_POST: Event;
    tick(var1: T): void;
  }

}

declare module 'dev.architectury.event.events.common.BlockEvent' {
  import { EventResult } from 'dev.architectury.event';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { IntValue } from 'dev.architectury.utils.value';
  import { Entity } from 'net.minecraft.world.entity';
  import { FallingBlockEntity } from 'net.minecraft.world.entity.item';

  class Break {
    breakBlock(var1: Level, var2: BlockPos, var3: BlockState, var4: ServerPlayer, var5: IntValue): EventResult;
  }


  class Place {
    placeBlock(var1: Level, var2: BlockPos, var3: BlockState, var4: Entity): EventResult;
  }


  class FallingLand {
    onLand(var1: Level, var2: BlockPos, var3: BlockState, var4: BlockState, var5: FallingBlockEntity): void;
  }

}

declare module 'dev.architectury.event.events.common.ChatEvent' {
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { EventResult } from 'dev.architectury.event';
  import { Component } from 'net.minecraft.network.chat';

  class Decorate {
    decorate(var1: ServerPlayer, var2: ChatComponent): void;
  }


  class Received {
    received(var1: ServerPlayer, var2: Component): EventResult;
  }


  class ChatComponent {
    get (): Component;
    set (var1: Component);
  }

}

declare module 'dev.architectury.event.events.common.ChunkEvent' {
  import { ChunkAccess } from 'net.minecraft.world.level.chunk';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { CompoundTag } from 'net.minecraft.nbt';

  class SaveData {
    save(var1: ChunkAccess, var2: ServerLevel, var3: CompoundTag): void;
  }


  class LoadData {
    load(var1: ChunkAccess, var2: ServerLevel, var3: CompoundTag): void;
  }

}

declare module 'dev.architectury.event.events.common.EntityEvent' {
  import { EventResult } from 'dev.architectury.event';
  import { LivingEntity, MobSpawnType, Entity } from 'net.minecraft.world.entity';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { LevelAccessor, BaseSpawner, Level } from 'net.minecraft.world.level';
  import { Animal } from 'net.minecraft.world.entity.animal';
  import { Player } from 'net.minecraft.world.entity.player';

  class LivingDeath {
    die(var1: LivingEntity, var2: DamageSource): EventResult;
  }


  class LivingHurt {
    hurt(var1: LivingEntity, var2: DamageSource, var3: number): EventResult;
  }


  class LivingCheckSpawn {
    canSpawn(var1: LivingEntity, var2: LevelAccessor, var3: number, var5: number, var7: number, var9: MobSpawnType, var10: BaseSpawner): EventResult;
  }


  class Add {
    add(var1: Entity, var2: Level): EventResult;
  }


  class EnterSection {
    enterSection(var1: Entity, var2: number, var3: number, var4: number, var5: number, var6: number, var7: number): void;
  }


  class AnimalTame {
    tame(var1: Animal, var2: Player): EventResult;
  }

}

declare module 'dev.architectury.event.events.common.ExplosionEvent' {
  import { EventResult } from 'dev.architectury.event';
  import { Level, Explosion } from 'net.minecraft.world.level';
  import { List } from 'java.util';
  import { Entity } from 'net.minecraft.world.entity';

  class Pre {
    explode(var1: Level, var2: Explosion): EventResult;
  }


  class Detonate {
    explode(var1: Level, var2: Explosion, var3: Entity[]): void;
  }

}

declare module 'dev.architectury.event.events.common.InteractionEvent' {
  import { EventResult, CompoundEventResult } from 'dev.architectury.event';
  import { Player } from 'net.minecraft.world.entity.player';
  import { InteractionHand } from 'net.minecraft.world';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Entity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  class LeftClickBlock {
    click(var1: Player, var2: InteractionHand, var3: BlockPos, var4: Direction): EventResult;
  }


  class RightClickBlock {
    click(var1: Player, var2: InteractionHand, var3: BlockPos, var4: Direction): EventResult;
  }


  class RightClickItem {
    click(var1: Player, var2: InteractionHand): CompoundEventResult<ItemStack>;
  }


  class ClientLeftClickAir {
    click(var1: Player, var2: InteractionHand): void;
  }


  class ClientRightClickAir {
    click(var1: Player, var2: InteractionHand): void;
  }


  class InteractEntity {
    interact(var1: Player, var2: Entity, var3: InteractionHand): EventResult;
  }


  class FarmlandTrample {
    trample(var1: Level, var2: BlockPos, var3: BlockState, var4: number, var5: Entity): EventResult;
  }

}

declare module 'dev.architectury.event.events.common.LifecycleEvent' {
  import { MinecraftServer } from 'net.minecraft.server';
  import { ServerLevel } from 'net.minecraft.server.level';

  interface ServerState extends InstanceState<MinecraftServer> {}
  class ServerState extends InstanceState<MinecraftServer> {
  }


  interface ServerLevelState extends LevelState<ServerLevel> {}
  class ServerLevelState extends LevelState<ServerLevel> {
  }


  class LevelState<T extends Level = any> {
    act(var1: T): void;
  }


  class InstanceState<T = any> {
    stateChanged(var1: T): void;
  }

}

declare module 'dev.architectury.event.events.common.LightningEvent' {
  import { LightningBolt, Entity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { List } from 'java.util';

  class Strike {
    onStrike(var1: LightningBolt, var2: Level, var3: Vec3, var4: Entity[]): void;
  }

}

declare module 'dev.architectury.event.events.common.LootEvent' {
  import { ResourceKey } from 'net.minecraft.resources';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';
  import { Builder } from 'LootPool';

  class ModifyLootTable {
    modifyLootTable(var1: ResourceKey<LootTable>, var2: LootTableModificationContext, var3: boolean): void;
  }


  class LootTableModificationContext {
    addPool(var1: Builder): void;
  }

}

declare module 'dev.architectury.event.events.common.PlayerEvent' {
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { RemovalReason } from 'Entity';
  import { AdvancementHolder } from 'net.minecraft.advancements';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Container, InteractionHand } from 'net.minecraft.world';
  import { EventResult, CompoundEventResult } from 'dev.architectury.event';
  import { ItemEntity } from 'net.minecraft.world.entity.item';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Level } from 'net.minecraft.world.level';
  import { AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { HitResult, EntityHitResult } from 'net.minecraft.world.phys';
  import { Entity } from 'net.minecraft.world.entity';

  class PlayerJoin {
    join(var1: ServerPlayer): void;
  }


  class PlayerQuit {
    quit(var1: ServerPlayer): void;
  }


  class PlayerRespawn {
    respawn(var1: ServerPlayer, var2: boolean, var3: RemovalReason): void;
  }


  class PlayerAdvancement {
    award(var1: ServerPlayer, var2: AdvancementHolder): void;
  }


  class PlayerClone {
    clone(var1: ServerPlayer, var2: ServerPlayer, var3: boolean): void;
  }


  class CraftItem {
    craft(var1: Player, var2: ItemStack, var3: Container): void;
  }


  class SmeltItem {
    smelt(var1: Player, var2: ItemStack): void;
  }


  class PickupItemPredicate {
    canPickup(var1: Player, var2: ItemEntity, var3: ItemStack): EventResult;
  }


  class PickupItem {
    pickup(var1: Player, var2: ItemEntity, var3: ItemStack): void;
  }


  class ChangeDimension {
    change(var1: ServerPlayer, var2: ResourceKey<Level>, var3: ResourceKey<Level>): void;
  }


  class DropItem {
    drop(var1: Player, var2: ItemEntity): EventResult;
  }


  class OpenMenu {
    open(var1: Player, var2: AbstractContainerMenu): void;
  }


  class CloseMenu {
    close(var1: Player, var2: AbstractContainerMenu): void;
  }


  class FillBucket {
    fill(var1: Player, var2: Level, var3: ItemStack, var4: HitResult): CompoundEventResult<ItemStack>;
  }


  class AttackEntity {
    attack(var1: Player, var2: Level, var3: Entity, var4: InteractionHand, var5: EntityHitResult): EventResult;
  }

}

declare module 'dev.architectury.event.events.common.TickEvent' {
  import { TickEvent } from 'dev.architectury.event.events.common';
  import { MinecraftServer } from 'net.minecraft.server';
  import { ServerLevel } from 'net.minecraft.server.level';

  interface Server extends TickEvent<MinecraftServer> {}
  class Server extends TickEvent<MinecraftServer> {
  }


  interface ServerLevelTick extends LevelTick<ServerLevel> {}
  class ServerLevelTick extends LevelTick<ServerLevel> {
  }


  interface Player extends TickEvent<Player> {}
  class Player extends TickEvent<Player> {
  }


  interface LevelTick<T extends Level = any> extends TickEvent<T> {}
  class LevelTick<T extends Level = any> extends TickEvent<T> {
  }

}

declare module 'dev.architectury.event.forge' {
  import { ItemTooltipEvent, AttackEntityEvent } from 'net.neoforged.neoforge.event.entity.player';
  import { Pre, Post } from 'ClientTickEvent';
  import { Post as renderguievent_Post } from 'RenderGuiEvent';
  import { LoggingIn, LoggingOut, Clone } from 'ClientPlayerNetworkEvent';
  import { Pre as screenevent_init_Pre, Post as screenevent_init_Post } from 'ScreenEvent.Init';
  import { DebugText } from 'CustomizeGuiOverlayEvent';
  import { ClientChatEvent, ClientChatReceivedEvent, RecipesUpdatedEvent, RegisterClientCommandsEvent } from 'net.neoforged.neoforge.client.event';
  import { Load, Unload, Save } from 'LevelEvent';
  import { Opening } from 'ScreenEvent';
  import { Pre as screenevent_render_Pre, Post as screenevent_render_Post } from 'ScreenEvent.Render';
  import { Background, Foreground } from 'ContainerScreenEvent.Render';
  import { RightClickEmpty, LeftClickEmpty, RightClickItem, RightClickBlock, EntityInteract, LeftClickBlock } from 'PlayerInteractEvent';
  import { Pre as rendertooltipevent_Pre, Color } from 'RenderTooltipEvent';
  import { Pre as screenevent_mousescrolled_Pre, Post as screenevent_mousescrolled_Post } from 'ScreenEvent.MouseScrolled';
  import { Pre as screenevent_mousebuttonpressed_Pre, Post as screenevent_mousebuttonpressed_Post } from 'ScreenEvent.MouseButtonPressed';
  import { Pre as screenevent_mousedragged_Pre, Post as screenevent_mousedragged_Post } from 'ScreenEvent.MouseDragged';
  import { Pre as screenevent_mousebuttonreleased_Pre, Post as screenevent_mousebuttonreleased_Post } from 'ScreenEvent.MouseButtonReleased';
  import { Pre as screenevent_charactertyped_Pre, Post as screenevent_charactertyped_Post } from 'ScreenEvent.CharacterTyped';
  import { Pre as screenevent_keypressed_Pre, Post as screenevent_keypressed_Post } from 'ScreenEvent.KeyPressed';
  import { Pre as screenevent_keyreleased_Pre, Post as screenevent_keyreleased_Post } from 'ScreenEvent.KeyReleased';
  import { MouseScrollingEvent, Key } from 'InputEvent';
  import { Pre as inputevent_mousebutton_Pre, Post as inputevent_mousebutton_Post } from 'InputEvent.MouseButton';
  import { Pre as servertickevent_Pre, Post as servertickevent_Post } from 'ServerTickEvent';
  import { Pre as leveltickevent_Pre, Post as leveltickevent_Post } from 'LevelTickEvent';
  import { ServerStartingEvent, ServerStartedEvent, ServerStoppingEvent, ServerStoppedEvent, ServerAboutToStartEvent } from 'net.neoforged.neoforge.event.server';
  import { RegisterCommandsEvent, CommandEvent, ServerChatEvent, LootTableLoadEvent } from 'net.neoforged.neoforge.event';
  import { PlayerLoggedInEvent, PlayerLoggedOutEvent, PlayerRespawnEvent, Clone as playerevent_Clone, ItemCraftedEvent, ItemSmeltedEvent, PlayerChangedDimensionEvent } from 'PlayerEvent';
  import { Pre as playertickevent_Pre, Post as playertickevent_Post } from 'PlayerTickEvent';
  import { LivingDeathEvent, LivingIncomingDamageEvent, FinalizeSpawnEvent, AnimalTameEvent } from 'net.neoforged.neoforge.event.entity.living';
  import { AdvancementEarnEvent } from 'AdvancementEvent';
  import { Start } from 'ExplosionEvent';
  import { Detonate } from 'dev.architectury.event.events.common.ExplosionEvent';
  import { EntityJoinLevelEvent } from 'net.neoforged.neoforge.event.entity';
  import { FarmlandTrampleEvent, BreakEvent, EntityPlaceEvent } from 'BlockEvent';
  import { Pre as itementitypickupevent_Pre, Post as itementitypickupevent_Post } from 'ItemEntityPickupEvent';
  import { ItemTossEvent } from 'net.neoforged.neoforge.event.entity.item';
  import { Open, Close } from 'PlayerContainerEvent';
  import { Save as chunkdataevent_Save, Load as chunkdataevent_Load } from 'ChunkDataEvent';

  class EventHandlerImplClient {
    static event(event: ItemTooltipEvent): void;
    static event(event: Pre): void;
    static event(event: Post): void;
    static event(event: LoggingIn): void;
    static event(event: LoggingOut): void;
    static event(event: Clone): void;
    static event(event: ClientChatEvent): void;
    static event(event: ClientChatReceivedEvent): void;
    static event(event: Opening): void;
    static event(event: RecipesUpdatedEvent): void;
    static event(event: RegisterClientCommandsEvent): void;
    static eventContainerScreenEvent(event: Background): void;
    static eventContainerScreenEvent(event: Foreground): void;
    static eventDrawScreenEvent(event: screenevent_render_Pre): void;
    static eventDrawScreenEvent(event: screenevent_render_Post): void;
    static eventInitScreenEvent(event: screenevent_init_Pre): void;
    static eventInitScreenEvent(event: screenevent_init_Post): void;
    static eventInputEvent(event: MouseScrollingEvent): void;
    static eventInputEvent(event: inputevent_mousebutton_Pre): void;
    static eventInputEvent(event: inputevent_mousebutton_Post): void;
    static eventInputEvent(event: Key): void;
    static eventKeyboardCharTypedEvent(event: screenevent_charactertyped_Pre): void;
    static eventKeyboardCharTypedEvent(event: screenevent_charactertyped_Post): void;
    static eventKeyboardKeyPressedEvent(event: screenevent_keypressed_Pre): void;
    static eventKeyboardKeyPressedEvent(event: screenevent_keypressed_Post): void;
    static eventKeyboardKeyReleasedEvent(event: screenevent_keyreleased_Pre): void;
    static eventKeyboardKeyReleasedEvent(event: screenevent_keyreleased_Post): void;
    static eventMouseClickedEvent(event: screenevent_mousebuttonpressed_Pre): void;
    static eventMouseClickedEvent(event: screenevent_mousebuttonpressed_Post): void;
    static eventMouseDragEvent(event: screenevent_mousedragged_Pre): void;
    static eventMouseDragEvent(event: screenevent_mousedragged_Post): void;
    static eventMouseReleasedEvent(event: screenevent_mousebuttonreleased_Pre): void;
    static eventMouseReleasedEvent(event: screenevent_mousebuttonreleased_Post): void;
    static eventMouseScrollEvent(event: screenevent_mousescrolled_Pre): void;
    static eventMouseScrollEvent(event: screenevent_mousescrolled_Post): void;
    static eventPlayerInteractEvent(event: RightClickEmpty): void;
    static eventPlayerInteractEvent(event: LeftClickEmpty): void;
    static eventRenderGameOverlayEvent(event: renderguievent_Post): void;
    static eventRenderGameOverlayEvent(event: DebugText): void;
    static eventRenderTooltipEvent(event: rendertooltipevent_Pre): void;
    static eventRenderTooltipEvent(event: Color): void;
    static eventWorldEvent(event: Load): void;
  }


  class EventHandlerImplCommon {
    static event(event: servertickevent_Pre): void;
    static event(event: servertickevent_Post): void;
    static event(event: leveltickevent_Pre): void;
    static event(event: leveltickevent_Post): void;
    static event(event: ServerStartingEvent): void;
    static event(event: ServerStartedEvent): void;
    static event(event: ServerStoppingEvent): void;
    static event(event: ServerStoppedEvent): void;
    static event(event: RegisterCommandsEvent): void;
    static event(event: PlayerLoggedInEvent): void;
    static event(event: PlayerLoggedOutEvent): void;
    static event(event: PlayerRespawnEvent): void;
    static event(event: CommandEvent): void;
    static event(event: playertickevent_Pre): void;
    static event(event: playertickevent_Post): void;
    static event(event: ServerChatEvent): void;
    static event(event: LivingDeathEvent): void;
    static event(event: AdvancementEarnEvent): void;
    static event(event: LivingIncomingDamageEvent): void;
    static event(event: EntityJoinLevelEvent): void;
    static event(event: FarmlandTrampleEvent): void;
    static event(event: AnimalTameEvent): void;
    static event(event: ItemCraftedEvent): void;
    static event(event: ItemSmeltedEvent): void;
    static event(event: itementitypickupevent_Pre): void;
    static event(event: itementitypickupevent_Post): void;
    static event(event: ItemTossEvent): void;
    static event(event: BreakEvent): void;
    static event(event: EntityPlaceEvent): void;
    static event(event: ServerAboutToStartEvent): void;
    static event(event: PlayerChangedDimensionEvent): void;
    static event(event: LootTableLoadEvent): void;
    static event(event: AttackEntityEvent): void;
    static eventAfter(event: ServerChatEvent): void;
    static eventChunkDataEvent(event: chunkdataevent_Save): void;
    static eventChunkDataEvent(event: chunkdataevent_Load): void;
    static eventExplosionEvent(event: Start): void;
    static eventExplosionEvent(event: Detonate): void;
    static eventLivingSpawnEvent(event: FinalizeSpawnEvent): void;
    static eventPlayerContainerEvent(event: Open): void;
    static eventPlayerContainerEvent(event: Close): void;
    static eventPlayerEvent(event: playerevent_Clone): void;
    static eventPlayerInteractEvent(event: RightClickItem): void;
    static eventPlayerInteractEvent(event: RightClickBlock): void;
    static eventPlayerInteractEvent(event: EntityInteract): void;
    static eventPlayerInteractEvent(event: LeftClickBlock): void;
    static eventWorldEvent(event: Load): void;
    static eventWorldEvent(event: Unload): void;
    static eventWorldEvent(event: Save): void;
  }


  class EventHandlerImplServer {
  }

}

declare module 'dev.architectury.event.forge.EventHandlerImplClient' {
  import { FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';
  import { RegisterShadersEvent } from 'net.neoforged.neoforge.client.event';

  class ModBasedEventHandler {
    static event(event: FMLClientSetupEvent): void;
    static event(event: RegisterShadersEvent): void;
  }

}

declare module 'dev.architectury.event.forge.EventHandlerImplCommon' {
  import { LevelAccessor } from 'net.minecraft.world.level';
  import { FMLCommonSetupEvent } from 'net.neoforged.fml.event.lifecycle';

  class LevelEventAttachment {
    architectury$attachLevel(var1: LevelAccessor): void;
    architectury$getAttachedLevel(): LevelAccessor;
  }


  class ModBasedEventHandler {
    static event(event: FMLCommonSetupEvent): void;
  }

}

declare module 'dev.architectury.event.forge.EventHandlerImplServer' {
  class ModBasedEventHandler {
  }

}

declare module 'dev.architectury.extensions.injected' {
  import { Block } from 'net.minecraft.world.level.block';
  import { Holder } from 'net.minecraft.core';
  import { Fluid, FlowingFluid } from 'net.minecraft.world.level.material';
  import { EntityType } from 'net.minecraft.world.entity';
  import { Builder } from 'FoodProperties';
  import { Supplier } from 'java.util.function';
  import { MobEffectInstance } from 'net.minecraft.world.effect';
  import { Item, CreativeModeTab } from 'net.minecraft.world.item';
  import { Properties } from 'Item';
  import { DeferredSupplier } from 'dev.architectury.registry.registries';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';

  interface InjectedBlockExtension extends InjectedRegistryEntryExtension<Block> {}
  class InjectedBlockExtension extends InjectedRegistryEntryExtension<Block> {
    arch$holder(): Holder<Block>;
  }


  class InjectedBucketItemExtension {
    arch$getFluid(): Fluid;
  }


  interface InjectedEntityTypeExtension extends InjectedRegistryEntryExtension<EntityType> {}
  class InjectedEntityTypeExtension extends InjectedRegistryEntryExtension<EntityType> {
    arch$holder(): Holder<EntityType<any>>;
  }


  interface InjectedFluidExtension extends InjectedRegistryEntryExtension<Fluid> {}
  class InjectedFluidExtension extends InjectedRegistryEntryExtension<Fluid> {
    arch$holder(): Holder<Fluid>;
  }


  class InjectedFoodPropertiesBuilderExtension {
    arch$effect(effectSupplier: Supplier<MobEffectInstance>, chance: number): Builder;
  }


  interface InjectedItemExtension extends InjectedRegistryEntryExtension<Item> {}
  class InjectedItemExtension extends InjectedRegistryEntryExtension<Item> {
    arch$holder(): Holder<Item>;
  }


  class InjectedItemPropertiesExtension {
    arch$tab(tab: CreativeModeTab): Properties;
    arch$tab(tab: DeferredSupplier<CreativeModeTab>): Properties;
    arch$tab(tab: ResourceKey<CreativeModeTab>): Properties;
  }


  class InjectedLiquidBlockExtension {
    arch$getFluid(): FlowingFluid;
  }


  class InjectedRegistryEntryExtension<T = any> {
    arch$holder(): Holder<T>;
    arch$registryName(): ResourceLocation;
  }

}

declare module 'dev.architectury.extensions' {
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { EquipmentSlot } from 'net.minecraft.world.entity';

  class ItemExtension {
    getCustomEquipmentSlot(stack: ItemStack): EquipmentSlot;
    tickArmor(stack: ItemStack, player: Player): void;
  }

}

declare module 'dev.architectury.extensions.network' {
  import { FriendlyByteBuf } from 'net.minecraft.network';

  class EntitySpawnExtension {
    loadAdditionalSpawnData(var1: FriendlyByteBuf): void;
    saveAdditionalSpawnData(var1: FriendlyByteBuf): void;
  }

}

declare module 'dev.architectury.hooks.block' {
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';

  class BlockEntityHooks {
    static syncData(entity: BlockEntity): void;
  }

}

declare module 'dev.architectury.hooks.client.screen' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { List } from 'java.util';
  import { NarratableEntry } from 'net.minecraft.client.gui.narration';
  import { Renderable, AbstractWidget } from 'net.minecraft.client.gui.components';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';

  class ScreenAccess {
    addRenderableOnly<T extends Renderable>(var1: T): T;
    addRenderableWidget<T extends AbstractWidget & NarratableEntry>(var1: T): T;
    addWidget<T extends GuiEventListener & NarratableEntry>(var1: T): T;
    get narratables(): NarratableEntry[];
    get renderables(): Renderable[];
    get screen(): Screen;
  }

}

declare module 'dev.architectury.hooks' {
  import { DyeColor } from 'net.minecraft.world.item';

  class DyeColorHooks {
    static getColorValue(color: DyeColor): number;
  }

}

declare module 'dev.architectury.hooks.fluid' {
  import { Fluid, FlowingFluid } from 'net.minecraft.world.level.material';
  import { BucketItem } from 'net.minecraft.world.item';
  import { LiquidBlock } from 'net.minecraft.world.level.block';

  class FluidBucketHooks {
    static getFluid(item: BucketItem): Fluid;
  }


  class LiquidBlockHooks {
    static getFluid(block: LiquidBlock): FlowingFluid;
  }

}

declare module 'dev.architectury.hooks.fluid.forge' {
  import { FluidStack } from 'dev.architectury.fluid';
  import { FluidStack as net_neoforged_neoforge_fluids_FluidStack } from 'net.neoforged.neoforge.fluids';

  class FluidStackHooksForge {
    static fromForge(stack: net_neoforged_neoforge_fluids_FluidStack): FluidStack;
    static toForge(stack: FluidStack): net_neoforged_neoforge_fluids_FluidStack;
  }

}

declare module 'dev.architectury.hooks.item' {
  import { ItemStack } from 'net.minecraft.world.item';
  import { ServerPlayer } from 'net.minecraft.server.level';

  class ItemStackHooks {
    static copyWithCount(stack: ItemStack, count: number): ItemStack;
    static getCraftingRemainingItem(stack: ItemStack): ItemStack;
    static giveItem(player: ServerPlayer, stack: ItemStack): void;
    static hasCraftingRemainingItem(stack: ItemStack): boolean;
  }

}

declare module 'dev.architectury.hooks.item.tool' {
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  class AxeItemHooks {
    static addStrippable(input: Block, result: Block): void;
  }


  class ShovelItemHooks {
    static addFlattenable(input: Block, result: BlockState): void;
  }

}

declare module 'dev.architectury.hooks.level.biome' {
  import { Biome, AmbientParticleSettings, AmbientMoodSettings, AmbientAdditionsSettings } from 'net.minecraft.world.level.biome';
  import { TemperatureModifier } from 'Biome';
  import { OptionalInt, Optional, List, Map } from 'java.util';
  import { GrassColorModifier } from 'BiomeSpecialEffects';
  import { Holder } from 'net.minecraft.core';
  import { SoundEvent, Music } from 'net.minecraft.sounds';
  import { Iterable } from 'java.lang';
  import { ConfiguredWorldCarver } from 'net.minecraft.world.level.levelgen.carver';
  import { Carving, Decoration } from 'GenerationStep';
  import { PlacedFeature } from 'net.minecraft.world.level.levelgen.placement';
  import { MobCategory, EntityType } from 'net.minecraft.world.entity';
  import { SpawnerData, MobSpawnCost } from 'MobSpawnSettings';

  class BiomeHooks {
    static getBiomeProperties(biome: Biome): BiomeProperties;
  }


  class BiomeProperties {
    get climateProperties(): ClimateProperties;
    get effectsProperties(): EffectsProperties;
    get generationProperties(): GenerationProperties;
    get spawnProperties(): SpawnProperties;
  }


  class ClimateProperties {
    get downfall(): number;
    get temperature(): number;
    get temperatureModifier(): TemperatureModifier;
    hasPrecipitation(): boolean;
  }


  class EffectsProperties {
    get ambientAdditionsSound(): Optional<AmbientAdditionsSettings>;
    get ambientLoopSound(): Optional<Holder<SoundEvent>>;
    get ambientMoodSound(): Optional<AmbientMoodSettings>;
    get ambientParticle(): Optional<AmbientParticleSettings>;
    get backgroundMusic(): Optional<Music>;
    get fogColor(): number;
    get foliageColorOverride(): OptionalInt;
    get grassColorModifier(): GrassColorModifier;
    get grassColorOverride(): OptionalInt;
    get skyColor(): number;
    get waterColor(): number;
    get waterFogColor(): number;
  }


  class GenerationProperties {
    get features(): Iterable<Holder<PlacedFeature>>[];
    getCarvers(var1: Carving): Iterable<Holder<ConfiguredWorldCarver<any>>>;
    getFeatures(var1: Decoration): Iterable<Holder<PlacedFeature>>;
  }


  class SpawnProperties {
    get creatureProbability(): number;
    get mobSpawnCosts(): Map<EntityType<any>, MobSpawnCost>;
    get spawners(): Map<MobCategory, SpawnerData[]>;
  }

}

declare module 'dev.architectury.hooks.level.biome.BiomeHooks' {
  import { BiomeProperties, ClimateProperties, EffectsProperties, GenerationProperties, SpawnProperties } from 'dev.architectury.hooks.level.biome';
  import { Biome, MobSpawnSettings, BiomeGenerationSettings, BiomeSpecialEffects, AmbientParticleSettings, AmbientMoodSettings, AmbientAdditionsSettings } from 'net.minecraft.world.level.biome';
  import { Map, List, OptionalInt, Optional } from 'java.util';
  import { MobCategory, EntityType } from 'net.minecraft.world.entity';
  import { SpawnerData, MobSpawnCost } from 'MobSpawnSettings';
  import { Iterable, Integer } from 'java.lang';
  import { Holder } from 'net.minecraft.core';
  import { ConfiguredWorldCarver } from 'net.minecraft.world.level.levelgen.carver';
  import { Carving, Decoration } from 'GenerationStep';
  import { PlacedFeature } from 'net.minecraft.world.level.levelgen.placement';
  import { Mutable } from 'dev.architectury.hooks.level.biome.EffectsProperties';
  import { GrassColorModifier } from 'BiomeSpecialEffects';
  import { SoundEvent, Music } from 'net.minecraft.sounds';
  import { Mutable as dev_architectury_hooks_level_biome_climateproperties_Mutable } from 'dev.architectury.hooks.level.biome.ClimateProperties';
  import { ClimateSettings, TemperatureModifier } from 'Biome';
  import { Mutable as dev_architectury_hooks_level_biome_biomeproperties_Mutable } from 'dev.architectury.hooks.level.biome.BiomeProperties';
  import { Mutable as dev_architectury_hooks_level_biome_generationproperties_Mutable } from 'dev.architectury.hooks.level.biome.GenerationProperties';
  import { Mutable as dev_architectury_hooks_level_biome_spawnproperties_Mutable } from 'dev.architectury.hooks.level.biome.SpawnProperties';

  interface BiomeWrapped extends BiomeProperties {}
  class BiomeWrapped extends BiomeProperties {
    constructor(biome: Biome);

    constructor(biome: Biome, climateProperties: ClimateProperties, effectsProperties: EffectsProperties, generationProperties: GenerationProperties, spawnProperties: SpawnProperties);
    get climateProperties(): ClimateProperties;
    get effectsProperties(): EffectsProperties;
    get generationProperties(): GenerationProperties;
    get spawnProperties(): SpawnProperties;
  }


  interface SpawnSettingsWrapped extends SpawnProperties {}
  class SpawnSettingsWrapped extends SpawnProperties {
    constructor(biome: Biome);

    constructor(settings: MobSpawnSettings);
    get creatureProbability(): number;
    get mobSpawnCosts(): Map<EntityType<any>, MobSpawnCost>;
    get spawners(): Map<MobCategory, SpawnerData[]>;
  }


  interface GenerationSettingsWrapped extends GenerationProperties {}
  class GenerationSettingsWrapped extends GenerationProperties {
    constructor(biome: Biome);

    constructor(settings: BiomeGenerationSettings);
    get features(): Iterable<Holder<PlacedFeature>>[];
    getCarvers(carving: Carving): Iterable<Holder<ConfiguredWorldCarver<any>>>;
    getFeatures(decoration: Decoration): Iterable<Holder<PlacedFeature>>;
  }


  interface EffectsWrapped extends Mutable {}
  class EffectsWrapped extends Mutable {
    constructor(biome: Biome);

    constructor(effects: BiomeSpecialEffects);
    get ambientAdditionsSound(): Optional<AmbientAdditionsSettings>;
    get ambientLoopSound(): Optional<Holder<SoundEvent>>;
    get ambientMoodSound(): Optional<AmbientMoodSettings>;
    get ambientParticle(): Optional<AmbientParticleSettings>;
    get backgroundMusic(): Optional<Music>;
    get fogColor(): number;
    get foliageColorOverride(): OptionalInt;
    get grassColorModifier(): GrassColorModifier;
    get grassColorOverride(): OptionalInt;
    get skyColor(): number;
    get waterColor(): number;
    get waterFogColor(): number;
    set ambientAdditionsSound(settings: AmbientAdditionsSettings);
    set ambientLoopSound(sound: Holder<SoundEvent>);
    set ambientMoodSound(settings: AmbientMoodSettings);
    set ambientParticle(settings: AmbientParticleSettings);
    set backgroundMusic(music: Music);
    set fogColor(color: number);
    set foliageColorOverride(colorOverride: number);
    set grassColorModifier(modifier: GrassColorModifier);
    set grassColorOverride(colorOverride: number);
    set skyColor(color: number);
    set waterColor(color: number);
    set waterFogColor(color: number);
  }


  interface ClimateWrapped extends dev_architectury_hooks_level_biome_climateproperties_Mutable {}
  class ClimateWrapped extends dev_architectury_hooks_level_biome_climateproperties_Mutable {
    constructor(biome: Biome);

    constructor(climateSettings: ClimateSettings);
    get downfall(): number;
    get temperature(): number;
    get temperatureModifier(): TemperatureModifier;
    hasPrecipitation(): boolean;
    set downfall(downfall: number);
    set temperature(temperature: number);
    set temperatureModifier(temperatureModifier: TemperatureModifier);
    setHasPrecipitation(hasPrecipitation: boolean): dev_architectury_hooks_level_biome_climateproperties_Mutable;
  }


  interface MutableBiomeWrapped extends dev_architectury_hooks_level_biome_biomeproperties_Mutable, BiomeWrapped {}
  class MutableBiomeWrapped extends dev_architectury_hooks_level_biome_biomeproperties_Mutable {
    constructor(biome: Biome, generationProperties: dev_architectury_hooks_level_biome_generationproperties_Mutable, spawnProperties: dev_architectury_hooks_level_biome_spawnproperties_Mutable);

    constructor(biome: Biome, climateProperties: dev_architectury_hooks_level_biome_climateproperties_Mutable, effectsProperties: Mutable, generationProperties: dev_architectury_hooks_level_biome_generationproperties_Mutable, spawnProperties: dev_architectury_hooks_level_biome_spawnproperties_Mutable);
    get climateProperties(): dev_architectury_hooks_level_biome_climateproperties_Mutable;
    get effectsProperties(): Mutable;
    get generationProperties(): dev_architectury_hooks_level_biome_generationproperties_Mutable;
    get spawnProperties(): dev_architectury_hooks_level_biome_spawnproperties_Mutable;
  }

}

declare module 'dev.architectury.hooks.level.biome.BiomeProperties' {
  import { BiomeProperties } from 'dev.architectury.hooks.level.biome';
  import { Mutable as dev_architectury_hooks_level_biome_climateproperties_Mutable } from 'dev.architectury.hooks.level.biome.ClimateProperties';
  import { Mutable as dev_architectury_hooks_level_biome_effectsproperties_Mutable } from 'dev.architectury.hooks.level.biome.EffectsProperties';
  import { Mutable as dev_architectury_hooks_level_biome_generationproperties_Mutable } from 'dev.architectury.hooks.level.biome.GenerationProperties';
  import { Mutable as dev_architectury_hooks_level_biome_spawnproperties_Mutable } from 'dev.architectury.hooks.level.biome.SpawnProperties';

  interface Mutable extends BiomeProperties {}
  class Mutable extends BiomeProperties {
    get climateProperties(): dev_architectury_hooks_level_biome_climateproperties_Mutable;
    get effectsProperties(): dev_architectury_hooks_level_biome_effectsproperties_Mutable;
    get generationProperties(): dev_architectury_hooks_level_biome_generationproperties_Mutable;
    get spawnProperties(): dev_architectury_hooks_level_biome_spawnproperties_Mutable;
  }

}

declare module 'dev.architectury.hooks.level.biome.ClimateProperties' {
  import { ClimateProperties } from 'dev.architectury.hooks.level.biome';
  import { TemperatureModifier } from 'Biome';

  interface Mutable extends ClimateProperties {}
  class Mutable extends ClimateProperties {
    setDownfall(var1: number): Mutable;
    setHasPrecipitation(var1: boolean): Mutable;
    setTemperature(var1: number): Mutable;
    setTemperatureModifier(var1: TemperatureModifier): Mutable;
  }

}

declare module 'dev.architectury.hooks.level.biome.EffectsProperties' {
  import { EffectsProperties } from 'dev.architectury.hooks.level.biome';
  import { Integer } from 'java.lang';
  import { GrassColorModifier } from 'BiomeSpecialEffects';
  import { AmbientParticleSettings, AmbientMoodSettings, AmbientAdditionsSettings } from 'net.minecraft.world.level.biome';
  import { Holder } from 'net.minecraft.core';
  import { SoundEvent, Music } from 'net.minecraft.sounds';

  interface Mutable extends EffectsProperties {}
  class Mutable extends EffectsProperties {
    setAmbientAdditionsSound(var1: AmbientAdditionsSettings): Mutable;
    setAmbientLoopSound(var1: Holder<SoundEvent>): Mutable;
    setAmbientMoodSound(var1: AmbientMoodSettings): Mutable;
    setAmbientParticle(var1: AmbientParticleSettings): Mutable;
    setBackgroundMusic(var1: Music): Mutable;
    setFogColor(var1: number): Mutable;
    setFoliageColorOverride(var1: number): Mutable;
    setGrassColorModifier(var1: GrassColorModifier): Mutable;
    setGrassColorOverride(var1: number): Mutable;
    setSkyColor(var1: number): Mutable;
    setWaterColor(var1: number): Mutable;
    setWaterFogColor(var1: number): Mutable;
  }

}

declare module 'dev.architectury.hooks.level.biome.GenerationProperties' {
  import { GenerationProperties } from 'dev.architectury.hooks.level.biome';
  import { Decoration, Carving } from 'GenerationStep';
  import { Holder } from 'net.minecraft.core';
  import { PlacedFeature } from 'net.minecraft.world.level.levelgen.placement';
  import { ResourceKey } from 'net.minecraft.resources';
  import { ConfiguredWorldCarver } from 'net.minecraft.world.level.levelgen.carver';

  interface Mutable extends GenerationProperties {}
  class Mutable extends GenerationProperties {
    addCarver(var1: Carving, var2: Holder<ConfiguredWorldCarver<any>>): Mutable;
    addCarver(var1: Carving, var2: ResourceKey<ConfiguredWorldCarver<any>>): Mutable;
    addFeature(var1: Decoration, var2: Holder<PlacedFeature>): Mutable;
    addFeature(var1: Decoration, var2: ResourceKey<PlacedFeature>): Mutable;
    removeCarver(var1: Carving, var2: ResourceKey<ConfiguredWorldCarver<any>>): Mutable;
    removeFeature(var1: Decoration, var2: ResourceKey<PlacedFeature>): Mutable;
  }

}

declare module 'dev.architectury.hooks.level.biome.SpawnProperties' {
  import { SpawnProperties } from 'dev.architectury.hooks.level.biome';
  import { MobCategory, EntityType } from 'net.minecraft.world.entity';
  import { SpawnerData, MobSpawnCost } from 'MobSpawnSettings';
  import { BiPredicate } from 'java.util.function';

  interface Mutable extends SpawnProperties {}
  class Mutable extends SpawnProperties {
    addSpawn(var1: MobCategory, var2: SpawnerData): Mutable;
    clearSpawnCost(var1: EntityType<any>): Mutable;
    removeSpawns(var1: BiPredicate<MobCategory, SpawnerData>): boolean;
    setCreatureProbability(var1: number): Mutable;
    setSpawnCost(var1: EntityType<any>, var2: MobSpawnCost): Mutable;
    setSpawnCost(var1: EntityType<any>, var2: number, var4: number): Mutable;
  }

}

declare module 'dev.architectury.hooks.level.entity' {
  import { Entity } from 'net.minecraft.world.entity';
  import { CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { IntValue } from 'dev.architectury.utils.value';
  import { ItemEntity } from 'net.minecraft.world.entity.item';
  import { Player } from 'net.minecraft.world.entity.player';

  class EntityHooks {
    static fromCollision(ctx: CollisionContext): Entity;
  }


  class ItemEntityHooks {
    static lifespan(entity: ItemEntity): IntValue;
  }


  class PlayerHooks {
    static isFake(player: Player): boolean;
  }

}

declare module 'dev.architectury.hooks.level' {
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Explosion } from 'net.minecraft.world.level';

  class ExplosionHooks {
    static getPosition(explosion: Explosion): Vec3;
  }

}

declare module 'dev.architectury.impl' {
  import { Supplier } from 'java.util.function';
  import { Map, List } from 'java.util';
  import { Side, NetworkReceiver } from 'NetworkManager';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { PacketTransformer, PacketSink } from 'dev.architectury.networking.transformers';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { RegistryAccess } from 'net.minecraft.core';
  import { Packet } from 'net.minecraft.network.protocol';

  class NetworkAggregator {
    static readonly ADAPTOR: Supplier;
    static readonly C2S_TYPE: Map;
    static readonly S2C_TYPE: Map;
    static readonly C2S_RECEIVER: Map;
    static readonly S2C_RECEIVER: Map;
    static readonly C2S_CODECS: Map;
    static readonly S2C_CODECS: Map;
    static readonly C2S_TRANSFORMERS: Map;
    static readonly S2C_TRANSFORMERS: Map;
    static collectPackets(sink: PacketSink, side: Side, id: ResourceLocation, buf: RegistryFriendlyByteBuf): void;
    static collectPackets<T extends CustomPacketPayload>(sink: PacketSink, side: Side, payload: T, access: RegistryAccess): void;
    static registerReceiver(side: Side, id: ResourceLocation, packetTransformers: PacketTransformer[], receiver: NetworkReceiver<RegistryFriendlyByteBuf>): void;
    static registerReceiver<T extends CustomPacketPayload>(side: Side, type: Type<T>, codec: StreamCodec<RegistryFriendlyByteBuf, T>, packetTransformers: PacketTransformer[], receiver: NetworkReceiver<T>): void;
    static registerS2CType(id: ResourceLocation, packetTransformers: PacketTransformer[]): void;
    static registerS2CType<T extends CustomPacketPayload>(type: Type<T>, codec: StreamCodec<RegistryFriendlyByteBuf, T>, packetTransformers: PacketTransformer[]): void;
    static toPacket<T extends CustomPacketPayload>(side: Side, payload: T): Packet<any>;
  }

}

declare module 'dev.architectury.impl.NetworkAggregator' {
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { NetworkReceiver } from 'NetworkManager';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { Packet } from 'net.minecraft.network.protocol';

  class Adaptor {
    registerC2S<T extends CustomPacketPayload>(var1: Type<T>, var2: StreamCodec<RegistryFriendlyByteBuf, T>, var3: NetworkReceiver<T>): void;
    registerS2C<T extends CustomPacketPayload>(var1: Type<T>, var2: StreamCodec<RegistryFriendlyByteBuf, T>, var3: NetworkReceiver<T>): void;
    registerS2CType<T extends CustomPacketPayload>(var1: Type<T>, var2: StreamCodec<RegistryFriendlyByteBuf, T>): void;
    toC2SPacket<T extends CustomPacketPayload>(var1: T): Packet<any>;
    toS2CPacket<T extends CustomPacketPayload>(var1: T): Packet<any>;
  }

}

declare module 'dev.architectury.mixin.forge.client' {
  import { ClientCommandSourceStack } from 'dev.architectury.event.events.client.ClientCommandRegistrationEvent';
  import { Supplier } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';
  import { LocalPlayer } from 'net.minecraft.client.player';
  import { Vec3, Vec2 } from 'net.minecraft.world.phys';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';

  interface MixinCommandSourceStack extends ClientCommandSourceStack {}
  class MixinCommandSourceStack extends ClientCommandSourceStack {
    arch$getLevel(): ClientLevel;
    arch$getPlayer(): LocalPlayer;
    arch$getPosition(): Vec3;
    arch$getRotation(): Vec2;
    arch$sendFailure(message: Component): void;
    arch$sendSuccess(message: Supplier<Component>, broadcastToAdmins: boolean): void;
  }

}

declare module 'dev.architectury.mixin.forge' {
  import { Level, LevelAccessor } from 'net.minecraft.world.level';
  import { Entity, EntityType, EquipmentSlot } from 'net.minecraft.world.entity';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockPos, NonNullList } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Player } from 'net.minecraft.world.entity.player';
  import { IItemExtension } from 'net.neoforged.neoforge.common.extensions';
  import { ItemStack } from 'net.minecraft.world.item';
  import { LevelEventAttachment } from 'dev.architectury.event.forge.EventHandlerImplCommon';

  interface MixinClientLevel extends Level {}
  class MixinClientLevel extends Level {
  }


  interface MixinFallingBlockEntity extends Entity {}
  class MixinFallingBlockEntity extends Entity {
    constructor(entityType: EntityType<any>, level: Level);
    handleLand(ci: CallbackInfo, block: Block, blockPos2: BlockPos, bl: boolean, bl2: boolean, d: number, blockState: BlockState): void;
  }


  class MixinInventory {
    armor: NonNullList;
    player: Player;
  }


  interface MixinItemExtension extends IItemExtension {}
  class MixinItemExtension extends IItemExtension {
    getEquipmentSlot(stack: ItemStack): EquipmentSlot;
  }


  interface MixinLevelEvent extends LevelEventAttachment {}
  class MixinLevelEvent extends LevelEventAttachment {
    architectury$attachLevel(level: LevelAccessor): void;
    architectury$getAttachedLevel(): LevelAccessor;
  }


  class MixinMinecraft {
  }

}

declare module 'dev.architectury.mixin.forge.neoforge' {
  import { Fluid, FlowingFluid } from 'net.minecraft.world.level.material';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { InteractionHand, InteractionResultHolder } from 'net.minecraft.world';
  import { CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { ItemStack } from 'net.minecraft.world.item';
  import { BlockHitResult } from 'net.minecraft.world.phys';

  class BucketItemAccessor {
    get content(): Fluid;
  }


  class LiquidBlockAccessor {
    get fluid(): FlowingFluid;
  }


  class MixinBucketItem {
    fillBucket(level: Level, player: Player, hand: InteractionHand, cir: CallbackInfoReturnable<InteractionResultHolder<ItemStack>>, stack: ItemStack, target: BlockHitResult): void;
  }


  class MixinChunkSerializer {
  }

}

declare module 'dev.architectury.mixin.inject' {
  import { InjectedBlockExtension, InjectedBucketItemExtension, InjectedEntityTypeExtension, InjectedFluidExtension, InjectedFoodPropertiesBuilderExtension, InjectedItemExtension, InjectedItemPropertiesExtension, InjectedLiquidBlockExtension } from 'dev.architectury.extensions.injected';
  import { ItemPropertiesExtensionImpl } from 'dev.architectury.impl';
  import { Properties } from 'Item';
  import { CreativeModeTab } from 'net.minecraft.world.item';
  import { DeferredSupplier } from 'dev.architectury.registry.registries';
  import { ResourceKey } from 'net.minecraft.resources';

  interface MixinBlock extends InjectedBlockExtension {}
  class MixinBlock extends InjectedBlockExtension {
  }


  interface MixinBucketItem extends InjectedBucketItemExtension {}
  class MixinBucketItem extends InjectedBucketItemExtension {
  }


  interface MixinEntityType extends InjectedEntityTypeExtension {}
  class MixinEntityType extends InjectedEntityTypeExtension {
  }


  interface MixinFluid extends InjectedFluidExtension {}
  class MixinFluid extends InjectedFluidExtension {
  }


  interface MixinFoodPropertiesBuilder extends InjectedFoodPropertiesBuilderExtension {}
  class MixinFoodPropertiesBuilder extends InjectedFoodPropertiesBuilderExtension {
  }


  interface MixinItem extends InjectedItemExtension {}
  class MixinItem extends InjectedItemExtension {
  }


  interface MixinItemProperties extends InjectedItemPropertiesExtension, ItemPropertiesExtensionImpl {}
  class MixinItemProperties extends InjectedItemPropertiesExtension {
    arch$getTab(): CreativeModeTab;
    arch$getTabSupplier(): DeferredSupplier<CreativeModeTab>;
    arch$tab(tab: CreativeModeTab): Properties;
    arch$tab(tab: DeferredSupplier<CreativeModeTab>): Properties;
    arch$tab(tab: ResourceKey<CreativeModeTab>): Properties;
  }


  interface MixinLiquidBlock extends InjectedLiquidBlockExtension {}
  class MixinLiquidBlock extends InjectedLiquidBlockExtension {
  }

}

declare module 'dev.architectury.mixin' {
  import { Entity, EntityType } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { List } from 'java.util';

  interface MixinLightningBolt extends Entity {}
  class MixinLightningBolt extends Entity {
    constructor(type: EntityType<any>, level: Level);
    handleLightning(ci: CallbackInfo, list: Entity[]): void;
  }

}

declare module 'dev.architectury.neoforge' {
  class ArchitecturyNeoForge {
    constructor();
  }

}

declare module 'dev.architectury.networking' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Class, Iterable } from 'java.lang';
  import { BiConsumer, Function, Supplier } from 'java.util.function';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { PacketContext, Side } from 'NetworkManager';
  import { Packet } from 'net.minecraft.network.protocol';
  import { RegistryAccess } from 'net.minecraft.core';
  import { ServerPlayer, ServerEntity } from 'net.minecraft.server.level';
  import { ClientGamePacketListener } from 'net.minecraft.network.protocol.game';
  import { Entity } from 'net.minecraft.world.entity';

  class NetworkChannel {
    canPlayerReceive<T>(player: ServerPlayer, type: Class<T>): boolean;
    canServerReceive<T>(type: Class<T>): boolean;
    static create(id: ResourceLocation): NetworkChannel;
    static hashCodeString(str: string): number;
    register<T>(type: Class<T>, encoder: BiConsumer<T, FriendlyByteBuf>, decoder: Function<FriendlyByteBuf, T>, messageConsumer: BiConsumer<T, Supplier<PacketContext>>): void;
    sendToPlayer<T>(player: ServerPlayer, message: T): void;
    sendToPlayers<T>(players: Iterable<ServerPlayer>, message: T): void;
    sendToServer<T>(message: T): void;
    toPacket<T>(side: Side, message: T, access: RegistryAccess): Packet<any>;
  }


  class SpawnEntityPacket {
    static create(entity: Entity, serverEntity: ServerEntity): Packet<ClientGamePacketListener>;
    static register(): void;
  }

}

declare module 'dev.architectury.networking.simple' {
  import { ServerPlayer, ServerLevel } from 'net.minecraft.server.level';
  import { Iterable } from 'java.lang';
  import { MinecraftServer } from 'net.minecraft.server';
  import { LevelChunk } from 'net.minecraft.world.level.chunk';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { PacketContext, NetworkReceiver, Side } from 'NetworkManager';
  import { Packet } from 'net.minecraft.network.protocol';
  import { RegistryAccess } from 'net.minecraft.core';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List } from 'java.util';
  import { PacketTransformer } from 'dev.architectury.networking.transformers';

  interface BaseC2SMessage extends Message {}
  class BaseC2SMessage extends Message {
    sendToServer(): void;
  }


  interface BaseS2CMessage extends Message {}
  class BaseS2CMessage extends Message {
    sendTo(player: ServerPlayer): void;
    sendTo(players: Iterable<ServerPlayer>): void;
    sendToAll(server: MinecraftServer): void;
    sendToChunkListeners(chunk: LevelChunk): void;
    sendToLevel(level: ServerLevel): void;
  }


  class Message {
    get type(): MessageType;
    handle(var1: PacketContext): void;
    toPacket(access: RegistryAccess): Packet<any>;
    write(var1: RegistryFriendlyByteBuf): void;
  }


  class MessageDecoder<T extends Message = any> {
    createReceiver(): NetworkReceiver<RegistryFriendlyByteBuf>;
    decode(var1: RegistryFriendlyByteBuf): T;
  }


  class MessageType {
    equals(o: any): boolean;
    get id(): ResourceLocation;
    get manager(): SimpleNetworkManager;
    get side(): Side;
    hashCode(): number;
    toString(): string;
  }


  class SimpleNetworkManager {
    readonly namespace: string;
    static create(namespace: string): SimpleNetworkManager;
    registerC2S(id: string, decoder: MessageDecoder<BaseC2SMessage>): MessageType;
    registerC2S(id: string, decoder: MessageDecoder<BaseC2SMessage>, transformers: PacketTransformer[]): MessageType;
    registerS2C(id: string, decoder: MessageDecoder<BaseS2CMessage>): MessageType;
    registerS2C(id: string, decoder: MessageDecoder<BaseS2CMessage>, transformers: PacketTransformer[]): MessageType;
  }

}

declare module 'dev.architectury.networking.SpawnEntityPacket' {
  class Client {
    static register(): void;
  }

}

declare module 'dev.architectury.networking.transformers' {
  import { Consumer } from 'java.util.function';
  import { Packet } from 'net.minecraft.network.protocol';
  import { List } from 'java.util';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Iterable } from 'java.lang';
  import { Side, PacketContext } from 'NetworkManager';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { TransformationSink } from 'dev.architectury.networking.transformers.PacketTransformer';

  interface PacketCollector extends PacketSink {}
  class PacketCollector extends PacketSink {
    constructor(consumer: Consumer<Packet<any>>);
    accept(packet: Packet<any>): void;
    collect(): Packet<any>[];
  }


  class PacketSink {
    accept(var1: Packet<any>): void;
    static client(): PacketSink;
    static ofPlayer(player: ServerPlayer): PacketSink;
    static ofPlayers(players: Iterable<ServerPlayer>): PacketSink;
  }


  class PacketTransformer {
    static concat(transformers: Iterable<PacketTransformer>): PacketTransformer;
    inbound(var1: Side, var2: ResourceLocation, var3: RegistryFriendlyByteBuf, var4: PacketContext, var5: TransformationSink): void;
    static none(): PacketTransformer;
    outbound(var1: Side, var2: ResourceLocation, var3: RegistryFriendlyByteBuf, var4: TransformationSink): void;
  }


  interface SinglePacketCollector extends PacketSink {}
  class SinglePacketCollector extends PacketSink {
    constructor(consumer: Consumer<Packet<any>>);
    accept(packet: Packet<any>): void;
    get packet(): Packet<any>;
  }


  interface SplitPacketTransformer extends PacketTransformer {}
  class SplitPacketTransformer extends PacketTransformer {
    constructor();
    inbound(side: Side, id: ResourceLocation, buf: RegistryFriendlyByteBuf, context: PacketContext, sink: TransformationSink): void;
    outbound(side: Side, id: ResourceLocation, buf: RegistryFriendlyByteBuf, sink: TransformationSink): void;
  }

}

declare module 'dev.architectury.networking.transformers.PacketTransformer' {
  import { Side } from 'NetworkManager';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class TransformationSink {
    accept(var1: Side, var2: ResourceLocation, var3: RegistryFriendlyByteBuf): void;
  }

}

declare module 'dev.architectury.platform.hooks' {
  import { Consumer } from 'java.util.function';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { Optional } from 'java.util';

  class EventBusesHooks {
    static getModEventBus(modId: string): Optional<IEventBus>;
    static whenAvailable(modId: string, busConsumer: Consumer<IEventBus>): void;
  }

}

declare module 'dev.architectury.platform' {
  import { Optional, List, Collection } from 'java.util';
  import { Path } from 'java.nio.file';
  import { ConfigurationScreenProvider } from 'dev.architectury.platform.Mod';
  import { Env } from 'dev.architectury.utils';
  import { Dist } from 'net.neoforged.api.distmarker';

  class Mod {
    findResource(...var1: string[]): Optional<Path>;
    get authors(): Collection<string>;
    get description(): string;
    get filePath(): Path;
    get filePaths(): Path[];
    get homepage(): Optional<string>;
    get issueTracker(): Optional<string>;
    get license(): Collection<string>;
    get modId(): string;
    get name(): string;
    get sources(): Optional<string>;
    get version(): string;
    getLogoFile(var1: number): Optional<string>;
    registerConfigurationScreen(var1: ConfigurationScreenProvider): void;
  }


  class Platform {
    static get configFolder(): Path;
    static get env(): Dist;
    static get environment(): Env;
    static get gameFolder(): Path;
    static get minecraftVersion(): string;
    static get modIds(): Collection<string>;
    static get mods(): Collection<Mod>;
    static get modsFolder(): Path;
    static getMod(id: string): Mod;
    static getOptionalMod(id: string): Optional<Mod>;
    static isDevelopmentEnvironment(): boolean;
    static isFabric(): boolean;
    static isForge(): boolean;
    static isForgeLike(): boolean;
    static isMinecraftForge(): boolean;
    static isModLoaded(id: string): boolean;
    static isNeoForge(): boolean;
  }

}

declare module 'dev.architectury.platform.Mod' {
  import { Screen } from 'net.minecraft.client.gui.screens';

  class ConfigurationScreenProvider {
    provide(var1: Screen): Screen;
  }

}

declare module 'dev.architectury.plugin.forge' {
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { Set, List } from 'java.util';
  import { ClassNode } from 'org.objectweb.asm.tree';

  interface ArchitecturyMixinPlugin extends IMixinConfigPlugin {}
  class ArchitecturyMixinPlugin extends IMixinConfigPlugin {
    acceptTargets(myTargets: Set<string>, otherTargets: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    onLoad(mixinPackage: string): void;
    postApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    preApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    shouldApplyMixin(targetClassName: string, mixinClassName: string): boolean;
  }

}

declare module 'dev.architectury.registry.client.keymappings' {
  import { KeyMapping } from 'net.minecraft.client';

  class KeyMappingRegistry {
    static register(mapping: KeyMapping): void;
  }

}

declare module 'dev.architectury.registry.client.particle' {
  import { RegistrySupplier } from 'dev.architectury.registry.registries';
  import { ParticleType, ParticleOptions } from 'net.minecraft.core.particles';
  import { ParticleProvider } from 'net.minecraft.client.particle';
  import { DeferredParticleProvider } from 'dev.architectury.registry.client.particle.ParticleProviderRegistry';

  class ParticleProviderRegistry {
    static register<T extends ParticleOptions>(supplier: RegistrySupplier<ParticleType<T>>, provider: ParticleProvider<T>): void;
    static register<T extends ParticleOptions>(supplier: RegistrySupplier<ParticleType<T>>, provider: DeferredParticleProvider<T>): void;
    static register<T extends ParticleOptions>(type: ParticleType<T>, provider: ParticleProvider<T>): void;
    static register<T extends ParticleOptions>(type: ParticleType<T>, provider: DeferredParticleProvider<T>): void;
  }

}

declare module 'dev.architectury.registry.client.particle.ParticleProviderRegistry' {
  import { ParticleProvider, SpriteSet } from 'net.minecraft.client.particle';
  import { TextureAtlas, TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { List } from 'java.util';

  class DeferredParticleProvider<T extends ParticleOptions = any> {
    create(var1: ExtendedSpriteSet): ParticleProvider<T>;
  }


  interface ExtendedSpriteSet extends SpriteSet {}
  class ExtendedSpriteSet extends SpriteSet {
    get atlas(): TextureAtlas;
    get sprites(): TextureAtlasSprite[];
  }

}

declare module 'dev.architectury.registry' {
  import { Output, TabVisibility } from 'CreativeModeTab';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ItemLike } from 'net.minecraft.world.level';
  import { Collection } from 'java.util';

  interface CreativeTabOutput extends Output {}
  class CreativeTabOutput extends Output {
    accept(stack: ItemStack, visibility: TabVisibility): void;
    acceptAfter(var1: ItemStack, var2: ItemStack, var3: TabVisibility): void;
    acceptAfter(after: ItemStack, stack: ItemStack): void;
    acceptAfter(after: ItemStack, item: ItemLike, visibility: TabVisibility): void;
    acceptAfter(after: ItemStack, item: ItemLike): void;
    acceptAfter(after: ItemLike, stack: ItemStack): void;
    acceptAfter(after: ItemLike, item: ItemLike, visibility: TabVisibility): void;
    acceptAfter(after: ItemLike, item: ItemLike): void;
    acceptAllAfter(after: ItemStack, stacks: Collection<ItemStack>, visibility: TabVisibility): void;
    acceptAllAfter(after: ItemStack, stacks: Collection<ItemStack>): void;
    acceptAllAfter(after: ItemLike, stacks: Collection<ItemStack>, visibility: TabVisibility): void;
    acceptAllAfter(after: ItemLike, stacks: Collection<ItemStack>): void;
    acceptAllBefore(before: ItemStack, stacks: Collection<ItemStack>, visibility: TabVisibility): void;
    acceptAllBefore(before: ItemStack, stacks: Collection<ItemStack>): void;
    acceptAllBefore(before: ItemLike, stacks: Collection<ItemStack>, visibility: TabVisibility): void;
    acceptAllBefore(before: ItemLike, stacks: Collection<ItemStack>): void;
    acceptBefore(var1: ItemStack, var2: ItemStack, var3: TabVisibility): void;
    acceptBefore(before: ItemStack, stack: ItemStack): void;
    acceptBefore(before: ItemStack, item: ItemLike, visibility: TabVisibility): void;
    acceptBefore(before: ItemStack, item: ItemLike): void;
    acceptBefore(before: ItemLike, stack: ItemStack): void;
    acceptBefore(before: ItemLike, item: ItemLike, visibility: TabVisibility): void;
    acceptBefore(before: ItemLike, item: ItemLike): void;
  }

}

declare module 'dev.architectury.registry.level.biome.forge.BiomeModificationsImpl' {
  import { Mutable } from 'dev.architectury.hooks.level.biome.EffectsProperties';
  import { Builder, GrassColorModifier } from 'BiomeSpecialEffects';
  import { OptionalInt, Optional } from 'java.util';
  import { AmbientParticleSettings, AmbientMoodSettings, AmbientAdditionsSettings } from 'net.minecraft.world.level.biome';
  import { Holder } from 'net.minecraft.core';
  import { SoundEvent, Music } from 'net.minecraft.sounds';
  import { Integer } from 'java.lang';
  import { Mutable as dev_architectury_hooks_level_biome_climateproperties_Mutable } from 'dev.architectury.hooks.level.biome.ClimateProperties';
  import { ClimateSettingsBuilder } from 'net.neoforged.neoforge.common.world';
  import { TemperatureModifier } from 'Biome';
  import { Mutable as dev_architectury_hooks_level_biome_biomeproperties_Mutable } from 'dev.architectury.hooks.level.biome.BiomeProperties';
  import { Builder as modifiablebiomeinfo_biomeinfo_Builder } from 'ModifiableBiomeInfo.BiomeInfo';
  import { Mutable as dev_architectury_hooks_level_biome_generationproperties_Mutable } from 'dev.architectury.hooks.level.biome.GenerationProperties';
  import { Mutable as dev_architectury_hooks_level_biome_spawnproperties_Mutable } from 'dev.architectury.hooks.level.biome.SpawnProperties';
  import { BiomeProperties, ClimateProperties, EffectsProperties, GenerationProperties, SpawnProperties } from 'dev.architectury.hooks.level.biome';

  interface MutableEffectsPropertiesWrapped extends Mutable {}
  class MutableEffectsPropertiesWrapped extends Mutable {
    builder: Builder;
    constructor(builder: Builder);
    get ambientAdditionsSound(): Optional<AmbientAdditionsSettings>;
    get ambientLoopSound(): Optional<Holder<SoundEvent>>;
    get ambientMoodSound(): Optional<AmbientMoodSettings>;
    get ambientParticle(): Optional<AmbientParticleSettings>;
    get backgroundMusic(): Optional<Music>;
    get fogColor(): number;
    get foliageColorOverride(): OptionalInt;
    get grassColorModifier(): GrassColorModifier;
    get grassColorOverride(): OptionalInt;
    get skyColor(): number;
    get waterColor(): number;
    get waterFogColor(): number;
    set ambientAdditionsSound(settings: AmbientAdditionsSettings);
    set ambientLoopSound(sound: Holder<SoundEvent>);
    set ambientMoodSound(settings: AmbientMoodSettings);
    set ambientParticle(settings: AmbientParticleSettings);
    set backgroundMusic(music: Music);
    set fogColor(color: number);
    set foliageColorOverride(colorOverride: number);
    set grassColorModifier(modifier: GrassColorModifier);
    set grassColorOverride(colorOverride: number);
    set skyColor(color: number);
    set waterColor(color: number);
    set waterFogColor(color: number);
  }


  interface MutableClimatePropertiesWrapped extends dev_architectury_hooks_level_biome_climateproperties_Mutable {}
  class MutableClimatePropertiesWrapped extends dev_architectury_hooks_level_biome_climateproperties_Mutable {
    builder: ClimateSettingsBuilder;
    constructor(builder: ClimateSettingsBuilder);
    get downfall(): number;
    get temperature(): number;
    get temperatureModifier(): TemperatureModifier;
    hasPrecipitation(): boolean;
    set downfall(downfall: number);
    set temperature(temperature: number);
    set temperatureModifier(temperatureModifier: TemperatureModifier);
    setHasPrecipitation(hasPrecipitation: boolean): dev_architectury_hooks_level_biome_climateproperties_Mutable;
  }


  interface MutableBiomeWrapped extends dev_architectury_hooks_level_biome_biomeproperties_Mutable, BiomeWrapped {}
  class MutableBiomeWrapped extends dev_architectury_hooks_level_biome_biomeproperties_Mutable {
    constructor(event: modifiablebiomeinfo_biomeinfo_Builder);
    get climateProperties(): dev_architectury_hooks_level_biome_climateproperties_Mutable;
    get effectsProperties(): Mutable;
    get generationProperties(): dev_architectury_hooks_level_biome_generationproperties_Mutable;
    get spawnProperties(): dev_architectury_hooks_level_biome_spawnproperties_Mutable;
  }


  interface BiomeWrapped extends BiomeProperties {}
  class BiomeWrapped extends BiomeProperties {
    constructor(event: modifiablebiomeinfo_biomeinfo_Builder);

    constructor(event: modifiablebiomeinfo_biomeinfo_Builder, climateProperties: ClimateProperties, effectsProperties: EffectsProperties, generationProperties: GenerationProperties, spawnProperties: SpawnProperties);
    get climateProperties(): ClimateProperties;
    get effectsProperties(): EffectsProperties;
    get generationProperties(): GenerationProperties;
    get spawnProperties(): SpawnProperties;
  }

}

declare module 'dev.architectury.registry.menu' {
  import { MenuProvider } from 'net.minecraft.world';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  interface ExtendedMenuProvider extends MenuProvider {}
  class ExtendedMenuProvider extends MenuProvider {
    saveExtraData(var1: FriendlyByteBuf): void;
  }

}

declare module 'dev.architectury.registry.registries' {
  import { Iterable } from 'java.lang';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { Registry, Holder } from 'net.minecraft.core';
  import { Supplier, Consumer } from 'java.util.function';
  import { Iterator, Optional, Set } from 'java.util';
  import { OptionalSupplier } from 'dev.architectury.utils';
  import { Entry } from 'Map';
  import { RegistrarOption } from 'dev.architectury.registry.registries.options';

  interface DeferredRegister<T = any> extends Iterable<RegistrySupplier> {}
  class DeferredRegister<T = any> extends Iterable<RegistrySupplier> {
    static create<T>(modId: string, key: ResourceKey<Registry<T>>): DeferredRegister<T>;
    get registrar(): Registrar<T>;
    get registrarManager(): RegistrarManager;
    iterator(): Iterator<RegistrySupplier<T>>;
    register<R extends T>(id: string, supplier: Supplier<R>): RegistrySupplier<R>;
    register<R extends T>(id: ResourceLocation, supplier: Supplier<R>): RegistrySupplier<R>;
    register(): void;
  }


  interface DeferredSupplier<T = any> extends OptionalSupplier<T> {}
  class DeferredSupplier<T = any> extends OptionalSupplier<T> {
    get id(): ResourceLocation;
    get key(): ResourceKey<T>;
    get registryId(): ResourceLocation;
    get registryKey(): ResourceKey<Registry<T>>;
  }


  interface Registrar<T = any> extends Iterable<T> {}
  class Registrar<T = any> extends Iterable<T> {
    byRawId(var1: number): T;
    contains(var1: ResourceLocation): boolean;
    containsValue(var1: T): boolean;
    delegate(var1: ResourceLocation): RegistrySupplier<T>;
    entrySet(): Set<Entry<ResourceKey<T>, T>>;
    get(var1: ResourceLocation): T;
    get ids(): Set<ResourceLocation>;
    getHolder(var1: ResourceKey<T>): Holder<T>;
    getHolder(id: ResourceLocation): Holder<T>;
    getId(var1: T): ResourceLocation;
    getKey(var1: T): Optional<ResourceKey<T>>;
    getRawId(var1: T): number;
    key(): ResourceKey<Registry<T>>;
    listen<R extends T>(supplier: RegistrySupplier<R>, callback: Consumer<R>, obj: T): void;
    listen(var1: ResourceLocation, var2: Consumer<T>): void;
    register<E extends T>(var1: ResourceLocation, var2: Supplier<E>): RegistrySupplier<E>;
    wrap<R extends T>(obj: R): RegistrySupplier<R>;
  }


  class RegistrarBuilder<T = any> {
    build(): Registrar<T>;
    option(var1: RegistrarOption): RegistrarBuilder<T>;
    syncToClients(): RegistrarBuilder<T>;
  }


  class RegistrarManager {
    builder<T>(registryId: ResourceLocation, ...typeGetter: T[]): RegistrarBuilder<T>;
    forRegistry<T>(key: ResourceKey<Registry<T>>, callback: Consumer<Registrar<T>>): void;
    static get(modId: string): RegistrarManager;
    get<T>(key: ResourceKey<Registry<T>>): Registrar<T>;
    get<T>(registry: Registry<T>): Registrar<T>;
    get modId(): string;
    static getId<T>(object: T, fallback: ResourceKey<Registry<T>>): ResourceLocation;
    static getId<T>(object: T, fallback: Registry<T>): ResourceLocation;
  }


  interface RegistrySupplier<T = any> extends DeferredSupplier<T>, Holder<T> {}
  class RegistrySupplier<T = any> extends DeferredSupplier<T> {
    get registrar(): Registrar<T>;
    get registrarManager(): RegistrarManager;
    listen(callback: Consumer<T>): void;
  }

}

declare module 'dev.architectury.registry.registries.forge.RegistrarManagerImpl.RegistryProviderImpl' {
  import { RegisterEvent, NewRegistryEvent } from 'net.neoforged.neoforge.registries';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Registry } from 'net.minecraft.core';
  import { Data } from 'dev.architectury.registry.registries.forge.RegistrarManagerImpl';

  class EventListener {
    handleEvent(event: RegisterEvent): void;
    handleEvent(event: NewRegistryEvent): void;
    handleEventPost(event: RegisterEvent): void;
    registerFor<T>(event: RegisterEvent, resourceKey: ResourceKey<Registry<T>>, data: Data<T>): void;
  }

}

declare module 'dev.architectury.registry.registries.forge.RegistrarManagerImpl' {
  import { RegistrarBuilder, Registrar } from 'dev.architectury.registry.registries';
  import { RegistryBuilder } from 'net.neoforged.neoforge.registries';
  import { RegistrarOption } from 'dev.architectury.registry.registries.options';
  import { Registry } from 'net.minecraft.core';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Mutable } from 'org.apache.commons.lang3.mutable';
  import { Supplier } from 'java.util.function';

  interface RegistryBuilderWrapper<T = any> extends RegistrarBuilder<T> {}
  class RegistryBuilderWrapper<T = any> extends RegistrarBuilder<T> {
    constructor(provider: RegistryProviderImpl, builder: RegistryBuilder<T>);
    build(): Registrar<T>;
    option(option: RegistrarOption): RegistrarBuilder<T>;
  }


  class Data<T = any> {
    register(registry: Registry<T>, location: ResourceLocation, object: Mutable<T>, reference: Supplier<T>): void;
  }

}

declare module 'dev.architectury.registry.registries.options' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class RegistrarOption {
  }


  interface StandardRegistrarOption extends Enum<StandardRegistrarOption> {}
  class StandardRegistrarOption extends Enum<StandardRegistrarOption> {
    static readonly SYNC_TO_CLIENTS: StandardRegistrarOption;
    static valueOf(name: string): StandardRegistrarOption;
    static values(): StandardRegistrarOption[];
  }

}

declare module 'dev.architectury.registry.registries.RegistrarManager' {
  import { Registrar, RegistrarBuilder } from 'dev.architectury.registry.registries';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { Registry } from 'net.minecraft.core';
  import { Consumer } from 'java.util.function';
  import { Class } from 'java.lang';

  class RegistryProvider {
    builder<T>(var1: Class<T>, var2: ResourceLocation): RegistrarBuilder<T>;
    forRegistry<T>(var1: ResourceKey<Registry<T>>, var2: Consumer<Registrar<T>>): void;
    get<T>(var1: ResourceKey<Registry<T>>): Registrar<T>;
    get<T>(var1: Registry<T>): Registrar<T>;
  }

}

declare module 'dev.architectury.utils' {
  import { Enum, Runnable, Error, Throwable } from 'java.lang';
  import { Dist } from 'net.neoforged.api.distmarker';
  import { List, Optional } from 'java.util';
  import { Supplier, Consumer } from 'java.util.function';
  import { Minecraft } from 'net.minecraft.client';
  import { MinecraftServer } from 'net.minecraft.server';
  import { Stream } from 'java.util.stream';

  class Amount {
    static toInt(amount: number): number;
  }


  class ArchitecturyConstants {
    static readonly MOD_ID: string;
  }


  interface Env extends Enum<Env> {}
  class Env extends Enum<Env> {
    static readonly CLIENT: Env;
    static readonly SERVER: Env;
    static fromPlatform(type: any): Env;
    toPlatform(): Dist;
    static valueOf(name: string): Env;
    static values(): Env[];
  }


  class EnvExecutor {
    static getEnvSpecific<T>(client: Supplier<Supplier<T>>, server: Supplier<Supplier<T>>): T;
    static getInEnv<T>(type: Dist, runnableSupplier: Supplier<Supplier<T>>): Optional<T>;
    static getInEnv<T>(type: Env, runnableSupplier: Supplier<Supplier<T>>): Optional<T>;
    static runInEnv(type: Dist, runnableSupplier: Supplier<Runnable>): void;
    static runInEnv(type: Env, runnableSupplier: Supplier<Runnable>): void;
  }


  class GameInstance {
    static get client(): Minecraft;
    static get server(): MinecraftServer;
  }


  interface OptionalSupplier<T = any> extends Supplier<T> {}
  class OptionalSupplier<T = any> extends Supplier<T> {
    get orNull(): T;
    ifPresent(action: Consumer<T>): void;
    ifPresentOrElse(action: Consumer<T>, emptyAction: Runnable): void;
    isPresent(): boolean;
    orElse(other: T): T;
    orElseGet(supplier: Supplier<T>): T;
    stream(): Stream<T>;
    toOptional(): Optional<T>;
  }


  interface PlatformExpectedError extends Error {}
  class PlatformExpectedError extends Error {
    constructor();

    constructor(message: string);

    constructor(message: string, cause: Throwable);

    constructor(cause: Throwable);

    constructor(message: string, cause: Throwable, enableSuppression: boolean, writableStackTrace: boolean);
  }

}

declare module 'dev.architectury.utils.value' {
  import { Boolean, Double, Float, Integer, Long } from 'java.lang';
  import { BooleanSupplier, DoubleSupplier, IntSupplier, LongSupplier, Supplier, Consumer } from 'java.util.function';
  import { BooleanConsumer } from 'it.unimi.dsi.fastutil.booleans';
  import { DoubleConsumer } from 'it.unimi.dsi.fastutil.doubles';
  import { FloatConsumer } from 'it.unimi.dsi.fastutil.floats';
  import { IntConsumer } from 'it.unimi.dsi.fastutil.ints';
  import { LongConsumer } from 'it.unimi.dsi.fastutil.longs';

  interface BooleanValue extends Value<boolean>, BooleanSupplier, BooleanConsumer {}
  class BooleanValue extends Value<boolean> {
    get (): boolean;
  }


  interface DoubleValue extends Value<number>, DoubleSupplier, DoubleConsumer {}
  class DoubleValue extends Value<number> {
    get (): number;
  }


  class FloatSupplier {
    get asFloat(): number;
  }


  interface FloatValue extends Value<number>, FloatSupplier, FloatConsumer {}
  class FloatValue extends Value<number> {
    get (): number;
  }


  interface IntValue extends Value<number>, IntSupplier, IntConsumer {}
  class IntValue extends Value<number> {
    get (): number;
  }


  interface LongValue extends Value<Long>, LongSupplier, LongConsumer {}
  class LongValue extends Value<Long> {
    get (): Long;
  }


  interface Value<T = any> extends Supplier<T>, Consumer<T> {}
  class Value<T = any> extends Supplier<T> {
  }

}