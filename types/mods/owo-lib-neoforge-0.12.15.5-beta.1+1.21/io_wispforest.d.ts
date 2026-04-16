declare module 'io.wispforest.owo.blockentity' {
  import { BiConsumer, Predicate } from 'java.util.function';
  import { CompoundTag } from 'net.minecraft.nbt';

  class LinearProcess<T = any> {
    constructor(processLength: number);
    addClientEvent(when: number, executor: BiConsumer<LinearProcessExecutor<T>, T>): void;
    addClientStep(when: number, length: number, executor: BiConsumer<LinearProcessExecutor<T>, T>): void;
    addCommonEvent(when: number, executor: BiConsumer<LinearProcessExecutor<T>, T>): void;
    addCommonStep(when: number, length: number, executor: BiConsumer<LinearProcessExecutor<T>, T>): void;
    addServerEvent(when: number, executor: BiConsumer<LinearProcessExecutor<T>, T>): void;
    addServerStep(when: number, length: number, executor: BiConsumer<LinearProcessExecutor<T>, T>): void;
    configureExecutor(executor: LinearProcessExecutor<T>, client: boolean): void;
    createExecutor(target: T): LinearProcessExecutor<T>;
    finish(): void;
    onCancelledClient(executor: BiConsumer<LinearProcessExecutor<T>, T>): void;
    onCancelledCommon(executor: BiConsumer<LinearProcessExecutor<T>, T>): void;
    onCancelledServer(executor: BiConsumer<LinearProcessExecutor<T>, T>): void;
    runConditionally(condition: Predicate<LinearProcessExecutor<T>>): void;
    whenFinishedClient(executor: BiConsumer<LinearProcessExecutor<T>, T>): void;
    whenFinishedCommon(executor: BiConsumer<LinearProcessExecutor<T>, T>): void;
    whenFinishedServer(executor: BiConsumer<LinearProcessExecutor<T>, T>): void;
  }


  class LinearProcessExecutor<T = any> {
    static readonly CANCEL_EVENT_INDEX: number;
    static readonly FINISH_EVENT_INDEX: number;
    begin(): boolean;
    cancel(): boolean;
    get processTick(): number;
    get target(): T;
    readState(targetTag: CompoundTag): void;
    running(): boolean;
    tick(): void;
    writeState(targetTag: CompoundTag): void;
  }

}

declare module 'io.wispforest.owo.blockentity.LinearProcessExecutor.ProcessStep' {
  import { ProcessStep } from 'io.wispforest.owo.blockentity.LinearProcessExecutor';
  import { LinearProcessExecutor } from 'io.wispforest.owo.blockentity';

  class Info<T = any> {
    constructor(index: number, step: ProcessStep<T>);

    constructor(index: number, tick: number, step: ProcessStep<T>);
    tick(target: LinearProcessExecutor<T>): boolean;
  }

}

declare module 'io.wispforest.owo.client' {
  import { GlProgram, BlurProgram } from 'io.wispforest.owo.shader';
  import { IEventBus } from 'net.neoforged.bus.api';

  class OwoClient {
    static readonly HSV_PROGRAM: GlProgram;
    static readonly BLUR_PROGRAM: BlurProgram;
    constructor(modBus: IEventBus);
  }

}

declare module 'io.wispforest.owo.client.screens' {
  import { ReflectiveEndecBuilder } from 'io.wispforest.endec.impl';
  import { Class } from 'java.lang';
  import { Endec } from 'io.wispforest.endec';
  import { Consumer, Predicate } from 'java.util.function';
  import { Player, Inventory } from 'net.minecraft.world.entity.player';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { PayloadRegistrar } from 'net.neoforged.neoforge.network.registration';
  import { ItemStack } from 'net.minecraft.world.item';
  import { AbstractContainerMenu, Slot } from 'net.minecraft.world.inventory';
  import { SlotFactory } from 'io.wispforest.owo.client.screens.SlotGenerator';
  import { Container } from 'net.minecraft.world';
  import { Observable } from 'io.wispforest.owo.util';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  class OwoScreenHandler {
    addClientboundMessage<R extends Record>(messageClass: Class<R>, endec: Endec<R>, handler: Consumer<R>): void;
    addClientboundMessage<R extends Record>(messageClass: Class<R>, handler: Consumer<R>): void;
    addServerboundMessage<R extends Record>(messageClass: Class<R>, endec: Endec<R>, handler: Consumer<R>): void;
    addServerboundMessage<R extends Record>(messageClass: Class<R>, handler: Consumer<R>): void;
    createProperty<T>(clazz: Class<T>, endec: Endec<T>, initial: T): SyncedProperty<T>;
    createProperty<T>(clazz: Class<T>, initial: T): SyncedProperty<T>;
    endecBuilder(): ReflectiveEndecBuilder;
    player(): Player;
    sendMessage<R extends Record>(message: R): void;
  }


  class ScreenInternals {
    static readonly SYNC_PROPERTIES: ResourceLocation;
    static init(registrar: PayloadRegistrar): void;
  }


  class ScreenUtils {
    static handleSlotTransfer(handler: AbstractContainerMenu, clickedSlotIndex: number, upperInventorySize: number): ItemStack;
    static insertIntoSlotRange(handler: AbstractContainerMenu, addition: ItemStack, beginIndex: number, endIndex: number): boolean;
    static insertIntoSlotRange(handler: AbstractContainerMenu, addition: ItemStack, beginIndex: number, endIndex: number, fromLast: boolean): boolean;
  }


  class SlotGenerator {
    static begin(slotConsumer: Consumer<Slot>, anchorX: number, anchorY: number): SlotGenerator;
    defaultSlotFactory(): SlotGenerator;
    grid(inventory: Container, startIndex: number, width: number, height: number): SlotGenerator;
    horizontalSpacing(horizontalSpacing: number): SlotGenerator;
    moveTo(anchorX: number, anchorY: number): SlotGenerator;
    playerInventory(playerInventory: Inventory): SlotGenerator;
    slotConsumer(slotConsumer: Consumer<Slot>): SlotGenerator;
    slotFactory(slotFactory: SlotFactory): SlotGenerator;
    spacing(spacing: number): SlotGenerator;
    verticalSpacing(verticalSpacing: number): SlotGenerator;
  }


  interface SyncedProperty<T = any> extends Observable<T> {}
  class SyncedProperty<T = any> extends Observable<T> {
    constructor(index: number, endec: Endec<T>, initial: T, owner: AbstractContainerMenu);
    index(): number;
    markDirty(): void;
    needsSync(): boolean;
    read(buf: FriendlyByteBuf): void;
    write(buf: FriendlyByteBuf): void;
  }


  interface ValidatingSlot extends Slot {}
  class ValidatingSlot extends Slot {
    constructor(inventory: Container, index: number, x: number, y: number, insertCondition: Predicate<ItemStack>);
    mayPlace(stack: ItemStack): boolean;
  }

}

declare module 'io.wispforest.owo.client.screens.ScreenInternals' {
  class Client {
    static init(): void;
  }

}

declare module 'io.wispforest.owo.client.screens.SlotGenerator' {
  import { Slot } from 'net.minecraft.world.inventory';
  import { Container } from 'net.minecraft.world';

  class SlotFactory {
    create(var1: Container, var2: number, var3: number, var4: number): Slot;
  }

}

declare module 'io.wispforest.owo.client.texture' {
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface AnimatedTextureDrawable extends Renderable {}
  class AnimatedTextureDrawable extends Renderable {
    constructor(x: number, y: number, texture: ResourceLocation, metadata: SpriteSheetMetadata, delay: number, loop: boolean);

    constructor(x: number, y: number, width: number, height: number, texture: ResourceLocation, metadata: SpriteSheetMetadata, delay: number, loop: boolean);
    render(x: number, y: number, context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    render(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }

}

declare module 'io.wispforest.owo.command.debug' {
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack, CommandBuildContext } from 'net.minecraft.commands';
  import { IEventBus } from 'net.neoforged.bus.api';

  class CcaDataCommand {
    static register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }


  class DumpdataCommand {
    static register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }


  class HealCommand {
    static register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }


  class MakeLootContainerCommand {
    static register(dispatcher: CommandDispatcher<CommandSourceStack>, registryAccess: CommandBuildContext): void;
  }


  class OwoDebugCommands {
    static readonly GENERAL_PURPLE: number;
    static readonly KEY_BLUE: number;
    static readonly VALUE_BLUE: number;
    static register(modBus: IEventBus): void;
  }

}

declare module 'io.wispforest.owo.command.debug.OwoDebugCommands' {
  class Client {
    static register(): void;
  }

}

declare module 'io.wispforest.owo.command' {
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { Enum, Class } from 'java.lang';
  import { CommandContext } from 'com.mojang.brigadier.context';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Suggestions, SuggestionsBuilder } from 'com.mojang.brigadier.suggestion';
  import { StringReader } from 'com.mojang.brigadier';

  interface EnumArgumentType<T extends Enum<T> = any> extends ArgumentType<Enum> {}
  class EnumArgumentType<T extends Enum<T> = any> extends ArgumentType<Enum> {
    static create<T extends Enum<T>>(enumClass: Class<T>): EnumArgumentType<T>;
    static create<T extends Enum<T>>(enumClass: Class<T>, noElementMessage: string): EnumArgumentType<T>;
    get(context: CommandContext<any>, name: string): T;
    listSuggestions<S>(context: CommandContext<S>, builder: SuggestionsBuilder): CompletableFuture<Suggestions>;
    parse(reader: StringReader): T;
  }

}

declare module 'io.wispforest.owo.compat.emi' {
  import { EmiPlugin, EmiRegistry } from 'dev.emi.emi.api';

  interface OwoEmiPlugin extends EmiPlugin {}
  class OwoEmiPlugin extends EmiPlugin {
    register(registry: EmiRegistry): void;
  }

}

declare module 'io.wispforest.owo.compat.rei' {
  import { REIClientPlugin } from 'me.shedaniel.rei.api.client.plugins';
  import { ExclusionZones, ScreenRegistry, OverlayRendererProvider } from 'me.shedaniel.rei.api.client.registry.screen';
  import { Class } from 'java.lang';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Sink } from 'OverlayRendererProvider';
  import { Widget, WidgetWithBounds } from 'me.shedaniel.rei.api.client.gui.widgets';
  import { Point, Rectangle } from 'me.shedaniel.math';
  import { OwoUIAdapter, Sizing, ParentComponent, OwoUIDrawContext } from 'io.wispforest.owo.ui.core';
  import { BiFunction, Function, Consumer } from 'java.util.function';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { BaseComponent } from 'io.wispforest.owo.ui.base';
  import { FocusSource } from 'io.wispforest.owo.ui.core.Component';

  interface OwoReiPlugin extends REIClientPlugin {}
  class OwoReiPlugin extends REIClientPlugin {
    get rendererProvider(): OverlayRendererProvider;
    isHandingScreen<R extends Screen>(screen: Class<R>): boolean;
    onApplied(sink: Sink): void;
    onRemoved(): void;
    registerExclusionZones(zones: ExclusionZones): void;
    registerScreens(registry: ScreenRegistry): void;
  }


  interface ReiUIAdapter<T extends ParentComponent = any> extends Widget {}
  class ReiUIAdapter<T extends ParentComponent = any> extends Widget {
    static readonly LAYOUT: Point;
    readonly adapter: OwoUIAdapter;
    constructor(bounds: Rectangle, rootComponentMaker: BiFunction<Sizing, Sizing, T>);
    charTyped(chr: string, modifiers: number): boolean;
    children(): GuiEventListener[];
    containsMouse(mouseX: number, mouseY: number): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    keyReleased(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, deltaX: number, deltaY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, horizontalAmount: number, verticalAmount: number): boolean;
    prepare(): void;
    render(context: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    rootComponent(): T;
    wrap<W extends WidgetWithBounds>(widget: W): ReiWidgetComponent;
    wrap<W extends WidgetWithBounds>(widgetFactory: Function<Point, W>, widgetConfigurator: Consumer<W>): ReiWidgetComponent;
  }


  interface ReiWidgetComponent extends BaseComponent {}
  class ReiWidgetComponent extends BaseComponent {
    canFocus(source: FocusSource): boolean;
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    drawFocusHighlight(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    mount(parent: ParentComponent, x: number, y: number): void;
    onCharTyped(chr: string, modifiers: number): boolean;
    onKeyPress(keyCode: number, scanCode: number, modifiers: number): boolean;
    onMouseDown(mouseX: number, mouseY: number, button: number): boolean;
    onMouseDrag(mouseX: number, mouseY: number, deltaX: number, deltaY: number, button: number): boolean;
    onMouseScroll(mouseX: number, mouseY: number, amount: number): boolean;
    onMouseUp(mouseX: number, mouseY: number, button: number): boolean;
    updateX(x: number): void;
    updateY(y: number): void;
  }

}

declare module 'io.wispforest.owo.config' {
  import { AbstractProcessor, ProcessingEnvironment, RoundEnvironment } from 'javax.annotation.processing';
  import { Set, Map } from 'java.util';
  import { TypeElement } from 'javax.lang.model.element';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Key, BoundField, SyncMode } from 'io.wispforest.owo.config.Option';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { PayloadRegistrar } from 'net.neoforged.neoforge.network.registration';
  import { Field } from 'java.lang.reflect';
  import { Path } from 'java.nio.file';
  import { Consumer } from 'java.util.function';
  import { Observable } from 'io.wispforest.owo.util';
  import { Constraint } from 'io.wispforest.owo.config.ConfigWrapper';
  import { ReflectiveEndecBuilder } from 'io.wispforest.endec.impl';
  import { Class } from 'java.lang';
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack, CommandBuildContext } from 'net.minecraft.commands';

  interface ConfigAP extends AbstractProcessor {}
  class ConfigAP extends AbstractProcessor {
    init(processingEnv: ProcessingEnvironment): void;
    process(annotations: Set<TypeElement>, roundEnv: RoundEnvironment): boolean;
  }


  class ConfigSynchronizer {
    static readonly CONFIG_SYNC_CHANNEL: ResourceLocation;
    static getClientOptions(player: ServerPlayer, configName: string): Map<Key, any>;
    static getClientOptions(player: ServerPlayer, config: ConfigWrapper<any>): Map<Key, any>;
    static onDisconnect(): void;
    static register(registrar: PayloadRegistrar): void;
  }


  class ConfigWrapper<C = any> {
    allOptions(): Map<Key, Option<any>>;
    fieldForKey(key: Key): Field;
    fileLocation(): Path;
    forEachOption(action: Consumer<Option<any>>): void;
    load(): void;
    optionForKey<T>(key: Key): Option<T>;
    save(): void;
  }


  class Option<T = any> {
    constructor(configName: string, key: Key, defaultValue: T, mirror: Observable<T>, backingField: BoundField<T>, constraint: Constraint, syncMode: SyncMode, builder: ReflectiveEndecBuilder);
    backingField(): BoundField<T>;
    clazz(): Class<T>;
    configName(): string;
    constraint(): Constraint;
    defaultValue(): T;
    detached(): boolean;
    key(): Key;
    observe(observer: Consumer<T>): void;
    set(value: T): void;
    syncMode(): SyncMode;
    synchronizeWithBackingField(): void;
    toString(): string;
    translationKey(): string;
    value(): T;
    verifyConstraint(value: T): boolean;
  }


  class OwoConfigCommand {
    static register(dispatcher: CommandDispatcher<CommandSourceStack>, access: CommandBuildContext): void;
  }

}

declare module 'io.wispforest.owo.config.Option' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface SyncMode extends Enum<SyncMode> {}
  class SyncMode extends Enum<SyncMode> {
    static readonly NONE: SyncMode;
    static readonly INFORM_SERVER: SyncMode;
    static readonly OVERRIDE_CLIENT: SyncMode;
    isNone(): boolean;
    static valueOf(name: string): SyncMode;
    static values(): SyncMode[];
  }

}

declare module 'io.wispforest.owo.config.ui.component' {
  import { ButtonComponent, DiscreteSliderComponent, TextBoxComponent } from 'io.wispforest.owo.ui.component';
  import { Option } from 'io.wispforest.owo.config';
  import { Enum, Class, Number } from 'java.lang';
  import { Consumer, Predicate, Function, Supplier } from 'java.util.function';
  import { UIModel } from 'io.wispforest.owo.ui.parsing';
  import { Element } from 'org.w3c.dom';
  import { Map, List } from 'java.util';
  import { CollapsibleContainer } from 'io.wispforest.owo.ui.container';
  import { BaseComponent } from 'io.wispforest.owo.ui.base';
  import { ParentComponent, OwoUIDrawContext, Component } from 'io.wispforest.owo.ui.core';
  import { Key } from 'io.wispforest.owo.config.Option';
  import { SearchHighlighterComponent } from 'io.wispforest.owo.config.ui.ConfigScreen';

  interface ConfigEnumButton extends OptionValueProvider, ButtonComponent {}
  class ConfigEnumButton extends OptionValueProvider {
    constructor();
    init(option: Option<Enum<any>>, selectedIndex: number): ConfigEnumButton;
    isValid(): boolean;
    onMouseDown(mouseX: number, mouseY: number, button: number): boolean;
    onPress(): void;
    onPress(onPress: Consumer<ButtonComponent>): ButtonComponent;
    parsedValue(): any;
    select(index: number): ConfigEnumButton;
  }


  interface ConfigSlider extends OptionValueProvider, DiscreteSliderComponent {}
  class ConfigSlider extends OptionValueProvider {
    constructor();
    isValid(): boolean;
    max(max: number): ConfigSlider;
    max(): number;
    min(min: number): ConfigSlider;
    min(): number;
    parsedValue(): any;
    valueType(valueType: Class<Number>): ConfigSlider;
  }


  interface ConfigTextBox extends OptionValueProvider, TextBoxComponent {}
  class ConfigTextBox extends OptionValueProvider {
    constructor();
    applyPredicate(applyPredicate: Predicate<string>): ConfigTextBox;
    applyPredicate(): Predicate<string>;
    configureForNumber(fieldType: Class<Number>): ConfigTextBox;
    inputPredicate(inputPredicate: Predicate<string>): ConfigTextBox;
    inputPredicate(): Predicate<string>;
    invalidColor(invalidColor: number): ConfigTextBox;
    invalidColor(): number;
    isValid(): boolean;
    parseProperties(model: UIModel, element: Element, children: Map<string, Element>): void;
    parsedValue(): any;
    validColor(validColor: number): ConfigTextBox;
    validColor(): number;
    valueParser(): Function<string, any>;
    valueParser(valueParser: Function<string, any>): ConfigTextBox;
  }


  interface ConfigToggleButton extends OptionValueProvider, ButtonComponent {}
  class ConfigToggleButton extends OptionValueProvider {
    constructor();
    enabled(enabled: boolean): ConfigToggleButton;
    isValid(): boolean;
    onPress(): void;
    onPress(onPress: Consumer<ButtonComponent>): ButtonComponent;
    parsedValue(): any;
  }


  interface ListOptionContainer<T = any> extends OptionValueProvider, CollapsibleContainer {}
  class ListOptionContainer<T = any> extends OptionValueProvider {
    constructor(option: Option<T[]>);
    isValid(): boolean;
    parsedValue(): any;
    shouldDrawTooltip(mouseX: number, mouseY: number): boolean;
  }


  class OptionValueProvider {
    isValid(): boolean;
    parsedValue(): any;
  }


  interface SearchAnchorComponent extends BaseComponent {}
  class SearchAnchorComponent extends BaseComponent {
    constructor(anchorFrame: ParentComponent, key: Key, ...searchTextSources: Supplier<string>[]);
    anchorFrame(): ParentComponent;
    configure(component: SearchHighlighterComponent): SearchHighlighterComponent;
    configure<C extends Component>(closure: Consumer<C>): C;
    currentSearchText(): string;
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    highlightConfigurator(highlightConfigurator: Consumer<SearchHighlighterComponent>): SearchAnchorComponent;
    key(): Key;
  }

}

declare module 'io.wispforest.owo.config.ui' {
  import { BaseUIModelScreen } from 'io.wispforest.owo.ui.base';
  import { FlowLayout } from 'io.wispforest.owo.ui.container';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ConfigWrapper, Option } from 'io.wispforest.owo.config';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Function, BiConsumer, Consumer } from 'java.util.function';
  import { Result } from 'io.wispforest.owo.config.ui.OptionComponentFactory';
  import { UIModel } from 'io.wispforest.owo.ui.parsing';
  import { ConfigTextBox, OptionValueProvider, ConfigToggleButton, ConfigEnumButton } from 'io.wispforest.owo.config.ui.component';
  import { Number, Boolean, Enum } from 'java.lang';
  import { Map } from 'java.util';

  interface ConfigScreen extends BaseUIModelScreen<FlowLayout> {}
  class ConfigScreen extends BaseUIModelScreen<FlowLayout> {
    static readonly DEFAULT_MODEL_ID: ResourceLocation;
    static create(config: ConfigWrapper<any>, parent: Screen): ConfigScreen;
    static createWithCustomModel(modelId: ResourceLocation, config: ConfigWrapper<any>, parent: Screen): ConfigScreen;
    static forEachProvider(action: BiConsumer<string, Function<Screen, ConfigScreen>>): void;
    static getProvider(modId: string): Function<Screen, ConfigScreen>;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    onClose(): void;
    static registerProvider<S extends ConfigScreen>(modId: string, supplier: Function<Screen, S>): void;
    removed(): void;
  }


  class ConfigScreenProviders {
    static forEach(action: BiConsumer<string, Function<Screen, Screen>>): void;
    static get(modId: string): Function<Screen, Screen>;
    static register<S extends Screen>(modId: string, supplier: Function<Screen, S>): void;
    static registerOwoConfigScreen<S extends ConfigScreen>(modId: string, supplier: Function<Screen, S>): void;
  }


  class OptionComponentFactory<T = any> {
    static readonly NUMBER: OptionComponentFactory;
    static readonly STRING: OptionComponentFactory;
    static readonly IDENTIFIER: OptionComponentFactory;
    static readonly COLOR: OptionComponentFactory;
    static readonly BOOLEAN: OptionComponentFactory;
    static readonly ENUM: OptionComponentFactory;
    static readonly LIST: OptionComponentFactory;
    make(var1: UIModel, var2: Option<T>): Result<any, any>;
  }


  class OptionComponents {
    static createEnumButton(model: UIModel, option: Option<Enum<any>>): Result<FlowLayout, ConfigEnumButton>;
    static createRangeControls(model: UIModel, option: Option<Number>, decimalPlaces: number): Result<FlowLayout, OptionValueProvider>;
    static createTextBox(model: UIModel, option: Option<any>, processor: Consumer<ConfigTextBox>): Result<FlowLayout, ConfigTextBox>;
    static createTextBox<T>(model: UIModel, option: Option<T>, toStringFunction: Function<T, string>, processor: Consumer<ConfigTextBox>): Result<FlowLayout, ConfigTextBox>;
    static createToggleButton(model: UIModel, option: Option<boolean>): Result<FlowLayout, ConfigToggleButton>;
    isValid(): boolean;
    static packParameters(name: string, value: string): Map<string, string>;
    parsedValue(): any;
  }


  interface RestartRequiredScreen extends BaseUIModelScreen<FlowLayout> {}
  class RestartRequiredScreen extends BaseUIModelScreen<FlowLayout> {
    constructor(parent: Screen);
    onClose(): void;
  }

}

declare module 'io.wispforest.owo.config.ui.ConfigScreen' {
  import { BaseComponent } from 'io.wispforest.owo.ui.base';
  import { OwoUIDrawContext } from 'io.wispforest.owo.ui.core';

  interface SearchHighlighterComponent extends BaseComponent {}
  class SearchHighlighterComponent extends BaseComponent {
    constructor();
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    update(delta: number, mouseX: number, mouseY: number): void;
  }

}

declare module 'io.wispforest.owo.ext' {
  import { DataComponentMap, DataComponentType } from 'net.minecraft.core.component';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Set } from 'java.util';
  import { Builder } from 'DataComponentPatch';

  interface DerivedComponentMap extends DataComponentMap {}
  class DerivedComponentMap extends DataComponentMap {
    constructor(base: DataComponentMap);
    derive(owner: ItemStack): void;
    equals(o: any): boolean;
    get<T>(type: DataComponentType<T>): T;
    hashCode(): number;
    keySet(): Set<DataComponentType<any>>;
    static reWrapIfNeeded(original: DataComponentMap): DataComponentMap;
  }


  class OwoItem {
    deriveStackComponents(source: DataComponentMap, target: Builder): void;
  }

}

declare module 'io.wispforest.owo.itemgroup.gui' {
  import { ButtonDefinition } from 'io.wispforest.owo.itemgroup.OwoItemGroup';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { CreativeModeTab } from 'net.minecraft.world.item';
  import { Icon } from 'io.wispforest.owo.itemgroup';
  import { Runnable } from 'java.lang';
  import { Component } from 'net.minecraft.network.chat';
  import { Button } from 'net.minecraft.client.gui.components';
  import { Consumer } from 'java.util.function';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface ItemGroupButton extends ButtonDefinition {}
  class ItemGroupButton extends ButtonDefinition {
    static readonly ICONS_TEXTURE: ResourceLocation;
    constructor(group: CreativeModeTab, icon: Icon, name: string, texture: ResourceLocation, action: Runnable);

