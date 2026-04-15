declare module 'com.anthonyhilyard.iceberg.client' {
  import { GatherResult } from 'com.anthonyhilyard.iceberg.events.client.RenderTooltipEvents';
  import { ItemStack } from 'net.minecraft.world.item';
  import { List } from 'java.util';
  import { Either } from 'com.mojang.datafixers.util';
  import { FormattedText } from 'net.minecraft.network.chat';
  import { TooltipComponent } from 'net.minecraft.world.inventory.tooltip';

  class IcebergClient {
    static init(): void;
    static onGatherComponentsEventEnd(itemStack: ItemStack, screenWidth: number, screenHeight: number, tooltipElements: Either<FormattedText, TooltipComponent>[], maxWidth: number, index: number): GatherResult;
  }

}

declare module 'com.anthonyhilyard.iceberg.compat' {
  import { ItemStack } from 'net.minecraft.world.item';
  import { List } from 'java.util';
  import { ClientTooltipComponent } from 'net.minecraft.client.gui.screens.inventory.tooltip';

  class EMIHandler {
    static getTooltipStack(components: ClientTooltipComponent[]): ItemStack;
  }

}

declare module 'com.anthonyhilyard.iceberg.component' {
  import { TextAlignment } from 'com.anthonyhilyard.iceberg.component.IExtendedText';
  import { TooltipComponent } from 'net.minecraft.world.inventory.tooltip';
  import { ClientTooltipComponent } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { Font } from 'net.minecraft.client.gui';

  class IExtendedText {
    get alignment(): TextAlignment;
    get bottomPadding(): number;
    get leftPadding(): number;
    get rightPadding(): number;
    get topPadding(): number;
    set alignment(var1: TextAlignment);
    setPadding(padding: number): void;
    setPadding(left: number, right: number): void;
    setPadding(var1: number, var2: number, var3: number, var4: number): void;
  }


  interface TitleBreakComponent extends TooltipComponent, ClientTooltipComponent {}
  class TitleBreakComponent extends TooltipComponent {
    get height(): number;
    getWidth(font: Font): number;
    static registerFactory(): void;
  }

}

declare module 'com.anthonyhilyard.iceberg.component.IExtendedText' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class ExtendedTextDataStore {
    static get(key: any): TextAlignment;
    static getLeftPadding(key: any): number;
    static getRightPadding(key: any): number;
    static setAlignment(key: any, alignment: TextAlignment): void;
    static setPadding(key: any, left: number, right: number): void;
  }


  interface TextAlignment extends Enum<TextAlignment> {}
  class TextAlignment extends Enum<TextAlignment> {
    static readonly LEFT: TextAlignment;
    static readonly CENTER: TextAlignment;
    static readonly RIGHT: TextAlignment;
    static valueOf(name: string): TextAlignment;
    static values(): TextAlignment[];
  }

}

declare module 'com.anthonyhilyard.iceberg.config' {
  import { Class } from 'java.lang';

  class IcebergConfig<T extends IcebergConfig<any> = any> {
    isLoaded(): boolean;
    static register(subClass: Class<IcebergConfig<any>>, modId: string): boolean;
  }


  class IIcebergConfigSpec {
    isLoaded(): boolean;
  }

}

declare module 'com.anthonyhilyard.iceberg.events.client' {
  import { Event, TypeTrackedEvent } from 'com.anthonyhilyard.iceberg.events';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { TooltipContext } from 'Item';
  import { List, UUID } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { ClientTooltipComponent } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { TooltipComponent } from 'net.minecraft.world.inventory.tooltip';

  class ItemTooltipEvent {
    static readonly EVENT: Event;
    onItemTooltip(var1: ItemStack, var2: TooltipContext, var3: TooltipFlag, var4: Component[]): void;
  }


  class NewItemPickupEvent {
    static readonly EVENT: Event;
    onItemPickup(var1: UUID, var2: ItemStack): void;
  }


  class RegisterTooltipComponentFactoryEvent {
    static readonly EVENT: TypeTrackedEvent;
    getComponent(var1: TooltipComponent): ClientTooltipComponent;
  }


  class RenderTickEvents {
    static readonly START: Event;
  }


  class RenderTooltipEvents {
    static readonly GATHER: Event;
    static readonly PREEXT: Event;
    static readonly COLOREXT: Event;
    static readonly POSTEXT: Event;
  }

}

declare module 'com.anthonyhilyard.iceberg.events.client.RenderTickEvents' {
  import { DeltaTracker } from 'net.minecraft.client';

  class Start {
    onStart(var1: DeltaTracker): void;
  }

}

declare module 'com.anthonyhilyard.iceberg.events.client.RenderTooltipEvents' {
  import { ItemStack } from 'net.minecraft.world.item';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { ClientTooltipComponent, ClientTooltipPositioner } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { Either } from 'com.mojang.datafixers.util';
  import { FormattedText } from 'net.minecraft.network.chat';
  import { TooltipComponent } from 'net.minecraft.world.inventory.tooltip';

  class PostExt {
    onPost(var1: ItemStack, var2: GuiGraphics, var3: number, var4: number, var5: Font, var6: number, var7: number, var8: ClientTooltipComponent[], var9: boolean, var10: number): void;
  }


  class ColorExt {
    onColor(var1: ItemStack, var2: GuiGraphics, var3: number, var4: number, var5: Font, var6: number, var7: number, var8: number, var9: number, var10: ClientTooltipComponent[], var11: boolean, var12: number): ColorExtResult;
  }


  class PreExt {
    onPre(var1: ItemStack, var2: GuiGraphics, var3: number, var4: number, var5: number, var6: number, var7: Font, var8: ClientTooltipComponent[], var9: ClientTooltipPositioner, var10: boolean, var11: number): PreExtResult;
  }


  class Gather {
    onGather(var1: ItemStack, var2: number, var3: number, var4: Either<FormattedText, TooltipComponent>[], var5: number, var6: number): GatherResult;
  }

}

