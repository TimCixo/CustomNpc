declare module 'net.silentchaos512.lib.block' {
  import { ItemLike } from 'net.minecraft.world.level';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Item } from 'net.minecraft.world.item';

  interface IBlockProvider extends ItemLike {}
  class IBlockProvider extends ItemLike {
    asBlock(): Block;
    asBlockState(): BlockState;
    asItem(): Item;
  }

}

declare module 'net.silentchaos512.lib.client.gui' {
  import { List } from 'java.util';
  import { Anchor } from 'net.silentchaos512.lib.util';
  import { Post } from 'RenderGuiLayerEvent';
  import { Pre } from 'ClientTickEvent';
  import { Enum } from 'java.lang';

  class DebugRenderOverlay {
    clientTick(event: Pre): void;
    get anchorPoint(): Anchor;
    get debugText(): string[];
    get marginSize(): number;
    get splitWidth(): number;
    get startX(): number;
    get startY(): number;
    get textScale(): number;
    get updateFrequency(): number;
    isHidden(): boolean;
    renderTick(event: Post): void;
  }


  interface HudAnchor extends Enum<HudAnchor> {}
  class HudAnchor extends Enum<HudAnchor> {
    static readonly TOP_LEFT: HudAnchor;
    static readonly TOP_CENTER: HudAnchor;
    static readonly TOP_RIGHT: HudAnchor;
    static readonly CENTER_LEFT: HudAnchor;
    static readonly CENTER: HudAnchor;
    static readonly CENTER_RIGHT: HudAnchor;
    static readonly BOTTOM_LEFT: HudAnchor;
    static readonly BOTTOM_CENTER: HudAnchor;
    static readonly BOTTOM_RIGHT: HudAnchor;
    getX(var1: number, var2: number): number;
    getX(scaledWidth: number): number;
    getY(var1: number, var2: number): number;
    getY(scaledHeight: number): number;
    offsetX(scaledWidth: number, amount: number): number;
    offsetY(scaledHeight: number, amount: number): number;
    static valueOf(name: string): HudAnchor;
    static values(): HudAnchor[];
  }

}

declare module 'net.silentchaos512.lib.client.gui.nbt' {
  import { ObjectSelectionList } from 'net.minecraft.client.gui.components';
  import { Entry } from 'net.silentchaos512.lib.client.gui.nbt.DisplayNBTList';
  import { Minecraft } from 'net.minecraft.client';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface DisplayNBTList extends ObjectSelectionList<Entry> {}
  class DisplayNBTList extends ObjectSelectionList<Entry> {
    constructor(screen: DisplayNBTScreen, mcIn: Minecraft, widthIn: number, heightIn: number, topIn: number, slotHeightIn: number);
    get rowWidth(): number;
  }


  interface DisplayNBTScreen extends Screen {}
  class DisplayNBTScreen extends Screen {
    constructor(nbt: CompoundTag, titleIn: Component);
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }

}

declare module 'net.silentchaos512.lib.client.gui.nbt.DisplayNBTList' {
  import { Entry as objectselectionlist_Entry } from 'ObjectSelectionList';
  import { DisplayNBTList } from 'net.silentchaos512.lib.client.gui.nbt';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';

  interface Entry extends objectselectionlist_Entry<Entry> {}
  class Entry extends objectselectionlist_Entry<Entry> {
    constructor(this$0: DisplayNBTList, text: string);
    get narration(): Component;
    render(graphics: GuiGraphics, p_230432_2_: number, p_230432_3_: number, p_230432_4_: number, p_230432_5_: number, p_230432_6_: number, p_230432_7_: number, p_230432_8_: number, p_230432_9_: boolean, p_230432_10_: number): void;
  }

}

declare module 'net.silentchaos512.lib.client.key' {
  class InputUtils {
    static isAltDown(): boolean;
    static isControlDown(): boolean;
    static isShiftDown(): boolean;
  }

}

declare module 'net.silentchaos512.lib.collection' {
  import { ArrayList, Collection } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Container } from 'net.minecraft.world';
  import { CraftingInput } from 'net.minecraft.world.item.crafting';
  import { Class } from 'java.lang';
  import { Predicate } from 'java.util.function';

  interface StackList extends ArrayList<ItemStack> {}
  class StackList extends ArrayList<ItemStack> {
    add(itemStack: ItemStack): boolean;
    add(index: number, element: ItemStack): void;
    addAll(c: Collection<ItemStack>): boolean;
    addAll(index: number, c: Collection<ItemStack>): boolean;
    allMatches(predicate: Predicate<ItemStack>): Collection<ItemStack>;
    allOfType(itemClass: Class<any>): Collection<ItemStack>;
    countOfMatches(predicate: Predicate<ItemStack>): number;
    countOfType(itemClass: Class<any>): number;
    firstMatch(predicate: Predicate<ItemStack>): ItemStack;
    firstOfType(itemClass: Class<any>): ItemStack;
    static from(inventory: Container): StackList;
    static from(input: CraftingInput): StackList;
    static of(...stacks: ItemStack[]): StackList;
    uniqueMatch(predicate: Predicate<ItemStack>): ItemStack;
    uniqueOfType(itemClass: Class<any>): ItemStack;
  }

}

declare module 'net.silentchaos512.lib.command.internal' {
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack } from 'net.minecraft.commands';

  class TeleportCommand {
    static register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }

}