    constructor(group: CreativeModeTab, icon: Icon, name: string, action: Runnable);
    action(): Runnable;
    static curseforge(group: CreativeModeTab, url: string): ItemGroupButton;
    static discord(group: CreativeModeTab, url: string): ItemGroupButton;
    static github(group: CreativeModeTab, url: string): ItemGroupButton;
    icon(): Icon;
    static link(group: CreativeModeTab, icon: Icon, name: string, url: string): ItemGroupButton;
    static modrinth(group: CreativeModeTab, url: string): ItemGroupButton;
    texture(): ResourceLocation;
    tooltip(): Component;
  }


  interface ItemGroupButtonWidget extends Button {}
  class ItemGroupButtonWidget extends Button {
    isSelected: boolean;
    constructor(x: number, y: number, baseU: number, definition: ButtonDefinition, onPress: Consumer<ItemGroupButtonWidget>);
    isTab(): boolean;
    renderWidget(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    trulyHovered(): boolean;
  }

}

declare module 'io.wispforest.owo.itemgroup.gui.ItemGroupTab' {
  import { ItemDisplayParameters, Output } from 'CreativeModeTab';

  class ContentSupplier {
    addItems(var1: ItemDisplayParameters, var2: Output): void;
  }

}

declare module 'io.wispforest.owo.itemgroup' {
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ItemStack, CreativeModeTab, Item, Rarity } from 'net.minecraft.world.item';
  import { ItemLike } from 'net.minecraft.world.level';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { BiConsumer, Supplier } from 'java.util.function';
  import { List } from 'java.util';
  import { Builder, ScrollerTextures, TabTextures } from 'io.wispforest.owo.itemgroup.OwoItemGroup';
  import { ItemGroupButton, ItemGroupTab } from 'io.wispforest.owo.itemgroup.gui';
  import { TagKey } from 'net.minecraft.tags';
  import { ContentSupplier } from 'io.wispforest.owo.itemgroup.gui.ItemGroupTab';
  import { ItemDisplayParameters, Output } from 'CreativeModeTab';
  import { IntSet } from 'it.unimi.dsi.fastutil.ints';
  import { Properties } from 'Item';

  class Icon {
    static of(stack: ItemStack): Icon;
    static of(item: ItemLike): Icon;
    static of(texture: ResourceLocation, u: number, v: number, textureWidth: number, textureHeight: number): Icon;
    static of(texture: ResourceLocation, textureSize: number, frameDelay: number, loop: boolean): Icon;
    render(var1: GuiGraphics, var2: number, var3: number, var4: number, var5: number, var6: number): void;
  }


  interface OwoItemGroup extends CreativeModeTab {}
  class OwoItemGroup extends CreativeModeTab {
    static readonly DEFAULT_STACK_GENERATOR: BiConsumer;
    readonly tabs: List;
    readonly buttons: List;
    addButton(button: ItemGroupButton): void;
    addCustomTab(icon: Icon, name: string, contentSupplier: ContentSupplier, texture: ResourceLocation, primary: boolean): void;
    addCustomTab(icon: Icon, name: string, contentSupplier: ContentSupplier, primary: boolean): void;
    addTab(icon: Icon, name: string, contentTag: TagKey<Item>, texture: ResourceLocation, primary: boolean): void;
    addTab(icon: Icon, name: string, contentTag: TagKey<Item>, primary: boolean): void;
    buildContents(context: ItemDisplayParameters): void;
    static builder(id: ResourceLocation, iconSupplier: Supplier<Icon>): Builder;
    canSelectMultipleTabs(): boolean;
    deselectTab(tab: number, context: ItemDisplayParameters): void;
    get buttonStackHeight(): number;
    get buttons(): ItemGroupButton[];
    get scrollerTextures(): ScrollerTextures;
    get tabStackHeight(): number;
    get tabTextures(): TabTextures;
    getTab(index: number): ItemGroupTab;
    hasAnyItems(): boolean;
    hasDynamicTitle(): boolean;
    icon(): Icon;
    id(): ResourceLocation;
    initialize(): void;
    isTabSelected(tab: number): boolean;
    owo$getBackgroundTexture(): ResourceLocation;
    selectSingleTab(tab: number, context: ItemDisplayParameters): void;
    selectTab(tab: number, context: ItemDisplayParameters): void;
    selectedTabs(): IntSet;
    shouldDisplay(): boolean;
    shouldDisplaySingleTab(): boolean;
    toggleTab(tab: number, context: ItemDisplayParameters): void;
  }


  interface OwoItemSettings extends Properties {}
  class OwoItemSettings extends Properties {
    fireproof(): OwoItemSettings;
    group(ref: ItemGroupReference): OwoItemSettings;
    group(group: OwoItemGroup): OwoItemSettings;
    group(): OwoItemGroup;
    group(groupSupplier: Supplier<OwoItemGroup>): OwoItemSettings;
    groupSupplier(): Supplier<OwoItemGroup>;
    maxCount(maxCount: number): OwoItemSettings;
    maxDamage(maxDamage: number): OwoItemSettings;
    rarity(rarity: Rarity): OwoItemSettings;
    recipeRemainder(recipeRemainder: Item): OwoItemSettings;
    shouldTrackUsageStat(): boolean;
    stackGenerator(generator: BiConsumer<Item, Output>): OwoItemSettings;
    stackGenerator(): BiConsumer<Item, Output>;
    tab(tab: number): OwoItemSettings;
    tab(): number;
    trackUsageStat(): OwoItemSettings;
  }


  class OwoItemSettingsExtension {
    group(ref: ItemGroupReference): Properties;
    group(group: OwoItemGroup): Properties;
    group(groupSupplier: Supplier<OwoItemGroup>): Properties;
    group(): OwoItemGroup;
    groupSupplier(): Supplier<OwoItemGroup>;
    shouldTrackUsageStat(): boolean;
    stackGenerator(generator: BiConsumer<Item, Output>): Properties;
    stackGenerator(): BiConsumer<Item, Output>;
    tab(tab: number): Properties;
    tab(): number;
    trackUsageStat(): Properties;
  }

}

declare module 'io.wispforest.owo.itemgroup.json' {
  import { ModDataConsumer } from 'io.wispforest.owo.moddata';
  import { CreativeModeTab } from 'net.minecraft.world.item';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { JsonObject } from 'com.google.gson';
  import { OwoItemGroup } from 'io.wispforest.owo.itemgroup';
  import { List, Collection } from 'java.util';
  import { ItemGroupTab, ItemGroupButton } from 'io.wispforest.owo.itemgroup.gui';

  interface OwoItemGroupLoader extends ModDataConsumer {}
  class OwoItemGroupLoader extends ModDataConsumer {
    static readonly INSTANCE: OwoItemGroupLoader;
    acceptParsedFile(id: ResourceLocation, json: JsonObject): void;
    get dataSubdirectory(): string;
    static initItemGroupCallback(): void;
    static onGroupCreated(group: CreativeModeTab): void;
  }


  interface WrapperGroup extends OwoItemGroup {}
  class WrapperGroup extends OwoItemGroup {
    constructor(parent: CreativeModeTab, parentId: ResourceLocation, tabs: ItemGroupTab[], buttons: ItemGroupButton[]);
    addButtons(buttons: Collection<ItemGroupButton>): void;
    addTabs(tabs: Collection<ItemGroupTab>): void;
    markExtension(): void;
  }

}

declare module 'io.wispforest.owo.itemgroup.OwoItemGroup' {
  import { Consumer } from 'java.util.function';
  import { OwoItemGroup, Icon } from 'io.wispforest.owo.itemgroup';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Component } from 'net.minecraft.network.chat';
  import { CreativeModeTab } from 'net.minecraft.world.item';

  class Builder {
    backgroundTexture(backgroundTexture: ResourceLocation): Builder;
    build(): OwoItemGroup;
    buttonStackHeight(buttonStackHeight: number): Builder;
    disableDynamicTitle(): Builder;
    displaySingleTab(): Builder;
    initializer(initializer: Consumer<OwoItemGroup>): Builder;
    scrollerTextures(scrollerTextures: ScrollerTextures): Builder;
    tabStackHeight(tabStackHeight: number): Builder;
    tabTextures(tabTextures: TabTextures): Builder;
    withoutMultipleSelection(): Builder;
  }


  class ButtonDefinition {
    icon(): Icon;
    texture(): ResourceLocation;
    tooltip(): Component;
    static tooltipFor(group: CreativeModeTab, component: string, componentName: string): Component;
  }

}

declare module 'io.wispforest.owo.mixin' {
  import { VertexFormat, PoseStack } from 'com.mojang.blaze3d.vertex';
  import { Mode } from 'VertexFormat';
  import { Provider } from 'HolderLookup';
  import { Connection } from 'net.minecraft.network';
  import { ClientCommonPacketListenerImpl } from 'net.minecraft.client.multiplayer';
  import { ClientboundFinishConfigurationPacket } from 'net.minecraft.network.protocol.configuration';
  import { CallbackInfo, CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { OwoClientConnectionExtension } from 'io.wispforest.owo.network';
  import { Set, List, Map } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { OwoComponentTypeBuilder } from 'io.wispforest.owo.serialization';
  import { MatrixStackTransformer } from 'io.wispforest.owo.ui.util';
  import { DynamicOps } from 'com.mojang.serialization';
  import { MapCarrier, EndecBuffer } from 'io.wispforest.endec.util';
  import { Tag } from 'net.minecraft.nbt';
  import { SerializationContext, Endec } from 'io.wispforest.endec';
  import { KeyedEndec, ReflectiveEndecBuilder } from 'io.wispforest.endec.impl';
  import { RegistryInfoLookup } from 'RegistryOps';
  import { CubeMap, PanoramaRenderer } from 'net.minecraft.client.renderer';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { ItemStack } from 'net.minecraft.world.item';
  import { OwoScreenHandler, SyncedProperty, Record } from 'io.wispforest.owo.client.screens';
  import { OwoScreenHandlerExtension } from 'io.wispforest.owo.util.pond';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Class } from 'java.lang';
  import { Consumer } from 'java.util.function';
  import { LocalPacket, SyncPropertiesPacket } from 'io.wispforest.owo.client.screens.ScreenInternals';
  import { MinecraftServer } from 'net.minecraft.server';
  import { SetComponentsFunction } from 'net.minecraft.world.level.storage.loot.functions';
  import { LootItemCondition } from 'net.minecraft.world.level.storage.loot.predicates';
  import { DataComponentPatch } from 'net.minecraft.core.component';
  import { ResourceManager } from 'net.minecraft.server.packs.resources';
  import { EntryWithSource } from 'TagLoader';

  class BufferBuilderAccessor {
    get drawMode(): Mode;
    get format(): VertexFormat;
    isBuilding(): boolean;
  }


  class CachedRegistryInfoGetterAccessor {
    owo$getRegistriesLookup(): Provider;
  }


  class ClientCommonNetworkHandlerAccessor {
    get connection(): Connection;
  }


  interface ClientConfigurationNetworkHandlerMixin extends ClientCommonPacketListenerImpl {}
  class ClientConfigurationNetworkHandlerMixin extends ClientCommonPacketListenerImpl {
    owoNeo$handleComplete(packet: ClientboundFinishConfigurationPacket, ci: CallbackInfo): void;
  }


  interface ClientConnectionMixin extends OwoClientConnectionExtension {}
  class ClientConnectionMixin extends OwoClientConnectionExtension {
    owo$getChannelSet(): Set<ResourceLocation>;
    owo$setChannelSet(channels: Set<ResourceLocation>): void;
  }


  class ClientLoginNetworkHandlerAccessor {
    owo$getConnection(): Connection;
  }


  interface ComponentTypeBuilderMixin<T = any> extends OwoComponentTypeBuilder<T> {}
  class ComponentTypeBuilderMixin<T = any> extends OwoComponentTypeBuilder<T> {
  }


  class Copenhagen {
  }


  class DataResultMixin {
  }


  interface DrawContextMixin extends MatrixStackTransformer {}
  class DrawContextMixin extends MatrixStackTransformer {
    get matrixStack(): PoseStack;
    pose(): PoseStack;
  }


  class ForwardingDynamicOpsAccessor<T = any> {
    owo$delegate(): DynamicOps<T>;
  }


  class MainMixin {
  }


  class MinecraftClientMixin {
  }


  interface NbtCompoundMixin extends MapCarrier {}
  class NbtCompoundMixin extends MapCarrier {
    contains(var1: string): boolean;
    delete<T>(key: KeyedEndec<T>): void;
    get(var1: string): Tag;
    getWithErrors<T>(ctx: SerializationContext, key: KeyedEndec<T>): T;
    has<T>(key: KeyedEndec<T>): boolean;
    put(var1: string, var2: Tag): Tag;
    put<T>(ctx: SerializationContext, key: KeyedEndec<T>, value: T): void;
    remove(var1: string): void;
  }


  interface PacketByteBufMixin extends EndecBuffer {}
  class PacketByteBufMixin extends EndecBuffer {
    read<T>(ctx: SerializationContext, endec: Endec<T>): T;
    write<T>(ctx: SerializationContext, endec: Endec<T>, value: T): void;
  }


  class RegistryOpsAccessor {
    owo$infoGetter(): RegistryInfoLookup;
  }


  class ScreenAccessor {
    static owo$PANORAMA_RENDERER(): CubeMap;
    static owo$ROTATING_PANORAMA_RENDERER(): PanoramaRenderer;
    owo$addDrawableChild<T extends GuiEventListener & Renderable>(var1: T): T;
  }


  class ScreenHandlerInvoker {
    owo$insertItem(var1: ItemStack, var2: number, var3: number, var4: boolean): boolean;
  }


  interface ScreenHandlerMixin extends OwoScreenHandler, OwoScreenHandlerExtension {}
  class ScreenHandlerMixin extends OwoScreenHandler {
    addClientboundMessage<R extends Record>(messageClass: Class<R>, endec: Endec<R>, handler: Consumer<R>): void;
    addClientboundMessage<R extends Record>(messageClass: Class<R>, endec: Endec<R>, handler: Consumer<R>): void;
    addClientboundMessage<R extends Record>(messageClass: Class<R>, handler: Consumer<R>): void;
    addServerboundMessage<R extends Record>(messageClass: Class<R>, endec: Endec<R>, handler: Consumer<R>): void;
    addServerboundMessage<R extends Record>(messageClass: Class<R>, endec: Endec<R>, handler: Consumer<R>): void;
    addServerboundMessage<R extends Record>(messageClass: Class<R>, handler: Consumer<R>): void;
    createProperty<T>(clazz: Class<T>, endec: Endec<T>, initial: T): SyncedProperty<T>;
    createProperty<T>(clazz: Class<T>, initial: T): SyncedProperty<T>;
    endecBuilder(): ReflectiveEndecBuilder;
    owo$attachToPlayer(player: Player): void;
    owo$handlePacket(packet: LocalPacket, clientbound: boolean): void;
    owo$readPropertySync(packet: SyncPropertiesPacket): void;
    player(): Player;
    sendMessage<R extends Record>(message: R): void;
    sendMessage<R extends Record>(message: R): void;
  }


  class ServerCommonNetworkHandlerAccessor {
    owo$getConnection(): Connection;
    owo$server(): MinecraftServer;
  }


  class ServerPlayerEntityMixin {
  }


  class ServerPlayerInteractionManagerMixin {
  }


  class SetComponentsLootFunctionAccessor {
    static createSetComponentsLootFunction(list: LootItemCondition[], componentChanges: DataComponentPatch): SetComponentsFunction;
  }


  class TagGroupLoaderMixin {
    injectValues(manager: ResourceManager, cir: CallbackInfoReturnable<Map<ResourceLocation, EntryWithSource[]>>): void;
  }

}

declare module 'io.wispforest.owo.mixin.DataResultMixin' {
  import { Supplier } from 'java.util.function';

  class DataResultErrorMixin<R = any> {
    messageSupplier(): Supplier<string>;
  }

}

declare module 'io.wispforest.owo.mixin.ext' {
  import { DataComponentMap } from 'net.minecraft.core.component';
  import { OwoItem } from 'io.wispforest.owo.ext';

  class ComponentMapImplAccessor {
    owo$getBaseComponents(): DataComponentMap;
    owo$setBaseComponents(var1: DataComponentMap): void;
  }


  class ComponentMapImplMixin {
  }


  interface ItemMixin extends OwoItem {}
  class ItemMixin extends OwoItem {
  }


  class ItemStackMixin {
  }

}

declare module 'io.wispforest.owo.mixin.itemgroup' {
  import { CreativeModeTab, ItemStack, Item } from 'net.minecraft.world.item';
  import { EffectRenderingInventoryScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { OwoCreativeInventoryScreenExtensions, OwoItemExtensions } from 'io.wispforest.owo.util.pond';
  import { ItemPickerMenu } from 'CreativeModeInventoryScreen';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { DisplayItemsGenerator, Row, Output } from 'CreativeModeTab';
  import { Set } from 'java.util';
  import { BiConsumer, Supplier } from 'java.util.function';
  import { OwoItemSettingsExtension, ItemGroupReference, OwoItemGroup } from 'io.wispforest.owo.itemgroup';
  import { Properties } from 'Item';

  class AbstractInventoryScreenMixin {
  }


  class CreativeInventoryScreenAccessor {
    static owo$getSelectedTab(): CreativeModeTab;
  }


  interface CreativeInventoryScreenMixin extends OwoCreativeInventoryScreenExtensions, EffectRenderingInventoryScreen<ItemPickerMenu> {}
  class CreativeInventoryScreenMixin extends OwoCreativeInventoryScreenExtensions {
    constructor(screenHandler: ItemPickerMenu, playerInventory: Inventory, text: Component);
    owo$getRootX(): number;
    owo$getRootY(): number;
  }


  class ItemGroupAccessor {
    owo$getEntryCollector(): DisplayItemsGenerator;
    owo$setColumn(var1: number): void;
    owo$setDisplayName(var1: Component): void;
    owo$setEntryCollector(var1: DisplayItemsGenerator): void;
    owo$setRow(var1: Row): void;
    owo$setSearchTabStacks(var1: Set<ItemStack>): void;
  }


  interface ItemMixin extends OwoItemExtensions {}
  class ItemMixin extends OwoItemExtensions {
    owo$group(): CreativeModeTab;
    owo$setGroup(group: Supplier<CreativeModeTab>): void;
    owo$setGroup(group: CreativeModeTab): void;
    owo$shouldTrackUsageStat(): boolean;
    owo$stackGenerator(): BiConsumer<Item, Output>;
    owo$tab(): number;
  }


  interface ItemSettingsMixin extends OwoItemSettingsExtension {}
  class ItemSettingsMixin extends OwoItemSettingsExtension {
    group(ref: ItemGroupReference): Properties;
    group(group: OwoItemGroup): Properties;
    group(groupSupplier: Supplier<OwoItemGroup>): Properties;
    group(): OwoItemGroup;
    groupSupplier(): Supplier<OwoItemGroup>;
    shouldTrackUsageStat(): boolean;
    stackGenerator(generator: BiConsumer<Item, Output>): Properties;
    stackGenerator(): BiConsumer<Item, Output>;
    tab(tab: number): Properties;
    tab(): number;
    trackUsageStat(): Properties;
  }


  class MixinCreativeInventoryScreenMixin {
  }

}

declare module 'io.wispforest.owo.mixin.neoforge' {
  class ClientConnectionDisconnectHookMixin {
  }


  class NetworkRegistryMixin {
  }

}

declare module 'io.wispforest.owo.mixin.offline' {
  import { AdvancementRequirements, AdvancementProgress } from 'net.minecraft.advancements';
  import { Map } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { CompoundTag } from 'net.minecraft.nbt';

  class AdvancementProgressAccessor {
    get requirements(): AdvancementRequirements;
    set requirements(var1: AdvancementRequirements);
  }


  class PlayerAdvancementTrackerMixin {
  }


  class ProgressMapAccessor {
    get map(): Map<ResourceLocation, AdvancementProgress>;
  }


  class WorldSaveHandlerMixin {
    onPlayerDataSaved(player: Player, ci: CallbackInfo, tag: CompoundTag): void;
  }

}

declare module 'io.wispforest.owo.mixin.recipe_remainders' {
  import { ThreadLocal } from 'java.lang';

  class CraftingResultSlotMixin {
  }


  class RecipeManagerMixin {
    readonly previousMapEntry: ThreadLocal;
  }

}

declare module 'io.wispforest.owo.mixin.registry' {
  import { ResourceKey } from 'net.minecraft.resources';
  import { BaseMappedRegistry } from 'net.neoforged.neoforge.registries';
  import { WritableRegistry, RegistrationInfo } from 'net.minecraft.core';
  import { OwoSimpleRegistryExtensions } from 'io.wispforest.owo.util.pond';
  import { Reference } from 'Holder';

  class ReferenceAccessor<T = any> {
    owo$setRegistryKey(var1: ResourceKey<T>): void;
    owo$setValue(var1: T): void;
  }


  interface SimpleRegistryMixin<T = any> extends WritableRegistry<T>, OwoSimpleRegistryExtensions<T>, BaseMappedRegistry<T> {}
  class SimpleRegistryMixin<T = any> extends WritableRegistry<T> {
    owo$set(id: number, arg: ResourceKey<T>, object: T, arg2: RegistrationInfo): Reference<T>;
  }

}

declare module 'io.wispforest.owo.mixin.shader' {
  import { Map } from 'java.util';
  import { Uniform } from 'com.mojang.blaze3d.shaders';

  class GameRendererMixin {
  }


  class ShaderProgramAccessor {
    owo$getLoadedUniforms(): Map<string, Uniform>;
  }


  class ShaderProgramMixin {
  }

}

declare module 'io.wispforest.owo.mixin.text' {
  import { DataResult, DynamicOps, MapLike, RecordBuilder } from 'com.mojang.serialization';
  import { Pair } from 'com.mojang.datafixers.util';
  import { Stream } from 'java.util.stream';

  class LanguageMixin {
  }


  class TextCodecsMixin {
    decode<T1>(ops: DynamicOps<T1>, input: T1): DataResult<Pair<T, T1>>;
    decode<T1>(ops: DynamicOps<T1>, input: MapLike<T1>): DataResult<E>;
    encode<T1>(input: T, ops: DynamicOps<T1>, prefix: T1): DataResult<T1>;
    encode<T1>(input: E, ops: DynamicOps<T1>, prefix: RecordBuilder<T1>): RecordBuilder<T1>;
    keys<T1>(ops: DynamicOps<T1>): Stream<T1>;
  }


  class TranslationStorageMixin {
  }

}

declare module 'io.wispforest.owo.mixin.tweaks' {
  import { URI } from 'java.net';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { Component } from 'net.minecraft.network.chat';

  class EulaReaderMixin {
    hasAgreedToEULA(): boolean;
  }


  class LevelInfoMixin {
  }


  class OperatingSystemMixin {
    openUri(uri: URI): void;
  }


  interface TextFieldWidgetMixin extends AbstractWidget {}
  class TextFieldWidgetMixin extends AbstractWidget {
    constructor(x: number, y: number, width: number, height: number, message: Component);
  }

}

declare module 'io.wispforest.owo.mixin.ui.access' {
  import { OwoUIAdapter } from 'io.wispforest.owo.ui.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { OnPress } from 'Button';
  import { MultiLineTextWidget, WidgetTooltipHolder, MultilineTextField } from 'net.minecraft.client.gui.components';
  import { Observable } from 'io.wispforest.owo.util';

  class BaseOwoHandledScreenAccessor {
    owo$getUIAdapter(): OwoUIAdapter<any>;
  }


  class BlockEntityAccessor {
    owo$setCachedState(var1: BlockState): void;
  }


  class ButtonWidgetAccessor {
    owo$setOnPress(var1: OnPress): void;
  }


  class CheckboxWidgetAccessor {
    owo$getTextWidget(): MultiLineTextWidget;
    owo$setChecked(var1: boolean): void;
  }


  class ClickableWidgetAccessor {
    owo$getTooltip(): WidgetTooltipHolder;
    owo$setHeight(var1: number): void;
    owo$setWidth(var1: number): void;
    owo$setX(var1: number): void;
    owo$setY(var1: number): void;
  }


  class EditBoxAccessor {
    owo$getSelectionEnd(): number;
    owo$setSelectionEnd(var1: number): void;
    owo$setWidth(var1: number): void;
  }


  class EditBoxWidgetAccessor {
    owo$getEditBox(): MultilineTextField;
  }


  class TextBoxComponentAccessor {
    owo$textValue(): Observable<string>;
  }


  class TextFieldWidgetAccessor {
    owo$drawsBackground(): boolean;
  }

}

declare module 'io.wispforest.owo.mixin.ui' {
  import { ComponentStub, GreedyInputComponent } from 'io.wispforest.owo.ui.inject';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { Size, ParentComponent, Component, Positioning, AnimatableProperty, Insets, Sizing, OwoUIDrawContext, CursorStyle, PositionedRectangle } from 'io.wispforest.owo.ui.core';
  import { DismountReason, FocusSource } from 'io.wispforest.owo.ui.core.Component';
  import { FocusHandler } from 'io.wispforest.owo.ui.util';
  import { EventSource } from 'io.wispforest.owo.util';
  import { MouseDown, MouseUp, MouseScroll, MouseDrag, KeyPress, CharTyped, FocusGained, FocusLost, MouseEnter, MouseLeave } from 'io.wispforest.owo.ui.event';
  import { Consumer } from 'java.util.function';
  import { UIModel } from 'io.wispforest.owo.ui.parsing';
  import { Element } from 'org.w3c.dom';
  import { Map, List, Collection } from 'java.util';
  import { ClientTooltipComponent, ClientTooltipPositioner } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { VanillaWidgetComponent } from 'io.wispforest.owo.ui.component';
  import { Component as net_minecraft_network_chat_Component } from 'net.minecraft.network.chat';
  import { Font } from 'net.minecraft.client.gui';
  import { PoseStack, BufferBuilder } from 'com.mojang.blaze3d.vertex';
  import { ScissorStack } from 'GuiGraphics';
  import { AbstractScrollWidget, AbstractWidget } from 'net.minecraft.client.gui.components';
  import { OwoEntityRenderDispatcherExtension, OwoSlotExtension, OwoTessellatorExtension } from 'io.wispforest.owo.util.pond';
  import { Camera } from 'net.minecraft.client';
  import { Screen } from 'net.minecraft.client.gui.screens';

