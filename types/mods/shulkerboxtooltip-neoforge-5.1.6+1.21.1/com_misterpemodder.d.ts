declare module 'com.misterpemodder.shulkerboxtooltip.api.color' {
  import { Category } from 'com.misterpemodder.shulkerboxtooltip.api.color.ColorRegistry';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Map } from 'java.util';

  class ColorKey {
    static readonly DEFAULT: ColorKey;
    static readonly ENDER_CHEST: ColorKey;
    static readonly SHULKER_BOX: ColorKey;
    static readonly WHITE_SHULKER_BOX: ColorKey;
    static readonly ORANGE_SHULKER_BOX: ColorKey;
    static readonly MAGENTA_SHULKER_BOX: ColorKey;
    static readonly LIGHT_BLUE_SHULKER_BOX: ColorKey;
    static readonly YELLOW_SHULKER_BOX: ColorKey;
    static readonly LIME_SHULKER_BOX: ColorKey;
    static readonly PINK_SHULKER_BOX: ColorKey;
    static readonly GRAY_SHULKER_BOX: ColorKey;
    static readonly LIGHT_GRAY_SHULKER_BOX: ColorKey;
    static readonly CYAN_SHULKER_BOX: ColorKey;
    static readonly PURPLE_SHULKER_BOX: ColorKey;
    static readonly BLUE_SHULKER_BOX: ColorKey;
    static readonly BROWN_SHULKER_BOX: ColorKey;
    static readonly GREEN_SHULKER_BOX: ColorKey;
    static readonly RED_SHULKER_BOX: ColorKey;
    static readonly BLACK_SHULKER_BOX: ColorKey;
    static copyOf(original: ColorKey): ColorKey;
    defaultRgb(): number;
    defaultRgbComponents(): number[];
    static ofRgb(rgb: number[]): ColorKey;
    static ofRgb(rgb: number): ColorKey;
    rgb(): number;
    rgbComponents(): number[];
    setRgb(var1: number): void;
    setRgb(var1: number[]): void;
  }


  class ColorRegistry {
    categories(): Map<ResourceLocation, Category>;
    category(var1: ResourceLocation): Category;
    defaultCategory(): Category;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.api.color.ColorRegistry' {
  import { ColorKey } from 'com.misterpemodder.shulkerboxtooltip.api.color';
  import { Map } from 'java.util';

  class Category {
    key(var1: string): ColorKey;
    keyUnlocalizedName(var1: ColorKey): string;
    keys(): Map<string, ColorKey>;
    register(key: ColorKey, colorId: string): Category;
    register(var1: ColorKey, var2: string, var3: string): Category;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.api.config' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ItemStackMergingStrategy extends Enum<ItemStackMergingStrategy> {}
  class ItemStackMergingStrategy extends Enum<ItemStackMergingStrategy> {
    static readonly IGNORE: ItemStackMergingStrategy;
    static readonly FIRST_ITEM: ItemStackMergingStrategy;
    static readonly SEPARATE: ItemStackMergingStrategy;
    toString(): string;
    static valueOf(name: string): ItemStackMergingStrategy;
    static values(): ItemStackMergingStrategy[];
  }


  class PreviewConfiguration {
    defaultMaxRowSize(): number;
    itemStackMergingStrategy(): ItemStackMergingStrategy;
    shortItemCounts(): boolean;
    useColors(): boolean;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.api' {
  import { Builder } from 'com.misterpemodder.shulkerboxtooltip.api.PreviewContext';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { PreviewConfiguration } from 'com.misterpemodder.shulkerboxtooltip.api.config';
  import { Provider } from 'HolderLookup';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { PreviewProvider, PreviewProviderRegistry } from 'com.misterpemodder.shulkerboxtooltip.api.provider';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { ColorRegistry } from 'com.misterpemodder.shulkerboxtooltip.api.color';

  class PreviewContext {
    static builder(stack: ItemStack): Builder;
    config(): PreviewConfiguration;
    owner(): Player;
    registryLookup(): Provider;
    stack(): ItemStack;
  }


  interface PreviewType extends Enum<PreviewType> {}
  class PreviewType extends Enum<PreviewType> {
    static readonly NO_PREVIEW: PreviewType;
    static readonly COMPACT: PreviewType;
    static readonly FULL: PreviewType;
    static valueOf(name: string): PreviewType;
    static values(): PreviewType[];
  }


  class ShulkerBoxTooltipApi {
    static getCurrentPreviewType(hasFullPreviewMode: boolean): PreviewType;
    static getPreviewProviderForStack(stack: ItemStack): PreviewProvider;
    static getPreviewProviderForStackWithOverrides(stack: ItemStack): PreviewProvider;
    static hasModAvailable(player: ServerPlayer): boolean;
    static isPreviewAvailable(context: PreviewContext): boolean;
    registerColors(registry: ColorRegistry): void;
    registerProviders(var1: PreviewProviderRegistry): void;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.api.PreviewContext' {
  import { Player } from 'net.minecraft.world.entity.player';
  import { Provider } from 'HolderLookup';
  import { PreviewContext } from 'com.misterpemodder.shulkerboxtooltip.api';

  class Builder {
    build(): PreviewContext;
    withOwner(var1: Player): Builder;
    withRegistryLookup(var1: Provider): Builder;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.api.provider' {
  import { PreviewContext } from 'com.misterpemodder.shulkerboxtooltip.api';
  import { List, Set } from 'java.util';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { Component, Style } from 'net.minecraft.network.chat';
  import { ColorKey } from 'com.misterpemodder.shulkerboxtooltip.api.color';
  import { PreviewRenderer } from 'com.misterpemodder.shulkerboxtooltip.api.renderer';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Iterable } from 'java.lang';

  interface BlockEntityPreviewProvider extends PreviewProvider {}
  class BlockEntityPreviewProvider extends PreviewProvider {
    constructor(defaultMaxInvSize: number, defaultCanUseLootTables: boolean);

    constructor(defaultMaxInvSize: number, defaultCanUseLootTables: boolean, defaultMaxRowSize: number);
    addTooltip(context: PreviewContext): Component[];
    canUseLootTables(): boolean;
    getInventory(context: PreviewContext): ItemStack[];
    getInventoryMaxSize(context: PreviewContext): number;
    static getItemCountTooltip(tooltip: Component[], items: ItemStack[]): Component[];
    static getItemListTooltip(tooltip: Component[], items: ItemStack[], style: Style): Component[];
    getMaxRowSize(context: PreviewContext): number;
    shouldDisplay(context: PreviewContext): boolean;
    showTooltipHints(context: PreviewContext): boolean;
  }


  interface EmptyPreviewProvider extends PreviewProvider {}
  class EmptyPreviewProvider extends PreviewProvider {
    static readonly INSTANCE: PreviewProvider;
    getInventory(context: PreviewContext): ItemStack[];
    getInventoryMaxSize(context: PreviewContext): number;
    shouldDisplay(context: PreviewContext): boolean;
  }


  class PreviewProvider {
    addTooltip(context: PreviewContext): Component[];
    get priority(): number;
    get renderer(): PreviewRenderer;
    getFullTooltipHintLangKey(context: PreviewContext): string;
    getInventory(var1: PreviewContext): ItemStack[];
    getInventoryMaxSize(var1: PreviewContext): number;
    getLockKeyTooltipHintLangKey(context: PreviewContext): string;
    getMaxRowSize(context: PreviewContext): number;
    getTextureOverride(context: PreviewContext): ResourceLocation;
    getTooltipHintLangKey(context: PreviewContext): string;
    getWindowColorKey(context: PreviewContext): ColorKey;
    isFullPreviewAvailable(context: PreviewContext): boolean;
    onInventoryAccessStart(context: PreviewContext): void;
    shouldDisplay(var1: PreviewContext): boolean;
    showTooltipHints(context: PreviewContext): boolean;
  }


  class PreviewProviderRegistry {
    get(var1: ResourceLocation): PreviewProvider;
    get(var1: ItemStack): PreviewProvider;
    get(var1: Item): PreviewProvider;
    get ids(): Set<ResourceLocation>;
    get providers(): Set<PreviewProvider>;
    getId(var1: PreviewProvider): ResourceLocation;
    static getInstance(): PreviewProviderRegistry;
    getItems(var1: PreviewProvider): Set<Item>;
    register(var1: ResourceLocation, var2: PreviewProvider, var3: Iterable<Item>): void;
    register(var1: ResourceLocation, var2: PreviewProvider, ...var3: Item[]): void;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.api.renderer' {
  import { PreviewContext, PreviewType } from 'com.misterpemodder.shulkerboxtooltip.api';
  import { PreviewProvider } from 'com.misterpemodder.shulkerboxtooltip.api.provider';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';

  class PreviewRenderer {
    draw(var1: number, var2: number, var3: GuiGraphics, var4: Font, var5: number, var6: number): void;
    get height(): number;
    get width(): number;
    static getDefaultRendererInstance(): PreviewRenderer;
    static getModRendererInstance(): PreviewRenderer;
    static getVanillaRendererInstance(): PreviewRenderer;
    setPreview(var1: PreviewContext, var2: PreviewProvider): void;
    setPreviewType(var1: PreviewType): void;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.impl.color.ColorRegistryImpl' {
  import { Category as com_misterpemodder_shulkerboxtooltip_api_color_colorregistry_Category } from 'com.misterpemodder.shulkerboxtooltip.api.color.ColorRegistry';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ColorKey } from 'com.misterpemodder.shulkerboxtooltip.api.color';
  import { Map } from 'java.util';

  interface Category extends com_misterpemodder_shulkerboxtooltip_api_color_colorregistry_Category {}
  class Category extends com_misterpemodder_shulkerboxtooltip_api_color_colorregistry_Category {
    constructor(id: ResourceLocation);
    key(colorId: string): ColorKey;
    keyUnlocalizedName(key: ColorKey): string;
    keys(): Map<string, ColorKey>;
    register(key: ColorKey, colorId: string, unlocalizedName: string): com_misterpemodder_shulkerboxtooltip_api_color_colorregistry_Category;
    register(key: ColorKey, colorId: string): com_misterpemodder_shulkerboxtooltip_api_color_colorregistry_Category;
    setRgbKeyLater(colorId: string, rgb: number): void;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.impl.config' {
  import { ColorsCategory, ControlsCategory } from 'com.misterpemodder.shulkerboxtooltip.impl.config.ClientConfiguration';
  import { PreviewConfiguration, ItemStackMergingStrategy } from 'com.misterpemodder.shulkerboxtooltip.api.config';
  import { PreviewCategory, TooltipCategory, ServerCategory } from 'com.misterpemodder.shulkerboxtooltip.impl.config.Configuration';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { JsonPrimitive, JsonGrammar } from 'com.misterpemodder.shulkerboxtooltip.shadowed.blue.endless.jankson';
  import { Exception, Throwable } from 'java.lang';

  interface ClientConfiguration extends Configuration {}
  class ClientConfiguration extends Configuration {
    colors: ColorsCategory;
    controls: ControlsCategory;
    useColors(): boolean;
  }


  interface Configuration extends PreviewConfiguration {}
  class Configuration extends PreviewConfiguration {
    preview: PreviewCategory;
    tooltip: TooltipCategory;
    server: ServerCategory;
    defaultMaxRowSize(): number;
    itemStackMergingStrategy(): ItemStackMergingStrategy;
    shortItemCounts(): boolean;
    useColors(): boolean;
  }


  class ConfigurationHandler {
    static loadFromFile(): Configuration;
    static readFromPacketBuf(config: Configuration, buf: FriendlyByteBuf): void;
    static register(): Configuration;
    static reinitClientSideSyncedValues(config: Configuration): void;
    static saveToFile(toSave: Configuration): void;
    static writeToPacketBuf(config: Configuration, buf: FriendlyByteBuf): void;
  }


  interface JsonHexadecimalInt extends JsonPrimitive {}
  class JsonHexadecimalInt extends JsonPrimitive {
    toJson(grammar: JsonGrammar, depth: number): string;
    toJson(comments: boolean, newlines: boolean, depth: number): string;
    toJson(): string;
    toJson(comments: boolean, newlines: boolean): string;
    toJson(grammar: JsonGrammar): string;
  }


  interface SerializationException extends Exception {}
  class SerializationException extends Exception {
    constructor(cause: Throwable);

    constructor(message: string);
  }


  class ShulkerBoxTooltipConfigSerializer {
    deserialize(): Configuration;
    serialize(config: Configuration): void;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.impl.config.ClientConfiguration' {
  import { ColorRegistry } from 'com.misterpemodder.shulkerboxtooltip.api.color';
  import { Key } from 'com.misterpemodder.shulkerboxtooltip.impl.util';

  class ColorsCategory {
    coloredPreview: boolean;
    colors: ColorRegistry;
  }


  class ControlsCategory {
    previewKey: Key;
    fullPreviewKey: Key;
    lockTooltipKey: Key;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.impl.config.Configuration' {
  import { ItemStackMergingStrategy } from 'com.misterpemodder.shulkerboxtooltip.api.config';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class PreviewCategory {
    enable: boolean;
    swapModes: boolean;
    alwaysOn: boolean;
    compactPreviewNbtBehavior: ItemStackMergingStrategy;
    defaultMaxRowSize: number;
    serverIntegration: boolean;
    theme: Theme;
    position: PreviewPosition;
    shortItemCounts: boolean;
  }


  class TooltipCategory {
    showKeyHints: boolean;
    type: ShulkerBoxTooltipType;
    lootTableInfoType: LootTableInfoType;
    hideShulkerBoxLore: boolean;
  }


  class ServerCategory {
    clientIntegration: boolean;
    enderChestSyncType: EnderChestSyncType;
  }


  interface EnderChestSyncType extends Enum<EnderChestSyncType> {}
  class EnderChestSyncType extends Enum<EnderChestSyncType> {
    static readonly NONE: EnderChestSyncType;
    static readonly ACTIVE: EnderChestSyncType;
    static readonly PASSIVE: EnderChestSyncType;
    toString(): string;
    static valueOf(name: string): EnderChestSyncType;
    static values(): EnderChestSyncType[];
  }


  interface LootTableInfoType extends Enum<LootTableInfoType> {}
  class LootTableInfoType extends Enum<LootTableInfoType> {
    static readonly HIDE: LootTableInfoType;
    static readonly SIMPLE: LootTableInfoType;
    static readonly ADVANCED: LootTableInfoType;
    toString(): string;
    static valueOf(name: string): LootTableInfoType;
    static values(): LootTableInfoType[];
  }


  interface ShulkerBoxTooltipType extends Enum<ShulkerBoxTooltipType> {}
  class ShulkerBoxTooltipType extends Enum<ShulkerBoxTooltipType> {
    static readonly VANILLA: ShulkerBoxTooltipType;
    static readonly MOD: ShulkerBoxTooltipType;
    static readonly NONE: ShulkerBoxTooltipType;
    toString(): string;
    static valueOf(name: string): ShulkerBoxTooltipType;
    static values(): ShulkerBoxTooltipType[];
  }


  interface PreviewPosition extends Enum<PreviewPosition> {}
  class PreviewPosition extends Enum<PreviewPosition> {
    static readonly INSIDE: PreviewPosition;
    static readonly OUTSIDE: PreviewPosition;
    static readonly OUTSIDE_TOP: PreviewPosition;
    static readonly OUTSIDE_BOTTOM: PreviewPosition;
    toString(): string;
    static valueOf(name: string): PreviewPosition;
    static values(): PreviewPosition[];
  }


  interface Theme extends Enum<Theme> {}
  class Theme extends Enum<Theme> {
    static readonly SHULKERBOXTOOLTIP: Theme;
    static readonly VANILLA: Theme;
    toString(): string;
    static valueOf(name: string): Theme;
    static values(): Theme[];
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.impl.config.gui' {
  import { AbstractWidget, TabButton, ContainerObjectSelectionList } from 'net.minecraft.client.gui.components';
  import { Component } from 'net.minecraft.network.chat';
  import { IntSupplier, Consumer } from 'java.util.function';
  import { Tab } from 'net.minecraft.client.gui.components.tabs';
  import { CategoryConfigNode, ValueConfigNode, RootConfigNode } from 'com.misterpemodder.shulkerboxtooltip.impl.tree';
  import { ScreenRectangle } from 'net.minecraft.client.gui.navigation';
  import { Minecraft } from 'net.minecraft.client';
  import { Key } from 'com.misterpemodder.shulkerboxtooltip.impl.util';
  import { ConfigEntry } from 'com.misterpemodder.shulkerboxtooltip.impl.config.gui.entry';
  import { Iterable } from 'java.lang';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Screen } from 'net.minecraft.client.gui.screens';

  interface ColorWidget extends AbstractWidget {}
  class ColorWidget extends AbstractWidget {
    constructor(label: Component, neighbor: AbstractWidget, colorSupplier: IntSupplier);
  }


  interface ConfigCategoryTab<C = any> extends Tab {}
  class ConfigCategoryTab<C = any> extends Tab {
    constructor(screen: ConfigScreen<C>, category: CategoryConfigNode<C>, config: C);
    doLayout(screenRectangle: ScreenRectangle): void;
    get config(): C;
    get minecraft(): Minecraft;
    get screen(): ConfigScreen<C>;
    get selectedKeyNode(): ValueConfigNode<C, Key, Key>;
    get tabTitle(): Component;
    keyPressed(keyCode: number, scanCode: number): boolean;
    refresh(): void;
    set selectedKeyNode(selectedKeyNode: ValueConfigNode<C, Key, Key>);
    setTabButton(tabButton: TabButton): void;
    visitChildren(consumer: Consumer<AbstractWidget>): void;
  }


  interface ConfigEntryList extends ContainerObjectSelectionList<ConfigEntry> {}
  class ConfigEntryList extends ContainerObjectSelectionList<ConfigEntry> {
    constructor(tab: ConfigCategoryTab<any>, minecraft: Minecraft, width: number, contentHeight: number, headerHeight: number, itemSpacing: number, entries: Iterable<ConfigEntry>);
    get rowWidth(): number;
    refreshEntries(): void;
    renderWidget(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }


  interface ConfigScreen<C = any> extends Screen {}
  class ConfigScreen<C = any> extends Screen {
    constructor(previous: Screen, root: RootConfigNode<C>, config: C, onSave: Consumer<C>);
    get footerHeight(): number;
    get headerHeight(): number;
    get minecraft(): Minecraft;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    onClose(): void;
    refresh(): void;
    render(guiGraphics: GuiGraphics, i: number, j: number, f: number): void;
    saveAndQuit(): void;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.impl.config.gui.entry' {
  import { Boolean, Integer } from 'java.lang';
  import { ConfigCategoryTab } from 'com.misterpemodder.shulkerboxtooltip.impl.config.gui';
  import { ValueConfigNode } from 'com.misterpemodder.shulkerboxtooltip.impl.tree';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';
  import { List } from 'java.util';
  import { NarratableEntry, NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { NarrationPriority } from 'NarratableEntry';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { ColorKey } from 'com.misterpemodder.shulkerboxtooltip.api.color';
  import { Entry } from 'ContainerObjectSelectionList';
  import { FormattedCharSequence } from 'net.minecraft.util';
  import { Key } from 'com.misterpemodder.shulkerboxtooltip.impl.util';
  import { Button } from 'net.minecraft.client.gui.components';

  interface BooleanValueConfigEntry<C = any> extends ValueConfigEntry<C, boolean, boolean> {}
  class BooleanValueConfigEntry<C = any> extends ValueConfigEntry<C, boolean, boolean> {
    constructor(tab: ConfigCategoryTab<C>, valueNode: ValueConfigNode<C, boolean, boolean>);
    refresh(): void;
    render(guiGraphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, hovered: boolean, delta: number): void;
  }


  interface CategoryTitleConfigEntry extends ConfigEntry {}
  class CategoryTitleConfigEntry extends ConfigEntry {
    constructor(tab: ConfigCategoryTab<any>, label: Component);
    children(): GuiEventListener[];
    narratables(): NarratableEntry[];
    narrationPriority(): NarrationPriority;
    render(guiGraphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, hovered: boolean, delta: number): void;
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
  }


  interface ColorValueConfigEntry<C = any> extends ValueConfigEntry<C, ColorKey, number> {}
  class ColorValueConfigEntry<C = any> extends ValueConfigEntry<C, ColorKey, number> {
    constructor(tab: ConfigCategoryTab<C>, valueNode: ValueConfigNode<C, ColorKey, number>);
    refresh(): void;
    render(guiGraphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, hovered: boolean, delta: number): void;
  }


  interface ConfigEntry extends Entry<ConfigEntry> {}
  class ConfigEntry extends Entry<ConfigEntry> {
    get tooltip(): FormattedCharSequence[];
    refresh(): void;
  }


  interface EnumValueConfigEntry<C = any, E extends Enum<E> = any> extends ValueConfigEntry<C, E, E> {}
  class EnumValueConfigEntry<C = any, E extends Enum<E> = any> extends ValueConfigEntry<C, E, E> {
    constructor(tab: ConfigCategoryTab<C>, valueNode: ValueConfigNode<C, E, E>);
    refresh(): void;
    render(guiGraphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, hovered: boolean, delta: number): void;
  }


  interface IntegerValueConfigEntry<C = any> extends ValueConfigEntry<C, number, number> {}
  class IntegerValueConfigEntry<C = any> extends ValueConfigEntry<C, number, number> {
    constructor(tab: ConfigCategoryTab<C>, valueNode: ValueConfigNode<C, number, number>);
    refresh(): void;
    render(guiGraphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, hovered: boolean, delta: number): void;
  }


  interface KeyValueConfigEntry<C = any> extends ValueConfigEntry<C, Key, Key> {}
  class KeyValueConfigEntry<C = any> extends ValueConfigEntry<C, Key, Key> {
    constructor(tab: ConfigCategoryTab<C>, valueNode: ValueConfigNode<C, Key, Key>);
    refresh(): void;
    render(guiGraphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, hovered: boolean, delta: number): void;
    resetToDefault(): void;
  }


  interface PrefixTextConfigEntry extends ConfigEntry {}
  class PrefixTextConfigEntry extends ConfigEntry {
    constructor(tab: ConfigCategoryTab<any>, text: Component);
    children(): GuiEventListener[];
    narratables(): NarratableEntry[];
    render(guiGraphics: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, hovered: boolean, delta: number): void;
  }


  interface ValueConfigEntry<C = any, T = any, V = any> extends ConfigEntry {}
  class ValueConfigEntry<C = any, T = any, V = any> extends ConfigEntry {
    readonly resetButton: Button;
    readonly undoButton: Button;
    static readonly RESET_BUTTON_LABEL: Component;
    static readonly RESET_BUTTON_TOOLTIP: Component;
    static readonly UNDO_BUTTON_LABEL: Component;
    static readonly UNDO_BUTTON_TOOLTIP: Component;
    children(): GuiEventListener[];
    get tooltip(): FormattedCharSequence[];
    get value(): V;
    narratables(): NarratableEntry[];
    refresh(): void;
    resetToActive(): void;
    resetToDefault(): void;
    set value(value: V);
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.impl.config.validators' {
  import { ValueValidator } from 'com.misterpemodder.shulkerboxtooltip.impl.tree.ValueConfigNode';
  import { Component } from 'net.minecraft.network.chat';

  interface GreaterThanZero extends ValueValidator<any> {}
  class GreaterThanZero extends ValueValidator<any> {
    validate(value: any): Component;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.impl.hook' {
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { List, Optional } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { TooltipComponent } from 'net.minecraft.world.inventory.tooltip';
  import { ItemStack } from 'net.minecraft.world.item';

  class ContainerScreenDrawTooltip {
    shulkerboxtooltip$drawMouseoverTooltip(var1: GuiGraphics, var2: Font, var3: Component[], var4: Optional<TooltipComponent>, var5: ItemStack, var6: number, var7: number): void;
  }


  class ContainerScreenLockTooltip {
    shulkerboxtooltip$lockTooltipPosition(var1: GuiGraphics, var2: Font, var3: Component[], var4: Optional<TooltipComponent>, var5: ItemStack, var6: number, var7: number): void;
  }


  class GuiGraphicsExtensions {
    get mouseX(): number;
    get mouseY(): number;
    get tooltipBottomYPosition(): number;
    get tooltipTopYPosition(): number;
    set mouseX(var1: number);
    set mouseY(var1: number);
    set tooltipBottomYPosition(var1: number);
    set tooltipTopYPosition(var1: number);
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.impl.network.channel' {
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { MessageType } from 'com.misterpemodder.shulkerboxtooltip.impl.network.message';
  import { MessageContext } from 'com.misterpemodder.shulkerboxtooltip.impl.network.context';

  interface C2SChannel<T = any> extends Channel<T> {}
  class C2SChannel<T = any> extends Channel<T> {
    canSendToServer(): boolean;
    onDisconnect(): void;
    registerFor(var1: ServerPlayer): void;
    sendToServer(var1: T): void;
    unregisterFor(var1: ServerPlayer): void;
  }


  class Channel<T = any> {
    get id(): ResourceLocation;
    get messageType(): MessageType<T>;
    onRegister(var1: MessageContext<T>): void;
    onUnregister(var1: MessageContext<T>): void;
    registerPayloadType(): void;
  }


  interface S2CChannel<T = any> extends Channel<T> {}
  class S2CChannel<T = any> extends Channel<T> {
    register(): void;
    sendTo(var1: ServerPlayer, var2: T): void;
    unregister(): void;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.impl.network.context' {
  import { Runnable } from 'java.lang';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Channel } from 'com.misterpemodder.shulkerboxtooltip.impl.network.channel';
  import { Side } from 'com.misterpemodder.shulkerboxtooltip.impl.network.context.MessageContext';

  class MessageContext<T = any> {
    execute(var1: Runnable): void;
    get channel(): Channel<T>;
    get player(): Player;
    get receivingSide(): Side;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.impl.network.context.MessageContext' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Side extends Enum<Side> {}
  class Side extends Enum<Side> {
    static readonly CLIENT: Side;
    static readonly SERVER: Side;
    static valueOf(name: string): Side;
    static values(): Side[];
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.impl.network' {
  import { ContainerListener, Container } from 'net.minecraft.world';
  import { ServerPlayer } from 'net.minecraft.server.level';

  interface EnderChestInventoryListener extends ContainerListener {}
  class EnderChestInventoryListener extends ContainerListener {
    static attachTo(player: ServerPlayer): void;
    containerChanged(inv: Container): void;
    static detachFrom(player: ServerPlayer): void;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.impl.network.message.C2SEnderChestUpdateRequest' {
  import { MessageType, C2SEnderChestUpdateRequest } from 'com.misterpemodder.shulkerboxtooltip.impl.network.message';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { MessageContext } from 'com.misterpemodder.shulkerboxtooltip.impl.network.context';

  interface Type extends MessageType<C2SEnderChestUpdateRequest> {}
  class Type extends MessageType<C2SEnderChestUpdateRequest> {
    decode(buf: FriendlyByteBuf): C2SEnderChestUpdateRequest;
    encode(message: C2SEnderChestUpdateRequest, buf: FriendlyByteBuf): void;
    onReceive(message: C2SEnderChestUpdateRequest, context: MessageContext<C2SEnderChestUpdateRequest>): void;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.impl.network.message.C2SHandshakeStart' {
  import { MessageType, C2SHandshakeStart } from 'com.misterpemodder.shulkerboxtooltip.impl.network.message';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { MessageContext } from 'com.misterpemodder.shulkerboxtooltip.impl.network.context';

  interface Type extends MessageType<C2SHandshakeStart> {}
  class Type extends MessageType<C2SHandshakeStart> {
    decode(buf: FriendlyByteBuf): C2SHandshakeStart;
    encode(message: C2SHandshakeStart, buf: FriendlyByteBuf): void;
    onReceive(message: C2SHandshakeStart, context: MessageContext<C2SHandshakeStart>): void;
    onRegister(context: MessageContext<C2SHandshakeStart>): void;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.impl.network.message' {
  import { C2SChannel, S2CChannel } from 'com.misterpemodder.shulkerboxtooltip.impl.network.channel';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { MessageContext } from 'com.misterpemodder.shulkerboxtooltip.impl.network.context';

  class C2SMessages {
    static readonly HANDSHAKE_START: C2SChannel;
    static readonly ENDER_CHEST_UPDATE_REQUEST: C2SChannel;
    static attemptHandshake(): void;
    static onDisconnectFromServer(): void;
    static registerAllFor(player: ServerPlayer): void;
    static registerPayloadTypes(): void;
  }


  class MessageType<T = any> {
    decode(var1: FriendlyByteBuf): T;
    encode(var1: T, var2: FriendlyByteBuf): void;
    onReceive(var1: T, var2: MessageContext<T>): void;
    onRegister(context: MessageContext<T>): void;
    onUnregister(context: MessageContext<T>): void;
  }


  class S2CMessages {
    static readonly HANDSHAKE_RESPONSE: S2CChannel;
    static readonly ENDER_CHEST_UPDATE: S2CChannel;
    static registerAll(): void;
    static registerPayloadTypes(): void;
    static unregisterAll(): void;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.impl.network.message.S2CEnderChestUpdate' {
  import { MessageType, S2CEnderChestUpdate } from 'com.misterpemodder.shulkerboxtooltip.impl.network.message';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { MessageContext } from 'com.misterpemodder.shulkerboxtooltip.impl.network.context';

  interface Type extends MessageType<S2CEnderChestUpdate> {}
  class Type extends MessageType<S2CEnderChestUpdate> {
    decode(buf: FriendlyByteBuf): S2CEnderChestUpdate;
    encode(message: S2CEnderChestUpdate, buf: FriendlyByteBuf): void;
    onReceive(message: S2CEnderChestUpdate, context: MessageContext<S2CEnderChestUpdate>): void;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.impl.network.message.S2CHandshakeResponse' {
  import { MessageType, S2CHandshakeResponse } from 'com.misterpemodder.shulkerboxtooltip.impl.network.message';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { MessageContext } from 'com.misterpemodder.shulkerboxtooltip.impl.network.context';

  interface Type extends MessageType<S2CHandshakeResponse> {}
  class Type extends MessageType<S2CHandshakeResponse> {
    decode(buf: FriendlyByteBuf): S2CHandshakeResponse;
    encode(message: S2CHandshakeResponse, buf: FriendlyByteBuf): void;
    onReceive(message: S2CHandshakeResponse, context: MessageContext<S2CHandshakeResponse>): void;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.impl.network.neoforge' {
  import { C2SChannel, Channel, S2CChannel } from 'com.misterpemodder.shulkerboxtooltip.impl.network.channel';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { MessageType } from 'com.misterpemodder.shulkerboxtooltip.impl.network.message';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { RegisterPayloadHandlersEvent } from 'net.neoforged.neoforge.network.event';
  import { MessageContext } from 'com.misterpemodder.shulkerboxtooltip.impl.network.context';

  interface NeoForgeC2SChannel<T = any> extends C2SChannel<T>, NeoForgeChannel<T> {}
  class NeoForgeC2SChannel<T = any> extends C2SChannel<T> {
    constructor(id: ResourceLocation, type: MessageType<T>);
    canSendToServer(): boolean;
    onDisconnect(): void;
    registerFor(player: ServerPlayer): void;
    sendToServer(message: T): void;
    unregisterFor(player: ServerPlayer): void;
  }


  interface NeoForgeChannel<T = any> extends Channel<T> {}
  class NeoForgeChannel<T = any> extends Channel<T> {
    get id(): ResourceLocation;
    get messageType(): MessageType<T>;
    onRegister(context: MessageContext<T>): void;
    onUnregister(context: MessageContext<T>): void;
    registerPayloadType(): void;
    registerPayloadTypeDeferred(event: RegisterPayloadHandlersEvent): void;
  }


  interface NeoForgeS2CChannel<T = any> extends S2CChannel<T>, NeoForgeChannel<T> {}
  class NeoForgeS2CChannel<T = any> extends S2CChannel<T> {
    constructor(id: ResourceLocation, type: MessageType<T>);
    register(): void;
    sendTo(player: ServerPlayer, message: T): void;
    unregister(): void;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.impl' {
  import { List } from 'java.util';
  import { PluginContainer } from 'com.misterpemodder.shulkerboxtooltip.impl.PluginManager';

  class PluginManager {
    static areColorsLoaded(): boolean;
    static get pluginContainers(): PluginContainer[];
    static loadColors(): void;
    static loadProviders(): void;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.impl.PreviewContextImpl' {
  import { Builder as com_misterpemodder_shulkerboxtooltip_api_previewcontext_Builder } from 'com.misterpemodder.shulkerboxtooltip.api.PreviewContext';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Provider } from 'HolderLookup';
  import { PreviewContext } from 'com.misterpemodder.shulkerboxtooltip.api';

  interface Builder extends com_misterpemodder_shulkerboxtooltip_api_previewcontext_Builder {}
  class Builder extends com_misterpemodder_shulkerboxtooltip_api_previewcontext_Builder {
    constructor(stack: ItemStack);
    build(): PreviewContext;
    withOwner(owner: Player): Builder;
    withRegistryLookup(registryLookup: Provider): Builder;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.impl.provider' {
  import { PreviewProvider, BlockEntityPreviewProvider } from 'com.misterpemodder.shulkerboxtooltip.api.provider';
  import { List } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { PreviewContext } from 'com.misterpemodder.shulkerboxtooltip.api';
  import { ColorKey } from 'com.misterpemodder.shulkerboxtooltip.api.color';
  import { Component } from 'net.minecraft.network.chat';
  import { Supplier } from 'java.util.function';
  import { Container } from 'net.minecraft.world';
  import { PreviewRenderer } from 'com.misterpemodder.shulkerboxtooltip.api.renderer';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ShulkerBoxBlockEntity } from 'net.minecraft.world.level.block.entity';

  interface EnderChestPreviewProvider extends PreviewProvider {}
  class EnderChestPreviewProvider extends PreviewProvider {
    addTooltip(context: PreviewContext): Component[];
    getInventory(context: PreviewContext): ItemStack[];
    getInventoryMaxSize(context: PreviewContext): number;
    getWindowColorKey(context: PreviewContext): ColorKey;
    onInventoryAccessStart(context: PreviewContext): void;
    shouldDisplay(context: PreviewContext): boolean;
    showTooltipHints(context: PreviewContext): boolean;
  }


  interface InventoryAwarePreviewProvider<I extends Container = any> extends BlockEntityPreviewProvider {}
  class InventoryAwarePreviewProvider<I extends Container = any> extends BlockEntityPreviewProvider {
    constructor(maxRowSize: number, inventoryFactory: Supplier<I>);
    canUseLootTables(): boolean;
    getInventoryMaxSize(context: PreviewContext): number;
    showTooltipHints(context: PreviewContext): boolean;
  }


  interface LecternPreviewProvider extends InventoryAwarePreviewProvider<Container> {}
  class LecternPreviewProvider extends InventoryAwarePreviewProvider<Container> {
    constructor(maxRowSize: number, inventoryFactory: Supplier<Container>);
    getInventory(context: PreviewContext): ItemStack[];
    showTooltipHints(context: PreviewContext): boolean;
  }


  interface OverridingPreviewProvider extends PreviewProvider {}
  class OverridingPreviewProvider extends PreviewProvider {
    addTooltip(context: PreviewContext): Component[];
    get priority(): number;
    get renderer(): PreviewRenderer;
    getFullTooltipHintLangKey(context: PreviewContext): string;
    getInventory(context: PreviewContext): ItemStack[];
    getInventoryMaxSize(context: PreviewContext): number;
    getLockKeyTooltipHintLangKey(context: PreviewContext): string;
    getMaxRowSize(context: PreviewContext): number;
    getTextureOverride(context: PreviewContext): ResourceLocation;
    getTooltipHintLangKey(context: PreviewContext): string;
    getWindowColorKey(context: PreviewContext): ColorKey;
    isFullPreviewAvailable(context: PreviewContext): boolean;
    static maybeWrap(delegate: PreviewProvider, stack: ItemStack): PreviewProvider;
    onInventoryAccessStart(context: PreviewContext): void;
    shouldDisplay(context: PreviewContext): boolean;
    showTooltipHints(context: PreviewContext): boolean;
  }


  interface ShulkerBoxPreviewProvider extends InventoryAwarePreviewProvider<ShulkerBoxBlockEntity> {}
  class ShulkerBoxPreviewProvider extends InventoryAwarePreviewProvider<ShulkerBoxBlockEntity> {
    constructor(maxRowSize: number, blockEntitySupplier: Supplier<ShulkerBoxBlockEntity>);
    addTooltip(context: PreviewContext): Component[];
    getWindowColorKey(context: PreviewContext): ColorKey;
    showTooltipHints(context: PreviewContext): boolean;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.impl.renderer' {
  import { PreviewRenderer } from 'com.misterpemodder.shulkerboxtooltip.api.renderer';
  import { PreviewType, PreviewContext } from 'com.misterpemodder.shulkerboxtooltip.api';
  import { PreviewProvider } from 'com.misterpemodder.shulkerboxtooltip.api.provider';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface BasePreviewRenderer extends PreviewRenderer {}
  class BasePreviewRenderer extends PreviewRenderer {
    setPreview(context: PreviewContext, provider: PreviewProvider): void;
    setPreviewType(type: PreviewType): void;
  }


  interface ModPreviewRenderer extends BasePreviewRenderer {}
  class ModPreviewRenderer extends BasePreviewRenderer {
    static readonly INSTANCE: ModPreviewRenderer;
    draw(x: number, y: number, graphics: GuiGraphics, font: Font, mouseX: number, mouseY: number): void;
    get height(): number;
    get width(): number;
  }


  interface VanillaPreviewRenderer extends BasePreviewRenderer {}
  class VanillaPreviewRenderer extends BasePreviewRenderer {
    static readonly DEFAULT_TEXTURE: ResourceLocation;
    static readonly INSTANCE: VanillaPreviewRenderer;
    draw(x: number, y: number, graphics: GuiGraphics, font: Font, mouseX: number, mouseY: number): void;
    get height(): number;
    get width(): number;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.impl.tooltip' {
  import { ClientTooltipComponent } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { Font, GuiGraphics } from 'net.minecraft.client.gui';

  interface PositionAwareClientTooltipComponent extends ClientTooltipComponent {}
  class PositionAwareClientTooltipComponent extends ClientTooltipComponent {
    drawItemsWithTooltipPosition(var1: Font, var2: number, var3: number, var4: GuiGraphics, var5: number, var6: number, var7: number, var8: number): void;
  }


  interface PreviewClientTooltipComponent extends PositionAwareClientTooltipComponent {}
  class PreviewClientTooltipComponent extends PositionAwareClientTooltipComponent {
    constructor(data: PreviewTooltipComponent);
    drawItemsWithTooltipPosition(font: Font, x: number, y: number, graphics: GuiGraphics, tooltipTopY: number, tooltipBottomY: number, mouseX: number, mouseY: number): void;
    get height(): number;
    getWidth(font: Font): number;
    renderImage(font: Font, x: number, y: number, graphics: GuiGraphics): void;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.impl.tree' {
  import { Component } from 'net.minecraft.network.chat';
  import { Builder } from 'com.misterpemodder.shulkerboxtooltip.impl.tree.CategoryConfigNode';
  import { ImmutableList } from 'com.google.common.collect';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Builder as com_misterpemodder_shulkerboxtooltip_impl_tree_valueconfignode_Builder } from 'com.misterpemodder.shulkerboxtooltip.impl.tree.ValueConfigNode';
  import { Class } from 'java.lang';

  interface CategoryConfigNode<C = any> extends ConfigNode<C> {}
  class CategoryConfigNode<C = any> extends ConfigNode<C> {
    static readonly MULTIPLE_ERRORS: Component;
    static builder<C>(): Builder<C>;
    copy(from: C, to: C): void;
    get children(): ImmutableList<ConfigNode<C>>;
    get name(): string;
    get prefix(): Component;
    get title(): Component;
    get tooltip(): Component;
    isActiveValue(config: C): boolean;
    isDefaultValue(config: C): boolean;
    readFromNbt(config: C, compound: CompoundTag): void;
    resetToActive(config: C): void;
    resetToDefault(): void;
    restartRequired(config: C): boolean;
    validate(config: C): Component;
    writeEditingToConfig(config: C): void;
    writeToNbt(config: C, compound: CompoundTag): void;
  }


  class ConfigNode<C = any> {
    copy(var1: C, var2: C): void;
    get name(): string;
    get prefix(): Component;
    get title(): Component;
    get tooltip(): Component;
    isActiveValue(var1: C): boolean;
    isDefaultValue(var1: C): boolean;
    readFromNbt(var1: C, var2: CompoundTag): void;
    resetToActive(var1: C): void;
    resetToDefault(): void;
    restartRequired(var1: C): boolean;
    validate(var1: C): Component;
    writeEditingToConfig(var1: C): void;
    writeToNbt(var1: C, var2: CompoundTag): void;
  }


  interface RootConfigNode<C = any> extends ConfigNode<C> {}
  class RootConfigNode<C = any> extends ConfigNode<C> {
    static readonly TITLE: Component;
    copy(from: C, to: C): void;
    static create<C>(defaultConfig: C): RootConfigNode<C>;
    get categories(): ImmutableList<CategoryConfigNode<C>>;
    get name(): string;
    get prefix(): Component;
    get title(): Component;
    get tooltip(): Component;
    isActiveValue(config: C): boolean;
    isDefaultValue(config: C): boolean;
    readFromNbt(config: C, compound: CompoundTag): void;
    reload(defaultConfig: C): void;
    resetToActive(config: C): void;
    resetToDefault(): void;
    restartRequired(config: C): boolean;
    validate(config: C): Component;
    writeEditingToConfig(config: C): void;
    writeToNbt(config: C, compound: CompoundTag): void;
  }


  interface ValueConfigNode<C = any, T = any, V = any> extends ConfigNode<C> {}
  class ValueConfigNode<C = any, T = any, V = any> extends ConfigNode<C> {
    static builder<C, T, V>(): com_misterpemodder_shulkerboxtooltip_impl_tree_valueconfignode_Builder<C, T, V>;
    copy(from: C, to: C): void;
    get defaultValue(): V;
    get name(): string;
    get prefix(): Component;
    get title(): Component;
    get tooltip(): Component;
    get type(): Class<T>;
    get valueType(): Class<V>;
    getActiveValue(config: C): V;
    getEditingValue(config: C): V;
    isActiveValue(config: C): boolean;
    isDefaultValue(config: C): boolean;
    readFromNbt(config: C, compound: CompoundTag): void;
    resetToActive(config: C): void;
    resetToDefault(): void;
    restartRequired(config: C): boolean;
    setActiveValue(config: C, value: V): void;
    setEditingValue(value: V): void;
    validate(config: C): Component;
    writeEditingToConfig(config: C): void;
    writeToNbt(config: C, compound: CompoundTag): void;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.impl.tree.CategoryConfigNode' {
  import { Component } from 'net.minecraft.network.chat';
  import { UnaryOperator } from 'java.util.function';
  import { Builder as com_misterpemodder_shulkerboxtooltip_impl_tree_valueconfignode_Builder } from 'com.misterpemodder.shulkerboxtooltip.impl.tree.ValueConfigNode';
  import { CategoryConfigNode } from 'com.misterpemodder.shulkerboxtooltip.impl.tree';

  class Builder<C = any> {
    build(): CategoryConfigNode<C>;
    category(categoryBuilder: UnaryOperator<Builder<C>>): Builder<C>;
    name(name: string): Builder<C>;
    title(title: Component): Builder<C>;
    tooltip(tooltip: Component): Builder<C>;
    value<T, V>(valueBuilder: UnaryOperator<com_misterpemodder_shulkerboxtooltip_impl_tree_valueconfignode_Builder<C, T, V>>): Builder<C>;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.impl.tree.ValueConfigNode' {
  import { Class } from 'java.lang';
  import { Component } from 'net.minecraft.network.chat';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { CategoryConfigNode, ValueConfigNode } from 'com.misterpemodder.shulkerboxtooltip.impl.tree';

  class Builder<C = any, T = any, V = any> {
    build(): ValueConfigNode<C, T, V>;
    category(category: CategoryConfigNode<C>): Builder<C, T, V>;
    defaultValue(defaultValue: V): Builder<C, T, V>;
    name(name: string): Builder<C, T, V>;
    nbtReader(nbtReader: ValueReader<CompoundTag, V>): Builder<C, T, V>;
    nbtWriter(nbtWriter: ValueWriter<CompoundTag, V>): Builder<C, T, V>;
    prefix(prefix: Component): Builder<C, T, V>;
    requiresRestart(requiresRestart: boolean): Builder<C, T, V>;
    title(title: Component): Builder<C, T, V>;
    tooltip(tooltip: Component): Builder<C, T, V>;
    type(type: Class<T>): Builder<C, T, V>;
    validator(validator: ValueValidator<V>): Builder<C, T, V>;
    valueReader(valueReader: ValueReader<C, V>): Builder<C, T, V>;
    valueType(valueType: Class<V>): Builder<C, T, V>;
    valueWriter(valueWriter: ValueWriter<C, V>): Builder<C, T, V>;
  }


  class ValueReader<S = any, V = any> {
    read(var1: S): V;
  }


  class ValueWriter<S = any, V = any> {
    write(var1: S, var2: V): void;
  }


  class ValueValidator<V = any> {
    validate(var1: V): Component;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.impl.util' {
  import { Configuration } from 'com.misterpemodder.shulkerboxtooltip.impl.config';
  import { Class, Comparable, Exception } from 'java.lang';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Key as inputconstants_Key } from 'InputConstants';
  import { ItemStackMergingStrategy } from 'com.misterpemodder.shulkerboxtooltip.api.config';
  import { List } from 'java.util';
  import { Logger } from 'org.apache.logging.log4j';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface ClientEnvironmentUtil extends EnvironmentUtil {}
  class ClientEnvironmentUtil extends EnvironmentUtil {
    get configurationClass(): Class<Configuration>;
    makeConfiguration(): Configuration;
  }


  interface EnvironmentUtil extends ClientEnvironmentUtil, ServerEnvironmentUtil {}
  class EnvironmentUtil extends ClientEnvironmentUtil {
    get configurationClass(): Class<Configuration>;
    static get instance(): EnvironmentUtil;
    static isClient(): boolean;
    makeConfiguration(): Configuration;
  }


  class ItemKey {
    constructor(stack: ItemStack, ignoreComponents: boolean);
    equals(other: any): boolean;
    hashCode(): number;
  }


  class Key {
    static readonly UNKNOWN_KEY: Key;
    constructor(key: inputconstants_Key);
    static defaultFullPreviewKey(): Key;
    static defaultLockTooltipKey(): Key;
    static defaultPreviewKey(): Key;
    equals(o: any): boolean;
    static fromTranslationKey(translationKey: string): Key;
    get (): inputconstants_Key;
    hashCode(): number;
    isUnbound(): boolean;
    set (key: inputconstants_Key);
  }


  interface MergedItemStack extends Comparable<MergedItemStack> {}
  class MergedItemStack extends Comparable<MergedItemStack> {
    constructor(slotCount: number);
    add(stack: ItemStack, slot: number, mergingStrategy: ItemStackMergingStrategy): void;
    compareTo(other: MergedItemStack): number;
    get (): ItemStack;
    getSubStack(slot: number): ItemStack;
    static mergeInventory(inventory: ItemStack[], maxSize: number, mergingStrategy: ItemStackMergingStrategy): MergedItemStack[];
    size(): number;
  }


  class NamedLogger {
    constructor(inner: Logger);
    debug(message: string): void;
    error(message: string): void;
    error(message: string, error: Exception): void;
    info(message: string): void;
    info(message: string, arg1: any): void;
    info(message: string, arg1: any, arg2: any): void;
    warn(message: string): void;
  }


  class NbtType {
    static readonly END: number;
    static readonly BYTE: number;
    static readonly SHORT: number;
    static readonly INT: number;
    static readonly LONG: number;
    static readonly FLOAT: number;
    static readonly DOUBLE: number;
    static readonly BYTE_ARRAY: number;
    static readonly STRING: number;
    static readonly LIST: number;
    static readonly COMPOUND: number;
    static readonly INT_ARRAY: number;
    static readonly LONG_ARRAY: number;
    static readonly NUMBER: number;
  }


  interface ServerEnvironmentUtil extends EnvironmentUtil {}
  class ServerEnvironmentUtil extends EnvironmentUtil {
    get configurationClass(): Class<Configuration>;
    makeConfiguration(): Configuration;
  }


  class ShulkerBoxTooltipUtil {
    static abbreviateInteger(count: number): string;
    static componentsToRgb(components: number[]): number;
    static id(id: string): ResourceLocation;
    static rgbToComponents(rgb: number): number[];
    static snakeCase(str: string): string;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.mixin.client' {
  import { ContainerScreenLockTooltip, GuiGraphicsExtensions } from 'com.misterpemodder.shulkerboxtooltip.impl.hook';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { List, Optional } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { TooltipComponent } from 'net.minecraft.world.inventory.tooltip';
  import { ItemStack } from 'net.minecraft.world.item';

  interface AbstractContainerScreenMixin extends ContainerScreenLockTooltip {}
  class AbstractContainerScreenMixin extends ContainerScreenLockTooltip {
    shulkerboxtooltip$lockTooltipPosition(graphics: GuiGraphics, font: Font, text: Component[], data: Optional<TooltipComponent>, stack: ItemStack, x: number, y: number): void;
  }


  interface GuiGraphicsMixin extends GuiGraphicsExtensions {}
  class GuiGraphicsMixin extends GuiGraphicsExtensions {
    get mouseX(): number;
    get mouseY(): number;
    get tooltipBottomYPosition(): number;
    get tooltipTopYPosition(): number;
    set mouseX(mouseX: number);
    set mouseY(mouseY: number);
    set tooltipBottomYPosition(bottomY: number);
    set tooltipTopYPosition(topY: number);
  }


  class ItemStackMixin {
  }


  class KeyboardHandlerMixin {
  }


  class ShulkerBoxBlockMixin {
  }


  class TooltipRenderUtilMixin {
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.mixin.client.neoforge' {
  import { ContainerScreenDrawTooltip } from 'com.misterpemodder.shulkerboxtooltip.impl.hook';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { List, Optional } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { TooltipComponent } from 'net.minecraft.world.inventory.tooltip';
  import { ItemStack } from 'net.minecraft.world.item';

  interface AbstractContainerScreenMixin extends ContainerScreenDrawTooltip {}
  class AbstractContainerScreenMixin extends ContainerScreenDrawTooltip {
    shulkerboxtooltip$drawMouseoverTooltip(graphics: GuiGraphics, font: Font, text: Component[], data: Optional<TooltipComponent>, stack: ItemStack, x: number, y: number): void;
  }


  class TooltipRenderUtilMixin {
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.shadowed.blue.endless.jankson.api' {
  import { Exception, Throwable, Class } from 'java.lang';
  import { InternalDeserializerFunction } from 'com.misterpemodder.shulkerboxtooltip.shadowed.blue.endless.jankson.impl.serializer';
  import { JsonElement } from 'com.misterpemodder.shulkerboxtooltip.shadowed.blue.endless.jankson';
  import { Type } from 'java.lang.reflect';

  interface DeserializationException extends Exception {}
  class DeserializationException extends Exception {
    constructor();

    constructor(message: string);

    constructor(message: string, cause: Throwable);

    constructor(cause: Throwable);
  }


  interface DeserializerFunction<A = any, B = any> extends InternalDeserializerFunction<B> {}
  class DeserializerFunction<A = any, B = any> extends InternalDeserializerFunction<B> {
    apply(var1: A, var2: Marshaller): B;
    deserialize(a: any, m: Marshaller): B;
  }


  class Marshaller {
    marshall<E>(var1: Class<E>, var2: JsonElement): E;
    marshall<E>(var1: Type, var2: JsonElement): E;
    marshallCarefully<E>(var1: Class<E>, var2: JsonElement): E;
    serialize(var1: any): JsonElement;
  }


  interface SyntaxError extends Exception {}
  class SyntaxError extends Exception {
    constructor(message: string);
    get completeMessage(): string;
    get lineMessage(): string;
    setEndParsing(line: number, column: number): void;
    setStartParsing(line: number, column: number): void;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.shadowed.blue.endless.jankson.impl' {
  import { JsonElement, JsonArray, Jankson, JsonPrimitive, JsonObject } from 'com.misterpemodder.shulkerboxtooltip.shadowed.blue.endless.jankson';
  import { Field, Type } from 'java.lang.reflect';
  import { Marshaller } from 'com.misterpemodder.shulkerboxtooltip.shadowed.blue.endless.jankson.api';
  import { Map, Collection } from 'java.util';

  class AnnotatedElement {
    constructor(elem: JsonElement, comment: string);
    get comment(): string;
    get element(): JsonElement;
  }


  interface ArrayParserContext extends ParserContext<JsonArray> {}
  class ArrayParserContext extends ParserContext<JsonArray> {
    consume(codePoint: number, loader: Jankson): boolean;
    eof(): void;
    get result(): JsonArray;
    isComplete(): boolean;
  }


  interface CommentParserContext extends ParserContext<string> {}
  class CommentParserContext extends ParserContext<string> {
    constructor(codePoint: number);
    consume(codePoint: number, loader: Jankson): boolean;
    eof(): void;
    get result(): string;
    isComplete(): boolean;
  }


  interface ElementParserContext extends ParserContext<AnnotatedElement> {}
  class ElementParserContext extends ParserContext<AnnotatedElement> {
    consume(codePoint: number, loader: Jankson): boolean;
    eof(): void;
    get result(): AnnotatedElement;
    isComplete(): boolean;
    set result(elem: JsonElement);
  }


  interface NumberParserContext extends ParserContext<JsonPrimitive> {}
  class NumberParserContext extends ParserContext<JsonPrimitive> {
    constructor(firstCodePoint: number);
    consume(codePoint: number, loader: Jankson): boolean;
    eof(): void;
    get result(): JsonPrimitive;
    isComplete(): boolean;
  }


  interface ObjectParserContext extends ParserContext<JsonObject> {}
  class ObjectParserContext extends ParserContext<JsonObject> {
    consume(codePoint: number, loader: Jankson): boolean;
    eof(): void;
    get result(): JsonObject;
    isComplete(): boolean;
  }


  class ParserContext<T = any> {
    consume(var1: number, var2: Jankson): boolean;
    eof(): void;
    get result(): T;
    isComplete(): boolean;
  }


  class POJODeserializer {
    static unpack(t: Type, elem: JsonElement, marshaller: Marshaller): any;
    static unpackCollection(collection: Collection<any>, elementType: Type, elem: JsonElement, marshaller: Marshaller): void;
    static unpackField(parent: any, f: Field, source: JsonObject, failFast: boolean): void;
    static unpackFieldData(parent: any, field: Field, elem: JsonElement, marshaller: Marshaller): boolean;
    static unpackMap(map: Map<any, any>, keyType: Type, valueType: Type, elem: JsonElement, marshaller: Marshaller): void;
    static unpackObject(target: any, source: JsonObject): void;
    static unpackObject(target: any, source: JsonObject, failFast: boolean): void;
  }


  interface StringParserContext extends ParserContext<JsonPrimitive> {}
  class StringParserContext extends ParserContext<JsonPrimitive> {
    constructor(quote: number);
    consume(codePoint: number, loader: Jankson): boolean;
    eof(): void;
    get result(): JsonPrimitive;
    isComplete(): boolean;
  }


  interface TokenParserContext extends ParserContext<JsonPrimitive> {}
  class TokenParserContext extends ParserContext<JsonPrimitive> {
    constructor(firstCodePoint: number);
    consume(codePoint: number, loader: Jankson): boolean;
    eof(): void;
    get result(): JsonPrimitive;
    isComplete(): boolean;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.shadowed.blue.endless.jankson.impl.serializer' {
  import { StringBuilder, Class } from 'java.lang';
  import { JsonGrammar, JsonElement } from 'com.misterpemodder.shulkerboxtooltip.shadowed.blue.endless.jankson';
  import { Marshaller } from 'com.misterpemodder.shulkerboxtooltip.shadowed.blue.endless.jankson.api';

  class CommentSerializer {
    static print(builder: StringBuilder, comment: string, indent: number, grammar: JsonGrammar): void;
    static print(builder: StringBuilder, comment: string, indent: number, comments: boolean, whitespace: boolean): void;
  }


  class DeserializerFunctionPool<B = any> {
    constructor(targetClass: Class<B>);
    apply(elem: JsonElement, marshaller: Marshaller): B;
    getFunction(sourceClass: Class<any>): InternalDeserializerFunction<B>;
    registerUnsafe(sourceClass: Class<any>, functionParameter: InternalDeserializerFunction<B>): void;
  }


  class InternalDeserializerFunction<B = any> {
    deserialize(var1: any, var2: Marshaller): B;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.shadowed.blue.endless.jankson.impl.serializer.DeserializerFunctionPool' {
  import { Exception } from 'java.lang';

  interface FunctionMatchFailedException extends Exception {}
  class FunctionMatchFailedException extends Exception {
    constructor(message: string);
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.shadowed.blue.endless.jankson' {
  import { File, InputStream } from 'java.io';
  import { Class, Iterable, Cloneable } from 'java.lang';
  import { Marshaller, SyntaxError } from 'com.misterpemodder.shulkerboxtooltip.shadowed.blue.endless.jankson.api';
  import { ParserContext } from 'com.misterpemodder.shulkerboxtooltip.shadowed.blue.endless.jankson.impl';
  import { Consumer } from 'java.util.function';
  import { Builder } from 'com.misterpemodder.shulkerboxtooltip.shadowed.blue.endless.jankson.Jankson';
  import { List, Collection, Iterator, ListIterator, Map, Set } from 'java.util';
  import { Builder as com_misterpemodder_shulkerboxtooltip_shadowed_blue_endless_jankson_jsongrammar_Builder } from 'com.misterpemodder.shulkerboxtooltip.shadowed.blue.endless.jankson.JsonGrammar';
  import { Entry } from 'Map';

  class Jankson {
    static builder(): Builder;
    fromJson<T>(obj: JsonObject, clazz: Class<T>): T;
    fromJson<T>(json: string, clazz: Class<T>): T;
    fromJsonCarefully<T>(json: string, clazz: Class<T>): T;
    fromJsonCarefully<T>(obj: JsonObject, clazz: Class<T>): T;
    get marshaller(): Marshaller;
    getCodePoint(inParameter: InputStream): number;
    load(s: string): JsonObject;
    load(f: File): JsonObject;
    load(inParameter: InputStream): JsonObject;
    loadElement(s: string): JsonElement;
    loadElement(f: File): JsonElement;
    loadElement(inParameter: InputStream): JsonElement;
    push<T>(t: ParserContext<T>, consumer: Consumer<T>): void;
    throwDelayed(syntaxError: SyntaxError): void;
    toJson<T>(t: T): JsonElement;
    toJson<T>(t: T, alternateMarshaller: Marshaller): JsonElement;
  }


  interface JsonArray extends List<JsonElement>, Iterable<JsonElement>, JsonElement {}
  class JsonArray extends List<JsonElement> {
    constructor();

    constructor(ts: T[], marshaller: Marshaller);

    constructor(ts: Collection<any>, marshaller: Marshaller);
    add(e: JsonElement, comment: string): boolean;
    add(e: JsonElement): boolean;
    add(index: number, element: JsonElement): void;
    addAll(c: Collection<JsonElement>): boolean;
    addAll(index: number, elements: Collection<JsonElement>): boolean;
    clear(): void;
    clone(): JsonArray;
    contains(o: any): boolean;
    containsAll(c: Collection<any>): boolean;
    equals(other: any): boolean;
    get(i: number): JsonElement;
    get<E>(clazz: Class<E>, index: number): E;
    get marshaller(): Marshaller;
    getBoolean(index: number, defaultValue: boolean): boolean;
    getByte(index: number, defaultValue: number): number;
    getChar(index: number, defaultValue: string): string;
    getComment(i: number): string;
    getDouble(index: number, defaultValue: number): number;
    getFloat(index: number, defaultValue: number): number;
    getInt(index: number, defaultValue: number): number;
    getLong(index: number, defaultValue: number): number;
    getShort(index: number, defaultValue: number): number;
    getString(index: number, defaultValue: string): string;
    hashCode(): number;
    indexOf(obj: any): number;
    isEmpty(): boolean;
    iterator(): Iterator<JsonElement>;
    lastIndexOf(obj: any): number;
    listIterator(): ListIterator<JsonElement>;
    listIterator(index: number): ListIterator<JsonElement>;
    remove(o: any): boolean;
    remove(index: number): JsonElement;
    removeAll(c: Collection<any>): boolean;
    retainAll(c: Collection<any>): boolean;
    set(index: number, element: JsonElement): JsonElement;
    set marshaller(marshaller: Marshaller);
    setComment(i: number, comment: string): void;
    size(): number;
    subList(arg0: number, arg1: number): JsonElement[];
    toArray(): JsonElement[];
    toArray<T>(a: T[]): T[];
    toJson(comments: boolean, newlines: boolean, depth: number): string;
    toJson(grammar: JsonGrammar, depth: number): string;
    toJson(): string;
    toJson(comments: boolean, newlines: boolean): string;
    toJson(grammar: JsonGrammar): string;
    toString(): string;
  }


  interface JsonElement extends Cloneable {}
  class JsonElement extends Cloneable {
    clone(): JsonElement;
    toJson(): string;
    toJson(comments: boolean, newlines: boolean): string;
    toJson(var1: boolean, var2: boolean, var3: number): string;
    toJson(var1: JsonGrammar, var2: number): string;
    toJson(grammar: JsonGrammar): string;
  }


  class JsonGrammar {
    static readonly JANKSON: JsonGrammar;
    static readonly JSON5: JsonGrammar;
    static readonly STRICT: JsonGrammar;
    static readonly COMPACT: JsonGrammar;
    static builder(): com_misterpemodder_shulkerboxtooltip_shadowed_blue_endless_jankson_jsongrammar_Builder;
    hasComments(): boolean;
    shouldOutputWhitespace(): boolean;
  }


  interface JsonNull extends JsonElement {}
  class JsonNull extends JsonElement {
    static readonly INSTANCE: JsonNull;
    clone(): JsonNull;
    equals(other: any): boolean;
    hashCode(): number;
    toJson(comments: boolean, newlines: boolean, depth: number): string;
    toJson(grammar: JsonGrammar, depth: number): string;
    toJson(): string;
    toJson(comments: boolean, newlines: boolean): string;
    toJson(grammar: JsonGrammar): string;
    toString(): string;
  }


  interface JsonObject extends Map<string, JsonElement>, JsonElement {}
  class JsonObject extends Map<string, JsonElement> {
    clear(): void;
    clone(): JsonObject;
    containsKey(key: any): boolean;
    containsValue(val: any): boolean;
    entrySet(): Set<Entry<string, JsonElement>>;
    equals(other: any): boolean;
    get<E>(clazz: Class<E>, key: string): E;
    get(key: any): JsonElement;
    get key(): string;
    get marshaller(): Marshaller;
    get value(): JsonElement;
    getBoolean(key: string, defaultValue: boolean): boolean;
    getByte(key: string, defaultValue: number): number;
    getChar(key: string, defaultValue: string): string;
    getComment(name: string): string;
    getDelta(defaults: JsonObject): JsonObject;
    getDouble(key: string, defaultValue: number): number;
    getFloat(key: string, defaultValue: number): number;
    getInt(key: string, defaultValue: number): number;
    getLong(key: string, defaultValue: number): number;
    getObject(name: string): JsonObject;
    getShort(key: string, defaultValue: number): number;
    hashCode(): number;
    isEmpty(): boolean;
    keySet(): Set<string>;
    put(key: string, elem: JsonElement, comment: string): JsonElement;
    put(key: string, elem: JsonElement): JsonElement;
    putAll(map: Map<string, JsonElement>): void;
    putDefault(key: string, elem: JsonElement, comment: string): JsonElement;
    putDefault<T>(key: string, elem: T, comment: string): T;
    putDefault<T>(key: string, elem: T, clazz: Class<T>, comment: string): T;
    recursiveGet<E>(clazz: Class<E>, key: string): E;
    recursiveGetOrCreate<E extends JsonElement>(clazz: Class<E>, key: string, fallback: E, comment: string): E;
    remove(key: any): JsonElement;
    set marshaller(marshaller: Marshaller);
    set value(value: JsonElement);
    setComment(name: string, comment: string): void;
    size(): number;
    toJson(comments: boolean, newlines: boolean, depth: number): string;
    toJson(grammar: JsonGrammar, depth: number): string;
    toJson(): string;
    toJson(comments: boolean, newlines: boolean): string;
    toJson(grammar: JsonGrammar): string;
    toString(): string;
    values(): Collection<JsonElement>;
  }


  interface JsonPrimitive extends JsonElement {}
  class JsonPrimitive extends JsonElement {
    static TRUE: JsonPrimitive;
    static FALSE: JsonPrimitive;
    constructor(value: any);
    asBoolean(defaultValue: boolean): boolean;
    asByte(defaultValue: number): number;
    asChar(defaultValue: string): string;
    asDouble(defaultValue: number): number;
    asFloat(defaultValue: number): number;
    asInt(defaultValue: number): number;
    asLong(defaultValue: number): number;
    asShort(defaultValue: number): number;
    asString(): string;
    clone(): JsonPrimitive;
    equals(other: any): boolean;
    static escape(s: string): string;
    get value(): any;
    hashCode(): number;
    toJson(comments: boolean, newlines: boolean, depth: number): string;
    toJson(grammar: JsonGrammar, depth: number): string;
    toJson(): string;
    toJson(comments: boolean, newlines: boolean): string;
    toJson(grammar: JsonGrammar): string;
    toString(): string;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.shadowed.blue.endless.jankson.Jankson' {
  import { Class } from 'java.lang';
  import { Function, BiFunction, Supplier } from 'java.util.function';
  import { JsonObject, JsonElement, Jankson } from 'com.misterpemodder.shulkerboxtooltip.shadowed.blue.endless.jankson';
  import { Marshaller, DeserializerFunction } from 'com.misterpemodder.shulkerboxtooltip.shadowed.blue.endless.jankson.api';

  class Builder {
    build(): Jankson;
    registerDeserializer<A, B>(sourceClass: Class<A>, targetClass: Class<B>, functionParameter: DeserializerFunction<A, B>): Builder;
    registerPrimitiveTypeAdapter<T>(clazz: Class<T>, adapter: Function<any, T>): Builder;
    registerSerializer<T>(clazz: Class<T>, serializer: BiFunction<T, Marshaller, JsonElement>): Builder;
    registerTypeAdapter<T>(clazz: Class<T>, adapter: Function<JsonObject, T>): Builder;
    registerTypeFactory<T>(clazz: Class<T>, factory: Supplier<T>): Builder;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.shadowed.blue.endless.jankson.JsonGrammar' {
  import { JsonGrammar } from 'com.misterpemodder.shulkerboxtooltip.shadowed.blue.endless.jankson';

  class Builder {
    bareRootObject(bare: boolean): Builder;
    bareSpecialNumerics(bare: boolean): Builder;
    build(): JsonGrammar;
    printCommas(commas: boolean): Builder;
    printTrailingCommas(trailing: boolean): Builder;
    printUnquotedKeys(unquoted: boolean): Builder;
    printWhitespace(whitespace: boolean): Builder;
    withComments(comments: boolean): Builder;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip.shadowed.blue.endless.jankson.magic' {
  import { Class } from 'java.lang';
  import { Type } from 'java.lang.reflect';

  class TypeMagic {
    static classForType(t: Type): Class<any>;
    static createAndCast<U>(t: Type): U;
    static createAndCast<U>(t: Class<U>, failFast: boolean): U;
    static createAndCastCarefully<U>(t: Type): U;
    static shoehorn<T>(o: any): T;
  }

}

declare module 'com.misterpemodder.shulkerboxtooltip' {
  import { ShulkerBoxTooltipApi, PreviewContext, PreviewType } from 'com.misterpemodder.shulkerboxtooltip.api';
  import { NamedLogger } from 'com.misterpemodder.shulkerboxtooltip.impl.util';
  import { Configuration, ClientConfiguration } from 'com.misterpemodder.shulkerboxtooltip.impl.config';
  import { RootConfigNode } from 'com.misterpemodder.shulkerboxtooltip.impl.tree';
  import { PreviewProviderRegistry } from 'com.misterpemodder.shulkerboxtooltip.api.provider';
  import { ColorRegistry } from 'com.misterpemodder.shulkerboxtooltip.api.color';
  import { Path } from 'java.nio.file';
  import { Minecraft } from 'net.minecraft.client';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Consumer } from 'java.util.function';
  import { Collection } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  interface ShulkerBoxTooltip extends ShulkerBoxTooltipApi {}
  class ShulkerBoxTooltip extends ShulkerBoxTooltipApi {
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static readonly LOGGER: NamedLogger;
    static config: Configuration;
    static savedConfig: Configuration;
    static configTree: RootConfigNode;
    static get configDir(): Path;
    static init(): void;
    registerColors(registry: ColorRegistry): void;
    registerProviders(registry: PreviewProviderRegistry): void;
  }


  class ShulkerBoxTooltipClient {
    static client: Minecraft;
    static get config(): ClientConfiguration;
    static getCurrentPreviewType(hasFullPreviewMode: boolean): PreviewType;
    static init(): void;
    static isFullPreviewKeyPressed(): boolean;
    static isLockPreviewKeyPressed(): boolean;
    static isPreviewAvailable(context: PreviewContext): boolean;
    static isPreviewKeyPressed(): boolean;
    static modifyStackTooltip(stack: ItemStack, tooltip: Consumer<Collection<Component>>): void;
    static setLockKeyHintsEnabled(value: boolean): void;
    static updatePreviewKeys(): void;
  }

}