declare module 'com.anthonyhilyard.iceberg.events.common' {
  import { Event, ToggleableEvent } from 'com.anthonyhilyard.iceberg.events';
  import { Player } from 'net.minecraft.world.entity.player';
  import { AdvancementHolder } from 'net.minecraft.advancements';

  class ConfigEvents {
    static readonly REGISTER: Event;
    static readonly LOAD: Event;
    static readonly RELOAD: Event;
  }


  class CriterionEvent {
    static readonly EVENT: ToggleableEvent;
    awardCriterion(var1: Player, var2: AdvancementHolder, var3: string): void;
  }


  class LevelEvents {
    static readonly LOAD: Event;
    static readonly UNLOAD: Event;
  }

}

declare module 'com.anthonyhilyard.iceberg.events.common.ConfigEvents' {
  import { Class } from 'java.lang';
  import { IcebergConfig, IIcebergConfigSpec } from 'com.anthonyhilyard.iceberg.config';

  class Reload {
    onReload(var1: string): void;
  }


  class Load {
    onLoad(var1: string): void;
  }


  class Register {
    onRegister(var1: Class<IcebergConfig<any>>, var2: IIcebergConfigSpec, var3: string): void;
  }

}

declare module 'com.anthonyhilyard.iceberg.events.common.LevelEvents' {
  import { LevelAccessor } from 'net.minecraft.world.level';

  class Unload {
    onUnload(var1: LevelAccessor): void;
  }


  class Load {
    onLoad(var1: LevelAccessor): void;
  }

}

declare module 'com.anthonyhilyard.iceberg.events' {
  import { Class } from 'java.lang';
  import { Function } from 'java.util.function';
  import { Map } from 'java.util';

  class Event<T = any> {
    constructor(type: Class<T>, invokerFactory: Function<T[], T>);
    invoker(): T;
    listenerCount(): number;
    register(listener: T): void;
  }


  class EventFactory {
    static create<T>(type: Class<T>, invokerFactory: Function<T[], T>): Event<T>;
    static createTypeTracked<S, T>(type: Class<T>, invokerFactory: Function<T[], T>): TypeTrackedEvent<S, T>;
    static invalidate(): void;
  }


  class ToggleableEvent<T = any> {
    static create<T>(type: Class<T>, invokerFactory: Function<T[], T>): ToggleableEvent<T>;
    disable(): boolean;
    enable(): boolean;
    invoker(): T;
    register(listener: T): void;
  }


  interface TypeTrackedEvent<S = any, T = any> extends Event<T> {}
  class TypeTrackedEvent<S = any, T = any> extends Event<T> {
    constructor(type: Class<T>, invokerFactory: Function<T[], T>);
    get listenerTypes(): Map<Class<S>, T>;
    register(listener: T): void;
    register(type: Class<S>, listener: T): void;
  }

}

declare module 'com.anthonyhilyard.iceberg.events.server' {
  import { ToggleableEvent } from 'com.anthonyhilyard.iceberg.events';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { MinecraftServer } from 'net.minecraft.server';

  class PlayerLoginEvent {
    static readonly EVENT: ToggleableEvent;
    playerLogin(var1: ServerPlayer, var2: MinecraftServer): void;
  }

}

declare module 'com.anthonyhilyard.iceberg' {
  import { Logger } from 'org.apache.logging.log4j';

  class Iceberg {
    static readonly MODID: string;
    static readonly LOGGER: Logger;
  }

}

declare module 'com.anthonyhilyard.iceberg.mixin.azurelib' {
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  class AzArmorModelMixin<E extends LivingEntity = any> {
  }


  class GeoArmorRendererMixin<T extends Item = any> {
  }


  class HumanoidArmorLayerMixin<T extends LivingEntity = any, A extends HumanoidModel<T> = any> {
    icebergStoreBufferSource(poseStack: PoseStack, bufferSource: MultiBufferSource, i: number, livingEntity: T, f: number, g: number, h: number, j: number, k: number, l: number, callback: CallbackInfo): void;
  }


  class ItemArmorGeoLayerMixin {
  }

}

declare module 'com.anthonyhilyard.iceberg.mixin.azurelibarmor' {
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  class AzArmorModelMixin<E extends LivingEntity = any> {
  }


  class GeoArmorRendererMixin<T extends Item = any> {
  }


  class HumanoidArmorLayerMixin<T extends LivingEntity = any, A extends HumanoidModel<T> = any> {
    icebergStoreBufferSource(poseStack: PoseStack, bufferSource: MultiBufferSource, i: number, livingEntity: T, f: number, g: number, h: number, j: number, k: number, l: number, callback: CallbackInfo): void;
  }


  class ItemArmorGeoLayerMixin {
  }

}

declare module 'com.anthonyhilyard.iceberg.mixin' {
  import { IExtendedText } from 'com.anthonyhilyard.iceberg.component';
  import { TextAlignment } from 'com.anthonyhilyard.iceberg.component.IExtendedText';
  import { Font } from 'net.minecraft.client.gui';
  import { List, Set } from 'java.util';
  import { ClientTooltipComponent, ClientTooltipPositioner } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { ITooltipAccess } from 'com.anthonyhilyard.iceberg.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { CallbackInfo, CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { ClassNode } from 'org.objectweb.asm.tree';
  import { AdvancementHolder } from 'net.minecraft.advancements';
  import { Boolean } from 'java.lang';

  class ClientPacketListenerMixin {
  }


  interface ClientTextTooltipMixin extends IExtendedText {}
  class ClientTextTooltipMixin extends IExtendedText {
    get alignment(): TextAlignment;
    get bottomPadding(): number;
    get leftPadding(): number;
    get rightPadding(): number;
    get topPadding(): number;
    set alignment(alignment: TextAlignment);
    setPadding(left: number, right: number, top: number, bottom: number): void;
    setPadding(padding: number): void;
    setPadding(left: number, right: number): void;
  }


