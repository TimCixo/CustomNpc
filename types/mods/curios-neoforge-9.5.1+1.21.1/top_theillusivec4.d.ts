declare module 'top.theillusivec4.curios.api.client' {
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { Supplier } from 'java.util.function';
  import { Optional } from 'java.util';
  import { SlotContext } from 'top.theillusivec4.curios.api';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { RenderLayerParent } from 'net.minecraft.client.renderer.entity';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { EntityModel, HumanoidModel } from 'net.minecraft.client.model';
  import { ModelPart } from 'net.minecraft.client.model.geom';

  class CuriosRendererRegistry {
    static getRenderer(item: Item): Optional<ICurioRenderer>;
    static load(): void;
    static register(item: Item, renderer: Supplier<ICurioRenderer>): void;
  }


  class ICurioRenderer {
    static followBodyRotations(livingEntity: LivingEntity, ...models: HumanoidModel<LivingEntity>[]): void;
    static followHeadRotations(livingEntity: LivingEntity, ...renderers: ModelPart[]): void;
    render<T extends LivingEntity, M extends EntityModel<T>>(var1: ItemStack, var2: SlotContext, var3: PoseStack, var4: RenderLayerParent<T, M>, var5: MultiBufferSource, var6: number, var7: number, var8: number, var9: number, var10: number, var11: number, var12: number): void;
    static rotateIfSneaking(matrixStack: PoseStack, livingEntity: LivingEntity): void;
    static translateIfSneaking(matrixStack: PoseStack, livingEntity: LivingEntity): void;
  }


  class ICuriosScreen {
  }

}

declare module 'top.theillusivec4.curios.api.CurioAttributeModifiers' {
  import { Holder } from 'net.minecraft.core';
  import { Attribute, AttributeModifier } from 'net.minecraft.world.entity.ai.attributes';
  import { CurioAttributeModifiers } from 'top.theillusivec4.curios.api';

  class Builder {
    add(attribute: Holder<Attribute>, attributeModifier: AttributeModifier, slot: string): Builder;
    build(): CurioAttributeModifiers;
  }

}

declare module 'top.theillusivec4.curios.api' {
  import { Item, ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { ICurioItem, ICurio, ICuriosItemHandler } from 'top.theillusivec4.curios.api.type.capability';
  import { Optional, Map, Set, List } from 'java.util';
  import { ISlotType } from 'top.theillusivec4.curios.api.type';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { LivingEntity, EntityType, EquipmentSlotGroup } from 'net.minecraft.world.entity';
  import { Multimap } from 'com.google.common.collect';
  import { Holder } from 'net.minecraft.core';
  import { Attribute, AttributeModifier } from 'net.minecraft.world.entity.ai.attributes';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Operation } from 'AttributeModifier';
  import { ItemAttributeModifiers } from 'net.minecraft.world.item.component';
  import { Predicate } from 'java.util.function';
  import { IIconHelper, ICuriosHelper, ISlotHelper } from 'top.theillusivec4.curios.api.type.util';
  import { EntityCapability, ItemCapability } from 'net.neoforged.neoforge.capabilities';
  import { DataProvider, PackOutput, CachedOutput } from 'net.minecraft.data';
  import { ExistingFileHelper } from 'net.neoforged.neoforge.common.data';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Provider } from 'HolderLookup';
  import { ISlotData, IEntitiesData } from 'top.theillusivec4.curios.api.type.data';
  import { TagKey } from 'net.minecraft.tags';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { EquipBuilder } from 'top.theillusivec4.curios.api.CuriosTriggers';
  import { Criterion, CriterionTriggerInstance } from 'net.minecraft.advancements';
  import { Builder } from 'ItemPredicate';
  import { Builder as locationpredicate_Builder } from 'LocationPredicate';
  import { Integer, Enum } from 'java.lang';
  import { Builder as top_theillusivec4_curios_api_slottypemessage_Builder } from 'top.theillusivec4.curios.api.SlotTypeMessage';

  class CuriosApi {
    static readonly MODID: string;
    static addModifier(stack: ItemStack, attribute: Holder<Attribute>, id: ResourceLocation, amount: number, operation: Operation, slot: string): void;
    static addSlotModifier(map: Multimap<Holder<Attribute>, AttributeModifier>, identifier: string, id: ResourceLocation, amount: number, operation: Operation): void;
    static addSlotModifier(stack: ItemStack, identifier: string, id: ResourceLocation, amount: number, operation: Operation, slot: string): void;
    static broadcastCurioBreakEvent(slotContext: SlotContext): void;
    static get curioPredicates(): Map<ResourceLocation, Predicate<SlotResult>>;
    static get curiosHelper(): ICuriosHelper;
    static get iconHelper(): IIconHelper;
    static get playerSlots(): Map<string, ISlotType>;
    static get slotHelper(): ISlotHelper;
    static get slots(): Map<string, ISlotType>;
    static getAttributeModifiers(slotContext: SlotContext, id: ResourceLocation, stack: ItemStack): Multimap<Holder<Attribute>, AttributeModifier>;
    static getCurio(stack: ItemStack): Optional<ICurio>;
    static getCurioPredicate(resourceLocation: ResourceLocation): Optional<Predicate<SlotResult>>;
    static getCuriosInventory(livingEntity: LivingEntity): Optional<ICuriosItemHandler>;
    static getEntitySlots(livingEntity: LivingEntity): Map<string, ISlotType>;
    static getEntitySlots(type: EntityType<any>, level: Level): Map<string, ISlotType>;
    static getEntitySlots(type: EntityType<any>, isClient: boolean): Map<string, ISlotType>;
    static getEntitySlots(type: EntityType<any>): Map<string, ISlotType>;
    static getItemStackSlots(stack: ItemStack, level: Level): Map<string, ISlotType>;
    static getItemStackSlots(stack: ItemStack, isClient: boolean): Map<string, ISlotType>;
    static getItemStackSlots(stack: ItemStack, livingEntity: LivingEntity): Map<string, ISlotType>;
    static getItemStackSlots(stack: ItemStack): Map<string, ISlotType>;
    static getPlayerSlots(level: Level): Map<string, ISlotType>;
    static getPlayerSlots(isClient: boolean): Map<string, ISlotType>;
    static getPlayerSlots(player: Player): Map<string, ISlotType>;
    static getSlot(id: string, level: Level): Optional<ISlotType>;
    static getSlot(id: string, isClient: boolean): Optional<ISlotType>;
    static getSlot(id: string): Optional<ISlotType>;
    static getSlotIcon(id: string): ResourceLocation;
    static getSlotId(slotContext: SlotContext): ResourceLocation;
    static getSlots(level: Level): Map<string, ISlotType>;
    static getSlots(isClient: boolean): Map<string, ISlotType>;
    static isStackValid(slotContext: SlotContext, stack: ItemStack): boolean;
    static registerCurio(item: Item, curio: ICurioItem): void;
    static registerCurioPredicate(resourceLocation: ResourceLocation, predicate: Predicate<SlotResult>): void;
    static set curiosHelper(helper: ICuriosHelper);
    static set iconHelper(helper: IIconHelper);
    static set slotHelper(helper: ISlotHelper);
    static testCurioPredicates(predicates: Set<ResourceLocation>, slotResult: SlotResult): boolean;
    static withSlotModifier(itemAttributeModifiers: ItemAttributeModifiers, identifier: string, id: ResourceLocation, amount: number, operation: Operation, slotGroup: EquipmentSlotGroup): ItemAttributeModifiers;
  }


  class CuriosCapability {
    static readonly ID_INVENTORY: ResourceLocation;
    static readonly ID_ITEM_HANDLER: ResourceLocation;
    static readonly ID_ITEM: ResourceLocation;
    static readonly INVENTORY: EntityCapability;
    static readonly ITEM_HANDLER: EntityCapability;
    static readonly ITEM: ItemCapability;
  }


  interface CuriosDataProvider extends DataProvider {}
  class CuriosDataProvider extends DataProvider {
    constructor(modId: string, output: PackOutput, fileHelper: ExistingFileHelper, registries: CompletableFuture<Provider>);
    copyEntities(id: string, copyId: string): IEntitiesData;
    copySlot(id: string, copyId: string): ISlotData;
    createEntities(id: string): IEntitiesData;
    createSlot(id: string): ISlotData;
    generate(var1: Provider, var2: ExistingFileHelper): void;
    get name(): string;
    run(pOutput: CachedOutput): CompletableFuture<any>;
  }


  class CuriosTags {
    static readonly BACK: TagKey;
    static readonly BELT: TagKey;
    static readonly BODY: TagKey;
    static readonly BRACELET: TagKey;
    static readonly CHARM: TagKey;
    static readonly CURIO: TagKey;
    static readonly HANDS: TagKey;
    static readonly HEAD: TagKey;
    static readonly NECKLACE: TagKey;
    static readonly RING: TagKey;
    static createItemTag(id: string): TagKey<Item>;
  }


  class CuriosTooltip {
    append(component: Component): CuriosTooltip;
    appendAdditive(component: MutableComponent): CuriosTooltip;
    appendEqual(component: MutableComponent): CuriosTooltip;
    appendHeader(component: MutableComponent): CuriosTooltip;
    appendSlotHeader(identifier: string): CuriosTooltip;
    appendSubtractive(component: MutableComponent): CuriosTooltip;
    build(): Component[];
    forSlots(...identifiers: string[]): CuriosTooltip;
    forSlots(stack: ItemStack): CuriosTooltip;
    forSlots(stack: ItemStack, livingEntity: LivingEntity): CuriosTooltip;
  }


  class CuriosTriggers {
    static equip(): EquipBuilder;
    static equip(itemPredicate: Builder): Criterion<CriterionTriggerInstance>;
    static equipAtLocation(itemPredicate: Builder, locationPredicate: locationpredicate_Builder): Criterion<CriterionTriggerInstance>;
  }


  interface SlotAttribute extends Attribute {}
  class SlotAttribute extends Attribute {
    get identifier(): string;
    static getOrCreate(id: string): Holder<Attribute>;
    toComponent(modif: AttributeModifier, flag: TooltipFlag): MutableComponent;
  }


  class SlotTypeMessage {
    static readonly REGISTER_TYPE: string;
    static readonly MODIFY_TYPE: string;
    get icon(): ResourceLocation;
    get identifier(): string;
    get priority(): number;
    get size(): number;
    hasCosmetic(): boolean;
    isLocked(): boolean;
    isVisible(): boolean;
  }


  interface SlotTypePreset extends Enum<SlotTypePreset> {}
  class SlotTypePreset extends Enum<SlotTypePreset> {
    static readonly HEAD: SlotTypePreset;
    static readonly NECKLACE: SlotTypePreset;
    static readonly BACK: SlotTypePreset;
    static readonly BODY: SlotTypePreset;
    static readonly BRACELET: SlotTypePreset;
    static readonly HANDS: SlotTypePreset;
    static readonly RING: SlotTypePreset;
    static readonly BELT: SlotTypePreset;
    static readonly CHARM: SlotTypePreset;
    static readonly CURIO: SlotTypePreset;
    static findPreset(id: string): Optional<SlotTypePreset>;
    get identifier(): string;
    get messageBuilder(): top_theillusivec4_curios_api_slottypemessage_Builder;
    static valueOf(name: string): SlotTypePreset;
    static values(): SlotTypePreset[];
  }

}

