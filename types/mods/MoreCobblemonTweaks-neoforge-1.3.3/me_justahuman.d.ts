declare module 'me.justahuman.more_cobblemon_tweaks.api' {
  import { BoxListSlot } from 'me.justahuman.more_cobblemon_tweaks.features.pc.boxes';
  import { Supplier } from 'java.util.function';
  import { Boolean } from 'java.lang';
  import { PCPosition } from 'com.cobblemon.mod.common.api.storage.pc';
  import { List } from 'java.util';
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';
  import { SlotPosition } from 'me.justahuman.more_cobblemon_tweaks.features.pc.multiselect';

  class BoxViewHolder {
    moreCobblemonTweaks$getPreviewedBoxListSlot(var1: number, var3: number): BoxListSlot;
    moreCobblemonTweaks$getSelectedBoxListSlot(): BoxListSlot;
    moreCobblemonTweaks$isBoxListOpen(): boolean;
  }


  class ConditionalIconButton {
    moreCobblemonTweaks$setCondition(var1: Supplier<boolean>): void;
  }


  class FilterSuggestable {
    moreCobblemonTweaks$fillSuggestion(): void;
  }


  class MultiSelector {
    moreCobblemonTweaks$clearMultiSelection(): void;
    moreCobblemonTweaks$getHoveredSlot(var1: number, var2: number): SlotPosition;
    moreCobblemonTweaks$getSelectedPokemon(): Pokemon[];
    moreCobblemonTweaks$getSelectionOrigin(): SlotPosition;
    moreCobblemonTweaks$isMultiSelecting(): boolean;
    moreCobblemonTweaks$isSelected(var1: PCPosition): boolean;
  }


  class MultiSelectorState {
    moreCobblemonTweaks$isMultiSelecting(): boolean;
  }

}

declare module 'me.justahuman.more_cobblemon_tweaks' {
  import { RegisterClientReloadListenersEvent, RegisterKeyMappingsEvent } from 'net.neoforged.neoforge.client.event';
  import { SupportStatus } from 'me.justahuman.more_cobblemon_tweaks.Hooks';
  import { Logger } from 'org.slf4j';
  import { File } from 'java.io';
  import { Function } from 'java.util.function';
  import { Boolean } from 'java.lang';
  import { ResourceManager } from 'net.minecraft.server.packs.resources';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Key } from 'InputEvent';
  import { LoggingOut } from 'ClientPlayerNetworkEvent';

  class ClientModEvents {
    static registerKeyMappings(event: RegisterKeyMappingsEvent): void;
    static registerReloadListener(event: RegisterClientReloadListenersEvent): void;
  }


  class Hooks {
    static readonly COBBREEDING: string;
    static readonly ALL_THE_MONS: string;
    static readonly CLOTH_CONFIG_FABRIC: string;
    static readonly CLOTH_CONFIG_NEOFORGE: string;
    static cobbreedingCompat: SupportStatus;
    static allTheMonsCompat(): SupportStatus;
    static allTheMonsPresent(): boolean;
    static clothConfig(): boolean;
    static cobbreedingCompat(): SupportStatus;
    static cobbreedingPresent(): boolean;
    static reset(): void;
  }


  class MoreCobblemonTweaks {
    static readonly MOD_ID: string;
    static readonly LOGGER: Logger;
    static get configFile(): File;
    static id(path: string): ResourceLocation;
    static initClient(configFile: File, modEnabledFunction: Function<string, boolean>, modVersionFunction: Function<string, string>): void;
    static onReload(manager: ResourceManager): void;
  }


  class MoreCobblemonTweaksNeoForge {
    constructor();
    onDisconnect(event: LoggingOut): void;
    onInput(event: Key): void;
  }

}

declare module 'me.justahuman.more_cobblemon_tweaks.config' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { BufferedReader, File } from 'java.io';

  class ConfigScreen {
    static buildScreen(parent: Screen): Screen;
  }


  class ModConfig {
    static clearServerConfig(): void;
    static get configFile(): File;
    static getDefault(key: string): boolean;
    static isEnabled(option: string): boolean;
    static loadFromFile(): void;
    static loadServerConfig(reader: BufferedReader): void;
    static saveConfig(): void;
    static serverOverride(option: string): boolean;
    static setEnabled(key: string, value: boolean): void;
  }

}

