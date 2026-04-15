declare module 'jeresources.jei' {
  import { IDrawable } from 'mezz.jei.api.gui.drawable';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { IRecipeSlotsView } from 'mezz.jei.api.gui.ingredient';
  import { List, Map } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { IModPlugin } from 'mezz.jei.api';
  import { RecipeType } from 'mezz.jei.api.recipe';
  import { IRecipeRegistration, IRecipeCategoryRegistration } from 'mezz.jei.api.registration';
  import { IJeiRuntime } from 'mezz.jei.api.runtime';
  import { IJeiHelpers } from 'mezz.jei.api.helpers';

  interface BackgroundDrawable extends IDrawable {}
  class BackgroundDrawable extends IDrawable {
    constructor(resource: string, width: number, height: number);
    draw(guiGraphics: GuiGraphics, xOffset: number, yOffset: number): void;
    get height(): number;
    get resource(): ResourceLocation;
    get width(): number;
  }


  interface BlankJEIRecipeCategory<T = any> extends IRecipeCategory<T> {}
  class BlankJEIRecipeCategory<T = any> extends IRecipeCategory<T> {
    draw(recipe: T, recipeSlotsView: IRecipeSlotsView, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get icon(): IDrawable;
    getTooltipStrings(recipe: T, recipeSlotsView: IRecipeSlotsView, mouseX: number, mouseY: number): Component[];
  }


  interface JEIConfig extends IModPlugin {}
  class JEIConfig extends IModPlugin {
    static readonly MOB: ResourceLocation;
    static readonly MOB_TYPE: RecipeType;
    static readonly DUNGEON: ResourceLocation;
    static readonly DUNGEON_TYPE: RecipeType;
    static readonly WORLD_GEN: ResourceLocation;
    static readonly WORLD_GEN_TYPE: RecipeType;
    static readonly PLANT: ResourceLocation;
    static readonly PLANT_TYPE: RecipeType;
    static readonly ENCHANTMENT: ResourceLocation;
    static readonly ENCHANTMENT_TYPE: RecipeType;
    static readonly VILLAGER: ResourceLocation;
    static readonly VILLAGER_TYPE: RecipeType;
    static readonly TYPES: Map;
    static get jeiHelpers(): IJeiHelpers;
    get pluginUid(): ResourceLocation;
    static hideCategories(categories: string[]): void;
    onRuntimeAvailable(jeiRuntime: IJeiRuntime): void;
    registerCategories(registration: IRecipeCategoryRegistration): void;
    registerRecipes(registration: IRecipeRegistration): void;
    static resetCategories(): void;
  }

}

declare module 'jeresources.jei.dungeon' {
  import { BlankJEIRecipeCategory } from 'jeresources.jei';
  import { DungeonEntry } from 'jeresources.entry';
  import { Component } from 'net.minecraft.network.chat';
  import { IDrawable } from 'mezz.jei.api.gui.drawable';
  import { RecipeType, IFocusGroup } from 'mezz.jei.api.recipe';
  import { IRecipeLayoutBuilder } from 'mezz.jei.api.gui.builder';
  import { IRecipeSlotTooltipCallback, IRecipeSlotView } from 'mezz.jei.api.gui.ingredient';
  import { List } from 'java.util';
  import { IRecipeCategoryExtension } from 'mezz.jei.api.recipe.category.extensions';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface DungeonCategory extends BlankJEIRecipeCategory<DungeonEntry> {}
  class DungeonCategory extends BlankJEIRecipeCategory<DungeonEntry> {
    constructor();
    get background(): IDrawable;
    get recipeType(): RecipeType<DungeonEntry>;
    get title(): Component;
    static reloadSettings(): void;
    setRecipe(builder: IRecipeLayoutBuilder, recipe: DungeonEntry, focuses: IFocusGroup): void;
  }


  interface DungeonTooltip extends IRecipeSlotTooltipCallback {}
  class DungeonTooltip extends IRecipeSlotTooltipCallback {
    constructor(entry: DungeonEntry);
    onTooltip(recipeSlotView: IRecipeSlotView, tooltip: Component[]): void;
  }


  interface DungeonWrapper extends IRecipeCategoryExtension<DungeonEntry> {}
  class DungeonWrapper extends IRecipeCategoryExtension<DungeonEntry> {
    drawInfo(entry: DungeonEntry, recipeWidth: number, recipeHeight: number, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    resetLid(): void;
  }

}

declare module 'jeresources.jei.enchantment' {
  import { BlankJEIRecipeCategory } from 'jeresources.jei';
  import { Component } from 'net.minecraft.network.chat';
  import { IDrawable } from 'mezz.jei.api.gui.drawable';
  import { RecipeType, IFocusGroup } from 'mezz.jei.api.recipe';
  import { IRecipeLayoutBuilder } from 'mezz.jei.api.gui.builder';
  import { IRecipeSlotsView } from 'mezz.jei.api.gui.ingredient';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { List, Collection } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IRecipeCategoryExtension } from 'mezz.jei.api.recipe.category.extensions';
  import { EnchantmentEntry } from 'jeresources.entry';

  interface EnchantmentCategory extends BlankJEIRecipeCategory<EnchantmentWrapper> {}
  class EnchantmentCategory extends BlankJEIRecipeCategory<EnchantmentWrapper> {
    constructor();
    draw(recipe: EnchantmentWrapper, recipeSlotsView: IRecipeSlotsView, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get background(): IDrawable;
    get recipeType(): RecipeType<EnchantmentWrapper>;
    get title(): Component;
    getTooltipStrings(recipe: EnchantmentWrapper, recipeSlotsView: IRecipeSlotsView, mouseX: number, mouseY: number): Component[];
    setRecipe(builder: IRecipeLayoutBuilder, recipe: EnchantmentWrapper, focuses: IFocusGroup): void;
  }


  class EnchantmentMaker {
    static createRecipes(itemStacks: Collection<ItemStack>): EnchantmentWrapper[];
  }


  interface EnchantmentWrapper extends IRecipeCategoryExtension<EnchantmentWrapper> {}
  class EnchantmentWrapper extends IRecipeCategoryExtension<EnchantmentWrapper> {
    static create(itemStack: ItemStack): EnchantmentWrapper;
    drawInfo(recipe: EnchantmentWrapper, recipeWidth: number, recipeHeight: number, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get enchantments(): EnchantmentEntry[];
  }

}

declare module 'jeresources.jei.mob' {
  import { BlankJEIRecipeCategory } from 'jeresources.jei';
  import { MobEntry } from 'jeresources.entry';
  import { Component } from 'net.minecraft.network.chat';
  import { IDrawable } from 'mezz.jei.api.gui.drawable';
  import { RecipeType, IFocusGroup } from 'mezz.jei.api.recipe';
  import { IRecipeLayoutBuilder } from 'mezz.jei.api.gui.builder';
  import { IRecipeSlotTooltipCallback, IRecipeSlotView } from 'mezz.jei.api.gui.ingredient';
  import { List } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IRecipeCategoryExtension } from 'mezz.jei.api.recipe.category.extensions';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface MobCategory extends BlankJEIRecipeCategory<MobEntry> {}
  class MobCategory extends BlankJEIRecipeCategory<MobEntry> {
    constructor();
    get background(): IDrawable;
    get recipeType(): RecipeType<MobEntry>;
    get title(): Component;
    setRecipe(builder: IRecipeLayoutBuilder, recipe: MobEntry, focuses: IFocusGroup): void;
  }


  interface MobTooltip extends IRecipeSlotTooltipCallback {}
  class MobTooltip extends IRecipeSlotTooltipCallback {
    constructor(entry: MobEntry);
    getToolTip(stack: ItemStack): Component[];
    onTooltip(recipeSlotView: IRecipeSlotView, tooltip: Component[]): void;
  }


  interface MobWrapper extends IRecipeCategoryExtension<MobEntry> {}
  class MobWrapper extends IRecipeCategoryExtension<MobEntry> {
    drawInfo(recipe: MobEntry, recipeWidth: number, recipeHeight: number, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    getTooltipStrings(recipe: MobEntry, mouseX: number, mouseY: number): Component[];
  }

}

declare module 'jeresources.jei.plant' {
  import { BlankJEIRecipeCategory } from 'jeresources.jei';
  import { PlantEntry } from 'jeresources.entry';
  import { Component } from 'net.minecraft.network.chat';
  import { IDrawable } from 'mezz.jei.api.gui.drawable';
  import { RecipeType, IFocusGroup } from 'mezz.jei.api.recipe';
  import { IRecipeLayoutBuilder } from 'mezz.jei.api.gui.builder';
  import { IRecipeSlotTooltipCallback, IRecipeSlotView } from 'mezz.jei.api.gui.ingredient';
  import { List } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IRecipeCategoryExtension } from 'mezz.jei.api.recipe.category.extensions';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface PlantCategory extends BlankJEIRecipeCategory<PlantEntry> {}
  class PlantCategory extends BlankJEIRecipeCategory<PlantEntry> {
    constructor();
    get background(): IDrawable;
    get recipeType(): RecipeType<PlantEntry>;
    get title(): Component;
    setRecipe(builder: IRecipeLayoutBuilder, recipe: PlantEntry, focuses: IFocusGroup): void;
  }


  interface PlantTooltip extends IRecipeSlotTooltipCallback {}
  class PlantTooltip extends IRecipeSlotTooltipCallback {
    constructor(entry: PlantEntry);
    getChance(itemStack: ItemStack): number;
    getMinMax(itemStack: ItemStack): number[];
    onTooltip(recipeSlotView: IRecipeSlotView, tooltip: Component[]): void;
  }


  interface PlantWrapper extends IRecipeCategoryExtension<PlantEntry> {}
  class PlantWrapper extends IRecipeCategoryExtension<PlantEntry> {
    drawInfo(recipe: PlantEntry, recipeWidth: number, recipeHeight: number, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
  }

}

declare module 'jeresources.jei.villager' {
  import { BlankJEIRecipeCategory } from 'jeresources.jei';
  import { AbstractVillagerEntry } from 'jeresources.entry';
  import { Component } from 'net.minecraft.network.chat';
  import { IDrawable } from 'mezz.jei.api.gui.drawable';
  import { RecipeType, IFocusGroup, IFocus } from 'mezz.jei.api.recipe';
  import { IRecipeLayoutBuilder } from 'mezz.jei.api.gui.builder';
  import { IRecipeCategoryExtension } from 'mezz.jei.api.recipe.category.extensions';
  import { ItemStack } from 'net.minecraft.world.item';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface VillagerCategory extends BlankJEIRecipeCategory<AbstractVillagerEntry> {}
  class VillagerCategory extends BlankJEIRecipeCategory<AbstractVillagerEntry> {
    constructor();
    get background(): IDrawable;
    get recipeType(): RecipeType<AbstractVillagerEntry>;
    get title(): Component;
    setRecipe(builder: IRecipeLayoutBuilder, recipe: AbstractVillagerEntry, focuses: IFocusGroup): void;
  }


  interface VillagerWrapper extends IRecipeCategoryExtension<AbstractVillagerEntry> {}
  class VillagerWrapper extends IRecipeCategoryExtension<AbstractVillagerEntry> {
    drawInfo(recipe: AbstractVillagerEntry, recipeWidth: number, recipeHeight: number, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    setFocus(focus: IFocus<ItemStack>): void;
  }

}

declare module 'jeresources.jei.worldgen' {
  import { BlankJEIRecipeCategory } from 'jeresources.jei';
  import { WorldGenEntry } from 'jeresources.entry';
  import { Component } from 'net.minecraft.network.chat';
  import { IDrawable } from 'mezz.jei.api.gui.drawable';
  import { RecipeType, IFocusGroup } from 'mezz.jei.api.recipe';
  import { IRecipeSlotsView, IRecipeSlotTooltipCallback, IRecipeSlotView } from 'mezz.jei.api.gui.ingredient';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { IRecipeLayoutBuilder } from 'mezz.jei.api.gui.builder';
  import { List } from 'java.util';
  import { IRecipeCategoryExtension } from 'mezz.jei.api.recipe.category.extensions';

  interface WorldGenCategory extends BlankJEIRecipeCategory<WorldGenEntry> {}
  class WorldGenCategory extends BlankJEIRecipeCategory<WorldGenEntry> {
    constructor();
    draw(recipe: WorldGenEntry, recipeSlotsView: IRecipeSlotsView, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get background(): IDrawable;
    get recipeType(): RecipeType<WorldGenEntry>;
    get title(): Component;
    setRecipe(builder: IRecipeLayoutBuilder, recipe: WorldGenEntry, focuses: IFocusGroup): void;
  }


  interface WorldGenTooltip extends IRecipeSlotTooltipCallback {}
  class WorldGenTooltip extends IRecipeSlotTooltipCallback {
    constructor(entry: WorldGenEntry);
    onTooltip(recipeSlotView: IRecipeSlotView, tooltip: Component[]): void;
  }


  interface WorldGenWrapper extends IRecipeCategoryExtension<WorldGenEntry> {}
  class WorldGenWrapper extends IRecipeCategoryExtension<WorldGenEntry> {
    drawInfo(recipe: WorldGenEntry, recipeWidth: number, recipeHeight: number, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    getTooltipStrings(recipe: WorldGenEntry, mouseX: number, mouseY: number): Component[];
  }

}