declare module 'net.silentchaos512.lib.crafting.recipe' {
  import { ShapedRecipe, CraftingBookCategory, ShapedRecipePattern, RecipeSerializer, Ingredient, CraftingInput, ShapelessRecipe } from 'net.minecraft.world.item.crafting';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Provider } from 'HolderLookup';
  import { NonNullList } from 'net.minecraft.core';
  import { Level } from 'net.minecraft.world.level';

  interface ExtendedShapedRecipe extends ShapedRecipe {}
  class ExtendedShapedRecipe extends ShapedRecipe {
    constructor(pGroup: string, pCategory: CraftingBookCategory, pPattern: ShapedRecipePattern, pResult: ItemStack, pShowNotification: boolean);

    constructor(pGroup: string, pCategory: CraftingBookCategory, pPattern: ShapedRecipePattern, pResult: ItemStack);
    assemble(pContainer: CraftingInput, pRegistries: Provider): ItemStack;
    canCraftInDimensions(pWidth: number, pHeight: number): boolean;
    category(): CraftingBookCategory;
    get group(): string;
    get height(): number;
    get ingredients(): NonNullList<Ingredient>;
    get serializer(): RecipeSerializer<any>;
    get width(): number;
    getResultItem(pRegistries: Provider): ItemStack;
    isIncomplete(): boolean;
    matches(pInv: CraftingInput, pLevel: Level): boolean;
    showNotification(): boolean;
  }


  interface ExtendedShapelessRecipe extends ShapelessRecipe {}
  class ExtendedShapelessRecipe extends ShapelessRecipe {
    constructor(pGroup: string, pCategory: CraftingBookCategory, pResult: ItemStack, pIngredients: NonNullList<Ingredient>);
    assemble(pContainer: CraftingInput, pRegistries: Provider): ItemStack;
    canCraftInDimensions(pWidth: number, pHeight: number): boolean;
    category(): CraftingBookCategory;
    get group(): string;
    get ingredients(): NonNullList<Ingredient>;
    get serializer(): RecipeSerializer<any>;
    getResultItem(pRegistries: Provider): ItemStack;
    matches(pInv: CraftingInput, pLevel: Level): boolean;
  }

}

declare module 'net.silentchaos512.lib.crafting.recipe.ExtendedShapedRecipe' {
  import { RecipeSerializer, CraftingBookCategory, ShapedRecipePattern } from 'net.minecraft.world.item.crafting';
  import { Function5 } from 'com.mojang.datafixers.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Boolean } from 'java.lang';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  interface BasicSerializer<R extends ExtendedShapedRecipe = any> extends RecipeSerializer<R> {}
  class BasicSerializer<R extends ExtendedShapedRecipe = any> extends RecipeSerializer<R> {
    constructor(factory: Function5<string, CraftingBookCategory, ShapedRecipePattern, ItemStack, boolean, R>);
    codec(): MapCodec<R>;
    fromNetwork(buf: RegistryFriendlyByteBuf): R;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, R>;
    toNetwork(buf: RegistryFriendlyByteBuf, recipe: R): void;
  }

}

declare module 'net.silentchaos512.lib.crafting.recipe.ExtendedShapelessRecipe' {
  import { RecipeSerializer, CraftingBookCategory, Ingredient } from 'net.minecraft.world.item.crafting';
  import { Function4 } from 'com.mojang.datafixers.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { NonNullList } from 'net.minecraft.core';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  interface BasicSerializer<R extends ExtendedShapelessRecipe = any> extends RecipeSerializer<R> {}
  class BasicSerializer<R extends ExtendedShapelessRecipe = any> extends RecipeSerializer<R> {
    constructor(factory: Function4<string, CraftingBookCategory, ItemStack, NonNullList<Ingredient>, R>);
    codec(): MapCodec<R>;
    fromNetwork(buf: RegistryFriendlyByteBuf): R;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, R>;
    toNetwork(buf: RegistryFriendlyByteBuf, recipe: R): void;
  }

}