declare module 'top.theillusivec4.curios.api.CuriosTriggers' {
  import { Builder } from 'ItemPredicate';
  import { Builder as locationpredicate_Builder } from 'LocationPredicate';
  import { Builder as top_theillusivec4_curios_api_slotpredicate_Builder } from 'top.theillusivec4.curios.api.SlotPredicate';
  import { Criterion, CriterionTriggerInstance } from 'net.minecraft.advancements';

  class EquipBuilder {
    build(): Criterion<CriterionTriggerInstance>;
    withItem(builder: Builder): EquipBuilder;
    withLocation(builder: locationpredicate_Builder): EquipBuilder;
    withSlot(builder: top_theillusivec4_curios_api_slotpredicate_Builder): EquipBuilder;
  }

}

declare module 'top.theillusivec4.curios.api.event' {
  import { Event, ICancellableEvent } from 'net.neoforged.bus.api';
  import { ItemStack } from 'net.minecraft.world.item';
  import { SlotContext } from 'top.theillusivec4.curios.api';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Multimap, ImmutableList } from 'com.google.common.collect';
  import { Holder } from 'net.minecraft.core';
  import { Attribute, AttributeModifier } from 'net.minecraft.world.entity.ai.attributes';
  import { Collection, Set } from 'java.util';
  import { LivingEvent } from 'net.neoforged.neoforge.event.entity.living';
  import { TriState } from 'net.neoforged.neoforge.common.util';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { ICuriosItemHandler } from 'top.theillusivec4.curios.api.type.capability';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { ItemEntity } from 'net.minecraft.world.entity.item';
  import { Predicate } from 'java.util.function';
  import { DropRule } from 'top.theillusivec4.curios.api.type.capability.ICurio';
  import { Tuple } from 'net.minecraft.util';
  import { DropRule> } from 'ICurio';

  interface CurioAttributeModifierEvent extends Event {}
  class CurioAttributeModifierEvent extends Event {
    constructor(stack: ItemStack, slotContext: SlotContext, id: ResourceLocation, modifiers: Multimap<Holder<Attribute>, AttributeModifier>);
    addModifier(attribute: Holder<Attribute>, modifier: AttributeModifier): boolean;
    clearModifiers(): void;
    get id(): ResourceLocation;
    get itemStack(): ItemStack;
    get modifiers(): Multimap<Holder<Attribute>, AttributeModifier>;
    get originalModifiers(): Multimap<Holder<Attribute>, AttributeModifier>;
    get slotContext(): SlotContext;
    removeAttribute(attribute: Holder<Attribute>): Collection<AttributeModifier>;
    removeModifier(attribute: Holder<Attribute>, modifier: AttributeModifier): boolean;
  }


  interface CurioCanEquipEvent extends LivingEvent {}
  class CurioCanEquipEvent extends LivingEvent {
    constructor(stack: ItemStack, slotContext: SlotContext, result: TriState);

    constructor(stack: ItemStack, slotContext: SlotContext);
    get equipResult(): TriState;
    get slotContext(): SlotContext;
    get stack(): ItemStack;
    set equipResult(result: TriState);
  }


  interface CurioCanUnequipEvent extends LivingEvent {}
  class CurioCanUnequipEvent extends LivingEvent {
    constructor(stack: ItemStack, slotContext: SlotContext);
    get slotContext(): SlotContext;
    get stack(): ItemStack;
    get unequipResult(): TriState;
    set unequipResult(result: TriState);
  }


  interface CurioChangeEvent extends LivingEvent {}
  class CurioChangeEvent extends LivingEvent {
    constructor(living: LivingEntity, type: string, index: number, from: ItemStack, to: ItemStack);
    get from(): ItemStack;
    get identifier(): string;
    get slotIndex(): number;
    get to(): ItemStack;
  }


  interface CurioDropsEvent extends ICancellableEvent, LivingEvent {}
  class CurioDropsEvent extends ICancellableEvent {
    constructor(entity: LivingEntity, handler: ICuriosItemHandler, source: DamageSource, drops: Collection<ItemEntity>, lootingLevel: number, recentlyHit: boolean);
    get curioHandler(): ICuriosItemHandler;
    get drops(): Collection<ItemEntity>;
    get lootingLevel(): number;
    get source(): DamageSource;
    isRecentlyHit(): boolean;
  }


  interface DropRulesEvent extends LivingEvent {}
  class DropRulesEvent extends LivingEvent {
    constructor(entity: LivingEntity, handler: ICuriosItemHandler, source: DamageSource, lootingLevel: number, recentlyHit: boolean);
    addOverride(predicate: Predicate<ItemStack>, dropRule: DropRule): void;
    get curioHandler(): ICuriosItemHandler;
    get lootingLevel(): number;
    get overrides(): ImmutableList<Tuple<Predicate<ItemStack>, DropRule>>;
    get source(): DamageSource;
    isRecentlyHit(): boolean;
  }


  interface SlotModifiersUpdatedEvent extends LivingEvent {}
  class SlotModifiersUpdatedEvent extends LivingEvent {
    constructor(livingEntity: LivingEntity, types: Set<string>);
    get types(): Set<string>;
  }

}

declare module 'top.theillusivec4.curios.api.extensions' {
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { SlotContext } from 'top.theillusivec4.curios.api';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { Event } from 'net.neoforged.bus.api';
  import { IModBusEvent } from 'net.neoforged.fml.event';

  class CuriosExtensions {
  }


  class ICurioSlotExtension {
    static readonly DEFAULT: ICurioSlotExtension;
    static from(id: string): ICurioSlotExtension;
    getCloneStack(slotContext: SlotContext, defaultStack: ItemStack): ItemStack;
    getDisplayStack(slotContext: SlotContext, defaultStack: ItemStack): ItemStack;
    getSlotTooltip(slotContext: SlotContext, tooltipFlag: TooltipFlag): Component[];
  }


  interface RegisterCuriosExtensionsEvent extends IModBusEvent, Event {}
  class RegisterCuriosExtensionsEvent extends IModBusEvent {
    isSlotExtensionRegistered(slotId: string): boolean;
    registerSlotExtension(extension: ICurioSlotExtension, ...slotIds: string[]): void;
  }

}

declare module 'top.theillusivec4.curios.api.SlotPredicate' {
  import { Ints } from 'MinMaxBounds';
  import { SlotPredicate } from 'top.theillusivec4.curios.api';

  class Builder {
    build(): SlotPredicate;
    of(...identifiers: string[]): Builder;
    static slot(): Builder;
    withIndex(index: Ints): Builder;
  }

}

declare module 'top.theillusivec4.curios.api.SlotTypeMessage' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { SlotTypeMessage } from 'top.theillusivec4.curios.api';

  class Builder {
    constructor(identifier: string);
    build(): SlotTypeMessage;
    cosmetic(): Builder;
    hide(): Builder;
    icon(icon: ResourceLocation): Builder;
    lock(): Builder;
    priority(priority: number): Builder;
    size(size: number): Builder;
  }

}

declare module 'top.theillusivec4.curios.api.type.capability' {
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { SlotContext, SlotResult } from 'top.theillusivec4.curios.api';
  import { List, UUID, Map, Optional, Set } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { TooltipContext } from 'Item';
  import { Multimap } from 'com.google.common.collect';
  import { Holder } from 'net.minecraft.core';
  import { Attribute, AttributeModifier } from 'net.minecraft.world.entity.ai.attributes';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { SoundInfo, DropRule } from 'top.theillusivec4.curios.api.type.capability.ICurio';
  import { CompoundTag, ListTag, Tag } from 'net.minecraft.nbt';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { LootContext } from 'net.minecraft.world.level.storage.loot';
  import { EnderMan } from 'net.minecraft.world.entity.monster';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { Logger } from 'org.slf4j';
  import { ICurioStacksHandler } from 'top.theillusivec4.curios.api.type.inventory';
  import { IItemHandlerModifiable } from 'net.neoforged.neoforge.items';
  import { Predicate } from 'java.util.function';
  import { Operation } from 'AttributeModifier';

  class ICurio {
    canEquip(slotContext: SlotContext): boolean;
    canEquipFromUse(slotContext: SlotContext): boolean;
    canSync(slotContext: SlotContext): boolean;
    canUnequip(slotContext: SlotContext): boolean;
    canWalkOnPowderedSnow(slotContext: SlotContext): boolean;
    curioBreak(slotContext: SlotContext): void;
    curioTick(slotContext: SlotContext): void;
    get stack(): ItemStack;
    getAttributeModifiers(slotContext: SlotContext, uuid: UUID): Multimap<Holder<Attribute>, AttributeModifier>;
    getAttributeModifiers(slotContext: SlotContext, id: ResourceLocation): Multimap<Holder<Attribute>, AttributeModifier>;
    getAttributesTooltip(tooltips: Component[], context: TooltipContext): Component[];
    getAttributesTooltip(tooltips: Component[]): Component[];
    getDropRule(slotContext: SlotContext, source: DamageSource, recentlyHit: boolean): DropRule;
    getDropRule(slotContext: SlotContext, source: DamageSource, lootingLevel: number, recentlyHit: boolean): DropRule;
    getEquipSound(slotContext: SlotContext): SoundInfo;
    getFortuneLevel(slotContext: SlotContext, lootContext: LootContext): number;
    getLootingLevel(slotContext: SlotContext, lootContext: LootContext): number;
    getSlotsTooltip(tooltips: Component[], context: TooltipContext): Component[];
    getSlotsTooltip(tooltips: Component[]): Component[];
    isEnderMask(slotContext: SlotContext, enderMan: EnderMan): boolean;
    makesPiglinsNeutral(slotContext: SlotContext): boolean;
    onEquip(slotContext: SlotContext, prevStack: ItemStack): void;
    onEquipFromUse(slotContext: SlotContext): void;
    onUnequip(slotContext: SlotContext, newStack: ItemStack): void;
    static playBreakAnimation(stack: ItemStack, livingEntity: LivingEntity): void;
    readSyncData(slotContext: SlotContext, compound: CompoundTag): void;
    writeSyncData(slotContext: SlotContext): CompoundTag;
  }