declare module 'me.justahuman.more_cobblemon_tweaks.features.egg' {
  import { Component } from 'net.minecraft.network.chat';
  import { List } from 'java.util';
  import { ChatFormatting } from 'net.minecraft';
  import { Integer } from 'java.lang';
  import { ItemStack } from 'net.minecraft.world.item';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Function } from 'java.util.function';

  interface AllTheMonsEggLore extends EnhancedEggLore {}
  class AllTheMonsEggLore extends EnhancedEggLore {
    finalize(lore: Component[], newLore: Component[]): void;
    static get(eggStack: ItemStack): AllTheMonsEggLore;
    get ability(): string;
    get form(): string;
    get gender(): string;
    get nature(): string;
    get pokeBall(): string;
    get shinyColor(): ChatFormatting;
    getAtkIV(): number;
    getDefIV(): number;
    getHatchProgress(lore: Component[]): Component[];
    getHpIV(): number;
    getName(lore: Component[]): Component;
    getSpAtkIV(): number;
    getSpDefIV(): number;
    getSpeedIV(): number;
    hasIVs(): boolean;
    hasIVs(iv: number): boolean;
  }


  class AllTheMonsEggLoreFactory {
    static get(eggStack: ItemStack): AllTheMonsEggLore;
  }


  interface BetterBreedingEggLore extends EnhancedEggLore {}
  class BetterBreedingEggLore extends EnhancedEggLore {
    constructor(customData: CompoundTag);
    static get(itemStack: ItemStack): EnhancedEggLore;
    get ability(): string;
    get form(): string;
    get gender(): string;
    get nature(): string;
    get pokeBall(): string;
    get shinyColor(): ChatFormatting;
    getAtkIV(): number;
    getDefIV(): number;
    getHatchProgress(lore: Component[]): Component[];
    getHpIV(): number;
    getName(lore: Component[]): Component;
    getSpAtkIV(): number;
    getSpDefIV(): number;
    getSpeedIV(): number;
    hasIVs(): boolean;
    hasIVs(iv: number): boolean;
  }


  interface CobbreedingEggLore extends EnhancedEggLore {}
  class CobbreedingEggLore extends EnhancedEggLore {
    finalize(lore: Component[], newLore: Component[]): void;
    static get(itemStack: ItemStack): EnhancedEggLore;
    get ability(): string;
    get form(): string;
    get gender(): string;
    get nature(): string;
    get pokeBall(): string;
    get shinyColor(): ChatFormatting;
    getAtkIV(): number;
    getDefIV(): number;
    getHatchProgress(lore: Component[]): Component[];
    getHpIV(): number;
    getName(lore: Component[]): Component;
    getSpAtkIV(): number;
    getSpDefIV(): number;
    getSpeedIV(): number;
    hasIVs(): boolean;
    hasIVs(iv: number): boolean;
  }


  interface EncryptedEggLore extends EnhancedEggLore {}
  class EncryptedEggLore extends EnhancedEggLore {
    constructor();

    constructor(additionalLore: Component[]);
    get ability(): string;
    get form(): string;
    get gender(): string;
    get nature(): string;
    get pokeBall(): string;
    get shinyColor(): ChatFormatting;
    getAtkIV(): number;
    getDefIV(): number;
    getHatchProgress(lore: Component[]): Component[];
    getHpIV(): number;
    getSpAtkIV(): number;
    getSpDefIV(): number;
    getSpeedIV(): number;
    hasIVs(): boolean;
    hasIVs(iv: number): boolean;
  }


  class EnhancedEggLore {
    atkIV(): number;
    defIV(): number;
    finalize(lore: Component[], newLore: Component[]): void;
    static get(eggStack: ItemStack): EnhancedEggLore;
    get ability(): string;
    get form(): string;
    get gender(): string;
    get nature(): string;
    get pokeBall(): string;
    get shinyColor(): ChatFormatting;
    getAtkIV(): number;
    getDefIV(): number;
    getHatchProgress(var1: Component[]): Component[];
    getHpIV(): number;
    getName(lore: Component[]): Component;
    getSpAtkIV(): number;
    getSpDefIV(): number;
    getSpeedIV(): number;
    hasIVs(): boolean;
    hasIVs(iv: number): boolean;
    hpIV(): number;
    static registerFactory(supplier: Function<ItemStack, EnhancedEggLore>): void;
    spAtkIV(): number;
    spDefIV(): number;
    speedIV(): number;
  }

}