declare module 'net.silentchaos512.lib.data.recipe' {
  import { RecipeBuilder, RecipeCategory, RecipeOutput, RecipeProvider } from 'net.minecraft.data.recipes';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Character } from 'java.lang';
  import { TagKey } from 'net.minecraft.tags';
  import { ItemLike, Level } from 'net.minecraft.world.level';
  import { ICustomIngredient } from 'net.neoforged.neoforge.common.crafting';
  import { Ingredient, ShapedRecipePattern, ShapedRecipe, ShapelessRecipe, SingleItemRecipe, RecipeType, RecipeSerializer, SingleRecipeInput } from 'net.minecraft.world.item.crafting';
  import { Criterion } from 'net.minecraft.advancements';
  import { NonNullList } from 'net.minecraft.core';
  import { PackOutput } from 'net.minecraft.data';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';

  interface ExtendedShapedRecipeBuilder<R extends ShapedRecipe = any> extends RecipeBuilder {}
  class ExtendedShapedRecipeBuilder<R extends ShapedRecipe = any> extends RecipeBuilder {
    constructor(category: RecipeCategory, result: ItemStack);
    category(): RecipeCategory;
    createRecipe(var1: ResourceLocation): R;
    define(symbol: string, tagIn: TagKey<Item>): ExtendedShapedRecipeBuilder<R>;
    define(symbol: string, itemIn: ItemLike): ExtendedShapedRecipeBuilder<R>;
    define(symbol: string, customIngredient: ICustomIngredient): ExtendedShapedRecipeBuilder<R>;
    define(symbol: string, ingredientIn: Ingredient): ExtendedShapedRecipeBuilder<R>;
    getResult(): Item;
    group(groupIn: string): ExtendedShapedRecipeBuilder<R>;
    group(): string;
    pattern(patternIn: string): ExtendedShapedRecipeBuilder<R>;
    pattern(): ShapedRecipePattern;
    result(): ItemStack;
    save(output: RecipeOutput): void;
    save(output: RecipeOutput, id: ResourceLocation): void;
    showNotification(showNotification: boolean): ExtendedShapedRecipeBuilder<R>;
    showNotification(): boolean;
    unlockedBy(name: string, criterion: Criterion<any>): ExtendedShapedRecipeBuilder<R>;
    static vanillaFactory(id: ResourceLocation, builder: ExtendedShapedRecipeBuilder<ShapedRecipe>): ShapedRecipe;
  }


  interface ExtendedShapelessRecipeBuilder<R extends ShapelessRecipe = any> extends RecipeBuilder {}
  class ExtendedShapelessRecipeBuilder<R extends ShapelessRecipe = any> extends RecipeBuilder {
    constructor(category: RecipeCategory, result: ItemStack);

    constructor(category: RecipeCategory, result: ItemLike, count: number);

    constructor(category: RecipeCategory, result: ItemLike);
    category(): RecipeCategory;
    createRecipe(var1: ResourceLocation): R;
    getResult(): Item;
    group(pGroupName: string): ExtendedShapelessRecipeBuilder<R>;
    group(): string;
    ingredients(): NonNullList<Ingredient>;
    requires(tag: TagKey<Item>): ExtendedShapelessRecipeBuilder<R>;
    requires(tag: TagKey<Item>, count: number): ExtendedShapelessRecipeBuilder<R>;
    requires(item: ItemLike): ExtendedShapelessRecipeBuilder<R>;
    requires(item: ItemLike, count: number): ExtendedShapelessRecipeBuilder<R>;
    requires(customIngredient: ICustomIngredient): ExtendedShapelessRecipeBuilder<R>;
    requires(customIngredient: ICustomIngredient, quantity: number): ExtendedShapelessRecipeBuilder<R>;
    requires(pIngredient: Ingredient): ExtendedShapelessRecipeBuilder<R>;
    requires(pIngredient: Ingredient, pQuantity: number): ExtendedShapelessRecipeBuilder<R>;
    result(): ItemStack;
    save(pRecipeOutput: RecipeOutput, pId: ResourceLocation): void;
    unlockedBy(pName: string, pCriterion: Criterion<any>): ExtendedShapelessRecipeBuilder<R>;
    static vanillaFactory(id: ResourceLocation, builder: ExtendedShapelessRecipeBuilder<ShapelessRecipe>): ShapelessRecipe;
  }


  interface ExtendedSingleItemRecipe extends SingleItemRecipe {}
  class ExtendedSingleItemRecipe extends SingleItemRecipe {
    constructor(pType: RecipeType<any>, pSerializer: RecipeSerializer<any>, pGroup: string, pIngredient: Ingredient, pResult: ItemStack);
    matches(pContainer: SingleRecipeInput, pLevel: Level): boolean;
  }


  interface LibRecipeProvider extends RecipeProvider {}
  class LibRecipeProvider extends RecipeProvider {
    constructor(packOutput: PackOutput, registries: CompletableFuture<Provider>, modId: string);
  }

}

declare module 'net.silentchaos512.lib.data.recipe.ExtendedShapedRecipeBuilder' {
  import { ExtendedShapedRecipeBuilder } from 'net.silentchaos512.lib.data.recipe';
  import { RecipeCategory } from 'net.minecraft.data.recipes';
  import { ItemStack } from 'net.minecraft.world.item';
  import { BiFunction } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ItemLike } from 'net.minecraft.world.level';
  import { Function5 } from 'com.mojang.datafixers.util';
  import { CraftingBookCategory, ShapedRecipePattern } from 'net.minecraft.world.item.crafting';
  import { Boolean } from 'java.lang';

  interface Basic<R extends ShapedRecipe = any> extends ExtendedShapedRecipeBuilder<R> {}
  class Basic<R extends ShapedRecipe = any> extends ExtendedShapedRecipeBuilder<R> {
    constructor(category: RecipeCategory, result: ItemStack, factory: BiFunction<ResourceLocation, Basic<R>, R>);

    constructor(category: RecipeCategory, result: ItemLike, factory: BiFunction<ResourceLocation, Basic<R>, R>);

    constructor(category: RecipeCategory, result: ItemLike, count: number, factory: BiFunction<ResourceLocation, Basic<R>, R>);

    constructor(category: RecipeCategory, result: ItemStack, factory: Function5<string, CraftingBookCategory, ShapedRecipePattern, ItemStack, boolean, R>);

    constructor(category: RecipeCategory, result: ItemLike, factory: Function5<string, CraftingBookCategory, ShapedRecipePattern, ItemStack, boolean, R>);

    constructor(category: RecipeCategory, result: ItemLike, count: number, factory: Function5<string, CraftingBookCategory, ShapedRecipePattern, ItemStack, boolean, R>);
    createRecipe(id: ResourceLocation): R;
  }

}