  class ICurioItem {
    static readonly defaultInstance: ICurio;
    canEquip(slotContext: SlotContext, stack: ItemStack): boolean;
    canEquipFromUse(slotContext: SlotContext, stack: ItemStack): boolean;
    canSync(slotContext: SlotContext, stack: ItemStack): boolean;
    canUnequip(slotContext: SlotContext, stack: ItemStack): boolean;
    canWalkOnPowderedSnow(slotContext: SlotContext, stack: ItemStack): boolean;
    curioBreak(slotContext: SlotContext, stack: ItemStack): void;
    curioTick(slotContext: SlotContext, stack: ItemStack): void;
    getAttributeModifiers(slotContext: SlotContext, id: ResourceLocation, stack: ItemStack): Multimap<Holder<Attribute>, AttributeModifier>;
    getAttributeModifiers(slotContext: SlotContext, uuid: UUID, stack: ItemStack): Multimap<Holder<Attribute>, AttributeModifier>;
    getAttributesTooltip(tooltips: Component[], context: TooltipContext, stack: ItemStack): Component[];
    getAttributesTooltip(tooltips: Component[], stack: ItemStack): Component[];
    getDropRule(slotContext: SlotContext, source: DamageSource, recentlyHit: boolean, stack: ItemStack): DropRule;
    getDropRule(slotContext: SlotContext, source: DamageSource, lootingLevel: number, recentlyHit: boolean, stack: ItemStack): DropRule;
    getEquipSound(slotContext: SlotContext, stack: ItemStack): SoundInfo;
    getFortuneLevel(slotContext: SlotContext, lootContext: LootContext, stack: ItemStack): number;
    getLootingLevel(slotContext: SlotContext, lootContext: LootContext, stack: ItemStack): number;
    getSlotsTooltip(tooltips: Component[], context: TooltipContext, stack: ItemStack): Component[];
    getSlotsTooltip(tooltips: Component[], stack: ItemStack): Component[];
    hasCurioCapability(stack: ItemStack): boolean;
    isEnderMask(slotContext: SlotContext, enderMan: EnderMan, stack: ItemStack): boolean;
    makesPiglinsNeutral(slotContext: SlotContext, stack: ItemStack): boolean;
    onEquip(slotContext: SlotContext, prevStack: ItemStack, stack: ItemStack): void;
    onEquipFromUse(slotContext: SlotContext, stack: ItemStack): void;
    onUnequip(slotContext: SlotContext, newStack: ItemStack, stack: ItemStack): void;
    readSyncData(slotContext: SlotContext, compound: CompoundTag, stack: ItemStack): void;
    writeSyncData(slotContext: SlotContext, stack: ItemStack): CompoundTag;
  }


  class ICuriosItemHandler {
    static readonly LOGGER: Logger;
    addPermanentSlotModifier(slot: string, id: ResourceLocation, amount: number, operation: Operation): void;
    addPermanentSlotModifiers(var1: Multimap<string, AttributeModifier>): void;
    addTransientSlotModifier(slot: string, id: ResourceLocation, amount: number, operation: Operation): void;
    addTransientSlotModifiers(var1: Multimap<string, AttributeModifier>): void;
    clearCachedSlotModifiers(): void;
    clearSlotModifiers(): void;
    findCurio(var1: string, var2: number): Optional<SlotResult>;
    findCurio(identifier: string, index: number, includeInactive: boolean): Optional<SlotResult>;
    findCurios(var1: Item): SlotResult[];
    findCurios(var1: Predicate<ItemStack>): SlotResult[];
    findCurios(filter: Predicate<ItemStack>, includeInactive: boolean, cacheKey: string): SlotResult[];
    findCurios(...var1: string[]): SlotResult[];
    findCurios(includeInactive: boolean, ...identifiers: string[]): SlotResult[];
    findFirstCurio(var1: Item): Optional<SlotResult>;
    findFirstCurio(var1: Predicate<ItemStack>): Optional<SlotResult>;
    findFirstCurio(var1: Predicate<ItemStack>, var2: string): Optional<SlotResult>;
    findFirstCurio(filter: Predicate<ItemStack>, includeInactive: boolean, cacheKey: string): Optional<SlotResult>;
    get curios(): Map<string, ICurioStacksHandler>;
    get equippedCurios(): IItemHandlerModifiable;
    get fortuneBonus(): number;
    get lockedSlots(): Set<string>;
    get modifiers(): Multimap<string, AttributeModifier>;
    get slots(): number;
    get updatingInventories(): Set<ICurioStacksHandler>;
    get visibleSlots(): number;
    get wearer(): LivingEntity;
    getFortuneLevel(var1: LootContext): number;
    getLootingLevel(var1: LootContext): number;
    getStacksHandler(var1: string): Optional<ICurioStacksHandler>;
    growSlotType(var1: string, var2: number): void;
    handleInvalidStacks(): void;
    isEquipped(item: Item): boolean;
    isEquipped(filter: Predicate<ItemStack>): boolean;
    isSlotActive(identifier: string, index: number): boolean;
    loadInventory(var1: ListTag): void;
    lockSlotType(identifier: string): void;
    loseInvalidStack(var1: ItemStack): void;
    processSlots(): void;
    readTag(var1: Tag): void;
    removeSlotModifier(slot: string, id: ResourceLocation): void;
    removeSlotModifiers(var1: Multimap<string, AttributeModifier>): void;
    reset(): void;
    saveInventory(var1: boolean): ListTag;
    set curios(var1: Map<string, ICurioStacksHandler>);
    setEquippedCurio(var1: string, var2: number, var3: ItemStack): void;
    setSlotActive(identifier: string, index: number, active: boolean): void;
    setSlotsActive(identifier: string, active: boolean): void;
    shrinkSlotType(var1: string, var2: number): void;
    unlockSlotType(identifier: string, amount: number, visible: boolean, cosmetic: boolean): void;
    writeTag(): Tag;
  }

}

declare module 'top.theillusivec4.curios.api.type.capability.ICurio' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface DropRule extends Enum<DropRule> {}
  class DropRule extends Enum<DropRule> {
    static readonly DEFAULT: DropRule;
    static readonly ALWAYS_DROP: DropRule;
    static readonly ALWAYS_KEEP: DropRule;
    static readonly DESTROY: DropRule;
    static valueOf(name: string): DropRule;
    static values(): DropRule[];
  }

}

declare module 'top.theillusivec4.curios.api.type.data' {
  import { EntityType } from 'net.minecraft.world.entity';
  import { ICondition } from 'net.neoforged.neoforge.common.conditions';
  import { JsonObject } from 'com.google.gson';
  import { Provider } from 'HolderLookup';
  import { Operation } from 'AttributeModifier';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { DropRule } from 'top.theillusivec4.curios.api.type.capability.ICurio';

  class IEntitiesData {
    addCondition(var1: ICondition): IEntitiesData;
    addEntities(...var1: EntityType<any>[]): IEntitiesData;
    addPlayer(): IEntitiesData;
    addSlots(...var1: string[]): IEntitiesData;
    replace(var1: boolean): IEntitiesData;
    serialize(var1: Provider): JsonObject;
  }


  class ISlotData {
    addCondition(var1: ICondition): ISlotData;
    addCosmetic(var1: boolean): ISlotData;
    addValidator(var1: ResourceLocation): ISlotData;
    dropRule(var1: DropRule): ISlotData;
    icon(var1: ResourceLocation): ISlotData;
    operation(operation: string): ISlotData;
    operation(var1: Operation): ISlotData;
    order(var1: number): ISlotData;
    renderToggle(var1: boolean): ISlotData;
    replace(var1: boolean): ISlotData;
    serialize(var1: Provider): JsonObject;
    size(var1: number): ISlotData;
    useNativeGui(var1: boolean): ISlotData;
  }

}

declare module 'top.theillusivec4.curios.api.type' {
  import { Comparable } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { DropRule } from 'top.theillusivec4.curios.api.type.capability.ICurio';
  import { Set } from 'java.util';
  import { CompoundTag } from 'net.minecraft.nbt';

  class ICuriosMenu {
    resetSlots(): void;
  }


  interface ISlotType extends Comparable<ISlotType> {}
  class ISlotType extends Comparable<ISlotType> {
    canToggleRendering(): boolean;
    get dropRule(): DropRule;
    get icon(): ResourceLocation;
    get identifier(): string;
    get order(): number;
    get priority(): number;
    get size(): number;
    get validators(): Set<ResourceLocation>;
    hasCosmetic(): boolean;
    isLocked(): boolean;
    isVisible(): boolean;
    useNativeGui(): boolean;
    writeNbt(): CompoundTag;
  }

}

declare module 'top.theillusivec4.curios.api.type.inventory' {
  import { NonNullList } from 'net.minecraft.core';
  import { Boolean } from 'java.lang';
  import { DropRule } from 'top.theillusivec4.curios.api.type.capability.ICurio';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Map, Set, Collection } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { AttributeModifier } from 'net.minecraft.world.entity.ai.attributes';
  import { Operation } from 'AttributeModifier';
  import { IItemHandlerModifiable } from 'net.neoforged.neoforge.items';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Provider } from 'HolderLookup';

  class ICurioStacksHandler {
    addPermanentModifier(var1: AttributeModifier): void;
    addTransientModifier(var1: AttributeModifier): void;
    applySyncTag(var1: CompoundTag): void;
    canToggleRendering(): boolean;
    clearCachedModifiers(): void;
    clearModifiers(): void;
    copyModifiers(var1: ICurioStacksHandler): void;
    deserializeNBT(var1: CompoundTag): void;
    get activeStates(): NonNullList<boolean>;
    get cachedModifiers(): Set<AttributeModifier>;
    get cosmeticStacks(): IDynamicStackHandler;
    get dropRule(): DropRule;
    get identifier(): string;
    get modifiers(): Map<ResourceLocation, AttributeModifier>;
    get permanentModifiers(): Set<AttributeModifier>;
    get renders(): NonNullList<boolean>;
    get sizeShift(): number;
    get slots(): number;
    get stacks(): IDynamicStackHandler;
    get syncTag(): CompoundTag;
    getModifiersByOperation(var1: Operation): Collection<AttributeModifier>;
    grow(var1: number): void;
    hasCosmetic(): boolean;
    isVisible(): boolean;
    removeModifier(var1: ResourceLocation): void;
    serializeNBT(): CompoundTag;
    shrink(var1: number): void;
    update(): void;
    updateActiveState(index: number): void;
  }


  interface IDynamicStackHandler extends IItemHandlerModifiable {}
  class IDynamicStackHandler extends IItemHandlerModifiable {
    deserializeNBT(var1: Provider, var2: CompoundTag): void;
    get slots(): number;
    getPreviousStackInSlot(var1: number): ItemStack;
    getStackInSlot(var1: number): ItemStack;
    grow(var1: number): void;
    serializeNBT(var1: Provider): CompoundTag;
    setPreviousStackInSlot(var1: number, var2: ItemStack): void;
    setStackInSlot(var1: number, var2: ItemStack): void;
    shrink(var1: number): void;
  }

}

declare module 'top.theillusivec4.curios.api.type.util' {
  import { Optional, Set, List, Collection, SortedMap } from 'java.util';
  import { ICurio, ICuriosItemHandler } from 'top.theillusivec4.curios.api.type.capability';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { IItemHandlerModifiable } from 'net.neoforged.neoforge.items';
  import { SlotResult, SlotContext } from 'top.theillusivec4.curios.api';
  import { Predicate, Consumer } from 'java.util.function';
  import { ImmutableTriple } from 'org.apache.commons.lang3.tuple';
  import { Integer } from 'java.lang';
  import { TriConsumer } from 'org.apache.logging.log4j.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ISlotType } from 'top.theillusivec4.curios.api.type';
  import { ICurioStacksHandler } from 'top.theillusivec4.curios.api.type.inventory';