  class GuiGraphicsInvoker {
    invokeRenderTooltipInternal(var1: Font, var2: ClientTooltipComponent[], var3: number, var4: number, var5: ClientTooltipPositioner): void;
  }


  interface GuiGraphicsMixin extends ITooltipAccess {}
  class GuiGraphicsMixin extends ITooltipAccess {
    get icebergTooltipStack(): ItemStack;
    set icebergTooltipStack(stack: ItemStack);
  }


  class GuiMixin {
  }


  class ItemMixin {
  }


  class LivingEntityMixin {
  }


  class MinecraftMixin {
    runTick(tickWorld: boolean, callbackInfo: CallbackInfo): void;
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


  class PlayerAdvancementsMixin {
    onAward(advancementHolder: AdvancementHolder, criterionKey: string, callbackInfo: CallbackInfoReturnable<boolean>, success: boolean): void;
  }


  class ScreenMixin {
  }


  class TextColorMixin {
  }


  class TooltipRenderUtilMixin {
  }

}

declare module 'com.anthonyhilyard.iceberg.mixin.geckolib' {
  class GeoArmorRendererMixin<T extends Item = any> {
  }

}

declare module 'com.anthonyhilyard.iceberg.neoforge.client' {
  class IcebergNeoForgeClient {
  }

}

declare module 'com.anthonyhilyard.iceberg.neoforge.client.IcebergNeoForgeClient' {
  import { GatherResult } from 'com.anthonyhilyard.iceberg.events.client.RenderTooltipEvents';
  import { ItemStack } from 'net.minecraft.world.item';
  import { List } from 'java.util';
  import { Either } from 'com.mojang.datafixers.util';
  import { FormattedText } from 'net.minecraft.network.chat';
  import { TooltipComponent } from 'net.minecraft.world.inventory.tooltip';
  import { RegisterClientTooltipComponentFactoriesEvent } from 'net.neoforged.neoforge.client.event';
  import { Loading, Reloading } from 'ModConfigEvent';
  import { ItemTooltipEvent } from 'net.neoforged.neoforge.event.entity.player';
  import { Pre, Color, GatherComponents } from 'RenderTooltipEvent';

  class ModEvents {
    static configLoadEvent(event: Loading): void;
    static configReloadEvent(event: Reloading): void;
    static registerTooltipComponentsEvent(event: RegisterClientTooltipComponentFactoriesEvent): void;
    static tooltipGatherEvent(itemStack: ItemStack, screenWidth: number, screenHeight: number, tooltipElements: Either<FormattedText, TooltipComponent>[], maxWidth: number, index: number): GatherResult;
  }


  class NeoForgeEvents {
    static itemTooltipEvent(event: ItemTooltipEvent): void;
    static tooltipColorEvent(event: Color): void;
    static tooltipGatherEvent(event: GatherComponents): void;
    static tooltipPreRenderEvent(event: Pre): void;
  }

}

declare module 'com.anthonyhilyard.iceberg.neoforge.common' {
  import { Load, Unload } from 'LevelEvent';

  class IcebergNeoForgeCommon {
    static levelLoadEvent(event: Load): void;
    static levelUnloadEvent(event: Unload): void;
  }

}

declare module 'com.anthonyhilyard.iceberg.neoforge.config' {
  import { Supplier, Predicate } from 'java.util.function';
  import { IConfigSpec, ModConfig } from 'net.neoforged.fml.config';
  import { IIcebergConfigSpec } from 'com.anthonyhilyard.iceberg.config';
  import { List } from 'java.util';
  import { ILoadedConfig } from 'IConfigSpec';
  import { UnmodifiableConfig, UnmodifiableCommentedConfig, CommentedConfig } from 'com.electronwill.nightconfig.core';
  import { RestartType, ValueSpec } from 'ModConfigSpec';
  import { CorrectionListener } from 'ConfigSpec';
  import { Class } from 'java.lang';

  interface ConfigValueWrapper<T = any, S extends ConfigValue<T> = any> extends Supplier<T> {}
  class ConfigValueWrapper<T = any, S extends ConfigValue<T> = any> extends Supplier<T> {
    constructor(configValue: S);
    get (): T;
  }


  interface NeoForgeIcebergConfigSpec extends IConfigSpec, IIcebergConfigSpec {}
  class NeoForgeIcebergConfigSpec extends IConfigSpec {
    acceptConfig(config: ILoadedConfig): void;
    afterReload(): void;
    correct(config: CommentedConfig): void;
    correct(config: CommentedConfig, listener: CorrectionListener): number;
    correct(config: CommentedConfig, listener: CorrectionListener, commentListener: CorrectionListener): number;
    static createValueSpec(comment: string, langKey: string, worldRestart: boolean, clazz: Class<any>, defaultSupplier: Supplier<any>, validator: Predicate<any>, restartType: RestartType): ValueSpec;
    get spec(): UnmodifiableConfig;
    get values(): UnmodifiableConfig;
    getLevelComment(path: string[]): string;
    getLevelTranslationKey(path: string[]): string;
    isCorrect(config: UnmodifiableCommentedConfig): boolean;
    isEmpty(): boolean;
    isLoaded(): boolean;
    loadedConfig(): ILoadedConfig;
    resetCaches(restartType: RestartType): void;
    save(): void;
    validateSpec(config: ModConfig): void;
  }

}

declare module 'com.anthonyhilyard.iceberg.neoforge.config.NeoForgeIcebergConfigSpec' {
  import { AbstractCommentedConfig, ConfigFormat, UnmodifiableConfig, CommentedConfig } from 'com.electronwill.nightconfig.core';
  import { ValueSpec, Builder as modconfigspec_Builder } from 'ModConfigSpec';
  import { Predicate, Function, Supplier } from 'java.util.function';
  import { IIcebergConfigSpecBuilder } from 'com.anthonyhilyard.iceberg.services';
  import { List, Collection, Map } from 'java.util';
  import { Pair } from 'org.apache.commons.lang3.tuple';
  import { IIcebergConfigSpec } from 'com.anthonyhilyard.iceberg.config';
  import { Class, Comparable, Enum, Boolean, Double, Integer, Long } from 'java.lang';

