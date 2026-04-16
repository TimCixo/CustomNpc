declare module 'jeresources.api.conditionals' {
  import { Map } from 'java.util';
  import { TextModifier } from 'jeresources.api.render';
  import { Component } from 'net.minecraft.network.chat';
  import { LootDrop } from 'jeresources.api.drop';

  class Conditional {
    static readonly reverse: Map;
    static readonly magmaCream: Conditional;
    static readonly slimeBall: Conditional;
    static readonly rareDrop: Conditional;
    static readonly silkTouch: Conditional;
    static readonly equipmentDrop: Conditional;
    static readonly affectedByLooting: Conditional;
    static readonly affectedByFortune: Conditional;
    static readonly powered: Conditional;
    static readonly burning: Conditional;
    static readonly notBurning: Conditional;
    static readonly wet: Conditional;
    static readonly notWet: Conditional;
    static readonly hasPotion: Conditional;
    static readonly hasNoPotion: Conditional;
    static readonly beyond: Conditional;
    static readonly nearer: Conditional;
    static readonly raining: Conditional;
    static readonly dry: Conditional;
    static readonly thundering: Conditional;
    static readonly notThundering: Conditional;
    static readonly moonPhase: Conditional;
    static readonly notMoonPhase: Conditional;
    static readonly pastTime: Conditional;
    static readonly beforeTime: Conditional;
    static readonly pastWorldTime: Conditional;
    static readonly beforeWorldTime: Conditional;
    static readonly pastWorldDifficulty: Conditional;
    static readonly beforeWorldDifficulty: Conditional;
    static readonly gameDifficulty: Conditional;
    static readonly notGameDifficulty: Conditional;
    static readonly inDimension: Conditional;
    static readonly notInDimension: Conditional;
    static readonly inBiome: Conditional;
    static readonly notInBiome: Conditional;
    static readonly onBlock: Conditional;
    static readonly notOnBlock: Conditional;
    static readonly below: Conditional;
    static readonly above: Conditional;
    static readonly playerOnline: Conditional;
    static readonly playerOffline: Conditional;
    static readonly playerKill: Conditional;
    static readonly notPlayerKill: Conditional;
    static readonly aboveLooting: Conditional;
    static readonly belowLooting: Conditional;
    static readonly killedBy: Conditional;
    static readonly notKilledBy: Conditional;
    constructor();

    constructor(text: string, ...textModifiers: TextModifier[]);

    constructor(text: string, opposite: Conditional);
    toString(): string;
    toStringTextComponent(): Component;
  }


  interface ExtendedConditional extends Conditional {}
  class ExtendedConditional extends Conditional {
    constructor(conditional: Conditional, value: string);
    toString(): string;
  }


  class ICustomLootFunction {
    apply(var1: LootDrop): void;
  }


  class LightLevel {
    static any: LightLevel;
    static bat: LightLevel;
    static hostile: LightLevel;
    static blaze: LightLevel;
    toString(): string;
  }

}

declare module 'jeresources.api.conditionals.LightLevel' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Relative extends Enum<Relative> {}
  class Relative extends Enum<Relative> {
    static readonly above: Relative;
    static readonly below: Relative;
    toString(): string;
    static valueOf(name: string): Relative;
    static values(): Relative[];
  }

}

declare module 'jeresources.api.distributions' {
  import { OrePoint } from 'jeresources.api.distributions.DistributionHelpers';

  class DistributionBase {
    constructor(distribution: number[]);
    get bestHeight(): number;
    get distribution(): number[];
  }


  interface DistributionCustom extends DistributionBase {}
  class DistributionCustom extends DistributionBase {
    constructor(distribution: number[]);

    constructor(distribution: number[], bestHeight: number);
  }