  class ICuriosHelper {
    findCurio(var1: LivingEntity, var2: string, var3: number): Optional<SlotResult>;
    findCurios(var1: LivingEntity, var2: Item): SlotResult[];
    findCurios(var1: LivingEntity, var2: Predicate<ItemStack>): SlotResult[];
    findCurios(var1: LivingEntity, ...var2: string[]): SlotResult[];
    findEquippedCurio(var1: Item, var2: LivingEntity): Optional<ImmutableTriple<string, number, ItemStack>>;
    findEquippedCurio(var1: Predicate<ItemStack>, var2: LivingEntity): Optional<ImmutableTriple<string, number, ItemStack>>;
    findFirstCurio(var1: LivingEntity, var2: Item): Optional<SlotResult>;
    findFirstCurio(var1: LivingEntity, var2: Predicate<ItemStack>): Optional<SlotResult>;
    getCurio(var1: ItemStack): Optional<ICurio>;
    getCurioTags(var1: Item): Set<string>;
    getCuriosHandler(var1: LivingEntity): Optional<ICuriosItemHandler>;
    getEquippedCurios(var1: LivingEntity): Optional<IItemHandlerModifiable>;
    isStackValid(var1: SlotContext, var2: ItemStack): boolean;
    onBrokenCurio(var1: string, var2: number, var3: LivingEntity): void;
    onBrokenCurio(var1: SlotContext): void;
    setBrokenCurioConsumer(var1: Consumer<SlotContext>): void;
    setBrokenCurioConsumer(var1: TriConsumer<string, number, LivingEntity>): void;
    setEquippedCurio(var1: LivingEntity, var2: string, var3: number, var4: ItemStack): void;
  }


  class IIconHelper {
    addIcon(var1: string, var2: ResourceLocation): void;
    clearIcons(): void;
    getIcon(var1: string): ResourceLocation;
  }


  class ISlotHelper {
    addSlotType(var1: ISlotType): void;
    clear(): void;
    createSlots(var1: LivingEntity): SortedMap<ISlotType, ICurioStacksHandler>;
    createSlots(): SortedMap<ISlotType, ICurioStacksHandler>;
    get slotTypeIds(): Set<string>;
    get slotTypes(): Collection<ISlotType>;
    getSlotType(var1: string): Optional<ISlotType>;
    getSlotTypes(var1: LivingEntity): Collection<ISlotType>;
    getSlotsForType(var1: LivingEntity, var2: string): number;
    growSlotType(var1: string, var2: LivingEntity): void;
    growSlotType(var1: string, var2: number, var3: LivingEntity): void;
    lockSlotType(var1: string, var2: LivingEntity): void;
    setSlotsForType(var1: string, var2: LivingEntity, var3: number): void;
    shrinkSlotType(var1: string, var2: LivingEntity): void;
    shrinkSlotType(var1: string, var2: number, var3: LivingEntity): void;
    unlockSlotType(var1: string, var2: LivingEntity): void;
  }

}

declare module 'top.theillusivec4.curios.client' {
  import { Post } from 'ClientTickEvent';
  import { AddAttributeTooltipsEvent } from 'net.neoforged.neoforge.client.event';
  import { ItemTooltipEvent } from 'net.neoforged.neoforge.event.entity.player';
  import { ModConfigSpec } from 'net.neoforged.neoforge.common';
  import { Client } from 'top.theillusivec4.curios.client.CuriosClientConfig';
  import { IIconHelper } from 'top.theillusivec4.curios.api.type.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { KeyMapping } from 'net.minecraft.client';

  class ClientEventHandler {
    onAttributeTooltip(evt: AddAttributeTooltipsEvent): void;
    onClientTick(evt: Post): void;
    onTooltip(evt: ItemTooltipEvent): void;
  }


  class CuriosClientConfig {
    static readonly CLIENT_SPEC: ModConfigSpec;
    static readonly CLIENT: Client;
  }


  interface IconHelper extends IIconHelper {}
  class IconHelper extends IIconHelper {
    addIcon(identifier: string, resourceLocation: ResourceLocation): void;
    clearIcons(): void;
    getIcon(identifier: string): ResourceLocation;
  }


  class KeyRegistry {
    static openCurios: KeyMapping;
  }

}

declare module 'top.theillusivec4.curios.client.CuriosClientConfig' {
  import { BooleanValue, IntValue, EnumValue } from 'ModConfigSpec';

  class Client {
    readonly renderCurios: BooleanValue;
    readonly enableButton: BooleanValue;
    readonly buttonXOffset: IntValue;
    readonly buttonYOffset: IntValue;
    readonly creativeButtonXOffset: IntValue;
    readonly creativeButtonYOffset: IntValue;
    readonly buttonCorner: EnumValue;
  }

}

declare module 'top.theillusivec4.curios.client.CuriosClientConfig.Client' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ButtonCorner extends Enum<ButtonCorner> {}
  class ButtonCorner extends Enum<ButtonCorner> {
    static readonly TOP_LEFT: ButtonCorner;
    static readonly TOP_RIGHT: ButtonCorner;
    static readonly BOTTOM_LEFT: ButtonCorner;
    static readonly BOTTOM_RIGHT: ButtonCorner;
    get creativeXoffset(): number;
    get creativeYoffset(): number;
    get xoffset(): number;
    get yoffset(): number;
    static valueOf(name: string): ButtonCorner;
    static values(): ButtonCorner[];
  }

}