declare module 'me.justahuman.more_cobblemon_tweaks.features' {
  import { KeyMapping } from 'net.minecraft.client';
  import { EnhancedEggLore } from 'me.justahuman.more_cobblemon_tweaks.features.egg';
  import { List } from 'java.util';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { ChatFormatting } from 'net.minecraft';
  import { Tooltip } from 'net.minecraft.client.gui.components';

  class Keybinds {
    static readonly OPEN_CONFIG: KeyMapping;
  }


  class LoreEnhancements {
    static enhanceEggLore(enhancedEggLore: EnhancedEggLore, lore: Component[], newLore: Component[]): void;
    static iv(stat: string, color: ChatFormatting, iv: number): MutableComponent;
    static translate(key: string, ...args: any[]): MutableComponent;
  }


  class PcEnhancements {
    static tooltip(key: string, ...args: any[]): Tooltip;
    static translate(key: string, ...args: any[]): MutableComponent;
  }

}

declare module 'me.justahuman.more_cobblemon_tweaks.features.pc.boxes' {
  import { CustomButton } from 'me.justahuman.more_cobblemon_tweaks.utils';
  import { StorageWidget } from 'com.cobblemon.mod.common.client.gui.pc';
  import { Button } from 'net.minecraft.client.gui.components';
  import { CobblemonRenderable } from 'com.cobblemon.mod.common.client.gui';
  import { BetterOnPress } from 'me.justahuman.more_cobblemon_tweaks.features.pc.boxes.BoxListSlot';
  import { ClientBox } from 'com.cobblemon.mod.common.client.storage';
  import { Integer } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface BoxListButton extends CustomButton {}
  class BoxListButton extends CustomButton {
    constructor(parent: StorageWidget, x: number, y: number);
    isMouseOver(mouseX: number, mouseY: number): boolean;
    isToggled(): boolean;
    onClick(mouseX: number, mouseY: number): void;
  }


  interface BoxListSlot extends CobblemonRenderable, Button {}
  class BoxListSlot extends CobblemonRenderable {
    readonly boxIndex: number;
    constructor(parent: StorageWidget, boxIndex: number, x: number, y: number, onPress: BetterOnPress);
    clickable(): boolean;
    get box(): ClientBox;
    isHovered(mouseX: number, mouseY: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    shouldRender(): boolean;
  }


  class PrimaryColorCache {
    static getPokemonColor(species: ResourceLocation): number;
    static getWallpaperColor(wallpaper: ResourceLocation): number;
  }

}

declare module 'me.justahuman.more_cobblemon_tweaks.features.pc.boxes.BoxListSlot' {
  import { BoxListSlot } from 'me.justahuman.more_cobblemon_tweaks.features.pc.boxes';

  class BetterOnPress {
    onPress(var1: BoxListSlot, var2: number): void;
  }

}

declare module 'me.justahuman.more_cobblemon_tweaks.features.pc' {
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { PCGUI } from 'com.cobblemon.mod.common.client.gui.pc';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { IVs } from 'com.cobblemon.mod.common.pokemon';
  import { Stats } from 'com.cobblemon.mod.common.api.pokemon.stats';
  import { ChatFormatting } from 'net.minecraft';