  class ChatScreenMixin {
  }


  interface ClickableWidgetMixin extends ComponentStub, GuiEventListener {}
  class ClickableWidgetMixin extends ComponentStub {
    active: boolean;
    canFocus(source: FocusSource): boolean;
    charTyped(): EventSource<CharTyped>;
    configure<C extends Component>(closure: Consumer<C>): C;
    cursorStyle(): CursorStyle;
    cursorStyle(style: CursorStyle): Component;
    dismount(reason: DismountReason): void;
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    focusGained(): EventSource<FocusGained>;
    focusHandler(): FocusHandler;
    focusLost(): EventSource<FocusLost>;
    height(): number;
    heightOffset(): number;
    horizontalSizing(horizontalSizing: Sizing): Component;
    horizontalSizing(): AnimatableProperty<Sizing>;
    id(id: string): Component;
    id(): string;
    inflate(space: Size): void;
    keyPress(): EventSource<KeyPress>;
    margins(margins: Insets): Component;
    margins(): AnimatableProperty<Insets>;
    mount(parent: ParentComponent, x: number, y: number): void;
    mouseDown(): EventSource<MouseDown>;
    mouseDrag(): EventSource<MouseDrag>;
    mouseEnter(): EventSource<MouseEnter>;
    mouseLeave(): EventSource<MouseLeave>;
    mouseScroll(): EventSource<MouseScroll>;
    mouseUp(): EventSource<MouseUp>;
    onCharTyped(chr: string, modifiers: number): boolean;
    onFocusGained(source: FocusSource): void;
    onFocusLost(): void;
    onKeyPress(keyCode: number, scanCode: number, modifiers: number): boolean;
    onMouseDown(mouseX: number, mouseY: number, button: number): boolean;
    onMouseDrag(mouseX: number, mouseY: number, deltaX: number, deltaY: number, button: number): boolean;
    onMouseScroll(mouseX: number, mouseY: number, amount: number): boolean;
    onMouseUp(mouseX: number, mouseY: number, button: number): boolean;
    parent(): ParentComponent;
    parseProperties(spec: UIModel, element: Element, children: Map<string, Element>): void;
    positioning(positioning: Positioning): Component;
    positioning(): AnimatableProperty<Positioning>;
    shouldDrawTooltip(mouseX: number, mouseY: number): boolean;
    tooltip(tooltip: ClientTooltipComponent[]): Component;
    tooltip(): ClientTooltipComponent[];
    tooltip(tooltip: Collection<net_minecraft_network_chat_Component>): Component;
    tooltip(tooltip: net_minecraft_network_chat_Component): Component;
    update(delta: number, mouseX: number, mouseY: number): void;
    updateX(x: number): void;
    updateY(y: number): void;
    verticalSizing(verticalSizing: Sizing): Component;
    verticalSizing(): AnimatableProperty<Sizing>;
    widgetWrapper(): VanillaWidgetComponent;
    width(): number;
    widthOffset(): number;
    x(): number;
    xOffset(): number;
    y(): number;
    yOffset(): number;
    zIndex(zIndex: number): Component;
    zIndex(): number;
  }


  class DrawContextInvoker {
    owo$getMatrices(): PoseStack;
    owo$getScissorStack(): ScissorStack;
    owo$renderTooltipFromComponents(var1: Font, var2: ClientTooltipComponent[], var3: number, var4: number, var5: ClientTooltipPositioner): void;
    owo$setMatrices(var1: PoseStack): void;
    owo$setScissorStack(var1: ScissorStack): void;
  }


  class DrawContextMixin {
  }


  interface EditBoxWidgetMixin extends GreedyInputComponent, AbstractScrollWidget {}
  class EditBoxWidgetMixin extends GreedyInputComponent {
    constructor(i: number, j: number, k: number, l: number, text: Component);
    onFocusGained(source: FocusSource): void;
  }


  interface EntityRenderDispatcherMixin extends OwoEntityRenderDispatcherExtension {}
  class EntityRenderDispatcherMixin extends OwoEntityRenderDispatcherExtension {
    camera: Camera;
    owo$counterRotate(): boolean;
    owo$setCounterRotate(counterRotate: boolean): void;
    owo$setShowNametag(showNametag: boolean): void;
    owo$showNametag(): boolean;
  }


  class EntityRendererMixin<T extends Entity = any> {
  }


  interface HandledScreenMixin extends Screen {}
  class HandledScreenMixin extends Screen {
  }


  class MinecraftClientMixin {
    screen: Screen;
  }


  class RenderSystemMixin {
  }


  class ScreenMixin {
  }


  interface SliderWidgetMixin extends AbstractWidget {}
  class SliderWidgetMixin extends AbstractWidget {
    constructor(x: number, y: number, width: number, height: number, message: net_minecraft_network_chat_Component);
  }


  class SlotAccessor {
    owo$setX(var1: number): void;
    owo$setY(var1: number): void;
  }


  interface SlotMixin extends OwoSlotExtension {}
  class SlotMixin extends OwoSlotExtension {
    owo$getDisabledOverride(): boolean;
    owo$getScissorArea(): PositionedRectangle;
    owo$setDisabledOverride(disabled: boolean): void;
    owo$setScissorArea(scissor: PositionedRectangle): void;
  }


  interface TessellatorMixin extends OwoTessellatorExtension {}
  class TessellatorMixin extends OwoTessellatorExtension {
    owo$getStoredBuilder(): BufferBuilder;
    owo$setStoredBuilder(builder: BufferBuilder): void;
    owo$skipNextBegin(): void;
  }


  interface TextFieldWidgetMixin extends GreedyInputComponent, AbstractWidget {}
  class TextFieldWidgetMixin extends GreedyInputComponent {
    constructor(x: number, y: number, width: number, height: number, message: Component);
    onFocusGained(source: FocusSource): void;
  }

}

declare module 'io.wispforest.owo.mixin.ui.layers' {
  import { AbstractContainerEventHandler } from 'net.minecraft.client.gui.components.events';
  import { OwoScreenExtension } from 'io.wispforest.owo.util.pond';
  import { Instance } from 'io.wispforest.owo.ui.layers.Layer';
  import { Layer } from 'io.wispforest.owo.ui.layers';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ParentComponent } from 'io.wispforest.owo.ui.core';
  import { List } from 'java.util';

  class HandledScreenAccessor {
    owo$getRootX(): number;
    owo$getRootY(): number;
  }


  class KeyboardMixin {
  }


  class MouseMixin {
  }


  interface ScreenMixin extends OwoScreenExtension, AbstractContainerEventHandler {}
  class ScreenMixin extends OwoScreenExtension {
    width: number;
    height: number;
    owo$getInstance<S extends Screen, R extends ParentComponent>(layer: Layer<S, R>): Instance;
    owo$getInstancesView(): Instance[];
    owo$updateLayers(): void;
  }

}

declare module 'io.wispforest.owo.moddata' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { JsonObject } from 'com.google.gson';

  class ModDataConsumer {
    acceptParsedFile(var1: ResourceLocation, var2: JsonObject): void;
    get dataSubdirectory(): string;
  }


  class ModDataLoader {
    static load(consumer: ModDataConsumer): void;
  }

}

declare module 'io.wispforest.owo.network' {
  import { EnvironmentAccess, ChannelHandler, ClientHandle, ServerHandle } from 'io.wispforest.owo.network.OwoNetChannel';
  import { LocalPlayer } from 'net.minecraft.client.player';
  import { Minecraft } from 'net.minecraft.client';
  import { ClientPacketListener, ClientConfigurationPacketListenerImpl } from 'net.minecraft.client.multiplayer';
  import { IllegalStateException, Class } from 'java.lang';
  import { Set, Collection } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { PayloadRegistrar } from 'net.neoforged.neoforge.network.registration';
  import { Consumer } from 'java.util.function';
  import { ReflectiveEndecBuilder } from 'io.wispforest.endec.impl';
  import { StructEndec } from 'io.wispforest.endec';
  import { ServerPlayer, ServerLevel } from 'net.minecraft.server.level';
  import { ServerGamePacketListenerImpl } from 'net.minecraft.server.network';
  import { MinecraftServer } from 'net.minecraft.server';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockPos } from 'net.minecraft.core';

  interface ClientAccess extends EnvironmentAccess<LocalPlayer, Minecraft, ClientPacketListener> {}
  class ClientAccess extends EnvironmentAccess<LocalPlayer, Minecraft, ClientPacketListener> {
    constructor(netHandler: ClientPacketListener);
    netHandler(): ClientPacketListener;
    player(): LocalPlayer;
    runtime(): Minecraft;
  }


  interface NetworkException extends IllegalStateException {}
  class NetworkException extends IllegalStateException {
    constructor(cause: string);
  }


  class OwoClientConnectionExtension {
    owo$getChannelSet(): Set<ResourceLocation>;
    owo$setChannelSet(var1: Set<ResourceLocation>): void;
  }


  class OwoHandshake {
    static readonly CHANNEL_ID: ResourceLocation;
    static readonly OFF_CHANNEL_ID: ResourceLocation;
    static enable(): void;
    static handleReadyClient(handler: ClientConfigurationPacketListenerImpl, client: Minecraft): void;
    static isValidClient(): boolean;
    static onDisconnect(): void;
    static register(registrar: PayloadRegistrar): void;
    static requireHandshake(): void;
  }


  class OwoNetChannel {
    addEndecs(endecBuilder: Consumer<ReflectiveEndecBuilder>): OwoNetChannel;
    builder(): ReflectiveEndecBuilder;
    canSendToPlayer(player: ServerPlayer): boolean;
    canSendToPlayer(networkHandler: ServerGamePacketListenerImpl): boolean;
    canSendToServer(): boolean;
    clientHandle(): ClientHandle;
    static create(id: ResourceLocation): OwoNetChannel;
    static createOptional(id: ResourceLocation): OwoNetChannel;
    registerClientbound<R extends Record>(messageClass: Class<R>, handler: ChannelHandler<R, ClientAccess>): void;
    registerClientbound<R extends Record>(messageClass: Class<R>, endec: StructEndec<R>, handler: ChannelHandler<R, ClientAccess>): void;
    registerClientboundDeferred<R extends Record>(messageClass: Class<R>): void;
    registerClientboundDeferred<R extends Record>(messageClass: Class<R>, endec: StructEndec<R>): void;
    registerServerbound<R extends Record>(messageClass: Class<R>, handler: ChannelHandler<R, ServerAccess>): void;
    registerServerbound<R extends Record>(messageClass: Class<R>, endec: StructEndec<R>, handler: ChannelHandler<R, ServerAccess>): void;
    serverHandle(server: MinecraftServer): ServerHandle;
    serverHandle(targets: Collection<ServerPlayer>): ServerHandle;
    serverHandle(player: Player): ServerHandle;
    serverHandle(entity: BlockEntity): ServerHandle;
    serverHandle(world: ServerLevel, pos: BlockPos): ServerHandle;
  }


  class QueuedChannelSet {
    static channels: Set;
  }


  interface ServerAccess extends EnvironmentAccess<ServerPlayer, MinecraftServer, ServerGamePacketListenerImpl>, Record {}
  class ServerAccess extends EnvironmentAccess<ServerPlayer, MinecraftServer, ServerGamePacketListenerImpl> {
    constructor(player: ServerPlayer);
    equals(o: any): boolean;
    hashCode(): number;
    netHandler(): ServerGamePacketListenerImpl;
    player(): ServerPlayer;
    runtime(): MinecraftServer;
    toString(): string;
  }

}

declare module 'io.wispforest.owo.network.neoforge' {
  import { Map } from 'java.util';
  import { RegisterPayloadHandlersEvent } from 'net.neoforged.neoforge.network.event';
  import { Type } from 'CustomPacketPayload';
  import { MessagePayload } from 'io.wispforest.owo.network.OwoNetChannel';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { PayloadHandler } from 'io.wispforest.owo.network.neoforge.NeoOwoNetworking';

  class NeoOwoNetworking {
    static readonly PAYLOAD_ID_TO_SIDED_CODEC: Map;
    static readonly PAYLOAD_ID_TO_CLIENT_CODEC: Map;
    static readonly PAYLOAD_ID_TO_CLIENT_HANDLER: Map;
    static readonly PAYLOAD_ID_TO_SERVER_PAYLOAD_HANDLER: Map;
    static readonly PAYLOAD_ID_TO_CLIENT_PAYLOAD_HANDLER: Map;
    static onNetworkRegister(event: RegisterPayloadHandlersEvent): void;
    static registerClientCodec<T extends CustomPacketPayload>(id: Type<T>, codec: StreamCodec<FriendlyByteBuf, T>): void;
    static registerClientMessageHandler(id: Type<MessagePayload>, handler: PayloadHandler<MessagePayload>): void;
    static registerClientPayload<T extends CustomPacketPayload>(id: Type<T>, payloadHandler: PayloadHandler<T>): void;
    static registerMessageCodecs(id: Type<MessagePayload>, serverCodec: StreamCodec<FriendlyByteBuf, MessagePayload>, clientCodec: StreamCodec<FriendlyByteBuf, MessagePayload>): void;
    static registerServerMessageHandler(id: Type<MessagePayload>, handler: PayloadHandler<MessagePayload>): void;
  }

}

declare module 'io.wispforest.owo.network.neoforge.NeoOwoNetworking' {
  import { BiConsumer } from 'java.util.function';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';

  interface PayloadHandler<T extends CustomPacketPayload = any> extends BiConsumer<T, Player> {}
  class PayloadHandler<T extends CustomPacketPayload = any> extends BiConsumer<T, Player> {
    accept(var1: T, var2: Player): void;
    static empty<P extends CustomPacketPayload>(): PayloadHandler<P>;
  }

}

declare module 'io.wispforest.owo.network.OwoNetChannel' {
  import { Record } from 'io.wispforest.owo.network';
  import { Class } from 'java.lang';
  import { StructEndec } from 'io.wispforest.endec';
  import { Dist } from 'net.neoforged.api.distmarker';

  class ClientHandle {
    send<R extends Record>(message: R): void;
    send<R extends Record>(...messages: R[]): void;
  }


  class ServerHandle {
    send<R extends Record>(message: R): void;
    send<R extends Record>(...messages: R[]): void;
  }


  class ChannelHandler<R extends Record = any, E extends EnvironmentAccess<any, any, any> = any> {
    handle(var1: R, var2: E): void;
  }


  class IndexedEndec<R extends Record = any> {
    static create<R extends Record>(rClass: Class<R>, endec: StructEndec<R>, index: number, target: Dist): IndexedEndec<R>;
    get recordClass(): Class<R>;
    handlerIndex(target: Dist): number;
    setHandlerIndex(index: number, target: Dist): IndexedEndec<R>;
  }


  class EnvironmentAccess<P extends Player = any, R = any, N = any> {
    netHandler(): N;
    player(): P;
    runtime(): R;
  }

}

declare module 'io.wispforest.owo.offline' {
  import { Event } from 'net.fabricmc.fabric.api.event';
  import { Codec } from 'com.mojang.serialization';
  import { UUID, Map, List } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { AdvancementProgress, AdvancementHolder } from 'net.minecraft.advancements';
  import { Consumer, Function } from 'java.util.function';
  import { CompoundTag } from 'net.minecraft.nbt';

  class DataSavedEvents {
    static readonly PLAYER_DATA: Event;
    static readonly ADVANCEMENTS: Event;
  }


  class OfflineAdvancementLookup {
    static readonly CODEC: Codec;
    static edit(player: UUID, editor: Consumer<OfflineAdvancementState>): void;
    static get(player: UUID): Map<ResourceLocation, AdvancementProgress>;
    static put(player: UUID, map: Map<ResourceLocation, AdvancementProgress>): void;
    static savedPlayers(): UUID[];
  }


  class OfflineAdvancementState {
    advancementData(): Map<ResourceLocation, AdvancementProgress>;
    getOrAddProgress(advancement: AdvancementHolder): AdvancementProgress;
    grant(advancement: AdvancementHolder): void;
    revoke(advancement: AdvancementHolder): void;
  }


  class OfflineDataLookup {
    static edit(player: UUID, editor: Function<CompoundTag, CompoundTag>): void;
    static get(player: UUID): CompoundTag;
    static put(player: UUID, nbt: CompoundTag): void;
    static savedPlayers(): UUID[];
  }

}

declare module 'io.wispforest.owo.offline.DataSavedEvents' {
  import { UUID, Map } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { AdvancementProgress } from 'net.minecraft.advancements';
  import { CompoundTag } from 'net.minecraft.nbt';

  class Advancements {
    onSaved(var1: UUID, var2: Map<ResourceLocation, AdvancementProgress>): void;
  }


  class PlayerData {
    onSaved(var1: UUID, var2: CompoundTag): void;
  }

}

declare module 'io.wispforest.owo.ops' {
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { InteractionHand } from 'net.minecraft.world';
  import { Provider } from 'HolderLookup';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ItemLike, Level } from 'net.minecraft.world.level';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { MutableComponent, Component } from 'net.minecraft.network.chat';
  import { ChatFormatting } from 'net.minecraft';
  import { Font } from 'net.minecraft.client.gui';
  import { Iterable } from 'java.lang';
  import { FormattedCharSequence } from 'net.minecraft.util';
  import { BlockPos } from 'net.minecraft.core';
  import { Entity } from 'net.minecraft.world.entity';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';
  import { ServerPlayer, ServerLevel } from 'net.minecraft.server.level';

  class ItemOps {
    static canIncrease(stack: ItemStack): boolean;
    static canIncreaseBy(stack: ItemStack, by: number): boolean;
    static canStack(base: ItemStack, addition: ItemStack): boolean;
    static decrementPlayerHandItem(player: Player, hand: InteractionHand): boolean;
    static decrementPlayerHandItem(player: Player, hand: InteractionHand, amount: number): boolean;
    static emptyAwareDecrement(stack: ItemStack): boolean;
    static emptyAwareDecrement(stack: ItemStack, amount: number): boolean;
    static get(registries: Provider, nbt: CompoundTag, key: string): ItemStack;
    static singleCopy(stack: ItemStack): ItemStack;
    static store(registries: Provider, stack: ItemStack, nbt: CompoundTag, key: string): void;
  }


  class LootOps {
    static anyMatch(target: ResourceLocation, ...predicates: ResourceLocation[]): boolean;
    static injectItem(item: ItemLike, chance: number, ...targetTables: ResourceLocation[]): void;
    static injectItemStack(stack: ItemStack, chance: number, ...targetTables: ResourceLocation[]): void;
    static injectItemWithCount(item: ItemLike, chance: number, min: number, max: number, ...targetTables: ResourceLocation[]): void;
    static registerListener(): void;
  }


  class TextOps {
    static color(formatting: ChatFormatting): number;
    static concat(prefix: Component, text: Component): MutableComponent;
    static translateWithColor(text: string, color: number): MutableComponent;
    static width(renderer: Font, texts: Iterable<Component>): number;
    static widthOrdered(renderer: Font, texts: Iterable<FormattedCharSequence>): number;
    static withColor(text: string, color: number): MutableComponent;
    static withColor(text: string, ...colors: number[]): MutableComponent;
    static withFormatting(text: string, ...formatting: ChatFormatting[]): MutableComponent;
  }


  class WorldOps {
    static breakBlockWithItem(world: Level, pos: BlockPos, breakItem: ItemStack): void;
    static breakBlockWithItem(world: Level, pos: BlockPos, breakItem: ItemStack, breakingEntity: Entity): void;
    static playSound(world: Level, pos: Vec3, sound: SoundEvent, category: SoundSource): void;
    static playSound(world: Level, pos: BlockPos, sound: SoundEvent, category: SoundSource): void;
    static playSound(world: Level, pos: Vec3, sound: SoundEvent, category: SoundSource, volume: number, pitch: number): void;
    static playSound(world: Level, pos: BlockPos, sound: SoundEvent, category: SoundSource, volume: number, pitch: number): void;
    static teleportToWorld(player: ServerPlayer, target: ServerLevel, pos: Vec3): void;
    static teleportToWorld(player: ServerPlayer, target: ServerLevel, pos: Vec3, yaw: number, pitch: number): void;
    static updateIfOnServer(world: Level, pos: BlockPos): void;
  }

}

declare module 'io.wispforest.owo' {
  import { Logger } from 'org.apache.logging.log4j';
  import { Component } from 'net.minecraft.network.chat';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { MinecraftServer } from 'net.minecraft.server';

  class Owo {
    static readonly DEBUG: boolean;
    static readonly LOGGER: Logger;
    static readonly PREFIX: Component;
    constructor(modBus: IEventBus);
    static currentServer(): MinecraftServer;
    static debugWarn(logger: Logger, message: string): void;
    static debugWarn(logger: Logger, message: string, ...params: any[]): void;
    static get modBus(): IEventBus;
  }

}

declare module 'io.wispforest.owo.particles' {
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Axis } from 'Direction';
  import { ParticleOptions } from 'net.minecraft.core.particles';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';

  class ClientParticles {
    static persist(): void;
    static randomizeVelocity(scalar: number): void;
    static randomizeVelocityOnAxis(scalar: number, axis: Axis): void;
    static reset(): void;
    static setParticleCount(particleCount: number): void;
    static setVelocity(velocity: Vec3): void;
    static spawn(particle: ParticleOptions, world: Level, pos: Vec3, deviation: number): void;
    static spawnCenteredOnBlock(particle: ParticleOptions, world: Level, pos: BlockPos, deviation: number): void;
    static spawnCubeOutline(particle: ParticleOptions, world: Level, origin: Vec3, size: number, deviation: number): void;
    static spawnEnchantParticles(world: Level, origin: Vec3, destination: Vec3, deviation: number): void;
    static spawnLine(particle: ParticleOptions, world: Level, start: Vec3, end: Vec3, deviation: number): void;
    static spawnPrecise(particle: ParticleOptions, world: Level, pos: Vec3, deviationX: number, deviationY: number, deviationZ: number): void;
    static spawnWithMaxAge<T extends ParticleOptions>(particleType: T, pos: Vec3, maxAge: number): void;
    static spawnWithOffsetFromBlock(particle: ParticleOptions, world: Level, pos: BlockPos, offset: Vec3, deviation: number): void;
    static spawnWithinBlock(particle: ParticleOptions, world: Level, pos: BlockPos): void;
  }

}

declare module 'io.wispforest.owo.particles.systems' {
  import { Level } from 'net.minecraft.world.level';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Map } from 'java.util';
  import { Int2ObjectMap } from 'it.unimi.dsi.fastutil.ints';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ReflectiveEndecBuilder } from 'io.wispforest.endec.impl';
  import { Class } from 'java.lang';
  import { Endec } from 'io.wispforest.endec';

  class ParticleSystem<T = any> {
    setHandler(handler: ParticleSystemExecutor<T>): void;
    spawn(world: Level, pos: Vec3, data: T): void;
    spawn(world: Level, pos: Vec3): void;
  }


  class ParticleSystemController {
    static readonly REGISTERED_CONTROLLERS: Map;
    readonly systemsByIndex: Int2ObjectMap;
    readonly channelId: ResourceLocation;
    constructor(channelId: ResourceLocation);
    endecBuilder(): ReflectiveEndecBuilder;
    register<T>(dataClass: Class<T>, endec: Endec<T>, executor: ParticleSystemExecutor<T>): ParticleSystem<T>;
    register<T>(dataClass: Class<T>, executor: ParticleSystemExecutor<T>): ParticleSystem<T>;
    registerDeferred<T>(dataClass: Class<T>, endec: Endec<T>): ParticleSystem<T>;
    registerDeferred<T>(dataClass: Class<T>): ParticleSystem<T>;
  }


  class ParticleSystemExecutor<T = any> {
    executeParticleSystem(var1: Level, var2: Vec3, var3: T): void;
  }

}

declare module 'io.wispforest.owo.registration' {
  import { Registry } from 'net.minecraft.core';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Consumer } from 'java.util.function';

  class ComplexRegistryAction {
  }


  class RegistryHelper<T = any> {
    constructor(registry: Registry<T>);
    static get<T>(registry: Registry<T>): RegistryHelper<T>;
    runWhenPresent(id: ResourceLocation, action: Consumer<T>): void;
    runWhenPresent(action: ComplexRegistryAction): void;
  }

}

declare module 'io.wispforest.owo.registration.ComplexRegistryAction' {
  import { Runnable } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Collection } from 'java.util';
  import { ComplexRegistryAction } from 'io.wispforest.owo.registration';

  class Builder {
    build(): ComplexRegistryAction;
    static create(action: Runnable): Builder;
    entries(ids: Collection<ResourceLocation>): Builder;
    entry(id: ResourceLocation): Builder;
  }

}

declare module 'io.wispforest.owo.registration.reflect' {
  import { Registry } from 'net.minecraft.core';
  import { Field } from 'java.lang.reflect';
  import { Class } from 'java.lang';
  import { BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockItem, Item } from 'net.minecraft.world.item';
  import { EntityType } from 'net.minecraft.world.entity';
  import { FieldConsumer } from 'io.wispforest.owo.util.ReflectionUtils';