declare module 'top.theillusivec4.curios.client.gui' {
  import { ImageButton, WidgetSprites, Button } from 'net.minecraft.client.gui.components';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { EffectRenderingInventoryScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { CuriosContainer } from 'top.theillusivec4.curios.common.inventory.container';
  import { RecipeUpdateListener, RecipeBookComponent } from 'net.minecraft.client.gui.screens.recipebook';
  import { ICuriosScreen } from 'top.theillusivec4.curios.api.client';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { Tuple } from 'net.minecraft.util';
  import { Integer } from 'java.lang';
  import { Post } from 'ScreenEvent.Init';
  import { Pre } from 'ScreenEvent.Render';
  import { Pre as screenevent_mousebuttonpressed_Pre } from 'ScreenEvent.MouseButtonPressed';
  import { Type } from 'top.theillusivec4.curios.client.gui.PageButton';
  import { CurioSlot } from 'top.theillusivec4.curios.common.inventory';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { OnPress } from 'Button';

  interface CosmeticButton extends ImageButton {}
  class CosmeticButton extends ImageButton {
    static readonly OFF: WidgetSprites;
    static readonly ON: WidgetSprites;
    renderWidget(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface CuriosButton extends ImageButton {}
  class CuriosButton extends ImageButton {
    static readonly BIG: WidgetSprites;
    static readonly SMALL: WidgetSprites;
    renderWidget(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface CuriosScreen extends RecipeUpdateListener, ICuriosScreen, EffectRenderingInventoryScreen<CuriosContainer> {}
  class CuriosScreen extends RecipeUpdateListener {
    widthTooNarrow: boolean;
    panelWidth: number;
    constructor(curiosContainer: CuriosContainer, playerInventory: Inventory, title: Component);
    containerTick(): void;
    get recipeBookComponent(): RecipeBookComponent;
    static getButtonOffset(isCreative: boolean): Tuple<number, number>;
    init(): void;
    keyPressed(p_keyPressed_1_: number, p_keyPressed_2_: number, p_keyPressed_3_: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, mouseButton: number): boolean;
    mouseReleased(mouseReleased1: number, mouseReleased3: number, mouseReleased5: number): boolean;
    mouseScrolled(p_94686_: number, p_94687_: number, p_94688_: number, p_294830_: number): boolean;
    recipesUpdated(): void;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    renderBg(guiGraphics: GuiGraphics, partialTicks: number, mouseX: number, mouseY: number): void;
    updateRenderButtons(): void;
  }


  class GuiEventHandler {
    onInventoryGuiDrawBackground(evt: Pre): void;
    onInventoryGuiInit(evt: Post): void;
    onMouseClick(evt: screenevent_mousebuttonpressed_Pre): void;
  }


  interface PageButton extends Button {}
  class PageButton extends Button {
    constructor(parentGui: CuriosScreen, xIn: number, yIn: number, widthIn: number, heightIn: number, type: Type);
    renderWidget(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface RenderButton extends ImageButton {}
  class RenderButton extends ImageButton {
    static readonly BUTTON_SPRITES: WidgetSprites;
    constructor(slot: CurioSlot, xIn: number, yIn: number, widthIn: number, heightIn: number, xTexStartIn: number, yTexStartIn: number, resourceLocationIn: ResourceLocation, onPressIn: OnPress);
    renderButtonOverlay(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    renderWidget(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }

}

declare module 'top.theillusivec4.curios.client.gui.PageButton' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Type extends Enum<Type> {}
  class Type extends Enum<Type> {
    static readonly NEXT: Type;
    static readonly PREVIOUS: Type;
    static valueOf(name: string): Type;
    static values(): Type[];
  }

}

declare module 'top.theillusivec4.curios.client.render' {
  import { RenderLayer } from 'net.minecraft.client.renderer.entity.layers';
  import { RenderLayerParent } from 'net.minecraft.client.renderer.entity';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';

  interface CuriosLayer<T extends LivingEntity = any, M extends EntityModel<T> = any> extends RenderLayer<T, M> {}
  class CuriosLayer<T extends LivingEntity = any, M extends EntityModel<T> = any> extends RenderLayer<T, M> {
    constructor(renderer: RenderLayerParent<T, M>);
    render(matrixStack: PoseStack, renderTypeBuffer: MultiBufferSource, light: number, livingEntity: T, limbSwing: number, limbSwingAmount: number, partialTicks: number, ageInTicks: number, netHeadYaw: number, headPitch: number): void;
  }

}

declare module 'top.theillusivec4.curios.common.capability' {
  import { INBTSerializable } from 'net.neoforged.neoforge.common.util';
  import { CompoundTag, ListTag, Tag } from 'net.minecraft.nbt';
  import { ICuriosItemHandler, ICurio, ICurioItem } from 'top.theillusivec4.curios.api.type.capability';
  import { Map, Optional, List, Set, UUID } from 'java.util';
  import { ICurioStacksHandler } from 'top.theillusivec4.curios.api.type.inventory';
  import { Provider } from 'HolderLookup';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { IItemHandlerModifiable, IItemHandler } from 'net.neoforged.neoforge.items';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { SlotResult, SlotContext } from 'top.theillusivec4.curios.api';
  import { Predicate } from 'java.util.function';
  import { LootContext } from 'net.minecraft.world.level.storage.loot';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Operation } from 'AttributeModifier';
  import { Multimap } from 'com.google.common.collect';
  import { AttributeModifier, Attribute } from 'net.minecraft.world.entity.ai.attributes';
  import { Component } from 'net.minecraft.network.chat';
  import { TooltipContext } from 'Item';
  import { DropRule, SoundInfo } from 'top.theillusivec4.curios.api.type.capability.ICurio';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { Holder } from 'net.minecraft.core';
  import { EnderMan } from 'net.minecraft.world.entity.monster';

  interface CurioInventory extends INBTSerializable<CompoundTag> {}
  class CurioInventory extends INBTSerializable<CompoundTag> {
    asMap(): Map<string, ICurioStacksHandler>;
    deserializeNBT(provider: Provider, nbt: CompoundTag): void;
    init(curiosItemHandler: ICuriosItemHandler): void;
    replace(curios: Map<string, ICurioStacksHandler>): void;
    serializeNBT(provider: Provider): CompoundTag;
  }


  interface CurioInventoryCapability extends ICuriosItemHandler {}
  class CurioInventoryCapability extends ICuriosItemHandler {
    constructor(livingEntity: LivingEntity);
    addPermanentSlotModifier(slot: string, id: ResourceLocation, amount: number, operation: Operation): void;
    addPermanentSlotModifiers(modifiers: Multimap<string, AttributeModifier>): void;
    addTransientSlotModifier(slot: string, id: ResourceLocation, amount: number, operation: Operation): void;
    addTransientSlotModifiers(modifiers: Multimap<string, AttributeModifier>): void;
    clearCachedSlotModifiers(): void;
    clearSlotModifiers(): void;
    findCurio(identifier: string, index: number): Optional<SlotResult>;
    findCurio(identifier: string, index: number, includeInactive: boolean): Optional<SlotResult>;
    findCurios(item: Item, stack: ItemStack): SlotResult[];
    findCurios(filter: Predicate<ItemStack>): SlotResult[];
    findCurios(filter: Predicate<ItemStack>, includeInactive: boolean, cacheKey: string): SlotResult[];
    findCurios(...identifiers: string[]): SlotResult[];
    findCurios(includeInactive: boolean, ...identifiers: string[]): SlotResult[];
    findCurios(var1: Item): SlotResult[];
    findFirstCurio(item: Item): Optional<SlotResult>;
    findFirstCurio(filter: Predicate<ItemStack>): Optional<SlotResult>;
    findFirstCurio(filter: Predicate<ItemStack>, cacheKey: string): Optional<SlotResult>;
    findFirstCurio(filter: Predicate<ItemStack>, includeInactive: boolean, cacheKey: string): Optional<SlotResult>;
    get curios(): Map<string, ICurioStacksHandler>;
    get equippedCurios(): IItemHandlerModifiable;
    get modifiers(): Multimap<string, AttributeModifier>;
    get slots(): number;
    get updatingInventories(): Set<ICurioStacksHandler>;
    get visibleSlots(): number;
    get wearer(): LivingEntity;
    getFortuneLevel(lootContext: LootContext): number;
    getLootingLevel(lootContext: LootContext): number;
    getStacksHandler(identifier: string): Optional<ICurioStacksHandler>;
    growSlotType(identifier: string, amount: number): void;
    handleInvalidStacks(): void;
    loadInventory(data: ListTag): void;
    loseInvalidStack(stack: ItemStack): void;
    readTag(nbt: Tag): void;
    removeSlotModifier(slot: string, id: ResourceLocation): void;
    removeSlotModifiers(modifiers: Multimap<string, AttributeModifier>): void;
    reset(): void;
    saveInventory(clear: boolean): ListTag;
    set curios(curios: Map<string, ICurioStacksHandler>);
    setEquippedCurio(identifier: string, index: number, stack: ItemStack): void;
    shrinkSlotType(identifier: string, amount: number): void;
    writeTag(): Tag;
  }


  interface CurioItemHandler extends IItemHandler {}
  class CurioItemHandler extends IItemHandler {
    constructor(livingEntity: LivingEntity);
    extractItem(slot: number, amount: number, simulate: boolean): ItemStack;
    get slots(): number;
    getSlotLimit(slot: number): number;
    getStackInSlot(slot: number): ItemStack;
    insertItem(slot: number, stack: ItemStack, simulate: boolean): ItemStack;
    isItemValid(slot: number, stack: ItemStack): boolean;
  }


  interface ItemizedCurioCapability extends ICurio {}
  class ItemizedCurioCapability extends ICurio {
    constructor(curio: ICurioItem, stack: ItemStack);
    canEquip(slotContext: SlotContext): boolean;
    canEquipFromUse(slotContext: SlotContext): boolean;
    canSync(slotContext: SlotContext): boolean;
    canUnequip(slotContext: SlotContext): boolean;
    canWalkOnPowderedSnow(slotContext: SlotContext): boolean;
    curioBreak(slotContext: SlotContext): void;
    curioTick(slotContext: SlotContext): void;
    get stack(): ItemStack;
    getAttributeModifiers(slotContext: SlotContext, id: ResourceLocation): Multimap<Holder<Attribute>, AttributeModifier>;
    getAttributeModifiers(slotContext: SlotContext, uuid: UUID): Multimap<Holder<Attribute>, AttributeModifier>;
    getAttributesTooltip(tooltips: Component[], context: TooltipContext): Component[];
    getAttributesTooltip(tooltips: Component[]): Component[];
    getDropRule(slotContext: SlotContext, source: DamageSource, lootingLevel: number, recentlyHit: boolean): DropRule;
    getDropRule(slotContext: SlotContext, source: DamageSource, recentlyHit: boolean): DropRule;
    getEquipSound(slotContext: SlotContext): SoundInfo;
    getFortuneLevel(slotContext: SlotContext, lootContext: LootContext): number;
    getLootingLevel(slotContext: SlotContext, lootContext: LootContext): number;
    getSlotsTooltip(tooltips: Component[], context: TooltipContext): Component[];
    getSlotsTooltip(tooltips: Component[]): Component[];
    isEnderMask(slotContext: SlotContext, enderMan: EnderMan): boolean;
    makesPiglinsNeutral(slotContext: SlotContext): boolean;
    onEquip(slotContext: SlotContext, prevStack: ItemStack): void;
    onEquipFromUse(slotContext: SlotContext): void;
    onUnequip(slotContext: SlotContext, newStack: ItemStack): void;
    readSyncData(slotContext: SlotContext, compound: CompoundTag): void;
    writeSyncData(slotContext: SlotContext): CompoundTag;
  }

}

declare module 'top.theillusivec4.curios.common' {
  import { ModConfigSpec } from 'net.neoforged.neoforge.common';
  import { Server, Common } from 'top.theillusivec4.curios.common.CuriosConfig';
  import { ICuriosHelper } from 'top.theillusivec4.curios.api.type.util';
  import { Optional, Set, List } from 'java.util';
  import { ICurio, ICuriosItemHandler } from 'top.theillusivec4.curios.api.type.capability';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { IItemHandlerModifiable } from 'net.neoforged.neoforge.items';
  import { SlotResult, SlotContext } from 'top.theillusivec4.curios.api';
  import { Predicate, Consumer, Supplier } from 'java.util.function';
  import { ImmutableTriple } from 'org.apache.commons.lang3.tuple';
  import { Integer } from 'java.lang';
  import { TriConsumer } from 'org.apache.logging.log4j.util';
  import { IEventBus } from 'net.neoforged.bus.api';

  class CuriosConfig {
    static readonly SERVER_SPEC: ModConfigSpec;
    static readonly SERVER: Server;
    static readonly COMMON_SPEC: ModConfigSpec;
    static readonly COMMON: Common;
  }


  interface CuriosHelper extends ICuriosHelper {}
  class CuriosHelper extends ICuriosHelper {
    findCurio(livingEntity: LivingEntity, identifier: string, index: number): Optional<SlotResult>;
    findCurios(livingEntity: LivingEntity, item: Item, stack: ItemStack): SlotResult[];
    findCurios(livingEntity: LivingEntity, filter: Predicate<ItemStack>): SlotResult[];
    findCurios(livingEntity: LivingEntity, ...identifiers: string[]): SlotResult[];
    findCurios(var1: LivingEntity, var2: Item): SlotResult[];
    findEquippedCurio(item: Item, livingEntity: LivingEntity, stack: ItemStack): Optional<ImmutableTriple<string, number, ItemStack>>;
    findEquippedCurio(filter: Predicate<ItemStack>, livingEntity: LivingEntity): Optional<ImmutableTriple<string, number, ItemStack>>;
    findEquippedCurio(var1: Item, var2: LivingEntity): Optional<ImmutableTriple<string, number, ItemStack>>;
    findFirstCurio(livingEntity: LivingEntity, item: Item, stack: ItemStack): Optional<SlotResult>;
    findFirstCurio(livingEntity: LivingEntity, filter: Predicate<ItemStack>): Optional<SlotResult>;
    findFirstCurio(var1: LivingEntity, var2: Item): Optional<SlotResult>;
    getCurio(stack: ItemStack): Optional<ICurio>;
    getCurioTags(item: Item): Set<string>;
    getCuriosHandler(livingEntity: LivingEntity): Optional<ICuriosItemHandler>;
    getEquippedCurios(livingEntity: LivingEntity): Optional<IItemHandlerModifiable>;
    isStackValid(slotContext: SlotContext, stack: ItemStack): boolean;
    onBrokenCurio(slotContext: SlotContext): void;
    onBrokenCurio(id: string, index: number, damager: LivingEntity): void;
    setBrokenCurioConsumer(consumer: Consumer<SlotContext>): void;
    setBrokenCurioConsumer(consumer: TriConsumer<string, number, LivingEntity>): void;
    setEquippedCurio(livingEntity: LivingEntity, identifier: string, index: number, stack: ItemStack): void;
  }


  class CuriosRegistry {
    static readonly CURIO_SLOT_ARGUMENT: Supplier;
    static readonly CURIO_MENU: Supplier;
    static readonly CURIO_ATTRIBUTES: Supplier;
    static readonly EQUIP_TRIGGER: Supplier;
    static readonly INVENTORY: Supplier;
    static readonly CURIO_ATTRIBUTE_MODIFIERS: Supplier;
    static init(eventBus: IEventBus): void;
  }

}

declare module 'top.theillusivec4.curios.common.CuriosConfig' {
  import { EnumValue, IntValue, Builder, ConfigValue } from 'ModConfigSpec';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class Server {
    keepCurios: EnumValue;
    minimumColumns: IntValue;
    maxSlotsPerPage: IntValue;
    constructor(builder: Builder);
  }


  class Common {
    slots: ConfigValue;
    constructor(builder: Builder);
  }


  interface KeepCurios extends Enum<KeepCurios> {}
  class KeepCurios extends Enum<KeepCurios> {
    static readonly ON: KeepCurios;
    static readonly DEFAULT: KeepCurios;
    static readonly OFF: KeepCurios;
    static valueOf(name: string): KeepCurios;
    static values(): KeepCurios[];
  }

}

declare module 'top.theillusivec4.curios.common.data' {
  import { SimpleJsonResourceReloadListener } from 'net.minecraft.server.packs.resources';
  import { ListTag } from 'net.minecraft.nbt';
  import { Map, Set, Optional } from 'java.util';
  import { ISlotType } from 'top.theillusivec4.curios.api.type';
  import { EntityType } from 'net.minecraft.world.entity';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Builder } from 'top.theillusivec4.curios.common.slottype.SlotType';
  import { JsonObject } from 'com.google.gson';
  import { IEntitiesData, ISlotData } from 'top.theillusivec4.curios.api.type.data';
  import { ICondition } from 'net.neoforged.neoforge.common.conditions';
  import { Provider } from 'HolderLookup';
  import { Operation } from 'AttributeModifier';
  import { DropRule } from 'top.theillusivec4.curios.api.type.capability.ICurio';

  interface CuriosEntityManager extends SimpleJsonResourceReloadListener {}
  class CuriosEntityManager extends SimpleJsonResourceReloadListener {
    static SERVER: CuriosEntityManager;
    static CLIENT: CuriosEntityManager;
    constructor();
    static applySyncPacket(tag: ListTag): void;
    get modsFromSlots(): Map<string, Set<string>>;
    static get syncPacket(): ListTag;
    getEntitySlots(type: EntityType<any>): Map<string, ISlotType>;
  }


  interface CuriosSlotManager extends SimpleJsonResourceReloadListener {}
  class CuriosSlotManager extends SimpleJsonResourceReloadListener {
    static SERVER: CuriosSlotManager;
    static CLIENT: CuriosSlotManager;
    constructor();
    static applySyncPacket(tag: ListTag): void;
    static fromConfig(map: Map<string, Builder>): Set<string>;
    static fromJson(builder: Builder, jsonObject: JsonObject): void;
    get configSlots(): Set<string>;
    get icons(): Map<string, ResourceLocation>;
    get modsFromSlots(): Map<string, Set<string>>;
    get slots(): Map<string, ISlotType>;
    static get syncPacket(): ListTag;
    getIcon(identifier: string): ResourceLocation;
    getSlot(id: string): Optional<ISlotType>;
    set icons(icons: Map<string, ResourceLocation>);
  }


  interface EntitiesData extends IEntitiesData {}
  class EntitiesData extends IEntitiesData {
    addCondition(condition: ICondition): EntitiesData;
    addEntities(...entityTypes: EntityType<any>[]): EntitiesData;
    addPlayer(): EntitiesData;
    addSlots(...slots: string[]): EntitiesData;
    replace(replace: boolean): EntitiesData;
    serialize(provider: Provider): JsonObject;
  }


  interface SlotData extends ISlotData {}
  class SlotData extends ISlotData {
    addCondition(condition: ICondition): SlotData;
    addCosmetic(addCosmetic: boolean): SlotData;
    addValidator(resourceLocation: ResourceLocation): ISlotData;
    dropRule(dropRule: DropRule): SlotData;
    icon(icon: ResourceLocation): SlotData;
    operation(operation: string): SlotData;
    operation(operation: Operation): SlotData;
    order(order: number): SlotData;
    renderToggle(renderToggle: boolean): SlotData;
    replace(replace: boolean): SlotData;
    serialize(provider: Provider): JsonObject;
    size(size: number): SlotData;
    useNativeGui(useNativeGui: boolean): SlotData;
  }

}

declare module 'top.theillusivec4.curios.common.event' {
  import { PlayerLoggedInEvent, StartTracking, Clone } from 'PlayerEvent';
  import { OnDatapackSyncEvent } from 'net.neoforged.neoforge.event';
  import { EntityConstructing } from 'EntityEvent';
  import { EntityJoinLevelEvent } from 'net.neoforged.neoforge.event.entity';
  import { LivingDropsEvent, EnderManAngerEvent, LivingEquipmentChangeEvent } from 'net.neoforged.neoforge.event.entity.living';
  import { PickupXp } from 'PlayerXpEvent';
  import { RightClickItem } from 'PlayerInteractEvent';
  import { BlockDropsEvent } from 'net.neoforged.neoforge.event.level';
  import { Post } from 'EntityTickEvent';

  class CuriosEventHandler {
    static dirtyTags: boolean;
    curioRightClick(evt: RightClickItem): void;
    enderManAnger(evt: EnderManAngerEvent): void;
    entityConstructing(evt: EntityConstructing): void;
    entityJoinWorld(evt: EntityJoinLevelEvent): void;
    livingEquipmentChange(evt: LivingEquipmentChangeEvent): void;
    onBreakBlock(event: BlockDropsEvent): void;
    onDatapackSync(evt: OnDatapackSyncEvent): void;
    playerClone(evt: Clone): void;
    playerDrops(evt: LivingDropsEvent): void;
    playerLoggedIn(evt: PlayerLoggedInEvent): void;
    playerStartTracking(evt: StartTracking): void;
    playerXPPickUp(evt: PickupXp): void;
    tick(evt: Post): void;
  }

}

declare module 'top.theillusivec4.curios.common.integration' {
  import { List } from 'java.util';
  import { Rect2i } from 'net.minecraft.client.renderer';
  import { CuriosScreen } from 'top.theillusivec4.curios.client.gui';
  import { IEventBus } from 'net.neoforged.bus.api';

  class CuriosExclusionAreas {
    static create(screen: CuriosScreen): Rect2i[];
  }


  class CuriosIntegrations {
    static setup(eventBus: IEventBus): void;
  }

}

declare module 'top.theillusivec4.curios.common.integration.emi' {
  import { IEventBus } from 'net.neoforged.bus.api';
  import { Background } from 'ContainerScreenEvent.Render';
  import { EmiPlugin, EmiRegistry } from 'dev.emi.emi.api';

  class CuriosEmiIntegration {
    static renderCuriosBg(evt: Background): void;
    static setup(eventBus: IEventBus): void;
  }


  interface CuriosEmiPlugin extends EmiPlugin {}
  class CuriosEmiPlugin extends EmiPlugin {
    register(registry: EmiRegistry): void;
  }

}

declare module 'top.theillusivec4.curios.common.integration.jei' {
  import { IGuiContainerHandler } from 'mezz.jei.api.gui.handlers';
  import { CuriosScreen } from 'top.theillusivec4.curios.client.gui';
  import { List } from 'java.util';
  import { Rect2i } from 'net.minecraft.client.renderer';
  import { IModPlugin } from 'mezz.jei.api';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IGuiHandlerRegistration } from 'mezz.jei.api.registration';

  interface CuriosContainerHandler extends IGuiContainerHandler<CuriosScreen> {}
  class CuriosContainerHandler extends IGuiContainerHandler<CuriosScreen> {
    getGuiExtraAreas(screen: CuriosScreen): Rect2i[];
  }


  interface CuriosJeiPlugin extends IModPlugin {}
  class CuriosJeiPlugin extends IModPlugin {
    get pluginUid(): ResourceLocation;
    registerGuiHandlers(registration: IGuiHandlerRegistration): void;
  }

}

declare module 'top.theillusivec4.curios.common.integration.rei' {
  import { REIClientPlugin } from 'me.shedaniel.rei.api.client.plugins';
  import { ExclusionZones } from 'me.shedaniel.rei.api.client.registry.screen';

  interface CuriosReiPlugin extends REIClientPlugin {}
  class CuriosReiPlugin extends REIClientPlugin {
    registerExclusionZones(zones: ExclusionZones): void;
  }

}

declare module 'top.theillusivec4.curios.common.inventory.container' {
  import { RecipeBookMenu, RecipeBookType, Slot, ClickType, AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { RecipeInput, Recipe, RecipeHolder } from 'net.minecraft.world.item.crafting';
  import { ICuriosMenu } from 'top.theillusivec4.curios.api.type';
  import { ICuriosItemHandler } from 'top.theillusivec4.curios.api.type.capability';
  import { Player, Inventory, StackedContents } from 'net.minecraft.world.entity.player';
  import { List } from 'java.util';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Pair } from 'com.mojang.datafixers.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Container, MenuProvider } from 'net.minecraft.world';
  import { Component } from 'net.minecraft.network.chat';

  interface CuriosContainer extends ICuriosMenu, RecipeBookMenu<RecipeInput, Recipe> {}
  class CuriosContainer extends ICuriosMenu {
    readonly curiosHandler: ICuriosItemHandler;
    readonly player: Player;
    currentPage: number;
    totalPages: number;
    grid: List;
    hasCosmetics: boolean;
    isViewingCosmetics: boolean;
    panelWidth: number;
    constructor(windowId: number, playerInventory: Inventory, packetBuffer: FriendlyByteBuf);

    constructor(windowId: number, playerInventory: Inventory);
    checkQuickMove(): void;
    clearCraftingContent(): void;
    clicked(slotId: number, button: number, clickType: ClickType, player: Player): void;
    fillCraftSlotsStackedContents(itemHelperIn: StackedContents): void;
    get gridHeight(): number;
    get gridWidth(): number;
    get maxStackSize(): number;
    get noItemIcon(): Pair<ResourceLocation, ResourceLocation>;
    get noItemIcon(): Pair<ResourceLocation, ResourceLocation>;
    get recipeBookType(): RecipeBookType;
    get resultSlotIndex(): number;
    get size(): number;
    getSlot(index: number): Slot;
    mayPickup(playerIn: Player): boolean;
    mayPlace(stack: ItemStack): boolean;
    nextPage(): void;
    prevPage(): void;
    quickMoveStack(playerIn: Player, index: number): ItemStack;
    recipeMatches(recipeHolder: RecipeHolder): boolean;
    removed(playerIn: Player): void;
    resetSlots(): void;
    set(stack: ItemStack): void;
    setItem(pSlotId: number, pStateId: number, pStack: ItemStack): void;
    setPage(page: number): void;
    shouldMoveToInventory(index: number): boolean;
    slotsChanged(inventoryIn: Container): void;
    stillValid(player: Player): boolean;
    toggleCosmetics(): void;
  }


  interface CuriosContainerProvider extends MenuProvider {}
  class CuriosContainerProvider extends MenuProvider {
    createMenu(i: number, playerInventory: Inventory, playerEntity: Player): AbstractContainerMenu;
    get displayName(): Component;
  }

}

declare module 'top.theillusivec4.curios.common.inventory' {
  import { Player } from 'net.minecraft.world.entity.player';
  import { IDynamicStackHandler, ICurioStacksHandler } from 'top.theillusivec4.curios.api.type.inventory';
  import { SlotItemHandler, ItemStackHandler } from 'net.neoforged.neoforge.items';
  import { NonNullList } from 'net.minecraft.core';
  import { Boolean, Integer } from 'java.lang';
  import { List, Map, Set, Collection } from 'java.util';
  import { ICurioSlotExtension } from 'top.theillusivec4.curios.api.extensions';
  import { SlotContext } from 'top.theillusivec4.curios.api';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ICuriosItemHandler } from 'top.theillusivec4.curios.api.type.capability';
  import { DropRule } from 'top.theillusivec4.curios.api.type.capability.ICurio';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { AttributeModifier } from 'net.minecraft.world.entity.ai.attributes';
  import { Operation } from 'AttributeModifier';
  import { Function } from 'java.util.function';

  interface CosmeticCurioSlot extends CurioSlot {}
  class CosmeticCurioSlot extends CurioSlot {
    constructor(player: Player, handler: IDynamicStackHandler, index: number, identifier: string, xPosition: number, yPosition: number);
    get renderStatus(): boolean;
    get slotName(): string;
  }


  interface CurioSlot extends SlotItemHandler {}
  class CurioSlot extends SlotItemHandler {
    constructor(player: Player, handler: IDynamicStackHandler, index: number, identifier: string, xPosition: number, yPosition: number, renders: NonNullList<boolean>, actives: boolean[], canToggleRender: boolean, showCosmeticToggle: boolean, isCosmetic: boolean);

    constructor(player: Player, handler: IDynamicStackHandler, index: number, identifier: string, xPosition: number, yPosition: number, renders: NonNullList<boolean>, canToggleRender: boolean, showCosmeticToggle: boolean, isCosmetic: boolean);

    constructor(player: Player, handler: IDynamicStackHandler, index: number, identifier: string, xPosition: number, yPosition: number, renders: NonNullList<boolean>, canToggleRender: boolean);
    allowModification(pPlayer: Player): boolean;
    canToggleRender(): boolean;
    get identifier(): string;
    get renderStatus(): boolean;
    get slotContext(): SlotContext;
    get slotExtension(): ICurioSlotExtension;
    get slotName(): string;
    isActiveState(): boolean;
    isCosmetic(): boolean;
    set(stack: ItemStack): void;
    showCosmeticToggle(): boolean;
  }


  interface CurioStacksHandler extends ICurioStacksHandler {}
  class CurioStacksHandler extends ICurioStacksHandler {
    constructor(itemHandler: ICuriosItemHandler, identifier: string);

    constructor(itemHandler: ICuriosItemHandler, identifier: string, size: number, visible: boolean, cosmetic: boolean, canToggleRender: boolean, dropRule: DropRule);
    addPermanentModifier(modifier: AttributeModifier): void;
    addTransientModifier(modifier: AttributeModifier): void;
    applySyncTag(tag: CompoundTag): void;
    canToggleRendering(): boolean;
    clearCachedModifiers(): void;
    clearModifiers(): void;
    copyModifiers(other: ICurioStacksHandler): void;
    deserializeNBT(nbt: CompoundTag): void;
    equals(o: any): boolean;
    get activeStates(): NonNullList<boolean>;
    get cachedModifiers(): Set<AttributeModifier>;
    get cosmeticStacks(): IDynamicStackHandler;
    get dropRule(): DropRule;
    get identifier(): string;
    get modifiers(): Map<ResourceLocation, AttributeModifier>;
    get permanentModifiers(): Set<AttributeModifier>;
    get renders(): NonNullList<boolean>;
    get sizeShift(): number;
    get slots(): number;
    get stacks(): IDynamicStackHandler;
    get syncTag(): CompoundTag;
    getModifiersByOperation(operation: Operation): Collection<AttributeModifier>;
    grow(amount: number): void;
    hasCosmetic(): boolean;
    hashCode(): number;
    isVisible(): boolean;
    removeModifier(id: ResourceLocation): void;
    serializeNBT(): CompoundTag;
    shrink(amount: number): void;
    update(): void;
    updateActiveState(index: number): void;
  }


  interface DynamicStackHandler extends IDynamicStackHandler, ItemStackHandler {}
  class DynamicStackHandler extends IDynamicStackHandler {
    constructor(size: number, ctxBuilder: Function<number, SlotContext>);
    extractItem(slot: number, amount: number, simulate: boolean): ItemStack;
    getPreviousStackInSlot(slot: number): ItemStack;
    grow(amount: number): void;
    isItemValid(slot: number, stack: ItemStack): boolean;
    setPreviousStackInSlot(slot: number, stack: ItemStack): void;
    shrink(amount: number): void;
  }

}

declare module 'top.theillusivec4.curios.common.network.client' {
  import { SPacketSetIcons, SPacketQuickMove, SPacketPage, SPacketBreak, SPacketGrabbedItem } from 'top.theillusivec4.curios.common.network.server';
  import { SPacketSyncRender, SPacketSyncModifiers, SPacketSyncData, SPacketSyncCurios, SPacketSyncStack, SPacketSyncActiveState } from 'top.theillusivec4.curios.common.network.server.sync';
  import { IPayloadContext } from 'net.neoforged.neoforge.network.handling';

  class CuriosClientPackets {
    static handle(data: SPacketSetIcons): void;
    static handle(data: SPacketQuickMove): void;
    static handle(data: SPacketPage): void;
    static handle(data: SPacketBreak): void;
    static handle(data: SPacketSyncRender): void;
    static handle(data: SPacketSyncModifiers): void;
    static handle(data: SPacketSyncData): void;
    static handle(data: SPacketSyncCurios): void;
    static handle(data: SPacketGrabbedItem): void;
    static handle(data: SPacketSyncStack): void;
    static handle(data: SPacketSyncActiveState): void;
  }


  class CuriosClientPayloadHandler {
    static get instance(): CuriosClientPayloadHandler;
    handle(data: SPacketSetIcons, ctx: IPayloadContext): void;
    handle(data: SPacketQuickMove, ctx: IPayloadContext): void;
    handle(data: SPacketPage, ctx: IPayloadContext): void;
    handle(data: SPacketBreak, ctx: IPayloadContext): void;
    handle(data: SPacketSyncRender, ctx: IPayloadContext): void;
    handle(data: SPacketSyncModifiers, ctx: IPayloadContext): void;
    handle(data: SPacketSyncData, ctx: IPayloadContext): void;
    handle(data: SPacketSyncCurios, ctx: IPayloadContext): void;
    handle(data: SPacketGrabbedItem, ctx: IPayloadContext): void;
    handle(data: SPacketSyncStack, ctx: IPayloadContext): void;
    handle(data: SPacketSyncActiveState, ctx: IPayloadContext): void;
  }

}

declare module 'top.theillusivec4.curios.common.network' {
  import { PayloadRegistrar } from 'net.neoforged.neoforge.network.registration';

  class NetworkHandler {
    static register(registrar: PayloadRegistrar): void;
  }

}

declare module 'top.theillusivec4.curios.common.network.server' {
  import { CPacketToggleRender, CPacketPage, CPacketToggleCosmetics, CPacketOpenVanilla, CPacketOpenCurios, CPacketDestroy } from 'top.theillusivec4.curios.common.network.client';
  import { IPayloadContext } from 'net.neoforged.neoforge.network.handling';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Map } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  class CuriosServerPayloadHandler {
    static get instance(): CuriosServerPayloadHandler;
    handleDestroyPacket(data: CPacketDestroy, ctx: IPayloadContext): void;
    handleOpenCurios(data: CPacketOpenCurios, ctx: IPayloadContext): void;
    handleOpenVanilla(data: CPacketOpenVanilla, ctx: IPayloadContext): void;
    handlePage(data: CPacketPage, ctx: IPayloadContext): void;
    handlerToggleCosmetics(data: CPacketToggleCosmetics, ctx: IPayloadContext): void;
    handlerToggleRender(data: CPacketToggleRender, ctx: IPayloadContext): void;
  }


  interface SPacketSetIcons extends CustomPacketPayload {}
  class SPacketSetIcons extends CustomPacketPayload {
    static readonly TYPE: Type;
    static readonly STREAM_CODEC: StreamCodec;
    readonly map: Map;
    constructor(map: Map<string, ResourceLocation>);

    constructor(buf: FriendlyByteBuf);
    type(): Type<CustomPacketPayload>;
  }

}

declare module 'top.theillusivec4.curios.common.network.server.sync' {
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Map, Set } from 'java.util';
  import { ICurioStacksHandler } from 'top.theillusivec4.curios.api.type.inventory';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { ListTag } from 'net.minecraft.nbt';

  interface SPacketSyncCurios extends CustomPacketPayload {}
  class SPacketSyncCurios extends CustomPacketPayload {
    static readonly TYPE: Type;
    static readonly STREAM_CODEC: StreamCodec;
    readonly entityId: number;
    readonly entrySize: number;
    readonly map: Map;
    constructor(entityId: number, map: Map<string, ICurioStacksHandler>);

    constructor(buf: FriendlyByteBuf);
    type(): Type<CustomPacketPayload>;
  }


  interface SPacketSyncData extends CustomPacketPayload {}
  class SPacketSyncData extends CustomPacketPayload {
    static readonly TYPE: Type;
    static readonly STREAM_CODEC: StreamCodec;
    readonly slotData: ListTag;
    readonly entityData: ListTag;
    constructor(slotData: ListTag, entityData: ListTag);

    constructor(buf: FriendlyByteBuf);
    type(): Type<CustomPacketPayload>;
  }


  interface SPacketSyncModifiers extends CustomPacketPayload {}
  class SPacketSyncModifiers extends CustomPacketPayload {
    static readonly TYPE: Type;
    static readonly STREAM_CODEC: StreamCodec;
    readonly entityId: number;
    readonly entrySize: number;
    readonly updates: Map;
    constructor(entityId: number, updates: Set<ICurioStacksHandler>);

    constructor(buf: FriendlyByteBuf);
    type(): Type<CustomPacketPayload>;
  }

}

declare module 'top.theillusivec4.curios.common.network.server.sync.SPacketSyncStack' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface HandlerType extends Enum<HandlerType> {}
  class HandlerType extends Enum<HandlerType> {
    static readonly EQUIPMENT: HandlerType;
    static readonly COSMETIC: HandlerType;
    static fromValue(value: number): HandlerType;
    static valueOf(name: string): HandlerType;
    static values(): HandlerType[];
  }

}

declare module 'top.theillusivec4.curios.common.slottype' {
  import { Map, Set } from 'java.util';
  import { Builder } from 'top.theillusivec4.curios.common.slottype.SlotType';
  import { Stream } from 'java.util.stream';
  import { IMCMessage } from 'InterModComms';
  import { ISlotType } from 'top.theillusivec4.curios.api.type';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { DropRule } from 'top.theillusivec4.curios.api.type.capability.ICurio';

