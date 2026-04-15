declare module 'jeresources.reference' {
  class Reference {
    static readonly NAME: string;
    static readonly ID: string;
    static readonly VERSION: string;
  }


  class Resources {
  }


  class Textures {
  }

}

declare module 'jeresources.reference.Resources' {
  import { ResourceLocation } from 'net.minecraft.resources';

  class Vanilla {
    static readonly FONT: ResourceLocation;
    static readonly CHEST: ResourceLocation;
  }


  class Gui {
  }

}

declare module 'jeresources.reference.Resources.Gui' {
  import { BackgroundDrawable } from 'jeresources.jei';
  import { ResourceLocation } from 'net.minecraft.resources';

  class Jei {
    static readonly MOB: BackgroundDrawable;
    static readonly WORLD_GEN: BackgroundDrawable;
    static readonly DUNGEON: BackgroundDrawable;
    static readonly PLANT: BackgroundDrawable;
    static readonly ENCHANTMENT: BackgroundDrawable;
    static readonly VILLAGER: BackgroundDrawable;
    static readonly TABS: ResourceLocation;
  }

}

declare module 'jeresources.reference.Textures' {
  class Gui {
  }

}

declare module 'jeresources.reference.Textures.Gui' {
  class Jei {
    static readonly MOB: string;
    static readonly WORLD_GEN: string;
    static readonly DUNGEON: string;
    static readonly PLANT: string;
    static readonly ENCHANTMENT: string;
    static readonly VILLAGER: string;
    static readonly TABS: string;
  }

}