  interface MutableSubconfig extends AbstractCommentedConfig {}
  class MutableSubconfig extends AbstractCommentedConfig {
    clone(): AbstractCommentedConfig;
    configFormat(): ConfigFormat<any>;
    static copy(config: UnmodifiableConfig, keyValidator: Predicate<any>, valueValidator: Predicate<any>): MutableSubconfig;
    createSubConfig(): CommentedConfig;
    defaultValueSpec(): ValueSpec;
    keyValidator(): Predicate<any>;
    valueValidator(): Predicate<any>;
  }


  interface Builder extends IIcebergConfigSpecBuilder, modconfigspec_Builder {}
  class Builder extends IIcebergConfigSpecBuilder {
    add<T>(path: string, defaultValue: T): Supplier<T>;
    add<T>(path: string, defaultValue: T, validator: Predicate<any>): Supplier<T>;
    add(path: string, defaultValue: boolean): Supplier<boolean>;
    addEnum<V extends Enum<V>>(path: string, defaultValue: V): Supplier<V>;
    addEnum<V extends Enum<V>>(path: string, defaultValue: V, validator: Predicate<any>): Supplier<V>;
    addInList<T>(path: string, defaultValue: T, acceptableValues: Collection<T>): Supplier<T>;
    addInRange<V extends Comparable<V>>(path: string, defaultValue: V, min: V, max: V, clazz: Class<V>): Supplier<V>;
    addInRange(path: string, defaultValue: number, min: number, max: number): Supplier<number>;
    addInRange(path: string, defaultValue: number, min: number, max: number): Supplier<number>;
    addInRange(path: string, defaultValue: number, min: number, max: number): Supplier<Long>;
    addList<T>(path: string, defaultValue: T[], elementValidator: Predicate<any>): Supplier<T[]>;
    addListAllowEmpty<T>(path: string, defaultValue: T[], elementValidator: Predicate<any>): Supplier<T[]>;
    addSubconfig(path: string, defaultValue: Map<string, any>, keyValidator: Predicate<any>, valueValidator: Predicate<any>): Supplier<Map<string, any>>;
    addSubconfig(path: string[], defaultValue: Map<string, any>, keyValidator: Predicate<any>, valueValidator: Predicate<any>): Supplier<Map<string, any>>;
    addSubconfig(path: string, defaultSupplier: Supplier<Map<string, any>>, keyValidator: Predicate<any>, valueValidator: Predicate<any>): Supplier<Map<string, any>>;
    addSubconfig(path: string[], defaultSupplier: Supplier<Map<string, any>>, keyValidator: Predicate<any>, valueValidator: Predicate<any>): Supplier<Map<string, any>>;
    comment(comment: string): Builder;
    comment(...comment: string[]): Builder;
    finish<T>(consumer: Function<IIcebergConfigSpecBuilder, T>): Pair<T, IIcebergConfigSpec>;
    pop(): Builder;
    pop(count: number): Builder;
    push(path: string): Builder;
    push(path: string[]): Builder;
    reset(): void;
    translation(translationKey: string): Builder;
    worldRestart(): Builder;
  }

}

declare module 'com.anthonyhilyard.iceberg.neoforge' {
  import { IEventBus } from 'net.neoforged.bus.api';

  class IcebergNeoForge {
    constructor(modBus: IEventBus);
  }

}

declare module 'com.anthonyhilyard.iceberg.neoforge.mixin' {
  class ClientHooksMixin {
  }


  class TooltipRenderUtilMixin {
  }

}

declare module 'com.anthonyhilyard.iceberg.neoforge.server' {
  import { PlayerLoggedInEvent } from 'PlayerEvent';

  class IcebergNeoForgeServer {
    static event(event: PlayerLoggedInEvent): void;
  }

}

declare module 'com.anthonyhilyard.iceberg.neoforge.services' {
  import { IBufferSourceFactory, IFontLookup, IKeyMappingRegistrar, IPlatformHelper, IReloadListenerRegistrar } from 'com.anthonyhilyard.iceberg.services';
  import { CheckedBufferSource, VertexCollector } from 'com.anthonyhilyard.iceberg.renderer';
  import { VertexConsumer, VertexFormat } from 'com.mojang.blaze3d.vertex';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { MemoryStack } from 'org.lwjgl.system';
  import { Font } from 'net.minecraft.client.gui';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { KeyMapping } from 'net.minecraft.client';
  import { KeyMappingContext } from 'com.anthonyhilyard.iceberg.services.IKeyMappingRegistrar';
  import { RegisterKeyMappingsEvent, RegisterClientReloadListenersEvent } from 'net.neoforged.neoforge.client.event';
  import { List } from 'java.util';
  import { PreparableReloadListener } from 'net.minecraft.server.packs.resources';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Supplier } from 'java.util.function';
  import { VertexBufferWriter } from 'net.caffeinemc.mods.sodium.api.vertex.buffer';

  interface NeoForgeBufferSourceFactory extends IBufferSourceFactory {}
  class NeoForgeBufferSourceFactory extends IBufferSourceFactory {
    addVertex(x: number, y: number, z: number): VertexConsumer;
    addVertex(x: number, y: number, z: number): VertexConsumer;
    createCheckedBufferSource(bufferSource: any): CheckedBufferSource;
    createVertexCollector(): VertexCollector;
    getBuffer(renderType: RenderType): VertexConsumer;
    getBuffer(renderType: RenderType): VertexConsumer;
    push(memoryStack: MemoryStack, pointer: number, count: number, format: VertexFormat): void;
    push(memoryStack: MemoryStack, pointer: number, count: number, format: VertexFormat): void;
    setColor(r: number, g: number, b: number, a: number): VertexConsumer;
    setColor(r: number, g: number, b: number, a: number): VertexConsumer;
    setNormal(x: number, y: number, z: number): VertexConsumer;
    setNormal(x: number, y: number, z: number): VertexConsumer;
    setUv(u: number, v: number): VertexConsumer;
    setUv(u: number, v: number): VertexConsumer;
    setUv1(u: number, v: number): VertexConsumer;
    setUv1(u: number, v: number): VertexConsumer;
    setUv2(u: number, v: number): VertexConsumer;
    setUv2(u: number, v: number): VertexConsumer;
  }