  interface AutoRegistryContainer<T = any> extends FieldProcessingSubject<T> {}
  class AutoRegistryContainer<T = any> extends FieldProcessingSubject<T> {
    static conform<T>(input: Class<any>): Class<T>;
    get registry(): Registry<T>;
    postProcessField(namespace: string, value: T, identifier: string, field: Field): void;
    static register<T>(container: Class<AutoRegistryContainer<T>>, namespace: string, recurse: boolean): void;
  }


  interface BlockEntityRegistryContainer extends AutoRegistryContainer<BlockEntityType> {}
  class BlockEntityRegistryContainer extends AutoRegistryContainer<BlockEntityType> {
    get registry(): Registry<BlockEntityType<any>>;
    get targetFieldType(): Class<BlockEntityType<any>>;
  }


  interface BlockRegistryContainer extends AutoRegistryContainer<Block> {}
  class BlockRegistryContainer extends AutoRegistryContainer<Block> {
    createBlockItem(block: Block, identifier: string): BlockItem;
    get registry(): Registry<Block>;
    get targetFieldType(): Class<Block>;
    postProcessField(namespace: string, value: Block, identifier: string, field: Field): void;
  }


  interface EntityRegistryContainer extends AutoRegistryContainer<EntityType> {}
  class EntityRegistryContainer extends AutoRegistryContainer<EntityType> {
    get registry(): Registry<EntityType<any>>;
    get targetFieldType(): Class<EntityType<any>>;
  }


  class FieldProcessingSubject<T = any> {
    afterFieldProcessing(): void;
    get targetFieldType(): Class<T>;
    shouldProcessField(value: T, identifier: string, field: Field): boolean;
  }


  class FieldRegistrationHandler {
    static process<T>(clazz: Class<FieldProcessingSubject<T>>, processor: FieldConsumer<T>, recurseIntoInnerClasses: boolean): void;
    static processSimple<T>(clazz: Class<SimpleFieldProcessingSubject<T>>, recurseIntoInnerClasses: boolean): void;
    static register<T>(clazz: Class<AutoRegistryContainer<T>>, namespace: string, recurseIntoInnerClasses: boolean): void;
  }


  interface ItemRegistryContainer extends AutoRegistryContainer<Item> {}
  class ItemRegistryContainer extends AutoRegistryContainer<Item> {
    get registry(): Registry<Item>;
    get targetFieldType(): Class<Item>;
  }


  interface SimpleFieldProcessingSubject<T = any> extends FieldProcessingSubject<T> {}
  class SimpleFieldProcessingSubject<T = any> extends FieldProcessingSubject<T> {
    processField(var1: T, var2: string, var3: Field): void;
  }

}

declare module 'io.wispforest.owo.renderdoc' {
  import { CaptureOption, Key, OverlayOption, Capture } from 'io.wispforest.owo.renderdoc.RenderDoc';
  import { EnumSet } from 'java.util';
  import { Library } from 'com.sun.jna';
  import { PointerByReference } from 'com.sun.jna.ptr';
  import { BaseOwoScreen } from 'io.wispforest.owo.ui.base';
  import { FlowLayout } from 'io.wispforest.owo.ui.container';
  import { CommandOpenedScreen } from 'io.wispforest.owo.ui.util';

  class RenderDoc {
    static disableOverlayOptions(...options: OverlayOption[]): void;
    static enableOverlayOptions(...options: OverlayOption[]): void;
    static endFrameCapture(): void;
    static get aPIVersion(): string;
    static get captureFilePathTemplate(): string;
    static get numCaptures(): number;
    static get overlayOptions(): EnumSet<OverlayOption>;
    static getCapture(index: number): Capture;
    static getCaptureOption<T>(option: CaptureOption<T>): T;
    static isAvailable(): boolean;
    static isFrameCapturing(): boolean;
    static isReplayUIConnected(): boolean;
    static launchReplayUI(connect: boolean): number;
    static removeHooks(): void;
    static set captureFilePathTemplate(template: string);
    static setCaptureComments(capture: Capture, comments: string): void;
    static setCaptureKeys(...keys: Key[]): void;
    static setCaptureOption<T>(option: CaptureOption<T>, value: T): boolean;
    static showReplayUI(): boolean;
    static startFrameCapture(): void;
    static triggerCapture(): void;
    static unloadCrashHandler(): void;
  }


  interface RenderdocLibrary extends Library {}
  class RenderdocLibrary extends Library {
    RENDERDOC_GetAPI(var1: number, var2: PointerByReference): number;
  }


  interface RenderdocScreen extends CommandOpenedScreen, BaseOwoScreen<FlowLayout> {}
  class RenderdocScreen extends CommandOpenedScreen {
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    tick(): void;
  }

}

declare module 'io.wispforest.owo.renderdoc.RenderDoc' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class CaptureOption<T = any> {
    static readonly ALLOW_VSYNC: CaptureOption;
    static readonly ALLOW_FULLSCREEN: CaptureOption;
    static readonly API_VALIDATION: CaptureOption;
    static readonly CAPTURE_CALLSTACKS: CaptureOption;
    static readonly CAPTURE_CALLSTACKS_ONLY_DRAWS: CaptureOption;
    static readonly DELAY_FOR_DEBUGGER: CaptureOption;
    static readonly VERIFY_BUFFER_ACCESS: CaptureOption;
    static readonly HOOK_INTO_CHILDREN: CaptureOption;
    static readonly REF_ALL_RESOURCES: CaptureOption;
    static readonly SAVE_ALL_INITIALS: CaptureOption;
    static readonly CAPTURE_ALL_CMD_LISTS: CaptureOption;
    static readonly DEBUG_OUTPUT_MUTE: CaptureOption;
    static readonly ALLOW_UNSUPPORTED_VENDOR_EXTENSIONS: CaptureOption;
    readonly idx: number;
  }


  interface OverlayOption extends Enum<OverlayOption> {}
  class OverlayOption extends Enum<OverlayOption> {
    static readonly ENABLED: OverlayOption;
    static readonly FRAME_RATE: OverlayOption;
    static readonly FRAME_NUMBER: OverlayOption;
    static readonly CAPTURE_LIST: OverlayOption;
    static readonly DEFAULT: OverlayOption;
    static readonly ALL: OverlayOption;
    static readonly NONE: OverlayOption;
    static valueOf(name: string): OverlayOption;
    static values(): OverlayOption[];
  }


  interface Key extends Enum<Key> {}
  class Key extends Enum<Key> {
    static readonly ZERO: Key;
    static readonly ONE: Key;
    static readonly TWO: Key;
    static readonly THREE: Key;
    static readonly FOUR: Key;
    static readonly FIVE: Key;
    static readonly SIX: Key;
    static readonly SEVEN: Key;
    static readonly EIGHT: Key;
    static readonly NINE: Key;
    static readonly A: Key;
    static readonly B: Key;
    static readonly C: Key;
    static readonly D: Key;
    static readonly E: Key;
    static readonly F: Key;
    static readonly G: Key;
    static readonly H: Key;
    static readonly I: Key;
    static readonly J: Key;
    static readonly K: Key;
    static readonly L: Key;
    static readonly M: Key;
    static readonly N: Key;
    static readonly O: Key;
    static readonly P: Key;
    static readonly Q: Key;
    static readonly R: Key;
    static readonly S: Key;
    static readonly T: Key;
    static readonly U: Key;
    static readonly V: Key;
    static readonly W: Key;
    static readonly X: Key;
    static readonly Y: Key;
    static readonly Z: Key;
    static readonly NON_PRINTABLE: Key;
    static readonly DIVIDE: Key;
    static readonly MULTIPLY: Key;
    static readonly SUBTRACT: Key;
    static readonly PLUS: Key;
    static readonly F1: Key;
    static readonly F2: Key;
    static readonly F3: Key;
    static readonly F4: Key;
    static readonly F5: Key;
    static readonly F6: Key;
    static readonly F7: Key;
    static readonly F8: Key;
    static readonly F9: Key;
    static readonly F10: Key;
    static readonly F11: Key;
    static readonly F12: Key;
    static readonly HOME: Key;
    static readonly END: Key;
    static readonly INSERT: Key;
    static readonly DELETE: Key;
    static readonly PAGE_UP: Key;
    static readonly PAGE_DOWN: Key;
    static readonly BACKSPACE: Key;
    static readonly TAB: Key;
    static readonly PRINT_SCREEN: Key;
    static readonly PAUSE: Key;
    static fromGLFW(glfw: number): Key;
    static valueOf(name: string): Key;
    static values(): Key[];
  }

}

declare module 'io.wispforest.owo.renderdoc.RenderdocLibrary' {
  import { IntegerType, Structure, Pointer } from 'com.sun.jna';
  import { pRENDERDOC_GetAPIVersion, pRENDERDOC_SetCaptureOptionU32, pRENDERDOC_SetCaptureOptionF32, pRENDERDOC_GetCaptureOptionU32, pRENDERDOC_GetCaptureOptionF32, pRENDERDOC_SetFocusToggleKeys, pRENDERDOC_SetCaptureKeys, pRENDERDOC_GetOverlayBits, pRENDERDOC_MaskOverlayBits, pRENDERDOC_RemoveHooks, pRENDERDOC_UnloadCrashHandler, pRENDERDOC_SetCaptureFilePathTemplate, pRENDERDOC_GetCaptureFilePathTemplate, pRENDERDOC_GetNumCaptures, pRENDERDOC_GetCapture, pRENDERDOC_TriggerCapture, pRENDERDOC_IsTargetControlConnected, pRENDERDOC_LaunchReplayUI, pRENDERDOC_SetActiveWindow, pRENDERDOC_StartFrameCapture, pRENDERDOC_IsFrameCapturing, pRENDERDOC_EndFrameCapture, pRENDERDOC_TriggerMultiFrameCapture, pRENDERDOC_SetCaptureFileComments, pRENDERDOC_DiscardFrameCapture, pRENDERDOC_ShowReplayUI } from 'io.wispforest.owo.renderdoc.RenderdocLibrary.RenderdocApi';

  interface uint32_t extends IntegerType {}
  class uint32_t extends IntegerType {
    constructor();

    constructor(value: number);
  }


  interface RenderdocApi extends Structure {}
  class RenderdocApi extends Structure {
    GetAPIVersion: pRENDERDOC_GetAPIVersion;
    SetCaptureOptionU32: pRENDERDOC_SetCaptureOptionU32;
    SetCaptureOptionF32: pRENDERDOC_SetCaptureOptionF32;
    GetCaptureOptionU32: pRENDERDOC_GetCaptureOptionU32;
    GetCaptureOptionF32: pRENDERDOC_GetCaptureOptionF32;
    SetFocusToggleKeys: pRENDERDOC_SetFocusToggleKeys;
    SetCaptureKeys: pRENDERDOC_SetCaptureKeys;
    GetOverlayBits: pRENDERDOC_GetOverlayBits;
    MaskOverlayBits: pRENDERDOC_MaskOverlayBits;
    RemoveHooks: pRENDERDOC_RemoveHooks;
    UnloadCrashHandler: pRENDERDOC_UnloadCrashHandler;
    SetCaptureFilePathTemplate: pRENDERDOC_SetCaptureFilePathTemplate;
    GetCaptureFilePathTemplate: pRENDERDOC_GetCaptureFilePathTemplate;
    GetNumCaptures: pRENDERDOC_GetNumCaptures;
    GetCapture: pRENDERDOC_GetCapture;
    TriggerCapture: pRENDERDOC_TriggerCapture;
    IsTargetControlConnected: pRENDERDOC_IsTargetControlConnected;
    LaunchReplayUI: pRENDERDOC_LaunchReplayUI;
    SetActiveWindow: pRENDERDOC_SetActiveWindow;
    StartFrameCapture: pRENDERDOC_StartFrameCapture;
    IsFrameCapturing: pRENDERDOC_IsFrameCapturing;
    EndFrameCapture: pRENDERDOC_EndFrameCapture;
    TriggerMultiFrameCapture: pRENDERDOC_TriggerMultiFrameCapture;
    SetCaptureFileComments: pRENDERDOC_SetCaptureFileComments;
    DiscardFrameCapture: pRENDERDOC_DiscardFrameCapture;
    ShowReplayUI: pRENDERDOC_ShowReplayUI;
    constructor(data: Pointer);
  }

}

declare module 'io.wispforest.owo.renderdoc.RenderdocLibrary.RenderdocApi' {
  import { Callback, Pointer } from 'com.sun.jna';
  import { uint32_t } from 'io.wispforest.owo.renderdoc.RenderdocLibrary';
  import { IntByReference, LongByReference } from 'com.sun.jna.ptr';

  interface pRENDERDOC_SetCaptureFileComments extends Callback {}
  class pRENDERDOC_SetCaptureFileComments extends Callback {
    call(var1: string, var2: string): void;
  }


  interface pRENDERDOC_TriggerMultiFrameCapture extends Callback {}
  class pRENDERDOC_TriggerMultiFrameCapture extends Callback {
    call(var1: uint32_t): void;
  }


  interface pRENDERDOC_DiscardFrameCapture extends Callback {}
  class pRENDERDOC_DiscardFrameCapture extends Callback {
    call(var1: Pointer, var2: Pointer): void;
  }


  interface pRENDERDOC_EndFrameCapture extends Callback {}
  class pRENDERDOC_EndFrameCapture extends Callback {
    call(var1: Pointer, var2: Pointer): void;
  }


  interface pRENDERDOC_IsFrameCapturing extends Callback {}
  class pRENDERDOC_IsFrameCapturing extends Callback {
    call(): uint32_t;
  }


  interface pRENDERDOC_StartFrameCapture extends Callback {}
  class pRENDERDOC_StartFrameCapture extends Callback {
    call(var1: Pointer, var2: Pointer): void;
  }


  interface pRENDERDOC_SetActiveWindow extends Callback {}
  class pRENDERDOC_SetActiveWindow extends Callback {
    call(var1: Pointer, var2: Pointer): void;
  }


  interface pRENDERDOC_ShowReplayUI extends Callback {}
  class pRENDERDOC_ShowReplayUI extends Callback {
    call(): uint32_t;
  }


  interface pRENDERDOC_LaunchReplayUI extends Callback {}
  class pRENDERDOC_LaunchReplayUI extends Callback {
    call(var1: uint32_t, var2: string): uint32_t;
  }


  interface pRENDERDOC_IsTargetControlConnected extends Callback {}
  class pRENDERDOC_IsTargetControlConnected extends Callback {
    call(): uint32_t;
  }


  interface pRENDERDOC_TriggerCapture extends Callback {}
  class pRENDERDOC_TriggerCapture extends Callback {
    call(): void;
  }


  interface pRENDERDOC_GetCapture extends Callback {}
  class pRENDERDOC_GetCapture extends Callback {
    call(var1: number, var2: number[], var3: IntByReference, var4: LongByReference): uint32_t;
  }


  interface pRENDERDOC_GetNumCaptures extends Callback {}
  class pRENDERDOC_GetNumCaptures extends Callback {
    call(): uint32_t;
  }


  interface pRENDERDOC_GetCaptureFilePathTemplate extends Callback {}
  class pRENDERDOC_GetCaptureFilePathTemplate extends Callback {
    call(): string;
  }


  interface pRENDERDOC_SetCaptureFilePathTemplate extends Callback {}
  class pRENDERDOC_SetCaptureFilePathTemplate extends Callback {
    call(var1: string): void;
  }


  interface pRENDERDOC_UnloadCrashHandler extends Callback {}
  class pRENDERDOC_UnloadCrashHandler extends Callback {
    call(): void;
  }


  interface pRENDERDOC_RemoveHooks extends Callback {}
  class pRENDERDOC_RemoveHooks extends Callback {
    call(): void;
  }


  interface pRENDERDOC_MaskOverlayBits extends Callback {}
  class pRENDERDOC_MaskOverlayBits extends Callback {
    call(var1: uint32_t, var2: uint32_t): void;
  }


  interface pRENDERDOC_GetOverlayBits extends Callback {}
  class pRENDERDOC_GetOverlayBits extends Callback {
    call(): uint32_t;
  }


  interface pRENDERDOC_SetCaptureKeys extends Callback {}
  class pRENDERDOC_SetCaptureKeys extends Callback {
    call(var1: number[], var2: number): void;
  }


  interface pRENDERDOC_SetFocusToggleKeys extends Callback {}
  class pRENDERDOC_SetFocusToggleKeys extends Callback {
    call(var1: Pointer, var2: number): void;
  }


  interface pRENDERDOC_GetCaptureOptionF32 extends Callback {}
  class pRENDERDOC_GetCaptureOptionF32 extends Callback {
    call(var1: number): number;
  }


  interface pRENDERDOC_GetCaptureOptionU32 extends Callback {}
  class pRENDERDOC_GetCaptureOptionU32 extends Callback {
    call(var1: number): uint32_t;
  }


  interface pRENDERDOC_SetCaptureOptionF32 extends Callback {}
  class pRENDERDOC_SetCaptureOptionF32 extends Callback {
    call(var1: number, var2: number): number;
  }


  interface pRENDERDOC_SetCaptureOptionU32 extends Callback {}
  class pRENDERDOC_SetCaptureOptionU32 extends Callback {
    call(var1: number, var2: uint32_t): number;
  }


  interface pRENDERDOC_GetAPIVersion extends Callback {}
  class pRENDERDOC_GetAPIVersion extends Callback {
    call(var1: IntByReference, var2: IntByReference, var3: IntByReference): void;
  }

}

declare module 'io.wispforest.owo.serialization' {
  import { Endec, SerializationContext, StructEndec, Serializer, Deserializer, SerializationAttribute } from 'io.wispforest.endec';
  import { Codec, DataResult, DynamicOps, MapCodec, MapLike, RecordBuilder } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { ByteBuf } from 'io.netty.buffer';
  import { RegistryFriendlyByteBuf, FriendlyByteBuf } from 'net.minecraft.network';
  import { Either, Pair } from 'com.mojang.datafixers.util';
  import { Stream } from 'java.util.stream';
  import { Struct } from 'Serializer';
  import { Struct as deserializer_Struct } from 'Deserializer';
  import { CodecAdapter } from 'io.wispforest.owo.serialization.CodecUtils';
  import { Class } from 'java.lang';
  import { Tag } from 'net.minecraft.nbt';
  import { NbtSerializer, NbtDeserializer } from 'io.wispforest.owo.serialization.format.nbt';
  import { JsonElement } from 'com.google.gson';
  import { GsonSerializer, GsonDeserializer } from 'io.wispforest.endec.format.gson';
  import { RecipeSerializer } from 'net.minecraft.world.item.crafting';
  import { Builder } from 'DataComponentType';
  import { Instance, WithValue } from 'SerializationAttribute';
  import { RegistryAccess } from 'net.minecraft.core';
  import { RegistryInfoLookup, HolderLookupAdapter } from 'RegistryOps';

  class CodecUtils {
    addToBuilder(value: Tag, builder: RecordBuilder<Tag>): RecordBuilder<Tag>;
    addToBuilder(value: JsonElement, builder: RecordBuilder<JsonElement>): RecordBuilder<JsonElement>;
    copyDecodedStruct(ctx: SerializationContext, deserializer: NbtDeserializer, struct: deserializer_Struct): Tag;
    copyDecodedStruct(ctx: SerializationContext, serializer: GsonDeserializer, struct: deserializer_Struct): JsonElement;
    static createContext(ops: DynamicOps<any>, assumedContext: SerializationContext): SerializationContext;
    createDeserializer(value: Tag): NbtDeserializer;
    createDeserializer(value: JsonElement): GsonDeserializer;
    createSerializer(): NbtSerializer;
    createSerializer(): GsonSerializer;
    decode<D>(ops: DynamicOps<D>, input: D): DataResult<Pair<T, D>>;
    decode<T1>(ops: DynamicOps<T1>, input: MapLike<T1>): DataResult<T>;
    decodeStruct(ctx: SerializationContext, deserializer: Deserializer<any>, struct: deserializer_Struct): T;
    deserializerClass(): Class<Deserializer<Tag>>;
    deserializerClass(): Class<Deserializer<JsonElement>>;
    doStructEncode<S>(ctx: SerializationContext, serializer: Serializer<S>, struct: Struct, value: T): void;
    static eitherEndec<F, S>(first: Endec<F>, second: Endec<S>): Endec<Either<F, S>>;
    encode<D>(input: T, ops: DynamicOps<D>, prefix: D): DataResult<D>;
    encode<T1>(input: T, ops: DynamicOps<T1>, prefix: RecordBuilder<T1>): RecordBuilder<T1>;
    encodeStruct(ctx: SerializationContext, serializer: NbtSerializer, struct: Struct, value: Tag): void;
    encodeStruct(ctx: SerializationContext, serializer: GsonSerializer, struct: Struct, value: JsonElement): void;
    get ops(): DynamicOps<Tag>;
    get ops(): DynamicOps<JsonElement>;
    keys<T1>(ops: DynamicOps<T1>): Stream<T1>;
    static ofEndec<T>(endec: Endec<T>): Codec<T>;
    opsClass(): Class<DynamicOps<Tag>>;
    opsClass(): Class<DynamicOps<JsonElement>>;
    static registerCodecAdapter(adapter: CodecAdapter<any, any, any>): void;
    serializerClass(): Class<Serializer<Tag>>;
    serializerClass(): Class<Serializer<JsonElement>>;
    static toCodec<T>(endec: Endec<T>, assumedContext: SerializationContext): Codec<T>;
    static toCodec<T>(endec: Endec<T>): Codec<T>;
    static toEndec<T>(codec: Codec<T>): Endec<T>;
    static toEndec<T>(codec: Codec<T>, packetCodec: StreamCodec<ByteBuf, T>): Endec<T>;
    static toEndecWithRegistries<T>(codec: Codec<T>, packetCodec: StreamCodec<RegistryFriendlyByteBuf, T>): Endec<T>;
    static toMapCodec<T>(structEndec: StructEndec<T>, assumedContext: SerializationContext): MapCodec<T>;
    static toMapCodec<T>(structEndec: StructEndec<T>): MapCodec<T>;
    static toPacketCodec<B extends FriendlyByteBuf, T>(endec: Endec<T>, buf: B, buf: B, value: T): StreamCodec<B, T>;
    static toStructEndec<T>(mapCodec: MapCodec<T>, ctx: SerializationContext, serializer: Serializer<any>, struct: Struct, value: T): StructEndec<T>;
    unpackMapLike(mapLike: MapLike<Tag>): Tag;
    unpackMapLike(mapLike: MapLike<JsonElement>): JsonElement;
    static xorEndec<F, S>(first: Endec<F>, second: Endec<S>): Endec<Either<F, S>>;
  }


  interface EndecRecipeSerializer<R extends Recipe<any> = any> extends RecipeSerializer<R> {}
  class EndecRecipeSerializer<R extends Recipe<any> = any> extends RecipeSerializer<R> {
    constructor(endec: StructEndec<R>, networkEndec: Endec<R>);

    constructor(endec: StructEndec<R>);
    codec(): MapCodec<R>;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, R>;
  }


  class OwoComponentTypeBuilder<T = any> {
    endec(endec: Endec<T>): Builder<T>;
    endec(endec: Endec<T>, assumedContext: SerializationContext): Builder<T>;
  }


  interface RegistriesAttribute extends Instance {}
  class RegistriesAttribute extends Instance {
    static readonly REGISTRIES: WithValue;
    attribute(): SerializationAttribute;
    static fromCachedInfoGetter(cachedGetter: HolderLookupAdapter): RegistriesAttribute;
    static fromInfoGetter(lookup: RegistryInfoLookup): RegistriesAttribute;
    hasRegistryManager(): boolean;
    infoGetter(): RegistryInfoLookup;
    static of(registryManager: RegistryAccess): RegistriesAttribute;
    registryManager(): RegistryAccess;
    static tryFromCachedInfoGetter(lookup: RegistryInfoLookup): RegistriesAttribute;
    value(): any;
  }

}

declare module 'io.wispforest.owo.serialization.CodecUtils' {
  import { Class } from 'java.lang';
  import { Serializer, Deserializer, SerializationContext } from 'io.wispforest.endec';
  import { DynamicOps, MapLike, RecordBuilder } from 'com.mojang.serialization';
  import { Struct } from 'Serializer';
  import { Struct as deserializer_Struct } from 'Deserializer';

  class CodecAdapter<T = any, S extends SelfDescribedSerializer<T> = any, D extends SelfDescribedDeserializer<T> = any> {
    addToBuilder(var1: T, var2: RecordBuilder<T>): RecordBuilder<T>;
    copyDecodedStruct(var1: SerializationContext, var2: D, var3: deserializer_Struct): T;
    createDeserializer(var1: T): D;
    createSerializer(): S;
    deserializerClass(): Class<Deserializer<T>>;
    encodeStruct(var1: SerializationContext, var2: S, var3: Struct, var4: T): void;
    get ops(): DynamicOps<T>;
    opsClass(): Class<DynamicOps<T>>;
    serializerClass(): Class<Serializer<T>>;
    unpackMapLike(var1: MapLike<T>): T;
  }

}

declare module 'io.wispforest.owo.serialization.endec' {
  import { Endec, SerializationContext, Serializer, Deserializer } from 'io.wispforest.endec';
  import { NonNullList, Registry } from 'net.minecraft.core';
  import { Predicate } from 'java.util.function';
  import { Either } from 'com.mojang.datafixers.util';
  import { ReflectiveEndecBuilder } from 'io.wispforest.endec.impl';
  import { TagKey } from 'net.minecraft.tags';
  import { ResourceKey } from 'net.minecraft.resources';