  class DistributionHelpers {
    static readonly PI: number;
    static addDistribution(base: number[], add: number[]): number[];
    static addDistribution(base: DistributionBase, add: DistributionBase): DistributionBase;
    static addDistribution(base: number[], add: number[], offset: number): number[];
    static calculateChance(veinCount: number, veinSize: number, minY: number, maxY: number): number;
    static calculateMeanLevel(distribution: number[], mid: number, oldMid: number, difference: number): number;
    static calculateMeanLevel(distribution: number[], mid: number): number;
    static divideArray(array: number[], num: number): number[];
    static get overworldSurface(): number[];
    static getDistributionFromPoints(...points: OrePoint[]): number[];
    static getOverworldSurfaceDistribution(oreDiameter: number): number[];
    static getRampDistribution(minY: number, maxY: number, minChance: number, maxChance: number): number[];
    static getRampDistribution(minY: number, maxY: number, maxChance: number): number[];
    static getRoundedSquareDistribution(min0: number, minY: number, maxY: number, max0: number, chance: number): number[];
    static getSquareDistribution(minY: number, maxY: number, chance: number): number[];
    static getTriangularDistribution(midY: number, range: number, maxChance: number): number[];
    static getTriangularDistribution(minY: number, rand1: number, rand2: number, maxChance: number): number[];
    static getUnderwaterDistribution(chance: number): number[];
    static maxJoinArray(array1: number[], array2: number[]): number[];
    static multiplyArray(array: number[], num: number): number[];
    static reverse(array: number[]): number[];
    static sum(distribution: number[]): number;
  }


  interface DistributionSquare extends DistributionBase {}
  class DistributionSquare extends DistributionBase {
    constructor(minY: number, maxY: number, chance: number);

    constructor(min0: number, minY: number, maxY: number, max0: number, chance: number);

    constructor(veinCount: number, veinSize: number, minY: number, maxY: number);
  }


  interface DistributionTriangular extends DistributionBase {}
  class DistributionTriangular extends DistributionBase {
    constructor(midY: number, range: number, maxChance: number);

    constructor(veinCount: number, veinSize: number, midY: number, range: number);
  }


  interface DistributionUnderWater extends DistributionBase {}
  class DistributionUnderWater extends DistributionBase {
    constructor(maxChance: number);
  }

}

declare module 'jeresources.api.distributions.DistributionHelpers' {
  import { Comparable } from 'java.lang';

  interface OrePoint extends Comparable<OrePoint> {}
  class OrePoint extends Comparable<OrePoint> {
    constructor(level: number, chance: number);
    compareTo(o: OrePoint): number;
  }

}

declare module 'jeresources.api.drop' {
  import { Comparable } from 'java.lang';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { Conditional } from 'jeresources.api.conditionals';
  import { DataComponentPatch } from 'net.minecraft.core.component';
  import { LootItemFunction } from 'net.minecraft.world.level.storage.loot.functions';
  import { Collection, List } from 'java.util';
  import { LootItemCondition } from 'net.minecraft.world.level.storage.loot.predicates';
  import { Component } from 'net.minecraft.network.chat';
  import { DropKind } from 'jeresources.api.drop.PlantDrop';

  interface LootDrop extends Comparable<LootDrop> {}
  class LootDrop extends Comparable<LootDrop> {
    minDrop: number;
    maxDrop: number;
    item: ItemStack;
    smeltedItem: ItemStack;
    chance: number;
    fortuneLevel: number;
    enchanted: boolean;
    constructor(item: ItemStack);

    constructor(item: ItemStack, chance: number);

    constructor(item: ItemStack, chance: number, fortuneLevel: number);

    constructor(item: ItemStack, minDrop: number, maxDrop: number, ...conditionals: Conditional[]);

    constructor(item: ItemStack, minDrop: number, maxDrop: number, chance: number, fortuneLevel: number, ...conditionals: Conditional[]);

    constructor(item: Item, minDrop: number, maxDrop: number, ...conditionals: Conditional[]);

    constructor(item: Item, dataComponentPatch: DataComponentPatch, minDrop: number, maxDrop: number, ...conditionals: Conditional[]);

    constructor(item: Item, minDrop: number, maxDrop: number, chance: number, ...conditionals: Conditional[]);

    constructor(item: Item, dataComponentPatch: DataComponentPatch, minDrop: number, maxDrop: number, chance: number, ...conditionals: Conditional[]);