  interface IvWidget extends Renderable {}
  class IvWidget extends Renderable {
    constructor(gui: PCGUI);
    drawStat(context: GuiGraphics, ivs: IVs, stat: Stats, color: ChatFormatting, x: number, y: number, mouseX: number, mouseY: number): number;
    drawStat(context: GuiGraphics, stat: string, statValue: number, color: ChatFormatting, x: number, y: number, mouseX: number, mouseY: number): number;
    render(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }

}

declare module 'me.justahuman.more_cobblemon_tweaks.features.pc.multiselect' {
  import { StorageSlot, StorageWidget } from 'com.cobblemon.mod.common.client.gui.pc';
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';
  import { CustomButton } from 'me.justahuman.more_cobblemon_tweaks.utils';
  import { Set } from 'java.util';
  import { Renderable } from 'net.minecraft.client.gui.components';

  interface MultiGrabbedStorageSlot extends StorageSlot {}
  class MultiGrabbedStorageSlot extends StorageSlot {
    readonly slot: SlotPosition;
    localSlot: SlotPosition;
    constructor(x: number, y: number, parent: StorageWidget, pokemon: Pokemon, slot: SlotPosition, localSlot: SlotPosition);
    get pokemon(): Pokemon;
    getPlacingOffset(mouseX: number, mouseY: number): SlotPosition;
    getPlacingOffset(root: SlotPosition): SlotPosition;
    isHoveredOrFocused(): boolean;
    isStationary(): boolean;
    shouldRender(): boolean;
  }


  interface MultiSelectButton extends CustomButton {}
  class MultiSelectButton extends CustomButton {
    constructor(x: number, y: number, siblings: Set<Renderable>);
    isToggled(): boolean;
    onClick(mouseX: number, mouseY: number): void;
  }

}

declare module 'me.justahuman.more_cobblemon_tweaks.features.pc.search.predicates' {
  import { SearchPredicate } from 'me.justahuman.more_cobblemon_tweaks.features.pc.search';
  import { EggGroup } from 'com.cobblemon.mod.common.api.pokemon.egg';
  import { SuggestionsBuilder } from 'com.mojang.brigadier.suggestion';
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';
  import { List } from 'java.util';
  import { Predicate } from 'java.util.function';

  interface EggGroupPredicate extends SearchPredicate {}
  class EggGroupPredicate extends SearchPredicate {
    static readonly KEY: string;
    constructor();

    constructor(eggGroup: EggGroup);
    suggest(builder: SuggestionsBuilder): void;
    test(pokemon: Pokemon): boolean;
  }


  interface NameOrSpeciesPredicate extends SearchPredicate {}
  class NameOrSpeciesPredicate extends SearchPredicate {
    constructor(filter: string);
    test(pokemon: Pokemon): boolean;
  }


  interface SimplePredicate extends SearchPredicate {}
  class SimplePredicate extends SearchPredicate {
    constructor(names: string[], predicate: Predicate<Pokemon>);
    suggest(builder: SuggestionsBuilder): void;
    test(pokemon: Pokemon): boolean;
  }

}

declare module 'me.justahuman.more_cobblemon_tweaks.features.pc.search' {
  import { PokemonFilter } from 'com.cobblemon.mod.common.api.storage.pc.search';
  import { Set, Map, List } from 'java.util';
  import { SuggestionsBuilder } from 'com.mojang.brigadier.suggestion';

  interface SearchPredicate extends PokemonFilter {}
  class SearchPredicate extends PokemonFilter {
    static readonly ALL: Set;
    static readonly FIXED: Map;
    static readonly HOLDING: SearchPredicate;
    static readonly FAINTED: SearchPredicate;
    static readonly LEGENDARY: SearchPredicate;
    static readonly MYTHICAL: SearchPredicate;
    static readonly ULTRA_BEAST: SearchPredicate;
    static readonly EGG_GROUP: SearchPredicate;
    inverted(): SearchPredicate;
    static register(predicate: SearchPredicate): void;
    static register(predicate: SearchPredicate, autocomplete: string[]): void;
    suggest(builder: SuggestionsBuilder): void;
  }

}

declare module 'me.justahuman.more_cobblemon_tweaks.Hooks' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface SupportStatus extends Enum<SupportStatus> {}
  class SupportStatus extends Enum<SupportStatus> {
    static readonly SUPPORTED: SupportStatus;
    static readonly UNSUPPORTED: SupportStatus;
    static readonly UNTESTED: SupportStatus;
    enabled(): boolean;
    static valueOf(name: string): SupportStatus;
    static values(): SupportStatus[];
  }

}

declare module 'me.justahuman.more_cobblemon_tweaks.mixins.accessor' {
  import { OnPress } from 'Button';
  import { Consumer } from 'java.util.function';
  import { WallpapersScrollingWidget } from 'com.cobblemon.mod.common.client.gui.pc';