  interface NeoForgeFontLookup extends IFontLookup {}
  class NeoForgeFontLookup extends IFontLookup {
    getTooltipFont(itemStack: ItemStack, screen: Screen): Font;
  }


  interface NeoForgeKeyMappingRegistrar extends IKeyMappingRegistrar {}
  class NeoForgeKeyMappingRegistrar extends IKeyMappingRegistrar {
    static onRegisterKeyMappings(event: RegisterKeyMappingsEvent): void;
    registerMapping(mapping: KeyMapping): KeyMapping;
    registerMapping(mapping: KeyMapping, context: KeyMappingContext): KeyMapping;
  }


  interface NeoForgePlatformHelper extends IPlatformHelper {}
  class NeoForgePlatformHelper extends IPlatformHelper {
    get allModIds(): string[];
    get platformName(): string;
    isModLoaded(modId: string): boolean;
    modVersionMeets(modId: string, versionString: string): boolean;
  }


  interface NeoForgeReloadListenerRegistrar extends IReloadListenerRegistrar {}
  class NeoForgeReloadListenerRegistrar extends IReloadListenerRegistrar {
    static addListeners(event: RegisterClientReloadListenersEvent): void;
    registerListener(listener: PreparableReloadListener, listenerId: ResourceLocation): void;
    registerListener(listener: Supplier<PreparableReloadListener>, listenerId: ResourceLocation): void;
  }


  interface VertexConsumerSodium extends VertexConsumer, VertexBufferWriter {}
  class VertexConsumerSodium extends VertexConsumer {
  }

}

declare module 'com.anthonyhilyard.iceberg.renderer' {
  import { MultiBufferSource, RenderType, BlockEntityWithoutLevelRenderer } from 'net.minecraft.client.renderer';
  import { VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { ItemRenderer } from 'net.minecraft.client.renderer.entity';
  import { TextureManager } from 'net.minecraft.client.renderer.texture';
  import { ModelManager } from 'net.minecraft.client.resources.model';
  import { ItemColors } from 'net.minecraft.client.color.item';
  import { Minecraft } from 'net.minecraft.client';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Quaternionf, Vector3f } from 'org.joml';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ResourceManager } from 'net.minecraft.server.packs.resources';
  import { Set } from 'java.util';

  interface CheckedBufferSource extends MultiBufferSource {}
  class CheckedBufferSource extends MultiBufferSource {
    addVertex(x: number, y: number, z: number): VertexConsumer;
    static create(bufferSource: MultiBufferSource): CheckedBufferSource;
    getBuffer(renderType: RenderType): VertexConsumer;
    hasRendered(): boolean;
    reset(): void;
    setColor(r: number, g: number, b: number, a: number): VertexConsumer;
    setNormal(x: number, y: number, z: number): VertexConsumer;
    setUv(u: number, v: number): VertexConsumer;
    setUv1(u: number, v: number): VertexConsumer;
    setUv2(u: number, v: number): VertexConsumer;
  }


  interface CustomItemRenderer extends ItemRenderer {}
  class CustomItemRenderer extends ItemRenderer {
    constructor(textureManagerIn: TextureManager, modelManagerIn: ModelManager, itemColorsIn: ItemColors, blockEntityRendererIn: BlockEntityWithoutLevelRenderer, mcIn: Minecraft);
    static get instance(): CustomItemRenderer;
    onResourceManagerReload(resourceManager: ResourceManager): void;
    renderDetailModelIntoGUI(stack: ItemStack, x: number, y: number, rotation: Quaternionf, graphics: GuiGraphics): void;
    renderItemModelIntoGUIWithAlpha(graphics: GuiGraphics, stack: ItemStack, x: number, y: number, alpha: number): void;
  }


  interface VertexCollector extends MultiBufferSource {}
  class VertexCollector extends MultiBufferSource {
    addVertex(x: number, y: number, z: number): VertexConsumer;
    static create(): VertexCollector;
    get vertices(): Set<Vector3f>;
    getBuffer(renderType: RenderType): VertexConsumer;
    setColor(r: number, g: number, b: number, a: number): VertexConsumer;
    setNormal(x: number, y: number, z: number): VertexConsumer;
    setUv(u: number, v: number): VertexConsumer;
    setUv1(u: number, v: number): VertexConsumer;
    setUv2(u: number, v: number): VertexConsumer;
  }

}