  class DefaultedListEndec {
    static forSize<T>(elementEndec: Endec<T>, defaultValue: T, size: number): Endec<NonNullList<T>>;
    static forSize<T>(elementEndec: Endec<T>, defaultValue: T, skipWhen: Predicate<T>, size: number): Endec<NonNullList<T>>;
  }


  interface EitherEndec<L = any, R = any> extends Endec<Either> {}
  class EitherEndec<L = any, R = any> extends Endec<Either> {
    constructor(leftEndec: Endec<L>, rightEndec: Endec<R>, exclusive: boolean);
    decode(ctx: SerializationContext, deserializer: Deserializer<any>): Either<L, R>;
    encode(ctx: SerializationContext, serializer: Serializer<any>, either: Either<L, R>): void;
  }


  class MinecraftEndecs {
    static readonly PACKET_BYTE_BUF: Endec;
    static readonly IDENTIFIER: Endec;
    static readonly ITEM_STACK: Endec;
    static readonly TEXT: Endec;
    static readonly VEC3I: Endec;
    static readonly VEC3D: Endec;
    static readonly VECTOR3F: Endec;
    static readonly BLOCK_POS: Endec;
    static readonly CHUNK_POS: Endec;
    static readonly BLOCK_HIT_RESULT: Endec;
    static addDefaults(builder: ReflectiveEndecBuilder): ReflectiveEndecBuilder;
    static ofRegistry<T>(registry: Registry<T>): Endec<T>;
    static prefixedTagKey<T>(registry: ResourceKey<Registry<T>>): Endec<TagKey<T>>;
    static unprefixedTagKey<T>(registry: ResourceKey<Registry<T>>): Endec<TagKey<T>>;
  }

}

declare module 'io.wispforest.owo.serialization.format' {
  import { SerializationContext } from 'io.wispforest.endec';
  import { DelegatingOps } from 'net.minecraft.resources';
  import { DynamicOps } from 'com.mojang.serialization';

  class ContextHolder {
    capturedContext(): SerializationContext;
  }


  interface DynamicOpsWithContext<T = any> extends ContextHolder, DelegatingOps<T> {}
  class DynamicOpsWithContext<T = any> extends ContextHolder {
    capturedContext(): SerializationContext;
    static of<T>(context: SerializationContext, delegate: DynamicOps<T>): DynamicOpsWithContext<T>;
    static ofEmptyContext<T>(delegate: DynamicOps<T>): DynamicOpsWithContext<T>;
  }

}

declare module 'io.wispforest.owo.serialization.format.edm' {
  import { DynamicOps, DataResult } from 'com.mojang.serialization';
  import { EdmElement } from 'io.wispforest.endec.format.edm';
  import { ContextHolder } from 'io.wispforest.owo.serialization.format';
  import { SerializationContext } from 'io.wispforest.endec';
  import { Number, Boolean } from 'java.lang';
  import { ByteBuffer } from 'java.nio';
  import { Stream } from 'java.util.stream';
  import { Pair } from 'com.mojang.datafixers.util';

  interface EdmOps extends DynamicOps<EdmElement>, ContextHolder {}
  class EdmOps extends DynamicOps<EdmElement> {
    capturedContext(): SerializationContext;
    convertTo<U>(outOps: DynamicOps<U>, input: EdmElement<any>): U;
    createBoolean(bl: boolean): EdmElement<any>;
    createByte(b: number): EdmElement<any>;
    createByteList(input: ByteBuffer): EdmElement<any>;
    createDouble(d: number): EdmElement<any>;
    createFloat(f: number): EdmElement<any>;
    createInt(i: number): EdmElement<any>;
    createList(input: Stream<EdmElement<any>>): EdmElement<any>;
    createLong(l: number): EdmElement<any>;
    createMap(map: Stream<Pair<EdmElement<any>, EdmElement<any>>>): EdmElement<any>;
    createNumeric(number: Number): EdmElement<any>;
    createShort(s: number): EdmElement<any>;
    createString(value: string): EdmElement<any>;
    empty(): EdmElement<any>;
    getBooleanValue(input: EdmElement<any>): DataResult<boolean>;
    getByteBuffer(input: EdmElement<any>): DataResult<ByteBuffer>;
    getMapValues(input: EdmElement<any>): DataResult<Stream<Pair<EdmElement<any>, EdmElement<any>>>>;
    getNumberValue(input: EdmElement<any>): DataResult<Number>;
    getStream(input: EdmElement<any>): DataResult<Stream<EdmElement<any>>>;
    getStringValue(input: EdmElement<any>): DataResult<string>;
    mergeToList(list: EdmElement<any>, value: EdmElement<any>): DataResult<EdmElement<any>>;
    mergeToMap(map: EdmElement<any>, key: EdmElement<any>, value: EdmElement<any>): DataResult<EdmElement<any>>;
    remove(input: EdmElement<any>, key: string): EdmElement<any>;
    static withContext(context: SerializationContext): EdmOps;
    static withoutContext(): EdmOps;
  }

}

declare module 'io.wispforest.owo.serialization.format.nbt' {
  import { RecursiveDeserializer, RecursiveSerializer } from 'io.wispforest.endec.util';
  import { Tag } from 'net.minecraft.nbt';
  import { SelfDescribedDeserializer, SerializationContext, Endec, Serializer, Deserializer, SelfDescribedSerializer } from 'io.wispforest.endec';
  import { Optional } from 'java.util';
  import { Sequence, Map, Struct } from 'Deserializer';
  import { Sequence as serializer_Sequence, Map as serializer_Map, Struct as serializer_Struct } from 'Serializer';

  interface NbtDeserializer extends SelfDescribedDeserializer<Tag>, RecursiveDeserializer<Tag> {}
  class NbtDeserializer extends SelfDescribedDeserializer<Tag> {
    map<V>(ctx: SerializationContext, valueEndec: Endec<V>): Map<V>;
    static of(element: Tag): NbtDeserializer;
    readAny<S>(ctx: SerializationContext, visitor: Serializer<S>): void;
    readBoolean(ctx: SerializationContext): boolean;
    readByte(ctx: SerializationContext): number;
    readBytes(ctx: SerializationContext): number[];
    readDouble(ctx: SerializationContext): number;
    readFloat(ctx: SerializationContext): number;
    readInt(ctx: SerializationContext): number;
    readLong(ctx: SerializationContext): number;
    readOptional<V>(ctx: SerializationContext, endec: Endec<V>): Optional<V>;
    readShort(ctx: SerializationContext): number;
    readString(ctx: SerializationContext): string;
    readVarInt(ctx: SerializationContext): number;
    readVarLong(ctx: SerializationContext): number;
    sequence<E>(ctx: SerializationContext, elementEndec: Endec<E>): Sequence<E>;
    struct(): Struct;
  }


  interface NbtEndec extends Endec<Tag> {}
  class NbtEndec extends Endec<Tag> {
    static readonly ELEMENT: Endec;
    static readonly COMPOUND: Endec;
    decode(ctx: SerializationContext, deserializer: Deserializer<any>): Tag;
    encode(ctx: SerializationContext, serializer: Serializer<any>, value: Tag): void;
  }


  interface NbtSerializer extends SelfDescribedSerializer<Tag>, RecursiveSerializer<Tag> {}
  class NbtSerializer extends SelfDescribedSerializer<Tag> {
    map<V>(ctx: SerializationContext, valueEndec: Endec<V>, size: number): serializer_Map<V>;
    static of(prefix: Tag): NbtSerializer;
    static of(): NbtSerializer;
    sequence<E>(ctx: SerializationContext, elementEndec: Endec<E>, size: number): serializer_Sequence<E>;
    struct(): serializer_Struct;
    writeBoolean(ctx: SerializationContext, value: boolean): void;
    writeByte(ctx: SerializationContext, value: number): void;
    writeBytes(ctx: SerializationContext, bytes: number[]): void;
    writeDouble(ctx: SerializationContext, value: number): void;
    writeFloat(ctx: SerializationContext, value: number): void;
    writeInt(ctx: SerializationContext, value: number): void;
    writeLong(ctx: SerializationContext, value: number): void;
    writeOptional<V>(ctx: SerializationContext, endec: Endec<V>, optional: Optional<V>): void;
    writeShort(ctx: SerializationContext, value: number): void;
    writeString(ctx: SerializationContext, value: string): void;
    writeVarInt(ctx: SerializationContext, value: number): void;
    writeVarLong(ctx: SerializationContext, value: number): void;
  }

}

declare module 'io.wispforest.owo.serialization.format.nbt.NbtDeserializer' {
  import { Struct as deserializer_Struct } from 'Deserializer';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { SerializationContext, Endec } from 'io.wispforest.endec';

  interface Struct extends deserializer_Struct {}
  class Struct extends deserializer_Struct {
    constructor(compound: CompoundTag);
    field<F>(name: string, ctx: SerializationContext, endec: Endec<F>): F;
    field<F>(name: string, ctx: SerializationContext, endec: Endec<F>, defaultValue: F): F;
  }

}

declare module 'io.wispforest.owo.shader' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { VertexFormat } from 'com.mojang.blaze3d.vertex';
  import { Consumer } from 'java.util.function';
  import { Tuple } from 'net.minecraft.util';
  import { ShaderInstance } from 'net.minecraft.client.renderer';

  interface BlurProgram extends GlProgram {}
  class BlurProgram extends GlProgram {
    constructor();
    setParameters(directions: number, quality: number, size: number): void;
    use(): void;
  }


  class GlProgram {
    constructor(id: ResourceLocation, vertexFormat: VertexFormat);
    static forEachProgram(loader: Consumer<Tuple<Function<ResourceProvider, ShaderInstance>, Consumer<ShaderInstance>>>): void;
    use(): void;
  }

}

declare module 'io.wispforest.owo.shader.GlProgram' {
  import { ShaderInstance } from 'net.minecraft.client.renderer';

  interface OwoShaderProgram extends ShaderInstance {}
  class OwoShaderProgram extends ShaderInstance {
  }

}

declare module 'io.wispforest.owo.text' {
  import { Type } from 'ComponentContents';
  import { Map } from 'java.util';
  import { Entry } from 'io.wispforest.owo.text.CustomTextRegistry';

  class CustomTextRegistry {
    static register(type: Type<any>, triggerField: string): void;
    static typesMap(): Map<string, Entry<any>>;
  }

}

