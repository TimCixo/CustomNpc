declare module 'io.wispforest.accessories' {
  import { Key } from 'GameRules';
  import { AccessoryChangedCriterion } from 'io.wispforest.accessories.criteria';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Component } from 'net.minecraft.network.chat';
  import { AccessoriesConfig } from 'io.wispforest.accessories.compat.config';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { AccessoriesMenuVariant } from 'io.wispforest.accessories.menu';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Path } from 'java.nio.file';
  import { Logger } from 'org.slf4j';

  class Accessories {
    static readonly DEBUG: boolean;
    static RULE_KEEP_ACCESSORY_INVENTORY: Key;
    static readonly MODID: string;
    static ACCESSORY_EQUIPPED: AccessoryChangedCriterion;
    static ACCESSORY_UNEQUIPPED: AccessoryChangedCriterion;
    static askPlayerForVariant(player: ServerPlayer): void;
    static askPlayerForVariant(player: ServerPlayer, targetEntity: LivingEntity): void;
    static attemptOpenScreenPlayer(player: ServerPlayer, variant: AccessoriesMenuVariant): boolean;
    static config(): AccessoriesConfig;
    static init(): void;
    static of(path: string): ResourceLocation;
    static openAccessoriesMenu(player: Player, variant: AccessoriesMenuVariant, targetEntity: LivingEntity): void;
    static openAccessoriesMenu(player: Player, variant: AccessoriesMenuVariant, targetEntity: LivingEntity, carriedStack: ItemStack): void;
    static registerCriteria(): void;
    static translation(path: string): Component;
    static translationKey(path: string): string;
  }


  class AccessoriesLoaderInternals {
    static get configPath(): Path;
    static isDevelopmentEnv(): boolean;
    static isModLoaded(mod: string): boolean;
  }


  class DataLoaderBase {
    static readonly LOGGER: Logger;
    static INSTANCE: DataLoaderBase;
    registerListeners(): void;
  }

}

declare module 'io.wispforest.accessories.api' {
  import { TagKey } from 'net.minecraft.tags';
  import { Map, Collection, Set, Optional, List } from 'java.util';
  import { Item, ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { Level } from 'net.minecraft.world.level';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { AccessoryAttributeBuilder } from 'io.wispforest.accessories.api.attributes';
  import { SlotReference, SlotType, SlotBasedPredicate, SlotTypeReference, SlotEntryReference } from 'io.wispforest.accessories.api.slot';
  import { Holder } from 'net.minecraft.core';
  import { Attribute, AttributeModifier } from 'net.minecraft.world.entity.ai.attributes';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Operation } from 'AttributeModifier';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Container } from 'net.minecraft.world';
  import { Pair } from 'it.unimi.dsi.fastutil';
  import { Predicate, Function, Consumer } from 'java.util.function';
  import { ItemStackBasedPredicate } from 'io.wispforest.accessories.api.caching';
  import { Multimap } from 'com.google.common.collect';
  import { TriFunction } from 'org.apache.commons.lang3.function';
  import { Boolean, Enum } from 'java.lang';
  import { ExpandedSimpleContainer, PlayerEquipControl } from 'io.wispforest.accessories.impl';
  import { AccessoriesHolderLookupCache } from 'io.wispforest.accessories.impl.caching';
  import { Builder } from 'io.wispforest.accessories.api.components.AccessoryItemAttributeModifiers';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { Component } from 'net.minecraft.network.chat';
  import { TooltipContext, Properties } from 'Item';
  import { AccessoryNestContainerContents } from 'io.wispforest.accessories.api.components';

  class AccessoriesAPI {
    static readonly DEFAULT: Accessory;
    static readonly ALL_ACCESSORIES: TagKey;
    static readonly ANY_ACCESSORIES: TagKey;
    static addAttribute(stack: ItemStack, slotName: string, attribute: Holder<Attribute>, location: ResourceLocation, amount: number, operation: Operation, isStackable: boolean): void;
    static breakStack(reference: SlotReference): void;
    static canEquip(stack: ItemStack, reference: SlotReference): boolean;
    static canInsertIntoSlot(stack: ItemStack, reference: SlotReference): boolean;
    static canUnequip(stack: ItemStack, reference: SlotReference): boolean;
    static createSlotLocation(slotType: SlotType, index: number): ResourceLocation;
    static createSlotLocation(slotName: string, index: number): ResourceLocation;
    static defaultAccessory(): Accessory;
    static get allAccessories(): Map<Item, Accessory>;
    static getAccessory(stack: ItemStack): Accessory;
    static getAccessory(item: Item): Accessory;
    static getAttributeModifiers(stack: ItemStack, slotReference: SlotReference): AccessoryAttributeBuilder;
    static getAttributeModifiers(stack: ItemStack, slotReference: SlotReference, useTooltipCheck: boolean): AccessoryAttributeBuilder;
    static getAttributeModifiers(stack: ItemStack, slotName: string, slot: number): AccessoryAttributeBuilder;
    static getAttributeModifiers(stack: ItemStack, entity: LivingEntity, slotName: string, slot: number): AccessoryAttributeBuilder;
    static getAttributeModifiers(stack: ItemStack, entity: LivingEntity, slotName: string, slot: number, hideTooltipIfDisabled: boolean): AccessoryAttributeBuilder;
    static getOrDefaultAccessory(stack: ItemStack): Accessory;
    static getOrDefaultAccessory(item: Item): Accessory;
    static getPredicate(location: ResourceLocation): SlotBasedPredicate;
    static getPredicateResults(predicateIds: Set<ResourceLocation>, level: Level, slotType: SlotType, index: number, stack: ItemStack): boolean;
    static getPredicateResults(predicateIds: Set<ResourceLocation>, level: Level, entity: LivingEntity, slotType: SlotType, index: number, stack: ItemStack): boolean;
    static getSlotTag(slotType: SlotType): TagKey<Item>;
    static getStackSlotTypes(level: Level, stack: ItemStack): Collection<SlotType>;
    static getStackSlotTypes(entity: LivingEntity, stack: ItemStack): Collection<SlotType>;
    static getStackSlotTypes(level: Level, entity: LivingEntity, stack: ItemStack): Collection<SlotType>;
    static getUsedSlotsFor(player: Player): Collection<SlotType>;
    static getUsedSlotsFor(entity: LivingEntity, container: Container): Collection<SlotType>;
    static getValidSlotTypes(entity: LivingEntity, stack: ItemStack): Collection<SlotType>;
    static isDefaultAccessory(accessory: Accessory): boolean;
    static isValidAccessory(stack: ItemStack, level: Level): boolean;
    static isValidAccessory(stack: ItemStack, level: Level, entity: LivingEntity): boolean;
    static registerAccessory(item: Item, accessory: Accessory): void;
    static registerPredicate(location: ResourceLocation, predicate: SlotBasedPredicate): void;
  }


  class AccessoriesCapability {
    addPersistentSlotModifiers(var1: Multimap<string, AttributeModifier>): void;
    addTransientSlotModifiers(var1: Multimap<string, AttributeModifier>): void;
    attemptToEquipAccessory(stack: ItemStack): SlotReference;
    attemptToEquipAccessory(stack: ItemStack, allowSwapping: boolean): Pair<SlotReference, Optional<ItemStack>>;
    canEquipAccessory(stack: ItemStack, allowSwapping: boolean): Pair<SlotReference, EquipAction>;
    canEquipAccessory(var1: ItemStack, var2: boolean, var3: EquipCheck): Pair<SlotReference, EquipAction>;
    clearCachedSlotModifiers(): void;
    clearSlotModifiers(): void;
    entity(): LivingEntity;
    equipAccessory(stack: ItemStack): Pair<SlotReference, ItemStack[]>;
    equipAccessory(stack: ItemStack, allowSwapping: boolean): Pair<SlotReference, ItemStack[]>;
    equipAccessory(stack: ItemStack, allowSwapping: boolean, additionalCheck: TriFunction<Accessory, ItemStack, SlotReference, boolean>): Pair<SlotReference, ItemStack[]>;
    static get(livingEntity: LivingEntity): AccessoriesCapability;
    get allEquipped(): SlotEntryReference[];
    get containers(): Map<string, AccessoriesContainer>;
    get holder(): AccessoriesHolder;
    get slotModifiers(): Multimap<string, AttributeModifier>;
    getAllEquipped(var1: boolean): SlotEntryReference[];
    getContainer(slotType: SlotType): AccessoriesContainer;
    getContainer(reference: SlotTypeReference): AccessoriesContainer;
    getEquipped(item: Item): SlotEntryReference[];
    getEquipped(predicate: Predicate<ItemStack>): SlotEntryReference[];
    getEquipped(predicate: ItemStackBasedPredicate): SlotEntryReference[];
    getFirstEquipped(item: Item): SlotEntryReference;
    getFirstEquipped(item: Item, check: EquipmentChecking): SlotEntryReference;
    getFirstEquipped(predicate: Predicate<ItemStack>): SlotEntryReference;
    getFirstEquipped(predicate: Predicate<ItemStack>, check: EquipmentChecking): SlotEntryReference;
    getFirstEquipped(var1: ItemStackBasedPredicate, var2: EquipmentChecking): SlotEntryReference;
    static getOptionally(livingEntity: LivingEntity): Optional<AccessoriesCapability>;
    isAnotherEquipped(stack: ItemStack, slotReference: SlotReference, item: Item): boolean;
    isAnotherEquipped(stack: ItemStack, slotReference: SlotReference, predicate: Predicate<ItemStack>): boolean;
    isAnotherEquipped(stack: ItemStack, slotReference: SlotReference, predicate: ItemStackBasedPredicate): boolean;
    isAnotherEquipped(slotReference: SlotReference, item: Item): boolean;
    isAnotherEquipped(slotReference: SlotReference, predicate: Predicate<ItemStack>): boolean;
    isEquipped(item: Item): boolean;
    isEquipped(item: Item, check: EquipmentChecking): boolean;
    isEquipped(predicate: Predicate<ItemStack>): boolean;
    isEquipped(predicate: Predicate<ItemStack>, check: EquipmentChecking): boolean;
    isEquipped(predicate: ItemStackBasedPredicate, check: EquipmentChecking): boolean;
    removeSlotModifiers(var1: Multimap<string, AttributeModifier>): void;
    reset(var1: boolean): void;
    updateContainers(): void;
  }


  class AccessoriesContainer {
    addPersistentModifier(var1: AttributeModifier): void;
    addTransientModifier(var1: AttributeModifier): void;
    capability(): AccessoriesCapability;
    clearCachedModifiers(): void;
    clearModifiers(): void;
    createReference(index: number): SlotReference;
    get accessories(): ExpandedSimpleContainer;
    get cachedModifiers(): Set<AttributeModifier>;
    get cosmeticAccessories(): ExpandedSimpleContainer;
    get modifiers(): Map<ResourceLocation, AttributeModifier>;
    get size(): number;
    get slotName(): string;
    getModifiersForOperation(var1: Operation): Collection<AttributeModifier>;
    hasChanged(): boolean;
    hasModifier(var1: ResourceLocation): boolean;
    markChanged(var1: boolean): void;
    markChanged(): void;
    removeCachedModifiers(var1: AttributeModifier): void;
    removeModifier(var1: ResourceLocation): void;
    renderOptions(): boolean[];
    shouldRender(index: number): boolean;
    slotType(): SlotType;
    update(): void;
  }


  class AccessoriesHolder {
    columnAmount(): number;
    columnAmount(var1: number): AccessoriesHolder;
    cosmeticsShown(): boolean;
    cosmeticsShown(var1: boolean): AccessoriesHolder;
    equipControl(): PlayerEquipControl;
    equipControl(var1: PlayerEquipControl): AccessoriesHolder;
    filteredGroups(): Set<string>;
    filteredGroups(var1: Set<string>): AccessoriesHolder;
    static get(livingEntity: LivingEntity): AccessoriesHolder;
    get lookupCache(): AccessoriesHolderLookupCache;
    static getOptionally(livingEntity: LivingEntity): Optional<AccessoriesHolder>;
    isGroupFiltersOpen(): boolean;
    isGroupFiltersOpen(var1: boolean): AccessoriesHolder;
    linesShown(): boolean;
    linesShown(value: boolean): AccessoriesHolder;
    mainWidgetPosition(): boolean;
    mainWidgetPosition(var1: boolean): AccessoriesHolder;
    showAdvancedOptions(): boolean;
    showAdvancedOptions(var1: boolean): AccessoriesHolder;
    showCraftingGrid(): boolean;
    showCraftingGrid(var1: boolean): AccessoriesHolder;
    showGroupFilter(): boolean;
    showGroupFilter(var1: boolean): AccessoriesHolder;
    showUniqueSlots(): boolean;
    showUniqueSlots(value: boolean): AccessoriesHolder;
    showUnusedSlots(): boolean;
    showUnusedSlots(var1: boolean): AccessoriesHolder;
    sideWidgetPosition(): boolean;
    sideWidgetPosition(var1: boolean): AccessoriesHolder;
    widgetType(): number;
    widgetType(var1: number): AccessoriesHolder;
  }


  class Accessory {
    canEquip(stack: ItemStack, reference: SlotReference): boolean;
    canEquipFromUse(stack: ItemStack): boolean;
    canEquipFromUse(stack: ItemStack, reference: SlotReference): boolean;
    canUnequip(stack: ItemStack, reference: SlotReference): boolean;
    getAttributesTooltip(stack: ItemStack, type: SlotType, tooltips: Component[], tooltipContext: TooltipContext, tooltipType: TooltipFlag): void;
    getAttributesTooltip(stack: ItemStack, type: SlotType, tooltips: Component[]): void;
    getDropRule(stack: ItemStack, reference: SlotReference, source: DamageSource): DropRule;
    getDynamicModifiers(stack: ItemStack, reference: SlotReference, builder: AccessoryAttributeBuilder): void;
    getEquipSound(stack: ItemStack, reference: SlotReference): SoundEventData;
    getExtraTooltip(stack: ItemStack, tooltips: Component[], tooltipContext: TooltipContext, tooltipType: TooltipFlag): void;
    getExtraTooltip(stack: ItemStack, tooltips: Component[]): void;
    getModifiers(stack: ItemStack, reference: SlotReference, builder: AccessoryAttributeBuilder): void;
    getStaticModifiers(item: Item, builder: Builder): void;
    maxStackSize(stack: ItemStack): number;
    onBreak(stack: ItemStack, reference: SlotReference): void;
    onEquip(stack: ItemStack, reference: SlotReference): void;
    onEquipFromUse(stack: ItemStack, reference: SlotReference): void;
    onUnequip(stack: ItemStack, reference: SlotReference): void;
    tick(stack: ItemStack, reference: SlotReference): void;
  }


  interface AccessoryItem extends Accessory, Item {}
  class AccessoryItem extends Accessory {
    constructor(properties: Properties);
  }


  interface AccessoryNest extends Accessory {}
  class AccessoryNest extends Accessory {
    allowDeepRecursion(): boolean;
    static attemptConsumer(holderStack: ItemStack, slotReference: SlotReference, consumer: Consumer<Map<SlotEntryReference, Accessory>>): void;
    static attemptConsumer(holderStack: ItemStack, livingEntity: LivingEntity, consumer: Consumer<Map<ItemStack, Accessory>>): void;
    static attemptFunction<T>(holderStack: ItemStack, slotReference: SlotReference, func: Function<Map<SlotEntryReference, Accessory>, T>, defaultValue: T): T;
    static attemptFunction<T>(holderStack: ItemStack, livingEntity: LivingEntity, func: Function<Map<ItemStack, Accessory>, T>, defaultValue: T): T;
    canEquip(stack: ItemStack, reference: SlotReference, map: Map<SlotEntryReference, Accessory>): boolean;
    canEquip(stack: ItemStack, reference: SlotReference): boolean;
    canUnequip(stack: ItemStack, reference: SlotReference, map: Map<SlotEntryReference, Accessory>): boolean;
    canUnequip(stack: ItemStack, reference: SlotReference): boolean;
    getAttributesTooltip(stack: ItemStack, type: SlotType, tooltips: Component[], tooltipContext: TooltipContext, tooltipType: TooltipFlag, map: Map<ItemStack, Accessory>): void;
    getAttributesTooltip(stack: ItemStack, type: SlotType, tooltips: Component[], tooltipContext: TooltipContext, tooltipType: TooltipFlag): void;
    getAttributesTooltip(stack: ItemStack, type: SlotType, tooltips: Component[]): void;
    getDropRules(stack: ItemStack, reference: SlotReference, source: DamageSource): Pair<DropRule, ItemStack>[];
    getDynamicModifiers(stack: ItemStack, reference: SlotReference, builder: AccessoryAttributeBuilder, innerMap: Map<SlotEntryReference, Accessory>): void;
    getDynamicModifiers(stack: ItemStack, reference: SlotReference, builder: AccessoryAttributeBuilder): void;
    getExtraTooltip(stack: ItemStack, tooltips: Component[], tooltipContext: TooltipContext, tooltipType: TooltipFlag, map: Map<ItemStack, Accessory>): void;
    getExtraTooltip(stack: ItemStack, tooltips: Component[], tooltipContext: TooltipContext, tooltipType: TooltipFlag): void;
    getExtraTooltip(stack: ItemStack, tooltips: Component[]): void;
    getInnerStacks(holderStack: ItemStack): ItemStack[];
    static isAccessoryNest(holderStack: ItemStack): boolean;
    onEquip(stack: ItemStack, reference: SlotReference, map: Map<SlotEntryReference, Accessory>): void;
    onEquip(stack: ItemStack, reference: SlotReference): void;
    onStackChanges(holderStack: ItemStack, data: AccessoryNestContainerContents, livingEntity: LivingEntity): void;
    onUnequip(stack: ItemStack, reference: SlotReference, map: Map<SlotEntryReference, Accessory>): void;
    onUnequip(stack: ItemStack, reference: SlotReference): void;
    setInnerStack(holderStack: ItemStack, index: number, newStack: ItemStack): boolean;
    tick(stack: ItemStack, reference: SlotReference, map: Map<SlotEntryReference, Accessory>): void;
    tick(stack: ItemStack, reference: SlotReference): void;
  }


  interface DropRule extends Enum<DropRule> {}
  class DropRule extends Enum<DropRule> {
    static readonly KEEP: DropRule;
    static readonly DROP: DropRule;
    static readonly DESTROY: DropRule;
    static readonly DEFAULT: DropRule;
    static valueOf(name: string): DropRule;
    static values(): DropRule[];
  }


  class EquipAction {
    equipStack(var1: ItemStack): Optional<ItemStack>;
  }


  class EquipCheck {
    isValid(var1: ItemStack, var2: boolean): boolean;
  }


  interface EquipmentChecking extends Enum<EquipmentChecking> {}
  class EquipmentChecking extends Enum<EquipmentChecking> {
    static readonly ACCESSORIES_ONLY: EquipmentChecking;
    static readonly COSMETICALLY_OVERRIDABLE: EquipmentChecking;
    static valueOf(name: string): EquipmentChecking;
    static values(): EquipmentChecking[];
  }

}

declare module 'io.wispforest.accessories.api.attributes' {
  import { SlotReference, SlotType } from 'io.wispforest.accessories.api.slot';
  import { Holder } from 'net.minecraft.core';
  import { Attribute, AttributeModifier } from 'net.minecraft.world.entity.ai.attributes';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Operation } from 'AttributeModifier';
  import { Collection, Map } from 'java.util';
  import { Multimap } from 'com.google.common.collect';
  import { ItemStack } from 'net.minecraft.world.item';

  class AccessoryAttributeBuilder {
    constructor(slotReference: SlotReference, parentBuilder: AccessoryAttributeBuilder);

    constructor(slotReference: SlotReference);

    constructor(slotName: string, slot: number);

    constructor();
    addExclusive(attribute: Holder<Attribute>, location: ResourceLocation, amount: number, operation: Operation): AccessoryAttributeBuilder;
    addExclusive(attribute: Holder<Attribute>, modifier: AttributeModifier): AccessoryAttributeBuilder;
    addFrom(builder: AccessoryAttributeBuilder): AccessoryAttributeBuilder;
    addStackable(attribute: Holder<Attribute>, location: ResourceLocation, amount: number, operation: Operation): AccessoryAttributeBuilder;
    addStackable(attribute: Holder<Attribute>, modifier: AttributeModifier): AccessoryAttributeBuilder;
    static createSlotPath(ref: SlotReference): string;
    static createSlotPath(slotname: string, slot: number): string;
    equals(obj: any): boolean;
    exclusiveAttributes(): Map<Holder<Attribute>, Map<ResourceLocation, AttributeModificationData>>;
    get slotModifiers(): Multimap<string, AttributeModifier>;
    getAttributeModifiers(filterSlots: boolean): Multimap<Holder<Attribute>, AttributeModifier>;
    getExclusive(attribute: Holder<Attribute>, location: ResourceLocation): AttributeModificationData;
    getStacks(attribute: Holder<Attribute>, location: ResourceLocation): Collection<AttributeModificationData>;
    isEmpty(): boolean;
    removeExclusive(attribute: Holder<Attribute>, location: ResourceLocation): AttributeModificationData;
    removeStacks(attribute: Holder<Attribute>, location: ResourceLocation): Collection<AttributeModificationData>;
    stackedAttributes(): Multimap<Holder<Attribute>, AttributeModificationData>;
  }


  interface SlotAttribute extends Attribute {}
  class SlotAttribute extends Attribute {
    static addSlotAttribute(builder: AccessoryAttributeBuilder, targetSlot: string, location: ResourceLocation, amount: number, operation: Operation, isStackable: boolean): void;
    static addSlotAttribute(stack: ItemStack, targetSlot: string, boundSlot: string, location: ResourceLocation, amount: number, operation: Operation, isStackable: boolean): void;
    static addSlotModifier(map: Multimap<Holder<Attribute>, AttributeModifier>, slotType: SlotType, location: ResourceLocation, amount: number, operation: Operation): void;
    static addSlotModifier(map: Multimap<Holder<Attribute>, AttributeModifier>, slot: string, location: ResourceLocation, amount: number, operation: Operation): void;
    static getAttributeHolder(slotType: SlotType): Holder<Attribute>;
    static getAttributeHolder(slotName: string): Holder<Attribute>;
    static getSlotAttribute(slotType: SlotType): SlotAttribute;
    static getSlotAttribute(slotName: string): SlotAttribute;
    slotName(): string;
  }

}

declare module 'io.wispforest.accessories.api.caching' {
  import { DataComponentMap, DataComponentType } from 'net.minecraft.core.component';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { Predicate } from 'java.util.function';
  import { TagKey } from 'net.minecraft.tags';