  class LegacySlotManager {
    static buildImcSlotTypes(register: Stream<IMCMessage>, modify: Stream<IMCMessage>): void;
    static get idsToMods(): Map<string, Set<string>>;
    static get imcBuilders(): Map<string, Builder>;
  }


  interface SlotType extends ISlotType {}
  class SlotType extends ISlotType {
    canToggleRendering(): boolean;
    compareTo(otherType: ISlotType): number;
    equals(o: any): boolean;
    static from(tag: CompoundTag): ISlotType;
    get dropRule(): DropRule;
    get icon(): ResourceLocation;
    get identifier(): string;
    get order(): number;
    get size(): number;
    get validators(): Set<ResourceLocation>;
    hasCosmetic(): boolean;
    hashCode(): number;
    useNativeGui(): boolean;
    writeNbt(): CompoundTag;
  }

}

declare module 'top.theillusivec4.curios.common.slottype.SlotType' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { DropRule } from 'top.theillusivec4.curios.api.type.capability.ICurio';
  import { SlotType } from 'top.theillusivec4.curios.common.slottype';

  class Builder {
    constructor(identifier: string);
    apply(builder: Builder): void;
    build(): SlotType;
    dropRule(dropRule: DropRule): Builder;
    dropRule(dropRule: string): Builder;
    hasCosmetic(hasCosmetic: boolean): Builder;
    hasCosmetic(hasCosmetic: boolean, replace: boolean): Builder;
    icon(icon: ResourceLocation): Builder;
    order(order: number): Builder;
    order(order: number, replace: boolean): Builder;
    renderToggle(renderToggle: boolean): Builder;
    renderToggle(renderToggle: boolean, replace: boolean): Builder;
    size(size: number): Builder;
    size(size: number, operation: string): Builder;
    size(size: number, replace: boolean): Builder;
    size(size: number, operation: string, replace: boolean): Builder;
    useNativeGui(useNativeGui: boolean): Builder;
    useNativeGui(useNativeGui: boolean, replace: boolean): Builder;
    validator(slotResultPredicate: ResourceLocation): Builder;
  }

}