  class ButtonAccessor {
    get onPress(): OnPress;
    set onPress(var1: OnPress);
  }


  class EditBoxAccessor {
    get rawResponder(): Consumer<string>;
    setDirectValue(var1: string): void;
  }


  class PcGuiAccessor {
    get currentStatIndex(): number;
    get wallpaperWidget(): WallpapersScrollingWidget;
    set currentStatIndex(var1: number);
  }

}

declare module 'me.justahuman.more_cobblemon_tweaks.mixins' {
  import { Item, ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { TooltipContext } from 'Item';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  class ItemStackMixin {
    changeTooltip(instance: Item, itemStack: ItemStack, tooltipContext: TooltipContext, list: Component[], tooltipFlag: TooltipFlag): void;
  }

}

declare module 'me.justahuman.more_cobblemon_tweaks.mixins.pc' {
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { CallbackInfo, CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { EditBox, Button } from 'net.minecraft.client.gui.components';
  import { FilterSuggestable, ConditionalIconButton, MultiSelectorState, MultiSelector, BoxViewHolder } from 'me.justahuman.more_cobblemon_tweaks.api';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Supplier } from 'java.util.function';
  import { Boolean, Number, Void } from 'java.lang';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Operation } from 'com.llamalad7.mixinextras.injector.wrapoperation';
  import { PCGUI, BoxStorageSlot, StorageWidget } from 'com.cobblemon.mod.common.client.gui.pc';
  import { Search } from 'com.cobblemon.mod.common.api.storage.pc.search';
  import { Pokemon } from 'com.cobblemon.mod.common.pokemon';
  import { FloatingState } from 'com.cobblemon.mod.common.client.render.models.blockbench';
  import { SoundlessWidget } from 'com.cobblemon.mod.common.client.gui.summary.widgets';
  import { PCPosition } from 'com.cobblemon.mod.common.api.storage.pc';
  import { SlotPosition } from 'me.justahuman.more_cobblemon_tweaks.features.pc.multiselect';
  import { List } from 'java.util';
  import { ClientPC } from 'com.cobblemon.mod.common.client.storage';
  import { OnPress } from 'Button';
  import { BoxListSlot } from 'me.justahuman.more_cobblemon_tweaks.features.pc.boxes';

  class BoxNameWidgetMixin {
    preventFocusIfBoxList(focused: boolean, ci: CallbackInfo): void;
    replaceLabelIfBoxList(value: MutableComponent): MutableComponent;
  }


  interface FilterWidgetMixin extends FilterSuggestable, EditBox {}
  class FilterWidgetMixin extends FilterSuggestable {
    moreCobblemonTweaks$fillSuggestion(): void;
  }


  interface IconButtonMixin extends ConditionalIconButton, Button {}
  class IconButtonMixin extends ConditionalIconButton {
    hideIfNeeded(context: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number, ci: CallbackInfo): void;
    moreCobblemonTweaks$setCondition(condition: Supplier<boolean>): void;
    onPress(): void;
  }