  interface DataComponentMapPredicate extends ItemStackBasedPredicate {}
  class DataComponentMapPredicate extends ItemStackBasedPredicate {
    readonly dataComponentMap: DataComponentMap;
    constructor(name: string, dataComponentMap: DataComponentMap);
    extraStringData(): string;
    hashCode(): number;
    test(stack: ItemStack): boolean;
  }


  interface DataComponentsPredicate extends ItemStackBasedPredicate {}
  class DataComponentsPredicate extends ItemStackBasedPredicate {
    readonly dataComponentTypes: DataComponentType[];
    constructor(name: string, ...dataComponentTypes: DataComponentType<any>[]);
    extraStringData(): string;
    hashCode(): number;
    test(stack: ItemStack): boolean;
  }


  interface ItemPredicate extends ItemStackBasedPredicate {}
  class ItemPredicate extends ItemStackBasedPredicate {
    constructor(name: string, item: Item);
    extraStringData(): string;
    hashCode(): number;
    test(stack: ItemStack): boolean;
  }


  interface ItemStackBasedPredicate extends Predicate<ItemStack> {}
  class ItemStackBasedPredicate extends Predicate<ItemStack> {
    equals(other: any): boolean;
    extraStringData(): string;
    hashCode(): number;
    static ofComponents(...dataComponentTypes: DataComponentType<any>[]): ItemStackBasedPredicate;
    static ofComponents(name: string, ...dataComponentTypes: DataComponentType<any>[]): ItemStackBasedPredicate;
    static ofItem(item: Item): ItemStackBasedPredicate;
    static ofItem(name: string, item: Item): ItemStackBasedPredicate;
    static ofPredicate(predicate: Predicate<ItemStack>): ItemStackBasedPredicate;
    static ofPredicate(name: string, predicate: Predicate<ItemStack>): ItemStackBasedPredicate;
    test(var1: ItemStack): boolean;
    toString(): string;
  }


  interface ItemStackPredicate extends ItemStackBasedPredicate {}
  class ItemStackPredicate extends ItemStackBasedPredicate {
    constructor(name: string, predicate: Predicate<ItemStack>);
    extraStringData(): string;
    hashCode(): number;
    test(stack: ItemStack): boolean;
  }


  interface ItemTagPredicate extends ItemStackBasedPredicate {}
  class ItemTagPredicate extends ItemStackBasedPredicate {
    constructor(name: string, itemTagKey: TagKey<Item>);
    extraStringData(): string;
    hashCode(): number;
    test(stack: ItemStack): boolean;
  }

}

declare module 'io.wispforest.accessories.api.caching.DataComponentMapPredicate' {
  import { DataComponentType } from 'net.minecraft.core.component';

  class ComponentAddCallback {
    add<T>(var1: DataComponentType<T>, var2: T): void;
  }

}