declare module 'net.silentchaos512.lib.data.recipe.ExtendedShapelessRecipeBuilder' {
  import { ExtendedShapelessRecipeBuilder } from 'net.silentchaos512.lib.data.recipe';
  import { RecipeCategory } from 'net.minecraft.data.recipes';
  import { ItemStack } from 'net.minecraft.world.item';
  import { BiFunction } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ItemLike } from 'net.minecraft.world.level';
  import { Function4 } from 'com.mojang.datafixers.util';
  import { CraftingBookCategory, Ingredient } from 'net.minecraft.world.item.crafting';
  import { NonNullList } from 'net.minecraft.core';

  interface Basic<R extends ShapelessRecipe = any> extends ExtendedShapelessRecipeBuilder<R> {}
  class Basic<R extends ShapelessRecipe = any> extends ExtendedShapelessRecipeBuilder<R> {
    constructor(category: RecipeCategory, result: ItemStack, factory: BiFunction<ResourceLocation, Basic<R>, R>);

    constructor(category: RecipeCategory, result: ItemLike, count: number, factory: BiFunction<ResourceLocation, Basic<R>, R>);

    constructor(category: RecipeCategory, result: ItemLike, factory: BiFunction<ResourceLocation, Basic<R>, R>);

    constructor(category: RecipeCategory, result: ItemStack, factory: Function4<string, CraftingBookCategory, ItemStack, NonNullList<Ingredient>, R>);

    constructor(category: RecipeCategory, result: ItemLike, count: number, factory: Function4<string, CraftingBookCategory, ItemStack, NonNullList<Ingredient>, R>);

    constructor(category: RecipeCategory, result: ItemLike, factory: Function4<string, CraftingBookCategory, ItemStack, NonNullList<Ingredient>, R>);
    createRecipe(id: ResourceLocation): R;
  }

}

declare module 'net.silentchaos512.lib.event' {
  import { Runnable } from 'java.lang';
  import { Function, Supplier } from 'java.util.function';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Collection } from 'java.util';

  class ClientTicks {
    ticksInGame: number;
    partialTicks: number;
    deltaTicks: number;
    totalTicks: number;
    static deltaTicks(): number;
    static partialTicks(): number;
    static scheduleAction(action: Runnable): void;
    static ticksInGame(): number;
    static totalTicks(): number;
  }


  class Greetings {
    static addMessage(message: Function<Player, Component>): void;
  }


  class InitialSpawnItems {
    static add(key: ResourceLocation, stack: Supplier<ItemStack>): void;
    static add(key: ResourceLocation, itemFactory: Function<Player, Collection<ItemStack>>): void;
  }


  class ServerTicks {
    static scheduleAction(action: Runnable): void;
  }

}

declare module 'net.silentchaos512.lib.inventory' {
  import { Slot } from 'net.minecraft.world.inventory';
  import { Container } from 'net.minecraft.world';
  import { ItemStack } from 'net.minecraft.world.item';

  interface SlotOutputOnly extends Slot {}
  class SlotOutputOnly extends Slot {
    constructor(inventoryIn: Container, index: number, xPosition: number, yPosition: number);
    mayPlace(stack: ItemStack): boolean;
  }

}

declare module 'net.silentchaos512.lib.item' {
  import { UseOnContext } from 'net.minecraft.world.item.context';
  import { ItemStack, Item, TooltipFlag } from 'net.minecraft.world.item';
  import { InteractionResultHolder, InteractionHand } from 'net.minecraft.world';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Properties, TooltipContext } from 'Item';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  interface FakeItemUseContext extends UseOnContext {}
  class FakeItemUseContext extends UseOnContext {
    constructor(original: UseOnContext, fakeItem: ItemStack);
  }


  class ILeftClickItem {
    onItemLeftClickBlockSL(world: Level, player: Player): InteractionResultHolder<ItemStack>;
    onItemLeftClickSL(world: Level, player: Player): InteractionResultHolder<ItemStack>;
  }


  interface LootContainerItem extends Item {}
  class LootContainerItem extends Item {
    constructor(defaultLootTable: ResourceLocation);

    constructor(defaultLootTable: ResourceLocation, listItemsReceived: boolean);

    constructor(defaultLootTable: ResourceLocation, properties: Properties);

    constructor(defaultLootTable: ResourceLocation, listItemsReceived: boolean, properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flag: TooltipFlag): void;
    get stack(): ItemStack;
    getStack(lootTable: ResourceKey<LootTable>): ItemStack;
    static setLootTable(stack: ItemStack, lootTable: ResourceKey<LootTable>): void;
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }

}

declare module 'net.silentchaos512.lib.item.ILeftClickItem' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class EventHandler {
    static init(): void;
  }


  interface Target extends Enum<Target> {}
  class Target extends Enum<Target> {
    static readonly EMPTY: Target;
    static readonly BLOCK: Target;
    static valueOf(name: string): Target;
    static values(): Target[];
  }

}

declare module 'net.silentchaos512.lib.network.internal' {
  import { RegisterPayloadHandlersEvent } from 'net.neoforged.neoforge.network.event';
  import { IPayloadContext } from 'net.neoforged.neoforge.network.handling';

  class SilentLibClientPayloadHandler {
    static get instance(): SilentLibClientPayloadHandler;
  }


  class SilentLibNetwork {
    static register(event: RegisterPayloadHandlersEvent): void;
  }


  class SilentLibServerPayloadHandler {
    static get instance(): SilentLibServerPayloadHandler;
    handleSwingItem(data: SwingItemPayload, ctx: IPayloadContext): void;
  }

}

declare module 'net.silentchaos512.lib' {
  import { Logger } from 'org.slf4j';
  import { DeferredHolder } from 'net.neoforged.neoforge.registries';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ResourceLocation } from 'net.minecraft.resources';

  class SilentLib {
    static readonly MOD_ID: string;
    static readonly LOGGER: Logger;
    static readonly LOOT_CONTAINER: DeferredHolder;
    static readonly DIMENSION_FILTER_PLACEMENT: DeferredHolder;
    constructor(modEventBus: IEventBus);
    static get version(): string;
    static getId(path: string): ResourceLocation;
    static isDevBuild(): boolean;
  }

}