    constructor(item: ItemStack, minDrop: number, maxDrop: number, chance: number, ...conditionals: Conditional[]);

    constructor(item: Item, chance: number, ...lootFunctions: LootItemFunction[]);

    constructor(item: Item, chance: number, lootFunctions: Collection<LootItemFunction>);

    constructor(item: Item, chance: number, lootConditions: LootItemCondition[], ...lootFunctions: LootItemFunction[]);

    constructor(item: Item, chance: number, lootConditions: Collection<LootItemCondition>, ...lootFunctions: LootItemFunction[]);

    constructor(item: Item, chance: number, lootConditions: Collection<LootItemCondition>, lootFunctions: Collection<LootItemFunction>);
    addConditional(conditional: Conditional): void;
    addConditionals(conditionals: Conditional[]): void;
    addLootCondition(condition: LootItemCondition): LootDrop;
    addLootConditions(lootConditions: LootItemCondition[]): LootDrop;
    addLootConditions(lootConditions: Collection<LootItemCondition>): LootDrop;
    addLootFunction(lootFunction: LootItemFunction): LootDrop;
    addLootFunctions(lootFunctions: LootItemFunction[]): LootDrop;
    addLootFunctions(lootFunctions: Collection<LootItemFunction>): LootDrop;
    canBeCooked(): boolean;
    chanceString(): string;
    compareTo(o: LootDrop): number;
    formatChance(): string;
    get drops(): ItemStack[];
    get sortIndex(): number;
    get tooltipText(): Component[];
    getTooltipText(smelted: boolean): Component[];
    isAffectedBy(conditional: Conditional): boolean;
    toString(): string;
    toStringTextComponent(): Component;
  }


  class PlantDrop {
    constructor(drop: ItemStack, itemWeight: number);

    constructor(drop: ItemStack, chance: number);

    constructor(drop: ItemStack, minDrop: number, maxDrop: number);
    get chance(): number;
    get drop(): ItemStack;
    get dropKind(): DropKind;
    get maxDrop(): number;
    get minDrop(): number;
    get weight(): number;
  }

}

declare module 'jeresources.api.drop.PlantDrop' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface DropKind extends Enum<DropKind> {}
  class DropKind extends Enum<DropKind> {
    static readonly chance: DropKind;
    static readonly weight: DropKind;
    static readonly minMax: DropKind;
    static valueOf(name: string): DropKind;
    static values(): DropKind[];
  }

}

declare module 'jeresources.api' {
  import { ResourceKey } from 'net.minecraft.resources';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';
  import { Level } from 'net.minecraft.world.level';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { LightLevel } from 'jeresources.api.conditionals';
  import { LootDrop, PlantDrop } from 'jeresources.api.drop';
  import { Class } from 'java.lang';
  import { IScissorHook, IMobRenderHook } from 'jeresources.api.render';
  import { ItemStack } from 'net.minecraft.world.item';
  import { BushBlock } from 'net.minecraft.world.level.block';
  import { Property } from 'net.minecraft.world.level.block.state.properties';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { DistributionBase } from 'jeresources.api.distributions';
  import { Restriction } from 'jeresources.api.restrictions';

  class IDungeonRegistry {
    registerCategory(var1: string, var2: string): void;
    registerChest(var1: string, var2: ResourceKey<LootTable>): void;
    registerChest(var1: string, var2: LootTable): void;
  }


  class IJERAPI {
    get dungeonRegistry(): IDungeonRegistry;
    get level(): Level;
    get mobRegistry(): IMobRegistry;
    get plantRegistry(): IPlantRegistry;
    get worldGenRegistry(): IWorldGenRegistry;
  }


  class IJERPlugin {
    static readonly entry_point: string;
    receive(var1: IJERAPI): void;
  }