declare module 'io.wispforest.accessories.api.client' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Supplier, Consumer } from 'java.util.function';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { SlotReference } from 'io.wispforest.accessories.api.slot';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { EntityModel, HumanoidModel } from 'net.minecraft.client.model';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { LivingEntity, HumanoidArm, EquipmentSlot } from 'net.minecraft.world.entity';
  import { ModelPart } from 'net.minecraft.client.model.geom';
  import { Number, Enum } from 'java.lang';
  import { RenderHelper } from 'io.wispforest.accessories.api.client.DefaultAccessoryRenderer';
  import { Vec3i } from 'net.minecraft.core';
  import { List } from 'java.util';
  import { Endec } from 'io.wispforest.endec';
  import { Vector3f, Quaternionf, AxisAngle4f, Matrix4f } from 'org.joml';

  class AccessoriesRendererRegistry {
    static getRender(stack: ItemStack): AccessoryRenderer;
    static getRender(item: Item): AccessoryRenderer;
    static getRenderer(stack: ItemStack): AccessoryRenderer;
    static getRenderer(item: Item): AccessoryRenderer;
    static getRenderer(rendererId: ResourceLocation): AccessoryRenderer;
    static getRendererId(renderer: AccessoryRenderer): ResourceLocation;
    static getRendererId(item: Item): ResourceLocation;
    static hasRenderer(item: Item): boolean;
    static hasRenderer(rendererId: ResourceLocation): boolean;
    static onReload(): void;
    static registerArmorRendering(item: Item): void;
    static registerNoRenderer(item: Item): void;
    static registerRenderer(location: ResourceLocation, renderer: Supplier<AccessoryRenderer>): void;
    static registerRenderer(item: Item, renderer: Supplier<AccessoryRenderer>): void;
  }


  interface AccessoryArmorRenderer extends AccessoryRenderer {}
  class AccessoryArmorRenderer extends AccessoryRenderer {
    render<M extends LivingEntity>(stack: ItemStack, reference: SlotReference, matrices: PoseStack, model: EntityModel<M>, multiBufferSource: MultiBufferSource, light: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  class AccessoryRenderer {
    static followBodyRotations(entity: LivingEntity, model: HumanoidModel<LivingEntity>): void;
    isEmpty(): boolean;
    render<M extends LivingEntity>(var1: ItemStack, var2: SlotReference, var3: PoseStack, var4: EntityModel<M>, var5: MultiBufferSource, var6: number, var7: number, var8: number, var9: number, var10: number, var11: number, var12: number): void;
    renderOnFirstPerson<M extends LivingEntity>(arm: HumanoidArm, stack: ItemStack, reference: SlotReference, matrices: PoseStack, model: EntityModel<M>, multiBufferSource: MultiBufferSource, light: number): void;
    shouldRender(isRendering: boolean): boolean;
    shouldRenderInFirstPerson(arm: HumanoidArm, stack: ItemStack, reference: SlotReference): boolean;
    static transformToFace(poseStack: PoseStack, part: ModelPart, side: Side): void;
    static transformToModelPart(poseStack: PoseStack, part: ModelPart): void;
    static transformToModelPart(poseStack: PoseStack, part: ModelPart, xPercent: Number, yPercent: Number, zPercent: Number): void;
    static translateToChest(poseStack: PoseStack, model: HumanoidModel<LivingEntity>, livingEntity: LivingEntity): void;
    static translateToFace(poseStack: PoseStack, model: HumanoidModel<LivingEntity>, entity: LivingEntity): void;
    static translateToLeftArm(poseStack: PoseStack, model: HumanoidModel<LivingEntity>, player: LivingEntity): void;
    static translateToLeftLeg(poseStack: PoseStack, model: HumanoidModel<LivingEntity>, player: LivingEntity): void;
    static translateToRightArm(poseStack: PoseStack, model: HumanoidModel<LivingEntity>, player: LivingEntity): void;
    static translateToRightLeg(poseStack: PoseStack, model: HumanoidModel<LivingEntity>, player: LivingEntity): void;
  }


  class ArmorRenderingExtension<T extends LivingEntity = any> {
    static readonly RENDERER: AccessoryRenderer;
    renderEquipmentStack(stack: ItemStack, poseStack: PoseStack, multiBufferSource: MultiBufferSource, livingEntity: T, equipmentSlot: EquipmentSlot, light: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface DefaultAccessoryRenderer extends AccessoryRenderer {}
  class DefaultAccessoryRenderer extends AccessoryRenderer {
    static readonly INSTANCE: DefaultAccessoryRenderer;
    constructor();
    static registerHelper(slotType: string, helper: RenderHelper): void;
    render<M extends LivingEntity>(stack: ItemStack, reference: SlotReference, matrices: PoseStack, model: EntityModel<M>, multiBufferSource: MultiBufferSource, light: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
    render<M extends LivingEntity>(renderCall: Consumer<PoseStack>, matrices: PoseStack, humanoidModel: HumanoidModel<M>, reference: SlotReference): void;
    render<M extends LivingEntity>(renderCall: Consumer<PoseStack>, matrices: PoseStack, humanoidModel: HumanoidModel<M>, reference: SlotReference): void;
    render<M extends LivingEntity>(renderCall: Consumer<PoseStack>, matrices: PoseStack, humanoidModel: HumanoidModel<M>, reference: SlotReference): void;
    render<M extends LivingEntity>(renderCall: Consumer<PoseStack>, matrices: PoseStack, humanoidModel: HumanoidModel<M>, reference: SlotReference): void;
    render<M extends LivingEntity>(renderCall: Consumer<PoseStack>, matrices: PoseStack, humanoidModel: HumanoidModel<M>, reference: SlotReference): void;
    render<M extends LivingEntity>(renderCall: Consumer<PoseStack>, matrices: PoseStack, humanoidModel: HumanoidModel<M>, reference: SlotReference): void;
    render<M extends LivingEntity>(renderCall: Consumer<PoseStack>, matrices: PoseStack, humanoidModel: HumanoidModel<M>, reference: SlotReference): void;
    render<M extends LivingEntity>(renderCall: Consumer<PoseStack>, matrices: PoseStack, humanoidModel: HumanoidModel<M>, reference: SlotReference): void;
    render<M extends LivingEntity>(renderCall: Consumer<PoseStack>, matrices: PoseStack, humanoidModel: HumanoidModel<M>, reference: SlotReference): void;
    render<M extends LivingEntity>(renderCall: Consumer<PoseStack>, matrices: PoseStack, humanoidModel: HumanoidModel<M>, reference: SlotReference): void;
    render<M extends LivingEntity>(renderCall: Consumer<PoseStack>, matrices: PoseStack, humanoidModel: HumanoidModel<M>, reference: SlotReference): void;
    shouldRenderInFirstPerson(arm: HumanoidArm, stack: ItemStack, reference: SlotReference): boolean;
  }


  interface EmptyRenderer extends AccessoryRenderer {}
  class EmptyRenderer extends AccessoryRenderer {
    render<M extends LivingEntity>(stack: ItemStack, reference: SlotReference, matrices: PoseStack, model: EntityModel<M>, multiBufferSource: MultiBufferSource, light: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface Side extends Enum<Side> {}
  class Side extends Enum<Side> {
    static readonly BOTTOM: Side;
    static readonly TOP: Side;
    static readonly BACK: Side;
    static readonly FRONT: Side;
    static readonly LEFT: Side;
    static readonly RIGHT: Side;
    rotationAxis(): Vec3i;
    static valueOf(name: string): Side;
    static values(): Side[];
  }


  interface SimpleAccessoryRenderer extends AccessoryRenderer {}
  class SimpleAccessoryRenderer extends AccessoryRenderer {
    align<M extends LivingEntity>(var1: ItemStack, var2: SlotReference, var3: EntityModel<M>, var4: PoseStack): void;
    render<M extends LivingEntity>(stack: ItemStack, reference: SlotReference, matrices: PoseStack, model: EntityModel<M>, multiBufferSource: MultiBufferSource, light: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  interface TargetType extends Enum<TargetType> {}
  class TargetType extends Enum<TargetType> {
    static readonly ITEM: TargetType;
    static readonly BLOCK: TargetType;
    static readonly ALL: TargetType;
    isValid(item: Item): boolean;
    static valueOf(name: string): TargetType;
    static values(): TargetType[];
  }


  class Transformation {
    static readonly ENDEC: Endec;
    static axisRotation(angle: number, side: Side): Transformation;
    static axisRotation(angle: number, x: number, y: number, z: number): Transformation;
    static axisRotation(rotation: AxisAngle4f): Transformation;
    key(): string;
    static matrix(matrix4f: Matrix4f): Transformation;
    static modelTarget(modelPart: string, rawNormal: Vector3f): Transformation;
    static modelTarget(modelPart: string, side: Side): Transformation;
    static modelTarget(target: ModelTarget): Transformation;
    static rawRotation(rotation: Quaternionf): Transformation;
    static scale(x: number, y: number, z: number): Transformation;
    static scale(scale: Vector3f): Transformation;
    static translation(x: number, y: number, z: number): Transformation;
    static translation(translation: Vector3f): Transformation;
  }


  interface WrappedAccessoryRenderer extends AccessoryRenderer {}
  class WrappedAccessoryRenderer extends AccessoryRenderer {
    constructor(delegate: AccessoryRenderer);
    render<M extends LivingEntity>(stack: ItemStack, reference: SlotReference, matrices: PoseStack, model: EntityModel<M>, multiBufferSource: MultiBufferSource, light: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
    renderOnFirstPerson<M extends LivingEntity>(arm: HumanoidArm, stack: ItemStack, reference: SlotReference, matrices: PoseStack, model: EntityModel<M>, multiBufferSource: MultiBufferSource, light: number): void;
    shouldRender(isRendering: boolean): boolean;
    shouldRenderInFirstPerson(arm: HumanoidArm, stack: ItemStack, reference: SlotReference): boolean;
  }

}

declare module 'io.wispforest.accessories.api.client.AccessoriesRendererRegistry' {
  import { AccessoryRenderer } from 'io.wispforest.accessories.api.client';
  import { ItemStack } from 'net.minecraft.world.item';
  import { SlotReference } from 'io.wispforest.accessories.api.slot';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { EntityModel } from 'net.minecraft.client.model';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { LivingEntity, HumanoidArm } from 'net.minecraft.world.entity';

  interface DataDrivenAccessoryRenderer extends AccessoryRenderer {}
  class DataDrivenAccessoryRenderer extends AccessoryRenderer {
    static readonly INSTANCE: DataDrivenAccessoryRenderer;
    render<M extends LivingEntity>(stack: ItemStack, reference: SlotReference, matrices: PoseStack, model: EntityModel<M>, multiBufferSource: MultiBufferSource, light: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
    renderOnFirstPerson<M extends LivingEntity>(arm: HumanoidArm, stack: ItemStack, reference: SlotReference, matrices: PoseStack, model: EntityModel<M>, multiBufferSource: MultiBufferSource, light: number): void;
    shouldRenderInFirstPerson(arm: HumanoidArm, stack: ItemStack, reference: SlotReference): boolean;
  }

}

declare module 'io.wispforest.accessories.api.client.DefaultAccessoryRenderer' {
  import { Consumer } from 'java.util.function';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { HumanoidModel } from 'net.minecraft.client.model';
  import { SlotReference } from 'io.wispforest.accessories.api.slot';
  import { LivingEntity } from 'net.minecraft.world.entity';

  class RenderHelper {
    render<M extends LivingEntity>(var1: Consumer<PoseStack>, var2: PoseStack, var3: HumanoidModel<M>, var4: SlotReference): void;
  }

}

declare module 'io.wispforest.accessories.api.client.rendering' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ModelPartTransformer } from 'io.wispforest.accessories.api.client.rendering.ModelTransformUtils';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { LivingEntity, EntityType, Entity as net_minecraft_world_entity_Entity } from 'net.minecraft.world.entity';
  import { Model } from 'net.minecraft.client.model';
  import { Side, Transformation as io_wispforest_accessories_api_client_Transformation } from 'io.wispforest.accessories.api.client';
  import { Number } from 'java.lang';
  import { ModelPart } from 'net.minecraft.client.model.geom';
  import { Endec } from 'io.wispforest.endec';
  import { Transformation, Model as io_wispforest_accessories_api_client_rendering_renderingfunction_Model, Block, Item, Entity, Particle } from 'io.wispforest.accessories.api.client.rendering.RenderingFunction';
  import { List } from 'java.util';
  import { Block as net_minecraft_world_level_block_Block } from 'net.minecraft.world.level.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { Level } from 'net.minecraft.world.level';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ParticleOptions } from 'net.minecraft.core.particles';
  import { Vector3f } from 'org.joml';

  class ModelTransformUtils {
    static getPart(model: Model, modelPartName: string): ModelPart;
    static registerTransformer(location: ResourceLocation, modelTransformers: ModelPartTransformer): void;
    static transformToFace(poseStack: PoseStack, livingEntity: LivingEntity, model: Model, modelPartName: string, side: Side): boolean;
    static transformToFace(poseStack: PoseStack, part: ModelPart, side: Side): void;
    static transformToModelPart(poseStack: PoseStack, livingEntity: LivingEntity, model: Model, modelPartName: string): boolean;
    static transformToModelPart(poseStack: PoseStack, livingEntity: LivingEntity, model: Model, modelPartName: string, xPercent: Number, yPercent: Number, zPercent: Number): boolean;
    static transformToModelPart(poseStack: PoseStack, part: ModelPart): void;
    static transformToModelPart(poseStack: PoseStack, part: ModelPart, xPercent: Number, yPercent: Number, zPercent: Number): void;
  }


  class RenderingFunction {
    static readonly ENDEC: Endec;
    key(): string;
    static ofBlock(block: net_minecraft_world_level_block_Block): Block;
    static ofBlock(state: BlockState): Block;
    static ofBlockEntity(block: net_minecraft_world_level_block_Block, type: BlockEntityType<BlockEntity>, level: Level): Block;
    static ofBlockEntity(blockState: BlockState, type: BlockEntityType<BlockEntity>, level: Level): Block;
    static ofBlockEntity(blockState: BlockState, type: BlockEntityType<BlockEntity>, data: CompoundTag): Block;
    static ofEntity(entityType: EntityType<net_minecraft_world_entity_Entity>, level: Level): Entity;
    static ofEntity(entityType: EntityType<net_minecraft_world_entity_Entity>, data: CompoundTag): Entity;
    static ofItem(stack: ItemStack): Item;
    static ofModel(id: ResourceLocation, variant: string): io_wispforest_accessories_api_client_rendering_renderingfunction_Model;
    static ofParticle(uniqueId: ResourceLocation, delay: number, particleData: ParticleOptions, delta: Vector3f, speed: number, count: number, force: boolean): Particle;
    static ofTransformation(transformations: io_wispforest_accessories_api_client_Transformation[], innerRendering: RenderingFunction): Transformation;
  }


  class RenderingFunctionPredicate {
    static readonly ENDEC: Endec;
    key(): string;
    shouldRender(var1: LivingEntity, var2: Model): boolean;
  }

}

declare module 'io.wispforest.accessories.api.client.rendering.ModelTransformUtils' {
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { Model } from 'net.minecraft.client.model';
  import { Number } from 'java.lang';

  class ModelPartTransformer {
    transformToPart(var1: PoseStack, var2: LivingEntity, var3: Model, var4: string, var5: Number, var6: Number, var7: Number): boolean;
  }

}

declare module 'io.wispforest.accessories.api.client.rendering.RenderingFunction' {
  import { Enum } from 'java.lang';
  import { HumanoidArm } from 'net.minecraft.world.entity';
  import { List } from 'java.util';

  interface ArmTarget extends Enum<ArmTarget> {}
  class ArmTarget extends Enum<ArmTarget> {
    static readonly LEFT: ArmTarget;
    static readonly RIGHT: ArmTarget;
    static readonly BOTH: ArmTarget;
    static readonly NONE: ArmTarget;
    hasArm(arm: HumanoidArm): boolean;
    static valueOf(name: string): ArmTarget;
    static values(): ArmTarget[];
  }

}

declare module 'io.wispforest.accessories.api.components' {
  import { DataComponentType } from 'net.minecraft.core.component';
  import { Endec } from 'io.wispforest.endec';
  import { List, Map } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Integer } from 'java.lang';
  import { SlotStateChange } from 'io.wispforest.accessories.api.events';
  import { Accessory } from 'io.wispforest.accessories.api';
  import { SlotEntryReference, SlotReference } from 'io.wispforest.accessories.api.slot';

  class AccessoriesDataComponents {
    static readonly NESTED_ACCESSORIES: DataComponentType;
    static readonly RENDER_OVERRIDE: DataComponentType;
    static readonly RENDER_TRANSFORMATIONS: DataComponentType;
    static readonly SLOT_VALIDATION: DataComponentType;
    static readonly ATTRIBUTES: DataComponentType;
    static readonly STACK_SIZE: DataComponentType;
    static readonly CUSTOM_RENDERER: DataComponentType;
    static readonly ITEM_MODEL_OVERRIDE: DataComponentType;
    static init(): void;
  }


  class AccessoryNestContainerContents {
    static readonly EMPTY: AccessoryNestContainerContents;
    static readonly ENDEC: Endec;
    constructor(accessories: ItemStack[]);
    accessories(): ItemStack[];
    addStack(stack: ItemStack): AccessoryNestContainerContents;
    equals(obj: any): boolean;
    get map(): Map<ItemStack, Accessory>;
    getMap(slotReference: SlotReference): Map<SlotEntryReference, Accessory>;
    hashCode(): number;
    setStack(index: number, stack: ItemStack): AccessoryNestContainerContents;
    slotChanges(): Map<number, SlotStateChange>;
    toString(): string;
  }

}

declare module 'io.wispforest.accessories.api.components.AccessoryItemAttributeModifiers' {
  import { Holder } from 'net.minecraft.core';
  import { Attribute, AttributeModifier } from 'net.minecraft.world.entity.ai.attributes';
  import { AccessoryItemAttributeModifiers } from 'io.wispforest.accessories.api.components';

  class Builder {
    add(holder: Holder<Attribute>, attributeModifier: AttributeModifier, slotName: string, isStackable: boolean): Builder;
    addForAny(holder: Holder<Attribute>, attributeModifier: AttributeModifier, isStackable: boolean): Builder;
    addForSlot(holder: Holder<Attribute>, attributeModifier: AttributeModifier, slotName: string, isStackable: boolean): Builder;
    build(): AccessoryItemAttributeModifiers;
    isEmpty(): boolean;
    showInTooltip(value: boolean): Builder;
  }

}

declare module 'io.wispforest.accessories.api.components.AccessoryRenderTransformations' {
  import { List } from 'java.util';
  import { Transformation, ModelTarget } from 'io.wispforest.accessories.api.client';
  import { Vector3f, Quaternionf, AxisAngle4f, Matrix4f } from 'org.joml';
  import { AccessoryRenderTransformations } from 'io.wispforest.accessories.api.components';

  class Builder {
    transformations: List;
    build(): AccessoryRenderTransformations;
    build(disableDefaultTranslations: boolean): AccessoryRenderTransformations;
    matrix4f(matrix4f: Matrix4f): Builder;
    modelTarget(target: ModelTarget): Builder;
    rotation(rotation: Quaternionf): Builder;
    rotation(rotation: AxisAngle4f): Builder;
    scale(scale: Vector3f): Builder;
    transformations(...transformations: Transformation[]): Builder;
    transformations(transformations: Transformation[]): Builder;
    translation(translation: Vector3f): Builder;
  }

}

declare module 'io.wispforest.accessories.api.data' {
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { TagKey } from 'net.minecraft.tags';
  import { Item } from 'net.minecraft.world.item';
  import { EntityType } from 'net.minecraft.world.entity';
  import { Registry } from 'net.minecraft.core';

  class AccessoriesBaseData {
    static readonly ANKLET_SLOT: string;
    static readonly BACK_SLOT: string;
    static readonly BELT_SLOT: string;
    static readonly CAPE_SLOT: string;
    static readonly CHARM_SLOT: string;
    static readonly FACE_SLOT: string;
    static readonly HAND_SLOT: string;
    static readonly HAT_SLOT: string;
    static readonly NECKLACE_SLOT: string;
    static readonly RING_SLOT: string;
    static readonly SHOES_SLOT: string;
    static readonly WRIST_SLOT: string;
    static readonly MISC_GROUP: string;
    static readonly HEAD_GROUP: string;
    static readonly CHEST_GROUP: string;
    static readonly ARM_GROUP: string;
    static readonly LEG_GROUP: string;
    static readonly FEET_GROUP: string;
    static readonly UNSORTED_GROUP: string;
    static readonly ALL_PREDICATE_ID: ResourceLocation;
    static readonly NONE_PREDICATE_ID: ResourceLocation;
    static readonly TAG_PREDICATE_ID: ResourceLocation;
    static readonly RELEVANT_PREDICATE_ID: ResourceLocation;
    static readonly COMPONENT_PREDICATE_ID: ResourceLocation;
  }


  class AccessoriesTags {
    static readonly ANKLET_TAG: TagKey;
    static readonly BACK_TAG: TagKey;
    static readonly BELT_TAG: TagKey;
    static readonly CAPE_TAG: TagKey;
    static readonly CHARM_TAG: TagKey;
    static readonly FACE_TAG: TagKey;
    static readonly HAND_TAG: TagKey;
    static readonly HAT_TAG: TagKey;
    static readonly NECKLACE_TAG: TagKey;
    static readonly RING_TAG: TagKey;
    static readonly SHOES_TAG: TagKey;
    static readonly WRIST_TAG: TagKey;
    static readonly ALL_TAG: TagKey;
    static readonly ANY_TAG: TagKey;
    static readonly DEFAULTED_TARGETS_BINDING: TagKey;
    static readonly EQUIPMENT_MANAGEABLE: TagKey;
    static readonly MODIFIABLE_ENTITY_BLACKLIST: TagKey;
    static readonly MODIFIABLE_ENTITY_WHITELIST: TagKey;
    static readonly INVALID_FOR_REDIRECTION: TagKey;
    static entityTag(path: string): TagKey<EntityType<any>>;
    static itemTag(path: string): TagKey<Item>;
    static of<T>(key: ResourceKey<Registry<T>>, path: string): TagKey<T>;
  }

}

declare module 'io.wispforest.accessories.api.data.providers' {
  import { DataProvider, PackOutput, CachedOutput } from 'net.minecraft.data';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';
  import { PathProvider } from 'PackOutput';

  interface BaseDataProvider<O extends DataOutput = any> extends DataProvider {}
  class BaseDataProvider<O extends DataOutput = any> extends DataProvider {
    constructor(packOutput: PackOutput, completableFuture: CompletableFuture<Provider>);
    get name(): string;
    pathProvider(): PathProvider;
    run(cachedOutput: CachedOutput): CompletableFuture<any>;
  }

}

declare module 'io.wispforest.accessories.api.data.providers.BaseDataProvider' {
  import { Collection } from 'java.util';
  import { CompletableFuture } from 'java.util.concurrent';

  class DataOutput {
    futures(): Collection<CompletableFuture<any>>;
  }

}

declare module 'io.wispforest.accessories.api.data.providers.entity' {
  import { TagKey } from 'net.minecraft.tags';
  import { EntityType } from 'net.minecraft.world.entity';
  import { BaseDataProvider } from 'io.wispforest.accessories.api.data.providers';
  import { EntityBindingOutput } from 'io.wispforest.accessories.api.data.providers.entity.EntityBindingProvider';
  import { PackOutput } from 'net.minecraft.data';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Collection } from 'java.util';

  class EntityBindingBuilder {
    constructor(replace: boolean);
    create(): RawEntityBinding;
    entityType(...entityTypes: EntityType<any>[]): EntityBindingBuilder;
    slots(...slots: string[]): EntityBindingBuilder;
    tag(...tagKeys: TagKey<EntityType<any>>[]): EntityBindingBuilder;
  }


  interface EntityBindingProvider extends BaseDataProvider<EntityBindingOutput> {}
  class EntityBindingProvider extends BaseDataProvider<EntityBindingOutput> {
    constructor(packOutput: PackOutput, completableFuture: CompletableFuture<Provider>);
    accept(location: ResourceLocation, binding: RawEntityBinding): void;
    builder(): EntityBindingBuilder;
    futures(): Collection<CompletableFuture<any>>;
    get name(): string;
  }

}

declare module 'io.wispforest.accessories.api.data.providers.entity.EntityBindingProvider' {
  import { DataOutput } from 'io.wispforest.accessories.api.data.providers.BaseDataProvider';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RawEntityBinding } from 'io.wispforest.accessories.api.data.providers.entity';

  interface EntityBindingOutput extends DataOutput {}
  class EntityBindingOutput extends DataOutput {
    accept(var1: ResourceLocation, var2: RawEntityBinding): void;
  }

}

declare module 'io.wispforest.accessories.api.data.providers.group' {
  import { BaseDataProvider } from 'io.wispforest.accessories.api.data.providers';
  import { GroupOutput } from 'io.wispforest.accessories.api.data.providers.group.GroupDataProvider';
  import { PackOutput } from 'net.minecraft.data';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Collection } from 'java.util';
  import { Integer } from 'java.lang';

  interface GroupDataProvider extends BaseDataProvider<GroupOutput> {}
  class GroupDataProvider extends BaseDataProvider<GroupOutput> {
    constructor(packOutput: PackOutput, completableFuture: CompletableFuture<Provider>);
    accept(namespace: string, rawSlotType: RawSlotGroup): void;
    builder(uniqueLocation: ResourceLocation): SlotGroupBuilder;
    builder(groupName: string): SlotGroupBuilder;
    futures(): Collection<CompletableFuture<any>>;
    get name(): string;
  }


  class SlotGroupBuilder {
    constructor(name: string, replace: boolean);
    create(): RawSlotGroup;
    icon(value: ResourceLocation): SlotGroupBuilder;
    order(value: number): SlotGroupBuilder;
    slots(...slot: string[]): SlotGroupBuilder;
  }

}

declare module 'io.wispforest.accessories.api.data.providers.group.GroupDataProvider' {
  import { DataOutput } from 'io.wispforest.accessories.api.data.providers.BaseDataProvider';
  import { RawSlotGroup } from 'io.wispforest.accessories.api.data.providers.group';

  interface GroupOutput extends DataOutput {}
  class GroupOutput extends DataOutput {
    accept(var1: string, var2: RawSlotGroup): void;
  }

}

declare module 'io.wispforest.accessories.api.data.providers.slot' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Integer } from 'java.lang';
  import { DropRule } from 'io.wispforest.accessories.api';
  import { BaseDataProvider } from 'io.wispforest.accessories.api.data.providers';
  import { SlotOutput } from 'io.wispforest.accessories.api.data.providers.slot.SlotDataProvider';
  import { PackOutput } from 'net.minecraft.data';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';
  import { Collection } from 'java.util';

  class SlotBuilder {
    constructor(name: string, replace: boolean);
    addAmount(value: number): SlotBuilder;
    amount(value: number): SlotBuilder;
    create(): RawSlotType;
    dropRule(value: DropRule): SlotBuilder;
    icon(value: ResourceLocation): SlotBuilder;
    order(value: number): SlotBuilder;
    subtractAmount(value: number): SlotBuilder;
    validator(validator: ResourceLocation): SlotBuilder;
  }


  interface SlotDataProvider extends BaseDataProvider<SlotOutput> {}
  class SlotDataProvider extends BaseDataProvider<SlotOutput> {
    constructor(packOutput: PackOutput, completableFuture: CompletableFuture<Provider>);
    accept(namespace: string, rawSlotType: RawSlotType): void;
    builder(uniqueLocation: ResourceLocation): SlotBuilder;
    builder(slotName: string): SlotBuilder;
    futures(): Collection<CompletableFuture<any>>;
    get name(): string;
  }

}

declare module 'io.wispforest.accessories.api.data.providers.slot.SlotDataProvider' {
  import { DataOutput } from 'io.wispforest.accessories.api.data.providers.BaseDataProvider';
  import { RawSlotType } from 'io.wispforest.accessories.api.data.providers.slot';

  interface SlotOutput extends DataOutput {}
  class SlotOutput extends DataOutput {
    accept(var1: string, var2: RawSlotType): void;
  }

}

declare module 'io.wispforest.accessories.api.events' {
  import { Event } from 'net.fabricmc.fabric.api.event';
  import { ItemStack } from 'net.minecraft.world.item';
  import { SlotReference } from 'io.wispforest.accessories.api.slot';
  import { AccessoryAttributeBuilder } from 'io.wispforest.accessories.api.attributes';
  import { TriState } from 'net.fabricmc.fabric.api.util';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { Player } from 'net.minecraft.world.entity.player';
  import { AccessoriesCapability, AccessoriesContainer, DropRule } from 'io.wispforest.accessories.api';
  import { Map, List } from 'java.util';
  import { Boolean, Enum } from 'java.lang';
  import { DamageSource } from 'net.minecraft.world.damagesource';

  class AccessoryChangeCallback {
    static readonly EVENT: Event;
    onChange(var1: ItemStack, var2: ItemStack, var3: SlotReference, var4: SlotStateChange): void;
  }


  class AdjustAttributeModifierCallback {
    static readonly EVENT: Event;
    adjustAttributes(var1: ItemStack, var2: SlotReference, var3: AccessoryAttributeBuilder): void;
  }


  class AllowEntityModificationCallback {
    static readonly EVENT: Event;
    allowModifications(var1: LivingEntity, var2: Player, var3: SlotReference): TriState;
  }


  class CanEquipCallback {
    static readonly EVENT: Event;
    canEquip(var1: ItemStack, var2: SlotReference): TriState;
  }


  class CanUnequipCallback {
    static readonly EVENT: Event;
    canUnequip(var1: ItemStack, var2: SlotReference): TriState;
  }


  class ContainersChangeCallback {
    static readonly EVENT: Event;
    onChange(var1: LivingEntity, var2: AccessoriesCapability, var3: Map<AccessoriesContainer, boolean>): void;
  }


  class OnDeathCallback {
    static readonly EVENT: Event;
    shouldDrop(var1: TriState, var2: LivingEntity, var3: AccessoriesCapability, var4: DamageSource, var5: ItemStack[]): TriState;
  }


  class OnDropCallback {
    static readonly EVENT: Event;
    static getAlternativeRule(dropRule: DropRule, stack: ItemStack, reference: SlotReference, damageSource: DamageSource): DropRule;
    onDrop(var1: DropRule, var2: ItemStack, var3: SlotReference, var4: DamageSource): DropRule;
  }


  interface SlotStateChange extends Enum<SlotStateChange> {}
  class SlotStateChange extends Enum<SlotStateChange> {
    static readonly MUTATION: SlotStateChange;
    static readonly REPLACEMENT: SlotStateChange;
    static valueOf(name: string): SlotStateChange;
    static values(): SlotStateChange[];
  }

}

declare module 'io.wispforest.accessories.api.events.extra' {
  import { Event } from 'net.fabricmc.fabric.api.event';
  import { TriState } from 'net.fabricmc.fabric.api.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { SlotReference } from 'io.wispforest.accessories.api.slot';
  import { EnderMan } from 'net.minecraft.world.entity.monster';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { LootContext } from 'net.minecraft.world.level.storage.loot';
  import { DamageSource } from 'net.minecraft.world.damagesource';

  class AllowWalkingOnSnow {
    static readonly EVENT: Event;
    allowWalkingOnSnow(var1: ItemStack, var2: SlotReference): TriState;
  }


  class EndermanMasked {
    static readonly EVENT: Event;
    isEndermanMasked(var1: EnderMan, var2: ItemStack, var3: SlotReference): TriState;
  }


  class ExtraEventHandler {
    static allowWalkingOnSnow(entity: LivingEntity): TriState;
    static canFreezeEntity(entity: LivingEntity): TriState;
    static fortuneAdjustment(context: LootContext, currentLevel: number): number;
    static isEndermanMask(entity: LivingEntity, enderMan: EnderMan): TriState;
    static isPiglinsNeutral(entity: LivingEntity): TriState;
    static lootingAdjustments(entity: LivingEntity, context: LootContext, currentLevel: number): number;
  }


  class FortuneAdjustment {
    static readonly EVENT: Event;
    getFortuneAdjustment(var1: ItemStack, var2: SlotReference, var3: LootContext, var4: number): number;
  }


  class LootingAdjustment {
    static readonly EVENT: Event;
    getLootingAdjustment(var1: ItemStack, var2: SlotReference, var3: LivingEntity, var4: DamageSource, var5: number): number;
  }


  class PiglinNeutralInducer {
    static readonly EVENT: Event;
    makePiglinsNeutral(var1: ItemStack, var2: SlotReference): TriState;
  }


  class ShouldFreezeEntity {
    static readonly EVENT: Event;
    shouldFreeze(var1: ItemStack, var2: SlotReference): TriState;
  }

}

declare module 'io.wispforest.accessories.api.events.extra.v2' {
  import { Event } from 'net.fabricmc.fabric.api.event';
  import { ItemStack } from 'net.minecraft.world.item';
  import { SlotReference } from 'io.wispforest.accessories.api.slot';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { LootContext } from 'net.minecraft.world.level.storage.loot';
  import { DamageSource } from 'net.minecraft.world.damagesource';

  class LootingAdjustment {
    static readonly EVENT: Event;
    getLootingAdjustment(var1: ItemStack, var2: SlotReference, var3: LivingEntity, var4: LootContext, var5: DamageSource, var6: number): number;
  }

}

declare module 'io.wispforest.accessories.api.menu' {
  import { Slot } from 'net.minecraft.world.inventory';
  import { SlotTypeAccessible } from 'io.wispforest.accessories.menu';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { AccessoriesContainer } from 'io.wispforest.accessories.api';
  import { ExpandedSimpleContainer } from 'io.wispforest.accessories.impl';
  import { SlotType, SlotTypeReference } from 'io.wispforest.accessories.api.slot';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { Pair } from 'com.mojang.datafixers.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Consumer } from 'java.util.function';

  interface AccessoriesBasedSlot extends SlotTypeAccessible, Slot {}
  class AccessoriesBasedSlot extends SlotTypeAccessible {
    readonly entity: LivingEntity;
    readonly accessoriesContainer: AccessoriesContainer;
    constructor(accessoriesContainer: AccessoriesContainer, container: ExpandedSimpleContainer, slot: number, x: number, y: number);
    get container(): AccessoriesContainer;
    get maxStackSize(): number;
    get noItemIcon(): Pair<ResourceLocation, ResourceLocation>;
    get tooltipData(): Component[];
    getMaxStackSize(stack: ItemStack): number;
    mayPickup(player: Player): boolean;
    mayPlace(stack: ItemStack): boolean;
    static of(livingEntity: LivingEntity, slotType: SlotType, x: number, y: number): AccessoriesBasedSlot;
    static of(livingEntity: LivingEntity, slotType: SlotType, slot: number, x: number, y: number): AccessoriesBasedSlot;
    set(stack: ItemStack): void;
    setByPlayer(newStack: ItemStack, oldStack: ItemStack): void;
    slotName(): string;
    slotType(): SlotType;
  }


  class AccessoriesSlotGenerator {
    adjustTypes(...references: SlotTypeReference[]): AccessoriesSlotGenerator;
    adjustTypes(...slotTypes: SlotType[]): AccessoriesSlotGenerator;
    adjustTypes(slotTypes: SlotType[]): AccessoriesSlotGenerator;
    column(): number;
    horizontalPadding(value: number): AccessoriesSlotGenerator;
    moveX(x: number): AccessoriesSlotGenerator;
    moveY(y: number): AccessoriesSlotGenerator;
    static of(slotConsumer: Consumer<Slot>, startX: number, startY: number, livingEntity: LivingEntity, ...references: SlotTypeReference[]): AccessoriesSlotGenerator;
    static of(slotConsumer: Consumer<Slot>, startX: number, startY: number, livingEntity: LivingEntity, ...slotTypes: SlotType[]): AccessoriesSlotGenerator;
    static of(slotConsumer: Consumer<Slot>, startX: number, startY: number, livingEntity: LivingEntity): AccessoriesSlotGenerator;
    padding(value: number): AccessoriesSlotGenerator;
    row(): number;
    setX(x: number): AccessoriesSlotGenerator;
    setY(y: number): AccessoriesSlotGenerator;
    verticalPadding(value: number): AccessoriesSlotGenerator;
  }

}

declare module 'io.wispforest.accessories.api.menu.AccessoriesSlotGenerator' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface LayoutType extends Enum<LayoutType> {}
  class LayoutType extends Enum<LayoutType> {
    static readonly COLUMN: LayoutType;
    static readonly ROW: LayoutType;
    static valueOf(name: string): LayoutType;
    static values(): LayoutType[];
  }

}

declare module 'io.wispforest.accessories.api.slot' {
  import { TriState } from 'net.fabricmc.fabric.api.util';
  import { Level } from 'net.minecraft.world.level';
  import { LivingEntity, EntityType } from 'net.minecraft.world.entity';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { Predicate } from 'java.util.function';
  import { Class, Comparable, Integer } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Set, List, Collection, Map } from 'java.util';
  import { AccessoriesCapability, AccessoriesContainer, DropRule } from 'io.wispforest.accessories.api';
  import { Endec } from 'io.wispforest.endec';
  import { ByteBuf } from 'io.netty.buffer';
  import { Event } from 'net.fabricmc.fabric.api.event';
  import { TriFunction } from 'org.apache.commons.lang3.function';
  import { UniqueSlotBuilder } from 'io.wispforest.accessories.api.slot.UniqueSlotHandling';

  interface EntityBasedPredicate extends SlotBasedPredicate {}
  class EntityBasedPredicate extends SlotBasedPredicate {
    isValid(var1: Level, var2: LivingEntity, var3: SlotType, var4: number, var5: ItemStack): TriState;
    isValid(level: Level, slotType: SlotType, slot: number, stack: ItemStack): TriState;
  }


  class SlotBasedPredicate {
    isValid(var1: Level, var2: SlotType, var3: number, var4: ItemStack): TriState;
    static ofClass<T>(clazz: Class<T>): SlotBasedPredicate;
    static ofItem(predicate: Predicate<Item>): SlotBasedPredicate;
    static withEntity(entityBasedPredicate: EntityBasedPredicate): SlotBasedPredicate;
  }


  interface SlotGroup extends Comparable<SlotGroup> {}
  class SlotGroup extends Comparable<SlotGroup> {
    static readonly UNKNOWN: ResourceLocation;
    compareTo(o: SlotGroup): number;
    icon(): ResourceLocation;
    order(): number;
    slots(): Set<string>;
    translation(): string;
  }


  class SlotReference {
    capability(): AccessoriesCapability;
    createSlotPath(): string;
    entity(): LivingEntity;
    get stack(): ItemStack;
    isValid(): boolean;
    static of(livingEntity: LivingEntity, slotName: string, slot: number): SlotReference;
    static ofNest(livingEntity: LivingEntity, slotName: string, initialHolderSlot: number, innerSlotIndices: number[]): SlotReference;
    set stack(stack: ItemStack);
    slot(): number;
    slotContainer(): AccessoriesContainer;
    slotName(): string;
    type(): SlotType;
  }


  class SlotReferenceEncoding {
    static readonly ENDEC: Endec;
    static decodeReference(byteBuf: ByteBuf, level: Level): SlotReference;
    static encodeReference(byteBuf: ByteBuf, slotReference: SlotReference): ByteBuf;
  }


  interface SlotType extends Comparable<SlotType> {}
  class SlotType extends Comparable<SlotType> {
    static readonly EMPTY_SLOT_ICON: ResourceLocation;
    amount(): number;
    compareTo(o: SlotType): number;
    dropRule(): DropRule;
    icon(): ResourceLocation;
    order(): number;
    translation(): string;
    validators(): Set<ResourceLocation>;
  }


  class UniqueSlotHandling {
    static readonly EVENT: Event;
    static addGroup(group: string): void;
    allowEquipFromUse(value: boolean): UniqueSlotBuilder;
    allowResizing(value: boolean): UniqueSlotBuilder;
    allowTooltipInfo(value: boolean): UniqueSlotBuilder;
    build(): SlotTypeReference;
    static buildClientSlotReferences(): void;
    static gatherUniqueSlots(slotRegistration: TriFunction<ResourceLocation, number, Collection<ResourceLocation>, SlotTypeReference>): void;
    static get slotToEntities(): Map<string, Set<EntityType<any>>>;
    static getGroups(isClient: boolean): Set<string>;
    static isUniqueGroup(group: string, isClient: boolean): boolean;
    static isUniqueSlot(slotType: string): boolean;
    static setClientGroups(set: Collection<string>): void;
    slotPredicates(...locations: ResourceLocation[]): UniqueSlotBuilder;
    strictMode(value: boolean): UniqueSlotBuilder;
    validTypes(...types: EntityType<any>[]): UniqueSlotBuilder;
  }

}

declare module 'io.wispforest.accessories.api.slot.UniqueSlotHandling' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { EntityType } from 'net.minecraft.world.entity';
  import { SlotTypeReference } from 'io.wispforest.accessories.api.slot';

  class UniqueSlotBuilderFactory {
    create(var1: ResourceLocation, var2: number): UniqueSlotBuilder;
  }


  class RegistrationCallback {
    registerSlots(var1: UniqueSlotBuilderFactory): void;
  }


  class UniqueSlotBuilder {
    allowEquipFromUse(var1: boolean): UniqueSlotBuilder;
    allowResizing(var1: boolean): UniqueSlotBuilder;
    allowTooltipInfo(var1: boolean): UniqueSlotBuilder;
    build(): SlotTypeReference;
    slotPredicates(...var1: ResourceLocation[]): UniqueSlotBuilder;
    strictMode(var1: boolean): UniqueSlotBuilder;
    validTypes(...var1: EntityType<any>[]): UniqueSlotBuilder;
  }

}