  interface PcGuiMixin extends MultiSelectorState, Screen {}
  class PcGuiMixin extends MultiSelectorState {
    static BASE_WIDTH: number;
    static BASE_HEIGHT: number;
    captureMousePos(context: GuiGraphics, mouseX: number, mouseY: number, delta: number, ci: CallbackInfo): void;
    cast(): PCGUI;
    moreCobblemonTweaks$isMultiSelecting(): boolean;
    onClose(): void;
    onInit(ci: CallbackInfo): void;
    preventClickingWhenMultiMoving(mouseX: number, mouseY: number, button: number, cir: CallbackInfoReturnable<boolean>): void;
    preventDraggingWhenMultiMoving(mouseX: number, mouseY: number, button: number, deltaX: number, deltaY: number, cir: CallbackInfoReturnable<boolean>): void;
    preventScrollingWhenMultiMoving(mouseX: number, mouseY: number, amount: number, verticalAmount: number, cir: CallbackInfoReturnable<boolean>): void;
    renderMultiMoveInProgress(context: GuiGraphics, mouseX: number, mouseY: number, delta: number, ci: CallbackInfo): void;
    renderPreviewedBoxWallpaper(poseStack: PoseStack, resource: ResourceLocation, x: Number, y: Number, height: Number, width: Number, uOffset: Number, vOffset: Number, textureWidth: Number, textureHeight: Number, blitOffset: Number, red: Number, green: Number, blue: Number, alpha: Number, blend: boolean, scale: number, i: number, o: any, original: Operation<Void>): void;
    suggestionAndSummaryAndMultiMovingPrevention(keyCode: number, scanCode: number, modifiers: number, cir: CallbackInfoReturnable<boolean>): void;
  }


  class ReleaseButtonMixin {
    onlyHoveredWhenRendering(mouseX: number, mouseY: number, cir: CallbackInfoReturnable<boolean>): void;
  }


  class SearchMixin {
    of(search: string): Search;
  }


  class StorageSlotMixin {
    get pokemon(): Pokemon;
    get state(): FloatingState;
    isHovered(mouseX: number, mouseY: number, cir: CallbackInfoReturnable<boolean>): void;
    renderSlotHead(context: GuiGraphics, posX: number, posY: number, partialTicks: number, ci: CallbackInfo): void;
  }


  interface StorageWidgetMixin extends MultiSelector, BoxViewHolder, SoundlessWidget {}
  class StorageWidgetMixin extends MultiSelector {
    boxListButtonClicked(pMouseX: number, pMouseY: number, pButton: number, cir: CallbackInfoReturnable<boolean>): void;
    canDelete(cir: CallbackInfoReturnable<boolean>): void;
    canDeleteSelected(): boolean;
    moreCobblemonTweaks$clearMultiSelection(): void;
    moreCobblemonTweaks$getHoveredSlot(mouseX: number, mouseY: number): SlotPosition;
    moreCobblemonTweaks$getPreviewedBoxListSlot(mouseX: number, mouseY: number): BoxListSlot;
    moreCobblemonTweaks$getSelectedBoxListSlot(): BoxListSlot;
    moreCobblemonTweaks$getSelectedPokemon(): Pokemon[];
    moreCobblemonTweaks$getSelectionOrigin(): SlotPosition;
    moreCobblemonTweaks$isBoxListOpen(): boolean;
    moreCobblemonTweaks$isMultiSelecting(): boolean;
    moreCobblemonTweaks$isSelected(position: PCPosition): boolean;
    mouseClicked(pMouseX: number, pMouseY: number, pButton: number, cir: CallbackInfoReturnable<boolean>): void;
    onStorageSlotClicked(button: Button, ci: CallbackInfo): void;
    renderBoxList(context: GuiGraphics, mouseX: number, mouseY: number, delta: number, ci: CallbackInfo): void;
    renderBoxListButton(context: GuiGraphics, mouseX: number, mouseY: number, delta: number, ci: CallbackInfo): void;
    renderGrabbedMultiSelection(context: GuiGraphics, mouseX: number, mouseY: number, delta: number, ci: CallbackInfo): void;
    resetBoxListSlots(ci: CallbackInfo): void;
    resetSelected(): void;
    setBoxRestriction(value: number, ci: CallbackInfo): void;
    setDisplayConfirmRelease(var1: boolean): void;
    setupBoxListSlotForEachBoxSlot(x: number, y: number, parent: StorageWidget, pc: ClientPC, position: PCPosition, onPress: OnPress, original: Operation<BoxStorageSlot>): BoxStorageSlot;
    setupStorageSlots(): void;
  }