declare module 'com.anthonyhilyard.iceberg.services' {
  import { CheckedBufferSource, VertexCollector } from 'com.anthonyhilyard.iceberg.renderer';
  import { Font } from 'net.minecraft.client.gui';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Pair } from 'org.apache.commons.lang3.tuple';
  import { IIcebergConfigSpec } from 'com.anthonyhilyard.iceberg.config';
  import { Function, Supplier, Predicate } from 'java.util.function';
  import { List, Collection, Map } from 'java.util';
  import { Class, Comparable, Enum, Boolean, Double, Integer, Long } from 'java.lang';
  import { KeyMapping } from 'net.minecraft.client';
  import { KeyMappingContext } from 'com.anthonyhilyard.iceberg.services.IKeyMappingRegistrar';
  import { PreparableReloadListener } from 'net.minecraft.server.packs.resources';
  import { ResourceLocation } from 'net.minecraft.resources';

  class IBufferSourceFactory {
    createCheckedBufferSource(var1: any): CheckedBufferSource;
    createVertexCollector(): VertexCollector;
  }


  class IFontLookup {
    getTooltipFont(var1: ItemStack, var2: Screen): Font;
  }


  class IIcebergConfigSpecBuilder {
    add<T>(var1: string, var2: T): Supplier<T>;
    add<T>(var1: string, var2: T, var3: Predicate<any>): Supplier<T>;
    add(var1: string, var2: boolean): Supplier<boolean>;
    addEnum<V extends Enum<V>>(var1: string, var2: V): Supplier<V>;
    addEnum<V extends Enum<V>>(var1: string, var2: V, var3: Predicate<any>): Supplier<V>;
    addInList<T>(var1: string, var2: T, var3: Collection<T>): Supplier<T>;
    addInRange<V extends Comparable<V>>(var1: string, var2: V, var3: V, var4: V, var5: Class<V>): Supplier<V>;
    addInRange(var1: string, var2: number, var4: number, var6: number): Supplier<number>;
    addInRange(var1: string, var2: number, var3: number, var4: number): Supplier<number>;
    addInRange(var1: string, var2: number, var4: number, var6: number): Supplier<Long>;
    addList<T>(var1: string, var2: T[], var3: Predicate<any>): Supplier<T[]>;
    addListAllowEmpty<T>(var1: string, var2: T[], var3: Predicate<any>): Supplier<T[]>;
    addSubconfig(var1: string, var2: Map<string, any>, var3: Predicate<any>, var4: Predicate<any>): Supplier<Map<string, any>>;
    comment(var1: string): IIcebergConfigSpecBuilder;
    comment(...var1: string[]): IIcebergConfigSpecBuilder;
    finish<T>(var1: Function<IIcebergConfigSpecBuilder, T>): Pair<T, IIcebergConfigSpec>;
    pop(): IIcebergConfigSpecBuilder;
    push(var1: string): IIcebergConfigSpecBuilder;
    push(var1: string[]): IIcebergConfigSpecBuilder;
    reset(): void;
    translation(var1: string): IIcebergConfigSpecBuilder;
  }


  class IKeyMappingRegistrar {
    registerMapping(var1: KeyMapping): KeyMapping;
    registerMapping(var1: KeyMapping, var2: KeyMappingContext): KeyMapping;
  }


  class IPlatformHelper {
    get allModIds(): string[];
    get platformName(): string;
    isModLoaded(var1: string): boolean;
    modVersionMeets(var1: string, var2: string): boolean;
  }


  class IReloadListenerRegistrar {
    registerListener(var1: PreparableReloadListener, var2: ResourceLocation): void;
    registerListener(var1: Supplier<PreparableReloadListener>, var2: ResourceLocation): void;
  }

}

declare module 'com.anthonyhilyard.iceberg.services.IKeyMappingRegistrar' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface KeyMappingContext extends Enum<KeyMappingContext> {}
  class KeyMappingContext extends Enum<KeyMappingContext> {
    static readonly UNIVERSAL: KeyMappingContext;
    static readonly GUI: KeyMappingContext;
    static readonly IN_GAME: KeyMappingContext;
    static readonly NO_CONFLICT: KeyMappingContext;
    static valueOf(name: string): KeyMappingContext;
    static values(): KeyMappingContext[];
  }

}