declare module 'io.wispforest.accessories.client' {
  import { KeyMapping } from 'net.minecraft.client';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ShaderInstance, MultiBufferSource } from 'net.minecraft.client.renderer';
  import { GlProgram } from 'io.wispforest.owo.shader';
  import { Event } from 'net.fabricmc.fabric.api.event';
  import { RenderLayer } from 'net.minecraft.client.renderer.entity.layers';
  import { RenderLayerParent } from 'net.minecraft.client.renderer.entity';
  import { PoseStack, BufferBuilder, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { Entity } from 'net.minecraft.world.entity';
  import { ItemStack } from 'net.minecraft.world.item';
  import { AccessoryRenderer } from 'io.wispforest.accessories.api.client';
  import { Throwable, Runnable } from 'java.lang';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { TriConsumer, BiConsumer } from 'org.apache.logging.log4j.util';
  import { Vector4f, Vector3d } from 'org.joml';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { OwoUIDrawContext } from 'io.wispforest.owo.ui.core';
  import { RenderTarget } from 'com.mojang.blaze3d.pipeline';

  class AccessoriesClient {
    static OPEN_SCREEN: KeyMapping;
    static readonly BLIT_SHADER_ID: ResourceLocation;
    static BLIT_SHADER: ShaderInstance;
    static SPECTRUM_PROGRAM: GlProgram;
    static readonly WINDOW_RESIZE_CALLBACK_EVENT: Event;
    static IS_PLAYER_INVISIBLE: boolean;
    static attemptToOpenScreen(): boolean;
    static attemptToOpenScreen(targetingLookingEntity: boolean): boolean;
    static init(): void;
    static initConfigStuff(): void;
    static initLayer(): void;
    static initalConfigDataSync(): void;
  }


  interface AccessoriesRenderLayer<T extends LivingEntity = any, M extends EntityModel<T> = any> extends RenderLayer<T, M> {}
  class AccessoriesRenderLayer<T extends LivingEntity = any, M extends EntityModel<T> = any> extends RenderLayer<T, M> {
    constructor(renderLayerParent: RenderLayerParent<T, M>);
    render(poseStack: PoseStack, multiBufferSource: MultiBufferSource, light: number, entity: T, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  class AccessoryRendererErrorCache {
    static logIfTimeAllotted(entity: Entity, stack: ItemStack, renderer: AccessoryRenderer, e: Throwable): void;
  }


  class ClientDelayedCache<K = any> {
    constructor();

    constructor(maxAmount: number);
    hasAllottedTime(key: K, totalAmountSecs: number): boolean;
    runIfTimeHasAllotted(key: K, totalAmountSecs: number, runnable: Runnable): void;
  }


  class ClientLifecycleEvents {
    static readonly END_DATA_PACK_RELOAD: Event;
  }


  class GuiGraphicsUtils {
    static batched<T>(guiGraphics: GuiGraphics, location: ResourceLocation, list: T[], consumer: TriConsumer<BufferBuilder, PoseStack, T>): void;
    static batched(guiGraphics: GuiGraphics, location: ResourceLocation, consumer: BiConsumer<BufferBuilder, PoseStack>): void;
    static blit(bufferBuilder: BufferBuilder, poseStack: PoseStack, x: number, y: number, size: number): void;
    static blit(bufferBuilder: BufferBuilder, poseStack: PoseStack, x1: number, y1: number, blitOffset: number, uOffset: number, vOffset: number, width: number, height: number, textureWidth: number, textureHeight: number): void;
    static blitSpriteBatched(guiGraphics: GuiGraphics, sprite: ResourceLocation, x: number, y: number, width: number, height: number): void;
    static blitSpriteBatched(guiGraphics: GuiGraphics, sprite: ResourceLocation, x: number, y: number, blitOffset: number, width: number, height: number): void;
    static blitWithAlpha(ctx: GuiGraphics, atlasLocation: ResourceLocation, x: number, y: number, uOffset: number, vOffset: number, width: number, height: number, textureWidth: number, textureHeight: number, alphaValues: Vector4f): void;
    static blitWithColor(ctx: GuiGraphics, atlasLocation: ResourceLocation, x: number, y: number, uOffset: number, vOffset: number, width: number, height: number, textureWidth: number, textureHeight: number, red: number, green: number, blue: number, alpha: number): void;
    static drawRectOutlineWithSpectrum(ctx: OwoUIDrawContext, x: number, y: number, z: number, width: number, height: number, alpha: number, vertical: boolean): void;
    static drawRectOutlineWithSpectrumWithoutRecord(ctx: OwoUIDrawContext, x: number, y: number, z: number, width: number, height: number, alpha: number, vertical: boolean): void;
    static drawWithSpectrum(ctx: GuiGraphics, x: number, y: number, blitOffset: number, width: number, height: number, sprite: TextureAtlasSprite, alpha: number): void;
    static drawWithSpectrum(ctx: GuiGraphics, x: number, y: number, blitOffset: number, width: number, height: number, sprite: TextureAtlasSprite, alphaValues: Vector4f): void;
  }


  interface MPOATVConstructingVertexConsumer extends VertexConsumer {}
  class MPOATVConstructingVertexConsumer extends VertexConsumer {
    addVertex(x: number, y: number, z: number): VertexConsumer;
    meanPos(): Vector3d;
    setColor(i: number, j: number, k: number, l: number): VertexConsumer;
    setNormal(f: number, g: number, h: number): VertexConsumer;
    setUv(f: number, g: number): VertexConsumer;
    setUv1(i: number, j: number): VertexConsumer;
    setUv2(i: number, j: number): VertexConsumer;
  }


  class PostEffectBuffer {
    beginWrite(clear: boolean, blitFromMain: number): void;
    buffer(): RenderTarget;
    clear(): void;
    draw(blend: boolean): void;
    draw(color: number[]): void;
    endWrite(): void;
  }

}

declare module 'io.wispforest.accessories.client.AccessoriesClient' {
  import { Minecraft } from 'net.minecraft.client';
  import { Window } from 'com.mojang.blaze3d.platform';

  class WindowResizeCallback {
    onResized(var1: Minecraft, var2: Window): void;
  }

}

declare module 'io.wispforest.accessories.client.ClientLifecycleEvents' {
  import { Minecraft } from 'net.minecraft.client';

  class EndDataPackReload {
    endDataPackReload(var1: Minecraft, var2: boolean): void;
  }

}

declare module 'io.wispforest.accessories.client.gui' {
  import { Event } from 'net.fabricmc.fabric.api.event';
  import { AdjustRendering } from 'io.wispforest.accessories.client.gui.ButtonEvents';
  import { AbstractButton, WidgetSprites, Button } from 'net.minecraft.client.gui.components';
  import { BaseOwoHandledScreen, BaseOwoScreen } from 'io.wispforest.owo.ui.base';
  import { FlowLayout } from 'io.wispforest.owo.ui.container';
  import { AccessoriesExperimentalMenu, AccessoriesMenu } from 'io.wispforest.accessories.menu.variants';
  import { ContainerScreenExtension } from 'io.wispforest.accessories.pond';
  import { Surface, Component, OwoUIDrawContext } from 'io.wispforest.owo.ui.core';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Stream } from 'java.util.stream';
  import { Class, Boolean } from 'java.lang';
  import { Slot } from 'net.minecraft.world.inventory';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ExtendedSlotComponent } from 'io.wispforest.accessories.client.gui.AccessoriesExperimentalScreen';
  import { Consumer } from 'java.util.function';
  import { MutableBoolean } from 'org.apache.commons.lang3.mutable';
  import { AbstractContainerScreen, MenuAccess } from 'net.minecraft.client.gui.screens.inventory';
  import { Component as net_minecraft_network_chat_Component } from 'net.minecraft.network.chat';
  import { Map, List } from 'java.util';
  import { Vector4i } from 'org.joml';
  import { AccessoriesMenuVariant } from 'io.wispforest.accessories.menu';
  import { AccessoriesBasedSlot } from 'io.wispforest.accessories.api.menu';
  import { Builder } from 'io.wispforest.accessories.client.gui.ToggleButton';
  import { OnPress } from 'Button';

  class AbstractButtonExtension {
    adjustRendering<B extends AbstractButton>(event: AdjustRendering): B;
    get renderingEvent(): Event<AdjustRendering>;
  }


  interface AccessoriesExperimentalScreen extends AccessoriesScreenBase<AccessoriesExperimentalMenu>, ContainerScreenExtension, BaseOwoHandledScreen<FlowLayout, AccessoriesExperimentalMenu> {}
  class AccessoriesExperimentalScreen extends AccessoriesScreenBase<AccessoriesExperimentalMenu> {
    readonly FULL_SLOT_RENDERING: Surface;
    constructor(handler: AccessoriesExperimentalMenu, inventory: Inventory, title: Component);
    component<C extends Component>(expectedClass: Class<C>, id: string): C;
    componentsForExclusionAreas(): Stream<Component>;
    disableSlot(slot: Slot): void;
    disableSlots(...index: number[]): void;
    enableSlot(slot: Slot): void;
    get hoveredSlot(): Slot;
    hideSlot(index: number): void;
    hideSlot(slot: Slot): void;
    hoverStackOffset(): number;
    isGroupFiltersOpen(): boolean;
    isHovering_Logical(slot: Slot, mouseX: number, mouseY: number): boolean;
    isHovering_Rendering(slot: Slot, mouseX: number, mouseY: number): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mainWidgetPosition(): boolean;
    onClose(): void;
    onHolderChange(key: string): void;
    rebuildAccessoriesComponent(): void;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    static safeBatching(context: OwoUIDrawContext, drawCallback: Consumer<MutableBoolean>): void;
    shouldRenderSlot(slot: Slot): boolean;
    showCosmeticState(value: boolean): void;
    showCosmeticState(): boolean;
    showCraftingGrid(): boolean;
    showCraftingGrid(value: boolean): void;
    showGroupFilters(): boolean;
    slotAsComponent(index: number): ExtendedSlotComponent;
    swapOrCreateSideBarComponent(): void;
    targetEntityDefaulted(): LivingEntity;
  }


  interface AccessoriesScreen extends ContainerScreenExtension, AccessoriesScreenBase<AccessoriesMenu>, AbstractContainerScreen<AccessoriesMenu> {}
  class AccessoriesScreen extends ContainerScreenExtension {
    static readonly SPRITES_8X8: WidgetSprites;
    constructor(menu: AccessoriesMenu, inventory: Inventory, component: net_minecraft_network_chat_Component);
    get hoveredSlot(): Slot;
    get panelHeight(): number;
    get panelWidth(): number;
    get startingPanelX(): number;
    getPanelHeight(upperPadding: number): number;
    isHovering_Logical(slot: Slot, mouseX: number, mouseY: number): boolean;
    leftPos(): number;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrollX: number, scrollY: number): boolean;
    onHolderChange(key: string): void;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    static tabPageCount(): number;
    targetEntityDefaulted(): LivingEntity;
    topPos(): number;
    updateAccessoryToggleButtons(): void;
    updateCosmeticToggleButton(): void;
    updateLinesButton(): void;
    updateUnusedSlotToggleButton(): void;
  }


  interface AccessoriesScreenBase<M extends AccessoriesMenuBase = any> extends MenuAccess<M> {}
  class AccessoriesScreenBase<M extends AccessoriesMenuBase = any> extends MenuAccess<M> {
    static readonly IS_RENDERING_UI_ENTITY: MutableBoolean;
    static readonly IS_RENDERING_LINE_TARGET: MutableBoolean;
    static readonly COLLECT_ACCESSORY_POSITIONS: MutableBoolean;
    static readonly FORCE_TOOLTIP_LEFT: MutableBoolean;
    static readonly NOT_VERY_NICE_POSITIONS: Map;
    static readonly ACCESSORY_LINES: List;
    static readonly ACCESSORY_POSITIONS: List;
    static readonly SCISSOR_BOX: Vector4i;
    get hoveredSlot(): Slot;
    onHolderChange(var1: string): void;
    switchToBaseInventory(): void;
    targetEntityDefaulted(): LivingEntity;
    static togglePositionCollection(): void;
  }


  class ButtonEvents {
    static adjustRendering<B extends AbstractButton>(button: B, event: AdjustRendering): B;
  }


  interface ScreenVariantSelectionScreen extends BaseOwoScreen<FlowLayout> {}
  class ScreenVariantSelectionScreen extends BaseOwoScreen<FlowLayout> {
    constructor(variantConsumer: Consumer<AccessoriesMenuVariant>);
  }


  interface ToggleButton extends Button {}
  class ToggleButton extends Button {
    static ofSlot(x: number, y: number, z: number, slot: AccessoriesBasedSlot): ToggleButton;
    onPress(): void;
    static toggleBuilder(message: net_minecraft_network_chat_Component, onPress: OnPress): Builder;
    toggled(value: boolean): ToggleButton;
    toggled(): boolean;
  }

}

declare module 'io.wispforest.accessories.client.gui.AccessoriesExperimentalScreen' {
  import { SlotComponent } from 'BaseOwoHandledScreen';
  import { Slot } from 'net.minecraft.world.inventory';
  import { DismountReason } from 'Component';
  import { OwoUIDrawContext } from 'io.wispforest.owo.ui.core';
  import { Supplier } from 'java.util.function';

  interface ExtendedSlotComponent extends SlotComponent {}
  class ExtendedSlotComponent extends SlotComponent {
    dismount(reason: DismountReason): void;
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    drawTooltip(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    isBatched(): boolean;
    isBatched(value: boolean): ExtendedSlotComponent;
    renderCosmeticOverlay(context: OwoUIDrawContext, externalBatching: boolean): void;
    renderHover(context: OwoUIDrawContext, hoverSlot: Supplier<Slot>): void;
    renderSlot(context: OwoUIDrawContext): void;
    slot(): Slot;
  }

}

declare module 'io.wispforest.accessories.client.gui.ButtonEvents' {
  import { AbstractButton } from 'net.minecraft.client.gui.components';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ResourceLocation } from 'net.minecraft.resources';

  class AdjustRendering {
    render(var1: AbstractButton, var2: GuiGraphics, var3: ResourceLocation, var4: number, var5: number, var6: number, var7: number): boolean;
  }

}

declare module 'io.wispforest.accessories.client.gui.components' {
  import { ParentComponent, OwoUIDrawContext, PositionedRectangle, AnimatableProperty, Surface, Component, Sizing, Size, Insets } from 'io.wispforest.owo.ui.core';
  import { Boolean, Class, Integer, Runnable, Double } from 'java.lang';
  import { Slot } from 'net.minecraft.world.inventory';
  import { BaseComponent } from 'io.wispforest.owo.ui.base';
  import { Direction } from 'io.wispforest.accessories.client.gui.components.ArrowComponent';
  import { Scrollbar, ScrollDirection } from 'ScrollContainer';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Renderer } from 'ButtonComponent';
  import { Consumer, Function, Supplier } from 'java.util.function';
  import { Pair } from 'it.unimi.dsi.fastutil';
  import { ExtendedSlotComponent } from 'io.wispforest.accessories.client.gui.AccessoriesExperimentalScreen';
  import { ButtonComponent, EntityComponent } from 'io.wispforest.owo.ui.component';
  import { AccessoriesExperimentalScreen } from 'io.wispforest.accessories.client.gui';
  import { SlotGroup } from 'io.wispforest.accessories.api.slot';
  import { Component as net_minecraft_network_chat_Component } from 'net.minecraft.network.chat';
  import { SlotComponent } from 'BaseOwoHandledScreen';
  import { CollapsibleContainer, ScrollContainer, FlowLayout } from 'io.wispforest.owo.ui.container';
  import { TriConsumer } from 'org.apache.logging.log4j.util';
  import { EntityType, Entity } from 'net.minecraft.world.entity';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface AccessoriesContainingComponent extends ParentComponent {}
  class AccessoriesContainingComponent extends ParentComponent {
    static defaultID(): string;
    isHovering_Logical(slot: Slot, mouseX: number, mouseY: number): boolean;
    onCosmeticToggle(var1: boolean): void;
    setupID(): void;
  }


  interface ArrowComponent extends BaseComponent {}
  class ArrowComponent extends BaseComponent {
    constructor(direction: Direction);
    blend(blend: boolean): ArrowComponent;
    blend(): boolean;
    centered(value: boolean): ArrowComponent;
    changeDirection(direction: Direction): ArrowComponent;
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    resetVisibleArea(): ArrowComponent;
    update(delta: number, mouseX: number, mouseY: number): void;
    visibleArea(visibleArea: PositionedRectangle): ArrowComponent;
    visibleArea(): AnimatableProperty<PositionedRectangle>;
  }


  class ComponentUtils {
    static readonly BACKGROUND_SLOT_RENDERING_SURFACE: Surface;
    static readonly VANILLA: Scrollbar;
    static readonly PANEL_INSET: Surface;
    static readonly PANEL: Surface;
    static checkMode<T>(lightMode: T, darkMode: T): T;
    static createCraftingComponent<C extends SlotComponent>(start: number, end: number, componentFactory: Function<number, C>, slotEnabler: Consumer<number>, isVertical: boolean): Component;
    static createPlayerInv<C extends SlotComponent>(start: number, end: number, componentFactory: Function<number, C>, slotEnabler: Consumer<number>): Component;
    static get buttonRenderer(): Renderer;
    static get insetPanelSurface(): Surface;
    static get panelSurface(): Surface;
    static get scrollbarRenderer(): Scrollbar;
    static get slotTexture(): ResourceLocation;
    static getPanelWithInset(insetWidth: number): Surface;
    static getScrollabarTexture(direction: ScrollDirection, active: boolean): ResourceLocation;
    static groupToggleBtn(screen: AccessoriesExperimentalScreen, group: SlotGroup): ButtonComponent;
    static recursiveSearch<C extends Component>(parentComponent: ParentComponent, target: Class<C>, action: Consumer<C>): void;
    static slotAndToggle<S extends Slot>(slot: S, slotBuilder: Function<number, ExtendedSlotComponent>): Pair<Component, PositionedRectangle>;
    static slotAndToggle<S extends Slot>(slot: S, isBatched: boolean, slotBuilder: Function<number, ExtendedSlotComponent>): Pair<Component, PositionedRectangle>;
    static slotToggleBtn<S extends Slot>(slot: S): ButtonComponent;
    static toggleBtn(message: net_minecraft_network_chat_Component, stateSupplier: Supplier<boolean>, onToggle: Consumer<ButtonComponent>): ButtonComponent;
    static toggleBtn(message: net_minecraft_network_chat_Component, stateSupplier: Supplier<boolean>, onToggle: Consumer<ButtonComponent>, extraRendering: Renderer): ButtonComponent;
  }


  interface ExtendedCollapsibleContainer extends CollapsibleContainer {}
  class ExtendedCollapsibleContainer extends CollapsibleContainer {
    constructor(horizontalSizing: Sizing, verticalSizing: Sizing, expanded: boolean);
  }


  interface ExtendedScrollContainer<C extends Component = any> extends ScrollContainer<C> {}
  class ExtendedScrollContainer<C extends Component = any> extends ScrollContainer<C> {
    scrollToAfterLayout: Runnable;
    constructor(direction: ScrollDirection, horizontalSizing: Sizing, verticalSizing: Sizing, child: C);
    currentScrollOffset(): number;
    customClippingInsets(insets: Insets): ExtendedScrollContainer<C>;
    get progress(): number;
    layout(space: Size): void;
    onMouseScroll(mouseX: number, mouseY: number, amount: number): boolean;
    oppositeScrollbar(value: boolean): ExtendedScrollContainer<C>;
    oppositeScrollbar(): boolean;
    scrollTo(scrollOffset: number): ExtendedScrollContainer<C>;
    scrollToAfterLayout(progress: number): ExtendedScrollContainer<C>;
    scrolledToCallback(consumer: TriConsumer<ExtendedScrollContainer<any>, number, number>): ExtendedScrollContainer<C>;
    strictMouseScrolling(value: boolean): ExtendedScrollContainer<C>;
  }


  interface GriddedAccessoriesComponent extends AccessoriesContainingComponent, FlowLayout {}
  class GriddedAccessoriesComponent extends AccessoriesContainingComponent {
    build(minimumWidth: number, minimumHeight: number): void;
    static createOrNull(screen: AccessoriesExperimentalScreen): GriddedAccessoriesComponent;
    isHovering_Logical(slot: Slot, mouseX: number, mouseY: number): boolean;
    onCosmeticToggle(showCosmeticState: boolean): void;
    switchPage(nextPageIndex: number): void;
    switchPage(nextPageIndex: number, showCosmeticState: boolean): void;
  }


  interface InventoryEntityComponent<E extends Entity = any> extends EntityComponent<E> {}
  class InventoryEntityComponent<E extends Entity = any> extends EntityComponent<E> {
    xOffset: number;
    yOffset: number;
    constructor(sizing: Sizing, entity: E);

    constructor(sizing: Sizing, type: EntityType<E>, nbt: CompoundTag);
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    static of<E extends Entity>(verticalSizing: Sizing, horizontalSizing: Sizing, entity: E): InventoryEntityComponent<E>;
    onKeyPress(keyCode: number, scanCode: number, modifiers: number): boolean;
    onMouseScroll(mouseX: number, mouseY: number, amount: number): boolean;
    renderWrapping(renderWrapping: TriConsumer<OwoUIDrawContext, Component, Runnable>): InventoryEntityComponent<E>;
    scaleToFit(scaleToFit: boolean): InventoryEntityComponent<E>;
    scaleToFitHorizontally(scaleToFit: boolean): InventoryEntityComponent<E>;
    scaleToFitVertically(scaleToFit: boolean): InventoryEntityComponent<E>;
    startingRotation(value: number): InventoryEntityComponent<E>;
  }


  interface PixelPerfectTextureComponent extends BaseComponent {}
  class PixelPerfectTextureComponent extends BaseComponent {
    constructor(texture: ResourceLocation, textureWidth: number, textureHeight: number, horizontalSizing: Sizing, verticalSizing: Sizing);
    draw(context: OwoUIDrawContext, mouseX: number, mouseY: number, partialTicks: number, delta: number): void;
    static drawPixelPerfectTextureQuad(context: OwoUIDrawContext, texture: ResourceLocation, textureWidth: number, textureHeight: number, x1: number, y1: number, z: number, width: number, height: number): void;
  }


  interface ScrollableAccessoriesComponent extends AccessoriesContainingComponent, FlowLayout {}
  class ScrollableAccessoriesComponent extends AccessoriesContainingComponent {
    build(minimumWidth: number, minimumHeight: number, showScrollBar: boolean): void;
    static createOrNull(screen: AccessoriesExperimentalScreen): ScrollableAccessoriesComponent;
    isHovering_Logical(slot: Slot, mouseX: number, mouseY: number): boolean;
    onCosmeticToggle(showCosmeticState: boolean): void;
  }

}