  class IMobRegistry {
    register(var1: LivingEntity, var2: LightLevel, var3: number, var4: number, var5: string[], var6: ResourceKey<LootTable>): void;
    register(var1: LivingEntity, var2: LightLevel, var3: number, var4: number, var5: ResourceKey<LootTable>): void;
    register(var1: LivingEntity, var2: LightLevel, var3: number, var4: string[], var5: ResourceKey<LootTable>): void;
    register(var1: LivingEntity, var2: LightLevel, var3: number, var4: ResourceKey<LootTable>): void;
    register(var1: LivingEntity, var2: LightLevel, var3: string[], var4: ResourceKey<LootTable>): void;
    register(var1: LivingEntity, var2: LightLevel, var3: ResourceKey<LootTable>): void;
    register(var1: LivingEntity, var2: ResourceKey<LootTable>): void;
    register(var1: LivingEntity, var2: LightLevel, var3: number, var4: number, var5: string[], ...var6: LootDrop[]): void;
    register(var1: LivingEntity, var2: LightLevel, var3: number, var4: number, ...var5: LootDrop[]): void;
    register(var1: LivingEntity, var2: LightLevel, var3: number, var4: string[], ...var5: LootDrop[]): void;
    register(var1: LivingEntity, var2: LightLevel, var3: number, ...var4: LootDrop[]): void;
    register(var1: LivingEntity, var2: LightLevel, var3: string[], ...var4: LootDrop[]): void;
    register(var1: LivingEntity, var2: LightLevel, ...var3: LootDrop[]): void;
    register(var1: LivingEntity, ...var2: LootDrop[]): void;
    registerRenderHook(var1: Class<LivingEntity>, var2: IMobRenderHook): void;
    registerScissorHook(var1: Class, var2: IScissorHook): void;
  }


  class IPlantRegistry {
    register(var1: ItemStack, var2: BushBlock, var3: Property<any>, ...var4: PlantDrop[]): void;
    register(var1: ItemStack, var2: BlockState, var3: Property<any>, ...var4: PlantDrop[]): void;
    register(var1: ItemStack, var2: BushBlock, ...var3: PlantDrop[]): void;
    register(var1: ItemStack, var2: BlockState, ...var3: PlantDrop[]): void;
    register(var1: ItemStack, var2: Property<any>, ...var3: PlantDrop[]): void;
    register(var1: ItemStack, ...var2: PlantDrop[]): void;
    register<T extends BushBlock>(var1: T, var2: Property<any>, ...var3: PlantDrop[]): void;
    register<T extends BushBlock>(var1: T, ...var2: PlantDrop[]): void;
    registerDrops(var1: ItemStack, ...var2: PlantDrop[]): void;
    registerWithSoil(var1: ItemStack, var2: BushBlock, var3: Property<any>, var4: BlockState, ...var5: PlantDrop[]): void;
    registerWithSoil(var1: ItemStack, var2: BlockState, var3: Property<any>, var4: BlockState, ...var5: PlantDrop[]): void;
    registerWithSoil(var1: ItemStack, var2: BushBlock, var3: BlockState, ...var4: PlantDrop[]): void;
    registerWithSoil(var1: ItemStack, var2: BlockState, var3: BlockState, ...var4: PlantDrop[]): void;
    registerWithSoil(var1: ItemStack, var2: Property<any>, var3: BlockState, ...var4: PlantDrop[]): void;
    registerWithSoil(var1: ItemStack, var2: BlockState, ...var3: PlantDrop[]): void;
    registerWithSoil<T extends BushBlock>(var1: T, var2: Property<any>, var3: BlockState, ...var4: PlantDrop[]): void;
    registerWithSoil<T extends BushBlock>(var1: T, var2: BlockState, ...var3: PlantDrop[]): void;
  }


  class IWorldGenRegistry {
    register(var1: ItemStack, var2: ItemStack, var3: DistributionBase, var4: Restriction, var5: boolean, ...var6: LootDrop[]): void;
    register(var1: ItemStack, var2: DistributionBase, var3: Restriction, var4: boolean, ...var5: LootDrop[]): void;
    register(var1: ItemStack, var2: ItemStack, var3: DistributionBase, var4: Restriction, ...var5: LootDrop[]): void;
    register(var1: ItemStack, var2: DistributionBase, var3: Restriction, ...var4: LootDrop[]): void;
    register(var1: ItemStack, var2: ItemStack, var3: DistributionBase, var4: boolean, ...var5: LootDrop[]): void;
    register(var1: ItemStack, var2: DistributionBase, var3: boolean, ...var4: LootDrop[]): void;
    register(var1: ItemStack, var2: ItemStack, var3: DistributionBase, ...var4: LootDrop[]): void;
    register(var1: ItemStack, var2: DistributionBase, ...var3: LootDrop[]): void;
    registerDrops(var1: ItemStack, ...var2: LootDrop[]): void;
  }

}