declare module 'top.theillusivec4.curios.common.util' {
  import { SimpleCriterionTrigger } from 'net.minecraft.advancements.critereon';
  import { TriggerInstance } from 'top.theillusivec4.curios.common.util.EquipCurioTrigger';
  import { Codec, MapCodec } from 'com.mojang.serialization';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { ItemStack } from 'net.minecraft.world.item';
  import { SlotContext } from 'top.theillusivec4.curios.api';
  import { LootItemConditionalFunction, LootItemFunctionType } from 'net.minecraft.world.level.storage.loot.functions';
  import { Set } from 'java.util';
  import { LootContextParam } from 'net.minecraft.world.level.storage.loot.parameters';
  import { LootContext } from 'net.minecraft.world.level.storage.loot';

  interface EquipCurioTrigger extends SimpleCriterionTrigger<TriggerInstance> {}
  class EquipCurioTrigger extends SimpleCriterionTrigger<TriggerInstance> {
    static readonly INSTANCE: EquipCurioTrigger;
    codec(): Codec<TriggerInstance>;
    trigger(serverPlayer: ServerPlayer, stack: ItemStack): void;
    trigger(slotContext: SlotContext, serverPlayer: ServerPlayer, stack: ItemStack): void;
  }


  interface SetCurioAttributesFunction extends LootItemConditionalFunction {}
  class SetCurioAttributesFunction extends LootItemConditionalFunction {
    static readonly CODEC: MapCodec;
    get referencedContextParams(): Set<LootContextParam<any>>;
    get type(): LootItemFunctionType<SetCurioAttributesFunction>;
    run(stack: ItemStack, context: LootContext): ItemStack;
  }

}