declare module 'io.wispforest.owo.ui.base' {
  import { Component, Size, CursorStyle, ParentComponent, Positioning, AnimatableProperty, Insets, Sizing, OwoUIDrawContext, VerticalAlignment, HorizontalAlignment, Surface } from 'io.wispforest.owo.ui.core';
  import { Consumer } from 'java.util.function';
  import { EventSource } from 'io.wispforest.owo.util';
  import { MouseDown, MouseUp, MouseScroll, MouseDrag, KeyPress, CharTyped, FocusGained, FocusLost, MouseEnter, MouseLeave } from 'io.wispforest.owo.ui.event';
  import { FocusSource, DismountReason } from 'io.wispforest.owo.ui.core.Component';
  import { List, Collection } from 'java.util';
  import { ClientTooltipComponent } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { FocusHandler, DisposableScreen } from 'io.wispforest.owo.ui.util';
  import { Component as net_minecraft_network_chat_Component } from 'net.minecraft.network.chat';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { Stream } from 'java.util.stream';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Toast, ToastComponent } from 'net.minecraft.client.gui.components.toasts';
  import { Visibility } from 'Toast';
  import { Runnable } from 'java.lang';

  interface BaseComponent extends Component {}
  class BaseComponent extends Component {
    charTyped(): EventSource<CharTyped>;
    configure<C extends Component>(closure: Consumer<C>): C;
    cursorStyle(): CursorStyle;
    cursorStyle(style: CursorStyle): BaseComponent;
    dismount(reason: DismountReason): void;
    focusGained(): EventSource<FocusGained>;
    focusHandler(): FocusHandler;
    focusLost(): EventSource<FocusLost>;
    height(): number;
    horizontalSizing(horizontalSizing: Sizing): Component;
    horizontalSizing(): AnimatableProperty<Sizing>;
    id(id: string): Component;
    id(): string;
    inflate(space: Size): void;
    keyPress(): EventSource<KeyPress>;
    margins(margins: Insets): BaseComponent;
    margins(): AnimatableProperty<Insets>;
    mount(parent: ParentComponent, x: number, y: number): void;
    mouseDown(): EventSource<MouseDown>;
    mouseDrag(): EventSource<MouseDrag>;
    mouseEnter(): EventSource<MouseEnter>;
    mouseLeave(): EventSource<MouseLeave>;
    mouseScroll(): EventSource<MouseScroll>;
    mouseUp(): EventSource<MouseUp>;
    onCharTyped(chr: string, modifiers: number): boolean;
    onFocusGained(source: FocusSource): void;
    onFocusLost(): void;
    onKeyPress(keyCode: number, scanCode: number, modifiers: number): boolean;
    onMouseDown(mouseX: number, mouseY: number, button: number): boolean;
    onMouseDrag(mouseX: number, mouseY: number, deltaX: number, deltaY: number, button: number): boolean;
    onMouseScroll(mouseX: number, mouseY: number, amount: number): boolean;
    onMouseUp(mouseX: number, mouseY: number, button: number): boolean;
    parent(): ParentComponent;
    positioning(positioning: Positioning): BaseComponent;
    positioning(): AnimatableProperty<Positioning>;
    tooltip(tooltip: ClientTooltipComponent[]): Component;
    tooltip(): ClientTooltipComponent[];
    tooltip(tooltip: Collection<net_minecraft_network_chat_Component>): Component;
    tooltip(tooltip: net_minecraft_network_chat_Component): Component;
    update(delta: number, mouseX: number, mouseY: number): void;
    updateX(x: number): void;
    updateY(y: number): void;
    verticalSizing(verticalSizing: Sizing): Component;
    verticalSizing(): AnimatableProperty<Sizing>;
    width(): number;
    x(): number;
    y(): number;
    zIndex(zIndex: number): Component;
    zIndex(): number;
  }


  interface BaseOwoHandledScreen<R extends ParentComponent = any, S extends AbstractContainerMenu = any> extends DisposableScreen, AbstractContainerScreen<S> {}
  class BaseOwoHandledScreen<R extends ParentComponent = any, S extends AbstractContainerMenu = any> extends DisposableScreen {
    componentsForExclusionAreas(): Stream<Component>;
    dispose(): void;
    get focused(): GuiEventListener;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, deltaX: number, deltaY: number): boolean;
    removed(): void;
    render(vanillaContext: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    renderBackground(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }


  interface BaseOwoScreen<R extends ParentComponent = any> extends DisposableScreen, Screen {}
  class BaseOwoScreen<R extends ParentComponent = any> extends DisposableScreen {
    dispose(): void;
    get focused(): GuiEventListener;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, deltaX: number, deltaY: number): boolean;
    removed(): void;
    render(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    renderBackground(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }


  interface BaseOwoToast<R extends ParentComponent = any> extends Toast {}
  class BaseOwoToast<R extends ParentComponent = any> extends Toast {
    height(): number;
    render(context: GuiGraphics, manager: ToastComponent, startTime: number): Visibility;
    width(): number;
  }


  interface BaseOwoTooltipComponent<R extends ParentComponent = any> extends ClientTooltipComponent {}
  class BaseOwoTooltipComponent<R extends ParentComponent = any> extends ClientTooltipComponent {
    get height(): number;
    getWidth(textRenderer: Font): number;
    renderImage(textRenderer: Font, x: number, y: number, context: GuiGraphics): void;
  }


  interface BaseParentComponent extends ParentComponent, BaseComponent {}
  class BaseParentComponent extends ParentComponent {
    allowOverflow(allowOverflow: boolean): ParentComponent;
    allowOverflow(): boolean;
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    focusHandler(): FocusHandler;
    horizontalAlignment(alignment: HorizontalAlignment): ParentComponent;
    horizontalAlignment(): HorizontalAlignment;
    inflate(space: Size): void;
    margins(margins: Insets): BaseParentComponent;
    margins(): AnimatableProperty<Insets>;
    mount(parent: ParentComponent, x: number, y: number): void;
    onCharTyped(chr: string, modifiers: number): boolean;
    onChildMutated(child: Component): void;
    onKeyPress(keyCode: number, scanCode: number, modifiers: number): boolean;
    onMouseDown(mouseX: number, mouseY: number, button: number): boolean;
    onMouseDrag(mouseX: number, mouseY: number, deltaX: number, deltaY: number, button: number): boolean;
    onMouseScroll(mouseX: number, mouseY: number, amount: number): boolean;
    onMouseUp(mouseX: number, mouseY: number, button: number): boolean;
    padding(padding: Insets): ParentComponent;
    padding(): AnimatableProperty<Insets>;
    positioning(positioning: Positioning): BaseParentComponent;
    positioning(): AnimatableProperty<Positioning>;
    queue(task: Runnable): void;
    surface(surface: Surface): ParentComponent;
    surface(): Surface;
    update(delta: number, mouseX: number, mouseY: number): void;
    updateX(x: number): void;
    updateY(y: number): void;
    verticalAlignment(alignment: VerticalAlignment): ParentComponent;
    verticalAlignment(): VerticalAlignment;
  }


  interface BaseUIModelHandledScreen<R extends ParentComponent = any, S extends AbstractContainerMenu = any> extends BaseOwoHandledScreen<R, S> {}
  class BaseUIModelHandledScreen<R extends ParentComponent = any, S extends AbstractContainerMenu = any> extends BaseOwoHandledScreen<R, S> {
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
  }


  interface BaseUIModelScreen<R extends ParentComponent = any> extends BaseOwoScreen<R> {}
  class BaseUIModelScreen<R extends ParentComponent = any> extends BaseOwoScreen<R> {
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
  }

}

declare module 'io.wispforest.owo.ui.base.BaseOwoHandledScreen' {
  import { BaseComponent } from 'io.wispforest.owo.ui.base';
  import { OwoUIDrawContext } from 'io.wispforest.owo.ui.core';

  interface SlotComponent extends BaseComponent {}
  class SlotComponent extends BaseComponent {
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    drawTooltip(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    shouldDrawTooltip(mouseX: number, mouseY: number): boolean;
    update(delta: number, mouseX: number, mouseY: number): void;
    updateX(x: number): void;
    updateY(y: number): void;
  }

}

declare module 'io.wispforest.owo.ui.base.BaseOwoToast' {
  import { Visibility } from 'Toast';
  import { BaseOwoToast } from 'io.wispforest.owo.ui.base';
  import { Duration } from 'java.time';
  import { ParentComponent } from 'io.wispforest.owo.ui.core';

  class VisibilityPredicate<R extends ParentComponent = any> {
    test(var1: BaseOwoToast<R>, var2: number): Visibility;
    static timeout<R extends ParentComponent>(timeout: Duration): VisibilityPredicate<R>;
  }

}

declare module 'io.wispforest.owo.ui.base.BaseUIModelScreen' {
  import { UIModel } from 'io.wispforest.owo.ui.parsing';
  import { ResourceLocation } from 'net.minecraft.resources';

  class DataSource {
    static asset(assetPath: ResourceLocation): DataSource;
    static file(filePath: string): DataSource;
    get (): UIModel;
    reportError(): void;
  }

}

declare module 'io.wispforest.owo.ui.component' {
  import { BaseComponent } from 'io.wispforest.owo.ui.base';
  import { Sizing, OwoUIDrawContext, Color, AnimatableProperty, Size, CursorStyle, Component as io_wispforest_owo_ui_core_Component, ParentComponent, Surface, VerticalAlignment, HorizontalAlignment, PositionedRectangle, Insets } from 'io.wispforest.owo.ui.core';
  import { GradientDirection } from 'io.wispforest.owo.ui.component.BoxComponent';
  import { UIModel } from 'io.wispforest.owo.ui.parsing';
  import { Element } from 'org.w3c.dom';
  import { Map, List } from 'java.util';
  import { Button, Checkbox, AbstractWidget, AbstractSliderButton, MultiLineEditBox, EditBox } from 'net.minecraft.client.gui.components';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Consumer, Function, Supplier, BiConsumer } from 'java.util.function';
  import { Renderer } from 'io.wispforest.owo.ui.component.ButtonComponent';
  import { Boolean, Double } from 'java.lang';
  import { Component, Style } from 'net.minecraft.network.chat';
  import { FocusSource } from 'io.wispforest.owo.ui.core.Component';
  import { EventSource } from 'io.wispforest.owo.util';
  import { OnChanged } from 'io.wispforest.owo.ui.component.ColorPickerComponent';
  import { EntityType, Entity } from 'net.minecraft.world.entity';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { Material } from 'net.minecraft.client.resources.model';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { Axis, OnChanged as io_wispforest_owo_ui_component_slimslidercomponent_OnChanged, OnSlideEnd as io_wispforest_owo_ui_component_slimslidercomponent_OnSlideEnd } from 'io.wispforest.owo.ui.component.SlimSliderComponent';
  import { FlowLayout } from 'io.wispforest.owo.ui.container';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { RenderablePlayerEntity } from 'io.wispforest.owo.ui.component.EntityComponent';
  import { GameProfile } from 'com.mojang.authlib';
  import { ClientTooltipComponent } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { TooltipContext } from 'Item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { OnChanged as io_wispforest_owo_ui_component_slidercomponent_OnChanged, OnSlideEnd } from 'io.wispforest.owo.ui.component.SliderComponent';
  import { OnChanged as io_wispforest_owo_ui_component_smallcheckboxcomponent_OnChanged } from 'io.wispforest.owo.ui.component.SmallCheckboxComponent';
  import { OnChanged as io_wispforest_owo_ui_component_textareacomponent_OnChanged } from 'io.wispforest.owo.ui.component.TextAreaComponent';
  import { OnChanged as io_wispforest_owo_ui_component_textboxcomponent_OnChanged } from 'io.wispforest.owo.ui.component.TextBoxComponent';

  interface BoxComponent extends BaseComponent {}
  class BoxComponent extends BaseComponent {
    constructor(horizontalSizing: Sizing, verticalSizing: Sizing);
    color(color: Color): BoxComponent;
    direction(direction: GradientDirection): BoxComponent;
    direction(): GradientDirection;
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    endColor(endColor: Color): BoxComponent;
    endColor(): AnimatableProperty<Color>;
    fill(fill: boolean): BoxComponent;
    fill(): boolean;
    parseProperties(model: UIModel, element: Element, children: Map<string, Element>): void;
    startColor(startColor: Color): BoxComponent;
    startColor(): AnimatableProperty<Color>;
    update(delta: number, mouseX: number, mouseY: number): void;
  }


  interface ButtonComponent extends Button {}
  class ButtonComponent extends Button {
    static readonly ACTIVE_TEXTURE: ResourceLocation;
    static readonly HOVERED_TEXTURE: ResourceLocation;
    static readonly DISABLED_TEXTURE: ResourceLocation;
    active(active: boolean): ButtonComponent;
    active(): boolean;
    onPress(onPress: Consumer<ButtonComponent>): ButtonComponent;
    parseProperties(model: UIModel, element: Element, children: Map<string, Element>): void;
    renderWidget(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    renderer(renderer: Renderer): ButtonComponent;
    renderer(): Renderer;
    textShadow(textShadow: boolean): ButtonComponent;
    textShadow(): boolean;
  }


  interface CheckboxComponent extends Checkbox {}
  class CheckboxComponent extends Checkbox {
    checked(checked: boolean): CheckboxComponent;
    inflate(space: Size): void;
    onChanged(listener: Consumer<boolean>): CheckboxComponent;
    onPress(): void;
    owo$preferredCursorStyle(): CursorStyle;
    parseProperties(model: UIModel, element: Element, children: Map<string, Element>): void;
    setMessage(message: Component): void;
  }


  interface ColorPickerComponent extends BaseComponent {}
  class ColorPickerComponent extends BaseComponent {
    constructor();
    canFocus(source: FocusSource): boolean;
    cursorStyle(): CursorStyle;
    cursorStyle(style: CursorStyle): BaseComponent;
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    onChanged(): EventSource<OnChanged>;
    onMouseDown(mouseX: number, mouseY: number, button: number): boolean;
    onMouseDrag(mouseX: number, mouseY: number, deltaX: number, deltaY: number, button: number): boolean;
    parseProperties(model: UIModel, element: Element, children: Map<string, Element>): void;
    selectedColor(color: Color): ColorPickerComponent;
    selectedColor(hue: number, saturation: number, value: number): ColorPickerComponent;
    selectedColor(): Color;
    selectorPadding(selectorPadding: number): ColorPickerComponent;
    selectorPadding(): number;
    selectorWidth(selectorWidth: number): ColorPickerComponent;
    selectorWidth(): number;
    showAlpha(showAlpha: boolean): ColorPickerComponent;
    showAlpha(): boolean;
  }


  class Components {
    static block(state: BlockState): BlockComponent;
    static block(state: BlockState, blockEntity: BlockEntity): BlockComponent;
    static block(state: BlockState, nbt: CompoundTag): BlockComponent;
    static box(horizontalSizing: Sizing, verticalSizing: Sizing): BoxComponent;
    static button(message: Component, onPress: Consumer<ButtonComponent>): ButtonComponent;
    static checkbox(message: Component): CheckboxComponent;
    static createWithSizing<T extends io_wispforest_owo_ui_core_Component>(componentMaker: Supplier<T>, horizontalSizing: Sizing, verticalSizing: Sizing): T;
    static discreteSlider(horizontalSizing: Sizing, min: number, max: number): DiscreteSliderComponent;
    static dropdown(horizontalSizing: Sizing): DropdownComponent;
    static entity<E extends Entity>(sizing: Sizing, type: EntityType<E>, nbt: CompoundTag): EntityComponent<E>;
    static entity<E extends Entity>(sizing: Sizing, entity: E): EntityComponent<E>;
    static item(item: ItemStack): ItemComponent;
    static label(text: Component): LabelComponent;
    static list<T, C extends io_wispforest_owo_ui_core_Component>(data: T[], layoutConfigurator: Consumer<FlowLayout>, componentMaker: Function<T, C>, vertical: boolean): FlowLayout;
    static slider(horizontalSizing: Sizing): SliderComponent;
    static slimSlider(axis: Axis): SlimSliderComponent;
    static smallCheckbox(label: Component): SmallCheckboxComponent;
    static spacer(percent: number): SpacerComponent;
    static spacer(): SpacerComponent;
    static sprite(spriteId: Material): SpriteComponent;
    static sprite(sprite: TextureAtlasSprite): SpriteComponent;
    static textArea(horizontalSizing: Sizing, verticalSizing: Sizing): TextAreaComponent;
    static textArea(horizontalSizing: Sizing, verticalSizing: Sizing, text: string): TextAreaComponent;
    static textBox(horizontalSizing: Sizing): TextBoxComponent;
    static textBox(horizontalSizing: Sizing, text: string): TextBoxComponent;
    static texture(texture: ResourceLocation, u: number, v: number, regionWidth: number, regionHeight: number, textureWidth: number, textureHeight: number): TextureComponent;
    static texture(texture: ResourceLocation, u: number, v: number, regionWidth: number, regionHeight: number): TextureComponent;
    static wrapVanillaWidget(widget: AbstractWidget): VanillaWidgetComponent;
  }


  interface DiscreteSliderComponent extends SliderComponent {}
  class DiscreteSliderComponent extends SliderComponent {
    decimalPlaces(decimalPlaces: number): DiscreteSliderComponent;
    decimalPlaces(): number;
    discreteValue(): number;
    max(): number;
    min(): number;
    static parse(element: Element): DiscreteSliderComponent;
    parseProperties(model: UIModel, element: Element, children: Map<string, Element>): void;
    setFromDiscreteValue(discreteValue: number): DiscreteSliderComponent;
    snap(snap: boolean): DiscreteSliderComponent;
    snap(): boolean;
  }


  interface DropdownComponent extends FlowLayout {}
  class DropdownComponent extends FlowLayout {
    button(text: Component, onClick: Consumer<DropdownComponent>): DropdownComponent;
    checkbox(text: Component, state: boolean, onClick: Consumer<boolean>): DropdownComponent;
    closeWhenNotHovered(closeWhenNotHovered: boolean): DropdownComponent;
    closeWhenNotHovered(): boolean;
    divider(): DropdownComponent;
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    layout(space: Size): void;
    nested(text: Component, horizontalSizing: Sizing, builder: Consumer<DropdownComponent>): DropdownComponent;
    static openContextMenu<R extends ParentComponent>(screen: Screen, rootComponent: R, mountFunction: BiConsumer<R, DropdownComponent>, mouseX: number, mouseY: number, builder: Consumer<DropdownComponent>): DropdownComponent;
    parseProperties(model: UIModel, element: Element, children: Map<string, Element>): void;
    removeChild(child: io_wispforest_owo_ui_core_Component): FlowLayout;
    surface(surface: Surface): ParentComponent;
    surface(): Surface;
    text(text: Component): DropdownComponent;
  }


  interface EntityComponent<E extends Entity = any> extends BaseComponent {}
  class EntityComponent<E extends Entity = any> extends BaseComponent {
    allowMouseRotation(allowMouseRotation: boolean): EntityComponent<E>;
    allowMouseRotation(): boolean;
    canFocus(source: FocusSource): boolean;
    static createRenderablePlayer(profile: GameProfile): RenderablePlayerEntity;
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    entity(): E;
    lookAtCursor(lookAtCursor: boolean): EntityComponent<E>;
    lookAtCursor(): boolean;
    onMouseDrag(mouseX: number, mouseY: number, deltaX: number, deltaY: number, button: number): boolean;
    static parse(element: Element): EntityComponent<any>;
    parseProperties(model: UIModel, element: Element, children: Map<string, Element>): void;
    scale(scale: number): EntityComponent<E>;
    scale(): number;
    scaleToFit(scaleToFit: boolean): EntityComponent<E>;
    scaleToFit(): boolean;
    showNametag(showNametag: boolean): EntityComponent<E>;
    showNametag(): boolean;
    transform(transform: Consumer<PoseStack>): EntityComponent<E>;
    transform(): Consumer<PoseStack>;
  }


  interface ItemComponent extends BaseComponent {}
  class ItemComponent extends BaseComponent {
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    parseProperties(model: UIModel, element: Element, children: Map<string, Element>): void;
    setTooltipFromStack(setTooltipFromStack: boolean): ItemComponent;
    setTooltipFromStack(): boolean;
    showOverlay(drawOverlay: boolean): ItemComponent;
    showOverlay(): boolean;
    stack(stack: ItemStack): ItemComponent;
    stack(): ItemStack;
    static tooltipFromItem(stack: ItemStack, context: TooltipContext, player: Player, type: TooltipFlag): ClientTooltipComponent[];
  }


  interface LabelComponent extends BaseComponent {}
  class LabelComponent extends BaseComponent {
    color(color: Color): LabelComponent;
    color(): AnimatableProperty<Color>;
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    drawTooltip(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    horizontalTextAlignment(horizontalAlignment: HorizontalAlignment): LabelComponent;
    horizontalTextAlignment(): HorizontalAlignment;
    inflate(space: Size): void;
    lineHeight(lineHeight: number): LabelComponent;
    lineHeight(): number;
    lineSpacing(lineSpacing: number): LabelComponent;
    lineSpacing(): number;
    maxWidth(maxWidth: number): LabelComponent;
    maxWidth(): number;
    onMouseDown(mouseX: number, mouseY: number, button: number): boolean;
    parseProperties(model: UIModel, element: Element, children: Map<string, Element>): void;
    shadow(shadow: boolean): LabelComponent;
    shadow(): boolean;
    shouldDrawTooltip(mouseX: number, mouseY: number): boolean;
    text(text: Component): LabelComponent;
    text(): Component;
    textClickHandler(textClickHandler: Function<Style, boolean>): LabelComponent;
    textClickHandler(): Function<Style, boolean>;
    update(delta: number, mouseX: number, mouseY: number): void;
    verticalTextAlignment(verticalAlignment: VerticalAlignment): LabelComponent;
    verticalTextAlignment(): VerticalAlignment;
  }


  interface SliderComponent extends AbstractSliderButton {}
  class SliderComponent extends AbstractSliderButton {
    active(active: boolean): SliderComponent;
    active(): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    message(messageProvider: Function<string, Component>): SliderComponent;
    onChanged(): EventSource<io_wispforest_owo_ui_component_slidercomponent_OnChanged>;
    onMouseScroll(mouseX: number, mouseY: number, amount: number): boolean;
    onMouseUp(mouseX: number, mouseY: number, button: number): boolean;
    parseProperties(model: UIModel, element: Element, children: Map<string, Element>): void;
    scrollStep(scrollStep: number): SliderComponent;
    scrollStep(): number;
    setMessage(message: Component): void;
    slideEnd(): EventSource<OnSlideEnd>;
    value(value: number): SliderComponent;
    value(): number;
  }


  interface SlimSliderComponent extends BaseComponent {}
  class SlimSliderComponent extends BaseComponent {
    static readonly VALUE_TOOLTIP_SUPPLIER: Function;
    constructor(axis: Axis);
    canFocus(source: FocusSource): boolean;
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    max(max: number): SlimSliderComponent;
    max(): number;
    min(min: number): SlimSliderComponent;
    min(): number;
    onChanged(): EventSource<io_wispforest_owo_ui_component_slimslidercomponent_OnChanged>;
    onMouseDown(mouseX: number, mouseY: number, button: number): boolean;
    onMouseDrag(mouseX: number, mouseY: number, deltaX: number, deltaY: number, button: number): boolean;
    onMouseUp(mouseX: number, mouseY: number, button: number): boolean;
    onSlideEnd(): EventSource<io_wispforest_owo_ui_component_slimslidercomponent_OnSlideEnd>;
    static parse(element: Element): io_wispforest_owo_ui_core_Component;
    parseProperties(model: UIModel, element: Element, children: Map<string, Element>): void;
    stepSize(stepSize: number): SlimSliderComponent;
    stepSize(): number;
    tooltipSupplier(tooltipSupplier: Function<number, io_wispforest_owo_ui_core_Component>): SlimSliderComponent;
    tooltipSupplier(): Function<number, io_wispforest_owo_ui_core_Component>;
    value(value: number): SlimSliderComponent;
    value(): number;
    static valueTooltipSupplier(decimalPlaces: number): Function<number, io_wispforest_owo_ui_core_Component>;
  }


  interface SmallCheckboxComponent extends BaseComponent {}
  class SmallCheckboxComponent extends BaseComponent {
    static readonly TEXTURE: ResourceLocation;
    constructor(label: io_wispforest_owo_ui_core_Component);

    constructor();
    canFocus(source: FocusSource): boolean;
    checked(checked: boolean): SmallCheckboxComponent;
    checked(): boolean;
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    label(label: io_wispforest_owo_ui_core_Component): SmallCheckboxComponent;
    label(): io_wispforest_owo_ui_core_Component;
    labelShadow(labelShadow: boolean): SmallCheckboxComponent;
    labelShadow(): boolean;
    onChanged(): EventSource<io_wispforest_owo_ui_component_smallcheckboxcomponent_OnChanged>;
    onKeyPress(keyCode: number, scanCode: number, modifiers: number): boolean;
    onMouseDown(mouseX: number, mouseY: number, button: number): boolean;
    parseProperties(model: UIModel, element: Element, children: Map<string, Element>): void;
    toggle(): void;
  }


  interface SpacerComponent extends BaseComponent {}
  class SpacerComponent extends BaseComponent {
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    static parse(element: Element): SpacerComponent;
  }


  interface SpriteComponent extends BaseComponent {}
  class SpriteComponent extends BaseComponent {
    blend(blend: boolean): SpriteComponent;
    blend(): boolean;
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    static parse(element: Element): SpriteComponent;
    parseProperties(model: UIModel, element: Element, children: Map<string, Element>): void;
  }


  interface TextAreaComponent extends MultiLineEditBox {}
  class TextAreaComponent extends MultiLineEditBox {
    displayCharCount(displayCharCount: boolean): TextAreaComponent;
    displayCharCount(): boolean;
    heightOffset(): number;
    inflate(space: Size): void;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    maxLines(maxLines: number): TextAreaComponent;
    maxLines(): number;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    onChanged(): EventSource<io_wispforest_owo_ui_component_textareacomponent_OnChanged>;
    parseProperties(model: UIModel, element: Element, children: Map<string, Element>): void;
    setValueListener(changeListener: Consumer<string>): void;
    text(text: string): TextAreaComponent;
    update(delta: number, mouseX: number, mouseY: number): void;
  }


  interface TextBoxComponent extends EditBox {}
  class TextBoxComponent extends EditBox {
    drawFocusHighlight(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    onChanged(): EventSource<io_wispforest_owo_ui_component_textboxcomponent_OnChanged>;
    parseProperties(spec: UIModel, element: Element, children: Map<string, Element>): void;
    setBordered(drawsBackground: boolean): void;
    setResponder(changedListener: Consumer<string>): void;
    text(text: string): TextBoxComponent;
  }


  interface TextureComponent extends BaseComponent {}
  class TextureComponent extends BaseComponent {
    blend(blend: boolean): TextureComponent;
    blend(): boolean;
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    static parse(element: Element): TextureComponent;
    parseProperties(model: UIModel, element: Element, children: Map<string, Element>): void;
    resetVisibleArea(): TextureComponent;
    update(delta: number, mouseX: number, mouseY: number): void;
    visibleArea(visibleArea: PositionedRectangle): TextureComponent;
    visibleArea(): AnimatableProperty<PositionedRectangle>;
  }


  interface VanillaWidgetComponent extends BaseComponent {}
  class VanillaWidgetComponent extends BaseComponent {
    configure<C extends io_wispforest_owo_ui_core_Component>(closure: Consumer<C>): C;
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    hovered(): boolean;
    inflate(space: Size): void;
    margins(margins: Insets): BaseComponent;
    margins(): AnimatableProperty<Insets>;
    mount(parent: ParentComponent, x: number, y: number): void;
    notifyParentIfMounted(): void;
    onCharTyped(chr: string, modifiers: number): boolean;
    onKeyPress(keyCode: number, scanCode: number, modifiers: number): boolean;
    onMouseDown(mouseX: number, mouseY: number, button: number): boolean;
    onMouseDrag(mouseX: number, mouseY: number, deltaX: number, deltaY: number, button: number): boolean;
    onMouseScroll(mouseX: number, mouseY: number, amount: number): boolean;
    onMouseUp(mouseX: number, mouseY: number, button: number): boolean;
    shouldDrawTooltip(mouseX: number, mouseY: number): boolean;
    updateX(x: number): void;
    updateY(y: number): void;
  }

}

declare module 'io.wispforest.owo.ui.component.BoxComponent' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface GradientDirection extends Enum<GradientDirection> {}
  class GradientDirection extends Enum<GradientDirection> {
    static readonly TOP_TO_BOTTOM: GradientDirection;
    static readonly RIGHT_TO_LEFT: GradientDirection;
    static readonly BOTTOM_TO_TOP: GradientDirection;
    static readonly LEFT_TO_RIGHT: GradientDirection;
    static valueOf(name: string): GradientDirection;
    static values(): GradientDirection[];
  }

}

declare module 'io.wispforest.owo.ui.component.ButtonComponent' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { OwoUIDrawContext } from 'io.wispforest.owo.ui.core';
  import { ButtonComponent } from 'io.wispforest.owo.ui.component';
  import { Element } from 'org.w3c.dom';

  class Renderer {
    static readonly VANILLA: Renderer;
    draw(var1: OwoUIDrawContext, var2: ButtonComponent, var3: number): void;
    static flat(color: number, hoveredColor: number, disabledColor: number): Renderer;
    static parse(element: Element): Renderer;
    static texture(texture: ResourceLocation, u: number, v: number, textureWidth: number, textureHeight: number): Renderer;
  }

}

declare module 'io.wispforest.owo.ui.component.ColorPickerComponent' {
  import { Color } from 'io.wispforest.owo.ui.core';
  import { EventStream } from 'io.wispforest.owo.util';

  class OnChanged {
    static newStream(): EventStream<OnChanged>;
    onChanged(var1: Color): void;
  }

}

declare module 'io.wispforest.owo.ui.component.EntityComponent' {
  import { LocalPlayer } from 'net.minecraft.client.player';
  import { PlayerSkin } from 'net.minecraft.client.resources';
  import { PlayerModelPart } from 'net.minecraft.world.entity.player';

  interface RenderablePlayerEntity extends LocalPlayer {}
  class RenderablePlayerEntity extends LocalPlayer {
    get skin(): PlayerSkin;
    isModelPartShown(modelPart: PlayerModelPart): boolean;
  }

}

declare module 'io.wispforest.owo.ui.component.SliderComponent' {
  import { EventStream } from 'io.wispforest.owo.util';

  class OnChanged {
    static newStream(): EventStream<OnChanged>;
    onChanged(var1: number): void;
  }


  class OnSlideEnd {
    static newStream(): EventStream<OnSlideEnd>;
    onSlideEnd(): void;
  }

}

declare module 'io.wispforest.owo.ui.component.SlimSliderComponent' {
  import { EventStream } from 'io.wispforest.owo.util';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class OnChanged {
    static newStream(): EventStream<OnChanged>;
    onChanged(var1: number): void;
  }


  class OnSlideEnd {
    static newStream(): EventStream<OnSlideEnd>;
    onSlideEnd(): void;
  }


  interface Axis extends Enum<Axis> {}
  class Axis extends Enum<Axis> {
    static readonly VERTICAL: Axis;
    static readonly HORIZONTAL: Axis;
    static valueOf(name: string): Axis;
    static values(): Axis[];
  }

}

declare module 'io.wispforest.owo.ui.component.SmallCheckboxComponent' {
  import { EventStream } from 'io.wispforest.owo.util';

  class OnChanged {
    static newStream(): EventStream<OnChanged>;
    onChanged(var1: boolean): void;
  }

}

declare module 'io.wispforest.owo.ui.component.TextAreaComponent' {
  import { EventStream } from 'io.wispforest.owo.util';

  class OnChanged {
    static newStream(): EventStream<OnChanged>;
    onChanged(var1: string): void;
  }

}

declare module 'io.wispforest.owo.ui.component.TextBoxComponent' {
  import { EventStream } from 'io.wispforest.owo.util';

  class OnChanged {
    static newStream(): EventStream<OnChanged>;
    onChanged(var1: string): void;
  }

}

declare module 'io.wispforest.owo.ui.container' {
  import { Surface, Component, Sizing, OwoUIDrawContext, ParentComponent, Insets, AnimatableProperty, Size } from 'io.wispforest.owo.ui.core';
  import { List, Collection, Map } from 'java.util';
  import { EventSource } from 'io.wispforest.owo.util';
  import { OnToggled } from 'io.wispforest.owo.ui.container.CollapsibleContainer';
  import { FocusSource, DismountReason } from 'io.wispforest.owo.ui.core.Component';
  import { Element } from 'org.w3c.dom';
  import { Component as net_minecraft_network_chat_Component } from 'net.minecraft.network.chat';
  import { UIModel } from 'io.wispforest.owo.ui.parsing';
  import { BaseParentComponent } from 'io.wispforest.owo.ui.base';
  import { RenderEffectSlot, RenderEffect } from 'io.wispforest.owo.ui.container.RenderEffectWrapper';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Scrollbar } from 'io.wispforest.owo.ui.container.ScrollContainer';

  interface CollapsibleContainer extends FlowLayout {}
  class CollapsibleContainer extends FlowLayout {
    static readonly SURFACE: Surface;
    canFocus(source: FocusSource): boolean;
    child(child: Component): FlowLayout;
    child(index: number, child: Component): FlowLayout;
    children(children: Collection<Component>): FlowLayout;
    children(index: number, children: Collection<Component>): FlowLayout;
    children(): Component[];
    collapsibleChildren(): Component[];
    expanded(): boolean;
    onKeyPress(keyCode: number, scanCode: number, modifiers: number): boolean;
    onMouseDown(mouseX: number, mouseY: number, button: number): boolean;
    onToggled(): EventSource<OnToggled>;
    static parse(element: Element): CollapsibleContainer;
    removeChild(child: Component): FlowLayout;
    titleLayout(): FlowLayout;
    toggleExpansion(): void;
  }


  class Containers {
    static collapsible(horizontalSizing: Sizing, verticalSizing: Sizing, title: net_minecraft_network_chat_Component, expanded: boolean): CollapsibleContainer;
    static draggable<C extends Component>(horizontalSizing: Sizing, verticalSizing: Sizing, child: C): DraggableContainer<C>;
    static grid(horizontalSizing: Sizing, verticalSizing: Sizing, rows: number, columns: number): GridLayout;
    static horizontalFlow(horizontalSizing: Sizing, verticalSizing: Sizing): FlowLayout;
    static horizontalScroll<C extends Component>(horizontalSizing: Sizing, verticalSizing: Sizing, child: C): ScrollContainer<C>;
    static ltrTextFlow(horizontalSizing: Sizing, verticalSizing: Sizing): FlowLayout;
    static overlay<C extends Component>(child: C): OverlayContainer<C>;
    static renderEffect<C extends Component>(child: C): RenderEffectWrapper<C>;
    static stack(horizontalSizing: Sizing, verticalSizing: Sizing): StackLayout;
    static verticalFlow(horizontalSizing: Sizing, verticalSizing: Sizing): FlowLayout;
    static verticalScroll<C extends Component>(horizontalSizing: Sizing, verticalSizing: Sizing, child: C): ScrollContainer<C>;
  }


  interface DraggableContainer<C extends Component = any> extends WrappingParentComponent<C> {}
  class DraggableContainer<C extends Component = any> extends WrappingParentComponent<C> {
    alwaysOnTop(alwaysOnTop: boolean): DraggableContainer<C>;
    alwaysOnTop(): boolean;
    baseX(): number;
    baseY(): number;
    canFocus(source: FocusSource): boolean;
    childAt(x: number, y: number): Component;
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    foreheadSize(foreheadSize: number): DraggableContainer<C>;
    foreheadSize(): number;
    onMouseDrag(mouseX: number, mouseY: number, deltaX: number, deltaY: number, button: number): boolean;
    padding(padding: Insets): ParentComponent;
    padding(): AnimatableProperty<Insets>;
    parseProperties(model: UIModel, element: Element, children: Map<string, Element>): void;
    updateX(x: number): void;
    updateY(y: number): void;
  }


  interface FlowLayout extends BaseParentComponent {}
  class FlowLayout extends BaseParentComponent {
    child(child: Component): FlowLayout;
    child(index: number, child: Component): FlowLayout;
    children(children: Collection<Component>): FlowLayout;
    children(index: number, children: Collection<Component>): FlowLayout;
    children(): Component[];
    clearChildren(): FlowLayout;
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    gap(gap: number): FlowLayout;
    gap(): number;
    layout(space: Size): void;
    static parse(element: Element): FlowLayout;
    parseProperties(model: UIModel, element: Element, children: Map<string, Element>): void;
    removeChild(child: Component): FlowLayout;
  }


  interface GridLayout extends BaseParentComponent {}
  class GridLayout extends BaseParentComponent {
    child(child: Component, row: number, column: number): GridLayout;
    children(): Component[];
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    layout(space: Size): void;
    static parse(element: Element): GridLayout;
    parseProperties(model: UIModel, element: Element, children: Map<string, Element>): void;
    removeChild(row: number, column: number): GridLayout;
    removeChild(child: Component): GridLayout;
  }


  interface OverlayContainer<C extends Component = any> extends WrappingParentComponent<C> {}
  class OverlayContainer<C extends Component = any> extends WrappingParentComponent<C> {
    canFocus(source: FocusSource): boolean;
    closeOnClick(closeOnClick: boolean): OverlayContainer<C>;
    closeOnClick(): boolean;
    dismount(reason: DismountReason): void;
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    drawFocusHighlight(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    mount(parent: ParentComponent, x: number, y: number): void;
    onMouseDown(mouseX: number, mouseY: number, button: number): boolean;
    onMouseScroll(mouseX: number, mouseY: number, amount: number): boolean;
  }


  interface RenderEffectWrapper<C extends Component = any> extends WrappingParentComponent<C> {}
  class RenderEffectWrapper<C extends Component = any> extends WrappingParentComponent<C> {
    clearEffects(): void;
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    effect(effect: RenderEffect): RenderEffectSlot;
  }


  interface ScrollContainer<C extends Component = any> extends WrappingParentComponent<C> {}
  class ScrollContainer<C extends Component = any> extends WrappingParentComponent<C> {
    static readonly VERTICAL_VANILLA_SCROLLBAR_TEXTURE: ResourceLocation;
    static readonly DISABLED_VERTICAL_VANILLA_SCROLLBAR_TEXTURE: ResourceLocation;
    static readonly HORIZONTAL_VANILLA_SCROLLBAR_TEXTURE: ResourceLocation;
    static readonly DISABLED_HORIZONTAL_VANILLA_SCROLLBAR_TEXTURE: ResourceLocation;
    static readonly VANILLA_SCROLLBAR_TRACK_TEXTURE: ResourceLocation;
    static readonly FLAT_VANILLA_SCROLLBAR_TEXTURE: ResourceLocation;
    canFocus(source: FocusSource): boolean;
    childAt(x: number, y: number): Component;
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    fixedScrollbarLength(fixedScrollbarLength: number): ScrollContainer<C>;
    fixedScrollbarLength(): number;
    layout(space: Size): void;
    onKeyPress(keyCode: number, scanCode: number, modifiers: number): boolean;
    onMouseDown(mouseX: number, mouseY: number, button: number): boolean;
    onMouseDrag(mouseX: number, mouseY: number, deltaX: number, deltaY: number, button: number): boolean;
    onMouseScroll(mouseX: number, mouseY: number, amount: number): boolean;
    onMouseUp(mouseX: number, mouseY: number, button: number): boolean;
    static parse(element: Element): ScrollContainer<any>;
    parseProperties(model: UIModel, element: Element, children: Map<string, Element>): void;
    scrollStep(scrollStep: number): ScrollContainer<C>;
    scrollStep(): number;
    scrollTo(component: Component): ScrollContainer<C>;
    scrollTo(progress: number): ScrollContainer<C>;
    scrollbar(scrollbar: Scrollbar): ScrollContainer<C>;
    scrollbar(): Scrollbar;
    scrollbarThiccness(scrollbarThiccness: number): ScrollContainer<C>;
    scrollbarThiccness(): number;
  }


  interface StackLayout extends BaseParentComponent {}
  class StackLayout extends BaseParentComponent {
    child(child: Component): StackLayout;
    child(index: number, child: Component): StackLayout;
    children(children: Collection<Component>): StackLayout;
    children(index: number, children: Collection<Component>): StackLayout;
    children(): Component[];
    clearChildren(): StackLayout;
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    layout(space: Size): void;
    parseProperties(model: UIModel, element: Element, children: Map<string, Element>): void;
    removeChild(child: Component): StackLayout;
  }


  interface WrappingParentComponent<C extends Component = any> extends BaseParentComponent {}
  class WrappingParentComponent<C extends Component = any> extends BaseParentComponent {
    child(newChild: C): WrappingParentComponent<C>;
    child(): C;
    children(): Component[];
    layout(space: Size): void;
    parseProperties(model: UIModel, element: Element, children: Map<string, Element>): void;
    removeChild(child: Component): ParentComponent;
  }

}

declare module 'io.wispforest.owo.ui.container.CollapsibleContainer' {
  import { EventStream } from 'io.wispforest.owo.util';

  class OnToggled {
    static newStream(): EventStream<OnToggled>;
    onToggle(var1: boolean): void;
  }

}

declare module 'io.wispforest.owo.ui.container.FlowLayout' {
  import { FlowLayout } from 'io.wispforest.owo.ui.container';

  class Algorithm {
    static readonly HORIZONTAL: Algorithm;
    static readonly VERTICAL: Algorithm;
    static readonly LTR_TEXT: Algorithm;
    layout(var1: FlowLayout): void;
  }

}

declare module 'io.wispforest.owo.ui.container.RenderEffectWrapper' {
  import { Component, Color } from 'io.wispforest.owo.ui.core';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Axis } from 'com.mojang.math';
  import { Matrix4f } from 'org.joml';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { Consumer } from 'java.util.function';

  class RenderEffectSlot {
    remove(): void;
    update(newEffect: RenderEffect): void;
  }


  class RenderEffect {
    cleanup(var1: Component, var2: GuiGraphics, var3: number, var4: number): void;
    static color(color: Color): RenderEffect;
    static rotate(angle: number): RenderEffect;
    static rotate(axis: Axis, angle: number): RenderEffect;
    setup(var1: Component, var2: GuiGraphics, var3: number, var4: number): void;
    static transform(transform: Matrix4f, matrices: PoseStack): RenderEffect;
    static transform(transform: Consumer<PoseStack>): RenderEffect;
  }

}

declare module 'io.wispforest.owo.ui.container.ScrollContainer' {
  import { Color, OwoUIDrawContext } from 'io.wispforest.owo.ui.core';
  import { Element } from 'org.w3c.dom';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class Scrollbar {
    draw(var1: OwoUIDrawContext, var2: number, var3: number, var4: number, var5: number, var6: number, var7: number, var8: number, var9: number, var10: number, var12: ScrollDirection, var13: boolean): void;
    static flat(color: Color): Scrollbar;
    static parse(element: Element): Scrollbar;
    static vanilla(): Scrollbar;
    static vanillaFlat(): Scrollbar;
  }


  interface ScrollDirection extends Enum<ScrollDirection> {}
  class ScrollDirection extends Enum<ScrollDirection> {
    static readonly VERTICAL: ScrollDirection;
    static readonly HORIZONTAL: ScrollDirection;
    choose(horizontal: number, vertical: number): number;
    static valueOf(name: string): ScrollDirection;
    static values(): ScrollDirection[];
  }

}

declare module 'io.wispforest.owo.ui.core' {
  import { Observable, EventSource } from 'io.wispforest.owo.util';
  import { Consumer, BiFunction, Predicate, Function } from 'java.util.function';
  import { Composed, Direction, Finished } from 'io.wispforest.owo.ui.core.Animation';
  import { FocusHandler, CursorAdapter } from 'io.wispforest.owo.ui.util';
  import { List, Collection, Map, ArrayList } from 'java.util';
  import { ClientTooltipComponent } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { Component as net_minecraft_network_chat_Component } from 'net.minecraft.network.chat';
  import { DismountReason, FocusSource } from 'io.wispforest.owo.ui.core.Component';
  import { MouseDown, MouseUp, MouseScroll, MouseDrag, KeyPress, CharTyped, FocusGained, FocusLost, MouseEnter, MouseLeave } from 'io.wispforest.owo.ui.event';
  import { UIModel } from 'io.wispforest.owo.ui.parsing';
  import { Element } from 'org.w3c.dom';
  import { Enum, Runnable, Class, Integer } from 'java.lang';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { NarratableEntry, NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { NarrationPriority } from 'NarratableEntry';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { UtilityScreen, TextAnchor } from 'io.wispforest.owo.ui.core.OwoUIDrawContext';
  import { Type } from 'io.wispforest.owo.ui.core.Positioning';
  import { Method } from 'io.wispforest.owo.ui.core.Sizing';
  import { PanoramaRenderer } from 'net.minecraft.client.renderer';

  class Animatable<T extends Animatable<T> = any> {
    interpolate(var1: T, var2: number): T;
  }


  interface AnimatableProperty<A extends Animatable<A> = any> extends Observable<A> {}
  class AnimatableProperty<A extends Animatable<A> = any> extends Observable<A> {
    animate(duration: number, easing: Easing, to: A): Animation<A>;
    animation(): Animation<A>;
    static of<A extends Animatable<A>>(initial: A): AnimatableProperty<A>;
    static of<T>(initial: T): Observable<T>;
    update(delta: number): void;
  }


  class Animation<A extends Animatable<A> = any> {
    constructor(duration: number, setter: Consumer<A>, easing: Easing, from: A, to: A);
    backwards(): Animation<A>;
    static compose(...elements: Animation<any>[]): Composed;
    direction(): Direction;
    finished(): EventSource<Finished>;
    forwards(): Animation<A>;
    loop(loop: boolean): Animation<A>;
    looping(): boolean;
    reverse(): Animation<A>;
    update(delta: number): void;
  }


  interface Component extends PositionedRectangle {}
  class Component extends PositionedRectangle {
    baseX(): number;
    baseY(): number;
    canFocus(source: FocusSource): boolean;
    charTyped(): EventSource<CharTyped>;
    configure<C extends Component>(var1: Consumer<C>): C;
    cursorStyle(): CursorStyle;
    cursorStyle(var1: CursorStyle): Component;
    dismount(var1: DismountReason): void;
    draw(var1: OwoUIDrawContext, var2: number, var3: number, var4: number, var5: number): void;
    drawFocusHighlight(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    drawTooltip(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    focusGained(): EventSource<FocusGained>;
    focusHandler(): FocusHandler;
    focusLost(): EventSource<FocusLost>;
    fullSize(): Size;
    hasParent(): boolean;
    height(): number;
    horizontalSizing(var1: Sizing): Component;
    horizontalSizing(): AnimatableProperty<Sizing>;
    id(var1: string): Component;
    id(): string;
    inflate(var1: Size): void;
    isInBoundingBox(x: number, y: number): boolean;
    keyPress(): EventSource<KeyPress>;
    margins(var1: Insets): Component;
    margins(): AnimatableProperty<Insets>;
    mount(var1: ParentComponent, var2: number, var3: number): void;
    mouseDown(): EventSource<MouseDown>;
    mouseDrag(): EventSource<MouseDrag>;
    mouseEnter(): EventSource<MouseEnter>;
    mouseLeave(): EventSource<MouseLeave>;
    mouseScroll(): EventSource<MouseScroll>;
    mouseUp(): EventSource<MouseUp>;
    moveTo(x: number, y: number): void;
    onCharTyped(var1: string, var2: number): boolean;
    onFocusGained(var1: FocusSource): void;
    onFocusLost(): void;
    onKeyPress(var1: number, var2: number, var3: number): boolean;
    onMouseDown(var1: number, var3: number, var5: number): boolean;
    onMouseDrag(var1: number, var3: number, var5: number, var7: number, var9: number): boolean;
    onMouseScroll(var1: number, var3: number, var5: number): boolean;
    onMouseUp(var1: number, var3: number, var5: number): boolean;
    parent(): ParentComponent;
    parseProperties(model: UIModel, element: Element, children: Map<string, Element>): void;
    positioning(var1: Positioning): Component;
    positioning(): AnimatableProperty<Positioning>;
    remove(): void;
    root(): ParentComponent;
    shouldDrawTooltip(mouseX: number, mouseY: number): boolean;
    sizing(horizontalSizing: Sizing, verticalSizing: Sizing): Component;
    sizing(sizing: Sizing): Component;
    tooltip(var1: ClientTooltipComponent[]): Component;
    tooltip(tooltip: Collection<net_minecraft_network_chat_Component>): Component;
    tooltip(tooltip: net_minecraft_network_chat_Component): Component;
    tooltip(): ClientTooltipComponent[];
    update(delta: number, mouseX: number, mouseY: number): void;
    updateX(var1: number): void;
    updateY(var1: number): void;
    verticalSizing(var1: Sizing): Component;
    verticalSizing(): AnimatableProperty<Sizing>;
    width(): number;
    x(): number;
    y(): number;
    zIndex(var1: number): Component;
    zIndex(): number;
  }


  interface CursorStyle extends Enum<CursorStyle> {}
  class CursorStyle extends Enum<CursorStyle> {
    static readonly NONE: CursorStyle;
    static readonly POINTER: CursorStyle;
    static readonly TEXT: CursorStyle;
    static readonly HAND: CursorStyle;
    static readonly CROSSHAIR: CursorStyle;
    static readonly MOVE: CursorStyle;
    static readonly HORIZONTAL_RESIZE: CursorStyle;
    static readonly VERTICAL_RESIZE: CursorStyle;
    static readonly NWSE_RESIZE: CursorStyle;
    static readonly NESW_RESIZE: CursorStyle;
    static readonly NOT_ALLOWED: CursorStyle;
    static valueOf(name: string): CursorStyle;
    static values(): CursorStyle[];
  }


  class Easing {
    static readonly LINEAR: Easing;
    static readonly SINE: Easing;
    static readonly QUADRATIC: Easing;
    static readonly CUBIC: Easing;
    static readonly QUARTIC: Easing;
    static readonly EXPO: Easing;
    apply(var1: number): number;
  }


  interface HorizontalAlignment extends Enum<HorizontalAlignment> {}
  class HorizontalAlignment extends Enum<HorizontalAlignment> {
    static readonly LEFT: HorizontalAlignment;
    static readonly CENTER: HorizontalAlignment;
    static readonly RIGHT: HorizontalAlignment;
    align(componentWidth: number, span: number): number;
    static parse(element: Element): HorizontalAlignment;
    static valueOf(name: string): HorizontalAlignment;
    static values(): HorizontalAlignment[];
  }


  interface OwoUIAdapter<R extends ParentComponent = any> extends GuiEventListener, Renderable, NarratableEntry {}
  class OwoUIAdapter<R extends ParentComponent = any> extends GuiEventListener {
    readonly rootComponent: R;
    readonly cursorAdapter: CursorAdapter;
    enableInspector: boolean;
    globalInspector: boolean;
    inspectorZOffset: number;
    charTyped(chr: string, modifiers: number): boolean;
    static create<R extends ParentComponent>(screen: Screen, rootComponentMaker: BiFunction<Sizing, Sizing, R>): OwoUIAdapter<R>;
    static createWithoutScreen<R extends ParentComponent>(x: number, y: number, width: number, height: number, rootComponentMaker: BiFunction<Sizing, Sizing, R>): OwoUIAdapter<R>;
    dispose(): void;
    height(): number;
    inflateAndMount(): void;
    isFocused(): boolean;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    static isRendering(): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, deltaX: number, deltaY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, horizontalAmount: number, verticalAmount: number): boolean;
    moveAndResize(x: number, y: number, width: number, height: number): void;
    narrationPriority(): NarrationPriority;
    render(context: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    setFocused(focused: boolean): void;
    toggleGlobalInspector(): boolean;
    toggleInspector(): boolean;
    updateNarration(builder: NarrationElementOutput): void;
    width(): number;
    x(): number;
    y(): number;
  }


  interface OwoUIDrawContext extends GuiGraphics {}
  class OwoUIDrawContext extends GuiGraphics {
    static readonly PANEL_TEXTURE: ResourceLocation;
    static readonly DARK_PANEL_TEXTURE: ResourceLocation;
    static readonly PANEL_INSET_TEXTURE: ResourceLocation;
    static readonly PANEL_NINE_PATCH_TEXTURE: ResourceLocation;
    static readonly DARK_PANEL_NINE_PATCH_TEXTURE: ResourceLocation;
    static readonly PANEL_INSET_NINE_PATCH_TEXTURE: ResourceLocation;
    drawCircle(centerX: number, centerY: number, segments: number, radius: number, color: Color): void;
    drawCircle(centerX: number, centerY: number, angleFrom: number, angleTo: number, segments: number, radius: number, color: Color): void;
    drawGradientRect(x: number, y: number, width: number, height: number, topLeftColor: number, topRightColor: number, bottomRightColor: number, bottomLeftColor: number): void;
    drawInsets(x: number, y: number, width: number, height: number, insets: Insets, color: number): void;
    drawInspector(root: ParentComponent, mouseX: number, mouseY: number, onlyHovered: boolean): void;
    drawLine(x1: number, y1: number, x2: number, y2: number, thiccness: number, color: Color): void;
    drawPanel(x: number, y: number, width: number, height: number, dark: boolean): void;
    drawRectOutline(x: number, y: number, width: number, height: number, color: number): void;
    drawRing(centerX: number, centerY: number, segments: number, innerRadius: number, outerRadius: number, innerColor: Color, outerColor: Color): void;
    drawRing(centerX: number, centerY: number, angleFrom: number, angleTo: number, segments: number, innerRadius: number, outerRadius: number, innerColor: Color, outerColor: Color): void;
    drawSpectrum(x: number, y: number, width: number, height: number, vertical: boolean): void;
    drawText(text: net_minecraft_network_chat_Component, x: number, y: number, scale: number, color: number): void;
    drawText(text: net_minecraft_network_chat_Component, x: number, y: number, scale: number, color: number, anchorPoint: TextAnchor): void;
    drawTooltip(textRenderer: Font, x: number, y: number, components: ClientTooltipComponent[]): void;
    static of(context: GuiGraphics): OwoUIDrawContext;
    recordQuads(): void;
    recording(): boolean;
    submitQuads(): void;
    static utilityScreen(): UtilityScreen;
  }


  interface ParentComponent extends Component {}
  class ParentComponent extends Component {
    alignment(horizontalAlignment: HorizontalAlignment, verticalAlignment: VerticalAlignment): ParentComponent;
    allowOverflow(var1: boolean): ParentComponent;
    allowOverflow(): boolean;
    childAt(x: number, y: number): Component;
    childById<T extends Component>(expectedClass: Class<T>, id: string): T;
    children(): Component[];
    collectDescendants(into: ArrayList<Component>): void;
    drawTooltip(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    forEachDescendant(action: Consumer<Component>): void;
    forEachDescendantWhere(action: Consumer<Component>, condition: Predicate<Component>): void;
    horizontalAlignment(var1: HorizontalAlignment): ParentComponent;
    horizontalAlignment(): HorizontalAlignment;
    layout(var1: Size): void;
    onChildMutated(var1: Component): void;
    onMouseDown(mouseX: number, mouseY: number, button: number): boolean;
    onMouseScroll(mouseX: number, mouseY: number, amount: number): boolean;
    padding(var1: Insets): ParentComponent;
    padding(): AnimatableProperty<Insets>;
    parseProperties(model: UIModel, element: Element, children: Map<string, Element>): void;
    queue(var1: Runnable): void;
    removeChild(var1: Component): ParentComponent;
    surface(var1: Surface): ParentComponent;
    surface(): Surface;
    update(delta: number, mouseX: number, mouseY: number): void;
    verticalAlignment(var1: VerticalAlignment): ParentComponent;
    verticalAlignment(): VerticalAlignment;
  }


  interface PositionedRectangle extends Animatable<PositionedRectangle> {}
  class PositionedRectangle extends Animatable<PositionedRectangle> {
    height(): number;
    interpolate(next: PositionedRectangle, delta: number): PositionedRectangle;
    intersection(other: PositionedRectangle): PositionedRectangle;
    intersects(other: PositionedRectangle): boolean;
    isInBoundingBox(x: number, y: number): boolean;
    static of(x: number, y: number, size: Size): PositionedRectangle;
    static of(x: number, y: number, width: number, height: number): PositionedRectangle;
    width(): number;
    x(): number;
    y(): number;
  }


  interface Positioning extends Animatable<Positioning> {}
  class Positioning extends Animatable<Positioning> {
    readonly type: Type;
    readonly x: number;
    readonly y: number;
    static absolute(xPixels: number, yPixels: number): Positioning;
    static across(xPercent: number, yPercent: number): Positioning;
    equals(o: any): boolean;
    hashCode(): number;
    interpolate(next: Positioning, delta: number): Positioning;
    isRelative(): boolean;
    static layout(): Positioning;
    static parse(positioningElement: Element): Positioning;
    static relative(xPercent: number, yPercent: number): Positioning;
    withX(x: number): Positioning;
    withY(y: number): Positioning;
  }


  interface Sizing extends Animatable<Sizing> {}
  class Sizing extends Animatable<Sizing> {
    readonly method: Method;
    readonly value: number;
    static content(): Sizing;
    static content(padding: number): Sizing;
    contentFactor(): number;
    equals(o: any): boolean;
    static expand(): Sizing;
    static expand(percent: number): Sizing;
    static fill(): Sizing;
    static fill(percent: number): Sizing;
    static fixed(value: number): Sizing;
    hashCode(): number;
    inflate(space: number, contentSizeFunction: Function<Sizing, number>): number;
    interpolate(next: Sizing, delta: number): Sizing;
    isContent(): boolean;
    isExpand(): boolean;
    static parse(sizingElement: Element): Sizing;
  }


  class Surface {
    static readonly PANEL: Surface;
    static readonly DARK_PANEL: Surface;
    static readonly PANEL_INSET: Surface;
    static readonly VANILLA_TRANSLUCENT: Surface;
    static readonly OPTIONS_BACKGROUND: Surface;
    static readonly TOOLTIP: Surface;
    static readonly BLANK: Surface;
    and(surface: Surface): Surface;
    static blur(quality: number, size: number): Surface;
    draw(var1: OwoUIDrawContext, var2: ParentComponent): void;
    static flat(color: number): Surface;
    static outline(color: number): Surface;
    static panelWithInset(insetWidth: number): Surface;
    static panorama(renderer: PanoramaRenderer, alwaysVisible: boolean): Surface;
    static parse(surfaceElement: Element): Surface;
    static tiled(texture: ResourceLocation, textureWidth: number, textureHeight: number): Surface;
    static vanillaPanorama(alwaysVisible: boolean): Surface;
  }


  interface VerticalAlignment extends Enum<VerticalAlignment> {}
  class VerticalAlignment extends Enum<VerticalAlignment> {
    static readonly TOP: VerticalAlignment;
    static readonly CENTER: VerticalAlignment;
    static readonly BOTTOM: VerticalAlignment;
    align(componentWidth: number, span: number): number;
    static parse(element: Element): VerticalAlignment;
    static valueOf(name: string): VerticalAlignment;
    static values(): VerticalAlignment[];
  }

}

declare module 'io.wispforest.owo.ui.core.Animation' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { EventStream } from 'io.wispforest.owo.util';

  interface Direction extends Enum<Direction> {}
  class Direction extends Enum<Direction> {
    static readonly FORWARDS: Direction;
    static readonly BACKWARDS: Direction;
    reversed(): Direction;
    static valueOf(name: string): Direction;
    static values(): Direction[];
  }


  class Finished {
    static newStream(): EventStream<Finished>;
    onFinished(var1: Direction, var2: boolean): void;
  }


  class Composed {
    backwards(): void;
    forwards(): void;
    loop(loop: boolean): void;
    reverse(): void;
  }

}

declare module 'io.wispforest.owo.ui.core.Component' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface DismountReason extends Enum<DismountReason> {}
  class DismountReason extends Enum<DismountReason> {
    static readonly LAYOUT_INFLATION: DismountReason;
    static readonly REMOVED: DismountReason;
    static valueOf(name: string): DismountReason;
    static values(): DismountReason[];
  }


  interface FocusSource extends Enum<FocusSource> {}
  class FocusSource extends Enum<FocusSource> {
    static readonly MOUSE_CLICK: FocusSource;
    static readonly KEYBOARD_CYCLE: FocusSource;
    static valueOf(name: string): FocusSource;
    static values(): FocusSource[];
  }

}

declare module 'io.wispforest.owo.ui.core.OwoUIDrawContext' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Style } from 'net.minecraft.network.chat';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface UtilityScreen extends Screen {}
  class UtilityScreen extends Screen {
    captureLinkSource(): void;
    static get (): UtilityScreen;
    get andClearLinkSource(): Screen;
    handleComponentClicked(style: Style): boolean;
    setLinkSource(screen: Screen): void;
  }


  interface TextAnchor extends Enum<TextAnchor> {}
  class TextAnchor extends Enum<TextAnchor> {
    static readonly TOP_RIGHT: TextAnchor;
    static readonly BOTTOM_RIGHT: TextAnchor;
    static readonly TOP_LEFT: TextAnchor;
    static readonly BOTTOM_LEFT: TextAnchor;
    static valueOf(name: string): TextAnchor;
    static values(): TextAnchor[];
  }

}

declare module 'io.wispforest.owo.ui.core.Positioning' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Type extends Enum<Type> {}
  class Type extends Enum<Type> {
    static readonly RELATIVE: Type;
    static readonly ACROSS: Type;
    static readonly ABSOLUTE: Type;
    static readonly LAYOUT: Type;
    static valueOf(name: string): Type;
    static values(): Type[];
  }

}