declare module 'io.wispforest.accessories.client.gui.components.ArrowComponent' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Direction extends Enum<Direction> {}
  class Direction extends Enum<Direction> {
    static readonly RIGHT: Direction;
    static readonly LEFT: Direction;
    static readonly UP: Direction;
    static readonly DOWN: Direction;
    get xOffset(): number;
    get yOffset(): number;
    static valueOf(name: string): Direction;
    static values(): Direction[];
  }

}

declare module 'io.wispforest.accessories.client.gui.components.ComponentUtils' {
  import { CreativeModeTab } from 'net.minecraft.world.item';
  import { Event } from 'net.fabricmc.fabric.api.event';

  class OnCreativeTabChange {
    onTabChange(var1: CreativeModeTab): void;
  }


  class CreativeScreenExtension {
    get event(): Event<OnCreativeTabChange>;
    get tab(): CreativeModeTab;
  }

}

declare module 'io.wispforest.accessories.client.gui.components.InventoryEntityComponent' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ScaleFitType extends Enum<ScaleFitType> {}
  class ScaleFitType extends Enum<ScaleFitType> {
    static readonly VERTICAL: ScaleFitType;
    static readonly HORIZONTAL: ScaleFitType;
    static readonly BOTH: ScaleFitType;
    static readonly NONE: ScaleFitType;
    static valueOf(name: string): ScaleFitType;
    static values(): ScaleFitType[];
  }

}

declare module 'io.wispforest.accessories.client.gui.ToggleButton' {
  import { Component } from 'net.minecraft.network.chat';
  import { OnPress, CreateNarration } from 'Button';
  import { Consumer } from 'java.util.function';
  import { ToggleButton } from 'io.wispforest.accessories.client.gui';
  import { Tooltip } from 'net.minecraft.client.gui.components';

  class Builder {
    constructor(message: Component, onPress: OnPress);
    bounds(x: number, y: number, width: number, height: number): Builder;
    build(): ToggleButton;
    createNarration(createNarration: CreateNarration): Builder;
    onRender(consumer: Consumer<ToggleButton>): Builder;
    pos(x: number, y: number): Builder;
    size(width: number, height: number): Builder;
    tooltip(tooltip: Tooltip): Builder;
    width(width: number): Builder;
    zIndex(zIndex: number): Builder;
  }

}

declare module 'io.wispforest.accessories.client.gui.utils' {
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { Vector3f } from 'org.joml';
  import { BiConsumer } from 'java.util.function';
  import { List } from 'java.util';
  import { PositionedRectangle } from 'io.wispforest.owo.ui.core';

  class AbstractPolygon {
    drawPolygon(matrices: PoseStack, color: number): void;
    drawPolygon(var1: PoseStack, var2: number, var3: boolean, var4: boolean): void;
    get points(): Vector3f[];
    movePolygon(vec: Vector3f, action: BiConsumer<Vector3f, Vector3f>): void;
    withinShape(var1: number, var2: number): boolean;
  }


  interface ComponentAsPolygon extends AbstractPolygon {}
  class ComponentAsPolygon extends AbstractPolygon {
    readonly wrappedComponent: PositionedRectangle;
    constructor(component: PositionedRectangle);
    drawPolygon(matrices: PoseStack, color: number, showOutline: boolean, showBackground: boolean): void;
    drawPolygon(matrices: PoseStack, color: number): void;
    get points(): Vector3f[];
    withinShape(x: number, y: number): boolean;
  }

}

declare module 'io.wispforest.accessories.commands' {
  import { SimpleCommandExceptionType, Dynamic2CommandExceptionType, Dynamic3CommandExceptionType } from 'com.mojang.brigadier.exceptions';
  import { Logger } from 'org.slf4j';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { CommandContext } from 'com.mojang.brigadier.context';
  import { CommandSourceStack, CommandBuildContext } from 'net.minecraft.commands';
  import { CommandDispatcher, StringReader } from 'com.mojang.brigadier';
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { Holder, Registry } from 'net.minecraft.core';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { Function, Supplier } from 'java.util.function';
  import { Stream } from 'java.util.stream';
  import { Attribute } from 'net.minecraft.world.entity.ai.attributes';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Suggestions, SuggestionsBuilder } from 'com.mojang.brigadier.suggestion';
  import { Collection } from 'java.util';

  class AccessoriesCommands {
    static readonly NON_LIVING_ENTITY_TARGET: SimpleCommandExceptionType;
    static readonly INVALID_SLOT_TYPE: SimpleCommandExceptionType;
    static readonly LOGGER: Logger;
    static getOrThrowLivingEntity(ctx: CommandContext<CommandSourceStack>): LivingEntity;
    static registerCommandArgTypes(): void;
    static registerCommands(dispatcher: CommandDispatcher<CommandSourceStack>, context: CommandBuildContext): void;
  }


  interface ResourceExtendedArgument<T = any> extends ArgumentType<Holder> {}
  class ResourceExtendedArgument<T = any> extends ArgumentType<Holder> {
    static readonly ERROR_UNKNOWN_RESOURCE: Dynamic2CommandExceptionType;
    static readonly ERROR_INVALID_RESOURCE_TYPE: Dynamic3CommandExceptionType;
    constructor(context: CommandBuildContext, registryKey: ResourceKey<Registry<T>>, additionalLookup: Function<ResourceLocation, Holder<T>>, additionalSuggestions: Supplier<Stream<ResourceLocation>>);
    static attributes(context: CommandBuildContext): ResourceExtendedArgument<Attribute>;
    get examples(): Collection<string>;
    static getAttribute(commandContext: CommandContext<CommandSourceStack>, string: string): Holder<Attribute>;
    static getResource<T>(context: CommandContext<CommandSourceStack>, argument: string): Holder<T>;
    listSuggestions<S>(commandContext: CommandContext<S>, suggestionsBuilder: SuggestionsBuilder): CompletableFuture<Suggestions>;
    parse(builder: StringReader): Holder<T>;
    static resource<T>(context: CommandBuildContext, registryKey: ResourceKey<Registry<T>>, additionalLookup: Function<ResourceLocation, Holder<T>>, additionalSuggestions: Supplier<Stream<ResourceLocation>>): ResourceExtendedArgument<T>;
  }


  interface SlotArgumentType extends ArgumentType<string> {}
  class SlotArgumentType extends ArgumentType<string> {
    static readonly INSTANCE: SlotArgumentType;
    static getSlot(context: CommandContext<CommandSourceStack>, name: string): string;
    listSuggestions<S>(context: CommandContext<S>, builder: SuggestionsBuilder): CompletableFuture<Suggestions>;
    parse(reader: StringReader): string;
  }

}

declare module 'io.wispforest.accessories.compat.config' {
  import { ConfigWrapper } from 'io.wispforest.owo.config';
  import { Keys, ClientOptions, ScreenOptions_ } from 'io.wispforest.accessories.compat.config.AccessoriesConfig';
  import { Consumer } from 'java.util.function';
  import { Builder } from 'Jankson';
  import { List } from 'java.util';
  import { GeneralClientOptions, ScreenOptions } from 'io.wispforest.accessories.compat.config.AccessoriesConfigModel';
  import { TargetType } from 'io.wispforest.accessories.api.client';
  import { Enum } from 'java.lang';

  interface AccessoriesConfig extends ConfigWrapper<AccessoriesConfigModel> {}
  class AccessoriesConfig extends ConfigWrapper<AccessoriesConfigModel> {
    readonly keys: Keys;
    readonly clientOptions: ClientOptions;
    readonly screenOptions: ScreenOptions_;
    static createAndLoad(): AccessoriesConfig;
    static createAndLoad(janksonBuilder: Consumer<Builder>): AccessoriesConfig;
    modifiers(): SlotAmountModifier[];
    modifiers(value: SlotAmountModifier[]): void;
    useExperimentalCaching(): boolean;
    useExperimentalCaching(value: boolean): void;
  }


  class AccessoriesConfigModel {
    useExperimentalCaching: boolean;
    clientOptions: GeneralClientOptions;
    screenOptions: ScreenOptions;
    modifiers: List;
  }


  class RenderSlotTarget {
    slotType: string;
    targetType: TargetType;
  }


  interface ScreenType extends Enum<ScreenType> {}
  class ScreenType extends Enum<ScreenType> {
    static readonly NONE: ScreenType;
    static readonly ORIGINAL: ScreenType;
    static readonly EXPERIMENTAL_V1: ScreenType;
    isValid(): boolean;
    static valueOf(name: string): ScreenType;
    static values(): ScreenType[];
  }


  class SlotAmountModifier {
    slotType: string;
    amount: number;
  }

}

declare module 'io.wispforest.accessories.compat.config.AccessoriesConfig' {
  import { Key } from 'Option';
  import { PlayerEquipControl } from 'io.wispforest.accessories.impl';
  import { Consumer } from 'java.util.function';
  import { List } from 'java.util';
  import { RenderSlotTarget, ScreenType } from 'io.wispforest.accessories.compat.config';
  import { HoveredOptions_, UnHoveredOptions_ } from 'io.wispforest.accessories.compat.config.AccessoriesConfig.ScreenOptions_';
  import { Boolean } from 'java.lang';
  import { Vector2i } from 'org.joml';

  class Keys {
    readonly useExperimentalCaching: Key;
    readonly clientOptions_equipControl: Key;
    readonly clientOptions_forceNullRenderReplacement: Key;
    readonly clientOptions_disableEmptySlotScreenError: Key;
    readonly clientOptions_showCosmeticAccessories: Key;
    readonly clientOptions_disabledDefaultRenders: Key;
    readonly screenOptions_selectedScreenType: Key;
    readonly screenOptions_showUnusedSlots: Key;
    readonly screenOptions_allowSlotScrolling: Key;
    readonly screenOptions_inventoryButtonOffset: Key;
    readonly screenOptions_creativeInventoryButtonOffset: Key;
    readonly screenOptions_isDarkMode: Key;
    readonly screenOptions_showEquippedStackSlotType: Key;
    readonly screenOptions_entityLooksAtMouseCursor: Key;
    readonly screenOptions_allowSideBarCraftingGrid: Key;
    readonly screenOptions_showGroupTabs: Key;
    readonly screenOptions_hoveredOptions_brightenHovered: Key;
    readonly screenOptions_hoveredOptions_cycleBrightness: Key;
    readonly screenOptions_hoveredOptions_line: Key;
    readonly screenOptions_hoveredOptions_clickbait: Key;
    readonly screenOptions_unHoveredOptions_renderUnHovered: Key;
    readonly screenOptions_unHoveredOptions_darkenUnHovered: Key;
    readonly screenOptions_unHoveredOptions_darkenedBrightness: Key;
    readonly screenOptions_unHoveredOptions_darkenedOpacity: Key;
    readonly modifiers: Key;
  }


  interface ClientOptions extends GeneralClientOptions {}
  class ClientOptions extends GeneralClientOptions {
    disableEmptySlotScreenError(): boolean;
    disableEmptySlotScreenError(value: boolean): void;
    disabledDefaultRenders(): RenderSlotTarget[];
    disabledDefaultRenders(value: RenderSlotTarget[]): void;
    equipControl(): PlayerEquipControl;
    equipControl(value: PlayerEquipControl): void;
    forceNullRenderReplacement(): boolean;
    forceNullRenderReplacement(value: boolean): void;
    showCosmeticAccessories(): boolean;
    showCosmeticAccessories(value: boolean): void;
    subscribeToEquipControl(subscriber: Consumer<PlayerEquipControl>): void;
  }


  interface ScreenOptions_ extends ScreenOptions {}
  class ScreenOptions_ extends ScreenOptions {
    readonly hoveredOptions: HoveredOptions_;
    readonly unHoveredOptions: UnHoveredOptions_;
    allowSideBarCraftingGrid(): boolean;
    allowSideBarCraftingGrid(value: boolean): void;
    allowSlotScrolling(): boolean;
    allowSlotScrolling(value: boolean): void;
    creativeInventoryButtonOffset(): Vector2i;
    creativeInventoryButtonOffset(value: Vector2i): void;
    entityLooksAtMouseCursor(): boolean;
    entityLooksAtMouseCursor(value: boolean): void;
    inventoryButtonOffset(): Vector2i;
    inventoryButtonOffset(value: Vector2i): void;
    isDarkMode(): boolean;
    isDarkMode(value: boolean): void;
    selectedScreenType(): ScreenType;
    selectedScreenType(value: ScreenType): void;
    showEquippedStackSlotType(): boolean;
    showEquippedStackSlotType(value: boolean): void;
    showGroupTabs(): boolean;
    showGroupTabs(value: boolean): void;
    showUnusedSlots(): boolean;
    showUnusedSlots(value: boolean): void;
    subscribeToShowUnusedSlots(subscriber: Consumer<boolean>): void;
  }


  class UnHoveredOptions {
    darkenUnHovered(): boolean;
    darkenUnHovered(var1: boolean): void;
    darkenedBrightness(): number;
    darkenedBrightness(var1: number): void;
    darkenedOpacity(): number;
    darkenedOpacity(var1: number): void;
    renderUnHovered(): boolean;
    renderUnHovered(var1: boolean): void;
  }


  class HoveredOptions {
    brightenHovered(): boolean;
    brightenHovered(var1: boolean): void;
    clickbait(): boolean;
    clickbait(var1: boolean): void;
    cycleBrightness(): boolean;
    cycleBrightness(var1: boolean): void;
    line(): boolean;
    line(var1: boolean): void;
  }


  class ScreenOptions {
    allowSideBarCraftingGrid(): boolean;
    allowSideBarCraftingGrid(var1: boolean): void;
    allowSlotScrolling(): boolean;
    allowSlotScrolling(var1: boolean): void;
    creativeInventoryButtonOffset(): Vector2i;
    creativeInventoryButtonOffset(var1: Vector2i): void;
    entityLooksAtMouseCursor(): boolean;
    entityLooksAtMouseCursor(var1: boolean): void;
    inventoryButtonOffset(): Vector2i;
    inventoryButtonOffset(var1: Vector2i): void;
    isDarkMode(): boolean;
    isDarkMode(var1: boolean): void;
    selectedScreenType(): ScreenType;
    selectedScreenType(var1: ScreenType): void;
    showEquippedStackSlotType(): boolean;
    showEquippedStackSlotType(var1: boolean): void;
    showGroupTabs(): boolean;
    showGroupTabs(var1: boolean): void;
    showUnusedSlots(): boolean;
    showUnusedSlots(var1: boolean): void;
  }


  class GeneralClientOptions {
    disableEmptySlotScreenError(): boolean;
    disableEmptySlotScreenError(var1: boolean): void;
    disabledDefaultRenders(): RenderSlotTarget[];
    disabledDefaultRenders(var1: RenderSlotTarget[]): void;
    equipControl(): PlayerEquipControl;
    equipControl(var1: PlayerEquipControl): void;
    forceNullRenderReplacement(): boolean;
    forceNullRenderReplacement(var1: boolean): void;
    showCosmeticAccessories(): boolean;
    showCosmeticAccessories(var1: boolean): void;
  }

}

declare module 'io.wispforest.accessories.compat.config.AccessoriesConfig.ScreenOptions_' {
  import { HoveredOptions, UnHoveredOptions } from 'io.wispforest.accessories.compat.config.AccessoriesConfig';

  interface HoveredOptions_ extends HoveredOptions {}
  class HoveredOptions_ extends HoveredOptions {
    brightenHovered(): boolean;
    brightenHovered(value: boolean): void;
    clickbait(): boolean;
    clickbait(value: boolean): void;
    cycleBrightness(): boolean;
    cycleBrightness(value: boolean): void;
    line(): boolean;
    line(value: boolean): void;
  }


  interface UnHoveredOptions_ extends UnHoveredOptions {}
  class UnHoveredOptions_ extends UnHoveredOptions {
    darkenUnHovered(): boolean;
    darkenUnHovered(value: boolean): void;
    darkenedBrightness(): number;
    darkenedBrightness(value: number): void;
    darkenedOpacity(): number;
    darkenedOpacity(value: number): void;
    renderUnHovered(): boolean;
    renderUnHovered(value: boolean): void;
  }

}

declare module 'io.wispforest.accessories.compat.config.AccessoriesConfigModel' {
  import { PlayerEquipControl } from 'io.wispforest.accessories.impl';
  import { List } from 'java.util';
  import { ScreenType } from 'io.wispforest.accessories.compat.config';
  import { Vector2i } from 'org.joml';

  class GeneralClientOptions {
    equipControl: PlayerEquipControl;
    forceNullRenderReplacement: boolean;
    disableEmptySlotScreenError: boolean;
    showCosmeticAccessories: boolean;
    disabledDefaultRenders: List;
  }


  class ScreenOptions {
    selectedScreenType: ScreenType;
    showUnusedSlots: boolean;
    allowSlotScrolling: boolean;
    inventoryButtonOffset: Vector2i;
    creativeInventoryButtonOffset: Vector2i;
    isDarkMode: boolean;
    showEquippedStackSlotType: boolean;
    entityLooksAtMouseCursor: boolean;
    allowSideBarCraftingGrid: boolean;
    showGroupTabs: boolean;
    hoveredOptions: HoveredOptions;
    unHoveredOptions: UnHoveredOptions;
  }


  class UnHoveredOptions {
    renderUnHovered: boolean;
    darkenUnHovered: boolean;
    darkenedBrightness: number;
    darkenedOpacity: number;
  }


  class HoveredOptions {
    brightenHovered: boolean;
    cycleBrightness: boolean;
    line: boolean;
    clickbait: boolean;
  }

}

declare module 'io.wispforest.accessories.compat.config.client.components' {
  import { FlowLayout } from 'io.wispforest.owo.ui.container';
  import { Map, List } from 'java.util';
  import { UIModel } from 'io.wispforest.owo.ui.parsing';
  import { Key } from 'Option';
  import { Class, Number, Enum } from 'java.lang';
  import { Field } from 'java.lang.reflect';
  import { Option } from 'io.wispforest.owo.config';
  import { Identifier } from 'org.intellij.lang.annotations';
  import { Consumer, Function, BiConsumer, Predicate } from 'java.util.function';
  import { ConfigTextBox, ListOptionContainer, OptionValueProvider } from 'io.wispforest.owo.config.ui.component';
  import { ParentComponent } from 'io.wispforest.owo.ui.core';
  import { ReflectiveEndecBuilder } from 'io.wispforest.endec.impl';

  interface ConfigurableStructLayout<T = any> extends FlowLayout {}
  class ConfigurableStructLayout<T = any> extends FlowLayout {
    readonly handlers: Map;
    sideBySideFormat: boolean;
    readonly model: UIModel;
    readonly configName: string;
    readonly optionKey: Key;
    composeComponents(clazz: Class<T>, validFields: Field[], value: T): ConfigurableStructLayout<T>;
    createEnumButton<F extends Enum<any>>(field: Field, defaultValue: F, t: T, field: Field, getter: Function<T, F>, setter: BiConsumer<T, F>, translationKey: string, parentComponent: ParentComponent): ConfigurableStructLayout<T>;
    identifierField(field: Field, defaultValue: Identifier): ConfigurableStructLayout<T>;
    numberField<F extends Number>(field: Field, defaultValue: F): ConfigurableStructLayout<T>;
    static of<T>(clazz: Class<T>, value: T, uiModel: UIModel, option: Option<any>): ConfigurableStructLayout<T>;
    rangeControlsHandle<F extends Number>(field: Field, defaultValue: F, decimalPlaces: number): ConfigurableStructLayout<T>;
    stringField(field: Field, defaultValue: string): ConfigurableStructLayout<T>;
    textBoxHandle<F>(field: Field, defaultValue: F, processor: Consumer<ConfigTextBox>): ConfigurableStructLayout<T>;
    textBoxHandle<F>(field: Field, defaultValue: F, toStringFunc: Function<F, string>, processor: Consumer<ConfigTextBox>): ConfigurableStructLayout<T>;
  }


  interface StructListOptionContainer<T = any> extends ListOptionContainer<T> {}
  class StructListOptionContainer<T = any> extends ListOptionContainer<T> {
    constructor(uiModel: UIModel, option: Option);
  }


  interface StructOptionContainer<T = any> extends OptionValueProvider, ConfigurableStructLayout<T> {}
  class StructOptionContainer<T = any> extends OptionValueProvider {
    composeAndBuild(): StructOptionContainer<T>;
    isValid(): boolean;
    static of<T>(uiModel: UIModel, option: Option<T>, builder: ReflectiveEndecBuilder, sideBySideFormat: boolean): StructOptionContainer;
    parsedValue(): any;
    validation(validation: Predicate<T>): StructOptionContainer<T>;
  }

}

declare module 'io.wispforest.accessories.compat.config.client.components.ConfigurableStructLayout' {
  import { Component, ParentComponent } from 'io.wispforest.owo.ui.core';
  import { Field } from 'java.lang.reflect';
  import { Function, BiConsumer } from 'java.util.function';

  class ReflectOps {
  }


  class ComponentFactory<T = any, F = any> {
    createComponent(var1: T, var2: Field, var3: Function<T, F>, var4: BiConsumer<T, F>, var5: string, var6: ParentComponent): Component;
  }

}

declare module 'io.wispforest.accessories.compat.config.client' {
  import { ConfigScreen } from 'io.wispforest.owo.config.ui';
  import { Function, BiConsumer } from 'java.util.function';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ConfigWrapper } from 'io.wispforest.owo.config';
  import { FactoryRegister } from 'io.wispforest.accessories.compat.config.client.ExtendedConfigScreen';

  interface ExtendedConfigScreen extends ConfigScreen {}
  class ExtendedConfigScreen extends ConfigScreen {
    static buildFunc(config: ConfigWrapper<any>, consumer: BiConsumer<ConfigWrapper<any>, FactoryRegister>): Function<Screen, Screen>;
  }

}

declare module 'io.wispforest.accessories.compat.config.client.ExtendedConfigScreen' {
  import { Predicate } from 'java.util.function';
  import { Option } from 'io.wispforest.owo.config';
  import { OptionComponentFactory } from 'io.wispforest.owo.config.ui';

  class FactoryRegister {
    registerFactory(var1: Predicate<Option<any>>, var2: OptionComponentFactory<any>): void;
  }

}

declare module 'io.wispforest.accessories.compat.emi' {
  import { EmiPlugin, EmiRegistry } from 'dev.emi.emi.api';

  interface AccessoriesClientEMIPlugin extends EmiPlugin {}
  class AccessoriesClientEMIPlugin extends EmiPlugin {
    register(registry: EmiRegistry): void;
  }

}

