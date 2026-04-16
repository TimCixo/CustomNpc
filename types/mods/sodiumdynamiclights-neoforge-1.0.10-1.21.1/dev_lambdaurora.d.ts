declare module 'dev.lambdaurora.lambdynlights.api' {
  import { Function } from 'java.util.function';
  import { Integer, Boolean } from 'java.lang';
  import { LivingEntity, EntityType, Entity } from 'net.minecraft.world.entity';
  import { Creeper } from 'net.minecraft.world.entity.monster';
  import { BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';

  class DynamicLightHandler<T = any> {
    getLuminance(var1: T): number;
    isWaterSensitive(lightSource: T): boolean;
    static makeCreeperEntityHandler<T extends Creeper>(handler: DynamicLightHandler<T>, entity: T, lightSource: T): DynamicLightHandler<T>;
    static makeHandler<T extends LivingEntity>(luminance: Function<T, number>, waterSensitive: Function<T, boolean>, lightSource: T, lightSource: T): DynamicLightHandler<T>;
    static makeLivingEntityHandler<T extends LivingEntity>(handler: DynamicLightHandler<T>): DynamicLightHandler<T>;
  }


  class DynamicLightHandlers {
    static canLightUp<T extends Entity>(entity: T): boolean;
    static canLightUp<T extends BlockEntity>(entity: T): boolean;
    static getDynamicLightHandler<T extends Entity>(type: EntityType<T>): DynamicLightHandler<T>;
    static getDynamicLightHandler<T extends BlockEntity>(type: BlockEntityType<T>): DynamicLightHandler<T>;
    static getLuminanceFrom<T extends Entity>(entity: T): number;
    static getLuminanceFrom<T extends BlockEntity>(entity: T): number;
    static registerDefaultHandlers(entity: T, entity: T, entity: T, entity: T, entity: T, entity: T, entity: T): void;
    static registerDynamicLightHandler<T extends Entity>(type: EntityType<T>, handler: DynamicLightHandler<T>): void;
    static registerDynamicLightHandler<T extends BlockEntity>(type: BlockEntityType<T>, handler: DynamicLightHandler<T>): void;
  }


  class DynamicLightsInitializer {
    onInitializeDynamicLights(): void;
  }

}

declare module 'dev.lambdaurora.lambdynlights.api.item' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { Optional } from 'java.util';
  import { JsonObject } from 'com.google.gson';
  import { ResourceManager } from 'net.minecraft.server.packs.resources';

  class ItemLightSource {
    constructor(id: ResourceLocation, item: Item, waterSensitive: boolean);

    constructor(id: ResourceLocation, item: Item);
    static fromJson(id: ResourceLocation, json: JsonObject): Optional<ItemLightSource>;
    getLuminance(stack: ItemStack, submergedInWater: boolean): number;
    getLuminance(var1: ItemStack): number;
    id(): ResourceLocation;
    item(): Item;
    toString(): string;
    waterSensitive(): boolean;
  }


  class ItemLightSourceManager {
  }


  class ItemLightSources {
    static getLuminance(stack: ItemStack, submergedInWater: boolean): number;
    static load(resourceManager: ResourceManager): void;
    static registerItemLightSource(data: ItemLightSource): void;
  }

}

declare module 'dev.lambdaurora.lambdynlights.api.item.ItemLightSource' {
  import { ItemLightSource } from 'dev.lambdaurora.lambdynlights.api.item';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  interface StaticItemLightSource extends ItemLightSource {}
  class StaticItemLightSource extends ItemLightSource {
    constructor(id: ResourceLocation, item: Item, luminance: number, waterSensitive: boolean);

    constructor(id: ResourceLocation, item: Item, luminance: number);
    getLuminance(stack: ItemStack): number;
    getLuminance(stack: ItemStack, submergedInWater: boolean): number;
  }


  interface BlockItemLightSource extends ItemLightSource {}
  class BlockItemLightSource extends ItemLightSource {
    constructor(id: ResourceLocation, item: Item, block: BlockState, waterSensitive: boolean);
    getLuminance(stack: ItemStack): number;
    getLuminance(stack: ItemStack, submergedInWater: boolean): number;
  }

}