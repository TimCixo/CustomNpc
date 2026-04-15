declare module 'mod.linguardium.badgebox.common' {
  import { Logger } from 'org.slf4j';
  import { ResourceLocation } from 'net.minecraft.resources';

  class BadgeBoxCommonInitializer {
    static readonly MOD_ID: string;
    static readonly LOGGER: Logger;
    static init(): void;
  }


  class Util {
    static id(path: string): ResourceLocation;
  }

}

declare module 'mod.linguardium.badgebox.common.client' {
  import { Consumer } from 'java.util.function';
  import { ClientState } from 'ClientLifecycleEvent';

  class BadgeBoxCommonClientInitializer {
    static init(): void;
    static init(clientSetupEvent: Consumer<ClientState>): void;
    static initNow(): void;
  }

}

declare module 'mod.linguardium.badgebox.common.client.registration' {
  class ModHandledScreens {
    static init(): void;
  }

}

declare module 'mod.linguardium.badgebox.common.client.screen' {
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { BadgeBoxContainerScreenHandler } from 'mod.linguardium.badgebox.common.screen';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface BadgeBoxContainerScreen extends AbstractContainerScreen<BadgeBoxContainerScreenHandler> {}
  class BadgeBoxContainerScreen extends AbstractContainerScreen<BadgeBoxContainerScreenHandler> {
    static readonly BACKGROUND: ResourceLocation;
    static readonly BACKGROUND_WITH_RIBBON_SLOT: ResourceLocation;
    static readonly BACKGROUND_WIDTH: number;
    static readonly BACKGROUND_HEIGHT: number;
    constructor(handler: BadgeBoxContainerScreenHandler, inventory: Inventory, title: Component);
    render(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }

}

declare module 'mod.linguardium.badgebox.common.item' {
  import { Item, ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { Properties, TooltipContext } from 'Item';
  import { InteractionResultHolder, InteractionHand, SimpleContainer } from 'net.minecraft.world';
  import { Level } from 'net.minecraft.world.level';
  import { Player, Inventory } from 'net.minecraft.world.entity.player';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { Component } from 'net.minecraft.network.chat';
  import { AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { BadgeInventoryComponent } from 'mod.linguardium.badgebox.common.item.components';
  import { List } from 'java.util';

  interface BadgeBoxItem extends Item {}
  class BadgeBoxItem extends Item {
    constructor(settings: Properties);
    createMenu(syncId: number, playerInventory: Inventory, player: Player): AbstractContainerMenu;
    get displayName(): Component;
    saveExtraData(buf: FriendlyByteBuf): void;
    use(world: Level, user: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface BadgeItem extends Item {}
  class BadgeItem extends Item {
    constructor(settings: Properties);
  }


  interface ComponentStorageInventory extends SimpleContainer {}
  class ComponentStorageInventory extends SimpleContainer {
    static fromBadgeInventoryComponent(holder: ItemStack, backingComponent: BadgeInventoryComponent): ComponentStorageInventory;
    saveInventory(): void;
    setChanged(): void;
    stopOpen(player: Player): void;
    updateBackingStackComponent(component: BadgeInventoryComponent): void;
  }


  interface RibbonItem extends Item {}
  class RibbonItem extends Item {
    constructor(settings: Properties);
    appendHoverText(itemStack: ItemStack, context: TooltipContext, tooltip: Component[], type: TooltipFlag): void;
  }

}

declare module 'mod.linguardium.badgebox.common.item.components' {
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { ComponentStorageInventory } from 'mod.linguardium.badgebox.common.item';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ImmutableList } from 'com.google.common.collect';
  import { Optional } from 'java.util';

  class BadgeInventoryComponent {
    static readonly EMPTY: BadgeInventoryComponent;
    static readonly CODEC: MapCodec;
    static readonly PACKET_CODEC: StreamCodec;
    asInventory(stack: ItemStack): ComponentStorageInventory;
    equals(o: any): boolean;
    get(slot: number): ItemStack;
    get itemStackList(): ImmutableList<ItemStack>;
    get ribbonSlot(): ItemStack;
    get size(): number;
    hasRibbonSlot(): boolean;
    hashCode(): number;
    set ribbonSlot(newRibbonSlot: Optional<ItemStack>);
    setInventory(newStackList: ImmutableList<ItemStack>): BadgeInventoryComponent;
  }

}

declare module 'mod.linguardium.badgebox.common.mixin' {
  import { ShapedRecipePattern, CraftingBookCategory } from 'net.minecraft.world.item.crafting';
  import { ItemStack } from 'net.minecraft.world.item';

  class ShapedRecipeAccessor {
    get category(): CraftingBookCategory;
    get group(): string;
    get pattern(): ShapedRecipePattern;
    get result(): ItemStack;
    get showNotification(): boolean;
  }

}

declare module 'mod.linguardium.badgebox.common.recipe' {
  import { ShapedRecipe, CraftingBookCategory, ShapedRecipePattern, CraftingInput, RecipeSerializer } from 'net.minecraft.world.item.crafting';
  import { ShapedRecipeAccessor } from 'mod.linguardium.badgebox.common.mixin';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Provider } from 'HolderLookup';

  interface AddRibbonRecipe extends ShapedRecipe {}
  class AddRibbonRecipe extends ShapedRecipe {
    constructor(recipe: ShapedRecipeAccessor);

    constructor(group: string, category: CraftingBookCategory, raw: ShapedRecipePattern, result: ItemStack);

    constructor(group: string, category: CraftingBookCategory, raw: ShapedRecipePattern, result: ItemStack, showNotification: boolean);
    assemble(craftingRecipeInput: CraftingInput, wrapperLookup: Provider): ItemStack;
    static create(recipe: ShapedRecipe): AddRibbonRecipe;
    get serializer(): RecipeSerializer<any>;
  }

}

declare module 'mod.linguardium.badgebox.common.recipe.AddRibbonRecipe' {
  import { RecipeSerializer } from 'net.minecraft.world.item.crafting';
  import { AddRibbonRecipe } from 'mod.linguardium.badgebox.common.recipe';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { MapCodec } from 'com.mojang.serialization';

  interface AddRibbonSerializer extends RecipeSerializer<AddRibbonRecipe> {}
  class AddRibbonSerializer extends RecipeSerializer<AddRibbonRecipe> {
    codec(): MapCodec<AddRibbonRecipe>;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, AddRibbonRecipe>;
  }

}

declare module 'mod.linguardium.badgebox.common.registration' {
  import { Supplier } from 'java.util.function';
  import { Registrar, RegistrySupplier } from 'dev.architectury.registry.registries';
  import { BadgeBoxContainerScreenHandler } from 'mod.linguardium.badgebox.common.screen';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  class BadgeBoxRegistrar {
    static readonly MANAGER: Supplier;
    static readonly COMPONENTS: Registrar;
    static readonly ITEMS: Registrar;
    static readonly ITEM_GROUPS: Registrar;
    static readonly SCREEN_HANDLER_TYPES: Registrar;
    static readonly RECIPE_SERIALIZERS: Registrar;
    static init(): void;
  }


  class ModDataComponentType {
    static readonly BADGEBOX_INVENTORY_COMPONENT: RegistrySupplier;
    static init(): void;
  }


  class ModItemGroups {
    static readonly BADGE_BOX_ITEM_GROUP: RegistrySupplier;
    static init(): void;
  }


  class ModItems {
    static readonly BADGE_BOX_ITEM: RegistrySupplier;
    static readonly BADGE_BOX_ITEM_RIBBON: RegistrySupplier;
    static init(): void;
  }


  class ModRecipeSerializers {
    static readonly ADD_RIBBON_RECIPE_SERIALIZER: RegistrySupplier;
    static init(): void;
  }


  class ModScreenHandlerTypes {
    static readonly BADGE_BOX_SCREEN_HANDLER_TYPE: RegistrySupplier;
    static createBadgeScreenHandler(id: number, inventory: Inventory, buf: FriendlyByteBuf): BadgeBoxContainerScreenHandler;
    static init(): void;
  }

}

declare module 'mod.linguardium.badgebox.common.screen' {
  import { AbstractContainerMenu, Slot } from 'net.minecraft.world.inventory';
  import { Inventory, Player } from 'net.minecraft.world.entity.player';
  import { Container } from 'net.minecraft.world';
  import { ExtendedScreenHandlerData } from 'mod.linguardium.badgebox.common.screen.BadgeBoxContainerScreenHandler';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { ItemStack } from 'net.minecraft.world.item';

  interface BadgeBoxContainerScreenHandler extends AbstractContainerMenu {}
  class BadgeBoxContainerScreenHandler extends AbstractContainerMenu {
    static readonly INVENTORY_COLUMNS: number;
    static readonly INVENTORY_ROWS: number;
    constructor(syncId: number, playerInventory: Inventory, inventory: Container, hasRibbonSlotStack: boolean, boxSlot: number);

    constructor(syncId: number, playerInventory: Inventory, data: ExtendedScreenHandlerData);
    canTakeItemForPickAll(stack: ItemStack, slot: Slot): boolean;
    static create(syncId: number, playerInventory: Inventory, buf: FriendlyByteBuf): BadgeBoxContainerScreenHandler;
    get inventory(): Container;
    static get inventorySlotCount(): number;
    hasRibbonSlot(): boolean;
    quickMoveStack(player: Player, slotIndex: number): ItemStack;
    removed(player: Player): void;
    stillValid(player: Player): boolean;
  }

}

declare module 'mod.linguardium.badgebox.common.screen.slot' {
  import { Slot } from 'net.minecraft.world.inventory';
  import { Container } from 'net.minecraft.world';
  import { Predicate } from 'java.util.function';
  import { Integer } from 'java.lang';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Optional } from 'java.util';
  import { TagKey } from 'net.minecraft.tags';

  interface LockPredicateSlot extends Slot {}
  class LockPredicateSlot extends Slot {
    constructor(inventory: Container, index: number, x: number, y: number, predicate: Predicate<number>);
    allowModification(player: Player): boolean;
    mayPickup(playerEntity: Player): boolean;
    mayPlace(stack: ItemStack): boolean;
    remove(amount: number): ItemStack;
    safeInsert(stack: ItemStack, count: number): ItemStack;
    safeInsert(stack: ItemStack): ItemStack;
    safeTake(min: number, max: number, player: Player): ItemStack;
    tryRemove(min: number, max: number, player: Player): Optional<ItemStack>;
  }


  interface TagLimitedSlot extends Slot {}
  class TagLimitedSlot extends Slot {
    constructor(inventory: Container, index: number, x: number, y: number, tag: TagKey<Item>);
    static badge(inventory: Container, index: number, x: number, y: number): TagLimitedSlot;
    mayPlace(stack: ItemStack): boolean;
    static ribbon(inventory: Container, index: number, x: number, y: number): TagLimitedSlot;
  }

}

declare module 'mod.linguardium.badgebox.common.tags' {
  import { TagKey } from 'net.minecraft.tags';

  class ModTags {
    static readonly BADGE_TAG: TagKey;
    static readonly RIBBON_TAG: TagKey;
  }

}

declare module 'mod.linguardium.badgebox.neoforge' {
  class BadgeBoxClientNeoForge {
  }


  class BadgeBoxNeoForge {
    constructor();
  }

}