declare module 'io.wispforest.accessories.compat' {
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { ItemStack } from 'net.minecraft.world.item';
  import { EquipmentSlot, LivingEntity } from 'net.minecraft.world.entity';
  import { BiConsumer } from 'java.util.function';
  import { HumanoidModel } from 'net.minecraft.client.model';

  class GeckoLibCompat {
    static renderGeckoArmor<T extends LivingEntity, M extends HumanoidModel<T>, A extends HumanoidModel<T>>(poseStack: PoseStack, bufferSource: MultiBufferSource, entity: T, stack: ItemStack, equipmentSlot: EquipmentSlot, parentModel: M, baseModel: A, partialTicks: number, light: number, limbSwing: number, limbSwingAmount: number, ageInTicks: number, netHeadYaw: number, headPitch: number, partVisibilitySetter: BiConsumer<A, EquipmentSlot>): boolean;
  }

}

declare module 'io.wispforest.accessories.compat.jei' {
  import { IModPlugin } from 'mezz.jei.api';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IGuiHandlerRegistration } from 'mezz.jei.api.registration';
  import { List } from 'java.util';
  import { Rect2i } from 'net.minecraft.client.renderer';
  import { AccessoriesScreen, AccessoriesExperimentalScreen } from 'io.wispforest.accessories.client.gui';

  interface AccessoriesClientJEIPlugin extends IModPlugin {}
  class AccessoriesClientJEIPlugin extends IModPlugin {
    get pluginUid(): ResourceLocation;
    getGuiExtraAreas(screen: AccessoriesScreen): Rect2i[];
    getGuiExtraAreas(screen: AccessoriesExperimentalScreen): Rect2i[];
    registerGuiHandlers(registration: IGuiHandlerRegistration): void;
  }

}

declare module 'io.wispforest.accessories.compat.rei' {
  import { REIClientPlugin } from 'me.shedaniel.rei.api.client.plugins';
  import { ExclusionZones, ScreenRegistry } from 'me.shedaniel.rei.api.client.registry.screen';
  import { TransferHandlerRegistry } from 'me.shedaniel.rei.api.client.registry.transfer';
  import { ApplicabilityResult, Context } from 'TransferHandler';
  import { Iterable } from 'java.lang';
  import { SlotAccessor } from 'me.shedaniel.rei.api.common.transfer.info.stack';

  interface AccessoriesClientREIPlugin extends REIClientPlugin {}
  class AccessoriesClientREIPlugin extends REIClientPlugin {
    checkApplicable(context: Context): ApplicabilityResult;
    getInputSlots(context: Context): Iterable<SlotAccessor>;
    getInventorySlots(context: Context): Iterable<SlotAccessor>;
    registerExclusionZones(zones: ExclusionZones): void;
    registerScreens(registry: ScreenRegistry): void;
    registerTransferHandlers(registry: TransferHandlerRegistry): void;
  }

}

declare module 'io.wispforest.accessories.criteria' {
  import { SimpleCriterionTrigger } from 'net.minecraft.advancements.critereon';
  import { Conditions } from 'io.wispforest.accessories.criteria.AccessoryChangedCriterion';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { ItemStack } from 'net.minecraft.world.item';
  import { SlotReference } from 'io.wispforest.accessories.api.slot';
  import { Boolean } from 'java.lang';
  import { Codec } from 'com.mojang.serialization';

  interface AccessoryChangedCriterion extends SimpleCriterionTrigger<Conditions> {}
  class AccessoryChangedCriterion extends SimpleCriterionTrigger<Conditions> {
    codec(): Codec<Conditions>;
    trigger(player: ServerPlayer, accessory: ItemStack, reference: SlotReference, cosmetic: boolean): void;
  }

}

declare module 'io.wispforest.accessories.data' {
  import { ManagedEndecDataLoader } from 'io.wispforest.accessories.utils';
  import { CustomDataRenderer, RenderingFunction } from 'io.wispforest.accessories.api.client.rendering';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Map, SequencedMap, List, Optional, Collection } from 'java.util';
  import { JsonElement, JsonArray } from 'com.google.gson';
  import { Level } from 'net.minecraft.world.level';
  import { MinecraftServer } from 'net.minecraft.server';
  import { OwoNetChannel } from 'io.wispforest.owo.network';
  import { Consumer, Function } from 'java.util.function';
  import { Player } from 'net.minecraft.world.entity.player';
  import { SlotType, SlotGroup } from 'io.wispforest.accessories.api.slot';
  import { LivingEntity, EntityType } from 'net.minecraft.world.entity';
  import { Enum } from 'java.lang';
  import { SimplePreparableReloadListener } from 'net.minecraft.server.packs.resources';

  interface CustomRendererLoader extends ManagedEndecDataLoader<CustomDataRenderer> {}
  class CustomRendererLoader extends ManagedEndecDataLoader<CustomDataRenderer> {
    static readonly INSTANCE: CustomRendererLoader;
    static constantFileResolving(server: MinecraftServer, id: ResourceLocation): void;
    static getOrResolveRenderer(id: ResourceLocation, references: Map<string, JsonElement>, level: Level): RenderingFunction;
    static getOrResolveRenderer(id: ResourceLocation, references: Map<string, JsonElement>, isClientSide: boolean): RenderingFunction;
    static getOrResolveRenderer(dataRenderer: CustomDataRenderer, isClientSide: boolean): RenderingFunction;
    static init(): void;
    static init(channel: OwoNetChannel, hookRegistration: Consumer<Consumer<Player>>): void;
    static isConstantResolveTarget(): boolean;
  }


  interface EntitySlotLoader extends ReplaceableJsonResourceReloadListener {}
  class EntitySlotLoader extends ReplaceableJsonResourceReloadListener {
    static readonly INSTANCE: EntitySlotLoader;
    getEntitySlotData(isClientSide: boolean): Map<EntityType<any>, Map<string, SlotType>>;
    static getEntitySlots(livingEntity: LivingEntity): Map<string, SlotType>;
    static getEntitySlots(level: Level, entityType: EntityType<any>): Map<string, SlotType>;
    getSlotTypes(isClientSide: boolean, entityType: EntityType<any>): Map<string, SlotType>;
    setEntitySlotData(data: SequencedMap<EntityType<any>, SequencedMap<string, SlotType>>): void;
  }


  interface OperationType extends Enum<OperationType> {}
  class OperationType extends Enum<OperationType> {
    static readonly SET: OperationType;
    static readonly ADD: OperationType;
    static readonly SUB: OperationType;
    static valueOf(name: string): OperationType;
    static values(): OperationType[];
  }


  interface ReplaceableJsonResourceReloadListener extends SimplePreparableReloadListener<Map> {}
  class ReplaceableJsonResourceReloadListener extends SimplePreparableReloadListener<Map> {
    decodeJsonArray<T>(jsonArray: JsonArray, name: string, location: ResourceLocation, decoder: Function<JsonElement, T>, consumer: Consumer<T>): void;
  }


  interface SlotGroupLoader extends ReplaceableJsonResourceReloadListener {}
  class SlotGroupLoader extends ReplaceableJsonResourceReloadListener {
    static readonly INSTANCE: SlotGroupLoader;
    findGroup(isClientSide: boolean, slot: string): Optional<SlotGroup>;
    static getGroup(level: Level, group: string): Optional<SlotGroup>;
    getGroup(isClientSide: boolean, group: string): SlotGroup;
    getGroupMap(isClientSide: boolean): Map<string, SlotGroup>;
    static getGroups(level: Level): SlotGroup[];
    static getGroups(level: Level, filterUniqueGroups: boolean): SlotGroup[];
    getGroups(isClientSide: boolean, filterUniqueGroups: boolean): SlotGroup[];
    getOrDefaultGroup(isClientSide: boolean, slot: string): SlotGroup;
    static getValidGroups(living: LivingEntity): Map<SlotGroup, SlotType[]>;
    setGroups(groups: SequencedMap<string, SlotGroup>): void;
  }


  interface SlotTypeLoader extends ReplaceableJsonResourceReloadListener {}
  class SlotTypeLoader extends ReplaceableJsonResourceReloadListener {
    static readonly INSTANCE: SlotTypeLoader;
    static getSlotType(entity: LivingEntity, slotName: string): SlotType;
    static getSlotType(level: Level, slotName: string): SlotType;
    static getSlotTypes(level: Level): Map<string, SlotType>;
    getSlotTypes(isClientSide: boolean): Map<string, SlotType>;
    static getUsedSlotsByRegistryItem(living: LivingEntity): Collection<SlotType>;
    setSlotType(slotTypes: SequencedMap<string, SlotType>): void;
  }

}

declare module 'io.wispforest.accessories.data.SlotGroupLoader' {
  import { Integer } from 'java.lang';
  import { SlotType, SlotGroup } from 'io.wispforest.accessories.api.slot';
  import { Collection } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';

  class SlotGroupBuilder {
    constructor(name: string);
    addSlot(value: SlotType): SlotGroupBuilder;
    addSlots(values: Collection<SlotType>): SlotGroupBuilder;
    build(): SlotGroup;
    icon(location: ResourceLocation): SlotGroupBuilder;
    order(value: number): SlotGroupBuilder;
  }

}

declare module 'io.wispforest.accessories.data.SlotTypeLoader' {
  import { Integer } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { DropRule } from 'io.wispforest.accessories.api';
  import { SlotType } from 'io.wispforest.accessories.api.slot';

  class SlotBuilder {
    baseAmount: number;
    constructor(name: string);
    addAmount(value: number): SlotBuilder;
    alternativeTranslation(value: string): SlotBuilder;
    amount(value: number): SlotBuilder;
    create(): SlotType;
    dropRule(value: DropRule): SlotBuilder;
    icon(value: ResourceLocation): SlotBuilder;
    order(value: number): SlotBuilder;
    subtractAmount(value: number): SlotBuilder;
    validator(validator: ResourceLocation): SlotBuilder;
  }

}

