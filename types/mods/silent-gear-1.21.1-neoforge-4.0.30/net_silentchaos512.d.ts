declare module 'net.silentchaos512.gear.advancements.criterion' {
  import { SimpleCriterionTrigger } from 'net.minecraft.advancements.critereon';
  import { Instance } from 'net.silentchaos512.gear.advancements.criterion.GearPropertyTrigger';
  import { Codec } from 'com.mojang.serialization';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { GearProperty } from 'net.silentchaos512.gear.api.property';
  import { Instance as net_silentchaos512_gear_advancements_criterion_gearrepairedtrigger_Instance } from 'net.silentchaos512.gear.advancements.criterion.GearRepairedTrigger';
  import { Instance as net_silentchaos512_gear_advancements_criterion_hasparttrigger_Instance } from 'net.silentchaos512.gear.advancements.criterion.HasPartTrigger';
  import { ItemStack } from 'net.minecraft.world.item';

  interface GearPropertyTrigger extends SimpleCriterionTrigger<Instance> {}
  class GearPropertyTrigger extends SimpleCriterionTrigger<Instance> {
    codec(): Codec<Instance>;
    trigger(player: ServerPlayer, stat: GearProperty<any, any>, value: number): void;
  }


  interface GearRepairedTrigger extends SimpleCriterionTrigger<net_silentchaos512_gear_advancements_criterion_gearrepairedtrigger_Instance> {}
  class GearRepairedTrigger extends SimpleCriterionTrigger<net_silentchaos512_gear_advancements_criterion_gearrepairedtrigger_Instance> {
    codec(): Codec<net_silentchaos512_gear_advancements_criterion_gearrepairedtrigger_Instance>;
    trigger(player: ServerPlayer, brokenCount: number, repairedCount: number): void;
  }


  interface HasPartTrigger extends SimpleCriterionTrigger<net_silentchaos512_gear_advancements_criterion_hasparttrigger_Instance> {}
  class HasPartTrigger extends SimpleCriterionTrigger<net_silentchaos512_gear_advancements_criterion_hasparttrigger_Instance> {
    codec(): Codec<net_silentchaos512_gear_advancements_criterion_hasparttrigger_Instance>;
    trigger(player: ServerPlayer, gear: ItemStack): void;
  }

}

declare module 'net.silentchaos512.gear.api.data.material' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { MaterialFactory } from 'net.silentchaos512.gear.api.data.material.MaterialBuilder';
  import { SimpleMaterial, CustomCompoundMaterial, ProcessedMaterial } from 'net.silentchaos512.gear.gear.material';
  import { DataResource, PartGearKey } from 'net.silentchaos512.gear.api.util';
  import { Material, IMaterialCategory, MaterialCraftingData, TextureType, MaterialDisplayData } from 'net.silentchaos512.gear.api.material';
  import { BuiltinMaterials } from 'net.silentchaos512.gear.core';
  import { ItemLike } from 'net.minecraft.world.level';
  import { TagKey } from 'net.minecraft.tags';
  import { Item } from 'net.minecraft.world.item';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { Component } from 'net.minecraft.network.chat';
  import { Supplier } from 'java.util.function';
  import { PartType } from 'net.silentchaos512.gear.api.part';
  import { GearPropertyValue, GearProperty, NumberProperty, HarvestTier } from 'net.silentchaos512.gear.api.property';
  import { Operation } from 'net.silentchaos512.gear.api.property.NumberProperty';
  import { Trait } from 'net.silentchaos512.gear.gear.trait';
  import { ITraitCondition } from 'net.silentchaos512.gear.api.traits';
  import { JsonObject } from 'com.google.gson';
  import { DataProvider, DataGenerator, CachedOutput } from 'net.minecraft.data';
  import { CompletableFuture } from 'java.util.concurrent';

  class MaterialBuilder<M extends Material = any> {
    constructor(id: ResourceLocation, factory: MaterialFactory<M>);
    static builtin(material: BuiltinMaterials): MaterialBuilder<SimpleMaterial>;
    crafting(craftingItem: ItemLike, ...categories: IMaterialCategory[]): MaterialBuilder<M>;
    crafting(craftingItem: TagKey<Item>, ...categories: IMaterialCategory[]): MaterialBuilder<M>;
    crafting(ingredient: Ingredient, ...categories: IMaterialCategory[]): MaterialBuilder<M>;
    crafting(crafting: MaterialCraftingData): MaterialBuilder<M>;
    craftingWithCommonRod(craftingItem: TagKey<Item>, ...categories: IMaterialCategory[]): MaterialBuilder<M>;
    static customCompound(material: DataResource<Material>): MaterialBuilder<CustomCompoundMaterial>;
    display(name: Component, color: number): MaterialBuilder<M>;
    display(name: Component, namePrefix: Component, color: number): MaterialBuilder<M>;
    display(name: Component, color: number, textureType: TextureType): MaterialBuilder<M>;
    display(name: Component, namePrefix: Component, color: number, textureType: TextureType): MaterialBuilder<M>;
    display(display: MaterialDisplayData): MaterialBuilder<M>;
    displayWithDefaultName(color: number): MaterialBuilder<M>;
    displayWithDefaultName(color: number, textureType: TextureType): MaterialBuilder<M>;
    displayWithDefaultName(namePrefix: Component, color: number, textureType: TextureType): MaterialBuilder<M>;
    get id(): ResourceLocation;
    harvestTierBuiltin(partType: Supplier<PartType>): MaterialBuilder<M>;
    mainStatsArmor(armor: number, toughness: number, magicArmor: number): MaterialBuilder<M>;
    mainStatsArmor(head: number, chest: number, legs: number, feet: number, toughness: number, magicArmor: number): MaterialBuilder<M>;
    mainStatsCommon(toolDurability: number, armorDurability: number, enchantmentValue: number, rarity: number): MaterialBuilder<M>;
    mainStatsCommon(toolDurability: number, armorDurability: number, enchantmentValue: number, rarity: number, chargeValue: number): MaterialBuilder<M>;
    mainStatsHarvest(harvestTier: HarvestTier, harvestSpeed: number): MaterialBuilder<M>;
    mainStatsHarvest(harvestSpeed: number): MaterialBuilder<M>;
    mainStatsMelee(attackDamage: number, magicDamage: number, attackSpeed: number): MaterialBuilder<M>;
    mainStatsProjectile(projectileSpeed: number, projectileAccuracy: number): MaterialBuilder<M>;
    mainStatsRanged(rangedDamage: number, rangedSpeed: number): MaterialBuilder<M>;
    mainStatsRanged(rangedDamage: number, rangedSpeed: number, projectileSpeed: number, projectileAccuracy: number): MaterialBuilder<M>;
    noProperties(partType: Supplier<PartType>): MaterialBuilder<M>;
    parent(parent: DataResource<Material>): MaterialBuilder<M>;
    static processed(material: DataResource<Material>): MaterialBuilder<ProcessedMaterial>;
    serialize(): JsonObject;
    static simple(material: DataResource<Material>): MaterialBuilder<SimpleMaterial>;
    stat<T, V extends GearPropertyValue<T>, P extends GearProperty<T, V>>(partType: Supplier<PartType>, property: Supplier<P>, value: V): MaterialBuilder<M>;
    stat<T, V extends GearPropertyValue<T>, P extends GearProperty<T, V>>(key: PartGearKey, property: Supplier<P>, value: V): MaterialBuilder<M>;
    stat<T, V extends GearPropertyValue<T>, P extends GearProperty<T, V>>(partType: Supplier<PartType>, property: Supplier<P>, value: T): MaterialBuilder<M>;
    stat(partType: Supplier<PartType>, property: Supplier<NumberProperty>, value: number): MaterialBuilder<M>;
    stat(partType: Supplier<PartType>, property: Supplier<NumberProperty>, value: number, operation: Operation): MaterialBuilder<M>;
    stat(key: PartGearKey, property: Supplier<NumberProperty>, value: number): MaterialBuilder<M>;
    stat(key: PartGearKey, property: Supplier<NumberProperty>, value: number, operation: Operation): MaterialBuilder<M>;
    trait(partType: Supplier<PartType>, trait: DataResource<Trait>, level: number, ...conditions: ITraitCondition[]): MaterialBuilder<M>;
  }


  interface MaterialsProviderBase extends DataProvider {}
  class MaterialsProviderBase extends DataProvider {
    constructor(generator: DataGenerator, modId: string);
    get name(): string;
    run(cache: CachedOutput): CompletableFuture<any>;
  }

}

declare module 'net.silentchaos512.gear.api.data.material.MaterialBuilder' {
  import { DataResource } from 'net.silentchaos512.gear.api.util';
  import { Material, MaterialCraftingData, MaterialDisplayData } from 'net.silentchaos512.gear.api.material';
  import { Map } from 'java.util';
  import { PartType } from 'net.silentchaos512.gear.api.part';
  import { GearPropertyMap } from 'net.silentchaos512.gear.api.property';

  class MaterialFactory<M extends Material = any> {
    create(var1: DataResource<Material>, var2: MaterialCraftingData, var3: MaterialDisplayData, var4: Map<PartType, GearPropertyMap>): M;
  }

}

declare module 'net.silentchaos512.gear.api.data.part' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Supplier } from 'java.util.function';
  import { GearType, GearTypeMatcher } from 'net.silentchaos512.gear.api.item';
  import { PartType, PartCraftingData, PartDisplayData } from 'net.silentchaos512.gear.api.part';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { TagKey } from 'net.minecraft.tags';
  import { Item } from 'net.minecraft.world.item';
  import { ItemLike } from 'net.minecraft.world.level';
  import { Component } from 'net.minecraft.network.chat';
  import { PropertyKey } from 'net.silentchaos512.gear.api.util';
  import { GearPropertyValue, GearProperty, NumberProperty } from 'net.silentchaos512.gear.api.property';
  import { Operation } from 'net.silentchaos512.gear.api.property.NumberProperty';
  import { List } from 'java.util';
  import { TraitInstance } from 'net.silentchaos512.gear.api.traits';
  import { JsonElement } from 'com.google.gson';
  import { DataProvider, DataGenerator, CachedOutput } from 'net.minecraft.data';
  import { CompletableFuture } from 'java.util.concurrent';

  class PartBuilder {
    constructor(id: ResourceLocation, gearType: Supplier<GearType>, partType: Supplier<PartType>);
    crafting(crafting: PartCraftingData): PartBuilder;
    crafting(ingredient: Ingredient): PartBuilder;
    crafting(tag: TagKey<Item>): PartBuilder;
    crafting(item: ItemLike): PartBuilder;
    display(display: PartDisplayData): PartBuilder;
    display(name: Component): PartBuilder;
    get gearType(): GearType;
    get id(): ResourceLocation;
    numberProperty(property: Supplier<NumberProperty>, value: number): PartBuilder;
    numberProperty(property: Supplier<NumberProperty>, value: number, operation: Operation): PartBuilder;
    numberProperty(property: Supplier<NumberProperty>, gearType: Supplier<GearType>, value: number, operation: Operation): PartBuilder;
    property<T, V extends GearPropertyValue<T>>(key: PropertyKey<T, V>, value: V): PartBuilder;
    property<T, V extends GearPropertyValue<T>, P extends GearProperty<T, V>>(property: Supplier<P>, value: V): PartBuilder;
    serialize(): JsonElement;
    traits(traits: TraitInstance[]): PartBuilder;
  }


  interface PartsProviderBase extends DataProvider {}
  class PartsProviderBase extends DataProvider {
    constructor(generator: DataGenerator, modId: string);
    get name(): string;
    run(cache: CachedOutput): CompletableFuture<any>;
  }


  interface UpgradePartBuilder extends PartBuilder {}
  class UpgradePartBuilder extends PartBuilder {
    constructor(id: ResourceLocation, gearType: Supplier<GearType>, partType: Supplier<PartType>);
    serialize(): JsonElement;
    upgradeGearTypes(matcher: GearTypeMatcher): UpgradePartBuilder;
  }

}

declare module 'net.silentchaos512.gear.api.data.trait' {
  import { DataResource } from 'net.silentchaos512.gear.api.util';
  import { Trait } from 'net.silentchaos512.gear.gear.trait';
  import { TraitEffect, ITraitCondition } from 'net.silentchaos512.gear.api.traits';
  import { Component } from 'net.minecraft.network.chat';
  import { Supplier } from 'java.util.function';
  import { GearType } from 'net.silentchaos512.gear.api.item';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { JsonObject } from 'com.google.gson';
  import { DataProvider, DataGenerator, CachedOutput } from 'net.minecraft.data';
  import { Collection } from 'java.util';
  import { CompletableFuture } from 'java.util.concurrent';

  class TraitBuilder {
    constructor(trait: DataResource<Trait>, maxLevel: number);
    cancelsWith(trait: DataResource<Trait>): TraitBuilder;
    cancelsWith(trait: ResourceLocation): TraitBuilder;
    effects(first: TraitEffect, ...rest: TraitEffect[]): TraitBuilder;
    extraWikiLines(...lines: string[]): TraitBuilder;
    extraWikiLines(...lines: Component[]): TraitBuilder;
    get trait(): DataResource<Trait>;
    static of(trait: DataResource<Trait>, maxLevel: number): TraitBuilder;
    overridesTrait(trait: DataResource<Trait>): TraitBuilder;
    overridesTrait(trait: ResourceLocation): TraitBuilder;
    serialize(): JsonObject;
    setDescription(text: Component): TraitBuilder;
    setName(text: Component): TraitBuilder;
    withConditions(...conditions: ITraitCondition[]): TraitBuilder;
    withGearTypeCondition(first: Supplier<GearType>, ...rest: Supplier<GearType>[]): TraitBuilder;
  }


  interface TraitsProviderBase extends DataProvider {}
  class TraitsProviderBase extends DataProvider {
    constructor(generator: DataGenerator, modId: string);
    get name(): string;
    get traits(): Collection<TraitBuilder>;
    run(cache: CachedOutput): CompletableFuture<any>;
  }

}

declare module 'net.silentchaos512.gear.api.event' {
  import { Event } from 'net.neoforged.bus.api';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Collection, List, Map } from 'java.util';
  import { PartInstance } from 'net.silentchaos512.gear.gear.part';
  import { PartList, PartType } from 'net.silentchaos512.gear.api.part';
  import { Component } from 'net.minecraft.network.chat';
  import { MaterialInstance } from 'net.silentchaos512.gear.gear.material';
  import { GearProperty, GearPropertyValue } from 'net.silentchaos512.gear.api.property';
  import { PropertyKey } from 'net.silentchaos512.gear.api.util';
  import { Trait } from 'net.silentchaos512.gear.gear.trait';
  import { Integer } from 'java.lang';

  interface GearItemEvent extends Event {}
  class GearItemEvent extends Event {
    constructor(gear: ItemStack, parts: Collection<PartInstance>);
    get gear(): ItemStack;
    get parts(): PartList;
  }


  interface GearNamePrefixesEvent extends GearItemEvent {}
  class GearNamePrefixesEvent extends GearItemEvent {
    constructor(gear: ItemStack, parts: Collection<PartInstance>);
    get prefixes(): Collection<Component>;
  }


  interface GetMaterialPropertiesEvent extends Event {}
  class GetMaterialPropertiesEvent extends Event {
    constructor(material: MaterialInstance, partType: PartType, property: GearProperty<any, any>, modifiers: Collection<GearPropertyValue<any>>);
    get material(): MaterialInstance;
    get modifiers(): GearPropertyValue<any>[];
    get partType(): PartType;
    get property(): GearProperty<any, any>;
  }


  interface GetPropertyModifiersEvent<T = any, V extends GearPropertyValue<T> = any> extends Event {}
  class GetPropertyModifiersEvent<T = any, V extends GearPropertyValue<T> = any> extends Event {
    constructor(part: PartInstance, property: PropertyKey<T, V>, modifiers: V[]);
    get modifiers(): V[];
    get part(): PartInstance;
    get propertyKey(): PropertyKey<T, V>;
  }


  interface GetTraitsEvent extends GearItemEvent {}
  class GetTraitsEvent extends GearItemEvent {
    constructor(gear: ItemStack, parts: PartList, traits: Map<Trait, number>);
    get traits(): Map<Trait, number>;
  }

}

declare module 'net.silentchaos512.gear.api.item' {
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Level, ItemLike } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { PartInstance } from 'net.silentchaos512.gear.gear.part';
  import { ItemColor } from 'net.minecraft.client.color.item';
  import { TagKey } from 'net.minecraft.tags';
  import { Block } from 'net.minecraft.world.level.block';
  import { GearPropertiesData } from 'net.silentchaos512.gear.core.component';
  import { Tool } from 'net.minecraft.world.item.component';
  import { Supplier, Predicate } from 'java.util.function';
  import { Collection, List } from 'java.util';
  import { PartType } from 'net.silentchaos512.gear.api.part';
  import { NumberProperty } from 'net.silentchaos512.gear.api.property';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { Codec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';

  class BreakEventHandler {
    onBlockBreakEvent(var1: ItemStack, var2: Player, var3: Level, var4: BlockPos, var5: BlockState): void;
  }


  interface GearArmor extends GearItem {}
  class GearArmor extends GearItem {
    get itemColors(): ItemColor;
    supportsPart(gear: ItemStack, part: PartInstance): boolean;
  }


  interface GearDiggerTool extends GearTool {}
  class GearDiggerTool extends GearTool {
    createToolProperties(properties: GearPropertiesData): Tool;
    getToolBlockSet(var1: GearPropertiesData): TagKey<Block>;
    getToolBlockSet(stack: ItemStack): TagKey<Block>;
  }


  interface GearItem extends ItemLike {}
  class GearItem extends ItemLike {
    static readonly REQUIRED_PARTS: Supplier;
    asItem(): Item;
    construct(parts: Collection<PartInstance>): ItemStack;
    get durabilityStat(): Supplier<NumberProperty>;
    get gearType(): GearType;
    get itemColors(): ItemColor;
    get requiredParts(): Collection<PartType>;
    getRepairModifier(stack: ItemStack): number;
    isValidSlot(slot: string): boolean;
    requiresPartOfType(type: PartType): boolean;
    supportsPart(gear: ItemStack, part: PartInstance): boolean;
  }


  interface GearRangedWeapon extends GearTool {}
  class GearRangedWeapon extends GearTool {
    static readonly REQUIRED_PARTS: Supplier;
    get itemColors(): ItemColor;
    get requiredParts(): Collection<PartType>;
    getBaseDrawDelay(stack: ItemStack): number;
    getDrawDelay(stack: ItemStack): number;
  }


  interface GearTool extends GearItem {}
  class GearTool extends GearItem {
    static readonly REQUIRED_PARTS: Supplier;
    createToolProperties(properties: GearPropertiesData): Tool;
    get requiredParts(): Collection<PartType>;
    getDamageOnBlockBreak(gear: ItemStack, world: Level, state: BlockState, pos: BlockPos): number;
    getDamageOnHitEntity(gear: ItemStack, target: LivingEntity, attacker: LivingEntity): number;
    isValidSlot(slot: string): boolean;
  }


  interface GearTypeMatcher extends Predicate<GearType> {}
  class GearTypeMatcher extends Predicate<GearType> {
    static readonly ALL: GearTypeMatcher;
    static readonly CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(matchParents: boolean, ...typesIn: GearType[]);

    constructor(matchParents: boolean, typesIn: GearType[]);
    test(gearType: GearType): boolean;
  }


  interface GearWeapon extends GearTool {}
  class GearWeapon extends GearTool {
    getDamageOnHitEntity(gear: ItemStack, target: LivingEntity, attacker: LivingEntity): number;
  }


  class ISlingshotAmmo {
    isAmmo(stack: ItemStack): boolean;
  }

}

declare module 'net.silentchaos512.gear.api.item.GearType' {
  import { Supplier } from 'java.util.function';
  import { GearType } from 'net.silentchaos512.gear.api.item';
  import { NumberProperty, GearPropertyGroup } from 'net.silentchaos512.gear.api.property';
  import { ItemAbility } from 'net.neoforged.neoforge.common';
  import { Set, Collection } from 'java.util';

  class Builder {
    animationFrames(animationFrames: number): Builder;
    armorDurabilityMultiplier(amount: number): Builder;
    build(): GearType;
    durabilityStat(durabilityStat: Supplier<NumberProperty>): Builder;
    static of(): Builder;
    static of(parent: Supplier<GearType>): Builder;
    relevantPropertyGroups(...propertyGroups: GearPropertyGroup[]): Builder;
    relevantPropertyGroups(propertyGroups: Collection<GearPropertyGroup>): Builder;
    toolActions(...actions: ItemAbility[]): Builder;
    toolActions(actions: Set<ItemAbility>): Builder;
  }

}

declare module 'net.silentchaos512.gear.api.material' {
  import { Component } from 'net.minecraft.network.chat';
  import { GearComponent, PropertyKey } from 'net.silentchaos512.gear.api.util';
  import { MaterialInstance } from 'net.silentchaos512.gear.gear.material';
  import { Optional, Collection, Set, List } from 'java.util';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { PartType } from 'net.silentchaos512.gear.api.part';
  import { GearType } from 'net.silentchaos512.gear.api.item';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Serializer } from 'net.silentchaos512.gear.util';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Enum } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';

  class IMaterialCategory {
    get displayName(): Component;
    get name(): string;
    matches(other: IMaterialCategory): boolean;
  }


  interface Material extends GearComponent<MaterialInstance> {}
  class Material extends GearComponent<MaterialInstance> {
    canRepair(partMaterial: MaterialInstance): boolean;
    canSalvage(): boolean;
    get categories(): Collection<IMaterialCategory>;
    get parent(): Material;
    get parentOptional(): Optional<Material>;
    get serializer(): MaterialSerializer<any>;
    getBaseMaterialName(material: MaterialInstance, partType: PartType): Component;
    getCategories(var1: MaterialInstance): Collection<IMaterialCategory>;
    getColor(var1: MaterialInstance, var2: PartType, var3: GearType): number;
    getDisplayItem(type: PartType, ticks: number): ItemStack;
    getDisplayNamePrefix(var1: PartType): Component;
    getMainTextureType(var1: MaterialInstance): TextureType;
    getModelKey(material: MaterialInstance): string;
    getNameColor(var1: MaterialInstance, var2: PartType, var3: GearType): number;
    getPartSubstitute(var1: PartType): Optional<Ingredient>;
    getPartTypes(var1: MaterialInstance): Set<PartType>;
    getPropertyKeys(var1: MaterialInstance, var2: PartType): Collection<PropertyKey<any, any>>;
    hasPartSubstitutes(): boolean;
    isAllowedInPart(var1: MaterialInstance, var2: PartType): boolean;
    isInCategory(var1: IMaterialCategory): boolean;
    isSimple(): boolean;
    isValid(): boolean;
    onSalvage(var1: MaterialInstance): MaterialInstance;
    retainData(oldMaterial: Material): void;
  }


  interface MaterialSerializer<T extends Material = any> extends Serializer<RegistryFriendlyByteBuf, T> {}
  class MaterialSerializer<T extends Material = any> extends Serializer<RegistryFriendlyByteBuf, T> {
    constructor(codec: MapCodec<T>, streamCodec: StreamCodec<RegistryFriendlyByteBuf, T>);
  }


  interface TextureType extends Enum<TextureType> {}
  class TextureType extends Enum<TextureType> {
    static readonly HIGH_CONTRAST: TextureType;
    static readonly LOW_CONTRAST: TextureType;
    static fromString(str: string): TextureType;
    getArmorTexture(innerModel: boolean): ResourceLocation;
    static valueOf(name: string): TextureType;
    static values(): TextureType[];
  }

}

declare module 'net.silentchaos512.gear.api.material.modifier' {
  import { Collection, List, Optional } from 'java.util';
  import { MaterialInstance } from 'net.silentchaos512.gear.gear.material';
  import { PartType } from 'net.silentchaos512.gear.api.part';
  import { PropertyKey } from 'net.silentchaos512.gear.api.util';
  import { GearPropertyValue } from 'net.silentchaos512.gear.api.property';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ItemStack } from 'net.minecraft.world.item';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class IMaterialModifier {
    appendTooltip(var1: Component[]): void;
    get type(): IMaterialModifierType<any>;
    modifyMaterialName(var1: MutableComponent): MutableComponent;
    modifyProperties<T, V extends GearPropertyValue<T>>(var1: MaterialInstance, var2: PartType, var3: PropertyKey<T, V>, var4: Collection<V>): Collection<V>;
  }


  class IMaterialModifierType<T extends IMaterialModifier = any> {
    addModifier(var1: T, var2: ItemStack): void;
    codec(): MapCodec<T>;
    get id(): ResourceLocation;
    readModifier(var1: ItemStack): Optional<T>;
    removeModifier(var1: ItemStack): void;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, T>;
  }

}

declare module 'net.silentchaos512.gear.api.material.modifier.IMaterialModifier' {
  import { Collection } from 'java.util';
  import { PropertyKey } from 'net.silentchaos512.gear.api.util';
  import { GearPropertyValue } from 'net.silentchaos512.gear.api.property';

  class Helper {
    static modifyNumberValuesWithBonusOrPenalty<T, V extends GearPropertyValue<T>>(key: PropertyKey<T, V>, mods: Collection<V>, bonusOrPenalty: number): Collection<V>;
  }

}

declare module 'net.silentchaos512.gear.api.part' {
  import { GearComponent } from 'net.silentchaos512.gear.api.util';
  import { PartInstance } from 'net.silentchaos512.gear.gear.part';
  import { GearType } from 'net.silentchaos512.gear.api.item';
  import { List, Random, AbstractList, Collection, Iterator, ListIterator } from 'java.util';
  import { MaterialInstance } from 'net.silentchaos512.gear.gear.material';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { CraftingInput } from 'net.minecraft.world.item.crafting';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { Enum } from 'java.lang';
  import { Codec, MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Immutable } from 'net.silentchaos512.gear.api.part.PartList';
  import { GearPropertyMap } from 'net.silentchaos512.gear.api.property';
  import { Predicate } from 'java.util.function';
  import { Serializer } from 'net.silentchaos512.gear.util';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  interface GearPart extends GearComponent<PartInstance> {}
  class GearPart extends GearComponent<PartInstance> {
    addInformation(var1: PartInstance, var2: ItemStack, var3: Component[], var4: TooltipFlag): void;
    canAddToGear(var1: ItemStack, var2: PartInstance): boolean;
    get gearType(): GearType;
    get packName(): string;
    get serializer(): PartSerializer<any>;
    get type(): PartType;
    getColor(var1: PartInstance, var2: GearType, var3: number, var4: number): number;
    getDisplayName(var1: PartInstance): Component;
    getDisplayNamePrefix(part: PartInstance, gear: ItemStack): Component;
    getMaterialName(part: PartInstance, gear: ItemStack): Component;
    getMaterials(var1: PartInstance): MaterialInstance[];
    getModelKey(part: PartInstance): string;
    getPrimaryMaterial(part: PartInstance): MaterialInstance;
    getSalvageLossRate(part: PartInstance, gear: ItemStack, normalLossRate: number): number;
    isCraftingAllowed(part: PartInstance, gearType: GearType): boolean;
    isCraftingAllowed(part: PartInstance, partType: PartType, gearType: GearType, craftingInput: CraftingInput): boolean;
    isVisible(): boolean;
    onAddToGear(gear: ItemStack, part: PartInstance): void;
    onGearDamaged(part: PartInstance, gear: ItemStack, amount: number): void;
    onRemoveFromGear(gear: ItemStack, part: PartInstance): void;
    randomizeData(gearType: GearType, tier: number): PartInstance;
    replacesExistingInPosition(part: PartInstance): boolean;
    retainData(oldPart: GearPart): void;
  }


  interface MaterialGrade extends Enum<MaterialGrade> {}
  class MaterialGrade extends Enum<MaterialGrade> {
    static readonly NONE: MaterialGrade;
    static readonly E: MaterialGrade;
    static readonly D: MaterialGrade;
    static readonly C: MaterialGrade;
    static readonly B: MaterialGrade;
    static readonly A: MaterialGrade;
    static readonly S: MaterialGrade;
    static readonly SS: MaterialGrade;
    static readonly SSS: MaterialGrade;
    static readonly MAX: MaterialGrade;
    copyWithGrade(stack: ItemStack): ItemStack;
    static fromStack(stack: ItemStack): MaterialGrade;
    static fromString(str: string): MaterialGrade;
    get displayName(): MutableComponent;
    static get max(): MaterialGrade;
    static selectRandom(random: Random, median: MaterialGrade, stdDev: number, maxGrade: MaterialGrade): MaterialGrade;
    static selectWithCatalyst(random: Random, catalystTier: number): MaterialGrade;
    setGradeOnStack(stack: ItemStack): void;
    static valueOf(name: string): MaterialGrade;
    static values(): MaterialGrade[];
  }


  interface PartList extends AbstractList<PartInstance> {}
  class PartList extends AbstractList<PartInstance> {
    static readonly CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    add(arg0: number, arg1: PartInstance): void;
    clear(): void;
    contains(arg0: any): boolean;
    static empty(): PartList;
    equals(obj: any): boolean;
    get(arg0: number): PartInstance;
    get mains(): PartInstance[];
    get rods(): PartInstance[];
    get tips(): PartInstance[];
    getParts(predicate: Predicate<PartInstance>): PartInstance[];
    getPartsOfType(type: PartType): PartInstance[];
    getPropertyModifiersFromParts(gearType: GearType): GearPropertyMap;
    hashCode(): number;
    static immutable(c: Collection<PartInstance>): Immutable;
    static immutable(...parts: PartInstance[]): Immutable;
    indexOf(arg0: any): number;
    iterator(): Iterator<PartInstance>;
    lastIndexOf(arg0: any): number;
    listIterator(): ListIterator<PartInstance>;
    listIterator(arg0: number): ListIterator<PartInstance>;
    static of(c: Collection<PartInstance>): PartList;
    static of(...parts: PartInstance[]): PartList;
    remove(arg0: any): boolean;
    remove(arg0: number): PartInstance;
    set(arg0: number, arg1: PartInstance): PartInstance;
    size(): number;
    subList(arg0: number, arg1: number): PartInstance[];
    toArray(): any[];
    toArray<T>(arg0: T[]): T[];
    toSortedList(): PartInstance[];
    toString(): string;
  }


  interface PartSerializer<T extends GearPart = any> extends Serializer<RegistryFriendlyByteBuf, T> {}
  class PartSerializer<T extends GearPart = any> extends Serializer<RegistryFriendlyByteBuf, T> {
    constructor(codec: MapCodec<T>, streamCodec: StreamCodec<RegistryFriendlyByteBuf, T>);
  }

}

declare module 'net.silentchaos512.gear.api.part.MaterialGrade' {
  import { MaterialGrade } from 'net.silentchaos512.gear.api.part';
  import { JsonElement } from 'com.google.gson';

  class Range {
    static readonly OPEN: Range;
    constructor(min: MaterialGrade, max: MaterialGrade);
    static deserialize(json: JsonElement): Range;
    test(grade: MaterialGrade): boolean;
  }

}

declare module 'net.silentchaos512.gear.api.part.PartList' {
  import { PartList } from 'net.silentchaos512.gear.api.part';
  import { PartInstance } from 'net.silentchaos512.gear.gear.part';
  import { Collection } from 'java.util';

  interface Immutable extends PartList {}
  class Immutable extends PartList {
    add(arg0: PartInstance): boolean;
    add(arg0: number, arg1: PartInstance): void;
    addAll(arg0: Collection<PartInstance>): boolean;
    addAll(arg0: number, arg1: Collection<PartInstance>): boolean;
    clear(): void;
    remove(arg0: any): boolean;
    remove(arg0: number): PartInstance;
    removeAll(arg0: Collection<any>): boolean;
    retainAll(arg0: Collection<any>): boolean;
    set(arg0: number, arg1: PartInstance): PartInstance;
  }

}

declare module 'net.silentchaos512.gear.api.part.PartType' {
  import { Supplier, Function } from 'java.util.function';
  import { CompoundPartItem } from 'net.silentchaos512.gear.item';
  import { GearType } from 'net.silentchaos512.gear.api.item';
  import { Optional } from 'java.util';

  class Builder {
    static builder(): Builder;
    compoundPartItem(item: Supplier<CompoundPartItem>, gt: GearType): Builder;
    compoundPartItem(itemGetter: Function<GearType, Optional<CompoundPartItem>>): Builder;
    isRemovable(value: boolean): Builder;
    isUpgrade(value: boolean): Builder;
    maxPerItem(maxPerItem: number): Builder;
  }

}

declare module 'net.silentchaos512.gear.api.property' {
  import { Boolean, Enum, Iterable, Float } from 'java.lang';
  import { Codec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Builder, FormatContext } from 'net.silentchaos512.gear.api.property.GearProperty';
  import { RegistryFriendlyByteBuf, FriendlyByteBuf } from 'net.minecraft.network';
  import { GearType } from 'net.silentchaos512.gear.api.item';
  import { Collection, List, Set, Map } from 'java.util';
  import { PartGearKey, GearComponentInstance, PropertyKey, DataResource } from 'net.silentchaos512.gear.api.util';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { GearTooltipFlag, TextListBuilder } from 'net.silentchaos512.gear.client.util';
  import { PartInstance } from 'net.silentchaos512.gear.gear.part';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Color } from 'net.silentchaos512.lib.util';
  import { Multimap, Multiset } from 'com.google.common.collect';
  import { Immutable } from 'net.silentchaos512.gear.api.property.GearPropertyMap';
  import { Entry } from 'Map';
  import { Function } from 'java.util.function';
  import { Operation, DisplayFormat } from 'net.silentchaos512.gear.api.property.NumberProperty';
  import { TraitInstance } from 'net.silentchaos512.gear.api.traits';
  import { Trait } from 'net.silentchaos512.gear.gear.trait';

  interface BooleanProperty extends GearProperty<boolean, BooleanPropertyValue> {}
  class BooleanProperty extends GearProperty<boolean, BooleanPropertyValue> {
    static readonly CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(builder: Builder<boolean>);
    codec(): Codec<BooleanPropertyValue>;
    compressModifiers(modifiers: Collection<BooleanPropertyValue>, key: PartGearKey, components: GearComponentInstance<any>[]): BooleanPropertyValue[];
    compute(baseValue: boolean, clampResult: boolean, itemType: GearType, statType: GearType, modifiers: Collection<BooleanPropertyValue>): boolean;
    formatValue(value: BooleanPropertyValue, formatContext: FormatContext): Component;
    formatValueWithColor(value: BooleanPropertyValue, addColor: boolean, formatContext: FormatContext): MutableComponent;
    get zeroValue(): boolean;
    isHidden(value: BooleanPropertyValue, flag: GearTooltipFlag): boolean;
    isZero(value: boolean): boolean;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, BooleanPropertyValue>;
    valueOf(value: boolean): BooleanPropertyValue;
  }


  interface BooleanPropertyValue extends GearPropertyValue<boolean> {}
  class BooleanPropertyValue extends GearPropertyValue<boolean> {
    constructor(value: boolean);
    equals(obj: any): boolean;
    hashCode(): number;
    toString(): string;
  }


  class GearProperty<T = any, V extends GearPropertyValue<T> = any> {
    applySynergy(value: V, synergy: number): V;
    buildTooltip(listBuilder: TextListBuilder, value: V, gearItemStack: ItemStack, flag: GearTooltipFlag): void;
    buildTooltipUnchecked(listBuilder: TextListBuilder, value: GearPropertyValue<any>, gearItemStack: ItemStack, flag: GearTooltipFlag): void;
    codec(): Codec<V>;
    compressModifiers(var1: Collection<V>, var2: PartGearKey, var3: GearComponentInstance<any>[]): V[];
    compute(modifiers: Collection<V>): T;
    compute(baseValue: T, modifiers: Collection<V>): T;
    compute(baseValue: T, clampResult: boolean, gearType: GearType, modifiers: Collection<V>): T;
    compute(var1: T, var2: boolean, var3: GearType, var4: GearType, var5: Collection<V>): T;
    computeForGear(baseValue: T, clampResult: boolean, itemType: GearType, statType: GearType, modifiers: Collection<V>, parts: PartInstance[]): T;
    computeUnchecked(clampResult: boolean, itemType: GearType, statType: GearType, modifiers: Collection<GearPropertyValue<any>>): V;
    computeUncheckedForGear(itemType: GearType, statType: GearType, modifiers: Collection<GearPropertyValue<any>>, parts: PartInstance[]): V;
    equals(obj: any): boolean;
    formatModifiers(mods: Collection<V>, addModColors: boolean, formatContext: FormatContext): Component;
    formatModifiersUnchecked(mods: Collection<GearPropertyValue<any>>, addModColors: boolean, formatContext: FormatContext): Component;
    formatModifiersWithColorUnchecked(mods: Collection<GearPropertyValue<any>>, addColor: boolean, formatContext: FormatContext): MutableComponent;
    formatText(value: V, flag: GearTooltipFlag): Component;
    formatText(valueText: Component): Component;
    formatTextUnchecked(value: GearPropertyValue<any>, flag: GearTooltipFlag): Component;
    formatValue(var1: V, var2: FormatContext): Component;
    formatValueWithColor(var1: V, var2: boolean, var3: FormatContext): MutableComponent;
    get baseValue(): T;
    get defaultValue(): T;
    get displayName(): MutableComponent;
    get group(): GearPropertyGroup;
    get maximumValue(): T;
    get minimumValue(): T;
    get zeroValue(): T;
    getPreferredDecimalPlaces(value: V): number;
    getTooltipLines(value: V, flag: GearTooltipFlag): Component[];
    getTooltipLinesUnchecked(value: GearPropertyValue<any>, flag: GearTooltipFlag): Component[];
    hashCode(): number;
    isAffectedByGrades(): boolean;
    isAffectedBySynergy(): boolean;
    isForMaterialsOnly(): boolean;
    isHidden(value: V, flag: GearTooltipFlag): boolean;
    isHiddenUnchecked(value: GearPropertyValue<any>, flag: GearTooltipFlag): boolean;
    isZero(var1: T): boolean;
    rawStreamCodec(): StreamCodec<FriendlyByteBuf, GearPropertyValue<any>>;
    sortForDisplay(mods: Collection<V>): V[];
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, V>;
    valueOf(var1: T): V;
  }


  class GearPropertyGroup {
    get color(): Color;
    get name(): string;
    get properties(): Set<GearProperty<any, any>>;
  }


  interface GearPropertyGroups extends Enum<GearPropertyGroups> {}
  class GearPropertyGroups extends Enum<GearPropertyGroups> {
    static readonly SPECIAL: GearPropertyGroups;
    static readonly GENERAL: GearPropertyGroups;
    static readonly HARVEST: GearPropertyGroups;
    static readonly ATTACK: GearPropertyGroups;
    static readonly PROJECTILE: GearPropertyGroups;
    static readonly ARMOR: GearPropertyGroups;
    get color(): Color;
    get name(): string;
    get properties(): Set<GearProperty<any, any>>;
    static getSortedRelevantProperties(relevantPropertyGroups: Set<GearPropertyGroup>): Set<GearProperty<any, any>>;
    static valueOf(name: string): GearPropertyGroups;
    static values(): GearPropertyGroups[];
  }


  interface GearPropertyMap extends Multimap<PropertyKey, GearPropertyValue> {}
  class GearPropertyMap extends Multimap<PropertyKey, GearPropertyValue> {
    static readonly CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    static readonly EMPTY: GearPropertyMap;
    constructor();

    constructor(values: GearPropertyMap);
    asMap(): Map<PropertyKey<any, any>, Collection<GearPropertyValue<any>>>;
    clear(): void;
    containsEntry(key: any, value: any): boolean;
    containsKey(key: any): boolean;
    containsValue(value: any): boolean;
    entries(): Collection<Entry<PropertyKey<any, any>, GearPropertyValue<any>>>;
    equals(obj: any): boolean;
    static formatText<T, V extends GearPropertyValue<T>, P extends GearProperty<T, V>>(mods: Collection<V>, property: P, maxDecimalPlaces: number): MutableComponent;
    static formatText<T, V extends GearPropertyValue<T>, P extends GearProperty<T, V>>(mods: Collection<V>, property: P, maxDecimalPlaces: number, addModColors: boolean): MutableComponent;
    static formatTextUnchecked(mods: Collection<GearPropertyValue<any>>, property: GearProperty<any, any>, addModColors: boolean): Component;
    get(key: PropertyKey<any, any>): Collection<GearPropertyValue<any>>;
    get propertyTypes(): Set<GearProperty<any, any>>;
    getMostSpecificKey(key: PropertyKey<any, any>): PropertyKey<any, any>;
    getValues<T, V extends GearPropertyValue<T>>(stat: GearProperty<T, V>, gearType: GearType): Collection<V>;
    getValues<T, V extends GearPropertyValue<T>>(key: PropertyKey<T, V>): Collection<V>;
    hashCode(): number;
    isEmpty(): boolean;
    keySet(): Set<PropertyKey<any, any>>;
    keys(): Multiset<PropertyKey<any, any>>;
    put<V, I extends GearPropertyValue<V>>(stat: GearProperty<V, I>, gearType: GearType, value: I): boolean;
    put(key: PropertyKey<any, any>, value: GearPropertyValue<any>): boolean;
    putAll(key: PropertyKey<any, any>, values: Iterable<GearPropertyValue<any>>): boolean;
    putAll(multimap: Multimap<PropertyKey<any, any>, GearPropertyValue<any>>): boolean;
    remove(key: any, value: any): boolean;
    removeAll(key: any): Collection<GearPropertyValue<any>>;
    replaceValues(key: PropertyKey<any, any>, values: Iterable<GearPropertyValue<any>>): Collection<GearPropertyValue<any>>;
    size(): number;
    toImmutable(): Immutable;
    toMutable(): GearPropertyMap;
    values(): Collection<GearPropertyValue<any>>;
  }


  class GearPropertyValue<T = any> {
    constructor(value: T);
    static createSimpleStreamCodec<T, V extends GearPropertyValue<T>, B extends FriendlyByteBuf>(streamCodec: StreamCodec<B, T>, constructor: Function<T, V>): StreamCodec<B, V>;
    static createSimpleValueCodec<T, V extends GearPropertyValue<T>>(codec: Codec<T>, constructor: Function<T, V>): Codec<V>;
    equals(var1: any): boolean;
    hashCode(): number;
    value(): T;
  }


  interface HarvestTierProperty extends GearProperty<HarvestTier, HarvestTierPropertyValue> {}
  class HarvestTierProperty extends GearProperty<HarvestTier, HarvestTierPropertyValue> {
    static readonly CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(builder: Builder<HarvestTier>);
    codec(): Codec<HarvestTierPropertyValue>;
    compressModifiers(modifiers: Collection<HarvestTierPropertyValue>, key: PartGearKey, components: GearComponentInstance<any>[]): HarvestTierPropertyValue[];
    compute(baseValue: HarvestTier, clampResult: boolean, itemType: GearType, statType: GearType, modifiers: Collection<HarvestTierPropertyValue>): HarvestTier;
    formatValue(value: HarvestTierPropertyValue, formatContext: FormatContext): Component;
    formatValueWithColor(value: HarvestTierPropertyValue, addColor: boolean, formatContext: FormatContext): MutableComponent;
    get zeroValue(): HarvestTier;
    isZero(value: HarvestTier): boolean;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, HarvestTierPropertyValue>;
    valueOf(value: HarvestTier): HarvestTierPropertyValue;
  }


  interface HarvestTierPropertyValue extends GearPropertyValue<HarvestTier> {}
  class HarvestTierPropertyValue extends GearPropertyValue<HarvestTier> {
    constructor(value: HarvestTier);
    equals(obj: any): boolean;
    hashCode(): number;
    toString(): string;
  }


  interface NumberProperty extends GearProperty<number, NumberPropertyValue> {}
  class NumberProperty extends GearProperty<number, NumberPropertyValue> {
    static readonly CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(defaultOperation: Operation, displayFormat: DisplayFormat, displayAsInt: boolean, builder: Builder<number>);
    applySynergy(value: NumberPropertyValue, synergy: number): NumberPropertyValue;
    clampValue(value: number): number;
    codec(): Codec<NumberPropertyValue>;
    compressModifiers(modifiers: Collection<NumberPropertyValue>, key: PartGearKey, components: GearComponentInstance<any>[]): NumberPropertyValue[];
    compute(baseValue: number, clampResult: boolean, itemType: GearType, statType: GearType, modifiers: Collection<NumberPropertyValue>): number;
    formatValue(value: NumberPropertyValue, formatContext: FormatContext): Component;
    formatValueWithColor(value: NumberPropertyValue, addColor: boolean, formatContext: FormatContext): MutableComponent;
    get displayFormat(): DisplayFormat;
    get zeroValue(): number;
    getPreferredDecimalPlaces(value: NumberPropertyValue): number;
    static getWeightedAverage(modifiers: Collection<NumberPropertyValue>, op: Operation): number;
    isDisplayAsInt(): boolean;
    isZero(value: number): boolean;
    sortForDisplay(mods: Collection<NumberPropertyValue>): NumberPropertyValue[];
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, NumberPropertyValue>;
    valueOf(value: number): NumberPropertyValue;
  }


  interface NumberPropertyValue extends GearPropertyValue<number> {}
  class NumberPropertyValue extends GearPropertyValue<number> {
    constructor(value: number, operation: Operation);
    static average(value: number): NumberPropertyValue;
    equals(obj: any): boolean;
    hashCode(): number;
    operation(): Operation;
    toString(): string;
  }


  interface TraitListProperty extends GearProperty<List, TraitListPropertyValue> {}
  class TraitListProperty extends GearProperty<List, TraitListPropertyValue> {
    static readonly CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(builder: Builder<TraitInstance[]>);
    buildTooltip(listBuilder: TextListBuilder, value: TraitListPropertyValue, gearItemStack: ItemStack, flag: GearTooltipFlag): void;
    codec(): Codec<TraitListPropertyValue>;
    compressModifiers(modifiers: Collection<TraitListPropertyValue>, key: PartGearKey, components: GearComponentInstance<any>[]): TraitListPropertyValue[];
    compute(baseValue: TraitInstance[], filterConditions: boolean, itemType: GearType, statType: GearType, modifiers: Collection<TraitListPropertyValue>): TraitInstance[];
    computeForGear(baseValue: TraitInstance[], filterConditions: boolean, itemType: GearType, statType: GearType, modifiers: Collection<TraitListPropertyValue>, parts: PartInstance[]): TraitInstance[];
    computeTraits(filterConditions: boolean, itemType: GearType, baseValue: TraitInstance[], traits: Collection<TraitInstance>, parts: PartInstance[]): TraitInstance[];
    formatValue(value: TraitListPropertyValue, formatContext: FormatContext): Component;
    formatValueWithColor(value: TraitListPropertyValue, addColor: boolean, formatContext: FormatContext): MutableComponent;
    get zeroValue(): TraitInstance[];
    isZero(value: TraitInstance[]): boolean;
    sortForDisplay(mods: Collection<TraitListPropertyValue>): TraitListPropertyValue[];
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, TraitListPropertyValue>;
    valueOf(value: TraitInstance[]): TraitListPropertyValue;
  }


  interface TraitListPropertyValue extends GearPropertyValue<List> {}
  class TraitListPropertyValue extends GearPropertyValue<List> {
    constructor(value: TraitInstance[]);
    static empty(): TraitListPropertyValue;
    equals(obj: any): boolean;
    static from(traits: Collection<TraitInstance>): TraitListPropertyValue;
    hashCode(): number;
    static of(...traits: TraitInstance[]): TraitListPropertyValue;
    static single(trait: DataResource<Trait>, level: number): TraitListPropertyValue;
    toString(): string;
  }

}

declare module 'net.silentchaos512.gear.api.property.GearProperty' {
  import { GearPropertyGroup } from 'net.silentchaos512.gear.api.property';
  import { Color } from 'net.silentchaos512.lib.util';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class Builder<T = any> {
    forMaterialsOnly: boolean;
    constructor(defaultValue: T);

    constructor(defaultValue: T, baseValue: T);

    constructor(defaultValue: T, baseValue: T, minimumValue: T, maximumValue: T);
    affectedByGrades(value: boolean): Builder<T>;
    affectedBySynergy(value: boolean): Builder<T>;
    forMaterialsOnly(value: boolean): Builder<T>;
    group(category: GearPropertyGroup): Builder<T>;
    nameColor(color: Color): Builder<T>;
    validate(): void;
    visible(visible: boolean): Builder<T>;
  }


  interface FormatContext extends Enum<FormatContext> {}
  class FormatContext extends Enum<FormatContext> {
    static readonly GEAR: FormatContext;
    static readonly PART: FormatContext;
    static readonly MATERIAL: FormatContext;
    static readonly ANY: FormatContext;
    static valueOf(name: string): FormatContext;
    static values(): FormatContext[];
  }

}

declare module 'net.silentchaos512.gear.api.property.GearPropertyMap' {
  import { GearPropertyMap, GearProperty, GearPropertyValue } from 'net.silentchaos512.gear.api.property';
  import { Codec } from 'com.mojang.serialization';
  import { GearType } from 'net.silentchaos512.gear.api.item';
  import { PropertyKey } from 'net.silentchaos512.gear.api.util';
  import { Iterable } from 'java.lang';
  import { Multimap } from 'com.google.common.collect';
  import { Collection } from 'java.util';

  interface Immutable extends GearPropertyMap {}
  class Immutable extends GearPropertyMap {
    static readonly CODEC: Codec;
    constructor(values: GearPropertyMap);
    clear(): void;
    put<V, I extends GearPropertyValue<V>>(stat: GearProperty<V, I>, gearType: GearType, value: I): boolean;
    put(key: PropertyKey<any, any>, value: GearPropertyValue<any>): boolean;
    putAll(key: PropertyKey<any, any>, values: Iterable<GearPropertyValue<any>>): boolean;
    putAll(multimap: Multimap<PropertyKey<any, any>, GearPropertyValue<any>>): boolean;
    remove(key: any, value: any): boolean;
    removeAll(key: any): Collection<GearPropertyValue<any>>;
    replaceValues(key: PropertyKey<any, any>, values: Iterable<GearPropertyValue<any>>): Collection<GearPropertyValue<any>>;
    toMutable(): GearPropertyMap;
  }

}

declare module 'net.silentchaos512.gear.api.property.NumberProperty' {
  import { Enum } from 'java.lang';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { NumberProperty } from 'net.silentchaos512.gear.api.property';
  import { List } from 'java.util';

  interface Operation extends Enum<Operation> {}
  class Operation extends Enum<Operation> {
    static readonly AVERAGE: Operation;
    static readonly MAX: Operation;
    static readonly ADD: Operation;
    static readonly MULTIPLY_BASE: Operation;
    static readonly MULTIPLY_TOTAL: Operation;
    formatNumberValue(property: NumberProperty, value: number, decimalPlaces: number, addColor: boolean): MutableComponent;
    static valueOf(name: string): Operation;
    static values(): Operation[];
  }


  interface DisplayFormat extends Enum<DisplayFormat> {}
  class DisplayFormat extends Enum<DisplayFormat> {
    static readonly UNIT: DisplayFormat;
    static readonly MULTIPLIER: DisplayFormat;
    static readonly PERCENTAGE: DisplayFormat;
    static valueOf(name: string): DisplayFormat;
    static values(): DisplayFormat[];
  }

}

declare module 'net.silentchaos512.gear.api.traits' {
  import { Codec, MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Trait } from 'net.silentchaos512.gear.gear.trait';
  import { PartGearKey, GearComponentInstance } from 'net.silentchaos512.gear.api.util';
  import { List, Collection } from 'java.util';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { Serializer } from 'net.silentchaos512.gear.util';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { ItemStack } from 'net.minecraft.world.item';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { GearPropertyValue, GearProperty } from 'net.silentchaos512.gear.api.property';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Builder } from 'ItemAttributeModifiers';
  import { InteractionResult } from 'net.minecraft.world';
  import { UseOnContext } from 'net.minecraft.world.item.context';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  class ITraitCondition {
    static readonly DISPATCH_CODEC: Codec;
    static readonly REGISTRY_STREAM_CODEC: StreamCodec;
    static readonly STREAM_CODEC: StreamCodec;
    get displayText(): MutableComponent;
    matches(var1: Trait, var2: PartGearKey, var3: GearComponentInstance<any>[]): boolean;
    serializer(): TraitConditionSerializer<any>;
  }


  interface TraitConditionSerializer<V extends ITraitCondition = any> extends Serializer<RegistryFriendlyByteBuf, V> {}
  class TraitConditionSerializer<V extends ITraitCondition = any> extends Serializer<RegistryFriendlyByteBuf, V> {
    constructor(codec: MapCodec<V>, streamCodec: StreamCodec<RegistryFriendlyByteBuf, V>);
    get rawStreamCodec(): StreamCodec<RegistryFriendlyByteBuf, ITraitCondition>;
    toString(): string;
  }


  class TraitEffect {
    static readonly DISPATCH_CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    addLootDrops(context: TraitActionContext, stack: ItemStack): ItemStack;
    get extraWikiLines(): Collection<string>;
    getBonusProperties(traitLevel: number, player: Player, property: GearProperty<any, any>, baseValue: GearPropertyValue<any>, damageRatio: number): Collection<GearPropertyValue<any>>;
    getMiningSpeedModifier(traitLevel: number, state: BlockState): number;
    onAttackEntity(context: TraitActionContext, target: LivingEntity, baseValue: number): number;
    onCalculateSynergy(synergy: number, traitLevel: number): number;
    onDurabilityDamage(context: TraitActionContext, damageTaken: number): number;
    onEntityIncomingDamage(armor: ItemStack, traitLevel: number, target: LivingEntity, source: DamageSource, amount: number, originalAmount: number): number;
    onGearCrafted(context: TraitActionContext): void;
    onGetAttributeModifiers(context: TraitActionContext, builder: Builder): void;
    onItemSwing(stack: ItemStack, wielder: LivingEntity, traitLevel: number): void;
    onItemUse(context: UseOnContext, traitLevel: number): InteractionResult;
    onRecalculatePost(gear: ItemStack, traitLevel: number): void;
    onRecalculatePre(gear: ItemStack, traitLevel: number): void;
    onUpdate(context: TraitActionContext, isEquipped: boolean): void;
    type(): TraitEffectType<any>;
  }


  interface TraitEffectType<T extends TraitEffect = any> extends Serializer<RegistryFriendlyByteBuf, T> {}
  class TraitEffectType<T extends TraitEffect = any> extends Serializer<RegistryFriendlyByteBuf, T> {
    constructor(codec: MapCodec<T>, streamCodec: StreamCodec<RegistryFriendlyByteBuf, T>);

    constructor(codec: MapCodec<T>, streamCodec: StreamCodec<RegistryFriendlyByteBuf, T>, wikiDescription: string);
    get wikiDescription(): string;
    rawStreamCodec(): StreamCodec<RegistryFriendlyByteBuf, TraitEffect>;
  }


  class TraitFunction<T = any> {
    apply(var1: TraitInstance, var2: T): T;
  }

}

declare module 'net.silentchaos512.gear.api.util' {
  import { Supplier, Function, Consumer } from 'java.util.function';
  import { Codec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Material } from 'net.silentchaos512.gear.api.material';
  import { MaterialInstance } from 'net.silentchaos512.gear.gear.material';
  import { GearPart, PartType } from 'net.silentchaos512.gear.api.part';
  import { Trait } from 'net.silentchaos512.gear.gear.trait';
  import { Optional, Collection } from 'java.util';
  import { Stream } from 'java.util.stream';
  import { Ingredient, CraftingInput } from 'net.minecraft.world.item.crafting';
  import { GearType } from 'net.silentchaos512.gear.api.item';
  import { Component } from 'net.minecraft.network.chat';
  import { ItemStack } from 'net.minecraft.world.item';
  import { GearPropertyValue, GearProperty } from 'net.silentchaos512.gear.api.property';
  import { TraitInstance } from 'net.silentchaos512.gear.api.traits';

  interface DataResource<T = any> extends Supplier<T> {}
  class DataResource<T = any> extends Supplier<T> {
    static readonly MATERIAL_CODEC: Codec;
    static readonly PART_CODEC: Codec;
    static readonly TRAIT_CODEC: Codec;
    static readonly MATERIAL_STREAM_CODEC: StreamCodec;
    static readonly PART_STREAM_CODEC: StreamCodec;
    static readonly TRAIT_STREAM_CODEC: StreamCodec;
    constructor(id: ResourceLocation, getter: Function<ResourceLocation, T>);
    static empty<T>(): DataResource<T>;
    equals(obj: any): boolean;
    get (): T;
    get id(): ResourceLocation;
    get nullable(): T;
    hashCode(): number;
    ifPresent(consumer: Consumer<T>): void;
    isPresent(): boolean;
    map<U>(mapper: Function<T, U>): Optional<U>;
    static material(modPath: string): DataResource<Material>;
    static material(id: ResourceLocation): DataResource<Material>;
    static material(material: Material): DataResource<Material>;
    static material(materialInstance: MaterialInstance): DataResource<Material>;
    static part(modPath: string): DataResource<GearPart>;
    static part(id: ResourceLocation): DataResource<GearPart>;
    stream(): Stream<T>;
    toOptional(): Optional<DataResource<T>>;
    toString(): string;
    static trait(modPath: string): DataResource<Trait>;
    static trait(id: ResourceLocation): DataResource<Trait>;
  }


  interface GearComponent<D = any> extends PropertyProvider<D> {}
  class GearComponent<D = any> extends PropertyProvider<D> {
    get ingredient(): Ingredient;
    getDisplayName(var1: D, var2: PartType): Component;
    isCraftingAllowed(var1: D, var2: PartType, var3: GearType, var4: CraftingInput): boolean;
    isCraftingAllowed(instance: D, partType: PartType, gearType: GearType): boolean;
  }


  class GearComponentInstance<A extends GearComponent<any> = any> {
    get (): A;
    get id(): ResourceLocation;
    get item(): ItemStack;
    getDisplayName(type: PartType): Component;
    getDisplayName(var1: PartType, var2: ItemStack): Component;
    getNameColor(var1: PartType, var2: GearType): number;
    getProperty<T, V extends GearPropertyValue<T>>(var1: PartType, var2: PropertyKey<T, V>): T;
    getProperty<T, V extends GearPropertyValue<T>>(partType: PartType, property: GearProperty<T, V>): T;
    getProperty<T, V extends GearPropertyValue<T>>(partType: Supplier<PartType>, key: PropertyKey<T, V>): T;
    getPropertyModifiers<T, V extends GearPropertyValue<T>>(var1: PartType, var2: PropertyKey<T, V>): Collection<V>;
    getPropertyModifiers<T, V extends GearPropertyValue<T>>(partType: Supplier<PartType>, key: PropertyKey<T, V>): Collection<V>;
    getTraits(key: PartGearKey): Collection<TraitInstance>;
  }


  class PropertyKey<T = any, V extends GearPropertyValue<T> = any> {
    static readonly CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    equals(obj: any): boolean;
    gearType(): GearType;
    get parent(): PropertyKey<any, any>;
    hashCode(): number;
    key(): string;
    static of<T, V extends GearPropertyValue<T>, P extends GearProperty<T, V>>(property: Supplier<P>, gearType: Supplier<GearType>): PropertyKey<T, V>;
    static of<T, V extends GearPropertyValue<T>>(property: GearProperty<T, V>, gearType: GearType): PropertyKey<T, V>;
    property(): GearProperty<T, V>;
    toString(): string;
  }


  class PropertyProvider<D = any> {
    getProperty<T, V extends GearPropertyValue<T>>(instance: D, partType: PartType, key: PropertyKey<T, V>): T;
    getProperty<T, V extends GearPropertyValue<T>>(instance: D, partType: Supplier<PartType>, key: PropertyKey<T, V>): T;
    getPropertyModifiers<T, V extends GearPropertyValue<T>>(var1: D, var2: PartType, var3: PropertyKey<T, V>): Collection<V>;
    getPropertyModifiers<T, V extends GearPropertyValue<T>>(instance: D, partType: Supplier<PartType>, key: PropertyKey<T, V>): Collection<V>;
    getPropertyUnclamped<T, V extends GearPropertyValue<T>>(instance: D, partType: PartType, key: PropertyKey<T, V>): T;
    getPropertyUnclamped<T, V extends GearPropertyValue<T>>(instance: D, partType: Supplier<PartType>, key: PropertyKey<T, V>): T;
  }

}

declare module 'net.silentchaos512.gear.block.alloymaker' {
  import { ModContainerBlock, SgContainerBlockEntity, IDroppableInventory } from 'net.silentchaos512.gear.block';
  import { DirectionProperty, BooleanProperty } from 'net.minecraft.world.level.block.state.properties';
  import { Properties } from 'BlockBehaviour';
  import { Collection, List } from 'java.util';
  import { IMaterialCategory } from 'net.silentchaos512.gear.api.material';
  import { InteractionResult, Container } from 'net.minecraft.world';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level, BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos, NonNullList } from 'net.minecraft.core';
  import { Player, Inventory } from 'net.minecraft.world.entity.player';
  import { BlockHitResult } from 'net.minecraft.world.phys';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { TooltipContext } from 'Item';
  import { Component } from 'net.minecraft.network.chat';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { Rotation, Mirror } from 'net.minecraft.world.level.block';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { BlockEntityTicker, BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { FriendlyByteBuf, Connection } from 'net.minecraft.network';
  import { AlloyRecipe } from 'net.silentchaos512.gear.crafting.recipe.alloy';
  import { ItemStackHandler } from 'net.neoforged.neoforge.items';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { ClientboundBlockEntityDataPacket } from 'net.minecraft.network.protocol.game';
  import { AbstractContainerMenu, MenuType, ContainerData } from 'net.minecraft.world.inventory';
  import { Supplier } from 'java.util.function';
  import { CompoundMaterialItem } from 'net.silentchaos512.gear.item';
  import { RecipeSerializer, RecipeType } from 'net.minecraft.world.item.crafting';
  import { Class } from 'java.lang';
  import { MaterialInstance } from 'net.silentchaos512.gear.gear.material';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface AlloyMakerBlock<R extends AlloyRecipe = any> extends ModContainerBlock<AlloyMakerBlockEntity> {}
  class AlloyMakerBlock<R extends AlloyRecipe = any> extends ModContainerBlock<AlloyMakerBlockEntity> {
    static readonly FACING: DirectionProperty;
    static readonly LIT: BooleanProperty;
    constructor(info: AlloyMakerInfo<R>, properties: Properties);
    appendHoverText(stack: ItemStack, tooltipContext: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    get categories(): Collection<IMaterialCategory>;
    getShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    getTicker<T extends BlockEntity>(level: Level, state: BlockState, blockEntityType: BlockEntityType<T>): BlockEntityTicker<T>;
    mirror(state: BlockState, mirrorIn: Mirror): BlockState;
    onRemove(state: BlockState, worldIn: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    rotate(state: BlockState, rot: Rotation): BlockState;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface AlloyMakerBlockEntity<R extends AlloyRecipe = any> extends IDroppableInventory, SgContainerBlockEntity {}
  class AlloyMakerBlockEntity<R extends AlloyRecipe = any> extends IDroppableInventory {
    static readonly STANDARD_INPUT_SLOTS: number;
    constructor(info: AlloyMakerInfo<R>, pos: BlockPos, state: BlockState);
    canPlaceItem(index: number, stack: ItemStack): boolean;
    createItemHandler(): ItemStackHandler;
    static createItemHandler(info: AlloyMakerInfo<any>): ItemStackHandler;
    encodeExtraData(buffer: FriendlyByteBuf): void;
    extractItem(slot: number, amount: number, simulate: boolean): ItemStack;
    get hintStack(): ItemStack;
    get inputSlotCount(): number;
    get itemsToDrop(): NonNullList<ItemStack>;
    get outputHintSlotIndex(): number;
    get outputSlotIndex(): number;
    getUpdateTag(provider: Provider): CompoundTag;
    isItemValid(slot: number, stack: ItemStack): boolean;
    loadAdditional(tags: CompoundTag, provider: Provider): void;
    onDataPacket(net: Connection, packet: ClientboundBlockEntityDataPacket, provider: Provider): void;
    saveAdditional(tags: CompoundTag, provider: Provider): void;
    setChanged(): void;
    static tick<R extends AlloyRecipe>(level: Level, pos: BlockPos, state: BlockState, blockEntity: AlloyMakerBlockEntity<R>): void;
  }


  interface AlloyMakerContainer extends AbstractContainerMenu {}
  class AlloyMakerContainer extends AbstractContainerMenu {
    constructor(containerType: MenuType<any>, id: number, playerInventory: Inventory, buffer: FriendlyByteBuf, categories: Collection<IMaterialCategory>);

    constructor(containerType: MenuType<any>, id: number, playerInventory: Inventory, inventory: Container, fields: ContainerData, categories: Collection<IMaterialCategory>);
    get progressArrowScale(): number;
    mayPickup(playerIn: Player): boolean;
    quickMoveStack(playerIn: Player, index: number): ItemStack;
    setWorkEnabled(value: boolean): void;
    stillValid(playerIn: Player): boolean;
  }


  class AlloyMakerInfo<R extends AlloyRecipe = any> {
    constructor(categories: Collection<IMaterialCategory>, inputSlotCount: number, outputItem: Supplier<CompoundMaterialItem>, block: Supplier<AlloyMakerBlock<R>>, blockEntityType: Supplier<BlockEntityType<AlloyMakerBlockEntity<R>>>, containerType: Supplier<MenuType<AlloyMakerContainer>>, recipeSerializer: Supplier<RecipeSerializer<R>>, recipeType: Supplier<RecipeType<R>>, recipeClass: Class<R>);
    acceptsMaterial(material: MaterialInstance): boolean;
    get block(): AlloyMakerBlock<R>;
    get blockEntityType(): BlockEntityType<AlloyMakerBlockEntity<R>>;
    get categories(): Collection<IMaterialCategory>;
    get containerType(): MenuType<AlloyMakerContainer>;
    get inputSlotCount(): number;
    get outputItem(): CompoundMaterialItem;
    get recipeClass(): Class<R>;
    get recipeSerializer(): RecipeSerializer<any>;
    get recipeType(): RecipeType<R>;
    get serverBlockEntityTicker(): BlockEntityTicker<AlloyMakerBlockEntity<R>>;
  }


  interface AlloyMakerScreen extends AbstractContainerScreen<AlloyMakerContainer> {}
  class AlloyMakerScreen extends AbstractContainerScreen<AlloyMakerContainer> {
    constructor(screenContainer: AlloyMakerContainer, inv: Inventory, titleIn: Component);
    get texture(): ResourceLocation;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }

}

declare module 'net.silentchaos512.gear.block.alloymaker.screen' {
  import { AlloyMakerScreen, AlloyMakerContainer } from 'net.silentchaos512.gear.block.alloymaker';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';

  interface AlloyForgeScreen extends AlloyMakerScreen {}
  class AlloyForgeScreen extends AlloyMakerScreen {
    static readonly TEXTURE: ResourceLocation;
    constructor(screenContainer: AlloyMakerContainer, inv: Inventory, titleIn: Component);
    get texture(): ResourceLocation;
  }


  interface CrudeMixerScreen extends AlloyMakerScreen {}
  class CrudeMixerScreen extends AlloyMakerScreen {
    static readonly TEXTURE: ResourceLocation;
    constructor(screenContainer: AlloyMakerContainer, inv: Inventory, titleIn: Component);
    get texture(): ResourceLocation;
  }


  interface RecrystallizerScreen extends AlloyMakerScreen {}
  class RecrystallizerScreen extends AlloyMakerScreen {
    static readonly TEXTURE: ResourceLocation;
    constructor(screenContainer: AlloyMakerContainer, inv: Inventory, titleIn: Component);
    get texture(): ResourceLocation;
  }


  interface RefabricatorScreen extends AlloyMakerScreen {}
  class RefabricatorScreen extends AlloyMakerScreen {
    static readonly TEXTURE: ResourceLocation;
    constructor(screenContainer: AlloyMakerContainer, inv: Inventory, titleIn: Component);
    get texture(): ResourceLocation;
  }


  interface SuperMixerScreen extends AlloyMakerScreen {}
  class SuperMixerScreen extends AlloyMakerScreen {
    static readonly TEXTURE: ResourceLocation;
    constructor(screenContainer: AlloyMakerContainer, inv: Inventory, titleIn: Component);
    get texture(): ResourceLocation;
  }

}

declare module 'net.silentchaos512.gear.block.charger' {
  import { SgContainerBlockEntity, INamedContainerExtraData, ModContainerBlock } from 'net.silentchaos512.gear.block';
  import { BlockEntityType, BlockEntityTicker, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { Type } from 'net.silentchaos512.gear.gear.material.modifier.ChargedMaterialModifier';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { StarchargedMaterialModifier } from 'net.silentchaos512.gear.gear.material.modifier';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Level, BlockGetter } from 'net.minecraft.world.level';
  import { ItemStackHandler } from 'net.neoforged.neoforge.items';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { AbstractContainerMenu, MenuType, ContainerData } from 'net.minecraft.world.inventory';
  import { Inventory, Player } from 'net.minecraft.world.entity.player';
  import { Container } from 'net.minecraft.world';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { MapCodec } from 'com.mojang.serialization';
  import { BlockEntitySupplier } from 'BlockEntityType';
  import { Properties } from 'BlockBehaviour';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';

  interface ChargerBlockEntity<T extends ChargedMaterialModifier = any> extends INamedContainerExtraData, SgContainerBlockEntity {}
  class ChargerBlockEntity<T extends ChargedMaterialModifier = any> extends INamedContainerExtraData {
    constructor(type: BlockEntityType<any>, modifierType: Type<T>, pos: BlockPos, state: BlockState);
    static canCharge(stack: ItemStack): boolean;
    createItemHandler(): ItemStackHandler;
    static createStarlightCharger(pos: BlockPos, state: BlockState): ChargerBlockEntity<StarchargedMaterialModifier>;
    encodeExtraData(buffer: FriendlyByteBuf): void;
    extractItem(slot: number, amount: number, simulate: boolean): ItemStack;
    static getStarlightChargerCatalystTier(catalyst: ItemStack): number;
    getUpdateTag(provider: Provider): CompoundTag;
    isItemValid(slot: number, stack: ItemStack): boolean;
    saveAdditional(tags: CompoundTag, provider: Provider): void;
    setChanged(): void;
    static tick(level: Level, pos: BlockPos, state: BlockState, blockEntity: ChargerBlockEntity<any>): void;
  }


  interface ChargerContainerMenu extends AbstractContainerMenu {}
  class ChargerContainerMenu extends AbstractContainerMenu {
    constructor(type: MenuType<any>, id: number, inv: Inventory, data: FriendlyByteBuf);

    constructor(type: MenuType<any>, id: number, inv: Inventory, blockInv: Container, fields: ContainerData);
    static createStarlightCharger(id: number, inv: Inventory, data: FriendlyByteBuf): ChargerContainerMenu;
    static createStarlightCharger(id: number, inv: Inventory, blockInv: Container, fields: ContainerData): ChargerContainerMenu;
    get charge(): number;
    get chargeMeterHeight(): number;
    get maxCharge(): number;
    get progressArrowScale(): number;
    get structureLevel(): number;
    get workProgress(): number;
    get workTime(): number;
    mayPlace(stack: ItemStack): boolean;
    mayPlace(stack: ItemStack): boolean;
    quickMoveStack(playerIn: Player, index: number): ItemStack;
    stillValid(playerIn: Player): boolean;
  }


  interface ChargerContainerScreen extends AbstractContainerScreen<ChargerContainerMenu> {}
  class ChargerContainerScreen extends AbstractContainerScreen<ChargerContainerMenu> {
    static readonly TEXTURE: ResourceLocation;
    constructor(screenContainer: ChargerContainerMenu, inv: Inventory, titleIn: Component);
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface StarlightChargerBlock extends ModContainerBlock<ChargerBlockEntity> {}
  class StarlightChargerBlock extends ModContainerBlock<ChargerBlockEntity> {
    static readonly CODEC: MapCodec;
    constructor(tileFactory: BlockEntitySupplier<ChargerBlockEntity<StarchargedMaterialModifier>>, properties: Properties);
    getShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getTicker<T extends BlockEntity>(level: Level, state: BlockState, blockEntityType: BlockEntityType<T>): BlockEntityTicker<T>;
  }

}

declare module 'net.silentchaos512.gear.block.charger.ChargerBlockEntity' {
  import { Enum } from 'java.lang';
  import { Level } from 'net.minecraft.world.level';
  import { List } from 'java.util';

  interface WorkTime extends Enum<WorkTime> {}
  class WorkTime extends Enum<WorkTime> {
    static readonly DAYTIME: WorkTime;
    static readonly NIGHTTIME: WorkTime;
    static readonly ANYTIME: WorkTime;
    isWorkTime(level: Level): boolean;
    static valueOf(name: string): WorkTime;
    static values(): WorkTime[];
  }

}

declare module 'net.silentchaos512.gear.block' {
  import { Block, BaseEntityBlock, RenderShape, CropBlock, DropExperienceBlock, SaplingBlock, SimpleWaterloggedBlock, BushBlock, RotatedPillarBlock } from 'net.minecraft.world.level.block';
  import { DyeColor, ItemStack, Item, TooltipFlag } from 'net.minecraft.world.item';
  import { Level, BlockGetter, LevelAccessor } from 'net.minecraft.world.level';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockPos, NonNullList } from 'net.minecraft.core';
  import { Entity } from 'net.minecraft.world.entity';
  import { Properties } from 'BlockBehaviour';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { MenuProvider, InteractionResult } from 'net.minecraft.world';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { BlockEntitySupplier } from 'BlockEntityType';
  import { BlockEntity, BaseContainerBlockEntity } from 'net.minecraft.world.level.block.entity';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BlockHitResult } from 'net.minecraft.world.phys';
  import { Supplier, Function } from 'java.util.function';
  import { IntProvider } from 'net.minecraft.util.valueproviders';
  import { TooltipContext } from 'Item';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { BlockPlaceContext, UseOnContext } from 'net.minecraft.world.item.context';
  import { RandomSource } from 'net.minecraft.util';
  import { ItemStackHandler, IItemHandler } from 'net.neoforged.neoforge.items';
  import { MapCodec } from 'com.mojang.serialization';
  import { ItemAbility } from 'net.neoforged.neoforge.common';

  interface FluffyBlock extends Block {}
  class FluffyBlock extends Block {
    constructor(color: DyeColor);
    fallOn(world: Level, state: BlockState, pos: BlockPos, entity: Entity, distance: number): void;
    get dyeColor(): DyeColor;
    updateEntityAfterFallOn(worldIn: BlockGetter, entityIn: Entity): void;
  }


  interface GearSmithingTableBlock extends Block {}
  class GearSmithingTableBlock extends Block {
    constructor(properties: Properties);
    getShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
  }


  class IDroppableInventory {
    get itemsToDrop(): NonNullList<ItemStack>;
  }


  interface INamedContainerExtraData extends MenuProvider {}
  class INamedContainerExtraData extends MenuProvider {
    encodeExtraData(var1: FriendlyByteBuf): void;
  }


  interface ModContainerBlock<T extends BlockEntity = any> extends BaseEntityBlock {}
  class ModContainerBlock<T extends BlockEntity = any> extends BaseEntityBlock {
    constructor(tileFactory: BlockEntitySupplier<T>, properties: Properties);
    getRenderShape(state: BlockState): RenderShape;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    onRemove(state: BlockState, worldIn: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface ModCropBlock extends CropBlock {}
  class ModCropBlock extends CropBlock {
    constructor(seedItem: Supplier<Item>, builder: Properties);
  }


  interface ModOreBlock extends DropExperienceBlock {}
  class ModOreBlock extends DropExperienceBlock {
    constructor(xpDrop: IntProvider, properties: Properties);
    appendHoverText(stack: ItemStack, tooltipContext: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
  }


  interface NetherwoodSapling extends SaplingBlock {}
  class NetherwoodSapling extends SaplingBlock {
    constructor(properties: Properties);
  }


  interface PhantomLight extends SimpleWaterloggedBlock, Block {}
  class PhantomLight extends SimpleWaterloggedBlock {
    constructor();
    animateTick(stateIn: BlockState, worldIn: Level, pos: BlockPos, rand: RandomSource): void;
    canBeReplaced(state: BlockState, useContext: BlockPlaceContext): boolean;
    getFluidState(state: BlockState): FluidState;
    getRenderShape(state: BlockState): RenderShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    static spawnParticle(worldIn: LevelAccessor, pos: BlockPos, rand: RandomSource): void;
  }


  interface SgContainerBlockEntity extends BaseContainerBlockEntity {}
  class SgContainerBlockEntity extends BaseContainerBlockEntity {
    canPlaceItem(pSlot: number, pStack: ItemStack): boolean;
    clearContent(): void;
    createItemHandler(): ItemStackHandler;
    get containerSize(): number;
    get itemHandler(): IItemHandler;
    getItem(pSlot: number): ItemStack;
    isEmpty(): boolean;
    removeItem(pSlot: number, pAmount: number): ItemStack;
    removeItemNoUpdate(pSlot: number): ItemStack;
    setItem(pSlot: number, pStack: ItemStack): void;
  }


  interface WildCropBlock extends BushBlock {}
  class WildCropBlock extends BushBlock {
    static readonly CODEC: MapCodec;
    constructor(pProperties: Properties);
  }


  interface WoodBlock extends RotatedPillarBlock {}
  class WoodBlock extends RotatedPillarBlock {
    constructor(strippedBlock: Function<Block, Block>, properties: Properties);
    getToolModifiedState(state: BlockState, context: UseOnContext, itemAbility: ItemAbility, simulate: boolean): BlockState;
  }

}

declare module 'net.silentchaos512.gear.block.grader' {
  import { ModContainerBlock, SgContainerBlockEntity } from 'net.silentchaos512.gear.block';
  import { SimpleWaterloggedBlock } from 'net.minecraft.world.level.block';
  import { Properties } from 'BlockBehaviour';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level, BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { InteractionResult, Container } from 'net.minecraft.world';
  import { Player, Inventory } from 'net.minecraft.world.entity.player';
  import { BlockHitResult } from 'net.minecraft.world.phys';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { BlockEntityTicker, BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ClientboundBlockEntityDataPacket } from 'net.minecraft.network.protocol.game';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { Connection, FriendlyByteBuf } from 'net.minecraft.network';
  import { ItemStackHandler } from 'net.neoforged.neoforge.items';
  import { AbstractContainerMenu, ContainerData, ContainerListener } from 'net.minecraft.world.inventory';
  import { MaterialGrade } from 'net.silentchaos512.gear.api.part';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface GraderBlock extends SimpleWaterloggedBlock, ModContainerBlock<GraderBlockEntity> {}
  class GraderBlock extends SimpleWaterloggedBlock {
    constructor(properties: Properties);
    getFluidState(state: BlockState): FluidState;
    getShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    getTicker<T extends BlockEntity>(level: Level, state: BlockState, blockEntityType: BlockEntityType<T>): BlockEntityTicker<T>;
    onRemove(state: BlockState, worldIn: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface GraderBlockEntity extends SgContainerBlockEntity {}
  class GraderBlockEntity extends SgContainerBlockEntity {
    constructor(pos: BlockPos, state: BlockState);
    static canGrade(stack: ItemStack): boolean;
    canPlaceItem(index: number, stack: ItemStack): boolean;
    createItemHandler(): ItemStackHandler;
    extractItem(slot: number, amount: number, simulate: boolean): ItemStack;
    get updatePacket(): ClientboundBlockEntityDataPacket;
    static getCatalystTier(stack: ItemStack): number;
    getUpdateTag(pRegistries: Provider): CompoundTag;
    isItemValid(slot: number, stack: ItemStack): boolean;
    onDataPacket(net: Connection, pkt: ClientboundBlockEntityDataPacket, lookupProvider: Provider): void;
    setChanged(): void;
    static tick(level: Level, pos: BlockPos, state: BlockState, blockEntity: GraderBlockEntity): void;
  }


  interface GraderContainer extends AbstractContainerMenu {}
  class GraderContainer extends AbstractContainerMenu {
    constructor(id: number, playerInventory: Inventory, buffer: FriendlyByteBuf);

    constructor(id: number, playerInventory: Inventory, inventory: Container, fields: ContainerData);
    addSlotListener(listener: ContainerListener): void;
    get lastGradeAttempt(): MaterialGrade;
    get progressArrowScale(): number;
    mayPlace(stack: ItemStack): boolean;
    mayPlace(stack: ItemStack): boolean;
    quickMoveStack(playerIn: Player, index: number): ItemStack;
    stillValid(playerIn: Player): boolean;
  }


  interface GraderScreen extends AbstractContainerScreen<GraderContainer> {}
  class GraderScreen extends AbstractContainerScreen<GraderContainer> {
    static readonly TEXTURE: ResourceLocation;
    constructor(container: GraderContainer, playerInventory: Inventory, title: Component);
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }

}

declare module 'net.silentchaos512.gear.block.press' {
  import { ModContainerBlock, SgContainerBlockEntity } from 'net.silentchaos512.gear.block';
  import { DirectionProperty, BooleanProperty } from 'net.minecraft.world.level.block.state.properties';
  import { MapCodec } from 'com.mojang.serialization';
  import { Properties } from 'BlockBehaviour';
  import { InteractionResult, Container } from 'net.minecraft.world';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level, BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { Player, Inventory } from 'net.minecraft.world.entity.player';
  import { BlockHitResult } from 'net.minecraft.world.phys';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { Rotation, Mirror } from 'net.minecraft.world.level.block';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { BlockEntityTicker, BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { PressingRecipe } from 'net.silentchaos512.gear.crafting.recipe.press';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ItemStackHandler } from 'net.neoforged.neoforge.items';
  import { AbstractContainerMenu, ContainerData } from 'net.minecraft.world.inventory';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface MetalPressBlock extends ModContainerBlock<MetalPressBlockEntity> {}
  class MetalPressBlock extends ModContainerBlock<MetalPressBlockEntity> {
    static readonly FACING: DirectionProperty;
    static readonly LIT: BooleanProperty;
    static readonly CODEC: MapCodec;
    constructor(properties: Properties);
    getShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    getTicker<T extends BlockEntity>(level: Level, state: BlockState, blockEntityType: BlockEntityType<T>): BlockEntityTicker<T>;
    mirror(state: BlockState, mirrorIn: Mirror): BlockState;
    onRemove(state: BlockState, worldIn: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    rotate(state: BlockState, rot: Rotation): BlockState;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface MetalPressBlockEntity extends SgContainerBlockEntity {}
  class MetalPressBlockEntity extends SgContainerBlockEntity {
    constructor(pos: BlockPos, state: BlockState);
    createItemHandler(): ItemStackHandler;
    extractItem(slot: number, amount: number, simulate: boolean): ItemStack;
    getRecipe(stack: ItemStack): PressingRecipe;
    isItemValid(slot: number, stack: ItemStack): boolean;
    setChanged(): void;
    static tick(level: Level, pos: BlockPos, state: BlockState, blockEntity: MetalPressBlockEntity): void;
  }


  interface MetalPressContainer extends AbstractContainerMenu {}
  class MetalPressContainer extends AbstractContainerMenu {
    constructor(id: number, playerInventory: Inventory, buffer: FriendlyByteBuf);

    constructor(id: number, playerInventory: Inventory, inventory: Container, fields: ContainerData);
    get progressArrowScale(): number;
    quickMoveStack(playerIn: Player, index: number): ItemStack;
    stillValid(playerIn: Player): boolean;
  }


  interface MetalPressScreen extends AbstractContainerScreen<MetalPressContainer> {}
  class MetalPressScreen extends AbstractContainerScreen<MetalPressContainer> {
    static readonly TEXTURE: ResourceLocation;
    constructor(screenContainer: MetalPressContainer, inv: Inventory, titleIn: Component);
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }

}

declare module 'net.silentchaos512.gear.block.salvager' {
  import { ModContainerBlock, SgContainerBlockEntity } from 'net.silentchaos512.gear.block';
  import { MapCodec } from 'com.mojang.serialization';
  import { Properties } from 'BlockBehaviour';
  import { InteractionResult, Container } from 'net.minecraft.world';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level, BlockGetter } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { Player, Inventory } from 'net.minecraft.world.entity.player';
  import { BlockHitResult } from 'net.minecraft.world.phys';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { TooltipContext } from 'Item';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { BlockEntityTicker, BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { ItemStackHandler } from 'net.neoforged.neoforge.items';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { AbstractContainerMenu, ContainerData, ContainerListener } from 'net.minecraft.world.inventory';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface SalvagerBlock extends ModContainerBlock<SalvagerBlockEntity> {}
  class SalvagerBlock extends ModContainerBlock<SalvagerBlockEntity> {
    static readonly CODEC: MapCodec;
    constructor(builder: Properties);
    appendHoverText(stack: ItemStack, tooltipContext: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    getShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    getTicker<T extends BlockEntity>(level: Level, state: BlockState, blockEntityType: BlockEntityType<T>): BlockEntityTicker<T>;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, hit: BlockHitResult): InteractionResult;
  }


  interface SalvagerBlockEntity extends SgContainerBlockEntity {}
  class SalvagerBlockEntity extends SgContainerBlockEntity {
    static readonly INVENTORY_SIZE: number;
    constructor(pos: BlockPos, state: BlockState);
    canPlaceItem(index: number, stack: ItemStack): boolean;
    createItemHandler(): ItemStackHandler;
    extractItem(slot: number, amount: number, simulate: boolean): ItemStack;
    get inputItem(): ItemStack;
    getUpdateTag(provider: Provider): CompoundTag;
    isItemValid(slot: number, stack: ItemStack): boolean;
    setChanged(): void;
    static tick(level: Level, pos: BlockPos, state: BlockState, blockEntity: SalvagerBlockEntity): void;
  }


  interface SalvagerContainer extends AbstractContainerMenu {}
  class SalvagerContainer extends AbstractContainerMenu {
    constructor(id: number, playerInventory: Inventory, buffer: FriendlyByteBuf);

    constructor(id: number, playerInventory: Inventory, inventory: Container, fields: ContainerData);
    addSlotListener(listener: ContainerListener): void;
    get progressArrowScale(): number;
    quickMoveStack(playerIn: Player, index: number): ItemStack;
    stillValid(playerIn: Player): boolean;
  }


  interface SalvagerScreen extends AbstractContainerScreen<SalvagerContainer> {}
  class SalvagerScreen extends AbstractContainerScreen<SalvagerContainer> {
    static readonly TEXTURE: ResourceLocation;
    constructor(container: SalvagerContainer, playerInventory: Inventory, title: Component);
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }

}

declare module 'net.silentchaos512.gear.block.stoneanvil' {
  import { BaseEntityBlock, SimpleWaterloggedBlock, RenderShape } from 'net.minecraft.world.level.block';
  import { MapCodec } from 'com.mojang.serialization';
  import { BooleanProperty, DirectionProperty } from 'net.minecraft.world.level.block.state.properties';
  import { Properties } from 'BlockBehaviour';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level, BlockGetter, LevelAccessor } from 'net.minecraft.world.level';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { Clearable, InteractionHand } from 'net.minecraft.world';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Optional } from 'java.util';
  import { RecipeHolder } from 'net.minecraft.world.item.crafting';
  import { ToolActionRecipe } from 'net.silentchaos512.gear.crafting.recipe';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { Packet } from 'net.minecraft.network.protocol';
  import { ClientGamePacketListener, ClientboundBlockEntityDataPacket } from 'net.minecraft.network.protocol.game';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { Connection } from 'net.minecraft.network';

  interface StoneAnvilBlock extends SimpleWaterloggedBlock, BaseEntityBlock {}
  class StoneAnvilBlock extends SimpleWaterloggedBlock {
    static readonly CODEC: MapCodec;
    static readonly WATERLOGGED: BooleanProperty;
    static readonly FACING: DirectionProperty;
    constructor(pProperties: Properties);
    getFluidState(pState: BlockState): FluidState;
    getRenderShape(pState: BlockState): RenderShape;
    getShape(pState: BlockState, pLevel: BlockGetter, pPos: BlockPos, pContext: CollisionContext): VoxelShape;
    getStateForPlacement(pContext: BlockPlaceContext): BlockState;
    newBlockEntity(pPos: BlockPos, pState: BlockState): BlockEntity;
    onRemove(pState: BlockState, pLevel: Level, pPos: BlockPos, pNewState: BlockState, pMovedByPiston: boolean): void;
    updateShape(pState: BlockState, pDirection: Direction, pNeighborState: BlockState, pLevel: LevelAccessor, pPos: BlockPos, pNeighborPos: BlockPos): BlockState;
  }


  interface StoneAnvilBlockEntity extends Clearable, BlockEntity {}
  class StoneAnvilBlockEntity extends Clearable {
    constructor(pPos: BlockPos, pBlockState: BlockState);
    clearContent(): void;
    dropItem(stack: ItemStack): void;
    get item(): ItemStack;
    get updatePacket(): Packet<ClientGamePacketListener>;
    getRecipe(tool: ItemStack, item: ItemStack): Optional<RecipeHolder<ToolActionRecipe>>;
    getUpdateTag(provider: Provider): CompoundTag;
    interact(entity: LivingEntity, stack: ItemStack, hand: InteractionHand): boolean;
    onDataPacket(net: Connection, pkt: ClientboundBlockEntityDataPacket, lookupProvider: Provider): void;
    placeItem(entity: LivingEntity, stack: ItemStack): void;
    takeItem(entity: LivingEntity): boolean;
    workOnItem(entity: LivingEntity, tool: ItemStack, hand: InteractionHand): boolean;
  }

}

declare module 'net.silentchaos512.gear.block.trees' {
  import { ResourceKey } from 'net.minecraft.resources';
  import { TreeConfiguration } from 'net.minecraft.world.level.levelgen.feature.configurations';
  import { Holder } from 'net.minecraft.core';
  import { TreeGrower } from 'net.minecraft.world.level.block.grower';

  class NetherwoodTree {
    static readonly KEY: ResourceKey;
    static readonly TREE_CONFIGURATION: TreeConfiguration;
    static readonly TREE_CONFIGURATION_HOLDER: Holder;
    static readonly GROWER: TreeGrower;
  }

}

declare module 'net.silentchaos512.gear.client' {
  import { Item } from 'RegisterColorHandlersEvent';
  import { ItemStack } from 'net.minecraft.world.item';
  import { DebugRenderOverlay } from 'net.silentchaos512.lib.client.gui';
  import { List } from 'java.util';
  import { KeyMapping } from 'net.minecraft.client';
  import { Key } from 'InputEvent';

  class ColorHandlers {
    static getShieldColor(stack: ItemStack, tintIndex: number): number;
    static onItemColors(event: Item): void;
  }


  interface DebugOverlay extends DebugRenderOverlay {}
  class DebugOverlay extends DebugRenderOverlay {
    get debugText(): string[];
    get splitWidth(): number;
    get textScale(): number;
    isHidden(): boolean;
  }


  class KeyTracker {
    static readonly DISPLAY_PROPERTIES: KeyMapping;
    static readonly DISPLAY_TRAITS: KeyMapping;
    static readonly DISPLAY_CONSTRUCTION: KeyMapping;
    static readonly OPEN_ITEM: KeyMapping;
    static readonly CYCLE_BACK: KeyMapping;
    static readonly CYCLE_NEXT: KeyMapping;
    static getMaterialCycleIndex(total: number): number;
    static isAltDown(): boolean;
    static isControlDown(): boolean;
    static isDisplayConstructionDown(): boolean;
    static isDisplayPropertiesDown(): boolean;
    static isDisplayTraitDescriptionsDown(): boolean;
    static isKeyDown(keycode: number): boolean;
    static isShiftDown(): boolean;
    static onKeyInput(event: Key): void;
  }

}

declare module 'net.silentchaos512.gear.client.event' {
  import { SimpleJsonResourceReloadListener } from 'net.minecraft.server.packs.resources';
  import { Unload, Load } from 'LevelEvent';
  import { BlockPos } from 'net.minecraft.core';
  import { Post } from 'RenderGuiLayerEvent';
  import { Color } from 'net.silentchaos512.lib.util';
  import { ItemTooltipEvent } from 'net.neoforged.neoforge.event.entity.player';

  interface ExtraBlockBreakHandler extends SimpleJsonResourceReloadListener {}
  class ExtraBlockBreakHandler extends SimpleJsonResourceReloadListener {
    static readonly INSTANCE: ExtraBlockBreakHandler;
    sendBlockBreakProgress(breakerId: number, positions: BlockPos[], progress: number): void;
    worldLoad(event: Load): void;
    worldUnload(event: Unload): void;
  }


  class GearHudOverlay {
    renderOverlay(event: Post): void;
  }


  class TooltipHandler {
    static readonly INSTANCE: TooltipHandler;
    static readonly MC_DARK_GRAY: Color;
    static readonly MC_GRAY: Color;
    onTooltip(event: ItemTooltipEvent): void;
  }

}

declare module 'net.silentchaos512.gear.client.gui' {
  import { Button } from 'net.minecraft.client.gui.components';
  import { List } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { OnPress } from 'Button';

  interface TexturedButton extends Button {}
  class TexturedButton extends Button {
    textList: List;
    constructor(resLoc: ResourceLocation, x: number, y: number, texturePosX: number, texturePosY: number, width: number, height: number, action: OnPress);

    constructor(resLoc: ResourceLocation, x: number, y: number, texturePosX: number, texturePosY: number, width: number, height: number, hoverTextList: string[], action: OnPress);
  }

}

declare module 'net.silentchaos512.gear.client.KeyTracker' {
  import { RegisterKeyMappingsEvent } from 'net.neoforged.neoforge.client.event';

  class Registration {
    static registerKeyMappings(event: RegisterKeyMappingsEvent): void;
  }

}

declare module 'net.silentchaos512.gear.client.model' {
  import { Model } from 'net.minecraft.client.model';
  import { ModelResourceLocation } from 'net.minecraft.client.resources.model';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ModelPart } from 'net.minecraft.client.model.geom';
  import { LayerDefinition } from 'net.minecraft.client.model.geom.builders';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { Exception } from 'java.lang';

  interface GearTridentModel extends Model {}
  class GearTridentModel extends Model {
    static readonly TRIDENT_ICON: ModelResourceLocation;
    static readonly TEXTURE: ResourceLocation;
    constructor(root: ModelPart);
    static bakeModel(): GearTridentModel;
    static createGripLayer(): LayerDefinition;
    static createLayer(): LayerDefinition;
    static createSpikesLayer(): LayerDefinition;
    static createTipLayer(): LayerDefinition;
    static createToolRodLayer(): LayerDefinition;
    renderToBuffer(poseStack: PoseStack, buffer: VertexConsumer, packedLight: number, packedOverlay: number, color: number): void;
    renderWithColors(poseStack: PoseStack, buffer: VertexConsumer, packedLight: number, packedOverlay: number, color_toolrod: number, color_grip: number, color_spikes: number, color_tip: number): void;
  }


  class ModelErrorLogging {
    static notifyOfException(exception: Exception, modelType: string): void;
  }

}

declare module 'net.silentchaos512.gear.client.renderer.blockentity' {
  import { BlockEntityRenderer } from 'net.minecraft.client.renderer.blockentity';
  import { StoneAnvilBlockEntity } from 'net.silentchaos512.gear.block.stoneanvil';
  import { Context } from 'BlockEntityRendererProvider';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';

  interface StoneAnvilRenderer extends BlockEntityRenderer<StoneAnvilBlockEntity> {}
  class StoneAnvilRenderer extends BlockEntityRenderer<StoneAnvilBlockEntity> {
    constructor(context: Context);
    render(pBlockEntity: StoneAnvilBlockEntity, pPartialTick: number, pPoseStack: PoseStack, pBuffer: MultiBufferSource, pPackedLight: number, pPackedOverlay: number): void;
  }

}

declare module 'net.silentchaos512.gear.client.renderer.entity' {
  import { EntityRenderer } from 'net.minecraft.client.renderer.entity';
  import { GearArrowEntity, GearTridentProjectile, SlingshotProjectile } from 'net.silentchaos512.gear.entity.projectile';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Context } from 'EntityRendererProvider';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { Pose } from 'PoseStack';

  interface GearArrowRenderer extends EntityRenderer<GearArrowEntity> {}
  class GearArrowRenderer extends EntityRenderer<GearArrowEntity> {
    static readonly GEAR_ARROW_LOCATION: ResourceLocation;
    constructor(context: Context);
    getTextureLocation(entity: GearArrowEntity): ResourceLocation;
    render(entity: GearArrowEntity, entityYaw: number, partialTicks: number, poseStack: PoseStack, buffer: MultiBufferSource, packedLight: number): void;
    vertex(pose: Pose, consumer: VertexConsumer, x: number, y: number, z: number, u: number, v: number, normalX: number, normalY: number, normalZ: number, packedLight: number, color: number): void;
  }


  interface GearTridentProjectileRenderer extends EntityRenderer<GearTridentProjectile> {}
  class GearTridentProjectileRenderer extends EntityRenderer<GearTridentProjectile> {
    static readonly TRIDENT_LOCATION: ResourceLocation;
    constructor(context: Context);
    getTextureLocation(entity: GearTridentProjectile): ResourceLocation;
    render(entity: GearTridentProjectile, entityYaw: number, partialTicks: number, poseStack: PoseStack, buffer: MultiBufferSource, packedLight: number): void;
  }


  interface RenderSlingshotProjectile extends EntityRenderer<SlingshotProjectile> {}
  class RenderSlingshotProjectile extends EntityRenderer<SlingshotProjectile> {
    constructor(context: Context);
    getTextureLocation(entity: SlingshotProjectile): ResourceLocation;
    render(entityIn: SlingshotProjectile, entityYaw: number, partialTicks: number, matrixStackIn: PoseStack, bufferIn: MultiBufferSource, packedLightIn: number): void;
  }

}

declare module 'net.silentchaos512.gear.client.renderer' {
  import { BlockEntityWithoutLevelRenderer, MultiBufferSource } from 'net.minecraft.client.renderer';
  import { ItemStack, ItemDisplayContext } from 'net.minecraft.world.item';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { IClientItemExtensions } from 'net.neoforged.neoforge.client.extensions.common';
  import { LocalPlayer } from 'net.minecraft.client.player';
  import { HumanoidArm } from 'net.minecraft.world.entity';

  interface SgBlockEntityWithoutLevelRenderer extends BlockEntityWithoutLevelRenderer {}
  class SgBlockEntityWithoutLevelRenderer extends BlockEntityWithoutLevelRenderer {
    constructor();
    renderByItem(stack: ItemStack, transform: ItemDisplayContext, poseStack: PoseStack, bufferSource: MultiBufferSource, packedLight: number, packedOverlay: number): void;
  }


  interface SgClientItemExtensions extends IClientItemExtensions {}
  class SgClientItemExtensions extends IClientItemExtensions {
    applyForgeHandTransform(poseStack: PoseStack, player: LocalPlayer, humanoidarm: HumanoidArm, stack: ItemStack, partialTicks: number, equippedProgress: number, swingProcess: number): boolean;
    get customRenderer(): BlockEntityWithoutLevelRenderer;
  }

}

declare module 'net.silentchaos512.gear.client.screen' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface GuideBookScreen extends Screen {}
  class GuideBookScreen extends Screen {
    static readonly TEXTURE: ResourceLocation;
    constructor(titleIn: Component);
    isPauseScreen(): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }

}

declare module 'net.silentchaos512.gear.client.util' {
  import { Cache } from 'com.google.common.cache';
  import { GearItem } from 'net.silentchaos512.gear.api.item';
  import { PartInstance } from 'net.silentchaos512.gear.gear.part';
  import { Collection, List } from 'java.util';
  import { MaterialInstance } from 'net.silentchaos512.gear.gear.material';
  import { CompoundPartItem } from 'net.silentchaos512.gear.item';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { PartType } from 'net.silentchaos512.gear.api.part';
  import { TooltipContext } from 'Item';
  import { Component } from 'net.minecraft.network.chat';
  import { ItemPropertyFunction } from 'net.minecraft.client.renderer.item';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';

  class ColorUtils {
    static readonly GEAR_COLOR_CACHE: Cache;
    static getBlendedColor(item: GearItem, part: PartInstance, materials: Collection<MaterialInstance>): number;
    static getBlendedColor(item: CompoundPartItem, materials: Collection<MaterialInstance>): number;
    static getBlendedColorForCompoundMaterial(materials: Collection<MaterialInstance>): number;
    static getBlendedColorForPartInGear(stack: ItemStack, partType: PartType): number;
    static getCachedColor(stack: ItemStack, partType: PartType, animationFrame: number): number;
    static hasCachedColor(stack: ItemStack, partType: PartType, animationFrame: number): boolean;
    static setCachedColor(stack: ItemStack, partType: PartType, animationFrame: number, color: number): void;
  }


  class GearClientHelper {
    static addInformation(stack: ItemStack, context: TooltipContext, tooltip: Component[], flag: TooltipFlag): void;
    static addInformation(stack: ItemStack, context: TooltipContext, tooltip: Component[], flag: GearTooltipFlag): void;
    static addPropertiesInfo(stack: ItemStack, tooltip: Component[], flag: GearTooltipFlag, item: GearItem): void;
    static getColor(stack: ItemStack, layer: PartType): number;
    static hasEffect(stack: ItemStack): boolean;
    static shouldCauseReequipAnimation(oldStack: ItemStack, newStack: ItemStack, slotChanged: boolean): boolean;
    static tooltipListParts(gear: ItemStack, tooltip: Component[], parts: Collection<PartInstance>, flag: GearTooltipFlag): void;
  }


  class ModelPropertiesHelper {
    static get(stack: ItemStack, id: ResourceLocation): ItemPropertyFunction;
    static getValue(stack: ItemStack, id: ResourceLocation, world: ClientLevel, entity: LivingEntity): number;
  }


  class ModItemModelProperties {
    static register(event: FMLClientSetupEvent): void;
  }


  class TextListBuilder {
    static readonly BULLETS: string[];
    static readonly VANILLA_BULLET: string;
    add(text: Component): TextListBuilder;
    build(): Component[];
    indent(): TextListBuilder;
    removeLast(): TextListBuilder;
    unindent(): TextListBuilder;
  }

}

declare module 'net.silentchaos512.gear.command' {
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack } from 'net.minecraft.commands';

  class GradeCommand {
    static register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }


  class MaterialsCommand {
    static register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
    static runDumpClient(includeChildren: boolean): void;
  }


  class PartsCommand {
    static register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }


  class PropertiesCommand {
    static register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }


  class RandomGearCommand {
    static register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }


  class SetDamageCommand {
    static register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }


  class TraitsCommand {
    static register(dispatcher: CommandDispatcher<CommandSourceStack>): void;
    static runDumpMdClient(): void;
  }

}

declare module 'net.silentchaos512.gear.compat.caelus' {
  import { Builder } from 'ItemAttributeModifiers';
  import { Multimap } from 'com.google.common.collect';
  import { Holder } from 'net.minecraft.core';
  import { Attribute, AttributeModifier } from 'net.minecraft.world.entity.ai.attributes';

  class CaelusCompat {
    static tryAddFlightAttribute(builder: Builder): void;
    static tryAddFlightAttribute(attributeMap: Multimap<Holder<Attribute>, AttributeModifier>): void;
  }


  class CaelusCompatProxy {
    static addFlightAttribute(attributeMap: Multimap<Holder<Attribute>, AttributeModifier>): void;
  }

}

declare module 'net.silentchaos512.gear.compat.curios' {
  import { RegisterCapabilitiesEvent } from 'net.neoforged.neoforge.capabilities';
  import { SlotContext } from 'top.theillusivec4.curios.api';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { DataResource } from 'net.silentchaos512.gear.api.util';
  import { Trait } from 'net.silentchaos512.gear.gear.trait';
  import { Collection } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IEventBus } from 'net.neoforged.bus.api';

  class CurioGearItemCapability {
    curioTick(context: SlotContext): void;
    static registerCapabilities(event: RegisterCapabilitiesEvent): void;
  }


  class CuriosCompat {
    static getEquippedCurios(entity: LivingEntity): Collection<ItemStack>;
    static getHighestTraitLevel(entity: LivingEntity, trait: DataResource<Trait>): number;
    static registerEventHandlers(modEventBus: IEventBus): void;
  }

}

declare module 'net.silentchaos512.gear.compat.curios.CurioGearItemCapability' {
  import { ICurio } from 'top.theillusivec4.curios.api.type.capability';
  import { ItemStack } from 'net.minecraft.world.item';
  import { SlotContext } from 'top.theillusivec4.curios.api';
  import { Multimap } from 'com.google.common.collect';
  import { Holder } from 'net.minecraft.core';
  import { Attribute, AttributeModifier } from 'net.minecraft.world.entity.ai.attributes';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { LootContext } from 'net.minecraft.world.level.storage.loot';
  import { DropRule, SoundInfo } from 'ICurio';
  import { DamageSource } from 'net.minecraft.world.damagesource';

  interface GearCurio extends ICurio {}
  class GearCurio extends ICurio {
    canEquipFromUse(slotContext: SlotContext): boolean;
    curioTick(slotContext: SlotContext): void;
    get stack(): ItemStack;
    getAttributeModifiers(slotContext: SlotContext, id: ResourceLocation): Multimap<Holder<Attribute>, AttributeModifier>;
    getDropRule(slotContext: SlotContext, source: DamageSource, recentlyHit: boolean): DropRule;
    getEquipSound(slotContext: SlotContext): SoundInfo;
    getFortuneLevel(slotContext: SlotContext, lootContext: LootContext): number;
    getLootingLevel(slotContext: SlotContext, lootContext: LootContext): number;
    makesPiglinsNeutral(slotContext: SlotContext): boolean;
  }

}

declare module 'net.silentchaos512.gear.compat.jei' {
  import { IRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { AlloyRecipe } from 'net.silentchaos512.gear.crafting.recipe.alloy';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { AlloyMakerInfo } from 'net.silentchaos512.gear.block.alloymaker';
  import { IGuiHelper } from 'mezz.jei.api.helpers';
  import { RecipeType, IFocusGroup } from 'mezz.jei.api.recipe';
  import { Component } from 'net.minecraft.network.chat';
  import { IDrawable } from 'mezz.jei.api.gui.drawable';
  import { IRecipeLayoutBuilder } from 'mezz.jei.api.gui.builder';
  import { IRecipeSlotsView } from 'mezz.jei.api.gui.ingredient';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { CraftingRecipe } from 'net.minecraft.world.item.crafting';
  import { GraderRecipe } from 'net.silentchaos512.gear.compat.jei.MaterialGraderRecipeCategory';
  import { List } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { SalvagingRecipe } from 'net.silentchaos512.gear.crafting.recipe.salvage';
  import { ToolActionRecipe } from 'net.silentchaos512.gear.crafting.recipe';

  interface AlloyMakingRecipeCategory extends IRecipeCategory<AlloyRecipe> {}
  class AlloyMakingRecipeCategory extends IRecipeCategory<AlloyRecipe> {
    static readonly TEXTURE: ResourceLocation;
    constructor(info: AlloyMakerInfo<any>, categoryName: string, guiHelper: IGuiHelper);
    draw(recipe: AlloyRecipe, recipeSlotsView: IRecipeSlotsView, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get height(): number;
    get icon(): IDrawable;
    get recipeType(): RecipeType<AlloyRecipe>;
    get title(): Component;
    get width(): number;
    setRecipe(builder: IRecipeLayoutBuilder, recipe: AlloyRecipe, focuses: IFocusGroup): void;
  }


  interface GearCraftingRecipeCategoryJei extends IRecipeCategory<CraftingRecipe> {}
  class GearCraftingRecipeCategoryJei extends IRecipeCategory<CraftingRecipe> {
    static readonly WIDTH: number;
    static readonly HEIGHT: number;
    constructor(guiHelper: IGuiHelper);
    draw(recipe: CraftingRecipe, recipeSlotsView: IRecipeSlotsView, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get height(): number;
    get icon(): IDrawable;
    get recipeType(): RecipeType<CraftingRecipe>;
    get title(): Component;
    get width(): number;
    setRecipe(builder: IRecipeLayoutBuilder, recipe: CraftingRecipe, focuses: IFocusGroup): void;
  }


  interface MaterialGraderRecipeCategory extends IRecipeCategory<GraderRecipe> {}
  class MaterialGraderRecipeCategory extends IRecipeCategory<GraderRecipe> {
    constructor(guiHelper: IGuiHelper);
    draw(recipe: GraderRecipe, recipeSlotsView: IRecipeSlotsView, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    static get catalysts(): ItemStack[];
    get height(): number;
    get icon(): IDrawable;
    static get materials(): ItemStack[];
    get recipeType(): RecipeType<GraderRecipe>;
    get title(): Component;
    get width(): number;
    setRecipe(builder: IRecipeLayoutBuilder, recipe: GraderRecipe, focuses: IFocusGroup): void;
  }


  interface SalvagingRecipeCategoryJei extends IRecipeCategory<SalvagingRecipe> {}
  class SalvagingRecipeCategoryJei extends IRecipeCategory<SalvagingRecipe> {
    constructor(guiHelper: IGuiHelper);
    draw(recipe: SalvagingRecipe, recipeSlotsView: IRecipeSlotsView, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get height(): number;
    get icon(): IDrawable;
    get recipeType(): RecipeType<SalvagingRecipe>;
    get title(): Component;
    get width(): number;
    setRecipe(builder: IRecipeLayoutBuilder, recipe: SalvagingRecipe, focuses: IFocusGroup): void;
  }


  interface ToolActionRecipeCategory extends IRecipeCategory<ToolActionRecipe> {}
  class ToolActionRecipeCategory extends IRecipeCategory<ToolActionRecipe> {
    constructor(guiHelper: IGuiHelper);
    draw(recipe: ToolActionRecipe, recipeSlotsView: IRecipeSlotsView, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get height(): number;
    get icon(): IDrawable;
    get recipeType(): RecipeType<ToolActionRecipe>;
    get title(): Component;
    get width(): number;
    setRecipe(builder: IRecipeLayoutBuilder, recipe: ToolActionRecipe, focus: IFocusGroup): void;
  }

}

declare module 'net.silentchaos512.gear.compat.jei.MaterialGraderRecipeCategory' {
  class GraderRecipe {
  }

}

declare module 'net.silentchaos512.gear' {
  import { ModConfigEvent } from 'net.neoforged.fml.event.config';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Level } from 'net.minecraft.world.level';
  import { MinecraftServer } from 'net.minecraft.server';
  import { Component } from 'net.minecraft.network.chat';
  import { Random } from 'java.util';
  import { RandomSource } from 'net.minecraft.util';
  import { Logger } from 'org.apache.logging.log4j';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';
  import { ResourceLocation } from 'net.minecraft.resources';

  class Config {
    static onLoad(event: ModConfigEvent): void;
  }


  class IProxy {
    checkClientConnection(): boolean;
    checkClientInstance(): boolean;
    get clientLevel(): Level;
    get clientPlayer(): Player;
    get server(): MinecraftServer;
  }


  interface SideProxy extends IProxy {}
  class SideProxy extends IProxy {
    checkClientConnection(): boolean;
    checkClientInstance(): boolean;
    static detectDataLoadingFailure(player: Player): Component;
    get clientLevel(): Level;
    get clientPlayer(): Player;
    get server(): MinecraftServer;
  }


  class SilentGear {
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static readonly RESOURCE_PREFIX: string;
    static readonly RANDOM: Random;
    static readonly RANDOM_SOURCE: RandomSource;
    static readonly LOGGER: Logger;
    static INSTANCE: SilentGear;
    static PROXY: IProxy;
    constructor(modEventBus: IEventBus, modContainer: ModContainer);
    static get version(): string;
    static getId(path: string): ResourceLocation;
    static getIdWithDefaultNamespace(name: string): ResourceLocation;
    static getVersion(correctInDev: boolean): string;
    static isDevBuild(): boolean;
    static shortenId(id: ResourceLocation): string;
  }

}

declare module 'net.silentchaos512.gear.Config' {
  import { BooleanValue, EnumValue, DoubleValue, IntValue } from 'ModConfigSpec';
  import { GearPropertyValue, GearProperty } from 'net.silentchaos512.gear.api.property';
  import { Item } from 'net.minecraft.world.item';

  class Client {
    static readonly allowEnchantedEffect: BooleanValue;
    static readonly showMaterialTooltips: BooleanValue;
    static readonly showPartTooltips: BooleanValue;
    static readonly vanillaStyleTooltips: BooleanValue;
  }


  class Common {
    static readonly blueprintTypes: EnumValue;
    static readonly spawnWithStarterBlueprints: BooleanValue;
    static readonly crudeMixerPropertyMultiplier: DoubleValue;
    static readonly nerfedItemsEnabled: BooleanValue;
    static readonly nerfedItemDurabilityMulti: DoubleValue;
    static readonly nerfedItemHarvestSpeedMulti: DoubleValue;
    static readonly allowConversionRecipes: BooleanValue;
    static readonly allowEnchanting: BooleanValue;
    static readonly forceRemoveEnchantments: BooleanValue;
    static readonly sendGearBrokenMessage: BooleanValue;
    static readonly matchModeStandard: EnumValue;
    static readonly matchModeOres: EnumValue;
    static readonly damageFactorLevels: IntValue;
    static readonly gearBreaksPermanently: BooleanValue;
    static readonly graderMedianGrade: EnumValue;
    static readonly graderStandardDeviation: DoubleValue;
    static readonly graderCanGradeParts: BooleanValue;
    static readonly prospectorHammerRange: IntValue;
    static readonly repairFactorAnvil: DoubleValue;
    static readonly repairKitVeryCrudeCapacity: IntValue;
    static readonly repairKitCrudeCapacity: IntValue;
    static readonly repairKitSturdyCapacity: IntValue;
    static readonly repairKitCrimsonCapacity: IntValue;
    static readonly repairKitAzureCapacity: IntValue;
    static readonly repairKitVeryCrudeEfficiency: DoubleValue;
    static readonly repairKitCrudeEfficiency: DoubleValue;
    static readonly repairKitSturdyEfficiency: DoubleValue;
    static readonly repairKitCrimsonEfficiency: DoubleValue;
    static readonly repairKitAzureEfficiency: DoubleValue;
    static readonly missingRepairKitEfficiency: DoubleValue;
    static readonly sawRecursionDepth: IntValue;
    static readonly upgradesInAnvilOnly: BooleanValue;
    static readonly destroySwappedParts: BooleanValue;
    static readonly magnetPullDisabledOnCrouch: BooleanValue;
    static readonly salvagerMinLossRate: DoubleValue;
    static readonly salvagerMaxLossRate: DoubleValue;
    static readonly salvagerBreakDownPartsWithGear: BooleanValue;
    static readonly starlightChargerChargeRate: IntValue;
    static readonly starlightChargerMaxCharge: IntValue;
    static readonly starlightChargerWorkTime: EnumValue;
    static readonly starlightChargerRequiresViewOfSky: BooleanValue;
    static readonly starlightChargerCanChargeParts: BooleanValue;
    static readonly propertiesDebugLogging: BooleanValue;
    static readonly showWipText: BooleanValue;
    static getPropertyBonusMultiplier(property: GearProperty<any, any>): GearPropertyValue<any>;
    static isLoaded(): boolean;
    static isNerfedItem(item: Item): boolean;
  }

}

declare module 'net.silentchaos512.gear.core' {
  import { Enum } from 'java.lang';
  import { DataResource } from 'net.silentchaos512.gear.api.util';
  import { Material } from 'net.silentchaos512.gear.api.material';
  import { HarvestTier } from 'net.silentchaos512.gear.api.property';
  import { Function } from 'java.util.function';
  import { TagKey } from 'net.minecraft.tags';
  import { Block } from 'net.minecraft.world.level.block';
  import { IntrinsicTagAppender } from 'IntrinsicHolderTagsProvider';
  import { List } from 'java.util';
  import { ItemEntity } from 'net.minecraft.world.entity.item';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Post } from 'LevelTickEvent';

  interface BuiltinMaterials extends Enum<BuiltinMaterials> {}
  class BuiltinMaterials extends Enum<BuiltinMaterials> {
    static readonly WOOD: BuiltinMaterials;
    static readonly NETHERWOOD: BuiltinMaterials;
    static readonly BAMBOO: BuiltinMaterials;
    static readonly BONE: BuiltinMaterials;
    static readonly STONE: BuiltinMaterials;
    static readonly BASALT: BuiltinMaterials;
    static readonly BLACKSTONE: BuiltinMaterials;
    static readonly END_STONE: BuiltinMaterials;
    static readonly FLINT: BuiltinMaterials;
    static readonly NETHERRACK: BuiltinMaterials;
    static readonly OBSIDIAN: BuiltinMaterials;
    static readonly SANDSTONE: BuiltinMaterials;
    static readonly TERRACOTTA: BuiltinMaterials;
    static readonly COPPER: BuiltinMaterials;
    static readonly GOLD: BuiltinMaterials;
    static readonly IRON: BuiltinMaterials;
    static readonly DIAMOND: BuiltinMaterials;
    static readonly EMERALD: BuiltinMaterials;
    static readonly LAPIS_LAZULI: BuiltinMaterials;
    static readonly QUARTZ: BuiltinMaterials;
    static readonly AMETHYST: BuiltinMaterials;
    static readonly DIMERALD: BuiltinMaterials;
    static readonly BLAZE_GOLD: BuiltinMaterials;
    static readonly BRONZE: BuiltinMaterials;
    static readonly HIGH_CARBON_STEEL: BuiltinMaterials;
    static readonly CRIMSON_IRON: BuiltinMaterials;
    static readonly CRIMSON_STEEL: BuiltinMaterials;
    static readonly AZURE_SILVER: BuiltinMaterials;
    static readonly AZURE_ELECTRUM: BuiltinMaterials;
    static readonly TYRIAN_STEEL: BuiltinMaterials;
    generateTag(tagProvider: Function<TagKey<Block>, IntrinsicTagAppender<Block>>): void;
    get harvestTier(): HarvestTier;
    get material(): DataResource<Material>;
    static valueOf(name: string): BuiltinMaterials;
    static values(): BuiltinMaterials[];
  }


  class MagnetPullTracker {
    static onLevelTick(event: Post): void;
    static pushItem(item: ItemEntity, force: Vec3): void;
  }

}

declare module 'net.silentchaos512.gear.core.component' {
  import { Codec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Map, List } from 'java.util';
  import { GearProperty, GearPropertyValue, NumberProperty } from 'net.silentchaos512.gear.api.property';
  import { Supplier } from 'java.util.function';
  import { TraitInstance } from 'net.silentchaos512.gear.api.traits';

  interface GearPropertiesData extends Record {}
  class GearPropertiesData extends Record {
    static readonly EMPTY: GearPropertiesData;
    static readonly CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(properties: Map<GearProperty<any, any>, GearPropertyValue<any>>);
    contains(property: GearProperty<any, any>): boolean;
    equals(o: any): boolean;
    get<T, V extends GearPropertyValue<T>, P extends GearProperty<T, V>>(propertyType: Supplier<P>): V;
    get<T, V extends GearPropertyValue<T>, P extends GearProperty<T, V>>(propertyType: P): V;
    get traits(): TraitInstance[];
    getNumber(propertyType: Supplier<NumberProperty>): number;
    getNumber(propertyType: Supplier<NumberProperty>, defaultValue: number): number;
    getNumber(propertyType: NumberProperty): number;
    getNumber(propertyType: NumberProperty, defaultValue: number): number;
    getNumberInt(propertyType: Supplier<NumberProperty>): number;
    getOrDefault<T, V extends GearPropertyValue<T>, P extends GearProperty<T, V>>(propertyType: Supplier<P>, defaultValue: V): V;
    getOrDefault<T, V extends GearPropertyValue<T>, P extends GearProperty<T, V>>(propertyType: P, defaultValue: V): V;
    hashCode(): number;
    properties(): Map<GearProperty<any, GearPropertyValue<any>>, GearPropertyValue<any>>;
    toString(): string;
  }

}

declare module 'net.silentchaos512.gear.crafting.ingredient' {
  import { ICustomIngredient, IngredientType } from 'net.neoforged.neoforge.common.crafting';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { GearItemSet, CustomMaterialItem } from 'net.silentchaos512.gear.item';
  import { Stream } from 'java.util.stream';
  import { PartType, MaterialGrade } from 'net.silentchaos512.gear.api.part';
  import { GearType } from 'net.silentchaos512.gear.api.item';
  import { Optional, Collection, Set } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { Material, IMaterialCategory } from 'net.silentchaos512.gear.api.material';
  import { DataResource } from 'net.silentchaos512.gear.api.util';
  import { Builder } from 'net.silentchaos512.gear.crafting.ingredient.PartMaterialIngredient';

  interface BlueprintIngredient extends ICustomIngredient, IGearIngredient {}
  class BlueprintIngredient extends ICustomIngredient {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    get gearType(): GearType;
    get items(): Stream<ItemStack>;
    get jeiHint(): Optional<Component>;
    get partType(): PartType;
    get type(): IngredientType<any>;
    isSimple(): boolean;
    static of<T extends Item>(item: T): BlueprintIngredient;
    static of(gearItemSet: GearItemSet<any>): BlueprintIngredient;
    test(stack: ItemStack): boolean;
  }


  interface CustomAlloyIngredient extends ICustomIngredient {}
  class CustomAlloyIngredient extends ICustomIngredient {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    get items(): Stream<ItemStack>;
    get type(): IngredientType<any>;
    isSimple(): boolean;
    static of(item: CustomMaterialItem, material: Material): CustomAlloyIngredient;
    static of(item: CustomMaterialItem, material: DataResource<Material>): CustomAlloyIngredient;
    test(stack: ItemStack): boolean;
  }


  interface GearPartIngredient extends ICustomIngredient, IGearIngredient {}
  class GearPartIngredient extends ICustomIngredient {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    get items(): Stream<ItemStack>;
    get jeiHint(): Optional<Component>;
    get partType(): PartType;
    get type(): IngredientType<any>;
    isSimple(): boolean;
    static of(type: PartType): GearPartIngredient;
    test(stack: ItemStack): boolean;
  }


  interface GearTypeIngredient extends ICustomIngredient {}
  class GearTypeIngredient extends ICustomIngredient {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(type: GearType);
    get items(): Stream<ItemStack>;
    get type(): IngredientType<any>;
    isSimple(): boolean;
    static of(type: GearType): GearTypeIngredient;
    test(stack: ItemStack): boolean;
  }


  class IGearIngredient {
    get gearType(): GearType;
    get jeiHint(): Optional<Component>;
    get partType(): PartType;
  }


  interface PartMaterialIngredient extends ICustomIngredient, IGearIngredient {}
  class PartMaterialIngredient extends ICustomIngredient {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(partType: PartType, gearType: GearType, minGrade: MaterialGrade, maxGrade: MaterialGrade, material: DataResource<Material>, categories: Collection<IMaterialCategory>, notCategories: Collection<IMaterialCategory>);
    static builder(partType: PartType): Builder;
    static builder(partType: PartType, gearType: GearType): Builder;
    get categories(): Set<IMaterialCategory>;
    get gearType(): GearType;
    get items(): Stream<ItemStack>;
    get jeiHint(): Optional<Component>;
    get partType(): PartType;
    get type(): IngredientType<any>;
    isSimple(): boolean;
    not(...notCategories: IMaterialCategory[]): PartMaterialIngredient;
    static of(partType: PartType): PartMaterialIngredient;
    static of(partType: PartType, ...categories: IMaterialCategory[]): PartMaterialIngredient;
    static of(partType: PartType, gearType: GearType): PartMaterialIngredient;
    static of(partType: PartType, gearType: GearType, ...categories: IMaterialCategory[]): PartMaterialIngredient;
    test(stack: ItemStack): boolean;
  }

}

declare module 'net.silentchaos512.gear.crafting.ingredient.PartMaterialIngredient' {
  import { PartType, MaterialGrade } from 'net.silentchaos512.gear.api.part';
  import { GearType } from 'net.silentchaos512.gear.api.item';
  import { IMaterialCategory, Material } from 'net.silentchaos512.gear.api.material';
  import { DataResource } from 'net.silentchaos512.gear.api.util';
  import { PartMaterialIngredient } from 'net.silentchaos512.gear.crafting.ingredient';

  class Builder {
    constructor(partType: PartType, gearType: GearType);
    build(): PartMaterialIngredient;
    withCategories(...categories: IMaterialCategory[]): Builder;
    withGrade(min: MaterialGrade, max: MaterialGrade): Builder;
    withMaterial(material: DataResource<Material>): Builder;
    withoutCategories(...notCategories: IMaterialCategory[]): Builder;
  }

}

declare module 'net.silentchaos512.gear.crafting.recipe.alloy' {
  import { Recipe, Ingredient, RecipeSerializer, RecipeType, RecipeInput } from 'net.minecraft.world.item.crafting';
  import { Result } from 'net.silentchaos512.gear.crafting.recipe.alloy.AlloyRecipe';
  import { List } from 'java.util';
  import { AlloyMakerInfo, AlloyMakerBlockEntity } from 'net.silentchaos512.gear.block.alloymaker';
  import { BiFunction } from 'java.util.function';
  import { Level } from 'net.minecraft.world.level';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Provider } from 'HolderLookup';
  import { NonNullList } from 'net.minecraft.core';

  interface AlloyRecipe extends Recipe<AlloyRecipeInput> {}
  class AlloyRecipe extends Recipe<AlloyRecipeInput> {
    constructor(result: Result, ingredients: Ingredient[]);
    assemble(inv: AlloyRecipeInput, registryAccess: Provider): ItemStack;
    canCraftInDimensions(width: number, height: number): boolean;
    get ingredients(): NonNullList<Ingredient>;
    get serializer(): RecipeSerializer<any>;
    get type(): RecipeType<any>;
    getResultItem(registryAccess: Provider): ItemStack;
    isSpecial(): boolean;
    static makeExample<R extends AlloyRecipe>(info: AlloyMakerInfo<any>, count: number, recipeFactory: BiFunction<Result, Ingredient[], R>): R;
    matches(inv: AlloyRecipeInput, worldIn: Level): boolean;
  }


  interface AlloyRecipeInput extends RecipeInput {}
  class AlloyRecipeInput extends RecipeInput {
    getItem(pIndex: number): ItemStack;
    static of(blockEntity: AlloyMakerBlockEntity<any>): AlloyRecipeInput;
    size(): number;
  }


  interface CrudeAlloyRecipe extends AlloyRecipe {}
  class CrudeAlloyRecipe extends AlloyRecipe {
    constructor(result: Result, ingredients: Ingredient[]);
    get serializer(): RecipeSerializer<any>;
    get type(): RecipeType<any>;
  }


  interface FabricAlloyRecipe extends AlloyRecipe {}
  class FabricAlloyRecipe extends AlloyRecipe {
    constructor(result: Result, ingredients: Ingredient[]);
    get serializer(): RecipeSerializer<any>;
    get type(): RecipeType<any>;
  }


  interface GemAlloyRecipe extends AlloyRecipe {}
  class GemAlloyRecipe extends AlloyRecipe {
    constructor(result: Result, ingredients: Ingredient[]);
    get serializer(): RecipeSerializer<any>;
    get type(): RecipeType<any>;
  }


  interface MetalAlloyRecipe extends AlloyRecipe {}
  class MetalAlloyRecipe extends AlloyRecipe {
    constructor(result: Result, ingredients: Ingredient[]);
    get serializer(): RecipeSerializer<any>;
    get type(): RecipeType<any>;
  }


  interface SuperAlloyRecipe extends AlloyRecipe {}
  class SuperAlloyRecipe extends AlloyRecipe {
    constructor(result: Result, ingredients: Ingredient[]);
    get serializer(): RecipeSerializer<any>;
    get type(): RecipeType<any>;
  }

}

declare module 'net.silentchaos512.gear.crafting.recipe.alloy.AlloyRecipe' {
  import { RecipeSerializer, Ingredient } from 'net.minecraft.world.item.crafting';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { List } from 'java.util';

  interface Serializer<T extends AlloyRecipe = any> extends RecipeSerializer<T> {}
  class Serializer<T extends AlloyRecipe = any> extends RecipeSerializer<T> {
    constructor(factory: Factory<T>);
    codec(): MapCodec<T>;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, T>;
  }


  class Factory<R extends AlloyRecipe = any> {
    create(var1: Result, var2: Ingredient[]): R;
  }

}

declare module 'net.silentchaos512.gear.crafting.recipe' {
  import { ExtendedShapelessRecipe, ExtendedShapedRecipe } from 'net.silentchaos512.lib.crafting.recipe';
  import { CraftingBookCategory, Ingredient, RecipeSerializer, CraftingInput, CustomRecipe, ShapedRecipePattern, Recipe, RecipeType } from 'net.minecraft.world.item.crafting';
  import { Result } from 'net.silentchaos512.gear.crafting.recipe.ConversionRecipe';
  import { NonNullList } from 'net.minecraft.core';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Provider } from 'HolderLookup';
  import { Level } from 'net.minecraft.world.level';
  import { GearItem } from 'net.silentchaos512.gear.api.item';
  import { Input } from 'net.silentchaos512.gear.crafting.recipe.ToolActionRecipe';
  import { SoundPlayback } from 'net.silentchaos512.gear.core';

  interface ConversionRecipe extends ExtendedShapelessRecipe {}
  class ConversionRecipe extends ExtendedShapelessRecipe {
    constructor(pGroup: string, pCategory: CraftingBookCategory, pResult: Result, pIngredients: NonNullList<Ingredient>);
    assemble(inv: CraftingInput, registryAccess: Provider): ItemStack;
    get serializer(): RecipeSerializer<any>;
    isSpecial(): boolean;
  }


  interface FillRepairKitRecipe extends CustomRecipe {}
  class FillRepairKitRecipe extends CustomRecipe {
    constructor(bookCategory: CraftingBookCategory);
    assemble(inv: CraftingInput, registryAccess: Provider): ItemStack;
    canCraftInDimensions(width: number, height: number): boolean;
    get serializer(): RecipeSerializer<any>;
    matches(inv: CraftingInput, worldIn: Level): boolean;
  }


  interface GearPartSwapRecipe extends CustomRecipe {}
  class GearPartSwapRecipe extends CustomRecipe {
    constructor(bookCategory: CraftingBookCategory);
    assemble(inv: CraftingInput, registryAccess: Provider): ItemStack;
    canCraftInDimensions(width: number, height: number): boolean;
    get serializer(): RecipeSerializer<any>;
    getRemainingItems(inv: CraftingInput): NonNullList<ItemStack>;
    matches(inv: CraftingInput, worldIn: Level): boolean;
  }


  interface ModKitRemovePartRecipe extends CustomRecipe {}
  class ModKitRemovePartRecipe extends CustomRecipe {
    constructor(bookCategory: CraftingBookCategory);
    assemble(inv: CraftingInput, registryAccess: Provider): ItemStack;
    canCraftInDimensions(width: number, height: number): boolean;
    get serializer(): RecipeSerializer<any>;
    getRemainingItems(inv: CraftingInput): NonNullList<ItemStack>;
    matches(inv: CraftingInput, worldIn: Level): boolean;
  }


  interface QuickRepairRecipe extends CustomRecipe {}
  class QuickRepairRecipe extends CustomRecipe {
    constructor(bookCategory: CraftingBookCategory);
    assemble(inv: CraftingInput, registryAccess: Provider): ItemStack;
    canCraftInDimensions(width: number, height: number): boolean;
    get serializer(): RecipeSerializer<any>;
    getRemainingItems(inv: CraftingInput): NonNullList<ItemStack>;
    matches(inv: CraftingInput, worldIn: Level): boolean;
  }


  interface ShapedGearRecipe extends IGearRecipe, ExtendedShapedRecipe {}
  class ShapedGearRecipe extends IGearRecipe {
    constructor(pGroup: string, pCategory: CraftingBookCategory, pPattern: ShapedRecipePattern, pResult: ItemStack, pShowNotification: boolean);
    assemble(inv: CraftingInput, registryAccess: Provider): ItemStack;
    get outputItem(): GearItem;
    get serializer(): RecipeSerializer<any>;
    getResultItem(registryAccess: Provider): ItemStack;
    isSpecial(): boolean;
    matches(inv: CraftingInput, worldIn: Level): boolean;
  }


  interface ShapelessCompoundPartRecipe extends ExtendedShapelessRecipe {}
  class ShapelessCompoundPartRecipe extends ExtendedShapelessRecipe {
    constructor(pGroup: string, pCategory: CraftingBookCategory, pResult: ItemStack, pIngredients: NonNullList<Ingredient>);
    assemble(inv: CraftingInput, registryAccess: Provider): ItemStack;
    get serializer(): RecipeSerializer<any>;
    getResultItem(registryAccess: Provider): ItemStack;
    isSpecial(): boolean;
    matches(inv: CraftingInput, worldIn: Level): boolean;
  }


  interface ShapelessGearRecipe extends IGearRecipe, ExtendedShapelessRecipe {}
  class ShapelessGearRecipe extends IGearRecipe {
    constructor(pGroup: string, pCategory: CraftingBookCategory, pResult: ItemStack, pIngredients: NonNullList<Ingredient>);
    assemble(inv: CraftingInput, registryAccess: Provider): ItemStack;
    get outputItem(): GearItem;
    get serializer(): RecipeSerializer<any>;
    getResultItem(registryAccess: Provider): ItemStack;
    isSpecial(): boolean;
    matches(inv: CraftingInput, worldIn: Level): boolean;
  }


  interface ToolActionRecipe extends Recipe<Input> {}
  class ToolActionRecipe extends Recipe<Input> {
    constructor(tool: Ingredient, ingredient: Ingredient, damageToTool: number, result: ItemStack, sound: SoundPlayback);
    assemble(pContainer: Input, pRegistryAccess: Provider): ItemStack;
    canCraftInDimensions(pWidth: number, pHeight: number): boolean;
    get damageToTool(): number;
    get ingredient(): Ingredient;
    get result(): ItemStack;
    get serializer(): RecipeSerializer<any>;
    get sound(): SoundPlayback;
    get tool(): Ingredient;
    get type(): RecipeType<any>;
    getResultItem(pRegistryAccess: Provider): ItemStack;
    matches(input: Input, pLevel: Level): boolean;
  }

}

declare module 'net.silentchaos512.gear.crafting.recipe.ConversionRecipe' {
  import { RecipeSerializer } from 'net.minecraft.world.item.crafting';
  import { ConversionRecipe } from 'net.silentchaos512.gear.crafting.recipe';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { MapCodec } from 'com.mojang.serialization';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  interface Serializer extends RecipeSerializer<ConversionRecipe> {}
  class Serializer extends RecipeSerializer<ConversionRecipe> {
    static readonly STREAM_CODEC: StreamCodec;
    codec(): MapCodec<ConversionRecipe>;
    static fromNetwork(buf: RegistryFriendlyByteBuf): ConversionRecipe;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, ConversionRecipe>;
    static toNetwork(buf: RegistryFriendlyByteBuf, recipe: ConversionRecipe): void;
  }

}

declare module 'net.silentchaos512.gear.crafting.recipe.press' {
  import { Ingredient, SingleRecipeInput, SingleItemRecipe, RecipeSerializer } from 'net.minecraft.world.item.crafting';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Provider } from 'HolderLookup';
  import { Level } from 'net.minecraft.world.level';

  interface MaterialPressingRecipe extends PressingRecipe {}
  class MaterialPressingRecipe extends PressingRecipe {
    constructor(group: string, ingredient: Ingredient, result: ItemStack);
    assemble(input: SingleRecipeInput, registryAccess: Provider): ItemStack;
  }


  interface PressingRecipe extends SingleItemRecipe {}
  class PressingRecipe extends SingleItemRecipe {
    constructor(group: string, ingredient: Ingredient, result: ItemStack);

    constructor(pSerializer: RecipeSerializer<any>, pGroup: string, pIngredient: Ingredient, pResult: ItemStack);
    matches(input: SingleRecipeInput, level: Level): boolean;
  }

}

declare module 'net.silentchaos512.gear.crafting.recipe.salvage' {
  import { List } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Container } from 'net.minecraft.world';
  import { SingleRecipeInput, RecipeSerializer, Ingredient, Recipe, RecipeType } from 'net.minecraft.world.item.crafting';
  import { Level } from 'net.minecraft.world.level';
  import { Provider } from 'HolderLookup';
  import { PartInstance } from 'net.silentchaos512.gear.gear.part';

  interface CompoundPartSalvagingRecipe extends SalvagingRecipe {}
  class CompoundPartSalvagingRecipe extends SalvagingRecipe {
    constructor();
    get serializer(): RecipeSerializer<any>;
    getPossibleResults(inv: Container): ItemStack[];
    matches(input: SingleRecipeInput, level: Level): boolean;
  }


  interface GearSalvagingRecipe extends SalvagingRecipe {}
  class GearSalvagingRecipe extends SalvagingRecipe {
    constructor(ingredient: Ingredient);
    get possibleResultsForDisplay(): ItemStack[];
    get serializer(): RecipeSerializer<any>;
    getPossibleResults(inv: Container): ItemStack[];
    matches(input: SingleRecipeInput, worldIn: Level): boolean;
  }


  interface SalvagingRecipe extends Recipe<SingleRecipeInput> {}
  class SalvagingRecipe extends Recipe<SingleRecipeInput> {
    constructor(ingredient: Ingredient, results: ItemStack[]);
    assemble(input: SingleRecipeInput, registryAccess: Provider): ItemStack;
    canCraftInDimensions(width: number, height: number): boolean;
    get ingredient(): Ingredient;
    get possibleResultsForDisplay(): ItemStack[];
    get serializer(): RecipeSerializer<any>;
    get type(): RecipeType<any>;
    getPossibleResults(inv: Container): ItemStack[];
    getResultItem(registryAccess: Provider): ItemStack;
    isSpecial(): boolean;
    matches(input: SingleRecipeInput, worldIn: Level): boolean;
    static salvagePart(part: PartInstance): ItemStack[];
  }

}

declare module 'net.silentchaos512.gear.crafting.recipe.salvage.CompoundPartSalvagingRecipe' {
  import { RecipeSerializer } from 'net.minecraft.world.item.crafting';
  import { CompoundPartSalvagingRecipe } from 'net.silentchaos512.gear.crafting.recipe.salvage';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  interface Serializer extends RecipeSerializer<CompoundPartSalvagingRecipe> {}
  class Serializer extends RecipeSerializer<CompoundPartSalvagingRecipe> {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    codec(): MapCodec<CompoundPartSalvagingRecipe>;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, CompoundPartSalvagingRecipe>;
  }

}

declare module 'net.silentchaos512.gear.crafting.recipe.salvage.GearSalvagingRecipe' {
  import { RecipeSerializer } from 'net.minecraft.world.item.crafting';
  import { GearSalvagingRecipe } from 'net.silentchaos512.gear.crafting.recipe.salvage';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  interface Serializer extends RecipeSerializer<GearSalvagingRecipe> {}
  class Serializer extends RecipeSerializer<GearSalvagingRecipe> {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    codec(): MapCodec<GearSalvagingRecipe>;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, GearSalvagingRecipe>;
  }

}

declare module 'net.silentchaos512.gear.crafting.recipe.salvage.SalvagingRecipe' {
  import { RecipeSerializer } from 'net.minecraft.world.item.crafting';
  import { SalvagingRecipe } from 'net.silentchaos512.gear.crafting.recipe.salvage';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  interface Serializer extends RecipeSerializer<SalvagingRecipe> {}
  class Serializer extends RecipeSerializer<SalvagingRecipe> {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    codec(): MapCodec<SalvagingRecipe>;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, SalvagingRecipe>;
  }

}

declare module 'net.silentchaos512.gear.crafting.recipe.smithing' {
  import { ItemStack } from 'net.minecraft.world.item';
  import { Ingredient, RecipeSerializer, SmithingTransformRecipe, SmithingRecipeInput } from 'net.minecraft.world.item.crafting';
  import { Provider } from 'HolderLookup';

  interface CoatingSmithingRecipe extends GearSmithingRecipe {}
  class CoatingSmithingRecipe extends GearSmithingRecipe {
    constructor(gearItem: ItemStack, template: Ingredient, addition: Ingredient);
    get serializer(): RecipeSerializer<any>;
  }


  interface GearSmithingRecipe extends SmithingTransformRecipe {}
  class GearSmithingRecipe extends SmithingTransformRecipe {
    constructor(gearItem: ItemStack, template: Ingredient, addition: Ingredient);
    assemble(input: SmithingRecipeInput, registryAccess: Provider): ItemStack;
    get serializer(): RecipeSerializer<any>;
  }


  interface UpgradeSmithingRecipe extends GearSmithingRecipe {}
  class UpgradeSmithingRecipe extends GearSmithingRecipe {
    constructor(gearItem: ItemStack, template: Ingredient, addition: Ingredient);
    get serializer(): RecipeSerializer<any>;
  }

}

declare module 'net.silentchaos512.gear.crafting.recipe.smithing.CoatingSmithingRecipe' {
  import { RecipeSerializer } from 'net.minecraft.world.item.crafting';
  import { CoatingSmithingRecipe } from 'net.silentchaos512.gear.crafting.recipe.smithing';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  interface Serializer extends RecipeSerializer<CoatingSmithingRecipe> {}
  class Serializer extends RecipeSerializer<CoatingSmithingRecipe> {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    codec(): MapCodec<CoatingSmithingRecipe>;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, CoatingSmithingRecipe>;
  }

}

declare module 'net.silentchaos512.gear.crafting.recipe.smithing.GearSmithingRecipe' {
  import { ItemStack } from 'net.minecraft.world.item';
  import { Ingredient } from 'net.minecraft.world.item.crafting';

  class Factory<R extends GearSmithingRecipe = any> {
    create(var1: ItemStack, var2: Ingredient, var3: Ingredient): R;
  }

}

declare module 'net.silentchaos512.gear.crafting.recipe.smithing.UpgradeSmithingRecipe' {
  import { RecipeSerializer } from 'net.minecraft.world.item.crafting';
  import { UpgradeSmithingRecipe } from 'net.silentchaos512.gear.crafting.recipe.smithing';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  interface Serializer extends RecipeSerializer<UpgradeSmithingRecipe> {}
  class Serializer extends RecipeSerializer<UpgradeSmithingRecipe> {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    codec(): MapCodec<UpgradeSmithingRecipe>;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, UpgradeSmithingRecipe>;
  }

}

declare module 'net.silentchaos512.gear.crafting.recipe.ToolActionRecipe' {
  import { RecipeSerializer } from 'net.minecraft.world.item.crafting';
  import { ToolActionRecipe } from 'net.silentchaos512.gear.crafting.recipe';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  interface Serializer extends RecipeSerializer<ToolActionRecipe> {}
  class Serializer extends RecipeSerializer<ToolActionRecipe> {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    codec(): MapCodec<ToolActionRecipe>;
    static fromNetwork(buf: RegistryFriendlyByteBuf): ToolActionRecipe;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, ToolActionRecipe>;
    static toNetwork(buf: RegistryFriendlyByteBuf, recipe: ToolActionRecipe): void;
  }

}

declare module 'net.silentchaos512.gear.data.client' {
  import { ItemModelBuilder, ModelProvider, BlockStateProvider, ModelBuilder, BlockModelBuilder, ItemModelProvider } from 'net.neoforged.neoforge.client.model.generators';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ExistingFileHelper } from 'net.neoforged.neoforge.common.data';
  import { GearType } from 'net.silentchaos512.gear.api.item';
  import { PartType } from 'net.silentchaos512.gear.api.part';
  import { JsonObject } from 'com.google.gson';
  import { DataGenerator } from 'net.minecraft.data';
  import { FenceBlock } from 'net.minecraft.world.level.block';

  interface CompoundModelBuilder extends ItemModelBuilder {}
  class CompoundModelBuilder extends ItemModelBuilder {
    constructor(outputLocation: ResourceLocation, existingFileHelper: ExistingFileHelper);
    addExtraLayer(texture: ResourceLocation): CompoundModelBuilder;
    setGearType(gearType: GearType): CompoundModelBuilder;
    setLoader(loader: ResourceLocation): CompoundModelBuilder;
    setPartType(partType: PartType): CompoundModelBuilder;
    setTexturePath(texturePath: string): CompoundModelBuilder;
    toJson(): JsonObject;
  }


  interface CompoundModelsProvider extends ModelProvider<ItemModelBuilder> {}
  class CompoundModelsProvider extends ModelProvider<ItemModelBuilder> {
    constructor(generator: DataGenerator, existingFileHelper: ExistingFileHelper);
    get name(): string;
  }


  interface ModBlockStateProvider extends BlockStateProvider {}
  class ModBlockStateProvider extends BlockStateProvider {
    constructor(gen: DataGenerator, exFileHelper: ExistingFileHelper);
    fenceBlock(block: FenceBlock, texture: ResourceLocation): void;
    get name(): string;
    wallTorch(name: string, torch: ResourceLocation): ModelBuilder<BlockModelBuilder>;
  }


  interface ModItemModelProvider extends ItemModelProvider {}
  class ModItemModelProvider extends ItemModelProvider {
    constructor(generator: DataGenerator, existingFileHelper: ExistingFileHelper);
    get name(): string;
  }

}

declare module 'net.silentchaos512.gear.data' {
  import { GatherDataEvent } from 'net.neoforged.neoforge.data.event';
  import { CompletableFuture } from 'java.util.concurrent';
  import { CachedOutput, DataGenerator } from 'net.minecraft.data';
  import { JsonElement } from 'com.google.gson';
  import { Path } from 'java.nio.file';
  import { MaterialsProviderBase } from 'net.silentchaos512.gear.api.data.material';
  import { AdvancementProvider, DataMapProvider, SoundDefinitionsProvider } from 'net.neoforged.neoforge.common.data';
  import { PartsProviderBase, PartBuilder } from 'net.silentchaos512.gear.api.data.part';
  import { Map, Collection } from 'java.util';

  class DataGenerators {
    static gatherData(event: GatherDataEvent): void;
    static saveStable(p_253653_: CachedOutput, p_254542_: JsonElement, p_254467_: Path): CompletableFuture<any>;
  }


  interface MaterialsProvider extends MaterialsProviderBase {}
  class MaterialsProvider extends MaterialsProviderBase {
    constructor(generator: DataGenerator, modId: string);
  }


  interface ModAdvancementProvider extends AdvancementProvider {}
  class ModAdvancementProvider extends AdvancementProvider {
    constructor(event: GatherDataEvent);
  }


  interface ModDataMapProvider extends DataMapProvider {}
  class ModDataMapProvider extends DataMapProvider {
  }


  interface ModSoundDefinitionsProvider extends SoundDefinitionsProvider {}
  class ModSoundDefinitionsProvider extends SoundDefinitionsProvider {
    registerSounds(): void;
  }


  interface PartsProvider extends PartsProviderBase {}
  class PartsProvider extends PartsProviderBase {
    static MAIN_PART_PROPERTIES: Map;
    constructor(generator: DataGenerator);
    get parts(): Collection<PartBuilder>;
  }

}

declare module 'net.silentchaos512.gear.data.loot' {
  import { BlockLootSubProvider, LootTableSubProvider, EntityLootSubProvider, LootTableProvider } from 'net.minecraft.data.loot';
  import { Provider } from 'HolderLookup';
  import { BiConsumer } from 'java.util.function';
  import { ResourceKey } from 'net.minecraft.resources';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';
  import { Builder } from 'LootTable';
  import { GlobalLootModifierProvider } from 'net.neoforged.neoforge.common.data';
  import { GatherDataEvent } from 'net.neoforged.neoforge.data.event';
  import { List } from 'java.util';
  import { SubProviderEntry } from 'LootTableProvider';

  interface ModBlockLootTables extends BlockLootSubProvider {}
  class ModBlockLootTables extends BlockLootSubProvider {
  }


  interface ModChestLootTables extends LootTableSubProvider {}
  class ModChestLootTables extends LootTableSubProvider {
    constructor(provider: Provider);
    static addNetherFlora(builder: Builder): Builder;
    static addNetherMetals(builder: Builder): Builder;
    static addNetherMetalsAndFlora(): Builder;
    static addNetherMetalsWithExtra(): Builder;
    generate(consumer: BiConsumer<ResourceKey<LootTable>, Builder>): void;
  }


  interface ModEntityLootTables extends EntityLootSubProvider {}
  class ModEntityLootTables extends EntityLootSubProvider {
    generate(): void;
    generate(consumer: BiConsumer<ResourceKey<LootTable>, Builder>): void;
  }


  interface ModGiftLootTables extends LootTableSubProvider {}
  class ModGiftLootTables extends LootTableSubProvider {
    constructor(provider: Provider);
    generate(biConsumer: BiConsumer<ResourceKey<LootTable>, Builder>): void;
  }


  interface ModLootModifierProvider extends GlobalLootModifierProvider {}
  class ModLootModifierProvider extends GlobalLootModifierProvider {
    constructor(event: GatherDataEvent);
  }


  interface ModLootTables extends LootTableProvider {}
  class ModLootTables extends LootTableProvider {
    constructor(event: GatherDataEvent);
    get tables(): SubProviderEntry[];
  }

}

declare module 'net.silentchaos512.gear.data.recipes' {
  import { RecipeBuilder, RecipeOutput, RecipeCategory } from 'net.minecraft.data.recipes';
  import { Factory } from 'net.silentchaos512.gear.crafting.recipe.alloy.AlloyRecipe';
  import { ItemLike } from 'net.minecraft.world.level';
  import { MetalAlloyRecipe, GemAlloyRecipe, FabricAlloyRecipe } from 'net.silentchaos512.gear.crafting.recipe.alloy';
  import { DataResource } from 'net.silentchaos512.gear.api.util';
  import { Material } from 'net.silentchaos512.gear.api.material';
  import { TagKey } from 'net.minecraft.tags';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { Criterion } from 'net.minecraft.advancements';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Factory as net_silentchaos512_gear_crafting_recipe_smithing_gearsmithingrecipe_Factory } from 'net.silentchaos512.gear.crafting.recipe.smithing.GearSmithingRecipe';
  import { CoatingSmithingRecipe, UpgradeSmithingRecipe } from 'net.silentchaos512.gear.crafting.recipe.smithing';
  import { PartType } from 'net.silentchaos512.gear.api.part';
  import { LibRecipeProvider, ExtendedShapelessRecipeBuilder } from 'net.silentchaos512.lib.data.recipe';
  import { GatherDataEvent } from 'net.neoforged.neoforge.data.event';
  import { SalvagingRecipe, GearSalvagingRecipe } from 'net.silentchaos512.gear.crafting.recipe.salvage';
  import { GearItem } from 'net.silentchaos512.gear.api.item';
  import { ConversionRecipe } from 'net.silentchaos512.gear.crafting.recipe';
  import { List } from 'java.util';
  import { PartInstance } from 'net.silentchaos512.gear.gear.part';
  import { SoundPlayback } from 'net.silentchaos512.gear.core';

  interface CompoundingRecipeBuilder<R extends AlloyRecipe = any> extends RecipeBuilder {}
  class CompoundingRecipeBuilder<R extends AlloyRecipe = any> extends RecipeBuilder {
    constructor(factory: Factory<R>, recipeFolder: string, resultItem: ItemLike, count: number);
    addIngredient(item: ItemLike): CompoundingRecipeBuilder<R>;
    addIngredient(item: ItemLike, count: number): CompoundingRecipeBuilder<R>;
    addIngredient(tag: TagKey<Item>): CompoundingRecipeBuilder<R>;
    addIngredient(tag: TagKey<Item>, count: number): CompoundingRecipeBuilder<R>;
    addIngredient(ingredient: Ingredient): CompoundingRecipeBuilder<R>;
    addIngredient(ingredient: Ingredient, count: number): CompoundingRecipeBuilder<R>;
    static fabricBuilder(result: ItemLike, count: number): CompoundingRecipeBuilder<FabricAlloyRecipe>;
    static gemBuilder(result: ItemLike, count: number): CompoundingRecipeBuilder<GemAlloyRecipe>;
    get result(): Item;
    group(pGroupName: string): RecipeBuilder;
    static metalBuilder(result: ItemLike, count: number): CompoundingRecipeBuilder<MetalAlloyRecipe>;
    save(pRecipeOutput: RecipeOutput): void;
    save(pRecipeOutput: RecipeOutput, pId: ResourceLocation): void;
    unlockedBy(pName: string, pCriterion: Criterion<any>): RecipeBuilder;
    withCustomMaterial(material: DataResource<Material>): CompoundingRecipeBuilder<R>;
  }


  interface GearSmithingRecipeBuilder<R extends GearSmithingRecipe = any> extends RecipeBuilder {}
  class GearSmithingRecipeBuilder<R extends GearSmithingRecipe = any> extends RecipeBuilder {
    constructor(factory: net_silentchaos512_gear_crafting_recipe_smithing_gearsmithingrecipe_Factory<R>, recipeFolder: string, gearItem: Item, template: Ingredient, addition: Ingredient);
    static coating(gearItem: ItemLike): GearSmithingRecipeBuilder<CoatingSmithingRecipe>;
    get result(): Item;
    group(pGroupName: string): RecipeBuilder;
    save(pRecipeOutput: RecipeOutput): void;
    save(pRecipeOutput: RecipeOutput, pId: ResourceLocation): void;
    unlockedBy(pName: string, pCriterion: Criterion<any>): RecipeBuilder;
    static upgrade(gearItem: ItemLike, partType: PartType): GearSmithingRecipeBuilder<UpgradeSmithingRecipe>;
  }


  interface ModRecipesProvider extends LibRecipeProvider {}
  class ModRecipesProvider extends LibRecipeProvider {
    constructor(event: GatherDataEvent);
  }


  interface SalvagingRecipeBuilder<R extends SalvagingRecipe = any> extends RecipeBuilder {}
  class SalvagingRecipeBuilder<R extends SalvagingRecipe = any> extends RecipeBuilder {
    addResult(item: ItemLike): SalvagingRecipeBuilder<R>;
    addResult(item: ItemLike, count: number): SalvagingRecipeBuilder<R>;
    static builder(ingredient: ItemLike): SalvagingRecipeBuilder<SalvagingRecipe>;
    static builder(ingredient: TagKey<Item>): SalvagingRecipeBuilder<SalvagingRecipe>;
    static builder(ingredient: Ingredient): SalvagingRecipeBuilder<SalvagingRecipe>;
    static gearBuilder(item: GearItem): SalvagingRecipeBuilder<GearSalvagingRecipe>;
    get result(): Item;
    group(pGroupName: string): RecipeBuilder;
    save(pRecipeOutput: RecipeOutput, pId: ResourceLocation): void;
    unlockedBy(pName: string, pCriterion: Criterion<any>): RecipeBuilder;
  }


  interface ShapelessConversionBuilder extends ExtendedShapelessRecipeBuilder<ConversionRecipe> {}
  class ShapelessConversionBuilder extends ExtendedShapelessRecipeBuilder<ConversionRecipe> {
    constructor(category: RecipeCategory, result: GearItem, parts: PartInstance[]);
    createRecipe(id: ResourceLocation): ConversionRecipe;
  }


  interface ToolActionRecipeBuilder extends RecipeBuilder {}
  class ToolActionRecipeBuilder extends RecipeBuilder {
    constructor(tool: Ingredient, ingredient: Ingredient, damageToTool: number, result: ItemStack);

    constructor(tool: Ingredient, ingredient: Ingredient, damageToTool: number, result: ItemStack, sound: SoundPlayback);
    get result(): Item;
    group(pGroupName: string): RecipeBuilder;
    save(pRecipeOutput: RecipeOutput, pId: ResourceLocation): void;
    unlockedBy(pName: string, pCriterion: Criterion<any>): RecipeBuilder;
  }

}

declare module 'net.silentchaos512.gear.data.tags' {
  import { BlockTagsProvider, ExistingFileHelper } from 'net.neoforged.neoforge.common.data';
  import { GatherDataEvent } from 'net.neoforged.neoforge.data.event';
  import { TagsProvider, IntrinsicHolderTagsProvider, ItemTagsProvider } from 'net.minecraft.data.tags';
  import { DamageType } from 'net.minecraft.world.damagesource';
  import { PackOutput } from 'net.minecraft.data';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';
  import { EntityType } from 'net.minecraft.world.entity';

  interface ModBlockTagsProvider extends BlockTagsProvider {}
  class ModBlockTagsProvider extends BlockTagsProvider {
    constructor(event: GatherDataEvent);
  }


  interface ModDamageTypeTagsProvider extends TagsProvider<DamageType> {}
  class ModDamageTypeTagsProvider extends TagsProvider<DamageType> {
    constructor(output: PackOutput, lookupProvider: CompletableFuture<Provider>, existingFileHelper: ExistingFileHelper);
  }


  interface ModEntityTypeTagsProvider extends IntrinsicHolderTagsProvider<EntityType> {}
  class ModEntityTypeTagsProvider extends IntrinsicHolderTagsProvider<EntityType> {
    constructor(output: PackOutput, lookupProvider: CompletableFuture<Provider>, existingFileHelper: ExistingFileHelper);
  }


  interface ModItemTagsProvider extends ItemTagsProvider {}
  class ModItemTagsProvider extends ItemTagsProvider {
    constructor(event: GatherDataEvent, blocks: BlockTagsProvider);
  }

}

declare module 'net.silentchaos512.gear.data.trait' {
  import { TraitsProviderBase, TraitBuilder } from 'net.silentchaos512.gear.api.data.trait';
  import { DataGenerator } from 'net.minecraft.data';
  import { Collection } from 'java.util';

  interface TraitsProvider extends TraitsProviderBase {}
  class TraitsProvider extends TraitsProviderBase {
    constructor(generator: DataGenerator);
    get traits(): Collection<TraitBuilder>;
  }

}

declare module 'net.silentchaos512.gear.entity' {
  import { FishingHook } from 'net.minecraft.world.entity.projectile';
  import { EntityType } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';

  interface GearFishingHook extends FishingHook {}
  class GearFishingHook extends FishingHook {
    constructor(pEntityType: EntityType<FishingHook>, pLevel: Level);

    constructor(pPlayer: Player, pLevel: Level, pLuck: number, pLureSpeed: number);
  }

}

declare module 'net.silentchaos512.gear.entity.projectile' {
  import { AbstractArrow } from 'net.minecraft.world.entity.projectile';
  import { EntityType, LivingEntity, Entity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface GearArrowEntity extends AbstractArrow {}
  class GearArrowEntity extends AbstractArrow {
    constructor(entityType: EntityType<GearArrowEntity>, level: Level);

    constructor(level: Level, x: number, y: number, z: number, pickupItemStack: ItemStack, firedFromWeapon: ItemStack);

    constructor(level: Level, owner: LivingEntity, pickupItemStack: ItemStack, firedFromWeapon: ItemStack);
    get fletchingColor(): number;
    get rodColor(): number;
    get tipColor(): number;
    setArrowStack(stack: ItemStack): void;
    shootFromRotation(shooter: Entity, x: number, y: number, z: number, velocity: number, inaccuracy: number): void;
  }


  interface GearTridentProjectile extends AbstractArrow {}
  class GearTridentProjectile extends AbstractArrow {
    clientSideReturnTridentTickCount: number;
    constructor(entityType: EntityType<GearTridentProjectile>, level: Level);

    constructor(level: Level, shooter: LivingEntity, pickupItemStack: ItemStack);

    constructor(level: Level, x: number, y: number, z: number, pickupItemStack: ItemStack);
    addAdditionalSaveData(compound: CompoundTag): void;
    get gripColor(): number;
    get spikesColor(): number;
    get tipColor(): number;
    get toolRodColor(): number;
    get weaponItem(): ItemStack;
    isFoil(): boolean;
    playerTouch(entity: Player): void;
    readAdditionalSaveData(compound: CompoundTag): void;
    shouldRender(x: number, y: number, z: number): boolean;
    tick(): void;
    tickDespawn(): void;
  }


  interface SlingshotProjectile extends AbstractArrow {}
  class SlingshotProjectile extends AbstractArrow {
    constructor(pOwner: LivingEntity, pLevel: Level, pPickupItemStack: ItemStack, firedWeapon: ItemStack);

    constructor(slingshotProjectileEntityType: EntityType<SlingshotProjectile>, level: Level);
    tick(): void;
  }

}

declare module 'net.silentchaos512.gear.event' {
  import { InteractionKeyMappingTriggered } from 'InputEvent';
  import { LivingIncomingDamageEvent, LivingExperienceDropEvent, LivingDeathEvent, LivingFallEvent } from 'net.neoforged.neoforge.event.entity.living';
  import { Post, Pre } from 'LivingDamageEvent';
  import { FurnaceFuelBurnTimeEvent } from 'net.neoforged.neoforge.event.furnace';
  import { BreakSpeed, ItemCraftedEvent, PlayerLoggedInEvent } from 'PlayerEvent';
  import { BlockAndTintGetter } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockDropsEvent } from 'net.neoforged.neoforge.event.level';
  import { Pre as playertickevent_Pre } from 'PlayerTickEvent';
  import { BreakEvent } from 'BlockEvent';
  import { AnvilUpdateEvent, OnDatapackSyncEvent } from 'net.neoforged.neoforge.event';

  class ClientEvents {
    static onClick(event: InteractionKeyMappingTriggered): void;
  }


  class GearEvents {
    static getLightForLustrousTrait(world: BlockAndTintGetter, pos: BlockPos): number;
    static getLustrousSpeedBonus(level: number, light: number): number;
    static onBlockBreak(event: BreakEvent): void;
    static onBlockDrops(event: BlockDropsEvent): void;
    static onBreakSpeed(event: BreakSpeed): void;
    static onFurnaceFuelBurnTimeEvent(event: FurnaceFuelBurnTimeEvent): void;
    static onGearCrafted(event: ItemCraftedEvent): void;
    static onLivingDamagePost(event: Post): void;
    static onLivingDeath(event: LivingDeathEvent): void;
    static onLivingFall(event: LivingFallEvent): void;
    static onLivingHurtMagicArmor(event: Pre): void;
    static onLivingIncomingDamage(event: LivingIncomingDamageEvent): void;
    static onPlayerHurt(event: Post): void;
    static onPlayerTick(event: playertickevent_Pre): void;
    static onXpDrop(event: LivingExperienceDropEvent): void;
  }


  class RepairHandler {
    static onAnvilUpdate(event: AnvilUpdateEvent): void;
  }


  class ServerEvents {
    static onDataPackSync(event: OnDatapackSyncEvent): void;
    static onPlayerJoinServer(event: PlayerLoggedInEvent): void;
  }

}

declare module 'net.silentchaos512.gear.gear' {
  import { RuntimeException, Throwable } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface GearJsonException extends RuntimeException {}
  class GearJsonException extends RuntimeException {
    constructor(resourceName: ResourceLocation, packName: string, cause: Throwable);
  }


  interface MaterialJsonException extends GearJsonException {}
  class MaterialJsonException extends GearJsonException {
    constructor(resourceName: ResourceLocation, packName: string, cause: Throwable);
  }


  interface PartJsonException extends GearJsonException {}
  class PartJsonException extends GearJsonException {
    constructor(resourceName: ResourceLocation, packName: string, cause: Throwable);
  }


  interface TraitJsonException extends GearJsonException {}
  class TraitJsonException extends GearJsonException {
    constructor(resourceName: ResourceLocation, packName: string, cause: Throwable);
  }

}

declare module 'net.silentchaos512.gear.gear.material' {
  import { Material, IMaterialCategory, TextureType, MaterialCraftingData, MaterialDisplayData, MaterialSerializer } from 'net.silentchaos512.gear.api.material';
  import { Collection, Optional, Set, List, Map } from 'java.util';
  import { Ingredient, CraftingInput } from 'net.minecraft.world.item.crafting';
  import { PartType } from 'net.silentchaos512.gear.api.part';
  import { PropertyKey, DataResource, GearComponentInstance } from 'net.silentchaos512.gear.api.util';
  import { GearPropertyValue, GearPropertyMap, GearProperty } from 'net.silentchaos512.gear.api.property';
  import { GearType } from 'net.silentchaos512.gear.api.item';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { Enum } from 'java.lang';
  import { Codec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IMaterialModifier, IMaterialModifierType } from 'net.silentchaos512.gear.api.material.modifier';
  import { Type } from 'net.silentchaos512.gear.gear.part.RepairContext';
  import { Supplier } from 'java.util.function';
  import { DataResourceManager } from 'net.silentchaos512.gear.core';
  import { JsonObject } from 'com.google.gson';
  import { RandomSource } from 'net.minecraft.util';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { DeferredRegister } from 'net.neoforged.neoforge.registries';

  interface AbstractMaterial extends Material {}
  class AbstractMaterial extends Material {
    canSalvage(): boolean;
    get categories(): Collection<IMaterialCategory>;
    get ingredient(): Ingredient;
    get parent(): Material;
    getCategories(material: MaterialInstance): Collection<IMaterialCategory>;
    getColor(material: MaterialInstance, partType: PartType, gearType: GearType): number;
    getDisplayName(material: MaterialInstance, type: PartType): Component;
    getDisplayNamePrefix(partType: PartType): Component;
    getMainTextureType(material: MaterialInstance): TextureType;
    getNameColor(material: MaterialInstance, partType: PartType, gearType: GearType): number;
    getPartSubstitute(partType: PartType): Optional<Ingredient>;
    getPartTypes(material: MaterialInstance): Set<PartType>;
    getPropertyKeys(material: MaterialInstance, type: PartType): Collection<PropertyKey<any, any>>;
    getPropertyModifiers<T, V extends GearPropertyValue<T>>(instance: MaterialInstance, partType: PartType, key: PropertyKey<T, V>): Collection<V>;
    hasPartSubstitutes(): boolean;
    isAllowedInPart(material: MaterialInstance, partType: PartType): boolean;
    isCraftingAllowed(material: MaterialInstance, partType: PartType, gearType: GearType, craftingInput: CraftingInput): boolean;
    isInCategory(category: IMaterialCategory): boolean;
    isValid(): boolean;
    onSalvage(material: MaterialInstance): MaterialInstance;
    static removeEnhancements(material: MaterialInstance): MaterialInstance;
    toString(): string;
  }


  interface CompoundMaterial extends AbstractMaterial {}
  class CompoundMaterial extends AbstractMaterial {
    constructor(parent: DataResource<Material>, crafting: MaterialCraftingData, display: MaterialDisplayData);
    canSalvage(): boolean;
    get categories(): Collection<IMaterialCategory>;
    get parent(): Material;
    get serializer(): MaterialSerializer<any>;
    getCategories(material: MaterialInstance): Collection<IMaterialCategory>;
    getColor(material: MaterialInstance, partType: PartType, gearType: GearType): number;
    getDisplayName(material: MaterialInstance, type: PartType): Component;
    getModelKey(material: MaterialInstance): string;
    getNameColor(material: MaterialInstance, partType: PartType, gearType: GearType): number;
    getPartSubstitute(partType: PartType): Optional<Ingredient>;
    getPartTypes(material: MaterialInstance): Set<PartType>;
    getPropertyKeys(material: MaterialInstance, type: PartType): Collection<PropertyKey<any, any>>;
    getPropertyModifiers<T, V extends GearPropertyValue<T>>(material: MaterialInstance, partType: PartType, key: PropertyKey<T, V>): Collection<V>;
    getSubMaterials(material: MaterialInstance): MaterialInstance[];
    hasPartSubstitutes(): boolean;
    isAllowedInPart(material: MaterialInstance, partType: PartType): boolean;
    isCraftingAllowed(material: MaterialInstance, partType: PartType, gearType: GearType, craftingInput: CraftingInput): boolean;
    isSimple(): boolean;
    toString(): string;
  }


  interface CustomCompoundMaterial extends AbstractMaterial {}
  class CustomCompoundMaterial extends AbstractMaterial {
    constructor(parent: DataResource<Material>, crafting: MaterialCraftingData, display: MaterialDisplayData, properties: Map<PartType, GearPropertyMap>);
    get serializer(): MaterialSerializer<any>;
    isSimple(): boolean;
  }


  interface MaterialCategories extends Enum<MaterialCategories> {}
  class MaterialCategories extends Enum<MaterialCategories> {
    static readonly METAL: MaterialCategories;
    static readonly GEM: MaterialCategories;
    static readonly ROCK: MaterialCategories;
    static readonly DUST: MaterialCategories;
    static readonly CLOTH: MaterialCategories;
    static readonly FIBER: MaterialCategories;
    static readonly WOOD: MaterialCategories;
    static readonly ORGANIC: MaterialCategories;
    static readonly SLIME: MaterialCategories;
    static readonly SHEET: MaterialCategories;
    static readonly INTANGIBLE: MaterialCategories;
    static readonly BASIC: MaterialCategories;
    static readonly INTERMEDIATE: MaterialCategories;
    static readonly ADVANCED: MaterialCategories;
    static readonly ENDGAME: MaterialCategories;
    static get(key: string): IMaterialCategory;
    get name(): string;
    static valueOf(name: string): MaterialCategories;
    static values(): MaterialCategories[];
  }


  interface MaterialInstance extends GearComponentInstance<Material> {}
  class MaterialInstance extends GearComponentInstance<Material> {
    static readonly CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    allowedInPart(partType: PartType): boolean;
    canRepair(gear: ItemStack): boolean;
    equals(o: any): boolean;
    static from(stack: ItemStack): MaterialInstance;
    get (): Material;
    get categories(): Collection<IMaterialCategory>;
    get id(): ResourceLocation;
    get ingredient(): Ingredient;
    get item(): ItemStack;
    get mainTextureType(): TextureType;
    get modelKey(): string;
    get modifiers(): Collection<IMaterialModifier>;
    get nullable(): Material;
    get partTypes(): Set<PartType>;
    getColor(gearType: GearType, partType: PartType): number;
    getDisplayName(partType: PartType, gear: ItemStack): Component;
    getDisplayName(type: PartType): Component;
    getDisplayNamePrefix(partType: PartType): Component;
    getDisplayNameWithModifiers(partType: PartType, gear: ItemStack): MutableComponent;
    getModifier<T extends IMaterialModifier>(modifierType: IMaterialModifierType<T>): T;
    getNameColor(partType: PartType, gearType: GearType): number;
    getProperty<T, V extends GearPropertyValue<T>>(partType: PartType, key: PropertyKey<T, V>): T;
    getProperty<T, V extends GearPropertyValue<T>>(partType: PartType, property: GearProperty<T, V>): T;
    getProperty<T, V extends GearPropertyValue<T>>(partType: Supplier<PartType>, key: PropertyKey<T, V>): T;
    getPropertyModifiers<T, V extends GearPropertyValue<T>>(partType: PartType, key: PropertyKey<T, V>): Collection<V>;
    getPropertyModifiers<T, V extends GearPropertyValue<T>>(partType: Supplier<PartType>, key: PropertyKey<T, V>): Collection<V>;
    getRepairValue(gear: ItemStack): number;
    getRepairValue(gear: ItemStack, type: Type): number;
    hasAnyCategory(others: Collection<IMaterialCategory>): boolean;
    hashCode(): number;
    is(material: DataResource<Material>): boolean;
    isCraftingAllowed(partType: PartType, gearType: GearType): boolean;
    isSimple(): boolean;
    isValid(): boolean;
    static of(material: DataResource<Material>): MaterialInstance;
    static of(material: Material): MaterialInstance;
    static of(material: DataResource<Material>, craftingItem: ItemStack): MaterialInstance;
    static of(material: Material, craftingItem: ItemStack): MaterialInstance;
    onSalvage(): MaterialInstance;
    toString(): string;
  }


  interface MaterialManager extends DataResourceManager<Material> {}
  class MaterialManager extends DataResourceManager<Material> {
    constructor();
    fromItem(stack: ItemStack): Material;
    getChildren(material: Material): Material[];
    getErrorMessages(player: ServerPlayer): Collection<Component>;
    getRandomObtainable(randomSource: RandomSource): Optional<Material>;
    getValues(includeChildren: boolean): Material[];
    onReloadPost(): void;
    validate(value: Material, json: JsonObject): void;
  }


  class MaterialSerializers {
    static readonly DISPATCH_CODEC: Codec;
    static readonly DISPATCH_STREAM_CODEC: StreamCodec;
    static readonly REGISTRAR: DeferredRegister;
    static readonly SIMPLE: Supplier;
    static readonly COMPOUND: Supplier;
    static readonly CUSTOM_COMPOUND: Supplier;
    static readonly PROCESSED: Supplier;
    static register<T extends Material, S extends MaterialSerializer<T>>(name: string, serializer: Supplier<S>): Supplier<S>;
  }


  interface ProcessedMaterial extends AbstractMaterial {}
  class ProcessedMaterial extends AbstractMaterial {
    constructor(parent: DataResource<Material>, crafting: MaterialCraftingData, display: MaterialDisplayData, properties: Map<PartType, GearPropertyMap>);
    get categories(): Collection<IMaterialCategory>;
    get serializer(): MaterialSerializer<any>;
    static getBaseMaterial(material: MaterialInstance): MaterialInstance;
    getBaseMaterialName(material: MaterialInstance, partType: PartType): Component;
    getCategories(material: MaterialInstance): Collection<IMaterialCategory>;
    getColor(material: MaterialInstance, partType: PartType, gearType: GearType): number;
    getDisplayName(material: MaterialInstance, type: PartType): Component;
    getModelKey(material: MaterialInstance): string;
    getNameColor(material: MaterialInstance, partType: PartType, gearType: GearType): number;
    getPartTypes(material: MaterialInstance): Set<PartType>;
    getPropertyKeys(material: MaterialInstance, type: PartType): Collection<PropertyKey<any, any>>;
    getPropertyModifiers<T, V extends GearPropertyValue<T>>(material: MaterialInstance, partType: PartType, key: PropertyKey<T, V>): Collection<V>;
    isSimple(): boolean;
  }


  interface SimpleMaterial extends AbstractMaterial {}
  class SimpleMaterial extends AbstractMaterial {
    constructor(parent: DataResource<Material>, crafting: MaterialCraftingData, display: MaterialDisplayData, properties: Map<PartType, GearPropertyMap>);
    get serializer(): MaterialSerializer<any>;
    isAllowedInPart(material: MaterialInstance, partType: PartType): boolean;
    isSimple(): boolean;
    toString(): string;
  }

}

declare module 'net.silentchaos512.gear.gear.material.CompoundMaterial' {
  import { MaterialSerializer } from 'net.silentchaos512.gear.api.material';
  import { CompoundMaterial } from 'net.silentchaos512.gear.gear.material';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';

  interface Serializer extends MaterialSerializer<CompoundMaterial> {}
  class Serializer extends MaterialSerializer<CompoundMaterial> {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor();
  }

}

declare module 'net.silentchaos512.gear.gear.material.CustomCompoundMaterial' {
  import { MaterialSerializer } from 'net.silentchaos512.gear.api.material';
  import { CustomCompoundMaterial } from 'net.silentchaos512.gear.gear.material';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';

  interface Serializer extends MaterialSerializer<CustomCompoundMaterial> {}
  class Serializer extends MaterialSerializer<CustomCompoundMaterial> {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor();
  }

}

declare module 'net.silentchaos512.gear.gear.material.modifier' {
  import { IMaterialModifier, IMaterialModifierType } from 'net.silentchaos512.gear.api.material.modifier';
  import { ChargedProperties, PropertyKey } from 'net.silentchaos512.gear.api.util';
  import { MaterialInstance } from 'net.silentchaos512.gear.gear.material';
  import { Supplier } from 'java.util.function';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Collection, List } from 'java.util';
  import { PartType } from 'net.silentchaos512.gear.api.part';
  import { GearPropertyValue } from 'net.silentchaos512.gear.api.property';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';

  interface ChargedMaterialModifier extends IMaterialModifier {}
  class ChargedMaterialModifier extends IMaterialModifier {
    getChargedProperties(material: MaterialInstance): ChargedProperties;
  }


  interface CrudeMaterialModifier extends UnitMaterialModifier {}
  class CrudeMaterialModifier extends UnitMaterialModifier {
    static readonly INSTANCE: CrudeMaterialModifier;
    static readonly DATA_COMPONENT_TYPE: Supplier;
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    appendTooltip(tooltip: Component[]): void;
    get type(): IMaterialModifierType<any>;
    modifyProperties<T, V extends GearPropertyValue<T>>(material: MaterialInstance, partType: PartType, key: PropertyKey<T, V>, mods: Collection<V>): Collection<V>;
    static setOn(materialItemStack: ItemStack): void;
  }


  interface StarchargedMaterialModifier extends ChargedMaterialModifier {}
  class StarchargedMaterialModifier extends ChargedMaterialModifier {
    constructor(level: number);
    appendTooltip(tooltip: Component[]): void;
    get type(): IMaterialModifierType<any>;
    modifyMaterialName(name: MutableComponent): MutableComponent;
    modifyProperties<T, V extends GearPropertyValue<T>>(material: MaterialInstance, partType: PartType, key: PropertyKey<T, V>, mods: Collection<V>): Collection<V>;
  }


  interface UnitMaterialModifier extends IMaterialModifier {}
  class UnitMaterialModifier extends IMaterialModifier {
    modifyMaterialName(name: MutableComponent): MutableComponent;
  }

}

declare module 'net.silentchaos512.gear.gear.material.modifier.ChargedMaterialModifier' {
  import { IMaterialModifierType } from 'net.silentchaos512.gear.api.material.modifier';
  import { Function, Supplier } from 'java.util.function';
  import { Integer } from 'java.lang';
  import { DataComponentType } from 'net.minecraft.core.component';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Optional } from 'java.util';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  interface Type<T extends ChargedMaterialModifier = any> extends IMaterialModifierType<T> {}
  class Type<T extends ChargedMaterialModifier = any> extends IMaterialModifierType<T> {
    constructor(factory: Function<number, T>, dataComponentType: Supplier<DataComponentType<number>>);
    addModifier(mod: T, stack: ItemStack): void;
    checkLevel(stack: ItemStack): number;
    codec(): MapCodec<T>;
    create(level: number): T;
    get id(): ResourceLocation;
    readModifier(stack: ItemStack): Optional<T>;
    removeModifier(stack: ItemStack): void;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, T>;
  }

}

declare module 'net.silentchaos512.gear.gear.material.modifier.CrudeMaterialModifier' {
  import { Type as net_silentchaos512_gear_gear_material_modifier_unitmaterialmodifier_Type } from 'net.silentchaos512.gear.gear.material.modifier.UnitMaterialModifier';
  import { CrudeMaterialModifier } from 'net.silentchaos512.gear.gear.material.modifier';

  interface Type extends net_silentchaos512_gear_gear_material_modifier_unitmaterialmodifier_Type<CrudeMaterialModifier> {}
  class Type extends net_silentchaos512_gear_gear_material_modifier_unitmaterialmodifier_Type<CrudeMaterialModifier> {
    constructor();
  }

}

declare module 'net.silentchaos512.gear.gear.material.modifier.GradeMaterialModifier' {
  import { IMaterialModifierType } from 'net.silentchaos512.gear.api.material.modifier';
  import { GradeMaterialModifier } from 'net.silentchaos512.gear.gear.material.modifier';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Optional } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  interface Type extends IMaterialModifierType<GradeMaterialModifier> {}
  class Type extends IMaterialModifierType<GradeMaterialModifier> {
    addModifier(mod: GradeMaterialModifier, stack: ItemStack): void;
    codec(): MapCodec<GradeMaterialModifier>;
    get id(): ResourceLocation;
    readModifier(stack: ItemStack): Optional<GradeMaterialModifier>;
    removeModifier(stack: ItemStack): void;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, GradeMaterialModifier>;
  }

}

declare module 'net.silentchaos512.gear.gear.material.modifier.UnitMaterialModifier' {
  import { IMaterialModifierType } from 'net.silentchaos512.gear.api.material.modifier';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Supplier } from 'java.util.function';
  import { DataComponentType } from 'net.minecraft.core.component';
  import { Unit } from 'net.minecraft.util';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { Optional } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';

  interface Type<M extends UnitMaterialModifier = any> extends IMaterialModifierType<M> {}
  class Type<M extends UnitMaterialModifier = any> extends IMaterialModifierType<M> {
    constructor(id: ResourceLocation, instance: M, dataComponent: Supplier<DataComponentType<Unit>>, codec: MapCodec<M>, streamCodec: StreamCodec<RegistryFriendlyByteBuf, M>);
    addModifier(mod: M, stack: ItemStack): void;
    codec(): MapCodec<M>;
    get id(): ResourceLocation;
    readModifier(stack: ItemStack): Optional<M>;
    removeModifier(stack: ItemStack): void;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, M>;
  }

}

declare module 'net.silentchaos512.gear.gear.material.ProcessedMaterial' {
  import { MaterialSerializer } from 'net.silentchaos512.gear.api.material';
  import { ProcessedMaterial } from 'net.silentchaos512.gear.gear.material';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';

  interface Serializer extends MaterialSerializer<ProcessedMaterial> {}
  class Serializer extends MaterialSerializer<ProcessedMaterial> {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor();
  }

}

declare module 'net.silentchaos512.gear.gear.material.SimpleMaterial' {
  import { MaterialSerializer } from 'net.silentchaos512.gear.api.material';
  import { SimpleMaterial } from 'net.silentchaos512.gear.gear.material';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';

  interface Serializer extends MaterialSerializer<SimpleMaterial> {}
  class Serializer extends MaterialSerializer<SimpleMaterial> {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor();
  }

}

declare module 'net.silentchaos512.gear.gear.part' {
  import { GearPart, PartType, PartCraftingData, PartDisplayData, PartSerializer } from 'net.silentchaos512.gear.api.part';
  import { Ingredient, CraftingInput } from 'net.minecraft.world.item.crafting';
  import { Collection, List } from 'java.util';
  import { PropertyKey, GearComponentInstance, DataResource, PartGearKey } from 'net.silentchaos512.gear.api.util';
  import { GearPropertyValue, GearPropertyMap, GearProperty } from 'net.silentchaos512.gear.api.property';
  import { GearType, GearTypeMatcher } from 'net.silentchaos512.gear.api.item';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { Component } from 'net.minecraft.network.chat';
  import { MaterialInstance } from 'net.silentchaos512.gear.gear.material';
  import { Codec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { CompoundPartItem } from 'net.silentchaos512.gear.item';
  import { Material } from 'net.silentchaos512.gear.api.material';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Supplier } from 'java.util.function';
  import { DataResourceManager } from 'net.silentchaos512.gear.core';
  import { JsonObject } from 'com.google.gson';
  import { DeferredRegister, DeferredHolder } from 'net.neoforged.neoforge.registries';
  import { Type } from 'net.silentchaos512.gear.gear.part.RepairContext';

  interface AbstractGearPart extends GearPart {}
  class AbstractGearPart extends GearPart {
    addInformation(part: PartInstance, gear: ItemStack, tooltip: Component[], flag: TooltipFlag): void;
    get blacklistedGearTypes(): GearType[];
    get ingredient(): Ingredient;
    get packName(): string;
    getDisplayName(part: PartInstance): Component;
    getDisplayName(part: PartInstance, type: PartType): Component;
    getDisplayNamePrefix(part: PartInstance, gear: ItemStack): Component;
    getPropertyModifiers<T, V extends GearPropertyValue<T>>(instance: PartInstance, partType: PartType, key: PropertyKey<T, V>): Collection<V>;
    isCraftingAllowed(part: PartInstance, partType: PartType, gearType: GearType, craftingInput: CraftingInput): boolean;
    isCraftingAllowed(part: PartInstance, gearType: GearType): boolean;
    onAddToGear(gear: ItemStack, part: PartInstance): void;
    toString(): string;
  }


  interface CoreGearPart extends AbstractGearPart {}
  class CoreGearPart extends AbstractGearPart {
    constructor(gearType: GearType, partType: PartType, crafting: PartCraftingData, display: PartDisplayData, properties: GearPropertyMap);
    canAddToGear(gear: ItemStack, part: PartInstance): boolean;
    get gearType(): GearType;
    get serializer(): PartSerializer<any>;
    get type(): PartType;
    getColor(part: PartInstance, gearType: GearType, layer: number, animationFrame: number): number;
    getDisplayName(part: PartInstance): Component;
    getDisplayName(part: PartInstance, type: PartType): Component;
    getDisplayNamePrefix(part: PartInstance, gear: ItemStack): Component;
    getMaterialName(part: PartInstance, gear: ItemStack): Component;
    getMaterials(part: PartInstance): MaterialInstance[];
    getModelKey(part: PartInstance): string;
    getPrimaryMaterial(part: PartInstance): MaterialInstance;
    getPropertyModifiers<T, V extends GearPropertyValue<T>>(part: PartInstance, partType: PartType, key: PropertyKey<T, V>): Collection<V>;
    randomizeData(gearType: GearType, tier: number): PartInstance;
    toString(): string;
  }


  interface PartInstance extends GearComponentInstance<GearPart> {}
  class PartInstance extends GearComponentInstance<GearPart> {
    static readonly CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    addInformation(gear: ItemStack, tooltip: Component[], flag: TooltipFlag): void;
    static create(part: DataResource<GearPart>, item: CompoundPartItem, material: DataResource<Material>): PartInstance;
    static create(part: DataResource<GearPart>, item: CompoundPartItem, materials: MaterialInstance[]): PartInstance;
    equals(o: any): boolean;
    static from(craftingItem: ItemStack): PartInstance;
    static from(craftingItem: ItemStack, checkSubstitutes: boolean): PartInstance;
    get (): GearPart;
    get displayName(): Component;
    get gearType(): GearType;
    get id(): ResourceLocation;
    get item(): ItemStack;
    get key(): PartGearKey;
    get materials(): MaterialInstance[];
    get modelKey(): string;
    get nullable(): GearPart;
    get primaryMaterial(): MaterialInstance;
    get type(): PartType;
    getColor(gear: ItemStack): number;
    getColor(gear: ItemStack, layer: number, animationFrame: number): number;
    getColor(gearType: GearType, layer: number, animationFrame: number): number;
    getDisplayName(type: PartType, gear: ItemStack): Component;
    getDisplayName(type: PartType): Component;
    getMaterialName(gear: ItemStack): Component;
    getNameColor(partType: PartType, gearType: GearType): number;
    getProperty<T, V extends GearPropertyValue<T>>(partType: PartType, key: PropertyKey<T, V>): T;
    getProperty<T, V extends GearPropertyValue<T>>(partType: PartType, property: GearProperty<T, V>): T;
    getProperty<T, V extends GearPropertyValue<T>>(partType: Supplier<PartType>, key: PropertyKey<T, V>): T;
    getPropertyModifiers<T, V extends GearPropertyValue<T>>(partType: PartType, key: PropertyKey<T, V>): Collection<V>;
    getPropertyModifiers<T, V extends GearPropertyValue<T>>(key: PropertyKey<T, V>): Collection<V>;
    getPropertyModifiers<T, V extends GearPropertyValue<T>>(partType: Supplier<PartType>, key: PropertyKey<T, V>): Collection<V>;
    hashCode(): number;
    isCraftingAllowed(gearType: GearType, inventory: CraftingInput): boolean;
    isValid(): boolean;
    static of(part: DataResource<GearPart>): PartInstance;
    static of(part: GearPart): PartInstance;
    static of(part: DataResource<GearPart>, craftingItem: ItemStack): PartInstance;
    static of(part: GearPart, craftingItem: ItemStack): PartInstance;
    onAddToGear(gear: ItemStack): void;
    onRemoveFromGear(gear: ItemStack): void;
    toString(): string;
  }


  interface PartManager extends DataResourceManager<GearPart> {}
  class PartManager extends DataResourceManager<GearPart> {
    constructor();
    attachExtraData(value: GearPart, packName: string, json: JsonObject): void;
    fromItem(stack: ItemStack): GearPart;
    getPartsOfType(type: PartType): GearPart[];
  }


  class PartSerializers {
    static readonly DISPATCH_CODEC: Codec;
    static readonly DISPATCH_STREAM_CODEC: StreamCodec;
    static readonly REGISTRAR: DeferredRegister;
    static readonly CORE: DeferredHolder;
    static readonly UPGRADE: DeferredHolder;
  }


  class RepairContext {
    constructor(type: Type, gear: ItemStack, material: PartInstance);
    get gear(): ItemStack;
    get material(): PartInstance;
    get repairType(): Type;
  }


  interface UpgradeGearPart extends CoreGearPart {}
  class UpgradeGearPart extends CoreGearPart {
    constructor(gearType: GearType, partType: PartType, upgradeGearTypes: GearTypeMatcher, crafting: PartCraftingData, display: PartDisplayData, properties: GearPropertyMap);
    addInformation(part: PartInstance, gear: ItemStack, tooltip: Component[], flag: TooltipFlag): void;
    canAddToGear(gear: ItemStack, part: PartInstance): boolean;
    get serializer(): PartSerializer<any>;
    get type(): PartType;
    getColor(part: PartInstance, gearType: GearType, layer: number, animationFrame: number): number;
  }

}

declare module 'net.silentchaos512.gear.gear.part.CoreGearPart' {
  import { PartSerializer } from 'net.silentchaos512.gear.api.part';
  import { CoreGearPart } from 'net.silentchaos512.gear.gear.part';

  interface Serializer extends PartSerializer<CoreGearPart> {}
  class Serializer extends PartSerializer<CoreGearPart> {
    constructor();
  }

}

declare module 'net.silentchaos512.gear.gear.part.RepairContext' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Type extends Enum<Type> {}
  class Type extends Enum<Type> {
    static readonly QUICK: Type;
    static readonly ANVIL: Type;
    get bonusEfficiency(): number;
    static valueOf(name: string): Type;
    static values(): Type[];
  }

}

declare module 'net.silentchaos512.gear.gear.part.UpgradeGearPart' {
  import { PartSerializer } from 'net.silentchaos512.gear.api.part';
  import { UpgradeGearPart } from 'net.silentchaos512.gear.gear.part';

  interface Serializer extends PartSerializer<UpgradeGearPart> {}
  class Serializer extends PartSerializer<UpgradeGearPart> {
    constructor();
  }

}

declare module 'net.silentchaos512.gear.gear.trait.effect' {
  import { TraitEffect, TraitEffectType, TraitActionContext } from 'net.silentchaos512.gear.api.traits';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { DataComponentPatch } from 'net.minecraft.core.component';
  import { Collection, Map, List } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Key, ModifierData, Builder } from 'net.silentchaos512.gear.gear.trait.effect.AttributeTraitEffect';
  import { Builder as itemattributemodifiers_Builder } from 'ItemAttributeModifiers';
  import { TargetBlock, FillProperties, UseProperties } from 'net.silentchaos512.gear.gear.trait.effect.BlockFillerTraitEffect';
  import { SoundPlayback } from 'net.silentchaos512.gear.core';
  import { InteractionResult } from 'net.minecraft.world';
  import { UseOnContext } from 'net.minecraft.world.item.context';
  import { TagKey } from 'net.minecraft.tags';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { Holder } from 'net.minecraft.core';
  import { MobEffect } from 'net.minecraft.world.effect';
  import { EntityType, LivingEntity } from 'net.minecraft.world.entity';
  import { AffectedMobTypes } from 'net.silentchaos512.gear.gear.trait.effect.ExtraDamageTraitEffect';
  import { DamageType, DamageSource } from 'net.minecraft.world.damagesource';
  import { NumberProperty, GearPropertyValue, GearProperty } from 'net.silentchaos512.gear.api.property';
  import { StatMod, Builder as net_silentchaos512_gear_gear_trait_effect_numberpropertymodifiertraiteffect_Builder } from 'net.silentchaos512.gear.gear.trait.effect.NumberPropertyModifierTraitEffect';
  import { Player } from 'net.minecraft.world.entity.player';
  import { GearType } from 'net.silentchaos512.gear.api.item';
  import { EffectMap, Builder as net_silentchaos512_gear_gear_trait_effect_targeteffecttraiteffect_Builder } from 'net.silentchaos512.gear.gear.trait.effect.TargetEffectTraitEffect';
  import { PotionData, Builder as net_silentchaos512_gear_gear_trait_effect_wieldereffecttraiteffect_Builder } from 'net.silentchaos512.gear.gear.trait.effect.WielderEffectTraitEffect';
  import { SimpleExplosionDamageCalculator } from 'net.minecraft.world.level';

  interface AttachDataComponentsTraitEffect extends TraitEffect {}
  class AttachDataComponentsTraitEffect extends TraitEffect {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(components: DataComponentPatch);
    get extraWikiLines(): Collection<string>;
    onRecalculatePost(gear: ItemStack, traitLevel: number): void;
    onRecalculatePre(gear: ItemStack, traitLevel: number): void;
    type(): TraitEffectType<any>;
  }


  interface AttributeTraitEffect extends TraitEffect {}
  class AttributeTraitEffect extends TraitEffect {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(map: Map<Key, ModifierData[]>);
    static builder(): Builder;
    get extraWikiLines(): Collection<string>;
    onGetAttributeModifiers(context: TraitActionContext, builder: itemattributemodifiers_Builder): void;
    type(): TraitEffectType<any>;
  }


  interface BlockFillerTraitEffect extends TraitEffect {}
  class BlockFillerTraitEffect extends TraitEffect {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(targetBlock: TargetBlock, fillProperties: FillProperties, useProperties: UseProperties, sound: SoundPlayback);
    get extraWikiLines(): Collection<string>;
    onItemUse(context: UseOnContext, traitLevel: number): InteractionResult;
    type(): TraitEffectType<any>;
  }


  interface BlockMiningSpeedTraitEffect extends TraitEffect {}
  class BlockMiningSpeedTraitEffect extends TraitEffect {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(blocks: TagKey<Block>, speedModifier: number);
    get extraWikiLines(): Collection<string>;
    getMiningSpeedModifier(traitLevel: number, state: BlockState): number;
    type(): TraitEffectType<any>;
  }


  interface BlockPlacerTraitEffect extends TraitEffect {}
  class BlockPlacerTraitEffect extends TraitEffect {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(blockState: BlockState, damageOnUse: number, cooldown: number, sound: SoundPlayback);
    get extraWikiLines(): Collection<string>;
    onItemUse(context: UseOnContext, traitLevel: number): InteractionResult;
    type(): TraitEffectType<any>;
  }


  interface BonusDropsTraitEffect extends TraitEffect {}
  class BonusDropsTraitEffect extends TraitEffect {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(baseChance: number, bonusMultiplier: number, ingredient: Ingredient, matchedItemsText: string);
    addLootDrops(context: TraitActionContext, stack: ItemStack): ItemStack;
    get extraWikiLines(): Collection<string>;
    type(): TraitEffectType<any>;
  }


  interface CancelEffectsTraitEffect extends TraitEffect {}
  class CancelEffectsTraitEffect extends TraitEffect {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(effects: Holder<MobEffect>[]);
    get extraWikiLines(): Collection<string>;
    onUpdate(context: TraitActionContext, isEquipped: boolean): void;
    type(): TraitEffectType<any>;
  }


  interface DurabilityTraitEffect extends TraitEffect {}
  class DurabilityTraitEffect extends TraitEffect {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(activationChance: number, effectScale: number);
    get extraWikiLines(): Collection<string>;
    onDurabilityDamage(context: TraitActionContext, damageTaken: number): number;
    type(): TraitEffectType<any>;
  }


  interface ExtraDamageTraitEffect extends TraitEffect {}
  class ExtraDamageTraitEffect extends TraitEffect {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(bonusDamagePerLevel: number, affectedEntitiesTag: TagKey<EntityType<any>>, affectedMobTypes: AffectedMobTypes);
    static affecting(entityTag: TagKey<EntityType<any>>, bonusDamagePerLevel: number): ExtraDamageTraitEffect;
    static affectingAllMobs(bonusDamagePerLevel: number): ExtraDamageTraitEffect;
    static affectingAquatic(bonusDamagePerLevel: number): ExtraDamageTraitEffect;
    static affectingFireImmune(bonusDamagePerLevel: number): ExtraDamageTraitEffect;
    static affectingHighHealth(bonusDamagePerLevel: number): ExtraDamageTraitEffect;
    get extraWikiLines(): Collection<string>;
    onAttackEntity(context: TraitActionContext, target: LivingEntity, baseValue: number): number;
    type(): TraitEffectType<any>;
  }


  interface FireproofTraitEffect extends TraitEffect {}
  class FireproofTraitEffect extends TraitEffect {
    static readonly INSTANCE: FireproofTraitEffect;
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    get extraWikiLines(): Collection<string>;
    onRecalculatePost(gear: ItemStack, traitLevel: number): void;
    onRecalculatePre(gear: ItemStack, traitLevel: number): void;
    type(): TraitEffectType<any>;
  }


  interface ItemMagnetTraitEffect extends TraitEffect {}
  class ItemMagnetTraitEffect extends TraitEffect {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(pullStrength: number, effectRange: number, affectedItems: Ingredient);

    constructor(pullStrength: number, effectRange: number, affectedItems: Ingredient, affectedItemsTextForWiki: string);
    get extraWikiLines(): Collection<string>;
    onUpdate(context: TraitActionContext, isEquipped: boolean): void;
    type(): TraitEffectType<any>;
  }


  interface NegateDamageTraitEffect extends TraitEffect {}
  class NegateDamageTraitEffect extends TraitEffect {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(damageType: TagKey<DamageType>, negatedDamageScale: number);
    get extraWikiLines(): Collection<string>;
    onEntityIncomingDamage(armor: ItemStack, traitLevel: number, target: LivingEntity, source: DamageSource, amount: number, originalAmount: number): number;
    type(): TraitEffectType<any>;
  }


  interface NumberPropertyModifierTraitEffect extends TraitEffect {}
  class NumberPropertyModifierTraitEffect extends TraitEffect {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(modsIn: Map<NumberProperty, StatMod>);
    static builder(): net_silentchaos512_gear_gear_trait_effect_numberpropertymodifiertraiteffect_Builder;
    get extraWikiLines(): Collection<string>;
    getBonusProperties(traitLevel: number, player: Player, property: GearProperty<any, any>, baseValue: GearPropertyValue<any>, damageRatio: number): Collection<GearPropertyValue<any>>;
    type(): TraitEffectType<any>;
  }


  interface SelfRepairTraitEffect extends TraitEffect {}
  class SelfRepairTraitEffect extends TraitEffect {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(activationChance: number, repairAmount: number);
    get extraWikiLines(): Collection<string>;
    onUpdate(context: TraitActionContext, isEquipped: boolean): void;
    type(): TraitEffectType<any>;
  }


  interface SynergyTraitEffect extends TraitEffect {}
  class SynergyTraitEffect extends TraitEffect {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(multi: number);

    constructor(multi: number, rangeMin: number, rangeMax: number);
    get extraWikiLines(): Collection<string>;
    onCalculateSynergy(synergy: number, traitLevel: number): number;
    type(): TraitEffectType<any>;
  }


  interface TargetEffectTraitEffect extends TraitEffect {}
  class TargetEffectTraitEffect extends TraitEffect {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(effects: Map<GearType, EffectMap>);
    static builder(): net_silentchaos512_gear_gear_trait_effect_targeteffecttraiteffect_Builder;
    get extraWikiLines(): Collection<string>;
    onAttackEntity(context: TraitActionContext, target: LivingEntity, baseValue: number): number;
    type(): TraitEffectType<any>;
  }


  interface WielderEffectTraitEffect extends TraitEffect {}
  class WielderEffectTraitEffect extends TraitEffect {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(potions: Map<GearType, PotionData[]>);
    static builder(): net_silentchaos512_gear_gear_trait_effect_wieldereffecttraiteffect_Builder;
    get extraWikiLines(): Collection<string>;
    onUpdate(context: TraitActionContext, isEquipped: boolean): void;
    type(): TraitEffectType<any>;
  }


  interface WindBlastTraitEffect extends TraitEffect {}
  class WindBlastTraitEffect extends TraitEffect {
    static readonly INSTANCE: WindBlastTraitEffect;
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    static readonly DAMAGE_CALCULATOR: SimpleExplosionDamageCalculator;
    get extraWikiLines(): Collection<string>;
    onAttackEntity(context: TraitActionContext, target: LivingEntity, baseValue: number): number;
    type(): TraitEffectType<any>;
  }

}

declare module 'net.silentchaos512.gear.gear.trait.effect.AttributeTraitEffect' {
  import { Supplier } from 'java.util.function';
  import { GearType } from 'net.silentchaos512.gear.api.item';
  import { EquipmentSlotGroup } from 'net.minecraft.world.entity';
  import { Holder } from 'net.minecraft.core';
  import { Attribute } from 'net.minecraft.world.entity.ai.attributes';
  import { Operation } from 'AttributeModifier';
  import { AttributeTraitEffect } from 'net.silentchaos512.gear.gear.trait.effect';
  import { Codec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { List } from 'java.util';
  import { Float } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { TraitActionContext } from 'net.silentchaos512.gear.api.traits';

  class Builder {
    add(gearType: Supplier<GearType>, group: EquipmentSlotGroup, attribute: Holder<Attribute>, operation: Operation, ...values: number[]): Builder;
    addAnySlot(gearType: Supplier<GearType>, attribute: Holder<Attribute>, operation: Operation, ...values: number[]): Builder;
    addArmorSlots(attribute: Holder<Attribute>, operation: Operation, ...values: number[]): Builder;
    build(): AttributeTraitEffect;
  }


  class ModifierData {
    static readonly CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(attribute: Holder<Attribute>, values: number[], operation: Operation);
    getModId(key: Key, context: TraitActionContext): ResourceLocation;
    static of(attribute: Holder<Attribute>, operation: Operation, ...values: number[]): ModifierData;
  }

}

declare module 'net.silentchaos512.gear.gear.trait.effect.BlockFillerTraitEffect' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface SneakMode extends Enum<SneakMode> {}
  class SneakMode extends Enum<SneakMode> {
    static readonly PASS: SneakMode;
    static readonly CONSTRAIN: SneakMode;
    static readonly IGNORE: SneakMode;
    get serializedName(): string;
    static valueOf(name: string): SneakMode;
    static values(): SneakMode[];
  }

}

declare module 'net.silentchaos512.gear.gear.trait.effect.ExtraDamageTraitEffect' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface AffectedMobTypes extends Enum<AffectedMobTypes> {}
  class AffectedMobTypes extends Enum<AffectedMobTypes> {
    static readonly ALL: AffectedMobTypes;
    static readonly TAGGED: AffectedMobTypes;
    static readonly HIGH_HEALTH: AffectedMobTypes;
    static readonly FIRE_IMMUNE: AffectedMobTypes;
    static readonly AQUATIC: AffectedMobTypes;
    get serializedName(): string;
    static valueOf(name: string): AffectedMobTypes;
    static values(): AffectedMobTypes[];
  }

}

declare module 'net.silentchaos512.gear.gear.trait.effect.NumberPropertyModifierTraitEffect' {
  import { Supplier } from 'java.util.function';
  import { NumberProperty } from 'net.silentchaos512.gear.api.property';
  import { NumberPropertyModifierTraitEffect } from 'net.silentchaos512.gear.gear.trait.effect';

  class Builder {
    add(property: Supplier<NumberProperty>, multiplier: number, multiplyDamageRatio: boolean, multiplyOriginalValue: boolean): Builder;
    build(): NumberPropertyModifierTraitEffect;
  }

}

declare module 'net.silentchaos512.gear.gear.trait.effect.TargetEffectTraitEffect' {
  import { Supplier } from 'java.util.function';
  import { GearType } from 'net.silentchaos512.gear.api.item';
  import { MobEffectInstance, MobEffect } from 'net.minecraft.world.effect';
  import { Holder } from 'net.minecraft.core';
  import { TargetEffectTraitEffect } from 'net.silentchaos512.gear.gear.trait.effect';
  import { Codec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Map, List, Collection } from 'java.util';
  import { Integer } from 'java.lang';
  import { LivingEntity } from 'net.minecraft.world.entity';

  class Builder {
    add(gearType: Supplier<GearType>, traitLevel: number, effect: MobEffectInstance): Builder;
    addWithDurationByLevel(gearType: Supplier<GearType>, effect: Holder<MobEffect>, maxLevel: number, baseDurationInSeconds: number): Builder;
    build(): TargetEffectTraitEffect;
  }


  class EffectMap {
    static readonly CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor();

    constructor(effects: Map<number, MobEffectInstance[]>);
    applyTo(target: LivingEntity, traitLevel: number): void;
    get wikiLines(): Collection<string>;
  }

}

declare module 'net.silentchaos512.gear.gear.trait.effect.WielderEffectTraitEffect' {
  import { Supplier } from 'java.util.function';
  import { GearType } from 'net.silentchaos512.gear.api.item';
  import { Holder } from 'net.minecraft.core';
  import { MobEffect } from 'net.minecraft.world.effect';
  import { WielderEffectTraitEffect } from 'net.silentchaos512.gear.gear.trait.effect';
  import { Codec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { List } from 'java.util';
  import { Integer, Enum } from 'java.lang';

  class Builder {
    add(gearType: Supplier<GearType>, effect: PotionData): Builder;
    add(gearType: Supplier<GearType>, levelType: LevelType, effect: Holder<MobEffect>, ...levels: number[]): Builder;
    build(): WielderEffectTraitEffect;
  }


  class PotionData {
    static readonly CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(type: LevelType, effect: Holder<MobEffect>, duration: number, levels: number[]);
    get wikiLine(): string;
    static of(requiresFullSet: boolean, effect: Holder<MobEffect>, ...levels: number[]): PotionData;
    static of(type: LevelType, effect: Holder<MobEffect>, ...levels: number[]): PotionData;
  }


  interface LevelType extends Enum<LevelType> {}
  class LevelType extends Enum<LevelType> {
    static readonly TRAIT_LEVEL: LevelType;
    static readonly PIECE_COUNT: LevelType;
    static readonly FULL_SET_ONLY: LevelType;
    static byName(name: string): LevelType;
    get name(): string;
    static valueOf(name: string): LevelType;
    static values(): LevelType[];
  }

}

declare module 'net.silentchaos512.gear.gear.trait' {
  import { Codec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { List, Collection } from 'java.util';
  import { TraitEffect, ITraitCondition, TraitActionContext } from 'net.silentchaos512.gear.api.traits';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { GearPropertyValue, GearProperty } from 'net.silentchaos512.gear.api.property';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Builder } from 'ItemAttributeModifiers';
  import { InteractionResult } from 'net.minecraft.world';
  import { UseOnContext } from 'net.minecraft.world.item.context';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Function } from 'java.util.function';
  import { DataResourceManager } from 'net.silentchaos512.gear.core';

  class Trait {
    static readonly CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(maxLevel: number, displayName: Component, description: Component, effects: TraitEffect[], conditions: ITraitCondition[], wikiLines: Component[]);
    addInformation(level: number, tooltip: Component[]): void;
    addInformation(level: number, tooltip: Component[], flag: TooltipFlag): void;
    addInformation(level: number, tooltip: Component[], flag: TooltipFlag, affixFirst: Function<Component, Component>): void;
    addLootDrops(context: TraitActionContext, stack: ItemStack): ItemStack;
    get conditions(): ITraitCondition[];
    get effects(): TraitEffect[];
    get extraWikiLines(): Collection<string>;
    get maxLevel(): number;
    getBonusProperties(traitLevel: number, player: Player, property: GearProperty<any, any>, baseValue: GearPropertyValue<any>, damageRatio: number): Collection<GearPropertyValue<any>>;
    getDescription(level: number): MutableComponent;
    getDisplayName(level: number): MutableComponent;
    getMiningSpeedModifier(traitLevel: number, state: BlockState, baseSpeed: number): number;
    isHidden(): boolean;
    onAttackEntity(context: TraitActionContext, target: LivingEntity, baseValue: number): number;
    onCalculateSynergy(synergy: number, traitLevel: number): number;
    onDurabilityDamage(context: TraitActionContext, damageTaken: number): number;
    onEntityIncomingDamage(armor: ItemStack, traitLevel: number, target: LivingEntity, source: DamageSource, amount: number, originalAmount: number): number;
    onGearCrafted(context: TraitActionContext): void;
    onGetAttributeModifiers(context: TraitActionContext, builder: Builder): void;
    onItemSwing(stack: ItemStack, wielder: LivingEntity, traitLevel: number): void;
    onItemUse(context: UseOnContext, traitLevel: number): InteractionResult;
    onRecalculatePost(gear: ItemStack, traitLevel: number): void;
    onRecalculatePre(gear: ItemStack, traitLevel: number): void;
    onUpdate(context: TraitActionContext, isEquipped: boolean): void;
    showInTooltip(flag: TooltipFlag): boolean;
  }


  interface TraitManager extends DataResourceManager<Trait> {}
  class TraitManager extends DataResourceManager<Trait> {
    constructor();
  }

}

declare module 'net.silentchaos512.gear.item.blueprint' {
  import { Item, ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { TagKey } from 'net.minecraft.tags';
  import { Component } from 'net.minecraft.network.chat';
  import { TooltipContext, Properties } from 'Item';
  import { List } from 'java.util';
  import { Enum } from 'java.lang';
  import { Supplier } from 'java.util.function';
  import { GearType } from 'net.silentchaos512.gear.api.item';
  import { PartType } from 'net.silentchaos512.gear.api.part';

  interface AbstractBlueprintItem extends IBlueprint, Item {}
  class AbstractBlueprintItem extends IBlueprint {
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flags: TooltipFlag): void;
    get itemTag(): TagKey<Item>;
    getCraftingRemainingItem(itemStack: ItemStack): ItemStack;
    getName(stack: ItemStack): Component;
    hasCraftingRemainingItem(stack: ItemStack): boolean;
    hasStandardModel(): boolean;
    isSingleUse(): boolean;
  }


  interface BlueprintType extends Enum<BlueprintType> {}
  class BlueprintType extends Enum<BlueprintType> {
    static readonly BLUEPRINT: BlueprintType;
    static readonly TEMPLATE: BlueprintType;
    static valueOf(name: string): BlueprintType;
    static values(): BlueprintType[];
  }


  interface GearBlueprintItem extends AbstractBlueprintItem {}
  class GearBlueprintItem extends AbstractBlueprintItem {
    constructor(gearType: Supplier<GearType>, type: BlueprintType, properties: Properties);
    appendHoverText(stack: ItemStack, tooltipContext: TooltipContext, tooltip: Component[], flags: TooltipFlag): void;
    gearType(): GearType;
    get itemTag(): TagKey<Item>;
    getGearType(stack: ItemStack): GearType;
    getPartType(stack: ItemStack): PartType;
  }


  class IBlueprint {
    getGearType(var1: ItemStack): GearType;
    getPartType(var1: ItemStack): PartType;
  }


  interface PartBlueprintItem extends AbstractBlueprintItem {}
  class PartBlueprintItem extends AbstractBlueprintItem {
    constructor(partType: Supplier<PartType>, blueprintType: BlueprintType, properties: Properties);
    get itemTag(): TagKey<Item>;
    get partType(): PartType;
    getGearType(stack: ItemStack): GearType;
    getPartType(stack: ItemStack): PartType;
  }

}

declare module 'net.silentchaos512.gear.item.blueprint.BlueprintType' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ConfigOption extends Enum<ConfigOption> {}
  class ConfigOption extends Enum<ConfigOption> {
    static readonly BOTH: ConfigOption;
    static readonly BLUEPRINT: ConfigOption;
    static readonly TEMPLATE: ConfigOption;
    allowBlueprint(): boolean;
    allowTemplate(): boolean;
    static valueOf(name: string): ConfigOption;
    static values(): ConfigOption[];
  }

}

declare module 'net.silentchaos512.gear.item.blueprint.book' {
  import { AbstractContainerMenu, ClickType, Slot } from 'net.minecraft.world.inventory';
  import { Inventory, Player } from 'net.minecraft.world.entity.player';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { ItemStack, Item, TooltipFlag } from 'net.minecraft.world.item';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { IBlueprint } from 'net.silentchaos512.gear.item.blueprint';
  import { IContainerItem, ICycleItem } from 'net.silentchaos512.gear.item';
  import { Properties, TooltipContext } from 'Item';
  import { PartType } from 'net.silentchaos512.gear.api.part';
  import { GearType } from 'net.silentchaos512.gear.api.item';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Direction } from 'net.silentchaos512.gear.item.ICycleItem';
  import { InteractionResultHolder, InteractionHand } from 'net.minecraft.world';
  import { Level } from 'net.minecraft.world.level';
  import { List } from 'java.util';

  interface BlueprintBookContainerMenu extends AbstractContainerMenu {}
  class BlueprintBookContainerMenu extends AbstractContainerMenu {
    constructor(id: number, playerInventory: Inventory, data: RegistryFriendlyByteBuf);
    canTake(slotId: number, slot: Slot, button: number, player: Player, clickType: ClickType): boolean;
    clicked(slotId: number, dragType: number, clickTypeIn: ClickType, player: Player): void;
    mayPickup(playerIn: Player): boolean;
    mayPlace(stack: ItemStack): boolean;
    quickMoveStack(playerIn: Player, index: number): ItemStack;
    stillValid(playerIn: Player): boolean;
  }


  interface BlueprintBookContainerScreen extends AbstractContainerScreen<BlueprintBookContainerMenu> {}
  class BlueprintBookContainerScreen extends AbstractContainerScreen<BlueprintBookContainerMenu> {
    constructor(container: BlueprintBookContainerMenu, playerInventory: Inventory, title: Component);
    mouseClicked(mouseX: number, mouseY: number, p_mouseClicked_5_: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface BlueprintBookItem extends IBlueprint, IContainerItem, ICycleItem, Item {}
  class BlueprintBookItem extends IBlueprint {
    static readonly INVENTORY_SIZE: number;
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, tooltipContext: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    canStore(stack: ItemStack): boolean;
    createdFullyLoadedBook(): ItemStack;
    getCraftingRemainingItem(itemStack: ItemStack): ItemStack;
    getGearType(stack: ItemStack): GearType;
    getInventorySize(stack: ItemStack): number;
    getPartType(stack: ItemStack): PartType;
    static getSelectedSlot(book: ItemStack): number;
    hasCraftingRemainingItem(stack: ItemStack): boolean;
    onCycleKeyPress(stack: ItemStack, direction: Direction): void;
    static openContainer(playerIn: ServerPlayer, stack: ItemStack): void;
    static setSelectedSlot(book: ItemStack, slot: number): void;
    use(worldIn: Level, playerIn: Player, handIn: InteractionHand): InteractionResultHolder<ItemStack>;
  }

}

declare module 'net.silentchaos512.gear.item' {
  import { LootContainerItem } from 'net.silentchaos512.lib.item';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';
  import { ItemStack, TooltipFlag, Item, ItemNameBlockItem, ArrowItem } from 'net.minecraft.world.item';
  import { TooltipContext, Properties } from 'Item';
  import { List, Map } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { MaterialInstance } from 'net.silentchaos512.gear.gear.material';
  import { Supplier, Function } from 'java.util.function';
  import { PartType } from 'net.silentchaos512.gear.api.part';
  import { GearType, ISlingshotAmmo } from 'net.silentchaos512.gear.api.item';
  import { Enum, Integer, Double, Float } from 'java.lang';
  import { Items } from 'DeferredRegister';
  import { Output } from 'CreativeModeTab';
  import { DeferredHolder } from 'net.neoforged.neoforge.registries';
  import { GearBlueprintItem, PartBlueprintItem, BlueprintType } from 'net.silentchaos512.gear.item.blueprint';
  import { BuiltinMaterials } from 'net.silentchaos512.gear.core';
  import { InteractionResultHolder, InteractionHand, InteractionResult } from 'net.minecraft.world';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ComponentItemHandler } from 'net.neoforged.neoforge.items';
  import { Direction } from 'net.silentchaos512.gear.item.ICycleItem';
  import { Type } from 'net.silentchaos512.gear.gear.part.RepairContext';
  import { Block } from 'net.minecraft.world.level.block';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { AbstractArrow } from 'net.minecraft.world.entity.projectile';

  interface BlueprintPackageItem extends LootContainerItem {}
  class BlueprintPackageItem extends LootContainerItem {
    constructor(defaultLootTable: ResourceLocation);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    get defaultLootTable(): ResourceKey<LootTable>;
  }


  interface CompoundMaterialItem extends IColoredMaterialItem, Item {}
  class CompoundMaterialItem extends IColoredMaterialItem {
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    create(materials: MaterialInstance[]): ItemStack;
    create(materials: MaterialInstance[], craftedCount: number): ItemStack;
    getColor(stack: ItemStack, layer: number): number;
    static getModelKey(stack: ItemStack): string;
    getName(stack: ItemStack): Component;
    getPrimarySubMaterial(stack: ItemStack): MaterialInstance;
    static getSubMaterials(stack: ItemStack): MaterialInstance[];
  }


  interface CompoundPartItem extends Item {}
  class CompoundPartItem extends Item {
    constructor(partType: Supplier<PartType>, properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    create(material: MaterialInstance): ItemStack;
    create(material: MaterialInstance, materialCount: number): ItemStack;
    create(materials: MaterialInstance[]): ItemStack;
    get gearType(): GearType;
    get partType(): PartType;
    getColor(stack: ItemStack, layer: number): number;
    getColorWeight(index: number, totalCount: number): number;
    static getMaterials(stack: ItemStack): MaterialInstance[];
    static getModelKey(stack: ItemStack): string;
    getName(stack: ItemStack): Component;
    static getPrimaryMaterial(stack: ItemStack): MaterialInstance;
  }


  interface CraftingItems extends Enum<CraftingItems> {}
  class CraftingItems extends Enum<CraftingItems> {
    static readonly CRUDE_TOOL_PARTS: CraftingItems;
    static readonly BLUEPRINT_PAPER: CraftingItems;
    static readonly TEMPLATE_BOARD: CraftingItems;
    static readonly UPGRADE_BASE: CraftingItems;
    static readonly ADVANCED_UPGRADE_BASE: CraftingItems;
    static readonly BORT: CraftingItems;
    static readonly BRONZE_INGOT: CraftingItems;
    static readonly CRIMSON_IRON_INGOT: CraftingItems;
    static readonly CRIMSON_STEEL_INGOT: CraftingItems;
    static readonly BLAZE_GOLD_INGOT: CraftingItems;
    static readonly AZURE_SILVER_INGOT: CraftingItems;
    static readonly AZURE_ELECTRUM_INGOT: CraftingItems;
    static readonly TYRIAN_STEEL_INGOT: CraftingItems;
    static readonly CRIMSON_IRON_NUGGET: CraftingItems;
    static readonly CRIMSON_STEEL_NUGGET: CraftingItems;
    static readonly BLAZE_GOLD_NUGGET: CraftingItems;
    static readonly AZURE_SILVER_NUGGET: CraftingItems;
    static readonly AZURE_ELECTRUM_NUGGET: CraftingItems;
    static readonly TYRIAN_STEEL_NUGGET: CraftingItems;
    static readonly RAW_CRIMSON_IRON: CraftingItems;
    static readonly CRIMSON_IRON_DUST: CraftingItems;
    static readonly CRIMSON_STEEL_DUST: CraftingItems;
    static readonly BLAZE_GOLD_DUST: CraftingItems;
    static readonly RAW_AZURE_SILVER: CraftingItems;
    static readonly AZURE_SILVER_DUST: CraftingItems;
    static readonly AZURE_ELECTRUM_DUST: CraftingItems;
    static readonly TYRIAN_STEEL_DUST: CraftingItems;
    static readonly DIAMOND_SHARD: CraftingItems;
    static readonly EMERALD_SHARD: CraftingItems;
    static readonly NETHER_STAR_FRAGMENT: CraftingItems;
    static readonly STARMETAL_DUST: CraftingItems;
    static readonly GLOWING_DUST: CraftingItems;
    static readonly BLAZING_DUST: CraftingItems;
    static readonly GLITTERY_DUST: CraftingItems;
    static readonly CRUSHED_SHULKER_SHELL: CraftingItems;
    static readonly LEATHER_SCRAP: CraftingItems;
    static readonly SINEW: CraftingItems;
    static readonly DRIED_SINEW: CraftingItems;
    static readonly SINEW_FIBER: CraftingItems;
    static readonly FINE_SILK: CraftingItems;
    static readonly FINE_SILK_CLOTH: CraftingItems;
    static readonly FLAX_FIBER: CraftingItems;
    static readonly FLAX_STRING: CraftingItems;
    static readonly FLAX_FLOWERS: CraftingItems;
    static readonly FLUFFY_PUFF: CraftingItems;
    static readonly FLUFFY_FABRIC: CraftingItems;
    static readonly FLUFFY_STRING: CraftingItems;
    static readonly FLUFFY_FEATHER: CraftingItems;
    static readonly ROUGH_ROD: CraftingItems;
    static readonly STONE_ROD: CraftingItems;
    static readonly IRON_ROD: CraftingItems;
    static readonly NETHERWOOD_STICK: CraftingItems;
    static readonly MAGNETIC_UPGRADE: CraftingItems;
    static readonly SPOON_UPGRADE: CraftingItems;
    static readonly ROAD_MAKER_UPGRADE: CraftingItems;
    static readonly WIDE_PLATE_UPGRADE: CraftingItems;
    static readonly RED_CARD_UPGRADE: CraftingItems;
    asItem(): Item;
    get name(): string;
    static register(items: Items): void;
    static valueOf(name: string): CraftingItems;
    static values(): CraftingItems[];
  }


  interface CustomMaterialItem extends IColoredMaterialItem, ItemWithSubItems, SingleMaterialItem {}
  class CustomMaterialItem extends IColoredMaterialItem {
    constructor(properties: Properties);
    addSubItems(output: Output): void;
    appendHoverText(pStack: ItemStack, pContext: TooltipContext, pTooltipComponents: Component[], pTooltipFlag: TooltipFlag): void;
    getColor(stack: ItemStack, layer: number): number;
    getName(stack: ItemStack): Component;
    getPrimarySubMaterial(stack: ItemStack): MaterialInstance;
  }


  class GearItemSet<I extends Item = any> {
    constructor(type: DeferredHolder<GearType, GearType>, partName: string, gearItem: Function<Supplier<GearType>, I>);

    constructor(type: DeferredHolder<GearType, GearType>, partName: string, gearItem: Supplier<I>);

    constructor(type: DeferredHolder<GearType, GearType>, partName: string, gearItem: Supplier<I>, mainPart: Supplier<MainPartItem>, blueprint: Supplier<GearBlueprintItem>, template: Supplier<GearBlueprintItem>);
    blueprint(): GearBlueprintItem;
    constructBasicItem(builtinMaterial: BuiltinMaterials): ItemStack;
    gearItem(): I;
    mainPart(): MainPartItem;
    partName(): string;
    registerBlueprintItem(registrar: Items): void;
    registerGearItem(registrar: Items): void;
    registerMainPartItem(registrar: Items): void;
    registerTemplateItem(registrar: Items): void;
    template(): GearBlueprintItem;
    type(): GearType;
  }


  interface GuideBookItem extends Item {}
  class GuideBookItem extends Item {
    constructor(properties: Properties);
    appendHoverText(p_41421_: ItemStack, context: TooltipContext, p_41423_: Component[], p_41424_: TooltipFlag): void;
    use(worldIn: Level, playerIn: Player, handIn: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  class IColoredMaterialItem {
    getColor(var1: ItemStack, var2: number): number;
    getPrimarySubMaterial(var1: ItemStack): MaterialInstance;
  }


  class IContainerItem {
    canStore(var1: ItemStack): boolean;
    getInventory(stack: ItemStack): ComponentItemHandler;
    getInventoryRows(stack: ItemStack): number;
    getInventorySize(var1: ItemStack): number;
  }


  class ICycleItem {
    onCycleKeyPress(var1: ItemStack, var2: Direction): void;
  }


  class ItemWithSubItems {
    addSubItems(var1: Output): void;
  }


  interface JewelerKitItem extends PartBlueprintItem {}
  class JewelerKitItem extends PartBlueprintItem {
    constructor(partType: Supplier<PartType>, blueprintType: BlueprintType, properties: Properties);
    getName(stack: ItemStack): Component;
    hasStandardModel(): boolean;
  }


  interface MainPartItem extends CompoundPartItem {}
  class MainPartItem extends CompoundPartItem {
    constructor(gearType: Supplier<GearType>, properties: Properties);
    get gearType(): GearType;
    getColorWeight(index: number, totalCount: number): number;
    getMaxDamage(stack: ItemStack): number;
  }


  interface ModKitItem extends ICycleItem, Item {}
  class ModKitItem extends ICycleItem {
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    getCraftingRemainingItem(itemStack: ItemStack): ItemStack;
    static getSelectedType(stack: ItemStack): PartType;
    hasCraftingRemainingItem(stack: ItemStack): boolean;
    onCycleKeyPress(stack: ItemStack, direction: Direction): void;
  }


  interface ProcessedMaterialItem extends IColoredMaterialItem, SingleMaterialItem {}
  class ProcessedMaterialItem extends IColoredMaterialItem {
    constructor(properties: Properties);
    getColor(stack: ItemStack, layer: number): number;
    getName(stack: ItemStack): Component;
    getPrimarySubMaterial(stack: ItemStack): MaterialInstance;
  }


  interface RepairKitItem extends Item {}
  class RepairKitItem extends Item {
    constructor(capacity: Supplier<number>, efficiency: Supplier<number>, properties: Properties);
    addMaterial(repairKit: ItemStack, materialStack: ItemStack): boolean;
    appendHoverText(stack: ItemStack, tooltipContext: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    getBarColor(stack: ItemStack): number;
    getBarWidth(stack: ItemStack): number;
    getDamageToRepair(gear: ItemStack, repairKit: ItemStack, repairType: Type): number;
    getRepairEfficiency(repairType: Type): number;
    getRepairMaterials(gear: ItemStack, repairKit: ItemStack, repairType: Type): Map<MaterialInstance, number>;
    isBarVisible(stack: ItemStack): boolean;
    removeRepairMaterials(repairKit: ItemStack, toRemove: Map<MaterialInstance, number>): void;
  }


  interface SeedItem extends ItemNameBlockItem {}
  class SeedItem extends ItemNameBlockItem {
    constructor(blockIn: Block, properties: Properties);
    interactLivingEntity(itemstack: ItemStack, player: Player, entity: LivingEntity, hand: InteractionHand): InteractionResult;
  }


  interface SingleMaterialItem extends Item {}
  class SingleMaterialItem extends Item {
    constructor(pProperties: Properties);
    create(material: MaterialInstance): ItemStack;
    create(material: MaterialInstance, count: number): ItemStack;
    static getMaterial(stack: ItemStack): MaterialInstance;
  }


  interface SlingshotAmmoItem extends ISlingshotAmmo, ArrowItem {}
  class SlingshotAmmoItem extends ISlingshotAmmo {
    constructor(properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    createArrow(level: Level, ammo: ItemStack, shooter: LivingEntity, weapon: ItemStack): AbstractArrow;
  }

}

declare module 'net.silentchaos512.gear.item.gear' {
  import { ArmorItem, ItemStack, Item, TooltipFlag, ArrowItem, AxeItem, BowItem, CrossbowItem, DiggerItem, ElytraItem, FishingRodItem, HoeItem, MaceItem, PickaxeItem, ShearsItem, ShieldItem, UseAnim, ShovelItem, SwordItem, TridentItem } from 'net.minecraft.world.item';
  import { GearArmor, GearType, GearItem, GearDiggerTool, GearRangedWeapon, GearTool, BreakEventHandler, GearWeapon } from 'net.silentchaos512.gear.api.item';
  import { Supplier, Consumer, Predicate } from 'java.util.function';
  import { Type } from 'ArmorItem';
  import { ItemAttributeModifiers, Tool } from 'net.minecraft.world.item.component';
  import { LivingEntity, Entity, EquipmentSlot } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Layer } from 'ArmorMaterial';
  import { TooltipContext, Properties } from 'Item';
  import { List, Collection, Set } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { PartType } from 'net.silentchaos512.gear.api.part';
  import { PartInstance } from 'net.silentchaos512.gear.gear.part';
  import { AbstractArrow, Projectile } from 'net.minecraft.world.entity.projectile';
  import { Position, Direction, BlockPos } from 'net.minecraft.core';
  import { InteractionResult, InteractionResultHolder, InteractionHand } from 'net.minecraft.world';
  import { UseOnContext } from 'net.minecraft.world.item.context';
  import { ItemColor } from 'net.minecraft.client.color.item';
  import { TagKey } from 'net.minecraft.tags';
  import { Block } from 'net.minecraft.world.level.block';
  import { GearPropertiesData } from 'net.silentchaos512.gear.core.component';
  import { ItemAbility } from 'net.neoforged.neoforge.common';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Builder } from 'ItemAttributeModifiers';
  import { IAoeTool } from 'net.silentchaos512.gear.util';
  import { HitResult } from 'net.minecraft.world.phys';
  import { Integer } from 'java.lang';

  interface GearArmorItem extends GearArmor, ArmorItem {}
  class GearArmorItem extends GearArmor {
    constructor(gearType: Supplier<GearType>, armorType: Type);
    appendHoverText(stack: ItemStack, tooltipContext: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    damageItem<T extends LivingEntity>(stack: ItemStack, amount: number, entity: T, onBroken: Consumer<Item>): number;
    get gearType(): GearType;
    static getArmorColor(stack: ItemStack): number;
    getArmorMagicProtection(stack: ItemStack): number;
    getArmorProtection(stack: ItemStack): number;
    getArmorTexture(stack: ItemStack, entity: Entity, slot: EquipmentSlot, layer: Layer, innerModel: boolean): ResourceLocation;
    getArmorToughness(stack: ItemStack): number;
    getBarColor(stack: ItemStack): number;
    getBarWidth(stack: ItemStack): number;
    getDefaultAttributeModifiers(stack: ItemStack): ItemAttributeModifiers;
    getEnchantmentValue(stack: ItemStack): number;
    getMaxDamage(stack: ItemStack): number;
    getRepairModifier(stack: ItemStack): number;
    inventoryTick(stack: ItemStack, worldIn: Level, entityIn: Entity, itemSlot: number, isSelected: boolean): void;
    isFoil(stack: ItemStack): boolean;
    isValidRepairItem(toRepair: ItemStack, repair: ItemStack): boolean;
    isValidSlot(slot: string): boolean;
    makesPiglinsNeutral(stack: ItemStack, wearer: LivingEntity): boolean;
    setDamage(stack: ItemStack, damage: number): void;
  }


  interface GearArrowItem extends GearItem, ArrowItem {}
  class GearArrowItem extends GearItem {
    constructor(gearType: Supplier<GearType>);
    appendHoverText(stack: ItemStack, tooltipContext: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    asProjectile(level: Level, pos: Position, stack: ItemStack, direction: Direction): Projectile;
    construct(parts: Collection<PartInstance>): ItemStack;
    createArrow(level: Level, ammo: ItemStack, shooter: LivingEntity, weapon: ItemStack): AbstractArrow;
    damageItem<T extends LivingEntity>(stack: ItemStack, amount: number, entity: T, onBroken: Consumer<Item>): number;
    get gearType(): GearType;
    get itemColors(): ItemColor;
    get requiredParts(): Collection<PartType>;
    getBarColor(stack: ItemStack): number;
    getBarWidth(stack: ItemStack): number;
    getDefaultAttributeModifiers(stack: ItemStack): ItemAttributeModifiers;
    getEnchantmentValue(stack: ItemStack): number;
    getMaxDamage(stack: ItemStack): number;
    getRepairModifier(stack: ItemStack): number;
    inventoryTick(stack: ItemStack, worldIn: Level, entityIn: Entity, itemSlot: number, isSelected: boolean): void;
    isBarVisible(stack: ItemStack): boolean;
    isFoil(stack: ItemStack): boolean;
    shouldCauseReequipAnimation(oldStack: ItemStack, newStack: ItemStack, slotChanged: boolean): boolean;
    useOn(context: UseOnContext): InteractionResult;
  }


  interface GearAxeItem extends GearDiggerTool, AxeItem {}
  class GearAxeItem extends GearDiggerTool {
    constructor(gearType: Supplier<GearType>);
    appendHoverText(stack: ItemStack, tooltipContext: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    canPerformAction(stack: ItemStack, itemAbility: ItemAbility): boolean;
    damageItem<T extends LivingEntity>(stack: ItemStack, amount: number, entity: T, onBroken: Consumer<Item>): number;
    get gearType(): GearType;
    getBarColor(stack: ItemStack): number;
    getBarWidth(stack: ItemStack): number;
    getDefaultAttributeModifiers(stack: ItemStack): ItemAttributeModifiers;
    getDestroySpeed(stack: ItemStack, state: BlockState): number;
    getEnchantmentValue(stack: ItemStack): number;
    getMaxDamage(stack: ItemStack): number;
    getToolBlockSet(properties: GearPropertiesData): TagKey<Block>;
    getToolBlockSet(stack: ItemStack): TagKey<Block>;
    hurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): boolean;
    inventoryTick(stack: ItemStack, worldIn: Level, entityIn: Entity, itemSlot: number, isSelected: boolean): void;
    isFoil(stack: ItemStack): boolean;
    isValidRepairItem(toRepair: ItemStack, repair: ItemStack): boolean;
    mineBlock(stack: ItemStack, worldIn: Level, state: BlockState, pos: BlockPos, entity: LivingEntity): boolean;
    postHurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): void;
    setDamage(stack: ItemStack, damage: number): void;
    shouldCauseReequipAnimation(oldStack: ItemStack, newStack: ItemStack, slotChanged: boolean): boolean;
    useOn(context: UseOnContext): InteractionResult;
  }


  interface GearBowItem extends GearRangedWeapon, BowItem {}
  class GearBowItem extends GearRangedWeapon {
    constructor(gearType: Supplier<GearType>);
    appendHoverText(stack: ItemStack, tooltipContext: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    damageItem<T extends LivingEntity>(stack: ItemStack, amount: number, entity: T, onBroken: Consumer<Item>): number;
    get gearType(): GearType;
    getArrowDamage(stack: ItemStack): number;
    getArrowVelocity(stack: ItemStack, charge: number): number;
    getBarColor(stack: ItemStack): number;
    getBarWidth(stack: ItemStack): number;
    getDefaultAttributeModifiers(stack: ItemStack): ItemAttributeModifiers;
    getDrawDelay(stack: ItemStack): number;
    getEnchantmentValue(stack: ItemStack): number;
    getMaxDamage(stack: ItemStack): number;
    inventoryTick(stack: ItemStack, worldIn: Level, entityIn: Entity, itemSlot: number, isSelected: boolean): void;
    isFoil(stack: ItemStack): boolean;
    isValidRepairItem(toRepair: ItemStack, repair: ItemStack): boolean;
    setDamage(stack: ItemStack, damage: number): void;
    shouldCauseReequipAnimation(oldStack: ItemStack, newStack: ItemStack, slotChanged: boolean): boolean;
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface GearCrossbowItem extends GearRangedWeapon, CrossbowItem {}
  class GearCrossbowItem extends GearRangedWeapon {
    constructor(gearType: Supplier<GearType>);
    appendHoverText(stack: ItemStack, tooltipContext: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    damageItem<T extends LivingEntity>(stack: ItemStack, amount: number, entity: T, onBroken: Consumer<Item>): number;
    get gearType(): GearType;
    getBarColor(stack: ItemStack): number;
    getBarWidth(stack: ItemStack): number;
    static getChargeTime(stack: ItemStack): number;
    getDefaultAttributeModifiers(stack: ItemStack): ItemAttributeModifiers;
    getEnchantmentValue(stack: ItemStack): number;
    getMaxDamage(stack: ItemStack): number;
    inventoryTick(stack: ItemStack, worldIn: Level, entityIn: Entity, itemSlot: number, isSelected: boolean): void;
    isFoil(stack: ItemStack): boolean;
    isValidRepairItem(toRepair: ItemStack, repair: ItemStack): boolean;
    setDamage(stack: ItemStack, damage: number): void;
    shouldCauseReequipAnimation(oldStack: ItemStack, newStack: ItemStack, slotChanged: boolean): boolean;
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
    useOnRelease(stack: ItemStack): boolean;
  }


  interface GearCurioItem extends GearItem, Item {}
  class GearCurioItem extends GearItem {
    constructor(gearType: Supplier<GearType>, slot: string, properties: Properties);
    appendHoverText(stack: ItemStack, tooltipContext: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    damageItem<T extends LivingEntity>(stack: ItemStack, amount: number, entity: T, onBroken: Consumer<Item>): number;
    get gearType(): GearType;
    get itemColors(): ItemColor;
    get requiredParts(): Collection<PartType>;
    get slot(): string;
    getBarColor(stack: ItemStack): number;
    getBarWidth(stack: ItemStack): number;
    getDefaultAttributeModifiers(stack: ItemStack): ItemAttributeModifiers;
    getEnchantmentValue(stack: ItemStack): number;
    getMaxDamage(stack: ItemStack): number;
    inventoryTick(stack: ItemStack, worldIn: Level, entityIn: Entity, itemSlot: number, isSelected: boolean): void;
    isFoil(stack: ItemStack): boolean;
    isValidRepairItem(toRepair: ItemStack, repair: ItemStack): boolean;
    isValidSlot(slot: string): boolean;
    setDamage(stack: ItemStack, damage: number): void;
    shouldCauseReequipAnimation(oldStack: ItemStack, newStack: ItemStack, slotChanged: boolean): boolean;
  }


  interface GearDaggerItem extends GearSwordItem {}
  class GearDaggerItem extends GearSwordItem {
    constructor(gearType: Supplier<GearType>);
    hurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): boolean;
  }


  interface GearDiggerItem extends GearDiggerTool, DiggerItem {}
  class GearDiggerItem extends GearDiggerTool {
    constructor(gearType: Supplier<GearType>, blocks: TagKey<Block>, properties: Properties);
    appendHoverText(stack: ItemStack, context: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    canPerformAction(stack: ItemStack, toolAction: ItemAbility): boolean;
    damageItem<T extends LivingEntity>(stack: ItemStack, amount: number, entity: T, onBroken: Consumer<Item>): number;
    get gearType(): GearType;
    getBarColor(stack: ItemStack): number;
    getBarWidth(stack: ItemStack): number;
    getDefaultAttributeModifiers(stack: ItemStack): ItemAttributeModifiers;
    getDestroySpeed(stack: ItemStack, state: BlockState): number;
    getEnchantmentValue(stack: ItemStack): number;
    getMaxDamage(stack: ItemStack): number;
    getToolBlockSet(properties: GearPropertiesData): TagKey<Block>;
    getToolBlockSet(stack: ItemStack): TagKey<Block>;
    hurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): boolean;
    inventoryTick(stack: ItemStack, worldIn: Level, entityIn: Entity, itemSlot: number, isSelected: boolean): void;
    isFoil(stack: ItemStack): boolean;
    isValidRepairItem(toRepair: ItemStack, repair: ItemStack): boolean;
    mineBlock(stack: ItemStack, worldIn: Level, state: BlockState, pos: BlockPos, entity: LivingEntity): boolean;
    postHurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): void;
    setDamage(stack: ItemStack, damage: number): void;
    shouldCauseReequipAnimation(oldStack: ItemStack, newStack: ItemStack, slotChanged: boolean): boolean;
    useOn(context: UseOnContext): InteractionResult;
  }


  interface GearElytraItem extends GearArmor, ElytraItem {}
  class GearElytraItem extends GearArmor {
    constructor(gearType: Supplier<GearType>);
    addAttributes(stack: ItemStack, builder: Builder, includeArmor: boolean): void;
    appendHoverText(stack: ItemStack, tooltipContext: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    damageItem<T extends LivingEntity>(stack: ItemStack, amount: number, entity: T, onBroken: Consumer<Item>): number;
    get gearType(): GearType;
    get requiredParts(): Collection<PartType>;
    getBarColor(stack: ItemStack): number;
    getBarWidth(stack: ItemStack): number;
    getDefaultAttributeModifiers(stack: ItemStack): ItemAttributeModifiers;
    getEquipmentSlot(stack: ItemStack): EquipmentSlot;
    getMaxDamage(stack: ItemStack): number;
    getRepairModifier(stack: ItemStack): number;
    inventoryTick(stack: ItemStack, worldIn: Level, entityIn: Entity, itemSlot: number, isSelected: boolean): void;
    isValidRepairItem(toRepair: ItemStack, repair: ItemStack): boolean;
    isValidSlot(slot: string): boolean;
    makesPiglinsNeutral(stack: ItemStack, wearer: LivingEntity): boolean;
    setDamage(stack: ItemStack, damage: number): void;
    supportsPart(gear: ItemStack, part: PartInstance): boolean;
  }


  interface GearExcavatorItem extends IAoeTool, GearShovelItem {}
  class GearExcavatorItem extends IAoeTool {
    constructor(gearType: Supplier<GearType>);
    rayTraceBlocks(world: Level, player: Player): HitResult;
  }


  interface GearFishingRodItem extends GearTool, FishingRodItem {}
  class GearFishingRodItem extends GearTool {
    constructor(gearType: Supplier<GearType>);
    appendHoverText(stack: ItemStack, tooltipContext: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    damageItem<T extends LivingEntity>(stack: ItemStack, amount: number, entity: T, onBroken: Consumer<Item>): number;
    get gearType(): GearType;
    get itemColors(): ItemColor;
    get requiredParts(): Collection<PartType>;
    getBarColor(stack: ItemStack): number;
    getBarWidth(stack: ItemStack): number;
    getDamageOnHitEntity(gear: ItemStack, target: LivingEntity, attacker: LivingEntity): number;
    getDefaultAttributeModifiers(stack: ItemStack): ItemAttributeModifiers;
    getEnchantmentValue(stack: ItemStack): number;
    getMaxDamage(stack: ItemStack): number;
    hurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): boolean;
    inventoryTick(stack: ItemStack, worldIn: Level, entityIn: Entity, itemSlot: number, isSelected: boolean): void;
    isFoil(stack: ItemStack): boolean;
    isValidRepairItem(toRepair: ItemStack, repair: ItemStack): boolean;
    mineBlock(stack: ItemStack, worldIn: Level, state: BlockState, pos: BlockPos, entityLiving: LivingEntity): boolean;
    setDamage(stack: ItemStack, damage: number): void;
    shouldCauseReequipAnimation(oldStack: ItemStack, newStack: ItemStack, slotChanged: boolean): boolean;
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
    useOn(context: UseOnContext): InteractionResult;
  }


  interface GearHammerItem extends IAoeTool, GearPickaxeItem {}
  class GearHammerItem extends IAoeTool {
    constructor(gearType: Supplier<GearType>);
    canPerformAction(stack: ItemStack, itemAbility: ItemAbility): boolean;
    rayTraceBlocks(world: Level, player: Player): HitResult;
  }


  interface GearHoeItem extends GearDiggerTool, HoeItem {}
  class GearHoeItem extends GearDiggerTool {
    constructor(gearType: Supplier<GearType>);
    appendHoverText(stack: ItemStack, tooltipContext: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    canPerformAction(stack: ItemStack, itemAbility: ItemAbility): boolean;
    damageItem<T extends LivingEntity>(stack: ItemStack, amount: number, entity: T, onBroken: Consumer<Item>): number;
    get gearType(): GearType;
    getBarColor(stack: ItemStack): number;
    getBarWidth(stack: ItemStack): number;
    getDefaultAttributeModifiers(stack: ItemStack): ItemAttributeModifiers;
    getDestroySpeed(stack: ItemStack, state: BlockState): number;
    getEnchantmentValue(stack: ItemStack): number;
    getMaxDamage(stack: ItemStack): number;
    getToolBlockSet(properties: GearPropertiesData): TagKey<Block>;
    getToolBlockSet(stack: ItemStack): TagKey<Block>;
    hurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): boolean;
    inventoryTick(stack: ItemStack, worldIn: Level, entityIn: Entity, itemSlot: number, isSelected: boolean): void;
    isFoil(stack: ItemStack): boolean;
    isValidRepairItem(toRepair: ItemStack, repair: ItemStack): boolean;
    mineBlock(stack: ItemStack, worldIn: Level, state: BlockState, pos: BlockPos, entityLiving: LivingEntity): boolean;
    postHurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): void;
    setDamage(stack: ItemStack, damage: number): void;
    shouldCauseReequipAnimation(oldStack: ItemStack, newStack: ItemStack, slotChanged: boolean): boolean;
    useOn(context: UseOnContext): InteractionResult;
  }


  interface GearMaceItem extends GearTool, MaceItem {}
  class GearMaceItem extends GearTool {
    constructor(gearType: Supplier<GearType>);
    appendHoverText(stack: ItemStack, tooltipContext: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    damageItem<T extends LivingEntity>(stack: ItemStack, amount: number, entity: T, onBroken: Consumer<Item>): number;
    get gearType(): GearType;
    getBarColor(stack: ItemStack): number;
    getBarWidth(stack: ItemStack): number;
    getDefaultAttributeModifiers(stack: ItemStack): ItemAttributeModifiers;
    getDestroySpeed(stack: ItemStack, state: BlockState): number;
    getEnchantmentValue(stack: ItemStack): number;
    getMaxDamage(stack: ItemStack): number;
    hurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): boolean;
    inventoryTick(stack: ItemStack, worldIn: Level, entityIn: Entity, itemSlot: number, isSelected: boolean): void;
    isFoil(stack: ItemStack): boolean;
    isValidRepairItem(toRepair: ItemStack, repair: ItemStack): boolean;
    mineBlock(stack: ItemStack, worldIn: Level, state: BlockState, pos: BlockPos, entityLiving: LivingEntity): boolean;
    postHurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): void;
    setDamage(stack: ItemStack, damage: number): void;
    shouldCauseReequipAnimation(oldStack: ItemStack, newStack: ItemStack, slotChanged: boolean): boolean;
  }


  interface GearMacheteItem extends BreakEventHandler, GearDiggerTool, GearSwordItem {}
  class GearMacheteItem extends BreakEventHandler {
    constructor(gearType: Supplier<GearType>);
    createToolProperties(properties: GearPropertiesData): Tool;
    getDestroySpeed(stack: ItemStack, state: BlockState): number;
    getToolBlockSet(properties: GearPropertiesData): TagKey<Block>;
    getToolBlockSet(stack: ItemStack): TagKey<Block>;
    onBlockBreakEvent(stack: ItemStack, player: Player, level: Level, pos: BlockPos, state: BlockState): void;
  }


  interface GearMattockItem extends GearHoeItem {}
  class GearMattockItem extends GearHoeItem {
    constructor(gearType: Supplier<GearType>);
    getToolBlockSet(properties: GearPropertiesData): TagKey<Block>;
    getToolBlockSet(stack: ItemStack): TagKey<Block>;
  }


  interface GearPaxelItem extends GearPickaxeItem {}
  class GearPaxelItem extends GearPickaxeItem {
    constructor(gearType: Supplier<GearType>);
    canPerformAction(stack: ItemStack, itemAbility: ItemAbility): boolean;
    getToolBlockSet(properties: GearPropertiesData): TagKey<Block>;
    getToolBlockSet(stack: ItemStack): TagKey<Block>;
    useOn(context: UseOnContext): InteractionResult;
  }


  interface GearPickaxeItem extends GearDiggerTool, PickaxeItem {}
  class GearPickaxeItem extends GearDiggerTool {
    static readonly ACTIONS_WITH_SPOON: Set;
    constructor(gearType: Supplier<GearType>);
    appendHoverText(stack: ItemStack, tooltipContext: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    canPerformAction(stack: ItemStack, itemAbility: ItemAbility): boolean;
    damageItem<T extends LivingEntity>(stack: ItemStack, amount: number, entity: T, onBroken: Consumer<Item>): number;
    get gearType(): GearType;
    getBarColor(stack: ItemStack): number;
    getBarWidth(stack: ItemStack): number;
    getDefaultAttributeModifiers(stack: ItemStack): ItemAttributeModifiers;
    getDestroySpeed(stack: ItemStack, state: BlockState): number;
    getEnchantmentValue(stack: ItemStack): number;
    getMaxDamage(stack: ItemStack): number;
    getToolBlockSet(properties: GearPropertiesData): TagKey<Block>;
    getToolBlockSet(stack: ItemStack): TagKey<Block>;
    hurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): boolean;
    inventoryTick(stack: ItemStack, worldIn: Level, entityIn: Entity, itemSlot: number, isSelected: boolean): void;
    isFoil(stack: ItemStack): boolean;
    isValidRepairItem(toRepair: ItemStack, repair: ItemStack): boolean;
    mineBlock(stack: ItemStack, worldIn: Level, state: BlockState, pos: BlockPos, entity: LivingEntity): boolean;
    postHurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): void;
    setDamage(stack: ItemStack, damage: number): void;
    shouldCauseReequipAnimation(oldStack: ItemStack, newStack: ItemStack, slotChanged: boolean): boolean;
    useOn(context: UseOnContext): InteractionResult;
  }


  interface GearProspectorHammerItem extends GearPickaxeItem {}
  class GearProspectorHammerItem extends GearPickaxeItem {
    constructor(gearType: Supplier<GearType>);
    canPerformAction(stack: ItemStack, itemAbility: ItemAbility): boolean;
    getProspectingRange(stack: ItemStack): number;
    getTargetedBlocks(context: UseOnContext, range: number, face: Direction): Set<BlockState>;
    useOn(context: UseOnContext): InteractionResult;
  }


  interface GearSawItem extends BreakEventHandler, GearAxeItem {}
  class GearSawItem extends BreakEventHandler {
    constructor(gearType: Supplier<GearType>);
    onBlockBreakEvent(stack: ItemStack, player: Player, level: Level, pos: BlockPos, state: BlockState): void;
  }


  interface GearShearsItem extends GearTool, ShearsItem {}
  class GearShearsItem extends GearTool {
    constructor(gearType: Supplier<GearType>);
    appendHoverText(stack: ItemStack, tooltipContext: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    createToolProperties(properties: GearPropertiesData): Tool;
    damageItem<T extends LivingEntity>(stack: ItemStack, amount: number, entity: T, onBroken: Consumer<Item>): number;
    get gearType(): GearType;
    getBarColor(stack: ItemStack): number;
    getBarWidth(stack: ItemStack): number;
    getDamageOnBlockBreak(gear: ItemStack, world: Level, state: BlockState, pos: BlockPos): number;
    getDefaultAttributeModifiers(stack: ItemStack): ItemAttributeModifiers;
    getEnchantmentValue(stack: ItemStack): number;
    getMaxDamage(stack: ItemStack): number;
    hurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): boolean;
    interactLivingEntity(stack: ItemStack, playerIn: Player, entity: LivingEntity, hand: InteractionHand): InteractionResult;
    inventoryTick(stack: ItemStack, worldIn: Level, entityIn: Entity, itemSlot: number, isSelected: boolean): void;
    isEnchantable(stack: ItemStack): boolean;
    isFoil(stack: ItemStack): boolean;
    isValidRepairItem(toRepair: ItemStack, repair: ItemStack): boolean;
    mineBlock(stack: ItemStack, worldIn: Level, state: BlockState, pos: BlockPos, entityLiving: LivingEntity): boolean;
    postHurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): void;
    setDamage(stack: ItemStack, damage: number): void;
    shouldCauseReequipAnimation(oldStack: ItemStack, newStack: ItemStack, slotChanged: boolean): boolean;
  }


  interface GearShieldItem extends GearItem, ShieldItem {}
  class GearShieldItem extends GearItem {
    constructor(gearType: Supplier<GearType>);
    appendHoverText(stack: ItemStack, tooltipContext: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    canPerformAction(stack: ItemStack, itemAbility: ItemAbility): boolean;
    damageItem<T extends LivingEntity>(stack: ItemStack, amount: number, entity: T, onBroken: Consumer<Item>): number;
    get gearType(): GearType;
    get itemColors(): ItemColor;
    get requiredParts(): Collection<PartType>;
    getBarColor(stack: ItemStack): number;
    getBarWidth(stack: ItemStack): number;
    getDefaultAttributeModifiers(stack: ItemStack): ItemAttributeModifiers;
    getEnchantmentValue(stack: ItemStack): number;
    getMaxDamage(stack: ItemStack): number;
    getRepairModifier(stack: ItemStack): number;
    getUseAnimation(stack: ItemStack): UseAnim;
    hurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): boolean;
    inventoryTick(stack: ItemStack, worldIn: Level, entityIn: Entity, itemSlot: number, isSelected: boolean): void;
    isEnchantable(stack: ItemStack): boolean;
    isFoil(stack: ItemStack): boolean;
    isValidRepairItem(toRepair: ItemStack, repair: ItemStack): boolean;
    isValidSlot(slot: string): boolean;
    mineBlock(stack: ItemStack, worldIn: Level, state: BlockState, pos: BlockPos, entityLiving: LivingEntity): boolean;
    postHurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): void;
    setDamage(stack: ItemStack, damage: number): void;
    shouldCauseReequipAnimation(oldStack: ItemStack, newStack: ItemStack, slotChanged: boolean): boolean;
    use(worldIn: Level, playerIn: Player, handIn: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface GearShovelItem extends GearDiggerTool, ShovelItem {}
  class GearShovelItem extends GearDiggerTool {
    constructor(gearType: Supplier<GearType>);
    appendHoverText(stack: ItemStack, tooltipContext: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    damageItem<T extends LivingEntity>(stack: ItemStack, amount: number, entity: T, onBroken: Consumer<Item>): number;
    get gearType(): GearType;
    getBarColor(stack: ItemStack): number;
    getBarWidth(stack: ItemStack): number;
    getDefaultAttributeModifiers(stack: ItemStack): ItemAttributeModifiers;
    getDestroySpeed(stack: ItemStack, state: BlockState): number;
    getEnchantmentValue(stack: ItemStack): number;
    getMaxDamage(stack: ItemStack): number;
    getToolBlockSet(properties: GearPropertiesData): TagKey<Block>;
    getToolBlockSet(stack: ItemStack): TagKey<Block>;
    hurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): boolean;
    inventoryTick(stack: ItemStack, worldIn: Level, entityIn: Entity, itemSlot: number, isSelected: boolean): void;
    isFoil(stack: ItemStack): boolean;
    isValidRepairItem(toRepair: ItemStack, repair: ItemStack): boolean;
    mineBlock(stack: ItemStack, worldIn: Level, state: BlockState, pos: BlockPos, entity: LivingEntity): boolean;
    postHurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): void;
    setDamage(stack: ItemStack, damage: number): void;
    shouldCauseReequipAnimation(oldStack: ItemStack, newStack: ItemStack, slotChanged: boolean): boolean;
    useOn(context: UseOnContext): InteractionResult;
  }


  interface GearSickleItem extends BreakEventHandler, GearDiggerItem {}
  class GearSickleItem extends BreakEventHandler {
    constructor(gearType: Supplier<GearType>);
    getDamageOnBlockBreak(gear: ItemStack, world: Level, state: BlockState, pos: BlockPos): number;
    onBlockBreakEvent(stack: ItemStack, player: Player, level: Level, pos: BlockPos, state: BlockState): void;
    useOn(context: UseOnContext): InteractionResult;
  }


  interface GearSlingshotItem extends GearBowItem {}
  class GearSlingshotItem extends GearBowItem {
    constructor(gearType: Supplier<GearType>);
    get allSupportedProjectiles(): Predicate<ItemStack>;
    getArrowVelocity(stack: ItemStack, charge: number): number;
  }


  interface GearSpearItem extends GearWeapon, Item {}
  class GearSpearItem extends GearWeapon {
    constructor(gearType: Supplier<GearType>);
    appendHoverText(stack: ItemStack, tooltipContext: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    canAttackBlock(state: BlockState, level: Level, pos: BlockPos, player: Player): boolean;
    damageItem<T extends LivingEntity>(stack: ItemStack, amount: number, entity: T, onBroken: Consumer<Item>): number;
    get gearType(): GearType;
    getBarColor(stack: ItemStack): number;
    getBarWidth(stack: ItemStack): number;
    getDefaultAttributeModifiers(stack: ItemStack): ItemAttributeModifiers;
    getEnchantmentValue(stack: ItemStack): number;
    getMaxDamage(stack: ItemStack): number;
    hurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): boolean;
    inventoryTick(stack: ItemStack, worldIn: Level, entityIn: Entity, itemSlot: number, isSelected: boolean): void;
    isFoil(stack: ItemStack): boolean;
    isValidRepairItem(toRepair: ItemStack, repair: ItemStack): boolean;
    mineBlock(stack: ItemStack, worldIn: Level, state: BlockState, pos: BlockPos, entityLiving: LivingEntity): boolean;
    postHurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): void;
    setDamage(stack: ItemStack, damage: number): void;
    shouldCauseReequipAnimation(oldStack: ItemStack, newStack: ItemStack, slotChanged: boolean): boolean;
    useOn(context: UseOnContext): InteractionResult;
  }


  interface GearSwordItem extends GearWeapon, SwordItem {}
  class GearSwordItem extends GearWeapon {
    constructor(gearType: Supplier<GearType>);
    appendHoverText(stack: ItemStack, tooltipContext: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    createToolProperties(properties: GearPropertiesData): Tool;
    damageItem<T extends LivingEntity>(stack: ItemStack, amount: number, entity: T, onBroken: Consumer<Item>): number;
    get gearType(): GearType;
    getBarColor(stack: ItemStack): number;
    getBarWidth(stack: ItemStack): number;
    getDefaultAttributeModifiers(stack: ItemStack): ItemAttributeModifiers;
    getEnchantmentValue(stack: ItemStack): number;
    getMaxDamage(stack: ItemStack): number;
    hurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): boolean;
    inventoryTick(stack: ItemStack, worldIn: Level, entityIn: Entity, itemSlot: number, isSelected: boolean): void;
    isFoil(stack: ItemStack): boolean;
    isValidRepairItem(toRepair: ItemStack, repair: ItemStack): boolean;
    mineBlock(stack: ItemStack, worldIn: Level, state: BlockState, pos: BlockPos, entityLiving: LivingEntity): boolean;
    postHurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): void;
    setDamage(stack: ItemStack, damage: number): void;
    shouldCauseReequipAnimation(oldStack: ItemStack, newStack: ItemStack, slotChanged: boolean): boolean;
    useOn(context: UseOnContext): InteractionResult;
  }


  interface GearTridentItem extends GearWeapon, TridentItem {}
  class GearTridentItem extends GearWeapon {
    constructor(gearType: Supplier<GearType>);
    appendHoverText(stack: ItemStack, tooltipContext: TooltipContext, tooltip: Component[], flagIn: TooltipFlag): void;
    asProjectile(level: Level, pos: Position, stack: ItemStack, direction: Direction): Projectile;
    damageItem<T extends LivingEntity>(stack: ItemStack, amount: number, entity: T, onBroken: Consumer<Item>): number;
    get gearType(): GearType;
    getBarColor(stack: ItemStack): number;
    getBarWidth(stack: ItemStack): number;
    getDefaultAttributeModifiers(stack: ItemStack): ItemAttributeModifiers;
    getEnchantmentValue(stack: ItemStack): number;
    getMaxDamage(stack: ItemStack): number;
    static getProjectileAttackDamage(stack: ItemStack): number;
    static getProjectileSpeedMultiplier(stack: ItemStack): number;
    static getUseTimeRequiredToThrow(stack: ItemStack): number;
    hurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): boolean;
    inventoryTick(stack: ItemStack, worldIn: Level, entityIn: Entity, itemSlot: number, isSelected: boolean): void;
    isFoil(stack: ItemStack): boolean;
    isValidRepairItem(toRepair: ItemStack, repair: ItemStack): boolean;
    mineBlock(stack: ItemStack, worldIn: Level, state: BlockState, pos: BlockPos, entityLiving: LivingEntity): boolean;
    postHurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): void;
    releaseUsing(stack: ItemStack, level: Level, entityLiving: LivingEntity, timeLeft: number): void;
    setDamage(stack: ItemStack, damage: number): void;
    shouldCauseReequipAnimation(oldStack: ItemStack, newStack: ItemStack, slotChanged: boolean): boolean;
    useOn(context: UseOnContext): InteractionResult;
  }

}

declare module 'net.silentchaos512.gear.item.ICycleItem' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Direction extends Enum<Direction> {}
  class Direction extends Enum<Direction> {
    static readonly BACK: Direction;
    static readonly NEXT: Direction;
    static readonly NEITHER: Direction;
    static valueOf(name: string): Direction;
    static values(): Direction[];
  }

}

declare module 'net.silentchaos512.gear.loot.condition' {
  import { LootItemCondition, LootItemConditionType } from 'net.minecraft.world.level.storage.loot.predicates';
  import { MapCodec } from 'com.mojang.serialization';
  import { DataResource } from 'net.silentchaos512.gear.api.util';
  import { Trait } from 'net.silentchaos512.gear.gear.trait';
  import { SimpleIntRange } from 'net.silentchaos512.gear.util';
  import { LootContext } from 'net.minecraft.world.level.storage.loot';
  import { Builder } from 'LootItemCondition';

  interface GearLootCondition extends LootItemCondition {}
  class GearLootCondition extends LootItemCondition {
  }


  interface HasTraitCondition extends GearLootCondition {}
  class HasTraitCondition extends GearLootCondition {
    static readonly CODEC: MapCodec;
    constructor(trait: DataResource<Trait>, level: SimpleIntRange);
    static builder(trait: DataResource<Trait>): Builder;
    static builder(trait: DataResource<Trait>, minLevel: number): Builder;
    static builder(trait: DataResource<Trait>, minLevel: number, maxLevel: number): Builder;
    get type(): LootItemConditionType;
    test(context: LootContext): boolean;
  }

}

declare module 'net.silentchaos512.gear.loot.function' {
  import { LootItemConditionalFunction, LootItemFunctionType } from 'net.minecraft.world.level.storage.loot.functions';
  import { MapCodec } from 'com.mojang.serialization';
  import { Builder } from 'LootItemConditionalFunction';
  import { List } from 'java.util';
  import { PartInstance } from 'net.silentchaos512.gear.gear.part';

  interface SetPartsFunction extends LootItemConditionalFunction {}
  class SetPartsFunction extends LootItemConditionalFunction {
    static readonly CODEC: MapCodec;
    static builder(parts: PartInstance[]): Builder<any>;
    get type(): LootItemFunctionType<LootItemConditionalFunction>;
  }

}

declare module 'net.silentchaos512.gear.loot.modifier' {
  import { LootModifier, IGlobalLootModifier } from 'net.neoforged.neoforge.common.loot';
  import { Supplier } from 'java.util.function';
  import { LootItemCondition } from 'net.minecraft.world.level.storage.loot.predicates';
  import { MapCodec } from 'com.mojang.serialization';

  interface BonusDropsTraitLootModifier extends LootModifier {}
  class BonusDropsTraitLootModifier extends LootModifier {
    static readonly CODEC: Supplier;
    constructor(conditionsIn: LootItemCondition[]);
    codec(): MapCodec<IGlobalLootModifier>;
  }


  interface EnchantedDropsTraitLootModifier extends LootModifier {}
  class EnchantedDropsTraitLootModifier extends LootModifier {
    constructor(traitLevel: number, conditionsIn: LootItemCondition[]);
  }


  interface FortuneTraitLootModifier extends EnchantedDropsTraitLootModifier {}
  class FortuneTraitLootModifier extends EnchantedDropsTraitLootModifier {
    static readonly CODEC: Supplier;
    constructor(traitLevel: number, conditionsIn: LootItemCondition[]);
    codec(): MapCodec<IGlobalLootModifier>;
  }


  interface MagmaticTraitLootModifier extends LootModifier {}
  class MagmaticTraitLootModifier extends LootModifier {
    static readonly CODEC: Supplier;
    constructor(conditionsIn: LootItemCondition[]);
    codec(): MapCodec<IGlobalLootModifier>;
  }


  interface SilkTouchTraitLootModifier extends EnchantedDropsTraitLootModifier {}
  class SilkTouchTraitLootModifier extends EnchantedDropsTraitLootModifier {
    static readonly CODEC: Supplier;
    constructor(conditionsIn: LootItemCondition[]);
    codec(): MapCodec<IGlobalLootModifier>;
  }

}

declare module 'net.silentchaos512.gear.mixin' {
  import { ItemStack } from 'net.minecraft.world.item';

  class MixinItemEntity {
    get item(): ItemStack;
  }


  class MixinPowderSnowBlock {
  }

}

declare module 'net.silentchaos512.gear.network.payload.client.KeyPressOnItemPayload' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface KeyPressType extends Enum<KeyPressType> {}
  class KeyPressType extends Enum<KeyPressType> {
    static readonly CYCLE_BACK: KeyPressType;
    static readonly CYCLE_NEXT: KeyPressType;
    static readonly OPEN_ITEM: KeyPressType;
    static valueOf(name: string): KeyPressType;
    static values(): KeyPressType[];
  }

}

declare module 'net.silentchaos512.gear.network.payload.server.CommandOutputPayload' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface CommandType extends Enum<CommandType> {}
  class CommandType extends Enum<CommandType> {
    static readonly MATERIALS: CommandType;
    static readonly TRAITS: CommandType;
    static valueOf(name: string): CommandType;
    static values(): CommandType[];
  }

}

declare module 'net.silentchaos512.gear.network.payload.server' {
  import { Map } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';

  class DataResourcesPayload<T = any> {
    values(): Map<ResourceLocation, T>;
  }

}

declare module 'net.silentchaos512.gear.network' {
  import { SyncTraitsPayload, SyncMaterialsPayload, SyncPartsPayload, CommandOutputPayload, OpenGuideBookPayload } from 'net.silentchaos512.gear.network.payload.server';
  import { IPayloadContext } from 'net.neoforged.neoforge.network.handling';
  import { RegisterPayloadHandlersEvent } from 'net.neoforged.neoforge.network.event';
  import { AckPayload, AlloyMakerUpdatePayload, SwingGearPayload, KeyPressOnItemPayload, RecalculateStatsPayload, SelectBlueprintInBookPayload } from 'net.silentchaos512.gear.network.payload.client';

  class SgClientPayloadHandler {
    static get instance(): SgClientPayloadHandler;
    handleCommandOutput(data: CommandOutputPayload, ctx: IPayloadContext): void;
    handleOpenGuideBook(data: OpenGuideBookPayload, ctx: IPayloadContext): void;
    handleSyncMaterials(data: SyncMaterialsPayload, ctx: IPayloadContext): void;
    handleSyncParts(data: SyncPartsPayload, ctx: IPayloadContext): void;
    handleSyncTraits(data: SyncTraitsPayload, ctx: IPayloadContext): void;
  }


  class SgNetwork {
    static register(event: RegisterPayloadHandlersEvent): void;
  }


  class SgServerPayloadHandler {
    static get instance(): SgServerPayloadHandler;
    handleAck(data: AckPayload, ctx: IPayloadContext): void;
    handleAlloyMakerUpdate(data: AlloyMakerUpdatePayload, ctx: IPayloadContext): void;
    handleKeyPressOnItem(data: KeyPressOnItemPayload, ctx: IPayloadContext): void;
    handleRecalculateStats(data: RecalculateStatsPayload, ctx: IPayloadContext): void;
    handleSelectBlueprintInBook(data: SelectBlueprintInBookPayload, ctx: IPayloadContext): void;
    handleSwingGear(data: SwingGearPayload, ctx: IPayloadContext): void;
  }

}

declare module 'net.silentchaos512.gear.setup.gear' {
  import { DeferredRegister, DeferredHolder } from 'net.neoforged.neoforge.registries';
  import { Supplier } from 'java.util.function';
  import { Codec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';

  class GearProperties {
    static readonly REGISTRAR: DeferredRegister;
    static readonly ADDITIVE: Supplier;
    static readonly TRAITS: Supplier;
    static readonly DURABILITY: Supplier;
    static readonly ARMOR_DURABILITY: Supplier;
    static readonly REPAIR_EFFICIENCY: Supplier;
    static readonly REPAIR_VALUE: Supplier;
    static readonly ENCHANTMENT_VALUE: Supplier;
    static readonly CHARGING_VALUE: Supplier;
    static readonly RARITY: Supplier;
    static readonly HARVEST_TIER: Supplier;
    static readonly HARVEST_SPEED: Supplier;
    static readonly BLOCK_REACH: Supplier;
    static readonly ATTACK_DAMAGE: Supplier;
    static readonly ATTACK_SPEED: Supplier;
    static readonly ATTACK_REACH: Supplier;
    static readonly MAGIC_DAMAGE: Supplier;
    static readonly RANGED_DAMAGE: Supplier;
    static readonly DRAW_SPEED: Supplier;
    static readonly PROJECTILE_SPEED: Supplier;
    static readonly PROJECTILE_ACCURACY: Supplier;
    static readonly ARMOR: Supplier;
    static readonly ARMOR_TOUGHNESS: Supplier;
    static readonly KNOCKBACK_RESISTANCE: Supplier;
    static readonly MAGIC_ARMOR: Supplier;
  }


  class GearTypes {
    static readonly REGISTRAR: DeferredRegister;
    static readonly NONE: DeferredHolder;
    static readonly ALL: DeferredHolder;
    static readonly TOOL: DeferredHolder;
    static readonly WEAPON: DeferredHolder;
    static readonly ARMOR: DeferredHolder;
    static readonly HARVEST_TOOL: DeferredHolder;
    static readonly MELEE_WEAPON: DeferredHolder;
    static readonly RANGED_WEAPON: DeferredHolder;
    static readonly HYBRID_WEAPON: DeferredHolder;
    static readonly CURIO: DeferredHolder;
    static readonly PROJECTILE: DeferredHolder;
    static readonly PICKAXE: DeferredHolder;
    static readonly SHOVEL: DeferredHolder;
    static readonly AXE: DeferredHolder;
    static readonly HOE: DeferredHolder;
    static readonly SHEARS: DeferredHolder;
    static readonly HAMMER: DeferredHolder;
    static readonly EXCAVATOR: DeferredHolder;
    static readonly SAW: DeferredHolder;
    static readonly SICKLE: DeferredHolder;
    static readonly MATTOCK: DeferredHolder;
    static readonly PAXEL: DeferredHolder;
    static readonly PROSPECTOR_HAMMER: DeferredHolder;
    static readonly SWORD: DeferredHolder;
    static readonly KATANA: DeferredHolder;
    static readonly MACHETE: DeferredHolder;
    static readonly SPEAR: DeferredHolder;
    static readonly MACE: DeferredHolder;
    static readonly DAGGER: DeferredHolder;
    static readonly KNIFE: DeferredHolder;
    static readonly BOW: DeferredHolder;
    static readonly CROSSBOW: DeferredHolder;
    static readonly SLINGSHOT: DeferredHolder;
    static readonly TRIDENT: DeferredHolder;
    static readonly FISHING_ROD: DeferredHolder;
    static readonly SHIELD: DeferredHolder;
    static readonly HELMET: DeferredHolder;
    static readonly CHESTPLATE: DeferredHolder;
    static readonly LEGGINGS: DeferredHolder;
    static readonly BOOTS: DeferredHolder;
    static readonly ELYTRA: DeferredHolder;
    static readonly ARROW: DeferredHolder;
    static readonly BRACELET: DeferredHolder;
    static readonly NECKLACE: DeferredHolder;
    static readonly RING: DeferredHolder;
  }


  class MaterialModifiers {
    static readonly REGISTRAR: DeferredRegister;
    static readonly GRADE: DeferredHolder;
    static readonly STARCHARGED: DeferredHolder;
    static readonly CRUDE: DeferredHolder;
    static readonly CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
  }


  class PartTypes {
    static readonly REGISTRAR: DeferredRegister;
    static readonly NONE: DeferredHolder;
    static readonly MAIN: DeferredHolder;
    static readonly ROD: DeferredHolder;
    static readonly TIP: DeferredHolder;
    static readonly CORD: DeferredHolder;
    static readonly FLETCHING: DeferredHolder;
    static readonly BINDING: DeferredHolder;
    static readonly COATING: DeferredHolder;
    static readonly GRIP: DeferredHolder;
    static readonly LINING: DeferredHolder;
    static readonly SETTING: DeferredHolder;
    static readonly MISC_UPGRADE: DeferredHolder;
  }


  class TraitConditions {
    static readonly REGISTRAR: DeferredRegister;
    static readonly AND: DeferredHolder;
    static readonly GEAR_TYPE: DeferredHolder;
    static readonly MATERIAL_COUNT: DeferredHolder;
    static readonly MATERIAL_RATIO: DeferredHolder;
    static readonly NOT: DeferredHolder;
    static readonly OR: DeferredHolder;
  }


  class TraitEffectTypes {
    static readonly REGISTRAR: DeferredRegister;
    static readonly ATTACH_DATA_COMPONENTS: Supplier;
    static readonly ATTRIBUTE: Supplier;
    static readonly BLOCK_FILLER: Supplier;
    static readonly BLOCK_MINING_SPEED: Supplier;
    static readonly BLOCK_PLACER: Supplier;
    static readonly BONUS_DROPS: Supplier;
    static readonly CANCEL_EFFECTS: Supplier;
    static readonly DURABILITY: Supplier;
    static readonly EXTRA_DAMAGE: Supplier;
    static readonly FIREPROOF: Supplier;
    static readonly ITEM_MAGNET: Supplier;
    static readonly NEGATE_DAMAGE: Supplier;
    static readonly NUMBER_PROPERTY_MODIFIER: Supplier;
    static readonly SELF_REPAIR: Supplier;
    static readonly SYNERGY_MULTIPLIER: Supplier;
    static readonly TARGET_EFFECT: Supplier;
    static readonly WIELDER_EFFECT: Supplier;
    static readonly WIND_BLAST: Supplier;
  }

}

declare module 'net.silentchaos512.gear.setup' {
  import { GearItemSet } from 'net.silentchaos512.gear.item';
  import { Iterator, List, Collection } from 'java.util';
  import { BreakSpeed } from 'PlayerEvent';
  import { DeferredRegister, DeferredHolder, DeferredBlock, DeferredItem, NewRegistryEvent } from 'net.neoforged.neoforge.registries';
  import { Blocks, DataComponents, Items } from 'DeferredRegister';
  import { FMLCommonSetupEvent } from 'net.neoforged.fml.event.lifecycle';
  import { Class } from 'java.lang';
  import { Block } from 'net.minecraft.world.level.block';
  import { RegisterCommandsEvent } from 'net.neoforged.neoforge.event';
  import { Supplier, Predicate } from 'java.util.function';
  import { Properties } from 'Item';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { RecipeType, Recipe } from 'net.minecraft.world.item.crafting';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Registry } from 'net.minecraft.core';
  import { TraitManager } from 'net.silentchaos512.gear.gear.trait';
  import { MaterialManager } from 'net.silentchaos512.gear.gear.material';
  import { PartManager } from 'net.silentchaos512.gear.gear.part';

  class GearItemSets {
    static readonly SWORD: GearItemSet;
    static readonly KATANA: GearItemSet;
    static readonly MACHETE: GearItemSet;
    static readonly KNIFE: GearItemSet;
    static readonly DAGGER: GearItemSet;
    static readonly SPEAR: GearItemSet;
    static readonly TRIDENT: GearItemSet;
    static readonly MACE: GearItemSet;
    static readonly SHIELD: GearItemSet;
    static readonly BOW: GearItemSet;
    static readonly CROSSBOW: GearItemSet;
    static readonly SLINGSHOT: GearItemSet;
    static readonly ARROW: GearItemSet;
    static readonly PICKAXE: GearItemSet;
    static readonly SHOVEL: GearItemSet;
    static readonly AXE: GearItemSet;
    static readonly PAXEL: GearItemSet;
    static readonly HAMMER: GearItemSet;
    static readonly EXCAVATOR: GearItemSet;
    static readonly SAW: GearItemSet;
    static readonly PROSPECTOR_HAMMER: GearItemSet;
    static readonly HOE: GearItemSet;
    static readonly MATTOCK: GearItemSet;
    static readonly SICKLE: GearItemSet;
    static readonly SHEARS: GearItemSet;
    static readonly FISHING_ROD: GearItemSet;
    static readonly HELMET: GearItemSet;
    static readonly CHESTPLATE: GearItemSet;
    static readonly LEGGINGS: GearItemSet;
    static readonly BOOTS: GearItemSet;
    static readonly ELYTRA: GearItemSet;
    static readonly RING: GearItemSet;
    static readonly BRACELET: GearItemSet;
    static readonly NECKLACE: GearItemSet;
    static get iterator(): Iterator<GearItemSet<any>>;
  }


  class NerfedGear {
    static readonly DEFAULT_ITEMS: List;
    static init(): void;
    static onBreakSpeed(event: BreakSpeed): void;
  }


  class SgArmorMaterials {
    static readonly REGISTRAR: DeferredRegister;
    static readonly DUMMY: DeferredHolder;
  }


  class SgBlockEntities {
    static readonly BLOCK_ENTITIES: DeferredRegister;
    static readonly MATERIAL_GRADER: DeferredHolder;
    static readonly ALLOY_FORGE: DeferredHolder;
    static readonly METAL_PRESS: DeferredHolder;
    static readonly RECRYSTALLIZER: DeferredHolder;
    static readonly REFABRICATOR: DeferredHolder;
    static readonly CRUDE_MIXER: DeferredHolder;
    static readonly SUPER_MIXER: DeferredHolder;
    static readonly SALVAGER: DeferredHolder;
    static readonly STARLIGHT_CHARGER: DeferredHolder;
    static readonly STONE_ANVIL: DeferredHolder;
  }


  class SgBlocks {
    static readonly BLOCKS: Blocks;
    static readonly BORT_ORE: DeferredBlock;
    static readonly DEEPSLATE_BORT_ORE: DeferredBlock;
    static readonly CRIMSON_IRON_ORE: DeferredBlock;
    static readonly BLACKSTONE_CRIMSON_IRON_ORE: DeferredBlock;
    static readonly AZURE_SILVER_ORE: DeferredBlock;
    static readonly RAW_CRIMSON_IRON_BLOCK: DeferredBlock;
    static readonly RAW_AZURE_SILVER_BLOCK: DeferredBlock;
    static readonly BORT_BLOCK: DeferredBlock;
    static readonly CRIMSON_IRON_BLOCK: DeferredBlock;
    static readonly CRIMSON_STEEL_BLOCK: DeferredBlock;
    static readonly BLAZE_GOLD_BLOCK: DeferredBlock;
    static readonly AZURE_SILVER_BLOCK: DeferredBlock;
    static readonly AZURE_ELECTRUM_BLOCK: DeferredBlock;
    static readonly TYRIAN_STEEL_BLOCK: DeferredBlock;
    static readonly GEAR_SMITHING_TABLE: DeferredBlock;
    static readonly STONE_ANVIL: DeferredBlock;
    static readonly MATERIAL_GRADER: DeferredBlock;
    static readonly SALVAGER: DeferredBlock;
    static readonly STARLIGHT_CHARGER: DeferredBlock;
    static readonly ALLOY_FORGE: DeferredBlock;
    static readonly RECRYSTALLIZER: DeferredBlock;
    static readonly REFABRICATOR: DeferredBlock;
    static readonly CRUDE_MIXER: DeferredBlock;
    static readonly SUPER_MIXER: DeferredBlock;
    static readonly METAL_PRESS: DeferredBlock;
    static readonly FLAX_PLANT: DeferredBlock;
    static readonly WILD_FLAX_PLANT: DeferredBlock;
    static readonly FLUFFY_PLANT: DeferredBlock;
    static readonly WILD_FLUFFY_PLANT: DeferredBlock;
    static readonly WHITE_FLUFFY_BLOCK: DeferredBlock;
    static readonly ORANGE_FLUFFY_BLOCK: DeferredBlock;
    static readonly MAGENTA_FLUFFY_BLOCK: DeferredBlock;
    static readonly LIGHT_BLUE_FLUFFY_BLOCK: DeferredBlock;
    static readonly YELLOW_FLUFFY_BLOCK: DeferredBlock;
    static readonly LIME_FLUFFY_BLOCK: DeferredBlock;
    static readonly PINK_FLUFFY_BLOCK: DeferredBlock;
    static readonly GRAY_FLUFFY_BLOCK: DeferredBlock;
    static readonly LIGHT_GRAY_FLUFFY_BLOCK: DeferredBlock;
    static readonly CYAN_FLUFFY_BLOCK: DeferredBlock;
    static readonly PURPLE_FLUFFY_BLOCK: DeferredBlock;
    static readonly BLUE_FLUFFY_BLOCK: DeferredBlock;
    static readonly BROWN_FLUFFY_BLOCK: DeferredBlock;
    static readonly GREEN_FLUFFY_BLOCK: DeferredBlock;
    static readonly RED_FLUFFY_BLOCK: DeferredBlock;
    static readonly BLACK_FLUFFY_BLOCK: DeferredBlock;
    static readonly STONE_TORCH: DeferredBlock;
    static readonly WALL_STONE_TORCH: DeferredBlock;
    static readonly NETHERWOOD_CHARCOAL_BLOCK: DeferredBlock;
    static readonly NETHERWOOD_LOG: DeferredBlock;
    static readonly STRIPPED_NETHERWOOD_LOG: DeferredBlock;
    static readonly NETHERWOOD_WOOD: DeferredBlock;
    static readonly STRIPPED_NETHERWOOD_WOOD: DeferredBlock;
    static readonly NETHERWOOD_PLANKS: DeferredBlock;
    static readonly NETHERWOOD_SLAB: DeferredBlock;
    static readonly NETHERWOOD_STAIRS: DeferredBlock;
    static readonly NETHERWOOD_FENCE: DeferredBlock;
    static readonly NETHERWOOD_FENCE_GATE: DeferredBlock;
    static readonly NETHERWOOD_DOOR: DeferredBlock;
    static readonly NETHERWOOD_TRAPDOOR: DeferredBlock;
    static readonly NETHERWOOD_LEAVES: DeferredBlock;
    static readonly NETHERWOOD_SAPLING: DeferredBlock;
    static readonly POTTED_NETHERWOOD_SAPLING: DeferredBlock;
    static readonly PHANTOM_LIGHT: DeferredBlock;
    static getBlocks<T extends Block>(clazz: Class<T>): Collection<T>;
    static onCommonSetup(event: FMLCommonSetupEvent): void;
  }


  class SgCommands {
    static registerAll(event: RegisterCommandsEvent): void;
  }


  class SgCreativeTabs {
    static readonly CREATIVE_TABS: DeferredRegister;
    static readonly MAIN: DeferredHolder;
    static readonly GEAR: DeferredHolder;
  }


  class SgCriteriaTriggers {
    static readonly TRIGGER_TYPES: DeferredRegister;
    static readonly BRITTLE_DAMAGE: DeferredHolder;
    static readonly CRAFTED_WITH_ROUGH_ROD: DeferredHolder;
    static readonly DAMAGE_FACTOR_CHANGE: DeferredHolder;
    static readonly FALL_WITH_MOONWALKER: DeferredHolder;
    static readonly GEAR_REPAIRED: DeferredHolder;
    static readonly HAS_PART: DeferredHolder;
    static readonly GEAR_PROPERTY: DeferredHolder;
  }


  class SgDataComponents {
    static readonly REGISTRAR: DataComponents;
    static readonly CONTAINED_ITEMS: Supplier;
    static readonly SELECTED_SLOT: Supplier;
    static readonly GEAR_CONSTRUCTION: Supplier;
    static readonly GEAR_PROPERTIES: Supplier;
    static readonly GEAR_MODEL_KEY: Supplier;
    static readonly GEAR_MODEL_INDEX: Supplier;
    static readonly GEAR_IS_EXAMPLE: Supplier;
    static readonly CRUDE: Supplier;
    static readonly MATERIAL_GRADE: Supplier;
    static readonly MATERIAL_SINGLE: Supplier;
    static readonly MATERIAL_LIST: Supplier;
    static readonly PART_TYPE: Supplier;
    static readonly STARCHARGED_LEVEL: Supplier;
    static readonly MATERIAL_STORAGE: Supplier;
  }


  class SgEntities {
    static readonly ENTITIES: DeferredRegister;
    static readonly ARROW: DeferredHolder;
    static readonly FISHING_HOOK: DeferredHolder;
    static readonly SLINGSHOT_PROJECTILE: DeferredHolder;
    static readonly TRIDENT_PROJECTILE: DeferredHolder;
  }


  class SgIngredientTypes {
    static readonly REGISTRAR: DeferredRegister;
    static readonly BLUEPRINT: DeferredHolder;
    static readonly CUSTOM_ALLOY: DeferredHolder;
    static readonly GEAR_TYPE: DeferredHolder;
    static readonly MATERIAL: DeferredHolder;
    static readonly PART: DeferredHolder;
  }


  class SgItems {
    static readonly ITEMS: Items;
    static readonly GUIDE_BOOK: DeferredItem;
    static readonly BLUEPRINT_PACKAGE: DeferredItem;
    static readonly MOD_KIT: DeferredItem;
    static readonly VERY_CRUDE_REPAIR_KIT: DeferredItem;
    static readonly CRUDE_REPAIR_KIT: DeferredItem;
    static readonly STURDY_REPAIR_KIT: DeferredItem;
    static readonly CRIMSON_REPAIR_KIT: DeferredItem;
    static readonly AZURE_REPAIR_KIT: DeferredItem;
    static readonly COATING_SMITHING_TEMPLATE: DeferredItem;
    static readonly CRUDE_KNIFE: DeferredItem;
    static readonly CRUDE_HAMMER: DeferredItem;
    static readonly BLUEPRINT_BOOK: DeferredItem;
    static readonly JEWELER_TOOLS: DeferredItem;
    static readonly ROD_BLUEPRINT: DeferredItem;
    static readonly TIP_BLUEPRINT: DeferredItem;
    static readonly COATING_BLUEPRINT: DeferredItem;
    static readonly GRIP_BLUEPRINT: DeferredItem;
    static readonly BINDING_BLUEPRINT: DeferredItem;
    static readonly LINING_BLUEPRINT: DeferredItem;
    static readonly CORD_BLUEPRINT: DeferredItem;
    static readonly FLETCHING_BLUEPRINT: DeferredItem;
    static readonly ROD_TEMPLATE: DeferredItem;
    static readonly TIP_TEMPLATE: DeferredItem;
    static readonly COATING_TEMPLATE: DeferredItem;
    static readonly GRIP_TEMPLATE: DeferredItem;
    static readonly BINDING_TEMPLATE: DeferredItem;
    static readonly LINING_TEMPLATE: DeferredItem;
    static readonly CORD_TEMPLATE: DeferredItem;
    static readonly FLETCHING_TEMPLATE: DeferredItem;
    static readonly ROD: DeferredItem;
    static readonly TIP: DeferredItem;
    static readonly COATING: DeferredItem;
    static readonly GRIP: DeferredItem;
    static readonly BINDING: DeferredItem;
    static readonly LINING: DeferredItem;
    static readonly CORD: DeferredItem;
    static readonly FLETCHING: DeferredItem;
    static readonly SETTING: DeferredItem;
    static readonly ALLOY_INGOT: DeferredItem;
    static readonly CRUDE_ALLOY: DeferredItem;
    static readonly HYBRID_GEM: DeferredItem;
    static readonly MIXED_FABRIC: DeferredItem;
    static readonly SUPER_ALLOY: DeferredItem;
    static readonly CUSTOM_INGOT: DeferredItem;
    static readonly CUSTOM_GEM: DeferredItem;
    static readonly SHEET_METAL: DeferredItem;
    static readonly PEBBLE: DeferredItem;
    static readonly FLAX_SEEDS: DeferredItem;
    static readonly FLUFFY_SEEDS: DeferredItem;
    static readonly NETHER_BANANA: DeferredItem;
    static readonly GOLDEN_NETHER_BANANA: DeferredItem;
    static readonly NETHERWOOD_CHARCOAL: DeferredItem;
    static getItems<T>(clazz: Class<T>): Collection<T>;
    static getItems(predicate: Predicate<Item>): Collection<Item>;
    static unstackableProps(): Properties;
  }


  class SgLoot {
    static readonly LOOT_CONDITIONS: DeferredRegister;
    static readonly LOOT_FUNCTIONS: DeferredRegister;
    static readonly LOOT_MODIFIERS: DeferredRegister;
    static readonly HAS_TRAIT: DeferredHolder;
    static readonly SET_PARTS: DeferredHolder;
    static readonly BONUS_DROPS_TRAIT: DeferredHolder;
    static readonly MAGMATIC_SMELTING: DeferredHolder;
    static readonly SILK_TOUCH_TRAIT: DeferredHolder;
    static readonly FORTUNE_TRAIT: DeferredHolder;
  }


  class SgMenuTypes {
    static readonly MENU_TYPES: DeferredRegister;
    static readonly MATERIAL_GRADER: DeferredHolder;
    static readonly METAL_PRESS: DeferredHolder;
    static readonly METAL_ALLOYER: DeferredHolder;
    static readonly RECRYSTALLIZER: DeferredHolder;
    static readonly REFABRICATOR: DeferredHolder;
    static readonly CRUDE_MIXER: DeferredHolder;
    static readonly SUPER_MIXER: DeferredHolder;
    static readonly SALVAGER: DeferredHolder;
    static readonly STARLIGHT_CHARGER: DeferredHolder;
    static readonly BLUEPRINT_BOOK: DeferredHolder;
  }


  class SgRecipes {
    static readonly RECIPE_SERIALIZERS: DeferredRegister;
    static readonly RECIPE_TYPES: DeferredRegister;
    static readonly COMPOUNDING_TYPE: DeferredHolder;
    static readonly ALLOY_MAKING_CRUDE_TYPE: DeferredHolder;
    static readonly ALLOY_MAKING_FABRIC_TYPE: DeferredHolder;
    static readonly ALLOY_MAKING_GEM_TYPE: DeferredHolder;
    static readonly ALLOY_MAKING_METAL_TYPE: DeferredHolder;
    static readonly ALLOY_MAKING_SUPER_TYPE: DeferredHolder;
    static readonly PRESSING_TYPE: DeferredHolder;
    static readonly SALVAGING_TYPE: DeferredHolder;
    static readonly TOOL_ACTION_TYPE: DeferredHolder;
    static readonly COMPOUND_PART: DeferredHolder;
    static readonly COMPOUNDING: DeferredHolder;
    static readonly ALLOY_MAKING_CRUDE: DeferredHolder;
    static readonly ALLOY_MAKING_FABRIC: DeferredHolder;
    static readonly ALLOY_MAKING_GEM: DeferredHolder;
    static readonly ALLOY_MAKING_METAL: DeferredHolder;
    static readonly ALLOY_MAKING_SUPER: DeferredHolder;
    static readonly CONVERSION: DeferredHolder;
    static readonly FILL_REPAIR_KIT: DeferredHolder;
    static readonly MOD_KIT_REMOVE_PART: DeferredHolder;
    static readonly PRESSING: DeferredHolder;
    static readonly PRESSING_MATERIAL: DeferredHolder;
    static readonly QUICK_REPAIR: DeferredHolder;
    static readonly SALVAGING: DeferredHolder;
    static readonly SALVAGING_GEAR: DeferredHolder;
    static readonly SALVAGING_COMPOUND_PART: DeferredHolder;
    static readonly SHAPED_GEAR: DeferredHolder;
    static readonly SHAPELESS_GEAR: DeferredHolder;
    static readonly SMITHING_COATING: DeferredHolder;
    static readonly SMITHING_UPGRADE: DeferredHolder;
    static readonly SWAP_GEAR_PART: DeferredHolder;
    static readonly TOOL_ACTION: DeferredHolder;
    static isRepairMaterial(gear: ItemStack, materialItem: ItemStack): boolean;
    static registerType<T extends Recipe<any>>(name: ResourceLocation): DeferredHolder<RecipeType<any>, RecipeType<T>>;
  }


  class SgRegistries {
    static readonly GEAR_TYPE_KEY: ResourceKey;
    static readonly PART_TYPE_KEY: ResourceKey;
    static readonly GEAR_PROPERTY_KEY: ResourceKey;
    static readonly TRAIT_CONDITION_KEY: ResourceKey;
    static readonly TRAIT_EFFECT_TYPE_KEY: ResourceKey;
    static readonly MATERIAL_SERIALIZER_KEY: ResourceKey;
    static readonly MATERIAL_MODIFIER_TYPE_KEY: ResourceKey;
    static readonly PART_SERIALIZER_KEY: ResourceKey;
    static readonly GEAR_TYPE: Registry;
    static readonly PART_TYPE: Registry;
    static readonly GEAR_PROPERTY: Registry;
    static readonly TRAIT_CONDITION: Registry;
    static readonly TRAIT_EFFECT_TYPE: Registry;
    static readonly MATERIAL_SERIALIZER: Registry;
    static readonly MATERIAL_MODIFIER_TYPE: Registry;
    static readonly PART_SERIALIZER: Registry;
    static readonly TRAIT: TraitManager;
    static readonly MATERIAL: MaterialManager;
    static readonly PART: PartManager;
    static registerRegistries(event: NewRegistryEvent): void;
  }


  class SgSounds {
    static readonly REGISTRAR: DeferredRegister;
    static readonly GEAR_DAMAGED: DeferredHolder;
    static readonly STONE_ANVIL_HAMMER: DeferredHolder;
    static readonly STONE_ANVIL_KNIFE: DeferredHolder;
  }


  class SgTags {
  }


  class SgVillages {
    static readonly POINTS_OF_INTEREST: DeferredRegister;
    static readonly PROFESSIONS: DeferredRegister;
    static readonly GEAR_SMITH: ResourceLocation;
    static readonly HOTV_GEAR_SMITH: ResourceLocation;
  }

}

declare module 'net.silentchaos512.gear.setup.SgBlockEntities' {
  import { RegisterRenderers } from 'EntityRenderersEvent';

  class ClientEvents {
    static registerRenderers(event: RegisterRenderers): void;
  }

}

declare module 'net.silentchaos512.gear.setup.SgEntities' {
  import { RegisterRenderers } from 'EntityRenderersEvent';
  import { RegisterClientExtensionsEvent } from 'net.neoforged.neoforge.client.extensions.common';
  import { RegisterAdditional } from 'ModelEvent';

  class Events {
    static registerAdditional(event: RegisterAdditional): void;
    static registerClientExtensions(event: RegisterClientExtensionsEvent): void;
    static registerRenderers(event: RegisterRenderers): void;
  }

}

declare module 'net.silentchaos512.gear.setup.SgLoot' {
  import { LootTableLoadEvent } from 'net.neoforged.neoforge.event';
  import { ResourceKey } from 'net.minecraft.resources';

  class Injector {
    static onLootTableLoad(event: LootTableLoadEvent): void;
  }


  class Tables {
    static readonly DROPS_LEATHER_SCRAPS_LOW: ResourceKey;
    static readonly DROPS_LEATHER_SCRAPS_HIGH: ResourceKey;
    static readonly DROPS_FINE_SILK_LOW: ResourceKey;
    static readonly DROPS_FINE_SILK_HIGH: ResourceKey;
    static readonly DROPS_SINEW: ResourceKey;
  }

}

declare module 'net.silentchaos512.gear.setup.SgLoot.Injector' {
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Optional } from 'java.util';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';

  class Tables {
    static readonly NETHER_BRIDGE: ResourceLocation;
    static readonly BASTION_TREASURE: ResourceLocation;
    static readonly BASTION_OTHER: ResourceLocation;
    static readonly BASTION_BRIDGE: ResourceLocation;
    static readonly RUINED_PORTAL: ResourceLocation;
    static get(lootTable: ResourceLocation): Optional<ResourceKey<LootTable>>;
  }

}

declare module 'net.silentchaos512.gear.setup.SgMenuTypes' {
  import { RegisterMenuScreensEvent } from 'net.neoforged.neoforge.client.event';

  class ClientEvents {
    static registerScreens(event: RegisterMenuScreensEvent): void;
  }

}

declare module 'net.silentchaos512.gear.setup.SgTags' {
  import { TagKey } from 'net.minecraft.tags';
  import { List } from 'java.util';

  class Items {
    static readonly FLUFFY_BLOCKS: TagKey;
    static readonly NETHERWOOD_LOGS: TagKey;
    static readonly ORES_BORT: TagKey;
    static readonly ORES_CRIMSON_IRON: TagKey;
    static readonly ORES_AZURE_SILVER: TagKey;
    static readonly COAL_GENERATOR_FUELS: TagKey;
    static readonly STORAGE_BLOCKS_NETHERWOOD_CHARCOAL: TagKey;
    static readonly STORAGE_BLOCKS_BORT: TagKey;
    static readonly STORAGE_BLOCKS_BLAZE_GOLD: TagKey;
    static readonly STORAGE_BLOCKS_CRIMSON_IRON: TagKey;
    static readonly STORAGE_BLOCKS_CRIMSON_STEEL: TagKey;
    static readonly STORAGE_BLOCKS_AZURE_SILVER: TagKey;
    static readonly STORAGE_BLOCKS_AZURE_ELECTRUM: TagKey;
    static readonly STORAGE_BLOCKS_TYRIAN_STEEL: TagKey;
    static readonly STORAGE_BLOCKS_RAW_CRIMSON_IRON: TagKey;
    static readonly STORAGE_BLOCKS_RAW_AZURE_SILVER: TagKey;
    static readonly ORES_IN_GROUND_BLACKSTONE: TagKey;
    static readonly ORES_IN_GROUND_END_STONE: TagKey;
    static readonly RAW_MATERIALS_CRIMSON_IRON: TagKey;
    static readonly RAW_MATERIALS_AZURE_SILVER: TagKey;
    static readonly DUSTS_BLAZE_GOLD: TagKey;
    static readonly DUSTS_CRIMSON_IRON: TagKey;
    static readonly DUSTS_CRIMSON_STEEL: TagKey;
    static readonly DUSTS_AZURE_SILVER: TagKey;
    static readonly DUSTS_AZURE_ELECTRUM: TagKey;
    static readonly DUSTS_TYRIAN_STEEL: TagKey;
    static readonly DUSTS_STARMETAL: TagKey;
    static readonly GEMS_BORT: TagKey;
    static readonly INGOTS_BLAZE_GOLD: TagKey;
    static readonly INGOTS_BRONZE: TagKey;
    static readonly INGOTS_CRIMSON_IRON: TagKey;
    static readonly INGOTS_CRIMSON_STEEL: TagKey;
    static readonly INGOTS_AZURE_SILVER: TagKey;
    static readonly INGOTS_AZURE_ELECTRUM: TagKey;
    static readonly INGOTS_TYRIAN_STEEL: TagKey;
    static readonly NUGGETS_BLAZE_GOLD: TagKey;
    static readonly NUGGETS_CRIMSON_IRON: TagKey;
    static readonly NUGGETS_CRIMSON_STEEL: TagKey;
    static readonly NUGGETS_AZURE_SILVER: TagKey;
    static readonly NUGGETS_AZURE_ELECTRUM: TagKey;
    static readonly NUGGETS_TYRIAN_STEEL: TagKey;
    static readonly NUGGETS_DIAMOND: TagKey;
    static readonly NUGGETS_EMERALD: TagKey;
    static readonly PAPER: TagKey;
    static readonly BLUEPRINT_PAPER: TagKey;
    static readonly REPAIR_KITS: TagKey;
    static readonly TEMPLATE_BOARDS: TagKey;
    static readonly RODS_IRON: TagKey;
    static readonly RODS_NETHERWOOD: TagKey;
    static readonly RODS_STONE: TagKey;
    static readonly RODS_ROUGH: TagKey;
    static readonly FRUITS: TagKey;
    static readonly SEEDS_FLAX: TagKey;
    static readonly SEEDS_FLUFFY_PUFF: TagKey;
    static readonly ARMORS_ELYTRA: TagKey;
    static readonly TOOLS_HAMMER: TagKey;
    static readonly TOOLS_KNIFE: TagKey;
    static readonly TOOLS_SAW: TagKey;
    static readonly TOOLS_SICKLE: TagKey;
    static readonly BLUEPRINTS: TagKey;
    static readonly GRADER_CATALYSTS: TagKey;
    static readonly GRADER_CATALYSTS_TIER_1: TagKey;
    static readonly GRADER_CATALYSTS_TIER_2: TagKey;
    static readonly GRADER_CATALYSTS_TIER_3: TagKey;
    static readonly GRADER_CATALYSTS_TIER_4: TagKey;
    static readonly GRADER_CATALYSTS_TIER_5: TagKey;
    static readonly GRADER_CATALYSTS_TIERS: List;
    static readonly STARLIGHT_CHARGER_CATALYSTS: TagKey;
    static readonly STARLIGHT_CHARGER_CATALYSTS_TIER_1: TagKey;
    static readonly STARLIGHT_CHARGER_CATALYSTS_TIER_2: TagKey;
    static readonly STARLIGHT_CHARGER_CATALYSTS_TIER_3: TagKey;
    static readonly STARLIGHT_CHARGER_TIERS: List;
    static readonly IMPERIAL_DROPS: TagKey;
    static readonly GOLD_DIGGER_DROPS: TagKey;
    static readonly GREEDY_MAGNET_ATTRACTED: TagKey;
  }


  class EntityTypes {
    static readonly TRIDENTS: TagKey;
  }


  class DamageTypes {
    static readonly BOUNCE_PROTECTS: TagKey;
  }


  class Blocks {
    static readonly MINEABLE_WITH_MACHETE: TagKey;
    static readonly MINEABLE_WITH_MATTOCK: TagKey;
    static readonly MINEABLE_WITH_PAXEL: TagKey;
    static readonly MINEABLE_WITH_PICKAXE_WITH_SPOON: TagKey;
    static readonly MINEABLE_WITH_SICKLE: TagKey;
    static readonly NEEDS_COPPER_TOOL: TagKey;
    static readonly INCORRECT_FOR_COPPER_TOOL: TagKey;
    static readonly FLUFFY_BLOCKS: TagKey;
    static readonly NETHERWOOD_LOGS: TagKey;
    static readonly NETHERWOOD_SOIL: TagKey;
    static readonly PROSPECTOR_HAMMER_TARGETS: TagKey;
    static readonly ORES_BORT: TagKey;
    static readonly ORES_CRIMSON_IRON: TagKey;
    static readonly ORES_AZURE_SILVER: TagKey;
    static readonly STORAGE_BLOCKS_RAW_CRIMSON_IRON: TagKey;
    static readonly STORAGE_BLOCKS_RAW_AZURE_SILVER: TagKey;
    static readonly STORAGE_BLOCKS_NETHERWOOD_CHARCOAL: TagKey;
    static readonly STORAGE_BLOCKS_BORT: TagKey;
    static readonly STORAGE_BLOCKS_BLAZE_GOLD: TagKey;
    static readonly STORAGE_BLOCKS_CRIMSON_IRON: TagKey;
    static readonly STORAGE_BLOCKS_CRIMSON_STEEL: TagKey;
    static readonly STORAGE_BLOCKS_AZURE_SILVER: TagKey;
    static readonly STORAGE_BLOCKS_AZURE_ELECTRUM: TagKey;
    static readonly STORAGE_BLOCKS_TYRIAN_STEEL: TagKey;
    static readonly ORES_IN_GROUND_BLACKSTONE: TagKey;
    static readonly ORES_IN_GROUND_END_STONE: TagKey;
  }

}

declare module 'net.silentchaos512.gear.SideProxy' {
  import { SideProxy } from 'net.silentchaos512.gear';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Level } from 'net.minecraft.world.level';

  interface Server extends SideProxy {}
  class Server extends SideProxy {
  }


  interface Client extends SideProxy {}
  class Client extends SideProxy {
    checkClientConnection(): boolean;
    checkClientInstance(): boolean;
    get clientLevel(): Level;
    get clientPlayer(): Player;
  }

}

declare module 'net.silentchaos512.gear.util' {
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { TagKey } from 'net.minecraft.tags';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { Registry, BlockPos } from 'net.minecraft.core';
  import { Codec, MapCodec } from 'com.mojang.serialization';
  import { List, Collection, Optional, Set, Map } from 'java.util';
  import { JsonElement } from 'com.google.gson';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { AlloyMakerInfo } from 'net.silentchaos512.gear.block.alloymaker';
  import { GearPropertiesData, GearConstructionData } from 'net.silentchaos512.gear.core.component';
  import { ItemStack, Tiers, Item, Rarity, CreativeModeTab } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { PartInstance } from 'net.silentchaos512.gear.gear.part';
  import { PartType, GearPart } from 'net.silentchaos512.gear.api.part';
  import { Predicate, Function, BiConsumer, Consumer } from 'java.util.function';
  import { DataResource } from 'net.silentchaos512.gear.api.util';
  import { GearType, GearItem } from 'net.silentchaos512.gear.api.item';
  import { Builder } from 'ItemAttributeModifiers';
  import { MaterialInstance } from 'net.silentchaos512.gear.gear.material';
  import { NumberProperty } from 'net.silentchaos512.gear.api.property';
  import { LivingEntity, EquipmentSlot, Entity } from 'net.minecraft.world.entity';
  import { InteractionHand, InteractionResult } from 'net.minecraft.world';
  import { UseOnContext } from 'net.minecraft.world.item.context';
  import { Integer, Iterable, Void, RuntimeException } from 'java.lang';
  import { Properties } from 'Item';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Block } from 'net.minecraft.world.level.block';
  import { Level } from 'net.minecraft.world.level';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { ItemAbility } from 'net.neoforged.neoforge.common';
  import { HitResult, BlockHitResult } from 'net.minecraft.world.phys';
  import { PreparableReloadListener, ResourceManager } from 'net.minecraft.server.packs.resources';
  import { CompletableFuture, Executor } from 'java.util.concurrent';
  import { PreparationBarrier } from 'PreparableReloadListener';
  import { ProfilerFiller } from 'net.minecraft.util.profiling';
  import { TraitInstance, TraitFunction, TraitEffectType } from 'net.silentchaos512.gear.api.traits';
  import { KeyMapping } from 'net.minecraft.client';
  import { Color } from 'net.silentchaos512.lib.util';
  import { ChatFormatting } from 'net.minecraft';
  import { Trait } from 'net.silentchaos512.gear.gear.trait';

  class CodecUtils {
    static byModNameCodec<T>(registry: Registry<T>): Codec<T>;
    static decodeList<B extends FriendlyByteBuf, T>(buf: B, streamCodec: StreamCodec<B, T>): T[];
    static encodeIngredient(ingredient: Ingredient): JsonElement;
    static encodeList<B extends FriendlyByteBuf, T>(buf: B, list: Collection<T>, streamCodec: StreamCodec<B, T>): void;
    static singleOrListCodec<T>(codec: Codec<T>): Codec<T[]>;
    static tagStreamCodec<T>(registryKey: ResourceKey<Registry<T>>): StreamCodec<FriendlyByteBuf, TagKey<T>>;
  }


  class Const {
    static readonly COMPOUND_PART_MODEL_LOADER: ResourceLocation;
    static readonly GEAR_MODEL_LOADER: ResourceLocation;
    static readonly BROKEN_PROPERTY: ResourceLocation;
    static readonly MODEL: ResourceLocation;
    static readonly ALLOY_MAKING: ResourceLocation;
    static readonly ALLOY_MAKING_CRUDE: ResourceLocation;
    static readonly ALLOY_MAKING_FABRIC: ResourceLocation;
    static readonly ALLOY_MAKING_GEM: ResourceLocation;
    static readonly ALLOY_MAKING_METAL: ResourceLocation;
    static readonly ALLOY_MAKING_SUPER: ResourceLocation;
    static readonly COMPOUND_PART: ResourceLocation;
    static readonly CONVERSION: ResourceLocation;
    static readonly FILL_REPAIR_KIT: ResourceLocation;
    static readonly GRADING: ResourceLocation;
    static readonly MOD_KIT_REMOVE_PART: ResourceLocation;
    static readonly PRESSING: ResourceLocation;
    static readonly PRESSING_MATERIAL: ResourceLocation;
    static readonly QUICK_REPAIR: ResourceLocation;
    static readonly SALVAGING: ResourceLocation;
    static readonly SALVAGING_COMPOUND_PART: ResourceLocation;
    static readonly SALVAGING_GEAR: ResourceLocation;
    static readonly SHAPED_GEAR_CRAFTING: ResourceLocation;
    static readonly SHAPELESS_GEAR_CRAFTING: ResourceLocation;
    static readonly SMITHING_COATING: ResourceLocation;
    static readonly SMITHING_UPGRADE: ResourceLocation;
    static readonly SWAP_GEAR_PART: ResourceLocation;
    static readonly TOOL_ACTION: ResourceLocation;
    static readonly CAELUS: string;
    static readonly CURIOS: string;
    static readonly NULL_ID: ResourceLocation;
    static readonly CRUDE: ResourceLocation;
    static readonly GRADE: ResourceLocation;
    static readonly STARCHARGED: ResourceLocation;
    static readonly METAL_ALLOY_MAKER_INFO: AlloyMakerInfo;
    static readonly GEM_ALLOY_MAKER_INFO: AlloyMakerInfo;
    static readonly FABRIC_ALLOY_MAKER_INFO: AlloyMakerInfo;
    static readonly CRUDE_MIXER_INFO: AlloyMakerInfo;
    static readonly SUPER_MIXER_INFO: AlloyMakerInfo;
  }


  class GearData {
    static addOrReplacePart(gear: ItemStack, part: PartInstance): void;
    static addPart(gear: ItemStack, part: PartInstance): void;
    static addUpgradePart(gear: ItemStack, part: PartInstance): void;
    static getBrokenCount(stack: ItemStack): number;
    static getConstruction(gear: ItemStack): GearConstructionData;
    static getModelIndex(stack: ItemStack): number;
    static getModelKey(stack: ItemStack, animationFrame: number): string;
    static getPartOfType(stack: ItemStack, type: PartType): PartInstance;
    static getProperties(gear: ItemStack): GearPropertiesData;
    static getProperties(gear: ItemStack, player: Player): GearPropertiesData;
    static getRepairedCount(stack: ItemStack): number;
    static hasPart(gear: ItemStack, partType: PartType, predicate: Predicate<PartInstance>): boolean;
    static hasPart(gear: ItemStack, part: GearPart): boolean;
    static hasPart(gear: ItemStack, part: DataResource<GearPart>): boolean;
    static hasPartOfType(stack: ItemStack, type: PartType): boolean;
    static incrementRepairedCount(stack: ItemStack, amount: number): void;
    static isExampleGear(stack: ItemStack): boolean;
    static recalculateGearData(gear: ItemStack, player: Player): void;
    static removeFirstPartOfType(gear: ItemStack, type: PartType): boolean;
    static setExampleTag(result: ItemStack, value: boolean): void;
    static writeConstructionParts(gear: ItemStack, parts: Collection<PartInstance>): void;
  }


  class GearGenerator {
    static create(item: GearItem): ItemStack;
    static getRandomPart(gearType: GearType, partType: PartType): Optional<PartInstance>;
    static randomizeParts(stack: ItemStack): ItemStack;
  }


  class GearHelper {
    static DEFAULT_DUMMY_TIER: Tiers;
    static addAttributeModifiers(stack: ItemStack, builder: Builder): void;
    static addAttributeModifiers(stack: ItemStack, builder: Builder, addStandardMainHandMods: boolean): void;
    static attemptDamage(stack: ItemStack, amount: number, entity: LivingEntity, hand: InteractionHand): void;
    static attemptDamage(stack: ItemStack, amount: number, entity: LivingEntity, slot: EquipmentSlot): void;
    static calcDamageClamped(stack: ItemStack, damage: number): number;
    static damageItem<T extends LivingEntity>(stack: ItemStack, amount: number, entity: T, onBroken: Consumer<Item>): number;
    static fillItemGroup(item: GearItem, group: CreativeModeTab, items: Collection<ItemStack>): void;
    static get baseItemProperties(): Properties;
    static getAttackDamageModifier(stack: ItemStack): number;
    static getAttackSpeedModifier(stack: ItemStack): number;
    static getAttackTargetWithExtraReach(player: Player): Entity;
    static getBarColor(stack: ItemStack): number;
    static getBarWidth(stack: ItemStack): number;
    static getDestroySpeed(stack: ItemStack, state: BlockState): number;
    static getDurabilityProperty(gear: ItemStack): NumberProperty;
    static getEnchantmentValue(stack: ItemStack): number;
    static getExamplePartsFromRecipe(gearType: GearType, ingredients: Iterable<Ingredient>): Collection<PartInstance>;
    static getIsRepairable(stack: ItemStack, materialItem: ItemStack): boolean;
    static getIsRepairable(gear: ItemStack, material: MaterialInstance): boolean;
    static getItem(gear: ItemStack): Optional<GearItem>;
    static getItemName(gear: ItemStack, constructionData: GearConstructionData): Component;
    static getMagicDamageModifier(stack: ItemStack): number;
    static getRarity(stack: ItemStack): Rarity;
    static getRepairModifier(gear: ItemStack): number;
    static getType(gear: ItemStack): GearType;
    static getType(gear: ItemStack, defaultType: GearType): GearType;
    static hurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): boolean;
    static inventoryTick(stack: ItemStack, world: Level, entity: Entity, itemSlot: number, isSelected: boolean): void;
    static isBroken(stack: ItemStack): boolean;
    static isCorrectToolForDrops(stack: ItemStack, state: BlockState, blocksForTool: TagKey<Block>): boolean;
    static isEquivalent(gear1: ItemStack, gear2: ItemStack): boolean;
    static isGear(stack: ItemStack): boolean;
    static isUnbreakable(stack: ItemStack): boolean;
    static isValidGear(stack: ItemStack): boolean;
    static isValidSlot(gear: ItemStack, slot: string): boolean;
    static makeItemAbilitySet(...actions: ItemAbility[]): Set<ItemAbility>;
    static onBlockDestroyed(stack: ItemStack, world: Level, state: BlockState, pos: BlockPos, entityLiving: LivingEntity): boolean;
    static onBroken(stack: ItemStack, player: Player, slot: EquipmentSlot): void;
    static onItemSwing(stack: ItemStack, wielder: LivingEntity): void;
    static onItemUse(context: UseOnContext): InteractionResult;
    static postHurtEnemy(stack: ItemStack, target: LivingEntity, attacker: LivingEntity): void;
    static setDamage(stack: ItemStack, damage: number, superFunction: BiConsumer<ItemStack, number>): void;
    static tryAttackWithExtraReach(player: Player): Entity;
    static useAndCheckBroken(context: UseOnContext, useFunction: Function<UseOnContext, InteractionResult>): InteractionResult;
  }


  class IAoeTool {
    attemptAddExtraBlock(world: Level, state: BlockState, pos: BlockPos, stack: ItemStack, player: Player, list: BlockPos[]): void;
    getAoeRadius(stack: ItemStack): number;
    getExtraBlocks(world: Level, rt: BlockHitResult, player: Player, stack: ItemStack): BlockPos[];
    isEffectiveOnBlock(stack: ItemStack, state: BlockState, player: Player): boolean;
    rayTraceBlocks(var1: Level, var2: Player): HitResult;
  }


  interface IEarlySelectiveReloadListener extends PreparableReloadListener {}
  class IEarlySelectiveReloadListener extends PreparableReloadListener {
    onResourceManagerReload(var1: ResourceManager): void;
    reload(stage: PreparationBarrier, resourceManager: ResourceManager, preparationsProfiler: ProfilerFiller, reloadProfiler: ProfilerFiller, backgroundExecutor: Executor, gameExecutor: Executor): CompletableFuture<Void>;
  }


  interface MismatchedVersionsException extends RuntimeException {}
  class MismatchedVersionsException extends RuntimeException {
    constructor(msg: string);
  }


  class Serializer<B = any, V = any> {
    constructor(codec: MapCodec<V>, streamCodec: StreamCodec<B, V>);
    codec(): MapCodec<V>;
    streamCodec(): StreamCodec<B, V>;
  }


  class SynergyUtils {
    static readonly MAX_VALUE: number;
    static readonly RARITY_WEIGHT: number;
    static readonly NO_SHARED_CATEGORY_PENALTY: number;
    static readonly SHARED_CATEGORY_BONUS: number;
    static getDisplayText(synergy: number): Component;
    static getSynergy(partType: PartType, materials: MaterialInstance[], traits: Collection<TraitInstance>): number;
    static getUniques(materials: Collection<MaterialInstance>): Collection<MaterialInstance>;
  }


  class TextUtil {
    static addWipText(tooltip: Collection<Component>): void;
    static keyBinding(keyBinding: KeyMapping): MutableComponent;
    static misc(key: string, ...args: any[]): MutableComponent;
    static separatedList(list: Collection<Component>): MutableComponent;
    static translate(prefix: string, suffix: string): MutableComponent;
    static translate(prefix: string, suffix: string, ...args: any[]): MutableComponent;
    static withColor(text: MutableComponent, color: number): MutableComponent;
    static withColor(text: MutableComponent, color: Color): MutableComponent;
    static withColor(text: MutableComponent, color: ChatFormatting): MutableComponent;
  }


  class TimedEvents {
    static isAprilFools(): boolean;
  }


  class TraitHelper {
    static activateTraits<T>(gear: ItemStack, inputValue: T, action: TraitFunction<T>): T;
    static cancelTraits(mapToModify: Map<Trait, number>, keys: Trait[]): void;
    static getHighestLevelArmor(player: Player, trait: DataResource<Trait>): number;
    static getHighestLevelArmorOrCurio(player: Player, trait: DataResource<Trait>): number;
    static getHighestLevelCurio(entity: LivingEntity, trait: DataResource<Trait>): number;
    static getHighestLevelEitherHand(player: Player, trait: DataResource<Trait>): number;
    static getTraitLevel(gear: ItemStack, trait: DataResource<Trait>): number;
    static getTraits(gear: ItemStack): TraitInstance[];
    static hasTrait(gear: ItemStack, trait: DataResource<Trait>): boolean;
    static hasTrait(gear: ItemStack, trait: Trait): boolean;
    static hasTrait(properties: GearPropertiesData, trait: DataResource<Trait>): boolean;
    static hasTrait(properties: GearPropertiesData, trait: Trait): boolean;
    static hasTraitArmor(player: Player, trait: DataResource<Trait>): boolean;
    static hasTraitEffect(gear: ItemStack, traitEffectType: TraitEffectType<any>): boolean;
    static hasTraitEitherHand(player: Player, trait: DataResource<Trait>): boolean;
  }

}

declare module 'net.silentchaos512.gear.util.Const' {
  import { DataResource } from 'net.silentchaos512.gear.api.util';
  import { ResourceKey } from 'net.minecraft.resources';

  class Traits {
    static readonly ACCELERATE: DataResource;
    static readonly ADAMANT: DataResource;
    static readonly ANCIENT: DataResource;
    static readonly AQUATIC: DataResource;
    static readonly BASTION: DataResource;
    static readonly BENDING: DataResource;
    static readonly BOUNCE: DataResource;
    static readonly BRILLIANT: DataResource;
    static readonly BRITTLE: DataResource;
    static readonly BULKY: DataResource;
    static readonly CHILLED: DataResource;
    static readonly CHIPPING: DataResource;
    static readonly CONFETTI: DataResource;
    static readonly CRACKLER: DataResource;
    static readonly CRUDE: DataResource;
    static readonly CRUSHING: DataResource;
    static readonly CURE_POISON: DataResource;
    static readonly CURE_WITHER: DataResource;
    static readonly CURSED: DataResource;
    static readonly DULLING: DataResource;
    static readonly ERODED: DataResource;
    static readonly FIERY: DataResource;
    static readonly FIREPROOF: DataResource;
    static readonly FLAME_WARD: DataResource;
    static readonly FLAMMABLE: DataResource;
    static readonly FLEXIBLE: DataResource;
    static readonly FLOATSTONER: DataResource;
    static readonly FLUTTER: DataResource;
    static readonly FORTUNATE: DataResource;
    static readonly GOLD_DIGGER: DataResource;
    static readonly GREEDY: DataResource;
    static readonly HARD: DataResource;
    static readonly HEAT_RESISTANT: DataResource;
    static readonly HEAVY: DataResource;
    static readonly HOLY: DataResource;
    static readonly INDESTRUCTIBLE: DataResource;
    static readonly IGNITE: DataResource;
    static readonly IMPERIAL: DataResource;
    static readonly JABBERWOCKY: DataResource;
    static readonly JAGGED: DataResource;
    static readonly KITTY_VISION: DataResource;
    static readonly LIGHT: DataResource;
    static readonly LUCKY: DataResource;
    static readonly LUSTROUS: DataResource;
    static readonly MAGMATIC: DataResource;
    static readonly MAGNETIC: DataResource;
    static readonly MALLEABLE: DataResource;
    static readonly MIGHTY: DataResource;
    static readonly MOONWALKER: DataResource;
    static readonly MULTI_BREAK: DataResource;
    static readonly ORGANIC: DataResource;
    static readonly RACKER: DataResource;
    static readonly REACH: DataResource;
    static readonly RED_CARD: DataResource;
    static readonly REFRACTIVE: DataResource;
    static readonly RENEW: DataResource;
    static readonly ROAD_MAKER: DataResource;
    static readonly RUSTIC: DataResource;
    static readonly SHARP: DataResource;
    static readonly SILKY: DataResource;
    static readonly SNOW_WALKER: DataResource;
    static readonly SOFT: DataResource;
    static readonly SPOON: DataResource;
    static readonly STELLAR: DataResource;
    static readonly STURDY: DataResource;
    static readonly SWIFT_SWIM: DataResource;
    static readonly SYNERGISTIC: DataResource;
    static readonly TERMINUS: DataResource;
    static readonly TURTLE: DataResource;
    static readonly VENOM: DataResource;
    static readonly VOID_WARD: DataResource;
    static readonly VULCAN: DataResource;
    static readonly WIDEN: DataResource;
    static readonly WIND_BLAST: DataResource;
    static readonly YUMMY: DataResource;
    static readonly ANCIENT_XP_BOOST: number;
    static readonly MOONWALKER_GRAVITY_MOD: number;
    static readonly STELLAR_REPAIR_CHANCE: number;
    static readonly SYNERGY_BOOST_MULTI: number;
  }


  class Parts {
    static readonly AXE_HEAD: DataResource;
    static readonly BINDING: DataResource;
    static readonly BOOTS_PLATES: DataResource;
    static readonly CHESTPLATE_PLATES: DataResource;
    static readonly COATING: DataResource;
    static readonly CORD: DataResource;
    static readonly GRIP: DataResource;
    static readonly HELMET_PLATES: DataResource;
    static readonly HOE_HEAD: DataResource;
    static readonly LEGGINGS_PLATES: DataResource;
    static readonly MISC_SPOON: DataResource;
    static readonly PICKAXE_HEAD: DataResource;
    static readonly RED_CARD: DataResource;
    static readonly ROD: DataResource;
    static readonly SHOVEL_HEAD: DataResource;
    static readonly SWORD_BLADE: DataResource;
    static readonly TIP: DataResource;
  }


  class Materials {
    static readonly AZURE_ELECTRUM: DataResource;
    static readonly AZURE_SILVER: DataResource;
    static readonly BLAZE_GOLD: DataResource;
    static readonly CRIMSON_STEEL: DataResource;
    static readonly DIAMOND: DataResource;
    static readonly DIMERALD: DataResource;
    static readonly EMERALD: DataResource;
    static readonly EMPTY: DataResource;
    static readonly EXAMPLE: DataResource;
    static readonly FEATHER: DataResource;
    static readonly GOLD: DataResource;
    static readonly LEATHER: DataResource;
    static readonly NETHERITE: DataResource;
    static readonly IRON: DataResource;
    static readonly STONE: DataResource;
    static readonly STRING: DataResource;
    static readonly TYRIAN_STEEL: DataResource;
    static readonly WOOD: DataResource;
    static readonly WOOD_ROUGH: DataResource;
    static readonly WOOL: DataResource;
    static readonly WOOL_BLACK: DataResource;
  }


  class LootTables {
    static readonly DROPS_SINEW: ResourceKey;
  }

}

declare module 'net.silentchaos512.gear.util.GearData' {
  import { PlayerLoggedInEvent } from 'PlayerEvent';

  class EventHandler {
    static onPlayerLoggedIn(event: PlayerLoggedInEvent): void;
  }

}

declare module 'net.silentchaos512.gear.util.IAoeTool' {
  import { BreakSpeed } from 'PlayerEvent';
  import { BreakEvent } from 'BlockEvent';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class BreakHandler {
    static onBlockBreakEvent(event: BreakEvent): void;
    static onBreakSpeedEvent(event: BreakSpeed): void;
  }


  interface MatchMode extends Enum<MatchMode> {}
  class MatchMode extends Enum<MatchMode> {
    static readonly LOOSE: MatchMode;
    static readonly MODERATE: MatchMode;
    static readonly STRICT: MatchMode;
    static valueOf(name: string): MatchMode;
    static values(): MatchMode[];
  }

}

declare module 'net.silentchaos512.gear.world' {
  import { Feature } from 'net.minecraft.world.level.levelgen.feature';
  import { RegisterEvent } from 'net.neoforged.neoforge.registries';

  class SgWorldFeatures {
    static readonly WILD_PLANT: Feature;
    static registerFeatures(event: RegisterEvent): void;
  }

}