declare module 'top.theillusivec4.curios' {
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Logger } from 'org.slf4j';

  class Curios {
    constructor(eventBus: IEventBus, modContainer: ModContainer);
    static itemCacheKey(stack: ItemStack): string;
  }


  class CuriosConstants {
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static readonly LOG: Logger;
  }

}

declare module 'top.theillusivec4.curios.Curios' {
  import { RegisterKeyMappingsEvent, RegisterMenuScreensEvent } from 'net.neoforged.neoforge.client.event';
  import { FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';
  import { AddLayers } from 'EntityRenderersEvent';

  class ClientProxy {
    static addLayers(evt: AddLayers): void;
    static registerKeys(evt: RegisterKeyMappingsEvent): void;
    static registerMenuScreens(evt: RegisterMenuScreensEvent): void;
    static setupClient(evt: FMLClientSetupEvent): void;
  }

}

declare module 'top.theillusivec4.curios.mixin.core' {
  import { Container } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Predicate } from 'java.util.function';
  import { ItemStack } from 'net.minecraft.world.item';
  import { CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Boolean } from 'java.lang';

  class AccessorEntity {
    get firstTick(): boolean;
  }


  class MixinApplyBonusCount {
  }


  class MixinCuriosApi {
  }


  class MixinCuriosDataProvider {
  }


  class MixinCuriosTriggers {
  }


  class MixinCuriosTriggersEquip {
  }


  class MixinEnchantedCountIncreaseFunction {
  }


  interface MixinInventory extends Container {}
  class MixinInventory extends Container {
    player: Player;
    hasAnyMatching(predicate: Predicate<ItemStack>): boolean;
  }


  class MixinLivingEntity {
    curio$canFreeze(cir: CallbackInfoReturnable<boolean>): void;
  }


  class MixinNbtPredicate {
  }


  class MixinPiglinAi {
  }


  class MixinPowderSnowBlock {
  }


  class MixinV1460 {
  }

}

declare module 'top.theillusivec4.curios.mixin' {
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { ICurioItem, ICurio, ICuriosItemHandler } from 'top.theillusivec4.curios.api.type.capability';
  import { Optional, Map, Set } from 'java.util';
  import { ISlotType } from 'top.theillusivec4.curios.api.type';
  import { EntityType, LivingEntity, Entity } from 'net.minecraft.world.entity';
  import { SlotContext, SlotResult } from 'top.theillusivec4.curios.api';
  import { Multimap } from 'com.google.common.collect';
  import { Holder } from 'net.minecraft.core';
  import { Attribute, AttributeModifier } from 'net.minecraft.world.entity.ai.attributes';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Operation } from 'AttributeModifier';
  import { Predicate } from 'java.util.function';
  import { Pair } from 'com.mojang.datafixers.util';
  import { TypeTemplate } from 'com.mojang.datafixers.types.templates';
  import { Schema } from 'com.mojang.datafixers.schemas';
  import { LootContext } from 'net.minecraft.world.level.storage.loot';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Player } from 'net.minecraft.world.entity.player';
  import { TagKey } from 'net.minecraft.tags';

  class CuriosImplMixinHooks {
    static addModifier(stack: ItemStack, attribute: Holder<Attribute>, id: ResourceLocation, amount: number, operation: Operation, slot: string): void;
    static addSlotModifier(map: Multimap<Holder<Attribute>, AttributeModifier>, identifier: string, id: ResourceLocation, amount: number, operation: Operation): void;
    static addSlotModifier(stack: ItemStack, identifier: string, id: ResourceLocation, amount: number, operation: Operation, slot: string): void;
    static broadcastCurioBreakEvent(slotContext: SlotContext): void;
    static get curioPredicates(): Map<ResourceLocation, Predicate<SlotResult>>;
    static getAttributeModifiers(slotContext: SlotContext, id: ResourceLocation, stack: ItemStack): Multimap<Holder<Attribute>, AttributeModifier>;
    static getCurio(stack: ItemStack): Optional<ICurio>;
    static getCurioFromRegistry(item: Item): Optional<ICurioItem>;
    static getCurioPredicate(resourceLocation: ResourceLocation): Optional<Predicate<SlotResult>>;
    static getCuriosInventory(livingEntity: LivingEntity): Optional<ICuriosItemHandler>;
    static getEntitySlots(type: EntityType<any>, isClient: boolean): Map<string, ISlotType>;
    static getItemStackSlots(stack: ItemStack, isClient: boolean): Map<string, ISlotType>;
    static getItemStackSlots(stack: ItemStack, livingEntity: LivingEntity): Map<string, ISlotType>;
    static getSlotId(slotContext: SlotContext): ResourceLocation;
    static getSlots(isClient: boolean): Map<string, ISlotType>;
    static isStackValid(slotContext: SlotContext, stack: ItemStack): boolean;
    static registerCurio(item: Item, icurio: ICurioItem): void;
    static registerCurioPredicate(resourceLocation: ResourceLocation, validator: Predicate<SlotResult>): void;
    static testCurioPredicates(predicates: Set<ResourceLocation>, slotResult: SlotResult): boolean;
  }


  class CuriosUtilMixinHooks {
    static attachDataFixer(schema: Schema, original: Pair<string, TypeTemplate>): Pair<string, TypeTemplate>;
    static canNeutralizePiglins(livingEntity: LivingEntity): boolean;
    static canWalkOnPowderSnow(livingEntity: LivingEntity): boolean;
    static contains(player: Player, predicate: Predicate<ItemStack>): boolean;
    static containsStack(player: Player, stack: ItemStack): boolean;
    static containsTag(player: Player, tagKey: TagKey<Item>): boolean;
    static getFortuneLevel(lootContext: LootContext): number;
    static getLootingLevel(lootContext: LootContext): number;
    static isFreezeImmune(livingEntity: LivingEntity): boolean;
    static mergeCuriosInventory(compoundTag: CompoundTag, entity: Entity): CompoundTag;
  }

}

declare module 'top.theillusivec4.curios.platform' {
  import { ICuriosPlatform } from 'top.theillusivec4.curios.platform.services';
  import { Map } from 'java.util';
  import { ISlotType } from 'top.theillusivec4.curios.api.type';
  import { ItemStack } from 'net.minecraft.world.item';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { Player } from 'net.minecraft.world.entity.player';
  import { EnderMan } from 'net.minecraft.world.entity.monster';
  import { Class } from 'java.lang';

  interface NeoForgeCurios extends ICuriosPlatform {}
  class NeoForgeCurios extends ICuriosPlatform {
    canWalkOnPowderedSnow(stack: ItemStack, livingEntity: LivingEntity): boolean;
    getItemStackSlots(stack: ItemStack, livingEntity: LivingEntity): Map<string, ISlotType>;
    isEnderMask(stack: ItemStack, player: Player, enderMan: EnderMan): boolean;
    makesPiglinsNeutral(stack: ItemStack, livingEntity: LivingEntity): boolean;
  }


  class Services {
    static readonly CURIOS: ICuriosPlatform;
    static load<T>(clazz: Class<T>): T;
  }

}

declare module 'top.theillusivec4.curios.platform.services' {
  import { Map } from 'java.util';
  import { ISlotType } from 'top.theillusivec4.curios.api.type';
  import { ItemStack } from 'net.minecraft.world.item';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { Player } from 'net.minecraft.world.entity.player';
  import { EnderMan } from 'net.minecraft.world.entity.monster';

  class ICuriosPlatform {
    canWalkOnPowderedSnow(var1: ItemStack, var2: LivingEntity): boolean;
    getItemStackSlots(var1: ItemStack, var2: LivingEntity): Map<string, ISlotType>;
    isEnderMask(var1: ItemStack, var2: Player, var3: EnderMan): boolean;
    makesPiglinsNeutral(var1: ItemStack, var2: LivingEntity): boolean;
  }

}

declare module 'top.theillusivec4.curios.server.command' {
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { Set, Collection } from 'java.util';
  import { CommandContext } from 'com.mojang.brigadier.context';
  import { CommandSourceStack, CommandBuildContext } from 'net.minecraft.commands';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Suggestions, SuggestionsBuilder } from 'com.mojang.brigadier.suggestion';
  import { StringReader, CommandDispatcher } from 'com.mojang.brigadier';

  interface CurioArgumentType extends ArgumentType<string> {}
  class CurioArgumentType extends ArgumentType<string> {
    static slotIds: Set;
    get examples(): Collection<string>;
    static getSlot(context: CommandContext<CommandSourceStack>, name: string): string;
    listSuggestions<S>(context: CommandContext<S>, builder: SuggestionsBuilder): CompletableFuture<Suggestions>;
    parse(reader: StringReader): string;
    static slot(): CurioArgumentType;
  }


  class CuriosCommand {
    static register(dispatcher: CommandDispatcher<CommandSourceStack>, buildContext: CommandBuildContext): void;
  }


  class CuriosSelectorOptions {
    static register(): void;
  }

}

declare module 'top.theillusivec4.curios.server' {
  import { ISlotHelper } from 'top.theillusivec4.curios.api.type.util';
  import { ISlotType } from 'top.theillusivec4.curios.api.type';
  import { Optional, Collection, SortedMap, Set } from 'java.util';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { ICurioStacksHandler } from 'top.theillusivec4.curios.api.type.inventory';

  interface SlotHelper extends ISlotHelper {}
  class SlotHelper extends ISlotHelper {
    addSlotType(slotType: ISlotType): void;
    clear(): void;
    createSlots(): SortedMap<ISlotType, ICurioStacksHandler>;
    createSlots(livingEntity: LivingEntity): SortedMap<ISlotType, ICurioStacksHandler>;
    get slotTypeIds(): Set<string>;
    get slotTypes(): Collection<ISlotType>;
    getSlotType(identifier: string): Optional<ISlotType>;
    getSlotTypes(livingEntity: LivingEntity): Collection<ISlotType>;
    getSlotsForType(livingEntity: LivingEntity, identifier: string): number;
    growSlotType(id: string, livingEntity: LivingEntity): void;
    growSlotType(id: string, amount: number, livingEntity: LivingEntity): void;
    lockSlotType(id: string, livingEntity: LivingEntity): void;
    setSlotsForType(id: string, livingEntity: LivingEntity, amount: number): void;
    shrinkSlotType(id: string, livingEntity: LivingEntity): void;
    shrinkSlotType(id: string, amount: number, livingEntity: LivingEntity): void;
    unlockSlotType(id: string, livingEntity: LivingEntity): void;
  }

}