declare module 'net.silentchaos512.lib.util' {
  import { Enum, Integer, Class, CharSequence, Iterable } from 'java.lang';
  import { Horizontal, Vertical } from 'net.silentchaos512.lib.util.Anchor';
  import { List, Optional, Collection, Random, Map } from 'java.util';
  import { LivingEntity, Entity, EntityType } from 'net.minecraft.world.entity';
  import { Attribute, AttributeModifier, AttributeInstance } from 'net.minecraft.world.entity.ai.attributes';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Stream } from 'java.util.stream';
  import { Codec, DataResult } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { JsonObject, JsonElement, JsonArray } from 'com.google.gson';
  import { Level, ItemLike } from 'net.minecraft.world.level';
  import { ServerLevel, ServerPlayer } from 'net.minecraft.server.level';
  import { Function, Predicate, BiFunction } from 'java.util.function';
  import { Slot } from 'net.minecraft.world.inventory';
  import { Inventory, Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Container } from 'net.minecraft.world';
  import { ItemEntity } from 'net.minecraft.world.entity.item';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';
  import { Vec3i, Position, NonNullList, Direction, BlockPos } from 'net.minecraft.core';
  import { Block } from 'net.minecraft.world.level.block';
  import { IBlockProvider } from 'net.silentchaos512.lib.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { FluidStack } from 'net.neoforged.neoforge.fluids';
  import { RecipeSerializer, Recipe } from 'net.minecraft.world.item.crafting';
  import { Tag, CompoundTag, CollectionTag } from 'net.minecraft.nbt';
  import { Font, GuiGraphics } from 'net.minecraft.client.gui';
  import { FormattedCharSequence } from 'net.minecraft.util';
  import { FormattedText } from 'net.minecraft.network.chat';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';

  interface Anchor extends Enum<Anchor> {}
  class Anchor extends Enum<Anchor> {
    static readonly TOP_LEFT: Anchor;
    static readonly TOP_CENTER: Anchor;
    static readonly TOP_RIGHT: Anchor;
    static readonly CENTER_LEFT: Anchor;
    static readonly CENTER: Anchor;
    static readonly CENTER_RIGHT: Anchor;
    static readonly BOTTOM_LEFT: Anchor;
    static readonly BOTTOM_CENTER: Anchor;
    static readonly BOTTOM_RIGHT: Anchor;
    get horizontal(): Horizontal;
    get vertical(): Vertical;
    getX(scaledScreenWidth: number, elementWidth: number, margin: number): number;
    getY(scaledScreenHeight: number, elementHeight: number, margin: number): number;
    static valueOf(name: string): Anchor;
    static values(): Anchor[];
  }


  class AttributeHelper {
    static apply(entity: LivingEntity, attribute: Attribute, modifier: AttributeModifier): void;
    static apply(attributeInstance: AttributeInstance, modifier: AttributeModifier): void;
    static remove(entity: LivingEntity, attribute: Attribute, id: ResourceLocation): void;
    static remove(attributeInstance: AttributeInstance, id: ResourceLocation): void;
  }


  class CollectionUtils {
    static random<T>(list: T[]): T;
    static random<T>(stream: Stream<T>): T;
  }


  class Color {
    static readonly CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    static readonly VALUE_WHITE: number;
    static readonly ALICEBLUE: Color;
    static readonly ANTIQUEWHITE: Color;
    static readonly AQUA: Color;
    static readonly AQUAMARINE: Color;
    static readonly AZURE: Color;
    static readonly BEIGE: Color;
    static readonly BISQUE: Color;
    static readonly BLACK: Color;
    static readonly BLANCHEDALMOND: Color;
    static readonly BLUE: Color;
    static readonly BLUEVIOLET: Color;
    static readonly BROWN: Color;
    static readonly BURLYWOOD: Color;
    static readonly CADETBLUE: Color;
    static readonly CHARTREUSE: Color;
    static readonly CHOCOLATE: Color;
    static readonly CORAL: Color;
    static readonly CORNFLOWERBLUE: Color;
    static readonly CORNSILK: Color;
    static readonly CRIMSON: Color;
    static readonly CYAN: Color;
    static readonly DARKBLUE: Color;
    static readonly DARKCYAN: Color;
    static readonly DARKGOLDENROD: Color;
    static readonly DARKGRAY: Color;
    static readonly DARKGREY: Color;
    static readonly DARKGREEN: Color;
    static readonly DARKKHAKI: Color;
    static readonly DARKMAGENTA: Color;
    static readonly DARKOLIVEGREEN: Color;
    static readonly DARKORANGE: Color;
    static readonly DARKORCHID: Color;
    static readonly DARKRED: Color;
    static readonly DARKSALMON: Color;
    static readonly DARKSEAGREEN: Color;
    static readonly DARKSLATEBLUE: Color;
    static readonly DARKSLATEGRAY: Color;
    static readonly DARKSLATEGREY: Color;
    static readonly DARKTURQUOISE: Color;
    static readonly DARKVIOLET: Color;
    static readonly DEEPPINK: Color;
    static readonly DEEPSKYBLUE: Color;
    static readonly DIMGRAY: Color;
    static readonly DIMGREY: Color;
    static readonly DODGERBLUE: Color;
    static readonly FIREBRICK: Color;
    static readonly FLORALWHITE: Color;
    static readonly FORESTGREEN: Color;
    static readonly FUCHSIA: Color;
    static readonly GAINSBORO: Color;
    static readonly GHOSTWHITE: Color;
    static readonly GOLD: Color;
    static readonly GOLDENROD: Color;
    static readonly GRAY: Color;
    static readonly GREY: Color;
    static readonly GREEN: Color;
    static readonly GREENYELLOW: Color;
    static readonly HONEYDEW: Color;
    static readonly HOTPINK: Color;
    static readonly INDIANRED: Color;
    static readonly INDIGO: Color;
    static readonly IVORY: Color;
    static readonly KHAKI: Color;
    static readonly LAVENDER: Color;
    static readonly LAVENDERBLUSH: Color;
    static readonly LAWNGREEN: Color;
    static readonly LEMONCHIFFON: Color;
    static readonly LIGHTBLUE: Color;
    static readonly LIGHTCORAL: Color;
    static readonly LIGHTCYAN: Color;
    static readonly LIGHTGOLDENRODYELLOW: Color;
    static readonly LIGHTGRAY: Color;
    static readonly LIGHTGREY: Color;
    static readonly LIGHTGREEN: Color;
    static readonly LIGHTPINK: Color;
    static readonly LIGHTSALMON: Color;
    static readonly LIGHTSEAGREEN: Color;
    static readonly LIGHTSKYBLUE: Color;
    static readonly LIGHTSLATEGRAY: Color;
    static readonly LIGHTSLATEGREY: Color;
    static readonly LIGHTSTEELBLUE: Color;
    static readonly LIGHTYELLOW: Color;
    static readonly LIME: Color;
    static readonly LIMEGREEN: Color;
    static readonly LINEN: Color;
    static readonly MAGENTA: Color;
    static readonly MAROON: Color;
    static readonly MEDIUMAQUAMARINE: Color;
    static readonly MEDIUMBLUE: Color;
    static readonly MEDIUMORCHID: Color;
    static readonly MEDIUMPURPLE: Color;
    static readonly MEDIUMSEAGREEN: Color;
    static readonly MEDIUMSLATEBLUE: Color;
    static readonly MEDIUMSPRINGGREEN: Color;
    static readonly MEDIUMTURQUOISE: Color;
    static readonly MEDIUMVIOLETRED: Color;
    static readonly MIDNIGHTBLUE: Color;
    static readonly MINTCREAM: Color;
    static readonly MISTYROSE: Color;
    static readonly MOCCASIN: Color;
    static readonly NAVAJOWHITE: Color;
    static readonly NAVY: Color;
    static readonly OLDLACE: Color;
    static readonly OLIVE: Color;
    static readonly OLIVEDRAB: Color;
    static readonly ORANGE: Color;
    static readonly ORANGERED: Color;
    static readonly ORCHID: Color;
    static readonly PALEGOLDENROD: Color;
    static readonly PALEGREEN: Color;
    static readonly PALETURQUOISE: Color;
    static readonly PALEVIOLETRED: Color;
    static readonly PAPAYAWHIP: Color;
    static readonly PEACHPUFF: Color;
    static readonly PERU: Color;
    static readonly PINK: Color;
    static readonly PLUM: Color;
    static readonly POWDERBLUE: Color;
    static readonly PURPLE: Color;
    static readonly REBECCAPURPLE: Color;
    static readonly RED: Color;
    static readonly ROSYBROWN: Color;
    static readonly ROYALBLUE: Color;
    static readonly SADDLEBROWN: Color;
    static readonly SALMON: Color;
    static readonly SANDYBROWN: Color;
    static readonly SEAGREEN: Color;
    static readonly SEASHELL: Color;
    static readonly SIENNA: Color;
    static readonly SILVER: Color;
    static readonly SKYBLUE: Color;
    static readonly SLATEBLUE: Color;
    static readonly SLATEGRAY: Color;
    static readonly SLATEGREY: Color;
    static readonly SNOW: Color;
    static readonly SPRINGGREEN: Color;
    static readonly STEELBLUE: Color;
    static readonly TAN: Color;
    static readonly TEAL: Color;
    static readonly THISTLE: Color;
    static readonly TOMATO: Color;
    static readonly TURQUOISE: Color;
    static readonly VIOLET: Color;
    static readonly WHEAT: Color;
    static readonly WHITE: Color;
    static readonly WHITESMOKE: Color;
    static readonly YELLOW: Color;
    static readonly YELLOWGREEN: Color;
    constructor(color: number);

    constructor(red: number, green: number, blue: number);

    constructor(red: number, green: number, blue: number, alpha: number);

    constructor(red: number, green: number, blue: number);

    constructor(red: number, green: number, blue: number, alpha: number);
    static blend(color1: Color, color2: Color): Color;
    static blend(color1: Color, color2: Color, ratio: number): Color;
    static blend(color1: number, color2: number): number;
    static blend(color1: number, color2: number, ratio: number): number;
    blendWith(other: Color): Color;
    equals(other: any): boolean;
    format(): string;
    static format(color: number): string;
    static from(json: JsonObject, propertyName: string, defaultValue: number): Color;
    get alpha(): number;
    get alphaInt(): number;
    get blue(): number;
    get blueInt(): number;
    get color(): number;
    get green(): number;
    get greenInt(): number;
    get red(): number;
    get redInt(): number;
    hashCode(): number;
    static parse(str: string): Color;
    static parseInt(str: string): number;
    static read(str: string): DataResult<Color>;
    static read(buf: FriendlyByteBuf): Color;
    static tryParse(str: string, defaultValue: number): Color;
    static validate(str: string): boolean;
    write(buf: FriendlyByteBuf): void;
  }


  class DimensionId {
    equals(o: any): boolean;
    static fromId(id: ResourceKey<Level>): DimensionId;
    static fromPacket(buf: FriendlyByteBuf): DimensionId;
    static fromResourceLocation(location: ResourceLocation): DimensionId;
    static fromWorld(world: Level): DimensionId;
    get id(): ResourceKey<Level>;
    get name(): string;
    get registryName(): ResourceLocation;
    get world(): ServerLevel;
    hashCode(): number;
    isOverworld(): boolean;
    loadWorld(): ServerLevel;
    loadWorld(otherWorld: Level): ServerLevel;
    static overworld(): DimensionId;
    static sameDimension(world1: Level, world2: Level): boolean;
    sameDimension(world: Level): boolean;
    toBytes(buf: FriendlyByteBuf): void;
  }


  class EnumUtils {
    static byIndex<E extends Enum<E>>(value: number, defaultValue: E, getter: Function<E, number>): E;
    static byIndex<E extends Enum<E>>(value: number, clazz: Class<E>, getter: Function<E, number>): Optional<E>;
    static byName<E extends Enum<E>>(name: string, defaultValue: E): E;
    static byName<E extends Enum<E>>(name: string, clazz: Class<E>): Optional<E>;
    static byOrdinal<E extends Enum<E>>(ordinal: number, defaultValue: E): E;
    static byOrdinal<E extends Enum<E>>(ordinal: number, clazz: Class<E>): Optional<E>;
    static cycle<E extends Enum<E>>(current: E, reverse: boolean): E;
    static validate<E extends Enum<E>>(obj: any, enumClass: Class<E>): boolean;
  }


  class InventoryUtils {
    static canItemsStack(a: ItemStack, b: ItemStack): boolean;
    static createPlayerSlots(playerInventory: Inventory, startX: number, startY: number): Collection<Slot>;
    static firstMatch(inv: Container, predicate: Predicate<ItemStack>): ItemStack;
    static mergeItem(inventory: Container, slotStart: number, slotEndExclusive: number, stack: ItemStack): ItemStack;
    static mergeItems(inventory: Container, slotStart: number, slotEndExclusive: number, stacks: Collection<ItemStack>): Collection<ItemStack>;
  }


  class LootUtils {
    static createDroppedItem(stack: ItemStack, dropper: Entity): ItemEntity;
    static gift(lootTableKey: ResourceKey<LootTable>, player: ServerPlayer): Collection<ItemStack>;
  }


  class MathUtils {
    static clamp(value: number, lowerBound: number, upperBound: number): number;
    static clamp(value: number, lowerBound: number, upperBound: number): number;
    static clamp(value: number, lowerBound: number, upperBound: number): number;
    static doubleIsInt(value: number): boolean;
    static doublesEqual(a: number, b: number): boolean;
    static doublesEqual(a: number, b: number, precision: number): boolean;
    static floatIsInt(value: number): boolean;
    static floatsEqual(a: number, b: number): boolean;
    static floatsEqual(a: number, b: number, precision: number): boolean;
    static inRangeExclusive(value: number, min: number, max: number): boolean;
    static inRangeExclusive(value: number, min: number, max: number): boolean;
    static inRangeInclusive(value: number, min: number, max: number): boolean;
    static inRangeInclusive(value: number, min: number, max: number): boolean;
    static max(a: number, b: number): number;
    static max(a: number, b: number, c: number): number;
    static max(a: number, b: number, c: number, d: number): number;
    static max(a: number, b: number, c: number, d: number, ...rest: number[]): number;
    static min(a: number, b: number): number;
    static min(a: number, b: number, c: number): number;
    static min(a: number, b: number, c: number, d: number): number;
    static min(a: number, b: number, c: number, d: number, ...rest: number[]): number;
    static nextGaussian(mean: number, deviation: number): number;
    static nextGaussian(random: Random, mean: number, deviation: number): number;
    static nextInt(bound: number): number;
    static nextIntInclusive(min: number, max: number): number;
    static nextIntInclusive(random: Random, min: number, max: number): number;
    static tryPercentage(percent: number): boolean;
    static tryPercentage(random: Random, percent: number): boolean;
  }


  class MCMathUtils {
    static distance(from: Vec3i, to: Vec3i): number;
    static distance(from: Position, to: Position): number;
    static distance(entity: Entity, pos: Vec3i): number;
    static distance(entity: Entity, pos: Position): number;
    static distanceHorizontal(from: Vec3i, to: Vec3i): number;
    static distanceHorizontal(from: Position, to: Position): number;
    static distanceHorizontal(entity: Entity, pos: Vec3i): number;
    static distanceHorizontal(entity: Entity, pos: Position): number;
    static distanceHorizontalSq(from: Vec3i, to: Vec3i): number;
    static distanceHorizontalSq(from: Position, to: Position): number;
    static distanceHorizontalSq(entity: Entity, pos: Vec3i): number;
    static distanceHorizontalSq(entity: Entity, pos: Position): number;
    static distanceSq(from: Vec3i, to: Vec3i): number;
    static distanceSq(from: Position, to: Position): number;
    static distanceSq(entity: Entity, pos: Vec3i): number;
    static distanceSq(entity: Entity, pos: Position): number;
  }


  class NameUtils {
    static checkNotNull(name: ResourceLocation): ResourceLocation;
    static forgeId(path: string): ResourceLocation;
    static fromBlock(block: Block): ResourceLocation;
    static fromBlock(block: IBlockProvider): ResourceLocation;
    static fromBlock(state: BlockState): ResourceLocation;
    static fromEntity(entity: Entity): ResourceLocation;
    static fromEntityType(type: EntityType<any>): ResourceLocation;
    static fromFluid(fluid: Fluid): ResourceLocation;
    static fromFluid(fluid: FluidStack): ResourceLocation;
    static fromItem(item: ItemLike): ResourceLocation;
    static fromItem(stack: ItemStack): ResourceLocation;
    static fromRecipeSerializer(serializer: RecipeSerializer<Recipe<any>>): ResourceLocation;
    static isValid(name: CharSequence): boolean;
  }


  class NBTToJson {
    static toJson(nbt: Tag): JsonElement;
    static toJsonArray(nbt: CollectionTag<any>): JsonArray;
    static toJsonObject(nbt: CompoundTag): JsonObject;
    static writeFile(json: JsonObject): string;
  }


  class PlayerUtils {
    static getFirstValidStack(player: Player, includeMain: boolean, includeOffHand: boolean, includeArmor: boolean, predicate: Predicate<ItemStack>): ItemStack;
    static getNonEmptyStacks(player: Player): NonNullList<ItemStack>;
    static getNonEmptyStacks(player: Player, predicate: Predicate<ItemStack>): NonNullList<ItemStack>;
    static getNonEmptyStacks(player: Player, includeMain: boolean, includeOffHand: boolean, includeArmor: boolean): NonNullList<ItemStack>;
    static getNonEmptyStacks(player: Player, includeMain: boolean, includeOffHand: boolean, includeArmor: boolean, predicate: Predicate<ItemStack>): NonNullList<ItemStack>;
    static getPersistedDataSubcompound(player: Player, subCompoundKey: string): CompoundTag;
    static giveItem(player: Player, stack: ItemStack): void;
    static removeItem(player: Player, stack: ItemStack): void;
  }


  class StringUtils {
    static lower(str: string): string;
    static wrapLines(list: Iterable<string>, lineWidth: number, stripper: Function<string, string>): string[];
  }


  class TeleportUtils {
    static teleport(player: Player, pos: DimPos, direction: Direction): void;
    static teleport(player: Player, dimension: ResourceKey<Level>, destX: number, destY: number, destZ: number, direction: Direction): void;
    static teleportEntity(entity: Entity, pos: DimPos, facing: Direction): Entity;
    static teleportEntity(entity: Entity, destinationLevel: Level, newX: number, newY: number, newZ: number, facing: Direction): Entity;
    static teleportToDimension(player: Player, dimension: ResourceKey<Level>, x: number, y: number, z: number): void;
  }


  class TextRenderUtils {
    static get fontRenderer(): Font;
    static renderScaled(graphics: GuiGraphics, font: Font, text: FormattedCharSequence, x: number, y: number, scale: number, color: number, shadow: boolean): void;
    static renderSplit(graphics: GuiGraphics, font: Font, text: FormattedText, x: number, y: number, width: number, color: number, shadow: boolean): void;
    static renderSplitScaled(graphics: GuiGraphics, font: Font, text: FormattedText, x: number, y: number, scale: number, color: number, shadow: boolean, length: number): void;
  }


  class TimeUtils {
    static readonly TICKS_PER_SECOND: number;
    static readonly VANILLA_DAY_LENGTH: number;
    static ticksFromHours(hours: number): number;
    static ticksFromMinutes(minutes: number): number;
    static ticksFromSeconds(seconds: number): number;
  }


  class WorldUtils {
    static getBlocks<T>(world: Level, xMin: number, yMin: number, zMin: number, xMax: number, yMax: number, zMax: number, getter: BiFunction<Level, BlockPos, Optional<T>>): Map<BlockPos, T>;
    static getBlocksInArea<T>(world: Level, pos: BlockPos, range: number, getter: BiFunction<Level, BlockPos, Optional<T>>): Map<BlockPos, T>;
    static getBlocksInSphere<T>(world: Level, pos: BlockPos, radius: number, getter: BiFunction<Level, BlockPos, Optional<T>>): Map<BlockPos, T>;
    static getTileEntities<T extends BlockEntity>(clazz: Class<T>, world: Level, xMin: number, yMin: number, zMin: number, xMax: number, yMax: number, zMax: number): Map<BlockPos, T>;
    static getTileEntitiesInArea<T extends BlockEntity>(clazz: Class<T>, world: Level, pos: BlockPos, range: number): Map<BlockPos, T>;
    static getTileEntitiesInSphere<T extends BlockEntity>(clazz: Class<T>, world: Level, pos: BlockPos, radius: number): Map<BlockPos, T>;
  }

}