declare module 'io.wispforest.owo.ui.core.Sizing' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { Sizing } from 'io.wispforest.owo.ui.core';

  interface Method extends Enum<Method> {}
  class Method extends Enum<Method> {
    static readonly FIXED: Method;
    static readonly CONTENT: Method;
    static readonly FILL: Method;
    static readonly EXPAND: Method;
    static valueOf(name: string): Method;
    static values(): Method[];
  }


  class Random {
    static content(min: number, max: number): Sizing;
    static content(max: number): Sizing;
    static content(): Sizing;
    static expand(min: number, max: number): Sizing;
    static expand(max: number): Sizing;
    static expand(): Sizing;
    static fill(min: number, max: number): Sizing;
    static fill(max: number): Sizing;
    static fill(): Sizing;
    static fixed(min: number, max: number): Sizing;
    static fixed(max: number): Sizing;
    static fixed(): Sizing;
    static noContent(min: number, max: number): Sizing;
    static noContent(max: number): Sizing;
    static noContent(): Sizing;
    static random(min: number, max: number): Sizing;
    static random(max: number): Sizing;
    static random(): Sizing;
  }

}

declare module 'io.wispforest.owo.ui.event' {
  import { EventStream } from 'io.wispforest.owo.util';
  import { Event } from 'net.fabricmc.fabric.api.event';
  import { Minecraft } from 'net.minecraft.client';
  import { FocusSource } from 'io.wispforest.owo.ui.core.Component';
  import { Window } from 'com.mojang.blaze3d.platform';

  class CharTyped {
    static newStream(): EventStream<CharTyped>;
    onCharTyped(var1: string, var2: number): boolean;
  }


  class ClientRenderCallback {
    static readonly BEFORE: Event;
    static readonly AFTER: Event;
    onRender(var1: Minecraft): void;
  }


  class FocusGained {
    static newStream(): EventStream<FocusGained>;
    onFocusGained(var1: FocusSource): void;
  }


  class FocusLost {
    static newStream(): EventStream<FocusLost>;
    onFocusLost(): void;
  }


  class KeyPress {
    static newStream(): EventStream<KeyPress>;
    onKeyPress(var1: number, var2: number, var3: number): boolean;
  }


  class MouseDown {
    static newStream(): EventStream<MouseDown>;
    onMouseDown(var1: number, var3: number, var5: number): boolean;
  }


  class MouseDrag {
    static newStream(): EventStream<MouseDrag>;
    onMouseDrag(var1: number, var3: number, var5: number, var7: number, var9: number): boolean;
  }


  class MouseEnter {
    static newStream(): EventStream<MouseEnter>;
    onMouseEnter(): void;
  }


  class MouseLeave {
    static newStream(): EventStream<MouseLeave>;
    onMouseLeave(): void;
  }


  class MouseScroll {
    static newStream(): EventStream<MouseScroll>;
    onMouseScroll(var1: number, var3: number, var5: number): boolean;
  }


  class MouseUp {
    static newStream(): EventStream<MouseUp>;
    onMouseUp(var1: number, var3: number, var5: number): boolean;
  }


  class WindowResizeCallback {
    static readonly EVENT: Event;
    onResized(var1: Minecraft, var2: Window): void;
  }

}

declare module 'io.wispforest.owo.ui.hud' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Supplier } from 'java.util.function';
  import { Component } from 'io.wispforest.owo.ui.core';
  import { FlowLayout } from 'io.wispforest.owo.ui.container';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { CommandOpenedScreen } from 'io.wispforest.owo.ui.util';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class Hud {
    static add(id: ResourceLocation, component: Supplier<Component>): void;
    static getComponent(id: ResourceLocation): Component;
    static hasComponent(id: ResourceLocation): boolean;
    static remove(id: ResourceLocation): void;
  }


  interface HudContainer extends FlowLayout {}
  class HudContainer extends FlowLayout {
  }


  interface HudInspectorScreen extends CommandOpenedScreen, Screen {}
  class HudInspectorScreen extends CommandOpenedScreen {
    constructor();
    removed(): void;
    render(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }

}