declare module 'io.wispforest.accessories.impl' {
  import { Level } from 'net.minecraft.world.level';
  import { PlayerList } from 'net.minecraft.server.players';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { LivingEntity, Entity } from 'net.minecraft.world.entity';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { List, Collection, Iterator } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { TooltipContext } from 'Item';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { InteractionResultHolder, InteractionHand, InteractionResult, SimpleContainer } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { AddDataComponentCallback } from 'io.wispforest.accessories.impl.AccessoriesEventHandler';
  import { TagKey } from 'net.minecraft.tags';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Registry } from 'net.minecraft.core';
  import { AccessoryNestContainerContents } from 'io.wispforest.accessories.api.components';
  import { SlotReference } from 'io.wispforest.accessories.api.slot';
  import { BiFunction, BiConsumer, Supplier } from 'java.util.function';
  import { Iterable, Integer, Enum } from 'java.lang';
  import { Pair } from 'com.mojang.datafixers.util';
  import { ListTag, Tag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { MapCarrier } from 'io.wispforest.endec.util';
  import { SerializationContext, Endec } from 'io.wispforest.endec';

  class AccessoriesEventHandler {
    static dataReloadOccurred: boolean;
    static attemptEquipFromUse(player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
    static attemptEquipOnEntity(player: Player, hand: InteractionHand, entity: Entity): InteractionResult;
    static dataSync(list: PlayerList, player: ServerPlayer): void;
    static entityLoad(entity: LivingEntity, level: Level): void;
    static getTooltipData(entity: LivingEntity, stack: ItemStack, tooltip: Component[], tooltipContext: TooltipContext, tooltipType: TooltipFlag): void;
    static onDeath(entity: LivingEntity, source: DamageSource): Collection<ItemStack>;
    static onLivingEntityTick(entity: LivingEntity): void;
    static onTracking(entity: LivingEntity, serverPlayer: ServerPlayer): void;
    static onWorldTick(level: Level): void;
    static revalidatePlayer(player: ServerPlayer): void;
    static revalidatePlayersOnReload(playerList: PlayerList): void;
    static setupItems(callback: AddDataComponentCallback): void;
  }


  class AccessoriesTags {
    static readonly MODIFIABLE_ENTITY_WHITELIST: TagKey;
    static readonly MODIFIABLE_ENTITY_BLACKLIST: TagKey;
    static readonly VALID_FOR_REDIRECTION: TagKey;
    static ofTag<T, R extends Registry<T>>(resourceKey: ResourceKey<R>, path: string): TagKey<T>;
  }


  class AccessoryNestUtils {
    static create(reference: SlotReference, innerIndex: number): SlotReference;
    static getData(stack: ItemStack): AccessoryNestContainerContents;
    static recursiveStackConsumption(stack: ItemStack, reference: SlotReference, consumer: BiConsumer<ItemStack, SlotReference>): void;
    static recursiveStackHandling<T>(stack: ItemStack, reference: SlotReference, functionParameter: BiFunction<ItemStack, SlotReference, T>): T;
  }


  interface ExpandedSimpleContainer extends Iterable<Pair>, SimpleContainer {}
  class ExpandedSimpleContainer extends Iterable<Pair> {
    constructor(container: AccessoriesContainerImpl, size: number, name: string);

    constructor(container: AccessoriesContainerImpl, size: number, name: string, toggleNewlyConstructed: boolean);
    copyPrev(prevContainer: ExpandedSimpleContainer): void;
    createTag(provider: Provider): ListTag;
    fromTag(containerNbt: ListTag, provider: Provider): void;
    getItem(slot: number): ItemStack;
    getMaxStackSize(itemStack: ItemStack): number;
    getPreviousItem(slot: number): ItemStack;
    hasNext(): boolean;
    isSlotFlagged(slot: number): boolean;
    iterator(): Iterator<Pair<number, ItemStack>>;
    next(): Pair<number, ItemStack>;
    parseOptional(lookupProvider: Provider, tag: Tag): ItemStack;
    removeItem(slot: number, amount: number): ItemStack;
    removeItemNoUpdate(slot: number): ItemStack;
    setFromPrev(prevContainer: ExpandedSimpleContainer): void;
    setItem(slot: number, stack: ItemStack): void;
    setPreviousItem(slot: number, stack: ItemStack): void;
    validIndex(slot: number): boolean;
    wasNewlyConstructed(): boolean;
  }


  class InstanceEndec {
    static constructed<T extends InstanceEndec>(supplier: Supplier<T>): Endec<T>;
    read(var1: MapCarrier, var2: SerializationContext): void;
    write(var1: MapCarrier, var2: SerializationContext): void;
  }


  interface PlayerEquipControl extends Enum<PlayerEquipControl> {}
  class PlayerEquipControl extends Enum<PlayerEquipControl> {
    static readonly MUST_CROUCH: PlayerEquipControl;
    static readonly MUST_NOT_CROUCH: PlayerEquipControl;
    static readonly DISABLED: PlayerEquipControl;
    static valueOf(name: string): PlayerEquipControl;
    static values(): PlayerEquipControl[];
  }

}

declare module 'io.wispforest.accessories.impl.AccessoriesEventHandler' {
  import { Item } from 'net.minecraft.world.item';
  import { DataComponentType } from 'net.minecraft.core.component';

  class AddDataComponentCallback {
    addTo<T>(var1: Item, var2: DataComponentType<T>, var3: T): void;
  }

}

declare module 'io.wispforest.accessories.impl.caching' {
  import { AccessoriesContainer, EquipmentChecking } from 'io.wispforest.accessories.api';
  import { ItemStackBasedPredicate } from 'io.wispforest.accessories.api.caching';
  import { SlotEntryReference } from 'io.wispforest.accessories.api.slot';
  import { List } from 'java.util';
  import { AccessoriesHolderImpl } from 'io.wispforest.accessories.impl';
  import { ItemStack } from 'net.minecraft.world.item';
  import { DataComponentType } from 'net.minecraft.core.component';

  interface AccessoriesContainerLookupCache extends EquipmentLookupCache {}
  class AccessoriesContainerLookupCache extends EquipmentLookupCache {
    constructor(container: AccessoriesContainer);
    clearCache(): void;
    firstEquipped(predicate: ItemStackBasedPredicate, check: EquipmentChecking): SlotEntryReference;
    get allEquipped(): SlotEntryReference[];
    getEquipped(predicate: ItemStackBasedPredicate): SlotEntryReference[];
    isEmpty(): boolean;
    isEquipped(predicate: ItemStackBasedPredicate): boolean;
  }


  interface AccessoriesHolderLookupCache extends EquipmentLookupCache {}
  class AccessoriesHolderLookupCache extends EquipmentLookupCache {
    constructor(holder: AccessoriesHolderImpl);
    clearCache(): void;
    clearContainerCache(key: string): void;
    firstEquipped(predicate: ItemStackBasedPredicate, check: EquipmentChecking): SlotEntryReference;
    get allEquipped(): SlotEntryReference[];
    getEquipped(predicate: ItemStackBasedPredicate): SlotEntryReference[];
    invalidateLookupData(key: string, stack: ItemStack, types: DataComponentType<any>[]): void;
    isEquipped(predicate: ItemStackBasedPredicate): boolean;
  }


  class EquipmentLookupCache {
    clearCache(): void;
    firstEquipped(var1: ItemStackBasedPredicate, var2: EquipmentChecking): SlotEntryReference;
    get allEquipped(): SlotEntryReference[];
    getEquipped(var1: ItemStackBasedPredicate): SlotEntryReference[];
    isEquipped(var1: ItemStackBasedPredicate): boolean;
  }

}

declare module 'io.wispforest.accessories.impl.event' {
  import { Event } from 'net.fabricmc.fabric.api.event';
  import { Function } from 'java.util.function';

  interface WrappedEvent<T = any, W = any> extends Event<T> {}
  class WrappedEvent<T = any, W = any> extends Event<T> {
    constructor(targetEvent: Event<W>, conversionFunc: Function<T, W>);

    constructor(targetEvent: Event<W>, conversionFunc: Function<T, W>, invokerBuilder: Function<Event<W>, T>);
    register(listener: T): void;
  }

}

declare module 'io.wispforest.accessories.menu' {
  import { ArmorSlot, MenuType, AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { ArmorSlotExtension, ItemBasedSteerable } from 'io.wispforest.accessories.pond';
  import { AccessoriesContainer } from 'io.wispforest.accessories.api';
  import { Container } from 'net.minecraft.world';
  import { LivingEntity, EquipmentSlot, Saddleable, SlotAccess } from 'net.minecraft.world.entity';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { SlotType, SlotTypeReference } from 'io.wispforest.accessories.api.slot';
  import { AccessoriesBasedSlot } from 'io.wispforest.accessories.api.menu';
  import { Function, Consumer } from 'java.util.function';
  import { Boolean, Enum, Integer } from 'java.lang';
  import { List, Map } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { Player, Inventory } from 'net.minecraft.world.entity.player';
  import { MenuRegisterCallback } from 'io.wispforest.accessories.menu.AccessoriesMenuTypes';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ScreenType } from 'io.wispforest.accessories.compat.config';
  import { AccessoriesMenuBase } from 'io.wispforest.accessories.menu.variants';
  import { RegistrationCallback, UniqueSlotBuilderFactory } from 'io.wispforest.accessories.api.slot.UniqueSlotHandling';
  import { Pair } from 'it.unimi.dsi.fastutil';
  import { TriConsumer } from 'org.apache.logging.log4j.util';
  import { AbstractHorse } from 'net.minecraft.world.entity.animal.horse';

  interface AccessoriesArmorSlot extends SlotTypeAccessible, ArmorSlotExtension, ArmorSlot {}
  class AccessoriesArmorSlot extends SlotTypeAccessible {
    readonly accessoriesContainer: AccessoriesContainer;
    constructor(accessoriesContainer: AccessoriesContainer, container: Container, livingEntity: LivingEntity, equipmentSlot: EquipmentSlot, slot: number, x: number, y: number, resourceLocation: ResourceLocation);
    get container(): AccessoriesContainer;
    slotName(): string;
    slotType(): SlotType;
  }


  interface AccessoriesInternalSlot extends AccessoriesBasedSlot {}
  class AccessoriesInternalSlot extends AccessoriesBasedSlot {
    readonly isCosmetic: boolean;
    useCosmeticIcon: boolean;
    constructor(container: AccessoriesContainer, isCosmetic: boolean, slot2: number, x: number, y: number);
    allowModification(player: Player): boolean;
    get tooltipData(): Component[];
    isAccessible(isAccessible: Function<AccessoriesInternalSlot, boolean>): AccessoriesInternalSlot;
    isActive(isActive: Function<AccessoriesInternalSlot, boolean>): AccessoriesInternalSlot;
    isActive(): boolean;
    isCosmeticSlot(): boolean;
    mayPickup(player: Player): boolean;
    mayPlace(stack: ItemStack): boolean;
    set(stack: ItemStack): void;
    useCosmeticIcon(value: boolean): AccessoriesInternalSlot;
  }


  class AccessoriesMenuTypes {
    static ORIGINAL_MENU: MenuType;
    static EXPERIMENTAL_MENU: MenuType;
    static registerClientMenuConstructors<M extends AbstractContainerMenu, U extends Screen>(callback: MenuRegisterCallback): void;
    static registerMenuType(): void;
  }


  interface AccessoriesMenuVariant extends Enum<AccessoriesMenuVariant> {}
  class AccessoriesMenuVariant extends Enum<AccessoriesMenuVariant> {
    static readonly ORIGINAL: AccessoriesMenuVariant;
    static readonly EXPERIMENTAL_V1: AccessoriesMenuVariant;
    static getVariant(screenType: ScreenType): AccessoriesMenuVariant;
    static getVariant(menuType: MenuType<AccessoriesMenuBase>): AccessoriesMenuVariant;
    static openMenu(i: number, inv: Inventory, variant: AccessoriesMenuVariant, target: LivingEntity, carriedStack: ItemStack): AbstractContainerMenu;
    static valueOf(name: string): AccessoriesMenuVariant;
    static values(): AccessoriesMenuVariant[];
  }


  interface ArmorSlotTypes extends RegistrationCallback {}
  class ArmorSlotTypes extends RegistrationCallback {
    static readonly TEXTURE_EMPTY_SLOTS: Map;
    static readonly SLOT_IDS: EquipmentSlot[];
    static readonly INSTANCE: ArmorSlotTypes;
    static readonly SPRITE_ATLAS_LOCATION: ResourceLocation;
    static animalBody(): SlotTypeReference;
    static chestSlot(): SlotTypeReference;
    static feetSlot(): SlotTypeReference;
    static get armorReferences(): SlotTypeReference[];
    static getAlternativeStack(instance: LivingEntity, equipmentSlot: EquipmentSlot): ItemStack;
    static getEmptyTexture(slot: EquipmentSlot, living: LivingEntity): Pair<ResourceLocation, ResourceLocation>;
    static getReferenceFromSlot(equipmentSlot: EquipmentSlot): SlotTypeReference;
    static headSlot(): SlotTypeReference;
    init(): void;
    static isArmorType(slotType: string): boolean;
    static isValidEquipable(equipmentSlot: EquipmentSlot): boolean;
    static legsSlot(): SlotTypeReference;
    registerAccessories(eventRegister: Consumer<TriConsumer<number, ResourceLocation, Item>>): void;
    registerSlots(factory: UniqueSlotBuilderFactory): void;
  }


  interface EquipmentSlotBasedContainer extends Container {}
  class EquipmentSlotBasedContainer extends Container {
    clearContent(): void;
    equipmentSlot(): EquipmentSlot;
    get containerSize(): number;
    getEquipmentStack(var1: EquipmentSlot): ItemStack;
    getItem(slot: number): ItemStack;
    isEmpty(): boolean;
    static of(equipmentSlot: EquipmentSlot, livingEntity: LivingEntity): Container;
    static ofLiving(equipmentSlot: EquipmentSlot, livingEntity: LivingEntity, stack: T): Container;
    static ofPlayer(equipmentSlot: EquipmentSlot, player: Player, stack: T): Container;
    removeItem(slot: number, amount: number): ItemStack;
    removeItemNoUpdate(slot: number): ItemStack;
    setChanged(): void;
    setEquipmentStack(var1: EquipmentSlot, var2: ItemStack): void;
    setItem(slot: number, stack: ItemStack): void;
    stillValid(player: Player): boolean;
  }


  interface SaddleableContainer extends Container {}
  class SaddleableContainer extends Container {
    clearContent(): void;
    get containerSize(): number;
    get saddle(): ItemStack;
    getItem(slot: number): ItemStack;
    isEmpty(): boolean;
    static of(living: LivingEntity): Container;
    static ofHorse(abstractHorse: AbstractHorse): Container;
    static ofSaddleable(saddleable: Saddleable): Container;
    removeItem(slot: number, amount: number): ItemStack;
    removeItemNoUpdate(slot: number): ItemStack;
    removeSaddle(): ItemStack;
    saddleable(): Saddleable;
    setChanged(): void;
    setItem(slot: number, stack: ItemStack): void;
    stillValid(player: Player): boolean;
  }


  interface SlotAccessContainer extends Container {}
  class SlotAccessContainer extends Container {
    constructor(slotAccess: SlotAccess);
    clearContent(): void;
    get containerSize(): number;
    getItem(slot: number): ItemStack;
    isEmpty(): boolean;
    static ofArmor(equipmentSlot: EquipmentSlot, livingEntity: LivingEntity): Container;
    static ofGenericArmor(equipmentSlot: EquipmentSlot, livingEntity: LivingEntity): Container;
    static ofGenericSaddle(saddleable: ItemBasedSteerable): Container;
    static ofHorseSaddle(abstractHorse: AbstractHorse): Container;
    static ofPlayerArmor(equipmentSlot: EquipmentSlot, player: Player): Container;
    static ofSaddleSlot(living: LivingEntity): Container;
    removeItem(slot: number, amount: number): ItemStack;
    removeItemNoUpdate(slot: number): ItemStack;
    setChanged(): void;
    setItem(slot: number, stack: ItemStack): void;
    stillValid(player: Player): boolean;
  }


  class SlotTypeAccessible {
    get container(): AccessoriesContainer;
    isCosmeticSlot(): boolean;
    slotName(): string;
    slotType(): SlotType;
  }

}

declare module 'io.wispforest.accessories.menu.AccessoriesMenuTypes' {
  import { MenuType, AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { ScreenConstructor } from 'MenuScreens';
  import { Screen } from 'net.minecraft.client.gui.screens';

  class MenuRegisterCallback {
    register<M extends AbstractContainerMenu, U extends Screen>(var1: MenuType<M>, var2: ScreenConstructor<M, U>): void;
  }

}

declare module 'io.wispforest.accessories.menu.variants' {
  import { Inventory, Player, StackedContents } from 'net.minecraft.world.entity.player';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { AccessoriesMenuData, AccessoriesMenuVariant } from 'io.wispforest.accessories.menu';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Pair } from 'com.mojang.datafixers.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List, Set } from 'java.util';
  import { AccessoriesBasedSlot } from 'io.wispforest.accessories.api.menu';
  import { Slot, RecipeBookMenu, RecipeBookType } from 'net.minecraft.world.inventory';
  import { SlotType, SlotGroup } from 'io.wispforest.accessories.api.slot';
  import { Runnable } from 'java.lang';
  import { CraftingInput, CraftingRecipe, RecipeHolder } from 'net.minecraft.world.item.crafting';
  import { Pair as it_unimi_dsi_fastutil_Pair } from 'it.unimi.dsi.fastutil';
  import { Container } from 'net.minecraft.world';

  interface AccessoriesExperimentalMenu extends AccessoriesMenuBase {}
  class AccessoriesExperimentalMenu extends AccessoriesMenuBase {
    constructor(containerId: number, inventory: Inventory, targetEntity: LivingEntity);
    addSelectedGroup(slotGroup: SlotGroup): void;
    addedArmorSlots(): number;
    areUnusedSlotsShown(): boolean;
    get accessoriesSlots(): AccessoriesBasedSlot[];
    get noItemIcon(): Pair<ResourceLocation, ResourceLocation>;
    get noItemIcon(): Pair<ResourceLocation, ResourceLocation>;
    get noItemIcon(): Pair<ResourceLocation, ResourceLocation>;
    get usedSlots(): Set<SlotType>;
    get visibleAccessoriesSlots(): Slot[];
    includeSaddle(): boolean;
    initializeContents(stateId: number, items: ItemStack[], carried: ItemStack): void;
    isGroupSelected(slotGroup: SlotGroup): boolean;
    mayPlace(stack: ItemStack): boolean;
    static of(containerId: number, inventory: Inventory, data: AccessoriesMenuData): AccessoriesExperimentalMenu;
    quickMoveStack(player: Player, index: number): ItemStack;
    removeSelectedGroup(slotGroup: SlotGroup): void;
    selectedGroups(): Set<SlotGroup>;
    setByPlayer(itemStack: ItemStack, itemStack2: ItemStack): void;
    startingAccessoriesSlot(): number;
    stillValid(player: Player): boolean;
    targetEntityDefaulted(): LivingEntity;
    updateUsedSlots(): void;
    usedGroups(): Set<SlotGroup>;
  }


  interface AccessoriesMenu extends AccessoriesMenuBase {}
  class AccessoriesMenu extends AccessoriesMenuBase {
    static readonly BLOCK_ATLAS: ResourceLocation;
    static readonly EMPTY_ARMOR_SLOT_SHIELD: ResourceLocation;
    totalSlots: number;
    overMaxVisibleSlots: boolean;
    scrolledIndex: number;
    smoothScroll: number;
    constructor(containerId: number, inventory: Inventory, targetEntity: LivingEntity);
    areUnusedSlotsShown(): boolean;
    get noItemIcon(): Pair<ResourceLocation, ResourceLocation>;
    isCosmeticsOpen(): boolean;
    maxScrollableIndex(): number;
    static of(containerId: number, inventory: Inventory, data: AccessoriesMenuData): AccessoriesMenu;
    quickMoveStack(player: Player, clickedIndex: number): ItemStack;
    scrollTo(i: number, smooth: boolean): boolean;
    setByPlayer(newStack: ItemStack, oldStack: ItemStack): void;
    setScrollEvent(event: Runnable): void;
    showingSlots(): boolean;
    stillValid(player: Player): boolean;
    usedSlots(): Set<SlotType>;
    validGroups(): Set<SlotGroup>;
  }


  interface AccessoriesMenuBase extends RecipeBookMenu<CraftingInput, CraftingRecipe> {}
  class AccessoriesMenuBase extends RecipeBookMenu<CraftingInput, CraftingRecipe> {
    canTakeItemForPickAll(stack: ItemStack, slot: Slot): boolean;
    clearCraftingContent(): void;
    fillCraftSlotsStackedContents(itemHelper: StackedContents): void;
    get gridHeight(): number;
    get gridWidth(): number;
    get recipeBookType(): RecipeBookType;
    get resultSlotIndex(): number;
    get size(): number;
    initializeContents(stateId: number, items: ItemStack[], carried: ItemStack): void;
    isSyncedWithServer(serverSlotAmountAdded: number): AccessoriesMenuBase;
    isValidMenu(): boolean;
    menuVariant(): AccessoriesMenuVariant;
    owner(): Player;
    quickMoveStackCrafting(index: number): it_unimi_dsi_fastutil_Pair<ItemStack, ItemStack>;
    recipeMatches(recipe: RecipeHolder<CraftingRecipe>): boolean;
    removed(player: Player): void;
    reopenMenu(): void;
    shouldMoveToInventory(slotIndex: number): boolean;
    slotAmountAdded(): number;
    slotsChanged(container: Container): void;
    targetEntity(): LivingEntity;
    transferAndClose(setupCall: Runnable): void;
  }

}

declare module 'io.wispforest.accessories.mixin' {
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { Set, List, Collection } from 'java.util';
  import { ClassNode } from 'org.objectweb.asm.tree';
  import { ArmorSlotExtension, AccessoriesAPIAccess, AccessoriesLivingEntityExtension, ItemBasedSteerable, DroppedStacksExtension } from 'io.wispforest.accessories.pond';
  import { ArmorSlot, AbstractContainerMenu, CraftingContainer, ResultContainer } from 'net.minecraft.world.inventory';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RegistryAccess, Holder } from 'net.minecraft.core';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { RecipeHolder, CraftingRecipe } from 'net.minecraft.world.item.crafting';
  import { CriterionTrigger } from 'net.minecraft.advancements';
  import { DynamicOps, MapCodec } from 'com.mojang.serialization';
  import { ServerPlayerConnection } from 'net.minecraft.server.network';
  import { EquipmentSlot, Entity, ItemBasedSteering } from 'net.minecraft.world.entity';
  import { Type } from 'EquipmentSlot';
  import { Provider } from 'HolderLookup';
  import { Consumer } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';
  import { Attribute, AttributeModifier } from 'net.minecraft.world.entity.ai.attributes';
  import { PatchedDataComponentMap } from 'net.minecraft.core.component';
  import { ItemStack } from 'net.minecraft.world.item';
  import { AccessoriesCapability, AccessoriesHolder } from 'io.wispforest.accessories.api';
  import { SlotReference } from 'io.wispforest.accessories.api.slot';
  import { PatchedDataComponentMapExtension } from 'io.wispforest.accessories.pond.stack';
  import { EventStream } from 'io.wispforest.owo.util';
  import { ItemStackMutation } from 'io.wispforest.accessories.utils';
  import { RegistryInfoLookup } from 'RegistryOps';
  import { Int2ObjectMap } from 'it.unimi.dsi.fastutil.ints';

  interface AccessoriesMixinPlugin extends IMixinConfigPlugin {}
  class AccessoriesMixinPlugin extends IMixinConfigPlugin {
    acceptTargets(myTargets: Set<string>, otherTargets: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    onLoad(mixinPackage: string): void;
    postApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    preApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    shouldApplyMixin(targetClassName: string, mixinClassName: string): boolean;
  }


  class ApplyBonusCountMixin {
  }


  interface ArmorSlotMixin extends ArmorSlotExtension {}
  class ArmorSlotMixin extends ArmorSlotExtension {
    get atlasLocation(): ResourceLocation;
    set atlasLocation(atlasLocation: ResourceLocation);
  }


  class ConfigurableRegistryLookupAccessor {
    get registryAccess(): RegistryAccess;
  }


  class CraftingMenuAccessor {
    static accessories$slotChangedCraftingGrid(abstractContainerMenu: AbstractContainerMenu, level: Level, player: Player, craftingContainer: CraftingContainer, resultContainer: ResultContainer, recipeHolder: RecipeHolder<CraftingRecipe>): void;
  }


  class CriteriaTriggersAccessor {
    static accessories$callRegister<T extends CriterionTrigger<any>>(name: string, trigger: T): T;
  }


  class DelegatingOpsAccessor<T = any> {
    delegate(): DynamicOps<T>;
  }


  class EnchantedCountIncreaseFunctionMixin {
  }


  class EnchantmentAttributeEffectMixin {
  }


  class EnchantmentHelperMixin {
  }


  class EndermanMixin {
  }


  class EntityTrackerAccessor {
    accessories$getSeenBy(): Set<ServerPlayerConnection>;
  }


  class EquipmentSlotMixin {
    static invokeNew(internalName: string, ordinal: number, type: Type, index: number, filterFlag: number, name: string): EquipmentSlot;
  }


  class EquipmentSlotTypeMixin {
    static invokeNew(internalName: string, ordinal: number): Type;
  }


  class HolderLookupAdapterAccessor {
    get lookupProvider(): Provider;
  }


  class InventoryMixin {
    player: Player;
    selected: number;
  }


  class ItemStackAccessor {
    accessories$addModifierTooltip(var1: Consumer<Component>, var2: Player, var3: Holder<Attribute>, var4: AttributeModifier): void;
    accessories$components(): PatchedDataComponentMap;
  }


  class LivingEntityAccessor {
    accessors$breakItem(var1: ItemStack): void;
  }


  interface LivingEntityMixin extends AccessoriesAPIAccess, AccessoriesLivingEntityExtension, Entity {}
  class LivingEntityMixin extends AccessoriesAPIAccess {
    accessoriesCapability(): AccessoriesCapability;
    accessoriesHolder(): AccessoriesHolder;
    onEquipItem(slotReference: SlotReference, oldItem: ItemStack, newItem: ItemStack): void;
  }


  interface PatchedDataComponentMapMixin extends PatchedDataComponentMapExtension {}
  class PatchedDataComponentMapMixin extends PatchedDataComponentMapExtension {
    accessories$getMutationEvent(itemStack: ItemStack): EventStream<ItemStackMutation>;
    accessories$hasChanged(): boolean;
  }


  interface PigEntityMixin extends ItemBasedSteerable {}
  class PigEntityMixin extends ItemBasedSteerable {
    get instance(): ItemBasedSteering;
  }


  class PiglinAiMixin {
  }


  interface PlayerMixin extends DroppedStacksExtension {}
  class PlayerMixin extends DroppedStacksExtension {
    addToBeDroppedStacks(list: Collection<ItemStack>): void;
    toBeDroppedStacks(): Collection<ItemStack>;
  }


  class PowderSnowBlockMixin {
  }


  class RegistryOpsAccessor {
    lookupProvider(): RegistryInfoLookup;
  }


  class ServerChunkLoadingManagerAccessor {
    accessories$getEntityMap(): Int2ObjectMap<EntityTrackerAccessor>;
  }


  class SlotAccessor {
    accessories$setY(var1: number): void;
  }


  class StateHolderAccessor<O = any, S = any> {
    accessories$owner(): O;
    accessories$propertiesCodec(): MapCodec<S>;
  }


  interface StriderMixin extends ItemBasedSteerable {}
  class StriderMixin extends ItemBasedSteerable {
    get instance(): ItemBasedSteering;
  }

}

declare module 'io.wispforest.accessories.mixin.client' {
  import { AbstractButtonExtension } from 'io.wispforest.accessories.client.gui';
  import { Event } from 'net.fabricmc.fabric.api.event';
  import { AdjustRendering } from 'io.wispforest.accessories.client.gui.ButtonEvents';
  import { Slot } from 'net.minecraft.world.inventory';
  import { ItemStack, CreativeModeTab } from 'net.minecraft.world.item';
  import { ContainerScreenExtension, CloseContainerTransfer, AccessoriesFrameBufferExtension } from 'io.wispforest.accessories.pond';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { EffectRenderingInventoryScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { CreativeScreenExtension, OnCreativeTabChange } from 'io.wispforest.accessories.client.gui.components.ComponentUtils';
  import { ItemPickerMenu } from 'CreativeModeInventoryScreen';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { List, Map } from 'java.util';
  import { RenderLayer } from 'net.minecraft.client.renderer.entity.layers';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Cube } from 'ModelPart';
  import { ModelPart } from 'net.minecraft.client.model.geom';
  import { AbstractClientPlayer } from 'net.minecraft.client.player';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';

  interface AbstractButtonMixin extends AbstractButtonExtension {}
  class AbstractButtonMixin extends AbstractButtonExtension {
    get renderingEvent(): Event<AdjustRendering>;
  }


  class AbstractContainerScreenAccessor {
    accessories$getClickedSlot(): Slot;
    accessories$getDraggingItem(): ItemStack;
    accessories$getQuickCraftingType(): number;
    accessories$isSplittingStack(): boolean;
    accessories$leftPos(): number;
    accessories$recalculateQuickCraftRemaining(): void;
    accessories$topPos(): number;
  }


  interface AbstractContainerScreenMixin extends ContainerScreenExtension {}
  class AbstractContainerScreenMixin extends ContainerScreenExtension {
    forceRenderSlot(context: GuiGraphics, slot: Slot): void;
  }


  interface CreativeInventoryScreenMixin extends CreativeScreenExtension, EffectRenderingInventoryScreen<ItemPickerMenu> {}
  class CreativeInventoryScreenMixin extends CreativeScreenExtension {
    constructor(menu: ItemPickerMenu, playerInventory: Inventory, title: Component);
    get event(): Event<OnCreativeTabChange>;
    get tab(): CreativeModeTab;
  }


  class DefaultTooltipPositionerMixin {
  }


  class GuiGraphicsAccessor {
    callBlitSprite(var1: TextureAtlasSprite, var2: number, var3: number, var4: number, var5: number, var6: number): void;
  }


  class InventoryScreenMixin {
  }


  class ItemInHandRendererMixin {
  }


  class ItemModelShaperMixin {
  }


  class LivingEntityRendererAccessor<T extends LivingEntity = any, M extends EntityModel<T> = any> {
    get layers(): RenderLayer<T, M>[];
  }


  class LoadingOverlayMixin {
  }


  interface LocalPlayerMixin extends CloseContainerTransfer {}
  class LocalPlayerMixin extends CloseContainerTransfer {
    accessories$setScreenTransfer(screen: Screen): void;
  }


  class MinecraftMixin {
  }


  class ModelPartAccessor {
    get children(): Map<string, ModelPart>;
    get cubes(): Cube[];
  }


  class PlayerRendererMixin {
    render(var1: AbstractClientPlayer, var2: number, var3: number, var4: PoseStack, var5: MultiBufferSource, var6: number): void;
  }


  interface RenderTargetMixin extends AccessoriesFrameBufferExtension {}
  class RenderTargetMixin extends AccessoriesFrameBufferExtension {
    accessories$setUseHighlightShader(useHighlightShader: boolean): void;
  }

}

declare module 'io.wispforest.accessories.mixin.client.cosmetic' {
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { CosmeticArmorLookupTogglable } from 'io.wispforest.accessories.pond';

  interface ArmorStandMixin extends LivingEntity {}
  class ArmorStandMixin extends LivingEntity {
  }


  interface LivingEntityMixin extends CosmeticArmorLookupTogglable {}
  class LivingEntityMixin extends CosmeticArmorLookupTogglable {
    get lookupToggle(): boolean;
    set lookupToggle(value: boolean);
  }


  interface MobMixin extends CosmeticArmorLookupTogglable, LivingEntity {}
  class MobMixin extends CosmeticArmorLookupTogglable {
  }


  interface PlayerMixin extends LivingEntity {}
  class PlayerMixin extends LivingEntity {
  }

}

declare module 'io.wispforest.accessories.mixin.client.model' {
  import { ModelPartLoadingHelper, ModelRootAccess } from 'io.wispforest.accessories.pond';
  import { ModelPart } from 'net.minecraft.client.model.geom';

  class BlockEntityRenderersMixin {
  }


  interface EntityModelSetMixin extends ModelPartLoadingHelper {}
  class EntityModelSetMixin extends ModelPartLoadingHelper {
    accessories$clearQueue(): void;
    accessories$pollRoot(): ModelPart;
    accessories$pushRoot(root: ModelPart): void;
  }


  class EntityRenderersMixin {
  }


  interface ModelMixin extends ModelRootAccess {}
  class ModelMixin extends ModelRootAccess {
    accessories$rootPart(): ModelPart;
  }

}

declare module 'io.wispforest.accessories.mixin.client.owo' {
  import { ComponentExtension, MutableBoundingArea } from 'io.wispforest.accessories.pond.owo';
  import { BaseComponent, BaseParentComponent } from 'io.wispforest.owo.ui.base';
  import { List } from 'java.util';
  import { AbstractPolygon } from 'io.wispforest.accessories.client.gui.utils';
  import { ComponentStub } from 'io.wispforest.owo.ui.inject';
  import { Component } from 'io.wispforest.owo.ui.core';
  import { WrappingParentComponent } from 'io.wispforest.owo.ui.container';

  interface BaseComponentMixin extends ComponentExtension<BaseComponent> {}
  class BaseComponentMixin extends ComponentExtension<BaseComponent> {
    allowIndividualOverdraw(value: boolean): BaseComponent;
    allowIndividualOverdraw(): boolean;
  }


  interface BaseParentComponentMixin extends MutableBoundingArea<BaseParentComponent> {}
  class BaseParentComponentMixin extends MutableBoundingArea<BaseParentComponent> {
    addExclusionZone<P extends AbstractPolygon>(...polygons: P[]): BaseParentComponent;
    addExclusionZone<P extends AbstractPolygon>(polygons: P[]): BaseParentComponent;
    addInclusionZone<P extends AbstractPolygon>(...polygons: P[]): BaseParentComponent;
    addInclusionZone<P extends AbstractPolygon>(polygons: P[]): BaseParentComponent;
    deepRecursiveChecking(value: boolean): BaseParentComponent;
    deepRecursiveChecking(): boolean;
    get exclusionZones(): AbstractPolygon[];
    get inclusionZones(): AbstractPolygon[];
  }


  class ComponentMixin {
  }


  interface ComponentStubMixin extends ComponentStub, ComponentExtension<Component> {}
  class ComponentStubMixin extends ComponentStub {
    allowIndividualOverdraw(value: boolean): Component;
    allowIndividualOverdraw(): boolean;
  }


  class DiscreteSliderComponentAccessor {
    accessories$setMax(var1: number): void;
    accessories$setMin(var1: number): void;
    accessories$updateMessage(): void;
  }


  class ScissorStackMixin {
  }


  interface ScrollContainerMixin<C extends Component = any> extends WrappingParentComponent<C> {}
  class ScrollContainerMixin<C extends Component = any> extends WrappingParentComponent<C> {
  }

}

declare module 'io.wispforest.accessories.mixin.owo' {
  import { ReflectiveEndecBuilder } from 'io.wispforest.endec.impl';

  class ConfigWrapperAccessor {
    accessories$builder(): ReflectiveEndecBuilder;
  }

}

declare module 'io.wispforest.accessories.mixin.temp_fixes' {
  import { Tag } from 'net.minecraft.nbt';

  class NbtCompoundMixin {
    get(var1: string): Tag;
  }


  class NbtUtilsMixin {
  }

}

declare module 'io.wispforest.accessories.neoforge' {
  import { AttachmentType } from 'net.neoforged.neoforge.attachment';
  import { EntityCapability, RegisterCapabilitiesEvent } from 'net.neoforged.neoforge.capabilities';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { Item } from 'net.minecraft.world.item';
  import { DataComponentType } from 'net.minecraft.core.component';
  import { FMLCommonSetupEvent } from 'net.neoforged.fml.event.lifecycle';
  import { RegisterCommandsEvent, AddReloadListenerEvent, OnDatapackSyncEvent } from 'net.neoforged.neoforge.event';
  import { RegisterEvent } from 'net.neoforged.neoforge.registries';
  import { Consumer } from 'java.util.function';
  import { PreparableReloadListener } from 'net.minecraft.server.packs.resources';
  import { RightClickItem, EntityInteract } from 'PlayerInteractEvent';
  import { LivingDropsEvent } from 'net.neoforged.neoforge.event.entity.living';
  import { Pre } from 'EntityTickEvent';
  import { EntityJoinLevelEvent } from 'net.neoforged.neoforge.event.entity';
  import { StartTracking } from 'PlayerEvent';
  import { Pre as leveltickevent_Pre } from 'LevelTickEvent';

  class AccessoriesForge {
    static readonly HOLDER_ATTACHMENT_TYPE: AttachmentType;
    static readonly CAPABILITY: EntityCapability;
    static BUS: IEventBus;
    constructor(eventBus: IEventBus);
    addTo<T>(item: Item, componentType: DataComponentType<T>, component: T): void;
    attemptEquipFromUse(event: RightClickItem): void;
    attemptEquipOnEntity(event: EntityInteract): void;
    commonInit(event: FMLCommonSetupEvent): void;
    intermediateRegisterListeners(registrationMethod: Consumer<PreparableReloadListener>): void;
    onDataSync(event: OnDatapackSyncEvent): void;
    onEntityDeath(event: LivingDropsEvent): void;
    onEntityLoad(event: EntityJoinLevelEvent): void;
    onLivingEntityTick(event: Pre): void;
    onStartTracking(event: StartTracking): void;
    onWorldTick(event: leveltickevent_Pre): void;
    registerCapabilities(event: RegisterCapabilitiesEvent): void;
    registerCommands(event: RegisterCommandsEvent): void;
    registerReloadListeners(event: AddReloadListenerEvent): void;
    registerStuff(event: RegisterEvent): void;
  }

}

declare module 'io.wispforest.accessories.neoforge.client' {
  import { IEventBus } from 'net.neoforged.bus.api';
  import { RegisterMenuScreensEvent, RegisterKeyMappingsEvent, RegisterShadersEvent } from 'net.neoforged.neoforge.client.event';
  import { LoggingIn } from 'ClientPlayerNetworkEvent';
  import { FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';
  import { Pre } from 'ClientTickEvent';
  import { ItemTooltipEvent } from 'net.neoforged.neoforge.event.entity.player';
  import { AddLayers } from 'EntityRenderersEvent';

  class AccessoriesClientForge {
    constructor(eventBus: IEventBus);
    addRenderLayer(event: AddLayers): void;
    static clientTick(event: Pre): void;
    initKeybindings(event: RegisterKeyMappingsEvent): void;
    static itemTooltipCallback(event: ItemTooltipEvent): void;
    onInitializeClient(event: FMLClientSetupEvent): void;
    onJoin(loggingInEvent: LoggingIn): void;
    registerMenuType(event: RegisterMenuScreensEvent): void;
    registerShader(event: RegisterShadersEvent): void;
  }

}

declare module 'io.wispforest.accessories.neoforge.compat' {
  import { AccessoriesClientREIPlugin } from 'io.wispforest.accessories.compat.rei';

  interface NeoAccessoriesClientREIPlugin extends AccessoriesClientREIPlugin {}
  class NeoAccessoriesClientREIPlugin extends AccessoriesClientREIPlugin {
  }

}

declare module 'io.wispforest.accessories.neoforge.mixin' {
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { Set, List } from 'java.util';
  import { ClassNode } from 'org.objectweb.asm.tree';

  interface AccessoriesNeoforgeMixinConfig extends IMixinConfigPlugin {}
  class AccessoriesNeoforgeMixinConfig extends IMixinConfigPlugin {
    acceptTargets(myTargets: Set<string>, otherTargets: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    onLoad(mixinPackage: string): void;
    postApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    preApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    shouldApplyMixin(targetClassName: string, mixinClassName: string): boolean;
  }


  class NeoForgeLoadingOverlayMixin {
  }

}

declare module 'io.wispforest.accessories.neoforge.mixin.client' {
  import { ContainerScreenExtension } from 'io.wispforest.accessories.pond';
  import { RenderLayer } from 'net.minecraft.client.renderer.entity.layers';
  import { ArmorRenderingExtension } from 'io.wispforest.accessories.api.client';
  import { RenderLayerParent } from 'net.minecraft.client.renderer.entity';
  import { ItemStack } from 'net.minecraft.world.item';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { EquipmentSlot } from 'net.minecraft.world.entity';

  interface AbstractContainerScreenMixin extends ContainerScreenExtension {}
  class AbstractContainerScreenMixin extends ContainerScreenExtension {
  }


  interface HumanoidArmorLayerMixin<T extends LivingEntity = any, M extends HumanoidModel<T> = any, A extends HumanoidModel<T> = any> extends ArmorRenderingExtension<T>, RenderLayer<T, M> {}
  class HumanoidArmorLayerMixin<T extends LivingEntity = any, M extends HumanoidModel<T> = any, A extends HumanoidModel<T> = any> extends ArmorRenderingExtension<T> {
    constructor(renderer: RenderLayerParent<T, M>);
    renderEquipmentStack(stack: ItemStack, poseStack: PoseStack, multiBufferSource: MultiBufferSource, livingEntity: T, equipmentSlot: EquipmentSlot, light: number, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }


  class LivingEntityRendererMixin<T extends LivingEntity = any, M extends EntityModel<T> = any> {
  }


  class PostEffectBufferMixin {
  }

}

declare module 'io.wispforest.accessories.neoforge.mixin.curios' {
  class CurioInventoryMixin {
  }

}

declare module 'io.wispforest.accessories.networking' {
  import { OwoNetChannel, ClientAccess, ServerAccess } from 'io.wispforest.owo.network';
  import { ChannelHandler } from 'OwoNetChannel';
  import { BiConsumer } from 'java.util.function';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { MinecraftServer } from 'net.minecraft.server';
  import { Entity } from 'net.minecraft.world.entity';

  class AccessoriesNetworking {
    static readonly CHANNEL: OwoNetChannel;
    static clientHandler<R extends Record>(consumer: BiConsumer<R, Player>): ChannelHandler<R, ClientAccess>;
    static init(): void;
    static initClient(): void;
    static sendToAllPlayers<R extends Record>(server: MinecraftServer, packet: R): void;
    static sendToPlayer<R extends Record>(player: ServerPlayer, packet: R): void;
    static sendToServer<R extends Record>(packet: R): void;
    static sendToTrackingAndSelf<R extends Record>(entity: Entity, packet: R): void;
    static serverHandler<R extends Record>(consumer: BiConsumer<R, Player>): ChannelHandler<R, ServerAccess>;
  }

}

declare module 'io.wispforest.accessories.pond' {
  import { AccessoriesCapability, AccessoriesHolder } from 'io.wispforest.accessories.api';
  import { SlotReference } from 'io.wispforest.accessories.api.slot';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ArmorSlot, Slot } from 'net.minecraft.world.inventory';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Boolean } from 'java.lang';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { LivingEntity, EquipmentSlot, Saddleable, ItemBasedSteering } from 'net.minecraft.world.entity';
  import { Consumer } from 'java.util.function';
  import { Collection, Optional } from 'java.util';
  import { ModelPart } from 'net.minecraft.client.model.geom';

  class AccessoriesAPIAccess {
    accessoriesCapability(): AccessoriesCapability;
    accessoriesHolder(): AccessoriesHolder;
  }


  class AccessoriesFrameBufferExtension {
    accessories$setUseHighlightShader(var1: boolean): void;
  }


  class AccessoriesLivingEntityExtension {
    onEquipItem(var1: SlotReference, var2: ItemStack, var3: ItemStack): void;
  }


  class ArmorSlotExtension {
    get atlasLocation(): ResourceLocation;
    set atlasLocation(atlasLocation: ResourceLocation);
  }


  class CloseContainerTransfer {
    accessories$setScreenTransfer(var1: Screen): void;
  }


  class ContainerScreenExtension {
    forceRenderSlot(context: GuiGraphics, slot: Slot): void;
    hoverStackOffset(): number;
    isHovering_Logical(slot: Slot, mouseX: number, mouseY: number): boolean;
    isHovering_Rendering(slot: Slot, mouseX: number, mouseY: number): boolean;
    shouldRenderSlot(slot: Slot): boolean;
  }


  class CosmeticArmorLookupTogglable {
    get lookupToggle(): boolean;
    static getAlternativeStack(livingEntity: LivingEntity, equipmentSlot: EquipmentSlot, consumer: Consumer<ItemStack>): void;
    set lookupToggle(value: boolean);
  }


  class DroppedStacksExtension {
    addToBeDroppedStacks(var1: Collection<ItemStack>): void;
    toBeDroppedStacks(): Collection<ItemStack>;
  }


  interface ItemBasedSteerable extends Saddleable {}
  class ItemBasedSteerable extends Saddleable {
    get instance(): ItemBasedSteering;
  }


  class ModelPartLoadingHelper {
    accessories$clearQueue(): void;
    accessories$pollRoot(): ModelPart;
    accessories$pushRoot(root: ModelPart): void;
  }


  class ModelRootAccess {
    accessories$getAnyDescendantWithName(name: string): Optional<ModelPart>;
    accessories$rootPart(): ModelPart;
  }

}

declare module 'io.wispforest.accessories.pond.owo' {
  import { Component } from 'io.wispforest.owo.ui.core';
  import { Runnable } from 'java.lang';
  import { AbstractPolygon } from 'io.wispforest.accessories.client.gui.utils';
  import { List } from 'java.util';

  class ComponentExtension<T extends Component = any> {
    allowIndividualOverdraw(var1: boolean): T;
    allowIndividualOverdraw(): boolean;
    static bypassCheck(component: Component, runnable: Runnable): void;
  }


  class ExclusiveBoundingArea<T extends Component = any> {
    addExclusionZone<P extends AbstractPolygon>(...components: Component[]): T;
    addExclusionZone<P extends AbstractPolygon>(...var1: P[]): T;
    addExclusionZone<P extends AbstractPolygon>(var1: P[]): T;
    get exclusionZones(): AbstractPolygon[];
    isWithinExclusionZone(x: number, y: number): boolean;
  }


  class InclusiveBoundingArea<T extends Component = any> {
    addInclusionZone<P extends AbstractPolygon>(...components: Component[]): T;
    addInclusionZone<P extends AbstractPolygon>(...var1: P[]): T;
    addInclusionZone<P extends AbstractPolygon>(var1: P[]): T;
    get inclusionZones(): AbstractPolygon[];
    isWithinInclusionZone(x: number, y: number): boolean;
  }


  interface MutableBoundingArea<T extends Component = any> extends InclusiveBoundingArea<T>, ExclusiveBoundingArea<T> {}
  class MutableBoundingArea<T extends Component = any> extends InclusiveBoundingArea<T> {
    deepRecursiveChecking(var1: boolean): T;
    deepRecursiveChecking(): boolean;
  }

}

declare module 'io.wispforest.accessories.pond.stack' {
  import { EventStream } from 'io.wispforest.owo.util';
  import { ItemStackMutation } from 'io.wispforest.accessories.utils';
  import { ItemStack } from 'net.minecraft.world.item';

  class PatchedDataComponentMapExtension {
    accessories$getMutationEvent(var1: ItemStack): EventStream<ItemStackMutation>;
    accessories$hasChanged(): boolean;
  }

}

declare module 'io.wispforest.accessories.utils' {
  import { StructEndec, SerializationAttribute, SerializationContext, Serializer, Deserializer, Endec } from 'io.wispforest.endec';
  import { Struct } from 'Serializer';
  import { Struct as deserializer_Struct } from 'Deserializer';
  import { Logger } from 'org.slf4j';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { AccessoryAttributeBuilder } from 'io.wispforest.accessories.api.attributes';
  import { Collector } from 'java.util.stream';
  import { Entry } from 'Map';
  import { LinkedHashMap, Map, List, Set, Collection, Iterator } from 'java.util';
  import { Function, BiConsumer, IntFunction, Consumer, Predicate, BiFunction } from 'java.util.function';
  import { SimpleJsonResourceReloadListener } from 'net.minecraft.server.packs.resources';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Provider } from 'HolderLookup';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Function3, Function4 } from 'StructEndecBuilder';
  import { MapCarrier } from 'io.wispforest.endec.util';
  import { Class, Enum, Throwable } from 'java.lang';
  import { MutableObject } from 'org.apache.commons.lang3.mutable';
  import { EventStream } from 'io.wispforest.owo.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { DataComponentType } from 'net.minecraft.core.component';
  import { BiMap } from 'com.google.common.collect';
  import { Level } from 'net.minecraft.world.level';
  import { OwoNetChannel } from 'io.wispforest.owo.network';
  import { Player } from 'net.minecraft.world.entity.player';

  class AttributeStructEndecBuilder<T = any> {
    constructor(endec: StructEndec<T>, attribute: SerializationAttribute);
    decodeStruct(ctx: SerializationContext, deserializer: Deserializer<any>, struct: deserializer_Struct): T;
    encodeStruct(ctx: SerializationContext, serializer: Serializer<any>, struct: Struct, value: T): void;
    orElse(endec: StructEndec<T>): StructEndec<T>;
    orElseIf(endec: StructEndec<T>, attribute: SerializationAttribute): AttributeStructEndecBuilder<T>;
    orElseIf(attribute: SerializationAttribute, endec: StructEndec<T>): AttributeStructEndecBuilder<T>;
  }


  class AttributeUtils {
    static readonly LOGGER: Logger;
    static readonly ATTRIBUTE_MODIFIER_ENDEC: StructEndec;
    static addTransientAttributeModifiers(livingEntity: LivingEntity, attributes: AccessoryAttributeBuilder): void;
    static removeTransientAttributeModifiers(livingEntity: LivingEntity, attributes: AccessoryAttributeBuilder): void;
  }


  class CollectionUtils {
    static toLinkedMap<K, V>(): Collector<Entry<K, V>, any, LinkedHashMap<K, V>>;
    static toLinkedMap<T, K>(keyMapper: Function<T, K>): Collector<T, any, LinkedHashMap<K, T>>;
  }


  interface EndecDataLoader<T = any> extends SimpleJsonResourceReloadListener {}
  class EndecDataLoader<T = any> extends SimpleJsonResourceReloadListener {
    static client<T>(id: ResourceLocation, type: string, endec: Endec<T>, handleEntry: BiConsumer<ResourceLocation, T>, identifier: ResourceLocation, t: T): EndecDataLoader<T>;
    get loaderId(): ResourceLocation;
    handleRawEntry(var1: ResourceLocation, var2: T): void;
    static server<T>(registries: Provider, id: ResourceLocation, type: string, endec: Endec<T>, handleEntry: BiConsumer<ResourceLocation, T>, identifier: ResourceLocation, t: T): EndecDataLoader<T>;
  }


  class EndecUtils {
    static readonly NBT_LIST: Endec;
    static readonly TRI_STATE_ENDEC: Endec;
    static readonly VECTOR_2_I_ENDEC: Endec;
    static readonly VECTOR_3_F_ENDEC: StructEndec;
    static readonly QUATERNIONF_COMPONENTS: StructEndec;
    static readonly AXISANGLE4F: StructEndec;
    static readonly MATRIX4F: Endec;
    static blockStateEndec(typeKey: string): StructEndec<BlockState>;
    static dfuKeysCarrier(carrier: MapCarrier, changedKeys: Map<string, string>): void;
    static forEnumStringRepresentable<E extends Enum<E>>(enumClass: Class<E>): Endec<E>;
    static map<K, V, M extends Map<K, V>>(mapConstructor: IntFunction<M>, keyToString: Function<K, string>, stringToKey: Function<string, K>, valueEndec: Endec<V>): Endec<M>;
    static structifyEndec<T>(endec: Endec<T>): StructEndec<T>;
    static structifyEndec<T>(fieldName: string, endec: Endec<T>): StructEndec<T>;
    static vectorEndec<C, V>(name: string, componentEndec: Endec<C>, constructor: Function3<C, C, C, V>, xGetter: Function<V, C>, yGetter: Function<V, C>, zGetter: Function<V, C>): StructEndec<V>;
    static vectorEndec<C, V>(name: string, componentEndec: Endec<C>, constructor: Function3<C, C, C, V>, xGetter: Function<V, C>, yGetter: Function<V, C>, zGetter: Function<V, C>, defaultValue: C): StructEndec<V>;
    static vectorEndec<C, V>(name: string, componentEndec: Endec<C>, constructor: Function4<C, C, C, C, V>, xGetter: Function<V, C>, yGetter: Function<V, C>, zGetter: Function<V, C>, wGetter: Function<V, C>): StructEndec<V>;
    static wrappedEndec<T>(fieldName: string, endec: Endec<T>): StructEndec<MutableObject<T>>;
  }


  class HashUtils {
    static getHash(throwable: Throwable): number;
  }


  class ItemStackMutation {
    static getEvent(stack: ItemStack): EventStream<ItemStackMutation>;
    onMutation(var1: ItemStack, var2: DataComponentType<any>[]): void;
  }


  interface ManagedEndecDataLoader<T = any> extends EndecDataLoader<T> {}
  class ManagedEndecDataLoader<T = any> extends EndecDataLoader<T> {
    getEntries(level: Level): Map<ResourceLocation, T>;
    getEntries(isClientSide: boolean): Map<ResourceLocation, T>;
    getEntry(id: ResourceLocation, level: Level): T;
    getEntry(id: ResourceLocation, isClientSide: boolean): T;
    getId(t: T, level: Level): ResourceLocation;
    getId(t: T, isClientSide: boolean): ResourceLocation;
    static getLoader<T>(id: ResourceLocation): ManagedEndecDataLoader<T>;
    static init(channel: OwoNetChannel, hookRegistration: Consumer<Consumer<Player>>): void;
    static initClient(channel: OwoNetChannel): void;
    mapEndec(): Endec<BiMap<ResourceLocation, T>>;
    static of<T>(id: ResourceLocation, type: string, endec: Endec<T>): ManagedEndecDataLoader<T>;
    onEntryAdd(value: BiConsumer<ResourceLocation, T>): ManagedEndecDataLoader<T>;
  }


  interface ValidatingForwardingMap<K = any, V = any> extends Map<K, V> {}
  class ValidatingForwardingMap<K = any, V = any> extends Map<K, V> {
    constructor(innerMap: Map<K, V>, clazzK: Class<K>, clazzV: Class<V>, keyValidator: Predicate<K>, keyGetter: Function<V, K>);
    clear(): void;
    compute(key: K, remappingFunction: BiFunction<K, V, V>): V;
    computeIfAbsent(key: K, mappingFunction: Function<K, V>): V;
    computeIfPresent(key: K, remappingFunction: BiFunction<K, V, V>): V;
    containsKey(key: any): boolean;
    containsValue(value: any): boolean;
    entrySet(): Set<Entry<K, V>>;
    equals(o: any): boolean;
    get(key: any): V;
    hashCode(): number;
    isEmpty(): boolean;
    keySet(): Set<K>;
    merge(key: K, value: V, remappingFunction: BiFunction<V, V, V>): V;
    put(key: K, value: V): V;
    putAll(map: Map<K, V>): void;
    putIfAbsent(key: K, value: V): V;
    remove(key: any, value: any): boolean;
    remove(key: any): V;
    replace(key: K, oldValue: V, newValue: V): boolean;
    replace(key: K, value: V): V;
    replaceAll(functionParameter: BiFunction<K, V, V>): void;
    size(): number;
    values(): Collection<V>;
  }


  interface WrappingCollection<K = any, C extends Collection<K> = any> extends Collection<K> {}
  class WrappingCollection<K = any, C extends Collection<K> = any> extends Collection<K> {
    add(k: K): boolean;
    addAll(c: Collection<K>): boolean;
    clear(): void;
    contains(o: any): boolean;
    containsAll(c: Collection<any>): boolean;
    hasNext(): boolean;
    isEmpty(): boolean;
    iterator(): Iterator<K>;
    next(): K;
    remove(o: any): boolean;
    removeAll(c: Collection<any>): boolean;
    retainAll(c: Collection<any>): boolean;
    size(): number;
    toArray(): any[];
    toArray<T>(a: T[]): T[];
  }


  interface WrappingSet<K = any, S extends Set<K> = any> extends Set<K>, WrappingCollection<K, S> {}
  class WrappingSet<K = any, S extends Set<K> = any> extends Set<K> {
    static of<K, V>(innerSet: Set<Entry<K, V>>, classT: Class<K>, keyValidator: Predicate<K>): Set<Entry<K, V>>;
  }

}

declare module 'io.wispforest.accessories.utils.EndecUtils' {
  import { StructEndec, SerializationContext, Serializer, Deserializer } from 'io.wispforest.endec';
  import { Supplier } from 'java.util.function';
  import { Struct } from 'Serializer';
  import { Struct as deserializer_Struct } from 'Deserializer';

  interface LazyStructEndec<T = any> extends StructEndec<T> {}
  class LazyStructEndec<T = any> extends StructEndec<T> {
    constructor(supplier: Supplier<StructEndec<T>>);
    decodeStruct(ctx: SerializationContext, deserializer: Deserializer<any>, struct: deserializer_Struct): T;
    encodeStruct(ctx: SerializationContext, serializer: Serializer<any>, struct: Struct, value: T): void;
    toString(): string;
  }

}