declare module 'com.anthonyhilyard.iceberg.util' {
  import { PackResources, PackType, PackLocationInfo } from 'net.minecraft.server.packs';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IoSupplier } from 'net.minecraft.server.packs.resources';
  import { InputStream } from 'java.io';
  import { ResourceOutput } from 'PackResources';
  import { Set, List, UUID, Optional } from 'java.util';
  import { MetadataSectionSerializer } from 'net.minecraft.server.packs.metadata';
  import { EasingType, EasingDirection } from 'com.anthonyhilyard.iceberg.util.Easing';
  import { TextColor, Component, FormattedText } from 'net.minecraft.network.chat';
  import { Level, GameRules, LightLayer } from 'net.minecraft.world.level';
  import { BlockPos, Holder, Direction } from 'net.minecraft.core';
  import { Difficulty, TickRateManager } from 'net.minecraft.world';
  import { Entity, EquipmentSlot } from 'net.minecraft.world.entity';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Class, Iterable } from 'java.lang';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { AABB, Vec3 } from 'net.minecraft.world.phys';
  import { LevelTickAccess } from 'net.minecraft.world.ticks';
  import { Block } from 'net.minecraft.world.level.block';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { ChunkSource } from 'net.minecraft.world.level.chunk';
  import { Player } from 'net.minecraft.world.entity.player';
  import { GameEvent } from 'net.minecraft.world.level.gameevent';
  import { Context } from 'GameEvent';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { FeatureFlagSet } from 'net.minecraft.world.flag';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';
  import { MapItemSavedData, MapId } from 'net.minecraft.world.level.saveddata.maps';
  import { Scoreboard } from 'net.minecraft.world.scores';
  import { RecipeManager } from 'net.minecraft.world.item.crafting';
  import { PotionBrewing } from 'net.minecraft.world.item.alchemy';
  import { LevelEntityGetter, EntityTypeTest } from 'net.minecraft.world.level.entity';
  import { AbortableIterationConsumer } from 'net.minecraft.util';
  import { Consumer } from 'java.util.function';
  import { Matrix4f } from 'org.joml';
  import { VertexConsumer, PoseStack } from 'com.mojang.blaze3d.vertex';
  import { DataComponentMap } from 'net.minecraft.core.component';
  import { SelectorDocumentation } from 'com.anthonyhilyard.iceberg.util.Selectors';
  import { Provider } from 'HolderLookup';
  import { ClientTooltipComponent, ClientTextTooltip, ClientTooltipPositioner } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { TooltipColors, TooltipRenderContext, TooltipInfo } from 'com.anthonyhilyard.iceberg.util.Tooltips';
  import { Rect2i } from 'net.minecraft.client.renderer';
  import { TextAlignment } from 'com.anthonyhilyard.iceberg.component.IExtendedText';
  import { Font, GuiGraphics } from 'net.minecraft.client.gui';
  import { TooltipComponent } from 'net.minecraft.world.inventory.tooltip';
  import { Field } from 'java.lang.reflect';

  interface DynamicResourcePack extends PackResources {}
  class DynamicResourcePack extends PackResources {
    constructor(packName: string);
    clear(): void;
    close(): void;
    getMetadataSection<T>(p_10291_: MetadataSectionSerializer<T>): T;
    getNamespaces(type: PackType): Set<string>;
    getResource(type: PackType, location: ResourceLocation): IoSupplier<InputStream>;
    getRootResource(...path: string[]): IoSupplier<InputStream>;
    listResources(type: PackType, namespace: string, path: string, output: ResourceOutput): void;
    location(): PackLocationInfo;
    packId(): string;
    registerResource(type: PackType, location: ResourceLocation, resourceSupplier: IoSupplier<InputStream>): boolean;
    registerRootResource(path: string, resourceSupplier: IoSupplier<InputStream>): boolean;
    removeResource(type: PackType, location: ResourceLocation): boolean;
  }


  class Easing {
    static Ease(a: number, b: number, t: number): number;
    static Ease(a: number, b: number, t: number, type: EasingType): number;
    static Ease(a: TextColor, b: TextColor, t: number, type: EasingType): TextColor;
    static Ease(a: number, b: number, t: number, type: EasingType, direction: EasingDirection): number;
  }


  interface EntityCollector extends Level {}
  class EntityCollector extends Level {
    addFreshEntity(entity: Entity): boolean;
    static collectEntitiesFromItem(itemStack: ItemStack): Entity[];
    destroyBlockProgress(p_46506_: number, p_46507_: BlockPos, p_46508_: number): void;
    enabledFeatures(): FeatureFlagSet;
    gameEvent(holder: Holder<GameEvent>, vec3: Vec3, context: Context): void;
    gatherChunkSourceStats(): string;
    get(p_156931_: number): Entity;
    get(p_156939_: UUID): Entity;
    get<U extends Entity>(p_156935_: EntityTypeTest<Entity, U>, p_261602_: AbortableIterationConsumer<U>): void;
    get(p_156937_: AABB, p_156938_: Consumer<Entity>): void;
    get<U extends Entity>(p_156932_: EntityTypeTest<Entity, U>, p_156933_: AABB, p_261542_: AbortableIterationConsumer<U>): void;
    get all(): Iterable<Entity>;
    get blockTicks(): LevelTickAccess<Block>;
    get chunkSource(): ChunkSource;
    get collectedEntities(): Entity[];
    get dayTime(): number;
    get difficulty(): Difficulty;
    get entities(): LevelEntityGetter<Entity>;
    get fluidTicks(): LevelTickAccess<Fluid>;
    get freeMapId(): MapId;
    get gameRules(): GameRules;
    get gameTime(): number;
    get recipeManager(): RecipeManager;
    get scoreboard(): Scoreboard;
    get spawnAngle(): number;
    get spawnPos(): BlockPos;
    getBlockState(blockPos: BlockPos): BlockState;
    getBrightness(lightLayer: LightLayer, blockPos: BlockPos): number;
    getEntity(p_46492_: number): Entity;
    getMapData(mapId: MapId): MapItemSavedData;
    getShade(p_45522_: Direction, p_45523_: boolean): number;
    getUncachedNoiseBiome(p_204159_: number, p_204160_: number, p_204161_: number): Holder<Biome>;
    isCreative(): boolean;
    isDifficultyLocked(): boolean;
    isHardcore(): boolean;
    isRaining(): boolean;
    isSpectator(): boolean;
    isThundering(): boolean;
    static itemCreatesEntity<T extends Entity>(itemStack: ItemStack, targetClass: Class<T>): boolean;
    levelEvent(p_46771_: Player, p_46772_: number, p_46773_: BlockPos, p_46774_: number): void;
    noCollision(entity: Entity, boundingBox: AABB): boolean;
    static of(wrappedLevel: Level): EntityCollector;
    playSeededSound(p_262953_: Player, p_263004_: number, p_263398_: number, p_263376_: number, p_263359_: Holder<SoundEvent>, p_263020_: SoundSource, p_263055_: number, p_262914_: number, p_262991_: number): void;
    playSeededSound(p_220372_: Player, p_220373_: Entity, p_263500_: Holder<SoundEvent>, p_220375_: SoundSource, p_220376_: number, p_220377_: number, p_220378_: number): void;
    players(): Player[];
    potionBrewing(): PotionBrewing;
    sendBlockUpdated(p_46612_: BlockPos, p_46613_: BlockState, p_46614_: BlockState, p_46615_: number): void;
    setBlockState(blockState: BlockState): void;
    setMapData(mapId: MapId, mapItemSavedData: MapItemSavedData): void;
    setRaining(isRaining: boolean): void;
    setSpawn(blockPos: BlockPos, f: number): void;
    tickRateManager(): TickRateManager;
  }


  class GuiHelper {
    static blit(poseStack: PoseStack, x: number, y: number, width: number, height: number, texX: number, texY: number, texWidth: number, texHeight: number, fullWidth: number, fullHeight: number): void;
    static blit(poseStack: PoseStack, x0: number, x1: number, y0: number, y1: number, z: number, texWidth: number, texHeight: number, texX: number, texY: number, fullWidth: number, fullHeight: number): void;
    static drawGradientRect(mat: Matrix4f, zLevel: number, left: number, top: number, right: number, bottom: number, startColor: number, endColor: number): void;
    static drawGradientRect(mat: Matrix4f, vertexConsumer: VertexConsumer, left: number, top: number, right: number, bottom: number, zLevel: number, startColor: number, endColor: number): void;
    static drawGradientRectHorizontal(mat: Matrix4f, zLevel: number, left: number, top: number, right: number, bottom: number, startColor: number, endColor: number): void;
  }


  class ItemColor {
    static findFirstColorCode(textComponent: Component): TextColor;
    static getColorForItem(item: ItemStack, defaultColor: TextColor): TextColor;
  }


  class ItemUtil {
    static getEquipmentSlot(itemStack: ItemStack): EquipmentSlot;
    static getItemComponents(item: ItemStack): DataComponentMap;
  }


  class ITooltipAccess {
    get icebergTooltipStack(): ItemStack;
    set icebergTooltipStack(var1: ItemStack);
  }


  class Selectors {
    static itemMatches(item: ItemStack, selector: string, provider: Provider): boolean;
    static selectorDocumentation(): SelectorDocumentation[];
    static validateSelector(value: string): boolean;
  }


  class StringRecomposer {
    static recompose(components: ClientTooltipComponent[]): FormattedText[];
  }


  class Tooltips {
    static readonly DEFAULT_COLORS: TooltipColors;
    static currentColors: TooltipColors;
    static readonly EMPTY_CONTEXT: TooltipRenderContext;
    static readonly CALCULATE_RECT_CONTEXT: TooltipRenderContext;
    static anyTooltipsVisible(): boolean;
    static calculateRect(stack: ItemStack, graphics: GuiGraphics, positioner: ClientTooltipPositioner, components: ClientTooltipComponent[], mouseX: number, mouseY: number, screenWidth: number, screenHeight: number, maxTextWidth: number, font: Font, minWidth: number, centeredTitle: boolean): Rect2i;
    static calculateRect(stack: ItemStack, graphics: GuiGraphics, positioner: ClientTooltipPositioner, components: ClientTooltipComponent[], mouseX: number, mouseY: number, font: Font): Rect2i;
    static calculateTitleLines(components: ClientTooltipComponent[]): number;
    static calculateTitleStart(components: ClientTooltipComponent[]): number;
    static centerTitle(components: ClientTooltipComponent[], font: Font, width: number): ClientTooltipComponent[];
    static centerTitle(components: ClientTooltipComponent[], font: Font, width: number, titleLines: number): ClientTooltipComponent[];
    static gatherTooltipComponents(stack: ItemStack, textElements: FormattedText[], itemComponent: Optional<TooltipComponent>, mouseX: number, screenWidth: number, screenHeight: number, forcedFont: Font, fallbackFont: Font, maxWidth: number): ClientTooltipComponent[];
    static gatherTooltipComponents(stack: ItemStack, textElements: FormattedText[], itemComponent: Optional<TooltipComponent>, mouseX: number, screenWidth: number, screenHeight: number, forcedFont: Font, fallbackFont: Font, maxWidth: number, index: number): ClientTooltipComponent[];
    static get currentRect(): Rect2i;
    static get currentRenderContext(): TooltipRenderContext;
    static getTitleOffset(tooltipWidth: number, textWidth: number, leftPadding: number, rightPadding: number, textAlignment: TextAlignment): number;
    static getTitleWidth(title: ClientTextTooltip, font: Font): number;
    static renderItemTooltip(stack: ItemStack, info: TooltipInfo, rect: Rect2i, screenWidth: number, screenHeight: number, backgroundColorStart: number, backgroundColorEnd: number, borderColorStart: number, borderColorEnd: number, graphics: GuiGraphics, positioner: ClientTooltipPositioner, comparison: boolean, constrain: boolean, centeredTitle: boolean, index: number): void;
    static renderItemTooltip(stack: ItemStack, info: TooltipInfo, rect: Rect2i, graphics: GuiGraphics, positioner: ClientTooltipPositioner, comparison: boolean, constrain: boolean, index: number): void;
    static renderItemTooltip(stack: ItemStack, font: Font, components: ClientTooltipComponent[], rect: Rect2i, graphics: GuiGraphics, positioner: ClientTooltipPositioner, comparison: boolean, index: number): void;
    static setAnyTooltipsVisible(visible: boolean): void;
    static setCurrentRect(x: number, y: number, width: number, height: number): void;
  }


  class UnsafeUtil {
    static getField<T>(field: Field, instance: any): T;
    static newInstance<T>(clazz: Class<T>): T;
    static readByte(address: number): number;
    static readFloat(address: number): number;
    static readInt(address: number): number;
    static setField(field: Field, instance: any, value: any): void;
  }

}