declare module 'io.wispforest.owo.ui.inject' {
  import { Component, OwoUIDrawContext, ParentComponent, Positioning, AnimatableProperty, Insets, Sizing, CursorStyle, Size } from 'io.wispforest.owo.ui.core';
  import { FocusHandler } from 'io.wispforest.owo.ui.util';
  import { EventSource } from 'io.wispforest.owo.util';
  import { MouseEnter, MouseLeave, MouseDown, MouseUp, MouseScroll, MouseDrag, KeyPress, CharTyped, FocusGained, FocusLost } from 'io.wispforest.owo.ui.event';
  import { List, Collection } from 'java.util';
  import { ClientTooltipComponent } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { DismountReason, FocusSource } from 'io.wispforest.owo.ui.core.Component';
  import { Consumer } from 'java.util.function';
  import { VanillaWidgetComponent } from 'io.wispforest.owo.ui.component';
  import { Component as net_minecraft_network_chat_Component } from 'net.minecraft.network.chat';

  interface ComponentStub extends Component {}
  class ComponentStub extends Component {
    charTyped(): EventSource<CharTyped>;
    configure<C extends Component>(closure: Consumer<C>): C;
    cursorStyle(): CursorStyle;
    cursorStyle(style: CursorStyle): Component;
    dismount(reason: DismountReason): void;
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    focusGained(): EventSource<FocusGained>;
    focusHandler(): FocusHandler;
    focusLost(): EventSource<FocusLost>;
    height(): number;
    heightOffset(): number;
    horizontalSizing(horizontalSizing: Sizing): Component;
    horizontalSizing(): AnimatableProperty<Sizing>;
    id(id: string): Component;
    id(): string;
    inflate(space: Size): void;
    keyPress(): EventSource<KeyPress>;
    margins(margins: Insets): Component;
    margins(): AnimatableProperty<Insets>;
    mount(parent: ParentComponent, x: number, y: number): void;
    mouseDown(): EventSource<MouseDown>;
    mouseDrag(): EventSource<MouseDrag>;
    mouseEnter(): EventSource<MouseEnter>;
    mouseLeave(): EventSource<MouseLeave>;
    mouseScroll(): EventSource<MouseScroll>;
    mouseUp(): EventSource<MouseUp>;
    onCharTyped(chr: string, modifiers: number): boolean;
    onFocusGained(source: FocusSource): void;
    onFocusLost(): void;
    onKeyPress(keyCode: number, scanCode: number, modifiers: number): boolean;
    onMouseDown(mouseX: number, mouseY: number, button: number): boolean;
    onMouseDrag(mouseX: number, mouseY: number, deltaX: number, deltaY: number, button: number): boolean;
    onMouseScroll(mouseX: number, mouseY: number, amount: number): boolean;
    onMouseUp(mouseX: number, mouseY: number, button: number): boolean;
    parent(): ParentComponent;
    positioning(positioning: Positioning): Component;
    positioning(): AnimatableProperty<Positioning>;
    tooltip(tooltip: ClientTooltipComponent[]): Component;
    tooltip(): ClientTooltipComponent[];
    tooltip(tooltip: Collection<net_minecraft_network_chat_Component>): Component;
    tooltip(tooltip: net_minecraft_network_chat_Component): Component;
    updateX(x: number): void;
    updateY(y: number): void;
    verticalSizing(verticalSizing: Sizing): Component;
    verticalSizing(): AnimatableProperty<Sizing>;
    widgetWrapper(): VanillaWidgetComponent;
    width(): number;
    widthOffset(): number;
    x(): number;
    xOffset(): number;
    y(): number;
    yOffset(): number;
    zIndex(zIndex: number): Component;
    zIndex(): number;
  }


  interface GreedyInputComponent extends Component {}
  class GreedyInputComponent extends Component {
  }

}

declare module 'io.wispforest.owo.ui.layers' {
  import { Instance } from 'io.wispforest.owo.ui.layers.Layer';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { BiFunction, Consumer } from 'java.util.function';
  import { Sizing, ParentComponent } from 'io.wispforest.owo.ui.core';
  import { Class } from 'java.lang';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Collection, List } from 'java.util';

  class Layer<S extends Screen = any, R extends ParentComponent = any> {
    getInstance(screen: S): Instance;
    instantiate(screen: S): Instance;
  }


  class Layers {
    static readonly INIT_PHASE: ResourceLocation;
    static add<S extends Screen, R extends ParentComponent>(rootComponentMaker: BiFunction<Sizing, Sizing, R>, instanceInitializer: Consumer<Instance>, ...screenClasses: Class<S>[]): Layer<S, R>;
    static getInstances<S extends Screen>(screen: S): Instance[];
    static getLayers<S extends Screen>(screenClass: Class<S>): Collection<Layer<S, any>>;
  }

}

declare module 'io.wispforest.owo.ui.layers.Layer' {
  import { OwoUIAdapter, Component } from 'io.wispforest.owo.ui.core';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { Predicate } from 'java.util.function';
  import { AnchorSide } from 'io.wispforest.owo.ui.layers.Layer.Instance';

  class Instance {
    readonly screen: S;
    readonly adapter: OwoUIAdapter;
    aggressivePositioning: boolean;
    alignComponentToHandledScreenCoordinates(component: Component, x: number, y: number): void;
    alignComponentToWidget(locator: Predicate<AbstractWidget>, anchor: AnchorSide, justification: number, component: Component): void;
    dispatchLayoutUpdates(): void;
    queryWidget(locator: Predicate<AbstractWidget>): AbstractWidget;
    resize(width: number, height: number): void;
  }

}

declare module 'io.wispforest.owo.ui.layers.Layer.Instance' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface AnchorSide extends Enum<AnchorSide> {}
  class AnchorSide extends Enum<AnchorSide> {
    static readonly TOP: AnchorSide;
    static readonly BOTTOM: AnchorSide;
    static readonly LEFT: AnchorSide;
    static readonly RIGHT: AnchorSide;
    static valueOf(name: string): AnchorSide;
    static values(): AnchorSide[];
  }

}

declare module 'io.wispforest.owo.ui.parsing' {
  import { BaseUIModelScreen } from 'io.wispforest.owo.ui.base';
  import { FlowLayout } from 'io.wispforest.owo.ui.container';
  import { CommandOpenedScreen } from 'io.wispforest.owo.ui.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { RuntimeException, Throwable, Class, Enum } from 'java.lang';
  import { Path } from 'java.nio.file';
  import { InputStream } from 'java.io';
  import { OwoUIAdapter, ParentComponent, Component } from 'io.wispforest.owo.ui.core';
  import { Element, Node } from 'org.w3c.dom';
  import { Function, Consumer } from 'java.util.function';
  import { Map, Set, List, Optional } from 'java.util';
  import { ResourceManagerReloadListener, ResourceManager } from 'net.minecraft.server.packs.resources';
  import { Component as net_minecraft_network_chat_Component } from 'net.minecraft.network.chat';

  interface ConfigureHotReloadScreen extends CommandOpenedScreen, BaseUIModelScreen<FlowLayout> {}
  class ConfigureHotReloadScreen extends CommandOpenedScreen {
    constructor(modelId: ResourceLocation, parent: Screen);
    onClose(): void;
  }


  interface IncompatibleUIModelException extends RuntimeException {}
  class IncompatibleUIModelException extends RuntimeException {
    constructor(message: string);

    constructor(message: string, cause: Throwable);
  }


  class UIModel {
    createAdapter<T extends ParentComponent>(expectedRootComponentClass: Class<T>, screen: Screen): OwoUIAdapter<T>;
    createAdapterWithoutScreen<T extends ParentComponent>(x: number, y: number, width: number, height: number, expectedRootComponentClass: Class<T>): OwoUIAdapter<T>;
    expandTemplate<T extends Component>(expectedClass: Class<T>, name: string, parameterSupplier: Function<string, string>, childSupplier: Function<string, Element>): T;
    expandTemplate<T extends Component>(expectedClass: Class<T>, name: string, parameters: Map<string, string>): T;
    static load(path: Path): UIModel;
    static load(stream: InputStream): UIModel;
    parseComponent<T extends Component>(expectedClass: Class<T>, componentElement: Element): T;
  }


  interface UIModelLoader extends ResourceManagerReloadListener {}
  class UIModelLoader extends ResourceManagerReloadListener {
    static allLoadedModels(): Set<ResourceLocation>;
    static get(id: ResourceLocation): UIModel;
    static getHotReloadPath(modelId: ResourceLocation): Path;
    static getPreloaded(id: ResourceLocation): UIModel;
    static hasCompletedInitialLoad(): boolean;
    onResourceManagerReload(manager: ResourceManager): void;
    static setHotReloadPath(modelId: ResourceLocation, reloadPath: Path): void;
  }


  interface UIModelParsingException extends RuntimeException {}
  class UIModelParsingException extends RuntimeException {
    constructor(message: string);

    constructor(message: string, cause: Throwable);
  }


  class UIParsing {
    static allChildrenOfType<T extends Node>(element: Element, type: number): T[];
    static apply<T, E extends Node>(properties: Map<string, E>, key: string, parser: Function<E, T>, consumer: Consumer<T>): void;
    static childElements(element: Element): Map<string, Element>;
    static expectAttributes(element: Element, ...attributes: string[]): void;
    static expectChildren(element: Element, children: Map<string, Element>, ...expected: string[]): void;
    static get<T, E extends Node>(properties: Map<string, E>, key: string, parser: Function<E, T>): Optional<T>;
    static getFactory(element: Element): Function<Element, Component>;
    static parseBool(node: Node): boolean;
    static parseDouble(node: Node): number;
    static parseEnum<E extends Enum<E>>(enumClass: Class<E>): Function<Element, E>;
    static parseFloat(node: Node): number;
    static parseIdentifier(node: Node): ResourceLocation;
    static parseSignedInt(node: Node): number;
    static parseText(element: Element): net_minecraft_network_chat_Component;
    static parseUnsignedInt(node: Node): number;
    static registerFactory(componentTagName: string, factory: Function<Element, Component>): void;
    static registerFactory(componentId: ResourceLocation, factory: Function<Element, Component>): void;
  }

}

declare module 'io.wispforest.owo.ui.util' {
  import { Window } from 'com.mojang.blaze3d.platform';
  import { CursorStyle, ParentComponent, Component, Size, OwoUIDrawContext, PositionedRectangle } from 'io.wispforest.owo.ui.core';
  import { FocusSource } from 'io.wispforest.owo.ui.core.Component';
  import { Quaternionf, Matrix4f } from 'org.joml';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { List } from 'java.util';
  import { ComponentSink } from 'io.wispforest.owo.ui.util.MountingHelper';
  import { Consumer } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Runnable, Throwable } from 'java.lang';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { Toast, ToastComponent } from 'net.minecraft.client.gui.components.toasts';
  import { Visibility } from 'Toast';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { SoundEvent } from 'net.minecraft.sounds';

  class CommandOpenedScreen {
  }


  class CursorAdapter {
    applyStyle(style: CursorStyle): void;
    dispose(): void;
    static ofClientWindow(): CursorAdapter;
    static ofWindow(window: Window): CursorAdapter;
    static ofWindow(windowHandle: number): CursorAdapter;
  }


  class Delta {
    static compute(current: number, target: number, delta: number): number;
    static compute(current: number, target: number, delta: number): number;
  }


  class DisposableScreen {
    dispose(): void;
  }


  class FocusHandler {
    constructor(root: ParentComponent);
    cycle(forwards: boolean): void;
    focus(component: Component, source: FocusSource): void;
    focused(): Component;
    lastFocusSource(): FocusSource;
    moveFocus(keyCode: number): void;
    updateClickFocus(mouseX: number, mouseY: number): void;
  }


  class MatrixStackTransformer {
    get matrixStack(): PoseStack;
    multiply(quaternion: Quaternionf): MatrixStackTransformer;
    multiply(quaternion: Quaternionf, originX: number, originY: number, originZ: number): MatrixStackTransformer;
    multiplyPositionMatrix(matrix: Matrix4f): MatrixStackTransformer;
    pop(): MatrixStackTransformer;
    push(): MatrixStackTransformer;
    scale(x: number, y: number, z: number): MatrixStackTransformer;
    translate(x: number, y: number, z: number): MatrixStackTransformer;
    translate(x: number, y: number, z: number): MatrixStackTransformer;
  }


  class MountingHelper {
    static inflateWithExpand(children: Component[], childSpace: Size, vertical: boolean): void;
    static inflateWithExpand(children: Component[], childSpace: Size, vertical: boolean, gap: number): void;
    static mountEarly(sink: ComponentSink, children: Component[], layoutFunc: Consumer<Component>): MountingHelper;
    mountLate(): void;
  }


  class NinePatchTexture {
    constructor(texture: ResourceLocation, u: number, v: number, cornerPatchSize: Size, centerPatchSize: Size, textureSize: Size, repeat: boolean);

    constructor(texture: ResourceLocation, u: number, v: number, patchSize: Size, textureSize: Size, repeat: boolean);

    constructor(texture: ResourceLocation, patchSize: Size, textureSize: Size, repeat: boolean);
    draw(context: OwoUIDrawContext, rectangle: PositionedRectangle): void;
    draw(context: OwoUIDrawContext, x: number, y: number, width: number, height: number): void;
    static draw(texture: ResourceLocation, context: OwoUIDrawContext, x: number, y: number, width: number, height: number): void;
    static draw(texture: ResourceLocation, context: OwoUIDrawContext, rectangle: PositionedRectangle): void;
  }


  class ScissorStack {
    static drawUnclipped(action: Runnable): void;
    static isVisible(x: number, y: number, matrices: PoseStack): boolean;
    static isVisible(component: Component, matrices: PoseStack): boolean;
    static pop(): void;
    static popFramesAndDraw(maxPopFrames: number, action: Runnable): void;
    static push(x: number, y: number, width: number, height: number, matrices: PoseStack): void;
    static pushDirect(x: number, y: number, width: number, height: number): void;
  }


  class SpriteUtilInvoker {
    static markSpriteActive(sprite: TextureAtlasSprite): void;
  }


  interface UIErrorToast extends Toast {}
  class UIErrorToast extends Toast {
    constructor(error: Throwable);

    constructor(message: string);
    get token(): any;
    height(): number;
    render(context: GuiGraphics, manager: ToastComponent, startTime: number): Visibility;
    static report(message: string): void;
    static report(error: Throwable): void;
    width(): number;
  }


  class UISounds {
    static readonly UI_INTERACTION: SoundEvent;
    static playButtonSound(): void;
    static playInteractionSound(): void;
  }

}

declare module 'io.wispforest.owo.ui.util.MountingHelper' {
  import { Component } from 'io.wispforest.owo.ui.core';
  import { Consumer } from 'java.util.function';

  class ComponentSink {
    accept(var1: Component, var2: Consumer<Component>): void;
  }

}

declare module 'io.wispforest.owo.ui.util.NinePatchTexture' {
  import { SimpleJsonResourceReloadListener } from 'net.minecraft.server.packs.resources';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface MetadataLoader extends SimpleJsonResourceReloadListener {}
  class MetadataLoader extends SimpleJsonResourceReloadListener {
    constructor();
    get fabricId(): ResourceLocation;
  }

}

declare module 'io.wispforest.owo.ui.util.UIErrorToast' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Type extends Enum<Type> {}
  class Type extends Enum<Type> {
    static readonly VERY_TYPE: Type;
    static valueOf(name: string): Type;
    static values(): Type[];
  }

}

declare module 'io.wispforest.owo.util' {
  import { Subscription } from 'io.wispforest.owo.util.EventSource';
  import { Function, Consumer } from 'java.util.function';
  import { List, Map, HashMap, Set, Collection } from 'java.util';
  import { Container } from 'net.minecraft.world';
  import { NonNullList, Holder, Registry, BlockPos, Vec3i } from 'net.minecraft.core';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Block } from 'net.minecraft.world.level.block';
  import { Class, Number, Runnable, IllegalStateException } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { AddReloadListenerEvent } from 'net.neoforged.neoforge.event';
  import { Constructor, Field, Type } from 'java.lang.reflect';
  import { FieldConsumer } from 'io.wispforest.owo.util.ReflectionUtils';
  import { TagLocation } from 'io.wispforest.owo.util.TagInjector';
  import { TagEntry } from 'net.minecraft.tags';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Level } from 'net.minecraft.world.level';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Vector3f } from 'org.joml';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  class EventSource<T = any> {
    subscribe(subscriber: T): Subscription;
  }


  class EventStream<T = any> {
    constructor(sinkFactory: Function<T[], T>);
    sink(): T;
    source(): EventSource<T>;
  }


  interface ImplementedInventory extends Container {}
  class ImplementedInventory extends Container {
    clearContent(): void;
    get containerSize(): number;
    get items(): NonNullList<ItemStack>;
    getItem(slot: number): ItemStack;
    isEmpty(): boolean;
    static of(items: NonNullList<ItemStack>): ImplementedInventory;
    static ofSize(size: number): ImplementedInventory;
    removeItem(slot: number, count: number): ItemStack;
    removeItemNoUpdate(slot: number): ItemStack;
    setChanged(): void;
    setItem(slot: number, stack: ItemStack): void;
    stillValid(player: Player): boolean;
  }


  class KawaiiUtil {
    static uwuGen(): string;
    static uwuify(string: string): string;
  }


  class Maldenhagen {
    static injectCopium(block: Block): void;
    static isOnCopium(block: Block): boolean;
  }


  class NumberReflection {
    static convert<T extends Number>(inParameter: Number, targetClass: Class<T>): T;
    static isFloatingPointType(clazz: Class<any>): boolean;
    static isNumberType(clazz: Class<any>): boolean;
    static maxValue<T extends Number>(numberType: Class<T>): T;
    static minValue<T extends Number>(numberType: Class<T>): T;
  }


  class Observable<T = any> {
    get (): T;
    observe(observer: Consumer<T>): void;
    static observeAll(observer: Runnable, ...observables: Observable<any>[]): void;
    static observeAll<T>(observer: Consumer<T>, ...observables: Observable<T>[]): void;
    static of<T>(initial: T): Observable<T>;
    set (newValue: T);
  }


  class OwoFreezer {
    static checkRegister(pluralName: string): void;
    static freeze(): void;
    static isFrozen(): boolean;
    static registerFreezeCallback(callback: Runnable): void;
  }


  class RecipeRemainderStorage {
    static get(recipe: ResourceLocation): Map<Item, ItemStack>;
    static has(recipe: ResourceLocation): boolean;
    static onServerStart(event: AddReloadListenerEvent): void;
    static store(recipe: ResourceLocation, remainders: Map<Item, ItemStack>): void;
  }


  class ReflectionUtils {
    static forApplicableSubclasses(parent: Class<any>, targetType: Class<any>, action: Consumer<Class<any>>): void;
    static getCallingClassName(depth: number): string;
    static getFieldName(field: Field): string;
    static getNoArgsConstructor<C>(clazz: Class<C>): Constructor<C>;
    static getTypeArgument(type: Type, index: number): Class<any>;
    static instantiate<C>(constructor: Constructor<C>, ...args: any[]): C;
    static iterateAccessibleStaticFields<C, F>(clazz: Class<C>, targetFieldType: Class<F>, fieldConsumer: FieldConsumer<F>): void;
    static requireZeroArgsConstructor(clazz: Class<any>, reasonFormatter: Function<string, string>): void;
    static tryInstantiateWithNoArgs<C>(clazz: Class<C>): C;
  }


  class RegistryAccess {
    static getEntry<T>(registry: Registry<T>, id: ResourceLocation): Holder<T>;
    static getEntry<T>(registry: Registry<T>, value: T): Holder<T>;
  }


  interface ServicesFrozenException extends IllegalStateException {}
  class ServicesFrozenException extends IllegalStateException {
    constructor(message: string);
  }


  class TagInjector {
    static readonly ADDITIONS: HashMap;
    static get injections(): Map<TagLocation, Set<TagEntry>>;
    static inject<T>(registry: Registry<T>, tag: ResourceLocation, values: Collection<T>): void;
    static inject<T>(registry: Registry<T>, tag: ResourceLocation, ...values: T[]): void;
    static injectDirectReference(registry: Registry<any>, tag: ResourceLocation, values: Collection<ResourceLocation>): void;
    static injectDirectReference(registry: Registry<any>, tag: ResourceLocation, ...values: ResourceLocation[]): void;
    static injectRaw(registry: Registry<any>, tag: ResourceLocation, entryMaker: Function<ResourceLocation, TagEntry>, values: Collection<ResourceLocation>): void;
    static injectRaw(registry: Registry<any>, tag: ResourceLocation, entryMaker: Function<ResourceLocation, TagEntry>, ...values: ResourceLocation[]): void;
    static injectTagReference(registry: Registry<any>, tag: ResourceLocation, values: Collection<ResourceLocation>): void;
    static injectTagReference(registry: Registry<any>, tag: ResourceLocation, ...values: ResourceLocation[]): void;
  }


  class VectorRandomUtils {
    static getRandomCenteredOnBlock(world: Level, pos: BlockPos, deviation: number): Vec3;
    static getRandomOffset(world: Level, center: Vec3, deviation: number): Vec3;
    static getRandomOffsetSpecific(world: Level, center: Vec3, deviationX: number, deviationY: number, deviationZ: number): Vec3;
    static getRandomWithinBlock(world: Level, pos: BlockPos): Vec3;
  }


  class VectorSerializer {
    static get(nbt: CompoundTag, key: string): Vec3;
    static getf(nbt: CompoundTag, key: string): Vector3f;
    static geti(nbt: CompoundTag, key: string): Vec3i;
    static put(nbt: CompoundTag, key: string, vec3d: Vec3): CompoundTag;
    static putf(nbt: CompoundTag, key: string, vec3f: Vector3f): CompoundTag;
    static puti(nbt: CompoundTag, key: string, vec3i: Vec3i): CompoundTag;
    static read(buffer: FriendlyByteBuf): Vec3;
    static readf(buffer: FriendlyByteBuf): Vector3f;
    static readi(buffer: FriendlyByteBuf): Vec3i;
    static write(buffer: FriendlyByteBuf, vec3d: Vec3): void;
    static writef(buffer: FriendlyByteBuf, vec3f: Vector3f): void;
    static writei(buffer: FriendlyByteBuf, vec3i: Vec3i): void;
  }


  class Wisdom {
    static readonly ALL_THE_WISDOM: List;
    static spread(): void;
  }

}

declare module 'io.wispforest.owo.util.EventSource' {
  class Subscription {
    constructor(subscriber: T);
    cancel(): void;
  }

}

declare module 'io.wispforest.owo.util.pond' {
  import { BiConsumer, Supplier } from 'java.util.function';
  import { Item, CreativeModeTab } from 'net.minecraft.world.item';
  import { Output } from 'CreativeModeTab';
  import { List } from 'java.util';
  import { Instance } from 'io.wispforest.owo.ui.layers.Layer';
  import { Layer } from 'io.wispforest.owo.ui.layers';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ParentComponent, PositionedRectangle } from 'io.wispforest.owo.ui.core';
  import { Player } from 'net.minecraft.world.entity.player';
  import { SyncPropertiesPacket, LocalPacket } from 'io.wispforest.owo.client.screens.ScreenInternals';
  import { Reference } from 'Holder';
  import { ResourceKey } from 'net.minecraft.resources';
  import { RegistrationInfo } from 'net.minecraft.core';
  import { BufferBuilder } from 'com.mojang.blaze3d.vertex';

  class OwoCreativeInventoryScreenExtensions {
    owo$getRootX(): number;
    owo$getRootY(): number;
  }


  class OwoEntityRenderDispatcherExtension {
    owo$counterRotate(): boolean;
    owo$setCounterRotate(var1: boolean): void;
    owo$setShowNametag(var1: boolean): void;
    owo$showNametag(): boolean;
  }


  class OwoItemExtensions {
    owo$group(): CreativeModeTab;
    owo$setGroup(var1: Supplier<CreativeModeTab>): void;
    owo$setGroup(group: CreativeModeTab): void;
    owo$shouldTrackUsageStat(): boolean;
    owo$stackGenerator(): BiConsumer<Item, Output>;
    owo$tab(): number;
  }


  class OwoScreenExtension {
    owo$getInstance<S extends Screen, R extends ParentComponent>(var1: Layer<S, R>): Instance;
    owo$getInstancesView(): Instance[];
    owo$updateLayers(): void;
  }


  class OwoScreenHandlerExtension {
    owo$attachToPlayer(var1: Player): void;
    owo$handlePacket(var1: LocalPacket, var2: boolean): void;
    owo$readPropertySync(var1: SyncPropertiesPacket): void;
  }


  class OwoSimpleRegistryExtensions<T = any> {
    owo$set(var1: number, var2: ResourceKey<T>, var3: T, var4: RegistrationInfo): Reference<T>;
  }


  class OwoSlotExtension {
    owo$getDisabledOverride(): boolean;
    owo$getScissorArea(): PositionedRectangle;
    owo$setDisabledOverride(var1: boolean): void;
    owo$setScissorArea(var1: PositionedRectangle): void;
  }


  class OwoTessellatorExtension {
    owo$getStoredBuilder(): BufferBuilder;
    owo$setStoredBuilder(var1: BufferBuilder): void;
    owo$skipNextBegin(): void;
  }


  class OwoTextRendererExtension {
    owo$beginCache(): void;
    owo$submitCache(): void;
  }

}

declare module 'io.wispforest.owo.util.ReflectionUtils' {
  import { Field } from 'java.lang.reflect';

  class FieldConsumer<F = any> {
    accept(var1: F, var2: string, var3: Field): void;
  }

}