  interface SummaryMixin extends Screen {}
  class SummaryMixin extends Screen {
    onClose(ci: CallbackInfo): void;
  }


  class WallpaperEntryMixin {
    setAllVisibleBoxWallpapers(mouseX: number, mouseY: number, button: number, cir: CallbackInfoReturnable<boolean>, appliedWallpaper: ResourceLocation): void;
  }

}

declare module 'me.justahuman.more_cobblemon_tweaks.mixins.pc.moveall' {
  import { MoveClientPCPokemonPacket } from 'com.cobblemon.mod.common.net.messages.client.storage.pc';
  import { Minecraft } from 'net.minecraft.client';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { SwapClientPokemonPacket } from 'com.cobblemon.mod.common.net.messages.client.storage';

  class MoveClientPCPokemonHandlerMixin {
    postHandle(packet: MoveClientPCPokemonPacket, client: Minecraft, ci: CallbackInfo): void;
  }


  class SwapClientPokemonHandlerMixin {
    postHandle(packet: SwapClientPokemonPacket, client: Minecraft, ci: CallbackInfo): void;
  }

}

declare module 'me.justahuman.more_cobblemon_tweaks.utils' {
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { SoundManager } from 'net.minecraft.client.sounds';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Runnable, Boolean } from 'java.lang';
  import { ClientPC, ClientBox } from 'com.cobblemon.mod.common.client.storage';
  import { PCGUIConfiguration } from 'com.cobblemon.mod.common.client.gui.pc';
  import { Set } from 'java.util';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Function } from 'java.util.function';

  interface CustomButton extends AbstractWidget {}
  class CustomButton extends AbstractWidget {
    onClick(var1: number, var3: number): void;
    playDownSound(soundManager: SoundManager): void;
    setVisible(visible: boolean): void;
  }


  class Textures {
    static readonly IV_WIDGET_TEXTURE: ResourceLocation;
    static readonly MULTI_SELECT_BUTTON_TEXTURE: ResourceLocation;
    static readonly SELECTED_SLOT_OVERLAY: ResourceLocation;
    static readonly BOX_LIST_BUTTON_TEXTURE: ResourceLocation;
    static readonly BOX_LIST_SLOT_TEXTURE: ResourceLocation;
    static readonly PREVIEW_BOX_GRID: ResourceLocation;
    static readonly IV_WIDGET_WIDTH: number;
    static readonly IV_WIDGET_HEIGHT: number;
    static readonly MULTI_SELECT_BUTTON_WIDTH: number;
    static readonly MULTI_SELECT_BUTTON_HEIGHT: number;
    static readonly BOX_LIST_BUTTON_WIDTH: number;
    static readonly BOX_LIST_BUTTON_HEIGHT: number;
  }


  class Utils {
    static moveAllPokemonFuture: CompletableFuture;
    static moveAllCompleted: boolean;
    static moveAllCount: number;
    static moveAllCountUpdater: Runnable;
    static moveAllTotal: number;
    static moveAllTimeouts: number;
    static summaryPC: ClientPC;
    static summaryConfig: PCGUIConfiguration;
    static unseenWallpapers: Set;
    static summaryFromPC: boolean;
    static forgetMod(id: string): void;
    static get(nbt: CompoundTag, key: string, def: string): string;
    static get(nbt: CompoundTag, key: string, def: boolean): boolean;
    static get(nbt: CompoundTag, key: string, def: number): number;
    static get(nbt: CompoundTag, key: string, def: number): number;
    static get(nbt: CompoundTag, key: string, def: number): number;
    static getUsedWallpaper(box: ClientBox): ResourceLocation;
    static isSinglePlayer(): boolean;
    static ivPercent(iv: number): string;
    static modEnabled(id: string): boolean;
    static modVersion(id: string): string;
    static playSound(sound: SoundEvent): void;
    static setModEnabledFunction(functionParameter: Function<string, boolean>): void;
    static setModVersionFunction(functionParameter: Function<string, string>): void;
  }

}