declare module 'net.silentchaos512.lib.util.Anchor' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Horizontal extends Enum<Horizontal> {}
  class Horizontal extends Enum<Horizontal> {
    static readonly LEFT: Horizontal;
    static readonly CENTER: Horizontal;
    static readonly RIGHT: Horizontal;
    getX(var1: number, var2: number, var3: number): number;
    static valueOf(name: string): Horizontal;
    static values(): Horizontal[];
  }


  interface Vertical extends Enum<Vertical> {}
  class Vertical extends Enum<Vertical> {
    static readonly TOP: Vertical;
    static readonly CENTER: Vertical;
    static readonly BOTTOM: Vertical;
    getY(var1: number, var2: number, var3: number): number;
    static valueOf(name: string): Vertical;
    static values(): Vertical[];
  }

}

declare module 'net.silentchaos512.lib.world.placement' {
  import { PlacementModifier, PlacementContext, PlacementModifierType } from 'net.minecraft.world.level.levelgen.placement';
  import { MapCodec } from 'com.mojang.serialization';
  import { Collection } from 'java.util';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Level } from 'net.minecraft.world.level';
  import { Stream } from 'java.util.stream';
  import { BlockPos } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';

  interface DimensionFilterPlacement extends PlacementModifier {}
  class DimensionFilterPlacement extends PlacementModifier {
    static readonly CODEC: MapCodec;
    constructor(isWhitelist: boolean, levels: Collection<ResourceKey<Level>>);
    getPositions(helper: PlacementContext, rand: RandomSource, pos: BlockPos): Stream<BlockPos>;
    type(): PlacementModifierType<DimensionFilterPlacement>;
  }

}