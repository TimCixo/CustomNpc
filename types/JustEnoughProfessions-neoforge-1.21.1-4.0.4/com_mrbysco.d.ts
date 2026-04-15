declare module 'com.mrbysco.justenoughprofessions.compat' {
  import { ItemStack } from 'net.minecraft.world.item';
  import { ResourceLocation } from 'net.minecraft.resources';

  class CompatibilityHelper {
    static compatibilityCheck(stack: ItemStack, profession: ResourceLocation): ItemStack;
  }

}

declare module 'com.mrbysco.justenoughprofessions' {
  import { Logger } from 'org.apache.logging.log4j';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Dist } from 'net.neoforged.api.distmarker';
  import { IModPlugin } from 'mezz.jei.api';
  import { RecipeType } from 'mezz.jei.api.recipe';
  import { IRecipeCategoryRegistration, IRecipeCatalystRegistration, IRecipeRegistration } from 'mezz.jei.api.registration';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Villager, VillagerProfession } from 'net.minecraft.world.entity.npc';

  class Constants {
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static readonly LOGGER: Logger;
    static modLoc(path: string): ResourceLocation;
  }


  class JustEnoughProfessionsNeoForge {
    constructor(dist: Dist);
  }


  interface NeoForgeProfessionPlugin extends IModPlugin {}
  class NeoForgeProfessionPlugin extends IModPlugin {
    static readonly PROFESSION_TYPE: RecipeType;
    get pluginUid(): ResourceLocation;
    registerCategories(registration: IRecipeCategoryRegistration): void;
    registerRecipeCatalysts(registration: IRecipeCatalystRegistration): void;
    registerRecipes(registration: IRecipeRegistration): void;
  }


  class RenderHelper {
    static renderVillager(guiGraphics: GuiGraphics, x: number, y: number, scale: number, yaw: number, pitch: number, villager: Villager): void;
  }


  class VillagerCache {
    static clearCache(): void;
    static getVillagerEntity(profession: VillagerProfession): Villager;
  }

}

declare module 'com.mrbysco.justenoughprofessions.jei' {
  import { IRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { IGuiHelper } from 'mezz.jei.api.helpers';
  import { RecipeType, IFocusGroup } from 'mezz.jei.api.recipe';
  import { Component } from 'net.minecraft.network.chat';
  import { IDrawable } from 'mezz.jei.api.gui.drawable';
  import { IRecipeLayoutBuilder } from 'mezz.jei.api.gui.builder';
  import { IRecipeSlotsView } from 'mezz.jei.api.gui.ingredient';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface ProfessionCategory extends IRecipeCategory<ProfessionWrapper> {}
  class ProfessionCategory extends IRecipeCategory<ProfessionWrapper> {
    constructor(guiHelper: IGuiHelper);
    draw(professionWrapper: ProfessionWrapper, recipeSlotsView: IRecipeSlotsView, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get background(): IDrawable;
    get icon(): IDrawable;
    get recipeType(): RecipeType<ProfessionWrapper>;
    get title(): Component;
    setRecipe(builder: IRecipeLayoutBuilder, recipe: ProfessionWrapper, focuses: IFocusGroup): void;
  }

}

declare module 'com.mrbysco.justenoughprofessions.platform' {
  import { IPlatformHelper } from 'com.mrbysco.justenoughprofessions.platform.services';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { EntityType } from 'net.minecraft.world.entity';
  import { VillagerProfession } from 'net.minecraft.world.entity.npc';
  import { RecipeType } from 'mezz.jei.api.recipe';
  import { ProfessionWrapper } from 'com.mrbysco.justenoughprofessions.jei';
  import { Class } from 'java.lang';

  interface NeoForgePlatformHelper extends IPlatformHelper {}
  class NeoForgePlatformHelper extends IPlatformHelper {
    get professionType(): RecipeType<ProfessionWrapper>;
    getEntityKey(entityType: EntityType<any>): ResourceLocation;
    getProfessionKey(villagerProfession: VillagerProfession): ResourceLocation;
  }


  class Services {
    static readonly PLATFORM: IPlatformHelper;
    static load<T>(clazz: Class<T>): T;
  }

}

declare module 'com.mrbysco.justenoughprofessions.platform.services' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { EntityType } from 'net.minecraft.world.entity';
  import { VillagerProfession } from 'net.minecraft.world.entity.npc';
  import { RecipeType } from 'mezz.jei.api.recipe';
  import { ProfessionWrapper } from 'com.mrbysco.justenoughprofessions.jei';

  class IPlatformHelper {
    get professionType(): RecipeType<ProfessionWrapper>;
    getEntityKey(var1: EntityType<any>): ResourceLocation;
    getProfessionKey(var1: VillagerProfession): ResourceLocation;
  }

}