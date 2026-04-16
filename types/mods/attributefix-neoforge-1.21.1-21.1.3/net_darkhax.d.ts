declare module 'net.darkhax.attributefix.common.impl' {
  import { Logger } from 'org.slf4j';
  import { ResourceLocation } from 'net.minecraft.resources';

  class AttributeFixMod {
    static get instance(): AttributeFixMod;
    init(): void;
  }


  class Constants {
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static readonly LOG: Logger;
    static id(path: string): ResourceLocation;
  }

}

declare module 'net.darkhax.attributefix.common.impl.config' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RangedAttribute } from 'net.minecraft.world.entity.ai.attributes';

  class RangeConfig {
    modify_range: boolean;
    min: number;
    max: number;
    constructor(id: ResourceLocation, attribute: RangedAttribute);
    apply(): void;
  }

}

declare module 'net.darkhax.attributefix.common.mixin' {
  class AccessorRangedAttribute {
    attributefix$setMaxValue(var1: number): void;
    attributefix$setMinValue(var1: number): void;
  }

}

declare module 'net.darkhax.attributefix.impl' {
  import { FMLLoadCompleteEvent } from 'net.neoforged.fml.event.lifecycle';

  class NeoForgeMod {
    static onLoadComplete(event: FMLLoadCompleteEvent): void;
  }

}