declare module 'jeresources.api.render' {
  import { RenderInfo } from 'jeresources.api.render.IMobRenderHook';
  import { ScissorInfo } from 'jeresources.api.render.IScissorHook';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class ColorHelper {
    static readonly BLACK: number;
    static readonly BLUE: number;
    static readonly CYAN: number;
    static readonly DRKGRAY: number;
    static readonly GRAY: number;
    static readonly GREEN: number;
    static readonly LTGRAY: number;
    static readonly MAGENTA: number;
    static readonly RED: number;
    static readonly TRANSPARENT: number;
    static readonly WHITE: number;
    static readonly YELLOW: number;
    static getAlpha(color: number): number;
    static getBlue(color: number): number;
    static getGreen(color: number): number;
    static getRed(color: number): number;
    static setColor3f(color: number): void;
    static setColor4f(color: number): void;
  }


  class IMobRenderHook<T extends LivingEntity = any> {
    transform(var1: RenderInfo, var2: T): RenderInfo;
  }


  class IScissorHook {
    transformScissor(var1: ScissorInfo): ScissorInfo;
  }


  interface TextModifier extends Enum<TextModifier> {}
  class TextModifier extends Enum<TextModifier> {
    static readonly black: TextModifier;
    static readonly darkBlue: TextModifier;
    static readonly darkGreen: TextModifier;
    static readonly darkCyan: TextModifier;
    static readonly darkRed: TextModifier;
    static readonly purple: TextModifier;
    static readonly orange: TextModifier;
    static readonly lightGrey: TextModifier;
    static readonly darkGrey: TextModifier;
    static readonly lilac: TextModifier;
    static readonly lightGreen: TextModifier;
    static readonly lightCyan: TextModifier;
    static readonly lightRed: TextModifier;
    static readonly pink: TextModifier;
    static readonly yellow: TextModifier;
    static readonly white: TextModifier;
    static readonly obfuscated: TextModifier;
    static readonly bold: TextModifier;
    static readonly strikethrough: TextModifier;
    static readonly underline: TextModifier;
    static readonly italic: TextModifier;
    static readonly reset: TextModifier;
    toString(): string;
    static valueOf(name: string): TextModifier;
    static values(): TextModifier[];
  }

}

declare module 'jeresources.api.render.IMobRenderHook' {
  class RenderInfo {
    x: number;
    y: number;
    scale: number;
    yaw: number;
    pitch: number;
    constructor(x: number, y: number, scale: number, yaw: number, pitch: number);
  }

}

declare module 'jeresources.api.render.IScissorHook' {
  class ScissorInfo {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x: number, y: number, width: number, height: number);
  }

}

declare module 'jeresources.api.restrictions' {
  import { ResourceKey } from 'net.minecraft.resources';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { Type } from 'jeresources.api.restrictions.Restriction';
  import { List } from 'java.util';
  import { Level } from 'net.minecraft.world.level';

  class BiomeRestriction {
    static readonly NO_RESTRICTION: BiomeRestriction;
    static readonly TAIGA: BiomeRestriction;
    static readonly JUNGLE: BiomeRestriction;
    static readonly PLAINS: BiomeRestriction;
    static readonly SAVANNA: BiomeRestriction;
    static readonly ICE_SPIKES: BiomeRestriction;
    static readonly THE_END: BiomeRestriction;
    static readonly BEACH: BiomeRestriction;
    static readonly FOREST: BiomeRestriction;
    static readonly OCEAN: BiomeRestriction;
    static readonly DESERT: BiomeRestriction;
    static readonly RIVER: BiomeRestriction;
    static readonly SWAMP: BiomeRestriction;
    static readonly MUSHROOM_FIELDS: BiomeRestriction;
    static readonly NETHER_WASTES: BiomeRestriction;
    static readonly DRIPSTONE_CAVES: BiomeRestriction;
    static readonly BADLANDS: BiomeRestriction;
    constructor();