declare module 'com.anthonyhilyard.iceberg.util.Easing' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface EasingType extends Enum<EasingType> {}
  class EasingType extends Enum<EasingType> {
    static readonly None: EasingType;
    static readonly Linear: EasingType;
    static readonly Quad: EasingType;
    static readonly Cubic: EasingType;
    static valueOf(name: string): EasingType;
    static values(): EasingType[];
  }


  interface EasingDirection extends Enum<EasingDirection> {}
  class EasingDirection extends Enum<EasingDirection> {
    static readonly In: EasingDirection;
    static readonly Out: EasingDirection;
    static readonly InOut: EasingDirection;
    static valueOf(name: string): EasingDirection;
    static values(): EasingDirection[];
  }

}

declare module 'com.anthonyhilyard.iceberg.util.Tooltips' {
  import { List } from 'java.util';
  import { ClientTooltipComponent } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { Font } from 'net.minecraft.client.gui';

  class TooltipInfo {
    constructor(components: ClientTooltipComponent[], font: Font);

    constructor(components: ClientTooltipComponent[], font: Font, titleLines: number);

    constructor(components: ClientTooltipComponent[], font: Font, titleLines: number, titleStart: number);
    get components(): ClientTooltipComponent[];
    get font(): Font;
    get maxLineWidth(): number;
    get titleLines(): number;
    get titleStart(): number;
    get tooltipHeight(): number;
    get tooltipWidth(): number;
    getMaxLineWidth(minWidth: number): number;
    set font(font: Font);
  }

}