    constructor(biome: ResourceKey<Biome>);

    constructor(biome: Biome);

    constructor(restrictionType: Type, biome: Biome);

    constructor(biome: Biome, ...moreBiomes: Biome[]);

    constructor(restrictionType: Type, biome: Biome, ...moreBiomes: Biome[]);

    constructor(biomeCategory: ResourceKey<Biome>, ...biomeCategories: ResourceKey<Biome>[]);

    constructor(restrictionType: Type, biomeCategory: ResourceKey<Biome>, ...biomeCategories: ResourceKey<Biome>[]);
    equals(obj: any): boolean;
    hashCode(): number;
    isMergeAble(other: BiomeRestriction): boolean;
    toString(): string;
    toStringList(): string[];
  }


  class DimensionRestriction {
    static readonly OVERWORLD: DimensionRestriction;
    static readonly NETHER: DimensionRestriction;
    static readonly END: DimensionRestriction;
    static readonly NONE: DimensionRestriction;
    constructor(type: ResourceKey<Level>);

    constructor(type: Type, dimension: ResourceKey<Level>);
    equals(obj: any): boolean;
    get dimensionName(): string;
    hashCode(): number;
    toString(): string;
  }


  class Restriction {
    static readonly OVERWORLD: Restriction;
    static readonly NETHER: Restriction;
    static readonly END: Restriction;
    static readonly NONE: Restriction;
    constructor(biomeRestriction: BiomeRestriction);

    constructor(dimensionRestriction: DimensionRestriction);

    constructor(biomeRestriction: BiomeRestriction, dimensionRestriction: DimensionRestriction);
    equals(obj: any): boolean;
    get biomeRestrictions(): string[];
    get dimensionRestriction(): string;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'jeresources.api.restrictions.Restriction' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Type extends Enum<Type> {}
  class Type extends Enum<Type> {
    static readonly NONE: Type;
    static readonly BLACKLIST: Type;
    static readonly WHITELIST: Type;
    static valueOf(name: string): Type;
    static values(): Type[];
  }

}

declare module 'jeresources.api.util' {
  import { List } from 'java.util';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { ResourceKey } from 'net.minecraft.resources';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { DataComponentPatch } from 'net.minecraft.core.component';
  import { LootItemCondition } from 'net.minecraft.world.level.storage.loot.predicates';
  import { LootDrop } from 'jeresources.api.drop';
  import { LootContext } from 'net.minecraft.world.level.storage.loot';
  import { LootItemFunction } from 'net.minecraft.world.level.storage.loot.functions';
  import { NumberProvider } from 'net.minecraft.world.level.storage.loot.providers.number';

  class BiomeHelper {
    static get allBiomes(): Biome[];
    static getBiome(key: ResourceKey<Biome>): Biome;
    static getBiomes(category: ResourceKey<Biome>): Biome[];
  }


  class ItemHelper {
    static copyStackWithSize(itemStack: ItemStack, size: number): ItemStack;
    static itemStackWithDataComponents(item: Item, size: number, dataComponentPatch: DataComponentPatch): ItemStack;
  }


  class LootConditionHelper {
    static applyCondition(condition: LootItemCondition, lootDrop: LootDrop): void;
  }


  class LootFunctionHelper {
    static readonly randContext: LootContext;
    static applyFunction(lootFunction: LootItemFunction, lootDrop: LootDrop): void;
    static getMax(randomRange: NumberProvider): number;
    static getMin(randomRange: NumberProvider): number;
  }

}

declare module 'jeresources.api.util.LootFunctionHelper' {
  import { LootContext } from 'net.minecraft.world.level.storage.loot';

  interface RandomLootContext extends LootContext {}
  class RandomLootContext extends LootContext {
    constructor();
  }

}